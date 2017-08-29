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

},{"@stdlib/utils/native-class":172}],5:[function(require,module,exports){
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

},{"@stdlib/assert/is-object-like":23}],7:[function(require,module,exports){
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

},{"@stdlib/utils/type-of":181}],9:[function(require,module,exports){
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

},{"./generic.js":9,"./object.js":12,"./primitive.js":13,"@stdlib/utils/define-read-only-property":161}],11:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-integer":39,"@stdlib/math/constants/float64-ninf":151,"@stdlib/math/constants/float64-pinf":153}],12:[function(require,module,exports){
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

},{"./integer.js":11,"@stdlib/assert/is-number":18}],13:[function(require,module,exports){
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

},{"./integer.js":11,"@stdlib/assert/is-number":18}],14:[function(require,module,exports){
'use strict';

var ctors = {
	'uint16': Uint16Array,
	'uint8': Uint8Array
};


// EXPORTS //

module.exports = ctors;

},{}],15:[function(require,module,exports){
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

},{"./is_little_endian.js":16}],16:[function(require,module,exports){
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

},{"./ctors.js":14}],17:[function(require,module,exports){
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

},{"./object.js":19,"./primitive.js":20}],18:[function(require,module,exports){
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

},{"./generic.js":17,"./object.js":19,"./primitive.js":20,"@stdlib/utils/define-read-only-property":161}],19:[function(require,module,exports){
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

},{"./try2serialize.js":22,"@stdlib/utils/detect-tostringtag-support":165,"@stdlib/utils/native-class":172}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
'use strict';

// eslint-disable-next-line no-redeclare
var toString = Number.prototype.toString; // non-generic


// EXPORTS //

module.exports = toString;

},{}],22:[function(require,module,exports){
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

},{"./tostring.js":21}],23:[function(require,module,exports){
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

},{"./is_object_like.js":24,"@stdlib/assert/tools/array-function":34,"@stdlib/utils/define-read-only-property":161}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
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

},{"./is_object.js":26}],26:[function(require,module,exports){
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

},{"@stdlib/assert/is-array":3}],27:[function(require,module,exports){
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

},{"./is_plain_object.js":28}],28:[function(require,module,exports){
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

},{"@stdlib/assert/has-own-property":2,"@stdlib/assert/is-function":7,"@stdlib/assert/is-object":25,"@stdlib/utils/get-prototype-of":168,"@stdlib/utils/native-class":172}],29:[function(require,module,exports){
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

},{"./object.js":31,"./primitive.js":32}],30:[function(require,module,exports){
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

},{"./generic.js":29,"./object.js":31,"./primitive.js":32,"@stdlib/utils/define-read-only-property":161}],31:[function(require,module,exports){
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

},{"@stdlib/assert/is-integer":10}],32:[function(require,module,exports){
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

},{"@stdlib/assert/is-integer":10}],33:[function(require,module,exports){
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

},{"@stdlib/assert/is-array":3}],34:[function(require,module,exports){
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

},{"./arrayfcn.js":33}],35:[function(require,module,exports){
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

},{"./is_even.js":36}],36:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-integer":39}],37:[function(require,module,exports){
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

},{"./is_infinite.js":38}],38:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-ninf":151,"@stdlib/math/constants/float64-pinf":153}],39:[function(require,module,exports){
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

},{"./is_integer.js":40}],40:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":83}],41:[function(require,module,exports){
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

},{"./is_nan.js":42}],42:[function(require,module,exports){
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

},{}],43:[function(require,module,exports){
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

},{"./is_negative_zero.js":44}],44:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-ninf":151}],45:[function(require,module,exports){
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

},{"./is_odd.js":46}],46:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-even":35}],47:[function(require,module,exports){
'use strict';

// MODULES //

var degenerate = require( '@stdlib/math/base/dist/degenerate/pdf' ).factory;
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var gamma = require( '@stdlib/math/base/special/gamma' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var nan = require( './nan.js' );


// MAIN //

/**
* Returns a function for evaluating the probability density function (PDF) for a chi distribution with degrees of freedom `k`.
*
* @param {NonNegativeNumber} k - degrees of freedom
* @returns {Function} PDF
*
* @example
* var pdf = factory( 0.5 );
*
* var y = pdf( 2.0 );
* // returns ~0.04
*
* y = pdf( 1.0 );
* // returns ~0.281
*/
function factory( k ) {
	var km1;
	var kh;

	if ( isnan( k ) || k < 0.0 ) {
		return nan;
	}
	if ( k === 0.0 ) {
		return degenerate( 0.0 );
	}

	kh = k / 2.0;
	km1 = k - 1.0;
	return pdf;

	/**
	* Evaluates the probability density function (PDF) for a chi distribution with degrees of freedom `k`.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} evaluated CDF
	*/
	function pdf( x ) {
		var out;
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x < 0.0 ) {
			return 0.0;
		}
		out = pow( 2.0, 1.0-kh ) * pow( x, km1 ) * exp( -(x*x)/2.0 );
		out /= gamma( kh );
		return out;
	} // end FUNCTION pdf()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./nan.js":49,"@stdlib/math/base/assert/is-nan":41,"@stdlib/math/base/dist/degenerate/pdf":56,"@stdlib/math/base/special/exp":81,"@stdlib/math/base/special/gamma":85,"@stdlib/math/base/special/pow":94}],48:[function(require,module,exports){
'use strict';

/**
* Chi distribution probability density function (PDF).
*
* @module @stdlib/math/base/dist/chi/pdf
*
* @example
* var pdf = require( '@stdlib/math/base/dist/chi/pdf' );
*
* var y = pdf( 2.0, 1.0 );
* // returns ~0.108
*
* @example
* var factory = require( '@stdlib/math/base/dist/chi/pdf' ).factory;
*
* var pdf = factory( 6.0 );
*
* var y = pdf( 3.0 );
* // returns ~0.337
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var pdf = require( './pdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( pdf, 'factory', factory );


// EXPORTS //

module.exports = pdf;

},{"./factory.js":47,"./pdf.js":50,"@stdlib/utils/define-read-only-property":161}],49:[function(require,module,exports){
'use strict';

/**
* Evaluates the probability density function (PDF) for an invalid chi distribution.
*
* @private
* @returns {number} `NaN`
*
* @example
* var y = pdf( 3.14 );
* // returns NaN
*/
function pdf() {
	return NaN;
} // end FUNCTION pdf()


// EXPORTS //

module.exports = pdf;

},{}],50:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var gamma = require( '@stdlib/math/base/special/gamma' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );


// MAIN //

/**
* Evaluates the probability density function (PDF) for a chi distribution with degrees of freedom `k` at a value `x`.
*
* @param {number} x - input value
* @param {NonNegativeNumber} k - degrees of freedom
* @returns {number} evaluated PDF
*
* @example
* var y = pdf( 0.3, 4.0 );
* // returns ~0.013
* @example
* var y = pdf( 0.7, 0.7 );
* // returns ~0.537
* @example
* var y = pdf( -1.0, 0.5 );
* // returns 0.0
* @example
* var y = pdf( 0.0, NaN );
* // returns NaN
* @example
* var y = pdf( NaN, 2.0 );
* // returns NaN
* @example
* // Negative degrees of freedom:
* var y = pdf( 2.0, -1.0 );
* // returns NaN
*/
function pdf( x, k ) {
	var out;
	var kh;
	if (
		isnan( x ) ||
		isnan( k ) ||
		k < 0.0
	) {
		return NaN;
	}
	if ( k === 0.0 ) {
		// Point mass at 0...
		return x === 0.0 ? PINF : 0.0;
	}
	if ( x < 0.0 ) {
		return 0.0;
	}
	kh = k / 2.0;
	out = pow( 2.0, 1.0-kh ) * pow( x, k-1.0 ) * exp( -(x*x)/2.0 );
	out /= gamma( kh );
	return out;
} // end FUNCTION pdf()


// EXPORTS //

module.exports = pdf;

},{"@stdlib/math/base/assert/is-nan":41,"@stdlib/math/base/special/exp":81,"@stdlib/math/base/special/gamma":85,"@stdlib/math/base/special/pow":94,"@stdlib/math/constants/float64-pinf":153}],51:[function(require,module,exports){
module.exports={"expected":[4.0592453552300736e-48,1.731232608359549e-26,0.026854847628011012,5.7222096870624115e-33,0.0006030313031177055,2.0648639566993923e-32,0.0084940860178818,1.391005021608345e-54,0.0011049393999283238,1.17604593739104e-50,3.5137623289664197e-56,0.2590021022958733,1.9599770386833353e-48,2.9408962935941518e-12,1.3875194533688548e-14,0.4268160445857506,7.453894349363183e-27,1.2880700156067783e-8,7.560162542452081e-43,1.8405453040898892e-20,8.349745119296704e-25,7.312554207236212e-56,7.102604747572893e-9,3.54925272602003e-7,4.689754412200005e-13,0.03236871050672012,1.2097553052595602e-5,0.003156318518115842,0.005190455876294205,0.0010840634797129264,2.348676442824805e-16,0.26029136578373835,0.011382436838116308,1.8389285797032886e-61,5.686669100869084e-41,1.450875970711045e-78,1.4407563506919848e-8,2.876941579980648e-30,1.9094182915776699e-7,1.3514221185207257e-30,3.0984048160067198e-43,0.5596856405364171,1.0084200581759441e-83,0.00178818545101711,3.2741291087711415e-37,1.753788348360939e-5,1.8552039563143243e-17,1.6140478614144073e-15,0.4332735258345753,2.9052604558042347e-6,2.651972906716012e-7,5.289025746770959e-77,2.2010776391183166e-5,8.893647691854417e-9,1.5555423693597289e-58,1.4247165978539158e-21,3.423735710326009e-13,3.549358012585546e-45,3.4718137215585923e-12,0.2899095889123343,2.3559989413298344e-34,1.763456992608671e-6,1.0938855791809563e-26,0.017725793362619365,0.17174728090146701,6.497730994113339e-19,1.226631101271065e-14,0.3605189347807749,1.7653668059392997e-34,1.7974928477617147e-33,1.4489075405195262e-79,1.319270075144924e-67,4.4694740026605814e-7,4.925679968802059e-12,1.47360084167996e-50,0.19879601632343644,0.0691102753834,8.071138163574283e-8,7.598660327438532e-9,8.5279170611067e-32,9.426943248712688e-62,3.165479762846553e-6,0.0014843836568680401,6.499457351872823e-36,0.2516643556630657,0.0009296991118881628,3.141232780505857e-5,3.5449183439029195e-20,5.411667114986415e-22,1.1290494814757016e-51,5.59639081046819e-7,0.04025691054944899,9.492845594646994e-30,0.5697512125187638,3.8405489952050725e-8,6.529227143525981e-82,7.825367399179859e-27,8.100611601102641e-17,5.391135519605993e-40,0.29015717399391544,4.621514404043951e-35,8.038489483281393e-26,0.05394741689554772,1.882438655293367e-71,1.825876831029745e-43,0.2582047049739646,1.4607148787001454e-12,2.738522782292878e-35,0.0018686282665904843,0.00021476175662322393,1.7319914238083714e-22,5.035001462499155e-20,3.9178828978688754e-45,4.7479424091356726e-11,9.365378185853804e-41,3.879650515478597e-38,1.4903833349297875e-6,2.9789813922846806e-13,1.743368564704043e-77,6.459384415478298e-55,9.350494192359137e-71,0.5842492791457001,1.2548713712749833e-59,0.26102778940089294,2.754589624974668e-56,1.3335683952844643e-58,1.0729157636094291e-58,0.00029838772840680417,0.10407953554321603,7.529284186481981e-75,4.303138141668043e-55,3.1624785974381553e-7,0.027459185909481064,0.17030814115096582,8.397179328809176e-20,0.4672947271046327,2.297543281686553e-51,6.981436229632956e-28,0.0002775746507307383,0.013027907305704875,4.6144584795896873e-54,4.246095203766859e-27,0.0392487412096579,1.3762111745991268e-21,0.00010051340056129503,0.16387670094653542,5.990328015310443e-53,5.078852565754427e-24,6.702303627919613e-70,0.0054888280262342486,6.119278534407116e-60,1.0293974990182755e-7,9.514030608100192e-47,1.544926495643546e-16,0.0636342820776881,3.950365513366283e-49,4.1436151002204504e-60,0.015731339042264654,6.049790234429098e-13,1.986403489629018e-25,6.652765481322215e-31,2.250435156764896e-8,2.5103046958821338e-40,5.730718676551153e-6,0.02800790641480354,7.19131416868641e-54,7.589247950988648e-8,7.011684944467911e-27,3.0337522837083697e-6,0.006277402411170937,8.899447289941982e-10,2.2215446616011014e-28,6.879795882144566e-63,9.875431570919897e-46,2.987108139670899e-6,8.354383236852268e-18,0.013728563325775232,1.1525189141641562e-35,0.5132124147346424,0.00012922358706524202,0.03347390813626748,0.007623460604063018,5.813706277899134e-24,1.7967738143474192e-29,4.6065917404757146e-10,2.7875772769218857e-69,6.4988622759941705e-56,7.505511010312975e-50,2.9440896522213986e-78,2.4900958102045804e-6,1.3738830162415443e-17,4.768726547654341e-23,0.01727086677437881,0.0063679270663353545,1.1644003185911794e-76,2.7636508392895035e-81,4.256052844310256e-10,1.840387343424586e-14,8.282478152798632e-42,1.5608103717681748e-40,0.03793571998510572,0.31029227522527697,5.486016205355218e-27,4.990978943802102e-9,0.014513573587732488,7.633956562960821e-15,3.0986354012525366e-80,3.687685446111723e-28,5.222770618115089e-51,0.0008307225539745832,2.089264384009641e-49,1.1247712288371756e-6,1.952267437869141e-48,3.8867287551834516e-60,0.001531978250335941,2.586501197686724e-71,2.879675654996114e-65,3.694017611502073e-34,2.554385503896104e-15,1.8070111442622715e-11,4.8876770945007673e-5,8.390289182048249e-18,8.975603868655923e-22,3.231764168087706e-6,3.634565474695809e-15,7.430196571337416e-11,2.2798066736976632e-64,0.017861445598109375,5.8927121837402e-24,1.5907151710147573e-29,2.2629721140973463e-41,1.7522748348854725e-12,0.5522018551226684,0.09932550678402481,1.3671751414254227e-15,5.991406020889125e-19,3.854167550931285e-11,4.1425917154110156e-5,2.7671167515774835e-52,7.032810097128396e-14,8.054396355533238e-33,0.15475437721295499,1.140902114911803e-71,1.5045941090905778e-5,7.0802651712847845e-43,0.03953273040344069,3.7235539154231186e-18,2.3363253134451352e-35,1.361667164797051e-16,0.06838601832320414,1.1257586650201016e-14,2.237914348720839e-18,5.58703068763039e-60,4.2347128658267914e-9,2.259665265935519e-5,9.715655878633703e-26,1.6548774706334246e-7,1.8259554857521105e-9,1.2396557057561466e-14,4.016398905466008e-7,3.3752638954653006e-24,6.017750428397586e-55,0.05557091813281687,0.3986694164327146,7.633543729785399e-41,1.0838148353837281e-13,3.096989545710153e-33,2.6429267964240527e-27,9.990183037076095e-75,1.6750161268617487e-40,3.269651591391951e-17,0.05510631150171478,5.9993048874990764e-46,2.6047506104117213e-19,6.17271735591408e-59,0.04095455013622146,5.99412528354128e-6,0.01793312725703943,5.5712837056804825e-6,1.0275586222139176e-23,1.3685097428348107e-19,0.5192354057354748,8.913926225584122e-21,2.2553774120592728e-8,6.912158297265155e-26,3.8616800991710045e-41,7.771304846217449e-78,0.20676748747507856,0.0009925597765781306,1.0131044854744268e-5,1.9373849620288685e-66,6.672436014311033e-49,4.344791049394605e-6,1.425204465518884e-30,1.1719152010343477e-17,1.468170730486602e-47,4.4114704468506927e-45,2.020981089912274e-23,2.734862135740932e-38,0.005386956390402527,2.774533059263162e-6,9.484812539276909e-12,0.004825609548632486,0.0003070700858259241,9.817974940167748e-15,1.8528876736772755e-48,1.4348766864655067e-27,0.1880481723755678,2.850905158828989e-17,7.575681249319361e-17,0.23228946896807098,1.086080803153369e-24,8.043976887251928e-29,0.40829474882013667,0.3418404029220019,7.15396588657409e-23,1.1362159576068443e-33,1.8868721381837429e-38,0.5075773288901475,1.845359571372476e-51,8.992180775382891e-16,1.857716203610028e-23,1.0499817502555354e-28,0.038840845080927826,5.068638779320934e-13,1.5781061073916652e-5,0.4373840501752383,1.9187075938527837e-26,2.2786324487026702e-21,4.8551914009120265e-5,7.336950706535975e-43,2.1215695981361643e-21,2.1622433657998737e-22,2.3940708122303908e-32,1.3847849128040844e-27,5.997300216229944e-7,1.473069912896716e-51,1.7795990208411006e-11,1.0046759154415044e-29,3.9401813112647796e-38,1.1994334380246898e-10,5.2186501396425906e-55,0.17705786661387557,1.4580573492882296e-56,0.5651251437948572,5.697729335233591e-47,0.3053296885008876,1.362552273501819e-64,0.5405607345246055,1.9388465210203974e-65,2.1262317472287113e-6,1.1585819841124594e-29,1.0310487446251279e-60,0.2800300527897057,5.1598307654709004e-49,2.100415309265337e-40,1.4376520963953202e-77,2.5108595016615796e-69,1.201182282013914e-10,1.6954727097696725e-62,6.422344686691782e-14,0.04504201396517413,0.0034762554432167993,0.13805221437952897,5.488579382585181e-59,3.1899129841220247e-66,1.9366298878933457e-41,2.638508940342745e-12,0.0022096886491684634,0.004688402727652438,8.547253041685135e-66,0.001049923042799171,0.021418219646264267,9.633432343178496e-27,0.2939709183523603,4.944836399550132e-10,4.0332473467050123e-7,0.016512655459555357,0.3774042115179731,1.4951131195984783e-45,4.7608108070363276e-20,9.366035549431561e-40,1.8881504981662948e-73,0.07969768926063925,5.2578421550642236e-68,7.47987750741763e-10,0.020668324725891817,2.793011193904231e-49,7.444798392245488e-76,2.2074865857065282e-12,0.05461982322828126,7.42612608526137e-13,2.2212370549805786e-7,0.00026398833900389694,1.2882689835478743e-37,1.3609570849401454e-66,2.4620507236859828e-74,2.6710697760226317e-47,1.6770886865467873e-34,2.6760972752417083e-12,0.0013405795155384086,0.21260930451047083,2.2984261098914554e-66,2.7697557745155754e-5,3.4825453202203105e-6,4.007822624325883e-68,2.0336892587450663e-42,0.0002518192005932067,9.034463169155863e-37,1.7664816688721443e-10,1.6918463086897996e-6,4.9350996874889355e-50,2.7327483910799023e-7,7.697690963824271e-19,5.4303031414258184e-73,1.8481316554902017e-32,5.225205490847413e-51,0.0005811813575952936,0.49656618816096915,2.0517783491836087e-39,1.0515580198909898e-35,4.806320399141509e-5,1.7358402479518942e-56,4.916996019417284e-72,1.3052650745781803e-38,4.526759516576112e-26,4.592060907094429e-62,2.8034844833839547e-5,0.0003028649233902191,0.1528649649028332,2.0799536671700598e-80,0.012640755280380202,3.968788375310938e-14,4.411548892968335e-20,0.03746547939060241,9.999235637611577e-41,1.4609950705209852e-60,1.4527563533940623e-48,0.07711636082267985,3.683706844065887e-24,1.5265249415204522e-14,3.5358970391634846e-23,2.973096029492129e-9,0.4569724861102322,3.413646834171029e-8,1.0759615674556918e-59,0.023768117144532357,0.0002765051585436028,7.669912366124581e-41,1.1576906850326854e-58,6.796290443307839e-49,4.2179727243231995e-12,1.5653058502475937e-7,0.563625923781206,7.263921096272415e-10,2.745365695680912e-34,0.04516891269998874,1.3781169137021485e-23,1.7269544245241596e-33,0.2781678444520601,1.4898388372420139e-16,0.007845716997208308,5.598138159949234e-24,2.7199386946143564e-16,8.86355830676265e-48,4.548105451010044e-15,0.00023477661385964534,1.0831098330982387e-36,4.8326359839336345e-18,1.2335405764440758e-7,7.419316210894386e-8,2.491313110718236e-60,6.359978340824033e-25,3.5842425546836445e-32,2.629973339928929e-60,0.01896114584254255,0.003913358018158033,8.349046861867436e-51,8.850351982439713e-23,8.84689396786029e-46,4.769634152409738e-7,0.012377547863023596,2.2997507663762966e-17,1.766922067926196e-23,3.3896111811127167e-49,0.030443231492106242,7.173104338825574e-31,0.09946431360533858,2.9427352063569227e-44,1.5359351775920025e-64,2.003389330946387e-12,0.5657066285392812,1.4862227145459498e-8,1.354247732426495e-41,1.7212988497199454e-18,8.235726558073028e-50,2.148148677880462e-5,0.0004489365065861974,7.447576480738013e-66,7.281724127538217e-34,0.18029398728311152,0.26380050755042345,1.454238023690592e-44,7.649596759583922e-24,2.1348144936554076e-12,0.05244481076635178,2.172696378505564e-45,1.3566649673702772e-47,3.8127251462160766e-7,1.4175377940468316e-74,7.231111604617135e-29,8.576022943259724e-9,0.006991045255051425,5.711529175537771e-11,2.1143182036223497e-23,1.5738081240053286e-15,5.422342618036584e-43,3.306202670471122e-45,0.00017057127754683223,3.252514364539195e-11,3.738954922887896e-16,3.142735356803432e-70,0.5666832987187741,1.2453321113099634e-82,3.4123737665569723e-9,0.028094771281003142,0.0004498022411173785,0.392695736555982,0.014183944222359171,0.020575522896790845,1.1379724516427395e-47,2.3568952259582626e-8,1.0098747250975824e-63,8.216836584154831e-42,0.00013764044118838077,6.998898725525239e-6,0.011894581853076012,0.0027896177053652396,6.302835787745988e-10,3.3052643464851825e-41,1.0329222808378453e-51,2.0582323248495466e-48,0.0387190495671005,1.4179423485325224e-24,7.589711418161281e-15,0.46689249564434754,0.5094782925675367,5.021600452580073e-16,2.6134415342140326e-16,6.295181663309866e-46,2.66031509885975e-50,1.1666082137607157e-56,0.2876555988202013,1.6851661346883028e-45,5.003876314828462e-63,1.6218097797300673e-61,1.0175741447905754e-13,2.418173399863494e-61,0.33164058892203657,1.5571720426931134e-9,0.2599680841327998,6.204396393537412e-19,0.0004625018731478598,0.3457525470191686,2.7513829559503057e-9,2.808132134292858e-29,5.2156019925922294e-18,1.264053915421612e-8,1.0749628224481223e-5,3.248533486281888e-48,0.38140739911956556,7.335484713380263e-8,3.428946771060957e-9,0.003826414023775654,4.036056410237372e-9,2.203544398933317e-6,2.856452523562742e-36,4.069544163121386e-17,6.524491600831779e-11,9.013650894051337e-24,0.12036515459442626,0.5663855920321353,0.41554975088984525,0.5361751759205744,3.708540820168287e-5,0.00036548703064528655,6.049996572236902e-68,4.047846077091901e-9,1.5761888205396779e-12,0.3465635545744399,0.0006305233713372303,1.7964252123159775e-40,0.033382755174358715,6.798933704323275e-6,0.35913440755144294,2.39514439562452e-33,0.36448495815186255,7.70459706238962e-6,2.4733863834959324e-11,1.4307110294269223e-70,5.099769782547954e-31,7.607674137473058e-28,5.106315130326286e-15,0.03671816678880236,1.313233849408429e-14,1.0666246364957755e-14,1.763410804408428e-7,2.09717161356888e-23,6.8892413957954125e-9,1.5913415380819742e-5,0.4006977264872263,1.801774086938196e-43,2.5817791426721977e-50,0.25471672371200466,0.2661063635446363,6.5412260853382436e-68,8.587310910768882e-25,0.047142075155650096,0.5906441881670144,4.571280933655088e-22,3.960258211464826e-55,0.5256368506565969,1.3776285204070385e-59,7.405862209483726e-6,1.1583788475601017e-42,1.2220658001483443e-19,3.303838407951106e-49,5.490022689874723e-74,7.163691299458723e-9,4.109644274676968e-33,5.584060583519556e-54,8.583815152162984e-51,0.0015928278011513694,0.008306408380126914,6.33749430094261e-5,2.0836980611899854e-6,1.6136885685587886e-6,6.823737848106884e-70,6.092350738957722e-58,3.767882409212765e-12,1.1469739149383591e-51,8.086954904367689e-49,2.281364226885145e-41,2.804157431590828e-9,1.9550176377243652e-7,7.387310377059879e-56,0.03182542933757678,0.0023739223272290825,1.999129376465929e-13,0.0021990015350286684,0.26557441206906607,7.665144249560498e-44,1.0836644287782202e-17,0.20507542227959294,2.2519970242703654e-60,1.363470487099626e-8,4.751804154109517e-12,1.618723270315405e-8,0.06945434841843948,1.7566804560229575e-13,4.7432665622483535e-57,1.0674438027882848e-63,0.56093244162197,6.942220526199628e-66,1.184029465151365e-12,1.135301476781877e-34,3.685379612437679e-21,1.319434881306443e-53,2.7790502548668888e-5,0.5687474857567987,9.674412465965142e-40,2.223258840883152e-47,3.6190631729923e-40,4.243387799621226e-29,0.2352301793926901,4.293352755116434e-5,3.961638774186376e-21,1.1020725773755665e-57,8.126641833465425e-9,4.1815867733349907e-10,2.226816324544187e-12,2.212724424185353e-86,7.194843131175206e-6,1.8386144802466264e-46,4.1894839644215224e-51,4.3400835772385315e-27,5.553407473118588e-9,0.02013475231034249,1.3662628578781374e-38,5.618891697605906e-26,0.040966851047734204,2.3057254343075216e-32,2.942276558973033e-48,0.22953790640330285,0.11341286072034312,0.43066600509188624,1.4392422375448036e-43,6.7998870439419534e-9,0.5566100283283897,1.7662016604856958e-35,6.422929174066411e-47,0.0824395357956911,2.5518496628582035e-31,3.461425923246998e-7,3.1209822769315846e-5,2.598546837412374e-6,0.0005794855486348699,7.406503223820515e-46,8.878034076363052e-5,0.24958067504914078,1.6061945096351563e-10,1.8093370418569227e-24,2.480439648772561e-7,4.820047681658351e-79,0.37407337593335815,2.1368595937771984e-37,2.0688385801690595e-20,1.067922857024102e-73,7.550626128901304e-7,0.11850855585635198,2.4461097434436857e-8,0.5715601478277882,0.30334160074789634,3.624047776234059e-15,7.389977615679304e-80,6.403700646789439e-20,1.9970034356298755e-67,1.1813785849911927e-24,4.2912553238050503e-16,9.201940938425427e-32,1.6776180902205806e-53,5.7782016448235945e-80,3.448446411049666e-24,1.5161520914501792e-39,8.436435361429626e-65,9.376126295099634e-70,1.2644362806227218e-52,1.9456744930471102e-11,3.2071455090166063e-12,6.131008716975904e-46,0.5516423777661899,0.3326455000601986,0.07569307254304818,3.6848744820419024e-11,9.135074099705134e-74,1.541485557954589e-47,6.21120350110098e-37,2.720431700704708e-13,6.213388921868993e-8,4.891565576139483e-75,4.3457856008598126e-51,2.936589809403231e-11,9.539238806198087e-31,0.02620620748227631,8.571332563473975e-32,0.45548606041292306,6.601810306292921e-13,7.022645199654854e-6,2.230964376039224e-54,5.745030960077158e-17,3.4771370754823786e-61,2.0457093579704208e-17,3.5194593489086397e-35,0.4635501874014086,7.59522155305691e-36,6.874643418660672e-50,1.1455010599323961e-62,1.0242492669384416e-20,1.2626567589620554e-70,6.432289807380589e-20,8.333534378794823e-34,3.758265160538395e-19,4.1689375312139635e-53,0.3395798542587638,4.2595800457682814e-70,1.1925754591035848e-62,2.974320827837586e-24,4.360717473273759e-63,8.352795124548947e-9,8.379951062713311e-31,1.062680686203013e-35,0.00010733550567612848,1.3581233750512572e-34,2.130056789802567e-19,0.11554713031447625,6.9978244564926014e-46,0.11578472470002264,7.530941025240276e-5,3.805864432233591e-50,0.07304783502529615,2.2400496850105898e-30,4.052737840665597e-25,1.610840682966195e-63,0.46521640413194326,3.847844289860363e-26,9.930503805728098e-50,1.1562426428870984e-13,3.218249354831157e-48,7.648641709675806e-14,1.966467820997063e-43,5.396317855309163e-69,0.0019195666253533313,0.42642401763402676,9.309882044795571e-14,5.540635235311025e-30,7.154421566578807e-24,0.02383209801846929,0.10194036238482085,1.4575440603495842e-10,3.2268626564684675e-13,7.607755126040303e-71,0.39023441744612264,9.01141902265354e-34,8.150279761803337e-31,9.609806000629237e-56,5.360762676489824e-24,1.5298536099588846e-43,8.561906335646768e-7,2.7784206094030817e-9,6.305381017747274e-36,2.634469833816716e-52,7.313232844629921e-23,0.008819368734061105,6.736616170057363e-48,2.1384545162974193e-29,1.5609773299967937e-53,0.0002598342895003648,0.17698254136611496,0.011520184694191662,9.657097715239716e-36,0.0009904223129962421,0.2535270417978751,6.959542690633464e-40,8.122273700495796e-26,0.07798084616539651,5.176403637328273e-60,0.006645429660073922,0.00016424550738112768,3.191174860123026e-43,1.055336332627352e-15,0.01184091033383575,6.58780413191015e-6,1.5753247994123796e-12,4.5403404395273654e-29,1.3911495675072251e-42,1.2032470127402899e-24,1.3274275923402e-51,1.857067145572352e-12,0.5179454238328774,7.239823081872537e-79,0.0162114471971141,0.5079535154340066,9.561301721750012e-9,2.944774898308543e-66,4.3414784301526975e-54,1.942027828691447e-9,0.22661513661818677,0.006410151730061863,1.0333163581996578e-11,3.822111947475148e-13,5.4645304825949e-13,6.8940238628605025e-56,9.582110584582553e-19,5.2243636351746525e-62,1.880851900267486e-75,5.191668213820681e-67,4.466874174141178e-59,0.0020993513425075798,3.5430720199342347e-69,1.1716561537157196e-42,6.393078056206623e-23,5.74804038096132e-29,0.5661099203395774,8.641175119360335e-6,1.301709562013741e-24,8.560578060359425e-61,1.6242205116028862e-5,0.0001261120277905909,1.2931082909115456e-8,0.031057678558567604,0.031751091837005106,0.5142213019614247,3.6758085718782765e-24,1.9831223252178297e-5,3.327413640187844e-52,3.3103384585811854e-22,1.148034006987482e-66,0.4426306588104054,9.289576916024222e-76,1.0040631220234351e-36,4.314366680859786e-20,7.342194279411728e-40,5.6774461933074095e-33,6.169842150263441e-44,0.5541947199210112,1.964033301279745e-51,0.07431707362161448,0.00017325263711141027,0.023231013947141707,0.003622434078328267,4.033435705746095e-58,2.0449186012831196e-7,3.8486674201900777e-19,1.1445941805036654e-7,2.4081834568551306e-5,1.5251776632878888e-16,5.097723062041637e-33,0.00031433126810516296,3.2933881236638265e-40,9.876441352693482e-19,0.038810853695159034,0.03868885327579322,1.183630634690729e-16,1.1798387716155118e-68,1.8564324099996258e-37,1.8216523851173946e-15,5.931802362678457e-43,9.682387547816304e-6,4.069586740102581e-18,4.044979534785691e-35,2.5611740135316587e-6,1.0678745274322602e-7,1.0693701774006462e-59,2.569965602782344e-32,6.641611447063707e-11,2.3197833803065823e-11,1.1801028332084196e-27,6.412695323671678e-27,4.933644891214763e-17,3.26525755535223e-50,0.32506524398198683,0.012545662774622901,3.7775294317586796e-71,8.244539762096813e-14,1.762571544264363e-43,5.5997829589676244e-55,0.04492083403503423,5.335358586034266e-14,1.522341995234552e-13,7.733813837398435e-40,0.008118597370582695,5.1022633648401614e-14,2.3852384672329464e-9,1.0179175965279344e-73,6.934799631430514e-64,4.502399165901343e-28,0.4152667022101251,4.052576544193599e-34,3.523217321298509e-11,7.149107762236812e-36,0.21280897781076866,0.16006525767515156,2.007543268700633e-29,8.358202797539483e-7,4.827814219893571e-6,3.2248253980107803e-13,1.469553295983578e-7,0.24123092904228363,2.3385427027238404e-52,1.3762720655617978e-7,0.15744255456737266,1.350407903167791e-13,6.852556009703168e-10,9.306703142420192e-8,0.011823244558295667,2.541577640169193e-30,0.14486723706548005,7.981263342374125e-48,1.2681555692337985e-59,1.4252747958002488e-22,2.5279478525265795e-15,5.481488035515311e-7,6.560788760430336e-8,0.5643823584804608,0.04280728727941238,5.694221400162083e-42,9.816131638082369e-8,4.0970471301682883e-29,0.07171594749431609,0.7528833614356792,1.7818857538185917e-17,0.007672898131889416,1.7303532611784327e-44,9.233732207556963e-55,0.0010859353261464986,5.281176726296336e-19,0.4935994673328424,0.07828751213279155,6.231670713306066e-58,5.646533023551241e-20,4.373906080639013e-25,1.1889714919562343e-6,4.1238238010141836e-67,1.2165997756435897e-20,7.339959055087939e-70,3.531799177373347e-67,0.11699267873838254,3.507200773331015e-57,0.00331005683294942,0.0026594571074753373,5.544738017792636e-5,1.6566682715380693e-18,3.8670850919326646e-25,0.7403095463404158,1.2077816905429613e-10,0.5056828505010948,3.063282309884726e-40,2.6535268212501057e-52,1.1048617583694215e-68,1.518397750974738e-33,8.272654571088007e-31,8.881865956190446e-16,0.22055819012267383,5.273841380278635e-25,0.5632773510157651,5.0442894229821505e-29,8.283808449813416e-41,1.3417323329470096e-13,7.99030333885111e-76,0.22222744302827224,2.4502014322106462e-51,1.8893567256075105e-24,6.695066308663059e-43,1.1908126720017089e-48,4.937886094312634e-6,1.1827559767594123e-63,2.6416188585105074e-38,0.001953646645618533,0.0005104369584349318,1.2355855039574482e-9,0.0015904887410189458,4.092825029725515e-8,8.160155326752554e-22,7.100330645753763e-13,1.5496127580141675e-63,6.032410078801708e-31,9.148695832477715e-11,2.035014728997457e-30,0.0004905587385540685,2.0068767392783497e-39,3.3096393726072034e-8,1.8204659118770328e-11,7.065998941829613e-28,1.0703848913307204e-17,1.4954933010343234e-24,0.18741670692505183,1.419976912740165e-6,1.4960421633975217e-12,4.90811120641265e-6,0.4608003875391933,2.8201320078149163e-64,2.2623106454252317e-15,0.0033973939958539543,9.246065368705471e-18,1.0652530066805188e-39,0.001241331926884877,0.00023599397891400147,1.7676264277149166e-27,5.321325113239936e-52,1.2719590760918707e-85,1.6620958583957596e-40,2.5741551034832593e-41,5.3861175919277065e-50,3.138867223556517e-56,2.8257819545930076e-12,8.290314560759816e-13,3.7837646088952453e-63,6.288096917113999e-8,8.481050820480326e-49,0.15083931295166397,5.673297391322512e-25,1.44335042337761e-6,2.6872169677956792e-21,2.848180042068539e-49,0.02779331753966926,2.006959963221604e-11,0.008221638759071318,0.4559103118057928,1.0751882580258373e-30,9.413572079740037e-31,5.796334421348918e-62,5.08457158080259e-6,1.3360569052860424e-13,9.34664684914246e-79,3.029746820194324e-47,0.3781601535186801,0.0758176685684848,6.322331143152968e-21,5.8511724584737896e-15,0.19322558840772205,6.894365611994343e-44,1.0322369823570934e-15,0.00021440110851714213,2.050871536695011e-46,5.067951575872906e-73,0.5646453799269532,8.216204955259642e-13,7.897165893800393e-36,0.3459369596803257,1.7316539781824798e-50,0.03798894636142901,0.5465252592296285,2.2406456997857112e-66,1.07993748048627e-44,1.0901664054717455e-67,8.156383964245971e-17,0.0891799665497268,5.37731855396215e-77,1.532196120588866e-13,0.5379148810507315,2.992612711215579e-12,0.5547332230719704,0.5344907438438422,4.32247584114773e-83,1.2804065942293908e-12,1.481139848764168e-50,2.1374110093388214e-9,1.866063966861338e-9,2.3597852437740585e-27,0.4072524095488846,0.41840996753603876,6.834474664742807e-42,3.5720865196965626e-71,1.0579519778607422e-43,2.023117498136587e-15,0.0004565054300746534,6.137026452668473e-27,2.1529174310190027e-7,1.4989660564047222e-41,5.832859851965926e-48,0.1608477085495219,2.3151749976728513e-19,8.250454225279102e-67,3.53912351158598e-56,0.0003510633164351088,1.0427728112238094e-38,1.2532508283353504e-39,2.5462858306516616e-17,3.912499793850951e-41,3.9198306297745614e-20,2.2943173917471893e-41,0.13181930317543256,7.309656593757098e-52,0.02839813030973126,3.795071077158109e-9,1.3885000938678107e-11,5.968181917260578e-59,0.023509085174123156,4.226612976312644e-18,1.853310106138872e-48,4.297388084239728e-19,3.382885022302669e-5,0.5672829233029364,6.900288282412524e-50,0.0298076693416788,0.45464744077540514,5.319758763616895e-8,4.303832393317124e-73,1.3754039311443003e-67,1.5597344946478155e-17,2.8784085189909337e-60,0.003683511459751138,3.505362408195839e-5,6.325046037163679e-11,4.862389820468751e-11,1.7222061929432535e-69,9.629332933086772e-32,2.137629318655901e-8,3.5823859308624573e-12,3.737953900266248e-9,6.0941437878212255e-15,0.0037931414029708206,6.141884331784736e-41,2.1352494510621345e-32,2.024296139139618e-49,0.007475650192336638,4.1451638155687443e-57,1.1327588041287536e-24,4.7187574614670006e-58,4.137307823121978e-81,7.4755663824376e-12,0.07077155535043937,3.145902947514243e-22,1.0757249140980623e-14,1.8392373301564497e-6,1.1955476748803997e-59,4.0351391918497686e-76,1.3455763600577198e-20,0.005554549226207295,1.1139644984265665e-15,1.155941885740695e-17,3.409524573905674e-17,4.06336223508251e-70,0.31466353169159017,9.802112628375062e-72,4.3277952270544807e-16,3.2799601766704477e-34,7.403456718144519e-55,0.5008968547577091,2.370558313410482e-6,2.2353654163395657e-7,2.3973945899693398e-8,2.7126090514559246e-9,2.6446560389911295e-66,4.072772311722008e-13,5.98647677694264e-15,1.2843886116920153e-22,0.02987508890625276,1.0387256613255852e-75,2.173008925418256e-66,2.4551002478851164e-54,0.450374391782121,4.5014984130113855e-33,3.3822924822206365e-44,2.9110176060206232e-78,0.0050782916044479045,1.5251976114765945e-70,0.031510099947987244,1.9089070380476875e-27,4.581293011195522e-6,1.1035440652334102e-13,0.22984625000596345,0.00025922400475132505,1.8510138922535414e-7,7.586249856373455e-14,0.0069335993098185115,0.01536868317248824,0.0003969436720454414,1.1489154881073852e-10,8.043490227828812e-27,1.7961136763370909e-69,3.292515290675221e-61,5.440481861657507e-14,0.1927956938874248,5.936796534501917e-47,2.7357542330737807e-18,0.1706682807483167,4.086803520362754e-42,6.288889210339023e-27,2.570167556294694e-81,1.4401519931807963e-52,2.098145722074129e-11,1.5847206125732934e-37,5.390892278214261e-19,3.2437175670219573e-11,1.1013536922834905e-59,0.037734296563182085,0.015629572191737724,7.903076393230857e-40,2.68931978086672e-54,3.9609325685764733e-7,3.4484986845667264e-56,4.4953649850716565e-8,1.1195421730567241e-37,1.0202481522756246e-29,8.573894267470151e-15,1.3929856530757831e-18,3.859380189024911e-8,6.659300249975627e-8,2.0104420176356084e-29,1.8342466305992353e-5,2.8273228164417197e-12,0.0016946991211488358,0.06364468679671144,6.729003198584614e-36,6.335398237874035e-6,8.407328668218358e-73,0.00044726836479790094,1.631201881410365e-5,8.208113106526584e-10,7.554238826012092e-16,3.71022414298344e-8,4.31121014916242e-31,1.0297374073851621e-16,0.0038858793050267093,2.1923395580248492e-23,7.21754267564352e-54,2.6713707561471852e-14,1.931579302926874e-43,9.496964034639929e-54,2.585144810564316e-58,0.3890682440479106,2.424110643637853e-31,1.036126194027244e-26,1.3081729142530197e-21,1.2736370649876237e-38,7.611781168362767e-68,0.24759413450203765,0.017040911823131326,1.8825638844849356e-5,7.907080400707924e-24,0.2185687941726611,4.0436172930816945e-22,6.969414153685491e-28,8.56914329253594e-26,2.760205666410356e-44,9.665200872508661e-9,0.45587708347989636,6.998868043864593e-57,3.973118703859535e-11,0.44577370345405015,2.781392117221263e-21,0.006454950686783601,5.392103929184582e-72,3.77288464900099e-57,0.5437156496118787,2.7471754611397428e-45,3.158843939270722e-48,2.661277434578656e-7,5.153015407389143e-47,2.9367021201994073e-36,0.3442361752429399,1.798235993686637e-16,1.1329341210827554e-41,7.279813777440745e-8,1.2485077170316404e-28,0.3566885091479721,3.0263257929135392e-49,3.876956966204449e-11,1.5741086599175842e-60,1.4270802108699602e-76,5.372623604432688e-57,8.813357893374569e-9,1.6686955228170454e-8,6.375046271516793e-22,3.634193790030743e-29,0.18457490713169913,6.477448645100469e-29,0.061729202573572284,4.873583053570003e-29,2.5463230111142996e-16,7.279979589560757e-39,4.4603446359617193e-10,0.014747169130173593,4.550104781008069e-41,2.5509207175317846e-29,1.3503064531416283e-22,0.4864619526809709,0.00012062609921914332,5.181413441447426e-25,9.054561422448223e-11,0.003748189887883513,4.823046080744968e-61,1.9840881323545257e-59,6.445354601030026e-11,0.017319314900419613,0.12746002374226104,1.719793719799512e-70,5.111645347511062e-8,1.1234284695562419e-7,0.0001687596764412866,0.036515504565206684,2.238693162246536e-33,0.4968099710674477,0.0016027018354938865,1.3140416246991722e-86,0.13045424283764195,9.208806217444891e-7,5.109291716027865e-7,7.004151949054524e-64,2.1188787645875188e-33,9.111835102777791e-77,0.20577667555790038,3.283826762614963e-45,0.344524306083663,9.925523795204908e-38,1.4683299071325626e-66,5.783487763333772e-12,3.160554010881507e-72,0.001235058140018754,0.005245451682005863,1.72407475167221e-6,1.6381564393883992e-40,1.594181021658712e-61,5.586420682157722e-8,1.674277866529676e-7,4.586201114341821e-40,1.0072730844421879e-40,4.9275417084787556e-48,0.018923474203053944,4.029375247501951e-6,7.0792480327668625e-37,0.0522488892524606,6.01919879484767e-17,1.2250412916704417e-11,1.0807472550580764e-12,2.9111235473358095e-41,5.491715166790517e-80,0.08922095113839697,0.5156161556822224,1.7214811266915865e-50,2.2024401605205755e-28,0.0001346288071546609,8.613245525636438e-33,1.0907377887253015e-56,9.37723694338974e-32,4.762541266171043e-46,7.0320444415925415e-37,3.5441922173398176e-19,6.4564187300140445e-59,0.13325061568298835,7.480714350205656e-21,3.9031307773574396e-25,0.08702956549134715,0.22628265631824052,2.380460416291592e-55,1.678382680019302e-24,6.338194467699499e-38,0.3920787044802184,0.42170413550002517,4.368663219084215e-12,1.2004818171381314e-21,1.2301045552140953e-15,1.3206846339338962e-18,1.838885574969596e-9,1.2790340661224321e-24,0.00741669962206668,9.471148972770508e-71,6.912948208798034e-14,0.0005422965869301659,4.797460299019145e-7,0.20652800186443226,5.765430536512038e-63,4.35767497100659e-5,1.9563719511751923e-10,8.413267118515412e-41,0.0002978444378502117,0.0038561894847178252,2.8064600098961707e-35,2.206922672081065e-33,2.8834597659394745e-73,3.8697739413787865e-33,1.337732534486592e-28,0.3361003081442394,2.861543690042743e-43,3.3306736244839906e-13,0.15163804700226355,5.222564083187598e-7,1.9722381842799092e-34,2.0756410208647965e-12,7.552733961746035e-37,0.5394852645132583,2.8050477473246633e-74,0.01676494431296942,4.0555896649876294e-23,0.5572713544647794,7.710574255118835e-30,8.472655901127301e-30,4.395988580820669e-14,0.008559620785673589,4.808466652979063e-47,6.90495129359819e-58,6.671618129298471e-18,4.67579235334631e-62,0.0004602216155346869,1.440392833791425e-6,0.47000391000974734,0.04806039316548943,7.913189142983368e-37,1.077066253772034e-39,3.0503742270409994e-23,1.3093309923455039e-37,5.213621584015442e-9,5.474759174258618e-13,3.1636634976052347e-57,0.07458413407099372,1.1688782073933415e-25,0.166711255305877,4.038269892919771e-44,0.000499968259641775,2.797265247779781e-14,3.672792633481856e-7,2.0632477975116506e-74,7.577699227557976e-54,3.0267331594365844e-5,5.734900990942738e-9,4.603856801424222e-14,1.167403333748605e-25,9.500353695058719e-11,9.699593548430483e-36,1.4047992409977584e-60,0.20118025451633054,1.784790389377988e-57,0.0064824080455274345,3.898110791433775e-7,2.486555897792226e-62,9.906957984212148e-24,8.962895041918266e-60,2.1179124648891653e-69,0.5664939730127074,1.1759814573408357e-33,4.5899108257467586e-69,1.2308767911459029e-29,6.345047602661396e-48,0.0004692261360335563,5.608783899119124e-6,0.07840318062247804,1.8596590054526094e-12,1.4196429011307554e-19,6.2812071553716656e-18,8.297005639091175e-10,3.98983304370996e-74,5.365883913047237e-10,0.00048157109832004603,0.004266979879404243,6.543149336255214e-5,9.427335323965156e-48,8.827006660084396e-31,2.987745688350512e-38,4.361931554477576e-71,2.476439719910655e-59,0.17579652387272052,0.05846238833537589,1.6614216205409593e-25,1.2925908960248488e-74,1.4344840446883784e-55,5.2405413741496635e-9,4.132083905867159e-27,0.35943905077503896,1.744545192758542e-30,1.3469392982593113e-19,0.5794277103877385,1.0375403814485818e-13,7.91354012881795e-57,0.13492551854148482,2.653678822064414e-27,0.0019486982487908477,1.3195278037734314e-12,5.903052791710935e-12,0.0024970475746391553,4.677778507096204e-18,2.9864928380772823e-56,3.8071219580206163e-16,0.4478653389600375,0.5204624923880671,3.317262149264901e-61,0.5654429688132123,4.379367727306858e-16,6.832782419220305e-6,5.569603549420801e-9,1.5195815916938868e-44,9.429023600523709e-5,0.002294450800617137,3.6880810983975524e-11,6.222799225023402e-10,1.0098943873718302e-30,0.00024408343359732918,2.753623594399688e-22,4.780959764301196e-9,0.23946879597171145,9.759876539797329e-32,4.6396449958873815e-57,3.830415641571927e-17,3.7192861624810933e-26,0.0459836615623768,4.095732867423096e-35,0.0015605337468660714,5.4536911157133675e-48,8.854189286213494e-23,1.1845998195958663e-35,3.755708699726943e-11,3.2554047725172773e-21,6.100154168649258e-47,3.0533255337729714e-31,1.2819429005365673e-13,7.749128923718018e-45,4.990523467636834e-12,4.430546700397859e-33,1.6445440010100593e-46,2.534350012347042e-73,1.345798218492416e-10,0.2711139968334307,4.420358443268272e-57,2.0406934751947494e-8,3.973035000759039e-36,0.011032212789956645,3.839671795766117e-11,4.581211326658018e-61,0.002026613518099079,5.540997471491634e-11,0.16020757961138526,0.15645195168633072,2.059514159953357e-67,4.653617449917142e-25,1.235369492526092e-17,7.734958686049231e-7,0.35825564178728675,0.00012554697907649038,8.548210814621583e-37,1.2669415040441328e-32,4.637365457519206e-20,1.1382808620810431e-32,5.041231283664692e-28,5.01143046423879e-46,0.26688251079393965,7.145130818756525e-58,1.0780286138943622e-26,1.0917865646824414e-18,1.2176149509327856e-51,1.2116687477315372e-38,1.3285741019453013e-51,3.1498966580380516e-16,0.031662370614688594,8.787588754911503e-18,3.75329387691757e-14,7.710714121062757e-20,0.20267958282075094,1.7469816870187044e-19,0.0002957796983029474,3.0931592295424596e-12,0.36444706746444633,2.5242478295239006e-37,4.853761779079928e-67,4.1918980719247777e-10,0.020876057456847744,0.5066857115679934,2.6182847289481782e-62,2.592223493959909e-7,3.168284172914151e-41,4.2586641152323356e-11,1.0898228062491092e-50,0.5163164077894913,2.915595492562457e-8,2.244888904322719e-50,8.831330186463825e-20,0.03501789067388418,0.10373457324292681,4.410474563212826e-31,7.041475713611148e-43,4.510269828736096e-18,1.5441043398843678e-29,1.3029678202168001e-13,1.5839333181360435e-54,0.16703608869942208,9.23874414115512e-12,4.315640092612626e-32,2.1445427548025966e-30,0.002302932194786845,1.2147811417872208e-37,5.671241459699046e-6,3.1556792354656107e-26,3.490204281223462e-11,8.93009214541411e-30,0.001307419132331074,4.1980886163870737e-81,0.006923375585310888,1.9112838596574503e-6,2.413204305083578e-30,5.003078949913047e-34,2.7592406545209932e-43,2.4538743375435977e-6,0.00010273811850965952,2.3355445708459175e-68,1.2102114889741073e-12,2.3931428856938644e-6,8.111792098972248e-35,0.005114716288329944,0.52941160922797,0.6035387467451581,3.1517250946848206e-48,9.295921047577695e-70,5.816453692927029e-61,0.01986188195815448,1.124095313163259e-9,9.041623852818031e-66,8.808398889519188e-23,0.0035750297920530594,7.085839029024524e-19,0.11509922501300784,4.676084452803096e-10,0.4363549400307365,2.112710734458436e-62,5.5017912132121144e-30,5.410067559162463e-54,9.386106674914284e-27,0.0744939465982045,0.5160097554849108,9.495482710634255e-17,0.009925215574798302,1.8816189142005942e-5,5.0987745324737177e-17,9.40861745999112e-28,8.047949998333062e-75,0.43989781191501026,0.018234890290782235,2.828045950683437e-6,0.027274163285988026,0.35391128231293684,5.593794497989422e-17,6.206076807307965e-60,4.493228843227806e-40,2.5194198691190003e-34,0.4690350393984534,0.016473133155711223,5.677952814844466e-53,7.741846452739623e-53,4.5815445511821046e-17,9.36062381427632e-8,0.0001443501468307091,7.301982525334068e-57,0.47384700362777815,0.4563197492258201,2.5607084573333748e-20,0.08866387484734282,2.32340662575485e-28,0.008579335567267431,0.1862086740068764,3.1834273695746108e-31,1.790420434663609e-68,0.0525419633010462,8.959529523399432e-10,1.8121804837130332e-14,1.846645352353847e-41,2.1982388322035792e-52,1.9867518213789654e-15,1.553348502933626e-7,4.720876427669386e-8,1.614410987579614e-26,0.5282662297231522,2.1339811110689216e-30,3.7263026999180083e-28,2.2913920054166655e-23,0.0003797238421029411,1.171085386695732e-48,8.939429146276063e-5,5.5093625835552915e-6,0.26958583110552164,2.1544028651502644e-27,3.004139211925579e-18,0.00834770695962778,2.3000720313860854e-41,1.1957434519985865e-55,1.6381285048387517e-24,1.3376180591430267e-30,0.24225016942813518,1.7849549517055863e-76,0.5423558423014037,4.560111200826141e-25,0.13536591707180037,7.22360769324033e-20,3.1337087509933742e-31,2.3144053293615766e-49,6.689813158477627e-60,3.6195437432573497e-34,0.38521032241328546,6.0804292408494366e-5,1.6644904908698317e-64,0.052077218096869854,0.5593162748798447,4.099939125148182e-53,0.533601898660612,2.9928015605336046e-17,2.5971091114917076e-40,3.454898861955489e-49,8.841262321984014e-75,0.5279783720443456,2.617126494224246e-25,1.1433211951776904e-34,4.325996886769964e-38,1.1611779225272713e-62,4.4337329219658504e-35,3.10930858632803e-29,2.8861676414636586e-56,2.623585625000438e-40,2.061309309799876e-10,0.000988457912299739,6.783426320099881e-25,1.0649971268313712e-6,1.4405299162232598e-12,1.113944084380218e-11,1.2846790995897126e-36,3.9878992648809214e-58,1.7078350650448646e-13,0.058581439565305815,1.3740710676336834e-12,3.911290497943718e-61,4.95888953752449e-30,1.1739557593365226e-34,2.011385177597801e-74,1.0538515152765764e-60,7.501039535659704e-55,1.071448983111016e-64,6.5638093402433034e-15,0.05431640500385727,1.5664395110015443e-18,2.3171943475914957e-19,0.00041735825742225164,0.1582610813518009,4.580963557495458e-19,6.5682457976889496e-6,1.4410621612569498e-47,9.804370756683483e-7,0.0062430204675768715,0.3431170118028477,4.44717017528449e-66,1.5989996187422676e-39,0.0005463425253212663,4.423841701958696e-5,0.28248463461270684,2.453510689139558e-46,4.3432182648700365e-67,7.598349363892634e-12,1.2723553640175607e-17,2.971453097118883e-74,7.962028524874554e-38,1.4152793861845728e-51,1.53781256943991e-49,1.4033601385477154e-69,3.365110538018406e-57,2.7030276184718166e-58,5.575741391246148e-75,9.29920642315465e-8,0.005680620689788909,2.271300203168403e-73,1.7267351361615238e-26,0.5755479800533327,7.450883152621899e-5,7.432130359232507e-68,3.2384361195158806e-51,5.17556853122643e-6,5.916907799480349e-41,3.965887708856749e-5,4.097860231302057e-44,0.004701899724426962,0.13340687639230212,0.23983459367182247,4.6684812778918e-9,0.21706185804748174,6.712352587289725e-72,2.0130375446624213e-55,4.09547142464658e-70,8.993351813939884e-76,0.38870855687166744,0.4677013088837937,3.269313211795816e-13,0.3893042785855818,3.137112376574289e-50,0.03495275017354707,3.538249770927813e-73,5.136516092687407e-14,2.0416523428135816e-69,1.5370625486417228e-34,2.0638474307801614e-32,0.17526369936446773,1.6552639194489013e-35,2.103207823688539e-10,1.2284258546538338e-25,6.243837264973482e-63,9.438965746953043e-14,0.5358543622441642,0.00011986296618120533,0.5713940663819514,1.6215068688592065e-14,1.0224629108667441e-52,1.3751147633942797e-6,0.005843739220488675,3.912860348904776e-84,3.10397534684225e-67,6.23364091556443e-42,2.528200995336224e-6,1.8667065981451267e-49,0.013001072331929164,1.1012451247351718e-74,1.3289779341482397e-68,4.8150110585971216e-26,6.916957757471898e-69,0.3462682004948655,4.200548583645655e-19,4.138182865849652e-48,6.131311561003529e-15,1.2431361144369904e-27,7.484813525139001e-26,2.1366402900548826e-18,0.08426194075361691,9.451296929793506e-18,8.873620877624215e-10,3.489051587869186e-38,0.00010950660449285726,1.93231354144502e-9,3.457765826733415e-55,4.507763372500949e-42,2.4338017298325032e-8,1.0547598485703045e-41,1.373476124196625e-22,1.726627683431174e-81,1.697909772722719e-7,2.1414653947209054e-8,0.5654792346599833,2.93692311469573e-39,4.4489460923535607e-51,7.586933571591498e-61,1.7959185894534104e-11,1.4107804206095732e-5,7.312393616695091e-28,3.05855714303468e-17,1.1879195782958448e-39,4.3332266246225465e-12,1.016057875784979e-14,6.879950637406998e-19,5.307354739661851e-24,1.7329827940289132e-20,3.7389874702580445e-25,0.017438727671216306,3.104741838147338e-62,0.5397945236103209,7.21336768195005e-70,5.099318822396466e-62,8.667195448862249e-74,8.030078465567056e-39,8.188670490108048e-7,0.15735314679022197,2.5930260112739856e-26,5.341610511006678e-17,0.38024127344602576,3.492281495975981e-71,0.0010820828090792511,0.0006133698373850208,5.942762051633976e-15,1.1344017949169886e-69,0.6021112022930948,0.23354254131957622,2.2007685566211804e-18,0.026919290388905615,1.09613420647915e-22,1.2086164012945102e-16,4.5750250426492165e-11,0.07923836997770135,3.3192330311989583e-6,0.019695954955361535,6.896840503255182e-60,5.814229439182261e-38,1.2908913005274059e-9,1.0286045725062273e-44,5.169266704754549e-45,0.001792712807397024,4.1833009058892744e-32,4.596662497288879e-79,8.806339571328604e-26,2.8254645187533943e-16,7.0223419305226074e-31,0.16177650570431812,2.4350917884094553e-45,0.197114533884276,0.04353561369028372,4.2051714233559686e-24,0.05047930173648153,6.427774902909317e-33,5.936239433201861e-51,9.84125028369173e-21,5.984016693722985e-5,0.0008897005713367104,2.398941314953468e-14,0.0038980644147870776,7.89828411375237e-26,2.3057632495170468e-62,8.533443575797973e-17,2.2891318456690696e-27,0.01882257807508016,1.2906363876862202e-68,0.3439650170126335,0.7333360023973442,1.063884037034746e-29,3.059005146138575e-70,1.7922371350292846e-33,1.3140249757084446e-77,2.158949856582953e-19,4.9299972851791225e-56,2.7443241381102573e-87,8.418100920240027e-14,0.2541405870874381,1.2883338626696052e-56,3.0734497004819194e-15,2.1232231705571856e-10,3.232412902868351e-13,2.866508127811894e-5,1.3819562821704602e-10,1.3795023728594749e-27,5.10812137333527e-59,0.5525879108567726,0.0004614020902345363,5.463970205733675e-43,5.516843928297615e-20,0.009583929751334819,5.672414551274287e-26,1.276111786077386e-47,9.964026647427636e-26,4.9866688938605266e-57,0.41266799929982306,0.012557362576176127,1.3306378863752852e-57,1.3481656061292253e-34,0.8516160496051889,8.616263214272909e-50,4.5497125987243105e-18,0.14850946290675826,0.004083640636561182,6.362258118588262e-5,4.005805321030898e-36,2.435877769021109e-10,0.37871131807569525,7.270081882842533e-60,0.46592591477942163,6.295541217874893e-35,3.7709821799442835e-8,8.752834721940258e-5,1.9127576811511475e-58,0.06481843461271386,9.893271422028097e-59,3.8461605639441585e-19,5.8846146615332636e-21,0.0005990455063582925,0.002104249524484401,0.0522644796471364,2.2276627214985392e-13,0.4410133716041522,0.00010829593834414066,7.775404593111777e-67,0.39768251176111524,0.2825843019137806,2.408086256600201e-5,1.5652090808547884e-6,5.935895608150558e-19,2.4409585948843374e-69,8.468223334815644e-16,1.806928045233077e-70,4.327338933214187e-13,0.016042666351323585,0.43609274133228854,6.449709372816237e-68,1.1286841515590802e-42,0.15438743757018666,1.213326894596931e-64,0.4983098348386783,6.4028080068705215e-6,1.3876993727703887e-70,4.469184303238287e-21,6.058109374033338e-29,3.074174699214484e-71,1.0955923223803905e-10,1.5480470763620353e-62,2.5443902644304143e-15,2.430824433095138e-15,0.11757006616445499,0.0027812899293132125,2.5421951029338046e-14,1.3113873878973452e-20,0.04502456153106598,0.1149385035510922,0.20499649759145588,1.2425545190529103e-23,0.00038953714316235753,3.133545373386587e-19,3.999762401252347e-8,1.3146574777352326e-64,0.0008924092861905672,2.3277835363265037e-86,3.731464903015115e-68,5.293842379301328e-11,1.503318091253188e-45,1.9002762082589158e-36,4.7018344687617173e-7,8.62896581510484e-26,1.2813157931509597e-7,0.5468655947353642,0.0016790639004680722,3.33158434341548e-48,2.4338531956412213e-13,2.911003316518368e-52,0.14573100515677312,1.775909043228299e-6,5.888678531873773e-53,1.4808599031750208e-21,2.408965068937569e-7,2.686853974508143e-49,3.9919995713565976e-5,7.643963110822288e-44,1.0649205456208997e-18,1.5828388181427065e-27,3.948077251296378e-5,0.013182465134112961,1.7916642112016622e-61,8.630053954901345e-56,3.918420236076051e-58,9.32635931139232e-9,0.3493017888305069,0.006377252210233021,0.5058889234487992,0.12756723041847706,6.42338066006804e-5,0.07438298944431575,2.39867871455848e-55,8.100835207154773e-48,3.672180288735573e-7,3.6834272189660065e-8,0.0014943630697973752,1.3282167708564865e-8,0.0009025537307528087,0.15404829520957297,7.5903707566904e-6,3.0720023860211045e-38,3.1148920665141966e-39,0.3173772592519051,1.4587184532870633e-8,9.2337272347158e-65,7.38923913297185e-14,8.423688943317645e-73,8.693464788269193e-19,2.271940798057278e-8,0.0004959530676128657,2.5333294192895763e-18,1.643207369850401e-60,3.2198133613946787e-18,0.001311604553103888,4.9123040270573454e-24,0.05577724738967019,4.92946534370353e-9,0.5228293309483618,5.304500408165043e-46,0.14783067273818506,9.062193061084013e-31,5.2441990828424475e-6,5.0766339314814346e-5,2.431338376264531e-31,7.650124652959714e-33,2.8912201564951762e-5,3.6076779832009876e-67,0.30106861415195596,1.3950328619475218e-8,5.777948031932044e-62,8.498983597073232e-83,5.6940528450377485e-36,3.7895258444972746e-11,1.8853052682797568e-55,0.1673407399704452,2.911639703738379e-17,0.011300650941581841,4.244900373097272e-29,1.2157705598906724e-59,5.938027651941904e-38,1.1389212889193292e-18,1.9158909482449415e-29,0.42394900709493444,1.0239903595878113e-70,4.0335625055531984e-54,1.6836092501429975e-47,1.7816231506819725e-29,0.39840824911409933,3.5293092692184173e-7,0.10734401579854534,1.056390002772056e-60,1.5057442755884224e-6,6.493514219461862e-13,7.218682896691893e-12,7.355005781801669e-26,1.702733536078543e-14,0.005068171866189767,0.5683751576107949,1.002618464668131e-36,3.02988740581892e-10,0.06956326861840553,3.982748847769665e-68,1.2140581790859033e-6,0.019936948983226774,0.0005336525778381123,0.3953502779878531,3.082019541008491e-77,0.00033304588171920293,6.141776556652595e-14,1.70286209237486e-67,2.0939731233280216e-31,3.26877185378944e-48,3.4966951465323514e-28,3.3195569998173417e-77,1.8365586944579527e-53,5.008463023586705e-82,7.013796122638322e-11,5.435776223402782e-27,0.1077728770993287,5.932225596412672e-61,2.848015382319265e-15,0.03023425518365657,1.6633310016449177e-66,2.544321705854409e-16,2.4323754894372407e-68,3.999669055383253e-62,0.534519700044291,2.7715203746434315e-39,5.897371089105379e-55,1.3083505785594232,3.818771419304542e-15,3.8322757564077886e-34,1.1849360517807542e-6,1.4276123536103467e-9,1.3117654807355233e-58,0.5694196605596731,8.730328994433837e-38,0.3415452244079351,1.3749053813242247e-27,4.668613403901977e-67,0.028697850701090776,6.886568787836181e-15,0.056152553361850405,0.012809960959966697,1.082054359936466e-22,4.119532511238516e-22,0.302904054449996,1.8460094904317358e-36,2.6945731763202973e-73,0.00012703587830932035,6.563945961261033e-5,5.552859933001181e-7,6.960562175369096e-15,2.2842412152544592e-29,0.17214532183876183,1.6027041908491307e-33,3.877753893077718e-47,8.438202220823593e-53,1.1659971110881646e-19,1.1356190431030017e-44,3.313726197292296e-39,6.135389591360594e-11,0.3701820409602859,1.513915533938875e-77,1.7358547892232304e-31,1.87557664100648e-71,1.9045780746209638e-5,3.161495953107021e-10,8.977987953173689e-18,4.230858640061113e-12,8.908096622426463e-57,0.29844116149172284,4.441974199348239e-16,1.8057695628818488e-75,9.135288986954254e-41,2.9205376664443915e-9,0.4930394068624169,0.030263623885255178,3.60108986146624e-44,1.0160121730234697e-7,1.3291315143095299e-30,3.91777821522189e-15,7.388741312182761e-33,2.173153745880652e-19,2.1452106289143216e-19,6.05428546951874e-50,9.132634195700367e-17,0.0015698396424501406,1.8062098033840367e-31,1.0132179921843107e-46,0.022085307719882204,0.5841971879021698,0.00018494481823457643,6.978541305865281e-26,1.073715669498546e-47,7.151831726950891e-50,2.1262667837133635e-11,0.085598001798735,6.681946054768487e-24,7.759140172014998e-19,4.602776163227126e-49,8.041015033012662e-7,6.823318428011574e-79,1.8036577039631374e-14,2.0874672695978052e-32,0.054185752143947816,2.0603944073417767e-11,1.2693605504011976e-14,0.1338674323764601,2.1140923233640933e-43,1.937670927377914e-84,5.7626133672876735e-11,2.1137739233547577e-48,2.9976347684480356e-10,0.098913706361354,4.982272072170464e-31,0.004971727399472945,9.712366091263191e-70,0.5855795179288275,0.0035075671012600304,5.795526015489594e-74,2.6084028051274944e-17,1.9327329854430303e-50,2.5283334999532275e-23,0.0007557917432197126,0.5111225855779997,0.564646904512409,2.6240164322408654e-71,0.5451010339635922,1.954703415091953e-9,0.18822815290266526,0.00951981996467858,0.2543973230502258,3.791773447325672e-77,1.0242300535785871e-28,7.051692912440213e-20,7.495952993126631e-20,1.8622295819357623e-69,1.0298242948078176e-60,0.5705483692472415,2.210463132463834e-60,3.045977363859109e-46,4.682196319152849e-34,3.965820822704914e-78,0.02053510391905856,0.16160755510011265,5.712584191748256e-23,0.005991143602067409,0.0018852953528548046,6.430838289180442e-35,0.0001079948828512868,0.17754320777053645,1.3219683004918692e-8,1.1511248369075634e-43,0.2618492976840145,1.4932746127751003e-41,0.11850577129820172,8.288068096124011e-8,3.8587389338677944e-5,5.654109744334491e-28,5.409247748743477e-21,8.642857536957627e-83,0.017472389092597244,0.22309954535741242,1.1906756697964755e-27,0.0723216957082737,0.0010341025348666135,0.06450099560090511,2.102554560645072e-63,2.0556645504487785e-12,0.04096899749499956,3.9659533738196143e-66,6.727734683520754e-57,1.1146016503551688e-66,1.1688551349960149e-42,1.255578273410927e-80,1.768438821505572e-23,3.967404063589703e-20,2.455181137647813e-20,0.5577254252651658,8.000317509450417e-16,2.5566981296982332e-14,1.5449289838338524e-44,2.5237308856263926e-26,0.0034646454693195252,3.4638932442180463e-9,2.1838735863366874e-30,2.584563355094866e-49,3.016136721970059e-25,9.911887479518107e-5,0.10633411809625054,0.34965693800071757,5.306346181356399e-6,0.006781141468859785,4.165353933725886e-36,1.936420536162279e-7,8.207953527140093e-40,9.033884155633423e-26,0.017341828381773554,8.361622213881716e-18,0.0008177347925567654,0.022169248043309858,1.8489643646144778e-7,4.696544751891995e-43,4.028025271223784e-39,6.482959529575424e-14,8.581723320843629e-23,3.385866545822566e-29,0.041031686886275245,9.411923895837293e-49,0.004297652115383707,2.247485317127449e-27,4.2752048557711435e-65,1.1005557936908322e-51,1.517008145788983e-32,4.237730901243358e-59,2.1293569015400065e-13,5.4373850795971884e-73,1.0984046045622138e-45,5.744557687759135e-5,2.1929973819462954e-8,0.23783627888861514,1.2931798633283147e-23,4.959700449737316e-77,6.489402962758752e-43,0.0002771004588104982,0.5709554200949765,0.019459383084985377,3.5803169780253803e-26,8.994740694161868e-79,9.079286212852556e-51,1.343146763091665e-30,0.00032109638793679715,1.6890669715784986e-9,0.004637118652104546,2.020926088216636e-53,4.806331346604446e-18,8.744426013044695e-15,2.2411572675922217e-14,2.7028965134388628e-21,0.03971896405880474,1.794138809685643e-67,4.81261767557089e-81,0.050911411144090715,2.307548730469463e-25,0.02717817939107729,0.00030197043663509227,0.0019294220540852663,2.6097214720526413e-9,5.0574989889309755e-24,4.459990201433694e-6,2.8650672203922226e-31,1.2271043236647261e-11,0.002889480937146337,4.094116001262237e-7,0.08464154259250989,2.1003783971383918e-14,6.264514886273438e-7,0.00012633946114051032,1.2386724013988427e-34,0.04597219457367297,0.1255918598600071,5.731115627131852e-9,1.968908815970265e-38,0.12666205436364394,0.01004015675409878,9.459084430356425e-55,0.00012454658117102036,0.0065090488994903545,0.23670551258348194,0.006804167244835971,5.503580132804095e-6,0.445824096368222,0.2744032432080316,2.2514541315694742e-13,1.0182243328738787e-8,0.38932784106448703,1.931111169405521e-29,1.4646963617789387e-37,1.823455495298362e-9,0.09178500247061283,1.980704070680994e-5,0.5444268412520493,9.754869497032754e-60,0.001437107084226128,8.668759726231711e-41,0.5204778843572532,0.07272744142735674,0.00012749923960956645,5.26714581640731e-25,1.35339342095079e-76,3.0346271909678283e-62,0.00019349606455346235,1.0760286387979218e-5,8.211044060787082e-23,1.2295628395594942e-7,2.6239185724315862e-77,1.3037949123505387e-48,1.989370962894613e-10,1.5592864918996316e-6,2.997654190096683e-15,1.3286932728457267e-80,0.013650125727149565,3.3434046834855555e-10,3.856087714472657e-9,0.0673127300082207,7.094926600978269e-21,3.4295958255162595e-47,2.6634895667356117e-11,2.959284980136577e-41,5.925361059284162e-10,5.121155433884605e-18,7.543123420887126e-40,2.054309125015664e-12,1.6694544591375248e-12,0.00018563595065478484,4.812079491086578e-77,9.106936542171481e-8,1.6459841975660164e-34,0.3556072290349368,2.0140361809772657e-82,4.43380932323843e-20,4.7043570787463944e-30,3.2194648253349656e-32,1.3555948305384676e-20,6.213581737192418e-48,1.5202265012100714e-10,6.297149976877208e-65,0.02850044375787203,4.3840527531699765e-23,1.1935910133370155e-13,6.492775555714736e-64,1.4676527243146695e-30,7.697749573486957e-7,2.737154584150234e-7,3.4798739410761846e-10,7.401624738445159e-16,4.2813467519288684e-71,4.1000398932504324e-19,0.0032582078866959093,2.1246242745579697e-8,0.029828297958883872,1.847184093432825e-30,5.9822738129075e-49,1.2764818144925605e-36,0.3171488683496867,2.259620408187568e-14,3.062582423442831e-15,0.0012016051093350407,3.3479775883003e-16,0.10221924104515906,6.304700702644345e-11,0.004306380498921179,0.5635983548068978,1.9599289879050358e-7,3.3216404463606318e-46,2.2103294672566473e-6,7.19861493913221e-56,4.292161176538541e-47,0.10250161907697337,2.1576366903712594e-13,5.8737097430030505e-61,0.007306292875181457,1.9983237826203226e-13,0.0007083721392781442,6.481744377682707e-8,7.410860919716396e-15,0.578028143341941,1.0415025381425023e-79,1.1278940617073696e-24,7.733391185271509e-25,5.0613705077988925e-9,8.783218825710767e-43,2.017928133597136e-38,1.1009838925903127e-57,1.2254938962625408e-7,7.802066704402e-72,1.0897206147270583e-64,3.0192116774093517e-30,1.2055977765139707e-39,1.4904775885826365e-59,0.0011037413996995108,5.820793511592104e-12,1.0053395784134158e-8,4.7413475872106526e-5,0.21721916117754536,1.9998844081144911e-22,5.393593155499974e-38,3.0057748403109003e-14,1.1465336444870576e-23,2.994713064872941e-60,3.706165006771314e-64,5.200708055550504e-72,0.033229185249348626,6.716923555072681e-24,3.512851063599553e-13,1.398420635297232e-38,2.515727485600512e-44,0.16615872769479012,5.545237816938362e-16,0.5465589284662196,5.4782691840996805e-71,6.135444816490241e-46,3.6228378117421636e-34,0.0005626287206893742,1.788655413306831e-16,1.6879816882093675e-10,4.571666487101127e-27,1.4313726649680548e-11,1.4332559104224167e-6,8.545212216083549e-63,0.5382648737286367,2.5829927969677184e-6,3.949128269328032e-54,5.397188389106003e-66,0.01893983004421151,2.151174513148389e-57,3.454994807362675e-48,8.261660981333761e-78,1.845631733768331e-15,0.05778090232780905,5.798427312332694e-7,1.8535666586496313e-16,0.001248478347204395,2.612498837493447e-54,3.305176087870128e-21,5.912914605662084e-60,3.370836623374649e-39,2.7035697217362485e-36,3.4010048004716796e-19,0.004416757175819444,9.800534823808722e-5,1.9653291030660307e-6,0.05574387730364485,2.6165990899575193e-83,4.413681693476477e-61,0.028426019357378922,0.10360834435463814,2.1259399983705443e-73,5.5101677809805205e-24,0.0016981598001532166,3.269895124820385e-47,0.21537519571667374,1.0529378919376958e-44,0.5559265070388132,0.3284763789430891,9.830496574335203e-7,0.01812943045720842,7.3051838001650195e-56,0.012240880976520489,5.911946786377652e-42,6.905647940366585e-17,1.1828012163962553e-54,2.1578026743106084e-9,0.03363579812042548,0.0048134809187615445,9.323649519564252e-35,7.951493834093806e-5,0.10230100013826157,6.388995035636724e-23,2.872115495230502e-9,0.0023481898290439998,2.793671790364731e-36,2.9292115395364947e-72,3.293235235868739e-11,6.294311833182338e-7,1.5370051485249518e-17,0.00017306934950677116,5.032647912232512e-45,3.77411871135125e-26,1.5153977264846074e-8,2.095023599001386e-7,0.5072173953441086,0.011223180092078098,2.2649055569315762e-14,1.749494421312524e-26,0.03323394204098353,6.982321258013129e-67,0.001277454883738552,0.32627141127200954,8.303849757190078e-11,2.6852844017104305e-7,6.951981892664129e-35,9.139235132100905e-52,1.5773607763451387e-50,1.654601446510895e-72,1.537897506184525e-48,3.413520034682092e-58,7.721296006691305e-41,1.6494425201024974e-48,0.2208168866675974,4.756052281716935e-44,0.46280698555619965,2.027765602177652e-28,7.068232353856234e-6,0.1776915552725429,2.095989029365581e-42,0.00011312605111011043,2.446844611622106e-68,1.561443611080237e-60,1.2482763649739664e-32,1.2983766694388956e-32,7.234518957823332e-76,9.193836308591423e-37,2.015836702011487e-12,0.1445860790867866,8.276086856223659e-52,4.601429252224288e-6,3.302835827510607e-55,0.043320808094602564,4.388348007475209e-5,1.470035134067785e-15,8.300836257663413e-52,0.21211967257136166,0.5725696639513045,1.7481752955688064e-29,0.506925498806404,3.764211099397813e-26,2.2213132241453114e-65,0.4113177394389016,4.5830528714857714e-8,1.845239455776925e-15,0.19573900017189888,5.450044208960601e-6,3.941628316971412e-64,4.1206713855342883e-38,7.854520521690324e-39,9.40615406530989e-53,0.001009954053033354,1.837972106377333e-13,1.925685747585878e-70,3.903753854754211e-24,1.0502437443322325e-25,1.8042574787597296e-41,1.1465534783997974e-31,0.0068683897326034605,2.6702488062151766e-19,5.86682192147702e-14,0.46731443337865175,1.9559585370651624e-7,1.6076846778481687e-23,8.138007162638455e-62,1.227633288066891e-6,1.574531264059578e-13,8.065814747900739e-48,1.2212443281049455e-25,0.2557841190542471,2.5483734004939086e-64,0.22367552424684783,2.15357775039515e-18,0.2376394420295181,2.3358926615979294e-71,1.3522438242936389e-19,2.7021587831321086e-65,9.086309485662159e-7,0.005161206330701686,0.002618153161958601,0.49442058135805295,0.5482091057061655,7.56053470530154e-10,2.3667635922425913e-21,4.772309803523786e-56,5.684018573378458e-30,0.0026038702148611878,2.0541884990505182e-63,3.62083508419081e-29,1.1357213766212108e-25,7.605648841185458e-58,1.4300113491324395e-64,0.00024751447670306597,7.594199334571032e-58,7.481773595386412e-43,0.003627697559681531,2.496175256054536e-13,8.97019951748622e-14,0.0004378934592435816,2.3086674591753276e-8,3.2052835305564306e-55,1.9330480897006963e-41,8.254036365000217e-5,5.250686218046011e-60,3.9958954977420635e-44,0.5413959546382783,2.153144030572634e-43,0.09270114230189802,0.0037559859668108526,4.100538789144833e-39,1.1260318836682093e-34,5.0901923831272613e-48,2.2460173736355397e-71,1.8799467411661826e-44,0.00013324468067979825,0.39700781958260223,0.2637853429275486,0.07653382125321531,3.165729914206176e-30,1.0579913668044184e-69,0.3090831614365743,3.919919053657078e-19,0.20477144123030783,4.986545260068231e-19,5.421232268202069e-24,3.095692575990895e-14,3.6250870602416023e-68,1.0021865166727011e-16,1.2024687589817669e-11,1.6908673226797953e-13,5.6446252282523455e-18,0.030273172293979328,3.3699035956986477e-5,0.010156579181562157,1.9903625638444424e-15,2.2506553915038376e-10,1.3862361099569017e-27,7.378627772962427e-18,0.38644874440254917,0.004137546029540253,4.382843073855356e-28,0.5533876533246052,2.873587848338982e-21,1.034399727760806e-20,5.1406771594521624e-23,5.515808080354997e-32,3.662449217018459e-68,1.093759350929427e-74,2.283142445829119e-14,2.016391029765863e-52,8.498833002137257e-38,1.534503054209131e-5,0.5624679907638483,0.03810894462188153,2.565694822946278e-74,9.278748811821202e-18,1.2009468064811637e-14,0.041990334621290606,2.0914088511683304e-72,9.821932502339476e-15,8.267756029928192e-67,0.0005597264764562342,8.562199764034581e-80,1.7648852868739277e-68,0.0018428540858953326,2.2682458230741828e-5,4.303989604663428e-52,6.455537976322586e-36,6.14389328578088e-11,6.599324034277425e-6,0.05134483680260178,6.932691358358889e-12,0.0019940862812280157,0.30569995630540553,8.730191086141696e-36,1.0504980736442248e-5,6.625576115688369e-6,8.835124236255779e-13,2.1344528537130468e-76,5.162658998759295e-12,1.1853996942816436e-36,0.23798274810711992,0.013749743918023206,9.421239075165866e-14,5.067001231739434e-29,6.323233861815164e-40,6.496983422140643e-5,7.039036238894288e-26,0.00017458647744182822,0.000576557573250084,3.8227169883251494e-75,0.21099030581621744,2.7793625093267805e-6,1.0231229125936952e-54,0.05212519136316285,0.0002594401666128069,2.6403664498674313e-14,1.7229653558360014e-50,2.4445720621273656e-58,6.216004359141907e-62,1.809048285788737e-35,0.12650712766755834,9.049249353845832e-9,5.266846675579741e-39,2.3046758531281497e-16,1.0284895624495353e-51,3.199899463613646e-11,0.5468505796910418,1.0800947312105628e-21,0.558630013884231,4.2232740824508216e-42,1.7017260610247483e-22,0.001608249887766804,1.486570507800415e-14,5.2348151670350093e-51,2.0015967371293432e-5,3.318729644948545e-31,1.9809696440752792e-14,2.420661362003212e-32,1.6846750596120988e-40,2.415825210844059e-5,7.251688890627935e-10,0.0909249403440067,1.1117061120457668e-81,3.6887778166071246e-22,2.5585197957933616e-41,7.261190967445393e-58,0.0010157472679748164,4.3759175298362395e-15,0.2986489169948004,0.1186876975898179,0.034860169766451586,9.177195624211905e-10,3.3375790545105825e-16,0.007980558071493674,3.03381289302383e-25,2.222754951423835e-76,6.501777864992511e-7,3.008901822024726e-29,1.513248450643297e-81,2.5064668451225387e-13,1.9300287848150506e-70,0.0016045019885528268,0.0013061760327311854,1.5305135304932616e-7,2.660623912565044e-5,6.74943808847866e-61,0.5677962699395126,0.0013711524591183341,6.754811987335376e-28,0.5695264845383539,1.4410913010834166e-7,1.4545946442666984e-36,1.9323068238138644e-16,0.5548681044238817,1.8620661970375284e-24,1.9753439119930134e-44,2.3885541552110818e-51,5.04179564369368e-15,3.204890538559952e-19,6.8576193461567675e-77,1.1655633553011651e-35,2.217090505455129e-24,3.787908257961188e-6,4.0618654607468326e-11,3.3897288260638226e-71,4.919063385685892e-70,0.4891919412282696,3.436012275497179e-9,1.1884898855044293e-23,5.8935516175575614e-5,1.0072008633975917e-6,1.5737968065504876e-55,0.00018999322204457756,4.856035370694285e-17,3.406945092973631e-5,1.2498028179338488e-72,2.4992461918485537e-72,0.08928623991363419,9.798644010431064e-19,6.381164659502058e-42,1.9452660290694662e-21,7.291571583117352e-40,3.632351632895498e-5,6.232575128420022e-6,5.489882858422287e-18,2.668922319888517e-16,5.80916587423821e-18,4.643193083400628e-19,1.9657631782091e-28,2.09108873686496e-47,0.014593496179226517,0.01615993733441407,0.00043218124593013163,4.302264509338161e-8,0.4842729695628426,6.848665487607704e-20,1.7445017268231324e-56,0.009246944982085961,0.020447882577486927,0.001565890355612758,5.300174409900638e-10,0.48724247786124575,3.742061107073898e-24,9.99978122352031e-49,0.302762031443901,5.820047603104234e-21,0.2245132989838294,2.823738903753619e-24,6.136070352637587e-35,0.18512376568636485,1.3146389730205303e-33,1.4385033405358577e-10,1.9270706679740863e-18,7.495971967379913e-61,6.828891816266878e-59,4.195767114275174e-58,2.067210790699522e-20,1.5810821410741578e-31,1.4728764722626044e-82,3.112612077451648e-43,2.041691264147542e-15,8.872973426177687e-42,0.00011359463584112928,1.2580323386780938e-5,4.281361986143447e-45,1.4642282687055285e-12,1.7295485633558594e-20,2.374267452747246e-72,0.010034958038453914,1.4789677869396075e-75,4.259769337190303e-6,2.243539515201462e-51,1.712795675986939e-65,2.1739983783907446e-14,2.6078420391879643e-47,1.2206597048346567e-25,2.0919704192456026e-42,0.0018127130847065257,1.1212879973084398e-15,3.023724953652344e-7,2.059170544189629e-13,1.9178736035042133e-42,1.9628710336924223e-62,0.024249529429309656,1.3966066260763695e-20,5.618206172007373e-19,0.017104018539013464,0.00014354038489802513,0.09290835456186888,5.38810954331839e-38,5.700017908648124e-44,1.7828363521776808e-8,5.470783066609335e-10,8.684425196842471e-46,6.030644929245818e-23,3.5699046403365003e-66,0.21394634483917702,0.03171307407808487,0.03549613263059198,5.8749873548642115e-8,1.2302017547224638e-43,9.104636392227572e-6,1.211194954126612e-5,1.6627555884476829e-71,1.340169583693085e-72,1.6712433741151226e-32,6.264888207925559e-41,1.4655076185137694e-49,0.10124559466907904,0.004877626994390247,1.1913299080072672e-34,0.1285156157519508,1.209827458753728e-67,1.8758033064087644e-15,1.6367303227801787e-42,5.0900752828958016e-54,1.211324827495055e-10,0.00018902251957631834,4.876928865971441e-49,0.32398369493797186,0.31120698513544653,9.36966852067448e-60,1.3718646590168218e-74,5.016580285345166e-25,1.8577649597593276e-58,1.037648184642969e-11,1.17399888508988e-24,0.2799597127573051,0.052618341990286005,6.9435629875631315e-19,1.0600167910958338e-11,8.787277135086458e-33,0.18714484638261097,4.534724587931385e-7,3.3477364311453293e-23,2.0499161515307965e-27,3.895362520852103e-11,0.013569214351367265,2.3142947439695233e-10,2.445192598366501e-31,3.390523495164763e-13,2.8696435800693995e-39,6.186378084472416e-57,4.2025231675229944e-6,9.272225372086351e-31,7.976562156448004e-43,1.280921308561878e-20,1.0754074234684442e-15,1.4549309373222383e-46,9.243718916340282e-6,5.129058973694153e-22,1.1219013446687027e-12,8.769772629250966e-17,0.5405401801982251,1.272541732866591e-58,2.2608987078782978e-60,0.09534448480615926,0.3166112472366963,7.698803270728772e-27,4.027439099042628e-74,2.237107714268006e-8,1.435695568127201e-35,0.027505229262192756,0.023339445573568846,4.711190768149346e-28,1.2268682797635802e-39,4.9863935502387124e-11,5.608260625210058e-29,0.10651028138936505,8.32693884649275e-17,0.18321050303849723,2.7796965413309985e-11,0.00021780502947881303,7.758797351452346e-37,1.3033136488303454e-32,0.013954988688144664,8.989491108047044e-24,0.01203756234681657,9.928433762349438e-83,0.19910125197614073,6.578357813718287e-23,2.0715975041032037e-26,7.859391542676179e-17,9.341107516890382e-30,3.5580190352234166e-27,0.2669204453785211,9.807203721592363e-72,8.681853226267831e-70,1.290667802337263e-10,3.398178480662088e-21,7.915493435895367e-30,3.240396086013969e-23,2.526495265926335e-18,0.2855349156268536,5.62628585278952e-50,0.002873875034748556,1.171203859331623e-65,2.1817456834628784e-17,1.370463558097322e-44,0.5645244688384629,1.5177445391747999e-52,4.740364910221933e-80,4.182136810376317e-23,1.4386700934237233e-31,2.752878496751102e-34,0.00028319857470292725,0.005267916068566604,3.9978610589144885e-63,7.253492028987952e-28,8.712933707939313e-39,4.565529725116498e-68,4.1424194253585364e-73,3.424351444908544e-66,0.35912316886369067,2.7096302762738416e-49,7.871027700695874e-13,0.49639039113431427,4.137824854030103e-47,8.8128931318636e-30,0.00035752902017842657,0.5284210107424071,1.361697621167981e-32,0.02750090946331495,0.0042820335905972996,1.4780046354907446e-45,1.8605235395013985e-82,2.8497753377294327e-40,3.567824098650559e-8,8.627041983984853e-15,0.2592835166134831,2.206530737889456e-36,3.2742715047578003e-13,6.077485796774578e-5,2.260872190431674e-35,5.391610125251825e-71,5.600506408693721e-31,0.00024553924361337965,1.545286176069134e-40,0.006579988687709671,1.1875956332874688e-48,8.089354134808176e-9,1.278093894279302e-28,9.444571677733564e-41,4.6579055837670974e-33,6.871746970372672e-5,7.99373064153373e-27,6.592697117830482e-75,0.31119533778346004,6.8271521337446524e-18,0.25673433546054436,0.41714025378624053,1.1936058106581335e-18,5.0455040277329295e-36,0.4311732750030133,1.3582754648845282e-81,0.352773388300732,4.94321309506051e-72,3.981479913863547e-36,0.02700263544468622,0.031566776317957505,1.9922382178217009e-72,5.206911891132836e-57,1.6235830456752123e-8,0.26340721292197145,7.31939787071359e-45,2.678389629307588e-31,5.57081326077226e-5,7.177643730726045e-7,0.006225087605094452,1.8507021464445336e-29,2.5872756951778597e-33,2.232201724174529e-48,0.16780549682145116,0.13426799279811333,0.04157876511245919,0.058720461084124286,2.20753943406355e-5,4.123450827959598e-6,3.981471374999952e-55,0.0003207246188125903,2.1636271347022665e-19,0.018136410470780864,1.021130310980069e-15,0.07180818874087372,9.859686474506291e-21,1.3310648439973838e-41,1.1948431721089423e-6,0.020149031460201552,7.04698183464851e-35,1.5411195279258102e-20,4.921686588121295e-49,0.07221068715282922,0.006377799252950833,0.009716374153128335,2.210695692005177e-63,6.831177297651662e-12,3.43161210942817e-45,0.004274417825039339,9.246313289908147e-27,0.014313770896087524,2.6219588973236334e-27,2.2663114185670227e-5,5.589323255490763e-8,1.929696943638551e-20,2.1991048936665486e-11,3.139971465747556e-29,0.0034110945216845492,1.2633522867886572e-38,0.0020996190787350316,7.65886743367351e-6,1.4634071548357343e-14,0.0007374779946667412,1.8837773320534586e-20,0.00011641727018570864,0.365213572320484,6.506231929199196e-57,0.00960035904076288,1.6664719761620418e-80,3.48019914136219e-76,0.1759268018610844,1.5653168030647353e-5,1.396068670414551e-68,2.9919834451848055e-66,7.097261970102822e-64,2.8740738781783468e-50,2.145591377300753e-49,1.7235667287829532e-65,5.9241820238136e-32,2.6084140000874123e-45,1.7678072898065582e-43,7.079973112292518e-9,6.3605498439497905e-12,5.832179542864213e-16,5.5675529296361535e-31,3.183205114871939e-5,0.0032988036022658894,6.326768159527499e-19,0.5615898418097414,2.0520510638150355e-28,0.11289965732990725,6.321149170898804e-67,2.569128370145225e-45,0.0027207298326799253,0.11614567188832267,1.365195723746634e-9,2.7954874583626526e-14,0.18545378866135453,3.243477298135398e-18,0.44856850960978994,0.0027665910915814704,3.6550519693607516e-24,9.23835467320332e-56,6.427406869967029e-13,7.519486315577578e-21,4.857125413372024e-11,1.1162650449062522e-11,8.820100757320687e-11,3.496222448097577e-6,1.8067960868286892e-19,7.855579575896204e-8,3.2335022339994227e-79,1.5524877965652286e-18,0.22643060518237473,5.515323051239853e-17,2.7264289316184032e-36,1.2743131837125857e-42,0.07972425593674454,0.0061603139574152865,0.29818774524270314,0.005230297914970207,3.908897432530631e-35,5.823285464884685e-46,6.970102978239214e-42,1.5027995679090945e-70,0.29217555075193674,0.08188894763511423,1.2748628248273489e-17,1.8051180541061497e-32,0.006931859019558475,3.905913935890064e-7,0.339980918841083,2.344677645690679e-24,9.329116611787547e-70,2.2521796170833446e-35,5.02978067628168e-32,1.7991631255382434e-24,2.210094872389026e-50,3.99885663603412e-40,0.03522914243589554,3.2518979585706525e-12,4.1588304139162893e-29,1.8782081097089026e-7,3.706702713343847e-48,4.5198104938395125e-41,4.674271788050143e-30,1.2089420607628533e-7,6.403181765550673e-33,3.0150788802197808e-33,0.00016264409390500694,0.12252949532798924,6.341354212132826e-26,3.5835374791698e-11,1.1390927177619626e-46,2.929318599639567e-9,7.347710698510796e-20,1.492402716968524e-58,0.013575242247247148,5.444948674718608e-54,2.165916745336413e-16,4.6207502085351e-9,8.660010574503147e-8,2.315891305989677e-28,1.0189374320459669e-14,3.2870450133209324e-78,2.2076861411252516e-18,1.1810135166248117e-10,4.416104151248884e-53,4.6802858443579207e-45,9.623921269900271e-51,0.2485746209401126,3.076081116153213e-50,0.5822494012401096,0.0008114548722723636,3.870034429402124e-43,1.6072934178672693e-38,2.054721136777311e-21,4.3684455962657465e-21,2.436666236458941e-21,6.1944684291834045e-15,0.023168942224337755,5.209296755176106e-16,1.877122116115897e-44,0.13046961317225117,2.161745293978186e-28,1.2562624498092949e-11,0.22610899020925326,1.0146376436816817e-67,0.5668768989916413,1.2809286226010503e-52,5.950863049753972e-8,6.976446348756385e-65,4.5796773159419097e-66,7.005977309821062e-20,0.5521902326172199,4.403588085945957e-26,4.368426995749651e-31,9.17277851153727e-26,1.4895206221066723e-14,5.470642059980843e-14,4.922985256310956e-72,0.00010800127542868855,0.45949515539883673,4.296713753323592e-37,0.5633781128224987,3.426298452242938e-62,0.5366012866308102,0.005120600051757199,0.48159375888660894,9.16449363612701e-12,1.2336568356851417e-52,1.4204160046240597e-19,5.816309278319186e-19,6.745147070831321e-51,0.5520261814540985,4.355485705888338e-41,1.2997073911845327e-6,5.534287180365182e-51,1.732500350590637e-6,7.030856077791571e-13,4.4818651150734725e-30,1.287530492467635e-31,0.00036337325209063846,1.916323800700268e-75,4.841912426662346e-47,1.1569276847417933e-13,2.6082392257598604e-58,7.1012332182210535e-6,1.1644110341990256e-45,4.568783449599755e-71,9.23888952763611e-13,4.2456493061530135e-30,1.503926933367412e-29,8.498849046619733e-9,3.153530802197937e-25,0.24779629279206708,5.378218990896184e-59,5.5716430986169455e-42,0.30281619932107307,0.00013750079213168724,9.738876950738849e-37,2.028777789823563e-36,2.026317230779831e-27,0.007643152779005812,4.785643626947463e-18,2.0233220975952225e-5,1.0783304117116588e-37,0.004141510564757396,1.8821290593763198e-75,2.1370813410604655e-67,2.733558965077477e-51,1.081985324455282e-57,1.5075157556327995e-29,8.977004702478206e-36,7.432052299107148e-6,2.2952518816457535e-22,0.0036239539623239576,0.019561476443420975,2.414462191559698e-28,2.585652353688805e-13,1.516703682487214e-18,0.00014367984201919562,6.563963693851606e-17,2.8051943790634135e-43,8.951241107787488e-8,0.34266169867623925,3.485235728356928e-46,0.1396556899166363,6.607117921251821e-16,2.6973551623089057e-20,0.00016765453273222242,4.788020407874229e-5,0.11116278658533364,0.0018679509700376081,3.208436261788932e-14,1.264073862869796e-10,6.045694872033542e-27,1.4868823085004684e-11,4.6608698348063436e-20,2.148834768012353e-21,4.894840713225959e-5,3.2530446497503104e-60,2.3276172079391916e-70,0.0005366609302494757,0.43620642648126,4.503887047650654e-17,0.03984280868318408,7.117812755409385e-17,7.618760637602866e-5,8.878608792032639e-46,5.279217956742615e-15,9.683749886292507e-56,4.574117325625804e-34,3.7860276987425626e-6,5.952738922775854e-20,3.5814367874331626e-27,0.22454049426991546,3.120351382683832e-48,0.0009297399028376684,2.0670853708897485e-73,0.009237501695165481,1.6172133011377593e-39,2.508803712201088e-38,9.020939376799774e-65,5.837023402847485e-23,2.3161426397994118e-32,1.4984775163771664e-39,2.6151418598246345e-6,1.050928433703575e-8,2.0497158986468257e-10,9.212082444880741e-10,1.280376199930251e-70,2.7511631882297667e-17,9.686028903548103e-27,3.740260162931915e-13,2.4424672782349515e-39,1.938626040265238e-18,1.0633736460801228e-53,5.850369725155324e-21,8.391765491314905e-14,6.428093548011559e-24,5.548402102236537e-5,2.5710049066771556e-29,1.811681612526308e-43,3.3431919863169927e-9,2.1002136675880683e-67,3.886191829936162e-28,0.024850635416438876,1.4536291404532573e-17,6.192901080488977e-20,5.233187230092704e-41,2.454862005739279e-12,4.529702854039533e-6,3.650153968544658e-5,1.6149726314563942e-47,0.06402086568655997,1.4801154998150387e-8,5.401781736554321e-14,4.925706730548686e-23,0.027760011437882978,3.762119965648246e-18,0.013276382442641286,0.4274618653595299,1.7055610775111758e-58,8.189138030629162e-5,5.805081366367104e-19,0.2632611400218539,1.7120683865291831e-15,0.3420656748130869,0.5646965442635069,0.028523646485827128,0.12434614054257574,8.5340341968765e-29,7.285211274349809e-6,4.8635954882253497e-39,0.0012306377793564285,4.423470096203505e-38,4.760728031393694e-55,3.444115146399986e-8,7.91750070807501e-45,0.44992524624980573,5.369606762545242e-15,5.4663398333975374e-62,4.464418312612447e-17,1.7539998833729624e-9,1.7188241320789472e-36,1.1276736191774655e-7,0.03288968512006537,0.0004429316935812272,0.0011670787452364925,3.5079314153195844e-7,1.6481148453306124e-26,2.738582992225748e-42,0.05253441251678061,1.4063145173320438e-23,3.3624644093104943e-6,0.05101950207671915,0.5675335830450067,1.427918557582096e-23,1.0839061465023769e-18,0.5068929362536942,2.3850956834976795e-79,1.3612585885644652e-10,1.2875869461000354e-40,3.9859265718523396e-11,4.5469218672076325e-48,9.361276737505584e-39,2.5233040365268217e-74,8.776550810904668e-46,0.5827481805458468,1.369115397957151e-72,3.848849417317207e-12,2.637581203634702e-30,0.05015199502043358,0.010737121905840655,2.259447482714642e-21,6.859138719730779e-9,2.71042472332598e-65,2.7587874066138594e-33,2.5175172419141652e-8,3.750702562930778e-17,0.09525501472297881,4.223810226098932e-48,7.051993899389611e-48,2.8201712196239907e-34,0.34087032210178997,1.0333518346080114e-28,0.00457273964633125,4.415874776560473e-6,0.0010385418788428217,9.36694477189937e-6,0.038429288054922746,7.008642552985791e-36,0.5539577838338162,2.553910635885332e-7,1.7552292418222943e-50,3.1941035618770875e-10,1.6306864612973478e-5,1.2509419438250782e-43,5.879740531202385e-6,4.107059160353939e-46,1.9595451158675505e-6,0.0030940647701266765,3.1946315313150654e-17,8.012593130833892e-51,3.9420579353982965e-59,1.396128714841136e-40,3.119449721445088e-35,2.759859445100293e-8,1.7440098962505575e-67,3.378748161497058e-5,7.128182737269497e-77,6.995236616662225e-38,1.637533512159926e-48,1.4683767742689706e-57,9.129351525933569e-50,7.090871797879672e-13,0.011736471126032384,0.09538327069895355,1.4834807400814127e-51,5.88947633806753e-20,0.46875415091822087,1.7319204718938418e-54,0.5558224395235986,3.6096153824183555e-9,0.005739660933920658,4.485053710442923e-9,8.490917711275718e-22,1.7377307602730913e-13,0.1436223465858955,7.48835050942833e-16,4.576404621986166e-57,0.14558798711155585,1.924289846199524e-6,0.03415796482514274,1.7240000418593144e-59,8.558120180005455e-5,1.4666745457619919e-74,0.538584593783912,3.227224055585389e-32,0.001193662228827444,2.3055160135085134e-17,1.1473184519107252e-8,0.6007454256070381,2.4035800905167784e-50,7.227655401357633e-47,1.865575797149038e-12,7.390725454340937e-23,7.281895288967267e-10,2.638539734314087e-25,6.0129239551264044e-27,7.776596494552296e-9,0.304910621207379,1.3674745666279217e-77,2.4422322077064943e-43,1.9270982867942603e-7,9.994144861147508e-33,2.3599493881633015e-64,1.0654938218444192e-16,0.07192902404526404,0.000290065524901475,0.2989790593104,0.5483255119970151,7.03249472488121e-17,3.300638459993695e-5,1.8483597837464023e-10,3.017760187788677e-38,9.168168091620096e-43,3.2414578501771086e-51,7.324211112352906e-61,1.4502488119586746e-30,3.1145710962554884e-60,0.14192937642759598,1.4518803581772479e-64,0.4938520462080768,1.0420434886351565e-41,7.576031312320883e-15,0.47350570248172885,2.4442691632626083e-13,2.102384671683659e-5,0.13355771782322542,2.8960742227523003e-62,5.0609892206833885e-12,2.981573569778629e-16,1.5030779289690238e-58,1.1089726749289878e-33,3.210563173834322e-5,7.853982112421766e-34,9.932652326886341e-35,0.5041926243233724,1.039217107238622e-67,4.0328087311542464e-7,3.0524799167383784e-20,1.0512385716670583e-55,0.010983740222734736,6.782102723258127e-35,0.5438483316793021,1.3265841709705802e-26,0.520648035006001,0.5709672285498224,5.2528806922868635e-59,5.491805899270943e-7,7.334415360891275e-25,1.204385254194421e-49,7.815488024454524e-10,4.027943819484466e-30,3.976401944692369e-31,0.014687593433267485,0.1053477250612208,0.15905759500950772,2.4903024888235263e-35,3.393049679420589e-72,1.309919316895896e-21,7.031172381300234e-52,1.0513416499215108e-22,2.7316434629862273e-6,0.37092466506792043,2.640059104608959e-26,0.4460845004498845,2.720057138965369e-68,8.966593586749606e-5,1.6227456640461786e-81,0.3381891267969386,0.0006081429618080715,9.396411372349979e-58,0.3372369150497054,1.5037047825610933e-33,1.527588590458836e-23,1.6439823118442497e-41,1.0551906395309776e-14,4.6321440205143205e-37,0.6118515268605188,1.161731321609533e-43,1.134058948871625e-65,2.770782633902617e-20,1.9568180429245612e-32,3.0677712211788034e-49,1.0352315920751018e-64,3.3219210076230114e-17,5.739281120347391e-65,0.0001807707854189384,8.363615875195966e-42,7.918013239601697e-6,7.507954294479846e-35,9.355166235250871e-60,1.1226265106920007e-21,1.672214577380984e-35,0.0014547576967666699,0.1665587000672526,4.2389987220182716e-82,1.3860721627871417e-79,3.535583882710067e-23,6.941811024382851e-32,1.071087111676971e-45,1.8480842773489736e-58,0.00946471996815715,8.412681391245514e-46,0.5301116669551862,2.93747352911162e-42,1.0403231065939134e-6,0.0005068622706014591,6.773706305846751e-5,2.236359033218258e-36,5.249799805382524e-6,4.962125078087286e-52,3.835396849254158e-9,4.31220431983635e-81,0.07274623245767824,9.877216405465221e-49,1.5199298646236705e-13,2.384185892746567e-10,3.7326382678951656e-29,1.7953486039116454e-5,1.6492188047383692e-57,0.5086691102696866,0.005627788826380064,1.1626941037345082e-18,7.112915692011758e-84,6.128133539756222e-59,8.741945828776317e-72,1.114878836029581e-44,6.28917511067143e-19,1.6685318423475036e-14,4.953568561552546e-58,2.7679319885189404e-38,0.3524079870401616,9.456798645298745e-25,5.8857700363328074e-30,3.7178899672687976e-25,7.118804477628247e-36,1.5674757704810785e-11,0.003822383029678508,0.12234545588124415,1.5158044369697988e-28,2.2931595800303862e-27,2.0367241505096878e-47,2.995228546235834e-24,1.4144102999859298e-34,3.1000008668017025e-40,0.008463771205607729,6.0384026808723444e-5,3.963441328584819e-46,2.053706987130834e-74,0.006767988886618634,2.876484972162141e-12,0.05982726023736255,8.517588964841484e-34,0.0012102230505226781,0.5496287541758862,1.3273693257600385e-57,2.544782090436686e-15,0.2758333332911339,1.644971075050811e-14,1.306610766804097e-31,0.39045160673571644,1.3607348512447961e-15,3.532544148040773e-34,9.016370281598624e-40,0.22342813086426272,8.600903585000325e-37,3.299816061327536e-36,1.86080526019255e-27,1.1312923158493186e-49,0.4753888801492823,2.517602687978963e-57,2.263645706049218e-41,0.003209747648337982,3.350597280045949e-63,2.2573856895373717e-23,7.606973072755865e-50,0.49203018378535224,0.015407226642979426,2.154794345373517e-18,0.31019561436669696,1.1464557343453726e-11,0.011284194641596822,0.46904281375093826,7.460476919238525e-28,1.7750475852009926e-16,5.698066649335952e-42,4.717773038315541e-76,7.975061259737798e-44,0.4251748827413486,2.2968465062532194e-21,1.898738279878554e-68,5.118133756627e-20,0.00503771685973984,0.0001284839655460687,0.09868317622385198,1.0571624866633076e-44,5.284093186529649e-34,0.00020516044632423584,9.291001407313828e-26,8.416201912467521e-42,2.2016876794908186e-8,2.38148594132478e-40,3.75360433076848e-71,4.816252325406334e-77,3.3107806259797554e-28,6.826771527794011e-65,3.3343436885043155e-43,2.079310790325503e-17,1.905160258477837e-58,1.467917818470131e-5,4.422073821934663e-58,1.2237957000935298e-13,0.41859084012321723,0.08656522853532356,1.82550612347433e-60,5.650411333434459e-7,1.289168248131721e-57,2.322387846303013e-69,1.3308786088793986e-11,2.8196515749551825e-32,6.134624568476184e-9,1.0787831801754289e-14,2.959362926694834e-20,3.041833923569212e-6,0.2997389018421889,0.04336011015098186,0.21716588410384974,8.426606861006194e-44,0.0004194935311066394,0.4593005911633002,1.2138044981677352e-34,2.5250383862781e-71,0.00011390494263659072,1.0886786692551605e-80,0.00020848543757645067,0.023311749927014343,4.7584374352412583e-14,0.3894822998094965,0.005843415471269343,0.03566382775561234,1.896919464589136e-68,1.8283464252750606e-61,2.162122261421225e-13,1.0708733519046416e-51,0.0013805284905608764,0.5002477931680283,7.960147916848624e-55,1.2409569185094889e-40,0.40732844928985784,0.10169121526109981,1.0300741692603385e-45,2.3837351321881864e-82,0.0010279691133533901,1.1679608168428232e-83,4.134756465744195e-63,1.0930509071975298e-17,1.168036219813378e-6,1.6576121679449027e-58,2.4814829264348193e-30,0.5276400204216039,0.344344185434174,4.391433946132291e-42,3.7105733871771685e-38,1.2583769671496715e-71,7.823196586935296e-76,5.538047812719456e-26,8.212214851987538e-17,1.6879697208616623e-7,4.357662777340032e-58,0.1717594677751764,4.0240160739047116e-10,1.0434503369181952e-72,0.5350111548595586,0.00451955203333552,0.001981712857666762,3.745757049388533e-14,0.006158518137945969,2.945060567826054e-24,1.092394120020134e-84,1.5583111129317031e-72,7.686268078974094e-22,4.538056123427255e-79,1.5269169678829683e-51,0.28899015434404834,0.1755321629016688,1.5143183669206467e-25,0.002147950976634093,1.3733494807023476e-53,2.4163716302605766e-25,0.0014962433865882646,0.007556707810951804,2.751502127712448e-58,1.924097077114963e-60,0.07462247960662582,3.1165604241368893e-58,3.304719286269092e-14,0.0010725265656806647,8.927496416544335e-75,6.085665085738035e-62,2.8462673312213076e-66,5.709330898426616e-76,3.760654583469045e-75,1.6273963839666177e-27,0.015583940174067248,1.2345268524987957e-12,0.003106307554893119,1.546428208037739e-29,1.0986583732364275e-29,0.0002667781193834559,5.770212685408965e-78,0.03505370340725468,1.0394739798454078e-46,0.00018845488692514342,7.088023897779995e-64,3.445602163139766e-20,6.4325435782980116e-21,1.1846279622406742e-9,6.602814919621362e-27,1.079566863647955e-28,1.7907824079266763e-69,0.3407303423270463,4.9399216181066655e-34,1.1105501262252047e-17,0.35183767487096584,7.910563342411722e-60,1.1052917609992625e-72,8.535932688614782e-70,4.810664789046917e-59,5.8369048855539265e-56,7.846070447501377e-57,3.3524762777862607e-22,0.06947423664080885,1.6788537835863673e-32,0.39587735670812113,7.08926147964779e-47,0.01752810307149103,1.3052545153071131e-74,4.60860987035466e-53,3.887140536461111e-72,0.0005522565816613418,5.0363384633151974e-11,9.567425096414988e-16,4.421109241809945e-12,6.593154491340868e-43,0.5419306383921099,2.302188499405607e-24,0.00064598033027144,1.3992070927456948e-63,8.701629901964215e-60,5.448274407331456e-12,9.819215928829346e-12,0.0041130228079036745,0.5131164134839408,7.472469108696935e-21,9.695269674980301e-36,0.010326108541001383,0.00654345470549458,2.955856325550281e-28,4.7382971189542565e-22,5.0201872072140906e-49,2.8895891133171746e-7,3.040708901092953e-29,1.84280824395089e-52,0.00554396564867714,7.635488423304335e-34,1.8573641562607525e-17,4.972902145179631e-48,0.06496549864269971,0.004649320998150557,1.0623540790432034e-13,4.555831582650355e-39,1.7847501772132257e-53,1.9771393642329997e-45,8.346436142123474e-75,5.624532750510303e-10,6.939014342161115e-35,1.3603023535039962e-32,0.5701388449124936,0.0004036398379898057,3.6564788546240424e-35,7.33071225389086e-42,0.3624439373929862,0.544176472716676,4.6650139490167084e-49,1.6752107857953039e-9,1.2372751651957446e-9,5.4471997157024545e-39,4.668083320074358e-49,0.5254867595621342,3.053946696490957e-71,1.5088696980948968e-72,2.7319857904388306e-6,0.03792142266571689,0.051007278824969214,0.562990705908784,7.269144841239482e-62,6.599434974231713e-8,1.6335196752385081e-16,4.2313849739761236e-18,0.005470765118747538,2.5725218882462592e-11,1.9198249559749105e-29,4.9939842741136145e-18,0.002191495715273756,1.6074802656343983e-9,4.3503727086063956e-23,0.4405005036604903,0.5652085660261283,0.5666578752599596,0.00014045170691579181,1.4151243333734641e-30,7.60405693094277e-5,1.380295414852428e-71,5.701220892152171e-13,2.3379600603070597e-68,0.008290091642993887,0.00042728777249837667,3.228387289800706e-39,8.989468795460719e-8,4.5287489407168864e-32,9.492093538829684e-56,9.520198965279515e-9,0.0015751204393775128,1.1763970634116735e-16,0.24599055369868253,1.1164692681727186e-14,1.2112791746450596e-46,3.204009130918568e-61,5.567820144766244e-43,5.3280461438945975e-61,0.5417145984858225,6.014095831829021e-57,1.1143863218744303e-34,1.7261629496260933e-51,5.691503200031971e-63,0.41101663925263776,9.900938247059017e-53,5.2058916818312425e-74,0.5658660430430095,9.531277740501703e-70,4.5338078842735556e-17,0.03165730918575037,9.017405788736967e-50,0.4207991117648227,7.385660759958559e-76,4.300681161898049e-7,0.1823676337917416,4.61120536647961e-56,7.387252354513468e-59,1.3707076961932906e-73,5.012163892146896e-45,7.986644458998381e-23,1.817460767462016e-63,0.03502869523911781,6.969442331210242e-17,6.712275566354386e-26,3.183136678134837e-28,0.0016642078654502696,2.0825394183852708e-71,0.0011423284294084471,1.8924380913056453e-60,0.0014108783166295947,0.025745182698025195,1.1266643234758287e-43,1.0818444017645429e-77,5.783276530097677e-23,0.5362215656127796,4.562109115272239e-77,0.06274092430265464,2.5632294983397063e-6,8.554510527232559e-79,3.8498458414199005e-5,5.0148387283853745e-8,0.4469440538688859,1.5667478347942155e-39,3.9229297385539514e-16,2.716290927946941e-5,1.8189789275178733e-13,4.0223988724426496e-36,0.5665886090290109,0.02410634975540724,0.00020982852327911523,8.578293617042599e-73,0.1676499763669284,1.5345838335379506e-24,1.2365713924033098e-25,0.03056816573673795,5.040374063647082e-32,1.0666162277777596e-10,6.187958118744718e-70,1.6319793409461294e-10,2.0764587448650494e-13,2.136990687933139e-60,3.607266489901282e-22,3.035263076443074e-34,0.20845321364982922,3.1651529440021646e-55,2.22202819308751e-85,3.333207286272195e-23,9.460239389659079e-15,0.07670360777129477,2.7848202435108036e-22,1.987228620273889e-46,1.3269795690665397e-28,2.1994291824943218e-39,0.5421342920843402,2.0988834299958212e-13,1.5204916078499661e-61,1.3925272661093275e-43,2.0327459695119355e-10,2.3736182519875155e-10,4.768340110246798e-5,4.7130825997478593e-11,4.752157138912505e-7,8.330700715410192e-27,0.05166254752593913,2.245920391598247e-17,6.776288798555318e-41,7.654268489651274e-19,0.00842683286356546,5.357195395748302e-36,3.334405770456802e-58,1.6636824265657945e-47,0.5015311490155223,1.2235782715158304e-10,1.2580850970481173e-36,2.3717258809138813e-8,0.22879579203044448,0.5668342941394338,0.3348148344862442,8.113999992967307e-20,1.1394417687081127e-12,2.329721149880917e-6,0.4099778464203385,0.00632563646625117,8.230821626801151e-7,1.4759400874861577e-21,0.0007512206248458805,4.16580373597577e-18,1.9586683702056677e-12,0.07528548831088636,6.895698019543331e-69,0.1341782941585093,0.0008323326726072896,2.958435553555705e-46,1.8654593039624309e-6,0.543775647332846,0.013468700200001883,0.01898285095463614,4.639162808033637e-16,0.22564861715623127,2.856914230539122e-83,1.1214690061149202e-45,4.2570578480856266e-10,0.0005866494071575239,7.063453040558143e-44,1.5557994881139238e-29,0.00033788940577882196,0.286384182343326,4.111379701305327e-35,0.002646262491510543,0.0018329421689243835,0.00024808925734317883,1.1192587290608076e-17,1.5780885795947984e-41,5.105580949106777e-58,0.1117159641238479,9.794124326367667e-66,0.36813604274222334,0.11562156632635093,1.4987050762498376e-39,2.3600879419221457e-34,2.3529685427560224e-6,2.2536468731304532e-66,7.505306432074714e-26,5.664907371256658e-11,0.11051001799461185,9.758119365584186e-5,0.5271953493933126,3.7149568614598143e-41,9.94591052153069e-12,5.352873144455883e-71,2.4771185853766025e-58,0.015282258810500344,2.252695339808948e-47,0.030301847314001255,4.95371333706789e-5,5.0634611852408636e-17,1.8571017830153057e-45,1.5312883438847144e-72,2.0817456223160413e-20,0.00155752685019688,6.904428201603937e-35,0.0052104178355087466,1.768443597114381e-20,1.4362391010767146e-18,3.000967031486821e-5,0.046590156085443604,0.15678501527144656,1.2620610315486422e-58,3.999779474145685e-52,5.523149295396141e-26,2.807288859206817e-50,0.00813516070057008,6.701403471947663e-11,0.28061263583192375,3.675555445983358e-24,0.16213331554910593,0.050318637900754054,1.906030528427324e-5,5.55520136781485e-44,0.0021569201723994824,2.472923992615147e-22,1.2883458580791346e-6,7.537298923049346e-15,0.00010363884023457876,2.847080793528581e-10,3.1412696310370705e-46,1.7890889617421424e-17,1.804753552215638e-11,0.04428468824467978,3.6313422658038906e-25,0.3590644312346236,3.389953264700556e-19,0.010843380803769773,1.0726076466262438e-6,2.629806953589622e-5,1.404045163872368e-15,0.0030636526544863653,0.02914534161756884,1.0867669176457762e-39,7.558861236530764e-36,0.0014970191148954647,3.962874447744139e-54,9.271046476413756e-34,3.5118024486802314e-5,6.515233383902747e-19,1.3479564396846629e-5,1.4476037555671092e-10,3.741520414013591e-18,2.9965269450080823e-18,0.00033727345531604325,2.023975282594011e-14,1.7830828557081759e-28,0.01680953862722257,9.901185655425725e-32,0.0007229582720440786,2.3874218577154244e-34,0.1499784259919079,2.0661432999166696e-34,9.837259217958306e-7,1.7479725197265433e-21,0.5672292514316122,3.8368660526220553e-36,6.342258309177164e-31,1.2998117799970045e-13,1.2351178389096297e-14,1.2654923892642638e-30,0.45122173103307917,2.8669436968053277e-74,2.544232072581127e-9,0.34741382610022176,1.7711332628499078e-71,4.914377819300405e-22,7.73012075907358e-29,4.560832322618342e-56,4.906208571056544e-11,1.3404880649197576e-7,6.273007986514347e-36,2.026013601826383e-41,2.0108062064201307e-51,6.307743027149941e-37,4.6235816219374584e-8,1.2017666895756551e-17,3.232063994034287e-14,2.1674382075570855e-17,1.4793979468539247e-17,7.064130952384545e-21,2.7213597050354094e-62,1.9653681059880153e-29,1.6854312182669533e-42,0.32306721905826186,4.242019712989775e-46,9.735352236980954e-51,6.103015628795977e-30,8.276020699222242e-34,0.0001786086574424068,2.3775550482027578e-5,0.0002509581567062981,7.71311044685602e-5,5.846632667758964e-40,0.5619106511967098,2.69583430028663e-35,4.991335477452262e-65,6.897469872335142e-58,0.12298968735407838,1.70981756386202e-64,6.506110849324909e-24,6.154894443597509e-57,1.0032977322899477e-19,0.6127601903104951,1.7610342707020149e-10,5.808021725470738e-14,0.2475302248737246,5.022700696909054e-5,2.0225536955737466e-5,0.0027921463063526435,1.4342837205109926e-27,6.3337524119822185e-16,0.3392245018581719,0.0015948830870596824,1.655341151082395e-16,2.7556184822628853e-45,0.008019149670167737,2.64029797274915e-36,0.0012118946098673903,5.133923470358413e-13,0.004256977998580024,6.341056573795999e-14,0.00020403198628013157,0.12684085985102594,1.4480245806195811e-70,2.2228270530816725e-40,7.549498987449876e-10,0.5917521315650671,1.942538832910377e-63,0.014134849732774117,4.4635685592531064e-23,5.986031666734309e-16,1.27251735746126e-65,0.18847064369927388,2.9479516699752488e-49,0.002281542035394146,1.1400623699876198e-15,4.907040744233821e-19,3.56459986375093e-31,1.6237968469421828e-16,2.267402530739004e-5,2.0309133788983637e-5,2.440518072260278e-37,6.85853512727229e-53,7.754891416841562e-36,3.2128138824010926e-27,3.300902387655729e-62,5.151808484803353e-34,0.3875632142382842,3.707175918887215e-13,2.518513004895989e-20,4.104780789416524e-18,0.46268597312739623,6.4630438151535846e-74,8.958368074804e-5,2.4160793118718604e-77,2.1417731033360552e-10,4.0646414339518565e-6,0.3446108653276249,3.988009313175608e-19,0.48500069058064554,8.283555084384363e-12,0.5876219614675533,2.2540009769536957e-9,4.345083341685716e-19,0.38976748731401334,0.1809150550554944,7.4656764428470605e-65,2.6198646312979742e-17,2.526301302691052e-10,5.201513153946922e-6,0.9035735375101536,3.2620028213264876e-8,1.5291377077171521e-22,4.068863382940287e-32,2.8685396102344672e-80,2.860870210027867e-68,1.2894230101589731e-13,0.3794277840876343,0.05961652290370698,3.937817556003689e-27,0.06407381640739371,7.021053922565329e-58,0.00012819257441693815,1.1591776328309371e-5,0.015202197186683097,2.4815073477868296e-11,4.22343269803451e-7,0.010221792173987353,1.5427266030650777e-11,7.094039436828651e-11,7.759477033287228e-54,2.0823335896832552e-60,0.007344707419572215,3.229591842284074e-11,3.1460152190361266e-5,1.5350785905334448e-22,2.6359520616430954e-35,9.352984921259105e-55,8.015651940729614e-58,4.138550929589491e-11,6.424111696770238e-9,2.2538943134466827e-19,0.5297739606239683,1.6508772617520502e-24,2.816721868824774e-46,7.304239742354198e-59,1.0510190540483225e-24,9.046969884831063e-19,1.2551227951471423e-14,1.668703830499763e-67,2.92235494017402e-43,5.180516297894377e-37,0.3946166664682769,0.48381922845679526,0.004913933304939564,0.06296809218245174,0.2579897722412031,1.7294250748164793e-15,0.07227818271403727,1.4338613161166066e-19,0.01928320470139798,2.3061448872785666e-28,6.834363527867209e-14,1.2391829643151656e-15,4.960723969733711e-58,0.289446346246986,0.32951342351112595,0.2937645084426042,4.108609089321576e-40,5.04008914643007e-74,1.1461449581938761e-17,8.90078995002494e-41,2.696980870825454e-69,0.03083396784052826,2.5606038094128162e-58,8.193896409825608e-12,3.3567388894470816e-50,5.338798194964087e-26,1.2637469637420981e-11,1.411725874757897e-50,0.47085278028451577,1.7464056960194506e-8,5.850374272243425e-46,7.242136683408167e-12,5.055028252025388e-22,2.9242821086622044e-70,2.1952992250608458e-54,0.0014930037008271347,0.0025144260030571354,2.3831397010390333e-26,2.1438305708724647e-8,2.166462120556018e-84,8.833312673257448e-59,0.419085968193312,0.03490302438189206,4.262639074870104e-9,4.783832192770613e-43,2.5740266701766796e-39,0.051211682013992885,0.5523345045282725,6.443547507068901e-57,0.007252186069705187,2.884962307220339e-53,9.948935264447857e-41,2.1022147430621525e-63,4.2368672642355026e-57,1.4061501849914565e-28,0.4006446804596908,0.5925783671389921,2.0642038150176648e-22,0.6190260504952626,2.039201013155253e-15,0.0004013428748937397,1.516831576872078e-37,0.003518957708973439,4.0446117924377314e-13,0.00014812914490794268,0.0010143038693095274,5.452305164187747e-51,3.2702512847419376e-21,0.3957662594260663,1.4384722865259805e-7,4.478087064986844e-26,8.503652055809603e-21,3.664125312425215e-37,3.5560915084458875e-10,0.5260871348813538,1.9551602934676236e-54,3.3188727436807257e-18,2.582021380946861e-51,2.0098624121115187e-6,3.2075621672814742e-6,0.055761459644984405,8.802615155512106e-40,9.589914125983346e-8,3.396287700797377e-27,0.0013452578299141687,9.82209450175182e-18,0.00028601353885136907,6.335624307071475e-67,0.015023017250068396,0.0020779980861785467,4.455588326982605e-45,4.298628007738401e-53,0.48162059204393615,8.30172993447423e-68,6.165931661170173e-33,3.759254943537472e-33,4.238457890994095e-6,0.00040019836593932023,2.146765582285163e-26,0.0009380034807088439,3.5818112993783745e-36,9.831777874528241e-5,0.02731427204271507,0.18355381873511595,2.4239518873276386e-22,0.016020767445564896,4.969005476202792e-23,0.230318618874718,2.590043362559685e-54,0.0038686981880586076,0.520074009636493,2.1438751723194693e-56,2.0314169751223706e-50,9.339177417762275e-26,3.1735789810206116e-27,7.170846043554095e-13,1.1385686784281993e-12,3.213085911528934e-32,2.3590158760916765e-70,1.1789135790925041e-46,2.0235139385269514e-36,5.623899415294697e-23,1.672446632519989e-69,1.1225120154642012e-19,1.187450813372775e-67,3.552120683998931e-43,1.9990784478376986e-43,3.153661838968442e-14,5.460523624225994e-72,5.557775871444391e-72,1.8012995305072733e-14,4.500602078285317e-18,5.97253088992525e-35,2.0227644669421736e-35,1.4799776773462052e-58,1.102829598964332e-22,1.1498398381621885e-31,0.011049173701334196,0.16681881866926435,1.3222606336435239e-11,6.387927717987159e-49,3.7687282408299794e-29,5.5868555345781715e-52,0.0021015262642387757,6.121003259796181e-45,1.02473196308655e-21,5.604144748661768e-14,0.013023475705443155,1.4841607094270211e-41,1.6869016536917754e-43,0.04185894245975648,2.1654578925317492e-30,6.862916145864545e-71,0.018218866992840536,1.441906660540401e-12,3.2743018273179175e-5,4.18386500942105e-32,2.0138708370090653e-9,2.3383293108291642e-63,2.6421584353327313e-16,1.8788273497317409e-6,9.46320067903291e-21,0.00952595162766133,0.8250661686022325,2.7797904391693025e-63,1.4794039561777368e-7,1.423704407248652e-38,4.441027959737836e-6,0.10963508275274148,0.09069064932923127,0.5155432202687694,3.802392219110073e-78,1.6440906851681072e-13,9.809130025722673e-19,5.570549252997837e-8,3.5798486902410715e-17,0.04970887696377716,0.00012148940892418077,1.2911048181193133e-33,1.2537392407508795e-7,2.2919339040510304e-8,3.674156673065577e-44,1.713005797576971e-21,1.0113693708299466e-56,1.9701173113333702e-16,1.0244917713141279e-54,2.8316117677529368e-52,0.00044921746097599535,0.32032733901932164,3.1791660865547172e-6,6.01423858954948e-33,0.015022116265999032,1.6151364575380593e-27,1.1298149209424366e-23,0.025054937458674428,0.2609991370588625,3.321966399348323e-64,4.161415553779637e-77,2.3962765752180537e-18,2.38474677204919e-8,1.6052819791288235e-58,2.7817714895723624e-28,7.500876919500413e-50,5.461532398016124e-24,1.4831046411248696,3.592250268536698e-36,1.5129423417654371e-34,8.872111705721695e-35,4.962970504137178e-73,1.1072733922442093e-14,9.142261883906926e-61,2.6810390461438563e-67,8.863781203595818e-55,9.114389392690756e-10,1.4699176901437236e-23,3.3457263969650984e-6,2.8510566225670787e-12,0.027912786635500817,3.366641300156977e-62,2.8976013760057738e-55,5.539227476720202e-17,4.065231948513495e-48,4.723923478365259e-19,0.2398140811117965,0.07789069986528134,0.0001204551847263868,7.999474696879676e-19,5.430417086877012e-21,7.852676488723912e-37,1.6953217384285714e-67,0.05296720478660445,2.912813894600984e-8,0.48360941012374986,2.0934307049766144e-52,7.193397427727187e-21,2.9112806938800208e-34,2.1489712783131627e-53,0.08256952349564897,0.4641325739208911,8.457094510353452e-6,0.28765856219504393,9.241796322989115e-52,2.090373970554877e-37,0.32219106116640833,0.550598122677375,3.642370688013574e-37,1.8333619992432916e-60,1.817483103837908e-35,1.3881485383929367e-5,0.3780301164290989,0.45286341936134955,5.269477745147626e-34,3.4325484496541246e-58,2.931901698560458e-38,1.0618149061709137e-24,1.8815870036595814e-21,2.631100078190269e-27,2.727659347481942e-7,0.06858702086671323,0.513669028591624,2.435533883925975e-73,3.0018189740744634e-75,5.391664318977032e-16,9.693337886609556e-6,1.3792352791407014e-70,3.010391282103029e-41,0.14103623988504374,2.2775346308095328e-35,3.9266964763612272e-16,6.781677035746253e-15,0.1339337584232714,7.892332549696532e-71,0.5677112558633537,2.911651888310138e-69,0.44601174397540555,2.8991747639932746e-30,1.794268708180037e-18,1.7787121020815175e-46,3.590818436278486e-54,3.826922931927891e-77,5.392598459191043e-9,2.4833972405123836e-7,1.3047708321889868e-22,2.3961825367565563e-16,7.606400465058371e-10,9.889912826326545e-74,3.0220104034367446e-18,2.7367591069515165e-29,1.940947357178819e-10,8.830643620380951e-63,0.18134829603113833,1.544638914662182e-42,1.8369887279855597e-21,1.1852139769067551e-36,3.4950510501157137e-25,0.03443434832402094,1.54731810750384e-31,5.5990756908531566e-11,3.2248437543170283e-10,1.7123494403309615e-42,2.241720239270482e-11,0.0011242172564683343,0.002805812095497906,6.633687509726257e-51,2.000653399920024e-68,2.8716678726935426e-55,8.406389500929969e-5,3.5100739321368144e-42,0.09389122117458934,0.0018472914052619816,4.712177334995566e-59,0.0072854707761087645,0.4911114571818566,6.515504159727909e-42,2.5160049765187657e-51,3.9819209456089495e-72,9.235550873965368e-20,0.0017046325562701185,0.34895887839482387,1.2131730924243875e-74,2.588716585467442e-67,4.212133285350585e-73,0.0005634821177443217,5.655430209417273e-20,2.2915750684106077e-21,4.070599741792666e-14,2.4273743036987216e-28,3.366781153071725e-8,0.0431196375433925,0.00135989268362582,3.4853797877357353e-9,0.012294010356317112,2.044475758243852e-32,2.6815823504432866e-9,5.730127104324211e-5,1.1254772387840835e-36,5.0641657902449614e-18,1.2595232322489828e-67,3.5662718073203026e-48,0.019300624350393456,1.3168594325297797e-11,7.679699656417525e-73,7.62692070096261e-5,0.0009924803830294916,3.950755758369825e-40,9.155683390634454e-67,1.3542453922621559e-5,2.7469477078597437e-15,6.9665453778529e-76,2.7377689094826355e-55,9.017346135519972e-77,3.542688887267338e-17,6.420419343455523e-22,1.1369387224873039e-48,1.3222790540399466e-12,0.1302892767826881,1.2829304537277711e-37,3.440700932516351e-5,2.888212992854204e-6,0.5073269513144647,0.04508305510062123,2.9383177354874926e-36,4.503810276867033e-56,3.3641910002572913e-45,0.3196921573958434,1.7481912732241306e-56,8.155761503539811e-7,0.12079286446040836,3.68376052922733e-21,2.3298307335741746e-32,3.400027194112746e-20,0.008459959932394463,1.6885799695137974e-75,0.0010294674293597477,0.06000604215972775,6.105195328327704e-11,0.13709730188234953,3.129134563283115e-47,2.4239340409569007e-71,0.00015897463574737343,1.33812280425874e-15,2.324375232329808e-42,1.1799631059888389e-13,0.4372389026095774,3.908765330679327e-34,7.509162370493816e-7,0.5899721249919705,7.708043648451808e-68,1.4742250755727128e-81,1.2234785011246148e-33,5.966912608088623e-66,8.32136245484648e-8,1.1839932872943214e-13,1.5164347008797349e-5,1.4860674961751395e-49,0.24334107551290515,2.410313654165632e-60,4.589942001157687e-5,3.1084179970646334e-7,3.0707688495980666e-43,5.855046129456417e-7,9.580027374644203e-31,1.7756549040954847e-15,0.000535454282171474,6.870155530501775e-63,4.372427832941559e-6,0.0012145912173135193,3.4565081532577438e-6,0.25894946957107673,1.2245298569191502e-53,0.005968861735406791,2.2342602800151224e-6,3.900218642552428e-79,3.166850948494389e-56,1.3815645704292886e-5,8.590780053269985e-42,4.1843104294600395e-17,3.9879751358628058e-56,2.8217752864826812e-8,4.329227433957567e-27,2.6211007791883457e-9,4.359887213648679e-70,3.198718407026068e-46,0.023861911479270442,0.5209059950330202,3.0099212386392333e-9,1.3697335516866683e-5,0.00021393243428189767,3.026574954072369e-13,0.0071804699814276346,5.343016890596859e-9,1.934937908364206e-71,6.441761566256068e-12,1.6149484941281258e-52,1.5314390236768757e-27,0.07214794171432494,0.3659443328645833,1.4012872495057478e-48,0.023652139995236483,5.686170283605537e-5,1.5936402952992145e-5,9.975524691731286e-69,4.499815258524996e-56,3.760917492729445e-8,2.0374664308063907e-11,5.885998800337593e-7,1.6950357175258232e-15,1.84118086568883e-63,6.705759814054652e-42,0.002415239664071435,6.477541516496925e-34,6.12696997541466e-11,5.979992705693761e-20,7.559229872959742e-42,0.4531420300323768,0.13700120798759044,1.6677672824498718e-45,0.028141515978563257,3.936077691978743e-9,3.785670668969045e-44,0.4500831662839172,3.149141146037906e-67,0.43759060093446767,8.090903041535028e-30,0.08505399560254905,4.386753643051575e-50,0.20031617797842466,8.180396082852055e-60,3.837843379237834e-65,1.1985207245468981e-16,1.3594351253298823e-74,6.525469665643361e-39,5.965316829771276e-13,8.086182746895179e-59,0.2642853295922884,0.03753927139193239,1.3249425488610903e-8,0.030206493588554085,1.3535398018471816e-34,0.10642993102066846,3.945079651837626e-57,0.34906426279678826,0.0024178381651908296,0.00010325879204471045,2.2249894041624856e-18,5.050862170066293e-55,0.28060162832132923,9.929577956779616e-89,1.1278649890597029e-52,0.44261142999355885,8.026649911421404e-18,4.049709397324465e-38,1.0792687483694902e-31,0.00016619282319312351,1.1824061801927451e-27,9.795130405845334e-12,5.563243811572973e-24,1.0572611502568915e-46,0.5599286465549461,0.014961306601062046,4.890152812180855e-15,1.1127447186017586e-57,0.003528568885903345,1.7488942207344325e-68,3.4496586301682764e-35,2.895593665434712e-18,9.067845749838981e-20,2.7284281510420385e-46,4.480011148315708e-27,0.5056871614874255,1.3172482276198665e-30,0.008215827179323044,1.3174630972491082e-49,1.087766357622167e-43,4.420332054330127e-39,1.3149830796151477e-15,1.4186550953059601e-59,6.392866602338127e-8,6.469960898430036e-14,0.5345850935823891,3.986608918624647e-7,1.6079818892414204e-10,4.3608390213210374e-51,1.0676142991743298e-5,0.4086792682684494,5.6795379700227706e-11,3.124053973975726e-13,2.1867227040918548e-16,0.0005222847942847307,1.2972858773321294e-65,0.15587001905065587,0.00011707849530566467,1.4005122712533365e-45,9.321660976043114e-15,0.5510227864284984,1.257763071959356e-31,0.17465931174112456,5.6123904580282e-5,6.493342222322576e-14,9.734654538200015e-38,7.006952181430111e-66,2.614190693684966e-28,3.5847531613811047e-23,6.331542085849423e-67,0.37107690229038814,1.2941640069833895e-11,8.771276379286276e-42,3.801913456967846e-35,1.7088268358494684e-8,0.558765953236281,1.509157432019974e-10,0.12931845510056533,0.449115763322503,1.2835428250703928e-5,3.6155945676620604e-36,5.029543012591221e-71,0.5483708508681953,1.1590326044525272e-57,5.471000757172916e-25,1.0364954574093956e-32,3.560779306988322e-12,1.3630350484707804e-54,7.014384093301821e-13,7.383850549079623e-29,9.711569183859192e-73,4.683968783318879e-50,1.1562063239437942e-28,0.04721465739015933,3.340035626701854e-5,6.507484617514006e-57],"k":[19.694430956589876,3.833155982609946,10.84318803806211,8.18735857815832,18.950778994958224,6.981237191019547,12.765595401878711,11.490731991040008,11.048183659930126,7.106558310504871,15.95452557084782,1.6633694508505004,0.15003714809137758,11.645680608609133,0.7265955223350762,2.902342063667245,6.628812147116032,18.531951599167755,12.466872670602367,7.321077754800602,0.9406609246969477,15.001292306503458,5.827191777283276,5.080985932952036,9.439833440492205,4.675504233861019,14.585120423709617,9.509045267120694,8.648655192945496,12.48495300839608,10.596752550979453,3.086276416541791,5.893094665351533,17.617337357659398,19.474916282977055,4.258766344171772,8.747338255363424,17.803423344779553,15.575447729461644,18.48537766313377,8.262033481214303,12.345994737279401,2.5356775813290167,6.374168833894656,11.5400702726531,14.360431575945874,12.614244180670608,15.678109311292058,14.689090786696672,10.95417311910332,1.5042631061666523,0.07356587150230798,14.045795292284943,15.58020051330789,4.22291586169115,8.41978357611302,19.48599055323153,13.39265298375067,19.495531422906403,5.927643769884465,18.66735253821327,5.190234498980084,9.785786123411842,8.575204085069403,12.657915630920925,18.129953498833085,11.261468343525781,10.397994857246339,7.355888916878133,7.481611901108405,0.6098961760694888,16.703175463061037,11.045949876836803,2.459399586865647,17.817973689085722,19.575967684501677,19.759662747318472,6.0039215557258485,11.686935546695882,5.392332967898423,12.79929745987316,8.03561983696682,16.29878407137605,5.912425125481651,12.521993272146847,3.246021786905011,2.0266878463188354,0.7599216838534462,5.293398369929707,4.350038579093787,12.558862604988565,6.465076473855724,14.101779937517396,9.364093853836128,16.345969037477413,1.7510710345979374,2.315547058237981,17.009603591188505,2.3980824978825854,2.3666663505984697,7.767541573244188,16.671240294441713,7.010770945816787,18.069652078716175,10.17912365803018,6.216012950347927,18.70080507288302,6.287755749935613,16.284701861821166,2.2632489732313044,8.929817777108546,14.431433080383233,5.120866016556711,17.71922401862477,13.322169671278626,10.71928962266966,7.296325432114794,8.875280479642438,1.8058275968562087,18.68720746893866,19.762318330626872,3.2661633171051108,17.89561051044492,12.497675842229148,16.735176779585373,13.167873739322044,17.52389143383857,14.118728328516905,10.9302430360514,5.1354783995555,0.9068893200884398,6.662991889467351,19.402832836172024,16.686062420606447,5.221751378991555,13.248330236179754,9.662262442486602,3.932433468376333,18.626214372701288,8.631316878953537,16.205393345508128,5.4109149527969125,16.860354002917756,17.260741249996382,18.007482373633334,18.35836736622429,9.601403047607175,4.395075950159759,7.5974070625287204,13.822881493183381,6.412067874126173,3.41502204197762,6.2051585469009884,8.71069385115431,6.237714877058309,4.670518366491709,5.154062020954946,11.838800241203465,9.143731679854618,9.660880740663451,14.960003767612363,1.3137372689904492,17.01271933202716,5.794568406173668,19.317173556211337,13.367088380771253,17.58650494873113,9.38222017207921,12.427667836948086,12.278997230582988,15.961326432492449,13.371938827343266,11.22615738592463,12.227823437316871,1.4866065336737044,10.88120170611198,10.973672424965866,17.958027868835092,3.4381947082320297,4.702149432861895,16.1468075195215,11.237265094226597,9.404860720943544,2.7271781460037836,13.421255706699515,9.13989644852968,13.201920810422711,1.4582780108961746,8.764232709568475,0.052696228991124805,16.69432348735365,0.009589747686935546,1.2138025506411232,6.433432561404326,0.9634186417371504,5.3687414027819,15.814805612213041,10.418291088823825,1.2044269505891725,7.682994671389807,14.494846268359098,10.508888453942372,9.249873193299258,11.198656483073396,15.980461667817245,14.333751958540732,7.084485030097425,1.3701060276894639,1.718258787210445,5.146863498932404,9.565176467551279,18.46913676990004,1.3048564844690436,13.624063765607449,15.345533903948777,4.737605972474035,5.108149644973405,12.700100750264504,13.062953425592365,8.518490008441276,12.04210033380873,13.823799001372588,8.41992851802524,13.934350667619778,11.494991362559261,15.221952234854532,10.420330325740142,16.86870245742135,10.920755389835687,1.8687707001456921,12.731409357736778,15.801934706474103,11.145048761519384,14.335073006893143,2.862653960044148,18.799187570551943,1.3772863498598742,3.7146984117455784,0.8243443051460586,18.062720871176715,11.398899012787048,9.923607424844437,6.281964704392764,4.0993871666770065,0.034991894855607164,10.320954079010676,15.89759961308328,15.928275667656099,7.0665729619915085,2.310540751050687,18.275039902864187,0.9550294558319372,19.418276502678886,13.886571067058453,0.18092091939236887,4.9390392615876655,1.2968055933340006,7.053186182086892,15.48849954510311,4.731015285746176,14.854654130062293,2.1209492848550404,11.796337794255848,14.519880750957736,12.145035746134113,10.461044750806288,10.893045202541028,18.715531168572483,11.385062012058139,13.581454174392654,12.723067260993602,13.164017003501453,18.184332901507435,16.553770965865965,17.58824860392852,9.003624374362795,4.991622531793274,2.6567456541923073,1.2702432737251845,12.51729435043584,9.107336155560306,5.700496843725618,2.640104894190114,16.628871030532785,10.900738011610667,19.4710416805969,6.189595649716484,2.7293758964762205,9.462998630602302,10.374227975150987,0.7801699863775369,5.2481309291627865,19.465706892897142,14.400716060471396,19.00610217059047,3.931372765994059,0.5914734083117956,19.764186084668978,6.470196683953886,12.978499889004862,10.991624885325102,15.842921855080526,0.7620386546667923,6.232425371027386,17.713811932710733,1.0114666341311862,10.325388276840307,15.226777914668492,12.026676794541613,6.872112424690848,13.437654951903504,7.159957981409626,16.692077617847406,12.174648629418577,17.373813118064845,15.81296790870963,10.282362065201456,9.289435356854426,19.551244620317902,1.0019027998440766,12.968562735834812,7.3059247280197015,3.580667501209218,1.62977142302688,0.2842872752212733,13.965794904079228,10.068422534505688,14.791484062222459,4.384492574670018,2.3177563639389387,4.89482120808344,16.316604778222956,1.9065742975115851,13.993079401043712,15.167912203278728,19.540159370667766,1.9148506093847661,18.77389567128397,6.414780775215503,6.616614682588122,8.426296088545575,14.577658639242298,7.014321945706712,7.375504487065294,10.002895451208204,10.51938038625238,1.4047137851805358,19.754084748985967,6.186754872801585,0.016515765831206508,17.99934137714308,5.91113534435062,8.408642261975947,5.076516619879801,2.5350496829281477,7.500494901716781,4.903342832560318,4.834449363656801,9.170144181694223,9.261645301063579,8.615235765427581,15.899444341040368,16.17606016099461,6.015018960218033,11.405209019547527,1.5673786036654391,16.591760867899108,6.189061143890786,10.838176422213515,0.692512554434086,9.068104433617039,18.504369565167124,14.900000717527973,5.611664131633312,19.13289204786741,14.433115222860398,12.629659864395485,17.697756767910136,14.649147652229608,14.803062506952616,17.381455316342283,6.711407190894598,14.91326579306904,18.552972281118045,17.47630505115648,16.58907163748564,7.647306088886694,15.1234997664803,1.882113362534179,11.276670656688657,6.4004422895211865,14.64501102302236,19.808248380764283,7.637427509260717,11.754700457275543,5.25541184265597,13.729128368737268,8.470410511385982,9.48052784966909,12.786258628595695,19.437104542174566,12.547531047929862,3.9979730267517155,18.473877259843434,15.982250875695104,4.193087630328756,5.4110853090632105,13.897099617577684,8.542584864342292,16.439639138658663,3.840082848042523,17.261843812283058,13.009603035779161,10.657069945530711,5.099320365681539,4.873821285149953,11.698421839628415,0.45208651935486177,2.3702504934363144,2.9199943448534205,7.540843379572415,5.899033918375274,13.048231584205578,2.404756701664459,8.415566219123448,14.657742921183544,7.65388322384986,19.118450723490557,6.750960994095836,17.02852242311282,6.29671444830227,17.219210052054397,11.168161300247931,9.347009973100743,16.052902119910936,14.788787743629271,12.35737633693999,9.974529406792891,14.13113324079375,6.483227730173127,11.614023324670208,6.873347013289259,5.414960324496487,17.143136801528406,1.9558645024941734,0.5101687438454494,3.6788205300780685,5.385461018431417,15.296533142519749,8.772692114016895,5.535532202819402,5.808025960260008,14.388892550497982,18.696631987773596,16.968109649775375,18.978917398861523,15.692221929205662,7.124268195608527,17.682249459058802,16.2625225848595,18.853145784842226,0.929099325097873,16.43142669374928,10.121229204978714,13.045301513963938,13.880990364156055,0.7380546628407725,12.787115678113734,19.468082203475063,11.421798150563824,6.346183509398071,7.904094362712297,15.281531547464171,16.726084834216245,7.390525532021446,7.444739824354669,0.8869250370540271,2.2195917121606312,0.13124298657214872,16.387537301805878,10.703049465331365,11.836681306594041,5.5799769647745645,4.0473986558128505,18.36573258688261,0.9241147093828905,11.786522587503839,2.070609297932555,2.607952430290843,13.020645933349266,16.44382808559069,11.119471822866945,9.9457128248334,9.71402404503828,5.075767047671311,18.314680475994916,12.323903878821035,8.718914693213279,14.223437156273956,9.7585283308457,2.514476163732331,7.055089394452176,19.009346705736192,18.09814032786072,2.314901353635843,12.72407339068748,7.307345848194471,2.960611568785141,6.854455500988537,0.22203726667567203,3.1076021008641774,12.86889916812822,10.289022192440855,15.62965599228166,15.919137509330517,16.15473876963076,1.4464850815224972,9.532089983845836,8.409526861926233,6.916193885682405,5.092999988636153,9.795851046046199,19.845612652391512,1.1747454104446753,16.087199870281907,17.69081021300428,0.2419827686824494,15.798098045193644,8.784947078944239,3.796564052447189,16.325091160210242,16.447570586283522,13.95933003212484,7.788645784555874,12.30970162854311,7.265532597359048,10.027786070602938,0.3150769798590414,9.563869172463031,0.7948211258190829,19.427949083265595,2.620274458758294,3.821926927384851,14.219638097675173,1.1025387293364641,7.135573357839586,14.905719944575964,11.420373506352167,3.4271088417397655,3.4091920631063166,5.263959318131883,16.899432126875027,11.036477336522754,17.312319311160653,15.03072389176333,2.489866402594272,17.56591156844783,18.812585085014483,10.964041396620248,14.576947454705316,11.511116384408528,1.2242450527853466,15.91579618987231,13.429032548152552,5.433543689578095,19.329814171193828,8.49612705065963,7.561251818668935,18.921500789068432,0.08147361419308385,9.550914224446604,6.52799973267336,3.288495326793428,19.420548934864236,2.1563938681117945,8.408695852647622,3.032931829656107,6.347027056153873,11.13385421984161,18.582170823457655,6.19911392677182,7.6885073831155815,17.020646158748455,12.667408571263469,3.907028223161886,3.580894939914625,14.615998114394838,3.401233103215806,15.255545897784755,3.221576134741757,12.564595428979883,12.688766767797848,17.490391945750442,16.590781289093385,2.6968020625896383,3.5163213939159643,16.61610790002814,3.2774262111891295,1.721964265929814,1.3818209373954948,4.6976675726034545,1.3260629492001907,16.63122104058218,11.273891402585065,17.271927696104026,4.550678592072721,0.7430360387586132,5.8437659942311315,4.490531637318367,16.211777643859865,19.700373995032585,19.803840876410273,14.709809897546977,7.650484746452619,6.756519899384026,18.41775565156106,15.011153038511157,8.048518290067586,1.3397522378069926,0.33014645305807555,14.145001028462332,15.369529678785462,12.50835429559238,10.941269127909559,8.01341228875363,0.5850641323018824,12.760217890059469,9.70815687667856,17.675480172455313,18.897732279619348,4.753898166632755,12.00094679274824,16.311577601652374,5.3895894340837325,7.546703338681602,17.807056782673346,16.405698687400793,9.60477826805933,12.813472970196745,17.406967192816907,8.518983645861994,17.622713997471884,19.238049715788506,0.4277436128455303,4.3748687303396805,10.244689036706305,5.316503064035665,15.692773027254457,15.420116603533675,14.505987099350044,6.627805373138949,7.51752544240702,8.210323997455259,17.53451528863165,16.488278592078515,8.993497441765328,10.751109614826987,17.06612002974788,2.7041966603582734,14.200180793510828,13.680173372717043,12.002409208435676,6.736725651909401,16.10182912534468,7.91286628063959,16.272399076600216,3.006560553525368,18.099137846707553,8.063084247671867,9.186006686656029,14.804273047854966,2.037987395297338,17.793850401064052,10.069623924882043,13.543132156745887,11.14994359625797,3.160589776423799,10.223198239744345,9.309837418379313,4.597001407426973,10.51069075824235,0.3735077368967987,19.53880163880109,18.456343902306365,16.948757690002466,6.734952889793893,1.7899535455544857,18.52556239124773,1.4301372747522745,7.726949194193349,10.2054055952885,4.524245784750938,15.32250380234081,15.268525441098166,19.17268229539978,7.207379941430059,15.767923727394066,16.483520092568924,13.99606862795542,16.712652173248475,4.687519728305913,8.99030063818158,8.32624885565837,5.83685992600516,14.38130332874701,4.3330321021562535,6.0589692580971555,19.152194377428792,12.638375013832249,4.243329425240989,14.305118641894744,7.386417239203094,18.292138057981212,0.8421747189216333,12.38843656245351,10.424867683020999,5.0328291042803786,13.942609063830368,8.46222452049187,13.88241046702892,1.8918976518505959,4.147854818750245,3.7708423886471687,3.4576132730485565,1.702958369366847,17.23189230857966,2.7985903786908306,1.9775594892830695,6.304847225751411,6.140479370477769,7.719994625849864,2.4976900411943026,16.07911655311559,2.5321196263733947,1.1943880893395997,19.824768198516605,6.225341438663117,7.710222603382344,0.5608217045948427,4.920256269903391,12.540222754775856,19.630190493564022,8.34670795219958,6.484510024955945,8.753736218587047,19.253676714342753,14.379636477520009,8.897943538002732,16.2954346658162,13.38422080176513,6.817402564211137,14.697775446461016,6.022265565824161,14.543552520165912,5.0109305264698945,17.714406484342085,5.1153045089590155,6.828002629461931,1.2677028301908644,12.116387603174545,1.0274032831707247,4.296859775683388,18.289681064064265,19.648481226828505,15.2880554386943,4.85867169316462,6.9084887896449665,15.53212744555335,13.701454375018326,2.7777915569803424,12.39258289897017,19.051878985346807,17.369109160879425,17.480822866143217,9.734415347280914,13.13449820277075,7.278299366388312,1.7304525368327006,19.08337809835308,16.891305089295376,15.078897441519823,4.924571497206602,10.12137414913667,8.42966810753162,12.06643154089788,18.1237586639731,6.2062417498321,2.8651480523292294,13.334886139701613,10.838376896618787,18.792887879387365,4.4758625081944015,2.8891139387074816,15.517432790990316,15.248746215757274,12.883153658925362,15.215506098174805,8.846354505853146,7.418634942649547,12.752777755424663,16.807556726974106,12.094702913197777,6.2568384693291845,12.715073267830821,11.730388508602472,4.637926854144077,4.972333585772173,12.247257827235135,13.508743005451468,2.125170046675331,19.701005000536714,18.871311914176793,11.282989018008767,15.424769662049641,8.698678402021397,18.862390315118258,10.021597575289052,13.44041166864896,17.122762759383402,13.777405938102323,16.537580575379653,10.292647511859126,16.971822049365333,15.434010067527346,9.6027450504479,12.91302395111547,13.620226717442803,10.98342505961941,18.146787118662573,15.156135850942034,18.149480158517186,9.658364631884723,8.480698804840468,11.8587620814016,3.664754077141068,0.10673426991687052,14.260486366985692,15.238791781018492,17.591547474070538,4.276299066502247,10.503852014508578,5.480418799880602,17.066359177897045,4.0838090167800045,13.736784985115417,8.917891390625684,1.8004873383665743,12.646838759439675,17.519712621810967,2.054131554928449,4.976708696589522,17.27231995874458,0.47108195706087486,14.828608676060062,3.5660957349536737,19.824651930051928,13.67302219320865,3.1815925622062924,12.37814541258636,16.585914295968976,15.609358006443031,10.371479299722676,0.4859134107669938,3.1193910728705143,8.489521925583778,1.4057075991333967,1.3521784745470677,16.126645948576122,11.282098446771931,13.079297465077016,14.001475243303979,3.069098542080022,17.68463309480172,13.062531879272509,16.098632587871702,7.733426758515711,14.851375738991695,16.582841220251918,19.170445113473434,18.900868971968894,9.40496813672901,11.764000764028655,9.922107897701732,3.66475040459449,7.90501157481827,11.339700481271638,12.298018554938107,13.471779822509493,12.808989166006315,2.055737750414246,17.757456359728366,7.4108063535271596,6.416492615823954,7.9456109011718645,7.049361596829868,18.724415963547504,2.2733114798865772,0.8756264155639526,17.609553090884944,3.032925333015335,17.73508120832345,11.837034928705258,14.117711546014835,0.6385041484331433,12.106444425553558,11.88338503113226,6.838074659226296,18.11732794152735,7.868651470019046,7.028541017508783,16.73273651286732,12.702704252090534,5.9711712231465075,8.432214825723507,1.6338018825020484,3.616849704148253,1.8815017510328769,2.0330966364473646,12.393836588471139,15.10993544279533,12.380419851506463,19.948591199175887,4.388273407562258,15.932121790229395,0.44849032616067763,5.321278914032872,15.548467776619193,18.874759202170132,17.319796698904774,16.626240206336718,16.298413891966366,15.257050718301732,1.581045926350133,13.911786057424212,3.9774099645827254,13.78350686424914,19.271421531119536,4.711058244683266,1.5614075657069426,11.899148591213216,2.125657294782388,18.21142915943682,12.726431836529093,3.7886110188974165,12.36783510354931,2.645899761624295,18.825807192951963,9.761075989373236,19.198562901699493,17.308336539736544,16.89791419303051,4.07722403047162,0.3187542594714676,8.798159201210161,4.611483199653916,18.556921159148757,7.990213646626558,0.9742952072713607,9.718597562414995,11.165429580807874,2.1975871977085326,16.671211415003224,6.3077977398476115,11.631772770838369,8.421773990442576,5.356534332181142,15.86153577626908,0.9666964357687258,5.908778345503265,1.7798229496946982,10.063493563959396,14.366784592975117,12.289666025722159,15.208286573571833,18.470182725050574,7.544111320424576,1.5022622304212474,17.477200218323425,14.27675058050963,0.9454804072892609,1.5450985569094122,19.398268969168548,3.783048660185293,9.084969218690006,9.444906769793402,3.3958433401397903,10.86715680383367,19.081570377936814,6.692757828421465,10.969064241559314,3.4746211928241566,18.394866277469696,19.588961100975695,10.548520922103481,15.351097378643512,3.007388082093785,8.832449095675372,11.210104066951132,7.821496796961966,5.977944328683584,6.174003215876254,13.283246835729319,5.179518014102857,0.8804538341829993,3.918464678611322,7.249279029059319,10.292878059134672,7.1749103114118284,15.374503751651893,6.681011900227758,13.316015268094246,10.930050517083533,19.192378973438554,10.652574764097476,10.490392854960398,11.119087418129228,15.79265496068242,4.239427594633227,1.7558969847026962,6.350452520191934,13.730856987278418,13.690383313087949,5.174742876620777,4.53219309853782,14.029035794263539,18.713307806100204,17.486335596116835,7.19558368389452,7.882185306384422,4.8171910908266335,5.616931489956585,3.5670859358363494,11.492472468881413,13.917830873439293,11.002494498825088,13.51130741529435,1.9069111417066331,5.202179944582754,15.43506007017102,2.414631208104141,8.925559042216108,1.1963161769086694,13.522837724442716,14.435214696595423,13.446500356052198,0.21772350971795085,0.11088419492296886,12.847261318466924,14.317961343132346,14.949319189815444,11.298286097335621,1.2921165602732465,9.264050281674571,4.373388231588913,18.058031826058134,8.971681805776699,15.116218507982984,11.95903490897873,16.214207640748395,1.4712155571665475,17.91550381662979,11.081558201884715,17.074363386482045,3.0945695175262644,2.2555355585672743,6.495118674776377,6.398490362612486,18.368004517232546,4.792572159968542,17.79001149557836,0.44554700086719023,15.049941733120328,6.2736489660970784,0.37819012457664947,18.594918471169546,19.38041491038571,9.687413308871168,15.614166879025895,10.185177971455381,4.598237454803975,15.479484811319665,13.04222926872809,11.747810033759304,9.176403058204766,8.025228391962962,18.87424703389273,12.79275132247422,0.3304687875561907,7.417715640480287,14.39899781012295,17.27749797804506,11.317235457352407,0.34969418352567505,1.7557957698501303,9.904596691289655,14.589045652209194,19.828823924456653,13.217936247974258,13.528407080309446,4.678524320103312,6.843141531647805,10.617287213460017,4.073225264676981,14.22477435189637,0.3057082882526352,8.207926099260355,11.258161802740926,8.89586043756398,19.903606395359557,4.734015435537331,10.749082360022895,15.391104011534393,7.212453914268031,0.9201041664099918,5.390003733997606,14.559932081630782,15.761511685014904,5.217094928656252,0.3834901759171627,6.528227420441661,8.635204811294944,7.005797045638551,6.918775293134738,7.322981509765052,3.111863313123613,19.321275497666225,15.313755980603059,12.680700691813627,12.993656632728214,1.7579704790421191,9.687514304657924,5.694901641379544,15.938126685109314,4.058351941202658,5.298525344213143,12.998808428606923,16.300718421666467,12.814074628263231,19.935528750823423,9.779394745976706,3.8960421162852077,1.6675784609437416,11.099719088015387,14.281511524701415,8.560302905392021,5.575728816771326,15.561326750241413,7.827869945338901,19.42244456908894,10.61914990745322,11.881852158819758,10.185447976988208,4.885818871303398,7.6458578988912995,0.22238689825421876,8.974312331553186,17.166043535533554,12.879068061974731,17.156206009774905,4.747309275177161,3.728359785116364,13.220133392073432,15.556156524355135,17.754889388183585,11.130115499957105,10.021946656014844,7.721371446423202,13.252748951282523,9.582451165943539,10.147967413348704,13.76131419158491,12.740211321148012,12.795685996421371,3.677331188671582,19.238678689086278,1.5923759459961007,9.595167148389354,12.17792417410735,12.781845441739703,1.421264746083195,2.583331407937246,5.6911241506539945,16.166693366216222,7.751771052804721,14.206834139286201,5.269995023083718,1.7003315227536309,13.940703146525554,17.55081104735348,17.474588596462077,1.8049761258184427,11.773973239806486,19.980224522574346,9.801360080668363,0.14143723560226196,14.604011172307324,12.438155350587907,5.803992108684266,10.329745112305693,14.962556359490836,1.0520912209250444,13.436739358987534,8.610894984111503,14.542036162555707,4.9698120113777655,19.260969785755563,11.736760215890186,0.7699356365670029,12.021057956447624,16.66898321935763,11.608712052665165,13.845397431472213,16.246949438806404,7.015225404086802,9.33880918670849,0.7324679636725584,3.9887399775213517,4.951015512454178,3.151472533286128,16.16185179197315,11.294125058399512,7.725877895507103,13.326699725141097,0.7423235744958712,1.0415385731384852,7.880172631633715,1.680758316449369,14.338175980738095,1.8172274252229892,14.938054801846263,9.930011584016425,8.659627702178847,5.087025423007763,5.686452981619445,5.722259635386586,11.374364865006488,19.251034547602632,12.497573797975075,7.400096000985958,6.429308336623016,14.873212662054582,7.46133412821004,0.24839166098880483,12.009214610985616,7.818570599877819,15.034518483094077,12.26503447915726,2.723162093316196,13.792395691938143,19.215721013576946,12.048516990199513,12.784891389630664,5.985930980663268,7.159780883075109,16.065032665039716,13.86757750421566,18.342394151672565,6.180778030321941,15.480920893813522,7.522642257705532,12.024774463179678,14.043626727197779,15.90107343495912,19.108450048022256,19.67745603886849,19.95678708403719,10.567297463079392,14.81529779465944,10.426938320714045,10.805559190540679,3.031336327810803,8.993976031375102,13.51201352997533,10.49266262697937,19.226278757404415,14.655869552861041,3.2313861635927177,18.453619127402206,12.227801682505891,10.424216156814534,19.652944671773476,10.362811358854938,1.6847789634974086,18.717778539208922,15.735378058195892,17.945391175040623,11.10409628111956,12.6196362101282,7.150735979947602,15.177100078745678,8.187943890178744,8.33373385267353,4.811886369758174,8.76190082158903,16.045905475094727,18.95563431454344,13.232959335288413,13.07276936747455,10.503224259035488,16.81791380576144,13.324869761798809,8.21608287909184,16.419233184820644,4.7592836758154045,2.151004894591293,14.3281825649506,19.28925044220771,3.805188707067826,8.98399336897076,6.478771631671134,13.85062208805957,19.493678734880927,19.967890112351224,13.302767890758167,5.863278070787743,3.9591488587468593,12.839799404881127,3.6665768191202552,13.817811546911493,11.2997459476526,6.357856263219275,6.920568155426485,11.899187764438818,6.40955579533887,14.956827043025513,9.056967320585336,15.801164265774489,19.684488131567946,15.719173049982786,3.400445495484199,14.030954998640329,3.1889901846098745,10.792361567063331,10.611488116192787,18.44129833843663,7.962071890924318,12.488645771807798,5.842223095073771,11.644788710977263,8.3596817878347,3.530553463843389,13.37265713968744,16.189247985281156,13.85504753956068,8.684769798213292,9.48363896259024,9.07431415572226,1.4218233756732124,11.237873624167683,7.250560129452515,13.082312217963427,14.954217971689388,6.7281523517005315,2.072586500689324,0.07079505512241013,1.600398035111823,1.9963684532977855,4.745833620032691,4.962667022582554,19.6540028686789,0.2306176497414958,0.8298099380965729,2.134870847387993,18.47733264674168,16.841566706300224,6.265368087366325,15.368021318135355,19.83349587992724,10.348101587697629,12.100951875675836,1.0625275353517383,17.649619526378444,14.771609030993504,0.764300166188745,1.8793683830871588,0.27574221563931633,10.279730916702965,15.720849044626505,16.804363321334897,5.566054458102472,8.911867577154826,19.552748333138336,15.053232832673586,13.927763803179932,18.901735488440824,14.691968210106573,4.4095851076453885,3.217557741450756,12.089457288570532,4.593410006697294,6.635361418236818,15.355094396720098,15.304743861855918,2.16188213252392,17.591746770020254,2.4040497062790367,18.53712867150684,12.949988748340555,19.572104873344998,9.533765405870245,4.879439397803065,5.799696668373868,13.524038083288232,9.477273030826169,1.5695213553818244,5.112827044662236,0.3473601168196483,15.36394022989343,3.8646431424303618,13.235981748530348,0.023721185158267488,3.0932738347519173,5.579851049262308,2.23168457917585,2.5888293350378744,14.23745625331749,2.1462792451596124,18.862553933751315,13.304717960086819,6.962777091356447,0.2736269890936871,5.427839901466132,1.083379136292817,5.570390052260574,15.070266275567032,14.045463900989436,18.180441648902924,12.64679591415824,7.891517076625014,16.846460391675308,13.79140298251681,16.923271737087973,14.551496577549061,19.8887193654361,7.087636867506588,18.95650528131295,12.177993994315774,6.9374728721191214,2.12754279624753,7.272454129439656,18.316344479785624,4.580918748538791,9.768453229716641,11.214469510795219,5.894571308053376,14.83477984105054,16.7248201019026,3.7063284527618645,11.32991626265159,10.178295096304563,13.678764060059336,9.299067833489767,17.678460061981664,15.262836558991687,14.627160777287642,19.386016416243468,0.8101598634708251,4.187762921404197,19.74849385066235,5.501832312423294,13.31044769909537,5.174339226962266,9.023925544836544,6.832442866232746,18.284642237967482,15.109626699734108,0.47747709544351924,13.714318524801339,7.374058234664016,7.489393452821846,14.976678867325006,19.5930188328887,3.821451390970445,10.621611709870166,11.349451171030417,1.1039431330623017,9.009865463815302,13.189939739103128,14.645401176641478,9.682513592253814,15.030773223524164,18.666738237070778,17.684069241327705,5.691678637895197,10.84861401669797,14.366723261274839,3.374194564969395,0.17870127837587457,18.57409214518738,19.152300268995546,12.28373187668964,14.494117421323889,11.75584577303367,12.693379582796194,18.20117058323124,5.9752593059982795,19.53781066895717,8.482213678580557,12.971575141444784,8.187320771206362,1.6085681654102713,10.233510815110627,11.61542200203316,7.602976266022798,4.080932537068365,10.315638067143666,3.4260391982585547,12.451782677934657,6.319967878187662,2.7184924983335357,2.0759330052086256,0.9188677655997157,13.056784937841567,16.51159885933586,1.5614314712255961,7.413908583582329,0.5105594286230541,8.72224323677334,9.101391118152385,16.61773784312818,2.779537424943661,4.038328906033981,16.852372756687082,6.66163953288776,15.677318324493719,13.930480142692199,7.568405230589179,14.083404970994096,8.369533999410015,1.952440344227031,15.883876889813852,7.635855326836745,2.944599789204214,2.733468521154516,14.131784130602142,6.592907143711684,10.233442949281862,14.688697405944055,4.066977262419806,6.95405993779842,1.817899890402086,4.658302782204067,18.197047400501734,17.38494658639203,8.054349395478223,6.443943419864242,17.09451323143417,13.634773242135015,17.53082821158682,19.344165046139167,18.605704038694356,19.017718037250933,0.3203005807522885,5.0290806322029,16.07491759827999,10.710968085617317,10.35486564937409,2.805865560420644,14.955543212383716,0.3032145732723368,18.230788390470565,2.8681499892136886,10.664831699157705,13.262726425702072,0.6866107040499259,17.695233361490942,0.6825492149355128,3.9542483560199893,18.94386403867091,9.0572083398951,3.6961133252713685,15.543378159197342,5.935118378849844,0.5121694260745535,13.492880777767663,17.094097861848017,17.35444023590132,14.900920452510316,19.53222332851501,2.4448319821412756,18.35204343126387,16.08718483855794,2.349270730230466,12.991295040854247,18.28772213182083,11.73590520711555,12.36173765115366,17.6465861681349,1.4178484814522774,17.693894661165054,6.242082425688467,3.3596552583199157,15.641540499107345,18.37581258047496,13.153479902550815,17.2420184301679,8.419676846781886,5.780522340625183,5.730684444871761,15.412831408814135,4.2118750784171155,1.458037767783038,16.22547980042576,9.922435835858163,17.148836828645052,6.029820477481103,7.371812997263749,10.582010367714801,14.752591883150101,1.6047579270468226,12.735087852047698,0.8588687347936386,14.901052320343338,15.981156269974814,17.590421003504403,15.368050244926504,18.61130088545718,18.759314284835128,0.40548786601810605,12.044913369764867,2.186656257923234,6.8980957453321246,4.2780699018972435,12.247988405833903,11.657558031007875,2.449322054090306,7.187292128777156,17.779873162153798,18.24133972221127,0.8167701598661248,13.17992040613499,8.052262047736152,16.940189589575645,6.677790857204999,14.973533438343871,15.205185980880383,15.525860591406131,5.955508798175484,14.242031603581626,9.694509435693073,3.698319732048594,11.172730781785267,8.166668796458008,7.719426902872337,6.263188256425769,10.637225043619022,14.160511300623071,2.0409682754720126,2.563215387124349,14.572351441219183,9.738505649302445,4.82811072908699,12.220205147108786,2.4180695649638384,15.363817617916965,10.762319263387479,5.58995442394151,10.519361698600779,2.0514165070796864,15.150575142612905,14.841505452045439,11.012760136397821,12.58544607239035,15.305769587990135,3.872884088952877,14.253239755526725,4.482472500197647,2.724663782177279,15.716369561603747,9.135041191806952,12.189754308138689,1.999229376177012,7.821972413252274,6.582483468286839,3.041181022208299,3.53653510786625,6.4042606473374075,0.6110535201356537,18.83665969813108,17.098735365455063,14.95749224863403,3.53310485105379,13.55663183703522,2.4365976302622627,2.1948872839477707,14.448311146720432,4.389072305598289,5.562402872993055,11.988927037459822,10.329746325307392,11.716118622062455,9.366841439586082,7.4643357552366085,19.516669133461516,15.299399476001948,1.4647713744934876,1.4944818943057658,17.259680370235376,14.602969959005616,12.363044277514081,8.573688761204084,16.61154658388593,0.721348513519211,4.6618035335791275,10.173056697214342,8.868532383607324,17.7558033031899,3.592304779992501,11.188068157798288,1.5967942836796878,9.906509821273461,19.31822160547242,18.147344496739507,8.190685322100935,12.97040832614444,0.09956924088408758,17.775800553443503,4.666837077696142,17.385678868079687,12.858957453355039,2.7525563248802154,0.9707430172892728,6.599223621515775,2.7623542566126824,5.223931848724939,15.543956618199664,19.311628808599536,9.280691291653138,11.90099446420469,6.8244504343552626,4.171814941181471,10.538614799808549,19.133456293628107,4.660317252151902,5.297310469000025,10.076466886903187,11.784668589732892,3.1195645800091887,0.5311034750742172,6.372150236706169,11.896801006962088,3.710515149387126,7.129188730995302,17.77221375839559,19.827498146389328,11.42899731214413,7.3597248619191635,17.88153167659628,17.17085536021138,13.668920392314927,9.346937289154361,0.9718101066348606,16.875984006796152,5.95675763970815,5.777141202983231,17.70911024649882,19.343434159133768,16.25311332187216,8.948109176211258,11.627957968728246,2.627219114261501,14.58436705053336,3.281559108182681,14.043682569422353,19.98894595451521,7.37161375251894,14.028251815263522,4.10700571586895,0.1050559211328661,16.537205599844462,2.4638416598030144,11.72831676583729,9.304629946406342,13.460791338827747,16.18170430218933,0.27974688754568877,6.786904185652847,8.048085147009317,14.42461876766179,0.733869738816928,18.911349572086642,11.804320956789027,16.26391963406366,15.202269385544035,18.05206448682433,17.271989599324918,3.1121239694544744,2.917672078190763,5.262367081769921,13.855079027499988,16.658167116191823,15.99951116509606,10.621281711113454,11.743440076797258,2.757970904972966,0.5620192956386205,14.838139092022828,16.909956063774484,2.4073581580755343,2.3751743080453513,17.53629502802297,6.534316926705159,5.21579916103335,4.528091245439385,9.63597524149407,14.547051852597782,12.351348743362337,7.973199648369005,7.571861628723644,14.514223859325321,12.482139565629357,1.2778956650878648,6.740373971495757,8.087977759094764,19.644353995901618,4.823243149497776,9.308748159903173,15.40437574739748,3.654989603689147,11.535455059673204,0.5654731626142784,13.306496866482185,4.6321911521637205,19.628024710886454,19.49090447738909,12.443094100440607,4.976914359515927,4.4790823838768645,5.435434874960281,5.453500589275904,3.34706496115845,5.797566916061596,13.178033694786864,19.382491884431168,15.094325221872879,6.45229044805979,1.3432406093128746,16.09495251481413,11.036702206593528,19.16671089186543,16.26623365672898,15.240947535320641,15.511062692848547,16.063767848912185,14.457219587207124,16.738636677291176,14.328564439936455,2.7933950855482736,0.15613579663447563,15.537203991106058,6.331283951503179,4.663718202315512,16.145174216355347,11.625616357663159,19.147741815678803,19.48701260820815,0.11923836037678104,17.029283370559675,2.4229969254360695,17.805057643200456,2.829383020771976,6.928873816123162,9.074143277651139,8.494000552460278,8.748347783909347,8.212729521974204,0.8092580107200487,0.5623962486150713,10.404829718592401,8.820956839168499,6.936231597852487,4.58237455665957,9.50837412312936,5.392196646247127,9.324287860322439,9.051231450679666,18.98373900205483,14.627210355866103,14.65233387936133,18.908033497997803,18.310568158207992,6.236862927905897,2.4967916740713036,1.4230133227828379,3.147940666537421,16.869916998202036,13.820743584952178,8.292924886746228,2.6502398258351922,4.717655429795284,18.72980580725876,5.143454060039994,2.1051345487547657,12.072274575619666,0.626485684165794,5.484539872041392,3.900115716157244,7.159612057304758,0.7043607413514907,9.01154260620081,10.01271042248459,19.550099163437565,12.642323767199265,2.383701732336747,5.84636549815011,6.6945585498532445,7.41782884368726,13.482181837169232,3.675658582092085,4.987183916284277,9.793371764061462,12.464700336534573,13.342957355438037,4.074457652600194,6.672140947671346,0.2461438502825697,15.843176146669053,1.3963601816928994,9.917089353662774,0.8636990966192748,18.719940803166676,3.66196148295419,6.52574098363893,2.639806963512834,4.98988275024562,14.505734026037649,13.997520775901101,2.478237016250584,10.983014397865528,19.297464263468207,6.1539357861169375,8.520845525618048,8.132668713074569,11.741938136574252,13.685007905637146,19.14083318367197,2.268131979850545,17.95772543559641,3.8683386464839753,7.828859101640657,18.031893529701964,18.93264398565424,14.755768184849485,17.335255408366642,6.919664140821777,0.9033683539757797,19.603246269619447,8.04503009926352,3.7792425067869972,18.858633525002762,5.768695041871834,10.357708193149824,18.786128791181827,7.951506055429247,3.219894950722515,6.024360336331953,6.123784327171826,0.06385711556089024,6.76753807317708,13.661385204997414,1.0582407303270713,8.522987538337148,13.948294768098467,0.9829812603555022,6.069058325797734,16.375332257177245,6.971228159398715,1.0780929312259113,4.575979292145482,9.227985446266707,4.582678270922607,4.77803473313672,16.54359962914434,13.433614300008824,10.772543838297679,1.1971391444021906,14.689874328772481,19.151804404612808,8.453016557458417,11.724998058799535,0.676524226669768,3.5098052351953735,16.693771757199936,8.354495299826379,3.595322217026782,7.090187948329203,10.946542914400382,0.41041720754990685,3.551026115416547,19.358278380292045,14.265547413783137,0.34745632106881974,13.21036036115288,5.57656459544789,9.050930040622841,16.035791973610852,0.1701955477052408,17.721775989400328,2.0299824214189455,17.94136869235185,8.105466232007036,8.393074662693248,19.67351994460182,12.843043150421334,5.01378451066905,10.109830052552118,5.204222844809148,2.7518133515686616,10.354053076114198,14.42898294206337,3.7002754208788957,12.175553086671606,12.470152158704156,7.827950639043295,18.214952454881708,2.1976500082473605,10.303427730698228,6.652825240515741,11.12378100528328,8.368218020659217,5.800596137413847,18.367757902112587,11.903769803211057,4.857644894057058,11.963178452804737,7.674239550953175,14.560821156804433,5.202413078471042,0.2731071453903722,14.261164432272352,14.76827682617889,16.103663649164027,12.913366531095413,7.763537025364169,15.773065138663206,7.002969798403904,17.740299936744854,7.719555117126933,4.570198499846443,11.971256089619903,0.2974049303661275,16.328043706295283,1.8557458751295508,9.524355694969024,16.522009495245797,1.8721010284380801,7.908802633543033,17.61721022896113,16.140606858423595,15.611976751186392,10.511162847960499,13.179468669815165,14.221664847781263,8.591329969065026,18.608315134148942,0.8300481948776683,2.61742236434384,6.747473944080817,4.6097300123849605,0.5965228867623162,9.739340116376113,4.492559033112116,0.08665937220171838,19.58705124818421,1.315430640700983,15.48353506214234,12.139975744475722,1.334746603878818,2.5919962756189374,3.8341953218758995,7.449235710271611,15.036085121566153,2.0631911796881086,18.252799980560685,6.770722477881375,0.8927998572585905,7.024814258535881,19.79582824256274,10.733299262469345,4.804762834200971,4.924648088983563,7.647938667672292,12.181197038630849,6.0143775848756365,16.716841861292867,15.807086522108126,3.8383564425148853,5.523068786608301,0.5868919562318586,3.9804323221229243,4.557826235587998,4.315434562663092,1.6495188577569841,19.820794816919168,11.254613975259007,3.309858496672007,18.88951688428132,16.130735507956583,0.3567118122043933,2.075063869245999,0.7551835305180044,16.626321383625886,12.905245410072679,13.472204332563361,19.409695338754865,3.313924025980013,2.9436176425971006,14.677550548680752,8.819406524692116,11.164954203141985,8.422876261082415,19.74500457421668,5.285757412913825,4.375799203711006,15.109899394635491,5.915901308245397,13.411136454026021,8.883976375678637,14.905754237521691,15.259430561778391,17.011117963482583,16.36315707187955,9.753110547829102,11.341023163277386,2.8113874062646715,4.626460136564443,18.966964734759912,6.587056669239608,12.512182985798002,1.886036457972451,1.8835003614502988,4.205844509427363,4.552650163844358,6.273145398976343,11.19267454982543,3.7650020124748673,3.660856137428219,5.511915898027064,9.696469774299814,14.628069024816877,11.716623723998186,7.566219112194075,17.837706193420146,7.596192594121525,19.444733753692248,3.281730037589292,5.777303591241645,3.6310790610484656,7.780435439011604,9.597693420685705,10.594884039497124,16.53342977679095,6.393257946684705,1.4460925627122245,15.986706050764523,7.301761797235233,11.22259429228523,16.606243613586283,0.26304242945809353,9.716441171821021,15.448917100982612,7.642180893700852,3.4896200059225313,8.55708897902911,16.646773273390323,8.929379251390422,2.9015248054691467,16.628517012167862,15.901476042349634,18.887252183441806,19.32648392037604,19.333667213139442,3.3803319031446666,11.50115368983359,2.8245480730718775,11.67828161503897,3.3432606766303063,12.367901629870408,9.764702261897526,2.5754379913345504,13.629019101633002,12.10081931722209,19.29830978822381,17.406834195786708,17.462155835857878,3.1508849770918923,12.920296299018666,8.61259506069822,0.4432993479773417,10.348943930806978,6.89180174079318,2.3714818882897193,15.409557004270521,6.239457252447602,7.989261712400286,1.8786490281134238,16.93145567215279,5.152109757123444,8.569463107361312,16.895671591362532,12.089752697773545,4.05199246003674,17.702768540542802,0.9886763850678015,5.440499443571594,8.253867599836223,6.260035143490272,6.761275155421962,13.557516537797248,14.487451510604465,1.53091224447079,1.2537268866190576,13.12083110482507,8.533913940570148,10.916498082740912,7.693798362869839,18.775441039936148,7.1264020138626005,14.626689894910264,2.839314889814619,10.517313444136068,8.017922972648638,1.673200235391139,13.091201080687718,19.392052776508283,9.726709793392203,4.378416147055231,17.685286637749677,18.162176210298217,13.000906524734486,16.093663238533964,10.76524162252909,13.373186560345225,12.058891144916082,9.06024790285462,6.3078470880630455,4.921774759022526,12.014822310962444,12.74847743421673,13.882166927927999,13.864306406522902,8.485989954194455,13.06195554124901,1.5747886901265051,4.258458339493174,8.220024202163284,9.853324467505189,3.3574575375598004,10.588356441067193,17.68024189130593,3.279137317299905,12.754124285124515,2.226529986309198,10.065871347791774,2.7748123291028293,6.19469269123293,12.457385700232958,2.5975654164006423,12.200206215523028,6.04995440412559,7.583298296585492,6.0511720393915525,4.384403271921804,13.491751725325468,18.0418906573645,19.65843586825413,7.564576762723592,16.045183626813095,8.719450340619993,0.7626882622357023,19.59801963862294,10.646031124713904,13.395167422739664,9.577647077625793,7.8438969501752664,14.787493569252895,4.735717200679237,3.033581889533674,10.177057775605483,6.417697607653223,9.112784851840011,15.388099738072544,13.012707811068175,3.6147914524383618,3.7926491094401316,1.634050259770503,5.991927752285946,1.922850320971392,8.737845473676874,19.49753354953268,18.68846422318621,6.726138071373335,4.969180751195057,9.043984307960006,11.379654821373514,15.269438912002835,5.20703520851423,2.156739259878173,6.057792400071027,18.332929062065556,16.775089153163588,8.842465713648577,6.687364887767604,9.864024601209621,0.8074765261301264,0.08013220791572184,3.0585771529815986,18.81859648379187,6.105572027868926,19.817730024336548,11.355036638570182,11.262360332072387,4.480586397693758,11.788470000387065,13.545248986333199,12.238817526845672,12.115034077325557,15.469505012409988,12.330401360199978,13.081200077293236,4.043656243544653,14.28088790331329,12.206417759339443,7.0940463913488205,6.494203153115179,19.81486705308811,7.6837407890691045,5.149780947467049,9.367084082025926,16.81658428178841,4.380978909748312,15.152320768753299,10.880898863484024,6.796308694799396,2.98910515777961,2.125289384017006,16.027492840460603,10.626358749900152,12.260875386046969,12.168867906907197,16.009469257185728,4.533339236060905,12.393043342222967,7.777953062379064,18.595275330975984,14.973471671407331,4.572213675888528,2.3510363687620206,2.3713659485964467,6.71922752560473,11.361612559101765,9.800113989944514,1.872028406129429,9.457298238056403,19.918158409978076,2.361938285577514,8.631508316468604,9.144877984035915,16.448529846236255,19.836490572007527,19.172161613011717,18.415615562888533,18.015964683360465,3.9920863042939647,16.429073304121353,0.430556135192921,7.4707593977324205,3.350451269143,8.977926930000692,6.898425064073104,3.147436086914004,14.532467468082944,6.013714985882168,9.56880776698216,5.991450332132251,17.555338444711893,17.17451324707095,4.790563101491738,8.392769840977902,13.204731081114055,2.3389777680709356,5.831827864116268,10.213969688584758,14.082773033001823,15.945211775531165,7.944841171851795,10.919230136029912,5.312770879429847,7.319815338385309,9.375507967559757,14.502324842110909,12.378287934184886,4.809356179075359,8.84545756566296,16.88198887992902,13.477581562126467,3.3133572252197485,13.134889050649061,0.11597932607084971,1.0173437899744364,1.834510262011908,1.7037833636302846,12.933300691704792,8.15339767166857,12.684524316737091,6.601010757617658,17.485979729081087,17.596502304858085,3.1409005915269894,8.387396310791107,17.290643009698247,3.174235679127131,16.908951394755025,14.064296755408595,11.538384725170179,12.271000096948207,8.607526600432415,13.485119606791951,1.0602864553433111,3.8125868443525546,15.856708384130268,18.84280335233093,1.7042836028606922,16.139957678702746,1.9742209406750222,9.163007648838391,5.914003706063542,8.18671370924041,18.294194474123245,7.370436147604171,10.498138418701695,1.5764354162910754,6.23880282090318,7.6783190211485275,3.295194983639833,12.365867998257634,10.950245706960153,1.26069153196942,3.023717594336315,18.47175746745318,14.874665759671842,7.218484936786966,2.3797099764267404,4.581142597420396,4.85561679038959,6.711764831680829,7.185101243074006,3.9823668784231048,13.254182263343353,10.596465878941785,7.4205890823867104,17.35299864378368,8.411204423910569,14.739768273409513,18.763592036476172,0.5063498386358356,2.092207704639626,15.775149562422076,9.500283302974527,17.972029281169473,4.5136450486371915,16.642903740270377,15.212056881512357,16.48376485249049,16.84674186575372,7.16615898515236,1.325051728993989,10.9299967222307,0.792550053496095,4.890968496025869,5.433242102252129,0.3980397553106174,6.891473984958685,0.2615193485612499,3.721469834293325,1.3689157735549617,11.179598439723222,17.63273789716734,14.313758495774866,3.1627091947141306,0.7572825700260521,8.063985266305952,6.943641616516247,8.143047828802414,16.192007977673377,5.764122920655819,18.37042966955096,1.522516007998025,6.567665489360639,0.7737747514499338,6.4721423983124815,0.7707487063129204,12.238419538601804,4.142828011628845,4.561304045608825,14.350782927764687,15.013296650584955,3.939699120856326,6.647747024325179,5.533245286943238,4.19688821130805,8.96956745244388,7.20340288791991,3.747872093052389,6.735448237004635,8.6232085638512,5.539811158394392,5.774220035372624,17.99688447811174,16.67003712083099,3.6672828137124602,9.98699073300575,16.170064435067424,11.423627067068715,3.382449194532473,5.194915125511992,6.288421754947664,13.834697342285068,1.7832647153314962,5.674603333222179,9.08319529436261,14.184513534646586,11.72083362183647,19.19992351972709,15.00193409968421,10.826676013629335,4.331627083229974,5.500542235191097,0.20873875817639664,9.275101579924634,7.706847313888652,10.830170376085583,18.212055901934367,4.259848949017138,2.955470703850862,9.274335453696736,13.64704698980228,19.554036095196903,8.365333436123024,2.258366005785466,7.532862828050888,16.120316832280484,7.702486475458494,4.573349989750741,1.2214672626584866,18.714607610931935,1.1061830028508268,8.682119143797053,18.4709090667046,13.311946135330048,16.66029132925231,13.307184816912297,2.8478933833023,6.325646076510405,19.24340739104004,0.8251673170995577,15.741490028364629,11.320158596447811,12.73183261226039,6.7636346842796025,15.228110362712833,6.61300242557167,18.92546923704233,2.2638765796409155,10.259274070442101,15.08715304844792,19.666079248889986,5.5653202559065695,10.925484712794935,13.016707835712488,13.598924885431227,7.48920526132431,6.171739450472313,14.309493037261678,16.51501440149471,19.93902581010412,8.639276771353494,9.938443452445647,6.032202924052594,17.959169038357572,14.644248484646884,1.479896155292737,16.365814953490432,14.488707035530837,1.4288326159209541,13.859861562057908,2.2445006390958655,1.4485703440005437,4.557954269474327,11.23945896632177,15.495339509916523,5.729274264686284,19.75354850370423,4.206701365593459,19.211430905046228,12.384159829999328,13.469380954383357,8.63359404953139,3.630004360937167,4.149280854715651,5.1864133813512625,7.5433700378688195,10.196500291245773,10.758604638965018,9.792801061186601,8.722452280260242,13.883618628512465,0.17681814870660784,11.883082770382467,3.65565126138776,5.349869332292796,16.12899483744699,5.983918076889507,1.225331241163028,17.571005585414095,12.340296785666736,1.1185136911564442,15.500164293546339,11.119466770205232,17.580742582329044,1.1301686017691948,15.629776785755851,2.0562204892979796,13.977539939385736,13.385329508574188,13.093722809729611,14.193263182963154,3.885164083468462,3.351576320675016,19.73321356869754,3.21019647467061,2.4938598513463894,9.611322823984292,19.921075081060714,2.040599760243782,17.12060928792908,4.972918011454368,19.948180659386935,12.151290774165489,7.9056615240262795,12.375004229069674,3.431836439192777,1.6169347297641545,4.022542183144919,16.783910482477026,2.1383323111151498,7.98448922900739,0.014597834349023842,7.654853783583682,15.96078078880339,13.515205568980129,8.609679435814153,17.255848804563776,18.697662910049285,15.763287603163615,14.313140340621251,15.28873630336796,6.775192342297194,15.405996334517656,4.987841321450861,1.0721951947172048,0.7072388317462242,15.625469677011118,0.7050817567311096,4.780662917238883,19.845896141260084,14.670975155716729,12.22553427460321,3.3179733067087325,14.34255670305038,6.027265351060906,0.2301210836802703,5.2941174506487165,5.03011430094956,5.047539455479684,8.73283163033273,9.007361731541303,19.685574302318216,13.066700712881886,2.587773307886736,12.98142222398651,2.123923114203179,12.180259173897362,1.7559754258666116,10.092997775404093,11.034022101180842,5.508368541557291,9.186013729999786,17.05816539916645,17.223232396451095,7.885563081652331,0.7612591151131554,3.383059048037036,4.40306339735435,4.898734678216052,18.247566924621417,10.855124910988557,12.247326744251703,5.592799720163111,6.409030092173502,9.947450195701798,13.339426253002028,15.413484620476098,1.6282288896786223,10.786056705194706,14.647521917178526,5.0319065562457155,8.394501708036701,18.130947588689132,14.841676905417938,7.18532265859396,18.988995900019,9.276847973399448,15.677931730916349,8.337204529706291,13.195197956421438,6.471104310081115,10.85047422647477,15.406385844847922,13.077625176656674,6.120237066973013,12.34069659400471,9.047908485001596,5.361958511763332,3.505631806924052,18.993793990168033,18.5279751517081,12.64106990638405,14.70365710789542,11.104183465792596,0.283985340157491,14.790025160645852,19.994897911023667,18.76017378355528,14.234038690447385,10.504127895522792,13.2901368168312,3.5360121369944197,16.77741213142181,15.580628890731148,9.570866383036494,15.422749351682477,18.89164944211381,8.166038433787062,17.082457443653638,15.752535996215059,5.418807585308909,15.857246650451845,12.289200681810861,4.093530527490983,15.583135900559526,14.885246366248737,11.256036597590132,12.082206756070807,14.801504966147201,9.672701104765364,12.258803455291325,11.965841955888026,18.55570690894438,3.6123356006179064,17.581974781361826,8.563829801424031,3.7144092414028407,7.074661635045363,5.391265394067268,3.4284448553958136,13.010087614162668,9.106249074396997,3.2074565295631485,11.160032277042372,16.86686317858015,16.8320708479336,7.044651509101567,4.006839425887367,16.92595500657673,3.9006462386250895,13.267102617054531,19.81471433107551,4.762099534033681,10.625535344967293,14.989847658628776,13.743915083916312,12.828157384534954,8.412111735840275,11.162768947181988,13.42625607881251,16.891097657315825,14.256477765313678,10.119791728635278,9.25168287744809,15.314729556438422,3.565207597064921,13.905176511054872,8.538231219686526,16.791287802811958,4.806951587574768,17.77285028398691,0.8007677510699152,6.977398877686358,11.95941311918508,10.197234057548915,15.923300403836866,12.903985651708325,19.937970053338447,17.470405316510238,2.7548326373627274,11.223600630142322,13.528062907628504,13.821540983005477,6.014792243329108,6.6203269646678375,12.286160799373626,14.436721016159503,3.876208205396181,10.664175946942386,19.084287941586183,7.6542789265841105,8.731792452384418,2.32510786254307,2.766026303973681,6.683005972513336,8.658365406531727,4.492173269028461,19.172445045975763,19.22258598160812,8.950022064914393,13.295122771253087,14.464519812170792,10.089474618440697,1.6163409559176456,15.305374897725574,7.383977497187719,5.235488282793979,3.8326179369977664,17.93405598496946,8.6125845401412,10.138342757069584,9.398260294669125,12.030808953882378,7.038195091154229,1.4917855053052964,8.086090273142936,13.126030055584344,13.319141539423892,0.2826236973485452,14.102775817086863,9.458389196698098,3.9487362112251567,6.506653550178014,17.63601599509458,9.838753294319469,14.870262833557128,19.020020219736253,18.819984805841806,19.988358541274103,15.827051994906615,9.161198543985876,11.090272703335211,1.375000275341156,3.4425146855737454,16.97761069091158,16.506916895360476,13.518050824714262,18.49943730205004,0.2764382208291849,12.733063284851308,5.89365715363825,4.34621489573082,5.664689375089953,14.970109207564688,12.793712598920454,16.877134917716113,12.514428999286874,13.64548470143375,6.024304471008692,2.6651356805294713,14.528644558147379,7.9385309330573195,4.235542800503671,18.006242840769858,8.797822594706531,17.41039660752793,4.736341726173796,8.180135261017508,7.8643420044363666,10.178291834328368,3.1893897003613647,1.9368215505691833,3.3409666475198785,4.549669346916367,10.5914435461905,15.024562919377242,11.410528026148405,17.03620929395673,5.901982290994976,7.709801741659565,10.374783150293654,16.744251505249466,19.14162182250155,16.67168955117933,10.461869641679652,17.678476514055177,14.548734861067864,8.012759649109494,8.310867556876662,0.5326208379591657,11.670098526332486,10.687261959187534,3.2727885251572486,7.592500017095274,17.379223190281273,8.100344169231391,16.753253073608633,15.299731292736624,10.8866908728888,11.566174950528577,16.88898812226071,2.51489242540043,1.1667587092812415,16.955952831731178,5.554077987457462,6.7476666316413025,19.43618890421105,3.137470921465604,17.858396664383047,11.716626083044549,8.627998780593721,9.087044704336481,10.839780315030655,1.5932678712217552,2.869536464741218,2.173738252814603,19.61562999559756,3.8904130093576272,13.180519204678838,14.478819876684167,14.626864719517165,2.158733919706677,15.652349762897666,1.7982820521944198,19.408136453161244,3.3372362732492267,5.365753543961671,12.694104318057855,14.67050505584606,7.53392589579057,10.69889411426856,8.836932390076559,15.34303755777454,4.506507795370185,12.771647332894531,2.974453549570728,16.545971949998908,12.052243132664442,16.17851525924078,1.400642157303582,16.45136181909951,13.494356924049953,16.314872360129755,3.7274661516780005,16.212676886841038,4.773542629764802,16.75208389843196,6.946129390559959,1.700055342617488,8.911444382144165,3.2474594502749854,18.62799008920529,16.523776144251002,0.41981919156615977,9.130090377254675,5.218367194984315,9.888368696292812,2.2142594350994527,1.4327485782639782,13.639971255410162,16.209462716107,16.813607366626513,17.19879830550436,19.059713372099743,9.339684179918049,3.6272138456428227,0.8544324407067361,5.430286861323794,1.6946034797286025,17.6622398247233,16.191035431746993,9.454639077099722,2.7602438786545402,10.325272180697688,10.476604651185832,18.988778529723525,6.249121911494373,6.750073628319795,0.5905637152092025,8.331609051351808,3.1807578142852844,19.796285011783663,10.465408869734564,17.473801054256196,19.431818858950596,13.101467961530737,15.395458202613268,6.832333680668898,5.1041183304377125,16.322372912452835,19.720348719277048,17.905662369345787,0.5495962498200235,14.381753583940053,3.1693998472626284,9.584614058167213,13.33644571732846,14.68113187901535,1.2810988696964687,2.08150456344784,17.390032973957513,2.5431150236517652,5.809569927682565,7.919458291234318,19.489244805228324,6.803465510767639,14.61866064880275,12.707989142282514,2.7120331327014524,2.5319337320903923,9.18085721024629,15.59809314688847,1.5939062182457597,0.7536560104849643,14.424226001282271,5.435299340105844,12.997202268195185,16.567332420843567,1.2023596963778038,13.747387250013139,13.414050982009922,19.717349177419862,19.51693324994602,8.992861543111935,4.1825278518159426,2.961151734599845,5.516535406657734,2.3541635772203318,7.649402932326228,1.8047179822521242,18.23822031940083,7.727670273826512,9.82750999144399,2.7683771399034462,13.18981712980241,12.60216644434745,12.09778051312249,10.990055808297292,13.580076279172228,1.8403201719171625,3.663179790798292,9.56776648897662,10.760788479932032,10.23375437524583,18.56492188211623,14.579431922192141,10.023258688198343,15.55702466023238,8.416456876169086,15.154527292217384,2.3830524346359594,6.1984105131372935,5.499970120500874,12.538431333992449,18.65153500138232,11.646342891442494,0.40258983430579764,19.092759519565053,13.798452470961845,2.6188962575087693,13.924315240204535,8.808998006079015,19.878439872070896,19.98746052324713,19.624920778520153,12.576646408518911,0.9122776602456417,9.220218633685322,12.016789806644145,18.5014184052247,12.493058580594877,16.49111067348672,17.604081044538745,10.697601506113873,15.617386491157692,12.801804687838864,3.140647135306329,11.847628541744616,3.7317883625698656,10.38818487550051,3.993021973310902,10.158481630829463,7.61404862942801,18.232029907794537,18.121940843668796,1.2038858204541958,19.74909802953594,4.643924783952493,4.779432912479034,6.00416921303748,19.472418232343927,2.9721381474613517,4.168610697641264,8.473811293726442,19.33173305249383,6.711977903436508,4.411734626796462,13.778678020969384,18.49558554578637,17.969403326175506,5.008973676590229,13.269522714985289,3.055006290738982,10.548009125534005,8.967751127421053,10.54800213826519,0.9907896343047584,14.87894882448272,7.991696021508354,12.921146667407427,0.3014255401084309,2.1597567693241526,6.966229781709394,10.147009663094156,1.5151356901738389,7.773574874947946,4.607204128726643,2.017227816374998,15.406959888878543,13.298519368785433,6.793943115225969,18.954203047719442,3.4046650841198334,2.028336730603053,13.05045324053442,10.024335826790395,10.079250398832919,9.088108579988692,12.047801799867406,1.4162012417592207,1.3597992743708387,12.157004315428722,0.9703653127894052,5.363618954520986,12.21908082453314,2.801083298096443,8.313859672487274,13.400906024150657,16.29821983636489,11.981997875094992,1.03002501987278,8.87931623099512,15.7376265389343,7.47477256583561,1.8348937314380809,13.815818245701589,7.846758196646206,12.072752367908581,16.42651808247433,3.4361188630241912,2.408540026315076,0.9306254499215205,15.813276932631704,16.96469076310619,14.662763768246503,8.936057285095451,16.857058680735424,7.3979162612933,6.283472699234589,4.076224946253584,14.28279460129907,19.87104959053765,18.122789630030923,3.0921953455391105,13.489014875063416,16.68086352269257,1.0255917434156903,16.555514721834243,8.095587261818622,15.319739813618295,9.320774369461965,1.2176976423731567,14.616951696528645,13.888725898390831,13.517825416210174,9.196594685815977,4.84418474149007,11.613130878163531,3.7106837382570346,15.484693046450534,4.984595016783562,14.746674405733046,19.00337348735402,2.5664701051651795,12.454672652517562,14.466857945784252,13.45511887970153,14.715851685346895,13.94251151073503,3.8220896404929405,6.691146533480623,4.0277680287907325,15.054630266950966,8.690292263228772,17.849455866096363,6.4651181111261735,8.744170910749984,14.629686347029844,1.1554874486985778,8.498266410469494,0.6972725742816221,17.19942014396735,12.371493021839054,1.303334132663041,10.468454279749896,17.09853006307248,8.466446921343822,3.0336251729564223,7.657983282833252,9.141356968874067,12.283018885808662,12.232815459610315,8.717808392962873,9.614577369589199,5.672913467907903,5.006672123254807,13.162958998435581,11.94767415841065,14.670330049789374,10.419535547073146,19.28882441655678,9.936417420604112,0.5745687338052496,13.366130695679939,8.120274642303272,2.018765630742023,18.333468571707073,14.00873813739877,11.621431714105675,7.8921438647594355,9.723590820717742,6.085788285704377,8.288812488041465,17.656923597846177,18.75014386336329,10.404440721164733,4.623332544250589,6.680124703322345,14.551389579484884,5.730624473183266,18.7562057617507,6.410291304481044,0.3086117098106067,1.7438396067662598,7.810698489502368,2.1832441223801435,19.623030638843506,11.262957092463001,17.453923726135386,18.569515840118967,0.5699407366162124,11.448418115689577,7.987510295476579,16.151281413712656,0.6167362535071685,7.955501244041154,12.72620988590858,0.5871017692566438,1.4425881310849498,10.353013022990991,10.007728486158442,9.757852425744634,4.845481663570275,18.76730352083562,1.4922538338584568,6.470535403747428,18.522566962543415,5.354091772488623,11.940570054283537,2.1707027381502186,0.34097657472003995,12.56606451483011,12.020196631750618,5.816725399556111,0.16403161626686646,15.286490143911582,10.982664405339246,9.324883489511286,2.5143357534666544,7.548648785401797,2.9852160650060444,10.086144341704317,12.853306721952084,15.039917432215475,4.277223888215587,5.508725092851647,17.362464058008392,16.893980958037393,5.520802077754223,0.3647797148097043,12.86225938418809,16.348178102316957,6.354816040062605,9.763429851399422,0.869116189538266,11.986427642580626,10.659017418327599,3.680534959059467,8.679383569566092,5.6594318950850875,14.84099323341496,9.712909215121828,3.5616226715128274,17.93906855475477,6.972134743952125,0.1394722415148264,9.05083652318513,8.663544392103608,10.846628379954225,5.395919768746387,18.915170628489047,7.1381256751335,13.149655775405936,2.3323874085764595,3.528640644115222,2.643770470908917,11.193384642835923,10.432697535610075,16.065205338253715,18.77400723864512,12.829982094059442,6.109755166788466,7.151680946847012,1.1999835056716757,9.570365022915151,12.241063687337416,10.79223212791996,13.868567806728036,2.7965347904709192,5.919507190322126,16.461015882452074,4.780723063068564,4.651951843338176,11.589445426760502,8.6884244664519,13.200558635425708,18.829817693803573,17.67886323083283,9.845006976004175,10.320337154630073,10.689692972427594,10.580304585991108,1.723212147507196,16.31470304585129,9.318939539355986,0.9647495683649998,1.189780789617192,8.2393880428226,18.984361750034125,14.402217898787274,11.268957715648478,3.7369974151633567,18.046296796080966,10.075357881836258,19.642206219996897,12.251349103561541,4.885855339701561,19.81056455559106,11.685565253302794,5.086672643257222,8.256090990870813,7.002690127578042,5.935560311441397,5.038055783718138,4.127538464495473,17.878810094599164,16.739809545316465,10.004642021600997,8.992574662426232,16.08388407831797,18.116846055890008,5.482960375210366,7.6314716981068775,10.740148897733901,18.0429379072905,17.10011427175857,15.804262906677069,13.327254409146093,3.064230643030026,12.567910934193023,12.88936145343377,1.1225853000467767,14.321507580174151,19.55473733651113,10.861148067753712,16.3364634667486,16.370130521360498,2.577769430082242,19.490072085722836,16.13232048534823,12.200016108050624,19.51269625327376,12.881536488215337,13.462482919202522,11.966009634249932,9.937569271988838,15.475204896784337,7.77146419236491,19.85403722003916,1.509867695002285,14.831433495510655,11.910952084259009,3.6167742020073,11.50544907128683,18.60999841881192,14.937583371394627,10.79329565174557,14.16362185699831,9.732867911921543,7.151095222213981,14.30931274502376,17.156930411192644,13.415065049490206,5.776923965752823,2.6206235313424076,16.52614505688895,8.3027760222493,13.91513643488356,0.19992198711302311,5.883001484019017,15.351869210522855,8.77249519244144,15.60522449033745,12.92298606150808,15.696315693634961,12.996931039546498,10.86254637250811,4.194341983182381,14.198295755995694,2.962703069307775,19.16104922934595,17.27865913805786,4.560681587692743,5.806683424684684,9.764781027958502,15.93560212793986,16.251374216277718,8.969398063221705,0.9713492139889723,3.3701890754590647,18.369294319111773,13.426124372409912,4.386896711821717,5.775631587286574,10.373638797549267,18.639422315625808,12.545494789131478,1.7358208835637923,12.636541041605206,7.417697332368198,15.549293068224284,8.34039123179223,0.3325920787422598,16.965164713296986,6.896375092005083,2.33073070041963,9.36008444991061,10.533338318246997,9.615918882388165,4.349655522758846,12.62121260060535,7.5076828051753,9.602855363192964,9.875257139643177,5.773516993424304,10.997940642445894,9.866205117326112,10.511931671314114,7.978785315237573,16.70056581097334,14.316961812075801,4.305965375342455,16.83171738833018,19.820809221051235,15.537071751356887,15.810522318436542,4.788738923352565,0.02796114159789198,6.963249466965897,12.59099769216457,19.264302410417958,17.2141261355708,10.785286032083597,2.3801232652749604,6.9866295518936905,9.066911650911141,13.40257395099147,18.220694774945155,11.362913693338474,1.44275795511843,18.10795620945575,3.971369900814574,7.177615204477488,0.13737155812866053,12.343427902653964,8.2357057561177,16.92184646510103,16.546284671014355,3.1745023749036916,13.020931377909871,8.247171910920317,7.197533860243905,5.951454604515574,12.91284946744685,16.179789839495715,10.63148868016205,19.444851676271067,9.75903323610309,16.22502078531494,8.121672577064194,5.054504349716127,6.358989703892064,19.852729384649244,1.337838124629478,10.03708296399028,3.6555701596831147,7.247313422873276,5.446452776865991,4.1428257521143586,1.2414492268961252,9.945862054569673,7.457542455880444,7.034041103593038,0.7438897069672823,10.616504641575904,18.104198477776116,9.759002523321612,12.236276687597796,17.215480244833724,10.268878854692547,7.532329137759777,14.871739041381327,10.565626397083566,3.902158728044567,16.599517622287998,10.940857897774517,18.688928923441132,7.584889558035148,7.98691335066926,13.594457610945732,19.68129808491536,13.024884086696499,2.244782006835675,14.618301630265567,1.3960811491693859,11.36387128472602,9.913773499613692,13.51133324774568,1.3336665032942818,5.522551944477141,8.211546142166362,14.252209606408442,15.126463229306433,7.694806102771148,0.9536755224957005,9.078240621641825,19.108539560256517,16.080993558835658,14.754834495631165,18.713062196311974,3.275244121580907,11.80947324437363,4.599364752963089,8.921200175087876,8.168496609395891,7.700163210646731,17.125249838792136,18.856653294401564,12.631706843740464,9.227062617952999,13.624766923652384,17.328319278337915,13.688363306395823,8.164326327349837,0.009760744452691483,6.47732982858142,14.44717191775406,11.223253001198499,18.01324520978257,0.7702937532197973,4.02466095526528,12.004017712903865,13.821115941948161,7.675706489264895,2.918424837288578,1.1379852165342719,17.1114460439751,2.3936255178274823,13.010005738594517,13.798501420678807,13.603955378618146,16.470285315014117,7.2054522738472215,1.6138149756331055,0.3893993236968507,5.481838126341798,8.429303992658102,16.222218297386238,17.022079342781282,11.813109916416789,0.9023138403884934,12.498106966061373,13.556039960705046,9.08976372373231,4.310974251017807,8.044677050672178,10.927400378672596,6.7111644952770755,7.469108282188777,2.3410251921908953,18.534631505832383,10.768431345705519,16.448575706985288,9.132665538284899,5.819799373007357,1.6227546527666448,17.696689461378515,19.058058363291806,9.260078558589996,14.055784337100313,7.301882593845668,8.30860727087356,19.0803511693262,8.737325093094398,10.810700516467882,18.24212641164777,15.697359733866993,6.911101281405401,8.0352810580974,16.893484250669623,12.292647108415817,6.322697787325029,15.863376939482293,17.957868533387046,9.066536724963798,13.584669637450189,8.478150854158448,15.005179217068495,18.4050058472406,16.181058158919036,11.180479499102143,4.02045306469069,17.770507927626547,5.019339194005186,3.0036283345272663,5.466581551451002,3.054236675529398,4.039949231905182,7.688666981821735,6.761808300926089,11.842599912004413,0.18545212578031656,2.177482752491944,6.795291684229792,14.813273964162956,7.928722095776863,16.052434641841327,9.473004599049283,7.7668395785339595,14.321384863075242,3.557934069784765,7.1256034051016925,19.90307858720518,4.218634853952725,8.43560779572178,1.0072827164237497,12.326764820538841,3.5596875998099797,16.51321423708929,13.149876357597424,14.626351568626292,5.519851346296316,19.851140846567432,15.692960634102256,15.990258435345414,10.247500735377395,19.061741663439342,2.2202031982119497,13.755495436511044,16.587054899577783,5.8285956135614425,1.7249259599312294,11.853899397849496,18.65430531864505,2.98347378105972,5.974656765906539,1.9530848215460228,0.07086321517660643,16.024472882567565,15.6605355552535,15.779515875013974,14.43492332211624,17.957892058966078,14.594640227084792,12.792565063060511,15.78832800711373,15.182594351381123,19.404239216202015,11.293585136710615,0.9103382663973658,2.246078723192868,13.25659079245105,13.551709075470786,2.1202776828576475,4.249123582724033,12.875973939186029,17.292377098548357,18.25455838222443,13.765951404978418,13.348489324671737,11.474840604500983,11.331429542437089,2.9087486916240657,5.4369574634563556,8.921389963932857,14.583176331987415,1.9094263829630176,2.569011335378284,10.515563642955495,5.514993824707446,17.13675940994717,16.406548266953838,19.900135167238684,15.122249932710456,13.045866725426421,6.257422512467676,12.775616682853816,0.9424229754559432,1.175599261715976,12.665360512333447,2.7580977781786986,7.356252717549325,14.291599245511314,11.634007568160056,12.862868192425543,12.094808255104802,6.041894845160347,18.623981367745483,5.261041120077867,5.995272605545057,12.071607190033049,10.101179638413612,4.0137237446877005,16.924132671084937,17.105354077490293,1.3854932216988658,13.092693220800125,2.332220832368641,8.188448444344484,11.205312701259569,8.125883020961382,8.792767085576134,12.507059894214962,17.167723728330326,3.178243294060641,14.381095476853698,17.92547656981736,16.08596727854451,10.28001048806499,15.898642886844453,12.49525816715201,17.35543406453356,17.341351922143666,4.9996874279338055,4.393272788504743,8.116501995116945,16.975365928825763,7.941446429988894,16.563716519522412,16.999642219257108,13.90338309747888,3.209452628978684,1.7775210153872623,3.759672665804068,17.68325196736122,15.44423692483333,19.75952225706456,15.75311929915513,11.958480949217707,4.408024425114747,11.650949342055782,19.346495519341,14.968101680765047,9.60023703763758,1.2846383744296563,8.136831342280626,2.5438917114979454,17.539953830370727,19.003781737610268,17.355634971741317,5.03028511449974,7.698314920483029,12.095325239298456,19.505547041165222,19.799870721350775,12.488790399728025,15.68124442050495,4.832075148219026,4.542706565408707,4.61838635686223,1.1263028093692729,9.552573219007726,13.21878253972355,19.4962141142725,18.470714763569205,12.321052243760068,4.050429157240227,4.218675737683126,11.11135345448698,9.326156751861507,6.193228206364307,14.811977992882412,15.123432601886343,9.387426052412732,13.286173263262405,9.451306598853888,10.119440758051152,9.354677887726485,18.30504210058741,1.7685315741404306,8.234794583322547,3.857442081957756,7.80025050832629,6.29368033028582,0.7249471724376999,1.6539330459320523,17.214303821546572,14.667499238582625,3.2047654281374083,13.813493733852354,10.042644338976032,7.086780465766029,15.259639509483653,7.04966066908141,16.65002400959807,15.304342314666716,3.156300444340654,5.893276740477131,12.02634937223726,9.964275153052181,16.49125545882655,15.720951705766293,2.9627461195105287,14.818244035575944,14.132872648406849,15.361363549090727,1.9572898269211647,4.1797649833744455,0.02655493629621475,1.5249200197660207,18.34305342859578,15.260954256837298,13.420334627702516,17.313705396513544,1.9533845306531017,4.75077523400945,19.33917223704221,0.6321629353752156,0.25008795299654274,7.57489906904683,1.1463941661201238,19.15772379800088,8.618288859609372,12.56496763663639,13.643832961341298,17.949587562318733,0.14666599060315644,18.36332305376548,12.507990132466148,1.2778054667052663,1.2413801496615795,3.1975210225938255,11.421300689945046,2.3254048906711233,14.5447391170989,1.8939406665797698,18.393550795884916,16.394712428068917,14.318458636210899,18.509666725309387,5.095233957591998,18.44451056126315,0.48195138585342967,7.158894277276717,2.617709998218234,6.818687377873491,17.9079105654224,15.805648613098287,11.357668554673332,14.540500569796947,19.735151808280555,19.05647506057334,12.613197049449646,5.160514178272835,2.840436651499365,12.380880530935471,6.0077076579049615,9.916942138158333,8.429741497320054,19.35467679956821,14.048027865300714,4.994499308214211,15.876503587959355,4.1261352929226724,5.344858454827595,7.005921893386011,6.997233928798696,16.347654605459244,1.8237713173789505,8.331030609132846,11.37943511250942,12.495757116413921,10.125150361564064,8.557883249682927,3.4084387718377185,16.645901779229114,3.312102933874179,8.807498820004005,19.452514183647736,8.369781820361162,3.1174741518134708,3.7192375342251838,4.0711840761310025,3.8709512315719996,16.228579747456354,0.34639218119569826,9.431995817234991,14.626940521126631,18.14829777886619,0.4824460439593192,11.23883217236596,16.973794136660633,16.21600437245946,5.8657935571036335,13.649797600481438,3.3119465929173897,10.452528021544962,1.5160202902945263,19.725101900991227,5.4287270606790194,11.457907571715413,17.496483237608217,18.398872497874844,4.388729143756636,11.180055250275611,19.66775512849061,3.796244419037267,10.517605257689837,15.631323374952167,2.747348556060385,17.230680166562745,11.788164411502851,18.246729498896237,12.332842997308857,5.298114651413273,14.940017418997655,1.0057706213125162,0.0861323021592364,7.592826539748021,13.540587770559092,7.2386330355811745,12.896975668034552,11.09522165634234,7.459152096627117,6.448865597768787,18.777529242301043,14.455166446995094,3.072070222601573,11.582111983871828,15.895427289339707,18.48422473138816,15.471874097653519,7.177018476749302,19.591015936196932,19.452587393136717,13.733675763887337,3.0158715051565776,9.91846962442754,3.995017018581759,18.267621502433478,6.987618297096447,4.632135116352791,13.671790643615935,10.087007416732439,19.59983822586659,15.62127309872189,10.018886818535195,17.149033971970752,9.846435344209091,0.7918600994446701,2.162388191157749,7.860650351314131,18.184931713396058,8.699862853893098,12.674636800062778,3.3931809462712836,19.127506942990145,13.919944960262654,10.674925876180946,0.2626415141180205,7.402460097757375,3.1034879120220538,16.18071562634175,9.989897203368301,4.605295669848601,19.90964656489124,6.883229380092546,10.515221573335566,8.820110740227157,7.190794016774307,1.9591774125176675,10.246029130516444,17.323896699919995,1.9393232162524487,0.8268067834985349,14.804717372591405,7.413041459529932,14.009207548777077,19.914376199634663,13.706601625716335,10.050763155084681,6.112340342297693,13.399880119349895,4.040360450936511,1.259961837692991,9.928523056148357,13.963268784556817,0.6368759199110707,3.059114076666436,1.4644556031644473,4.020749724320449,13.775519295204376,0.665354030320926,10.538649956723427,4.731301965639387,14.02726446565337,12.588048891955538,18.385365825497377,7.575682919290627,10.534860255950779,2.334458748447479,13.588092618148844,14.059126042801516,15.134305799407333,1.6335434750814137,15.654870574302521,3.2055446021389677,19.196857114051255,11.172638510308154,6.642553319437607,4.40549633622072,9.896290720296804,7.933731555644359,13.781608883335092,18.07173246752235,15.730223638005842,9.808955081155911,17.60215555651935,19.977609089954566,8.264847481471275,19.486627902808756,15.609913390683431,3.245384235717288,10.780545801933235,14.167057476830092,9.544592340390189,3.7724297603319723,3.9552511463637607,0.8952623923785197,9.634382851829688,19.148250854871232,2.31908995085782,14.502550213646664,14.286791165139459,3.9687628935930386,6.632788745360698,12.259554052588344,4.12228626741161,2.4062212911087677,6.87350462718884,9.156347334020602,13.215493764839245,7.544127232046525,13.286716520402027,6.354192769621427,10.078089932743413,12.519368696966362,10.156394698135657,11.59186162787777,13.699069858685098,1.4121317347444373,11.893924522662203,18.782870238745577,14.51503583673782,14.685444720799943,10.742781294798514,2.0416954878359217,15.033177447863988,17.150901763304628,19.88261653464361,12.758559798225747,2.4363578047211476,5.867358594267205,2.034637169941438,15.643597100850828,1.5553237113854523,17.805968789111436,16.63826058858771,7.0781834833108,1.9059096850825519,16.864549181779008,2.53221347443787,14.819961507814462,14.440763641068912,2.5337876496587075,12.448985743170887,1.5678981493263455,19.379184103004437,14.84196345755242,1.4488801826062092,7.266459902551863,0.8404347134687695,18.527531369721018,13.936185127395749,14.424726545856451,16.141336975344657,1.6497981973745324,5.257296533682454,2.4596627717086195,7.869609350965554,17.186208634427025,17.042059676246474,9.916768217818891,2.9106128786005936,15.715184978816655,17.333946585671754,1.3660760310008113,5.756194837132895,12.935206364567907,1.3388223386108722,3.9577360256226246,14.71302717079556,12.077933807067968,4.033696687316262,18.43616428333066,12.379409555761342,13.979451378271111,3.089694564392329,0.28976334415343974,16.649319311990798,18.945103125469373,9.005347414121182,18.862131849712206,0.06044516522120347,10.715894576157945,1.8711120026668215,1.4080965139789203,19.74789685454669,14.430837287573661,14.620582452978738,10.7542110021347,5.200697759939503,18.378460186858213,7.14377180815851,0.529397197922794,15.850711871824279,8.302396184863872,5.220710421667798,9.829025693626328,6.742878702279023,12.682601829979209,5.2343501426151295,10.94675564834656,12.291158358309486,8.506561724774615,12.829906501326992,4.532637273705529,16.32151685984629,6.210720879305782,15.477598636344005,5.626722019868784,8.492962666179483,0.8138117227033037,8.6272245803191,1.6530522538488324,5.4566532086814545,11.04890840940068,9.966266055066843,3.0459875946594606,15.178588302199675,18.703491001618357,17.068104767964527,19.30867343490471,3.353022614829322,15.911276520807863,13.091684473971714,7.601584551812484,18.274685459166285,16.268032488547334,9.122110761223375,6.652778886513033,2.511611980310726,4.7642909831045,0.2452114715338105,4.597202571685588,18.98275468901485,4.504556449542392,6.8345313940585095,11.427376735917969,5.409203449255293,4.133105392888918,4.416795843730679,8.068378858532688,2.3936081260672104,7.293632823829319,13.907274052902219,14.257728195895947,1.5797203473356713,2.5226874174160185,6.082758806328634,4.154277618484583,14.579426652376704,12.521010545353665,2.702200900171583,11.995223798386792,0.8383878240415754,1.1972628733246582,9.350410083596632,0.18623492945625486,0.04626438046346326,8.400225302423472,16.092110050182814,11.691168934897949,11.68345628043497,1.0038431590328178,13.504963257887713,19.41072619539578,15.596946152447885,15.104981341687743,12.810785028470274,18.865745398953628,19.442605142183712,6.543644885565785,4.835778069646932,1.3968264807974728,14.191271077340208,4.746755413322172,4.926119054178577,19.49475180110123,2.783779144995653,15.007115035284233,3.7334598754534953,3.5602993025949337,14.59846193764999,14.80218000098558,7.292422490667079,9.597580300190845,0.44748760617689953,3.575967996139826,19.52861574778256,12.876999072399208,2.8698258374613372,18.242056776554392,5.153138354177131,14.817190641295031,12.756105352558222,9.895010510406985,4.221690676161987,0.3190788551864543,3.2917118498312226,5.334816267819247,15.86363137733735,15.185643661862747,18.76361292800418,7.2806153279774355,15.818874267691832,5.618718851663842,10.963757684374,19.778792819030308,15.981498191885809,19.591201674559926,3.683839622053271,10.589210441848333,16.11107395531709,12.591763562026372,6.863138144588241,17.620405830163325,1.0919051581483208,3.209236544098535,6.923701187236184,8.16443835670376,10.006149665874911,17.02038819430978,13.812260111888106,16.60136770565459,5.758976301530145,6.473190641088156,7.448766375322471,3.357100352216955,17.336435681934436,11.338742262893607,0.7267653523676598,5.002559526726147,13.20515762813228,1.585174629655688,16.88129743304486,18.663391422564782,5.301517143002843,18.232822226614452,9.255032107035266,14.866905443178165,3.433754829003579,8.326970446704411,4.758229433080348,12.917401217393252,11.473803717964785,2.068495147033307,14.158483583853553,12.585248841527076,14.042074346223433,14.715393080033543,9.82851089549834,4.573531805280546,17.717091487671862,16.41558488526018,12.71347263921228,18.35286087838144,19.289088707355155,2.0579585465016725,7.968476836037772,18.401946470830765,1.1361285546398703,1.0537807171576352,17.842344147827145,12.506161108125497,16.302235571174375,5.667147536328669,9.399311434059374,14.556595215302366,18.246270721446322,9.911905550495629,13.94317654729495,14.882357820696978,6.720242360121418,17.573250712227882,12.337322907943232,4.586579766519123,7.429179132735366,15.663038082581107,17.970940451082807,11.994770189941285,4.193205426514468,15.837045024619014,18.58033265789139,14.733682695555345,13.5651314970548,9.497851137168137,9.917895706392805,13.377985930501662,12.916031547257578,6.504520739054409,6.607480992990222,6.583199840355767,2.859405777266395,1.4346730737231628,0.5774209321846646,17.36053980108717,0.10613617695520272,11.719550740980234,3.905321493869276,0.17282538782264822,11.2539022332402,0.7905079714850327,1.0841194161231016,18.847028951080482,0.3262826033531496,6.090515516645616,9.23393113000845,10.210333794499,11.65439225457626,18.690498666761197,2.5822733374293616,14.048522041171832,15.341920663341808,4.23946695192047,1.1436556712095314,14.19959132169485,19.50344555108363,16.255310448606703,11.895248214491453,6.779444850825196,16.113497697102545,15.780067670261424,4.7738333496090535,8.734510099025767,8.684048706249708,9.436674817526555,19.07807538559538,18.648329720158863,0.49655934627601983,13.649153577138783,15.276431968433464,1.0926624164226162,2.287718447343634,11.340111598055973,16.02917464560889,8.822615308489507,0.4382040770047446,6.398535429145524,15.844405894995566,17.404899903286285,17.008895503643995,12.219800508289671,18.913659902658587,8.771685709513712,6.907339679711049,8.675717298482532,12.195979921066353,8.724909791681391,16.10785097844252,5.924191981748015,9.068906836418051,5.693025673109577,17.59784828038585,4.1851424439536755,18.441499059491655,18.469440796468724,9.9691921048493,7.049955959099092,19.64975376332017,7.059687924963356,1.3673508051441763,6.807195278874469,8.063711896408861,13.925893655041,9.729770801561006,18.069378020294685,15.60423286729339,9.183741603631539,5.389605155573727,16.245286663892088,4.071848382824248,14.769718194002106,14.733268557958393,14.34171016260272,14.80938840203307,5.749321026362715,6.347736609488468,19.389405494356595,18.709359315220468,11.41332353613057,16.600806712493878,14.769602655637408,2.92293004543676,19.16728024546069,17.147522317442277,15.601683802352909,6.483487604314271,15.841094158994187,0.05202809900782146,9.813854829317648,16.60203350749368,9.086262790680228,15.857677276126388,12.254632710245762,11.375987828373283,19.777540377318314,4.125677394876712,3.867328086586528,3.0360707515381247,2.263893112417543,10.49350704308714,1.4222712204314991,8.154131133402881,9.067367376769436,8.266235315566096,3.7409093630270585,14.17348969234078,9.6675338095609,15.726347332621348,2.224642831415089,18.141436491260656,10.904032458591445,0.25381047501050524,3.9221921250199543,9.43609998100401,4.290436447830084,5.546105080964372,15.78153031283945,13.577180143386972,17.667015134522916,11.978013025288892,18.093709080118757,0.055825591744649294,13.187391010302116,14.423942922995018,1.6722505079496797,1.914994326966637,8.293626710999344,15.491405416195736,13.486502338110707,15.975477837833196,16.110249828284864,11.291014542090082,6.114157671248246,13.186730582145088,15.809715468720334,0.39120466057230185,6.432066935635157,18.027992522072363,1.3368255137268603,12.57446110341013,12.57204403809396,12.068749474155776,17.918096438380285,5.472430579932572,3.5413252332336587,12.996192376862012,10.97738665300238,14.084650531633516,19.479877152958398,10.442428596247172,8.13605836966039,14.842908188448076,9.549933353776359,5.612681219223692,12.231121358158749,6.461956992490454,4.56509984040951,16.2659331702121,3.5397507286761387,17.71258936048437,16.822946872584748,14.574911230345226,11.71179607812952,0.4163798388520856,6.120883563985862,12.93183150981934,0.9292560603865052,16.09046894923811,9.878769811949901,5.727663275800174,17.76997850487159,1.9432221614543188,9.064109304278452,10.496108451278698,3.919742325509974,14.490651387892797,5.032779901799409,7.4992791216513455,13.951455805733136,0.6193645155330829,7.2813935179536005,0.17029304329175154,11.409412499169092,6.129583899137443,9.211954326380592,17.377918488115924,4.1842613986418575,15.198394373626254,10.50608273369738,8.764948709393803,18.382910672233788,4.288409620017264,3.329630056927626,13.44550721078367,8.293162008172065,1.441903519989336,2.1149626434589974,7.847985612782846,6.1408833953076325,6.886970833198021,19.517793581401705,12.757679322077413,13.032158583452723,17.237663636584752,7.150177643134525,0.8992188024470815,15.60009952337789,10.396990749087301,10.219319725680954,17.19698043470101,1.7938489902205657,1.1041443010750784,13.603432881231665,7.576619972747509,16.68593966813897,11.718887850820456,7.683993181290019,15.960023786168097,6.451750000691856,4.777577773218105,1.7354549377154393,2.1310710584926973,18.31446578375601,10.314633756323271,15.586977793810913,18.822357243099365,11.453745339287176,13.988995338914552,2.445539302394133,15.307439614487137,6.353332345712395,0.6439115197996248,8.690751331733741,13.501932858656108,4.1519135626425685,12.578079634390882,14.626918668642897,8.416768288965223,15.965916946430099,2.0495411948351405,5.351201330754765,15.786266321715964,16.925832277619122,5.627183197800658,5.997908423513776,9.41579696155566,0.2683655373001681,19.392107085481257,13.419371987444823,5.405409787620554,15.715726695701747,9.8700276083646,2.09124159355659,17.780592600736362,1.4301247198278544,12.9861028430212,19.16713519697258,11.043705637114023,18.110200778247,14.43250205369007,11.940909338069346,15.537417279235065,7.735854029868134,17.83333064149342,12.599069078399587,6.134856384090095,19.823982562713155,16.97145512565179,7.420196418166709,8.023120867119182,13.516901266879557,15.716480644018755,3.98529131880065,12.473709574553244,2.106630481370111,18.796500099682486,3.6051322786055096,18.64704812161829,15.7522012425716,13.304189012938291,2.5403214342880487,19.80683073906464,19.4845403979659,1.8580090785832803,15.125549388270318,18.075241803382426,12.02830550728208,16.446243775415734,13.698902471760398,18.210029467843434,4.203146580093868,13.11344462435827,10.073277775559717,8.40154519141755,15.561454671773042,13.613703165126596,13.197121891412834,12.564958592267317,17.797555510131758,2.952437341725327,13.313850982250756,17.593389600777915,3.2441094859237207,12.089103221790625,16.70265900224748,16.156784654021962,1.117238191455061,8.600888399231344,19.844560097395636,8.582330294066312,2.3128593622599736,3.6158900182835207,8.113165558561821,3.608383662197112,14.181728943263106,1.6505212172929928,17.44964099773725,18.91014971190406,7.63764439789179,9.149050458970297,11.2938943208718,4.7652937301037435,6.777970558022499,15.48844848143251,6.928683205121304,13.191625037108983,19.978275217960086,6.572733931676105,19.905025955188158,2.9660609155620055,11.014574027017092,1.4873433000965486,2.1875753363499895,12.036214382090433,17.566867378123156,17.20470793934983,17.425009509875856,8.519011119022405,16.593971567257885,11.530039500539004,0.8544777306372131,0.07938890565488244,18.700263707891537,9.320498518727902,6.996158812265114,15.884127483369998,7.013137882116536,5.213666870490594,7.838193837180509,9.141851001593206,11.7596295535086,7.786283572737296,7.094121084919958,4.939646022975919,10.247918712247731,12.82645953220349,12.023104199805449,18.367502265257553,1.9828905065450497,18.106267822229746,7.936091521847879,3.949838552046905,17.658375985470066,12.723818969460838,10.56749201350128,18.529124237071294,17.00787763643488,2.4729349130006195,17.95978474713329,17.09543065591181,14.857824694803018,19.93137950844869,12.132993238072437,0.6769364453962012,0.5422294081488976,6.918915681050444,19.557063223634565,4.885604747788377,7.785459450875445,11.587728848241557,16.124478416026644,16.589424095410855,18.54464298843867,12.408640959484721,17.02115446537865,13.00771780206841,7.44986287916769,7.06085374141713,13.769171256735975,12.819852811173948,11.776984647186918,0.6312686745835272,3.283087606284183,4.09309063255217,8.12182136381618,7.880081021836141,8.93774964097576,16.36554759430963,5.876985895424696,9.851764141879018,9.534942921954212,5.608128984314926,3.3243972399493593,0.07595425509284048,9.847978114112902,15.698981571199537,17.772717294648444,13.25104768879472,14.90127037758743,18.849307274979722,18.606791688477568,0.25716188094437875,16.942228498872094,4.752448163637757,1.9485594856806543,10.644114128493602,17.189456067448248,15.475025645594114,0.7297005742238705,5.93057945135818,6.832784697259995,15.22219945864126,15.148516318190204,9.297595163010186,15.516648315617886,6.411389923069302,16.49790882813579,1.4993024307141045,1.9528102528915259,12.177791817598278,3.7604827083903514,19.82660797158241,16.264794731459734,4.556902206833229,5.798643199569868,12.5978727149724,16.614652251204273,8.04237654877268,17.78393342022657,5.437042414759672,19.9848474973794,6.747595750738862,7.1421531522029635,0.6040619085433496,4.320154217662271,3.2261515600762403,9.127719805235678,14.63967189029173,15.306047442511353,18.652683988014374,17.333543672782014,7.89657002675785,13.092724099915944,17.57811702305169,3.828971658832132,11.615568091991687,14.994144168667415,19.628636256959865,13.911245466266609,4.349663959386918,14.925670503521076,14.52830413127948,4.392634017401891,2.339043406662058,2.988538850800766,15.609767478825031,6.348848811529342,17.798258817569653,10.517571194740448,14.515942429957537,13.270824162233739,15.070196909473314,2.1854493761700056,15.497231709346755,18.112210313023137,1.6816175005987732,17.280178627564826,9.687770300292996,18.42799199506362,16.454434024858266,6.887025111453942,4.325279440113889,16.215685640555755,19.994354747970835,10.288902341601208,3.907398189737936,3.375518821634631,8.311948388451874,15.042752467377355,6.015323229188896,14.879248531307837,6.298610219833813,4.3869327631540544,16.80980529230458,16.05349936748938,14.378121315177253,12.02484144702324,11.887099936885708,17.97108707626162,9.838065967880492,10.297872892813494,13.340184876267314,6.9510945939289215,0.022372482503976165,1.2740387593531688,14.729615729107817,0.04503223026129266,17.47642753162706,17.635959652900567,17.06530866431391,16.504661214777737,13.663546531300351,3.7505627616774895,12.672909570547617,5.05514378121692,16.70844387579629,16.760308539955172,11.053800843523192,16.17271722746848,17.898006384300725,14.33562100685355,6.636381612209705,5.2363207336184425,5.248315163098081,19.049246752095492,9.502087822865523,12.22976078217043,11.58516518799329,14.323350103209368,0.010410466111561156,17.131164718787172,8.553103104152338,6.213629538071377,6.621426927843603,8.489214956061915,16.309646888096175,10.162748818768318,3.549916237343096,18.817194268466025,13.868710945084839,3.041035927541871,19.10331367136388,5.538732906631245,7.437601271782244,19.812305480095095,12.970200902919284,12.193513157859472,8.843292694901361,8.158973798281949,2.208511369310009,17.71870317671423,6.056232966654487,14.874405512410327,3.6084933722398382,8.493216984250886,5.748706134627208,4.436763675171607,5.4647654654522615,9.77081710505975,8.724660357886528,11.55737330555963,18.409807694047636,6.728195878366412,12.438735243428436,18.908957810572797,6.001513780281376,0.12611388733631212,5.91046177972649,18.080400590065814,11.779731882427908,9.379889265581314,2.162746822960999,9.798418408203391,9.265879682362307,14.79223237242984,10.23821894599562,18.36034760997729,10.869358162467421,14.58760989055535,10.593969582563535,0.600308251239654,12.302541146845583,0.9185144096881048,14.269210097430975,19.66800888435995,6.196840927078884,1.3451112354344197,12.35630718937443,7.614126437816129,1.6598762571377845,0.9446385822289782,16.854114473291876,0.8265858781796442,17.05407805575709,4.0442348889308155,19.964998311055993,14.142051251440897,8.806852293909774,6.430278472955293,0.6826324993071697,0.20218803102034943,13.919636642045647,6.776017223163953,1.9038377671899287,14.612552342756068,2.9566710750407132,11.025801450348682,6.652665779768472,1.8060667687077014,17.13607964329388,12.049967112492372,4.3790227177007335],"x":[16.936782417979195,11.45642484170995,5.020482804781388,13.326625519751524,7.074485778411481,13.07015025872413,5.649003146396554,17.096379404817597,1.0965083071891613,16.05547853291595,17.741491045248896,0.13344546087677323,14.537262894074177,9.203255221570906,7.860079666354434,1.979402491998492,11.960197798442081,0.9551913890092978,15.464315339952211,10.695323180337649,10.491633255732928,17.611179843894966,7.265611014999118,0.03686435594356219,9.133836817000667,3.804542133521034,7.334377470541584,1.0214919841777714,5.154883116046354,6.135351765660073,10.160855876716553,0.6587431164496849,0.6268124837835698,18.590617537965937,15.838778616594729,19.39322957512608,0.1768674649794333,13.881764008053924,8.155402906596327,14.00630147436086,15.063046715263035,3.4930131954784116,19.7790843077407,0.49149758719474246,14.453739094463028,7.237759134992916,10.680325244928426,0.23769828325700182,4.231204582128676,0.5719642525576774,5.654599779016887,18.456302710175745,1.048918720709766,8.617277712794325,16.815631590623383,11.096918299868817,0.5743389969241663,15.917216172015177,10.082101729362659,1.451732660003091,14.683043260868466,6.23861155193334,12.34005489761515,4.785078532303411,4.560820293449757,11.624573913264062,9.806007859850823,2.416564234999443,13.490657954579248,13.327369105229629,18.962526383472962,19.294400413646592,7.435889857197728,7.606830979757695,17.12428716822923,5.370974977548912,2.971307617245449,6.91777912714155,8.153730246531197,12.736408574130188,18.194598287080687,6.645670036634752,6.55751210457487,13.551115298513249,2.5356356643449773,4.4778033068270595,4.89856412005401,9.362634679088426,10.73540901900194,15.853704897417163,0.6341745421658684,4.119084608175321,13.414525900971217,2.8810763608672563,8.49158493411839,19.450739077385855,11.248018764994017,11.018855667196767,13.713239216620195,2.09973498669219,13.645477355437826,12.930694843538815,4.119772348987687,19.881504224846246,15.317329623758074,1.4572194818348105,10.103709100391303,13.492712107194302,1.817682910020646,4.545326665823364,11.36433155841412,11.48249699759801,14.966046779475413,9.568434464901987,15.221093575844037,14.518264525875523,6.6553968603237434,9.109393695077053,18.92701519533393,17.809000031632607,19.935046441813387,1.526504357004983,18.37420446955801,2.5505161629275896,17.825661218092925,17.81119444241813,18.218713816044346,1.3203059338155043,1.9511691552710397,19.049536083587604,15.788307895813531,6.811102643075051,2.684766327232553,2.9192800562260635,10.223082812692702,3.9505187997664493,16.448332714946936,11.755837017949746,7.204678217138261,4.889020010789054,17.472932195327928,11.832253050669204,5.7145834314246535,12.124220643653514,7.341734026838633,5.325852063912211,16.669171681555774,11.032901140552589,18.714682025785187,5.912994720528739,17.282703500720373,6.349286479031138,15.358399327014883,9.954336576880376,3.90146817867961,15.518788548363487,17.152644971024948,5.337369645542376,9.0611621468098,12.072355955197924,13.715123524816079,6.015670054109292,15.512491109928206,6.14104471075406,6.116747557536,17.181544995366814,8.530261199859787,12.328462069993492,7.301240238800077,5.663981245577303,8.98477455168161,13.0800189045611,18.191258965531336,15.883925823911081,5.194272870412298,10.551392819064102,5.249698305021853,14.839030842454303,1.2187908267487257,5.291523237461813,5.67955877095899,1.4018022968818888,11.738456236490284,11.859611741514655,8.771426521339256,18.799373840182007,17.449081581419378,15.120819130895281,19.853886668031464,4.149313317761578,0.2101951503201338,9.436805622510121,2.8880004034914153,0.6415120621007508,18.680861794980054,19.847266304927658,9.06789596403299,9.650052797289202,13.784894107193498,14.559607080843978,2.1713371758845135,2.3404851736532484,12.333028897615232,8.149205372339466,2.1421916950892594,10.23185656224516,19.91315344627165,11.314076181566147,15.345293043993378,4.9612079323680325,16.151820086154103,8.202904911881902,14.87257497337736,18.059275681791277,6.431761448442974,18.563730316270657,17.8351345994898,14.057178219738224,10.20472426927511,8.541367377487585,0.8952617265275808,10.903577972540933,11.141145609760548,0.8837832133507462,9.973211282999014,9.23006232661091,18.30352267989224,5.96756354489798,11.924065253117785,11.700563398742805,15.258884878818595,9.766651035241289,3.358911284668471,5.04276384578509,8.727366913960264,11.70010714207065,7.022186144928506,5.306928760083958,15.354364493185857,10.391373080206762,13.679246371142417,1.9284735104955608,18.790122984066254,5.602878891924137,13.504590782330803,4.808809207810478,0.16459081078388227,14.592985956952322,9.730564000673695,2.8321078510602193,0.40783199795293434,8.976264195495972,18.549164972954607,8.52004198698828,3.9607254170571826,11.482679550873343,5.664816799931791,7.678313543596835,10.30863099050038,6.4055739689117575,12.417625588753936,15.99657615779786,4.9122568907797515,4.2866116708265745,15.113648383433581,9.44859249926919,13.696135532952386,13.418464160948247,19.688361478820113,15.207017369943525,10.634003674616693,5.1118573104190235,16.484770053259954,11.551318769668635,18.2561842140259,4.580943983896106,5.973345268149388,3.4521673387295326,4.9877404513280155,12.060680059576816,10.741638516932186,1.8590343178318225,9.982971053796845,8.603176987346979,12.315035500099212,15.864786743641176,19.531536232829737,2.4434477177988567,0.8711388865283487,6.796973526440104,17.336808409666826,15.561988940832109,8.08486570278841,13.597205423377776,0.30555113792421373,15.175950299436156,14.172248653763159,12.754058710478677,14.033638420988744,5.803243215127889,0.5730294755950549,9.563604419851405,3.0498750351413806,5.414085549311802,10.576463078704652,14.813484353267988,12.578485071613613,4.867361582378824,10.564722341975973,9.765341359388998,4.510970790228712,11.592679661825072,13.506827741985639,3.9336258457039097,4.777557829588166,12.245502440721294,13.703447429812638,14.407918328177981,4.643282729082481,15.270872114323204,10.308378512607819,11.35323387614176,11.860191489047445,2.7871783448941745,7.157111072815994,7.207024393072388,3.538738809904891,12.858771584842703,10.445295385315049,4.896624737018618,14.574069776521853,11.986451056256548,10.19749960898559,13.874660680348612,13.11877512420891,8.42234258040428,15.46306442945621,9.805494449842108,12.491604254233248,14.025996624584316,8.27591110218977,17.454573888213627,3.6044054637203704,16.93092182960517,2.9138833218377513,15.892219588844064,0.060866734468958406,19.171104606803006,2.03958280414553,16.859609704408477,8.04429016990654,12.408700965751859,17.612596392105925,1.2386424756372394,15.184078626449544,14.516082798022847,19.351655203752863,18.324779562042806,8.385542752316763,17.94045326702375,9.256204500608266,5.547338221266678,6.333958231964254,3.522165944421527,17.69164291056757,17.459386136052473,15.64891165561971,8.424423734290038,5.725491124938031,3.010370119121477,18.349338839217467,6.899079408995505,5.663835881862727,11.790642551532308,3.475415790282028,8.885182622821137,7.667556146797612,6.09109435207372,4.3507504090314075,16.112117212350213,11.802236526101106,14.309852325959987,19.854807456310724,5.660284807530962,19.409753222112318,9.080048247839493,1.0275615472418442,16.694629379967797,18.73915562282026,9.191033064136874,1.0007604366621203,0.30262622330116784,8.6081981621906,5.705343347084537,14.544746245124859,18.025624251941824,19.85646735590769,15.714944659862056,13.75611659163123,9.358894366099904,6.94829195783587,4.433526793016078,17.837287231108924,7.643029744300223,1.0970056064015443,18.09026761597661,14.573642699982067,6.650910835836723,14.03632805604655,9.256219752890956,5.958654389696476,16.999634850671743,7.780024808537327,10.767921785545433,18.81663183320603,12.782972135204762,16.610086969984692,3.4396191816360266,1.6219310455811975,13.704802744908502,13.728996491354843,5.746479164976082,17.512953750592214,18.34262608856646,14.331304051026263,12.771556370801193,17.70999037767102,1.6035729981190538,0.3971555591034104,5.198265080180895,19.848336960692777,6.112251395622712,9.658819140371659,10.885861001261121,2.3659900725135863,15.363083647454388,17.995290710018942,16.07176480837987,5.117534992252071,11.385439542465186,9.825751595915268,11.2322876193034,7.320982439381303,3.562486005919485,6.153349583965402,16.3499355112805,3.658200037027881,5.268478439549091,15.430913232629958,17.375279988380207,15.598397877923919,8.299417434021553,8.042739334679624,4.1314320413080186,9.126657752808907,14.700515685446188,2.3687626619616564,11.355417740855845,14.441711359462275,3.095250286099507,11.14624049881673,2.998622672064708,12.537711780152346,10.083082028222496,16.273392893564008,10.23717306538905,3.888150952636815,14.499819444505855,11.559520763019698,7.695126209574372,6.992755944987201,17.505853506130492,12.609313468717534,14.118923790941572,17.44524653523544,4.561922214473668,3.1956025301639723,15.402764266337838,9.671185398161954,16.295991685017555,7.3768256474415805,5.4085101401424085,9.691694615967123,10.857064881255267,16.977255025498916,2.507754756354097,13.370220802831723,2.5750825856314474,14.451788227746487,18.577374511847523,9.822258738697114,3.2557708153255938,7.813364153919058,14.96961084470756,9.885722813432816,17.06118816031441,6.932493865560612,5.770288914850119,18.855868492314713,13.67665021019311,0.3541603086668532,3.3870662282133335,16.35036955314333,12.677964190391936,7.683301710424177,2.0153916194960653,15.285695939769024,15.034547604088967,6.813165352365669,18.23492686100441,11.809630614373901,8.29048004777231,5.3388293221624705,0.48485436900816303,12.366435688381756,10.610487690546409,14.03271487767475,15.515934512454264,0.5641839312392394,8.215841983989844,9.30170936030311,18.984208197759294,4.344110951949052,19.44114934568382,8.812878550462472,2.4933860000801644,3.275097461213181,3.257024720301094,4.88953672441752,3.738567238513597,16.571098903426773,8.575866631923944,18.55913571835227,14.779655660182991,6.564257089804277,6.3713669733319955,5.145791553602996,2.8210998587894442,8.215071398207927,13.585985502787622,17.427889572319334,15.106044957571068,0.40160781168496307,12.425998244033103,8.069609677620404,2.041188591364409,3.4053920820305184,10.182780955178243,9.035651874415066,14.844847294791386,15.773351721217734,17.890814211490383,2.381422274428795,16.33899429729992,18.566700715024563,16.977669349117868,10.296289738358585,18.676519841677695,2.452769693714072,0.5285828812138949,4.16360926416496,9.19896876254301,6.775605890759029,2.8460484103144523,7.335945014806531,13.84583736453488,10.286267015950097,7.4744490476886405,1.4890939111162016,14.448483427058868,2.3153571565606335,0.0808276465642832,6.8642598222780205,2.287437764131637,6.555683011659239,6.770491154220912,13.179360761800258,9.752187672328677,8.739567548841322,12.711094143348456,1.167924628399577,2.679012821524691,3.4584883505204322,3.1777036526925606,5.375810471318752,4.792623376158809,19.154198060142992,6.864514809050006,9.71736814657595,2.2639849619637964,6.271102835272577,15.110746090490963,5.845444885588957,1.2138155115511085,0.6734288969283808,12.733484758005908,3.306448894426808,5.538281559983784,7.189723843110278,17.992687639023348,12.487388966569597,11.239012861533645,10.5331675358441,4.9813404724099675,0.35670176513736607,8.817842466559252,5.418402934267941,11.1297889397163,7.015399698588332,7.4833075295526585,4.925922580651254,16.2543833450519,16.80519486826924,1.7388250356457302,1.5842825858826304,19.47668010954945,12.554621375998693,4.363628653786216,0.9288022706272736,9.640648773139034,17.430587741256897,4.070719762735484,17.88014878021219,0.6291970812437642,14.94276642262356,9.164869059749412,16.455385338316727,19.436812056423154,8.887343542255643,14.4905554793834,16.243648169349164,16.609640222989217,6.542340232809036,0.4978702103546695,0.3906649774847937,8.025984096024938,7.907401158217056,18.923078886532497,17.68830879625767,0.5159682864176096,16.36615671758596,16.85669489020448,15.879821525396034,5.960269331405481,6.454090417487395,17.14613392908246,3.9585676855852236,1.7848920846312533,9.98209698993712,6.237053362058109,3.2966262688712833,15.06968048025576,10.169506847765177,3.103088957122191,18.350271491407952,7.6863473097902,9.025985477826367,8.701550550358759,2.962968590399786,9.856840973152249,17.650059918993932,18.372135165174342,2.2543954568101743,19.02657269710059,8.798666962215318,14.50961243794425,10.146042824670465,17.57761357989221,0.3996436959124683,2.9070557939081176,15.206804101133255,14.847243954770818,15.559738537671247,12.841670934247293,2.648116438936059,6.635253058186943,10.16871652002516,17.395168389030374,7.810727294822342,7.452025802331161,9.088614684476862,19.714333490187457,8.005033618500077,16.585354395275157,17.124547066949276,12.022022182210378,6.39965699077254,6.1286705785059725,13.285592195387622,11.934165680765565,4.77804756725849,12.712299458432113,16.564069325052944,2.869440583939693,5.588452038613574,3.04148902620732,15.902074634216543,0.7482499515160779,3.464769873288458,14.689661666714606,15.184218058763683,4.314601023028524,13.043492879042894,6.646656426462472,1.116868304166685,5.9898762181933884,0.3532885988878176,16.556856425042913,6.698726178483314,2.78392625387172,9.020568156082195,11.57782899183446,1.1215935912488995,18.948572346950698,2.749987846667259,14.36151840188269,10.333997521694155,19.799004659507723,0.27145254571224964,2.419280696688819,6.189636281079887,1.6617363681172792,2.5263493406079363,8.73640210906502,19.197989609133728,11.758321797054716,17.810328153016783,10.715881765387891,9.485705685483726,12.836623893805807,16.539228628065597,19.329451138249585,12.544215278561616,13.660729192593548,17.202624801555526,19.81829503969617,16.23576144011341,8.409457992258877,7.062444487535333,15.064494859930093,3.5708568854061395,3.6081245582317756,4.236703527800816,8.12821925621963,19.31379274285736,16.81403494599421,14.704261973132171,9.123627203839636,8.413273263395817,19.909521411091376,16.084228928899243,9.288476938410287,12.63046271633582,5.5533206318257955,12.679913072047245,3.629621161625214,8.415012915125404,6.293950174457481,15.75950686102756,10.501721423034848,16.678114729477564,9.484660154639869,14.78825446565956,3.8781535043923743,14.61251967629198,15.658200867305387,17.706094660466974,11.755166578395993,19.403957079278374,9.808030737821461,13.96245356700653,11.771023797807372,17.444012083948035,3.365937878565921,18.961619638133254,18.34363170467085,11.51768304543969,17.068232644595327,9.018881474695334,13.890284021241577,14.567061432357672,0.13501843120344414,13.846936803271767,10.605750165076667,2.155084945213499,16.46937857332571,1.157665441638902,4.960261965386961,16.648665282842956,4.663462326120733,13.995693526969465,11.279278775238545,17.30811957085638,4.264202790772362,12.847542267302291,16.543758050071105,10.022783161312017,15.895794911049741,9.058656192455835,15.584778812649024,19.475426086946484,5.943521965353016,1.7722920439189727,9.753487292828172,13.200058010637372,11.040950691799786,3.9794294314050704,4.739787306314951,8.936761508971124,7.8835189231288005,19.94097417968056,4.852462862275635,13.83471605955262,13.746459235247809,16.965216135779436,12.784176500065062,15.311971035296397,7.649302572062395,0.7566067909602392,14.473673522629,17.257494712829818,11.617699859615968,6.184325225539977,16.521695286549463,12.841882640737401,17.09035218629685,6.607888390984025,4.295336539903203,6.249204508618553,14.581787221117345,6.871574141028591,2.0935994141324343,14.549612939328473,12.41278461561186,3.2064590080342814,16.234252044522734,5.919622001899878,6.911489570972664,16.0186196252222,9.038169131536948,5.221615730951861,6.053881311554856,9.91982125946329,12.015698376117822,15.551759902052908,11.818375238199742,15.449462371115015,9.386595413722926,3.767318619391582,19.132802275632432,0.5091614771106601,4.370162443298695,5.782090354274687,18.96131730841987,16.09561673139771,0.9574349102035828,2.648516771107716,3.935163834426274,9.138957051597284,10.035960685369115,0.3503340377385866,17.163466623699108,8.896305205251798,17.13813273854805,19.490975192701224,17.534921761470528,16.448444691728948,6.453206905692004,18.99915683131293,15.497214973309177,12.061339561216219,11.822455886929482,4.124653892307704,0.8663161177317802,12.631769651786563,17.54924038564178,7.313611371950408,7.129447781846787,1.009615585926027,2.657774906761996,4.735994592534225,3.60275533504816,11.844793447851,5.445948796956297,16.37422893696187,11.604787924705331,18.780570637882953,4.0420959035323945,19.9435484921186,13.084333211684722,11.850137772015398,14.41570044685093,13.096377355763815,15.135882725643345,2.639298000974577,17.327939676264638,2.7829470550079938,4.042757454877632,5.976286756097093,4.057014915887023,18.16033455469833,0.5140042970770597,11.24805724990139,5.44277040918534,0.8429432842030549,10.369194556738197,13.16157221390744,7.120291556588438,14.529233675454382,10.24982345912829,5.702702936658208,5.172279969630065,9.575764277513802,18.647026139481255,13.130103785170304,8.849053819112807,14.111559499929683,5.144956743729114,10.810869540658441,14.471500332392058,0.7091860499509428,8.735886892879101,16.997837662326987,14.066328517656213,6.562348555279822,7.988990335410895,0.03390561745050924,13.360212881078152,0.2546614341751541,16.968039179575236,3.1904202091012746,5.870741239517465,18.100886559030073,9.91130527453009,14.541969854133239,17.375611815334786,2.7943671166464457,8.653586931869013,7.829375142503561,14.925586397140304,3.5276640354827515,10.443593069598522,8.456013259211591,18.743804656925175,18.431378559817336,11.565893312396284,3.677100479924773,13.721820567145437,9.764212287941657,14.812701444223237,3.041693548533857,2.9878630095477465,11.247055794753482,6.99973809129991,5.934598387434713,10.267306512660257,0.18343555355469832,1.5287627454132835,16.59723339094886,7.642539733546596,0.22152259659994566,10.166934570158826,7.69399153096245,7.767953922396598,4.881967608246893,12.454014492089165,2.7520163707117806,14.704408880881804,17.17952199076811,10.20945621471903,9.828922940197447,7.8396831854072335,7.9102138072507255,3.8439053070112905,5.877960277341594,14.775507404480539,5.829677715673691,13.638539978576322,2.313420278637719,0.38397052494755,8.914821334565083,6.506542031553946,14.674123233092512,16.869805774214733,0.8788966223422046,9.710160740876578,3.525398765920764,2.931986592028939,17.04118580981571,11.067527782309664,11.101531845806996,8.185504231780566,19.473624413375255,11.165346458708015,19.45656156711456,17.8080587408606,4.1387374213022365,17.427173552545877,5.132062800528767,0.4700911517669404,5.770092101894844,11.006781815737025,11.395628297792161,0.4270792662270395,7.492161681158831,2.8580084246996496,14.816198941952997,16.303550864045185,19.313171044217626,13.235523736398566,13.525965251059336,10.058151447852985,3.3335692924126326,12.107339066237067,2.979350290318732,12.950565521567912,15.473430419277307,8.452556134922178,18.715428219387015,1.418510072726269,16.858484484711926,12.343025098873417,14.619137152129875,15.427397047239428,7.424851103035004,18.965813097475312,15.231498455319276,5.155134102396124,0.5883720260608438,7.33765670014439,4.899680885110711,6.536588587163248,11.538512629333798,9.657642135377728,18.253538835816784,13.571778595884796,7.055541400074263,12.449546062430748,1.5336924136719432,13.61927185182279,0.20919277413310677,7.0697612191155645,13.000594592425827,10.947902895646457,12.336817799752948,0.7901998920825326,4.456038799061828,0.22036891677616577,0.9544301771676178,3.2880668683669034,18.378577334202973,8.27697124159184,5.369991658220465,9.584831188626787,15.509294894285963,5.574671952388419,1.4083297824962404,12.75095477904783,17.185140174534645,19.84193333273169,15.624546610389757,15.07591599096438,16.977338908282718,16.333411080471514,7.6310281043247,8.621510796602859,17.710976691915622,8.64549555042895,15.485335587916754,5.297397942586088,10.359667311640749,7.763703102393338,10.730952863733263,14.770538250669505,6.03586259622642,9.854043523910638,5.198276102461192,4.299758274683501,13.154294833828025,12.42170739870101,18.468877443442103,7.292088899390854,9.59064786928726,19.95396338715707,15.655172713497354,4.879160744811828,2.127192172768022,9.366444615489229,9.360477736895554,2.6763034059532576,16.091807206840922,10.090749794108271,3.6106904943574003,14.644476819624295,19.338885877558546,3.759489833113001,0.6252007225439105,14.399101882785645,4.265526120912746,15.723137943545442,4.2148575465267335,2.9022670813876683,17.84859788747411,15.925746972128408,17.377214664062087,9.95317072970732,4.64804506799136,19.717336352368058,10.492298779941361,1.674713921990123,9.08367144413631,3.6439483754680158,2.2375104280973845,19.449059231982524,8.37979560127659,16.82572153005112,8.840739583905721,7.353130218242527,10.84740605275082,2.957376600256598,2.226584682238162,14.696165797217024,18.799679101519978,15.023961265288555,8.734188254335873,7.176873362466609,13.009560593460808,7.775311544222436,15.314194590427457,14.886817580974157,1.9042564725216238,10.195418824717915,19.12876235354848,16.463400557213568,5.196154133755422,14.856727634623494,15.333678689278894,10.670987528654962,15.904979091605647,10.953651160998792,14.185948230037159,0.0485439406481758,16.671577631693154,5.49261306448301,7.810416655077219,8.102816596986697,18.079352227003604,4.562986519049925,11.568428315833188,16.125144951436155,10.977280271100081,6.540502067241749,2.097724314190468,16.0059889512422,1.7594142641161792,2.3623247159589322,0.9200262390162539,19.630030900380355,19.330774087106736,9.593805850989504,16.986941505852812,5.936213352407331,7.256439752756827,9.535539347057625,8.777749216756217,18.914755024465677,13.04441484598826,8.204776914684189,8.90192509288244,8.04554091999556,0.1744435064521621,1.4911170016029196,15.196437945201078,12.584319685057022,17.085686814512194,3.345752002701028,17.250686547640548,12.218670630243501,17.700269455409384,19.30227472337705,7.580379559103627,3.743137218513315,12.147461168054313,9.339934984484328,7.618262593796716,17.10442019400926,18.74307224836235,11.55511227679967,6.378957953591589,0.31614367663482135,9.030342181110132,10.515058080722103,19.875040533342187,3.7675967362074747,17.836016651457008,0.17333630042327464,14.038086514383416,16.503674056668913,2.70409207412313,7.668916212140786,5.515125814781641,8.210941609857487,7.86697860900524,18.941538018341785,8.449610027634172,10.791526140444914,11.739854900636754,2.407842048302009,19.865505943337244,19.139208663782952,17.07376751628231,4.075803029636096,14.230593043760674,15.064051773866577,19.911864332261132,3.013123987363766,18.37235548109371,3.8788885653893423,11.53259065492232,7.700064946680225,9.555305884939074,3.5994314315402898,6.56944244080818,5.409168559643529,7.758158169739824,4.941352766131644,3.1469295913121265,6.6103807476304155,6.99719308161169,12.947662918979933,18.90329256177339,17.70592923006877,8.718599240660483,3.2814225515101114,15.327859217459645,10.728028585665887,3.227613340906448,15.352403742786693,12.081239811830322,19.96931022840897,17.1416333164354,8.360816000646354,12.759491705704198,10.969854476345912,8.358716172654258,18.129314198553217,1.8682676270106402,3.519268078314055,15.120050203981958,17.76917979718271,7.593188594352656,17.446669072601892,7.008220195517754,14.019185777490524,13.610431075564842,10.164678387539997,0.2442015438568479,7.067396446106291,8.307059081073934,12.584163294859657,6.921243978222735,0.29888173819824004,1.7582324225231538,5.81061650463047,15.036264710404872,8.072628331415132,19.37703489342146,6.645440258994335,6.715949690178529,8.35216439735602,8.83256129950762,7.53381036796454,13.598379613750126,10.236463050502206,6.6658418218633875,12.229383245526876,16.01471765019646,10.542100619351626,15.532026958311281,16.86979254359066,18.34892341993848,3.696122738559615,12.016096290931841,13.305170390806516,11.970409568939244,15.325583303371427,18.814936025976003,2.5417397776316975,4.54056405782461,7.326687989512317,11.552200765322404,1.7951950103917946,10.685929243345829,12.44740201830318,12.861618166733582,16.303525924686607,8.319339420573648,3.9537878652503844,17.314119914247577,9.492173793098416,4.013932788160255,11.004958534430372,2.038668787987734,18.651574986200018,16.316866610601327,3.4449230078038617,16.48386408144286,15.259821175484266,7.2192131831624495,15.433571945316821,14.537285453196072,3.6147528828095776,11.238458756575112,15.36491424846071,6.908741163505501,11.908870269511107,4.144340345944877,15.394372149587845,9.147751982212032,17.887561872264474,19.39861876828896,16.938479310713767,8.160253882590155,7.23850477132602,11.954033664536086,12.731288544387924,2.840900849660284,13.81207270544837,5.410898461817575,11.894984284489777,10.56931926844296,13.655713589497708,8.434767647161205,5.172876989074475,15.761234782834418,12.621893120900634,11.82277990094201,2.6188279911041956,6.4985103040859515,11.821247313914336,7.450828695283476,5.952470879391134,18.4117515578192,17.986727036766673,8.39803882458693,4.944726833484991,4.141831114154426,17.989463038375902,7.807176049169646,7.081795435806262,6.627131835146813,2.2212356036848924,13.211471349840238,1.5052886137713095,2.4319545222341077,19.976674665986195,2.414663070070735,6.2641789726615205,6.411145856525473,19.072674646294793,11.986053980825165,18.667492291960933,2.22606759689437,16.40045060732914,4.705865814524435,13.91173335151693,19.047309460721134,10.054777594719262,19.285378991093104,6.050755381845834,3.204624304241035,8.039971041803522,15.327227402653714,16.668104975359057,6.047614097326006,5.118810886332241,14.786261322180732,15.453063679947903,16.668404859744044,4.187642014062933,6.7429040447040745,15.187242332993405,2.326134639899511,10.710569487905994,9.86551122970813,9.697985615453284,14.245001305006305,19.430501471128274,2.075619446122099,1.570251041870403,15.974330460454308,13.289738618776807,1.3662460901924245,12.388838254848732,17.95546307260303,12.239859627264762,16.53112493441911,14.54842255429348,11.828225376312549,17.490811255543896,0.9116523140099364,10.55790043091498,12.463258864076984,4.3747183227072695,1.9178056993397918,16.4861900684531,10.210523951351998,14.96629928032184,1.1099484266482307,4.057266622232154,6.418505136024413,10.27496605000013,9.24885009452819,9.370211402775514,6.791299463027118,12.43699395840725,3.56308418572985,19.861517098927127,9.859606718231282,5.422012245825436,4.912726771791971,1.1878098455948427,16.933396437656377,5.7018140978585174,9.085170762210758,15.30143838732927,1.7755254419061073,5.845270649097238,13.69890066398128,14.343062043092196,19.733546433508838,14.308003853914212,13.24719836917959,3.644532731012089,14.926668866098893,10.305180591608142,2.26780501372287,6.774450148953219,12.6856276263339,8.629924824695681,15.069710691469883,1.6384610786021359,19.478113212272753,1.5423819078896805,11.075626844858238,3.5848681531921,13.698450273753323,12.095509294917385,9.667693014089584,5.264688898894465,16.226804094025823,17.32596422978546,0.23968188148635328,18.461634742139413,6.615183499316841,1.3568700145023715,0.8987606512087254,3.5394440497588686,15.196895855016086,14.139461579794382,12.051966531061776,13.741670304837328,0.1713917472089932,8.727521669578895,18.08781405407021,5.2604344314649065,10.523278231212249,4.724576921925512,15.095985506015634,5.535864637610128,10.158867259123777,1.269128768612413,18.833674996708105,16.904166976924845,6.731618212274659,6.164361884758911,9.351540576607533,12.531330524425805,9.130305160270048,13.99478845051167,18.247207386175255,3.229948780461802,18.069411152083227,4.538834019343585,7.430600889564389,18.416218634018207,10.79248162131115,16.24399973513992,19.67321532220772,4.237956586115228,13.924449909164146,19.282617004435153,13.138308522721127,16.259763711422643,7.04394860171528,6.179446499603962,5.780801049821198,8.82678586070394,11.215922290058252,10.223738941421367,6.640756988054788,19.505306960298114,8.51972177338662,5.564516823811716,4.290753516404484,6.429552073803602,15.13077420999804,13.427297143606785,14.00737664561178,18.268574028680483,16.611055250534143,1.6820544616217292,5.075070734281368,12.85238257990116,18.53400667848254,16.79664525765043,5.907244392917499,12.290805157733558,3.550299373060475,13.80570792290892,9.731301262442331,1.7556512805926072,10.217167764078763,16.884674056208002,2.7020468411472542,12.934071176794122,0.6778984197652083,9.602432044948891,8.663885411962431,3.8130588354141226,11.192067361764835,16.917330170815042,8.89360940044333,1.8728079628253536,3.3329182212556896,17.474740910120964,2.9566822704921636,10.586110511170617,5.749311271397528,7.497781852322927,14.35812435960524,5.350000341687675,6.67896220224605,0.5929469776930629,0.08645936088341077,12.684625126581057,1.6331649231481782,11.886825889261573,8.928695102491421,5.242399916557949,14.221840114785792,18.12796481705789,8.387934545634156,11.58258755967867,5.562251084088015,14.004677762657263,1.047002763739453,15.070977949708734,12.135238870737059,12.444737274294173,0.654127657700676,10.13115240104263,15.903304659501849,13.599023907553027,7.556708902846494,16.274024992396615,7.056758111893662,12.75542109058688,16.63559044475923,19.290706028139528,7.430319386194957,2.988992299319544,16.83254534360524,5.676856994450588,14.478266128826185,2.2201177469507893,9.555736067759263,18.299436238872406,6.861191227495138,7.269063263170281,5.336012383936413,2.8102340683151006,17.741912065909588,12.388918432967152,11.345756136703837,7.440519596157844,2.7158209607605954,7.255570130173528,12.967057741442733,14.291907783745458,10.44391685212914,12.58230265600881,13.251097960867595,16.513493565519802,4.388614967002233,18.084273448882676,12.169381198573678,10.0483647509162,16.030896772151483,15.088678873769554,15.824193334768397,8.560216689427712,2.3459295911507594,0.02365451889011272,10.365607496184763,10.360019424635048,3.602520554268538,10.90753716263151,6.726892694623707,7.443520036069637,2.782309655751294,12.929011010185425,19.066375417063153,0.5834890643804513,6.007179234417723,3.4590627949648667,18.78462285735648,8.470698494021649,13.47216847178695,8.914617175212168,15.379776171517868,2.7558275503460505,0.006523801083524461,16.57414169253279,11.107437422954014,3.146279093466049,1.3173272957090365,14.026576761644737,16.02476631116593,8.85158150579544,13.276971720767815,9.089789932224367,17.60296739875934,3.566785087943023,9.467068693717513,13.95350253584021,13.680263994081141,4.874297195538997,14.808170817640809,6.801716223238725,11.37958162541857,8.826754627613894,12.734830519613563,5.349267671824229,19.926211938135573,5.395216880917744,7.605900231971332,11.897195757392254,12.693286313740622,15.743491409753766,6.957598943334644,5.368504677767301,18.9862118686605,7.783726188972686,7.716294662947267,13.959033874631626,0.4761766855174576,3.358134085401434,0.980147841592629,16.543492440579453,19.399152253176158,17.91643519981671,1.7690846975779984,8.876555948155973,17.74303416774687,12.059713611852603,4.436690965109613,9.54433708966877,2.65058603763753,8.194408328821385,3.871795821342925,17.0202566623265,12.730167304509479,16.475839865127007,11.371176990890053,3.189437118818792,2.009194149455711,8.422478210517102,6.371461693618206,7.5571871243624456,10.844447672735367,11.662057439850413,19.89915441008432,0.6978226542022758,3.288833482160838,0.9262831889569556,0.4684352302315986,2.8659620951160836,10.489037513380621,17.710361436158756,14.944312987374078,13.711640871602796,2.111788933541514,2.5808359836120065,17.23809440570697,15.57106605100027,8.793844709903693,0.9630961969561103,1.2947098761223508,17.49797130632745,3.193356198631667,4.4263695025339045,9.383739751682235,0.7517651600555864,12.713086988407468,5.051696147851756,3.087606631479063,12.349787171882767,18.90207975767593,2.65108675382864,8.214819004757889,10.674687026483616,15.795961920320734,16.43271994744268,10.22147483577928,4.885625364675961,0.9666737845666162,11.599723516165739,4.3169943813016465,13.40132729085331,11.602579903387898,10.180127388386865,5.436018406065877,15.166556701422822,5.481877561235562,7.593547667840901,3.4481710057008685,12.41670858676548,10.782750572477378,4.6933497799646196,14.226967817181531,17.147595030873166,12.913964739902175,12.402288388975773,3.0629532054213904,19.772144529851616,3.5035531829518085,11.033140806141844,1.4830849349305186,10.41901025146391,13.448224518326422,15.418411450899413,17.36075857184394,14.567277080848484,4.9745167490325715,6.606437249794701,17.99862434630875,2.6734449643573033,4.139442959850701,17.104498647040298,2.6367076324731853,8.688221422301039,15.497332403905224,15.696522633601194,19.115837521227075,3.823595311871637,13.092216485175193,14.50720945404072,14.307768813439083,18.200961630324745,12.896116539626806,13.369372435549533,16.36611564403385,15.222319156012123,9.61927393699256,5.354980311496083,12.469984480619626,6.1021703748923795,6.824325662761757,9.621575907237156,13.141252697335183,17.607379212204233,9.237068017675929,2.146600341360747,9.838662009906676,16.478498676968396,12.601176570244865,13.609579173596389,19.928607638981784,16.547451996270127,17.81930582524408,18.481940120821573,0.29029540462782943,5.391347421516586,0.23427884414259026,11.637708953433918,4.637640990884475,2.6523791113415385,10.055189776201905,0.9288140264788014,16.586613141298553,1.0029523735283252,5.4212925423578096,2.5946653289892474,17.628287295496232,13.231331954224355,1.4780251794120725,7.374440571165124,2.1334419471376798,14.7426797222899,19.30069454535608,8.345097801479655,9.695577354437788,18.90308520469279,14.343620386579815,16.970381826480722,16.463004850156207,18.71475760170054,17.041648677394843,17.896122605098256,19.820834356012213,5.759631915297843,4.786554734756043,19.196573239341856,13.350729849247651,1.9161793615051481,0.6094260674503493,19.212848985804968,15.687895825137392,7.085045045646687,13.478645157795754,1.0199181281463598,14.737651157879053,6.662246353347374,5.553962691731349,2.5005598604619417,7.170575759945792,2.928303852136427,18.72093895944513,16.539944655531716,18.23290043910871,19.23892644405843,4.122747230656194,4.7329806527081475,9.887161719325345,2.981724508332193,15.15585500599563,5.658651416131986,19.468050328394764,10.541974004018524,19.481167992402714,14.385301089214583,14.04117462874067,2.852813977070081,14.47192779975817,9.266821825425255,12.650797242176775,17.215070017885807,7.272702279297776,4.054497826165897,0.28805913700249874,1.8164926292432737,10.351292726260635,16.847170344325953,8.244441465621168,6.58954765484141,19.354939640152466,19.275910997619444,14.04138158107559,7.993046549216554,15.298731462339932,0.8263071081146922,19.457843000506717,18.647001380793323,12.081565647422096,18.65308562660331,1.1503148488059667,9.020611780367691,16.05047673199229,9.558935360497962,12.157620681091643,11.449369055900785,10.515655820816683,3.6052769082323666,10.33661354722151,8.092492640463815,15.349678216081927,1.2678930143583411,8.723914351263629,17.865013820637216,15.906284148938742,7.149677026695631,14.016439049809621,10.126383119269352,19.59960068264511,8.325101788192345,0.5800739237373209,2.6057451514951158,13.632412830281112,15.81590296303152,18.604917912115162,7.991064489791078,5.090981379981332,12.837717779369635,8.56148694958884,14.130001870535697,7.941777918046635,9.25740430368094,9.021211975346848,11.696484070062754,11.063512867790365,13.081380856266659,5.421389920422506,17.058865496086398,2.4533681180694433,18.611350415637418,17.677608737053735,19.768703759553322,13.726255573028112,0.04137989557170929,4.163382031728924,12.58004495868148,10.65543232308151,2.4378138305873653,18.773510242288456,3.022320110927108,6.704380717676122,8.189776091788055,18.926915391163234,0.68438362102063,3.3056940993942874,9.60904465965696,4.270766355455531,10.420947210207263,9.41054526975143,9.2087856623571,5.088764908289454,5.4886666214866064,5.140891835305208,18.52707955512715,13.936355273337785,7.960051597799529,15.279511025015765,15.724159701360009,6.178868785531217,14.336855743598619,19.18832445248625,13.050968964984268,9.112588091816685,12.898669111493613,5.293156667742456,16.460318418649106,2.732627188197534,2.5604842343479817,11.435776674125307,2.2860550904423294,14.52188307257067,16.208630006359076,10.19276369449502,7.539887008831836,5.074393957119345,9.611423060031692,2.22085360877188,11.934164984019793,17.200514092567836,9.620326429747692,11.990797674646117,1.3621543967263028,18.46128965995074,4.288391902916144,0.331987735462449,12.765729216766735,19.37896807033797,12.25743941079251,19.490782022746508,11.550878893245326,16.810242648723342,19.968445032898234,8.57315530754362,2.0219235033666783,16.595879667334582,9.005202553259526,9.243658885707724,9.693866137398564,6.659176297753726,6.776040810904274,13.069232988444682,18.40030324309057,2.553370606632366,6.223293702735688,13.852891818639002,9.967413317829607,6.1272981959860795,12.016299344612822,15.135931383917335,11.79683066972624,17.37961253311,0.6383841278382496,3.8328357401157875,18.229411158218554,14.296543170711722,0.22772746891067008,16.585000088370872,9.865175964156755,4.066380125131843,6.275412814547829,3.686085477233023,14.893841204896257,6.94694748106333,3.4979566544378393,17.465403764811796,3.180876684376366,14.872764279956554,0.5230024231589914,5.442375465269578,17.486967643987764,3.669410875001846,16.63388483721045,10.799702801758961,11.688120619366424,0.0781387427089486,5.932367149627358,1.9788768290736236,8.991576716628407,3.6584451078305102,4.681954108807411,18.608331681969617,1.8017515196959533,4.051846025943395,6.322523624880936,6.378450924381482,11.657594364870324,19.078707703656143,9.168012773943929,19.224431991767915,8.88727219031416,1.98575421981388,2.597110054946894,17.395830209417227,15.617956902528775,4.904489870707014,18.869113311965297,3.0959850017507007,6.472634638154582,19.58196666020722,10.788759356468534,13.632624236364084,18.894858522225,7.636278914430403,18.217990916197483,7.862464744360489,10.581905421238677,0.08190033951804399,5.463772642837221,10.341855713861214,9.77474032182097,4.355004524794208,5.398719768876927,2.9297565944645187,12.381860659206216,6.083367716155164,11.16163854014523,8.23195868010659,18.14581376457197,1.9695561632728698,19.814960345847684,17.87840021839015,8.122980182525383,14.960813035842286,12.697257593462265,7.239339495265438,11.422064503382865,4.892403549115749,4.501488028564671,3.6664739744117636,16.571266836604917,9.56895427961685,15.46032960894391,2.5845724055229002,5.948453762358432,16.429886612432384,0.07764255531100606,5.85021911376959,16.981863272580785,5.9477354097024415,14.049562380279514,10.241472452830935,13.56301985635859,6.5913314003113,0.4501233177829578,17.308515254102858,16.85436463109434,17.652933457347274,7.257861459066137,4.679919866847744,6.129506424818061,1.3283514289721188,1.043023707083477,4.1085177889445434,3.3123396619396095,16.413055878097815,15.270415837605228,5.645193941280047,1.1298766532367432,5.883277274816852,6.658295523761835,6.977447859825183,2.8097135595276157,4.4175415425424225,13.353406669293166,13.236896776895236,4.737976642653443,8.217176052428531,18.647734077649957,0.5232557766494539,18.566970354827724,9.567695633221387,8.372313447897186,0.7113472016699873,10.710016820453996,17.587010086623287,11.627577399514335,4.878513361869321,11.032803041324005,5.369691604493747,7.33661817217325,3.239153309459497,15.564871585780566,2.635928845936051,13.721321067161494,7.776260112511992,1.3786607412359198,13.22197585876169,13.676756633331756,5.149498800937473,18.022432375606297,3.4698244918397947,7.2967805498014515,18.195127133688132,19.576201148002426,12.91649808643716,7.711479755446269,16.42722913913696,1.2919022689316861,10.459731149095175,3.9232175663243707,11.951307377001314,17.133500374826628,14.371909863738788,11.196925509600643,13.09791431785612,2.037051647354833,19.773017370167135,16.61312643034512,16.825038974248294,11.960121392075816,1.611957706115743,6.189394143949238,1.4374280035791243,17.737628701058338,0.49913523815564353,0.40933801786699586,8.328469361865078,10.85301739463067,10.328317149891664,0.7523498327582256,3.170068498434646,14.88838895605523,6.19820096981567,1.6422808210421636,19.250511965507858,0.21956163093942216,3.665692970241561,5.704279885076247,3.3708209845905346,19.749502906457682,4.632833422772098,0.35643069429652563,19.211367587584533,14.189330263768557,16.91863570383239,13.642995901202841,19.117640493895852,16.940102589058732,19.61969421295234,8.801781256696529,11.474361408793685,2.1756577678938482,17.788391954047448,8.577240408606155,5.3840974415514875,18.741450303857196,11.135054434955425,19.445381994717025,18.663308148038364,1.1757582591767513,14.942593187475222,16.845478080130345,0.1261489838384655,0.0565287511807,13.370491567496812,5.652197181159417,8.855741558205224,17.08052211624497,2.69526871060481,13.236682877415582,3.3017709232392045,11.891103047985855,18.458819117296365,5.822719701281014,9.975581154491962,0.5151053583858767,6.166286552659512,10.03183308665944,10.784979624564052,3.524757493457047,13.693224982767497,19.044839752674502,6.7489074019281325,7.001710515846988,5.52946031055813,8.127811290364097,13.238848567285192,3.903276477252038,13.749458569155726,15.599985402814767,17.524181513372667,10.482637693803337,15.961541501282577,13.655823536726096,0.16806046184385526,3.3324472182111142,18.91340738943083,13.625078552192722,19.98964087969542,6.581841785880571,7.448961570675787,11.316267860569958,9.918166497755255,17.54800689253217,3.113132638034255,10.1131110481594,19.96012717370074,15.092091316777662,7.923696400324256,2.701951252305803,0.5925931776479487,15.622956958384986,7.902518565370857,13.548448845291944,10.251824871620382,13.343829946669699,11.184341042031004,9.408217091855654,15.584252416500878,9.94262810649483,0.9790359913495683,12.35683235700062,15.861919842903323,2.4362397667557634,1.4911331604839884,6.563677627108966,11.031393134986086,15.952176792779058,15.353155839628991,8.15303185170421,2.11588140909186,10.681512756609814,10.956101023936453,15.689653670726775,6.810596066686068,19.641979514239235,8.724488954790113,13.832712184924754,5.744464123619708,9.879619640048872,9.292792640767026,5.136582927807503,15.142660948073559,19.57717366052119,9.743373919901073,16.119525880595305,8.826347894186037,1.7215469303214626,12.928320197970532,6.066101434236644,18.364960397647163,1.382610339388659,5.506830641380698,19.0885391390931,10.200923432826539,16.886923832015462,12.035548760267067,0.07729873942476928,2.0405486012600615,1.1325671770009604,18.711925238457702,1.3119000586344898,7.933444990304834,5.390174262639014,2.3745247597244257,3.343437504818474,19.30876836411423,12.643711202616057,11.095942220023073,0.10894073087837075,18.386645912288195,16.81525577183294,2.320918672924419,18.510660635187854,16.40101410217114,13.601303360081257,19.6212049547674,1.3826327951735706,1.6449370440950961,9.654125887390222,3.919681597901885,6.7978955063492785,13.402637917346345,7.530356122028685,4.350959382253623,8.014955664228761,14.644694538397044,4.201141012404044,15.370460739980105,2.188686974775318,7.850896219914354,7.2274828984215755,12.888129662700404,11.545036886199785,19.86644187858073,1.9675793044625767,2.4318564855677494,12.18293394580055,3.903482872284645,7.0502102442713,1.2786675931918001,17.59484654030658,8.941374217365542,2.4822556454556732,17.856149994376864,17.76627852078853,18.645625695553825,14.792975345660189,19.476315354690065,10.490367891187491,11.678430914287032,11.106701512703978,3.4941641230615383,10.224551104385927,10.2849106757586,14.790885017297345,12.574302031973982,5.112307324848886,9.090601672652836,13.622517245603273,15.533076138127493,10.922175259933606,4.75607609096516,3.7874779880224185,2.5485665069494656,0.4890255051876258,3.4892130645504427,14.03156573083599,1.2516046630306876,13.675879176520901,12.011379027218121,1.2387491354016333,11.193603202839189,7.105736862239542,6.173754091127988,1.1124906901179443,16.03144458683358,13.825892327251793,10.225045996474869,9.85945591505617,12.534013216037732,3.371216666665866,15.990153380680763,4.8933997203866,11.517461769803603,18.78732299010002,16.07291247652462,13.41898947563867,17.117962187169216,10.209674186189272,19.992682559534746,15.007225676460013,6.154575698676101,8.19486901937259,2.218944758804975,11.17309588048203,19.85167592601162,15.63778092133202,1.5211304196275899,2.6306280725394737,5.1349635393297,11.629685372615013,19.765643380517446,16.33058442850597,13.612459771338315,1.1204631690768752,7.290113950774169,5.218504167133595,17.444542661015575,10.92092606302025,8.60204862278,9.968969960126755,9.297852606106641,2.460317998391499,17.6685558231748,19.340143035521184,5.108253495626229,11.866099775115009,5.287652780761176,5.487995005049573,1.9602333006670447,9.020895182094755,10.81282716761002,6.641217826869532,14.013025671281692,7.649136961228038,6.469823326553619,0.7591656556965054,1.9789504447138606,9.871214101776511,7.0186876799924836,1.1523192531653104,12.492911527686816,0.42640666241450464,5.141189494854483,9.04652282216826,13.314786953409708,2.7379206958426394,3.404732623440365,16.876795097564514,0.24304160234182692,5.0130848697954455,5.125691084682984,4.854421257739112,6.926324036443727,1.4050338073659407,1.4914541405799175,8.967767592483087,6.696865847875713,2.7761620253410735,13.009725146501303,13.068062988872438,6.89877035801425,5.594594287576271,7.279745762333127,2.7181802026286617,16.71609370091406,4.699759595138202,14.230926919349356,2.0884224915620164,1.2186354890303708,5.1304619806085405,12.40729600848053,19.836705935964613,17.707867236785088,7.133080761889423,0.3842801901495019,12.118906914702666,1.1161263929854304,18.661870099961014,15.047455167553,9.164823276315225,7.000672814728572,10.734338526661347,19.666700243378997,6.019843420783051,9.030303523497839,8.841146067043377,2.621853110024861,10.767033834522524,14.682482276864404,8.829607351510509,13.593519174805376,7.458689468874331,9.829211939949701,13.23283948593418,8.571044891793541,6.973473468811537,4.983713369369895,18.80153402109816,7.709517178049925,14.612688117729844,2.987589231509591,19.711475608630312,9.337857006325683,12.774220727981177,13.029884135194063,10.840681538095573,16.59744686833825,7.811318309832944,19.099100964841917,2.856776006095365,11.168093170881486,7.601559071668564,17.82048460366513,11.638069610106779,7.509317327024223,6.34741041571282,7.471351338554375,10.490984386240573,19.57821722824594,9.838639024903628,4.9198120922543565,7.043124135940038,3.715401577612858,12.96420885099241,15.814343709263694,13.357691445777222,3.2002902195479876,9.380229035789434,9.137265790745325,0.3692592009733975,10.97292067433088,2.7301396187990967,7.5306829572592004,5.423185770779768,3.9760012901373276,0.47485334271827107,14.884238415380358,6.198808798759399,16.706007249726,16.24943106353445,2.440991333660847,8.652121047064636,17.717575312871354,1.7868319259448384,9.539543228111125,7.066881626267758,8.253834162582567,9.807501399253237,1.8427133086027103,19.676583700727655,10.170453794321466,11.903500214487961,7.634960904650185,15.281330903305456,15.317781193935108,16.702454736398735,6.208969621752818,19.130285261607977,18.654665985065186,14.043437807108127,14.496634587096251,16.67130274285561,5.357308707941972,9.655573345083258,7.5318223771735715,5.476259843751796,1.7545815028943146,12.44674583439922,13.108878715594429,9.355253021758392,12.67892403064415,18.044968458478316,18.855671220916356,19.537648476467766,3.2972618657645114,11.307235014179643,10.328634157658296,13.141895548519823,16.015582085800652,4.378825415801519,10.332759608920593,2.189326043522404,19.58394323582074,15.285172922893754,14.674985686811329,4.3131152797477545,0.039073083423573074,9.106699829160023,13.463378665831307,8.096946586256868,0.528772050368711,18.351399340215924,3.783573547981516,6.5909639091971695,16.44552248091088,18.88138504274973,5.906354523698032,18.250100168922256,15.867772267819657,19.917180850586853,9.276828623946475,5.7113434060362245,7.864850029415789,8.628369678969472,1.7673858414600296,17.34937574259661,9.807370780220396,18.057118862876646,13.550168641390595,12.884416628310857,9.967730303868167,5.607485265671248,1.3530524436761349,6.324254802719382,2.908153557509867,19.946865601636077,18.675909372060246,5.230228496000753,4.906808027954308,19.256741737742537,10.893872976546032,0.16971909529384543,15.29700587741219,3.6018396902091565,15.511769408234741,2.972583567877889,2.257042660208115,6.960257187203789,5.580705920258615,15.680649391693372,1.5762982737601572,14.246076841589673,9.533496348774243,17.54782272717559,7.47138172794704,2.646091824813168,2.1206693487818384,14.122338841342575,4.348591368396089,2.583190540675022,11.730837455599845,9.005793980759226,3.4824332536487335,14.719340143485788,18.318235384686815,9.188055129661103,7.693056783177323,10.756517955899682,1.2675920432373777,14.774278809349322,11.302556216259525,9.002574749923053,6.180054603688769,1.6392196877898568,5.096247973026502,10.710874558239976,11.118597490167765,5.802179731154733,18.028520655061694,2.1663142159489324,2.62415437035985,8.246398859575251,0.5768780082114988,12.998840179743105,15.440153537022269,15.638343780631372,19.90177152231842,15.044458896141602,17.22477229067923,13.084368803933003,15.802080821419061,4.876761297803491,15.757003953404173,3.227671143826809,13.487446207148853,7.915554700250902,2.8201558031090235,15.581108424744826,6.993781636800498,18.42686931676227,18.275009563968148,12.831334163611317,12.117647202749428,18.53035683793166,14.799639385326255,7.193024785111399,0.9134007318295723,17.477042107435054,0.9857802454089315,17.25659114042064,0.3067795305020704,7.061858518835726,9.302038302499627,15.101997870562037,1.1678345993271488,2.0831867438296214,12.247367800669476,2.444988794728302,12.136069292173763,19.264928084150373,2.921823400017307,6.279975934632045,10.230952270445934,2.250512294517164,7.1645228546551065,17.213147198872516,14.443663174741523,14.667747517570673,16.164596284601448,5.658913116789122,0.4075591675722512,19.688222781034376,11.576033773236883,10.633234861765693,14.124029324356666,12.563861971586876,0.39215543285831433,11.723675322713483,9.572687090069758,3.805492019407737,6.696568084752528,11.238598648772825,17.921676031123603,7.576089284404102,10.009260228196721,14.840565479371502,12.251841523491276,2.840427549782376,17.701384616722493,3.7380825599405076,11.505846988716645,2.829789300671761,18.851915677437532,11.864083039195199,18.306646589619852,7.916667051916804,5.1032300348307125,6.019557960225157,1.9665513950147195,2.9477577409578126,8.942682480991193,11.623043112019573,16.7106835441431,13.265999366269456,5.403334741611792,17.622329834080826,11.938469958718908,13.129915751587635,18.1915956123281,18.5456747612068,6.758521684362497,17.507117672169123,13.699183133960222,6.148303614652266,0.5966891040143008,0.4895028671994739,6.575462041042153,7.8264919132157384,17.362008489284126,14.143042993975744,7.2373749194481185,18.22120318619492,15.35279332307569,4.016573804784791,16.162059926436577,1.462769574612115,6.424569312098307,15.198078243711928,13.263845195886152,16.579136606849776,19.366379255934454,14.714238093895133,6.997005592992571,4.3393064067248766,2.3697856964114106,4.832501924018624,13.575305087794206,18.90616657586171,2.607640430317728,10.996571356655194,5.236454099665879,9.757445687599894,12.657032160487457,9.334907369530097,18.03319065904767,9.765372216329968,8.089184660782639,8.262478036885238,10.850122804138,4.702255138985976,5.223188444247238,1.4407781718890833,10.661965378154644,9.268322040410135,12.163157880635985,9.542935468632932,3.38824137903901,4.254170174923821,0.013092959512399638,4.1843811654868235,10.485986730956963,11.190639850283134,12.18828249173717,13.783898380802743,19.01865759085232,19.39062969951123,9.722109270932462,16.983450412753452,15.092575529062406,1.0403924675826781,3.13087360993602,4.647944360506426,19.99352536515392,9.435008904764,10.131121445008567,4.492052630829844,19.89012923739481,8.873920319088867,19.285699934318473,3.700619943983652,19.849811965043255,18.976777651229927,5.673045579712914,7.383098959871233,16.885821073666815,15.06275519019793,9.508248711336535,5.432255573516458,1.7941778378165196,9.331433308614647,6.1711412995160675,3.074359582064057,13.624001944523352,7.060308801585453,0.9902045307171159,8.143922203372709,19.819641044241507,9.991102830136303,13.9069084351692,1.9044250242877858,3.4295187904632396,8.192747430145847,12.393880869395293,14.57750448512015,0.08395652327807923,13.187630362051198,7.367804728996941,0.74370528786599,19.914291347435945,4.705402747061811,6.9879419843501855,15.875105040613304,2.3577785944824026,5.664553046390282,8.83170356244062,15.605519915989078,18.206512623509088,17.797127291535983,14.000823531702245,1.770993974927455,8.17378137685858,14.226976700806926,8.606201576387399,16.324048140243367,9.087895019149661,3.3168439403817773,9.525219250131332,3.4930403768041307,15.021481881538437,10.623418987183273,5.074580248176495,10.521977664560712,16.415560677951852,1.1293859193858413,14.166079518060197,10.613627933128132,14.456584933685903,15.427746352106162,0.5127724306734516,8.408033893078294,2.3024924548685854,19.660624268427334,12.216671560473799,15.62191023591669,17.745221154363016,6.906091925383424,7.7796819975924025,4.256339913091662,3.5664616434572904,0.4973699074814908,7.538965519851155,10.646959622701964,5.670356192044501,12.837559974505375,19.990504630778112,0.7474503447037684,12.34517683245004,19.541103088902286,9.853327308746485,18.818906821639025,0.1776832720884869,6.791072987249898,7.2803906921434125,7.529110708493283,17.206658420608886,2.7518861304283204,0.6827741677605159,12.624364988512692,1.3181469648086175,5.902322569999838,13.2823162357003,9.280978749704865,3.2574883277628564,12.488158398151782,15.59996283368065,17.167053753052937,9.139641098127731,10.463960735468572,19.85049574959636,14.723175721688673,12.888424479474146,7.793253832835059,8.711358818483891,19.81811948585247,19.407254317584275,2.2653606812081373,7.786699073796068,10.098839741069693,6.6467495192698145,7.24973594474732,16.25996025959619,5.76924726044139,11.111077064794358,6.210409536507728,19.913864265988657,19.753160600696017,4.590507689995924,10.856074055901196,15.752255024025178,10.110909987717275,13.44726608481858,7.417457635958495,6.078759405659078,10.028414707210827,11.143890418944476,9.402009945100755,11.62993958232708,12.906728498847295,15.749009139491324,1.1980126988078021,1.4810451575174666,4.141340942262932,6.362506954429548,1.5773351367926258,11.991345008072805,16.483647579161595,5.682627307054151,5.6230393170651904,1.5950706659488878,6.866796849163932,3.444432052542097,10.566683943555763,17.00031211248431,0.8038926355457043,10.51444543327328,2.505797253813311,12.413738031247226,13.594317516987896,2.122003598867366,13.521114415379888,9.15767866866178,9.776489432569306,18.073380447775868,16.68966636003504,18.054061235143152,11.296516378585055,13.950306665464707,19.471080346284538,15.914878280395591,10.280636324767837,15.676021603100105,5.094371970272982,1.2290866932669386,14.912369835640433,9.894199348047321,10.647318096206412,18.27308295591399,5.013671960310591,18.898946190113335,7.996094493004047,17.124738901253526,17.12055928463605,9.456164965620495,15.316319950053767,12.143248538652461,14.08266431480767,3.6970511454930444,10.363544848281162,8.157707356979799,10.133421091588959,15.862267967826597,18.83824499685221,4.814391293755649,10.129565590540563,9.096062857737293,4.190600855219078,4.445701544080007,2.8195456849153944,15.058180449244528,15.315718944809484,6.4786125800176375,8.342340503749028,15.70839875232441,12.581710295953403,18.089347306001056,1.4845407969831559,2.2350581305300743,4.514717990699899,6.3872215937315335,16.27897514022598,0.5919380923533613,7.681013279630942,19.999163403190288,19.590535924697793,14.045784148816649,14.51829792066999,15.641791440598766,5.292886557685983,2.3629953078846277,14.662410089768127,1.5323082116975506,19.095599557782798,8.755076083998908,15.10115339462994,17.199572754891,9.102641850449103,4.216311264952095,15.111111153634154,4.8183256430006605,0.5463887892879971,17.185397294079564,19.327407243992365,13.050346449019909,17.126416881303122,0.3660814559282022,12.275766105170645,2.2495526481408,3.018036454568107,10.587382320026508,9.52183476452188,12.270842756833114,1.5148935607656222,0.799688258086233,11.023284220661797,12.85439113673001,9.466765875246796,2.966484613880942,0.39964553316234497,13.632624471188063,0.5887914576369457,15.572615378658776,17.16240996928494,5.8674391128995,12.152311118135506,14.653279072280515,9.885573817301712,9.587812211157711,14.677107327106164,7.816580462454117,11.100156067261722,9.080634284962791,9.023863286358926,3.270996821077725,17.759723958206287,17.94499052737902,1.9327927701188186,2.811945270730547,11.149788835177596,18.777307571016205,7.69675022362633,14.088790227527102,4.917768818520973,6.087609573726835,13.14667035690173,14.687802652893103,0.4752802929180966,12.614863815279755,5.121964031913677,8.944824849886142,3.4196981880285016,7.996680811700192,6.499779256516849,15.098654467882447,13.669525491341004,2.3640262275368684,12.761038010422908,5.6912013134754424,19.674225915649618,4.663027648742779,11.43890726869596,13.357543770251098,11.326610656777095,13.960914201061998,12.761449762593497,1.416847612622183,19.112561383924692,19.145153746219385,9.523800500001197,11.52149278722382,13.673219667508882,12.50045104843894,10.651830221443163,4.6798307943535855,16.571557466367807,4.152159291064139,18.609344519893472,9.37311896738752,15.514997486158592,1.8956246281610634,16.670964351411108,19.947266813851996,12.540178341596118,14.146185644180473,12.463568988426248,1.9347261266585303,4.3665431841551605,17.5113446864434,12.0725425799918,15.49118715488422,17.918302084817018,18.716845735220588,18.33794029565886,4.97389227837159,15.806238855075382,8.263088911011707,3.2144231736199336,16.684531416190914,13.809061842721118,5.130521061990123,3.2374698475984687,12.51564947147767,1.546675982148198,5.260220377398026,15.68085158275068,19.387218486201526,15.29934634544174,7.384387256728235,10.051641611823952,0.7710887185423765,13.043459318119371,8.81218187639706,6.41907021260959,12.732495380622794,18.870311289102904,12.465815566642945,4.432995234854422,15.39323726080013,5.79319572980276,15.720282625484492,0.964289980028048,11.812967963106011,13.773584497225402,13.901500424981457,6.375869229221758,12.40274006704305,19.486174778708648,2.580293855752216,8.98785873452914,0.027326168318833055,2.800278764658084,9.050868020371476,13.493970516335608,3.8881804063629755,19.565335508024518,2.04324450576558,19.548833442943852,0.011947514102610413,5.188879907544028,2.5599242649906584,19.16297244699189,17.834545261520493,7.42230787997324,1.9461152482326494,15.911321545639371,12.978641388486437,6.714106920510816,8.043909867296705,4.014865990266365,11.796645854804883,12.213774148436123,16.6275203481692,2.9477870815492135,2.5681441800802007,4.564113669955718,5.571969243021435,0.31584930725235605,6.293759479131786,16.316479158406434,6.6493573257717475,11.905496733071189,2.4438188549966533,8.810209028866463,2.2077458018065244,0.13202399469126824,13.70963727411285,7.975104288796904,4.660742964641047,14.451233827080575,10.98580496886541,14.94711801690757,2.360332671186698,5.8814177082044905,5.714727984738706,18.04980936275882,8.064360675927986,15.73793599973509,4.196196298175061,0.038279871212019145,4.147531752464997,13.021649616835163,7.739472623272476,6.241344425298445,11.35055048659028,9.298145614593523,13.24907801696292,1.7242044434104065,14.93966744504569,4.418767212196633,6.253264121573854,8.682231431009635,6.564551107956267,10.88265555012998,7.29421048786572,3.037818759965605,17.132430282213097,1.893245153378449,19.184090557487306,19.57996871563022,1.5016394765556296,7.60267885595399,19.028389072613074,17.41606145090733,18.244398889472798,17.018642275122403,16.027738679012785,17.590713653793117,13.074958620473582,15.48792268372373,15.543719135543173,8.236140366246424,8.705568867316519,9.932186264495275,12.624699201064399,5.650586570629299,5.956719617385127,10.946387272204072,3.8012934435305112,12.752767213308488,5.603815240527652,18.582941396798624,14.205385916072878,6.033132672402295,4.015584449518386,6.685262384105104,0.43345152627785044,2.6060130733886178,10.740895157364164,2.1503197311439104,5.4968901556935545,11.32796716012303,16.92236343125522,0.47805360509053596,0.19412315472346897,8.68001973528993,7.957812996974405,8.042668568949786,7.551051641155193,10.226508919397252,1.085662989695293,19.72020167150228,8.751580561873542,0.13742002049281776,9.938687876570276,13.031551281391884,16.10831154379341,4.694071139265454,6.33993434563608,3.417335343237351,2.878985872518518,14.090416166062987,15.455055692210312,15.676972090858762,17.837142606317904,3.494094064720148,4.898796628230855,8.646554117642706,12.178348042215582,5.351124868661841,0.3796346028269282,2.2725744209148857,11.178077077090776,19.732680107983,12.727862160393059,12.930541976680328,12.846554928519964,15.797066716149448,14.976364145770717,0.05823935691764426,6.936505984670696,13.129453084448315,7.709556412452634,15.523535912726505,13.334880062870425,13.594005257552535,7.637672900837487,13.457188612227933,12.540574718450817,5.795041734277846,2.8014326809847656,12.224672647304327,0.28891407422602544,16.302517584131238,7.102005172909895,10.282999365912314,18.185627426056826,2.2383986500175235,16.34451394687786,8.206899097169021,8.37911204439909,0.8762656065187624,12.219973814160191,9.630580476976585,18.85242302402808,10.824534936062445,8.596833838758467,15.965878460847156,15.396107257544344,15.889868615125739,4.663144997183872,16.29000739870369,1.5952553402030212,6.892421911698068,14.891510234149319,12.871918878565957,11.14561165790942,11.021637687272214,11.356784943065588,9.030935110254168,2.5896678706647958,9.592767625934325,15.782413128406603,2.5461860693103056,11.789067162004866,7.524108267941876,4.19683826368126,18.733273347550295,3.853604297534714,17.498755266618076,7.995821714931521,17.905245230108953,18.17796124084157,9.426837361971758,2.7527213671217776,12.509301133605746,13.29697783966196,12.626410639456754,8.427392886865292,8.860530119708434,19.817279534335693,5.347509576307052,2.406497795598015,14.439289248542693,2.662928728965994,18.290050502854605,3.990635008254575,6.415542235433835,2.574405150787751,8.884666083614636,16.739528463332856,0.021467415734734985,9.338450263305017,17.037705661021675,3.064322812586635,13.608347507193264,5.242604464430989,16.235262100265267,8.188160421309153,9.715921401982088,13.164930521888616,12.448034862641553,7.081228823197043,19.64873228722577,16.77486145396479,9.670804348895503,16.87161764014884,8.036847978416892,15.817055645760242,18.575224377362428,8.880713421408256,12.643174459336528,12.390460028142801,7.091150867432066,11.244443103347251,3.2347661049003795,18.190181105603568,15.063754526463228,3.6565229893649898,1.455112968690293,15.03295201521906,13.579721961394299,12.209848908069777,5.38338388376586,11.416761998320716,7.543947512620299,14.971295020616363,5.9204262645423755,18.861317869316192,18.898196721419428,16.769709163545265,16.208233282166628,13.40037276056325,15.004242930416174,6.924471716615184,12.194007516615288,1.9327955698281851,3.396937108510527,13.68776581773619,0.36235510519694536,10.88835398810895,7.439584584578562,10.579405194240419,15.632619308713402,0.48664248755319495,2.307555224815343,16.271228768452456,1.5205721303360509,11.089711739944349,9.610944136772176,6.85613110782517,6.721442132292239,3.037141608088665,5.865586578459832,0.452906079079316,0.46318591618563776,12.512007113512325,9.311817166722967,10.930583613373198,10.881346415010453,7.036447268503587,18.387685410903245,19.345323980109686,5.196252571704902,1.8603318764960486,11.028602960324614,1.2717100117311952,10.691460114006365,3.690102104599391,15.167553037294127,0.24239698775611718,16.97283000707218,14.339927737978929,0.7912341102103682,11.603983107312823,12.807457347776614,2.2309396791123826,15.31657429374067,6.401678708722485,18.594999028951605,6.428627680404064,15.408118670272795,13.77591032248272,17.85483383553634,11.57268913739465,14.074667701009492,15.316502001322782,6.828873183897186,6.012504837112411,7.299819962132097,0.8031403471904541,19.378257556894777,9.468356369875504,11.814484654217745,9.288834319057301,0.017025662010405895,10.90454558676262,15.748267919806128,11.486393911463399,9.047400894767005,12.433960678119234,6.1529507943964035,11.231668008127649,15.99881027980702,7.563823336619384,17.73797763068965,12.571337015223719,4.997849133633698,10.330170583600378,10.107341067811468,15.189513417000802,0.02772667262739059,0.45998183679694993,6.478909413029723,15.420906966323727,1.8186740466186224,7.802524913288225,0.07999152338993731,11.355232688689846,2.3724726086249603,11.041532146804478,4.010575183622791,3.4595224910611844,18.38688048935645,7.089168168748268,11.393295490320252,2.8898024267738176,7.5442784029612,1.7635922483179556,3.325625350200876,2.678309591856949,5.315358474332084,12.868523087000847,5.307336863239951,14.22618765055985,5.592317646459817,14.795200917991167,17.78694752510222,7.884708845217245,14.33064940625183,3.6650539527037296,8.790869125197451,17.646534920118086,8.225960149956922,8.450143409935485,13.951254480229176,8.39441941601336,5.735148848877705,4.640386481613441,6.1918074165648695,7.058545069548141,11.969917832192962,14.624923927785858,2.0420941561480133,0.07662506536850522,7.033488979521296,2.84858576832435,2.899970110366268,12.433280438752172,10.397243625341499,2.3804150703964044,19.7302097270569,0.8283302440531815,13.613379160312373,8.655388955686828,15.213659395168753,14.21172534521887,19.02184263788734,14.931097162217224,0.9084478959699815,19.290253654389844,8.580241050299957,12.686442618766538,2.171590329501285,5.26757965499653,12.163502852156633,7.901337590070239,18.599913801460694,14.361784797836105,7.780082510260313,9.939871297922803,5.13152028144598,16.066310097607698,15.22057796686477,14.473635069084686,3.893760968676272,13.680699274429443,0.7833372709938669,6.577687017911935,1.4123708553540837,1.5507598419977509,1.9782718449016201,12.969966298340378,3.5351686541455507,5.623256321168437,16.49973925290871,8.358867489990033,7.142222802451514,14.113718817436581,6.083507897070106,15.50451873103967,0.8800987487852119,6.231868540588743,9.98076592321726,15.163660375485382,17.471567701851317,15.744702351211508,14.586599603905528,8.352731850900312,19.448270787325672,5.240091189561098,19.984154889973958,13.705513086475442,15.94800464037779,17.15826794552904,15.994373675626514,10.021757908491193,2.435461185755856,2.1741216324223567,16.428476247184925,11.376934076065348,3.6126132106100872,17.298549410532825,2.5154570292004275,5.136026528668891,0.6355885433954533,0.5620008958255562,11.502467237063833,10.282033866820557,1.6804615144822055,9.030751166152896,17.490460126103834,4.804282782560376,6.674501881301387,3.309320988465574,16.464832148823525,7.269639797878353,18.656599495358993,3.6990827631903933,13.831229433655853,1.4322603543051793,11.091958495181476,7.4308954171155595,0.5898709087810827,14.940342041170865,15.28332307810829,8.818618953562925,12.285247231331295,9.132358352149916,12.304915295477121,10.940575518574578,8.257002570000939,4.359310082908072,19.80753285669517,14.568017326365323,7.124584218906875,13.609402104172714,17.905655944903607,9.817364083946934,2.8218200700715235,1.8100419830162018,3.959195413033547,3.7477809465962153,10.097533775793494,5.807211617464332,6.870408251583453,15.241699746318336,16.080321222944363,16.38294283509623,18.195256142156225,12.770994024971785,17.537272039611445,3.1349494673080214,18.155687456621614,3.5157811668489725,15.843411861087082,10.387005529758436,2.0100414410262024,9.011225293990336,7.5126796934543405,2.2380573909588097,17.584769796366203,9.643880915694867,10.981158505027192,17.3914415345899,14.067360671404984,6.284370119862719,14.239241083872937,14.722592130358452,3.55809407500554,18.805316518474196,6.253989670740636,11.88456059479378,16.524398818364748,3.7191312668563103,13.309764066003611,1.7162264723829823,11.515000046520676,2.287974798896406,2.449772732702109,17.7374521283831,4.782796482703868,10.803499904769636,15.868787364002518,0.5197043458264261,12.76951529990658,13.865843411125564,4.99350178151714,1.42925572989546,4.830361149279581,13.09927326894973,18.949257622657644,12.390706068462606,15.865812816143187,11.345876489081421,5.020191125946871,2.734832209543714,11.371492728142352,4.438589249072975,19.064590160050678,6.9574109158732655,19.89159217654546,3.644264251761795,1.591077876791176,17.957598654826157,2.34846009203852,14.581345683409763,10.524786266128508,15.384995799983837,10.4477533001279,13.738418908184498,0.9605290822884749,15.52744703645403,19.21673356185897,9.936525016707552,12.93739816624672,15.119294381623472,16.855514356827538,11.00624305129967,18.871618803157666,1.4523842326893632,15.498834228568947,7.812395620610211,14.373723999121273,17.929869794643917,11.990241552897455,14.544019902883667,6.925517266524928,4.373572854427348,19.329466283645292,19.247694155521135,12.032545785655753,13.745756300635655,14.597333744270857,16.808775311151468,5.633886289176919,16.382394471274026,4.415590583399855,15.503851839443886,0.7479834637221972,6.16648658167259,0.8413777419929414,13.1769784328119,6.087856880398235,16.463502016275417,0.5662118818013084,19.377673681201493,2.8976813077203767,16.154622117283775,8.66787878063018,9.294631314830148,13.540447794646235,1.6360088320917088,17.846172900351164,3.808270776868521,4.694572617535107,10.983415756781628,19.545822818255097,16.39507181344754,19.45140552766766,14.544217399243173,10.34430395792208,10.1389138919465,17.585274728032758,14.772921909958075,4.044675247592222,11.445035351485181,13.903548231731149,11.411824859356138,13.555541621153111,9.04701207183928,5.472543718181244,3.102263784458872,13.478409586733754,13.27329853436721,14.730259785474136,0.02507049338305478,12.750857379513425,14.57220436288762,5.424844768685002,6.100200855463527,15.573836803920527,19.755241130008663,2.1353236141333243,7.8443280671029525,5.2478236019904445,14.517817694445686,1.730616131968441,2.8609129925738985,17.92919176627002,10.13674890057989,4.920833949227168,10.47930062044447,12.644088094151673,2.5000967709102495,9.62945122008196,14.493105813789935,14.466264050480708,4.946628291653106,14.93699394094168,14.534149943356582,11.545262176021351,15.153806697777004,1.2353342094867026,18.04926464453667,15.529052040199701,2.2940856224579687,18.653582800767822,11.925097659542434,15.590196909508904,2.890921049498263,6.3035320460456745,11.17049558938806,3.7439228983462502,7.1643562914378345,1.0034083091555024,1.7549071232896907,13.408797975343646,0.355544914710304,15.803196521071614,19.183597854099297,15.088796415896057,2.807429658476468,12.30036311063321,19.656141023306176,11.25975470724046,1.906567193134432,5.32104318777642,3.336478912391012,14.82890595549437,12.392445166180757,6.076078664837867,12.554249980609411,15.970265197270365,8.812600385723774,15.052755025491681,18.45712389037193,19.20520218527375,12.794000362693026,18.259771191307614,14.80299732229572,10.921583996040694,17.972345869040094,0.5060166619849626,17.752319313066014,9.297306323737029,3.5904458452863164,1.6451527705910296,18.519177727801335,5.605871848294055,17.173381070666004,18.20505119910522,8.473017640532126,12.952517688899086,5.993407267807274,8.188834888810778,11.830594819027652,7.589619419938058,2.3655538544295673,5.287066308730539,4.036916651150189,15.01051834899565,6.715518175925128,2.007077406755413,14.541294083997824,19.63161509816748,4.948239245934252,19.836677523439672,6.438070252485666,4.928717923060821,10.267255067294073,3.240659471141325,3.8989186914178164,2.19798982104519,19.173682958616,18.39321601425646,7.892051144038215,15.833526506632229,2.11083845212769,1.2538883446953442,17.76693627545417,15.394246133597651,4.115747589901413,5.413743970079321,14.570040121366308,19.900077816585938,2.0689054305171384,19.457673286237117,16.740235523356567,10.077878465407428,5.2455291442829655,18.333064810682114,12.89662021919324,3.132123754200582,2.8735483539743445,15.87527105764892,12.81236305975101,19.92683907183344,19.92498926329015,10.837612559023624,8.655062388208158,6.213971221712167,17.571665711009842,2.4015865320233365,8.926432495144944,18.34929801236756,4.413430756678172,6.293435963652456,6.238097358110282,10.509805540272836,4.424680859012828,12.795911960802764,19.54420684228941,18.99461396865391,10.224859023220612,19.74723165679151,17.27201693673491,3.05785183160177,4.357127655588453,12.65539187976508,6.869855215626854,17.657883780299976,12.403807740344423,0.29907098851102987,3.7853896451405866,17.693144442791827,17.302673514668108,1.6937062571340045,17.27934473996793,10.611050154162252,6.348924532133111,19.023707384226626,18.501434354317887,17.84196970635078,19.210578462703406,19.298066507964297,12.142900859173675,5.944382257084273,7.628590257898895,5.23749994539672,13.077114240285667,13.2298889946642,6.107877433005884,19.79838642746077,3.445986723289951,16.458625431389223,4.876350971507644,18.073455243677394,12.040951579367025,10.944518731513151,6.98565298151097,11.522667827083946,11.939740045069755,18.221218424127148,4.636856859394594,12.161790035731194,10.33405924509269,4.403383874282589,18.422227966799785,18.076948094906665,19.071939197737173,18.217128099801275,17.73495041026125,16.7893171547695,11.870304499426796,3.153229186099904,13.51466156941322,0.18050307746575456,16.757680016702476,4.182431267046054,19.681275369335648,17.449198424535794,19.991297345414832,4.890536755171069,8.77977192010174,11.031532815848717,7.9180273520617295,15.266963513085553,3.6127907785623448,10.811715899304208,6.860427217153733,18.336208985563562,18.425169483710597,9.21386702294081,8.09932580439932,6.135286213453344,0.9431525421194076,9.150040594829413,13.741698862943537,5.700492877286072,4.841067236566423,13.00469116202041,0.01573478656374583,15.85614796020376,6.788361085662551,13.787428477365662,17.087267602387524,0.0922572361440066,13.880584480202337,11.052372858402016,16.818416817393967,2.4401763777377905,4.924258754290527,10.502567362493744,15.534680506142276,17.161438442346004,14.705246803206741,19.556493830824916,7.287950900032323,14.736252259604704,13.104041812429514,1.7969828047356629,6.519708310980046,13.942088582873883,15.988750212462124,4.511704713508915,2.7928126186211344,16.848803940611752,0.19624104410719045,6.2832100378381295,13.499360429157804,15.907987619523096,3.8730727344596882,18.998318851088673,19.54521204597476,5.76480007418771,5.995549457549489,5.243967859428693,3.21455666041373,16.57351735217877,7.192200526773989,9.023658195327586,11.234146283846007,1.170645293446384,7.84219572907884,13.930152789934303,10.058817603077049,1.1132593479027442,7.973823731484009,11.257964844601677,0.47825503249493195,2.956366419927523,4.013200977174334,4.537396671088194,11.657494753185835,1.2499298505589573,18.905037076143984,9.694798179899049,19.654256939989416,5.784916012717236,5.992937316922555,14.142237904591077,0.6133498800314285,12.582172007982928,15.957269194581993,7.877311275120489,6.246977453348199,8.40772940519912,2.4491283406611553,8.131670239520691,15.047415282481102,18.216527985836333,13.848445579826322,17.873837087378032,2.187113039490387,17.668715693918095,14.135513403110163,17.30635312740238,17.82135230980677,3.6748896827288213,15.708535928766597,19.804830461070235,3.672254381010225,19.423605385798677,8.832134829201754,5.635874873818447,15.404934479587165,4.8226514961363565,19.803762655888143,6.755844727262068,3.005845187645799,17.13805233448744,17.309880841635383,19.771595147992752,16.336536722375143,12.226833972717529,18.124327873745823,5.842901587513496,11.338079660233378,11.98981092237502,13.665016506531744,1.7213143055365077,18.382878120793606,5.877373907604495,18.151145171599726,5.636167267554764,3.655994809726968,14.569869137053427,18.79434007848062,11.557080058186253,4.026846588256521,18.95384275693737,2.304923364474294,0.9027679129287547,19.38467504754243,5.929845226760966,7.947536630596841,1.2849295130638039,13.636081522720968,9.584198249852264,6.425482879999889,9.735667294292622,13.801719951097713,3.555648618055529,0.827954970513014,6.15239644524495,19.560688745282402,4.191449939453551,12.123940939393968,12.582221058420888,2.778176057829098,13.591630345788541,9.57855241498871,19.391988423372695,9.063811889515318,9.40853157183836,16.75285207175696,12.014893294914426,14.521275349941089,5.3810195448420295,17.311380058783303,19.957977115071735,11.089943870476532,8.304155685347784,5.3185877993790776,10.089223599310206,16.522264277665265,13.460852009166121,14.295159675728257,1.3138658954698412,10.136745689483275,16.98799529669571,15.813427901154853,0.44407979388326524,7.082509359302129,6.796361576367853,7.05256377863857,8.442237815717991,12.934631019975388,2.58804409179338,9.95591785037021,13.544908095388077,11.648696527836764,5.811172901479527,14.551675228365685,18.031486197161097,14.795666711581536,1.7048613834241833,7.1598223373925896,13.929341814068081,8.659125113898005,4.992947130304,3.054485221904475,2.18979698075751,11.575994291112494,9.987813706125843,5.19824973759714,2.7846515274630734,1.6002873778845084,5.387094118949083,10.414000605705333,6.516898053714568,10.770611311933607,8.072480786439646,5.668654666459281,19.067360434181943,4.863657625650952,4.462614928502591,14.260097081403114,7.911551023932861,4.034124228069933,4.942328167508339,6.185640258213199,7.8184881497512215,4.123498510704411,19.629676579661282,14.459671542986596,9.49860172599212,6.536240721118052,15.839452219513515,13.004629386745417,5.184339317329454,5.020668479136883,13.574768240041738,3.062635390133197,1.7640538104963843,5.832706954425375,9.710230397646189,14.971922369889112,17.05899289111535,4.76359513365642,17.911758716871915,3.835090213703274,4.6920539655034466,14.49793095221887,14.104836570329402,6.051006410666813,19.107234642415897,11.697420637421438,9.294851538204547,1.023086782950089,0.5316806158941612,0.7938590567521153,14.77407868931314,7.297230062944342,18.610773880143483,17.567594560685595,5.060999428434543,15.013933176297488,2.204806233233514,7.558877938768642,11.074015023333175,16.511012620788,18.539806879433044,11.727961611416804,6.132830398232372,13.593919755127018,6.480883729440201,11.781251742470129,10.505170249612847,0.2536372841411305,3.0590007440409117,0.9351749713235558,16.11134430443184,15.953546137460762,13.189985671952599,15.668190480102592,4.702744010093016,8.774900200370173,2.9965657223820585,11.019055788809347,0.8615862172316424,1.2854237107556443,5.116844838310812,15.064420419034006,6.163283523348073,11.965579616502492,5.389311034778026,8.448422605167263,5.622179782475909,7.418852846574762,16.192529790246763,10.67299617425844,7.488273432005341,1.8691272938838788,10.540224097226428,1.3908206578487237,10.682595048771685,2.106854261152291,4.307244887659132,6.310648481474086,10.61606926209819,5.7686938157407885,1.7257225869134718,13.379403588602061,14.432191386019081,6.9195280502255985,17.426807692135164,14.236770360528897,0.9535512207214891,11.698533640296716,7.882739291822642,7.95204477066962,9.762757836244123,9.07419305994071,6.62668211470598,8.777012779532885,12.03224447389938,6.294563668384021,12.30568220315861,6.56302646717335,12.951315678424322,2.8770640836244654,14.29849685286801,7.797328706903577,10.921480276186934,2.8669155995638773,12.592183337102503,12.290138348405346,10.47306165256391,10.005732238735646,12.109926854801625,3.6841110015227674,18.980501091707623,8.70511100804027,4.15246492369008,19.148712156916844,10.567890807167828,11.127349344101587,16.339374685864577,7.890138199512164,8.244792671357724,14.616378101029248,15.8454072135675,16.188346987893382,14.84577736379443,6.936304854986997,10.523884508855721,10.656647251136828,11.045771615098783,0.3363811851223808,10.208760831630975,18.04959564866136,13.562498729705844,15.422632172567985,1.7090225264854508,16.456546780278035,15.181152334591284,12.038142583871366,13.315014091215197,5.880622633697317,0.6063599053765367,1.6284315423192286,6.882951922244982,15.415268451398108,2.3293480641846864,13.518795092571505,18.07661631555062,16.60550321426754,5.335141514978563,18.41059353155042,10.227380050290233,16.69561022830507,11.27699346221846,0.9278464801000874,9.306184222391579,10.47604403983518,1.2344731591635627,7.503067807574353,0.5117388892701236,6.22445659021543,11.607859381956684,9.74511729906732,1.261978319197583,6.1033064069162535,10.309733423773505,14.522862404236431,5.854557095927917,14.413213294490323,6.319564190758005,9.789981877161505,5.401248292942835,8.607366860614931,7.164573945046668,2.7730122604110585,19.30633473842365,15.644521330455605,0.8660970381376165,1.1783476654488556,17.926022560754802,2.422405188773742,10.161612909345,8.363347767775915,19.142484491215853,4.491642072212283,16.800686959011028,0.40804264543247815,9.828778878962066,11.272973137707453,0.044671923744217246,10.111568309752395,1.04036504892838,7.2760433610004105,13.905012286721782,17.431868521148868,14.307365562720044,11.7291492271264,17.703979402177023,14.336731254936739,3.518983200371628,0.15689790939013903,10.171637353419708,11.20025021583749,4.651322770971942,19.89501361686353,1.1266341968547344,19.81874136923676,8.414023524263179,7.3754594117928285,4.181600874653446,10.26500621177405,2.786475023886581,8.341881518738479,1.321817266432177,6.430442463464305,9.023012923410008,3.4487555248978197,0.4796385192855279,18.493934225117382,9.385661528667363,6.136290253990873,0.6390592762062886,0.22399484998802066,5.866966279931924,12.484057377866492,11.78627307639141,19.809141180727472,18.68180640586302,9.394528859857992,2.6501310762707453,2.805914741363096,11.362163710447636,5.177504052939916,17.916156789850675,5.189385261088932,4.784087518747073,1.9283926167376864,9.840227165361512,0.9687627527233333,5.472595484467266,8.292484319154791,0.5263550392756011,17.40298315400977,17.145031445132346,5.073237254644956,8.489653130414027,6.440658395253549,12.506292777988097,14.842728065487307,15.63636509244227,17.75180399668112,9.312054659128414,6.141567929431715,9.572106732580101,2.9529628218144444,12.60380282847632,15.5998745496714,16.21189504727895,11.487598934025488,0.1479201541442965,10.51633881276893,19.30779233623944,15.503211042800613,15.151606654011571,3.415023529275456,2.8508844560466917,5.17433074642045,4.9242985304893105,3.712839261822838,10.595089406385348,0.9728505352093597,10.731857057018242,4.208822235064371,13.510466194779053,8.525370925499764,10.87897796697022,18.211391557518205,2.213555316323368,3.2361251310435213,5.152976241539258,14.413248436102748,18.427282232863025,9.959232476404342,14.645571766254841,19.260239976892912,1.446501260337043,18.215460228015758,9.554690901447621,16.22661142504262,11.605855300132312,9.573134963337818,15.652495772951633,4.151140489219953,8.417957111459158,16.128970001368263,9.478365981979637,10.813278619235035,18.621500703073064,17.796062462105454,2.0566897404728435,5.778317813781517,13.026850086404668,8.392056344931387,19.90967376963721,18.370122020312976,4.580361074615009,5.596687938728833,7.457869270359914,15.82857604453829,12.920535807531564,4.63518489220629,4.114057860153455,17.170036355655803,6.100997161887993,16.98800629049066,15.013522575660776,19.021968644893494,16.60245445642554,11.883435635119731,0.8608683263798156,1.023103488384005,11.546136957126937,0.8569708734145687,9.589254039208516,5.852226087286372,14.13444856065638,4.258328986136948,9.755146153624068,6.163095806022434,6.57596494780651,15.431399772597905,12.132805071419565,2.565103401345583,5.125751249931203,11.386466167534222,11.05875885872286,13.535725799068445,7.653220684389592,3.573157160919571,17.280609195499267,11.414916129656373,16.682474125644262,8.064384500936224,4.105398420985544,5.110791426150039,15.175770321265931,5.890158447405849,11.239599754770886,5.441893759888385,11.07384484588354,6.569694137651361,19.14640195067168,2.1651435919762863,1.2111485063640703,15.088358901631427,17.05508990378343,4.25998220423029,17.420080342287456,13.091985511428108,0.03226336156819887,5.068926497519124,1.169242433426505,12.608261050637628,1.2082596681482372,14.920344365819211,5.5126228180749415,0.2950748467539466,4.575658587516482,11.590233728528077,1.9242492535156863,12.64666537316133,2.1761382604162094,16.70180542831074,6.138604894129065,3.230932984512278,16.696932952782667,16.578731814485344,11.714166926174908,11.726805047175395,9.926003181271685,8.042598531908922,14.222574467607938,19.643661034214304,16.255785984815475,14.339052318475538,9.895650976040681,18.50015479623444,11.23443056254169,17.528539536761542,15.872135295613234,15.277951668286608,8.894550574563818,19.921671392226806,18.265465748804175,9.468813232077572,10.566795660625917,13.089184147558646,0.006228537722501315,16.9244388258319,11.213964035254422,13.748409856715305,2.664013298871075,3.687055845258209,6.587729173321204,16.276283483172445,12.341284833198113,16.488015407889918,6.60418617888201,14.80454892464941,11.935923195149126,9.532234408890577,4.911896948898273,15.832186088234291,14.590534449016118,3.3576960232942055,13.463290888061788,18.912324733527342,2.981809549976755,7.684979370675107,0.38543954413230885,12.899892288708536,0.053943377787262214,18.994713705228264,10.4160673203987,7.464014848418428,11.941367147361643,0.8159141596780861,0.25659680471382007,18.650482791776305,7.523000947895326,14.534624701526546,7.826760454135457,2.4136386129237675,2.1513354180320077,3.865625520867648,19.718495043334187,10.145696762671967,10.874540443913943,7.2651705881758755,0.19408018564795793,4.039449012592793,5.321387367665551,12.45670443705276,5.984069406039305,8.789622210021069,15.440679596898242,11.92952028165585,18.065824220928654,10.288479750720821,17.358757725610886,15.659346937837505,6.706564541485691,3.113899040670254,4.805861535344702,13.385162170265863,1.8350212179309278,11.71905956151507,12.059066640847016,5.578678673843291,3.6507646257354587,18.801205151015044,18.918542608668545,9.896399553944528,8.497292455232843,18.143283489870427,12.099621116296056,15.800694896962831,11.745509724239081,0.0922993699720287,15.055857688094022,14.200424641980934,13.280362534515312,19.87382321462384,9.635421002939877,16.811745164400772,19.34739564865247,15.849504456644539,0.39012760283360315,12.724799687501637,7.093322725860345,0.5533855130438425,5.518278525544709,18.170889759493303,17.578277255263085,9.92739892466949,16.77344012658027,11.053129567839681,3.255718564383394,5.815953649586594,7.184890219434239,10.328806532065986,10.913649790152444,14.599272677655119,19.19547873249758,3.449528892419873,8.058173607582955,0.6227522942872943,17.470868029890458,10.192485899075496,14.665448832688778,17.338780034998564,4.977021492858462,1.7655175654942434,1.5532899297233893,5.147525826031414,15.483239994105634,14.857334231291794,4.905431986069448,3.1438390662343663,14.94601358894423,18.109496303323457,14.829270140437085,5.642261311752499,4.136985457011462,3.5027052818147197,13.538292084097732,17.97777510449138,14.846262505539404,12.33938761482873,11.585829544581433,13.330029805461677,6.070772453572433,2.170556727238049,4.391810607318791,18.62470660902087,19.816775299577397,10.785515718777923,1.2002158682224051,17.946512706195698,14.785725252356322,3.2202193817721136,13.799850231893798,8.750360848453038,8.693727866410015,1.568452023143796,18.358691388377785,3.6402008894613136,17.870529827916968,4.555302386057116,13.986448476454253,10.276573850600297,15.667168523636947,17.018794211881648,19.283959162292675,7.473014904925868,8.103576233824183,11.117575311416115,10.478099909825985,0.9208603659909986,19.077378924788768,11.649656935291253,11.867458865717637,8.57816065031011,16.98425142948654,2.3187627182002624,15.37096764543373,12.128558158181487,14.933299015109519,12.880265906268736,1.2758170201482644,13.992978047794953,8.812027203489524,6.519149186592559,13.508132227853906,0.6677089269980074,5.655049575335651,5.025185024029937,16.99932454819698,18.464565703774824,16.48758411151148,5.983898565382133,14.998162470513336,2.0431891080286446,5.275532535233718,17.241551937785,0.4053811911939187,2.665159038319729,15.354305451254465,16.688633847967335,19.987466064663142,9.5971186663675,2.0105663748322034,1.9660198009201446,18.878527203675045,19.33901564522973,19.616945534135176,6.009207115597257,11.902116472298584,12.050899521920474,8.230218533269724,13.541479695244117,8.597015445164903,5.428402640861609,2.174067937903499,8.325350238358498,2.6721448103179313,11.927753338957823,7.600001323122121,1.724265238579239,13.539111682313795,10.189406934122417,18.83411748934026,16.626572955346475,5.909768075372548,9.818823041701595,19.55628915981945,1.4918548332341652,6.227912649652438,14.464831884155167,18.257847737968397,0.9776388190085727,10.167521791641665,19.863518684438016,15.751212801693871,19.052060248511754,9.387202382284983,11.13281542301344,15.852626145465361,8.93536845560822,2.776431161960309,13.840554983520228,6.4868920504647365,6.89822651841653,2.5081058815677393,3.328138269953196,12.402049437056672,17.13438664752561,16.144242303484695,4.874355575063185,17.531986946948383,7.840482952326044,5.523606666031022,12.168128227811215,11.799811123811374,11.789189722104263,4.254522903577471,18.705645667395775,5.881523869059331,5.60473040676682,9.284873571077195,1.6715263275896097,15.397292032759523,18.811131580291875,1.3753817742352847,0.211368874094382,15.044447923409837,0.31017313644806865,2.8640265045365476,14.439377820899558,5.462529079825327,0.8069598367734354,18.917176902743222,19.68670070601823,14.666900458478782,19.049042242811844,6.633956519124982,8.746731366057677,7.034777087148694,16.872256777194092,1.7905333999751916,18.45889255003694,5.664446119423725,1.29235368190328,14.879367379903027,6.790236184192997,11.622763915723091,8.986079257488488,0.039079205681669116,17.97802340833696,7.523047010184896,6.481569097370672,1.3602032670586617,3.190916833440256,16.578911437901255,5.7914217060802375,7.988205438681115,19.40787939945666,17.33672206875611,7.361093036754154,15.980591872686162,10.746850283387941,16.495644886361287,8.370042686686606,12.956652539741977,7.142196966593466,18.08555547853727,14.825405217588322,5.7212729365867565,2.01126605593946,9.023275650905816,6.762008313150569,6.765292117424595,9.682077354968177,1.8945936136889152,6.5195777234048125,19.66245298297542,0.5810527890770523,15.564185869934114,13.32401022015695,1.6476868356232899,3.531533489532701,16.716230241396623,4.384811115254195,5.383191206407751,7.483509625667826,19.706207585777094,17.180552482148,6.625967182354819,7.624139135148846,6.982385261771409,10.479189787073713,17.70731760981277,15.557445496432752,4.9304043647144935,12.975344472225032,9.435689947631012,11.641624242843092,15.500145242559062,3.8073821293412546,2.1878271497736357,16.399279029973364,4.8470495504128275,8.05920599000386,15.754748242896639,2.9445930789756414,17.120049178635686,1.263821098738327,13.492908458641626,0.4587508306325283,17.02617059509626,3.104919258341572,18.32696291912564,18.967565210003446,0.12489440893894255,18.846841018495542,14.856172614029738,8.417012061061682,18.16386722588239,4.873612809983663,4.940388028072222,8.628568425968677,2.5351005658079817,14.30340443076787,1.2188130046076617,16.75245593007177,1.3997139129220937,2.1697768689038854,6.212538505838587,10.852963198542334,17.167220880572106,4.519415320457054,19.754324683956,17.362455539757264,3.2664466485889854,9.90607068172466,14.024611219512702,13.132633033003188,7.040376802427644,12.575340016796638,7.760793503878638,12.776525373697435,16.194332818251276,1.6496090457713564,6.284413086941059,9.08274393307412,17.092689893493123,6.75611594443962,19.071954614346275,14.180978934551991,10.39517003241186,10.654375337472128,14.706694490454355,13.278127269435704,1.903742038817744,13.652415200502649,3.979086346527123,16.062082412775478,14.82232151365164,13.885578800308451,9.221947972050248,17.604474800587134,7.4079781218678065,0.11718063615427265,3.93265176175142,6.783667256539814,0.3013223070659343,17.294942500362545,6.063114825607374,0.24839826811760002,7.972201159553638,10.220848169195428,10.317677501801068,0.7909905439134102,17.47681637135407,1.9107203709350928,0.6399835892364081,16.115359959425867,9.704306270553499,4.336250997036779,13.404532888885171,4.820204422585821,0.7390182348251262,7.60843927530821,14.623606672408492,17.292172317274776,13.162542016517701,12.693911547854366,18.18020112172027,1.449879305617463,0.23680389915259337,14.753884787120715,12.722182655000065,5.920052954778088,4.104451139396472,6.622669352935806,2.8590027175529675,2.2717641144687795,7.9484044940389165,14.55181920497845,18.98251687020649,2.5422961478531603,16.106741112715177,10.236328014965697,13.93155146022503,0.016732793078522157,15.908128330098563,9.740741370161313,11.780620554299869,19.41365329626802,15.912232506290849,11.515217421079026,5.68442730556995,6.810739711245621,16.61046573309672]}
},{}],52:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var randu = require( '@stdlib/math/base/random/randu' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var EPS = require( '@stdlib/math/constants/float64-eps' );
var factory = require( './../lib/factory.js' );


// FIXTURES //

var decimalDecimal = require( './fixtures/julia/decimal_decimal.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof factory, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a function', function test( t ) {
	var pdf = factory( 0.0, 1.0 );
	t.equal( typeof pdf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 1.0 );
	y = pdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NaN );
	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a finite `k`, the function returns a function which returns `0` when provided `+infinity` for `x`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 1.0 );
	y = pdf( PINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a finite `k`, the function returns a function which returns `0` when provided `-infinity` for `x`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 1.0 );
	y = pdf( NINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a negative `k`, the created function always returns `NaN`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( -1.0 );

	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if `k` equals `0`, the created function evaluates a degenerate distribution centered at `0.0`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 0.0 );

	y = pdf( -2.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( 0.0 );
	t.equal( y, PINF, 'returns +infinity for x equal to 0' );

	y = pdf( 1.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( PINF );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( NINF );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the returned function returns `0` for all `x < 0`', function test( t ) {
	var pdf;
	var x;
	var y;
	var i;

	pdf = factory( 1.0 );
	for ( i = 0; i < 100; i++ ) {
		x = -( randu()*100.0 ) - EPS;
		y = pdf( x );
		t.equal( y, 0.0, 'returns 0 for x='+x );
	}
	t.end();
});

tape( 'the created function evaluates the pdf for `x` given degrees of freedom `k`', function test( t ) {
	var expected;
	var delta;
	var pdf;
	var tol;
	var k;
	var x;
	var y;
	var i;

	expected = decimalDecimal.expected;
	x = decimalDecimal.x;
	k = decimalDecimal.k;
	for ( i = 0; i < x.length; i++ ) {
		pdf = factory( k[i] );
		y = pdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+'. k:'+k[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 140.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. k: '+k[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/chi/pdf/test/test.factory.js")
},{"./../lib/factory.js":47,"./fixtures/julia/decimal_decimal.json":51,"@stdlib/math/base/assert/is-nan":41,"@stdlib/math/base/random/randu":70,"@stdlib/math/base/special/abs":74,"@stdlib/math/constants/float64-eps":143,"@stdlib/math/constants/float64-ninf":151,"@stdlib/math/constants/float64-pinf":153,"tape":242}],53:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var pdf = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof pdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `pdf` functions', function test( t ) {
	t.equal( typeof pdf.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/chi/pdf/test/test.js")
},{"./../lib":48,"tape":242}],54:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var randu = require( '@stdlib/math/base/random/randu' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var EPS = require( '@stdlib/math/constants/float64-eps' );
var pdf = require( './../lib' );


// FIXTURES //

var decimalDecimal = require( './fixtures/julia/decimal_decimal.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof pdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = pdf( NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = pdf( 0.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `+infinity` for `x` and a finite `k`, the function returns `0`', function test( t ) {
	var y = pdf( PINF, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a finite `k`, the function returns `0`', function test( t ) {
	var y = pdf( NINF, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided a negative `k`, the function always returns `NaN`', function test( t ) {
	var y;

	y = pdf( 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if `k` equals `0`, the function evaluates a degenerate distribution centered at `0`', function test( t ) {
	var y;

	y = pdf( 0.0, 0.0 );
	t.equal( y, PINF, 'returns +infinity for x equal to 0' );

	y = pdf( 1.0, 0.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( -1.5, 0.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( PINF, 0.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( NINF, 0.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( NaN, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function returns `0` for all `x < 0`', function test( t ) {
	var x;
	var y;
	var i;

	for ( i = 0; i < 100; i++ ) {
		x = -( randu()*100.0 ) - EPS;
		y = pdf( x, 1.0 );
		t.equal( y, 0.0, 'returns 0 for x='+x );
	}
	t.end();
});

tape( 'the function evaluates the pdf for `x` given degrees of freedom `k`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var k;
	var y;
	var i;

	expected = decimalDecimal.expected;
	x = decimalDecimal.x;
	k = decimalDecimal.k;
	for ( i = 0; i < x.length; i++ ) {
		y = pdf( x[i], k[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+'. k:'+k[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 140.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. k: '+k[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/chi/pdf/test/test.pdf.js")
},{"./../lib":48,"./fixtures/julia/decimal_decimal.json":51,"@stdlib/math/base/assert/is-nan":41,"@stdlib/math/base/random/randu":70,"@stdlib/math/base/special/abs":74,"@stdlib/math/constants/float64-eps":143,"@stdlib/math/constants/float64-ninf":151,"@stdlib/math/constants/float64-pinf":153,"tape":242}],55:[function(require,module,exports){
'use strict';

// MODULES //

var PINF = require( '@stdlib/math/constants/float64-pinf' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var nan = require( './nan.js' );


// MAIN //

/**
* Returns a function for evaluating the probability density function (PDF) of a degenerate distribution centered at a provided mean value.
*
* @param {number} mu - value at which to center the distribution
* @returns {Function} function to evaluate the probability density function
*
* @example
* var pdf = factory( 5.0 );
*
* var y = pdf( 0.0 );
* // returns 0.0
*
* y = pdf( 5.0 );
* // returns Number.POSITIVE_INFINITY
*/
function factory( mu ) {
	if ( isnan( mu ) ) {
		return nan;
	}
	return pdf;

	/**
	* Evaluates the probability density function (PDF) of a degenerate distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} evaluated probability density function
	*
	* @example
	* var y = pdf( 10.0 );
	* // returns <number>
	*/
	function pdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		return ( x === mu ) ? PINF : 0.0;
	} // end FUNCTION pdf()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./nan.js":57,"@stdlib/math/base/assert/is-nan":41,"@stdlib/math/constants/float64-pinf":153}],56:[function(require,module,exports){
'use strict';

/**
* Degenerate distribution probability density function (PDF).
*
* @module @stdlib/math/base/dist/degenerate/pdf
*
* @example
* var pdf = require( '@stdlib/math/base/dist/degenerate/pdf' );
*
* var y = pdf( 2.0, 0.0 );
* // returns 0.0
*
* @example
* var factory = require( '@stdlib/math/base/dist/degenerate/pdf' ).factory;
*
* var pdf = factory( 10.0 );
*
* var y = pdf( 10.0 );
* // returns Number.POSITIVE_INFINITY
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var pdf = require( './pdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( pdf, 'factory', factory );


// EXPORTS //

module.exports = pdf;

},{"./factory.js":55,"./pdf.js":58,"@stdlib/utils/define-read-only-property":161}],57:[function(require,module,exports){
'use strict';

/**
* Evaluates the probability density function (PDF) for an invalid degenerate distribution.
*
* @private
* @returns {number} `NaN`
*
* @example
* var y = pdf( 3.14 );
* // returns NaN
*/
function pdf() {
	return NaN;
} // end FUNCTION pdf()


// EXPORTS //

module.exports = pdf;

},{}],58:[function(require,module,exports){
'use strict';

// MODULES //

var PINF = require( '@stdlib/math/constants/float64-pinf' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );


// MAIN //

/**
* Evaluates the probability density function (PDF) for a degenerate distribution centered at `mu`.
*
* @param {number} x - input value
* @param {number} mu - constant value of the distribution
* @returns {number} evaluated probability density function
*
* @example
* var y = pdf( 2.0, 3.0 );
* // returns 0.0
* @example
* var y = pdf( 3.0, 3.0 );
* // returns Number.POSITIVE_INFINITY
* @example
* var y = pdf( NaN, 0.0 );
* // returns NaN
* @example
* var y = pdf( 0.0, NaN );
* // returns NaN
*/
function pdf( x, mu ) {
	if ( isnan( x ) || isnan( mu ) ) {
		return NaN;
	}
	return ( x === mu ) ? PINF : 0.0;
} // end FUNCTION pdf()


// EXPORTS //

module.exports = pdf;

},{"@stdlib/math/base/assert/is-nan":41,"@stdlib/math/constants/float64-pinf":153}],59:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":41}],60:[function(require,module,exports){
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

},{"./create_table.js":59,"@stdlib/assert/is-positive-integer":30,"@stdlib/math/base/random/minstd":65,"@stdlib/math/base/special/floor":83,"@stdlib/math/constants/int32-max":156,"@stdlib/utils/define-read-only-property":161}],61:[function(require,module,exports){
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

},{"./factory.js":60,"./minstd_shuffled.js":62,"@stdlib/utils/define-read-only-property":161}],62:[function(require,module,exports){
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

},{"./factory.js":60,"./rand_int32.js":63}],63:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":83,"@stdlib/math/constants/int32-max":156}],64:[function(require,module,exports){
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

},{"./rand_int32.js":67,"@stdlib/assert/is-positive-integer":30,"@stdlib/math/constants/int32-max":156,"@stdlib/utils/define-read-only-property":161}],65:[function(require,module,exports){
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

},{"./factory.js":64,"./minstd.js":66,"@stdlib/utils/define-read-only-property":161}],66:[function(require,module,exports){
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

},{"./factory.js":64,"./rand_int32.js":67}],67:[function(require,module,exports){
arguments[4][63][0].apply(exports,arguments)
},{"@stdlib/math/base/special/floor":83,"@stdlib/math/constants/int32-max":156,"dup":63}],68:[function(require,module,exports){
module.exports={
	"name": "minstd-shuffle"
}

},{}],69:[function(require,module,exports){
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

},{"./defaults.json":68,"./prngs.js":71,"@stdlib/assert/has-own-property":2,"@stdlib/assert/is-plain-object":27,"@stdlib/utils/define-read-only-property":161}],70:[function(require,module,exports){
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

},{"./factory.js":69,"./uniform.js":72,"@stdlib/utils/define-read-only-property":161}],71:[function(require,module,exports){
'use strict';

// MAIN //

var prngs = {};

prngs[ 'minstd' ] = require( '@stdlib/math/base/random/minstd' );
prngs[ 'minstd-shuffle' ] = require( '@stdlib/math/base/random/minstd-shuffle' );


// EXPORTS //

module.exports = prngs;

},{"@stdlib/math/base/random/minstd":65,"@stdlib/math/base/random/minstd-shuffle":61}],72:[function(require,module,exports){
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

},{"./factory.js":69}],73:[function(require,module,exports){
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

},{}],74:[function(require,module,exports){
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

},{"./abs.js":73}],75:[function(require,module,exports){
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

},{}],76:[function(require,module,exports){
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

},{"./ceil.js":75}],77:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-from-words":122,"@stdlib/math/base/utils/float64-get-high-word":126,"@stdlib/math/base/utils/float64-to-words":138}],78:[function(require,module,exports){
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

},{"./copysign.js":77}],79:[function(require,module,exports){
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

},{"./expmulti.js":80,"@stdlib/math/base/assert/is-nan":41,"@stdlib/math/base/special/trunc":111,"@stdlib/math/constants/float64-ninf":151,"@stdlib/math/constants/float64-pinf":153}],80:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ldexp":92,"@stdlib/math/base/tools/evalpoly":115}],81:[function(require,module,exports){
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

},{"./exp.js":79}],82:[function(require,module,exports){
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

},{}],83:[function(require,module,exports){
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

},{"./floor.js":82}],84:[function(require,module,exports){
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

},{"./small_approximation.js":86,"./stirling_approximation.js":87,"@stdlib/math/base/assert/is-integer":39,"@stdlib/math/base/assert/is-nan":41,"@stdlib/math/base/assert/is-negative-zero":43,"@stdlib/math/base/special/abs":74,"@stdlib/math/base/special/floor":83,"@stdlib/math/base/special/sin":108,"@stdlib/math/base/tools/evalrational":118,"@stdlib/math/constants/float64-ninf":151,"@stdlib/math/constants/float64-pi":152,"@stdlib/math/constants/float64-pinf":153}],85:[function(require,module,exports){
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

},{"./gamma.js":84}],86:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-eulergamma":144}],87:[function(require,module,exports){
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

},{"@stdlib/math/base/special/exp":81,"@stdlib/math/base/special/pow":94,"@stdlib/math/base/tools/evalpoly":115,"@stdlib/math/constants/float64-sqrt-two-pi":155}],88:[function(require,module,exports){
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

},{"./kernel_cos.js":89}],89:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":115}],90:[function(require,module,exports){
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

},{"./kernel_sin.js":91}],91:[function(require,module,exports){
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

},{}],92:[function(require,module,exports){
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

},{"./ldexp.js":93}],93:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":37,"@stdlib/math/base/assert/is-nan":41,"@stdlib/math/base/special/copysign":78,"@stdlib/math/base/utils/float64-exponent":120,"@stdlib/math/base/utils/float64-from-words":122,"@stdlib/math/base/utils/float64-normalize":130,"@stdlib/math/base/utils/float64-to-words":138,"@stdlib/math/constants/float64-exponent-bias":145,"@stdlib/math/constants/float64-max-base2-exponent":149,"@stdlib/math/constants/float64-max-base2-exponent-subnormal":148,"@stdlib/math/constants/float64-min-base2-exponent-subnormal":150,"@stdlib/math/constants/float64-ninf":151,"@stdlib/math/constants/float64-pinf":153}],94:[function(require,module,exports){
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

},{"./pow.js":97}],95:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":115,"@stdlib/math/base/utils/float64-get-high-word":126,"@stdlib/math/base/utils/float64-set-high-word":133,"@stdlib/math/base/utils/float64-set-low-word":135,"@stdlib/math/constants/float64-exponent-bias":145}],96:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":115,"@stdlib/math/base/utils/float64-set-low-word":135}],97:[function(require,module,exports){
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

},{"./log2ax.js":95,"./logx.js":96,"./pow2.js":98,"./x_is_zero.js":99,"./y_is_huge.js":100,"./y_is_infinite.js":101,"@stdlib/math/base/assert/is-infinite":37,"@stdlib/math/base/assert/is-integer":39,"@stdlib/math/base/assert/is-nan":41,"@stdlib/math/base/assert/is-odd":45,"@stdlib/math/base/special/abs":74,"@stdlib/math/base/special/sqrt":110,"@stdlib/math/base/utils/float64-get-high-word":126,"@stdlib/math/base/utils/float64-get-low-word":128,"@stdlib/math/base/utils/float64-set-low-word":135,"@stdlib/math/base/utils/float64-to-words":138,"@stdlib/math/base/utils/uint32-to-int32":141,"@stdlib/math/constants/float64-ninf":151,"@stdlib/math/constants/float64-pinf":153}],98:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ldexp":92,"@stdlib/math/base/tools/evalpoly":115,"@stdlib/math/base/utils/float64-get-high-word":126,"@stdlib/math/base/utils/float64-set-high-word":133,"@stdlib/math/base/utils/float64-set-low-word":135,"@stdlib/math/base/utils/uint32-to-int32":141,"@stdlib/math/constants/float64-exponent-bias":145,"@stdlib/math/constants/float64-ln-two":147}],99:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-odd":45,"@stdlib/math/base/special/copysign":78,"@stdlib/math/constants/float64-ninf":151,"@stdlib/math/constants/float64-pinf":153}],100:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":126}],101:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":74,"@stdlib/math/constants/float64-pinf":153}],102:[function(require,module,exports){
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

},{"./rempio2.js":104}],103:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":83,"@stdlib/math/base/special/ldexp":92}],104:[function(require,module,exports){
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

},{"./kernel_rempio2.js":103,"./rempio2_medium.js":105,"@stdlib/math/base/utils/float64-from-words":122,"@stdlib/math/base/utils/float64-get-high-word":126,"@stdlib/math/base/utils/float64-get-low-word":128}],105:[function(require,module,exports){
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

},{"@stdlib/math/base/special/round":106,"@stdlib/math/base/utils/float64-get-high-word":126}],106:[function(require,module,exports){
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

},{"./round.js":107}],107:[function(require,module,exports){
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

},{}],108:[function(require,module,exports){
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

},{"./sin.js":109}],109:[function(require,module,exports){
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

},{"@stdlib/math/base/special/kernel-cos":88,"@stdlib/math/base/special/kernel-sin":90,"@stdlib/math/base/special/rempio2":102,"@stdlib/math/base/utils/float64-get-high-word":126}],110:[function(require,module,exports){
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

},{}],111:[function(require,module,exports){
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

},{"./trunc.js":112}],112:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ceil":76,"@stdlib/math/base/special/floor":83}],113:[function(require,module,exports){
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

},{}],114:[function(require,module,exports){
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

},{"./evalpoly.js":113}],115:[function(require,module,exports){
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

},{"./evalpoly.js":113,"./factory.js":114,"@stdlib/utils/define-read-only-property":161}],116:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":74}],117:[function(require,module,exports){
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

},{"./evalrational.js":116}],118:[function(require,module,exports){
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

},{"./evalrational.js":116,"./factory.js":117,"@stdlib/utils/define-read-only-property":161}],119:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":126,"@stdlib/math/constants/float64-exponent-bias":145,"@stdlib/math/constants/float64-high-word-exponent-mask":146}],120:[function(require,module,exports){
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

},{"./exponent.js":119}],121:[function(require,module,exports){
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

},{"./indices.js":123}],122:[function(require,module,exports){
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

},{"./from_words.js":121}],123:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":15}],124:[function(require,module,exports){
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

},{"./high.js":125}],125:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":15}],126:[function(require,module,exports){
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

},{"./get_high_word.js":124}],127:[function(require,module,exports){
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

},{"./low.js":129}],128:[function(require,module,exports){
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

},{"./get_low_word.js":127}],129:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":15}],130:[function(require,module,exports){
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

},{"./normalize.js":131}],131:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":37,"@stdlib/math/base/assert/is-nan":41,"@stdlib/math/base/special/abs":74,"@stdlib/math/constants/float64-smallest-normal":154}],132:[function(require,module,exports){
arguments[4][125][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":15,"dup":125}],133:[function(require,module,exports){
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

},{"./set_high_word.js":134}],134:[function(require,module,exports){
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

},{"./high.js":132}],135:[function(require,module,exports){
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

},{"./set_low_word.js":137}],136:[function(require,module,exports){
arguments[4][129][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":15,"dup":129}],137:[function(require,module,exports){
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

},{"./low.js":136}],138:[function(require,module,exports){
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

},{"./to_words.js":140}],139:[function(require,module,exports){
arguments[4][123][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":15,"dup":123}],140:[function(require,module,exports){
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

},{"./indices.js":139}],141:[function(require,module,exports){
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

},{"./uint32_to_int32.js":142}],142:[function(require,module,exports){
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

},{}],143:[function(require,module,exports){
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

},{}],144:[function(require,module,exports){
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

},{}],145:[function(require,module,exports){
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

},{}],146:[function(require,module,exports){
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

},{}],147:[function(require,module,exports){
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

},{}],148:[function(require,module,exports){
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

},{}],149:[function(require,module,exports){
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

},{}],150:[function(require,module,exports){
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

},{}],151:[function(require,module,exports){
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

},{}],152:[function(require,module,exports){
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

},{}],153:[function(require,module,exports){
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

},{}],154:[function(require,module,exports){
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

},{}],155:[function(require,module,exports){
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

},{}],156:[function(require,module,exports){
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

},{}],157:[function(require,module,exports){
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

},{}],158:[function(require,module,exports){
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

},{"@stdlib/assert/is-buffer":5,"@stdlib/regexp/function-name":157,"@stdlib/utils/native-class":172}],159:[function(require,module,exports){
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

},{"./constructor_name.js":158}],160:[function(require,module,exports){
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

},{}],161:[function(require,module,exports){
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

},{"./define_read_only_property.js":160}],162:[function(require,module,exports){
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

},{}],163:[function(require,module,exports){
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

},{"./detect_symbol_support.js":162}],164:[function(require,module,exports){
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

},{"@stdlib/utils/detect-symbol-support":163}],165:[function(require,module,exports){
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

},{"./has_tostringtag_support.js":164}],166:[function(require,module,exports){
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

},{"./native.js":169,"./polyfill.js":170,"@stdlib/assert/is-function":7}],167:[function(require,module,exports){
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

},{"./detect.js":166}],168:[function(require,module,exports){
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

},{"./get_prototype_of.js":167}],169:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = Object.getPrototypeOf;

},{}],170:[function(require,module,exports){
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

},{"./proto.js":171,"@stdlib/utils/native-class":172}],171:[function(require,module,exports){
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

},{}],172:[function(require,module,exports){
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

},{"./native_class.js":173,"./polyfill.js":174,"@stdlib/utils/detect-tostringtag-support":165}],173:[function(require,module,exports){
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

},{"./tostring.js":175}],174:[function(require,module,exports){
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

},{"./tostring.js":175,"./tostringtag.js":176,"@stdlib/assert/has-own-property":2}],175:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = Object.prototype.toString; // eslint-disable-line no-redeclare

},{}],176:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';

},{}],177:[function(require,module,exports){
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

},{"./fixtures/nodelist.js":178,"./fixtures/re.js":179,"./fixtures/typedarray.js":180}],178:[function(require,module,exports){
'use strict';

// MODULES //

var root = require( 'system.global' )(); // eslint-disable-line no-redeclare


// MAIN //

var nodeList = root.document && root.document.childNodes;


// EXPORTS //

module.exports = nodeList;

},{"system.global":239}],179:[function(require,module,exports){
'use strict';

var RE = /./;


// EXPORTS //

module.exports = RE;

},{}],180:[function(require,module,exports){
'use strict';

var typedarray = Int8Array;


// EXPORTS //

module.exports = typedarray;

},{}],181:[function(require,module,exports){
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

},{"./check.js":177,"./polyfill.js":182,"./typeof.js":183}],182:[function(require,module,exports){
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

},{"@stdlib/utils/constructor-name":159}],183:[function(require,module,exports){
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

},{"@stdlib/utils/constructor-name":159}],184:[function(require,module,exports){
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

},{}],185:[function(require,module,exports){

},{}],186:[function(require,module,exports){
arguments[4][185][0].apply(exports,arguments)
},{"dup":185}],187:[function(require,module,exports){
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

},{}],188:[function(require,module,exports){
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

},{"base64-js":184,"ieee754":207}],189:[function(require,module,exports){
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
},{"../../is-buffer/index.js":209}],190:[function(require,module,exports){
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

},{"./lib/is_arguments.js":191,"./lib/keys.js":192}],191:[function(require,module,exports){
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

},{}],192:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],193:[function(require,module,exports){
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

},{"foreach":203,"object-keys":212}],194:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],195:[function(require,module,exports){
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

},{"./helpers/isFinite":196,"./helpers/isNaN":197,"./helpers/mod":198,"./helpers/sign":199,"es-to-primitive/es5":200,"has":206,"is-callable":210}],196:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],197:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],198:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],199:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],200:[function(require,module,exports){
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

},{"./helpers/isPrimitive":201,"is-callable":210}],201:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],202:[function(require,module,exports){
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

},{}],203:[function(require,module,exports){

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


},{}],204:[function(require,module,exports){
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

},{}],205:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":204}],206:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":205}],207:[function(require,module,exports){
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

},{}],208:[function(require,module,exports){
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

},{}],209:[function(require,module,exports){
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

},{}],210:[function(require,module,exports){
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

},{}],211:[function(require,module,exports){
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

},{}],212:[function(require,module,exports){
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

},{"./isArguments":213}],213:[function(require,module,exports){
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

},{}],214:[function(require,module,exports){
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
},{"_process":187}],215:[function(require,module,exports){
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
},{"_process":187}],216:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":217}],217:[function(require,module,exports){
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
},{"./_stream_readable":219,"./_stream_writable":221,"core-util-is":189,"inherits":208,"process-nextick-args":215}],218:[function(require,module,exports){
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
},{"./_stream_transform":220,"core-util-is":189,"inherits":208}],219:[function(require,module,exports){
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
},{"./_stream_duplex":217,"./internal/streams/BufferList":222,"./internal/streams/destroy":223,"./internal/streams/stream":224,"_process":187,"core-util-is":189,"events":202,"inherits":208,"isarray":225,"process-nextick-args":215,"safe-buffer":232,"string_decoder/":226,"util":185}],220:[function(require,module,exports){
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
},{"./_stream_duplex":217,"core-util-is":189,"inherits":208}],221:[function(require,module,exports){
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
},{"./_stream_duplex":217,"./internal/streams/destroy":223,"./internal/streams/stream":224,"_process":187,"core-util-is":189,"inherits":208,"process-nextick-args":215,"safe-buffer":232,"util-deprecate":248}],222:[function(require,module,exports){
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
},{"safe-buffer":232}],223:[function(require,module,exports){
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
},{"process-nextick-args":215}],224:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":202}],225:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],226:[function(require,module,exports){
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
},{"safe-buffer":232}],227:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":228}],228:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":217,"./lib/_stream_passthrough.js":218,"./lib/_stream_readable.js":219,"./lib/_stream_transform.js":220,"./lib/_stream_writable.js":221}],229:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":228}],230:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":221}],231:[function(require,module,exports){
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
},{"_process":187,"through":247}],232:[function(require,module,exports){
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

},{"buffer":188}],233:[function(require,module,exports){
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

},{"events":202,"inherits":208,"readable-stream/duplex.js":216,"readable-stream/passthrough.js":227,"readable-stream/readable.js":228,"readable-stream/transform.js":229,"readable-stream/writable.js":230}],234:[function(require,module,exports){
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

},{"es-abstract/es5":195,"function-bind":205}],235:[function(require,module,exports){
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

},{"./implementation":234,"./polyfill":236,"./shim":237,"define-properties":193,"function-bind":205}],236:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":234}],237:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":236,"define-properties":193}],238:[function(require,module,exports){
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
},{}],239:[function(require,module,exports){
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

},{"./implementation":238,"./polyfill":240,"./shim":241,"define-properties":193}],240:[function(require,module,exports){
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
},{"./implementation":238}],241:[function(require,module,exports){
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
},{"./polyfill":240,"define-properties":193}],242:[function(require,module,exports){
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
},{"./lib/default_stream":243,"./lib/results":245,"./lib/test":246,"_process":187,"defined":194,"through":247}],243:[function(require,module,exports){
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
},{"_process":187,"fs":186,"through":247}],244:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":187}],245:[function(require,module,exports){
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
},{"_process":187,"events":202,"function-bind":205,"has":206,"inherits":208,"object-inspect":211,"resumer":231,"through":247}],246:[function(require,module,exports){
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
},{"./next_tick":244,"deep-equal":190,"defined":194,"events":202,"has":206,"inherits":208,"path":214,"string.prototype.trim":235}],247:[function(require,module,exports){
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
},{"_process":187,"stream":233}],248:[function(require,module,exports){
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
},{}]},{},[52,53,54]);
