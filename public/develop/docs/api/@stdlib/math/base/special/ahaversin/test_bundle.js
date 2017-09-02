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
var sqrt = require( '@stdlib/math/base/special/sqrt' );


// MAIN //

/**
* Computes the inverse half-value versed sine.
*
* @param {number} x - input value
* @returns {number} inverse half-value versed sine
*
* @example
* var v = ahaversin( 0.0 );
* // returns 0.0
*
* @example
* var v = ahaversin( 1.0 );
* // returns ~3.1416
*
* @example
* var v = ahaversin( 0.5 );
* // returns ~1.5708
*
* @example
* var v = ahaversin( NaN );
* // returns NaN
*/
function ahaversin( x ) {
	return 2.0 * asin( sqrt( x ) );
} // end FUNCTION ahaversin()


// EXPORTS //

module.exports = ahaversin;

},{"@stdlib/math/base/special/asin":58,"@stdlib/math/base/special/sqrt":61}],53:[function(require,module,exports){
'use strict';

/**
* Compute the inverse half-value versed sine.
*
* @module @stdlib/math/base/special/ahaversin
*
* @example
* var ahaversin = require( '@stdlib/math/base/special/ahaversin' );
*
* var v = ahaversin( 0.0 );
* // returns 0.0
*
* v = ahaversin( 1.0 );
* // returns ~3.1416
*
* v = ahaversin( 0.5 );
* // returns ~1.5708
*
* v = ahaversin( NaN );
* // returns NaN
*/

// MODULES //

var ahaversin = require( './ahaversin.js' );


// EXPORTS //

module.exports = ahaversin;

},{"./ahaversin.js":52}],54:[function(require,module,exports){
module.exports={"expected":[0.0,0.044702737660221155,0.06322448399238238,0.07744031506983876,0.08942782762543837,0.09999168854112445,0.10954454438007702,0.11833150538938002,0.12651226109093802,0.13419772299188376,0.1414686384146574,0.1483859600524723,0.15499703820580638,0.16133952500922957,0.1674439461848601,0.1733354572639548,0.1790350797045387,0.18456059361669624,0.18992719695211543,0.19514800174869476,0.20023441411004356,0.20519642957378179,0.2100428658155566,0.2147815482094537,0.21941945941724939,0.2239628611785083,0.22841739436612077,0.23278816186770573,0.2370797977638451,0.24129652547435593,0.2454422069494214,0.24952038453558933,0.25353431680721017,0.2574870093934855,0.26138124162970233,0.2652195897038252,0.2690044468457411,0.27273804100822807,0.27642245041029134,0.28005961725047307,0.2836513598467626,0.2871993834182588,0.2907052896898098,0.2941705854729545,0.2975966903534325,0.3009849435963816,0.3043366103643685,0.3076528873300208,0.31093490775377136,0.3141837460877224,0.31740042215857994,0.3205859049757569,0.32374111620489343,0.32686693334203176,0.3299641926193818,0.3330336916699028,0.3360761919747249,0.3390924211146526,0.34208307484458417,0.345048819007574,0.34799029130343234,0.3509081029251471,0.35380284007500307,0.356675065371033,0.3595253191533414,0.3623541206988773,0.36516196935237527,0.36794934558042963,0.3707167119549898,0.3734645140719684,0.37619318141011765,0.37890312813485244,0.3815947538512732,0.38426844431025614,0.3869245720711377,0.38956349712420885,0.3921855674759597,0.39479111969976155,0.39738047945444777,0.3999539619730535,0.4025118725237823,0.40505450684510863,0.40758215155676353,0.4100950845482202,0.41259357534616525,0.41507788546232816,0.41754826872293754,0.4200049715809754,0.42244823341231563,0.4248782867967501,0.4272953577848354,0.4296996661514245,0.43209142563668546,0.4344708441753549,0.43683812411491946,0.4391934624233726,0.44153705088714784,0.44386907629979183,0.44618972064189916,0.44849916125280004,0.45079757099445716,0.4530851184080001,0.45536196786329647,0.45762827970193554,0.459884210373975,0.46212991256878005,0.46436553534026365,0.4665912242268183,0.4688071213662113,0.47101336560569984,0.4732100926076065,0.4753974349505818,0.47757552222676714,0.4797444811350599,0.48190443557066787,0.4840555067111347,0.486197813099003,0.4883314707212741,0.49045659308581646,0.4925732912948628,0.49468167411573194,0.4967818480489008,0.4988739173935489,0.5009579843106866,0.503034148883977,0.5051025091783532,0.5071631612965267,0.5092161994334802,0.5112617159290321,0.5132998013185535,0.5153305443819187,0.5173540321907626,0.5193703501541157,0.521379582062486,0.5233818101304496,0.5253771150378124,0.527365575969401,0.5293472706535389,0.5313222753992581,0.5332906651323001,0.5352525134299505,0.5372078925547566,0.5391568734871685,0.5410995259571458,0.5430359184747728,0.5449661183599149,0.5468901917709574,0.5488082037326572,0.550720218163144,0.5526262979000999,0.5545265047261494,0.556420899393488,0.558309541647777,0.5601924902513318,0.5620698030056273,0.5639415367731474,0.5658077474986004,0.5676684902295215,0.5695238191362855,0.5713737875315505,0.5732184478891516,0.5750578518624612,0.5768920503022392,0.5787210932739866,0.5805450300748184,0.5823639092498762,0.5841777786082925,0.585986685238721,0.587790675524451,0.5895897951581143,0.5913840891560034,0.5931736018720082,0.5949583770111883,0.5967384576429877,0.5985138862141094,0.6002847045610529,0.6020509539223327,0.6038126749503832,0.6055699077231602,0.607322691755451,0.6090710660098982,0.6108150689077495,0.6125547383393389,0.6142901116743105,0.6160212257715888,0.6177481169891069,0.6194708211932979,0.6211893737683544,0.6229038096252694,0.6246141632106564,0.6263204685153628,0.6280227590828769,0.6297210680175385,0.6314154279925563,0.633105871257839,0.6347924296476429,0.6364751345880455,0.6381540171042461,0.6398291078276993,0.6415004370030873,0.6431680344951343,0.6448319297952665,0.6464921520281248,0.6481487299579309,0.6498016919947127,0.6514510662003923,0.6530968802947409,0.6547391616612025,0.6563779373525925,0.6580132340966709,0.6596450783015974,0.6612734960612685,0.6628985131605413,0.6645201550803462,0.6661384470026909,0.6677534138155601,0.6693650801177127,0.6709734702233776,0.6725786081668542,0.6741805177070157,0.6757792223317213,0.677374745262138,0.6789671094569739,0.6805563376166255,0.682142452187242,0.6837254753647074,0.685305429098543,0.6868823350957322,0.6884562148244696,0.6900270895178361,0.6915949801774007,0.6931599075767538,0.6947218922649698,0.6962809545700033,0.6978371146020199,0.6993903922566621,0.7009408072182541,0.7024883789629429,0.7040331267617828,0.7055750696837594,0.7071142265987574,0.7086506161804726,0.7101842569092696,0.711715167074986,0.7132433647796854,0.7147688679403585,0.7162916942915756,0.7178118613880896,0.7193293866073927,0.7208442871522254,0.722356580053041,0.723866282170426,0.7253734101974754,0.7268779806621275,0.7283800099294561,0.7298795142039227,0.7313765095315877,0.7328710118022844,0.7343630367517536,0.7358525999637414,0.7373397168720605,0.7388244027626161,0.7403066727753963,0.7417865419064283,0.7432640250097025,0.7447391367990607,0.7462118918500561,0.7476823046017786,0.7491503893586512,0.7506161602921952,0.7520796314427667,0.7535408167212626,0.7549997299108013,0.7564563846683713,0.7579107945264566,0.759362972894633,0.7608129330611386,0.7622606881944204,0.7637062513446522,0.7651496354452322,0.7665908533142529,0.7680299176559495,0.7694668410621242,0.7709016360135476,0.7723343148813385,0.7737648899283212,0.7751933733103612,0.7766197770776818,0.7780441131761562,0.7794663934485832,0.7808866296359414,0.7823048333786233,0.7837210162176519,0.785135189595877,0.7865473648591538,0.7879575532575038,0.7893657659462574,0.7907720139871791,0.7921763083495761,0.7935786599113898,0.794979079460271,0.7963775776946386,0.7977741652247232,0.7991688525735945,0.8005616501781734,0.80195256839023,0.8033416174773649,0.8047288076239791,0.8061141489322265,0.8074976514229543,0.8088793250366298,0.8102591796342526,0.8116372249982541,0.813013470833385,0.8143879267675882,0.8157606023528606,0.8171315070661023,0.8185006503099524,0.8198680414136162,0.8212336896336764,0.8225976041548955,0.8239597940910072,0.8253202684854953,0.8266790363123618,0.8280361064768859,0.8293914878163702,0.830745189100878,0.8320972190339609,0.8334475862533745,0.8347962993317855,0.8361433667774696,0.8374887970349987,0.8388325984859192,0.8401747794494219,0.8415153481830012,0.8428543128831069,0.8441916816857867,0.8455274626673197,0.8468616638448422,0.848194293176964,0.8495253585643788,0.8508548678504635,0.8521828288218714,0.8535092492091174,0.8548341366871564,0.8561574988759508,0.8574793433410353,0.8587996775940704,0.8601185090933907,0.8614358452445461,0.8627516934008347,0.8640660608638309,0.865378954883904,0.8666903826607336,0.8680003513438151,0.8693088680329605,0.8706159397787931,0.8719215735832349,0.8732257763999883,0.8745285551350127,0.8758299166469926,0.8771298677478033,0.8784284152029675,0.8797255657321087,0.881021326009397,0.8823157026639912,0.8836087022804741,0.8849003313992833,0.8861905965171359,0.8874795040874489,0.8887670605207536,0.8900532721851059,0.8913381454064904,0.892621686469221,0.8939039016163357,0.8951847970499869,0.896464378931827,0.8977426533833894,0.8990196264864654,0.9002953042834757,0.9015696927778382,0.9028427979343306,0.9041146256794508,0.9053851819017701,0.9066544724522846,0.9079225031447609,0.9091892797560793,0.9104548080265719,0.9117190936603565,0.9129821423256679,0.9142439596551842,0.91550455124635,0.9167639226616956,0.9180220794291524,0.9192790270423651,0.9205347709610003,0.9217893166110505,0.9230426693851368,0.9242948346428062,0.9255458177108257,0.9267956238834749,0.9280442584228334,0.9292917265590657,0.930538033490702,0.931783184384918,0.93302718437781,0.9342700385746662,0.9355117520502375,0.9367523298490026,0.937991776985432,0.9392300984442482,0.940467299180684,0.9417033841207362,0.9429383581614188,0.9441722261710115,0.9454049929893065,0.9466366634278525,0.9478672422701961,0.94909673427212,0.9503251441618799,0.9515524766404367,0.9527787363816898,0.9540039280327027,0.9552280562139324,0.9564511255194506,0.9576731405171663,0.9588941057490449,0.9601140257313242,0.9613329049547301,0.962550747884687,0.9637675589615297,0.9649833426007095,0.9661981031930014,0.9674118451047063,0.968624572677853,0.9698362902303972,0.9710470020564193,0.9722567124263185,0.973465425587007,0.974673145762101,0.9758798771521092,0.9770856239346216,0.978290390264493,0.9794941802740283,0.980696998073163,0.9818988477496432,0.9830997333692045,0.9842996589757467,0.9854986285915096,0.9866966462172453,0.9878937158323879,0.9890898413952256,0.9902850268430652,0.9914792760923996,0.9926725930390726,0.9938649815584398,0.9950564455055313,0.99624698871521,0.9974366150023303,0.9986253281618938,0.9998131319692045,1.0010000301800226,1.0021860265307143,1.0033711247384052,1.0045553285011262,1.005738641497963,1.006921067389201,1.0081026098164707,1.0092832724028897,1.0104630587532064,1.0116419724539385,1.0128200170735138,1.013997196162407,1.0151735132532762,1.0163489718610987,1.0175235754833052,1.0186973275999114,1.0198702316736497,1.0210422911501005,1.0222135094578197,1.023383890008468,1.0245534361969353,1.0257221514014683,1.0268900389837936,1.0280571022892413,1.0292233446468664,1.0303887693695692,1.031553379754217,1.0327171790817602,1.0338801706173515,1.0350423576104617,1.036203743294995,1.0373643308894038,1.0385241235968015,1.0396831246050744,1.0408413370869944,1.0419987642003274,1.043155409087944,1.0443112748779266,1.0454663646836777,1.0466206816040255,1.0477742287233294,1.0489270091115845,1.0500790258245254,1.0512302819037287,1.052380780376713,1.0535305242570425,1.054679516544426,1.0558277602248136,1.0569752582704974,1.0581220136402085,1.0592680292792123,1.0604133081194043,1.0615578530794054,1.0627016670646565,1.0638447529675095,1.0649871136673204,1.0661287520305427,1.0672696709108154,1.0684098731490537,1.0695493615735394,1.070688139000008,1.0718262082317365,1.0729635720596304,1.0741002332623102,1.075236194606196,1.0763714588455926,1.0775060287227747,1.0786399069680672,1.0797730962999308,1.0809055994250412,1.082037419038373,1.0831685578232775,1.0842990184515648,1.0854288035835815,1.086557915868289,1.0876863579433427,1.0888141324351677,1.0899412419590362,1.0910676891191438,1.0921934765086836,1.093318606709921,1.0944430822942692,1.0955669058223607,1.0966900798441221,1.0978126068988439,1.0989344895152546,1.1000557302115905,1.1011763314956662,1.1022962958649447,1.103415625806607,1.1045343237976204,1.105652392304807,1.106769833784912,1.107886650684669,1.1090028454408691,1.1101184204804255,1.1112333782204384,1.112347721068262,1.113461451421567,1.1145745716684061,1.1156870841872766,1.116798991347184,1.1179102955077043,1.1190209990190447,1.120131104222108,1.1212406134485509,1.122349529020846,1.1234578532523414,1.1245655884473202,1.1256727369010602,1.1267793008998919,1.1278852827212578,1.1289906846337683,1.1300955088972615,1.1311997577628583,1.1323034334730189,1.1334065382616,1.1345090743539101,1.135611043966763,1.1367124493085354,1.1378132925792186,1.1389135759704745,1.1400133016656873,1.1411124718400179,1.142211088660456,1.1433091542858738,1.1444066708670748,1.1455036405468493,1.146600065460022,1.1476959477335056,1.1487912894863488,1.1498860928297883,1.1509803598672972,1.152074092694635,1.1531672933998953,1.1542599640635571,1.1553521067585288,1.1564437235502005,1.1575348164964878,1.1586253876478816,1.159715439047493,1.1608049727311012,1.1618939907271988,1.1629824950570378,1.1640704877346746,1.1651579707670168,1.1662449461538646,1.16733141588796,1.1684173819550265,1.1695028463338157,1.1705878109961492,1.171672277906964,1.1727562490243524,1.1738397262996068,1.1749227116772616,1.1760052070951352,1.17708721448437,1.1781687357694772,1.1792497728683753,1.1803303276924304,1.1814104021464997,1.1824899981289692,1.1835691175317948,1.184647762240541,1.1857259341344215,1.1868036350863387,1.1878808669629195,1.1889576316245583,1.1900339309254524,1.19110976671364,1.1921851408310402,1.1932600551134886,1.1943345113907748,1.1954085114866806,1.1964820572190153,1.1975551503996535,1.1986277928345708,1.199699986323879,1.2007717326618643,1.2018430336370205,1.2029138910320847,1.2039843066240739,1.2050542821843178,1.2061238194784953,1.2071929202666676,1.2082615863033124,1.2093298193373583,1.2103976211122187,1.211464993365825,1.2125319378306596,1.2135984562337885,1.214664550296896,1.2157302217363148,1.2167954722630605,1.2178603035828628,1.2189247173961968,1.2199887153983167,1.2210522992792852,1.222115470724007,1.2231782314122568,1.2242405830187146,1.2253025272129927,1.2263640656596675,1.2274252000183106,1.228485931943518,1.2295462630849403,1.2306061950873128,1.231665729590485,1.232724868229449,1.2337836126343706,1.2348419644306163,1.2358999252387841,1.2369574966747305,1.2380146803495995,1.239071477869852,1.2401278908372915,1.241183920849095,1.2422395694978383,1.2432948383715254,1.244349729053614,1.2454042431230454,1.2464583821542687,1.24751214771727,1.2485655413775973,1.24961856469639,1.250671219230401,1.2517235065320271,1.2527754281493328,1.2538269856260769,1.2548781805017382,1.255929014311541,1.2569794885864813,1.258029604853352,1.2590793646347656,1.2601287694491843,1.2611778208109392,1.2622265202302598,1.2632748692132953,1.2643228692621409,1.265370521874861,1.2664178285455145,1.2674647907641772,1.2685114100169677,1.2695576877860688,1.2706036255497537,1.2716492247824067,1.2726944869545491,1.2737394135328608,1.2747840059802034,1.2758282657556432,1.2768721943144752,1.2779157931082443,1.2789590635847679,1.2800020071881595,1.281044625358849,1.2820869195336075,1.2831288911455667,1.2841705416242424,1.2852118723955548,1.2862528848818529,1.2872935805019323,1.2883339606710602,1.2893740268009939,1.290413780300003,1.2914532225728914,1.2924923550210166,1.2935311790423116,1.2945696960313051,1.295607907379142,1.2966458144736044,1.2976834186991315,1.2987207214368404,1.2997577240645446,1.3007944279567774,1.301830834484807,1.3028669450166614,1.3039027609171443,1.3049382835478565,1.3059735142672146,1.3070084544304716,1.3080431053897343,1.309077468493984,1.3101115450890957,1.311145336517856,1.3121788441199813,1.3132120692321396,1.3142450131879664,1.3152776773180848,1.316310062950122,1.3173421714087314,1.318374004015606,1.3194055620895009,1.3204368469462495,1.321467859898781,1.3224986022571399,1.3235290753285018,1.3245592804171942,1.3255892188247098,1.3266188918497286,1.3276483007881321,1.3286774469330227,1.3297063315747393,1.3307349560008757,1.3317633214962983,1.3327914293431604,1.3338192808209226,1.3348468772063675,1.3358742197736169,1.3369013097941491,1.3379281485368144,1.338954737267853,1.3399810772509102,1.3410071697470543,1.342033016014791,1.3430586173100814,1.3440839748863562,1.3451090899945346,1.3461339638830367,1.3471585977978031,1.3481829929823084,1.3492071506775765,1.3502310721221988,1.3512547585523478,1.3522782112017928,1.3533014313019167,1.3543244200817295,1.3553471787678852,1.3563697085846969,1.3573920107541497,1.3584140864959204,1.359435937027388,1.3604575635636509,1.3614789673175416,1.3625001494996414,1.3635211113182952,1.3645418539796261,1.3655623786875501,1.366582686643791,1.3676027790478944,1.3686226570972426,1.3696423219870686,1.370661774910471,1.3716810170584275,1.37270004961981,1.3737188737813977,1.374737490727892,1.3757559016419305,1.3767741077041005,1.377792110092953,1.378809909985017,1.3798275085548135,1.380844906974867,1.3818621064157228,1.3828791080459577,1.3838959130321942,1.3849125225391155,1.3859289377294768,1.3869451597641203,1.387961189801988,1.388977029000134,1.38999267851374,1.3910081394961258,1.3920234130987648,1.3930385004712955,1.3940534027615352,1.3950681211154927,1.3960826566773814,1.397097010589632,1.3981111839929061,1.3991251780261067,1.4001389938263944,1.4011526325291965,1.4021660952682227,1.403179383175475,1.4041924973812623,1.405205439014212,1.4062182092012818,1.4072308090677736,1.4082432397373448,1.40925550233202,1.4102675979722055,1.411279527776699,1.4122912928627027,1.4133028943458363,1.4143143333401478,1.415325610958126,1.4163367283107124,1.4173476865073136,1.4183584866558128,1.4193691298625812,1.4203796172324907,1.4213899498689255,1.4224001288737929,1.4234101553475367,1.4244200303891468,1.4254297550961725,1.4264393305647336,1.4274487578895312,1.4284580381638605,1.429467172479621,1.4304761619273287,1.4314850075961274,1.4324937105737994,1.4335022719467776,1.4345106928001568,1.4355189742177041,1.436527117281871,1.4375351230738043,1.4385429926733566,1.4395507271590984,1.4405583276083285,1.4415657950970853,1.4425731307001575,1.4435803354910959,1.4445874105422227,1.4455943569246446,1.446601175708261,1.4476078679617783,1.448614434752717,1.4496208771474246,1.450627196211086,1.4516333930077345,1.452639468600262,1.453645424050429,1.454651260418877,1.4556569787651374,1.4566625801476425,1.457668065623737,1.4586734362496874,1.4596786930806924,1.4606838371708948,1.4616888695733894,1.462693791340236,1.4636986035224686,1.464703307170105,1.4657079033321587,1.4667123930566475,1.4677167773906057,1.4687210573800924,1.4697252340702023,1.4707293085050772,1.4717332817279143,1.4727371547809773,1.4737409287056067,1.4747446045422286,1.4757481833303663,1.4767516661086497,1.4777550539148254,1.478758347785766,1.4797615487574813,1.480764657865128,1.4817676761430176,1.48277060462463,1.4837734443426194,1.4847761963288277,1.4857788616142917,1.4867814412292544,1.487783936203174,1.4887863475647338,1.4897886763418535,1.490790923561696,1.4917930902506797,1.4927951774344868,1.493797186138073,1.4947991173856787,1.4958009722008365,1.4968027516063824,1.4978044566244646,1.498806088276553,1.4998076475834496,1.500809135565298,1.5018105532415906,1.5028119016311823,1.503813181752296,1.5048143946225352,1.5058155412588912,1.5068166226777528,1.5078176398949186,1.5088185939256016,1.5098194857844427,1.510820316485519,1.5118210870423516,1.5128217984679164,1.5138224517746544,1.5148230479744782,1.5158235880787845,1.516824073098461,1.517824504043897,1.5188248819249914,1.5198252077511647,1.5208254825313652,1.5218257072740795,1.5228258829873422,1.5238260106787445,1.5248260913554437,1.5258261260241717,1.526826115691246,1.527826061362577,1.5288259640436777,1.5298258247396734,1.5308256444553106,1.5318254241949654,1.532825164962654,1.5338248677620414,1.534824533596449,1.535824163468866,1.5368237583819577,1.537823319338073,1.5388228473392562,1.5398223433872547,1.5408218084835268,1.5418212436292533,1.542820649825345,1.5438200280724523,1.5448193793709732,1.5458187047210648,1.5468180051226486,1.5478172815754232,1.5488165350788716,1.5498157666322696,1.5508149772346964,1.5518141678850421,1.552813339582018,1.5538124933241648,1.5548116301098616,1.5558107509373353,1.5568098568046695,1.5578089487098128,1.5588080276505885,1.559807094624704,1.5608061506297586,1.5618051966632531,1.562804233722599,1.5638032628051264,1.5648022849080945,1.5658013010287004,1.5668003121640854,1.5677993193113484,1.5687983234675509,1.5697973256297277,1.5707963267948968,1.5717953279600654,1.5727943301222422,1.5737933342784447,1.5747923414257077,1.575791352561093,1.5767903686816986,1.5777893907846672,1.5787884198671946,1.5797874569265402,1.5807865029600348,1.5817855589650893,1.5827846259392049,1.5837837048799803,1.5847827967851238,1.5857819026524578,1.5867810234799316,1.5877801602656283,1.5887793140077753,1.5897784857047512,1.590777676355097,1.5917768869575237,1.5927761185109217,1.59377537201437,1.594774648467145,1.5957739488687286,1.5967732742188199,1.597772625517341,1.598772003764448,1.59977140996054,1.6007708451062668,1.6017703102025385,1.6027698062505367,1.6037693342517203,1.6047688952078356,1.605768490120927,1.606768119993344,1.6077677858277517,1.6087674886271393,1.609767229394828,1.610767009134483,1.6117668288501201,1.6127666895461155,1.6137665922272162,1.6147665378985472,1.6157665275656214,1.61676656223435,1.6177666429110489,1.618766770602451,1.6197669463157138,1.6207671710584282,1.6217674458386284,1.6227677716648017,1.6237681495458967,1.624768580491332,1.6257690655110086,1.626769605615315,1.627770201815139,1.6287708551218767,1.6297715665474417,1.6307723371042742,1.6317731678053502,1.6327740596641915,1.6337750136948748,1.6347760309120403,1.6357771123309022,1.636778258967258,1.6377794718374972,1.638780751958611,1.6397821003482027,1.6407835180244954,1.6417850060063435,1.64278656531324,1.6437881969653287,1.6447899019834105,1.6457916813889566,1.6467935362041146,1.6477954674517201,1.6487974761553068,1.6497995633391136,1.650801730028097,1.6518039772479396,1.652806306025059,1.6538087173866194,1.654811212360539,1.6558137919755016,1.6568164572609656,1.6578192092471737,1.6588220489651633,1.6598249774467755,1.6608279957246654,1.6618311048323118,1.6628343058040274,1.663837599674968,1.6648409874811434,1.665844470259427,1.666848049047565,1.6678517248841864,1.6688554988088158,1.6698593718618788,1.6708633450847161,1.671867419519591,1.6728715962097012,1.6738758761991874,1.6748802605331456,1.6758847502576346,1.6768893464196881,1.6778940500673247,1.678898862249557,1.6799037840164037,1.6809088164188986,1.6819139605091007,1.682919217340106,1.6839245879660563,1.6849300734421506,1.6859356748246561,1.6869413931709163,1.687947229539364,1.6889531849895312,1.6899592605820588,1.6909654573787072,1.6919717764423687,1.6929782188370766,1.6939847856280148,1.694991477881532,1.6959982966651488,1.6970052430475704,1.6980123180986975,1.6990195228896356,1.7000268584927078,1.7010343259814646,1.7020419264306945,1.7030496609164367,1.704057530515989,1.7050655363079221,1.7060736793720892,1.7070819607896364,1.7080903816430153,1.709098943015994,1.710107645993666,1.7111164916624642,1.7121254811101723,1.7131346154259328,1.7141438957002617,1.7151533230250597,1.716162898493621,1.7171726232006466,1.7181824982422569,1.7191925247160005,1.7202027037208678,1.7212130363573026,1.7222235237272123,1.7232341669339803,1.7242449670824795,1.7252559252790807,1.7262670426316673,1.7272783202496456,1.7282897592439568,1.7293013607270904,1.7303131258130946,1.7313250556175879,1.7323371512577732,1.7333494138524488,1.7343618445220197,1.7353744443885115,1.7363872145755814,1.737400156208531,1.7384132704143183,1.739426558321571,1.7404400210605968,1.741453659763399,1.7424674755636864,1.7434814695968872,1.744495643000161,1.7455099969124117,1.7465245324743006,1.7475392508282583,1.7485541531184978,1.7495692404910286,1.7505845140936676,1.7515999750760534,1.7526156245896594,1.7536314637878054,1.7546474938256726,1.7556637158603166,1.7566801310506779,1.757696740557599,1.7587135455438356,1.7597305471740703,1.7607477466149262,1.7617651450349798,1.762782743604776,1.7638005434968402,1.7648185458856929,1.765836751947863,1.7668551628619011,1.7678737798083957,1.7688926039699835,1.7699116365313656,1.7709308786793223,1.7719503316027245,1.772969996492551,1.7739898745418992,1.7750099669460022,1.7760302749022432,1.7770507996101674,1.778071542271498,1.779092504090152,1.780113686272252,1.7811350900261425,1.782156716562405,1.7831785670938727,1.7842006428356434,1.7852229450050967,1.786245474821908,1.7872682335080634,1.7882912222878766,1.7893144423880003,1.7903378950374453,1.7913615814675945,1.7923855029122169,1.7934096606074847,1.7944340557919898,1.7954586897067564,1.7964835635952587,1.797508678703437,1.7985340362797118,1.7995596375750023,1.800585483842739,1.8016115763388827,1.8026379163219401,1.8036645050529792,1.804691343795644,1.8057184338161762,1.806745776383426,1.8077733727688705,1.8088012242466327,1.809829332093495,1.8108576975889172,1.8118863220150538,1.8129152066567706,1.813944352801661,1.8149737617400645,1.8160034347650835,1.8170333731725994,1.8180635782612915,1.8190940513326532,1.8201247936910119,1.8211558066435436,1.8221870915002922,1.8232186495741871,1.8242504821810621,1.825282590639671,1.8263149762717084,1.8273476404018267,1.8283805843576535,1.829413809469812,1.8304473170719378,1.831481108500697,1.8325151850958088,1.8335495482000592,1.8345841991593215,1.8356191393225785,1.8366543700419369,1.8376898926726488,1.838725708573132,1.8397618191049863,1.840798225633016,1.8418349295252483,1.8428719321529528,1.8439092348906618,1.8449468391161887,1.8459847462106511,1.847022957558488,1.8480614745474817,1.8491002985687766,1.850139431016902,1.8511788732897902,1.8522186267887994,1.853258692918733,1.8542990730878608,1.8553397687079403,1.8563807811942383,1.857422111965551,1.8584637624442264,1.8595057340561856,1.8605480282309443,1.861590646401634,1.8626335900050255,1.863676860481549,1.864720459275318,1.86576438783415,1.8668086476095898,1.8678532400569323,1.8688981666352442,1.8699434288073864,1.8709890280400399,1.8720349658037245,1.8730812435728255,1.8741278628256162,1.875174825044279,1.8762221317149321,1.8772697843276525,1.878317784376498,1.8793661333595335,1.8804148327788541,1.8814638841406093,1.8825132889550278,1.8835630487364414,1.8846131650033118,1.8856636392782522,1.8867144730880552,1.8877656679637167,1.8888172254404605,1.889869147057766,1.8909214343593923,1.8919740888934036,1.8930271122121958,1.8940805058725234,1.8951342714355244,1.8961884104667481,1.897242924536179,1.898297815218268,1.899353084091955,1.900408732740698,1.9014647627525019,1.9025211757199416,1.9035779732401934,1.904635156915063,1.905692728351009,1.9067506891591768,1.9078090409554227,1.9088677853603444,1.9099269239993082,1.9109864585024803,1.912046390504853,1.9131067216462754,1.9141674535714828,1.9152285879301258,1.9162901263768004,1.9173520705710785,1.9184144221775363,1.9194771828657866,1.920540354310508,1.9216039381914765,1.9226679361935963,1.9237323500069308,1.9247971813267326,1.9258624318534783,1.9269281032928975,1.9279941973560044,1.9290607157591337,1.930127660223968,1.9311950324775746,1.932262834252435,1.933331067286481,1.9343997333231258,1.935468834111298,1.9365383714054754,1.9376083469657193,1.9386787625577087,1.9397496199527726,1.9408209209279288,1.9418926672659143,1.9429648607552226,1.9440375031901396,1.945110596370778,1.9461841421031127,1.9472581421990183,1.9483325984763047,1.9494075127587531,1.950482886876153,1.9515587226643412,1.9526350219652346,1.9537117866268736,1.9547890185034549,1.9558667194553714,1.9569448913492524,1.9580235360579985,1.959102655460824,1.9601822514432934,1.961262325897363,1.962342880721418,1.9634239178203157,1.964505439105423,1.9655874464946583,1.9666699419125315,1.9677529272901864,1.9688364045654407,1.9699203756828294,1.971004842593644,1.9720898072559776,1.9731752716347668,1.9742612377018331,1.9753477074359282,1.976434682822777,1.9775221658551185,1.9786101585327556,1.9796986628625948,1.980787680858692,1.9818772145423005,1.9829672659419117,1.9840578370933053,1.985148930039593,1.9862405468312645,1.9873326895262362,1.9884253601898978,1.9895185608951584,1.9906122937224962,1.9917065607600053,1.9928013641034443,1.9938967058562875,1.9949925881297714,1.9960890130429436,1.997185982722718,1.9982834993039198,1.999381564929337,2.0004801817497757,2.001579351924106,2.0026790776193186,2.0037793610105745,2.0048802042812577,2.00598160962303,2.0070835792358834,2.008186115328193,2.0092892201167745,2.0103928958269353,2.0114971446925316,2.012601968956025,2.0137073708685356,2.0148133526899015,2.015919916688733,2.017027065142473,2.0181348003374517,2.0192431245689475,2.0203520401412423,2.021461549367685,2.0225716545707484,2.0236823580820893,2.024793662242609,2.025905569402516,2.027018081921387,2.0281312021682263,2.0292449325215314,2.0303592753693547,2.0314742331093676,2.032589808148924,2.033706002905124,2.0348228198048814,2.035940261284986,2.037058329792173,2.0381770277831865,2.0392963577248486,2.040416322094127,2.0415369233782026,2.0426581640745387,2.0437800466909493,2.044902573745671,2.046025747767432,2.047149571295524,2.048274046879872,2.04939917708111,2.0505249644706494,2.0516514116307567,2.0527785211546257,2.0539062956464504,2.0550347377215044,2.056163850006212,2.057293635138228,2.0584240957665156,2.0595552345514205,2.060687054164752,2.0618195572898625,2.0629527466217263,2.064086624867018,2.0652211947442005,2.066356458983597,2.067492420327483,2.0686290815301627,2.0697664453580567,2.0709045145897855,2.0720432920162537,2.0731827804407397,2.0743229826789777,2.0754639015592504,2.0766055399224728,2.077747900622284,2.0788909865251366,2.0800348005103872,2.0811793454703893,2.0823246243105813,2.0834706399495846,2.0846173953192957,2.0857648933649795,2.0869131370453675,2.0880621293327506,2.0892118732130807,2.090362371686065,2.0915136277652677,2.092665644478209,2.093818424866464,2.0949719719857676,2.0961262889061154,2.097281378711867,2.0984372445018495,2.0995938893894657,2.100751316502799,2.1019095289847187,2.1030685299929917,2.1042283227003895,2.1053889102947982,2.106550295979331,2.1077124829724414,2.108875474508033,2.110039273835576,2.111203884220224,2.112369308942927,2.113535551300552,2.1147026146059993,2.1158705021883253,2.1170392173928576,2.1182087635813254,2.1193791441319734,2.120550362439693,2.1217224219161435,2.122895325989882,2.124069078106488,2.125243681728694,2.1264191403365174,2.127595457427386,2.1287726365162793,2.1299506811358544,2.1311295948365867,2.1323093811869036,2.133490043773323,2.134671586200592,2.1358540120918303,2.1370373250886674,2.138221528851388,2.1394066270590786,2.1405926234097707,2.1417795216205886,2.1429673254278994,2.1441560385874627,2.1453456648745837,2.146536208084262,2.1477276720313534,2.1489200605507204,2.1501133774973935,2.151307626746728,2.1525028121945677,2.1536989377574054,2.154896007372548,2.1560940249982834,2.1572929946140462,2.158492920220589,2.15969380584015,2.1608956555166303,2.162098473315765,2.1633022633253005,2.164507029655172,2.165712776437684,2.1669195078276924,2.168127228002786,2.1693359411634745,2.170545651533374,2.1717563633593957,2.1729680809119403,2.1741808084850867,2.1753945503967915,2.176609310989084,2.1778250946282633,2.1790419057051063,2.180259748635063,2.181478627858469,2.182698547840748,2.1839195130726274,2.185141528070343,2.1863645973758605,2.1875887255570907,2.1888139172081034,2.1900401769493563,2.191267509427914,2.192495919317673,2.193725411319597,2.1949559901619407,2.1961876606004864,2.1974204274187814,2.1986542954283745,2.1998892694690566,2.201125354409109,2.2023625551455455,2.2036008766043613,2.2048403237407905,2.2060809015395555,2.2073226150151273,2.208565469211983,2.209809469204875,2.211054620099091,2.2123009270307277,2.2135483951669594,2.214797029706318,2.2160468358789673,2.217297818946987,2.2185499842046568,2.219803336978743,2.2210578826287932,2.222313626547428,2.223570574160641,2.224828730928097,2.226088102343443,2.2273486939346094,2.2286105112641255,2.2298735599294366,2.2311378455632216,2.232403373833714,2.2336701504450325,2.234938181137508,2.236207471688023,2.237478027910343,2.238749855655463,2.240022960811955,2.2412973493063175,2.2425730271033277,2.243850000206404,2.2451282746579664,2.2464078565398062,2.2476887519734574,2.248970967120572,2.2502545081833025,2.251539381404687,2.2528255930690397,2.254113149502344,2.2554020570726574,2.25669232219051,2.257983951309319,2.2592769509258024,2.2605713275803963,2.2618670878576843,2.2631642383868256,2.2644627858419897,2.2657627369428006,2.2670640984547807,2.2683668771898047,2.2696710800065585,2.270976713811,2.2722837855568327,2.2735923022459783,2.2749022709290596,2.2762136987058894,2.2775265927259625,2.2788409601889583,2.2801568083452475,2.281474144496402,2.282792975995723,2.284113310248758,2.2854351547138423,2.286758516902637,2.288083404380676,2.289409824767922,2.29073778573933,2.292067295025414,2.293398360412829,2.2947309897449513,2.2960651909224734,2.2974009719040063,2.298738340706686,2.3000773054067922,2.301417874140371,2.302760055103874,2.3041038565547947,2.3054492868123235,2.3067963542580077,2.3081450673364188,2.3094954345558323,2.310847464488915,2.3122011657734234,2.313556547112907,2.314913617277431,2.316272385104298,2.317632859498786,2.318995049434898,2.3203589639561173,2.321724612176177,2.323092003279841,2.3244611465236913,2.325832051236933,2.327204726822205,2.3285791827564086,2.3299554285915387,2.3313334739555405,2.3327133285531634,2.3340950021668387,2.335478504657567,2.336863845965814,2.3382510361124282,2.3396400851995636,2.3410310034116195,2.3424238010161984,2.34381848836507,2.3452150758951547,2.346613574129522,2.3480139936784035,2.349416345240217,2.350820639602614,2.352226887643536,2.3536351003322897,2.355045288730639,2.3564574639939164,2.357871637372141,2.35928782021117,2.360706023953852,2.36212626014121,2.363548540413637,2.364972876512111,2.3663992802794316,2.367827763661472,2.369258338708455,2.3706910175762457,2.372125812527669,2.3735627359338443,2.3750018002755406,2.3764430181445606,2.3778864022451414,2.379331965395373,2.3807797205286545,2.382229680695161,2.383681859063336,2.385136268921422,2.3865929236789922,2.388051836868531,2.389513022147027,2.390976493297598,2.392442264231142,2.3939103489880145,2.3953807617397374,2.3968535167907326,2.398328628580091,2.3998061116833647,2.4012859808143965,2.4027682508271773,2.4042529367177323,2.4057400536260523,2.4072296168380394,2.408721641787509,2.4102161440582055,2.411713139385871,2.413212643660337,2.4147146729276656,2.4162192433923178,2.4177263714193673,2.4192360735367524,2.420748366437568,2.4222632669824007,2.423780792201704,2.4253009592982178,2.426823785649435,2.428349288810108,2.429877486514807,2.4314083966805233,2.4329420374093207,2.434478426991036,2.4360175839060334,2.437559526828011,2.4391042746268505,2.4406518463715394,2.442202261333131,2.4437555389877734,2.4453116990197903,2.4468707613248233,2.4484327460130393,2.4499976734123923,2.451565564071957,2.4531364387653234,2.454710318494061,2.456287224491251,2.457867178225086,2.459450201402551,2.461036315973168,2.462625544132819,2.464217908327655,2.4658134312580717,2.4674121358827774,2.4690140454229392,2.4706191833664155,2.4722275734720807,2.4738392397742333,2.475454206587102,2.4770724985094468,2.4786941404292517,2.480319157528525,2.4819475752881957,2.483579419493122,2.4852147162372007,2.4868534919285907,2.488495773295053,2.4901415873894006,2.491790961595081,2.4934439236318626,2.495100501561668,2.4967607237945266,2.4984246190946595,2.500092216586706,2.501763545762094,2.503438636485547,2.5051175190017476,2.5068002239421507,2.5084867823319543,2.5101772255972365,2.511871585572255,2.513569894506916,2.51527218507443,2.5169784903791363,2.518688843964523,2.520403279821439,2.5221218323964956,2.523844536600686,2.5255714278182047,2.527302541915483,2.5290379152504547,2.5307775846820437,2.532521587579895,2.534269961834342,2.5360227458666333,2.53777997863941,2.5395416996674607,2.5413079490287407,2.543078767375684,2.544854195946805,2.546634276578605,2.548419051717785,2.55020856443379,2.5520028584316785,2.5538019780653425,2.555605968351072,2.557414874981501,2.5592287443399173,2.5610476235149746,2.562871560315807,2.5647006032875534,2.5665348017273324,2.568374205700642,2.570218866058242,2.5720688344535083,2.573924163360272,2.575784906091193,2.5776511168166456,2.5795228505841665,2.5814001633384613,2.5832831119420163,2.585171754196305,2.587066148863644,2.5889663556896934,2.5908724354266495,2.5927844498571355,2.594702461818836,2.5966265352298787,2.5985567351150203,2.6004931276326473,2.6024357801026246,2.604384761035037,2.606340140159843,2.6083019884574927,2.6102703781905348,2.612245382936254,2.6142270776203924,2.6162155385519807,2.6182108434593445,2.6202130715273073,2.6222223034356773,2.624238621399031,2.6262621092078744,2.62829285227124,2.6303309376607613,2.6323764541563133,2.6344294922932665,2.6364901444114395,2.6385585047058164,2.6406346692791067,2.642718736196244,2.6448108055408923,2.6469109794740615,2.64901936229493,2.651136060503976,2.6532611828685195,2.65539484049079,2.657537146878658,2.6596882180191255,2.661848172454733,2.6640171313630256,2.6661952186392117,2.6683825609821867,2.6705792879840935,2.672785532223582,2.6750014293629754,2.6772271182495295,2.6794627410210134,2.681708443215818,2.683964373887858,2.686230685726497,2.6885075351817926,2.690795082595336,2.6930934923369927,2.6954029329478946,2.6977235772900015,2.7000556027026454,2.7023991911664207,2.7047545294748745,2.7071218094144385,2.7095012279531074,2.711892987438369,2.714297295804958,2.7167143667930436,2.719144420177478,2.721587682008818,2.7240443848668554,2.7265147681274655,2.7289990782436275,2.7314975690415726,2.7340105020330303,2.7365381467446848,2.739080781066011,2.741638691616739,2.744212174135346,2.7468015338900322,2.749407086113833,2.752029156465584,2.7546680815186555,2.7573242092795365,2.7599978997385204,2.762689525454941,2.7653994721796753,2.7681281395178248,2.770875941634804,2.7736433080093628,2.776430684237418,2.7792385328909157,2.7820673344364515,2.78491758821876,2.7877898135147907,2.7906845506646456,2.793602362286361,2.796543834582219,2.799509578745209,2.8025002324751402,2.805516461615068,2.80855896191989,2.8116284609704114,2.814725720247761,2.8178515373849002,2.821006748614037,2.824192231431213,2.8274089075020714,2.8306577458360223,2.8339397662597716,2.837256043225425,2.8406077099934115,2.84399596323636,2.8474220681168387,2.850887363899984,2.8543932701715344,2.8579412937430315,2.86153303633932,2.865170203179501,2.8688546125815653,2.872588206744053,2.8763730638859673,2.880211411960091,2.8841056441963073,2.888058336782583,2.892072269054205,2.8961504466403714,2.900296128115438,2.904512855825949,2.908804491722087,2.9131752592236717,2.917629792411285,2.9221731941725433,2.9268111053803403,2.9315497877742365,2.936396224016011,2.94135823947975,2.9464446518410994,2.951665456637678,2.957032059973097,2.9625575738852543,2.968257196325838,2.974148707404932,2.980253128580565,2.9865956153839877,2.993206693537321,3.0001240151751363,3.007394930597911,3.0150803924988554,3.023261148200413,3.032048109209717,3.041600965048669,3.0521648259643546,3.064152338519952,3.078368169597411,3.0968899159295704,3.141592653589793],"x":[0.0,0.0004995004995004995,0.000999000999000999,0.0014985014985014985,0.001998001998001998,0.0024975024975024975,0.002997002997002997,0.0034965034965034965,0.003996003996003996,0.004495504495504496,0.004995004995004995,0.005494505494505495,0.005994005994005994,0.006493506493506494,0.006993006993006993,0.007492507492507493,0.007992007992007992,0.008491508491508492,0.008991008991008992,0.00949050949050949,0.00999000999000999,0.01048951048951049,0.01098901098901099,0.011488511488511488,0.011988011988011988,0.012487512487512488,0.012987012987012988,0.013486513486513486,0.013986013986013986,0.014485514485514486,0.014985014985014986,0.015484515484515484,0.015984015984015984,0.016483516483516484,0.016983016983016984,0.017482517482517484,0.017982017982017984,0.01848151848151848,0.01898101898101898,0.01948051948051948,0.01998001998001998,0.02047952047952048,0.02097902097902098,0.02147852147852148,0.02197802197802198,0.022477522477522476,0.022977022977022976,0.023476523476523476,0.023976023976023976,0.024475524475524476,0.024975024975024976,0.025474525474525476,0.025974025974025976,0.026473526473526472,0.026973026973026972,0.027472527472527472,0.027972027972027972,0.028471528471528472,0.028971028971028972,0.029470529470529472,0.029970029970029972,0.030469530469530468,0.030969030969030968,0.03146853146853147,0.03196803196803197,0.032467532467532464,0.03296703296703297,0.033466533466533464,0.03396603396603397,0.034465534465534464,0.03496503496503497,0.035464535464535464,0.03596403596403597,0.036463536463536464,0.03696303696303696,0.037462537462537464,0.03796203796203796,0.038461538461538464,0.03896103896103896,0.039460539460539464,0.03996003996003996,0.040459540459540456,0.04095904095904096,0.041458541458541456,0.04195804195804196,0.042457542457542456,0.04295704295704296,0.043456543456543456,0.04395604395604396,0.044455544455544456,0.04495504495504495,0.045454545454545456,0.04595404595404595,0.046453546453546456,0.04695304695304695,0.047452547452547456,0.04795204795204795,0.04845154845154845,0.04895104895104895,0.04945054945054945,0.04995004995004995,0.05044955044955045,0.05094905094905095,0.05144855144855145,0.05194805194805195,0.05244755244755245,0.052947052947052944,0.05344655344655345,0.053946053946053944,0.05444555444555445,0.054945054945054944,0.05544455544455545,0.055944055944055944,0.05644355644355644,0.056943056943056944,0.05744255744255744,0.057942057942057944,0.05844155844155844,0.058941058941058944,0.05944055944055944,0.059940059940059943,0.06043956043956044,0.060939060939060936,0.06143856143856144,0.061938061938061936,0.06243756243756244,0.06293706293706294,0.06343656343656344,0.06393606393606394,0.06443556443556443,0.06493506493506493,0.06543456543456544,0.06593406593406594,0.06643356643356643,0.06693306693306693,0.06743256743256744,0.06793206793206794,0.06843156843156843,0.06893106893106893,0.06943056943056942,0.06993006993006994,0.07042957042957043,0.07092907092907093,0.07142857142857142,0.07192807192807193,0.07242757242757243,0.07292707292707293,0.07342657342657342,0.07392607392607392,0.07442557442557443,0.07492507492507493,0.07542457542457542,0.07592407592407592,0.07642357642357642,0.07692307692307693,0.07742257742257742,0.07792207792207792,0.07842157842157842,0.07892107892107893,0.07942057942057942,0.07992007992007992,0.08041958041958042,0.08091908091908091,0.08141858141858142,0.08191808191808192,0.08241758241758242,0.08291708291708291,0.08341658341658342,0.08391608391608392,0.08441558441558442,0.08491508491508491,0.08541458541458541,0.08591408591408592,0.08641358641358642,0.08691308691308691,0.08741258741258741,0.08791208791208792,0.08841158841158842,0.08891108891108891,0.08941058941058941,0.0899100899100899,0.09040959040959042,0.09090909090909091,0.09140859140859141,0.0919080919080919,0.0924075924075924,0.09290709290709291,0.09340659340659341,0.0939060939060939,0.0944055944055944,0.09490509490509491,0.09540459540459541,0.0959040959040959,0.0964035964035964,0.0969030969030969,0.09740259740259741,0.0979020979020979,0.0984015984015984,0.0989010989010989,0.09940059940059941,0.0999000999000999,0.1003996003996004,0.1008991008991009,0.10139860139860139,0.1018981018981019,0.1023976023976024,0.1028971028971029,0.10339660339660339,0.1038961038961039,0.1043956043956044,0.1048951048951049,0.10539460539460539,0.10589410589410589,0.1063936063936064,0.1068931068931069,0.10739260739260739,0.10789210789210789,0.10839160839160839,0.1088911088911089,0.10939060939060939,0.10989010989010989,0.11038961038961038,0.1108891108891109,0.11138861138861139,0.11188811188811189,0.11238761238761238,0.11288711288711288,0.11338661338661339,0.11388611388611389,0.11438561438561438,0.11488511488511488,0.11538461538461539,0.11588411588411589,0.11638361638361638,0.11688311688311688,0.11738261738261738,0.11788211788211789,0.11838161838161838,0.11888111888111888,0.11938061938061938,0.11988011988011989,0.12037962037962038,0.12087912087912088,0.12137862137862138,0.12187812187812187,0.12237762237762238,0.12287712287712288,0.12337662337662338,0.12387612387612387,0.12437562437562437,0.12487512487512488,0.12537462537462538,0.1258741258741259,0.12637362637362637,0.12687312687312688,0.12737262737262736,0.12787212787212787,0.12837162837162838,0.12887112887112886,0.12937062937062938,0.12987012987012986,0.13036963036963037,0.13086913086913088,0.13136863136863136,0.13186813186813187,0.13236763236763235,0.13286713286713286,0.13336663336663337,0.13386613386613386,0.13436563436563437,0.13486513486513488,0.13536463536463536,0.13586413586413587,0.13636363636363635,0.13686313686313686,0.13736263736263737,0.13786213786213786,0.13836163836163837,0.13886113886113885,0.13936063936063936,0.13986013986013987,0.14035964035964035,0.14085914085914086,0.14135864135864135,0.14185814185814186,0.14235764235764237,0.14285714285714285,0.14335664335664336,0.14385614385614387,0.14435564435564435,0.14485514485514486,0.14535464535464535,0.14585414585414586,0.14635364635364637,0.14685314685314685,0.14735264735264736,0.14785214785214784,0.14835164835164835,0.14885114885114886,0.14935064935064934,0.14985014985014986,0.15034965034965034,0.15084915084915085,0.15134865134865136,0.15184815184815184,0.15234765234765235,0.15284715284715283,0.15334665334665334,0.15384615384615385,0.15434565434565434,0.15484515484515485,0.15534465534465536,0.15584415584415584,0.15634365634365635,0.15684315684315683,0.15734265734265734,0.15784215784215785,0.15834165834165834,0.15884115884115885,0.15934065934065933,0.15984015984015984,0.16033966033966035,0.16083916083916083,0.16133866133866134,0.16183816183816183,0.16233766233766234,0.16283716283716285,0.16333666333666333,0.16383616383616384,0.16433566433566432,0.16483516483516483,0.16533466533466534,0.16583416583416583,0.16633366633366634,0.16683316683316685,0.16733266733266733,0.16783216783216784,0.16833166833166832,0.16883116883116883,0.16933066933066934,0.16983016983016982,0.17032967032967034,0.17082917082917082,0.17132867132867133,0.17182817182817184,0.17232767232767232,0.17282717282717283,0.17332667332667331,0.17382617382617382,0.17432567432567433,0.17482517482517482,0.17532467532467533,0.17582417582417584,0.17632367632367632,0.17682317682317683,0.1773226773226773,0.17782217782217782,0.17832167832167833,0.17882117882117882,0.17932067932067933,0.1798201798201798,0.18031968031968032,0.18081918081918083,0.1813186813186813,0.18181818181818182,0.1823176823176823,0.18281718281718282,0.18331668331668333,0.1838161838161838,0.18431568431568432,0.1848151848151848,0.1853146853146853,0.18581418581418582,0.1863136863136863,0.18681318681318682,0.18731268731268733,0.1878121878121878,0.18831168831168832,0.1888111888111888,0.1893106893106893,0.18981018981018982,0.1903096903096903,0.19080919080919082,0.1913086913086913,0.1918081918081918,0.19230769230769232,0.1928071928071928,0.1933066933066933,0.1938061938061938,0.1943056943056943,0.19480519480519481,0.1953046953046953,0.1958041958041958,0.1963036963036963,0.1968031968031968,0.1973026973026973,0.1978021978021978,0.1983016983016983,0.19880119880119881,0.1993006993006993,0.1998001998001998,0.2002997002997003,0.2007992007992008,0.2012987012987013,0.2017982017982018,0.2022977022977023,0.20279720279720279,0.2032967032967033,0.2037962037962038,0.2042957042957043,0.2047952047952048,0.20529470529470528,0.2057942057942058,0.2062937062937063,0.20679320679320679,0.2072927072927073,0.2077922077922078,0.2082917082917083,0.2087912087912088,0.20929070929070928,0.2097902097902098,0.2102897102897103,0.21078921078921078,0.2112887112887113,0.21178821178821178,0.2122877122877123,0.2127872127872128,0.21328671328671328,0.2137862137862138,0.21428571428571427,0.21478521478521478,0.2152847152847153,0.21578421578421578,0.2162837162837163,0.21678321678321677,0.21728271728271728,0.2177822177822178,0.21828171828171827,0.21878121878121878,0.2192807192807193,0.21978021978021978,0.2202797202797203,0.22077922077922077,0.22127872127872128,0.2217782217782218,0.22227772227772227,0.22277722277722278,0.22327672327672327,0.22377622377622378,0.2242757242757243,0.22477522477522477,0.22527472527472528,0.22577422577422576,0.22627372627372627,0.22677322677322678,0.22727272727272727,0.22777222777222778,0.22827172827172826,0.22877122877122877,0.22927072927072928,0.22977022977022976,0.23026973026973027,0.23076923076923078,0.23126873126873126,0.23176823176823177,0.23226773226773226,0.23276723276723277,0.23326673326673328,0.23376623376623376,0.23426573426573427,0.23476523476523475,0.23526473526473526,0.23576423576423577,0.23626373626373626,0.23676323676323677,0.23726273726273725,0.23776223776223776,0.23826173826173827,0.23876123876123875,0.23926073926073926,0.23976023976023977,0.24025974025974026,0.24075924075924077,0.24125874125874125,0.24175824175824176,0.24225774225774227,0.24275724275724275,0.24325674325674326,0.24375624375624375,0.24425574425574426,0.24475524475524477,0.24525474525474525,0.24575424575424576,0.24625374625374624,0.24675324675324675,0.24725274725274726,0.24775224775224775,0.24825174825174826,0.24875124875124874,0.24925074925074925,0.24975024975024976,0.25024975024975027,0.25074925074925075,0.25124875124875123,0.2517482517482518,0.25224775224775225,0.25274725274725274,0.2532467532467532,0.25374625374625376,0.25424575424575424,0.2547452547452547,0.25524475524475526,0.25574425574425574,0.2562437562437562,0.25674325674325676,0.25724275724275725,0.25774225774225773,0.25824175824175827,0.25874125874125875,0.25924075924075923,0.2597402597402597,0.26023976023976025,0.26073926073926074,0.2612387612387612,0.26173826173826176,0.26223776223776224,0.2627372627372627,0.26323676323676326,0.26373626373626374,0.2642357642357642,0.2647352647352647,0.26523476523476525,0.26573426573426573,0.2662337662337662,0.26673326673326675,0.26723276723276723,0.2677322677322677,0.26823176823176825,0.26873126873126874,0.2692307692307692,0.26973026973026976,0.27022977022977024,0.2707292707292707,0.2712287712287712,0.27172827172827174,0.2722277722277722,0.2727272727272727,0.27322677322677325,0.27372627372627373,0.2742257742257742,0.27472527472527475,0.27522477522477523,0.2757242757242757,0.2762237762237762,0.27672327672327673,0.2772227772227772,0.2777222777222777,0.27822177822177824,0.2787212787212787,0.2792207792207792,0.27972027972027974,0.2802197802197802,0.2807192807192807,0.28121878121878124,0.2817182817182817,0.2822177822177822,0.2827172827172827,0.28321678321678323,0.2837162837162837,0.2842157842157842,0.28471528471528473,0.2852147852147852,0.2857142857142857,0.28621378621378624,0.2867132867132867,0.2872127872127872,0.28771228771228774,0.2882117882117882,0.2887112887112887,0.2892107892107892,0.2897102897102897,0.2902097902097902,0.2907092907092907,0.29120879120879123,0.2917082917082917,0.2922077922077922,0.29270729270729273,0.2932067932067932,0.2937062937062937,0.2942057942057942,0.2947052947052947,0.2952047952047952,0.2957042957042957,0.2962037962037962,0.2967032967032967,0.2972027972027972,0.2977022977022977,0.2982017982017982,0.2987012987012987,0.29920079920079923,0.2997002997002997,0.3001998001998002,0.3006993006993007,0.3011988011988012,0.3016983016983017,0.3021978021978022,0.3026973026973027,0.3031968031968032,0.3036963036963037,0.3041958041958042,0.3046953046953047,0.3051948051948052,0.30569430569430567,0.3061938061938062,0.3066933066933067,0.30719280719280717,0.3076923076923077,0.3081918081918082,0.3086913086913087,0.3091908091908092,0.3096903096903097,0.3101898101898102,0.3106893106893107,0.3111888111888112,0.3116883116883117,0.31218781218781216,0.3126873126873127,0.3131868131868132,0.31368631368631367,0.3141858141858142,0.3146853146853147,0.31518481518481517,0.3156843156843157,0.3161838161838162,0.3166833166833167,0.31718281718281716,0.3176823176823177,0.3181818181818182,0.31868131868131866,0.3191808191808192,0.3196803196803197,0.32017982017982016,0.3206793206793207,0.3211788211788212,0.32167832167832167,0.3221778221778222,0.3226773226773227,0.32317682317682317,0.32367632367632365,0.3241758241758242,0.3246753246753247,0.32517482517482516,0.3256743256743257,0.3261738261738262,0.32667332667332666,0.3271728271728272,0.3276723276723277,0.32817182817182816,0.32867132867132864,0.3291708291708292,0.32967032967032966,0.33016983016983015,0.3306693306693307,0.33116883116883117,0.33166833166833165,0.3321678321678322,0.33266733266733267,0.33316683316683315,0.3336663336663337,0.3341658341658342,0.33466533466533466,0.33516483516483514,0.3356643356643357,0.33616383616383616,0.33666333666333664,0.3371628371628372,0.33766233766233766,0.33816183816183815,0.3386613386613387,0.33916083916083917,0.33966033966033965,0.34015984015984013,0.34065934065934067,0.34115884115884115,0.34165834165834164,0.3421578421578422,0.34265734265734266,0.34315684315684314,0.3436563436563437,0.34415584415584416,0.34465534465534464,0.3451548451548452,0.34565434565434566,0.34615384615384615,0.34665334665334663,0.34715284715284717,0.34765234765234765,0.34815184815184813,0.34865134865134867,0.34915084915084915,0.34965034965034963,0.3501498501498502,0.35064935064935066,0.35114885114885114,0.3516483516483517,0.35214785214785216,0.35264735264735264,0.3531468531468531,0.35364635364635366,0.35414585414585414,0.3546453546453546,0.35514485514485516,0.35564435564435565,0.35614385614385613,0.35664335664335667,0.35714285714285715,0.35764235764235763,0.3581418581418581,0.35864135864135865,0.35914085914085914,0.3596403596403596,0.36013986013986016,0.36063936063936064,0.3611388611388611,0.36163836163836166,0.36213786213786214,0.3626373626373626,0.36313686313686316,0.36363636363636365,0.36413586413586413,0.3646353646353646,0.36513486513486515,0.36563436563436563,0.3661338661338661,0.36663336663336665,0.36713286713286714,0.3676323676323676,0.36813186813186816,0.36863136863136864,0.3691308691308691,0.3696303696303696,0.37012987012987014,0.3706293706293706,0.3711288711288711,0.37162837162837165,0.37212787212787213,0.3726273726273726,0.37312687312687315,0.37362637362637363,0.3741258741258741,0.37462537462537465,0.37512487512487513,0.3756243756243756,0.3761238761238761,0.37662337662337664,0.3771228771228771,0.3776223776223776,0.37812187812187814,0.3786213786213786,0.3791208791208791,0.37962037962037964,0.3801198801198801,0.3806193806193806,0.3811188811188811,0.38161838161838163,0.3821178821178821,0.3826173826173826,0.38311688311688313,0.3836163836163836,0.3841158841158841,0.38461538461538464,0.3851148851148851,0.3856143856143856,0.38611388611388614,0.3866133866133866,0.3871128871128871,0.3876123876123876,0.3881118881118881,0.3886113886113886,0.3891108891108891,0.38961038961038963,0.3901098901098901,0.3906093906093906,0.39110889110889113,0.3916083916083916,0.3921078921078921,0.3926073926073926,0.3931068931068931,0.3936063936063936,0.3941058941058941,0.3946053946053946,0.3951048951048951,0.3956043956043956,0.3961038961038961,0.3966033966033966,0.3971028971028971,0.39760239760239763,0.3981018981018981,0.3986013986013986,0.3991008991008991,0.3996003996003996,0.4000999000999001,0.4005994005994006,0.4010989010989011,0.4015984015984016,0.4020979020979021,0.4025974025974026,0.4030969030969031,0.4035964035964036,0.40409590409590407,0.4045954045954046,0.4050949050949051,0.40559440559440557,0.4060939060939061,0.4065934065934066,0.4070929070929071,0.4075924075924076,0.4080919080919081,0.4085914085914086,0.4090909090909091,0.4095904095904096,0.4100899100899101,0.41058941058941056,0.4110889110889111,0.4115884115884116,0.41208791208791207,0.4125874125874126,0.4130869130869131,0.41358641358641357,0.4140859140859141,0.4145854145854146,0.4150849150849151,0.4155844155844156,0.4160839160839161,0.4165834165834166,0.41708291708291706,0.4175824175824176,0.4180819180819181,0.41858141858141856,0.4190809190809191,0.4195804195804196,0.42007992007992007,0.4205794205794206,0.4210789210789211,0.42157842157842157,0.42207792207792205,0.4225774225774226,0.4230769230769231,0.42357642357642356,0.4240759240759241,0.4245754245754246,0.42507492507492506,0.4255744255744256,0.4260739260739261,0.42657342657342656,0.4270729270729271,0.4275724275724276,0.42807192807192807,0.42857142857142855,0.4290709290709291,0.42957042957042957,0.43006993006993005,0.4305694305694306,0.43106893106893107,0.43156843156843155,0.4320679320679321,0.4325674325674326,0.43306693306693306,0.43356643356643354,0.4340659340659341,0.43456543456543456,0.43506493506493504,0.4355644355644356,0.43606393606393606,0.43656343656343655,0.4370629370629371,0.43756243756243757,0.43806193806193805,0.4385614385614386,0.43906093906093907,0.43956043956043955,0.44005994005994004,0.4405594405594406,0.44105894105894106,0.44155844155844154,0.4420579420579421,0.44255744255744256,0.44305694305694304,0.4435564435564436,0.44405594405594406,0.44455544455544455,0.44505494505494503,0.44555444555444557,0.44605394605394605,0.44655344655344653,0.44705294705294707,0.44755244755244755,0.44805194805194803,0.4485514485514486,0.44905094905094906,0.44955044955044954,0.4500499500499501,0.45054945054945056,0.45104895104895104,0.4515484515484515,0.45204795204795206,0.45254745254745254,0.453046953046953,0.45354645354645357,0.45404595404595405,0.45454545454545453,0.45504495504495507,0.45554445554445555,0.45604395604395603,0.4565434565434565,0.45704295704295705,0.45754245754245754,0.458041958041958,0.45854145854145856,0.45904095904095904,0.4595404595404595,0.46003996003996006,0.46053946053946054,0.461038961038961,0.46153846153846156,0.46203796203796205,0.46253746253746253,0.463036963036963,0.46353646353646355,0.46403596403596403,0.4645354645354645,0.46503496503496505,0.46553446553446554,0.466033966033966,0.46653346653346656,0.46703296703296704,0.4675324675324675,0.468031968031968,0.46853146853146854,0.469030969030969,0.4695304695304695,0.47002997002997005,0.47052947052947053,0.471028971028971,0.47152847152847155,0.47202797202797203,0.4725274725274725,0.47302697302697305,0.47352647352647353,0.474025974025974,0.4745254745254745,0.47502497502497504,0.4755244755244755,0.476023976023976,0.47652347652347654,0.477022977022977,0.4775224775224775,0.47802197802197804,0.4785214785214785,0.479020979020979,0.47952047952047955,0.48001998001998003,0.4805194805194805,0.481018981018981,0.48151848151848153,0.482017982017982,0.4825174825174825,0.48301698301698304,0.4835164835164835,0.484015984015984,0.48451548451548454,0.485014985014985,0.4855144855144855,0.486013986013986,0.4865134865134865,0.487012987012987,0.4875124875124875,0.48801198801198803,0.4885114885114885,0.489010989010989,0.48951048951048953,0.49000999000999,0.4905094905094905,0.49100899100899104,0.4915084915084915,0.492007992007992,0.4925074925074925,0.493006993006993,0.4935064935064935,0.494005994005994,0.4945054945054945,0.495004995004995,0.4955044955044955,0.49600399600399603,0.4965034965034965,0.497002997002997,0.4975024975024975,0.498001998001998,0.4985014985014985,0.499000999000999,0.4995004995004995,0.5,0.5004995004995005,0.500999000999001,0.5014985014985015,0.501998001998002,0.5024975024975025,0.502997002997003,0.5034965034965035,0.503996003996004,0.5044955044955045,0.504995004995005,0.5054945054945055,0.505994005994006,0.5064935064935064,0.506993006993007,0.5074925074925075,0.5079920079920079,0.5084915084915085,0.508991008991009,0.5094905094905094,0.50999000999001,0.5104895104895105,0.510989010989011,0.5114885114885115,0.511988011988012,0.5124875124875125,0.512987012987013,0.5134865134865135,0.513986013986014,0.5144855144855145,0.514985014985015,0.5154845154845155,0.515984015984016,0.5164835164835165,0.516983016983017,0.5174825174825175,0.5179820179820179,0.5184815184815185,0.518981018981019,0.5194805194805194,0.51998001998002,0.5204795204795205,0.5209790209790209,0.5214785214785215,0.521978021978022,0.5224775224775224,0.522977022977023,0.5234765234765235,0.5239760239760239,0.5244755244755245,0.524975024975025,0.5254745254745254,0.525974025974026,0.5264735264735265,0.526973026973027,0.5274725274725275,0.527972027972028,0.5284715284715285,0.528971028971029,0.5294705294705294,0.52997002997003,0.5304695304695305,0.5309690309690309,0.5314685314685315,0.531968031968032,0.5324675324675324,0.532967032967033,0.5334665334665335,0.5339660339660339,0.5344655344655345,0.534965034965035,0.5354645354645354,0.535964035964036,0.5364635364635365,0.5369630369630369,0.5374625374625375,0.537962037962038,0.5384615384615384,0.538961038961039,0.5394605394605395,0.5399600399600399,0.5404595404595405,0.5409590409590409,0.5414585414585414,0.541958041958042,0.5424575424575424,0.542957042957043,0.5434565434565435,0.5439560439560439,0.5444555444555444,0.544955044955045,0.5454545454545454,0.545954045954046,0.5464535464535465,0.5469530469530469,0.5474525474525475,0.547952047952048,0.5484515484515484,0.548951048951049,0.5494505494505495,0.5499500499500499,0.5504495504495505,0.550949050949051,0.5514485514485514,0.551948051948052,0.5524475524475524,0.5529470529470529,0.5534465534465535,0.5539460539460539,0.5544455544455544,0.554945054945055,0.5554445554445554,0.5559440559440559,0.5564435564435565,0.5569430569430569,0.5574425574425574,0.557942057942058,0.5584415584415584,0.5589410589410589,0.5594405594405595,0.5599400599400599,0.5604395604395604,0.560939060939061,0.5614385614385614,0.561938061938062,0.5624375624375625,0.5629370629370629,0.5634365634365635,0.563936063936064,0.5644355644355644,0.564935064935065,0.5654345654345654,0.5659340659340659,0.5664335664335665,0.5669330669330669,0.5674325674325674,0.567932067932068,0.5684315684315684,0.5689310689310689,0.5694305694305695,0.5699300699300699,0.5704295704295704,0.570929070929071,0.5714285714285714,0.5719280719280719,0.5724275724275725,0.5729270729270729,0.5734265734265734,0.573926073926074,0.5744255744255744,0.5749250749250749,0.5754245754245755,0.5759240759240759,0.5764235764235764,0.5769230769230769,0.5774225774225774,0.577922077922078,0.5784215784215784,0.5789210789210789,0.5794205794205795,0.5799200799200799,0.5804195804195804,0.580919080919081,0.5814185814185814,0.5819180819180819,0.5824175824175825,0.5829170829170829,0.5834165834165834,0.583916083916084,0.5844155844155844,0.5849150849150849,0.5854145854145855,0.5859140859140859,0.5864135864135864,0.586913086913087,0.5874125874125874,0.5879120879120879,0.5884115884115884,0.5889110889110889,0.5894105894105894,0.5899100899100899,0.5904095904095904,0.5909090909090909,0.5914085914085914,0.5919080919080919,0.5924075924075924,0.5929070929070929,0.5934065934065934,0.593906093906094,0.5944055944055944,0.5949050949050949,0.5954045954045954,0.5959040959040959,0.5964035964035964,0.596903096903097,0.5974025974025974,0.5979020979020979,0.5984015984015985,0.5989010989010989,0.5994005994005994,0.5999000999000998,0.6003996003996004,0.6008991008991009,0.6013986013986014,0.6018981018981019,0.6023976023976024,0.6028971028971029,0.6033966033966034,0.6038961038961039,0.6043956043956044,0.6048951048951049,0.6053946053946054,0.6058941058941059,0.6063936063936064,0.6068931068931069,0.6073926073926074,0.6078921078921079,0.6083916083916084,0.6088911088911089,0.6093906093906094,0.6098901098901099,0.6103896103896104,0.6108891108891109,0.6113886113886113,0.6118881118881119,0.6123876123876124,0.6128871128871128,0.6133866133866134,0.6138861138861139,0.6143856143856143,0.6148851148851149,0.6153846153846154,0.6158841158841158,0.6163836163836164,0.6168831168831169,0.6173826173826173,0.6178821178821179,0.6183816183816184,0.6188811188811189,0.6193806193806194,0.6198801198801199,0.6203796203796204,0.6208791208791209,0.6213786213786214,0.6218781218781219,0.6223776223776224,0.6228771228771228,0.6233766233766234,0.6238761238761239,0.6243756243756243,0.6248751248751249,0.6253746253746254,0.6258741258741258,0.6263736263736264,0.6268731268731269,0.6273726273726273,0.6278721278721279,0.6283716283716284,0.6288711288711288,0.6293706293706294,0.6298701298701299,0.6303696303696303,0.6308691308691309,0.6313686313686314,0.6318681318681318,0.6323676323676324,0.6328671328671329,0.6333666333666333,0.6338661338661339,0.6343656343656343,0.6348651348651349,0.6353646353646354,0.6358641358641358,0.6363636363636364,0.6368631368631369,0.6373626373626373,0.6378621378621379,0.6383616383616384,0.6388611388611388,0.6393606393606394,0.6398601398601399,0.6403596403596403,0.6408591408591409,0.6413586413586414,0.6418581418581418,0.6423576423576424,0.6428571428571429,0.6433566433566433,0.6438561438561439,0.6443556443556444,0.6448551448551448,0.6453546453546454,0.6458541458541458,0.6463536463536463,0.6468531468531469,0.6473526473526473,0.6478521478521478,0.6483516483516484,0.6488511488511488,0.6493506493506493,0.6498501498501499,0.6503496503496503,0.6508491508491508,0.6513486513486514,0.6518481518481518,0.6523476523476524,0.6528471528471529,0.6533466533466533,0.6538461538461539,0.6543456543456544,0.6548451548451548,0.6553446553446554,0.6558441558441559,0.6563436563436563,0.6568431568431569,0.6573426573426573,0.6578421578421578,0.6583416583416584,0.6588411588411588,0.6593406593406593,0.6598401598401599,0.6603396603396603,0.6608391608391608,0.6613386613386614,0.6618381618381618,0.6623376623376623,0.6628371628371629,0.6633366633366633,0.6638361638361638,0.6643356643356644,0.6648351648351648,0.6653346653346653,0.6658341658341659,0.6663336663336663,0.6668331668331668,0.6673326673326674,0.6678321678321678,0.6683316683316683,0.6688311688311688,0.6693306693306693,0.6698301698301699,0.6703296703296703,0.6708291708291708,0.6713286713286714,0.6718281718281718,0.6723276723276723,0.6728271728271729,0.6733266733266733,0.6738261738261738,0.6743256743256744,0.6748251748251748,0.6753246753246753,0.6758241758241759,0.6763236763236763,0.6768231768231768,0.6773226773226774,0.6778221778221778,0.6783216783216783,0.6788211788211789,0.6793206793206793,0.6798201798201798,0.6803196803196803,0.6808191808191808,0.6813186813186813,0.6818181818181818,0.6823176823176823,0.6828171828171828,0.6833166833166833,0.6838161838161838,0.6843156843156843,0.6848151848151848,0.6853146853146853,0.6858141858141859,0.6863136863136863,0.6868131868131868,0.6873126873126874,0.6878121878121878,0.6883116883116883,0.6888111888111889,0.6893106893106893,0.6898101898101898,0.6903096903096904,0.6908091908091908,0.6913086913086913,0.6918081918081919,0.6923076923076923,0.6928071928071928,0.6933066933066933,0.6938061938061938,0.6943056943056943,0.6948051948051948,0.6953046953046953,0.6958041958041958,0.6963036963036963,0.6968031968031968,0.6973026973026973,0.6978021978021978,0.6983016983016983,0.6988011988011988,0.6993006993006993,0.6998001998001998,0.7002997002997003,0.7007992007992008,0.7012987012987013,0.7017982017982018,0.7022977022977023,0.7027972027972028,0.7032967032967034,0.7037962037962038,0.7042957042957043,0.7047952047952047,0.7052947052947053,0.7057942057942058,0.7062937062937062,0.7067932067932068,0.7072927072927073,0.7077922077922078,0.7082917082917083,0.7087912087912088,0.7092907092907093,0.7097902097902098,0.7102897102897103,0.7107892107892108,0.7112887112887113,0.7117882117882118,0.7122877122877123,0.7127872127872128,0.7132867132867133,0.7137862137862138,0.7142857142857143,0.7147852147852148,0.7152847152847153,0.7157842157842158,0.7162837162837162,0.7167832167832168,0.7172827172827173,0.7177822177822177,0.7182817182817183,0.7187812187812188,0.7192807192807192,0.7197802197802198,0.7202797202797203,0.7207792207792207,0.7212787212787213,0.7217782217782218,0.7222777222777222,0.7227772227772228,0.7232767232767233,0.7237762237762237,0.7242757242757243,0.7247752247752248,0.7252747252747253,0.7257742257742258,0.7262737262737263,0.7267732267732268,0.7272727272727273,0.7277722277722277,0.7282717282717283,0.7287712287712288,0.7292707292707292,0.7297702297702298,0.7302697302697303,0.7307692307692307,0.7312687312687313,0.7317682317682318,0.7322677322677322,0.7327672327672328,0.7332667332667333,0.7337662337662337,0.7342657342657343,0.7347652347652348,0.7352647352647352,0.7357642357642358,0.7362637362637363,0.7367632367632367,0.7372627372627373,0.7377622377622378,0.7382617382617382,0.7387612387612388,0.7392607392607392,0.7397602397602397,0.7402597402597403,0.7407592407592407,0.7412587412587412,0.7417582417582418,0.7422577422577422,0.7427572427572428,0.7432567432567433,0.7437562437562437,0.7442557442557443,0.7447552447552448,0.7452547452547452,0.7457542457542458,0.7462537462537463,0.7467532467532467,0.7472527472527473,0.7477522477522478,0.7482517482517482,0.7487512487512488,0.7492507492507493,0.7497502497502497,0.7502497502497503,0.7507492507492507,0.7512487512487512,0.7517482517482518,0.7522477522477522,0.7527472527472527,0.7532467532467533,0.7537462537462537,0.7542457542457542,0.7547452547452548,0.7552447552447552,0.7557442557442557,0.7562437562437563,0.7567432567432567,0.7572427572427572,0.7577422577422578,0.7582417582417582,0.7587412587412588,0.7592407592407593,0.7597402597402597,0.7602397602397603,0.7607392607392608,0.7612387612387612,0.7617382617382618,0.7622377622377622,0.7627372627372627,0.7632367632367633,0.7637362637362637,0.7642357642357642,0.7647352647352648,0.7652347652347652,0.7657342657342657,0.7662337662337663,0.7667332667332667,0.7672327672327672,0.7677322677322678,0.7682317682317682,0.7687312687312687,0.7692307692307693,0.7697302697302697,0.7702297702297702,0.7707292707292708,0.7712287712287712,0.7717282717282717,0.7722277722277723,0.7727272727272727,0.7732267732267732,0.7737262737262737,0.7742257742257742,0.7747252747252747,0.7752247752247752,0.7757242757242757,0.7762237762237763,0.7767232767232767,0.7772227772227772,0.7777222777222778,0.7782217782217782,0.7787212787212787,0.7792207792207793,0.7797202797202797,0.7802197802197802,0.7807192807192808,0.7812187812187812,0.7817182817182817,0.7822177822177823,0.7827172827172827,0.7832167832167832,0.7837162837162838,0.7842157842157842,0.7847152847152847,0.7852147852147852,0.7857142857142857,0.7862137862137862,0.7867132867132867,0.7872127872127872,0.7877122877122877,0.7882117882117882,0.7887112887112887,0.7892107892107892,0.7897102897102897,0.7902097902097902,0.7907092907092907,0.7912087912087912,0.7917082917082917,0.7922077922077922,0.7927072927072927,0.7932067932067932,0.7937062937062938,0.7942057942057942,0.7947052947052947,0.7952047952047953,0.7957042957042957,0.7962037962037962,0.7967032967032966,0.7972027972027972,0.7977022977022977,0.7982017982017982,0.7987012987012987,0.7992007992007992,0.7997002997002997,0.8001998001998002,0.8006993006993007,0.8011988011988012,0.8016983016983017,0.8021978021978022,0.8026973026973027,0.8031968031968032,0.8036963036963037,0.8041958041958042,0.8046953046953047,0.8051948051948052,0.8056943056943057,0.8061938061938062,0.8066933066933067,0.8071928071928072,0.8076923076923077,0.8081918081918081,0.8086913086913087,0.8091908091908092,0.8096903096903096,0.8101898101898102,0.8106893106893107,0.8111888111888111,0.8116883116883117,0.8121878121878122,0.8126873126873126,0.8131868131868132,0.8136863136863137,0.8141858141858141,0.8146853146853147,0.8151848151848152,0.8156843156843157,0.8161838161838162,0.8166833166833167,0.8171828171828172,0.8176823176823177,0.8181818181818182,0.8186813186813187,0.8191808191808192,0.8196803196803197,0.8201798201798202,0.8206793206793207,0.8211788211788211,0.8216783216783217,0.8221778221778222,0.8226773226773226,0.8231768231768232,0.8236763236763237,0.8241758241758241,0.8246753246753247,0.8251748251748252,0.8256743256743256,0.8261738261738262,0.8266733266733267,0.8271728271728271,0.8276723276723277,0.8281718281718282,0.8286713286713286,0.8291708291708292,0.8296703296703297,0.8301698301698301,0.8306693306693307,0.8311688311688312,0.8316683316683317,0.8321678321678322,0.8326673326673326,0.8331668331668332,0.8336663336663337,0.8341658341658341,0.8346653346653347,0.8351648351648352,0.8356643356643356,0.8361638361638362,0.8366633366633367,0.8371628371628371,0.8376623376623377,0.8381618381618382,0.8386613386613386,0.8391608391608392,0.8396603396603397,0.8401598401598401,0.8406593406593407,0.8411588411588412,0.8416583416583416,0.8421578421578422,0.8426573426573427,0.8431568431568431,0.8436563436563437,0.8441558441558441,0.8446553446553446,0.8451548451548452,0.8456543456543456,0.8461538461538461,0.8466533466533467,0.8471528471528471,0.8476523476523476,0.8481518481518482,0.8486513486513486,0.8491508491508492,0.8496503496503497,0.8501498501498501,0.8506493506493507,0.8511488511488512,0.8516483516483516,0.8521478521478522,0.8526473526473527,0.8531468531468531,0.8536463536463537,0.8541458541458542,0.8546453546453546,0.8551448551448552,0.8556443556443556,0.8561438561438561,0.8566433566433567,0.8571428571428571,0.8576423576423576,0.8581418581418582,0.8586413586413586,0.8591408591408591,0.8596403596403597,0.8601398601398601,0.8606393606393606,0.8611388611388612,0.8616383616383616,0.8621378621378621,0.8626373626373627,0.8631368631368631,0.8636363636363636,0.8641358641358642,0.8646353646353646,0.8651348651348651,0.8656343656343657,0.8661338661338661,0.8666333666333667,0.8671328671328671,0.8676323676323676,0.8681318681318682,0.8686313686313686,0.8691308691308691,0.8696303696303697,0.8701298701298701,0.8706293706293706,0.8711288711288712,0.8716283716283716,0.8721278721278721,0.8726273726273727,0.8731268731268731,0.8736263736263736,0.8741258741258742,0.8746253746253746,0.8751248751248751,0.8756243756243757,0.8761238761238761,0.8766233766233766,0.8771228771228772,0.8776223776223776,0.8781218781218781,0.8786213786213786,0.8791208791208791,0.8796203796203796,0.8801198801198801,0.8806193806193806,0.8811188811188811,0.8816183816183816,0.8821178821178821,0.8826173826173827,0.8831168831168831,0.8836163836163836,0.8841158841158842,0.8846153846153846,0.8851148851148851,0.8856143856143857,0.8861138861138861,0.8866133866133866,0.8871128871128872,0.8876123876123876,0.8881118881118881,0.8886113886113887,0.8891108891108891,0.8896103896103896,0.8901098901098901,0.8906093906093906,0.8911088911088911,0.8916083916083916,0.8921078921078921,0.8926073926073926,0.8931068931068931,0.8936063936063936,0.8941058941058941,0.8946053946053946,0.8951048951048951,0.8956043956043956,0.8961038961038961,0.8966033966033966,0.8971028971028971,0.8976023976023976,0.8981018981018981,0.8986013986013986,0.8991008991008991,0.8996003996003996,0.9000999000999002,0.9005994005994006,0.9010989010989011,0.9015984015984015,0.9020979020979021,0.9025974025974026,0.903096903096903,0.9035964035964036,0.9040959040959041,0.9045954045954046,0.9050949050949051,0.9055944055944056,0.906093906093906,0.9065934065934066,0.9070929070929071,0.9075924075924076,0.9080919080919081,0.9085914085914086,0.9090909090909091,0.9095904095904096,0.9100899100899101,0.9105894105894106,0.9110889110889111,0.9115884115884116,0.9120879120879121,0.9125874125874126,0.913086913086913,0.9135864135864136,0.9140859140859141,0.9145854145854145,0.9150849150849151,0.9155844155844156,0.916083916083916,0.9165834165834166,0.9170829170829171,0.9175824175824175,0.9180819180819181,0.9185814185814186,0.919080919080919,0.9195804195804196,0.9200799200799201,0.9205794205794205,0.9210789210789211,0.9215784215784216,0.922077922077922,0.9225774225774226,0.9230769230769231,0.9235764235764236,0.9240759240759241,0.9245754245754245,0.9250749250749251,0.9255744255744256,0.926073926073926,0.9265734265734266,0.9270729270729271,0.9275724275724275,0.9280719280719281,0.9285714285714286,0.929070929070929,0.9295704295704296,0.9300699300699301,0.9305694305694305,0.9310689310689311,0.9315684315684316,0.932067932067932,0.9325674325674326,0.9330669330669331,0.9335664335664335,0.9340659340659341,0.9345654345654346,0.935064935064935,0.9355644355644356,0.936063936063936,0.9365634365634365,0.9370629370629371,0.9375624375624375,0.938061938061938,0.9385614385614386,0.939060939060939,0.9395604395604396,0.9400599400599401,0.9405594405594405,0.9410589410589411,0.9415584415584416,0.942057942057942,0.9425574425574426,0.9430569430569431,0.9435564435564435,0.9440559440559441,0.9445554445554446,0.945054945054945,0.9455544455544456,0.9460539460539461,0.9465534465534465,0.9470529470529471,0.9475524475524476,0.948051948051948,0.9485514485514486,0.949050949050949,0.9495504495504495,0.9500499500499501,0.9505494505494505,0.951048951048951,0.9515484515484516,0.952047952047952,0.9525474525474525,0.9530469530469531,0.9535464535464535,0.954045954045954,0.9545454545454546,0.955044955044955,0.9555444555444556,0.9560439560439561,0.9565434565434565,0.957042957042957,0.9575424575424576,0.958041958041958,0.9585414585414586,0.9590409590409591,0.9595404595404595,0.9600399600399601,0.9605394605394605,0.961038961038961,0.9615384615384616,0.962037962037962,0.9625374625374625,0.9630369630369631,0.9635364635364635,0.964035964035964,0.9645354645354646,0.965034965034965,0.9655344655344655,0.9660339660339661,0.9665334665334665,0.967032967032967,0.9675324675324676,0.968031968031968,0.9685314685314685,0.9690309690309691,0.9695304695304695,0.97002997002997,0.9705294705294706,0.971028971028971,0.9715284715284715,0.972027972027972,0.9725274725274725,0.973026973026973,0.9735264735264735,0.974025974025974,0.9745254745254746,0.975024975024975,0.9755244755244755,0.9760239760239761,0.9765234765234765,0.977022977022977,0.9775224775224776,0.978021978021978,0.9785214785214785,0.9790209790209791,0.9795204795204795,0.98001998001998,0.9805194805194806,0.981018981018981,0.9815184815184815,0.9820179820179821,0.9825174825174825,0.983016983016983,0.9835164835164835,0.984015984015984,0.9845154845154845,0.985014985014985,0.9855144855144855,0.986013986013986,0.9865134865134865,0.987012987012987,0.9875124875124875,0.988011988011988,0.9885114885114885,0.989010989010989,0.9895104895104895,0.99000999000999,0.9905094905094906,0.991008991008991,0.9915084915084915,0.9920079920079921,0.9925074925074925,0.993006993006993,0.9935064935064936,0.994005994005994,0.9945054945054945,0.995004995004995,0.9955044955044955,0.996003996003996,0.9965034965034965,0.997002997002997,0.9975024975024975,0.998001998001998,0.9985014985014985,0.999000999000999,0.9995004995004995,1.0]}
},{}],55:[function(require,module,exports){
module.exports={"expected":[2.0e-100,1.9995004371147254e-100,1.9990007493855414e-100,1.9985009367188033e-100,1.9980009990207492e-100,1.9975009361975003e-100,1.9970007481550596e-100,1.9965004347993132e-100,1.995999996036028e-100,1.9954994317708542e-100,1.9949987419093226e-100,1.9944979263568459e-100,1.9939969850187176e-100,1.9934959178001127e-100,1.9929947246060868e-100,1.9924934053415761e-100,1.991991959911397e-100,1.991490388220246e-100,1.9909886901727002e-100,1.990486865673216e-100,1.9899849146261287e-100,1.989482836935654e-100,1.9889806325058865e-100,1.9884783012407993e-100,1.987975843044244e-100,1.9874732578199515e-100,1.98697054547153e-100,1.986467705902466e-100,1.9859647390161247e-100,1.9854616447157478e-100,1.9849584229044548e-100,1.9844550734852423e-100,1.983951596360984e-100,1.9834479914344301e-100,1.9829442586082073e-100,1.9824403977848186e-100,1.9819364088666438e-100,1.9814322917559374e-100,1.9809280463548302e-100,1.9804236725653284e-100,1.9799191702893128e-100,1.97941453942854e-100,1.9789097798846408e-100,1.9784048915591204e-100,1.977899874353359e-100,1.97739472816861e-100,1.9768894529060012e-100,1.976384048466534e-100,1.975878514751083e-100,1.9753728516603956e-100,1.9748670590950928e-100,1.9743611369556683e-100,1.9738550851424876e-100,1.9733489035557893e-100,1.9728425920956828e-100,1.972336150662151e-100,1.971829579155047e-100,1.9713228774740954e-100,1.9708160455188923e-100,1.970309083188905e-100,1.9698019903834702e-100,1.9692947670017963e-100,1.968787412942961e-100,1.9682799281059121e-100,1.967772312389468e-100,1.9672645656923148e-100,1.9667566879130092e-100,1.9662486789499764e-100,1.9657405387015108e-100,1.9652322670657746e-100,1.9647238639407986e-100,1.964215329224482e-100,1.963706662814591e-100,1.9631978646087602e-100,1.962688934504491e-100,1.9621798723991516e-100,1.9616706781899784e-100,1.9611613517740726e-100,1.9606518930484027e-100,1.9601423019098036e-100,1.9596325782549754e-100,1.9591227219804835e-100,1.9586127329827604e-100,1.9581026111581016e-100,1.9575923564026687e-100,1.957081968612488e-100,1.9565714476834497e-100,1.956060793511308e-100,1.9555500059916816e-100,1.9550390850200525e-100,1.954528030491766e-100,1.954016842302031e-100,1.9535055203459184e-100,1.952994064518363e-100,1.952482474714161e-100,1.9519707508279708e-100,1.9514588927543132e-100,1.9509469003875704e-100,1.9504347736219856e-100,1.9499225123516639e-100,1.9494101164705702e-100,1.9488975858725313e-100,1.9483849204512333e-100,1.9478721201002228e-100,1.947359184712906e-100,1.9468461141825493e-100,1.9463329084022778e-100,1.945819567265076e-100,1.945306090663787e-100,1.9447924784911125e-100,1.9442787306396124e-100,1.9437648470017048e-100,1.943250827469665e-100,1.9427366719356272e-100,1.942222380291581e-100,1.9417079524293742e-100,1.9411933882407108e-100,1.9406786876171513e-100,1.9401638504501126e-100,1.9396488766308672e-100,1.939133766050543e-100,1.9386185186001242e-100,1.9381031341704495e-100,1.9375876126522117e-100,1.937071953935959e-100,1.9365561579120944e-100,1.9360402244708736e-100,1.9355241535024068e-100,1.9350079448966576e-100,1.9344915985434427e-100,1.9339751143324318e-100,1.933458492153147e-100,1.9329417318949628e-100,1.9324248334471063e-100,1.9319077966986558e-100,1.931390621538541e-100,1.930873307855544e-100,1.9303558555382966e-100,1.9298382644752815e-100,1.9293205345548328e-100,1.9288026656651333e-100,1.9282846576942164e-100,1.9277665105299657e-100,1.9272482240601123e-100,1.9267297981722386e-100,1.926211232753774e-100,1.9256925276919967e-100,1.9251736828740333e-100,1.9246546981868586e-100,1.924135573517294e-100,1.9236163087520086e-100,1.9230969037775192e-100,1.9225773584801886e-100,1.9220576727462255e-100,1.9215378464616864e-100,1.9210178795124716e-100,1.9204977717843287e-100,1.9199775231628492e-100,1.9194571335334705e-100,1.9189366027814743e-100,1.9184159307919864e-100,1.917895117449977e-100,1.9173741626402605e-100,1.9168530662474936e-100,1.916331828156177e-100,1.9158104482506547e-100,1.9152889264151117e-100,1.9147672625335774e-100,1.9142454564899214e-100,1.913723508167856e-100,1.9132014174509342e-100,1.9126791842225507e-100,1.9121568083659405e-100,1.911634289764179e-100,1.9111116283001827e-100,1.9105888238567065e-100,1.910065876316346e-100,1.9095427855615359e-100,1.9090195514745488e-100,1.9084961739374974e-100,1.9079726528323313e-100,1.907448988040839e-100,1.906925179444647e-100,1.9064012269252183e-100,1.9058771303638531e-100,1.9053528896416888e-100,1.9048285046396993e-100,1.9043039752386935e-100,1.9037793013193175e-100,1.903254482762052e-100,1.9027295194472136e-100,1.902204411254953e-100,1.901679158065256e-100,1.901153759757942e-100,1.900628216212665e-100,1.900102527308912e-100,1.8995766929260034e-100,1.8990507129430932e-100,1.8985245872391668e-100,1.8979983156930424e-100,1.8974718981833708e-100,1.8969453345886334e-100,1.8964186247871436e-100,1.895891768657045e-100,1.8953647660763128e-100,1.8948376169227522e-100,1.8943103210739976e-100,1.8937828784075143e-100,1.8932552888005962e-100,1.8927275521303659e-100,1.892199668273775e-100,1.8916716371076042e-100,1.8911434585084603e-100,1.8906151323527796e-100,1.890086658516825e-100,1.8895580368766858e-100,1.8890292673082787e-100,1.8885003496873468e-100,1.8879712838894581e-100,1.887442069790007e-100,1.886912707264214e-100,1.8863831961871222e-100,1.8858535364336015e-100,1.8853237278783448e-100,1.8847937703958692e-100,1.8842636638605159e-100,1.8837334081464481e-100,1.8832030031276529e-100,1.8826724486779395e-100,1.8821417446709391e-100,1.881610890980105e-100,1.8810798874787117e-100,1.880548734039855e-100,1.8800174305364508e-100,1.8794859768412365e-100,1.8789543728267686e-100,1.8784226183654233e-100,1.877890713329397e-100,1.8773586575907037e-100,1.876826451021177e-100,1.8762940934924689e-100,1.875761584876048e-100,1.8752289250432014e-100,1.8746961138650338e-100,1.874163151212465e-100,1.8736300369562333e-100,1.873096770966891e-100,1.8725633531148075e-100,1.8720297832701674e-100,1.8714960613029693e-100,1.8709621870830273e-100,1.8704281604799696e-100,1.8698939813632378e-100,1.8693596496020874e-100,1.8688251650655866e-100,1.8682905276226166e-100,1.8677557371418708e-100,1.8672207934918548e-100,1.866685696540885e-100,1.8661504461570905e-100,1.8656150422084095e-100,1.865079484562592e-100,1.8645437730871973e-100,1.8640079076495947e-100,1.8634718881169626e-100,1.8629357143562886e-100,1.862399386234369e-100,1.861862903617807e-100,1.8613262663730156e-100,1.8607894743662132e-100,1.8602525274634264e-100,1.8597154255304882e-100,1.859178168433037e-100,1.858640756036518e-100,1.858103188206182e-100,1.8575654648070834e-100,1.8570275857040825e-100,1.8564895507618437e-100,1.8559513598448343e-100,1.8554130128173263e-100,1.854874509543394e-100,1.854335849886914e-100,1.853797033711566e-100,1.8532580608808315e-100,1.8527189312579926e-100,1.8521796447061328e-100,1.8516402010881367e-100,1.851100600266688e-100,1.8505608421042715e-100,1.8500209264631708e-100,1.849480853205468e-100,1.8489406221930452e-100,1.8484002332875806e-100,1.847859686350552e-100,1.8473189812432337e-100,1.8467781178266968e-100,1.846237095961809e-100,1.8456959155092348e-100,1.8451545763294333e-100,1.8446130782826594e-100,1.8440714212289626e-100,1.8435296050281875e-100,1.8429876295399712e-100,1.8424454946237462e-100,1.8419032001387363e-100,1.8413607459439597e-100,1.840818131898226e-100,1.840275357860136e-100,1.8397324236880838e-100,1.8391893292402524e-100,1.8386460743746164e-100,1.8381026589489405e-100,1.837559082820779e-100,1.8370153458474756e-100,1.8364714478861629e-100,1.8359273887937608e-100,1.8353831684269785e-100,1.8348387866423124e-100,1.8342942432960453e-100,1.8337495382442469e-100,1.8332046713427736e-100,1.832659642447267e-100,1.832114451413154e-100,1.8315690980956467e-100,1.831023582349741e-100,1.8304779040302173e-100,1.829932062991639e-100,1.8293860590883524e-100,1.8288398921744873e-100,1.8282935621039553e-100,1.8277470687304486e-100,1.8272004119074416e-100,1.8266535914881902e-100,1.8261066073257284e-100,1.8255594592728718e-100,1.8250121471822145e-100,1.8244646709061305e-100,1.8239170302967713e-100,1.8233692252060667e-100,1.8228212554857235e-100,1.8222731209872266e-100,1.8217248215618368e-100,1.8211763570605905e-100,1.8206277273343008e-100,1.8200789322335555e-100,1.8195299716087165e-100,1.8189808453099214e-100,1.8184315531870794e-100,1.8178820950898744e-100,1.8173324708677633e-100,1.816782680369974e-100,1.8162327234455073e-100,1.8156825999431354e-100,1.8151323097113999e-100,1.8145818525986144e-100,1.8140312284528616e-100,1.8134804371219933e-100,1.812929478453631e-100,1.8123783522951635e-100,1.8118270584937487e-100,1.8112755968963111e-100,1.8107239673495423e-100,1.8101721696999e-100,1.809620203793609e-100,1.8090680694766573e-100,1.8085157665948002e-100,1.807963294993556e-100,1.8074106545182072e-100,1.8068578450137997e-100,1.8063048663251423e-100,1.8057517182968063e-100,1.8051984007731243e-100,1.8046449135981915e-100,1.8040912566158626e-100,1.803537429669753e-100,1.802983432603239e-100,1.8024292652594541e-100,1.8018749274812928e-100,1.8013204191114063e-100,1.800765739992204e-100,1.800210889965853e-100,1.7996558688742764e-100,1.7991006765591536e-100,1.7985453128619203e-100,1.7979897776237663e-100,1.7974340706856367e-100,1.7968781918882306e-100,1.7963221410720002e-100,1.7957659180771506e-100,1.7952095227436408e-100,1.7946529549111796e-100,1.7940962144192285e-100,1.7935393011069996e-100,1.792982214813455e-100,1.7924249553773068e-100,1.7918675226370165e-100,1.7913099164307934e-100,1.790752136596596e-100,1.79019418297213e-100,1.7896360553948476e-100,1.7890777537019482e-100,1.7885192777303762e-100,1.7879606273168222e-100,1.7874018022977214e-100,1.7868428025092527e-100,1.7862836277873395e-100,1.785724277967648e-100,1.785164752885586e-100,1.7846050523763047e-100,1.7840451762746962e-100,1.783485124415393e-100,1.782924896632768e-100,1.782364492760935e-100,1.781803912633745e-100,1.7812431560847891e-100,1.780682222947396e-100,1.7801211130546305e-100,1.7795598262392964e-100,1.7789983623339325e-100,1.7784367211708126e-100,1.7778749025819476e-100,1.7773129063990807e-100,1.7767507324536902e-100,1.776188380576988e-100,1.7756258505999178e-100,1.7750631423531555e-100,1.7745002556671096e-100,1.773937190371918e-100,1.7733739462974504e-100,1.7728105232733054e-100,1.7722469211288108e-100,1.771683139693023e-100,1.7711191787947264e-100,1.7705550382624325e-100,1.7699907179243797e-100,1.769426217608533e-100,1.7688615371425818e-100,1.7682966763539413e-100,1.7677316350697507e-100,1.767166413116872e-100,1.766601010321892e-100,1.7660354265111185e-100,1.7654696615105808e-100,1.7649037151460312e-100,1.7643375872429408e-100,1.763771277626501e-100,1.763204786121623e-100,1.7626381125529357e-100,1.7620712567447871e-100,1.7615042185212422e-100,1.760936997706082e-100,1.7603695941228046e-100,1.759802007594623e-100,1.7592342379444653e-100,1.7586662849949736e-100,1.7580981485685036e-100,1.7575298284871236e-100,1.7569613245726143e-100,1.7563926366464688e-100,1.7558237645298893e-100,1.7552547080437898e-100,1.7546854670087937e-100,1.7541160412452324e-100,1.753546430573147e-100,1.7529766348122849e-100,1.7524066537821008e-100,1.7518364873017568e-100,1.751266135190119e-100,1.7506955972657595e-100,1.7501248733469541e-100,1.7495539632516827e-100,1.7489828667976278e-100,1.748411583802174e-100,1.7478401140824077e-100,1.7472684574551164e-100,1.7466966137367876e-100,1.7461245827436078e-100,1.7455523642914628e-100,1.744979958195937e-100,1.7444073642723115e-100,1.7438345823355637e-100,1.7432616122003688e-100,1.742688453681095e-100,1.7421151065918073e-100,1.7415415707462635e-100,1.7409678459579146e-100,1.7403939320399043e-100,1.7398198288050682e-100,1.739245536065933e-100,1.7386710536347158e-100,1.7380963813233231e-100,1.7375215189433507e-100,1.7369464663060826e-100,1.7363712232224897e-100,1.7357957895032304e-100,1.735220164958649e-100,1.7346443493987747e-100,1.734068342633322e-100,1.733492144471689e-100,1.732915754722956e-100,1.7323391731958873e-100,1.731762399698928e-100,1.7311854340402031e-100,1.73060827602752e-100,1.7300309254683637e-100,1.7294533821698985e-100,1.7288756459389669e-100,1.7282977165820875e-100,1.7277195939054565e-100,1.7271412777149452e-100,1.7265627678161e-100,1.7259840640141405e-100,1.7254051661139616e-100,1.7248260739201286e-100,1.7242467872368803e-100,1.7236673058681253e-100,1.7230876296174434e-100,1.722507758288083e-100,1.7219276916829625e-100,1.7213474296046668e-100,1.7207669718554488e-100,1.720186318237228e-100,1.7196054685515882e-100,1.7190244225997794e-100,1.7184431801827152e-100,1.7178617411009716e-100,1.7172801051547878e-100,1.7166982721440649e-100,1.7161162418683636e-100,1.7155340141269056e-100,1.7149515887185712e-100,1.7143689654418998e-100,1.7137861440950875e-100,1.7132031244759875e-100,1.712619906382109e-100,1.7120364896106164e-100,1.7114528739583278e-100,1.7108690592217153e-100,1.710285045196904e-100,1.7097008316796697e-100,1.7091164184654396e-100,1.7085318053492918e-100,1.7079469921259522e-100,1.7073619785897968e-100,1.706776764534848e-100,1.7061913497547751e-100,1.7056057340428942e-100,1.7050199171921653e-100,1.704433898995193e-100,1.7038476792442256e-100,1.7032612577311536e-100,1.7026746342475092e-100,1.7020878085844658e-100,1.7015007805328348e-100,1.7009135498830691e-100,1.7003261164252589e-100,1.6997384799491304e-100,1.6991506402440479e-100,1.6985625970990107e-100,1.6979743503026524e-100,1.6973858996432403e-100,1.6967972449086752e-100,1.696208385886489e-100,1.6956193223638453e-100,1.6950300541275382e-100,1.6944405809639894e-100,1.6938509026592513e-100,1.6932610189990018e-100,1.6926709297685467e-100,1.6920806347528165e-100,1.691490133736367e-100,1.6908994265033775e-100,1.6903085128376502e-100,1.6897173925226094e-100,1.6891260653413008e-100,1.6885345310763894e-100,1.68794278951016e-100,1.6873508404245155e-100,1.686758683600976e-100,1.6861663188206777e-100,1.6855737458643725e-100,1.6849809645124276e-100,1.6843879745448222e-100,1.683794775741149e-100,1.6832013678806126e-100,1.6826077507420269e-100,1.682013924103817e-100,1.681419887744016e-100,1.6808256414402646e-100,1.6802311849698107e-100,1.6796365181095085e-100,1.6790416406358154e-100,1.6784465523247944e-100,1.6778512529521105e-100,1.6772557422930305e-100,1.676660020122423e-100,1.6760640862147548e-100,1.6754679403440933e-100,1.6748715822841037e-100,1.6742750118080468e-100,1.67367822868878e-100,1.6730812326987568e-100,1.6724840236100223e-100,1.671886601194216e-100,1.671288965222569e-100,1.6706911154659031e-100,1.6700930516946298e-100,1.6694947736787496e-100,1.6688962811878505e-100,1.6682975739911076e-100,1.6676986518572814e-100,1.6670995145547163e-100,1.666500161851342e-100,1.6659005935146693e-100,1.6653008093117907e-100,1.66470080900938e-100,1.6641005923736888e-100,1.6635001591705484e-100,1.6628995091653668e-100,1.662298642123128e-100,1.6616975578083916e-100,1.661096255985291e-100,1.6604947364175322e-100,1.659892998868393e-100,1.659291043100723e-100,1.6586888688769405e-100,1.658086475959032e-100,1.657483864108553e-100,1.656881033086624e-100,1.656277982653931e-100,1.6556747125707254e-100,1.6550712225968198e-100,1.65446751249159e-100,1.6538635820139727e-100,1.6532594309224628e-100,1.652655058975116e-100,1.6520504659295435e-100,1.651445651542914e-100,1.650840615571951e-100,1.6502353577729318e-100,1.6496298779016868e-100,1.6490241757135983e-100,1.6484182509635986e-100,1.6478121034061705e-100,1.647205732795344e-100,1.6465991388846964e-100,1.6459923214273516e-100,1.6453852801759777e-100,1.644778014882786e-100,1.644170525299531e-100,1.6435628111775085e-100,1.6429548722675532e-100,1.64234670832004e-100,1.6417383190848805e-100,1.6411297043115228e-100,1.640520863748951e-100,1.6399117971456828e-100,1.6393025042497679e-100,1.638692984808789e-100,1.6380832385698587e-100,1.637473265279618e-100,1.6368630646842372e-100,1.6362526365294116e-100,1.6356419805603635e-100,1.635031096521839e-100,1.6344199841581063e-100,1.6338086432129568e-100,1.633197073429701e-100,1.6325852745511697e-100,1.6319732463197113e-100,1.6313609884771902e-100,1.630748500764987e-100,1.6301357829239964e-100,1.629522834694626e-100,1.628909655816794e-100,1.6282962460299307e-100,1.6276826050729738e-100,1.6270687326843698e-100,1.6264546286020702e-100,1.6258402925635338e-100,1.625225724305721e-100,1.6246109235650957e-100,1.623995890077623e-100,1.6233806235787677e-100,1.6227651238034934e-100,1.6221493904862601e-100,1.6215334233610243e-100,1.620917222161237e-100,1.620300786619842e-100,1.6196841164692755e-100,1.619067211441463e-100,1.6184500712678205e-100,1.617832695679251e-100,1.6172150844061433e-100,1.6165972371783725e-100,1.6159791537252965e-100,1.6153608337757552e-100,1.61474227705807e-100,1.6141234833000414e-100,1.613504452228948e-100,1.6128851835715447e-100,1.612265677054062e-100,1.6116459324022045e-100,1.6110259493411487e-100,1.610405727595542e-100,1.609785266889502e-100,1.609164566946614e-100,1.6085436274899296e-100,1.6079224482419666e-100,1.6073010289247058e-100,1.6066793692595905e-100,1.6060574689675254e-100,1.6054353277688739e-100,1.6048129453834578e-100,1.6041903215305558e-100,1.6035674559289003e-100,1.6029443482966786e-100,1.6023209983515294e-100,1.601697405810542e-100,1.6010735703902547e-100,1.6004494918066536e-100,1.5998251697751708e-100,1.5992006040106826e-100,1.5985757942275086e-100,1.5979507401394098e-100,1.5973254414595874e-100,1.5966998979006806e-100,1.5960741091747658e-100,1.5954480749933543e-100,1.5948217950673919e-100,1.5941952691072559e-100,1.5935684968227548e-100,1.5929414779231257e-100,1.5923142121170338e-100,1.5916866991125698e-100,1.5910589386172488e-100,1.5904309303380088e-100,1.589802673981209e-100,1.589174169252628e-100,1.5885454158574624e-100,1.5879164135003252e-100,1.5872871618852445e-100,1.5866576607156606e-100,1.5860279096944258e-100,1.585397908523803e-100,1.5847676569054614e-100,1.5841371545404787e-100,1.5835064011293363e-100,1.5828753963719193e-100,1.582244139967514e-100,1.5816126316148074e-100,1.5809808710118836e-100,1.5803488578562244e-100,1.5797165918447051e-100,1.5790840726735955e-100,1.5784513000385556e-100,1.5778182736346366e-100,1.5771849931562762e-100,1.5765514582972993e-100,1.5759176687509149e-100,1.5752836242097157e-100,1.5746493243656743e-100,1.5740147689101435e-100,1.5733799575338535e-100,1.5727448899269102e-100,1.5721095657787936e-100,1.571473984778356e-100,1.5708381466138206e-100,1.5702020509727788e-100,1.5695656975421892e-100,1.5689290860083755e-100,1.5682922160570253e-100,1.5676550873731864e-100,1.567017699641268e-100,1.5663800525450358e-100,1.5657421457676124e-100,1.5651039789914742e-100,1.5644655518984506e-100,1.5638268641697204e-100,1.5631879154858124e-100,1.562548705526601e-100,1.5619092339713072e-100,1.5612695004984926e-100,1.5606295047860627e-100,1.5599892465112602e-100,1.5593487253506661e-100,1.558707940980197e-100,1.5580668930751027e-100,1.5574255813099646e-100,1.5567840053586943e-100,1.556142164894531e-100,1.5555000595900393e-100,1.554857689117108e-100,1.5542150531469483e-100,1.5535721513500908e-100,1.5529289833963842e-100,1.5522855489549935e-100,1.5516418476943973e-100,1.5509978792823868e-100,1.550353643386063e-100,1.5497091396718345e-100,1.5490643678054168e-100,1.5484193274518288e-100,1.5477740182753916e-100,1.5471284399397258e-100,1.5464825921077507e-100,1.545836474441681e-100,1.545190086603025e-100,1.544543428252583e-100,1.5438964990504446e-100,1.5432492986559877e-100,1.5426018267278747e-100,1.541954082924052e-100,1.5413060669017468e-100,1.540657778317466e-100,1.5400092168269928e-100,1.5393603820853862e-100,1.5387112737469768e-100,1.538061891465367e-100,1.5374122348934264e-100,1.5367623036832919e-100,1.536112097486364e-100,1.5354616159533047e-100,1.534810858734037e-100,1.5341598254777401e-100,1.533508515832849e-100,1.5328569294470526e-100,1.532205065967289e-100,1.5315529250397462e-100,1.5309005063098582e-100,1.5302478094223035e-100,1.5295948340210019e-100,1.5289415797491131e-100,1.528288046249035e-100,1.527634233162399e-100,1.52698014013007e-100,1.526325766792144e-100,1.5256711127879443e-100,1.5250161777560206e-100,1.5243609613341456e-100,1.5237054631593137e-100,1.5230496828677378e-100,1.5223936200948474e-100,1.521737274475286e-100,1.5210806456429096e-100,1.520423733230782e-100,1.5197665368711756e-100,1.5191090561955665e-100,1.5184512908346326e-100,1.517793240418253e-100,1.5171349045755023e-100,1.5164762829346514e-100,1.5158173751231627e-100,1.515158180767689e-100,1.5144986994940706e-100,1.5138389309273323e-100,1.5131788746916825e-100,1.5125185304105088e-100,1.511857897706376e-100,1.5111969762010248e-100,1.510535765515368e-100,1.5098742652694883e-100,1.5092124750826354e-100,1.508550394573225e-100,1.507888023358834e-100,1.5072253610561988e-100,1.506562407281214e-100,1.5058991616489282e-100,1.5052356237735417e-100,1.504571793268404e-100,1.5039076697460116e-100,1.503243252818005e-100,1.5025785420951662e-100,1.501913537187415e-100,1.5012482377038086e-100,1.5005826432525365e-100,1.4999167534409192e-100,1.4992505678754053e-100,1.4985840861615685e-100,1.497917307904105e-100,1.497250232706831e-100,1.4965828601726792e-100,1.4959151899036974e-100,1.4952472215010444e-100,1.4945789545649877e-100,1.4939103886949006e-100,1.4932415234892604e-100,1.4925723585456438e-100,1.491902893460725e-100,1.4912331278302738e-100,1.4905630612491507e-100,1.489892693311306e-100,1.4892220236097758e-100,1.4885510517366791e-100,1.4878797772832156e-100,1.4872081998396625e-100,1.486536318995371e-100,1.4858641343387643e-100,1.485191645457334e-100,1.4845188519376377e-100,1.483845753365295e-100,1.4831723493249859e-100,1.4824986394004468e-100,1.481824623174468e-100,1.4811503002288903e-100,1.4804756701446023e-100,1.4798007325015378e-100,1.479125486878671e-100,1.4784499328540157e-100,1.4777740700046209e-100,1.4770978979065672e-100,1.476421416134966e-100,1.475744624263953e-100,1.4750675218666888e-100,1.4743901085153523e-100,1.47371238378114e-100,1.4730343472342618e-100,1.472355998443938e-100,1.4716773369783964e-100,1.4709983624048677e-100,1.4703190742895844e-100,1.4696394721977762e-100,1.4689595556936673e-100,1.4682793243404723e-100,1.4675987777003946e-100,1.466917915334621e-100,1.46623673680332e-100,1.465555241665638e-100,1.4648734294796954e-100,1.4641912998025847e-100,1.4635088521903654e-100,1.4628260861980614e-100,1.4621430013796586e-100,1.4614595972880996e-100,1.4607758734752818e-100,1.460091829492053e-100,1.4594074648882088e-100,1.4587227792124886e-100,1.458037772012572e-100,1.4573524428350756e-100,1.4566667912255501e-100,1.4559808167284756e-100,1.4552945188872585e-100,1.454607897244228e-100,1.4539209513406333e-100,1.453233680716639e-100,1.4525460849113217e-100,1.4518581634626664e-100,1.4511699159075634e-100,1.4504813417818043e-100,1.4497924406200775e-100,1.4491032119559664e-100,1.4484136553219446e-100,1.4477237702493714e-100,1.44703355626849e-100,1.4463430129084216e-100,1.4456521396971642e-100,1.444960936161586e-100,1.4442694018274238e-100,1.4435775362192786e-100,1.4428853388606114e-100,1.4421928092737389e-100,1.4414999469798314e-100,1.4408067514989077e-100,1.4401132223498307e-100,1.439419359050305e-100,1.4387251611168718e-100,1.4380306280649057e-100,1.4373357594086099e-100,1.436640554661013e-100,1.435945013333965e-100,1.435249134938133e-100,1.434552918982997e-100,1.4338563649768465e-100,1.4331594724267755e-100,1.4324622408386797e-100,1.4317646697172513e-100,1.4310667585659753e-100,1.4303685068871258e-100,1.429669914181761e-100,1.4289709799497195e-100,1.4282717036896163e-100,1.4275720848988388e-100,1.4268721230735415e-100,1.4261718177086425e-100,1.42547116829782e-100,1.4247701743335064e-100,1.424068835306885e-100,1.423367150707886e-100,1.4226651200251813e-100,1.421962742746181e-100,1.421260018357028e-100,1.4205569463425948e-100,1.419853526186478e-100,1.4191497573709948e-100,1.418445639377178e-100,1.4177411716847719e-100,1.4170363537722268e-100,1.4163311851166965e-100,1.4156256651940316e-100,1.414919793478776e-100,1.414213569444163e-100,1.413506992562109e-100,1.4128000623032108e-100,1.4120927781367391e-100,1.4113851395306356e-100,1.4106771459515073e-100,1.4099687968646214e-100,1.409260091733902e-100,1.4085510300219244e-100,1.4078416111899102e-100,1.4071318346977232e-100,1.4064217000038638e-100,1.4057112065654652e-100,1.405000353838288e-100,1.4042891412767146e-100,1.4035775683337456e-100,1.4028656344609943e-100,1.4021533391086818e-100,1.401440681725632e-100,1.4007276617592665e-100,1.4000142786556003e-100,1.3993005318592353e-100,1.398586420813357e-100,1.3978719449597286e-100,1.3971571037386857e-100,1.3964418965891316e-100,1.3957263229485315e-100,1.3950103822529087e-100,1.394294073936838e-100,1.393577397433441e-100,1.3928603521743808e-100,1.3921429375898578e-100,1.3914251531086022e-100,1.3907069981578703e-100,1.3899884721634395e-100,1.3892695745496015e-100,1.388550304739158e-100,1.3878306621534152e-100,1.3871106462121775e-100,1.3863902563337435e-100,1.385669491934899e-100,1.3849483524309125e-100,1.3842268372355294e-100,1.3835049457609665e-100,1.382782677417906e-100,1.3820600316154908e-100,1.381337007761317e-100,1.3806136052614314e-100,1.379889823520322e-100,1.3791656619409153e-100,1.3784411199245694e-100,1.3777161968710678e-100,1.3769908921786145e-100,1.3762652052438275e-100,1.3755391354617335e-100,1.3748126822257608e-100,1.3740858449277356e-100,1.3733586229578737e-100,1.3726310157047762e-100,1.3719030225554222e-100,1.3711746428951643e-100,1.3704458761077212e-100,1.369716721575172e-100,1.3689871786779507e-100,1.368257246794839e-100,1.3675269253029613e-100,1.3667962135777775e-100,1.366065110993077e-100,1.3653336169209726e-100,1.364601730731895e-100,1.363869451794585e-100,1.3631367794760876e-100,1.3624037131417462e-100,1.361670252155196e-100,1.3609363958783577e-100,1.3602021436714293e-100,1.3594674948928826e-100,1.358732448899454e-100,1.35799700504614e-100,1.3572611626861884e-100,1.3565249211710935e-100,1.3557882798505893e-100,1.3550512380726412e-100,1.354313795183441e-100,1.3535759505273997e-100,1.3528377034471398e-100,1.35209905328349e-100,1.3513599993754766e-100,1.350620541060318e-100,1.349880677673417e-100,1.349140408548355e-100,1.3483997330168826e-100,1.3476586504089147e-100,1.3469171600525239e-100,1.3461752612739303e-100,1.3454329533974972e-100,1.3446902357457237e-100,1.343947107639236e-100,1.343203568396781e-100,1.3424596173352195e-100,1.341715253769518e-100,1.3409704770127417e-100,1.3402252863760473e-100,1.3394796811686754e-100,1.3387336606979426e-100,1.337987224269235e-100,1.3372403711859999e-100,1.3364931007497376e-100,1.3357454122599957e-100,1.3349973050143602e-100,1.3342487783084467e-100,1.333499831435895e-100,1.3327504636883598e-100,1.3320006743555037e-100,1.331250462724988e-100,1.3304998280824661e-100,1.3297487697115762e-100,1.3289972868939307e-100,1.3282453789091106e-100,1.3274930450346565e-100,1.326740284546061e-100,1.3259870967167594e-100,1.325233480818123e-100,1.3244794361194501e-100,1.3237249618879576e-100,1.3229700573887727e-100,1.3222147218849253e-100,1.321458954637339e-100,1.320702754904822e-100,1.3199461219440606e-100,1.3191890550096082e-100,1.3184315533538785e-100,1.3176736162271364e-100,1.3169152428774895e-100,1.3161564325508783e-100,1.3153971844910694e-100,1.3146374979396453e-100,1.3138773721359955e-100,1.313116806317308e-100,1.3123557997185614e-100,1.3115943515725139e-100,1.3108324611096953e-100,1.3100701275583987e-100,1.30930735014467e-100,1.308544128092299e-100,1.3077804606228116e-100,1.3070163469554584e-100,1.306251786307207e-100,1.305486777892732e-100,1.3047213209244054e-100,1.3039554146122876e-100,1.3031890581641182e-100,1.3024222507853047e-100,1.3016549916789154e-100,1.3008872800456677e-100,1.3001191150839194e-100,1.2993504959896586e-100,1.2985814219564937e-100,1.2978118921756448e-100,1.2970419058359316e-100,1.296271462123765e-100,1.2955005602231367e-100,1.2947291993156095e-100,1.2939573785803062e-100,1.2931850971938996e-100,1.2924123543306036e-100,1.2916391491621612e-100,1.2908654808578352e-100,1.290091348584397e-100,1.2893167515061167e-100,1.2885416887847531e-100,1.2877661595795416e-100,1.286990163047185e-100,1.2862136983418415e-100,1.2854367646151154e-100,1.2846593610160453e-100,1.2838814866910932e-100,1.2831031407841344e-100,1.282324322436445e-100,1.281545030786693e-100,1.2807652649709252e-100,1.2799850241225565e-100,1.2792043073723603e-100,1.2784231138484545e-100,1.2776414426762915e-100,1.2768592929786485e-100,1.2760766638756123e-100,1.2752935544845706e-100,1.2745099639201994e-100,1.273725891294452e-100,1.272941335716546e-100,1.2721562962929526e-100,1.2713707721273838e-100,1.270584762320782e-100,1.2697982659713062e-100,1.269011282174321e-100,1.268223810022384e-100,1.267435848605234e-100,1.2666473970097787e-100,1.2658584543200815e-100,1.2650690196173504e-100,1.2642790919799245e-100,1.2634886704832617e-100,1.2626977541999268e-100,1.261906342199577e-100,1.2611144335489522e-100,1.2603220273118585e-100,1.2595291225491574e-100,1.2587357183187535e-100,1.2579418136755797e-100,1.2571474076715843e-100,1.2563524993557192e-100,1.2555570877739253e-100,1.2547611719691196e-100,1.2539647509811814e-100,1.2531678238469399e-100,1.2523703896001587e-100,1.2515724472715237e-100,1.2507739958886292e-100,1.2499750344759638e-100,1.2491755620548958e-100,1.2483755776436605e-100,1.247575080257345e-100,1.246774068907875e-100,1.245972542604e-100,1.2451705003512793e-100,1.2443679411520664e-100,1.2435648640054972e-100,1.2427612679074727e-100,1.2419571518506454e-100,1.241152514824405e-100,1.2403473558148633e-100,1.2395416738048387e-100,1.238735467773842e-100,1.2379287366980608e-100,1.2371214795503453e-100,1.236313695300191e-100,1.2355053829137254e-100,1.234696541353692e-100,1.2338871695794342e-100,1.23307726654688e-100,1.2322668312085267e-100,1.2314558625134242e-100,1.2306443594071602e-100,1.229832320831843e-100,1.2290197457260868e-100,1.2282066330249944e-100,1.227392981660141e-100,1.2265787905595585e-100,1.2257640586477185e-100,1.2249487848455155e-100,1.2241329680702514e-100,1.2233166072356174e-100,1.222499701251677e-100,1.2216822490248507e-100,1.2208642494578977e-100,1.220045701449898e-100,1.219226603896237e-100,1.2184069556885868e-100,1.2175867557148886e-100,1.216766002859336e-100,1.2159446960023567e-100,1.2151228340205946e-100,1.2143004157868922e-100,1.2134774401702728e-100,1.2126539060359208e-100,1.2118298122451658e-100,1.2110051576554626e-100,1.2101799411203732e-100,1.209354161489548e-100,1.2085278176087078e-100,1.2077009083196236e-100,1.2068734324600994e-100,1.2060453888639513e-100,1.2052167763609906e-100,1.2043875937770018e-100,1.203557839933725e-100,1.2027275136488365e-100,1.2018966137359278e-100,1.2010651390044872e-100,1.200233088259879e-100,1.1994004603033234e-100,1.1985672539318777e-100,1.197733467938414e-100,1.196899101111601e-100,1.1960641522358807e-100,1.195228620091451e-100,1.1943925034542423e-100,1.1935558010958978e-100,1.192718511783752e-100,1.1918806342808103e-100,1.1910421673457258e-100,1.190203109732781e-100,1.1893634601918626e-100,1.1885232174684424e-100,1.1876823803035543e-100,1.1868409474337723e-100,1.1859989175911891e-100,1.185156289503393e-100,1.1843130618934456e-100,1.1834692334798595e-100,1.1826248029765758e-100,1.18177976909294e-100,1.1809341305336809e-100,1.1800878859988855e-100,1.1792410341839776e-100,1.178393573779692e-100,1.1775455034720538e-100,1.176696821942352e-100,1.1758475278671164e-100,1.1749976199180944e-100,1.1741470967622263e-100,1.17329595706162e-100,1.1724441994735276e-100,1.17159182265032e-100,1.1707388252394626e-100,1.1698852058834896e-100,1.1690309632199795e-100,1.1681760958815288e-100,1.167320602495728e-100,1.1664644816851334e-100,1.1656077320672444e-100,1.1647503522544748e-100,1.1638923408541276e-100,1.1630336964683692e-100,1.162174417694202e-100,1.1613145031234367e-100,1.1604539513426687e-100,1.1595927609332472e-100,1.1587309304712502e-100,1.157868458527456e-100,1.1570053436673165e-100,1.1561415844509286e-100,1.1552771794330058e-100,1.1544121271628513e-100,1.1535464261843288e-100,1.152680075035834e-100,1.1518130722502647e-100,1.1509454163549943e-100,1.1500771058718408e-100,1.1492081393170375e-100,1.1483385152012039e-100,1.1474682320293158e-100,1.1465972883006752e-100,1.1457256825088802e-100,1.1448534131417949e-100,1.1439804786815181e-100,1.1431068776043532e-100,1.1422326083807761e-100,1.1413576694754058e-100,1.1404820593469708e-100,1.1396057764482794e-100,1.138728819226186e-100,1.1378511861215604e-100,1.1369728755692546e-100,1.136093885998071e-100,1.1352142158307285e-100,1.1343338634838307e-100,1.1334528273678318e-100,1.1325711058870035e-100,1.1316886974394009e-100,1.1308056004168294e-100,1.1299218132048093e-100,1.1290373341825423e-100,1.1281521617228768e-100,1.127266294192272e-100,1.126379729950764e-100,1.1254924673519294e-100,1.1246045047428505e-100,1.1237158404640783e-100,1.1228264728495975e-100,1.1219364002267892e-100,1.1210456209163944e-100,1.1201541332324771e-100,1.1192619354823875e-100,1.1183690259667236e-100,1.1174754029792944e-100,1.1165810648070807e-100,1.1156860097301984e-100,1.1147902360218582e-100,1.113893741948328e-100,1.1129965257688931e-100,1.112098585735817e-100,1.1111999200943017e-100,1.1103005270824474e-100,1.1094004049312125e-100,1.1084995518643733e-100,1.1075979660984821e-100,1.1066956458428271e-100,1.1057925892993905e-100,1.1048887946628061e-100,1.1039842601203183e-100,1.1030789838517387e-100,1.1021729640294044e-100,1.1012661988181335e-100,1.1003586863751831e-100,1.0994504248502051e-100,1.0985414123852022e-100,1.0976316471144828e-100,1.0967211271646182e-100,1.0958098506543955e-100,1.0948978156947739e-100,1.0939850203888374e-100,1.0930714628317505e-100,1.0921571411107108e-100,1.0912420533049022e-100,1.0903261974854483e-100,1.089409571715365e-100,1.0884921740495119e-100,1.0875740025345453e-100,1.0866550552088685e-100,1.0857353301025839e-100,1.0848148252374434e-100,1.0838935386267984e-100,1.0829714682755503e-100,1.0820486121800993e-100,1.0811249683282951e-100,1.080200534699384e-100,1.0792753092639585e-100,1.0783492899839047e-100,1.0774224748123501e-100,1.0764948616936113e-100,1.0755664485631398e-100,1.0746372333474693e-100,1.0737072139641613e-100,1.0727763883217505e-100,1.0718447543196904e-100,1.0709123098482973e-100,1.0699790527886952e-100,1.0690449810127595e-100,1.0681100923830603e-100,1.0671743847528048e-100,1.0662378559657811e-100,1.0653005038562985e-100,1.064362326249131e-100,1.0634233209594566e-100,1.0624834857927992e-100,1.0615428185449684e-100,1.0606013170019985e-100,1.0596589789400888e-100,1.058715802125542e-100,1.0577717843147017e-100,1.056826923253891e-100,1.0558812166793496e-100,1.0549346623171701e-100,1.0539872578832345e-100,1.0530390010831496e-100,1.0520898896121832e-100,1.051139921155197e-100,1.0501890933865824e-100,1.049237403970193e-100,1.0482848505592781e-100,1.047331430796415e-100,1.0463771423134414e-100,1.0454219827313858e-100,1.0444659496603994e-100,1.0435090406996856e-100,1.0425512534374298e-100,1.041592585450729e-100,1.0406330343055192e-100,1.0396725975565049e-100,1.0387112727470844e-100,1.0377490574092786e-100,1.0367859490636551e-100,1.0358219452192554e-100,1.0348570433735185e-100,1.0338912410122054e-100,1.0329245356093233e-100,1.0319569246270479e-100,1.030988405515645e-100,1.0300189757133945e-100,1.0290486326465083e-100,1.0280773737290528e-100,1.0271051963628674e-100,1.0261320979374841e-100,1.0251580758300451e-100,1.0241831274052206e-100,1.0232072500151259e-100,1.022230440999237e-100,1.0212526976843059e-100,1.0202740173842763e-100,1.019294397400196e-100,1.018313835020131e-100,1.017332327519078e-100,1.0163498721588755e-100,1.015366466188115e-100,1.0143821068420512e-100,1.013396791342511e-100,1.0124105168978021e-100,1.011423280702621e-100,1.0104350799379595e-100,1.0094459117710115e-100,1.0084557733550771e-100,1.0074646618294683e-100,1.0064725743194112e-100,1.0054795079359504e-100,1.004485459775849e-100,1.0034904269214913e-100,1.0024944064407815e-100,1.001497395387044e-100,1.0004993907989204e-100,9.995003897002687e-101,9.985003891000579e-101,9.974993859922648e-101,9.964973773557675e-101,9.954943601542407e-101,9.944903313360463e-101,9.934852878341264e-101,9.92479226565894e-101,9.914721444331217e-101,9.904640383218318e-101,9.894549051021826e-101,9.884447416283559e-101,9.874335447384423e-101,9.864213112543257e-101,9.854080379815669e-101,9.84393721709286e-101,9.833783592100435e-101,9.823619472397205e-101,9.81344482537398e-101,9.803259618252347e-101,9.793063818083437e-101,9.782857391746685e-101,9.77264030594857e-101,9.762412527221351e-101,9.752174021921786e-101,9.741924756229847e-101,9.731664696147404e-101,9.721393807496925e-101,9.711112055920134e-101,9.700819406876677e-101,9.69051582564277e-101,9.680201277309824e-101,9.669875726783078e-101,9.659539138780192e-101,9.649191477829849e-101,9.638832708270332e-101,9.628462794248093e-101,9.618081699716299e-101,9.607689388433381e-101,9.597285823961541e-101,9.586870969665285e-101,9.576444788709889e-101,9.566007244059906e-101,9.555558298477614e-101,9.545097914521474e-101,9.534626054544561e-101,9.524142680692988e-101,9.513647754904299e-101,9.503141238905871e-101,9.492623094213275e-101,9.482093282128636e-101,9.471551763738971e-101,9.460998499914509e-101,9.450433451307004e-101,9.43985657834801e-101,9.429267841247168e-101,9.418667199990444e-101,9.408054614338377e-101,9.397430043824291e-101,9.386793447752499e-101,9.376144785196474e-101,9.365484014997027e-101,9.354811095760439e-101,9.344125985856593e-101,9.333428643417071e-101,9.322719026333253e-101,9.31199709225437e-101,9.301262798585558e-101,9.290516102485882e-101,9.279756960866338e-101,9.268985330387844e-101,9.258201167459199e-101,9.24740442823502e-101,9.236595068613676e-101,9.225773044235169e-101,9.214938310479027e-101,9.204090822462144e-101,9.193230535036618e-101,9.182357402787559e-101,9.171471380030866e-101,9.160572420810998e-101,9.149660478898705e-101,9.138735507788738e-101,9.127797460697542e-101,9.116846290560914e-101,9.105881950031643e-101,9.094904391477125e-101,9.083913566976938e-101,9.072909428320415e-101,9.061891927004167e-101,9.05086101422959e-101,9.039816640900351e-101,9.028758757619826e-101,9.017687314688534e-101,9.006602262101524e-101,8.995503549545746e-101,8.984391126397376e-101,8.973264941719135e-101,8.962124944257557e-101,8.950971082440235e-101,8.939803304373038e-101,8.928621557837298e-101,8.917425790286944e-101,8.906215948845644e-101,8.894991980303879e-101,8.883753831115996e-101,8.872501447397229e-101,8.861234774920691e-101,8.849953759114311e-101,8.838658345057769e-101,8.827348477479357e-101,8.816024100752842e-101,8.804685158894254e-101,8.79333159555868e-101,8.781963354036975e-101,8.770580377252475e-101,8.759182607757642e-101,8.747769987730687e-101,8.736342458972149e-101,8.72489996290143e-101,8.713442440553283e-101,8.701969832574287e-101,8.690482079219241e-101,8.67897912034754e-101,8.66746089541951e-101,8.655927343492675e-101,8.644378403218013e-101,8.632814012836127e-101,8.621234110173414e-101,8.609638632638154e-101,8.598027517216562e-101,8.586400700468792e-101,8.574758118524907e-101,8.56309970708076e-101,8.551425401393875e-101,8.539735136279238e-101,8.528028846105059e-101,8.516306464788465e-101,8.504567925791152e-101,8.492813162114978e-101,8.481042106297504e-101,8.469254690407474e-101,8.457450846040242e-101,8.44563050431314e-101,8.433793595860788e-101,8.421940050830344e-101,8.410069798876702e-101,8.398182769157613e-101,8.386278890328751e-101,8.374358090538727e-101,8.36242029742402e-101,8.350465438103857e-101,8.338493439175019e-101,8.326504226706585e-101,8.314497726234606e-101,8.302473862756705e-101,8.290432560726614e-101,8.278373744048638e-101,8.266297336072036e-101,8.254203259585352e-101,8.242091436810638e-101,8.229961789397631e-101,8.217814238417832e-101,8.20564870435852e-101,8.193465107116675e-101,8.181263365992826e-101,8.169043399684816e-101,8.156805126281483e-101,8.144548463256246e-101,8.132273327460623e-101,8.119979635117644e-101,8.107667301815182e-101,8.095336242499189e-101,8.082986371466841e-101,8.070617602359592e-101,8.058229848156125e-101,8.045823021165211e-101,8.033397033018465e-101,8.020951794663005e-101,8.008487216354004e-101,7.996003207647136e-101,7.983499677390931e-101,7.970976533718997e-101,7.958433684042149e-101,7.945871035040432e-101,7.933288492655004e-101,7.920685962079932e-101,7.908063347753855e-101,7.895420553351526e-101,7.88275748177524e-101,7.870074035146132e-101,7.857370114795352e-101,7.844645621255107e-101,7.831900454249577e-101,7.819134512685693e-101,7.806347694643784e-101,7.793539897368084e-101,7.780711017257095e-101,7.76786094985381e-101,7.754989589835794e-101,7.742096831005109e-101,7.729182566278089e-101,7.71624668767497e-101,7.703289086309351e-101,7.6903096523775e-101,7.677308275147505e-101,7.664284842948242e-101,7.651239243158192e-101,7.638171362194079e-101,7.625081085499325e-101,7.611968297532338e-101,7.598832881754616e-101,7.585674720618659e-101,7.572493695555697e-101,7.559289686963224e-101,7.546062574192342e-101,7.532812235534892e-101,7.519538548210387e-101,7.506241388352747e-101,7.492920630996806e-101,7.479576150064613e-101,7.466207818351507e-101,7.452815507511976e-101,7.43939908804527e-101,7.425958429280801e-101,7.412493399363293e-101,7.399003865237685e-101,7.385489692633794e-101,7.371950746050723e-101,7.358386888741011e-101,7.344797982694514e-101,7.331183888622029e-101,7.317544465938625e-101,7.30387957274672e-101,7.290189065818842e-101,7.276472800580128e-101,7.262730631090501e-101,7.248962410026557e-101,7.23516798866314e-101,7.221347216854596e-101,7.207499943015707e-101,7.193626014102293e-101,7.179725275591471e-101,7.16579757146159e-101,7.151842744171787e-101,7.137860634641198e-101,7.123851082227804e-101,7.109813924706894e-101,7.095748998249152e-101,7.081656137398345e-101,7.067535175048615e-101,7.05338594242136e-101,7.039208269041701e-101,7.025001982714514e-101,7.010766909500034e-101,6.996502873689002e-101,6.982209697777363e-101,6.967887202440497e-101,6.953535206506965e-101,6.939153526931774e-101,6.924741978769134e-101,6.910300375144721e-101,6.89582852722739e-101,6.881326244200378e-101,6.866793333231945e-101,6.852229599445459e-101,6.837634845888911e-101,6.823008873503836e-101,6.808351481093635e-101,6.793662465291287e-101,6.77894162052643e-101,6.764188738991787e-101,6.749403610608947e-101,6.734586022993462e-101,6.719735761419247e-101,6.704852608782278e-101,6.689936345563559e-101,6.674986749791352e-101,6.660003597002626e-101,6.644986660203745e-101,6.629935709830339e-101,6.614850513706361e-101,6.599730837002303e-101,6.584576442192537e-101,6.569387089011784e-101,6.554162534410672e-101,6.538902532510355e-101,6.523606834556182e-101,6.508275188870391e-101,6.492907340803789e-101,6.477503032686402e-101,6.462062003777072e-101,6.446583990211959e-101,6.431068724951938e-101,6.415515937728839e-101,6.399925354990521e-101,6.384296699844733e-101,6.368629692001738e-101,6.352924047715663e-101,6.337179479724538e-101,6.321395697188997e-101,6.305572405629593e-101,6.289709306862692e-101,6.273806098934918e-101,6.257862476056082e-101,6.241878128530592e-101,6.225852742687252e-101,6.209786000807449e-101,6.193677581051663e-101,6.177527157384238e-101,6.161334399496393e-101,6.145098972727403e-101,6.128820537983894e-101,6.112498751657214e-101,6.096133265538802e-101,6.079723726733525e-101,6.063269777570878e-101,6.046771055514025e-101,6.03022719306661e-101,6.013637817677234e-101,5.997002551641579e-101,5.980321012002066e-101,5.963592810444993e-101,5.946817553195071e-101,5.929994840907268e-101,5.913124268555889e-101,5.896205425320799e-101,5.879237894470696e-101,5.862221253243349e-101,5.845155072722692e-101,5.828038917712683e-101,5.810872346607816e-101,5.793654911260182e-101,5.776386156842964e-101,5.759065621710248e-101,5.74169283725302e-101,5.724267327751251e-101,5.7067886102218856e-101,5.68925619426266e-101,5.671669581891548e-101,5.65402826738173e-101,5.636331737091905e-101,5.6185794692917934e-101,5.6007709339826654e-101,5.58290559271271e-101,5.564982898387079e-101,5.5470022950723987e-101,5.528963217795563e-101,5.510865092336598e-101,5.49270733501539e-101,5.4744893524720344e-101,5.456210541440595e-101,5.4378702885160173e-101,5.419467969913936e-101,5.401002951223123e-101,5.3824745871502895e-101,5.363882221256959e-101,5.3452251856880906e-101,5.3265028008921654e-101,5.3077143753323695e-101,5.2888592051885525e-101,5.2699365740495865e-101,5.2509457525957446e-101,5.231885998270709e-101,5.2127565549427786e-101,5.1935566525548463e-101,5.1742855067626974e-101,5.154942318561121e-101,5.1355262738973605e-101,5.1160365432713544e-101,5.09647228132222e-101,5.076832626400393e-101,5.0571167001248166e-101,5.0373236069245263e-101,5.0174524335639616e-101,4.9975022486512926e-101,4.977472102129005e-101,4.957361024745961e-101,4.9371680275101167e-101,4.916892101120985e-101,4.8965322153809766e-101,4.876087318584598e-101,4.855556336884512e-101,4.8349381736333655e-101,4.814231708700252e-101,4.793435797760595e-101,4.7725492715581834e-101,4.751570935138015e-101,4.730499567048511e-101,4.7093339185116144e-101,4.6880727125591556e-101,4.6667146431338136e-101,4.64525837415287e-101,4.623702538532855e-101,4.602045737173085e-101,4.580286537895939e-101,4.558423474341603e-101,4.5364550448148795e-101,4.514379711081488e-101,4.49219589711112e-101,4.4699019877643603e-101,4.447496327420359e-101,4.424977218541965e-101,4.4023429201748004e-101,4.3795916463765196e-101,4.3567215645722406e-101,4.333730793831868e-101,4.3106174030647155e-101,4.2873794091265354e-101,4.2640147748336897e-101,4.2405214068788524e-101,4.21689715364219e-101,4.1931398028915525e-101,4.1692470793647154e-101,4.145216642226195e-101,4.121046082390588e-101,4.0967329197037746e-101,4.072274599972651e-101,4.0476684918333195e-101,4.022911883446867e-101,3.998001979010994e-101,3.972935895074778e-101,3.947710656642838e-101,3.9223231930539876e-101,3.896770333618217e-101,3.8710488029944595e-101,3.8451552162900575e-101,3.819086073861185e-101,3.7928377557915974e-101,3.766406516025062e-101,3.7397884761245313e-101,3.7129796186286353e-101,3.685975779973256e-101,3.6587726429428835e-101,3.6313657286130043e-101,3.6037503877409235e-101,3.575921791558179e-101,3.547874921912899e-101,3.519604560705118e-101,3.4911052785520615e-101,3.4623714226136784e-101,3.433397103501089e-101,3.404176181182089e-101,3.374702249788161e-101,3.3449686212165094e-101,3.314968307408214e-101,3.2846940011694667e-101,3.254138055386784e-101,3.2232924604686873e-101,3.1921488198253046e-101,3.1606983231732015e-101,3.128931717424925e-101,3.09683927489069e-101,3.064410758482501e-101,3.031635383567935e-101,2.9985017760706595e-101,2.964997926356223e-101,2.9311111383730413e-101,2.896827973437896e-101,2.8621341879601154e-101,2.8270146642859694e-101,2.7914533337109033e-101,2.7554330905473855e-101,2.7189356959445213e-101,2.681941669924818e-101,2.64443016982429e-101,2.6063788529825676e-101,2.5677637211146447e-101,2.5285589432857462e-101,2.488736653780012e-101,2.448266720368909e-101,2.4071164775024364e-101,2.3652504177066616e-101,2.3226298328961807e-101,2.279212395292976e-101,2.2349516650377352e-101,2.1897965081835222e-101,2.143690404291289e-101,2.0965706168999773e-101,2.0483671921425988e-101,1.999001739880172e-101,1.9483859366772686e-101,1.8964196688601288e-101,1.842988703882192e-101,1.787961734723415e-101,1.7311865777647904e-101,1.672485207477414e-101,1.6116471609594238e-101,1.5484206061746832e-101,1.482499974982858e-101,1.4135083933326954e-101,1.340971953554503e-101,1.2642806580888527e-101,1.182626477217293e-101,1.0948996240812155e-101,9.995023706880285e-102,8.939825452483909e-102,7.742122405429879e-102,6.321427019308185e-102,4.46994628381816e-102,2.0000000000000002e-104],"x":[1.0e-200,9.995004995054944e-201,9.99000999010989e-201,9.985014985164835e-201,9.980019980219779e-201,9.975024975274725e-201,9.97002997032967e-201,9.965034965384615e-201,9.96003996043956e-201,9.955044955494505e-201,9.950049950549451e-201,9.945054945604396e-201,9.940059940659339e-201,9.935064935714285e-201,9.93006993076923e-201,9.925074925824176e-201,9.920079920879122e-201,9.915084915934067e-201,9.910089910989011e-201,9.905094906043957e-201,9.9000999010989e-201,9.895104896153845e-201,9.890109891208791e-201,9.885114886263736e-201,9.880119881318681e-201,9.875124876373627e-201,9.870129871428572e-201,9.865134866483516e-201,9.860139861538461e-201,9.855144856593406e-201,9.850149851648352e-201,9.845154846703296e-201,9.840159841758241e-201,9.835164836813187e-201,9.830169831868132e-201,9.825174826923075e-201,9.820179821978021e-201,9.815184817032966e-201,9.81018981208791e-201,9.805194807142857e-201,9.800199802197803e-201,9.795204797252748e-201,9.790209792307694e-201,9.785214787362637e-201,9.780219782417582e-201,9.775224777472528e-201,9.770229772527472e-201,9.765234767582419e-201,9.760239762637363e-201,9.755244757692308e-201,9.750249752747253e-201,9.745254747802197e-201,9.740259742857142e-201,9.735264737912088e-201,9.730269732967033e-201,9.725274728021977e-201,9.720279723076924e-201,9.715284718131868e-201,9.710289713186811e-201,9.705294708241758e-201,9.700299703296702e-201,9.695304698351647e-201,9.690309693406593e-201,9.685314688461538e-201,9.680319683516484e-201,9.67532467857143e-201,9.670329673626373e-201,9.665334668681318e-201,9.660339663736264e-201,9.655344658791209e-201,9.650349653846155e-201,9.6453546489011e-201,9.640359643956044e-201,9.635364639010989e-201,9.630369634065934e-201,9.625374629120878e-201,9.620379624175824e-201,9.615384619230769e-201,9.610389614285714e-201,9.60539460934066e-201,9.600399604395605e-201,9.595404599450548e-201,9.590409594505494e-201,9.585414589560439e-201,9.580419584615383e-201,9.57542457967033e-201,9.570429574725274e-201,9.565434569780219e-201,9.560439564835165e-201,9.55544455989011e-201,9.550449554945054e-201,9.54545455e-201,9.540459545054945e-201,9.535464540109891e-201,9.530469535164836e-201,9.52547453021978e-201,9.520479525274725e-201,9.51548452032967e-201,9.510489515384615e-201,9.505494510439561e-201,9.500499505494505e-201,9.49550450054945e-201,9.490509495604396e-201,9.485514490659341e-201,9.480519485714284e-201,9.47552448076923e-201,9.470529475824175e-201,9.46553447087912e-201,9.460539465934066e-201,9.45554446098901e-201,9.450549456043955e-201,9.445554451098901e-201,9.440559446153844e-201,9.435564441208792e-201,9.430569436263737e-201,9.425574431318681e-201,9.420579426373628e-201,9.415584421428572e-201,9.410589416483517e-201,9.405594411538463e-201,9.400599406593406e-201,9.395604401648351e-201,9.390609396703297e-201,9.385614391758242e-201,9.380619386813186e-201,9.375624381868133e-201,9.370629376923077e-201,9.36563437197802e-201,9.360639367032967e-201,9.355644362087911e-201,9.350649357142856e-201,9.345654352197802e-201,9.340659347252747e-201,9.335664342307691e-201,9.330669337362638e-201,9.325674332417581e-201,9.320679327472527e-201,9.315684322527473e-201,9.310689317582418e-201,9.305694312637364e-201,9.300699307692309e-201,9.295704302747253e-201,9.2907092978022e-201,9.285714292857143e-201,9.280719287912087e-201,9.275724282967033e-201,9.270729278021978e-201,9.265734273076923e-201,9.260739268131869e-201,9.255744263186814e-201,9.250749258241757e-201,9.245754253296703e-201,9.240759248351648e-201,9.235764243406592e-201,9.230769238461538e-201,9.225774233516483e-201,9.220779228571428e-201,9.215784223626374e-201,9.210789218681317e-201,9.205794213736263e-201,9.200799208791208e-201,9.195804203846153e-201,9.1908091989011e-201,9.185814193956045e-201,9.18081918901099e-201,9.175824184065936e-201,9.170829179120879e-201,9.165834174175824e-201,9.16083916923077e-201,9.155844164285714e-201,9.150849159340659e-201,9.145854154395605e-201,9.14085914945055e-201,9.135864144505493e-201,9.130869139560439e-201,9.125874134615384e-201,9.120879129670329e-201,9.115884124725275e-201,9.11088911978022e-201,9.105894114835165e-201,9.10089910989011e-201,9.095904104945053e-201,9.0909091e-201,9.085914095054944e-201,9.080919090109889e-201,9.075924085164835e-201,9.070929080219781e-201,9.065934075274726e-201,9.060939070329672e-201,9.055944065384615e-201,9.05094906043956e-201,9.045954055494506e-201,9.04095905054945e-201,9.035964045604395e-201,9.030969040659341e-201,9.025974035714286e-201,9.02097903076923e-201,9.015984025824176e-201,9.01098902087912e-201,9.005994015934065e-201,9.000999010989011e-201,8.996004006043956e-201,8.991009001098902e-201,8.986013996153846e-201,8.98101899120879e-201,8.976023986263736e-201,8.97102898131868e-201,8.966033976373625e-201,8.961038971428571e-201,8.956043966483516e-201,8.95104896153846e-201,8.946053956593408e-201,8.941058951648352e-201,8.936063946703296e-201,8.931068941758242e-201,8.926073936813187e-201,8.921078931868132e-201,8.916083926923078e-201,8.911088921978022e-201,8.906093917032966e-201,8.901098912087912e-201,8.896103907142857e-201,8.891108902197803e-201,8.886113897252747e-201,8.881118892307692e-201,8.876123887362638e-201,8.871128882417583e-201,8.866133877472526e-201,8.861138872527472e-201,8.856143867582417e-201,8.851148862637362e-201,8.846153857692308e-201,8.841158852747252e-201,8.836163847802197e-201,8.831168842857143e-201,8.826173837912088e-201,8.821178832967032e-201,8.816183828021979e-201,8.811188823076923e-201,8.806193818131868e-201,8.801198813186814e-201,8.796203808241759e-201,8.791208803296702e-201,8.786213798351648e-201,8.781218793406593e-201,8.776223788461539e-201,8.771228783516484e-201,8.766233778571428e-201,8.761238773626374e-201,8.756243768681319e-201,8.751248763736262e-201,8.746253758791208e-201,8.741258753846153e-201,8.736263748901098e-201,8.731268743956044e-201,8.726273739010989e-201,8.721278734065933e-201,8.71628372912088e-201,8.711288724175823e-201,8.706293719230769e-201,8.701298714285715e-201,8.69630370934066e-201,8.691308704395604e-201,8.68631369945055e-201,8.681318694505495e-201,8.676323689560438e-201,8.671328684615384e-201,8.666333679670329e-201,8.661338674725275e-201,8.65634366978022e-201,8.651348664835165e-201,8.646353659890111e-201,8.641358654945055e-201,8.636363649999999e-201,8.631368645054945e-201,8.62637364010989e-201,8.621378635164834e-201,8.61638363021978e-201,8.611388625274725e-201,8.60639362032967e-201,8.601398615384616e-201,8.596403610439559e-201,8.591408605494504e-201,8.58641360054945e-201,8.581418595604396e-201,8.57642359065934e-201,8.571428585714287e-201,8.566433580769231e-201,8.561438575824176e-201,8.556443570879121e-201,8.551448565934065e-201,8.546453560989012e-201,8.541458556043956e-201,8.536463551098901e-201,8.531468546153847e-201,8.526473541208792e-201,8.521478536263735e-201,8.516483531318681e-201,8.511488526373626e-201,8.50649352142857e-201,8.501498516483517e-201,8.496503511538461e-201,8.491508506593406e-201,8.486513501648352e-201,8.481518496703295e-201,8.47652349175824e-201,8.471528486813186e-201,8.466533481868131e-201,8.461538476923077e-201,8.456543471978023e-201,8.451548467032968e-201,8.446553462087912e-201,8.441558457142857e-201,8.436563452197802e-201,8.431568447252748e-201,8.426573442307693e-201,8.421578437362637e-201,8.416583432417583e-201,8.411588427472528e-201,8.406593422527471e-201,8.401598417582417e-201,8.396603412637362e-201,8.391608407692307e-201,8.386613402747253e-201,8.381618397802198e-201,8.376623392857142e-201,8.371628387912088e-201,8.366633382967032e-201,8.361638378021976e-201,8.356643373076922e-201,8.351648368131867e-201,8.346653363186812e-201,8.34165835824176e-201,8.336663353296704e-201,8.33166834835165e-201,8.326673343406593e-201,8.321678338461538e-201,8.316683333516484e-201,8.311688328571429e-201,8.306693323626374e-201,8.30169831868132e-201,8.296703313736264e-201,8.291708308791208e-201,8.286713303846154e-201,8.281718298901098e-201,8.276723293956043e-201,8.271728289010989e-201,8.266733284065934e-201,8.261738279120879e-201,8.256743274175825e-201,8.251748269230768e-201,8.246753264285713e-201,8.241758259340659e-201,8.236763254395603e-201,8.23176824945055e-201,8.226773244505494e-201,8.221778239560439e-201,8.216783234615386e-201,8.21178822967033e-201,8.206793224725274e-201,8.20179821978022e-201,8.196803214835165e-201,8.19180820989011e-201,8.186813204945056e-201,8.1818182e-201,8.176823195054944e-201,8.17182819010989e-201,8.166833185164835e-201,8.16183818021978e-201,8.156843175274726e-201,8.15184817032967e-201,8.146853165384615e-201,8.141858160439561e-201,8.136863155494504e-201,8.131868150549449e-201,8.126873145604395e-201,8.12187814065934e-201,8.116883135714286e-201,8.11188813076923e-201,8.106893125824175e-201,8.101898120879121e-201,8.096903115934066e-201,8.09190811098901e-201,8.086913106043957e-201,8.081918101098902e-201,8.076923096153846e-201,8.071928091208792e-201,8.066933086263737e-201,8.06193808131868e-201,8.056943076373626e-201,8.051948071428571e-201,8.046953066483516e-201,8.041958061538462e-201,8.036963056593407e-201,8.031968051648351e-201,8.026973046703297e-201,8.02197804175824e-201,8.016983036813185e-201,8.011988031868131e-201,8.006993026923076e-201,8.001998021978022e-201,7.997003017032967e-201,7.992008012087912e-201,7.987013007142858e-201,7.982018002197801e-201,7.977022997252746e-201,7.972027992307693e-201,7.967032987362638e-201,7.962037982417583e-201,7.957042977472529e-201,7.952047972527473e-201,7.947052967582417e-201,7.942057962637363e-201,7.937062957692307e-201,7.932067952747252e-201,7.927072947802198e-201,7.922077942857143e-201,7.917082937912088e-201,7.912087932967034e-201,7.907092928021977e-201,7.902097923076923e-201,7.897102918131868e-201,7.892107913186812e-201,7.887112908241759e-201,7.882117903296703e-201,7.877122898351648e-201,7.872127893406594e-201,7.867132888461537e-201,7.862137883516482e-201,7.857142878571428e-201,7.852147873626374e-201,7.847152868681319e-201,7.842157863736265e-201,7.83716285879121e-201,7.832167853846153e-201,7.827172848901099e-201,7.822177843956044e-201,7.817182839010988e-201,7.812187834065934e-201,7.807192829120879e-201,7.802197824175825e-201,7.79720281923077e-201,7.792207814285713e-201,7.78721280934066e-201,7.782217804395604e-201,7.777222799450549e-201,7.772227794505495e-201,7.76723278956044e-201,7.762237784615384e-201,7.75724277967033e-201,7.752247774725274e-201,7.747252769780218e-201,7.742257764835164e-201,7.737262759890109e-201,7.732267754945055e-201,7.727272750000001e-201,7.722277745054946e-201,7.717282740109889e-201,7.712287735164835e-201,7.70729273021978e-201,7.702297725274725e-201,7.697302720329671e-201,7.692307715384615e-201,7.687312710439562e-201,7.682317705494506e-201,7.67732270054945e-201,7.672327695604396e-201,7.66733269065934e-201,7.662337685714285e-201,7.657342680769231e-201,7.652347675824176e-201,7.64735267087912e-201,7.642357665934067e-201,7.63736266098901e-201,7.632367656043955e-201,7.6273726510989e-201,7.622377646153845e-201,7.61738264120879e-201,7.612387636263736e-201,7.607392631318682e-201,7.602397626373626e-201,7.597402621428572e-201,7.592407616483516e-201,7.587412611538461e-201,7.582417606593407e-201,7.577422601648352e-201,7.572427596703298e-201,7.567432591758243e-201,7.562437586813186e-201,7.557442581868132e-201,7.552447576923077e-201,7.547452571978021e-201,7.542457567032967e-201,7.537462562087912e-201,7.532467557142857e-201,7.527472552197803e-201,7.522477547252746e-201,7.517482542307691e-201,7.512487537362637e-201,7.507492532417582e-201,7.502497527472526e-201,7.497502522527472e-201,7.492507517582417e-201,7.487512512637362e-201,7.482517507692308e-201,7.477522502747253e-201,7.472527497802199e-201,7.467532492857143e-201,7.462537487912088e-201,7.457542482967034e-201,7.452547478021979e-201,7.447552473076922e-201,7.442557468131868e-201,7.437562463186813e-201,7.432567458241758e-201,7.427572453296704e-201,7.422577448351648e-201,7.417582443406593e-201,7.412587438461539e-201,7.407592433516482e-201,7.402597428571427e-201,7.397602423626373e-201,7.392607418681318e-201,7.387612413736263e-201,7.382617408791209e-201,7.377622403846153e-201,7.372627398901097e-201,7.367632393956044e-201,7.362637389010989e-201,7.357642384065935e-201,7.35264737912088e-201,7.347652374175824e-201,7.34265736923077e-201,7.337662364285715e-201,7.332667359340658e-201,7.327672354395605e-201,7.32267734945055e-201,7.317682344505494e-201,7.31268733956044e-201,7.307692334615385e-201,7.30269732967033e-201,7.297702324725276e-201,7.292707319780219e-201,7.287712314835163e-201,7.28271730989011e-201,7.277722304945054e-201,7.272727299999999e-201,7.267732295054945e-201,7.26273729010989e-201,7.257742285164834e-201,7.252747280219779e-201,7.247752275274724e-201,7.242757270329671e-201,7.237762265384616e-201,7.232767260439561e-201,7.227772255494507e-201,7.222777250549452e-201,7.217782245604395e-201,7.212787240659341e-201,7.207792235714286e-201,7.20279723076923e-201,7.197802225824176e-201,7.192807220879121e-201,7.187812215934066e-201,7.182817210989012e-201,7.177822206043955e-201,7.1728272010989e-201,7.167832196153846e-201,7.16283719120879e-201,7.157842186263735e-201,7.152847181318681e-201,7.147852176373626e-201,7.142857171428572e-201,7.137862166483515e-201,7.13286716153846e-201,7.127872156593406e-201,7.122877151648352e-201,7.117882146703297e-201,7.112887141758243e-201,7.107892136813188e-201,7.102897131868131e-201,7.097902126923077e-201,7.092907121978022e-201,7.087912117032967e-201,7.082917112087913e-201,7.077922107142857e-201,7.072927102197802e-201,7.067932097252748e-201,7.062937092307691e-201,7.057942087362636e-201,7.052947082417582e-201,7.047952077472527e-201,7.042957072527472e-201,7.037962067582418e-201,7.032967062637362e-201,7.027972057692309e-201,7.022977052747252e-201,7.017982047802196e-201,7.012987042857143e-201,7.007992037912087e-201,7.002997032967032e-201,6.99800202802198e-201,6.993007023076924e-201,6.988012018131867e-201,6.983017013186814e-201,6.978022008241758e-201,6.973027003296703e-201,6.968031998351649e-201,6.963036993406594e-201,6.958041988461538e-201,6.953046983516485e-201,6.948051978571428e-201,6.943056973626372e-201,6.938061968681319e-201,6.933066963736263e-201,6.92807195879121e-201,6.923076953846154e-201,6.918081948901099e-201,6.913086943956045e-201,6.908091939010988e-201,6.903096934065933e-201,6.898101929120879e-201,6.893106924175824e-201,6.888111919230768e-201,6.883116914285714e-201,6.87812190934066e-201,6.873126904395604e-201,6.86813189945055e-201,6.863136894505495e-201,6.858141889560439e-201,6.853146884615385e-201,6.84815187967033e-201,6.843156874725275e-201,6.838161869780221e-201,6.833166864835164e-201,6.828171859890109e-201,6.823176854945055e-201,6.81818185e-201,6.813186845054946e-201,6.80819184010989e-201,6.803196835164835e-201,6.798201830219781e-201,6.793206825274724e-201,6.788211820329669e-201,6.783216815384615e-201,6.77822181043956e-201,6.773226805494505e-201,6.76823180054945e-201,6.763236795604395e-201,6.75824179065934e-201,6.753246785714286e-201,6.748251780769231e-201,6.743256775824176e-201,6.738261770879122e-201,6.733266765934066e-201,6.728271760989011e-201,6.723276756043957e-201,6.7182817510989e-201,6.713286746153845e-201,6.708291741208791e-201,6.703296736263736e-201,6.698301731318682e-201,6.693306726373627e-201,6.688311721428571e-201,6.683316716483517e-201,6.67832171153846e-201,6.673326706593407e-201,6.668331701648352e-201,6.663336696703296e-201,6.658341691758242e-201,6.653346686813187e-201,6.648351681868132e-201,6.643356676923076e-201,6.638361671978022e-201,6.633366667032967e-201,6.628371662087912e-201,6.623376657142857e-201,6.618381652197803e-201,6.613386647252746e-201,6.608391642307692e-201,6.603396637362638e-201,6.598401632417583e-201,6.593406627472527e-201,6.588411622527472e-201,6.583416617582418e-201,6.578421612637363e-201,6.573426607692308e-201,6.568431602747252e-201,6.563436597802197e-201,6.558441592857143e-201,6.553446587912088e-201,6.548451582967033e-201,6.543456578021979e-201,6.538461573076923e-201,6.533466568131868e-201,6.5284715631868134e-201,6.523476558241758e-201,6.518481553296703e-201,6.513486548351648e-201,6.5084915434065936e-201,6.503496538461538e-201,6.498501533516483e-201,6.493506528571428e-201,6.488511523626373e-201,6.483516518681319e-201,6.478521513736264e-201,6.4735265087912085e-201,6.468531503846154e-201,6.463536498901099e-201,6.458541493956044e-201,6.453546489010989e-201,6.448551484065934e-201,6.4435564791208795e-201,6.4385614741758234e-201,6.433566469230769e-201,6.428571464285714e-201,6.4235764593406596e-201,6.418581454395604e-201,6.41358644945055e-201,6.408591444505495e-201,6.403596439560439e-201,6.3986014346153845e-201,6.39360642967033e-201,6.3886114247252746e-201,6.383616419780219e-201,6.378621414835165e-201,6.373626409890109e-201,6.368631404945055e-201,6.3636363999999994e-201,6.358641395054945e-201,6.35364639010989e-201,6.3486513851648356e-201,6.34365638021978e-201,6.338661375274725e-201,6.3336663703296704e-201,6.328671365384616e-201,6.32367636043956e-201,6.318681355494505e-201,6.3136863505494505e-201,6.308691345604395e-201,6.30369634065934e-201,6.298701335714286e-201,6.2937063307692314e-201,6.2887113258241754e-201,6.283716320879121e-201,6.278721315934066e-201,6.273726310989011e-201,6.2687313060439556e-201,6.263736301098901e-201,6.2587412961538456e-201,6.253746291208791e-201,6.248751286263736e-201,6.243756281318681e-201,6.2387612763736265e-201,6.233766271428572e-201,6.2287712664835166e-201,6.223776261538461e-201,6.218781256593407e-201,6.213786251648352e-201,6.208791246703296e-201,6.2037962417582415e-201,6.198801236813187e-201,6.1938062318681315e-201,6.188811226923076e-201,6.1838162219780216e-201,6.178821217032968e-201,6.173826212087912e-201,6.168831207142857e-201,6.1638362021978025e-201,6.158841197252747e-201,6.153846192307692e-201,6.148851187362637e-201,6.143856182417582e-201,6.138861177472527e-201,6.133866172527472e-201,6.1288711675824174e-201,6.123876162637362e-201,6.118881157692308e-201,6.113886152747253e-201,6.1088911478021976e-201,6.103896142857143e-201,6.0989011379120884e-201,6.0939061329670324e-201,6.088911128021978e-201,6.083916123076923e-201,6.0789211181318686e-201,6.0739261131868125e-201,6.068931108241758e-201,6.063936103296703e-201,6.058941098351647e-201,6.0539460934065934e-201,6.048951088461539e-201,6.0439560835164835e-201,6.038961078571428e-201,6.0339660736263736e-201,6.028971068681319e-201,6.023976063736264e-201,6.018981058791208e-201,6.013986053846154e-201,6.0089910489010984e-201,6.003996043956044e-201,5.9990010390109885e-201,5.994006034065934e-201,5.989011029120879e-201,5.984016024175825e-201,5.979021019230769e-201,5.974026014285714e-201,5.9690310093406595e-201,5.964036004395605e-201,5.959040999450549e-201,5.954045994505494e-201,5.94905098956044e-201,5.944055984615384e-201,5.939060979670329e-201,5.934065974725275e-201,5.92907096978022e-201,5.9240759648351645e-201,5.91908095989011e-201,5.914085954945055e-201,5.90909095e-201,5.904095945054945e-201,5.89910094010989e-201,5.894105935164835e-201,5.88911093021978e-201,5.884115925274725e-201,5.8791209203296695e-201,5.874125915384616e-201,5.869130910439561e-201,5.864135905494506e-201,5.8591409005494504e-201,5.854145895604396e-201,5.849150890659341e-201,5.844155885714285e-201,5.8391608807692306e-201,5.834165875824176e-201,5.829170870879121e-201,5.824175865934065e-201,5.819180860989011e-201,5.814185856043956e-201,5.809190851098901e-201,5.804195846153846e-201,5.7992008412087916e-201,5.794205836263736e-201,5.789210831318681e-201,5.7842158263736264e-201,5.779220821428571e-201,5.7742258164835165e-201,5.769230811538461e-201,5.764235806593406e-201,5.759240801648351e-201,5.754245796703297e-201,5.749250791758242e-201,5.744255786813187e-201,5.739260781868132e-201,5.7342657769230775e-201,5.7292707719780215e-201,5.724275767032967e-201,5.719280762087912e-201,5.714285757142857e-201,5.709290752197802e-201,5.704295747252747e-201,5.6993007423076925e-201,5.6943057373626364e-201,5.6893107324175825e-201,5.684315727472528e-201,5.6793207225274726e-201,5.674325717582417e-201,5.669330712637363e-201,5.6643357076923074e-201,5.659340702747253e-201,5.6543456978021975e-201,5.649350692857142e-201,5.6443556879120875e-201,5.639360682967033e-201,5.6343656780219776e-201,5.629370673076923e-201,5.6243756681318684e-201,5.619380663186814e-201,5.614385658241758e-201,5.609390653296703e-201,5.6043956483516486e-201,5.599400643406593e-201,5.594405638461538e-201,5.5894106335164834e-201,5.584415628571429e-201,5.579420623626373e-201,5.574425618681318e-201,5.569430613736264e-201,5.564435608791209e-201,5.5594406038461536e-201,5.554445598901099e-201,5.549450593956044e-201,5.544455589010989e-201,5.539460584065934e-201,5.534465579120879e-201,5.529470574175824e-201,5.524475569230769e-201,5.519480564285714e-201,5.5144855593406586e-201,5.509490554395605e-201,5.50449554945055e-201,5.499500544505494e-201,5.4945055395604395e-201,5.489510534615385e-201,5.48451552967033e-201,5.479520524725274e-201,5.47452551978022e-201,5.469530514835165e-201,5.46453550989011e-201,5.4595405049450544e-201,5.4545455e-201,5.449550495054945e-201,5.44455549010989e-201,5.439560485164835e-201,5.43456548021978e-201,5.4295704752747254e-201,5.42457547032967e-201,5.4195804653846155e-201,5.41458546043956e-201,5.4095904554945056e-201,5.40459545054945e-201,5.399600445604395e-201,5.39460544065934e-201,5.389610435714286e-201,5.3846154307692304e-201,5.379620425824176e-201,5.374625420879121e-201,5.3696304159340666e-201,5.3646354109890106e-201,5.359640406043956e-201,5.3546454010989014e-201,5.349650396153846e-201,5.344655391208791e-201,5.339660386263736e-201,5.334665381318681e-201,5.3296703763736255e-201,5.324675371428572e-201,5.319680366483517e-201,5.314685361538462e-201,5.3096903565934064e-201,5.304695351648352e-201,5.2997003467032965e-201,5.294705341758242e-201,5.2897103368131866e-201,5.284715331868131e-201,5.279720326923077e-201,5.274725321978022e-201,5.269730317032966e-201,5.264735312087912e-201,5.2597403071428575e-201,5.254745302197803e-201,5.249750297252747e-201,5.244755292307692e-201,5.239760287362638e-201,5.2347652824175824e-201,5.229770277472527e-201,5.2247752725274725e-201,5.219780267582417e-201,5.214785262637362e-201,5.209790257692307e-201,5.2047952527472534e-201,5.199800247802198e-201,5.194805242857143e-201,5.189810237912088e-201,5.184815232967033e-201,5.179820228021978e-201,5.174825223076923e-201,5.1698302181318676e-201,5.164835213186813e-201,5.1598402082417584e-201,5.154845203296702e-201,5.149850198351648e-201,5.144855193406594e-201,5.139860188461539e-201,5.134865183516483e-201,5.1298701785714286e-201,5.124875173626374e-201,5.119880168681319e-201,5.1148851637362634e-201,5.109890158791209e-201,5.1048951538461535e-201,5.099900148901098e-201,5.0949051439560436e-201,5.089910139010989e-201,5.0849151340659336e-201,5.079920129120879e-201,5.0749251241758244e-201,5.069930119230769e-201,5.0649351142857145e-201,5.059940109340659e-201,5.054945104395604e-201,5.049950099450549e-201,5.044955094505495e-201,5.0399600895604394e-201,5.034965084615384e-201,5.0299700796703295e-201,5.024975074725275e-201,5.0199800697802195e-201,5.014985064835165e-201,5.00999005989011e-201,5.004995054945055e-201,5.00000005e-201,4.995005045054945e-201,4.9900100401098905e-201,4.9850150351648345e-201,4.98002003021978e-201,4.975025025274725e-201,4.97003002032967e-201,4.9650350153846146e-201,4.960040010439561e-201,4.9550450054945054e-201,4.950050000549451e-201,4.9450549956043955e-201,4.94005999065934e-201,4.9350649857142856e-201,4.930069980769231e-201,4.925074975824176e-201,4.9200799708791204e-201,4.915084965934066e-201,4.910089960989011e-201,4.905094956043955e-201,4.900099951098901e-201,4.895104946153847e-201,4.890109941208791e-201,4.885114936263736e-201,4.8801199313186814e-201,4.875124926373627e-201,4.8701299214285715e-201,4.865134916483516e-201,4.8601399115384616e-201,4.855144906593406e-201,4.850149901648351e-201,4.845154896703296e-201,4.840159891758242e-201,4.835164886813187e-201,4.830169881868132e-201,4.825174876923077e-201,4.820179871978022e-201,4.815184867032967e-201,4.810189862087912e-201,4.805194857142857e-201,4.800199852197802e-201,4.7952048472527475e-201,4.7902098423076914e-201,4.785214837362637e-201,4.780219832417582e-201,4.7752248274725284e-201,4.770229822527472e-201,4.765234817582418e-201,4.760239812637363e-201,4.755244807692308e-201,4.7502498027472525e-201,4.745254797802198e-201,4.7402597928571426e-201,4.735264787912087e-201,4.730269782967033e-201,4.725274778021977e-201,4.720279773076923e-201,4.715284768131868e-201,4.7102897631868136e-201,4.705294758241758e-201,4.7002997532967036e-201,4.695304748351648e-201,4.690309743406593e-201,4.6853147384615384e-201,4.680319733516484e-201,4.675324728571428e-201,4.670329723626373e-201,4.6653347186813186e-201,4.660339713736264e-201,4.655344708791209e-201,4.650349703846154e-201,4.6453546989010995e-201,4.640359693956044e-201,4.635364689010989e-201,4.630369684065934e-201,4.625374679120879e-201,4.6203796741758236e-201,4.615384669230769e-201,4.610389664285714e-201,4.605394659340659e-201,4.600399654395604e-201,4.59540464945055e-201,4.5904096445054945e-201,4.58541463956044e-201,4.5804196346153846e-201,4.575424629670329e-201,4.570429624725275e-201,4.56543461978022e-201,4.560439614835164e-201,4.5554446098901095e-201,4.550449604945055e-201,4.5454546e-201,4.540459595054944e-201,4.5354645901098904e-201,4.530469585164836e-201,4.5254745802197804e-201,4.520479575274725e-201,4.5154845703296705e-201,4.510489565384615e-201,4.50549456043956e-201,4.500499555494505e-201,4.495504550549451e-201,4.4905095456043954e-201,4.48551454065934e-201,4.4805195357142855e-201,4.47552453076923e-201,4.470529525824176e-201,4.465534520879121e-201,4.4605395159340656e-201,4.455544510989011e-201,4.4505495060439564e-201,4.445554501098901e-201,4.440559496153846e-201,4.435564491208791e-201,4.4305694862637366e-201,4.4255744813186806e-201,4.420579476373626e-201,4.415584471428571e-201,4.410589466483517e-201,4.4055944615384614e-201,4.400599456593407e-201,4.3956044516483515e-201,4.390609446703297e-201,4.3856144417582416e-201,4.380619436813187e-201,4.375624431868132e-201,4.3706294269230764e-201,4.365634421978022e-201,4.3606394170329665e-201,4.355644412087912e-201,4.350649407142857e-201,4.345654402197802e-201,4.340659397252747e-201,4.335664392307693e-201,4.3306693873626374e-201,4.325674382417582e-201,4.3206793774725275e-201,4.315684372527473e-201,4.310689367582417e-201,4.305694362637362e-201,4.300699357692308e-201,4.295704352747252e-201,4.290709347802198e-201,4.285714342857143e-201,4.2807193379120886e-201,4.275724332967033e-201,4.270729328021978e-201,4.265734323076923e-201,4.260739318131868e-201,4.255744313186813e-201,4.250749308241758e-201,4.245754303296703e-201,4.240759298351648e-201,4.235764293406593e-201,4.230769288461538e-201,4.225774283516484e-201,4.220779278571429e-201,4.215784273626374e-201,4.2107892686813184e-201,4.205794263736264e-201,4.200799258791209e-201,4.195804253846153e-201,4.1908092489010986e-201,4.185814243956044e-201,4.180819239010989e-201,4.175824234065933e-201,4.1708292291208795e-201,4.165834224175825e-201,4.1608392192307696e-201,4.155844214285714e-201,4.15084920934066e-201,4.145854204395604e-201,4.140859199450549e-201,4.1358641945054944e-201,4.130869189560439e-201,4.1258741846153845e-201,4.120879179670329e-201,4.1158841747252746e-201,4.110889169780219e-201,4.1058941648351654e-201,4.10089915989011e-201,4.095904154945055e-201,4.09090915e-201,4.0859141450549455e-201,4.0809191401098895e-201,4.075924135164835e-201,4.07092913021978e-201,4.065934125274726e-201,4.06093912032967e-201,4.055944115384615e-201,4.0509491104395605e-201,4.045954105494506e-201,4.0409591005494506e-201,4.035964095604396e-201,4.030969090659341e-201,4.025974085714285e-201,4.020979080769231e-201,4.0159840758241754e-201,4.010989070879121e-201,4.0059940659340655e-201,4.000999060989011e-201,3.9960040560439556e-201,3.991009051098901e-201,3.9860140461538464e-201,3.981019041208791e-201,3.9760240362637365e-201,3.971029031318682e-201,3.966034026373626e-201,3.961039021428571e-201,3.9560440164835166e-201,3.951049011538462e-201,3.946054006593406e-201,3.9410590016483514e-201,3.936063996703297e-201,3.9310689917582415e-201,3.926073986813187e-201,3.921078981868132e-201,3.916083976923077e-201,3.9110889719780216e-201,3.906093967032967e-201,3.9010989620879124e-201,3.896103957142857e-201,3.891108952197802e-201,3.886113947252747e-201,3.881118942307692e-201,3.876123937362637e-201,3.871128932417582e-201,3.8661339274725274e-201,3.861138922527473e-201,3.856143917582418e-201,3.851148912637362e-201,3.8461539076923075e-201,3.841158902747253e-201,3.836163897802198e-201,3.831168892857142e-201,3.826173887912088e-201,3.821178882967033e-201,3.816183878021978e-201,3.8111888730769225e-201,3.806193868131868e-201,3.801198863186813e-201,3.796203858241759e-201,3.791208853296703e-201,3.786213848351649e-201,3.7812188434065934e-201,3.776223838461538e-201,3.7712288335164835e-201,3.766233828571428e-201,3.7612388236263736e-201,3.756243818681318e-201,3.751248813736263e-201,3.746253808791208e-201,3.7412588038461545e-201,3.736263798901099e-201,3.731268793956044e-201,3.726273789010989e-201,3.721278784065935e-201,3.7162837791208786e-201,3.711288774175824e-201,3.7062937692307694e-201,3.701298764285714e-201,3.696303759340659e-201,3.691308754395604e-201,3.686313749450549e-201,3.681318744505495e-201,3.67632373956044e-201,3.671328734615385e-201,3.66633372967033e-201,3.6613387247252744e-201,3.65634371978022e-201,3.6513487148351645e-201,3.64635370989011e-201,3.6413587049450546e-201,3.636363699999999e-201,3.631368695054945e-201,3.62637369010989e-201,3.6213786851648355e-201,3.61638368021978e-201,3.6113886752747256e-201,3.606393670329671e-201,3.601398665384615e-201,3.59640366043956e-201,3.591408655494506e-201,3.5864136505494504e-201,3.581418645604395e-201,3.5764236406593405e-201,3.571428635714286e-201,3.5664336307692306e-201,3.561438625824176e-201,3.5564436208791214e-201,3.551448615934066e-201,3.546453610989011e-201,3.541458606043956e-201,3.536463601098901e-201,3.531468596153846e-201,3.526473591208791e-201,3.5214785862637356e-201,3.516483581318681e-201,3.5114885763736264e-201,3.506493571428571e-201,3.501498566483516e-201,3.496503561538462e-201,3.491508556593407e-201,3.486513551648351e-201,3.481518546703297e-201,3.476523541758242e-201,3.471528536813187e-201,3.4665335318681314e-201,3.461538526923077e-201,3.456543521978022e-201,3.451548517032967e-201,3.4465535120879116e-201,3.441558507142857e-201,3.4365635021978024e-201,3.431568497252747e-201,3.4265734923076925e-201,3.421578487362637e-201,3.4165834824175825e-201,3.411588477472527e-201,3.4065934725274726e-201,3.401598467582417e-201,3.396603462637363e-201,3.3916084576923074e-201,3.386613452747252e-201,3.3816184478021975e-201,3.3766234428571436e-201,3.3716284379120876e-201,3.366633432967033e-201,3.3616384280219784e-201,3.356643423076924e-201,3.351648418131868e-201,3.346653413186813e-201,3.3416584082417585e-201,3.336663403296703e-201,3.3316683983516486e-201,3.326673393406593e-201,3.321678388461539e-201,3.3166833835164834e-201,3.311688378571428e-201,3.3066933736263735e-201,3.301698368681319e-201,3.2967033637362635e-201,3.291708358791209e-201,3.2867133538461536e-201,3.281718348901098e-201,3.276723343956044e-201,3.271728339010989e-201,3.2667333340659345e-201,3.261738329120879e-201,3.2567433241758242e-201,3.251748319230769e-201,3.2467533142857143e-201,3.2417583093406594e-201,3.2367633043956044e-201,3.2317682994505494e-201,3.2267732945054945e-201,3.2217782895604395e-201,3.2167832846153846e-201,3.2117882796703296e-201,3.206793274725275e-201,3.2017982697802197e-201,3.196803264835165e-201,3.1918082598901098e-201,3.1868132549450545e-201,3.18181825e-201,3.176823245054945e-201,3.1718282401098903e-201,3.166833235164835e-201,3.16183823021978e-201,3.156843225274725e-201,3.15184822032967e-201,3.1468532153846155e-201,3.1418582104395605e-201,3.1368632054945052e-201,3.1318682005494506e-201,3.1268731956043953e-201,3.1218781906593407e-201,3.1168831857142858e-201,3.1118881807692308e-201,3.106893175824176e-201,3.101898170879121e-201,3.096903165934066e-201,3.091908160989011e-201,3.086913156043956e-201,3.0819181510989014e-201,3.076923146153846e-201,3.0719281412087908e-201,3.066933136263736e-201,3.061938131318681e-201,3.0569431263736266e-201,3.0519481214285713e-201,3.0469531164835163e-201,3.0419581115384614e-201,3.0369631065934064e-201,3.0319681016483515e-201,3.026973096703297e-201,3.0219780917582415e-201,3.016983086813187e-201,3.0119880818681316e-201,3.006993076923077e-201,3.0019980719780217e-201,2.997003067032967e-201,2.992008062087912e-201,2.9870130571428572e-201,2.9820180521978022e-201,2.9770230472527473e-201,2.972028042307692e-201,2.9670330373626377e-201,2.9620380324175824e-201,2.9570430274725278e-201,2.9520480225274725e-201,2.947053017582417e-201,2.9420580126373626e-201,2.9370630076923076e-201,2.932068002747253e-201,2.9270729978021977e-201,2.9220779928571427e-201,2.9170829879120878e-201,2.9120879829670328e-201,2.9070929780219782e-201,2.9020979730769233e-201,2.897102968131868e-201,2.8921079631868133e-201,2.887112958241758e-201,2.882117953296703e-201,2.8771229483516485e-201,2.8721279434065935e-201,2.8671329384615386e-201,2.8621379335164836e-201,2.8571429285714283e-201,2.8521479236263737e-201,2.8471529186813184e-201,2.842157913736264e-201,2.8371629087912088e-201,2.8321679038461535e-201,2.827172898901099e-201,2.8221778939560436e-201,2.817182889010989e-201,2.812187884065934e-201,2.807192879120879e-201,2.802197874175824e-201,2.797202869230769e-201,2.792207864285714e-201,2.7872128593406592e-201,2.7822178543956043e-201,2.7772228494505497e-201,2.7722278445054943e-201,2.7672328395604397e-201,2.7622378346153844e-201,2.7572428296703295e-201,2.752247824725275e-201,2.74725281978022e-201,2.742257814835165e-201,2.73726280989011e-201,2.7322678049450547e-201,2.7272728e-201,2.722277795054945e-201,2.7172827901098898e-201,2.7122877851648352e-201,2.70729278021978e-201,2.7022977752747253e-201,2.69730277032967e-201,2.6923077653846154e-201,2.6873127604395604e-201,2.6823177554945054e-201,2.6773227505494505e-201,2.6723277456043955e-201,2.6673327406593402e-201,2.662337735714286e-201,2.6573427307692307e-201,2.652347725824176e-201,2.6473527208791207e-201,2.6423577159340658e-201,2.637362710989011e-201,2.6323677060439562e-201,2.6273727010989013e-201,2.6223776961538463e-201,2.617382691208791e-201,2.6123876862637364e-201,2.607392681318681e-201,2.602397676373627e-201,2.5974026714285715e-201,2.5924076664835162e-201,2.5874126615384616e-201,2.5824176565934063e-201,2.5774226516483517e-201,2.5724276467032967e-201,2.5674326417582418e-201,2.5624376368131868e-201,2.557442631868132e-201,2.5524476269230765e-201,2.547452621978022e-201,2.5424576170329666e-201,2.5374626120879124e-201,2.532467607142857e-201,2.527472602197802e-201,2.522477597252747e-201,2.517482592307692e-201,2.5124875873626372e-201,2.5074925824175826e-201,2.5024975774725273e-201,2.4975025725274727e-201,2.4925075675824174e-201,2.4875125626373628e-201,2.4825175576923075e-201,2.4775225527472525e-201,2.472527547802198e-201,2.4675325428571426e-201,2.462537537912088e-201,2.4575425329670327e-201,2.4525475280219777e-201,2.447552523076923e-201,2.442557518131868e-201,2.4375625131868132e-201,2.4325675082417582e-201,2.427572503296703e-201,2.4225774983516483e-201,2.4175824934065934e-201,2.4125874884615388e-201,2.4075924835164835e-201,2.4025974785714285e-201,2.3976024736263735e-201,2.3926074686813186e-201,2.387612463736264e-201,2.382617458791209e-201,2.3776224538461537e-201,2.372627448901099e-201,2.3676324439560438e-201,2.362637439010989e-201,2.3576424340659342e-201,2.352647429120879e-201,2.3476524241758243e-201,2.342657419230769e-201,2.337662414285714e-201,2.332667409340659e-201,2.3276724043956045e-201,2.3226773994505495e-201,2.3176823945054946e-201,2.3126873895604392e-201,2.3076923846153846e-201,2.3026973796703293e-201,2.297702374725275e-201,2.2927073697802198e-201,2.2877123648351648e-201,2.28271735989011e-201,2.277722354945055e-201,2.27272735e-201,2.2677323450549453e-201,2.26273734010989e-201,2.2577423351648354e-201,2.25274733021978e-201,2.2477523252747255e-201,2.24275732032967e-201,2.237762315384615e-201,2.2327673104395606e-201,2.2277723054945053e-201,2.2227773005494507e-201,2.2177822956043954e-201,2.2127872906593404e-201,2.2077922857142855e-201,2.202797280769231e-201,2.1978022758241756e-201,2.192807270879121e-201,2.1878122659340656e-201,2.182817260989011e-201,2.1778222560439557e-201,2.172827251098901e-201,2.167832246153846e-201,2.1628372412087912e-201,2.1578422362637362e-201,2.1528472313186813e-201,2.147852226373626e-201,2.1428572214285717e-201,2.1378622164835164e-201,2.1328672115384618e-201,2.1278722065934065e-201,2.1228772016483515e-201,2.1178821967032966e-201,2.1128871917582416e-201,2.107892186813187e-201,2.1028971818681317e-201,2.0979021769230767e-201,2.0929071719780218e-201,2.087912167032967e-201,2.0829171620879122e-201,2.0779221571428573e-201,2.072927152197802e-201,2.0679321472527474e-201,2.062937142307692e-201,2.0579421373626374e-201,2.0529471324175825e-201,2.0479521274725275e-201,2.0429571225274726e-201,2.0379621175824176e-201,2.0329671126373626e-201,2.0279721076923077e-201,2.0229771027472527e-201,2.017982097802198e-201,2.0129870928571428e-201,2.007992087912088e-201,2.002997082967033e-201,1.9980020780219776e-201,1.9930070730769233e-201,1.988012068131868e-201,1.983017063186813e-201,1.978022058241758e-201,1.973027053296703e-201,1.9680320483516482e-201,1.9630370434065936e-201,1.9580420384615383e-201,1.9530470335164837e-201,1.9480520285714284e-201,1.9430570236263738e-201,1.9380620186813184e-201,1.933067013736264e-201,1.928072008791209e-201,1.923077003846154e-201,1.918081998901099e-201,1.913086993956044e-201,1.9080919890109887e-201,1.903096984065934e-201,1.898101979120879e-201,1.8931069741758245e-201,1.8881119692307692e-201,1.8831169642857143e-201,1.8781219593406593e-201,1.873126954395604e-201,1.8681319494505497e-201,1.8631369445054944e-201,1.8581419395604395e-201,1.8531469346153845e-201,1.8481519296703295e-201,1.8431569247252742e-201,1.83816191978022e-201,1.8331669148351647e-201,1.82817190989011e-201,1.8231769049450547e-201,1.8181818999999998e-201,1.813186895054945e-201,1.8081918901098902e-201,1.8031968851648353e-201,1.7982018802197803e-201,1.793206875274725e-201,1.7882118703296704e-201,1.783216865384615e-201,1.778221860439561e-201,1.7732268554945055e-201,1.7682318505494506e-201,1.7632368456043956e-201,1.7582418406593403e-201,1.7532468357142857e-201,1.7482518307692307e-201,1.7432568258241758e-201,1.7382618208791208e-201,1.733266815934066e-201,1.728271810989011e-201,1.723276806043956e-201,1.718281801098901e-201,1.7132867961538464e-201,1.708291791208791e-201,1.7032967862637365e-201,1.698301781318681e-201,1.6933067763736262e-201,1.6883117714285716e-201,1.6833167664835166e-201,1.6783217615384617e-201,1.6733267565934067e-201,1.6683317516483514e-201,1.6633367467032968e-201,1.658341741758242e-201,1.6533467368131865e-201,1.648351731868132e-201,1.643356726923077e-201,1.638361721978022e-201,1.633366717032967e-201,1.628371712087912e-201,1.6233767071428571e-201,1.6183817021978024e-201,1.6133866972527472e-201,1.6083916923076923e-201,1.6033966873626375e-201,1.5984016824175825e-201,1.5934066774725274e-201,1.5884116725274726e-201,1.5834166675824175e-201,1.5784216626373625e-201,1.5734266576923077e-201,1.5684316527472526e-201,1.5634366478021976e-201,1.5584416428571429e-201,1.5534466379120879e-201,1.548451632967033e-201,1.543456628021978e-201,1.538461623076923e-201,1.533466618131868e-201,1.5284716131868133e-201,1.5234766082417581e-201,1.5184816032967032e-201,1.5134865983516484e-201,1.5084915934065934e-201,1.5034965884615385e-201,1.4985015835164835e-201,1.4935065785714286e-201,1.4885115736263736e-201,1.4835165686813188e-201,1.4785215637362639e-201,1.4735265587912087e-201,1.468531553846154e-201,1.4635365489010988e-201,1.4585415439560439e-201,1.453546539010989e-201,1.448551534065934e-201,1.443556529120879e-201,1.4385615241758242e-201,1.4335665192307692e-201,1.4285715142857141e-201,1.4235765093406591e-201,1.4185815043956044e-201,1.4135864994505494e-201,1.4085914945054945e-201,1.4035964895604395e-201,1.3986014846153845e-201,1.3936064796703296e-201,1.3886114747252748e-201,1.3836164697802198e-201,1.3786214648351647e-201,1.37362645989011e-201,1.368631454945055e-201,1.36363645e-201,1.3586414450549452e-201,1.3536464401098901e-201,1.3486514351648351e-201,1.3436564302197802e-201,1.3386614252747252e-201,1.33366642032967e-201,1.3286714153846153e-201,1.3236764104395603e-201,1.3186814054945054e-201,1.3136864005494506e-201,1.3086913956043955e-201,1.3036963906593405e-201,1.2987013857142857e-201,1.2937063807692308e-201,1.2887113758241758e-201,1.2837163708791209e-201,1.2787213659340659e-201,1.273726360989011e-201,1.2687313560439562e-201,1.2637363510989012e-201,1.258741346153846e-201,1.2537463412087913e-201,1.2487513362637363e-201,1.2437563313186814e-201,1.2387613263736264e-201,1.2337663214285714e-201,1.2287713164835165e-201,1.2237763115384615e-201,1.2187813065934066e-201,1.2137863016483514e-201,1.2087912967032967e-201,1.2037962917582417e-201,1.1988012868131867e-201,1.193806281868132e-201,1.1888112769230768e-201,1.1838162719780219e-201,1.178821267032967e-201,1.1738262620879121e-201,1.168831257142857e-201,1.1638362521978022e-201,1.1588412472527473e-201,1.1538462423076923e-201,1.1488512373626375e-201,1.1438562324175824e-201,1.1388612274725274e-201,1.1338662225274726e-201,1.1288712175824177e-201,1.1238762126373627e-201,1.1188812076923076e-201,1.1138862027472528e-201,1.1088911978021978e-201,1.1038961928571427e-201,1.098901187912088e-201,1.0939061829670328e-201,1.0889111780219778e-201,1.083916173076923e-201,1.0789211681318681e-201,1.073926163186813e-201,1.0689311582417582e-201,1.0639361532967032e-201,1.0589411483516483e-201,1.0539461434065935e-201,1.0489511384615383e-201,1.0439561335164834e-201,1.0389611285714286e-201,1.0339661236263736e-201,1.0289711186813187e-201,1.0239761137362637e-201,1.0189811087912088e-201,1.0139861038461538e-201,1.008991098901099e-201,1.003996093956044e-201,9.99001089010989e-202,9.940060840659342e-202,9.890110791208792e-202,9.84016074175824e-202,9.790210692307691e-202,9.740260642857141e-202,9.690310593406592e-202,9.640360543956044e-202,9.590410494505495e-202,9.540460445054943e-202,9.490510395604395e-202,9.440560346153846e-202,9.390610296703296e-202,9.340660247252748e-202,9.290710197802197e-202,9.240760148351647e-202,9.1908100989011e-202,9.14086004945055e-202,9.09091e-202,9.04095995054945e-202,8.991009901098901e-202,8.941059851648352e-202,8.891109802197804e-202,8.841159752747253e-202,8.791209703296703e-202,8.741259653846155e-202,8.691309604395606e-202,8.641359554945054e-202,8.591409505494505e-202,8.541459456043955e-202,8.491509406593405e-202,8.441559357142858e-202,8.391609307692308e-202,8.341659258241757e-202,8.291709208791209e-202,8.24175915934066e-202,8.19180910989011e-202,8.14185906043956e-202,8.0919090109890115e-202,8.041958961538461e-202,7.992008912087912e-202,7.942058862637363e-202,7.892108813186813e-202,7.842158763736264e-202,7.792208714285715e-202,7.742258664835164e-202,7.692308615384615e-202,7.642358565934066e-202,7.592408516483516e-202,7.542458467032967e-202,7.492508417582418e-202,7.442558368131868e-202,7.392608318681319e-202,7.3426582692307695e-202,7.29270821978022e-202,7.24275817032967e-202,7.192808120879122e-202,7.142858071428571e-202,7.092908021978022e-202,7.042957972527472e-202,6.993007923076922e-202,6.943057873626374e-202,6.893107824175823e-202,6.843157774725275e-202,6.793207725274726e-202,6.743257675824175e-202,6.693307626373627e-202,6.643357576923077e-202,6.5934075274725275e-202,6.543457478021977e-202,6.493507428571428e-202,6.443557379120879e-202,6.393607329670329e-202,6.3436572802197805e-202,6.29370723076923e-202,6.243757181318681e-202,6.193807131868133e-202,6.143857082417582e-202,6.0939070329670335e-202,6.043956983516484e-202,5.994006934065934e-202,5.944056884615384e-202,5.894106835164835e-202,5.844156785714286e-202,5.794206736263736e-202,5.744256686813187e-202,5.694306637362637e-202,5.644356587912088e-202,5.594406538461538e-202,5.544456489010989e-202,5.49450643956044e-202,5.44455639010989e-202,5.394606340659341e-202,5.344656291208791e-202,5.294706241758241e-202,5.244756192307691e-202,5.194806142857143e-202,5.144856093406593e-202,5.094906043956044e-202,5.044955994505495e-202,4.995005945054944e-202,4.945055895604396e-202,4.895105846153847e-202,4.845155796703297e-202,4.795205747252748e-202,4.745255697802197e-202,4.695305648351648e-202,4.645355598901098e-202,4.5954055494505495e-202,4.5454555e-202,4.49550545054945e-202,4.445555401098902e-202,4.395605351648351e-202,4.3456553021978025e-202,4.295705252747253e-202,4.245755203296703e-202,4.195805153846154e-202,4.145855104395604e-202,4.095905054945055e-202,4.0459550054945055e-202,3.996004956043956e-202,3.9460549065934063e-202,3.896104857142857e-202,3.8461548076923076e-202,3.7962047582417584e-202,3.746254708791209e-202,3.6963046593406593e-202,3.6463546098901097e-202,3.5964045604395605e-202,3.546454510989011e-202,3.4965044615384614e-202,3.446554412087912e-202,3.3966043626373627e-202,3.346654313186813e-202,3.2967042637362635e-202,3.2467542142857144e-202,3.1968041648351648e-202,3.146854115384615e-202,3.096904065934066e-202,3.0469540164835165e-202,2.997003967032967e-202,2.9470539175824177e-202,2.897103868131868e-202,2.847153818681318e-202,2.797203769230769e-202,2.74725371978022e-202,2.6973036703296703e-202,2.6473536208791207e-202,2.5974035714285716e-202,2.5474535219780215e-202,2.4975034725274724e-202,2.4475534230769232e-202,2.3976033736263737e-202,2.347653324175824e-202,2.297703274725275e-202,2.247753225274725e-202,2.1978031758241753e-202,2.1478531263736266e-202,2.097903076923077e-202,2.0479530274725275e-202,1.9980029780219779e-202,1.9480529285714288e-202,1.8981028791208792e-202,1.8481528296703296e-202,1.7982027802197802e-202,1.7482527307692309e-202,1.6983026813186813e-202,1.6483526318681317e-202,1.5984025824175826e-202,1.548452532967033e-202,1.4985024835164834e-202,1.4485524340659343e-202,1.3986023846153844e-202,1.348652335164835e-202,1.298702285714286e-202,1.2487522362637361e-202,1.1988021868131868e-202,1.1488521373626374e-202,1.0989020879120878e-202,1.0489520384615385e-202,9.99001989010989e-203,9.490519395604394e-203,8.991018901098902e-203,8.491518406593407e-203,7.992017912087911e-203,7.492517417582418e-203,6.993016923076923e-203,6.493516428571428e-203,5.994015934065934e-203,5.494515439560439e-203,4.995014945054945e-203,4.495514450549451e-203,3.9960139560439556e-203,3.4965134615384614e-203,2.997012967032967e-203,2.4975124725274722e-203,1.998011978021978e-203,1.4985114835164834e-203,9.99010989010989e-204,4.995104945054945e-204,1.0e-208]}
},{}],56:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var randu = require( '@stdlib/math/base/random/randu' );
var abs = require( '@stdlib/math/base/special/abs' );
var EPS = require( '@stdlib/math/constants/float64-eps' );
var ahaversin = require( './../lib' );


// FIXTURES //

var data = require( './fixtures/julia/data.json' );
var smallPositive = require( './fixtures/julia/small_positive.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof ahaversin, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function computes the inverse half-value versed sine', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = data.x;
	expected = data.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = ahaversin( x[i] );
		if ( y === expected[ i ] ) {
			t.strictEqual( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the inverse half-value versed sine (small positive numbers)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = smallPositive.x;
	expected = smallPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = ahaversin( x[i] );
		if ( y === expected[ i ] ) {
			t.strictEqual( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function returns `NaN` if provided `NaN`', function test( t ) {
	var v = ahaversin( NaN );
	t.strictEqual( isnan( v ), true, 'returns NaN' );
	t.end();
});

tape( 'the function returns `NaN` if provided a value less than `0`', function test( t ) {
	var v;
	var i;
	for ( i = 0; i < 1e4; i++ ) {
		v = -(randu()*1.0e6) - EPS;
		t.strictEqual( isnan( ahaversin( v ) ), true, 'returns NaN when provided '+v );
	}
	t.end();
});

tape( 'the function returns `NaN` if provided a value greater than `1`', function test( t ) {
	var v;
	var i;
	for ( i = 0; i < 1e4; i++ ) {
		v = (randu()*1.0e6) + 1.0 + EPS;
		t.strictEqual( isnan( ahaversin( v ) ), true, 'returns NaN when provided '+v );
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/special/ahaversin/test/test.js")
},{"./../lib":53,"./fixtures/julia/data.json":54,"./fixtures/julia/small_positive.json":55,"@stdlib/math/base/assert/is-nan":34,"@stdlib/math/base/random/randu":47,"@stdlib/math/base/special/abs":51,"@stdlib/math/constants/float64-eps":65,"tape":155}],57:[function(require,module,exports){
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

},{}],118:[function(require,module,exports){
'use strict';

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
