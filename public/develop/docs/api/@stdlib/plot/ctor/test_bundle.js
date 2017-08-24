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
* Test whether a value has in its prototype chain a specified constructor as a prototype property.
*
* @module @stdlib/assert/instance-of
*
* @example
* var instanceOf = require( '@stdlib/assert/instance-of' );
*
* var bool = instanceOf( [], Array );
* // returns true
*
* bool = instanceOf( {}, Object ); // exception
* // returns true
*
* bool = instanceOf( 'beep', String );
* // returns false
*
* bool = instanceOf( null, Object );
* // returns false
*
* bool = instanceOf( 5, Object );
* // returns false
*/

// MODULES //

var instanceOf = require( './instance_of.js' );


// EXPORTS //

module.exports = instanceOf;

},{"./instance_of.js":4}],4:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Tests whether a value has in its prototype chain a specified constructor as a prototype property.
*
* @param {*} value - value to test
* @param {Function} constructor - constructor to test against
* @throws {TypeError} constructor must be callable
* @returns {boolean} boolean indicating whether a value is an instance of a provided constructor
*
* @example
* var bool = instanceOf( [], Array );
* // returns true
*
* @example
* var bool = instanceOf( {}, Object ); // exception
* // returns true
*
* @example
* var bool = instanceOf( 'beep', String );
* // returns false
*
* @example
* var bool = instanceOf( null, Object );
* // returns false
*
* @example
* var bool = instanceOf( 5, Object );
* // returns false
*/
function instanceOf( value, constructor ) {
	// TODO: replace with `isCallable` check
	if ( typeof constructor !== 'function' ) {
		throw new TypeError( 'invalid input argument. `constructor` argument must be callable. Value: `'+constructor+'`.' );
	}
	return ( value instanceof constructor );
} // end FUNCTION instanceOf()


// EXPORTS //

module.exports = instanceOf;

},{}],5:[function(require,module,exports){
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

},{"./is_array_like.js":6}],6:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-integer":71,"@stdlib/math/constants/uint32-max":84}],7:[function(require,module,exports){
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

},{"./is_array.js":8}],8:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":518}],9:[function(require,module,exports){
'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is a boolean.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a boolean
*
* @example
* var bool = isBoolean( false );
* // returns true
*
* @example
* var bool = isBoolean( true );
* // returns true
*
* @example
* var bool = isBoolean( new Boolean( false ) );
* // returns true
*
* @example
* var bool = isBoolean( new Boolean( true ) );
* // returns true
*/
function isBoolean( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
} // end FUNCTION isBoolean()


// EXPORTS //

module.exports = isBoolean;

},{"./object.js":11,"./primitive.js":12}],10:[function(require,module,exports){
'use strict';

/**
* Tests if a value is a boolean.
*
* @module @stdlib/assert/is-boolean
*
* @example
* var isBoolean = require( '@stdlib/assert/is-boolean' );
*
* var bool = isBoolean( false );
* // returns true
*
* bool = isBoolean( new Boolean( false ) );
* // returns true
*
* @example
* // Use interface to check for boolean primitives...
* var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
*
* var bool = isBoolean( false );
* // returns true
*
* bool = isBoolean( new Boolean( true ) );
* // returns false
*
* @example
* // Use interface to check for boolean objects...
* var isBoolean = require( '@stdlib/assert/is-boolean' ).isObject;
*
* var bool = isBoolean( true );
* // returns false
*
* bool = isBoolean( new Boolean( false ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isBoolean = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isBoolean, 'isPrimitive', isPrimitive );
setReadOnly( isBoolean, 'isObject', isObject );


// EXPORTS //

module.exports = isBoolean;

},{"./generic.js":9,"./object.js":11,"./primitive.js":12,"@stdlib/utils/define-read-only-property":490}],11:[function(require,module,exports){
'use strict';

// MODULES //

var hasToStringTag = require( '@stdlib/utils/detect-tostringtag-support' )();
var nativeClass = require( '@stdlib/utils/native-class' );
var test = require( './try2serialize.js' );


// MAIN //

/**
* Tests if a value is a boolean object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a boolean object
*
* @example
* var bool = isBoolean( true );
* // returns false
*
* @example
* var bool = isBoolean( new Boolean( false ) );
* // returns true
*/
function isBoolean( value ) {
	if ( typeof value === 'object' ) {
		if ( hasToStringTag ) {
			return test( value );
		}
		return ( nativeClass( value ) === '[object Boolean]' );
	}
	return false;
} // end FUNCTION isBoolean()


// EXPORTS //

module.exports = isBoolean;

},{"./try2serialize.js":14,"@stdlib/utils/detect-tostringtag-support":494,"@stdlib/utils/native-class":518}],12:[function(require,module,exports){
'use strict';

/**
* Tests if a value is a boolean primitive.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a boolean primitive
*
* @example
* var bool = isBoolean( true );
* // returns true
*
* @example
* var bool = isBoolean( false );
* // returns true
*
* @example
* var bool = isBoolean( new Boolean( true ) );
* // returns false
*/
function isBoolean( value ) {
	return ( typeof value === 'boolean' );
} // end FUNCTION isBoolean()


// EXPORTS //

module.exports = isBoolean;

},{}],13:[function(require,module,exports){
'use strict';

// eslint-disable-next-line no-redeclare
var toString = Boolean.prototype.toString; // non-generic


// EXPORTS //

module.exports = toString;

},{}],14:[function(require,module,exports){
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

},{"./tostring.js":13}],15:[function(require,module,exports){
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

},{"./is_buffer.js":16}],16:[function(require,module,exports){
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

},{"@stdlib/assert/is-object-like":46}],17:[function(require,module,exports){
'use strict';

/**
* Test if a value is an empty array.
*
* @module @stdlib/assert/is-empty-array
*
* @example
* var isEmptyArray = require( '@stdlib/assert/is-empty-array' );
*
* var bool = isEmptyArray( [] );
* // returns true
*
* bool = isEmptyArray( [ 1, 2, 3 ] );
* // returns false
*
* bool = isEmptyArray( {} );
* // returns false
*/

// MODULES //

var isEmptyArray = require( './is_empty_array.js' );


// EXPORTS //

module.exports = isEmptyArray;

},{"./is_empty_array.js":18}],18:[function(require,module,exports){
'use strict';

// MODULES //

var isArray = require( '@stdlib/assert/is-array' );


// MAIN //

/**
* Tests if a value is an empty array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is an empty array
*
* @example
* var bool = isEmptyArray( [] );
* // returns true
*
* @example
* var bool = isEmptyArray( [ 1, 2, 3 ] );
* // returns false
*
* @example
* var bool = isEmptyArray( {} );
* // returns false
*/
function isEmptyArray( value ) {
	return (
		isArray( value ) &&
		value.length === 0
	);
} // end FUNCTION isEmptyArray()


// EXPORTS //

module.exports = isEmptyArray;

},{"@stdlib/assert/is-array":7}],19:[function(require,module,exports){
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

},{"./is_error.js":20}],20:[function(require,module,exports){
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

},{"@stdlib/utils/get-prototype-of":497,"@stdlib/utils/native-class":518}],21:[function(require,module,exports){
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

},{"./is_function.js":22}],22:[function(require,module,exports){
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

},{"@stdlib/utils/type-of":529}],23:[function(require,module,exports){
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

},{"./object.js":26,"./primitive.js":27}],24:[function(require,module,exports){
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

},{"./generic.js":23,"./object.js":26,"./primitive.js":27,"@stdlib/utils/define-read-only-property":490}],25:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-integer":71,"@stdlib/math/constants/float64-ninf":81,"@stdlib/math/constants/float64-pinf":82}],26:[function(require,module,exports){
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

},{"./integer.js":25,"@stdlib/assert/is-number":41}],27:[function(require,module,exports){
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

},{"./integer.js":25,"@stdlib/assert/is-number":41}],28:[function(require,module,exports){
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

},{"./object.js":30,"./primitive.js":31}],29:[function(require,module,exports){
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

},{"./generic.js":28,"./object.js":30,"./primitive.js":31,"@stdlib/utils/define-read-only-property":490}],30:[function(require,module,exports){
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

},{"@stdlib/assert/is-number":41,"@stdlib/math/base/assert/is-nan":73}],31:[function(require,module,exports){
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

},{"@stdlib/assert/is-number":41,"@stdlib/math/base/assert/is-nan":73}],32:[function(require,module,exports){
'use strict';

// MODULES //

var constantFcn = require( '@stdlib/utils/constant-function' );


// EXPORTS //

module.exports = constantFcn( false );

},{"@stdlib/utils/constant-function":482}],33:[function(require,module,exports){
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

},{"./object.js":35,"./primitive.js":36}],34:[function(require,module,exports){
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

},{"./generic.js":33,"./object.js":35,"./primitive.js":36,"@stdlib/utils/define-read-only-property":490}],35:[function(require,module,exports){
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

},{"@stdlib/assert/is-integer":24}],36:[function(require,module,exports){
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

},{"@stdlib/assert/is-integer":24}],37:[function(require,module,exports){
'use strict';

/**
* Test if a value is `null`.
*
* @module @stdlib/assert/is-null
*
* @example
* var isNull = require( '@stdlib/assert/is-null' );
*
* var value = null;
*
* var bool = isNull( value );
* // returns true
*/

// MODULES //

var isNull = require( './is_null.js' );


// EXPORTS //

module.exports = isNull;

},{"./is_null.js":38}],38:[function(require,module,exports){
'use strict';

/**
* Tests if a value is `null`.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is null
*
* @example
* var bool = isNull( null );
* // returns true
*
* bool = isNull( true );
* // returns false
*/
function isNull( value ) {
	return value === null;
} // end FUNCTION isNull()


// EXPORTS //

module.exports = isNull;

},{}],39:[function(require,module,exports){
'use strict';

/**
* Test if a value is an array-like object of numbers.
*
* @module @stdlib/assert/is-number-array
*
* @example
* var isNumberArray = require( '@stdlib/assert/is-number-array' );
*
* var bool = isNumberArray( [ 1, 2, 3 ] );
* // returns true
*
* bool = isNumberArray( [ '1', 2, 3 ] );
* // returns false
*
* @example
* // Use interface to check for primitives...
* var isNumberArray = require( '@stdlib/assert/is-number-array' ).primitives;
*
* var bool = isNumberArray( [ 1, 2, 3 ] );
* // returns true
*
* bool = isNumberArray( [ 1, new Number( 2 ) ] );
* // returns false
*
* @example
* // Use interface to check for objects...
* var isNumberArray = require( '@stdlib/assert/is-number-array' ).objects;
*
* var bool = isNumberArray( [ new Number( 1 ), new Number( 2 ) ] );
* // returns true
*
* bool = isNumberArray( [ new Number( 1 ), 2 ] );
* // returns false
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var arrayfun = require( '@stdlib/assert/tools/array-like-function' );
var isNumber = require( '@stdlib/assert/is-number' );


// MAIN //

var isNumberArray = arrayfun( isNumber );
setReadOnly( isNumberArray, 'primitives', arrayfun( isNumber.isPrimitive ) );
setReadOnly( isNumberArray, 'objects', arrayfun( isNumber.isObject ) );


// EXPORTS //

module.exports = isNumberArray;

},{"@stdlib/assert/is-number":41,"@stdlib/assert/tools/array-like-function":70,"@stdlib/utils/define-read-only-property":490}],40:[function(require,module,exports){
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

},{"./object.js":42,"./primitive.js":43}],41:[function(require,module,exports){
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

},{"./generic.js":40,"./object.js":42,"./primitive.js":43,"@stdlib/utils/define-read-only-property":490}],42:[function(require,module,exports){
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

},{"./try2serialize.js":45,"@stdlib/utils/detect-tostringtag-support":494,"@stdlib/utils/native-class":518}],43:[function(require,module,exports){
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

},{}],44:[function(require,module,exports){
'use strict';

// eslint-disable-next-line no-redeclare
var toString = Number.prototype.toString; // non-generic


// EXPORTS //

module.exports = toString;

},{}],45:[function(require,module,exports){
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

},{"./tostring.js":44}],46:[function(require,module,exports){
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

},{"./is_object_like.js":47,"@stdlib/assert/tools/array-function":68,"@stdlib/utils/define-read-only-property":490}],47:[function(require,module,exports){
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

},{}],48:[function(require,module,exports){
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

},{"./is_object.js":49}],49:[function(require,module,exports){
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

},{"@stdlib/assert/is-array":7}],50:[function(require,module,exports){
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

},{"./is_plain_object.js":51}],51:[function(require,module,exports){
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

},{"@stdlib/assert/has-own-property":2,"@stdlib/assert/is-function":21,"@stdlib/assert/is-object":48,"@stdlib/utils/get-prototype-of":497,"@stdlib/utils/native-class":518}],52:[function(require,module,exports){
'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is a positive integer.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a positive integer
*
* @example
* var bool = isPositiveInteger( 5.0 );
* // returns true
*
* @example
* var bool = isPositiveInteger( new Number( 5.0 ) );
* // returns true
*
* @example
* var bool = isPositiveInteger( 0.0 );
* // returns false
*
* @example
* var bool = isPositiveInteger( -5.0 );
* // returns false
*
* @example
* var bool = isPositiveInteger( 3.14 );
* // returns false
*
* @example
* var bool = isPositiveInteger( null );
* // returns false
*/
function isPositiveInteger( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
} // end FUNCTION isPositiveInteger()


// EXPORTS //

module.exports = isPositiveInteger;

},{"./object.js":54,"./primitive.js":55}],53:[function(require,module,exports){
'use strict';

/**
* Tests if a value is a positive integer.
*
* @module @stdlib/assert/is-positive-integer
*
* @example
* var isPositiveInteger = require( '@stdlib/assert/is-positive-integer' );
*
* var bool = isPositiveInteger( 5.0 );
* // returns true
*
* bool = isPositiveInteger( new Number( 5.0 ) );
* // returns true
*
* bool = isPositiveInteger( -5.0 );
* // returns false
*
* bool = isPositiveInteger( 3.14 );
* // returns false
*
* bool = isPositiveInteger( null );
* // returns false
*
* @example
* // Use interface to check for positive integer primitives...
* var isPositiveInteger = require( '@stdlib/assert/is-positive-integer' ).isPrimitive;
*
* var bool = isPositiveInteger( 3.0 );
* // returns true
*
* bool = isPositiveInteger( new Number( 3.0 ) );
* // returns false
*
* @example
* // Use interface to check for positive integer objects...
* var isPositiveInteger = require( '@stdlib/assert/is-positive-integer' ).isObject;
*
* var bool = isPositiveInteger( 3.0 );
* // returns false
*
* bool = isPositiveInteger( new Number( 3.0 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isPositiveInteger = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isPositiveInteger, 'isPrimitive', isPrimitive );
setReadOnly( isPositiveInteger, 'isObject', isObject );


// EXPORTS //

module.exports = isPositiveInteger;

},{"./generic.js":52,"./object.js":54,"./primitive.js":55,"@stdlib/utils/define-read-only-property":490}],54:[function(require,module,exports){
'use strict';

// MODULES //

var isInteger = require( '@stdlib/assert/is-integer' ).isObject;


// MAIN //

/**
* Tests if a value is a number object having a positive integer value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object having a positive integer value
*
* @example
* var bool = isPositiveInteger( 3.0 );
* // returns false
*
* @example
* var bool = isPositiveInteger( new Number( 3.0 ) );
* // returns true
*/
function isPositiveInteger( value ) {
	return (
		isInteger( value ) &&
		value.valueOf() > 0.0
	);
} // end FUNCTION isPositiveInteger()


// EXPORTS //

module.exports = isPositiveInteger;

},{"@stdlib/assert/is-integer":24}],55:[function(require,module,exports){
'use strict';

// MODULES //

var isInteger = require( '@stdlib/assert/is-integer' ).isPrimitive;


// MAIN //

/**
* Tests if a value is a number primitive having a positive integer value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number primitive having a positive integer value
*
* @example
* var bool = isPositiveInteger( 3.0 );
* // returns true
*
* @example
* var bool = isPositiveInteger( new Number( 3.0 ) );
* // returns false
*/
function isPositiveInteger( value ) {
	return (
		isInteger( value ) &&
		value > 0.0
	);
} // end FUNCTION isPositiveInteger()


// EXPORTS //

module.exports = isPositiveInteger;

},{"@stdlib/assert/is-integer":24}],56:[function(require,module,exports){
'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is a positive number.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a positive number
*
* @example
* var bool = isPositiveNumber( 5.0 );
* // returns true
*
* @example
* var bool = isPositiveNumber( new Number( 5.0 ) );
* // returns true
*
* @example
* var bool = isPositiveNumber( 3.14 );
* // returns true
*
* @example
* var bool = isPositiveNumber( -5.0 );
* // returns false
*
* @example
* var bool = isPositiveNumber( null );
* // returns false
*/
function isPositiveNumber( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
} // end FUNCTION isPositiveNumber()


// EXPORTS //

module.exports = isPositiveNumber;

},{"./object.js":58,"./primitive.js":59}],57:[function(require,module,exports){
'use strict';

/**
* Test if a value is a positive number.
*
* @module @stdlib/assert/is-positive-number
*
* @example
* var isPositiveNumber = require( '@stdlib/assert/is-positive-number' );
*
* var bool = isPositiveNumber( 5.0 );
* // returns true
*
* bool = isPositiveNumber( new Number( 5.0 ) );
* // returns true
*
* bool = isPositiveNumber( 3.14 );
* // returns true
*
* bool = isPositiveNumber( -5.0 );
* // returns false
*
* bool = isPositiveNumber( null );
* // returns false
*
* @example
* // Use interface to check for positive number primitives...
* var isPositiveNumber = require( '@stdlib/assert/is-positive-number' ).isPrimitive;
*
* var bool = isPositiveNumber( 3.0 );
* // returns true
*
* bool = isPositiveNumber( new Number( 3.0 ) );
* // returns false
*
* @example
* // Use interface to check for positive number objects...
* var isPositiveNumber = require( '@stdlib/assert/is-positive-number' ).isObject;
*
* var bool = isPositiveNumber( 3.0 );
* // returns false
*
* bool = isPositiveNumber( new Number( 3.0 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isPositiveNumber = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isPositiveNumber, 'isPrimitive', isPrimitive );
setReadOnly( isPositiveNumber, 'isObject', isObject );


// EXPORTS //

module.exports = isPositiveNumber;

},{"./generic.js":56,"./object.js":58,"./primitive.js":59,"@stdlib/utils/define-read-only-property":490}],58:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isObject;


// MAIN //

/**
* Tests if a value is a number object having a positive value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object having a positive value
*
* @example
* var bool = isPositiveNumber( 3.0 );
* // returns false
*
* @example
* var bool = isPositiveNumber( new Number( 3.0 ) );
* // returns true
*/
function isPositiveNumber( value ) {
	return (
		isNumber( value ) &&
		value.valueOf() > 0.0
	);
} // end FUNCTION isPositiveNumber()


// EXPORTS //

module.exports = isPositiveNumber;

},{"@stdlib/assert/is-number":41}],59:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;


// MAIN //

/**
* Tests if a value is a number primitive having a positive value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number primitive having a positive value
*
* @example
* var bool = isPositiveNumber( 3.0 );
* // returns true
*
* @example
* var bool = isPositiveNumber( new Number( 3.0 ) );
* // returns false
*/
function isPositiveNumber( value ) {
	return (
		isNumber( value ) &&
		value > 0.0
	);
} // end FUNCTION isPositiveNumber()


// EXPORTS //

module.exports = isPositiveNumber;

},{"@stdlib/assert/is-number":41}],60:[function(require,module,exports){
'use strict';

/**
* Test if a value is an array of strings.
*
* @module @stdlib/assert/is-string-array
*
* @example
* var isStringArray = require( '@stdlib/assert/is-string-array' );
*
* var bool = isStringArray( [ 'abc', 'def' ] );
* // returns true
*
* bool = isStringArray( [ 'abc', 123 ] );
* // returns false
*
* @example
* // Use interface to check for primitives...
* var isStringArray = require( '@stdlib/assert/is-string-array' ).primitives;
*
* var bool = isStringArray( [ 'abc', 'def' ] );
* // returns true
*
* bool = isStringArray( [ 'abc', new String( 'def' ) ] );
* // returns false
*
* @example
* // Use interface to check for objects...
* var isStringArray = require( '@stdlib/assert/is-string-array' ).objects;
*
* var bool = isStringArray( [ new String( 'abc' ), new String( 'def' ) ] );
* // returns true
*
* bool = isStringArray( [ new String( 'abc' ), 'def' ] );
* // returns false
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var arrayfun = require( '@stdlib/assert/tools/array-function' );
var isString = require( '@stdlib/assert/is-string' );


// MAIN //

var isStringArray = arrayfun( isString );
setReadOnly( isStringArray, 'primitives', arrayfun( isString.isPrimitive ) );
setReadOnly( isStringArray, 'objects', arrayfun( isString.isObject ) );


// EXPORTS //

module.exports = isStringArray;

},{"@stdlib/assert/is-string":62,"@stdlib/assert/tools/array-function":68,"@stdlib/utils/define-read-only-property":490}],61:[function(require,module,exports){
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

},{"./object.js":63,"./primitive.js":64}],62:[function(require,module,exports){
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

},{"./generic.js":61,"./object.js":63,"./primitive.js":64,"@stdlib/utils/define-read-only-property":490}],63:[function(require,module,exports){
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

},{"./try2valueof.js":65,"@stdlib/utils/detect-tostringtag-support":494,"@stdlib/utils/native-class":518}],64:[function(require,module,exports){
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

},{}],65:[function(require,module,exports){
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

},{"./valueof.js":66}],66:[function(require,module,exports){
'use strict';

// eslint-disable-next-line no-redeclare
var valueOf = String.prototype.valueOf; // non-generic


// EXPORTS //

module.exports = valueOf;

},{}],67:[function(require,module,exports){
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

},{"@stdlib/assert/is-array":7}],68:[function(require,module,exports){
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

},{"./arrayfcn.js":67}],69:[function(require,module,exports){
'use strict';

// MODULES //

var isArrayLike = require( '@stdlib/assert/is-array-like' );


// MAIN //

/**
* Returns a function which tests if every element in an array-like object passes a test condition.
*
* @param {Function} predicate - function to apply
* @throws {TypeError} must provide a function
* @returns {Function} an array-like object function
*
* @example
* var isOdd = require( '@stdlib/assert/is-odd' );
*
* var arr1 = [ 1, 3, 5, 7 ];
* var arr2 = [ 3, 5, 8 ];
*
* var validate = arraylikefcn( isOdd );
*
* var bool = validate( arr1 );
* // returns true
*
* bool = validate( arr2 );
* // returns false
*/
function arraylikefcn( predicate ) {
	if ( typeof predicate !== 'function' ) {
		throw new TypeError( 'invalid input argument. Must provide a function. Value: `' + predicate + '`.' );
	}
	return every;
	/**
	* Tests if every element in an array-like object passes a test condition.
	*
	* @private
	* @param {*} value - value to test
	* @returns {boolean} boolean indicating whether a value is an array-like object for which all elements pass a test condition
	*/
	function every( value ) {
		var len;
		var i;
		if ( !isArrayLike( value ) ) {
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
} // end FUNCTION arraylikefcn()


// EXPORTS //

module.exports = arraylikefcn;

},{"@stdlib/assert/is-array-like":5}],70:[function(require,module,exports){
'use strict';

/**
* Return a function which tests if every element in an array-like object passes a test condition.
*
* @module @stdlib/assert/tools/array-like-function
*
* @example
* var isOdd = require( '@stdlib/assert/is-odd' );
* var arraylikefcn = require( '@stdlib/assert/tools/array-like-function' );
*
* var arr1 = [ 1, 3, 5, 7 ];
* var arr2 = [ 3, 5, 8 ];
*
* var validate = arraylikefcn( isOdd );
*
* var bool = validate( arr1 );
* // returns true
*
* bool = validate( arr2 );
* // returns false
*/

// MODULES //

var arraylikefcn = require( './arraylikefcn.js' );


// EXPORTS //

module.exports = arraylikefcn;

},{"./arraylikefcn.js":69}],71:[function(require,module,exports){
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

},{"./is_integer.js":72}],72:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":80}],73:[function(require,module,exports){
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

},{"./is_nan.js":74}],74:[function(require,module,exports){
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

},{}],75:[function(require,module,exports){
'use strict';

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isPositiveInteger = require( '@stdlib/assert/is-positive-integer' ).isPrimitive;
var INT32_MAX = require( '@stdlib/math/constants/int32-max' );
var randint32 = require( './rand_int32.js' );


// VARIABLES //

var NORMALIZATION_CONSTANT = INT32_MAX - 1;
var MAX_SEED = INT32_MAX - 1;
var A = 16807|0; // asm type annotation


// MAIN //

/**
* Returns a linear congruential pseudorandom number generator (LCG) based on Park and Miller.
*
* @param {PositiveInteger} [seed] - pseudorandom number generator seed
* @throws {TypeError} must provide a positive integer
* @throws {RangeError} must provide a positive integer less than the maximum signed 32-bit integer
* @returns {Function} LCG
*
* @example
* var minstd = factory();
*
* var v = minstd();
* // returns <number>
*
* @example
* // Return a seeded LCG:
* var minstd = factory( 1234 );
*
* var v = minstd();
* // returns 20739838
*/
function factory( seed ) {
	var state;
	if ( arguments.length ) {
		if ( !isPositiveInteger( seed ) ) {
			throw new TypeError( 'invalid input argument. Must provide a positive integer. Value: `' + seed + '`.' );
		}
		if ( seed > MAX_SEED ) {
			throw new RangeError( 'invalid input argument. Must provide a positive integer less than the maximum signed 32-bit integer. Value: `' + seed + '`.' );
		}
		state = seed|0; // asm type annotation
	} else {
		state = randint32();
	}
	setReadOnly( minstd, 'NAME', 'minstd' );
	setReadOnly( minstd, 'SEED', state );
	setReadOnly( minstd, 'MIN', 1 );
	setReadOnly( minstd, 'MAX', INT32_MAX-1 );
	setReadOnly( minstd, 'normalized', normalized );

	setReadOnly( normalized, 'NAME', minstd.NAME );
	setReadOnly( normalized, 'SEED', minstd.SEED );
	setReadOnly( normalized, 'MIN', (minstd.MIN-1.0) / NORMALIZATION_CONSTANT );
	setReadOnly( normalized, 'MAX', (minstd.MAX-1.0) / NORMALIZATION_CONSTANT );

	return minstd;

	/**
	* Generates a pseudorandom integer on the interval \\( [1,2^{31}-1) \\).
	*
	* @private
	* @returns {PositiveInteger} pseudorandom integer
	*
	* @example
	* var v = minstd();
	* // returns <number>
	*/
	function minstd() {
		state = ( A * state ) % INT32_MAX;
		return state|0; // asm type annotation
	} // end FUNCTION minstd()

	/**
	* Generates a pseudorandom number on the interval \\( [0,1) \\).
	*
	* @private
	* @returns {number} pseudorandom number
	*
	* @example
	* var v = normalized()
	* // returns <number>
	*/
	function normalized() {
		return (minstd()-1) / NORMALIZATION_CONSTANT;
	} // end FUNCTION normalized()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./rand_int32.js":78,"@stdlib/assert/is-positive-integer":53,"@stdlib/math/constants/int32-max":83,"@stdlib/utils/define-read-only-property":490}],76:[function(require,module,exports){
'use strict';

/**
* A linear congruential pseudorandom number generator (LCG) based on Park and Miller.
*
* @module @stdlib/math/base/random/minstd
*
* @example
* var minstd = require( '@stdlib/math/base/random/minstd' );
*
* var v = minstd();
* // returns <number>
*
* @example
* var factory = require( '@stdlib/math/base/random/minstd' ).factory;
*
* var minstd = factory( 1234 );
*
* var v = minstd();
* // returns 20739838
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var minstd = require( './minstd.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( minstd, 'factory', factory );


// EXPORTS //

module.exports = minstd;

},{"./factory.js":75,"./minstd.js":77,"@stdlib/utils/define-read-only-property":490}],77:[function(require,module,exports){
'use strict';

// MODULES //

var factory = require( './factory.js' );
var randint32 = require( './rand_int32.js' );


// MAIN //

/**
* Generates a pseudorandom integer on the interval \\( [1,2^{31}-1) \\).
*
* #### Method
*
* Linear congruential generators (LCGs) use the recurrence relation
*
* ``` tex
* X_{n+1} = ( a \cdot X_n + c ) \operatorname{mod}(m)
* ```
*
* where the modulus \\( m \\) is a prime number or power of a prime number and \\( a \\) is a primitive root modulo \\( m \\).
*
* <!-- <note> -->
*
* For an LCG to be a Lehmer RNG, the seed \\( X_0 \\) must be coprime to \\( m \\).
*
* <!-- </note> -->
*
* In this implementation, the constants \\( a \\), \\( c \\), and \\( m \\) have the values
*
* ``` tex
* \begin{align*}
* a &= 7^5 = 16807 \\
* c &= 0 \\
* m &= 2^{31} - 1 = 2147483647
* \end{align*}
* ```
*
* <!-- <note> -->
*
* The constant \\( m \\) is a Mersenne prime (modulo \\(31\\)).
*
* <!-- </note> -->
*
* <!-- <note> -->
*
* The constant \\( a \\) is a primitive root (modulo \\(31\\)).
*
* <!-- </note> -->
*
* Accordingly, the maximum possible product is
*
* ``` tex
* 16807 \cdot (m - 1) \approx 2^{46}
* ```
*
* The values for \\( a \\), \\( c \\), and \\( m \\) are taken from Park and Miller, "Random Number Generators: Good Ones Are Hard To Find". Park's and Miller's article is also the basis for a recipe in the second edition of *Numerical Recipes in C*.
*
*
* #### Notes
*
* * The generator has a period of approximately \\(2.1\mbox{e}9\\) (see [Numerical Recipes in C, 2nd Edition](#references), p. 279).
*
*
* #### References
*
* * Park, S. K., and K. W. Miller. 1988. "Random Number Generators: Good Ones Are Hard to Find." *Communications of the ACM* 31 (10). New York, NY, USA: ACM: 1192–1201. doi:[10.1145/63039.63042](http://dx.doi.org/10.1145/63039.63042).
* * Press, William H., Brian P. Flannery, Saul A. Teukolsky, and William T. Vetterling. 1992. *Numerical Recipes in C: The Art of Scientific Computing, Second Edition*. Cambridge University Press.
*
*
* @function minstd
* @type {Function}
* @returns {PositiveInteger} pseudorandom integer
*
* @example
* var v = minstd();
* // returns <number>
*/
var minstd = factory( randint32() );


// EXPORTS //

module.exports = minstd;

},{"./factory.js":75,"./rand_int32.js":78}],78:[function(require,module,exports){
'use strict';

// MODULES //

var INT32_MAX = require( '@stdlib/math/constants/int32-max' );
var floor = require( '@stdlib/math/base/special/floor' );


// VARIABLES //

var MAX = INT32_MAX - 1;


// MAIN //

/**
* Returns a pseudorandom integer on the interval \\([1, 2^{31}-1)\\).
*
* @private
* @returns {PositiveInteger} pseudorandom integer
*
* @example
* var v = randint();
* // returns <number>
*/
function randint32() {
	var v = floor( 1.0 + (MAX*Math.random()) );
	return v|0; // asm type annotation
} // end FUNCTION randint32()


// EXPORTS //

module.exports = randint32;

},{"@stdlib/math/base/special/floor":80,"@stdlib/math/constants/int32-max":83}],79:[function(require,module,exports){
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

},{}],80:[function(require,module,exports){
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

},{"./floor.js":79}],81:[function(require,module,exports){
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

},{}],82:[function(require,module,exports){
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

},{}],83:[function(require,module,exports){
'use strict';

/**
* Maximum signed 32-bit integer.
*
* @module @stdlib/math/constants/int32-max
* @type {integer32}
*
* @example
* var INT32_MAX = require( '@stdlib/math/constants/int32-max' );
* // returns 2147483647
*/


// MAIN //

/**
* The maximum signed 32-bit integer is given by
*
* ``` tex
* 2^{31} - 1
* ```
*
* which corresponds to the bit sequence
*
* ``` binarystring
* 01111111111111111111111111111111
* ```
*
* @constant
* @type {integer32}
* @default 2147483647
*/
var INT32_MAX = 2147483647|0; // asm type annotation


// EXPORTS //

module.exports = INT32_MAX;

},{}],84:[function(require,module,exports){
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

},{}],85:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'annotations:main' );
var EventEmitter = require( 'events' ).EventEmitter;
var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var inherit = require( '@stdlib/utils/inherit' );
var instanceOf = require( '@stdlib/assert/instance-of' );


// MAIN //

/**
* Annotations constructor.
*
* @constructor
* @returns {Annotations} annotations instance
*
* @example
* var node = new Annotations();
*/
function Annotations() {
	var self;
	if ( !instanceOf( this, Annotations ) ) {
		return new Annotations();
	}
	self = this;
	debug( 'Creating an instance...' );
	EventEmitter.call( this );
	this.on( 'change', onChange );
	this.on( '_render', onRender );
	return this;

	/**
	* Callback invoked upon receiving a change event.
	*
	* @private
	*/
	function onChange() {
		debug( 'Received a change event.' );
		self.render();
	}

	/**
	* Re-emits a render event.
	*
	* @private
	*/
	function onRender() {
		var args;
		var i;
		debug( 'Received a render event. Re-emitting...' );
		args = new Array( arguments.length+1 );
		args[ 0 ] = 'render';
		for ( i = 0; i < arguments.length; i++ ) {
			args[ i+1 ] = arguments[ i ];
		}
		self.emit.apply( self, args );
	}
} // end FUNCTION Annotations()

/*
* Inherit from the `EventEmitter` prototype.
*/
inherit( Annotations, EventEmitter );

/**
* Renders a virtual DOM tree.
*
* @memberof Annotations.prototype
* @name render
* @type {Function}
* @returns {VTree} virtual tree
*
* @example
* var node = new Annotations();
*
* var vtree = node.render();
* // returns <Object>
*/
setReadOnly( Annotations.prototype, 'render', require( './render' ) );


// EXPORTS //

module.exports = Annotations;

},{"./render":87,"@stdlib/assert/instance-of":3,"@stdlib/utils/define-read-only-property":490,"@stdlib/utils/inherit":506,"debug":549,"events":564}],86:[function(require,module,exports){
'use strict';

/**
* SVG plot annotations.
*
* @module @stdlib/plot/components/svg/annotations
*
* @example
* var Annotations = require( '@stdlib/plot/components/svg/annotations' );
*
* var node = new Annotations();
*/

// MODULES //

var Annotations = require( './ctor.js' );


// EXPORTS //

module.exports = Annotations;

},{"./ctor.js":85}],87:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'annotations:render' );
var h = require( 'virtual-dom/h' );


// VARIABLES //

var ELEMENT = 'g';


// MAIN //

/**
* Renders a virtual DOM tree.
*
* @private
* @returns {VTree} virtual tree
*/
function render() {
	/* eslint-disable no-invalid-this */
	var vtree;
	var props;

	debug( 'Rendering...' );

	props = {
		'namespace': 'http://www.w3.org/2000/svg',
		'property': 'annotations',
		'className': 'annotations',
		'attributes': {
			'transform': 'translate(0,0)'
		}
	};

	debug( 'Generating a virtual DOM tree (%s) with properties: %s.', ELEMENT, JSON.stringify( props ) );
	vtree = h( ELEMENT, props, [] );

	// Announce that a new tree has been rendered:
	this.emit( '_render', vtree );

	return vtree;
} // end FUNCTION render()


// EXPORTS //

module.exports = render;

},{"debug":549,"virtual-dom/h":614}],88:[function(require,module,exports){
'use strict';

// TODO: improve JSDoc examples

// MODULES //

var debug = require( 'debug' )( 'axis:main' );
var EventEmitter = require( 'events' ).EventEmitter;
var linear = require( 'd3-scale' ).scaleLinear; // TODO: remove
var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var copy = require( '@stdlib/utils/copy' );
var defaults = require( './defaults.json' );
var validate = require( './validate.js' );


// MAIN //

/**
* Axis constructor.
*
* @constructor
* @param {Options} options - constructor options
* @param {Function} [options.scale] - scale function
* @param {string} [options.orientation='bottom'] - axis orientation
* @param {string} [options.label] - axis label
* @param {(Array|null)} [options.ticks] - tick values
* @param {(NonNegativeInteger|null)} [options.numTicks] - number of ticks
* @param {(null|string|Function)} [options.tickFormat] - tick format
* @param {NonNegativeInteger} [options.tickSize=6] - tick size
* @param {NonNegativeInteger} [options.innerTickSize=6] - inner tick size
* @param {NonNegativeInteger} [options.outerTickSize=6] - outer tick size
* @param {NonNegativeInteger} [options.tickPadding=3] - tick padding
* @param {boolean} [options.autoRender=true] - indicates whether to re-render on a change event
* @throws {TypeError} must provide valid options
* @returns {Axis} axis instance
*
* @example
* var axis = new Axis({
*     'orientation': 'bottom'
* });
*/
function Axis( options ) {
	var self;
	var opts;
	var err;
	if ( !( this instanceof Axis ) ) {
		return new Axis( options );
	}
	self = this;
	opts = copy( defaults );
	err = validate( opts, options );
	if ( err ) {
		throw err;
	}
	debug( 'Creating an instance with the following configuration: %s.', JSON.stringify( opts ) );
	EventEmitter.call( this );

	Object.defineProperty( this, '_scale', {
		'configurable': false,
		'enumerable': false,
		'writable': true,
		'value': opts.scale || linear()
	});
	Object.defineProperty( this, '_orientation', {
		'configurable': false,
		'enumerable': false,
		'writable': true,
		'value': opts.orientation
	});
	Object.defineProperty( this, '_label', {
		'configurable': false,
		'enumerable': false,
		'writable': true,
		'value': opts.label
	});
	Object.defineProperty( this, '_ticks', {
		'configurable': false,
		'enumerable': false,
		'writable': true,
		'value': opts.ticks
	});
	Object.defineProperty( this, '_numTicks', {
		'configurable': false,
		'enumerable': false,
		'writable': true,
		'value': opts.numTicks
	});
	Object.defineProperty( this, '_tickFormat', {
		'configurable': false,
		'enumerable': false,
		'writable': true,
		'value': opts.tickFormat
	});
	Object.defineProperty( this, '_tickSize', {
		'configurable': false,
		'enumerable': false,
		'writable': true,
		'value': opts.tickSize
	});
	Object.defineProperty( this, '_innerTickSize', {
		'configurable': false,
		'enumerable': false,
		'writable': true,
		'value': opts.innerTickSize
	});
	Object.defineProperty( this, '_outerTickSize', {
		'configurable': false,
		'enumerable': false,
		'writable': true,
		'value': opts.outerTickSize
	});
	Object.defineProperty( this, '_tickPadding', {
		'configurable': false,
		'enumerable': false,
		'writable': true,
		'value': opts.tickPadding
	});
	Object.defineProperty( this, '_autoRender', {
		'configurable': false,
		'enumerable': false,
		'writable': true,
		'value': opts.autoRender
	});

	this.on( 'change', onChange );
	this.on( '_render', onRender );

	return this;

	/**
	* Callback invoked upon receiving a change event.
	*
	* @private
	*/
	function onChange() {
		debug( 'Received a change event.' );
		if ( self._autoRender ) {
			self.render();
		}
	}

	/**
	* Re-emits a render event.
	*
	* @private
	*/
	function onRender() {
		var args;
		var i;
		debug( 'Received a render event. Re-emitting...' );
		args = new Array( arguments.length+1 );
		args[ 0 ] = 'render';
		for ( i = 0; i < arguments.length; i++ ) {
			args[ i+1 ] = arguments[ i ];
		}
		self.emit.apply( self, args );
	}
} // end FUNCTION Axis()

/*
* Create a prototype which inherits from the parent prototype.
*/
Axis.prototype = Object.create( EventEmitter.prototype );

/*
* Set the constructor.
*/
Axis.prototype.constructor = Axis;

/**
* Scale function.
*
* @memberof Axis.prototype
* @name scale
* @type {Function}
* @throws {TypeError} must be a function
*
* @example
* var axis = new Axis({
*     'orientation': 'top'
* });
*
* var f = axis.scale;
* // returns <Function>
*/
Object.defineProperty( Axis.prototype, 'scale', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/scale/set.js' ),
	'get': require( './props/scale/get.js' )
});

/**
* Axis orientation.
*
* @memberof Axis.prototype
* @name orientation
* @type {string}
* @default 'bottom'
* @throws {TypeError} must be a string primitive
*
* @example
* var axis = new Axis({
*     'orientation': 'bottom'
* });
* axis.orientation = 'top';
*
* var v = axis.orientation;
* // returns 'top'
*/
Object.defineProperty( Axis.prototype, 'orientation', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/orientation/set.js' ),
	'get': require( './props/orientation/get.js' )
});

/**
* Axis label.
*
* @memberof Axis.prototype
* @name label
* @type {string}
* @throws {TypeError} must be a string primitive
*
* @example
* var axis = new Axis({
*     'label': 'y'
* });
* axis.label = 'Counts';
*
* var v = axis.label;
* // returns 'Counts'
*/
Object.defineProperty( Axis.prototype, 'label', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/label/set.js' ),
	'get': require( './props/label/get.js' )
});

/**
* Axis tick values. When set to `null`, the retrieved values are the computed tick values.
*
* @memberof Axis.prototype
* @name ticks
* @type {(Array|null)}
* @default null
* @throws {TypeError} must be an array or null
*
* @example
* var axis = new Axis({
*     'orientation': 'bottom',
*     'ticks': [1,2,3]
* });
* axis.ticks = ['a','b','c'];
*
* var v = axis.ticks;
* // returns <Array>
*/
Object.defineProperty( Axis.prototype, 'ticks', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/ticks/set.js' ),
	'get': require( './props/ticks/get.js' )
});

/**
* Number of axis ticks.
*
* @memberof Axis.prototype
* @name numTicks
* @type {(NonNegativeInteger|null)}
* @default null
* @throws {TypeError} must be a nonnegative integer or null
*
* @example
* var axis = new Axis({
*     'orientation': 'bottom',
*     'numTicks': 10
* });
* axis.numTicks = 5;
*
* var v = axis.numTicks;
* // returns 5
*/
Object.defineProperty( Axis.prototype, 'numTicks', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/num-ticks/set.js' ),
	'get': require( './props/num-ticks/get.js' )
});

/**
* Tick format. When retrieved, the returned value is a formatting function.
*
* @memberof Axis.prototype
* @name tickFormat
* @type {(null|string|Function)}
* @default null
* @throws {TypeError} must be either null, a string, or a function
*
* @example
* var axis = new Axis({
*     'orientation': 'bottom',
*     'tickFormat': ',f'
* });
* axis.tickFormat = ',.0f';
*
* var v = axis.tickFormat;
* // returns <Function>
*/
Object.defineProperty( Axis.prototype, 'tickFormat', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/tick-format/set.js' ),
	'get': require( './props/tick-format/get.js' )
});

/**
* Axis tick size.
*
* @memberof Axis.prototype
* @name tickSize
* @type {NonNegativeInteger}
* @default 6
* @throws {TypeError} must be a nonnegative integer
*
* @example
* var axis = new Axis({
*     'orientation': 'bottom',
*     'tickSize': 12
* });
* axis.tickSize = 8;
*
* var v = axis.tickSize;
* // returns 8
*/
Object.defineProperty( Axis.prototype, 'tickSize', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/tick-size/set.js' ),
	'get': require( './props/tick-size/get.js' )
});

/**
* Axis inner tick size.
*
* @memberof Axis.prototype
* @name innerTickSize
* @type {NonNegativeInteger}
* @default 6
* @throws {TypeError} must be a nonnegative integer
*
* @example
* var axis = new Axis({
*     'orientation': 'bottom',
*     'innerTickSize': 10
* });
* axis.innerTickSize = 5;
*
* var v = axis.innerTickSize;
* // returns 5
*/
Object.defineProperty( Axis.prototype, 'innerTickSize', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/inner-tick-size/set.js' ),
	'get': require( './props/inner-tick-size/get.js' )
});

/**
* Axis outer tick size.
*
* @memberof Axis.prototype
* @name outerTickSize
* @type {NonNegativeInteger}
* @default 6
* @throws {TypeError} must be a nonnegative integer
*
* @example
* var axis = new Axis({
*     'orientation': 'bottom',
*     'outerTickSize': 10
* });
* axis.outerTickSize = 5;
*
* var v = axis.outerTickSize;
* // returns 5
*/
Object.defineProperty( Axis.prototype, 'outerTickSize', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/outer-tick-size/set.js' ),
	'get': require( './props/outer-tick-size/get.js' )
});

/**
* Axis tick padding.
*
* @memberof Axis.prototype
* @name tickPadding
* @type {NonNegativeInteger}
* @default 3
* @throws {TypeError} must be a nonnegative integer
*
* @example
* var axis = new Axis({
*     'orientation': 'bottom',
*     'tickPadding': 10
* });
* axis.tickPadding = 5;
*
* var v = axis.tickPadding;
* // returns 5
*/
Object.defineProperty( Axis.prototype, 'tickPadding', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/tick-padding/set.js' ),
	'get': require( './props/tick-padding/get.js' )
});

/**
* Tick spacing.
*
* @memberof Axis.prototype
* @type {number}
* @name tickSpacing
*
* @example
* var axis = new Axis();
* var spacing = axis.tickSpacing;
* // returns <number>
*/
Object.defineProperty( Axis.prototype, 'tickSpacing', {
	'configurable': false,
	'enumerable': true,
	'get': require( './props/tick-spacing/get.js' )
});

/**
* Tick direction.
*
* @memberof Axis.prototype
* @type {number}
* @name tickDir
*
* @example
* var axis = new Axis();
* var dir = axis.tickDir;
* // returns <number>
*/
Object.defineProperty( Axis.prototype, 'tickDir', {
	'configurable': false,
	'enumerable': true,
	'get': require( './props/tick-dir/get.js' )
});

/**
* Function for computing tick positions.
*
* @memberof Axis.prototype
* @type {Function}
* @name tickPos
*
* @example
* var axis = new Axis();
* var tickPos = axis.tickPos;
* // returns <Function>
*/
Object.defineProperty( Axis.prototype, 'tickPos', {
	'configurable': false,
	'enumerable': true,
	'get': require( './props/tick-pos/get.js' )
});

/**
* Rendering mode. If `true`, an instance re-renders on each change event.
*
* @memberof Axis.prototype
* @name autoRender
* @type {boolean}
* @default true
* @throws {TypeError} must be a boolean primitive
*
* @example
* var axis = new Axis({
*     'autoRender': true
* });
*
* var mode = axis.autoRender;
* // returns true
*/
Object.defineProperty( Axis.prototype, 'autoRender', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/auto-render/set.js' ),
	'get': require( './props/auto-render/get.js' )
});

/**
* Renders a virtual DOM tree.
*
* @memberof Axis.prototype
* @name render
* @type {Function}
* @returns {VTree} virtual tree
*
* @example
* var axis = new Axis();
*
* var out = axis.render();
*/
setReadOnly( Axis.prototype, 'render', require( './methods/render.js' ) );


// EXPORTS //

module.exports = Axis;

},{"./defaults.json":96,"./methods/render.js":101,"./props/auto-render/get.js":102,"./props/auto-render/set.js":103,"./props/inner-tick-size/get.js":104,"./props/inner-tick-size/set.js":105,"./props/label/get.js":106,"./props/label/set.js":107,"./props/num-ticks/get.js":108,"./props/num-ticks/set.js":109,"./props/orientation/get.js":110,"./props/orientation/set.js":111,"./props/outer-tick-size/get.js":112,"./props/outer-tick-size/set.js":113,"./props/scale/get.js":114,"./props/scale/set.js":115,"./props/tick-dir/get.js":116,"./props/tick-format/get.js":117,"./props/tick-format/set.js":118,"./props/tick-padding/get.js":119,"./props/tick-padding/set.js":120,"./props/tick-pos/get.js":122,"./props/tick-size/get.js":123,"./props/tick-size/set.js":124,"./props/tick-spacing/get.js":125,"./props/ticks/get.js":126,"./props/ticks/set.js":127,"./validate.js":138,"@stdlib/utils/copy":487,"@stdlib/utils/define-read-only-property":490,"d3-scale":545,"debug":549,"events":564}],89:[function(require,module,exports){
'use strict';

/*
* For manually constructing SVG paths, see [MDN]{@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d}
*/

// MODULES //

var debug = require( 'debug' )( 'axis:components:domain' );
var h = require( 'virtual-dom/h' );


// VARIABLES //

var ELEMENT = 'path';


// MAIN //

/**
* Renders an axis domain.
*
* @private
* @param {Object} ctx - context
* @returns {VTree} virtual tree
*/
function render( ctx ) {
	var orient;
	var stroke;
	var range0;
	var range1;
	var offset;
	var range;
	var props;
	var d;

	orient = ctx._orientation;
	debug( 'Axis orientation: %s.', orient );

	range = ctx._scale.range();
	debug( 'Axis range: %s.', JSON.stringify( range ) );

	range0 = range[ 0 ] + 0.5;
	range1 = range[ range.length-1 ] + 0.5;

	offset = ctx.tickDir * ctx._outerTickSize;
	d = '';
	if ( orient === 'left' || orient === 'right' ) {
		d += 'M' + offset + ',' + range0;
		d += 'H0.5';
		d += 'V' + range1;
		d += 'H' + offset;

		stroke = 'none';
	} else {
		d += 'M' + range0 + ',' + offset;
		d += 'V0.5';
		d += 'H' + range1;
		d += 'V' + offset;

		stroke = '#aaa';
	}
	props = {
		'namespace': 'http://www.w3.org/2000/svg',
		'property': 'axis.domain',
		'className': 'domain',
		'attributes': {
			'fill': 'none',
			'stroke': stroke,
			'stroke-width': 1,
			'd': d
		}
	};

	debug( 'Generating a virtual DOM tree (%s) with properties: %s.', ELEMENT, JSON.stringify( props ) );

	return h( ELEMENT, props, [] );
} // end FUNCTION render()


// EXPORTS //

module.exports = render;

},{"debug":549,"virtual-dom/h":614}],90:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'axis:components:main' );
var h = require( 'virtual-dom/h' );
var textAnchor = require( './../utils/text_anchor.js' );
var domain = require( './domain.js' );
var ticks = require( './ticks.js' );
var label = require( './label.js' );


// VARIABLES //

var ELEMENT = 'g';


// MAIN //

/**
* Renders an axis.
*
* @private
* @param {Object} ctx - context
* @returns {VTree} virtual tree
*/
function render( ctx ) {
	var children;
	var props;

	props = {
		'namespace': 'http://www.w3.org/2000/svg',
		'property': 'axis',
		'className': 'axis',
		'attributes': {
			'fill': 'none',
			'font-size': 10, // TODO: option
			'font-family': 'sans-serif', // TODO: option
			'text-anchor': textAnchor( ctx._orientation )
		}
	};

	debug( 'Rendering tick marks...' );
	children = ticks( ctx );

	debug( 'Rendering domain line...' );
	children.unshift( domain( ctx ) );

	debug( 'Rendering label...' );
	children.push( label( ctx ) );

	debug( 'Generating a virtual DOM tree (%s) with properties: %s.', ELEMENT, JSON.stringify( props ) );

	return h( ELEMENT, props, children );
} // end FUNCTION render()


// EXPORTS //

module.exports = render;

},{"./../utils/text_anchor.js":131,"./domain.js":89,"./label.js":91,"./ticks.js":95,"debug":549,"virtual-dom/h":614}],91:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'axis:components:label' );
var h = require( 'virtual-dom/h' );
var labelTransform = require( './../utils/label_transform.js' );
var labelXPos = require( './../utils/label_x_pos.js' );
var labelYPos = require( './../utils/label_y_pos.js' );


// VARIABLES //

var ELEMENT = 'text';


// MAIN //

/**
* Renders an axis label.
*
* @private
* @param {Object} ctx - context
* @returns {VTree} virtual tree
*/
function render( ctx ) {
	var orient;
	var props;

	orient = ctx._orientation;
	debug( 'Axis orientation: %s.', orient );

	props = {
		'namespace': 'http://www.w3.org/2000/svg',
		'property': 'axis.label',
		'className': 'label noselect',
		'attributes': {
			'fill': '#000',
			'stroke': 'none',
			'text-anchor': 'middle',
			'transform': labelTransform( orient ),
			'x': labelXPos( orient, ctx._scale.range() ),
			'y': labelYPos( orient )
		}
	};

	debug( 'Axis label: %s.', ctx._label );

	debug( 'Generating a virtual DOM tree (%s) with properties: %s.', ELEMENT, JSON.stringify( props ) );

	return h( ELEMENT, props, ctx._label );
} // end FUNCTION render()


// EXPORTS //

module.exports = render;

},{"./../utils/label_transform.js":128,"./../utils/label_x_pos.js":129,"./../utils/label_y_pos.js":130,"debug":549,"virtual-dom/h":614}],92:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'axis:components:line' );
var h = require( 'virtual-dom/h' );
var xAttr = require( './../utils/x_attr.js' );
var yAttr = require( './../utils/y_attr.js' );


// VARIABLES //

var ELEMENT = 'line';


// MAIN //

/**
* Renders a tick line.
*
* @private
* @param {Object} ctx - context
* @returns {VTree} virtual tree
*/
function render( ctx ) {
	var props;
	var x;
	var y;

	props = {
		'namespace': 'http://www.w3.org/2000/svg',
		'attributes': {
			'stroke': '#aaa',
			'stroke-width': 1
		}
	};

	x = xAttr( ctx._orientation );
	y = yAttr( ctx._orientation );

	props.attributes[ x+'2' ] = ctx.tickDir * ctx._innerTickSize;
	props.attributes[ y+'1' ] = 0.5;
	props.attributes[ y+'2' ] = 0.5;

	debug( 'Generating a virtual DOM tree (%s) with properties: %s.', ELEMENT, JSON.stringify( props ) );

	return h( ELEMENT, props, [] );
} // end FUNCTION render()


// EXPORTS //

module.exports = render;

},{"./../utils/x_attr.js":136,"./../utils/y_attr.js":137,"debug":549,"virtual-dom/h":614}],93:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'axis:components:text' );
var h = require( 'virtual-dom/h' );
var dy = require( './../utils/text_dy.js' );
var xAttr = require( './../utils/x_attr.js' );
var yAttr = require( './../utils/y_attr.js' );


// VARIABLES //

var ELEMENT = 'text';


// MAIN //

/**
* Renders tick text.
*
* @private
* @param {Object} ctx - context
* @param {*} d - tick value
* @returns {VTree} virtual tree
*/
function render( ctx, d ) {
	var orient;
	var props;
	var txt;
	var x;
	var y;

	orient = ctx._orientation;
	debug( 'Axis orientation: %s.', orient );

	props = {
		'namespace': 'http://www.w3.org/2000/svg',
		'attributes': {
			'fill': '#000',
			'dy': dy( orient )
		}
	};

	x = xAttr( orient );
	y = yAttr( orient );

	props.attributes[ x ] = ctx.tickDir * ctx.tickSpacing;
	props.attributes[ y ] = 0.5;

	txt = ctx.tickFormat( d );
	debug( 'Tick text: %s.', txt );

	debug( 'Generating a virtual DOM tree (%s) with properties: %s.', ELEMENT, JSON.stringify( props ) );

	return h( ELEMENT, props, txt );
} // end FUNCTION render()


// EXPORTS //

module.exports = render;

},{"./../utils/text_dy.js":132,"./../utils/x_attr.js":136,"./../utils/y_attr.js":137,"debug":549,"virtual-dom/h":614}],94:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'axis:components:tick' );
var h = require( 'virtual-dom/h' );
var line = require( './line.js' );
var text = require( './text.js' );


// VARIABLES //

var ELEMENT = 'g';


// MAIN //

/**
* Renders an axis tick.
*
* @private
* @param {Object} ctx - context
* @param {*} d - tick value
* @param {Function} transform - tick transform
* @returns {VTree} virtual tree
*/
function render( ctx, d, transform ) {
	var children;
	var props;

	props = {
		'namespace': 'http://www.w3.org/2000/svg',
		'property': 'axis.tick',
		'className': 'tick',
		'attributes': {
			'opacity': 1,
			'transform': transform( d )
		}
	};
	children = new Array( 2 );

	debug( 'Rendering a tick line...' );
	children[ 0 ] = line( ctx );

	debug( 'Rendering tick text...' );
	children[ 1 ] = text( ctx, d );

	debug( 'Generating a virtual DOM tree (%s) with properties: %s.', ELEMENT, JSON.stringify( props ) );

	return h( ELEMENT, props, children );
} // end FUNCTION render()


// EXPORTS //

module.exports = render;

},{"./line.js":92,"./text.js":93,"debug":549,"virtual-dom/h":614}],95:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'axis:components:ticks' );
var tickTransform = require( './../utils/tick_transform.js' );
var tick = require( './tick.js' );


// MAIN //

/**
* Renders axis ticks.
*
* @private
* @param {Object} ctx - context
* @returns {Array<VTree>} array of virtual DOM trees
*/
function render( ctx ) {
	var transform;
	var values;
	var out;
	var i;

	values = ctx.ticks;
	debug( 'Tick values: %s.', JSON.stringify( values ) );

	debug( 'Generating tick transform...' );
	transform = tickTransform( ctx._orientation, ctx._scale );

	debug( 'Rendering ticks...' );
	out = new Array( values.length );
	for ( i = 0; i < values.length; i++ ) {
		debug( 'Rendering tick %d with value %s...', i, values[i] );
		out[ i ] = tick( ctx, values[i], transform );
	}
	debug( 'Finished rendering ticks.' );
	return out;
} // end FUNCTION render()


// EXPORTS //

module.exports = render;

},{"./../utils/tick_transform.js":133,"./tick.js":94,"debug":549}],96:[function(require,module,exports){
module.exports={
	"scale": null,
	"label": "",
	"ticks": null,
	"numTicks": null,
	"tickFormat": null,
	"tickSize": 6,
	"innerTickSize": 6,
	"outerTickSize": 6,
	"tickPadding": 3,
	"orientation": "bottom",
	"autoRender": true
}

},{}],97:[function(require,module,exports){
module.exports=[
	"left",
	"right",
	"top",
	"bottom"
]

},{}],98:[function(require,module,exports){
module.exports={
	"label": "change",
	"numTicks": "change",
	"orientation": "change",
	"scale": "change",
	"tickFormat": "change",
	"tickPadding": "change",
	"ticks": "change",
	"tickSize": "change",
	"innerTickSize": "change",
	"outerTickSize": "change",
	"autoRender": "change"
}

},{}],99:[function(require,module,exports){
'use strict';

// MODULES //

var EVENTS = require( './events.json' );


// MAIN //

/**
* Provided a property, returns a corresponding event name for when a property value changes.
*
* @private
* @param {string} prop - property
* @returns {string} event name
*/
function get( prop ) {
	return EVENTS[ prop ];
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{"./events.json":98}],100:[function(require,module,exports){
'use strict';

// TODO: remove d3-scale

/**
* Plot axis.
*
* @module @stdlib/plot/components/svg/axis
*
* @example
* var linear = require( 'd3-scale' ).scaleLinear();
* var Axis = require( '@stdlib/plot/components/svg/axis' );
*
* var axis = new Axis({
*     'scale': linear(),
*     'orient': 'bottom'
* });
*/

// MODULES //

var Axis = require( './axis.js' );


// EXPORTS //

module.exports = Axis;

},{"./axis.js":88}],101:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'axis:render' );
var components = require( './../components' );


// MAIN //

/**
* Renders a virtual DOM tree.
*
* @private
* @returns {VTree} virtual tree
*/
function render() {
	/* jshint validthis: true */ // TODO: eslint
	var vtree;

	debug( 'Rendering...' );
	vtree = components( this );

	// Announce that a new tree has been rendered:
	this.emit( '_render', vtree );

	return vtree;
} // end FUNCTION render()


// EXPORTS //

module.exports = render;

},{"./../components":90,"debug":549}],102:[function(require,module,exports){
'use strict';

/**
* Returns the rendering mode.
*
* @private
* @returns {boolean} rendering mode
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._autoRender;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],103:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'axis:set:auto-render' );
var events = require( './../../events' );
var isValid = require( './../../validators/auto_render.js' );


// VARIABLES //

var CHANGE_EVENT = events( 'autoRender' );


// MAIN //

/**
* Sets the rendering mode.
*
* @private
* @param {boolean} bool - boolean indicating whether to re-render on a change event
* @throws {TypeError} must be a positive number
*/
function set( bool ) {
	/*jshint validthis: true */ // TODO: eslint
	var err = isValid( bool );
	if ( err ) {
		throw err;
	}
	debug( 'Current value: %d.', this._autoRender );

	this._autoRender = bool;
	debug( 'New Value: %d.', this._autoRender );

	this.emit( CHANGE_EVENT );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"./../../events":99,"./../../validators/auto_render.js":139,"debug":549}],104:[function(require,module,exports){
'use strict';

/**
* Returns the inner tick size.
*
* @private
* @returns {NonNegativeInteger} tick size
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._innerTickSize;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],105:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'axis:set:ticksize-inner' );
var events = require( './../../events' );
var isValid = require( './../../validators/inner_tick_size.js' );


// VARIABLES //

var CHANGE_EVENT = events( 'innerTickSize' );


// MAIN //

/**
* Sets the inner tick size.
*
* @private
* @param {NonNegativeInteger} size - size
* @throws {TypeError} must be a nonnegative integer
*/
function set( size ) {
	/*jshint validthis: true */ // TODO: eslint
	var err = isValid( size );
	if ( err ) {
		throw err;
	}
	debug( 'Current value: %d.', size );

	this._innerTickSize = size;
	debug( 'New Value: %s.', this._innerTickSize );

	this.emit( CHANGE_EVENT );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"./../../events":99,"./../../validators/inner_tick_size.js":141,"debug":549}],106:[function(require,module,exports){
'use strict';

/**
* Returns the axis label.
*
* @private
* @returns {string} label
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._label;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],107:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'axis:set:xlabel' );
var events = require( './../../events' );
var isValid = require( './../../validators/label.js' );


// VARIABLES //

var CHANGE_EVENT = events( 'label' );


// MAIN //

/**
* Sets the axis label.
*
* @private
* @param {string} label - axis label
* @throws {TypeError} must be a string primitive
*/
function set( label ) {
	/*jshint validthis: true */ // TODO: eslint
	var err = isValid( label );
	if ( err ) {
		throw err;
	}
	debug( 'Current value: %s.', this._label );

	this._label = label;
	debug( 'New value: %s.', this._label );

	this.emit( CHANGE_EVENT );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"./../../events":99,"./../../validators/label.js":142,"debug":549}],108:[function(require,module,exports){
'use strict';

/**
* Returns the number of axis ticks.
*
* @private
* @returns {(NonNegativeInteger|null)} number of ticks
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._numTicks;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],109:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'axis:set:numticks' );
var events = require( './../../events' );
var isValid = require( './../../validators/num_ticks.js' );


// VARIABLES //

var CHANGE_EVENT = events( 'numTicks' );


// MAIN //

/**
* Sets the number of axis ticks.
*
* @private
* @param {(NonNegativeInteger|null)} num - num
* @throws {TypeError} must be a nonnegative integer or null
*/
function set( num ) {
	/*jshint validthis: true */ // TODO: eslint
	var err = isValid( num );
	if ( err ) {
		throw err;
	}
	debug( 'Current value: %d.', num );

	this._numTicks = num;
	debug( 'New Value: %s.', this._numTicks );

	this.emit( CHANGE_EVENT );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"./../../events":99,"./../../validators/num_ticks.js":143,"debug":549}],110:[function(require,module,exports){
'use strict';

/**
* Returns the axis orientation.
*
* @private
* @returns {string} orientation
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._orientation;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],111:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'axis:set:orientation' );
var events = require( './../../events' );
var isValid = require( './../../validators/orientation.js' );


// VARIABLES //

var CHANGE_EVENT = events( 'orientation' );


// MAIN //

/**
* Sets the axis orientation.
*
* @private
* @param {string} orient - axis orientation
* @throws {TypeError} must be a string
*/
function set( orient ) {
	/*jshint validthis: true */ // TODO: eslint
	var err = isValid( orient );
	if ( err ) {
		throw err;
	}
	debug( 'Current value: %s.', this._orientation );

	this._orientation = orient;
	debug( 'New Value: %s.', this._orientation );

	this.emit( CHANGE_EVENT );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"./../../events":99,"./../../validators/orientation.js":144,"debug":549}],112:[function(require,module,exports){
'use strict';

/**
* Returns the axis outer tick size.
*
* @private
* @returns {NonNegativeInteger} tick size
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._outerTickSize;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],113:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'axis:set:ticksize-outer' );
var events = require( './../../events' );
var isValid = require( './../../validators/outer_tick_size.js' );


// VARIABLES //

var CHANGE_EVENT = events( 'outerTickSize' );


// MAIN //

/**
* Sets the axis outer tick size.
*
* @private
* @param {NonNegativeInteger} size - size
* @throws {TypeError} must be a nonnegative integer
*/
function set( size ) {
	/*jshint validthis: true */ // TODO: eslint
	var err = isValid( size );
	if ( err ) {
		throw err;
	}
	debug( 'Current value: %d.', size );

	this._outerTickSize = size;
	debug( 'New Value: %s.', this._outerTickSize );

	this.emit( CHANGE_EVENT );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"./../../events":99,"./../../validators/outer_tick_size.js":145,"debug":549}],114:[function(require,module,exports){
'use strict';

/**
* Returns the scale function.
*
* @private
* @returns {Function} scale function
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._scale;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],115:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'axis:set:scale' );
var events = require( './../../events' );
var isValid = require( './../../validators/scale.js' );


// VARIABLES //

var CHANGE_EVENT = events( 'scale' );


// MAIN //

/**
* Sets the scale function.
*
* @private
* @param {Function} fcn - scale
* @throws {TypeError} must be a function
*/
function set( fcn ) {
	/*jshint validthis: true */ // TODO: eslint
	var err = isValid( fcn );
	if ( err ) {
		throw err;
	}
	debug( 'Current value: %s.', this._scale );

	this._scale = fcn;
	debug( 'New Value: %s.', this._scale );

	this.emit( CHANGE_EVENT );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"./../../events":99,"./../../validators/scale.js":146,"debug":549}],116:[function(require,module,exports){
'use strict';

/**
* Returns the tick direction.
*
* @private
* @returns {number} tick direction
*/
function get() {
	/* jshint validthis:true */ // TODO: eslint
	if (
		this._orientation === 'top' ||
		this._orientation === 'left'
	) {
		return -1;
	}
	return 1;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],117:[function(require,module,exports){
'use strict';

// MODULES //

var format = require( 'd3-format' ).format; // TODO: remove
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var isNull = require( '@stdlib/assert/is-null' );
var identity = require( '@stdlib/utils/identity-function' );


// MAIN //

/**
* Returns the axis tick format.
*
* @private
* @returns {Function} format function
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	if ( isString( this._tickFormat ) ) {
		return format( this._tickFormat );
	}
	if ( isNull( this._tickFormat ) ) {
		if ( this._scale.tickFormat ) {
			return this._scale.tickFormat( this._numTicks, this._tickFormat );
		}
		return identity;
	}
	return this._tickFormat;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{"@stdlib/assert/is-null":37,"@stdlib/assert/is-string":62,"@stdlib/utils/identity-function":502,"d3-format":542}],118:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'axis:set:tickformat' );
var events = require( './../../events' );
var isValid = require( './../../validators/tick_format.js' );


// VARIABLES //

var CHANGE_EVENT = events( 'tickFormat' );


// MAIN //

/**
* Sets the axis tick format.
*
* @private
* @param {(null|string|Function)} fmt - tick format
* @throws {TypeError} must be either null, a string, or a function
*/
function set( fmt ) {
	/*jshint validthis: true */ // TODO: eslint
	var err = isValid( fmt );
	if ( err ) {
		throw err;
	}
	debug( 'Current value: %s.', this._tickFormat );

	this._tickFormat = fmt;
	debug( 'New Value: %s.', this._tickFormat );

	this.emit( CHANGE_EVENT );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"./../../events":99,"./../../validators/tick_format.js":147,"debug":549}],119:[function(require,module,exports){
'use strict';

/**
* Returns the axis tick padding.
*
* @private
* @returns {NonNegativeInteger} padding
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._tickPadding;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],120:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'axis:set:tickpadding' );
var events = require( './../../events' );
var isValid = require( './../../validators/tick_padding.js' );


// VARIABLES //

var CHANGE_EVENT = events( 'tickPadding' );


// MAIN //

/**
* Sets the axis tick padding.
*
* @private
* @param {NonNegativeInteger} padding - padding
* @throws {TypeError} must be a nonnegative integer
*/
function set( padding ) {
	/*jshint validthis: true */ // TODO: eslint
	var err = isValid( padding );
	if ( err ) {
		throw err;
	}
	debug( 'Current value: %d.', padding );

	this._tickPadding = padding;
	debug( 'New Value: %s.', this._tickPadding );

	this.emit( CHANGE_EVENT );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"./../../events":99,"./../../validators/tick_padding.js":148,"debug":549}],121:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'axis:center' );


// MAIN //

/**
* Returns a function to center a tick.
*
* @private
* @returns {Function} function to center a tick
*/
function center() {
	/* jshint validthis: true */ // TODO: eslint
	var width = this._scale.bandwidth() / 2;

	/**
	* Returns a centered tick position.
	*
	* @private
	* @param {*} d - datum
	* @returns {number} tick position
	*/
	return function center( d ) {
		var pos = this._scale( d ) + width;
		debug( 'Value: %s => Coordinate: %d', d, pos );
		return pos;
	};
} // end FUNCTION center()


// EXPORTS //

module.exports = center;

},{"debug":549}],122:[function(require,module,exports){
'use strict';

// MODULES //

var center = require( './center.js' );


// MAIN //

/**
* Returns a function for positioning ticks.
*
* @private
* @returns {Function} position function
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	var scale = this._scale.copy();
	if ( scale.bandwidth ) {
		return center( scale );
	}
	return scale;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{"./center.js":121}],123:[function(require,module,exports){
'use strict';

/**
* Returns the axis tick size.
*
* @private
* @returns {NonNegativeInteger} tick size
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._tickSize;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],124:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'axis:set:ticksize' );
var events = require( './../../events' );
var isValid = require( './../../validators/tick_size.js' );


// VARIABLES //

var CHANGE_EVENT = events( 'tickSize' );


// MAIN //

/**
* Sets the axis tick size.
*
* @private
* @param {NonNegativeInteger} size - size
* @throws {TypeError} must be a nonnegative integer
*/
function set( size ) {
	/*jshint validthis: true */ // TODO: eslint
	var err = isValid( size );
	if ( err ) {
		throw err;
	}
	debug( 'Current value: %d.', size );

	this._tickSize = size;
	debug( 'New Value: %s.', this._tickSize );

	this.emit( CHANGE_EVENT );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"./../../events":99,"./../../validators/tick_size.js":149,"debug":549}],125:[function(require,module,exports){
'use strict';

/**
* Returns the tick spacing.
*
* @private
* @returns {number} tick spacing
*/
function get() {
	/*jshint validthis: true */ // TODO: eslint
	return this._innerTickSize + this._tickPadding;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],126:[function(require,module,exports){
'use strict';

// MODULES //

var isNull = require( '@stdlib/assert/is-null' );


// MAIN //

/**
* Returns the axis tick values.
*
* @private
* @returns {Array} ticks
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	if ( isNull( this._ticks ) ) {
		if ( this._scale.ticks ) {
			return this._scale.ticks( this._numTicks, this._tickFormat );
		}
		return this._scale.domain();
	}
	return this._ticks.slice();
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{"@stdlib/assert/is-null":37}],127:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'axis:set:ticks' );
var isNull = require( '@stdlib/assert/is-null' );
var events = require( './../../events' );
var isValid = require( './../../validators/ticks.js' );


// VARIABLES //

var CHANGE_EVENT = events( 'ticks' );


// MAIN //

/**
* Sets the axis tick values.
*
* @private
* @param {(Array|null)} ticks - tick values
* @throws {TypeError} must be an array or null
*/
function set( ticks ) {
	/*jshint validthis: true */ // TODO: eslint
	var err = isValid( ticks );
	if ( err ) {
		throw err;
	}
	debug( 'Current value: %s.', JSON.stringify( this._ticks ) );

	if ( isNull( ticks ) ) {
		this._ticks =  ticks;
	} else {
		this._ticks = ticks.slice();
	}
	debug( 'New Value: %s.', JSON.stringify( this._ticks ) );

	this.emit( CHANGE_EVENT );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"./../../events":99,"./../../validators/ticks.js":150,"@stdlib/assert/is-null":37,"debug":549}],128:[function(require,module,exports){
'use strict';

/**
* Returns a label SVG transform.
*
* @private
* @param {string} orient - axis orientation
* @returns {string} SVG transform
*/
function labelTransform( orient ) {
	if ( orient === 'bottom' || orient === 'top' ) {
		return 'rotate(0)';
	}
	if ( orient === 'left' ) {
		return 'rotate(-90)';
	}
	// orient === 'right'
	return 'rotate(90)';
} // end FUNCTION labelTransform()


// EXPORTS //

module.exports = labelTransform;

},{}],129:[function(require,module,exports){
'use strict';

/**
* Returns the label `x` coordinate.
*
* @private
* @param {string} orient - axis orientation
* @param {NumericArray} range - scale range
* @returns {number} `x` coordinate
*/
function labelXPos( orient, range ) {
	if ( orient === 'left' || orient === 'right' ) {
		return -range[0] / 2;
	}
	return range[1] / 2;
} // end FUNCTION labelXPos()


// EXPORTS //

module.exports = labelXPos;

},{}],130:[function(require,module,exports){
'use strict';

/**
* Returns the label `y` coordinate.
*
* @private
* @param {string} orient - axis orientation
* @returns {number} `y` coordinate
*/
function labelYPos( orient ) {
	if ( orient === 'left' ) {
		return -72;
	}
	if ( orient === 'right' ) {
		return 72;
	}
	if ( orient === 'bottom' ) {
		return 45;
	}
	// orient === 'top'
	return -45;
} // end FUNCTION labelYPos()


// EXPORTS //

module.exports = labelYPos;

},{}],131:[function(require,module,exports){
'use strict';

/**
* Returns the text anchor value for text positioning.
*
* @private
* @param {string} orient - axis orientation
* @returns {string} text anchor value
*/
function textAnchor( orient ) {
	if ( orient === 'left' ) {
		return 'end';
	}
	if ( orient === 'right' ) {
		return 'start';
	}
	return 'middle';
} // end FUNCTION textAnchor()


// EXPORTS //

module.exports = textAnchor;

},{}],132:[function(require,module,exports){
'use strict';

/**
* Returns vertical shift for aligning tick text.
*
* @private
* @param {string} orient - axis orientation
* @returns {string} text shift
*/
function dy( orient ) {
	if ( orient === 'top' ) {
		return '0em';
	}
	if ( orient === 'bottom' ) {
		return '.71em';
	}
	return '.32em';
} // end FUNCTION dy()


// EXPORTS //

module.exports = dy;

},{}],133:[function(require,module,exports){
'use strict';

// MODULES //

var translateX = require( './translate_x.js' );
var translateY = require( './translate_y.js' );


// MAIN //

/**
* Returns a function to translate ticks.
*
* @private
* @param {string} orient - axis orientation
* @param {Function} scale - scale function
* @returns {Function} transform function
*/
function tickTransform( orient, scale ) {
	if ( orient === 'top' || orient === 'bottom' ) {
		return translateX( scale );
	}
	return translateY( scale );
} // end FUNCTION tickTransform()


// EXPORTS //

module.exports = tickTransform;

},{"./translate_x.js":134,"./translate_y.js":135}],134:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'axis:engine:translate-x' );


// MAIN //

/**
* Returns a function to horizontally translate a tick.
*
* @private
* @param {Function} scale - scale function
* @returns {Function} function to translate a tick
*/
function translateX( scale ) {
	/**
	* Horizontally translates a tick.
	*
	* @private
	* @param {*} d - datum
	* @returns {string} transform
	*/
	return function translateX( d ) {
		var t = 'translate('+scale( d )+',0)';
		debug( 'Value: %s => Transform: %s.', d, t );
		return t;
	}; // end FUNCTION translateX()
} // end FUNCTION translateX()


// EXPORTS //

module.exports = translateX;

},{"debug":549}],135:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'axis:engine:translate-y' );


// MAIN //

/**
* Returns a function to vertically translate a tick.
*
* @private
* @param {Function} scale - scale function
* @returns {Function} function to translate a tick
*/
function translateY( scale ) {
	/**
	* Vertically translates a tick.
	*
	* @private
	* @param {*} d - datum
	* @returns {string} transform
	*/
	return function translateY( d ) {
		var t = 'translate(0,'+scale( d )+')';
		debug( 'Value: %s => Transform: %s.', d, t );
		return t;
	}; // end FUNCTION translateY()
} // end FUNCTION translateY()


// EXPORTS //

module.exports = translateY;

},{"debug":549}],136:[function(require,module,exports){
'use strict';

/**
* Returns the "x" attribute for tick positioning.
*
* @private
* @param {string} orient - axis orientation
* @returns {string} attribute
*/
function xAttr( orient ) {
	if ( orient === 'left' || orient === 'right' ) {
		return 'x';
	}
	return 'y';
} // end FUNCTION xAttr()


// EXPORTS //

module.exports = xAttr;

},{}],137:[function(require,module,exports){
'use strict';

/**
* Returns the "y" attribute for tick positioning.
*
* @private
* @param {string} orient - axis orientation
* @returns {string} attribute
*/
function yAttr( orient ) {
	if ( orient === 'left' || orient === 'right' ) {
		return 'y';
	}
	return 'x';
} // end FUNCTION yAttr()


// EXPORTS //

module.exports = yAttr;

},{}],138:[function(require,module,exports){
'use strict';

// MODULES //

var getKeys = require( 'object-keys' ).shim();
var isObject = require( '@stdlib/assert/is-plain-object' );
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var validators = require( './validators' );


// VARIABLES //

var KEYS = getKeys( validators );


// MAIN //

/**
* Validates function options.
*
* @private
* @param {Object} opts - destination object
* @param {Options} options - function options
* @param {Function} [options.scale] - scale function
* @param {string} [options.orientation] - axis orientation
* @param {string} [options.label] - axis label
* @param {(Array|null)} [options.ticks] - tick values
* @param {(NonNegativeInteger|null)} [options.numTicks] - number of ticks
* @param {(null|string|Function)} [options.tickFormat] - tick format
* @param {NonNegativeInteger} [options.tickSize] - tick size
* @param {NonNegativeInteger} [options.innerTickSize] - inner tick size
* @param {NonNegativeInteger} [options.outerTickSize] - outer tick size
* @param {NonNegativeInteger} [options.tickPadding] - tick padding
* @returns {(Error|null)} error or null
*
* @example
* var opts = {};
* var options = {
*     'scale': function scale(){}
*     'orientation': 'left',
*     'tickSize': 10
* };
* var err = validate( opts, options );
* if ( err ) {
*     throw err;
* }
*/
function validate( opts, options ) {
	var err;
	var key;
	var val;
	var i;
	if ( !isObject( options ) ) {
		return new TypeError( 'invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	for ( i = 0; i < KEYS.length; i++ ) {
		key = KEYS[ i ];
		if ( hasOwnProp( options, key ) ) {
			val = options[ key ];
			err = validators[ key ]( val );
			if ( err ) {
				return err;
			}
			opts[ key ] = val;
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;

},{"./validators":140,"@stdlib/assert/has-own-property":2,"@stdlib/assert/is-plain-object":50,"object-keys":577}],139:[function(require,module,exports){
'use strict';

// MODULES //

var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;


/**
* Validates `autoRender`.
*
* @private
* @param {*} v - value to test
* @returns {(Error|null)} error object or null
*/
function test( v ) {
	if ( !isBoolean( v ) ) {
		return new TypeError( 'invalid value. `autoRender` must be a boolean primitive. Value: `' + v + '.`' );
	}
	return null;
} // end FUNCTION test()


// EXPORTS //

module.exports = test;

},{"@stdlib/assert/is-boolean":10}],140:[function(require,module,exports){
'use strict';

var validators = {
	'autoRender': require( './auto_render.js' ),
	'label': require( './label.js' ),
	'numTicks': require( './num_ticks.js' ),
	'orientation': require( './orientation.js' ),
	'scale': require( './scale.js' ),
	'tickFormat': require( './tick_format.js' ),
	'tickPadding': require( './tick_padding.js' ),
	'ticks': require( './ticks.js' ),
	'tickSize': require( './tick_size.js' ),
	'innerTickSize': require( './inner_tick_size.js' ),
	'outerTickSize': require( './outer_tick_size.js' )
};


// EXPORTS //

module.exports = validators;

},{"./auto_render.js":139,"./inner_tick_size.js":141,"./label.js":142,"./num_ticks.js":143,"./orientation.js":144,"./outer_tick_size.js":145,"./scale.js":146,"./tick_format.js":147,"./tick_padding.js":148,"./tick_size.js":149,"./ticks.js":150}],141:[function(require,module,exports){
'use strict';

// MODULES //

var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;


/**
* Validates `innerTickSize`.
*
* @private
* @param {*} v - value to test
* @returns {(Error|null)} error object or null
*/
function test( v ) {
	if ( !isNonNegativeInteger( v ) ) {
		return new TypeError( 'invalid value. `innerTickSize` must be a nonnegative integer. Value: `' + v + '.`' );
	}
	return null;
} // end FUNCTION test()


// EXPORTS //

module.exports = test;

},{"@stdlib/assert/is-nonnegative-integer":34}],142:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;


/**
* Validates `label`.
*
* @private
* @param {*} v - value to test
* @returns {(Error|null)} error object or null
*/
function test( v ) {
	if ( !isString( v ) ) {
		return new TypeError( 'invalid value. `label` must be a string. Value: `' + v + '.`' );
	}
	return null;
} // end FUNCTION test()


// EXPORTS //

module.exports = test;

},{"@stdlib/assert/is-string":62}],143:[function(require,module,exports){
'use strict';

// MODULES //

var isNull = require( '@stdlib/assert/is-null' );
var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;


/**
* Validates `numTicks`.
*
* @private
* @param {*} v - value to test
* @returns {(Error|null)} error object or null
*/
function test( v ) {
	if (
		!isNull( v ) &&
		!isNonNegativeInteger( v )
	) {
		return new TypeError( 'invalid value. `numTicks` must be a nonnegative integer or null. Value: `' + v + '.`' );
	}
	return null;
} // end FUNCTION test()


// EXPORTS //

module.exports = test;

},{"@stdlib/assert/is-nonnegative-integer":34,"@stdlib/assert/is-null":37}],144:[function(require,module,exports){
'use strict';

// MODULES //

var indexOf = require( '@stdlib/utils/index-of' );
var ORIENTATIONS = require( './../etc/orientations.json' );


/**
* Validates `orientation`.
*
* @private
* @param {*} v - value to test
* @returns {(Error|null)} error object or null
*/
function test( v ) {
	if ( indexOf( ORIENTATIONS, v ) === -1 ) {
		return new TypeError( 'invalid value. `orientation` must be one of `[' + ORIENTATIONS.join(',') + ']`. Value: `' + v + '.`' );
	}
	return null;
} // end FUNCTION test()


// EXPORTS //

module.exports = test;

},{"./../etc/orientations.json":97,"@stdlib/utils/index-of":503}],145:[function(require,module,exports){
'use strict';

// MODULES //

var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;


/**
* Validates `outerTickSize`.
*
* @private
* @param {*} v - value to test
* @returns {(Error|null)} error object or null
*/
function test( v ) {
	if ( !isNonNegativeInteger( v ) ) {
		return new TypeError( 'invalid value. `outerTickSize` must be a nonnegative integer. Value: `' + v + '.`' );
	}
	return null;
} // end FUNCTION test()


// EXPORTS //

module.exports = test;

},{"@stdlib/assert/is-nonnegative-integer":34}],146:[function(require,module,exports){
'use strict';

// MODULES //

var isFunction = require( '@stdlib/assert/is-function' );


/**
* Validates `scale`.
*
* @private
* @param {*} v - value to test
* @returns {(Error|null)} error object or null
*/
function test( v ) {
	if ( !isFunction( v ) ) {
		return new TypeError( 'invalid value. `scale` must be a function. Value: `' + v + '.`' );
	}
	return null;
} // end FUNCTION test()


// EXPORTS //

module.exports = test;

},{"@stdlib/assert/is-function":21}],147:[function(require,module,exports){
'use strict';

// MODULES //

var isNull = require( '@stdlib/assert/is-null' );
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var isFunction = require( '@stdlib/assert/is-function' );


/**
* Validates `tickFormat`.
*
* @private
* @param {*} v - value to test
* @returns {(Error|null)} error object or null
*/
function test( v ) {
	if (
		!isNull( v ) &&
		!isString( v ) &&
		!isFunction( v )
	) {
		return new TypeError( 'invalid value. `tickFormat` must be a string, function, or null. Value: `' + v + '.`' );
	}
	return null;
} // end FUNCTION test()


// EXPORTS //

module.exports = test;

},{"@stdlib/assert/is-function":21,"@stdlib/assert/is-null":37,"@stdlib/assert/is-string":62}],148:[function(require,module,exports){
'use strict';

// MODULES //

var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;


/**
* Validates `tickPadding`.
*
* @private
* @param {*} v - value to test
* @returns {(Error|null)} error object or null
*/
function test( v ) {
	if ( !isNonNegativeInteger( v ) ) {
		return new TypeError( 'invalid value. `tickPadding` must be a nonnegative integer. Value: `' + v + '.`' );
	}
	return null;
} // end FUNCTION test()


// EXPORTS //

module.exports = test;

},{"@stdlib/assert/is-nonnegative-integer":34}],149:[function(require,module,exports){
'use strict';

// MODULES //

var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;


/**
* Validates `tickSize`.
*
* @private
* @param {*} v - value to test
* @returns {(Error|null)} error object or null
*/
function test( v ) {
	if ( !isNonNegativeInteger( v ) ) {
		return new TypeError( 'invalid value. `tickSize` must be a nonnegative integer. Value: `' + v + '.`' );
	}
	return null;
} // end FUNCTION test()


// EXPORTS //

module.exports = test;

},{"@stdlib/assert/is-nonnegative-integer":34}],150:[function(require,module,exports){
'use strict';

// MODULES //

var isNull = require( '@stdlib/assert/is-null' );
var isArray = require( '@stdlib/assert/is-array' );


/**
* Validates `ticks`.
*
* @private
* @param {*} v - value to test
* @returns {(Error|null)} error object or null
*/
function test( v ) {
	if (
		!isNull( v ) &&
		!isArray( v )
	) {
		return new TypeError( 'invalid value. `ticks` must be either null or an array. Value: `' + v + '.`' );
	}
	return null;
} // end FUNCTION test()


// EXPORTS //

module.exports = test;

},{"@stdlib/assert/is-array":7,"@stdlib/assert/is-null":37}],151:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'background:main' );
var EventEmitter = require( 'events' ).EventEmitter;
var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var copy = require( '@stdlib/utils/copy' );
var defaults = require( './defaults.json' );
var validate = require( './validate.js' );


// MAIN //

/**
* Background constructor.
*
* @constructor
* @param {Options} options - constructor options
* @param {PositiveNumber} [options.width=400] - width
* @param {PositiveNumber} [options.height=400] - height
* @param {boolean} [options.autoRender=true] - indicates whether to re-render on a change event
* @throws {TypeError} must provide valid options
* @returns {Background} background instance
*
* @example
* var bkgd = new Background({
*     'width': 500,
*     'height': 500
* });
*/
function Background( options ) {
	var self;
	var opts;
	var err;
	if ( !( this instanceof Background ) ) {
		return new Background( options );
	}
	self = this;
	opts = copy( defaults );
	err = validate( opts, options );
	if ( err ) {
		throw err;
	}
	debug( 'Creating an instance with the following configuration: %s.', JSON.stringify( opts ) );
	EventEmitter.call( this );

	Object.defineProperty( this, '_width', {
		'configurable': false,
		'enumerable': false,
		'writable': true,
		'value': opts.width
	});
	Object.defineProperty( this, '_height', {
		'configurable': false,
		'enumerable': false,
		'writable': true,
		'value': opts.height
	});
	Object.defineProperty( this, '_autoRender', {
		'configurable': false,
		'enumerable': false,
		'writable': true,
		'value': opts.autoRender
	});

	this.on( 'change', onChange );
	this.on( '_render', onRender );

	return this;

	/**
	* Callback invoked upon receiving a change event.
	*
	* @private
	*/
	function onChange() {
		debug( 'Received a change event.' );
		if ( self._autoRender ) {
			self.render();
		}
	}

	/**
	* Re-emits a render event.
	*
	* @private
	*/
	function onRender() {
		var args;
		var i;
		debug( 'Received a render event. Re-emitting...' );
		args = new Array( arguments.length+1 );
		args[ 0 ] = 'render';
		for ( i = 0; i < arguments.length; i++ ) {
			args[ i+1 ] = arguments[ i ];
		}
		self.emit.apply( self, args );
	}
} // end FUNCTION Background()

/*
* Create a prototype which inherits from the parent prototype.
*/
Background.prototype = Object.create( EventEmitter.prototype );

/*
* Set the constructor.
*/
Background.prototype.constructor = Background;

/**
* Width.
*
* @memberof Background.prototype
* @name width
* @type {PositiveNumber}
* @default 400
* @throws {TypeError} must be a positive number
*
* @example
* var bkgd = new Background({
*     'width': 500
* });
*
* var width = bkgd.width;
* // returns 500
*/
Object.defineProperty( Background.prototype, 'width', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/width/set.js' ),
	'get': require( './props/width/get.js' )
});

/**
* Height.
*
* @memberof Background.prototype
* @name height
* @type {PositiveNumber}
* @default 400
* @throws {TypeError} must be a positive number
*
* @example
* var bkgd = new Background({
*     'height': 500
* });
*
* var height = bkgd.height;
* // returns 500
*/
Object.defineProperty( Background.prototype, 'height', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/height/set.js' ),
	'get': require( './props/height/get.js' )
});

/**
* Rendering mode. If `true`, an instance re-renders on each change event.
*
* @memberof Background.prototype
* @name autoRender
* @type {boolean}
* @default true
* @throws {TypeError} must be a boolean primitive
*
* @example
* var bkgd = new Background({
*     'autoRender': true
* });
*
* var mode = bkgd.autoRender;
* // returns true
*/
Object.defineProperty( Background.prototype, 'autoRender', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/auto-render/set.js' ),
	'get': require( './props/auto-render/get.js' )
});

/**
* Renders a virtual DOM tree.
*
* @memberof Background.prototype
* @name render
* @type {Function}
* @returns {VTree} virtual tree
*
* @example
* var bkgd = new Background();
*
* var out = bkgd.render();
*/
setReadOnly( Background.prototype, 'render', require( './methods/render.js' ) );


// EXPORTS //

module.exports = Background;

},{"./defaults.json":152,"./methods/render.js":156,"./props/auto-render/get.js":157,"./props/auto-render/set.js":158,"./props/height/get.js":159,"./props/height/set.js":160,"./props/width/get.js":161,"./props/width/set.js":162,"./validate.js":163,"@stdlib/utils/copy":487,"@stdlib/utils/define-read-only-property":490,"debug":549,"events":564}],152:[function(require,module,exports){
module.exports={
	"width": 400,
	"height": 400,
	"autoRender": true
}

},{}],153:[function(require,module,exports){
module.exports={
	"width": "change",
	"height": "change",
	"autoRender": "change"
}

},{}],154:[function(require,module,exports){
arguments[4][99][0].apply(exports,arguments)
},{"./events.json":153,"dup":99}],155:[function(require,module,exports){
'use strict';

/**
* Background.
*
* @module @stdlib/plot/components/svg/background
*
* @example
* var Background = require( '@stdlib/plot/components/svg/background' );
*
* var bkgd = new Background({
*     'width': 400,
*     'height': 400
* });
*/

// MODULES //

var Background = require( './background.js' );


// EXPORTS //

module.exports = Background;

},{"./background.js":151}],156:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'background:render' );
var h = require( 'virtual-dom/h' );


// VARIABLES //

var ELEMENT = 'rect';


// MAIN //

/**
* Renders a virtual DOM tree.
*
* @private
* @returns {VTree} virtual DOM tree
*/
function render() {
	/* jshint validthis: true */ // TODO: eslint
	var props;
	var vtree;

	debug( 'Rendering...' );

	props = {
		'namespace': 'http://www.w3.org/2000/svg',
		'className': 'background',
		'attributes': {
			'x': 0,
			'y': 0,
			'width': this.width,
			'height': this.height,
			'fill': 'none',
			'stroke': 'none'
		}
	};
	debug( 'Generating a virtual DOM tree (%s) with properties: %s.', ELEMENT, JSON.stringify( props ) );
	vtree = h( ELEMENT, props, [] );

	// Announce that a new tree has been rendered:
	this.emit( '_render', vtree );

	return vtree;
} // end FUNCTION render()


// EXPORTS //

module.exports = render;

},{"debug":549,"virtual-dom/h":614}],157:[function(require,module,exports){
arguments[4][102][0].apply(exports,arguments)
},{"dup":102}],158:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'background:set:auto-render' );
var events = require( './../../events' );
var isValid = require( './../../validators/auto_render.js' );


// VARIABLES //

var CHANGE_EVENT = events( 'autoRender' );


// MAIN //

/**
* Sets the rendering mode.
*
* @private
* @param {boolean} bool - boolean indicating whether to re-render on a change event
* @throws {TypeError} must be a positive number
*/
function set( bool ) {
	/*jshint validthis: true */ // TODO: eslint
	var err = isValid( bool );
	if ( err ) {
		throw err;
	}
	debug( 'Current value: %d.', this._autoRender );

	this._autoRender = bool;
	debug( 'New Value: %d.', this._autoRender );

	this.emit( CHANGE_EVENT );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"./../../events":154,"./../../validators/auto_render.js":164,"debug":549}],159:[function(require,module,exports){
'use strict';

/**
* Returns the height.
*
* @private
* @returns {number} height
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._height;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],160:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'background:set:height' );
var events = require( './../../events' );
var isValid = require( './../../validators/height.js' );


// VARIABLES //

var CHANGE_EVENT = events( 'height' );


// MAIN //

/**
* Sets the height.
*
* @private
* @param {PositiveNumber} height - height
* @throws {TypeError} must be a positive number
*/
function set( height ) {
	/*jshint validthis: true */ // TODO: eslint
	var err = isValid( height );
	if ( err ) {
		throw err;
	}
	debug( 'Current value: %d.', this._height );

	this._height = height;
	debug( 'New Value: %d.', this._height );

	this.emit( CHANGE_EVENT );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"./../../events":154,"./../../validators/height.js":165,"debug":549}],161:[function(require,module,exports){
'use strict';

/**
* Returns the width.
*
* @private
* @returns {number} width
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._width;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],162:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'background:set:width' );
var events = require( './../../events' );
var isValid = require( './../../validators/width.js' );


// VARIABLES //

var CHANGE_EVENT = events( 'width' );


// MAIN //

/**
* Sets the width.
*
* @private
* @param {PositiveNumber} width - width
* @throws {TypeError} must be a positive number
*/
function set( width ) {
	/*jshint validthis: true */ // TODO: eslint
	var err = isValid( width );
	if ( err ) {
		throw err;
	}
	debug( 'Current value: %d.', this._width );

	this._width = width;
	debug( 'New value: %d.', this._width );

	this.emit( CHANGE_EVENT );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"./../../events":154,"./../../validators/width.js":167,"debug":549}],163:[function(require,module,exports){
'use strict';

// MODULES //

var getKeys = require( 'object-keys' ).shim();
var isObject = require( '@stdlib/assert/is-plain-object' );
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var validators = require( './validators' );


// VARIABLES //

var KEYS = getKeys( validators );


// MAIN //

/**
* Validates function options.
*
* @private
* @param {Object} opts - destination object
* @param {Options} options - function options
* @param {PositiveNumber} [options.width] - width
* @param {PositiveNumber} [options.height] - height
* @param {boolean} [options.autoRender] - indicates whether to re-render on a change event
* @returns {(Error|null)} error or null
*
* @example
* var opts = {};
* var options = {
*     'width': 400,
*     'height': 400
* };
* var err = validate( opts, options );
* if ( err ) {
*     throw err;
* }
*/
function validate( opts, options ) {
	var err;
	var key;
	var val;
	var i;
	if ( !isObject( options ) ) {
		return new TypeError( 'invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	for ( i = 0; i < KEYS.length; i++ ) {
		key = KEYS[ i ];
		if ( hasOwnProp( options, key ) ) {
			val = options[ key ];
			err = validators[ key ]( val );
			if ( err ) {
				return err;
			}
			opts[ key ] = val;
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;

},{"./validators":166,"@stdlib/assert/has-own-property":2,"@stdlib/assert/is-plain-object":50,"object-keys":577}],164:[function(require,module,exports){
arguments[4][139][0].apply(exports,arguments)
},{"@stdlib/assert/is-boolean":10,"dup":139}],165:[function(require,module,exports){
'use strict';

// MODULES //

var isPositiveNumber = require( '@stdlib/assert/is-positive-number' ).isPrimitive;


/**
* Validates `height`.
*
* @private
* @param {*} v - value to test
* @returns {(Error|null)} error object or null
*/
function test( v ) {
	if ( !isPositiveNumber( v ) ) {
		return new TypeError( 'invalid value. `height` must be a positive number. Value: `' + v + '.`' );
	}
	return null;
} // end FUNCTION test()


// EXPORTS //

module.exports = test;

},{"@stdlib/assert/is-positive-number":57}],166:[function(require,module,exports){
'use strict';

var validators = {
	'width': require( './width.js' ),
	'height': require( './height.js' ),
	'autoRender': require( './auto_render.js' )
};


// EXPORTS //

module.exports = validators;

},{"./auto_render.js":164,"./height.js":165,"./width.js":167}],167:[function(require,module,exports){
'use strict';

// MODULES //

var isPositiveNumber = require( '@stdlib/assert/is-positive-number' ).isPrimitive;


/**
* Validates `width`.
*
* @private
* @param {*} v - value to test
* @returns {(Error|null)} error object or null
*/
function test( v ) {
	if ( !isPositiveNumber( v ) ) {
		return new TypeError( 'invalid value. `width` must be a positive number. Value: `' + v + '.`' );
	}
	return null;
} // end FUNCTION test()


// EXPORTS //

module.exports = test;

},{"@stdlib/assert/is-positive-number":57}],168:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'canvas:main' );
var EventEmitter = require( 'events' ).EventEmitter;
var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var copy = require( '@stdlib/utils/copy' );
var defaults = require( './defaults.json' );
var validate = require( './validate.js' );


// MAIN //

/**
* Canvas constructor.
*
* @constructor
* @param {Options} options - constructor options
* @param {PositiveNumber} [options.width=400] - width
* @param {PositiveNumber} [options.height=400] - height
* @param {boolean} [options.autoRender=true] - indicates whether to re-render on a change event
* @throws {TypeError} must provide valid options
* @returns {Canvas} canvas instance
*
* @example
* var canvas = new Canvas({
*     'width': 500,
*     'height': 500
* });
*/
function Canvas( options ) {
	var self;
	var opts;
	var err;
	if ( !( this instanceof Canvas ) ) {
		return new Canvas( options );
	}
	self = this;
	opts = copy( defaults );
	err = validate( opts, options );
	if ( err ) {
		throw err;
	}
	debug( 'Creating an instance with the following configuration: %s.', JSON.stringify( opts ) );
	EventEmitter.call( this );

	Object.defineProperty( this, '_width', {
		'configurable': false,
		'enumerable': false,
		'writable': true,
		'value': opts.width
	});
	Object.defineProperty( this, '_height', {
		'configurable': false,
		'enumerable': false,
		'writable': true,
		'value': opts.height
	});
	Object.defineProperty( this, '_autoRender', {
		'configurable': false,
		'enumerable': false,
		'writable': true,
		'value': opts.autoRender
	});

	this.on( 'change', onChange );
	this.on( '_render', onRender );

	return this;

	/**
	* Callback invoked upon receiving a change event.
	*
	* @private
	*/
	function onChange() {
		debug( 'Received a change event.' );
		if ( self._autoRender ) {
			self.render();
		}
	}

	/**
	* Re-emits a render event.
	*
	* @private
	*/
	function onRender() {
		var args;
		var i;
		debug( 'Received a render event. Re-emitting...' );
		args = new Array( arguments.length+1 );
		args[ 0 ] = 'render';
		for ( i = 0; i < arguments.length; i++ ) {
			args[ i+1 ] = arguments[ i ];
		}
		self.emit.apply( self, args );
	}
} // end FUNCTION Canvas()

/*
* Create a prototype which inherits from the parent prototype.
*/
Canvas.prototype = Object.create( EventEmitter.prototype );

/*
* Set the constructor.
*/
Canvas.prototype.constructor = Canvas;

/**
* Width.
*
* @memberof Canvas.prototype
* @name width
* @type {PositiveNumber}
* @default 400
* @throws {TypeError} must be a positive number
*
* @example
* var canvas = new Canvas({
*     'width': 500
* });
*
* var width = canvas.width;
* // returns 500
*/
Object.defineProperty( Canvas.prototype, 'width', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/width/set.js' ),
	'get': require( './props/width/get.js' )
});

/**
* Height.
*
* @memberof Canvas.prototype
* @name height
* @type {PositiveNumber}
* @default 400
* @throws {TypeError} must be a positive number
*
* @example
* var canvas = new Canvas({
*     'height': 500
* });
*
* var height = canvas.height;
* // returns 500
*/
Object.defineProperty( Canvas.prototype, 'height', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/height/set.js' ),
	'get': require( './props/height/get.js' )
});

/**
* Rendering mode. If `true`, an instance re-renders on each change event.
*
* @memberof Canvas.prototype
* @name autoRender
* @type {boolean}
* @default true
* @throws {TypeError} must be a boolean primitive
*
* @example
* var canvas = new Canvas({
*     'autoRender': true
* });
*
* var mode = canvas.autoRender;
* // returns true
*/
Object.defineProperty( Canvas.prototype, 'autoRender', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/auto-render/set.js' ),
	'get': require( './props/auto-render/get.js' )
});

/**
* Renders a virtual DOM tree.
*
* @memberof Canvas.prototype
* @name render
* @type {Function}
* @returns {VTree} virtual tree
*
* @example
* var canvas = new Canvas();
*
* var out = canvas.render();
*/
setReadOnly( Canvas.prototype, 'render', require( './methods/render.js' ) );


// EXPORTS //

module.exports = Canvas;

},{"./defaults.json":169,"./methods/render.js":173,"./props/auto-render/get.js":174,"./props/auto-render/set.js":175,"./props/height/get.js":176,"./props/height/set.js":177,"./props/width/get.js":178,"./props/width/set.js":179,"./validate.js":180,"@stdlib/utils/copy":487,"@stdlib/utils/define-read-only-property":490,"debug":549,"events":564}],169:[function(require,module,exports){
arguments[4][152][0].apply(exports,arguments)
},{"dup":152}],170:[function(require,module,exports){
arguments[4][153][0].apply(exports,arguments)
},{"dup":153}],171:[function(require,module,exports){
arguments[4][99][0].apply(exports,arguments)
},{"./events.json":170,"dup":99}],172:[function(require,module,exports){
'use strict';

/**
* Canvas.
*
* @module @stdlib/plot/components/svg/canvas
*
* @example
* var Canvas = require( '@stdlib/plot/components/svg/canvas' );
*
* var canvas = new Canvas({
*     'width': 400,
*     'height': 400
* });
*/

// MODULES //

var Canvas = require( './canvas.js' );


// EXPORTS //

module.exports = Canvas;

},{"./canvas.js":168}],173:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'canvas:render' );
var h = require( 'virtual-dom/h' );


// VARIABLES //

var ELEMENT = 'svg';


// MAIN //

/**
* Renders a virtual DOM tree.
*
* @private
* @returns {VTree} virtual DOM tree
*/
function render() {
	/* jshint validthis: true */ // TODO: eslint
	var props;
	var vtree;

	debug( 'Rendering...' );

	props = {
		'namespace': 'http://www.w3.org/2000/svg',
		'property': 'canvas',
		'className': 'canvas',
		'attributes': {
			'width': this.width,
			'height': this.height
		}
	};
	debug( 'Generating a virtual DOM tree (%s) with properties: %s.', ELEMENT, JSON.stringify( props ) );
	vtree = h( ELEMENT, props, [] );

	// Announce that a new tree has been rendered:
	this.emit( '_render', vtree );

	return vtree;
} // end FUNCTION render()


// EXPORTS //

module.exports = render;

},{"debug":549,"virtual-dom/h":614}],174:[function(require,module,exports){
arguments[4][102][0].apply(exports,arguments)
},{"dup":102}],175:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'canvas:set:auto-render' );
var events = require( './../../events' );
var isValid = require( './../../validators/auto_render.js' );


// VARIABLES //

var CHANGE_EVENT = events( 'autoRender' );


// MAIN //

/**
* Sets the rendering mode.
*
* @private
* @param {boolean} bool - boolean indicating whether to re-render on a change event
* @throws {TypeError} must be a positive number
*/
function set( bool ) {
	/*jshint validthis: true */ // TODO: eslint
	var err = isValid( bool );
	if ( err ) {
		throw err;
	}
	debug( 'Current value: %d.', this._autoRender );

	this._autoRender = bool;
	debug( 'New Value: %d.', this._autoRender );

	this.emit( CHANGE_EVENT );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"./../../events":171,"./../../validators/auto_render.js":181,"debug":549}],176:[function(require,module,exports){
arguments[4][159][0].apply(exports,arguments)
},{"dup":159}],177:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'canvas:set:height' );
var events = require( './../../events' );
var isValid = require( './../../validators/height.js' );


// VARIABLES //

var CHANGE_EVENT = events( 'height' );


// MAIN //

/**
* Sets the height.
*
* @private
* @param {PositiveNumber} height - height
* @throws {TypeError} must be a positive number
*/
function set( height ) {
	/*jshint validthis: true */ // TODO: eslint
	var err = isValid( height );
	if ( err ) {
		throw err;
	}
	debug( 'Current value: %d.', this._height );

	this._height = height;
	debug( 'New Value: %d.', this._height );

	this.emit( CHANGE_EVENT );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"./../../events":171,"./../../validators/height.js":182,"debug":549}],178:[function(require,module,exports){
arguments[4][161][0].apply(exports,arguments)
},{"dup":161}],179:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'canvas:set:width' );
var events = require( './../../events' );
var isValid = require( './../../validators/width.js' );


// VARIABLES //

var CHANGE_EVENT = events( 'width' );


// MAIN //

/**
* Sets the width.
*
* @private
* @param {PositiveNumber} width - width
* @throws {TypeError} must be a positive number
*/
function set( width ) {
	/*jshint validthis: true */ // TODO: eslint
	var err = isValid( width );
	if ( err ) {
		throw err;
	}
	debug( 'Current value: %d.', this._width );

	this._width = width;
	debug( 'New value: %d.', this._width );

	this.emit( CHANGE_EVENT );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"./../../events":171,"./../../validators/width.js":184,"debug":549}],180:[function(require,module,exports){
arguments[4][163][0].apply(exports,arguments)
},{"./validators":183,"@stdlib/assert/has-own-property":2,"@stdlib/assert/is-plain-object":50,"dup":163,"object-keys":577}],181:[function(require,module,exports){
arguments[4][139][0].apply(exports,arguments)
},{"@stdlib/assert/is-boolean":10,"dup":139}],182:[function(require,module,exports){
arguments[4][165][0].apply(exports,arguments)
},{"@stdlib/assert/is-positive-number":57,"dup":165}],183:[function(require,module,exports){
arguments[4][166][0].apply(exports,arguments)
},{"./auto_render.js":181,"./height.js":182,"./width.js":184,"dup":166}],184:[function(require,module,exports){
arguments[4][167][0].apply(exports,arguments)
},{"@stdlib/assert/is-positive-number":57,"dup":167}],185:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'clippath:main' );
var EventEmitter = require( 'events' ).EventEmitter;
var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var minstd = require( '@stdlib/math/base/random/minstd' );
var copy = require( '@stdlib/utils/copy' );
var defaults = require( './defaults.json' );
var validate = require( './validate.js' );


// MAIN //

/**
* Clipping path constructor.
*
* @constructor
* @param {Options} options - constructor options
* @param {PositiveNumber} [options.width=400] - width
* @param {PositiveNumber} [options.height=400] - height
* @param {string} [options.id] - clipping path id
* @param {boolean} [options.autoRender=true] - indicates whether to re-render on a change event
* @throws {TypeError} must provide valid options
* @returns {ClipPath} clipping path instance
*
* @example
* var clipPath = new ClipPath({
*     'width': 500,
*     'height': 500
* });
*/
function ClipPath( options ) {
	var self;
	var opts;
	var err;
	if ( !( this instanceof ClipPath ) ) {
		return new ClipPath( options );
	}
	self = this;
	opts = copy( defaults );
	err = validate( opts, options );
	if ( err ) {
		throw err;
	}
	debug( 'Creating an instance with the following configuration: %s.', JSON.stringify( opts ) );
	EventEmitter.call( this );

	Object.defineProperty( this, '_width', {
		'configurable': false,
		'enumerable': false,
		'writable': true,
		'value': opts.width
	});
	Object.defineProperty( this, '_height', {
		'configurable': false,
		'enumerable': false,
		'writable': true,
		'value': opts.height
	});
	Object.defineProperty( this, '_id', {
		'configurable': false,
		'enumerable': false,
		'writable': true,
		'value': opts.id || minstd().toString() // TODO: uuid
	});
	Object.defineProperty( this, '_autoRender', {
		'configurable': false,
		'enumerable': false,
		'writable': true,
		'value': opts.autoRender
	});

	this.on( 'change', onChange );
	this.on( '_render', onRender );

	return this;

	/**
	* Callback invoked upon receiving a change event.
	*
	* @private
	*/
	function onChange() {
		debug( 'Received a change event.' );
		if ( self._autoRender ) {
			self.render();
		}
	}

	/**
	* Re-emits a render event.
	*
	* @private
	*/
	function onRender() {
		var args;
		var i;
		debug( 'Received a render event. Re-emitting...' );
		args = new Array( arguments.length+1 );
		args[ 0 ] = 'render';
		for ( i = 0; i < arguments.length; i++ ) {
			args[ i+1 ] = arguments[ i ];
		}
		self.emit.apply( self, args );
	}
} // end FUNCTION ClipPath()

/*
* Create a prototype which inherits from the parent prototype.
*/
ClipPath.prototype = Object.create( EventEmitter.prototype );

/*
* Set the constructor.
*/
ClipPath.prototype.constructor = ClipPath;

/**
* Width.
*
* @memberof ClipPath.prototype
* @name width
* @type {PositiveNumber}
* @default 400
* @throws {TypeError} must be a positive number
*
* @example
* var clipPath = new ClipPath({
*     'width': 500
* });
*
* var width = clipPath.width;
* // returns 500
*/
Object.defineProperty( ClipPath.prototype, 'width', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/width/set.js' ),
	'get': require( './props/width/get.js' )
});

/**
* Height.
*
* @memberof ClipPath.prototype
* @name height
* @type {PositiveNumber}
* @default 400
* @throws {TypeError} must be a positive number
*
* @example
* var clipPath = new ClipPath({
*     'height': 500
* });
*
* var height = clipPath.height;
* // returns 500
*/
Object.defineProperty( ClipPath.prototype, 'height', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/height/set.js' ),
	'get': require( './props/height/get.js' )
});

/**
* Clipping path id.
*
* @memberof ClipPath.prototype
* @name id
* @type {string}
* @throws {TypeError} must be a primitive string
*
* @example
* var clipPath = new ClipPath({
*     'id': '1234'
* });
*
* var id = clipPath.id;
* // returns '1234'
*/
Object.defineProperty( ClipPath.prototype, 'id', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/id/set.js' ),
	'get': require( './props/id/get.js' )
});

/**
* Rendering mode. If `true`, an instance re-renders on each change event.
*
* @memberof ClipPath.prototype
* @name autoRender
* @type {boolean}
* @default true
* @throws {TypeError} must be a boolean primitive
*
* @example
* var clipPath = new ClipPath({
*     'autoRender': true
* });
*
* var mode = clipPath.autoRender;
* // returns true
*/
Object.defineProperty( ClipPath.prototype, 'autoRender', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/auto-render/set.js' ),
	'get': require( './props/auto-render/get.js' )
});

/**
* Renders a virtual DOM tree.
*
* @memberof ClipPath.prototype
* @name render
* @type {Function}
* @returns {VTree} virtual tree
*
* @example
* var clipPath = new ClipPath();
*
* var out = clipPath.render();
*/
setReadOnly( ClipPath.prototype, 'render', require( './methods/render.js' ) );


// EXPORTS //

module.exports = ClipPath;

},{"./defaults.json":188,"./methods/render.js":192,"./props/auto-render/get.js":193,"./props/auto-render/set.js":194,"./props/height/get.js":195,"./props/height/set.js":196,"./props/id/get.js":197,"./props/id/set.js":198,"./props/width/get.js":199,"./props/width/set.js":200,"./validate.js":201,"@stdlib/math/base/random/minstd":76,"@stdlib/utils/copy":487,"@stdlib/utils/define-read-only-property":490,"debug":549,"events":564}],186:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'clippath:components:main' );
var h = require( 'virtual-dom/h' );
var rect = require( './rect.js' );


// VARIABLES //

var ELEMENT = 'clipPath';


// MAIN //

/**
* Renders a clipping path.
*
* @private
* @param {Object} ctx - context
* @returns {VTree} virtual tree
*/
function render( ctx ) {
	var children;
	var props;

	props = {
		'namespace': 'http://www.w3.org/2000/svg',
		'id': ctx.id
	};

	debug( 'Rendering clipping path rectangle...' );
	children = [
		rect( ctx )
	];

	debug( 'Generating a virtual DOM tree (%s) with properties: %s.', ELEMENT, JSON.stringify( props ) );

	return h( ELEMENT, props, children );
} // end FUNCTION render()


// EXPORTS //

module.exports = render;

},{"./rect.js":187,"debug":549,"virtual-dom/h":614}],187:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'clippath:components:rect' );
var h = require( 'virtual-dom/h' );


// VARIABLES //

var ELEMENT = 'rect';


// MAIN //

/**
* Renders a clipping path rectangle.
*
* @private
* @param {Object} ctx - context
* @returns {VTree} virtual tree
*/
function render( ctx ) {
	var props = {
		'namespace': 'http://www.w3.org/2000/svg',
		'className': 'clipPath',
		'attributes': {
			'width': ctx.width,
			'height': ctx.height
		}
	};

	debug( 'Generating a virtual DOM tree (%s) with properties: %s.', ELEMENT, JSON.stringify( props ) );

	return h( ELEMENT, props, [] );
} // end FUNCTION render()


// EXPORTS //

module.exports = render;

},{"debug":549,"virtual-dom/h":614}],188:[function(require,module,exports){
module.exports={
	"width": 400,
	"height": 400,
	"id": "",
	"autoRender": true
}

},{}],189:[function(require,module,exports){
module.exports={
	"width": "change",
	"height": "change",
	"id": "change",
	"autoRender": "change"
}

},{}],190:[function(require,module,exports){
arguments[4][99][0].apply(exports,arguments)
},{"./events.json":189,"dup":99}],191:[function(require,module,exports){
'use strict';

/**
* Clipping path.
*
* @module @stdlib/plot/components/svg/clip-path
*
* @example
* var ClipPath = require( '@stdlib/plot/components/svg/clip-path' );
*
* var clipPath = new ClipPath({
*     'width': 400,
*     'height': 400
* });
*/

// MODULES //

var ClipPath = require( './clippath.js' );


// EXPORTS //

module.exports = ClipPath;

},{"./clippath.js":185}],192:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'clippath:render' );
var components = require( './../components' );


// MAIN //

/**
* Renders a virtual DOM tree.
*
* @private
* @returns {VTree} virtual tree
*/
function render() {
	/* jshint validthis: true */ // TODO: eslint
	var vtree;

	debug( 'Rendering...' );
	vtree = components( this );

	// Announce that a new tree has been rendered:
	this.emit( '_render', vtree );

	return vtree;
} // end FUNCTION render()


// EXPORTS //

module.exports = render;

},{"./../components":186,"debug":549}],193:[function(require,module,exports){
arguments[4][102][0].apply(exports,arguments)
},{"dup":102}],194:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'clip-path:set:auto-render' );
var events = require( './../../events' );
var isValid = require( './../../validators/auto_render.js' );


// VARIABLES //

var CHANGE_EVENT = events( 'autoRender' );


// MAIN //

/**
* Sets the rendering mode.
*
* @private
* @param {boolean} bool - boolean indicating whether to re-render on a change event
* @throws {TypeError} must be a positive number
*/
function set( bool ) {
	/*jshint validthis: true */ // TODO: eslint
	var err = isValid( bool );
	if ( err ) {
		throw err;
	}
	debug( 'Current value: %d.', this._autoRender );

	this._autoRender = bool;
	debug( 'New Value: %d.', this._autoRender );

	this.emit( CHANGE_EVENT );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"./../../events":190,"./../../validators/auto_render.js":202,"debug":549}],195:[function(require,module,exports){
arguments[4][159][0].apply(exports,arguments)
},{"dup":159}],196:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'clippath:set:height' );
var events = require( './../../events' );
var isValid = require( './../../validators/height.js' );


// VARIABLES //

var CHANGE_EVENT = events( 'height' );


// MAIN //

/**
* Sets the height.
*
* @private
* @param {PositiveNumber} height - height
* @throws {TypeError} must be a positive number
*/
function set( height ) {
	/*jshint validthis: true */ // TODO: eslint
	var err = isValid( height );
	if ( err ) {
		throw err;
	}
	debug( 'Current value: %d.', this._height );

	this._height = height;
	debug( 'New Value: %d.', this._height );

	this.emit( CHANGE_EVENT );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"./../../events":190,"./../../validators/height.js":203,"debug":549}],197:[function(require,module,exports){
'use strict';

/**
* Returns the clipping path id.
*
* @private
* @returns {string} id
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._id;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],198:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'clippath:set:id' );
var events = require( './../../events' );
var isValid = require( './../../validators/id.js' );


// VARIABLES //

var CHANGE_EVENT = events( 'id' );


// MAIN //

/**
* Sets the clipping path id.
*
* @private
* @param {string} id - id
* @throws {TypeError} must be a string primitive
*/
function set( id ) {
	/*jshint validthis: true */ // TODO: eslint
	var err = isValid( id );
	if ( err ) {
		throw err;
	}
	debug( 'Current value: %s.', this._id );

	this._id = id;
	debug( 'New value: %s.', this._id );

	this.emit( CHANGE_EVENT );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"./../../events":190,"./../../validators/id.js":204,"debug":549}],199:[function(require,module,exports){
arguments[4][161][0].apply(exports,arguments)
},{"dup":161}],200:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'clippath:set:width' );
var events = require( './../../events' );
var isValid = require( './../../validators/width.js' );


// VARIABLES //

var CHANGE_EVENT = events( 'width' );


// MAIN //

/**
* Sets the width.
*
* @private
* @param {PositiveNumber} width - width
* @throws {TypeError} must be a positive number
*/
function set( width ) {
	/*jshint validthis: true */ // TODO: eslint
	var err = isValid( width );
	if ( err ) {
		throw err;
	}
	debug( 'Current value: %d.', this._width );

	this._width = width;
	debug( 'New value: %d.', this._width );

	this.emit( CHANGE_EVENT );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"./../../events":190,"./../../validators/width.js":206,"debug":549}],201:[function(require,module,exports){
'use strict';

// MODULES //

var getKeys = require( 'object-keys' ).shim();
var isObject = require( '@stdlib/assert/is-plain-object' );
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var validators = require( './validators' );


// VARIABLES //

var KEYS = getKeys( validators );


// MAIN //

/**
* Validates function options.
*
* @private
* @param {Object} opts - destination object
* @param {Options} options - function options
* @param {PositiveNumber} [options.width] - width
* @param {PositiveNumber} [options.height] - height
* @param {string} [options.id] - clipping path id
* @param {boolean} [options.autoRender] - indicates whether to re-render on a change event
* @returns {(Error|null)} error or null
*
* @example
* var opts = {};
* var options = {
*     'width': 400,
*     'height': 400
* };
* var err = validate( opts, options );
* if ( err ) {
*     throw err;
* }
*/
function validate( opts, options ) {
	var err;
	var key;
	var val;
	var i;
	if ( !isObject( options ) ) {
		return new TypeError( 'invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	for ( i = 0; i < KEYS.length; i++ ) {
		key = KEYS[ i ];
		if ( hasOwnProp( options, key ) ) {
			val = options[ key ];
			err = validators[ key ]( val );
			if ( err ) {
				return err;
			}
			opts[ key ] = val;
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;

},{"./validators":205,"@stdlib/assert/has-own-property":2,"@stdlib/assert/is-plain-object":50,"object-keys":577}],202:[function(require,module,exports){
arguments[4][139][0].apply(exports,arguments)
},{"@stdlib/assert/is-boolean":10,"dup":139}],203:[function(require,module,exports){
arguments[4][165][0].apply(exports,arguments)
},{"@stdlib/assert/is-positive-number":57,"dup":165}],204:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;


/**
* Validates `id`.
*
* @private
* @param {*} v - value to test
* @returns {(Error|null)} error object or null
*/
function test( v ) {
	if ( !isString( v ) ) {
		return new TypeError( 'invalid value. `id` must be a string. Value: `' + v + '.`' );
	}
	return null;
} // end FUNCTION test()


// EXPORTS //

module.exports = test;

},{"@stdlib/assert/is-string":62}],205:[function(require,module,exports){
'use strict';

var validators = {
	'width': require( './width.js' ),
	'height': require( './height.js' ),
	'id': require( './id.js' ),
	'autoRender': require( './auto_render.js' )
};


// EXPORTS //

module.exports = validators;

},{"./auto_render.js":202,"./height.js":203,"./id.js":204,"./width.js":206}],206:[function(require,module,exports){
arguments[4][167][0].apply(exports,arguments)
},{"@stdlib/assert/is-positive-number":57,"dup":167}],207:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'defs:main' );
var EventEmitter = require( 'events' ).EventEmitter;
var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var inherit = require( '@stdlib/utils/inherit' );
var instanceOf = require( '@stdlib/assert/instance-of' );


// MAIN //

/**
* SVG definitions constructor.
*
* @constructor
* @returns {Defs} definitions instance
*
* @example
* var node = new Defs();
* // returns <Defs>
*/
function Defs() {
	var self;
	if ( !instanceOf( this, Defs ) ) {
		return new Defs();
	}
	self = this;
	debug( 'Creating an instance...' );
	EventEmitter.call( this );
	this.on( 'change', onChange );
	this.on( '_render', onRender );
	return this;

	/**
	* Callback invoked upon receiving a change event.
	*
	* @private
	*/
	function onChange() {
		debug( 'Received a change event.' );
		self.render();
	}

	/**
	* Re-emits a render event.
	*
	* @private
	*/
	function onRender() {
		var args;
		var i;
		debug( 'Received a render event. Re-emitting...' );
		args = new Array( arguments.length+1 );
		args[ 0 ] = 'render';
		for ( i = 0; i < arguments.length; i++ ) {
			args[ i+1 ] = arguments[ i ];
		}
		self.emit.apply( self, args );
	}
} // end FUNCTION Defs()

/*
* Inherit from the `EventEmitter` prototype.
*/
inherit( Defs, EventEmitter );

/**
* Renders a virtual DOM tree.
*
* @memberof Defs.prototype
* @name render
* @type {Function}
* @returns {VTree} virtual tree
*
* @example
* var node = new Defs();
*
* var out = node.render();
* // returns <Object>
*/
setReadOnly( Defs.prototype, 'render', require( './render' ) );


// EXPORTS //

module.exports = Defs;

},{"./render":209,"@stdlib/assert/instance-of":3,"@stdlib/utils/define-read-only-property":490,"@stdlib/utils/inherit":506,"debug":549,"events":564}],208:[function(require,module,exports){
'use strict';

/**
* SVG plot definitions.
*
* @module @stdlib/plot/components/svg/defs
*
* @example
* var Defs = require( '@stdlib/plot/components/svg/defs' );
*
* var node = new Defs();
* // returns <Defs>
*/

// MODULES //

var Defs = require( './ctor.js' );


// EXPORTS //

module.exports = Defs;

},{"./ctor.js":207}],209:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'defs:render' );
var h = require( 'virtual-dom/h' );


// VARIABLES //

var ELEMENT = 'defs';


// MAIN //

/**
* Renders a virtual DOM tree.
*
* @private
* @returns {VTree} virtual tree
*/
function render() {
	/* eslint-disable no-invalid-this */
	var vtree;
	var props;

	debug( 'Rendering...' );

	props = {
		'namespace': 'http://www.w3.org/2000/svg'
	};

	debug( 'Generating a virtual DOM tree (%s) with properties: %s.', ELEMENT, JSON.stringify( props ) );
	vtree = h( ELEMENT, props, [] );

	// Announce that a new tree has been rendered:
	this.emit( '_render', vtree );

	return vtree;
} // end FUNCTION render()


// EXPORTS //

module.exports = render;

},{"debug":549,"virtual-dom/h":614}],210:[function(require,module,exports){
module.exports={
	"translateX": 0,
	"translateY": 0,
	"autoRender": true
}

},{}],211:[function(require,module,exports){
module.exports={
	"translateX": "change",
	"translateY": "change",
	"autoRender": "change"
}

},{}],212:[function(require,module,exports){
arguments[4][99][0].apply(exports,arguments)
},{"./events.json":211,"dup":99}],213:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'graph:main' );
var EventEmitter = require( 'events' ).EventEmitter;
var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var copy = require( '@stdlib/utils/copy' );
var defaults = require( './defaults.json' );
var validate = require( './validate.js' );


// MAIN //

/**
* Graph constructor.
*
* @constructor
* @param {Options} options - constructor options
* @param {NonNegativeInteger} [options.translateX=0] - horizontal translation
* @param {NonNegativeInteger} [options.translateY=0] - vertical translation
* @param {boolean} [options.autoRender=true] - indicates whether to re-render on a change event
* @throws {TypeError} must provide valid options
* @returns {Graph} graph instance
*
* @example
* var graph = new Graph({
*     'translateX': 90,
*     'translateY': 20
* });
*/
function Graph( options ) {
	var self;
	var opts;
	var err;
	if ( !( this instanceof Graph ) ) {
		return new Graph( options );
	}
	self = this;
	opts = copy( defaults );
	err = validate( opts, options );
	if ( err ) {
		throw err;
	}
	debug( 'Creating an instance with the following configuration: %s.', JSON.stringify( opts ) );
	EventEmitter.call( this );

	Object.defineProperty( this, '_translateX', {
		'configurable': false,
		'enumerable': false,
		'writable': true,
		'value': opts.translateX
	});
	Object.defineProperty( this, '_translateY', {
		'configurable': false,
		'enumerable': false,
		'writable': true,
		'value': opts.translateY
	});
	Object.defineProperty( this, '_autoRender', {
		'configurable': false,
		'enumerable': false,
		'writable': true,
		'value': opts.autoRender
	});

	this.on( 'change', onChange );
	this.on( '_render', onRender );

	return this;

	/**
	* Callback invoked upon receiving a change event.
	*
	* @private
	*/
	function onChange() {
		debug( 'Received a change event.' );
		if ( self._autoRender ) {
			self.render();
		}
	}

	/**
	* Re-emits a render event.
	*
	* @private
	*/
	function onRender() {
		var args;
		var i;
		debug( 'Received a render event. Re-emitting...' );
		args = new Array( arguments.length+1 );
		args[ 0 ] = 'render';
		for ( i = 0; i < arguments.length; i++ ) {
			args[ i+1 ] = arguments[ i ];
		}
		self.emit.apply( self, args );
	}
} // end FUNCTION Graph()

/*
* Create a prototype which inherits from the parent prototype.
*/
Graph.prototype = Object.create( EventEmitter.prototype );

/*
* Set the constructor.
*/
Graph.prototype.constructor = Graph;

/**
* Horizontal translation.
*
* @memberof Graph.prototype
* @name translateX
* @type {NonNegativeInteger}
* @default 0
* @throws {TypeError} must be a nonnegative integer
*
* @example
* var graph = new Graph({
*     'translateX': 90
* });
*
* var v = graph.translateX;
* // returns 90
*/
Object.defineProperty( Graph.prototype, 'translateX', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/translate-x/set.js' ),
	'get': require( './props/translate-x/get.js' )
});

/**
* Vertical translation.
*
* @memberof Graph.prototype
* @name translateY
* @type {NonNegativeInteger}
* @default 0
* @throws {TypeError} must be a nonnegative integer
*
* @example
* var graph = new Graph({
*     'translateY': 20
* });
*
* var v = graph.translateY;
* // returns 20
*/
Object.defineProperty( Graph.prototype, 'translateY', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/translate-y/set.js' ),
	'get': require( './props/translate-y/get.js' )
});

/**
* Rendering mode. If `true`, an instance re-renders on each change event.
*
* @memberof Graph.prototype
* @name autoRender
* @type {boolean}
* @default true
* @throws {TypeError} must be a boolean primitive
*
* @example
* var graph = new Graph({
*     'autoRender': true
* });
*
* var mode = graph.autoRender;
* // returns true
*/
Object.defineProperty( Graph.prototype, 'autoRender', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/auto-render/set.js' ),
	'get': require( './props/auto-render/get.js' )
});

/**
* Renders a virtual DOM tree.
*
* @memberof Graph.prototype
* @name render
* @type {Function}
* @returns {VTree} virtual tree
*
* @example
* var graph = new Graph();
*
* var out = graph.render();
*/
setReadOnly( Graph.prototype, 'render', require( './methods/render.js' ) );


// EXPORTS //

module.exports = Graph;

},{"./defaults.json":210,"./methods/render.js":215,"./props/auto-render/get.js":216,"./props/auto-render/set.js":217,"./props/translate-x/get.js":218,"./props/translate-x/set.js":219,"./props/translate-y/get.js":220,"./props/translate-y/set.js":221,"./validate.js":222,"@stdlib/utils/copy":487,"@stdlib/utils/define-read-only-property":490,"debug":549,"events":564}],214:[function(require,module,exports){
'use strict';

/**
* Graph component.
*
* @module @stdlib/plot/components/svg/graph
*
* @example
* var Graph = require( '@stdlib/plot/components/svg/graph' );
*
* var graph = new Graph({
*     'translateX': 90,
*     'translateY': 20
* });
*/

// MODULES //

var Graph = require( './graph.js' );


// EXPORTS //

module.exports = Graph;

},{"./graph.js":213}],215:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'graph:render' );
var h = require( 'virtual-dom/h' );


// VARIABLES //

var ELEMENT = 'g';


// MAIN //

/**
* Renders a virtual DOM tree.
*
* @private
* @returns {VTree} virtual DOM tree
*/
function render() {
	/* jshint validthis: true */ // TODO: eslint
	var props;
	var vtree;

	debug( 'Rendering...' );

	props = {
		'namespace': 'http://www.w3.org/2000/svg',
		'property': 'graph',
		'className': 'graph',
		'attributes': {
			'transform': 'translate('+this.translateX+','+this.translateY+')'
		}
	};
	debug( 'Generating a virtual DOM tree (%s) with properties: %s.', ELEMENT, JSON.stringify( props ) );
	vtree = h( ELEMENT, props, [] );

	// Announce that a new tree has been rendered:
	this.emit( '_render', vtree );

	return vtree;
} // end FUNCTION render()


// EXPORTS //

module.exports = render;

},{"debug":549,"virtual-dom/h":614}],216:[function(require,module,exports){
arguments[4][102][0].apply(exports,arguments)
},{"dup":102}],217:[function(require,module,exports){
arguments[4][175][0].apply(exports,arguments)
},{"./../../events":212,"./../../validators/auto_render.js":223,"debug":549,"dup":175}],218:[function(require,module,exports){
'use strict';

/**
* Returns the horizontal translation.
*
* @private
* @returns {NonNegativeInteger} translation
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._translateX;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],219:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'graph:set:translate-x' );
var events = require( './../../events' );
var isValid = require( './../../validators/translate_x.js' );


// VARIABLES //

var CHANGE_EVENT = events( 'translateX' );


// MAIN //

/**
* Sets the horizontal translation.
*
* @private
* @param {NonNegativeInteger} v - translation
* @throws {TypeError} must be a nonnegative integer
*/
function set( v ) {
	/*jshint validthis: true */ // TODO: eslint
	var err = isValid( v );
	if ( err ) {
		throw err;
	}
	debug( 'Current value: %d.', this._translateX );

	this._translateX = v;
	debug( 'New Value: %d.', this._translateX );

	this.emit( CHANGE_EVENT );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"./../../events":212,"./../../validators/translate_x.js":225,"debug":549}],220:[function(require,module,exports){
'use strict';

/**
* Returns the vertical translation.
*
* @private
* @returns {NonNegativeInteger} translation
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._translateY;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],221:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'graph:set:translate-y' );
var events = require( './../../events' );
var isValid = require( './../../validators/translate_y.js' );


// VARIABLES //

var CHANGE_EVENT = events( 'translateY' );


// MAIN //

/**
* Sets the vertical translation.
*
* @private
* @param {NonNegativeInteger} v - translation
* @throws {TypeError} must be a nonnegative integer
*/
function set( v ) {
	/*jshint validthis: true */ // TODO: eslint
	var err = isValid( v );
	if ( err ) {
		throw err;
	}
	debug( 'Current value: %d.', this._translateY );

	this._translateY = v;
	debug( 'New Value: %d.', this._translateY );

	this.emit( CHANGE_EVENT );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"./../../events":212,"./../../validators/translate_y.js":226,"debug":549}],222:[function(require,module,exports){
'use strict';

// MODULES //

var getKeys = require( 'object-keys' ).shim();
var isObject = require( '@stdlib/assert/is-plain-object' );
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var validators = require( './validators' );


// VARIABLES //

var KEYS = getKeys( validators );


// MAIN //

/**
* Validates function options.
*
* @private
* @param {Object} opts - destination object
* @param {Options} options - function options
* @param {NonNegativeInteger} [options.translateX] - horizontal translation
* @param {NonNegativeInteger} [options.translateY] - vertical translation
* @param {boolean} [options.autoRender] - indicates whether to re-render on a change event
* @returns {(Error|null)} error or null
*
* @example
* var opts = {};
* var options = {
*     'translateX': 90,
*     'translateY': 20
* };
* var err = validate( opts, options );
* if ( err ) {
*     throw err;
* }
*/
function validate( opts, options ) {
	var err;
	var key;
	var val;
	var i;
	if ( !isObject( options ) ) {
		return new TypeError( 'invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	for ( i = 0; i < KEYS.length; i++ ) {
		key = KEYS[ i ];
		if ( hasOwnProp( options, key ) ) {
			val = options[ key ];
			err = validators[ key ]( val );
			if ( err ) {
				return err;
			}
			opts[ key ] = val;
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;

},{"./validators":224,"@stdlib/assert/has-own-property":2,"@stdlib/assert/is-plain-object":50,"object-keys":577}],223:[function(require,module,exports){
arguments[4][139][0].apply(exports,arguments)
},{"@stdlib/assert/is-boolean":10,"dup":139}],224:[function(require,module,exports){
'use strict';

var validators = {
	'translateX': require( './translate_x.js' ),
	'translateY': require( './translate_y.js' ),
	'autoRender': require( './auto_render.js' )
};


// EXPORTS //

module.exports = validators;

},{"./auto_render.js":223,"./translate_x.js":225,"./translate_y.js":226}],225:[function(require,module,exports){
'use strict';

// MODULES //

var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;


/**
* Validates `translateX`.
*
* @private
* @param {*} v - value to test
* @returns {(Error|null)} error object or null
*/
function test( v ) {
	if ( !isNonNegativeInteger( v ) ) {
		return new TypeError( 'invalid value. `translateX` must be a nonnegative integer. Value: `' + v + '.`' );
	}
	return null;
} // end FUNCTION test()


// EXPORTS //

module.exports = test;

},{"@stdlib/assert/is-nonnegative-integer":34}],226:[function(require,module,exports){
'use strict';

// MODULES //

var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;


/**
* Validates `translateY`.
*
* @private
* @param {*} v - value to test
* @returns {(Error|null)} error object or null
*/
function test( v ) {
	if ( !isNonNegativeInteger( v ) ) {
		return new TypeError( 'invalid value. `translateY` must be a nonnegative integer. Value: `' + v + '.`' );
	}
	return null;
} // end FUNCTION test()


// EXPORTS //

module.exports = test;

},{"@stdlib/assert/is-nonnegative-integer":34}],227:[function(require,module,exports){
module.exports={
	"clipPathId": "",
	"autoRender": true
}

},{}],228:[function(require,module,exports){
module.exports={
	"clipPathId": "change",
	"autoRender": "change"
}

},{}],229:[function(require,module,exports){
arguments[4][99][0].apply(exports,arguments)
},{"./events.json":228,"dup":99}],230:[function(require,module,exports){
'use strict';

/**
* Marks.
*
* @module @stdlib/plot/components/svg/marks
*
* @example
* var Marks = require( '@stdlib/plot/components/svg/marks' );
*
* var marks = new Marks({
*     'clipPathId': '1234'
* });
*/

// MODULES //

var Marks = require( './marks.js' );


// EXPORTS //

module.exports = Marks;

},{"./marks.js":231}],231:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'marks:main' );
var EventEmitter = require( 'events' ).EventEmitter;
var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var copy = require( '@stdlib/utils/copy' );
var defaults = require( './defaults.json' );
var validate = require( './validate.js' );


// MAIN //

/**
* Marks constructor.
*
* @constructor
* @param {Options} options - constructor options
* @param {string} [options.clipPathId] - clipping path id
* @param {boolean} [options.autoRender=true] - indicates whether to re-render on a change event
* @throws {TypeError} must provide valid options
* @returns {Marks} marks instance
*
* @example
* var marks = new Marks({
*     'clipPathId': '1234'
* });
*/
function Marks( options ) {
	var self;
	var opts;
	var err;
	if ( !( this instanceof Marks ) ) {
		return new Marks( options );
	}
	self = this;
	opts = copy( defaults );
	err = validate( opts, options );
	if ( err ) {
		throw err;
	}
	debug( 'Creating an instance with the following configuration: %s.', JSON.stringify( opts ) );
	EventEmitter.call( this );

	Object.defineProperty( this, '_clipPathId', {
		'configurable': false,
		'enumerable': false,
		'writable': true,
		'value': opts.clipPathId
	});
	Object.defineProperty( this, '_autoRender', {
		'configurable': false,
		'enumerable': false,
		'writable': true,
		'value': opts.autoRender
	});

	this.on( 'change', onChange );
	this.on( '_render', onRender );

	return this;

	/**
	* Callback invoked upon receiving a change event.
	*
	* @private
	*/
	function onChange() {
		debug( 'Received a change event.' );
		if ( self._autoRender ) {
			self.render();
		}
	}

	/**
	* Re-emits a render event.
	*
	* @private
	*/
	function onRender() {
		var args;
		var i;
		debug( 'Received a render event. Re-emitting...' );
		args = new Array( arguments.length+1 );
		args[ 0 ] = 'render';
		for ( i = 0; i < arguments.length; i++ ) {
			args[ i+1 ] = arguments[ i ];
		}
		self.emit.apply( self, args );
	}
} // end FUNCTION Marks()

/*
* Create a prototype which inherits from the parent prototype.
*/
Marks.prototype = Object.create( EventEmitter.prototype );

/*
* Set the constructor.
*/
Marks.prototype.constructor = Marks;

/**
* Clipping path id.
*
* @memberof Marks.prototype
* @name clipPathId
* @type {string}
* @throws {TypeError} must be a primitive string
*
* @example
* var marks = new Marks({
*     'clipPathId': '1234'
* });
*
* var id = marks.clipPathId;
* // returns '1234'
*/
Object.defineProperty( Marks.prototype, 'clipPathId', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/clip-path-id/set.js' ),
	'get': require( './props/clip-path-id/get.js' )
});

/**
* Rendering mode. If `true`, an instance re-renders on each change event.
*
* @memberof Marks.prototype
* @name autoRender
* @type {boolean}
* @default true
* @throws {TypeError} must be a boolean primitive
*
* @example
* var marks = new Marks({
*     'autoRender': true
* });
*
* var mode = marks.autoRender;
* // returns true
*/
Object.defineProperty( Marks.prototype, 'autoRender', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/auto-render/set.js' ),
	'get': require( './props/auto-render/get.js' )
});

/**
* Renders a virtual DOM tree.
*
* @memberof Marks.prototype
* @name render
* @type {Function}
* @returns {VTree} virtual tree
*
* @example
* var marks = new Marks();
*
* var out = marks.render();
*/
setReadOnly( Marks.prototype, 'render', require( './methods/render.js' ) );


// EXPORTS //

module.exports = Marks;

},{"./defaults.json":227,"./methods/render.js":232,"./props/auto-render/get.js":233,"./props/auto-render/set.js":234,"./props/clip-path-id/get.js":235,"./props/clip-path-id/set.js":236,"./validate.js":237,"@stdlib/utils/copy":487,"@stdlib/utils/define-read-only-property":490,"debug":549,"events":564}],232:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'marks:render' );
var h = require( 'virtual-dom/h' );


// VARIABLES //

var ELEMENT = 'g';


// MAIN //

/**
* Renders a virtual DOM tree.
*
* @private
* @returns {VTree} virtual DOM tree
*/
function render() {
	/* jshint validthis: true */ // TODO: eslint
	var props;
	var vtree;

	debug( 'Rendering...' );

	props = {
		'namespace': 'http://www.w3.org/2000/svg',
		'property': 'marks',
		'className': 'marks',
		'attributes': {
			'clip-path': 'url(#'+this._clipPathId+')'
		}
	};

	debug( 'Generating a virtual DOM tree (%s) with properties: %s.', ELEMENT, JSON.stringify( props ) );
	vtree = h( ELEMENT, props, [] );

	// Announce that a new tree has been rendered:
	this.emit( '_render', vtree );

	return vtree;
} // end FUNCTION render()


// EXPORTS //

module.exports = render;

},{"debug":549,"virtual-dom/h":614}],233:[function(require,module,exports){
arguments[4][102][0].apply(exports,arguments)
},{"dup":102}],234:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'marks:set:auto-render' );
var events = require( './../../events' );
var isValid = require( './../../validators/auto_render.js' );


// VARIABLES //

var CHANGE_EVENT = events( 'autoRender' );


// MAIN //

/**
* Sets the rendering mode.
*
* @private
* @param {boolean} bool - boolean indicating whether to re-render on a change event
* @throws {TypeError} must be a positive number
*/
function set( bool ) {
	/*jshint validthis: true */ // TODO: eslint
	var err = isValid( bool );
	if ( err ) {
		throw err;
	}
	debug( 'Current value: %d.', this._autoRender );

	this._autoRender = bool;
	debug( 'New Value: %d.', this._autoRender );

	this.emit( CHANGE_EVENT );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"./../../events":229,"./../../validators/auto_render.js":238,"debug":549}],235:[function(require,module,exports){
'use strict';

/**
* Returns the clipping path id.
*
* @private
* @returns {string} id
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._clipPathId;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],236:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'marks:set:clip-path-id' );
var events = require( './../../events' );
var isValid = require( './../../validators/clip_path_id.js' );


// VARIABLES //

var CHANGE_EVENT = events( 'clipPathId' );


// MAIN //

/**
* Sets the clipping path id.
*
* @private
* @param {string} id - clipping path id
* @throws {TypeError} must be a string primitive
*/
function set( id ) {
	/*jshint validthis: true */ // TODO: eslint
	var err = isValid( id );
	if ( err ) {
		throw err;
	}
	debug( 'Current value: %d.', this._clipPathId );

	this._clipPathId = id;
	debug( 'New Value: %d.', this._clipPathId );

	this.emit( CHANGE_EVENT );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"./../../events":229,"./../../validators/clip_path_id.js":239,"debug":549}],237:[function(require,module,exports){
'use strict';

// MODULES //

var getKeys = require( 'object-keys' ).shim();
var isObject = require( '@stdlib/assert/is-plain-object' );
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var validators = require( './validators' );


// VARIABLES //

var KEYS = getKeys( validators );


// MAIN //

/**
* Validates function options.
*
* @private
* @param {Object} opts - destination object
* @param {Options} options - function options
* @param {string} [options.clipPathId] - clipping path id
* @param {boolean} [options.autoRender] - indicates whether to re-render on a change event
* @returns {(Error|null)} error or null
*
* @example
* var opts = {};
* var options = {
*     'clipPathId': '1234'
* };
* var err = validate( opts, options );
* if ( err ) {
*     throw err;
* }
*/
function validate( opts, options ) {
	var err;
	var key;
	var val;
	var i;
	if ( !isObject( options ) ) {
		return new TypeError( 'invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	for ( i = 0; i < KEYS.length; i++ ) {
		key = KEYS[ i ];
		if ( hasOwnProp( options, key ) ) {
			val = options[ key ];
			err = validators[ key ]( val );
			if ( err ) {
				return err;
			}
			opts[ key ] = val;
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;

},{"./validators":240,"@stdlib/assert/has-own-property":2,"@stdlib/assert/is-plain-object":50,"object-keys":577}],238:[function(require,module,exports){
arguments[4][139][0].apply(exports,arguments)
},{"@stdlib/assert/is-boolean":10,"dup":139}],239:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;


/**
* Validates `clipPathId`.
*
* @private
* @param {*} v - value to test
* @returns {(Error|null)} error object or null
*/
function test( v ) {
	if ( !isString( v ) ) {
		return new TypeError( 'invalid value. `clipPathId` must be a string primitive. Value: `' + v + '.`' );
	}
	return null;
} // end FUNCTION test()


// EXPORTS //

module.exports = test;

},{"@stdlib/assert/is-string":62}],240:[function(require,module,exports){
'use strict';

var validators = {
	'clipPathId': require( './clip_path_id.js' ),
	'autoRender': require( './auto_render.js' )
};


// EXPORTS //

module.exports = validators;

},{"./auto_render.js":238,"./clip_path_id.js":239}],241:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'path:accessor:is-defined' );
var isnan = require( '@stdlib/assert/is-nan' ).isPrimitive;


// MAIN //

/**
* Accessor function which determines whether a datum is defined.
*
* @private
* @param {number} d - datum
* @returns {boolean} boolean indicating whether a datum is defined
*/
function isDefined( d ) {
	var bool = !isnan( d );
	debug( 'Datum: %s. Defined: %s.', JSON.stringify( d ), bool );
	return bool;
} // end FUNCTION isDefined()


// EXPORTS //

module.exports = isDefined;

},{"@stdlib/assert/is-nan":29,"debug":549}],242:[function(require,module,exports){
module.exports={
	"autoRender": true,
	"color": "#000",
	"isDefined": null,
	"label": "",
	"opacity": 0.9,
	"style": "-",
	"width": 2,
	"x": [],
	"xScale": null,
	"y": [],
	"yScale": null
}

},{}],243:[function(require,module,exports){
'use strict';

/**
* SVG path component.
*
* @module @stdlib/plot/components/svg/path
*
* @example
* var Path = require( '@stdlib/plot/components/svg/path' );
*
* var path = new Path({
*     'x': [0.1,0.2,0.3],
*     'y': [0.4,0.5,0.6]
* });
*/

// MODULES //

var Path = require( './path.js' );


// EXPORTS //

module.exports = Path;

},{"./path.js":244}],244:[function(require,module,exports){
'use strict';

// TODO: improve JSDoc examples

// MODULES //

var debug = require( 'debug' )( 'path:main' );
var EventEmitter = require( 'events' ).EventEmitter;
var getKeys = require( 'object-keys' ).shim();
var linear = require( 'd3-scale' ).scaleLinear; // TODO: remove
var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var copy = require( '@stdlib/utils/copy' );
var merge = require( '@stdlib/utils/merge' );
var isObject = require( '@stdlib/assert/is-plain-object' );
var isDefined = require( './accessors/is_defined.js' );
var defaults = require( './defaults.json' );


// VARIABLES //

var PRIVATE_PROPS = [
	'_autoRender',
	'_color',
	'_isDefined',
	'_label',
	'_opacity',
	'_style',
	'_width',
	'_xData',
	'_xScale',
	'_yData',
	'_yScale'
];


// MAIN //

/**
* Path constructor.
*
* @constructor
* @param {Options} options - constructor options
* @param {ArrayLike} [options.x=[]] - x-values
* @param {ArrayLike} [options.y=[]] - y-values
* @param {Function} [options.xScale] - x scale function
* @param {Function} [options.yScale] - y scale function
* @param {Function} [options.isDefined] - accessor indicating whether a datum is defined
* @param {string} [options.color] - color
* @param {string} [options.label] - label
* @param {NonNegativeInteger} [options.width=2] - width
* @param {number} [options.opacity=0.9] - opacity
* @param {string} [options.style='-'] - style
* @param {boolean} [options.autoRender=true] - indicates whether to re-render on a change event
* @throws {TypeError} must provide valid options
* @returns {Path} Path instance
*
* @example
* var path = new Path({
*     'x': [0.1,0.2,0.3],
*     'y': [0.4,0.5,0.6]
* });
*/
function Path( options ) {
	var self;
	var keys;
	var opts;
	var key;
	var i;
	if ( !( this instanceof Path ) ) {
		if ( arguments.length ) {
			return new Path( options );
		}
		return new Path();
	}
	self = this;

	opts = copy( defaults );
	opts.isDefined = isDefined;
	opts.xScale = linear();
	opts.yScale = linear();

	if ( arguments.length ) {
		if ( !isObject( options ) ) {
			throw new TypeError( 'invalid input argument. `options` argument must be an object. Value: `' + options + '`.' );
		}
		opts = merge( opts, options );
	}
	debug( 'Creating an instance with the following configuration: %s.', JSON.stringify( opts ) );
	EventEmitter.call( this );

	for ( i = 0; i < PRIVATE_PROPS.length; i++ ) {
		Object.defineProperty( this, PRIVATE_PROPS[i], {
			'configurable': false,
			'enumerable': false,
			'writable': true,
			'value': null
		});
	}
	// Set options...
	keys = getKeys( opts );
	for ( i = 0; i < keys.length; i++ ) {
		key = keys[ i ];
		this[ key ] = opts[ key ];
	}

	this.on( 'change', onChange );
	this.on( '_render', onRender );

	return this;

	/**
	* Callback invoked upon receiving a change event.
	*
	* @private
	*/
	function onChange() {
		debug( 'Received a change event.' );
		if ( self._autoRender ) {
			self.render();
		}
	}

	/**
	* Re-emits a render event.
	*
	* @private
	*/
	function onRender() {
		var args;
		var i;
		debug( 'Received a render event. Re-emitting...' );
		args = new Array( arguments.length+1 );
		args[ 0 ] = 'render';
		for ( i = 0; i < arguments.length; i++ ) {
			args[ i+1 ] = arguments[ i ];
		}
		self.emit.apply( self, args );
	}
} // end FUNCTION Path()

/*
* Create a prototype which inherits from the parent prototype.
*/
Path.prototype = Object.create( EventEmitter.prototype );

/*
* Set the constructor.
*/
Path.prototype.constructor = Path;

/**
* `x` values.
*
* @memberof Path.prototype
* @name x
* @type {ArrayLike}
* @default []
* @throws {TypeError} must be array-like
*
* @example
* var path = new Path({
*     'x': [0.1,0.2,0.3]
* });
*
* var x = path.x;
* // returns [0.1,0.2,0.3]
*/
Object.defineProperty( Path.prototype, 'x', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/x/set.js' ),
	'get': require( './props/x/get.js' )
});

/**
* `y` values.
*
* @memberof Path.prototype
* @name y
* @type {ArrayLike}
* @default []
* @throws {TypeError} must be array-like
*
* @example
* var path = new Path({
*     'y': [0.4,0.5,0.6]
* });
*
* var y = path.y;
* // returns [0.4,0.5,0.6]
*/
Object.defineProperty( Path.prototype, 'y', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/y/set.js' ),
	'get': require( './props/y/get.js' )
});

/**
* `x` scale function.
*
* @memberof Path.prototype
* @name xScale
* @type {Function}
* @throws {TypeError} must be a function
*
* @example
* var path = new Path({
*     'xScale': function scale(){}
* });
*
* var f = path.xScale;
* // returns <Function>
*/
Object.defineProperty( Path.prototype, 'xScale', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/x-scale/set.js' ),
	'get': require( './props/x-scale/get.js' )
});

/**
* `y` scale function.
*
* @memberof Path.prototype
* @name yScale
* @type {Function}
* @throws {TypeError} must be a function
*
* @example
* var path = new Path({
*     'yScale': function scale(){}
* });
*
* var f = path.yScale;
* // returns <Function>
*/
Object.defineProperty( Path.prototype, 'yScale', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/y-scale/set.js' ),
	'get': require( './props/y-scale/get.js' )
});

/**
* Accessor which defines whether a datum is defined. This accessor is used to define how missing values are encoded. The default behavior is to ignore values which are `NaN`.
*
* @memberof Path.prototype
* @name isDefined
* @type {Function}
* @throws {TypeError} must be a function
*
* @example
* var Path = new Path();
* path.isDefined = function isDefined( d ) {
*     // Check for `NaN`:
*     return ( d === d );
* }
*
* @example
* function isDefined( d ) {
*     // Check for `NaN`:
*     return ( d === d );
* }
* var path = new Path({
*     'isDefined': isDefined
* });
* var fcn = path.isDefined;
* // returns <Function>
*/
Object.defineProperty( Path.prototype, 'isDefined', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/is-defined/set.js' ),
	'get': require( './props/is-defined/get.js' )
});

/**
* Path color.
*
* @memberof Path.prototype
* @name color
* @type {string}
* @throws {TypeError} must be a primitive string
*
* @example
* var path = new Path({
*     'color': 'steelblue'
* });
*
* var color = path.color;
* // returns 'steelblue'
*/
Object.defineProperty( Path.prototype, 'color', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/color/set.js' ),
	'get': require( './props/color/get.js' )
});

/**
* Path label.
*
* @memberof Path.prototype
* @name label
* @type {string}
* @throws {TypeError} must be a primitive string
*
* @example
* var path = new Path({
*     'label': 'line-1'
* });
*
* var label = path.label;
* // returns 'line-1'
*/
Object.defineProperty( Path.prototype, 'label', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/label/set.js' ),
	'get': require( './props/label/get.js' )
});

/**
* Path opacity.
*
* @memberof Path.prototype
* @name opacity
* @type {number}
* @default 0.9
* @throws {TypeError} must be a number
* @throws {RangeError} must be a number on the interval `[0,1]`
*
* @example
* var path = new Path({
*     'opacity': 0.5
* });
*
* var opacity = path.opacity;
* // returns 0.5
*/
Object.defineProperty( Path.prototype, 'opacity', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/opacity/set.js' ),
	'get': require( './props/opacity/get.js' )
});

/**
* Path width.
*
* @memberof Path.prototype
* @name width
* @type {NonNegativeInteger}
* @default 2
* @throws {TypeError} must be a nonnegative integer
*
* @example
* var path = new Path({
*     'width': 1
* });
*
* var width = path.width;
* // returns 1
*/
Object.defineProperty( Path.prototype, 'width', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/width/set.js' ),
	'get': require( './props/width/get.js' )
});

/**
* Path style.
*
* @memberof Path.prototype
* @name style
* @type {string}
* @default '-'
* @throws {TypeError} must be a string primitive
*
* @example
* var path = new Path({
*     'style': '-.'
* });
*
* var style = path.style;
* // returns '-.'
*/
Object.defineProperty( Path.prototype, 'style', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/style/set.js' ),
	'get': require( './props/style/get.js' )
});

/**
* Rendering mode. If `true`, an instance re-renders on each change event.
*
* @memberof Path.prototype
* @name autoRender
* @type {boolean}
* @default true
* @throws {TypeError} must be a boolean primitive
*
* @example
* var path = new Path({
*     'autoRender': true
* });
*
* var mode = path.autoRender;
* // returns true
*/
Object.defineProperty( Path.prototype, 'autoRender', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/auto-render/set.js' ),
	'get': require( './props/auto-render/get.js' )
});

/**
* Returns a function to generate a line as an SVG path.
*
* @memberof Path.prototype
* @name line
* @type {Function}
*
* @example
* var path = new Path();
*
* var line = path.line;
* // returns <Function>
*/
Object.defineProperty( Path.prototype, 'line', {
	'configurable': false,
	'enumerable': true,
	'get': require( './props/line/get.js' )
});

/**
* Function to map values to x coordinate values.
*
* @memberof Path.prototype
* @type {Function}
* @name xPos
*
* @example
* var path = new Path();
* var xPos = path.xPos;
* // returns <Function>
*/
Object.defineProperty( Path.prototype, 'xPos', {
	'configurable': false,
	'enumerable': true,
	'get': require( './props/x-pos/get.js' )
});

/**
* Function to map values to y coordinate values.
*
* @memberof Path.prototype
* @type {Function}
* @name yPos
*
* @example
* var path = new Path();
* var yPos = path.yPos;
* // returns <Function>
*/
Object.defineProperty( Path.prototype, 'yPos', {
	'configurable': false,
	'enumerable': true,
	'get': require( './props/y-pos/get.js' )
});

/**
* Renders a virtual DOM tree.
*
* @memberof Path.prototype
* @name render
* @type {Function}
* @returns {VTree} virtual tree
*
* @example
* var path = new Path();
*
* var out = path.render();
*/
setReadOnly( Path.prototype, 'render', require( './render' ) );


// EXPORTS //

module.exports = Path;

},{"./accessors/is_defined.js":241,"./defaults.json":242,"./props/auto-render/get.js":245,"./props/auto-render/set.js":246,"./props/color/get.js":247,"./props/color/set.js":248,"./props/is-defined/get.js":249,"./props/is-defined/set.js":250,"./props/label/get.js":251,"./props/label/set.js":252,"./props/line/get.js":253,"./props/opacity/get.js":254,"./props/opacity/set.js":255,"./props/style/get.js":256,"./props/style/set.js":257,"./props/width/get.js":258,"./props/width/set.js":259,"./props/x-pos/get.js":260,"./props/x-scale/get.js":261,"./props/x-scale/set.js":262,"./props/x/get.js":263,"./props/x/set.js":264,"./props/y-pos/get.js":265,"./props/y-scale/get.js":266,"./props/y-scale/set.js":267,"./props/y/get.js":268,"./props/y/set.js":269,"./render":270,"@stdlib/assert/is-plain-object":50,"@stdlib/utils/copy":487,"@stdlib/utils/define-read-only-property":490,"@stdlib/utils/merge":514,"d3-scale":545,"debug":549,"events":564,"object-keys":577}],245:[function(require,module,exports){
arguments[4][102][0].apply(exports,arguments)
},{"dup":102}],246:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'path:set:auto-render' );
var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;


// MAIN //

/**
* Sets the rendering mode.
*
* @private
* @param {boolean} bool - boolean indicating whether to re-render on a change event
* @throws {TypeError} must be a positive number
*/
function set( bool ) {
	/*jshint validthis: true */ // TODO: eslint
	if ( !isBoolean( bool ) ) {
		throw new TypeError( 'invalid value. `autoRender` must be a boolean primitive. Value: `' + bool + '.`' );
	}
	debug( 'Current value: %d.', this._autoRender );

	this._autoRender = bool;
	debug( 'New Value: %d.', this._autoRender );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-boolean":10,"debug":549}],247:[function(require,module,exports){
'use strict';

/**
* Returns the path color.
*
* @private
* @returns {string} color
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._color;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],248:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'path:set:color' );
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;


// MAIN //

/**
* Sets the path color.
*
* @private
* @param {string} color - color
* @throws {TypeError} must be a string primitive
*/
function set( color ) {
	/*jshint validthis: true */ // TODO: eslint
	if ( !isString( color ) ) {
		throw new TypeError( 'invalid value. `color` must be a string primitive. Value: `' + color + '.`' );
	}
	debug( 'Current value: %d.', this._color );

	this._color = color;
	debug( 'New Value: %d.', this._color );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-string":62,"debug":549}],249:[function(require,module,exports){
'use strict';

/**
* Returns the accessor for defined values.
*
* @private
* @returns {Function} accessor
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._isDefined;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],250:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'path:set:is-defined' );
var isFunction = require( '@stdlib/assert/is-function' );


// MAIN //

/**
* Sets the accessor for defined values.
*
* @private
* @param {Function} fcn - accessor
* @throws {TypeError} must be a function
*/
function set( fcn ) {
	/*jshint validthis: true */ // TODO: eslint
	if ( !isFunction( fcn ) ) {
		throw new TypeError( 'invalid value. `isDefined` must be a function. Value: `' + fcn + '.`' );
	}
	debug( 'Current value: %s.', this._isDefined );

	this._isDefined = fcn;
	debug( 'New Value: %s.', this._isDefined );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-function":21,"debug":549}],251:[function(require,module,exports){
'use strict';

/**
* Returns the path label.
*
* @private
* @returns {string} label
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._label;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],252:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'path:set:label' );
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;


// MAIN //

/**
* Sets the path label.
*
* @private
* @param {string} label - label
* @throws {TypeError} must be a string primitive
*/
function set( label ) {
	/*jshint validthis: true */ // TODO: eslint
	if ( !isString( label ) ) {
		throw new TypeError( 'invalid value. `label` must be a string primitive. Value: `' + label + '.`' );
	}
	debug( 'Current value: %d.', this._label );

	this._label = label;
	debug( 'New Value: %d.', this._label );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-string":62,"debug":549}],253:[function(require,module,exports){
'use strict';

// MODULES //

var line = require( 'd3-shape' ).line; // TODO: remove


// MAIN //

/**
* Returns a function to generate a line as an SVG path.
*
* @private
* @returns {Function} function to generate a line as an SVG path
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	var f = line()
		.x( this.xPos )
		.y( this.yPos )
		.defined( this.isDefined );
		// TODO: interpolate (curve factory)
		// TODO: tension

	return f;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{"d3-shape":546}],254:[function(require,module,exports){
'use strict';

/**
* Returns the opacity.
*
* @private
* @returns {number} opacity
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._opacity;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],255:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'path:set:opacity' );
var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;


// MAIN //

/**
* Sets the opacity.
*
* @private
* @param {number} opacity - opacity
* @throws {TypeError} must be a number
* @throws {RangeError} must be a number on the interval `[0,1]`
*/
function set( opacity ) {
	/*jshint validthis: true */ // TODO: eslint
	if ( !isNumber( opacity ) ) {
		throw new TypeError( 'invalid value. `opacity` must be a number. Value: `' + opacity + '.`' );
	}
	if (
		opacity < 0.0 ||
		opacity > 1.0
	) {
		throw new RangeError( 'invalid value. `opacity` must be a number on the interval `[0,1]`. Value: `' + opacity + '`.' );
	}
	debug( 'Current value: %d.', this._opacity );

	this._opacity = opacity;
	debug( 'New Value: %d.', this._opacity );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-number":41,"debug":549}],256:[function(require,module,exports){
'use strict';

/**
* Returns the path style.
*
* @private
* @returns {string} style
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._style;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],257:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'path:set:style' );
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;


// MAIN //

/**
* Sets the path style.
*
* @private
* @param {string} v - style
* @throws {TypeError} must be a string primitive
*/
function set( v ) {
	/*jshint validthis: true */ // TODO: eslint
	if ( !isString( v ) ) {
		throw new TypeError( 'invalid value. `style` must be a string primitive. Value: `' + v + '.`' );
	}
	debug( 'Current value: %d.', this._style );

	this._style = v;
	debug( 'New Value: %d.', this._style );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-string":62,"debug":549}],258:[function(require,module,exports){
'use strict';

/**
* Returns the width.
*
* @private
* @returns {NonNegativeInteger} width
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._width;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],259:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'path:set:width' );
var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;


// MAIN //

/**
* Sets the width.
*
* @private
* @param {NonNegativeInteger} width - width
* @throws {TypeError} must be a nonnegative integer
*/
function set( v ) {
	/*jshint validthis: true */ // TODO: eslint
	if ( !isNonNegativeInteger( v ) ) {
		throw new TypeError( 'invalid value. `width` must be a nonnegative integer. Value: `' + v + '.`' );
	}
	debug( 'Current value: %d.', this._width );

	this._width = v;
	debug( 'New Value: %d.', this._width );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-nonnegative-integer":34,"debug":549}],260:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'path:xpos' );


// MAIN //

/**
* Returns a function to map values to x coordinate values.
*
* @private
* @returns {Function} map function
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	var scale = this.xScale;
	/**
	* Maps a value to a x coordinate value.
	*
	* @private
	* @param {Array} d - datum
	* @returns {number} pixel value
	*/
	return function xPos( d ) {
		var px = scale( d[0] );
		debug( 'Value: %d => Pixel: %d.', d[0], px );
		return px;
	}; // end FUNCTION xPos()
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{"debug":549}],261:[function(require,module,exports){
'use strict';

/**
* Returns the x-scale function.
*
* @private
* @returns {Function} scale function
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._xScale;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],262:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'path:set:xscale' );
var isFunction = require( '@stdlib/assert/is-function' );


// MAIN //

/**
* Sets the x-scale function.
*
* @private
* @param {Function} fcn - scale
* @throws {TypeError} must be a function
*/
function set( fcn ) {
	/*jshint validthis: true */ // TODO: eslint
	if ( !isFunction( fcn ) ) {
		throw new TypeError( 'invalid value. `xScale` must be a function. Value: `' + fcn + '.`' );
	}
	debug( 'Current value: %s.', this._xScale );

	this._xScale = fcn;
	debug( 'New Value: %s.', this._xScale );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-function":21,"debug":549}],263:[function(require,module,exports){
'use strict';

/**
* Returns the `x` values.
*
* @private
* @returns {ArrayLike} x values
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._xData;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],264:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'path:set:x' );
var isArrayLike = require( '@stdlib/assert/is-array-like' );


// MAIN //

/**
* Sets the `x` values.
*
* @private
* @param {ArrayLike} x - x values
* @throws {TypeError} must be array-like
*/
function set( x ) {
	/*jshint validthis: true */ // TODO: eslint
	if ( !isArrayLike( x ) ) {
		throw new TypeError( 'invalid value. `x` must be array-like. Value: `' + x + '.`' );
	}
	debug( 'Current value: %s.', JSON.stringify( this._xData ) );

	this._xData = x;
	debug( 'New Value: %s.', JSON.stringify( this._xData ) );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-array-like":5,"debug":549}],265:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'path:ypos' );


// MAIN //

/**
* Returns a function to map values to y coordinate values.
*
* @private
* @returns {Function} map function
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	var scale = this.yScale;
	/**
	* Maps a value to a y coordinate value.
	*
	* @private
	* @param {Array} d - datum
	* @returns {number} pixel value
	*/
	return function yPos( d ) {
		var px = scale( d[1] );
		debug( 'Value: %d => Pixel: %d.', d[1], px );
		return px;
	}; // end FUNCTION yPos()
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{"debug":549}],266:[function(require,module,exports){
'use strict';

/**
* Returns the y-scale function.
*
* @private
* @returns {Function} scale function
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._yScale;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],267:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'path:set:yscale' );
var isFunction = require( '@stdlib/assert/is-function' );


// MAIN //

/**
* Sets the y-scale function.
*
* @private
* @param {Function} fcn - scale
* @throws {TypeError} must be a function
*/
function set( fcn ) {
	/*jshint validthis: true */ // TODO: eslint
	if ( !isFunction( fcn ) ) {
		throw new TypeError( 'invalid value. `yScale` must be a function. Value: `' + fcn + '.`' );
	}
	debug( 'Current value: %s.', this._yScale );

	this._yScale = fcn;
	debug( 'New Value: %s.', this._yScale );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-function":21,"debug":549}],268:[function(require,module,exports){
'use strict';

/**
* Returns the `y` values.
*
* @private
* @returns {ArrayLike} y values
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._yData;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],269:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'path:set:y' );
var isArrayLike = require( '@stdlib/assert/is-array-like' );


// MAIN //

/**
* Sets the `y` values.
*
* @private
* @param {ArrayLike} y - y values
* @throws {TypeError} must be array-like
*/
function set( y ) {
	/*jshint validthis: true */ // TODO: eslint
	if ( !isArrayLike( y ) ) {
		throw new TypeError( 'invalid value. `y` must be array-like. Value: `' + y + '.`' );
	}
	debug( 'Current value: %s.', JSON.stringify( this._yData ) );

	this._yData = y;
	debug( 'New Value: %s.', JSON.stringify( this._yData ) );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-array-like":5,"debug":549}],270:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'path:render' );
var h = require( 'virtual-dom/h' );
var zip = require( './utils/zip.js' );
var style = require( './utils/style.js' );


// VARIABLES //

var ELEMENT = 'path';


// MAIN //

/**
* Renders a virtual DOM tree.
*
* @private
* @returns {VTree} virtual DOM tree
*/
function render() {
	/* jshint validthis: true */ // TODO: eslint
	var props;
	var vtree;

	debug( 'Rendering...' );

	props = {
		'namespace': 'http://www.w3.org/2000/svg',
		'property': 'line',
		'className': 'path line',
		'attributes': {
			'd': this.line( zip( this._xData, this._yData ) ),
			'fill': 'none',
			'stroke': this.color,
			'stroke-width': this.width,
			'stroke-opacity': this.opacity,
			'stroke-dasharray': style( this.style ),
			'data-label': this.label
		}
	};

	debug( 'Generating a virtual DOM tree (%s) with properties: %s.', ELEMENT, JSON.stringify( props ) );
	vtree = h( ELEMENT, props, [] );

	// Announce that a new tree has been rendered:
	this.emit( '_render', vtree );

	return vtree;
} // end FUNCTION render()


// EXPORTS //

module.exports = render;

},{"./utils/style.js":271,"./utils/zip.js":272,"debug":549,"virtual-dom/h":614}],271:[function(require,module,exports){
'use strict';

// VARIABLES //

var STYLES = {
	// Solid path:
	'-': '',

	// Dashes:
	'--': '5, 1',

	// Dotted path:
	':': '0.9',

	// Dash-dotted path:
	'-.': '5, 1, 1, 1'
};


// MAIN //

/**
* Checks for a known style. If present, returns the [`stroke-dasharray`]{@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray}. Otherwise, returns the provided input value.
*
* @private
* @param {string} v - style
* @returns {string} stroke dasharray value
*/
function style( v ) {
	var s = STYLES[ v ];
	if ( s ) {
		return s;
	}
	return v;
} // end FUNCTION style()


// EXPORTS //

module.exports = style;

},{}],272:[function(require,module,exports){
'use strict';

/**
* Zips two arrays.
*
* @private
* @param {ArrayLike} x - x-values
* @param {ArrayLike} y - y-values
* @throws {Error} must provide equal length array-like objects
* @returns {Array<Array>} zipped array
*/
function zip( x, y ) {
	var out;
	var i;
	if ( x.length !== y.length ) {
		throw new Error( 'invalid input arguments. Must provide equal length array-like objects. `x` length: '+x.length+', `y` length: '+y.length+'.' );
	}
	out = new Array( x.length );
	for ( i = 0; i < x.length; i++ ) {
		out[ i ] = [ x[i], y[i] ];
	}
	return out;
} // end FUNCTION zip()


// EXPORTS //

module.exports = zip;

},{}],273:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'rug:accessor:is-defined' );
var isnan = require( '@stdlib/assert/is-nan' ).isPrimitive;


// MAIN //

/**
* Predicate function which returns a boolean indicating whether a datum is defined.
*
* @private
* @param {number} d - datum
* @param {integer} i - index
* @returns {boolean} boolean indicating whether a datum is defined
*/
function isDefined( d ) {
	var bool = !isnan( d );
	debug( 'Datum: %s. Defined: %s.', JSON.stringify( d ), bool );
	return bool;
} // end FUNCTION isDefined()


// EXPORTS //

module.exports = isDefined;

},{"@stdlib/assert/is-nan":29,"debug":549}],274:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'rug:main' );
var EventEmitter = require( 'events' ).EventEmitter;
var getKeys = require( 'object-keys' ).shim();
var linear = require( 'd3-scale' ).scaleLinear; // TODO: remove
var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var copy = require( '@stdlib/utils/copy' );
var merge = require( '@stdlib/utils/merge' );
var isObject = require( '@stdlib/assert/is-plain-object' );
var instanceOf = require( '@stdlib/assert/instance-of' );
var inherit = require( '@stdlib/utils/inherit' );
var isDefined = require( './accessors/is_defined.js' );
var defaults = require( './defaults.json' );


// VARIABLES //

var PRIVATE_PROPS = [
	'_autoRender',
	'_color',
	'_data',
	'_isDefined',
	'_label',
	'_opacity',
	'_orientation',
	'_scale',
	'_size'
];


// MAIN //

/**
* Rug constructor.
*
* @constructor
* @param {Options} [options] - constructor options
* @param {boolean} [options.autoRender=true] - indicates whether to re-render on a change event
* @param {(string|Function)} [options.color="#aaa"] - color
* @param {ArrayLike} [options.data=[]] - data
* @param {Function} [options.isDefined] - predicate function indicating whether a datum is defined
* @param {(string|Function)} [options.label] - label
* @param {(number|Function)} [options.opacity=0.9] - opacity
* @param {string} [options.orientation="bottom"] - orientation
* @param {Function} [options.scale] - scale function
* @param {NonNegativeInteger} [options.size=6] - tick (tassel) size
* @throws {TypeError} options argument must be an object
* @throws {TypeError} must provide valid options
* @returns {Rug} Rug instance
*
* @example
* var node = new Rug({
*     'data': [ 0.1, 0.2, 0.3 ]
* });
* // returns <Rug>
*/
function Rug( options ) {
	var self;
	var keys;
	var opts;
	var key;
	var i;
	if ( !instanceOf( this, Rug ) ) {
		if ( arguments.length ) {
			return new Rug( options );
		}
		return new Rug();
	}
	self = this;

	opts = copy( defaults );
	opts.isDefined = isDefined;
	opts.scale = linear();

	if ( arguments.length ) {
		if ( !isObject( options ) ) {
			throw new TypeError( 'invalid input argument. `options` argument must be an object. Value: `' + options + '`.' );
		}
		opts = merge( opts, options );
	}
	debug( 'Creating an instance with the following configuration: %s.', JSON.stringify( opts ) );
	EventEmitter.call( this );

	for ( i = 0; i < PRIVATE_PROPS.length; i++ ) {
		Object.defineProperty( this, PRIVATE_PROPS[i], {
			'configurable': false,
			'enumerable': false,
			'writable': true,
			'value': null
		});
	}
	// Set options...
	keys = getKeys( opts );
	for ( i = 0; i < keys.length; i++ ) {
		key = keys[ i ];
		this[ key ] = opts[ key ];
	}

	this.on( 'change', onChange );
	this.on( '_render', onRender );

	return this;

	/**
	* Callback invoked upon receiving a change event.
	*
	* @private
	*/
	function onChange() {
		debug( 'Received a change event.' );
		if ( self._autoRender ) { // eslint-disable-line no-underscore-dangle
			self.render();
		}
	}

	/**
	* Re-emits a render event.
	*
	* @private
	*/
	function onRender() {
		var args;
		var i;
		debug( 'Received a render event. Re-emitting...' );
		args = new Array( arguments.length+1 );
		args[ 0 ] = 'render';
		for ( i = 0; i < arguments.length; i++ ) {
			args[ i+1 ] = arguments[ i ];
		}
		self.emit.apply( self, args );
	}
} // end FUNCTION Rug()

/*
* Inherit from the `EventEmitter` prototype.
*/
inherit( Rug, EventEmitter );

/**
* Rendering mode. If `true`, an instance re-renders on each change event.
*
* @memberof Rug.prototype
* @name autoRender
* @type {boolean}
* @default true
* @throws {TypeError} must be a boolean primitive
*
* @example
* var node = new Rug({
*     'autoRender': true
* });
*
* var mode = node.autoRender;
* // returns true
*/
Object.defineProperty( Rug.prototype, 'autoRender', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/auto-render/set.js' ),
	'get': require( './props/auto-render/get.js' )
});

/**
* Tick color. When retrieved, the returned value is a color accessor.
*
* @memberof Rug.prototype
* @name color
* @type {(string|Function)}
* @throws {TypeError} must be a primitive string or function
*
* @example
* var node = new Rug({
*     'color': 'steelblue'
* });
*
* var color = node.color;
* // returns <Function>
*/
Object.defineProperty( Rug.prototype, 'color', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/color/set.js' ),
	'get': require( './props/color/get.js' )
});

/**
* Data.
*
* @memberof Rug.prototype
* @name data
* @type {ArrayLike}
* @default []
* @throws {TypeError} must be array-like
*
* @example
* var node = new Rug({
*     'data': [ 0.1, 0.2, 0.3 ]
* });
*
* var data = node.data;
* // returns [ 0.1, 0.2, 0.3 ]
*/
Object.defineProperty( Rug.prototype, 'data', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/data/set.js' ),
	'get': require( './props/data/get.js' )
});

/**
* Predicate function which defines whether a datum is defined. This accessor is used to define how missing values are encoded. The default behavior is to ignore values which are `NaN`.
*
* @memberof Rug.prototype
* @name isDefined
* @type {Function}
* @throws {TypeError} must be a function
*
* @example
* var node = new Rug();
*
* function isDefined( d ) {
*     // Check for `NaN`:
*     return ( d === d );
* }
* node.isDefined = isDefined;
*
* @example
* function isDefined( d ) {
*     // Check for `NaN`:
*     return ( d === d );
* }
* var node = new Rug({
*     'isDefined': isDefined
* });
* var fcn = node.isDefined;
* // returns <Function>
*/
Object.defineProperty( Rug.prototype, 'isDefined', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/is-defined/set.js' ),
	'get': require( './props/is-defined/get.js' )
});

/**
* Tick label. When retrieved, the returned value is a label accessor.
*
* @memberof Rug.prototype
* @name label
* @type {(string|Function)}
* @throws {TypeError} must be a primitive string or function
*
* @example
* var node = new Rug({
*     'label': 'group-1'
* });
*
* var label = node.label;
* // returns <Function>
*/
Object.defineProperty( Rug.prototype, 'label', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/label/set.js' ),
	'get': require( './props/label/get.js' )
});

/**
* Tick opacity. When retrieved, the returned value is an opacity accessor.
*
* @memberof Rug.prototype
* @name opacity
* @type {number}
* @default 0.9
* @throws {TypeError} must be a number
* @throws {RangeError} must be a number on the interval `[0,1]`
*
* @example
* var node = new Rug({
*     'opacity': 0.5
* });
*
* var opacity = node.opacity;
* // returns <Function>
*/
Object.defineProperty( Rug.prototype, 'opacity', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/opacity/set.js' ),
	'get': require( './props/opacity/get.js' )
});

/**
* Rug orientation.
*
* @memberof Rug.prototype
* @name orientation
* @type {string}
* @throws {TypeError} must be a supported orientation
*
* @example
* var node = new Rug({
*     'orientation': 'left'
* });
*
* var orient = node.orientation;
* // returns 'left'
*/
Object.defineProperty( Rug.prototype, 'orientation', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/orientation/set.js' ),
	'get': require( './props/orientation/get.js' )
});

/**
* Function to map values to x coordinate values.
*
* @memberof Rug.prototype
* @name pos
* @type {Function}
*
* @example
* var node = new Rug();
*
* var pos = node.pos;
* // returns <Function>
*/
Object.defineProperty( Rug.prototype, 'pos', {
	'configurable': false,
	'enumerable': true,
	'get': require( './props/pos/get.js' )
});

/**
* Scale function.
*
* @memberof Rug.prototype
* @name scale
* @type {Function}
* @throws {TypeError} must be a function
*
* @example
* var node = new Rug({
*     'scale': function scale() {}
* });
*
* var fcn = node.scale;
* // returns <Function>
*/
Object.defineProperty( Rug.prototype, 'scale', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/scale/set.js' ),
	'get': require( './props/scale/get.js' )
});

/**
* Tick (tassel) size.
*
* @memberof Rug.prototype
* @name size
* @type {NonNegativeInteger}
* @default 6
* @throws {TypeError} must be a nonnegative integer
*
* @example
* var node = new Rug({
*     'size': 5
* });
*
* var size = node.size;
* // returns 5
*/
Object.defineProperty( Rug.prototype, 'size', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/size/set.js' ),
	'get': require( './props/size/get.js' )
});

/**
* Renders a Virtual DOM tree.
*
* @memberof Rug.prototype
* @name render
* @type {Function}
* @returns {VTree} virtual tree
*
* @example
* var node = new Rug();
*
* var out = node.render();
* // returns <Object>
*/
setReadOnly( Rug.prototype, 'render', require( './render' ) );


// EXPORTS //

module.exports = Rug;

},{"./accessors/is_defined.js":273,"./defaults.json":275,"./props/auto-render/get.js":277,"./props/auto-render/set.js":278,"./props/color/get.js":279,"./props/color/set.js":280,"./props/data/get.js":281,"./props/data/set.js":282,"./props/is-defined/get.js":283,"./props/is-defined/set.js":284,"./props/label/get.js":285,"./props/label/set.js":286,"./props/opacity/get.js":287,"./props/opacity/set.js":288,"./props/orientation/get.js":289,"./props/orientation/set.js":291,"./props/pos/get.js":292,"./props/scale/get.js":293,"./props/scale/set.js":294,"./props/size/get.js":295,"./props/size/set.js":296,"./render":297,"@stdlib/assert/instance-of":3,"@stdlib/assert/is-plain-object":50,"@stdlib/utils/copy":487,"@stdlib/utils/define-read-only-property":490,"@stdlib/utils/inherit":506,"@stdlib/utils/merge":514,"d3-scale":545,"debug":549,"events":564,"object-keys":577}],275:[function(require,module,exports){
module.exports={
	"autoRender": true,
	"color": "#aaa",
	"data": [],
	"isDefined": null,
	"label": "",
	"opacity": 0.9,
	"orientation": "bottom",
	"scale": null,
	"size": 6
}

},{}],276:[function(require,module,exports){
'use strict';

/**
* SVG rug component.
*
* @module @stdlib/plot/components/svg/rug
*
* @example
* var Rug = require( '@stdlib/plot/components/svg/rug' );
*
* var node = new Rug({
*     'data': [ 0.1, 0.2, 0.3 ]
* });
* // returns <Rug>
*/

// MODULES //

var Rug = require( './ctor.js' );


// EXPORTS //

module.exports = Rug;

},{"./ctor.js":274}],277:[function(require,module,exports){
'use strict';

/**
* Returns the rendering mode.
*
* @private
* @returns {boolean} rendering mode
*/
function get() {
	/* eslint-disable no-invalid-this */
	return this._autoRender;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],278:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'rug:set:auto-render' );
var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;


// MAIN //

/**
* Sets the rendering mode.
*
* @private
* @param {boolean} bool - boolean indicating whether to re-render on a change event
* @throws {TypeError} must be a boolean primitive
*/
function set( bool ) {
	/* eslint-disable no-invalid-this */
	if ( !isBoolean( bool ) ) {
		throw new TypeError( 'invalid value. `autoRender` must be a boolean primitive. Value: `' + bool + '.`' );
	}
	if ( bool !== this._autoRender ) {
		debug( 'Current value: %d.', this._autoRender );

		this._autoRender = bool;
		debug( 'New Value: %d.', this._autoRender );

		this.emit( 'change' );
	}
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-boolean":10,"debug":549}],279:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;


// MAIN //

/**
* Returns a function to get a color.
*
* @private
* @returns {Function} color accessor
*/
function get() {
	/* eslint-disable no-invalid-this */
	var self = this;
	if ( isString( this._color ) ) {
		return color;
	}
	return this._color;

	/**
	* Returns a color value.
	*
	* @private
	* @returns {string} color
	*/
	function color() {
		return self._color; // eslint-disable-line no-underscore-dangle
	}
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{"@stdlib/assert/is-string":62}],280:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'rug:set:color' );
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var isFunction = require( '@stdlib/assert/is-function' );


// MAIN //

/**
* Sets the color.
*
* @private
* @param {(string|Function)} color - color
* @throws {TypeError} must be a string primitive or function
*/
function set( color ) {
	/* eslint-disable no-invalid-this */
	if ( !isString( color ) && !isFunction( color ) ) {
		throw new TypeError( 'invalid value. `color` must be a string primitive or a function. Value: `' + color + '.`' );
	}
	if ( color !== this._color ) {
		debug( 'Current value: %d.', this._color );

		this._color = color;
		debug( 'New Value: %d.', this._color );

		this.emit( 'change' );
	}
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-function":21,"@stdlib/assert/is-string":62,"debug":549}],281:[function(require,module,exports){
'use strict';

/**
* Returns the data values.
*
* @private
* @returns {ArrayLike} data values
*/
function get() {
	/* eslint-disable no-invalid-this */
	return this._data;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],282:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'rug:set:data' );
var isArrayLike = require( '@stdlib/assert/is-array-like' );


// MAIN //

/**
* Sets the data values.
*
* ## Notes
*
* * We always fire a `change` event when set, even if the provided reference is the same, to allow signaling that data values have changed (e.g., a data array has mutated).
*
* @private
* @param {ArrayLike} data - data values
* @throws {TypeError} must be array-like
*/
function set( data ) {
	/* eslint-disable no-invalid-this */
	if ( !isArrayLike( data ) ) {
		throw new TypeError( 'invalid value. `data` must be array-like. Value: `' + data + '.`' );
	}
	debug( 'Current value: %s.', JSON.stringify( this._data ) );

	this._data = data;
	debug( 'New Value: %s.', JSON.stringify( this._data ) );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-array-like":5,"debug":549}],283:[function(require,module,exports){
'use strict';

/**
* Returns the predicate function for determining whether a value is defined.
*
* @private
* @returns {Function} predicate function
*/
function get() {
	/* eslint-disable no-invalid-this */
	return this._isDefined;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],284:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'rug:set:is-defined' );
var isFunction = require( '@stdlib/assert/is-function' );


// MAIN //

/**
* Sets the predicate function for determining whether a value is defined.
*
* @private
* @param {Function} fcn - predicate function
* @throws {TypeError} must be a function
*/
function set( fcn ) {
	/* eslint-disable no-invalid-this */
	if ( !isFunction( fcn ) ) {
		throw new TypeError( 'invalid value. `isDefined` must be a function. Value: `' + fcn + '.`' );
	}
	if ( fcn !== this._isDefined ) {
		debug( 'Current value: %s.', this._isDefined );

		this._isDefined = fcn;
		debug( 'New Value: %s.', this._isDefined );

		this.emit( 'change' );
	}
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-function":21,"debug":549}],285:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;


// MAIN //

/**
* Returns a function to get a label.
*
* @private
* @returns {Function} label accessor
*/
function get() {
	/* eslint-disable no-invalid-this */
	var self = this;
	if ( isString( this._label ) ) {
		return label;
	}
	return this._label;

	/**
	* Returns a label.
	*
	* @private
	* @returns {string} label
	*/
	function label() {
		return self._label; // eslint-disable-line no-underscore-dangle
	}
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{"@stdlib/assert/is-string":62}],286:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'rug:set:label' );
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var isFunction = require( '@stdlib/assert/is-function' );


// MAIN //

/**
* Sets the label.
*
* @private
* @param {(string|Function)} label - label
* @throws {TypeError} must be a string primitive or a function
*/
function set( label ) {
	/* eslint-disable no-invalid-this */
	if ( !isString( label ) && !isFunction( label ) ) {
		throw new TypeError( 'invalid value. `label` must be a string primitive or a function. Value: `' + label + '.`' );
	}
	if ( label !== this._label ) {
		debug( 'Current value: %d.', this._label );

		this._label = label;
		debug( 'New Value: %d.', this._label );

		this.emit( 'change' );
	}
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-function":21,"@stdlib/assert/is-string":62,"debug":549}],287:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;


// MAIN //

/**
* Returns a function to get an opacity.
*
* @private
* @returns {Function} opacity accessor
*/
function get() {
	/* eslint-disable no-invalid-this */
	var self = this;
	if ( isNumber( this._opacity ) ) {
		return opacity;
	}
	return this._opacity;

	/**
	* Returns the opacity.
	*
	* @private
	* @returns {number} opacity
	*/
	function opacity() {
		return self._opacity; // eslint-disable-line no-underscore-dangle
	}
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{"@stdlib/assert/is-number":41}],288:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'rug:set:opacity' );
var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;
var isFunction = require( '@stdlib/assert/is-function' );


// MAIN //

/**
* Sets the opacity.
*
* @private
* @param {(number|Function)} opacity - opacity
* @throws {TypeError} must be a number or a function
* @throws {RangeError} must be a number on the interval `[0,1]`
*/
function set( opacity ) {
	/* eslint-disable no-invalid-this */
	var isNum = isNumber( opacity );
	if ( !isNum && !isFunction( opacity ) ) {
		throw new TypeError( 'invalid value. `opacity` must be a number or a function. Value: `' + opacity + '.`' );
	}
	if ( isNum && (opacity !== opacity || opacity < 0.0 || opacity > 1.0) ) {
		throw new RangeError( 'invalid value. `opacity` must be a number on the interval `[0,1]`. Value: `' + opacity + '`.' );
	}
	if ( opacity !== this._opacity ) {
		debug( 'Current value: %d.', this._opacity );

		this._opacity = opacity;
		debug( 'New Value: %d.', this._opacity );

		this.emit( 'change' );
	}
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-function":21,"@stdlib/assert/is-number":41,"debug":549}],289:[function(require,module,exports){
'use strict';

/**
* Returns the orientation.
*
* @private
* @returns {string} orientation
*/
function get() {
	/* eslint-disable no-invalid-this */
	return this._orientation;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],290:[function(require,module,exports){
module.exports=[
	"bottom",
	"left",
	"right",
	"top"
]

},{}],291:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'rug:set:orientation' );
var indexOf = require( '@stdlib/utils/index-of' );
var ORIENTATIONS = require( './orientations.json' );


// MAIN //

/**
* Sets the orientation.
*
* @private
* @param {string} orient - orientation
* @throws {TypeError} must be a supported orientation
*/
function set( orient ) {
	/* eslint-disable no-invalid-this */
	if ( indexOf( ORIENTATIONS, orient ) === -1 ) {
		throw new Error( 'invalid value. `orientation` must be one of `['+ORIENTATIONS.join(',')+']`. Value: `' + orient + '.`' );
	}
	if ( orient !== this._orientation ) {
		debug( 'Current value: %d.', this._orientation );

		this._orientation = orient;
		debug( 'New Value: %d.', this._orientation );

		this.emit( 'change' );
	}
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"./orientations.json":290,"@stdlib/utils/index-of":503,"debug":549}],292:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'rug:pos' );


// MAIN //

/**
* Returns a function to map values to coordinate values.
*
* @private
* @returns {Function} map function
*/
function get() {
	/* eslint-disable no-invalid-this */
	var scale = this.scale;
	return pos;

	/**
	* Maps a value to a coordinate value.
	*
	* @private
	* @param {*} d - datum
	* @returns {number} pixel value
	*/
	function pos( d ) {
		var p = scale( d );
		debug( 'Value: %d => Pixel: %d.', d, p );
		return p;
	} // end FUNCTION pos()
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{"debug":549}],293:[function(require,module,exports){
'use strict';

/**
* Returns the scale function.
*
* @private
* @returns {Function} scale function
*/
function get() {
	/* eslint-disable no-invalid-this */
	return this._scale;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],294:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'rug:set:scale' );
var isFunction = require( '@stdlib/assert/is-function' );


// MAIN //

/**
* Sets the scale function.
*
* @private
* @param {Function} fcn - scale
* @throws {TypeError} must be a function
*/
function set( fcn ) {
	/* eslint-disable no-invalid-this */
	if ( !isFunction( fcn ) ) {
		throw new TypeError( 'invalid value. `scale` must be a function. Value: `' + fcn + '.`' );
	}
	if ( fcn !== this._scale ) {
		debug( 'Current value: %s.', this._scale );

		this._scale = fcn;
		debug( 'New Value: %s.', this._scale );

		this.emit( 'change' );
	}
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-function":21,"debug":549}],295:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Returns the tick (tassel) size.
*
* @private
* @returns {NonNegativeInteger} tick size
*/
function get() {
	/* eslint-disable no-invalid-this */
	return this._size;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],296:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'rug:set:size' );
var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;


// MAIN //

/**
* Sets the tick (tassel) size.
*
* @private
* @param {NonNegativeInteger} size - size
* @throws {TypeError} must be a nonnegative integer
*/
function set( size ) {
	/* eslint-disable no-invalid-this */
	if ( !isNonNegativeInteger( size ) ) {
		throw new TypeError( 'invalid value. `size` must be a nonnegative integer. Value: `' + size + '.`' );
	}
	if ( size !== this._size ) {
		debug( 'Current value: %d.', this._size );

		this._size = size;
		debug( 'New Value: %d.', this._size );

		this.emit( 'change' );
	}
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-nonnegative-integer":34,"debug":549}],297:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'rug:render' );
var h = require( 'virtual-dom/h' );
var ticks = require( './ticks.js' );


// VARIABLES //

var ELEMENT = 'g';


// MAIN //

/**
* Renders a virtual DOM tree.
*
* @private
* @returns {VTree} virtual tree
*/
function render() {
	/* eslint-disable no-invalid-this */
	var children;
	var props;
	var vtree;

	debug( 'Rendering...' );

	props = {
		'namespace': 'http://www.w3.org/2000/svg',
		'property': 'rug',
		'className': 'rug'
	};

	children = ticks( this );

	debug( 'Generating a virtual DOM tree (%s) with properties: %s.', ELEMENT, JSON.stringify( props ) );
	vtree = h( ELEMENT, props, children );

	// Announce that a new tree has been rendered:
	this.emit( '_render', vtree );

	return vtree;
} // end FUNCTION render()


// EXPORTS //

module.exports = render;

},{"./ticks.js":298,"debug":549,"virtual-dom/h":614}],298:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'rug:render:ticks' );
var h = require( 'virtual-dom/h' );
var xAttr = require( './utils/x_attr.js' );
var yAttr = require( './utils/y_attr.js' );
var tickDir = require( './utils/tick_dir.js' );


// VARIABLES //

var ELEMENT = 'line';


// MAIN //

/**
* Renders rug ticks (tassels).
*
* @private
* @param {Object} ctx - context
* @returns {Array<VTree>} array of virtual trees
*/
function render( ctx ) {
	var props;
	var data;
	var out;
	var pos;
	var dir;
	var p;
	var x;
	var y;
	var d;
	var i;

	debug( 'Rendering ticks...' );

	data = ctx.data;
	pos = ctx.pos;
	x = xAttr( ctx.orientation );
	y = yAttr( ctx.orientation );
	dir = tickDir( ctx.orientation );

	out = new Array( data.length );
	for ( i = 0; i < data.length; i++ ) {
		d = data[ i ];
		if ( !ctx.isDefined( d, i ) ) {
			debug( 'Datum %d is not defined. Value: %s.', i, d );
			continue;
		}
		props = {
			'namespace': 'http://www.w3.org/2000/svg',
			'property': 'rug.tick',
			'className': 'tick',
			'attributes': {
				'fill': 'none',
				'opacity': ctx.opacity( d, i ),
				'stroke': ctx.color( d, i ),
				'stroke-width': 1,
				'data-label': ctx.label( d, i )
			}
		};

		p = pos( d );
		props.attributes[ x+'1' ] = 0;
		props.attributes[ x+'2' ] = dir * ctx.size;
		props.attributes[ y+'1' ] = p;
		props.attributes[ y+'2' ] = p;

		debug( 'Rendering tick %d with value %s...', i, d );

		debug( 'Generating a virtual DOM tree (%s) with properties: %s.', ELEMENT, JSON.stringify( props ) );
		out[ i ] = h( ELEMENT, props, [] );
	}
	debug( 'Finished rendering ticks.' );
	return out;
} // end FUNCTION render()


// EXPORTS //

module.exports = render;

},{"./utils/tick_dir.js":299,"./utils/x_attr.js":300,"./utils/y_attr.js":301,"debug":549,"virtual-dom/h":614}],299:[function(require,module,exports){
'use strict';

/**
* Returns the tick direction.
*
* @private
* @param {string} orient - orientation
* @returns {number} tick direction
*/
function tickDir( orient ) {
	if ( orient === 'bottom' || orient === 'right' ) {
		return -1;
	}
	return 1;
} // end FUNCTION tickDir()


// EXPORTS //

module.exports = tickDir;

},{}],300:[function(require,module,exports){
'use strict';

/**
* Returns the "x" attribute for tick positioning.
*
* @private
* @param {string} orient - rug orientation
* @returns {string} attribute
*/
function xAttr( orient ) {
	if ( orient === 'left' || orient === 'right' ) {
		return 'x';
	}
	return 'y';
} // end FUNCTION xAttr()


// EXPORTS //

module.exports = xAttr;

},{}],301:[function(require,module,exports){
'use strict';

/**
* Returns the "y" attribute for tick positioning.
*
* @private
* @param {string} orient - rug orientation
* @returns {string} attribute
*/
function yAttr( orient ) {
	if ( orient === 'left' || orient === 'right' ) {
		return 'y';
	}
	return 'x';
} // end FUNCTION yAttr()


// EXPORTS //

module.exports = yAttr;

},{}],302:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'symbols:accessor:is-defined' );
var isnan = require( '@stdlib/assert/is-nan' ).isPrimitive;


// MAIN //

/**
* Accessor function which determines whether a datum is defined.
*
* @private
* @param {number} d - datum
* @returns {boolean} boolean indicating whether a datum is defined
*/
function isDefined( d ) {
	var bool = !isnan( d );
	debug( 'Datum: %s. Defined: %s.', JSON.stringify( d ), bool );
	return bool;
} // end FUNCTION isDefined()


// EXPORTS //

module.exports = isDefined;

},{"@stdlib/assert/is-nan":29,"debug":549}],303:[function(require,module,exports){
module.exports={
	"autoRender": true,
	"color": "#000",
	"isDefined": null,
	"label": "",
	"opacity": 0.9,
	"size": 6,
	"symbol": "closed-circle",
	"x": [],
	"xScale": null,
	"y": [],
	"yScale": null
}

},{}],304:[function(require,module,exports){
'use strict';

/**
* SVG symbols.
*
* @module @stdlib/plot/components/svg/symbols
*
* @example
* var Symbols = require( '@stdlib/plot/components/svg/symbols' );
*
* var symbols = new Symbols({
*     'x': [0.1,0.2,0.3],
*     'y': [0.4,0.5,0.6]
* });
*/

// MODULES //

var Symbols = require( './symbols.js' );


// EXPORTS //

module.exports = Symbols;

},{"./symbols.js":333}],305:[function(require,module,exports){
arguments[4][102][0].apply(exports,arguments)
},{"dup":102}],306:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'symbols:set:auto-render' );
var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;


// MAIN //

/**
* Sets the rendering mode.
*
* @private
* @param {boolean} bool - boolean indicating whether to re-render on a change event
* @throws {TypeError} must be a boolean primitive
*/
function set( bool ) {
	/*jshint validthis: true */ // TODO: eslint
	if ( !isBoolean( bool ) ) {
		throw new TypeError( 'invalid value. `autoRender` must be a boolean primitive. Value: `' + bool + '.`' );
	}
	debug( 'Current value: %d.', this._autoRender );

	this._autoRender = bool;
	debug( 'New Value: %d.', this._autoRender );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-boolean":10,"debug":549}],307:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;


// MAIN //

/**
* Returns a function to get a symbol's color.
*
* @private
* @returns {Function} color accessor
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	var self = this;
	if ( isString( this._color ) ) {
		return color;
	}
	return this._color;

	function color() {
		return self._color;
	}
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{"@stdlib/assert/is-string":62}],308:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'symbols:set:color' );
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var isFunction = require( '@stdlib/assert/is-function' );


// MAIN //

/**
* Sets the color.
*
* @private
* @param {(string|Function)} color - color
* @throws {TypeError} must be a string primitive or function
*/
function set( color ) {
	/*jshint validthis: true */ // TODO: eslint
	if (
		!isString( color ) &&
		!isFunction( color )
	) {
		throw new TypeError( 'invalid value. `color` must be a string primitive or a function. Value: `' + color + '.`' );
	}
	debug( 'Current value: %d.', this._color );

	this._color = color;
	debug( 'New Value: %d.', this._color );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-function":21,"@stdlib/assert/is-string":62,"debug":549}],309:[function(require,module,exports){
arguments[4][249][0].apply(exports,arguments)
},{"dup":249}],310:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'symbols:set:is-defined' );
var isFunction = require( '@stdlib/assert/is-function' );


// MAIN //

/**
* Sets the accessor for defined values.
*
* @private
* @param {Function} fcn - accessor
* @throws {TypeError} must be a function
*/
function set( fcn ) {
	/*jshint validthis: true */ // TODO: eslint
	if ( !isFunction( fcn ) ) {
		throw new TypeError( 'invalid value. `isDefined` must be a function. Value: `' + fcn + '.`' );
	}
	debug( 'Current value: %s.', this._isDefined );

	this._isDefined = fcn;
	debug( 'New Value: %s.', this._isDefined );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-function":21,"debug":549}],311:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;


// MAIN //

/**
* Returns a function to get a symbol's label.
*
* @private
* @returns {Function} label accessor
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	var self = this;
	if ( isString( this._label ) ) {
		return label;
	}
	return this._label;

	function label() {
		return self._label;
	}
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{"@stdlib/assert/is-string":62}],312:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'symbols:set:label' );
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var isFunction = require( '@stdlib/assert/is-function' );


// MAIN //

/**
* Sets the label.
*
* @private
* @param {(string|Function)} label - label
* @throws {TypeError} must be a string primitive or a function
*/
function set( label ) {
	/*jshint validthis: true */ // TODO: eslint
	if (
		!isString( label ) &&
		!isFunction( label )
	) {
		throw new TypeError( 'invalid value. `label` must be a string primitive or a function. Value: `' + label + '.`' );
	}
	debug( 'Current value: %d.', this._label );

	this._label = label;
	debug( 'New Value: %d.', this._label );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-function":21,"@stdlib/assert/is-string":62,"debug":549}],313:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;


// MAIN //

/**
* Returns a function to get a symbol's opacity.
*
* @private
* @returns {Function} opacity accessor
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	var self = this;
	if ( isNumber( this._opacity ) ) {
		return opacity;
	}
	return this._opacity;

	function opacity() {
		return self._opacity;
	}
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{"@stdlib/assert/is-number":41}],314:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'symbols:set:opacity' );
var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;
var isFunction = require( '@stdlib/assert/is-function' );


// MAIN //

/**
* Sets the symbol opacity.
*
* @private
* @param {(number|Function)} opacity - opacity
* @throws {TypeError} must be a number or a function
* @throws {RangeError} must be a number on the interval `[0,1]`
*/
function set( opacity ) {
	/*jshint validthis: true */ // TODO: eslint
	var isNum = isNumber( opacity );
	if (
		!isNum &&
		!isFunction( opacity )
	) {
		throw new TypeError( 'invalid value. `opacity` must be a number or a function. Value: `' + opacity + '.`' );
	}
	if (
		isNum &&
		(opacity < 0.0 || opacity > 1.0)
	) {
		throw new RangeError( 'invalid value. `opacity` must be a number on the interval `[0,1]`. Value: `' + opacity + '`.' );
	}
	debug( 'Current value: %d.', this._opacity );

	this._opacity = opacity;
	debug( 'New Value: %d.', this._opacity );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-function":21,"@stdlib/assert/is-number":41,"debug":549}],315:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;


// MAIN //

/**
* Returns a function to get a symbol's size.
*
* @private
* @returns {Function} size accessor
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	var self = this;
	if ( isNumber( this._size ) ) {
		return size;
	}
	return this._size;

	function size() {
		return self._size;
	}
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{"@stdlib/assert/is-number":41}],316:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'symbols:set:size' );
var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
var isFunction = require( '@stdlib/assert/is-function' );


// MAIN //

/**
* Sets the symbol size.
*
* @private
* @param {(NonNegativeInteger|Function)} size - size
* @throws {TypeError} must be a nonnegative integer or a function
*/
function set( size ) {
	/*jshint validthis: true */ // TODO: eslint
	if (
		!isNonNegativeInteger( size ) &&
		!isFunction( size )
	) {
		throw new TypeError( 'invalid value. `size` must be a nonnegative integer or a function. Value: `' + size + '.`' );
	}
	debug( 'Current value: %d.', this._size );

	this._size = size;
	debug( 'New Value: %d.', this._size );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-function":21,"@stdlib/assert/is-nonnegative-integer":34,"debug":549}],317:[function(require,module,exports){
'use strict';

/**
* Returns the symbol.
*
* @private
* @returns {string} symbol
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._symbol;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],318:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'symbols:set:symbol' );
var indexOf = require( '@stdlib/utils/index-of' );
var SYMBOLS = require( './symbols.json' );


// MAIN //

/**
* Sets the symbol.
*
* @private
* @param {string} symbol - symbol
* @throws {TypeError} must be a supported symbol
*/
function set( symbol ) {
	/*jshint validthis: true */ // TODO: eslint
	if ( indexOf( SYMBOLS, symbol ) === -1 ) {
		throw new TypeError( 'invalid value. `symbol` must be a supported symbol. Symbols: ['+SYMBOLS.join(',')+']. Value: `'+symbol+'`.' );
	}
	debug( 'Current value: %d.', this._symbol );

	this._symbol = symbol;
	debug( 'New Value: %d.', this._symbol );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"./symbols.json":319,"@stdlib/utils/index-of":503,"debug":549}],319:[function(require,module,exports){
module.exports=[
	"closed-circle",
	"open-circle"
]

},{}],320:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'symbols:xpos' );


// MAIN //

/**
* Returns a function to map values to x coordinate values.
*
* @private
* @returns {Function} map function
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	var scale = this.xScale;
	/**
	* Maps a value to a x coordinate value.
	*
	* @private
	* @param {*} d - datum
	* @returns {number} pixel value
	*/
	return function xPos( d ) {
		var px = scale( d );
		debug( 'Value: %d => Pixel: %d.', d, px );
		return px;
	}; // end FUNCTION xPos()
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{"debug":549}],321:[function(require,module,exports){
arguments[4][261][0].apply(exports,arguments)
},{"dup":261}],322:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'symbols:set:xscale' );
var isFunction = require( '@stdlib/assert/is-function' );


// MAIN //

/**
* Sets the x-scale function.
*
* @private
* @param {Function} fcn - scale
* @throws {TypeError} must be a function
*/
function set( fcn ) {
	/*jshint validthis: true */ // TODO: eslint
	if ( !isFunction( fcn ) ) {
		throw new TypeError( 'invalid value. `xScale` must be a function. Value: `' + fcn + '.`' );
	}
	debug( 'Current value: %s.', this._xScale );

	this._xScale = fcn;
	debug( 'New Value: %s.', this._xScale );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-function":21,"debug":549}],323:[function(require,module,exports){
arguments[4][263][0].apply(exports,arguments)
},{"dup":263}],324:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'symbols:set:x' );
var isArrayLike = require( '@stdlib/assert/is-array-like' );


// MAIN //

/**
* Sets the `x` values.
*
* @private
* @param {ArrayLike} x - x values
* @throws {TypeError} must be array-like
*/
function set( x ) {
	/*jshint validthis: true */ // TODO: eslint
	if ( !isArrayLike( x ) ) {
		throw new TypeError( 'invalid value. `x` must be array-like. Value: `' + x + '.`' );
	}
	debug( 'Current value: %s.', JSON.stringify( this._xData ) );

	this._xData = x;
	debug( 'New Value: %s.', JSON.stringify( this._xData ) );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-array-like":5,"debug":549}],325:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'symbols:ypos' );


// MAIN //

/**
* Returns a function to map values to y coordinate values.
*
* @private
* @returns {Function} map function
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	var scale = this.yScale;
	/**
	* Maps a value to a y coordinate value.
	*
	* @private
	* @param {*} d - datum
	* @returns {number} pixel value
	*/
	return function yPos( d ) {
		var px = scale( d );
		debug( 'Value: %d => Pixel: %d.', d, px );
		return px;
	}; // end FUNCTION yPos()
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{"debug":549}],326:[function(require,module,exports){
arguments[4][266][0].apply(exports,arguments)
},{"dup":266}],327:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'symbols:set:yscale' );
var isFunction = require( '@stdlib/assert/is-function' );


// MAIN //

/**
* Sets the y-scale function.
*
* @private
* @param {Function} fcn - scale
* @throws {TypeError} must be a function
*/
function set( fcn ) {
	/*jshint validthis: true */ // TODO: eslint
	if ( !isFunction( fcn ) ) {
		throw new TypeError( 'invalid value. `yScale` must be a function. Value: `' + fcn + '.`' );
	}
	debug( 'Current value: %s.', this._yScale );

	this._yScale = fcn;
	debug( 'New Value: %s.', this._yScale );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-function":21,"debug":549}],328:[function(require,module,exports){
arguments[4][268][0].apply(exports,arguments)
},{"dup":268}],329:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'symbols:set:y' );
var isArrayLike = require( '@stdlib/assert/is-array-like' );


// MAIN //

/**
* Sets the `y` values.
*
* @private
* @param {ArrayLike} y - y values
* @throws {TypeError} must be array-like
*/
function set( y ) {
	/*jshint validthis: true */ // TODO: eslint
	if ( !isArrayLike( y ) ) {
		throw new TypeError( 'invalid value. `y` must be array-like. Value: `' + y + '.`' );
	}
	debug( 'Current value: %s.', JSON.stringify( this._yData ) );

	this._yData = y;
	debug( 'New Value: %s.', JSON.stringify( this._yData ) );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-array-like":5,"debug":549}],330:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'symbols:render:closed-circles' );
var h = require( 'virtual-dom/h' );


// VARIABLES //

var ELEMENT = 'circle';


// MAIN //

/**
* Renders data as a closed circles.
*
* @private
* @param {Object} state - state
* @returns {Array<VTree>} array of virtual trees
*/
function render( state ) {
	var isDefined;
	var opacity;
	var label;
	var color;
	var props;
	var size;
	var xPos;
	var yPos;
	var out;
	var xi;
	var yi;
	var x;
	var y;
	var i;

	debug( 'Rendering closed circles...' );

	isDefined = state.isDefined;
	opacity = state.opacity;
	label = state.label;
	color = state.color;
	size = state.size;
	xPos = state.xPos;
	yPos = state.yPos;
	x = state.x;
	y = state.y;

	out = new Array( x.length );
	for ( i = 0; i < x.length; i++ ) {
		xi = x[ i ];
		yi = y[ i ];
		if ( !isDefined( xi ) || !isDefined( yi ) ) {
			debug( 'Datum %d is undefined. [%s,%s].', i, xi, yi );
			continue;
		}
		debug( 'Rendering datum %d...', i );
		props = {
			'namespace': 'http://www.w3.org/2000/svg',
			'property': 'closed-circle',
			'className': 'closed-circle',
			'attributes': {
				'cx': xPos( xi ),
				'cy': yPos( yi ),
				'r': size( xi, yi, i ) / 2,
				'stroke': 'none',
				'opacity': opacity( xi, yi, i ),
				'fill': color( xi, yi, i ),
				'data-label': label( xi, yi, i )
			}
		};
		debug( 'Generating a virtual DOM tree (%s) with properties: %s.', ELEMENT, JSON.stringify( props ) );
		out[ i ] = h( ELEMENT, props, [] );
	}
	return out;
} // end FUNCTION render()


// EXPORTS //

module.exports = render;

},{"debug":549,"virtual-dom/h":614}],331:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'symbols:render' );
var h = require( 'virtual-dom/h' );
var closedCircles = require( './closed_circles.js' );
var openCircles = require( './open_circles.js' );


// VARIABLES //

var ELEMENT = 'g';
var RENDER = {
	'closed-circle': closedCircles,
	'open-circle': openCircles
};


// MAIN //

/**
* Renders a virtual DOM tree.
*
* @private
* @returns {VTree} virtual DOM tree
*/
function render() {
	/* jshint validthis: true */ // TODO: eslint
	var children;
	var props;
	var vtree;
	var f;

	debug( 'Rendering...' );

	props = {
		'namespace': 'http://www.w3.org/2000/svg',
		'property': 'symbols',
		'className': 'symbols'
	};
	debug( 'Symbol: %s.', this.symbol );

	f = RENDER[ this.symbol ];
	children = f( this );

	debug( 'Generating a virtual DOM tree (%s) with properties: %s.', ELEMENT, JSON.stringify( props ) );
	vtree = h( ELEMENT, props, children );

	// Announce that a new tree has been rendered:
	this.emit( '_render', vtree );

	return vtree;
} // end FUNCTION render()


// EXPORTS //

module.exports = render;

},{"./closed_circles.js":330,"./open_circles.js":332,"debug":549,"virtual-dom/h":614}],332:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'symbols:render:open-circles' );
var h = require( 'virtual-dom/h' );


// VARIABLES //

var ELEMENT = 'circle';


// MAIN //

/**
* Renders data as a open circles.
*
* @private
* @param {Object} state - state
* @returns {Array<VTree>} array of virtual trees
*/
function render( state ) {
	var isDefined;
	var opacity;
	var label;
	var color;
	var props;
	var size;
	var xPos;
	var yPos;
	var out;
	var xi;
	var yi;
	var x;
	var y;
	var i;

	debug( 'Rendering open circles...' );

	isDefined = state.isDefined;
	opacity = state.opacity;
	label = state.label;
	color = state.color;
	size = state.size;
	xPos = state.xPos;
	yPos = state.yPos;
	x = state.x;
	y = state.y;

	out = new Array( x.length );
	for ( i = 0; i < x.length; i++ ) {
		xi = x[ i ];
		yi = y[ i ];
		if ( !isDefined( xi ) || !isDefined( yi ) ) {
			debug( 'Datum %d is undefined. [%s,%s].', i, xi, yi );
			continue;
		}
		debug( 'Rendering datum %d...', i );
		props = {
			'namespace': 'http://www.w3.org/2000/svg',
			'property': 'open-circle',
			'className': 'open-circle',
			'attributes': {
				'cx': xPos( xi ),
				'cy': yPos( yi ),
				'r': size( xi, yi, i ) / 2,
				'fill': 'none',
				'opacity': opacity( xi, yi, i ),
				'stroke': color( xi, yi, i ),
				'stroke-width': 1, // TODO: make property? I certainly don't see a good reason or use case why this should be a function.
				'data-label': label( xi, yi, i )
			}
		};
		debug( 'Generating a virtual DOM tree (%s) with properties: %s.', ELEMENT, JSON.stringify( props ) );
		out[ i ] = h( ELEMENT, props, [] );
	}
	return out;
} // end FUNCTION render()


// EXPORTS //

module.exports = render;

},{"debug":549,"virtual-dom/h":614}],333:[function(require,module,exports){
'use strict';

// TODO: improve JSDoc examples

// MODULES //

var debug = require( 'debug' )( 'symbols:main' );
var EventEmitter = require( 'events' ).EventEmitter;
var getKeys = require( 'object-keys' ).shim();
var linear = require( 'd3-scale' ).scaleLinear; // TODO: remove
var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var copy = require( '@stdlib/utils/copy' );
var merge = require( '@stdlib/utils/merge' );
var isObject = require( '@stdlib/assert/is-plain-object' );
var isDefined = require( './accessors/is_defined.js' );
var defaults = require( './defaults.json' );


// VARIABLES //

var PRIVATE_PROPS = [
	'_autoRender',
	'_color',
	'_isDefined',
	'_label',
	'_opacity',
	'_size',
	'_symbol',
	'_xData',
	'_xScale',
	'_yData',
	'_yScale'
];


// MAIN //

/**
* Symbols constructor.
*
* @constructor
* @param {Options} options - constructor options
* @param {ArrayLike} [options.x=[]] - x-values
* @param {ArrayLike} [options.y=[]] - y-values
* @param {Function} [options.xScale] - x scale function
* @param {Function} [options.yScale] - y scale function
* @param {Function} [options.isDefined] - accessor indicating whether a datum is defined
* @param {string} [options.symbol='closed-circle'] - symbol
* @param {(number|Function)} [options.opacity=0.9] - opacity
* @param {(string|Function)} [options.color] - color
* @param {(string|Function)} [options.label] - label
* @param {(NonNegativeInteger|Function)} [options.size=6] - symbol size
* @param {boolean} [options.autoRender=true] - indicates whether to re-render on a change event
* @throws {TypeError} must provide valid options
* @returns {Symbols} Symbols instance
*
* @example
* var symbols = new Symbols({
*     'x': [0.1,0.2,0.3],
*     'y': [0.4,0.5,0.6]
* });
*/
function Symbols( options ) {
	var self;
	var keys;
	var opts;
	var key;
	var i;
	if ( !( this instanceof Symbols ) ) {
		if ( arguments.length ) {
			return new Symbols( options );
		}
		return new Symbols();
	}
	self = this;

	opts = copy( defaults );
	opts.isDefined = isDefined;
	opts.xScale = linear();
	opts.yScale = linear();

	if ( arguments.length ) {
		if ( !isObject( options ) ) {
			throw new TypeError( 'invalid input argument. `options` argument must be an object. Value: `' + options + '`.' );
		}
		opts = merge( opts, options );
	}
	debug( 'Creating an instance with the following configuration: %s.', JSON.stringify( opts ) );
	EventEmitter.call( this );

	for ( i = 0; i < PRIVATE_PROPS.length; i++ ) {
		Object.defineProperty( this, PRIVATE_PROPS[i], {
			'configurable': false,
			'enumerable': false,
			'writable': true,
			'value': null
		});
	}
	// Set options...
	keys = getKeys( opts );
	for ( i = 0; i < keys.length; i++ ) {
		key = keys[ i ];
		this[ key ] = opts[ key ];
	}

	this.on( 'change', onChange );
	this.on( '_render', onRender );

	return this;

	/**
	* Callback invoked upon receiving a change event.
	*
	* @private
	*/
	function onChange() {
		debug( 'Received a change event.' );
		if ( self._autoRender ) {
			self.render();
		}
	}

	/**
	* Re-emits a render event.
	*
	* @private
	*/
	function onRender() {
		var args;
		var i;
		debug( 'Received a render event. Re-emitting...' );
		args = new Array( arguments.length+1 );
		args[ 0 ] = 'render';
		for ( i = 0; i < arguments.length; i++ ) {
			args[ i+1 ] = arguments[ i ];
		}
		self.emit.apply( self, args );
	}
} // end FUNCTION Symbols()

/*
* Create a prototype which inherits from the parent prototype.
*/
Symbols.prototype = Object.create( EventEmitter.prototype );

/*
* Set the constructor.
*/
Symbols.prototype.constructor = Symbols;

/**
* Symbol.
*
* @memberof Symbols.prototype
* @name symbol
* @type {string}
* @default 'closed-circle'
* @throws {TypeError} must be a supported symbol
*
* @example
* var symbols = new Symbols({
*     'symbol': 'open-circle'
* });
*
* var symbol = symbols.symbol;
* // returns 'open-circle'
*/
Object.defineProperty( Symbols.prototype, 'symbol', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/symbol/set.js' ),
	'get': require( './props/symbol/get.js' )
});

/**
* `x` values.
*
* @memberof Symbols.prototype
* @name x
* @type {ArrayLike}
* @default []
* @throws {TypeError} must be array-like
*
* @example
* var symbols = new Symbols({
*     'x': [0.1,0.2,0.3]
* });
*
* var x = symbols.x;
* // returns [0.1,0.2,0.3]
*/
Object.defineProperty( Symbols.prototype, 'x', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/x/set.js' ),
	'get': require( './props/x/get.js' )
});

/**
* `y` values.
*
* @memberof Symbols.prototype
* @name y
* @type {ArrayLike}
* @default []
* @throws {TypeError} must be array-like
*
* @example
* var symbols = new Symbols({
*     'y': [0.4,0.5,0.6]
* });
*
* var y = symbols.y;
* // returns [0.4,0.5,0.6]
*/
Object.defineProperty( Symbols.prototype, 'y', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/y/set.js' ),
	'get': require( './props/y/get.js' )
});

/**
* `x` scale function.
*
* @memberof Symbols.prototype
* @name xScale
* @type {Function}
* @throws {TypeError} must be a function
*
* @example
* var symbols = new Symbols({
*     'xScale': function scale(){}
* });
*
* var f = symbols.xScale;
* // returns <Function>
*/
Object.defineProperty( Symbols.prototype, 'xScale', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/x-scale/set.js' ),
	'get': require( './props/x-scale/get.js' )
});

/**
* `y` scale function.
*
* @memberof Symbols.prototype
* @name yScale
* @type {Function}
* @throws {TypeError} must be a function
*
* @example
* var symbols = new Symbols({
*     'yScale': function scale(){}
* });
*
* var f = symbols.yScale;
* // returns <Function>
*/
Object.defineProperty( Symbols.prototype, 'yScale', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/y-scale/set.js' ),
	'get': require( './props/y-scale/get.js' )
});

/**
* Accessor which defines whether a datum is defined. This accessor is used to define how missing values are encoded. The default behavior is to ignore values which are `NaN`.
*
* @memberof Symbols.prototype
* @name isDefined
* @type {Function}
* @throws {TypeError} must be a function
*
* @example
* var Symbols = new Symbols();
* symbols.isDefined = function isDefined( d ) {
*     // Check for `NaN`:
*     return ( d === d );
* }
*
* @example
* function isDefined( d ) {
*     // Check for `NaN`:
*     return ( d === d );
* }
* var symbols = new Symbols({
*     'isDefined': isDefined
* });
* var fcn = symbols.isDefined;
* // returns <Function>
*/
Object.defineProperty( Symbols.prototype, 'isDefined', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/is-defined/set.js' ),
	'get': require( './props/is-defined/get.js' )
});

/**
* Symbol size. When retrieved, the returned value is a size accessor.
*
* @memberof Symbols.prototype
* @name size
* @type {(NonNegativeInteger|Function)}
* @default 6
* @throws {TypeError} must be a nonnegative integer or function
*
* @example
* var symbols = new Symbols({
*     'size': 5
* });
*
* var size = symbols.size;
* // returns <Function>
*/
Object.defineProperty( Symbols.prototype, 'size', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/size/set.js' ),
	'get': require( './props/size/get.js' )
});

/**
* Symbol opacity. When retrieved, the returned value is an opacity accessor.
*
* @memberof Symbols.prototype
* @name opacity
* @type {(number|Function)}
* @default 0.9
* @throws {TypeError} must be a number or function
* @throws {RangeError} must be a number on the interval `[0,1]`
*
* @example
* var symbols = new Symbols({
*     'opacity': 0.5
* });
*
* var opacity = symbols.opacity;
* // returns <Function>
*/
Object.defineProperty( Symbols.prototype, 'opacity', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/opacity/set.js' ),
	'get': require( './props/opacity/get.js' )
});

/**
* Symbols color. When retrieved, the returned value is a color accessor.
*
* @memberof Symbols.prototype
* @name color
* @type {(string|Function)}
* @throws {TypeError} must be a primitive string or function
*
* @example
* var symbols = new Symbols({
*     'color': 'steelblue'
* });
*
* var color = symbols.color;
* // returns <Function>
*/
Object.defineProperty( Symbols.prototype, 'color', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/color/set.js' ),
	'get': require( './props/color/get.js' )
});

/**
* Symbols label. When retrieved, the returned value is a label accessor.
*
* @memberof Symbols.prototype
* @name label
* @type {(string|Function)}
* @throws {TypeError} must be a primitive string or function
*
* @example
* var symbols = new Symbols({
*     'label': 'group-1'
* });
*
* var label = symbols.label;
* // returns <Function>
*/
Object.defineProperty( Symbols.prototype, 'label', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/label/set.js' ),
	'get': require( './props/label/get.js' )
});

/**
* Rendering mode. If `true`, an instance re-renders on each change event.
*
* @memberof Symbols.prototype
* @name autoRender
* @type {boolean}
* @default true
* @throws {TypeError} must be a boolean primitive
*
* @example
* var symbols = new Symbols({
*     'autoRender': true
* });
*
* var mode = symbols.autoRender;
* // returns true
*/
Object.defineProperty( Symbols.prototype, 'autoRender', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/auto-render/set.js' ),
	'get': require( './props/auto-render/get.js' )
});

/**
* Function to map values to x coordinate values.
*
* @memberof Symbols.prototype
* @type {Function}
* @name xPos
*
* @example
* var symbols = new Symbols();
* var xPos = symbols.xPos;
* // returns <Function>
*/
Object.defineProperty( Symbols.prototype, 'xPos', {
	'configurable': false,
	'enumerable': true,
	'get': require( './props/x-pos/get.js' )
});

/**
* Function to map values to y coordinate values.
*
* @memberof Symbols.prototype
* @type {Function}
* @name yPos
*
* @example
* var symbols = new Symbols();
* var yPos = symbols.yPos;
* // returns <Function>
*/
Object.defineProperty( Symbols.prototype, 'yPos', {
	'configurable': false,
	'enumerable': true,
	'get': require( './props/y-pos/get.js' )
});

/**
* Renders a virtual DOM tree.
*
* @memberof Symbols.prototype
* @name render
* @type {Function}
* @returns {VTree} virtual tree
*
* @example
* var symbols = new Symbols();
*
* var out = symbols.render();
*/
setReadOnly( Symbols.prototype, 'render', require( './render' ) );


// EXPORTS //

module.exports = Symbols;

},{"./accessors/is_defined.js":302,"./defaults.json":303,"./props/auto-render/get.js":305,"./props/auto-render/set.js":306,"./props/color/get.js":307,"./props/color/set.js":308,"./props/is-defined/get.js":309,"./props/is-defined/set.js":310,"./props/label/get.js":311,"./props/label/set.js":312,"./props/opacity/get.js":313,"./props/opacity/set.js":314,"./props/size/get.js":315,"./props/size/set.js":316,"./props/symbol/get.js":317,"./props/symbol/set.js":318,"./props/x-pos/get.js":320,"./props/x-scale/get.js":321,"./props/x-scale/set.js":322,"./props/x/get.js":323,"./props/x/set.js":324,"./props/y-pos/get.js":325,"./props/y-scale/get.js":326,"./props/y-scale/set.js":327,"./props/y/get.js":328,"./props/y/set.js":329,"./render":331,"@stdlib/assert/is-plain-object":50,"@stdlib/utils/copy":487,"@stdlib/utils/define-read-only-property":490,"@stdlib/utils/merge":514,"d3-scale":545,"debug":549,"events":564,"object-keys":577}],334:[function(require,module,exports){
module.exports={
	"text": "",
	"autoRender": true
}

},{}],335:[function(require,module,exports){
module.exports={
	"text": "change",
	"autoRender": "change"
}

},{}],336:[function(require,module,exports){
arguments[4][99][0].apply(exports,arguments)
},{"./events.json":335,"dup":99}],337:[function(require,module,exports){
'use strict';

/**
* Title.
*
* @module @stdlib/plot/components/svg/title
*
* @example
* var Title = require( '@stdlib/plot/components/svg/title' );
*
* var title = new Title({
*     'text': 'Beep'
* });
*/

// MODULES //

var Title = require( './title.js' );


// EXPORTS //

module.exports = Title;

},{"./title.js":343}],338:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'title:render' );
var h = require( 'virtual-dom/h' );


// VARIABLES //

var ELEMENT = 'text';


// MAIN //

/**
* Renders a virtual DOM tree.
*
* @private
* @returns {VTree} virtual DOM tree
*/
function render() {
	/* jshint validthis: true */ // TODO: eslint
	var props;
	var vtree;
	var text;

	debug( 'Rendering...' );

	props = {
		'namespace': 'http://www.w3.org/2000/svg',
		'property': 'title',
		'className': 'title noselect',
		'attributes': {
			'x': 0,
			'y': 0,
			'text-anchor': 'middle'
		}
	};

	text = this.text;
	debug( 'Title: %s.', text );

	debug( 'Generating a virtual DOM tree (%s) with properties: %s.', ELEMENT, JSON.stringify( props ) );
	vtree = h( ELEMENT, props, text );

	// Announce that a new tree has been rendered:
	this.emit( '_render', vtree );

	return vtree;
} // end FUNCTION render()


// EXPORTS //

module.exports = render;

},{"debug":549,"virtual-dom/h":614}],339:[function(require,module,exports){
arguments[4][102][0].apply(exports,arguments)
},{"dup":102}],340:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'title:set:auto-render' );
var events = require( './../../events' );
var isValid = require( './../../validators/auto_render.js' );


// VARIABLES //

var CHANGE_EVENT = events( 'autoRender' );


// MAIN //

/**
* Sets the rendering mode.
*
* @private
* @param {boolean} bool - boolean indicating whether to re-render on a change event
* @throws {TypeError} must be a positive number
*/
function set( bool ) {
	/*jshint validthis: true */ // TODO: eslint
	var err = isValid( bool );
	if ( err ) {
		throw err;
	}
	debug( 'Current value: %d.', this._autoRender );

	this._autoRender = bool;
	debug( 'New Value: %d.', this._autoRender );

	this.emit( CHANGE_EVENT );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"./../../events":336,"./../../validators/auto_render.js":345,"debug":549}],341:[function(require,module,exports){
'use strict';

/**
* Returns the title text.
*
* @private
* @returns {string} text
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._text;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],342:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'title:set:text' );
var events = require( './../../events' );
var isValid = require( './../../validators/text.js' );


// VARIABLES //

var CHANGE_EVENT = events( 'text' );


// MAIN //

/**
* Sets the title text.
*
* @private
* @param {string} text - text
* @throws {TypeError} must be a string primitive
*/
function set( text ) {
	/*jshint validthis: true */ // TODO: eslint
	var err = isValid( text );
	if ( err ) {
		throw err;
	}
	debug( 'Current value: %d.', this._text );

	this._text = text;
	debug( 'New Value: %d.', this._text );

	this.emit( CHANGE_EVENT );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"./../../events":336,"./../../validators/text.js":347,"debug":549}],343:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'title:main' );
var EventEmitter = require( 'events' ).EventEmitter;
var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var copy = require( '@stdlib/utils/copy' );
var defaults = require( './defaults.json' );
var validate = require( './validate.js' );


// MAIN //

/**
* Title constructor.
*
* @constructor
* @param {Options} options - constructor options
* @param {string} [options.text] - title text
* @param {boolean} [options.autoRender=true] - indicates whether to re-render on a change event
* @throws {TypeError} must provide valid options
* @returns {Title} title instance
*
* @example
* var title = new Title({
*     'text':'Beep'
* });
*/
function Title( options ) {
	var self;
	var opts;
	var err;
	if ( !( this instanceof Title ) ) {
		return new Title( options );
	}
	self = this;
	opts = copy( defaults );
	err = validate( opts, options );
	if ( err ) {
		throw err;
	}
	debug( 'Creating an instance with the following configuration: %s.', JSON.stringify( opts ) );
	EventEmitter.call( this );

	Object.defineProperty( this, '_text', {
		'configurable': false,
		'enumerable': false,
		'writable': true,
		'value': opts.text
	});
	Object.defineProperty( this, '_autoRender', {
		'configurable': false,
		'enumerable': false,
		'writable': true,
		'value': opts.autoRender
	});

	this.on( 'change', onChange );
	this.on( '_render', onRender );

	return this;

	/**
	* Callback invoked upon receiving a change event.
	*
	* @private
	*/
	function onChange() {
		debug( 'Received a change event.' );
		if ( self._autoRender ) {
			self.render();
		}
	}

	/**
	* Re-emits a render event.
	*
	* @private
	*/
	function onRender() {
		var args;
		var i;
		debug( 'Received a render event. Re-emitting...' );
		args = new Array( arguments.length+1 );
		args[ 0 ] = 'render';
		for ( i = 0; i < arguments.length; i++ ) {
			args[ i+1 ] = arguments[ i ];
		}
		self.emit.apply( self, args );
	}
} // end FUNCTION Title()

/*
* Create a prototype which inherits from the parent prototype.
*/
Title.prototype = Object.create( EventEmitter.prototype );

/*
* Set the constructor.
*/
Title.prototype.constructor = Title;

/**
* Title text.
*
* @memberof Title.prototype
* @name text
* @type {string}
* @throws {TypeError} must be a primitive string
*
* @example
* var title = new Title({
*     'text': 'Beep'
* });
*
* var text = title.text;
* // returns 'Beep'
*/
Object.defineProperty( Title.prototype, 'text', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/text/set.js' ),
	'get': require( './props/text/get.js' )
});

/**
* Rendering mode. If `true`, an instance re-renders on each change event.
*
* @memberof Title.prototype
* @name autoRender
* @type {boolean}
* @default true
* @throws {TypeError} must be a boolean primitive
*
* @example
* var title = new Title({
*     'autoRender': true
* });
*
* var mode = title.autoRender;
* // returns true
*/
Object.defineProperty( Title.prototype, 'autoRender', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/auto-render/set.js' ),
	'get': require( './props/auto-render/get.js' )
});

/**
* Renders a virtual DOM tree.
*
* @memberof Title.prototype
* @name render
* @type {Function}
* @returns {VTree} virtual tree
*
* @example
* var title = new Title();
*
* var out = title.render();
*/
setReadOnly( Title.prototype, 'render', require( './methods/render.js' ) );


// EXPORTS //

module.exports = Title;

},{"./defaults.json":334,"./methods/render.js":338,"./props/auto-render/get.js":339,"./props/auto-render/set.js":340,"./props/text/get.js":341,"./props/text/set.js":342,"./validate.js":344,"@stdlib/utils/copy":487,"@stdlib/utils/define-read-only-property":490,"debug":549,"events":564}],344:[function(require,module,exports){
'use strict';

// MODULES //

var getKeys = require( 'object-keys' ).shim();
var isObject = require( '@stdlib/assert/is-plain-object' );
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var validators = require( './validators' );


// VARIABLES //

var KEYS = getKeys( validators );


// MAIN //

/**
* Validates function options.
*
* @private
* @param {Object} opts - destination object
* @param {Options} options - function options
* @param {string} [options.text] - title text
* @param {boolean} [options.autoRender] - indicates whether to re-render on a change event
* @returns {(Error|null)} error or null
*
* @example
* var opts = {};
* var options = {
*     'text': 'Beep'
* };
* var err = validate( opts, options );
* if ( err ) {
*     throw err;
* }
*/
function validate( opts, options ) {
	var err;
	var key;
	var val;
	var i;
	if ( !isObject( options ) ) {
		return new TypeError( 'invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	for ( i = 0; i < KEYS.length; i++ ) {
		key = KEYS[ i ];
		if ( hasOwnProp( options, key ) ) {
			val = options[ key ];
			err = validators[ key ]( val );
			if ( err ) {
				return err;
			}
			opts[ key ] = val;
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;

},{"./validators":346,"@stdlib/assert/has-own-property":2,"@stdlib/assert/is-plain-object":50,"object-keys":577}],345:[function(require,module,exports){
arguments[4][139][0].apply(exports,arguments)
},{"@stdlib/assert/is-boolean":10,"dup":139}],346:[function(require,module,exports){
'use strict';

var validators = {
	'text': require( './text.js' ),
	'autoRender': require( './auto_render.js' )
};


// EXPORTS //

module.exports = validators;

},{"./auto_render.js":345,"./text.js":347}],347:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;


/**
* Validates `text`.
*
* @private
* @param {*} v - value to test
* @returns {(Error|null)} error object or null
*/
function test( v ) {
	if ( !isString( v ) ) {
		return new TypeError( 'invalid value. `text` must be a string primitive. Value: `' + v + '.`' );
	}
	return null;
} // end FUNCTION test()


// EXPORTS //

module.exports = test;

},{"@stdlib/assert/is-string":62}],348:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:accessor:is-defined' );
var isnan = require( '@stdlib/assert/is-nan' ).isPrimitive;


// MAIN //

/**
* Accessor function which determines whether a datum is defined.
*
* @private
* @param {number} d - datum
* @returns {boolean} boolean indicating whether a datum is defined
*/
function isDefined( d ) {
	var bool = !isnan( d );
	debug( 'Datum: %s. Defined: %s.', JSON.stringify( d ), bool );
	return bool;
} // end FUNCTION isDefined()


// EXPORTS //

module.exports = isDefined;

},{"@stdlib/assert/is-nan":29,"debug":549}],349:[function(require,module,exports){
'use strict';

// MODULES //

var isNodeREPL = require( '@stdlib/assert/is-node-repl' );
var isDefined = require( './accessors/is_defined.js' );


// MAIN //

/**
* Returns default options.
*
* @private
* @returns {Object} default options
*/
function defaults() {
	var isREPL;
	var o;

	isREPL = isNodeREPL();
	o = {};

	// Boolean indicating whether to re-render on a change event:
	if ( isREPL ) {
		o.autoRender = false;
	} else {
		o.autoRender = true;
	}
	// Boolean indicating whether to generate an updated view on a render event:
	if ( isREPL ) {
		o.autoView = false;
	} else {
		o.autoView = false;
	}
	// Data colors:
	o.colors = 'category10';

	// Plot description:
	o.description = '';

	// Plot engine:
	o.engine = 'svg';

	// Plot height:
	o.height = 400; // px

	// Accessor indicating whether a datum is defined:
	o.isDefined = isDefined;

	// Data labels:
	o.labels = [];

	// Data line opacity:
	o.lineOpacity = 0.9; // [0,1]

	// Data line style(s):
	o.lineStyle = '-';

	// Data line width(s):
	o.lineWidth = 2; // px

	// FIXME: padding props depend on orientation (may require using `null` to flag)
	// Bottom padding:
	o.paddingBottom = 80; // px

	// Left padding:
	o.paddingLeft = 90; // px

	// Right padding:
	o.paddingRight = 20; // px

	// Top padding:
	o.paddingTop = 80; // px

	// Data symbols:
	o.symbols = 'none';

	// Symbols opacity:
	o.symbolsOpacity = 0.9; // [0,1]

	// Symbols size:
	o.symbolsSize = 6; // px

	// Plot title:
	o.title = '';

	// Plot viewer:
	if ( isREPL ) {
		o.viewer = 'window';
	} else {
		o.viewer = 'none';
	}
	// Plot width:
	o.width = 400; // px

	// x-values:
	o.x = [];

	// x-axis orientation:
	o.xAxisOrient = 'bottom';

	// x-axis label:
	o.xLabel = 'x';

	// Maximum value of x-axis domain:
	o.xMax = null;

	// Minimum value of x-axis domain:
	o.xMin = null;

	// Number of x-axis tick marks:
	o.xNumTicks = 5;

	// Boolean indicating whether to render a rug plot along the x-axis:
	o.xRug = false;

	// x-axis rug orientation:
	o.xRugOrient = 'bottom';

	// x-axis rug opacity:
	o.xRugOpacity = 0.1; // [0,1]

	// x-axis rug tick (tassel) size:
	o.xRugSize = 6; // px

	// x-axis scale:
	o.xScale = 'linear';

	// x-axis tick format:
	o.xTickFormat = null;

	// y-values:
	o.y = [];

	// y-axis orientation:
	o.yAxisOrient = 'left';

	// y-axis label:
	o.yLabel = 'y';

	// Maximum value of y-axis domain:
	o.yMax = null;

	// Minimum value of y-axis domain:
	o.yMin = null;

	// Number of y-axis tick marks:
	o.yNumTicks = 5;

	// Boolean indicating whether to render a rug plot along the y-axis:
	o.yRug = false;

	// y-axis rug orientation:
	o.yRugOrient = 'left';

	// y-axis rug opacity:
	o.yRugOpacity = 0.1; // [0,1]

	// y-axis rug tick (tassel) size:
	o.yRugSize = 6; // px

	// y-axis scale:
	o.yScale = 'linear';

	// y-axis tick format:
	o.yTickFormat = null;

	return o;
} // end FUNCTION defaults()


// EXPORTS //

module.exports = defaults;

},{"./accessors/is_defined.js":348,"@stdlib/assert/is-node-repl":32}],350:[function(require,module,exports){
'use strict';

// MODULES //

var isObject = require( '@stdlib/assert/is-plain-object' );
var copy = require( '@stdlib/utils/copy' );
var Plot = require( './plot.js' );


// MAIN //

/**
* Returns a reusable function for generating plots.
*
* @param {Options} [options] - factory options
* TODO
* @throws {TypeError} must provide an object
* @returns {Function} plot function
*
* @example
* var opts = {
*     'width': 600,
*     'height': 400
* };
* var plot = factory( opts );
* var h1 = plot( [[1,2,3]], [[1,0,1]] );
* var h2 = plot( [[4,5,6]], [[0,1,0]] );
*/
function factory( options ) {
	var opts;
	if ( arguments.length ) {
		if ( !isObject( options ) ) {
			throw new TypeError( 'invalid input argument. `options` argument must be a plain object. Value: `' + options + '`' );
		}
		opts = copy( options );
	} else {
		opts = {};
	}
	/**
	* Creates a plot.
	*
	* @private
	* @param {Array} [x] - x-values
	* @param {Array} [y] - y-values
	* @throws {TypeError} must provide valid options
	* @returns {Plot} plot instance
	*/
	return function plot( x, y ) {
		if ( arguments.length === 2 ) {
			return new Plot( x, y, opts );
		}
		return new Plot( opts );
	}; // end FUNCTION plot()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./plot.js":352,"@stdlib/assert/is-plain-object":50,"@stdlib/utils/copy":487}],351:[function(require,module,exports){
'use strict';

/**
* Create a 2-dimensional plot.
*
* @module @stdlib/plot/ctor
*
* @example
* var Plot = require( '@stdlib/plot/ctor' );
*
* var x = [ 1, 2, 3 ];
* var y = [ 1, 0, 1 ];
*
* var p = new Plot( [ x ], [ y ] );
*
* @example
* var Plot = require( '@stdlib/plot/ctor' );
*
* var opts = {
*     'width': 600,
*     'height': 400
* };
* var myPlot = Plot.factory( opts );
*
* var h1 = myPlot( [[1,2,3]], [[1,0,1]] );
* var h2 = myPlot( [[4,5,6]], [[0,1,0]] );
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var Plot = require( './plot.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( Plot, 'factory', factory );


// EXPORTS //

module.exports = Plot;

},{"./factory.js":350,"./plot.js":352,"@stdlib/utils/define-read-only-property":490}],352:[function(require,module,exports){
'use strict';

var debug = require( 'debug' )( 'plot:main' );
var EventEmitter = require( 'events' ).EventEmitter;
var getKeys = require( 'object-keys' ).shim();
var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isObject = require( '@stdlib/assert/is-plain-object' );
var copy = require( '@stdlib/utils/copy' );
var mergeFcn = require( '@stdlib/utils/merge' ).factory;
var minstd = require( '@stdlib/math/base/random/minstd' );
var view = require( './view/view.js' );
var defaults = require( './defaults.js' );


// VARIABLES //

var PRIVATE_PROPS = [
	'_autoRender',
	'_autoView',
	'_colors',
	'_description',
	'_engine',
	'_height',
	'_isDefined',
	'_labels',
	'_lineOpacity',
	'_lineStyle',
	'_lineWidth',
	'_paddingBottom',
	'_paddingLeft',
	'_paddingRight',
	'_paddingTop',
	'_symbols',
	'_symbolsOpacity',
	'_symbolsSize',
	'_title',
	'_viewer',
	'_width',
	'_xAxisOrient',
	'_xData',
	'_xLabel',
	'_xMax',
	'_xMin',
	'_xNumTicks',
	'_xRug',
	'_xRugOpacity',
	'_xRugOrient',
	'_xRugSize',
	'_xScale',
	'_xTickFormat',
	'_yAxisOrient',
	'_yData',
	'_yLabel',
	'_yMax',
	'_yMin',
	'_yNumTicks',
	'_yRug',
	'_yRugOpacity',
	'_yRugOrient',
	'_yRugSize',
	'_yScale',
	'_yTickFormat'
];


// FUNCTIONS //

var merge = mergeFcn({
	'extend': false
});


// MAIN //

/**
* Plot constructor.
*
* @constructor
* @param {Array} [x] - x-values
* @param {Array} [y] - y-values
* @param {Options} [options] - constructor options
* @param {boolean} [options.autoRender=true] - indicates whether to re-render on a change event
* @param {boolean} [options.autoView=false] - indicates whether to generate an updated view on a render event
* @param {(string|StringArray)} [options.colors='category10'] - data colors
* @param {string} [options.description=''] - plot description
* @param {string} [options.engine='svg'] - plot engine
* @param {PositiveNumber} [options.height=400] - plot height
* @param {Function} [options.isDefined] - accessor indicating whether a datum is defined
* @param {(StringArray|EmptyArray)} [options.labels] - data labels
* @param {(number|NumberArray)} [options.lineOpacity=0.9] - data line opacity
* @param {(string|StringArray)} [options.lineStyle='-'] - data line style(s)
* @param {(NonNegativeInteger|Array<NonNegativeInteger>)} [options.lineWidth=2] - data line width(s)
* @param {NonNegativeInteger} [options.paddingBottom=80] - bottom padding
* @param {NonNegativeInteger} [options.paddingLeft=90] - left padding
* @param {NonNegativeInteger} [options.paddingRight=20] - right padding
* @param {NonNegativeInteger} [options.paddingTop=80] - top padding
* @param {(string|StringArray)} [options.symbols='none'] - data symbols
* @param {(number|NumberArray)} [options.symbolsOpacity=0.9] - symbols opacity
* @param {(NonNegativeInteger|Array<NonNegativeInteger>)} [options.symbolsSize=6] - symbols size
* @param {string} [options.title=''] - plot title
* @param {string} [options.viewer='none'] - plot viewer
* @param {PositiveNumber} [options.width=400] - plot width
* @param {Array} [options.x=[]] - x-values
* @param {string} [options.xAxisOrient='bottom'] - x-axis orientation
* @param {string} [options.xLabel='x'] - x-axis label
* @param {(Date|FiniteNumber|null)} [options.xMax=null] - maximum value of x-axis domain
* @param {(Date|FiniteNumber|null)} [options.xMin=null] - minimum value of x-axis domain
* @param {(NonNegativeInteger|null)} [options.xNumTicks=5] - number of x-axis tick marks
* @param {(boolean|BooleanArray)} [options.xRug=false] - indicates whether to render a rug plot along the x-axis
* @param {(string|StringArray)} [options.xRugOrient='bottom'] - x-axis rug orientation
* @param {(number|NumberArray)} [options.xRugOpacity=0.1] - x-axis rug opacity
* @param {(NonNegativeInteger|Array<NonNegativeInteger>)} [options.xRugSize=6] - x-axis rug tick (tassel) size
* @param {string} [options.xScale='linear'] - x-axis scale
* @param {(string|null)} [options.xTickFormat=null] - x-axis tick format
* @param {Array} [options.y=[]] - y-values
* @param {string} [options.yAxisOrient='left'] - y-axis orientation
* @param {string} [options.yLabel='y'] - y-axis label
* @param {(FiniteNumber|null)} [options.yMax=null] - maximum value of y-axis domain
* @param {(FiniteNumber|null)} [options.yMin=null] - minimum value of y-axis domain
* @param {(NonNegativeInteger|null)} [options.yNumTicks=5] - number of y-axis tick marks
* @param {(boolean|BooleanArray)} [options.yRug=false] - indicates whether to render a rug plot along the y-axis
* @param {(string|StringArray)} [options.yRugOrient='left'] - y-axis rug orientation
* @param {(number|NumberArray)} [options.yRugOpacity=0.1] - y-axis rug opacity
* @param {(NonNegativeInteger|Array<NonNegativeInteger>)} [options.yRugSize=6] - y-axis rug tick (tassel) size
* @param {string} [options.yScale='linear'] - y-axis scale
* @param {(string|null)} [options.yTickFormat=null] - y-axis tick format
* @throws {TypeError} must provide valid options
* @returns {Plot} Plot instance
*
* @example
* var plot = new Plot();
*/
function Plot() {
	var options;
	var nargs;
	var keys;
	var self;
	var opts;
	var key;
	var i;

	nargs = arguments.length;
	if ( !(this instanceof Plot) ) {
		if ( nargs === 0 ) {
			return new Plot();
		}
		if ( nargs === 1 ) {
			return new Plot( arguments[0] );
		}
		if ( nargs === 2 ) {
			return new Plot( arguments[0], arguments[1] );
		}
		return new Plot( arguments[0], arguments[1], arguments[2] );
	}
	self = this;

	opts = defaults();
	if ( nargs === 0 ) {
		options = {};
	} else if ( nargs === 1 ) {
		options = arguments[ 0 ];
		if ( !isObject( options ) ) {
			throw new TypeError( 'invalid input argument. Options argument must be an `object`. Value: `' + options + '`.' );
		}
	} else if ( nargs === 2 ) {
		options = {
			'x': arguments[ 0 ],
			'y': arguments[ 1 ]
		};
	} else if ( nargs > 2 ) {
		if ( !isObject( arguments[2] ) ) {
			throw new TypeError( 'invalid input argument. Options argument must be an `object`. Value: `' + arguments[2] + '`.' );
		}
		options = copy( arguments[2] ); // avoid mutation
		options.x = arguments[ 0 ];
		options.y = arguments[ 1 ];
	}
	opts = merge( opts, options );

	debug( 'Creating an instance with the following configuration: %s.', JSON.stringify( opts ) );

	for ( i = 0; i < PRIVATE_PROPS.length; i++ ) {
		Object.defineProperty( this, PRIVATE_PROPS[i], {
			'configurable': false,
			'enumerable': false,
			'writable': true,
			'value': null
		});
	}
	// Set a clipping path id:
	Object.defineProperty( this, '_clipPathId', {
		'configurable': false,
		'enumerable': false,
		'writable': false,
		'value': minstd().toString() // TODO: uuid
	});

	// Initialize an internal cache for renderers...
	Object.defineProperty( this, '$', {
		'configurable': false,
		'enumerable': false,
		'writable': false,
		'value': {}
	});
	Object.defineProperty( this.$, 'svg', {
		'configurable': false,
		'enumerable': false,
		'writable': false,
		'value': {}
	});

	// Set options...
	keys = getKeys( opts );
	for ( i = 0; i < keys.length; i++ ) {
		key = keys[ i ];
		this[ key ] = opts[ key ];
	}

	// Add event listeners:
	this.on( 'change', onChange );
	this.on( 'render', onRender );

	return this;

	/**
	* Callback invoked upon receiving a change event.
	*
	* @private
	*/
	function onChange() {
		/* eslint-disable no-underscore-dangle */
		debug( 'Received a change event.' );
		if ( self._autoRender ) {
			self.render();
		}
	}

	/**
	* Callback invoked upon receiving a render event.
	*
	* @private
	* @param {*} plot - rendered plot
	*/
	function onRender( plot ) {
		/* eslint-disable no-underscore-dangle */
		debug( 'Received a render event.' );
		if ( self._autoView ) {
			debug( 'Viewer: %s.', self._viewer );
			debug( 'Generating view...' );
			view( self, self._viewer, plot );
		}
	}
} // end FUNCTION Plot()

/*
* Create a prototype which inherits from the parent prototype.
*/
Plot.prototype = Object.create( EventEmitter.prototype );

/*
* Set the constructor.
*/
Plot.prototype.constructor = Plot;

/**
* `x` values.
*
* @memberof Plot.prototype
* @name x
* @type {Array}
* @default []
* @throws {TypeError} must be an array
*
* @example
* var plot = new Plot();
* plot.x = [ [ 1417563950959, 1417563952959 ] ];
*
* @example
* var plot = new Plot({
*     'x': [ [ 1417563950959, 1417563952959 ] ]
* });
* var x = plot.x;
* // returns [ [ 1417563950959, 1417563952959 ] ]
*/
Object.defineProperty( Plot.prototype, 'x', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/x/set.js' ),
	'get': require( './props/x/get.js' )
});

/**
* `y` values.
*
* @memberof Plot.prototype
* @name y
* @type {Array}
* @default []
* @throws {TypeError} must be an array
*
* @example
* var plot = new Plot();
* plot.x = [ [ 1417563950959, 1417563952959 ] ];
* plot.y = [ [ 0.25, 0.23 ] ];
*
* @example
* var plot = new Plot({
*     'x': [ [ 1417563950959, 1417563952959 ] ],
*     'y': [ [ 0.25, 0.23 ] ]
* });
* var y = plot.y;
* // returns [ [ 0.25, 0.23 ] ]
*/
Object.defineProperty( Plot.prototype, 'y', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/y/set.js' ),
	'get': require( './props/y/get.js' )
});

/**
* Data labels.
*
* @memberof Plot.prototype
* @name labels
* @type {(StringArray|EmptyArray)}
* @default []
* @throws {TypeError} must be either an array of strings or an empty array
*
* @example
* var plot = new Plot();
* plot.labels = [ 'beep', 'boop' ];
*
* @example
* var plot = new Plot({
*     'labels': [ 'beep', 'boop' ]
* });
* var labels = plot.labels;
* // returns [ 'beep', 'boop' ]
*/
Object.defineProperty( Plot.prototype, 'labels', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/labels/set.js' ),
	'get': require( './props/labels/get.js' )
});

/**
* Accessor which defines whether a datum is defined. This accessor is used to define how missing values are encoded. The default behavior is to ignore values which are `NaN`.
*
* @memberof Plot.prototype
* @name isDefined
* @type {Function}
* @throws {TypeError} must be a function
*
* @example
* var plot = new Plot();
* plot.isDefined = function isDefined( d ) {
*     // Check for `NaN`:
*     return ( d === d );
* }
*
* @example
* function isDefined( d ) {
*     // Check for `NaN`:
*     return ( d === d );
* }
* var plot = new Plot({
*     'isDefined': isDefined
* });
* var fcn = plot.isDefined;
* // returns <Function>
*/
Object.defineProperty( Plot.prototype, 'isDefined', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/is-defined/set.js' ),
	'get': require( './props/is-defined/get.js' )
});

/**
* Data colors. When retrieved, the returned value is always an `array`.
*
* @memberof Plot.prototype
* @name colors
* @type {(string|StringArray)}
* @default 'category10'
* @throws {TypeError} must be either a string or an array of strings
*
* @example
* var plot = new Plot();
* plot.colors = 'category20';
*
* @example
* var plot = new Plot({
*     'colors': 'category20'
* });
* var colors = plot.colors;
* // returns [...]
*/
Object.defineProperty( Plot.prototype, 'colors', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/colors/set.js' ),
	'get': require( './props/colors/get.js' )
});

/**
* Data line style(s). When retrieved, the returned value is always an `array`.
*
* @memberof Plot.prototype
* @name lineStyle
* @type {(string|StringArray)}
* @default '-'
* @throws {TypeError} must be a string or string array
* @throws {Error} must be a supported line style
*
* @example
* var plot = new Plot();
* plot.lineStyle = [ '-', 'none' ];
*
* @example
* var plot = new Plot({
*     'lineStyle': 'none'
* });
* var lineStyle = plot.lineStyle;
* // returns [ 'none' ]
*/
Object.defineProperty( Plot.prototype, 'lineStyle', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/line-style/set.js' ),
	'get': require( './props/line-style/get.js' )
});

/**
* Data line opacity. When retrieved, the returned value is always an `array`.
*
* @memberof Plot.prototype
* @name lineOpacity
* @type {(number|numberArray)}
* @default '-'
* @throws {TypeError} must be a number or number array
* @throws {RangeError} must be a number on the interval `[0,1]`
*
* @example
* var plot = new Plot();
* plot.lineOpacity = [ 1.0, 0.5 ];
*
* @example
* var plot = new Plot({
*     'lineOpacity': 0.5
* });
* var opacity = plot.lineOpacity;
* // returns [ 0.5 ]
*/
Object.defineProperty( Plot.prototype, 'lineOpacity', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/line-opacity/set.js' ),
	'get': require( './props/line-opacity/get.js' )
});

/**
* Data line width. When retrieved, the returned value is always an `array`.
*
* @memberof Plot.prototype
* @name lineWidth
* @type {(NonNegativeInteger|NonNegativeIntegerArray)}
* @default 2
* @throws {TypeError} must be a nonnegative integer or nonnegative integer array
*
* @example
* var plot = new Plot();
* plot.lineWidth = 1;
*
* @example
* var plot = new Plot({
*     'lineWidth': [ 1, 3 ]
* });
* var width = plot.lineWidth;
* // returns [ 1, 3 ]
*/
Object.defineProperty( Plot.prototype, 'lineWidth', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/line-width/set.js' ),
	'get': require( './props/line-width/get.js' )
});

/**
* Data symbols. When retrieved, the returned value is always an `array`.
*
* @memberof Plot.prototype
* @name symbols
* @type {(string|StringArray)}
* @default 'none'
* @throws {TypeError} must be a string or string array
* @throws {Error} must be a supported symbol
*
* @example
* var plot = new Plot();
* plot.symbols = [ 'open-circle', 'closed-circle' ];
*
* @example
* var plot = new Plot({
*     'symbols': 'closed-circle'
* });
* var symbols = plot.symbols;
* // returns [ 'closed-circle' ]
*/
Object.defineProperty( Plot.prototype, 'symbols', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/symbols/set.js' ),
	'get': require( './props/symbols/get.js' )
});

/**
* Symbols size. When retrieved, the returned value is always an `array`.
*
* @memberof Plot.prototype
* @name symbolsSize
* @type {(NonNegativeInteger|NonNegativeIntegerArray)}
* @default 6
* @throws {TypeError} must be a nonnegative integer or nonnegative integer array
*
* @example
* var plot = new Plot();
* plot.symbolsSize = 4;
*
* @example
* var plot = new Plot({
*     'symbolsSize': [ 4, 6 ]
* });
* var size = plot.symbolsSize;
* // returns [ 4, 6 ]
*/
Object.defineProperty( Plot.prototype, 'symbolsSize', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/symbols-size/set.js' ),
	'get': require( './props/symbols-size/get.js' )
});

/**
* Symbols opacity. When retrieved, the returned value is always an `array`.
*
* @memberof Plot.prototype
* @name symbolsOpacity
* @type {(number|NumberArray)}
* @default 0.9
* @throws {TypeError} must be a number or number array
* @throws {RangeError} must be a number on the interval `[0,1]`
*
* @example
* var plot = new Plot();
* plot.symbolsOpacity = [ 0.2, 0.5 ];
*
* @example
* var plot = new Plot({
*     'symbolsOpacity': 0.2
* });
* var opacity = plot.symbolsOpacity;
* // returns 0.2
*/
Object.defineProperty( Plot.prototype, 'symbolsOpacity', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/symbols-opacity/set.js' ),
	'get': require( './props/symbols-opacity/get.js' )
});

/**
* Plot width.
*
* @memberof Plot.prototype
* @name width
* @type {PositiveNumber}
* @default 400 (px)
* @throws {TypeError} must be a positive number
*
* @example
* var plot = new Plot();
* plot.width = 100;
*
* @example
* var plot = new Plot({
*     'width': 480
* });
* var width = plot.width;
* // returns 480
*/
Object.defineProperty( Plot.prototype, 'width', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/width/set.js' ),
	'get': require( './props/width/get.js' )
});

/**
* Plot height.
*
* @memberof Plot.prototype
* @name height
* @type {PositiveNumber}
* @default 400 (px)
* @throws {TypeError} must be a positive number
*
* @example
* var plot = new Plot();
* plot.height = 100;
*
* @example
* var plot = new Plot({
*     'height': 360
* });
* var height = plot.height;
* // returns 360
*/
Object.defineProperty( Plot.prototype, 'height', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/height/set.js' ),
	'get': require( './props/height/get.js' )
});

/**
* Plot left padding. Typically used to create space for a left-oriented y-axis.
*
* @memberof Plot.prototype
* @name paddingLeft
* @type {NonNegativeInteger}
* @default 90 (px)
* @throws {TypeError} must be a nonnegative integer
*
* @example
* var plot = new Plot();
* plot.paddingLeft = 100;
*
* @example
* var plot = new Plot({
*     'paddingLeft': 100
* });
* var padding = plot.paddingLeft;
* // returns 100
*/
Object.defineProperty( Plot.prototype, 'paddingLeft', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/padding-left/set.js' ),
	'get': require( './props/padding-left/get.js' )
});

/**
* Plot right padding. Typically used to create space for a right-oriented y-axis.
*
* @memberof Plot.prototype
* @name paddingRight
* @type {NonNegativeInteger}
* @default 20 (px)
* @throws {TypeError} must be a nonnegative integer
*
* @example
* var plot = new Plot();
* plot.paddingRight = 100;
*
* @example
* var plot = new Plot({
*     'paddingRight': 100
* });
* var padding = plot.paddingRight;
* // returns 100
*/
Object.defineProperty( Plot.prototype, 'paddingRight', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/padding-right/set.js' ),
	'get': require( './props/padding-right/get.js' )
});

/**
* Plot top padding. Typically used to create space for a title or top-oriented x-axis.
*
* @memberof Plot.prototype
* @name paddingTop
* @type {NonNegativeInteger}
* @default 80 (px)
* @throws {TypeError} must be a nonnegative integer
*
* @example
* var plot = new Plot();
* plot.paddingTop = 100;
*
* @example
* var plot = new Plot({
*     'paddingTop': 100
* });
* var padding = plot.paddingTop;
* // returns 100
*/
Object.defineProperty( Plot.prototype, 'paddingTop', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/padding-top/set.js' ),
	'get': require( './props/padding-top/get.js' )
});

/**
* Plot bottom padding. Typically used to create space for a bottom-oriented y-axis.
*
* @memberof Plot.prototype
* @name paddingBottom
* @type {NonNegativeInteger}
* @default 80 (px)
* @throws {TypeError} must be a nonnegative integer
*
* @example
* var plot = new Plot();
* plot.paddingBottom = 100;
*
* @example
* var plot = new Plot({
*     'paddingBottom': 100
* });
* var padding = plot.paddingBottom;
* // returns 100
*/
Object.defineProperty( Plot.prototype, 'paddingBottom', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/padding-bottom/set.js' ),
	'get': require( './props/padding-bottom/get.js' )
});

/**
* Minimum value of the x-axis domain. When retrieved, if the value has been set to `null`, the returned value is computed from the `x` data.
*
* @memberof Plot.prototype
* @name xMin
* @type {(FiniteNumber|null)}
* @default null
* @throws {TypeError} must be a finite number primitive or null
*
* @example
* var plot = new Plot();
* plot.xMin = -1.0;
*
* @example
* var plot = new Plot({
*     'xMin': -10.0
* });
* var xmin = plot.xMin;
* // returns -10.0
*/
Object.defineProperty( Plot.prototype, 'xMin', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/x-min/set.js' ),
	'get': require( './props/x-min/get.js' )
});

/**
* Maximum value of the x-axis domain. When retrieved, if the value has been set to `null`, the returned value is computed from the `x` data.
*
* @memberof Plot.prototype
* @name xMax
* @type {(FiniteNumber|null)}
* @default null
* @throws {TypeError} must be a finite number primitive or null
*
* @example
* var plot = new Plot();
* plot.xMax = 100.0;
*
* @example
* var plot = new Plot({
*     'xMax': 10.0
* });
* var xmax = plot.xMax;
* // returns 10.0
*/
Object.defineProperty( Plot.prototype, 'xMax', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/x-max/set.js' ),
	'get': require( './props/x-max/get.js' )
});

/**
* Minimum value of the y-axis domain. When retrieved, if the value has been set to `null`, the returned value is computed from the `y` data.
*
* @memberof Plot.prototype
* @name yMin
* @type {(FiniteNumber|null)}
* @default null
* @throws {TypeError} must be a finite number primitive or null
*
* @example
* var plot = new Plot();
* plot.yMin = -100.0;
*
* @example
* var plot = new Plot({
*     'yMin': 3.14
* });
* var ymin = plot.yMin;
* // returns 3.14
*/
Object.defineProperty( Plot.prototype, 'yMin', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/y-min/set.js' ),
	'get': require( './props/y-min/get.js' )
});

/**
* Maximum value of the y-axis domain. When retrieved, if the value has been set to `null`, the returned value is computed from the `y` data.
*
* @memberof Plot.prototype
* @name yMax
* @type {(FiniteNumber|null)}
* @default null
* @throws {TypeError} must be a finite number primitive or null
*
* @example
* var plot = new Plot();
* plot.yMax = 100.0;
*
* @example
* var plot = new Plot({
*     'yMax': 31.4
* });
* var ymax = plot.yMax;
* // returns 31.4
*/
Object.defineProperty( Plot.prototype, 'yMax', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/y-max/set.js' ),
	'get': require( './props/y-max/get.js' )
});

/**
* Scale function for mapping values to a coordinate along the x-axis. When retrieved, the returned value is a scale function.
*
* @memberof Plot.prototype
* @type {string}
* @name xScale
* @default 'linear'
* @throws {TypeError} must be a string primitive
*
* @example
* var plot = new Plot();
* plot.xScale = 'time';
*
* @example
* var plot = new Plot({
*     'xScale': 'time'
* });
* var scale = plot.xScale;
* // returns <Function>
*/
Object.defineProperty( Plot.prototype, 'xScale', {
	'configurable': false,
	'enumerable': true,
	'get': require( './props/x-scale/get.js' ),
	'set': require( './props/x-scale/set.js' )
});

/**
* Scale function for mapping values to a coordinate along the y-axis. When retrieved, the returned value is a scale function.
*
* @memberof Plot.prototype
* @type {string}
* @name yScale
* @default 'linear'
* @throws {TypeError} must be a string primitive
*
* @example
* var plot = new Plot();
* plot.yScale = 'linear';
*
* @example
* var plot = new Plot({
*     'yScale': 'linear'
* });
* var scale = plot.yScale;
* // returns <Function>
*/
Object.defineProperty( Plot.prototype, 'yScale', {
	'configurable': false,
	'enumerable': true,
	'get': require( './props/y-scale/get.js' ),
	'set': require( './props/y-scale/set.js' )
});

/**
* x-axis tick format. When retrieved, if the value is not `null`, the returned value is a formatting function.
*
* @memberof Plot.prototype
* @name xTickFormat
* @type {(string|null)}
* @default null
* @throws {TypeError} must be a string primitive or null
*
* @example
* var plot = new Plot();
* plot.xScale = 'time';
* plot.xTickFormat = '%H:%M';
*
* @example
* var plot = new Plot({
*     'xScale': 'time',
*     'xTickFormat': '%H:%M'
* });
* var fmt = plot.xTickFormat;
* // returns '%H:%M'
*/
Object.defineProperty( Plot.prototype, 'xTickFormat', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/x-tick-format/set.js' ),
	'get': require( './props/x-tick-format/get.js' )
});

/**
* y-axis tick format. If the value is not `null`, when retrieved, the returned value is a formatting function.
*
* @memberof Plot.prototype
* @name yTickFormat
* @type {(string|null)}
* @default null
* @throws {TypeError} must be a string primitive or null
*
* @example
* var plot = new Plot();
* plot.yTickFormat = '%%';
*
* @example
* var plot = new Plot({
*     'yTickFormat': '%%'
* });
* var fmt = plot.yTickFormat;
* // returns '%%'
*/
Object.defineProperty( Plot.prototype, 'yTickFormat', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/y-tick-format/set.js' ),
	'get': require( './props/y-tick-format/get.js' )
});

/**
* Number of x-axis tick marks.
*
* @memberof Plot.prototype
* @name xNumTicks
* @type {(NonNegativeInteger|null)}
* @default 5
* @throws {TypeError} must be a nonnegative integer or null
*
* @example
* var plot = new Plot();
* plot.xNumTicks = 10;
*
* @example
* var plot = new Plot({
*     'xNumTicks': 10
* });
* var ticks = plot.xNumTicks;
* // returns 10
*/
Object.defineProperty( Plot.prototype, 'xNumTicks', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/x-num-ticks/set.js' ),
	'get': require( './props/x-num-ticks/get.js' )
});

/**
* Number of y-axis tick marks.
*
* @memberof Plot.prototype
* @name yNumTicks
* @type {(NonNegativeInteger|null)}
* @default 5
* @throws {TypeError} must be a nonnegative integer or null
*
* @example
* var plot = new Plot();
* plot.yNumTicks = 10;
*
* @example
* var plot = new Plot({
*     'yNumTicks': 10
* });
* var ticks = plot.yNumTicks;
* // returns 10
*/
Object.defineProperty( Plot.prototype, 'yNumTicks', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/y-num-ticks/set.js' ),
	'get': require( './props/y-num-ticks/get.js' )
});

/**
* x-axis orientation.
*
* @memberof Plot.prototype
* @name xAxisOrient
* @type {string}
* @default 'bottom'
* @throws {TypeError} must be either `'top'` or `'bottom'`
*
* @example
* var plot = new Plot();
* plot.xAxisOrient = 'bottom';
*
* @example
* var plot = new Plot({
*     'xAxisOrient': 'bottom'
* });
* var orientation = plot.xAxisOrient;
* // returns 'bottom'
*/
Object.defineProperty( Plot.prototype, 'xAxisOrient', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/x-axis-orient/set.js' ),
	'get': require( './props/x-axis-orient/get.js' )
});

/**
* y-axis orientation.
*
* @memberof Plot.prototype
* @name yAxisOrient
* @type {string}
* @default 'left'
* @throws {TypeError} must be either `'left'` or `'right'`
*
* @example
* var plot = new Plot();
* plot.yAxisOrient = 'left';
*
* @example
* var plot = new Plot({
*     'yAxisOrient': 'left'
* });
* var orientation = plot.yAxisOrient;
* // returns 'left'
*/
Object.defineProperty( Plot.prototype, 'yAxisOrient', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/y-axis-orient/set.js' ),
	'get': require( './props/y-axis-orient/get.js' )
});

/**
* Boolean flag(s) indicating whether to display a rug plot along the x-axis. When retrieved, the returned value is always an `array`.
*
* @memberof Plot.prototype
* @name xRug
* @type {(boolean|BooleanArray)}
* @default false
* @throws {TypeError} must be a boolean primitive or boolean array
*
* @example
* var plot = new Plot({
*     'xRug': true
* });
*
* var bool = plot.xRug;
* // returns [ true ]
*/
Object.defineProperty( Plot.prototype, 'xRug', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/x-rug/set.js' ),
	'get': require( './props/x-rug/get.js' )
});

/**
* Boolean flag(s) indicating whether to display a rug plot along the y-axis. When retrieved, the returned value is always an `array`.
*
* @memberof Plot.prototype
* @name yRug
* @type {(boolean|BooleanArray)}
* @default false
* @throws {TypeError} must be a boolean primitive or boolean array
*
* @example
* var plot = new Plot({
*     'yRug': true
* });
*
* var bool = plot.yRug;
* // returns [ true ]
*/
Object.defineProperty( Plot.prototype, 'yRug', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/y-rug/set.js' ),
	'get': require( './props/y-rug/get.js' )
});

/**
* x-axis rug orientation. When retrieved, the returned value is always an `array`.
*
* @memberof Plot.prototype
* @name xRugOrient
* @type {(string|StringArray)}
* @default 'bottom'
* @throws {TypeError} must be a string or string array
* @throws {TypeError} must be either `'top'` or `'bottom'`
*
* @example
* var plot = new Plot();
* plot.xRugOrient = [ 'bottom', 'top' ];
*
* @example
* var plot = new Plot({
*     'xRugOrient': 'bottom'
* });
* var orientation = plot.xRugOrient;
* // returns [ 'bottom' ]
*/
Object.defineProperty( Plot.prototype, 'xRugOrient', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/x-rug-orient/set.js' ),
	'get': require( './props/x-rug-orient/get.js' )
});

/**
* y-axis rug orientation. When retrieved, the returned value is always an `array`.
*
* @memberof Plot.prototype
* @name yRugOrient
* @type {(string|StringArray)}
* @default 'left'
* @throws {TypeError} must be a string or string array
* @throws {TypeError} must be either `'left'` or `'right'`
*
* @example
* var plot = new Plot();
* plot.yRugOrient = [ 'right', 'left' ];
*
* @example
* var plot = new Plot({
*     'yRugOrient': 'left'
* });
* var orientation = plot.yRugOrient;
* // returns [ 'left' ]
*/
Object.defineProperty( Plot.prototype, 'yRugOrient', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/y-rug-orient/set.js' ),
	'get': require( './props/y-rug-orient/get.js' )
});

/**
* x-axis rug opacity. When retrieved, the returned value is always an `array`.
*
* @memberof Plot.prototype
* @name xRugOpacity
* @type {(number|NumberArray)}
* @default 0.1
* @throws {TypeError} must be a number or number array
* @throws {RangeError} must be a number on the interval `[0,1]`
*
* @example
* var plot = new Plot();
* plot.xRugOpacity = [ 0.1, 0.5 ];
*
* @example
* var plot = new Plot({
*     'xRugOpacity': 0.1
* });
* var opacity = plot.xRugOpacity;
* // returns [ 0.1 ]
*/
Object.defineProperty( Plot.prototype, 'xRugOpacity', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/x-rug-opacity/set.js' ),
	'get': require( './props/x-rug-opacity/get.js' )
});

/**
* y-axis rug opacity. When retrieved, the returned value is always an `array`.
*
* @memberof Plot.prototype
* @name yRugOpacity
* @type {(number|NumberArray)}
* @default 0.1
* @throws {TypeError} must be a number or number array
* @throws {RangeError} must be a number on the interval `[0,1]`
*
* @example
* var plot = new Plot();
* plot.yRugOpacity = [ 0.1, 0.5 ];
*
* @example
* var plot = new Plot({
*     'yRugOpacity': 0.1
* });
* var opacity = plot.yRugOpacity;
* // returns [ 0.1 ]
*/
Object.defineProperty( Plot.prototype, 'yRugOpacity', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/y-rug-opacity/set.js' ),
	'get': require( './props/y-rug-opacity/get.js' )
});

/**
* x-axis rug tick (tassel) size. When retrieved, the returned value is always an `array`.
*
* @memberof Plot.prototype
* @name xRugSize
* @type {(NonNegativeInteger|Array<NonNegativeInteger>)}
* @default 6
* @throws {TypeError} must be a nonnegative integer or nonnegative integer array
*
* @example
* var plot = new Plot();
* plot.xRugSize = [ 4, 6 ];
*
* @example
* var plot = new Plot({
*     'xRugSize': 4
* });
* var size = plot.xRugSize;
* // returns [ 4 ]
*/
Object.defineProperty( Plot.prototype, 'xRugSize', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/x-rug-size/set.js' ),
	'get': require( './props/x-rug-size/get.js' )
});

/**
* y-axis rug tick (tassel) size. When retrieved, the returned value is always an `array`.
*
* @memberof Plot.prototype
* @name yRugSize
* @type {(NonNegativeInteger|Array<NonNegativeInteger>)}
* @default 6
* @throws {TypeError} must be a nonnegative integer or nonnegative integer array
*
* @example
* var plot = new Plot();
* plot.yRugSize = [ 4, 6 ];
*
* @example
* var plot = new Plot({
*     'yRugSize': 4
* });
* var size = plot.yRugSize;
* // returns [ 4 ]
*/
Object.defineProperty( Plot.prototype, 'yRugSize', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/y-rug-size/set.js' ),
	'get': require( './props/y-rug-size/get.js' )
});

/**
* Plot description.
*
* @memberof Plot.prototype
* @name description
* @type {string}
* @default ''
* @throws {TypeError} must be a string primitive
*
* @example
* var plot = new Plot();
* plot.description = 'Average stock market index covering the last 100 years.';
*
* @example
* var plot = new Plot({
*     'description': 'A plot description.'
* });
* var desc = plot.description;
* // returns 'A plot description'
*/
Object.defineProperty( Plot.prototype, 'description', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/description/set.js' ),
	'get': require( './props/description/get.js' )
});

/**
* Plot title.
*
* @memberof Plot.prototype
* @name title
* @type {string}
* @default ''
* @throws {TypeError} must be a string primitive
*
* @example
* var plot = new Plot();
* plot.title = 'Time Series';
*
* @example
* var plot = new Plot({
*     'title': 'Time Series'
* });
* var t = plot.title;
* // returns 'Time Series'
*/
Object.defineProperty( Plot.prototype, 'title', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/title/set.js' ),
	'get': require( './props/title/get.js' )
});

/**
* x-axis label.
*
* @memberof Plot.prototype
* @name xLabel
* @type {string}
* @default 'x'
* @throws {TypeError} must be a string primitive
*
* @example
* var plot = new Plot();
* plot.xLabel = 'time';
*
* @example
* var plot = new Plot({
*     'xLabel': 'time'
* });
* var xLabel = plot.xLabel;
* // returns 'time'
*/
Object.defineProperty( Plot.prototype, 'xLabel', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/x-label/set.js' ),
	'get': require( './props/x-label/get.js' )
});

/**
* y-axis label.
*
* @memberof Plot.prototype
* @name yLabel
* @type {string}
* @default 'y'
* @throws {TypeError} must be a string primitive
*
* @example
* var plot = new Plot();
* plot.yLabel = 'value';
*
* @example
* var plot = new Plot({
*     'yLabel': 'value'
* });
* var yLabel = plot.yLabel;
* // returns 'value'
*/
Object.defineProperty( Plot.prototype, 'yLabel', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/y-label/set.js' ),
	'get': require( './props/y-label/get.js' )
});

/**
* Plot engine.
*
* @memberof Plot.prototype
* @name engine
* @type {string}
* @default 'svg'
* @throws {TypeError} must be a string primitive
*
* @example
* var plot = new Plot();
* plot.engine = 'svg';
*
* @example
* var plot = new Plot({
*     'engine': 'svg'
* });
* var engine = plot.engine;
* // returns 'svg'
*/
Object.defineProperty( Plot.prototype, 'engine', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/engine/set.js' ),
	'get': require( './props/engine/get.js' )
});

/**
* Rendering mode. If `true`, an instance re-renders on each change event.
*
* @memberof Plot.prototype
* @name autoRender
* @type {boolean}
* @default true
* @throws {TypeError} must be a boolean primitive
*
* @example
* var plot = new Plot({
*     'autoRender': true
* });
*
* var mode = plot.autoRender;
* // returns true
*/
Object.defineProperty( Plot.prototype, 'autoRender', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/auto-render/set.js' ),
	'get': require( './props/auto-render/get.js' )
});

/**
* Plot viewer.
*
* @memberof Plot.prototype
* @name viewer
* @type {string}
* @default 'none'
* @throws {TypeError} must be a recognized viewer
*
* @example
* var plot = new Plot();
* plot.viewer = 'none';
*
* @example
* var plot = new Plot({
*     'viewer': 'none'
* });
* var viewer = plot.engine;
* // returns 'none'
*/
Object.defineProperty( Plot.prototype, 'viewer', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/viewer/set.js' ),
	'get': require( './props/viewer/get.js' )
});

/**
* Viewer mode. If `true`, an instance generates an updated view on each render event.
*
* @memberof Plot.prototype
* @name autoView
* @type {boolean}
* @default false
* @throws {TypeError} must be a boolean primitive
*
* @example
* var plot = new Plot({
*     'autoView': false
* });
*
* var mode = plot.autoView;
* // returns false
*/
Object.defineProperty( Plot.prototype, 'autoView', {
	'configurable': false,
	'enumerable': true,
	'set': require( './props/auto-view/set.js' ),
	'get': require( './props/auto-view/get.js' )
});

/**
* Expected graph width.
*
* @memberof Plot.prototype
* @type {number}
* @name graphWidth
*
* @example
* var plot = new Plot({
*     'width': 100,
*     'paddingLeft': 10,
*     'paddingRight': 10
* });
* var width = plot.graphWidth;
* // returns 80
*/
Object.defineProperty( Plot.prototype, 'graphWidth', {
	'configurable': false,
	'enumerable': true,
	'get': require( './props/graph-width/get.js' )
});

/**
* Expected graph height.
*
* @memberof Plot.prototype
* @type {number}
* @name graphHeight
*
* @example
* var plot = new Plot({
*     'height': 100,
*     'paddingTop': 10,
*     'paddingBottom': 20
* });
* var height = plot.graphHeight;
* // returns 70
*/
Object.defineProperty( Plot.prototype, 'graphHeight', {
	'configurable': false,
	'enumerable': true,
	'get': require( './props/graph-height/get.js' )
});

/**
* x-axis domain.
*
* @memberof Plot.prototype
* @type {NumberArray}
* @name xDomain
*
* @example
* var plot = new Plot({
*     'x': [ [ 1, 2, 3, 2 ] ]
* });
* var domain = plot.xDomain;
* // returns [ 1, 3 ]
*/
Object.defineProperty( Plot.prototype, 'xDomain', {
	'configurable': false,
	'enumerable': true,
	'get': require( './props/x-domain/get.js' )
});

/**
* y-axis domain.
*
* @memberof Plot.prototype
* @type {NumberArray}
* @name yDomain
*
* @example
* var plot = new Plot({
*     'y': [ [ 1, 2, 3, 2 ] ]
* });
* var domain = plot.yDomain;
* // returns [ 1, 3 ]
*/
Object.defineProperty( Plot.prototype, 'yDomain', {
	'configurable': false,
	'enumerable': true,
	'get': require( './props/y-domain/get.js' )
});

/**
* x-axis range.
*
* @memberof Plot.prototype
* @type {NumberArray}
* @name xRange
*
* @example
* var plot = new Plot({
*     'width': 100,
*     'paddingLeft': 10,
*     'paddingRight': 10
* });
* var range = plot.xRange;
* // returns [ 0, 80 ]
*/
Object.defineProperty( Plot.prototype, 'xRange', {
	'configurable': false,
	'enumerable': true,
	'get': require( './props/x-range/get.js' )
});

/**
* y-axis range.
*
* @memberof Plot.prototype
* @type {NumberArray}
* @name yRange
*
* @example
* var plot = new Plot({
*     'height': 100,
*     'paddingTop': 10,
*     'paddingBottom': 20
* });
* var range = plot.yRange;
* // returns [ 70, 0 ]
*/
Object.defineProperty( Plot.prototype, 'yRange', {
	'configurable': false,
	'enumerable': true,
	'get': require( './props/y-range/get.js' )
});

/**
* Function to map values to x-axis coordinate values.
*
* @memberof Plot.prototype
* @type {Function}
* @name xPos
*
* @example
* var plot = new Plot();
* var xPos = plot.xPos;
* // returns <Function>
*/
Object.defineProperty( Plot.prototype, 'xPos', {
	'configurable': false,
	'enumerable': true,
	'get': require( './props/x-pos/get.js' )
});

/**
* Function to map values to y-axis coordinate values.
*
* @memberof Plot.prototype
* @type {Function}
* @name yPos
*
* @example
* var plot = new Plot();
* var yPos = plot.yPos;
* // returns <Function>
*/
Object.defineProperty( Plot.prototype, 'yPos', {
	'configurable': false,
	'enumerable': true,
	'get': require( './props/y-pos/get.js' )
});

/**
* Renders a plot as a virtual DOM tree.
*
* @memberof Plot.prototype
* @name render
* @type {Function}
* @returns {VTree} virtual tree
*
* @example
* var plot = new Plot();
* plot.x = [ [ 1, 2, 3 ] ];
* plot.y = [ [ 1, 0, 1 ] ];
*
* var out = plot.render();
*/
setReadOnly( Plot.prototype, 'render', require( './render' ) );

/**
* Generates a plot view.
*
* @memberof Plot.prototype
* @name view
* @type {Function}
* @param {string} [viewer]
* @throws {TypeError} must provide a recognized viewer
*
* @example
* var plot = new Plot();
* plot.x = [ [ 1, 2, 3 ] ];
* plot.y = [ [ 1, 0, 1 ] ];
*
* plot.view( 'stdout' );
*/
setReadOnly( Plot.prototype, 'view', require( './view' ) );


// EXPORTS //

module.exports = Plot;

},{"./defaults.js":349,"./props/auto-render/get.js":353,"./props/auto-render/set.js":354,"./props/auto-view/get.js":355,"./props/auto-view/set.js":356,"./props/colors/get.js":358,"./props/colors/set.js":359,"./props/description/get.js":360,"./props/description/set.js":361,"./props/engine/get.js":362,"./props/engine/set.js":363,"./props/graph-height/get.js":364,"./props/graph-width/get.js":365,"./props/height/get.js":366,"./props/height/set.js":367,"./props/is-defined/get.js":368,"./props/is-defined/set.js":369,"./props/labels/get.js":370,"./props/labels/set.js":371,"./props/line-opacity/get.js":372,"./props/line-opacity/set.js":373,"./props/line-style/get.js":374,"./props/line-style/set.js":376,"./props/line-width/get.js":377,"./props/line-width/set.js":378,"./props/padding-bottom/get.js":379,"./props/padding-bottom/set.js":380,"./props/padding-left/get.js":381,"./props/padding-left/set.js":382,"./props/padding-right/get.js":383,"./props/padding-right/set.js":384,"./props/padding-top/get.js":385,"./props/padding-top/set.js":386,"./props/symbols-opacity/get.js":387,"./props/symbols-opacity/set.js":388,"./props/symbols-size/get.js":389,"./props/symbols-size/set.js":390,"./props/symbols/get.js":391,"./props/symbols/set.js":392,"./props/title/get.js":394,"./props/title/set.js":395,"./props/viewer/get.js":396,"./props/viewer/set.js":397,"./props/width/get.js":399,"./props/width/set.js":400,"./props/x-axis-orient/get.js":401,"./props/x-axis-orient/set.js":403,"./props/x-domain/get.js":404,"./props/x-label/get.js":405,"./props/x-label/set.js":406,"./props/x-max/get.js":407,"./props/x-max/set.js":408,"./props/x-min/get.js":409,"./props/x-min/set.js":410,"./props/x-num-ticks/get.js":411,"./props/x-num-ticks/set.js":412,"./props/x-pos/get.js":413,"./props/x-range/get.js":414,"./props/x-rug-opacity/get.js":415,"./props/x-rug-opacity/set.js":416,"./props/x-rug-orient/get.js":417,"./props/x-rug-orient/set.js":419,"./props/x-rug-size/get.js":420,"./props/x-rug-size/set.js":421,"./props/x-rug/get.js":422,"./props/x-rug/set.js":423,"./props/x-scale/get.js":424,"./props/x-scale/set.js":425,"./props/x-tick-format/get.js":426,"./props/x-tick-format/set.js":427,"./props/x/get.js":428,"./props/x/set.js":429,"./props/y-axis-orient/get.js":430,"./props/y-axis-orient/set.js":432,"./props/y-domain/get.js":433,"./props/y-label/get.js":434,"./props/y-label/set.js":435,"./props/y-max/get.js":436,"./props/y-max/set.js":437,"./props/y-min/get.js":438,"./props/y-min/set.js":439,"./props/y-num-ticks/get.js":440,"./props/y-num-ticks/set.js":441,"./props/y-pos/get.js":442,"./props/y-range/get.js":443,"./props/y-rug-opacity/get.js":444,"./props/y-rug-opacity/set.js":445,"./props/y-rug-orient/get.js":446,"./props/y-rug-orient/set.js":448,"./props/y-rug-size/get.js":449,"./props/y-rug-size/set.js":450,"./props/y-rug/get.js":451,"./props/y-rug/set.js":452,"./props/y-scale/get.js":453,"./props/y-scale/set.js":454,"./props/y-tick-format/get.js":455,"./props/y-tick-format/set.js":456,"./props/y/get.js":457,"./props/y/set.js":458,"./render":459,"./view":475,"./view/view.js":477,"@stdlib/assert/is-plain-object":50,"@stdlib/math/base/random/minstd":76,"@stdlib/utils/copy":487,"@stdlib/utils/define-read-only-property":490,"@stdlib/utils/merge":514,"debug":549,"events":564,"object-keys":577}],353:[function(require,module,exports){
arguments[4][102][0].apply(exports,arguments)
},{"dup":102}],354:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:set:auto-render' );
var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;


// MAIN //

/**
* Sets the rendering mode.
*
* @private
* @param {boolean} bool - boolean indicating whether to re-render on a change event
* @throws {TypeError} must be a boolean primitive
*/
function set( bool ) {
	/*jshint validthis: true */ // TODO: eslint
	if ( !isBoolean( bool ) ) {
		throw new TypeError( 'invalid value. `autoRender` must be a boolean primitive. Value: `' + bool + '.`' );
	}
	debug( 'Current value: %d.', this._autoRender );

	this._autoRender = bool;
	debug( 'New Value: %d.', this._autoRender );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-boolean":10,"debug":549}],355:[function(require,module,exports){
'use strict';

/**
* Returns the viewing mode.
*
* @private
* @returns {boolean} viewing mode
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._autoView;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],356:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:set:auto-view' );
var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;


// MAIN //

/**
* Sets the viewing mode.
*
* @private
* @param {boolean} bool - boolean indicating whether to generate an updated view on a render event
* @throws {TypeError} must be a boolean primitive
*/
function set( bool ) {
	/*jshint validthis: true */ // TODO: eslint
	if ( !isBoolean( bool ) ) {
		throw new TypeError( 'invalid value. `autoView` must be a boolean primitive. Value: `' + bool + '.`' );
	}
	debug( 'Current value: %d.', this._autoView );

	this._autoView = bool;
	debug( 'New Value: %d.', this._autoView );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-boolean":10,"debug":549}],357:[function(require,module,exports){
'use strict';

/*
* See [D3]{@link https://github.com/d3/d3-scale/blob/master/README.md}.
*/

var COLORS = {};

COLORS.category10 = [
	'#1f77b4', // 'category10-1'
	'#ff7f0e', // 'category10-2'
	'#2ca02c', // 'category10-3'
	'#d62728', // 'category10-4'
	'#9467bd', // 'category10-5'
	'#8c564b', // 'category10-6'
	'#e377c2', // 'category10-7'
	'#7f7f7f', // 'category10-8'
	'#bcdb22', // 'category10-9'
	'#17becf'  // 'category10-10'
];

COLORS.category20 = [
	'#1f77b4', // 'category20-1'
	'#aec7e8', // 'category20-2'
	'#ff7f0e', // 'category20-3'
	'#ffbb78', // 'category20-4'
	'#2ca02c', // 'category20-5'
	'#98df8a', // 'category20-6'
	'#d62728', // 'category20-7'
	'#ff9896', // 'category20-8'
	'#9467bd', // 'category20-9'
	'#c5b0d5', // 'category20-10'
	'#8c564b', // 'category20-11'
	'#c49c94', // 'category20-12'
	'#e377c2', // 'category20-13'
	'#f7b6d2', // 'category20-14'
	'#7f7f7f', // 'category20-15'
	'#c7c7c7', // 'category20-16'
	'#bcbd22', // 'category20-17'
	'#dbdb8d', // 'category20-18'
	'#17becf', // 'category20-19'
	'#9edae5'  // 'category20-20'
];

COLORS.category20b = [
	'#393b79', // 'category20b-1'
	'#5254a3', // 'category20b-2'
	'#6b6ecf', // 'category20b-3'
	'#9c9ede', // 'category20b-4'
	'#637939', // 'category20b-5'
	'#8ca252', // 'category20b-6'
	'#b5cf6b', // 'category20b-7'
	'#cedb9c', // 'category20b-8'
	'#8c6d31', // 'category20b-9'
	'#bd9e39', // 'category20b-10'
	'#e7ba52', // 'category20b-11'
	'#e7cb94', // 'category20b-12'
	'#843c39', // 'category20b-13'
	'#ad494a', // 'category20b-14'
	'#d6616b', // 'category20b-15'
	'#e7969c', // 'category20b-16'
	'#7b4173', // 'category20b-17'
	'#a55194', // 'category20b-18'
	'#ce6dbd', // 'category20b-19'
	'#de9ed6'  // 'category20b-20'
];

COLORS.category20c = [
	'#3182bd', // 'category20c-1'
	'#6baed6', // 'category20c-2'
	'#9ecae1', // 'category20c-3'
	'#c6dbef', // 'category20c-4'
	'#e6550d', // 'category20c-5'
	'#fd8d3c', // 'category20c-6'
	'#fdae6b', // 'category20c-7'
	'#fdd0a2', // 'category20c-8'
	'#31a354', // 'category20c-9'
	'#74c476', // 'category20c-10'
	'#a1d99b', // 'category20c-11'
	'#c7e9c0', // 'category20c-12'
	'#756bb1', // 'category20c-13'
	'#9e9ac8', // 'category20c-14'
	'#bcbddc', // 'category20c-15'
	'#dadaeb', // 'category20c-16'
	'#636363', // 'category20c-17'
	'#969696', // 'category20c-18'
	'#bdbdbd', // 'category20c-19'
	'#d9d9d9'  // 'category20c-20'
];


// EXPORTS //

module.exports = COLORS;

},{}],358:[function(require,module,exports){
'use strict';

/**
* Returns the data colors.
*
* @private
* @returns {StringArray} colors
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._colors.slice();
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],359:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:set:colors' );
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var isStringArray = require( '@stdlib/assert/is-string-array' ).primitives;
var COLORS = require( './colors.js' );


// MAIN //

/**
* Sets the data colors.
*
* @private
* @param {(string|StringArray)} v - data colors
* @throws {TypeError} must be either a string or an array of strings
*/
function set( v ) {
	/*jshint validthis: true */ // TODO: eslint
	var isStr = isString( v );
	if (
		!isStr &&
		!isStringArray( v )
	) {
		throw new TypeError( 'invalid value. `colors` must be either a string or a string array. Value: `' + v + '.`' );
	}
	if ( isStr ) {
		if ( COLORS[ v ] === void 0 ) {
			v = [ v ];
		} else {
			v = COLORS[ v ].slice();
		}
	} else {
		v = v.slice();
	}
	debug( 'Current value: %s.', JSON.stringify( this._colors ) );


	this._colors = v;
	debug( 'New Value: %s.', JSON.stringify( this._colors ) );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"./colors.js":357,"@stdlib/assert/is-string":62,"@stdlib/assert/is-string-array":60,"debug":549}],360:[function(require,module,exports){
'use strict';

/**
* Returns the description.
*
* @private
* @returns {string} description
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._description;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],361:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:set:description' );
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;


// MAIN //

/**
* Sets the description.
*
* @private
* @param {string} str - description
* @throws {TypeError} must be a string primitive
*/
function set( str ) {
	/*jshint validthis: true */ // TODO: eslint
	if ( !isString( str ) ) {
		throw new TypeError( 'invalid value. `description` must be a string. Value: `' + str + '.`' );
	}
	debug( 'Current value: %s.', this._description );

	this._description = str;
	debug( 'New value: %s.', this._description );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-string":62,"debug":549}],362:[function(require,module,exports){
'use strict';

/**
* Returns the plot engine.
*
* @private
* @returns {string} engine
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._engine;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],363:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:set:engine' );
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;


// MAIN //

/**
* Sets the engine.
*
* @private
* @param {string} engine - engine
* @throws {TypeError} must be a string primitive
*/
function set( engine ) {
	/*jshint validthis: true */ // TODO: eslint
	// TODO: verify valid engine
	if ( !isString( engine ) ) {
		throw new TypeError( 'invalid value. `engine` must be a string. Value: `' + engine + '.`' );
	}
	debug( 'Current value: %s.', this._engine );

	this._engine = engine;
	debug( 'New value: %s.', this._engine );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-string":62,"debug":549}],364:[function(require,module,exports){
'use strict';

/**
* Returns the expected graph height.
*
* @private
* @returns {number} graph height
*/
function get() {
	/* jshint validthis:true */ // TODO: eslint
	return this._height - this._paddingTop - this._paddingBottom;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],365:[function(require,module,exports){
'use strict';

/**
* Returns the expected graph width.
*
* @private
* @returns {number} graph width
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._width - this._paddingLeft - this._paddingRight;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],366:[function(require,module,exports){
arguments[4][159][0].apply(exports,arguments)
},{"dup":159}],367:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:set:height' );
var isPositiveNumber = require( '@stdlib/assert/is-positive-number' ).isPrimitive;


// MAIN //

/**
* Sets the height.
*
* @private
* @param {PositiveNumber} height - height
* @throws {TypeError} must be a positive number
*/
function set( height ) {
	/*jshint validthis: true */ // TODO: eslint
	if ( !isPositiveNumber( height ) ) {
		throw new TypeError( 'invalid value. `height` must be a positive number. Value: `' + height + '.`' );
	}
	debug( 'Current value: %d.', this._height );

	this._height = height;
	debug( 'New Value: %d.', this._height );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-positive-number":57,"debug":549}],368:[function(require,module,exports){
arguments[4][249][0].apply(exports,arguments)
},{"dup":249}],369:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:set:is-defined' );
var isFunction = require( '@stdlib/assert/is-function' );


// MAIN //

/**
* Sets the accessor for defined values.
*
* @private
* @param {Function} fcn - accessor
* @throws {TypeError} must be a function
*/
function set( fcn ) {
	/*jshint validthis: true */ // TODO: eslint
	if ( !isFunction( fcn ) ) {
		throw new TypeError( 'invalid value. `isDefined` must be a function. Value: `' + fcn + '.`' );
	}
	debug( 'Current value: %s.', this._isDefined );

	this._isDefined = fcn;
	debug( 'New Value: %s.', this._isDefined );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-function":21,"debug":549}],370:[function(require,module,exports){
'use strict';

/**
* Returns the data labels.
*
* @private
* @returns {(EmptyArray|StringArray)} labels
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._labels.slice();
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],371:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:set:labels' );
var isEmptyArray = require( '@stdlib/assert/is-empty-array' );
var isStringArray = require( '@stdlib/assert/is-string-array' ).primitives;


// MAIN //

/**
* Sets the data labels.
*
* @private
* @param {(StringArray|EmptyArray)} labels - data labels
* @throws {TypeError} must be either an array of strings or an empty array
*/
function set( labels ) {
	/*jshint validthis: true */ // TODO: eslint
	if (
		!isEmptyArray( labels ) &&
		!isStringArray( labels )
	) {
		return new TypeError( 'invalid value. `labels` must be either a string or empty array. Value: `' + labels + '.`' );
	}
	debug( 'Current value: %s.', JSON.stringify( this._labels ) );

	this._labels = labels.slice();
	debug( 'New Value: %s.', JSON.stringify( this._labels ) );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-empty-array":17,"@stdlib/assert/is-string-array":60,"debug":549}],372:[function(require,module,exports){
'use strict';

/**
* Returns the data line opacity.
*
* @private
* @returns {NumberArray} line opacity
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._lineOpacity.slice();
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],373:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:set:line-opacity' );
var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;
var isNumberArray = require( '@stdlib/assert/is-number-array' ).primitives;


// MAIN //

/**
* Sets the data line opacity.
*
* @private
* @param {(number|NumberArray)} v - opacity
* @throws {TypeError} must be a number or number array
* @throws {RangeError} must be a number on the interval `[0,1]`
*/
function set( v ) {
	/*jshint validthis: true */ // TODO: eslint
	var isNum = isNumber( v );
	var i;
	if (
		!isNum &&
		!isNumberArray( v )
	) {
		throw new TypeError( 'invalid value. `lineOpacity` must be a number or number array. Value: `' + v + '.`' );
	}
	if ( isNum ) {
		v = [ v ];
	} else {
		v = v.slice();
	}
	for ( i = 0; i < v.length; i++ ) {
		if (
			v[ i ] < 0.0 ||
			v[ i ] > 1.0
		) {
			throw new RangeError( 'invalid value. A `lineOpacity` must be a number on the interval `[0,1]`. Value: `' + v[i] + '`.' );
		}
	}
	debug( 'Current value: %d.', this._lineOpacity );

	this._lineOpacity = v;
	debug( 'New Value: %d.', this._lineOpacity );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-number":41,"@stdlib/assert/is-number-array":39,"debug":549}],374:[function(require,module,exports){
'use strict';

/**
* Returns the data line style(s).
*
* @private
* @returns {StringArray} line style(s)
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._lineStyle.slice();
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],375:[function(require,module,exports){
module.exports=[
	"-",
	"--",
	":",
	"-.",
	"none"
]

},{}],376:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:set:line-style' );
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var isStringArray = require( '@stdlib/assert/is-string-array' ).primitives;
var indexOf = require( '@stdlib/utils/index-of' );
var LINESTYLES = require( './line_styles.json' );


// MAIN //

/**
* Sets the data line style(s).
*
* @private
* @param {(string|StringArray)} v - line style(s)
* @throws {TypeError} must be a string or string array
* @throws {Error} must be a supported line style
*/
function set( v ) {
	/*jshint validthis: true */ // TODO: eslint
	var isStr = isString( v );
	var i;
	if (
		!isStr &&
		!isStringArray( v )
	) {
		throw new TypeError( 'invalid value. `lineStyle` must be a string or a string array. Value: `'+v+'.`' );
	}
	if ( isStr ) {
		v = [ v ];
	} else {
		v = v.slice();
	}
	for ( i = 0; i < v.length; i++ ) {
		if ( indexOf( LINESTYLES, v[i] ) === -1 ) {
			throw new Error( 'invalid value. Unsupported/unrecognized line style. Must be one of `['+LINESTYLES.join(',')+']`. Value: `'+v[i]+'`.' );
		}
	}
	debug( 'Current value: %s.', JSON.stringify( this._lineStyle ) );

	this._lineStyle = v;
	debug( 'New Value: %s.', JSON.stringify( this._lineStyle ) );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"./line_styles.json":375,"@stdlib/assert/is-string":62,"@stdlib/assert/is-string-array":60,"@stdlib/utils/index-of":503,"debug":549}],377:[function(require,module,exports){
'use strict';

/**
* Returns the data line width.
*
* @private
* @returns {Array<NonNegativeInteger>} line width(s)
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._lineWidth.slice();
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],378:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:set:line-width' );
var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
var isNonNegativeIntegerArray = require( '@stdlib/assert/is-nonnegative-integer' ).isNonNegativePrimitiveIntegerArray;


// MAIN //

/**
* Sets the data line width(s).
*
* @private
* @param {(NonNegativeInteger|Array<NonNegativeInteger>} v - width
* @throws {TypeError} must be a nonnegative integer or nonnegative integer array
*/
function set( v ) {
	/*jshint validthis: true */ // TODO: eslint
	var isInt = isNonNegativeInteger( v );
	if (
		!isInt &&
		!isNonNegativeIntegerArray( v )
	) {
		throw new TypeError( 'invalid value. `lineWidth` must be a nonnegative integer or nonnegative integer array. Value: `' + v + '.`' );
	}
	if ( isInt ) {
		v = [ v ];
	} else {
		v = v.slice();
	}
	debug( 'Current value: %d.', this._lineWidth );

	this._lineWidth = v;
	debug( 'New Value: %d.', this._lineWidth );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-nonnegative-integer":34,"debug":549}],379:[function(require,module,exports){
'use strict';

/**
* Returns the bottom padding.
*
* @private
* @returns {number} padding
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._paddingBottom;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],380:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:set:padding-bottom' );
var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;


// MAIN //

/**
* Sets the bottom padding.
*
* @private
* @param {NonNegtiveInteger} padding - padding
* @throws {TypeError} must be a nonnegative integer
*/
function set( padding ) {
	/*jshint validthis: true */ // TODO: eslint
	if ( !isNonNegativeInteger( padding ) ) {
		throw new TypeError( 'invalid value. `paddingBottom` must be a nonnegative integer. Value: `' + padding + '.`' );
	}
	debug( 'Current value: %d.', this._paddingBottom );

	this._paddingBottom = padding;
	debug( 'New value: %d.', this._paddingBottom );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-nonnegative-integer":34,"debug":549}],381:[function(require,module,exports){
'use strict';

/**
* Returns the left padding.
*
* @private
* @returns {number} padding
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._paddingLeft;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],382:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:set:padding-left' );
var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;


// MAIN //

/**
* Sets the left padding.
*
* @private
* @param {NonNegtiveInteger} padding - padding
* @throws {TypeError} must be a nonnegative integer
*/
function set( padding ) {
	/*jshint validthis: true */ // TODO: eslint
	if ( !isNonNegativeInteger( padding ) ) {
		throw new TypeError( 'invalid value. `paddingLeft` must be a nonnegative integer. Value: `' + padding + '.`' );
	}
	debug( 'Current value: %d.', this._paddingLeft );

	this._paddingLeft = padding;
	debug( 'New value: %d.', this._paddingLeft );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-nonnegative-integer":34,"debug":549}],383:[function(require,module,exports){
'use strict';

/**
* Returns the right padding.
*
* @private
* @returns {number} padding
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._paddingRight;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],384:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:set:padding-right' );
var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;


// MAIN //

/**
* Sets the right padding.
*
* @private
* @param {NonNegtiveInteger} padding - padding
* @throws {TypeError} must be a nonnegative integer
*/
function set( padding ) {
	/*jshint validthis: true */ // TODO: eslint
	if ( !isNonNegativeInteger( padding ) ) {
		return new TypeError( 'invalid value. `paddingRight` must be a nonnegative integer. Value: `' + padding + '.`' );
	}
	debug( 'Current value: %d.', this._paddingRight );

	this._paddingRight = padding;
	debug( 'New value: %d.', this._paddingRight );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-nonnegative-integer":34,"debug":549}],385:[function(require,module,exports){
'use strict';

/**
* Returns the top padding.
*
* @private
* @returns {number} padding
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._paddingTop;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],386:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:set:padding-top' );
var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;


// MAIN //

/**
* Sets the top padding.
*
* @private
* @param {NonNegtiveInteger} padding - padding
* @throws {TypeError} must be a nonnegative integer
*/
function set( padding ) {
	/*jshint validthis: true */ // TODO: eslint
	if ( !isNonNegativeInteger( padding ) ) {
		return new TypeError( 'invalid value. `paddingTop` must be a nonnegative integer. Value: `' + padding + '.`' );
	}
	debug( 'Current value: %d.', this._paddingTop );

	this._paddingTop = padding;
	debug( 'New value: %d.', this._paddingTop );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-nonnegative-integer":34,"debug":549}],387:[function(require,module,exports){
'use strict';

/**
* Returns the symbols opacity.
*
* @private
* @returns {NumberArray} symbols opacity
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._symbolsOpacity.slice();
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],388:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:set:symbols-opacity' );
var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;
var isNumberArray = require( '@stdlib/assert/is-number-array' ).primitives;


// MAIN //

/**
* Sets the symbol opacity.
*
* @private
* @param {(number|NumberArray)} v - opacity
* @throws {TypeError} must be a number or number array
* @throws {RangeError} must be a number on the interval `[0,1]`
*/
function set( v ) {
	/*jshint validthis: true */ // TODO: eslint
	var isNum = isNumber( v );
	var i;
	if (
		!isNum &&
		!isNumberArray( v )
	) {
		throw new TypeError( 'invalid value. `symbolsOpacity` must be a number or number array. Value: `' + v + '.`' );
	}
	if ( isNum ) {
		v = [ v ];
	} else {
		v = v.slice();
	}
	for ( i = 0; i < v.length; i++ ) {
		if (
			v[ i ] < 0.0 ||
			v[ i ] > 1.0
		) {
			throw new RangeError( 'invalid value. A `symbolsOpacity` must be a number on the interval `[0,1]`. Value: `' + v[i] + '`.' );
		}
	}
	debug( 'Current value: %d.', this._symbolsOpacity );

	this._symbolsOpacity = v;
	debug( 'New Value: %d.', this._symbolsOpacity );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-number":41,"@stdlib/assert/is-number-array":39,"debug":549}],389:[function(require,module,exports){
'use strict';

/**
* Returns the symbols size.
*
* @private
* @returns {Array<NonNegativeInteger>} symbols sizes
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._symbolsSize.slice();
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],390:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:set:symbols-size' );
var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
var isNonNegativeIntegerArray = require( '@stdlib/assert/is-nonnegative-integer' ).isNonNegativePrimitiveIntegerArray;


// MAIN //

/**
* Sets the symbols size.
*
* @private
* @param {(NonNegativeInteger|Array<NonNegativeInteger>} v - size
* @throws {TypeError} must be a nonnegative integer or nonnegative integer array
*/
function set( v ) {
	/*jshint validthis: true */ // TODO: eslint
	var isInt = isNonNegativeInteger( v );
	if (
		!isInt &&
		!isNonNegativeIntegerArray( v )
	) {
		throw new TypeError( 'invalid value. `symbolsSize` must be a nonnegative integer or nonnegative integer array. Value: `' + v + '.`' );
	}
	if ( isInt ) {
		v = [ v ];
	} else {
		v = v.slice();
	}
	debug( 'Current value: %d.', this._symbolsSize );

	this._symbolsSize = v;
	debug( 'New Value: %d.', this._symbolsSize );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-nonnegative-integer":34,"debug":549}],391:[function(require,module,exports){
'use strict';

/**
* Returns the data symbols.
*
* @private
* @returns {StringArray} symbols
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._symbols.slice();
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],392:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:set:symbols' );
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var isStringArray = require( '@stdlib/assert/is-string-array' ).primitives;
var indexOf = require( '@stdlib/utils/index-of' );
var SYMBOLS = require( './symbols.json' );


// MAIN //

/**
* Sets the data symbols.
*
* @private
* @param {(string|StringArray)} v - data symbols
* @throws {TypeError} must be a string or string array
* @throws {Error} must be a supported symbol
*/
function set( v ) {
	/*jshint validthis: true */ // TODO: eslint
	var isStr = isString( v );
	var i;
	if (
		!isStr &&
		!isStringArray( v )
	) {
		throw new TypeError( 'invalid value. `symbols` must be a string or string array. Value: `'+v+'.`' );
	}
	if ( isStr ) {
		v = [ v ];
	} else {
		v = v.slice();
	}
	for ( i = 0; i < v.length; i++ ) {
		if ( indexOf( SYMBOLS, v[i] ) === -1 ) {
			throw new Error( 'invalid value. Unrecognized/unsupported symbol. Value: `['+v.join(',')+']`.' );
		}
	}
	debug( 'Current value: %s.', JSON.stringify( this._symbols ) );

	this._symbols = v;
	debug( 'New Value: %s.', JSON.stringify( this._symbols ) );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"./symbols.json":393,"@stdlib/assert/is-string":62,"@stdlib/assert/is-string-array":60,"@stdlib/utils/index-of":503,"debug":549}],393:[function(require,module,exports){
module.exports=[
	"closed-circle",
	"open-circle",
	"none"
]

},{}],394:[function(require,module,exports){
'use strict';

/**
* Returns the title.
*
* @private
* @returns {string} title
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._title;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],395:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:set:title' );
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;


// MAIN //

/**
* Sets the title.
*
* @private
* @param {string} str - title
* @throws {TypeError} must be a string primitive
*/
function set( str ) {
	/*jshint validthis: true */ // TODO: eslint
	if ( !isString( str ) ) {
		throw new TypeError( 'invalid value. `title` must be a string. Value: `' + str + '.`' );
	}
	debug( 'Current value: %s.', this._title );

	this._title = str;
	debug( 'New value: %s.', this._title );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-string":62,"debug":549}],396:[function(require,module,exports){
'use strict';

/**
* Returns the plot viewer.
*
* @private
* @returns {string} viewer
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._viewer;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],397:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:set:viewer' );
var indexOf = require( '@stdlib/utils/index-of' );
var VIEWERS = require( './viewers.json' );


// MAIN //

/**
* Sets the viewer.
*
* @private
* @param {string} viewer - viewer
* @throws {TypeError} must be a recognized viewer
*/
function set( viewer ) {
	/*jshint validthis: true */ // TODO: eslint
	if ( indexOf( VIEWERS, viewer ) === -1 ) {
		throw new TypeError( 'invalid value. Unrecognized/unsupported `viewer`. Value: `' + viewer + '.`' );
	}
	debug( 'Current value: %s.', this._viewer );

	this._viewer = viewer;
	debug( 'New value: %s.', this._viewer );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"./viewers.json":398,"@stdlib/utils/index-of":503,"debug":549}],398:[function(require,module,exports){
module.exports=[
	"none",
	"browser",
	"terminal",
	"stdout",
	"window"
]

},{}],399:[function(require,module,exports){
arguments[4][161][0].apply(exports,arguments)
},{"dup":161}],400:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:set:width' );
var isPositiveNumber = require( '@stdlib/assert/is-positive-number' ).isPrimitive;


// MAIN //

/**
* Sets the width.
*
* @private
* @param {PositiveNumber} width - width
* @throws {TypeError} must be a positive number
*/
function set( width ) {
	/*jshint validthis: true */ // TODO: eslint
	if ( !isPositiveNumber( width ) ) {
		throw new TypeError( 'invalid value. `width` must be a positive number. Value: `' + width + '.`' );
	}
	debug( 'Current value: %d.', this._width );

	this._width = width;
	debug( 'New value: %d.', this._width );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-positive-number":57,"debug":549}],401:[function(require,module,exports){
'use strict';

/**
* Returns the x-axis orientation.
*
* @private
* @returns {string} orientation
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._xAxisOrient;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],402:[function(require,module,exports){
module.exports=[
	"bottom",
	"top"
]

},{}],403:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:set:xaxisorient' );
var indexOf = require( '@stdlib/utils/index-of' );
var ORIENTATIONS = require( './orientations.json' );


// MAIN //

/**
* Sets the x-axis orientation.
*
* @private
* @param {string} orientation - axis orientation
* @throws {TypeError} must be either `'bottom'` or `'top'`
*/
function set( orientation ) {
	/*jshint validthis: true */ // TODO: eslint
	if ( indexOf( ORIENTATIONS, orientation ) === -1 ) {
		throw new TypeError( 'invalid value. `xAxisOrient` must be one of `[' + ORIENTATIONS.join(',') + ']`. Value: `' + orientation + '.`' );
	}
	debug( 'Current value: %s.', this._xAxisOrient );

	this._xAxisOrient = orientation;
	debug( 'New value: %s.', this._xAxisOrient );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"./orientations.json":402,"@stdlib/utils/index-of":503,"debug":549}],404:[function(require,module,exports){
'use strict';

/**
* Returns the x-axis domain.
*
* @private
* @returns {NumberArray} domain
*/
function get() {
	/* jshint validthis:true */ // TODO: eslint
	return [ this.xMin, this.xMax ];
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],405:[function(require,module,exports){
'use strict';

/**
* Returns the x-axis label.
*
* @private
* @returns {string} label
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._xLabel;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],406:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:set:xlabel' );
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;


// MAIN //

/**
* Sets the x-axis label.
*
* @private
* @param {string} label - axis label
* @throws {TypeError} must be a string primitive
*/
function set( label ) {
	/*jshint validthis: true */ // TODO: eslint
	if ( !isString( label ) ) {
		throw new TypeError( 'invalid value. `xLabel` must be a string. Value: `' + label + '.`' );
	}
	debug( 'Current value: %s.', this._xLabel );

	this._xLabel = label;
	debug( 'New value: %s.', this._xLabel );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-string":62,"debug":549}],407:[function(require,module,exports){
'use strict';

// MODULES //

var isNull = require( '@stdlib/assert/is-null' );
var max = require( './../../utils/max.js' ); // TODO: replace with mod when written


// FUNCTIONS //

/**
* Computes a maximum value.
*
* @private
* @param {Array<NumericArray>} arr - input array
* @returns {(number|null)} maximum value or null
*/
function getMax( arr ) {
	var tmp;
	var i;
	if ( arr.length === 0 ) {
		return null;
	}
	tmp = new Array( arr.length );
	for ( i = 0; i < arr.length; i++ ) {
		tmp[ i ] = max( arr[ i ] );
	}
	return max( tmp );
} // end FUNCTION getMax


// MAIN //

/**
* Returns the maximum value of the x-axis domain.
*
* @private
* @returns {number} maximum value
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	var max;
	if ( isNull( this._xMax ) ) {
		max = getMax( this._xData );
		return ( isNull( max ) ) ? 1.0 : max;
	}
	return this._xMax;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{"./../../utils/max.js":473,"@stdlib/assert/is-null":37}],408:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'line:set:xmax' );
var isNull = require( '@stdlib/assert/is-null' );
var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;


// MAIN //

/**
* Sets the maximum value of the x-axis domain.
*
* @private
* @param {(Date|FiniteNumber|null)} min - maximum value
* @throws {TypeError} must be a finite number primitive or null
*/
function set( max ) {
	/*jshint validthis: true */ // TODO: eslint
	// TODO: add test to determine if evaluates to valid date?
	if (
		!isNull( max ) &&
		!isNumber( max ) // FIXME: finite number
		// TODO: Date
	) {
		throw new TypeError( 'invalid value. `xMax` must be either a finite number, Date, or null. Value: `' + max + '.`' );
	}
	debug( 'Current value: %s.', this._xMax );

	this._xMax = max;
	debug( 'New value: %s.', this._xMax );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-null":37,"@stdlib/assert/is-number":41,"debug":549}],409:[function(require,module,exports){
'use strict';

// MODULES //

var isNull = require( '@stdlib/assert/is-null' );
var min = require( './../../utils/min.js' ); // TODO: replace with mod when written


// FUNCTIONS //

/**
* Computes a minimum value.
*
* @private
* @param {Array<NumericArray>} arr - input array
* @returns {(number|null)} minimum value or null
*/
function getMin( arr ) {
	var tmp;
	var i;
	if ( arr.length === 0 ) {
		return null;
	}
	tmp = new Array( arr.length );
	for ( i = 0; i < arr.length; i++ ) {
		tmp[ i ] = min( arr[ i ] );
	}
	return min( tmp );
} // end FUNCTION getMin


// MAIN //

/**
* Returns the minimum value of the x-axis domain.
*
* @private
* @returns {number} minimum value
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	var min;
	if ( isNull( this._xMin ) ) {
		min = getMin( this._xData );
		return ( isNull( min ) ) ? 0.0 : min;
	}
	return this._xMin;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{"./../../utils/min.js":474,"@stdlib/assert/is-null":37}],410:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:set:xmin' );
var isNull = require( '@stdlib/assert/is-null' );
var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;


// MAIN //

/**
* Sets the minimum value of the x-axis domain.
*
* @private
* @param {(Date|FiniteNumber|null)} min - minimum value
* @throws {TypeError} must be a finite number primitive or null
*/
function set( min ) {
	/*jshint validthis: true */ // TODO: eslint
	// TODO: add test to determine if evaluates to valid date?
	if (
		!isNull( min ) &&
		!isNumber( min ) // FIXME: finite number
		// TODO: Date
	) {
		throw new TypeError( 'invalid value. `xMin` must be either a finite number, Date, or null. Value: `' + min + '.`' );
	}
	debug( 'Current value: %s.', this._xMin );

	this._xMin = min;
	debug( 'New value: %s.', this._xMin );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-null":37,"@stdlib/assert/is-number":41,"debug":549}],411:[function(require,module,exports){
'use strict';

/**
* Returns the number of x-axis tick marks.
*
* @private
* @returns {(NonNegativeInteger|null)} number of ticks
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._xNumTicks;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],412:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:set:xnumticks' );
var isNull = require( '@stdlib/assert/is-null' );
var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;


// MAIN //

/**
* Sets the number of x-axis tick marks.
*
* @private
* @param {(NonNegativeInteger|null)} ticks - number of ticks
* @throws {TypeError} must be a nonnegative integer or null
*/
function set( ticks ) {
	/*jshint validthis: true */ // TODO: eslint
	if (
		!isNull( ticks ) &&
		!isNonNegativeInteger( ticks )
	) {
		throw new TypeError( 'invalid value. `xNumTicks` must be a nonnegative integer or null. Value: `' + ticks + '.`' );
	}
	debug( 'Current value: %d.', this._xNumTicks );

	this._xNumTicks = ticks;
	debug( 'New value: %d.', this._xNumTicks );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-nonnegative-integer":34,"@stdlib/assert/is-null":37,"debug":549}],413:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:xpos' );


// MAIN //

/**
* Returns a function to map values to x-axis coordinate values.
*
* @private
* @returns {Function} map function
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	var scale = this.xScale;
	/**
	* Maps a value to a x-axis coordinate value.
	*
	* @private
	* @param {number} d - datum
	* @returns {number} pixel value
	*/
	return function xPos( d ) {
		var px = scale( d );
		debug( 'Value: %d => Pixel: %d.', d, px );
		return px;
	}; // end FUNCTION xPos()
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{"debug":549}],414:[function(require,module,exports){
'use strict';

/**
* Returns the x-axis range.
*
* @private
* @returns {NumberArray} range
*/
function get() {
	/* jshint validthis:true */ // TODO: eslint
	return [ 0, this.graphWidth ];
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],415:[function(require,module,exports){
'use strict';

/**
* Returns the x-axis rug opacity.
*
* @private
* @returns {NumberArray} rug opacities
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._xRugOpacity.slice();
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],416:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:set:x-rug-opacity' );
var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;
var isNumberArray = require( '@stdlib/assert/is-number-array' ).primitives;


// MAIN //

/**
* Sets the x-axis rug opacity.
*
* @private
* @param {(number|NumberArray)} v - opacity
* @throws {TypeError} must be a number or number array
* @throws {RangeError} must be a number on the interval `[0,1]`
*/
function set( v ) {
	/*jshint validthis: true */ // TODO: eslint
	var isNum = isNumber( v );
	var i;
	if (
		!isNum &&
		!isNumberArray( v )
	) {
		throw new TypeError( 'invalid value. `xRugOpacity` must be a number or number array. Value: `' + v + '.`' );
	}
	if ( isNum ) {
		v = [ v ];
	} else {
		v = v.slice();
	}
	for ( i = 0; i < v.length; i++ ) {
		if (
			v[ i ] < 0.0 ||
			v[ i ] > 1.0
		) {
			throw new RangeError( 'invalid value. An `xRugOpacity` must be a number on the interval `[0,1]`. Value: `' + v[i] + '`.' );
		}
	}
	debug( 'Current value: %d.', this._xRugOpacity );

	this._xRugOpacity = v;
	debug( 'New Value: %d.', this._xRugOpacity );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-number":41,"@stdlib/assert/is-number-array":39,"debug":549}],417:[function(require,module,exports){
'use strict';

/**
* Returns the x-axis rug orientation.
*
* @private
* @returns {StringArray} orientation
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._xRugOrient.slice();
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],418:[function(require,module,exports){
arguments[4][402][0].apply(exports,arguments)
},{"dup":402}],419:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:set:xrugorient' );
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var isStringArray = require( '@stdlib/assert/is-string-array' ).primitives;
var indexOf = require( '@stdlib/utils/index-of' );
var ORIENTATIONS = require( './orientations.json' );


// MAIN //

/**
* Sets the x-axis rug orientation.
*
* @private
* @param {(string|StringArray)} v - rug orientation
* @throws {TypeError} must be either a string or string array
* @throws {TypeError} must be either `'bottom'` or `'top'`
*/
function set( v ) {
	/*jshint validthis: true */ // TODO: eslint
	var isStr = isString( v );
	var i;
	if (
		!isStr &&
		!isStringArray( v )
	) {
		throw new TypeError( 'invalid value. `xRugOrient` must be either a string or string array. Value: `' + v + '`.' );
	}
	if ( isStr ) {
		v = [ v ];
	} else {
		v = v.slice();
	}
	for ( i = 0; i < v.length; i++ ) {
		if ( indexOf( ORIENTATIONS, v[i] ) === -1 ) {
			throw new TypeError( 'invalid value. Unrecognized/unsupported orientation. An `xRugOrient` value must be one of `[' + ORIENTATIONS.join(',') + ']`. Value: `' + v[i] + '.`' );
		}
	}
	debug( 'Current value: %s.', this._xRugOrient );

	this._xRugOrient = v;
	debug( 'New value: %s.', this._xRugOrient );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"./orientations.json":418,"@stdlib/assert/is-string":62,"@stdlib/assert/is-string-array":60,"@stdlib/utils/index-of":503,"debug":549}],420:[function(require,module,exports){
'use strict';

/**
* Returns the x-axis rug tick (tassel) size.
*
* @private
* @returns {Array<NonNegativeInteger>} tick sizes
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._xRugSize.slice();
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],421:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:set:x-rug-size' );
var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
var isNonNegativeIntegerArray = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitiveNonNegativeIntegerArray;


// MAIN //

/**
* Sets the x-axis rug tick (tassel) size.
*
* @private
* @param {(NonNegativeInteger|Array<NonNegativeInteger>} v - size
* @throws {TypeError} must be a nonnegative integer or nonnegative integer array
*/
function set( v ) {
	/*jshint validthis: true */ // TODO: eslint
	var isInt = isNonNegativeInteger( v );
	if (
		!isInt &&
		!isNonNegativeIntegerArray( v )
	) {
		throw new TypeError( 'invalid value. `xRugSize` must be a nonnegative integer or nonnegative integer array. Value: `' + v + '.`' );
	}
	if ( isInt ) {
		v = [ v ];
	} else {
		v = v.slice();
	}
	debug( 'Current value: %d.', this._xRugSize );

	this._xRugSize = v;
	debug( 'New Value: %d.', this._xRugSize );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-nonnegative-integer":34,"debug":549}],422:[function(require,module,exports){
'use strict';

/**
* Returns whether a rug plot is displayed along the x-axis.
*
* @private
* @returns {BooleanArray} boolean flags
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._xRug.slice();
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],423:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:set:x-rug' );
var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
var isBooleanArray = require( '@stdlib/assert/is-boolean' ).isPrimitiveBooleanArray;


// MAIN //

/**
* Sets a flag indicating whether to display a rug plot along the x-axis.
*
* @private
* @param {(boolean|BooleanArray)} v - boolean flag(s) indicating whether to display a rug plot along the x-axis
* @throws {TypeError} must be a boolean primitive or boolean array
*/
function set( v ) {
	/*jshint validthis: true */ // TODO: eslint
	var isBool = isBoolean( v );
	if (
		!isBool &&
		!isBooleanArray( v )
	) {
		throw new TypeError( 'invalid value. `xRug` must be a boolean or boolean array. Value: `' + v + '.`' );
	}
	if ( isBool ) {
		v = [ v ];
	}
	debug( 'Current value: %d.', this._xRug );

	this._xRug = v;
	debug( 'New Value: %d.', this._xRug );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-boolean":10,"debug":549}],424:[function(require,module,exports){
'use strict';

// MODULES //

var linear = require( 'd3-scale' ).scaleLinear; // TODO: remove
var time = require( 'd3-scale' ).scaleTime; // TODO: remove


// MAIN //

/**
* Returns a scale function for mapping values to a coordinate along the x-axis.
*
* @private
* @returns {Function} scale function
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	var scale;
	if ( this._xScale === 'time' ) {
		scale = time()
			.domain( this.xDomain )
			.range( this.xRange );
	} else if ( this._xScale === 'linear' ) {
		scale = linear()
			.domain( this.xDomain )
			.range( this.xRange );
	}
	// TODO: other scales
	return scale;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{"d3-scale":545}],425:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:set:xscale' );
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;


// MAIN //

/**
* Sets the x-axis scale.
*
* @private
* @param {string} scale - axis scale
* @throws {TypeError} must be a string primitive
*/
function set( scale ) {
	/*jshint validthis: true */ // TODO: eslint
	if ( !isString( scale ) ) {
		throw new TypeError( 'invalid value. `xScale` must be a string. Value: `' + scale + '.`' );
	}
	// TODO: test for valid scale

	debug( 'Current value: %s.', this._xScale );

	this._xScale = scale;
	debug( 'New value: %s.', this._xScale );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-string":62,"debug":549}],426:[function(require,module,exports){
'use strict';

// MODULES //

var isNull = require( '@stdlib/assert/is-null' );
var format = require( 'd3-format' ).format; // TODO: remove
var timeFormat = require( 'd3-time-format' ).timeFormat; // TODO: remove


// MAIN //

/**
* Returns the x-axis tick format.
*
* @private
* @returns {(Function|null)} format function or null
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	if ( isNull( this._xTickFormat ) ) {
		return this._xTickFormat;
	}
	if ( this._xScale === 'time' ) {
		return timeFormat( this._xTickFormat );
	}
	return format( this._xTickFormat );
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{"@stdlib/assert/is-null":37,"d3-format":542,"d3-time-format":547}],427:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:set:xtickformat' );
var isNull = require( '@stdlib/assert/is-null' );
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;


// MAIN //

/**
* Sets the x-axis tick format.
*
* @private
* @param {(string|null)} fmt - axis tick format
* @throws {TypeError} must be a string primitive
*/
function set( fmt ) {
	/*jshint validthis: true */ // TODO: eslint
	if (
		!isNull( fmt ) &&
		!isString( fmt )
	) {
		throw new TypeError( 'invalid value. `xTickFormat` must be a string or null. Value: `' + fmt + '.`' );
	}
	debug( 'Current value: %s.', this._xTickFormat );

	this._xTickFormat = fmt;
	debug( 'New value: %s.', this._xTickFormat );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-null":37,"@stdlib/assert/is-string":62,"debug":549}],428:[function(require,module,exports){
'use strict';

/**
* Returns the plot `x` values.
*
* @private
* @returns {Array} x values
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._xData.slice();
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],429:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:set:x' );
var isArray = require( '@stdlib/assert/is-array' );


// MAIN //

/**
* Sets the plot `x` values.
*
* @private
* @param {Array} x - x values
* @throws {TypeError} must be an array
*/
function set( x ) {
	/*jshint validthis: true */ // TODO: eslint
	if ( !isArray( x ) ) {
		throw new TypeError( 'invalid value. `x` must be an array. Value: `' + x + '.`' );
	}
	debug( 'Current value: %s.', JSON.stringify( this._xData ) );

	this._xData = x.slice();
	debug( 'New Value: %s.', JSON.stringify( this._xData ) );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-array":7,"debug":549}],430:[function(require,module,exports){
'use strict';

/**
* Returns the y-axis orientation.
*
* @private
* @returns {string} orientation
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._yAxisOrient;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],431:[function(require,module,exports){
module.exports=[
	"left",
	"right"
]

},{}],432:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:set:yaxisorient' );
var indexOf = require( '@stdlib/utils/index-of' );
var ORIENTATIONS = require( './orientations.json' );


// MAIN //

/**
* Sets the y-axis orientation.
*
* @private
* @param {string} orientation - axis orientation
* @throws {TypeError} must be either `'left'` or `'right'`
*/
function set( orientation ) {
	/*jshint validthis: true */ // TODO: eslint
	if ( indexOf( ORIENTATIONS, orientation ) === -1 ) {
		throw new TypeError( 'invalid value. `yAxisOrient` must be one of `[' + ORIENTATIONS.join(',') + ']`. Value: `' + orientation + '.`' );
	}
	debug( 'Current value: %s.', this._yAxisOrient );

	this._yAxisOrient = orientation;
	debug( 'New value: %s.', this._yAxisOrient );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"./orientations.json":431,"@stdlib/utils/index-of":503,"debug":549}],433:[function(require,module,exports){
'use strict';

/**
* Returns the y-axis domain.
*
* @private
* @returns {NumberArray} domain
*/
function get() {
	/* jshint validthis:true */ // TODO: eslint
	return [ this.yMin, this.yMax ];
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],434:[function(require,module,exports){
'use strict';

/**
* Returns the y-axis label.
*
* @private
* @returns {string} label
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._yLabel;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],435:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:set:ylabel' );
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;


// MAIN //

/**
* Sets the y-axis label.
*
* @private
* @param {string} label - axis label
* @throws {TypeError} must be a string primitive
*/
function set( label ) {
	/*jshint validthis: true */ // TODO: eslint
	if ( !isString( label ) ) {
		throw new TypeError( 'invalid value. `yLabel` must be a string. Value: `' + label + '.`' );
	}
	debug( 'Current value: %s.', this._yLabel );

	this._yLabel = label;
	debug( 'New value: %s.', this._yLabel );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-string":62,"debug":549}],436:[function(require,module,exports){
'use strict';

// MODULES //

var isNull = require( '@stdlib/assert/is-null' );
var max = require( './../../utils/max.js' ); // TODO: replace with mod when written


// FUNCTIONS //

/**
* Computes a maximum value.
*
* @private
* @param {Array<NumericArray>} arr - input array
* @returns {(number|null)} maximum value or null
*/
function getMax( arr ) {
	var tmp;
	var i;
	if ( arr.length === 0 ) {
		return null;
	}
	tmp = new Array( arr.length );
	for ( i = 0; i < arr.length; i++ ) {
		tmp[ i ] = max( arr[ i ] );
	}
	return max( tmp );
} // end FUNCTION getMax


// MAIN //

/**
* Returns the maximum value of the y-axis domain.
*
* @private
* @returns {number} maximum value
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	var max;
	if ( isNull( this._yMax ) ) {
		max = getMax( this._yData );
		return ( isNull( max ) ) ? 1.0 : max;
	}
	return this._yMax;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{"./../../utils/max.js":473,"@stdlib/assert/is-null":37}],437:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:set:ymax' );
var isNull = require( '@stdlib/assert/is-null' );
var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;


// MAIN //

/**
* Sets the maximum value of the y-axis domain.
*
* @private
* @param {(FiniteNumber|null)} min - maximum value
* @throws {TypeError} must be a finite number primitive or null
*/
function set( max ) {
	/*jshint validthis: true */ // TODO: eslint
	if (
		!isNull( max ) &&
		!isNumber( max ) // FIXME: finite number
	) {
		throw new TypeError( 'invalid value. `yMax` must be either a finite number or null. Value: `' + max + '.`' );
	}
	debug( 'Current value: %d.', this._yMax );

	this._yMax = max;
	debug( 'New value: %d.', this._yMax );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-null":37,"@stdlib/assert/is-number":41,"debug":549}],438:[function(require,module,exports){
'use strict';

// MODULES //

var isNull = require( '@stdlib/assert/is-null' );
var min = require( './../../utils/min.js' ); // TODO: replace with mod when written


// FUNCTIONS //

/**
* Computes a minimum value.
*
* @private
* @param {Array<NumericArray>} arr - input array
* @returns {(number|null)} minimum value or null
*/
function getMin( arr ) {
	var tmp;
	var i;
	if ( arr.length === 0 ) {
		return null;
	}
	tmp = new Array( arr.length );
	for ( i = 0; i < arr.length; i++ ) {
		tmp[ i ] = min( arr[ i ] );
	}
	return min( tmp );
} // end FUNCTION getMin


// MAIN //

/**
* Returns the minimum value of the y-axis domain.
*
* @private
* @returns {number} minimum value
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	var min;
	if ( isNull( this._yMin ) ) {
		min = getMin( this._yData );
		return ( isNull( min ) ) ? 0.0 : min;
	}
	return this._yMin;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{"./../../utils/min.js":474,"@stdlib/assert/is-null":37}],439:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:set:ymin' );
var isNull = require( '@stdlib/assert/is-null' );
var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;


// MAIN //

/**
* Sets the minimum value of the y-axis domain.
*
* @private
* @param {(FiniteNumber|null)} min - minimum value
* @throws {TypeError} must be a finite number primitive or null
*/
function set( min ) {
	/*jshint validthis: true */ // TODO: eslint
	if (
		!isNull( min ) &&
		!isNumber( min ) // FIXME: finite number
	) {
		throw new TypeError( 'invalid value. `yMin` must be either a finite number or null. Value: `' + min + '.`' );
	}
	debug( 'Current value: %d.', this._yMin );

	this._yMin = min;
	debug( 'New value: %d.', this._yMin );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-null":37,"@stdlib/assert/is-number":41,"debug":549}],440:[function(require,module,exports){
'use strict';

/**
* Returns the number of y-axis tick marks.
*
* @private
* @returns {(NonNegativeInteger|null)} number of ticks
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._yNumTicks;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],441:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:set:ynumticks' );
var isNull = require( '@stdlib/assert/is-null' );
var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;


// MAIN //

/**
* Sets the number of y-axis tick marks.
*
* @private
* @param {(NonNegativeInteger|null)} ticks - number of ticks
* @throws {TypeError} must be a nonnegative integer or null
*/
function set( ticks ) {
	/*jshint validthis: true */ // TODO: eslint
	if (
		!isNull( ticks ) &&
		!isNonNegativeInteger( ticks )
	) {
		throw new TypeError( 'invalid value. `yNumTicks` must be a nonnegative integer or null. Value: `' + ticks + '.`' );
	}
	debug( 'Current value: %d.', this._yNumTicks );

	this._yNumTicks = ticks;
	debug( 'New value: %d.', this._yNumTicks );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-nonnegative-integer":34,"@stdlib/assert/is-null":37,"debug":549}],442:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:ypos' );


// MAIN //

/**
* Returns a function to map values to y-axis coordinate values.
*
* @private
* @returns {Function} map function
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	var scale = this.yScale;
	/**
	* Maps a value to a y-axis coordinate value.
	*
	* @private
	* @param {number} d - datum
	* @returns {number} pixel value
	*/
	return function yPos( d ) {
		var px = scale( d );
		debug( 'Value: %d => Pixel: %d.', d, px );
		return px;
	}; // end FUNCTION yPos()
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{"debug":549}],443:[function(require,module,exports){
'use strict';

/**
* Returns the y-axis range.
*
* @private
* @returns {NumberArray} range
*/
function get() {
	/* jshint validthis:true */ // TODO: eslint
	return [ this.graphHeight, 0 ];
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],444:[function(require,module,exports){
'use strict';

/**
* Returns the y-axis rug opacity.
*
* @private
* @returns {NumberArray} rug opacities
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._yRugOpacity.slice();
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],445:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:set:y-rug-opacity' );
var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;
var isNumberArray = require( '@stdlib/assert/is-number-array' ).primitives;


// MAIN //

/**
* Sets the y-axis rug opacity.
*
* @private
* @param {(number|NumberArray)} v - opacity
* @throws {TypeError} must be a number or number array
* @throws {RangeError} must be a number on the interval `[0,1]`
*/
function set( v ) {
	/*jshint validthis: true */ // TODO: eslint
	var isNum = isNumber( v );
	var i;
	if (
		!isNum &&
		!isNumberArray( v )
	) {
		throw new TypeError( 'invalid value. `yRugOpacity` must be a number or number array. Value: `' + v + '.`' );
	}
	if ( isNum ) {
		v = [ v ];
	} else {
		v = v.slice();
	}
	for ( i = 0; i < v.length; i++ ) {
		if (
			v[ i ] < 0.0 ||
			v[ i ] > 1.0
		) {
			throw new RangeError( 'invalid value. A `yRugOpacity` must be a number on the interval `[0,1]`. Value: `' + v[i] + '`.' );
		}
	}
	debug( 'Current value: %d.', this._yRugOpacity );

	this._yRugOpacity = v;
	debug( 'New Value: %d.', this._yRugOpacity );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-number":41,"@stdlib/assert/is-number-array":39,"debug":549}],446:[function(require,module,exports){
'use strict';

/**
* Returns the y-axis rug orientation.
*
* @private
* @returns {StringArray} orientation
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._yRugOrient.slice();
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],447:[function(require,module,exports){
arguments[4][431][0].apply(exports,arguments)
},{"dup":431}],448:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:set:yrugorient' );
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var isStringArray = require( '@stdlib/assert/is-string-array' ).primitives;
var indexOf = require( '@stdlib/utils/index-of' );
var ORIENTATIONS = require( './orientations.json' );


// MAIN //

/**
* Sets the y-axis rug orientation.
*
* @private
* @param {(string|StringArray)} v - rug orientation
* @throws {TypeError} must be either a string or string array
* @throws {TypeError} must be either `'bottom'` or `'top'`
*/
function set( v ) {
	/*jshint validthis: true */ // TODO: eslint
	var isStr = isString( v );
	var i;
	if (
		!isStr &&
		!isStringArray( v )
	) {
		throw new TypeError( 'invalid value. `yRugOrient` must be either a string or string array. Value: `' + v + '`.' );
	}
	if ( isStr ) {
		v = [ v ];
	} else {
		v = v.slice();
	}
	for ( i = 0; i < v.length; i++ ) {
		if ( indexOf( ORIENTATIONS, v[i] ) === -1 ) {
			throw new TypeError( 'invalid value. Unrecognized/unsupported orientation. A `yRugOrient` value must be one of `[' + ORIENTATIONS.join(',') + ']`. Value: `' + v[i] + '.`' );
		}
	}
	debug( 'Current value: %s.', this._yRugOrient );

	this._yRugOrient = v;
	debug( 'New value: %s.', this._yRugOrient );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"./orientations.json":447,"@stdlib/assert/is-string":62,"@stdlib/assert/is-string-array":60,"@stdlib/utils/index-of":503,"debug":549}],449:[function(require,module,exports){
'use strict';

/**
* Returns the y-axis rug tick (tassel) size.
*
* @private
* @returns {Array<NonNegativeInteger>} tick sizes
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._yRugSize.slice();
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],450:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:set:y-rug-size' );
var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
var isNonNegativeIntegerArray = require( '@stdlib/assert/is-nonnegative-integer' ).isNonNegativePrimitiveIntegerArray;


// MAIN //

/**
* Sets the y-axis rug tick (tassel) size.
*
* @private
* @param {(NonNegativeInteger|Array<NonNegativeInteger>} v - size
* @throws {TypeError} must be a nonnegative integer or nonnegative integer array
*/
function set( v ) {
	/*jshint validthis: true */ // TODO: eslint
	var isInt = isNonNegativeInteger( v );
	if (
		!isInt &&
		!isNonNegativeIntegerArray( v )
	) {
		throw new TypeError( 'invalid value. `yRugSize` must be a nonnegative integer or nonnegative integer array. Value: `' + v + '.`' );
	}
	if ( isInt ) {
		v = [ v ];
	} else {
		v = v.slice();
	}
	debug( 'Current value: %d.', this._yRugSize );

	this._yRugSize = v;
	debug( 'New Value: %d.', this._yRugSize );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-nonnegative-integer":34,"debug":549}],451:[function(require,module,exports){
'use strict';

/**
* Returns whether a rug plot is displayed along the y-axis.
*
* @private
* @returns {BooleanArray} boolean flag
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._yRug.slice();
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],452:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:set:y-rug' );
var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
var isBooleanArray = require( '@stdlib/assert/is-boolean' ).isPrimitiveBooleanArray;


// MAIN //

/**
* Sets a flag indicating whether to display a rug plot along the y-axis.
*
* @private
* @param {(boolean|BooleanArray)} v - boolean flag(s) indicating whether to display a rug plot along the y-axis
* @throws {TypeError} must be a boolean primitive or boolean array
*/
function set( v ) {
	/*jshint validthis: true */ // TODO: eslint
	var isBool = isBoolean( v );
	if (
		!isBool &&
		!isBooleanArray( v )
	) {
		throw new TypeError( 'invalid value. `yRug` must be a boolean or boolean array. Value: `' + v + '.`' );
	}
	if ( isBool ) {
		v = [ v ];
	}
	debug( 'Current value: %d.', this._yRug );

	this._yRug = v;
	debug( 'New Value: %d.', this._yRug );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-boolean":10,"debug":549}],453:[function(require,module,exports){
'use strict';

// MODULES //

var linear = require( 'd3-scale' ).scaleLinear; // TODO: remove
var time = require( 'd3-scale' ).scaleTime; // TODO: remove


// MAIN //

/**
* Returns a scale function for mapping values to a coordinate along the y-axis.
*
* @private
* @returns {Function} scale function
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	var scale;
	if ( this._yScale === 'time' ) {
		scale = time()
			.domain( this.yDomain )
			.range( this.yRange );
	} else if ( this._yScale === 'linear' ) {
		scale = linear()
			.domain( this.yDomain )
			.range( this.yRange );
	}
	// TODO: other scales
	return scale;
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{"d3-scale":545}],454:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:set:yscale' );
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;


// MAIN //

/**
* Sets the y-axis scale.
*
* @private
* @param {string} scale - axis scale
* @throws {TypeError} must be a string primitive
*/
function set( scale ) {
	/*jshint validthis: true */ // TODO: eslint
	if ( !isString( scale ) ) {
		throw new TypeError( 'invalid value. `yScale` must be a string. Value: `' + scale + '.`' );
	}
	// TODO: test for valid scale

	debug( 'Current value: %s.', this._yScale );

	this._yScale = scale;
	debug( 'New value: %s.', this._yScale );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-string":62,"debug":549}],455:[function(require,module,exports){
'use strict';

// MODULES //

var isNull = require( '@stdlib/assert/is-null' );
var format = require( 'd3-format' ).format; // TODO: remove
var timeFormat = require( 'd3-time-format' ).timeFormat; // TODO: remove


// MAIN //

/**
* Returns the y-axis tick format.
*
* @private
* @returns {(Function|null)} format function or null
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	if ( isNull( this._yTickFormat ) ) {
		return this._yTickFormat;
	}
	if ( this._yScale === 'time' ) {
		return timeFormat( this._yTickFormat );
	}
	return format( this._yTickFormat );
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{"@stdlib/assert/is-null":37,"d3-format":542,"d3-time-format":547}],456:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:set:ytickformat' );
var isNull = require( '@stdlib/assert/is-null' );
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;


// MAIN //

/**
* Sets the y-axis tick format.
*
* @private
* @param {(string|null)} fmt - axis tick format
* @throws {TypeError} must be a string primitive or null
*/
function set( fmt ) {
	/*jshint validthis: true */ // TODO: eslint
	if (
		!isNull( fmt ) &&
		!isString( fmt )
	) {
		throw new TypeError( 'invalid value. `yTickFormat` must be a string or null. Value: `' + fmt + '.`' );
	}
	debug( 'Current value: %s.', this._yTickFormat );

	this._yTickFormat = fmt;
	debug( 'New value: %s.', this._yTickFormat );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-null":37,"@stdlib/assert/is-string":62,"debug":549}],457:[function(require,module,exports){
'use strict';

/**
* Returns the plot `y` values.
*
* @private
* @returns {Array} y values
*/
function get() {
	/* jshint validthis: true */ // TODO: eslint
	return this._yData.slice();
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],458:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:set:y' );
var isArray = require( '@stdlib/assert/is-array' );


// MAIN //

/**
* Sets the plot `y` values.
*
* @private
* @param {Array} y - y values
* @throws {TypeError} must be an array
*/
function set( y ) {
	/*jshint validthis: true */ // TODO: eslint
	if ( !isArray( y ) ) {
		throw new TypeError( 'invalid value. `y` must be an array. Value: `' + y + '.`' );
	}
	debug( 'Current value: %s.', JSON.stringify( this._yData ) );

	this._yData = y.slice();
	debug( 'New Value: %s.', JSON.stringify( this._yData ) );

	this.emit( 'change' );
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"@stdlib/assert/is-array":7,"debug":549}],459:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:render' );
var renderSVG = require( './svg' );
var validate = require( './validate.js' );


// MAIN //

/**
* Renders a plot as a virtual DOM tree.
*
* @private
* @returns {VTree} virtual tree
*/
function render() {
	/* jshint validthis: true */ // TODO: eslint
	var out;

	debug( 'Validating render state...' );
	validate( this );

	debug( 'Rendering...' );
	if ( this._engine === 'svg' ) {
		out = renderSVG( this );
		this.emit( 'render', out );
		return out;
	}
} // end FUNCTION render()


// EXPORTS //

module.exports = render;

},{"./svg":460,"./validate.js":472,"debug":549}],460:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:render:svg:main' );
var xAxisTransform = require( './utils/x_axis_transform.js' );
var yAxisTransform = require( './utils/y_axis_transform.js' );
var renderMarks = require( './marks' );
var init = require( './init.js' );
var sync = require( './sync.js' );


// MAIN //

/**
* Renders a virtual DOM tree.
*
* @private
* @param {Object} state - state
* @returns {VTree} virtual tree
*/
function render( state ) {
	var annotations;
	var clipPath;
	var canvas;
	var title;
	var graph;
	var marks;
	var xAxis;
	var yAxis;
	var bkgd;
	var defs;
	var svg;

	svg = state.$.svg;

	// Lazily initialize...
	if ( !svg.canvas ) {
		debug( 'Initializing components...' );
		init( state );
	}
	debug( 'Syncing component states...' );
	sync( state );

	debug( 'Rendering individual components...' );

	debug( 'Rendering annotations...' );
	annotations = svg.annotations.render();

	debug( 'Rendering clip-path...' );
	clipPath = svg.clipPath.render();

	debug( 'Rendering canvas...' );
	canvas = svg.canvas.render();

	debug( 'Rendering graph...' );
	graph = svg.graph.render();

	debug( 'Rendering title...' );
	title = svg.title.render();

	debug( 'Rendering x-axis...' );
	xAxis = svg.xAxis.render();

	debug( 'Rendering y-axis...' );
	yAxis = svg.yAxis.render();

	debug( 'Rendering background...' );
	bkgd = svg.bkgd.render();

	debug( 'Rendering definitions...' );
	defs = svg.defs.render();

	debug( 'Rendering marks...' );
	marks = renderMarks( state );

	debug( 'Updating rendered components...' );

	debug( 'Updating title...' );
	title.properties.attributes.x = state.paddingLeft + state.graphWidth / 2;
	title.properties.attributes.y = state.paddingTop / 2;

	debug( 'Updating x-axis...' );
	xAxis.properties.className += ' x';
	xAxis.properties.attributes.transform = xAxisTransform( state.xAxisOrient, state.graphHeight );

	debug( 'Updating y-axis...' );
	yAxis.properties.className += ' y';
	yAxis.properties.attributes.transform = yAxisTransform( state.yAxisOrient, state.graphWidth );

	debug( 'Assembling virtual tree...' );

	debug( 'Inserting clip-path into definitions...' );
	defs.children.push( clipPath );
	defs.count += clipPath.count;

	debug( 'Inserting background into graph...' );
	graph.children.push( bkgd );
	graph.count += bkgd.count;

	debug( 'Inserting marks into graph...' );
	graph.children.push( marks );
	graph.count += marks.count;

	debug( 'Inserting x-axis into graph...' );
	graph.children.push( xAxis );
	graph.count += xAxis.count;

	debug( 'Inserting y-axis into graph...' );
	graph.children.push( yAxis );
	graph.count += yAxis.count;

	debug( 'Inserting title into annotations...' );
	annotations.children.push( title );
	annotations.count += title.count;

	debug( 'Inserting definitions into canvas...' );
	canvas.children.push( defs );
	canvas.count += defs.count;

	debug( 'Inserting graph into canvas...' );
	canvas.children.push( graph );
	canvas.count += graph.count;

	debug( 'Inserting annotations into canvas...' );
	canvas.children.push( annotations );
	canvas.count += annotations.count;

	return canvas;
} // end FUNCTION render()


// EXPORTS //

module.exports = render;

},{"./init.js":461,"./marks":462,"./sync.js":467,"./utils/x_axis_transform.js":468,"./utils/y_axis_transform.js":470,"debug":549}],461:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:render:svg:init' );
var Annotations = require( '@stdlib/plot/components/svg/annotations' );
var ClipPath = require( '@stdlib/plot/components/svg/clip-path' );
var Canvas = require( '@stdlib/plot/components/svg/canvas' );
var Graph = require( '@stdlib/plot/components/svg/graph' );
var Title = require( '@stdlib/plot/components/svg/title' );
var Marks = require( '@stdlib/plot/components/svg/marks' );
var Bkgd = require( '@stdlib/plot/components/svg/background' );
var Defs = require( '@stdlib/plot/components/svg/defs' );
var Axis = require( '@stdlib/plot/components/svg/axis' );
var Path = require( '@stdlib/plot/components/svg/path' );
var Symbols = require( '@stdlib/plot/components/svg/symbols' );
var Rug = require( '@stdlib/plot/components/svg/rug' );


// MAIN //

/**
* Initializes SVG components.
*
* @private
* @param {Object} state - state
*/
function init( state ) {
	var svg = state.$.svg;

	debug( 'Initializing components...' );

	debug( 'Initializing canvas component...' );
	Object.defineProperty( svg, 'canvas', {
		'configurable': false,
		'enumerable': false,
		'writable': false,
		'value': new Canvas({
			'autoRender': false
		})
	});

	debug( 'Initializing definitions component...' );
	Object.defineProperty( svg, 'defs', {
		'configurable': false,
		'enumerable': false,
		'writable': false,
		'value': new Defs({
			'autoRender': false
		})
	});

	debug( 'Initializing clipping path component...' );
	Object.defineProperty( svg, 'clipPath', {
		'configurable': false,
		'enumerable': false,
		'writable': false,
		'value': new ClipPath({
			'autoRender': false,
			'id': state._clipPathId
		})
	});

	debug( 'Initializing graph component...' );
	Object.defineProperty( svg, 'graph', {
		'configurable': false,
		'enumerable': false,
		'writable': false,
		'value': new Graph({
			'autoRender': false
		})
	});

	debug( 'Initializing annotations component...' );
	Object.defineProperty( svg, 'annotations', {
		'configurable': false,
		'enumerable': false,
		'writable': false,
		'value': new Annotations({
			'autoRender': false
		})
	});

	debug( 'Initializing title component...' );
	Object.defineProperty( svg, 'title', {
		'configurable': false,
		'enumerable': false,
		'writable': false,
		'value': new Title({
			'autoRender': false
		})
	});

	debug( 'Initializing background component...' );
	Object.defineProperty( svg, 'bkgd', {
		'configurable': false,
		'enumerable': false,
		'writable': false,
		'value': new Bkgd({
			'autoRender': false
		})
	});

	debug( 'Initializing marks component...' );
	Object.defineProperty( svg, 'marks', {
		'configurable': false,
		'enumerable': false,
		'writable': false,
		'value': new Marks({
			'autoRender': false,
			'clipPathId': state._clipPathId
		})
	});

	debug( 'Initializing path component...' );
	Object.defineProperty( svg, 'path', {
		'configurable': false,
		'enumerable': false,
		'writable': false,
		'value': new Path({
			'autoRender': false
		})
	});

	debug( 'Initializing symbols component...' );
	Object.defineProperty( svg, 'symbols', {
		'configurable': false,
		'enumerable': false,
		'writable': false,
		'value': new Symbols({
			'autoRender': false
		})
	});

	debug( 'Initializing x-axis rug component...' );
	Object.defineProperty( svg, 'xRug', {
		'configurable': false,
		'enumerable': false,
		'writable': false,
		'value': new Rug({
			'autoRender': false
		})
	});

	debug( 'Initializing y-axis rug component...' );
	Object.defineProperty( svg, 'yRug', {
		'configurable': false,
		'enumerable': false,
		'writable': false,
		'value': new Rug({
			'autoRender': false
		})
	});

	debug( 'Initializing x-axis component...' );
	Object.defineProperty( svg, 'xAxis', {
		'configurable': false,
		'enumerable': false,
		'writable': false,
		'value': new Axis({
			'autoRender': false
		})
	});

	debug( 'Initializing y-axis component...' );
	Object.defineProperty( svg, 'yAxis', {
		'configurable': false,
		'enumerable': false,
		'writable': false,
		'value': new Axis({
			'autoRender': false
		})
	});

	debug( 'All components initialized.' );
} // end FUNCTION init()


// EXPORTS //

module.exports = init;

},{"@stdlib/plot/components/svg/annotations":86,"@stdlib/plot/components/svg/axis":100,"@stdlib/plot/components/svg/background":155,"@stdlib/plot/components/svg/canvas":172,"@stdlib/plot/components/svg/clip-path":191,"@stdlib/plot/components/svg/defs":208,"@stdlib/plot/components/svg/graph":214,"@stdlib/plot/components/svg/marks":230,"@stdlib/plot/components/svg/path":243,"@stdlib/plot/components/svg/rug":276,"@stdlib/plot/components/svg/symbols":304,"@stdlib/plot/components/svg/title":337,"debug":549}],462:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:render:svg:marks' );
var lines = require( './lines.js' );
var symbols = require( './symbols.js' );
var xRug = require( './x_rug.js' );
var yRug = require( './y_rug.js' );


// MAIN //

/**
* Renders individual marks.
*
* @private
* @param {Object} state - state
* @returns {VTree} virtual tree
*/
function render( state ) {
	var parent;
	var marks;
	var len;
	var i;

	debug( 'Rendering marks group...' );
	parent = state.$.svg.marks.render();

	len = state.x.length;
	if ( len === 0 ) {
		debug( 'No individual marks to render.' );
		return parent;
	}
	marks = [];

	debug( 'Rendering lines...' );
	marks = marks.concat( lines( state ) );

	debug( 'Rendering symbols...' );
	marks = marks.concat( symbols( state ) );

	debug( 'Rendering x-axis rug plots...' );
	marks = marks.concat( xRug( state ) );

	debug( 'Rendering y-axis rug plots...' );
	marks = marks.concat( yRug( state ) );

	debug( 'Inserting individual marks into marks group...' );
	for ( i = 0; i < marks.length; i++ ) {
		parent.children.push( marks[i] );
		parent.count += marks[i].count;
	}
	debug( 'Finished rendering marks.' );
	return parent;
} // end FUNCTION render()


// EXPORTS //

module.exports = render;

},{"./lines.js":463,"./symbols.js":464,"./x_rug.js":465,"./y_rug.js":466,"debug":549}],463:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:render:svg:marks:lines' );


// MAIN //

/**
* Renders line marks.
*
* @private
* @param {Object} state - state
* @returns {VTree} virtual tree
*/
function render( state ) {
	var nOpacities;
	var lineStyle;
	var opacity;
	var nColors;
	var nStyles;
	var nWidths;
	var color;
	var width;
	var marks;
	var line;
	var len;
	var i;

	line = state.$.svg.path;
	nOpacities = state.lineOpacity.length;
	nStyles = state.lineStyle.length;
	nWidths = state.lineWidth.length;
	nColors = state.colors.length;

	len = state.x.length;
	marks = [];

	debug( 'Rendering lines...' );
	for ( i = 0; i < len; i++ ) {
		lineStyle = state.lineStyle[ i%nStyles ];
		debug( 'Line style: %s (%d).', lineStyle, i );

		if ( lineStyle === 'none' ) {
			debug( 'Line style (%d) is `none`. Skipping...', i );
			continue;
		}
		color = state.colors[ i%nColors ];
		debug( 'Line color: %s (%d).', color, i );

		opacity = state.lineOpacity[ i%nOpacities ];
		debug( 'Line opacity: %s (%d).', opacity, i );

		width = state.lineWidth[ i%nWidths ];
		debug( 'Line width: %s (%d).', width, i );

		line.x = state.x[ i ];
		line.y = state.y[ i ];
		line.style = lineStyle;
		line.label = state.labels[ i ] || '';
		line.color = color;
		line.opacity = opacity;
		line.width = width;

		debug( 'Rendering line %d...', i );
		marks.push( line.render() );
	}
	debug( 'Finished rendering lines.' );
	return marks;
} // end FUNCTION render()


// EXPORTS //

module.exports = render;

},{"debug":549}],464:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:render:svg:marks:symbols' );


// MAIN //

/**
* Renders symbols marks.
*
* @private
* @param {Object} state - state
* @returns {VTree} virtual tree
*/
function render( state ) {
	var nOpacities;
	var nSymbols;
	var nColors;
	var opacity;
	var nSizes;
	var symbol;
	var color;
	var marks;
	var size;
	var sym;
	var len;
	var i;

	sym = state.$.svg.symbols;
	nOpacities = state.symbolsOpacity.length;
	nSymbols = state.symbols.length;
	nColors = state.colors.length;
	nSizes = state.symbolsSize.length;

	len = state.x.length;
	marks = [];

	debug( 'Rendering symbols...' );
	for ( i = 0; i < len; i++ ) {
		symbol = state.symbols[ i%nSymbols ];
		debug( 'Symbol: %s (%d).', symbol, i );

		if ( symbol === 'none' ) {
			debug( 'Symbol (%d) is `none`. Skipping...', i );
			continue;
		}
		opacity = state.symbolsOpacity[ i%nOpacities ];
		debug( 'Symbols opacity: %d (%d).', opacity,i );

		size = state.symbolsSize[ i%nSizes ];
		debug( 'Symbols size: %d (%d).', size, i );

		color = state.colors[ i%nColors ];
		debug( 'Symbols color: %s (%d).', color, i );

		sym.x = state.x[ i ];
		sym.y = state.y[ i ];
		sym.symbol = symbol;
		sym.label = state.labels[ i ] || '';
		sym.color = color;
		sym.size = size;
		sym.opacity = opacity;

		debug( 'Rendering symbols %d...', i );
		marks.push( sym.render() );
	}
	debug( 'Finished rendering symbols.' );
	return marks;
} // end FUNCTION render()


// EXPORTS //

module.exports = render;

},{"debug":549}],465:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:render:svg:marks:x-rug' );
var xRugTransform = require( './../utils/x_rug_transform.js' );


// MAIN //

/**
* Renders x-axis rug plots.
*
* @private
* @param {Object} state - state
* @returns {VTree} virtual tree
*/
function render( state ) {
	var rugTransform;
	var nOpacities;
	var nOrients;
	var opacity;
	var nColors;
	var nSizes;
	var orient;
	var nFlgs;
	var color;
	var marks;
	var size;
	var rug;
	var len;
	var tmp;
	var i;

	rug = state.$.svg.xRug;

	nOpacities = state.xRugOpacity.length;
	nOrients = state.xRugOrient.length;
	nColors = state.colors.length;
	nSizes = state.xRugSize.length;
	nFlgs = state.xRug.length;

	len = state.x.length;
	marks = [];

	debug( 'Rendering x-axis rug plots...' );
	for ( i = 0; i < len; i++ ) {
		if ( !state.xRug[ i%nFlgs ] ) {
			debug( 'Rug plot (%d) disabled. Skipping...', i );
			continue;
		}
		color = state.colors[ i%nColors ];
		debug( 'Rug color: %s (%d).', color, i );

		opacity = state.xRugOpacity[ i%nOpacities ];
		debug( 'Rug opacity: %d (%d).', opacity, i );

		orient = state.xRugOrient[ i%nOrients ];
		debug( 'Rug orientation: %s (%d).', orient, i );

		size = state.xRugSize[ i%nSizes ];
		debug( 'Rug tick size: %d (%d).', size, i );

		rug.data = state.x[ i ];
		rug.label = state.labels[ i ] || '';
		rug.color = color;
		rug.size = size;
		rug.opacity = opacity;
		rug.orientation = orient;

		debug( 'Rendering x-axis rug %d...', i );
		tmp = rug.render();

		// Update the class name to indicate this is an x-axis rug and add a transform to translate the rug into position based on the graph dimensions.
		tmp.properties.className += ' x';
		rugTransform = xRugTransform( orient, state.graphHeight );
		if ( !tmp.properties.attributes ) {
			tmp.properties.attributes = {};
		}
		tmp.properties.attributes.transform = rugTransform;

		marks.push( tmp );
	}
	debug( 'Finished rendering x-axis rug plots.' );
	return marks;
} // end FUNCTION render()


// EXPORTS //

module.exports = render;

},{"./../utils/x_rug_transform.js":469,"debug":549}],466:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:render:svg:marks:y-rug' );
var yRugTransform = require( './../utils/y_rug_transform.js' );


// MAIN //

/**
* Renders y-axis rug plots.
*
* @private
* @param {Object} state - state
* @returns {VTree} virtual tree
*/
function render( state ) {
	var rugTransform;
	var nOpacities;
	var nOrients;
	var opacity;
	var nColors;
	var nSizes;
	var orient;
	var nFlgs;
	var color;
	var marks;
	var size;
	var rug;
	var len;
	var tmp;
	var i;

	rug = state.$.svg.yRug;

	nOpacities = state.yRugOpacity.length;
	nOrients = state.yRugOrient.length;
	nColors = state.colors.length;
	nSizes = state.yRugSize.length;
	nFlgs = state.yRug.length;

	len = state.y.length;
	marks = [];

	debug( 'Rendering y-axis rug plots...' );
	for ( i = 0; i < len; i++ ) {
		if ( !state.yRug[ i%nFlgs ] ) {
			debug( 'Rug plot (%d) disabled. Skipping...', i );
			continue;
		}
		color = state.colors[ i%nColors ];
		debug( 'Rug color: %s (%d).', color, i );

		opacity = state.yRugOpacity[ i%nOpacities ];
		debug( 'Rug opacity: %d (%d).', opacity, i );

		orient = state.yRugOrient[ i%nOrients ];
		debug( 'Rug orientation: %s (%d).', orient, i );

		size = state.yRugSize[ i%nSizes ];
		debug( 'Rug tick size: %d (%d).', size, i );

		rug.data = state.y[ i ];
		rug.label = state.labels[ i ] || '';
		rug.color = color;
		rug.size = size;
		rug.opacity = opacity;
		rug.orientation = orient;

		debug( 'Rendering y-axis rug %d...', i );
		tmp = rug.render();

		// Update the class name to indicate this is a y-axis rug and add a transform to translate the rug into position based on the graph dimensions.
		tmp.properties.className += ' y';
		rugTransform = yRugTransform( orient, state.graphWidth );
		if ( !tmp.properties.attributes ) {
			tmp.properties.attributes = {};
		}
		tmp.properties.attributes.transform = rugTransform;

		marks.push( tmp );
	}
	debug( 'Finished rendering y-axis rug plots.' );
	return marks;
} // end FUNCTION render()


// EXPORTS //

module.exports = render;

},{"./../utils/y_rug_transform.js":471,"debug":549}],467:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:render:svg:sync' );


// MAIN //

/**
* Syncs SVG components with the current state.
*
* @private
* @param {Object} state - state
*/
function sync( state ) {
	var svg = state.$.svg;

	debug( 'Syncing...' );

	debug( 'Syncing canvas...' );
	svg.canvas.width = state.width;
	svg.canvas.height = state.height;

	debug( 'Syncing definitions...' );
	// ...

	debug( 'Syncing clipping path...' );
	svg.clipPath.width = state.graphWidth;
	svg.clipPath.height = state.graphHeight;

	debug( 'Syncing graph...' );
	svg.graph.translateX = state.paddingLeft;
	svg.graph.translateY = state.paddingTop;

	debug( 'Syncing annotations...' );
	// ...

	debug( 'Syncing title...' );
	svg.title.text = state.title;

	debug( 'Syncing background...' );
	svg.bkgd.width = state.graphWidth;
	svg.bkgd.height = state.graphHeight;

	debug( 'Syncing marks...' );
	svg.marks.clipPathId = state._clipPathId;

	debug( 'Syncing path...' );
	svg.path.xScale = state.xScale;
	svg.path.yScale = state.yScale;
	// svg.path.isDefined = state.isDefined; // TODO

	debug( 'Syncing symbols...' );
	svg.symbols.xScale = state.xScale;
	svg.symbols.yScale = state.yScale;
	// svg.symbols.isDefined = state.isDefined; // TODO

	debug( 'Syncing x-axis rug...' );
	svg.xRug.scale = state.xScale;
	// svg.xRug.isDefined = state.isDefined; // TODO

	debug( 'Syncing y-axis rug...' );
	svg.yRug.scale = state.yScale;
	// svg.yRug.isDefined = state.isDefined; // TODO

	debug( 'Syncing x-axis...' );
	svg.xAxis.scale = state.xScale;
	svg.xAxis.label = state.xLabel;
	svg.xAxis.tickFormat = state.xTickFormat;
	svg.xAxis.numTicks = state.xNumTicks;
	svg.xAxis.orientation = state.xAxisOrient;

	debug( 'Syncing y-axis...' );
	svg.yAxis.scale = state.yScale;
	svg.yAxis.label = state.yLabel;
	svg.yAxis.tickFormat = state.yTickFormat;
	svg.yAxis.numTicks = state.yNumTicks;
	svg.yAxis.orientation = state.yAxisOrient;

	debug( 'Sync complete.' );
} // end FUNCTION sync()


// EXPORTS //

module.exports = sync;

},{"debug":549}],468:[function(require,module,exports){
'use strict';

/**
* Returns an x-axis translation transform.
*
* @private
* @param {string} orient - axis orientation
* @param {number} height - graph height
* @returns {string} transform
*/
function xAxisTransform( orient, height ) {
	if ( orient === 'top' ) {
		return 'translate(0,0)';
	}
	return 'translate(0,'+height+')';
} // end FUNCTION xAxisTransform()


// EXPORTS //

module.exports = xAxisTransform;

},{}],469:[function(require,module,exports){
'use strict';

/**
* Returns an x-axis rug translation transform.
*
* @private
* @param {string} orient - axis orientation
* @param {number} height - graph height
* @returns {string} transform
*/
function xRugTransform( orient, height ) {
	if ( orient === 'top' ) {
		return 'translate(0,0)';
	}
	return 'translate(0,'+height+')';
} // end FUNCTION xRugTransform()


// EXPORTS //

module.exports = xRugTransform;

},{}],470:[function(require,module,exports){
'use strict';

/**
* Returns a y-axis translation transform.
*
* @private
* @param {string} orient - axis orientation
* @param {number} width - graph width
* @returns {string} transform
*/
function yAxisTransform( orient, width ) {
	if ( orient === 'left' ) {
		return 'translate(0,0)';
	}
	return 'translate('+width+',0)';
} // end FUNCTION yAxisTransform()


// EXPORTS //

module.exports = yAxisTransform;

},{}],471:[function(require,module,exports){
'use strict';

/**
* Returns a y-axis rug translation transform.
*
* @private
* @param {string} orient - axis orientation
* @param {number} width - graph width
* @returns {string} transform
*/
function yRugTransform( orient, width ) {
	if ( orient === 'left' ) {
		return 'translate(0,0)';
	}
	return 'translate('+width+',0)';
} // end FUNCTION yRugTransform()


// EXPORTS //

module.exports = yRugTransform;

},{}],472:[function(require,module,exports){
'use strict';

/**
* Validates that an instance is in a valid state for rendering.
*
* @private
* @param {Object} state - state
* @throws {Error} must be in a valid state to render
*/
function validate( state ) {
	var x;
	var y;
	var i;

	x = state._xData;
	y = state._yData;
	if ( x.length !== y.length ) {
		throw new Error( 'invalid state. `x` and `y` are different lengths. `x` length: '+x.length+', `y` length: '+y.length+'.' );
	}
	// TODO: will need to refactor to some degree to support `ndarray`-like `x` and `y`
	for ( i = 0; i < x.length; i++ ) {
		if ( x[ i ].length !== y[ i ].length ) {
			throw new Error( 'invalid state. Each `x[i]:y[i]` pair must be the same length. x['+i+'].length: '+x[i].length+', y['+i+'].length: '+y[i].length+'.' );
		}
	}
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;

},{}],473:[function(require,module,exports){
'use strict';

/**
* Computes a maximum value.
*
* @private
* @param {NumericArray} arr - input array
* @returns {(number|null)} maximum value or null
*/
function getMax( arr ) {
	var max;
	var i;
	if ( arr.length === 0 ) {
		return null;
	}
	max = arr[ 0 ];
	for ( i = 1; i < arr.length; i++ ) {
		if ( arr[ i ] > max ) {
			max = arr[ i ];
		}
	}
	return max;
} // end FUNCTION getMax()


// EXPORTS //

module.exports = getMax;

},{}],474:[function(require,module,exports){
'use strict';

/**
* Computes a minimum value.
*
* @private
* @param {NumericArray} arr - input array
* @returns {(number|null)} minimum value or null
*/
function getMin( arr ) {
	var min;
	var i;
	if ( arr.length === 0 ) {
		return null;
	}
	min = arr[ 0 ];
	for ( i = 1; i < arr.length; i++ ) {
		if ( arr[ i ] < min ) {
			min = arr[ i ];
		}
	}
	return min;
} // end FUNCTION getMin


// EXPORTS //

module.exports = getMin;

},{}],475:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'plot:view' );
var _view = require( './view.js' );


// MAIN //

/**
* Generates a plot view.
*
* @private
* @param {string} viewer - plot viewer
*/
function view( viewer ) {
	/* jshint validthis: true */ // TODO: eslint
	var tmp = this.viewer;
	if ( arguments.length ) {
		// Temporarily set the viewer:
		this.viewer = viewer;
	}
	debug( 'Viewer: %s.', this.viewer );
	debug( 'Generating view...' );
	_view( this, this.viewer, this.render() );
	if ( arguments.length ) {
		// Restore the viewer:
		this.viewer = tmp;
	}
} // end FUNCTION view()


// EXPORTS //

module.exports = view;

},{"./view.js":477,"debug":549}],476:[function(require,module,exports){
'use strict';

/**
* Writes a plot (rendered as a virtual DOM tree) to `stdout`.
*
* @private
* @param {VTree} vtree - virtual tree
*/
function view( plot ) {
	console.log( JSON.stringify( plot ) );
} // end FUNCTION view()


// EXPORTS //

module.exports = view;

},{}],477:[function(require,module,exports){
'use strict';

// MODULES //

var stdout = require( './stdout' );


// MAIN //

/**
* Generates a plot view.
*
* @private
* @param {Plot} plot - plot context
* @param {string} viewer - plot viewer
* @param {VTree} vtree - virtual tree
* @throws {Error} must specify a supported viewer
* @returns {void}
*/
function view( plot, viewer, vtree ) {
	if ( viewer === 'none' ) {
		return;
	}
	if ( viewer === 'stdout' ) {
		return stdout( vtree );
	}
	if ( viewer === 'browser' ) {
		throw new Error( 'invalid input argument. Must provide a supported viewer. Value: `'+viewer+'`.' );
	}
	if ( viewer === 'terminal' ) {
		// TODO: ASCII
		return;
	}
	throw new Error( 'invalid input argument. Must provide a supported viewer. Value: `'+viewer+'`.' );
} // end FUNCTION view()


// EXPORTS //

module.exports = view;

},{"./stdout":476}],478:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var plot = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof plot, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to main export is a factory method for creating reusable plot generation functions', function test( t ) {
	t.equal( typeof plot.factory, 'function', 'export has factory method' );
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/plot/ctor/test/test.js")
},{"./../lib":351,"tape":607}],479:[function(require,module,exports){
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

},{}],480:[function(require,module,exports){
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

},{}],481:[function(require,module,exports){
'use strict';

/**
* Creates a function which always returns the same value.
*
* @param {*} [value] - value to always return
* @returns {Function} constant function
*
* @example
* var fcn = wrap( 3.14 );
*
* var v = fcn();
* // returns 3.14
*
* v = fcn();
* // returns 3.14
*
* v = fcn();
* // returns 3.14
*/
function wrap( value ) {
	return constantFunction;

	/**
	* Constant function.
	*
	* @returns {*} constant value
	*/
	function constantFunction() {
		return value;
	} // end FUNCTION constantFunction()
} // end FUNCTION wrap()


// EXPORTS //

module.exports = wrap;

},{}],482:[function(require,module,exports){
'use strict';

/**
* Create a constant function.
*
* @module @stdlib/utils/constant-function
*
* @example
* var constantFunction = require( '@stdlib/utils/constant-function' );
*
* var fcn = constantFunction( 3.14 );
*
* var v = fcn();
* // returns 3.14
*
* v = fcn();
* // returns 3.14
*
* v = fcn();
* // returns 3.14
*/

// MODULES //

var constantFunction = require( './constant_function.js' );


// EXPORTS //

module.exports = constantFunction;

},{"./constant_function.js":481}],483:[function(require,module,exports){
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

},{"@stdlib/assert/is-buffer":15,"@stdlib/regexp/function-name":479,"@stdlib/utils/native-class":518}],484:[function(require,module,exports){
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

},{"./constructor_name.js":483}],485:[function(require,module,exports){
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

},{"./deep_copy.js":486,"@stdlib/assert/is-array":7,"@stdlib/assert/is-nonnegative-integer":34,"@stdlib/math/constants/float64-pinf":82}],486:[function(require,module,exports){
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
},{"./typed_arrays.js":488,"@stdlib/assert/has-own-property":2,"@stdlib/assert/is-array":7,"@stdlib/assert/is-buffer":15,"@stdlib/assert/is-error":19,"@stdlib/utils/index-of":503,"@stdlib/utils/regexp-from-string":524,"@stdlib/utils/type-of":529,"buffer":537,"object-keys":577}],487:[function(require,module,exports){
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

},{"./copy.js":485}],488:[function(require,module,exports){
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

},{}],489:[function(require,module,exports){
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

},{}],490:[function(require,module,exports){
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

},{"./define_read_only_property.js":489}],491:[function(require,module,exports){
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

},{}],492:[function(require,module,exports){
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

},{"./detect_symbol_support.js":491}],493:[function(require,module,exports){
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

},{"@stdlib/utils/detect-symbol-support":492}],494:[function(require,module,exports){
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

},{"./has_tostringtag_support.js":493}],495:[function(require,module,exports){
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

},{"./native.js":498,"./polyfill.js":499,"@stdlib/assert/is-function":21}],496:[function(require,module,exports){
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

},{"./detect.js":495}],497:[function(require,module,exports){
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

},{"./get_prototype_of.js":496}],498:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = Object.getPrototypeOf;

},{}],499:[function(require,module,exports){
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

},{"./proto.js":500,"@stdlib/utils/native-class":518}],500:[function(require,module,exports){
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

},{}],501:[function(require,module,exports){
'use strict';

/**
* Identity function.
*
* @param {*} x - input value
* @returns {*} input value
*
* @example
* var v = identity( 3.14 );
* // returns 3.14
*/
function identity( x ) {
	return x;
}


// EXPORTS //

module.exports = identity;

},{}],502:[function(require,module,exports){
'use strict';

/**
* Identity function.
*
* @module @stdlib/utils/identity-function
*
* @example
* var identity = require( '@stdlib/utils/identity-function' );
*
* var input = [];
* var output = identity( input );
*
* var bool = ( input === output );
* // returns true
*/

// MODULES //

var identity = require( './identity.js' );


// EXPORTS //

module.exports = identity;

},{"./identity.js":501}],503:[function(require,module,exports){
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

},{"./index_of.js":504}],504:[function(require,module,exports){
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

},{"@stdlib/assert/is-array-like":5,"@stdlib/assert/is-integer":24,"@stdlib/assert/is-nan":29}],505:[function(require,module,exports){
'use strict';

// MODULES //

var objectCreate = require( './native.js' );
var createObject = require( './polyfill.js' );


// EXPORTS //

if ( typeof objectCreate === 'function' ) {
	module.exports = objectCreate;
} else {
	module.exports = createObject;
}

},{"./native.js":508,"./polyfill.js":509}],506:[function(require,module,exports){
'use strict';

/**
* Implement prototypical inheritance by replacing the prototype of one constructor with the prototype of another constructor.
*
* @module @stdlib/utils/inherit
*
* @example
* var inherit = require( '@stdlib/utils/inherit' );
*
* function Foo() {
*     return this;
* }
* Foo.prototype.beep = function beep() {
*     return 'boop';
* };
*
* function Bar() {
*     Foo.call( this );
*     return this;
* }
* inherit( Bar, Foo );
*
* var bar = new Bar();
* var v = bar.beep();
* // returns 'boop'
*/

// MODULES //

var inherit = require( './inherit.js' );


// EXPORTS //

module.exports = inherit;

},{"./inherit.js":507}],507:[function(require,module,exports){
'use strict';

// MODULES //

var validate = require( './validate.js' );
var createObject = require( './detect.js' );


// MAIN //

/**
* Implements prototypical inheritance by replacing the prototype of one constructor with the prototype of another constructor.
*
* #### Notes
*
* * This implementation is not designed to work with ES2015/ES6 classes. For ES2015/ES6 classes, use `class` with `extends`.
* * For reference, see [node#3455](https://github.com/nodejs/node/pull/3455), [node#4179](https://github.com/nodejs/node/issues/4179), [node#3452](https://github.com/nodejs/node/issues/3452), and [node commit](https://github.com/nodejs/node/commit/29da8cf8d7ab8f66b9091ab22664067d4468461e#diff-3deb3f32958bb937ae05c6f3e4abbdf5).
*
*
* @param {(Object|Function)} ctor - constructor which will inherit
* @param {(Object|Function)} superCtor - super (parent) constructor
* @throws {TypeError} first argument must be either an object or a function which can inherit
* @throws {TypeError} second argument must be either an object or a function from which a constructor can inherit
* @throws {TypeError} second argument must have an inheritable prototype
* @returns {(Object|Function)} child constructor
*
* @example
* function Foo() {
*     return this;
* }
* Foo.prototype.beep = function beep() {
*     return 'boop';
* };
*
* function Bar() {
*     Foo.call( this );
*     return this;
* }
* inherit( Bar, Foo );
*
* var bar = new Bar();
* var v = bar.beep();
* // returns 'boop'
*/
function inherit( ctor, superCtor ) {
	var err = validate( ctor );
	if ( err ) {
		throw err;
	}
	err = validate( superCtor );
	if ( err ) {
		throw err;
	}
	if ( typeof superCtor.prototype === 'undefined' ) {
		throw new TypeError( 'invalid input argument. Second argument must have a prototype from which another object can inherit. Value: `'+superCtor.prototype+'`.' );
	}
	// Create a prototype which inherits from the parent prototype:
	ctor.prototype = createObject( superCtor.prototype );

	// Set the constructor to refer to the child constructor:
	ctor.prototype.constructor = ctor;

	return ctor;
} // end FUNCTION inherit()


// EXPORTS //

module.exports = inherit;

},{"./detect.js":505,"./validate.js":510}],508:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = Object.create;

},{}],509:[function(require,module,exports){
'use strict';

// FUNCTIONS //

/**
* Dummy constructor.
*
* @private
*/
function Ctor() {
	// Empty...
}


// MAIN //

/**
* An `Object.create` shim for older JavaScript engines.
*
* @private
* @param {Object} proto - prototype
* @returns {Object} created object
*
* @example
* var obj = createObject( Object.prototype );
* // returns {}
*/
function createObject( proto ) {
	Ctor.prototype = proto;
	return new Ctor();
} // end FUNCTION createObject()


// EXPORTS //

module.exports = createObject;

},{}],510:[function(require,module,exports){
'use strict';

/**
* Tests that a value is a valid constructor.
*
* @private
* @param {*} value - value to test
* @returns {(Error|null)} error object or null
*
* @example
* var ctor = function ctor() {};
*
* var err = validate( ctor );
* // returns null
*
* err = validate( null );
* // returns <TypeError>
*/
function validate( value ) {
	var type = typeof value;
	if (
		value === null ||
		(type !== 'object' && type !== 'function')
	) {
		return new TypeError( 'invalid input argument. A provided constructor must be either an object (except null) or a function. Value: `'+value+'`.' );
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;

},{}],511:[function(require,module,exports){
'use strict';

// MODULES //

var objectKeys = require( 'object-keys' ).shim();
var isObject = require( '@stdlib/assert/is-object' );
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var isBuffer = require( '@stdlib/assert/is-buffer' );
var isFunction = require( '@stdlib/assert/is-function' );
var typeOf = require( '@stdlib/utils/type-of' );
var createCopy = require( '@stdlib/utils/copy' );


// MAIN //

/**
* Merges a source object into a target object.
*
* @private
* @param {Object} target - target object
* @param {Object} source - source object
* @param {number} level - merge level
* @param {boolean} copy - indicates whether to perform a deep copy of merged values
* @param {(boolean|Function)} override - defines the merge strategy
* @param {boolean} extend - indicates whether new properties can be added to the target object
*/
function deepMerge( target, source, level, copy, override, extend ) {
	var hasProp;
	var isFunc;
	var name;
	var keys;
	var curr;
	var key;
	var val;
	var tmp;
	var i;

	// Determine if we were provided a custom override strategy:
	isFunc = isFunction( override );

	// Decrement the level:
	level -= 1;

	// Loop through the source keys and implement the merge strategy...
	keys = objectKeys( source );
	for ( i = 0; i < keys.length; i++ ) {
		key = keys[ i ];
		hasProp = hasOwnProp( target, key );

		// Can we add new properties to the target?
		if ( !hasProp && !extend ) {
			continue;
		}
		val = source[ key ];

		if ( hasProp ) {
			curr = target[ key ];
			name = typeOf( curr );

			// Should we recurse to perform a deep(er) merge? (only if both the current value and the proposed value are objects and the level is > 0)
			if (
				!isBuffer( curr ) &&
				name === 'object' &&
				isObject( val ) &&
				level
			) {
				deepMerge( curr, val, level, copy, override, extend );
				continue;
			}
			// Should we apply a custom merge (override) strategy?
			if ( isFunc ) {
				tmp = override( curr, val, key );

				// WARNING: the following check does NOT prevent shared (leaky) nested references. We only check for top-level reference equality. We will assume that the user knows best, given their having provided a custom override strategy.
				if ( copy && tmp !== curr && tmp === val ) {
					tmp = createCopy( tmp );
				}
				target[ key ] = tmp;
			}
			// Are we allowed to override an existing target value?
			else if ( override ) {
				if ( copy ) {
					target[ key ] = createCopy( val );
				} else {
					target[ key ] = val;
				}
			}
		}
		// New property to be added to target object. Should we deep copy the source value?
		else if ( copy ) {
			target[ key ] = createCopy( val );
		}
		// Perform a simple assignment...
		else {
			target[ key ] = val;
		}
	}
} // end FUNCTION deepMerge()


// EXPORTS //

module.exports = deepMerge;

},{"@stdlib/assert/has-own-property":2,"@stdlib/assert/is-buffer":15,"@stdlib/assert/is-function":21,"@stdlib/assert/is-object":48,"@stdlib/utils/copy":487,"@stdlib/utils/type-of":529,"object-keys":577}],512:[function(require,module,exports){
'use strict';

// MODULES //

var PINF = require( '@stdlib/math/constants/float64-pinf' );


// MAIN //

var DEFAULTS = {
	'level': PINF,
	'override': true,
	'extend': true,
	'copy': true
};


// EXPORTS //

module.exports = DEFAULTS;

},{"@stdlib/math/constants/float64-pinf":82}],513:[function(require,module,exports){
'use strict';

// MODULES //

var copy = require( '@stdlib/utils/copy' );
var validate = require( './validate.js' );
var defaults = require( './defaults.js' );
var mergefcn = require( './mergefcn.js' );


// MAIN //

/**
* Returns a function for merging and extending objects.
*
* @param {Options} options - merge options
* @param {number} [options.level=Infinity] - merge level
* @param {boolean} [options.copy=true] - boolean indicating whether to deep copy merged values
* @param {(boolean|Function)} [options.override=true] - defines the merge strategy
* @param {boolean} [options.extend=true] - boolean indicating whether new properties can be added to the target object
* @throws {TypeError} must provide valid options
* @returns {Function} function which can be used to merge objects
*
* @example
* var opts = {
*     'level': 100,
*     'copy': true,
*     'override': true,
*     'extend': true
* };
*
* var merge = factory( opts );
* // returns <Function>
*/
function factory( options ) {
	var opts;
	var err;
	opts = copy( defaults );
	err = validate( opts, options );
	if ( err ) {
		throw err;
	}
	return mergefcn( opts );
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./defaults.js":512,"./mergefcn.js":516,"./validate.js":517,"@stdlib/utils/copy":487}],514:[function(require,module,exports){
'use strict';

/**
* Merge and extend objects.
*
* @module @stdlib/utils/merge
*
* @example
* var merge = require( '@stdlib/utils/merge' );
*
* var target = {
*     'a': 'beep'
* };
* var source = {
*     'a': 'boop',
*     'b': 'bap'
* };
*
* var out = merge( target, source );
* // returns {'a':'boop', 'b':'bap'}
*
* @example
* var factory = require( '@stdlib/utils/merge' ).factory;
*
* var opts = {
*     'level': 100,
*     'copy': true,
*     'override': true,
*     'extend': true
* };
*
* var merge = factory( opts );
* // returns <Function>
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var merge = require( './merge.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( merge, 'factory', factory );


// EXPORTS //

module.exports = merge;

},{"./factory.js":513,"./merge.js":515,"@stdlib/utils/define-read-only-property":490}],515:[function(require,module,exports){
'use strict';

// MODULES //

var defaults = require( './defaults.js' );
var mergefcn = require( './mergefcn.js' );


// MAIN //

/**
* Merges objects into a target object. Note that the target object is mutated.
*
* @type {Function}
* @name merge
* @param {Object} target - target object
* @param {...Object} source - source objects (i.e., objects to be merged into the target object)
* @throws {Error} must provide a target object and one or more source objects
* @throws {TypeError} first argument must be an object
* @throws {TypeError} source arguments must be objects
* @returns {Object} merged (target) object
*
* @example
* var target = {
*     'a': 'beep'
* };
* var source = {
*     'a': 'boop',
*     'b': 'bap'
* };
*
* var out = merge( target, source );
* // returns {'a':'boop', 'b':'bap'}
*/
var merge = mergefcn( defaults );


// EXPORTS //

module.exports = merge;

},{"./defaults.js":512,"./mergefcn.js":516}],516:[function(require,module,exports){
'use strict';

// MODULES //

var isObject = require( '@stdlib/assert/is-object' );
var deepMerge = require( './deepmerge.js' );


// MAIN //

/**
* Returns a merge function based on provided options.
*
* @private
* @param {Options} opts - function options
* @param {number} options.level - merge level
* @param {boolean} options.copy - boolean indicating whether to deep copy merged values
* @param {(boolean|Function)} options.override - defines the merge strategy
* @param {boolean} options.extend - boolean indicating whether new properties can be added to the target object
* @returns {Function} merge function
*
* @example
* var merge = mergefcn({
*     'level': Number.POSITIVE_INFINITY,
*     'copy': true,
*     'override': true,
*     'extend': true
* });
* // returns <Function>
*/
function mergefcn( opts ) {
	return merge;

	/**
	* Merges objects into a target object. Note that the target object is mutated.
	*
	* @private
	* @param {Object} target - target object
	* @param {...Object} source - source objects (i.e., objects to be merged into the target object)
	* @throws {Error} must provide a target object and one or more source objects
	* @throws {TypeError} first argument must be an object
	* @throws {TypeError} source arguments must be objects
	* @returns {Object} merged (target) object
	*
	* @example
	* var target = {
	*     'a': 'beep'
	* };
	* var source = {
	*     'a': 'boop',
	*     'b': 'bap'
	* };
	*
	* var out = merge( target, source );
	* // returns {'a':'boop', 'b':'bap'}
	*/
	function merge( target ) {
		var nargs;
		var arg;
		var src;
		var i;

		nargs = arguments.length - 1;
		if ( nargs < 1 ) {
			throw new Error( 'insufficient input arguments. Must provide both a target object and one or more source objects.' );
		}
		if ( !isObject( target ) ) {
			throw new TypeError( 'invalid input argument. First argument must be an object. Value: `' + target + '`.' );
		}
		src = new Array( nargs );
		for ( i = 0; i < nargs; i++ ) {
			arg = arguments[ i+1 ];
			// WARNING: this is a porous check. Buffers, Numbers, Booleans, Strings, Dates, RegExp, custom class instances,... will all pass.
			if ( !isObject( arg ) ) {
				throw new TypeError( 'invalid input argument. A merge source must be an object. Value: `' + arg + '`.' );
			}
			src[ i ] = arg;
		}
		for ( i = 0; i < nargs; i++ ) {
			deepMerge( target, src[ i ], opts.level, opts.copy, opts.override, opts.extend ); // eslint-disable-line max-len
		}
		return target;
	} // end FUNCTION merge()
} // end FUNCTION mergefcn()


// EXPORTS //

module.exports = mergefcn;

},{"./deepmerge.js":511,"@stdlib/assert/is-object":48}],517:[function(require,module,exports){
'use strict';

// MODULES //

var isObject = require( '@stdlib/assert/is-plain-object' );
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
var isFunction = require( '@stdlib/assert/is-function' );
var isPositiveInteger = require( '@stdlib/assert/is-positive-integer' ).isPrimitive;


// MAIN //

/**
* Validates function options.
*
* @private
* @param {Object} opts - destination object
* @param {Options} options - options to validate
* @param {number} [options.level] - merge level
* @param {boolean} [options.copy] - boolean indicating whether to deep copy merged values
* @param {(boolean|Function)} [options.override] - defines the merge strategy
* @param {boolean} [options.extend] - boolean indicating whether new properties can be added to the target object
* @returns {(Error|null)} error object or null
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( hasOwnProp( options, 'level' ) ) {
		opts.level = options.level;
		if ( !isPositiveInteger( opts.level ) ) {
			return new TypeError( 'invalid option. `level` option must be a positive integer. Option: `' + opts.level + '`.' );
		}
	}
	if ( hasOwnProp( options, 'copy' ) ) {
		opts.copy = options.copy;
		if ( !isBoolean( opts.copy ) ) {
			return new TypeError( 'invalid option. `copy` option must be a boolean primitive. Option: `' + opts.copy + '`.' );
		}
	}
	if ( hasOwnProp( options, 'override' ) ) {
		opts.override = options.override;
		if (
			!isBoolean( opts.override ) &&
			!isFunction( opts.override )
		) {
			return new TypeError( 'invalid option. `override` option must be either a boolean primitive or a function. Option: `' + opts.override + '`.' );
		}
	}
	if ( hasOwnProp( options, 'extend' ) ) {
		opts.extend = options.extend;
		if ( !isBoolean( opts.extend ) ) {
			return new TypeError( 'invalid option. `extend` option must be a boolean primitive. Option: `' + opts.extend + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;

},{"@stdlib/assert/has-own-property":2,"@stdlib/assert/is-boolean":10,"@stdlib/assert/is-function":21,"@stdlib/assert/is-plain-object":50,"@stdlib/assert/is-positive-integer":53}],518:[function(require,module,exports){
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

},{"./native_class.js":519,"./polyfill.js":520,"@stdlib/utils/detect-tostringtag-support":494}],519:[function(require,module,exports){
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

},{"./tostring.js":521}],520:[function(require,module,exports){
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

},{"./tostring.js":521,"./tostringtag.js":522,"@stdlib/assert/has-own-property":2}],521:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = Object.prototype.toString; // eslint-disable-line no-redeclare

},{}],522:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';

},{}],523:[function(require,module,exports){
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

},{"@stdlib/assert/is-string":62,"@stdlib/regexp/regexp":480}],524:[function(require,module,exports){
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

},{"./from_string.js":523}],525:[function(require,module,exports){
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

},{"./fixtures/nodelist.js":526,"./fixtures/re.js":527,"./fixtures/typedarray.js":528}],526:[function(require,module,exports){
'use strict';

// MODULES //

var root = require( 'system.global' )(); // eslint-disable-line no-redeclare


// MAIN //

var nodeList = root.document && root.document.childNodes;


// EXPORTS //

module.exports = nodeList;

},{"system.global":604}],527:[function(require,module,exports){
'use strict';

var RE = /./;


// EXPORTS //

module.exports = RE;

},{}],528:[function(require,module,exports){
'use strict';

var typedarray = Int8Array;


// EXPORTS //

module.exports = typedarray;

},{}],529:[function(require,module,exports){
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

},{"./check.js":525,"./polyfill.js":530,"./typeof.js":531}],530:[function(require,module,exports){
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

},{"@stdlib/utils/constructor-name":484}],531:[function(require,module,exports){
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

},{"@stdlib/utils/constructor-name":484}],532:[function(require,module,exports){
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

},{}],533:[function(require,module,exports){

},{}],534:[function(require,module,exports){
/*!
 * Cross-Browser Split 1.1.1
 * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
 * Available under the MIT License
 * ECMAScript compliant, uniform cross-browser split method
 */

/**
 * Splits a string into an array of strings using a regex or string separator. Matches of the
 * separator are not included in the result array. However, if `separator` is a regex that contains
 * capturing groups, backreferences are spliced into the result each time `separator` is matched.
 * Fixes browser bugs compared to the native `String.prototype.split` and can be used reliably
 * cross-browser.
 * @param {String} str String to split.
 * @param {RegExp|String} separator Regex or string to use for separating the string.
 * @param {Number} [limit] Maximum number of items to include in the result array.
 * @returns {Array} Array of substrings.
 * @example
 *
 * // Basic use
 * split('a b c d', ' ');
 * // -> ['a', 'b', 'c', 'd']
 *
 * // With limit
 * split('a b c d', ' ', 2);
 * // -> ['a', 'b']
 *
 * // Backreferences in result array
 * split('..word1 word2..', /([a-z]+)(\d+)/i);
 * // -> ['..', 'word', '1', ' ', 'word', '2', '..']
 */
module.exports = (function split(undef) {

  var nativeSplit = String.prototype.split,
    compliantExecNpcg = /()??/.exec("")[1] === undef,
    // NPCG: nonparticipating capturing group
    self;

  self = function(str, separator, limit) {
    // If `separator` is not a regex, use `nativeSplit`
    if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
      return nativeSplit.call(str, separator, limit);
    }
    var output = [],
      flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.extended ? "x" : "") + // Proposed for ES6
      (separator.sticky ? "y" : ""),
      // Firefox 3+
      lastLastIndex = 0,
      // Make `global` and avoid `lastIndex` issues by working with a copy
      separator = new RegExp(separator.source, flags + "g"),
      separator2, match, lastIndex, lastLength;
    str += ""; // Type-convert
    if (!compliantExecNpcg) {
      // Doesn't need flags gy, but they don't hurt
      separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
    }
    /* Values for `limit`, per the spec:
     * If undefined: 4294967295 // Math.pow(2, 32) - 1
     * If 0, Infinity, or NaN: 0
     * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
     * If negative number: 4294967296 - Math.floor(Math.abs(limit))
     * If other: Type-convert, then use the above rules
     */
    limit = limit === undef ? -1 >>> 0 : // Math.pow(2, 32) - 1
    limit >>> 0; // ToUint32(limit)
    while (match = separator.exec(str)) {
      // `separator.lastIndex` is not reliable cross-browser
      lastIndex = match.index + match[0].length;
      if (lastIndex > lastLastIndex) {
        output.push(str.slice(lastLastIndex, match.index));
        // Fix browsers whose `exec` methods don't consistently return `undefined` for
        // nonparticipating capturing groups
        if (!compliantExecNpcg && match.length > 1) {
          match[0].replace(separator2, function() {
            for (var i = 1; i < arguments.length - 2; i++) {
              if (arguments[i] === undef) {
                match[i] = undef;
              }
            }
          });
        }
        if (match.length > 1 && match.index < str.length) {
          Array.prototype.push.apply(output, match.slice(1));
        }
        lastLength = match[0].length;
        lastLastIndex = lastIndex;
        if (output.length >= limit) {
          break;
        }
      }
      if (separator.lastIndex === match.index) {
        separator.lastIndex++; // Avoid an infinite loop
      }
    }
    if (lastLastIndex === str.length) {
      if (lastLength || !separator.test("")) {
        output.push("");
      }
    } else {
      output.push(str.slice(lastLastIndex));
    }
    return output.length > limit ? output.slice(0, limit) : output;
  };

  return self;
})();

},{}],535:[function(require,module,exports){
arguments[4][533][0].apply(exports,arguments)
},{"dup":533}],536:[function(require,module,exports){
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

},{}],537:[function(require,module,exports){
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

},{"base64-js":532,"ieee754":569}],538:[function(require,module,exports){
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
},{"../../is-buffer/index.js":573}],539:[function(require,module,exports){
// https://d3js.org/d3-array/ Version 1.2.0. Copyright 2017 Mike Bostock.
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.d3 = global.d3 || {})));
}(this, (function (exports) { 'use strict';

var ascending = function(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
};

var bisector = function(compare) {
  if (compare.length === 1) compare = ascendingComparator(compare);
  return {
    left: function(a, x, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;
      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (compare(a[mid], x) < 0) lo = mid + 1;
        else hi = mid;
      }
      return lo;
    },
    right: function(a, x, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;
      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (compare(a[mid], x) > 0) hi = mid;
        else lo = mid + 1;
      }
      return lo;
    }
  };
};

function ascendingComparator(f) {
  return function(d, x) {
    return ascending(f(d), x);
  };
}

var ascendingBisect = bisector(ascending);
var bisectRight = ascendingBisect.right;
var bisectLeft = ascendingBisect.left;

var pairs = function(array, f) {
  if (f == null) f = pair;
  var i = 0, n = array.length - 1, p = array[0], pairs = new Array(n < 0 ? 0 : n);
  while (i < n) pairs[i] = f(p, p = array[++i]);
  return pairs;
};

function pair(a, b) {
  return [a, b];
}

var cross = function(values0, values1, reduce) {
  var n0 = values0.length,
      n1 = values1.length,
      values = new Array(n0 * n1),
      i0,
      i1,
      i,
      value0;

  if (reduce == null) reduce = pair;

  for (i0 = i = 0; i0 < n0; ++i0) {
    for (value0 = values0[i0], i1 = 0; i1 < n1; ++i1, ++i) {
      values[i] = reduce(value0, values1[i1]);
    }
  }

  return values;
};

var descending = function(a, b) {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
};

var number = function(x) {
  return x === null ? NaN : +x;
};

var variance = function(values, valueof) {
  var n = values.length,
      m = 0,
      i = -1,
      mean = 0,
      value,
      delta,
      sum = 0;

  if (valueof == null) {
    while (++i < n) {
      if (!isNaN(value = number(values[i]))) {
        delta = value - mean;
        mean += delta / ++m;
        sum += delta * (value - mean);
      }
    }
  }

  else {
    while (++i < n) {
      if (!isNaN(value = number(valueof(values[i], i, values)))) {
        delta = value - mean;
        mean += delta / ++m;
        sum += delta * (value - mean);
      }
    }
  }

  if (m > 1) return sum / (m - 1);
};

var deviation = function(array, f) {
  var v = variance(array, f);
  return v ? Math.sqrt(v) : v;
};

var extent = function(values, valueof) {
  var n = values.length,
      i = -1,
      value,
      min,
      max;

  if (valueof == null) {
    while (++i < n) { // Find the first comparable value.
      if ((value = values[i]) != null && value >= value) {
        min = max = value;
        while (++i < n) { // Compare the remaining values.
          if ((value = values[i]) != null) {
            if (min > value) min = value;
            if (max < value) max = value;
          }
        }
      }
    }
  }

  else {
    while (++i < n) { // Find the first comparable value.
      if ((value = valueof(values[i], i, values)) != null && value >= value) {
        min = max = value;
        while (++i < n) { // Compare the remaining values.
          if ((value = valueof(values[i], i, values)) != null) {
            if (min > value) min = value;
            if (max < value) max = value;
          }
        }
      }
    }
  }

  return [min, max];
};

var array = Array.prototype;

var slice = array.slice;
var map = array.map;

var constant = function(x) {
  return function() {
    return x;
  };
};

var identity = function(x) {
  return x;
};

var range = function(start, stop, step) {
  start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;

  var i = -1,
      n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
      range = new Array(n);

  while (++i < n) {
    range[i] = start + i * step;
  }

  return range;
};

var e10 = Math.sqrt(50);
var e5 = Math.sqrt(10);
var e2 = Math.sqrt(2);

var ticks = function(start, stop, count) {
  var reverse = stop < start,
      i = -1,
      n,
      ticks,
      step;

  if (reverse) n = start, start = stop, stop = n;

  if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step)) return [];

  if (step > 0) {
    start = Math.ceil(start / step);
    stop = Math.floor(stop / step);
    ticks = new Array(n = Math.ceil(stop - start + 1));
    while (++i < n) ticks[i] = (start + i) * step;
  } else {
    start = Math.floor(start * step);
    stop = Math.ceil(stop * step);
    ticks = new Array(n = Math.ceil(start - stop + 1));
    while (++i < n) ticks[i] = (start - i) / step;
  }

  if (reverse) ticks.reverse();

  return ticks;
};

function tickIncrement(start, stop, count) {
  var step = (stop - start) / Math.max(0, count),
      power = Math.floor(Math.log(step) / Math.LN10),
      error = step / Math.pow(10, power);
  return power >= 0
      ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power)
      : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
}

function tickStep(start, stop, count) {
  var step0 = Math.abs(stop - start) / Math.max(0, count),
      step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
      error = step0 / step1;
  if (error >= e10) step1 *= 10;
  else if (error >= e5) step1 *= 5;
  else if (error >= e2) step1 *= 2;
  return stop < start ? -step1 : step1;
}

var sturges = function(values) {
  return Math.ceil(Math.log(values.length) / Math.LN2) + 1;
};

var histogram = function() {
  var value = identity,
      domain = extent,
      threshold = sturges;

  function histogram(data) {
    var i,
        n = data.length,
        x,
        values = new Array(n);

    for (i = 0; i < n; ++i) {
      values[i] = value(data[i], i, data);
    }

    var xz = domain(values),
        x0 = xz[0],
        x1 = xz[1],
        tz = threshold(values, x0, x1);

    // Convert number of thresholds into uniform thresholds.
    if (!Array.isArray(tz)) {
      tz = tickStep(x0, x1, tz);
      tz = range(Math.ceil(x0 / tz) * tz, Math.floor(x1 / tz) * tz, tz); // exclusive
    }

    // Remove any thresholds outside the domain.
    var m = tz.length;
    while (tz[0] <= x0) tz.shift(), --m;
    while (tz[m - 1] > x1) tz.pop(), --m;

    var bins = new Array(m + 1),
        bin;

    // Initialize bins.
    for (i = 0; i <= m; ++i) {
      bin = bins[i] = [];
      bin.x0 = i > 0 ? tz[i - 1] : x0;
      bin.x1 = i < m ? tz[i] : x1;
    }

    // Assign data to bins by value, ignoring any outside the domain.
    for (i = 0; i < n; ++i) {
      x = values[i];
      if (x0 <= x && x <= x1) {
        bins[bisectRight(tz, x, 0, m)].push(data[i]);
      }
    }

    return bins;
  }

  histogram.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : constant(_), histogram) : value;
  };

  histogram.domain = function(_) {
    return arguments.length ? (domain = typeof _ === "function" ? _ : constant([_[0], _[1]]), histogram) : domain;
  };

  histogram.thresholds = function(_) {
    return arguments.length ? (threshold = typeof _ === "function" ? _ : Array.isArray(_) ? constant(slice.call(_)) : constant(_), histogram) : threshold;
  };

  return histogram;
};

var quantile = function(values, p, valueof) {
  if (valueof == null) valueof = number;
  if (!(n = values.length)) return;
  if ((p = +p) <= 0 || n < 2) return +valueof(values[0], 0, values);
  if (p >= 1) return +valueof(values[n - 1], n - 1, values);
  var n,
      i = (n - 1) * p,
      i0 = Math.floor(i),
      value0 = +valueof(values[i0], i0, values),
      value1 = +valueof(values[i0 + 1], i0 + 1, values);
  return value0 + (value1 - value0) * (i - i0);
};

var freedmanDiaconis = function(values, min, max) {
  values = map.call(values, number).sort(ascending);
  return Math.ceil((max - min) / (2 * (quantile(values, 0.75) - quantile(values, 0.25)) * Math.pow(values.length, -1 / 3)));
};

var scott = function(values, min, max) {
  return Math.ceil((max - min) / (3.5 * deviation(values) * Math.pow(values.length, -1 / 3)));
};

var max = function(values, valueof) {
  var n = values.length,
      i = -1,
      value,
      max;

  if (valueof == null) {
    while (++i < n) { // Find the first comparable value.
      if ((value = values[i]) != null && value >= value) {
        max = value;
        while (++i < n) { // Compare the remaining values.
          if ((value = values[i]) != null && value > max) {
            max = value;
          }
        }
      }
    }
  }

  else {
    while (++i < n) { // Find the first comparable value.
      if ((value = valueof(values[i], i, values)) != null && value >= value) {
        max = value;
        while (++i < n) { // Compare the remaining values.
          if ((value = valueof(values[i], i, values)) != null && value > max) {
            max = value;
          }
        }
      }
    }
  }

  return max;
};

var mean = function(values, valueof) {
  var n = values.length,
      m = n,
      i = -1,
      value,
      sum = 0;

  if (valueof == null) {
    while (++i < n) {
      if (!isNaN(value = number(values[i]))) sum += value;
      else --m;
    }
  }

  else {
    while (++i < n) {
      if (!isNaN(value = number(valueof(values[i], i, values)))) sum += value;
      else --m;
    }
  }

  if (m) return sum / m;
};

var median = function(values, valueof) {
  var n = values.length,
      i = -1,
      value,
      numbers = [];

  if (valueof == null) {
    while (++i < n) {
      if (!isNaN(value = number(values[i]))) {
        numbers.push(value);
      }
    }
  }

  else {
    while (++i < n) {
      if (!isNaN(value = number(valueof(values[i], i, values)))) {
        numbers.push(value);
      }
    }
  }

  return quantile(numbers.sort(ascending), 0.5);
};

var merge = function(arrays) {
  var n = arrays.length,
      m,
      i = -1,
      j = 0,
      merged,
      array;

  while (++i < n) j += arrays[i].length;
  merged = new Array(j);

  while (--n >= 0) {
    array = arrays[n];
    m = array.length;
    while (--m >= 0) {
      merged[--j] = array[m];
    }
  }

  return merged;
};

var min = function(values, valueof) {
  var n = values.length,
      i = -1,
      value,
      min;

  if (valueof == null) {
    while (++i < n) { // Find the first comparable value.
      if ((value = values[i]) != null && value >= value) {
        min = value;
        while (++i < n) { // Compare the remaining values.
          if ((value = values[i]) != null && min > value) {
            min = value;
          }
        }
      }
    }
  }

  else {
    while (++i < n) { // Find the first comparable value.
      if ((value = valueof(values[i], i, values)) != null && value >= value) {
        min = value;
        while (++i < n) { // Compare the remaining values.
          if ((value = valueof(values[i], i, values)) != null && min > value) {
            min = value;
          }
        }
      }
    }
  }

  return min;
};

var permute = function(array, indexes) {
  var i = indexes.length, permutes = new Array(i);
  while (i--) permutes[i] = array[indexes[i]];
  return permutes;
};

var scan = function(values, compare) {
  if (!(n = values.length)) return;
  var n,
      i = 0,
      j = 0,
      xi,
      xj = values[j];

  if (compare == null) compare = ascending;

  while (++i < n) {
    if (compare(xi = values[i], xj) < 0 || compare(xj, xj) !== 0) {
      xj = xi, j = i;
    }
  }

  if (compare(xj, xj) === 0) return j;
};

var shuffle = function(array, i0, i1) {
  var m = (i1 == null ? array.length : i1) - (i0 = i0 == null ? 0 : +i0),
      t,
      i;

  while (m) {
    i = Math.random() * m-- | 0;
    t = array[m + i0];
    array[m + i0] = array[i + i0];
    array[i + i0] = t;
  }

  return array;
};

var sum = function(values, valueof) {
  var n = values.length,
      i = -1,
      value,
      sum = 0;

  if (valueof == null) {
    while (++i < n) {
      if (value = +values[i]) sum += value; // Note: zero and null are equivalent.
    }
  }

  else {
    while (++i < n) {
      if (value = +valueof(values[i], i, values)) sum += value;
    }
  }

  return sum;
};

var transpose = function(matrix) {
  if (!(n = matrix.length)) return [];
  for (var i = -1, m = min(matrix, length), transpose = new Array(m); ++i < m;) {
    for (var j = -1, n, row = transpose[i] = new Array(n); ++j < n;) {
      row[j] = matrix[j][i];
    }
  }
  return transpose;
};

function length(d) {
  return d.length;
}

var zip = function() {
  return transpose(arguments);
};

exports.bisect = bisectRight;
exports.bisectRight = bisectRight;
exports.bisectLeft = bisectLeft;
exports.ascending = ascending;
exports.bisector = bisector;
exports.cross = cross;
exports.descending = descending;
exports.deviation = deviation;
exports.extent = extent;
exports.histogram = histogram;
exports.thresholdFreedmanDiaconis = freedmanDiaconis;
exports.thresholdScott = scott;
exports.thresholdSturges = sturges;
exports.max = max;
exports.mean = mean;
exports.median = median;
exports.merge = merge;
exports.min = min;
exports.pairs = pairs;
exports.permute = permute;
exports.quantile = quantile;
exports.range = range;
exports.scan = scan;
exports.shuffle = shuffle;
exports.sum = sum;
exports.ticks = ticks;
exports.tickIncrement = tickIncrement;
exports.tickStep = tickStep;
exports.transpose = transpose;
exports.variance = variance;
exports.zip = zip;

Object.defineProperty(exports, '__esModule', { value: true });

})));

},{}],540:[function(require,module,exports){
// https://d3js.org/d3-collection/ Version 1.0.4. Copyright 2017 Mike Bostock.
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.d3 = global.d3 || {})));
}(this, (function (exports) { 'use strict';

var prefix = "$";

function Map() {}

Map.prototype = map.prototype = {
  constructor: Map,
  has: function(key) {
    return (prefix + key) in this;
  },
  get: function(key) {
    return this[prefix + key];
  },
  set: function(key, value) {
    this[prefix + key] = value;
    return this;
  },
  remove: function(key) {
    var property = prefix + key;
    return property in this && delete this[property];
  },
  clear: function() {
    for (var property in this) if (property[0] === prefix) delete this[property];
  },
  keys: function() {
    var keys = [];
    for (var property in this) if (property[0] === prefix) keys.push(property.slice(1));
    return keys;
  },
  values: function() {
    var values = [];
    for (var property in this) if (property[0] === prefix) values.push(this[property]);
    return values;
  },
  entries: function() {
    var entries = [];
    for (var property in this) if (property[0] === prefix) entries.push({key: property.slice(1), value: this[property]});
    return entries;
  },
  size: function() {
    var size = 0;
    for (var property in this) if (property[0] === prefix) ++size;
    return size;
  },
  empty: function() {
    for (var property in this) if (property[0] === prefix) return false;
    return true;
  },
  each: function(f) {
    for (var property in this) if (property[0] === prefix) f(this[property], property.slice(1), this);
  }
};

function map(object, f) {
  var map = new Map;

  // Copy constructor.
  if (object instanceof Map) object.each(function(value, key) { map.set(key, value); });

  // Index array by numeric index or specified key function.
  else if (Array.isArray(object)) {
    var i = -1,
        n = object.length,
        o;

    if (f == null) while (++i < n) map.set(i, object[i]);
    else while (++i < n) map.set(f(o = object[i], i, object), o);
  }

  // Convert object to map.
  else if (object) for (var key in object) map.set(key, object[key]);

  return map;
}

var nest = function() {
  var keys = [],
      sortKeys = [],
      sortValues,
      rollup,
      nest;

  function apply(array, depth, createResult, setResult) {
    if (depth >= keys.length) {
      if (sortValues != null) array.sort(sortValues);
      return rollup != null ? rollup(array) : array;
    }

    var i = -1,
        n = array.length,
        key = keys[depth++],
        keyValue,
        value,
        valuesByKey = map(),
        values,
        result = createResult();

    while (++i < n) {
      if (values = valuesByKey.get(keyValue = key(value = array[i]) + "")) {
        values.push(value);
      } else {
        valuesByKey.set(keyValue, [value]);
      }
    }

    valuesByKey.each(function(values, key) {
      setResult(result, key, apply(values, depth, createResult, setResult));
    });

    return result;
  }

  function entries(map$$1, depth) {
    if (++depth > keys.length) return map$$1;
    var array, sortKey = sortKeys[depth - 1];
    if (rollup != null && depth >= keys.length) array = map$$1.entries();
    else array = [], map$$1.each(function(v, k) { array.push({key: k, values: entries(v, depth)}); });
    return sortKey != null ? array.sort(function(a, b) { return sortKey(a.key, b.key); }) : array;
  }

  return nest = {
    object: function(array) { return apply(array, 0, createObject, setObject); },
    map: function(array) { return apply(array, 0, createMap, setMap); },
    entries: function(array) { return entries(apply(array, 0, createMap, setMap), 0); },
    key: function(d) { keys.push(d); return nest; },
    sortKeys: function(order) { sortKeys[keys.length - 1] = order; return nest; },
    sortValues: function(order) { sortValues = order; return nest; },
    rollup: function(f) { rollup = f; return nest; }
  };
};

function createObject() {
  return {};
}

function setObject(object, key, value) {
  object[key] = value;
}

function createMap() {
  return map();
}

function setMap(map$$1, key, value) {
  map$$1.set(key, value);
}

function Set() {}

var proto = map.prototype;

Set.prototype = set.prototype = {
  constructor: Set,
  has: proto.has,
  add: function(value) {
    value += "";
    this[prefix + value] = value;
    return this;
  },
  remove: proto.remove,
  clear: proto.clear,
  values: proto.keys,
  size: proto.size,
  empty: proto.empty,
  each: proto.each
};

function set(object, f) {
  var set = new Set;

  // Copy constructor.
  if (object instanceof Set) object.each(function(value) { set.add(value); });

  // Otherwise, assume it’s an array.
  else if (object) {
    var i = -1, n = object.length;
    if (f == null) while (++i < n) set.add(object[i]);
    else while (++i < n) set.add(f(object[i], i, object));
  }

  return set;
}

var keys = function(map) {
  var keys = [];
  for (var key in map) keys.push(key);
  return keys;
};

var values = function(map) {
  var values = [];
  for (var key in map) values.push(map[key]);
  return values;
};

var entries = function(map) {
  var entries = [];
  for (var key in map) entries.push({key: key, value: map[key]});
  return entries;
};

exports.nest = nest;
exports.set = set;
exports.map = map;
exports.keys = keys;
exports.values = values;
exports.entries = entries;

Object.defineProperty(exports, '__esModule', { value: true });

})));

},{}],541:[function(require,module,exports){
// https://d3js.org/d3-color/ Version 1.0.3. Copyright 2017 Mike Bostock.
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.d3 = global.d3 || {})));
}(this, (function (exports) { 'use strict';

var define = function(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
};

function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}

function Color() {}

var darker = 0.7;
var brighter = 1 / darker;

var reI = "\\s*([+-]?\\d+)\\s*";
var reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*";
var reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
var reHex3 = /^#([0-9a-f]{3})$/;
var reHex6 = /^#([0-9a-f]{6})$/;
var reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$");
var reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$");
var reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$");
var reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$");
var reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$");
var reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");

var named = {
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgreen: 0x006400,
  darkgrey: 0xa9a9a9,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  grey: 0x808080,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightgrey: 0xd3d3d3,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32
};

define(Color, color, {
  displayable: function() {
    return this.rgb().displayable();
  },
  toString: function() {
    return this.rgb() + "";
  }
});

function color(format) {
  var m;
  format = (format + "").trim().toLowerCase();
  return (m = reHex3.exec(format)) ? (m = parseInt(m[1], 16), new Rgb((m >> 8 & 0xf) | (m >> 4 & 0x0f0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1)) // #f00
      : (m = reHex6.exec(format)) ? rgbn(parseInt(m[1], 16)) // #ff0000
      : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
      : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
      : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
      : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
      : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
      : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
      : named.hasOwnProperty(format) ? rgbn(named[format])
      : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
      : null;
}

function rgbn(n) {
  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}

function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}

function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb;
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}

function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}

function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}

define(Rgb, rgb, extend(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb: function() {
    return this;
  },
  displayable: function() {
    return (0 <= this.r && this.r <= 255)
        && (0 <= this.g && this.g <= 255)
        && (0 <= this.b && this.b <= 255)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  toString: function() {
    var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "rgb(" : "rgba(")
        + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", "
        + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", "
        + Math.max(0, Math.min(255, Math.round(this.b) || 0))
        + (a === 1 ? ")" : ", " + a + ")");
  }
}));

function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;
  else if (l <= 0 || l >= 1) h = s = NaN;
  else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}

function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl;
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      h = NaN,
      s = max - min,
      l = (max + min) / 2;
  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6;
    else if (g === max) h = (b - r) / s + 2;
    else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}

function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}

function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

define(Hsl, hsl, extend(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = this.h % 360 + (this.h < 0) * 360,
        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
        l = this.l,
        m2 = l + (l < 0.5 ? l : 1 - l) * s,
        m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  displayable: function() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
        && (0 <= this.l && this.l <= 1)
        && (0 <= this.opacity && this.opacity <= 1);
  }
}));

/* From FvD 13.37, CSS Color Module Level 3 */
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60
      : h < 180 ? m2
      : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
      : m1) * 255;
}

var deg2rad = Math.PI / 180;
var rad2deg = 180 / Math.PI;

var Kn = 18;
var Xn = 0.950470;
var Yn = 1;
var Zn = 1.088830;
var t0 = 4 / 29;
var t1 = 6 / 29;
var t2 = 3 * t1 * t1;
var t3 = t1 * t1 * t1;

function labConvert(o) {
  if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
  if (o instanceof Hcl) {
    var h = o.h * deg2rad;
    return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
  }
  if (!(o instanceof Rgb)) o = rgbConvert(o);
  var b = rgb2xyz(o.r),
      a = rgb2xyz(o.g),
      l = rgb2xyz(o.b),
      x = xyz2lab((0.4124564 * b + 0.3575761 * a + 0.1804375 * l) / Xn),
      y = xyz2lab((0.2126729 * b + 0.7151522 * a + 0.0721750 * l) / Yn),
      z = xyz2lab((0.0193339 * b + 0.1191920 * a + 0.9503041 * l) / Zn);
  return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
}

function lab(l, a, b, opacity) {
  return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
}

function Lab(l, a, b, opacity) {
  this.l = +l;
  this.a = +a;
  this.b = +b;
  this.opacity = +opacity;
}

define(Lab, lab, extend(Color, {
  brighter: function(k) {
    return new Lab(this.l + Kn * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  darker: function(k) {
    return new Lab(this.l - Kn * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  rgb: function() {
    var y = (this.l + 16) / 116,
        x = isNaN(this.a) ? y : y + this.a / 500,
        z = isNaN(this.b) ? y : y - this.b / 200;
    y = Yn * lab2xyz(y);
    x = Xn * lab2xyz(x);
    z = Zn * lab2xyz(z);
    return new Rgb(
      xyz2rgb( 3.2404542 * x - 1.5371385 * y - 0.4985314 * z), // D65 -> sRGB
      xyz2rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z),
      xyz2rgb( 0.0556434 * x - 0.2040259 * y + 1.0572252 * z),
      this.opacity
    );
  }
}));

function xyz2lab(t) {
  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
}

function lab2xyz(t) {
  return t > t1 ? t * t * t : t2 * (t - t0);
}

function xyz2rgb(x) {
  return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
}

function rgb2xyz(x) {
  return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}

function hclConvert(o) {
  if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
  if (!(o instanceof Lab)) o = labConvert(o);
  var h = Math.atan2(o.b, o.a) * rad2deg;
  return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
}

function hcl(h, c, l, opacity) {
  return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}

function Hcl(h, c, l, opacity) {
  this.h = +h;
  this.c = +c;
  this.l = +l;
  this.opacity = +opacity;
}

define(Hcl, hcl, extend(Color, {
  brighter: function(k) {
    return new Hcl(this.h, this.c, this.l + Kn * (k == null ? 1 : k), this.opacity);
  },
  darker: function(k) {
    return new Hcl(this.h, this.c, this.l - Kn * (k == null ? 1 : k), this.opacity);
  },
  rgb: function() {
    return labConvert(this).rgb();
  }
}));

var A = -0.14861;
var B = +1.78277;
var C = -0.29227;
var D = -0.90649;
var E = +1.97294;
var ED = E * D;
var EB = E * B;
var BC_DA = B * C - D * A;

function cubehelixConvert(o) {
  if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Rgb)) o = rgbConvert(o);
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB),
      bl = b - l,
      k = (E * (g - l) - C * bl) / D,
      s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), // NaN if l=0 or l=1
      h = s ? Math.atan2(k, bl) * rad2deg - 120 : NaN;
  return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
}

function cubehelix(h, s, l, opacity) {
  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
}

function Cubehelix(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

define(Cubehelix, cubehelix, extend(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = isNaN(this.h) ? 0 : (this.h + 120) * deg2rad,
        l = +this.l,
        a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
        cosh = Math.cos(h),
        sinh = Math.sin(h);
    return new Rgb(
      255 * (l + a * (A * cosh + B * sinh)),
      255 * (l + a * (C * cosh + D * sinh)),
      255 * (l + a * (E * cosh)),
      this.opacity
    );
  }
}));

exports.color = color;
exports.rgb = rgb;
exports.hsl = hsl;
exports.lab = lab;
exports.hcl = hcl;
exports.cubehelix = cubehelix;

Object.defineProperty(exports, '__esModule', { value: true });

})));

},{}],542:[function(require,module,exports){
// https://d3js.org/d3-format/ Version 1.2.0. Copyright 2017 Mike Bostock.
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.d3 = global.d3 || {})));
}(this, (function (exports) { 'use strict';

// Computes the decimal coefficient and exponent of the specified number x with
// significant digits p, where x is positive and p is in [1, 21] or undefined.
// For example, formatDecimal(1.23) returns ["123", 0].
var formatDecimal = function(x, p) {
  if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
  var i, coefficient = x.slice(0, i);

  // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
  // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
  return [
    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
    +x.slice(i + 1)
  ];
};

var exponent = function(x) {
  return x = formatDecimal(Math.abs(x)), x ? x[1] : NaN;
};

var formatGroup = function(grouping, thousands) {
  return function(value, width) {
    var i = value.length,
        t = [],
        j = 0,
        g = grouping[0],
        length = 0;

    while (i > 0 && g > 0) {
      if (length + g + 1 > width) g = Math.max(1, width - length);
      t.push(value.substring(i -= g, i + g));
      if ((length += g + 1) > width) break;
      g = grouping[j = (j + 1) % grouping.length];
    }

    return t.reverse().join(thousands);
  };
};

var formatNumerals = function(numerals) {
  return function(value) {
    return value.replace(/[0-9]/g, function(i) {
      return numerals[+i];
    });
  };
};

var formatDefault = function(x, p) {
  x = x.toPrecision(p);

  out: for (var n = x.length, i = 1, i0 = -1, i1; i < n; ++i) {
    switch (x[i]) {
      case ".": i0 = i1 = i; break;
      case "0": if (i0 === 0) i0 = i; i1 = i; break;
      case "e": break out;
      default: if (i0 > 0) i0 = 0; break;
    }
  }

  return i0 > 0 ? x.slice(0, i0) + x.slice(i1 + 1) : x;
};

var prefixExponent;

var formatPrefixAuto = function(x, p) {
  var d = formatDecimal(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
      exponent = d[1],
      i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
      n = coefficient.length;
  return i === n ? coefficient
      : i > n ? coefficient + new Array(i - n + 1).join("0")
      : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i)
      : "0." + new Array(1 - i).join("0") + formatDecimal(x, Math.max(0, p + i - 1))[0]; // less than 1y!
};

var formatRounded = function(x, p) {
  var d = formatDecimal(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
      exponent = d[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient
      : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1)
      : coefficient + new Array(exponent - coefficient.length + 2).join("0");
};

var formatTypes = {
  "": formatDefault,
  "%": function(x, p) { return (x * 100).toFixed(p); },
  "b": function(x) { return Math.round(x).toString(2); },
  "c": function(x) { return x + ""; },
  "d": function(x) { return Math.round(x).toString(10); },
  "e": function(x, p) { return x.toExponential(p); },
  "f": function(x, p) { return x.toFixed(p); },
  "g": function(x, p) { return x.toPrecision(p); },
  "o": function(x) { return Math.round(x).toString(8); },
  "p": function(x, p) { return formatRounded(x * 100, p); },
  "r": formatRounded,
  "s": formatPrefixAuto,
  "X": function(x) { return Math.round(x).toString(16).toUpperCase(); },
  "x": function(x) { return Math.round(x).toString(16); }
};

// [[fill]align][sign][symbol][0][width][,][.precision][type]
var re = /^(?:(.)?([<>=^]))?([+\-\( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?([a-z%])?$/i;

function formatSpecifier(specifier) {
  return new FormatSpecifier(specifier);
}

formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof

function FormatSpecifier(specifier) {
  if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);

  var match,
      fill = match[1] || " ",
      align = match[2] || ">",
      sign = match[3] || "-",
      symbol = match[4] || "",
      zero = !!match[5],
      width = match[6] && +match[6],
      comma = !!match[7],
      precision = match[8] && +match[8].slice(1),
      type = match[9] || "";

  // The "n" type is an alias for ",g".
  if (type === "n") comma = true, type = "g";

  // Map invalid types to the default format.
  else if (!formatTypes[type]) type = "";

  // If zero fill is specified, padding goes after sign and before digits.
  if (zero || (fill === "0" && align === "=")) zero = true, fill = "0", align = "=";

  this.fill = fill;
  this.align = align;
  this.sign = sign;
  this.symbol = symbol;
  this.zero = zero;
  this.width = width;
  this.comma = comma;
  this.precision = precision;
  this.type = type;
}

FormatSpecifier.prototype.toString = function() {
  return this.fill
      + this.align
      + this.sign
      + this.symbol
      + (this.zero ? "0" : "")
      + (this.width == null ? "" : Math.max(1, this.width | 0))
      + (this.comma ? "," : "")
      + (this.precision == null ? "" : "." + Math.max(0, this.precision | 0))
      + this.type;
};

var identity = function(x) {
  return x;
};

var prefixes = ["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];

var formatLocale = function(locale) {
  var group = locale.grouping && locale.thousands ? formatGroup(locale.grouping, locale.thousands) : identity,
      currency = locale.currency,
      decimal = locale.decimal,
      numerals = locale.numerals ? formatNumerals(locale.numerals) : identity,
      percent = locale.percent || "%";

  function newFormat(specifier) {
    specifier = formatSpecifier(specifier);

    var fill = specifier.fill,
        align = specifier.align,
        sign = specifier.sign,
        symbol = specifier.symbol,
        zero = specifier.zero,
        width = specifier.width,
        comma = specifier.comma,
        precision = specifier.precision,
        type = specifier.type;

    // Compute the prefix and suffix.
    // For SI-prefix, the suffix is lazily computed.
    var prefix = symbol === "$" ? currency[0] : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
        suffix = symbol === "$" ? currency[1] : /[%p]/.test(type) ? percent : "";

    // What format function should we use?
    // Is this an integer type?
    // Can this type generate exponential notation?
    var formatType = formatTypes[type],
        maybeSuffix = !type || /[defgprs%]/.test(type);

    // Set the default precision if not specified,
    // or clamp the specified precision to the supported range.
    // For significant precision, it must be in [1, 21].
    // For fixed precision, it must be in [0, 20].
    precision = precision == null ? (type ? 6 : 12)
        : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision))
        : Math.max(0, Math.min(20, precision));

    function format(value) {
      var valuePrefix = prefix,
          valueSuffix = suffix,
          i, n, c;

      if (type === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value;

        // Perform the initial formatting.
        var valueNegative = value < 0;
        value = formatType(Math.abs(value), precision);

        // If a negative value rounds to zero during formatting, treat as positive.
        if (valueNegative && +value === 0) valueNegative = false;

        // Compute the prefix and suffix.
        valuePrefix = (valueNegative ? (sign === "(" ? sign : "-") : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
        valueSuffix = valueSuffix + (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + (valueNegative && sign === "(" ? ")" : "");

        // Break the formatted value into the integer “value” part that can be
        // grouped, and fractional or exponential “suffix” part that is not.
        if (maybeSuffix) {
          i = -1, n = value.length;
          while (++i < n) {
            if (c = value.charCodeAt(i), 48 > c || c > 57) {
              valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
              value = value.slice(0, i);
              break;
            }
          }
        }
      }

      // If the fill character is not "0", grouping is applied before padding.
      if (comma && !zero) value = group(value, Infinity);

      // Compute the padding.
      var length = valuePrefix.length + value.length + valueSuffix.length,
          padding = length < width ? new Array(width - length + 1).join(fill) : "";

      // If the fill character is "0", grouping is applied after padding.
      if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";

      // Reconstruct the final output based on the desired alignment.
      switch (align) {
        case "<": value = valuePrefix + value + valueSuffix + padding; break;
        case "=": value = valuePrefix + padding + value + valueSuffix; break;
        case "^": value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length); break;
        default: value = padding + valuePrefix + value + valueSuffix; break;
      }

      return numerals(value);
    }

    format.toString = function() {
      return specifier + "";
    };

    return format;
  }

  function formatPrefix(specifier, value) {
    var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)),
        e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3,
        k = Math.pow(10, -e),
        prefix = prefixes[8 + e / 3];
    return function(value) {
      return f(k * value) + prefix;
    };
  }

  return {
    format: newFormat,
    formatPrefix: formatPrefix
  };
};

var locale;



defaultLocale({
  decimal: ".",
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});

function defaultLocale(definition) {
  locale = formatLocale(definition);
  exports.format = locale.format;
  exports.formatPrefix = locale.formatPrefix;
  return locale;
}

var precisionFixed = function(step) {
  return Math.max(0, -exponent(Math.abs(step)));
};

var precisionPrefix = function(step, value) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
};

var precisionRound = function(step, max) {
  step = Math.abs(step), max = Math.abs(max) - step;
  return Math.max(0, exponent(max) - exponent(step)) + 1;
};

exports.formatDefaultLocale = defaultLocale;
exports.formatLocale = formatLocale;
exports.formatSpecifier = formatSpecifier;
exports.precisionFixed = precisionFixed;
exports.precisionPrefix = precisionPrefix;
exports.precisionRound = precisionRound;

Object.defineProperty(exports, '__esModule', { value: true });

})));

},{}],543:[function(require,module,exports){
// https://d3js.org/d3-interpolate/ Version 1.1.5. Copyright 2017 Mike Bostock.
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-color')) :
	typeof define === 'function' && define.amd ? define(['exports', 'd3-color'], factory) :
	(factory((global.d3 = global.d3 || {}),global.d3));
}(this, (function (exports,d3Color) { 'use strict';

function basis(t1, v0, v1, v2, v3) {
  var t2 = t1 * t1, t3 = t2 * t1;
  return ((1 - 3 * t1 + 3 * t2 - t3) * v0
      + (4 - 6 * t2 + 3 * t3) * v1
      + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2
      + t3 * v3) / 6;
}

var basis$1 = function(values) {
  var n = values.length - 1;
  return function(t) {
    var i = t <= 0 ? (t = 0) : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n),
        v1 = values[i],
        v2 = values[i + 1],
        v0 = i > 0 ? values[i - 1] : 2 * v1 - v2,
        v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
};

var basisClosed = function(values) {
  var n = values.length;
  return function(t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n),
        v0 = values[(i + n - 1) % n],
        v1 = values[i % n],
        v2 = values[(i + 1) % n],
        v3 = values[(i + 2) % n];
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
};

var constant = function(x) {
  return function() {
    return x;
  };
};

function linear(a, d) {
  return function(t) {
    return a + t * d;
  };
}

function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
    return Math.pow(a + t * b, y);
  };
}

function hue(a, b) {
  var d = b - a;
  return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant(isNaN(a) ? b : a);
}

function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y) : constant(isNaN(a) ? b : a);
  };
}

function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : constant(isNaN(a) ? b : a);
}

var rgb$1 = ((function rgbGamma(y) {
  var color$$1 = gamma(y);

  function rgb$$1(start, end) {
    var r = color$$1((start = d3Color.rgb(start)).r, (end = d3Color.rgb(end)).r),
        g = color$$1(start.g, end.g),
        b = color$$1(start.b, end.b),
        opacity = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }

  rgb$$1.gamma = rgbGamma;

  return rgb$$1;
}))(1);

function rgbSpline(spline) {
  return function(colors) {
    var n = colors.length,
        r = new Array(n),
        g = new Array(n),
        b = new Array(n),
        i, color$$1;
    for (i = 0; i < n; ++i) {
      color$$1 = d3Color.rgb(colors[i]);
      r[i] = color$$1.r || 0;
      g[i] = color$$1.g || 0;
      b[i] = color$$1.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color$$1.opacity = 1;
    return function(t) {
      color$$1.r = r(t);
      color$$1.g = g(t);
      color$$1.b = b(t);
      return color$$1 + "";
    };
  };
}

var rgbBasis = rgbSpline(basis$1);
var rgbBasisClosed = rgbSpline(basisClosed);

var array = function(a, b) {
  var nb = b ? b.length : 0,
      na = a ? Math.min(nb, a.length) : 0,
      x = new Array(nb),
      c = new Array(nb),
      i;

  for (i = 0; i < na; ++i) x[i] = value(a[i], b[i]);
  for (; i < nb; ++i) c[i] = b[i];

  return function(t) {
    for (i = 0; i < na; ++i) c[i] = x[i](t);
    return c;
  };
};

var date = function(a, b) {
  var d = new Date;
  return a = +a, b -= a, function(t) {
    return d.setTime(a + b * t), d;
  };
};

var number = function(a, b) {
  return a = +a, b -= a, function(t) {
    return a + b * t;
  };
};

var object = function(a, b) {
  var i = {},
      c = {},
      k;

  if (a === null || typeof a !== "object") a = {};
  if (b === null || typeof b !== "object") b = {};

  for (k in b) {
    if (k in a) {
      i[k] = value(a[k], b[k]);
    } else {
      c[k] = b[k];
    }
  }

  return function(t) {
    for (k in i) c[k] = i[k](t);
    return c;
  };
};

var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
var reB = new RegExp(reA.source, "g");

function zero(b) {
  return function() {
    return b;
  };
}

function one(b) {
  return function(t) {
    return b(t) + "";
  };
}

var string = function(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
      am, // current match in a
      bm, // current match in b
      bs, // string preceding current number in b, if any
      i = -1, // index in s
      s = [], // string constants and placeholders
      q = []; // number interpolators

  // Coerce inputs to strings.
  a = a + "", b = b + "";

  // Interpolate pairs of numbers in a & b.
  while ((am = reA.exec(a))
      && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) { // a string precedes the next number in b
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
      if (s[i]) s[i] += bm; // coalesce with previous string
      else s[++i] = bm;
    } else { // interpolate non-matching numbers
      s[++i] = null;
      q.push({i: i, x: number(am, bm)});
    }
    bi = reB.lastIndex;
  }

  // Add remains of b.
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs; // coalesce with previous string
    else s[++i] = bs;
  }

  // Special optimization for only a single match.
  // Otherwise, interpolate each of the numbers and rejoin the string.
  return s.length < 2 ? (q[0]
      ? one(q[0].x)
      : zero(b))
      : (b = q.length, function(t) {
          for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
          return s.join("");
        });
};

var value = function(a, b) {
  var t = typeof b, c;
  return b == null || t === "boolean" ? constant(b)
      : (t === "number" ? number
      : t === "string" ? ((c = d3Color.color(b)) ? (b = c, rgb$1) : string)
      : b instanceof d3Color.color ? rgb$1
      : b instanceof Date ? date
      : Array.isArray(b) ? array
      : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object
      : number)(a, b);
};

var round = function(a, b) {
  return a = +a, b -= a, function(t) {
    return Math.round(a + b * t);
  };
};

var degrees = 180 / Math.PI;

var identity = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};

var decompose = function(a, b, c, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX: scaleX,
    scaleY: scaleY
  };
};

var cssNode;
var cssRoot;
var cssView;
var svgNode;

function parseCss(value) {
  if (value === "none") return identity;
  if (!cssNode) cssNode = document.createElement("DIV"), cssRoot = document.documentElement, cssView = document.defaultView;
  cssNode.style.transform = value;
  value = cssView.getComputedStyle(cssRoot.appendChild(cssNode), null).getPropertyValue("transform");
  cssRoot.removeChild(cssNode);
  value = value.slice(7, -1).split(",");
  return decompose(+value[0], +value[1], +value[2], +value[3], +value[4], +value[5]);
}

function parseSvg(value) {
  if (value == null) return identity;
  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate())) return identity;
  value = value.matrix;
  return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
}

function interpolateTransform(parse, pxComma, pxParen, degParen) {

  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }

  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({i: i - 4, x: number(xa, xb)}, {i: i - 2, x: number(ya, yb)});
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }

  function rotate(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
      q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: number(a, b)});
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }

  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: number(a, b)});
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }

  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({i: i - 4, x: number(xa, xb)}, {i: i - 2, x: number(ya, yb)});
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }

  return function(a, b) {
    var s = [], // string constants and placeholders
        q = []; // number interpolators
    a = parse(a), b = parse(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skewX(a.skewX, b.skewX, s, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    a = b = null; // gc
    return function(t) {
      var i = -1, n = q.length, o;
      while (++i < n) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  };
}

var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

var rho = Math.SQRT2;
var rho2 = 2;
var rho4 = 4;
var epsilon2 = 1e-12;

function cosh(x) {
  return ((x = Math.exp(x)) + 1 / x) / 2;
}

function sinh(x) {
  return ((x = Math.exp(x)) - 1 / x) / 2;
}

function tanh(x) {
  return ((x = Math.exp(2 * x)) - 1) / (x + 1);
}

// p0 = [ux0, uy0, w0]
// p1 = [ux1, uy1, w1]
var zoom = function(p0, p1) {
  var ux0 = p0[0], uy0 = p0[1], w0 = p0[2],
      ux1 = p1[0], uy1 = p1[1], w1 = p1[2],
      dx = ux1 - ux0,
      dy = uy1 - uy0,
      d2 = dx * dx + dy * dy,
      i,
      S;

  // Special case for u0 ≅ u1.
  if (d2 < epsilon2) {
    S = Math.log(w1 / w0) / rho;
    i = function(t) {
      return [
        ux0 + t * dx,
        uy0 + t * dy,
        w0 * Math.exp(rho * t * S)
      ];
    };
  }

  // General case.
  else {
    var d1 = Math.sqrt(d2),
        b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
        b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
        r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
        r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
    S = (r1 - r0) / rho;
    i = function(t) {
      var s = t * S,
          coshr0 = cosh(r0),
          u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
      return [
        ux0 + u * dx,
        uy0 + u * dy,
        w0 * coshr0 / cosh(rho * s + r0)
      ];
    };
  }

  i.duration = S * 1000;

  return i;
};

function hsl$1(hue$$1) {
  return function(start, end) {
    var h = hue$$1((start = d3Color.hsl(start)).h, (end = d3Color.hsl(end)).h),
        s = nogamma(start.s, end.s),
        l = nogamma(start.l, end.l),
        opacity = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.h = h(t);
      start.s = s(t);
      start.l = l(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }
}

var hsl$2 = hsl$1(hue);
var hslLong = hsl$1(nogamma);

function lab$1(start, end) {
  var l = nogamma((start = d3Color.lab(start)).l, (end = d3Color.lab(end)).l),
      a = nogamma(start.a, end.a),
      b = nogamma(start.b, end.b),
      opacity = nogamma(start.opacity, end.opacity);
  return function(t) {
    start.l = l(t);
    start.a = a(t);
    start.b = b(t);
    start.opacity = opacity(t);
    return start + "";
  };
}

function hcl$1(hue$$1) {
  return function(start, end) {
    var h = hue$$1((start = d3Color.hcl(start)).h, (end = d3Color.hcl(end)).h),
        c = nogamma(start.c, end.c),
        l = nogamma(start.l, end.l),
        opacity = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.h = h(t);
      start.c = c(t);
      start.l = l(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }
}

var hcl$2 = hcl$1(hue);
var hclLong = hcl$1(nogamma);

function cubehelix$1(hue$$1) {
  return (function cubehelixGamma(y) {
    y = +y;

    function cubehelix$$1(start, end) {
      var h = hue$$1((start = d3Color.cubehelix(start)).h, (end = d3Color.cubehelix(end)).h),
          s = nogamma(start.s, end.s),
          l = nogamma(start.l, end.l),
          opacity = nogamma(start.opacity, end.opacity);
      return function(t) {
        start.h = h(t);
        start.s = s(t);
        start.l = l(Math.pow(t, y));
        start.opacity = opacity(t);
        return start + "";
      };
    }

    cubehelix$$1.gamma = cubehelixGamma;

    return cubehelix$$1;
  })(1);
}

var cubehelix$2 = cubehelix$1(hue);
var cubehelixLong = cubehelix$1(nogamma);

var quantize = function(interpolator, n) {
  var samples = new Array(n);
  for (var i = 0; i < n; ++i) samples[i] = interpolator(i / (n - 1));
  return samples;
};

exports.interpolate = value;
exports.interpolateArray = array;
exports.interpolateBasis = basis$1;
exports.interpolateBasisClosed = basisClosed;
exports.interpolateDate = date;
exports.interpolateNumber = number;
exports.interpolateObject = object;
exports.interpolateRound = round;
exports.interpolateString = string;
exports.interpolateTransformCss = interpolateTransformCss;
exports.interpolateTransformSvg = interpolateTransformSvg;
exports.interpolateZoom = zoom;
exports.interpolateRgb = rgb$1;
exports.interpolateRgbBasis = rgbBasis;
exports.interpolateRgbBasisClosed = rgbBasisClosed;
exports.interpolateHsl = hsl$2;
exports.interpolateHslLong = hslLong;
exports.interpolateLab = lab$1;
exports.interpolateHcl = hcl$2;
exports.interpolateHclLong = hclLong;
exports.interpolateCubehelix = cubehelix$2;
exports.interpolateCubehelixLong = cubehelixLong;
exports.quantize = quantize;

Object.defineProperty(exports, '__esModule', { value: true });

})));

},{"d3-color":541}],544:[function(require,module,exports){
// https://d3js.org/d3-path/ Version 1.0.5. Copyright 2017 Mike Bostock.
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.d3 = global.d3 || {})));
}(this, (function (exports) { 'use strict';

var pi = Math.PI;
var tau = 2 * pi;
var epsilon = 1e-6;
var tauEpsilon = tau - epsilon;

function Path() {
  this._x0 = this._y0 = // start of current subpath
  this._x1 = this._y1 = null; // end of current subpath
  this._ = "";
}

function path() {
  return new Path;
}

Path.prototype = path.prototype = {
  constructor: Path,
  moveTo: function(x, y) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y);
  },
  closePath: function() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._ += "Z";
    }
  },
  lineTo: function(x, y) {
    this._ += "L" + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  quadraticCurveTo: function(x1, y1, x, y) {
    this._ += "Q" + (+x1) + "," + (+y1) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  bezierCurveTo: function(x1, y1, x2, y2, x, y) {
    this._ += "C" + (+x1) + "," + (+y1) + "," + (+x2) + "," + (+y2) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  arcTo: function(x1, y1, x2, y2, r) {
    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
    var x0 = this._x1,
        y0 = this._y1,
        x21 = x2 - x1,
        y21 = y2 - y1,
        x01 = x0 - x1,
        y01 = y0 - y1,
        l01_2 = x01 * x01 + y01 * y01;

    // Is the radius negative? Error.
    if (r < 0) throw new Error("negative radius: " + r);

    // Is this path empty? Move to (x1,y1).
    if (this._x1 === null) {
      this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
    }

    // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
    else if (!(l01_2 > epsilon)) {}

    // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
    // Equivalently, is (x1,y1) coincident with (x2,y2)?
    // Or, is the radius zero? Line to (x1,y1).
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
      this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
    }

    // Otherwise, draw an arc!
    else {
      var x20 = x2 - x0,
          y20 = y2 - y0,
          l21_2 = x21 * x21 + y21 * y21,
          l20_2 = x20 * x20 + y20 * y20,
          l21 = Math.sqrt(l21_2),
          l01 = Math.sqrt(l01_2),
          l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
          t01 = l / l01,
          t21 = l / l21;

      // If the start tangent is not coincident with (x0,y0), line to.
      if (Math.abs(t01 - 1) > epsilon) {
        this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
      }

      this._ += "A" + r + "," + r + ",0,0," + (+(y01 * x20 > x01 * y20)) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
    }
  },
  arc: function(x, y, r, a0, a1, ccw) {
    x = +x, y = +y, r = +r;
    var dx = r * Math.cos(a0),
        dy = r * Math.sin(a0),
        x0 = x + dx,
        y0 = y + dy,
        cw = 1 ^ ccw,
        da = ccw ? a0 - a1 : a1 - a0;

    // Is the radius negative? Error.
    if (r < 0) throw new Error("negative radius: " + r);

    // Is this path empty? Move to (x0,y0).
    if (this._x1 === null) {
      this._ += "M" + x0 + "," + y0;
    }

    // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
    else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
      this._ += "L" + x0 + "," + y0;
    }

    // Is this arc empty? We’re done.
    if (!r) return;

    // Does the angle go the wrong way? Flip the direction.
    if (da < 0) da = da % tau + tau;

    // Is this a complete circle? Draw two arcs to complete the circle.
    if (da > tauEpsilon) {
      this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x - dx) + "," + (y - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
    }

    // Is this arc non-empty? Draw an arc!
    else if (da > epsilon) {
      this._ += "A" + r + "," + r + ",0," + (+(da >= pi)) + "," + cw + "," + (this._x1 = x + r * Math.cos(a1)) + "," + (this._y1 = y + r * Math.sin(a1));
    }
  },
  rect: function(x, y, w, h) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y) + "h" + (+w) + "v" + (+h) + "h" + (-w) + "Z";
  },
  toString: function() {
    return this._;
  }
};

exports.path = path;

Object.defineProperty(exports, '__esModule', { value: true });

})));

},{}],545:[function(require,module,exports){
// https://d3js.org/d3-scale/ Version 1.0.6. Copyright 2017 Mike Bostock.
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-array'), require('d3-collection'), require('d3-interpolate'), require('d3-format'), require('d3-time'), require('d3-time-format'), require('d3-color')) :
	typeof define === 'function' && define.amd ? define(['exports', 'd3-array', 'd3-collection', 'd3-interpolate', 'd3-format', 'd3-time', 'd3-time-format', 'd3-color'], factory) :
	(factory((global.d3 = global.d3 || {}),global.d3,global.d3,global.d3,global.d3,global.d3,global.d3,global.d3));
}(this, (function (exports,d3Array,d3Collection,d3Interpolate,d3Format,d3Time,d3TimeFormat,d3Color) { 'use strict';

var array = Array.prototype;

var map$1 = array.map;
var slice = array.slice;

var implicit = {name: "implicit"};

function ordinal(range$$1) {
  var index = d3Collection.map(),
      domain = [],
      unknown = implicit;

  range$$1 = range$$1 == null ? [] : slice.call(range$$1);

  function scale(d) {
    var key = d + "", i = index.get(key);
    if (!i) {
      if (unknown !== implicit) return unknown;
      index.set(key, i = domain.push(d));
    }
    return range$$1[(i - 1) % range$$1.length];
  }

  scale.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [], index = d3Collection.map();
    var i = -1, n = _.length, d, key;
    while (++i < n) if (!index.has(key = (d = _[i]) + "")) index.set(key, domain.push(d));
    return scale;
  };

  scale.range = function(_) {
    return arguments.length ? (range$$1 = slice.call(_), scale) : range$$1.slice();
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  scale.copy = function() {
    return ordinal()
        .domain(domain)
        .range(range$$1)
        .unknown(unknown);
  };

  return scale;
}

function band() {
  var scale = ordinal().unknown(undefined),
      domain = scale.domain,
      ordinalRange = scale.range,
      range$$1 = [0, 1],
      step,
      bandwidth,
      round = false,
      paddingInner = 0,
      paddingOuter = 0,
      align = 0.5;

  delete scale.unknown;

  function rescale() {
    var n = domain().length,
        reverse = range$$1[1] < range$$1[0],
        start = range$$1[reverse - 0],
        stop = range$$1[1 - reverse];
    step = (stop - start) / Math.max(1, n - paddingInner + paddingOuter * 2);
    if (round) step = Math.floor(step);
    start += (stop - start - step * (n - paddingInner)) * align;
    bandwidth = step * (1 - paddingInner);
    if (round) start = Math.round(start), bandwidth = Math.round(bandwidth);
    var values = d3Array.range(n).map(function(i) { return start + step * i; });
    return ordinalRange(reverse ? values.reverse() : values);
  }

  scale.domain = function(_) {
    return arguments.length ? (domain(_), rescale()) : domain();
  };

  scale.range = function(_) {
    return arguments.length ? (range$$1 = [+_[0], +_[1]], rescale()) : range$$1.slice();
  };

  scale.rangeRound = function(_) {
    return range$$1 = [+_[0], +_[1]], round = true, rescale();
  };

  scale.bandwidth = function() {
    return bandwidth;
  };

  scale.step = function() {
    return step;
  };

  scale.round = function(_) {
    return arguments.length ? (round = !!_, rescale()) : round;
  };

  scale.padding = function(_) {
    return arguments.length ? (paddingInner = paddingOuter = Math.max(0, Math.min(1, _)), rescale()) : paddingInner;
  };

  scale.paddingInner = function(_) {
    return arguments.length ? (paddingInner = Math.max(0, Math.min(1, _)), rescale()) : paddingInner;
  };

  scale.paddingOuter = function(_) {
    return arguments.length ? (paddingOuter = Math.max(0, Math.min(1, _)), rescale()) : paddingOuter;
  };

  scale.align = function(_) {
    return arguments.length ? (align = Math.max(0, Math.min(1, _)), rescale()) : align;
  };

  scale.copy = function() {
    return band()
        .domain(domain())
        .range(range$$1)
        .round(round)
        .paddingInner(paddingInner)
        .paddingOuter(paddingOuter)
        .align(align);
  };

  return rescale();
}

function pointish(scale) {
  var copy = scale.copy;

  scale.padding = scale.paddingOuter;
  delete scale.paddingInner;
  delete scale.paddingOuter;

  scale.copy = function() {
    return pointish(copy());
  };

  return scale;
}

function point() {
  return pointish(band().paddingInner(1));
}

var constant = function(x) {
  return function() {
    return x;
  };
};

var number = function(x) {
  return +x;
};

var unit = [0, 1];

function deinterpolateLinear(a, b) {
  return (b -= (a = +a))
      ? function(x) { return (x - a) / b; }
      : constant(b);
}

function deinterpolateClamp(deinterpolate) {
  return function(a, b) {
    var d = deinterpolate(a = +a, b = +b);
    return function(x) { return x <= a ? 0 : x >= b ? 1 : d(x); };
  };
}

function reinterpolateClamp(reinterpolate) {
  return function(a, b) {
    var r = reinterpolate(a = +a, b = +b);
    return function(t) { return t <= 0 ? a : t >= 1 ? b : r(t); };
  };
}

function bimap(domain, range$$1, deinterpolate, reinterpolate) {
  var d0 = domain[0], d1 = domain[1], r0 = range$$1[0], r1 = range$$1[1];
  if (d1 < d0) d0 = deinterpolate(d1, d0), r0 = reinterpolate(r1, r0);
  else d0 = deinterpolate(d0, d1), r0 = reinterpolate(r0, r1);
  return function(x) { return r0(d0(x)); };
}

function polymap(domain, range$$1, deinterpolate, reinterpolate) {
  var j = Math.min(domain.length, range$$1.length) - 1,
      d = new Array(j),
      r = new Array(j),
      i = -1;

  // Reverse descending domains.
  if (domain[j] < domain[0]) {
    domain = domain.slice().reverse();
    range$$1 = range$$1.slice().reverse();
  }

  while (++i < j) {
    d[i] = deinterpolate(domain[i], domain[i + 1]);
    r[i] = reinterpolate(range$$1[i], range$$1[i + 1]);
  }

  return function(x) {
    var i = d3Array.bisect(domain, x, 1, j) - 1;
    return r[i](d[i](x));
  };
}

function copy(source, target) {
  return target
      .domain(source.domain())
      .range(source.range())
      .interpolate(source.interpolate())
      .clamp(source.clamp());
}

// deinterpolate(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
// reinterpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding domain value x in [a,b].
function continuous(deinterpolate, reinterpolate) {
  var domain = unit,
      range$$1 = unit,
      interpolate$$1 = d3Interpolate.interpolate,
      clamp = false,
      piecewise,
      output,
      input;

  function rescale() {
    piecewise = Math.min(domain.length, range$$1.length) > 2 ? polymap : bimap;
    output = input = null;
    return scale;
  }

  function scale(x) {
    return (output || (output = piecewise(domain, range$$1, clamp ? deinterpolateClamp(deinterpolate) : deinterpolate, interpolate$$1)))(+x);
  }

  scale.invert = function(y) {
    return (input || (input = piecewise(range$$1, domain, deinterpolateLinear, clamp ? reinterpolateClamp(reinterpolate) : reinterpolate)))(+y);
  };

  scale.domain = function(_) {
    return arguments.length ? (domain = map$1.call(_, number), rescale()) : domain.slice();
  };

  scale.range = function(_) {
    return arguments.length ? (range$$1 = slice.call(_), rescale()) : range$$1.slice();
  };

  scale.rangeRound = function(_) {
    return range$$1 = slice.call(_), interpolate$$1 = d3Interpolate.interpolateRound, rescale();
  };

  scale.clamp = function(_) {
    return arguments.length ? (clamp = !!_, rescale()) : clamp;
  };

  scale.interpolate = function(_) {
    return arguments.length ? (interpolate$$1 = _, rescale()) : interpolate$$1;
  };

  return rescale();
}

var tickFormat = function(domain, count, specifier) {
  var start = domain[0],
      stop = domain[domain.length - 1],
      step = d3Array.tickStep(start, stop, count == null ? 10 : count),
      precision;
  specifier = d3Format.formatSpecifier(specifier == null ? ",f" : specifier);
  switch (specifier.type) {
    case "s": {
      var value = Math.max(Math.abs(start), Math.abs(stop));
      if (specifier.precision == null && !isNaN(precision = d3Format.precisionPrefix(step, value))) specifier.precision = precision;
      return d3Format.formatPrefix(specifier, value);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      if (specifier.precision == null && !isNaN(precision = d3Format.precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
      break;
    }
    case "f":
    case "%": {
      if (specifier.precision == null && !isNaN(precision = d3Format.precisionFixed(step))) specifier.precision = precision - (specifier.type === "%") * 2;
      break;
    }
  }
  return d3Format.format(specifier);
};

function linearish(scale) {
  var domain = scale.domain;

  scale.ticks = function(count) {
    var d = domain();
    return d3Array.ticks(d[0], d[d.length - 1], count == null ? 10 : count);
  };

  scale.tickFormat = function(count, specifier) {
    return tickFormat(domain(), count, specifier);
  };

  scale.nice = function(count) {
    if (count == null) count = 10;

    var d = domain(),
        i0 = 0,
        i1 = d.length - 1,
        start = d[i0],
        stop = d[i1],
        step;

    if (stop < start) {
      step = start, start = stop, stop = step;
      step = i0, i0 = i1, i1 = step;
    }

    step = d3Array.tickIncrement(start, stop, count);

    if (step > 0) {
      start = Math.floor(start / step) * step;
      stop = Math.ceil(stop / step) * step;
      step = d3Array.tickIncrement(start, stop, count);
    } else if (step < 0) {
      start = Math.ceil(start * step) / step;
      stop = Math.floor(stop * step) / step;
      step = d3Array.tickIncrement(start, stop, count);
    }

    if (step > 0) {
      d[i0] = Math.floor(start / step) * step;
      d[i1] = Math.ceil(stop / step) * step;
      domain(d);
    } else if (step < 0) {
      d[i0] = Math.ceil(start * step) / step;
      d[i1] = Math.floor(stop * step) / step;
      domain(d);
    }

    return scale;
  };

  return scale;
}

function linear() {
  var scale = continuous(deinterpolateLinear, d3Interpolate.interpolateNumber);

  scale.copy = function() {
    return copy(scale, linear());
  };

  return linearish(scale);
}

function identity() {
  var domain = [0, 1];

  function scale(x) {
    return +x;
  }

  scale.invert = scale;

  scale.domain = scale.range = function(_) {
    return arguments.length ? (domain = map$1.call(_, number), scale) : domain.slice();
  };

  scale.copy = function() {
    return identity().domain(domain);
  };

  return linearish(scale);
}

var nice = function(domain, interval) {
  domain = domain.slice();

  var i0 = 0,
      i1 = domain.length - 1,
      x0 = domain[i0],
      x1 = domain[i1],
      t;

  if (x1 < x0) {
    t = i0, i0 = i1, i1 = t;
    t = x0, x0 = x1, x1 = t;
  }

  domain[i0] = interval.floor(x0);
  domain[i1] = interval.ceil(x1);
  return domain;
};

function deinterpolate(a, b) {
  return (b = Math.log(b / a))
      ? function(x) { return Math.log(x / a) / b; }
      : constant(b);
}

function reinterpolate(a, b) {
  return a < 0
      ? function(t) { return -Math.pow(-b, t) * Math.pow(-a, 1 - t); }
      : function(t) { return Math.pow(b, t) * Math.pow(a, 1 - t); };
}

function pow10(x) {
  return isFinite(x) ? +("1e" + x) : x < 0 ? 0 : x;
}

function powp(base) {
  return base === 10 ? pow10
      : base === Math.E ? Math.exp
      : function(x) { return Math.pow(base, x); };
}

function logp(base) {
  return base === Math.E ? Math.log
      : base === 10 && Math.log10
      || base === 2 && Math.log2
      || (base = Math.log(base), function(x) { return Math.log(x) / base; });
}

function reflect(f) {
  return function(x) {
    return -f(-x);
  };
}

function log() {
  var scale = continuous(deinterpolate, reinterpolate).domain([1, 10]),
      domain = scale.domain,
      base = 10,
      logs = logp(10),
      pows = powp(10);

  function rescale() {
    logs = logp(base), pows = powp(base);
    if (domain()[0] < 0) logs = reflect(logs), pows = reflect(pows);
    return scale;
  }

  scale.base = function(_) {
    return arguments.length ? (base = +_, rescale()) : base;
  };

  scale.domain = function(_) {
    return arguments.length ? (domain(_), rescale()) : domain();
  };

  scale.ticks = function(count) {
    var d = domain(),
        u = d[0],
        v = d[d.length - 1],
        r;

    if (r = v < u) i = u, u = v, v = i;

    var i = logs(u),
        j = logs(v),
        p,
        k,
        t,
        n = count == null ? 10 : +count,
        z = [];

    if (!(base % 1) && j - i < n) {
      i = Math.round(i) - 1, j = Math.round(j) + 1;
      if (u > 0) for (; i < j; ++i) {
        for (k = 1, p = pows(i); k < base; ++k) {
          t = p * k;
          if (t < u) continue;
          if (t > v) break;
          z.push(t);
        }
      } else for (; i < j; ++i) {
        for (k = base - 1, p = pows(i); k >= 1; --k) {
          t = p * k;
          if (t < u) continue;
          if (t > v) break;
          z.push(t);
        }
      }
    } else {
      z = d3Array.ticks(i, j, Math.min(j - i, n)).map(pows);
    }

    return r ? z.reverse() : z;
  };

  scale.tickFormat = function(count, specifier) {
    if (specifier == null) specifier = base === 10 ? ".0e" : ",";
    if (typeof specifier !== "function") specifier = d3Format.format(specifier);
    if (count === Infinity) return specifier;
    if (count == null) count = 10;
    var k = Math.max(1, base * count / scale.ticks().length); // TODO fast estimate?
    return function(d) {
      var i = d / pows(Math.round(logs(d)));
      if (i * base < base - 0.5) i *= base;
      return i <= k ? specifier(d) : "";
    };
  };

  scale.nice = function() {
    return domain(nice(domain(), {
      floor: function(x) { return pows(Math.floor(logs(x))); },
      ceil: function(x) { return pows(Math.ceil(logs(x))); }
    }));
  };

  scale.copy = function() {
    return copy(scale, log().base(base));
  };

  return scale;
}

function raise(x, exponent) {
  return x < 0 ? -Math.pow(-x, exponent) : Math.pow(x, exponent);
}

function pow() {
  var exponent = 1,
      scale = continuous(deinterpolate, reinterpolate),
      domain = scale.domain;

  function deinterpolate(a, b) {
    return (b = raise(b, exponent) - (a = raise(a, exponent)))
        ? function(x) { return (raise(x, exponent) - a) / b; }
        : constant(b);
  }

  function reinterpolate(a, b) {
    b = raise(b, exponent) - (a = raise(a, exponent));
    return function(t) { return raise(a + b * t, 1 / exponent); };
  }

  scale.exponent = function(_) {
    return arguments.length ? (exponent = +_, domain(domain())) : exponent;
  };

  scale.copy = function() {
    return copy(scale, pow().exponent(exponent));
  };

  return linearish(scale);
}

function sqrt() {
  return pow().exponent(0.5);
}

function quantile$1() {
  var domain = [],
      range$$1 = [],
      thresholds = [];

  function rescale() {
    var i = 0, n = Math.max(1, range$$1.length);
    thresholds = new Array(n - 1);
    while (++i < n) thresholds[i - 1] = d3Array.quantile(domain, i / n);
    return scale;
  }

  function scale(x) {
    if (!isNaN(x = +x)) return range$$1[d3Array.bisect(thresholds, x)];
  }

  scale.invertExtent = function(y) {
    var i = range$$1.indexOf(y);
    return i < 0 ? [NaN, NaN] : [
      i > 0 ? thresholds[i - 1] : domain[0],
      i < thresholds.length ? thresholds[i] : domain[domain.length - 1]
    ];
  };

  scale.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [];
    for (var i = 0, n = _.length, d; i < n; ++i) if (d = _[i], d != null && !isNaN(d = +d)) domain.push(d);
    domain.sort(d3Array.ascending);
    return rescale();
  };

  scale.range = function(_) {
    return arguments.length ? (range$$1 = slice.call(_), rescale()) : range$$1.slice();
  };

  scale.quantiles = function() {
    return thresholds.slice();
  };

  scale.copy = function() {
    return quantile$1()
        .domain(domain)
        .range(range$$1);
  };

  return scale;
}

function quantize() {
  var x0 = 0,
      x1 = 1,
      n = 1,
      domain = [0.5],
      range$$1 = [0, 1];

  function scale(x) {
    if (x <= x) return range$$1[d3Array.bisect(domain, x, 0, n)];
  }

  function rescale() {
    var i = -1;
    domain = new Array(n);
    while (++i < n) domain[i] = ((i + 1) * x1 - (i - n) * x0) / (n + 1);
    return scale;
  }

  scale.domain = function(_) {
    return arguments.length ? (x0 = +_[0], x1 = +_[1], rescale()) : [x0, x1];
  };

  scale.range = function(_) {
    return arguments.length ? (n = (range$$1 = slice.call(_)).length - 1, rescale()) : range$$1.slice();
  };

  scale.invertExtent = function(y) {
    var i = range$$1.indexOf(y);
    return i < 0 ? [NaN, NaN]
        : i < 1 ? [x0, domain[0]]
        : i >= n ? [domain[n - 1], x1]
        : [domain[i - 1], domain[i]];
  };

  scale.copy = function() {
    return quantize()
        .domain([x0, x1])
        .range(range$$1);
  };

  return linearish(scale);
}

function threshold() {
  var domain = [0.5],
      range$$1 = [0, 1],
      n = 1;

  function scale(x) {
    if (x <= x) return range$$1[d3Array.bisect(domain, x, 0, n)];
  }

  scale.domain = function(_) {
    return arguments.length ? (domain = slice.call(_), n = Math.min(domain.length, range$$1.length - 1), scale) : domain.slice();
  };

  scale.range = function(_) {
    return arguments.length ? (range$$1 = slice.call(_), n = Math.min(domain.length, range$$1.length - 1), scale) : range$$1.slice();
  };

  scale.invertExtent = function(y) {
    var i = range$$1.indexOf(y);
    return [domain[i - 1], domain[i]];
  };

  scale.copy = function() {
    return threshold()
        .domain(domain)
        .range(range$$1);
  };

  return scale;
}

var durationSecond = 1000;
var durationMinute = durationSecond * 60;
var durationHour = durationMinute * 60;
var durationDay = durationHour * 24;
var durationWeek = durationDay * 7;
var durationMonth = durationDay * 30;
var durationYear = durationDay * 365;

function date(t) {
  return new Date(t);
}

function number$1(t) {
  return t instanceof Date ? +t : +new Date(+t);
}

function calendar(year, month, week, day, hour, minute, second, millisecond, format$$1) {
  var scale = continuous(deinterpolateLinear, d3Interpolate.interpolateNumber),
      invert = scale.invert,
      domain = scale.domain;

  var formatMillisecond = format$$1(".%L"),
      formatSecond = format$$1(":%S"),
      formatMinute = format$$1("%I:%M"),
      formatHour = format$$1("%I %p"),
      formatDay = format$$1("%a %d"),
      formatWeek = format$$1("%b %d"),
      formatMonth = format$$1("%B"),
      formatYear = format$$1("%Y");

  var tickIntervals = [
    [second,  1,      durationSecond],
    [second,  5,  5 * durationSecond],
    [second, 15, 15 * durationSecond],
    [second, 30, 30 * durationSecond],
    [minute,  1,      durationMinute],
    [minute,  5,  5 * durationMinute],
    [minute, 15, 15 * durationMinute],
    [minute, 30, 30 * durationMinute],
    [  hour,  1,      durationHour  ],
    [  hour,  3,  3 * durationHour  ],
    [  hour,  6,  6 * durationHour  ],
    [  hour, 12, 12 * durationHour  ],
    [   day,  1,      durationDay   ],
    [   day,  2,  2 * durationDay   ],
    [  week,  1,      durationWeek  ],
    [ month,  1,      durationMonth ],
    [ month,  3,  3 * durationMonth ],
    [  year,  1,      durationYear  ]
  ];

  function tickFormat(date) {
    return (second(date) < date ? formatMillisecond
        : minute(date) < date ? formatSecond
        : hour(date) < date ? formatMinute
        : day(date) < date ? formatHour
        : month(date) < date ? (week(date) < date ? formatDay : formatWeek)
        : year(date) < date ? formatMonth
        : formatYear)(date);
  }

  function tickInterval(interval, start, stop, step) {
    if (interval == null) interval = 10;

    // If a desired tick count is specified, pick a reasonable tick interval
    // based on the extent of the domain and a rough estimate of tick size.
    // Otherwise, assume interval is already a time interval and use it.
    if (typeof interval === "number") {
      var target = Math.abs(stop - start) / interval,
          i = d3Array.bisector(function(i) { return i[2]; }).right(tickIntervals, target);
      if (i === tickIntervals.length) {
        step = d3Array.tickStep(start / durationYear, stop / durationYear, interval);
        interval = year;
      } else if (i) {
        i = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
        step = i[1];
        interval = i[0];
      } else {
        step = d3Array.tickStep(start, stop, interval);
        interval = millisecond;
      }
    }

    return step == null ? interval : interval.every(step);
  }

  scale.invert = function(y) {
    return new Date(invert(y));
  };

  scale.domain = function(_) {
    return arguments.length ? domain(map$1.call(_, number$1)) : domain().map(date);
  };

  scale.ticks = function(interval, step) {
    var d = domain(),
        t0 = d[0],
        t1 = d[d.length - 1],
        r = t1 < t0,
        t;
    if (r) t = t0, t0 = t1, t1 = t;
    t = tickInterval(interval, t0, t1, step);
    t = t ? t.range(t0, t1 + 1) : []; // inclusive stop
    return r ? t.reverse() : t;
  };

  scale.tickFormat = function(count, specifier) {
    return specifier == null ? tickFormat : format$$1(specifier);
  };

  scale.nice = function(interval, step) {
    var d = domain();
    return (interval = tickInterval(interval, d[0], d[d.length - 1], step))
        ? domain(nice(d, interval))
        : scale;
  };

  scale.copy = function() {
    return copy(scale, calendar(year, month, week, day, hour, minute, second, millisecond, format$$1));
  };

  return scale;
}

var time = function() {
  return calendar(d3Time.timeYear, d3Time.timeMonth, d3Time.timeWeek, d3Time.timeDay, d3Time.timeHour, d3Time.timeMinute, d3Time.timeSecond, d3Time.timeMillisecond, d3TimeFormat.timeFormat).domain([new Date(2000, 0, 1), new Date(2000, 0, 2)]);
};

var utcTime = function() {
  return calendar(d3Time.utcYear, d3Time.utcMonth, d3Time.utcWeek, d3Time.utcDay, d3Time.utcHour, d3Time.utcMinute, d3Time.utcSecond, d3Time.utcMillisecond, d3TimeFormat.utcFormat).domain([Date.UTC(2000, 0, 1), Date.UTC(2000, 0, 2)]);
};

var colors = function(s) {
  return s.match(/.{6}/g).map(function(x) {
    return "#" + x;
  });
};

var category10 = colors("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf");

var category20b = colors("393b795254a36b6ecf9c9ede6379398ca252b5cf6bcedb9c8c6d31bd9e39e7ba52e7cb94843c39ad494ad6616be7969c7b4173a55194ce6dbdde9ed6");

var category20c = colors("3182bd6baed69ecae1c6dbefe6550dfd8d3cfdae6bfdd0a231a35474c476a1d99bc7e9c0756bb19e9ac8bcbddcdadaeb636363969696bdbdbdd9d9d9");

var category20 = colors("1f77b4aec7e8ff7f0effbb782ca02c98df8ad62728ff98969467bdc5b0d58c564bc49c94e377c2f7b6d27f7f7fc7c7c7bcbd22dbdb8d17becf9edae5");

var cubehelix$1 = d3Interpolate.interpolateCubehelixLong(d3Color.cubehelix(300, 0.5, 0.0), d3Color.cubehelix(-240, 0.5, 1.0));

var warm = d3Interpolate.interpolateCubehelixLong(d3Color.cubehelix(-100, 0.75, 0.35), d3Color.cubehelix(80, 1.50, 0.8));

var cool = d3Interpolate.interpolateCubehelixLong(d3Color.cubehelix(260, 0.75, 0.35), d3Color.cubehelix(80, 1.50, 0.8));

var rainbow = d3Color.cubehelix();

var rainbow$1 = function(t) {
  if (t < 0 || t > 1) t -= Math.floor(t);
  var ts = Math.abs(t - 0.5);
  rainbow.h = 360 * t - 100;
  rainbow.s = 1.5 - 1.5 * ts;
  rainbow.l = 0.8 - 0.9 * ts;
  return rainbow + "";
};

function ramp(range$$1) {
  var n = range$$1.length;
  return function(t) {
    return range$$1[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
  };
}

var viridis = ramp(colors("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725"));

var magma = ramp(colors("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf"));

var inferno = ramp(colors("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4"));

var plasma = ramp(colors("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));

function sequential(interpolator) {
  var x0 = 0,
      x1 = 1,
      clamp = false;

  function scale(x) {
    var t = (x - x0) / (x1 - x0);
    return interpolator(clamp ? Math.max(0, Math.min(1, t)) : t);
  }

  scale.domain = function(_) {
    return arguments.length ? (x0 = +_[0], x1 = +_[1], scale) : [x0, x1];
  };

  scale.clamp = function(_) {
    return arguments.length ? (clamp = !!_, scale) : clamp;
  };

  scale.interpolator = function(_) {
    return arguments.length ? (interpolator = _, scale) : interpolator;
  };

  scale.copy = function() {
    return sequential(interpolator).domain([x0, x1]).clamp(clamp);
  };

  return linearish(scale);
}

exports.scaleBand = band;
exports.scalePoint = point;
exports.scaleIdentity = identity;
exports.scaleLinear = linear;
exports.scaleLog = log;
exports.scaleOrdinal = ordinal;
exports.scaleImplicit = implicit;
exports.scalePow = pow;
exports.scaleSqrt = sqrt;
exports.scaleQuantile = quantile$1;
exports.scaleQuantize = quantize;
exports.scaleThreshold = threshold;
exports.scaleTime = time;
exports.scaleUtc = utcTime;
exports.schemeCategory10 = category10;
exports.schemeCategory20b = category20b;
exports.schemeCategory20c = category20c;
exports.schemeCategory20 = category20;
exports.interpolateCubehelixDefault = cubehelix$1;
exports.interpolateRainbow = rainbow$1;
exports.interpolateWarm = warm;
exports.interpolateCool = cool;
exports.interpolateViridis = viridis;
exports.interpolateMagma = magma;
exports.interpolateInferno = inferno;
exports.interpolatePlasma = plasma;
exports.scaleSequential = sequential;

Object.defineProperty(exports, '__esModule', { value: true });

})));

},{"d3-array":539,"d3-collection":540,"d3-color":541,"d3-format":542,"d3-interpolate":543,"d3-time":548,"d3-time-format":547}],546:[function(require,module,exports){
// https://d3js.org/d3-shape/ Version 1.2.0. Copyright 2017 Mike Bostock.
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-path')) :
	typeof define === 'function' && define.amd ? define(['exports', 'd3-path'], factory) :
	(factory((global.d3 = global.d3 || {}),global.d3));
}(this, (function (exports,d3Path) { 'use strict';

var constant = function(x) {
  return function constant() {
    return x;
  };
};

var abs = Math.abs;
var atan2 = Math.atan2;
var cos = Math.cos;
var max = Math.max;
var min = Math.min;
var sin = Math.sin;
var sqrt = Math.sqrt;

var epsilon = 1e-12;
var pi = Math.PI;
var halfPi = pi / 2;
var tau = 2 * pi;

function acos(x) {
  return x > 1 ? 0 : x < -1 ? pi : Math.acos(x);
}

function asin(x) {
  return x >= 1 ? halfPi : x <= -1 ? -halfPi : Math.asin(x);
}

function arcInnerRadius(d) {
  return d.innerRadius;
}

function arcOuterRadius(d) {
  return d.outerRadius;
}

function arcStartAngle(d) {
  return d.startAngle;
}

function arcEndAngle(d) {
  return d.endAngle;
}

function arcPadAngle(d) {
  return d && d.padAngle; // Note: optional!
}

function intersect(x0, y0, x1, y1, x2, y2, x3, y3) {
  var x10 = x1 - x0, y10 = y1 - y0,
      x32 = x3 - x2, y32 = y3 - y2,
      t = (x32 * (y0 - y2) - y32 * (x0 - x2)) / (y32 * x10 - x32 * y10);
  return [x0 + t * x10, y0 + t * y10];
}

// Compute perpendicular offset line of length rc.
// http://mathworld.wolfram.com/Circle-LineIntersection.html
function cornerTangents(x0, y0, x1, y1, r1, rc, cw) {
  var x01 = x0 - x1,
      y01 = y0 - y1,
      lo = (cw ? rc : -rc) / sqrt(x01 * x01 + y01 * y01),
      ox = lo * y01,
      oy = -lo * x01,
      x11 = x0 + ox,
      y11 = y0 + oy,
      x10 = x1 + ox,
      y10 = y1 + oy,
      x00 = (x11 + x10) / 2,
      y00 = (y11 + y10) / 2,
      dx = x10 - x11,
      dy = y10 - y11,
      d2 = dx * dx + dy * dy,
      r = r1 - rc,
      D = x11 * y10 - x10 * y11,
      d = (dy < 0 ? -1 : 1) * sqrt(max(0, r * r * d2 - D * D)),
      cx0 = (D * dy - dx * d) / d2,
      cy0 = (-D * dx - dy * d) / d2,
      cx1 = (D * dy + dx * d) / d2,
      cy1 = (-D * dx + dy * d) / d2,
      dx0 = cx0 - x00,
      dy0 = cy0 - y00,
      dx1 = cx1 - x00,
      dy1 = cy1 - y00;

  // Pick the closer of the two intersection points.
  // TODO Is there a faster way to determine which intersection to use?
  if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) cx0 = cx1, cy0 = cy1;

  return {
    cx: cx0,
    cy: cy0,
    x01: -ox,
    y01: -oy,
    x11: cx0 * (r1 / r - 1),
    y11: cy0 * (r1 / r - 1)
  };
}

var arc = function() {
  var innerRadius = arcInnerRadius,
      outerRadius = arcOuterRadius,
      cornerRadius = constant(0),
      padRadius = null,
      startAngle = arcStartAngle,
      endAngle = arcEndAngle,
      padAngle = arcPadAngle,
      context = null;

  function arc() {
    var buffer,
        r,
        r0 = +innerRadius.apply(this, arguments),
        r1 = +outerRadius.apply(this, arguments),
        a0 = startAngle.apply(this, arguments) - halfPi,
        a1 = endAngle.apply(this, arguments) - halfPi,
        da = abs(a1 - a0),
        cw = a1 > a0;

    if (!context) context = buffer = d3Path.path();

    // Ensure that the outer radius is always larger than the inner radius.
    if (r1 < r0) r = r1, r1 = r0, r0 = r;

    // Is it a point?
    if (!(r1 > epsilon)) context.moveTo(0, 0);

    // Or is it a circle or annulus?
    else if (da > tau - epsilon) {
      context.moveTo(r1 * cos(a0), r1 * sin(a0));
      context.arc(0, 0, r1, a0, a1, !cw);
      if (r0 > epsilon) {
        context.moveTo(r0 * cos(a1), r0 * sin(a1));
        context.arc(0, 0, r0, a1, a0, cw);
      }
    }

    // Or is it a circular or annular sector?
    else {
      var a01 = a0,
          a11 = a1,
          a00 = a0,
          a10 = a1,
          da0 = da,
          da1 = da,
          ap = padAngle.apply(this, arguments) / 2,
          rp = (ap > epsilon) && (padRadius ? +padRadius.apply(this, arguments) : sqrt(r0 * r0 + r1 * r1)),
          rc = min(abs(r1 - r0) / 2, +cornerRadius.apply(this, arguments)),
          rc0 = rc,
          rc1 = rc,
          t0,
          t1;

      // Apply padding? Note that since r1 ≥ r0, da1 ≥ da0.
      if (rp > epsilon) {
        var p0 = asin(rp / r0 * sin(ap)),
            p1 = asin(rp / r1 * sin(ap));
        if ((da0 -= p0 * 2) > epsilon) p0 *= (cw ? 1 : -1), a00 += p0, a10 -= p0;
        else da0 = 0, a00 = a10 = (a0 + a1) / 2;
        if ((da1 -= p1 * 2) > epsilon) p1 *= (cw ? 1 : -1), a01 += p1, a11 -= p1;
        else da1 = 0, a01 = a11 = (a0 + a1) / 2;
      }

      var x01 = r1 * cos(a01),
          y01 = r1 * sin(a01),
          x10 = r0 * cos(a10),
          y10 = r0 * sin(a10);

      // Apply rounded corners?
      if (rc > epsilon) {
        var x11 = r1 * cos(a11),
            y11 = r1 * sin(a11),
            x00 = r0 * cos(a00),
            y00 = r0 * sin(a00);

        // Restrict the corner radius according to the sector angle.
        if (da < pi) {
          var oc = da0 > epsilon ? intersect(x01, y01, x00, y00, x11, y11, x10, y10) : [x10, y10],
              ax = x01 - oc[0],
              ay = y01 - oc[1],
              bx = x11 - oc[0],
              by = y11 - oc[1],
              kc = 1 / sin(acos((ax * bx + ay * by) / (sqrt(ax * ax + ay * ay) * sqrt(bx * bx + by * by))) / 2),
              lc = sqrt(oc[0] * oc[0] + oc[1] * oc[1]);
          rc0 = min(rc, (r0 - lc) / (kc - 1));
          rc1 = min(rc, (r1 - lc) / (kc + 1));
        }
      }

      // Is the sector collapsed to a line?
      if (!(da1 > epsilon)) context.moveTo(x01, y01);

      // Does the sector’s outer ring have rounded corners?
      else if (rc1 > epsilon) {
        t0 = cornerTangents(x00, y00, x01, y01, r1, rc1, cw);
        t1 = cornerTangents(x11, y11, x10, y10, r1, rc1, cw);

        context.moveTo(t0.cx + t0.x01, t0.cy + t0.y01);

        // Have the corners merged?
        if (rc1 < rc) context.arc(t0.cx, t0.cy, rc1, atan2(t0.y01, t0.x01), atan2(t1.y01, t1.x01), !cw);

        // Otherwise, draw the two corners and the ring.
        else {
          context.arc(t0.cx, t0.cy, rc1, atan2(t0.y01, t0.x01), atan2(t0.y11, t0.x11), !cw);
          context.arc(0, 0, r1, atan2(t0.cy + t0.y11, t0.cx + t0.x11), atan2(t1.cy + t1.y11, t1.cx + t1.x11), !cw);
          context.arc(t1.cx, t1.cy, rc1, atan2(t1.y11, t1.x11), atan2(t1.y01, t1.x01), !cw);
        }
      }

      // Or is the outer ring just a circular arc?
      else context.moveTo(x01, y01), context.arc(0, 0, r1, a01, a11, !cw);

      // Is there no inner ring, and it’s a circular sector?
      // Or perhaps it’s an annular sector collapsed due to padding?
      if (!(r0 > epsilon) || !(da0 > epsilon)) context.lineTo(x10, y10);

      // Does the sector’s inner ring (or point) have rounded corners?
      else if (rc0 > epsilon) {
        t0 = cornerTangents(x10, y10, x11, y11, r0, -rc0, cw);
        t1 = cornerTangents(x01, y01, x00, y00, r0, -rc0, cw);

        context.lineTo(t0.cx + t0.x01, t0.cy + t0.y01);

        // Have the corners merged?
        if (rc0 < rc) context.arc(t0.cx, t0.cy, rc0, atan2(t0.y01, t0.x01), atan2(t1.y01, t1.x01), !cw);

        // Otherwise, draw the two corners and the ring.
        else {
          context.arc(t0.cx, t0.cy, rc0, atan2(t0.y01, t0.x01), atan2(t0.y11, t0.x11), !cw);
          context.arc(0, 0, r0, atan2(t0.cy + t0.y11, t0.cx + t0.x11), atan2(t1.cy + t1.y11, t1.cx + t1.x11), cw);
          context.arc(t1.cx, t1.cy, rc0, atan2(t1.y11, t1.x11), atan2(t1.y01, t1.x01), !cw);
        }
      }

      // Or is the inner ring just a circular arc?
      else context.arc(0, 0, r0, a10, a00, cw);
    }

    context.closePath();

    if (buffer) return context = null, buffer + "" || null;
  }

  arc.centroid = function() {
    var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2,
        a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - pi / 2;
    return [cos(a) * r, sin(a) * r];
  };

  arc.innerRadius = function(_) {
    return arguments.length ? (innerRadius = typeof _ === "function" ? _ : constant(+_), arc) : innerRadius;
  };

  arc.outerRadius = function(_) {
    return arguments.length ? (outerRadius = typeof _ === "function" ? _ : constant(+_), arc) : outerRadius;
  };

  arc.cornerRadius = function(_) {
    return arguments.length ? (cornerRadius = typeof _ === "function" ? _ : constant(+_), arc) : cornerRadius;
  };

  arc.padRadius = function(_) {
    return arguments.length ? (padRadius = _ == null ? null : typeof _ === "function" ? _ : constant(+_), arc) : padRadius;
  };

  arc.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant(+_), arc) : startAngle;
  };

  arc.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant(+_), arc) : endAngle;
  };

  arc.padAngle = function(_) {
    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant(+_), arc) : padAngle;
  };

  arc.context = function(_) {
    return arguments.length ? ((context = _ == null ? null : _), arc) : context;
  };

  return arc;
};

function Linear(context) {
  this._context = context;
}

Linear.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; // proceed
      default: this._context.lineTo(x, y); break;
    }
  }
};

var curveLinear = function(context) {
  return new Linear(context);
};

function x(p) {
  return p[0];
}

function y(p) {
  return p[1];
}

var line = function() {
  var x$$1 = x,
      y$$1 = y,
      defined = constant(true),
      context = null,
      curve = curveLinear,
      output = null;

  function line(data) {
    var i,
        n = data.length,
        d,
        defined0 = false,
        buffer;

    if (context == null) output = curve(buffer = d3Path.path());

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) output.lineStart();
        else output.lineEnd();
      }
      if (defined0) output.point(+x$$1(d, i, data), +y$$1(d, i, data));
    }

    if (buffer) return output = null, buffer + "" || null;
  }

  line.x = function(_) {
    return arguments.length ? (x$$1 = typeof _ === "function" ? _ : constant(+_), line) : x$$1;
  };

  line.y = function(_) {
    return arguments.length ? (y$$1 = typeof _ === "function" ? _ : constant(+_), line) : y$$1;
  };

  line.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant(!!_), line) : defined;
  };

  line.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
  };

  line.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
  };

  return line;
};

var area = function() {
  var x0 = x,
      x1 = null,
      y0 = constant(0),
      y1 = y,
      defined = constant(true),
      context = null,
      curve = curveLinear,
      output = null;

  function area(data) {
    var i,
        j,
        k,
        n = data.length,
        d,
        defined0 = false,
        buffer,
        x0z = new Array(n),
        y0z = new Array(n);

    if (context == null) output = curve(buffer = d3Path.path());

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) {
          j = i;
          output.areaStart();
          output.lineStart();
        } else {
          output.lineEnd();
          output.lineStart();
          for (k = i - 1; k >= j; --k) {
            output.point(x0z[k], y0z[k]);
          }
          output.lineEnd();
          output.areaEnd();
        }
      }
      if (defined0) {
        x0z[i] = +x0(d, i, data), y0z[i] = +y0(d, i, data);
        output.point(x1 ? +x1(d, i, data) : x0z[i], y1 ? +y1(d, i, data) : y0z[i]);
      }
    }

    if (buffer) return output = null, buffer + "" || null;
  }

  function arealine() {
    return line().defined(defined).curve(curve).context(context);
  }

  area.x = function(_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant(+_), x1 = null, area) : x0;
  };

  area.x0 = function(_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant(+_), area) : x0;
  };

  area.x1 = function(_) {
    return arguments.length ? (x1 = _ == null ? null : typeof _ === "function" ? _ : constant(+_), area) : x1;
  };

  area.y = function(_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant(+_), y1 = null, area) : y0;
  };

  area.y0 = function(_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant(+_), area) : y0;
  };

  area.y1 = function(_) {
    return arguments.length ? (y1 = _ == null ? null : typeof _ === "function" ? _ : constant(+_), area) : y1;
  };

  area.lineX0 =
  area.lineY0 = function() {
    return arealine().x(x0).y(y0);
  };

  area.lineY1 = function() {
    return arealine().x(x0).y(y1);
  };

  area.lineX1 = function() {
    return arealine().x(x1).y(y0);
  };

  area.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant(!!_), area) : defined;
  };

  area.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), area) : curve;
  };

  area.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), area) : context;
  };

  return area;
};

var descending = function(a, b) {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
};

var identity = function(d) {
  return d;
};

var pie = function() {
  var value = identity,
      sortValues = descending,
      sort = null,
      startAngle = constant(0),
      endAngle = constant(tau),
      padAngle = constant(0);

  function pie(data) {
    var i,
        n = data.length,
        j,
        k,
        sum = 0,
        index = new Array(n),
        arcs = new Array(n),
        a0 = +startAngle.apply(this, arguments),
        da = Math.min(tau, Math.max(-tau, endAngle.apply(this, arguments) - a0)),
        a1,
        p = Math.min(Math.abs(da) / n, padAngle.apply(this, arguments)),
        pa = p * (da < 0 ? -1 : 1),
        v;

    for (i = 0; i < n; ++i) {
      if ((v = arcs[index[i] = i] = +value(data[i], i, data)) > 0) {
        sum += v;
      }
    }

    // Optionally sort the arcs by previously-computed values or by data.
    if (sortValues != null) index.sort(function(i, j) { return sortValues(arcs[i], arcs[j]); });
    else if (sort != null) index.sort(function(i, j) { return sort(data[i], data[j]); });

    // Compute the arcs! They are stored in the original data's order.
    for (i = 0, k = sum ? (da - n * pa) / sum : 0; i < n; ++i, a0 = a1) {
      j = index[i], v = arcs[j], a1 = a0 + (v > 0 ? v * k : 0) + pa, arcs[j] = {
        data: data[j],
        index: i,
        value: v,
        startAngle: a0,
        endAngle: a1,
        padAngle: p
      };
    }

    return arcs;
  }

  pie.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : constant(+_), pie) : value;
  };

  pie.sortValues = function(_) {
    return arguments.length ? (sortValues = _, sort = null, pie) : sortValues;
  };

  pie.sort = function(_) {
    return arguments.length ? (sort = _, sortValues = null, pie) : sort;
  };

  pie.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant(+_), pie) : startAngle;
  };

  pie.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant(+_), pie) : endAngle;
  };

  pie.padAngle = function(_) {
    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant(+_), pie) : padAngle;
  };

  return pie;
};

var curveRadialLinear = curveRadial(curveLinear);

function Radial(curve) {
  this._curve = curve;
}

Radial.prototype = {
  areaStart: function() {
    this._curve.areaStart();
  },
  areaEnd: function() {
    this._curve.areaEnd();
  },
  lineStart: function() {
    this._curve.lineStart();
  },
  lineEnd: function() {
    this._curve.lineEnd();
  },
  point: function(a, r) {
    this._curve.point(r * Math.sin(a), r * -Math.cos(a));
  }
};

function curveRadial(curve) {

  function radial(context) {
    return new Radial(curve(context));
  }

  radial._curve = curve;

  return radial;
}

function lineRadial(l) {
  var c = l.curve;

  l.angle = l.x, delete l.x;
  l.radius = l.y, delete l.y;

  l.curve = function(_) {
    return arguments.length ? c(curveRadial(_)) : c()._curve;
  };

  return l;
}

var lineRadial$1 = function() {
  return lineRadial(line().curve(curveRadialLinear));
};

var areaRadial = function() {
  var a = area().curve(curveRadialLinear),
      c = a.curve,
      x0 = a.lineX0,
      x1 = a.lineX1,
      y0 = a.lineY0,
      y1 = a.lineY1;

  a.angle = a.x, delete a.x;
  a.startAngle = a.x0, delete a.x0;
  a.endAngle = a.x1, delete a.x1;
  a.radius = a.y, delete a.y;
  a.innerRadius = a.y0, delete a.y0;
  a.outerRadius = a.y1, delete a.y1;
  a.lineStartAngle = function() { return lineRadial(x0()); }, delete a.lineX0;
  a.lineEndAngle = function() { return lineRadial(x1()); }, delete a.lineX1;
  a.lineInnerRadius = function() { return lineRadial(y0()); }, delete a.lineY0;
  a.lineOuterRadius = function() { return lineRadial(y1()); }, delete a.lineY1;

  a.curve = function(_) {
    return arguments.length ? c(curveRadial(_)) : c()._curve;
  };

  return a;
};

var pointRadial = function(x, y) {
  return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
};

var slice = Array.prototype.slice;

function linkSource(d) {
  return d.source;
}

function linkTarget(d) {
  return d.target;
}

function link(curve) {
  var source = linkSource,
      target = linkTarget,
      x$$1 = x,
      y$$1 = y,
      context = null;

  function link() {
    var buffer, argv = slice.call(arguments), s = source.apply(this, argv), t = target.apply(this, argv);
    if (!context) context = buffer = d3Path.path();
    curve(context, +x$$1.apply(this, (argv[0] = s, argv)), +y$$1.apply(this, argv), +x$$1.apply(this, (argv[0] = t, argv)), +y$$1.apply(this, argv));
    if (buffer) return context = null, buffer + "" || null;
  }

  link.source = function(_) {
    return arguments.length ? (source = _, link) : source;
  };

  link.target = function(_) {
    return arguments.length ? (target = _, link) : target;
  };

  link.x = function(_) {
    return arguments.length ? (x$$1 = typeof _ === "function" ? _ : constant(+_), link) : x$$1;
  };

  link.y = function(_) {
    return arguments.length ? (y$$1 = typeof _ === "function" ? _ : constant(+_), link) : y$$1;
  };

  link.context = function(_) {
    return arguments.length ? ((context = _ == null ? null : _), link) : context;
  };

  return link;
}

function curveHorizontal(context, x0, y0, x1, y1) {
  context.moveTo(x0, y0);
  context.bezierCurveTo(x0 = (x0 + x1) / 2, y0, x0, y1, x1, y1);
}

function curveVertical(context, x0, y0, x1, y1) {
  context.moveTo(x0, y0);
  context.bezierCurveTo(x0, y0 = (y0 + y1) / 2, x1, y0, x1, y1);
}

function curveRadial$1(context, x0, y0, x1, y1) {
  var p0 = pointRadial(x0, y0),
      p1 = pointRadial(x0, y0 = (y0 + y1) / 2),
      p2 = pointRadial(x1, y0),
      p3 = pointRadial(x1, y1);
  context.moveTo(p0[0], p0[1]);
  context.bezierCurveTo(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
}

function linkHorizontal() {
  return link(curveHorizontal);
}

function linkVertical() {
  return link(curveVertical);
}

function linkRadial() {
  var l = link(curveRadial$1);
  l.angle = l.x, delete l.x;
  l.radius = l.y, delete l.y;
  return l;
}

var circle = {
  draw: function(context, size) {
    var r = Math.sqrt(size / pi);
    context.moveTo(r, 0);
    context.arc(0, 0, r, 0, tau);
  }
};

var cross = {
  draw: function(context, size) {
    var r = Math.sqrt(size / 5) / 2;
    context.moveTo(-3 * r, -r);
    context.lineTo(-r, -r);
    context.lineTo(-r, -3 * r);
    context.lineTo(r, -3 * r);
    context.lineTo(r, -r);
    context.lineTo(3 * r, -r);
    context.lineTo(3 * r, r);
    context.lineTo(r, r);
    context.lineTo(r, 3 * r);
    context.lineTo(-r, 3 * r);
    context.lineTo(-r, r);
    context.lineTo(-3 * r, r);
    context.closePath();
  }
};

var tan30 = Math.sqrt(1 / 3);
var tan30_2 = tan30 * 2;

var diamond = {
  draw: function(context, size) {
    var y = Math.sqrt(size / tan30_2),
        x = y * tan30;
    context.moveTo(0, -y);
    context.lineTo(x, 0);
    context.lineTo(0, y);
    context.lineTo(-x, 0);
    context.closePath();
  }
};

var ka = 0.89081309152928522810;
var kr = Math.sin(pi / 10) / Math.sin(7 * pi / 10);
var kx = Math.sin(tau / 10) * kr;
var ky = -Math.cos(tau / 10) * kr;

var star = {
  draw: function(context, size) {
    var r = Math.sqrt(size * ka),
        x = kx * r,
        y = ky * r;
    context.moveTo(0, -r);
    context.lineTo(x, y);
    for (var i = 1; i < 5; ++i) {
      var a = tau * i / 5,
          c = Math.cos(a),
          s = Math.sin(a);
      context.lineTo(s * r, -c * r);
      context.lineTo(c * x - s * y, s * x + c * y);
    }
    context.closePath();
  }
};

var square = {
  draw: function(context, size) {
    var w = Math.sqrt(size),
        x = -w / 2;
    context.rect(x, x, w, w);
  }
};

var sqrt3 = Math.sqrt(3);

var triangle = {
  draw: function(context, size) {
    var y = -Math.sqrt(size / (sqrt3 * 3));
    context.moveTo(0, y * 2);
    context.lineTo(-sqrt3 * y, -y);
    context.lineTo(sqrt3 * y, -y);
    context.closePath();
  }
};

var c = -0.5;
var s = Math.sqrt(3) / 2;
var k = 1 / Math.sqrt(12);
var a = (k / 2 + 1) * 3;

var wye = {
  draw: function(context, size) {
    var r = Math.sqrt(size / a),
        x0 = r / 2,
        y0 = r * k,
        x1 = x0,
        y1 = r * k + r,
        x2 = -x1,
        y2 = y1;
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(c * x0 - s * y0, s * x0 + c * y0);
    context.lineTo(c * x1 - s * y1, s * x1 + c * y1);
    context.lineTo(c * x2 - s * y2, s * x2 + c * y2);
    context.lineTo(c * x0 + s * y0, c * y0 - s * x0);
    context.lineTo(c * x1 + s * y1, c * y1 - s * x1);
    context.lineTo(c * x2 + s * y2, c * y2 - s * x2);
    context.closePath();
  }
};

var symbols = [
  circle,
  cross,
  diamond,
  square,
  star,
  triangle,
  wye
];

var symbol = function() {
  var type = constant(circle),
      size = constant(64),
      context = null;

  function symbol() {
    var buffer;
    if (!context) context = buffer = d3Path.path();
    type.apply(this, arguments).draw(context, +size.apply(this, arguments));
    if (buffer) return context = null, buffer + "" || null;
  }

  symbol.type = function(_) {
    return arguments.length ? (type = typeof _ === "function" ? _ : constant(_), symbol) : type;
  };

  symbol.size = function(_) {
    return arguments.length ? (size = typeof _ === "function" ? _ : constant(+_), symbol) : size;
  };

  symbol.context = function(_) {
    return arguments.length ? (context = _ == null ? null : _, symbol) : context;
  };

  return symbol;
};

var noop = function() {};

function point(that, x, y) {
  that._context.bezierCurveTo(
    (2 * that._x0 + that._x1) / 3,
    (2 * that._y0 + that._y1) / 3,
    (that._x0 + 2 * that._x1) / 3,
    (that._y0 + 2 * that._y1) / 3,
    (that._x0 + 4 * that._x1 + x) / 6,
    (that._y0 + 4 * that._y1 + y) / 6
  );
}

function Basis(context) {
  this._context = context;
}

Basis.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 3: point(this, this._x1, this._y1); // proceed
      case 2: this._context.lineTo(this._x1, this._y1); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6); // proceed
      default: point(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

var basis = function(context) {
  return new Basis(context);
};

function BasisClosed(context) {
  this._context = context;
}

BasisClosed.prototype = {
  areaStart: noop,
  areaEnd: noop,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 =
    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x2, this._y2);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);
        this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x2, this._y2);
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        break;
      }
    }
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._x2 = x, this._y2 = y; break;
      case 1: this._point = 2; this._x3 = x, this._y3 = y; break;
      case 2: this._point = 3; this._x4 = x, this._y4 = y; this._context.moveTo((this._x0 + 4 * this._x1 + x) / 6, (this._y0 + 4 * this._y1 + y) / 6); break;
      default: point(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

var basisClosed = function(context) {
  return new BasisClosed(context);
};

function BasisOpen(context) {
  this._context = context;
}

BasisOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; var x0 = (this._x0 + 4 * this._x1 + x) / 6, y0 = (this._y0 + 4 * this._y1 + y) / 6; this._line ? this._context.lineTo(x0, y0) : this._context.moveTo(x0, y0); break;
      case 3: this._point = 4; // proceed
      default: point(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

var basisOpen = function(context) {
  return new BasisOpen(context);
};

function Bundle(context, beta) {
  this._basis = new Basis(context);
  this._beta = beta;
}

Bundle.prototype = {
  lineStart: function() {
    this._x = [];
    this._y = [];
    this._basis.lineStart();
  },
  lineEnd: function() {
    var x = this._x,
        y = this._y,
        j = x.length - 1;

    if (j > 0) {
      var x0 = x[0],
          y0 = y[0],
          dx = x[j] - x0,
          dy = y[j] - y0,
          i = -1,
          t;

      while (++i <= j) {
        t = i / j;
        this._basis.point(
          this._beta * x[i] + (1 - this._beta) * (x0 + t * dx),
          this._beta * y[i] + (1 - this._beta) * (y0 + t * dy)
        );
      }
    }

    this._x = this._y = null;
    this._basis.lineEnd();
  },
  point: function(x, y) {
    this._x.push(+x);
    this._y.push(+y);
  }
};

var bundle = ((function custom(beta) {

  function bundle(context) {
    return beta === 1 ? new Basis(context) : new Bundle(context, beta);
  }

  bundle.beta = function(beta) {
    return custom(+beta);
  };

  return bundle;
}))(0.85);

function point$1(that, x, y) {
  that._context.bezierCurveTo(
    that._x1 + that._k * (that._x2 - that._x0),
    that._y1 + that._k * (that._y2 - that._y0),
    that._x2 + that._k * (that._x1 - x),
    that._y2 + that._k * (that._y1 - y),
    that._x2,
    that._y2
  );
}

function Cardinal(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

Cardinal.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x2, this._y2); break;
      case 3: point$1(this, this._x1, this._y1); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; this._x1 = x, this._y1 = y; break;
      case 2: this._point = 3; // proceed
      default: point$1(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var cardinal = ((function custom(tension) {

  function cardinal(context) {
    return new Cardinal(context, tension);
  }

  cardinal.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal;
}))(0);

function CardinalClosed(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

CardinalClosed.prototype = {
  areaStart: noop,
  areaEnd: noop,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 =
    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._x3 = x, this._y3 = y; break;
      case 1: this._point = 2; this._context.moveTo(this._x4 = x, this._y4 = y); break;
      case 2: this._point = 3; this._x5 = x, this._y5 = y; break;
      default: point$1(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var cardinalClosed = ((function custom(tension) {

  function cardinal(context) {
    return new CardinalClosed(context, tension);
  }

  cardinal.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal;
}))(0);

function CardinalOpen(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

CardinalOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2); break;
      case 3: this._point = 4; // proceed
      default: point$1(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var cardinalOpen = ((function custom(tension) {

  function cardinal(context) {
    return new CardinalOpen(context, tension);
  }

  cardinal.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal;
}))(0);

function point$2(that, x, y) {
  var x1 = that._x1,
      y1 = that._y1,
      x2 = that._x2,
      y2 = that._y2;

  if (that._l01_a > epsilon) {
    var a = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a,
        n = 3 * that._l01_a * (that._l01_a + that._l12_a);
    x1 = (x1 * a - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n;
    y1 = (y1 * a - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n;
  }

  if (that._l23_a > epsilon) {
    var b = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a,
        m = 3 * that._l23_a * (that._l23_a + that._l12_a);
    x2 = (x2 * b + that._x1 * that._l23_2a - x * that._l12_2a) / m;
    y2 = (y2 * b + that._y1 * that._l23_2a - y * that._l12_2a) / m;
  }

  that._context.bezierCurveTo(x1, y1, x2, y2, that._x2, that._y2);
}

function CatmullRom(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRom.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a =
    this._l01_2a = this._l12_2a = this._l23_2a =
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x2, this._y2); break;
      case 3: this.point(this._x2, this._y2); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; // proceed
      default: point$2(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var catmullRom = ((function custom(alpha) {

  function catmullRom(context) {
    return alpha ? new CatmullRom(context, alpha) : new Cardinal(context, 0);
  }

  catmullRom.alpha = function(alpha) {
    return custom(+alpha);
  };

  return catmullRom;
}))(0.5);

function CatmullRomClosed(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRomClosed.prototype = {
  areaStart: noop,
  areaEnd: noop,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 =
    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._l01_a = this._l12_a = this._l23_a =
    this._l01_2a = this._l12_2a = this._l23_2a =
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0: this._point = 1; this._x3 = x, this._y3 = y; break;
      case 1: this._point = 2; this._context.moveTo(this._x4 = x, this._y4 = y); break;
      case 2: this._point = 3; this._x5 = x, this._y5 = y; break;
      default: point$2(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var catmullRomClosed = ((function custom(alpha) {

  function catmullRom(context) {
    return alpha ? new CatmullRomClosed(context, alpha) : new CardinalClosed(context, 0);
  }

  catmullRom.alpha = function(alpha) {
    return custom(+alpha);
  };

  return catmullRom;
}))(0.5);

function CatmullRomOpen(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRomOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a =
    this._l01_2a = this._l12_2a = this._l23_2a =
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0: this._point = 1; break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2); break;
      case 3: this._point = 4; // proceed
      default: point$2(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var catmullRomOpen = ((function custom(alpha) {

  function catmullRom(context) {
    return alpha ? new CatmullRomOpen(context, alpha) : new CardinalOpen(context, 0);
  }

  catmullRom.alpha = function(alpha) {
    return custom(+alpha);
  };

  return catmullRom;
}))(0.5);

function LinearClosed(context) {
  this._context = context;
}

LinearClosed.prototype = {
  areaStart: noop,
  areaEnd: noop,
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._point) this._context.closePath();
  },
  point: function(x, y) {
    x = +x, y = +y;
    if (this._point) this._context.lineTo(x, y);
    else this._point = 1, this._context.moveTo(x, y);
  }
};

var linearClosed = function(context) {
  return new LinearClosed(context);
};

function sign(x) {
  return x < 0 ? -1 : 1;
}

// Calculate the slopes of the tangents (Hermite-type interpolation) based on
// the following paper: Steffen, M. 1990. A Simple Method for Monotonic
// Interpolation in One Dimension. Astronomy and Astrophysics, Vol. 239, NO.
// NOV(II), P. 443, 1990.
function slope3(that, x2, y2) {
  var h0 = that._x1 - that._x0,
      h1 = x2 - that._x1,
      s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0),
      s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0),
      p = (s0 * h1 + s1 * h0) / (h0 + h1);
  return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
}

// Calculate a one-sided slope.
function slope2(that, t) {
  var h = that._x1 - that._x0;
  return h ? (3 * (that._y1 - that._y0) / h - t) / 2 : t;
}

// According to https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Representations
// "you can express cubic Hermite interpolation in terms of cubic Bézier curves
// with respect to the four values p0, p0 + m0 / 3, p1 - m1 / 3, p1".
function point$3(that, t0, t1) {
  var x0 = that._x0,
      y0 = that._y0,
      x1 = that._x1,
      y1 = that._y1,
      dx = (x1 - x0) / 3;
  that._context.bezierCurveTo(x0 + dx, y0 + dx * t0, x1 - dx, y1 - dx * t1, x1, y1);
}

function MonotoneX(context) {
  this._context = context;
}

MonotoneX.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 =
    this._t0 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x1, this._y1); break;
      case 3: point$3(this, this._t0, slope2(this, this._t0)); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    var t1 = NaN;

    x = +x, y = +y;
    if (x === this._x1 && y === this._y1) return; // Ignore coincident points.
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; point$3(this, slope2(this, t1 = slope3(this, x, y)), t1); break;
      default: point$3(this, this._t0, t1 = slope3(this, x, y)); break;
    }

    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
    this._t0 = t1;
  }
};

function MonotoneY(context) {
  this._context = new ReflectContext(context);
}

(MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function(x, y) {
  MonotoneX.prototype.point.call(this, y, x);
};

function ReflectContext(context) {
  this._context = context;
}

ReflectContext.prototype = {
  moveTo: function(x, y) { this._context.moveTo(y, x); },
  closePath: function() { this._context.closePath(); },
  lineTo: function(x, y) { this._context.lineTo(y, x); },
  bezierCurveTo: function(x1, y1, x2, y2, x, y) { this._context.bezierCurveTo(y1, x1, y2, x2, y, x); }
};

function monotoneX(context) {
  return new MonotoneX(context);
}

function monotoneY(context) {
  return new MonotoneY(context);
}

function Natural(context) {
  this._context = context;
}

Natural.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = [];
    this._y = [];
  },
  lineEnd: function() {
    var x = this._x,
        y = this._y,
        n = x.length;

    if (n) {
      this._line ? this._context.lineTo(x[0], y[0]) : this._context.moveTo(x[0], y[0]);
      if (n === 2) {
        this._context.lineTo(x[1], y[1]);
      } else {
        var px = controlPoints(x),
            py = controlPoints(y);
        for (var i0 = 0, i1 = 1; i1 < n; ++i0, ++i1) {
          this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x[i1], y[i1]);
        }
      }
    }

    if (this._line || (this._line !== 0 && n === 1)) this._context.closePath();
    this._line = 1 - this._line;
    this._x = this._y = null;
  },
  point: function(x, y) {
    this._x.push(+x);
    this._y.push(+y);
  }
};

// See https://www.particleincell.com/2012/bezier-splines/ for derivation.
function controlPoints(x) {
  var i,
      n = x.length - 1,
      m,
      a = new Array(n),
      b = new Array(n),
      r = new Array(n);
  a[0] = 0, b[0] = 2, r[0] = x[0] + 2 * x[1];
  for (i = 1; i < n - 1; ++i) a[i] = 1, b[i] = 4, r[i] = 4 * x[i] + 2 * x[i + 1];
  a[n - 1] = 2, b[n - 1] = 7, r[n - 1] = 8 * x[n - 1] + x[n];
  for (i = 1; i < n; ++i) m = a[i] / b[i - 1], b[i] -= m, r[i] -= m * r[i - 1];
  a[n - 1] = r[n - 1] / b[n - 1];
  for (i = n - 2; i >= 0; --i) a[i] = (r[i] - a[i + 1]) / b[i];
  b[n - 1] = (x[n] + a[n - 1]) / 2;
  for (i = 0; i < n - 1; ++i) b[i] = 2 * x[i + 1] - a[i + 1];
  return [a, b];
}

var natural = function(context) {
  return new Natural(context);
};

function Step(context, t) {
  this._context = context;
  this._t = t;
}

Step.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = this._y = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (0 < this._t && this._t < 1 && this._point === 2) this._context.lineTo(this._x, this._y);
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    if (this._line >= 0) this._t = 1 - this._t, this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; // proceed
      default: {
        if (this._t <= 0) {
          this._context.lineTo(this._x, y);
          this._context.lineTo(x, y);
        } else {
          var x1 = this._x * (1 - this._t) + x * this._t;
          this._context.lineTo(x1, this._y);
          this._context.lineTo(x1, y);
        }
        break;
      }
    }
    this._x = x, this._y = y;
  }
};

var step = function(context) {
  return new Step(context, 0.5);
};

function stepBefore(context) {
  return new Step(context, 0);
}

function stepAfter(context) {
  return new Step(context, 1);
}

var none = function(series, order) {
  if (!((n = series.length) > 1)) return;
  for (var i = 1, j, s0, s1 = series[order[0]], n, m = s1.length; i < n; ++i) {
    s0 = s1, s1 = series[order[i]];
    for (j = 0; j < m; ++j) {
      s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
    }
  }
};

var none$1 = function(series) {
  var n = series.length, o = new Array(n);
  while (--n >= 0) o[n] = n;
  return o;
};

function stackValue(d, key) {
  return d[key];
}

var stack = function() {
  var keys = constant([]),
      order = none$1,
      offset = none,
      value = stackValue;

  function stack(data) {
    var kz = keys.apply(this, arguments),
        i,
        m = data.length,
        n = kz.length,
        sz = new Array(n),
        oz;

    for (i = 0; i < n; ++i) {
      for (var ki = kz[i], si = sz[i] = new Array(m), j = 0, sij; j < m; ++j) {
        si[j] = sij = [0, +value(data[j], ki, j, data)];
        sij.data = data[j];
      }
      si.key = ki;
    }

    for (i = 0, oz = order(sz); i < n; ++i) {
      sz[oz[i]].index = i;
    }

    offset(sz, oz);
    return sz;
  }

  stack.keys = function(_) {
    return arguments.length ? (keys = typeof _ === "function" ? _ : constant(slice.call(_)), stack) : keys;
  };

  stack.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : constant(+_), stack) : value;
  };

  stack.order = function(_) {
    return arguments.length ? (order = _ == null ? none$1 : typeof _ === "function" ? _ : constant(slice.call(_)), stack) : order;
  };

  stack.offset = function(_) {
    return arguments.length ? (offset = _ == null ? none : _, stack) : offset;
  };

  return stack;
};

var expand = function(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var i, n, j = 0, m = series[0].length, y; j < m; ++j) {
    for (y = i = 0; i < n; ++i) y += series[i][j][1] || 0;
    if (y) for (i = 0; i < n; ++i) series[i][j][1] /= y;
  }
  none(series, order);
};

var diverging = function(series, order) {
  if (!((n = series.length) > 1)) return;
  for (var i, j = 0, d, dy, yp, yn, n, m = series[order[0]].length; j < m; ++j) {
    for (yp = yn = 0, i = 0; i < n; ++i) {
      if ((dy = (d = series[order[i]][j])[1] - d[0]) >= 0) {
        d[0] = yp, d[1] = yp += dy;
      } else if (dy < 0) {
        d[1] = yn, d[0] = yn += dy;
      } else {
        d[0] = yp;
      }
    }
  }
};

var silhouette = function(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var j = 0, s0 = series[order[0]], n, m = s0.length; j < m; ++j) {
    for (var i = 0, y = 0; i < n; ++i) y += series[i][j][1] || 0;
    s0[j][1] += s0[j][0] = -y / 2;
  }
  none(series, order);
};

var wiggle = function(series, order) {
  if (!((n = series.length) > 0) || !((m = (s0 = series[order[0]]).length) > 0)) return;
  for (var y = 0, j = 1, s0, m, n; j < m; ++j) {
    for (var i = 0, s1 = 0, s2 = 0; i < n; ++i) {
      var si = series[order[i]],
          sij0 = si[j][1] || 0,
          sij1 = si[j - 1][1] || 0,
          s3 = (sij0 - sij1) / 2;
      for (var k = 0; k < i; ++k) {
        var sk = series[order[k]],
            skj0 = sk[j][1] || 0,
            skj1 = sk[j - 1][1] || 0;
        s3 += skj0 - skj1;
      }
      s1 += sij0, s2 += s3 * sij0;
    }
    s0[j - 1][1] += s0[j - 1][0] = y;
    if (s1) y -= s2 / s1;
  }
  s0[j - 1][1] += s0[j - 1][0] = y;
  none(series, order);
};

var ascending = function(series) {
  var sums = series.map(sum);
  return none$1(series).sort(function(a, b) { return sums[a] - sums[b]; });
};

function sum(series) {
  var s = 0, i = -1, n = series.length, v;
  while (++i < n) if (v = +series[i][1]) s += v;
  return s;
}

var descending$1 = function(series) {
  return ascending(series).reverse();
};

var insideOut = function(series) {
  var n = series.length,
      i,
      j,
      sums = series.map(sum),
      order = none$1(series).sort(function(a, b) { return sums[b] - sums[a]; }),
      top = 0,
      bottom = 0,
      tops = [],
      bottoms = [];

  for (i = 0; i < n; ++i) {
    j = order[i];
    if (top < bottom) {
      top += sums[j];
      tops.push(j);
    } else {
      bottom += sums[j];
      bottoms.push(j);
    }
  }

  return bottoms.reverse().concat(tops);
};

var reverse = function(series) {
  return none$1(series).reverse();
};

exports.arc = arc;
exports.area = area;
exports.line = line;
exports.pie = pie;
exports.areaRadial = areaRadial;
exports.radialArea = areaRadial;
exports.lineRadial = lineRadial$1;
exports.radialLine = lineRadial$1;
exports.pointRadial = pointRadial;
exports.linkHorizontal = linkHorizontal;
exports.linkVertical = linkVertical;
exports.linkRadial = linkRadial;
exports.symbol = symbol;
exports.symbols = symbols;
exports.symbolCircle = circle;
exports.symbolCross = cross;
exports.symbolDiamond = diamond;
exports.symbolSquare = square;
exports.symbolStar = star;
exports.symbolTriangle = triangle;
exports.symbolWye = wye;
exports.curveBasisClosed = basisClosed;
exports.curveBasisOpen = basisOpen;
exports.curveBasis = basis;
exports.curveBundle = bundle;
exports.curveCardinalClosed = cardinalClosed;
exports.curveCardinalOpen = cardinalOpen;
exports.curveCardinal = cardinal;
exports.curveCatmullRomClosed = catmullRomClosed;
exports.curveCatmullRomOpen = catmullRomOpen;
exports.curveCatmullRom = catmullRom;
exports.curveLinearClosed = linearClosed;
exports.curveLinear = curveLinear;
exports.curveMonotoneX = monotoneX;
exports.curveMonotoneY = monotoneY;
exports.curveNatural = natural;
exports.curveStep = step;
exports.curveStepAfter = stepAfter;
exports.curveStepBefore = stepBefore;
exports.stack = stack;
exports.stackOffsetExpand = expand;
exports.stackOffsetDiverging = diverging;
exports.stackOffsetNone = none;
exports.stackOffsetSilhouette = silhouette;
exports.stackOffsetWiggle = wiggle;
exports.stackOrderAscending = ascending;
exports.stackOrderDescending = descending$1;
exports.stackOrderInsideOut = insideOut;
exports.stackOrderNone = none$1;
exports.stackOrderReverse = reverse;

Object.defineProperty(exports, '__esModule', { value: true });

})));

},{"d3-path":544}],547:[function(require,module,exports){
// https://d3js.org/d3-time-format/ Version 2.0.5. Copyright 2017 Mike Bostock.
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-time')) :
	typeof define === 'function' && define.amd ? define(['exports', 'd3-time'], factory) :
	(factory((global.d3 = global.d3 || {}),global.d3));
}(this, (function (exports,d3Time) { 'use strict';

function localDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
    date.setFullYear(d.y);
    return date;
  }
  return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
}

function utcDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
    date.setUTCFullYear(d.y);
    return date;
  }
  return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
}

function newYear(y) {
  return {y: y, m: 0, d: 1, H: 0, M: 0, S: 0, L: 0};
}

function formatLocale(locale) {
  var locale_dateTime = locale.dateTime,
      locale_date = locale.date,
      locale_time = locale.time,
      locale_periods = locale.periods,
      locale_weekdays = locale.days,
      locale_shortWeekdays = locale.shortDays,
      locale_months = locale.months,
      locale_shortMonths = locale.shortMonths;

  var periodRe = formatRe(locale_periods),
      periodLookup = formatLookup(locale_periods),
      weekdayRe = formatRe(locale_weekdays),
      weekdayLookup = formatLookup(locale_weekdays),
      shortWeekdayRe = formatRe(locale_shortWeekdays),
      shortWeekdayLookup = formatLookup(locale_shortWeekdays),
      monthRe = formatRe(locale_months),
      monthLookup = formatLookup(locale_months),
      shortMonthRe = formatRe(locale_shortMonths),
      shortMonthLookup = formatLookup(locale_shortMonths);

  var formats = {
    "a": formatShortWeekday,
    "A": formatWeekday,
    "b": formatShortMonth,
    "B": formatMonth,
    "c": null,
    "d": formatDayOfMonth,
    "e": formatDayOfMonth,
    "H": formatHour24,
    "I": formatHour12,
    "j": formatDayOfYear,
    "L": formatMilliseconds,
    "m": formatMonthNumber,
    "M": formatMinutes,
    "p": formatPeriod,
    "S": formatSeconds,
    "U": formatWeekNumberSunday,
    "w": formatWeekdayNumber,
    "W": formatWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatYear,
    "Y": formatFullYear,
    "Z": formatZone,
    "%": formatLiteralPercent
  };

  var utcFormats = {
    "a": formatUTCShortWeekday,
    "A": formatUTCWeekday,
    "b": formatUTCShortMonth,
    "B": formatUTCMonth,
    "c": null,
    "d": formatUTCDayOfMonth,
    "e": formatUTCDayOfMonth,
    "H": formatUTCHour24,
    "I": formatUTCHour12,
    "j": formatUTCDayOfYear,
    "L": formatUTCMilliseconds,
    "m": formatUTCMonthNumber,
    "M": formatUTCMinutes,
    "p": formatUTCPeriod,
    "S": formatUTCSeconds,
    "U": formatUTCWeekNumberSunday,
    "w": formatUTCWeekdayNumber,
    "W": formatUTCWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatUTCYear,
    "Y": formatUTCFullYear,
    "Z": formatUTCZone,
    "%": formatLiteralPercent
  };

  var parses = {
    "a": parseShortWeekday,
    "A": parseWeekday,
    "b": parseShortMonth,
    "B": parseMonth,
    "c": parseLocaleDateTime,
    "d": parseDayOfMonth,
    "e": parseDayOfMonth,
    "H": parseHour24,
    "I": parseHour24,
    "j": parseDayOfYear,
    "L": parseMilliseconds,
    "m": parseMonthNumber,
    "M": parseMinutes,
    "p": parsePeriod,
    "S": parseSeconds,
    "U": parseWeekNumberSunday,
    "w": parseWeekdayNumber,
    "W": parseWeekNumberMonday,
    "x": parseLocaleDate,
    "X": parseLocaleTime,
    "y": parseYear,
    "Y": parseFullYear,
    "Z": parseZone,
    "%": parseLiteralPercent
  };

  // These recursive directive definitions must be deferred.
  formats.x = newFormat(locale_date, formats);
  formats.X = newFormat(locale_time, formats);
  formats.c = newFormat(locale_dateTime, formats);
  utcFormats.x = newFormat(locale_date, utcFormats);
  utcFormats.X = newFormat(locale_time, utcFormats);
  utcFormats.c = newFormat(locale_dateTime, utcFormats);

  function newFormat(specifier, formats) {
    return function(date) {
      var string = [],
          i = -1,
          j = 0,
          n = specifier.length,
          c,
          pad,
          format;

      if (!(date instanceof Date)) date = new Date(+date);

      while (++i < n) {
        if (specifier.charCodeAt(i) === 37) {
          string.push(specifier.slice(j, i));
          if ((pad = pads[c = specifier.charAt(++i)]) != null) c = specifier.charAt(++i);
          else pad = c === "e" ? " " : "0";
          if (format = formats[c]) c = format(date, pad);
          string.push(c);
          j = i + 1;
        }
      }

      string.push(specifier.slice(j, i));
      return string.join("");
    };
  }

  function newParse(specifier, newDate) {
    return function(string) {
      var d = newYear(1900),
          i = parseSpecifier(d, specifier, string += "", 0);
      if (i != string.length) return null;

      // The am-pm flag is 0 for AM, and 1 for PM.
      if ("p" in d) d.H = d.H % 12 + d.p * 12;

      // Convert day-of-week and week-of-year to day-of-year.
      if ("W" in d || "U" in d) {
        if (!("w" in d)) d.w = "W" in d ? 1 : 0;
        var day = "Z" in d ? utcDate(newYear(d.y)).getUTCDay() : newDate(newYear(d.y)).getDay();
        d.m = 0;
        d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day + 5) % 7 : d.w + d.U * 7 - (day + 6) % 7;
      }

      // If a time zone is specified, all fields are interpreted as UTC and then
      // offset according to the specified time zone.
      if ("Z" in d) {
        d.H += d.Z / 100 | 0;
        d.M += d.Z % 100;
        return utcDate(d);
      }

      // Otherwise, all fields are in local time.
      return newDate(d);
    };
  }

  function parseSpecifier(d, specifier, string, j) {
    var i = 0,
        n = specifier.length,
        m = string.length,
        c,
        parse;

    while (i < n) {
      if (j >= m) return -1;
      c = specifier.charCodeAt(i++);
      if (c === 37) {
        c = specifier.charAt(i++);
        parse = parses[c in pads ? specifier.charAt(i++) : c];
        if (!parse || ((j = parse(d, string, j)) < 0)) return -1;
      } else if (c != string.charCodeAt(j++)) {
        return -1;
      }
    }

    return j;
  }

  function parsePeriod(d, string, i) {
    var n = periodRe.exec(string.slice(i));
    return n ? (d.p = periodLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseShortWeekday(d, string, i) {
    var n = shortWeekdayRe.exec(string.slice(i));
    return n ? (d.w = shortWeekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseWeekday(d, string, i) {
    var n = weekdayRe.exec(string.slice(i));
    return n ? (d.w = weekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseShortMonth(d, string, i) {
    var n = shortMonthRe.exec(string.slice(i));
    return n ? (d.m = shortMonthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseMonth(d, string, i) {
    var n = monthRe.exec(string.slice(i));
    return n ? (d.m = monthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseLocaleDateTime(d, string, i) {
    return parseSpecifier(d, locale_dateTime, string, i);
  }

  function parseLocaleDate(d, string, i) {
    return parseSpecifier(d, locale_date, string, i);
  }

  function parseLocaleTime(d, string, i) {
    return parseSpecifier(d, locale_time, string, i);
  }

  function formatShortWeekday(d) {
    return locale_shortWeekdays[d.getDay()];
  }

  function formatWeekday(d) {
    return locale_weekdays[d.getDay()];
  }

  function formatShortMonth(d) {
    return locale_shortMonths[d.getMonth()];
  }

  function formatMonth(d) {
    return locale_months[d.getMonth()];
  }

  function formatPeriod(d) {
    return locale_periods[+(d.getHours() >= 12)];
  }

  function formatUTCShortWeekday(d) {
    return locale_shortWeekdays[d.getUTCDay()];
  }

  function formatUTCWeekday(d) {
    return locale_weekdays[d.getUTCDay()];
  }

  function formatUTCShortMonth(d) {
    return locale_shortMonths[d.getUTCMonth()];
  }

  function formatUTCMonth(d) {
    return locale_months[d.getUTCMonth()];
  }

  function formatUTCPeriod(d) {
    return locale_periods[+(d.getUTCHours() >= 12)];
  }

  return {
    format: function(specifier) {
      var f = newFormat(specifier += "", formats);
      f.toString = function() { return specifier; };
      return f;
    },
    parse: function(specifier) {
      var p = newParse(specifier += "", localDate);
      p.toString = function() { return specifier; };
      return p;
    },
    utcFormat: function(specifier) {
      var f = newFormat(specifier += "", utcFormats);
      f.toString = function() { return specifier; };
      return f;
    },
    utcParse: function(specifier) {
      var p = newParse(specifier, utcDate);
      p.toString = function() { return specifier; };
      return p;
    }
  };
}

var pads = {"-": "", "_": " ", "0": "0"};
var numberRe = /^\s*\d+/;
var percentRe = /^%/;
var requoteRe = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;

function pad(value, fill, width) {
  var sign = value < 0 ? "-" : "",
      string = (sign ? -value : value) + "",
      length = string.length;
  return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
}

function requote(s) {
  return s.replace(requoteRe, "\\$&");
}

function formatRe(names) {
  return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
}

function formatLookup(names) {
  var map = {}, i = -1, n = names.length;
  while (++i < n) map[names[i].toLowerCase()] = i;
  return map;
}

function parseWeekdayNumber(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.w = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.U = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.W = +n[0], i + n[0].length) : -1;
}

function parseFullYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 4));
  return n ? (d.y = +n[0], i + n[0].length) : -1;
}

function parseYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2000), i + n[0].length) : -1;
}

function parseZone(d, string, i) {
  var n = /^(Z)|([+-]\d\d)(?:\:?(\d\d))?/.exec(string.slice(i, i + 6));
  return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
}

function parseMonthNumber(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
}

function parseDayOfMonth(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.d = +n[0], i + n[0].length) : -1;
}

function parseDayOfYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
}

function parseHour24(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.H = +n[0], i + n[0].length) : -1;
}

function parseMinutes(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.M = +n[0], i + n[0].length) : -1;
}

function parseSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.S = +n[0], i + n[0].length) : -1;
}

function parseMilliseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.L = +n[0], i + n[0].length) : -1;
}

function parseLiteralPercent(d, string, i) {
  var n = percentRe.exec(string.slice(i, i + 1));
  return n ? i + n[0].length : -1;
}

function formatDayOfMonth(d, p) {
  return pad(d.getDate(), p, 2);
}

function formatHour24(d, p) {
  return pad(d.getHours(), p, 2);
}

function formatHour12(d, p) {
  return pad(d.getHours() % 12 || 12, p, 2);
}

function formatDayOfYear(d, p) {
  return pad(1 + d3Time.timeDay.count(d3Time.timeYear(d), d), p, 3);
}

function formatMilliseconds(d, p) {
  return pad(d.getMilliseconds(), p, 3);
}

function formatMonthNumber(d, p) {
  return pad(d.getMonth() + 1, p, 2);
}

function formatMinutes(d, p) {
  return pad(d.getMinutes(), p, 2);
}

function formatSeconds(d, p) {
  return pad(d.getSeconds(), p, 2);
}

function formatWeekNumberSunday(d, p) {
  return pad(d3Time.timeSunday.count(d3Time.timeYear(d), d), p, 2);
}

function formatWeekdayNumber(d) {
  return d.getDay();
}

function formatWeekNumberMonday(d, p) {
  return pad(d3Time.timeMonday.count(d3Time.timeYear(d), d), p, 2);
}

function formatYear(d, p) {
  return pad(d.getFullYear() % 100, p, 2);
}

function formatFullYear(d, p) {
  return pad(d.getFullYear() % 10000, p, 4);
}

function formatZone(d) {
  var z = d.getTimezoneOffset();
  return (z > 0 ? "-" : (z *= -1, "+"))
      + pad(z / 60 | 0, "0", 2)
      + pad(z % 60, "0", 2);
}

function formatUTCDayOfMonth(d, p) {
  return pad(d.getUTCDate(), p, 2);
}

function formatUTCHour24(d, p) {
  return pad(d.getUTCHours(), p, 2);
}

function formatUTCHour12(d, p) {
  return pad(d.getUTCHours() % 12 || 12, p, 2);
}

function formatUTCDayOfYear(d, p) {
  return pad(1 + d3Time.utcDay.count(d3Time.utcYear(d), d), p, 3);
}

function formatUTCMilliseconds(d, p) {
  return pad(d.getUTCMilliseconds(), p, 3);
}

function formatUTCMonthNumber(d, p) {
  return pad(d.getUTCMonth() + 1, p, 2);
}

function formatUTCMinutes(d, p) {
  return pad(d.getUTCMinutes(), p, 2);
}

function formatUTCSeconds(d, p) {
  return pad(d.getUTCSeconds(), p, 2);
}

function formatUTCWeekNumberSunday(d, p) {
  return pad(d3Time.utcSunday.count(d3Time.utcYear(d), d), p, 2);
}

function formatUTCWeekdayNumber(d) {
  return d.getUTCDay();
}

function formatUTCWeekNumberMonday(d, p) {
  return pad(d3Time.utcMonday.count(d3Time.utcYear(d), d), p, 2);
}

function formatUTCYear(d, p) {
  return pad(d.getUTCFullYear() % 100, p, 2);
}

function formatUTCFullYear(d, p) {
  return pad(d.getUTCFullYear() % 10000, p, 4);
}

function formatUTCZone() {
  return "+0000";
}

function formatLiteralPercent() {
  return "%";
}

var locale$1;





defaultLocale({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});

function defaultLocale(definition) {
  locale$1 = formatLocale(definition);
  exports.timeFormat = locale$1.format;
  exports.timeParse = locale$1.parse;
  exports.utcFormat = locale$1.utcFormat;
  exports.utcParse = locale$1.utcParse;
  return locale$1;
}

var isoSpecifier = "%Y-%m-%dT%H:%M:%S.%LZ";

function formatIsoNative(date) {
  return date.toISOString();
}

var formatIso = Date.prototype.toISOString
    ? formatIsoNative
    : exports.utcFormat(isoSpecifier);

function parseIsoNative(string) {
  var date = new Date(string);
  return isNaN(date) ? null : date;
}

var parseIso = +new Date("2000-01-01T00:00:00.000Z")
    ? parseIsoNative
    : exports.utcParse(isoSpecifier);

exports.timeFormatDefaultLocale = defaultLocale;
exports.timeFormatLocale = formatLocale;
exports.isoFormat = formatIso;
exports.isoParse = parseIso;

Object.defineProperty(exports, '__esModule', { value: true });

})));

},{"d3-time":548}],548:[function(require,module,exports){
// https://d3js.org/d3-time/ Version 1.0.7. Copyright 2017 Mike Bostock.
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.d3 = global.d3 || {})));
}(this, (function (exports) { 'use strict';

var t0 = new Date;
var t1 = new Date;

function newInterval(floori, offseti, count, field) {

  function interval(date) {
    return floori(date = new Date(+date)), date;
  }

  interval.floor = interval;

  interval.ceil = function(date) {
    return floori(date = new Date(date - 1)), offseti(date, 1), floori(date), date;
  };

  interval.round = function(date) {
    var d0 = interval(date),
        d1 = interval.ceil(date);
    return date - d0 < d1 - date ? d0 : d1;
  };

  interval.offset = function(date, step) {
    return offseti(date = new Date(+date), step == null ? 1 : Math.floor(step)), date;
  };

  interval.range = function(start, stop, step) {
    var range = [];
    start = interval.ceil(start);
    step = step == null ? 1 : Math.floor(step);
    if (!(start < stop) || !(step > 0)) return range; // also handles Invalid Date
    do range.push(new Date(+start)); while (offseti(start, step), floori(start), start < stop)
    return range;
  };

  interval.filter = function(test) {
    return newInterval(function(date) {
      if (date >= date) while (floori(date), !test(date)) date.setTime(date - 1);
    }, function(date, step) {
      if (date >= date) {
        if (step < 0) while (++step <= 0) {
          while (offseti(date, -1), !test(date)) {} // eslint-disable-line no-empty
        } else while (--step >= 0) {
          while (offseti(date, +1), !test(date)) {} // eslint-disable-line no-empty
        }
      }
    });
  };

  if (count) {
    interval.count = function(start, end) {
      t0.setTime(+start), t1.setTime(+end);
      floori(t0), floori(t1);
      return Math.floor(count(t0, t1));
    };

    interval.every = function(step) {
      step = Math.floor(step);
      return !isFinite(step) || !(step > 0) ? null
          : !(step > 1) ? interval
          : interval.filter(field
              ? function(d) { return field(d) % step === 0; }
              : function(d) { return interval.count(0, d) % step === 0; });
    };
  }

  return interval;
}

var millisecond = newInterval(function() {
  // noop
}, function(date, step) {
  date.setTime(+date + step);
}, function(start, end) {
  return end - start;
});

// An optimized implementation for this simple case.
millisecond.every = function(k) {
  k = Math.floor(k);
  if (!isFinite(k) || !(k > 0)) return null;
  if (!(k > 1)) return millisecond;
  return newInterval(function(date) {
    date.setTime(Math.floor(date / k) * k);
  }, function(date, step) {
    date.setTime(+date + step * k);
  }, function(start, end) {
    return (end - start) / k;
  });
};

var milliseconds = millisecond.range;

var durationSecond = 1e3;
var durationMinute = 6e4;
var durationHour = 36e5;
var durationDay = 864e5;
var durationWeek = 6048e5;

var second = newInterval(function(date) {
  date.setTime(Math.floor(date / durationSecond) * durationSecond);
}, function(date, step) {
  date.setTime(+date + step * durationSecond);
}, function(start, end) {
  return (end - start) / durationSecond;
}, function(date) {
  return date.getUTCSeconds();
});

var seconds = second.range;

var minute = newInterval(function(date) {
  date.setTime(Math.floor(date / durationMinute) * durationMinute);
}, function(date, step) {
  date.setTime(+date + step * durationMinute);
}, function(start, end) {
  return (end - start) / durationMinute;
}, function(date) {
  return date.getMinutes();
});

var minutes = minute.range;

var hour = newInterval(function(date) {
  var offset = date.getTimezoneOffset() * durationMinute % durationHour;
  if (offset < 0) offset += durationHour;
  date.setTime(Math.floor((+date - offset) / durationHour) * durationHour + offset);
}, function(date, step) {
  date.setTime(+date + step * durationHour);
}, function(start, end) {
  return (end - start) / durationHour;
}, function(date) {
  return date.getHours();
});

var hours = hour.range;

var day = newInterval(function(date) {
  date.setHours(0, 0, 0, 0);
}, function(date, step) {
  date.setDate(date.getDate() + step);
}, function(start, end) {
  return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationDay;
}, function(date) {
  return date.getDate() - 1;
});

var days = day.range;

function weekday(i) {
  return newInterval(function(date) {
    date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
    date.setHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setDate(date.getDate() + step * 7);
  }, function(start, end) {
    return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationWeek;
  });
}

var sunday = weekday(0);
var monday = weekday(1);
var tuesday = weekday(2);
var wednesday = weekday(3);
var thursday = weekday(4);
var friday = weekday(5);
var saturday = weekday(6);

var sundays = sunday.range;
var mondays = monday.range;
var tuesdays = tuesday.range;
var wednesdays = wednesday.range;
var thursdays = thursday.range;
var fridays = friday.range;
var saturdays = saturday.range;

var month = newInterval(function(date) {
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
}, function(date, step) {
  date.setMonth(date.getMonth() + step);
}, function(start, end) {
  return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
}, function(date) {
  return date.getMonth();
});

var months = month.range;

var year = newInterval(function(date) {
  date.setMonth(0, 1);
  date.setHours(0, 0, 0, 0);
}, function(date, step) {
  date.setFullYear(date.getFullYear() + step);
}, function(start, end) {
  return end.getFullYear() - start.getFullYear();
}, function(date) {
  return date.getFullYear();
});

// An optimized implementation for this simple case.
year.every = function(k) {
  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function(date) {
    date.setFullYear(Math.floor(date.getFullYear() / k) * k);
    date.setMonth(0, 1);
    date.setHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setFullYear(date.getFullYear() + step * k);
  });
};

var years = year.range;

var utcMinute = newInterval(function(date) {
  date.setUTCSeconds(0, 0);
}, function(date, step) {
  date.setTime(+date + step * durationMinute);
}, function(start, end) {
  return (end - start) / durationMinute;
}, function(date) {
  return date.getUTCMinutes();
});

var utcMinutes = utcMinute.range;

var utcHour = newInterval(function(date) {
  date.setUTCMinutes(0, 0, 0);
}, function(date, step) {
  date.setTime(+date + step * durationHour);
}, function(start, end) {
  return (end - start) / durationHour;
}, function(date) {
  return date.getUTCHours();
});

var utcHours = utcHour.range;

var utcDay = newInterval(function(date) {
  date.setUTCHours(0, 0, 0, 0);
}, function(date, step) {
  date.setUTCDate(date.getUTCDate() + step);
}, function(start, end) {
  return (end - start) / durationDay;
}, function(date) {
  return date.getUTCDate() - 1;
});

var utcDays = utcDay.range;

function utcWeekday(i) {
  return newInterval(function(date) {
    date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
    date.setUTCHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setUTCDate(date.getUTCDate() + step * 7);
  }, function(start, end) {
    return (end - start) / durationWeek;
  });
}

var utcSunday = utcWeekday(0);
var utcMonday = utcWeekday(1);
var utcTuesday = utcWeekday(2);
var utcWednesday = utcWeekday(3);
var utcThursday = utcWeekday(4);
var utcFriday = utcWeekday(5);
var utcSaturday = utcWeekday(6);

var utcSundays = utcSunday.range;
var utcMondays = utcMonday.range;
var utcTuesdays = utcTuesday.range;
var utcWednesdays = utcWednesday.range;
var utcThursdays = utcThursday.range;
var utcFridays = utcFriday.range;
var utcSaturdays = utcSaturday.range;

var utcMonth = newInterval(function(date) {
  date.setUTCDate(1);
  date.setUTCHours(0, 0, 0, 0);
}, function(date, step) {
  date.setUTCMonth(date.getUTCMonth() + step);
}, function(start, end) {
  return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
}, function(date) {
  return date.getUTCMonth();
});

var utcMonths = utcMonth.range;

var utcYear = newInterval(function(date) {
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
}, function(date, step) {
  date.setUTCFullYear(date.getUTCFullYear() + step);
}, function(start, end) {
  return end.getUTCFullYear() - start.getUTCFullYear();
}, function(date) {
  return date.getUTCFullYear();
});

// An optimized implementation for this simple case.
utcYear.every = function(k) {
  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function(date) {
    date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k) * k);
    date.setUTCMonth(0, 1);
    date.setUTCHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setUTCFullYear(date.getUTCFullYear() + step * k);
  });
};

var utcYears = utcYear.range;

exports.timeInterval = newInterval;
exports.timeMillisecond = millisecond;
exports.timeMilliseconds = milliseconds;
exports.utcMillisecond = millisecond;
exports.utcMilliseconds = milliseconds;
exports.timeSecond = second;
exports.timeSeconds = seconds;
exports.utcSecond = second;
exports.utcSeconds = seconds;
exports.timeMinute = minute;
exports.timeMinutes = minutes;
exports.timeHour = hour;
exports.timeHours = hours;
exports.timeDay = day;
exports.timeDays = days;
exports.timeWeek = sunday;
exports.timeWeeks = sundays;
exports.timeSunday = sunday;
exports.timeSundays = sundays;
exports.timeMonday = monday;
exports.timeMondays = mondays;
exports.timeTuesday = tuesday;
exports.timeTuesdays = tuesdays;
exports.timeWednesday = wednesday;
exports.timeWednesdays = wednesdays;
exports.timeThursday = thursday;
exports.timeThursdays = thursdays;
exports.timeFriday = friday;
exports.timeFridays = fridays;
exports.timeSaturday = saturday;
exports.timeSaturdays = saturdays;
exports.timeMonth = month;
exports.timeMonths = months;
exports.timeYear = year;
exports.timeYears = years;
exports.utcMinute = utcMinute;
exports.utcMinutes = utcMinutes;
exports.utcHour = utcHour;
exports.utcHours = utcHours;
exports.utcDay = utcDay;
exports.utcDays = utcDays;
exports.utcWeek = utcSunday;
exports.utcWeeks = utcSundays;
exports.utcSunday = utcSunday;
exports.utcSundays = utcSundays;
exports.utcMonday = utcMonday;
exports.utcMondays = utcMondays;
exports.utcTuesday = utcTuesday;
exports.utcTuesdays = utcTuesdays;
exports.utcWednesday = utcWednesday;
exports.utcWednesdays = utcWednesdays;
exports.utcThursday = utcThursday;
exports.utcThursdays = utcThursdays;
exports.utcFriday = utcFriday;
exports.utcFridays = utcFridays;
exports.utcSaturday = utcSaturday;
exports.utcSaturdays = utcSaturdays;
exports.utcMonth = utcMonth;
exports.utcMonths = utcMonths;
exports.utcYear = utcYear;
exports.utcYears = utcYears;

Object.defineProperty(exports, '__esModule', { value: true });

})));

},{}],549:[function(require,module,exports){
(function (process){
/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = require('./debug');
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}

}).call(this,require('_process'))
},{"./debug":550,"_process":536}],550:[function(require,module,exports){

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = require('ms');

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  return debug;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

},{"ms":575}],551:[function(require,module,exports){
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

},{"./lib/is_arguments.js":552,"./lib/keys.js":553}],552:[function(require,module,exports){
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

},{}],553:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],554:[function(require,module,exports){
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

},{"foreach":565,"object-keys":577}],555:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],556:[function(require,module,exports){
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

},{"./helpers/isFinite":557,"./helpers/isNaN":558,"./helpers/mod":559,"./helpers/sign":560,"es-to-primitive/es5":561,"has":568,"is-callable":574}],557:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],558:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],559:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],560:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],561:[function(require,module,exports){
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

},{"./helpers/isPrimitive":562,"is-callable":574}],562:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],563:[function(require,module,exports){
'use strict';

var OneVersionConstraint = require('individual/one-version');

var MY_VERSION = '7';
OneVersionConstraint('ev-store', MY_VERSION);

var hashKey = '__EV_STORE_KEY@' + MY_VERSION;

module.exports = EvStore;

function EvStore(elem) {
    var hash = elem[hashKey];

    if (!hash) {
        hash = elem[hashKey] = {};
    }

    return hash;
}

},{"individual/one-version":571}],564:[function(require,module,exports){
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

},{}],565:[function(require,module,exports){

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


},{}],566:[function(require,module,exports){
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

},{}],567:[function(require,module,exports){
var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":566}],568:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":567}],569:[function(require,module,exports){
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

},{}],570:[function(require,module,exports){
(function (global){
'use strict';

/*global window, global*/

var root = typeof window !== 'undefined' ?
    window : typeof global !== 'undefined' ?
    global : {};

module.exports = Individual;

function Individual(key, value) {
    if (key in root) {
        return root[key];
    }

    root[key] = value;

    return value;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],571:[function(require,module,exports){
'use strict';

var Individual = require('./index.js');

module.exports = OneVersion;

function OneVersion(moduleName, version, defaultValue) {
    var key = '__INDIVIDUAL_ONE_VERSION_' + moduleName;
    var enforceKey = key + '_ENFORCE_SINGLETON';

    var versionValue = Individual(enforceKey, version);

    if (versionValue !== version) {
        throw new Error('Can only have one copy of ' +
            moduleName + '.\n' +
            'You already have version ' + versionValue +
            ' installed.\n' +
            'This means you cannot install version ' + version);
    }

    return Individual(key, defaultValue);
}

},{"./index.js":570}],572:[function(require,module,exports){
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

},{}],573:[function(require,module,exports){
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

},{}],574:[function(require,module,exports){
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

},{}],575:[function(require,module,exports){
/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}

},{}],576:[function(require,module,exports){
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

},{}],577:[function(require,module,exports){
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

},{"./isArguments":578}],578:[function(require,module,exports){
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

},{}],579:[function(require,module,exports){
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
},{"_process":536}],580:[function(require,module,exports){
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
},{"_process":536}],581:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":582}],582:[function(require,module,exports){
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
},{"./_stream_readable":584,"./_stream_writable":586,"core-util-is":538,"inherits":572,"process-nextick-args":580}],583:[function(require,module,exports){
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
},{"./_stream_transform":585,"core-util-is":538,"inherits":572}],584:[function(require,module,exports){
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
},{"./_stream_duplex":582,"./internal/streams/BufferList":587,"./internal/streams/destroy":588,"./internal/streams/stream":589,"_process":536,"core-util-is":538,"events":564,"inherits":572,"isarray":590,"process-nextick-args":580,"safe-buffer":597,"string_decoder/":591,"util":533}],585:[function(require,module,exports){
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
},{"./_stream_duplex":582,"core-util-is":538,"inherits":572}],586:[function(require,module,exports){
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
},{"./_stream_duplex":582,"./internal/streams/destroy":588,"./internal/streams/stream":589,"_process":536,"core-util-is":538,"inherits":572,"process-nextick-args":580,"safe-buffer":597,"util-deprecate":613}],587:[function(require,module,exports){
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
},{"safe-buffer":597}],588:[function(require,module,exports){
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
},{"process-nextick-args":580}],589:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":564}],590:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],591:[function(require,module,exports){
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
},{"safe-buffer":597}],592:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":593}],593:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":582,"./lib/_stream_passthrough.js":583,"./lib/_stream_readable.js":584,"./lib/_stream_transform.js":585,"./lib/_stream_writable.js":586}],594:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":593}],595:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":586}],596:[function(require,module,exports){
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
},{"_process":536,"through":612}],597:[function(require,module,exports){
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

},{"buffer":537}],598:[function(require,module,exports){
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

},{"events":564,"inherits":572,"readable-stream/duplex.js":581,"readable-stream/passthrough.js":592,"readable-stream/readable.js":593,"readable-stream/transform.js":594,"readable-stream/writable.js":595}],599:[function(require,module,exports){
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

},{"es-abstract/es5":556,"function-bind":567}],600:[function(require,module,exports){
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

},{"./implementation":599,"./polyfill":601,"./shim":602,"define-properties":554,"function-bind":567}],601:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":599}],602:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":601,"define-properties":554}],603:[function(require,module,exports){
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
},{}],604:[function(require,module,exports){
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

},{"./implementation":603,"./polyfill":605,"./shim":606,"define-properties":554}],605:[function(require,module,exports){
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
},{"./implementation":603}],606:[function(require,module,exports){
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
},{"./polyfill":605,"define-properties":554}],607:[function(require,module,exports){
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
},{"./lib/default_stream":608,"./lib/results":610,"./lib/test":611,"_process":536,"defined":555,"through":612}],608:[function(require,module,exports){
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
},{"_process":536,"fs":535,"through":612}],609:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":536}],610:[function(require,module,exports){
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
},{"_process":536,"events":564,"function-bind":567,"has":568,"inherits":572,"object-inspect":576,"resumer":596,"through":612}],611:[function(require,module,exports){
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
},{"./next_tick":609,"deep-equal":551,"defined":555,"events":564,"has":568,"inherits":572,"path":579,"string.prototype.trim":600}],612:[function(require,module,exports){
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
},{"_process":536,"stream":598}],613:[function(require,module,exports){
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
},{}],614:[function(require,module,exports){
var h = require("./virtual-hyperscript/index.js")

module.exports = h

},{"./virtual-hyperscript/index.js":617}],615:[function(require,module,exports){
'use strict';

var EvStore = require('ev-store');

module.exports = EvHook;

function EvHook(value) {
    if (!(this instanceof EvHook)) {
        return new EvHook(value);
    }

    this.value = value;
}

EvHook.prototype.hook = function (node, propertyName) {
    var es = EvStore(node);
    var propName = propertyName.substr(3);

    es[propName] = this.value;
};

EvHook.prototype.unhook = function(node, propertyName) {
    var es = EvStore(node);
    var propName = propertyName.substr(3);

    es[propName] = undefined;
};

},{"ev-store":563}],616:[function(require,module,exports){
'use strict';

module.exports = SoftSetHook;

function SoftSetHook(value) {
    if (!(this instanceof SoftSetHook)) {
        return new SoftSetHook(value);
    }

    this.value = value;
}

SoftSetHook.prototype.hook = function (node, propertyName) {
    if (node[propertyName] !== this.value) {
        node[propertyName] = this.value;
    }
};

},{}],617:[function(require,module,exports){
'use strict';

var isArray = require('x-is-array');

var VNode = require('../vnode/vnode.js');
var VText = require('../vnode/vtext.js');
var isVNode = require('../vnode/is-vnode');
var isVText = require('../vnode/is-vtext');
var isWidget = require('../vnode/is-widget');
var isHook = require('../vnode/is-vhook');
var isVThunk = require('../vnode/is-thunk');

var parseTag = require('./parse-tag.js');
var softSetHook = require('./hooks/soft-set-hook.js');
var evHook = require('./hooks/ev-hook.js');

module.exports = h;

function h(tagName, properties, children) {
    var childNodes = [];
    var tag, props, key, namespace;

    if (!children && isChildren(properties)) {
        children = properties;
        props = {};
    }

    props = props || properties || {};
    tag = parseTag(tagName, props);

    // support keys
    if (props.hasOwnProperty('key')) {
        key = props.key;
        props.key = undefined;
    }

    // support namespace
    if (props.hasOwnProperty('namespace')) {
        namespace = props.namespace;
        props.namespace = undefined;
    }

    // fix cursor bug
    if (tag === 'INPUT' &&
        !namespace &&
        props.hasOwnProperty('value') &&
        props.value !== undefined &&
        !isHook(props.value)
    ) {
        props.value = softSetHook(props.value);
    }

    transformProperties(props);

    if (children !== undefined && children !== null) {
        addChild(children, childNodes, tag, props);
    }


    return new VNode(tag, props, childNodes, key, namespace);
}

function addChild(c, childNodes, tag, props) {
    if (typeof c === 'string') {
        childNodes.push(new VText(c));
    } else if (typeof c === 'number') {
        childNodes.push(new VText(String(c)));
    } else if (isChild(c)) {
        childNodes.push(c);
    } else if (isArray(c)) {
        for (var i = 0; i < c.length; i++) {
            addChild(c[i], childNodes, tag, props);
        }
    } else if (c === null || c === undefined) {
        return;
    } else {
        throw UnexpectedVirtualElement({
            foreignObject: c,
            parentVnode: {
                tagName: tag,
                properties: props
            }
        });
    }
}

function transformProperties(props) {
    for (var propName in props) {
        if (props.hasOwnProperty(propName)) {
            var value = props[propName];

            if (isHook(value)) {
                continue;
            }

            if (propName.substr(0, 3) === 'ev-') {
                // add ev-foo support
                props[propName] = evHook(value);
            }
        }
    }
}

function isChild(x) {
    return isVNode(x) || isVText(x) || isWidget(x) || isVThunk(x);
}

function isChildren(x) {
    return typeof x === 'string' || isArray(x) || isChild(x);
}

function UnexpectedVirtualElement(data) {
    var err = new Error();

    err.type = 'virtual-hyperscript.unexpected.virtual-element';
    err.message = 'Unexpected virtual child passed to h().\n' +
        'Expected a VNode / Vthunk / VWidget / string but:\n' +
        'got:\n' +
        errorString(data.foreignObject) +
        '.\n' +
        'The parent vnode is:\n' +
        errorString(data.parentVnode)
        '\n' +
        'Suggested fix: change your `h(..., [ ... ])` callsite.';
    err.foreignObject = data.foreignObject;
    err.parentVnode = data.parentVnode;

    return err;
}

function errorString(obj) {
    try {
        return JSON.stringify(obj, null, '    ');
    } catch (e) {
        return String(obj);
    }
}

},{"../vnode/is-thunk":619,"../vnode/is-vhook":620,"../vnode/is-vnode":621,"../vnode/is-vtext":622,"../vnode/is-widget":623,"../vnode/vnode.js":625,"../vnode/vtext.js":626,"./hooks/ev-hook.js":615,"./hooks/soft-set-hook.js":616,"./parse-tag.js":618,"x-is-array":627}],618:[function(require,module,exports){
'use strict';

var split = require('browser-split');

var classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;
var notClassId = /^\.|#/;

module.exports = parseTag;

function parseTag(tag, props) {
    if (!tag) {
        return 'DIV';
    }

    var noId = !(props.hasOwnProperty('id'));

    var tagParts = split(tag, classIdSplit);
    var tagName = null;

    if (notClassId.test(tagParts[1])) {
        tagName = 'DIV';
    }

    var classes, part, type, i;

    for (i = 0; i < tagParts.length; i++) {
        part = tagParts[i];

        if (!part) {
            continue;
        }

        type = part.charAt(0);

        if (!tagName) {
            tagName = part;
        } else if (type === '.') {
            classes = classes || [];
            classes.push(part.substring(1, part.length));
        } else if (type === '#' && noId) {
            props.id = part.substring(1, part.length);
        }
    }

    if (classes) {
        if (props.className) {
            classes.push(props.className);
        }

        props.className = classes.join(' ');
    }

    return props.namespace ? tagName : tagName.toUpperCase();
}

},{"browser-split":534}],619:[function(require,module,exports){
module.exports = isThunk

function isThunk(t) {
    return t && t.type === "Thunk"
}

},{}],620:[function(require,module,exports){
module.exports = isHook

function isHook(hook) {
    return hook &&
      (typeof hook.hook === "function" && !hook.hasOwnProperty("hook") ||
       typeof hook.unhook === "function" && !hook.hasOwnProperty("unhook"))
}

},{}],621:[function(require,module,exports){
var version = require("./version")

module.exports = isVirtualNode

function isVirtualNode(x) {
    return x && x.type === "VirtualNode" && x.version === version
}

},{"./version":624}],622:[function(require,module,exports){
var version = require("./version")

module.exports = isVirtualText

function isVirtualText(x) {
    return x && x.type === "VirtualText" && x.version === version
}

},{"./version":624}],623:[function(require,module,exports){
module.exports = isWidget

function isWidget(w) {
    return w && w.type === "Widget"
}

},{}],624:[function(require,module,exports){
module.exports = "2"

},{}],625:[function(require,module,exports){
var version = require("./version")
var isVNode = require("./is-vnode")
var isWidget = require("./is-widget")
var isThunk = require("./is-thunk")
var isVHook = require("./is-vhook")

module.exports = VirtualNode

var noProperties = {}
var noChildren = []

function VirtualNode(tagName, properties, children, key, namespace) {
    this.tagName = tagName
    this.properties = properties || noProperties
    this.children = children || noChildren
    this.key = key != null ? String(key) : undefined
    this.namespace = (typeof namespace === "string") ? namespace : null

    var count = (children && children.length) || 0
    var descendants = 0
    var hasWidgets = false
    var hasThunks = false
    var descendantHooks = false
    var hooks

    for (var propName in properties) {
        if (properties.hasOwnProperty(propName)) {
            var property = properties[propName]
            if (isVHook(property) && property.unhook) {
                if (!hooks) {
                    hooks = {}
                }

                hooks[propName] = property
            }
        }
    }

    for (var i = 0; i < count; i++) {
        var child = children[i]
        if (isVNode(child)) {
            descendants += child.count || 0

            if (!hasWidgets && child.hasWidgets) {
                hasWidgets = true
            }

            if (!hasThunks && child.hasThunks) {
                hasThunks = true
            }

            if (!descendantHooks && (child.hooks || child.descendantHooks)) {
                descendantHooks = true
            }
        } else if (!hasWidgets && isWidget(child)) {
            if (typeof child.destroy === "function") {
                hasWidgets = true
            }
        } else if (!hasThunks && isThunk(child)) {
            hasThunks = true;
        }
    }

    this.count = count + descendants
    this.hasWidgets = hasWidgets
    this.hasThunks = hasThunks
    this.hooks = hooks
    this.descendantHooks = descendantHooks
}

VirtualNode.prototype.version = version
VirtualNode.prototype.type = "VirtualNode"

},{"./is-thunk":619,"./is-vhook":620,"./is-vnode":621,"./is-widget":623,"./version":624}],626:[function(require,module,exports){
var version = require("./version")

module.exports = VirtualText

function VirtualText(text) {
    this.text = String(text)
}

VirtualText.prototype.version = version
VirtualText.prototype.type = "VirtualText"

},{"./version":624}],627:[function(require,module,exports){
var nativeIsArray = Array.isArray
var toString = Object.prototype.toString

module.exports = nativeIsArray || isArray

function isArray(obj) {
    return toString.call(obj) === "[object Array]"
}

},{}]},{},[478]);
