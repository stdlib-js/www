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

},{"./is_array.js":4}],4:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":85}],5:[function(require,module,exports){
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

},{"./is_buffer.js":6}],6:[function(require,module,exports){
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

},{"@stdlib/assert/is-object-like":20}],7:[function(require,module,exports){
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

},{"./is_function.js":8}],8:[function(require,module,exports){
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

},{"@stdlib/utils/type-of":94}],9:[function(require,module,exports){
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

},{"./object.js":12,"./primitive.js":13}],10:[function(require,module,exports){
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

},{"./generic.js":9,"./object.js":12,"./primitive.js":13,"@stdlib/utils/define-read-only-property":74}],11:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-integer":32,"@stdlib/math/constants/float64-ninf":67,"@stdlib/math/constants/float64-pinf":68}],12:[function(require,module,exports){
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

},{"./integer.js":11,"@stdlib/assert/is-number":15}],13:[function(require,module,exports){
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

},{"./integer.js":11,"@stdlib/assert/is-number":15}],14:[function(require,module,exports){
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

},{"./object.js":16,"./primitive.js":17}],15:[function(require,module,exports){
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

},{"./generic.js":14,"./object.js":16,"./primitive.js":17,"@stdlib/utils/define-read-only-property":74}],16:[function(require,module,exports){
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

},{"./try2serialize.js":19,"@stdlib/utils/detect-tostringtag-support":78,"@stdlib/utils/native-class":85}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
'use strict';

// eslint-disable-next-line no-redeclare
var toString = Number.prototype.toString; // non-generic


// EXPORTS //

module.exports = toString;

},{}],19:[function(require,module,exports){
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

},{"./tostring.js":18}],20:[function(require,module,exports){
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

},{"./is_object_like.js":21,"@stdlib/assert/tools/array-function":31,"@stdlib/utils/define-read-only-property":74}],21:[function(require,module,exports){
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

},{}],22:[function(require,module,exports){
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

},{"./is_object.js":23}],23:[function(require,module,exports){
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

},{"@stdlib/assert/is-array":3}],24:[function(require,module,exports){
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

},{"./is_plain_object.js":25}],25:[function(require,module,exports){
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

},{"@stdlib/assert/has-own-property":2,"@stdlib/assert/is-function":7,"@stdlib/assert/is-object":22,"@stdlib/utils/get-prototype-of":81,"@stdlib/utils/native-class":85}],26:[function(require,module,exports){
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

},{"./object.js":28,"./primitive.js":29}],27:[function(require,module,exports){
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

},{"./generic.js":26,"./object.js":28,"./primitive.js":29,"@stdlib/utils/define-read-only-property":74}],28:[function(require,module,exports){
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

},{"@stdlib/assert/is-integer":10}],29:[function(require,module,exports){
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

},{"@stdlib/assert/is-integer":10}],30:[function(require,module,exports){
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

},{"@stdlib/assert/is-array":3}],31:[function(require,module,exports){
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

},{"./arrayfcn.js":30}],32:[function(require,module,exports){
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

},{"./is_integer.js":33}],33:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":60}],34:[function(require,module,exports){
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

},{"./is_nan.js":35}],35:[function(require,module,exports){
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

},{}],36:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );


// VARIABLES //

var NUM_WARMUPS = 8;
var TABLE_SIZE = 32;


// MAIN //

/**
* Initializes a shuffle table.
*
* @private
* @param {Function} rand - pseudorandom number generator
* @returns {NumberArray} shuffle table
*/
function createTable( rand ) {
	var table;
	var v;
	var i;

	// "warm-up" the PRNG...
	for ( i = 0; i < NUM_WARMUPS; i++ ) {
		v = rand();
	}
	// Prevent the above loop from being discarded by the compiler...
	if ( isnan( v ) ) {
		throw new Error( 'unexpected error. PRNG returned `NaN`.' );
	}
	// Create the shuffle table...
	table = new Array( TABLE_SIZE );
	for ( i = TABLE_SIZE-1; i >= 0; i-- ) {
		table[ i ] = rand();
	}
	return table;
} // end FUNCTION createTable()


// EXPORTS //

module.exports = createTable;

},{"@stdlib/math/base/assert/is-nan":34}],37:[function(require,module,exports){
'use strict';

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isPositiveInteger = require( '@stdlib/assert/is-positive-integer' ).isPrimitive;
var floor = require( '@stdlib/math/base/special/floor' );
var INT32_MAX = require( '@stdlib/math/constants/int32-max' );
var minstd = require( '@stdlib/math/base/random/minstd' ).factory;
var createTable = require( './create_table.js' );


// VARIABLES //

var NORMALIZATION_CONSTANT = INT32_MAX - 1;
var MAX_SEED = INT32_MAX - 1;


// MAIN //

/**
* Returns a linear congruential pseudorandom number generator (LCG) whose output is shuffled.
*
* @param {PositiveInteger} [seed] - pseudorandom number generator seed
* @throws {TypeError} must provide a positive integer
* @throws {RangeError} must provide a positive integer less than the maximum signed 32-bit integer
* @returns {Function} shuffled LCG
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
* // returns 1421600654
*/
function factory( seed ) {
	var table;
	var state;
	var rand;
	if ( arguments.length ) {
		if ( !isPositiveInteger( seed ) ) {
			throw new TypeError( 'invalid input argument. Must provide a positive integer. Value: `' + seed + '`.' );
		}
		if ( seed > MAX_SEED ) {
			throw new RangeError( 'invalid input argument. Must provide a positive integer less than the maximum signed 32-bit integer. Value: `' + seed + '`.' );
		}
		rand = minstd( seed );
	} else {
		rand = minstd();
	}
	table = createTable( rand );
	state = table[ 0 ];

	setReadOnly( minstdShuffle, 'NAME', 'minstd-shuffle' );
	setReadOnly( minstdShuffle, 'SEED', rand.SEED );
	setReadOnly( minstdShuffle, 'MIN', 1 );
	setReadOnly( minstdShuffle, 'MAX', INT32_MAX-1 );
	setReadOnly( minstdShuffle, 'normalized', normalized );

	setReadOnly( normalized, 'NAME', minstdShuffle.NAME );
	setReadOnly( normalized, 'SEED', minstdShuffle.SEED );
	setReadOnly( normalized, 'MIN', (minstdShuffle.MIN-1) / NORMALIZATION_CONSTANT );
	setReadOnly( normalized, 'MAX', (minstdShuffle.MAX-1) / NORMALIZATION_CONSTANT );

	return minstdShuffle;

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
	function minstdShuffle() {
		var i = floor( table.length * (state/INT32_MAX) );

		// Pull a state from the table and replace:
		state = table[ i ];
		table[ i ] = rand();

		return state;
	} // end FUNCTION minstdShuffle()

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
		return (minstdShuffle()-1) / NORMALIZATION_CONSTANT;
	} // end FUNCTION normalized()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./create_table.js":36,"@stdlib/assert/is-positive-integer":27,"@stdlib/math/base/random/minstd":42,"@stdlib/math/base/special/floor":60,"@stdlib/math/constants/int32-max":69,"@stdlib/utils/define-read-only-property":74}],38:[function(require,module,exports){
'use strict';

/**
* A linear congruential pseudorandom number generator (LCG) whose output is shuffled.
*
* @module @stdlib/math/base/random/minstd-shuffle
*
* @example
* var minstd = require( '@stdlib/math/base/random/minstd-shuffle' );
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
* // returns 1421600654
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var minstd = require( './minstd_shuffled.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( minstd, 'factory', factory );


// EXPORTS //

module.exports = minstd;

},{"./factory.js":37,"./minstd_shuffled.js":39,"@stdlib/utils/define-read-only-property":74}],39:[function(require,module,exports){
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
* This implementation shuffles the output of a linear congruential pseudorandom number generator (LCG) using a shuffle table in accordance with the Bays-Durham algorithm.
*
*
* #### References
*
* * Bays, Carter, and S. D. Durham. 1976. "Improving a Poor Random Number Generator." *ACM Transactions on Mathematical Software* 2 (1). New York, NY, USA: ACM: 59–64. doi:[10.1145/355666.355670](http://dx.doi.org/10.1145/355666.355670).
* * Herzog, T.N., and G. Lord. 2002. *Applications of Monte Carlo Methods to Finance and Insurance*. ACTEX Publications. [https://books.google.com/books?id=vC7I\\\_gdX-A0C](https://books.google.com/books?id=vC7I\_gdX-A0C).
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

},{"./factory.js":37,"./rand_int32.js":40}],40:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":60,"@stdlib/math/constants/int32-max":69}],41:[function(require,module,exports){
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

},{"./rand_int32.js":44,"@stdlib/assert/is-positive-integer":27,"@stdlib/math/constants/int32-max":69,"@stdlib/utils/define-read-only-property":74}],42:[function(require,module,exports){
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

},{"./factory.js":41,"./minstd.js":43,"@stdlib/utils/define-read-only-property":74}],43:[function(require,module,exports){
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

},{"./factory.js":41,"./rand_int32.js":44}],44:[function(require,module,exports){
arguments[4][40][0].apply(exports,arguments)
},{"@stdlib/math/base/special/floor":60,"@stdlib/math/constants/int32-max":69,"dup":40}],45:[function(require,module,exports){
module.exports={
	"name": "minstd-shuffle"
}

},{}],46:[function(require,module,exports){
'use strict';

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isObject = require( '@stdlib/assert/is-plain-object' );
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var defaults = require( './defaults.json' );
var PRNGS = require( './prngs.js' );


// MAIN //

/**
* Returns a pseudorandom number generator for generating uniformly distributed random numbers on the interval \\( [0,1) \\).
*
* @param {Options} opts - function options
* @param {string} [opts.name='minstd-shuffle'] - name of pseudorandom number generator
* @param {*} [opts.seed] - pseudorandom number generator seed
* @throws {TypeError} must provide an object
* @throws {Error} must provide the name of a supported pseudorandom number generator
* @returns {Function} pseudorandom number generator
*
* @example
* var uniform = factory();
* var v = uniform();
* // returns <number>
*
* @example
* var uniform = factory({
*     'name': 'minstd'
* });
* var v = uniform();
* // returns <number>
*
* @example
* var uniform = factory({
*     'seed': 12345
* });
* var v = uniform();
* // returns <number>
*
* @example
* var uniform = factory({
*     'name': 'minstd',
*     'seed': 12345
* });
* var v = uniform();
* // returns <number>
*/
function factory( opts ) {
	var rand;
	var name;
	var prng;
	var seed;
	if ( arguments.length ) {
		if ( !isObject( opts ) ) {
			throw new TypeError( 'invalid input argument. Must provide an object. Value: `' + opts + '`.' );
		}
		if ( hasOwnProp( opts, 'name' ) ) {
			name = opts.name;
		} else {
			name = defaults.name;
		}
		if ( hasOwnProp( opts, 'seed' ) ) {
			seed = opts.seed;
		}
	} else {
		name = defaults.name;
	}
	prng = PRNGS[ name ];
	if ( prng === void 0 ) {
		throw new Error( 'invalid option. Unrecognized/unsupported PRNG. Option: `' + name + '`.' );
	}
	if ( seed === void 0 ) {
		rand = prng.factory();
	} else {
		rand = prng.factory( seed );
	}
	setReadOnly( uniform, 'NAME', 'uniform' );
	setReadOnly( uniform, 'SEED', rand.normalized.SEED );
	setReadOnly( uniform, 'MIN', rand.normalized.MIN );
	setReadOnly( uniform, 'MAX', rand.normalized.MAX );
	setReadOnly( uniform, 'PRNG', rand );

	return uniform;

	/**
	* Returns a uniformly distributed pseudorandom number on the interval \\( [0,1) \\).
	*
	* @private
	* @returns {number} pseudorandom number
	*
	* @example
	* var v = uniform();
	* // returns <number>
	*/
	function uniform() {
		return rand.normalized();
	} // end FUNCTION uniform()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./defaults.json":45,"./prngs.js":48,"@stdlib/assert/has-own-property":2,"@stdlib/assert/is-plain-object":24,"@stdlib/utils/define-read-only-property":74}],47:[function(require,module,exports){
'use strict';

/**
* Uniformly distributed pseudorandom numbers on the interval \\( [0,1) \\).
*
* @module @stdlib/math/base/random/randu
*
* @example
* var randu = require( '@stdlib/math/base/random/randu' );
*
* var v = randu();
* // returns <number>
*
* @example
* var factory = require( '@stdlib/math/base/random/randu' ).factory;
*
* var randu = factory({
*     'name': 'minstd',
*     'seed': 12345
* });
*
* var v = randu();
* // returns <number>
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var randu = require( './uniform.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( randu, 'factory', factory );


// EXPORTS //

module.exports = randu;

},{"./factory.js":46,"./uniform.js":49,"@stdlib/utils/define-read-only-property":74}],48:[function(require,module,exports){
'use strict';

// MAIN //

var prngs = {};

prngs[ 'minstd' ] = require( '@stdlib/math/base/random/minstd' );
prngs[ 'minstd-shuffle' ] = require( '@stdlib/math/base/random/minstd-shuffle' );


// EXPORTS //

module.exports = prngs;

},{"@stdlib/math/base/random/minstd":42,"@stdlib/math/base/random/minstd-shuffle":38}],49:[function(require,module,exports){
'use strict';

// MODULES //

var factory = require( './factory.js' );


// MAIN //

/**
* Returns a uniformly distributed random number on the interval \\( [0,1) \\).
*
* @name uniform
* @type {Function}
* @returns {number} pseudorandom number
*
* @example
* var v = uniform();
* // returns <number>
*/
var uniform = factory();


// EXPORTS //

module.exports = uniform;

},{"./factory.js":46}],50:[function(require,module,exports){
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

},{}],51:[function(require,module,exports){
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

},{"./abs.js":50}],52:[function(require,module,exports){
'use strict';

// MODULES //

var asin = require( '@stdlib/math/base/special/asin' );


// MAIN //

/**
* Computes the inverse coversed cosine.
*
* @param {number} x - input value
* @returns {number} inverse coversed cosine
*
* @example
* var v = acovercos( 0.0 );
* // returns ~1.5708
*
* @example
* var v = acovercos( -Math.PI/2.0 );
* // returns ~-0.6075
*
* @example
* var v = acovercos( -Math.PI/6.0 );
* // returns ~0.4966
*
* @example
* var v = acovercos( NaN );
* // returns NaN
*/
function acovercos( x ) {
	return asin( 1.0 + x );
} // end FUNCTION acovercos()


// EXPORTS //

module.exports = acovercos;

},{"@stdlib/math/base/special/asin":58}],53:[function(require,module,exports){
'use strict';

/**
* Compute the inverse coversed cosine.
*
* @module @stdlib/math/base/special/acovercos
*
* @example
* var acovercos = require( '@stdlib/math/base/special/acovercos' );
*
* var v = acovercos( 0.0 );
* // returns ~1.5708
*
* v = acovercos( -Math.PI/2.0 );
* // returns ~-0.6075
*
* v = acovercos( -Math.PI/6.0 );
* // returns ~0.4966
*
* v = acovercos( NaN );
* // returns NaN
*/

// MODULES //

var acovercos = require( './acovercos.js' );


// EXPORTS //

module.exports = acovercos;

},{"./acovercos.js":52}],54:[function(require,module,exports){
module.exports={"expected":[-1.5707963267948966,-1.5260935891346763,-1.5075718428025136,-1.4933560117250577,-1.4813684991694585,-1.4708046382537716,-1.4612517824148195,-1.4524648214055167,-1.444284065703959,-1.4365986038030125,-1.4293276883802393,-1.4224103667424246,-1.41579928858909,-1.409456801785667,-1.4033523806100368,-1.3974608695309416,-1.3917612470903578,-1.3862357331782005,-1.3808691298427815,-1.3756483250462017,-1.3705619126848532,-1.365599897221115,-1.36075346097934,-1.3560147785854428,-1.3513768673776474,-1.346833465616388,-1.3423789324287758,-1.3380081649271909,-1.3337165290310513,-1.3294998013205406,-1.3253541198454752,-1.3212759422593074,-1.3172620099876864,-1.3133093174014112,-1.3094150851651944,-1.3055767370910711,-1.3017918799491555,-1.2980582857866687,-1.294373876384605,-1.2907367095444235,-1.287144966948134,-1.283596943376638,-1.2800910371050866,-1.2766257413219422,-1.2731996364414642,-1.269811383198515,-1.266459716430528,-1.263143439464876,-1.259861419041125,-1.2566125807071742,-1.2533959046363168,-1.2502104218191397,-1.2470552105900032,-1.2439293934528648,-1.2408321341755149,-1.2377626351249937,-1.2347201348201717,-1.2317039056802441,-1.2287132519503123,-1.2257475077873226,-1.2228060354914643,-1.2198882238697495,-1.2169934867198935,-1.2141212614238637,-1.211271007641555,-1.2084422060960192,-1.2056343574425212,-1.202846981214467,-1.2000796148399067,-1.1973318127229282,-1.1946031453847792,-1.191893198660044,-1.1892015729436234,-1.1865278824846406,-1.183871754723759,-1.1812328296706878,-1.178610759318937,-1.1760052070951352,-1.1734158473404488,-1.1708423648218431,-1.1682844542711144,-1.1657418199497878,-1.163214175238133,-1.1607012422466765,-1.1582027514487312,-1.1557184413325685,-1.153248058071959,-1.150791355213921,-1.148348093382581,-1.1459180399981466,-1.1435009690100613,-1.141096660643472,-1.138704901158211,-1.136325482619542,-1.133958202679977,-1.1316028643715241,-1.1292592759077489,-1.1269272504951047,-1.1246066061529973,-1.1222971655420966,-1.1199987558004396,-1.1177112083868965,-1.1154343589316003,-1.1131680470929612,-1.1109121164209215,-1.1086664142261164,-1.106430791454633,-1.1042051025680784,-1.1019892054286853,-1.099782961189197,-1.09758623418729,-1.0953988918443147,-1.0932208045681295,-1.0910518456598368,-1.0888918912242287,-1.0867408200837618,-1.0845985136958938,-1.0824648560736225,-1.08033973370908,-1.078223035500034,-1.0761146526791645,-1.0740144787459958,-1.0719224094013478,-1.0698383424842102,-1.0677621779109194,-1.0656938176165434,-1.0636331654983702,-1.0615801273614163,-1.0595346108658645,-1.057496525476343,-1.0554657824129778,-1.053442294604134,-1.051425976640781,-1.0494167447324105,-1.047414516664447,-1.0454192117570842,-1.0434307508254956,-1.0414490561413576,-1.0394740513956384,-1.0375056616625966,-1.0355438133649462,-1.0335884342401398,-1.0316394533077282,-1.0296968008377507,-1.027760408320124,-1.0258302084349817,-1.0239061350239393,-1.0219881230622394,-1.0200761086317527,-1.0181700288947968,-1.0162698220687472,-1.0143754274014085,-1.0124867851471195,-1.0106038365435648,-1.0087265237892695,-1.0068547900217493,-1.004988579296296,-1.003127836565375,-1.0012725076586113,-0.9994225392633461,-0.997577878905745,-0.9957384749324355,-0.9939042764926573,-0.99207523352091,-0.9902512967200783,-0.9884324175450204,-0.9866185481866041,-0.9848096415561756,-0.9830056512704457,-0.9812065316367824,-0.9794122376388932,-0.9776227249228884,-0.9758379497837084,-0.9740578691519087,-0.9722824405807872,-0.9705116222338438,-0.9687453728725639,-0.9669836518445135,-0.9652264190717365,-0.9634736350394455,-0.9617252607849983,-0.9599812578871472,-0.9582415884555577,-0.9565062151205861,-0.9547751010233079,-0.9530482098057897,-0.9513255056015988,-0.9496069530265422,-0.9478925171696273,-0.94618216358424,-0.9444758582795338,-0.9427735677120198,-0.9410752587773581,-0.9393808988023402,-0.9376904555370577,-0.9360038971472538,-0.9343211922068511,-0.9326423096906505,-0.9309672189671974,-0.9292958897918092,-0.9276282922997624,-0.9259643969996302,-0.9243041747667716,-0.9226475968369656,-0.920994634800184,-0.9193452605945045,-0.9176994465001558,-0.9160571651336941,-0.9144183894423041,-0.9127830926982257,-0.9111512484932993,-0.9095228307336282,-0.9078978136343552,-0.9062761717145504,-0.9046578797922058,-0.9030429129793365,-0.9014312466771839,-0.899822856571519,-0.8982177186280424,-0.8966158090878809,-0.8950171044631753,-0.8934215815327586,-0.8918292173379226,-0.8902399891782711,-0.8886538746076547,-0.8870708514301892,-0.8854908976963537,-0.8839139916991645,-0.882340111970427,-0.8807692372770605,-0.8792013466174959,-0.8776364192181428,-0.8760744345299268,-0.8745153722248933,-0.8729592121928769,-0.8714059345382343,-0.8698555195766425,-0.8683079478319538,-0.8667632000331138,-0.8652212571111373,-0.8636821001961392,-0.8621457106144241,-0.860612069885627,-0.8590811597199106,-0.8575529620152113,-0.856027458854538,-0.8545046325033211,-0.8529844654068071,-0.8514669401875039,-0.8499520396426713,-0.8484397467418556,-0.8469300446244707,-0.8454229165974212,-0.8439183461327692,-0.8424163168654406,-0.840916812590974,-0.8394198172633089,-0.8379253149926122,-0.8364332900431429,-0.8349437268311553,-0.8334566099228361,-0.8319719240322805,-0.8304896540195004,-0.8290097848884682,-0.8275323017851943,-0.8260571899958359,-0.8245844349448406,-0.823114022193118,-0.8216459374362453,-0.8201801665027013,-0.8187166953521301,-0.8172555100736338,-0.8157965968840953,-0.8143399421265254,-0.8128855322684401,-0.8114333539002636,-0.8099833937337579,-0.8085356386004763,-0.8070900754502444,-0.8056466913496645,-0.8042054734806439,-0.802766409138947,-0.8013294857327724,-0.799894690781349,-0.798462011913558,-0.7970314368665755,-0.7956029534845354,-0.794176549717215,-0.7927522136187405,-0.7913299333463135,-0.7899096971589553,-0.7884914934162732,-0.7870753105772447,-0.7856611371990196,-0.7842489619357428,-0.7828387735373927,-0.7814305608486393,-0.7800243128077176,-0.7786200184453205,-0.7772176668835068,-0.7758172473346258,-0.774418749100258,-0.7730221615701733,-0.7716274742213022,-0.7702346766167231,-0.7688437584046667,-0.7674547093175317,-0.7660675191709174,-0.7646821778626701,-0.7632986753719423,-0.7619170017582668,-0.760537147160644,-0.7591591017966425,-0.7577828559615116,-0.7564084000273084,-0.7550357244420359,-0.7536648197287945,-0.752295676484944,-0.7509282853812803,-0.7495626371612203,-0.7481987226400011,-0.7468365327038894,-0.7454760583094013,-0.7441172904825348,-0.7427602203180107,-0.7414048389785265,-0.7400511376940186,-0.7386991077609356,-0.7373487405415221,-0.7360000274631112,-0.734652960017427,-0.733307529759898,-0.7319637283089774,-0.7306215473454748,-0.7292809786118953,-0.7279420139117897,-0.7266046451091099,-0.7252688641275769,-0.7239346629500545,-0.7226020336179325,-0.7212709682305176,-0.7199414589444331,-0.7186134979730254,-0.717287077585779,-0.7159621901077402,-0.7146388279189457,-0.7133169834538613,-0.7119966492008262,-0.7106778177015058,-0.7093604815503506,-0.7080446333940619,-0.7067302659310658,-0.7054173719109926,-0.7041059441341628,-0.7027959754510815,-0.7014874587619361,-0.7001803870161036,-0.6988747532116618,-0.6975705503949083,-0.6962677716598841,-0.694966410147904,-0.6936664590470933,-0.692367911591929,-0.6910707610627879,-0.6897750007854997,-0.6884806241309055,-0.6871876245144225,-0.6858959953956133,-0.6846057302777607,-0.6833168227074478,-0.682029266274143,-0.6807430546097908,-0.6794581813884063,-0.6781746403256755,-0.6768924251785609,-0.6756115297449098,-0.6743319478630696,-0.6730536734115071,-0.6717767003084312,-0.670501022511421,-0.6692266340170585,-0.667953528860566,-0.6666817011154459,-0.6654111448931265,-0.6641418543426121,-0.6628738236501358,-0.6616070470388172,-0.6603415187683247,-0.6590772331345401,-0.6578141844692287,-0.6565523671397124,-0.6552917755485466,-0.6540324041332011,-0.6527742473657442,-0.6515172997525315,-0.6502615558338964,-0.6490070101838461,-0.6477536574097598,-0.6465014921520906,-0.645250509084071,-0.6440007029114216,-0.6427520683720631,-0.6415046002358311,-0.6402582933041947,-0.6390131424099786,-0.6377691424170868,-0.6365262882202303,-0.6352845747446592,-0.6340439969458941,-0.6328045498094647,-0.6315662283506485,-0.6303290276142127,-0.6290929426741603,-0.6278579686334778,-0.6266241006238851,-0.6253913338055902,-0.6241596633670441,-0.6229290845247005,-0.6216995925227766,-0.6204711826330167,-0.6192438501544598,-0.618017590413207,-0.6167923987621938,-0.6155682705809642,-0.6143452012754461,-0.6131231862777304,-0.6119022210458517,-0.6106823010635722,-0.6094634218401667,-0.6082455789102096,-0.607028767833367,-0.6058129841941872,-0.6045982236018952,-0.6033844816901903,-0.6021717541170437,-0.6009600365644993,-0.5997493247384773,-0.5985396143685782,-0.5973309012078897,-0.5961231810327957,-0.5949164496427874,-0.593710702860275,-0.5925059365304035,-0.5913021465208683,-0.5900993287217338,-0.5888974790452532,-0.5876965934256921,-0.5864966678191499,-0.5852976982033868,-0.5840996805776514,-0.5829026109625086,-0.5817064853996711,-0.5805112999518315,-0.579317050702497,-0.578123733755824,-0.5769313452364567,-0.5757398812893654,-0.5745493380796867,-0.5733597117925664,-0.5721709986330029,-0.570983194825692,-0.5697962966148742,-0.5686103002641822,-0.5674252020564915,-0.5662409982937705,-0.5650576852969336,-0.5638752594056956,-0.5626937169784261,-0.5615130543920068,-0.5603332680416901,-0.5591543543409581,-0.5579763097213827,-0.5567991306324896,-0.5556228135416206,-0.5544473549337979,-0.5532727513115914,-0.5520989991949854,-0.550926095121247,-0.5497540356447961,-0.5485828173370768,-0.5474124367864288,-0.5462428905979614,-0.5450741753934283,-0.543906287811103,-0.5427392245056553,-0.5415729821480303,-0.5404075574253273,-0.5392429470406797,-0.5380791477131364,-0.5369161561775451,-0.535753969184435,-0.5345925834999015,-0.5334319959054927,-0.5322722031980952,-0.531113202189822,-0.5299549897079021,-0.5287975625945691,-0.5276409177069527,-0.5264850519169699,-0.5253299621112189,-0.5241756451908712,-0.5230220980715673,-0.5218693176833121,-0.5207173009703712,-0.5195660448911683,-0.5184155464181838,-0.5172658025378539,-0.5161168102504706,-0.514968566570083,-0.5138210685243991,-0.512674313154688,-0.5115282975156845,-0.5103830186754925,-0.509238473715491,-0.50809465973024,-0.5069515738273872,-0.5058092131275761,-0.5046675747643538,-0.5035266558840813,-0.5023864536458429,-0.5012469652213571,-0.5001081877948885,-0.49897011856316015,-0.4978327547352662,-0.4966960935325866,-0.49556013218870076,-0.49442486794930374,-0.4932902980721218,-0.49215641982682923,-0.49102323049496593,-0.48989072736985534,-0.48875890775652364,-0.48762776897161897,-0.48649730834333155,-0.4853675232113151,-0.4842384109266076,-0.483109968851554,-0.48198219435972905,-0.48085508483586026,-0.47972863767575274,-0.4786028502862131,-0.4774777200849755,-0.4763532445006274,-0.4752294209725357,-0.4741062469507745,-0.47298371989605265,-0.47186183727964187,-0.470740596583306,-0.4696199952992304,-0.4685000309299519,-0.4673807009882897,-0.4662620029972764,-0.46514393449008967,-0.46402649300998483,-0.46290967611022754,-0.4617934813540273,-0.46067790631447103,-0.45956294857445806,-0.4584486057266346,-0.45733487537332956,-0.4562217551264905,-0.45510924260761987,-0.4539973354477125,-0.4528860312871925,-0.4517753277758519,-0.45066522257278857,-0.44955571334634564,-0.4484467977740505,-0.44733847354255524,-0.44623073834757637,-0.4451235898938365,-0.44401702589500464,-0.4429110440736389,-0.4418056421611283,-0.4407008178976351,-0.43959656903203853,-0.43849289332187785,-0.4373897885332965,-0.43628725244098665,-0.4351852828281335,-0.4340838774863612,-0.43298303421567785,-0.4318827508244221,-0.4307830251292095,-0.4296838549548789,-0.42858523813444055,-0.42748717250902296,-0.4263896559278217,-0.42529268624804734,-0.4241962613348745,-0.4231003790613911,-0.4220050373085479,-0.42091023396510835,-0.4198159669275995,-0.4187222341002618,-0.4176290333950012,-0.4165363627313397,-0.4154442200363678,-0.41435260324469625,-0.4132615102984089,-0.4121709391470152,-0.41108088774740376,-0.40999135406379544,-0.4089023360676979,-0.40781383173785896,-0.4067258390602219,-0.4056383560278801,-0.4045513806410319,-0.4034649109069366,-0.4023789448398701,-0.401293480461081,-0.4002085157987472,-0.39912404888793257,-0.39804007777054423,-0.39695660049528975,-0.3958736151176348,-0.39479111969976155,-0.3937091123105264,-0.39262759102541916,-0.3915465539265215,-0.3904659991024662,-0.3893859246483969,-0.38830632866592735,-0.3872272092631019,-0.3861485645543557,-0.3850703926604749,-0.38399269170855815,-0.38291545983197706,-0.3818386951703382,-0.3807623958694444,-0.37968656008125656,-0.3786111859638563,-0.377536271681408,-0.3764618154041217,-0.375387815308216,-0.37431426957588126,-0.373241176395243,-0.372168533960326,-0.37109634047101747,-0.37002459413303224,-0.3689532931578762,-0.3678824357628119,-0.3668120201708228,-0.36574204461057874,-0.3646725073164013,-0.36360340652822914,-0.3625347404915844,-0.36146650745753844,-0.3603987056826778,-0.3593313334290715,-0.35826438896423707,-0.35719787056110797,-0.35613177649800065,-0.35506610505858177,-0.354000854531836,-0.352936023212034,-0.3518716093986998,-0.35080761139658,-0.34974402751561134,-0.34868085607088983,-0.3476180953826397,-0.3465557437761819,-0.345493799581904,-0.3444322611352291,-0.34337112677658604,-0.3423103948513787,-0.3412500637099563,-0.3401901317075838,-0.33913059720441174,-0.3380714585654476,-0.33701271416052614,-0.3359543623642802,-0.33489640155611244,-0.3338388301201662,-0.332781646445297,-0.3317248489250448,-0.3306684359576051,-0.3296124059458016,-0.32855675729705824,-0.3275014884233713,-0.3264465977412825,-0.32539208367185124,-0.32433794464062793,-0.32328417907762685,-0.3222307854172991,-0.3211777620985068,-0.32012510756449564,-0.31907282026286954,-0.3180208986455639,-0.31696934116881986,-0.3159181462931587,-0.3148673124833557,-0.31381683820841516,-0.312766721941545,-0.31171696216013095,-0.31066755734571255,-0.30961850598395746,-0.30856980656463684,-0.3075214575816013,-0.3064734575327558,-0.30542580492003557,-0.30437849824938223,-0.30333153603071944,-0.3022849167779292,-0.30123863900882786,-0.3001927012451431,-0.2991471020124899,-0.2981018398403474,-0.29705691326203587,-0.2960123208146935,-0.29496806103925344,-0.29392413248042143,-0.2928805336866524,-0.29183726321012876,-0.2907943196067373,-0.28975170143604745,-0.288709407261289,-0.28766743564932984,-0.2866257851706544,-0.28558445439934177,-0.2845434419130438,-0.28350274629296424,-0.2824623661238364,-0.28142229999390284,-0.2803825464948936,-0.27934310422200515,-0.27830397177387994,-0.27726514775258493,-0.27622663076359155,-0.2751884194157547,-0.2741505123212923,-0.27311290809576516,-0.27207560535805647,-0.2710386027303519,-0.2700018988381195,-0.26896549231008954,-0.2679293817782351,-0.26689356587775226,-0.26585804324704015,-0.2648228125276819,-0.263787872364425,-0.2627532214051623,-0.26171885830091235,-0.26068478170580067,-0.2596509902770409,-0.2586174826749154,-0.257584257562757,-0.25655131360693006,-0.25551864947681185,-0.25448626384477435,-0.25345415538616534,-0.2524223227792906,-0.25139076470539556,-0.2503594798486471,-0.2493284668961155,-0.2482977245377568,-0.24726725146639464,-0.2462370463777026,-0.24520710797018683,-0.24417743494516805,-0.2431480260067644,-0.24211887986187397,-0.24108999522015734,-0.2400613707940207,-0.23903300529859844,-0.23800489745173622,-0.23697704597397395,-0.23594944958852912,-0.2349221070212797,-0.2338950170007477,-0.23286817825808237,-0.23184158952704378,-0.23081524954398633,-0.22978915704784228,-0.22876331078010553,-0.22773770948481534,-0.22671235190854033,-0.2256872368003622,-0.22466236291185981,-0.22363772899709333,-0.22261333381258833,-0.22158917611732007,-0.22056525467269772,-0.2195415682425488,-0.21851811559310363,-0.21749489549297987,-0.21647190671316704,-0.21544914802701126,-0.21442661821019995,-0.2134043160407467,-0.21238224029897607,-0.2113603897675086,-0.21033876323124573,-0.20931735947735505,-0.20829617729525524,-0.2072752154766015,-0.20625447281527068,-0.20523394810734663,-0.2042136401511057,-0.2031935477470023,-0.2021736696976541,-0.201154004807828,-0.2001345518844256,-0.19911530973646901,-0.19809627717508665,-0.19707745301349902,-0.19605883606700467,-0.19504042515296616,-0.1940222190907962,-0.19300421670194354,-0.19198641680987932,-0.19096881824008316,-0.18995141982002944,-0.18893422037917376,-0.1879172187489391,-0.18690041376270244,-0.1858838042557812,-0.18486738906541977,-0.18385116703077622,-0.18283513699290874,-0.1818192977947626,-0.1808036482811568,-0.17978818729877089,-0.17877291369613188,-0.17775782632360118,-0.1767429240333615,-0.17572820567940395,-0.1747136701175152,-0.1736993162052644,-0.1726851428019906,-0.17167114876878975,-0.17065733296850222,-0.16964369426569997,-0.16863023152667397,-0.16761694361942164,-0.16660382941363433,-0.16559088778068481,-0.16457811759361496,-0.16356551772712313,-0.1625530870575521,-0.1615408244628766,-0.16052872882269115,-0.15951679901819776,-0.15850503393219387,-0.1574934324490602,-0.15648199345474875,-0.1554707158367706,-0.1544595984841841,-0.15344864028758282,-0.15243784013908376,-0.15142719693231538,-0.15041670956240583,-0.14940637692597117,-0.14839619792110367,-0.14738617144736008,-0.14637629640575,-0.1453665716987242,-0.14435699623016315,-0.14334756890536535,-0.14233828863103604,-0.1413291543152755,-0.1403201648675678,-0.13931131919876924,-0.1383026162210973,-0.13729405484811902,-0.13628563399473984,-0.13527735257719245,-0.13426920951302543,-0.1332612037210922,-0.13225333412153992,-0.13124559963579813,-0.13023799918656803,-0.1292305316978113,-0.12822319609473898,-0.12721599130380076,-0.12620891625267383,-0.12520196987025212,-0.12419515108663533,-0.12318845883311824,-0.12218189204217973,-0.12117544964747216,-0.12016913058381057,-0.11916293378716195,-0.11815685819463459,-0.11715090274446747,-0.11614506637601958,-0.11513934802975935,-0.11413374664725412,-0.11312826117115955,-0.11212289054520923,-0.11111763371420406,-0.11011248962400191,-0.1091074572215072,-0.10810253545466046,-0.10709772327242799,-0.10609301962479152,-0.10508842346273795,-0.10408393373824898,-0.10307954940429091,-0.10207526941480444,-0.10107109272469433,-0.10006701828981941,-0.09906304506698227,-0.0980591720139192,-0.09705539808929006,-0.09605172225266823,-0.09504814346453049,-0.094044660686247,-0.0930412728800714,-0.09203797900913062,-0.09103477803741508,-0.09003166892976867,-0.08902865065187884,-0.08802572217026669,-0.0870228824522771,-0.08602013046606888,-0.0850174651806049,-0.08401488556564236,-0.08301239059172283,-0.08200997923016265,-0.08100765045304305,-0.0800054032332005,-0.07900323654421693,-0.07800114936041,-0.07699914065682359,-0.07599720940921789,-0.07499535459406001,-0.07399357518851414,-0.07299187017043209,-0.0719902385183436,-0.07098867921144687,-0.06998719122959893,-0.06898577355330608,-0.06798442516371447,-0.0669831450426005,-0.06598193217236138,-0.06498078553600561,-0.06397970411714361,-0.06297868689997817,-0.06197773286929507,-0.06097684101045369,-0.0599760103093776,-0.05897523975254514,-0.057974528326980086,-0.05697387502024227,-0.055973278820418276,-0.054972738716112066,-0.053972253696435685,-0.05297182275099995,-0.05197144486990518,-0.050971119043731875,-0.04997084426353149,-0.04897061952081717,-0.04797044380755448,-0.04697031611615223,-0.045970235439453194,-0.04497020077072493,-0.04397021110365058,-0.04297026543231968,-0.04197036275121898,-0.04097050205522327,-0.03997068233958624,-0.03897090259993132,-0.03797116183224253,-0.036971459032855356,-0.03597179319844764,-0.03497216332603046,-0.03397256841293901,-0.03297300745682353,-0.0319734794556402,-0.03097398340764206,-0.02997451831136994,-0.028975083165643387,-0.027975676969551617,-0.02697629872244446,-0.025976947423923306,-0.02497762207383206,-0.02397832167224813,-0.022979045219473377,-0.021979791716025113,-0.020980560162627056,-0.01998134956020035,-0.018982158909854534,-0.017982987212878557,-0.01698383347073176,-0.015984696685034896,-0.014985575857561157,-0.013986469990227146,-0.012987378085083937,-0.011988299144308068,-0.010989232170192584,-0.009990176165138047,-0.008991130131643588,-0.007992093072297915,-0.006993063989770366,-0.0059940418868019395,-0.0049950257661963305,-0.003996014630810974,-0.0029970074835480864,-0.001998003327345706,-0.0009990011651687387,0.0,0.0009990011651687387,0.001998003327345706,0.0029970074835480864,0.003996014630810974,0.0049950257661963305,0.0059940418868019395,0.006993063989770366,0.007992093072297915,0.008991130131643588,0.009990176165138047,0.010989232170192584,0.011988299144308068,0.012987378085083937,0.013986469990227146,0.014985575857561157,0.015984696685034896,0.01698383347073176,0.017982987212878557,0.018982158909854534,0.01998134956020035,0.020980560162627056,0.021979791716025113,0.022979045219473377,0.02397832167224813,0.02497762207383206,0.025976947423923306,0.02697629872244446,0.027975676969551617,0.028975083165643387,0.02997451831136994,0.03097398340764206,0.0319734794556402,0.03297300745682353,0.03397256841293901,0.03497216332603046,0.03597179319844764,0.036971459032855356,0.03797116183224253,0.03897090259993132,0.03997068233958624,0.04097050205522327,0.04197036275121898,0.04297026543231968,0.04397021110365058,0.04497020077072493,0.045970235439453194,0.04697031611615223,0.04797044380755448,0.04897061952081717,0.04997084426353149,0.050971119043731875,0.05197144486990518,0.05297182275099995,0.053972253696435685,0.054972738716112066,0.055973278820418276,0.05697387502024227,0.057974528326980086,0.05897523975254514,0.0599760103093776,0.06097684101045369,0.06197773286929507,0.06297868689997817,0.06397970411714361,0.06498078553600561,0.06598193217236138,0.0669831450426005,0.06798442516371447,0.06898577355330608,0.06998719122959893,0.07098867921144687,0.0719902385183436,0.07299187017043209,0.07399357518851414,0.07499535459406001,0.07599720940921789,0.07699914065682359,0.07800114936041,0.07900323654421693,0.0800054032332005,0.08100765045304305,0.08200997923016265,0.08301239059172283,0.08401488556564236,0.0850174651806049,0.08602013046606888,0.0870228824522771,0.08802572217026669,0.08902865065187884,0.09003166892976867,0.09103477803741508,0.09203797900913062,0.0930412728800714,0.094044660686247,0.09504814346453049,0.09605172225266823,0.09705539808929006,0.0980591720139192,0.09906304506698227,0.10006701828981941,0.10107109272469433,0.10207526941480444,0.10307954940429091,0.10408393373824898,0.10508842346273795,0.10609301962479152,0.10709772327242799,0.10810253545466046,0.1091074572215072,0.11011248962400191,0.11111763371420406,0.11212289054520923,0.11312826117115955,0.11413374664725412,0.11513934802975935,0.11614506637601958,0.11715090274446747,0.11815685819463459,0.11916293378716195,0.12016913058381057,0.12117544964747216,0.12218189204217973,0.12318845883311824,0.12419515108663533,0.12520196987025212,0.12620891625267383,0.12721599130380076,0.12822319609473898,0.1292305316978113,0.13023799918656803,0.13124559963579813,0.13225333412153992,0.1332612037210922,0.13426920951302543,0.13527735257719245,0.13628563399473984,0.13729405484811902,0.1383026162210973,0.13931131919876924,0.1403201648675678,0.1413291543152755,0.14233828863103604,0.14334756890536535,0.14435699623016315,0.1453665716987242,0.14637629640575,0.14738617144736008,0.14839619792110367,0.14940637692597117,0.15041670956240583,0.15142719693231538,0.15243784013908376,0.15344864028758282,0.1544595984841841,0.1554707158367706,0.15648199345474875,0.1574934324490602,0.15850503393219387,0.15951679901819776,0.16052872882269115,0.1615408244628766,0.1625530870575521,0.16356551772712313,0.16457811759361496,0.16559088778068481,0.16660382941363433,0.16761694361942164,0.16863023152667397,0.16964369426569997,0.17065733296850222,0.17167114876878975,0.1726851428019906,0.1736993162052644,0.1747136701175152,0.17572820567940395,0.1767429240333615,0.17775782632360118,0.17877291369613188,0.17978818729877089,0.1808036482811568,0.1818192977947626,0.18283513699290874,0.18385116703077622,0.18486738906541977,0.1858838042557812,0.18690041376270244,0.1879172187489391,0.18893422037917376,0.18995141982002944,0.19096881824008316,0.19198641680987932,0.19300421670194354,0.1940222190907962,0.19504042515296616,0.19605883606700467,0.19707745301349902,0.19809627717508665,0.19911530973646901,0.2001345518844256,0.201154004807828,0.2021736696976541,0.2031935477470023,0.2042136401511057,0.20523394810734663,0.20625447281527068,0.2072752154766015,0.20829617729525524,0.20931735947735505,0.21033876323124573,0.2113603897675086,0.21238224029897607,0.2134043160407467,0.21442661821019995,0.21544914802701126,0.21647190671316704,0.21749489549297987,0.21851811559310363,0.2195415682425488,0.22056525467269772,0.22158917611732007,0.22261333381258833,0.22363772899709333,0.22466236291185981,0.2256872368003622,0.22671235190854033,0.22773770948481534,0.22876331078010553,0.22978915704784228,0.23081524954398633,0.23184158952704378,0.23286817825808237,0.2338950170007477,0.2349221070212797,0.23594944958852912,0.23697704597397395,0.23800489745173622,0.23903300529859844,0.2400613707940207,0.24108999522015734,0.24211887986187397,0.2431480260067644,0.24417743494516805,0.24520710797018683,0.2462370463777026,0.24726725146639464,0.2482977245377568,0.2493284668961155,0.2503594798486471,0.25139076470539556,0.2524223227792906,0.25345415538616534,0.25448626384477435,0.25551864947681185,0.25655131360693006,0.257584257562757,0.2586174826749154,0.2596509902770409,0.26068478170580067,0.26171885830091235,0.2627532214051623,0.263787872364425,0.2648228125276819,0.26585804324704015,0.26689356587775226,0.2679293817782351,0.26896549231008954,0.2700018988381195,0.2710386027303519,0.27207560535805647,0.27311290809576516,0.2741505123212923,0.2751884194157547,0.27622663076359155,0.27726514775258493,0.27830397177387994,0.27934310422200515,0.2803825464948936,0.28142229999390284,0.2824623661238364,0.28350274629296424,0.2845434419130438,0.28558445439934177,0.2866257851706544,0.28766743564932984,0.288709407261289,0.28975170143604745,0.2907943196067373,0.29183726321012876,0.2928805336866524,0.29392413248042143,0.29496806103925344,0.2960123208146935,0.29705691326203587,0.2981018398403474,0.2991471020124899,0.3001927012451431,0.30123863900882786,0.3022849167779292,0.30333153603071944,0.30437849824938223,0.30542580492003557,0.3064734575327558,0.3075214575816013,0.30856980656463684,0.30961850598395746,0.31066755734571255,0.31171696216013095,0.312766721941545,0.31381683820841516,0.3148673124833557,0.3159181462931587,0.31696934116881986,0.3180208986455639,0.31907282026286954,0.32012510756449564,0.3211777620985068,0.3222307854172991,0.32328417907762685,0.32433794464062793,0.32539208367185124,0.3264465977412825,0.3275014884233713,0.32855675729705824,0.3296124059458016,0.3306684359576051,0.3317248489250448,0.332781646445297,0.3338388301201662,0.33489640155611244,0.3359543623642802,0.33701271416052614,0.3380714585654476,0.33913059720441174,0.3401901317075838,0.3412500637099563,0.3423103948513787,0.34337112677658604,0.3444322611352291,0.345493799581904,0.3465557437761819,0.3476180953826397,0.34868085607088983,0.34974402751561134,0.35080761139658,0.3518716093986998,0.352936023212034,0.354000854531836,0.35506610505858177,0.35613177649800065,0.35719787056110797,0.35826438896423707,0.3593313334290715,0.3603987056826778,0.36146650745753844,0.3625347404915844,0.36360340652822914,0.3646725073164013,0.36574204461057874,0.3668120201708228,0.3678824357628119,0.3689532931578762,0.37002459413303224,0.37109634047101747,0.372168533960326,0.373241176395243,0.37431426957588126,0.375387815308216,0.3764618154041217,0.377536271681408,0.3786111859638563,0.37968656008125656,0.3807623958694444,0.3818386951703382,0.38291545983197706,0.38399269170855815,0.3850703926604749,0.3861485645543557,0.3872272092631019,0.38830632866592735,0.3893859246483969,0.3904659991024662,0.3915465539265215,0.39262759102541916,0.3937091123105264,0.39479111969976155,0.3958736151176348,0.39695660049528975,0.39804007777054423,0.39912404888793257,0.4002085157987472,0.401293480461081,0.4023789448398701,0.4034649109069366,0.4045513806410319,0.4056383560278801,0.4067258390602219,0.40781383173785896,0.4089023360676979,0.40999135406379544,0.41108088774740376,0.4121709391470152,0.4132615102984089,0.41435260324469625,0.4154442200363678,0.4165363627313397,0.4176290333950012,0.4187222341002618,0.4198159669275995,0.42091023396510835,0.4220050373085479,0.4231003790613911,0.4241962613348745,0.42529268624804734,0.4263896559278217,0.42748717250902296,0.42858523813444055,0.4296838549548789,0.4307830251292095,0.4318827508244221,0.43298303421567785,0.4340838774863612,0.4351852828281335,0.43628725244098665,0.4373897885332965,0.43849289332187785,0.43959656903203853,0.4407008178976351,0.4418056421611283,0.4429110440736389,0.44401702589500464,0.4451235898938365,0.44623073834757637,0.44733847354255524,0.4484467977740505,0.44955571334634564,0.45066522257278857,0.4517753277758519,0.4528860312871925,0.4539973354477125,0.45510924260761987,0.4562217551264905,0.45733487537332956,0.4584486057266346,0.45956294857445806,0.46067790631447103,0.4617934813540273,0.46290967611022754,0.46402649300998483,0.46514393449008967,0.4662620029972764,0.4673807009882897,0.4685000309299519,0.4696199952992304,0.470740596583306,0.47186183727964187,0.47298371989605265,0.4741062469507745,0.4752294209725357,0.4763532445006274,0.4774777200849755,0.4786028502862131,0.47972863767575274,0.48085508483586026,0.48198219435972905,0.483109968851554,0.4842384109266076,0.4853675232113151,0.48649730834333155,0.48762776897161897,0.48875890775652364,0.48989072736985534,0.49102323049496593,0.49215641982682923,0.4932902980721218,0.49442486794930374,0.49556013218870076,0.4966960935325866,0.4978327547352662,0.49897011856316015,0.5001081877948885,0.5012469652213571,0.5023864536458429,0.5035266558840813,0.5046675747643538,0.5058092131275761,0.5069515738273872,0.50809465973024,0.509238473715491,0.5103830186754925,0.5115282975156845,0.512674313154688,0.5138210685243991,0.514968566570083,0.5161168102504706,0.5172658025378539,0.5184155464181838,0.5195660448911683,0.5207173009703712,0.5218693176833121,0.5230220980715673,0.5241756451908712,0.5253299621112189,0.5264850519169699,0.5276409177069527,0.5287975625945691,0.5299549897079021,0.531113202189822,0.5322722031980952,0.5334319959054927,0.5345925834999015,0.535753969184435,0.5369161561775451,0.5380791477131364,0.5392429470406797,0.5404075574253273,0.5415729821480303,0.5427392245056553,0.543906287811103,0.5450741753934283,0.5462428905979614,0.5474124367864288,0.5485828173370768,0.5497540356447961,0.550926095121247,0.5520989991949854,0.5532727513115914,0.5544473549337979,0.5556228135416206,0.5567991306324896,0.5579763097213827,0.5591543543409581,0.5603332680416901,0.5615130543920068,0.5626937169784261,0.5638752594056956,0.5650576852969336,0.5662409982937705,0.5674252020564915,0.5686103002641822,0.5697962966148742,0.570983194825692,0.5721709986330029,0.5733597117925664,0.5745493380796867,0.5757398812893654,0.5769313452364567,0.578123733755824,0.579317050702497,0.5805112999518315,0.5817064853996711,0.5829026109625086,0.5840996805776514,0.5852976982033868,0.5864966678191499,0.5876965934256921,0.5888974790452532,0.5900993287217338,0.5913021465208683,0.5925059365304035,0.593710702860275,0.5949164496427874,0.5961231810327957,0.5973309012078897,0.5985396143685782,0.5997493247384773,0.6009600365644993,0.6021717541170437,0.6033844816901903,0.6045982236018952,0.6058129841941872,0.607028767833367,0.6082455789102096,0.6094634218401667,0.6106823010635722,0.6119022210458517,0.6131231862777304,0.6143452012754461,0.6155682705809642,0.6167923987621938,0.618017590413207,0.6192438501544598,0.6204711826330167,0.6216995925227766,0.6229290845247005,0.6241596633670441,0.6253913338055902,0.6266241006238851,0.6278579686334778,0.6290929426741603,0.6303290276142127,0.6315662283506485,0.6328045498094647,0.6340439969458941,0.6352845747446592,0.6365262882202303,0.6377691424170868,0.6390131424099786,0.6402582933041947,0.6415046002358311,0.6427520683720631,0.6440007029114216,0.645250509084071,0.6465014921520906,0.6477536574097598,0.6490070101838461,0.6502615558338964,0.6515172997525315,0.6527742473657442,0.6540324041332011,0.6552917755485466,0.6565523671397124,0.6578141844692287,0.6590772331345401,0.6603415187683247,0.6616070470388172,0.6628738236501358,0.6641418543426121,0.6654111448931265,0.6666817011154459,0.667953528860566,0.6692266340170585,0.670501022511421,0.6717767003084312,0.6730536734115071,0.6743319478630696,0.6756115297449098,0.6768924251785609,0.6781746403256755,0.6794581813884063,0.6807430546097908,0.682029266274143,0.6833168227074478,0.6846057302777607,0.6858959953956133,0.6871876245144225,0.6884806241309055,0.6897750007854997,0.6910707610627879,0.692367911591929,0.6936664590470933,0.694966410147904,0.6962677716598841,0.6975705503949083,0.6988747532116618,0.7001803870161036,0.7014874587619361,0.7027959754510815,0.7041059441341628,0.7054173719109926,0.7067302659310658,0.7080446333940619,0.7093604815503506,0.7106778177015058,0.7119966492008262,0.7133169834538613,0.7146388279189457,0.7159621901077402,0.717287077585779,0.7186134979730254,0.7199414589444331,0.7212709682305176,0.7226020336179325,0.7239346629500545,0.7252688641275769,0.7266046451091099,0.7279420139117897,0.7292809786118953,0.7306215473454748,0.7319637283089774,0.733307529759898,0.734652960017427,0.7360000274631112,0.7373487405415221,0.7386991077609356,0.7400511376940186,0.7414048389785265,0.7427602203180107,0.7441172904825348,0.7454760583094013,0.7468365327038894,0.7481987226400011,0.7495626371612203,0.7509282853812803,0.752295676484944,0.7536648197287945,0.7550357244420359,0.7564084000273084,0.7577828559615116,0.7591591017966425,0.760537147160644,0.7619170017582668,0.7632986753719423,0.7646821778626701,0.7660675191709174,0.7674547093175317,0.7688437584046667,0.7702346766167231,0.7716274742213022,0.7730221615701733,0.774418749100258,0.7758172473346258,0.7772176668835068,0.7786200184453205,0.7800243128077176,0.7814305608486393,0.7828387735373927,0.7842489619357428,0.7856611371990196,0.7870753105772447,0.7884914934162732,0.7899096971589553,0.7913299333463135,0.7927522136187405,0.794176549717215,0.7956029534845354,0.7970314368665755,0.798462011913558,0.799894690781349,0.8013294857327724,0.802766409138947,0.8042054734806439,0.8056466913496645,0.8070900754502444,0.8085356386004763,0.8099833937337579,0.8114333539002636,0.8128855322684401,0.8143399421265254,0.8157965968840953,0.8172555100736338,0.8187166953521301,0.8201801665027013,0.8216459374362453,0.823114022193118,0.8245844349448406,0.8260571899958359,0.8275323017851943,0.8290097848884682,0.8304896540195004,0.8319719240322805,0.8334566099228361,0.8349437268311553,0.8364332900431429,0.8379253149926122,0.8394198172633089,0.840916812590974,0.8424163168654406,0.8439183461327692,0.8454229165974212,0.8469300446244707,0.8484397467418556,0.8499520396426713,0.8514669401875039,0.8529844654068071,0.8545046325033211,0.856027458854538,0.8575529620152113,0.8590811597199106,0.860612069885627,0.8621457106144241,0.8636821001961392,0.8652212571111373,0.8667632000331138,0.8683079478319538,0.8698555195766425,0.8714059345382343,0.8729592121928769,0.8745153722248933,0.8760744345299268,0.8776364192181428,0.8792013466174959,0.8807692372770605,0.882340111970427,0.8839139916991645,0.8854908976963537,0.8870708514301892,0.8886538746076547,0.8902399891782711,0.8918292173379226,0.8934215815327586,0.8950171044631753,0.8966158090878809,0.8982177186280424,0.899822856571519,0.9014312466771839,0.9030429129793365,0.9046578797922058,0.9062761717145504,0.9078978136343552,0.9095228307336282,0.9111512484932993,0.9127830926982257,0.9144183894423041,0.9160571651336941,0.9176994465001558,0.9193452605945045,0.920994634800184,0.9226475968369656,0.9243041747667716,0.9259643969996302,0.9276282922997624,0.9292958897918092,0.9309672189671974,0.9326423096906505,0.9343211922068511,0.9360038971472538,0.9376904555370577,0.9393808988023402,0.9410752587773581,0.9427735677120198,0.9444758582795338,0.94618216358424,0.9478925171696273,0.9496069530265422,0.9513255056015988,0.9530482098057897,0.9547751010233079,0.9565062151205861,0.9582415884555577,0.9599812578871472,0.9617252607849983,0.9634736350394455,0.9652264190717365,0.9669836518445135,0.9687453728725639,0.9705116222338438,0.9722824405807872,0.9740578691519087,0.9758379497837084,0.9776227249228884,0.9794122376388932,0.9812065316367824,0.9830056512704457,0.9848096415561756,0.9866185481866041,0.9884324175450204,0.9902512967200783,0.99207523352091,0.9939042764926573,0.9957384749324355,0.997577878905745,0.9994225392633461,1.0012725076586113,1.003127836565375,1.004988579296296,1.0068547900217493,1.0087265237892695,1.0106038365435648,1.0124867851471195,1.0143754274014085,1.0162698220687472,1.0181700288947968,1.0200761086317527,1.0219881230622394,1.0239061350239393,1.0258302084349817,1.027760408320124,1.0296968008377507,1.0316394533077282,1.0335884342401398,1.0355438133649462,1.0375056616625966,1.0394740513956384,1.0414490561413576,1.0434307508254956,1.0454192117570842,1.047414516664447,1.0494167447324105,1.051425976640781,1.053442294604134,1.0554657824129778,1.057496525476343,1.0595346108658645,1.0615801273614163,1.0636331654983702,1.0656938176165434,1.0677621779109194,1.0698383424842102,1.0719224094013478,1.0740144787459958,1.0761146526791645,1.078223035500034,1.08033973370908,1.0824648560736225,1.0845985136958938,1.0867408200837618,1.0888918912242287,1.0910518456598368,1.0932208045681295,1.0953988918443147,1.09758623418729,1.099782961189197,1.1019892054286853,1.1042051025680784,1.106430791454633,1.1086664142261164,1.1109121164209215,1.1131680470929612,1.1154343589316003,1.1177112083868965,1.1199987558004396,1.1222971655420966,1.1246066061529973,1.1269272504951047,1.1292592759077489,1.1316028643715241,1.133958202679977,1.136325482619542,1.138704901158211,1.141096660643472,1.1435009690100613,1.1459180399981466,1.148348093382581,1.150791355213921,1.153248058071959,1.1557184413325685,1.1582027514487312,1.1607012422466765,1.163214175238133,1.1657418199497878,1.1682844542711144,1.1708423648218431,1.1734158473404488,1.1760052070951352,1.178610759318937,1.1812328296706878,1.183871754723759,1.1865278824846406,1.1892015729436234,1.191893198660044,1.1946031453847792,1.1973318127229282,1.2000796148399067,1.202846981214467,1.2056343574425212,1.2084422060960192,1.211271007641555,1.2141212614238637,1.2169934867198935,1.2198882238697495,1.2228060354914643,1.2257475077873226,1.2287132519503123,1.2317039056802441,1.2347201348201717,1.2377626351249937,1.2408321341755149,1.2439293934528648,1.2470552105900032,1.2502104218191397,1.2533959046363168,1.2566125807071742,1.259861419041125,1.263143439464876,1.266459716430528,1.269811383198515,1.2731996364414642,1.2766257413219422,1.2800910371050866,1.283596943376638,1.287144966948134,1.2907367095444235,1.294373876384605,1.2980582857866687,1.3017918799491555,1.3055767370910711,1.3094150851651944,1.3133093174014112,1.3172620099876864,1.3212759422593074,1.3253541198454752,1.3294998013205406,1.3337165290310513,1.3380081649271909,1.3423789324287758,1.346833465616388,1.3513768673776474,1.3560147785854428,1.36075346097934,1.365599897221115,1.3705619126848532,1.3756483250462017,1.3808691298427815,1.3862357331782005,1.3917612470903578,1.3974608695309416,1.4033523806100368,1.409456801785667,1.41579928858909,1.4224103667424246,1.4293276883802393,1.4365986038030125,1.444284065703959,1.4524648214055167,1.4612517824148195,1.4708046382537716,1.4813684991694585,1.4933560117250577,1.5075718428025136,1.5260935891346763,1.5707963267948966],"x":[-2.0,-1.999000999000999,-1.998001998001998,-1.997002997002997,-1.996003996003996,-1.995004995004995,-1.994005994005994,-1.993006993006993,-1.992007992007992,-1.991008991008991,-1.99000999000999,-1.989010989010989,-1.988011988011988,-1.9870129870129871,-1.986013986013986,-1.985014985014985,-1.9840159840159841,-1.983016983016983,-1.982017982017982,-1.981018981018981,-1.98001998001998,-1.979020979020979,-1.978021978021978,-1.977022977022977,-1.976023976023976,-1.975024975024975,-1.974025974025974,-1.973026973026973,-1.972027972027972,-1.971028971028971,-1.97002997002997,-1.969030969030969,-1.968031968031968,-1.967032967032967,-1.966033966033966,-1.965034965034965,-1.9640359640359641,-1.963036963036963,-1.962037962037962,-1.9610389610389611,-1.96003996003996,-1.959040959040959,-1.9580419580419581,-1.957042957042957,-1.956043956043956,-1.9550449550449551,-1.954045954045954,-1.953046953046953,-1.9520479520479521,-1.951048951048951,-1.95004995004995,-1.949050949050949,-1.948051948051948,-1.947052947052947,-1.946053946053946,-1.945054945054945,-1.944055944055944,-1.943056943056943,-1.942057942057942,-1.9410589410589412,-1.94005994005994,-1.939060939060939,-1.9380619380619382,-1.937062937062937,-1.936063936063936,-1.9350649350649352,-1.934065934065934,-1.933066933066933,-1.9320679320679321,-1.931068931068931,-1.93006993006993,-1.9290709290709291,-1.928071928071928,-1.927072927072927,-1.9260739260739261,-1.925074925074925,-1.924075924075924,-1.9230769230769231,-1.922077922077922,-1.921078921078921,-1.9200799200799201,-1.919080919080919,-1.9180819180819182,-1.9170829170829171,-1.916083916083916,-1.9150849150849152,-1.914085914085914,-1.913086913086913,-1.9120879120879122,-1.911088911088911,-1.91008991008991,-1.9090909090909092,-1.908091908091908,-1.907092907092907,-1.9060939060939062,-1.905094905094905,-1.904095904095904,-1.9030969030969032,-1.902097902097902,-1.901098901098901,-1.9000999000999002,-1.899100899100899,-1.898101898101898,-1.8971028971028971,-1.896103896103896,-1.8951048951048952,-1.8941058941058941,-1.893106893106893,-1.8921078921078922,-1.8911088911088911,-1.89010989010989,-1.8891108891108892,-1.8881118881118881,-1.887112887112887,-1.8861138861138862,-1.8851148851148851,-1.884115884115884,-1.8831168831168832,-1.8821178821178821,-1.881118881118881,-1.8801198801198802,-1.879120879120879,-1.878121878121878,-1.8771228771228772,-1.876123876123876,-1.875124875124875,-1.8741258741258742,-1.873126873126873,-1.872127872127872,-1.8711288711288712,-1.87012987012987,-1.8691308691308692,-1.8681318681318682,-1.867132867132867,-1.8661338661338662,-1.8651348651348651,-1.864135864135864,-1.8631368631368632,-1.8621378621378621,-1.861138861138861,-1.8601398601398602,-1.8591408591408591,-1.858141858141858,-1.8571428571428572,-1.8561438561438561,-1.855144855144855,-1.8541458541458542,-1.8531468531468531,-1.852147852147852,-1.8511488511488512,-1.8501498501498501,-1.849150849150849,-1.8481518481518482,-1.847152847152847,-1.8461538461538463,-1.8451548451548452,-1.844155844155844,-1.8431568431568432,-1.8421578421578422,-1.841158841158841,-1.8401598401598402,-1.8391608391608392,-1.838161838161838,-1.8371628371628372,-1.8361638361638362,-1.835164835164835,-1.8341658341658342,-1.8331668331668332,-1.832167832167832,-1.8311688311688312,-1.8301698301698301,-1.829170829170829,-1.8281718281718282,-1.8271728271728271,-1.826173826173826,-1.8251748251748252,-1.8241758241758241,-1.8231768231768233,-1.8221778221778222,-1.8211788211788211,-1.8201798201798203,-1.8191808191808192,-1.8181818181818181,-1.8171828171828173,-1.8161838161838162,-1.8151848151848151,-1.8141858141858143,-1.8131868131868132,-1.812187812187812,-1.8111888111888113,-1.8101898101898102,-1.809190809190809,-1.8081918081918082,-1.8071928071928072,-1.806193806193806,-1.8051948051948052,-1.8041958041958042,-1.803196803196803,-1.8021978021978022,-1.8011988011988012,-1.8001998001998003,-1.7992007992007992,-1.7982017982017982,-1.7972027972027973,-1.7962037962037962,-1.7952047952047951,-1.7942057942057943,-1.7932067932067932,-1.7922077922077921,-1.7912087912087913,-1.7902097902097902,-1.7892107892107891,-1.7882117882117883,-1.7872127872127872,-1.7862137862137861,-1.7852147852147853,-1.7842157842157842,-1.7832167832167831,-1.7822177822177823,-1.7812187812187812,-1.7802197802197801,-1.7792207792207793,-1.7782217782217782,-1.7772227772227773,-1.7762237762237763,-1.7752247752247752,-1.7742257742257743,-1.7732267732267732,-1.7722277722277722,-1.7712287712287713,-1.7702297702297702,-1.7692307692307692,-1.7682317682317683,-1.7672327672327672,-1.7662337662337662,-1.7652347652347653,-1.7642357642357642,-1.7632367632367631,-1.7622377622377623,-1.7612387612387612,-1.7602397602397601,-1.7592407592407593,-1.7582417582417582,-1.7572427572427571,-1.7562437562437563,-1.7552447552447552,-1.7542457542457544,-1.7532467532467533,-1.7522477522477522,-1.7512487512487513,-1.7502497502497503,-1.7492507492507492,-1.7482517482517483,-1.7472527472527473,-1.7462537462537462,-1.7452547452547453,-1.7442557442557443,-1.7432567432567432,-1.7422577422577423,-1.7412587412587412,-1.7402597402597402,-1.7392607392607393,-1.7382617382617382,-1.7372627372627372,-1.7362637362637363,-1.7352647352647352,-1.7342657342657342,-1.7332667332667333,-1.7322677322677322,-1.7312687312687314,-1.7302697302697303,-1.7292707292707292,-1.7282717282717284,-1.7272727272727273,-1.7262737262737262,-1.7252747252747254,-1.7242757242757243,-1.7232767232767232,-1.7222777222777224,-1.7212787212787213,-1.7202797202797202,-1.7192807192807193,-1.7182817182817183,-1.7172827172827172,-1.7162837162837163,-1.7152847152847153,-1.7142857142857142,-1.7132867132867133,-1.7122877122877123,-1.7112887112887112,-1.7102897102897103,-1.7092907092907093,-1.7082917082917084,-1.7072927072927073,-1.7062937062937062,-1.7052947052947054,-1.7042957042957043,-1.7032967032967032,-1.7022977022977024,-1.7012987012987013,-1.7002997002997002,-1.6993006993006994,-1.6983016983016983,-1.6973026973026972,-1.6963036963036964,-1.6953046953046953,-1.6943056943056942,-1.6933066933066934,-1.6923076923076923,-1.6913086913086912,-1.6903096903096904,-1.6893106893106893,-1.6883116883116882,-1.6873126873126874,-1.6863136863136863,-1.6853146853146854,-1.6843156843156843,-1.6833166833166833,-1.6823176823176824,-1.6813186813186813,-1.6803196803196803,-1.6793206793206794,-1.6783216783216783,-1.6773226773226773,-1.6763236763236764,-1.6753246753246753,-1.6743256743256743,-1.6733266733266734,-1.6723276723276723,-1.6713286713286712,-1.6703296703296704,-1.6693306693306693,-1.6683316683316682,-1.6673326673326674,-1.6663336663336663,-1.6653346653346652,-1.6643356643356644,-1.6633366633366633,-1.6623376623376624,-1.6613386613386614,-1.6603396603396603,-1.6593406593406594,-1.6583416583416584,-1.6573426573426573,-1.6563436563436564,-1.6553446553446554,-1.6543456543456543,-1.6533466533466534,-1.6523476523476524,-1.6513486513486513,-1.6503496503496504,-1.6493506493506493,-1.6483516483516483,-1.6473526473526474,-1.6463536463536463,-1.6453546453546453,-1.6443556443556444,-1.6433566433566433,-1.6423576423576423,-1.6413586413586414,-1.6403596403596403,-1.6393606393606395,-1.6383616383616384,-1.6373626373626373,-1.6363636363636365,-1.6353646353646354,-1.6343656343656343,-1.6333666333666335,-1.6323676323676324,-1.6313686313686313,-1.6303696303696305,-1.6293706293706294,-1.6283716283716283,-1.6273726273726274,-1.6263736263736264,-1.6253746253746253,-1.6243756243756244,-1.6233766233766234,-1.6223776223776223,-1.6213786213786214,-1.6203796203796204,-1.6193806193806193,-1.6183816183816184,-1.6173826173826173,-1.6163836163836163,-1.6153846153846154,-1.6143856143856143,-1.6133866133866135,-1.6123876123876124,-1.6113886113886113,-1.6103896103896105,-1.6093906093906094,-1.6083916083916083,-1.6073926073926075,-1.6063936063936064,-1.6053946053946053,-1.6043956043956045,-1.6033966033966034,-1.6023976023976023,-1.6013986013986015,-1.6003996003996004,-1.5994005994005993,-1.5984015984015985,-1.5974025974025974,-1.5964035964035963,-1.5954045954045954,-1.5944055944055944,-1.5934065934065933,-1.5924075924075924,-1.5914085914085914,-1.5904095904095905,-1.5894105894105894,-1.5884115884115884,-1.5874125874125875,-1.5864135864135864,-1.5854145854145854,-1.5844155844155845,-1.5834165834165834,-1.5824175824175823,-1.5814185814185815,-1.5804195804195804,-1.5794205794205793,-1.5784215784215785,-1.5774225774225774,-1.5764235764235763,-1.5754245754245755,-1.5744255744255744,-1.5734265734265733,-1.5724275724275725,-1.5714285714285714,-1.5704295704295703,-1.5694305694305695,-1.5684315684315684,-1.5674325674325675,-1.5664335664335665,-1.5654345654345654,-1.5644355644355645,-1.5634365634365635,-1.5624375624375624,-1.5614385614385615,-1.5604395604395604,-1.5594405594405594,-1.5584415584415585,-1.5574425574425574,-1.5564435564435564,-1.5554445554445555,-1.5544455544455544,-1.5534465534465534,-1.5524475524475525,-1.5514485514485514,-1.5504495504495504,-1.5494505494505495,-1.5484515484515484,-1.5474525474525473,-1.5464535464535465,-1.5454545454545454,-1.5444555444555446,-1.5434565434565435,-1.5424575424575424,-1.5414585414585416,-1.5404595404595405,-1.5394605394605394,-1.5384615384615385,-1.5374625374625375,-1.5364635364635364,-1.5354645354645355,-1.5344655344655345,-1.5334665334665334,-1.5324675324675325,-1.5314685314685315,-1.5304695304695304,-1.5294705294705295,-1.5284715284715285,-1.5274725274725274,-1.5264735264735265,-1.5254745254745254,-1.5244755244755244,-1.5234765234765235,-1.5224775224775224,-1.5214785214785216,-1.5204795204795205,-1.5194805194805194,-1.5184815184815186,-1.5174825174825175,-1.5164835164835164,-1.5154845154845156,-1.5144855144855145,-1.5134865134865134,-1.5124875124875126,-1.5114885114885115,-1.5104895104895104,-1.5094905094905096,-1.5084915084915085,-1.5074925074925074,-1.5064935064935066,-1.5054945054945055,-1.5044955044955044,-1.5034965034965035,-1.5024975024975025,-1.5014985014985014,-1.5004995004995005,-1.4995004995004995,-1.4985014985014986,-1.4975024975024975,-1.4965034965034965,-1.4955044955044956,-1.4945054945054945,-1.4935064935064934,-1.4925074925074926,-1.4915084915084915,-1.4905094905094904,-1.4895104895104896,-1.4885114885114885,-1.4875124875124874,-1.4865134865134866,-1.4855144855144855,-1.4845154845154844,-1.4835164835164836,-1.4825174825174825,-1.4815184815184814,-1.4805194805194806,-1.4795204795204795,-1.4785214785214784,-1.4775224775224776,-1.4765234765234765,-1.4755244755244756,-1.4745254745254746,-1.4735264735264735,-1.4725274725274726,-1.4715284715284715,-1.4705294705294705,-1.4695304695304696,-1.4685314685314685,-1.4675324675324675,-1.4665334665334666,-1.4655344655344655,-1.4645354645354645,-1.4635364635364636,-1.4625374625374625,-1.4615384615384615,-1.4605394605394606,-1.4595404595404595,-1.4585414585414584,-1.4575424575424576,-1.4565434565434565,-1.4555444555444554,-1.4545454545454546,-1.4535464535464535,-1.4525474525474527,-1.4515484515484516,-1.4505494505494505,-1.4495504495504496,-1.4485514485514486,-1.4475524475524475,-1.4465534465534466,-1.4455544455544456,-1.4445554445554445,-1.4435564435564436,-1.4425574425574426,-1.4415584415584415,-1.4405594405594406,-1.4395604395604396,-1.4385614385614385,-1.4375624375624376,-1.4365634365634365,-1.4355644355644355,-1.4345654345654346,-1.4335664335664335,-1.4325674325674325,-1.4315684315684316,-1.4305694305694305,-1.4295704295704297,-1.4285714285714286,-1.4275724275724275,-1.4265734265734267,-1.4255744255744256,-1.4245754245754245,-1.4235764235764237,-1.4225774225774226,-1.4215784215784215,-1.4205794205794207,-1.4195804195804196,-1.4185814185814185,-1.4175824175824177,-1.4165834165834166,-1.4155844155844155,-1.4145854145854146,-1.4135864135864136,-1.4125874125874125,-1.4115884115884116,-1.4105894105894106,-1.4095904095904095,-1.4085914085914086,-1.4075924075924076,-1.4065934065934067,-1.4055944055944056,-1.4045954045954046,-1.4035964035964037,-1.4025974025974026,-1.4015984015984015,-1.4005994005994007,-1.3996003996003996,-1.3986013986013985,-1.3976023976023977,-1.3966033966033966,-1.3956043956043955,-1.3946053946053947,-1.3936063936063936,-1.3926073926073925,-1.3916083916083917,-1.3906093906093906,-1.3896103896103895,-1.3886113886113887,-1.3876123876123876,-1.3866133866133865,-1.3856143856143857,-1.3846153846153846,-1.3836163836163837,-1.3826173826173827,-1.3816183816183816,-1.3806193806193807,-1.3796203796203796,-1.3786213786213786,-1.3776223776223777,-1.3766233766233766,-1.3756243756243756,-1.3746253746253747,-1.3736263736263736,-1.3726273726273726,-1.3716283716283717,-1.3706293706293706,-1.3696303696303695,-1.3686313686313687,-1.3676323676323676,-1.3666333666333665,-1.3656343656343657,-1.3646353646353646,-1.3636363636363635,-1.3626373626373627,-1.3616383616383616,-1.3606393606393605,-1.3596403596403597,-1.3586413586413586,-1.3576423576423577,-1.3566433566433567,-1.3556443556443556,-1.3546453546453547,-1.3536463536463537,-1.3526473526473526,-1.3516483516483517,-1.3506493506493507,-1.3496503496503496,-1.3486513486513487,-1.3476523476523476,-1.3466533466533466,-1.3456543456543457,-1.3446553446553446,-1.3436563436563436,-1.3426573426573427,-1.3416583416583416,-1.3406593406593406,-1.3396603396603397,-1.3386613386613386,-1.3376623376623376,-1.3366633366633367,-1.3356643356643356,-1.3346653346653348,-1.3336663336663337,-1.3326673326673326,-1.3316683316683318,-1.3306693306693307,-1.3296703296703296,-1.3286713286713288,-1.3276723276723277,-1.3266733266733266,-1.3256743256743257,-1.3246753246753247,-1.3236763236763236,-1.3226773226773227,-1.3216783216783217,-1.3206793206793206,-1.3196803196803197,-1.3186813186813187,-1.3176823176823176,-1.3166833166833167,-1.3156843156843157,-1.3146853146853146,-1.3136863136863137,-1.3126873126873126,-1.3116883116883118,-1.3106893106893107,-1.3096903096903096,-1.3086913086913088,-1.3076923076923077,-1.3066933066933066,-1.3056943056943058,-1.3046953046953047,-1.3036963036963036,-1.3026973026973028,-1.3016983016983017,-1.3006993006993006,-1.2997002997002998,-1.2987012987012987,-1.2977022977022976,-1.2967032967032968,-1.2957042957042957,-1.2947052947052946,-1.2937062937062938,-1.2927072927072927,-1.2917082917082916,-1.2907092907092907,-1.2897102897102897,-1.2887112887112888,-1.2877122877122877,-1.2867132867132867,-1.2857142857142858,-1.2847152847152847,-1.2837162837162837,-1.2827172827172828,-1.2817182817182817,-1.2807192807192807,-1.2797202797202798,-1.2787212787212787,-1.2777222777222776,-1.2767232767232768,-1.2757242757242757,-1.2747252747252746,-1.2737262737262738,-1.2727272727272727,-1.2717282717282716,-1.2707292707292708,-1.2697302697302697,-1.2687312687312686,-1.2677322677322678,-1.2667332667332667,-1.2657342657342658,-1.2647352647352648,-1.2637362637362637,-1.2627372627372628,-1.2617382617382618,-1.2607392607392607,-1.2597402597402598,-1.2587412587412588,-1.2577422577422577,-1.2567432567432568,-1.2557442557442557,-1.2547452547452547,-1.2537462537462538,-1.2527472527472527,-1.2517482517482517,-1.2507492507492508,-1.2497502497502497,-1.2487512487512487,-1.2477522477522478,-1.2467532467532467,-1.2457542457542456,-1.2447552447552448,-1.2437562437562437,-1.2427572427572429,-1.2417582417582418,-1.2407592407592407,-1.2397602397602399,-1.2387612387612388,-1.2377622377622377,-1.2367632367632369,-1.2357642357642358,-1.2347652347652347,-1.2337662337662338,-1.2327672327672328,-1.2317682317682317,-1.2307692307692308,-1.2297702297702298,-1.2287712287712287,-1.2277722277722278,-1.2267732267732268,-1.2257742257742257,-1.2247752247752248,-1.2237762237762237,-1.2227772227772227,-1.2217782217782218,-1.2207792207792207,-1.2197802197802199,-1.2187812187812188,-1.2177822177822177,-1.2167832167832169,-1.2157842157842158,-1.2147852147852147,-1.2137862137862139,-1.2127872127872128,-1.2117882117882117,-1.2107892107892109,-1.2097902097902098,-1.2087912087912087,-1.2077922077922079,-1.2067932067932068,-1.2057942057942057,-1.2047952047952049,-1.2037962037962038,-1.2027972027972027,-1.2017982017982018,-1.2007992007992008,-1.1998001998001997,-1.1988011988011988,-1.1978021978021978,-1.196803196803197,-1.1958041958041958,-1.1948051948051948,-1.193806193806194,-1.1928071928071928,-1.1918081918081918,-1.190809190809191,-1.1898101898101898,-1.1888111888111887,-1.187812187812188,-1.1868131868131868,-1.1858141858141857,-1.1848151848151849,-1.1838161838161838,-1.1828171828171827,-1.1818181818181819,-1.1808191808191808,-1.1798201798201797,-1.1788211788211789,-1.1778221778221778,-1.1768231768231767,-1.1758241758241759,-1.1748251748251748,-1.173826173826174,-1.1728271728271729,-1.1718281718281718,-1.170829170829171,-1.1698301698301699,-1.1688311688311688,-1.167832167832168,-1.1668331668331668,-1.1658341658341658,-1.164835164835165,-1.1638361638361638,-1.1628371628371628,-1.161838161838162,-1.1608391608391608,-1.1598401598401598,-1.158841158841159,-1.1578421578421578,-1.1568431568431568,-1.155844155844156,-1.1548451548451548,-1.1538461538461537,-1.152847152847153,-1.1518481518481518,-1.150849150849151,-1.1498501498501499,-1.1488511488511488,-1.147852147852148,-1.1468531468531469,-1.1458541458541458,-1.144855144855145,-1.1438561438561439,-1.1428571428571428,-1.141858141858142,-1.1408591408591409,-1.1398601398601398,-1.138861138861139,-1.1378621378621379,-1.1368631368631368,-1.135864135864136,-1.1348651348651349,-1.1338661338661338,-1.132867132867133,-1.1318681318681318,-1.1308691308691308,-1.12987012987013,-1.1288711288711288,-1.127872127872128,-1.126873126873127,-1.1258741258741258,-1.124875124875125,-1.123876123876124,-1.1228771228771228,-1.121878121878122,-1.120879120879121,-1.1198801198801198,-1.118881118881119,-1.1178821178821179,-1.1168831168831168,-1.115884115884116,-1.1148851148851149,-1.1138861138861138,-1.112887112887113,-1.1118881118881119,-1.1108891108891108,-1.10989010989011,-1.1088911088911089,-1.1078921078921078,-1.106893106893107,-1.1058941058941059,-1.1048951048951048,-1.103896103896104,-1.1028971028971029,-1.101898101898102,-1.100899100899101,-1.0999000999000998,-1.098901098901099,-1.097902097902098,-1.0969030969030968,-1.095904095904096,-1.094905094905095,-1.0939060939060938,-1.092907092907093,-1.091908091908092,-1.0909090909090908,-1.08991008991009,-1.088911088911089,-1.0879120879120878,-1.086913086913087,-1.085914085914086,-1.0849150849150848,-1.083916083916084,-1.0829170829170829,-1.0819180819180818,-1.080919080919081,-1.0799200799200799,-1.078921078921079,-1.077922077922078,-1.0769230769230769,-1.075924075924076,-1.074925074925075,-1.0739260739260739,-1.072927072927073,-1.071928071928072,-1.0709290709290709,-1.06993006993007,-1.068931068931069,-1.0679320679320679,-1.066933066933067,-1.065934065934066,-1.0649350649350648,-1.063936063936064,-1.062937062937063,-1.0619380619380618,-1.060939060939061,-1.05994005994006,-1.0589410589410588,-1.057942057942058,-1.056943056943057,-1.055944055944056,-1.054945054945055,-1.053946053946054,-1.052947052947053,-1.051948051948052,-1.050949050949051,-1.04995004995005,-1.048951048951049,-1.0479520479520479,-1.046953046953047,-1.045954045954046,-1.0449550449550449,-1.043956043956044,-1.042957042957043,-1.0419580419580419,-1.040959040959041,-1.03996003996004,-1.0389610389610389,-1.037962037962038,-1.036963036963037,-1.0359640359640359,-1.034965034965035,-1.033966033966034,-1.032967032967033,-1.031968031968032,-1.030969030969031,-1.02997002997003,-1.028971028971029,-1.027972027972028,-1.026973026973027,-1.025974025974026,-1.024975024975025,-1.023976023976024,-1.022977022977023,-1.021978021978022,-1.020979020979021,-1.01998001998002,-1.018981018981019,-1.017982017982018,-1.016983016983017,-1.0159840159840159,-1.014985014985015,-1.013986013986014,-1.0129870129870129,-1.011988011988012,-1.010989010989011,-1.00999000999001,-1.008991008991009,-1.007992007992008,-1.006993006993007,-1.005994005994006,-1.004995004995005,-1.003996003996004,-1.002997002997003,-1.001998001998002,-1.000999000999001,-1.0,-0.999000999000999,-0.998001998001998,-0.997002997002997,-0.996003996003996,-0.995004995004995,-0.994005994005994,-0.993006993006993,-0.9920079920079921,-0.991008991008991,-0.99000999000999,-0.989010989010989,-0.988011988011988,-0.987012987012987,-0.986013986013986,-0.985014985014985,-0.984015984015984,-0.983016983016983,-0.9820179820179821,-0.981018981018981,-0.98001998001998,-0.9790209790209791,-0.978021978021978,-0.977022977022977,-0.9760239760239761,-0.975024975024975,-0.974025974025974,-0.973026973026973,-0.972027972027972,-0.971028971028971,-0.97002997002997,-0.9690309690309691,-0.968031968031968,-0.967032967032967,-0.9660339660339661,-0.965034965034965,-0.964035964035964,-0.9630369630369631,-0.962037962037962,-0.961038961038961,-0.9600399600399601,-0.9590409590409591,-0.958041958041958,-0.957042957042957,-0.9560439560439561,-0.955044955044955,-0.954045954045954,-0.9530469530469531,-0.952047952047952,-0.951048951048951,-0.9500499500499501,-0.949050949050949,-0.948051948051948,-0.9470529470529471,-0.9460539460539461,-0.945054945054945,-0.9440559440559441,-0.9430569430569431,-0.942057942057942,-0.9410589410589411,-0.9400599400599401,-0.939060939060939,-0.938061938061938,-0.9370629370629371,-0.936063936063936,-0.935064935064935,-0.9340659340659341,-0.9330669330669331,-0.932067932067932,-0.9310689310689311,-0.9300699300699301,-0.929070929070929,-0.9280719280719281,-0.9270729270729271,-0.926073926073926,-0.9250749250749251,-0.9240759240759241,-0.9230769230769231,-0.922077922077922,-0.9210789210789211,-0.9200799200799201,-0.919080919080919,-0.9180819180819181,-0.9170829170829171,-0.916083916083916,-0.9150849150849151,-0.9140859140859141,-0.913086913086913,-0.9120879120879121,-0.9110889110889111,-0.9100899100899101,-0.9090909090909091,-0.9080919080919081,-0.9070929070929071,-0.906093906093906,-0.9050949050949051,-0.9040959040959041,-0.903096903096903,-0.9020979020979021,-0.9010989010989011,-0.9000999000999002,-0.8991008991008991,-0.8981018981018981,-0.8971028971028971,-0.8961038961038961,-0.8951048951048951,-0.8941058941058941,-0.8931068931068931,-0.8921078921078921,-0.8911088911088911,-0.8901098901098901,-0.8891108891108891,-0.8881118881118881,-0.8871128871128872,-0.8861138861138861,-0.8851148851148851,-0.8841158841158842,-0.8831168831168831,-0.8821178821178821,-0.8811188811188811,-0.8801198801198801,-0.8791208791208791,-0.8781218781218781,-0.8771228771228772,-0.8761238761238761,-0.8751248751248751,-0.8741258741258742,-0.8731268731268731,-0.8721278721278721,-0.8711288711288712,-0.8701298701298701,-0.8691308691308691,-0.8681318681318682,-0.8671328671328671,-0.8661338661338661,-0.8651348651348651,-0.8641358641358642,-0.8631368631368631,-0.8621378621378621,-0.8611388611388612,-0.8601398601398601,-0.8591408591408591,-0.8581418581418582,-0.8571428571428571,-0.8561438561438561,-0.8551448551448552,-0.8541458541458542,-0.8531468531468531,-0.8521478521478522,-0.8511488511488512,-0.8501498501498501,-0.8491508491508492,-0.8481518481518482,-0.8471528471528471,-0.8461538461538461,-0.8451548451548452,-0.8441558441558441,-0.8431568431568431,-0.8421578421578422,-0.8411588411588412,-0.8401598401598401,-0.8391608391608392,-0.8381618381618382,-0.8371628371628371,-0.8361638361638362,-0.8351648351648352,-0.8341658341658341,-0.8331668331668332,-0.8321678321678322,-0.8311688311688312,-0.8301698301698301,-0.8291708291708292,-0.8281718281718282,-0.8271728271728271,-0.8261738261738262,-0.8251748251748252,-0.8241758241758241,-0.8231768231768232,-0.8221778221778222,-0.8211788211788211,-0.8201798201798202,-0.8191808191808192,-0.8181818181818182,-0.8171828171828172,-0.8161838161838162,-0.8151848151848152,-0.8141858141858141,-0.8131868131868132,-0.8121878121878122,-0.8111888111888111,-0.8101898101898102,-0.8091908091908092,-0.8081918081918081,-0.8071928071928072,-0.8061938061938062,-0.8051948051948052,-0.8041958041958042,-0.8031968031968032,-0.8021978021978022,-0.8011988011988012,-0.8001998001998002,-0.7992007992007992,-0.7982017982017982,-0.7972027972027972,-0.7962037962037962,-0.7952047952047953,-0.7942057942057942,-0.7932067932067932,-0.7922077922077922,-0.7912087912087912,-0.7902097902097902,-0.7892107892107892,-0.7882117882117882,-0.7872127872127872,-0.7862137862137862,-0.7852147852147852,-0.7842157842157842,-0.7832167832167832,-0.7822177822177823,-0.7812187812187812,-0.7802197802197802,-0.7792207792207793,-0.7782217782217782,-0.7772227772227772,-0.7762237762237763,-0.7752247752247752,-0.7742257742257742,-0.7732267732267732,-0.7722277722277723,-0.7712287712287712,-0.7702297702297702,-0.7692307692307693,-0.7682317682317682,-0.7672327672327672,-0.7662337662337663,-0.7652347652347652,-0.7642357642357642,-0.7632367632367633,-0.7622377622377622,-0.7612387612387612,-0.7602397602397603,-0.7592407592407593,-0.7582417582417582,-0.7572427572427572,-0.7562437562437563,-0.7552447552447552,-0.7542457542457542,-0.7532467532467533,-0.7522477522477522,-0.7512487512487512,-0.7502497502497503,-0.7492507492507493,-0.7482517482517482,-0.7472527472527473,-0.7462537462537463,-0.7452547452547452,-0.7442557442557443,-0.7432567432567433,-0.7422577422577422,-0.7412587412587412,-0.7402597402597403,-0.7392607392607392,-0.7382617382617382,-0.7372627372627373,-0.7362637362637363,-0.7352647352647352,-0.7342657342657343,-0.7332667332667333,-0.7322677322677322,-0.7312687312687313,-0.7302697302697303,-0.7292707292707292,-0.7282717282717283,-0.7272727272727273,-0.7262737262737263,-0.7252747252747253,-0.7242757242757243,-0.7232767232767233,-0.7222777222777222,-0.7212787212787213,-0.7202797202797203,-0.7192807192807192,-0.7182817182817183,-0.7172827172827173,-0.7162837162837162,-0.7152847152847153,-0.7142857142857143,-0.7132867132867133,-0.7122877122877123,-0.7112887112887113,-0.7102897102897103,-0.7092907092907093,-0.7082917082917083,-0.7072927072927073,-0.7062937062937062,-0.7052947052947053,-0.7042957042957043,-0.7032967032967034,-0.7022977022977023,-0.7012987012987013,-0.7002997002997003,-0.6993006993006993,-0.6983016983016983,-0.6973026973026973,-0.6963036963036963,-0.6953046953046953,-0.6943056943056943,-0.6933066933066933,-0.6923076923076923,-0.6913086913086913,-0.6903096903096904,-0.6893106893106893,-0.6883116883116883,-0.6873126873126874,-0.6863136863136863,-0.6853146853146853,-0.6843156843156843,-0.6833166833166833,-0.6823176823176823,-0.6813186813186813,-0.6803196803196803,-0.6793206793206793,-0.6783216783216783,-0.6773226773226774,-0.6763236763236763,-0.6753246753246753,-0.6743256743256744,-0.6733266733266733,-0.6723276723276723,-0.6713286713286714,-0.6703296703296703,-0.6693306693306693,-0.6683316683316683,-0.6673326673326674,-0.6663336663336663,-0.6653346653346653,-0.6643356643356644,-0.6633366633366633,-0.6623376623376623,-0.6613386613386614,-0.6603396603396603,-0.6593406593406593,-0.6583416583416584,-0.6573426573426573,-0.6563436563436563,-0.6553446553446554,-0.6543456543456544,-0.6533466533466533,-0.6523476523476524,-0.6513486513486514,-0.6503496503496503,-0.6493506493506493,-0.6483516483516484,-0.6473526473526473,-0.6463536463536463,-0.6453546453546454,-0.6443556443556444,-0.6433566433566433,-0.6423576423576424,-0.6413586413586414,-0.6403596403596403,-0.6393606393606394,-0.6383616383616384,-0.6373626373626373,-0.6363636363636364,-0.6353646353646354,-0.6343656343656343,-0.6333666333666333,-0.6323676323676324,-0.6313686313686314,-0.6303696303696303,-0.6293706293706294,-0.6283716283716284,-0.6273726273726273,-0.6263736263736264,-0.6253746253746254,-0.6243756243756243,-0.6233766233766234,-0.6223776223776224,-0.6213786213786214,-0.6203796203796204,-0.6193806193806194,-0.6183816183816184,-0.6173826173826173,-0.6163836163836164,-0.6153846153846154,-0.6143856143856143,-0.6133866133866134,-0.6123876123876124,-0.6113886113886113,-0.6103896103896104,-0.6093906093906094,-0.6083916083916084,-0.6073926073926074,-0.6063936063936064,-0.6053946053946054,-0.6043956043956044,-0.6033966033966034,-0.6023976023976024,-0.6013986013986014,-0.6003996003996004,-0.5994005994005994,-0.5984015984015985,-0.5974025974025974,-0.5964035964035964,-0.5954045954045954,-0.5944055944055944,-0.5934065934065934,-0.5924075924075924,-0.5914085914085914,-0.5904095904095904,-0.5894105894105894,-0.5884115884115884,-0.5874125874125874,-0.5864135864135864,-0.5854145854145855,-0.5844155844155844,-0.5834165834165834,-0.5824175824175825,-0.5814185814185814,-0.5804195804195804,-0.5794205794205795,-0.5784215784215784,-0.5774225774225774,-0.5764235764235764,-0.5754245754245755,-0.5744255744255744,-0.5734265734265734,-0.5724275724275725,-0.5714285714285714,-0.5704295704295704,-0.5694305694305695,-0.5684315684315684,-0.5674325674325674,-0.5664335664335665,-0.5654345654345654,-0.5644355644355644,-0.5634365634365635,-0.5624375624375625,-0.5614385614385614,-0.5604395604395604,-0.5594405594405595,-0.5584415584415584,-0.5574425574425574,-0.5564435564435565,-0.5554445554445554,-0.5544455544455544,-0.5534465534465535,-0.5524475524475524,-0.5514485514485514,-0.5504495504495505,-0.5494505494505495,-0.5484515484515484,-0.5474525474525475,-0.5464535464535465,-0.5454545454545454,-0.5444555444555444,-0.5434565434565435,-0.5424575424575424,-0.5414585414585414,-0.5404595404595405,-0.5394605394605395,-0.5384615384615384,-0.5374625374625375,-0.5364635364635365,-0.5354645354645354,-0.5344655344655345,-0.5334665334665335,-0.5324675324675324,-0.5314685314685315,-0.5304695304695305,-0.5294705294705294,-0.5284715284715285,-0.5274725274725275,-0.5264735264735265,-0.5254745254745254,-0.5244755244755245,-0.5234765234765235,-0.5224775224775224,-0.5214785214785215,-0.5204795204795205,-0.5194805194805194,-0.5184815184815185,-0.5174825174825175,-0.5164835164835165,-0.5154845154845155,-0.5144855144855145,-0.5134865134865135,-0.5124875124875125,-0.5114885114885115,-0.5104895104895105,-0.5094905094905094,-0.5084915084915085,-0.5074925074925075,-0.5064935064935064,-0.5054945054945055,-0.5044955044955045,-0.5034965034965035,-0.5024975024975025,-0.5014985014985015,-0.5004995004995005,-0.4995004995004995,-0.4985014985014985,-0.4975024975024975,-0.4965034965034965,-0.4955044955044955,-0.4945054945054945,-0.4935064935064935,-0.4925074925074925,-0.4915084915084915,-0.4905094905094905,-0.48951048951048953,-0.4885114885114885,-0.4875124875124875,-0.4865134865134865,-0.4855144855144855,-0.48451548451548454,-0.4835164835164835,-0.4825174825174825,-0.48151848151848153,-0.4805194805194805,-0.47952047952047955,-0.4785214785214785,-0.4775224775224775,-0.47652347652347654,-0.4755244755244755,-0.4745254745254745,-0.47352647352647353,-0.4725274725274725,-0.47152847152847155,-0.47052947052947053,-0.4695304695304695,-0.46853146853146854,-0.4675324675324675,-0.46653346653346656,-0.46553446553446554,-0.4645354645354645,-0.46353646353646355,-0.46253746253746253,-0.46153846153846156,-0.46053946053946054,-0.4595404595404595,-0.45854145854145856,-0.45754245754245754,-0.4565434565434565,-0.45554445554445555,-0.45454545454545453,-0.45354645354645357,-0.45254745254745254,-0.4515484515484515,-0.45054945054945056,-0.44955044955044954,-0.4485514485514486,-0.44755244755244755,-0.44655344655344653,-0.44555444555444557,-0.44455544455544455,-0.4435564435564436,-0.44255744255744256,-0.44155844155844154,-0.4405594405594406,-0.43956043956043955,-0.4385614385614386,-0.43756243756243757,-0.43656343656343655,-0.4355644355644356,-0.43456543456543456,-0.43356643356643354,-0.4325674325674326,-0.43156843156843155,-0.4305694305694306,-0.42957042957042957,-0.42857142857142855,-0.4275724275724276,-0.42657342657342656,-0.4255744255744256,-0.4245754245754246,-0.42357642357642356,-0.4225774225774226,-0.42157842157842157,-0.4205794205794206,-0.4195804195804196,-0.41858141858141856,-0.4175824175824176,-0.4165834165834166,-0.4155844155844156,-0.4145854145854146,-0.41358641358641357,-0.4125874125874126,-0.4115884115884116,-0.41058941058941056,-0.4095904095904096,-0.4085914085914086,-0.4075924075924076,-0.4065934065934066,-0.40559440559440557,-0.4045954045954046,-0.4035964035964036,-0.4025974025974026,-0.4015984015984016,-0.4005994005994006,-0.3996003996003996,-0.3986013986013986,-0.39760239760239763,-0.3966033966033966,-0.3956043956043956,-0.3946053946053946,-0.3936063936063936,-0.3926073926073926,-0.3916083916083916,-0.3906093906093906,-0.38961038961038963,-0.3886113886113886,-0.3876123876123876,-0.3866133866133866,-0.3856143856143856,-0.38461538461538464,-0.3836163836163836,-0.3826173826173826,-0.38161838161838163,-0.3806193806193806,-0.37962037962037964,-0.3786213786213786,-0.3776223776223776,-0.37662337662337664,-0.3756243756243756,-0.37462537462537465,-0.37362637362637363,-0.3726273726273726,-0.37162837162837165,-0.3706293706293706,-0.3696303696303696,-0.36863136863136864,-0.3676323676323676,-0.36663336663336665,-0.36563436563436563,-0.3646353646353646,-0.36363636363636365,-0.3626373626373626,-0.36163836163836166,-0.36063936063936064,-0.3596403596403596,-0.35864135864135865,-0.35764235764235763,-0.35664335664335667,-0.35564435564435565,-0.3546453546453546,-0.35364635364635366,-0.35264735264735264,-0.3516483516483517,-0.35064935064935066,-0.34965034965034963,-0.34865134865134867,-0.34765234765234765,-0.34665334665334663,-0.34565434565434566,-0.34465534465534464,-0.3436563436563437,-0.34265734265734266,-0.34165834165834164,-0.34065934065934067,-0.33966033966033965,-0.3386613386613387,-0.33766233766233766,-0.33666333666333664,-0.3356643356643357,-0.33466533466533466,-0.3336663336663337,-0.33266733266733267,-0.33166833166833165,-0.3306693306693307,-0.32967032967032966,-0.32867132867132864,-0.3276723276723277,-0.32667332667332666,-0.3256743256743257,-0.3246753246753247,-0.32367632367632365,-0.3226773226773227,-0.32167832167832167,-0.3206793206793207,-0.3196803196803197,-0.31868131868131866,-0.3176823176823177,-0.3166833166833167,-0.3156843156843157,-0.3146853146853147,-0.31368631368631367,-0.3126873126873127,-0.3116883116883117,-0.3106893106893107,-0.3096903096903097,-0.3086913086913087,-0.3076923076923077,-0.3066933066933067,-0.30569430569430567,-0.3046953046953047,-0.3036963036963037,-0.3026973026973027,-0.3016983016983017,-0.3006993006993007,-0.2997002997002997,-0.2987012987012987,-0.2977022977022977,-0.2967032967032967,-0.2957042957042957,-0.2947052947052947,-0.2937062937062937,-0.29270729270729273,-0.2917082917082917,-0.2907092907092907,-0.2897102897102897,-0.2887112887112887,-0.28771228771228774,-0.2867132867132867,-0.2857142857142857,-0.28471528471528473,-0.2837162837162837,-0.2827172827172827,-0.2817182817182817,-0.2807192807192807,-0.27972027972027974,-0.2787212787212787,-0.2777222777222777,-0.27672327672327673,-0.2757242757242757,-0.27472527472527475,-0.27372627372627373,-0.2727272727272727,-0.27172827172827174,-0.2707292707292707,-0.26973026973026976,-0.26873126873126874,-0.2677322677322677,-0.26673326673326675,-0.26573426573426573,-0.2647352647352647,-0.26373626373626374,-0.2627372627372627,-0.26173826173826176,-0.26073926073926074,-0.2597402597402597,-0.25874125874125875,-0.25774225774225773,-0.25674325674325676,-0.25574425574425574,-0.2547452547452547,-0.25374625374625376,-0.25274725274725274,-0.2517482517482518,-0.25074925074925075,-0.24975024975024976,-0.24875124875124874,-0.24775224775224775,-0.24675324675324675,-0.24575424575424576,-0.24475524475524477,-0.24375624375624375,-0.24275724275724275,-0.24175824175824176,-0.24075924075924077,-0.23976023976023977,-0.23876123876123875,-0.23776223776223776,-0.23676323676323677,-0.23576423576423577,-0.23476523476523475,-0.23376623376623376,-0.23276723276723277,-0.23176823176823177,-0.23076923076923078,-0.22977022977022976,-0.22877122877122877,-0.22777222777222778,-0.22677322677322678,-0.22577422577422576,-0.22477522477522477,-0.22377622377622378,-0.22277722277722278,-0.2217782217782218,-0.22077922077922077,-0.21978021978021978,-0.21878121878121878,-0.2177822177822178,-0.21678321678321677,-0.21578421578421578,-0.21478521478521478,-0.2137862137862138,-0.2127872127872128,-0.21178821178821178,-0.21078921078921078,-0.2097902097902098,-0.2087912087912088,-0.2077922077922078,-0.20679320679320679,-0.2057942057942058,-0.2047952047952048,-0.2037962037962038,-0.20279720279720279,-0.2017982017982018,-0.2007992007992008,-0.1998001998001998,-0.19880119880119881,-0.1978021978021978,-0.1968031968031968,-0.1958041958041958,-0.19480519480519481,-0.1938061938061938,-0.1928071928071928,-0.1918081918081918,-0.19080919080919082,-0.18981018981018982,-0.1888111888111888,-0.1878121878121878,-0.18681318681318682,-0.18581418581418582,-0.1848151848151848,-0.1838161838161838,-0.18281718281718282,-0.18181818181818182,-0.18081918081918083,-0.1798201798201798,-0.17882117882117882,-0.17782217782217782,-0.17682317682317683,-0.17582417582417584,-0.17482517482517482,-0.17382617382617382,-0.17282717282717283,-0.17182817182817184,-0.17082917082917082,-0.16983016983016982,-0.16883116883116883,-0.16783216783216784,-0.16683316683316685,-0.16583416583416583,-0.16483516483516483,-0.16383616383616384,-0.16283716283716285,-0.16183816183816183,-0.16083916083916083,-0.15984015984015984,-0.15884115884115885,-0.15784215784215785,-0.15684315684315683,-0.15584415584415584,-0.15484515484515485,-0.15384615384615385,-0.15284715284715283,-0.15184815184815184,-0.15084915084915085,-0.14985014985014986,-0.14885114885114886,-0.14785214785214784,-0.14685314685314685,-0.14585414585414586,-0.14485514485514486,-0.14385614385614387,-0.14285714285714285,-0.14185814185814186,-0.14085914085914086,-0.13986013986013987,-0.13886113886113885,-0.13786213786213786,-0.13686313686313686,-0.13586413586413587,-0.13486513486513488,-0.13386613386613386,-0.13286713286713286,-0.13186813186813187,-0.13086913086913088,-0.12987012987012986,-0.12887112887112886,-0.12787212787212787,-0.12687312687312688,-0.1258741258741259,-0.12487512487512488,-0.12387612387612387,-0.12287712287712288,-0.12187812187812187,-0.12087912087912088,-0.11988011988011989,-0.11888111888111888,-0.11788211788211789,-0.11688311688311688,-0.11588411588411589,-0.11488511488511488,-0.11388611388611389,-0.11288711288711288,-0.11188811188811189,-0.1108891108891109,-0.10989010989010989,-0.1088911088911089,-0.10789210789210789,-0.1068931068931069,-0.10589410589410589,-0.1048951048951049,-0.1038961038961039,-0.1028971028971029,-0.1018981018981019,-0.1008991008991009,-0.0999000999000999,-0.0989010989010989,-0.0979020979020979,-0.0969030969030969,-0.0959040959040959,-0.09490509490509491,-0.0939060939060939,-0.09290709290709291,-0.0919080919080919,-0.09090909090909091,-0.0899100899100899,-0.08891108891108891,-0.08791208791208792,-0.08691308691308691,-0.08591408591408592,-0.08491508491508491,-0.08391608391608392,-0.08291708291708291,-0.08191808191808192,-0.08091908091908091,-0.07992007992007992,-0.07892107892107893,-0.07792207792207792,-0.07692307692307693,-0.07592407592407592,-0.07492507492507493,-0.07392607392607392,-0.07292707292707293,-0.07192807192807193,-0.07092907092907093,-0.06993006993006994,-0.06893106893106893,-0.06793206793206794,-0.06693306693306693,-0.06593406593406594,-0.06493506493506493,-0.06393606393606394,-0.06293706293706294,-0.061938061938061936,-0.060939060939060936,-0.059940059940059943,-0.058941058941058944,-0.057942057942057944,-0.056943056943056944,-0.055944055944055944,-0.054945054945054944,-0.053946053946053944,-0.052947052947052944,-0.05194805194805195,-0.05094905094905095,-0.04995004995004995,-0.04895104895104895,-0.04795204795204795,-0.04695304695304695,-0.04595404595404595,-0.04495504495504495,-0.04395604395604396,-0.04295704295704296,-0.04195804195804196,-0.04095904095904096,-0.03996003996003996,-0.03896103896103896,-0.03796203796203796,-0.03696303696303696,-0.03596403596403597,-0.03496503496503497,-0.03396603396603397,-0.03296703296703297,-0.03196803196803197,-0.030969030969030968,-0.029970029970029972,-0.028971028971028972,-0.027972027972027972,-0.026973026973026972,-0.025974025974025976,-0.024975024975024976,-0.023976023976023976,-0.022977022977022976,-0.02197802197802198,-0.02097902097902098,-0.01998001998001998,-0.01898101898101898,-0.017982017982017984,-0.016983016983016984,-0.015984015984015984,-0.014985014985014986,-0.013986013986013986,-0.012987012987012988,-0.011988011988011988,-0.01098901098901099,-0.00999000999000999,-0.008991008991008992,-0.007992007992007992,-0.006993006993006993,-0.005994005994005994,-0.004995004995004995,-0.003996003996003996,-0.002997002997002997,-0.001998001998001998,-0.000999000999000999,0.0]}
},{}],55:[function(require,module,exports){
module.exports={"expected":[1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966],"x":[-1.0e-200,-9.995004995054944e-201,-9.99000999010989e-201,-9.985014985164835e-201,-9.980019980219779e-201,-9.975024975274725e-201,-9.97002997032967e-201,-9.965034965384615e-201,-9.96003996043956e-201,-9.955044955494505e-201,-9.950049950549451e-201,-9.945054945604396e-201,-9.940059940659339e-201,-9.935064935714285e-201,-9.93006993076923e-201,-9.925074925824176e-201,-9.920079920879122e-201,-9.915084915934067e-201,-9.910089910989011e-201,-9.905094906043957e-201,-9.9000999010989e-201,-9.895104896153845e-201,-9.890109891208791e-201,-9.885114886263736e-201,-9.880119881318681e-201,-9.875124876373627e-201,-9.870129871428572e-201,-9.865134866483516e-201,-9.860139861538461e-201,-9.855144856593406e-201,-9.850149851648352e-201,-9.845154846703296e-201,-9.840159841758241e-201,-9.835164836813187e-201,-9.830169831868132e-201,-9.825174826923075e-201,-9.820179821978021e-201,-9.815184817032966e-201,-9.81018981208791e-201,-9.805194807142857e-201,-9.800199802197803e-201,-9.795204797252748e-201,-9.790209792307694e-201,-9.785214787362637e-201,-9.780219782417582e-201,-9.775224777472528e-201,-9.770229772527472e-201,-9.765234767582419e-201,-9.760239762637363e-201,-9.755244757692308e-201,-9.750249752747253e-201,-9.745254747802197e-201,-9.740259742857142e-201,-9.735264737912088e-201,-9.730269732967033e-201,-9.725274728021977e-201,-9.720279723076924e-201,-9.715284718131868e-201,-9.710289713186811e-201,-9.705294708241758e-201,-9.700299703296702e-201,-9.695304698351647e-201,-9.690309693406593e-201,-9.685314688461538e-201,-9.680319683516484e-201,-9.67532467857143e-201,-9.670329673626373e-201,-9.665334668681318e-201,-9.660339663736264e-201,-9.655344658791209e-201,-9.650349653846155e-201,-9.6453546489011e-201,-9.640359643956044e-201,-9.635364639010989e-201,-9.630369634065934e-201,-9.625374629120878e-201,-9.620379624175824e-201,-9.615384619230769e-201,-9.610389614285714e-201,-9.60539460934066e-201,-9.600399604395605e-201,-9.595404599450548e-201,-9.590409594505494e-201,-9.585414589560439e-201,-9.580419584615383e-201,-9.57542457967033e-201,-9.570429574725274e-201,-9.565434569780219e-201,-9.560439564835165e-201,-9.55544455989011e-201,-9.550449554945054e-201,-9.54545455e-201,-9.540459545054945e-201,-9.535464540109891e-201,-9.530469535164836e-201,-9.52547453021978e-201,-9.520479525274725e-201,-9.51548452032967e-201,-9.510489515384615e-201,-9.505494510439561e-201,-9.500499505494505e-201,-9.49550450054945e-201,-9.490509495604396e-201,-9.485514490659341e-201,-9.480519485714284e-201,-9.47552448076923e-201,-9.470529475824175e-201,-9.46553447087912e-201,-9.460539465934066e-201,-9.45554446098901e-201,-9.450549456043955e-201,-9.445554451098901e-201,-9.440559446153844e-201,-9.435564441208792e-201,-9.430569436263737e-201,-9.425574431318681e-201,-9.420579426373628e-201,-9.415584421428572e-201,-9.410589416483517e-201,-9.405594411538463e-201,-9.400599406593406e-201,-9.395604401648351e-201,-9.390609396703297e-201,-9.385614391758242e-201,-9.380619386813186e-201,-9.375624381868133e-201,-9.370629376923077e-201,-9.36563437197802e-201,-9.360639367032967e-201,-9.355644362087911e-201,-9.350649357142856e-201,-9.345654352197802e-201,-9.340659347252747e-201,-9.335664342307691e-201,-9.330669337362638e-201,-9.325674332417581e-201,-9.320679327472527e-201,-9.315684322527473e-201,-9.310689317582418e-201,-9.305694312637364e-201,-9.300699307692309e-201,-9.295704302747253e-201,-9.2907092978022e-201,-9.285714292857143e-201,-9.280719287912087e-201,-9.275724282967033e-201,-9.270729278021978e-201,-9.265734273076923e-201,-9.260739268131869e-201,-9.255744263186814e-201,-9.250749258241757e-201,-9.245754253296703e-201,-9.240759248351648e-201,-9.235764243406592e-201,-9.230769238461538e-201,-9.225774233516483e-201,-9.220779228571428e-201,-9.215784223626374e-201,-9.210789218681317e-201,-9.205794213736263e-201,-9.200799208791208e-201,-9.195804203846153e-201,-9.1908091989011e-201,-9.185814193956045e-201,-9.18081918901099e-201,-9.175824184065936e-201,-9.170829179120879e-201,-9.165834174175824e-201,-9.16083916923077e-201,-9.155844164285714e-201,-9.150849159340659e-201,-9.145854154395605e-201,-9.14085914945055e-201,-9.135864144505493e-201,-9.130869139560439e-201,-9.125874134615384e-201,-9.120879129670329e-201,-9.115884124725275e-201,-9.11088911978022e-201,-9.105894114835165e-201,-9.10089910989011e-201,-9.095904104945053e-201,-9.0909091e-201,-9.085914095054944e-201,-9.080919090109889e-201,-9.075924085164835e-201,-9.070929080219781e-201,-9.065934075274726e-201,-9.060939070329672e-201,-9.055944065384615e-201,-9.05094906043956e-201,-9.045954055494506e-201,-9.04095905054945e-201,-9.035964045604395e-201,-9.030969040659341e-201,-9.025974035714286e-201,-9.02097903076923e-201,-9.015984025824176e-201,-9.01098902087912e-201,-9.005994015934065e-201,-9.000999010989011e-201,-8.996004006043956e-201,-8.991009001098902e-201,-8.986013996153846e-201,-8.98101899120879e-201,-8.976023986263736e-201,-8.97102898131868e-201,-8.966033976373625e-201,-8.961038971428571e-201,-8.956043966483516e-201,-8.95104896153846e-201,-8.946053956593408e-201,-8.941058951648352e-201,-8.936063946703296e-201,-8.931068941758242e-201,-8.926073936813187e-201,-8.921078931868132e-201,-8.916083926923078e-201,-8.911088921978022e-201,-8.906093917032966e-201,-8.901098912087912e-201,-8.896103907142857e-201,-8.891108902197803e-201,-8.886113897252747e-201,-8.881118892307692e-201,-8.876123887362638e-201,-8.871128882417583e-201,-8.866133877472526e-201,-8.861138872527472e-201,-8.856143867582417e-201,-8.851148862637362e-201,-8.846153857692308e-201,-8.841158852747252e-201,-8.836163847802197e-201,-8.831168842857143e-201,-8.826173837912088e-201,-8.821178832967032e-201,-8.816183828021979e-201,-8.811188823076923e-201,-8.806193818131868e-201,-8.801198813186814e-201,-8.796203808241759e-201,-8.791208803296702e-201,-8.786213798351648e-201,-8.781218793406593e-201,-8.776223788461539e-201,-8.771228783516484e-201,-8.766233778571428e-201,-8.761238773626374e-201,-8.756243768681319e-201,-8.751248763736262e-201,-8.746253758791208e-201,-8.741258753846153e-201,-8.736263748901098e-201,-8.731268743956044e-201,-8.726273739010989e-201,-8.721278734065933e-201,-8.71628372912088e-201,-8.711288724175823e-201,-8.706293719230769e-201,-8.701298714285715e-201,-8.69630370934066e-201,-8.691308704395604e-201,-8.68631369945055e-201,-8.681318694505495e-201,-8.676323689560438e-201,-8.671328684615384e-201,-8.666333679670329e-201,-8.661338674725275e-201,-8.65634366978022e-201,-8.651348664835165e-201,-8.646353659890111e-201,-8.641358654945055e-201,-8.636363649999999e-201,-8.631368645054945e-201,-8.62637364010989e-201,-8.621378635164834e-201,-8.61638363021978e-201,-8.611388625274725e-201,-8.60639362032967e-201,-8.601398615384616e-201,-8.596403610439559e-201,-8.591408605494504e-201,-8.58641360054945e-201,-8.581418595604396e-201,-8.57642359065934e-201,-8.571428585714287e-201,-8.566433580769231e-201,-8.561438575824176e-201,-8.556443570879121e-201,-8.551448565934065e-201,-8.546453560989012e-201,-8.541458556043956e-201,-8.536463551098901e-201,-8.531468546153847e-201,-8.526473541208792e-201,-8.521478536263735e-201,-8.516483531318681e-201,-8.511488526373626e-201,-8.50649352142857e-201,-8.501498516483517e-201,-8.496503511538461e-201,-8.491508506593406e-201,-8.486513501648352e-201,-8.481518496703295e-201,-8.47652349175824e-201,-8.471528486813186e-201,-8.466533481868131e-201,-8.461538476923077e-201,-8.456543471978023e-201,-8.451548467032968e-201,-8.446553462087912e-201,-8.441558457142857e-201,-8.436563452197802e-201,-8.431568447252748e-201,-8.426573442307693e-201,-8.421578437362637e-201,-8.416583432417583e-201,-8.411588427472528e-201,-8.406593422527471e-201,-8.401598417582417e-201,-8.396603412637362e-201,-8.391608407692307e-201,-8.386613402747253e-201,-8.381618397802198e-201,-8.376623392857142e-201,-8.371628387912088e-201,-8.366633382967032e-201,-8.361638378021976e-201,-8.356643373076922e-201,-8.351648368131867e-201,-8.346653363186812e-201,-8.34165835824176e-201,-8.336663353296704e-201,-8.33166834835165e-201,-8.326673343406593e-201,-8.321678338461538e-201,-8.316683333516484e-201,-8.311688328571429e-201,-8.306693323626374e-201,-8.30169831868132e-201,-8.296703313736264e-201,-8.291708308791208e-201,-8.286713303846154e-201,-8.281718298901098e-201,-8.276723293956043e-201,-8.271728289010989e-201,-8.266733284065934e-201,-8.261738279120879e-201,-8.256743274175825e-201,-8.251748269230768e-201,-8.246753264285713e-201,-8.241758259340659e-201,-8.236763254395603e-201,-8.23176824945055e-201,-8.226773244505494e-201,-8.221778239560439e-201,-8.216783234615386e-201,-8.21178822967033e-201,-8.206793224725274e-201,-8.20179821978022e-201,-8.196803214835165e-201,-8.19180820989011e-201,-8.186813204945056e-201,-8.1818182e-201,-8.176823195054944e-201,-8.17182819010989e-201,-8.166833185164835e-201,-8.16183818021978e-201,-8.156843175274726e-201,-8.15184817032967e-201,-8.146853165384615e-201,-8.141858160439561e-201,-8.136863155494504e-201,-8.131868150549449e-201,-8.126873145604395e-201,-8.12187814065934e-201,-8.116883135714286e-201,-8.11188813076923e-201,-8.106893125824175e-201,-8.101898120879121e-201,-8.096903115934066e-201,-8.09190811098901e-201,-8.086913106043957e-201,-8.081918101098902e-201,-8.076923096153846e-201,-8.071928091208792e-201,-8.066933086263737e-201,-8.06193808131868e-201,-8.056943076373626e-201,-8.051948071428571e-201,-8.046953066483516e-201,-8.041958061538462e-201,-8.036963056593407e-201,-8.031968051648351e-201,-8.026973046703297e-201,-8.02197804175824e-201,-8.016983036813185e-201,-8.011988031868131e-201,-8.006993026923076e-201,-8.001998021978022e-201,-7.997003017032967e-201,-7.992008012087912e-201,-7.987013007142858e-201,-7.982018002197801e-201,-7.977022997252746e-201,-7.972027992307693e-201,-7.967032987362638e-201,-7.962037982417583e-201,-7.957042977472529e-201,-7.952047972527473e-201,-7.947052967582417e-201,-7.942057962637363e-201,-7.937062957692307e-201,-7.932067952747252e-201,-7.927072947802198e-201,-7.922077942857143e-201,-7.917082937912088e-201,-7.912087932967034e-201,-7.907092928021977e-201,-7.902097923076923e-201,-7.897102918131868e-201,-7.892107913186812e-201,-7.887112908241759e-201,-7.882117903296703e-201,-7.877122898351648e-201,-7.872127893406594e-201,-7.867132888461537e-201,-7.862137883516482e-201,-7.857142878571428e-201,-7.852147873626374e-201,-7.847152868681319e-201,-7.842157863736265e-201,-7.83716285879121e-201,-7.832167853846153e-201,-7.827172848901099e-201,-7.822177843956044e-201,-7.817182839010988e-201,-7.812187834065934e-201,-7.807192829120879e-201,-7.802197824175825e-201,-7.79720281923077e-201,-7.792207814285713e-201,-7.78721280934066e-201,-7.782217804395604e-201,-7.777222799450549e-201,-7.772227794505495e-201,-7.76723278956044e-201,-7.762237784615384e-201,-7.75724277967033e-201,-7.752247774725274e-201,-7.747252769780218e-201,-7.742257764835164e-201,-7.737262759890109e-201,-7.732267754945055e-201,-7.727272750000001e-201,-7.722277745054946e-201,-7.717282740109889e-201,-7.712287735164835e-201,-7.70729273021978e-201,-7.702297725274725e-201,-7.697302720329671e-201,-7.692307715384615e-201,-7.687312710439562e-201,-7.682317705494506e-201,-7.67732270054945e-201,-7.672327695604396e-201,-7.66733269065934e-201,-7.662337685714285e-201,-7.657342680769231e-201,-7.652347675824176e-201,-7.64735267087912e-201,-7.642357665934067e-201,-7.63736266098901e-201,-7.632367656043955e-201,-7.6273726510989e-201,-7.622377646153845e-201,-7.61738264120879e-201,-7.612387636263736e-201,-7.607392631318682e-201,-7.602397626373626e-201,-7.597402621428572e-201,-7.592407616483516e-201,-7.587412611538461e-201,-7.582417606593407e-201,-7.577422601648352e-201,-7.572427596703298e-201,-7.567432591758243e-201,-7.562437586813186e-201,-7.557442581868132e-201,-7.552447576923077e-201,-7.547452571978021e-201,-7.542457567032967e-201,-7.537462562087912e-201,-7.532467557142857e-201,-7.527472552197803e-201,-7.522477547252746e-201,-7.517482542307691e-201,-7.512487537362637e-201,-7.507492532417582e-201,-7.502497527472526e-201,-7.497502522527472e-201,-7.492507517582417e-201,-7.487512512637362e-201,-7.482517507692308e-201,-7.477522502747253e-201,-7.472527497802199e-201,-7.467532492857143e-201,-7.462537487912088e-201,-7.457542482967034e-201,-7.452547478021979e-201,-7.447552473076922e-201,-7.442557468131868e-201,-7.437562463186813e-201,-7.432567458241758e-201,-7.427572453296704e-201,-7.422577448351648e-201,-7.417582443406593e-201,-7.412587438461539e-201,-7.407592433516482e-201,-7.402597428571427e-201,-7.397602423626373e-201,-7.392607418681318e-201,-7.387612413736263e-201,-7.382617408791209e-201,-7.377622403846153e-201,-7.372627398901097e-201,-7.367632393956044e-201,-7.362637389010989e-201,-7.357642384065935e-201,-7.35264737912088e-201,-7.347652374175824e-201,-7.34265736923077e-201,-7.337662364285715e-201,-7.332667359340658e-201,-7.327672354395605e-201,-7.32267734945055e-201,-7.317682344505494e-201,-7.31268733956044e-201,-7.307692334615385e-201,-7.30269732967033e-201,-7.297702324725276e-201,-7.292707319780219e-201,-7.287712314835163e-201,-7.28271730989011e-201,-7.277722304945054e-201,-7.272727299999999e-201,-7.267732295054945e-201,-7.26273729010989e-201,-7.257742285164834e-201,-7.252747280219779e-201,-7.247752275274724e-201,-7.242757270329671e-201,-7.237762265384616e-201,-7.232767260439561e-201,-7.227772255494507e-201,-7.222777250549452e-201,-7.217782245604395e-201,-7.212787240659341e-201,-7.207792235714286e-201,-7.20279723076923e-201,-7.197802225824176e-201,-7.192807220879121e-201,-7.187812215934066e-201,-7.182817210989012e-201,-7.177822206043955e-201,-7.1728272010989e-201,-7.167832196153846e-201,-7.16283719120879e-201,-7.157842186263735e-201,-7.152847181318681e-201,-7.147852176373626e-201,-7.142857171428572e-201,-7.137862166483515e-201,-7.13286716153846e-201,-7.127872156593406e-201,-7.122877151648352e-201,-7.117882146703297e-201,-7.112887141758243e-201,-7.107892136813188e-201,-7.102897131868131e-201,-7.097902126923077e-201,-7.092907121978022e-201,-7.087912117032967e-201,-7.082917112087913e-201,-7.077922107142857e-201,-7.072927102197802e-201,-7.067932097252748e-201,-7.062937092307691e-201,-7.057942087362636e-201,-7.052947082417582e-201,-7.047952077472527e-201,-7.042957072527472e-201,-7.037962067582418e-201,-7.032967062637362e-201,-7.027972057692309e-201,-7.022977052747252e-201,-7.017982047802196e-201,-7.012987042857143e-201,-7.007992037912087e-201,-7.002997032967032e-201,-6.99800202802198e-201,-6.993007023076924e-201,-6.988012018131867e-201,-6.983017013186814e-201,-6.978022008241758e-201,-6.973027003296703e-201,-6.968031998351649e-201,-6.963036993406594e-201,-6.958041988461538e-201,-6.953046983516485e-201,-6.948051978571428e-201,-6.943056973626372e-201,-6.938061968681319e-201,-6.933066963736263e-201,-6.92807195879121e-201,-6.923076953846154e-201,-6.918081948901099e-201,-6.913086943956045e-201,-6.908091939010988e-201,-6.903096934065933e-201,-6.898101929120879e-201,-6.893106924175824e-201,-6.888111919230768e-201,-6.883116914285714e-201,-6.87812190934066e-201,-6.873126904395604e-201,-6.86813189945055e-201,-6.863136894505495e-201,-6.858141889560439e-201,-6.853146884615385e-201,-6.84815187967033e-201,-6.843156874725275e-201,-6.838161869780221e-201,-6.833166864835164e-201,-6.828171859890109e-201,-6.823176854945055e-201,-6.81818185e-201,-6.813186845054946e-201,-6.80819184010989e-201,-6.803196835164835e-201,-6.798201830219781e-201,-6.793206825274724e-201,-6.788211820329669e-201,-6.783216815384615e-201,-6.77822181043956e-201,-6.773226805494505e-201,-6.76823180054945e-201,-6.763236795604395e-201,-6.75824179065934e-201,-6.753246785714286e-201,-6.748251780769231e-201,-6.743256775824176e-201,-6.738261770879122e-201,-6.733266765934066e-201,-6.728271760989011e-201,-6.723276756043957e-201,-6.7182817510989e-201,-6.713286746153845e-201,-6.708291741208791e-201,-6.703296736263736e-201,-6.698301731318682e-201,-6.693306726373627e-201,-6.688311721428571e-201,-6.683316716483517e-201,-6.67832171153846e-201,-6.673326706593407e-201,-6.668331701648352e-201,-6.663336696703296e-201,-6.658341691758242e-201,-6.653346686813187e-201,-6.648351681868132e-201,-6.643356676923076e-201,-6.638361671978022e-201,-6.633366667032967e-201,-6.628371662087912e-201,-6.623376657142857e-201,-6.618381652197803e-201,-6.613386647252746e-201,-6.608391642307692e-201,-6.603396637362638e-201,-6.598401632417583e-201,-6.593406627472527e-201,-6.588411622527472e-201,-6.583416617582418e-201,-6.578421612637363e-201,-6.573426607692308e-201,-6.568431602747252e-201,-6.563436597802197e-201,-6.558441592857143e-201,-6.553446587912088e-201,-6.548451582967033e-201,-6.543456578021979e-201,-6.538461573076923e-201,-6.533466568131868e-201,-6.5284715631868134e-201,-6.523476558241758e-201,-6.518481553296703e-201,-6.513486548351648e-201,-6.5084915434065936e-201,-6.503496538461538e-201,-6.498501533516483e-201,-6.493506528571428e-201,-6.488511523626373e-201,-6.483516518681319e-201,-6.478521513736264e-201,-6.4735265087912085e-201,-6.468531503846154e-201,-6.463536498901099e-201,-6.458541493956044e-201,-6.453546489010989e-201,-6.448551484065934e-201,-6.4435564791208795e-201,-6.4385614741758234e-201,-6.433566469230769e-201,-6.428571464285714e-201,-6.4235764593406596e-201,-6.418581454395604e-201,-6.41358644945055e-201,-6.408591444505495e-201,-6.403596439560439e-201,-6.3986014346153845e-201,-6.39360642967033e-201,-6.3886114247252746e-201,-6.383616419780219e-201,-6.378621414835165e-201,-6.373626409890109e-201,-6.368631404945055e-201,-6.3636363999999994e-201,-6.358641395054945e-201,-6.35364639010989e-201,-6.3486513851648356e-201,-6.34365638021978e-201,-6.338661375274725e-201,-6.3336663703296704e-201,-6.328671365384616e-201,-6.32367636043956e-201,-6.318681355494505e-201,-6.3136863505494505e-201,-6.308691345604395e-201,-6.30369634065934e-201,-6.298701335714286e-201,-6.2937063307692314e-201,-6.2887113258241754e-201,-6.283716320879121e-201,-6.278721315934066e-201,-6.273726310989011e-201,-6.2687313060439556e-201,-6.263736301098901e-201,-6.2587412961538456e-201,-6.253746291208791e-201,-6.248751286263736e-201,-6.243756281318681e-201,-6.2387612763736265e-201,-6.233766271428572e-201,-6.2287712664835166e-201,-6.223776261538461e-201,-6.218781256593407e-201,-6.213786251648352e-201,-6.208791246703296e-201,-6.2037962417582415e-201,-6.198801236813187e-201,-6.1938062318681315e-201,-6.188811226923076e-201,-6.1838162219780216e-201,-6.178821217032968e-201,-6.173826212087912e-201,-6.168831207142857e-201,-6.1638362021978025e-201,-6.158841197252747e-201,-6.153846192307692e-201,-6.148851187362637e-201,-6.143856182417582e-201,-6.138861177472527e-201,-6.133866172527472e-201,-6.1288711675824174e-201,-6.123876162637362e-201,-6.118881157692308e-201,-6.113886152747253e-201,-6.1088911478021976e-201,-6.103896142857143e-201,-6.0989011379120884e-201,-6.0939061329670324e-201,-6.088911128021978e-201,-6.083916123076923e-201,-6.0789211181318686e-201,-6.0739261131868125e-201,-6.068931108241758e-201,-6.063936103296703e-201,-6.058941098351647e-201,-6.0539460934065934e-201,-6.048951088461539e-201,-6.0439560835164835e-201,-6.038961078571428e-201,-6.0339660736263736e-201,-6.028971068681319e-201,-6.023976063736264e-201,-6.018981058791208e-201,-6.013986053846154e-201,-6.0089910489010984e-201,-6.003996043956044e-201,-5.9990010390109885e-201,-5.994006034065934e-201,-5.989011029120879e-201,-5.984016024175825e-201,-5.979021019230769e-201,-5.974026014285714e-201,-5.9690310093406595e-201,-5.964036004395605e-201,-5.959040999450549e-201,-5.954045994505494e-201,-5.94905098956044e-201,-5.944055984615384e-201,-5.939060979670329e-201,-5.934065974725275e-201,-5.92907096978022e-201,-5.9240759648351645e-201,-5.91908095989011e-201,-5.914085954945055e-201,-5.90909095e-201,-5.904095945054945e-201,-5.89910094010989e-201,-5.894105935164835e-201,-5.88911093021978e-201,-5.884115925274725e-201,-5.8791209203296695e-201,-5.874125915384616e-201,-5.869130910439561e-201,-5.864135905494506e-201,-5.8591409005494504e-201,-5.854145895604396e-201,-5.849150890659341e-201,-5.844155885714285e-201,-5.8391608807692306e-201,-5.834165875824176e-201,-5.829170870879121e-201,-5.824175865934065e-201,-5.819180860989011e-201,-5.814185856043956e-201,-5.809190851098901e-201,-5.804195846153846e-201,-5.7992008412087916e-201,-5.794205836263736e-201,-5.789210831318681e-201,-5.7842158263736264e-201,-5.779220821428571e-201,-5.7742258164835165e-201,-5.769230811538461e-201,-5.764235806593406e-201,-5.759240801648351e-201,-5.754245796703297e-201,-5.749250791758242e-201,-5.744255786813187e-201,-5.739260781868132e-201,-5.7342657769230775e-201,-5.7292707719780215e-201,-5.724275767032967e-201,-5.719280762087912e-201,-5.714285757142857e-201,-5.709290752197802e-201,-5.704295747252747e-201,-5.6993007423076925e-201,-5.6943057373626364e-201,-5.6893107324175825e-201,-5.684315727472528e-201,-5.6793207225274726e-201,-5.674325717582417e-201,-5.669330712637363e-201,-5.6643357076923074e-201,-5.659340702747253e-201,-5.6543456978021975e-201,-5.649350692857142e-201,-5.6443556879120875e-201,-5.639360682967033e-201,-5.6343656780219776e-201,-5.629370673076923e-201,-5.6243756681318684e-201,-5.619380663186814e-201,-5.614385658241758e-201,-5.609390653296703e-201,-5.6043956483516486e-201,-5.599400643406593e-201,-5.594405638461538e-201,-5.5894106335164834e-201,-5.584415628571429e-201,-5.579420623626373e-201,-5.574425618681318e-201,-5.569430613736264e-201,-5.564435608791209e-201,-5.5594406038461536e-201,-5.554445598901099e-201,-5.549450593956044e-201,-5.544455589010989e-201,-5.539460584065934e-201,-5.534465579120879e-201,-5.529470574175824e-201,-5.524475569230769e-201,-5.519480564285714e-201,-5.5144855593406586e-201,-5.509490554395605e-201,-5.50449554945055e-201,-5.499500544505494e-201,-5.4945055395604395e-201,-5.489510534615385e-201,-5.48451552967033e-201,-5.479520524725274e-201,-5.47452551978022e-201,-5.469530514835165e-201,-5.46453550989011e-201,-5.4595405049450544e-201,-5.4545455e-201,-5.449550495054945e-201,-5.44455549010989e-201,-5.439560485164835e-201,-5.43456548021978e-201,-5.4295704752747254e-201,-5.42457547032967e-201,-5.4195804653846155e-201,-5.41458546043956e-201,-5.4095904554945056e-201,-5.40459545054945e-201,-5.399600445604395e-201,-5.39460544065934e-201,-5.389610435714286e-201,-5.3846154307692304e-201,-5.379620425824176e-201,-5.374625420879121e-201,-5.3696304159340666e-201,-5.3646354109890106e-201,-5.359640406043956e-201,-5.3546454010989014e-201,-5.349650396153846e-201,-5.344655391208791e-201,-5.339660386263736e-201,-5.334665381318681e-201,-5.3296703763736255e-201,-5.324675371428572e-201,-5.319680366483517e-201,-5.314685361538462e-201,-5.3096903565934064e-201,-5.304695351648352e-201,-5.2997003467032965e-201,-5.294705341758242e-201,-5.2897103368131866e-201,-5.284715331868131e-201,-5.279720326923077e-201,-5.274725321978022e-201,-5.269730317032966e-201,-5.264735312087912e-201,-5.2597403071428575e-201,-5.254745302197803e-201,-5.249750297252747e-201,-5.244755292307692e-201,-5.239760287362638e-201,-5.2347652824175824e-201,-5.229770277472527e-201,-5.2247752725274725e-201,-5.219780267582417e-201,-5.214785262637362e-201,-5.209790257692307e-201,-5.2047952527472534e-201,-5.199800247802198e-201,-5.194805242857143e-201,-5.189810237912088e-201,-5.184815232967033e-201,-5.179820228021978e-201,-5.174825223076923e-201,-5.1698302181318676e-201,-5.164835213186813e-201,-5.1598402082417584e-201,-5.154845203296702e-201,-5.149850198351648e-201,-5.144855193406594e-201,-5.139860188461539e-201,-5.134865183516483e-201,-5.1298701785714286e-201,-5.124875173626374e-201,-5.119880168681319e-201,-5.1148851637362634e-201,-5.109890158791209e-201,-5.1048951538461535e-201,-5.099900148901098e-201,-5.0949051439560436e-201,-5.089910139010989e-201,-5.0849151340659336e-201,-5.079920129120879e-201,-5.0749251241758244e-201,-5.069930119230769e-201,-5.0649351142857145e-201,-5.059940109340659e-201,-5.054945104395604e-201,-5.049950099450549e-201,-5.044955094505495e-201,-5.0399600895604394e-201,-5.034965084615384e-201,-5.0299700796703295e-201,-5.024975074725275e-201,-5.0199800697802195e-201,-5.014985064835165e-201,-5.00999005989011e-201,-5.004995054945055e-201,-5.00000005e-201,-4.995005045054945e-201,-4.9900100401098905e-201,-4.9850150351648345e-201,-4.98002003021978e-201,-4.975025025274725e-201,-4.97003002032967e-201,-4.9650350153846146e-201,-4.960040010439561e-201,-4.9550450054945054e-201,-4.950050000549451e-201,-4.9450549956043955e-201,-4.94005999065934e-201,-4.9350649857142856e-201,-4.930069980769231e-201,-4.925074975824176e-201,-4.9200799708791204e-201,-4.915084965934066e-201,-4.910089960989011e-201,-4.905094956043955e-201,-4.900099951098901e-201,-4.895104946153847e-201,-4.890109941208791e-201,-4.885114936263736e-201,-4.8801199313186814e-201,-4.875124926373627e-201,-4.8701299214285715e-201,-4.865134916483516e-201,-4.8601399115384616e-201,-4.855144906593406e-201,-4.850149901648351e-201,-4.845154896703296e-201,-4.840159891758242e-201,-4.835164886813187e-201,-4.830169881868132e-201,-4.825174876923077e-201,-4.820179871978022e-201,-4.815184867032967e-201,-4.810189862087912e-201,-4.805194857142857e-201,-4.800199852197802e-201,-4.7952048472527475e-201,-4.7902098423076914e-201,-4.785214837362637e-201,-4.780219832417582e-201,-4.7752248274725284e-201,-4.770229822527472e-201,-4.765234817582418e-201,-4.760239812637363e-201,-4.755244807692308e-201,-4.7502498027472525e-201,-4.745254797802198e-201,-4.7402597928571426e-201,-4.735264787912087e-201,-4.730269782967033e-201,-4.725274778021977e-201,-4.720279773076923e-201,-4.715284768131868e-201,-4.7102897631868136e-201,-4.705294758241758e-201,-4.7002997532967036e-201,-4.695304748351648e-201,-4.690309743406593e-201,-4.6853147384615384e-201,-4.680319733516484e-201,-4.675324728571428e-201,-4.670329723626373e-201,-4.6653347186813186e-201,-4.660339713736264e-201,-4.655344708791209e-201,-4.650349703846154e-201,-4.6453546989010995e-201,-4.640359693956044e-201,-4.635364689010989e-201,-4.630369684065934e-201,-4.625374679120879e-201,-4.6203796741758236e-201,-4.615384669230769e-201,-4.610389664285714e-201,-4.605394659340659e-201,-4.600399654395604e-201,-4.59540464945055e-201,-4.5904096445054945e-201,-4.58541463956044e-201,-4.5804196346153846e-201,-4.575424629670329e-201,-4.570429624725275e-201,-4.56543461978022e-201,-4.560439614835164e-201,-4.5554446098901095e-201,-4.550449604945055e-201,-4.5454546e-201,-4.540459595054944e-201,-4.5354645901098904e-201,-4.530469585164836e-201,-4.5254745802197804e-201,-4.520479575274725e-201,-4.5154845703296705e-201,-4.510489565384615e-201,-4.50549456043956e-201,-4.500499555494505e-201,-4.495504550549451e-201,-4.4905095456043954e-201,-4.48551454065934e-201,-4.4805195357142855e-201,-4.47552453076923e-201,-4.470529525824176e-201,-4.465534520879121e-201,-4.4605395159340656e-201,-4.455544510989011e-201,-4.4505495060439564e-201,-4.445554501098901e-201,-4.440559496153846e-201,-4.435564491208791e-201,-4.4305694862637366e-201,-4.4255744813186806e-201,-4.420579476373626e-201,-4.415584471428571e-201,-4.410589466483517e-201,-4.4055944615384614e-201,-4.400599456593407e-201,-4.3956044516483515e-201,-4.390609446703297e-201,-4.3856144417582416e-201,-4.380619436813187e-201,-4.375624431868132e-201,-4.3706294269230764e-201,-4.365634421978022e-201,-4.3606394170329665e-201,-4.355644412087912e-201,-4.350649407142857e-201,-4.345654402197802e-201,-4.340659397252747e-201,-4.335664392307693e-201,-4.3306693873626374e-201,-4.325674382417582e-201,-4.3206793774725275e-201,-4.315684372527473e-201,-4.310689367582417e-201,-4.305694362637362e-201,-4.300699357692308e-201,-4.295704352747252e-201,-4.290709347802198e-201,-4.285714342857143e-201,-4.2807193379120886e-201,-4.275724332967033e-201,-4.270729328021978e-201,-4.265734323076923e-201,-4.260739318131868e-201,-4.255744313186813e-201,-4.250749308241758e-201,-4.245754303296703e-201,-4.240759298351648e-201,-4.235764293406593e-201,-4.230769288461538e-201,-4.225774283516484e-201,-4.220779278571429e-201,-4.215784273626374e-201,-4.2107892686813184e-201,-4.205794263736264e-201,-4.200799258791209e-201,-4.195804253846153e-201,-4.1908092489010986e-201,-4.185814243956044e-201,-4.180819239010989e-201,-4.175824234065933e-201,-4.1708292291208795e-201,-4.165834224175825e-201,-4.1608392192307696e-201,-4.155844214285714e-201,-4.15084920934066e-201,-4.145854204395604e-201,-4.140859199450549e-201,-4.1358641945054944e-201,-4.130869189560439e-201,-4.1258741846153845e-201,-4.120879179670329e-201,-4.1158841747252746e-201,-4.110889169780219e-201,-4.1058941648351654e-201,-4.10089915989011e-201,-4.095904154945055e-201,-4.09090915e-201,-4.0859141450549455e-201,-4.0809191401098895e-201,-4.075924135164835e-201,-4.07092913021978e-201,-4.065934125274726e-201,-4.06093912032967e-201,-4.055944115384615e-201,-4.0509491104395605e-201,-4.045954105494506e-201,-4.0409591005494506e-201,-4.035964095604396e-201,-4.030969090659341e-201,-4.025974085714285e-201,-4.020979080769231e-201,-4.0159840758241754e-201,-4.010989070879121e-201,-4.0059940659340655e-201,-4.000999060989011e-201,-3.9960040560439556e-201,-3.991009051098901e-201,-3.9860140461538464e-201,-3.981019041208791e-201,-3.9760240362637365e-201,-3.971029031318682e-201,-3.966034026373626e-201,-3.961039021428571e-201,-3.9560440164835166e-201,-3.951049011538462e-201,-3.946054006593406e-201,-3.9410590016483514e-201,-3.936063996703297e-201,-3.9310689917582415e-201,-3.926073986813187e-201,-3.921078981868132e-201,-3.916083976923077e-201,-3.9110889719780216e-201,-3.906093967032967e-201,-3.9010989620879124e-201,-3.896103957142857e-201,-3.891108952197802e-201,-3.886113947252747e-201,-3.881118942307692e-201,-3.876123937362637e-201,-3.871128932417582e-201,-3.8661339274725274e-201,-3.861138922527473e-201,-3.856143917582418e-201,-3.851148912637362e-201,-3.8461539076923075e-201,-3.841158902747253e-201,-3.836163897802198e-201,-3.831168892857142e-201,-3.826173887912088e-201,-3.821178882967033e-201,-3.816183878021978e-201,-3.8111888730769225e-201,-3.806193868131868e-201,-3.801198863186813e-201,-3.796203858241759e-201,-3.791208853296703e-201,-3.786213848351649e-201,-3.7812188434065934e-201,-3.776223838461538e-201,-3.7712288335164835e-201,-3.766233828571428e-201,-3.7612388236263736e-201,-3.756243818681318e-201,-3.751248813736263e-201,-3.746253808791208e-201,-3.7412588038461545e-201,-3.736263798901099e-201,-3.731268793956044e-201,-3.726273789010989e-201,-3.721278784065935e-201,-3.7162837791208786e-201,-3.711288774175824e-201,-3.7062937692307694e-201,-3.701298764285714e-201,-3.696303759340659e-201,-3.691308754395604e-201,-3.686313749450549e-201,-3.681318744505495e-201,-3.67632373956044e-201,-3.671328734615385e-201,-3.66633372967033e-201,-3.6613387247252744e-201,-3.65634371978022e-201,-3.6513487148351645e-201,-3.64635370989011e-201,-3.6413587049450546e-201,-3.636363699999999e-201,-3.631368695054945e-201,-3.62637369010989e-201,-3.6213786851648355e-201,-3.61638368021978e-201,-3.6113886752747256e-201,-3.606393670329671e-201,-3.601398665384615e-201,-3.59640366043956e-201,-3.591408655494506e-201,-3.5864136505494504e-201,-3.581418645604395e-201,-3.5764236406593405e-201,-3.571428635714286e-201,-3.5664336307692306e-201,-3.561438625824176e-201,-3.5564436208791214e-201,-3.551448615934066e-201,-3.546453610989011e-201,-3.541458606043956e-201,-3.536463601098901e-201,-3.531468596153846e-201,-3.526473591208791e-201,-3.5214785862637356e-201,-3.516483581318681e-201,-3.5114885763736264e-201,-3.506493571428571e-201,-3.501498566483516e-201,-3.496503561538462e-201,-3.491508556593407e-201,-3.486513551648351e-201,-3.481518546703297e-201,-3.476523541758242e-201,-3.471528536813187e-201,-3.4665335318681314e-201,-3.461538526923077e-201,-3.456543521978022e-201,-3.451548517032967e-201,-3.4465535120879116e-201,-3.441558507142857e-201,-3.4365635021978024e-201,-3.431568497252747e-201,-3.4265734923076925e-201,-3.421578487362637e-201,-3.4165834824175825e-201,-3.411588477472527e-201,-3.4065934725274726e-201,-3.401598467582417e-201,-3.396603462637363e-201,-3.3916084576923074e-201,-3.386613452747252e-201,-3.3816184478021975e-201,-3.3766234428571436e-201,-3.3716284379120876e-201,-3.366633432967033e-201,-3.3616384280219784e-201,-3.356643423076924e-201,-3.351648418131868e-201,-3.346653413186813e-201,-3.3416584082417585e-201,-3.336663403296703e-201,-3.3316683983516486e-201,-3.326673393406593e-201,-3.321678388461539e-201,-3.3166833835164834e-201,-3.311688378571428e-201,-3.3066933736263735e-201,-3.301698368681319e-201,-3.2967033637362635e-201,-3.291708358791209e-201,-3.2867133538461536e-201,-3.281718348901098e-201,-3.276723343956044e-201,-3.271728339010989e-201,-3.2667333340659345e-201,-3.261738329120879e-201,-3.2567433241758242e-201,-3.251748319230769e-201,-3.2467533142857143e-201,-3.2417583093406594e-201,-3.2367633043956044e-201,-3.2317682994505494e-201,-3.2267732945054945e-201,-3.2217782895604395e-201,-3.2167832846153846e-201,-3.2117882796703296e-201,-3.206793274725275e-201,-3.2017982697802197e-201,-3.196803264835165e-201,-3.1918082598901098e-201,-3.1868132549450545e-201,-3.18181825e-201,-3.176823245054945e-201,-3.1718282401098903e-201,-3.166833235164835e-201,-3.16183823021978e-201,-3.156843225274725e-201,-3.15184822032967e-201,-3.1468532153846155e-201,-3.1418582104395605e-201,-3.1368632054945052e-201,-3.1318682005494506e-201,-3.1268731956043953e-201,-3.1218781906593407e-201,-3.1168831857142858e-201,-3.1118881807692308e-201,-3.106893175824176e-201,-3.101898170879121e-201,-3.096903165934066e-201,-3.091908160989011e-201,-3.086913156043956e-201,-3.0819181510989014e-201,-3.076923146153846e-201,-3.0719281412087908e-201,-3.066933136263736e-201,-3.061938131318681e-201,-3.0569431263736266e-201,-3.0519481214285713e-201,-3.0469531164835163e-201,-3.0419581115384614e-201,-3.0369631065934064e-201,-3.0319681016483515e-201,-3.026973096703297e-201,-3.0219780917582415e-201,-3.016983086813187e-201,-3.0119880818681316e-201,-3.006993076923077e-201,-3.0019980719780217e-201,-2.997003067032967e-201,-2.992008062087912e-201,-2.9870130571428572e-201,-2.9820180521978022e-201,-2.9770230472527473e-201,-2.972028042307692e-201,-2.9670330373626377e-201,-2.9620380324175824e-201,-2.9570430274725278e-201,-2.9520480225274725e-201,-2.947053017582417e-201,-2.9420580126373626e-201,-2.9370630076923076e-201,-2.932068002747253e-201,-2.9270729978021977e-201,-2.9220779928571427e-201,-2.9170829879120878e-201,-2.9120879829670328e-201,-2.9070929780219782e-201,-2.9020979730769233e-201,-2.897102968131868e-201,-2.8921079631868133e-201,-2.887112958241758e-201,-2.882117953296703e-201,-2.8771229483516485e-201,-2.8721279434065935e-201,-2.8671329384615386e-201,-2.8621379335164836e-201,-2.8571429285714283e-201,-2.8521479236263737e-201,-2.8471529186813184e-201,-2.842157913736264e-201,-2.8371629087912088e-201,-2.8321679038461535e-201,-2.827172898901099e-201,-2.8221778939560436e-201,-2.817182889010989e-201,-2.812187884065934e-201,-2.807192879120879e-201,-2.802197874175824e-201,-2.797202869230769e-201,-2.792207864285714e-201,-2.7872128593406592e-201,-2.7822178543956043e-201,-2.7772228494505497e-201,-2.7722278445054943e-201,-2.7672328395604397e-201,-2.7622378346153844e-201,-2.7572428296703295e-201,-2.752247824725275e-201,-2.74725281978022e-201,-2.742257814835165e-201,-2.73726280989011e-201,-2.7322678049450547e-201,-2.7272728e-201,-2.722277795054945e-201,-2.7172827901098898e-201,-2.7122877851648352e-201,-2.70729278021978e-201,-2.7022977752747253e-201,-2.69730277032967e-201,-2.6923077653846154e-201,-2.6873127604395604e-201,-2.6823177554945054e-201,-2.6773227505494505e-201,-2.6723277456043955e-201,-2.6673327406593402e-201,-2.662337735714286e-201,-2.6573427307692307e-201,-2.652347725824176e-201,-2.6473527208791207e-201,-2.6423577159340658e-201,-2.637362710989011e-201,-2.6323677060439562e-201,-2.6273727010989013e-201,-2.6223776961538463e-201,-2.617382691208791e-201,-2.6123876862637364e-201,-2.607392681318681e-201,-2.602397676373627e-201,-2.5974026714285715e-201,-2.5924076664835162e-201,-2.5874126615384616e-201,-2.5824176565934063e-201,-2.5774226516483517e-201,-2.5724276467032967e-201,-2.5674326417582418e-201,-2.5624376368131868e-201,-2.557442631868132e-201,-2.5524476269230765e-201,-2.547452621978022e-201,-2.5424576170329666e-201,-2.5374626120879124e-201,-2.532467607142857e-201,-2.527472602197802e-201,-2.522477597252747e-201,-2.517482592307692e-201,-2.5124875873626372e-201,-2.5074925824175826e-201,-2.5024975774725273e-201,-2.4975025725274727e-201,-2.4925075675824174e-201,-2.4875125626373628e-201,-2.4825175576923075e-201,-2.4775225527472525e-201,-2.472527547802198e-201,-2.4675325428571426e-201,-2.462537537912088e-201,-2.4575425329670327e-201,-2.4525475280219777e-201,-2.447552523076923e-201,-2.442557518131868e-201,-2.4375625131868132e-201,-2.4325675082417582e-201,-2.427572503296703e-201,-2.4225774983516483e-201,-2.4175824934065934e-201,-2.4125874884615388e-201,-2.4075924835164835e-201,-2.4025974785714285e-201,-2.3976024736263735e-201,-2.3926074686813186e-201,-2.387612463736264e-201,-2.382617458791209e-201,-2.3776224538461537e-201,-2.372627448901099e-201,-2.3676324439560438e-201,-2.362637439010989e-201,-2.3576424340659342e-201,-2.352647429120879e-201,-2.3476524241758243e-201,-2.342657419230769e-201,-2.337662414285714e-201,-2.332667409340659e-201,-2.3276724043956045e-201,-2.3226773994505495e-201,-2.3176823945054946e-201,-2.3126873895604392e-201,-2.3076923846153846e-201,-2.3026973796703293e-201,-2.297702374725275e-201,-2.2927073697802198e-201,-2.2877123648351648e-201,-2.28271735989011e-201,-2.277722354945055e-201,-2.27272735e-201,-2.2677323450549453e-201,-2.26273734010989e-201,-2.2577423351648354e-201,-2.25274733021978e-201,-2.2477523252747255e-201,-2.24275732032967e-201,-2.237762315384615e-201,-2.2327673104395606e-201,-2.2277723054945053e-201,-2.2227773005494507e-201,-2.2177822956043954e-201,-2.2127872906593404e-201,-2.2077922857142855e-201,-2.202797280769231e-201,-2.1978022758241756e-201,-2.192807270879121e-201,-2.1878122659340656e-201,-2.182817260989011e-201,-2.1778222560439557e-201,-2.172827251098901e-201,-2.167832246153846e-201,-2.1628372412087912e-201,-2.1578422362637362e-201,-2.1528472313186813e-201,-2.147852226373626e-201,-2.1428572214285717e-201,-2.1378622164835164e-201,-2.1328672115384618e-201,-2.1278722065934065e-201,-2.1228772016483515e-201,-2.1178821967032966e-201,-2.1128871917582416e-201,-2.107892186813187e-201,-2.1028971818681317e-201,-2.0979021769230767e-201,-2.0929071719780218e-201,-2.087912167032967e-201,-2.0829171620879122e-201,-2.0779221571428573e-201,-2.072927152197802e-201,-2.0679321472527474e-201,-2.062937142307692e-201,-2.0579421373626374e-201,-2.0529471324175825e-201,-2.0479521274725275e-201,-2.0429571225274726e-201,-2.0379621175824176e-201,-2.0329671126373626e-201,-2.0279721076923077e-201,-2.0229771027472527e-201,-2.017982097802198e-201,-2.0129870928571428e-201,-2.007992087912088e-201,-2.002997082967033e-201,-1.9980020780219776e-201,-1.9930070730769233e-201,-1.988012068131868e-201,-1.983017063186813e-201,-1.978022058241758e-201,-1.973027053296703e-201,-1.9680320483516482e-201,-1.9630370434065936e-201,-1.9580420384615383e-201,-1.9530470335164837e-201,-1.9480520285714284e-201,-1.9430570236263738e-201,-1.9380620186813184e-201,-1.933067013736264e-201,-1.928072008791209e-201,-1.923077003846154e-201,-1.918081998901099e-201,-1.913086993956044e-201,-1.9080919890109887e-201,-1.903096984065934e-201,-1.898101979120879e-201,-1.8931069741758245e-201,-1.8881119692307692e-201,-1.8831169642857143e-201,-1.8781219593406593e-201,-1.873126954395604e-201,-1.8681319494505497e-201,-1.8631369445054944e-201,-1.8581419395604395e-201,-1.8531469346153845e-201,-1.8481519296703295e-201,-1.8431569247252742e-201,-1.83816191978022e-201,-1.8331669148351647e-201,-1.82817190989011e-201,-1.8231769049450547e-201,-1.8181818999999998e-201,-1.813186895054945e-201,-1.8081918901098902e-201,-1.8031968851648353e-201,-1.7982018802197803e-201,-1.793206875274725e-201,-1.7882118703296704e-201,-1.783216865384615e-201,-1.778221860439561e-201,-1.7732268554945055e-201,-1.7682318505494506e-201,-1.7632368456043956e-201,-1.7582418406593403e-201,-1.7532468357142857e-201,-1.7482518307692307e-201,-1.7432568258241758e-201,-1.7382618208791208e-201,-1.733266815934066e-201,-1.728271810989011e-201,-1.723276806043956e-201,-1.718281801098901e-201,-1.7132867961538464e-201,-1.708291791208791e-201,-1.7032967862637365e-201,-1.698301781318681e-201,-1.6933067763736262e-201,-1.6883117714285716e-201,-1.6833167664835166e-201,-1.6783217615384617e-201,-1.6733267565934067e-201,-1.6683317516483514e-201,-1.6633367467032968e-201,-1.658341741758242e-201,-1.6533467368131865e-201,-1.648351731868132e-201,-1.643356726923077e-201,-1.638361721978022e-201,-1.633366717032967e-201,-1.628371712087912e-201,-1.6233767071428571e-201,-1.6183817021978024e-201,-1.6133866972527472e-201,-1.6083916923076923e-201,-1.6033966873626375e-201,-1.5984016824175825e-201,-1.5934066774725274e-201,-1.5884116725274726e-201,-1.5834166675824175e-201,-1.5784216626373625e-201,-1.5734266576923077e-201,-1.5684316527472526e-201,-1.5634366478021976e-201,-1.5584416428571429e-201,-1.5534466379120879e-201,-1.548451632967033e-201,-1.543456628021978e-201,-1.538461623076923e-201,-1.533466618131868e-201,-1.5284716131868133e-201,-1.5234766082417581e-201,-1.5184816032967032e-201,-1.5134865983516484e-201,-1.5084915934065934e-201,-1.5034965884615385e-201,-1.4985015835164835e-201,-1.4935065785714286e-201,-1.4885115736263736e-201,-1.4835165686813188e-201,-1.4785215637362639e-201,-1.4735265587912087e-201,-1.468531553846154e-201,-1.4635365489010988e-201,-1.4585415439560439e-201,-1.453546539010989e-201,-1.448551534065934e-201,-1.443556529120879e-201,-1.4385615241758242e-201,-1.4335665192307692e-201,-1.4285715142857141e-201,-1.4235765093406591e-201,-1.4185815043956044e-201,-1.4135864994505494e-201,-1.4085914945054945e-201,-1.4035964895604395e-201,-1.3986014846153845e-201,-1.3936064796703296e-201,-1.3886114747252748e-201,-1.3836164697802198e-201,-1.3786214648351647e-201,-1.37362645989011e-201,-1.368631454945055e-201,-1.36363645e-201,-1.3586414450549452e-201,-1.3536464401098901e-201,-1.3486514351648351e-201,-1.3436564302197802e-201,-1.3386614252747252e-201,-1.33366642032967e-201,-1.3286714153846153e-201,-1.3236764104395603e-201,-1.3186814054945054e-201,-1.3136864005494506e-201,-1.3086913956043955e-201,-1.3036963906593405e-201,-1.2987013857142857e-201,-1.2937063807692308e-201,-1.2887113758241758e-201,-1.2837163708791209e-201,-1.2787213659340659e-201,-1.273726360989011e-201,-1.2687313560439562e-201,-1.2637363510989012e-201,-1.258741346153846e-201,-1.2537463412087913e-201,-1.2487513362637363e-201,-1.2437563313186814e-201,-1.2387613263736264e-201,-1.2337663214285714e-201,-1.2287713164835165e-201,-1.2237763115384615e-201,-1.2187813065934066e-201,-1.2137863016483514e-201,-1.2087912967032967e-201,-1.2037962917582417e-201,-1.1988012868131867e-201,-1.193806281868132e-201,-1.1888112769230768e-201,-1.1838162719780219e-201,-1.178821267032967e-201,-1.1738262620879121e-201,-1.168831257142857e-201,-1.1638362521978022e-201,-1.1588412472527473e-201,-1.1538462423076923e-201,-1.1488512373626375e-201,-1.1438562324175824e-201,-1.1388612274725274e-201,-1.1338662225274726e-201,-1.1288712175824177e-201,-1.1238762126373627e-201,-1.1188812076923076e-201,-1.1138862027472528e-201,-1.1088911978021978e-201,-1.1038961928571427e-201,-1.098901187912088e-201,-1.0939061829670328e-201,-1.0889111780219778e-201,-1.083916173076923e-201,-1.0789211681318681e-201,-1.073926163186813e-201,-1.0689311582417582e-201,-1.0639361532967032e-201,-1.0589411483516483e-201,-1.0539461434065935e-201,-1.0489511384615383e-201,-1.0439561335164834e-201,-1.0389611285714286e-201,-1.0339661236263736e-201,-1.0289711186813187e-201,-1.0239761137362637e-201,-1.0189811087912088e-201,-1.0139861038461538e-201,-1.008991098901099e-201,-1.003996093956044e-201,-9.99001089010989e-202,-9.940060840659342e-202,-9.890110791208792e-202,-9.84016074175824e-202,-9.790210692307691e-202,-9.740260642857141e-202,-9.690310593406592e-202,-9.640360543956044e-202,-9.590410494505495e-202,-9.540460445054943e-202,-9.490510395604395e-202,-9.440560346153846e-202,-9.390610296703296e-202,-9.340660247252748e-202,-9.290710197802197e-202,-9.240760148351647e-202,-9.1908100989011e-202,-9.14086004945055e-202,-9.09091e-202,-9.04095995054945e-202,-8.991009901098901e-202,-8.941059851648352e-202,-8.891109802197804e-202,-8.841159752747253e-202,-8.791209703296703e-202,-8.741259653846155e-202,-8.691309604395606e-202,-8.641359554945054e-202,-8.591409505494505e-202,-8.541459456043955e-202,-8.491509406593405e-202,-8.441559357142858e-202,-8.391609307692308e-202,-8.341659258241757e-202,-8.291709208791209e-202,-8.24175915934066e-202,-8.19180910989011e-202,-8.14185906043956e-202,-8.0919090109890115e-202,-8.041958961538461e-202,-7.992008912087912e-202,-7.942058862637363e-202,-7.892108813186813e-202,-7.842158763736264e-202,-7.792208714285715e-202,-7.742258664835164e-202,-7.692308615384615e-202,-7.642358565934066e-202,-7.592408516483516e-202,-7.542458467032967e-202,-7.492508417582418e-202,-7.442558368131868e-202,-7.392608318681319e-202,-7.3426582692307695e-202,-7.29270821978022e-202,-7.24275817032967e-202,-7.192808120879122e-202,-7.142858071428571e-202,-7.092908021978022e-202,-7.042957972527472e-202,-6.993007923076922e-202,-6.943057873626374e-202,-6.893107824175823e-202,-6.843157774725275e-202,-6.793207725274726e-202,-6.743257675824175e-202,-6.693307626373627e-202,-6.643357576923077e-202,-6.5934075274725275e-202,-6.543457478021977e-202,-6.493507428571428e-202,-6.443557379120879e-202,-6.393607329670329e-202,-6.3436572802197805e-202,-6.29370723076923e-202,-6.243757181318681e-202,-6.193807131868133e-202,-6.143857082417582e-202,-6.0939070329670335e-202,-6.043956983516484e-202,-5.994006934065934e-202,-5.944056884615384e-202,-5.894106835164835e-202,-5.844156785714286e-202,-5.794206736263736e-202,-5.744256686813187e-202,-5.694306637362637e-202,-5.644356587912088e-202,-5.594406538461538e-202,-5.544456489010989e-202,-5.49450643956044e-202,-5.44455639010989e-202,-5.394606340659341e-202,-5.344656291208791e-202,-5.294706241758241e-202,-5.244756192307691e-202,-5.194806142857143e-202,-5.144856093406593e-202,-5.094906043956044e-202,-5.044955994505495e-202,-4.995005945054944e-202,-4.945055895604396e-202,-4.895105846153847e-202,-4.845155796703297e-202,-4.795205747252748e-202,-4.745255697802197e-202,-4.695305648351648e-202,-4.645355598901098e-202,-4.5954055494505495e-202,-4.5454555e-202,-4.49550545054945e-202,-4.445555401098902e-202,-4.395605351648351e-202,-4.3456553021978025e-202,-4.295705252747253e-202,-4.245755203296703e-202,-4.195805153846154e-202,-4.145855104395604e-202,-4.095905054945055e-202,-4.0459550054945055e-202,-3.996004956043956e-202,-3.9460549065934063e-202,-3.896104857142857e-202,-3.8461548076923076e-202,-3.7962047582417584e-202,-3.746254708791209e-202,-3.6963046593406593e-202,-3.6463546098901097e-202,-3.5964045604395605e-202,-3.546454510989011e-202,-3.4965044615384614e-202,-3.446554412087912e-202,-3.3966043626373627e-202,-3.346654313186813e-202,-3.2967042637362635e-202,-3.2467542142857144e-202,-3.1968041648351648e-202,-3.146854115384615e-202,-3.096904065934066e-202,-3.0469540164835165e-202,-2.997003967032967e-202,-2.9470539175824177e-202,-2.897103868131868e-202,-2.847153818681318e-202,-2.797203769230769e-202,-2.74725371978022e-202,-2.6973036703296703e-202,-2.6473536208791207e-202,-2.5974035714285716e-202,-2.5474535219780215e-202,-2.4975034725274724e-202,-2.4475534230769232e-202,-2.3976033736263737e-202,-2.347653324175824e-202,-2.297703274725275e-202,-2.247753225274725e-202,-2.1978031758241753e-202,-2.1478531263736266e-202,-2.097903076923077e-202,-2.0479530274725275e-202,-1.9980029780219779e-202,-1.9480529285714288e-202,-1.8981028791208792e-202,-1.8481528296703296e-202,-1.7982027802197802e-202,-1.7482527307692309e-202,-1.6983026813186813e-202,-1.6483526318681317e-202,-1.5984025824175826e-202,-1.548452532967033e-202,-1.4985024835164834e-202,-1.4485524340659343e-202,-1.3986023846153844e-202,-1.348652335164835e-202,-1.298702285714286e-202,-1.2487522362637361e-202,-1.1988021868131868e-202,-1.1488521373626374e-202,-1.0989020879120878e-202,-1.0489520384615385e-202,-9.99001989010989e-203,-9.490519395604394e-203,-8.991018901098902e-203,-8.491518406593407e-203,-7.992017912087911e-203,-7.492517417582418e-203,-6.993016923076923e-203,-6.493516428571428e-203,-5.994015934065934e-203,-5.494515439560439e-203,-4.995014945054945e-203,-4.495514450549451e-203,-3.9960139560439556e-203,-3.4965134615384614e-203,-2.997012967032967e-203,-2.4975124725274722e-203,-1.998011978021978e-203,-1.4985114835164834e-203,-9.99010989010989e-204,-4.995104945054945e-204,-1.0e-208]}
},{}],56:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var randu = require( '@stdlib/math/base/random/randu' );
var abs = require( '@stdlib/math/base/special/abs' );
var EPS = require( '@stdlib/math/constants/float64-eps' );
var acovercos = require( './../lib' );


// FIXTURES //

var data = require( './fixtures/julia/data.json' );
var smallNegative = require( './fixtures/julia/small_negative.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof acovercos, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function computes the inverse coversed cosine', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = data.x;
	expected = data.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = acovercos( x[i] );
		if ( y === expected[ i ] ) {
			t.strictEqual( y, expected[ i ], 'x: '+x[i]+'. Expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 350.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. Value: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the inverse coversed cosine (small negative numbers)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = smallNegative.x;
	expected = smallNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = acovercos( x[i] );
		if ( y === expected[ i ] ) {
			t.strictEqual( y, expected[ i ], 'x: '+x[i]+'. Expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. Value: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function returns `NaN` if provided a `NaN`', function test( t ) {
	var v = acovercos( NaN );
	t.strictEqual( isnan( v ), true, 'returns NaN' );
	t.end();
});

tape( 'the function returns `NaN` if provided a value less than `-2`', function test( t ) {
	var v;
	var i;
	for ( i = 0; i < 1e4; i++ ) {
		v = -(randu()*1.0e6) - (2.0+EPS);
		t.strictEqual( isnan( acovercos( v ) ), true, 'returns NaN when provided '+v );
	}
	t.end();
});

tape( 'the function returns `NaN` if provided a value greater than `0`', function test( t ) {
	var v;
	var i;
	for ( i = 0; i < 1e4; i++ ) {
		v = (randu()*1.0e6) + 0.0 + EPS;
		t.strictEqual( isnan( acovercos( v ) ), true, 'returns NaN when provided '+v );
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/special/acovercos/test/test.js")
},{"./../lib":53,"./fixtures/julia/data.json":54,"./fixtures/julia/small_negative.json":55,"@stdlib/math/base/assert/is-nan":34,"@stdlib/math/base/random/randu":47,"@stdlib/math/base/special/abs":51,"@stdlib/math/constants/float64-eps":65,"tape":155}],57:[function(require,module,exports){
'use strict';

/*
* The original C code, long comment, copyright, license, and constants are from [Cephes]{@link http://www.netlib.org/cephes}.
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

var evalrational = require( '@stdlib/math/base/tools/evalrational' ).factory;
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var PIO4 = require( '@stdlib/math/constants/float64-fourth-pi' );


// VARIABLES //

var MOREBITS = 6.123233995736765886130e-17; // pi/2 = PIO2 + MOREBITS.

/*
* arcsin(x) = x + x^3 P(x^2)/Q(x^2)
* 0 <= x <= 0.625
* Peak relative error = 1.2e-18
*/
var P = [
	-8.198089802484824371615e0,
	1.956261983317594739197e1,
	-1.626247967210700244449e1,
	5.444622390564711410273e0,
	-6.019598008014123785661e-1,
	4.253011369004428248960e-3
];
var Q = [
	-4.918853881490881290097e1,
	1.395105614657485689735e2,
	-1.471791292232726029859e2,
	7.049610280856842141659e1,
	-1.474091372988853791896e1,
	1.0
];

/*
* arcsin(1-x) = pi/2 - sqrt(2x)(1+R(x))
* 0 <= x <= 0.5
* Peak relative error = 4.2e-18
*/
var R = [
	2.853665548261061424989e1,
	-2.556901049652824852289e1,
	6.968710824104713396794e0,
	-5.634242780008963776856e-1,
	2.967721961301243206100e-3
];
var S = [
	3.424398657913078477438e2,
	-3.838770957603691357202e2,
	1.470656354026814941758e2,
	-2.194779531642920639778e1,
	1.0
];


// FUNCTIONS //

// Compile functions to evaluate rational functions based on the above coefficients...
var ratevalPQ = evalrational( P, Q );
var ratevalRS = evalrational( R, S );


// MAIN //

/**
* Computes the arcsine of a number.
*
* @param {number} x - input value
* @returns {number} arcsine (in radians)
*
* @example
* var v = asin( 0.0 );
* // returns ~0.0
*
* @example
* var v = asin( Math.PI/2.0 );
* // returns ~1.0
*
* @example
* var v = asin( -Math.PI/6.0 );
* // returns ~-0.5
*
* @example
* var v = asin( NaN );
* // returns NaN
*/
function asin( x ) {
	var sgn;
	var zz;
	var a;
	var p;
	var z;

	if ( isnan( x ) ) {
		return NaN;
	}
	if ( x > 0.0 ) {
		a = x;
	} else {
		sgn = true;
		a = -x;
	}
	if ( a > 1.0 ) {
		return NaN;
	}
	if ( a > 0.625 ) {
		// arcsin(1-x) = pi/2 - sqrt(2x)(1+R(x))
		zz = 1.0 - a;
		p = zz * ratevalRS( zz );
		zz = sqrt( zz + zz );
		z = PIO4 - zz;
		zz = ( zz*p ) - MOREBITS;
		z -= zz;
		z += PIO4;
	} else {
		if ( a < 1.0e-8 ) {
			return x;
		}
		zz = a * a;
		z = zz * ratevalPQ( zz );
		z = ( a*z ) + a;
	}
	return ( sgn ) ? -z : z;
} // end FUNCTION asin()


// EXPORTS //

module.exports = asin;

},{"@stdlib/math/base/assert/is-nan":34,"@stdlib/math/base/special/sqrt":61,"@stdlib/math/base/tools/evalrational":64,"@stdlib/math/constants/float64-fourth-pi":66}],58:[function(require,module,exports){
'use strict';

/**
* Compute the arcsine of a number.
*
* @module @stdlib/math/base/special/asin
*
* @example
* var PI = require( '@stdlib/math/constants/float64-pi' );
* var asin = require( '@stdlib/math/base/special/asin' );
*
* var v = asin( 0.0 );
* // returns 0.0
*
* v = asin( PI/2.0 );
* // returns ~1.0
*
* v = asin( -PI/6.0 );
* // returns ~-0.5
*
* v = asin( NaN );
* // returns NaN
*/

// MODULES //

var asin = require( './asin.js' );


// EXPORTS //

module.exports = asin;

},{"./asin.js":57}],59:[function(require,module,exports){
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

},{}],60:[function(require,module,exports){
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

},{"./floor.js":59}],61:[function(require,module,exports){
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

},{}],62:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":51}],63:[function(require,module,exports){
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

},{"./evalrational.js":62,"./factory.js":63,"@stdlib/utils/define-read-only-property":74}],65:[function(require,module,exports){
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

},{}],66:[function(require,module,exports){
'use strict';

/**
* One fourth times the mathematical constant `π`.
*
* @module @stdlib/math/constants/float64-fourth-pi
* @type {number}
*
* @example
* var FOURTH_PI = require( '@stdlib/math/constants/float64-fourth-pi' );
* // returns 7.85398163397448309616e-1
*/


// MAIN //

/**
* One fourth times the mathematical constant `π`.
*
* @constant
* @type {number}
* @default 7.85398163397448309616e-1
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/Pi}
*/
var FOURTH_PI = 7.85398163397448309616e-1;


// EXPORTS //

module.exports = FOURTH_PI;

},{}],67:[function(require,module,exports){
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

},{}],68:[function(require,module,exports){
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

},{}],69:[function(require,module,exports){
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

},{}],70:[function(require,module,exports){
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

},{}],71:[function(require,module,exports){
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

},{"@stdlib/assert/is-buffer":5,"@stdlib/regexp/function-name":70,"@stdlib/utils/native-class":85}],72:[function(require,module,exports){
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

},{"./constructor_name.js":71}],73:[function(require,module,exports){
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

},{}],74:[function(require,module,exports){
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

},{"./define_read_only_property.js":73}],75:[function(require,module,exports){
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

},{}],76:[function(require,module,exports){
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

},{"./detect_symbol_support.js":75}],77:[function(require,module,exports){
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

},{"@stdlib/utils/detect-symbol-support":76}],78:[function(require,module,exports){
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

},{"./has_tostringtag_support.js":77}],79:[function(require,module,exports){
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

},{"./native.js":82,"./polyfill.js":83,"@stdlib/assert/is-function":7}],80:[function(require,module,exports){
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

},{"./detect.js":79}],81:[function(require,module,exports){
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

},{"./get_prototype_of.js":80}],82:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = Object.getPrototypeOf;

},{}],83:[function(require,module,exports){
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

},{"./proto.js":84,"@stdlib/utils/native-class":85}],84:[function(require,module,exports){
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

},{}],85:[function(require,module,exports){
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

},{"./native_class.js":86,"./polyfill.js":87,"@stdlib/utils/detect-tostringtag-support":78}],86:[function(require,module,exports){
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

},{"./tostring.js":88}],87:[function(require,module,exports){
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

},{"./tostring.js":88,"./tostringtag.js":89,"@stdlib/assert/has-own-property":2}],88:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = Object.prototype.toString; // eslint-disable-line no-redeclare

},{}],89:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';

},{}],90:[function(require,module,exports){
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

},{"./fixtures/nodelist.js":91,"./fixtures/re.js":92,"./fixtures/typedarray.js":93}],91:[function(require,module,exports){
'use strict';

// MODULES //

var root = require( 'system.global' )(); // eslint-disable-line no-redeclare


// MAIN //

var nodeList = root.document && root.document.childNodes;


// EXPORTS //

module.exports = nodeList;

},{"system.global":152}],92:[function(require,module,exports){
'use strict';

var RE = /./;


// EXPORTS //

module.exports = RE;

},{}],93:[function(require,module,exports){
'use strict';

var typedarray = Int8Array;


// EXPORTS //

module.exports = typedarray;

},{}],94:[function(require,module,exports){
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

},{"./check.js":90,"./polyfill.js":95,"./typeof.js":96}],95:[function(require,module,exports){
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

},{"@stdlib/utils/constructor-name":72}],96:[function(require,module,exports){
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

},{"@stdlib/utils/constructor-name":72}],97:[function(require,module,exports){
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

},{}],98:[function(require,module,exports){

},{}],99:[function(require,module,exports){
arguments[4][98][0].apply(exports,arguments)
},{"dup":98}],100:[function(require,module,exports){
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

},{}],101:[function(require,module,exports){
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

},{"base64-js":97,"ieee754":120}],102:[function(require,module,exports){
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
},{"../../is-buffer/index.js":122}],103:[function(require,module,exports){
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

},{"./lib/is_arguments.js":104,"./lib/keys.js":105}],104:[function(require,module,exports){
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

},{}],105:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],106:[function(require,module,exports){
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

},{"foreach":116,"object-keys":125}],107:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],108:[function(require,module,exports){
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

},{"./helpers/isFinite":109,"./helpers/isNaN":110,"./helpers/mod":111,"./helpers/sign":112,"es-to-primitive/es5":113,"has":119,"is-callable":123}],109:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],110:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],111:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],112:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],113:[function(require,module,exports){
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

},{"./helpers/isPrimitive":114,"is-callable":123}],114:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],115:[function(require,module,exports){
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

},{}],116:[function(require,module,exports){

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


},{}],117:[function(require,module,exports){
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

},{}],118:[function(require,module,exports){
var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":117}],119:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":118}],120:[function(require,module,exports){
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

},{}],121:[function(require,module,exports){
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

},{}],122:[function(require,module,exports){
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

},{}],123:[function(require,module,exports){
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

},{}],124:[function(require,module,exports){
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

},{}],125:[function(require,module,exports){
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

},{"./isArguments":126}],126:[function(require,module,exports){
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

},{}],127:[function(require,module,exports){
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
},{"_process":100}],128:[function(require,module,exports){
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
},{"_process":100}],129:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":130}],130:[function(require,module,exports){
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
},{"./_stream_readable":132,"./_stream_writable":134,"core-util-is":102,"inherits":121,"process-nextick-args":128}],131:[function(require,module,exports){
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
},{"./_stream_transform":133,"core-util-is":102,"inherits":121}],132:[function(require,module,exports){
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
},{"./_stream_duplex":130,"./internal/streams/BufferList":135,"./internal/streams/destroy":136,"./internal/streams/stream":137,"_process":100,"core-util-is":102,"events":115,"inherits":121,"isarray":138,"process-nextick-args":128,"safe-buffer":145,"string_decoder/":139,"util":98}],133:[function(require,module,exports){
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
},{"./_stream_duplex":130,"core-util-is":102,"inherits":121}],134:[function(require,module,exports){
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
},{"./_stream_duplex":130,"./internal/streams/destroy":136,"./internal/streams/stream":137,"_process":100,"core-util-is":102,"inherits":121,"process-nextick-args":128,"safe-buffer":145,"util-deprecate":161}],135:[function(require,module,exports){
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
},{"safe-buffer":145}],136:[function(require,module,exports){
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
},{"process-nextick-args":128}],137:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":115}],138:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],139:[function(require,module,exports){
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
},{"safe-buffer":145}],140:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":141}],141:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":130,"./lib/_stream_passthrough.js":131,"./lib/_stream_readable.js":132,"./lib/_stream_transform.js":133,"./lib/_stream_writable.js":134}],142:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":141}],143:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":134}],144:[function(require,module,exports){
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
},{"_process":100,"through":160}],145:[function(require,module,exports){
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

},{"buffer":101}],146:[function(require,module,exports){
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

},{"events":115,"inherits":121,"readable-stream/duplex.js":129,"readable-stream/passthrough.js":140,"readable-stream/readable.js":141,"readable-stream/transform.js":142,"readable-stream/writable.js":143}],147:[function(require,module,exports){
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

},{"es-abstract/es5":108,"function-bind":118}],148:[function(require,module,exports){
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

},{"./implementation":147,"./polyfill":149,"./shim":150,"define-properties":106,"function-bind":118}],149:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":147}],150:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":149,"define-properties":106}],151:[function(require,module,exports){
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
},{}],152:[function(require,module,exports){
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

},{"./implementation":151,"./polyfill":153,"./shim":154,"define-properties":106}],153:[function(require,module,exports){
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
},{"./implementation":151}],154:[function(require,module,exports){
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
},{"./polyfill":153,"define-properties":106}],155:[function(require,module,exports){
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
},{"./lib/default_stream":156,"./lib/results":158,"./lib/test":159,"_process":100,"defined":107,"through":160}],156:[function(require,module,exports){
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
},{"_process":100,"fs":99,"through":160}],157:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":100}],158:[function(require,module,exports){
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
},{"_process":100,"events":115,"function-bind":118,"has":119,"inherits":121,"object-inspect":124,"resumer":144,"through":160}],159:[function(require,module,exports){
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
},{"./next_tick":157,"deep-equal":103,"defined":107,"events":115,"has":119,"inherits":121,"path":127,"string.prototype.trim":148}],160:[function(require,module,exports){
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
},{"_process":100,"stream":146}],161:[function(require,module,exports){
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
},{}]},{},[56]);
