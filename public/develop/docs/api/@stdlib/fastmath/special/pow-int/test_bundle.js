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
}


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
}


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
}


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
}


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
}


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

var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
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
}


// EXPORTS //

module.exports = isInteger;

},{"@stdlib/constants/math/float64-ninf":33,"@stdlib/constants/math/float64-pinf":34,"@stdlib/math/base/assert/is-integer":42}],12:[function(require,module,exports){
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
}


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
}


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
}


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
}


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
}


// EXPORTS //

module.exports = isNumber;

},{}],18:[function(require,module,exports){
'use strict';

// eslint-disable-next-line stdlib/no-redeclare
var toString = Number.prototype.toString; // non-generic


// EXPORTS //

module.exports = toString;

},{}],19:[function(require,module,exports){
'use strict';

// MODULES //

var toString = require( './tostring.js' ); // eslint-disable-line stdlib/no-redeclare


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
}


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
}


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
}


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
}


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
}


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
}


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
}


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
}


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
	}
}


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
* Difference between one and the smallest value greater than one that can be represented as a double-precision floating-point number.
*
* @module @stdlib/constants/math/float64-eps
* @type {number}
*
* @example
* var FLOAT64_EPSILON = require( '@stdlib/constants/math/float64-eps' );
* // returns 2.220446049250313e-16
*/


// MAIN //

/**
* Difference between one and the smallest value greater than one that can be represented as a double-precision floating-point number.
*
* ## Notes
*
* The difference is
*
* ```tex
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

},{}],33:[function(require,module,exports){
'use strict';

/**
* Double-precision floating-point negative infinity.
*
* @module @stdlib/constants/math/float64-ninf
* @type {number}
*
* @example
* var FLOAT64_NINF = require( '@stdlib/constants/math/float64-ninf' );
* // returns -Infinity
*/


// MAIN //

/**
* Double-precision floating-point negative infinity.
*
* ## Notes
*
* Double-precision floating-point negative infinity has the bit sequence
*
* ```binarystring
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

},{}],34:[function(require,module,exports){
'use strict';

/**
* Double-precision floating-point positive infinity.
*
* @module @stdlib/constants/math/float64-pinf
* @type {number}
*
* @example
* var FLOAT64_PINF = require( '@stdlib/constants/math/float64-pinf' );
* // returns Infinity
*/


// MAIN //

/**
* Double-precision floating-point positive infinity.
*
* ## Notes
*
* Double-precision floating-point positive infinity has the bit sequence
*
* ```binarystring
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

},{}],35:[function(require,module,exports){
'use strict';

/**
* Maximum signed 32-bit integer.
*
* @module @stdlib/constants/math/int32-max
* @type {integer32}
*
* @example
* var INT32_MAX = require( '@stdlib/constants/math/int32-max' );
* // returns 2147483647
*/


// MAIN //

/**
* Maximum signed 32-bit integer.
*
* ## Notes
*
* The number has the value
*
* ```tex
* 2^{31} - 1
* ```
*
* which corresponds to the bit sequence
*
* ```binarystring
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

},{}],36:[function(require,module,exports){
'use strict';

/**
* Evaluate the exponential function.
*
* @module @stdlib/fastmath/special/pow-int
*
* @example
* var pow = require( '@stdlib/fastmath/special/pow-int' );
*
* var v = pow( 2.0, 3 );
* // returns 8.0
*
* v = pow( 3.14, 0 );
* // returns 1.0
*
* v = pow( 2.0, -2 );
* // returns 0.25
*
* v = pow( 0.0, 0 );
* // returns 1.0
*
* v = pow( -3.14, 1 );
* // returns -3.14
*
* v = pow( NaN, 0 );
* // returns NaN
*/

// MODULES //

var pow = require( './pow.js' );


// EXPORTS //

module.exports = pow;

},{"./pow.js":37}],37:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );


// VARIABLES //

var ZERO = 0|0; // asm type annotation
var ONE = 1|0; // asm type annotation


// MAIN //

/**
* Evaluates the exponential function.
*
* ## Method
*
* -   The exponential function is given by
*
*     ```tex
*     z = x^y
*     ```
*
*     where \\(x\\) is the base and \\(y\\) the exponent.
*
* -   First observe that a naive approach for exponentiation
*
*     ```tex
*     5^5 = 5 \cdot 5 \cdot 5 \cdot 5 \cdot 5
*     ```
*
*     requires \\(y-1\\) multiplications.
*
* -   We can reduce the number of multiplications by first computing \\(x2 = x \cdot x\\).
*
*     ```tex
*     5^5 = x2 \cdot x2 \cdot x
*     ```
*
*     thus requiring only three multiplications.
*
* -   This observation may be generalized, such that, for a positive exponent \\(y\\),
*
*     ```tex
*     x^y = \begin{cases}
*           x (x^2)^{\frac{y-1}{2}}, & \text{if $y$ is odd} \\
*           (x^2)^{\frac{y}{2}}, & \text{if $y$ is even}
*     \end{cases}
*     ```
*
* -   Note that the above generalization only involves powers of two. For example, in our working example, the powers are \\(1\\) and \\(4\\). To determine these powers, we observe that integer values, when stored in binary format, are simply sums of powers of two. For example, the integer \\(5\\) has the bit sequence
*
*     ```binarystring
*     00000000000000000000000000000101
*     ```
*
*     where \\(101\\) translates to
*
*     ```tex
*     2^2 + 2^0 = 4 + 1 = 5
*     ```
*
*     Thus, rather conveniently, the powers of two needed for exponentiation are easily derived from the binary representation of the integer exponent.
*
* -   The previous observation lends itself readily to an iterative exponentiation algorithm, referred to as **right-to-left binary exponentiation**. The algorithm is as follows:
*
*     ```text
*     1. Examine the least significant bit to determine if we have a power of 2.
*     2. If yes, compute an intermediate result.
*     3. Square the base.
*     4. Shift off the least significant bit (LSB).
*     5. If the exponent is greater than 0, repeat steps 1-4.
*     6. Return the intermediate result.
*     ```
*
*     For example, consider \\(5^5 = 3125\\).
*
*     ```text
*     Initialization: r = 1
*     Iteration 1: y = 101 => r = 1*5, x = 5*5 = 25
*     Iteration 2: y = 10 => x = 25*25 = 625
*     Iteration 3: y = 1 => r = 5*625 = 3125, x = 625*625
*     Return: r
*     ```
*
*
* ## Notes
*
* -   The above algorithm involves \\(\lfloor \log_2(y) \rfloor\\) square operations and at most \\(\lfloor \log_2(y) \rfloor\\) multiplications.
*
* -   The above algorithm may not return precise results due to an accumulation of error. For example,
*
*     ```javascript
*     var y = pow( 10.0, 308 );
*     // returns  1.0000000000000006e+308
*     // expected 1.0e+308
*     ```
*
*     If we compare the bit sequence of the returned value
*
*     ```binarystring
*     0111111111100001110011001111001110000101111010111100100010100011
*     ```
*
*     with the expected value
*
*     ```binarystring
*     0111111111100001110011001111001110000101111010111100100010100000
*     ```
*
*     we observe that the returned value differs in its last two bits.
*
*
* @param {number} x - base
* @param {integer32} y - exponent
* @returns {number} function value
*
* @example
* var v = pow( 2.0, 3 );
* // returns 8.0
*
* @example
* var v = pow( 3.14, 0 );
* // returns 1.0
*
* @example
* var v = pow( 2.0, -2 );
* // returns 0.25
*
* @example
* var v = pow( 0.0, 0 );
* // returns 1.0
*
* @example
* var v = pow( -3.14, 1 );
* // returns -3.14
*
* @example
* var v = pow( NaN, 0 );
* // returns NaN
*/
function pow( x, y ) {
	var v;

	if ( isnan( x ) ) {
		return NaN;
	}
	// If the exponent is negative, use the reciprocal...
	if ( y < ZERO ) {
		y = -y;
		if ( x === 0.0 ) {
			x = 1.0 / x; // +-infinity
			if ( ( y & ONE ) === ONE ) {
				// Exponent is odd, so `x` keeps its sign:
				return x;
			}
			// Exponent is even, so result is always positive:
			return PINF;
		}
		x = 1.0 / x;
	}
	// If the exponent is zero, the result is always unity...
	else if ( y === ZERO ) {
		return 1.0;
	}
	v = 1;
	while ( y !== ZERO ) {
		// Check the least significant bit (LSB) to determine if "on" (if so, we have a power of 2)...
		if ( ( y & ONE ) === ONE ) {
			v *= x;
		}
		x *= x; // possible overflow
		y >>= ONE;
	}
	return v;
}


// EXPORTS //

module.exports = pow;

},{"@stdlib/constants/math/float64-pinf":34,"@stdlib/math/base/assert/is-nan":44}],38:[function(require,module,exports){
module.exports={"expected":[-1.3297897593702097e33,2.3083162010786116e119,2.799437594898391e42,-2.6303492486040235e-102,1.109088235948353e124,1.9137687942437624e-144,2.074438767981497e-150,1.9960438336981345e-84,2.3479766053584233e-69,1.685910540344655e108,5.364970246144572e17,2.561800279641958e-56,9.08657439459352e143,-9.546817100367184e143,1.6110734528456746e-58,6.11732630516456e153,-7.079486470490644e-111,-6.133185364078259e-177,3.472170256746327e69,1.1996331071080528e162,4.174790961874655e-139,4.394347149794582e-197,3.807558318453675e30,3.7677064230197287e22,7.22835366517033e51,-1.0840398264757931e193,4.8659654778342667e-5,-1.4226134375337481e-67,1.4099847529921802e136,1.0631867326562842e233,3.005912958564041e-13,-348.2211994475682,-2.2596177687619504e-239,221619.16242830962,-3.9332291614821457e142,4.4049395409058496e-181,6.539161598808567e-79,1.9465084344941193e10,8.14660650144249e-53,1.597263166098653e-102,2.8699004071356966e-172,5.920691535189024e-48,-2.040291935707577e-159,-7.489258934208866e190,3.0293424311514454e-185,6.006868683488762e-218,-1.179616274270484e-152,-5.811263565446308e-186,6.1890552252335015e-59,5.146805157930043e-218,9.44340575242913e125,1.0088284671371635e54,1.4608533742797114e52,2.1660629841072268e-24,5.391345158234129e94,4.958372010215288e193,3.772208748095271e-158,9.572741599501921e-106,5.477247172099556e119,3.8464610729676205e-164,4.666723786860395e74,8.318290610666927e-79,4.1190297792874107e-72,2.2479710767719944e-181,8.812121208385573e-55,8.226050406786915e47,1.0083465639720457e-164,-1.3221037375860946e-91,1.9176958097667054e170,5.589629909143552e228,2.3830699792197585e177,7.594713947267749e-77,-5.470664122780001e-23,-3.0993559821049017e-69,4.415051149497672e-68,-5.130433937020776e-203,4.559358118951844e7,5.2077692808083973e-79,1.0334918517444897e87,1.4604295883066749e-62,1.5783310668771047e143,-4.592849439488372e-40,1.3511500525736366e-63,6.8328922382205805e-105,2.746680509810415e-24,2.866320073189059e108,6.708356354195252e76,8.71294197744216e8,7.176857368173268e-241,1.5457412137161411e184,1.533321222100985e-19,-8.197917562446749e-84,1.9721369288791674e-36,-8.986401271286766e97,1.4943591070175446e85,1.1870710960251516e-57,48683.3673381816,6.762333776855142e214,-6.90495862294002e-241,1.5521592112860911e-220,1.684653488293018e23,1.8338022763544261e50,4.585905362021885e-247,3.405767617883973e248,1.0235943698105116e-153,4.30300575390098e165,4.612558367633058e-87,8.469204388637492e-154,3.1724474964429427e-47,-1.4449927629281235e26,-2.715976272700947e22,3.6149743122211973e-36,5.522715609724105e30,3.570988013149307e-235,3.3089604268880455e-46,2.766632595433758e-243,-2.159000991185678e87,1.494959795564298e162,3.052384959385052e53,1.0992806363663808e205,5.263973455159398e-98,-746733.693119135,1.3767471757966898e-5,-5.0362438299777824e61,-3.751348925544775e-56,-2.35123878864771e121,1.202639581051106e202,-8.098236237770103e-40,3.1136039691434e183,7.689063288210491e-143,4.238951687402121e25,6.872002627951972e-101,2.9181919069328594e167,4.747119174827342e159,3.1595685928134096e-69,-4.510294953249123e-152,-2.3933218528363377e97,-1.0848454607123231e-8,4.508225696298837e76,-1.2570464447372058e191,5.791759803220217e-70,-3.954373847219543e-211,-4.771033654393786e-182,1.9975658248815946e127,9.887228208948715e-62,-1.3911584185600137e-101,8.220652138826303e173,1.0617110541554673e-37,9.706107602970618e-217,-6.023035032941218e-65,-1.6247257601382223e28,1.0271686268977441e-217,2.0279330304961055e-233,1.2757062780938248e71,6.948009105148625e-64,1.1146715406586961e-113,116733.01385068537,-1.1415900309975258e-235,3.542939268314296e-126,1.982737728601905e42,8.892275520348317e35,2.2913211286176226e198,7.535751274220739e223,3.847353778278472e-85,-1.2987809675621952e181,-2.5193499031702197e-127,1.137576345369095e-46,-8.913932368408925e-89,1.0334138122018976e-35,-2.8545795701485e-160,-2.623870217983589e-109,-6.401154465433921e-111,1.896914791392329e66,-6.259304465412067e195,4.510309210291569e-65,-4.0216178328659664e-123,6.92894935478009e157,2.6593430349576497e-119,6.468157048526874e109,-6.915460452663159e-81,2.537596701002534e-82,0.15694635603639184,-4.1701160033917075e38,5.749270860733695e-107,-2.087476836969078e121,24578.088085470237,3.479276540459718e-171,2.692737207155525e-146,2.0187110692277276e-106,4.0830465907064813e-196,1.6091767619449738e258,1.3062718211050635e-23,4.4000451278183045e209,1.964038704393058e67,-1.8178316341797044e-210,1.9127060202244084e-46,-2.6039754979196575e104,7.352778473221295e61,9.406361275450422e91,-1.0022881077602281e80,2.6825507170234764e24,1.3843822575149796e-34,1.1979395885874283e-108,1.85093968557951e122,-1.3744619629351213e-150,4.5610356513834644e123,9.76769378819063e-183,2.6600110691842425e55,-3.0149366133452765e171,5.600837731836244e173,1.197959130133607e-50,3.484962402578653e99,-2.0715897472370374e30,-1.3094919436709668e-105,3.6211946968603807e145,1.1506091825987484e-253,4.870667063399331e9,1.9041885659529967e-116,1.5111123685448787e210,4.83280469968466e80,1.4306944680630787e-41,8.089580141185689e177,2.889005225572665e-111,7.353043446471313e-255,8.515610788654783e248,1.0859152671413655e-18,6.814516892762288e-24,-3.681935426282372e-38,1.3205503215757453e109,6.589994571943943e-174,3.2649931455815464e-93,2.7162499280198957e56,1.0338613826398513e168,2.207904524300414e-93,1.3184136765890522e114,1.2020564703947864e-120,8.6945036471491e160,5.5115938334095454e-45,1.1513505345888048e-75,1.191362699248384e-163,9.33467830151773e34,-1.147589266751141e104,1.035109224965454e88,-3.384487598964912e-49,-1.7829454218371586e-71,7.897080763811702e123,-2.556560135171127e112,1.940455157650263e95,8.468874981336832e56,-4.645127940950725e59,-1.3508866185885229e147,19021.614284616946,4.7513606849622965e-212,7.408552218248574e104,-4.6825402256704004e76,3.837769898213351e19,-1.7854213200772886e-58,-6.0883538028331554e-21,3.1760627769981047e52,1.3073483785311372e-53,1.3446528384039886e-144,1.9750420585862868e-177,-9.860208874122258e-185,1.6195654912777469e-124,3.801941193072749e193,6.094261582645769e-70,2.6629620669443994e-112,-9.008380293133157e181,2.1934377779867457e-63,8.024456538939513e-101,-2.8115001911160136e-19,-1.0141672839706358e-137,8.201962990610485e114,2.30225448923897e-11,3.011952875761353e-68,1.7276949188123888e134,-3.4378356801473945e12,6.680084423707972e134,1.3377170137044634e222,6.133905305705092e-184,-1.23602125830325e93,1.5814535842208348e21,4.11826781291456e-117,-1.477428756669751e-69,-1.315858905667046e-25,-7.123062798620606e-52,1.3846774996784696e-58,-8.264546650402515e-153,-1.0890204141679305e184,1.550108031885855e-39,3.372496067368898e-19,5.621060525536214e-113,2.7149844011850357e-193,6.320581914566576e-110,1.9469712028395604e112,7.748777449707487e-121,8.092321630079459e220,1.2644006291936512e-37,2.274945896695111e-8,2.4977288342516132e-225,3.4572636155913976e-188,1.7413133345689575e-41,3.246132079056028e98,3.95960199398094e-173,7.812688624647249e-16,5.674406477847768e36,1.6831983526123104e185,1.8904563550324567e22,4.238088517094568e-7,1.0665498337902746e-10,2.1106111002024243e-103,2.224742304571951e225,-3.0937483919141788e-183,3.3513136495376475e14,1.0206172859274927e-102,8.771695388580446e-184,-3.120980831177856e-62,1.2768074435068714e-226,1.0157432303258915e140,7.378966468716378e-129,3.472032073846346e-64,6.245028884414648e90,-6.656375799666768e161,7.04796827860102e-57,6.7084269028927504e-149,7.566346140593875e96,7.600720326193672e109,8.479690964961309e-80,1.205080476066221e-90,9.819128614662607e-84,6.67837396952925e98,3.679207352085725e204,1.2546996027737035e-201,1.3626270645594037e106,3.9463342292309495e130,2.4984629179157777e139,2.6371846476304657e110,165.28138814112742,4.109253425498988e-187,6.803835194861906e122,4.250003871648886e-254,5.356335258827684e107,8.499350537674149e-89,2.3606000011132896e194,3.8088112843492105e166,1.5650130433892969e59,7.02037889185339e-67,1.1965611059143286e-158,1.1419186711711201e-20,2.2860653596128125e148,-1.8929511619551267e-180,7.526791583121268e161,4.253822241514308e67,3.522633482654185e241,4.5386255971825777e45,5.892026613902597e230,5.77970085100079e218,4.676266933613188e-79,-1.6967175054657122e-181,-541268.6310643167,-5.579076373373446e66,1.5767315102209658e-130,6.315510203486534e-142,1.7175849028040084e-41,8.664940902567008e131,-3.4555829749966625e84,-2.538006388086444e210,-3.138941097743468e-18,2.4634609792678092e-135,1.2627218071934598e-8,6.743366868452969e-218,5.670204709340957e-29,2.6056980887806302e228,9.382134968103865e-177,1.0366253343119577e119,-2.6563023234884945e214,2.727982877899131e175,1.4213859915865297e114,-5.499363305945061e-93,-4.201785694147131e112,2.2541107099278458e-120,-2.919460699912001e-79,1.1662291752151833e43,1.0563025655172764e39,1.3858952583419313e-213,6.470329005366688e172,1.1241840153114842e-230,4.959995057379582e-80,-6.380428942020965e-81,-3.193788664317238e-156,2.8320778066300206e-172,1.1361884837543638e67,-4.693947467570048e-47,3.32330288351079e-146,-1.8280645667185756e-46,1.2744288654027117e219,5.040184760116028e-236,-8.080146370496602e-130,6.722238423928646e191,-5.890970665588285e-125,-1.1433776943099499e142,6.260033716517236e167,9.581941453315723e109,2.311897765112549e-243,4.734954618075124e-69,2.08809274498457e107,2.1740446098846897e-12,1.624544493982216e-216,-2.8647352479888155e169,4.820270252899396e248,4.532889630436481e-120,2.0326717660930206e187,-7.771287302436194e-232,1.448509079193328e-173,-8.122489895288152e-14,1.1954686735194001e9,3.0429332178578865e-114,9.76486838267593e173,2.3277159369696855e13,-7.543678851788221e-149,-1.1733613372216747e-34,8.227116929689033e29,2.0148090964118797e-67,1.6160119089026826e107,-7.037572475327875e-164,9.66030064307673e-175,1.8082000425885428e-26,3.2622330741447524e122,3.958187954147557e-123,-3.0786411708948324e-203,6.851749577597734e129,6.324771362229808e148,8.662503870857773e-137,4.551504940203884e184,5.142440316567894e-137,1.9974134963651086e187,7.650843308297951e61,6.226167498517102e-157,2.4423768122567292e42,-2.1133722688709195e212,-5.495064561946845e-239,1.5888658621517043e-184,9.93459884808515e-44,5.774666862922595e-144,2.9691018586809313e-69,1.6802001389420452e-25,207436.7354473318,4.2858424052632e-147,6.760992753491297e199,7.204001136166924e-39,8.285632873328093e185,4.3740076675741833e-72,5.497417213551958e-32,-4.805392752482848e239,1.35067686094019e86,-1.0433763821951985e92,-4.0954614914329623e-19,-1.4993860660076492e128,1.3395373170097771e174,7.806996230149366e-119,-1.476680856150435e193,8.290462377729604e81,-1.1414613941356433e-121,1.245425697094592e-199,-7.436440959452095e-211,2.329749384272534e-134,-9.114339490429833e21,7.536602358407283e-253,3.779827121328078e-148,-3.6520663034618055e235,-3.8448201724337755e139,-1.9030897800409856e-211,-3.138028710529466e170,2.6129234201065825e-179,-7.293012486971817e-130,9.498284757917609e184,-1.3358538706192195e127,-3.513873007347671e-204,2.2516708955007468e33,8.399822959808195e-151,5.2387194866578525e-135,5.989595901799616e-223,5.971399549753262e-237,-7.17889951847304e183,1.031731763414069e-17,228563.29204066406,-2.1715451763979012e-154,2.151773764547727e211,-8.132037646701721e194,5.672838874650516e103,1.1131796545641786e37,3.5800077699402275e172,9.49401694265051e-77,3.1445621415296817e140,8.734482045429806e72,7.921347958383653e8,1.0698418064196663e-13,5.219010264679879e-75,4.344934486372256e-99,1.876399934485745e-68,1.4522746808319543e26,-7.202765917650545e161,-6.271173327172701e-196,-6.5674136989085645e53,174308.87488741963,-6.511892422707545e126,2.6042875389081436e94,1.812236122963742e-11,6.977150453396152e190,3.404032363347205e-54,1.7736281558352873e45,6.785020447498767e23,2.826632410389454e29,2.9554333741886986e31,4.3420084419349485e-96,-1.2464832341234728e-179,-7.18690096675012e-76,6.372529583879636e185,-196.11284765818817,2.1085226991952907e-35,-8.46431254422684e-66,-6.770851399746691e-85,3.259010125304507e-198,1.4646672349707773e52,3.116170421162002e-80,1.101708897187694e-52,8.120670511063868e-150,2.3787244047305576e-184,1.2858102178967714e194,3.4547414705257948e-220,2.284968131730245e-171,1.7349068160433435e-76,-9.827037577285264e193,8.13531521355032e82,-4.906638354006427e-85,1.6708179616005556e121,1.0287504048341999e120,3.441657838056174e-18,4.264157073115729e-12,-3.4327432068283696e-185,4.744338554552864e-240,1.4389765968983517e76,1.014407270791157e128,-1.4712116822152774e95,7.132748710532749e-133,4.59685025883834e-42,8.78856821801556e202,1.1255880086465307e154,4.684097532547827e72,7.875621025365069e-179,3.626712095692302e-45,5.961856863280785e-91,1.6410121328960174e-20,2.966810148020905e85,7.779535589268083e-89,-3.671866479554895e-71,3.051500006331811e127,9.929308221447664e35,6.71284874913601e-231,-1.8870159965169072e-51,2.6588216938066036e107,4.140132069329717e154,-8.690062180447323e-191,3.0733041228502197e140,-2.6008186667503146e80,2.0603632809477942e34,-2.949650382192605e92,-3.55284394406484e238,7.303077590894674e-14,-1.666691117827494e-105,1.604144213054575e29,0.003258955242226477,3061.690302953446,-1.5260294473572669e143,1.0,2.1825148664674066e26,3.3026792558833568e-90,-4.1410284643632713e-19,3.5290887569588846e-262,-4.8854294855247503e173,1.2398383754622274e-178,3.661082497006975e-95,-1.0481748615726756e-80,4.68295858238587e117,-3.4667132884716876e-24,7.998612132901041e-39,2.7549128374492677e67,8.40950528575851e-75,7.458543875217196e131,-194.70704043146748,234653.8329006257,-8.049750056774172e-221,-1.987124821638894e198,3.0730781138271706e-80,-3.8976715284981895e131,1.9137130078465752e-241,1.0445093176230402e-50,2.018774949331592e96,3.517793686243944e164,2.6041443474711814e-168,-2.2952177453831665e-94,3.734629784042239e144,3.256914753016473e-210,3.1141892302069967e176,7.988842369478747e-151,1.739213795666245e-148,1.1746166455339531e-244,2.9073402691261576e-200,3.7185601826861914e-20,9.062470484369364e93,1.6269830825511556e123,-2.1066252117465364e-207,9.851045815170618e9,2.922781426700697e107,1.827781460297797e39,2.4638240021526044e112,3.577853678116652e102,1.812658907634454e-148,7.533455722587231e-14,-9.836946829766576e47,6.186015932185248e115,2.0278973727424824e149,3.521879637829307e-79,-1.5687465644277604e149,1.111602712253192e7,-6.069153588400092e142,9.303955333603905e43,-5.2127147593519675e-161,2.013120774333729e106,-481.53504810350125,7.052926982954662e-146,5.0455958423272175e-126,-3.2406270672889517e-34,7.563851220934914e-148,-1.7913537163453023e182,-2.2277903373884132e-23,4.000812571728567e163,3.3495991447578446e169,1.3205392386991744e191,1.6737713521367902e112,5.880111613054029e-6,8.351056948580238e-181,4.359705135536854e17,-6.632444317818526e151,-1.3096890555939016e238,1.3671443088581444e182,6.509498850540163e-69,-2.0896931476156244e195,-1.205596525686872e-30,-1.306819805711867e58,2.64028407053669e-229,-7.618596774649093e-83,6.0719501286934714e206,9.179549091734891e-127,2.3613854206132257e55,-6.263087285462369e208,2.359631521604296e79,2.0634738414886294e147,-6.720182905334678e-55,3.543444330256449e147,-1.1177818481141582e-172,1.5943171723470597e-5,1.224661871843585e-142,2.255347085163365e-147,-1.3295964027888842e112,-2.217945966364889e261,1.4245327990968102e95,9.139250217568715e-204,2.861958088109364e-118,-2.2065001386259656e7,2.5440365242582012e154,8.549927256151499e-111,5.715409330580716e227,6.400314269191179e49,9.835760048005047e251,6.038290835732465e211,158415.61789911368,2.1474009311720414e-43,-1.0311454814847244e128,1.4055219206814155e220,4.545597590600975e26,1.6958787369418159e-133,4.181937394781419e-30,6.693207310154371e85,4.3760331492626476e73,2.506857729109688e172,6.923918661508884e14,-7.091063771913144e188,-1.4578265116194713e-62,3.0565434018111774e-80,1.564504683656124e-64,2.1423707598266015e-153,-3.0603688017422696e108,2.265631624257779e99,-3.353734331076473e-96,2.274547772719048e-178,8.250095254528483e-139,3.0308577235455314e-108,6.80110171798195e92,1.1174054029377215e26,2.496630468008515e130,-1.0832223564027418e-177,9.752067892177982e-22,-8.308981949430522e-58,2.4002455635296234e-193,1.847137327076704e-92,-1.3158025904598354e-145,-4.188391719086845e26,-3.3598434843972583e-228,-1.904543109821e118,3.1452434325870206e-237,1.836609182092692e-181,7.211438685618177e79,-1.839328607998669e215,-5.501353469537068e111,-1.362797986631106e66,8.376073257704517e-138,-2.119145615237278e-65,9.551754785934342e-103,6.822231338415575e85,-1.9597118727374743e85,1.364581930787081e-89,3.256309750077264e-263,4.94155353557114e-119,-1.3500027851935556e-236,2.5469322352959292e225,-1.1094441660667393e-48,-7.627745952964802e-108,3.137457114501008e-104,1.3542443709324148e88,3.124418200025864e-131,5.133913524695739e-78,3.250785470488131e119,1.1787594717420982e129,1.4101726335354147e176,3.298316372977756e-67,1.619816600384034e-131,3.9810073972509605e-196,2.287946494951524e198,2.5358474476710535e137,1.021502705086833e185,1.5280398900261516e69,1.5054458745946283e24,3.412371810244e198,-1.1075008162304946e23,-1.2036720659212037e-236,6.851513971063287e-104,1.193447554415198e107,1.4547346494314523e-42,2.8266635948099223e137,-2.4405480795525556e-154,3.741440519579904e47,-1.5576310517604947e190,2.343166626421429e-170,1.2706179838583542e109,-4.5852066182834074e7,1.2436357598968751e161,6.32125012827509e187,-1.6262500105951352e-156,2.3100010825076734e87,1.1955956920311865e-90,8.927603652131028e-216,1.5215235815645236e-175,-1.5043676935541843e221,-1.3467149697956279e51,1.230481079474601e-85,3.829721187187442e-83,1.4360192185544035e220,1.7290177656933e187,9.851923431640033e-30,-8.96336901611705e245,1.5999818958073883e25,1.2836062056607955e-110,8.342960829329631e-68,-1.8267654919038244e122,1.3459005063573149e163,2.283542783958553e-39,-1.2756052819756926e-202,6.619050052779857e-103,2.4949313763009683e-53,1.5819672977944136e177,-3.820066661552945e44,-1.9939845866590474e193,-2.183581452365419e126,-3.777525619564119e-14,4.604303624659784e-96,1.7671222994758003e-266,2.0144167497323124e163,2.0027018910383443e76,-4.904581791917671e-61,3.6528823355818855e33,1.3975330531192073e-200,-1.7690150548884598e187,3.0902293500840605e51,6.555424813632044e-84,5.357482381308166e97,-1.7077202224956638e-50,3.5010319663293745e-22,1.095721948435643e139,3.5552961803878135e25,1.0857294267548804e11,1.582600057622983e-20,3.4806326991916267e51,2.7231904556940457e-171,5.063573159711921e-37,5.0200715953051326e-207,2.59498681149924e-93,-3.265922448269805e-210,5.678978641121213e149,1.825284770502211e-20,2.466527138421183e-60,-5.6063829739690206e200,2.0635487960203074e149,6.82945421663298e190,2.4361944369421873e108,-2.250837893635016e-19,6.270998021697979e-196,-1.0709297326158595e-82,7.12026992475539e-178,-2.0912549865203202e-167,-9.82775676392228e-38,3.302613416830971e32,1.066505564417124e166,170965.9432302801,9.007128641674337e126,7.78248760694584e157,1.846968354970311e-201,1.3337624701869926e8,3.718923014450708e-191,-2.2301171405319063e-71,1.7672915392195478e-97,-2.1966486461936507e253,6.789393270263479e41,7.294599248379213e-88,3.457366773105438e-179,5.112366475666732e36,5.222375345789997e57,5.630684019057365e150,1.6532030615387033e-98,3.894911638899719e190,2.7202414978778534e-18,1.970309888646245e34,1.693715508035786e126,-6.066793522349398e185,1.4927094338441103e-113,-1.5462521148440326e-219,1.715259843657963e78,2.616684916866119e93,3.46644138466301e247,1.7996399455981869e-180,1.0160559104740998e-96,2.0573525535606196e-141,1.5534194855036826e-27,1.0008441533685983e-206,5.929638800360829e-200,9.840213376508417e101,-1.5589875262225076e-75,-5.928025535283409e36,4.9347399645433896e-96,2.8927738720680454e186,7.648589685164495e190,1.2040817505293618e223,3.288141305968594e91,2.0689229267632156e-171,-426.23436132356795,8.812740372761956e-212,2.2982210511840045e-61,-3.668361738092763e75,-4.330576185598274e70,6.942679200684142e128,-1.3726126157658094e-33,1.2302578919643806e117,2.1998087498098897e24,-1.3535018933588703e-86,3.6529473191096874e176,-8.157696422666427e71,-4.8215353401333883e-150,1.0193203518755196e-75,1.4763979834343795e-142,2.1964673528508516e6,4.769531018714729e-65,4.365621856407531e155,7.96428276702187e-246,1.651473565820768e-97,5.326518688074197e196,3.645278395282996e33,4.969429104801687e100,6.593422739671252e208,9.778638370787516e-165,-4.067370186936657e-124,1.060619821258783e-28,7.013632112557212e133,4.150082337676747e-193,1.743446886974475e145,8.008001768083887e188,3.92177203526679e-37,4.903325135816803e87,1.595293188557497e17,4.072416529449095e203,6.248255980963939e198,3.910964232777079e145,-5.263604841061312e48,5.247315546283363e-184,-7.531240162936028e31,-2.147797144389721e-102,1.5621271900859216e78,1.8143350652303232e-46,0.010259360478012677,-4.610011487822936e-186,-1.0311364467644849e91,2.5569881591198854e-237,1.568774733684872e-16,5.478404940417528e7,3.8243771404521963e-88,1.8430146350703778e20,-1.0223224186079479e218,-1.2061881736200797e258,-6.2229865780109484e203,5.40307119391601e-83,7.079580339065609e-143,1.734729883644584e-197,4.167621113630714e-145,1.190550754079414e244,3.2273302064311908e-83,2.1824181014429155e-233,-1.5419173084345983e-137,1.0012927312512539e71,4.465429950963779e63,-9.123890715764858e-62,1.0797707029488399e76,-6.743861520944893e71,1.3006869097988816e70,-1.2211255758324658e-121,2.664767886579604e24,5.918157060971398e-149,2.5142272743918017e161,6.13723912785055e-85,6.937621239205144e-60,7.60418335674483e135,1.9420951249605018e-199,-7.498218604512266e135,-5.536412672470132e101,-4.144039698566393e-221,3.844296580175167e-129,3.293945782810204e-16,-3.573397786919715e45,2.268309680478162e-40,2.570025848579176e-53,1.8909194267850833e-107,1.4039458708182916e-45,1.1898312968469178e-67,8.416238176492568e52,-1.0131206610173181e-49,5.281075697503825e27,1.9820526201889655e-143,7.061027265403351e-215,5.129789311387742e23,1.6562563523709711e159,1.1713703084763604e100,-4.5535796888486286e185,7.39776978093276e-243,1.263914965375265e135,101548.62572245416,6.0493977878949506e119,7.789909005211764e-164,3.1918674100850346e62,6.0342471677020205e-86,3.1936767327614844e191,3.564607710127326e-18,2.0240032689297614e182,-4303.075291390182,2.3491373937661512e-175,-7.10232214374745e-60,-3.776990738527094e204,-1.6655323068757856e-110,3.121534547251121e-146,3.174721617623382e-120,2.483689322970673e-41,1.2238450699195688e69,2.4645231821249137e172,-2.7770096633537036e49,4.4547091831924505e-77,8.874728000489121e220,-3.105703254918671e-165,2.570564017662775e-184,-1.182601303877578e-215,2.1668237249329245e51,-3.066505352866695e-33,6.114920313734565e-98,1.3847486003979577e-170,2.5284038926656224e-125,9.973798773693967e-197,2.2377277768700235e-53,-3.114826662994257e-119,-2.021848413721131e199,1.313503195340744e161,1.2471361424439148e86,-1.2674647916751407e183,5.1872092000986564e88,1.772326587273098e203,4.3176324019885616e-27,1.8662308400672336e-153,2.105301666222607e-183,1.347469168008428e-185,-2.076497773541159e-43,1.4822690680159403e60,-3.785263534158867e-88,-7.397047678413998e-99,7.969584530596877e-176,1.5681386467674915e209,1.115205220167343e42,-2.315978605212135e200,6.443042117297278e104,6.160217121703946e-192,1.303878502012092e-42,1.1252855725806017e131,4.40614018321881e102,1.3423847344654767e-24,1.6675241103362715e92,9.914491572766688e153,-7.501109737986447e140,1.6985142256020735e161,2.0325279127144344e82,1.2964705458553345e-31,-1.030564878140425e-92,-3.9453794020767246e177,9.465215756104834e-56,6.695419709371821e-184,6.91433738259215e157,5.37846517356827e239,4.4188117550419445e55,2.5278807602926275e213,6.431042357782963e-103,-1.336570866649237e-217,-8.92576352397205e-24,5.387565281804713e-42,5.456244098945572e118,2.7553932565466904e244,9.559039848292112e-127,2.602985240947521e65,-1.0265258936344423e124,-2.3969233149156092e-237,-1.2028015300665625e-28,-1.2468324187350027e187,6.571056414825615e-147,3.771754693270263e98,3.043104480339519e252,4.560054879693745e160,-3.314513773704683e-176,1.6296619291477147e-42,1.724416141655687e-24,5.934563882354791e39,2.2038687544240736e-144,1.2429066113385358e-8,1.3713483605593836e-148,9.581307075026415e-27,2.8349495976021733e-171,2.1862329324611397e-100,-5.124121451287952e63,11420.290950838466,6.849328425802015e-162,-2.809628234165195e-139,1.626556334050147e-153,-2.5212953202564846e-108,5.763711114842817e-88,6.171352774662323e69,5.827638265500476e-66,2.5431127921178435e-213,1.0625414190936452e178,-3.1245431152854784e-49,1.922651578465068e-221,-1.8189067009217723e97,3.7497123992586625e105,1.7083868487696248e82,3.7106678162220934e86,8.922744827267348e35,1.7272781659630902e126,-8.744857141221347e-67,6.242142023874482e213,1.6883978324954428e14,-1.9939539054755046e137,3.4494016107914814e-179,4.3410599318424743e161,8.108983352732576e-30,-2.736321046230502e-55,9.457183717891315e125,-4.502964562513578e138,1.6596978883376607e-11,1.0631392831581926e-92,2.716335164987636e-103,2.245539102089255e-30,2.681508139454748e-173,2.1465233783533936e11,-1.2209515319069194e71,-1.8437448327814634e-24,2.960441625245387e-249,4.188335395868138e249,5.283829483380973e-223,2.586819697548057e-66,1.1482916128932594e-173,2.428324765983293e195,3.241285322910255e-129,2.7175650020893653e164,5.556767340118995e-181,5.064816856947869e-224,-1.5416648346268395e148,7.819945815029197e-52,-7.700271352941725e101,-5.204682112692264e80,3.174058322994154e-200,1.5725371342617622e-104,-1.7006522520295472e-14,2.023604266818996e54,2.410560546913717e-142,2.916614700982624e-93,5.094075470784333e-79,1.8788850129031682e109,3.278932941807317e-47,2.591438726306756e-162,1.4436444366643578e14,8.754761775504464e51,3.8012542727641744e133,1.7790234190643116e199,1.406627047132711e-35,5.234057975212913e229,-6.30520224100441e46,7.520034417384645e125,1.2910658099652518e144,9.499784479172632e-140,2.3134664631358435e144,5.6321652919574304e-102,1.332981726054271e-145,-7.652090820604752e-33,2.507579791215558e108,7.200373909269776e236,1.4113619661872554e-227,1.467811340184012e84,-4.010812579508965e199,9.841714934569139e150,2.593782751767101e117,5.314686371306115e39,3.938467029849147e-86,-3.517871165795569e258,-7.849979747999959e61,4.92397354468796e128,-1.7353886494826572e94,-1.7435149045066658e-162,6.745873234686429e-56,4.012823079166377e-34,-2.6628540808820087e107,2.1200629156047577e81,3.5777060997624085e57,6.148266845345685e-173,-1.0471387178203915e-94,-2.572295551455838e-41,-1.8623733729816902e130,-2.2728405841233904e-64,1.955414677158508e81,1.433101763418245e223,-1.7743522591443544e-236,7.17304270586932e-24,2.9303640616326337e78,35326.616588230565,2.2806038734298256e-201,4.252500002933589e-111,-2.3279387274633574e231,1.4438434493652896e-151,5.445950830502936e-91,-2.0803241425141043e-181,-1.4985064160773334e122,4.45318148016791e-15,1.6831600997969246e-211,-3.5897955506077503e137,5.9147907502468607e85,1.624237632289951e-48,3.6609838060423354e114,-0.002593402618539226,8.22598838287432e-90,1.0135750611143514e152,1.372367028221903e40,1.1728822837701816e-18,2.875501258894517e-194,3.7982520168759203e-237,3.83043174559477e136,5.4230120269695495e104,2.5261012992902396e-154,1.0278933862708361e143,5.946052342083487e-83,-2.8236412565987903e-242,7.354330935457178e257,8.728154393320812e253,-5.469378186139122e-68,7.330936849078594e32,1.0857210186099551e-218,-6.110578376188063e114,1.1408751290656701e-88,1.2598563723875609e-86,8.364122773345173e-139,-1.610815733205511e-148,-3.168753964095829e-84,-8.263148095870843e195,4.374710554693808e12,-1.497246419154974e-124,6.533972372186673e18,-4.5497928131674537e18,-6.548490941912956e67,3.3465706158799494e188,2.1285353415318696e-108,4.6249223604859816e225,6.9307560772321414e13,1.7867574414631578e199,3.364972398398336e18,4.390061410691638e-6,-1.1450193882402871e120,2.4601048945214973e73,-9.054548494838751e-116,-3.2520278165611085e199,2.7401627252633335e-259,-4.724332346129871e-176,5.3346171209781135e135,-1.3917346646455013e-114,6.9771410319556804e-74,-1.6012186563523635e65,1.006831950073466e79,-7.5442697498200705e87,-5.567115166236127e224,3.108666620175903e18,-2.484680640421945e185,2.571281394303633e-125,3.057271394366341e-108,-2.081983132813756e123,1.2568368955206864e16,1.1600948926255055e-155,-2.6606006142608598e-65,3.4930222706405586e241,-1.7286051466257582e-61,2.1370365278185455e-166,3.478368637164896e-118,1.2930339942052496e68,2.463515209323202e-201,5.647273316055643e-190,3.418869758731242e239,9.274519629841442e127,1.6513447950349617e158,4.6346710360528755e-183,4.1548514138501615e-115,1.2691714442377254e164,-5.557958660239152e156,2.666268448243354e-127,-1.0135749086149733e-12,-1.470366620904094e39,-3.5254718807684977e-12,-5.951251029550007e-155,2.557459952620989e-75,1.1638450763125493e-139,8.077043692424641e214,4.363133001014414e-56,1.3195265342301242e83,1.0532002243958163e-153,8.326563623160835e33,3.1301739358741834e-52,5.3356583488207e70,1.691416154731959e-220,7.276612517004035e138,1.5396900900708205e33,7.550547152060634e-79,2.8824118694402717e-121,9.00058760486435e80,1.0205635373559345e187,1.4788347899227814e-145,1.1224529440564437e160,3.0536761750354776e153,3.924933361895543e-128,-0.0001863834540988652,6.193701253725237e213,-3.418915893870972e-204,9.360119684388701e-75,4.6380836867717476e139,3.439359428576494e109,1.4672386265276724e126,-7.841073309511486e-109,-8.642223686578061e158,8.338978232097477e137,8.613801777852079e191,2.4451970347345103e-100,4.5902112044236706e-151,2.7679347341050312e10,1.0514854524895349e73,1.0235059577575858e190,1.637345869009315e152,-4.0628049503795423e188,1.3665277142049513e-174,-5.1930233727878895e-65,1.7488852076463037e-11,8.589775197146827e-176,2.1233181883814968e135,-3.681650948075662e191,-2.584114987326215e-105,7.792167770461785e-220,1.2663017066931905e-84,-7.305469918071528e-161,2.773487225362313e-141,-9.718759226787054e255,6.697997660363867e-245,4.144359635730079e-194,1.048802779656654e-170,2.282719044953787e172,5.7730465778718195e-70,4.686937007760186e190,1.239591263917481e239,-3.930370842319419e93,-4.9115874097741076e70,2.7422679204443103e87,2.4569070460723438e-54,1.3780525421760674e133,-1.602470740795692e143,2.291218113239917e-210,8.155150232109922e30,-2.0516663707980493e-216,-2.3514133106998927e182,6.476163533876167e174,-4.317599133087385e-189,-3.2865359720298966e51,4.4189709122579907e167,-3.5295475318018766e174,-3.8969348319248776e244,1.3638859955237237e262,5.082137053639049e-19,-5.898152996618798e-143,9.751578680166595e132,1.9517912274124815e165,4.3149155341807064e220,5.3267133945252144e10,1.68761350221696e68,3.493158712502907e178,5.407155531422167e22,-1.4477660821276424e233,1.2408306694653143e134,1.7704198400721823e-58,1.9127140835251275e25,1.989139571712063e-19,-4.2657341394383346e-89,-2.672224403042404e-7,4.0989276930134964e-23,2.0808373738602565e-247,8.23755659276863e82,3.0610393090729006e-56,8.33224251838745e-252,8.095839903493461e160,-1.1018676233525289e117,4.742454792085513e-78,4.562520178721476e-35,1.5947278049122755e-35,1.503668502774111e-216,2.9651279132561813e-123,7.50205561195523e-52,4.117385178813548e240,1.9787606980720326e81,4.335726898835315e196,1.8016701738949295e187,1.879676424949763e-219,1.273069705510431e-247,-8.645869725301356e131,3.7955082871767137e90,5.8557205506347005e47,5.958921241504635e-38,3.805857339421648e148,1.7781169637803583e72,4.962726203950539e-240,4.515226810188002e34,9.814865960876939e98,2.4507194549213024e50,3.5586390829520077e167,-5.592816410978013e68,3.3801294681471224e91,1.892992186478229e-176,-1.0431727947499135e113,3.472227705330104e-118,-2.4890997114570754e-145,586898.8706167024,6.058857706512435e183,3.13028151193808e126,-5.568008341074472e-151,8.555860288457374e63,1.4947674586798016e14,5.117403315976102e-102,6.562582063519587e26,-1.2763163899303373e-101,8.654243919147231e-236,-2.5804551711338373e94,4.515710111579542e-125,-1.3821829214580402e145,-2.240337147847434e214,5.416906037489128e181,5.75424785542773e-72,-5.282926895694713e-88,-2.3001822712751806e-219,1.3478359351131668e86,-2.6023019753795735e-70,-6.863785807957417e6,2.4136862269578966e-56,1.1807417876050025e-62,5.3958873274828026e-130,8.319313137481612e-184,2.2309094985157023e-150,1.1705379204293942e171,2.2311253078035254e235,5.825708668566947e-82,3.671205563755443e-160,5.435217526446208e-88,9.987373541694535e-37,3.056816788952529e93,-5.766926117528632e-182,6.142948571830914e125,1.8835620874015947e-97,-6.20470117881359e132,-1.2821704379807822e-198,-1.1928548769967935e67,2.442654753562607e-39,2.0642604991179485e43,3.219968996343062e118,1.1755410974635941e-14,-2.776880058346382e106,3.361574234186725e-196,5.899697699406311e-113,3.662709151062028e145,2.1317128229958554e199,8.505508442856006e170,1.4795313717372183e-210,-397.80228654923496,8.378205649097992e6,-4.1968362877267356e-166,1.1600381251316935e-13,-160.99982232457256,-2.6089934312746774e-212,1.9489325835381845e58,5.071089854034379e161,9.673796831818362e-94,3.7385707276291663e93,6.944331669544481e104,6.544554578607494e81,3.480845848628851e-163,-3.2108041219322775e-121,9.018156902425008e-14,1.808919779465428e-12,2.2848220462675996e36,8.628054083041374e-237,3.787462446436908e-21,5.760726586457961e10,9.458816238017413e237,1.1480761249493928e-57,-4.883470717444696e-208,-1.6016511322082352e89,3.742093913175938e-84,-6.285934275500689e80,2.992470096930673e162,-1.197649800479897e138,-1.651208710311456e26,6.255151467900333e-168,1.040321593807158e-105,1.2559900903609855e-43,2.312328537995843e-126,-1.6123651927118566e14,2.587398486677465e-77,2.6688198252132775e118,-6.905242725085298e190,3.948039146409034e191,7.444810796204596e-58,-4.0616452175455754e-80,4.1485539392902825e134,-1.8716254325596517e172,-1.6710319040842064e-126,1.4193330520218805e77,4.668153823748242e-106,7.80772260643585e-152,3.581014372946381e10,5.868531058517418e-187,8.301219051305636e74,3.419489535630959e-190,7.851912690843729e93,-1.480651133416689e191,1.0,6.382616424815862e134,7.370809921279367e-246,-1.8412718016512154e201,-7.591406060236732e247,1.0462759205999054e88,1.6717437322499516e186,6.079684979282098e21,5.927264535086748e-109,3.457485383800252e-68,-8.3459933265746565e68,7.925136374413878e217,4.1601177453573213e51,3.38574108741186e197,-1.1931737802835335e137,8.761521115675733e193,1.8599205875783027e-167,2.440036325776014e-140,-1.1671078270823417e46,-6.692446609324378e139,-6.730970780620938e65,7.148285131427864e-7,-1.0057851267033914e46,1.7262633377125468e-123,-6.430283862473595e-125,5.844994775660608e248,1.0837242932341252e45,1.7433500394829263e99,3.6269851570767605e-128,1.9457874389430799e115,4.0870298726242575e-184,1.3314838725460911e-106,6.253198579066166e-174,3.4324645633388713e78,-2.1552843155563932e136,-3.5863039144277976e143,1.0284059154231167e93,1.018369834955313e-152,-2.9658190333484195e-73,4.075086978895686e120,4.51007779392389e-29,-1.178004492636137e25,2.998361010565281e118,1.459297587844115e113,7.341753663021398e-102,-1.310903744686826e83,5.1039606270503244e241,1.2078195463635798e-174,1.2579841678708251e-114,7.051761250437576e-121,3.0418824547186383e185,6.066927308071342e98,7.445160858796761e-122,1.0758692203263197e140,2.0282250770954298e-53,8.099362579069376e-146,3.2230634856457055e-49,1.435887254815659e-39,7.504662649520343e-220,288.55306502616804,3.528156059518366e263,4.869676664453238e-93,2.1412905694642933e-8,9.75789062587548e46,1.3797403553084784e119,-4.7142216213250267e191,8.806384193771915e-111,2.391544554842817e125,-1.135659505921102e140,3.6415721452586244e-11,1.7537147304451169e-99,3.702091128426045e22,3.8267002934343336e136,-2.3025735410083055e-99,-5.9085868099347126e200,5.463641899252956e-203,3.590732233116324e58,5.299265367791055e207,-4.2500620042274876e213,2.3498014937684876e25,-1.7483740763252379e103,3.2859696031639265e-5,9.965150839600287e-138,7.114837020041037e151,6.798149936734511e-25,7.339301217090479e-106,-7.451168159301805e81,1.3061485508198387e18,1.726781987232954e101,7.464159324494078e-70,4.1855315361023705e-152,-1.6938452289972604e-22,1.3109335154236469e159,7.268677212410074e-207,2.178836707523208e-90,8.549183518068364e152,2.2055274279636535e-46,3.562280936682985e-32,-3.5769578081721114e92,7.240630553538734e40,8.137510815909314e207,2.1406752838724355e72,-1.5477169279276734e7,-2.287401887141635e-228,2.112063280740116e-132,1.788510803473269e-39,1.005947753935352e-118,5.971612538146297e253,-6.653535652770069e-76,5.979034505703494e-31,0.0003207985796790961,8.742892993921172e-125,1.1069583556569746e165,-5.411226314938681e-64,1.5780370431490584e-46,-5.020984608034787e50,1.0,2.828707922983695e-141,3.995556642928404e62,-1.2454120557960047e78,3.9465796767303955e10,8.914589739274567e-112,4.36776280296503e-169,3.679724165526075e-90,1.7068715392285052e25,1.2512597217292012e-176,1.113271565455767e87,-1.4512045170876611e-151,1.957260191830245e177,1.4070040730387274e-246,-3.612456840384007e-169,5.462993633917279e30,3.1564858696452826e55,7.400484349550316e38,3.9507086923336884e-95,-1.909845076729902e18,3.2573578052054505e-31,1.0129943774389284e-58,4.310680777834482e-38,3.4664404700053453e-187,-2.0455011026142864e-74,1.59935384835193e-188,2.225475503152135e197,9.458928760019582e-56,4.547919306919999e-204,-2.6945025173410674e126,1.1074953998313577e-102,9.188184367395811e42,9.447250403701687e70,4.440970522021043e247,-1.4122753951931818e131,-1.5851171423068543e106,2.3984224052935957e210,1.5717223495653009e150,-1.7860249272339182e-162,5.6816550356332825e206,-3.5921171393398395e190,2.1199062376398965e196,2.021383076668682e-28,1.9286751853109986e153,1.0794002051302028e81,3.238389717540848e-229,1.8029007297218868e171,5.348686961861487e113,6.148506282022329e143,4.796462562409426e-192,-2.52356509066458e-153,3.36650616973369e35,1.915138383892998e59,-1.247408026869537e-8,-6.5635509669433994e221,3.9036330471034957e-165,-3.548128332071382e28,7.043435320017284e50,2.3225734277113099e55,1.5526203871816177e118,2.3189161023298724e29,-2.440008883314198e105,-2.0249724412026193e191,-8.626411391136457e-53,2.072834748917004e-167,9.234499340055907e-109,8.436727759311733e244,9.511232913135038e-27,4.682771105208439e-99,9.701225774060625e183,2.6515600742623384e-140,2.3771795753606185e240,2.2805241773510745e-56,3.3788176014655186e-199,-2.8769684667673724e-218,1.1367811245789648e242,-8.175914450644666e188,-9.116838008763353e124,6.952513811067646e160,4.273330697216702e-85,8.858029050686351e-200,-3.0383636118194176e23,2.7634010744029663e-147,3.8315595378334743e-239,-4.3592682619798065e-8,-3.0694941666441873e189,9.881332403856256e98,4.813530007010777e87,3.665608089258889e-51,3.167506699723061e-85,3.881251741801967e-166,5.546627439260762e-159,9.27394159806409e59,2.9117256909413596e162,1.5956560322551234e251,1.3939110914696006e118,1.0897509420682004e7,2.5533897135788664e-219,7.302209833417829e55,2.3772932849283484e63,-3.530797666439465e28,3.040713143030507e92,1.8168993007068085e-60,-2.5591649403369194e-31,4.163733086137892e249,2.308333731606867e-96,3.0231411192368037e-148,1.3220765661929305e-45,1.1732874467528667e-164,-7.690664811748151e93,1.2283634645088961e266,2.2831687307610885e112,0.00910696134872208,4.206033514248107e-164,1.6438423345446975e13,6.193988422468625e-167,1.3119369533986954e-91,4.961019753888601e-225,-3.187187483271463e20,1.6578564645701638e14,8.999244394149624e-34,6.584088836378143e15,-2.1637457056742617e-56,2.451264693344774e209,-1.2200170413688976e248,2.2562260333433107e29,3.658085805943579e-43,-1.1891510954666992e164,1.4171661219754842e-10,7.088765216816387e-173,3.9573509381060586e226,0.011843144374136683,1.0263934293544399e134,3.44324553793373e27,2.3964231601214536e222,4.985265343959589e-229,3.12906300521848e-106,7.15361918370262e-212,1.2497297443938464e108,1.3163595640664924e-258,-2.8186912479252443e90,1.1785275190702395e191,6.0426571221330025e-12,4.8638344879302406e-130,7.843325146086552e123,8.209567980759802e-26,1.931069877548341e-46,4.822126543047683e-230,4.550099660171855e-105,1.9052225355029272e11,9.917578976672174e160,1.2477025238345824e141,-3.1324147900760137e-212,-4.938036040525833e-73,4.461490802523924e233,1.8662578237207212e-227,2.43214815742941e91,-5.032161077808113e-42,2.2885445412858757e-217,3.820895853813665e-162,6.1352492160654115e28,1.1170959110551846e84,1.25184310125409e11,7.481952278433676e-141,86676.80378854641,2.8263376585255857e74,1.1685385587951194e173,8.188321046699919e-76,7.609263913285204e123,1.7508603429743391e-102,-2.4618494046856638e-30,2.058514206021663e9,-2.9433491988991916e135,2.268923267929977e-91,4.5876856943405114e-133,3.638090495640404e-191,7.671818672927843e-178,2.623241788630447e-205,1.0378619675902944e-255,-4.778588241846087e196,7.047177769908055e-121,1.4646051657452032e237,-6.674174031698072e-232,-3.995666224297089e110,-1.1179866339714207e-187,3.4790035729973986e212,2.5592788827652772e84,1.159867369492878e49,1.2675346900725677e69,-8.349627429120918e-153,8.377903088933832e38,-7.779830537008298e-96,-2.0031468545388952e-76,-6.076312012102464e212,4.825533646978839e-26,-2.0635794999213804e196,1.35059471370638e140,8.17236299662365e-38,-9.89874327903056e173,6.788823846230154e53,-8.099389291865507e95,8.748104891050252e55,1.0,3.0783072041800055e70,1.997640037856147e-157,3.7467117334040123e198,2.105741129045507e40,7.789671230020495e-200,-3.78993460739761e-186,5.20637765315711e249,-1.0254701416760168e-51,1.1045103048919126e37,2.5412713693368045e-146,2.2116678202860577e-71,-1.6737751137416978e198,3.985595730184759e-158,-2.116215520535223e-92,1.4154829681932816e-140,-4.77081690976076e149,2.3200212484371868e-80,2.2330032865663265e-188,3.155573001350047e-55,1.7906000400162255e-8,4.304631752759139e132,2.2784926163772898e-124,4.423098002745867e113,1.9607125027618676e80,-9.897982949744696e-21,-2.1509507908194914e-57,7.081685105367217e148,-6.81242322580648e96,2.689390022234596e33,4.183137441691107e-175,1.3974347270362256e-213,1.0592985369514346e-89,6.2086633769029e184,8.221041997600763e-129,2.3603781173548575e-175,-8.902130586993042e-26,-1.569015853677393e-85,-1.6687090383602738e-90,1.2717608718092031e59,2.759118846006078e31,1.0751375319427061e-135,3.306798438310379e-115,971.3944201008035,3.7178150366525144e-123,3.4053249140568286e-189,-3.299865930134321e-122,-1.7467332530820735e-81,-1.583554184910376e90,8.544190583191483e33,6.9472441966306265e124,1.2320866052483029e-241,8.936922069966175e238,1.8475161709062703e-40,4.065151176814199e-193,1.5413422210047005e168,1.3205222613934185e-67,-1.1333863600103496e-63,3.494185659101523e98,5.4046642739539905e110,6.048942832218184e65,2.8149044047748274e-239,9.220486970086526e109,-1.5874265595742957e54,1.0578029607978112e50,7.659665173862994e7,-1.3796374257011093e112,2.441452129620523e-115,-2.7276901946090814e165,-1.4013798415699654e13,-6.736923874184442e140,2.1721778176794968e37,5.976888614352477e22,-1.580528924530188e163,2.187330617323803e190,3.137100175326793e133,-99.99935984846189,9.182564773044605e-32,-7.773246104294218e-91,1.4146263857462402e150,2.544611120111833e73,1.071951798056055e34,2.9236814389368728e28,2.006155464420717e-170,7.805103266078576e-25,3.3704100875277455e60,5.050915748200356e142,5.942186818220139e-70,4.880511315746311e-111,2.0795723168738692e-204,1.7762830787532736e45,6.045116863867608e-201,2.2680799523330334e131,9.883282921088681e112,1.0322427877533214e88,1.6853826620662377e-214,1.4895469957173018e-114,8.41614804252895e87,7.0372958424503275e118,-1.562344400543276e-181,5.452167323953636e-123,4.0055644467587985e168,-7.74459977304726e49,-2.4088583298457934e-58,5.707926957872768e-178,-1.1590500596980056e55,6.743659656795652e108,-2.074611901494659e53,9.910877126434612e-145,1.3639498326486264e186,1.3609250952024127e228,2.377967056548003e116,-5.253427012641077e124,2.805090085914487e-162,2.899756089415919e155,3.7161064132118375e143,2.0391668802670008e-257,2.2185029267149787e191,3.4219603930806646e-181,2.2566575306837737e169,1.0386107238213215e-181,1.6862920516902065e-253,2.251620753681111e264,3.8330904274472415e-84,4.746011456382127e-77,2.0321800607581747e179,8.751497931814941e-171,2.7931498189463387e214,1.1271339377825814e203,7.061958144316009e-120,6.411926606109927e7,1.592169434015242e50,7.873688146915115e48,-3.220084120469486e-226,-7.841781757093256e-252,1.5726507890592722e-16,3.9321723511826515e50,-5.589931917003149e-128,1.647601613876083e214,1.4241487395028032e149,-7.852948782275589e212,3.408323958519797e193,-4.722786759955311e-262,-1.0033635989715038e-17,3.1201422452292436e8,-2.736029954009151e-78,-1.000392233245949e-138,-2.474390236448761e-33,4.0223289897388896e154,1.8825706741537827e-32,-6.97325409823224e-99,-4.198913803231648e-152,-3.1297485763538605e-75,-2.0544138955624856e55,4.961308347120319e-32,2.8524433762548673e-29,1.0,2.1013618341076818e-23,5.993298461604072e112,7.171806421734756e-232,1.7281806758248636e-217,-8.039274020470934e88,5.27321821315079e-34,2.3070800906532617e-124,1.974561566826334e76,2.52693548819101e226,1.2270580126604952e76,1.408787984709801e-10,-5.309293345307401e118,-7.043431798813576e77,4.084144758426098e83,1.9162185599678072e178,2.4912644393686187e78,4.0013278162567885e145,-1.4337100696564716e-38,1.7956727577253755e230,2.5861340113210785e46,8.987514032269983e45,1.859719547494078e106,2.2308878448484058e-90,3.5805099221647685e-217,-8.107609604916756e226,-3.1993322575692546e-104,2.6994051263386117e108,3.2953749647701727e36,-1.8111578701704806e83,4.456841846615247e-212,6.994363405630968e93,1.80368409747404e69,1.774072413234822e-225,1.0188501799675355e111,2.13982653269838e-235,-9.31164348927786e-83,-1.0693660529034952e-7,1.2321562356024379e-229,2.0260496717733255e-170,-0.00230976236310683,5.0903434995540364e-67,1.1089546706352992e69,3.044052632510512e-222,7.398840548441694e-138,6.247601496433017e-165,1.5303664929877238e51,-2.3318947975306126e-120,-2.1103827121127174e65,1.7522605305420993e209,-1.7363035799438576e86,1.0881705240302699e33,7.520859320822757e-198,9.762430584002607e106,-4.0905697035512347e-206,4.638069401811251e-170,-1.3065635817134442e71,4.912079698072228e212,-3.83410052607486e-105,5.320553852272527e-186,5.449404039261476e94,3.9331135873364516e210,5.499604359680073e-59,1.5156726414877623e-237,2.5891593493910303e-82,1.0,2.5916897508885947e115,8.588371298863228e-148,3.0533410272888875e87,6.801459810672917e-224,-1.4545299294859857e80,3.6412702980045096e-116,1.9170355284724287e-93,1.0250173084917602e70,1.3287842353374484e-71,-9.932490433139145e40,-2.277685398898652e214,2.583461746236032e214,-1.2613150887401149e231,1.0353021570858736e24,7.966089152274828e-41,-1.0580727181879557e-12,9.584044739590372e-64,-7.23979949736559e49,-5.108020493550479e-114,7.363132681953431e-57,1.691770288662758e-8,1.8380851178889872e-54,1.2204044571385691e79,-1.8464651483815293e-149,6.434632601280173e112,2.2820921968283736e-8,2.4585803903165207e-50,5.45171758380677e90,3.284632001779479e-90,1.9389769422225834e-172,1.3057079170178669e152,-5.102578187473405e-90,5.46853736649319e146,4.367966608306937e-185,8.70105831167465e118,6.116364585909908e193,-5.516094213700766e-115,3.957803811176326e-15,-6.891323467582154e-41,3.290645257843824e-166,8.092386367307792e226,3.566123177582283e165,1.1274964629579436e111,1.855802693773757e-251,-1.1728005881085155e209,6.4102481146883385e-49,1.3333304275538792e50,1.115708420681046e-204,-6.368101576578288e182,7.137717237174039e-55,1.0281740372854292e94,-2.6395131209118675e-172,9.371865461738696e59,3.061854380577946e221,4.157956825824236e209,6.444062235024052e102,3.8822927503542096e89,1.1599194733795678e187,-6.005234357943689e123,5.3874179320115086e188,5.803216935231434e74,-6.523327428096584e-232,3.363956293790688e86,5.379102952241358e20,5.295369136037553e124,-1.5333359114368266e-8,-1.8400773344405164e-138,8.921537315080602e-130,3.271630152100163e-88,4.588038506375348e-46,4.008743655676555e215,1.152592341563685e-97,1.3187325433335408e179,3.7083257552027523e76,5.460382791338636e-116,4.790365853344427e169,8.759479024142364e244,-4.6720540661428646e-11,-2.395660287337124e208,3.435981313641617e-169,1.1978912194741025e-222,1.0935017800502392e-195,3.4072650969596073e46,-5.443852340136731e72,-3.538000956407349e70,-3.1871662780714193e37,2.128758513495663e-67,8.103724909186561e-45,1.5078016938537142e196,2.765738389217764e-70,3.1524787753556834e218,-2.6287359520950417e-204,-3.5552174147835025e143,-1.999503076042357e-30,4.7928072362059574e-114,7.172304395653382e-16,5.734001446727451e-28,-2.610828550515592e25,3.481135226599516e-33,-1.3258934260139909e141,-9.47761343217471e-22,-3.911001506423265e-96,-6.529293620120659e160,1.4795147725075718e-194,3.0987725704135725e-66,5.444794396578236e173,-3.441892959913927e-137,4.28783828055e-137,1.1094205355869027e-88,2.8015253687481832e-154,2.6767478248795578e153,3.2595992242651394e31,8.872745832235267e-104,-5.1927338084468873e101,-1.1242788983226454e41,-1.0850225335547469e-185,3.4714285411958065e233,2.3177810258173354e59,1.8011701639416014e-192,5.092297891373936e-101,-1.5011869909470989e28,5.3188230528980495e69,1.7263331415696384e156,5.050113040850989e-30,-1.5522622674494586e-141,-4.895754548304649e-71,2.70110681405234e-47,6.481483361702003e-8,-4.8606577039583624e58,1.0654393281704785e-8,8.219332512758432e66,5.350953907751819e144,3.1898243096523834e-137,5.045045542059348e-55,-2.8046326132442636e244,1.1239667517735839e93,-6.232268712186156e-9,3.4856455909417904e-56,1.8298050848269073e-10,-3.358642206462639e189,6.845059210416309e-106,7.442896327014146e233,3.633975520106536e-69,1.8815745967731878e188,4.36150986766227e234,-8.905544095390688e-262,9.957623186143314e178,6.123046060858516e-159,1.1447614044240691e39,-3.26823508199539e-143,1.000349626391252e-102,5.439185753002436e-77,-2.169261240602552e38,-1.40688374726247e-204,-1.9526782290519563e93,-3.690854684874324e163,-5.981097262900932e-76,1.6739836483108565e50,4.3004954637501495e24,1.1719629118993435e174,4.3468021164181475e55,-2.8617047587722005e-69,1.5453874974682742e135,5.282773662292891e47,5.327851821673265e-196,136472.66630055624,1.126744544310659e-210,2.6368478402480883e-208,2.1025762126801135e-94,8.926178945279952e14,3.413184968383993e229,1.3909937516458028e-24,1.1781881967742897e254,1.56519142158016e75,-4.4963031265892676e100,130574.41357091919,3.3627442781743303e142,-127.89290735713377,-9.340861840641636e221,3.455874052265331e-154,3.5114790737230812e-40,2.776853400755286e-128,4.387129018813036e-200,4.3831593798728525e-229,-2.803597640495074e135,-6.116837176903603e245,3.2404686170641654e-196,3.0648044731073626e56,2.9628838082965588e10,3.626867582138293e82,-1.90572821871311e-70,1.642010068884555e-5,2.4323972480467714e207,5.134271846419321e-155,3.2031838695929414e-157,2.2424634946057352e57,1.8373924654442736e-232,2.791700183329414e166,-9.370187150280186e-229,7.859423204184425e-57,-6.895500061830061e-27,4.0504708951650877e-78,1.4502865700719898e238,3.889554166380522e-80,-3.390734748881178e-55,-9.077241767248737e-93,6.590336330804632e-29,-9.768782440440224e51,1.7027413105341283e102,1.278993864538124e-14,-2.81869909779618e-208,3.446600174061404e9,-6.404507128592106e21,2.867972712528618e173,-1.5379836296595674e136,2.3387736937928707e-191,-1.938752536723282e-46,2.944416242248226e109,5.873270720247824e193,3.771539393534493e128,8.219763010045467e100,2.9342943349910336e100,8.951535840397301e15,-1.8568740921391033e-6,9.756902310946902e235,4.363986847854822e-146,1.0917655807206924e98,-1.6135509238627421e-85,1.8541139926856524e-202,-5.5973865687263966e26,4.479649781241659e104,1.1084592433758447e-48,8.173974659913328e26,7.934344777092815e-218,1.9665071233389926e-166,5.381580471803939e66,5.1269944787724844e-169,1.6445572688787364e-34,4.0234399072461004e-22,-7.246011729601095e-53,2.713991259204706e243,5.176180863810827e120,3.737645378949366e40,-3.8279095793947237e202,1.4860583867960858e-217,-7.841588580962612e207,9.0551832817515e-117,1.2904196000213248e-40,3.6951296913614136e118,-2.8225331888691787e44,1.1065057796713433e38,2.07982045615753e-208,2.251781046526089e-133,4.774831958721127e191,1.2927283490817826e35,1.6697086587757092e-71,2.3807480451596533e-168,3.2042976941725137e-59,-4.184974804977026e-92,-8.619901260403e-215,2.3908616336059844e-163,1.7227690895649875e-89,6.517129489719878e179,2.2810420770433774e-177,-2.2025367711523258e-73,9.96932642693305e47,4.1911423679626213e-129,1.0532955708343343e-109,1.768363927331418e94,4.537779258586577e233,1.0,6.999319376361877e233,3.447344009142213e-14,1.5309686575065534e-28,2.0622148729093862e84,1.914538614042729e27,2.553149030374343e14,-7.111124408408462e-17,-3.669292913770803e-176,6.308037016189007e-9,1.754199562409296e69,1.8363778491995182e58,-1.45268414669383e-217,6.609562767557037e23,-4.377256221393971e-255,-9.665982456569803e-164,2.6083670053862485e29,-2.757889835290398e21,-1.6500952552484908e-133,1.2176364030330692e113,5.06447250195127e115,6.990559776940993e66,-5.965216733495125e87,5.056930258386639e-50,3.614095621048939e201,4.329241091633873e44,5.869580585062525e117,0.0001295543680808433,-4.199062251037985e72,-2.557841454889063e180,4.803034487302623e-16,1.6211073666740424e167,1.8092011501976812e-244,1.6376768264939584e-13,6.778951682651753e-234,-5.40729162229291e-209,1.246005868541361e8,5.630418550632324e-144,3.128500108829263e217,8.965209737174078e34,1.185390611067719e143,-6.070684829509067e-174,9.32605107725815e171,6.1972789424403975e63,9.335553868249178e112,2.8606760738460445e-78,9.311921847114816e-92,-2.7200433720157753e-201,4.8112669121418556e137,2.8048296463041966e133,-8.957663984054428e-215,1.4215970280165474e20,1.6786997260761812e-131,2.528013986303909e-77,3.700430389752441e182,-3.440742306661129e151,-9.129763148968098e-118,1.0715345716968114e-75,8.303948822339652e206,1.6896339286468902e-118,2.351814451168508e-158,2.0360903677523786e179,7.518393020413209e127,1.3485141065031902e-106,5.7762023674800174e-226,-355.6100237954516,1.3807054403345825e-139,-1.7584002533136534e121,1.6497942316402356e179,6.11504733899374e205,2.9108218895827497e-62,6.813482930395473e-174,5.18276025848066e-173,2.0359774403596672e-114,4.84614695103986e144,1.5919761236307347e153,1.1273003155237898e-259,8.595485341487542e43,1.3650569116629246e12,1.4120443270510455e-212,10755.058343125182,1.533799502190741e-122,1.0,2.040600749887785e-245,2.426586667942675e54,8.927997051521518e78,3.2030946068324493e164,1.424397470102912e-115,9.307331848339564e253,3.2122419051903658e106,1.3641057584960898e-59,4.077774873948996e-86,4.1855816515755745e-247,7.704826959024666e23,3.699546008474115e-168,-4.040851720668854e-237,1.4488987770586623e53,7.663813398386131e-188,-5.520792979235474e-59,4.502037515030934e33,1.4204018006975587e-72,1.3538948211215575e15,3.347375748482354e234,9.577300871384237e-190,-3.268674453264982e-224,-4.5117829937961294e-188,-1.940354161386673e30,1.6596383860609207e188,1.342642096523857e-238,8.232954319613613e40,8.008752971071252e20,3.583494727236075e-30,1.1101771798282351e222,9.27684659007288e-147,1.4913395154051485e-92,1.0780366996817041e160,3.708464845788536e-150,3.8447986578060096e-181,2.9715638901317525e-252,1.783058383650175e-141,1.3067581962706972e15,-2.2917823555609393e166,-135.1947493066521,3.19820202149244e-222,6.011704254152179e-77,2.7288541357971065e-12,4.993676153638844e203,-2.0787581346692915e15,6.50632406026157e53,2.5481161398630923e239,4.149585327014818e-67,7.981625055326644e112,-1.0144481777059361e35,-1.7493021211579928e68,3.521196299575884e-82,1.0639908565357207e-5,5.783776472475321e-97,2.580824207115162e173,2.1193210579937036e70,-3.9720067953665205e-105,-1.0306620023323835e-25,7.231465838662587e61,1.3258335965176283e-147,8.467838052048743e144,-7.1827522803855e206,8.818490746602388e60,1.5115106348825593e88,66835.53763434467,2.364890174606775e119,4.0063690669187225e-182,3.7478124819268826e-38,-2.892625428520547e71,9.32980542869289e126,2.5223555386409156e109,7.030601943849149e114,6.646103464945827e-259,7.110823388544075e74,4.874910800330036e-56,2.4343781789587628e103,1.897263399939656e-48,2.287514036553061e224,3.422559770974205e-61,-7.651791412049328e-89,-1.0238568268989697e198,-2.432237072635084e-152,5.430962164761279e-32,-8.943566652031778e176,-1.8826534373856495e-113,4.370674659009758e-102,1.3855022788614107e-144,2.487851608402903e80,3.2464058206578174e138,-2.6482831111281816e-46,3.0558499411099726e-220,-2.804211194169764e198,2.201678104647235e126,1.615746504676547e-95,5.9115933691654e-75,8.89238903998037e-21,-5.072434841888393e68,8.063067002962681e-86,-3.7960890930936923e167,1.358113840344989e-114,1.4501516066270798e-215,1.090217726186808e-37,2.1185332059823517e70,1.3121787524865312e-38,4.594247259069142e-252,6.177025655100835e-116,2.5767818263130214e113,2.887183705535419e142,5.393021540810857e93,2.0398486269240054e36,6.160310203160435e-54,-1.5068780290278782e224,-2.593667269351754e-101,-6.126069081606215e235,5.480519978409977e-182,-3.930650569704288e64,7.890040749924132e92,3.446139763809788e-42,-2.0753103258868735e21,5.46797693833461e-213,6.813094907250268e-148,9.090503533714041e-197,1.900815236049475e71,5.678995752482122e147,-2.601527562291285e-88,6.543543238308786e115,-1.0719940397896217e8,1.3086644011758592e124,-2.5418403437696225e161,2.1539164693134283e192,6.107833881356871e32,4.196951248359699e-169,-15344.499814591672,3.1243608934166744e20,4.9251278717311105e-79,-6.409639151250778e-102,-3.5983953026128493e-227,-127.96008145005254,2.1097691078292412e-85,9.574616296400705e95,3.7389799776113687e245,-8.169290826639354e-199,2.1007131620938126e-232,-2.262655836087536e-24,1.2625112794195668e-16,-3.7738684054051095e227,1.291896784082139e117,2.5696436989990116e-38,7.552999040459175e-64,6.759399572012508e-157,-5.096861569602742e169,-9.151262695064378e-205,8.366713154765651e-162,5.434631631708338e-159,-7.055714203978982e-82,1.2380086463172968e197,-9.889507735258007e164,2.6465534414853177e69,1.0,1.3449192466372682e-88,-2.496004769821309e-52,3.1090838128075134e-29,1.0980911179239467e-38,4.003519674631521e196,5.192191385981922e106,3.0662366037733494e-197,2.3972120991767918e117,1.5682006704913237e163,1.304302130711998e208,8.844096249830492e-111,4.378084690478964e-199,-3.9074815079759086e19,9.790776697233095e34,-1.2709411963807165e168,-1.3465188954307675e7,-1.3716821299523268e-19,-1.8727441944840677e-138,1.812707087304567e113,7.168455898319952e-15,1.0947864550102887e-92,-3.68963331263436e33,1.3938601497969476e-238,2.3194024218290193e70,-4.597975711090111e152,1.8058919606024688e146,1.9418855086308578e-97,-3.444077074575751e-14,6.409467830113788e46,7.891276873388029e-22,9.336161714499309e-84,2.3560773780072757e-15,3.547352929068136e218,8.263650099993124e81,-9.87076605828104e-149,1.8977995331512556e168,-3.5966185192761875e-110,2.788325334531968e110,-3.1035052979765474e102,2.41359205112675e-159,-2.811266352909174e184,1.1870056075686315e-63,1.6762048486031597e10,-3.428848383937144e84,9.9653514585322e-135,-6.848534482341848e-81,1.1768419070421629e246,-5.183743403429042e-95,2.4953886383960926e-126,1.2604069243652141e-73,1.3587556129037997e264,2.279168022053233e-221,-3.317994233884859e196,1.8578739277192576e38,3.324107533393237e-68,-4.2292584040076054e-181,5.7157432263697165e-139,1.9508365290825737e221,1.6644947627334173e-15,-4.367814016436627e-177,4.047784456429068e82,2.7301399939408e-176,2.346720327821072e-67,2.3173052371594864e205,-1.791829797331887e225,2.0264493247319403e-141,1.2752034299498698e115,4.131810491101635e-20,3.221873904890705e-133,4.459403204450005e198,-3.41180940440842e-98,9.145982997178986e-153,-1.5944676706535805e149,-3.438494984238403e232,1.0664302341212096e98,-2.719488064852346e93,7.0775087321501996e-186,-1.0683485283448511e33,9.447841365777419e67,1.9725864681444511e-252,1.9526487160690295e-121,4.662034483065662e-165,-8.423507870430345e-113,-1.758517739861149e70,3.1340520646409314e-10,9.597253796385863e-21,-7.580462348311105e-103,1.7927956050700342e-154,9.298785428039954e-154,3.469101633637842e-225,6.054406857242605e202,7.125322506155199e-79,-1.393792318877202e68,1.2121118995261427e20,2.7955690265594474e207,9.679972385817752e34,2.1115196198506662e237,6.563995283325224e-185,7.891820862389373e108,1.9840343632952708e12,1.5101254849455386e7,9.606366671699528e46,-6.332501468074501e191,2.989483469272025e-8,3.0455230168760066e169,1.227691978930481e62,-1.110705646642405e-254,1.1766815204896101e-10,2.7860716983509437e-133,-6.289295904032493e-124,3.396723947140952e-98,2.392885051953387e-156,1.4939036766142485e9,7.053870557418844e27,-2.5706330431554914e223,1.036302452478277e143,2.1358923072647216e-160,4.83820772662205e-151,1.3370113367890572e93,3.979864531095407e-130,8.527341379214087e141,5.1734681213429375e-42,3.1157497636885805e64,-6.403944234745074e-207,1.4504107726988305e202,4.918529602609373e187,-6.204546617452768e193,2.8770053467825106e-112,2.846787245891746e50,4.725817287912792e-155,2.4452159941405287e37,1.3939897878709392e102,2.797448777504132e-217,-5.862759936559288e27,4.037344201879627e-68,-1.2177230516756728e106,-5.7587462703642754e-232,2.035497223740889e108,2.999541888894064e148,1.6273331347059577e178,1.4364189327384003e-182,6.489269518286128e-118,-315.57620600379323,3.662437465139486e-252,2.109132351993628e62,1.0228241989887154e89,5.478508248082286e93,-5.807890752965547e-238,-1.047556644246412e-152,1.6788485167845799e-37,-7.600959139723431e-160,3.1647463249289804e-10,3.1494351642292467e27,-2.4396526566061026e-242,9.151816870404776e226,4.3913015675512305e-79,6.231996498639519e-58,-752601.671986219,-2.8993154795863204e252,2.6278789343158317e-12,-1.7383959827823844e-252,6.099763204503468e-6,1.6734706465987948e-87,-1.3817466405620485e-224,-7.305289791842094e-159,5.192275002931093e232,-2.656498977307005e106,4.75818207941011e221,2.037636368522696e-152,2.6656559825918142e122,5.566553912719382e217,-1.3743506884266406e-176,-1.8171379782533754e-76,7.207652223702496e-17,9.395724749249706e213,1.3138342782219161e-236,1.088582242585992e-54,-7.372417748698889e211,2.0908780037679939e170,-3.637148657826751e132,5.228472384432047e12,2.8794028765330276e-218,4.8718842058551146e178,1.6925485206442435e-139,3.0723529498411045e-173,5.665443112772883e-6,8.849855680226706e-42,7.41112182319043e-66,1.6667073652790008e179,7.366176345261319e-83,1.630422471475662e37,-2.3831930473551636e-162,1.2690124310397532e-183,-9.09136908063783e22,1.908916975486851e-79,7.395415704722095e-128,6.104299178593753e-26,-1.733113866357609e17,1.9753989625472132e172,4.613462317506814e-117,-6.35143120081116e-25,1.889388862779409e252,4.247910372981631e-11,1.2913397438454141e151,4.094751802068676e249,1.2725815152936076e-77,7.113757714962925e-92,2.5007028078889442e175,-2.2715671749137202e-138,2.182990000287701e-140,2.3562664912447123e-46,9.796955918067454e-23,-3.7882328071342287e-250,-8.901785102305329e223,3.437189426995868e-94,-4.013601068788997e-34,1.6609704050559627e-17,4.736942232654664e163,5.487177384881197e-53,1.0,5.791113491504173e-44,1.992196015114521e-32,2.590611918797845e-14,4.5834404271414805e-28,8.55789062754163e-56,4.890043360696037e-34,-7.169065978222769e-40,-4.661207993702425e182,3.075882577173656e136,7.64946431795398e17,-1.7830700099903441e112,1.5442795122569133e182,4.3663565013044914e113,1.3322326987733454e-159,-6.013932490951732e-19,3.2446994500648934e-117,2.3324241628887733e-245,1.1457237793940977e-101,1.8868990755191567e-85,1.7567282709063163e47,1.1587827020483997e232,-2.805290791526074e-52,9.888212897750793e201,1.1155032405979731e115,4.603611397460568e-41,-3.400140867725593e-213,2.0077605290231114e112,2.2002520668140825e-218,9.420449842140659e-57,2.9495612206728513e-64,-8.189264476152072e242,1.4912444935417636e65,2.1555222932327296e208,8.345472125772837e184,2.1816653474981343e177,1.4617649342333381e-39,8.420696952931288e117,3.538257448139593e78,-1.857683017884428e58,1.9095063972432648e-79,9.504615312669926e-33,3.6657757730298433e171,-5.260739231248722e-165,6.0007453085780486e206,4.617866542086438e-66,4.137776640293411e144,-5.4706194393978655e-87,1.5603578046491443e153,-1.3223329267047924e-224,2.4509332654540497e-194,-1.4341214481313296e114,1.627574803886463e100,1.6037534162861547e-21,-1.363756416758972e103,52.262726533124805,8.492772862001136e128,6.505294397072661e-103,-4.0462685594628895e180,1.1743153299069917e118,-6.396794024959265e-70,-2.2571540978250986e195,-7.385109016787286e164,8.562636261373488e44,2.530544682345569e-54,9.56014567692966e52,1.6953295429629263e-69,9.843289589044913e-134,-3.653599734720511e-243,-6.588920230173724e192,1.0,8.034941093023234e-208,2.9909257351759205e241,-4.147489297203238e50,-1.4475452358693727e66,4.474155491299931e-108,-1.1779096127910362e-220,1.5884031674419432e77,9.598120725998523e-40,1.1824138744484346e108,-8.983560791943684e-144,1.467952874317008e-23,2.9103391136599593e-182,-1.1382215399815887e-195,2.2562228976496167e52,-6.679071623851606e-57,6.854403419996953e-202,9.308282951915139e-76,-2.4341789404006855e131,4.6854817613614046e-15,-3.241312743616241e-27,4.812298504467013e-81,9.905217701435032e160,1.0218126900056292e-161,4.417350915852911e109,7.13913620864343e58,-8.67990146476199e162,206784.5275427166,1.6396673409408488e221,1.6953268641236693e-131,-1.445583726223286e140,3.3690880037601186e-96,9.704336842620748e-243,3.4545609081212687e-165,3.584631848510466e-194,1.121380950838662e165,-5.241925136810882e-166,3.851917114411133e-59,2.2127970422067068e-201,5.248702236991079e38,-1.7527716132757066e-249,9.282884924227827e-192,9.29619831066743e-153,1.0707470221230118e166,3.592173434130563e-45,2.100095031011043e65,4.9978138701615043e-194,6.810648259168118e-199,1.1750609955980878e-58,9.45279602002276e-137,3.9196324176801194e199,8.57177811938036e-205,1.7417992895544422e-53,2.8596104032430828e82,2.0854006791405306e-68,1.72609009053634e-26,-9.731769033757552e-24,7.653762798918858e60,1.4031801647966924e205,1.5827616249729173e32,-3.790067142946201e-55,4.2318934397378643e17,5.51175569692985e125,-55.506285497288104,-2.22081512979019e220,5.637908621614073e-22,-1.1353144319555273e213,3.8715463809181945e186,1.4594445636879284e84,1.7515391453669057e-56,1.403031643299506e172,1.934629162657414e-126,1.1843246059338966e-96,-3.187244676069636e81,2.3775962152857646e-113,3.418202445263581e48,1.4475599691624823e248,1.097636720655869e-92,2.412801419424902e-22,8.219133873357615e-75,1.6817386431417273e138,4.7741702213209035e127,-3.317876557674011e201,-5.147025821242475e124,-2.941399522542307e-55,-5.6703841125575244e-21,-5.813861529610656e-235,9.011257225641393e-236,1.620216542720927e39,1.070526032771174e-37,-3.880931104624812e145,2.7577615003659746e186,1.2272405564186184e188,1.6119256541127907e-45,1.103360396406848e267,6.522227926804446e183,-1.8298537999986808e68,9.677310499598465e-205,1.2337459288306712e-179,3.3144193974802135e147,4.9206674745186945e-93,1.0,-1.3478950202705556e84,2.789539421686749e-47,6.354834843022537e148,1.3500518960455397e84,1.2207245124699387e-109,-8.141845372957788e61,-2.016662489667313e34,1.3284685454680608e-175,6.119921181897935e57,3.6863125893216734e-193,9.953411969322968e137,5.789333552462574e205,1.6057420838119905e139,-1.262524070179432e47,-2.1597865274085332e86,1.557926026052565e-104,1.9336694809738966e-66,5.231815151398843e28,4.115425556829868e88,-2.709707666276429e-59,-0.002483462489890865,-4.7428795933544175e53,1.736215072152117e243,-1.349683081969319e-223,1.348146842919739e249,-3.3491441798494673e-243,2.2870979029574214e-10,6.993093426742521e-11,4.050381498813611e94,-4.00931550797232e16,2.1457629680292225e211,5.700055263983113e-138,3.3194950123265836e-176,7.01513372655674e-76,-2.8440971784421125e-54,4.31773914659156e-50,-1.6719762292680875e13,5.856797893420318e-23,-1.8953998991379203e185,2.8677048368568475e-240,1.1382813567148393e22,1.2541518933168818e-115,-5.377343161313163e-169,6.768533312523258e28,1.4798444642633428e63,-1.0804726391745385e-51,2.2254572678178037e218,-3.0709461711893814e192,9.025752505118253e-33,-1.7303731664432748e-90,2.0983757615670695e-227,-1.7763346600334718e94,6.209603993105953e-14,1.4729573546056027e26,1.8407811258979936e132,1.1553448770823603e-166,2.9860696131427166e-126,-1.9453902473163716e114,2.7914951125489187e-188,-6.509441594415659e-107,7.199009528249003e190,3.547643070553465e-80,-7.013253691206165e51,9.476858427398182e-170,-7.100662056874916e231,-2.006479066367443e-148,1.1940047879463345e127,1.118878465089288e84,-2.928767951909329e99,2.1646422942837374e93,3.2555864279236505e73,-1.040742897365307e132,6.729663561481165e-100,-1.4998312383856887e-240,-1.2092950749278031e-132,5.992143708416925e-143,1.2212861295355435e145,3.005561600156867e145,5.346316161737216e-147,4.18590347110311e-223,3.7870858754042486e-19,-4.548270648396837e-54,2.840341671586643e-208,1.9314811359573265e174,1.4645238300198857e-172,-5.4406267528311954e172,-2.4457419362365246e110,3.292196114501133e-262,2.2012509584988978e-119,8.32967104533492e-58,3.0770166056480717e-24,6.301723101826953e-94,6.195997378047332e-112,1.2798985159695513e205,-1.2731665268472552e68,2.5254105040434434e19,2.4163402980561966e-258,3.1154072256383145e206,7.375936144740926e-59,-1.1686994478273777e114,6.841746970559305e114,4.513162779308369e26,1.8691636961595137e146,5.718511679188258e-247,4.494650995672223e-135,4.335921437730235e-153,2.4620094988144475e102,-2.039604410554132e225,3.553319542641648e162,-3.928539367612243e-85,-7.514832690974923e-96,7.060840533111158e30,3.350868641373575e9,9.400920865501293e-90,-1.8209757003052962e-11,6.717610018553516e-151,2.4456246650432553e99,2.7338688844509355e142,1.053761982328054e-118,5.92540749379924e-119,3.675959249714119e-120,-2.450183783784832e77,3.1878324849301345e-186,4.649152611467339e113,-319.3979107404567,-1.5105575054142798e-11,4.5364451437949974e88,1.7588255028788712e83,5.6793556818958883e-92,1.8460761990463513e-13,3.0628207764473528e-121,2.7373861200060322e-17,1.6661886699726325e71,8.262578952984376e15,4.184832628844291e98,-4.967432833226402e-251,3.311691279140165e-266,-1.0810544007414591e-51,3.178523552744572e-46,4.268620157458072e-135,4.069297911646345e-13,2.386933504089676e116,-2.7471692409066e-76,3.204106398778102e168,2.2303193354470617e-111,2.894951314111402e164,-3.0746917728603784e182,2.802268682213815e-136,4.138665373879697e19,-2.8056189411340792e-154,1.0100106240054392e-261,-6.395360860215671e-40,5.2031468476987676e153,6.2482063418263095e125,9.243473799947516e-146,1.7391922116822107e-125,-3.77600415781705e142,-6.135874035969414e18,2.3476925911241248e-173,1.0384873324026884e147,8.12280783424876e131,3.311681944381863e-97,3.9554488245321406e-225,1.0450819173579223e45,-2.008878465666741e212,4.2472266214030374e100,1.1594863250090174e232,2.0497212665122917e214,-2.4829121933788988e137,5.066725917634223e-106,9.423945382166285e101,5.234089426101367e169,3.5428348975911447e-122,6.282802387742414e12,3.8239228081608475e-59,-5.558409067870097e-217,5.008216707369704e39,1.860351618657007e-34,1.3208453025093237e142,2.2873052462986102e-99,27.4103073161505,1.3029211105202142e131,-1.3790428987976684e247,4.197434114785794e-111,9.411632096673536e60,1.0825195516619563e248,3.233136446663535e21,-7.339655628647605e-93,1.3657642437704828e225,1.1563265339871396e-60,5.714118311802776e94,1.5807284756853656e-191,-3.529498353143611e-58,-4.092251277935125e12,7.831452034935379e45,4.9073736700411e71,6.290520444464962e99,5.02514324479868e-157,2.4863945418198374e62,1.0323457677825102e27,1.8764808901079346e117,0.003428518648980098,-1.2774957588425402e-34,1.3057799930063803e-40,1.9319376239726435e-240,-2.2727354713124124e-77,1.98256537271364e-64,9.933896585736284e-117,5.69716975071822e198,7.955264647177935e-62,7.862058348584401e-73,-2.5196661686997983e67,1.1807851052588405e100,3.6099711279166686e-60,8.334226642675936e51,2.2815368039442215e70,7.095946526851385e9,1.7761883082623084e-31,-1.1437939519514336e-155,4.2332701919435187e136,3.472321277735479e138,3.809469306046104e19,1.5423648021389819e-133,2.6877172312295273e13,2.305930395457841e133,1.0521447212722159e-243,1.0925237686995151e-176,1.8024000775381128e108,-3.677525833163375e-193,4.2268960185247714e-8,7.881260780450588e-103,3.7396644093135097e199,-6.461299411337051e-49,1.916081449269224e-80,8.887837947652661e-60,1.3660165771864849e159,-1.5092070193514e-147,1.6694096791591134e-102,3.278613674016232e-214,5.378412376751885e8,1.0,-3.8630405919831144e-249,2.115764225985638e122,1.4075799886789828e201,3.6582293720716085e142,-2.141912629409535e205,2.9322481320363205e-117,8.955875195941296e-94,1.1516058992328155e14,1.494965781951622e191,2.2109771912699714e-63,-1.2138237769460424e194,-1.3755437715884336e60,1.505761793978988e-32,-6.448816131370071e-19,7.419328515883349e-50,5.4684331197428525e-15,1.446825698031026e-138,2.100663156796972e37,1.2286528718314597e-228,2.712676557331769e-133,-9.68992053608532e-210,-7.443058158496433e-30,1.792216356834077e67,1.9165885530409922e-16,7.096343026307608e83,1.5885120713364406e60,3.619940183924936e-27,8.864750818712635e62,4.261795311161895e13,-1.7446818898235994e196,-5.7904731552412095e-70,-1.9442684196579692e76,3.808827928751458e129,2.458780885124076e-118,6.8981732767960795e-164,2.288349717395589e-186,5.333846061256984e37,7.54993076788102e-229,2.7331219589998355e-151,4.050469805016372e253,1.9738888722431376e-26,1.5098382633425265e-73,1.0542951407773189e-134,2.706305413613896e-100,-9.781629691618684e215,-2.2896571923692124e33,-4.137192488791631e188,5.247657695895837e76,1.1921637534362205e-44,1.1633069664756513e59,5.5712378123518595e137,1.796804291220934e107,-7.48839284922819e212,5.1322552122815586e120,1.5595771070654011e164,1.5703715058678367e-195,1.5272547968997952e125,-8.207334817780954e-125,5.695419987366629e-87,-7.034283272596926e223,1.690170431791553e91,3.9438668758063586e-176,2.2753901280335286e164,1.3332587802004138e-155,2.6705273443062758e-74,3.640882498082029e-91,2.3491865161741344e-88,3.362499523614514e-227,1.0294153480004438e84,9.917886597933363e89,8.913186748046344e91,9.054859561700936e63,-2.8623856304564153e130,-5.554998565915329e43,9.33752144601326e-117,-6.499709953296482e-145,503251.2981060831,-1.5929297952705742e-8,1.697838406803989e39,-1.472475461927876e-113,5.466313977604733e139,2.0488151572296724e-105,-3.1955320964310536e75,4.923639570876037e-82,2.2535069459280224e-102,5.503743293512791e-95,2.343554694033924e-219,1.6679933262035004e68,-2.647014522036175e-203,6.017178626942708e-137,2.967770185184546e-32,-5.696702759129144e111,1.8005684443312566e-184,5.145033062334702e-106,-7.644319508488036e-22,9.073834019418335e228,2.7010725352887715e181,-4.573509889612418e115,7.351660620677448e16,4.3368309933576495e46,3.716083277457722e-68,-1.7151370116703785e43,2.8871211257689252e65,-2.0753520088874547e-70,6.0791099822558594e-105,1.5679055912838694e-265,-3.72331852742574e184,-4.0669903110741515e63,-1.4561237982124817e-131,-1.999332137524473e231,5.144566017880663e160,-2.4896076618406006e-241,4.2721931914898744e223,1.2068751569496621e152,-1.006676814287363e103,-9.148861440176608e89,-9.060610931688648e7,-1.1188024032598895e-199,-1.0357539299258496e60,1.823603527032264e-65,-1.0790122518571359e-136,2.7936507045690708e-77,3.738449357793396e-181,1.610932011445538e-248,2.391118881343453e-62,5.522937112810561e-113,1.2232208873296865e-207,-7.793670752445892e130,2.651257210680115e-128,-1.3703769565800196e214,6.443536910087851e158,3.8842520089871664e-243,9.014083723578891e-241,6.142012716772339e-177,-4.469760219050291e162,-5.012880584800677e-164,8.394875739848805e-137,5.739686164749426e-69,3.302001264321017e23,6.615318577913542e-19,-1.0333797320259329e11,1.796514014433481e-153,2.9159374626058798e60,3.497503319170366e-54,1.0773774168170392e-214,1.477602117738391e126,1.075452472709563e-225,-8.235483497644529e-20,1.1008299261953982e133,1.1723266157260307e83,1.7366943101116835e176,5.976280573886706e105,3.507014591995761e61,1.7183603919969535e-92,-7.40983670063486e-217,1.6936396006342703e222,8.794916482347346e-183,4.237576453754533e176,5.314863593601727e-206,5.688506708279718e44,-6.356804803522978e141,3.4865371591370866e135,-0.002335021519207573,9.175982969468982e-18,1.1018334396463503e184,3.842603054501276e-201,2.6460199962772705e90,-2.0177023849952166e-132,7.088043704451347e174,8.656323053077465e-17,2.397043259976894e55,-6.593864510140884e-233,8.723616624822374e228,3.8310467941440506e-121,1.2641548414701488e-35,-0.0078009370653382565,1.3583793864337246e119,-2.3735488474935765e94,1.8702578440038544e88,3.463918228856441e85,3.9275642524377316e205,-4.887948426737843e172,1.2805594091110693e-50,2.6995423810857434e91,-3.406068373709546e-260,3.351159445329873e-151,-65.5349671952228,3.759906127023959e248,1.5833920499536118e155,-2.3453610044751988e-29,-1.226389210601377e-117,-6.134707259957405e-76,1.2523662555796139e156,-1.4895367118962302e42,1.084156765331983e163,7.512970030740085e-11,-7.987853673721986e74,3.0928791953794075e229,-3.7927139827026895e-240,4.125055613865464e107,-1.5156734439984695e-113,-2.9165181726403316e40,1.5338026191313106e-151,1.6877819055457512e-123,2.6704516788250153e-180,7.508591853425383e-108,7.311821897558136e209,213.67121444608415,1.269811622331213e-112,1.159454963258198e105,1.2665759017958656e16,4.782586091673685e-16,1.8450871161762216e-199,6.55653530102965e59,-2.9341840380220533e-153,5.4220971629846506e190,1.3311549676973703e210,-5.294429035402811e88,2.222784075147662e60,-3.958823906833403e234,1.1044146044282634e-31,4.300661694056993e-255,3.650294159366428e96,1.0967837360935497e34,5.917494290236698e150,-4.2973901012162405e-62,2.7139626534526976e-243,2.7430001347086843e92,-5.439116925916354e31,5.099372708327345e96,3.4681232522701676e-129,1.291919862636435e16,-1.2458449402506601e-38,-1.5275202556295612e63,2.7843015464696893e18,2.5682866947779204e53,3.6576632006927815e-205,7.665420605383569e-140,1.8958393304934235e11,1.3155399894103161e32,7.980470656750378e-60,3.236768467223427e69,2.5589207186111505e48,1.5956058622086627e-215,2.0932007081215532e-108,5.758608261284827e133,6.548388349087874e40,-3.349602394420144e76,1.2320294070523853e-106,-1.7397353866745555e225,-5.614463310732013e-218,2.4102233172956985e-199,1.0364384570496689e105,4.041790439941831e-211,7.087175281781049e-112,1.0845303675922228e186,1.1950613572505536e9,-2.8491517490018156e13,1.318280509733206e-29,-7.877567136766619e43,6.0605531664526285e90,-2.296822920286611e-31,1.582402283928862e-238,-1.0468302417688381e197,1.4113428703323241e165,3.3835344301099523e-7,1.3370341759462987e-208,7.5980096001212985e180,-1.2867350149666786e-142,2.746745472826304e-219,4.262407776315206e49,4.784854001603765e236,-1.3350725750434536e-145,1.851440865602433e24,-5.156117376744338e231,1.9339092162815117e-62,-2.976166686691922e-71,4.336864141130308e-136,3.4853433876663066e234,7.379503004503769e82,-1.232184320744126e17,-6.498231405351911e-26,-1.0355982106869881e130,8.721253472520206e-174,4.467065253705194e155,2.697648273564497e89,7.659277274240017e93,1.9858992850386675e81,-1.196417666297088e126,6.0403236901811e-21,1.7249877878289327e115,1.0479068802299123e-87,1.0117120554745328e-186,1.3687451317453375e45,0.05833773783950604,3.1215758658654103e-127,-2.0609401805687122e10,1.9142194832988715e-123,-264.665393735831,2.124243186919225e-42,9.89388029759437e121,2.386776175004009e154,-5.3788262063812624e45,-5.609876685546713e248,6.201491702205618e22,-2.2516040639623285e65,2.3318795871033257e114,-5.027626688590039e-39,-3.4553778918209237e27,1.6610194365763638e-74,-3.758288074822704e177,-4.743531151941861e-37,-6.05414963807116e7,4.485415012059392e183,5.138005767691108e60,-337682.5708928497,2.114603895197514e-153,3.995811692053435e-19,2.7999096027561744e185,4.349146169329094e29,5.915521293086929e-131,5.2951471082210074e-27,3.4221221149382956e-254,5.047536402685985e195,2.048737438639237e204,4.1892990632511455e8,1.3125856679840673e25,4.907708622360873e70,4.609104257028529e-176,1.7347610449227018e43,5.770263476938928e151,1.279443544200389e-180,6.187831366536679e-81,6.551344764901049e-84,3.6215823058677417e229,5.798145239131619e-245,8.45328136144048e-205,1.6286392716669623e-214,9.398281428496976e10,1.1892589756157492e11,-2.4054704516631624e-245,2.432346457554053e10,1.9317917261037375e49,3.440213760563766e67,2.123995419067397e36,1.2836335591910251e194,2.3846016551150765e89,6.446732212414633e152,2.3964244042718128e69,1.7585642348234527e-202,3.4214925008436375e120,1.0,-2.6863104414415968e60,6.804800779739249e85,1.4586494062478658e15,2.4706440936866415e-184,1.256591105929806e45,8.371829414661201e-90,1.1852178720001333e-78,-2.1610448238009938e-30,5.399420363178264e-165,2.399162771158359e-172,2.6040234949246313e-113,8.646749876640397e-209,3.3042494712993983e173,0.011108463862013088,-4.4784434187293345e52,2.997289542730418e-157,467.06878437978276,3.0820678684194748e-55,94.32531306750502,1.0811822656355158e69,1.2539901544864802e-143,1.334105694128065e232,1.4740919002211344e43,4.492724126193101e-120,2.5677792511486864e-203,-5.091121032514685e-204,-6.004163207660212e-43,2.1386514551761196e65,2.0642705320171966e-54,6.66138532515041e69,8.201115370482879e110,5.290464619449011e-33,1.8864456070649872e21,8.85131590231864e-207,1.1825783824883048e32,1.4052854413564926e155,4.011549811073379e-116,4.209785322563612e29,-8.630931012902397e43,-3.3112087377941044e34,1.5054085633657923e-52,-6.724639029358558e24,2.0023159265537685e86,4.277879595042154e-77,4.293580642910267e228,-2.00929066266166e220,3.7332226328275156e60,-5.4058650139041166e144,-1.3610540402144867e-23,6.002770262822965e121,1.298394656658799e-153,-3.6027830170278297e248,3.1794848402664214e24,-1.4018813939357173e-24,9.202579635200645e21,-4.2423560322034253e123,2.099618571058719e242,-2.751058447522422e-146,7.512515293325345e156,-5.064102303713906e158,1.2991503056386872e-87,-3.705505286227871e-74,7.897713375708848e130,-1.2187446262296997e-80,2.859782041861181e-115,-1.0615523891921144e126,3.4091290077706894e-95,3.017639648467953e-249,1.280360556144728e68,-5.715544414328063e158,7.964886730078292e-114,1.1314952422386965e52,7.042545685506991e79,2.1940289704406588e98,5.903548501109592e-110,3.506828443345107e57,3.484285984874585e-235,6.65637899965509e63,8.730701124464909e196,3.196904507349025e-63,1.0008508565997707e195,2.3006094164547665e77,4.888557550429508e186,2.4683679154743006e77,1.4828977678100925e31,1.1253291868294901e119,2.172237158306718e211,1.0462741033473597e-7,5.7896580241439755e85,6.64159556798124e-193,2.8515737150202867e66,1.0055165426301804e-158,1.4516696234997986e216,1.4927572732162323e-120,-2.1131376704047263e103,6.885345100680137e241,2.5569650717438525e-118,4.4180827570687894e-204,-2.451656297189319e-12,-2.8037002746851866e-167,5.2322663433704815e-6,9.012773259534524e85,2.081986892193072e-131,2.589490678950517e194,4.35257443503124e73,-5.3817736815719e-14,1.697092045642571e83,1.0344356824484834e101,1.7365893584078024e168,2.1752012991759734e-181,44295.72650791469,3.3748970592995197e-143,1.1131440693341114e-127,3.2067826124852313e112,1.579731783383691e-144,3.798189985114048e-150,-8.207417363389938e7,1.2046889620800412e150,6.433218500881324e68,1.0999193148574058e65,5.492327875552227e-71,-2.1314562658925463e206,2.7466251564504013e164,1.2480765171192323e-5,4.120157620791853e88,-7.904008910075681e-203,4.325320006585745e31,-244.4554751692629,1.0156849407974364e-37,-1.203334180830243e133,5.403384942211366e15,9.628361872865143e174,-1.3977658879550884e7,7.159466056661922e-182,2.905097732774267e-82,1.0819129714773078e-211,6.741094385979084e37,8.019508570749218e-98,2.2189478216209143e-117,5.295703453359159e40,2.5791241138680643e-233,1.7333752065243873e-127,9.86597926173543e236,7.659592345481736e41,2.3613735424877753e-77,4.395014237481467e-97,4.13874379319563e-12,-6.344264775110048e175,-1.7480119072157475e-135,3.474853120411941e112,-7.1442898632688935e87,7.332875915964766e138,3.19243799094867e81,7.5508505165534e-173,3.3187975188438534e-136,1.3121895668000818e172,-8.408550213990386e162,-4.42958116982732e42,6.633799349273292e-77,3.267664731893002e67,2.4716390727767324e221,-3.3030651140059684e168,1.9845268228205186e79,1.458419682140238e-124,2.0070269419918466e-5,6.772177426075317e77,-1.4619238639496743e32,2.045537656348059e25,5.673117617638672e15,-7.489165936150138e77,-4.318925147534445e224,1.1995245016476345e-40,2.5187026415329683e-136,5.976567382316507e95,8.678042798608527e-217,-8.162062776092291e98,-8.595117065001788e15,2.0036618904658948e-132,3.413836386491566e-20,9.165650276383614e9,-3.2847813028688534e-66,1.1669729406695376e-176,-3.9089678197942295e-145,2.0922321442798278e-232,2.5982338654412108e-82,-6.140997606735237e-90,1.0174619368963869e-183,2.138665586247137e117,-1.106825469150157e32,8.646045284521556e120,-7.340096956457005e136,8.695434411310386e-213,8.019017108750126e-254,1.5269815248918022e-95,2.1650738386207387e-91,5.116358113927046e48,1.1671390329846619e25,-2.504639253745943e-139,5.2133143944791495e79,3.571828302635399e-15,-5.087763067757181e78,-1.7179830813237808e-100,1.1111773548422438e103,3.0786965739537764e96,5.218200891886871e144,-1.0523879510050818e218,1.060419469382436e47,1.4393888240487535e105,6.256950027594917e60,1.0682095441777376e-237,6.656569633859398e-112,-2.1621797905122885e201,4.082473034769654e-211,-8.670552591452408e-42,1.1026695979913041e-52,-1.3435499155195706e157,9.647347028954579e-208,-5.552258706657467e148,6.23344178517397e183,5.505975811209651e-210,4.023182832330978e48,6.904911348632302e-29,8.781787558786479e-153,3.343792655812033e-64,-9.7924475529728e142,-1.5403547374813093e43,-3.7645705501096886e142,2.834078630111277e-40,3.077714032537871e126,1.5916969492618724e-38,1.3769926726789252e159,-1.6001843148129793e-217,5.1698527597048133e51,6.815470743852848e19,-1.8336983752887562e28,-4.325737276621034e85,-2.2386117240663736e195,4.4203068092324864e-206,-2.0687651746680166e-71,2.13340210032235e-27,3.0578194102967615e-56,1.2468036398052846e-28,2.1151971516730242e-66,-1.9109033186566942e124,5.5043328098345285e135,1.1017734754445652e-156,2.696884703248325e-124,4.095487889393453e118,7.0641693654013045e-6,8.612701275316267e173,1.722294199243729e-165,2.0426608721717182e-151,-3.9693402332182245e-58,1.3529390757279297e139,3.0328100533897396e-33,1.4721247272436458e-64,1.894865451855248e-233,7.375356647657573e192,1.5560382908058115e-111,3.284653775596275e169,7.974519529767435e166,-2.057012867334208e28,3.3273709836854e67,3.1183437286727418e29,1.1652054595294788e164,1.096163530924141e-104,3.667586026260776e199,6.596207125813332e220,5.870695202879397e-59,5.222957685646495e-20,9.584322082741655e-178,6.513733344775223e-108,2.0296008552513076e71,6.118535734976484e128,-1.0079590008983938e-108,5.667214791165552e-82,8.131838403153802e-154,-1.264438044464291e117,1.5061077188864183e127,2.4213448867758714e-47,3.545055901953459e105,-3.0843896431248373e203,-4.084851223486237e58,6.516364422797227e140,0.024304237573349697,1.780970720835214e157,4.046655589431083e-183,1.4534284817480513e140,2.4950618018785733e-200,-3.959369881977147e-46,2.4870665811125572e29,6.105849275531081e-198,5.281841113241529e-76,-1.1775622850460005e222,1.3501201657516363e-220,-2.1625971060760782e-64,1.667123498059593e119,9.09218417391357e94,1.3332497346956583e-156,1.9889708319062682e163,7.070606959951551e222,1.2304038543133828e-165,9.945611269872507e6,1.648185277385004e111,3.373408618389724e-153,-3.8592018439851934e-90,-3.6901810609947606e-150,1.2254467334410712e-191,3.047945662652894e-20,7.939036656144685e61,4.1804059844220144e-185,-2.253779966345524e120,6.467435540654697e38,2.600393761044493e-236,-2.339169651657618e108,2.9055738733103157e-30,7.443930169106509e31,6.754609633092528e226,-5.61903056378715e-18,2.7342303118980823e35,1.6243534508950298e-140,8.494255208804499e32,1.5111063115858816e-150,1.011124900000711e-125,4.373537720337744e-171,-9.401732238818614e49,7.459065841802813e186,-2.152043088017269e166,-5.636643030977565e-29,5.510945320388392e-182,-5.848332375146844e36,2.676609620989141e142,8.427807249097001e-71,-2.5522426972114056e50,-4.166188216296469e-38,9.17498082617532e198,5.8734048624236675e78,1056.7201470983002,2.5932315022449205e138,3.7730148912745114e96,2.6296556224877854e200,1.1528218526713804e-203,5.404709340034201e-111,-2.032318590000726e-64,2.8675800907672325e120,7.838945102936809e75,1.6150148167326038e82,-1.770436398618032e-39,-5.99214218656936e28,2.8474454439399884e237,-5.443216252362986e-40,1.151633706422553e123,1.2987921315094202e-21,3.4270140392567685e-151,0.003062595272120465,-2.9416989125617205e115,3.201840614901989e17,1.2050305309543973e221,1.6937738390611727e218,-0.004306946107505188,3.1613341871581836e103,-7.434150866518175e-196,1.088649742483927e163,-5.862920242829074e168,5.579558344404339e-192,4.018843135893309e-107,1.623761287540159e23,8.787394746488859e153,-1.4865911250074596e54,3.4613364366403297e238,6.701208901419013e-159,-1.952962680375112e-248,8.890759586767773e20,-8.459185531723163e-21,1.940378192162903e-43,1.0824635380078127e43,7.172252233007505e-8,3.9747825974883754e71,5.129661461733179e-33,3.124606744447416e73,2.230629764826066e-6,1.0102219829449862e16,2.860021567153216e-254,-2.4499410678943773e167,4.916727285921016e128,-1.5839678459892818e16,1.86381486508294e26,6.141890941693598e53,-2.767812078946482e-162,-3.872026826263563e-170,1.5711012279881356e170,2.091008840390197e-42,5.454782381546999e154,5.39768903882737e120,1.0781926263444453e-154,1.7010593230001866e-180,9.091636990585741e-144,3.4791527468280086e-109,1.3392370870789892e-58,8.132617289536059e34,1.0074605689562764e-188,-1.1263414681299593e-175,3.698468855338669e106,1.3467443090172234e109,-3.666059884850624e-116,-8.375875620262598e86,7.676391878806829e-109,-3.8504857550994014e86,3.156844018679433e17,6.524197055889507e-163,-3.547911153434901e58,-96.36589492828949,7.883039507939119e-127,2.3747422803694237e143,-7.713630527526097e-250,3.8506563698424485e260,2.3302239356249176e75,-5.47372863960699e-166,-4.846801588156666e-172,-9.072132804551056e54,-4.353734417056429e7,5.5268292886114294e14,3.8612456266197387e-187,-4.165181580971736e-9,-1.1606652719032695e73,6.097834069748482e215,3.556328112281498e-223,-3.3488913286415384e57,-2.9468617762318165e254,3.198692174786587e169,3.4110291122232352e-143,3.23190545910757e108,1.447295218680681e34,8.300019963104604e-88,1.2515489196154739e-8,-5.227253152476166e-102,1.7402968886445743e118,4.1498812750574654e-10,5.298515340307522e37,1.1446632947487521e70,-338.11467925032537,-38.325437736671745,1.5250985625288738e194,2.831338138859158e-20,2.2466877580965796e-242,3.840192942668977e-107,3.187732109024775e-199,8.655691009490838e-15,-6.127781196171368e-221,-6.0164689373199865e6,5.949992580588789e49,1.1834400482889399e-29,5.630528920032596e-243,-1.2111493716862826e22,8.739737853674943e110,3.394386267400427e-92,2.2724483167752888e210,1.4021605992110128e-89,1.005197505494116e-193,-5.490667848602166e126,1.6421273947733618e-18,2.7971187426827236e-7,-3.613040511351903e142,-1.3785550355233802e-162,-3.6846492465640364e-13,-6.533962430134092e-43,2.0947266242899736e-40,4.324552896424761e-60,3.506358323957675e-141,4.61589170667492e-68,4.5868314910770915e141,4.530029587948883e244,7.963735079144321e-55,2.429576135938772e128,8.501152989894688e81,1.0302191548662615e-241,3.5045725528205645e-103,-3.7062228333134725e177,2.771697839984197e-145,2.3920047120140717e-84,-1.0118371302940394e-23,8.919633433916778e-254,-2.885353545978948e12,-2.4871094643790794e212,-4.774242535998677e43,1.0,7.861139875942634e-23,-5.016237754188834e6,-2.11738977821256e-112,8.656083156590721e-123,2.779967701795459e-139,-1.752472294586584e-251,9.268015536423591e-73,-8.725659846784257e-110,8.188857283324766e161,6.42542133293538e-178,2.4565223415370993e128,-3.370125838599506e138,6.080991843709998e169,1.171305212689433e192,75857.2345518801,1.1985844247374559e209,2.7339771801245587e190,3.719183272785804e110,5.558895772537475e208,1.4228823893860254e101,7.663135989290667e130,1.9311205589883306e-136,1.620280267372225e-148,1.4696210472063452e40,5.2272547682247885e-36,-3.173661532124102e200,1.537932353838195e111,3.5421166273239394e150,4.0751090436690127e136,9.925741026318622e-90,3.3667877668311376e-13,-5.3770064581004634e157,5.41448987840925e-49,1.2356996237321611e85,2.466063513057303e-105,7.364235561909538e83,2.0281696123314844e225,3.886458393813148e9,-2.4124499580172294e-141,1.7819242224354955e-68,4.1905378224509675e-68,-7.319427127947956e-40,2.4461003655466955e135,1.2468104199662953e-155,-8.951921777275202e-58,1.736439542002311e-159,-168.26025989958688,1.6139008299592394e87,-2.3936352266794843e-220,6.743928033250958e-15,2.239350887753732e134,1.500285631034833e-214,4.709704999740006e-43,6.355320357236193e235,3.2651999007864655e-184,3.5999068083756766e-114,9.355082077053217e181,6.067479535164917e-180,7.17293079804074e244,7.41916897198513e-110,7.938448936184203e-66,-3.836376229271622e251,-2.8085878585514233e167,-9.110255059898308e26,-5.246951495348029e54,1.4937379579232937e31,2.433859879710237e-94,-4.2159355170905113e-122,4.6137139937502294e83,1.2706030786205323e103,1.0492481669356899e67,2.877727611347602e-146,5.265013832935296e-72,1.8358122300121573e-15,5.818529032020293e-67,-3.4475184193573844e63,3.599491025439781e25,2.4636197495033903e-220,1.6862308421615164e-15,1.1593317751095687e51,8.464234724984395e134,6.08252564246311e-223,-5.9600765873171625e-123,5.515848893133161e-27,2.393840772629142e84,4.848571850035845e-168,8.871013004865358e-152,1.0363769675932728e52,-1.3493066720753677e-50,-1.31446432327234e-131,-6.339487351708774e100,-5.922200270257196e16,-2.477297252877922e105,3.9913599843833846e-137,8.041694394054958e124,-1.1470491499205273e-74,4.247813432768864e63,4.7255296141723794e-11,-3.495362602292072e-121,3.5495126366040465e233,-6.109850693869763e67,-6.2164074179188425e128,4.944389613728909e-184,9.929128278730163e126,-1.4147640216810298e-100,1.1863060741642668e-80,-2.2575874364410312e-20,-2.0823771590743034e-38,-2.694737793622902e40,2.1969316367443255e-205,1.0792050527825796e-82,-2.051340907038936e69,1.6281242255139665e-35,-2.893417606940956e61,9.660221323317644e-73,-2.69424412644639e69,1.595658191104564e-26,6.195810273737698e40,5.491580525115341e147,6.129976340660507e-223,8.142222646481874e172,-1.889827338303701e-176,-0.008687418213578138,4.835790043562644e235,1.0068114449365237e-41,1.4191295439018195e-13,9.239916651027259e-48,1.739691768607434e-215,-1.3162310880027252e209,2.9047761929422703e93,-1.4312907415479074e204,8.446581916323795e219,0.09208722741271039,-9.010221448630127e-141,4.247236277333824e101,7.235259113133814e28,5.86012165237992e-59,6.221034649837687e98,0.0049540604474380655,-6.152954994900398e-74,7.450252355340794e-204,1.0009717515541216e94,9.57876461893957e219,3.666347929797218e-150,-1.8259103431284742e-135,-1.5516771080927325e234,-1.3791791910532043e-31,1.0786813264067508e-176,-2.5417176280094136e-111,1.6799834196405504e-168,-1.6057988841286494e-127,1.5514965206155113e-239,4.6338526497355947e85,3401.4515066270037,7.411597464571895e-229,1.2002850945213896e180,8.476903375219198e-185,-1.8006740616856152e230,1.1677651512758082e168,2.1234383824911654e99,1.438721087381022e-18,1.0,1.0470777260117407e-7,3.0215638487973085e158,1.430515841299191e-166,-1.7063010354354505e235,3.5542899412893525e127,3.3323479216940667e-186,1.0415810201859276e-155,-1.7760803318094862e188,1.689447037714363e200,2.71115751726156e-100,6.66191166888268e-210,2.8633819105467514e30,1.5574682005848824e28,9.775316934369534e-11,4.923750517315266e150,2.6793062083610502e48,-2.2019975562214605e-230,-1.4910820095690122e-34,8.146938175038101e106,1.8619044776910804e-65,6.239402742513658e80,2.141201427214045e123,5.856034422281261e216,1.3275283286497237e-159,-3.3329818432434033e11,-8.853824684195395e198,1.0639205684641584e53,1.740893475392807e-82,-7.034170948960189e-249,4.6346218456581443e195,3.90345130454577e-166,1.5003778978728234e-160,2.5230214920206967e-99,4.468935382207257e190,-1.3141797744125789e33,4.403712464272307e77,1.6568573425209096e192,-1.3969001839056226e150,1.4164253756123503e99,5.62538864804544e156,-7.616025496821585e-252,2.5611364666369982e147,1.7944893545607586e138,-1.1801526624005143e77,-1.7292076941547434e169,6.433543264322032e46,-1.2203704577542633e-206,-4.718078880315279e39,9.2237338738854e-146,-6.675248578675996e86,7.509827834702485e178,3.14678913995002e54,2.9680702016554247e62,-6.527145654156626e169,3.8466050555265916e90,2.3805515358180752e228,3.0700264629941513e-230,1.857724059346826e-109,1.2251818711651614e-220,2.5507738112556522e-76,-1.2561211897682096e43,3.36903488504473e87,3.5186160486795815e-250,5.79177662825317e-26,2.6060063922688748e129,8.272815940744753e91,2.0808732491177856e85,2.917437505675826e-222,6.879271258310268e14,-3.4766423126683354e-8,2.191700813245804e38,2.8587529776493124e-5,5.935774662158621e49,9.076822824813859e-48,1.9535955174473512e103,9.259056554673424e16,1.6397273769027937e-114,1.0377441020470358e248,-2.301146607258048e-192,8.545989163856785e109,1.5363761504096361e62,3.07272730762519e-69,2.109982263708173e143,5.181371461601211e-25,2.1587843213545783e128,7.742569693452946e-145,3.4979421272485295e-200,5.154724060999375e34,1.7989969497102245e117,1.1696348995181785e-147,-1.6370753809389976e109,-7.775532830541294e-42,4.4150355710181856e-92,4.279764352779438e-199,5.4151622966392776e-48,7.273717317088903e-55,-1.5020193638727964e168,-6.326014351957808e-155,1.853147427950118e68,-7.064161341157407e18,4.101354177141535e-41,3.253105210494732e-143,4.091409850996965e-155,1.721012072999685e-115,8.975689495138801e-226,7.876951584920143e216,1.5984732037363375e169,2.279227035049683e145,4.521830380704414e148,3.771352244094303e73,2.152996666664475e-32,3.5486985369368294e-166,4.244338603615231e-92,2.648700441402482e-88,1.1526957389644693e69,-4.726251104538712e102,2.857428407993019e-90,4.572716101726223e119,1.4916811321574495e-66,8.655832531024834e-59,1.1516028928766135e105,-1.5847267305220114e22,-3.7840291965153516e116,4.161815640939442e-106,1.3135608195825991e-110,3.45486644814571e-257,7.805408711725052e56,1.7220924008472498e133,6.318393973531202e237,-6.19499810490499e127,1.893640970554329e-160,8.134379356423511e239,5.118535431980498e93,-2.7693966161898927e215,5.140108292799841e-182,7.469296211555118e106,6.967856510140914e-81,1.7224871193239801e-196,8.846111022902306e101,3.1540755440548204e55,3.0137516998154002e-24,4.380017914073022e93,4.2988835528737985e136,2.324715701911061e239,1.2960251847489102e-102,-1.533477414198647e-110,-1.1669063539946282e17,1.91263697625745e79,-9.048111299033586e47,1.29987548107279e102,1.5932887464714773e-178,-7.543193825453263e61,2.4742772665002982e-173,6.075597919171028e-6,-5.236362350999426e70,5.868143121478448e-193,-1.9977003713692507e149,9.817237572417665e197,1.0552167005717257e-164,2.0600741998585193e-256,39559.51086496111,9.909441902424592e228,4.0008975598472383e-94,-7.347733428067518e140,2.0520724444769844e28,1.5881075302323134e-45,2.5725785192916226e-96,-8.834608774968857e179,1.6564258690335228e-90,5.788666154793025e-214,-1.2069192666140945e196,1.1784561069946003e-104,8.115090043101999e116,4.979792249450966e99,8.295653255763039e162,1.09964248789326e18,2.0023416558473275e80,-4.0527677576249056e20,9.197291318795118e11,4.043812451767047e-98,2.2374041264175675e-22,-1.0305243193006365e228,-1.1744532332891579e-110,4.044956796431443e-73,-5.231214940215483e-131,-9.036185880305184e-158,3.769283451135054e28,3.9497337120235074e-190,-8.372882726673217e77,1.4860642363152366e79,2.186561344127429e-234,2.810352948737543e199,2.17030623821862e-173,4.54202052218772e-183,3.3391118105725386e-24,-4.121167054907105e-11,7.340635507192398e219,8.079379966075418e-108,2.4477705657532266e-21,-4.076317059463029e142,3.143180499322811e-56,9.357135437297005e40,4.76138426640297e205,4.974474968149443e86,1.2736197146899257e-26,-2.0938808211387452e108,4.654126037319244e-96,5.2918184697052225e218,1.4728993067522584e76,4.3073156226452143e-224,4.6774664201791625e-179,4.493147166860536e-210,6.859149151318991e44,-1.9262489680875273e120,1.1874687645185975e242,7.108388456748518e11,2.4300174726773183e-70,9.01813565110027e135,-1.7146994142442688e109,-2.843068618670066e-148,7.139132195374979e-195,3.413386898351708e213,1.1461208898673008e204,9.646456728800561e112,3.1794498685718833e249,2.0114127494702103e230,1.3790478850126482e222,2.949688986088183e-71,-1.689825924789798e40,6.158803589059669e99,1.7987266803266355e-93,-1.4613417110206325e186,1.1990084330558448e-8,5.939324342703696e118,7.950443826022721e42,-4.6112598972930003e-119,-1.5624659975340458e-189,1.7864987390832536e137,9.442162610552285e25,8.306039724200518e31,3.853534231109931e-15,5.788988835331131e-146,5.41488723428027e-94,1.454973633765881e-95,-1.0703641413248745e-93,2.9623989022170965e203,-3.6051456311794286e-246,1.4916542703092542e135,-1.8089533763487049e-22,5.206877651350624e-31,-1.6283269082591624e28,1.199809203662548e235,6.892395625939768e-145,4.8985528465381566e107,2.6078307941261597e87,-2.306082592271008e-85,1.635076513463504e179,7.139166392900803e-6,5.373081160329421e-102,-8.981701224779131e43,-1.8875227378250948e-175,7.109188687238368e156,3.2436673078139693e-174,1.8511042451920381e-174,2.3733776337029437e-13,9.409279566087076e22,1.6413338835669882e-184,-2.625916297768057e27,1.2381570952129895e185,1.3722056878377761e32,8.786360263327349e219,-6.770539524457836e106,1.4386148035850586e208,2.5218627112467026e-169,-9.148443852319927e-40,2.028628324199359e135,9.234783626729477e-53,6.727125738241952e-58,3.350838633241889e109,9.120923523972081e178,-1.3212609494529654e187,1.4283417770439235e77,8.256969296043176e-124,2.4804253289990126e-67,-5.153959741851083e199,2.623205110214412e-89,9.965628308367262e146,-8.010239935973856e-86,2.0458768922675824e-65,3.324244110201908e-89,-3.189050769865672e-210,-5.324871818716294e-45,5.247438873557597e-202,-1.794211905373439e-79,2.1256080413976005e-21,4.943414504945016e115,2.5458634285126498e101,4.262513739032232e149,1.1391843314666972e-78,4.288845203229913e-87,2.6939022319261666e89,2.7825418800392705e-162,2.296271236730567e189,1.2914622483774913e-134,-9.504401423537333e-186,4.534915348121551e150,-2.302020182880104e-66,3.8496942103624514e-117,2.4673737468776706e-103,6.494506084712005e-187,-649553.2070187104,4.495670105030872e26,281.6042002690382,-6.293416613987473e-209,4.05805926333968e239,2.350207756718523e111,4.311032979541069e-30,2.882252450564563e77,-0.002892563966657721,-9.779161337610031e-197,2.420078662177088e107,-1.2946208171582145e73,2.0406166475158595e-48,1.1698069098235817e-191,1.1494892624253389e-55,-2.682792967584529e218,4.317766681961725e-174,3.2877979649429574e175,5.26025040319428e-50,1.7338723652917198e185,2.745139444649825e190,224.69096042362378,2.360168043423683e129,-6.394883468219057e-151,1.53995037017613e172,9.479797709449416e21,1.7895857560433297e-43,-7.311960754384395e10,7.077384386281044e258,5.51241101691767e-214,3.999235677670084e-57,-1.743971516302017e-183,9.7479492648118e-162,-5.401917213924398e-118,1.0,2.930909492659779e-198,7.4506808038898815e-199,8.299609065826056e-151,2.190805614258008e-8,4.298583456613035e131,-4.877598355530861e-44,1.697154149534939e-5,2.9176463211787188e72,1.9469864251198427e40,2.792185487313891e39,5.9238363891924136e16,4.99894532639515e192,1.762701048723606e9,1.1420665555073382e-33,-5.3492241323512274e-73,1.4399208885082043e-170,9.802380475033735e150,-1.6929114488054016e18,2.959460372665579e182,3.103362706010138e-35,-5.530990100837957e-80,1.2737453322340435e-70,-1.2793168459359481e-160,2.406277351609635e-220,8.770339963299637e138,6.328329518421742e-187,4.789774625120997e-95,2.2758689994172165e-70,9.13247569634719e-6,-1.0232982627781375e-123,2.9305501796437536e-134,1.0095610459928584e109,2.7739298203360192e-247,3.100469846402369e-128,1.7564169937169183e60,-2.7767779803248903e-97,3.3825896500124615e85,-1.0093724034876421e40,2.084609588948072e-243,-3.768572658749576e-186,7.996520419021076e-138,9.542388353503463e-15,2.302227660612312e-219,-6.364352856296673e159,-1.7172218540178515e-193,1.4168537583308852e48,1.3538801851687083e-50,5.017385014933298e70,1.948410087607404e125,1.9585214023806825e-196,-1.1799600941535537e19,1.6391848903756934e147,-5.041540487107607e201,-1.0149863309977145e76,2.1013316496273858e80,8.915918921667401e58,1.4927806550280117e-222,3.8243151738625446e-73,-7.572760812683098e-79,5.0809812225486214e-33,1.0932879787501177e217,1.5847771856909128e-110,2.7088280551887988e135,1.1609509258332646e-99,-6.23101774445295e-157,2.1188737818788528e9,1.1704296759427606e-233,-1.354095235128879e159,3.814921412151868e-211,-1.1626643128054935e24,2.7882520180151e-193,3.817121413279511e202,-2.4119361998750684e109,-9.918975766333541e154,-1.3456315488503456e86,3.817310390162593e-213,3.146832489885577e145,1.5236393291443858e126,3.134944214775159e-48,-1.0623875436757596e-236,-1.1087350363713414e123,1.172720431276129e-58,4.2934709887047093e-35,5.0769935706882065e-105,-2.512508515018518e-174,-1.8022387394566785e-23,-4.402937425114153e71,4.454281766879141e-78,-1.7885487434231437e216,9.708283354420314e186,-3.520853397703259e21,7.76314752533432e-62,1.0034934951530317e47,-1.4049606178870922e74,3.910498067436463e-30,-1.6291323432366782e-105,6.529781409713502e-50,5.8805053751694246e88,5.012898600218717e252,6.610574474035923e103,1.7883975457634098e-199,2.178489320074587e-127,9.010668516543586e187,-6.452049878654649e-162,1.4306689596298985e86,1.2755883458243545e-73,2.4989122630546284e-45,1.0,2.086883698214022e231,-8.305507664476012e-129,4.916611068511262e137,-4.9619287663828e49,4.793781464809964e37,5.4562944796920585e98,3.1235138050795586e81,1.6362318810803195e-216,1.1900302794280212e-110,2.0168101366285326e118,4.268243354965183e-207,8.104872463510169e35,1.3725670800596245e59,-8.996787225244751e78,-7.689370946894309e55,1.254456898176107e-41,2.569474521743554e-120,4.074688947019002e-5,9.0847874484952e180,1.9436617574955867e-141,-1.771510401982525e240,5.663701318280186e-122,-1.9917218416363948e99,-7.442583251044832e70,-4.265593110896781e34,328.43416263368795,-2.24303169951875e82,7.314433896476756e144,7.043008696380925e-100,5.804444211353491e118,-7.658231106545568e-89,1.1308074514187394e-115,-1.1869402889065396e73,-1.0574362830868298e-67,7.647620954935662e-41,4.790473590597351e-11,1.0101981153077699e66,6.478684557295383e-56,-4.63278849942992e172,1.3538785570725682e-215,-1.6696536236753917e105,5.76406984475402e-166,-2.1604189683526807e-226,3.3269322076112437e-212,4.807450424963814e231,8.176732271135896e-63,5.176230946909625e-131,-5.3957327872932385e104,6.1032510187324064e-58,-1.0156027368089694e-19,1.582951312155767e131,-1.1068372527659668e-13,9.85783819596456e-14,5.5304574681516135e125,1.2960582395645496e24,7.030596585680519e76,-4.5428161581803105e-70,2.7180898376673063e32,4.489789998509002e-136,-1.8533779206815282e22,1.3510628611558747e164,1.0705932050740602e203,4.2917577046286645e-11,2.3809362884025007e26,-0.003324474113376034,1.1554658969410093e-190,-4.034261735862947e138,1.6767865974161333e-42,3.774563644629744e-226,2.852373606100487e-60,2.9712735246298373e-111,-1.1176258549562036e84,2.3582680134613258e170,1.2875539157505998e-53,9.504047657305647e97,-6.369106433158516e-178,2.107642038375175e65,1.778687245832116e-44,-2.667038286378798e77,6.906514772210563e127,3.6429555788068813e-247,3.980058447552131e128,-2.1123432980633113e82,1.5005153534976294e18,-3.447269238630916e16,9.137359349815388e41,1.0666800432776374e-80,1.0098487529423047e-27,4.238857306115433e-136,3.541975308489267e-120,2.2121402605055653e79,5.016640629140485e-47,7.088462774342808e-22,7.624261634610249e-185,1.251241324566317e73,1.0,3.1954427988952507e159,8.316131852935649e-14,2.7010360231090125e-215,5.139558054095913e-116,261.45652636782506,1.9565360046172355e236,3.779807144214628e-175,1.3149794539996717e-227,-1.710775008596806e120,3.944021069049703e-29,2.0404723103853718e-254,1.319103431572228e-140,6.269556089207831e-112,-8.219786466115021e131,-1.4716930748816045e85,1.4373804950660578e-11,-7.838882169360661e39,4.0235052880832353e-75,1.0539465748499438e148,-2.1103366619065564e215,1.5846739692086103e42,4.919558149326028e89,6.142512488945353e-57,6.237295518148487e149,3.2034329017977527e150,7.96103892074092e115,1.2096101239076285e114,1.1748927854372131e-167,1.0,6.611676421110892e22,9.517921700329493e154,-1.3355216515874586e40,2.917926912232208e-260,228354.44941297668,4.260862406707371e28,-7.589672266921896e84,-4.2136717859324684e-162,1.83522958772574e-21,-7.18958303518326e174,2.340621544750387e142,4.6588469627186014e26,1.2246768001005747e-82,1.417854054876603e-20,-1.0500010847571424e-31,9.10626467780175e-15,2.7525542296052907e202,8.376314040864178e23,-4.774272886528991e160,2.4426531905957e-130,3.9343553536366763e30,3.07530947995662e244,1.8769349942820477e262,5.053967997837473e-75,4.0616262102909886e61,-8.470795838773777e42,-1.1587832333835736e57,2.521946568519811e183,1.0800921695544792e-198,3.9230678104777736e149,2.3042379998689597e-69,5.486990641044828e-51,1.8315137027509175e57,1.8912481331204827e201,2.6385819419652267e-24,-3.0614403350905926e-124,7.141360234860067e244,2.783040881183158e-118,-3.0545642223574743e23,2.246026803050586e-114,2.109304538764923e198,-5.8297441753966855e119,2.588767233771955e-45,2.1670253708610454e-209,3.4563479248325865e-29,5.118691869816199e92,2.134885560676023e82,-1.656939580552985e17,-4.892737176924263e-90,2.074590253140627e-123,2.1155184035127784e-48,-3.3843069627188414e31,3.967654637832829e166,1.6850500906880016e10,1.8434700802557705e-207,2.5862471669831124e-139,4.796128626123777e-134,7.631348976978963e-30,3.9837842845676676e158,4.282809626825629e-131,-3.224914478614951e-89,3.7079491405391395e189,214204.70327264373,6.620871077639315e-72,4.1743839772630103e-72,1.8110706562402673e97,1.2924105966177577e-196,-1.0713637342374397e-179,-9.626392075151968e-84,2.768019358499067e69,3.6084268775157407e158,-7.797834473370486e-233,-3.08202837747949e157,-1.4716361170371862e87,1.8082039790814867e-182,1.0,1.8642496492888468e-87,1.9852445075623078e144,-1.9107812735116483e-17,4.2602184469813494e-188,5.639460727006024e-252,1.0504345943318133e-27,-3.931590729873824e-83,2.2885464550963254e-103,-2.0596274572479901e-171,280.4777692921725,3.118536571005096e98,1.4262016215417435e-166,1.6938574823429716e195,-3.4449542946003284e-18,4.3318198693514907e-19,-4.089658007385211e-49,-7.372080572151073e76,5.993480672319823e178,-1.2063227688018376e-49,1.6284987168349153e95,4.921648879806039e78,1.085104980001111e-23,6.884684416807717e74,-7.998287785194487e-116,5.1894512791483114e-194,2.1551244560222324e94,-2.442609040718014e-181,9.09170968688579e-39,1.3534858365445657e-203,3.0300273492201967e68,1.976644529223001e-183,8.379078446263333e-157,3.8167017337381327e89,4.2262202897436164e-138,1.228131291987143e129,6.663213516388701e8,8.250652047452552e177,7.096235588500717e95,5.509557431601706e-88,1.798332712066349e84,-4.3965633011978245e-202,7.415073564212621e69,1.3430842800713418e-37,6.754098138488145e-84,9.207476027554866e-86,276.86984603005556,1.1441709834056086e-146,-3.2689894183148464e135,-8.545963273502333e51,6.8703268344007376e131,1.4669932049409806e-17,7.7192907052769e-109,1.4159329248663716e172,2.9189210684711917e-173,4.184014835408652e-108,4.610380027536662e-41,2.9181370864148075e125,1.0,7.904599579187663e184,-3.6567473285342627e-146,2.5165078538760846e-47,-1.2089626542168602e-31,6.011399423348705e-126,3.179588213190615e-21,-3.445522695293122e-123,-5.022013442134573e-178,2.01895214025799e101,1.6798924653957575e-131,1.3004124271990894e-69,-1.5707766869525183e67,2.0193209500837557e-257,1.0988041228634839e73,-3.976153003297737e236,216709.45047967424,2.7594597872769033e23,-5.5072733654347345e7,3.975030275096318e-54,-1.4246217020443196e26,3.041576237526225e13,-2.082815442285498e-179,-2.264281859132769e33,2.619024163582376e29,1.8722066106768986e-174,4.4517061276223957e-41,2.83112873381565e165,1.487934179125976e-29,7.531353464628647e-22,1.6224776365235455e63,-4.939622041722163e118,1.2030396856600174e77,3.148471713836912e-27,2.9786739506336877e100,6.3702556407067695e-198,3.2701285649418247e-153,-7.22568382529823e103,1.0756298369788024e-11,2.4319276006702064e16,1.033404942309222e19,7.232114077095908e-137,1.2815874295057437e-203,3.628387595629284e83,-6.475653870471997e162,7.138176707765e-13,44928.28740358697,3.0612899958536637e-195,2.9065397136371783e89,-3.1606257832686844e89,-3.3399603246151354e-49,-3.118950009024852e162,-1.317303325770627e-223,1.9057889272948848e-114,1.0904595406137422e12,7.51101750283316e213,2.5647974194219864e-100,2.828199903552041e13,1.556086301429475e226,2.3459476713781197e-99,-9.133884560583179e23,2.760636999442549e250,2.1124522404058013e-13,5.692509866361527e127,7.530042567815007e131,1.00218818520306e63,1.3237028143917558e56,-2.0275193412269944e117,1.8878904889837622e-25,2.5096419567529622e-142,1.3179072661314675e117,-2.7644979036586747e-146,-8.81714326632486e-68,6.256229967442987e227,5.7941737992962485e187,4.5459629303904315e-120,1.2732214212560083e-42,2.6848599221924007e-82,-1.2165980685384282e105,5.016959110337543e-89,6.800046147448924e57,6.929326932412742e176,1.6521938520417537e24,6.664196961852199e74,1.4018426852236303e37,6.18549545709999e-90,-4.277442451835935e-193,5.1022813502333984e-130,1.1942330217080824e-91,3.37866246290069e176,-2.4471137315243563e-202,-7.864015660554e62,-5.576496034755292e-249,4.987000454489279e-87,1.196549244189081e142,-1.0414959354596372e-125,-3.0688468072019974e185,4.6679593562496086e36,1.1905844820042118e-84,4.734233621986071e71,-2.9119745243682275e28,2.5592469348355883e29,2.6708803891780194e205,2.2035007228361127e106,2.279433019938313e-22,6.134417045460693e52,13.622082696617664,4.487054436702301e-6,-4.52511641147707e-58,-2.0197009224460506e-103,7.743713708693019e71,-1.5133910869335349e-199,2.6206319408992182e-232,3.876978423589545e-134,-1.4985754504915904e130,1.4795248488858375e-190,9.94580372680898e113,1.946601304850284e-92,2.289787103398844e163,4.3401572975782525e112,-1.0120561963897429e6,-3.039166942909731e18,-3.6122704128907375e-231,3.1778330905633937e6,-1.347826714487064e147],"x":[-353.16959430433917,243.93038767026098,-228.12380115215558,-402.36022339749366,302.6211811210102,458.61313737692115,-158.93591616969348,412.6859516320045,-139.52942992251735,254.12112379628843,341.032156357693,-96.69613101796415,250.78795250737596,-414.777902379746,11.240347065970752,232.24539006478722,-176.99424598088973,-149.78235876361623,-207.97926245087183,-119.65656146585911,-295.8421799809414,248.08405345038545,-7.932878109305761,-2.147836078298269,61.410514749694585,-97.73542656201448,143.35587249194305,-471.928845925071,415.1969201995797,283.7341952117682,319.4513441634201,-0.8727444349258917,-419.25971239101443,-470.76444473675963,-71.10167966863145,411.01336365885334,-403.7841472418664,51.86519897056314,148.038940826332,477.3737275612864,479.01137962481494,-420.49136999955624,-489.40255461818793,-411.8303418392708,337.01774010826966,216.62743671961528,-462.8156721964294,-108.53191505243063,442.4205144877202,-386.16010865175497,162.2146135760412,100.0325598332006,-405.7236570432974,49.01276557322683,-56.792460901508264,-353.690083037435,64.48584826402998,276.8863080636661,277.74364414778324,117.09639567238867,35.942180319370664,232.30554327655523,23.59350182910407,-322.8515729692085,375.01081061162495,459.15051514561503,365.1267037781729,-394.94377273202394,416.6151632437485,-397.5594491311132,314.97024795604636,421.5120077276256,-0.5762674461180382,-344.6357422831354,175.8607045299285,-239.81731704487743,-82.17239145740552,-114.83865893023307,13.961275361021876,-238.94019115674524,68.5289905636215,-206.06069685485062,147.1996485248062,-401.91562076277233,414.86825632049283,257.1359331139929,23.54527999666493,171.80713885363912,499.1693708065578,392.8377312262421,487.26665602153594,-236.53433126164413,355.1089663419831,-244.96940590940653,-319.9860376832089,189.24348221605953,-220.64307679639893,182.54478816584424,-266.60424476450163,-413.7848333820093,-210.20888013199635,-124.2528487135728,445.4529924525639,323.9115350486836,-434.266587215423,104.69454357296115,49.30192592131971,-36.47210165445489,-383.0503506718872,-238.87439853257365,-310.9270033843283,340.0665481922309,-364.62467637015413,-461.5012260956306,336.2666532236101,357.47248215290074,-13.621065328292673,263.34001647929915,95.70013862064047,276.0359064607096,35.00306962809316,-90.72394273956388,-269.5087705444083,-481.6153202152529,-256.9318455576748,-299.89224789118316,-254.51647441989644,-50.076641952475654,-98.73974315319822,100.37080709891359,-365.3640785810412,432.3806285296689,211.78946779056832,153.93889259515618,39.17706633090586,-213.00845729282855,-428.4152234148655,-451.7283784389039,-55.22509759612501,-353.1761361885692,203.19186440515557,-262.07427555606637,-261.58841129203745,280.5992847042264,348.23457892346994,-114.36639638604129,74.14002968894181,204.58538409968185,168.63110248114685,-239.07015105635423,-366.9580080532171,-442.7917197181963,-298.8524885071664,346.3307841234275,-268.6329097149074,285.4281523585263,-341.6621340603687,-236.13287941424545,158.81384336787698,69.02581346999796,-99.3498884722199,-301.6484336304701,-240.80835950820955,-434.4738913027564,-421.5352076897816,-118.95664671242832,-58.489467980751954,-62.65234929545113,28.69053009136269,-205.2289010059498,-444.957446546743,-365.2962009810012,161.9079823496976,-480.999021444684,-102.5193992491067,-47.4954540541317,427.24578786109873,295.33655236341133,411.6635303870248,-268.59401441468276,160.43010792030032,0.8907061527203268,-375.5575890853331,-133.29312336685348,-160.6243203333284,156.7740032195078,-460.6957811317163,357.97792481099316,198.47955567504005,-372.31291441394234,405.6462940453898,194.26593118592052,450.5205931457232,74.00382506000392,-201.76232308252293,346.66375104671874,-352.146074128572,-162.0004139770033,-358.7709480203607,-15.633084139756306,-277.2393003394149,402.2710391153639,498.92943568326564,278.83535881736157,-425.75089168807455,-238.81352157669954,-337.2248382652667,-70.387593102506,-193.37056929110673,77.36917524175021,70.62307000225701,308.00300411779585,-60.71723492306205,-488.9957174084838,-82.27124149889266,431.3025260353944,264.1782816918161,491.0995497661263,-317.7857985604333,-332.1859244868077,252.70561297033225,295.76270965845447,496.68301539679965,368.9821715866717,346.82008704004886,368.3959659182548,85.22108855872636,-313.03645891694964,-104.8949840828808,177.4620070096853,370.73093434639225,367.43493192450023,-421.9159791481808,319.31310945081543,-109.1083695692052,-315.01765808427785,274.4564274889898,-3.102870043891528,-159.98605531531496,212.5617347366715,489.7874385966261,-345.1783692341959,-207.10178726291463,-128.0599568033116,-191.5231840672509,-300.5725609209178,-314.7370800676299,210.90904734348385,-386.92647059932403,-392.8414364933941,-473.2625743902721,-137.91886848657418,268.5357380745081,-418.5461328795918,-297.33178578658647,-280.54973738895114,-98.02103539294984,-35.89537300302402,-243.47226924727414,329.81247560723443,130.54364439371022,363.8594645766897,-164.7938997352614,70.40782324194981,381.1243867769723,-145.5362619072875,-18.530774866454465,-365.37725018206356,21.536124162829083,167.62790580306057,-446.83964439476375,-176.11708232251954,-95.77991447675902,-456.5219544393448,212.96860210192835,116.19616667390198,-321.5563001044164,349.83544557756056,440.92170607265086,103.11493460657698,-328.0958227622706,446.5623002750833,-119.75913985441377,-354.2236348736874,-182.7637504163804,-78.40534588856116,257.4999447539857,-121.150655041385,-245.52254483273293,87.19305646187854,203.70705420256047,56.74258144169414,273.8717575630312,-40.352571866142625,244.98263926603988,317.912527558468,200.0441068112857,47.554000601630605,352.92003134435674,293.87242924024815,-253.1334763119899,-352.7322690817534,335.6854104164481,-74.80636815452192,143.93663814826846,421.9684995924846,-318.4607271441753,8.475986909441986,39.19290855418262,98.71968695617886,278.3921257433526,447.86225990927915,-441.63698355128076,263.55373739707863,91.4888188557286,207.5755310633873,-472.23835399597135,191.31821005854556,-259.36422244673076,-467.1074130519084,440.6992837281898,94.1490552371049,-449.6141436132599,120.14379211612743,324.64835647729706,-264.2239344240751,-157.62209482356383,355.383629573746,177.0005430221471,-276.31828145182834,17.821538747240197,388.5437499802848,-216.80210328677617,336.51852481411674,163.4913617863591,-68.26214118070783,80.13325201811415,165.28138814112742,138.793951712546,-156.1140648436281,464.5897094422113,-493.42561808461727,-207.8010528593761,268.94456984602994,-486.16862340479526,14.47694161048014,136.14082225386096,180.31402242679144,-311.0252180642146,208.02271490019302,-339.8661373085401,338.3156043846176,-399.1231307699774,-482.89652801931203,484.9549904687576,253.42935832025933,-402.0762281212997,26.557283468748437,-107.43059540305188,-81.49624889277266,-4.722888580273718,-394.49803567064134,111.26815636586423,353.03487644567235,250.53503444769706,-11.058225668373325,-460.62553433971567,-316.5625587795329,-253.35086909714266,429.435002109106,313.4871958072148,-25.84163946759179,192.3796990214148,132.07348646275682,301.6422150042413,-256.60289097083535,-155.93658554974945,344.1334861620953,-36.620436655715025,-416.05392700458333,399.04537105524685,-341.4894840525753,62.29444619355593,-274.7810450496815,457.85543080111006,379.548743193614,-358.9142450318592,96.07556981590255,-386.3138926606311,-432.0362962575186,479.1106850711924,-72.88722225905997,-103.34297191689922,222.03748094663638,-490.31037881438874,202.47515642247026,338.9075320284087,-28.214894820134646,424.3988155635998,-108.78131732945184,-100.18889193908319,270.29277965732,-68.08073334902053,-299.14232941318653,-424.49489174168065,89.38572723900154,215.05339831426818,370.61232820573787,-489.54767456070437,442.1448687474916,114.19542480011842,234.9568943673661,-453.34738538677976,379.9161389982852,-415.0134425858314,185.9450193667027,44.17429987699893,305.89097430347806,-3.00185946479138,-106.92375518267318,-407.42128077779927,200.0658196390816,-167.18303430438561,311.32904600378254,-323.6232000749591,-362.27991340063807,-375.2108189598218,154.07825067209194,-22.91014393206291,-316.3324282742934,281.66449347408377,194.6466096312331,-68.97321882860075,474.46605314501994,-223.77286721726807,192.37651302269308,-85.87483504882323,401.26349666318185,445.90084130744594,-487.14463516540786,-475.421652560178,387.89758987973437,-487.16727136463265,325.80344172879563,119.28535249897982,-300.23678324410463,455.4522317953133,250.8850693757572,338.4494427862244,2.6534122869414887,-241.86235542973787,55.01312969909122,-89.89594070075736,-430.3929537845077,74.54238647910279,-63.72108424155812,-423.4614487932198,-262.0676785885914,-118.28779557182713,-186.7662441257765,-442.74596466103344,363.0409257810883,-191.39680941805227,285.5047645489941,-392.80831948595795,371.41499926358733,-99.16048782801477,-481.0139884646987,-238.66168950035973,-341.1383331931843,-345.0697084710941,-184.42180395580385,-350.5308311202029,106.99188354859814,-222.81639645577542,-92.86397921309674,-78.95859055030695,-154.05639104053728,-241.16916492490702,-478.5460629916667,484.8590398310613,185.17296317656155,451.02580651985204,-71.96675119658448,267.0750473857099,478.0829342704716,-330.4223098140766,406.487197371203,-223.00554157818175,-180.1015295011179,206.73324840184603,249.21932866003124,283.3611605058137,399.76675049323535,11.405632630602895,-167.76438638109136,392.76799073171946,90.11566913529646,-171.98888503877276,322.4002391010159,-413.24240137234017,-111.89974711961656,-295.7465147765756,-365.37015165355433,417.5031435659133,-167.80383461551395,-13.30443073393252,484.6701848039594,-447.3079738533128,211.20097897329276,182.99664547660495,50.37947696056233,126.95859140356731,263.52208216631914,242.1350910277405,-467.96528299359653,-189.26682428238405,492.96503178305454,-196.11284765818817,21.562203625887605,-12.674247238574367,-355.29293137589946,316.10717830274143,185.38543366976933,446.9023379268631,146.1887258739556,-253.91245337567403,109.71420057967543,419.8527332191977,-242.91369762058434,154.06594948608654,277.90369273034105,-330.6603429960253,-152.00292931261748,-358.7771087904124,379.49954383227146,41.858915594822406,-152.37160372327338,42.1026608515391,-336.4410835953977,426.5128650455721,-345.62232790942704,289.506240633997,-130.26784414309753,135.33155807022786,-383.35067093611656,468.0742091665502,255.30116936726643,491.4786583451279,416.0756326536439,411.2882376328855,83.11372233642533,-17.240724537465496,51.22073369828445,390.33953377420664,-13.12253284819252,282.89499061071876,-372.57052985121163,-360.9764026745881,-467.40787155297835,484.8609748583832,311.76173492573264,-401.3978380146437,-399.5970972695859,-115.32564688193168,104.34395222807575,-315.6334247678856,-479.00886619328963,43.85930652895718,-359.3887756898153,2.1288683353370743,306.8468038600041,-55.332542892527954,-159.52327049792393,-396.361078603604,-156.6437606169626,17.49014952179448,-46.89990687623168,465.4585305047518,-239.49697791858847,105.1153900006467,102.16094556147073,-380.17714800800496,318.88059510110577,-404.27397631836004,346.576430252328,53.60848511142274,175.6725582581846,-187.7874000577653,-194.70704043146748,-484.4108100575644,-232.5972042691444,-151.04326859975157,447.10982498285864,-143.6237676716483,413.52458934124024,-187.0112021138326,28.785116971011576,498.2873272314099,229.26763218741826,-473.5927350225615,310.90303233142674,272.83344080418306,430.75371316938526,-387.1579748210625,187.5967623878472,-308.3775064068293,-147.52820046397306,144.16081962309522,346.2462220042038,90.31008243150734,-309.0845250165022,315.04354430342823,362.00072193188794,10.15584366430653,-474.2318372561809,54.726414162020774,-434.754769892868,74.94024499551767,-192.91868863436787,329.00658299031636,375.1970484926883,60.677524188302186,-279.1442807458167,223.17722124204022,-319.8653229363917,-277.14289962483065,-156.9121806928331,-204.62264396848508,-481.53504810350125,-58.903599789003295,-79.14814127679915,-376.795282966097,65.51063590269803,-91.1405462951256,-328.7780791267212,-60.01837319320799,405.58026335014415,157.32228475718227,407.24278462252767,412.38913549323274,373.7201812311215,-18.19538388165398,-308.2335408446608,-284.9811712109123,338.5821732961789,-62.284549490896325,-125.95515336923404,-98.76124001301713,-142.05366191766535,324.97503020849683,-8.787928087446573,-176.86621085924537,81.21836116469922,20.81654909850704,-439.5389054273984,122.6758448571652,158.02483943601203,-226.63723171218254,105.0086338539304,-226.72632999398854,-250.4451570827624,424.6192706858451,36.31384186339187,-68.8800998056982,-436.37322021760184,184.31625166620984,-299.28603762795933,469.2880237588905,-280.4796260262792,459.3716565968491,-92.36356156303492,-387.3898746524227,-82.34232526864992,-421.6237654558113,443.8757563545947,398.01459508303674,38.045168634313995,-260.22298798342706,-417.645292640328,463.1899189009591,43.56555731420349,468.58012208068885,158.72936876267602,56.67076327080326,374.2151265633122,131.84093660799556,-107.3131172856103,-195.08915016781293,367.2760105448871,133.9226716036635,-290.00462579771045,-442.58274911825345,59.456564166391786,-41.515605716442735,271.31086807193867,115.06635968574994,-61.94038600520571,277.30813648254764,402.55115466370955,360.42164787644833,-437.7970909058777,-423.0219574144438,-130.04415038733595,400.8385827271901,8.824826870855702,-169.4086287405421,-263.13954383173325,-411.75607077199606,-328.5423004761192,349.16923841427194,107.33500597867169,143.98754155745053,-206.3829216310549,-396.8401187572548,-61.29387341785588,210.5417833275161,-169.87614078576007,483.8766369702099,158.80709768329007,-120.30879343279469,345.93938656001956,476.9156503722651,328.96662581658575,-390.8178078119331,364.27722186246683,-192.11727019884626,-409.84956873459754,27.387193520886967,-280.60971038065,407.47842310649185,62.72366535459969,452.7119541215699,47.45175454688558,181.26919396833557,289.92486924999514,366.8768238000341,126.20464636883469,479.21792265928786,284.2137309630151,342.27339617988605,44.385518972722025,261.67757989167933,378.74890080243165,-124.43437438118445,-391.3108483994252,441.81071295744846,-475.24776536520807,13.512495845296144,439.838998053208,-401.42268272661715,145.34860120817882,-477.27326438293426,312.2926176993808,187.49958570448234,-357.920277554157,109.43930633256377,481.8020171696169,-249.3164672510333,267.15727504694996,314.66242072353714,245.15247315952251,248.17801444058364,-462.15472501476216,-490.9242777704956,46.227508951824234,147.5244561120412,417.7520352664403,367.1988922808929,20.819788669879586,-388.1265767744275,331.445026697627,194.7187041469531,305.06722247457276,-38.70918809598243,116.12459561365233,376.78423493327466,-109.48035548412685,47.3226355100353,246.06100341731474,164.05518796862964,-419.25163145082655,-444.571271106472,-164.6177479677118,-483.68043042423056,-50.40150454021489,454.49314151340286,215.23674662222334,-349.4517424112764,-5.328675247135095,381.71674023104845,-314.90747806978027,-234.54406601421863,-375.4045530877508,-204.47959516409406,-30.25114585719257,-145.81693610807412,139.8235719219017,420.1366544721874,358.9943211497457,161.1180962791408,-298.5922991469614,-9.79908973062237,86.74366145899091,262.84690083566534,352.2936505718459,13.04644979989564,-385.6975153252986,-120.20441520186733,-293.31459345030675,113.61752220388018,-474.95132488448655,234.4624235909463,107.18969681627243,68.71679798496746,-461.26534375878373,-318.12532832542774,-219.78944342531116,440.547346940279,-442.290718292468,-293.20387570993466,9.045591944000478,-58.3787681722294,413.4802815495318,276.3340188325117,99.68314978998455,129.71333855368266,107.46563846822573,441.4233647327179,-190.14556663386895,-351.66040219194076,-362.2494066601389,411.61333427087516,38.39804071474839,354.36146911266155,0.39901869081603536,-254.04530322190254,492.01042660699886,64.68025702397267,185.7524263529682,323.10359574121867,23.538640792801743,267.59481936158113,-299.98954746272386,224.15177470920503,-180.21071733535933,333.95508597541925,167.58385518382295,490.51344005050066,340.10820077843994,463.95355939966464,146.01942538604408,-479.5911111090023,405.1261697566737,-107.87685662911792,207.98060150559627,-184.8772856945007,-282.8312140380908,-22.989249629734786,187.89640433788418,350.8442943714665,199.43463241702113,411.879345080691,-323.6402914829772,-426.23436132356795,-221.33715455814308,60.741914551367245,-57.189105785741674,-138.19788110454743,-300.4150424499479,-337.1948431243579,96.51086455476604,163.2841704177299,-56.548254874321,112.99363838962392,-460.6715481852239,-169.2813733857903,-316.02611830479543,-423.1518388930489,-3.376580147422146,77.94881887465795,-392.64563027618317,-404.98096405700613,352.28821499885225,-455.4759518451139,-249.61258546521492,44.74650533510146,267.99654598956386,80.7401935593814,-422.02069760235975,214.3894228227117,87.0555122048928,-292.70838959634204,-319.27301931862087,-357.0675029912582,267.36292077426515,454.24232357687936,9.030532536775638,233.10759344655412,305.45482182182377,204.63910722342484,-208.95901310298348,143.2966485534397,-75.00838139720469,-301.79183202469835,-277.6857778835604,97.44317211026669,0.6827473515484712,-98.3701693997989,-215.6129158245572,488.1446538712337,430.5992168869461,379.79686604865833,-268.07863432285495,-341.3430761489344,-491.44666656539624,-457.7550508743669,-249.79081053475682,128.65286720043457,-54.14227416748241,288.0776739721016,-115.49761740828558,-394.9576314143357,-378.310716351526,-338.0061384306057,-481.4897403782199,53.91641426590593,187.58987883700786,-450.7183234031464,418.6383582733024,-457.4355885698742,36.14870371592451,-112.04099154434857,166.15541122969944,-131.0811349607348,236.33898213892326,356.3523315800179,155.2623926808892,-132.7826850899998,352.8468751801413,-241.9753878825179,-146.13341772997666,-391.5039871271413,473.49600040179007,-86.15598345311139,-249.76443538726323,214.79170679536196,319.36600883667325,49.43346614471977,136.72264730546988,144.16349750921984,254.49964601308818,-379.0089032018467,-204.28047830586604,-145.26631556186788,-475.21391764703156,234.96866685666112,51.52685429178257,188.05656746345403,-490.5697527865305,457.90892880688557,-396.37838036739237,-318.66695109856335,69.62986793038613,-250.4113073059806,316.34559664540495,174.82968766708495,-108.96316036112717,-17.631321941391946,117.94009982158559,-5.330350767344555,-173.31434391336376,-372.97373093662634,-335.46234365949545,-84.32137223776562,98.45274596111062,-64.65173995659666,-22.568191465304665,-83.00485825927797,-342.9039933188187,-400.21517047863296,132.08884083023497,-252.12178950592846,-408.54091405165934,260.4099179632698,-450.21685380524843,215.4996288189035,-316.97674809132303,80.5655172958426,77.14683272230525,348.9788056965506,410.53342767020797,-8.713286883519572,-172.17613143931618,-251.92663129341386,484.5149539600926,-34.46886898681822,-182.19232285060218,-165.1480096909852,-472.4142008605159,249.3422354072785,243.43956662824655,158.8268503756252,369.52648564836704,-176.38280238606342,-5.6511467863196,-230.54417776958934,-448.9392847641376,270.34883623981943,136.34737468377398,-424.58013872161837,-142.711677547825,486.86952243798555,328.0396713822904,212.29084750936295,296.93769633603245,-137.53647249640125,-243.900280358204,139.5402033947903,233.9771202814776,-60.70569519237591,439.6589195849217,-373.358584367643,237.6519237935928,-424.81304800146114,-317.21474259013064,417.04628897997907,451.5427487127972,473.4237156045664,-403.4298471243818,-208.23532059129968,347.1434753215159,-488.94020853898223,-241.6745158552178,-363.9480548488518,148.6045035846704,499.53482222698733,453.8982593721788,331.4299219513888,28.423473439697545,-270.1441009354903,-350.1908498474611,-345.27424507306705,-179.54212559473802,331.42525574074955,196.10007257879647,-485.280379494732,148.27473724468462,-349.28691897811007,-209.67668307036826,67.29001254528816,5.629130257231566,-367.5363134575251,431.7050880790689,487.9951375973684,-399.813564228946,296.2799354907162,419.41075948158766,-353.49622197338397,-106.86576135899872,123.89207665960146,-101.8569332808521,479.18592231080197,-194.68260775421322,227.9391158264117,384.4402957631587,-322.8639203962187,391.3969998896125,296.88491897333074,-204.0666665948545,-424.2019025865673,-311.7750035875346,158.29175376529633,145.88660805969903,7.644723037817812,369.7368595254919,426.5255459790218,-438.86393339909046,470.37222650770684,-10.381215320578008,-85.86156585434378,-258.0192516737145,175.77884563806072,441.20397585663443,-25.06380475090998,295.1977051456221,-270.7182400830146,143.2168745214866,424.4355080068858,190.21502308547394,295.6128316341602,411.8333650752388,184.649069973756,-429.3788834940473,-143.76844060760584,364.88076007012467,332.22687576359465,442.7467393807518,182.65381735188896,-114.50090056322915,126.15872089308698,475.18208306203485,58.62859162961456,-272.8228748138151,-267.3771606635831,-140.49214022564757,489.5886959729992,-120.03736393399089,-9.386132425450285,-496.5055676999091,259.4373723163827,-11.459968441010403,64.59578587029102,305.15763810800877,113.85078276134107,-50.35241649994225,169.85549291055622,210.96643947266864,-203.41266349053535,229.0393171690406,229.62073674020098,-297.6475762232707,453.5958671033302,479.63328098089676,261.87439510274805,-54.115563612155086,-92.6437092267198,78.74023184662815,190.13141175231135,279.8027114771244,294.7784440438286,109.77297487730891,-77.47996305237149,56.02412428561229,491.54224970049404,-331.55804731225726,-127.10620609738953,-254.0143321320032,362.4136857784108,181.1174360264356,445.00529244928816,-176.80371619301025,-462.8343318283146,-299.0850750868641,333.71731401690295,-59.99317209130339,-220.96687017820727,41.94453148713808,370.65117707436275,-193.03927983396687,420.17538319830794,250.07303267330155,340.8147188818713,-195.97244863484553,-12.503118720895941,-23.510608008160204,-25.959628146525063,137.79806787085545,-453.54704904659536,-303.1021760381265,206.26695545516486,-50.79285715097171,187.95376183580515,346.554482659305,223.01122153669212,-456.4471266582058,297.0261953628119,112.57782921043804,-87.66289233613264,-248.65726308241508,246.54049727480935,282.3963028834311,-497.9184622333028,-24.177888875371423,8.650597131677728,273.8566918353913,-385.59381133164175,417.0052538742615,71.40521813246164,169.7694179706382,174.3183862184669,178.02462304738435,-290.2101976591596,377.60906361277557,29.86277408799799,156.40502549766722,-445.0096295166497,-371.15503140182125,-451.218303770532,427.849724645434,390.1520581268727,-208.63225389698403,-2.4617950752174806,281.21395841548315,-467.1364702862297,-206.19741078642704,483.46492027444765,218.9263111303195,-264.7496006725587,-50.5898625660073,-262.2588737343099,-127.88655464613583,-92.3573652971719,224.85221065212932,-462.8362586938921,-324.86949586026515,227.27805279817835,279.955543308384,212.05297790959082,18.123946984697,332.7959600469916,206.9534583921211,-477.27062170101544,-281.955034674785,-196.5473989106157,-360.1754198810756,-290.4778459931723,-434.90063041413185,-347.49742263258975,326.18566804667876,-140.68078533887075,107.676286511939,-405.67479527247906,-294.33533740650586,-15.988325284657549,-383.07437863775726,-204.9140649902326,-346.4664935525641,394.1140188046961,-277.66116180563506,-69.27464145297392,-482.18439768023734,36.72866271286739,-382.82545954249446,451.14992967551063,-269.4586737726072,426.27074173578114,279.9333715437258,134.4274036569808,402.99947214915585,78.06953847174975,-458.65653308830656,-115.87468628667705,356.3695667474516,178.2529818447398,65.4001108108173,490.02884397667265,-186.92416069602882,271.71726418784067,-250.5121705027913,-408.4714518568291,-195.23449300719295,-337.5088073737504,-35.80997208472468,302.66775651408227,315.4434688456014,-328.3770504697501,-12.407655084945475,-81.69935224116796,-131.83451104697383,219.33630555599052,335.7151964873168,-478.78803293591176,468.1895503476899,357.17371071041873,-276.256925543092,130.23902074841362,-41.59924200564899,-469.41272435273953,156.4570569619683,69.12849550272938,-361.4767617210988,-113.48492864169367,-5.570812338480778,376.5361082430618,-376.288026942315,-205.77729603658423,431.73169749647684,308.64937308210403,425.0781342031347,-433.2340158764898,-235.60713613248942,99.73709345507916,-170.53149191533532,-29.16605815067453,114.6639635332798,407.88615237723945,-191.39533672153107,152.765057301576,238.97140898179578,-244.03577269547694,393.5417110208723,-9.10901336207479,-489.0009174000478,121.37221124812413,-320.66815631279223,-203.2472179945475,-270.5651257023196,405.9126998359827,99.43943276447192,-348.2145024372767,448.76437587799603,-435.5595437977855,310.1501459585186,378.82087324588315,172.41292431376087,373.6923573333763,16.395029102129797,259.15259289637095,453.51534198822026,-251.1061040667373,-138.726119664603,56.07408526316158,-273.40126046097345,292.1069962147718,-187.53913410855705,169.907308079799,-376.66274217674544,-234.52904182027987,-439.6051167608199,341.58387387369476,-242.3059179779097,-59.763944646347795,346.8012254141046,-184.86448870572872,-332.3179857417504,444.45320379252814,46.03484586574268,-78.77537021650016,-290.2422598442347,248.60709967361674,394.189958031415,480.4130902601869,-420.8485975775553,-422.3140823445168,78.4176948669517,-416.66126500749147,100.32258044326568,204.2099736505054,198.76129755157604,10.9386327384766,-476.29823944755054,-155.25384265039554,-73.38559366804054,-328.9734393519965,-390.0485792741957,166.17483022034583,364.7816990425446,86.82679251574223,-244.6892479576066,312.1206318579342,-283.73567402725564,13.258487445724427,-428.5346564787835,63.3697092058718,490.6592439514135,-285.26680613962617,419.2415319035241,308.3732750225603,-290.9983083527354,-401.67977320883017,351.0029788750346,-42.545094238488616,-461.41974497980897,188.21172841484452,154.7732922852232,178.32776943411432,-256.05426307292964,488.44102201000214,24.33252525642456,227.4833566658723,448.81574503666616,456.6087079065875,-234.75126999727735,-151.09855723825126,-179.00166325447975,-424.94611813807893,-105.9648743815307,-197.3789871043312,83.72485895653608,-261.93247826119824,270.7742571201219,-48.780984742717635,99.51378390415641,105.91051763847986,-64.38237163168202,-480.5155812578776,-174.61832360366492,468.9946091755304,-125.32499500371762,306.83541103890605,-351.82420170608265,-442.89437565647137,-285.6679406957228,32.790264822726726,-172.93185904236339,-430.7205923969548,-184.74359715843434,-377.7539153290344,-190.04418001203425,82.76345127966579,-240.90188311298277,-247.6570454858833,-256.4166473493261,-259.25919132439446,428.37223595893215,339.3354950358088,-180.51699273787267,204.48193506380096,265.47385230982366,372.7930135821664,190.60246906646182,-260.928033683562,213.508115172437,486.19010162543464,-110.39894837671005,-109.67919910890436,-482.0182752726854,139.67502986679904,146.46647350336343,376.9273450195785,24.71588798698349,-394.6247502473792,-90.10202941639835,-470.0273191919446,34.0604633681769,252.08728921534566,-468.5722519841251,-314.75650342486165,-397.80228654923496,203.10331196193522,-293.9778413473098,386.46088800241625,-160.99982232457256,-476.73001259885274,-446.2068354171953,238.79003306346488,17.385694361317746,290.02779520044623,64.21172220872086,-50.64044366976873,180.4535744377058,-230.47053791305075,406.42128307036774,223.10851136237181,395.42205093445966,345.4009419832007,357.03143715223166,489.91339718417476,340.1401024414255,-387.42099364497307,-492.44096555480144,-149.87222983841406,29.0823547003705,-280.82479438288146,-417.42756656430527,-133.13185939085724,-241.78900207139884,341.49970739240393,421.279968870433,333.8789555830808,160.00718390021223,-1.7752263848511802,437.45738002334235,189.42147603003082,-199.18985536159875,421.3160123762825,-240.07085026750133,-48.885105130932004,-209.41038713680962,-119.00601228322216,-368.87384478405806,257.6336787708668,-429.8049085840123,154.86861514477448,435.01227916433163,419.73816451712855,-473.8966496737207,-233.52075387340386,-172.0262229043796,-492.653517473439,439.52151555427906,-127.74035106969126,461.83147758842154,-482.54176162106387,-359.3082916501753,464.79559875940345,-282.03620644262827,95.57687467409596,110.15941394631375,393.24486775857804,-5.314828344258785,-233.59710952175726,-381.0265874544878,274.56027461005726,-487.27990738219205,285.0817137798349,156.25086925239225,212.26418790400908,-156.19673499340303,-65.45106041203132,-98.80757336335978,-34.391374484004984,-155.09417470857943,361.0441145349313,-342.39381848704875,-307.3745042352558,-317.64347155731707,-116.82313209635532,398.8646944238951,59.38522287020237,121.32806599254047,331.7791918759201,323.74376800164146,284.60183076026647,-246.49940176901052,-271.1000587516337,383.41688802249064,464.0106762777576,-8.280834755902049,-325.620084794872,-105.85250510690992,-29.838250098819913,-94.32237596505331,-288.46297885975616,176.77737102265326,-17.400461153513675,-372.70113568140187,223.9975228082509,44.74343737007678,-86.68235142328393,238.77508343160287,44.29786682747135,-104.42442644742101,259.62151551428576,-431.16568803140274,389.8706307547071,128.33234688415018,267.7194836500147,470.1669081675443,288.55306502616804,488.9457682201539,232.80225153583683,360.11521033119993,-223.5979395888885,77.82298679308838,-359.45577603151,417.2169666372847,-209.81057751531648,-439.0882865651296,-407.07812959364543,22.53317969829243,180.6528055122967,423.24591764458285,-463.3254128084081,-160.79777676876472,224.84836895247895,275.29561414400575,131.71488400728038,-326.0432686846051,344.43170186604584,-31.352347433558407,-174.44889752649505,34.621260663617136,257.24789202805937,261.07237866762637,496.30933434754866,-125.68626027212292,-183.86500233968593,69.29103455225197,201.4809407406384,252.8304369707472,-262.430332406097,405.961575189471,439.3411212477563,364.5566368145678,321.42579874386604,484.9262985852698,176.32144280801867,-317.2826465018577,-71.98840696011331,428.32988283600514,383.03102878419224,-249.2090698462841,-476.56855429527513,-156.52662382346415,-16.250234725695407,-229.05959657506327,413.2837859118448,-391.1186586929485,330.0760993001286,2.2355107175708895,180.13838704555508,182.3385558192008,-82.63667941642416,350.38785530192547,-466.08226000828813,-59.139701099430795,-265.001590744391,-255.71309739089676,-493.10775182303445,445.7129153815762,-334.0883508366999,275.4204894367293,261.30043214556895,-14.025495715725981,-206.30444532389004,50.9091798200609,-297.0014346697818,-215.1715505834324,470.220043631449,-176.15540143104977,231.42898238734654,-205.33681769955336,-87.79363021666933,112.78366298323795,-408.856741217946,3.7603559230477117,-432.6221697723411,49.93783769543802,245.76176137058576,-347.5416881089335,208.19477226473055,155.8651932802528,30.700072891815694,162.2710946186652,-242.9297639546537,-353.90887346415514,-34.22953983612763,48.96527798782961,-336.5232546628465,-242.40634814523787,-229.08748457378556,-367.797564996597,388.68044090254796,-65.67415933570709,-223.6055964066892,-154.98561285150367,449.840272045068,-34.560106837506964,166.54265893392073,-241.7290787683608,394.887633004392,393.35751505411224,-68.28519712072989,301.38158850580464,108.46992763888034,-62.41233307435556,2.7454096335173404,-295.1832250523727,-431.1851763460253,-407.0177961121351,223.19954256311905,-393.96213611302676,-65.4624574575464,255.39715973372813,370.9975011560849,-125.17579540953272,-174.6967894107263,-230.04226945109394,-84.78179094818961,206.56070765442848,67.77892693957517,-315.6797135522684,-72.22663307673429,-386.91747412596,99.96703494878841,-384.37043281816386,339.05826608201403,446.29024705819734,378.0493622510264,-417.80793662172067,312.9099325803064,-330.2431497949505,-23.614845117505354,392.8512094482928,145.6510699926497,384.6799209942551,-406.61387492048016,372.56558746972576,343.8326134567053,-284.1376612689861,-218.44721078925164,127.72404684781156,88.81763258527212,332.50080300941715,24.27918691958837,320.79508064769664,481.1767043642752,5.075714989872154,95.77896232090484,413.71120558600614,257.6955020640959,221.70513446211612,161.43917076458263,84.39680592052139,437.18989483305995,-393.78681110084,-370.6564315559044,50.91857736348686,-225.5398095795074,313.46916627263454,133.43201090174057,239.52312260758538,-311.36050416288333,332.6665717896831,-69.32681567692111,487.2714640953051,74.58342106627151,109.80611004133925,274.44142189557067,20.969400577463603,144.0608056140145,470.98010247595676,-194.4557118929955,-73.10484261528273,38.014532905507735,116.24174532763561,-432.9282710444551,-31.94875110267236,384.63978224653215,-361.0699958692443,-29.35412439334084,-227.82270613156362,-69.74964301884268,0.22050987891987006,141.862584462884,-229.29238458647802,84.43703533529674,-107.2690544575434,197.12755384265984,176.30239710761077,-303.07273386055704,106.88932640215398,285.219971637251,374.7431618879358,427.99131258299064,-44.110940574600306,-381.9839641780534,175.28889755779903,21.533961389338174,300.5315037257343,190.77274820810123,193.06791233327374,-310.8661921270297,13.619210945485293,-75.85617705151202,-74.48198264975292,80.66854122614632,-475.627931716686,-476.44909796838084,451.9680417158846,464.94366386327806,487.3300995847802,-268.7253002539727,-255.33832611105288,256.57918122843375,414.0718010182096,-423.15826416120194,2.89999942984241,-182.01053797495723,294.40924541961385,252.146177413229,350.84266218044434,480.47590345391234,178.8084539566703,-349.87967331406566,-491.7037285846499,213.00434723936542,-238.03802988971955,281.73623583417464,136.29829555225353,111.61756477637311,402.3776483253638,239.24932280748476,-452.9829744584457,-358.324594699772,-318.5417410408322,495.5243566901497,-306.0265923480785,-498.424907162943,-203.25628917389184,-390.81296421436497,191.11750890774522,283.9359716857184,454.78501690988367,-378.09319661037887,71.36456696593018,-29.05466310345804,-35.06412487353748,-217.91230722512677,10.295754682772213,-414.50357703927597,-393.55888642658266,-114.92780987261762,-395.3201542368172,-279.8335305400867,-390.94920265400845,-214.24617770906917,394.4206749589332,269.5451034494894,-408.9385437427742,191.62658071747217,-331.293420785741,490.51822372277434,-486.7054473321528,353.2872099552628,-164.7845120967366,-442.5279419839019,204.65904149736264,138.37865146211743,-122.05771423481735,-47.25663980953931,-172.17177378642276,-388.86428912047035,-237.60232092767075,-219.88287807558925,237.31790969573365,-27.179081965789578,382.23795013570566,-118.14225337538397,124.63301210617158,-295.50121649617233,389.1149064406774,-21.559079793319142,-184.79694230821497,-251.65679136186992,-304.02211066873974,14.214994054790395,151.26248236827382,424.4586741793519,348.4514950432522,218.34933564176958,364.5032984414978,-228.99424779501044,-29.754946845914844,-264.8390834621697,-21.875826404976124,-485.9190041187862,124.75310409641736,394.04767446415474,101.960379542753,-31.167201030904323,101.63527407100275,280.30723306754464,-240.98514302928265,-7.385215201649146,-274.0488077303909,182.85691780868672,353.0141332791028,-415.5085708474826,395.6357440667357,445.5476083599716,432.00830911970354,424.55691907644893,373.4900276944388,-107.27633704003847,-221.9576624090829,375.9937864219338,223.53508402705688,-271.7622605708134,52.26359491210599,-101.72626469728652,100.22502912598497,424.6879402221082,-310.45222519968485,244.2065616224212,-422.63455322917196,-425.90346484973463,-243.73790765019243,157.14043940071826,-42.35367336977248,-389.45490838273724,-440.159340838572,-242.0285385197201,-99.99935984846189,-385.85103241743246,-33.672698760977255,-480.0223512788433,339.80387324371213,414.6730289375955,154.77005145213968,159.90623392698592,-21.843000566412513,-332.64942806131774,393.1938619332807,366.3767575038099,198.68129059083992,265.94144457449875,458.9189703456884,342.30449229776605,-335.79200610723103,164.28060689607514,464.60544868080797,435.68896606712656,386.3456624079935,42.485706062768145,238.20348779914013,-150.79544791684452,44.89609048642615,256.2179085180935,-237.50164283555563,-21.875494428392756,484.7389334142184,-247.7943499955544,53.38789381320305,-345.86112952454573,464.23583902553673,174.81871856232226,342.6260506122263,-28.490664127898583,-278.93234406493093,280.38732777743667,353.6415641452977,48.87197168336991,-471.91074611486283,120.18450478822842,493.76270534063326,368.096426103171,224.09681178443464,429.58863505809904,440.0732315581763,71.40011473673496,205.51263221624367,-264.89915325111156,-454.1036185202476,444.1019139159956,-469.6091173926482,83.52020084207413,-1.2059319383211005,152.29834578026646,213.00482369453437,-390.71815833361256,-343.89040058107236,-430.4221545874283,338.63483171117275,-395.35906748238995,354.9773324856809,117.91719987183023,-495.30627774226457,-487.47456060507676,-494.4022397283414,-77.39748540783188,-132.90569732175572,-164.46832198868242,-401.57842445157144,-149.19998762339713,463.0143394089588,275.67903951083883,-449.6557194773494,-367.8828506289633,-54.03343420877252,-430.4646781399115,54.844558324803415,109.37374156465626,260.29547516913,-185.24645935280626,51.13903325107037,-255.71362520312425,-162.87759020412352,-494.4216501585423,46.120734261555754,427.1428437089901,-349.28694684925836,429.12943429542577,-64.80964538190824,-290.2609352445529,-59.158271126589455,-324.50309912472574,158.59596540842142,352.28331306474297,16.785877903228425,443.92827001013904,-168.30247773715865,211.73871577113925,277.1858821198663,357.25636638089145,-339.01970327540874,73.74626796948496,170.37372943134835,-405.6469299197305,-450.5224394783598,441.2300422873117,-191.58833022437108,-23.16778582161595,-198.28651613885648,404.3882805241093,297.46392405473784,440.6865024177871,-13.57487438873494,433.2487510847818,-220.66939512551454,-210.68059469029055,-242.3662992014979,-170.92564825117984,-432.9449712977891,61.90269232140258,-452.45314097635617,403.7169963474214,254.56819672408244,491.8962957861239,-93.03491791413501,-149.6692438271843,-39.19919089850208,445.3004641718121,-162.65688569503544,228.9623471020485,195.94601015793307,270.13500346432636,-343.2867097454762,402.8406362139772,-54.267494321891945,365.21227526822054,-352.15991042731963,406.90550514118877,-27.2520531585414,463.18678273507885,143.80219061717332,233.45003634743387,-184.62952186705485,95.54899070195574,-253.77547309299996,235.5232017486826,175.0650156776843,453.6853299730436,-385.3845318468045,483.75116636519385,275.37897888246675,88.05267076930056,-12.806959140682977,-12.824150283919721,-290.9907865112533,180.70515742389227,-346.393305412211,252.0616134686586,-320.75407115580566,-248.36871861347643,215.78274321080505,-70.25165153762794,-205.15234092385157,356.03865631317717,389.5407255554659,-277.03129713522355,-76.38568804323296,-194.1825217250008,65.99215621209441,352.55126014148107,-302.3192345662351,244.23253049189577,428.41832376687614,-242.60224999622102,-172.58288945114606,-355.80005385189196,-109.15056514110313,-266.554364868014,300.5437850740336,415.6582423519028,-345.99900641903196,251.43416505423352,-19.748705098110236,423.360001788093,-378.8792932308178,-231.75620798321427,150.48473737094787,-464.8962517467519,-381.15492258961626,26.148384211974303,22.63226649939054,329.55770718792076,-141.4605725609419,101.25669038034312,257.3746749325725,-193.9603752507315,14.233258830347495,-433.2493412995029,450.19798203943947,-14.732820784971523,32.99583501633708,396.38485558657123,-62.21451767554555,-84.30055133618276,258.06627420267864,-216.37515004406424,165.43873029825545,201.10006282461734,396.6564356493527,-402.5200929230406,-87.08270007480866,79.02921198417152,231.45460845723994,184.89222435844147,495.4930914249611,265.12953294396004,152.89460284857535,-178.66300877577544,283.39977997705,-196.32606190293365,-459.6404510358065,-116.43898955464425,-282.8281610883032,428.79450017859483,438.453561961137,146.6342218901466,384.7101657725576,-221.98291968018168,-80.67206756488042,-316.39308378895885,-19.149234407781478,21.682056108185407,216.49929122100707,-473.4945207887524,-461.97418652860733,-377.54196188839575,-120.35034393147282,-5.301121451164477,28.366969988200708,8.841405928393215,88.27230007893093,-204.46369922593408,208.1845555107875,-459.9269325084876,-81.50967896821169,-279.48055059615996,-139.37927976248665,150.61347472671252,96.63077518999535,279.8888867342862,-473.9680547280092,25.459695924902462,238.319490726729,-250.7606922071486,70.55460926599608,-422.7630448553439,32.76949394580208,-52.96509599367448,-144.73458457275166,-341.7913857611701,-345.52842862818454,381.1448925621586,150.97816778557865,-321.6082308091503,-75.58384589789392,-309.17736956185695,121.10488495416632,460.6130770888301,-171.81617482126478,-185.38318285752655,-87.16706572563584,248.947935937343,-222.57060254859385,454.45451808003986,374.66882610928167,-32.18013228906892,337.0606258939308,-182.9703088711929,-425.0810892133849,-280.99852389997193,-43.75934028454196,135.827937658819,88.6174061469851,-467.0706609223425,-155.21355335590027,-307.60773720136746,428.8377414920177,241.6694704197813,-247.9031292055709,-491.1799310757581,262.3578092486878,-249.55550740451926,-276.1656671258239,-260.02292489908575,208.05510088694916,426.39212602232647,-46.42973101869143,-250.1818419901518,-332.17611149383197,-328.4107296024355,-190.32309387751934,324.4797215059516,-112.92580829706964,182.2364493122459,71.54934499541366,-345.6555424176371,-179.12269847235638,30.99841138933664,-186.4753739627252,369.42207067331026,454.5397089967897,-393.3113113913764,-400.07902652485706,-310.29701528219175,-355.11453005782664,243.0342502869571,472.534844398716,-223.78461873419099,-17.483478616337607,-7.122673123757238,237.38042189397504,-127.89290735713377,-355.9457059146007,399.06293414392087,155.56690714993238,-24.34911159327237,419.8838833498013,-268.746420628736,-452.7282159988866,-439.40589683444074,-373.4468877767689,181.74233809941381,414.8858805914373,460.4799233754586,-129.63594124722988,246.7812115610451,-227.33142956730524,281.2159945163784,52.44678615555574,-404.4372546648241,352.0037024676732,-483.7386482576971,-364.8507035356106,64.53957590127834,-102.90062626729645,466.34433595235487,269.28918788223496,254.8981432768362,-14.418826590917774,-426.35635985587595,223.06137164249446,-21.53142789212859,-57.89032818138696,2.806503146812986,-423.85232834744,-242.29682674029408,-96.03019088229092,122.98447778717025,-468.09325858886706,174.87099690723107,-37.69574507313678,-190.8113262288329,-159.19121269009406,372.8467595677381,114.6797993509432,192.02260463329094,-455.66911409076096,-81.35904604406477,304.85829794978577,354.9584208669254,-380.14630510397063,-371.07451715873196,184.77795335737767,-37.446471391805915,239.02171878605793,334.1658917867953,491.1830015601662,384.1754690085859,426.8337983284083,368.6153831402876,-253.5974115566666,2.2486204510923358,-472.52556502937625,-184.90651610660194,-442.60618969636914,82.43191477191726,179.48709453750735,-135.66012975250817,355.56354296887616,-279.1364290074305,108.60352159450224,-164.46386897773203,18.83305389819111,-218.52811460754396,238.64212382112737,161.9506531144816,-162.47675274118592,389.2747105344347,219.16295705725622,139.5624110622531,-72.85862347531611,-455.8587808287107,-87.94664996637391,-439.3104930731873,-181.39745444140766,489.56605876443166,232.2600021162475,-333.77610213035024,-490.91109275554135,251.15006264314536,68.22863453644595,-104.25596707758086,-138.67247432358607,229.17652767398806,-159.3020345155265,396.5321437218432,175.28815211359586,97.00366015778616,11.675353789913459,125.49323583263777,251.8716927717619,-202.70569973596065,-348.7725401054629,-3.852315432455896,366.94039020699813,66.1833603440059,-241.4533768153857,241.00012793525366,-475.84009320472506,-386.84392201928387,472.297162258061,-241.14947668145948,-150.23189565344052,30.75865473309807,138.89178506370922,64.06317094197675,-138.31488894505094,393.12645036834317,-448.82696673542523,170.5377734834517,-363.2345159955712,-87.8565145352581,-319.3350812211106,-492.78199357411603,154.29608235723947,244.74374254506938,417.72189365176814,0.6071444136990181,-239.48253775878015,-432.80412869911487,105.65255934844856,449.539403711682,245.50403775984546,313.77003127866647,-147.15864491325448,-203.96555471205266,286.226584629925,356.195182822232,323.9273048053268,384.4008835354282,-475.7526284870035,-143.4225580492352,318.64991590017394,466.6143919746477,-224.9954231909719,2.1956973775114648,-95.81638966481677,-357.4708921967291,168.43878516019515,-304.9350964265525,-398.91344821011467,-475.8825488429359,486.7023432672288,-474.9425468332993,423.782757383059,335.3327841767215,-361.0127169156243,225.2526338934871,388.1026776366833,-355.6100237954516,301.7456742842868,-379.9123014574104,473.0281774422931,323.2884892518109,473.67185604654867,177.38515976899077,-289.2148280163975,84.5220359694199,-383.4138493634758,77.87210826840135,412.7014201631771,-275.9261112136875,105.32346209124444,-290.6523620018009,103.70659739440487,-92.20313077643618,-46.581266198388846,-400.94765741813364,-296.5140412589311,246.85793518559024,450.10686973726945,51.77557224066163,367.57136295965336,49.0438163875848,60.784448904363444,275.2340704519655,445.890718225383,97.85061827539175,159.60653837912855,-307.8597530659322,-455.04243877030024,-397.03350149114925,-58.26314114695231,175.2106929772259,39.50145421481534,77.88397628665723,403.4874672465538,388.41682981287363,-370.510334121047,-368.4501958773512,-104.51823497775206,-299.62574343540234,-339.2763710965425,-360.7632009216262,-410.1527353630454,43.23862214306314,333.6130988567785,405.2518380567511,17.413962886017543,420.22878332267896,377.0450156705043,347.5826726415911,444.2759341529536,267.11854596086073,77.53975136660301,-61.49206371590486,-135.1947493066521,-376.29144963140004,6.737350732986897,205.49626633068033,-183.3647209758571,-154.26155640613246,365.2075900096887,-400.16722281028217,38.06481274124178,487.6913261353353,-492.9318868807224,-225.52891744484293,-183.05935923705505,-306.5709870013602,254.65060510594276,64.02837555086705,402.41480835552386,-475.278820935662,-186.86797741635286,115.3384767015167,340.6990157800765,-217.5428022008208,-167.59505191530332,446.4776777045713,-49.63155792494689,-0.7344665398532015,-197.53779928141847,98.48642274241399,-120.01473311819797,-291.1940452390844,276.52112746745377,62.154450958749976,220.70703358965818,-430.98643478523854,-471.2841709104527,201.68242531440092,-46.507435009493406,-447.93513798302564,274.59254142295106,103.63862249420936,-140.98616885020476,-278.33694406643076,-136.58668589771895,403.1131218520836,-310.65246157739693,-418.3280323939109,81.74147713653724,121.59178745443126,392.11521354051035,-203.48077362886954,-250.49055026764933,-274.8236407182636,-442.5586254834626,-428.68738594440913,-429.63607833897055,132.07129654476432,101.1808106311762,-12.31853301201346,118.97376709050491,-104.47879363040744,38.149337250016174,387.62939728286017,14.291496631464042,324.8210134160088,-78.36106862898328,-367.0044092699385,135.98909547244943,167.39659529488858,434.66726416950155,341.42298968743523,-185.93017209838501,-111.31501440844181,-257.3457313005867,-171.88831320877608,-240.81786731431754,-388.54864910291576,-246.82410547794655,42.635692383057744,390.3163056892305,-86.67954852973514,191.5971128601284,-283.64660687963794,159.48230175248182,-18.74296147756047,82.96341938123055,-30.51319283792475,258.71966308668345,-475.04066721654345,-138.02104629108425,-65.09400482604178,253.60940825412763,153.36484303026032,325.90463606274204,-24.849495657043065,-364.6239144466141,-10.724151175605527,-293.85021325846327,-400.6852415142574,-127.96008145005254,368.071571037794,192.87005073723162,437.08634413146297,-373.73952932470786,-329.7882240380503,-423.90116594237105,1.6400163286240854,-412.88122546351326,-458.7951455333883,320.63318767269334,41.54413857417376,214.23819158058575,-341.1495623571523,-446.5302607953181,-200.03516964296028,325.19222756197075,-287.8293797279099,-290.84328816698576,-290.1446369030125,206.10539291803718,-148.99803980923411,275.97487783003885,-81.51042037329239,-108.70275239811787,128.48529423596005,331.54625584462667,-112.77641439493635,152.57457162666446,-23.16756059977655,354.7546939490753,-147.18668463031605,279.0165234544046,110.90093683431303,-150.27178210268045,491.5880520330742,-273.08111869053374,-237.90531832979502,-495.0830686873169,-260.7788151217634,-17.024280982321557,-58.62350731836119,263.03748713883385,-22.01300479915892,267.3620755761739,-221.57080567333452,-163.11765384668718,60.76005974800182,350.78963040147505,-492.70325069500933,398.4547408350345,-434.3667664540873,276.72848890424734,274.13747508554786,-237.4337430898812,-256.64250515157704,-394.9938518485563,425.93924965200597,-116.14034852674939,179.46782555987556,-424.6158659420798,275.59206549056375,-72.96594679281941,-31.49396314899053,-359.81707859740374,-364.4778663584101,-39.37821630554561,-195.16929610565126,414.7377784885093,-14.588705151568945,98.55898428469743,401.3776504659801,-495.7196521034759,423.3437366360173,-356.63105965062925,133.67692837291952,128.4392184507717,-492.204194218036,405.8421206828373,-327.08573273564775,-290.48224642107505,-224.62761440547905,-149.23618607026287,296.98176904408854,-239.6770114930826,130.96787340544336,-339.5751635930557,202.5102244245038,413.0816443035061,264.839311845402,256.415031738283,-161.14401717685388,-238.3659810197969,283.2945498997832,-337.95423534539793,-280.3827211198513,446.0705788125556,-467.2580324682099,294.21733756993376,-347.27236715316167,-411.56256852094896,446.1962708875418,290.7077773065628,-260.9988512527235,-193.74693328482715,-399.6429002154467,-237.66949766902633,-317.85688832682865,-415.4027250173309,-93.56395680224148,392.42393443503283,195.1668033036924,397.8965272565496,402.630356663807,-116.1383626646537,35.06613505556925,-391.81483716970104,-315.49393034858133,-497.5885738862507,146.8442156914631,232.9860612861794,288.0778306590313,-62.33805663671819,297.0067171858493,-115.44696763650643,322.20673533881677,-195.12807279756618,10.033141242316674,-471.1988493677068,303.6234192418947,-88.98941436249964,-418.12519709067874,118.52425349209716,-392.3599188642344,-196.59870329171224,340.1537208761971,-285.13818809300284,398.3653655356487,-458.3251375756061,320.0775824525191,-12.842348921661142,-249.05699016544557,-106.55726185535963,380.52977026674114,486.6668602115358,-407.4224610603616,496.005562428197,440.0955486493742,-216.19812757159764,265.95345562437706,-333.20978822905835,185.99145263369792,-119.43420824804929,166.1603439219674,-378.45542617090075,-334.48212927471263,127.66137183003173,-180.77539966841806,-306.51242680007164,438.20254001528826,208.9074766270054,-168.9053694355287,229.92900062294018,56.114061564464464,-315.57620600379323,390.95437746072764,77.37652242157719,-219.96986286788524,170.55832110411484,-314.21061918673956,-376.64238795526387,423.4331857965019,-116.54193607099648,1.7782428922395184,-92.07876306389062,-451.9436697296526,-435.5994216159951,9.814448671924708,398.33110233934815,-6.910497453302298,-454.46228432482496,-85.12669538285735,-446.7902608626675,-404.8960239817143,-192.12726364252217,-182.4768577409801,-54.67165562297316,-441.0549504194108,-148.56779810123766,353.1966403588856,-70.7764375239255,226.12177533573913,-232.7018587914975,-353.77181010782755,-409.0206595119699,490.1936669711764,152.54474378681016,417.73907868062327,144.0540756855513,-480.69375525952915,-119.42003089264654,-257.1554041434339,11.477956333944007,261.2876373393565,119.60901615688147,415.2689049811431,450.8570925524365,-420.1293850934018,-73.4595654705883,126.1744689166984,128.3785490702178,-191.19014250318457,302.5659208206432,-446.22589247963896,447.3777774056324,-355.59759077434603,346.2019026403342,-348.8355584328788,63.24497329317808,-21.186714915661014,-407.88733874522063,-212.18733607471574,-158.3940799567689,333.2446712163868,-391.70233798292895,447.78638665702795,-352.42243436470756,18.221281786911618,-147.97492120607546,414.84085779179054,-395.41256038212794,431.63060521385546,483.0441196470714,-158.81476803721029,-372.69736569998304,-255.89328739952498,217.06755441813414,-92.15056196140648,249.51183947047605,-255.26579185979782,-410.23484858869483,-178.16933857361295,252.38804148391614,183.79488624869202,183.8370067238368,-89.69578378796751,318.4741883528361,365.05689935869736,-407.03881771307994,-443.98627326208475,421.47192333886346,-18.940969988068957,-244.52469834698155,368.16151892244363,91.05680335167119,-255.38967296629255,-400.84581172785437,58.20793667649866,-400.377932537004,19.684045484998023,263.4467802142715,77.58686136229812,294.28354483661053,-174.3380828365917,360.49581339604185,-411.8274078131343,132.73785874108705,-172.3894002909463,195.83579701783526,363.64430863124437,118.85963263921678,225.4093608704735,-467.0639173931428,-108.81115034441757,-401.94756910661835,159.01783787758154,231.48197287558298,3.798644866251493,417.4104232546463,240.03045388046849,-214.17011231927984,-420.6968847383903,466.1282824558979,-333.4282857970943,-77.31501245322494,-384.35060137740743,215.48289813200074,197.47141528494967,-42.421323791331986,-247.53928266819992,-430.39436702883813,303.5205201931925,-268.4500755027277,49.94599785759783,-120.08430269347969,-156.4429880227769,52.262726533124805,378.94919617691824,33.51005341258406,-414.47042501623076,482.39655584005516,-170.63406226765744,-140.19819777325893,-343.90323423775567,313.51330187163046,-115.19001789984975,161.2572890986994,-441.5996162326439,262.0031668432274,-404.4384736746514,-210.435130679101,-448.9974096758409,-451.9228747972372,274.88405692744266,-461.4173937281676,-282.09395719436793,-275.26853182972434,-185.05811070760393,56.82864351163346,89.30806701422875,145.02917962571814,-265.777261252162,344.3752943253961,185.8663220106214,-124.78707479820406,14.568287011027792,-0.049385340088690555,205.22498555789332,-316.9842476835907,-168.61155378971569,-27.09720986002884,-109.05280757780923,32.76629298244575,215.4137353785228,-327.7016088564852,192.43063202655344,35.381818403414286,-91.85750309447769,-454.7356677705374,213.09652922845964,45.21951559831393,-287.70547543820624,14.134190339162956,488.6902930479504,-223.5895648124373,280.98162315428965,158.73159332454816,-348.9611379022401,14.732839624574467,-436.71502819270194,41.052111264862106,-472.93194737578557,213.63007986277444,-418.057591458568,-327.79423880155775,59.94951971891521,262.6286995730886,-113.86649606646927,438.7570966305956,429.7135736380943,202.06866777334676,271.68394047574736,133.5663868577974,89.9574439856001,115.18811510640671,34.53029100505648,376.9585984719299,-5.524797872527472,344.21367885200004,228.04092718738514,78.35798607579636,-232.35166386133187,329.66769310000643,416.4953983756392,-55.506285497288104,-451.6242547482758,-453.0125628286901,-497.62272433798825,188.56539955791482,-164.0012061885554,139.47097983920355,287.90142928967623,-212.8266298545907,334.4893916286213,-425.7380164370279,-14.100128825808895,24.36014878879587,-303.1142582055064,-50.4608393148107,-63.30769990546935,206.61492303292732,325.9834930991723,-231.43233396571026,-207.1723186801313,-450.23304714251935,-395.1259226604811,-177.66366359694285,-428.41034302655777,-468.77921547165766,202.50953397366538,437.26332693086545,-148.92554326363762,-131.4143192955737,445.79978522691624,135.82620639524157,498.1970892036236,388.09241472757435,-32.88081597342017,251.28559428663164,242.91275722729404,159.14651259754282,55.16453023386862,45.17595316808536,-112.7049085490803,-212.67839531019092,-179.71837741234032,425.6704004323726,391.9004569608693,-491.77965585787086,-435.3293416377535,-446.3198400774029,325.4372114516102,-222.20246685875435,61.96999402598328,-434.4926333851902,128.58103164106876,-42.09016983712479,-215.45791597703044,393.71895993770715,425.1524736756718,408.1187812106457,-289.4086589546239,-23.01574618367107,-402.6636214843513,-42.32010438936908,470.9368516225562,-281.26670908497186,-447.00908846936295,-404.81703147622005,-257.1454303866301,345.8061139076418,360.54489397517386,-69.94965575655931,-286.64473802908617,33.49150602349323,-203.67290738241752,84.53269580121798,-212.8577036286341,293.9254419909288,-441.2106833145857,-12.930549707049522,-120.71796888522914,-312.7764284258889,-68.86852823066602,357.57734623248007,-468.7522539567086,10.706820465471026,72.1020365214091,-481.32828147563123,-397.5337804974208,-237.89541757919187,291.7177221802241,-366.96494372844967,-330.10016510041055,-12.847479657556846,437.91237594650556,239.2910081333996,349.5889797400398,-174.74139103595343,98.27854796754877,-50.79325803061761,115.08924993022026,-31.302850787735736,350.56103032712826,-77.92343651155733,-179.5438010305246,398.43640173007566,-462.3357303280071,-45.658664709401705,20.420775343124433,-126.2465657261169,-130.7110929440143,-18.251098202647142,198.27577834966246,-494.5742477414512,229.74086584649456,-431.9446562480729,-308.3250601007985,-430.2773422514779,146.3776892254116,-494.3512764564111,-228.67828430799665,-207.2238297519291,428.22369288606785,-346.81874083858855,202.33623296096857,335.6467687323019,-284.9546609912139,-270.95455970045987,-15.380560321373935,496.24486259185517,-296.5020617014849,303.1878774091765,-91.05892382855728,147.04641285206435,-29.05773069270265,-152.05168214584995,-157.3735642683638,58.05616736262539,482.5127234699888,307.52021708367,12.497801964329142,-449.50784468609385,356.362994957355,462.85834673668296,409.2547252320842,325.59729304381597,173.42900551570176,286.7255727623585,-494.8887989367972,-447.40469839079424,316.7954888874684,-257.9843711107439,-163.00011953258297,372.1671473380969,-240.5965252162594,105.5205476276127,-34.217026348530396,-480.45960376232387,353.525098079376,-198.32039646712184,205.72144127798038,-231.49714298351108,347.666083938728,-466.2223158341139,-115.09919131963397,84.44338957750449,-319.3979107404567,-145.9393969677527,290.19274206494856,399.40473673072097,-482.72199337468913,132.52314365862446,230.68386746157694,232.32441296576292,-49.63126419148398,449.62722891120416,-174.34190006981964,-491.40485262166743,480.4140035568379,-267.27580146925555,248.0959724175509,78.0784461551383,300.6741576088175,101.51132306995089,-86.589349400809,-300.62500566448546,201.94930045867522,496.69807831019887,-441.3170918267235,67.8875926442264,91.5558357485695,-329.03752622628036,-460.4910182873585,-410.1496352701241,64.3319417150974,417.58501283308647,433.49572033274114,-28.228879038551895,-156.13231788374702,-483.03916829893814,498.1197148240366,76.70535009349555,172.09083104557067,258.22529633975137,406.7569038430729,234.11485154655122,-314.54429149640407,172.25828567094334,220.84292531113078,477.41513742852135,-494.3321426312217,428.92544914050904,133.18741273573505,494.25362056219126,135.1179793491051,135.83934121339826,103.37040964892958,-467.53639718196104,302.85182462065154,48.587018320690845,213.72239488623813,18.391792126337236,0.9165584389307924,66.22783062980227,-454.3754044707362,178.89251327772263,126.63103904960951,320.1830526478367,245.4472812619814,-19.84570537687415,-361.7066909070952,99.5170095044482,-142.418703512168,-323.99727056857455,-314.72085502235615,-332.9603033950208,81.70402068472367,128.39685501077565,185.4180321960206,-198.84401461047372,-36.29854784824869,285.6289933237979,403.7144687093721,291.67115666629843,-181.79253074827574,-98.67485559303037,279.2937999503024,-296.7354209628421,-281.9075024522799,57.22942724330824,-485.1625677801836,108.80399594816436,57.36479646472708,-149.3608825485564,430.0096290519808,26.019415136195903,41.9302103219668,-117.31664422185582,93.36886227053685,365.20993448171214,-36.73391307608398,40.49231984946891,83.9798851587932,149.84822699707775,110.4736390034493,485.1507589671371,-294.90513649906666,-301.5550298191583,463.5369729914456,18.77579130478682,-237.53842899098765,29.83978482661189,309.2622663625666,196.76171757625173,-13.203535445473165,64.82810381888828,230.16970171638945,78.4277424397244,-53.3714297892638,205.64756418937895,-466.1802516029778,55.73536114290607,55.794227021244865,-468.93029109709516,-353.54706379606716,409.56028096428395,199.25425101783082,-118.59011836727927,388.7028830185204,-72.6035471578632,-220.57213495709857,-327.6843304788,55.00829891063438,-248.94344023480562,-411.82838701796106,-16.74682380233253,-396.8676641691262,286.0762273938915,238.24448116461224,45.78443687323124,-35.90030879031292,480.0658719714255,448.05573413298964,-223.08394308185495,-3.9305565847107573,252.29392968627917,416.46500907578866,160.9185733829504,322.38483544471137,-20.99253714353688,-263.6720509951349,-186.89546549347625,-264.6898194412935,-244.05775884555746,-427.2152689647142,278.5611787776985,470.91029572423065,-428.18684545133846,172.43771538581188,495.2090872520678,-301.7085213582684,293.9351281244791,-498.8295643561047,-371.93558378630894,223.3915597338356,-478.12423310272953,206.7883751725193,-464.0323801306732,-368.2444326134677,-453.49585310926545,-360.85454801226734,275.55199544173956,-11.343433819043923,131.57351820517601,480.13406456921564,-141.33390213198413,209.58108367635054,-221.6227724985731,-365.772031721199,143.9936371337891,-126.80871920025294,-344.03464860451675,-430.027970155302,-482.1414020517725,454.60848960176725,155.39155460946859,-222.1223222343125,169.62781180082072,92.48274778076507,377.85568078084907,461.73437619065874,295.7730148738726,46.40880165326996,-82.34281078443638,-462.2427110288796,-137.60521321557582,-121.08216790751425,499.3059101248689,-165.29631414875314,-1.2358457620622403,-397.4365352452487,116.07304750743742,-420.7255454887602,-486.70225359761133,112.90563867996116,-272.66564727254683,181.36254608625666,12.730932905682607,111.97372519277485,268.67274350823993,69.79801783080177,-427.4381627853603,134.4147677165222,423.9332472179136,-397.1622750256556,-304.1130136498218,-247.12859275407473,-221.9707172926697,493.87957824042394,282.9941883707105,-489.5231637798716,256.7341468641382,214.71314085333051,149.67819395967012,-349.2963505643123,265.74289802458884,-35.35974071614902,302.9264133552099,472.9276961164512,-289.03187210074145,-65.6761678211164,-50.024095279186156,-216.95645460611826,130.20360527360947,-386.49010303565245,225.94714152366134,94.4248979195861,-194.51500674593825,-33.47872677617448,-449.1442325719253,-171.95201335933683,-41.88263161112491,498.2659758726537,-367.6330918053965,356.28231305888085,296.21494461169834,461.7852213867652,477.7396131274377,64.65619750045073,-385.83905824987363,-69.75023300637997,208.72458320396368,-225.50287771980692,-70.2453732796098,356.19802003619964,434.36818138815477,-159.45792783379466,-317.91576537157874,-475.3874892236716,115.28090030507894,-421.3646986493129,6.917614078482131,-187.25402197130325,-159.5335347500113,-430.07510083601244,211.6256926292399,-269.04763303728555,-238.46142495239974,179.07205296251607,385.3397214011087,-131.97114622588236,262.3858241182097,277.46442779920153,170.16983370342825,-32.44082357581624,190.30146530471234,-153.0658233940041,-401.770651425025,411.5823264263936,-398.8381468715192,79.2896165734478,277.8076120320734,-108.2226348707336,-42.650319210124394,181.56824883500167,-428.2615777945233,16.479854985249176,75.50588025643992,371.04610576327036,239.6304063818635,-305.36131476303586,69.26787374765354,197.09093470917912,-329.0470443914211,-247.52388519785407,327.96827111092443,474.1614897651323,483.58954400318635,-128.18972792938933,33.678010199768664,-355.3746435846843,-394.66843778319037,72.36954098770991,-192.47713594895168,-232.0622368933196,422.5969223804211,-488.82745789587847,-473.0697986800818,131.6325969298058,-65.5349671952228,365.2840343839472,164.86823097048455,-400.59747640120565,-82.52392270036933,-392.21513661283035,231.80198026040898,-302.5294921401409,-54.25201500969035,339.6620965099297,-260.73985675629126,-354.7259183674474,-427.5634260820833,246.29409281993503,-134.4831329848921,-240.04140386911098,442.44948447993784,-361.21372450067815,367.5652990374889,-114.83794532072466,275.60009788947923,213.67121444608415,-270.7244041765582,-423.25914186790794,-482.8051234673354,1.800275426176313,412.02240289999725,26.558682885078156,-76.40423648272775,198.6104135079671,494.19729834053646,-93.67860721315458,120.48347702081276,-497.19156173126544,379.9609704731499,-394.07253769056007,-32.269064332458356,-270.0456677364458,492.4471228704937,-130.64608106955268,462.9827313128918,-126.14463046122125,-276.18144142898893,261.6302275197371,-295.3811640390371,40.84355704344398,-14.080637024796317,-109.19258017763343,431.4788046821252,-468.25473223018133,-271.50096926518415,-67.6809789379036,0.6863625846982586,49.03194946609847,290.01167320430966,-471.4827762038254,-14.209303209582686,360.66834607487147,-492.01656899217585,-373.5199465432335,251.738177629363,-435.3042135730638,332.39300762774576,-446.56845065907834,-173.65922283040612,483.08800362930833,492.840334970414,-127.03817965670282,295.11377739463444,353.53138018185984,185.92917869431426,-7.888256767764744,63.826276686325514,-382.06804182400924,467.81472775729685,-110.30406029069394,299.97872088086046,-311.8332954166772,317.88289504617535,41.46267809572407,396.66439421102666,-182.39324413395354,-113.86341777905028,304.5438198379735,-303.0279932335709,489.26478951186516,-348.06296001368776,497.03844604975836,-460.6382866043366,-372.7335593406358,-409.3424348218493,400.98786907309216,-247.3365052575005,84.55969761226595,-276.39176350374714,-194.87040752878062,-135.33077800536188,459.67684955156415,392.7959834799459,426.89699503845895,171.9245136923157,347.18516766405673,-33.037763225102196,176.42042554121565,-97.0155026950734,-194.5086307044117,353.0822882830007,-321.79069154301646,17.141562855095913,432.0498684131271,-115.56147522452596,319.4840258047833,-264.665393735831,282.7098416941402,275.3641086406768,-458.86655891639583,-24.30963339545866,-325.5484935686279,1.8541591716177095,-263.30715921048056,-397.43494300580085,-34.03654578608763,-318.78626063475576,-87.41160336886833,-89.40741062016144,-136.9934795562164,-392.6609536497996,386.0513784450652,338.545028916776,-12.755624591566743,-131.97234393018988,-69.15753395861611,-71.52723550747606,494.76658836581544,51.704269618672924,-424.2405693900697,-497.09988751232004,-279.43994892240573,115.81168673016145,-143.06563972106568,192.07292526523224,15.781580234058197,-453.53610994936156,35.01535706150412,-58.16544641654286,138.5425196510115,-321.0069408143647,204.48313147895988,379.5888654612478,-396.51797722168135,196.3155818908799,210.7582151127947,156.53436259087732,164.07986406655573,-487.6617367625169,394.91748148482,-9.676520166147043,317.21594987742515,-186.4005109509581,160.61190725646156,36.98493325749655,-39.062852566740276,300.49798343905263,-140.06450922228896,366.908504723011,16.14736751944986,-423.98902735995,-139.90086037974248,-336.7636075868887,-173.42514683463503,91.37650035883007,-168.6279229696861,-59.026908935414724,-497.56376765598475,113.06954921990791,-398.38421804033163,415.18419848169754,430.2399385306859,116.33308575097033,-1.7550651765998282,-127.65713214963847,-406.1824813560884,467.06878437978276,394.2479276473889,94.32531306750502,240.14816521279477,126.32685221144823,355.4890815079308,187.08010647588094,135.27115025938247,-395.6519978181274,-323.439030761161,-48.849699944618635,262.8057210761343,172.5379860628467,484.75434858308347,-257.7336655659155,104.05947647046253,85.930923796059,-438.23294934888304,195.39633971602984,426.2095021780716,285.26512267605233,130.62267333651812,-384.1262434676187,-452.25521296016643,-226.7572411270378,-28.870288000914854,249.6116174695253,12.787739746979582,424.5838237789319,-298.75493453632095,53.781259446295394,-125.19233984703448,-347.28059310859294,179.95116455042796,-36.31343050647587,-470.60010815877115,281.99127805052444,-447.0595887270177,275.69849684142093,-176.9190810031904,355.43433032949576,-243.3535622569678,219.49752740909025,-399.6806796969248,222.98696456483685,-6.982906651270127,265.4775512714191,-264.0213264743319,18.143522853946592,-480.1788301255001,102.31604792711414,-343.49606119976795,157.40217127621509,-60.78370438746015,326.06720434630154,7.37158502072765,17.685639822906865,61.37939287003019,-126.05367642160093,-10.655841679576554,402.79829587662346,114.5022789004937,498.68073476614506,121.10879355849227,-146.7813138306313,379.0775773579562,-148.1850623156842,86.06176475024813,-395.9064716382248,-24.227979886670028,473.3154974778588,212.21928221791654,241.1548019914469,466.80457652414555,-119.3222389545785,194.90386262123934,432.6336931319537,-313.59940144029827,-197.74681919376167,311.2966821169132,470.4914213642404,-301.9507916710298,-209.9462311988567,-365.0417947564506,437.1747580888697,-61.762692089979396,150.66950685546578,-361.46696272452994,-426.5355382017835,-450.62461798642414,280.4997714319213,223.44937847082088,234.19261668488662,453.7341617385995,210.4654995668285,84.19644922759039,345.9943225401403,360.542217452184,163.0532602062309,-376.8896360404939,-434.57910339993975,-187.91119329807128,121.64769603164325,51.47718131406748,264.70797076751126,-306.11715455268774,338.7097380499,1.3684077397204533,-50.597954279775195,-134.0883602196932,5.236009364871336,-244.4554751692629,-438.90886849156453,-29.001591228211794,-418.9006022062123,316.05672408658063,-240.88595511742852,-161.84035467736345,-353.2044988415597,-324.7115302724584,-5.018016033031984,420.93227135742995,215.3163743274897,-70.97206456849392,-439.593691957477,342.94316245959715,294.23136082737165,-9.936718616066798,154.64580785627027,-474.8806093032938,4.289396490174681,-353.06982194143654,-118.35636672333294,279.60317377830984,-459.4530975854647,-372.88864131339847,-183.65527295459526,-405.4237192638066,60.620382767960564,287.62625230991137,-468.7022815385189,-107.3443460267489,29.17199355968944,-257.7642997222596,254.9444075234586,-276.88737044001164,27.65512216813022,-492.14095821555446,1.4927239847577312,228.30052964098968,-298.00598148322547,128.59792367103842,9.651923292070876,-484.53515402721047,-294.11732800198706,-312.65251734891564,-76.4393503776688,55.130259039602606,-431.4170405112168,-471.2939774134224,-188.93903164163373,-156.66413772517427,271.23433312381917,-309.41461294410624,-266.2653019526109,-386.58865607369216,-422.2784035390399,429.2599220650919,54.43245344568618,-353.9219182773736,97.50990100493539,38.50724705900734,-291.6951209462759,-67.9791958440581,-175.26695013276708,292.29554381186347,461.4951549388379,312.72476071113476,84.92440161657271,366.1251165045369,9.207041479824454,-412.20951791909897,-16.137455561493255,-255.77115871604207,-24.033457902689065,-361.47347893612647,376.8292314271198,175.35393217144792,-215.8507496024331,-491.6225564650165,298.55554506041074,-425.5537806370913,-341.3357514558195,331.8728614193576,385.0399593351872,-182.88993078260972,261.97825747333025,-90.22587570165206,71.71779854784143,-221.4102987874167,255.3630446160529,-406.9603516487979,-122.62427522947064,-211.3984706579659,17.630759436486414,363.14204565596776,-89.01050080253037,-12.428241010049817,-186.07870997778474,-187.51355649194278,-391.0981262749933,62.750565087232644,431.6894371361824,230.34761820576796,132.38915851126512,-310.3888357102116,224.1881454023844,-301.43035306501224,-371.0166890580773,-206.294719657806,-344.36000967659953,319.39179197420356,-31.909576355900526,166.9464826573659,440.10045490826633,72.49033875099315,14.885437100013974,-71.60508447243518,113.9402960932481,439.9004108385884,375.2813945199973,496.28850844308283,52.11702685302623,281.7024963393724,168.47640623391817,-142.1384194468178,-197.7203028274215,149.2540836754797,210.24483819697798,456.7399233597456,441.13647951346,-174.84315710083973,95.2168749266009,-149.0350193115275,-405.3583590685872,-374.9131186182773,150.70660884443248,54.317116279647394,135.1240022437214,54.03420227063975,290.9094180843366,-251.3099712520841,443.48378811612133,257.19376532553247,-337.9362940764312,139.22697923462363,5.631243700572554,-140.10193225283274,-251.14439600983275,-245.24873407904968,-246.62000427316988,-310.1199713678169,-186.6522130266959,-388.8433091165362,129.11968615457442,-376.54099753923356,-148.17819673948065,405.1975082339843,41.14508825804637,-205.35706964915647,291.5875451960575,-318.34635885221644,458.5347447492229,-468.5197230883675,11.216206049732932,196.42148905815998,-225.11941853834026,-356.89465570057325,-360.2662478880585,-352.04726548521,344.06271512138267,315.4367733997434,37.540136149441196,199.51735645040378,249.017986481177,-226.91147646007283,215.0521688430225,167.6255132451106,-101.44008841712429,-358.65054918069814,-98.27416542098399,-380.0912859495851,31.712480546579854,-379.452127332236,106.20389788590614,-17.40811171586023,21.792201564233096,239.6878774521407,-133.31639553239592,-2.4470434749883907,58.973334259692365,-206.3420579721311,-291.2957085440686,163.98427094301599,195.71683676444525,86.4982599228507,260.8933344983973,282.41397285659593,-459.0521082755372,-426.74538748442467,362.9942844342389,-303.7944707116271,-369.90401271628446,-462.9885005444292,-282.5761279128258,60.30381849279172,-495.63825957735895,-155.45521761029124,-2.9728148531793295,355.4697349116376,-422.3083462187114,-32.50723222758745,-458.99149703574517,156.64795839984038,135.558446694572,320.19190145588334,422.0949753485495,-352.92329754357166,119.35860009037697,-235.3398924902463,33.294587536826725,-190.33764276261934,-413.1843163325484,-434.893421134501,-116.55580719678738,366.2497885738869,8.899888411563438,72.04330551795101,326.5204544339366,-227.24901239387572,10.708518582928093,-180.27211396847264,369.31614960313254,-232.18307706646766,-70.50371013265777,-342.0895851164396,249.80509771686332,-477.37420943762453,453.20764235253955,164.6573903535509,379.26861806322586,-215.0219169501142,-379.86402736056334,418.1290787609595,59.87344319140561,-460.83019254160297,212.64730062127944,-34.998678794793136,235.990869727239,489.3851983147339,-61.10631737898922,-243.5812076479766,202.4986981029149,-198.0215042141378,76.53454459204818,464.94630692902206,386.52706142154636,-170.55144703307292,479.8180548853403,-206.18139808669844,244.4659815210839,-278.5626098909144,-445.13276627792874,-158.5464947155475,-134.10734113424218,-402.6964102416089,-465.45261320056807,111.25219998814373,-368.2321701064508,369.9410962284795,-242.11552142988734,257.15174625912175,427.1666981767073,484.62111613750426,-196.17495437546626,-491.4878295473817,149.5745108110633,302.14194883757136,-285.81226427267615,-29.73525715093018,160.85159234562707,-83.96969334060532,316.1500853441554,-178.88585988517167,-351.2780299761133,-96.36589492828949,374.5733397180144,-56.03806464129434,-477.1243985004079,-456.07479229890436,269.9021698870141,-419.95412643700945,-222.2156213245272,-414.03187838300016,-33.71105829634956,-29.802150601658127,83.51919796752475,-8.533983218866695,-122.33847340223036,-249.8118653351482,444.83849141443056,-96.29800229292852,-420.1413837804917,-263.93659303045047,389.3239975882709,383.317404878543,275.44810874668894,-262.37017708467357,430.70910909417705,-178.11686089908932,-371.9189726778467,-36.61514188003599,-51.848271384610484,-216.41594658742758,-338.11467925032537,-38.325437736671745,388.2492619520625,277.65214478138864,396.6162540437408,-341.7479199219142,263.44456673304137,-220.69019711188952,-262.978197617898,-181.87816320687,183.01134773924105,426.2986685097892,333.7580729556455,-284.242251289343,332.1985183068907,-490.0853580645017,140.1182926859443,410.515422557316,-225.75172653821494,-36.70174644216485,347.2611225612552,43.48327780943691,-260.75649377653366,-80.2125031411469,-306.70493891071305,-303.0122582346051,122.56365911985404,82.21851685897127,322.2015060941326,493.6620877340374,229.6281955556425,488.12222567449703,22.51500666651293,264.465180103105,219.20084489299586,-416.31751064200586,496.8139871479076,-316.9354848699961,-475.3201082348346,341.96125963055727,-123.15285654397877,492.0594592766794,-24.236313386707423,-362.22988326038876,-79.26524446431893,405.0032802760295,-162.3496839870644,-171.18250244003355,-395.4343567895211,-222.51495432474155,-171.70128777306218,-341.10839859781936,465.46751775515213,-343.76408788957735,72.6225563470615,441.2230423887886,150.00548201290837,-269.34541124818855,449.65000266827064,193.43354301494037,1.6665488403089057,167.5873198880438,441.52518839937807,-253.3409426504105,-134.9121002939446,-158.11822662751587,414.65616873104966,326.0061193095098,74.26166492139782,40.428554580541004,160.36437492143455,-345.1393191742304,125.27567176990976,-322.9641975503108,-102.08751579679398,17.92943974985792,312.2891185707306,-471.41021877904984,156.28928431550503,-231.02780273052036,481.1232019764926,124.93329429738219,481.09122086369166,249.6827308535601,-145.66217657913262,153.2693042892779,-176.16691177370194,-406.47595545681895,140.93647373764304,-468.556602180848,-53.54634227567345,490.7419971240919,-5.52069623713345,197.21689979052792,-229.88757851336163,230.0635651404126,146.87147418741063,327.77394191428004,83.93726837552356,285.94511509993947,162.43356865956332,-378.67454108559986,123.48699909735103,-98.01666182221425,402.5759594106099,-65.89119929817235,211.35349842368248,-347.73766149637254,-454.8964086675542,-118.52502108169904,-21.608861167621512,-396.1468449717664,21.74395971083618,-160.9978623873729,342.9843172889124,-140.6048192094682,171.40728420855214,-160.3857996868574,-237.6584987603456,-69.50586742559904,352.7826225447251,-347.9367189997458,-359.4380996772493,-157.0667520802387,289.85479903448015,357.4459551478784,393.3338308316945,-294.48673290362933,-139.40996795147197,-422.5117235910165,-303.2062127858277,265.97828186864115,-498.14711693027135,231.38847085549253,-70.31256450693559,-119.53089675773884,-287.4661326402024,-19.50702348847733,-372.0358851018859,472.59358859202564,48.742758347887616,-354.54354701317993,447.89226232638475,381.4058743632082,-187.39771774170697,368.540627209853,-324.036345727301,-219.63457985082704,-496.22062733842444,-224.7991425635014,-499.6088950662039,-314.543960964148,-152.38014414109904,-164.6475716988209,-495.86992369495044,255.70742260416137,304.68097327863484,-369.07320193330116,305.40733373549017,-131.6312495938388,-251.4782507434019,-96.32228351126139,52.45706753700574,140.26603870697602,352.5625359178788,335.07537604288484,-295.22523097568467,-352.14256223796747,-115.10899733559899,476.68620566924596,365.0192269631707,371.1894222841439,-224.75874442304342,-172.61495264463588,-253.32058624323685,335.76086290275157,-331.46760071081303,-315.62168170720196,10.85926928300563,-351.7851779296166,20.087433003961564,-254.07065511814218,443.52012900649606,397.9591458043643,201.8546222053343,-165.39128215968123,372.59613191579535,-13.15384259944176,361.34512798646165,127.27089645487649,-438.46181322192444,-329.7468531832959,-114.1191741889449,105.34415004560844,-65.0175649196816,249.33391551826014,-386.9358381281938,-394.23275830622373,239.66769887629175,-0.8840766802200619,482.9291163534848,-157.06840526138268,-426.183479665273,-443.21474138010683,422.7196436782466,483.63150647359964,353.88363893572205,350.23878596628833,55.591100263252315,359.85933293530104,356.00324686747547,-299.3139109442202,208.49929811508798,-208.19275909984492,-470.0117772999468,-87.24009088160665,150.10270822449763,417.0423298343919,198.90320020600916,220.20991407639247,223.54670128671694,-318.02941345962597,56.524405128356875,22.142305733620788,-233.13089258887555,-60.30343133752393,210.9366539630946,497.8346358387587,-133.71741558338488,235.36583051872276,154.72901247224934,235.12448308238913,-201.63531106155563,-383.46786277173896,-448.06958013471433,-358.90199203015817,-465.91805306304354,406.33121868180376,-465.4573135716209,-144.47113083104733,-139.1350348340037,-322.5190090737613,-161.4025227726392,387.3711728101832,182.5590446254124,-289.3317898673644,262.01237122191753,-115.4787321297963,-388.0146836608871,-238.53678769984674,326.36833517275625,-51.607133566546906,-485.64065286068467,398.5377430149539,-472.28201410816007,-77.48665514378229,-184.57519325466063,-131.12030103099312,391.20143077727596,-186.5281939059771,-89.59108945462458,-246.46580106611003,461.6012627274606,323.3209302336379,-405.60253227391695,-149.49283427893812,277.62875030765997,-330.96159561078275,-185.51117712081447,-201.0737641521123,312.2743271074437,333.97873821347287,344.8007061617342,-50.37079043026591,-463.6552437594479,-376.69369740708623,297.1144261240752,-306.3938164015858,-18.968196598233135,32.70452079660549,234.51228091921507,299.1563446390244,445.12597683278887,132.07506773839089,-107.61655310088526,434.9797561482145,-308.1810413560422,157.9920545512008,76.63714544331299,344.745900376878,188.3599439139598,499.3384744965972,23.98489015967573,-466.36328158289666,290.01607219327434,-147.74501581940848,-20.083235060576214,-33.92666281543177,-210.7189477303333,-61.285757483368286,486.3105595848125,407.4861917305042,65.75639870816997,-288.9543612098864,-273.7430637798213,-129.51297672270437,-135.9478008353019,-12.846010455622945,22.194008984221455,-286.20980999622736,237.2476689744385,62.11419716823309,178.02021524087456,227.80807309729937,-168.40870806631034,354.92502724565304,-210.25158837865177,424.35765339570344,182.778653854279,351.061781354373,-192.4441657964515,97.81053112292,53.27738093592768,-191.2739949800848,430.1775914000765,-399.30811438319023,186.1543724440769,-65.23176034913348,365.14957433746997,-292.86103856230073,-54.95022434189087,431.04035234608,118.36867574333462,440.48761120782603,107.61461918033137,152.82614093307689,438.7619554526674,-320.42492962592826,-459.2456372836482,-315.5483251552098,74.84846776860081,-456.85936606858337,-242.874513585825,-168.47158433318168,128.6447674850615,-214.0533123046675,109.37927683973192,205.33028208539974,-29.515883209451772,-291.2388888509312,159.86883173812646,351.9255054817452,409.7293655898577,-476.86792566492466,-274.25086160938815,-29.388564991539056,-334.2176374895467,121.32692163536785,130.80951978502412,-490.1494164015423,-249.63945004156417,-405.7004483489053,-416.1245340920336,429.8413678885024,-339.24813089077156,-127.73142536225237,57.968207953155115,432.45343584218256,198.89572862422438,217.11727497568177,189.66891516326177,-244.09670773860915,228.74383117180594,-308.20523084902084,167.1147112212235,-250.7739944335141,311.825687668849,-234.04786471707007,-230.37208772284947,298.18963116703935,-453.9723416176855,45.87965960525378,424.3492086616303,377.8519297170701,90.90213886802485,-194.8723358200071,247.01992672001768,63.617697149556534,35.19223314148485,-417.67622011549713,-72.98323728391875,-258.8826052325037,-101.0018180696519,-458.9474524093904,396.13362564716635,169.15142964718473,-486.4023784788192,121.19220109925232,-452.09528849946355,-184.69842483421718,413.15529010072055,72.55048422220136,63.955005615954974,-119.39769868600723,414.4281147699023,-354.6699000493374,377.0540947177392,-134.43472466383997,439.52381658266313,-363.66075180706866,262.8681919660711,354.73523731418413,98.15671544861846,-20.186996622002084,322.65700748135146,238.46820816466982,45.27201752887095,180.39318828061175,-193.32228263096727,188.58873781289742,39.92963735918329,-93.73041317652576,263.4791307290802,234.61416563555872,-475.8571088929664,-329.37250855823333,-461.5815995270962,-49.651626390572176,151.85171960583773,432.72517962962786,307.9833228833768,285.8787728112327,423.00017512489865,386.97221980900906,441.0814582787033,330.3212880387383,-14.104799381748023,-82.99057546550534,238.82391643261963,-498.9303016835331,436.91060611679734,192.3580331286512,89.12874465692107,-426.27797867175434,-283.1577378522545,57.496453910526725,-395.82857926363914,9.942167202570545,252.5554800622691,-41.09120326067938,22.47434844330519,143.01765614181033,-145.24591185236943,125.21195880674907,-383.36400971778085,-29.46313813477741,-260.5202000171105,-4.033373611138188,-367.0318745418448,250.47619133493754,252.75155142401036,129.29149487439656,-32.14972268706862,-63.21059766316807,173.84781074269222,374.26244280749654,462.3747622753556,-385.027440747457,-487.5994387419449,140.81699393413237,355.8838577628536,358.8316337199999,334.9088553723536,-43.74901831359625,387.7201329862445,-310.9294782243113,440.7400440422307,-476.56074709895034,185.12366877210434,-151.43170130421726,-345.5504943364485,358.52494026639897,-72.27422865699862,196.49088783766854,182.9669931955467,396.94928194414763,405.2674747883709,-196.95158126480618,-432.0230132524359,217.78362198339528,48.53677871493869,7.522943735452486,-337.28869501903034,186.77209644345066,-421.67057674473926,-12.739355607443542,62.64984689148139,-286.9001349700724,-385.8109505994305,-213.89185888845554,-248.99527306976265,-134.3611408861065,383.7643267624527,-257.21259425978315,179.25158407078754,184.97632562636124,-59.08007601016686,-91.81240318809847,-87.93033655610884,257.7964837316882,334.8217349647098,271.85915883689927,-252.86230581389324,439.6405120244326,-183.38995643698098,339.4310781575682,367.4465097448665,419.1394172523642,-86.60405831541038,-462.67863270197165,281.6042002690382,-371.8639837122242,459.53082485207824,448.42829304700695,467.2868009676015,57.60344467596542,-345.7140486872181,-410.64131801062456,360.37764657604885,-331.97728209720356,-446.12616861989653,-213.02846200771677,194.6012512539039,-497.33522944730726,-220.17437285019616,116.11939546006454,34.6711741504331,483.7527385425402,-320.45760629918794,224.69096042362378,436.78140537828256,-130.44000535385237,212.25513169211263,-23.634691716414295,177.76863218787526,-148.86985670805774,437.84987744695457,282.649972289209,283.19654887849333,-180.41693123880754,299.98092652009166,-312.6454925807092,19.042613594724344,340.7801801045232,374.1867148181044,187.91163537087868,82.19568870513899,203.8715314658741,-352.9820216571844,242.73888618889657,-64.80758171641645,-329.6743683190722,426.31402232263406,33.479741486076364,401.8267984241302,1.3875508330576167,-225.43536251153904,-475.03977062166757,-150.47252095561083,249.28021035249276,-2.6541271621878195,270.9876510069338,-143.46979126538884,-138.70317696889424,-313.50686109622194,-94.18634076875685,275.5543492639838,226.44690023937403,-164.6839671653766,-416.86098252575607,-477.0580835927616,330.9068347525215,-413.8171287443306,-122.02643381684084,393.8551150807099,393.85452292829393,-453.34475291455357,-59.14265444399081,-226.4829856437256,137.47737556625043,-225.51710910539714,-434.34686146620913,-486.7453195954721,-345.80810320252976,-56.56435823295692,153.59550894304857,-416.61382371553236,-371.7083478130272,473.23146453704544,421.36035572414346,64.98793756651128,-320.4745950138368,348.0673353941504,-29.313435276669054,126.78448575574498,-416.40296050823713,-417.74611575210474,55.73669167190667,-92.25831895099003,437.30632811681903,-385.77792134771573,-170.61660951838365,-202.63666503784236,357.5994789531127,411.4210149031477,452.42306134292767,73.57014724345686,-137.9750505366062,-214.5488899084118,-238.15166334171846,-174.2973699675254,217.7627003753513,-18.475783312698923,-196.02771423548938,427.4955871212767,-13.416933147782458,-81.94767332816656,-407.3497549780032,419.2252559869179,148.46020438547566,-425.41230268443076,-38.322956490597164,-448.1156164671394,-414.9302129876087,139.8251806840085,195.4997011371587,121.86749036424317,-468.56255187642535,-32.83062712448515,-295.44311916593165,-378.7686945571409,-403.1362174890405,364.30715821097976,-247.78327772273713,-351.76159622889423,64.23186913200868,-360.42591130143205,126.05348344065237,-113.4142231198021,219.86073913480948,-129.88454929983374,402.8613056063126,340.5657393648096,101.75385414181414,435.2997607238716,82.7762378160171,-438.9994456836086,24.52479976539564,21.15196491342749,86.94171785468802,-304.6249008676267,-229.2994660000678,-324.6272530220271,141.7203704794017,-412.62976634041394,76.5656390343064,-396.58785999675007,-249.40277268209553,-498.1119253767354,414.2367433517395,129.5935252458902,267.8424577705372,77.61291762660824,154.98120077333044,-105.79466817956586,-458.3876369001909,50.60937926977215,125.33515623942469,156.65806912511653,-84.15665304092613,157.98479891087914,-267.14739676749286,238.44608123115245,-129.64314157175403,-193.27898467281443,-108.90745598995301,328.43416263368795,-453.39691591519494,53.036344141620816,54.892500385874655,-192.27307583875233,-53.42717201548311,179.4135023882351,-330.9846797660106,-203.9428460217698,19.682478921447796,-380.10657975232976,-115.51481976026776,250.89994862836625,-453.31237653472954,216.53410414329005,-368.4728738396188,419.60974695926075,-451.73921043506306,408.168009530596,-375.1832990780399,164.97109804644697,44.58509544578294,-358.45963190585195,158.6921109426653,-128.93297843869453,242.90970394066005,-390.1065537282318,399.248839922315,327.2315889202489,155.6169052672784,301.2556713630139,-126.26796375122609,17.67956946759614,-152.41531656602336,-298.0013424780261,443.88345790357243,180.25391930859257,390.6980117625196,-157.78376486837686,-300.79945455929294,161.6488396457088,-187.16543179090394,-122.68066185222358,222.92441621000035,302.71438998205815,-94.12336668075596,-251.98802244852803,459.2739026032615,253.57216089716644,378.7616640667368,-441.2810177906672,28.29045485074721,-269.4945722584994,-221.94394978595875,360.40032911437004,291.3301693143877,118.62924470435553,-312.3847564988207,32.71046392210428,-230.4074182996647,-41.10339734946564,-99.83875248963983,-84.77492314906243,451.1985243852572,308.00472917278364,-441.39467413517286,39.49457848373993,223.84049609487988,426.8293914414089,74.86706310583986,160.41140326189748,153.10648142862738,413.0624595662922,358.4153021702034,164.8532757234948,261.45652636782506,395.01151552757017,133.99976254191915,434.6624314170349,-185.58839220313916,382.10906696085976,-499.84189235991636,489.7727718037934,207.35964157205422,-32.829386338287804,-380.9280441502774,-64.1314966791657,-8.46785381597283,133.5311921622888,439.8095119495981,-184.74475764765532,-128.82406415402284,98.43598995844843,101.75577578831337,-313.7496658942447,-224.72440759864185,231.91343750126168,-391.550150966548,242.50143389489654,-438.14960919135393,343.23390136791954,176.2243137166439,-229.26217479585517,393.86669235060265,-477.864467619195,159.3195383212127,-117.55722939808663,-141.79835433909818,390.87572492936374,-63.48139034492141,51.91503450094979,464.33117657298226,89.18364177491787,302.72344623624053,-241.53796558274433,56.896095819920674,128.4538864939076,-98.53437040045776,-355.1884582503735,-206.30153894171866,-354.4645424050534,486.04904818324087,-419.50244106897696,249.2625401919231,-84.19220299507168,-335.0981364367722,-302.72171423793816,240.90217758400456,127.65182041947537,78.26907480555121,91.42619542703255,-325.8616776095529,308.80718663987625,233.32525396041535,416.7232319666574,-264.146336752658,297.3517607939659,68.67590346253041,-64.05227484405663,439.53184931713076,151.1423414932558,-353.35017313806526,299.9510514942949,376.790933866421,154.64544014718888,42.31325872140815,51.90333980860771,-288.33738352563887,-356.22720955685884,-284.2243967142726,445.2336243561663,-266.2832364061698,306.5810318144182,110.99989375423718,-198.17482705049792,-125.83690550662527,265.45065618503224,-28.567348593076417,439.8840992557749,457.6958386648107,-76.34796839673231,-364.5398839008178,-462.8225397197545,-167.62793776017725,-239.50444989531314,-362.592947283088,134.65544128866156,-127.50586258495855,-327.83296365959825,75.30353808451423,397.4662831515527,-277.4868320651085,-466.984338681055,-309.3916466863913,246.2362608161186,423.0271641595407,-0.044141961342859304,470.09078806014656,-72.05153289400721,314.97366346113597,470.82463101230746,498.72725008241696,-27.906754254960276,23.36356994585094,-422.61189112162947,280.4777692921725,335.34043163934086,356.01978993308967,132.45031924752504,-312.38349281518407,-197.43138919465218,-20.313850103429218,-8.891654794288797,281.196106375599,-375.54312381915224,210.0093919878185,419.8269890324715,-4.736170204174357,18.554049568088885,-22.598644376132597,483.6288524802643,303.7104944355384,-414.5408503222718,-79.81191328467816,-201.98745146295204,-51.52715494700465,318.26984965384213,-231.63279985145448,27.852612627946314,104.76267673324617,489.05676030905965,-160.66487205301706,131.23613505987942,-150.81080395201752,228.21710762120256,-218.9843390346282,-412.120769637796,387.0633528039326,201.60140101112802,106.7940698254248,54.3783094860521,276.86984603005556,-270.6191243842127,-238.47664386057875,-10.429652147458285,-114.80287701876256,-127.11490792685368,-16.925841001032893,-212.01444025282348,451.2125749465183,116.13666784327961,-331.907032704764,58.49438303536772,-292.7466418743743,234.68516593430945,-43.06480932091296,388.01144809422203,-115.12575048574433,255.9155193392986,-364.92501975348193,-87.87252246387476,-175.50628973500238,-340.9009022017153,366.6149467582069,197.78679646709656,-308.1378014124225,442.93305229310124,272.08045342151684,-274.89682417164073,-465.52062304442995,89.82598863579972,-380.4628101913321,349.050729855672,-238.56627557448638,497.30146808639654,-83.42665487972556,-91.63359695163484,-282.8209817174756,89.53565705284655,15.374749355647054,50.779720408813205,6.662549752620464,25.598143222450403,14.101846295051473,-173.58158717150184,454.92592632426556,446.879076030825,-192.0881270492534,291.70779820116934,288.03316910022806,-341.30558040540325,-2.0168612976439135,-111.74904753303451,-238.11338928634297,107.6344422416538,-399.1928140697527,340.49640862216177,-115.05415956864454,268.709203139734,-211.96293875011963,335.8590728596988,29.28280838119622,-32.8810219017883,-355.94429490160474,-461.1436189684273,-484.51250507880286,-188.10420493996372,255.57708432488255,237.9012111597125,-308.86853863680903,83.49189157409432,-287.480943639943,223.01072741055464,-6.7023869996696135,-359.3523614318939,342.8014262842613,286.307526667205,-40.574542088106284,-125.90171402152083,-355.62352047673505,-97.33155103493954,3.0534075045869145,139.78495397075494,-67.60801745435185,-243.33412147415822,-304.44326730109816,445.44525160799947,373.33247909075044,393.0062320233143,-415.37801246441995,140.15459006219032,-139.5066272554588,126.58156558922303,205.7313492809734,477.97415036664904,-264.1229262190918,185.09142443693554,209.73393494690959,420.51656011752266,-431.7071662077088,247.9137754407319,9.498733625680416,-283.0010991693406,-308.3393560446381,-80.52460761904712,-467.08289515578485,-249.62164374709417,213.37640947437353,-73.35134739458039,-409.725136494161,416.1245723649645,-419.4039276029069,451.4803751448844,-31.485829207760446,471.48159570625364,320.03914604503495,340.39164027855384,253.91356739324397,-250.86740694583432,0.9500794644927737,472.0840536392426,-196.68661663849173,-191.47176114405443,249.05674599957933,-284.8187027529647,290.8265011158197,167.31123704894844,-453.57227735347874,-143.601078470478,266.36778521668987,-498.16614007868895,-215.6310802743373,94.64476281188047,-100.40026892324329,-436.91153232230874,-340.66858381317223,147.020206248911,-473.24306194212016],"y":[13.0,50.0,18.0,-39.0,50.0,-54.0,-68.0,-32.0,-32.0,45.0,7.0,-28.0,60.0,55.0,-55.0,65.0,-49.0,-81.0,30.0,78.0,-56.0,-82.0,34.0,68.0,29.0,97.0,-2.0,-25.0,52.0,95.0,-5.0,-43.0,-91.0,2.0,77.0,-69.0,-30.0,6.0,-24.0,-38.0,-64.0,-18.0,-59.0,73.0,-73.0,-93.0,-57.0,-91.0,-22.0,-84.0,57.0,27.0,20.0,-14.0,54.0,76.0,-87.0,-43.0,49.0,-79.0,48.0,-33.0,-52.0,-72.0,-21.0,18.0,-64.0,-35.0,65.0,88.0,71.0,-29.0,93.0,-27.0,-30.0,-85.0,4.0,-38.0,76.0,-26.0,78.0,-17.0,-29.0,-40.0,-9.0,45.0,56.0,4.0,-89.0,71.0,-7.0,-35.0,-14.0,41.0,34.0,-25.0,2.0,95.0,-99.0,-84.0,10.0,24.0,-93.0,99.0,-58.0,82.0,-51.0,-98.0,-18.0,11.0,9.0,-14.0,12.0,-88.0,-18.0,-95.0,77.0,67.0,27.0,84.0,-63.0,3.0,-2.0,23.0,-23.0,49.0,84.0,-23.0,92.0,-71.0,10.0,-38.0,72.0,73.0,-43.0,-65.0,37.0,-3.0,44.0,75.0,-30.0,-87.0,-75.0,52.0,-24.0,-49.0,93.0,-16.0,-97.0,-27.0,11.0,-82.0,-94.0,28.0,-26.0,-46.0,2.0,-99.0,-57.0,23.0,18.0,80.0,94.0,-32.0,69.0,-61.0,-26.0,-49.0,-24.0,-69.0,-41.0,-43.0,30.0,73.0,-32.0,-73.0,60.0,-48.0,42.0,-33.0,-37.0,16.0,15.0,-50.0,55.0,2.0,-64.0,-57.0,-46.0,-76.0,99.0,-10.0,79.0,36.0,-91.0,-18.0,41.0,28.0,36.0,67.0,10.0,-13.0,-40.0,50.0,-57.0,52.0,-72.0,30.0,75.0,92.0,-27.0,40.0,17.0,-39.0,76.0,-96.0,4.0,-43.0,84.0,32.0,-17.0,72.0,-41.0,-99.0,98.0,-7.0,-12.0,-15.0,54.0,-77.0,-36.0,22.0,64.0,-37.0,56.0,-48.0,66.0,-90.0,-34.0,-70.0,13.0,41.0,38.0,-23.0,-31.0,50.0,45.0,41.0,22.0,23.0,55.0,2.0,-87.0,40.0,31.0,8.0,-29.0,-13.0,22.0,-21.0,-68.0,-69.0,-83.0,-67.0,75.0,-32.0,-88.0,71.0,-47.0,-45.0,-7.0,-61.0,58.0,-4.0,-29.0,65.0,5.0,53.0,84.0,-91.0,37.0,8.0,-56.0,-27.0,-11.0,-27.0,-24.0,-73.0,77.0,-20.0,-8.0,-64.0,-79.0,-68.0,47.0,-48.0,96.0,-22.0,-3.0,-91.0,-78.0,-16.0,39.0,-92.0,-7.0,14.0,74.0,24.0,-4.0,-5.0,-42.0,85.0,-69.0,6.0,-52.0,-79.0,-23.0,-99.0,58.0,-48.0,-24.0,46.0,61.0,-27.0,-59.0,40.0,50.0,-31.0,-40.0,-34.0,79.0,79.0,-86.0,42.0,59.0,76.0,58.0,1.0,-87.0,56.0,-95.0,40.0,-38.0,80.0,62.0,51.0,-31.0,-70.0,-8.0,64.0,-71.0,64.0,26.0,90.0,17.0,96.0,84.0,-55.0,-89.0,3.0,99.0,-50.0,-69.0,-16.0,55.0,81.0,79.0,-7.0,-56.0,-3.0,-87.0,-20.0,100.0,-83.0,48.0,89.0,80.0,45.0,-59.0,43.0,-46.0,-31.0,24.0,16.0,-80.0,67.0,-90.0,-40.0,-31.0,-59.0,-64.0,36.0,-23.0,-62.0,-17.0,95.0,-93.0,-89.0,73.0,-61.0,71.0,69.0,60.0,-98.0,-26.0,55.0,-5.0,-84.0,63.0,94.0,-58.0,79.0,-87.0,-67.0,-5.0,4.0,-69.0,70.0,28.0,-73.0,-13.0,13.0,-30.0,43.0,-65.0,-68.0,-10.0,56.0,-90.0,-81.0,53.0,65.0,-74.0,69.0,-58.0,82.0,32.0,-60.0,16.0,79.0,-89.0,-71.0,-16.0,-57.0,-33.0,-10.0,2.0,-61.0,79.0,-90.0,78.0,-41.0,-16.0,91.0,46.0,51.0,-7.0,53.0,84.0,-52.0,73.0,32.0,-53.0,-81.0,-81.0,-52.0,11.0,-94.0,-62.0,93.0,55.0,-93.0,67.0,-88.0,-55.0,94.0,67.0,-93.0,14.0,-56.0,-50.0,-98.0,-89.0,99.0,-7.0,2.0,-61.0,81.0,83.0,46.0,16.0,72.0,-31.0,54.0,69.0,4.0,-5.0,-38.0,-44.0,-27.0,10.0,79.0,-79.0,21.0,2.0,57.0,84.0,-4.0,72.0,-23.0,20.0,14.0,14.0,13.0,-40.0,-67.0,-33.0,69.0,1.0,-26.0,-59.0,-33.0,-79.0,23.0,-30.0,-24.0,-62.0,-90.0,74.0,-92.0,-78.0,-31.0,77.0,38.0,-33.0,47.0,74.0,-8.0,-7.0,-73.0,-91.0,30.0,52.0,45.0,-62.0,-16.0,76.0,64.0,27.0,-68.0,-17.0,-47.0,-16.0,50.0,-34.0,-63.0,52.0,14.0,-90.0,-19.0,40.0,62.0,-73.0,54.0,39.0,17.0,37.0,89.0,-8.0,-41.0,89.0,-1.0,2.0,65.0,0.0,12.0,-72.0,-11.0,-98.0,73.0,-88.0,-47.0,-31.0,47.0,-9.0,-15.0,39.0,-33.0,58.0,1.0,2.0,-93.0,91.0,-30.0,61.0,-92.0,-22.0,66.0,61.0,-71.0,-35.0,58.0,-86.0,67.0,-58.0,-65.0,-98.0,-92.0,-9.0,37.0,63.0,-83.0,4.0,42.0,39.0,42.0,59.0,-56.0,-7.0,21.0,46.0,58.0,-44.0,61.0,3.0,57.0,18.0,-73.0,46.0,1.0,-82.0,-66.0,-13.0,-81.0,93.0,-9.0,92.0,65.0,87.0,43.0,-2.0,-70.0,14.0,61.0,97.0,72.0,-38.0,93.0,-15.0,27.0,-91.0,-87.0,92.0,-66.0,42.0,79.0,38.0,67.0,-23.0,73.0,-73.0,-2.0,-54.0,-94.0,61.0,99.0,42.0,-82.0,-44.0,3.0,58.0,-56.0,88.0,26.0,96.0,80.0,2.0,-27.0,53.0,84.0,10.0,-81.0,-11.0,39.0,42.0,67.0,7.0,93.0,-27.0,-31.0,-30.0,-62.0,41.0,56.0,-59.0,-73.0,-67.0,-60.0,38.0,10.0,51.0,-67.0,-8.0,-27.0,-74.0,-97.0,-65.0,11.0,-87.0,47.0,-93.0,-89.0,37.0,93.0,43.0,37.0,-59.0,-29.0,-38.0,39.0,41.0,-35.0,-98.0,-47.0,-91.0,88.0,-21.0,-41.0,-72.0,36.0,-50.0,-43.0,45.0,77.0,78.0,-27.0,-51.0,-93.0,74.0,56.0,73.0,42.0,10.0,77.0,11.0,-91.0,-39.0,40.0,-37.0,52.0,-59.0,22.0,71.0,-68.0,48.0,3.0,79.0,70.0,-65.0,36.0,-36.0,-90.0,-73.0,83.0,19.0,-51.0,-38.0,84.0,73.0,-22.0,95.0,10.0,-48.0,-27.0,77.0,79.0,-15.0,-99.0,-61.0,-22.0,80.0,17.0,73.0,57.0,-5.0,-56.0,-100.0,70.0,30.0,-83.0,13.0,-80.0,79.0,20.0,-36.0,66.0,-23.0,-10.0,53.0,10.0,5.0,-8.0,52.0,-88.0,-15.0,-81.0,-83.0,-81.0,72.0,-8.0,-29.0,75.0,63.0,94.0,59.0,-7.0,-78.0,-35.0,-67.0,-63.0,-15.0,34.0,94.0,2.0,52.0,79.0,-95.0,4.0,-72.0,-31.0,-38.0,99.0,16.0,-55.0,-70.0,-92.0,24.0,56.0,-54.0,84.0,-7.0,25.0,52.0,75.0,-48.0,-97.0,31.0,42.0,92.0,-71.0,-36.0,-65.0,-10.0,-79.0,-98.0,44.0,-33.0,15.0,-70.0,82.0,75.0,97.0,35.0,-68.0,1.0,-90.0,-34.0,43.0,33.0,52.0,-13.0,59.0,11.0,-49.0,86.0,27.0,-67.0,-30.0,-54.0,12.0,-34.0,60.0,-94.0,-38.0,74.0,14.0,61.0,86.0,-86.0,-47.0,-12.0,69.0,-78.0,58.0,74.0,-15.0,33.0,18.0,86.0,80.0,63.0,21.0,-85.0,17.0,-41.0,32.0,-23.0,12.0,-93.0,39.0,-88.0,-6.0,3.0,-36.0,8.0,81.0,97.0,85.0,-39.0,-82.0,-80.0,-70.0,94.0,-32.0,-92.0,-51.0,41.0,28.0,-23.0,29.0,27.0,45.0,-59.0,11.0,-70.0,68.0,-33.0,-27.0,64.0,-78.0,57.0,47.0,-85.0,-48.0,-8.0,19.0,-17.0,-21.0,-63.0,-21.0,-31.0,22.0,-19.0,12.0,-66.0,-80.0,10.0,93.0,44.0,69.0,-91.0,52.0,2.0,65.0,-68.0,25.0,-38.0,94.0,-14.0,88.0,5.0,-78.0,-23.0,81.0,-57.0,-73.0,-66.0,-30.0,36.0,68.0,19.0,-36.0,92.0,-63.0,-76.0,-81.0,22.0,-13.0,-51.0,-90.0,-49.0,-75.0,-56.0,-53.0,83.0,60.0,56.0,81.0,40.0,76.0,-11.0,-64.0,-83.0,-72.0,-19.0,80.0,-37.0,-37.0,-72.0,98.0,16.0,93.0,39.0,-76.0,-18.0,53.0,48.0,-10.0,43.0,65.0,79.0,61.0,32.0,-13.0,-35.0,71.0,-21.0,-69.0,59.0,92.0,24.0,84.0,-38.0,-91.0,-9.0,-19.0,44.0,92.0,-50.0,45.0,51.0,-93.0,-11.0,83.0,-58.0,43.0,94.0,74.0,-69.0,-18.0,-13.0,53.0,-56.0,-3.0,-55.0,-10.0,-69.0,-38.0,25.0,2.0,-77.0,-69.0,-57.0,-47.0,-37.0,27.0,-26.0,-82.0,72.0,-21.0,-84.0,39.0,48.0,38.0,98.0,14.0,48.0,-25.0,80.0,14.0,71.0,-74.0,72.0,-11.0,-39.0,51.0,57.0,-5.0,-35.0,-45.0,-12.0,-66.0,5.0,27.0,-11.0,-97.0,99.0,-84.0,-29.0,-84.0,93.0,-48.0,93.0,-74.0,-92.0,69.0,-19.0,49.0,83.0,-74.0,-43.0,-13.0,30.0,-57.0,-45.0,-46.0,49.0,-20.0,-70.0,6.0,22.0,54.0,75.0,-13.0,95.0,27.0,64.0,76.0,-61.0,59.0,-41.0,-71.0,-17.0,62.0,88.0,-90.0,40.0,83.0,59.0,52.0,15.0,-38.0,97.0,25.0,51.0,53.0,-69.0,-34.0,-13.0,47.0,31.0,24.0,-68.0,-41.0,-37.0,95.0,-45.0,38.0,84.0,-95.0,-10.0,46.0,2.0,-79.0,-47.0,87.0,-61.0,-44.0,-93.0,51.0,-6.0,-86.0,51.0,62.0,-51.0,47.0,-1.0,-34.0,82.0,18.0,-8.0,-86.0,-96.0,53.0,71.0,-70.0,54.0,-32.0,-91.0,98.0,98.0,-29.0,84.0,-89.0,43.0,-38.0,-32.0,-59.0,-61.0,-49.0,81.0,6.0,-63.0,8.0,7.0,27.0,80.0,-44.0,97.0,11.0,79.0,8.0,-2.0,49.0,32.0,-45.0,81.0,-98.0,-69.0,54.0,-53.0,-36.0,25.0,32.0,73.0,87.0,8.0,73.0,-48.0,-44.0,67.0,6.0,-99.0,-25.0,91.0,-25.0,-63.0,-48.0,32.0,-77.0,-100.0,90.0,62.0,62.0,-81.0,-63.0,61.0,69.0,-52.0,-5.0,15.0,-5.0,-61.0,-48.0,-56.0,86.0,-22.0,76.0,-80.0,16.0,-22.0,28.0,-82.0,52.0,13.0,-32.0,-57.0,50.0,70.0,-66.0,87.0,60.0,-62.0,-5.0,83.0,-79.0,-32.0,53.0,44.0,48.0,-41.0,67.0,69.0,86.0,-68.0,-73.0,4.0,32.0,87.0,64.0,79.0,-67.0,-67.0,-4.0,-84.0,54.0,83.0,-43.0,-84.0,-42.0,-63.0,-53.0,97.0,-98.0,-75.0,-76.0,67.0,-57.0,79.0,90.0,39.0,33.0,50.0,-22.0,54.0,63.0,-94.0,12.0,-91.0,69.0,69.0,-79.0,29.0,66.0,77.0,97.0,99.0,-11.0,-75.0,54.0,69.0,85.0,4.0,26.0,68.0,12.0,89.0,67.0,-25.0,11.0,-18.0,-33.0,-3.0,-12.0,-98.0,32.0,-25.0,-98.0,83.0,49.0,-31.0,-14.0,-31.0,-82.0,-68.0,-19.0,98.0,31.0,79.0,76.0,-84.0,-97.0,81.0,34.0,21.0,-17.0,66.0,30.0,-89.0,25.0,42.0,19.0,63.0,29.0,42.0,-78.0,43.0,-58.0,-63.0,3.0,76.0,52.0,-89.0,32.0,7.0,-56.0,10.0,-45.0,-88.0,45.0,-50.0,57.0,81.0,74.0,-47.0,-39.0,-83.0,38.0,-27.0,3.0,-29.0,-26.0,-54.0,-76.0,-62.0,65.0,93.0,-36.0,-69.0,-36.0,-14.0,41.0,-75.0,54.0,-36.0,65.0,-97.0,25.0,-18.0,20.0,46.0,-10.0,41.0,-100.0,-42.0,95.0,83.0,64.0,-84.0,1.0,3.0,-67.0,-5.0,1.0,-79.0,22.0,68.0,-75.0,38.0,58.0,48.0,-72.0,-51.0,-5.0,-5.0,14.0,-93.0,-8.0,4.0,94.0,-22.0,-77.0,41.0,-57.0,33.0,62.0,65.0,11.0,-66.0,-40.0,-17.0,-57.0,57.0,-29.0,52.0,83.0,73.0,-24.0,-47.0,58.0,83.0,-49.0,32.0,-40.0,-69.0,4.0,-71.0,28.0,-80.0,42.0,71.0,0.0,64.0,-92.0,75.0,97.0,33.0,76.0,11.0,-53.0,-26.0,95.0,92.0,20.0,81.0,51.0,79.0,-76.0,-60.0,21.0,77.0,33.0,-4.0,21.0,-48.0,-49.0,100.0,18.0,48.0,-49.0,65.0,-88.0,-42.0,-69.0,32.0,57.0,59.0,36.0,-57.0,-79.0,48.0,-14.0,17.0,60.0,46.0,-45.0,67.0,94.0,-74.0,-69.0,-62.0,78.0,60.0,-60.0,58.0,-20.0,-56.0,-23.0,-16.0,-82.0,1.0,98.0,-39.0,-3.0,20.0,63.0,75.0,-42.0,54.0,53.0,-4.0,-73.0,10.0,52.0,-37.0,91.0,-86.0,24.0,98.0,85.0,10.0,69.0,-2.0,-89.0,63.0,-10.0,-39.0,39.0,8.0,55.0,-30.0,-63.0,-9.0,61.0,-78.0,-35.0,61.0,-17.0,-14.0,37.0,22.0,79.0,28.0,3.0,-85.0,-60.0,-32.0,-50.0,97.0,-29.0,-12.0,-10.0,-55.0,73.0,-33.0,-18.0,19.0,0.0,-58.0,26.0,29.0,4.0,-44.0,-69.0,-37.0,22.0,-76.0,51.0,-61.0,76.0,-92.0,-75.0,13.0,24.0,20.0,-46.0,7.0,-53.0,-22.0,-22.0,-78.0,-29.0,-81.0,90.0,-37.0,-92.0,53.0,-40.0,28.0,42.0,98.0,55.0,45.0,82.0,58.0,-89.0,88.0,87.0,74.0,-18.0,69.0,34.0,-88.0,66.0,62.0,58.0,-94.0,-85.0,81.0,24.0,-3.0,85.0,-70.0,11.0,28.0,23.0,46.0,14.0,47.0,81.0,-27.0,-72.0,-59.0,98.0,-14.0,-38.0,92.0,-54.0,95.0,-21.0,-77.0,-83.0,97.0,75.0,91.0,62.0,-39.0,-77.0,9.0,-57.0,-94.0,-3.0,81.0,47.0,45.0,-20.0,-61.0,-66.0,-59.0,85.0,82.0,96.0,49.0,3.0,-99.0,29.0,24.0,11.0,36.0,-35.0,-13.0,100.0,-45.0,-62.0,-18.0,-65.0,51.0,99.0,60.0,-1.0,-67.0,10.0,-77.0,-34.0,-98.0,11.0,9.0,-16.0,6.0,-37.0,81.0,97.0,20.0,-18.0,89.0,15.0,-80.0,96.0,-1.0,66.0,12.0,99.0,-92.0,-52.0,-86.0,42.0,-98.0,55.0,74.0,-5.0,-97.0,50.0,-11.0,-20.0,-92.0,-92.0,6.0,86.0,74.0,-79.0,-27.0,88.0,-85.0,34.0,-17.0,-90.0,-67.0,11.0,32.0,24.0,-62.0,2.0,31.0,68.0,-28.0,55.0,-40.0,-11.0,4.0,57.0,-37.0,-62.0,-93.0,-68.0,-86.0,-96.0,77.0,-48.0,88.0,-93.0,41.0,-81.0,82.0,37.0,20.0,26.0,-59.0,21.0,-65.0,-49.0,91.0,-25.0,75.0,54.0,-18.0,67.0,22.0,37.0,24.0,0.0,29.0,-60.0,87.0,16.0,-74.0,-69.0,98.0,-23.0,14.0,-63.0,-33.0,95.0,-94.0,-41.0,-54.0,63.0,-34.0,-79.0,-38.0,-3.0,64.0,-59.0,46.0,31.0,-15.0,-25.0,62.0,39.0,29.0,-80.0,-81.0,-35.0,79.0,-50.0,-74.0,-17.0,-35.0,-67.0,22.0,15.0,-52.0,-57.0,2.0,-61.0,-77.0,-51.0,-93.0,37.0,15.0,49.0,-92.0,92.0,-15.0,-73.0,64.0,-26.0,-31.0,42.0,43.0,28.0,-98.0,64.0,27.0,25.0,3.0,45.0,-48.0,63.0,5.0,59.0,17.0,14.0,63.0,72.0,56.0,1.0,-12.0,-59.0,56.0,29.0,13.0,13.0,-77.0,-18.0,24.0,55.0,-27.0,-48.0,-84.0,17.0,-79.0,52.0,51.0,33.0,-81.0,-44.0,54.0,50.0,-83.0,-74.0,70.0,21.0,-43.0,-66.0,23.0,63.0,21.0,-54.0,83.0,90.0,80.0,51.0,-66.0,61.0,85.0,-96.0,92.0,-67.0,66.0,-77.0,-96.0,100.0,-45.0,-33.0,74.0,-64.0,81.0,76.0,-62.0,96.0,23.0,21.0,-87.0,-99.0,-6.0,20.0,-49.0,84.0,72.0,79.0,72.0,-97.0,-9.0,4.0,-35.0,-53.0,-15.0,58.0,-13.0,-37.0,-59.0,-43.0,21.0,-18.0,-14.0,0.0,-10.0,66.0,-96.0,-98.0,33.0,-20.0,-47.0,30.0,86.0,42.0,-4.0,67.0,31.0,38.0,70.0,64.0,55.0,-17.0,99.0,19.0,18.0,42.0,-48.0,-97.0,87.0,-39.0,41.0,16.0,61.0,-92.0,36.0,28.0,-85.0,98.0,-89.0,-35.0,-3.0,-96.0,-76.0,-1.0,-37.0,26.0,-85.0,-57.0,-61.0,26.0,-55.0,41.0,79.0,39.0,14.0,-86.0,44.0,-81.0,-65.0,41.0,83.0,-41.0,-71.0,66.0,79.0,-27.0,-100.0,-36.0,0.0,48.0,-62.0,39.0,-84.0,31.0,-43.0,-38.0,36.0,-64.0,37.0,87.0,95.0,91.0,10.0,-16.0,-5.0,-27.0,27.0,-49.0,-22.0,-3.0,-22.0,42.0,-65.0,62.0,-3.0,-20.0,38.0,-34.0,-72.0,68.0,-35.0,72.0,-76.0,48.0,74.0,-45.0,-6.0,-31.0,-63.0,88.0,70.0,51.0,-94.0,81.0,-34.0,37.0,-81.0,85.0,-27.0,39.0,-75.0,52.0,84.0,79.0,88.0,59.0,72.0,69.0,98.0,31.0,-99.0,39.0,9.0,48.0,-3.0,-71.0,-68.0,-37.0,-20.0,80.0,-40.0,82.0,34.0,-47.0,74.0,92.0,-5.0,85.0,-64.0,-84.0,-90.0,18.0,31.0,37.0,15.0,-52.0,-33.0,84.0,-26.0,82.0,-79.0,69.0,-41.0,-78.0,-16.0,-14.0,11.0,-14.0,53.0,-11.0,-39.0,75.0,-89.0,-33.0,71.0,-51.0,-97.0,-37.0,-64.0,83.0,12.0,-68.0,59.0,19.0,-73.0,92.0,23.0,-88.0,-40.0,15.0,28.0,75.0,-11.0,-63.0,-31.0,-24.0,-3.0,25.0,-3.0,26.0,96.0,-54.0,-24.0,93.0,38.0,-5.0,-26.0,-5.0,71.0,-48.0,94.0,-26.0,79.0,98.0,-97.0,74.0,-66.0,16.0,-59.0,-44.0,-29.0,23.0,-85.0,37.0,65.0,-33.0,20.0,12.0,77.0,30.0,-27.0,60.0,32.0,-86.0,2.0,-79.0,-80.0,-36.0,6.0,90.0,-10.0,95.0,32.0,81.0,6.0,60.0,1.0,87.0,-59.0,-18.0,-92.0,-76.0,-94.0,51.0,93.0,-76.0,25.0,4.0,31.0,-33.0,-2.0,88.0,-63.0,-91.0,22.0,-91.0,62.0,-89.0,-31.0,-13.0,-29.0,98.0,-33.0,-47.0,-35.0,-12.0,39.0,58.0,-31.0,-79.0,4.0,11.0,83.0,51.0,-85.0,-29.0,48.0,88.0,50.0,49.0,44.0,6.0,-3.0,95.0,-57.0,38.0,-33.0,-89.0,17.0,44.0,-19.0,10.0,-84.0,-63.0,26.0,-70.0,-96.0,-8.0,-23.0,92.0,63.0,18.0,95.0,-85.0,85.0,-57.0,-18.0,93.0,19.0,16.0,-94.0,-60.0,74.0,15.0,-33.0,-90.0,-22.0,-47.0,-81.0,-72.0,-33.0,76.0,-70.0,-27.0,20.0,-70.0,-54.0,44.0,99.0,0.0,90.0,-6.0,-14.0,79.0,13.0,6.0,-7.0,-69.0,-14.0,27.0,32.0,-91.0,10.0,-95.0,-63.0,11.0,9.0,-61.0,76.0,54.0,37.0,41.0,-19.0,76.0,20.0,46.0,-2.0,29.0,67.0,-7.0,70.0,-93.0,59.0,-98.0,-79.0,4.0,-54.0,91.0,14.0,66.0,-75.0,70.0,25.0,45.0,-30.0,-34.0,-93.0,55.0,50.0,-91.0,59.0,-66.0,-30.0,82.0,61.0,-45.0,-28.0,77.0,-44.0,-60.0,71.0,50.0,-45.0,-87.0,1.0,-56.0,47.0,67.0,82.0,-23.0,-77.0,-70.0,-59.0,56.0,81.0,-99.0,18.0,6.0,-86.0,2.0,-62.0,0.0,-94.0,22.0,33.0,62.0,-67.0,99.0,63.0,-33.0,-35.0,-93.0,12.0,-76.0,-95.0,20.0,-72.0,-33.0,15.0,-45.0,8.0,90.0,-73.0,-87.0,-73.0,15.0,76.0,-94.0,16.0,8.0,-18.0,88.0,-56.0,-74.0,61.0,-58.0,-71.0,-95.0,-58.0,8.0,93.0,1.0,-86.0,-92.0,-5.0,90.0,7.0,21.0,92.0,-42.0,42.0,13.0,29.0,-36.0,-2.0,-40.0,96.0,27.0,-39.0,-11.0,30.0,-58.0,62.0,93.0,23.0,52.0,-36.0,52.0,-91.0,-18.0,29.0,52.0,61.0,49.0,-98.0,28.0,-24.0,62.0,-18.0,92.0,-30.0,-41.0,81.0,-71.0,-12.0,71.0,-43.0,-53.0,-69.0,31.0,60.0,-19.0,-90.0,75.0,48.0,-36.0,-35.0,-10.0,63.0,-41.0,83.0,-72.0,-83.0,-32.0,28.0,-20.0,-98.0,-54.0,51.0,54.0,37.0,16.0,-26.0,93.0,-45.0,99.0,-70.0,27.0,57.0,-16.0,11.0,-93.0,-60.0,-89.0,56.0,77.0,-59.0,48.0,3.0,58.0,89.0,80.0,15.0,-67.0,3.0,8.0,-76.0,-41.0,-87.0,1.0,-33.0,42.0,93.0,-77.0,-92.0,-9.0,-74.0,87.0,44.0,-15.0,-39.0,-67.0,67.0,-77.0,-70.0,-63.0,-33.0,80.0,67.0,30.0,0.0,-36.0,-27.0,-14.0,-18.0,78.0,52.0,-90.0,86.0,64.0,96.0,-45.0,-97.0,9.0,13.0,69.0,3.0,-7.0,-57.0,92.0,-8.0,-38.0,25.0,-98.0,30.0,69.0,82.0,-38.0,-5.0,18.0,-8.0,-34.0,-6.0,92.0,34.0,-57.0,64.0,-53.0,49.0,39.0,-65.0,99.0,-42.0,4.0,33.0,-84.0,-35.0,94.0,-81.0,-63.0,-28.0,98.0,-84.0,77.0,18.0,-32.0,-67.0,-53.0,88.0,-6.0,-75.0,38.0,-71.0,-28.0,97.0,89.0,-61.0,44.0,-8.0,-55.0,90.0,-41.0,-62.0,59.0,95.0,37.0,35.0,-75.0,13.0,26.0,-95.0,-49.0,-68.0,-49.0,27.0,-4.0,-8.0,-39.0,-78.0,-59.0,-98.0,78.0,-30.0,33.0,13.0,80.0,14.0,88.0,-85.0,46.0,5.0,4.0,19.0,93.0,-3.0,74.0,62.0,-95.0,-4.0,-68.0,-47.0,-47.0,-60.0,4.0,11.0,91.0,55.0,-60.0,-60.0,84.0,-54.0,70.0,-16.0,24.0,-79.0,75.0,71.0,83.0,-46.0,20.0,-68.0,18.0,46.0,-84.0,11.0,-32.0,47.0,-93.0,41.0,64.0,80.0,-77.0,-67.0,1.0,-97.0,33.0,38.0,42.0,-95.0,-59.0,-14.0,-77.0,-38.0,14.0,-91.0,86.0,-79.0,-22.0,7.0,95.0,-6.0,-95.0,-2.0,-38.0,-99.0,-91.0,88.0,49.0,87.0,-82.0,52.0,92.0,-69.0,-29.0,-6.0,98.0,-90.0,-25.0,79.0,82.0,55.0,12.0,-90.0,86.0,-53.0,-65.0,-2.0,-22.0,-31.0,85.0,-36.0,15.0,-61.0,-69.0,9.0,-31.0,-50.0,-14.0,13.0,66.0,-50.0,-11.0,100.0,-4.0,57.0,98.0,-61.0,-42.0,67.0,-53.0,-53.0,-17.0,-10.0,-97.0,93.0,-40.0,-17.0,-7.0,68.0,-20.0,0.0,-18.0,-14.0,-6.0,-14.0,-22.0,-13.0,-15.0,69.0,52.0,14.0,47.0,71.0,58.0,-66.0,-7.0,-66.0,-94.0,-78.0,-35.0,25.0,94.0,-23.0,79.0,44.0,-19.0,-95.0,49.0,-85.0,-27.0,-27.0,91.0,32.0,80.0,84.0,75.0,-67.0,45.0,33.0,25.0,-30.0,-12.0,68.0,-87.0,80.0,-28.0,63.0,-53.0,64.0,-85.0,-78.0,47.0,59.0,-10.0,47.0,1.0,50.0,-67.0,69.0,44.0,-31.0,91.0,65.0,18.0,-26.0,24.0,-26.0,-55.0,-93.0,83.0,0.0,-78.0,99.0,19.0,27.0,-44.0,-97.0,44.0,-20.0,50.0,-59.0,-9.0,-80.0,-93.0,45.0,43.0,-87.0,-30.0,59.0,-10.0,-13.0,-53.0,69.0,-64.0,48.0,38.0,83.0,2.0,95.0,-79.0,57.0,-83.0,-90.0,-70.0,-79.0,75.0,-65.0,-50.0,-76.0,24.0,-93.0,-82.0,-58.0,66.0,-25.0,27.0,-94.0,-75.0,-22.0,-59.0,82.0,-96.0,-27.0,40.0,-44.0,-10.0,-31.0,24.0,87.0,17.0,-23.0,7.0,48.0,1.0,83.0,-8.0,79.0,82.0,38.0,-26.0,70.0,-54.0,-38.0,31.0,-98.0,35.0,100.0,-54.0,-12.0,-32.0,55.0,54.0,87.0,47.0,-21.0,-9.0,-89.0,-88.0,17.0,-14.0,67.0,88.0,71.0,-21.0,99.0,71.0,45.0,-85.0,-75.0,67.0,-53.0,0.0,41.0,-20.0,66.0,32.0,-42.0,23.0,13.0,-66.0,23.0,-82.0,77.0,78.0,66.0,29.0,37.0,-40.0,-25.0,11.0,36.0,-43.0,-1.0,33.0,91.0,-91.0,94.0,-93.0,-4.0,-4.0,37.0,9.0,86.0,-90.0,-76.0,-39.0,-23.0,-20.0,5.0,-20.0,89.0,-96.0,12.0,-45.0,-63.0,28.0,34.0,-19.0,84.0,81.0,-13.0,-35.0,-90.0,85.0,-5.0,11.0,52.0,-74.0,-63.0,67.0,-91.0,-71.0,75.0,-42.0,23.0,-65.0,87.0,-89.0,97.0,40.0,47.0,74.0,32.0,49.0,-42.0,-91.0,-53.0,-54.0,67.0,54.0,-62.0,-96.0,-7.0,-21.0,-90.0,69.0,-70.0,71.0,93.0,-97.0,-48.0,-23.0,-12.0,-43.0,-76.0,94.0,31.0,11.0,-96.0,83.0,-53.0,43.0,45.0,10.0,56.0,-98.0,-60.0,-62.0,38.0,85.0,65.0,-35.0,-43.0,12.0,4.0,-44.0,-7.0,-56.0,39.0,62.0,-51.0,-50.0,-47.0,29.0,-90.0,59.0,1.0,-5.0,36.0,32.0,-34.0,-6.0,-51.0,-7.0,42.0,6.0,44.0,-93.0,-99.0,-21.0,-19.0,-71.0,-5.0,58.0,-39.0,68.0,-48.0,61.0,69.0,-74.0,10.0,-61.0,-98.0,-15.0,85.0,48.0,-55.0,-86.0,65.0,7.0,-64.0,78.0,59.0,-40.0,-86.0,19.0,85.0,45.0,99.0,80.0,51.0,-40.0,48.0,63.0,-57.0,6.0,-29.0,-81.0,16.0,-20.0,61.0,-78.0,-38.0,72.0,93.0,-49.0,29.0,99.0,9.0,-71.0,88.0,-30.0,44.0,-76.0,-23.0,5.0,24.0,34.0,44.0,-68.0,40.0,11.0,45.0,-1.0,-15.0,-20.0,-98.0,-31.0,-26.0,-66.0,74.0,-30.0,-41.0,31.0,38.0,-42.0,32.0,34.0,5.0,-12.0,-99.0,85.0,72.0,9.0,-65.0,5.0,54.0,-98.0,-66.0,85.0,-81.0,-5.0,-41.0,87.0,-43.0,-44.0,-25.0,84.0,-85.0,-44.0,-80.0,5.0,0.0,-93.0,48.0,77.0,62.0,99.0,-45.0,-50.0,6.0,76.0,-36.0,81.0,23.0,-26.0,-7.0,-20.0,-6.0,-83.0,24.0,-85.0,-50.0,-89.0,-49.0,28.0,-6.0,38.0,24.0,-20.0,26.0,6.0,81.0,-29.0,29.0,53.0,-44.0,-62.0,-83.0,14.0,-92.0,-61.0,94.0,-10.0,-31.0,-50.0,-43.0,81.0,13.0,71.0,30.0,-18.0,56.0,65.0,40.0,99.0,52.0,70.0,-76.0,58.0,-59.0,-34.0,85.0,34.0,-66.0,75.0,-66.0,-33.0,-46.0,-34.0,-85.0,34.0,54.0,48.0,24.0,61.0,21.0,-43.0,-65.0,62.0,-3.0,19.0,-43.0,52.0,-51.0,31.0,-36.0,-92.0,-46.0,-90.0,37.0,-77.0,-64.0,-12.0,43.0,-74.0,-44.0,-9.0,85.0,74.0,43.0,7.0,20.0,-31.0,17.0,27.0,-45.0,-42.0,-99.0,75.0,35.0,-77.0,99.0,76.0,-93.0,95.0,77.0,45.0,59.0,3.0,-89.0,37.0,-24.0,-53.0,-30.0,-73.0,-93.0,-23.0,-62.0,-80.0,71.0,-55.0,91.0,86.0,-95.0,-91.0,-80.0,65.0,-61.0,-66.0,-26.0,28.0,-8.0,5.0,-58.0,26.0,-22.0,-90.0,56.0,-87.0,-9.0,55.0,34.0,79.0,70.0,27.0,-42.0,-83.0,85.0,-70.0,93.0,-84.0,22.0,87.0,60.0,-1.0,-14.0,98.0,-78.0,38.0,-53.0,95.0,-7.0,22.0,-97.0,91.0,-45.0,-13.0,-1.0,78.0,37.0,34.0,46.0,90.0,73.0,-19.0,34.0,-97.0,-71.0,1.0,97.0,70.0,-11.0,-61.0,-29.0,66.0,17.0,94.0,-4.0,31.0,90.0,-91.0,45.0,-53.0,17.0,-57.0,-48.0,-70.0,-52.0,86.0,1.0,-46.0,40.0,6.0,-60.0,-76.0,42.0,-81.0,83.0,78.0,45.0,29.0,87.0,-12.0,-98.0,64.0,14.0,56.0,-29.0,-91.0,44.0,13.0,40.0,-52.0,10.0,-33.0,31.0,7.0,20.0,-84.0,-76.0,-69.0,19.0,-24.0,26.0,42.0,-84.0,-40.0,52.0,17.0,29.0,-42.0,85.0,-97.0,-74.0,39.0,-100.0,-45.0,73.0,4.0,15.0,-16.0,17.0,34.0,-15.0,-96.0,79.0,66.0,-4.0,-80.0,80.0,-69.0,-88.0,20.0,88.0,-57.0,9.0,87.0,-24.0,-27.0,-52.0,98.0,43.0,7.0,-11.0,61.0,-65.0,60.0,34.0,42.0,32.0,83.0,-9.0,58.0,-38.0,-73.0,18.0,-1.0,-48.0,5.0,-49.0,1.0,-17.0,50.0,58.0,33.0,99.0,85.0,27.0,44.0,-25.0,11.0,-38.0,91.0,-17.0,3.0,71.0,24.0,5.0,-72.0,-10.0,100.0,11.0,-76.0,-10.0,-94.0,80.0,99.0,4.0,11.0,59.0,-66.0,28.0,86.0,-84.0,-32.0,-36.0,89.0,-94.0,-89.0,-92.0,5.0,5.0,-91.0,4.0,50.0,27.0,16.0,88.0,57.0,96.0,28.0,-94.0,47.0,0.0,23.0,40.0,6.0,-82.0,23.0,-40.0,-44.0,-11.0,-80.0,-66.0,-43.0,-79.0,84.0,-8.0,25.0,-60.0,1.0,-21.0,1.0,29.0,-68.0,91.0,19.0,-56.0,-78.0,-81.0,-25.0,27.0,-24.0,26.0,46.0,-16.0,11.0,-78.0,14.0,59.0,-47.0,14.0,17.0,13.0,-22.0,17.0,36.0,-69.0,87.0,89.0,35.0,69.0,-9.0,54.0,-98.0,93.0,10.0,-9.0,9.0,55.0,95.0,-61.0,67.0,61.0,-37.0,-87.0,54.0,-33.0,-91.0,47.0,-47.0,-98.0,31.0,89.0,-45.0,60.0,64.0,55.0,-52.0,56.0,-90.0,31.0,73.0,-30.0,90.0,30.0,86.0,40.0,12.0,86.0,79.0,-3.0,36.0,-72.0,32.0,-69.0,82.0,-48.0,45.0,97.0,-44.0,-82.0,-5.0,-65.0,-2.0,48.0,-60.0,76.0,28.0,-5.0,34.0,43.0,71.0,-68.0,2.0,-74.0,-50.0,44.0,-65.0,-58.0,3.0,66.0,33.0,38.0,-29.0,83.0,65.0,-36.0,52.0,-95.0,44.0,1.0,-14.0,91.0,6.0,70.0,3.0,-82.0,-32.0,-84.0,54.0,-37.0,-50.0,22.0,-88.0,-50.0,96.0,42.0,-35.0,-36.0,-18.0,69.0,-65.0,46.0,33.0,54.0,36.0,-66.0,-76.0,70.0,61.0,21.0,-52.0,28.0,92.0,69.0,55.0,-46.0,-27.0,33.0,13.0,12.0,16.0,29.0,91.0,-16.0,-72.0,55.0,-82.0,37.0,7.0,-60.0,-8.0,4.0,-27.0,-68.0,-55.0,-88.0,-47.0,-35.0,-92.0,74.0,13.0,66.0,61.0,-86.0,-95.0,-38.0,-47.0,19.0,26.0,-53.0,66.0,-6.0,57.0,-39.0,40.0,43.0,62.0,81.0,19.0,40.0,24.0,-94.0,-43.0,89.0,-87.0,-21.0,-28.0,67.0,-86.0,57.0,88.0,-90.0,39.0,-11.0,-78.0,-58.0,63.0,19.0,55.0,-22.0,48.0,-16.0,75.0,-87.0,22.0,8.0,11.0,37.0,77.0,-82.0,-47.0,-12.0,-21.0,-15.0,-56.0,67.0,66.0,-59.0,-48.0,44.0,-3.0,71.0,-74.0,-70.0,-25.0,64.0,-14.0,-24.0,-88.0,86.0,-56.0,78.0,64.0,11.0,31.0,17.0,77.0,-60.0,81.0,92.0,-22.0,-8.0,-70.0,-50.0,95.0,60.0,-45.0,-34.0,-64.0,47.0,56.0,-18.0,50.0,79.0,27.0,54.0,-1.0,68.0,-74.0,56.0,-75.0,-17.0,28.0,-86.0,-32.0,87.0,-86.0,-25.0,47.0,38.0,-99.0,71.0,93.0,-70.0,3.0,50.0,-76.0,-35.0,-75.0,-74.0,-13.0,24.0,-91.0,97.0,29.0,-99.0,51.0,-76.0,18.0,98.0,-7.0,16.0,-61.0,17.0,-62.0,-51.0,-64.0,19.0,73.0,67.0,-11.0,-68.0,15.0,80.0,-26.0,23.0,-79.0,78.0,30.0,2.0,52.0,44.0,94.0,-81.0,-42.0,-25.0,58.0,32.0,54.0,-17.0,11.0,90.0,-19.0,48.0,-22.0,-81.0,-1.0,49.0,17.0,98.0,85.0,-1.0,56.0,-77.0,68.0,63.0,-72.0,-48.0,9.0,66.0,21.0,91.0,-89.0,-93.0,9.0,-13.0,-18.0,16.0,-4.0,30.0,-14.0,32.0,-3.0,6.0,-98.0,75.0,48.0,7.0,11.0,22.0,-61.0,-77.0,80.0,-16.0,58.0,59.0,-60.0,-70.0,-60.0,-45.0,-22.0,13.0,-82.0,-65.0,49.0,44.0,-47.0,59.0,-49.0,45.0,7.0,-72.0,23.0,1.0,-49.0,82.0,-93.0,98.0,31.0,-63.0,-73.0,21.0,5.0,10.0,-97.0,-9.0,35.0,90.0,-84.0,29.0,97.0,70.0,-55.0,42.0,14.0,-36.0,-3.0,-45.0,46.0,-6.0,22.0,30.0,1.0,1.0,75.0,-8.0,-93.0,-42.0,-82.0,-6.0,-91.0,3.0,22.0,-11.0,-96.0,9.0,44.0,-34.0,98.0,-34.0,-82.0,81.0,-7.0,-4.0,59.0,-85.0,-5.0,-17.0,-19.0,-31.0,-56.0,-25.0,60.0,91.0,-40.0,53.0,35.0,-92.0,-38.0,71.0,-54.0,-33.0,-11.0,-94.0,9.0,83.0,23.0,0.0,-10.0,3.0,-43.0,-52.0,-62.0,-99.0,-27.0,-43.0,87.0,-67.0,59.0,57.0,64.0,84.0,22.0,94.0,72.0,46.0,98.0,46.0,50.0,-54.0,-79.0,25.0,-16.0,79.0,53.0,60.0,68.0,-71.0,-5.0,59.0,-22.0,36.0,-39.0,40.0,84.0,4.0,-65.0,-31.0,-30.0,-15.0,63.0,-58.0,-33.0,-59.0,3.0,38.0,-93.0,-6.0,62.0,-85.0,-22.0,96.0,-83.0,-44.0,87.0,-90.0,94.0,-60.0,-28.0,99.0,63.0,13.0,41.0,12.0,-70.0,-55.0,33.0,48.0,30.0,-66.0,-30.0,-8.0,-26.0,25.0,10.0,-100.0,-6.0,20.0,52.0,-90.0,-57.0,-10.0,34.0,-69.0,-56.0,22.0,-27.0,-63.0,41.0,13.0,41.0,-51.0,74.0,-29.0,24.0,-4.0,-53.0,91.0,27.0,55.0,-68.0,54.0,-37.0,-32.0,-9.0,-17.0,15.0,-85.0,-33.0,27.0,-14.0,29.0,-30.0,35.0,-15.0,19.0,58.0,-88.0,70.0,-69.0,-1.0,88.0,-16.0,-5.0,-20.0,-96.0,87.0,37.0,81.0,88.0,-1.0,-55.0,78.0,12.0,-22.0,38.0,-1.0,-33.0,-79.0,84.0,86.0,-71.0,-51.0,93.0,-15.0,-87.0,-61.0,-70.0,-49.0,-92.0,36.0,-66.0,-85.0,82.0,-70.0,87.0,64.0,37.0,-7.0,0.0,-4.0,62.0,-65.0,95.0,55.0,-80.0,-58.0,97.0,92.0,-38.0,-91.0,13.0,12.0,-4.0,86.0,36.0,-97.0,-19.0,46.0,-24.0,38.0,52.0,99.0,-67.0,5.0,77.0,20.0,-32.0,-93.0,75.0,-62.0,-74.0,-46.0,76.0,15.0,30.0,85.0,61.0,41.0,76.0,-97.0,62.0,55.0,45.0,63.0,18.0,-77.0,21.0,-64.0,41.0,69.0,24.0,32.0,71.0,34.0,91.0,-88.0,-50.0,-90.0,-30.0,19.0,38.0,-100.0,-10.0,51.0,54.0,32.0,-86.0,6.0,-3.0,30.0,-3.0,21.0,-19.0,39.0,8.0,-56.0,94.0,-77.0,50.0,33.0,-27.0,63.0,-9.0,93.0,-54.0,-81.0,16.0,90.0,-96.0,47.0,-23.0,-34.0,-76.0,-26.0,-22.0,69.0,-73.0,32.0,17.0,-30.0,-58.0,-65.0,-64.0,-100.0,92.0,76.0,57.0,64.0,28.0,-14.0,-65.0,-40.0,-44.0,40.0,45.0,-34.0,46.0,-29.0,-32.0,41.0,9.0,67.0,-40.0,-53.0,-97.0,28.0,61.0,90.0,51.0,-60.0,96.0,50.0,81.0,-76.0,48.0,-38.0,-84.0,50.0,24.0,-16.0,38.0,62.0,94.0,-39.0,-41.0,7.0,54.0,19.0,49.0,-84.0,23.0,-72.0,-2.0,27.0,-73.0,59.0,94.0,-93.0,-97.0,2.0,98.0,-41.0,59.0,12.0,-18.0,-43.0,75.0,-36.0,-90.0,83.0,-42.0,44.0,60.0,62.0,7.0,41.0,9.0,5.0,-54.0,-14.0,87.0,-59.0,-30.0,-65.0,-59.0,11.0,-85.0,29.0,38.0,-88.0,88.0,-66.0,-98.0,-13.0,-5.0,84.0,-42.0,-8.0,67.0,-21.0,16.0,85.0,34.0,-13.0,83.0,-38.0,92.0,46.0,-99.0,-78.0,-92.0,28.0,61.0,100.0,5.0,-26.0,54.0,41.0,-87.0,-89.0,81.0,82.0,46.0,95.0,89.0,84.0,-28.0,35.0,52.0,-39.0,69.0,-3.0,52.0,22.0,-45.0,-77.0,78.0,10.0,32.0,-6.0,-90.0,-69.0,-44.0,-43.0,97.0,-95.0,92.0,-9.0,-50.0,11.0,98.0,-60.0,51.0,58.0,-47.0,80.0,-2.0,-38.0,17.0,-65.0,73.0,-68.0,-68.0,-5.0,14.0,-71.0,11.0,70.0,12.0,97.0,49.0,82.0,-66.0,-21.0,59.0,-23.0,-22.0,42.0,78.0,71.0,33.0,-73.0,-76.0,79.0,-39.0,56.0,-77.0,-36.0,-36.0,-81.0,-19.0,-84.0,-37.0,-8.0,48.0,45.0,66.0,-44.0,-44.0,46.0,-67.0,75.0,-55.0,-77.0,57.0,-29.0,-46.0,-40.0,-71.0,3.0,10.0,1.0,-81.0,90.0,42.0,-11.0,44.0,-1.0,-75.0,42.0,29.0,-18.0,-82.0,-24.0,81.0,-74.0,85.0,-32.0,69.0,76.0,1.0,49.0,-71.0,74.0,16.0,-19.0,5.0,98.0,-87.0,-23.0,-81.0,-65.0,-47.0,0.0,-78.0,-77.0,-66.0,-4.0,57.0,-17.0,-2.0,40.0,16.0,15.0,11.0,74.0,65.0,-14.0,-27.0,-78.0,63.0,43.0,75.0,-16.0,-37.0,-28.0,-81.0,-90.0,59.0,-84.0,-36.0,-26.0,-2.0,-47.0,-64.0,42.0,-95.0,-48.0,34.0,-41.0,40.0,17.0,-92.0,-69.0,-54.0,-8.0,-100.0,61.0,-75.0,18.0,-19.0,39.0,50.0,-77.0,13.0,70.0,77.0,29.0,46.0,30.0,-84.0,-28.0,-35.0,-14.0,85.0,-42.0,51.0,-53.0,-73.0,4.0,-98.0,71.0,-90.0,19.0,-84.0,77.0,97.0,81.0,33.0,-81.0,67.0,48.0,-30.0,-89.0,47.0,-27.0,-15.0,-50.0,-65.0,-15.0,29.0,-30.0,83.0,73.0,9.0,-24.0,26.0,29.0,-14.0,-51.0,-21.0,42.0,97.0,41.0,-99.0,-48.0,98.0,-61.0,62.0,-55.0,-23.0,0.0,98.0,-51.0,64.0,19.0,20.0,38.0,34.0,-80.0,-42.0,56.0,-85.0,19.0,27.0,39.0,21.0,-24.0,-57.0,-2.0,94.0,-64.0,99.0,-51.0,47.0,31.0,17.0,1.0,31.0,84.0,-57.0,52.0,-51.0,-51.0,29.0,-29.0,-31.0,-4.0,32.0,-23.0,65.0,-92.0,41.0,-63.0,-85.0,-81.0,90.0,-28.0,-79.0,41.0,-26.0,-9.0,55.0,-5.0,-5.0,50.0,11.0,31.0,-33.0,26.0,-62.0,9.0,62.0,90.0,-4.0,12.0,-1.0,-86.0,61.0,-20.0,-96.0,-24.0,-56.0,35.0,64.0,-22.0,38.0,-67.0,45.0,-18.0,33.0,50.0,-100.0,62.0,33.0,12.0,7.0,26.0,-40.0,-14.0,-51.0,-48.0,30.0,-29.0,-9.0,-70.0,39.0,0.0,73.0,-5.0,-84.0,-52.0,1.0,91.0,-82.0,-86.0,53.0,-11.0,-94.0,-52.0,-48.0,87.0,33.0,-6.0,43.0,-35.0,56.0,95.0,20.0,45.0,-28.0,60.0,64.0,49.0,44.0,-70.0,0.0,9.0,69.0,17.0,-100.0,2.0,13.0,41.0,-75.0,-8.0,97.0,83.0,10.0,-42.0,-8.0,-13.0,-8.0,96.0,12.0,63.0,-56.0,12.0,91.0,100.0,-31.0,32.0,17.0,23.0,77.0,-94.0,79.0,-35.0,-20.0,23.0,85.0,-9.0,-51.0,99.0,-64.0,13.0,-43.0,91.0,47.0,-18.0,-81.0,-13.0,57.0,48.0,7.0,-35.0,-50.0,-18.0,13.0,67.0,5.0,-90.0,-66.0,-55.0,-20.0,60.0,-49.0,-47.0,74.0,2.0,-32.0,-30.0,38.0,-92.0,-85.0,-33.0,37.0,61.0,-95.0,59.0,35.0,-76.0,0.0,64.0,54.0,-9.0,-75.0,-94.0,-10.0,-57.0,-75.0,-65.0,1.0,39.0,-65.0,92.0,-7.0,-8.0,-37.0,81.0,73.0,-19.0,41.0,30.0,-34.0,59.0,-85.0,-72.0,38.0,-69.0,-20.0,-88.0,40.0,-73.0,-66.0,62.0,-68.0,48.0,4.0,84.0,44.0,-37.0,36.0,-77.0,27.0,-16.0,-41.0,-49.0,1.0,-60.0,57.0,51.0,64.0,-8.0,-88.0,74.0,-65.0,-52.0,-16.0,71.0,0.0,78.0,-89.0,-18.0,-15.0,-52.0,-8.0,-63.0,-79.0,40.0,-51.0,-30.0,27.0,-97.0,30.0,97.0,2.0,12.0,3.0,-21.0,11.0,5.0,-93.0,17.0,12.0,-89.0,-34.0,97.0,-35.0,-15.0,55.0,53.0,29.0,-10.0,44.0,-80.0,-62.0,41.0,-36.0,8.0,8.0,-67.0,-78.0,33.0,79.0,-5.0,2.0,-77.0,61.0,59.0,-19.0,61.0,-83.0,-50.0,5.0,90.0,-40.0,7.0,92.0,-42.0,29.0,98.0,-5.0,52.0,82.0,30.0,22.0,59.0,-51.0,-66.0,64.0,-61.0,-27.0,86.0,73.0,-46.0,-16.0,-38.0,49.0,-42.0,25.0,66.0,10.0,33.0,16.0,-34.0,-73.0,-54.0,-93.0,72.0,-81.0,33.0,-93.0,-36.0,61.0,-67.0,71.0,14.0,-32.0,27.0,19.0,11.0,82.0,42.0,-9.0,22.0,-51.0,-2.0,-25.0,-45.0,30.0,-81.0,-94.0,-60.0,49.0,-88.0,47.0,-34.0,70.0,57.0,3.0,7.0,-91.0,3.0,55.0]}
},{}],39:[function(require,module,exports){
module.exports={"expected":[6.443044208741493e40,3.0984596604753295e-231,4.709925742741744e-105,2.3092973515275923e-204,1.8596978497791355e175,1.5726963029256228e-27,1.1065040596877616e200,-8.258422468579095e-192,1.6533377988022464e-197,5.162956451226708e-157,7.557221440529607e-164,2.4541445746518767e66,2.3796553448685654e-188,9.95900078626452e31,7.858122678308548e105,5.564570733670739e230,1.9837181329025123e-75,8.1e9,4.830020556225704e181,4.9744532696089984e-201,2.7185653230363128e203,4.7258979206049145e-6,-3.583508346048587e-74,4.079182955720188e125,8.08001888280381e209,1.942668892225729e84,-2.0892247776154611e105,-2.2060618084967745e96,1.5156502469588988e118,1.0,2.517390210563455e-196,-1.61771783577619e156,2.62144e11,6.211426986515709e134,5.308589560593307e223,1.527864575339896e-8,1.815992137678497e-113,6.893154598867256e-23,2.619332395003041e-81,-2.7111293420279565e-213,5.416759243218839e-148,8.439577756743861e-205,7.095638021780378e130,3.371922744243809e-125,1.5081036648520084e133,3.401696268291227e-154,4.8056671578446595e67,-6.799482868739052e38,9.63672444576057e108,1.043016672590173e190,-2.3981927881419226e-111,6.140942214464816e49,-6.392772361844031e88,7.877247928474933e189,4.494513878170594e53,-1.2929087611427912e-266,7.423117664400899e-54,-7.253815028640572e-12,1.0040416249397274e226,9.867629584696977e-98,-4.9679652293707003e-191,2.3687678056943756e181,1.5328120442290732e-51,4.5063873020072376e24,-5.458203300658587e235,3.427654487735363e-109,-2.5937424601e10,1.2609199806963597e-166,1.0743200152009714e107,1.3736498498620815e-97,1.6170830266414066e215,4.194304e-16,-2.090658664794207e-66,3.58061099315846e-52,2.3078746127089644e101,7.969303385807093e-30,-2.504674483566156e65,-8.036369163907815e44,1.6226472272165664e21,8.697404543823771e49,1.8794162829181146e111,9.411358548896233e-217,-2.307175238191574e140,-2.0356439989813654e59,1.9395541190675918e-212,7.73161123988112e-249,-2.8625745327457223e112,4.5499293e7,1.1700787558936005e-143,7.868998844223185e-41,-6.25702341691828e-135,6.254924283287188e-103,6.0446827312217305e-217,1.1040604086532112e-55,9.298984339747871e-43,-193.0,3.1745815806697983e-53,-3.2974321035493776e43,454.0,1.0239042406894307e-184,-1.3914415518924115e145,2.390665355975555e224,4.692177478170274e-125,6.04004443545825e106,1.3448908476734219e41,3.828467219452998e-208,5.2338714056068686e-180,-3.857485102746709e71,1.148600356745396e-102,1.1059714848647962e-173,-2.9514191713691728e-36,-2.354151467732192e121,5.912342816900283e70,3.042467685848557e-225,4.0406142553927797e89,1.1658668013186688e-227,1.0685828788183727e-119,2.828381169317061e-47,5.821694341154583e-144,2.8987901876121376e104,5.299604413345437e-40,5.294268301006657e-83,4.277819579811953e-89,-4.444124790477866e44,2.4735724209098695e-43,2.795798590696474e97,4.832831782357432e-211,6.188000377702622e-96,1.0e74,-1.559454552826109e145,-2.5358232666301245e123,1.4345838077781877e66,1.2549088035675444e-59,2.2889983476874696e128,2.0875197646938785e-42,-1.9624909659545252e232,5.376658650024033e-43,1.7090310362219282e176,6.252074834689986e-95,4.565376186997809e-5,-1.705817281795782e20,5.776187239926083e164,9.197759125271248e-26,-8.140274938683976e22,9.256338333163335e-189,-3.622557586593623e15,1.3552527156068805e-86,4.384008168475723e-158,2.1326311181047387e-105,4.698343280095679e-202,2.484825583749579e-150,4.1268058125895703e186,4.076725803882012e20,1.399896208819549e-169,2.1265875210717605e101,4.931451447664567e-170,1.8810452568386517e118,1.0,-3.831238852164722e-214,6.6703769936660215e-40,1.4547228635435373e-128,5.718889434957708e-18,9.238693270866246e-19,-1.3785543700192278e-141,5.514502658272491e-78,9.504131829385634e45,101124.0,0.00036443148688046647,1.130793603011504e-48,9.687944344754108e109,1.3505757016489984e16,7.636764825868523e-46,7.802813853187782e78,-1.8012031971527807e260,-1.3505716867088321e94,3.552713678800501e-63,-7.290296671268298e109,3.0969397947044253e-44,1.4279069940540745e-127,1.1376867686931277e-84,3.6226547572060636e167,2.9609383880524597e-243,-1.4677990382109098e-72,3.6343632130624e13,5.072782185431693e239,5.944573274904454e179,2.4289269000733566e-201,1.0,1.1274893053793858e-128,8.613225507217515e83,6.5939264e7,1.8820065978765804e18,3.5545769834770186e-208,1.7045681489476727e117,1.6157031008261902e152,5.278156217295509e-40,-337.0,3.698015110048453e-129,-3.236443167173075e-185,1.4000637305307552e-85,-341.0,3.888862436320503e-82,-2.596931111031526e-124,4.028539283434328e-47,1.36199208348374e-113,9.968042057239112e-130,4.649831132055069e-47,1.0e66,2.7369110631344083e-127,-1.280470242952174e-146,2.8062065688159964e69,3.3238158164606617e66,-1.0437018697741971e-153,-4.318530719460205e99,-5.121430461272041e-212,6.146376546052394e-26,1.1794063195329573e183,2.0755624470641498e21,1.1581435947655156e-140,7.494886002587645e-128,7.031948251770996e63,5.5275825196326215e57,1.195359622141016e-206,1.800814096e9,6.167867639844978e-146,-3.080547791633842e-8,-7.597395984775307e-218,2.4929543171634363e228,1.141050300130246e-250,1.0e47,5.857976788534999e-122,1.803948189292646e69,2.102961800170144e-147,9.884619866839922e-28,7.156392999963461e210,-1.8722711173377878e-122,3.8725919148493183e-121,1.686354296889271e-73,1.6284146065477187e-50,1.3153640450854424e204,5.409326596390359e-114,-3.1993248854719036e-34,2.1761646479623053e71,-1.022492341419399e-88,4.8053246152589376e-172,1.0759497440753503e-13,-1.5936534859481459e249,75625.0,2.887794759254751e121,-2.465190328815662e-32,-4.327307460137244e-13,-1.8365137792873516e-28,1.7668470647783843e-168,1.143658360505103e-224,9.79962155828921e127,-1.404928e6,2.213136109102895e128,2.794480041828102e-123,7.200460719016721e68,-1.2514843328062636e85,2.7459757256369065e223,-1.5220419541637587e176,-4.300105060800789e-247,3.2349348277037107e-64,2.8905075731298415e-5,4.134694875587424e118,1.1121453189981557e-126,-2.4020752005182272e-19,-0.043478260869565216,1.541172092726645e-194,7.443715718316722e-179,1.0,4.477456e6,-6.770713041815637e-119,3.1923542345517515e163,7.729423825280907e-123,6.588589782757454e154,5.5152703075399535e132,2.9103830456733703e24,4.36057879022312e-229,-3.667812547332803e-170,-3.647299637717079e19,1.1056563913638198e-208,5.016363056519586e-224,0.0007716049382716049,2.1064311237083896e-249,5.356970779260746e106,9.622645794120774e-124,7.507069041779798e-167,1.623155205795438e198,-3.965775492162907e143,3.4166045423242327e27,1.1121566372084548e-8,3.733244086613395e-83,8.408003947062974e-36,4.46751930891277e-104,-1.5540235405865582e-249,2.675515033564792e-202,8.767700496e9,-1.1803560505346788e109,-2.101274396015653e-207,-3.132419797556901e138,4.4449763987161954e43,-6.57167899128604e-27,1.8883154311157054e-191,8.23312893356535e227,3.454165469310721e-111,1.2225851048310261e153,1.6373889428668433e51,1.068689209132846e17,2.3766187499075315e174,3.351271032952558e149,-1.4277391541189104e113,2.9233388012811984e200,9.289023787466063e-56,1.1580119490647241e210,2.684386721719036e112,1.542536476585424e157,2.1929930035659907e-171,8.543601463228423e-140,3.4100455494788584e175,1.3709035024110565e-132,4.962980140762846e213,-1.6506189852871478e-236,-9.154977706882269e182,1.064233820380068e16,-165.0,7.588152479295541e56,1.5499913658250822e-239,-1.357991169205433e-29,-3.911449611730471e-262,-2.996577013705012e-250,2.2593554099256586e57,1.4129460762709348e-69,1.6674148124964932e59,6.582246890745302e-50,3.008906556574325e172,3.958838631334049e-48,3.4278097229433294e-222,3.890785498307374e212,3.5048515220250395e222,2.8170929024481563e155,5.672599916152157e-80,-5.504960228005916e57,-2.2727195681565423e116,1.926243395179859e-256,5.734665881745385e-87,5.28029013288053e124,1.5361851262105825e-44,1.8275843155878144e-220,2.679335894699861e-231,-4.3659144881633695e107,1.7804634832346006e-89,4.711435896608251e238,2.205406912178845e113,-3.858586128748222e-60,1.741439150083009e217,3.7553674644104205e31,-492.0,2.5760826587930012e72,1.5513282159785157e18,7.745855315756935e135,2.2931181536377114e-39,-4.659066618217293e-166,-4.422335250084189e-161,9.839755891570132e155,8.898083278513824e-136,-4.203425910902084e-115,1.0152559799477064e-49,2.8522078352923023e254,-1.2068556442365855e-131,1.2977914010875788e-230,3.8806720086016e13,-1.1328426158852594e-12,6.319638369734235e45,-8.77656786828322e115,6.077945985085982e-141,3.0323682702257e13,-1.7137139186242184e54,2.0176194526733785e108,1.100746603431204e115,1.1467399785753676e101,4.371242174656975e-70,1.8092513943330656e75,-4.1640240902983145e26,3.804041442211315e-136,-5.521397077432451e70,-2.25465881290156e99,2.2510317127587927e-82,5.261783246973182e-43,4.0461838826590517e-134,-2.8421709430404005e31,6.595574490753304e44,4.859868155557014e51,2.3607539206623736e-170,-9.45620389081193e-34,7.88622157982566e32,1.5038296593166285e157,1.6225882206929357e-168,1.0462018793445893e29,8.531768587031053e-205,2.3000349300441266e184,8.64383416343777e77,0.005714285714285714,1.1908442922292337e111,1.9791198414758153e181,3.5954913276823675e-67,-2.4379168015552227e-69,1.0490513433082985e-219,5.093272914057919e-206,-1.2714397083400684e117,2.6121216119563044e34,2.1790223513649018e130,6.289006022418413e77,8.618437304367543e127,9.488482852827831e90,4.6597736490533795e206,2.6027627268034e-33,-5.242043433590512e-97,2.9216340432765585e-130,-7.280950111025847e-65,-2.8762264363415724e180,4.052650622296275e65,3.7918542283123393e95,2.480382907884688e167,-7.974639318833499e-162,1.2960599742776872e124,1.1030827775233042e37,5.191079787537492e-92,4.3370171654119237e104,-2.036158495870753e47,7.410562204840819e222,3.70762614665536e-210,1.4457641431676835e-100,9.535173237312719e-61,3.581579587012951e134,1.1561881850723077e-70,2.2444239770309326e216,-5.684563198291718e208,7.013957054824499e-172,-3.3233623260686268e-180,6.294136672738608e-185,-2.2851280378922897e51,-3.0644079856318793e237,1.2028235545151607e-45,-1.9831865149442214e127,2.8193875964268837e-75,-1.7653971371876526e-114,8.149852199288381e105,-8.38920574396489e203,-1.448908652612274e-70,1.1352662333458661e235,3.619446284683405e133,1.2112248923656564e-36,-1.7195833842956852e146,-1.0,5.480051517960155e-113,50625.0,-5.69246737641031e183,-2.3251066191141235e-177,1.7363489004615956e-133,2.928238357340633e256,2.8398241e7,-1.4953611417797704e-73,-3.974871490635164e43,1.6445204132379186e24,2.712560874271161e-28,1.941009452930683e101,-6.739133422845425e-58,2.927308763883953e-135,6.362668535135772e229,1.3914015279500242e90,1.510305449388463e-62,1.6137752042885319e-167,6.089870465534364e107,1.9260813958465467e191,2.6527093393149164e-195,8.210680586820453e43,2.5574147785099092e-217,1.5241579027587257e-20,2.6051999288253567e-166,1.951011509612072e228,-1.482810208046426e86,3.709989670123306e-162,-2.675291490760642e-85,-0.0028089887640449437,1.16082665215718e-16,3.616548304479297e90,-3.0452159044683653e109,2.2583498575116794e-128,2.855240993068706e-151,-2.651711400667838e83,5.894267043591157e-130,1.5760019925422246e83,1.5408595076152843e-237,1.7966395157533204e209,2.698255406160302e-37,2.5808621098934926e161,4.344887457250498e116,3.516771858481659e218,-1.5777887306843631e-170,9.197044254545976e-88,3.516987778260727e-31,-1.2056543086455309e156,2.9403194823800778e215,4.953295453949298e-70,1.3841287201e10,7.079652000148472e-176,6.2657874821779706e66,1.962702428815417e-62,1.2256104364674591e-219,2.0475140625258165e38,1.0366639573842081e-33,4.2831552699725576e-235,4.0862261851436845e-153,-3.9979041634127436e80,1.5242317908809012e122,2.6347753493154457e180,1.0721172396796876e16,-1.0491077865690155e-145,9.856093076986727e106,1.1822950927118475e108,-5.222926164442303e-112,6.455389505946912e-240,1.5238027199391582e-38,9.602263334287979e150,4.1785118500227024e30,2.6855264331265817e-168,4.095662083504698e-214,1.4527874207572734e57,5.3416787348031897e98,1.0032108309139847e97,1.099511627776e-28,5.054470284992938e34,1.540113384017583e-109,7.011372354671045e27,5.3853151438531864e-71,4.879681e6,2.0518617835171597e201,7.162129354503832e139,2.073546632761101e174,-5.464253706572926e-94,6.1115711847248e58,4.091422779894665e132,3.146566434785527e123,2.6933557160683244e143,2.718902827955341e58,1.6637847043280755e167,2.4714229314266844e-159,3.2052573357197937e-131,-6.71766158220185e166,8.747028833977241e-85,1.1957819913508436e-128,-1.7367732065932127e-92,4.644394372036314e-173,1.0538994761042152e-56,4.466826916318129e241,1.6423977066398384e131,-4.3397245396940215e134,1.9303801107040465e-102,3.373402561e9,-1.8007217994211705e-89,1.679616e6,-4.272843346683979e27,3.9257213028523965e100,-2.328881410426659e205,-8.144657994462424e-138,7.968419666276243e95,3.1395935934675815e-223,-1.7130387309244166e-63,2.8857530627932757e-214,-1.127744448690298e-24,-2.849155422119288e-17,-8.638729346088976e121,6.136870651828272e-165,1.5502896224630255e-179,-6.841679578842749e-83,-4.594046478834318e203,1.4780882941434593e118,-8.384050896251661e-214,5.667147711989789e177,3.244989320350106e-168,2.4456224252302988e-146,4.604974387365754e156,1.8952405912298895e198,2.0214682042970092e153,2.7479019359649403e-193,3.19277809664e11,2.5151321458475863e-108,-2.3865913636048284e-114,1.0893509503693762e-55,9.740648597704425e-10,1.0124910163088194e165,5.543462573739701e-234,7.560723913702518e-186,-2.3108877928871082e-148,5.372968010960102e-184,1.461113243120804e-146,4.2693088705550744e-132,4.753713372307425e77,3.2881480950588553e-24,1.461741133436331e-200,7.545694094195734e73,1.1174998795034495e204,-3.138601344486335e74,3.2739072343989713e125,1.939669908097593e-70,1.102087355745856e-242,1.876203514190231e-93,1.8007217994211705e-89,6.327518887936e12,9.481239046756173e-115,-6.349079175177877e77,3.3784870782384253e-75,3.4497150027396234e-105,1.5691934201307805e-89,1.6072672119420665e-250,4.790992956391915e73,5.982455321679379e-124,1.3540874957938542e-103,1.0202722124728001e163,4.505994246009694e155,2.9230872893839216e234,-1.0e-53,9.464954680794541e146,-2.2536201356961856e158,-3.0890226159276696e-224,1.8486071420280257e-233,1.1558126740400053e52,-2.991801813007981e-85,1.0671895716335937e100,1.6333784978859933e-110,1.9134336836317945e-149,2.251799813685248e32,1.4117952358602387e-158,2.6467817116226427e157,3.69988485035127e71,5.698711679937346e-80,5.668516148386637e-227,-5.749913952616156e193,4356.0,4.55867388262855e-226,2.831180005211264e63,-1.6811282773058973e31,6.24378583339446e-184,7.396254673890377e-244,1.810300871654797e105,3.521724309520604e119,-6.730270901655748e25,-1.5929820515738003e-27,1.8868750739850685e-82,-1.2234890693156112e229,6.599621563549118e-27,-3.2325790992917455e41,-1.1799387262176727e-196,1.7834832371673265e-143,1.5853642946937727e-94,-8.32794022403233e236,-8.4955562348047e-176,6.494469366869833e-180,7.447955758724662e-71,-1.896874645424887e-12,-8.985115557115144e-128,5.8063579619683555e-6,6.847188950870441e110,-1.0529291230536878e-218,4.096e-33,-1.1626856740892845e-79,2.248392813428736e15,-2.9740684281514327e-118,-2.5101386136969097e146,3.486784401e9,4.6371867792637963e226,-3.9135393e7,3.251953964819825e-210,4.281453159789004e-253,1.751190959856094e144,4.42234903641012e156,6.122898872353092e81,4.637763968838063e125,8.999457113259414e39,5.552612652256858e-198,-4.2657495971784524e105,1.5570377123241493e212,1.6837782655940093e17,-9.539621664406901e26,1.5821144859713638e-45,1.754162109810743e169,6.691380508457012e85,0.0,-8.424983333484575e138,-1.3676450358330249e-36,2.5462949704181077e-208,1.4329653645048358e28,2.6293496621051985e-140,1.666423588439614e139,2.0478233076143568e-168,5.5728282469198145e-11,3.947450932508337e-139,4.0039036788198385e-127,0.0003188775510204082,2.7412139406178297e101,8.531249816380459e182,5.102276663229473e86,1.1232143047735168e76,-1.55237467680566e200,8.795726424283991e44,-1.0583042802002924e-178,1.2741822060587237e-121,2.7287726955797995e72,-4.481985578448458e186,3.117569190984975e197,2.887099072819926e-157,1.9807040628566084e-66,-7.510556292462439e37,3.4359738368e10,1.2403571852462386e-97,1.114630437411196e96,1.0157479192849739e149,2.5918789889388577e-123,-1.986016550430638e-43,-1.1503197851014603e126,3.5712390371610675e232,4.0206857785451036e-169,-7.410030525074232e-97,-4.859882551058738e-87,4.491949138056481e-260,9.410701066284775e71,2.146805339268875e120,-3.28059050447783e-215,1.534734335095913e-47,1.762005758938444e68,-4.99071688515872e191,1.8859407204572062e199,2.5011043612834604e93,6.0242241375753646e169,1.0210839902050034e-199,4.41876142344501e66,4.7683715820312495e35,2.534270016750697e-86,-3.836971267351948e-44,6.015986956960381e77,-5.334653059759558e244,2.1113776745352554e33,-1.0561841695560998e-187,1.4112012153063268e203,-5.288008500117217e68,2.0248745068443234e19,2.5307453112648025e34,-7.375298095275861e96,-6.57238464908921e-17,1.6739225597890745e237,7.42494689391287e-186,-8.126550871304043e-161,1.049527454661454e-15,1.065468998279219e65,5.698430539924987e-222,1.9635395938031076e-92,3.13316727363135e223,3.7698912575375383e232,2.4792453443619997e133,6.796104543865879e-43,2.1447806582724872e-206,-2.9120583886702654e76,-1.5857012914994842e-71,8.214449910470739e101,3.1335079212635863e103,5.437968250039915e106,2.6559327339007225e135,-2.075035161943814e222,8.09869420623701e-61,6.242202322650738e72,4.7511917670095836e150,2.2599223762681557e-19,1.5226285989229641e144,9.633545011219501e17,-6.5610016305162575e109,3.253537079341569e-177,1.965048198399561e72,-4.362966876108574e-35,1.7747011762264168e-65,-1.1314279664221366e67,-1.2748959189470861e135,3.2802129431479924e-236,-1.0923169535033774e-214,-2.900813516892623e-12,4.5794196830133075e-39,66.0,3.690174915714459e-80,1.5844489931029175e-33,2.682722413286248e-149,47.0,-8.736530858124507e-80,9.14828804639755e196,1.78405961588245e44,5.0646134085709414e-220,1.3517857261119014e47,2.2732585999991324e115,6.427008870450312e-64,-6.588873714519077e-174,3.5484106675363846e183,3.8198269835454764e-88,-1.639897806335582e25,3.619209906631743e155,1.7026785384963164e83,4.778209346999261e42,1.197803021061538e185,3.393816998335944e-155,2.605251767996428e-103,-5.846739875189567e145,9.431410183848475e144,1.3981955542183506e219,2.642300264148945e108,-4.376630903760447e120,5.5071697736180695e-104,8.073252724070873e-174,7.976644307687251e46,5.877986902994176e-52,1.1245538250707999e141,-1.3264435183244002e55,-8.804129698329978e236,7.8539686037963625e37,7.3051839571079745e34,-9.478330182265864e112,4.668429731209289e-210,-4.50090452773711e-46,6.646347292115641e216,2.1575787622440268e-197,3.697530615957518e55,-1.4861875941485246e209,3.1223603958088567e211,9.192572641818481e92,3.8482994789737965e-65,-4.173894247253222e129,1.3787801716513662e97,1.507986482123145e53,3.3600614943460446e34,8.080511889888145e-38,-9.546242870944663e-70,7.520870014085348e32,5.011827921025773e81,7.335456529979006e-77,2.6727647100921956e-51,2.5944999357930523e-115,244036.0,-3.586296759485799e-35,2.542721074321806e-199,4.645084098055695e253,-6.924235905385982e22,-2.5927889180933876e167,1.6928927393268313e81,1.7228747682630183e53,1.7196982334549857e-26,5.311486196497178e76,8.507059173023461e-89,1.0832123492886177e227,-3.996561798506899e41,7.447262003336439e-251,9.38190889754664e211,-3.9699049692692294e100,4.060706939705039e-191,-2.656704112192517e193,5.548590493324e142,1.4345288065781155e191,1.2268240994128212e34,-2.108486151242097e-59,-7.740489148688861e93,4.1657000083389306e86,6.022749712405905e-163,1.597536736917068e-115,8.808029619814058e101,9.989729521883139e-49,3.93718326343309e-27,1.811151214619756e-231,4.2176211220490845e-84,1.0602851263146232e113,2.6528633966652927e134,1.159927609778892e-168,1.367481665277832e105,-1.5192908393215678e-64,3.729910964100959e172,4.3237380096e10,-7.754219371950386e-164,4.0794917954274785e124,4.350449374615574e215,1.7764879426851642e115,1.0786639392077158e-80,8.151835327659975e97,1.5212770786514007e-38,2.0665792043609358e161,4.361237978927558e156,8.088476487310335e176,4.1371966801e10,-3.17541337968161e123,2.4448598769809e86,3.096118220991154e117,9.961716016396214e-62,-6.243340341680362e-196,5.971529764475702e-236,2.4922734574110662e67,3.8154789621459647e-113,-1.3184630482679825e131,4.225112750480353e163,2.3146298649344526e159,8.115282064127262e95,1.5000916390489024e-31,4.496514586534189e-93,1.2449449430074295e22,2.3386828413389297e240,-4.066654776693088e-206,-5.560297121638573e-43,-1.1986577347744658e-247,-7.721358810418392e96,3.376223715148458e-149,7.049026715491905e-129,-7.561085317970649e-166,8.875180874254874e90,3.8574979666917185e-87,-2.075315008446915e-30,5.739444170351919e223,2.853745728689236e18,2.5684498333757963e134,1.0,4.0934328984037186e198,9.72241674323628e67,-9.658496786487254e-199,-1.7548409360536147e-34,7.893886627217005e-82,1.719586606529702e-158,3.104327052953852e138,-3.892423893171425e-16,4.087424376796921e51,3.9433339845471746e154,7.358750657867182e-207,1.0511683043059412e-182,6.91090339028658e-167,-6.486145655571065e59,-3.3522908615337067e-38,-1.3262577380565327e208,-2.274244200166003e-180,2.5160737381238802e-234,-1.0989194781325795e81,3.52204193842627e48,5.623011039495214e161,1.3317709346804758e-192,8.738698338237915e-70,3.2048748514356416e235,-3.919566926736607e-212,-5.014776470097306e-190,6.755118686118067e-9,1.215766545905693e59,-1.1800846559136035e-90,6.640859842325163e-41,6.635316872174918e-17,-1.5111572745182865e23,2.917758494945447e207,2.72108883273253e-149,2.18960476581758e-77,1.1805916207174113e21,7.46330654361555e136,-1.264711064210306e-109,7.30505658114782e-144,2.964366042644977e-10,1.1528508353537054e-109,1.8266838393200515e-114,1.2116136914283524e-202,7.099912164217204e-83,2.2754206755088684e-84,-8.395903373129792e-143,-1.6601619795043792e77,-9.632563645911217e163,1.8830479860453905e183,5.310011988900488e-37,1.1157129972091781e-172,1.1446479562634847e184,1.1001459119531233e-134,2.8720313685825044e-127,4.260631322896114e85,-1.5976176588888923e-131,6.092861219854839e-136,-5.299229316993261e-59,1.959256386111319e89,1.0027860709531471e111,-0.002849002849002849,-1.3651919e7,1.7987512430528313e-215,-2.4957013606525314e108,2.6772828179797126e-74,-1.281156222598269e-139,2.79936e12,4.8192741377780135e-132,-1.834330501877135e229,3.1438379858624954e-135,1.4984821985080598e179,1.8364037454283572e164,-4.792706858912879e104,6.392772361844031e88,7.033586355863059e168,-1.9684242637429352e-82,6.74160287120219e-238,1.1351888925823556e50,5.50646211842171e74,1.712970546900924e-135,4.618744678227376e-118,69696.0,2.9103830456733704e-11,-1.8126911270431076e45,3.1298678735824695e-64,-1.459801076167808e43,1.9869482337892964e-9,0.045454545454545456,4.975291045702017e127,1.220065261148587e-25,1.6024197201489264e66,-5.665537070756121e-68,2.1247030083708905e27,-0.011627906976744186,-4.4482073252328986e-98,1.192533292512492e30,4.696684834970684e-81,-3.9004696490397284e-200,2.651445867469666e-147,2.654188978155134e-113,3.435734144131949e-111,-1.0578904190696487e151,8.361524648223831e114,1.2037701645091998e231,5.78022172776434e120,-1.646900990275966e154,4.349505358951975e-230,1.889083140626429e-155,-1.733427416011959e77,-1.3338866612473718e-168,2.0463649236043917e-35,3.603967168580183e49,2.6823074313536333e-17,3.333967161725509e-43,-7.703779066869754e18,1.152921504606847e138,2.7422072928010273e87,1.6553881186438597e209,-1.8347356390399155e64,2.340851484035514e23,2.628336861755597e-185,2.318588202311413e89,-7.458311245261372e-111,-3.13115780297159e-35,1.8079976563956517e-110,-3.022314549036573e62,3.6303621236272586e36,2.214076149219113e-152,2.0540394968987946e20,-1.1291616358441069e72,1.215297768882152e-208,1.826283877565929e-5,1.875690129533213e-195,9.241342708684339e-181,1.3730351676091174e119,7.751340012438838e195,2.070016195075967e262,4.367532584706749e-224,-1.287759084678835e-93,-3.233727590385176e211,-3.154822635044853e171,6.204126609655277e59,2.672670610386168e179,1.2852183368996825e118,8.674149068844546e188,-4.009069189685058e-23,1.029181725786164e-87,9.446207079366646e-179,1.6840616391273128e203,7.937687297828036e113,3.186635545324935e-11,8.005476734463796e162,-1.6715571639605515e-94,-3.604152961733775e129,-1.2952921661757254e34,-2.021244684773168e220,-1.017069595314314e34,1.6990110651601673e241,2.9906234003171954e218,6.080800164900881e-25,1.2876678084507374e-88,1.2422207630100688e-143,1.0e-186,6.258579986892967e-108,6.937325246092254e234,-1.2709039188045877e197,1.3197445257294737e-44,1.2536600121886846e-23,9.852612533569336e19,6.523636160131781e178,4.2119490672827e240,1.7420735654538585e170,3.9564496803106655e196,2.2511321386005542e238,1.974145024154076e30,-3.6684454647601923e81,2.5194463459916754e-10,-2.43e7,1.2086058386932591e123,1.0828124103295972e-6,1.9839138075847649e24,5.7624084321308165e215,1.0148132405517315e245,7.52316384526264e-157,1.0201739881875276e80,3.134956550459527e109,7.657620615851533e39,5.645777374837735e-133,2.8449520093367358e-148,2.7037638262714966e57,2.4549114341476676e-178,4.5188139073037086e-101,4.087467948333959e140,1.741856621600566e-227,-1.493762074013456e70,-3.796416e6,1.1332952598036767e169,6.196147063758909e-120,6.630063828881545e-227,6.310650652819554e145,7.37639492824692e-45,-6.803931267119301e-30,-8.834369391333904e204,6.785642546800396e-58,-3.754919597060124e54,4.553254214182471e-139,5.830610946377727e-187,6.793842117827278e-94,-8.683388665562843e48,1.4624608902260536e57,2.369161788897633e96,null,3.0491346729331196e19,8.920298079412249e-103,2.082400364893196e196,3.4376371421902e-68,2.219072469768809e-25,1.4455147912049732e193,1.0553687222478001e237,2.993748487539313e75,5.954030997028688e129,-5.587175986107695e88,-4.82453024504829e-180,1.0396601529182993e-16,5.083309851403537e-137,-2.1188518189233323e-177,8.293509467471872e26,1.4542169685585075e-223,1.0492419814680368e44,8.481631423210552e-62,2.7920663954312504e-128,1.41589578857238e-249,6.778096808321416e154,4.861114069341425e143,5.192507550459806e145,1.902217732808761e66,1.1234275947461864e235,2.096855768872728e-73,7.3439775749e10,-3.613127674951895e-201,8.267707423685585e66,1.3661197500338164e214,2.6614693782675397e127,1.831677425371436e172,2.3072165767446665e-46,1.6266819745311806e130,1.598674044354751e121,9.089751609682319e-227,-9.342450355074155e-191,2.163556610502711e93,1.973605222880799e126,1.5751274878925902e119,2.8698592549372253e-111,7.384110092455724e-14,-3.7713691603671937e186,-2.3203615613788262e57,1.4737204874752474e-51,1.1724827159637922e-12,-1.1087108936831522e152,3.595461800933658e-33,3.605073401348433e-256,3.697139381127224e-102,-2.2316427883652055e-86,1.7398404852984655e82,1.182220796132899e-136,1.3439385404754511e38,8.920817060855938e143,1.3946676941407066e-241,5.6279535580894135e-68,-1.096998322039426e-167,7.402737005972963e-19,-1.4707000801451355e-39,3.99834221191077e60,1.4334111979667808e80,-2.7627455695102807e18,-2.7171533427169146e100,1.6206004154132292e-21,1.1238109878681738e146,-3.0242807600139165e-226,5.99762134048361e-154,1.6972507416876217e56,-4.827864972991181e-200,-7.471407574322266e121,2.1540748201805097e-67,1.09309090408793e-237,4.2961972150697015e113,4.996614068152155e-52,1.605516482304579e-217,2.6662964631846926e-113,4.558518712985422e-17,3.165543453070219e42,1.810661883269741e-25,3.4862529525534003e-82,2.881888111295165e-73,3.3333119513417296e42,2.4769670158014663e-19,-8.425432600917157e173,1.8313038084087594e-210,1.8405916926694475e-88,-2.8279286487408877e-126,1.0,1.168103836809494e-118,1.8971879554007693e-53,1.920903439445896e92,-7.493421469649955e-59,4.194478152155174e172,-1.7163859891925452e71,5.178612850171228e-62,8.763020354980286e114,9.40053275540752e-100,4.405852399722736e-133,8.429431933839269e33,4.579194314506862e201,-1.437206643179728e-79,-4.1051904156056745e-129,7.756279363818957e38,6.547418083195089e-52,3.386582643756152e130,-5.532015113763697e156,1.5203824024527614e98,-1.1915805008123449e-195,1.6367464774558752e23,3.580857489873029e-100,1.5170684821659526e-70,7.5890383929452295e-6,2.220446049250313e-16,8.018964251265688e-70,5.365737680171422e-161,9.27999922380389e172,-1.3636002642219253e-241,3.0434884783377567e240,4.741412277084428e53,-1.2936239512383022e-223,1.668606723213868e35,-6.366604340582432e180,2.81474976710656e14,7.423474937133612e131,3.3299695358083913e-169,1.472378647729757e-8,-1.0,1.3597477769674357e-120,5.73921028466483e-5,1.9978157703974892e-11,1.6567933629166294e109,1.8725579789303003e49,2.582277453521019e-74,1.171356978369176e235,3.6375132409002766e154,1.3076621311720102e-64,0.003703703703703704,7.886512161661568e-207,8.686085423059604e92,1.0191850734798107e163,3.9861429055619204e100,5.465792736173359e140,5.9921886116686474e63,2.6612051316352025e19,-5.612593744279011e158,-2.6891406670263652e-73,-4.360243168494181e-9,1.386583930686958e155,-3.1072147017524873e226,-0.0021413276231263384,-7.892689745873929e-189,1.247462270406107e-154,6.064275556925171e55,4.562648449454746e90,2.371881929783592e-86,5.1295808517207296e61,3.423683976931569e-92,1.4710834013931898e249,-6.369498668140248e182,-3.6739965086074155e191,4.419632805490185e139,1.1140858025335083e-123,1.032774905439281e-13,1.1440483984834036e-163,-3.6242555463894696e-103,4.443414301787416e61,2.8062983608075635e121,1.6863798107090295e-221,6.380642332177534e94,17424.0,3.0958100519518356e-80,1.7304530055136368e196,1.9433732478452873e-176,2.730792362012916e64,8.772780025937795e-36,4.0512512119617415e-145,3.87420489e14,-9.76337021970613e30,2.0948132012745045e-52,-3.6064913999298085e205,9.020796065961114e86,-1.5845501689806935e61,-1.28e9,5.682170953190239e-100,8.891382030705694e-143,-3.648018803576545e-102,-1.3078719465390074e-167,-3.46354279982193e66,1.4895830345145227e-74,1.2344892103803387e-166,1.2418264798680666e-127,2.0525421035319655e-122,-8.53838866360697e-65,8.916100448256e12,1.7565028883263555e171,1.234252665662395e-114,3.9450796006758325e184,2.1162217211518786e105,-1.2929087611427912e-266,5.456158704277636e-29,5.2709590378395385e98,8.676443163919423e-226,8.99616038813321e-123,1.9589354947331032e133,-9.221564624516017e175,3.1818089409657696e-76,0.00017146776406035667,2.181107959124649e185,-1.6182606405130353e-130,4.2823620817395044e91,-7.581958898578184e-46,2.4642171e7,8.587340257e9,1.6906823532529137e-206,8.3642065782059e163,1.3533667439756825e-251,-1.6041686074927659e-224,8.16668969308761e-174,5.910847038946532e155,1.0e91,-4.0018641077830146e-85,5.536332179930796e-6,5.804240316448094e-87,2.300306212564716e-41,-3.5234732319495947e78,1.7179967959694415e155,5.0114062541251446e-138,-4.898606699058048e-72,4.329728675214977e49,5.214109925066768e202,-2.477796233932902e217,-5.2190520036805135e-77,2.157906816825775e-45,8.497586056367925e190,3.036304886881606e-213,6.1457728713143555e122,-1.3528160219074084e-83,1.5411671916547528e49,1.03668274278258e-125,1.8091091294399397e-58,-1.8467317870779512e-144,7.712405793899732e-198,-1.0893100314158452e-63,4.5448193975439e175,3.411862712115807e-130,2.650768237234077e201,2.65513477621857e133,7.893112718744054e113,5.833808286903789e-123,456976.0,-3.2970548766140114e-87,3.2800233734015836e75,1.314619631840699e-143,1.1428765399615682e236,7.219920796574644e-234,2.785024693797291e-212,1.4791685426204545e-81,-1.8980151477692987e-94,1.994415167155845e83,2.7970415188078897e-222,3.619461170231157e83,-9.568893889446839e115,2.1917095105574127e-91,-3.4658371176510186e128,7.177512191501299e-219,-2.0149656143871845e152,-5.19773287780027e-121,9.81385940506319e116,-9.972216696722771e-112,3.2200209040599115e-237,-7.478434870562599e212,2.201689796680284e-186,-3.797344218379801e-33,5.008548963344281e-103,1.1419967891833793e-16,-2.7136260133506145e136,2.996540973167077e-170,3.3378652764408604e-188,2.122241655881463e-10,1.6128642568988758e-11,1.588600252305808e132,-7.64202985091698e200,-9.17215374783551e208,-2.635621445482195e182,2.8822304397940415e-149,1.3188699918961973e-230,4.620680728035369e83,1.0257369912147141e150,-0.003003003003003003,2.2074727750968372e-129,1.0144831001398528e-112,2.0335057260830144e38,2.5177327018589863e-225,7.400818807345214e118,1.7140986770225674e253,3.968787582993817e59,3.0095665135581155e-37,1.3103708499238998e221,-4.407573749830106e-136,-4.006345830046464e242,4.1263525521897864e41,1.4666449213156307e57,-1.7674132351663937e75,5.054055629346729e177,-7.180679326054222e68,-3.720389788857393e220,1.0,-1.8876201495392306e48,1.2650860024385251e104,2.0976497180691993e-29,1.0263307009395375e-188,6.014812574991032e115,2.858290897143385e143,3.4443270763878753e-189,18769.0,8.251962438094262e-251,180.0,6.175232125089868e-89,4.44907678403413e-74,1.0,1.3926701872282606e101,5.2974340776411985e194,7.942096491250022e235,6.934334949441339e-30,6.052948677551519e50,5.450258468237626e-193,14400.0,1.6632655625031839e-203,1.5943338966004592e154,1.9235553178706965e93,-8.569125894176e12,-1.893261059043491e170,-3.5917545547686056e40,2.4607717929543914e-85,4.437825652519891e-102,-2.0478465748387756e140,-4.299543164137355e-117,-9.864138825213927e70,1.3502113586341669e233,9.908114001366597e-40,-7.30505658114782e-144,9.796545327180668e70,3.1142149635497825e26,1.2919080187191878e-181,2.7528261676517244e183,4.002657616354135e67,-1.0231337619717215e135,-9.906209824429228e90,1.2041952489017667e101,2.8333625549793265e217,2.5730459988271707e-139,2.8816420087675705e-120,2.6984713164870502e-129,6.235242834706799e161,1.874145853976911e-42,-1.0693002293397865e-115,-1.1517742122865812e93,-3.613202038589565e-229,8.053252117294803e-38,7.237005577332263e159,6.70733952276712e-200,1.0,4.304401231146718e102,1.3076808361012056e120,-2.039655138372652e-8,-1.4609631660508703e-106,8.285995137658448e130,-1.6991382369329274e-185,2.6764843375020507e194,5.769800872554178e105,-1.188128295432533e-141,2.1737991576965775e-53,-1.2550426372800406e-240,4.0986027896235443e160,-2.7868935203049194e224,1.4984821985080598e179,4.95464271203109e-38,1.0,1.0e122,-2.4623456937494646e-153,4.131500148348396e111,4.3768592669187267e-228,2.5719970407685146e45,2.2876792454961e27,-1.488884660647311e-195,-8.32794022403233e236,-8.955994507985338e-188,1.0198184569450964e204,-4.0413102997821734e-137,1.197251518256202e82,4.505994246009694e155,8.033953524956265e63,1.3938696110832254e109,-1.8781115915190626e167,3.905123095399048e-115,4.781279518248021e-107,3.7057337266426177e-177,1.1267558900412042e-9,-9.989256321555372e-173,3.316503882063735e-177,4.140940075016279e119,1.4999552023674095e61,5.908715885039629e-98,-2.386936986901267e153,1.1579318111583376e-75,2.1379964887392876e-29,-9.025394861761184e-16,1.2768477796169691e70,3.74340804429779e-103,1.0462018793445893e29,-8.997585054207724e256,6.238539461977905e202,1.2362621070895083e-75,1.0639247079868635e-215,4.6687070339688365e115,4.675540112180131e-117,7.956016328098869e-75,1.6477313620071304e-97,2.0880191490429767e200,9.754589891297692e-78,465.0,3.189059870763704e24,-3.695566645503654e-154,3.551976741871047e116,8.689483270212904e67,1.1217797326957438e127,1.9407927843770923e38,6.488548437830603e-211,3.6570102263748113e226,4.276423536147513e-214,-5.066001503804927e-94,3.168161821988771e-16,3.1003885257622137e153,5.322520666352835e-50,1.4141304781578248e-42,-1.4146264227340707e-137,-1.7523625637893633e-45,5.216744426309482e-59,1.0090709000751879e120,1.0663227198699633e57,4.041051279379084e191,2.4508295755540108e-19,9.820932121046251e-73,-1.1718501327371853e82,8.470329472543003e-22,-1.3248496640331026e25,1.9039151106286295e-18,3.911449611730471e-262,-1.3160933018348088e208,5.134446072872629e-240,-9.289023787466063e-56,7.687257198755865e19,7.045938956758966e-117,7.475164554190307e52,3.548330270358176e79,2.356066050404773e-147,-1.9605522625204212e-59,1.7459961280780148e61,3.3600614943460446e34,-1.7662104043838009e-156,2.597430783025711e238,2.381967894993361e-189,1.3649393215849645e-78,1.1558126740400053e52,1.86374892382561e14,4.017505090832318e-142,-2.1732176165952507e102,-1.2050502387712604e215,5.991301262145878e-164,3.734336546712282e-12,2.0599713349502168e126,7.595032829768403e-141,1.412748905205934e-146,1.5968497963104503e-47,3.61513014321634e-155,7.902397658745982e-213,1.3614752520961102e88,8.867441991786533e-130,-1.6863798107090295e-221,-1.3089176335757192e-125,6.376900316294256e-6,8.591976113815863e176,1.4511350929531545e-141,7.682608097935962e215,5.08136542082791e-16,6.810549578018976e31,-3.65832220237909e72,5.352603401198575e-126,9.701723378487217e97,-1.1567205575347472e69,-6.6873477721228316e72,2.6612249000050942e-110,1.4166495470902425e-148,-2.1217798211789754e28,-1.3564091110079933e-167,2.1754821808028498e-104,1.3560717144022665e-20,2.754341063237231e-28,-1.2443437214230463e-117,1.109516070491657e-196,1.8195033004339517e143,3.001004867431426e168,7.9171780525443905e62,1.2257822607424633e152,-7.439637880312187e-81,2.1797015398677387e-167,-9.83151615681274e131,8.441057409767354e-147,-5.639767788861279e-127,-2.2352115740714383e-191,3.9070143689458004e266,4.026063652913276e153,2.8636131797710277e-80,2.3935021703008616e121,1.6329566709064452e-190,7.599473750699206e135,2.5200454453911144e153,3.7414441915671117e-202,1.1451664293935147e172,1.6309853035206273e-40,-6.37091591773205e-116,-6.569365979387593e63,2.436112440507363e192,7.180406789903264e105,-9.297222253682961e38,6.9707800392690455e-214,7.20987322630113e108,-6.040236453075043e-109,7.094136420366157e-53,-3.4935436935939265e-34,-1.7782774183539699e134,6.364233800306319e-197,2.602226497710914e106,2.477236450344549e-54,7.852688400198447e-152,4.136301511811679e202,4.8316292444803725e261,1.715798011404277e52,1.4885744409311718e245,2.5874321000083944e166,1.6987939248665576e-32,1.5224388403474448e-19,1.131498566890836e103,4.578409921182168e-43,1.939669908097593e-70,-7.631980629371025e-148,7.8364164096e10,3.763184135390608e-73,3.339736286354149e117,5.917095830729734e-142,7.935150286114733e238,-2.675291490760642e-85,3.305153276637963e-64,1.0524176509347452e-171,1.988092622037806e-129,1.4926205184806728e-168,6.662463305375667e-18,6.1457728713143555e122,1.0476167432608205e36,7.420343062588623e-16,1.3344776683046925e132,8.310956853613708e26,4.913055840770765e153,8.368317045959333e-256,-1.4275371329582565e-86,3.0026729771662425e-70,3.635957345467026e-150,5.980296742980662e260,4.062785513743634e-131,4.966048621498588e199,2.4907255027808358e213,3.2765008139845067e198,1.0928215285841131e-7,-1.3828436739951708e201,-3.4770011925253407e-212,3.2157432e7,2.8033248565078814e134,-1.03501361995034e167,8.77521022998968e25,-3.358510707375272e28,1.3016111155156147e40,-4.254793624268654e-62,2.051277394174957e-113,7.267966371390195e-196,-5.661264859611544e-241,3.562548370620374e-82,-3.4611209279437776e-183,1.1479437019748901e-41,1.8725579789303003e49,1.4112012153063268e203,4.262394050078233e-143,2.9539517220393503e190,-3.3463697880682096e-67,-1.3886190444803133e119,3.911999602168468e50,1.20201156667182e258,8.184650173521423e-154,7.039988712124647e80,1.7418973579934952e171,-1.1218230244787549e236,6.629752702025397e-138,-1.8014398509481984e16,3.825126053457805e-63,1.0041167999295699e-32,1.0366951723295344e-175,6.098580919021102e-185,-8.304301158072215e-102,5.839916592521949e27,-5.327741133601027e125,0.008771929824561403,6.317791461533752e135,-6.476085743698083e-111,3.086674194665581e-209,2.637644565200148e-43,1.0302335570296712e-232,4.434602543174607e-112,3.023584904514026e-217,2.240732603516703e-42,1.0,9.958585721416499e63,1.8996165447586266e105,3.4512070935084746e107,5.726585084488642e-198,4.420451221666396e176,-4.136248434307502e-216,-5.792740648186159e-148,2.0316228041228776e-62,-4.178866707295615e-24,2.565726409e15,1.856901542969872e70,2.7890333932602797e229,-1.691944960315113e-209,1.3539910999484297e-78,6.958789995316135e67,8.661664251166632e-126,1.1084881387760256e-175,-1.1712231651673877e36,-3.0255995020875895e38,7.00002399155659e-84,4.167873495960859e109,5.093206056734871e112,-3.94224338466282e-159,2.306295052333902e-33,1.4588141929393977e-216,3.0140817901234566e-6,-3.925992381863992e-228,2.781484298773042e-89,8.289762679403222e20,-3.911449611730471e-262,1.5818724906037874e133,-3.5336657185622825e-94,-5.945412060564216e101,1.594244690557877e-37,5.513936138036264e-184,4.5998653654474e51,-1.6295673148923967e-89,6.30556131715518e138,-8.4637253544619e-242,4.719128389022692e74,2.820559860625204e65,1.4322738368257098e120,7.735540101454284e64,4.1670672597772565e-223,9.03632847205867e-130,1.9342813113834066e-101,5.217438085702096e-255,1.618238111729859e49,8.953382542587165e21,-7.01972290237512e-226,7.790301003858036e-85,-1.8244269254249278e-13,5.108717124301236e-159,2.9012884178372258e-84,-1.6362420575647877e-179,8.130915113433538e-15,2.6308690301071574e-93,4.044365211108497e-209,-2.2764394620606055e90,6.730311508673362e-193,2.270792316552077e-104,-9.307738862450733e-143,-5.929797742582085e51,2.8460896567215446e-84,3.0852165939525755e-140,4.4298880042271117e-197,1.018592412629782e100,9.186620518429499e29,1.0941229388433719e-38,1.3097723194103543e-54,-2.3790544628873904e-48,3.4176449469467708e236,-3.888691039937453e92,1.018579213179863e-55,-7.028524701836204e-238,4.934401580011725e-59,-3.59126862873657e64,3.901214743441228e-49,1.643266713748977e-126,1.8939530397595842e-72,6.267926884587154e-200,-1.1815333890343597e-144,-1.3529940357105125e50,1.5904501559310388e-34,424.0,1.620424537653706e147,2.5217283965692467e117,1.5654723241694795e93,7.640171791205557e-129,3.298689014586538e147,1.1721611973897965e-183,-3.7311784675447e-202,7.758138578352177e203,-1.115267650765474e187,5.247632551795705e82,5.4010128115478706e-194,-1.799897671921074e-101,-5.255578839248303e89,1.4097974257642134e-34,-1.8885977424562384e225,8.392496512362183e79,1.1371325345584632e214,1.5663873722528967e-36,-6.826230843278163e-26,4.8682482378902407e-207,-9.65357714852904e177,7.742226238828934e-81,4.4004710748323965e-76,8.485546799513129e148,2.5707260691986823e-224,-1.2613657326435294e68,1.0246368016112993e-205,-2.274762500800583e58,-2.7910935122435592e138,2.3714219875802357e80,6.743836687607934e116,2.3430698875400274e-216,1.5018749660205605e-201,5.448327055268375e30,1.6777216e7,-2.418886842697991e93,1.556559867556041e174,1.93902740218519e-43,5.288385132722786e151,2.5769392514295874e-69,8.143864684012059e36,7.74753607851512e-152,-3.2402606390179323e-202,2.2088708428346722e150,-7.679486706544452e-79,6.528362774606077e27,6.274671711608672e-81,1.2855459222814535e-98,1.1080074401942805e106,-7.538820720992643e102,7.739897253930378e35,5.381860976747828e108,9.89936363693566e-64,1.710619929625675e183,1.7165756301872126e-200,3.4360229316480566e-146,3.940359703958249e101,-1.152937696045839e-124,4.600093199244232e71,-2.1812091952990166e-218,9.179171308103509e107,5.773973389598657e-126,-2.7757120619703327e232,7.289395748433683e-204,3.028852435471151e-154,1.3386997828861858e201,7.988895652760641e107,-1.0005756434704997e87,2.7410604297911065e-45,1.4373662925618249e85,6.233669215980921e15,3.588388051927025e-176,1.0449567633177832e83,1.8665124495477142e133,4.935994563309449e-65,4.282500342456907e168,-4.9109819025155405e-149,7.365928141161006e-75,1.7014194520485242e136,3.269265157389848e-16,7.929734312392962e57,2.1341350653802613e143,4.6371867792637963e226,-1.576196198297613e-207,1.3234889800848443e53,4.413308534395883e142,1.0124910163088194e165,1.6606710186060905e-108,1.2333728111375871e90,4.975296194490348e-176,3.525215351764921e-29,6.256554640430905e-162,1.783377365015271e131,1.0347873913370353e-203,9.616477391361432e118,1.1039365012842444e143,4.966048621498588e199,-2.6891406670263652e-73,4.855675309532137e-95,4.704270176e9,7.544768075970125e-83,5.758548644163928e-200,1.649930537467437e152,5.772104928320409e-134,7.214278581489943e212,-1.0197422800640154e39,3.3700253469588866e-23,2.1851557259317805e-232,8.410328531619165e66,-6.805647338418769e-91,1.1655200926812836e-74,1.2062403017069896e124,6.24009020903531e208,-2.0537252264931245e228,-9.717400705578142e68,1.2217993179905852e153,1.2289165093785871e-33,1.7084821953904e79,6.612703843562186e154,1.8148033671831303e-95,2.731811534709336e-148,-2.4806364445134115e119,7.803264277628824e-253,1.8700001255949424e-198,1.0e-70,1.3656773154868964e-201,2.2277930120369517e-169,-4.695452425098909e86,1.600135042849344e15,2.5252781675388845e-41,7.103776757737162e-242,8.673617379884035e-31,2.2355790869571516e137,1.5142787530597835e139,1.087120635090456e127,6.756213634740311e-53,3.3282686520228325e197,1.0901850969594328e158,1.7444921100912017e26,1.6143136838948002e101,9.311661815110824e-197,1.5893250415505827e168,4.846925033557796e131,5.611486945869598e107,5.672570480022687e-195,8.613225507217516e141,8.132343686074846e-247,4.045269425804104e-31,1.8367099231598243e158,3.5447041512174647e-13,3.394486713146119e53,2.8062983608075635e121,-5.475368578464301e107,-1.0813534039552827e196,5.448000598296337e108,5.523346316389608e248,-6.367113821022027e79,2.0338279778693675e85,-1.1750579790576773e80,6.132610415680999e21,1.895234506580147e-141,1.664299303492291e-139,1.0429460289529767e-144,-1.772004983534609e-206,3.281143117267705e-48,-8.395903373129792e-143,6.47505406541126e147,1.773741468666724e-106,3.4597165261587197e58,9.594223831601894e-249,6.050978153807507e157,5.073261918578591e225,1.7673336195698378e-68,6.082667877133577e60,2.080152764726742e-37,1.6664658128640304e234,-2.582743254381826e-208,1.595472861435325e-193,3.5104342998525136e80,-2.6036721925606487e22,1.0e-64,5.9720186211637e139,4.592105442971185e-115,1.2362916226356724e122,5.391989333430128e-158,1.4230416308592162e-151,1.4463511599831694e105,6.436343e11,1.587741620885643e129,1.914619374447689e-255,6.937391182263326e146,3.5152125121e10,1.9693432823322977e-41,6.772523651902639e95,3.436647433540079e-41,3.011361496339065e21,2.6411946461618317e180,2.0892247776154611e105,-8.7875991300862e57,7.785846454536418e104,5.666156532573449e170,1.793900414783884e116,1.0,-2.2842790035853197e-76,-1.7910952171170975e-149,3.1799630126061663e-47,6.600240193085195e30,1.1850025278504495e84,2.1267647932558655e99,1.465967220648192e-196,2.3580318788905343e-114,1.2116734192112888e-60,-4.94235589193462e-36,2.4727059364126626e-216,0.00020408163265306123,-3.358963850880965e-142,1.85727072402576e-82,7.718069601815804e154,1.710532525505234e160,1.8707271659116184e184,3.384882032909448e-37,5.327065906127199e136,-1.1516241395088834e-49,1.5112708359629623e235,-2.692255199248446e-91,2.1091286739874779e142,-4.413487901410019e143,1.1422810942726455e-210,-2.7255249383426737e-202,1.9420999311082206e-27,2.54803968e8,1.6791058502074112e257,2.4687695836842934e-242,8.348908048276786e-182,-9.30806877871539e205,4.95576690572418e207,1.4957636076916715e206,1.6959441135667095e90,2.4062510339437652e204,3.937140468437924e-78,1.763738816614206e-43,1.4650092678827526e109,1.4660992540857594e-248,1.4736997905548762e57,1.974393065732895e123,1.1668036453508983e-142,1.229835388122183e73,2.54164611507898e146,5.06782003703966e-161,4.910847260466084e-171,1.0,-1.751989905401e12,-3.0863546727367963e-74,1.4252373780992761e138,8.881784197001252e-66,1.226433020069766e-10,-1.0786639392077158e-80,3.279972901837372e72,6.944570673722355e-158,2.0026619468035726e-189,3.573606817390109e-11,1.1287010537593592e-75,2.384185791015625e15,2.459013924107361e25,1.1198845195124545e89,3.0689938810469403e221,2.3965581930996897e30,1.4796030527045234e-130,4.7261745715123573e-76,-1.9359859611133763e198,-3.7203628442366757e-61,-1.1245552820789538e-121,2.194884641389721e-85,3.8193689842628987e143,7.471720943315964e57,5.085772042807201e233,3.6111136659740296e-9,1.3990849085345714e155,7.63034040110292e211,2.0979726860444818e214,3.6078830408136834e-75,-1.0e-89,6.054903229838886e243,5.719253878622259e-184,9.396908477371518e-187,6.218098050986103e-155,-7.42315845644657e-88,-2.427494450315468e75,2.760148394782328e-15,6.180324887569031e115,1.0744144730541922e-64,-1.365168796532482e50,-7.984714497767185e-201,-1.4857271507713093e-30,-1.6164722766894658e107,2.4054100495392192e-176,-1.0853322345627899e-101,1.5874705468574846e-149,1.82877982605164e-99,2.2892296571911406e61,-4.972094826953573e-134,1.8909876475357542e-115,3.085888438926921e-29,2.667385751111399e-164,5.637382247118463e113,8.434665493557008e-79,4.272104980668459e-183,-7.633468280889497e-124,5.551115123125783e-44,1.0841657847339396e-8,2.935635435422208e-205,2.0318362620665126e-140,1.0325409078130535e58,1.0e94,4.611686018427388e18,3.0974275867447685e-232,4.033290841991768e135,2.253934029069226e40,3.2141490408061203e99,1.2184387909487644e123,-2.074688479522319e-50,3.2764434369260664e35,8.705248201137835e-59,9.409462155143212e-6,8.921788044164834e-117,-1.200251795345148e-101,-1.834707791616936e73,5.960464477539063e-8,-2.2529821819617723e-52,5.1384602021222484e-26,1.1682821531270686e-55,-3.5743359351975033e114,-1.8007217994211706e-182,-2.3255254965315115e-111,2.506068412079847e72,6.857274360323946e90,4.632929661200064e-43,2.377468755671256e148,1.6671664701182985e67,1.815814730808681e62,1.6954876328083854e86,2.1296414114717e-64,1.2304828455747702e-52,4.165637558919039e169,1.9680290883980963e181,6.391895312050449e255,1.4591078184222131e-175,1.4018503354423014e-18,-1.0279752754386228e-39,1.917255786080677e-30,5.22024357439882e-113,-1.4062157058502547e172,-4.741446831686876e-12,7.419196278824954e-186,3.5591857757758416e-35,-2.0865035760330817e-105,9.844581332387709e-132,-5.496005419509268e-144,5.324497247744345e-168,1.2197604876358356e118,2.387997313853227e69,-8.677752071750442e-98,-5.5289797000613374e116,-4.382453573675731e-198,2.3573370563685002e-27,-7.286859802399495e-17,6.05793013536839e-260,8.307674973655724e34,1.999585510027208e30,6.439731623374197e100,-1.4307466009994275e-166,1.6568729285770237e80,7.888609052210119e-51,6.921450685940716e-116,5.577685728107907e137,-2.7989389502704815e116,1.0245272482824362e-234,7.529913325224973e-170,1.7793850954024436e159,5.026371648228749e70,-3.30625001631252e-190,1.0e76,-2.4026277635936145e-76,-2.0923728963794304e-237,-8.93773529261015e16,6.129107455219987e50,-7.778213593991468e49,-4.1465888841706624e-12,5.036985379909609e238,3.8219138864033026e-171,3.1171017629180234e-53,5.960464477539063e-8,-6.333486364541874e-115,1.2926567601491365e261,5.910847038946532e155,-6.820811010118438e16,1.0112164761543285e-93,1.67751578923017e-130,8.424983333484575e138,1.0218454479659823e-38,-3.639077882645497e-12,4.614677526983353e-12,1.563630038240946e186,2.640447180874868e143,7.67315069975603e78,9.223372036854776e39,-6.247691904036115e-66,5.537162295989872e154,5.025293639214712e256,7.53337475341747e65,1.1861738766396466e175,3.7963831231031425e188,-1.197688496161881e-13,-5.718161765682413e-216,6.157264259554715e180,2.796335291626909e-111,-0.003289473684210526,4.55926929482639e148,5.185679446871114e74,1.7980759982220503e22,5.2098684819243716e-64,1.1107041057327391e-112,0.00043402777777777775,4.468845933363597e64,3.323342253857491e-89,7.459074447264624e180,8.81858148295391e93,-4.526121453204832e135,-1.4090595318994764e193,2.0368472471318076e-83,1.4609500236559577e112,1.5059586963389676e163,1.348505851568925e197,3.405756287233106e-198,-1.1598066542149684e199,1.0521739575498313e-46,3.952917987596818e29,-5.817463478585156e17,6.734009446835273e-89,1.338065513029227e-151,1.0025773053636661e96,1.5699822734902585e-183,1.9770609664e10,1.269883239151382e212,-9.848579904728843e-158,8.025102520684701e-6,5.79871033402042e-174,5.438325600991371e72,1.0e-14,7.454003424500077e-254,1.6696776236568413e-28,1.7179869184e10,1.9578667084344897e-5,2.3474432367845904e19,3.2534097385878714e86,4.6385069570257005e95,2.090811350119907e-161,1.4812030153146025e-7,1.930763974269377e45,5.598783616137912e-202,-2.8655774758418395e152,1.1575862056398378e196,-1.8391243706880753e-41,4.897438881833528e38,1.7014915241319635e-40,6.5536e20,1.8240547258846845e32,1.2020115666718201e160,-4.76837158203125e-7,5.796747971452809e-197,1.4715768950165552e-119,1.0975472189230895e-205,-6.077163357286271e-64,1.1144672741236872e-118,7.2283218198052715e-118,2.7288475529353677e-178,2.7076852481648583e126,-3.2531569184830273e-159,1.7723793530872297e-62,6.088390402749915e157,2.9848969087969103e50,-2.3082472590435877e24,1.417500468295016e103,2.36668572712568e207,5.453892138958304e205,-3.4124221939471383e86,5.947494382951302e127,5.847853463941755e-241,2.0278432533573694e64,1.3201743411317894e-186,2.1020850181296212e33,-8.858637825788559e-36,2.491264262256129e37,1.6954777630191728e-168,106929.0,2.8433422663030544e30,3.298198290988448e-219,2.076395040014435e-34,1.2519158380921731e-241,-3.295939267293213e147,7.402737005972964e-57,-1.8061090218215462e-37,1.5504791038019374e146,3.404007930791395e96,4.4068616892651825e-223,1.0536795167867587e129,2.1362897265021787e-16,6.070697669703249e-195,1.225140675405144e-145,6.437983707576505e104,1.215766545905693e59,-9.030666937594648e61,2.7027081632e10,5.159807700666509e-35,1.6272674476899863e-255,1.2968452753217399e101,-6.049410625242277e67,-4.468009260576128e-82,6.71845852888165e117,1.9999375771802197e133,-4.815952120692483e-103,-3.4529825958221465e-188,-1.483647522020852e75,1.1963618773859218e166,1.2212689780225895e69,1.5270958660108124e18,6.124957035571072e-123,2.3544558975992098e-117,1.0988051394700065e139,8.524834255065677e-83,3.9466509070394e157,-372.0,2.4404090724020268e-142,3.059750829021717e-98,4.832147391298353e50,7.040125024380695e-55,2.8009244385633573e156,64009.0,-3.408978564983716e130,-4.8859555885783554e20,-4.751055702490854e-14,-4.013884874573151e34,-2.95596777199944e-21,1.3604954401490694e124,-2.4696213799276723e100,4.912660012666489e220,-3.5009902123519783e-107,1.9895113660064588e46,2.16035042742457e-131,1.2048227794672867e-12,1.318803193939973e-54,6.28208218492303e237,3.2802129431479926e-142,1.5501075068211597e-155,2.521718473122988e221,5.612861757647909e-46,2.9667424623050066e-149,6.536651353267444e-178,2.1057463508601625e-254,2.7247321765005698e-142,1.8671284958771126e208,3.602461501161713e-188,-3.276039865974314e211,3.276788496281427e-249,-7.893606972830478e-106,-2.9276540583928657e139,2.367786360113475e139,4.135903062765138e56,4.031635586671643e-168,-3.3892364774379327e-159,-1.6363884567036794e-45,1.0137732423674732e-71,1.7599510182799884e-116,-1.793834011761974e-215,6.713288060010128e73,-4.571359785477292e-131,1.5938304661998265e-196,1.0824041568231837e18,9.857236654431638e111,-5.652904625572496e71,2.4944202848558667e-14,3.45123431413035e183,3.0981382876718297e123,5.327578988031606e-179,4.8269106705694554e-45,194481.0,-4.290788896933822e-178,5.1393926285328354e238,1.0301499998852265e-189,-4.412093168638672e-105,-1.834057242966359e-167,6.587910266591915e-174,2.2500609546641423e137,5.2540586777384583e-197,-2.875528134360674e-80,6.78999607259047e-191,1.460481159399151e49,9.49975016173736e20,4.502754462373074e80,2.664892905869669e246,-1.974028672035477e-52,8.165006603810899e-122,-2.6559922791424e13,-3.3228910442267693e-88,6.418292451959902e185,5.659799424266695e-73,2.9762579822848224e217,6.949672444133345e-16,5.748610073972892e-91,5.750692535108548e-188,2.2584973362491054e-228,-3.2654570463252035e238,3.228305785123967e-5,1.0700281090093042e-188,4.199627701153113e190,-2.551077723127511e110,3.696452982345432e-34,2.6315618015026614e103,-1.208566057211223e168,4.590479796932285e-42,2.1123637284175154e156,1.2497727194754969e-192,6.45116545529621e154,-1.9259043800372761e56,6.578157729571076e48,8.559395753521776e61,-7.737125245533627e25,8.519180268891808e-173,7.0733363512901765e-6,1.0025773053636661e96,1.9670730024401417e-197,-2.2807440941276517e-256,2.020029140131104e-93,4.200776476836163e-183,2.966055453190295e-103,2.016491980138486e-95,2.4054167887562742e59,1.0193610713089864e-58,-2.677778221350981e-183,7.846275765208045e-6,-3.7036300802816026e255,2.8165776214325417e232,1.706632982959784e-101,8.092823525719959e-86,5.608920720113453e-107,-3.3725999907205973e230,5.585542797718998e135,-8.649755859375e23,-4.440892098500626e35,-2.9379194969736913e201,2.2867280138696524e221,-1.6907978446627598e174,9.152146929817861e258,2.0009932206624357e-75,1.5632217796614378e-122,2.0183828259222336e128,7.075076788398802e-16,1.518496605379093e-207,3.6351033047354585e-179,4.401291266320604e128,-1.4994022760028614e-186,1.197266344492114e211,-2.102834437331549e-178,6.157264259554715e180,1.0922783177328879e144,7.453430899486232e-156,-2.912285168706368e-124,1.460481159399151e49,-1.0830034371681144e-193,4.2602440041236475e119,-7.4418699363285805e-143,5.10468686836034e114,5.955550687149801e-258,-1.2205409132319672e-39,8.936193788242468e55,2.875140516719548e76,3.0221419480471577e-52,2.736210167593466e-147,5.0630314919190387e-228,2.5792668181629987e-208,1.2766779565855407e-213,3.899234576791905e-61,5.523943647477226e-106,-3.5113629326568276e240,1.0,-3.3288483338252147e-19,4.150629858093603e92,2.0633410487857073e-190,-1.14084125e8,2.1122913513992622e52,6.555484938379943e-124,-1.0e-51,2.48723443010042e-136,-3.236936415584487e197,1.3349589099292981e-51,1.716050638179293e-100,-1.4212544440499734e-148,2.1304708209359385e264,3.798706332149008e-28,1.1177931903232231e209,-5.287293105595817e-131,1.2636215234346898e64,1.7702640518222858e181,1.2386912896918956e-182,-6.072689956443114e-180,5.934729841099874e-122,2.1103968261797723e-68,-8.587738425441807e171,2.3975644920415506e95,-5.159431603758399e-121,-1.4349024018685796e157,7.121033040261204e69,7.562127592979595e-126,1.0e92,-7.797684429937836e-51,3.200702898994181e-153,1.9097420160977293e-159,1.0381777186975045e-130,6.2000124000248e-5,-3.5202191983407458e261,9.319878576285995e20,-7.519944180261786e-106,4.7782399542246223e86,4.440119592407353e-25,7.486166435529717e154,4.701740895374693e-153,2.225122503118276e73,8.222753866837207e112,7.803055346369425e-112,7.587934544553009e-143,7.312010317218481e230,-2.316992863476883e75,1.8971375900641885e171,4.508623470932909e-170,-1.4229043445608478e-75,8.167404507945345e48,1.0917757402032774e90,2.6002720951666425e193,-1.486222923210851e56,-1.2413268158262113e-222,-5.876021966393561e76,-4.3659144881633695e107,4.435260866423876e-100,-1.643415634622546e17,2.367911594760467e71,132496.0,1.0490185831120307e76,1.2524080800932753e-31,2.7047452305245137e-24,6.525304467998525e-55,7.345771463238855e-63,1.1330787120465449e142,-1.0148163326825042e-92,1.946656612874803e-209,3.814697265625e-12,3.8673399042262175e194,8.733451468860519e-132,2.383315551185946e-107,-3.670194060893149e-45,7.626179531297779e-175,1.2772533739409418e34,-1.321561493357157e-24,1.87247975448389e195,-4.93716340557077e139,-7.154217137104639e-170,-6.008702175728604e170,-2.8212976100027233e-226,9.023614653615417e-68,1.2345190093764605e-167,3.4794373283092804e194,1.3522460055547318e-55,5.645977776832762e-186,4.270101762110453e182,2.9328664372986702e246,4.016023826568691e188,-1.4551915228366853e-20,2.6158230499329737e147,5.785772154033643e80,1.563570825628701e-94,3.245185536584267e-130,1.5776940902245607e-57,2.5766160680997123e248,-2.706844209537873e140,1.0e118,1.4370314389040136e-68,3.553310371348287e172,7.184513678279687e-125,-4.047525574594756e-24,1.0637965811521317e-86,-7.664672652003619e26,3.3374782049432906e29,6.055862894442789e112,3.016848440612653e-207,1.0915338530733936e21,1.3634558683080408e-127,2.7996033031856026e-195,5.1557328572508317e244,1.8304205450599405e156,-3.254664344864217e34,-2.594858480978222e217,-1.468089575189179e-74,1.0040416249397274e226,-4.976917055623195e-146,9.386775193454619e184,1.6160840794410745e-150,1.5742775888093675e-8,4.38663295678268e-211,-2.5849394142282114e-111,-8.285995137658448e130,1.3759754678034921e-136,5.8441427315751585e40,3.968787582993817e59,5.470249356041236e-60,2.064377754059776e15,1.4661944638085127e-21,1.2701067026567015e166,7.922357485544759e-214,2.740216473057891e-147,4.598015890870535e-229,1.0143019282498548e64,1.0335249834020613e230,2.0126626945314963e-120,-1.2968995203347483e-66,1.6671453045854368e184,4.242621865065819e80,5.6714781570040676e97,2.4165009544298333e-215,0.007142857142857143,1.3231934953185061e86,-1.9031490312063825e82,6.082667877133577e185,6.112482754858452e-98,-2.8120274715965712e-52,-5.819827032806695e-22,3.736244542844196e-195,-2.3128337794245954e129,1.7733275683731514e23,4.747561509943e12,2.1291613875263183e80,8.844320971079535e112,3.0767689322089774e-173,1.9926929839606296e-79,-1.5987601930823132e152,5.447044906478251e-74,9.992686238232363e120,474.0,-1.2459040516832595e109,2.149726205702732e-42,9.227738187451447e-262,4.542701868280625e59,3.099557704449576e-22,1.1892486855388332e-34,1.1575636870681278e-215,1.4885744409311718e245,1.9834978699586848e-126,4.412676231632871e-117,2.147101632836947e-99,3.4248053323819127e106,3.182121669633906e98,7.256313856e9,-1.757705668791261e-107,1.801079740256307e189,4.429226854236292e88,2.2012287099421803e249,5.966504166507603e160,3.139444299017004e91,-5.832202355969696e-110,7.280582236873294e-74,-3.4063678720065206e-108,7.044318990053958e149,5.201288086620804e-169,2.161457909452569e206,1.6693693868678003e134,7.102121588507356e69,7.387463621117325e-64,2.092103704108342e208,3.5037902227146403e-82,-2.843406695365778e-127,1.3731245992947164e-133,-3.677639385783626e200,1.7806566396276515e61,3.589147255431043e20,1.0861201200739776e168,-3.39424797256584e-51,-8.077935669463161e-28,-8.676680118595527e-140,3.9519977108617076e-106,1.842589507352724e-122,-1.2521791289460324e-35,2.3794272456855245e-142,-5.912192558432677e86,-3.539924016401556e-73,2.08827064576e19,3.1852770896846666e-92,1.612233466217465e92,2.8719277420434818e168,1.205190401115303e80,-1.7033791945413415e-12,-1.215783124428511e-77,-1.045114616327235e-108,-1.2465809237463568e39,3.7607239479141106e41,3.864981459816464e-88,76176.0,-2.243936144637692e79,-2.695425294719928e161,1.043817314053677e-201,2.885222097491103e-209,5.383492952771112e-217,5.341524045759068e-112,6.1612212010628344e-254,2.180872852709584e-190,5.1478848e7,2.3599326509725084e-233,-1.161770215942184e-106,2.455336039328621e-65,4.2991243126350337e158,2.0653805267934034e195,1.7162261426421344e-172,5.372015621857389e259,5.7182267521958235e-226,8.29164866753628e-87,-7.813897930846201e203,1.0086913586276987e118,-4.200448877933649e-262,3.6520347436056576e28,4.90843446687325e-47,-6.712341372993151e-76,9.109094122575852e164,1.958549983214136e158,3.11474842221799e-207,4.1723394343594254e-91,7.922816251426434e28,2.2737367544323206e-27,-3.833347192713406e-93,1.5103755567284542e-234,1.0927366588345648e82,1.0653285919719246e-185,-6.658106371087734e68,6.234839521e9,1.4133590598579151e-226,7.682608097935962e215,4.405428181165216e-171,-4.33469885741696e-212,1.4273434994667495e39,5.362014369301501e-200,7.442988976799808e-74,8.54963920522554e-6,6.150468612884937e150,2.447034274628338e112,-5.706581621086272e79,1.232314897358101e161,2.151064314356559e-84,-1.1147194766737333e39,-8.154891871548876e-155,-1.2182855028730335e89,7.578406876346768e183,1.5474250491067255e200,8.631389527436688e-14,6.211272488598092e-62,3.1856402487268074e123,2.831539902449214e98,2.2601945674881115e203,5.365733875222985e114,3.81303856256669e125,2.6092772770776377e-111,1.7890666442318606e-17,1.5458521317804162e-199,2.871041107816574e-70,1.9807040628566085e122,6.465121208632644e-230,9.186880603456781e-44,2.6178105177296006e209,3.3346897987434336e87,1.684996666696915e121,6.151190828107808e194,-2.2356785664219134e150,2.3182076626236646e-120,1.5574313595412446e167,-2.384185791015625e15,9.944965209011614e-167,-2.601276476770892e28,7.204499757460023e-146,3.947986428754874e230,1.5286700631942576e37,3.858084338984723e244,1.0035927549410361e249,3.171858380845858e169,2.5879100772789636e92,-2.5745309116248993e-217,7.280337648014393e75,2.4005929125036376e-170,3.573433625291989e179,4.0656117753521525e117,-2.278571609213684e-50,4.537600707781379e-68,1.5502105880242235e-181,3.0503488096844093e-96,1.0455924844440592e-37,1.0015279337560489e70,5.022188332891398e111,-1.2667218838171368e210,-2.076918743413931e34,9.581388548749381e-155,-1.0e-178,9.328190752623082e-91,2.4713592974643186e73,1.1115853395845354e122,-8.892435204813519e-193,7.46574106675747e-72,-6.246263938721594e84,-1.1739293764087153e-5,-4.300314318322579e-133,2.1488356565509232e-200,1.0572107786635271e-63,3.196670515523576e245,8.420006403282146e-102,6.976365200847098e-81,2.051315219810392e167,1.7847344591520235e-46,7.173069547991224e-133,-2.476099e11,3.446124921813523e-137,-3.6998848503512697e146,7.796974881018867e213,2.787593149816328e89,3.419730545751378e-7,-6.503731788432249e-68,-2.62466438931692e219,1.6366537392946113e41,3.656162969303968e-95,1.3616599312854201e-11,-3.711960273065513e121,1.0477013427404753e-45,1.8129028535257726e-71,-6.709764763141512e132,4.758095687798136e175,-5.474863974485458e135,2.05891132094649e14,-9.713137863891106e-101,1.3184201655774947e-206,-5.895447420431874e86,4.812298033983744e53,1.497969537701574e98,1.0,4.2482187025296575e140,-4.476273421370531e-103,-3.582549357870894e169,-1.732470238185681e133,1.953661515553202e79,3.29367108099412e-36,3.01488299558892e64,-1.5152103808827499e-31,-1.0977585690518595e181,-2.9533963480673266e118,2.620918624241577e-234,-6.494234787471491e-194,-1.5709099088952725e-89,1.1038034725136748e84,6.716436984213658e194,1.337897850453103e96,3.972293295363747e-67,8.281797452201455e107,3.4178751838215406e224,-2.2322147290065667e-179,1.5013093754529658e110,4.155418430083049e-192,5.555567272056443e-226,1.4527874207572734e57,1.3643253926680831e-188,1.2430477631096029e-189,2.6096977381761603e-117,3.3700253469588866e-23,7.520870014085348e32,4.722366482869645e-87,-2.6618349059917653e154,8.196117939280654e-69,9.989335984332438e-44,-5.553141192521977e-159,7.69243207428897e169,2.1487323526352777e106,1.2163788814401173e-124,1.7587121202815738e-122,3.692751774833424e-146,4.196798892118209e-121,1.3266164977310088e78,1.0,3.762956335084401e-17,6.5079847565373205e239,4.253421461043935e-148,7.431742304513438e86,4.587894507686234e218,-8.68721652479383e144,3.3301470413443835e26,3.032020537427737e-163,2.2013136429275836e-134,-1.924481769277538e80,-3.814697265625e-6,3.473305024055729e65,3.145693967145169e-26,-2.2250620781030212e-60,-3.829944921253795e57,1.4008981674729034e-109,-6.299799082068185e-100,1.9125074513005824e55,2.813143722092479e-78,-7.696509400568414e-134,-8.677347580773213e-67,-1.123870836524672e237,6.46197935286756e-145,1.2685771697572461e-163,1.2158483541189827e73,1.0,-7.38958077454926e104,7.197448778825905e50,-1.7892064670962785e175,-1.688940622225062e29,4.646435920114758e-151,1.8222555617218607e77,-3.7494023554323783e161,6.968068222650658e-87,2.5101797791966093e94,196249.0,1.2317889701107268e-8,1.189696225396325e-23,8.053252117294803e-38,-7.193903335220648e-140,6.091178752687845e111,-1.1838258905282125e-129,-7.848809344293074e-126,1.4807099700081092e-83,-1.2646381096498312e-191,1.222047109617042e221,8.79745710312568e89,9.747455451573268e213,1.073741824e-21,-1.7575829182677765e78,3.792879730283434e228,6.104088152628581e88,7.33850924664867e-150,1.014741853230169e15,9.294416571678305e-76,4.313695057157816e-217,3.92439999608068e-22,1.8339659776e10,1.6990030038497495e253,4.670165230917313e151,-3.469446951953614e69,1.9207978777850424e159,1.0689114913313179e43,-4.331471083607874e-54,6.307698510348745e93,6.282257088809508e-128,7.059912857006094e-134,7.134695064536103e54,-5.553141192521977e-159,1.223489069315611e132,5.2012855781282986e-27,8.014020226783567e-107,5.5060901574355e-62,-1.7892064670962785e175,-3.137935445907269e61,4.061761640677331e64,8.076453214701041e-140,2.6042003181342677e192,2.0443420499589114e178,4.596682100291695e103,2.7237178247747934e-89,-4.282490290176e12,2.74877906944e-27,3.790338829785053e169,1.0758231414927775e56,4.3343548371854285e-55,-6.643241505490435e-54,8.612525433370458e-233,-2.497220556579919e-50,-7.216071380354353e-168,6.935549225536018e-212,6.952011999247997e-109,1.2925061320278495e-136,-3.426042154472791e-162,1.2738411188063257e-11,1.261734084720651e-248,2.641807540224e21,8.879964540838648e159,50.0,2.2835963083295358e-185,9.586439014351678e-177,6.605407503962424e-246,3.337559892826936e-191,-3.5875665715095866e89,-3.662176869349534e163,0.001,2.0754243145258335e-85,1.3076179213607116e-83,8.881784197001252e-16,4.8569179389256115e173,2.8539391885300555e-112,2.7538111279111226e148,-7.12972759978014e-35,1.2738844303517812e-113,1.9436304976371002e218,-1.747018658432419e-176,17161.0,2.9555971657678865e89,3.271860964611071e-135,9.304052929484079e-34,2.124814641452662e208,5.270959037839539e52,1.2173064418913862e-191,1.39314069504e11,-3.455169428767599e-260,1.4720728840367054e68,-3.9444122193476293e148,2.2449690842838776e-264,2.3421443991518738e-200,9.903733891340244e-113,3.2162494605199833e184,1.839248602049032e-135,1.0773900349133976e231,-4.620680728035369e83,2.4623361066932534e192,3.599322138117751e-198,3.1285563539673695e-143,6.8719476736e10,-1.2281886793731204e-137,1.0871383021342492e-78,1.6954876328083854e86,-328.0,-3.850852430627037e-206,3.8238142062231293e164,2.8700759309038042e125,-5.034682809879561e-93,-2.541865828329e25,2.76092050376522e-19,2.5379418373156492e-116,8.443160049631416e135,1.3631303185228898e121,5.949660746710047e-38,2.1762913579014875e-33,7.8125e-10,3.3589380537835443e-231,4.3096778059289803e120,3.744061843246345e41,1.3757088461198326e-97,-1.334371358198125e147,-1.1066441454536661e129,-4.2660439872131704e-19,-1.2224410061536193e-224,3.362536761078099e-115,1.960608737165178e128,6.313104867673426e86,2.1377706189197972e22,-1.7297941251019356e-218,2.1207953706460375e183,3.815701589799143e110,0.00036443148688046647,2.4279528957102374e-172,1.0,5.13677235961663e83,8.763311897487839e-96,5.024000979823817e77,4.475359714912987e206,2.302161614000587e-30,7.388848538636182e190,1.3261269916410938e-95,2.13969352421646e-152,3.915114358775581e-26,1.0080014022187293e229,2.053360634693827e233,3.4786499553590696e-210,2.680788892303892e160,2.825761e10,3.3057391542970965e-112,8.891535018383079e108,8.428892481e9,5.266145025760393e-242,1.5992684368342125e80,5.510238839550769e152,1.2744735289059618e-57,0.0036231884057971015,1.0576023135219186e65,1.5348962382692778e130,-6.176937848267812e116,9.359113942188875e35,-2.904590161835767e195,-3.514150051684735e-36,8.81858148295391e93,2.3182538441796384e-69,6.189337220490697e27,4.383269153181762e29,1.1944155504034324e-206,2.169830573471083e157,2.3984907601294837e77,-9.391435011269722e-8,3.899980187295175e-109,5.802154853011378e-129,2.62144e-13,9.685062775321494e-199,1.5083709804021917e-33,6.498364134297788e-180,78125.0,2.81474976710656e38,1.2230590464e10,-3.305912610177821e-206,1.186135330384067e146,-8.985007793492806e90,-3.3765678555033253e-228,9.001149253753796e56,5.307202182847945e-41,7.111171196939093e78,9.63672444576057e108,3.5269653404010735e-147,1.4056081687956668e156,4.234744915865513e101,4.6816763546921983e-97,4.2559012338865495e169,4.590828763211382e-88,1.6050200918226535e61,-1.3809015824830617e129,8.698341847256277e28,6.704313908572322e-41,-5.060569233164909e-124,-6.746763784498295e254,1.0,9.831165431012e122,3.851385796746924e163,-1.727233711018889e-77,2.406334528262421e257,1.4243493400591056e191,1.3565659025724943e-46,-6.969115102865291e-158,1.7034665195089402e20,-1.6837782655940093e17,-9.876896407358824e-77,2.74615702958617e-122,1.0,1.4231806887656976e103,3.90625e-11,1.9784466890013526e-18,3.5967921100815634e204,3.632285018391709e-30,1.4082544945799718e137,51529.0,1.3913550269066188e-131,1.3417963591315995e182,6.831823886994091e-112,-5.190146727623792e134,6.824068304384523e-55,2.61588736404327e-130,-2.7492627210591307e-221,4.902906238974102e-24,2.2126484617971506e-51,8.811685157869359e-159,3.1590905218060704e-57,7.249803359578536e63,-2.7983440371669376e-143,8.823062667272187e219,3.800460657085948e-124,-6.317815617068646e94,2.6187249958234365e-101,1.119509844171587e-113,1.4241717875603867e266,7.506757499700396e163,-1.4963083043567875e236,1.841842672999193e-235,3.9988291737460896e-215,97969.0,-8.352210189808812e-249,-2.5824388572838826e-94,2.6210907325377236e-93,5.813199187371204e-90,4.333828875680533e43,1.9500648531136427e-66,-1.0645153267042771e-180,3.048582568667961e141,2.739492856695156e233,1.5187898946333442e84,2.734474169057215e-227,1.025690074858079e-149,-2.697143564223964e209,-6.510651056790621e-66,-1.0634874809746548e-92,-3.9381768608079467e173,9.58468597212736e14,1.7824220977441768e-38,3.6038810985523574e85,1.0822724453081056e145,2.440496517670869e51,-1.284211391468727e-6,1.2519776817839492e-125,2.193592823385214e-160,7.353300653322044e152,1.7595936344763176e63,3.475187103441536e-176,2.9340995040480185e-13,7.183252662235696e43,-5.456852413421428e72,1.7004685701366158e232,3.682510181718704e85,1.5103755567284542e-234,5.02992807202857e-5,3.7702233692225726e-209,5.1210037373603564e-49,-9.922232188564688e-178,3.219946814241421e-73,4.080663671223403e20,2.029056083110137e-5,4.706057888172565e139,1.1519082264304985e-34,-2.7420978383664555e-211,-8.464149782874044e84,1.3735165230816186e73,1.37858491849e11,-2.3993079470865947e164,2.1535635105883218e79,-3.912702030123784e-189,1.1222741464018822e27,5.985252725153793e-64,9.161843111321563e203,-1.2979081548478705e37,2.532951621191406e17,-7.222559006886551e-161,3.2144139349369836e-146,-4.53196479875426e68,1.9604183545950134e-54,4.679676833630042e-101,1.6889439583252028e-188,2.7214115050751884e89,1.8250769233958156e119,2.9054079456244084e-108,4.015254339439012e78,-4.079182955720188e125,4.3644685972968213e158,-3.485416951196545e94,5.169878828456423e-26,3.889384548663214e-130,6.731639593103685e115,5.158106762080225e-162,3.472922246091823e175,1.7237942130505405e-67,3.3227376617030857e36,-8.1511178492458295e-230,1.659992337748311e182,3.358397447590576e-152,2.7078036478026605e39,-5.70899077082384e45,3.137431685701916e162,-8.778812980659894e-110,2.2492553551660387e34,1.4491913621177607e202,2.6347753493154457e180,1.2986990988864704e92,-3.1896865838047795e-177,1.0,-9.713504302275937e67,3.154822635044853e171,1.8203012994204075e-224,2.2879832815927855e48,-4.844841589191888e-180,4.174557917929292e49,6.132610415680999e21,9.664372258125895e-261,-1.9466982722272854e-115,3.914423432806484e182,-9.559906635974804e-53,1.732563527013779e167,1.0020562858091206e-16,1.4150996092162286e132,3.4557978376276263e180,1.9791116015451256e-58,-9.679640952397354e-160,-4.507486685182439e-56,2.9947838661888045e35,1.4182279699174158e-135,2.1433470507544583e-5,-3.7286820879405886e27,7.957610399020881e-201,2.778014725615093e106,6.695733200851698e-95,1.806849268266114e-108,1.0934836521763373e189,1.6118118145044033e-67,7.216961446796669e176,-2.117495750232287e-163,9.756512379784226e191,1.4793154355568848e-237,3.4339970788038713e-77,9.883577576221678e150,2.2331421601355824e166,-5.0479160020899045e143,-1.0094921443640216e-95,3.9231885846166755e56,2.7580360801396385e71,-4.691137086698635e-244,5.797838341131941e127,4.711998736e9,2.55377748653829e74,8.603915972377324e-48,5.0410913502709576e-139,0.006622516556291391,-9.533044138448164e180,3.5299234486523027e98,1.1528508353537054e-109,8.765461452239739e-9,9.049072218180663e125,-4.159344260389896e-125,1.7997579848979966e-61,-5.887510611944159e-20,0.012195121951219513,6.340626366852495e-114,5.069894631841378e-97,-4.0533601838617775e-145,2.2726578844967515e57,3.355413692472678e-209,2.1575862958123245e-55,5.765958499428374e-26,-7.332570251981247e-22,2.9844634833651906e-129,-1.1459005238518041e196,1.8779445088932335e123,7.973582964399192e-179,9.430298923255593e202,8.064398412723297e31,-1.5282923697282853e80,7.411489955731139e-52,5.268024e6,1.0181690526029749e-153,-1.0097419586828952e-59,1.0366465789451195e25,6.882844257488039e45,1.3015123171986923e142,2.8126541255307885e-134,-1.0e-74,4.061632679681601e-107,6.676977488551504e-126,-1.076296540451629e-227,1.1273019525877228e20,4.2432941833536294e-71,-2.301100693581337e120,9.40395534142156e-121,1.0767696515039789e250,1.24474186669834e-57,-4.494653498824917e209,1.0103813208710374e-67,8.541364516565275e-55,-5.253711445047518e-8,1.959553324262937e202,3.550408099498388e-233,5.692352532017793e-165,3.742239729078063e-77,2.3945242826029513e52,-2.0288513671029545e230,1.5453021895091516e-84,1.566536078811997e-125,1.6777216e-41,1.2160415867093827e-150,1.4328398421710172e-43,-3.2351375870345766e-69,3.445162887692868e223,-4.4002066494541674e-79,1.0314051488877355e-43,8.151835327659975e97,1.572266908616041e15,-6.418478923201211e-78,1.528113399605565e-128,-5.681512866159529e31,1.7195833842956852e146,4.4315248931325417e-200,0.01818181818181818,1.839248602049032e-83,7.027318042678777e151,3.4055676862641545e-87,4.929959512456348e196,7.268979935838065e96,-5.376253545366688e-30,-8.526988961500108e149,1.3787848456477511e-145,7.545694094195734e73,-4.004452059170757e49,8.843734127730039e-52,1.1112006825558016e30,1.1575862056398377e120,9.255235320869961e-71,6.157294238619781e-6,7.155577026378635e33,2.463547816331444e18,9.361143519359087e52,5.572094851247212e-41,-1.0e-170,1.0510910505243737e-258,2.680118382699741e201,5.178917566325838e-100,-8.648494974988695e-60,4.726389718547785e26,4.80338797225817e160,1.5053529084092823e-51,-378.0,-2.2842826858936724e191,1.1265691822901098e-133,1.2087979657195814e-60,3.1819233851582596e-131,5.339536402803731e-187,2.014531578544618e220,-5.193270021499867e151,5.7918773205287126e141,1.9263814869514325e91,-3.727615871154482e-199,-1.6846662646413623e70,-5.522294247630902e133,2.215808615340644e-100,3.5104342998525136e80,-3.8112704242789616e102,-3.6064913999298085e205,6.211849969686866e249,6.521779450749828e148,7.679921433600492e-129,7.232948021827683e-65,4.304120787801772e-146,8.7319367836964e-248,9.74918169790313e-76,5.505688357916569e103,-1.1484630505472706e60,8.244734566228837e-179,1.109516070491657e-196,-9.044446922726794e-76,4.630098089747131e20,5.799604219643847e196,7.006497531364657e105,2.571446062633583e49,-3.144275610956896e-155,4.082023834565555e-35,2.167436208574761e199,-6.840010453646604e-21,1.1232143047735168e76,1.2599071640127137e97,8.566459969742265e-139,1.9997650092548782e-84,1.3020623625840513e-43,9.320592445148675e-113,-2.656063137561077e-52,5.146189304541493e-171,7.596454196607838e-136,4.628830254469974e-114,7.336055741784221e-122,-5.963385395750392e27,8.78694100496718e158,2.194288876723091e110,3.372036478300259e215,7.943930461563437e164,5.734734901584115e46,-1.3929555690985384e-24,9.43625919273701e-136,6.646347292115641e216,3.0528476176e10,4.112929490656699e74,-2.2412202608889368e215,-1.4916681462400413e-154,4.0400724635680655e142,7.959830190500257e-233,8.550341066932376e-144,-1.5003053895436718e18,1.3228455421103943e-168,-1.5391408670466593e113,7.046116849871974e224,7.652886676053774e221,2.1873529996153315e-65,1.5893761968556124e127,null,0.0021231422505307855,3.7281334283719576e16,4.482098564055504e-229,-8.184311867865768e39,-4.38427732293e11,8.555318956664629e53,9.81502489795649e139,-1.477241563288998e-184,0.00015241579027587258,3.518743761e9,1.0467455393801477e87,3.3298122657123553e220,2.0544807168292218e-81,1.7861039437462745e45,9.889092051462698e218,1.674485053937849e-232,7.097705076189754e-102,2.7710263296e10,-1.1260495757910519e103,1.4579384749963553e-7,-2.69310003422032e-49,3.303993365731356e-89,4.438841729547726e-35,-2.0271749668317202e83,-1.0183823058264985e-78,4.4886526860097676e-6,-5.136902899984933e114,4.311575741457383e-149,0.003278688524590164,-1.2088194775318996e239,8.056269786760134e-111,2.2851280378922897e51,1.9235553178706965e93,2.9916483001385503e113,9.325517634080862e-142,1.9140370931757604e66,-5.287293105595817e-131,5.073715308393703e-103,4.9143699204177834e44,-4.8859555885783554e20,1.0466115207043904e-137,-3.01218139891478e-23,1.0082527129435301e113,1.5235782319143017e184,1.8016778295642093e52,2.7994736989445982e-5,-1.9842730141549661e-109,1.7510237891705088e177,6.5536e20,-3.730093559108827e141,1.1473373073639135e-185,1.554431661821613e70,5.465850228008335e-31,-1.1955345836460804e113,2.695342066980669e-105,4.643791427606114e-69,1.943157213413338e-43,-3.65472485380777e-189,-2.4010655556572013e182,3.166190465341259e-189,4.0666707504025495e-26,3.9827651160354244e-47,5.058012964672934e-11,-7.349356133650189e62,-1.5625e-5,1.396405332493222e72,9.135157108952557e211,2.9334891491018187e31,-2.385720502235525e17,2.0901925189332304e50,5.564363939109009e-206,-2.464229295402406e-57,8.343699359066055e93,1.5928602758051178e-81,-1.4683102861882048e-32,1.0010415475915505e-243,-4.790373805857803e41,1.8511095575145533e88,1.4802627288269386e53,-3.912702030123784e-189,3.3509726312047204e206,1.151907139812004e-14,1.460481159399151e49,8.39054528882402e-28,9.372649908496705e-22,4.578080632131484e38,3.528714153412895e36,2.8042622816551573e-164,2.3283064365386962e-74,1.7890574572850028e194,9.825916798247791e-182,1.9806286516158732e-36,5.334514308916136e-16,8.151283411174654e-66,3.713399359730919e-179,3.2785730921971984e228,-3.4827265993197265e38,3.175582745976108e192,4.655577597350312e137,1.5910579418279466e124,-1.3421308959272826e-253,2.1277716297133752e-243,9.905743051948135e58,-7.8539686037963625e37,1.7987096025387032e118,-2.3464172654755274e-141,5.604503740835788e-155,1.7883074108792108e218,-1.863640112589785e229,8.686013667671468e41,-9.487364159190566e-224,2.7686362938127645e-45,2.1087368950830632e-128,1.9166544063528015e208,2.2800572355536772e-200,1.119130473102767e24,1.552061366649117e-41,-3.986711308041303e143,1.2088194775318995e140,1.2355071741195869e-170,8.324821298869729e133,1.401676160661353e191,1.684565578420604e74,-7.3834710576976e-158,1.0339410636271855e-14,212.0,3.52166390920691e-30,3.870683685598226e-196,5.272045103978937e249,3.3024639420798763e-88,-1.846931540312808e-123,1.605059686449631e149,2.1672135318203493e-183,5.980678066929184e61,223729.0,2.951479051793528e-116,-1.1674588166857489e-32,-1.9009914313958356e155,-1.2954215667323272e-24,1.852598253456518e-96,-2.0250863343272296e171,2.432937010067845e-138,5.32538624765676e-141,3.4733935316958997e-255,1.6981224182959487e48,3.980105742151077e83,-1.3469444986034848e133,7.813719358213249e-203,4.999629317212676e-102,7.832497970779777e213,-7.085473305207472e157,-6.657793506607e12,312.0,-1.0022127954402055e55,1.741393132193756e-136,2.011555665060791e-37,7.171367694652584e180,1.5804991909971731e-15,7.294384783064931e19,-5.415644967600358e-182,1.5059586963389676e163,8.751875476553916e-59,1.643295395413688e111,-1.1454016947498153e173,1.571231868211784e-121,2.0694801975129147e-72,2.6827805997743467e-213,3.358692920441315e-27,-9.057475407707541e54,4.967869496200552e-125,2.6101450082076224e-129,4.153749137098951e-68,-1.3737273631702693e-103,7.563441861400578e-128,3.5201396266597726e-186,-5.89157061188265e146,2.001566936265625e15,1.099511627776e-108,1.094523515896373e202,-8.087906677897965e242,-8.93189975215538e-108,1.66601286420489e-229,7.482969557828607e71,3.888862436320503e-50,1.5401783437176748e73,7.226268932824604e-6,5.6488748046971504e-182,237169.0,-1.3219807008276795e-99,-5.088933700529345e-73,4.225318083168109e-208,1.5664774843579183e-175,1.4710834013931898e249,-2.1156945601698304e141,-3.444980405228098e33,5.6179463200996053e172,8.266484275700407e-253,8.106778279701353e-125,-1.8728708018430413e21,-3.5241854907443944e-69,9.098995699259594e-9,7.40521964263118e125,4.296329526830237e221,2.889592240303578e-85,1.7588062447480436e-180,3.301833368090869e-36,2.725355578312772e21,1.0468851889495232e-85,2.887174368e9,-2.9616478222855373e99,5.042350269608621e-200,9.661592758474845e191,-8.682526905936135e-154,4.274552920598694e200,1.2069239969892337e-152,-3.7134234731477574e60,2.2233119554534216e30,2.3283064365386964e38,3.079911356831868e182,-2.4180654296875e13,1.6528018549775449e181,1.59652583282944e102,5.267065530394883e99,5.409582055044546e159,1.4789987757689568e181,-5.413991124000472e175,-1.0707184212485745e-81,1.6896445340045393e105,1.5605441716413633e144,-8.475016352802729e195,-4.549146401637789e-26,-4.856245017718213e199,9.551729453642295e-191,6.245349378894973e98,-2.3929932923061753e23,2.335031962298949e131,-1.4315427185715253e-225,7.046692766589848e82,-5.668139026323538e-159,1.2851989426816255e-109,9.397755718966259e146,3.065152745148093e-182,-6.78504462930855e130,4.6501225564001235e-110,-4.8196857210675095e64,240100.0,-6.355424992191685e-163,4.094676679753084e-236,1.2137447305195577e117,-1.9779573307594622e-78,1.2056468097659663e136,-1.39288917338851e38,8.33166413950788e68,3.042088004972221e96,4.7989421940172425e-179,6.893154598867256e-23,-7.832291946411905e-19,1.2795903507934962e-237,2.9462722208211522e-148,2.061240264385663e-55,3.2626589471524236e209,7.03123171323635e-34,4.1835566733242656e-98,4.7817885253707964e-147,2.983505713871229e-166,1.0367793076318844e49,4.103754649629007e-36,-2.3544418566552113e-35,6.270515000238797e191,1.5404268756844342e262,3.58061099315846e-52,2.0616871133184391e-32,2.9911183863907087e90,1.3376291933401122e-91,4.8603100839053766e-203,6.8301525102361644e-223,1.0458867382010313e-50,4.9289360438946944e-126,1.0193831974384141e23,3.8406889849753743e-187,3.253537079341569e-177,7.483147950814764e-11,3.216373596638492e246,-1.182668290079869e147,-1.5353047278668306e-138,48400.0,1.988488686635561e95,1.1828862447664598e221,-1.9746433525281396e172,9.807971461541689e117,9.068138572406399e32,8.144968891827592e-224,6.95480765424927e138,3.493358822838477e-113,-4.479614754625031e87,5.019083658831413e162,6.350657928161357e-6,-2.1411409155386867e-176,5.149134718461418e-200,7.736654904320961e-178,1.2220836387772482e47,1.494847530780445e-121,5.770516759120258e-206,-2.4376686021173084e-165,3.308722450212111e-24,7.251887252226683e-122,4.851310562315462e207,-1.9742566431106408e-231,9.171487866780115e139,1.391781352816877e178,1.5524041254056841e221,1.979111601545126e-96,-4.291300505181741e108,-7.90758577961731e134,6.211849969686866e249,2.4133531101151925e41,2.1874892082058872e-207,-1.0350590365058667e121,2.2086248531120136e-181,4.749040496635393e248,1.4839476153120832e127,8.569513432871366e-115,4.2496814139355923e-78,9.383408347793788e85,1.0843010464298982e-144,9.271394351208479e-231,3.808929320019803e199,-64000.0,1.6580281364951423e203,1.5427525512517608e-248,8.977386942342906e-188,-2.4541279788272641e145,2.1947207394239037e197,-2.3493944983492924e250,-3.8818630162610555e-73,6.5588847846136905e-65,1.5848934897161314e86,6.006565608410253e-38,-3.1966402295205265e-38,-7.126357480718454e-210,2.5329392028545823e-81,2.3039077633131328e98,-1.89452546608853e151,4.586821584548432e-53,2.1064656695844428e195,4.76837158203125e-14,5.609254904123875e-87,3.1869619618672804e236,-2.0967567800347154e-23,1.2237505867781314e-169,1.9380175922996075e-54,3.522012227096395e33,2.415809734538618e-163,6.217978622517873e-31,6.839645551362304e51,6.411908933213392e152,-1.4743240574804286e-116,-5.802635025809541e62,1.202399327664351e-50,2.746004918951635e30,2.3858824108219112e-111,2.911409572374338e193,1.6348232908252997e170,26569.0,2.415130867419334e-43,9.139654660102616e-100,3.54911738773702e-183,3.053620905198056e-174,1.0,6.350979645503641e-59,5.737342158860458e82,2.479170312483409e-217,9.061596198413367e77,9.22417564483584e14,-8.34911428138283e-152,5.988913902200525e103,-4.208535011312432e-238,1.0189595945037023e-60,5.529907958862123e-91,-0.034482758620689655,1.5568650525764028e-98,-3.0648214560502165e-233,1.304572395051315e169,3.732821046895698e-47,9.266260250565367e-226,1.8216648947300788e60,-4.432375896071733e114,4.5697582171770497e210,1.7524440383348074e36,1.7581435532091017e64,1.3234889800848443e53,4.8664766064804615e-198,4.591774807899561e-108,5.998277398193953e-185,1.2103700000320878e-258,-2.6718554663973967e-152,9.041554169962179e-167,-1.640729652868257e190,5.630032200973754e-73,2.655557670838932e112,5.659992933667253e197,2.139880881428547e110,4.1845046844598615e-13,2.406619233691084e36,1.77147e16,1.1327876844571813e-203,1.1594453295761994e33,1.1791790351157788e-67,6.703527408596474e-175,2.787593149816328e-99,1.970942276453016e102,-9.460177490050087e205,1.1809765484517003e-186,2.7982932961e10,4.5545310291996935e-86,-4.3186309916454165e81,1.0,-1.7725644015193116e-21,1.3080233729689963e86,2.515521953485998e112,1.1450513056419806e-179,3.068034630079427e76,1.7944209936e10,6.164156822589172e-125,1.0154005050781694e65,-5.666324427396901e210,1.0,1.4897201208731247e-140,1.3270149727099371e-6,-1.0471921173003562e27,-2.909321189362571e131,1.3689147905858837e243,1.0520192828033689e108,-5.329135179715751e-200,1.194073405560928e164,-2.2811139793561539e201,-9.16608767467099e150,1.2855459222814535e-192,-5.148230860680908e57,-2.9461607050591012e50,4.6287978525111835e140,2.2675736961451248e-5,1.5238189451165715e54,6.463471633477854e-126,-9.393526582667693e136,4.019067562020699e42,3.3217283698623828e-158,3.2001497124262795e-61,8.635138328626124e130,3.7074694665532807e115,9.24038265796414e118,-8.06343466664502e95,3.4652037292627207e-221,1.9194047491427383e191,8.467009360560919e80,3.45246718454644e88,2.8928043566683407e-128,1.5416220896618291e-165,1.486779562034236e-55,6.495414750651398e218,-2.70712531800433e149,1.1086732471597318e126,1521.0,5.1257744719995385e-78,-1.0019283009797613e-160,2.7544449802826893e253,1.8810452568386517e118,6.119373687606972e-69,-2.639785259853814e-30,6.271178225041556e-166,3.4518193617529666e-10,-0.005681818181818182,5.701692774011562e183,1.183174638266911e154,1.5208138487447439e214,-1.0629803362243e13,-5.423710169475578e-65,7.401955138567801e32,1.2509300265031125e-107,8.203430062380908e72,-5.613251602733603e139,3.1187925800146794e-59,-1.6281146698894983e-26,3.9272747722381813e207,5.3654986621838126e200,2.6441902517946947e37,-1.2894506308066036e219,3.076251452271397e167,-4.858074977899561e146,2.319894092025334e100,-5.622822910516e-256,4.118953791150044e166,6.797344463285765e91,1.1210387714598537e-117,3.548918689324458e47,1.8430872129939448e96,2.1432183372411707e-156,8.729748854467225e-229,-1.259176168493847e170,1.37425791193003e-66,1.0069982867477678e68,3.9207443773196905e-82,2.0194839173657903e248,1.1366650032857335e-76,2.180872852709584e-190,1.0525256952745632e126,-5.520851979203876e-84,1.1223625948707883e144,2.8153337498297864e-117,2.3858824108219112e-111,1.7566981049589855e190,8.63021974476357e-224,7.391015581786057e-51,1.8257190265301547e55,42849.0,5.2825889475234206e191,1.0,3.8697337902690086e-38,1.9895113660064588e46,1.1872720174860283e26,1.1366885030486773e205,9.59644764107167e26,1.320419520388969e-10,3.189042338217369e-191,-7.336279435296027e-165,1.3160933018348088e208,2.513404177379929e-122,4.734497982270037e125,5.605193857299268e102,-1.5021584811463694e-238,2.213503117023504e104,-1.0279752754386228e-39,2.074152678793761e192,-1.8754166102813945e212,2.2159858392260996e-97,5.826976675086315e-28,3.6990030696076007e124,9.139758714658488e17,7.105553543915626e-125,8.565938084467889e-141,2.3420448514764555e126,1.4901161193847656e-60,7.367135881715315e169,2.529531698501066e-68,1.6506036047219443e108,1.1944548745580983e-15,3.4723387922828824e-166,-1.9877081849159962e-13,1.4384705484600023e58,4.330747e6,8.680860782519286e-146,5.311154613200548e-233,1.2949694578855155e-116,1.3878956588399598e-261,5.244337223924751e74,3.384882032909448e-22,1.6581113199853443e117,3.105926159393529e21,-4.830968453868707e-171,3.74229726085606e73,1.1959902542953436e191,-7.523593509237909e38,3.202566483315331e-35,-6.399870155027649e-55,8.04439319641963e41,-3.30832220005865e-102,9.094947017729283e27,5.3746884008721124e-61,1.4158273994689693e188,5.609617816588389e-199,5.833991066741683e195,-2.150446889533791e-173,-1.4701320501888037e-155,-6.506702006322629e-211,-5.879547146589409e-160,9.515223189562377e131,2.1662332318730016e-222,2.601372899885287e-10,1.8113925905964464e-46,8.156944020932901e-137,-2.847536083977256e-7,4.907212906449864e-116,1.9536632871184138e-32,7.123787869851829e58,1.1541806970661633e-82,-6.534026341032031e168,3.037327756468245e-65,-1.805913289142076e-137,-7.1795177890858115e140,1.0877342735517976e-44,-6.547657892329346e-18,3.241780274325298e166,-1.4068107585409554e-186,1.2356314940997566e194,2.5541230600196857e141,1.393796574908164e42,2.162831679619032e59,1.0043362776618689e255,2.0007048479567275e62,2.754846554995668e249,1.9260813958465467e191,4.498738237817124e83,2.1129486331142067e207,-129.0,-1.37438953472e11,5.8162221339395326e-210,1.953125e-21,-3.808461480203552e141,1.5407493645512563e126,6.93246610887723e-150,2.4779163478293972e-200,8.352463828623921e-209,5.739444170351919e223,4.185198241352156e-199,7.592335157114963e147,1.3294501959910387e-162,5.757052767658245e-147,1.9056892223256258e-96,2.1455315790800364e-71,1.8991876704118062e-32,-9.829771889441198e-75,-7.253815028640572e-12,7.968706547895182e58,-6.408860950514881e-183,-6.017305001957692e-228,4.469047632808859e-116,-4.710128697246245e56,-3.912137693601209e77,1.243466998746483e105,-7.128315196914141e-197,6.428757360336412e95,-7.973449280599793e26,4.9214800249159434e-219,-1.188948147527285e56,7.070559095881934e114,7.130177467787851e-147,1.1612707338877885e-139,1.5739054369251856e-122,5.980615734787039e-112,8.359269848335151e-209,9.94629741669974e51,5.7663275521288597e-210,-5.219510953578327e213,2.357947691e18,1.0978862359028224e176,-3.638350174527766e-169,-1.9363012510498043e38,5.804077797615056e104,1.0367990277881385e144,-3.30625001631252e-190,-3.0782396493107205e-82,1.1864195115480245e-43,3.74229726085606e73,-5.1315811823070673e-8,5.60305926877276e-167,-1.4842416100344616e-219,2.3058430092136938e-104,6.8719476736e19,7.031553265792466e104,-1.1580590396391518e-131,-9.148614537525634e-94,1.3003342946222978e56,4.156973227305196e-45,5.198579676848099e-129,0.0027100271002710027,1.266780338648508e-69,2.5079871218006032e110,3.852479638866529e-139,1.97579050606394e-118,3.8300269016961535e-172,2.744720872781199e-137,-3.569598204356631e240,4.877926352699029e-59,1.2982495887726684e-205,8.063139744958588e58,1.5277435070120693e50,3.165543453070219e42,2.842179477451837e-113,4.196798892118209e-121,8.193259461444413e-63,1.9191002110827792e183,1.600591090853861e38,1.8889309990175885e54,1.0158806991052257e70,1.8180080518627972e-32,-9.242738851611252e241,1.3661745525989664e-62,3.2763903119682663e100,-1.6469853898171535e-23,9.529170859478686e258,-7.480837466575533e-186,3.0318075494792023e149,-1.5096089574074163e128,5.107489937554869e123,1.4828696408660544e-76,-2.349502921834464e-99,2.156028822458261e-140,2.600548267159531e-41,1.7620865658742872e142,9.054463441298583e-60,7.108394746665733e-174,8.608939899654826e-26,2.5405068492366947e42,1.6709684781439313e204,-1.2084262913296932e-148,8.04791011930865e241,5.815351179188933e157,1.1910091867416496e-119,7.984877438200135e-51,-2.8659639427961694e122,5.43700290915508e134,-1.5147144671747651e144,1.3447048191235688e178,-6.670897962004931e-205,5.846006549323612e48,-4.870524652696226e126,-5.400495267623333e86,5.7918161359718605e72,4.0582154248412136e-249,4.067978910298605e-142,8.85190795027376e-126,-9.342630593067423e76,7.154961399009961e25,3.67882027711237e93,5.9625326277905175e-123,1.3012323877396825e-158,5.655186897013078e135,1.47008443e13,-9.483937023098458e128,2.3694452669474815e252,1.8649707574921475e199,5.7498968413965005e51,3.9450796006758325e184,7.30371177017181e-145,1.2583229244504648e-72,2.321443610525929e39,-1.267070497925181e-60,9.23480626458976e38,4.569925406313374e-238,1.0575024999675474e-240,2.3326916922145747e-61,-2.7975579641823005e-108,6.778096808321416e154,2.0117834598131487e32,3.7075264987033827e-75,2.4584455196363627e-88,3.7807245438725453e195,1.2477760988375293e-121,2.9157539051779116e-11,3.610486121309347e-116,8.606482792394825e-21,1.0330754056514903e199,2.5919599265762958e-245,2.895495950355946e179,1.3721579494775215e65,3.943561711306376e104,3.582622732859003e-207,2.5618918401207525e76,9.343878384890256e195,9.028999161603632e-202,-4.843079543532118e-207,1.2530831994114236e-225,1.0011516183064046e174,2.0145721100312003e-172,1.8600787194066003e-158,5.949633243286327e-168,3.976298510585557e-173,2.8878147570800925e-13,1.867800080184058e-207,8.822781150358525e74,1.9512709436583498e98,4.7855639849996645e-35,1.220089259597179e-98,3.512688596340226e178,-1.5857141415706826e-37,2.1065963213945937e-81,2.2500609546641426e73,1.7387015586300262e-216,1.170723085531021e140,6.074714008229452e115,6.394178406132051e20,-2.766390263278852e-138,2.5200454453911144e153,1.3350991652688721e-132,9.139654660102616e-100,-1.9155767485031498e172,5.798454435712565e89,4.484155085839415e-44,1.1992552415346568e238,1.1369617186469858e-86,9.00109939954673e178,1.0,1.4566024203815206e-146,5.159787507790733e206,6.385995395228007e152,3.432218929943268e-155,1.1218092520730725e-85,6.13142290645571e222,-1.1619068687574736e141,8.69693516196006e-226,1.275890214490687e-131,6.728480778819336e84,4.601931028991098e150,2.1949750734803806e-140,1.3676129499505468e-231,-166375.0,-5.287557264772862e121,-3.323466452672135e-173,1.4066468446876486e192,1.5420381559422862e-113,1.032774905439281e-13,-5.69733827942234e238,1.6945995529735978e-148,2.1846119816080903e-133,2.7460436901084113e47,1.7928786726761473e-73,3.631163150387384e-97,-5.30158032543415e-132,2.4519928653854222e101,6.762840245681044e229,2.0555578520606297e-104,-7.055924125672218e-8,2.3561699157636302e247,-6.835898424179007e-151,-1.209054935657463e25,9.918036297172304e182,-7.962355096624451e148,14884.0,1.8941186830749338e258,1.5856007905355022e-31,4.150051047995028e-79,-1.1156075989108854e-182,1.5158319163562011e165,4.0536215597144385e107,-5.65391060729083e73,-2.197e6,1.2213081013580578e129,4.047255194809444e158,16.0,3.9099308618473085e87,-1.8561958840773236e79,1.0005694684074147e-82,3.769295921709344e139,2.6863725215628784e204,7.018743154521437e216,2.251726641154006e-127,2.5328347089936873e-157,1.8016778295642092e32,1.0723265337523127e141,-8.537117341039418e-25,-8.289572438086769e-26,-7.529401605396952e-76,3.533558345037498e153,1.066222407330279e-9,2.3160550785923804e-174,2.168404344971009e-50,-5.090537083613579e-239,3.1712119389339935e37,-1.1187883089006397e89,-2.687890400610739e-221,8.693603029557316e244,4.8050424804332914e-157,5.2687610343405944e-42,804357.0,6.884043416199022e-166,3.2302791243800564e49,-2.9771085501194875e141,1.1241892095779199e118,5.696025882741611e-6,-1.4673360413615733e163,-4.973250169944292e-184,-2.0016210247114213e69,3.5761498686883515e-138,3.606632272572553e-130,1.9347412785619062e-162,7.019202224252602e-207,-3.1338179318415255e-24,1.7468439647884344e-116,-2.3298399774345863e-88,6.734844552926288e-214,-5.6144673007712266e-42,4.6793334723294865e201,4.911148874741015e141,1.5878979509869688e-12,1.0811252448538448e-139,-8.256105090829905e35,-8.36445899331704e-114,-1.0e81,1.8363391432969227e-232,7.382184706848156e178,7.228391136439629e-100,3.1055083975872146e230,3.159788993503279e242,1.9618593102141918e-182,-1.0484794699393104e197,3.990941564574e60,2.4502592189965915e-114,1.4685795156524547e-138,-5.1750450992901804e135,5.5249630099120435e-71,1.724780756485813e-128,1.6945327841591648e-35,6.395394935447449e-118,2.982592438498252e-201,4.254003639344145e-87,3364.0,-9.730352938040607e-259,4.299540361591039e114,-6.398777635898814e-203,4.119070558257684e-186,-3.9023575472508457e182,-3.0587485129535017e-80,4.3922571156463405e146,5.642947154316035e139,1.2662162809307604e123,9.095576049275706e-156,-1.943157213413338e-43,2.7072234705848843e-209,8.294537100269146e-161,9.564063037619597e57,1.0e124,2.3482787945896605e74,2.510478611744849e-66,1.3184201655774947e-206,1.813138309636416e-158,3.352326482703549e-203,1.3243784249459598e-224,null,1.5346139567135464e179,1.3112725656352674e174,-9.377659451349101e-108,4.5700632191167326e44,3.6169015411290966e-48,-3.191113161049049e-228,3.411858411286888e213,2.0197751843775777e62,2.650086657461005e-127,7.512496349244781e212,5.406791734121597e-106,-6.43657486302216e-57,2.421056294138037e-28,6.0887672738504456e-223,1.7205766766530628e-11,1.552061366649117e-41,-9.381465766970462e39,5.984271394211351e-257,-1.1440956868038206e-231,5.275063766741271e105,1.0328617403263465e167,-8.47440156033038e16,4.784075163139213e180,2.597570398337405e206,1.4619213590930563e-137,1.831677425371436e172,5.147557589468029e-141,5.046450457855753e-108,5.132306280075637e-165,3.2253669862128775e-60,-1.2472010928316888e-48,1.0,625.0,5.154266555413573e-77,1.5178486401e10,1.97270112373891e-81,3.610214964620689e197,9.837540053724972e161,212521.0,8.05379164044876e-71,7.792687282665541e-169,1.9179053017680683e-227,2.069680105444042e-130,9.805666814420448e-205,3.8989203481545404e248,-2.842170943040401e-23,1.1641532182693483e-21,-5.1252613883308045e-6,-8.786756095618222e-211,9.206643835021558e17,7.168142030493698e61,3.512938744750947e-45,-4.9618403112646233e-33,3.18587893095715e-92,1.0,2.1322529222408975e-166,4.493602578584234e80,0.007692307692307693,-1.7928984430958689e-99,4.128742638831954e-262,8.106546907983159e-172,3.004565263806568e-102,8.457634324732065e-47,-2.3865913636048284e-114,3.570467226624e12,1.5028297762052445e-114,1.0222756568933651e203,-9.66128466812658e-122,6.459364856051581e-46,1.0696625749989396e-69,5.5275825196326215e57,-1.1783834913836346e178,224676.0,1.7723554580651102e-88,2.337066388301497e-78,1.7872494105438282e18,1.7329185588255093e128,4.5131748408466745e145,9.312225832310897e-49,1.1835555482041462e225,1.7190494831902647e-22,-1.2887233291371194e-114,1.0,4.3370171654119237e104,1.017187192690037e-100,3.901844231062338e-18,1.3605888187144963e-126,1.915286857758393e167,1.428972175809174e-14,1.6041873052319102e248,-6.415906947651613e98,4.878207188819774e225,4.486332529156571e-257,2.563063327872891e-170,-8.277399150406685e-39,-1.7038466812290146e-146,1.815848e6,4.572473708276177e-11,2.8810980609409774e-87,-1.246065769884119e-54,5.960464477539062e-20,1.165109654375651e49,-5.368881660272382e71,-8.091489318033772e-17,1.3663335539706986e66,-4.307664401003682e-40,3.8468358415546087e253,2.419613120814938e-192,9.932916893507325e64,4.284171818892018e180,3.3924488749573536e-166,-4.526863403365139e154,-6.0466176e12,1.7604680763258915e-200,3.1211022343882015e-51,2.6641518493114755e-51,2.778264857391199e-135,9.515169444917144e16,4.6605931180371665e-31,-3.1366338615854695e-166,1.3952482803738708e-173,2.940439287510636e115,2.0229150221728594e-116,4.765281104306267e164,-2.1089141610443028e36,8.758115402030107e-98,2.0407974599948066e146,3.909821048582988e18,8.869467784369342e201,-3.987710098523656e122,400.0,-3.2e6,-2.6508868895475236e75,-486.0,2.2769235605892562e-113,2.2299933951655375e171,1.9991308293079118e-68,6.761330816383421e-182,-1.3264435183244002e55,8.285525869852436e151,1.2324313723794561e-67,9.660782810498248e126,4.842355341464218e-100,5.324226003763131e-88,-1.8636779669928056e-115,2.047460125714052e-5,9.582928475098071e-193,3.4508611856016955e55,-3.912173508039657e220,-1.4989062990878527e-153,4.0261773080566945e83,7.696171705345129e-70,1.4233749165672596e-167,8.224949245144168e-101,-1.8081109361402158e-8,5.257884427277216e-200,1.625910509885536e-5,0.0125,8.097278682212585e41,2.583522915397947e195,7.302542786905401e-113,2.078009285663827e-33,-7.905724695228044e-177,2.866160227215887e136,3.7099632261675057e-202,4.6271698789736194e-17,9.752028342562713e51,-0.00546448087431694,1.296680499783801e-102,6.130728728984063e219,4.930380657631324e-32,6.201429724918115e47,7.564767659201277e125,5.142324024719673e217,5.932409462177878e-173,9.483133386844321e25,-1.3767763686950389e-39,-3.8468358415546087e253,2.2592594187348045e-168,2.3906104021463697e85,3.63583567407927e-44,3.6690179786359836e201,-1.2366638907312068e175,-2.3928202415517952e86,0.00031999999999999997,219.0,1.730389664343542e-59,-8.464149782874043e173,9.714257074222569e213,4.2559012338865495e169,8.017452683448489e-112,1.404181814319763e24,-3.213516514444115e-207,2.0009137673844083e140,2.0498130670567233e126,3.973397376543781e26,7.457028641785678e-228,-1.8131076045355185e44,1.2695455883421027e44,2.8437061701130083e-48,-8.641895373136655e-95,6.597828239110351e-119,-2.656704112192517e193,-4.216879177292209e186,8.231032858338497e-163,5.511344338857531e140,-4.4216712833865535e-67,-1.0960117273123103e163,8.080520584979044e-79,3.141819817790545e-89,-5.045190153884349e78,2.4931878879644915e-146,8.957022145892414e-169,2.302457944515962e152,1.0012878234372302e48,1.7469001504088244e234,8.991600555063543e-107,1.643415634622546e17,-8.478842138102143e-115,-1.0739685075328478e-148,8.186997698873468e29,1.6750190596859542e145,-2.95596777199944e-21,-8.342924059711652e-126,1.7398451754290918e191,8.225133882832399e-95,-7.856256891016854e-166,-1.7014417860965905e-77,1.2144790806693984e-184,-3.408978564983716e130,-3.973195810651e12,-1.342336166477908e179,8.375501200330171e-190,6.730405467197145e160,-2.991676068388708e-137,6.836763775561396e-141,29584.0,1.2522444868079202e52,3.2783136040873322e59,6.449503226567358e-134,2.266266318627774e-177,4.2348289869978374e-54,8.147563645587662e79,4.882706149807141e210,2.4904068332049752e-216,5.1478848e7,1.2328091989392849e-157,1.5375676680149856e-30,9.76337021970613e30,-8.385048715772533e28,7.358750657867182e-207,9.150024891823274e102,2.2094928152179996e-42,2.35260548044817e14,-4.2000907014369145e69,9.452168762299694e-111,-3.8392238435728152e-239,1.3002542446794857e100,1.5636047700684787e43,3.5716209009748464e43,-7.929842686127035e-130,1.7558454832112194e-169,1.6431847749381718e215,6.212039144291532e-173,4.2618442977e10,4.743571535381729e-141,2.1164710578754844e87,7.993067528443887e-99,2.4758800785707606e-64,7.096232556311846e-27,2.7975579641823007e-67,4.125105536090714e-24,417.0,9.546242870944664e-43,4.578740753271212e113,-3.238209022516084e-162,3.0000881113631706e-244,4.54065491851398e-233,-1.2583229244504648e-72,-5.091443947003983e-28,1.061824997609812e-114,2.4857358667295884e-120,-4.99071688515872e106,4.176098759634097e-149,-2.8790349852285606e-86,4.644974447985722e-99,-4.74838630333311e-126,3.389648602012764e222,1.5402461851362513e-156,7.166426861707054e-180,1.6168901924358765e195,5.522294247630902e133,4.123273353117463e-220,3.646692096048531e-64,9.173994463960286e105,3.856302691946496e15,-6.920424920950937e-62,-1.7592186044416e24,6.028363911347561e-118,-3.9327947138941296e198,2.8608733365592323e-108,-3.588536031139767e-84,3.014081790123457e-10,1.16138343111408e92,-4.643185230328461e-42,2.3184459846860924e-225,-8.522518716423026e223,1.2545401545868659e73,6.216206156594301e-47,5.5602971216385734e-93,2.3230573125418775e-24,1.9624909659545252e232,3.176907007172616e19,1.8470643539284524e182,1.3674728707231088e140,3.895043716900883e92,2.7556818537436535e-90,-4.517859111424925e58,1.045684998564551e-155,9.766432127448823e-106,-1.0,2.1100150244721306e-140,-1.9568052703645825e79,-2.6767773000303286e-263,1.734805438031672e39,8.695640598685266e53,478.0,7.552362715099305e247,4.592330657506567e45,5.481388184520098e-115,6.132378206412653e214,-1.0431944094242211e-158,5.559412419378264e214,2.5921854513648328e-164,1.82404388093954e188,-153.0,3.9142513012204145e-70,-1.291908018719188e-94,2.7877876251777757e163,1.144747008140002e-179,3.4283292280677e-49,1.4704380070711439e-118,-2.8375350918001073e68,-1.0884683841460743e-243,4.664268132292563e-65,7.325138869839517e-94,2.0255568326651316e228,-4.040978975203319e-73,2.137056497283951e-202,8.404589814263333e-257,-5.134054775281949e65,1.0,2.724545589602901e-41,6.099930559598651e-190,-8.296251744703199e-214,-1.3703429914624e13,-4.6523913960640966e22,-1.9999684366003315e178,-3.120866551806653e-54,9.047762306263685e-72,-1.493483262242543e-207,7.066681463011979e60,6.689717585696806e79,3.6155393676473645e109,5.689083750931067e-103,3.441519656584326e192,3.6318361619570944e164,-1.8266838393200515e-114,9.639746434237554e-153,1.8158843009809332e-97,1.3292279957849158e96,1.994584301184912e-89,1.0,1.9717798072143998e124,4.2848311670694263e-73,-6.853236341299404e-41,-5.273432553038418e41,8.240765445276302e-145,2.5372038582379557e-162,-1.2244497904564276e-148,1.2279375497287627e-99,5.293256656418563e-39,1.766063548900463e-8,1.8284362419730025e-114,9.2560815837092e54,9.522816236993813e176,-7.42494689391287e-186,7.407298086410551e-200,1.647333173740701e-171,5.15607415154998e-169,1.0,3.5407061614721497e-12,1.1724827159637921e-20,1.2476085969374238e-77,-1.0,7.745217472667258e47,9.050404017444221e-153,-7.509466514979725e175,2.8192871124994363e-239,-4.084101e6,-1.2855202874334076e-257,20736.0,2.564266157466905e136,-4.4510064438719e209,1.0,1.034893837856769e-159,-3.3312257658653794e-54,-6.016962566306107e-188,-6.762840245681044e229,1.6950253761641446e-19,3.2625730453439405e172,-1.4738463902886501e246,-1.443598513793639e119,5.311185032235906e-192,-8.300513205665792e15,7.595032829768403e-141,1.960676032022015e68,4.1723394343594254e-91,1.8747454547806794e-16,2.1369882854207458e141,2.091041992949158e-176,8.401253019911001e195,1.9571271632278001e226,1.766389711130061e240,1.793541639385619e-21,-3.987861795791585e229,2.1749051748734096e80,3.216373596638492e246,3.388131789017201e47,1.8496929345990438e85,1.3145433733447452e-176,3.970305881059397e32,-1.4447380841619862e-136,0.002145922746781116,5.788679247307528e-231,161604.0,4.855886567132955e-222,-5.029194979543545e-39,6.0013496125613475e68,-5.93441177331048e59,-5.998277398193953e-185,1.6384e-24,-5.109886149970146e139,1.0e44,-4.338414525582759e-117,-1.7245231888830454e-147,-3.725856732268698e-130,8.088009266888073e184,5.221517547354533e195,5.3881555985763494e-36,-2.0539934397472707e-58,5.070942774902497e24,-5.642724012795613e218,7.247098755614735e-188,1.2619156357626504e102,2.137738385844576e-73,3.1082484242868346e-65,8.481404903867077e-248,-5.5379054825441294e113,9.123467977945382e218,1.045607012044677e28,6.803951715355513e103,1.8300011322659494e-135,27.0,2.0238645732397923e167,1.1944702012580376e-117,1.9106255669977354e-160,4.848851464646412e-188,3.5477982736e10,1.1211908681922894e-191,1.3134325974934586e98,5.111686697146004e56,6.49424645570334e-228,5.2713744650043734e104,-1.156734407544554e-34,-1.5664774843579183e-175,2.6457558450387274e-42,2.2810225504524875e-124,7.531882698297019e-119,9.288393683287195e-136,2.390979945385936e193,4.1580291646122115e242,1.4108015711482188e137,1.1553109082576025e-198,1.5190753314210018e-19,4.912589042567262e20,1.3236695997373603e206,3.0080647460690842e140,2.417095626151931e-11,4.551715960790334e67,224676.0,5.785391862883971e-51,3.61101258864553e209,1.2821099080221036e196,5.428007703743705e50,6.428699442273497e86,2.1512623236395648e-37,6.223015277861141e-101,-1.1619068687574736e141,-5.217424678572588e-209,4.935994563309449e-65,3.9089771167559033e217,0.005154639175257732,1.3533416760736355e91,1.7514170785759283e143,-1.3100205086376203e123,1.5649586344986575e-242,2.0508257183774455e-147,7.484651657613653e75,-1.2557726454386771e-136,-8.203264425408544e158,1.3086579817272111e-68,6.717836693302715e-246,-4.440892098500626e-16,-3.6118521770284766e-73,2.4343943521511572e-182,2.2629174548091343e-210,6.818256144800637e207,1.2045080954698026e144,-2.797125294214806e-218,-1.0233439808144278e143,6.828178315412655e-14,2.4735855675697325e24,2.067815548641259e-197,4.79794923929466e-12,-3.957179034483215e-77,4.51174745881393e-11,8.243848945647827e-22,9.877505950281289e95,1.781490547314672e194,-3.237269921054587e223,1.8450721073077267e-40,2.7142178215609314e-16,-1.100627147839739e-160,1.6387073878463653e106,6.2025756253909425e-93,4.05822235581932e-172,5.119658907132118e-47,-9.651371215487797e147,3.498340473814374e-126,1.2055692870048237e39,-1.0082641059552347e-183,5.2942192897436595e163,2.6039450387425222e-115,-9.357257390213738e-18,9.797154805726018e-222,4.412059495408962e150,8.79745710312568e89,-4.687902428262417e-78,1.0,-4.837680676596855e156,1.1115637143416726e-85,9.899550597676792e117,-7.045003796096996e134,9.888849333491555e-6,407.0,1.2667348003600384e221,4.617050723261534e212,6.204126609655277e59,6.81840861580833e-11,2.5658103525282783e-145,3.5023491727292974e-146,9.917802075580135e-203,0.00029726516052318666],"x":[185.0,479.0,-235.0,478.0,-378.0,-479.0,-367.0,-353.0,124.0,-495.0,83.0,235.0,479.0,464.0,-444.0,449.0,-36.0,300.0,110.0,-319.0,-205.0,-460.0,-234.0,366.0,454.0,32.0,-219.0,-174.0,231.0,-149.0,-167.0,-121.0,80.0,-391.0,496.0,403.0,-365.0,290.0,132.0,-421.0,127.0,447.0,-84.0,167.0,130.0,328.0,401.0,-388.0,-234.0,-162.0,-57.0,60.0,-491.0,-272.0,-172.0,-485.0,260.0,-169.0,370.0,495.0,-479.0,-390.0,-131.0,292.0,-303.0,228.0,-121.0,-391.0,-474.0,354.0,-318.0,-5.0,-184.0,218.0,-465.0,-266.0,-413.0,-438.0,-448.0,425.0,152.0,-285.0,-445.0,-379.0,443.0,-436.0,-247.0,357.0,202.0,321.0,-428.0,359.0,-375.0,414.0,163.0,-193.0,35.0,-78.0,454.0,464.0,-51.0,-469.0,246.0,236.0,-372.0,494.0,433.0,-111.0,411.0,458.0,-14.0,-195.0,418.0,-408.0,432.0,196.0,301.0,-87.0,173.0,477.0,92.0,114.0,143.0,-423.0,135.0,273.0,-497.0,-240.0,-10.0,-289.0,-213.0,282.0,54.0,24.0,283.0,-357.0,-223.0,112.0,124.0,-148.0,-36.0,-48.0,-122.0,-121.0,445.0,-167.0,400.0,-177.0,-124.0,119.0,-93.0,425.0,195.0,280.0,-464.0,-442.0,-232.0,-1.0,-250.0,409.0,-233.0,-143.0,377.0,-364.0,57.0,123.0,318.0,14.0,-461.0,316.0,488.0,321.0,292.0,-482.0,-350.0,-20.0,-49.0,55.0,-275.0,-420.0,150.0,336.0,-7.0,182.0,314.0,370.0,473.0,472.0,-463.0,28.0,404.0,408.0,364.0,-124.0,421.0,285.0,-337.0,265.0,-132.0,171.0,-341.0,350.0,-265.0,378.0,252.0,487.0,375.0,10.0,40.0,-297.0,23.0,458.0,-97.0,-493.0,-406.0,332.0,450.0,462.0,-491.0,393.0,358.0,18.0,-375.0,-206.0,59.0,-319.0,-156.0,-269.0,-456.0,10.0,-432.0,461.0,338.0,178.0,401.0,-389.0,256.0,-188.0,-60.0,252.0,257.0,-171.0,-353.0,-31.0,304.0,145.0,-329.0,-275.0,-91.0,-128.0,-297.0,-136.0,125.0,289.0,193.0,-112.0,264.0,186.0,-445.0,-119.0,346.0,-303.0,-308.0,442.0,-186.0,173.0,-63.0,-457.0,-23.0,284.0,-132.0,356.0,46.0,-258.0,-162.0,223.0,-38.0,150.0,5.0,368.0,-110.0,-3.0,299.0,171.0,-6.0,325.0,401.0,18.0,-478.0,-477.0,-35.0,197.0,448.0,-115.0,499.0,198.0,-326.0,251.0,306.0,-344.0,-210.0,-269.0,-266.0,-240.0,-147.0,389.0,224.0,485.0,496.0,78.0,101.0,420.0,-327.0,151.0,247.0,-192.0,197.0,-343.0,176.0,-175.0,178.0,491.0,223.0,-343.0,-207.0,469.0,-165.0,385.0,421.0,-421.0,-437.0,-482.0,95.0,122.0,33.0,-172.0,316.0,-430.0,-433.0,317.0,338.0,209.0,252.0,-204.0,-299.0,-461.0,-186.0,130.0,122.0,-359.0,-417.0,-129.0,-104.0,-346.0,31.0,-383.0,276.0,72.0,-492.0,314.0,105.0,-184.0,260.0,-184.0,-351.0,-398.0,-258.0,-457.0,110.0,420.0,-369.0,279.0,-184.0,-245.0,195.0,-497.0,395.0,497.0,-44.0,121.0,44.0,-105.0,300.0,32.0,-263.0,402.0,-32.0,-265.0,252.0,130.0,241.0,-5.0,-309.0,384.0,196.0,-347.0,156.0,-47.0,214.0,262.0,127.0,231.0,196.0,175.0,43.0,-389.0,17.0,-120.0,-191.0,-191.0,-162.0,197.0,321.0,392.0,-362.0,-66.0,253.0,321.0,-223.0,278.0,-68.0,-169.0,11.0,-98.0,454.0,-161.0,499.0,151.0,-22.0,310.0,-114.0,-450.0,291.0,-424.0,407.0,491.0,258.0,351.0,-439.0,76.0,-65.0,428.0,-171.0,-466.0,313.0,-45.0,254.0,-442.0,383.0,-445.0,-256.0,-409.0,-469.0,248.0,-301.0,-1.0,-30.0,225.0,-329.0,-363.0,401.0,-367.0,73.0,-161.0,-367.0,-264.0,-34.0,258.0,-43.0,310.0,382.0,448.0,115.0,-490.0,176.0,-120.0,-426.0,383.0,-330.0,300.0,232.0,344.0,-162.0,443.0,-22.0,-356.0,189.0,26.0,-271.0,92.0,268.0,-491.0,155.0,332.0,311.0,332.0,-193.0,-490.0,-175.0,499.0,-289.0,-78.0,345.0,-362.0,-158.0,-463.0,7.0,-176.0,9.0,-114.0,434.0,248.0,227.0,233.0,-287.0,-277.0,-71.0,493.0,195.0,-170.0,189.0,-73.0,-41.0,487.0,332.0,401.0,-82.0,317.0,347.0,-48.0,340.0,-357.0,-5.0,110.0,-232.0,55.0,-157.0,47.0,-381.0,56.0,366.0,-462.0,470.0,-355.0,-374.0,149.0,-67.0,116.0,-108.0,362.0,-309.0,187.0,408.0,-302.0,448.0,463.0,276.0,121.0,-347.0,-475.0,-241.0,-9.0,36.0,-325.0,-86.0,-203.0,-386.0,27.0,361.0,-146.0,-151.0,-458.0,-231.0,-393.0,336.0,120.0,-56.0,-173.0,30.0,-142.0,68.0,-247.0,324.0,-173.0,-478.0,-359.0,223.0,44.0,48.0,-169.0,-315.0,179.0,-75.0,269.0,-114.0,-93.0,324.0,-225.0,336.0,477.0,-223.0,-426.0,435.0,-484.0,-253.0,-412.0,-480.0,488.0,446.0,-27.0,136.0,74.0,-79.0,-155.0,477.0,-166.0,426.0,-428.0,38.0,-373.0,171.0,-324.0,332.0,-10.0,62.0,-483.0,-181.0,361.0,-401.0,-260.0,110.0,174.0,143.0,80.0,-94.0,-346.0,-27.0,438.0,215.0,-216.0,-66.0,319.0,65.0,-44.0,452.0,321.0,-428.0,-246.0,-97.0,-273.0,-358.0,-230.0,-415.0,-3.0,-483.0,-170.0,194.0,-277.0,-145.0,245.0,498.0,-221.0,-55.0,415.0,88.0,-491.0,500.0,-180.0,156.0,-165.0,-459.0,9.0,-330.0,-33.0,485.0,376.0,-469.0,257.0,-142.0,415.0,224.0,338.0,-377.0,-387.0,17.0,-12.0,228.0,441.0,67.0,0.0,-80.0,-246.0,125.0,222.0,-212.0,-176.0,-417.0,366.0,268.0,489.0,-56.0,399.0,-134.0,-355.0,238.0,-398.0,232.0,-179.0,191.0,72.0,-157.0,148.0,450.0,5.0,-335.0,32.0,416.0,12.0,181.0,-358.0,-325.0,-481.0,471.0,-356.0,-111.0,-26.0,-443.0,63.0,71.0,-257.0,291.0,337.0,-180.0,-108.0,393.0,-105.0,450.0,71.0,50.0,279.0,-358.0,-88.0,-489.0,121.0,-430.0,-471.0,-351.0,-259.0,443.0,-415.0,-205.0,249.0,405.0,-209.0,23.0,317.0,499.0,301.0,397.0,-298.0,54.0,-432.0,-172.0,-153.0,-419.0,306.0,225.0,-466.0,322.0,-477.0,140.0,-267.0,440.0,461.0,-179.0,177.0,-358.0,-142.0,48.0,-105.0,144.0,-481.0,-164.0,320.0,-329.0,-203.0,-249.0,66.0,186.0,85.0,165.0,47.0,-137.0,499.0,128.0,-408.0,92.0,366.0,219.0,-80.0,104.0,-97.0,-196.0,88.0,399.0,324.0,-317.0,-219.0,277.0,-447.0,-388.0,241.0,441.0,-95.0,330.0,297.0,-90.0,497.0,91.0,-60.0,-312.0,336.0,-151.0,-424.0,384.0,-465.0,-291.0,-387.0,167.0,-224.0,199.0,453.0,-483.0,-348.0,-360.0,-111.0,19.0,115.0,-360.0,-223.0,432.0,345.0,128.0,-402.0,-494.0,-65.0,283.0,365.0,-345.0,-104.0,11.0,-459.0,-27.0,361.0,25.0,407.0,-280.0,379.0,358.0,-172.0,320.0,-214.0,-354.0,-383.0,419.0,-149.0,-12.0,54.0,-287.0,277.0,133.0,336.0,437.0,-482.0,-207.0,491.0,-126.0,-215.0,-155.0,-16.0,-345.0,456.0,-472.0,68.0,-496.0,364.0,265.0,324.0,231.0,62.0,-408.0,108.0,-451.0,-264.0,251.0,468.0,449.0,-257.0,282.0,-391.0,-45.0,-24.0,111.0,204.0,170.0,235.0,435.0,162.0,339.0,-398.0,-49.0,-312.0,-305.0,448.0,162.0,-347.0,52.0,-348.0,-192.0,429.0,433.0,432.0,-67.0,483.0,268.0,-110.0,-395.0,179.0,426.0,-367.0,-159.0,116.0,239.0,-220.0,-248.0,302.0,-85.0,-315.0,-218.0,-480.0,256.0,-53.0,359.0,76.0,205.0,-453.0,-253.0,-307.0,-249.0,23.0,-30.0,-371.0,477.0,-497.0,-2.0,295.0,85.0,118.0,-2.0,103.0,-263.0,81.0,-241.0,-23.0,30.0,290.0,38.0,-411.0,-383.0,-52.0,-204.0,152.0,390.0,442.0,426.0,204.0,102.0,330.0,-467.0,448.0,-144.0,259.0,230.0,-351.0,-239.0,229.0,-163.0,47.0,-226.0,60.0,-423.0,-259.0,386.0,308.0,145.0,-12.0,491.0,-129.0,-216.0,355.0,431.0,-467.0,255.0,405.0,-264.0,128.0,-241.0,277.0,-346.0,55.0,22.0,146.0,-310.0,161.0,-53.0,305.0,-86.0,-97.0,13.0,476.0,-174.0,116.0,415.0,-18.0,-134.0,315.0,453.0,328.0,-411.0,-404.0,313.0,-161.0,-271.0,466.0,96.0,233.0,-229.0,-499.0,-200.0,373.0,356.0,-372.0,395.0,217.0,-425.0,-364.0,-451.0,312.0,-40.0,29.0,-58.0,-346.0,-211.0,-463.0,234.0,428.0,-124.0,-389.0,-378.0,-475.0,491.0,-324.0,-211.0,-131.0,310.0,122.0,93.0,-230.0,-308.0,170.0,168.0,347.0,-92.0,-3.0,159.0,-82.0,-347.0,-188.0,-168.0,-413.0,-479.0,161.0,-264.0,49.0,-443.0,100.0,34.0,-315.0,-237.0,274.0,81.0,15.0,330.0,321.0,416.0,219.0,-445.0,214.0,-214.0,-251.0,-30.0,325.0,31.0,-269.0,302.0,431.0,-400.0,381.0,-308.0,-65.0,-41.0,63.0,55.0,138.0,245.0,293.0,-206.0,-63.0,-156.0,438.0,64.0,227.0,-74.0,283.0,-88.0,-339.0,-241.0,-397.0,157.0,-386.0,283.0,-214.0,-158.0,-155.0,0.0,14.0,25.0,204.0,212.0,-292.0,-348.0,377.0,-328.0,-394.0,-489.0,-397.0,192.0,-101.0,-197.0,280.0,319.0,-279.0,9.0,401.0,391.0,241.0,-458.0,-224.0,-89.0,298.0,7.0,149.0,-401.0,203.0,-475.0,172.0,289.0,149.0,402.0,146.0,-425.0,-401.0,-88.0,180.0,-196.0,40.0,423.0,-230.0,-312.0,348.0,-31.0,-465.0,9.0,-458.0,82.0,-394.0,167.0,367.0,-23.0,-372.0,-365.0,48.0,-83.0,9.0,-388.0,-146.0,9.0,-431.0,-67.0,-397.0,365.0,-391.0,87.0,476.0,-252.0,-86.0,199.0,294.0,233.0,94.0,163.0,479.0,216.0,-59.0,-298.0,97.0,136.0,173.0,455.0,-474.0,214.0,138.0,-66.0,488.0,323.0,14.0,140.0,-101.0,-498.0,-286.0,41.0,199.0,299.0,351.0,99.0,357.0,-245.0,-417.0,-88.0,29.0,65.0,-123.0,192.0,-340.0,-86.0,-414.0,-152.0,363.0,4.0,-201.0,469.0,273.0,-389.0,-254.0,-116.0,-419.0,-159.0,-134.0,64.0,72.0,91.0,408.0,-1.0,461.0,132.0,473.0,126.0,392.0,-146.0,-359.0,131.0,459.0,270.0,195.0,145.0,-295.0,444.0,267.0,-33.0,268.0,-331.0,-318.0,-47.0,-473.0,-194.0,-467.0,-446.0,-94.0,-211.0,282.0,474.0,482.0,134.0,-394.0,-446.0,-499.0,-87.0,-112.0,42.0,-249.0,-189.0,479.0,79.0,457.0,-430.0,132.0,447.0,328.0,352.0,484.0,70.0,255.0,270.0,-242.0,-17.0,-204.0,19.0,-458.0,-20.0,-409.0,142.0,-399.0,-147.0,-197.0,-17.0,430.0,248.0,-26.0,-236.0,12.0,-239.0,-388.0,92.0,76.0,-485.0,371.0,-140.0,221.0,-93.0,218.0,-423.0,-97.0,18.0,171.0,-229.0,415.0,-237.0,291.0,97.0,247.0,176.0,342.0,-327.0,235.0,-168.0,10.0,-361.0,-425.0,291.0,-181.0,-240.0,319.0,-283.0,-109.0,117.0,-259.0,-157.0,-427.0,303.0,-166.0,-260.0,-467.0,-105.0,288.0,-316.0,18.0,-273.0,363.0,-330.0,-383.0,-498.0,-447.0,-368.0,155.0,-352.0,-26.0,-165.0,-329.0,-356.0,-368.0,-446.0,-330.0,-134.0,-253.0,21.0,467.0,244.0,-498.0,282.0,-128.0,344.0,-122.0,-186.0,29.0,-230.0,-328.0,-495.0,-449.0,-145.0,-361.0,-454.0,-37.0,339.0,316.0,-262.0,-499.0,391.0,-349.0,-380.0,-140.0,299.0,-471.0,343.0,139.0,-333.0,479.0,464.0,358.0,313.0,-72.0,408.0,196.0,-67.0,348.0,-358.0,-317.0,399.0,131.0,-85.0,-252.0,-355.0,-343.0,-113.0,-199.0,346.0,62.0,376.0,374.0,246.0,243.0,137.0,429.0,180.0,393.0,76.0,1.0,225.0,465.0,344.0,-11.0,76.0,314.0,120.0,160.0,307.0,-285.0,-386.0,-62.0,-3.0,-224.0,397.0,-444.0,-19.0,-426.0,-342.0,-274.0,-81.0,195.0,-446.0,120.0,-353.0,319.0,-139.0,-398.0,292.0,231.0,412.0,-199.0,-477.0,407.0,-122.0,-104.0,-57.0,-203.0,41.0,80.0,207.0,87.0,368.0,318.0,-366.0,-84.0,369.0,-97.0,235.0,224.0,-456.0,76.0,-265.0,-197.0,-206.0,308.0,462.0,-1.0,100.0,-386.0,107.0,296.0,-78.0,90.0,-396.0,-277.0,-431.0,-165.0,-205.0,90.0,324.0,287.0,-105.0,-452.0,-307.0,-455.0,-126.0,31.0,-311.0,79.0,61.0,-354.0,37.0,-272.0,106.0,245.0,-141.0,319.0,241.0,262.0,-394.0,369.0,314.0,316.0,-327.0,338.0,-443.0,-488.0,-370.0,369.0,465.0,34.0,-195.0,-268.0,35.0,121.0,-55.0,278.0,273.0,-400.0,-463.0,-383.0,-443.0,-113.0,66.0,-382.0,-19.0,342.0,49.0,391.0,332.0,-212.0,-373.0,-444.0,-2.0,-21.0,340.0,437.0,-371.0,-399.0,-247.0,306.0,-335.0,199.0,124.0,102.0,-223.0,82.0,19.0,-249.0,287.0,176.0,-394.0,401.0,-239.0,112.0,-188.0,-261.0,474.0,193.0,487.0,-495.0,83.0,29.0,375.0,448.0,391.0,62.0,-457.0,-96.0,396.0,-337.0,172.0,303.0,-354.0,281.0,-487.0,231.0,-110.0,-59.0,-161.0,16.0,36.0,-151.0,-224.0,455.0,-97.0,198.0,-196.0,202.0,268.0,429.0,41.0,419.0,-268.0,442.0,-494.0,227.0,-60.0,-259.0,493.0,-445.0,306.0,29.0,-161.0,82.0,-298.0,250.0,-488.0,219.0,-363.0,-231.0,254.0,443.0,-196.0,301.0,-124.0,-436.0,-405.0,-170.0,-276.0,413.0,394.0,357.0,364.0,129.0,-468.0,-409.0,-358.0,438.0,47.0,-225.0,377.0,15.0,-480.0,-473.0,-6.0,-386.0,-182.0,-81.0,274.0,-22.0,-185.0,427.0,375.0,-56.0,81.0,467.0,-374.0,145.0,116.0,-492.0,112.0,-454.0,-209.0,-472.0,-119.0,488.0,149.0,292.0,324.0,303.0,55.0,-131.0,-475.0,318.0,208.0,-311.0,99.0,-392.0,14.0,-285.0,-482.0,-165.0,-338.0,-183.0,-204.0,16.0,392.0,471.0,433.0,442.0,-196.0,-177.0,460.0,-430.0,356.0,-105.0,431.0,-449.0,312.0,-4.0,205.0,464.0,-448.0,-230.0,-292.0,206.0,-368.0,114.0,-155.0,-487.0,404.0,232.0,464.0,234.0,-437.0,-206.0,-1.0,116.0,-247.0,-278.0,108.0,-211.0,-299.0,-313.0,7.0,-3.0,-370.0,157.0,-276.0,-251.0,325.0,61.0,-207.0,-374.0,-37.0,-106.0,-54.0,-310.0,112.0,-81.0,18.0,462.0,-24.0,-221.0,-214.0,211.0,-437.0,112.0,-249.0,-407.0,425.0,183.0,70.0,-251.0,301.0,-391.0,136.0,-111.0,253.0,81.0,-444.0,43.0,-250.0,-349.0,389.0,99.0,-298.0,-425.0,-353.0,121.0,-55.0,-242.0,103.0,-45.0,195.0,-34.0,365.0,201.0,-213.0,-292.0,13.0,344.0,415.0,53.0,314.0,171.0,368.0,-321.0,-291.0,-318.0,28.0,-462.0,-447.0,-246.0,104.0,369.0,112.0,-358.0,-335.0,-435.0,398.0,424.0,170.0,-32.0,147.0,-194.0,186.0,134.0,-413.0,-133.0,-365.0,466.0,409.0,-383.0,-266.0,98.0,-447.0,-166.0,239.0,19.0,-194.0,185.0,-82.0,168.0,-325.0,410.0,398.0,-223.0,498.0,-145.0,-329.0,8.0,306.0,-369.0,112.0,-51.0,64.0,-248.0,398.0,236.0,459.0,347.0,433.0,330.0,-207.0,56.0,-331.0,97.0,-129.0,-11.0,-92.0,-323.0,366.0,-388.0,-265.0,-495.0,273.0,87.0,181.0,-218.0,451.0,-219.0,-372.0,74.0,-409.0,262.0,-156.0,-443.0,55.0,-306.0,299.0,232.0,-429.0,89.0,27.0,327.0,198.0,475.0,-226.0,360.0,-78.0,-381.0,207.0,327.0,-330.0,-271.0,-25.0,-288.0,-75.0,321.0,375.0,-67.0,235.0,277.0,-154.0,279.0,-386.0,147.0,292.0,-318.0,262.0,86.0,222.0,269.0,-239.0,34.0,-342.0,-113.0,314.0,-494.0,-375.0,-125.0,437.0,271.0,186.0,-421.0,-359.0,356.0,114.0,77.0,-467.0,-43.0,-288.0,-450.0,352.0,-141.0,10.0,376.0,329.0,-130.0,342.0,137.0,478.0,320.0,86.0,-76.0,-131.0,305.0,120.0,181.0,3.0,339.0,-326.0,387.0,27.0,494.0,389.0,-280.0,-289.0,-341.0,-250.0,-36.0,-170.0,-79.0,-67.0,-303.0,22.0,-390.0,-262.0,-38.0,-113.0,-23.0,452.0,225.0,-57.0,-470.0,-144.0,-383.0,436.0,62.0,458.0,-435.0,386.0,284.0,131.0,270.0,417.0,330.0,-317.0,240.0,22.0,-53.0,-10.0,257.0,-54.0,451.0,125.0,-193.0,140.0,230.0,274.0,480.0,117.0,433.0,248.0,48.0,36.0,-22.0,-180.0,219.0,-57.0,275.0,275.0,75.0,-8.0,-87.0,-407.0,-383.0,159.0,-297.0,-40.0,-443.0,42.0,-138.0,-48.0,459.0,-70.0,-467.0,433.0,205.0,210.0,-429.0,270.0,148.0,-214.0,439.0,-387.0,387.0,-409.0,146.0,-356.0,-469.0,48.0,-478.0,-292.0,135.0,-349.0,-460.0,148.0,13.0,116.0,314.0,-470.0,-89.0,338.0,-241.0,479.0,-425.0,164.0,303.0,181.0,417.0,-155.0,-281.0,-97.0,184.0,400.0,96.0,-265.0,118.0,461.0,304.0,-409.0,-475.0,25.0,346.0,-416.0,182.0,106.0,395.0,-490.0,-151.0,-424.0,-294.0,-309.0,139.0,99.0,370.0,-129.0,-110.0,213.0,-356.0,212.0,-10.0,326.0,-89.0,-130.0,-217.0,-60.0,-9.0,-267.0,-329.0,234.0,-244.0,-105.0,-197.0,-191.0,418.0,-388.0,275.0,-16.0,111.0,-67.0,-197.0,156.0,-142.0,-154.0,330.0,132.0,-90.0,40.0,98.0,-111.0,195.0,26.0,10.0,-2.0,492.0,-68.0,490.0,234.0,-474.0,-412.0,74.0,41.0,-326.0,434.0,-387.0,-166.0,-8.0,-288.0,338.0,-314.0,-121.0,-90.0,-374.0,259.0,116.0,-84.0,41.0,385.0,33.0,-113.0,12.0,394.0,-447.0,211.0,462.0,97.0,61.0,-13.0,72.0,80.0,-371.0,-184.0,-181.0,82.0,-12.0,417.0,-268.0,452.0,-70.0,-466.0,-233.0,-82.0,-428.0,-460.0,-202.0,-391.0,16.0,146.0,221.0,-187.0,114.0,-320.0,201.0,-142.0,-387.0,398.0,241.0,408.0,335.0,-109.0,10.0,-275.0,-310.0,-264.0,471.0,-99.0,-189.0,449.0,295.0,422.0,4.0,-269.0,434.0,168.0,-254.0,383.0,51.0,80.0,-129.0,-194.0,185.0,-457.0,-364.0,-209.0,80.0,-260.0,-63.0,443.0,-157.0,-317.0,84.0,-384.0,-392.0,417.0,201.0,-304.0,-65.0,-466.0,297.0,110.0,463.0,48.0,248.0,213.0,171.0,407.0,-457.0,-98.0,465.0,38.0,251.0,155.0,294.0,-154.0,123.0,94.0,-345.0,-392.0,-143.0,152.0,446.0,52.0,335.0,-124.0,-353.0,98.0,-396.0,-10.0,493.0,137.0,4.0,226.0,142.0,-253.0,33.0,61.0,189.0,-328.0,154.0,-263.0,380.0,-249.0,86.0,448.0,20.0,488.0,-43.0,-128.0,-382.0,-299.0,459.0,-64.0,418.0,-352.0,-189.0,-64.0,-232.0,-22.0,292.0,-334.0,-164.0,14.0,391.0,-373.0,-419.0,48.0,318.0,165.0,325.0,-71.0,-497.0,469.0,185.0,-327.0,-345.0,-399.0,176.0,-475.0,-481.0,30.0,-145.0,55.0,-259.0,-232.0,-41.0,409.0,309.0,387.0,-241.0,30.0,-494.0,122.0,434.0,-398.0,-458.0,-45.0,-211.0,92.0,366.0,-313.0,-272.0,-266.0,56.0,-83.0,396.0,224.0,269.0,-304.0,-367.0,225.0,-372.0,-73.0,239.0,89.0,-11.0,-405.0,253.0,-138.0,-76.0,-462.0,-459.0,-191.0,-76.0,-93.0,-322.0,-102.0,23.0,179.0,242.0,-84.0,-267.0,32.0,314.0,255.0,459.0,178.0,-289.0,-439.0,-192.0,282.0,253.0,-238.0,-440.0,-366.0,-428.0,-177.0,125.0,454.0,-198.0,-431.0,426.0,492.0,-294.0,-17.0,-137.0,349.0,377.0,464.0,-298.0,-185.0,260.0,-295.0,193.0,215.0,21.0,-372.0,481.0,331.0,-474.0,-129.0,109.0,-140.0,-170.0,-368.0,137.0,-57.0,-419.0,278.0,-327.0,-117.0,377.0,-484.0,-175.0,351.0,16.0,-296.0,-336.0,237.0,473.0,189.0,-367.0,-176.0,105.0,198.0,-493.0,373.0,333.0,-233.0,93.0,114.0,392.0,314.0,-280.0,371.0,-241.0,-4.0,62.0,376.0,-152.0,495.0,-432.0,275.0,315.0,-499.0,-427.0,-298.0,170.0,-235.0,357.0,-490.0,438.0,23.0,152.0,59.0,-238.0,183.0,-150.0,-125.0,-355.0,402.0,-335.0,439.0,309.0,-220.0,471.0,335.0,-117.0,150.0,-374.0,-259.0,-176.0,-203.0,417.0,94.0,385.0,-332.0,-57.0,-374.0,351.0,-47.0,95.0,-478.0,-18.0,173.0,133.0,284.0,143.0,358.0,296.0,-232.0,22.0,428.0,-269.0,-488.0,-113.0,-28.0,-235.0,-485.0,-239.0,-133.0,-10.0,182.0,-430.0,476.0,-46.0,-106.0,498.0,311.0,288.0,-193.0,137.0,261.0,-105.0,-77.0,160.0,321.0,-264.0,212.0,-285.0,-377.0,-486.0,318.0,-100.0,-101.0,348.0,254.0,316.0,127.0,-497.0,418.0,-496.0,-191.0,107.0,-468.0,423.0,109.0,82.0,442.0,196.0,254.0,-397.0,-80.0,-368.0,-381.0,-279.0,317.0,325.0,-473.0,-408.0,-212.0,-129.0,265.0,-288.0,170.0,-364.0,-342.0,-376.0,65.0,8.0,101.0,35.0,-425.0,-474.0,80.0,463.0,-418.0,265.0,-411.0,262.0,-273.0,-450.0,-371.0,-44.0,-180.0,-424.0,-301.0,-379.0,-338.0,207.0,243.0,443.0,485.0,393.0,244.0,-160.0,-429.0,203.0,343.0,250.0,-153.0,323.0,-240.0,100.0,-61.0,-163.0,43.0,-13.0,183.0,-26.0,483.0,-283.0,-252.0,-127.0,96.0,-363.0,-457.0,107.0,-44.0,-245.0,-22.0,-370.0,-241.0,-439.0,-138.0,399.0,460.0,-20.0,-369.0,38.0,-184.0,14.0,-494.0,34.0,402.0,-236.0,264.0,-195.0,323.0,136.0,337.0,457.0,-432.0,147.0,75.0,321.0,-313.0,140.0,82.0,-451.0,300.0,235.0,-7.0,-43.0,-235.0,-23.0,383.0,7.0,-476.0,253.0,127.0,288.0,-107.0,336.0,-427.0,474.0,-458.0,402.0,491.0,306.0,62.0,407.0,418.0,358.0,115.0,-441.0,255.0,207.0,391.0,-44.0,-29.0,-361.0,290.0,372.0,171.0,348.0,-347.0,-193.0,-128.0,202.0,469.0,286.0,-31.0,213.0,268.0,302.0,294.0,-166.0,56.0,-202.0,-154.0,371.0,112.0,-74.0,-64.0,-119.0,-157.0,-443.0,-113.0,36.0,-59.0,-315.0,260.0,-348.0,267.0,189.0,146.0,-48.0,-449.0,-131.0,-404.0,279.0,268.0,-276.0,-185.0,-443.0,350.0,-266.0,161.0,-338.0,494.0,313.0,372.0,281.0,-226.0,203.0,53.0,344.0,-182.0,447.0,249.0,406.0,-329.0,128.0,-495.0,-240.0,-28.0,-391.0,-378.0,107.0,128.0,-18.0,-64.0,-80.0,-141.0,454.0,443.0,439.0,-166.0,281.0,454.0,303.0,459.0,-352.0,-280.0,493.0,-409.0,342.0,-165.0,21.0,-190.0,484.0,14.0,-401.0,-148.0,-351.0,-358.0,200.0,410.0,226.0,176.0,458.0,324.0,76.0,-34.0,373.0,-124.0,205.0,-149.0,400.0,244.0,246.0,484.0,232.0,160.0,-131.0,-151.0,-247.0,123.0,-25.0,358.0,-383.0,35.0,342.0,7.0,353.0,369.0,370.0,-369.0,-472.0,199.0,447.0,338.0,-225.0,-144.0,494.0,456.0,450.0,-438.0,-154.0,396.0,-260.0,-4.0,-255.0,-100.0,-234.0,-418.0,93.0,-206.0,167.0,-117.0,-44.0,-210.0,109.0,215.0,-320.0,-255.0,27.0,375.0,348.0,390.0,-190.0,-421.0,-90.0,-238.0,80.0,143.0,-147.0,-292.0,115.0,420.0,149.0,-386.0,233.0,105.0,-66.0,255.0,-364.0,243.0,-275.0,436.0,-426.0,360.0,-111.0,347.0,-402.0,-240.0,-406.0,-34.0,-96.0,232.0,486.0,-65.0,-302.0,-23.0,484.0,-443.0,-32.0,-423.0,396.0,-153.0,358.0,-144.0,471.0,-209.0,-420.0,82.0,210.0,-48.0,79.0,284.0,111.0,314.0,-223.0,250.0,-173.0,-23.0,-487.0,-60.0,375.0,261.0,433.0,-344.0,356.0,-322.0,233.0,1.0,222.0,379.0,385.0,429.0,431.0,-110.0,449.0,290.0,64.0,-7.0,-64.0,-153.0,-355.0,-84.0,-36.0,340.0,-55.0,429.0,-31.0,-97.0,-439.0,-248.0,153.0,-424.0,273.0,-354.0,-214.0,475.0,-294.0,-454.0,33.0,-140.0,-367.0,342.0,419.0,443.0,433.0,58.0,41.0,-191.0,239.0,-84.0,-459.0,273.0,-351.0,253.0,-442.0,473.0,-125.0,-499.0,-215.0,-130.0,145.0,317.0,-317.0,328.0,-474.0,-368.0,463.0,458.0,-250.0,83.0,489.0,-209.0,194.0,312.0,-63.0,-193.0,-60.0,23.0,425.0,387.0,34.0,-294.0,-132.0,169.0,-473.0,293.0,419.0,455.0,-103.0,-336.0,-5.0,-371.0,273.0,231.0,-134.0,333.0,-408.0,-226.0,436.0,376.0,201.0,-188.0,151.0,463.0,240.0,-225.0,50.0,250.0,327.0,337.0,164.0,-362.0,-84.0,10.0,37.0,274.0,32.0,470.0,266.0,108.0,-189.0,-41.0,-210.0,-420.0,131.0,108.0,-95.0,-116.0,233.0,14.0,261.0,72.0,-473.0,272.0,-56.0,-433.0,175.0,42.0,249.0,390.0,369.0,-343.0,398.0,140.0,-75.0,-8.0,-149.0,397.0,-113.0,-328.0,-261.0,208.0,467.0,-92.0,-90.0,448.0,16.0,133.0,193.0,-456.0,-110.0,20.0,-320.0,-326.0,-204.0,-159.0,-157.0,-43.0,-421.0,-328.0,-308.0,-368.0,302.0,-171.0,-488.0,382.0,-326.0,14.0,-334.0,367.0,183.0,437.0,-144.0,-223.0,295.0,176.0,432.0,88.0,-131.0,-195.0,448.0,240.0,248.0,-410.0,-116.0,208.0,-303.0,393.0,13.0,430.0,128.0,276.0,399.0,357.0,-22.0,371.0,-298.0,-231.0,407.0,-8.0,207.0,-131.0,248.0,223.0,-86.0,-220.0,332.0,237.0,5.0,321.0,-221.0,163.0,5.0,-40.0,48.0,-299.0,-272.0,-105.0,-316.0,-388.0,329.0,155.0,234.0,335.0,330.0,27.0,-256.0,99.0,66.0,-355.0,-97.0,-258.0,-67.0,-212.0,-375.0,-461.0,258.0,395.0,-8.0,-423.0,167.0,15.0,-377.0,-338.0,-289.0,-283.0,28.0,115.0,-221.0,-20.0,11.0,255.0,284.0,387.0,-227.0,129.0,124.0,261.0,-438.0,86.0,251.0,-169.0,389.0,-341.0,390.0,370.0,99.0,-156.0,361.0,482.0,-104.0,-327.0,489.0,488.0,-257.0,-243.0,499.0,-214.0,-313.0,-361.0,-472.0,373.0,223.0,152.0,155.0,-95.0,-32.0,-241.0,-101.0,273.0,411.0,-291.0,-405.0,-26.0,-328.0,314.0,497.0,238.0,97.0,371.0,-92.0,44.0,165.0,353.0,220.0,235.0,321.0,380.0,-222.0,467.0,472.0,-454.0,141.0,470.0,-72.0,-174.0,218.0,-377.0,-222.0,312.0,408.0,-206.0,-9.0,193.0,13.0,-107.0,-441.0,-381.0,15.0,338.0,412.0,-298.0,55.0,-63.0,266.0,-349.0,-19.0,-85.0,122.0,-305.0,218.0,-488.0,286.0,-366.0,362.0,-158.0,-128.0,-80.0,-429.0,46.0,350.0,-122.0,-67.0,-375.0,-401.0,-127.0,62.0,-256.0,-157.0,-457.0,439.0,496.0,493.0,-362.0,-87.0,-374.0,-221.0,131.0,-240.0,486.0,-286.0,-81.0,23.0,450.0,-146.0,272.0,-300.0,-288.0,-464.0,-229.0,495.0,33.0,-103.0,-81.0,342.0,283.0,-6.0,-321.0,226.0,-41.0,413.0,-281.0,202.0,201.0,286.0,-82.0,464.0,-428.0,153.0,-194.0,482.0,-410.0,-105.0,16.0,-356.0,-472.0,-115.0,-262.0,33.0,300.0,185.0,151.0,-354.0,-113.0,-23.0,485.0,372.0,-443.0,14.0,-56.0,82.0,26.0,473.0,-422.0,-62.0,141.0,401.0,197.0,-223.0,476.0,-485.0,370.0,416.0,180.0,134.0,-386.0,67.0,174.0,208.0,-80.0,84.0,-352.0,-282.0,331.0,-100.0,298.0,-208.0,-312.0,321.0,404.0,-286.0,-167.0,457.0,386.0,-145.0,247.0,179.0,-267.0,-256.0,438.0,222.0,292.0,64.0,-212.0,416.0,280.0,-50.0,220.0,240.0,-230.0,-269.0,-337.0,183.0,18.0,-341.0,-459.0,258.0,-15.0,301.0,-208.0,55.0,39.0,415.0,-35.0,-455.0,-159.0,-458.0,-287.0,-217.0,435.0,-408.0,-357.0,140.0,-38.0,36.0,403.0,76.0,424.0,333.0,-328.0,-100.0,380.0,413.0,264.0,-154.0,-465.0,272.0,473.0,-378.0,-356.0,-456.0,6.0,83.0,-329.0,-486.0,-307.0,340.0,-22.0,-216.0,-264.0,-222.0,310.0,484.0,-243.0,-204.0,376.0,33.0,365.0,-77.0,-492.0,313.0,386.0,202.0,-52.0,381.0,202.0,-387.0,383.0,-456.0,38.0,-35.0,-150.0,-286.0,164.0,-174.0,-238.0,-161.0,452.0,-66.0,-479.0,47.0,-14.0,78.0,80.0,-59.0,193.0,-335.0,-256.0,-161.0,425.0,62.0,396.0,-9.0,178.0,291.0,418.0,307.0,-166.0,-128.0,-352.0,-434.0,266.0,-395.0,-142.0,-256.0,-315.0,438.0,143.0,156.0,0.0,471.0,233.0,226.0,-458.0,-213.0,370.0,351.0,-186.0,3.0,39.0,65.0,-282.0,202.0,114.0,255.0,402.0,459.0,408.0,-195.0,190.0,-360.0,480.0,-9.0,-43.0,-328.0,472.0,-146.0,-152.0,305.0,-260.0,220.0,171.0,-285.0,293.0,298.0,448.0,-193.0,492.0,-15.0,-76.0,-230.0,-54.0,182.0,467.0,-410.0,-189.0,-448.0,442.0,20.0,-375.0,205.0,-116.0,48.0,-136.0,238.0,33.0,177.0,-131.0,-112.0,-415.0,346.0,162.0,52.0,-213.0,-40.0,-254.0,482.0,-56.0,-38.0,249.0,215.0,-67.0,-64.0,404.0,-281.0,320.0,-283.0,243.0,205.0,-381.0,481.0,98.0,-57.0,-11.0,217.0,188.0,55.0,-217.0,200.0,-144.0,-114.0,-355.0,152.0,-26.0,-354.0,488.0,-185.0,-154.0,-197.0,151.0,-459.0,497.0,229.0,-336.0,101.0,-75.0,172.0,345.0,-231.0,418.0,-366.0,-13.0,-457.0,433.0,-133.0,470.0,-185.0,-226.0,26.0,229.0,-302.0,133.0,-298.0,-312.0,-56.0,212.0,-127.0,212.0,333.0,61.0,-255.0,-255.0,192.0,375.0,-473.0,-50.0,-286.0,-178.0,-451.0,-35.0,-432.0,215.0,27.0,477.0,198.0,-210.0,-75.0,336.0,-28.0,307.0,-387.0,-367.0,312.0,-416.0,294.0,418.0,-325.0,-293.0,304.0,-226.0,-251.0,-171.0,337.0,-88.0,292.0,98.0,364.0,-444.0,-414.0,29.0,-297.0,44.0,-434.0,-445.0,446.0,-134.0,355.0,500.0,-291.0,-467.0,-17.0,372.0,-130.0,35.0,-411.0,-372.0,261.0,487.0,-127.0,-48.0,391.0,489.0,394.0,-464.0,-380.0,-216.0,397.0,117.0,-231.0,-7.0,479.0,-56.0,435.0,-103.0,440.0,-41.0,-478.0,151.0,78.0,-488.0,359.0,393.0,-323.0,-123.0,-148.0,-430.0,-338.0,-250.0,158.0,-475.0,388.0,311.0,49.0,-377.0,-242.0,-131.0,-63.0,280.0,-468.0,-483.0,-89.0,-104.0,172.0,-398.0,-3.0,424.0,-336.0,18.0,-481.0,-88.0,145.0,-467.0,-165.0,58.0,-170.0,-490.0,-456.0,-473.0,351.0,-166.0,244.0,-17.0,238.0,34.0,384.0,290.0,-386.0,-492.0,-431.0,306.0,386.0,355.0,118.0,302.0,352.0,-7.0,337.0,-461.0,-192.0,445.0,-218.0,437.0,-326.0,-187.0,-338.0,475.0,187.0,133.0,44.0,156.0,142.0,-340.0,-478.0,-311.0,-154.0,-220.0,-322.0,-286.0,-134.0,80.0,226.0,-266.0,27.0,247.0,-453.0,-158.0,54.0,-298.0,-419.0,214.0,413.0,-329.0,297.0,-46.0,-2.0,-430.0,341.0,-239.0,197.0,-298.0,239.0,-330.0,-336.0,-51.0,376.0,-53.0,413.0,-192.0,497.0,472.0,279.0,-29.0,63.0,-486.0,164.0,-280.0,336.0,-40.0,-472.0,462.0,470.0,-440.0,395.0,-432.0,-314.0,14.0,343.0,-212.0,-316.0,-382.0,398.0,112.0,-104.0,74.0,-148.0,80.0,37.0,259.0,-331.0,206.0,-38.0,-249.0,291.0,329.0,47.0,109.0,-375.0,-324.0,424.0,-344.0,-254.0,262.0,186.0,163.0,107.0,-51.0,-342.0,257.0,-300.0,266.0,-199.0,379.0,-273.0,-312.0,-211.0,119.0,-406.0,251.0,159.0,-29.0,440.0,-359.0,130.0,-86.0,386.0,67.0,-177.0,322.0,-388.0,-197.0,25.0,-94.0,40.0,147.0,486.0,-93.0,-119.0,-111.0,310.0,-359.0,258.0,283.0,299.0,-105.0,30.0,229.0,-45.0,93.0,-171.0,125.0,-492.0,-265.0,495.0,409.0,136.0,-215.0,450.0,-77.0,407.0,-65.0,-360.0,46.0,366.0,-387.0,72.0,-207.0,220.0,180.0,91.0,-286.0,-30.0,-270.0,223.0,-221.0,-443.0,-183.0,-42.0,110.0,-323.0,-74.0,325.0,210.0,147.0,319.0,-485.0,-460.0,93.0,174.0,79.0,370.0,-194.0,-19.0,342.0,158.0,36.0,-288.0,-454.0,376.0,242.0,-239.0,-341.0,149.0,39.0,377.0,-106.0,410.0,-232.0,15.0,-7.0,348.0,232.0,-176.0,75.0,129.0,255.0,-403.0,-240.0,67.0,104.0,162.0,-73.0,-274.0,-221.0,125.0,-152.0,-471.0,-227.0,-414.0,-35.0,191.0,-428.0,240.0,-261.0,40.0,145.0,294.0,-483.0,482.0,-74.0,431.0,115.0,293.0,-500.0,-340.0,313.0,126.0,-485.0,416.0,268.0,254.0,184.0,421.0,435.0,325.0,-207.0,423.0,87.0,312.0,23.0,405.0,-499.0,119.0,295.0,482.0,-205.0,371.0,218.0,472.0,125.0,-283.0,166.0,-13.0,431.0,-361.0,-22.0,-23.0,310.0,368.0,220.0,-216.0,-46.0,-200.0,-451.0,398.0,-146.0,-307.0,214.0,-347.0,265.0,163.0,-317.0,-436.0,57.0,-459.0,-119.0,27.0,-221.0,-141.0,-294.0,77.0,177.0,-71.0,-291.0,-56.0,-416.0,-70.0,-5.0,208.0,299.0,179.0,-244.0,-318.0,-421.0,-182.0,-238.0,-278.0,-378.0,249.0,120.0,222.0,-152.0,165.0,130.0,226.0,257.0,-55.0,303.0,-480.0,-110.0,206.0,-285.0,-96.0,-197.0,218.0,-65.0,128.0,380.0,400.0,249.0,351.0,-120.0,-159.0,455.0,-129.0,-2.0,-271.0,200.0,-251.0,-22.0,-373.0,223.0,300.0,429.0,377.0,393.0,165.0,29.0,55.0,44.0,440.0,-79.0,-169.0,-54.0,-437.0,-314.0,-253.0,-90.0,-53.0,-424.0,-304.0,11.0,-279.0,-236.0,-468.0,247.0,-141.0,-374.0,116.0,386.0,399.0,-398.0,383.0,-435.0,110.0,388.0,-154.0,-34.0,416.0,373.0,-109.0,-426.0,335.0,77.0,-11.0,154.0,-433.0,50.0,160.0,418.0,-79.0,-27.0,470.0,408.0,215.0,369.0,82.0,284.0,459.0,-107.0,193.0,-338.0,-386.0,343.0,458.0,-127.0,-323.0,59.0,146.0,-322.0,67.0,258.0,26.0,229.0,39.0,185.0,-456.0,-66.0,58.0,-340.0,413.0,-294.0,-310.0,-57.0,489.0,-337.0,-103.0,53.0,344.0,313.0,70.0,146.0,-321.0,447.0,449.0,-266.0,-426.0,426.0,19.0,243.0,-119.0,-390.0,-231.0,140.0,-141.0,4.0,-385.0,-104.0,-105.0,439.0,53.0,-317.0,-215.0,385.0,-63.0,454.0,352.0,459.0,430.0,-74.0,-334.0,-493.0,178.0,92.0,165.0,47.0,118.0,-402.0,396.0,380.0,497.0,-336.0,-420.0,241.0,492.0,-27.0,109.0,188.0,112.0,-57.0,106.0,47.0,-234.0,-353.0,337.0,-212.0,-412.0,-116.0,-26.0,128.0,378.0,-306.0,262.0,-306.0,438.0,-62.0,-88.0,248.0,123.0,150.0,384.0,386.0,52.0,-168.0,182.0,-284.0,-332.0,-196.0,461.0,260.0,-428.0,205.0,-259.0,-298.0,434.0,-51.0,-267.0,367.0,-16.0,-341.0,21.0,-262.0,128.0,402.0,167.0,91.0,310.0,-172.0,264.0,-246.0,361.0,329.0,372.0,-226.0,485.0,-254.0,-55.0,-198.0,-316.0,395.0,224.0,-42.0,-326.0,-353.0,-450.0,432.0,266.0,46.0,-375.0,-160.0,296.0,-391.0,-242.0,457.0,-431.0,-85.0,238.0,-334.0,122.0,-432.0,234.0,-202.0,-201.0,292.0,-490.0,-128.0,-130.0,-489.0,440.0,-2.0,233.0,-184.0,-33.0,281.0,387.0,172.0,-435.0,186.0,41.0,298.0,-14.0,-47.0,-189.0,-444.0,-175.0,94.0,40.0,-365.0,75.0,-192.0,-343.0,-356.0,403.0,268.0,93.0,-149.0,178.0,-467.0,-288.0,419.0,-473.0,-278.0,-172.0,-351.0,32.0,43.0,156.0,-137.0,258.0,-319.0,282.0,-267.0,-288.0,339.0,229.0,35.0,-248.0,-136.0,-10.0,-495.0,282.0,13.0,446.0,380.0,229.0,-362.0,-335.0,-382.0,-34.0,-31.0,-323.0,-115.0,208.0,-148.0,402.0,347.0,58.0,-457.0,403.0,-187.0,-445.0,-373.0,-187.0,278.0,487.0,-233.0,133.0,-177.0,472.0,421.0,-432.0,100.0,453.0,85.0,-436.0,-119.0,316.0,350.0,0.0,334.0,-262.0,-239.0,-171.0,314.0,-412.0,267.0,68.0,383.0,-206.0,-89.0,-474.0,-18.0,-442.0,491.0,-185.0,-127.0,438.0,-345.0,-329.0,407.0,-262.0,-454.0,157.0,428.0,289.0,-320.0,414.0,-369.0,83.0,-121.0,-416.0,25.0,289.0,-351.0,279.0,240.0,127.0,461.0,31.0,466.0,-185.0,349.0,165.0,471.0,-320.0,80.0,-58.0,-392.0,-176.0,298.0,167.0,-13.0,491.0,329.0,111.0,488.0,130.0,-54.0,-411.0,103.0,118.0,266.0,-169.0,324.0,-189.0,433.0,-192.0,324.0,-143.0,18.0,-275.0,474.0,381.0,387.0,405.0,64.0,399.0,-466.0,198.0,262.0,-211.0,-496.0,-310.0,-41.0,150.0,-419.0,-499.0,203.0,437.0,-257.0,421.0,-366.0,-117.0,-101.0,-113.0,122.0,30.0,351.0,-43.0,-40.0,284.0,-206.0,-199.0,442.0,-118.0,467.0,121.0,398.0,-126.0,385.0,-73.0,-360.0,314.0,157.0,459.0,-148.0,77.0,337.0,-185.0,320.0,-421.0,-426.0,453.0,-264.0,80.0,-229.0,-7.0,360.0,-406.0,400.0,-20.0,-193.0,-486.0,179.0,331.0,6.0,242.0,-60.0,148.0,12.0,142.0,-304.0,152.0,-76.0,221.0,-136.0,43.0,-301.0,-164.0,47.0,294.0,445.0,57.0,-381.0,454.0,248.0,80.0,99.0,-212.0,-274.0,36.0,-425.0,-89.0,485.0,-43.0,299.0,-183.0,-480.0,479.0,256.0,452.0,136.0,318.0,65.0,-396.0,-111.0,-467.0,-292.0,51.0,-259.0,356.0,-494.0,-164.0,5.0,219.0,-182.0,-90.0,189.0,99.0,58.0,482.0,-209.0,499.0,82.0,-457.0,408.0,-84.0,43.0,318.0,-154.0,231.0,-214.0,-125.0,155.0,96.0,-451.0,-103.0,493.0,128.0,-134.0,497.0,-296.0,471.0,-152.0,-220.0,202.0,288.0,-45.0,-39.0,-311.0,392.0,-191.0,-188.0,-384.0,111.0,-159.0,-61.0,-424.0,-138.0,-331.0,-212.0,-359.0,78.0,-126.0,-261.0,-172.0,28.0,45.0,51.0,433.0,348.0,-461.0,371.0,186.0,372.0,53.0,73.0,242.0,-426.0,220.0,248.0,-11.0,113.0,-379.0,362.0,-256.0,369.0,251.0,-14.0,-112.0,-75.0,490.0,446.0,33.0,54.0,-120.0,448.0,5.0,-412.0,42.0,218.0,417.0,6.0,383.0,-163.0,324.0,315.0,-47.0,-66.0,341.0,276.0,-18.0,401.0,-122.0,387.0,-158.0,220.0,-272.0,153.0,-108.0,222.0,-409.0,154.0,-16.0,-396.0,-37.0,-160.0,28.0,-283.0,-62.0,-180.0,-240.0,427.0,-270.0,357.0,-431.0,408.0,-369.0,-70.0,-30.0,357.0,274.0,340.0,-318.0,-103.0,11.0,-78.0,316.0,39.0,-1.0,386.0,-139.0,-449.0,413.0,283.0,478.0,382.0,119.0,-61.0,484.0,-228.0,229.0,-435.0,350.0,-153.0,110.0,-12.0,72.0,108.0,265.0,285.0,-7.0,-361.0,78.0,213.0,-393.0,-480.0,288.0,465.0,-98.0,-262.0,343.0,203.0,-498.0,-424.0,-115.0,-277.0,-212.0,-166.0,-415.0,-149.0,-99.0,309.0,167.0,434.0,-193.0,-30.0,172.0,158.0,-40.0,291.0,197.0,-139.0,6.0,-476.0,-157.0,-252.0,404.0,-67.0,177.0,82.0,384.0,263.0,158.0,438.0,-405.0,-417.0,354.0,-188.0,34.0,-27.0,310.0,7.0,-1.0,-248.0,121.0,-300.0,479.0,-21.0,-445.0,12.0,-420.0,-161.0,1.0,236.0,-352.0,-367.0,-296.0,-222.0,-411.0,-345.0,-217.0,-246.0,-188.0,-495.0,102.0,-324.0,-418.0,334.0,-459.0,159.0,241.0,338.0,-392.0,-380.0,-324.0,478.0,25.0,-322.0,354.0,109.0,-295.0,466.0,299.0,402.0,202.0,-179.0,-286.0,-246.0,-147.0,50.0,-82.0,-100.0,-237.0,-41.0,-345.0,252.0,323.0,-58.0,-203.0,-35.0,-287.0,-338.0,134.0,-38.0,245.0,-332.0,-337.0,468.0,143.0,-229.0,149.0,27.0,159.0,218.0,144.0,235.0,434.0,119.0,-382.0,106.0,357.0,-415.0,-183.0,-489.0,-54.0,115.0,17.0,353.0,244.0,358.0,-434.0,-298.0,37.0,53.0,234.0,43.0,-451.0,-180.0,-474.0,325.0,-486.0,151.0,-130.0,131.0,-416.0,-320.0,-246.0,-433.0,198.0,363.0,194.0,-479.0,244.0,-90.0,277.0,-96.0,-235.0,-169.0,-333.0,87.0,-358.0,-2.0,-482.0,213.0,-190.0,368.0,374.0,-195.0,-91.0,76.0,275.0,145.0,-77.0,-91.0,53.0,-432.0,-464.0,-268.0,-181.0,78.0,393.0,-289.0,338.0,267.0,-61.0,-373.0,-94.0,-37.0,114.0,-238.0,397.0,218.0,-78.0,460.0,-269.0,442.0,-464.0,412.0,-161.0,-133.0,18.0,-193.0,-318.0,407.0,305.0,261.0,-310.0,-348.0,-476.0,322.0,-335.0,-58.0],"y":[18.0,-86.0,-44.0,-76.0,68.0,-10.0,78.0,-75.0,-94.0,-58.0,-85.0,28.0,-70.0,12.0,40.0,87.0,-48.0,4.0,89.0,-80.0,88.0,-2.0,-31.0,49.0,79.0,56.0,45.0,43.0,50.0,0.0,-88.0,75.0,6.0,52.0,83.0,-3.0,-44.0,-9.0,-38.0,-81.0,-70.0,-77.0,68.0,-56.0,63.0,-61.0,26.0,15.0,46.0,86.0,-63.0,28.0,33.0,78.0,24.0,-99.0,-22.0,-5.0,88.0,-36.0,-71.0,70.0,-24.0,10.0,95.0,-46.0,5.0,-64.0,40.0,-38.0,86.0,-22.0,-29.0,-22.0,38.0,-12.0,25.0,17.0,8.0,19.0,51.0,-88.0,53.0,23.0,-80.0,-94.0,47.0,3.0,-62.0,-16.0,-51.0,-40.0,-84.0,-21.0,-19.0,1.0,-34.0,23.0,1.0,-69.0,85.0,84.0,-52.0,45.0,16.0,-77.0,-68.0,35.0,-39.0,-65.0,-31.0,53.0,27.0,-86.0,34.0,-99.0,-48.0,-24.0,-64.0,39.0,-20.0,-40.0,-41.0,17.0,-20.0,40.0,-78.0,-40.0,74.0,59.0,53.0,27.0,-34.0,93.0,-17.0,91.0,-18.0,86.0,-45.0,-2.0,13.0,98.0,-12.0,11.0,-71.0,7.0,-33.0,-70.0,-50.0,-97.0,-76.0,71.0,9.0,-69.0,38.0,-64.0,50.0,18.0,-89.0,-15.0,-54.0,-8.0,-7.0,-55.0,-44.0,22.0,2.0,-3.0,-18.0,44.0,6.0,-18.0,32.0,97.0,37.0,-48.0,65.0,-25.0,-52.0,-32.0,77.0,-96.0,-85.0,6.0,96.0,70.0,-75.0,0.0,-48.0,58.0,3.0,7.0,-81.0,56.0,58.0,-16.0,1.0,-53.0,-87.0,-38.0,1.0,-32.0,-51.0,-18.0,-47.0,-48.0,-18.0,66.0,-79.0,-59.0,51.0,25.0,-77.0,37.0,-81.0,-10.0,69.0,8.0,-52.0,-49.0,25.0,46.0,-80.0,4.0,-82.0,-3.0,-99.0,94.0,-94.0,47.0,-46.0,26.0,-58.0,-12.0,81.0,-47.0,-50.0,-32.0,-28.0,85.0,-47.0,-15.0,28.0,-59.0,-69.0,-6.0,99.0,2.0,62.0,-15.0,-5.0,-13.0,-80.0,-91.0,56.0,3.0,53.0,-54.0,26.0,41.0,88.0,71.0,-99.0,-24.0,-2.0,53.0,-70.0,-7.0,-1.0,-79.0,-84.0,0.0,4.0,-49.0,74.0,-52.0,98.0,61.0,35.0,-89.0,-83.0,41.0,-84.0,-100.0,-4.0,-99.0,41.0,-98.0,-62.0,74.0,93.0,12.0,-3.0,-40.0,-13.0,-45.0,-99.0,-84.0,4.0,43.0,-89.0,57.0,18.0,-11.0,-88.0,88.0,-47.0,57.0,19.0,9.0,87.0,57.0,45.0,92.0,-23.0,92.0,49.0,62.0,-76.0,-62.0,78.0,-49.0,91.0,-93.0,79.0,6.0,1.0,22.0,-91.0,-11.0,-99.0,-93.0,29.0,-33.0,39.0,-22.0,69.0,-18.0,-84.0,85.0,88.0,67.0,-33.0,25.0,47.0,-96.0,-38.0,59.0,-21.0,-86.0,-88.0,51.0,-44.0,94.0,76.0,-23.0,89.0,17.0,1.0,29.0,9.0,60.0,-16.0,-73.0,-63.0,60.0,-56.0,-43.0,-24.0,97.0,-51.0,-94.0,6.0,-5.0,20.0,43.0,-54.0,5.0,33.0,52.0,70.0,50.0,-28.0,50.0,11.0,-52.0,47.0,41.0,-34.0,-20.0,-56.0,45.0,18.0,20.0,-74.0,-13.0,15.0,94.0,-72.0,12.0,-97.0,78.0,34.0,-1.0,68.0,70.0,-54.0,-33.0,-96.0,-90.0,53.0,15.0,52.0,30.0,50.0,50.0,86.0,-13.0,-41.0,-53.0,-35.0,81.0,63.0,48.0,63.0,-73.0,46.0,17.0,-68.0,42.0,23.0,84.0,-85.0,-38.0,-23.0,50.0,-29.0,85.0,79.0,-91.0,-99.0,-70.0,23.0,89.0,-18.0,77.0,-31.0,-43.0,41.0,77.0,-29.0,90.0,50.0,-15.0,59.0,95.0,-76.0,2.0,73.0,-69.0,-51.0,100.0,4.0,-33.0,17.0,10.0,-18.0,42.0,-35.0,-54.0,89.0,34.0,-30.0,-62.0,48.0,92.0,-74.0,17.0,-86.0,-8.0,-70.0,90.0,39.0,-61.0,-63.0,-1.0,-7.0,64.0,45.0,-65.0,-62.0,31.0,-59.0,33.0,-95.0,83.0,-16.0,60.0,52.0,81.0,-69.0,-46.0,-12.0,61.0,98.0,-26.0,12.0,-78.0,70.0,-30.0,-83.0,16.0,-14.0,-99.0,-62.0,33.0,66.0,67.0,7.0,-65.0,47.0,58.0,-69.0,-89.0,-15.0,58.0,16.0,-67.0,-84.0,34.0,39.0,38.0,-40.0,17.0,-46.0,16.0,-32.0,4.0,78.0,80.0,68.0,-35.0,22.0,52.0,48.0,66.0,32.0,81.0,-78.0,-51.0,67.0,-37.0,-49.0,-37.0,-65.0,-21.0,99.0,63.0,53.0,-38.0,4.0,-93.0,4.0,11.0,52.0,89.0,-53.0,67.0,-87.0,-29.0,-98.0,-9.0,-7.0,47.0,-65.0,-86.0,-47.0,91.0,80.0,-99.0,97.0,-70.0,-58.0,70.0,74.0,60.0,-82.0,7.0,-64.0,-51.0,-22.0,-4.0,88.0,-96.0,-90.0,-75.0,-73.0,-62.0,-52.0,29.0,-10.0,-76.0,28.0,76.0,31.0,48.0,-26.0,-90.0,-35.0,-62.0,6.0,-61.0,41.0,-34.0,-39.0,-40.0,-95.0,28.0,-78.0,-40.0,73.0,62.0,93.0,-53.0,82.0,59.0,-99.0,-91.0,20.0,-35.0,49.0,-49.0,-69.0,17.0,-80.0,62.0,50.0,-30.0,-97.0,83.0,2.0,-90.0,35.0,19.0,-69.0,-97.0,40.0,50.0,13.0,-11.0,-32.0,97.0,-10.0,87.0,-73.0,-64.0,-41.0,97.0,-81.0,-75.0,-26.0,-5.0,-73.0,-2.0,57.0,-81.0,-12.0,-35.0,7.0,-53.0,55.0,10.0,90.0,5.0,-78.0,-98.0,54.0,65.0,38.0,48.0,17.0,-78.0,41.0,82.0,14.0,25.0,-19.0,64.0,47.0,92.0,73.0,-15.0,-99.0,12.0,-60.0,62.0,-64.0,-4.0,-57.0,-47.0,-2.0,39.0,86.0,34.0,32.0,77.0,19.0,-79.0,-53.0,39.0,85.0,91.0,-59.0,-94.0,15.0,7.0,-37.0,89.0,66.0,-48.0,-17.0,47.0,87.0,-66.0,-47.0,-61.0,-98.0,40.0,65.0,-89.0,-19.0,27.0,85.0,98.0,36.0,84.0,-75.0,36.0,21.0,-35.0,-17.0,40.0,91.0,16.0,-71.0,76.0,27.0,8.0,13.0,37.0,-7.0,99.0,-71.0,-69.0,-11.0,26.0,-82.0,-37.0,86.0,94.0,77.0,-16.0,-92.0,35.0,-27.0,41.0,44.0,40.0,54.0,83.0,-28.0,30.0,57.0,-7.0,64.0,8.0,43.0,-82.0,43.0,-17.0,-30.0,25.0,61.0,-94.0,-85.0,-5.0,-16.0,1.0,-35.0,-17.0,-67.0,1.0,-37.0,73.0,21.0,-84.0,24.0,45.0,-27.0,-91.0,91.0,-44.0,11.0,80.0,32.0,17.0,74.0,-66.0,-42.0,55.0,56.0,92.0,41.0,61.0,-41.0,-70.0,24.0,-19.0,72.0,31.0,95.0,15.0,16.0,43.0,-81.0,-17.0,88.0,-76.0,25.0,89.0,92.0,35.0,-24.0,51.0,38.0,26.0,27.0,-18.0,-27.0,14.0,31.0,-30.0,-24.0,-44.0,2.0,-19.0,-81.0,99.0,9.0,83.0,78.0,20.0,-18.0,30.0,-63.0,87.0,17.0,-97.0,83.0,45.0,-76.0,83.0,56.0,74.0,13.0,-27.0,87.0,50.0,-66.0,-47.0,48.0,-19.0,-10.0,-86.0,-36.0,42.0,64.0,-72.0,48.0,-53.0,68.0,4.0,-61.0,68.0,80.0,45.0,-33.0,39.0,-16.0,90.0,60.0,87.0,4.0,51.0,36.0,44.0,-23.0,-81.0,-96.0,26.0,-68.0,95.0,80.0,69.0,43.0,-13.0,-35.0,10.0,95.0,-79.0,-25.0,-99.0,39.0,-56.0,-58.0,-65.0,53.0,-34.0,-13.0,85.0,7.0,51.0,0.0,74.0,28.0,-97.0,-13.0,-36.0,-60.0,54.0,-7.0,25.0,65.0,-88.0,-76.0,-67.0,31.0,-15.0,89.0,-67.0,-97.0,47.0,19.0,86.0,-83.0,-26.0,98.0,-85.0,-79.0,-6.0,40.0,-35.0,-15.0,-6.0,77.0,84.0,-77.0,-37.0,70.0,68.0,-45.0,-75.0,-4.0,-80.0,-77.0,-82.0,-52.0,-32.0,-55.0,45.0,71.0,84.0,-14.0,-65.0,70.0,-58.0,-63.0,34.0,-49.0,-51.0,-27.0,37.0,47.0,-1.0,3.0,-91.0,49.0,-44.0,-59.0,7.0,-50.0,95.0,-52.0,72.0,76.0,97.0,33.0,80.0,-35.0,-93.0,19.0,28.0,-56.0,-45.0,2.0,-5.0,19.0,-26.0,17.0,-5.0,-1.0,59.0,-10.0,30.0,-39.0,11.0,-1.0,-49.0,27.0,-30.0,-89.0,-71.0,-43.0,-88.0,71.0,46.0,87.0,48.0,59.0,-88.0,-62.0,35.0,-69.0,-13.0,25.0,-7.0,-18.0,7.0,60.0,34.0,82.0,25.0,9.0,-79.0,34.0,-43.0,-13.0,-44.0,39.0,25.0,-86.0,8.0,31.0,-78.0,-2.0,-74.0,-86.0,46.0,76.0,98.0,-83.0,-37.0,91.0,81.0,24.0,86.0,60.0,80.0,-9.0,-39.0,-80.0,80.0,58.0,-22.0,74.0,-49.0,51.0,15.0,99.0,13.0,90.0,99.0,-10.0,-52.0,-54.0,-93.0,-70.0,94.0,83.0,-18.0,-12.0,17.0,71.0,96.0,65.0,84.0,90.0,13.0,35.0,-4.0,5.0,49.0,-4.0,10.0,87.0,93.0,-60.0,31.0,44.0,22.0,-82.0,-82.0,33.0,-83.0,-42.0,57.0,-98.0,39.0,3.0,64.0,-66.0,-96.0,78.0,-18.0,-15.0,81.0,-24.0,21.0,-63.0,-72.0,-38.0,21.0,26.0,44.0,-18.0,17.0,-73.0,85.0,-29.0,-10.0,76.0,92.0,30.0,50.0,33.0,-69.0,-7.0,-68.0,-77.0,11.0,-89.0,18.0,-64.0,-49.0,-96.0,65.0,54.0,62.0,34.0,95.0,-86.0,5.0,-77.0,29.0,80.0,57.0,70.0,-21.0,50.0,56.0,-86.0,-73.0,48.0,56.0,52.0,-69.0,-5.0,79.0,23.0,-20.0,-8.0,57.0,-34.0,-96.0,-53.0,-33.0,37.0,-53.0,28.0,56.0,-94.0,-40.0,-87.0,-19.0,-15.0,28.0,84.0,7.0,55.0,-8.0,57.0,-87.0,-79.0,21.0,-83.0,63.0,-29.0,-96.0,48.0,-26.0,-98.0,-42.0,-7.0,24.0,-10.0,-41.0,-34.0,19.0,-7.0,65.0,-90.0,-41.0,-69.0,0.0,-47.0,-46.0,43.0,-29.0,64.0,29.0,-38.0,50.0,-40.0,-52.0,17.0,79.0,-33.0,-49.0,20.0,-35.0,72.0,75.0,43.0,-77.0,12.0,-38.0,-32.0,-2.0,-26.0,-30.0,-60.0,71.0,-93.0,100.0,26.0,-85.0,16.0,85.0,8.0,71.0,-86.0,-3.0,29.0,-45.0,-2.0,-4.0,52.0,19.0,-34.0,92.0,73.0,-24.0,-1.0,-90.0,43.0,66.0,38.0,58.0,42.0,8.0,63.0,-29.0,-5.0,58.0,99.0,-1.0,-71.0,-78.0,24.0,37.0,-32.0,23.0,-43.0,96.0,69.0,71.0,72.0,-60.0,-8.0,-68.0,-45.0,23.0,64.0,-83.0,36.0,2.0,-30.0,78.0,-69.0,24.0,-19.0,-60.0,6.0,13.0,-42.0,89.0,68.0,23.0,7.0,-38.0,-66.0,-39.0,-77.0,29.0,-60.0,-63.0,-53.0,-86.0,-27.0,12.0,72.0,-44.0,94.0,56.0,-99.0,-11.0,46.0,-96.0,-62.0,57.0,67.0,-38.0,-3.0,83.0,-55.0,35.0,-19.0,3.0,5.0,-86.0,73.0,-99.0,-89.0,-73.0,70.0,91.0,-33.0,-2.0,-35.0,-18.0,33.0,62.0,-56.0,-35.0,24.0,84.0,99.0,-29.0,-18.0,86.0,-88.0,46.0,-41.0,20.0,-50.0,-46.0,-59.0,-77.0,-25.0,68.0,-48.0,76.0,52.0,52.0,-48.0,4.0,-39.0,30.0,-56.0,92.0,-88.0,-84.0,-38.0,-39.0,63.0,-83.0,35.0,43.0,-37.0,61.0,-86.0,73.0,-53.0,80.0,-47.0,-94.0,79.0,-70.0,-15.0,-40.0,-6.0,87.0,-67.0,-75.0,-4.0,-4.0,51.0,79.0,81.0,85.0,-60.0,-86.0,33.0,70.0,-1.0,-48.0,-42.0,15.0,-90.0,64.0,97.0,26.0,-20.0,87.0,-53.0,97.0,16.0,27.0,39.0,74.0,27.0,87.0,0.0,21.0,41.0,-16.0,-73.0,45.0,60.0,-79.0,2.0,-95.0,1.0,-34.0,-39.0,-98.0,43.0,73.0,93.0,-28.0,27.0,-77.0,2.0,-92.0,62.0,38.0,5.0,95.0,85.0,-36.0,-39.0,53.0,-91.0,27.0,92.0,-16.0,-75.0,31.0,10.0,-87.0,72.0,27.0,63.0,35.0,41.0,92.0,-53.0,-52.0,-48.0,62.0,-20.0,-57.0,53.0,-99.0,-23.0,84.0,-86.0,0.0,40.0,48.0,-3.0,-55.0,51.0,-93.0,82.0,45.0,-53.0,-28.0,-99.0,70.0,97.0,72.0,-14.0,36.0,61.0,-59.0,55.0,-92.0,24.0,14.0,-75.0,97.0,-71.0,92.0,-59.0,42.0,62.0,26.0,54.0,63.0,-46.0,-40.0,-84.0,-6.0,-69.0,-93.0,67.0,24.0,-62.0,63.0,-37.0,-12.0,-7.0,28.0,-43.0,12.0,99.0,79.0,-30.0,-86.0,46.0,-46.0,-28.0,-36.0,78.0,-30.0,1.0,16.0,-67.0,48.0,44.0,61.0,22.0,-86.0,93.0,-82.0,-35.0,-6.0,58.0,-24.0,-23.0,-53.0,-35.0,-23.0,71.0,22.0,76.0,-8.0,-28.0,31.0,-70.0,19.0,-7.0,-99.0,81.0,-92.0,-23.0,8.0,-46.0,23.0,38.0,-73.0,-25.0,32.0,27.0,-65.0,97.0,-84.0,-30.0,20.0,6.0,-69.0,45.0,89.0,-61.0,-5.0,47.0,-52.0,-76.0,-32.0,-60.0,-80.0,34.0,-72.0,-83.0,-63.0,-2.0,70.0,-63.0,87.0,-6.0,13.0,27.0,-53.0,48.0,39.0,33.0,-91.0,-95.0,13.0,-71.0,-39.0,-10.0,-12.0,-51.0,-85.0,59.0,64.0,39.0,58.0,-33.0,-63.0,49.0,-62.0,-71.0,-79.0,99.0,58.0,-32.0,83.0,-86.0,71.0,62.0,-84.0,64.0,-17.0,-45.0,27.0,80.0,40.0,17.0,-86.0,52.0,-41.0,-20.0,-15.0,55.0,-75.0,41.0,-21.0,-59.0,96.0,98.0,20.0,96.0,63.0,-19.0,-8.0,40.0,-36.0,-26.0,-55.0,14.0,-28.0,52.0,-74.0,98.0,-63.0,-28.0,-65.0,-50.0,-96.0,-9.0,46.0,14.0,-7.0,64.0,10.0,75.0,-96.0,-37.0,-26.0,-72.0,97.0,-60.0,81.0,85.0,80.0,-4.0,95.0,-79.0,3.0,58.0,67.0,13.0,11.0,35.0,-25.0,-42.0,-88.0,-95.0,-36.0,-79.0,-34.0,19.0,76.0,-54.0,72.0,-29.0,53.0,19.0,98.0,-60.0,40.0,65.0,89.0,-55.0,27.0,-27.0,-12.0,-66.0,-78.0,-41.0,12.0,49.0,-1.0,62.0,-41.0,-80.0,-18.0,-87.0,-47.0,-82.0,-18.0,-14.0,31.0,44.0,44.0,-97.0,76.0,-87.0,-59.0,-73.0,-49.0,6.0,32.0,94.0,-87.0,-31.0,38.0,-54.0,-68.0,23.0,19.0,-48.0,44.0,55.0,-83.0,-26.0,-81.0,-4.0,-97.0,-38.0,9.0,-99.0,65.0,-39.0,39.0,-14.0,-81.0,28.0,-37.0,56.0,-93.0,35.0,32.0,50.0,34.0,-84.0,-79.0,-42.0,-100.0,19.0,11.0,-91.0,-32.0,-5.0,-76.0,-48.0,-75.0,-7.0,-56.0,-91.0,59.0,-75.0,-45.0,-61.0,21.0,-75.0,-55.0,-75.0,58.0,12.0,-17.0,-21.0,-19.0,96.0,37.0,-38.0,-89.0,-22.0,27.0,-24.0,-49.0,-35.0,-78.0,-57.0,19.0,-13.0,1.0,66.0,78.0,43.0,-56.0,65.0,-86.0,-77.0,96.0,73.0,31.0,-74.0,-39.0,37.0,-17.0,85.0,36.0,90.0,-28.0,-11.0,-91.0,93.0,-36.0,-30.0,57.0,-86.0,29.0,-76.0,27.0,55.0,89.0,47.0,-84.0,-98.0,18.0,4.0,39.0,67.0,-18.0,57.0,-27.0,14.0,-60.0,-87.0,86.0,-31.0,14.0,-38.0,-94.0,54.0,41.0,14.0,42.0,-26.0,68.0,-82.0,-75.0,45.0,-53.0,27.0,-93.0,42.0,-67.0,89.0,-84.0,-70.0,76.0,62.0,35.0,-18.0,36.0,6.0,-90.0,58.0,53.0,-28.0,63.0,-63.0,-29.0,72.0,-6.0,25.0,57.0,90.0,-85.0,38.0,58.0,88.0,-43.0,35.0,-96.0,-12.0,-66.0,60.0,-83.0,46.0,66.0,81.0,-29.0,-39.0,5.0,-35.0,-82.0,64.0,-87.0,84.0,19.0,-9.0,-86.0,26.0,-43.0,-28.0,51.0,92.0,87.0,27.0,60.0,-16.0,42.0,58.0,-58.0,-60.0,45.0,-99.0,-92.0,-70.0,-78.0,-67.0,41.0,6.0,-19.0,-90.0,-12.0,71.0,74.0,60.0,-21.0,95.0,70.0,55.0,40.0,-78.0,65.0,92.0,40.0,-75.0,58.0,-100.0,-12.0,66.0,-8.0,24.0,64.0,59.0,79.0,81.0,96.0,33.0,54.0,39.0,16.0,-53.0,-59.0,-82.0,-77.0,-22.0,-55.0,56.0,-59.0,22.0,-94.0,61.0,92.0,-32.0,25.0,-14.0,93.0,-83.0,-81.0,60.0,13.0,-64.0,58.0,-66.0,46.0,-75.0,-66.0,49.0,5.0,53.0,-95.0,71.0,4.0,-17.0,57.0,-26.0,16.0,80.0,45.0,33.0,43.0,70.0,62.0,0.0,-39.0,-57.0,-18.0,14.0,34.0,62.0,-74.0,-70.0,-28.0,-21.0,-81.0,-2.0,-53.0,-31.0,67.0,69.0,70.0,-15.0,63.0,-21.0,89.0,-35.0,55.0,55.0,-97.0,-79.0,-10.0,5.0,96.0,-98.0,-85.0,81.0,78.0,95.0,81.0,99.0,-31.0,-16.0,56.0,-98.0,24.0,46.0,-54.0,33.0,59.0,-71.0,-65.0,0.0,5.0,-37.0,61.0,-25.0,-5.0,-33.0,35.0,-59.0,-76.0,-4.0,-28.0,11.0,10.0,34.0,98.0,15.0,-50.0,-28.0,91.0,-23.0,-49.0,-34.0,67.0,29.0,91.0,-4.0,76.0,91.0,84.0,-32.0,-89.0,97.0,-94.0,-88.0,-66.0,-49.0,79.0,-6.0,46.0,-27.0,21.0,-99.0,-13.0,47.0,-67.0,-39.0,-61.0,-82.0,30.0,-73.0,-50.0,-13.0,-76.0,52.0,-31.0,-86.0,-63.0,-27.0,-4.0,-100.0,-61.0,41.0,94.0,62.0,-86.0,74.0,15.0,42.0,46.0,-19.0,19.0,-36.0,-2.0,-44.0,-39.0,33.0,-8.0,-21.0,-10.0,-22.0,55.0,-93.0,-43.0,30.0,44.0,-22.0,92.0,26.0,41.0,42.0,-59.0,-20.0,64.0,78.0,96.0,-88.0,-10.0,-35.0,-16.0,-59.0,67.0,-5.0,-82.0,-18.0,-97.0,-50.0,-59.0,-63.0,64.0,26.0,-41.0,61.0,-75.0,-10.0,-7.0,-100.0,29.0,14.0,43.0,-73.0,39.0,-20.0,-50.0,64.0,45.0,-90.0,-71.0,61.0,28.0,-93.0,76.0,-31.0,-95.0,7.0,19.0,25.0,-5.0,90.0,-69.0,-20.0,-12.0,-47.0,99.0,70.0,7.0,-36.0,-76.0,73.0,-18.0,-5.0,-5.0,70.0,56.0,34.0,21.0,-27.0,86.0,97.0,30.0,70.0,98.0,-5.0,-83.0,69.0,-48.0,-1.0,82.0,28.0,9.0,-31.0,-42.0,-2.0,27.0,-38.0,81.0,36.0,51.0,97.0,-31.0,71.0,68.0,90.0,-80.0,91.0,-22.0,15.0,7.0,-34.0,-70.0,44.0,-69.0,6.0,84.0,-75.0,-2.0,-87.0,28.0,-14.0,-94.0,-13.0,17.0,-2.0,9.0,36.0,63.0,-90.0,-3.0,18.0,-92.0,63.0,76.0,-17.0,20.0,-15.0,16.0,12.0,98.0,-3.0,-76.0,-48.0,-77.0,-35.0,-45.0,-46.0,-78.0,70.0,-67.0,-46.0,64.0,20.0,11.0,90.0,80.0,80.0,33.0,76.0,-96.0,29.0,-74.0,18.0,-13.0,14.0,-74.0,2.0,12.0,-84.0,-15.0,-90.0,55.0,-38.0,-17.0,84.0,40.0,-94.0,80.0,-6.0,-78.0,-56.0,44.0,40.0,23.0,5.0,-13.0,-98.0,38.0,41.0,-35.0,60.0,52.0,-41.0,-77.0,31.0,95.0,36.0,7.0,-52.0,-48.0,56.0,-32.0,67.0,1.0,-76.0,-41.0,26.0,-52.0,60.0,2.0,61.0,11.0,-5.0,13.0,-9.0,66.0,51.0,88.0,-53.0,34.0,-58.0,-5.0,-28.0,98.0,-94.0,-62.0,92.0,-17.0,-66.0,-72.0,-96.0,-62.0,85.0,-78.0,89.0,-94.0,-41.0,53.0,62.0,27.0,-63.0,-69.0,-17.0,-27.0,-43.0,-87.0,60.0,-61.0,-77.0,7.0,42.0,29.0,-6.0,76.0,50.0,-78.0,-19.0,4.0,-69.0,89.0,-75.0,-39.0,-79.0,-85.0,64.0,-88.0,-31.0,-89.0,28.0,8.0,33.0,98.0,-25.0,-47.0,5.0,-39.0,73.0,-60.0,88.0,-6.0,-38.0,-70.0,-100.0,93.0,-2.0,-93.0,83.0,41.0,-13.0,41.0,71.0,-21.0,76.0,-74.0,62.0,23.0,19.0,26.0,43.0,-96.0,-2.0,44.0,-73.0,-97.0,-38.0,-73.0,-38.0,-36.0,24.0,-26.0,-77.0,-2.0,95.0,88.0,-74.0,-39.0,-60.0,97.0,60.0,11.0,17.0,79.0,85.0,69.0,98.0,-30.0,-52.0,48.0,-6.0,-100.0,-82.0,50.0,-77.0,94.0,-77.0,69.0,73.0,-60.0,-49.0,28.0,-75.0,47.0,-85.0,58.0,-96.0,-31.0,25.0,36.0,-21.0,-68.0,-89.0,-84.0,-90.0,-45.0,-40.0,99.0,0.0,-9.0,64.0,-80.0,3.0,22.0,-58.0,-51.0,-60.0,75.0,-19.0,-60.0,-73.0,98.0,-11.0,85.0,-57.0,30.0,75.0,-90.0,-95.0,-55.0,-27.0,71.0,41.0,-49.0,61.0,26.0,-50.0,46.0,-25.0,-60.0,-66.0,-52.0,-2.0,97.0,8.0,-39.0,38.0,-12.0,58.0,-58.0,36.0,59.0,-42.0,-62.0,96.0,29.0,90.0,-66.0,-29.0,20.0,36.0,77.0,21.0,-85.0,33.0,51.0,-41.0,7.0,32.0,2.0,30.0,-12.0,-13.0,-60.0,-31.0,92.0,-35.0,-78.0,-6.0,73.0,-50.0,-44.0,-17.0,-72.0,14.0,-9.0,76.0,85.0,-75.0,65.0,-91.0,-26.0,-66.0,84.0,-23.0,-70.0,68.0,95.0,79.0,-9.0,56.0,35.0,-37.0,-54.0,-26.0,99.0,59.0,59.0,-38.0,78.0,-76.0,-21.0,-38.0,19.0,11.0,46.0,-86.0,10.0,-64.0,-76.0,92.0,77.0,21.0,91.0,-55.0,88.0,-61.0,70.0,-70.0,-3.0,-79.0,-85.0,51.0,-86.0,18.0,52.0,-22.0,10.0,-8.0,70.0,-88.0,-64.0,-91.0,30.0,91.0,-45.0,-25.0,85.0,43.0,39.0,-86.0,-1.0,45.0,31.0,75.0,-41.0,-61.0,-13.0,-82.0,95.0,9.0,15.0,30.0,47.0,-82.0,-32.0,75.0,-29.0,46.0,1.0,41.0,-16.0,-97.0,24.0,-12.0,-13.0,-82.0,96.0,-61.0,-44.0,-41.0,46.0,38.0,6.0,-73.0,74.0,36.0,97.0,72.0,36.0,-43.0,-32.0,-51.0,65.0,-63.0,84.0,90.0,30.0,-26.0,84.0,-33.0,-57.0,-76.0,87.0,28.0,8.0,82.0,-27.0,-15.0,-67.0,-48.0,-46.0,-17.0,-91.0,49.0,-29.0,8.0,-36.0,38.0,74.0,37.0,-7.0,-29.0,-51.0,15.0,17.0,-36.0,2.0,35.0,61.0,-79.0,-86.0,-98.0,-44.0,-94.0,-76.0,3.0,-95.0,-45.0,-28.0,92.0,77.0,-76.0,98.0,-94.0,-33.0,81.0,56.0,-97.0,12.0,-32.0,-29.0,64.0,78.0,-98.0,-72.0,16.0,-14.0,-43.0,-88.0,31.0,-70.0,31.0,4.0,-85.0,87.0,-64.0,-83.0,16.0,-74.0,-28.0,-2.0,68.0,85.0,35.0,60.0,-73.0,15.0,-71.0,35.0,72.0,87.0,-5.0,-26.0,55.0,37.0,81.0,61.0,82.0,-43.0,-8.0,-86.0,-32.0,47.0,-96.0,-18.0,78.0,37.0,55.0,92.0,69.0,-50.0,80.0,11.0,-65.0,11.0,-94.0,91.0,44.0,96.0,97.0,66.0,36.0,-81.0,33.0,-64.0,71.0,50.0,-23.0,-25.0,-68.0,-36.0,-14.0,32.0,43.0,87.0,57.0,-64.0,-89.0,-38.0,28.0,62.0,-83.0,-32.0,41.0,-3.0,-57.0,-98.0,-27.0,98.0,-42.0,-56.0,65.0,-18.0,-51.0,5.0,-52.0,75.0,90.0,47.0,-3.0,-31.0,89.0,20.0,-36.0,-5.0,47.0,-19.0,-35.0,73.0,73.0,53.0,6.0,-41.0,-78.0,33.0,21.0,48.0,0.0,54.0,-43.0,65.0,87.0,40.0,-15.0,24.0,-17.0,73.0,87.0,-87.0,-73.0,-59.0,32.0,75.0,44.0,-26.0,50.0,84.0,-77.0,42.0,-100.0,-97.0,34.0,-99.0,-77.0,-57.0,-9.0,14.0,-36.0,69.0,-50.0,-16.0,-89.0,66.0,44.0,-47.0,-48.0,-57.0,-48.0,33.0,56.0,-7.0,93.0,-57.0,33.0,83.0,71.0,10.0,-66.0,-74.0,95.0,-3.0,30.0,-10.0,-31.0,37.0,-43.0,-57.0,21.0,-52.0,-67.0,-25.0,99.0,-66.0,-62.0,30.0,0.0,45.0,19.0,71.0,11.0,-99.0,36.0,63.0,-34.0,36.0,2.0,-3.0,-13.0,-23.0,-61.0,47.0,-67.0,-47.0,-34.0,-75.0,92.0,34.0,80.0,-10.0,29.0,98.0,42.0,-69.0,6.0,-30.0,-86.0,-8.0,4.0,95.0,57.0,29.0,83.0,16.0,-23.0,41.0,-51.0,-74.0,24.0,-89.0,97.0,-10.0,-41.0,-40.0,71.0,29.0,29.0,-52.0,78.0,68.0,39.0,-44.0,5.0,-38.0,66.0,23.0,-23.0,-25.0,-92.0,-19.0,-71.0,-80.0,-42.0,-59.0,-71.0,-5.0,-93.0,9.0,68.0,1.0,-77.0,-70.0,-97.0,-86.0,35.0,85.0,-3.0,-54.0,-34.0,-10.0,65.0,-46.0,73.0,-15.0,-70.0,94.0,-67.0,2.0,44.0,-68.0,-16.0,88.0,46.0,-79.0,6.0,-97.0,28.0,85.0,-100.0,-89.0,-69.0,77.0,-52.0,90.0,33.0,74.0,-92.0,-76.0,12.0,-63.0,-30.0,42.0,1.0,-85.0,71.0,47.0,-47.0,13.0,-7.0,-96.0,64.0,53.0,-14.0,-16.0,-7.0,-92.0,48.0,18.0,-44.0,67.0,79.0,-7.0,-89.0,-46.0,50.0,35.0,10.0,-81.0,71.0,44.0,-3.0,-68.0,0.0,37.0,-36.0,36.0,88.0,-12.0,85.0,-36.0,-78.0,-12.0,100.0,88.0,-88.0,67.0,4.0,-54.0,47.0,4.0,-93.0,72.0,58.0,-27.0,-1.0,25.0,51.0,87.0,14.0,79.0,-15.0,36.0,-76.0,12.0,14.0,-86.0,67.0,40.0,-3.0,-43.0,-54.0,-18.0,-79.0,-14.0,-81.0,7.0,24.0,6.0,-83.0,60.0,45.0,-91.0,22.0,-16.0,36.0,46.0,-58.0,62.0,71.0,-40.0,85.0,-48.0,24.0,65.0,12.0,-22.0,-53.0,99.0,0.0,51.0,63.0,-85.0,98.0,86.0,-39.0,-61.0,8.0,7.0,-31.0,-84.0,0.0,44.0,-8.0,-17.0,85.0,-12.0,53.0,2.0,-62.0,87.0,-46.0,51.0,-28.0,-54.0,-99.0,-9.0,-20.0,-61.0,-22.0,32.0,-65.0,86.0,-46.0,47.0,-40.0,-42.0,99.0,68.0,99.0,-87.0,-92.0,2.0,-97.0,-35.0,-36.0,-38.0,20.0,-30.0,-91.0,94.0,98.0,42.0,-93.0,-57.0,85.0,-25.0,-65.0,69.0,6.0,-14.0,36.0,73.0,20.0,-3.0,-76.0,-72.0,60.0,27.0,-74.0,-5.0,17.0,31.0,87.0,32.0,-88.0,-2.0,-78.0,-26.0,-79.0,-31.0,8.0,-2.0,56.0,-13.0,-91.0,89.0,32.0,10.0,81.0,30.0,-73.0,23.0,-25.0,78.0,15.0,10.0,-89.0,-60.0,27.0,-42.0,-52.0,-90.0,36.0,51.0,-40.0,32.0,49.0,62.0,43.0,-12.0,-68.0,44.0,-97.0,69.0,-32.0,20.0,-89.0,70.0,-72.0,22.0,19.0,74.0,-41.0,13.0,75.0,67.0,36.0,-91.0,0.0,29.0,81.0,-94.0,18.0,-73.0,26.0,16.0,-98.0,-53.0,75.0,-21.0,68.0,-6.0,56.0,67.0,-38.0,-79.0,-29.0,14.0,-55.0,-6.0,11.0,-85.0,66.0,-36.0,-44.0,82.0,-29.0,72.0,-85.0,72.0,-90.0,-35.0,66.0,62.0,55.0,-47.0,47.0,28.0,-91.0,62.0,4.0,49.0,-19.0,-61.0,-1.0,71.0,48.0,-80.0,-3.0,49.0,-47.0,-53.0,-11.0,-1.0,-80.0,-36.0,-55.0,32.0,-97.0,-21.0,-11.0,-9.0,-48.0,73.0,48.0,-68.0,90.0,15.0,31.0,-28.0,3.0,-66.0,-31.0,13.0,18.0,58.0,-53.0,-37.0,-43.0,-54.0,-91.0,8.0,-27.0,49.0,-54.0,94.0,-22.0,97.0,-28.0,-24.0,-3.0,84.0,-88.0,-70.0,-31.0,29.0,99.0,-32.0,-51.0,-24.0,-64.0,-18.0,-29.0,92.0,-31.0,-19.0,78.0,6.0,-29.0,-53.0,27.0,59.0,-86.0,-1.0,-52.0,58.0,-56.0,74.0,44.0,-11.0,61.0,-62.0,28.0,19.0,-20.0,14.0,76.0,-45.0,-2.0,18.0,7.0,21.0,-16.0,-85.0,-100.0,77.0,-41.0,-27.0,10.0,66.0,-19.0,1.0,75.0,-50.0,-77.0,-68.0,-74.0,82.0,61.0,56.0,68.0,-85.0,29.0,57.0,-40.0,30.0,43.0,89.0,97.0,98.0,-50.0,-34.0,-54.0,-99.0,-29.0,45.0,35.0,-69.0,-85.0,-29.0,8.0,74.0,67.0,32.0,-71.0,-14.0,90.0,-9.0,32.0,44.0,-52.0,-46.0,-16.0,-67.0,-45.0,-90.0,-71.0,-64.0,-53.0,11.0,66.0,50.0,82.0,92.0,18.0,-25.0,-60.0,88.0,4.0,30.0,97.0,-73.0,56.0,-88.0,-59.0,7.0,-78.0,47.0,90.0,84.0,-30.0,58.0,-75.0,-1.0,7.0,-97.0,15.0,5.0,21.0,55.0,-81.0,-8.0,6.0,48.0,90.0,-35.0,22.0,91.0,-89.0,-38.0,4.0,45.0,-3.0,-19.0,-33.0,-36.0,51.0,-31.0,-2.0,53.0,-68.0,-1.0,99.0,-47.0,23.0,38.0,46.0,-57.0,25.0,-57.0,-38.0,38.0,11.0,-58.0,-13.0,50.0,69.0,20.0,-2.0,-41.0,67.0,16.0,55.0,-80.0,34.0,-18.0,53.0,-44.0,-45.0,-19.0,-89.0,89.0,-72.0,-10.0,-21.0,-6.0,27.0,-3.0,30.0,79.0,18.0,11.0,21.0,-88.0,-31.0,52.0,-31.0,-13.0,-97.0,17.0,37.0,23.0,-73.0,77.0,-7.0,28.0,-26.0,-9.0,17.0,21.0,-70.0,-32.0,90.0,-88.0,-14.0,-7.0,-46.0,-70.0,85.0,17.0,88.0,60.0,57.0,-95.0,-90.0,25.0,15.0,59.0,-75.0,-69.0,86.0,97.0,16.0,-87.0,-40.0,-48.0,79.0,-94.0,9.0,-18.0,61.0,99.0,-72.0,54.0,90.0,30.0,-63.0,-8.0,1.0,-14.0,-84.0,99.0,-49.0,-51.0,62.0,-80.0,24.0,2.0,-68.0,-13.0,69.0,-9.0,-62.0,65.0,-59.0,-98.0,-95.0,21.0,36.0,71.0,-80.0,-70.0,86.0,61.0,5.0,1.0,21.0,-55.0,-14.0,72.0,-6.0,8.0,-77.0,68.0,-26.0,44.0,89.0,-49.0,-36.0,-83.0,-10.0,21.0,-85.0,-52.0,-41.0,-39.0,-48.0,-70.0,69.0,6.0,-40.0,82.0,91.0,-87.0,-89.0,34.0,-32.0,28.0,-2.0,-75.0,2.0,-47.0,-43.0,-80.0,-65.0,96.0,53.0,13.0,74.0,-97.0,-60.0,9.0,-81.0,-3.0,72.0,84.0,-42.0,-68.0,-22.0,8.0,-39.0,5.0,37.0,-78.0,74.0,-61.0,96.0,-70.0,23.0,12.0,16.0,83.0,5.0,70.0,41.0,59.0,62.0,76.0,83.0,-45.0,43.0,54.0,73.0,-13.0,99.0,-85.0,38.0,49.0,50.0,-89.0,66.0,-59.0,-56.0,68.0,-68.0,59.0,-62.0,29.0,2.0,-61.0,-88.0,46.0,-35.0,57.0,31.0,29.0,63.0,-69.0,-9.0,-7.0,-88.0,-56.0,-22.0,81.0,-13.0,-47.0,-59.0,-65.0,58.0,-14.0,-13.0,84.0,99.0,-22.0,-12.0,36.0,-40.0,-80.0,-83.0,-22.0,-59.0,14.0,-85.0,-82.0,-4.0,92.0,59.0,-63.0,2.0,38.0,90.0,81.0,62.0,14.0,-92.0,97.0,-47.0,33.0,74.0,-3.0,-71.0,-76.0,-76.0,18.0,-48.0,-83.0,-99.0,-78.0,-46.0,82.0,-97.0,61.0,72.0,93.0,-38.0,43.0,79.0,97.0,24.0,-79.0,53.0,-67.0,93.0,52.0,-78.0,-43.0,32.0,-65.0,-94.0,79.0,3.0,76.0,-93.0,-70.0,55.0,76.0,95.0,-29.0,-56.0,34.0,-16.0,-15.0,-81.0,-31.0,48.0,75.0,-28.0,90.0,-7.0,-55.0,98.0,-9.0,-73.0,-34.0,14.0,-66.0,-12.0,31.0,75.0,-45.0,25.0,-19.0,12.0,-46.0,80.0,75.0,2.0,-21.0,-58.0,-72.0,-72.0,0.0,-24.0,36.0,-84.0,32.0,6.0,-65.0,50.0,-91.0,-25.0,-41.0,-1.0,-37.0,-91.0,80.0,-24.0,-87.0,33.0,51.0,84.0,14.0,28.0,38.0,-100.0,-67.0,-85.0,-96.0,-77.0,-80.0,93.0,-29.0,44.0,82.0,45.0,-5.0,18.0,11.0,-86.0,20.0,-34.0,-78.0,-47.0,38.0,85.0,-69.0,4.0,-40.0,35.0,0.0,-11.0,33.0,62.0,-70.0,46.0,4.0,-48.0,35.0,91.0,0.0,-62.0,-3.0,11.0,89.0,100.0,46.0,-85.0,62.0,89.0,93.0,-94.0,23.0,27.0,56.0,-2.0,25.0,-50.0,51.0,16.0,-80.0,-27.0,69.0,45.0,52.0,75.0,-87.0,87.0,52.0,36.0,-48.0,-64.0,-23.0,92.0,59.0,58.0,2.0,-30.0,-79.0,97.0,50.0,-58.0,-35.0,-65.0,-4.0,-1.0,98.0,73.0,89.0,5.0,-27.0,18.0,-53.0,33.0,75.0,-24.0,-11.0,99.0,92.0,14.0,93.0,64.0,95.0,44.0,-97.0,70.0,38.0,-73.0,22.0,39.0,-58.0,-85.0,91.0,-25.0,33.0,-33.0,92.0,-30.0,-76.0,60.0,-31.0,55.0,-48.0,-46.0,84.0,-85.0,-19.0,22.0,2.0,73.0,0.0,-15.0,34.0,10.0,76.0,13.0,-4.0,-71.0,-71.0,81.0,-52.0,47.0,49.0,-97.0,47.0,-35.0,73.0,83.0,-72.0,-20.0,50.0,7.0,-53.0,-60.0,76.0,-26.0,64.0,-26.0,50.0,-6.0,-71.0,-5.0,24.0,3.0,-58.0,-88.0,-66.0,-98.0,36.0,-15.0,50.0,10.0,-69.0,39.0,85.0,21.0,-14.0,-31.0,16.0,-55.0,40.0,-26.0,76.0,-88.0,82.0,-69.0,-59.0,-93.0,-67.0,54.0,-86.0,-4.0,-22.0,-58.0,-3.0,-52.0,-15.0,25.0,-34.0,97.0,-26.0,-51.0,69.0,-19.0,-7.0,84.0,-81.0,83.0,78.0,20.0,23.0,98.0,26.0,98.0,92.0,38.0,78.0,1.0,37.0,-86.0,-9.0,59.0,94.0,-58.0,-85.0,-84.0,85.0,-77.0,57.0,-73.0,-100.0,-55.0,-43.0,-12.0,-39.0,-5.0,34.0,-69.0,-91.0,-48.0,29.0,45.0,40.0,-79.0,92.0,11.0,-92.0,21.0,48.0,-68.0,-54.0,-59.0,-43.0,-80.0,20.0,-81.0,81.0,9.0,68.0,-77.0,25.0,40.0,56.0,-93.0,-31.0,-17.0,39.0,-7.0,-76.0,-83.0,-61.0,9.0,40.0,-69.0,-65.0,21.0,-17.0,-55.0,-1.0,-36.0,45.0,-52.0,-58.0,-75.0,-54.0,93.0,-23.0,-77.0,28.0,20.0,24.0,-52.0,-48.0,-34.0,76.0,27.0,23.0,44.0,-14.0,91.0,-34.0,57.0,-9.0,99.0,-75.0,60.0,73.0,46.0,-30.0,-49.0,-81.0,-16.0,57.0,-32.0,-80.0,-10.0,16.0,77.0,-61.0,92.0,60.0,-93.0,-21.0,59.0,52.0,61.0,83.0,-95.0,81.0,49.0,43.0,36.0,-94.0,-82.0,-50.0,33.0,10.0,52.0,-46.0,-62.0,51.0,5.0,69.0,100.0,74.0,23.0,94.0,-65.0,-43.0,19.0,-23.0,15.0,-92.0,-89.0,-24.0,-41.0,65.0,12.0,-52.0,-43.0,86.0,-59.0,-6.0,-57.0,-12.0,84.0,-96.0,71.0,28.0,40.0,-100.0,54.0,93.0,-78.0,-83.0,-93.0,70.0,-65.0,-88.0,-86.0,-72.0,-6.0,-95.0,29.0,38.0,-20.0,-44.0,79.0,-15.0,-32.0,32.0,-81.0,58.0,44.0,9.0,-57.0,62.0,-50.0,-58.0,71.0,35.0,-36.0,94.0,-65.0,74.0,0.0,-56.0,93.0,78.0,-62.0,-38.0,92.0,59.0,-88.0,-52.0,33.0,64.0,-52.0,-96.0,3.0,53.0,-69.0,74.0,-48.0,-8.0,95.0,-58.0,-50.0,18.0,-30.0,-58.0,-51.0,46.0,93.0,-40.0,-3.0,93.0,-57.0,13.0,77.0,59.0,2.0,98.0,-13.0,-34.0,-79.0,67.0,40.0,35.0,3.0,48.0,60.0,4.0,37.0,35.0,-54.0,57.0,79.0,97.0,-48.0,-69.0,20.0,57.0,-21.0,-15.0,-33.0,58.0,-4.0,-88.0,-31.0,-93.0,20.0,39.0,-87.0,96.0,-60.0,-17.0,3.0,-76.0,22.0,53.0,48.0,-2.0,61.0,-75.0,31.0,-54.0,-86.0,-99.0,-94.0,-11.0,-48.0,-35.0,-87.0,-17.0,82.0,56.0,-5.0,-90.0,15.0,-53.0,81.0,-86.0,73.0,-89.0,87.0,94.0,-77.0,77.0,24.0,-44.0,-90.0,91.0,-28.0,-62.0,-15.0,-54.0,-77.0,-34.0,2.0,-97.0,44.0,-89.0,-70.0,71.0,-35.0,60.0,52.0,52.0,-73.0,-19.0,-78.0,-61.0,22.0,62.0,28.0,-34.0,-78.0,-76.0,-81.0,-88.0,-78.0,71.0,72.0,-45.0,20.0,-19.0,-87.0,88.0,34.0,-49.0,92.0,-54.0,-21.0,-22.0,-84.0,-4.0,-18.0,19.0,-97.0,-91.0,42.0,64.0,7.0,68.0,94.0,-52.0,70.0,-56.0,-41.0,-64.0,-31.0,-23.0,0.0,2.0,-31.0,4.0,-33.0,83.0,77.0,2.0,-47.0,-63.0,-100.0,-51.0,-92.0,93.0,-9.0,-11.0,-3.0,-81.0,8.0,25.0,-20.0,-29.0,-34.0,0.0,-81.0,30.0,-1.0,-57.0,-100.0,-85.0,-49.0,-19.0,-51.0,5.0,-50.0,77.0,-53.0,-18.0,-32.0,46.0,73.0,2.0,-34.0,-30.0,7.0,71.0,56.0,-18.0,98.0,-9.0,-49.0,0.0,42.0,-62.0,-8.0,-48.0,62.0,-6.0,94.0,41.0,86.0,-100.0,-82.0,-19.0,-71.0,3.0,-7.0,-34.0,-33.0,-12.0,20.0,31.0,-7.0,25.0,-19.0,95.0,-92.0,25.0,86.0,-64.0,83.0,5.0,-80.0,-23.0,-19.0,-62.0,9.0,-12.0,-73.0,-69.0,44.0,-44.0,62.0,15.0,-51.0,62.0,22.0,79.0,47.0,1.0,5.0,33.0,1.0,-50.0,68.0,-87.0,-76.0,31.0,70.0,-62.0,59.0,-40.0,-40.0,-61.0,-2.0,-90.0,34.0,89.0,-69.0,50.0,-28.0,-63.0,-57.0,-3.0,-75.0,-2.0,-1.0,21.0,84.0,-46.0,-21.0,-67.0,70.0,-75.0,-10.0,21.0,-1.0,-38.0,82.0,-13.0,18.0,59.0,87.0,-95.0,10.0,-19.0,95.0,-68.0,50.0,-18.0,79.0,65.0,39.0,-5.0,1.0,-26.0,89.0,94.0,85.0,-63.0,9.0,-89.0,52.0,66.0,10.0,-87.0,23.0,27.0,-19.0,-43.0,-50.0,83.0,89.0,-74.0,71.0,-25.0,81.0,-29.0,-42.0,37.0,-54.0,-68.0,57.0,22.0,100.0,-46.0,7.0,-69.0,-93.0,12.0,56.0,-9.0,-55.0,74.0,-46.0,-75.0,-43.0,-70.0,61.0,5.0,77.0,-74.0,85.0,-65.0,-58.0,2.0,36.0,36.0,-78.0,-67.0,-21.0,30.0,82.0,-95.0,3.0,-91.0,-16.0,13.0,11.0,-88.0,43.0,-40.0,7.0,27.0,-43.0,-99.0,39.0,18.0,38.0,-63.0,-90.0,80.0,-65.0,7.0,-81.0,42.0,-37.0,-91.0,-10.0,-41.0,-10.0,1.0,-54.0,44.0,-73.0,-97.0,-93.0,-43.0,-15.0,-45.0,-49.0,85.0,-57.0,-41.0,-38.0,-57.0,95.0,-64.0,-82.0,96.0,57.0,-84.0,-29.0,88.0,6.0,-39.0,11.0,-81.0,81.0,-60.0,-37.0,-4.0,35.0,-17.0,-88.0,85.0,28.0,-18.0,-50.0,-16.0,91.0,8.0,72.0,56.0,46.0,-86.0,31.0,-62.0,-66.0,-33.0,-54.0,37.0,-99.0,15.0,22.0,1.0,96.0,22.0,-64.0,80.0,-67.0,91.0,-62.0,74.0,1.0,-34.0,-87.0,88.0,-88.0,-20.0,-48.0,81.0,-95.0,-34.0,-40.0,88.0,-27.0,-82.0,-96.0,33.0,0.0,-16.0,-82.0,-79.0,5.0,11.0,73.0,-23.0,-32.0,-79.0,28.0,40.0,44.0,-46.0,73.0,72.0,-77.0,-68.0,-44.0,60.0,-36.0,0.0,58.0,-93.0,-15.0,19.0,-60.0,-62.0,-81.0,-44.0,-20.0,-3.0,-47.0,25.0,67.0,-71.0,-76.0,-67.0,-74.0,0.0,-8.0,-8.0,-91.0,37.0,20.0,-73.0,71.0,-89.0,5.0,-97.0,4.0,52.0,95.0,-85.0,-67.0,-21.0,-73.0,93.0,-8.0,66.0,97.0,51.0,-80.0,7.0,-52.0,34.0,-36.0,-6.0,56.0,-66.0,89.0,95.0,95.0,-8.0,89.0,32.0,92.0,34.0,34.0,-69.0,16.0,-55.0,-1.0,-93.0,2.0,-96.0,-17.0,28.0,25.0,-85.0,-14.0,73.0,22.0,-49.0,-91.0,-51.0,77.0,78.0,-20.0,-25.0,16.0,89.0,-74.0,48.0,-46.0,-27.0,-98.0,45.0,82.0,13.0,44.0,-62.0,1.0,76.0,-50.0,-74.0,-79.0,4.0,-92.0,38.0,28.0,-89.0,40.0,-15.0,-65.0,-24.0,-60.0,-96.0,-53.0,81.0,95.0,52.0,-80.0,-12.0,12.0,87.0,86.0,-4.0,30.0,2.0,-20.0,78.0,90.0,24.0,41.0,-14.0,-40.0,59.0,-79.0,-28.0,85.0,-1.0,34.0,60.0,63.0,-99.0,-74.0,32.0,-61.0,63.0,-35.0,-96.0,-51.0,-27.0,-78.0,-92.0,81.0,56.0,-95.0,73.0,-7.0,10.0,-91.0,-6.0,-39.0,-6.0,-8.0,36.0,80.0,99.0,-21.0,-6.0,-65.0,42.0,-38.0,-96.0,-18.0,75.0,-80.0,19.0,-77.0,63.0,-49.0,-9.0,-83.0,62.0,34.0,-29.0,0.0,71.0,-40.0,94.0,59.0,-2.0,1.0,89.0,88.0,24.0,-4.0,-54.0,-58.0,-80.0,-2.0]}
},{}],40:[function(require,module,exports){
module.exports={"expected":[1.0,10.0,100.0,1000.0,10000.0,100000.0,1.0e6,1.0e7,1.0e8,1.0e9,1.0e10,1.0e11,1.0e12,1.0e13,1.0e14,1.0e15,1.0e16,1.0e17,1.0e18,1.0e19,1.0e20,1.0e21,1.0e22,1.0e23,1.0e24,1.0e25,1.0e26,1.0e27,1.0e28,1.0000000000000001e29,1.0e30,1.0e31,1.0e32,1.0e33,1.0000000000000001e34,1.0e35,1.0e36,1.0e37,1.0e38,1.0000000000000001e39,1.0e40,1.0e41,9.999999999999999e41,1.0e43,1.0e44,1.0e45,1.0e46,1.0e47,1.0e48,1.0000000000000001e49,1.0e50,1.0e51,1.0e52,1.0e53,1.0e54,1.0e55,1.0e56,1.0e57,1.0000000000000001e58,1.0e59,1.0e60,1.0000000000000001e61,1.0e62,1.0e63,1.0e64,1.0e65,1.0e66,1.0e67,1.0e68,1.0e69,9.999999999999999e69,1.0e71,1.0e72,1.0e73,1.0e74,1.0e75,1.0e76,1.0e77,1.0e78,1.0e79,1.0e80,1.0e81,1.0e82,1.0e83,1.0e84,1.0e85,1.0e86,1.0e87,1.0e88,1.0e89,1.0e90,1.0e91,1.0e92,1.0e93,1.0e94,1.0e95,1.0e96,1.0e97,1.0e98,1.0e99,1.0e100,1.0e101,1.0e102,1.0e103,1.0e104,1.0e105,1.0e106,1.0e107,1.0e108,1.0e109,1.0e110,1.0e111,1.0e112,1.0e113,1.0e114,1.0e115,1.0e116,1.0e117,1.0e118,1.0e119,1.0e120,1.0e121,1.0e122,1.0e123,1.0e124,1.0e125,1.0000000000000001e126,1.0e127,1.0e128,1.0e129,1.0e130,1.0e131,1.0e132,1.0e133,1.0e134,1.0e135,9.999999999999999e135,1.0e137,1.0e138,1.0e139,1.0e140,1.0e141,9.999999999999999e141,1.0e143,1.0e144,1.0e145,1.0e146,1.0e147,1.0e148,1.0e149,1.0e150,1.0e151,1.0e152,1.0e153,1.0e154,1.0e155,1.0e156,1.0e157,1.0e158,1.0e159,1.0e160,1.0e161,1.0e162,1.0e163,1.0e164,1.0000000000000001e165,1.0000000000000001e166,1.0e167,1.0e168,1.0000000000000001e169,1.0e170,1.0e171,1.0e172,1.0e173,1.0e174,1.0e175,1.0e176,1.0e177,1.0e178,1.0e179,1.0e180,1.0e181,1.0e182,1.0e183,1.0e184,1.0e185,1.0e186,1.0000000000000001e187,1.0e188,1.0e189,1.0e190,9.999999999999999e190,1.0e192,1.0e193,1.0e194,1.0e195,1.0e196,1.0e197,1.0e198,1.0e199,1.0e200,1.0e201,1.0e202,1.0e203,1.0e204,1.0e205,1.0e206,1.0e207,1.0e208,1.0e209,1.0000000000000001e210,1.0e211,1.0e212,1.0e213,1.0e214,1.0000000000000001e215,1.0e216,1.0e217,1.0e218,1.0e219,1.0e220,1.0e221,1.0e222,9.999999999999999e222,1.0e224,1.0000000000000001e225,1.0e226,1.0e227,1.0e228,1.0e229,1.0e230,1.0e231,9.999999999999999e231,1.0e233,1.0e234,1.0e235,1.0e236,1.0e237,1.0e238,1.0e239,1.0e240,1.0e241,1.0e242,1.0e243,9.999999999999999e243,1.0e245,1.0e246,1.0000000000000001e247,1.0e248,1.0e249,1.0e250,1.0e251,1.0e252,1.0e253,1.0e254,1.0e255,1.0e256,1.0e257,1.0e258,1.0e259,9.999999999999999e259,1.0e261,1.0e262,1.0e263,1.0e264,1.0e265,1.0e266,1.0e267,1.0e268,1.0e269,1.0e270,1.0e271,1.0e272,1.0000000000000001e273,1.0e274,1.0e275,1.0e276,1.0e277,1.0e278,9.999999999999999e278,1.0e280,1.0e281,1.0e282,1.0e283,9.999999999999999e283,1.0e285,1.0e286,1.0e287,1.0e288,1.0e289,1.0e290,1.0e291,1.0e292,1.0e293,9.999999999999999e293,1.0e295,1.0e296,1.0e297,1.0e298,1.0e299,1.0e300,9.999999999999999e300,1.0e302,1.0e303,1.0e304,1.0e305,1.0e306,1.0e307,1.0e308],"x":[10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0],"y":[0.0,1.0,2.0,3.0,4.0,5.0,6.0,7.0,8.0,9.0,10.0,11.0,12.0,13.0,14.0,15.0,16.0,17.0,18.0,19.0,20.0,21.0,22.0,23.0,24.0,25.0,26.0,27.0,28.0,29.0,30.0,31.0,32.0,33.0,34.0,35.0,36.0,37.0,38.0,39.0,40.0,41.0,42.0,43.0,44.0,45.0,46.0,47.0,48.0,49.0,50.0,51.0,52.0,53.0,54.0,55.0,56.0,57.0,58.0,59.0,60.0,61.0,62.0,63.0,64.0,65.0,66.0,67.0,68.0,69.0,70.0,71.0,72.0,73.0,74.0,75.0,76.0,77.0,78.0,79.0,80.0,81.0,82.0,83.0,84.0,85.0,86.0,87.0,88.0,89.0,90.0,91.0,92.0,93.0,94.0,95.0,96.0,97.0,98.0,99.0,100.0,101.0,102.0,103.0,104.0,105.0,106.0,107.0,108.0,109.0,110.0,111.0,112.0,113.0,114.0,115.0,116.0,117.0,118.0,119.0,120.0,121.0,122.0,123.0,124.0,125.0,126.0,127.0,128.0,129.0,130.0,131.0,132.0,133.0,134.0,135.0,136.0,137.0,138.0,139.0,140.0,141.0,142.0,143.0,144.0,145.0,146.0,147.0,148.0,149.0,150.0,151.0,152.0,153.0,154.0,155.0,156.0,157.0,158.0,159.0,160.0,161.0,162.0,163.0,164.0,165.0,166.0,167.0,168.0,169.0,170.0,171.0,172.0,173.0,174.0,175.0,176.0,177.0,178.0,179.0,180.0,181.0,182.0,183.0,184.0,185.0,186.0,187.0,188.0,189.0,190.0,191.0,192.0,193.0,194.0,195.0,196.0,197.0,198.0,199.0,200.0,201.0,202.0,203.0,204.0,205.0,206.0,207.0,208.0,209.0,210.0,211.0,212.0,213.0,214.0,215.0,216.0,217.0,218.0,219.0,220.0,221.0,222.0,223.0,224.0,225.0,226.0,227.0,228.0,229.0,230.0,231.0,232.0,233.0,234.0,235.0,236.0,237.0,238.0,239.0,240.0,241.0,242.0,243.0,244.0,245.0,246.0,247.0,248.0,249.0,250.0,251.0,252.0,253.0,254.0,255.0,256.0,257.0,258.0,259.0,260.0,261.0,262.0,263.0,264.0,265.0,266.0,267.0,268.0,269.0,270.0,271.0,272.0,273.0,274.0,275.0,276.0,277.0,278.0,279.0,280.0,281.0,282.0,283.0,284.0,285.0,286.0,287.0,288.0,289.0,290.0,291.0,292.0,293.0,294.0,295.0,296.0,297.0,298.0,299.0,300.0,301.0,302.0,303.0,304.0,305.0,306.0,307.0,308.0]}
},{}],41:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var abs = require( '@stdlib/math/base/special/abs' );
var randu = require( '@stdlib/random/base/randu' );
var round = require( '@stdlib/math/base/special/round' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var EPS = require( '@stdlib/constants/math/float64-eps' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isPositiveZero = require( '@stdlib/math/base/assert/is-positive-zero' );
var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
var pow = require( './../lib' );


// FIXTURES //

var decimalInteger = require( './fixtures/julia/decimal_integer.json' );
var integerInteger = require( './fixtures/julia/integer_integer.json' );
var multiplesOfTen = require( './fixtures/julia/multiples_of_ten.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof pow, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function accepts two parameters: a base and an exponent', function test( t ) {
	t.strictEqual( pow.length, 2, 'arity is 2' );
	t.end();
});

tape( 'the function evaluates the exponential function (decimal `x`, integer `y`)', function test( t ) {
	var expected;
	var actual;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = decimalInteger.x;
	y = decimalInteger.y;
	expected = decimalInteger.expected;
	for ( i = 0; i < x.length; i++ ) {
		actual = pow( x[i], y[i] );
		if ( actual === expected[ i ] ) {
			t.strictEqual( actual, expected[i], 'pow('+x[i]+','+y[i]+') returns '+expected[i] );
		} else {
			delta = abs( actual - expected[i] );
			tol = 70.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'x: '+x[i]+'. y: '+y[i]+'. v: '+actual+'. expected: '+expected[i]+'. delta: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the exponential function (integer `x`, integer `y`)', function test( t ) {
	var expected;
	var actual;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = integerInteger.x;
	y = integerInteger.y;
	expected = integerInteger.expected;
	for ( i = 0; i < x.length; i++ ) {
		actual = pow( x[i], y[i] );
		if ( expected[ i ] === null ) {
			// Expected value is infinity:
			t.strictEqual( actual, PINF, 'pow('+x[i]+','+y[i]+') returns +infinity' );
		}
		else if ( actual === expected[ i ] ) {
			t.strictEqual( actual, expected[i], 'pow('+x[i]+','+y[i]+') returns '+expected[i] );
		}
		else {
			delta = abs( actual - expected[i] );
			tol = 61.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'x: '+x[i]+'. y: '+y[i]+'. v: '+actual+'. expected: '+expected[i]+'. delta: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the exponential function (multiples of ten)', function test( t ) {
	var expected;
	var actual;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = multiplesOfTen.x;
	y = multiplesOfTen.y;
	expected = multiplesOfTen.expected;
	for ( i = 0; i < x.length; i++ ) {
		actual = pow( x[i], y[i] );
		if ( actual === expected[ i ] ) {
			t.strictEqual( actual, expected[i], 'pow('+x[i]+','+y[i]+') returns '+expected[i] );
		} else {
			delta = abs( actual - expected[i] );
			tol = 3.75 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'x: '+x[i]+'. y: '+y[i]+'. v: '+actual+'. expected: '+expected[i]+'. delta: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function returns `NaN` if provided `NaN` for the base', function test( t ) {
	var v;

	v = pow( NaN, 5 );
	t.strictEqual( isnan( v ), true, 'returns NaN' );

	v = pow( NaN, 1 );
	t.strictEqual( isnan( v ), true, 'returns NaN' );

	v = pow( NaN, 0 );
	t.strictEqual( isnan( v ), true, 'returns NaN' );

	t.end();
});

tape( 'any number raised to the zero power is `1`', function test( t ) {
	var x;
	var v;
	var i;
	for ( i = 0; i < 100; i++ ) {
		x = ( randu()*1.0e6 ) - 5.0e5;
		v = pow( x, 0 );
		t.strictEqual( v, 1.0, 'pow('+x+',0.0) returns 1' );
	}
	t.strictEqual( pow( PINF, 0 ), 1.0, 'inf^0 = 1' );
	t.strictEqual( pow( NINF, 0 ), 1.0, '(-inf)^0 = 1' );
	t.strictEqual( pow( 0.0, 0 ), 1.0, '0^0 = 1' );
	t.end();
});

tape( 'any number raised to the `-1` power is the reciprocal of that number', function test( t ) {
	var x;
	var v;
	var i;
	for ( i = 0; i < 100; i++ ) {
		x = ( randu()*1.0e6 ) - 5.0e5;
		v = pow( x, -1 );
		t.strictEqual( v, 1/x, 'pow('+x+',0.0) returns '+(1/x) );
	}
	t.strictEqual( isPositiveZero( pow( PINF, -1 ) ), true, 'inf^-1 = 0' );
	t.strictEqual( isNegativeZero( pow( NINF, -1 ) ), true, '(-inf)^0 = -0' );
	t.strictEqual( pow( 0.0, -1 ), PINF, '0^-1 = +infinity' );
	t.strictEqual( pow( -0.0, -1 ), NINF, '(-0)^-1 = -infinity' );
	t.end();
});

tape( 'unity raised to any power is `1`', function test( t ) {
	var y;
	var v;
	var i;
	for ( i = 0; i < 100; i++ ) {
		y = ( randu()*1.0e6 ) - 5.0e5;
		v = pow( 1.0, y );
		t.strictEqual( v, 1.0, 'pow(1.0,'+y+') returns 1' );
	}
	t.strictEqual( pow( 1.0, 0 ), 1.0, '1^0 = 1' );
	t.end();
});

tape( '`-1` raised to any odd integer is `-1`', function test( t ) {
	var v;
	var i;
	for ( i = -51; i < 53; i += 2 ) {
		v = pow( -1.0, i );
		t.strictEqual( v, -1.0, 'pow(1.0,'+i+') returns -1' );
	}
	t.end();
});

tape( '`+-0` raised to a positive even integer is `0`', function test( t ) {
	var y;
	var i;
	var v;

	for ( i = 0; i < 100; i++ ) {
		y = (i+1) * 2;
		v = pow( +0.0, y );
		t.strictEqual( isPositiveZero( v ), true, 'pow(0,'+y+') returns +0' );

		v = pow( -0.0, y);
		t.strictEqual( isPositiveZero( v ), true, 'pow(-0,'+y+') returns +0' );
	}
	t.end();
});

tape( '`+-0` raised to a positive odd integer is `+-0`', function test( t ) {
	var i;
	var v;

	for ( i = 1; i < 101; i += 2 ) {
		v = pow( +0.0, i );
		t.strictEqual( isPositiveZero( v ), true, 'pow(0,'+i+') returns +0' );

		v = pow( -0.0, i );
		t.strictEqual( isNegativeZero( v ), true, 'pow(-0,'+i+') returns -0' );
	}
	t.end();
});

tape( '`+-0` raised to a negative even integer is `+infinity`', function test( t ) {
	var y;
	var i;
	var v;

	for ( i = 0; i < 100; i++ ) {
		y = -(i+1) * 2;
		v = pow( +0.0, y );
		t.strictEqual( v, PINF, 'pow(0,'+y+') returns +infinity' );

		v = pow( -0.0, y );
		t.strictEqual( v, PINF, 'pow(-0,'+y+') returns +infinity' );
	}
	t.end();
});

tape( '`+-0` raised to a negative odd integer is `+-infinity`', function test( t ) {
	var i;
	var v;

	for ( i = -101; i < 0; i += 2 ) {
		v = pow( +0.0, i );
		t.strictEqual( v, PINF, 'pow(0,'+i+') returns +infinity' );

		v = pow( -0.0, i );
		t.strictEqual( v, NINF, 'pow(-0,'+i+') returns -infinity' );
	}
	t.end();
});

tape( 'the function returns `(-0)^y` if `-infinity` is raised to a `y` power', function test( t ) {
	var y;
	var v;
	var i;

	for ( i = 0; i < 100; i++ ) {
		y = round( randu()*100.0 );
		v = pow( NINF, y );
		t.strictEqual( v, pow( -0.0, -y ), 'pow(-infinity,'+y+') returns pow(-0,-'+y+')' );
	}

	v = pow( NINF, 5 );
	t.strictEqual( v, pow( -0.0, -5 ), 'pow(-infinity,5) returns pow(-0,-5)' );

	v = pow( NINF, 2 );
	t.strictEqual( v, pow( -0.0, -2 ), 'pow(-infinity,2) returns pow(-0,-2)' );

	v = pow( NINF, -5 );
	t.strictEqual( v, pow( -0.0, 5 ), 'pow(-infinity,-5) returns pow(-0,5)' );

	v = pow( NINF, -2 );
	t.strictEqual( v, pow( -0.0, 2 ), 'pow(-infinity,-2) returns pow(-0,2)' );

	t.end();
});

tape( 'the function returns `0` if `+infinity` is raised to any negative finite integer', function test( t ) {
	var y;
	var v;
	var i;
	for ( i = 0; i < 100; i++ ) {
		y = -round( randu()*1.0e5 ) - 1;
		v = pow( PINF, y );
		t.strictEqual( isPositiveZero( v ), true, 'returns 0' );
	}
	t.end();
});

tape( 'the function returns `+infinity` if `+infinity` is raised to any positive finite integer', function test( t ) {
	var y;
	var v;
	var i;
	for ( i = 0; i < 100; i++ ) {
		y = round( randu()*1.0e5 ) + 1;
		v = pow( PINF, y );
		t.strictEqual( v, PINF, 'returns +infinity' );
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/fastmath/special/pow-int/test/test.js")
},{"./../lib":36,"./fixtures/julia/decimal_integer.json":38,"./fixtures/julia/integer_integer.json":39,"./fixtures/julia/multiples_of_ten.json":40,"@stdlib/constants/math/float64-eps":32,"@stdlib/constants/math/float64-ninf":33,"@stdlib/constants/math/float64-pinf":34,"@stdlib/math/base/assert/is-nan":44,"@stdlib/math/base/assert/is-negative-zero":46,"@stdlib/math/base/assert/is-positive-zero":48,"@stdlib/math/base/special/abs":51,"@stdlib/math/base/special/round":54,"@stdlib/random/base/randu":67,"tape":155}],42:[function(require,module,exports){
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

},{"./is_integer.js":43}],43:[function(require,module,exports){
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
}


// EXPORTS //

module.exports = isInteger;

},{"@stdlib/math/base/special/floor":53}],44:[function(require,module,exports){
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

},{"./is_nan.js":45}],45:[function(require,module,exports){
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
	return ( x !== x );
}


// EXPORTS //

module.exports = isnan;

},{}],46:[function(require,module,exports){
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

},{"./is_negative_zero.js":47}],47:[function(require,module,exports){
'use strict';

// MODULES //

var NINF = require( '@stdlib/constants/math/float64-ninf' );


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
}


// EXPORTS //

module.exports = isNegativeZero;

},{"@stdlib/constants/math/float64-ninf":33}],48:[function(require,module,exports){
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

},{"./is_positive_zero.js":49}],49:[function(require,module,exports){
'use strict';

// MODULES //

var PINF = require( '@stdlib/constants/math/float64-pinf' );


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
}


// EXPORTS //

module.exports = isPositiveZero;

},{"@stdlib/constants/math/float64-pinf":34}],50:[function(require,module,exports){
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
}


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

},{}],53:[function(require,module,exports){
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

},{"./floor.js":52}],54:[function(require,module,exports){
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
* v = round( Infinity );
* // returns Infinity
*
* v = round( -Infinity );
* // returns -Infinity
*
* v = round( NaN );
* // returns NaN
*/

// MODULES //

var round = require( './round.js' );


// EXPORTS //

module.exports = round;

},{"./round.js":55}],55:[function(require,module,exports){
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
* var v = round( Infinity );
* // returns Infinity
*
* @example
* var v = round( -Infinity );
* // returns -Infinity
*
* @example
* var v = round( NaN );
* // returns NaN
*/
var round = Math.round;


// EXPORTS //

module.exports = round;

},{}],56:[function(require,module,exports){
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
}


// EXPORTS //

module.exports = createTable;

},{"@stdlib/math/base/assert/is-nan":44}],57:[function(require,module,exports){
'use strict';

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isPositiveInteger = require( '@stdlib/assert/is-positive-integer' ).isPrimitive;
var floor = require( '@stdlib/math/base/special/floor' );
var INT32_MAX = require( '@stdlib/constants/math/int32-max' );
var minstd = require( '@stdlib/random/base/minstd' ).factory;
var createTable = require( './create_table.js' );


// VARIABLES //

var NORMALIZATION_CONSTANT = (INT32_MAX - 1)|0; // asm type annotation
var MAX_SEED = (INT32_MAX - 1)|0; // asm type annotation


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
	}

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
	}
}


// EXPORTS //

module.exports = factory;

},{"./create_table.js":56,"@stdlib/assert/is-positive-integer":27,"@stdlib/constants/math/int32-max":35,"@stdlib/math/base/special/floor":53,"@stdlib/random/base/minstd":62,"@stdlib/utils/define-read-only-property":74}],58:[function(require,module,exports){
'use strict';

/**
* A linear congruential pseudorandom number generator (LCG) whose output is shuffled.
*
* @module @stdlib/random/base/minstd-shuffle
*
* @example
* var minstd = require( '@stdlib/random/base/minstd-shuffle' );
*
* var v = minstd();
* // returns <number>
*
* @example
* var factory = require( '@stdlib/random/base/minstd' ).factory;
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

},{"./factory.js":57,"./minstd_shuffled.js":59,"@stdlib/utils/define-read-only-property":74}],59:[function(require,module,exports){
'use strict';

// MODULES //

var factory = require( './factory.js' );
var randint32 = require( './rand_int32.js' );


// MAIN //

/**
* Generates a pseudorandom integer on the interval \\( [1,2^{31}-1) \\).
*
* ## Method
*
* This implementation shuffles the output of a linear congruential pseudorandom number generator (LCG) using a shuffle table in accordance with the Bays-Durham algorithm.
*
*
* ## References
*
* -   Bays, Carter, and S. D. Durham. 1976. "Improving a Poor Random Number Generator." _ACM Transactions on Mathematical Software_ 2 (1). New York, NY, USA: ACM: 59–64. doi:[10.1145/355666.355670](http://dx.doi.org/10.1145/355666.355670).
* -   Herzog, T.N., and G. Lord. 2002. _Applications of Monte Carlo Methods to Finance and Insurance_. ACTEX Publications. [https://books.google.com/books?id=vC7I\\\_gdX-A0C](https://books.google.com/books?id=vC7I\_gdX-A0C).
* -   Press, William H., Brian P. Flannery, Saul A. Teukolsky, and William T. Vetterling. 1992. _Numerical Recipes in C: The Art of Scientific Computing, Second Edition_. Cambridge University Press.
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

},{"./factory.js":57,"./rand_int32.js":60}],60:[function(require,module,exports){
'use strict';

// MODULES //

var INT32_MAX = require( '@stdlib/constants/math/int32-max' );
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
}


// EXPORTS //

module.exports = randint32;

},{"@stdlib/constants/math/int32-max":35,"@stdlib/math/base/special/floor":53}],61:[function(require,module,exports){
'use strict';

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isPositiveInteger = require( '@stdlib/assert/is-positive-integer' ).isPrimitive;
var INT32_MAX = require( '@stdlib/constants/math/int32-max' );
var randint32 = require( './rand_int32.js' );


// VARIABLES //

var NORMALIZATION_CONSTANT = (INT32_MAX - 1)|0; // asm type annotation
var MAX_SEED = (INT32_MAX - 1)|0; // asm type annotation
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
		state = randint32()|0; // asm type annotation
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
		state = ( (A*state)%INT32_MAX )|0; // asm type annotation
		return state;
	}

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
	}
}


// EXPORTS //

module.exports = factory;

},{"./rand_int32.js":64,"@stdlib/assert/is-positive-integer":27,"@stdlib/constants/math/int32-max":35,"@stdlib/utils/define-read-only-property":74}],62:[function(require,module,exports){
'use strict';

/**
* A linear congruential pseudorandom number generator (LCG) based on Park and Miller.
*
* @module @stdlib/random/base/minstd
*
* @example
* var minstd = require( '@stdlib/random/base/minstd' );
*
* var v = minstd();
* // returns <number>
*
* @example
* var factory = require( '@stdlib/random/base/minstd' ).factory;
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

},{"./factory.js":61,"./minstd.js":63,"@stdlib/utils/define-read-only-property":74}],63:[function(require,module,exports){
'use strict';

// MODULES //

var factory = require( './factory.js' );
var randint32 = require( './rand_int32.js' );


// MAIN //

/**
* Generates a pseudorandom integer on the interval \\( [1,2^{31}-1) \\).
*
* ## Method
*
* Linear congruential generators (LCGs) use the recurrence relation
*
* ```tex
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
* ```tex
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
* ```tex
* 16807 \cdot (m - 1) \approx 2^{46}
* ```
*
* The values for \\( a \\), \\( c \\), and \\( m \\) are taken from Park and Miller, "Random Number Generators: Good Ones Are Hard To Find". Park's and Miller's article is also the basis for a recipe in the second edition of _Numerical Recipes in C_.
*
*
* ## Notes
*
* -   The generator has a period of approximately \\(2.1\mbox{e}9\\) (see [Numerical Recipes in C, 2nd Edition](#references), p. 279).
*
*
* ## References
*
* -   Park, S. K., and K. W. Miller. 1988. "Random Number Generators: Good Ones Are Hard to Find." _Communications of the ACM_ 31 (10). New York, NY, USA: ACM: 1192–1201. doi:[10.1145/63039.63042](http://dx.doi.org/10.1145/63039.63042).
* -   Press, William H., Brian P. Flannery, Saul A. Teukolsky, and William T. Vetterling. 1992. _Numerical Recipes in C: The Art of Scientific Computing, Second Edition_. Cambridge University Press.
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

},{"./factory.js":61,"./rand_int32.js":64}],64:[function(require,module,exports){
arguments[4][60][0].apply(exports,arguments)
},{"@stdlib/constants/math/int32-max":35,"@stdlib/math/base/special/floor":53,"dup":60}],65:[function(require,module,exports){
module.exports={
	"name": "minstd-shuffle"
}

},{}],66:[function(require,module,exports){
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
	}
}


// EXPORTS //

module.exports = factory;

},{"./defaults.json":65,"./prngs.js":68,"@stdlib/assert/has-own-property":2,"@stdlib/assert/is-plain-object":24,"@stdlib/utils/define-read-only-property":74}],67:[function(require,module,exports){
'use strict';

/**
* Uniformly distributed pseudorandom numbers on the interval \\( [0,1) \\).
*
* @module @stdlib/random/base/randu
*
* @example
* var randu = require( '@stdlib/random/base/randu' );
*
* var v = randu();
* // returns <number>
*
* @example
* var factory = require( '@stdlib/random/base/randu' ).factory;
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

},{"./factory.js":66,"./uniform.js":69,"@stdlib/utils/define-read-only-property":74}],68:[function(require,module,exports){
'use strict';

// MAIN //

var prngs = {};

prngs[ 'minstd' ] = require( '@stdlib/random/base/minstd' );
prngs[ 'minstd-shuffle' ] = require( '@stdlib/random/base/minstd-shuffle' );


// EXPORTS //

module.exports = prngs;

},{"@stdlib/random/base/minstd":62,"@stdlib/random/base/minstd-shuffle":58}],69:[function(require,module,exports){
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

},{"./factory.js":66}],70:[function(require,module,exports){
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
* -   `/^\s*`
*     -   Match zero or more spaces at beginning
*
* -   `function`
*     -   Match the word `function`
*
* -   `\s*`
*     -   Match zero or more spaces after the word `function`
*
* -   `()`
*     -   Capture
*
* -   `[^(]*`
*     -   Match anything except a left parenthesis `(` zero or more times
*
* -   `/i`
*     -   ignore case
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
*
* @example
* var v = constructorName( 5 );
* // returns 'Number'
*
* @example
* var v = constructorName( null );
* // returns 'Null'
*
* @example
* var v = constructorName( undefined );
* // returns 'Undefined'
*
* @example
* var v = constructorName( function noop() {} );
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
}


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
}


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
}


// EXPORTS //

module.exports = hasSymbolSupport;

},{}],76:[function(require,module,exports){
'use strict';

/**
* Test for native `Symbol` support.
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
}


// EXPORTS //

module.exports = hasToStringTagSupport;

},{"@stdlib/utils/detect-symbol-support":76}],78:[function(require,module,exports){
'use strict';

/**
* Test for native `toStringTag` support.
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
var builtin = require( './native.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var getProto;
if ( isFunction( Object.getPrototypeOf ) ) {
	getProto = builtin;
} else {
	getProto = polyfill;
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
}


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

// MAIN //

var getProto = Object.getPrototypeOf;


// EXPORTS //

module.exports = getProto;

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
}


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
}


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

var hasToStringTag = require( '@stdlib/utils/detect-tostringtag-support' );
var builtin = require( './native_class.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var nativeClass;
if ( hasToStringTag() ) {
	nativeClass = polyfill;
} else {
	nativeClass = builtin;
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
}


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
}


// EXPORTS //

module.exports = nativeClass;

},{"./tostring.js":88,"./tostringtag.js":89,"@stdlib/assert/has-own-property":2}],88:[function(require,module,exports){
'use strict';

// MAIN //

var toStr = Object.prototype.toString;


// EXPORTS //

module.exports = toStr;

},{}],89:[function(require,module,exports){
'use strict';

// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

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
}


// EXPORTS //

module.exports = check;

},{"./fixtures/nodelist.js":91,"./fixtures/re.js":92,"./fixtures/typedarray.js":93}],91:[function(require,module,exports){
'use strict';

// MODULES //

var root = require( 'system.global' )(); // eslint-disable-line stdlib/no-redeclare


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
}


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
* ```text
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
}


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
 * @author   Feross Aboukhadijeh <https://feross.org>
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

},{"foreach":116,"object-keys":126}],107:[function(require,module,exports){
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
 * @author   Feross Aboukhadijeh <https://feross.org>
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
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],125:[function(require,module,exports){
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

},{}],126:[function(require,module,exports){
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

},{"./isArguments":127}],127:[function(require,module,exports){
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

},{}],128:[function(require,module,exports){
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
},{"_process":100}],129:[function(require,module,exports){
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
},{"_process":100}],130:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":131}],131:[function(require,module,exports){
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
},{"./_stream_readable":133,"./_stream_writable":135,"core-util-is":102,"inherits":121,"process-nextick-args":129}],132:[function(require,module,exports){
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
},{"./_stream_transform":134,"core-util-is":102,"inherits":121}],133:[function(require,module,exports){
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
},{"./_stream_duplex":131,"./internal/streams/BufferList":136,"./internal/streams/destroy":137,"./internal/streams/stream":138,"_process":100,"core-util-is":102,"events":115,"inherits":121,"isarray":124,"process-nextick-args":129,"safe-buffer":144,"string_decoder/":150,"util":98}],134:[function(require,module,exports){
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
},{"./_stream_duplex":131,"core-util-is":102,"inherits":121}],135:[function(require,module,exports){
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
},{"./_stream_duplex":131,"./internal/streams/destroy":137,"./internal/streams/stream":138,"_process":100,"core-util-is":102,"inherits":121,"process-nextick-args":129,"safe-buffer":144,"util-deprecate":161}],136:[function(require,module,exports){
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
},{"safe-buffer":144}],137:[function(require,module,exports){
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
},{"process-nextick-args":129}],138:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":115}],139:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":140}],140:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":131,"./lib/_stream_passthrough.js":132,"./lib/_stream_readable.js":133,"./lib/_stream_transform.js":134,"./lib/_stream_writable.js":135}],141:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":140}],142:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":135}],143:[function(require,module,exports){
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
},{"_process":100,"through":160}],144:[function(require,module,exports){
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

},{"buffer":101}],145:[function(require,module,exports){
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

},{"events":115,"inherits":121,"readable-stream/duplex.js":130,"readable-stream/passthrough.js":139,"readable-stream/readable.js":140,"readable-stream/transform.js":141,"readable-stream/writable.js":142}],146:[function(require,module,exports){
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

},{"es-abstract/es5":108,"function-bind":118}],147:[function(require,module,exports){
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

},{"./implementation":146,"./polyfill":148,"./shim":149,"define-properties":106,"function-bind":118}],148:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":146}],149:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":148,"define-properties":106}],150:[function(require,module,exports){
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
},{"safe-buffer":144}],151:[function(require,module,exports){
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
},{"_process":100,"events":115,"function-bind":118,"has":119,"inherits":121,"object-inspect":125,"resumer":143,"through":160}],159:[function(require,module,exports){
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
},{"./next_tick":157,"deep-equal":103,"defined":107,"events":115,"has":119,"inherits":121,"path":128,"string.prototype.trim":147}],160:[function(require,module,exports){
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
},{"_process":100,"stream":145}],161:[function(require,module,exports){
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
},{}]},{},[41]);
