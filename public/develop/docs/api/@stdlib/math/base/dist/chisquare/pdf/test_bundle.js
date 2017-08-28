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

},{"@stdlib/utils/native-class":200}],5:[function(require,module,exports){
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

},{"@stdlib/utils/type-of":209}],9:[function(require,module,exports){
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

},{"./generic.js":9,"./object.js":12,"./primitive.js":13,"@stdlib/utils/define-read-only-property":189}],11:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-integer":39,"@stdlib/math/constants/float64-ninf":179,"@stdlib/math/constants/float64-pinf":181}],12:[function(require,module,exports){
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

},{"./generic.js":17,"./object.js":19,"./primitive.js":20,"@stdlib/utils/define-read-only-property":189}],19:[function(require,module,exports){
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

},{"./try2serialize.js":22,"@stdlib/utils/detect-tostringtag-support":193,"@stdlib/utils/native-class":200}],20:[function(require,module,exports){
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

},{"./is_object_like.js":24,"@stdlib/assert/tools/array-function":34,"@stdlib/utils/define-read-only-property":189}],24:[function(require,module,exports){
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

},{"@stdlib/assert/has-own-property":2,"@stdlib/assert/is-function":7,"@stdlib/assert/is-object":25,"@stdlib/utils/get-prototype-of":196,"@stdlib/utils/native-class":200}],29:[function(require,module,exports){
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

},{"./generic.js":29,"./object.js":31,"./primitive.js":32,"@stdlib/utils/define-read-only-property":189}],31:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-ninf":179,"@stdlib/math/constants/float64-pinf":181}],39:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":92}],41:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-ninf":179}],45:[function(require,module,exports){
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

},{"./is_positive_zero.js":48}],48:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-pinf":181}],49:[function(require,module,exports){
'use strict';

// MODULES //

var gammaFactory = require( '@stdlib/math/base/dist/gamma/pdf' ).factory;


// MAIN //

/**
* Returns a function for evaluating the probability density function (PDF) for a chi-squared distribution with degrees of freedom `k`.
*
* @param {NonNegativeNumber} k - degrees of freedom
* @returns {Function} PDF
*
* @example
* var pdf = factory( 0.5 );
*
* var y = pdf( 2.0 );
* // returns ~0.051
*
* y = pdf( 1.0 );
* // returns ~0.141
*/
function factory( k ) {
	return gammaFactory( k/2.0, 0.5 );
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/dist/gamma/pdf":62}],50:[function(require,module,exports){
'use strict';

/**
* Chi-squared distribution probability density function (PDF).
*
* @module @stdlib/math/base/dist/chisquare/pdf
*
* @example
* var pdf = require( '@stdlib/math/base/dist/chisquare/pdf' );
*
* var y = pdf( 2.0, 1.0 );
* // returns ~0.104
*
* @example
* var factory = require( '@stdlib/math/base/dist/chisquare/pdf' ).factory;
*
* var pdf = factory( 6.0 );
*
* var y = pdf( 3.0 );
* // returns ~0.126
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var pdf = require( './pdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( pdf, 'factory', factory );


// EXPORTS //

module.exports = pdf;

},{"./factory.js":49,"./pdf.js":51,"@stdlib/utils/define-read-only-property":189}],51:[function(require,module,exports){
'use strict';

// MODULES //

var gammaPDF = require( '@stdlib/math/base/dist/gamma/pdf' );


// MAIN //

/**
* Evaluates the probability density function (PDF) for a chi-squared distribution with degrees of freedom `k` at a value `x`.
*
* @param {number} x - input value
* @param {NonNegativeNumber} k - degrees of freedom
* @returns {number} evaluated PDF
*
* @example
* var y = pdf( 0.3, 4.0 );
* // returns ~0.065
* @example
* var y = pdf( 0.7, 0.7 );
* // returns ~0.274
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
	return gammaPDF( x, k/2.0, 0.5 );
} // end FUNCTION pdf()


// EXPORTS //

module.exports = pdf;

},{"@stdlib/math/base/dist/gamma/pdf":62}],52:[function(require,module,exports){
module.exports={"expected":[0.044646485344170435,4.6937595107298985e-5,0.08019505960524383,0.035692487936902884,0.008481312231022222,0.6258770090363098,0.0005964289771625934,0.018813645642921276,0.000816789877784338,0.02104097778374215,0.053465936872017304,0.04246309090068616,0.014976304856299178,0.08907819038550745,0.0001780492436725874,0.006651472486563027,0.06551588747966963,5.84401753298689e-5,0.030895184508706455,0.033017290130654284,0.013148263291985672,0.003871990138001027,1.2298996723270142e-5,0.06212163328069034,0.012950941408084664,0.00010511538081027487,0.05333930581280754,0.02988989029462184,0.09003537425602445,9.80261290560187e-5,0.009026151353861811,0.045981525266857094,0.008004619489678287,0.015809488030965584,0.060188361241263526,0.004681078425657457,8.923615885529687e-5,0.008155848915262134,2.0756177093172166e-6,0.026509444108451335,0.08040358479686996,0.07477000561269971,0.0005287194208735393,0.07477385127611899,0.019396133088799422,3.838652266964662e-5,0.0601169319469256,0.0503546641906662,0.08347260460162007,3.0516014753380186e-5,0.08994530429981935,0.00361162671575136,0.010162812470999785,0.02233960440518254,0.0518281446943643,0.0047237829935257375,0.018091618566622752,0.06633583824721825,0.08181123466082045,0.0009014276819613539,0.050155211212719875,0.1294425046094879,0.00955530276487519,0.001669682489229116,9.366326201357592e-5,0.05411343877843611,0.06799787626128792,0.06917386842887198,0.028388948103545107,0.035713972026407005,1.959780138863909e-6,0.03340554303212845,0.009540214159938571,0.0003725273173815013,1.1841214180205005e-22,0.07270127350780999,0.031858005860057825,0.07394313313632307,0.0008580211536502327,0.054004611413599794,1.9914919307101732e-7,0.06367007618815657,0.06720743654878675,0.004701941202544125,0.09493800921578766,0.09071209522010133,0.02151659303693447,0.026429283609453947,0.04223218338316776,0.055471600883873644,0.0020689144461243686,0.07079155827054015,1.5051846819017504e-9,0.044383637066354044,6.282588834546882e-6,9.331812185326664e-5,0.004126215467060221,0.0668494223206384,0.015174268499403542,0.04167222687745997,0.0004768323642927726,0.00525659577182749,1.1816320086254736e-8,0.027790708268561563,0.06219457887490485,0.047732924970752065,0.07090505509396773,0.1850110110573578,0.028117467181011466,0.011871248766939171,0.061057030918835374,0.0026405454439616814,0.0815276474124646,0.016945535986389256,0.013184102174768671,0.07882202316286792,0.017984276220151,0.02680613236322234,0.03730699324625446,0.023847740534563632,0.06778794158117032,1.2730061066902057e-6,0.05802969916298814,9.053010782312402e-6,0.002495576000428631,0.052530594267728145,0.0016317848572105045,0.03773047012332671,0.029494197692194874,0.08769542094685068,0.06171144084283742,0.013581158412767054,0.0003548402237822421,0.06291636724581726,2.4463123875782695e-5,0.06913134964948726,1.488175340056472e-7,0.01688832878266298,0.024354601486202807,1.1698638522925001e-8,2.255892791658981e-5,0.00841454941789023,0.0131379336709591,0.05191341470145174,0.09037899390890537,0.009896268123708547,0.10938884772594544,0.006354567084517602,0.00028520146647736434,0.10823439754739497,0.0006846779253412153,0.008889384114278193,0.04685534539852125,0.03425729164433564,0.023619122584287562,0.09114666282863486,0.010010953221434938,0.06971843849650661,0.03509879454806065,0.047191329898262906,0.007313776520415183,1.9106798529258856e-5,2.12581904703291e-9,0.005258193698251585,0.10245149859924353,0.06617619631561303,5.9367810594489774e-5,3.772456423900429e-5,2.0811171084188003e-5,0.04410917619504113,0.0633572165025206,0.07478523725413301,0.0012845577826802433,0.009811898513420606,0.059383892079674275,0.06255321858050478,0.0635675774210551,0.024566964324986958,0.08352299082520619,0.1176135092389849,0.07035043541166339,0.022647620806328445,0.027353091304509865,0.5310405110502686,0.06605985942615264,0.0008119337545890118,0.0028605234784465227,0.010071344618448488,0.018588756026596563,0.00031070871791435116,0.05140237612883545,0.061192666628312624,0.019642102390420507,7.556313453766647e-7,0.10103742199235638,1.6597242932376022e-5,0.06191804704993669,0.011391197628863146,0.06195282561622451,0.1247076104966067,0.0633584821431749,0.06849719058531571,0.0722062650837817,0.06849968933756906,0.0665793864482802,0.06261473076610766,0.006908785474646946,0.058341758730681016,0.06476186046216102,0.0353249437390332,0.020812745248278638,0.03504516854625678,0.012301344277703765,0.07571936425421205,4.61750081682445e-5,1.5021917711103615e-5,0.04434397683266699,0.06838245599966575,0.04881430163242781,0.06873409757045855,0.06886647190155992,0.03692836628156105,0.015288983297037097,0.004047325780915838,0.06901313116650827,0.0033261601560373184,0.0754669727790987,0.0022114707815102707,0.0007442676359379355,0.08630636913992193,0.17326945410148623,0.04485771563789206,0.030154664931485015,0.06674614574146574,1.7828293121496073e-7,0.000219295358793914,0.17993018381880269,0.006791135850881118,0.00038810984330837266,0.028414893112315754,0.05577265985385972,0.08941583254498876,0.03411540795458412,3.220880549427062e-5,0.07951515059256711,4.34733223784087e-7,0.009614241752985695,0.06892074401090181,0.06532757684168089,0.04201772582926459,0.0016715004008753948,0.05514639926923172,0.00017291998933683894,0.005035239317928288,0.0008863766605432743,0.13890200920912665,0.0695530995855508,0.039635647408178404,0.01391975036753718,0.028396201227901634,0.011951360834649078,0.01823315826162978,0.00931695297942683,0.12139201441619211,0.031326733643775355,0.06222369869876245,0.06303946612113889,0.047189441810685594,0.0014169354108733688,0.007337897816638536,0.02523403474354481,0.0689213158453588,0.00456397233696777,0.006114369842475166,0.059635996060443855,0.004647999889814775,0.0338868455642906,0.0017387456087739192,0.02624455394961853,0.06420684021837157,0.02896964787893496,0.1077361811233989,0.06912166957477214,0.08267581489930141,0.11120969603034879,0.09554866278025742,0.15888656022406267,0.0008652768265249094,0.0010471346179190505,0.007391502538971707,0.09781449455891997,0.0001344695654710497,0.005459747044113909,0.021301151083085643,0.02241815421086878,0.09535897723364892,0.02294429849555871,0.06608448797879991,7.03431142081944e-5,0.0643824287675818,0.008687179740023044,0.002137558538420616,0.04680641696592397,0.04133803306936474,0.022327520674867814,0.09429167959462502,0.013739996703276762,0.5222903629648931,0.002354367436352923,0.03390458929797146,0.01320466101750776,0.04061231600100205,0.07169040978574785,0.00078846502493509,0.008433115504287254,0.06803060495263152,3.0820812956268917e-6,0.00013967811557676188,0.10243954149252625,0.04777842635354807,0.04204422586450771,0.04036428204724328,3.258244114179159e-5,0.0696443029605619,0.032783853683543814,0.03549686338637994,0.06604132196571413,0.06975166750696984,0.0006406919516955834,0.07360127638863462,0.07763525906352607,0.047046964314766695,0.06964885974555104,0.020659508023277668,0.04311052023073885,3.530431021406208e-5,0.07870573101204267,4.0933865173993065e-5,0.05117522782019863,0.006853663740609015,0.0527680211929224,0.030571386411244756,0.00010723879260624013,0.011504270894012344,0.08531272634834364,0.05258775183993426,1.006229367880662e-8,0.06944131962948558,0.04537676283310066,4.13697399583386e-7,0.0631208762922301,0.06822298743209526,0.00026910419215082963,0.12325911503562059,0.05669512158132194,0.015422582723143941,0.010750132696329384,0.06887841185085998,0.01798472864537278,0.018022656443772454,0.041441462101381714,0.0023120764779994475,0.05125970346233931,0.021804504496692793,0.06390373292507233,0.058363254113526754,0.07006968414901288,0.020815043604025703,0.061967348663663366,0.00014564516376832122,0.011888851690865126,0.0008497806708628976,0.0002929486376443829,0.06551991525830878,1.1696224847606134e-11,0.003631080646340013,0.032120252972669086,0.062056557918655914,0.1107542981720726,0.05356784832966128,0.07256378012545049,0.0011884001660172506,0.048270944670868836,0.0027850972262284807,0.059615071620744746,0.06469321121545091,0.1086228292368463,0.1397118387757936,0.11724042501040853,0.06956104850188156,0.051049820153404424,0.0032716452762414742,0.0602592621679977,0.0542204139686164,0.06661393603965628,0.11811745659726891,0.04507800935297699,0.06749590606421021,0.05525885999919116,0.030055688505735333,0.003427786368959171,0.04991920232290801,0.004070404919400488,0.009407836114631944,0.000998475146564259,0.07184607453733778,0.004497275731056983,0.04651656932851103,0.0046384765356906965,0.04325810856395307,0.006351500181771095,0.05775343512822361,0.03004009505248153,0.0018376303189187072,0.032474404693521634,0.060188692500971405,0.0015358242028167008,0.1269978511859152,0.05544764695425049,0.007223013661084928,0.030978991901412792,0.067612759927163,0.017449395538111295,0.0020279778006412315,0.07290445997580317,0.031576877656911244,0.11741979925813452,0.037195944722385826,0.08833587418910843,0.0007946621364769756,0.0518604524152265,0.018221885076595855,0.019235892909356296,0.020406763972839973,0.003346654524538157,0.02772962937381427,0.0002981476668408116,0.07960578536911657,0.013611972283386778,0.08245756408643343,0.03744977126706246,5.542796125768361e-7,0.0973432017706255,0.00692277096358489,0.08479254279318586,0.04691441717396758,0.040107676471173116,0.07060963153073724,0.03249906510447516,0.019837985306839247,0.0024629733568313425,0.06007930762089361,0.025060310742809812,0.043690764130965426,4.826175651381033e-5,0.07899886051401389,0.05002751762875462,5.442246959242205e-5,0.07378900582515786,0.022228656283318337,0.061486972154017674,0.0662760234314675,0.08491978101693215,0.08631403238329695,0.0008735363096453023,0.0007017684554611239,0.014314743921140714,0.06142942422086045,0.03196733314407524,0.014877545752853754,6.839518573533825e-5,0.05139079795900713,0.2779282419932382,0.023548730881394656,0.07635646330257702,0.06426902234595086,0.0671600100213053,0.042369094944725655,0.021098205909629617,3.842642770211936e-6,0.010419696174722227,1.9204119566316938e-5,0.02383076802809341,0.006620219520888171,6.555432790489803e-5,0.11066755144292953,0.001885186106836367,0.0005336590245883511,0.0005351909399595431,8.949444780119269e-5,0.007423062127642346,0.04641574882006107,2.5084715525325736e-5,0.07884513518713926,0.0473541992371951,0.08864648666197955,4.05033759326886e-6,0.04958754885252901,8.111460487843249e-8,0.02440112043134125,0.1095159448395001,0.013499086545328306,0.08501767976280232,8.280038539373918e-7,1.4502668667797218e-5,0.06273525341039113,0.060271517747545626,0.0491199477435637,0.003047924857293101,0.11327119281572476,7.132223083790745e-6,0.003538870169520253,0.18734781745139598,0.03040918320402705,0.029330622194937695,0.10994306207583243,0.06407575357007059,0.009686395971027726,0.06605882984360208,0.05862358718482859,0.0020257017870459883,0.0008088242651622929,0.05342235029780719,0.00029454288148864115,0.034910366300305896,0.041989804780972736,0.006079933184269452,0.012249665408139333,0.00042567234491736077,0.11260142216631454,0.0034864775878110455,0.030689195872821682,0.03187612114270881,0.0018535574686654808,0.004441631913016016,0.10604648623257829,0.00011713606920996202,0.06631934247868815,4.330236929770531e-5,0.0874168022362366,0.0015180060081296308,0.0741558325948677,3.517585100968074e-6,0.04363176215326251,0.09129641916811876,0.07698524693644823,0.03375694005181122,0.00017625758584487438,0.0022529089547123665,0.002050559049821957,0.049625399796257144,0.04218827078595233,9.297205167286822e-6,0.014343045121401431,0.031860677404063446,0.06204319685647741,0.09649627440370688,0.008466775173851084,0.059656133551703766,0.09857484747558184,0.14651783327467688,0.046940907324238,4.178778631301655e-5,0.17469354421249908,2.5947130575552253e-10,0.06486690162799899,0.25303111050476174,0.07000027938198734,0.035735451238499784,0.0220468611124135,0.07247374467170037,0.09451189689307567,0.0014927610675714183,0.013828738820665962,0.055984087910936585,0.00015746773459616566,0.004617912560793507,0.0676489625398135,0.04653292621807101,0.006201535673870038,0.03475168886699643,0.07679491257413744,5.742770470595705e-12,4.119973238442182e-6,0.06404304628531872,0.11508015750176069,0.11440346155732509,0.08359154307559068,0.0012667388223835795,0.047598834092756025,0.008464842279145417,0.00312314193039616,0.0012579194796582993,0.11515275594946114,0.023166058851426717,0.01061648950418703,0.05933148249669801,0.02651980346960083,0.03557110360650859,0.04789879512958273,0.11297004444900896,0.0015267864889616206,0.0005056736172937761,0.02914994528367672,0.06971865179313644,0.00041521333391810394,0.00879016857203329,0.18023804865531085,0.06191301045872828,0.002005699542191228,0.05175254888658366,0.10063255629405896,0.06450196842773953,5.745252582060019e-8,0.015061120078836374,0.10570591769996808,0.0771299918008573,0.00025248749629961937,0.020294176239571426,0.08662392145269232,0.03824272062090041,0.11967210596560636,0.06912484835057003,0.09895028367280359,0.03915530623544207,0.10179671058016548,0.13521246600488357,0.05760671567780587,3.029603091130152e-7,0.0007305775028753918,0.0021730478819314844,0.007315867379343393,0.0653950973359484,0.021854520724852715,0.001650184158217288,3.382037763270564e-5,0.07211056226116239,0.007097569198059224,0.0003935832272061925,0.14835737992241985,0.06242501397964881,0.00026780600301827003,0.00032135946955820917,1.893136281477039e-5,0.08520982467171204,0.0001742407665044837,0.05983896494369685,0.06212017970748125,0.013506018678829595,0.03531611137146023,0.0018907898587400245,2.36825153946488e-5,0.07699795471789082,0.03973397569157541,0.0813344130447353,0.05098732210749388,0.011786311569663484,0.006054336291086296,0.07409755737206282,0.045317272757050824,0.0025311806552552408,0.01626885346418383,0.03546585058217158,0.07098721791527036,0.006283437784045313,0.06261517404195154,0.00921533035555126,0.0015738212849174457,0.06527118910704696,0.01995908762282118,0.024405369050385855,0.000251671389498275,0.009745640804874353,0.022681945314919606,0.0013484088719925358,0.0335580317964558,3.9508566969205094e-5,0.06208550786196357,0.06393158138805448,0.11871862756451183,4.3617771742435906e-5,0.02435786000465949,0.00012897552899603478,0.16148729448940313,0.006385578173117887,0.07477534996253926,0.0037210445483705683,0.08347916649669747,0.02535360165212818,0.07173344145498389,0.06364350059326908,0.011409059642357028,0.021137689261028332,0.06933856299940072,0.056832240963594,0.07794045666478394,0.03567740354345225,0.08327690903977765,0.09702758828857672,0.034482873245288655,0.07402871296555748,0.06851380782691538,0.0995535759018709,0.07928280179474266,2.1623919613128435e-8,0.08066222345272178,0.04912739111768374,0.07540756246602878,0.00013736596495551813,0.2561591333902722,6.637169992236998e-6,0.047092943618955704,0.06736810475758073,0.09709017574334901,0.06377775424946079,0.04489392440827917,0.03750383756873277,0.12846788011433094,0.014517343129445682,0.043492859453988154,0.015501266618242512,0.07381718011179653,0.02407281916993523,0.06591218582066524,0.13765080690324433,0.0004420337410647216,0.018879319790769237,0.0002702088948854166,0.05588826142830321,0.04285955678461016,0.006229666964848688,9.35013568402015e-8,0.036453905147537415,0.0013678462383444534,0.06524147600874061,0.023521872444354216,0.06798349139863917,0.0690112980928938,0.002248472230337371,0.02535328078505917,0.013408227166195361,0.041083688933352396,0.0034078015652039915,0.06462339389679826,0.027308996682527033,0.012944873563470667,0.08763660362821961,0.0806702781970849,0.1260487406235912,0.0018344092283355418,0.031883082599565314,0.002156358436037908,0.10251659080600115,0.012020419779706654,1.0722337885982513e-11,6.7994032243272346e-6,0.07015804850160923,0.003268782884321766,0.05698955865905268,0.007249657703950786,0.00028335954352779114,0.06563238569229583,0.06432826888516606,0.02349097596879498,0.07238844018754477,0.07743837967239292,4.40530004428739e-6,0.09082608330773435,0.0006606653769872124,0.010361815264334407,0.05191789586998603,0.04134639094975413,0.007441494169923367,0.06041458961037462,0.032705275246400024,0.21650747424048156,0.10301325191848454,3.1421453132163136e-5,0.06663525265541947,0.00926970658690084,0.04698554532225489,7.804722451844473e-6,0.009784953213141934,0.013714082786564991,0.002902879870371197,0.02925845394616233,0.004547874064323186,0.1019001630376041,0.017213058254966287,0.06514203590546193,0.00011696729263781556,0.07086522346027194,0.0001600815284970453,0.1802471529118908,1.129337881239256e-5,0.09069576427871599,0.00033396275390608105,8.873516917953145e-6,0.058627398447198636,0.0011733014367062789,0.0051112863420992695,0.22105987959228435,0.04615065928548641,0.017119950773553726,0.057115428912950725,0.06266254674707324,0.12300811162408937,0.06651808688567111,0.0002727413885447022,0.05219124818721251,0.03677192977819746,0.041804775451163394,0.022559674850771722,0.052028847897736485,0.064061678688595,0.06271268748486392,0.21431823492349936,0.013836108314333033,3.7493374702141725e-8,0.09317248413623277,0.03341065822516143,5.250339045743923e-6,0.0008548304426123825,0.05214452146197294,0.09072109817057901,0.0005085411445748678,0.05430635592274148,0.07483614485461562,0.11102839081505446,0.07432141671262947,0.02699491787330137,0.0006487249940122174,0.046568334714704444,0.0002210290583130897,0.0011858778899297292,0.05266435600699388,0.002292902764621508,0.09440400032563138,0.0708883623963107,0.05238104625487816,0.11083413215279016,0.06060147800055925,0.13254826168559322,0.07004324889449245,0.07295737914494503,0.1051796535304659,0.06664635739252155,0.017911950180922995,0.043055273249565866,0.0011315887969471142,0.0028403753610155343,1.7272552040621301e-9,0.0008497567551814492,0.0012663095185189831,0.08831218431990362,0.034341085396294824,0.08592331535384266,0.016590339498989488,0.011119149587480573,0.026105898412420066,0.14116864685237207,0.044674808602913146,0.04798190850146295,1.6425780308312725e-5,0.020971106737286287,0.003898656615170343,0.03421107908439919,0.0433193950365417,0.00040053240907300767,0.0018830220995895719,0.0069480385444055355,0.0176138241673875,0.02738862051114005,0.001988217989127879,0.06339424132942294,0.007223676145127629,0.10792971460569066,5.893941309121205e-6,0.022170437540023374,8.292052311756651e-6,0.06411712460637992,0.0014526790996408987,1.2756799752615744e-10,0.004030218334393377,0.05017113016209818,0.029742392970660052,0.0001655180609595001,0.0001800068897987833,0.07455338677916461,0.06873111089113756,0.005009002141812761,0.007010622908699503,0.07379989770856012,0.13566381217717774,0.004317391158942654,0.06518641680027015,0.40274744283239594,3.838821109047606e-5,0.029509065604979026,0.00015542638166252812,0.08323587151689285,0.03726424585347923,0.020933450587639624,0.007190501062936789,0.07592546572411524,0.040774924107508034,0.12270441329224914,0.13524648353504576,0.0002186467463414469,0.06543811479079081,0.015249261990827786,0.00780216857910774,5.3371642308270205e-8,0.00579187184820361,0.002572933599308046,0.07178568586119588,0.128153346489067,0.016543945002324194,0.008868002387220027,0.0025504751709344077,0.06768648758700009,0.006653818719064772,0.00014057627029202455,0.06881766817286128,0.03967423291473611,7.368168171062216e-9,0.000736424957969075,0.07264265963020938,0.0002016492414002433,0.05734268813976788,0.07921639112098179,0.16891109510672936,0.04927062819161654,0.5737380146629335,0.09516410443557179,0.07101239342424517,0.021275815210104947,0.017049083483831603,0.31952139734446794,0.012471590591465125,0.04503375245275975,0.13209473980539507,1.4915735154107956e-7,0.028494285873192422,0.0015834774150633114,0.04129987914593857,0.08691454279688754,0.033523057883687674,0.07695928598077965,0.11470847210408446,5.42001028892588e-7,0.11224180692673992,0.03843238623311583,0.08910441282036315,0.08265782393033015,0.005217029865591652,0.019274908312526304,0.024862257770990822,0.05082487749576709,0.007312985050613035,0.003245757245593885,0.22067997280929474,0.11628246805285017,0.018577660492188605,0.1586560800601041,0.0663093422232772,0.08148314679588199,0.006949993019933983,0.03085653755776172,0.06859524839767331,0.0978441342651652,0.04917868520942266,1.2058080357980817e-5,0.011829162468140739,0.03857025363101118,0.0006177305222702695,0.0043751753734923285,0.04436306677607238,0.06098421938437606,0.0011109756669406485,0.04939294739695025,0.02303406510511862,0.03233928055934826,9.248932598073341e-7,0.08211000415204263,0.11023693683846215,0.023312277508367042,1.0766665843111813,0.00019059944125918475,0.06996481078612957,0.0015288118134467953,0.05132206195133735,0.10055445799059956,0.061929123610031556,0.0005394224425844721,0.159650749314948,0.028065536248375385,0.05272951983082218,0.0002913771537743143,0.37873921069168803,0.06405166871082531,0.06943970825061939,0.12251854527006638,0.037131422829817885,2.2969346465238653e-7,0.00011700276718548993,0.2157481393843266,0.06695536494407762,0.005966359285200001,2.7518507417776833e-5,0.10000281604797938,2.3872099661602892e-5,0.4401129554308458,0.046552893412577324,0.00014891636867641887,0.05069945618531012,0.0007356076496831303,0.026965021020734888,0.02748940509331592,0.06866150197269359,0.04581271173386935,4.617648564979472e-6,0.03911312465351663,0.004897020194320226,0.022614120194573897,0.013194163834366763,0.03644365459575307,0.012254188973557751,0.06690317667661445,0.05455363398296268,0.09292354337143259,0.06842552121732262,4.9529932846997144e-5,0.0002928248664326073,0.07065254928670811,0.06174844527650057,3.2948552643149986e-7,0.01574450459626539,0.01768293480282313,0.038522565734330196,0.023397681908629377,0.07486960172291686,0.05084549599428928,0.08170240267611911,0.06589594959380846,6.903515072554765e-8,0.01668745191932292,0.07596139425926235,0.0860937571526565,0.04848316332175797,0.05012203577997453,0.043640641541736816,0.07915150380372835,7.837368173056063e-7,0.08779261325333293,0.034325224198752675,0.08391929587344062,0.06786398761489063,0.0016525929326500458,1.0493439815231892e-13,0.7331318993843848,0.05600720682685714,0.01502578291448186,0.01428809398775146,0.0815917635707213,0.0012723369304404185,0.002661763046659417,0.06231125327039662,0.028737952290815317,0.04212435960804105,0.062291581618309645,0.023701040252803774,2.997654001666587e-5,2.3678098338148906e-5,0.13004100851346098,0.008189585707155365,0.0004621812949234724,0.05932227854600863,0.0044911607621375225,0.04984116885911613,0.035194784066775404,0.0001246868466002356,0.030033991677948693,0.07190044756784593,0.1621118650699977,0.008273284541087588,8.848390179283848e-5,0.07546788205605574,0.10201939075747475,0.039002870485803684,0.024568094990334,0.07187015827216027,0.02252900191292028,0.032914893098588235,0.02998560321711762,0.04856177784333134,0.004518697068400077,0.03742042595481927,0.006622662653621408,0.10630139122860273,0.07857650687696129,0.1223194932133318,0.0018836628524989002,0.07525390142125489,0.06583840321026976,0.027583611278822362,0.03405360817327881,0.023267782479688588,0.08985167993475848,5.96255615759741e-5,0.06138358273441393,0.06416631382361541,0.00011218874359377433,0.018363522167719745,4.8464851709339966e-8,0.0764966611242142,0.03293060846205543,0.08956587617062785,0.05452148241152182,0.06616068035808577,0.012837138095571285,3.3692755882794435e-5,0.09627974637641563,0.0005288883304676451,0.09546337855393969,0.06968369309965415,0.07448350698641973,0.015939177768132768,0.025300073609788483,0.008144499584493535,0.07296641559905656,0.08107260920665353,0.03136448769659747,0.00715029932123298,0.03215442456564066,0.021116987899710404,0.01274298593095056,0.05703786416311281,0.06956393968074258,1.963946077954384e-6,0.041017765691478025,0.10652350555551506,0.10625472105769193,0.1061271172477356,0.03450517845176586,0.0028882166666176763,0.019450225023161766,0.051180947747946896,0.021509187981738,0.3839242072581309,0.09199096614120462,0.0037198007198622433,0.02073945883061286,0.0003201773516998671,0.02817028326399792,9.829798231811366e-6,1.7123896752986056e-6,0.05886761622460375,0.06651309015645329,0.03795110798939913,0.12237881941397613,2.290714951892949e-5,0.00040303193551931917,0.06496997765142773,0.02009817408097951,0.23426866731545798,4.7829557320404425e-5,0.09859830626982533,0.07748170939249018,0.023785535969643005,0.03510481547865227,2.5434471680399512e-9,0.029182716379313026,0.022125933318793832,0.0387827458325205,0.0022558278574932155,0.0003384374577853079,0.00622879634403572,1.169298485808085e-5,0.012573992281164832,0.006383574826865368,0.00551678665159722,0.00018357121243574198,0.04214825014116895,0.14815790705541257,0.005584122129304254,0.03831167375359576,0.06678251276631986,0.07227591420912277,0.005723163356730829,0.07023896062995139,0.060940889310782904,0.00020506281048495657,0.00011774255461469522,0.07278340364970655,0.000700179137363818,0.12948136224266926,0.07605126709540448,0.03126344319018088,0.08033789852669161,0.07718984401545335,0.02296912650163104,0.08658502524505884,0.06655588517573653,0.02506477939440228,0.07072041857411197,0.11103764460284428,0.0677179168282056,0.054835511265308515,4.416396773796176e-5,0.01796145156008489,0.06811667319869186,0.006145831695536652,0.007878000924522854,0.0050757301842066435,0.06266392338859093,1.4479184021784544e-6,7.152991421455758e-7,0.0663730270805803,0.013233511648504911,0.0003014543736408639,0.014731665249587723,0.03453534586559293,0.07353997986988912,2.7311353428913523e-6,0.00029425018131370805,0.014542829944869096,0.004488846195073106,0.08921189329974953,0.046763772228742305,0.06056604069624942,0.07183221487179978,0.02019519975283602,0.042980281956328456,0.01066248059558056,0.09072938251942766,0.00016116234943142475,0.03369382782845059,3.104138418938339e-5,0.000835332079735102,0.002785598084225813,0.06092849521358789,0.0072796553488212274,0.057192984443334524,0.05654095829115558,0.0114643760202948,0.040772793332714614,0.004307542750853622,0.07111043042661042,0.019116575316523006,0.03531290694958736,0.05412504686045335,0.049327309026568,0.00043336881217727796,0.09224980156572035,8.995298273805541e-5,0.02168290154299655,0.06630843821480542,4.549059300005594e-5,0.07125158078511831,0.07453262598525894,0.04928400308375688,0.07103894879162788,0.0022154297828670248,0.027896790950661235,0.06934306542049475,0.05294588795098432,3.595555841692137e-8,0.06368838118965088,7.579268648696488e-6,0.0008768236898276909,0.0023209238103827894,0.011201293980290704,0.06716482553875235,0.002638210091066516,0.05751094516778401,0.024456937708131652,0.006844459283164456,0.11006149858273608,0.004390961158185805,1.2045054292954697e-5,0.004677182486838968,0.020501211910580245,0.009260463519492581,0.007787798448774194,0.00020761934815835697,0.022803880417095034,0.022885429585147016,0.0579754964904877,0.000917531532036459,0.038195051501945625,0.09723380642445888,0.0007766778998864822,0.07557340981774957,0.00021503787779901995,0.013397693743060836,0.00302413943818743,0.11253931415970972,0.006918194175082142,0.004672128920746537,4.3651903428076726e-5,0.1364200017944114,8.926240937259999e-5,0.004868675131211759,0.006805498817960455,0.12441315037516448,0.05923456233218769,0.010593382594581844,0.013747932144293823,0.017782636255498703,2.2157821957198704e-6,0.11462853429639244,0.09321998463790958,0.057706982892429544,5.141107097564341e-5,0.07859755819640245,0.08008485204757079,0.01035206521480855,0.06463401559086866,0.005837957035564107,0.11185396035535178,2.148050432838361e-6,0.05231017048408569,0.043312745447535925,0.017332886781779137,0.051433196352827774,0.0009880384382704036,0.0023372952104083917,0.03353636379690799,0.05204262989859707,0.049018587024062116,0.03849457283271684,0.0014957711516681222,0.024390999110344546,0.15091841194968397,6.483689430893678e-8,0.0892993108414639,0.02626186686371128,0.06382027826583707,0.0034781375405136075,0.07008932136111676,0.040669372635395905,0.0021789483693010247,0.046629420156698895,1.2562564146399698e-5,0.09061928478707898,0.006741276420487549,0.051712633173329955,0.05833988440181977,0.06706209776079239,0.03163098812110546,0.000857438639618884,0.005951920243457627,0.061706166951133026,0.0176778947484116,0.021655598073202553,0.13164948821311898,0.017756601851736775,0.0023047953299989436,0.004707970769319767,0.003522590061156084,0.04673167717443019,0.03462937181826186,0.06435847723864085,0.11484744360847357,0.08347244608146066,0.08207972744437927,0.06481702896305208,0.0677857203797297,0.030262440553539997,0.008736420586245536,0.014332974513112802,0.06011386317634812,0.0002733004726496422,0.037624098623158825,0.18588452186949092,0.002607872289641129,0.003077945954312898,0.03683752663827838,0.0859079361998722,0.08204764545989054,0.00013208929101074485,0.0814355853248788,9.606932197391783e-9,0.06078061945093738,0.05771048766374435,0.003789626583309926,0.07443176253621181,0.06475323279381441,0.2604847255933218,0.013392810682393178,0.007108398796188123,0.06150998104851149,0.010837928961308524,0.038113945732527445,0.05637263402678676,3.4082175357296634e-7,0.07438022518246583,0.06899553774077855,0.06685376494312438,0.03630838469101227,0.06175121697249396,0.0008178129986052101,0.009322682350049386,0.07052359157899052,0.009061990040484484,0.0032588504954712493,0.07027762705866131,0.0009959891807695296,0.058266905231186675,0.06538827838422225,0.021079292161032805,0.1049103491905586,0.0076944293851763275,0.07834010825117683,0.06134512141622903,0.0001876879808989827,0.028616325904644135,0.06346644726183324,0.05226198567338939,0.09314197264715939,0.02474595360687256,0.004658734645806628,0.06139004384449659,0.05485611373746129,0.08499876055087577,0.03281985978116748,0.003361885719291522,0.0848988234139874,0.15726346924898704,0.0023328986279719743,0.04961267621475808,0.010117897655237712,0.002735233470424724,0.07138382911065166,2.8319941753307564e-5,0.02336494109981043,0.12144626497934491,0.037600513638428125,3.487668551228719e-6,0.07630467857354135,0.0024635488214494916,0.028636932607543228,0.06740910530744852,0.004335570443995223,0.005383849247444515,0.00020149125858265354,0.0642929810539665,0.0008581782996459896,0.00018817014996711727,0.07413164954099323,0.07594461403218913,0.07501929381937285,0.048489367018733937,0.13449086105634345,0.03629959210599188,0.06294111777833843,0.011441496387484483,0.09070959685548893,0.04808726562359674,0.007834171445523072,0.068834793347372,0.011653049226386419,9.458310038181056e-8,0.0037858594763018295,0.014280058438864105,0.05492690112410198,7.096934966840888e-9,0.027557591604097115,0.07911649291450618,0.06271633195232737,0.0015304289581563042,1.90318223671805e-6,0.05023740594385622,0.07810110584249325,0.002738185975611932,0.008698315412118943,0.037729659431626074,0.06484261377768213,0.00046164405050603874,0.07176166404769395,0.08437336463530781,0.04132614901630109,0.059327317330889785,0.25866655868154725,0.0735338340503656,0.06410274855213093,0.07019997631994732,0.0017509926210959978,0.07527081261702895,2.058175399185739e-5,0.004816907755912877,0.14487309204491905,3.14950422379773e-8,0.04707919690534608,0.004450859634370356,0.06905494221615918,0.05887820413845248,0.012307269634157538,0.065020185096707,0.0009704527259095088,0.1173147441294019,0.07355010620782348,0.05405841593736675,0.04025406312283228,8.025524909419753e-6,0.06652084150716286,0.018247034654407312,0.030313097654527717,1.4597180207981464e-5,0.03677947152763132,0.05963493373853841,0.0019217839224387825,0.07237069959093322,0.07487575345923343,0.11193040378473093,0.054792580060624686,0.09653236951762105,0.06606528491353279,0.04405687436761935,0.10026959081036507,0.03183401205112919,0.061899872551981136,0.01713054359442228,0.050026444401448406,0.002107420359728643,0.002697037189904352,0.08231725733609033,0.04172347042648137,0.0008329367962622517,0.1937563248580958,6.776123430679488e-8,0.00038849124201156165,2.7132527907096862e-5,0.07479344661645267,0.03184164160977087,0.016169486875319654,0.07437872999047741,0.008063813583730175,0.0005994812155033769,0.0004441813979671754,0.03755365097031692,0.00029304017042783477,0.00035435359603135205,0.06417304826817824,0.01630373632622031,0.0027542285889469186,0.05714816970796328,0.007883025248043305,0.007875354924702753,0.02703658463310169,0.0005500001728047114,0.14896164257609712,4.28340343860021e-7,0.01347454663485039,0.006548256445793285,0.0019586562532664257,0.03168115925187154,0.06869435856755916,0.002332519310370066,0.06654372953141284,0.09846103721277988,1.2141810036576892e-5,0.07000323400912,0.025126806005002007,0.0853734567282261,0.002710068401370544,0.0005297723661823667,0.04815789784635416,0.08400315179778634,0.03597887380918389,0.049857569916287536,0.020519729171143086,0.03157057828042693,0.07474595049954626,0.11301786326653426,0.07210540907326853,0.05376694613425502,0.057436978002102096,0.03924891584102792,0.07827773400032029,0.06782301132059068,4.921231786886107e-6,0.006298583737304174,0.07240076108969935,0.14338799216824474,0.006255184554067218,0.020268169343212083,0.020098472691465592,0.0687087335596051,0.0010575648290852028,0.06492267448900545,0.006101836220276103,0.09273283128815796,0.0041344869390293835,0.05734371600205219,0.00013851153283949184,0.059910128167594986,0.0028563101918539263,0.002984051527676165,0.06488714427383122,0.03562082603754452,0.004285099722654476,0.0006271977569912649,3.839785011887408e-5,0.00026223096529331464,0.07221149166951386,0.06634649212673382,0.06068367331153164,0.04075951370290536,0.0021955886028352015,0.07191965907422976,0.055527132333223664,0.002063191077780201,0.02884007606874393,0.0019095210867722623,0.009123111925541721,0.14127703192767432,0.04440098973238122,0.038630366409613336,0.030993103316126723,0.007916364334196752,0.0017538693152526332,2.01945879835364e-6,0.004055320525304085,0.04912904037307692,0.0688143187174119,0.027993940854968986,0.08867209586209368,0.017982912834202756,0.010578456232387172,0.03487739913148523,0.057447307458519864,0.0007064604704330389,0.09465877618048132,0.09100721450701166,0.007880186240072602,0.1478405404972011,0.0703214701924417,7.857230975804353e-9,0.11055105911284589,0.06832999555735338,0.02024797603561755,0.017136892684729555,0.222119325944018,0.0696698186611695,0.14596248920842253,0.07963095851880819,0.038181018832469445,0.05064800847450254,8.722467982768196e-7,0.13652346588454517,0.05824045857662098,0.06574875834543088,0.06789691159498192,0.10400161312246237,0.09733479515192857,0.0010519561002161689,0.1036722062008392,0.0020955369144795124,0.014052194965222402,0.030149349701955815,0.11238634831507209,0.020067181145006992,0.09175767257918434,0.039197528549812205,1.3553499429085108e-5,0.10199305877817784,0.001369654514198767,0.0002682070370043512,0.0008701063149632107,0.0815137469041459,0.10357545133529089,1.5820838294662633e-5,0.0014232079207382978,0.023564095291717834,0.0015197092961362316,0.03862553652347402,4.906450217172554e-5,0.09719917108072512,0.002961279417463047,0.00043122898539836384,0.07778404020469855,0.0015264765671128254,0.015371885852700079,0.05713835642874086,0.0007877183141043193,0.0039956358547702225,0.03821287508525871,0.09381504574301208,0.011339609952283485,0.07202232361692534,0.06106915207997946,0.023141102014389976,0.03873887562452327,0.0016367222977785203,0.06443669115160842,0.08121898133310358,0.1253139974282557,0.07026980758973513,0.07100102595671853,0.02022821872081026,9.555296642967078e-5,0.0007052609062719464,0.03262812831412789,0.07080999498382888,0.09647025106013737,0.03951579973145176,0.018342788769806,0.09682038522737661,3.0031502549298525,0.06616770870529863,0.07325465823192805,0.0651836285240933,0.05025939986204238,0.06869430281217835,0.0031481972709799014,0.0016113560849463661,0.20081378398426072,0.054313353952531895,0.09918688405061586,0.0837771566742204,0.01288059373535364,3.273119010293289e-5,0.05499214246005693,1.9636551296303228e-5,0.005973312156436486,0.012162785949583465,4.459671897676479e-9,0.10608331159696799,0.009725339610520328,0.054739397684067596,0.07026642051738505,0.02338713003121295,0.0015561334871143674,0.01851412152180345,0.0010422386433723916,0.0029555088347917075,0.07403385860764496,0.0015358980075690692,0.0012956341886807235,0.00982544959336819,0.09896089624739196,2.2416895067187363e-5,0.0007151769202527248,0.07839309909208654,0.09284749092794274,0.00775042312915466,6.459756094071641e-6,0.007484603696249052,0.06241661948971456,0.000540354797607622,0.07069604888373887,0.06602433352316356,0.061622823687012156,0.08271991757175325,0.10699961353970078,0.051418584940066424,0.0016377446396355951,0.03893291519705273,0.003451945680749459,0.008380338717621724,0.12748385527740433,0.047328207864029186,0.014609437291288429,0.006445526250899409,0.0359285962756558,0.017475069022400078,5.4192828506447576e-15,0.0002737323428240212,0.06741751142829315,0.00039578256477888605,4.614322523993534e-5,0.01430245816607791,0.020995817102376278,0.05660741925332783,0.009872221296049491,0.00027852639063060075,0.06961546840200554,0.03406147100263005,0.07322051530739972,0.023581905797353548,5.170882213731895e-5,0.0011237586622759891,0.008594113474536513,0.0019072573768563277,0.015034255092634416,0.01890439989404773,0.02965642472133053,0.0223670809576144,0.11545624431236338,3.046496096902145e-10,0.0027949961729912187,0.004592307139108758,0.11523609273633989,0.026903662922211517,0.0034082399662895874,0.0023812678292342297,0.02172557743143222,0.004297947135206047,0.004243129754364602,2.7171455914632813e-7,0.05933453170980171,0.07115235934315975,0.11727701156398945,0.011860235257972362,0.005677005092855167,0.00953747309712347,0.12734702255749852,0.014432043988297989,2.478136982736329e-11,0.005000368327663765,2.2702569308158034e-15,0.07139222139756103,0.03311933487089441,0.03445373760816113,0.053971999056564655,0.06690036374899741,0.007321506434020766,0.08264673688409545,0.010766121004308038,0.03518383165587863,0.0037102307477003592,0.08300523004473503,6.296084304305814e-6,0.04568307664757822,0.002450771993403124,0.08880033958963576,0.07053029432584611,0.05747139378396133,0.07513895931034416,0.06982368257689926,0.053290922318237025,0.23988357476792302,0.0054385856495243615,0.06710375906797729,0.03112454959394865,0.03148052947600875,0.1400202175248422,0.00355486144962438,4.516657398082671e-5,0.010852054252265209,0.017140804813105988,0.1040229410887503,0.059414953319643624,0.0003200305460863693,0.03477909693451102,0.070823276420786,0.0007541203470372786,0.023004350924413657,0.03190142044835604,0.0025703350712700415,0.0034445829195185068,0.004172905461595436,0.00789164651506975,0.00013874172478872028,0.011629474286579644,0.024879067717692667,0.000510729297089112,0.0025828946270495443,0.09465627258282565,0.0036497368420709275,0.0014241178669351122,0.01526264454955159,0.0025407872655272535,0.007248394333558361,0.00232630025769002,0.06988881293780932,0.07123047514751978,9.604737168094624e-5,0.0007107864798973866,0.05780757448567328,0.009339779447370418,0.020422716434945195,0.02029048849873398,0.0017162164439560635,0.07290762929980181,0.001437379665125845,0.00011616689362813462,0.08725259321850574,0.0751449492312671,0.019749157617766123,0.06491547452799055,0.07524883129350034,0.08584861306731334,0.023987036620651218,0.09850852413628497,0.014173833920487586,0.11605887570010384,0.0680444279675438,0.14288290488765473,0.030876819664967917,0.0856032786328619,0.09404252382457125,0.00038516008098535997,0.001197120309794569,0.039095846104184206,0.07063090575450712,0.020449696706469882,0.18929655806463122,0.06955318650369188,0.005559937721815206,0.0630686573213838,8.550917934411741e-5,0.0010578938011503538,0.004447393011616964,0.033892655631829194,0.026778910118265883,0.026382262060336073,0.15917565615239268,0.0014376329207297061,0.006679751601125612,7.002636341077732e-13,0.00015648067001066565,7.206343995288526e-7,8.074177094320803e-5,0.0013102078731644202,0.06599634131923073,0.07565398853030532,0.016611720747180075,0.0001439908991130396,0.0021904623449652753,0.02350688998453447,0.008690822088532467,0.07521203381070163,0.30725663876700277,0.00031558667042231594,2.180799374816444e-6,0.10134044508915371,0.0036487137109580516,0.052107616016884004,0.07305147134909541,6.4079192896797466e-6,0.09068912848542178,0.02385246792755826,0.08452487875239773,2.1194949886268508e-6,0.07817587901231801,2.138345569083019e-21,0.0082819201242513,0.015689177024494128,0.06330235600625601,0.0745961541170076,0.06426477413936164,0.00026915372091677604,0.15264757263342316,0.04839054153805257,0.06214919224552353,0.07121307648790426,0.0014101630298102902,0.002283453730863736,0.005704721977806049,0.003431117862170453,0.00160877682116276,0.03297781616910497,3.4803514271320704e-5,6.062317634729962e-7,0.07314265066205994,5.9426121839352236e-5,0.03463723299632869,0.05595451268102219,0.027195099115106914,0.003949232976139456,1.7181800905362303e-8,6.138945515634842e-5,0.07869220437912693,0.010045841519361767,0.03465000810078941,0.0570414064033917,0.07635640910162363,0.08885913957801442,0.0856022717668982,0.060896702097835,0.07336130118804973,0.008354756690657784,0.10203785608263571,0.04992665857884802,0.06965056413014185,0.0191054632972681,0.0816742612936303,0.0033343972820093696,0.0034599747107001287,0.0001488908234204179,0.02650299518639713,0.08033283147856736,0.13027151219407815,0.08910386294924748,0.03168308244253063,6.886733607128181e-8,0.056203821413227134,0.00016811905021112128,0.053362226573433896,0.09335425843562153,0.0706306791606952,0.0491048566457145,0.014176759572976132,2.769356744712121e-7,0.09774183725657888,0.003855613091849728,0.05426642132977328,0.05490159319627629,3.480779757720922e-12,0.04499398950598565,0.04266319343345811,0.07273886812298325,0.08908901479374644,0.06434441206818137,0.018644755011644424,0.04711955390935188,1.5477845101975687e-6,0.07909472330658472,0.013399803172062531,0.029521335497420368,0.00928875454956071,0.017313581492052522,0.005098009916303227,0.07283944985061909,0.012973771433687383,0.01568096562668346,0.07244039524443449,0.011813815510900312,0.00015414606607932395,0.07628414156765324,0.06278255991236935,0.013120867082966968,0.034353895966422805,0.001323761338818163,0.01743660991499822,0.00044647184308833,0.0017860125007054706,0.0019855371894833993,0.0007443110177181159,0.06497686147705262,0.0016404750269941324,0.061301505093645035,0.013184711469636567,6.1217618647765184e-6,0.0721615040479033,0.06377566817546473,0.02930459789215912,0.15352589394166444,0.04939351073294715,0.08486799868455402,0.007264330369433724,0.1150913400269315,0.04447583547621977,0.021690226124275094,0.01280946002288992,0.04446152850632051,0.07006614134956188,0.068977935860837,0.09352651959696434,0.005814515901406016,0.0004214388758230925,0.07720460656796303,0.0403502261990976,0.00048539629123614325,0.06959116664733339,0.013403515331373414,0.0007559150271099569,0.002263443647506825,3.7152885500586045e-6,0.00480851717987124,0.01087841667467208,0.0009752594492999642,0.08470061935603027,0.0007761942576122406,1.7264619132177714e-6,0.06113410740928587,0.00026747017160934534,0.0008708091370966076,0.010168558281164345,5.816393276589501e-5,0.0020056368141862535,1.1193012003427105e-6,0.4687115465917401,0.024161352263218337,0.030176349143865595,0.0015218484362116125,0.06963940188573377,0.05312035678849564,0.06477564984482982,0.05283677038768362,0.06527266318193371,0.10825777692868295,0.0009731603464507811,0.0023355355040569027,0.003038177759035012,0.006152049076250416,0.005325447885574447,0.013391809557088682,1.883255075874738e-5,0.14132918914545528,0.012518525816138212,0.01003458359703104,0.014799650570435889,0.21770123148899276,7.708547168353442e-6,0.08267532449712167,8.957578749149961e-14,0.04446195061286821,0.0026908214361453476,0.0035767931288575314,0.03935640185347652,2.932904483235998e-7,0.06609235589263479,0.01649180894105233,0.047397513458811505,0.06858631330131362,0.08784292117068862,0.1695143997774841,1.0745248784502163e-9,0.08810140057624508,0.00014022809341617416,0.15055584059027038,0.000968316371486477,0.07426613741420453,0.01876612100226237,1.0644433938164524e-5,0.18887774903185722,0.11457607631553776,1.1858429242981092e-5,0.032377317118631656,0.0008182787109883436,0.10857663203007531,1.774784675920352e-6,7.561930182750179e-5,0.07172017999547195,0.03913148536434207,0.012139098771536343,0.016221247092177517,0.07384457981705687,0.04561826020176272,2.970202205606246e-7,0.028785537145722382,0.1391678527117981,0.10162351998047166,0.04672845535051741,0.04283083924964267,0.002408006418993515,1.0619683145121024e-10,0.04681879474782076,5.701317441841501e-6,0.02401969879463716,8.503240763898895e-16,0.08394395386889869,7.248046565715186e-5,0.002022198542798533,0.026047851605354323,4.3672063981572534e-5,0.09643879565153134,0.053649752061074,1.469883738572268e-7,0.02862540622212864,0.038950051498965854,0.04434033888403149,0.0783154493054282,5.187865048319613e-6,0.09488339776174387,0.07562807328016859,3.020030572470301e-5,0.015110687053662138,0.00432404706486159,0.00014887240750176774,0.023885770954293527,0.006361748660076276,0.031281865164163494,0.19959341470792621,0.013122508620379843,5.738488516794643e-9,0.013855331066432336,0.04042790716263274,0.025016226384268588,0.028236468231114656,0.01092703609492692,0.02603509485905681,0.017110536152148987,0.008519837178889749,0.13549278374966847,0.06743527000191843,0.05855280985002201,0.14420996435380293,0.11284469274738809,0.04431726551155072,0.07142120199612442,0.07017222322212988,0.0594925946299462,0.001269656971557298,0.04909100711357119,4.9424479801203535e-5,0.022824371086560394,0.0025032366307107543,0.003469692412446288,0.036411054200623724,0.1464086965902469,0.1334588724125522,0.009892367081401156,2.0944903009584605e-7,4.1675767779306025e-6,0.011110324391642832,0.0051783304855755365,0.06799298137098232,0.013907427474842821,0.06588911676290375,0.00019473234580454725,0.07328940862460169,0.06179105954432881,0.07966489368877404,0.012036096723719062,0.03941871374524763,0.05979957248791234,2.2370962474246538e-8,0.1417569364265815,0.04971143150108796,0.064068224772276,0.10341641385498428,0.006952809545855206,0.017180828428582377,0.0006339807989105825,0.04059516336070387,0.09888572008013169,0.004363601740797674,0.07170433399632593,0.021705602202364883,0.3867839862659101,0.011839805024121243,0.05308533037541693,0.07643098419893025,0.07025335058392422,0.05694889155491332,0.038732320697297734,0.05829161455143292,0.02711450687510004,0.0008224026740958052,0.05903985681651809,0.09555724601409235,0.022256332258475956,3.2218785773720873e-6,0.00012358522791831164,8.978222250720124e-5,0.04528266827552009,0.04182208100495537,0.057720789939969375,5.331788997951641e-6,0.01634384565449953,0.009777084059692819,0.03945220520584494,0.00022276135913779608,0.06826610925857861,0.06587765473931238,0.06198939602901706,0.07817941507311668,1.1055192525559609e-6,0.12619916260205427,0.003009317469853699,0.10054645313863095,0.008000131168570417,7.526242115831824e-6,0.016279151918049517,2.7211981410547e-6,1.5883573159272765e-8,0.05875768412074419,0.0009261903406427635,0.08603907111557586,0.05028183132498646,0.06064362891161974,0.012403514367876359,0.13142060849632325,0.12906434432826383,0.19943590839432765,0.07678565358385696,1.4349399228501947e-6,0.07490412268522388,0.000825840902110739,0.004725028743104005,0.09147427125332072,0.00021785037004894633,0.0142343875530737,0.018311347382018197,0.0054837608627505635,0.02017240092694473,0.03879153346484626,0.0006100509264359031,0.00017253025732074225,0.012998471174259282,0.056165874981095085,0.035665826342446534,0.00015201839413343007,1.0445395522136963e-5,0.31039829553863624,0.04381655362609496,0.03554014690013663,0.0630510935548144,0.07618226042817121,0.11767999441293742,0.06932574939475304,0.04222284010773794,0.05056125716792426,0.05860335832338881,5.717936266823792e-5,0.09854242442430815,0.00023849058276845844,0.0014387401742052383,0.020050063429648716,0.07559567613709905,0.043085151712473804,0.029118646727173417,0.002243330171211609,9.795303732183211e-5,5.284616489041586e-5,0.05296839692682016,0.01672505137119468,0.0004242881350922129,8.780931506129598e-8,0.009836770180083257,0.04245578217626922,1.3196261159743972e-5,0.04270602039948071,0.07992661592285832,0.07024388325334711,0.0012845547491180916,0.07173062216977266,0.1087776749795653,0.048814837596693646,0.07155675007824619,0.05043122203182379,0.017082138909942337,3.0271877004563547e-10,0.07991209872490258,0.029002303599596314,4.960657945101546e-6,0.00021431150336025654,0.005923373653882346,0.04885818433448867,0.024638122404359423,0.012681705517806332,0.060404697211531924,3.737196503250733e-5,0.09511710729887875,0.0032013872627057014,0.01815473739074319,0.0502147066684569,0.04447809253335779,0.005174506329939103,0.0007076633086327744,0.07801056214264294,0.06031511460786734,0.0024691673543040817,0.07065737276632321,0.0039544290186803825,0.00720305753227109,0.06574566623210677,0.040228902519247746,0.07646712573897216,0.04366098705184978,0.013987183956446372,0.010818990669987323,0.0241827566323164,0.041295257507245435,0.04107875930320157,3.0803927410752568e-6,0.07020668621738736,0.058464438070847086,0.0003908991986626937,0.00021213682676337722,0.048901999918218725,0.08190684359362457,0.027063982081474633,0.017593354478291467,0.009094182319896591,0.04416043142019314,0.0004230625253168812,0.00013636222797317265,0.09665631517633978,0.026433868840869366,0.0172413925706426,0.001547881642163862,0.0014176746601127859,0.030141059909996642,0.00432367219339447,0.0013993791721676958,0.0686913428349186,0.0513467823575614,0.00024104197465946227,0.0066842746837669645,0.04629113866294226,0.02556015066507958,0.03208482954019073,0.06372170643310594,1.5266805666797012e-5,0.07604028754560353,0.057120842153631786,0.0007148848487901656,0.07025565009289267,0.06931177469769063,0.07990580223618127,7.717235870238831e-6,0.029172038295532502,0.0018603803644999665,0.04618673606319794,0.049952464305110994,0.08267803928840549,0.0792316944408846,0.026697062483059655,0.07188571445720729,0.0008297550639243445,0.07061554293943627,0.06579942292455566,0.0006306896000044638,0.016644712592288797,0.05625450514407622,0.015064811752495197,1.5387773466033792e-5,0.044142222440424934,0.24248489900267464,0.0014952144158375542,0.0005197653886085813,0.0397634821533696,0.024483799783649146,0.0016240439758341703,3.82677345242752e-6,0.058854778282757515,9.45568172056564e-7,0.09966548487426029,0.025218216226814062,0.004968116683343641,3.751915596840109e-5,0.0914336149479321,0.037338009999529756,0.05324552518506923,0.010482151222787625,0.0002286539760545164,0.12889995957179484,0.0038662586864169606,0.07264969447477987,2.7118391485881748e-5,0.029828067727590404,0.04377700481856442,0.0033719068916093437,0.08217198712640573,0.07256419004367407,0.002362353620274545,0.0010039139091883602,1.1939909276978515e-5,0.03543891927980969,0.06014118163699035,0.056380125027422824,0.07086182485564398,0.043509299061860074,0.0686657458225771,0.0058985671652355895,0.032797088976422334,0.13432562131494277,0.06272386240726534,0.061346181255387,0.0474092600760342,0.008676528857793136,0.010072736794788225,0.06942005198724946,0.03917509955804937,0.018352599953007104,0.06521440235754486,0.0725111906350024,0.006895931413549096,0.004046521643424036,1.1197547209925432e-6,0.07024530489762064,0.007064513663008121,3.7811523331399396e-5,0.0002646183853251401,0.00255165024160901,0.06581090280861435,3.071404253525775e-7,0.11791890976274164,3.66206240369061e-5,0.0009445442647332932,0.05009157580013802,0.17613033636025702,0.04704000911338886,0.0006879630998629247,0.07305398124887075,0.056617117128804184,0.005806152811308298,0.0024819026663523993,0.0015630495379538492,0.00878557919178762,0.00853156296583833,0.05580420659824431,0.0003006361247623446,0.057036215256874315,0.07356269080673108,0.07317717528840545,0.015841949285811827,1.343325380489006e-9,0.05441298853591079,5.493559551797879e-5,5.6229752275421345e-5,9.510771547577954e-5,0.056500134667635205,0.06168831076069524,4.141188774420602e-7,0.07784131376942913,0.0742939025473304,0.008865280268867601,0.012754865302922353,0.0636208344885914,0.07199549346497988,0.05997434000783036,0.15218251225962906,6.970535320310527e-5,0.07015283908513122,0.004707435843762762,0.04834080796140616,0.08453935214493649,0.07072209894143461,0.057756324679054324,0.08124210498491875,0.009380557040043501,0.07463589539763686,0.04367892299567483,0.16007681634454832,0.005398347906529868,0.003862829109644478,0.06146745110962125,0.016842149210631676,0.04222254885229252,0.1152629533342253,0.00809970252510548,0.0001580760938756515,0.10352734970576137,0.08362667208600275,0.1411780707204503,0.05088571244846611,0.024015701164179025,0.03678566814310325,0.05456688163949634,0.033145939168513945,0.003054137220094368,0.0005219491866805483,0.008173391230582321,0.004477304504593491,0.06989749889694742,0.0352109805707669,0.009920266619213778,0.10275233888035515,0.04752842206177828,0.03332828378928415,0.016004906546056696,0.013079988279293098,3.570155010403797e-5,0.04245147641764346,0.00012365804614857234,0.039105769088940444,0.0006264727602717533,0.027074987173041926,0.0012373399255453863,0.0010080379939240362,0.08812870604037558,0.023763247556555827,0.0003468316004891191,0.0022588542178049393,0.051884232019924696,0.0706687691926955,0.22137796724383693,0.0031475791487231832,4.670548047411744e-5,0.0013195558930530016,0.10040050239316509,0.04307462356455406,0.009835831672941884,0.1227141221950811,0.03411312912297492,0.06602386750359308,0.1283428981522416,0.015673424975477964,2.38258716423701e-6,0.05627314220742546,0.001270930942065541,0.02956254616119548,0.06994633064796199,0.0010385238306134365,5.851783344626612e-10,0.00023661342740067902,0.043342510653307124,0.03097625567933069,1.947098581575014e-5,0.07001508481103959,0.0019489584718387293,0.06882628837369384,0.5940511654934743,0.12649542839546077,0.0726662473005468,0.0038136264552897374,0.06112206360509317,0.08800591016595151,0.02210019043067121,6.01763300436249e-5,0.06059218871335889,0.06599410829021639,0.0027324339604095907,0.005011695305735794,1.3322915882311202e-16,0.05723129871370669,0.033488872813655,0.020604659757157088,0.09813467020829698,0.01160429207496322,0.06001550355402137,0.009718725482787778,0.000322057745883923,0.00027629029629024993,0.009673746636950835,0.012256277498907836,0.051286168233989245,0.1274512856261354,1.038819065061525e-5,0.08415428901690537,0.10290099876748741,0.01702120961318373,0.004192672468960414,0.04098034676055932,0.04260376826286069,0.05386340103182485,0.07694246764598962,0.03304971135028556,0.06204478320274291,0.019927632986973354,0.01572950564022097,0.00471057158967125,0.06881486496266796,0.005405591905199905,0.03871776185011536,0.041590495178814905,0.03774291972385862,0.03702548444998713,0.000761554779896678,7.863806779953381e-5,0.05470214950810222,0.06449633772836966,0.08065309939272745,0.09736735893433794,0.07456337788620568,0.07938302230418094,0.02375514286626038,0.054190290067678136,0.005841785303465027,0.010861205123853489,0.15727364461442442,5.8799486916286995e-8,0.013914067859422495,0.0003409507864977567,0.006337983926130452,0.0025187622037095474,3.18723241056127e-5,0.008740787910025803,0.03956405235982112,0.14548161987959615,9.291624020769438e-6,0.0001633161685791114,0.06893280143319831,0.08798079270227636,0.05013319030125598,0.06805983098183008,0.1101484236965607,0.009689541450436991,0.06298855337562416,0.029522407689964857,0.018543731637809972,0.003442382148630629,5.358018208895475e-5,4.738187040812943e-6,0.03127760883597637,0.09551777129429673,0.05169752025454423,0.0036233229214197972,0.01300337678997052,0.06542930513364942,0.16712545882016586,0.06168857502102731,0.0766131964187089,0.12571571352445762,0.05240880209420645,0.09877280456523183,0.0002858118948128548,1.4491308450071141e-5,0.06043080309955889,0.002854250925304219,0.0008807252915102589,0.11236195208728716,0.036201588175028845,0.003738235991981075,0.060101367255072057,0.23182464117652093,0.08113452676442677,0.12505904914574367,0.017069241767186057,0.017929035152508484,0.0013466641473849036,0.001924800042105429,0.02729074252823945,0.009368392176124056,0.07220712892963937,0.027860593222876994,0.0020098698601934434,0.07019850760015388,0.00012450270980138184,0.10213445158563786,0.09196417419101824,0.022590306378584578,0.11601780823323125,0.06835912225379467,0.04779555414606659,0.06739728269434943,9.150384700177097e-5,0.015070371291728387,0.07234406238254014,0.13050116061017591,0.00028607496769332146,0.03813703765688049,0.048294721331685796,0.06360407193120769,0.016660267803774272,0.02126695966729118,0.006684627423329511,0.00048612324708157057,0.024325152228258366,0.052617465899708234,0.00046883387914945174,0.00038595782244052555,0.04328573344013519,0.029743184981964193,0.14764624438551252,1.011469513838028e-9,0.05317646795892432,0.04602500240536119,0.043857468474492574,0.0023015159215188574,0.02792122746256091,0.09661848444911765,0.038117326959805,0.021154507560057823,0.002913582888136569,0.00136709422104328,0.0386357548583869,0.0561222205098973,6.155036867983537e-6,0.03810689352340096,0.10463025617909137,3.3587236525821526e-6,0.001095169321997125,0.08891256197427881,0.07849971197565131,0.0878648655035525,0.025161849287431058,0.05157669096406065,2.42381805337165e-7,0.06717263316649642,0.0630920678688729,0.053763371550273095,0.06833683693280777,0.0031015172007208777,0.1755449455859463,0.06874534502326929,0.059407902032734626,0.025650339491032466,0.011712678584466021,0.09171420719737398,1.1541841954942692e-5,0.04165557295445877,0.010130826802209544,0.0003723833445522255,0.07289619432257918,0.0070555817812737115,0.0748030351869273,2.8732609263456945e-6,0.0060802371443562705,0.05654892312783604,0.04211546171015765,0.000503442708638418,0.0822293551126536,0.02704375722615866,0.060430430968998465,0.09674967231743115,0.06981914421804221,0.014990585632678254,0.045851122483973765,0.03261811270079411,0.07166288046171143,1.7713433305863735e-6,0.018829334822926355,0.06794928374809737,2.5310702787753195e-6,0.10825121261889752,0.008103442270769808,0.015571565354318438,0.048103378315324574,0.02697594688873774,0.08664115422824809,0.0007284782964968864,0.028610557630900472,0.011478606206551731,0.0024032748982758204,0.046944527552930874,0.006433875849424017,0.05567743414608043,0.0724646562217933,0.012802274136782747,0.056679625472532746,0.007036673661466247,0.04295627666333042,0.0009120232932627845,0.059075370880229836,0.12120368739778152,0.03934012410438569,0.000340120350272644,0.0691098602731755,0.01578721201311541,0.0491123428410754,5.85704974718934e-9,0.1335569285447152,0.07088687271591633,3.0255827118621634e-5,0.007310323886256563,0.003108068735170743,0.011997646649204465,0.050020028342413404,0.030146200625936783,0.06297536412951868,0.25213755759039264,0.07312735549222031,5.9752291191782736e-5,0.0010113316904144579,0.06717799993696402,0.01591095759902174,0.0022589231035585427,0.034924663281860384,0.00020090026968002262,1.939499195848467e-7,0.0006291008338872667,0.004891916754913404,0.004146796705469488,0.002010120595776631,0.08195849776356985,1.4151311799453299e-5,0.03159010648527084,0.013127110003311897,0.0003268489033034212,0.006299013499668345,0.0027599751394847597,0.0023977800221557308,0.11784414094240818,0.0009876872638465463,7.351325709948821e-9,0.026322237175954482,0.055709345202355494,0.02639454091193454,0.00039250786965332765,0.009026309112961468,0.09688731542681307,0.0009111647515367334,7.977148012027345e-5,0.07320412789576342,0.07497833636417536,0.0705386616716172,1.533426129152396e-5,0.08946115922519136,0.004719382979652747,0.05904300044181324,0.03556715065137845,0.00885791582251967,0.062088527512056915,0.054616290319663315,0.00010569401711565435,0.07270900553560733,0.06864668208291805,0.07553029036590236,0.00028690219482933687,0.01899093882214401,0.024441083480770905,0.020134572808436217,0.0208970873265366,0.0005150414456732009,0.031339846324054434,0.05424123560688565,0.024146851548966914,0.02142804222463145,0.05281321922837818,0.056015771289631845,0.13779092003958954,1.1644906513122116e-5,0.07867115852076435,0.05308150566642754,0.00036079904325315624,0.06785481959787096,0.04429424260435513,0.06818268838109678,0.0325187157282868,0.06028503208830513,0.032822168305904384,0.005227908336162363,0.013621471579142968,0.13466502781230547,0.07556477565571568,0.05028255737638839,0.0006083214759101665,0.16904072510687607,0.0817759401706453,0.06133511013441865,0.06994066513637238,0.01546381606333651,0.144666249095364,0.061499461807265565,0.011196110455930181,0.12986805024654652,0.07288894348652335,0.0621327626626993,0.0684096243676687,0.00017880960197575813,0.012173693088698874,0.07159974659767138,5.7275563368605614e-5,0.01833180718388449,0.015721950573001985,0.06996444502410663,0.030712707090837055,0.0006249715052632921,0.05849097181116642,0.10179676159787285,0.08228649958085815,0.02914735404063731,0.023484381046349687,0.003408709351408866,0.10147464084632499,1.7550390385586065e-6,0.0012832073722635823,0.11081619303972241,0.06041165773424692,0.02462436110168998,0.0032384362449608267,0.08394833839086342,0.0025312903745137085,0.0011293167413750152,0.05584047623170383,0.03711434830954002,0.0005425468414618671,0.057741555310311644,0.04065436101237338,3.867596345365304e-6,0.03554800118899237,0.06490341706069255,0.0030626122674689347,0.024621754111762633,0.0148823736274644,0.022354424236277416,0.0013632804838829935,0.06044354680225165,0.02276849399475683,3.979347320191807e-5,0.13607801581505521,0.07322862373622924,0.003081446492851083,0.002318094132041138,0.031148059991741518,0.010208682798429432,0.005941018419519459,0.006866778649237881,0.02561365443131834,0.08569189034026364,1.3634617398059045e-5,0.011957016246527534,0.0635990744155694,1.4417391860294382e-5,0.013066797439158872,1.2143264661293052e-7,0.11193037293848328,0.09745367189836429,0.05064186517786705,0.27817016149959717,0.09013239314648729,0.00022789881293764963,0.03615817387157237,0.0026723234464710237,0.07152221051376656,0.040892970383537466,0.026344283655511048,0.03111690185272913,0.0019871513325411642,9.495763774056249e-5,0.0006209384002868934,4.543819807700736e-10,0.042944682534175625,0.0006094396596773661,0.016344645945521572,6.849845035228821e-7,0.004831264260503088,6.804324751889924e-5,0.10426946481713956,0.04011784537922099,0.04883722389522209,0.009183823543427515,0.056995796422899,0.0886694283584731,0.19095293591699483,0.10892662555710265,0.0001375391408061968,0.09700854879955635,0.0717918445158558,0.044761431048230306,0.06759268655981046,0.0419318987908384,0.08787335017341033,0.09903729397690655,0.00975649926826365,0.00435751395605139,0.006601248200357052,0.07855644999317485,0.019163154088850328,0.18887853771504107,0.003202213130339436,0.03658517519982134,0.22350780476422316,0.04700975404226783,0.0742666033066213,3.691736174163797e-5,0.10348013679597061,0.0036330924210861526,0.05385915718479938,0.06840783226724052,0.010510583554584188,0.04394473758098532,0.0020341828783168843,0.02603853175232459,0.011194048490998261,0.001791849742201843,0.0015229494364632765,0.0010675975535680046,0.07572048106751414,0.07356375462914266,0.0073612364433936215,2.721857247491579e-7,0.00011697904852926846,2.8422492229880113e-5,0.03473471412503589,0.04408821094075395,0.008962964661286736,0.021778823794343174,0.006589793659461557,0.0012691147591558786,0.1419699094059179,0.0002670119109460355,0.07540311646758843,7.004519944135825e-7,0.017096275068241015,0.0037386094753630895,0.014678657259332376,0.12219058881097801,0.09074943201161557,0.0006303530838092801,7.00305616071657e-5,0.08983306902227757,0.0959268898674034,0.0008680878383223442,0.06793799887899213,0.02503529517741474,0.021195089660921672,0.0002043532630394223,2.0778520718558902e-5,0.06993556222474105,0.07398079888280444,0.00023152904392493195,0.01567557943074548,0.0025815984592339122,0.051016819752643806,0.007676469674076624,0.0672961106278948,0.003169701503918637,0.016222677502782615,3.328964520751132e-6,0.07526148208745954,0.029820313110263338,0.029982963831489896,0.01645698282561575,0.06914453344496836,4.100598001450318e-6,0.047554471456247076,0.0031098036855864825,0.10834276470674159,0.05096645311875235,0.06894439252553981,0.052380975415804054,0.0754662054402113,0.1011522993448285,0.0006637528920080272,0.1127404800547308,0.06976486857770324,0.03862281444013366,3.4186070107815116e-5,5.5277155019287994e-5,0.0006321749258955244,0.0009437354557925244,0.07351151149625725,0.004454388410540896,0.07093937943315705,0.01960969223218525,0.0780575655070222,6.893653854034422e-6,0.08393416315476014,0.11799023759350573,0.0031911454221153403,0.06724852642271453,0.013203639212895583,0.0904130288613897,0.004423594111445532,0.0005404740005179188,0.009448686214833545,0.0172087837959828,0.09381033861961424,0.06622687814524567,0.00018170996625629796,0.0004491296178039288,0.006671557342727779,6.656629930506971e-6,0.0043229011931005075,0.02026932336922192,0.06387201814951388,0.46458568764968117,0.2333965629686451,0.09495829485370996,0.08662555988005148,0.011716735588106438,6.906860198475646e-6,0.06743019329850031,0.001657317553267004,0.06451406632706137,0.06718016420788298,0.05507509262413618,0.005054842493331922,0.06725361864347115,0.04643168549623942,0.03341025023872838,0.01734299937611026,0.11704011131227134,0.014239566505503023,0.06591073480437289,0.10550891574516316,0.06427626280164818,0.021664272904997093,0.03985918731914364,0.01458892374518129,0.048909441082777,0.07378707630146206,0.007664115853846867,0.13508086540617523,0.0731108818317789,0.0003003692522884924,0.7453087160286531,0.07864901398472961,0.025982009079104505,0.01930934527247519,0.1017585363241354,0.049915902971706845,0.02132716982012089,0.06054070604840717,0.09735113705238879,0.1111158232269016,0.011409409174366555,0.023569653527902024,8.125101508542486e-5,0.05287370167338699,0.05974068019882465,0.018564554136648752,0.03342416914911306,0.0646798753583147,0.06177051081264868,0.07862128393186132,3.811876829032568e-11,0.0438537866690042,0.004672029474144642,0.1000762890850874,0.11148329163692551,0.6642464913664272,0.00010827265092164744,0.0401209630448366,0.01650915177166376,0.042692000991151585,0.07050798203902252,0.09707829410268358,0.0020845170666235714,0.011611246831015004,0.15968624279300242,0.06617062040368968,0.015339793792423926,0.03771085428005088,7.811394956907454e-11,0.027148433268995544,0.06490842358248544,0.023566377913469997,0.09682893944567138,0.03593115828444088,3.115372137317052e-7,0.06896994720463931,0.034120567531012,0.08740571391421055,0.1551404806166104,0.07158392211292249,0.0004000562209832943,3.541304551940324e-12,3.730545392467428e-5,0.06307815776186745,0.12308108966566111,0.0024832743734225535,0.05089540902085119,0.051682518503912415,0.05601191059441958,0.05526616235779441,0.00202458193098776,0.0002979473778015542,0.06999699887417372,0.05040969637833023,0.05988179926595354,0.08802502257985335,0.11537606915231415,0.05311976146367953,0.027502769533752566,0.0026743630122541403,0.00021585759616377453,3.277399711971601e-5,4.88290542836054e-7,0.0898737752538048,0.0068661411869253095,0.0036338525546381335,0.004713908798114869,0.10407149399128032,0.034385070954266385,0.03533817848612775,0.0805198456809699,0.007711633905951417,0.04074094629015148,0.05397223677364075,0.012565415573238734,0.06415859166678752,5.358019665391877e-14,0.0016079735910586174,4.4828568327723396e-10,0.10194724092335417,0.1372839413164435,0.03217817893354755,0.05211718440395368,0.027803252254978355,0.00013489610559928216,0.0176228890931206,0.13741897583232113,0.028408348229932958,0.010283864823556848,0.036857604157696226,0.064102945278036,0.034650703831191475,0.004423054648630077,5.0812450660061054e-5,0.03634015424152535,0.00012464583980649878,0.05310946291254383,0.026377558204857942,0.04889660279735583,0.0021893835551366806,1.0153300250003815e-7,0.06279408487552494,0.0001234921674350641,0.07623001182036669,0.004263923071618197,0.057718552437813035,0.0005322414222022561,0.07278501631576403,0.09499688829354114,0.06711520106021059,0.021299181232155028,0.06639321282612984,1.1856558346053873e-5,0.13836038453931393,0.11332125158490776,0.02453546552944148,0.1471490351773522,0.006935746715957887,0.005261834294123673,0.02503027303023167,0.030531962717170645,0.09967335910594025,0.0005716765082719445,0.15340030669382676,0.06280402508978616,0.015275174799208847,0.032256132384250596,0.07528878752411763,0.027328275852605468,0.07615463075570532,0.003941052165974707,0.06545383194359027,0.0005827754702773842,0.07205243676252952,0.013407740462393531,0.07129829172469884,0.0003536742115830443,0.015724931348372738,6.852080292665611e-8,0.04752540636594066,0.06497900946506398,0.0865974940473057,0.025602822483343748,0.02215809450857437,0.024501037004262503,0.08172592896915175,0.004325159602573555,0.03279830594780557,0.06527416422558319,0.00033092317603105215,0.010298279022491415,3.950752447736865e-12,0.09571286558509746,0.08398937700660551,0.06832306759024119,4.371856956549611e-5,3.889276341820955e-5,0.1336872030784777,1.3125714836440868e-6,0.06633117960339244,0.020136356676268428,0.05801327811231815,0.0014849372007201941,0.04991595585084977,0.0742107658943382,0.057391895117781824,5.19849281703075e-5,0.06482612196660703,0.013389781976304848,0.010365633986916532,0.006742092558688716,0.00028841199317592196,0.018263704816647013,0.00019199254554653366,0.01769113285716127,0.3046682064322089,0.11209406489721568,0.00027845878345654837,0.004332314476568529,0.08216460329231683,0.013519130768188206,0.00523352467041462,0.0025151366585212955,0.0049449247082361866,0.046989552049638145,0.07571351202208645,0.08029370760705139,0.0022356786928315543,0.031595716989294524,2.6265080874541947e-5,0.11206922925208161,0.024603461298229896,0.07477144695981164,0.019032771891637257,0.0001867648706169374,0.06875945152446797,0.0720660506569497,0.041232004553981134,0.09678762141417453,0.016355209203544895,0.07723164502384955,0.022454567262495673,0.1772179795315534,0.05792576702784655,0.08786888635792993,0.0001209106987519472,0.02780453282047463,0.017170891471407854,0.0461175688810695,0.0026502730101111266,0.027526952133758244,0.06396993928891055,0.010426858018820291,0.10335891933857387,0.06833626496415318,2.0221932820123834e-7,0.00016492352572169267,0.0017795986719775785,0.0025650132669955915,0.01403991315134423,0.029805495718505548,1.4710941826682537e-5,0.08625884306663624,0.057501269451694564,0.00014603938157032112,0.07942629422657313,0.04275591591326462,0.0003776024686472289,6.155971008192105e-5,0.0029508537832922356,0.03365360271339532,0.012110146848707853,0.06259840528775278,0.0032879925951732644,0.0029804656192348104,0.19162230945494024,0.02618327141073509,0.06313353671534744,0.0251749727367667,0.0005308071637752163,0.06427461911296094,0.05601702177627795,0.009813534461094023,0.11402737172036001,0.0039680426591013115,0.0004126105825326004,4.799608258245343e-5,0.015329598218759342,0.1346205913401664,0.01119861395892196,0.11890566506234956,0.00012359057897782575,0.00017405219376828154,0.06649036873738588,0.03533442961888013,0.060902770205285846,0.0002028162952896533,0.0692823860774275,0.025792490341752045,0.05708989451219714,0.04136526023409194,1.5228342343135493e-7,0.05740716734951073,0.0636174570442733,0.0005006453082733234,0.0345639178777277,0.0668210835482692,0.023080148768504782,7.094740149330073e-5,0.004091148740344435,0.0027908808070203736,3.563950846777266e-7,0.013251183161283623,0.0062284751113972905,0.0013500985228880385,0.07549131833682635,0.004708815178543347,0.03184408391994082,0.002552880756168528,0.02500720646198102,0.011613396451607296,0.0009095063953689531,0.08524671780691635,2.6547988651114926e-5,0.010060610726973849,0.04660550680170145,0.0031435221098893066,0.005694164141026571,0.023905407295640214,0.09018971419464844,0.04475286092973378,0.08023942193666812,0.0069746157711110335,0.0031839950867123402,0.07135164254921994,0.08076082392877035,0.07600293184455731,0.07264722587507183,0.03552753602753472,4.6265112708462035e-5,0.07302890392718063,0.028416508672793668,0.059054810060443254,0.014347795933489511,0.01018299369270235,0.05944923957435179,0.00013232754648557013,0.08137657644058123,0.012250857689214493,0.07529373618287166,0.0013667946877044587,0.06796335269395232,0.08000300588845172,0.008685228705218186,0.04398267031222153,0.00026090969050392555,0.17247652620624396,0.06079997241969175,0.005737146704911909,0.007334329567072706,0.004201548232048997,0.05125780862435292,0.08187641457502823,0.06551431256304342,0.07284592408788307,0.07052077728040312,2.1589115963932457e-7,0.04861354471051746,0.07783657562505103,0.02026773861521081,0.02826144041234059,0.047322599467639524,0.0012071858166425305,0.12242107330982324,0.034673629211575296,0.014242398590613969,0.004645159054785883,0.06723195360750228,0.02928522116829327,0.09641702945225052,0.10104386661226732,0.05219245053927004,0.015023960098155237,0.008379564859051138,0.002511024564297074,2.573042779061897e-11,0.011433424846353301,0.07552870913986252,7.688659089281123e-5,0.019542858853951125,0.09317232406257436,0.07375804582658295,0.03915907258985351,0.00016782551124377212,0.06050227922306905,0.0007833641051506119,0.005342111462223919,0.03241728985349554,0.002750583358033671,0.019015428658522304,0.04621598103489646,0.00011524506599416674,0.06503276497146122,0.1189075425072985,0.0517728361339737,0.07306151683190429,0.44709061121284854,0.10949162986786376,0.05935129547294921,0.00030402324495955974,0.06609341749772288,0.07592159384211696,0.0002572448738687433,0.030513750036706862,0.0006239220241951819,0.05649513400854301,0.10440101936250998,0.011441390940323468,0.03267671892974615,1.3005166984136362e-7,0.003089191080814638,0.06765311671782168,0.010016783928002697,0.018385722905733544,0.089782635356122,0.002293080543462726,0.06897116013472654,0.022521546222352973,0.003515726328993253,0.07778328953554839,0.06584808182274442,0.060982678447546575,0.01644248137451461,0.051416178676968266,0.26867658019011015,0.0009633113823517115,0.019496464072458194,0.00044097034166693753,0.01997869654152152,0.00044771793848382373,0.08006826901593958,0.24621843945144012,0.03558970868912934,0.0733256129169459,0.053254413898763744,0.0012111467767506494,3.6263917939807966e-7,0.0008516207838124667,0.15099151408113443,0.03119635158871307,0.004104729040956268,0.0394455328935447,0.0264695383968186,0.05119767090389137,0.06433889954081454,0.12801765201304358,0.003862460216613348,0.07193910490192382,0.06948020163800193,0.18110941462270516,0.053385500878544434,0.012065859124785276,0.11512241474927498,0.06144917730489138,1.8234801167502212e-5,0.008537409014720195,0.00036078112489745654,0.01790831649122019,1.5813728985979145e-5,0.000699991084345232,0.0632868982246042,0.016678468455866454,0.0357677978355863,0.05642621332442854,0.030716632253733347,0.03134253373222685,0.0014955712293040976,0.00065657611724684,0.08104411671102474,0.05099835965823141,0.1632020360458636,0.0003584377265811159,0.017011650855920452,0.021515286048711786,0.014909073644928874,0.0017685776837086233,0.06738495594280816,0.03270982441172288,0.14331801745967332,0.006619855796068577,0.02186863322825086,0.05196430664469048,0.003775191770142543,0.039183188337900875,0.0031723994244832656,0.00020180321907158785,0.016853979736150514,0.008440001469597018,9.272105377044396e-5,0.08027559364980107,0.03574337606130169,0.06642180559101203,0.07767549800442337,0.07597791783455295,0.00676469463514276,0.029797127660661758,0.0015996858504534735,0.04050240755621816,0.00012075425690737709,0.10244443817491328,0.013646390876471516,0.17919753931882007,0.025512862931812503,0.07876418264689228,0.03506235751586368,0.04650545548825717,0.02058916481716359,0.0062793945619433736,0.05725648914894519,0.04847319772008545,0.09036862215473224,6.571371319540028e-7,0.06810726065676952,0.013449239623301372,0.03838977557353001,0.06629882301848729,0.048027977563296215,2.2051735028817924e-5,0.055648084878542815,0.13289065917113901,0.0058234563832358435,0.06302648063472659,0.0024228768528569864,0.004434170331365481,0.05252421831197657,0.0049562875168976585,6.942412466014911e-6,0.022543643560394136,0.07149713539227917,0.08532250786775761,0.0005442047645119499,0.036577184489665536,0.06196728224462122,0.003051775510004587,0.03673644807730634,0.041019272289305256,0.18447625061171438,0.007941368981118184,0.037441440636404914,0.02742956060426374,0.03882752261989394,0.05882925272627134,0.01977582945144702,0.0023276175743627754,7.584424436743761e-9,0.002126864426212463,0.09488759806572797,0.12333367733770056,0.013528612570268729,0.02131133245221995,0.058606978817840785,0.003668195043217714,0.030583488135504124,0.009028942701532254,0.06935332188182805,0.06398076256369206,0.09132710628328718,0.07358251649897857,0.040664008029975975,0.07966280236828081,0.02329267492388487,0.00024303380009074458,0.014676763761491797,0.0032169343113680766,0.06747367207165234,0.02917911303421365,0.007511077399805898,0.001544025091289424,0.01247930456594085,0.0771230268880582,0.011247898918824053,0.09392219605704778,0.0005615828971060313,0.13216667878635524,0.06998598609107294,0.06899200005090797,0.06280223904476488,0.06748040533688808,0.010419231572884094,0.0011596287686180067,0.00034097993642509154,0.00053383292237655,0.12795564579851207,0.0827142968019171,0.00011321082462480413,0.021887720468494264,0.0010825719961153608,0.02300870598449767,0.08849538586463973,0.011012466233749421,0.0018713713070254493,0.060306705429945366,0.0051823967301457005,0.019055183828009675,0.0006057040398416786,0.0002179474379719389,0.08229400110265758,0.06094379304049752,0.03034790888732118,1.0882743008453792e-14,0.027662647452045438,0.024974912889025657,0.0009330090076484501,0.030333676370548273,0.06155572046401653,0.0015109706050578358,0.09828643795203185,0.03421488351710908,0.10035028780627041,0.05829114656572923,0.03358821888440854,0.007555512928363727,0.06514107424858942,0.05194468060384827,0.010037865411904927,0.11175909953605798,0.08959129307381057,0.06159965014583847,0.07262247219199504,0.0660655308508497,0.08595459993636642,0.028414246164044806,0.0350669381647833,0.08922218325021793,0.0012936445612859863,0.019389661080602357,0.014156769173024988,0.06414737091626613,0.004858917915709397,0.009954155038121007,0.08426593895683192,5.7809194645206896e-5,0.08402024818414519,1.0905711409656018e-5,0.1402923397494913,0.007399659278096207,0.08920409936158205,0.0002308281743419838,1.979069070730404e-5,0.0868088116720622,0.1323442229696712,2.897479289305518e-11,6.0538162095935445e-5,7.01461199712504e-5,0.054514061473318734,0.08164942946022949,0.029313612796911206,0.010821179173020801,6.953151444353418e-9,0.0032709915760212953,1.1085237582376608e-7,0.021050244229181624,0.02936372082750648,0.0741428839366841,5.1857049093803216e-5,0.003160044309147026,0.0004567155190471013,0.05475251830558117,0.024918411568234138,0.0011750844853159134,0.040540767725159764,0.02255517284218932,3.209378741476524e-8,1.3331538427230598e-5,0.1171629184553287,0.053076585490729584,0.0021898205085231666,0.34972676813188747,0.053506779114208196,0.053950444501269214,0.0639924686832415,5.133116025166207e-6,0.008765177131737788,0.05211424779182734,0.003147123725669163,0.02434754372535528,0.0013540726922929753,0.011237192837032332,0.04708773365343847,0.0007759061911479539,0.03971231367278901,0.08147399692800195,0.0015601351125914583,0.04974970493212907,0.0725254318212491,0.004638917177087251,1.341195909991557e-5,0.011593629731466304,0.01181842885784436,0.00036036427035210107,0.06776918556916635,0.1652402043209312,0.004194621801384765,0.07586452667417891,0.08510376529633694,0.05937939080835711,0.0012988289316204573,0.08412975522148104,3.230087338817737e-5,0.09015430958747814,0.022354253272076043,0.0004543311184468977,0.00020566166310211908,0.003931856406039776,0.06212533174762382,0.2832891622525563,0.0017066080865690376,0.03599854518966476,0.0023653276972052805,0.07209452199524831,0.08680388632908503,0.0051057704337898226,0.07636670026955485,0.08637252863469363,0.00045676826336289624,0.002619893000566316,0.07790753088583142,0.08693766058305576,0.012517881324366528,0.0013530999411378649,0.00039886539895276724,0.06507180522371157,0.05375245214054688,0.0011818004310124503,0.022069594424997195,8.785399899055471e-5,0.009426604494713086,0.03123110252557632,0.09734665085639432,0.027106450499927624,0.1222175229736136,0.02144526103152863,3.770777076379473e-5,0.026164429896182447,0.01784688837905493,1.2949416404177555e-12,0.00690373128236528,0.01788549254339976,0.007677461188601866,0.048203886673565045,0.07021042272094845,0.0565750669661029,0.012266364481502878,0.06775970525189658,0.047307441715832864,0.0652558339392887,0.0031160414408002556,0.1716105025767375,0.07360925657356986,0.11788483312352106,1.3084090623076831e-5,3.585142956371021e-5,0.0005147322868052626,0.027429873506512697,0.03168579596027778,0.00030307731244546773,0.010639144209977316,0.06901674065860271,0.0025832256172792206,0.02535510534493736,1.9462958972623622e-5,0.07732352442934338,0.009652001333051602,0.0009219398432619661,0.06476910705618921,0.13795913390668516,0.01635705118049559,0.000682084599776019,0.02737721366409479,0.019085410232206924,0.0922633141629885,0.05009164435963133,0.06679099240379717,0.002936951840694017,0.015014432130448396,0.0016262415587535426,0.0002602884637697719,0.000518755938081074,0.0242567108295728,0.014478104177331872,0.002353500315127283,0.00031082101832797783,0.0644176526488008,0.028799879025248647,0.15556084462902017,0.0011342348693792435,0.00648518654308799,0.005645039309142437,0.06881435849827056,4.6614093204256966e-5,0.05818761439278887,0.007223773472933561,2.0822452476637004e-9,0.020585325602104194,0.06542299980428938,0.006753355764101421,0.0008677308490740294,0.003625906650304774,0.061270767956660525,0.168973827453661,9.370756687396063e-5,0.028638169643506607,0.004298114047741696,2.1112960294149528e-7,0.08172439398873368,2.777379268666215e-5,0.07608798314517014,0.0479943168322069,0.059795629607820096,0.000791027058413839,0.000545492022527566,0.014916632014173621,0.07798923785351332,0.11623007112735068,0.016798540421072906,0.011906724736103646,0.06728956108920378,0.04757205214467252,0.00449391078905079,0.07259063434462767,0.00027101261474883436,0.06780707196161606,0.06413111374005204,0.04688810304150376,0.0001746478133451739,0.009075052578013405,0.07434334801142088,0.07060539424557279,2.480646642217566e-14,0.09967115392118951,0.02344607185464226,0.0751517689734343,0.000413175746877943,0.06946268175084845,0.039758387765124095,0.05363234375934333,7.030646023386901e-6,5.875024947867215e-5,0.05140999008827948,0.06519840167334436,0.06606552116067733,0.00017422785034277167,0.0564217108706468,0.0018897238128010585,0.0011414792708936406,0.025346778894875088,0.006206789991856039,0.11850617349079884,0.005589806305311702,0.15044548699122232,0.04351869039966535,0.011535763891957068,0.06431738498542124,0.07080942117703626,0.07975063991389943,0.002054115993442091,0.0353774587940086,0.009648648652060235,0.004438943150528807,0.033940002150611416,0.03446944651980581,0.10539067885451206,0.08139910364924936,0.062298743075978574,0.037420956489743806,0.07394929614870938,0.05699468529171835,0.044789313810195575,0.0004840227914536979,0.018480582032386634,0.07319546644560086,0.0020850758087752374,0.008264953786003002,0.0007431105470488726,0.06726892649637871,0.0008121899137021268,0.0009993900175805277,0.017116764419753273,7.13289993782005e-5,0.06914029772209433,0.11317697437776382,0.004336824507341953,0.06193634572958225,0.016466979781852215,0.06883184221528021,0.06305650619499223,0.0284512001431518,0.030547190605628657,0.0005671581468090485,0.007779488214765766,0.000156595545077049,0.062293421402301326,0.020828300760098884,0.07426999757965326,0.00019522129904514114,0.007224811242083196,0.007711191899717115,0.00013895537495653418,9.077983847006887e-5,0.050435367816882085,0.04296794750012075,4.676163455599888e-5,0.04572199060726882,0.07098426613132985,0.0461271365957073,0.052870959959602094,0.06263526505635686,0.05540167964797819,0.02995912459765639,0.08565116122826387,0.006542929113937747,0.04592093291051413,0.023444689012291457,0.05412742741787372,0.0020658496029215614,1.4871437552880023e-6,1.720541138755021e-5,0.06290232080218182,0.046879209249145425,0.07587543822646729,1.758609981611842e-5,0.028358232318699307,0.022900881186090634,3.137883328847465e-5,4.973583654411527e-6,0.06980097351131202,0.08704857880552554,0.06308556290626709,1.2478069950975454e-8,0.0001816561461551628,0.03249836800920165,0.00027942134531881214,0.05236320667287861,0.018151568595588755,6.849781740839556e-5,0.027676689184439402,2.9743882104665936e-5,0.020477451801716416,1.992292353140754e-6,0.047562346833894466,0.017880499242859955,6.956047094774196e-5,0.001029046099862935,0.09989731720528379,0.06842412081074095,0.00026464916344055454,0.009676513296972316,0.011430846986273127,0.004077293240607904,0.07551565336413371,0.04827461991811437,0.002526844707088117,0.0020215267137867242,0.013993807030676347,0.06464900512981663,0.05291451517801331,0.1773945165623675,6.732753876679433e-6,0.006371621051934112,0.07163787126618208,8.696363752358976e-6,0.012323978408755933,0.001886093401623479,0.1205459656229277,0.006070098251746929,0.001342878012477625,0.017848681446210463,1.4057729922541425e-6,0.06956285276084972,0.02631141096846291,0.04439515878594875,0.0035959717117657413,0.0012138348643626808,0.0008365313816396323,0.00031518564680464576,0.01611850399537335,0.016169641199770064,0.10276604755885292,0.0027857227384968965,0.00654640259975706,0.046513018811509106,0.0858314903373937,0.000621496702680474,0.002720462250972829,0.06707432749941397,1.9901925455982476e-5,0.034656681270438396,0.02171109711379536,0.0021055377859371636,0.01889594170425343,0.0488809804682973,0.060916237441361556,0.059818490149901773,0.0019074104656971165,0.09372518965344387,0.021081301602491165,0.0001388917786190658,0.009670463292389396,0.024184648967601405,0.08805297790727909,0.041519969069966044,0.06981972260774366,0.04776725406505275,0.04650517094531758,0.12168208449493029,0.015105341401374796,0.0004525792935704984,0.0663849641573403,0.04865074233715528,0.00012989702517926137,0.025473545336329277,0.01701419695004446,0.0007496591907872866,0.10902961041993066,0.04303868559535923,0.006073258238629727,4.453322191921151e-5,0.01502066809254132,1.869379515536283e-8,0.04764102426535072,0.04698232211838816,0.04669032609579335,0.10279836796828365,0.07955490486755479,0.005583821790781147,0.18412133493506333,0.003047726841130803,0.07871691451675822,0.09929050175430691,0.0010973182585328153,0.06165125028823115,0.06676909320659705,0.0006178449492955776,0.06777805969174981,0.08707738102945181,0.08119867470703682,0.005060740560272358,0.026354126015971896,0.01716870276716425,0.0669461274894769,0.07506627790461501,0.002506838887026453,0.013867401661587467,0.036681382355638996,9.218570544083004e-6,0.01656664580106,0.015948653143665427,0.001715365786082936,0.015101707445846631,0.05497269395543943,0.0003495927538816704,0.0657903198085571,0.04318063852484635,0.0728860891910953,0.04457285836085218,0.06322387621090289,0.0069793009026528465,5.471023595809691e-9,0.01686075368863642,2.5879961477008926e-9,0.010560701873824126,0.07899305924284655,0.028069563714401478,0.06167863547466116,4.479348401158884e-7,0.03968217803084554,0.04964828299100319,1.1418013074467282e-7,0.07756430880786287,0.05189254440532071,0.04946937043885463,0.02450077647305162,0.0018168673248920007,1.8840055655414602e-5,0.0021402744293662697,0.016782651324701924,0.034124314233063696,0.01389975662816579,0.01461570663800234,0.0013231718198781848,0.027939996519137592,0.021873212425468396,0.0012539968911188873,0.006586998538683601,0.01819508536066254,0.03755950408460303,6.524750967834153e-5,0.04140087377791485,0.0006761293098109832,0.004381450821101556,0.0017293542572455005,0.1605952459750243,0.080418969617545,0.06668720274306796,2.842045663359013e-5,0.004161893649612552,0.0982915978376915,0.07178407870087766,0.014433489234043494,1.0746412865821393e-7,0.024140238724726183,0.03350363197049611,0.04041148528484273,0.038606212169400675,0.04098127457004066,0.10197407070267231,0.06042629059421239,0.03369569368639958,0.033024462137748324,0.03497552601598022,0.005548082066598564,0.00345197467912679,0.05092682003225758,0.0009337930221523812,0.007993797614640277,0.061075512110368234,0.027338352802078702,0.00040536942591658264,0.0023800728118653323,0.0004167676822495773,0.02201365074406355,0.0002299837443556164,0.01724365501272259,0.0003790540408341364,0.0031617939436977952,0.040489096655054076,0.00014605246022783645,9.780699132217454e-5,0.11444031470211732,0.029098017049778407,0.029742135601038843,0.06698312174403032,5.052463815144599,0.012562585498139715,0.0445897232694753,0.06871071907321562,0.012610694898338768,0.0891755655121382,0.009081130569463646,0.0004627151854950874,0.05246270810247485,0.09104574618264978,0.038199664258745054,0.0011376474881144524,0.07384879584401179,0.00011680433425594363,0.011611372955719342,0.011271022848563083,0.087709059377067,0.03820013520047724,0.07082989948087311,0.00045213518990532605,0.004659571062591676,0.31244972202070587,0.02266542224858839,4.570084015204372e-7,0.04366751054836293,0.030997053525238672,0.0003541593915160413,0.04397542829666607,0.012557322045462888,0.004089817534252931,0.07017392036950584,0.026040254411575803,2.7459276701060414e-6,0.05406290494222776,0.20306408742447168,0.10088879713392393,0.0006846427180230186,0.06625480368614839,0.01013356825755432,0.1634239067770747,0.04058394072946726,2.003887161551407e-6,0.043952119885403526,0.06805422526883949,0.01471967063030442,0.1071834763829045,0.03934408600273112,0.00017867798238634732,0.07300597259728583,0.008827150884714452,0.03562253753245974,0.06140075738522755,0.0388782428811442,0.022601798252839686,4.593594431611663e-5,0.048547638100589,0.007725326804392653,0.049363184924502125,0.10206390374999356,0.0025459888341764826,3.0842019071149005e-5,0.035243196262716006,0.08353311297874481,0.02114361957664613,0.03679542980218952,0.061812638527293344,0.01722261449594244,8.450020367244917e-5,0.049904508974555804,0.008138710796442947,0.031880139406935855,4.0465172765406574e-5,0.01912743300194698,0.003222301167909741,0.17049258803974424,0.03327531051271216,0.04338831904604544,0.0012734192951196809,0.02463138902868182,0.01218815956333659,0.11393524075204672,2.223715111201549e-5,0.154140708123309,0.0014214747524257231,0.001311442814473992,0.04289607625832347,0.04016734428829238,0.019746779464716434,0.011209024170800483,0.02406653901714494,0.0026519773488883395,0.06597704211132924,0.11367574001967094,0.00036389156859308774,0.10094171932294935,0.07807791024531031,0.012829665649239494,0.1580835623256125,0.019243880116231255,0.002341465833713773,0.05505174427742963,6.34675649149421e-5,0.008565988345489217,0.012124958669199232,0.0054820995273032885,0.07662772755457463,0.00815577104995177,0.10378110908371993,0.13256391372947196,0.0040722176217740675,0.002192970421274735,0.008805334519953195,0.05616601967735214,0.0003176952438930278,0.0672781752279263,0.04081879011370789,0.062144636275283105,0.1068999720702287,0.01328788112813529,0.0006666774645141513,0.06017042863677935,7.02595068244717e-11,0.07983666727370849,0.08568474097519008,0.07752007148458263,0.06829287599986256,0.0163068817956827,0.06983445540973572,0.07021760901200903,0.06969063594213644,0.10300684827724038,0.007080587843910004,0.09571775273507285,0.04795490166816791,0.1093276362563339,0.10680459045537534,0.00407534734818129,0.06648066428103949,0.051431905393347556,7.040257386776278e-8,0.06807845959425933,0.06509416051869396,0.008766512992068423,0.0003580790954920739,0.008892649797863028,0.012731518310430047,0.08705110603686955,1.3404925999175753e-21,0.05643666985208984,0.04200603197845201,0.03627122959260568,0.006812621666960897,0.37420439180744736,0.04442786756287432,0.013626025096167069,0.15571907123209058,0.0008056957157857792,0.012153679390021961,0.039415856916240694,0.024679429591788808,0.05611060705540921,0.05773224866569734,0.03614871515380985,9.047643309414765e-5,0.11998239357289062,0.004760295717729539,0.010863461459835891,0.447640179386184,0.009961688173382836,1.0435241524143637e-7,0.06798307842945064,0.10384044231154047,0.08458886455868832,0.001288497115275852,3.06354316667967e-5,0.05919989466007028,0.026013715454044385,0.017243646860299344,0.03494159731626638,0.04952049628406555,0.02223319771848435,0.0003856586759428406,2.1820701477548396e-5,0.0024206154009196253,0.0025104160955464975,0.0011083027375439042,0.00023809510748852187,0.005475481487402499,0.048388393961008705,0.11136717916691997,5.781592857644321e-6,7.69393978114391e-7,0.026963006529846578,0.31115362415154846,0.027602994641000914,0.07861435146035005,0.020874425493187864,0.0013127980788290158,0.017484233123363366,0.011340395642394831,0.015347692978617022,0.09899725235566327,0.08758142326068707,0.03061704180214396,0.025182400644557706,0.002254810079214465,0.052368894521703846,0.0004189972109493131,0.034892249412410176,0.06676958818410621,0.15570604991810408,0.00046160350812770093,0.004725934552500556,0.06652852809746557,0.06343169785086021,0.01393640140517813,0.006984357429072301,0.0667039141486481,0.06094223327191312,0.028104471785864473,0.05991088171439424,0.08016271243339339,0.005733363295809737,0.07050594733270184,0.00482177633961914,0.06631158748724619,0.005626843110111232,0.07296374828167528,0.05942731472207517,0.010684699015664018,0.00018939912428582957,0.021800031195502244,0.07739476396933229,0.06967249552231596,0.0003563202148670464,0.06013889124959547,0.06534076784604487,0.05092325954858946,0.035294234121511066,0.0002942668667138158,0.007784641163445968,0.06983963533841203,0.07055776700474256,0.00911467512657915,1.8584830609840986e-6,7.857152541226413e-5,0.1084354172101292,0.002565336316297579,0.06821855697618164,0.07352857163725487,0.07485674473113549,0.01758717289508424,3.5367258642160026e-5,0.04874975994360721,0.06456220502576748,0.007014037106406492,0.0005070562631452506,0.0023349679013436493,0.13220666837142628,8.460398979536229e-7,0.02646399207002292,0.07441947692280144,0.010807780869972009,0.043241281681628684,0.05650976617030526,0.012378126759150995,0.014540932421105218,0.020704398233526662,0.03477394568736784,0.007407883436460673,0.06282285694791671,0.09384725286462843,0.0011495094192035655,0.050934442813239895,0.0003231508381279629,0.044957956027305845,4.809248609872895e-6,0.006604144330534645,0.08600005211884838,0.033512104021084024,0.0032033238040275656,0.07464396924941946,0.013048742090188904,0.009642125602903572,0.057840954220743666,0.0007968443219240002,0.001551470255150058,0.0618805292251449,0.05235227249816034,0.0265477286633891,0.033769271278034134,0.0492490983587585,0.02295309761216214,0.01809549908164106,0.005060573921132292,4.425318829048437e-9,0.000524692800151482,0.0536925324715443,0.00016013490803204372,0.06317272769436898,0.07102781403774384,0.03270452626880577,0.07765848521515428,0.013772044824045131,0.04295047550472373,0.05715904076785717,6.967468619353272e-5,0.12256435271857861,0.013589247682044224,1.1865141185212107e-5,0.06283301142598673,0.0388584952864044,0.01815520799111126,0.19459255927432298,3.1560211641190423e-7,0.0010049244114691783,0.040040551134947866,0.06452819339340517,0.05015413748488727,0.0006492701053730858,0.074563969357895,6.355637163720434e-5,0.009257828825332257,0.06060141136362554,0.05585362405502758,0.08284227097460944,6.509551361906258e-7,0.007804655354845959,0.04200588909401593,3.374319015289009e-5,0.0047105269341688625,0.02316316145363812,0.00317982687681334,0.06299428360610737,0.059449227737848685,0.009971029849559195,0.006538653904790121,0.0011272143684636954,0.03297470219138244,0.004149396193913737,0.06978775667203789,0.004128413740005476,0.050092474827559054,0.08590965281273424,0.08769810602000644,0.03839500007610983,0.005030795925618034,0.019551417284765595,0.06141714725891101,0.02581134487503648,0.11736773432537999,0.0723067637236969,0.02286876563941056,0.019192195030449066,0.05614645326221338,0.003204065732210256,0.08650394535174706,0.05588717268660953,0.10628351180585352,0.04402746634097542,0.002025502689224968,0.0008346094375244872,1.4360402053324333e-5,3.206001510072531e-5,0.01898893789241046,0.049375285328915275,1.5256197440454232e-9,0.09488037819804286,0.060345010781148914,0.07716246119350921,0.005916289638158895,0.21855160643051835,0.005636404603898026,0.08066186987978827,0.01487953586556113,0.09322487282364107,0.0020155743083546973,0.07422699888238489,0.07048587214803305,0.017915587108757406,0.006860465405581901,0.07673401101294747,6.023240497012507e-8,0.07329498237669729,0.000726600144559882,0.06607112556258186,0.06993578665842558,0.11369782740124373,0.09312568005708091,0.00023420053948773205,0.048367451491904564,0.06488574137704972,0.027969817964786384,0.017214715569853246,0.06459306399779295,0.05426611680828543,0.019515892114823664,0.06999488476901719,0.02713842082825928,0.0447134553970039,0.005080618283762583,0.015490423191230417,9.148778992484652e-5,0.00016358959212516914,4.9470929418475405e-6,0.050572481162805,0.004520158934430898,0.05761305019783167,0.0013312302978290792,0.042016512507091965,0.06318706687377952,0.005125013043340218,0.0043318718068262865,0.01055245109088926,0.022085474624350485,0.08095706511373213,3.2992858052133454e-5,0.0633185188007953,0.05652298935061269,0.00013687782492345367,0.0063362589583258475,0.05004551439840212,0.0038868588421629084,0.08950258956415721,0.09423522935221877,0.0008995636603608856,0.05519828937541868,0.06481800777140048,0.017479758775173396,0.010950006830479765,0.0010780178313369204,0.08856477864742204,2.1552264007036385e-6,0.0316952023297161,0.0015971568979300992,0.08540914007111085,0.012334574155985984,0.1907666897607155,0.04353261990516135,0.0006817191063850021,0.06927150096061246,0.002153707173686426,0.0016799162233447618,0.00036142556071961474,0.0008371891289311239,0.04719978559627498,0.03322505124819688,0.02573303751678041,0.0018573459673436594,0.00567283092425275,0.0013803315919298305,0.0006814157396108569,0.007496109492590954,0.01454773935741423,0.054877955677558106,0.07569877275542751,0.0024678672636524413,3.2939340478840066e-7,0.11246905158260947,0.20537859031748676,9.391305669929819e-7,0.012281188280128228,0.08325361142373448,0.006033900993319023,0.11260540889850436,0.0735487832599653,0.37035160670703976,0.0886507972186706,0.2029782492841882,0.001484436377071127,0.017296612923489274,0.10603554307001967,0.10458730301289294,0.0018638157093557501,0.0921641819105374,0.07616246720836435,0.002303453963253275,0.1343242221099199,0.029368582984295854,0.06467724780714094,0.0042010738562035235,0.017224185517758055,2.728360076521885e-5,0.06281654278270406,0.07092896609185272,0.06051349858028429,0.08760950747895332,0.1483985971859278,5.790213663396934e-8,0.045446340107415044,0.02046709300351519,0.08218677046577913,0.02350181520506083,0.042812661955263676,9.40630809422876e-9,1.0729688600961338e-6,0.0604747755034026,0.012668183680430036,0.05785972842366032,0.0005824967145498701,0.004916758062637197,0.012819583773234779,0.06705819268468116,0.00010007578117159913,0.0033126711761376553,7.973571409755373e-5,0.09508589541126868,0.0031907552727906464,0.07295414055629502,0.033286291155961656,0.010564940616204905,6.936539428064947e-5,0.0049561987226106816,0.007606070164927274,0.08323944562734237,0.016648806220008628,0.05447603800560871,0.0014199416681389201,0.1433425380081961,0.041870000798343625,0.0613492773958326,0.04579770266661998,0.04995760254907593,0.06617337281421944,0.01607140670997685,0.00037233982864714825,0.18143540903137886,0.02672327521649062,0.004116670071974164,0.007916500390143225,3.4916294215662056e-5,0.10654414872264732,0.045163800279950685,0.0371549711163945,0.00010997249796767065,0.026184524335402942,2.2889819826135134e-5,0.06586951680706438,0.0013033571658787168,0.001779691282709774,0.008588220013754902,0.004402548663760214,0.016182452543589163,0.03541279262539062,0.033489740890580606,0.005478027684204101,0.00801195150573976,0.07166540942771465,0.04965649741374346,0.04501799244917613,0.0056891967982392105,0.020227924064584936,0.0003625511887764734,0.03550670490670573,0.0008377489134064088,2.153373099434591e-5,0.06669837740931811,0.10461531308148132,0.029865653798191498,0.0019022416516280745,0.0006395408162629539,0.13228262203142577,0.0003173858615747341,0.07740681447589001,0.00308420587146538,9.652921835694539e-8,0.11002436535311913,0.04014104451067782,0.10847730439720231,0.008654850629157017,0.08620121453372337,7.997549314130675e-5,0.06797375829370819,0.03660708569119227,0.07301917071937322,0.07123938790739474,0.004017848033909447,0.023191616390816565,0.17510733854782226,0.017676115067512443,0.0017260381475115289,0.0011153795719925626,3.822148237507714e-5,3.2733173353493142e-6,0.11604260801392795,0.051933680491762634,0.00018318334045578825,0.04266330042327309,0.0399866188609964,0.002058584263824537,0.00023456244919714,0.051347703953220025,0.0660318129242207,0.08083946449238763,0.06381853270560592,0.00215371251322571,0.00728945960695772,3.773329916624334e-10,0.006864766429924113,0.08397414069274914,0.011200556203559808,0.06065032357516557,0.008319777022176827,0.05645124522558019,0.0684374673542826,0.07481253204855116,0.0006246744294364122,0.022251460058044854,0.06229158269228418,0.08876858614379173,0.02641279207525116,0.011875252728599682,4.263744966267034e-5,0.001373761310761888,1.540093655288928e-8,0.06894882821552735,0.0008066056266530882,0.08499719503205744,0.06637400406319058,0.00048712792445622464,0.004730065173128074,0.06494347302918908,0.020548296788298052,0.0001487158516546439,0.18855941675017704,0.003387874620119988,1.83210677040642e-14,0.0064111745714714365,0.06719780137255421,0.00518877990059482,0.0754917548933366,0.026714748123763028,0.11521326509684397,0.019226972308627053,0.007983885497303077,0.008273378533731699,0.15356542712981128,0.01427386754079836,0.03414316338323523,0.0012351587264795396,0.076490682390317,0.008771364719129721,0.00018445552503159872,0.08876449314217687,0.04644550769162101,0.027971308714425363,0.006625337244751771,0.001086545711963061,0.038238612905638195,0.01341542391730817,0.016791841278430867,0.0018493407562076947,0.006617121483528019,0.00018312022299951303,0.01741587132348636,0.0034950490904316935,0.0008870514823603504,0.05127736535309433,0.08223003595888477,0.03277755183072288,0.23640324521669862,2.293240675588575e-8,0.013412101144030209,0.04683501322479377,0.18938925318584082,0.033619955407785694,0.004198528660935898,0.0002376862755633619,9.125768048330434e-6,0.0941377999545851,0.024399360262252378,0.06406321320254271,7.441064474737289e-6,0.0810380020422751,0.09997132663055558,0.05244138781575165,0.06939894839616502,0.06290732237734957,0.06524711663672804,0.1118228284992171,0.02732862189786322,0.07216373116383878,0.00026033548143610403,0.07734243560691095,0.06513359046451456,0.007527708995652006,0.011353574978886756,0.08969402490011934,0.00024870665524038665,0.00513949801689634,0.004527377619009913,0.11312187672796914,0.08644855017701648,0.009789395343925493,0.12817767932703797,0.009789856448490253,0.016191955466405835,0.021862464595894693,0.07457486424933298,0.01998533152708816,0.06146412307757041,0.010228735737491942,0.011462165191518037,0.01332045864333493,0.06458400170692925,3.79336402645639e-9,0.012295025008368954,0.04854382630584732,0.040081707095995005,0.06030709828420006,0.019429550995909033,0.0014747867761081698,0.07765722178085221,0.0013514457932512392,0.03700319960547347,0.08930712213056383,0.06604920217199975,1.3552510960636462e-11,0.007383341209644832,0.05747922602338954,0.0011288081956307735,0.006360760584502003,3.5747985003132006e-5,0.0052036512161856615,0.015386840549225374,0.018709546219841,0.018432872146179842,0.016011626716960603,0.01656961624979513,0.08950937630112939,0.07573900044500714,0.02579181202963864,0.020994363584426405],"k":[16.33073140378071,0.10318072569717174,3.55591803880539,14.71200480472509,15.427771291860935,1.0607323766725818,8.814857916228389,2.0362187544284494,0.95414807846252,10.114347289269086,15.820838976541488,15.008803278850692,9.604294587469644,4.986332860082481,7.429011681149218,19.631797621634917,17.066485567910966,0.4377094275244353,0.43732542833928356,11.165632598012273,16.679117637945797,1.5898253825713748,11.081101732736617,12.56670366517492,7.359788388547859,14.140938644838904,15.605268328655635,3.892422235402324,11.351751456375245,0.8719899147150345,17.38781302276797,15.273768795702654,19.07825593597073,6.086442014924529,11.797193067048116,17.554063254560507,1.0349835154750675,5.219614984721179,12.079860232588562,13.630356789842892,6.151525903704389,14.60648991080098,16.183161324959276,15.542385263860957,18.41426782419068,15.368085045328733,13.311893933120249,11.7376579912445,9.266653627988596,1.408938809101441,5.688230758976687,1.7023397266732276,13.94628043705235,7.821081836657786,6.838107818382113,0.5132454335805958,10.397438099072946,5.358951004078429,13.375637182919323,1.7001906727031013,16.241110001450167,3.7342615178809524,8.892005793105952,5.42938625377706,1.5170693401827773,11.295160399889696,10.528409512432901,17.41239814548203,5.352552674367885,11.9267160309839,18.419102514835437,13.504829733046368,9.40070731665811,2.9389848486754744,16.59714463353871,11.509988151213735,13.574417659420561,15.894767421841385,2.3534583629440897,12.716684523721899,10.796032145236648,7.390465607237919,15.30464126237209,4.895205946737691,5.1072667884390865,10.873168465557846,19.96359815074905,12.387475963282615,7.04171216330248,8.095598449630788,2.295103443499986,14.861517778834706,12.39662606173145,3.89016423336332,0.08430037236986987,0.8064649439276028,0.7022297722323367,17.477909486600648,3.8981701289228976,13.961425933750622,0.9683194289714647,8.158062915315462,16.645578644452574,18.500081704609165,7.716861400423696,11.667237465099532,13.030147366052361,3.901037233728002,17.44608549053282,0.7551237004702083,19.609886584420074,19.088830820874474,3.0061845300929546,11.855883222152364,16.98179074411394,13.312921647246432,12.491131924093569,6.503656879828981,18.23527848573181,11.126796839670714,13.811028415017832,17.56532398351429,17.83883187212013,19.66598646327375,19.19471787710686,12.391370087728868,3.197977525606115,8.768035894235116,6.113005474154667,9.866500748171202,5.314412167810354,3.4633421091561356,4.310110408479444,18.4590955377558,18.746659571860892,12.14541029873621,15.971749128102593,6.817887377059737,11.643400437732932,16.22783233815309,15.389720333491578,1.332567207444355,5.444001999202701,18.131305640197326,11.244589389673205,15.515030229468273,7.105883267940714,19.144611379499406,3.6084925672007406,8.198113025713027,5.003753193257361,12.441026555875112,19.25797057878456,2.5938239765706195,13.612987878625415,11.010413690253117,3.3511255594761202,16.952947100033242,8.528925030566331,17.338165369360446,6.357388532589274,0.68502042773678,18.137195692187152,3.0769093484595356,7.239849672373206,19.830148816675383,8.592199409285017,2.115104452397154,15.726777065146731,13.114818694782816,18.1444782137877,15.385844961041633,13.745821673063832,7.085684703208193,9.747130879109381,17.485858797091453,18.151843830494894,11.295856341595982,11.717515425129879,3.5213194120012403,17.314676888611963,5.986520976612475,8.236731827841597,1.747423240947672,2.969149068949939,5.484129610733617,5.170435699552103,9.784088545628805,9.512922943355182,13.48011694151674,12.12147244626085,13.614452831758591,4.985999929228089,14.92993738352256,8.159521345795815,13.56088296500329,16.807860422907417,3.3285448700664366,11.862057550062396,6.307347906346217,2.094674099662308,18.43454720196688,16.912312234282222,18.602340517065677,13.693255430889701,15.12483143163999,4.411976647975342,18.239256413150848,18.401115823875,13.399213495016848,9.780079264037159,13.923647126084653,4.142482771885234,15.510492770063369,1.0046690844462836,10.99085486917323,10.5186021832704,16.976322209779788,14.270526630800004,12.91221274385762,14.29563795400194,8.80312610408511,16.104903087877997,1.7494930568088707,13.522125519350524,16.16841111734165,14.476861074716872,4.1830583238624675,18.618342762009284,8.215037376984181,3.5621100844980758,8.670692248450532,8.38389195732589,13.449200736025148,14.622725562900353,0.3505814272576746,0.788959747661897,3.9000397576436363,16.165855597491507,12.199785051929627,8.621793065908028,11.52314251734445,11.144041279866958,0.178111060205417,3.3790318706156075,12.682377661341269,11.093597286159348,17.757598649589887,9.911086084885387,18.481667204976382,3.2418072149675448,16.950005108674073,14.397987821348313,0.6954718840234397,3.7056084980861304,5.0902165913503605,13.167531667678599,15.890268850127987,19.560108783704813,3.1392958303248264,10.454842088715374,6.4033356023173615,9.800269768260051,5.0953503338906,4.503493241299217,19.560889205644337,17.6927408965059,15.089784536304126,3.530584833184669,19.920354717301578,11.249832529772315,18.341145926105106,4.814142922523774,3.047856619733529,18.36512781603538,4.206848589066374,10.594359491698192,14.887166065802369,2.498534783773909,9.42985648032208,9.931860835521618,6.567226218117068,13.035041079230947,13.29762643608019,8.0929602334662,9.574320710935083,4.0410150070601025,19.134881770193537,8.097080632608016,8.33149347935597,9.65776930164743,1.864901293143122,5.258284805182041,12.751107798580158,17.909551983380616,9.695537655748034,2.693496582504875,11.081659999745312,18.641042821421276,16.75317571720642,1.0908385511712604,1.0546519543154798,15.35786004702218,11.862578786619569,10.16572976850021,9.952464505815296,5.968458619919432,0.31846275030567917,6.231840209555641,11.95657126609785,8.326487944573774,14.833420972181157,9.523789434604293,4.275637093991946,8.375469650897749,9.86190178601975,16.76703496340472,2.111081254930416,7.675639952326354,11.677622001451313,15.38585317621239,1.4095915356579258,13.373292139655506,4.13690642338278,9.229126171860415,1.2224730642345971,6.6877349692884325,4.37910471693669,1.3814298854922002,6.249812613761612,14.685241234301106,17.79712110791047,17.064688258584052,9.665985302930395,11.831565217723586,0.2968098243608397,13.178695965461,18.834267673207705,12.181194289279546,5.235046447552927,13.35989972522679,16.353290033770087,2.6374823514430856,6.043275720383705,10.582309718916383,9.068433558934093,15.113338616225352,3.7506669162435724,7.496252750802417,0.0886133426533453,12.246045625416704,17.59251521394729,9.160016967120303,6.147946593510389,10.397172047152967,2.4299999203599443,5.188905034167011,18.217933641239163,18.89407453296451,3.246627772858659,10.007540973864453,4.3609489314384176,18.268104740269997,1.4232163121615216,9.518760541515775,18.57466371493647,17.693372809844536,12.094849526309496,16.88064866082559,2.8258031190527433,17.988030688478403,5.4381568975252925,0.5030933644608249,19.04808462739039,17.11366323505109,3.3676041609463425,17.890537043815442,17.091262932410363,6.059423730792517,2.402003719574317,11.568232529314306,15.600425740804127,12.338980249602578,5.6912832643357625,19.22320774011055,18.693917232528264,4.293069924690349,5.431108174420358,7.360777495678841,17.315958349509284,9.911663061670284,2.6986276361879646,6.522320208101839,15.566015976323367,14.975721258753456,3.6190893319543616,15.606889624080914,19.13047357947097,8.006586398734207,12.196344299397577,4.020597439734148,15.199388518450117,18.1369988036366,4.618102595884941,18.05821549969117,17.04974419433733,15.453080610073897,11.301237528935815,19.214514745048994,12.65134158651314,3.474806499599752,7.866013803866307,4.0693009902212784,9.963921423305777,18.374686232384278,14.599663523636828,8.826966595378977,3.081089248583928,16.777868121684442,0.2757013776557704,6.412845661637445,6.274753547169563,18.598578494717867,18.643370366524074,9.182856736239945,18.98110948792068,1.7206620165555053,7.563690607720415,8.45337341466919,2.192356003493665,11.159793232657286,12.560402361121987,14.15471920829428,12.06165608742992,16.054697721355783,7.646937752526797,3.6095131911113887,11.42604021777073,1.1149329942352804,7.392340705479041,7.505210511875511,13.717559308654375,3.384598193795325,3.9020427897087684,9.315430808050342,11.603072851666646,19.2698848085149,7.01078781470156,18.128441398136566,11.991305218922266,5.271219518369605,18.925343037598637,12.768130293037888,15.142475896135155,12.669645803257442,14.303243331632345,19.827033294210658,2.3376044018069386,16.195358266856545,11.949062202414545,17.793233545004888,16.925320654183476,10.146033135779216,11.790329917934152,15.198272751396185,4.1353965028290895,4.9947677176380445,19.165899592853442,18.73515875559614,5.793221679285616,2.20243439253466,11.206771846992467,2.515236858743206,5.054835615276212,10.834479532751399,9.355738238280278,10.512643860295947,9.44895734755621,6.555028686135582,11.730959130358114,18.671991481244472,1.8748461642707603,11.633895037166049,1.796628386716712,13.574023507067533,5.931145453954345,5.800280224171037,1.1637197276037892,2.7884009745527205,16.658234867150913,2.8417499659254197,19.079293399883692,0.44500900367699714,13.833589315793109,5.9993008553182126,11.486983636713752,0.23519858339755118,8.066390211200991,17.465795072642333,19.391249718045188,7.207730224992286,9.981448083689429,12.662247834478473,0.14198091691446812,16.066457707584213,10.749149470585646,14.248431232257479,4.825724835675773,0.6417074111792331,6.985693788759604,18.18998627276422,7.724141140774523,1.3684575584429792,17.68080347054503,11.521495037812999,8.079575618783949,4.918355292168446,12.562434482036098,19.516649894841397,13.101129097903627,18.29167353197121,3.7997091772952762,2.650754590821305,4.1735013815678945,6.364192550463388,16.156063123551853,5.65904805054922,13.229016630742434,13.164552764086643,7.66396293387162,19.290975819685805,12.810184861441538,6.006062744261214,5.352322636354052,17.195125299986806,7.719462922249827,19.73510462483384,18.09819624525194,0.667668546814979,5.0888189602132705,6.1873935333539976,15.196904591760237,19.30275187850785,7.868015787842748,11.143411645658405,15.088672073771999,8.805492685727954,0.420898939723644,16.599260761989953,6.2654026222841575,12.85150796767363,19.767213413146028,16.980609466369977,19.773678857186304,8.834118227326663,18.675074930102497,5.498695848733397,4.460626729867818,17.94646900323462,6.533176857877163,5.263834533292142,9.244328970222195,18.252683449256825,2.295434280367785,19.698699616607872,13.18708341881836,2.3838377957528056,5.0602015904779485,10.858792158159272,9.973074399172468,16.527447714883895,9.347961861667976,5.248210459023701,8.734987974219575,6.76276485568537,15.853679321976468,1.2061397667767526,16.68562896883281,9.03951908861691,2.1542837159155015,8.991108706395604,14.954091835415966,19.216044078007073,14.018979424515901,18.56614574870062,7.638270804234462,6.386645229567733,8.518196198600885,14.588777036210235,17.69399719364996,7.9958419165207095,9.239512482639626,5.132519775212208,7.659324073203977,12.30451679076725,3.859239509832202,17.463708659288976,16.77836375264329,13.552675418560952,5.839596163124829,7.833807842431848,0.8825222295652102,14.317279775981913,11.981601054837917,14.688472684651671,16.0055016376903,19.822528422389773,4.027720562648391,16.72348725766391,5.349362290108157,14.422121822772546,9.412521535686258,17.189257296215892,18.377013292077816,9.528360209900924,6.315696718114698,15.03912375639461,4.08696082713905,15.387939839040431,9.96159301372117,6.835656200756799,7.181134329075243,15.368983333695677,9.167290688311152,13.592864480808498,9.153227706005115,5.240915665856072,17.84636827528552,18.534024515822253,4.394440877957861,0.07922125801087088,5.06607508331701,13.806140674272424,7.713724541386315,5.251662918340867,14.742226483238774,15.873780859488944,19.66489946788065,12.565082753802233,2.9741046817938654,17.483684792106914,11.478507515258034,3.0086200723445033,15.877995405272461,12.590740471002206,1.6092412220877117,16.157760097381978,7.961920466387777,9.776994759362761,9.773325981499315,17.958010995021493,19.457628644969603,14.719634119798632,11.807813802090346,12.01745110579505,14.671833293526845,9.315143954440707,4.000164501500594,12.225373506556991,5.428969963540853,6.2239864825915525,11.511583264280091,13.12140917077711,9.13087878058299,12.597818198773613,18.82963263133967,6.334200245350323,6.308160975517816,19.924924693710565,9.595040770585822,1.3868213723638068,8.844227804111853,19.4103174855071,3.7929204761277946,17.782297545992908,8.396852916943018,19.2803475728389,8.448647997930415,19.834290397633154,7.300598499364899,17.18550960438964,11.683504872586514,13.107086421719757,2.804480686632087,5.468678563484577,10.162412576938573,4.203022861175625,12.336948294024634,1.9352723092901947,16.309712995284645,2.3793227726577504,16.07501581810555,10.312305582505292,18.072163307921866,17.944405532966886,12.907467744832747,18.986737670433257,12.363081430927792,9.012362843769623,10.91161141400827,15.76220365383124,8.860655715308203,7.626042067083714,12.436879367961446,19.817685631987203,13.065448342537621,13.512061494856935,14.507623941805337,16.04614937966092,0.40949305660000324,0.5190925142836011,15.321595949692197,19.024800846828285,3.255001465681704,13.97482295236754,12.16347772246042,9.489283439793542,3.518713954995838,7.5057278551432205,7.7748966881541515,6.435260489367272,5.74284568147966,9.19410689821782,18.34704803364489,4.9856487050723475,0.04102739768477193,10.88154624055942,2.058753435186187,18.8428988933093,12.197587512272134,1.821985745855832,0.028147956358894888,7.09151321219557,16.530209819647826,16.72719000571339,18.282834916882116,16.27916726353062,17.92375767505353,6.304485025603244,10.477209985512722,10.310086882280242,15.189694175977184,9.98497758712498,16.128906266430924,9.897268937238435,10.810898427261563,9.260795676043854,7.846665536496369,2.944437180232038,17.88054963098633,11.74369252581899,3.672823675957533,0.7002547150524219,8.806028978450055,15.157950308266512,6.9781509438100775,17.752406668695958,6.431304430942046,17.949390983314792,17.980500084031195,3.675414347199024,17.195849384013346,18.19156705069721,7.851575292184783,7.521249394323699,14.84900432589814,17.896115347306875,11.281616900899753,1.85899614732425,12.765149207246797,14.864690418755515,13.923518183456336,6.783641626319161,14.96095506483346,6.558281364679086,1.4093401601966393,7.336055645110302,16.53027019844008,14.937913388373186,17.219220569301903,9.231297257344938,17.023620536596393,4.450480972868371,17.781714415735273,18.064926379199804,9.071734400689548,7.605297277566057,6.41385561417855,7.828031888232925,13.154306034246495,2.2389927461791093,6.067825935290783,2.2031191247873805,3.376800031760645,0.825625889591306,11.335170219192028,2.8602123789605294,17.342688320221605,15.206646498150057,19.761607299682005,8.278181142392466,2.655022068393036,7.196419417040754,4.091372084957228,9.80298716266477,15.298355426618127,5.911734671076081,11.979595941947077,15.92819741430918,15.79134768823696,5.559195205822549,12.36693262913076,11.965454250690959,13.76785259349636,13.851485215763283,10.27550419323935,3.261419384377815,4.619269488823532,19.974640497061937,10.734208434755121,4.492128488792222,8.550818568776254,5.043396558219344,10.680124051898275,10.900882950495966,2.7654416904578794,16.808497395541607,15.191100437117381,4.396669371549939,13.329705346582967,1.9101370652046912,9.73197746998654,18.277901703125316,0.5822218761686848,5.030503764327396,15.925101269066001,5.067038277927973,7.099616561668438,7.37532877966395,14.37102621598298,7.180309322607821,15.754185328750152,6.166429510720901,16.395231144737664,14.043998333674343,8.831951892236734,16.13911827306842,9.050324626010289,10.636807368622465,16.027052976378386,9.14288074898662,17.19685275123819,3.538714497069,0.15699610841108935,8.514296734796973,4.49443672803032,5.191524439243169,19.548026095445667,1.6386167256058837,9.893460211939962,5.111834919747298,9.43205227847979,7.070761167098403,1.2174953994401427,3.4653858012199024,7.200169016483189,3.5780544149150906,15.304688034139676,16.162750565989565,2.348319096554903,15.504655563212882,1.2482136879649808,4.646654947873423,13.119529114771016,13.836723540211352,12.52217932841722,8.008623257253479,9.515321105657772,6.801202105376598,0.5782280983292809,10.198075328859296,0.7128748076093583,18.3632491160554,16.663777814193644,11.039289358864464,8.137705434736944,2.906978018870139,0.050096681928430975,15.274795837890247,10.312151609973439,19.595082593396107,1.9049032766970164,14.092545254981141,4.335582670818656,1.7010133748468004,11.955474589360424,1.1668611460577782,0.8411874601911329,7.428840146578564,0.2888473185120555,11.071623557416427,12.838694576830747,13.559803276464116,19.357660123734984,10.966017949688403,18.43747874975263,6.921584380605332,4.719127767997184,2.8961084097388134,13.742654222855002,6.7904954856220145,8.518162834079277,14.700803702460771,5.006541475424502,4.031180917412436,13.970774171371104,6.247414808741829,10.166537768810077,10.439451259976034,4.260421055175039,18.24238583199026,3.698131576081267,18.285606481876087,15.12905345275608,14.60791339205092,8.800150835645763,4.742092649424463,16.738732237646282,2.681186222013925,16.023073812754962,12.571647605097018,3.9135507450897444,11.407206406432056,1.9020132733597395,8.718754602824447,16.17396705820639,7.936957352376006,3.021758602257747,1.360101275400285,5.965002861708681,14.644865284264789,1.3739247901133833,0.05888536522054899,12.138553805393384,18.676803419626452,7.42451672563158,11.355369794754836,10.81343580383904,5.896680324727521,7.425653079334951,18.13675289200649,7.748582566688671,13.851913983671693,11.53498378415378,12.83274472464209,1.9195600537035595,10.119150253336816,5.750415323768565,16.506287910035265,2.9298418235859325,2.9206296789983144,3.0492812513995338,7.540182693369761,3.0950198080207914,4.603695922404234,19.010775276051795,10.68524995915431,8.138063703484404,5.588972264571166,15.46550495109567,9.9059882600117,15.965786875830826,11.569336131066494,8.419256476880692,18.950248373831826,4.7710549529506885,6.7768191753343165,7.615955804329335,19.834274359805764,5.239895992311698,8.947767208318428,10.122809765677335,13.162571486103584,15.421496020899,12.206784747526864,5.996558974266786,19.00899084199272,1.0444158643179113,2.759347569979327,17.90261541032146,16.1176441669912,14.793128801248097,8.961689467746577,11.031758767592219,2.9014205557993167,3.9972838234875985,8.003344934533715,9.055229855345281,18.31009642131818,1.5816690979574277,17.51213240938361,16.81675740728263,6.867801903168433,10.65053951978538,19.352062469225398,1.7214270820477973,3.2034437378856984,14.16559235916042,3.6671394714312644,0.09565657205330425,6.337275068601649,0.14206152688583273,0.49183606011895087,19.680092977576727,0.9266332341673422,7.327104432700926,1.0056677519121138,8.354729933378593,10.128859798238583,18.416261788012118,3.681321215751381,16.976755440920357,3.657267621159135,15.230446430602601,6.18568309521097,10.29083671491938,9.974910192965819,2.7075383398931985,16.58773098608976,7.785930287743259,9.37801905991197,5.346399085228879,17.714283622513513,3.7870043367170547,15.789193446296572,6.0042281259994335,10.390093289114922,2.139875320379616,17.28567651151254,11.934043019871027,10.443473744522072,12.110816447633518,11.293390686146424,5.884413148967487,16.069052425529318,19.570471820890212,19.41579949667247,15.451982901622525,6.2419682340219795,4.502242987590517,11.010047181769455,10.336559846531351,9.819156994149196,0.31358407529161525,8.307671251768083,12.365203037110216,11.725192934936185,18.62742787032035,15.068160350399014,16.127841248419013,0.224161019117175,11.628993074382938,9.657889070622328,7.341552877425719,13.54754888292495,3.9414492512811927,5.49424668159562,18.9022955125309,10.58451982476274,5.412729300554804,14.598208192469215,3.7685057467218996,17.877554492243508,1.0796418505646788,6.299457738567198,7.05463913527852,17.112809673858894,2.133454940759636,3.6016298578617123,6.600911419066486,12.27693007299687,3.3373725620251804,9.907097482093445,13.639891515949936,4.555312027001994,4.184725743678768,0.15212348617726246,11.859063418338422,6.421746557476031,11.807079580419,15.819502687939693,17.061529349079834,11.888391610741312,8.340479188064386,13.242737930754064,14.732377246619404,7.994426820285256,19.730518996466518,2.7215166189251727,5.450162010889987,12.693479064658142,3.501070756494511,3.482718636082822,13.413708480479198,18.835259219678193,2.7370188282762253,10.965701985314151,18.205966261815494,7.9390144673231555,0.7009240259492744,13.727530296618976,14.401106290987137,0.5777878821542348,12.335163928064423,18.932148624961563,14.94529348134225,18.651035607954896,10.323141211440827,17.066371872896468,17.7340234350161,0.966055106791841,19.55034121913077,4.2344339248908325,1.5812078111115069,10.120356413954642,17.774650925750283,12.869512459220465,10.035428161934842,13.639207825762849,8.232989306962693,12.745116252257048,0.2102378055593812,4.62519534256816,18.597916621660847,11.457193152255511,16.084435999398707,8.117315814342358,10.439659686218793,17.710941089488728,18.31145398523613,19.430649488658467,1.721813685476814,8.653127311209268,7.562240682415573,12.044930255995524,5.469622773717631,4.860835742074752,19.033874107470798,6.962691123177662,1.9857061480926985,9.975416711434434,5.671957088785353,1.5593622538642338,2.425172071109616,9.533789920881173,0.8369192004074888,0.597592649437586,6.822344570277705,16.634599602104775,10.43253639873857,4.535772358659318,17.167650782009403,4.56452735869378,4.576891122996769,8.908630291497719,2.5168931792403004,1.327395121814825,9.372964959369078,14.679439933389919,3.172579241524196,8.848290207503773,11.628926480875226,18.342408353226794,10.095258230927545,14.568832732404701,3.7827096351389855,3.363439070560572,4.75158265891753,10.521633345411555,5.872620553422174,6.2952169743566655,10.680409096574737,0.35821132900479835,14.713398121973826,2.7161091261277726,1.4078194433957103,7.545931962121646,19.070978629449602,16.75309535306255,18.284279358274915,0.3438960344548514,15.973319023053305,14.859710976517162,3.2278449771420625,15.608623458883493,4.9994206884617265,5.11086270132449,11.712008990717706,4.543574084110498,10.095041352223939,14.801585372633962,10.384908583169285,12.260584657060352,18.718917959047623,17.21659720028502,17.572514856850646,7.882285945496061,15.098340706248434,11.2743434921348,1.7080398288477783,19.009693196080217,18.47804783772306,5.220808085998119,17.855567141102377,16.291941362998227,15.389484697984157,0.022118868571467942,0.3566180356262372,19.53414686117691,5.958603034138905,18.019794102208742,0.9308235582788615,9.93331016929476,15.868213350902893,18.710148324799952,2.248314432116274,7.296798888569729,3.9904666222432006,3.1849933308910705,13.72634818253037,10.649706384067397,12.247731936694525,4.179978928325543,9.573978679146906,3.971034027378497,11.084209882151734,11.869103860750304,18.15453092658352,0.604805096936083,5.4776974737852635,1.9278885270403778,16.732284054018038,14.79570585120246,16.941121468178565,19.430397357560913,6.281333787995154,12.236863222337817,7.11139944082809,16.53655014346155,7.863420848433704,2.9698336185026575,3.9494902150847055,10.319299288223323,4.409198574346349,7.708321972530077,18.152211728714363,0.9255785395502159,18.922459373095137,1.893003180909445,17.100554032982384,12.136160232260846,11.485024753957443,3.114083241944363,10.804360274331106,5.012540296241426,16.3622235315512,12.449156523667725,14.630316716698054,7.262332541030485,1.2791284905805789,13.58041514253934,6.631975426921426,16.69882167670995,18.481584077151354,13.645942498116526,12.644929774180799,7.077703743929069,2.11467991096991,5.69433338321748,2.5682731563906547,0.5943333564421449,5.1840986731115635,8.461318045560514,9.346452383155581,0.8360254382704646,3.1917005872126225,9.91771185865288,17.2743381007986,10.07755562486317,1.9036581504612826,14.129520176112425,9.815475125485413,4.165557768539849,8.36370753451034,0.3110517679397118,0.294547740903246,0.36074915048088574,7.081731628633796,17.985471357235223,5.38187591264689,1.1708203959149444,5.911697960614206,2.538223440208287,19.96494246404086,3.3738693882048665,5.392469177641517,3.9141716188221842,5.448812992687424,6.893300187865754,7.895235997036969,0.12115953178085892,7.095741590278606,6.178015583582579,19.294920217008773,16.56123547465881,2.4123934634294786,12.661209321954248,9.625514602113544,9.852885994105272,0.5161943376131672,6.348505328458924,0.329228640761845,19.09335937809125,13.081136924860122,13.667894550112827,13.171222671155016,1.150536765186554,18.637776938358645,8.8566752916655,5.91217249616284,8.389333770040972,4.756860978400401,19.133703594858822,4.028670835889496,3.777719176745289,17.505510076875925,11.505289609033444,2.5016012487602612,8.470951715723265,5.982446733858882,17.848196340975132,13.23634676661635,5.270517031079285,19.001243525512976,0.7971129947882538,10.50192358693472,14.875815152215882,9.321294250724979,11.808685088879788,18.542450907095343,12.909620286896715,8.974794028010699,17.691145427002578,16.052000290250795,12.332144838180454,15.41391873543791,2.8622517123224256,5.487532204519514,19.671115296536314,13.925469710589319,1.1755605874658137,7.525836544446105,18.632927204937005,19.01049292505446,3.5524867597275156,2.9261687467702036,12.597058766146239,19.49256756772418,18.946528266074164,10.381571253044246,7.705663010883801,15.47854724092144,12.776177430317176,1.6435105169675213,18.88044042723545,3.7566848127798425,1.5645611012841698,3.385879696967966,0.21617313986511455,12.12801670569753,13.476316830401087,2.20152153103482,13.279284467700565,17.915631736965917,9.490242923150007,15.172851447029236,6.860449456932454,8.968424087052153,4.753939325725045,1.877633629997395,10.752042006778492,1.3188667464150372,9.157674155481237,5.385959506593978,14.77608666356832,14.95570151197731,0.18145855998695115,15.82178859709166,9.626522678305243,17.76027047774788,12.114849541796126,16.308226212617917,2.1781667896291657,16.159325362186543,17.62145236193415,5.16984879809812,11.571995958675906,15.125331443721599,14.986200999087664,17.771298559934653,6.342784537924229,11.795560378734876,8.831003114050521,19.11063696258774,11.546373574901327,18.06492388705366,19.38198421755986,3.673554757939299,17.718582607790463,2.1234223286318166,7.7851441891210715,10.152893003203456,6.46452296669227,7.0156948898725435,7.177581383325888,12.672101859634406,6.1762669373131995,2.8632385827592266,5.167887915337177,4.2806283042290705,3.835158117094206,5.046519538291654,4.647665450750047,0.3507786211202335,16.07686821187287,10.34602217381956,11.72521006250241,6.71389191374284,8.30247211267967,0.32205894162391946,10.97159581832987,5.034641435176939,10.78125130175248,2.969680520180127,4.571582577607418,7.637659132936219,2.0745352577867004,10.776768785727345,13.156337152568911,17.066715368636345,7.564747280562094,14.524380912255136,8.949192886714933,8.018542648160976,2.6754795568686873,6.447081285935781,18.609199818729905,4.291164607176263,11.08481110183221,16.284167250417518,6.073576435442205,18.23746762800557,8.97259659332121,0.07303099765200827,4.229252422591179,13.733869832954007,13.760550940308729,19.199334598140723,12.568078030174043,13.483852249761101,19.52562325010458,6.363473587914132,14.252668213281666,9.087473670311219,13.627166231271989,10.860296976835961,9.36963011306256,8.369939183123932,17.17208077951088,12.114707086449016,15.233807375224156,12.828003524332466,10.424074719644217,16.40667064818905,1.8953027175931858,7.993050418793297,18.170151585111334,16.643028482649775,6.3597132401105005,11.295573991141339,11.340442264415,2.9865398019041134,4.735670721819805,18.158034685803173,13.007714757625589,10.192401999215171,17.038885930138576,4.191170122573542,17.812706978413825,19.179349155368286,4.2282245268969065,5.310315667878083,16.21503484630051,10.438758521364488,14.372152503906479,0.9599044248562327,18.797883439362106,10.578030430165683,10.76755152950357,0.41732081702003043,13.24011138389623,8.975991964019784,19.863864505460022,15.914517602034826,14.723591542498706,7.887761349590345,14.762792162796048,7.416816400229944,16.91591775621705,14.114625812845727,8.392364194877636,14.589141192067308,10.729718814707638,17.68254433291851,17.76510677830975,0.29516563036408705,19.765824498405845,7.218494147474797,11.697674859032524,19.511222827402367,3.1379365303129347,13.951504914625424,15.156846953402358,19.844767632630717,11.749613226529716,10.6085797064115,19.08746508457679,8.133218153513976,13.462647918883043,14.288801627808683,0.2782794162171065,13.208288904877147,3.302499137699817,2.4097903522378594,10.812894767546046,5.198702501764196,3.963278524460514,9.339314985178993,11.41714680872945,3.158615613786866,5.407652844652198,16.83874419681976,4.815904392152328,19.588917547486094,8.448923222106623,13.225589544937053,4.638733805528403,13.942356127951069,8.569986697777967,3.8252239082074,11.09747274414168,2.0052006508303633,19.971671181167828,5.839712301087756,6.239543641017562,6.776686828286449,9.732117751381857,4.4980108999051005,12.473783649288443,6.767327951909881,14.306162942170486,13.547383171971825,8.089906362613458,12.379882695788393,14.656471699006879,6.321368771200806,13.676347113040164,12.125552103906623,8.737250845810113,4.020922733065091,12.904596910268854,9.786734804336863,17.818551740919112,8.054042428208096,12.940086874555817,4.13564078387703,8.240530752080408,9.171245216623447,12.277936146981796,16.79969708832025,3.9256367912638446,17.478839151084,17.699106540017237,10.52836120573521,19.660545893450333,4.398542953765383,1.7276523889133832,11.417843665827924,5.691160177855181,2.889965570057811,17.392455834827807,17.089460008780843,16.10519728894676,4.487904820553115,17.587548967986095,1.4903802799128396,16.369413587113392,19.453181920170973,8.828547261401942,13.089923294005823,0.25012271541272835,16.932633012620215,15.62972279903574,0.6674400637033484,16.91339547522077,3.076821770875755,18.156050289118802,5.214251276382664,12.577624482868245,14.159656815186104,17.148448639418294,18.8422607649236,4.153729849805421,0.06940866060918705,7.443722490995048,1.7272783773506895,14.947572073984814,16.129545611517088,11.39091977839108,4.942325186386549,13.515613158525092,14.61553537066897,16.25506624375747,0.3370652954880615,9.356009909246318,5.740907458136402,8.841609806880935,3.308755430786632,17.74969293676959,16.534282819482744,7.892373155647419,14.751981745770584,4.291531425995525,12.486328882456906,2.153707280954471,12.170703392622366,5.384086532383541,13.41245107100324,2.5463470098000895,5.466615589307349,15.556509096281932,2.0301173461784883,17.027895068278156,18.350237550029185,18.633214401222354,9.016274864005652,8.004129911535385,15.112505431806609,5.576052259054967,5.625924986658575,2.123024686141486,2.631510275616238,4.62320542844755,6.765345999266494,9.785634751655632,19.24143627987171,0.3129304313103898,8.602950866938773,1.8325791636861233,2.0259195384811113,3.074921410357132,7.037040854640355,8.975471545242248,0.5566482100208825,6.8549020644414815,10.016873691913766,6.384713366328172,4.263900446567241,0.7461310388306108,9.34026747299125,0.8257023545668218,19.52307361106267,14.309356813728007,16.31270481970273,13.823208695815596,19.610766515563522,18.950933614288385,18.145948070431896,10.57874122380126,7.616463394246162,5.368814603233529,16.87572996502508,17.836734775291866,5.904980134441358,7.7085377749578265,0.8301591452867063,11.228916508818877,8.157608665499723,6.190001189687679,17.571965560629252,13.92104952468567,18.146939222967315,10.908161700033174,9.039081350456932,2.974703536149632,11.154803806937426,5.055637125760821,10.306826124940404,4.070853837454846,10.127614759271712,0.5896323719761654,19.708499581023283,8.396051534345826,12.627896442626767,14.354708642955142,18.394445689781534,5.1802083066705995,2.5366550026674295,0.5927382844390738,10.545136953283496,3.334586378642901,12.932801948820183,0.9218803924939989,15.829390097526218,16.095196941799266,18.75964183673962,7.22476827844817,8.553252695744122,9.710047672234538,6.64690411178225,18.950916342138395,11.93288768953575,15.546082427182085,9.30809279187927,19.239810616451805,4.220444373867527,4.466440573872563,4.449471928056901,5.059246574377458,3.3867996345843476,5.316477009418148,18.16843406707728,9.599647298567726,19.53468138332812,4.99247742671133,14.50930008699351,10.694692665093545,7.145994163766307,19.70469545678034,6.625836892750012,18.00084741416903,3.937278087968399,13.422957906137821,17.277804351267,15.756206731917914,12.958380852060847,5.2454570098358655,3.805123915218389,0.5440837939901622,13.068995805766793,5.517609712536342,13.685836175734828,6.511574830246514,11.346649552381818,8.954408034254108,8.921907827732504,2.919988412565182,7.273074342679786,17.005460127864836,12.09539284758716,16.64239696950631,12.550467071084448,2.24622633864207,0.5050292154800795,12.288103843682743,9.529119637896919,17.374607170234203,2.154592394773962,2.4297822592085394,5.065369387284244,9.215439154095385,6.410543753492388,17.717900819010246,0.45106845696583964,6.956120757769577,15.074229468884521,8.289610344354692,10.271651452944898,4.3990671094969835,11.65184698279678,3.1156802993077948,17.7565241409783,5.6186738980107975,7.265223448747653,7.643980381144422,18.970467045494807,4.660285319354851,0.343647857403071,5.552937975922454,15.175873200169754,0.20895416804812328,0.13340938243929124,7.800683377892645,14.398827951330734,5.9001634976070605,12.149463324370608,12.773841244504114,3.014872259097201,5.839857813581437,5.97244713011424,19.120186340026102,7.044712927044956,16.343645006129318,15.53374720229169,7.795759295637534,11.035144332639257,4.669191112335489,17.821554838237002,0.9203144673753672,13.059637350654722,7.67834846612518,10.332665571141115,2.9859374209651657,6.570538484013055,11.119396652408064,19.817630034118906,17.799429118165907,5.666363141954771,11.31080419839499,6.992003978665378,14.401303023016045,15.200807495543177,6.202859285669882,1.0098395268258153,7.05128564028072,13.011257516781317,18.719053881935142,7.487721786564281,5.2577599892736515,13.982365257956118,1.2024490133025623,5.403308343531723,6.86319779262516,5.147464354863169,16.696589580304465,18.303063036190025,11.131700122728954,15.857116623059731,2.876226789364331,1.5649695547097942,6.547295834696358,6.356172847300359,2.9931568110837325,0.7663280834795483,0.9306366852143988,3.1114476010533165,16.2323803163668,1.741889493192459,2.823635427591915,1.3146253246274897,10.495397915624496,1.9181564704052079,2.572861514391418,16.306768791921805,6.282561696231648,6.952383335548484,2.4297821920439544,7.502700861276952,15.222971869483843,2.910743015517605,5.049469907969666,16.452705788678998,9.045944699082064,11.508793844791235,16.784154585451315,2.9778232848240993,13.437585836365376,2.1394467739697687,1.1093891333629635,10.526818789899677,15.516184568952207,18.773457773479695,14.55649813738571,6.555681525787258,5.56581807003488,11.998144660985218,9.734097581529891,6.761085425256166,7.163067586818936,18.345767425586928,4.495667586516303,16.167769920967984,11.727670257069125,10.552675541528536,12.991166149245732,2.0382926711850136,2.0432247400324277,16.84193563138406,12.098596572618074,3.437079968467871,14.940837476468731,19.920702505540874,15.63879723528213,0.502588509095272,13.9025599209464,12.236926799992647,6.535426707687226,6.993886014219699,14.936735335401995,2.2794759415261012,15.394539335229439,4.49126838179112,13.682113132445988,0.5497300184329745,14.858031978148428,14.44640224859397,3.4375187793791095,19.595884987198346,15.447522236545591,3.451834975621102,2.4398276156578635,4.132008093984321,12.133062286193228,11.800364277013964,15.713798348993997,1.0361411764889628,1.9021791477964456,0.6967872483029236,9.399785884993662,15.642407951564454,6.299055005184413,0.7442657377901618,0.8532488260602422,10.16335464820395,12.012193560478268,5.187302461947878,17.63612906465079,14.633956270527623,15.074934698253966,11.887785580675692,13.048317569404793,5.9309846154524015,15.786453806006215,19.92544670493729,2.290304613740375,5.024952776457607,16.52394167212147,19.524056787688963,16.393585835671068,5.367444786168458,4.31657775946074,12.725976331698202,4.824229309341144,16.69354132281294,14.045012112385589,8.994133592499626,0.09017521915374083,16.139137905415257,16.988961501048262,14.072913574453718,8.301829146430745,11.567339988680398,6.444444253680315,19.655242119661086,17.077226348033072,13.984476580570444,15.307600129698464,9.112943490032235,4.618961551669694,14.942059290934683,8.750815207687577,12.405580158662834,16.80870608767606,13.541843315825801,18.938461152037448,4.979071084752293,15.468011719924718,10.906767135517054,5.6289100240161805,13.14597327159849,6.058958437621835,18.301716960856474,1.262054627128708,3.8003367901526364,11.648208007074864,6.140207641013693,8.634054588526961,13.80576023193056,17.80735490481431,14.06116581322122,10.74034443493758,15.828338311641188,10.177859602808738,14.632464492651698,16.059026661073897,16.079155896103202,19.644575675115824,6.622373384386848,3.113438561240809,18.416393938169083,8.203854036522355,15.81410141536518,11.153624615945645,6.633364232891825,12.25917213021733,3.514231006581472,15.01240917242681,8.862974826937684,15.04866300874844,0.34212862365100793,13.128623688639824,9.314384263033206,1.3279442114197648,17.816097097142432,7.165383595625046,8.119104690504937,6.393567340279369,7.2400875945795296,8.510092612221246,7.794195015637593,5.6640279195719145,2.2199911410935735,10.73628644700188,12.675760430062212,8.488992290417382,17.018867360086574,3.2185554728767585,9.649667282101678,17.156164334035857,18.719077744941227,1.5732329590974636,17.916634539868177,18.889511537666735,19.101117009724152,16.056821427251336,9.749520118085574,1.0600271711940445,13.360987141589295,9.659819041755778,15.16100822571914,4.984689361509527,11.486489630977555,12.641752644174233,7.9393182692516095,1.2654126145359257,15.263503667184661,6.252488130740823,6.434940682767638,15.633479482302771,17.59197325763525,12.776248561880834,0.795010369951048,7.847918448805409,0.6286058049066146,11.56218937583185,19.22326457601818,13.946075579712458,14.8433004387357,6.461336770689048,15.265951814554114,4.120738380453535,15.475592852223503,17.86996438772526,7.363711550077134,16.311704584641554,11.225016875959128,4.652699092147561,12.647508885313584,3.337748074690219,12.793419097171622,0.1818246799473,6.141357012974842,11.864815311478715,1.2479664883932662,10.477568874024698,0.8241932211580982,11.87563452045708,3.2212696531928,13.871061934923347,13.323956791308937,19.71279968282481,11.13949959299109,18.01965073731328,14.184378925869282,5.7120387134152395,11.696300858674489,19.135405339859403,7.439416748997738,6.31626426294047,17.525865193230263,4.521538605803017,1.5319093758035462,5.130865517977479,15.86398227656764,7.113099360182273,5.431803470170626,2.2627303464676185,19.268730375820642,12.69150139780869,15.06182538049734,10.528786143309222,5.5106357674594175,0.0956847159872165,5.33168277438123,19.78022767951339,16.38708139025878,9.536205753537356,18.532730685883866,18.52109226738808,11.042463152810637,1.883867565308841,17.6049751597121,6.2853491789456095,13.677303968344795,4.149391984030251,3.798673462897937,1.2830325637575202,18.291897410397652,17.54489158410561,2.806299131202441,7.705190262148993,1.0961154801707629,13.68075400781635,10.444436285267518,8.360921566961386,11.595411162492816,0.5009687111378058,16.668688595149284,14.010424828176049,17.62370053646508,7.422843566904791,14.21381914260316,5.898577592330767,0.08817225422322661,10.497034012251296,3.435084789871694,6.694162878981875,11.704760199505401,11.432160018280054,5.277732690322936,18.290641888195005,1.7894939997411896,15.741819447013823,10.263992417356498,19.32654792408199,12.37429124383774,2.671752215651879,4.33597135446909,19.58196547531046,1.1333773383359436,10.09817313281462,7.357044604870273,13.561993349764784,10.904276725557281,11.615689660689874,14.833185151453957,13.585383592767188,0.021235988077692447,7.779454040436038,11.861180102190602,18.25709558821236,11.209331389600381,4.029817515604548,18.703831823108935,18.831444805119432,6.432037143287586,15.587494848241054,3.619817989217511,18.121886275171363,17.036990973509386,2.7293261271698643,7.428020173559831,8.2133112999305,14.453704425421737,5.704145086474268,17.065545257856876,10.626089251354728,4.163154771042903,5.665708737572723,18.99581659974681,16.922891722072823,5.480030903518629,7.4212187105502725,11.067328849725037,7.68334328259237,13.16810991648397,14.072226290816698,16.87557557937666,13.09036367319733,19.14526410154497,3.3220623776168523,4.769155044406426,7.18283297967846,3.0021594445194166,3.316910119971004,3.175521970940798,3.3171530393609627,19.972147808747323,0.1762757413507554,7.504538597523922,14.971096402851138,18.711321340509443,4.232088562470473,18.97988322241389,3.712262098940915,8.736008362889617,5.451821283086793,8.381659948360074,19.458797812616787,13.660086364276234,10.181438557859938,18.986809703232794,3.0437611413219523,10.536345870848724,16.273940330035433,8.443949764973006,5.369809216024559,2.8628824762519756,3.811063054067634,9.224881286567381,7.92303357905348,1.5572219306963175,13.741622223731076,19.267632512264573,2.1484455256305246,9.077493770019792,14.46516818677415,13.942893953002034,16.545166562282873,9.557312515557218,9.76992490882326,8.940843380971607,19.247044043102616,14.613296117961351,15.503118752577176,9.653649159946287,11.640675177966413,0.405275527501221,18.204083538090856,9.103690980585583,5.791651451412236,3.4616515916813784,12.31089713204021,0.4142279356329581,6.738862239656669,8.874328341458817,14.300388280365022,16.340523001466856,18.570523259146544,17.78456127155694,10.764057443743669,8.894827734135822,12.167749271752438,5.719805809071379,14.913086669701707,9.528135774578242,17.992735001712322,0.08356528428244303,6.921240481768938,0.6050935796055334,17.209619292859152,11.640196459690708,2.4700150586030256,12.383169139093116,16.849533414613497,18.803235271360297,19.166562885847675,4.722937308104416,4.528780710435796,3.455701075288231,14.329300606609952,0.4147703217110754,14.767815812412861,14.43673498848347,9.503462170564564,8.3737943223458,12.959564323227744,17.383748618920837,11.177013529763666,2.7542273916695947,8.610498632510751,2.2790852898913894,2.1082040078708397,19.91496507203133,1.6156118303107814,2.4926595756731507,17.484214024805453,0.2670639030333133,1.1892733308334869,2.0086950628723743,3.378531759857779,10.736876934478792,17.547001885972815,12.655023826641774,5.640651168518178,8.549779692357443,15.54736978845435,16.42187260536221,9.417513780024617,17.062064724159377,9.759851275602692,3.56995842030873,12.193788277363304,9.470415339657867,8.786943455535798,15.744554036090431,13.00804523779668,10.4792315476498,12.759145940308784,2.529694963612048,15.979649539090328,4.064304345084491,9.266316350161041,0.04779324594483825,1.2562022778466941,8.342666060240035,0.38758127153996735,14.99696787454103,8.761063753134103,12.337679816587851,4.8263693966274746,16.04661987581641,7.3668230906932,7.100553146890123,12.951555466216572,15.437638753064178,14.441162385005741,11.51195177904576,13.015203746773732,6.822501580618026,0.9948672569662564,19.940922558152746,6.937754567019425,7.006675884477427,19.344595141800443,0.7356341031693514,18.480837012417318,1.5870817210868582,9.093378338489275,7.601119032390762,9.543554240143406,3.2666434510555575,13.475701553873169,1.803000818488938,5.254619188025855,12.504105255040944,18.52779947536156,0.5353924068881533,16.011680287931284,10.98115422439542,2.698785198682234,11.934667947257882,13.475529066857304,8.291604504681196,6.1096154560604,9.358422256772347,1.9574595105128223,3.32982170101193,12.63368657230683,17.576493319802665,15.86753917221824,14.811041782975046,16.74163981199401,19.920259870476066,0.8387102198522411,11.964156194735649,13.232412521266156,13.061826450469152,10.261439537266149,8.511111933726054,14.909299877326362,17.85593649763307,0.7995956081169853,8.063814916995064,0.6272150613330307,5.567863425403519,3.4142069332862057,2.326043631571406,10.911742769131717,6.0815146792053465,19.271319856130603,12.830369490859589,15.07341148098452,17.441946954764976,6.909071164213794,13.326671494708208,19.77895684799829,9.7058675186241,14.647192836509554,0.0034016612068299423,11.356949821161901,5.958746145317337,1.8434514094379617,17.551637541167516,18.18619034124682,13.965717467207197,0.3818807261111079,8.985587493596444,1.0896595478580995,17.651962820453537,15.381441234264216,6.660844702819477,7.921896865545639,5.41735579073936,17.038174823226765,17.726313326201804,16.334343362719427,12.322297914100062,15.131266834751145,4.770637024742119,13.036274044931835,3.4229932238686356,17.504710262342957,11.35594164269543,1.7366177414401873,16.439953135399804,2.3710077602748036,1.1740405206439197,8.87831604816503,5.062992026916495,0.3245447582169847,16.563717914587038,0.07063692530245635,8.846632866946948,9.108213363538379,7.665383304742095,18.8631141516916,9.705314518730548,7.307986674541707,12.195332342922477,10.658657377471972,17.830205168922898,6.351637985992036,14.309342019610165,16.719874040273087,1.0511465307929724,6.660566402853263,14.294951566857312,2.9916743873455287,11.509530135317302,14.869829230584418,10.483202785187489,1.6987090406224725,0.9925892225610733,10.237030141726287,11.453925369113307,15.99994722126263,14.693024462652282,12.336899504626953,11.969133688814706,15.097952251367225,8.138634768631704,6.062537025477717,17.514332333326962,18.077793561283045,10.904899610359227,17.379415136601366,6.963688998757105,18.17581614090319,2.230259427088166,18.146050680310463,5.727018710877103,16.53696586528925,7.649140728852473,0.4697777290336491,17.409071971469423,16.632554714063204,6.6623701030767934,0.40969396394499924,15.158191304826145,18.6587158565536,19.020060327779746,0.17824773623436485,7.154620573850625,0.7071488367364509,4.840349614459045,6.087061391276749,4.107670229766014,18.92504726103461,3.1071299284354748,15.34935677186028,10.493032764316453,5.013843801530187,5.1627078288395145,6.315726723640607,10.829299187384208,13.128639911603086,15.744736073368362,17.44208880678312,11.367394601855722,9.858165714018234,10.15423201937223,10.365728948412038,13.85847207140188,13.91395808323633,15.662753511265839,1.7492578910293188,2.1137413368447433,15.410939768201409,10.905886202564039,18.604193252084023,14.731729338929199,11.659054701749906,6.134612270485462,9.86971765548908,19.807144956090013,14.10679879086834,2.868278672449245,4.437703127632395,1.0944127060298303,11.492819203895138,19.86148019995799,16.633979362638186,12.727189452334224,13.563246149197798,9.916544028330074,2.6160929128988464,7.022024060144738,11.750128804351014,14.33885706004399,4.712497780503084,7.474121853421183,8.638382240876181,18.54583197021849,4.865798952696401,8.246234120353773,7.559677549518384,18.827661356085596,1.7098920801638506,6.187587339533982,13.01851033609083,2.9174046382774943,3.040044324216886,19.223856444844802,12.9876980009454,2.909265892527766,13.847895092659765,1.4393093475403917,16.508629156722208,7.123471760916211,19.364802364229014,17.304066332308594,10.210272803352765,0.4745587250811445,8.778205744558928,11.502476645968912,17.34422322184176,4.254770046302858,3.5045217942222973,1.2518365848625335,7.655763336351633,12.283607091764384,12.814732499127114,9.223170775897952,8.44735190341012,18.93539003307427,16.394566553196704,10.173111509965157,10.593619972451638,2.4087807147196916,7.03953484996763,14.30494834541065,12.745754817019193,3.233089241846927,13.721152837880059,1.5105361395072947,2.1338949134702556,9.54134402577289,9.785203403783047,6.678963912938585,4.844114972688924,12.405509742811187,10.286151395399825,6.396720738997832,11.171453267891508,19.513644299247737,10.337933487684987,0.20991877635304412,11.975568757337314,14.887701185949114,3.9765685855149036,17.14981531892686,0.061485497821913704,7.9994722031579,4.6516580393334594,11.891348190591625,17.86522661439056,18.21866864526831,15.134320516056018,1.6990668861178415,6.022606095775078,11.39901434230898,5.976764937338999,16.56231263712654,11.92787358814897,2.2658257611613353,15.880805566247762,14.655755764405388,19.923849052300504,3.283654427358411,19.51046852211953,19.127846235534566,14.005071244318046,8.307403976480558,5.958551932319085,8.143704251948352,9.9561857486291,9.282063562764247,19.032459203054998,4.186371318014008,1.315730118920464,8.142828789589554,15.900611011543457,7.952968116977699,0.5794553642380773,18.935764432969464,10.976403287917783,7.230843719919644,8.534153204369424,5.158457263401521,10.16246352758641,13.577470995670978,14.867650061110371,10.653845538060263,8.649724220695138,13.76918808297534,15.345920918628885,12.265737780817044,0.6269444184611128,15.741159829539665,8.453659883162704,6.215852968611348,10.309252853300945,12.996148474290091,10.386829474747383,5.3988926925406755,1.0743018772995327,4.912098445578894,12.68612775577655,13.21331383657174,7.163156734658722,13.41602806298894,13.416867022646661,11.43571456874131,3.829050974269408,10.113143229560677,10.274895627894306,4.719267370619851,16.30215262838837,10.631978368105939,16.876937486427224,6.97623931143279,11.700234924616698,10.317196198163323,13.836332324494878,14.349940263190671,3.708017130512644,16.48374745983315,18.23173909642177,13.158979397873413,11.934562798572564,18.905506930029684,9.764222934314372,6.707555200486004,1.71488824900635,18.61496793203895,13.76602020851045,17.833550180912443,5.85339474630636,2.222053910626327,0.030431793291514353,5.308248500110051,6.318160771975991,7.585317618110641,11.571166808376162,15.155683827936324,12.343478108620424,4.425461284957328,18.518504799554094,5.403963763613122,5.408030344125061,16.87477090100807,9.107785139994458,3.9412542641764636,14.621805170072122,8.306229312138637,15.586998723760747,11.474468889789623,7.651375791721184,0.8102768330120691,0.5794576722252209,19.321056314090686,2.729011924829865,13.681510861106414,5.340593622273548,7.551542953599779,2.904719914252989,5.534107525986518,6.518361309794258,13.358573162071202,15.595047788327957,15.287570502809809,9.59098460151984,6.291354492399273,15.465555891048183,0.9392109825541661,7.807575151136303,8.317243109894816,7.549826708086185,7.5698633259589165,17.601927540592023,15.741368411996174,18.79050991508134,12.381914852230548,0.37062670687654453,12.792694535147856,5.0157504711503575,0.3283453269133174,12.801359360143003,9.994557822960095,13.035296854056323,3.696915870166677,12.78314019468933,14.63766067923919,4.203434245128714,11.82414604877739,7.933552488662943,3.748123855218237,0.11224243946834633,15.844352361903384,13.909021925847217,4.32017988743552,15.190688083899806,9.210770958016191,11.487788917997253,13.347581462898898,6.047157176771414,9.299717045412542,9.496798379459195,6.603149613518564,8.513574460555645,11.391745627137201,5.627974122516886,0.8010701635221018,10.74993308981865,19.917490267325228,11.08775524749066,4.90523635088052,10.52657529260166,19.357997927359296,8.835957571148466,14.536696259514471,11.95599810649739,12.086178873326201,10.240178291062684,14.976956452406899,13.312616177678143,15.132818018889873,6.888625662092487,18.69944101138923,4.668319324380996,2.068014331652841,18.22113180771526,10.672371636298564,10.3764141507626,1.802709599987966,7.7160585876234355,1.0646824785781606,8.801314192063678,3.0932922343390734,1.5113257718251827,15.526551964577271,8.884341767428783,14.077549671197115,0.6378682598247298,8.111985894621586,5.917887204975765,15.052285961338425,2.87257777923966,12.954646192873916,18.97117520282141,14.74826974830127,8.737923228411661,14.226852836202536,7.238417843108711,0.8640782366825128,11.372540237154048,17.134388020225053,14.305327209884101,10.920021654946964,18.545431118340776,0.19420959971101048,1.6971418171668073,19.607114758177943,9.864567506367582,3.0673516472524165,8.410055029419482,10.17904615978518,2.5061478257560754,2.2769535089138193,4.07694131934035,2.918344086869813,10.358747988323579,10.2361982520467,10.659532902926525,16.375683218066396,14.383698722985866,15.987621630436294,1.9098573929179041,15.682199416581234,14.876642748502515,11.770007436994803,6.960498216944551,13.362344330613523,13.706617469279884,13.010008423845658,18.191726136254374,10.382508518212145,14.046552459458193,5.9118747549119455,14.678331302364128,1.2937876801198733,7.6124875914744194,3.729796809924575,6.271974303458165,4.686251651414874,13.115483166850126,7.739347649134145,2.4938118315080526,9.062004933730293,16.93423972654894,18.669984729329812,17.476020011100797,9.734059090196165,17.86438342193646,14.623571385041396,1.6758137845856291,16.650330923954808,5.1430793371573635,7.945509631407193,11.733302563362757,6.3099391937465565,12.583000385821187,18.69555375212178,11.815638319903737,5.016122815465156,3.703460319545875,6.851260834321877,9.760374024951389,12.060311587892109,6.29883541081715,14.278634230889416,16.6274635209053,6.22408365427487,17.00197053163382,5.428525231589547,3.017443246455347,13.577074530110188,4.341472052574411,15.449397261672022,2.3379123558201975,15.317211628564259,15.240387096060104,16.844009886013986,19.78512930522843,10.921707834527226,8.482516971218983,0.8297490532582463,9.183649142323421,5.9325874424470815,7.2050356675530125,12.305395921968119,0.6920842222308066,16.335547747992084,17.422960381818072,11.508013350726074,17.489223173655397,19.26207398724206,10.092716454304234,11.124818645374802,12.14651505809972,0.8770097265448795,7.716521138944721,18.558241503731065,3.5254648028883873,13.45588103643562,17.11177348820766,19.7973644773461,5.796127438059675,0.2826330394616505,7.730209881675285,19.811104813217383,4.451791007922035,8.559667807935995,12.871571662968844,18.60771239410376,9.435609894934803,14.435051532322504,5.941251657496589,3.8649969946752893,6.317154620618788,4.633332357547673,10.031017559767491,11.225049327314892,3.9121487836327384,4.400372147127438,10.262979584010989,19.261556784143057,17.737854473602603,7.487738099023287,5.252165205352455,18.3203215494575,0.009337850466515363,1.5876437193703818,6.745976389700297,15.035252201900597,14.61403508495222,3.287243479237212,1.4499952819781292,17.12799496595249,17.10357500366051,2.0036007262915945,8.001598786004962,14.297679411591183,10.116359558357582,15.392247482193241,19.002662235912307,7.387163624889399,12.42242298294029,4.342422181747354,8.170876735347946,6.477892324691283,5.694623971332282,0.46606571597985536,1.8700731313764951,6.136557338120747,17.35756870413907,0.5570700983363652,5.591925057287006,12.201720796285898,7.185194961310648,15.733118556161036,19.883728944267855,6.394436261851202,2.536947863533876,5.695731804407207,12.254942067268653,0.712250299199817,16.58840822308374,7.1088032014571745,11.219904283716966,10.577668815082495,8.398445707600338,19.812366977380428,3.4120089487337735,14.423561461885829,11.860278101721121,15.387419964186183,5.363652490605131,15.901269188951241,14.2941338578628,1.8509830419916717,3.0494455903160977,12.178738293199757,14.618833809988224,17.689844738239767,12.535339886239667,12.485457587568467,19.022973050526847,8.662001425824219,13.910536638650694,17.06054380270966,8.210752238384696,14.463659867692055,6.37552718932394,9.406985491102278,4.60463554654575,2.607210154460038,5.665436666453467,19.94717144016814,13.33859154449732,12.207147384874952,5.5646763169364455,8.957416660570217,6.936863218241203,1.9634898557066816,4.038086479988112,1.570660140017912,2.3359268153132495,13.82848303121214,11.301373170195394,16.371974747940605,10.551782153327709,17.950399852219295,12.419077892016993,0.895706595582757,6.4687556980081595,9.784025937246831,8.123105131604325,3.280427381960531,18.268092855926522,10.488589016946133,2.0452400739548526,4.298420732014798,12.067918633448285,9.760834072982728,9.458603709341439,5.952629063085988,10.397765963803195,11.299307895946091,8.07569601551882,9.757896791047509,2.0871773198745913,14.045290578177294,4.995672938058946,10.167495715517383,14.866149755153625,1.194126530347619,4.231511770180316,13.113449292063507,3.165819836960271,19.669131523328684,16.069041116362342,19.130908539045098,7.300279621546304,4.383837619436943,13.599926928454407,18.08919079788655,12.779390414452362,15.209886496480674,5.18471428135868,11.095937120438455,18.249291698904237,15.665261945485373,2.686131020304372,5.707054702830905,14.865727414464857,13.001835506563122,4.459035092484691,13.820077043825263,2.295518805039749,13.560623107717976,16.984368466101436,11.168520572214318,8.03317731631525,8.63796384122059,4.803053435941482,10.704733456417014,5.596575910325972,3.788727923008901,15.397134084351611,19.347078998555638,19.478432862799654,5.423486018647732,10.316685609883951,6.313002443707085,11.136476713398945,15.421500768046762,0.8895149259704338,5.643075974757443,10.259936906514255,5.464933676196213,18.585608013357135,14.339507009764274,12.038023180022556,2.2801650078407976,1.0537101137552796,17.62073588946063,11.951816371502431,17.40870826731478,18.887393348152838,9.723570257608678,11.583945890665559,3.409746287751494,17.939023672500877,14.998728090486072,10.587868994558875,13.848851248102282,14.657560148800325,4.02682901195246,13.584902848438333,4.137301753610503,2.1285020354549866,15.506870148320338,9.386856669187186,3.5852365168906575,3.842613961499013,16.96177065651332,18.153613050225776,14.278046949573548,14.222404444300931,8.537935159830505,11.683330724636352,7.6908128234632755,17.679536229134456,15.210909232426513,0.2215090143792553,8.908851727968274,3.0417821967953884,2.9468106799476868,16.386499439689345,3.026218229947104,15.799677756173072,16.993502234834843,11.381120978063969,0.4521176796793558,8.467627080387444,7.149604231390607,17.710357898201124,14.552327949328463,2.438966842416548,8.664626351199342,2.9007662890751673,15.26339465542977,0.671166232727689,5.554019142658646,10.633372768007735,10.705066160406842,9.93750596602505,17.90000814358491,3.79288890004156,0.6952170833845495,11.181884965419622,0.9963769563341662,18.97132799400243,1.4965260058281427,1.0037702132716397,8.872241004996928,12.176673856112018,9.544410119600055,14.96087346623089,18.573858669252168,1.7006055012105215,10.988489369221393,17.056871879201356,6.4986274264293575,1.7947125116748675,5.25587566536037,9.330779939830709,3.1187395908234716,14.075377795588086,0.5330032948782293,7.990055772844893,19.965394514567333,8.555552330849082,18.852971544190098,18.609590779773857,19.56081886534367,10.655504244626712,14.36846675238796,14.269484945396007,18.44052561967498,5.766233440683863,14.73858731014754,0.9319420060063432,0.5675589840773476,9.3301666153181,19.089395089933802,10.235820153274982,5.093523474806165,8.6913201983102,12.188734501477532,17.98378455825776,4.405084406005102,7.913987433823388,0.9628073584547225,12.098098770231726,2.873540123557312,12.847845273591805,11.82546736320392,6.743335014061325,5.894152504443788,17.08846245471028,19.716474775619552,11.016305626851949,16.695316456967518,16.843149176226248,2.7307453793476855,8.368900853090238,7.362152167134446,1.3805332066711973,13.530548490855905,17.339319626221858,9.14694172791882,19.66206557094218,12.259318133673673,9.206454882801442,0.9207332158056092,19.86786172072655,2.885646671320252,18.807334181186427,5.528020351048064,14.65276394160262,14.032440778473397,17.204416810006936,19.524537856049896,19.092705825358,9.647275113120596,11.20979053530112,18.181900018815934,8.80523734883647,5.782859189717224,8.441789752361245,1.1130869403192767,13.061131572647247,0.9143478026885088,13.76272496024054,0.8119588327584015,9.904059424710656,1.3261053554729818,6.960363684415944,19.000906012713873,1.4194348456414607,10.722345311635028,17.26537811833538,0.670395059010227,3.4651323503127696,17.762384426753364,13.779834037844335,9.42945744301885,11.841407781302893,5.77935856830003,14.773370472093767,13.867563236645077,5.958945966753855,3.016483630215294,0.6208573028735032,11.93354235381193,10.22002148842519,17.51140993221055,19.02867965026728,19.725259914358517,8.806401747505905,11.39559327353254,1.9588386257024437,8.803033938304324,19.927930821541313,17.372694279608076,15.235079932981135,0.8370072865183387,18.867404514171344,18.47189463902407,11.699054890792514,16.254987614286467,1.9721475856388926,4.877537732646511,12.86322906917552,11.75696992358481,10.219042876287023,0.3082572950336848,0.5021193851816497,1.864009661327004,6.303289388053428,3.0918405151579087,10.917577976791314,13.792463951665361,16.295336807418643,0.8307171000009017,15.069652882126746,18.527772802292432,13.338305694989522,11.421090269693451,16.74260800593135,8.09889397771618,13.144593062339208,15.628288844592305,13.664515240014632,2.5738823913014297,15.355734296772624,8.863085413286402,16.89587403781942,1.5146115062341092,16.546701427105624,2.6433451729206103,16.893285358608672,11.052186978990877,18.20239089152016,0.3550221245709695,5.318511171462874,7.439341510360755,11.226776624255352,5.305508544626796,9.088381339188292,13.694138011732466,17.97858942825302,9.468151515846852,0.2215151696724238,0.7457559899592248,4.161962235918226,19.5359919865839,6.368590526936568,17.038256921574533,14.040004431467793,12.612091609893925,12.683611826279723,3.3648449322803353,18.267124158113262,0.14948528294043584,16.947245227090416,15.846031299990715,16.333066444035886,2.879873181416892,19.661070398656697,0.0374011049872891,2.103623337080971,19.59353749419614,12.264335478170715,8.670771524149337,6.681751678630867,2.232131973766154,13.532436136666197,19.46988017080588,7.316121295968729,9.312961614141898,19.99476389620728,7.354098356637611,17.217036623215513,3.766706995509592,9.177517278822268,3.458970122839231,11.954344373602751,1.383128857559508,6.101941125836157,11.181456973604007,19.64709903895674,14.654647027086503,8.587784229061803,3.62649009147197,16.73575382571595,1.8117581068728894,14.917160818409897,0.25669454301469496,5.416512079786315,1.8171755471262596,10.402602322926185,9.73300897861558,2.5044935517629208,19.757734972647548,1.5070058850116563,14.103202515841154,1.9557938611321246,7.348601391735365,18.23367328469208,5.5471602578763335,8.26384164592878,7.96681736689588,13.26818480275763,16.639069419221357,11.828889379716383,9.86848516518117,14.96355075803162,7.732754111764146,17.766426629216166,19.144104062090932,0.39455012586242066,7.9137214519463805,1.7264364673464527,14.769632640366774,11.883902400983084,17.443402455370467,4.406887772882442,16.409226491233042,18.875164091111778,8.355396367098171,11.11026285206421,14.989384997654756,11.054357527544694,4.1621755561668206,5.201063161465371,10.608424990245418,9.751036885800524,10.597379848728563,11.496368751217222,15.359853119192408,0.38258244743631487,8.125234582981467,8.670900651258911,17.316457776102055,8.933554213958095,18.688443246240677,0.08333133395519887,3.28801145633292,4.788558001361558,6.301511031182745,9.084675383159304,10.66845614717339,1.4172430111440226,12.310252427260515,19.312879545791645,2.971301123864083,12.820546632544945,8.356308354375429,15.265973333114724,0.34906910719168405,1.9324462245242646,11.08238098520955,9.693748571840551,17.08671159831004,6.106641833692672,17.485948197838894,2.5013712728215554,11.947982583150969,15.560623165759138,3.8671888947406385,14.928648504981098,16.94947191440187,13.38492951153366,18.932106747106957,4.220102739355003,1.897817708214915,1.1744152649370498,1.9532413232686174,4.152422348830438,4.276817772211028,7.556816039568699,6.974353673151632,1.6981502471595222,0.9714392437398844,19.66364175487066,1.351335967829277,18.511416084584795,16.686743919704405,12.068043764862075,13.886012364039635,12.684005398682757,14.287932458461135,17.91115368772125,9.282303455471364,11.298521073660748,11.321527929168088,9.78092632410133,19.1744464663533,5.980253220898359,2.3913121096340584,1.1690432738408019,16.85369499286088,17.046121140946447,4.323546191732572,5.3518795639837835,2.6909614670596227,15.509282102799471,4.962117728410358,8.295439291612077,5.059943583576443,16.3149920831184,6.670457301454786,2.3588761414870607,8.290687172078957,17.558050635267666,5.643069497228388,12.390140191539896,5.457339155064025,7.54418171316956,17.5052498533925,9.691222443335503,13.305008839759612,13.496245502418773,12.82891085996155,0.13595429950917115,16.805778692965024,13.773290809692412,12.112825849599371,16.697702799531818,8.718489294554587,19.79987778886141,0.8463440742753381,6.8603344416797585,18.54098397593035,17.575681014134954,16.879155740015605,11.524827629627165,15.81590653520173,13.553775078587957,4.53987510315756,9.380554372120606,6.100099245060626,18.62268389999867,14.076730686085215,6.958404442302499,8.612218932686071,19.885705628172396,4.304271288460764,17.053639947122857,1.941201371576149,12.084130064681805,7.493522206127956,0.4937483231242412,9.915753518442273,18.129352612088574,15.988889695849263,9.143667699090994,0.034783990263225206,8.23229115577821,14.144784557839237,10.133083464409491,5.865781991815222,14.763193958839441,13.222626704449244,6.966051939918914,13.401479162350851,7.052074606469061,6.334592657299929,14.639195427013538,16.922390506067813,8.153553020708504,6.575258287887276,10.783409587229919,17.26875872916114,3.3831794946538096,4.148055205495265,19.736895568650205,7.862874207083359,12.500744020398088,18.147421575865657,6.257301363106915,10.127643190909005,11.88282286133504,12.947136531819815,1.2214615785826766,19.99953557901623,1.2574370946533397,5.915091615471568,13.907450854132865,18.563655708856746,19.751375088693703,18.833010566585287,16.46194303924151,18.0634242856012,6.3812591229724935,18.113422652990522,16.212159483666525,2.0049909870101645,8.000988192709645,6.794684092720367,1.6274914967989984,16.301700508579135,11.61693764369851,6.285475623033778,16.979538569360408,11.558744182437914,13.428049468800548,8.559951806463966,0.44519447543489576,17.26887597485636,19.294957761037466,7.297448998004041,12.073480416086152,9.03130668278572,1.6352094888461455,9.706040958308243,6.976338470044268,8.95473727351387,3.1878783784909803,13.902908505461875,10.992918214921467,19.346454451996387,10.263498681694813,11.184749498671046,17.04072537739694,2.64182760816309,15.112297031615874,6.217173040753736,0.1212181303698312,16.292782542824803,5.952350077546034,13.963330043310961,2.705477596891117,15.911605035765684,12.443916385571239,7.5841445379010874,3.003762144179185,11.248251996454123,3.554309465706482,4.914176647235582,12.402872188666834,7.4247287638550485,16.661568336594186,14.756869192858453,15.015018358840795,10.692127108486758,5.390666827667507,11.869842165208052,16.097281808113955,16.80303764025672,2.33216643224599,12.801917362326938,9.698457497016047,6.417687212696261,14.620858953893062,0.30192906996386437,15.13038347360638,3.4029079389976724,15.724814640564176,15.995317564109639,3.748855645762008,18.02378927624234,3.0847125010934207,18.980854669528387,15.395086914422041,11.9326281715141,3.3100895220835413,14.314862824900217,14.356799018285331,13.130921017442727,14.597232610850357,4.212196549141978,3.7607941612558937,8.81116365519755,3.6758125849254597,19.123573268740095,4.001722944428079,15.333038349176395,13.495252502395916,5.0356118222002255,4.182758311566279,6.191954844737775,12.528941706534473,6.126616706673382,16.34822885986918,2.858839529060271,19.55603546063104,4.91245926410834,1.2510439904112802,1.824177340755253,10.85023704834657,13.083514093756756,13.860790003361165,13.96084130527569,13.737822973931987,8.617107089819651,9.810501637007185,3.5488641147174427,12.832867769369365,11.680221020592185,8.447360919557049,17.295001114232885,1.7308083217078352,10.56586790115765,11.54292264617263,8.55657138933891,3.520783303015258,10.281025647913076,5.0895362772991115,6.317486981273475,14.372289280957249,11.343204384083677,16.68714579311984,3.1298412109946216,19.00722507105766,12.990084657771792,19.72004740288602,13.665784488655923,16.03130707120159,8.565593678728355,5.062549176366775,15.344024302180985,2.735827296478881,6.978039024313034,3.4921453504910005,4.702896683657785,14.808807779650643,0.40154078715589403,9.374570036423577,17.23005861240264,6.312455549755165,0.2505644930272055,14.052636463794602,12.734259359895677,0.7875795719748924,13.259092741804892,4.3219589223119215,3.520210863983566,3.8044402123035503,9.404672195918229,2.62808477042908,10.913489237408523,4.283799309443959,8.747904450740789,6.901749544549269,17.47648679667766,5.087690981148829,10.36127084861064,6.887311408913384,3.646289075019027,4.167279599126887,15.661290185594439,7.752213990512153,2.7476257544221783,2.023017744867368,11.378573002147379,14.60246726738033,6.8163485459708895,12.147044815321863,8.89948710581551,12.563024455484122,3.7557718990184874,2.1696083486517015,9.2751143223835,1.8840105404363916,19.0649536220409,0.0595275783696092,0.6511110414459997,2.292604390750399,9.374614487217446,1.5141617012013109,18.694780566865973,7.846219712909446,3.250968308706268,6.205981078357907,13.782314550561953,12.694556287167575,14.55651868603657,18.93683113827756,9.857682235963953,0.5092044719835087,3.664901870922903,19.84641670973804,3.576216632131266,12.738949821509014,1.881494411758644,5.980211468032146,12.35899351801761,16.495475624282086,9.048045427304721,14.446937439266474,5.611362331647043,12.47804868028263,2.8275584158982126,19.602772775384445,13.200522919056441,15.245167409166186,12.0397975472892,14.02992620194457,10.645827888127117,18.658581949979943,18.504901056337857,7.942489779753776,5.112834782025963,4.731247294367904,17.0224238895138,17.25239793534908,9.84688626783015,12.71311192214509,9.556917097472542,5.915989461794164,14.12887707937756,0.5213123901627048,13.77810853900074,18.544536656651722,7.2702933130380565,7.974383925125084,10.243943121300362,15.026511292543194,14.61059182161241,18.279710031440537,9.956220168329363,13.39309586971586,14.256323925941622,11.345506240216622,2.862515615841059,17.668591250990175,10.112583670424758,16.33866022772117,7.046055948132732,7.312847775593148,9.425322824816549,1.1342089796582933,12.84310019068652,19.613884662816265,5.697588759576493,4.205449930052589,9.330167180425413,3.686324802486882,13.05416816420415,11.335912807769844,5.880721948858749,15.72693576283314,7.539345740737149,18.694326503366394,16.50441858920848,13.222092743866515,0.7504011187273907,1.7148572725557365,18.977214736224628,7.342230087600612,19.780628035786343,7.0703046940727265,12.335779673879914,14.810464863308749,2.122834195086849,6.825262761502167,14.309437593715906,1.7416985033688626,19.32488263223648,5.969585178267565,8.058621609171137,6.983045016468048,16.47308341570078,1.3790803390947115,1.5356358226019573,16.170733237393872,18.720828456105977,0.43764539321322626,11.91825547983479,9.686894233306166,13.771545369589496,14.784551137403138,1.7761839742207908,19.739013454619624,6.586657190781855,2.5769424643367067,3.981459090049939,18.63353532328294,14.917263987823537,0.1787174515521217,5.913427282827279,11.905144542915455,2.522352452476455,10.958881150869635,11.956824576911824,2.2488877646642536,13.849371827228047,6.336354241596225,6.733037862554303,0.24421628589706312,18.86170062067864,4.499886611862709,3.329632886413436,9.135740325645685,10.020580948704435,13.316590280337103,18.11443861966984,2.260438328945895,1.7313698070005845,8.209271142988758,8.948411521089167,1.2977636443269036,8.760888768797432,6.566994206880974,19.962787213625045,0.04568230809397722,8.841352046825506,14.429363827405734,1.2888524219003905,11.542869159348932,7.199082145090463,1.8874086532822965,15.211569863414937,11.702870095880131,16.53348469781554,3.0755739394497628,14.70491610840044,9.980144384326852,19.63183229751141,2.816529484318,3.202219468683314,14.278706007878771,8.715904195239457,3.7876850688322605,16.905547937141453,19.090633726123052,5.750380284867855,2.125648920273613,9.861308443616355,9.618510595378837,5.390386386629178,5.680450005394553,2.3489352875936653,9.90422529471358,14.572995495323301,17.0264316377756,6.841261629452955,2.140144962366799,6.606922652917029,17.60051625810053,12.464004818078962,16.13344195386833,18.779518235981204,15.205606698808474,15.618678244066299,13.383398680095189,17.06004806466501,3.8492067508442807,13.963319114140216,7.3341057014556865,1.334627775970989,14.627473237155444,11.074011761333292,19.208117587021754,8.421883104289098,0.9418176237872045,7.080861434714345,14.402697063575394,16.415591606523225,7.011490117163595,0.2888769863153362,14.967676949733036,9.197497694345337,14.153722559794875,13.238296268293777,1.7789818334703833,9.158393307789265,2.3556491398570234,6.725930661197701,12.276089609167528,10.911406289231845,17.5460058406189,13.97224354552888,15.282252630698508,15.368883289157731,3.285606950185236,1.4129186073792344,0.7522207395413583,15.06325313092756,11.270349078947884,1.7389511174755112,4.057724542738508,19.52650910252114,18.94702842320843,3.6844236699874733,3.5857835684201156,4.565279983092982,8.71265986957888,17.30490232801135,0.7229713635108403,16.551584730020096,7.591636711885443,14.417921902067574,12.70539021802291,16.98373494461505,2.4257807495475836,2.3954114043294394,8.369253443587358,8.60201332936791,3.7993159000491117,13.614830597527149,9.942595308104213,12.697698833560608,11.67758514391197,13.565686069645583,19.466801900267797,12.455248957408305,16.380092221113234,11.3970149752123,8.889118672067271,16.874614273073853,8.428589128913728,10.289664289217235,1.1243960010689769,4.690034001600902,15.722788995786466,18.94902573063025,0.5337478079613067,12.729714466280377,16.108816337401866,2.0016038428921323,9.923945571740763,18.58754710079756,14.457867039089788,0.8743992421793712,13.76212379049436,14.76463554211968,17.62586796177867,18.87888014622629,9.37527183637831,7.140815222963304,15.623154193420884,1.262506723867256,10.212610570162507,16.71722859955735,14.676040983703249,14.855897022350334,0.36643742130047396,14.982789726853154,19.16611000352692,18.087881726920738,19.898105925290125,17.248905677418435,2.355248157448333,4.456106053064226,10.841890354288722,12.588327947611022,0.6770040949436895,16.454104517467307,5.1233191139277245,14.296288912936234,13.601532775892714,16.638789190263697,17.52841267585692,13.192058098198927,9.497307228191572,11.596503232446205,17.465434861036133,6.0717186292880365,3.3730862314318255,6.460267456796291,5.327659808834602,11.719461185430617,19.78309723328673,10.59257623128154,16.198656880381503,15.690264664409188,0.3399333437626728,9.500648005481853,18.462599217165018,16.242702928000146,1.2522327560931856,8.112253509828795,0.6644775161185867,17.721364837360557,4.740603457137573,5.438179623445123,11.020936432799125,13.928535055701028,17.70230945756376,7.560789233854059,4.928927002350494,17.761286867238884,4.741074448339475,4.0315570262487865,9.456234087528044,6.570982178089264,13.366174567054028,4.194160967529177,3.0029139705890318,1.5945200802136394,17.791442072340054,6.218499897024619,6.988923261624462,17.372440070409112,1.9660253254125992,3.2941684970442697,13.55523852560534,1.0871100365223363,14.850752420408702,14.780118976571949,0.3370779806556401,14.304627208024376,15.61041287322876,18.765745278652147,1.1886816133342437,9.878553076413606,15.293830355137477,12.205381848910587,10.240571686078738,8.682962454527207,6.340756367403326,7.4481393743645485,11.14200116833147,3.7642780477238746,16.287623269024166,19.373292148294613,18.195503737333322,11.461843486214093,11.272479612561108,1.4284449239300123,12.89577812929899,12.61944710967095,1.7585015002990323,14.522033594403494,6.079965726667131,0.13281202457197328,13.00316665567436,14.523690071353661,2.3775033533957846,13.840883782962216,2.309139452864706,3.5119249040343226,7.339955326308019,17.930418526647237,3.111087467194671,17.101198721622985,7.763653555714156,13.100227461976313,12.917270521607843,19.159601711917734,2.3393982117612566,12.411074192601417,8.059078816195262,16.536013618232317,1.6453023954824486,5.269312770106791,14.272079361115013,1.5845811584957126,14.085914741983746,19.125470237342096,12.26085733992306,3.5639703896066743,11.156244688516663,15.249421455054701,6.646743053548212,3.6097520698135677,19.448678448923218,8.4407529909691,15.23336025124005,0.5918231864213919,9.126931975479469,5.106482795491107,5.303372496200112,10.735594162403013,5.305562461550264,5.4068406071628505,17.372846403312202,14.954677844837407,2.96526097672015,14.988309884938737,19.878019185997932,19.44358061535704,4.360582204142531,16.590256503659624,10.781517600323527,15.227388455831443,6.321583198290401,6.642004917321143,11.91521464011959,10.616836248688251,11.700569169045458,12.272763468373151,4.138852475852688,18.41297988838686,7.6333517981019305,19.553795261285714,19.13808896182179,18.73269698380398,4.134185029997162,18.102386546326944,13.814733020265306,17.799483678826654,6.228450415953692,10.122721507083625,11.447423029429773,1.3535272826646416,18.491497881200768,1.5768634070100207,7.231290592894268,13.87717164816852,14.349346094716221,10.752704876054139,18.834475263529118,6.6435970950879675,7.998942931791921,3.9489196548709726,16.02688327934637,6.670516715668331,15.702460647351554,12.980265380579684,9.406779369518198,0.9248350347397238,3.3683714149261235,4.933157099472827,16.27627870908586,9.642699490030786,16.664767659576732,19.12143895567359,18.247705137278718,5.916896883898661,8.30936455486555,6.057383535502141,10.707380968960138,7.726725086006483,3.9522538105173988,13.58814815280307,7.006561913165146,9.729847115722844,2.742016221668244,6.596895168648622,18.93016935806869,17.198716553530637,18.24902999987385,6.325517003177659,11.146769104002686,5.976533337540277,12.594753063809843,18.402765041275188,19.356934722045295,15.101635890704017,12.909621567271682,8.768989185152861,12.680506564883206,0.48825319727447525,10.517357739692512,1.2044309703116252,4.2329443561260005,16.72803747741076,8.732657439745605,2.5651211990488054,10.004209485208921,11.67899111324489,4.354477713948488,1.7686264581798472,19.554906754162328,4.673778503546839,15.582954398889939,19.231981353108285,16.97212464654609,0.783595613549064,12.460665764587695,9.296939509027279,16.472333850238307,0.07111754197107967,17.57559537784307,15.167515096313512,12.292629357469789,3.7182093379920778,8.280077896104672,17.215219566118115,11.276083734391218,7.324177768585498,9.475803330738316,5.988219616483583,12.540064845741853,9.725181650881488,6.482035784250102,11.634666945247245,4.201547545202757,11.583375560566381,9.641711857054819,19.515822776666127,8.502399806193296,18.845661881565213,11.797755877436504,2.2287346282715292,12.42286368289573,19.535237481992276,11.195160589747895,1.1754825244395173,4.700080525599053,7.852914291955746,17.143175831066564,11.82217221383722,1.6611206459488859,9.574260594928464,11.543136249851988,2.1401191337669756,17.818291984178217,19.47936243341582,17.947178259717937,15.681051223538883,7.741610182178085,12.806459275516557,8.38900212102577,7.349248724683486,5.913884912862457,7.155527868131655,14.35770699935524,7.337351290037035,4.037989960699582,11.579551503911949,1.7934815764318968,10.750473420872261,15.277890590965892,0.12628571243981312,3.632846623153756,3.2009660530564688,13.88582941736557,3.3698413373493707,2.7040211862051677,10.503408293335887,13.980818214952816,19.99005017974474,11.285025559622666,1.6996441789271177,2.946334349386457,7.059148058933786,12.410745619227335,18.65772682645168,14.090034715110162,1.2774906749149784,14.56178917035266,13.042617108395103,17.433824665364483,18.86919775880475,10.88077473422608,18.855810731185983,18.70801627753214,13.136114730384008,8.966811193653896,10.39052080350029,4.537115467127677,6.431690360304048,0.14215174450668222,9.022876734284164,1.8515335518775577,10.984434674105245,16.86718782777919,15.872738735551613,14.614712328431558,16.686380662821062,1.512813415360923,1.4025293335090616,17.78586596728961,15.531710553665853,4.441920471722032,13.857627543913225,19.560262156016258,10.44068267467197,7.7168615795123285,7.52067114692097,12.034870390587278,0.4830533543970539,12.726938808995115,3.5680514183669487,6.45801122826132,19.59321884404477,17.06283557279404,4.31422449092461,2.906329756089221,13.372537392246663,0.0994959902135939,18.438137809807877,12.458599249545479,9.376988807015515,6.739516584818528,12.09396241140674,2.860358656328339,8.434081297856672,14.479029160051473,16.687373083164033,14.36138375954565,19.626257966222646,4.775841906739973,1.396382051784597,14.250541428950708,5.333327457138171,8.658965177624221,6.258982423406345,17.20392656968003,18.950978940293677,14.3743480062199,12.929515800909734,17.334746161006308,17.14678474717823,19.376624965669382,3.6324747454219874,0.5393612167058226,18.375733135312572,17.86481703502648,11.012638164312335,16.898312938257142,11.423994088493234,3.629664268118007,4.3845218791904905,3.1683260421394,10.225329531144713,12.64148827301613,8.950193483719119,16.929503727677364,5.465112496037645,15.75280786548741,3.5062456450760537,16.924492286819678,4.311449013767743,11.660626076341893,15.095731165675886,1.9675161151729537,7.918203664303438,5.253792869808396,16.652811244263553,19.585293505053656,6.449752847689325,2.189511894953906,9.33036115778371,13.796048679485517,5.66716763108241,4.575824460164393,6.461606543286522,12.279140632818564,11.329899403012714,1.9483616893402456,9.357084997631574,15.726366039964649,6.647976541756839,12.012486433571308,4.292474140418485,8.084723545502426,4.038779872087579,14.700275148120522,0.5883925989761529,18.170589565838245,17.047590872037954,1.2223551090225282,18.86271991952888,7.86241146352308,17.666571548421057,6.854428213265362,12.810248879499255,4.220405869893025,16.814140028242104,14.843724128201789,14.11102228046969,9.556716709273587,14.137778752657129,17.64771909240448,6.556264845868256,8.970393579541076,1.551375066502314,18.04808403978536,8.386934318831,6.557891534688931,8.137055957514278,19.07665757952817,6.717590920800545,8.588025393880816,4.32341651372846,16.390246692819446,9.25010705652534,15.888904046633696,11.82110721537275,19.225372783900646,4.740541066335098,1.3697449210689694,19.377604824987124,7.295683247087599,11.508669179532522,18.661786222195968,11.906911743348942,7.5212641411128045,18.705165930721716,8.382721038518607,1.3002131936292738,17.9698621325468,6.93099711270778,4.687746803226696,5.191157515581231,4.196432324553552,16.60202775775725,13.304328294046734,15.937537255609136,19.533231030067565,17.704482067350575,0.25091433935036545,6.821594899682997,1.1662417134254222,13.737552521508736,1.5285420240525527,1.3482955786017703,12.932506793831351,14.350788279998014,8.8813965941935,1.588135886438491,5.39278899710566,0.8835280530728884,15.682917673395389,11.490174215094084,14.538214985995225,14.363740050812055,6.537648305404518,14.353651368585489,17.81622899281588,1.0723875680865014,4.037379757750639,6.031443239943384,9.853723443495316,0.25885371626166886,4.973979015783896,10.363952676041785,7.774917619312953,0.76607483280001,17.19678328935934,8.156699857465423,2.233081109564643,13.451475343747298,5.025102896317195,7.321602630569366,18.20675472801745,17.946787998198552,2.431217802533112,17.271676493733246,8.79147940540891,10.648398370421432,8.089190839434952,19.377597374676583,11.833987339637826,7.486407383427296,12.349260633048086,7.238380733477534,13.682633401502905,2.193618941936264,19.549081035770254,1.8403745490993506,18.82228951595846,12.742939889246848,10.106058624401717,4.81660462415372,18.111882505875098,11.104470735996737,18.589134854348327,18.460377502511673,10.47469368274044,14.056438210499461,8.726402677869771,7.141518335049257,19.187378742810782,7.773712689767951,11.04266144461089,18.389989187096237,3.6318367844893507,1.9687931285401028,12.239105183334974,14.641352695834083,17.61016851809965,1.1255140043504896,17.47917785985227,16.06650407686051,0.55048963455683,8.25196562416485,1.7784177592733785,6.026798299182401,5.085351907891371,16.061496044989816,6.532259393881912,15.874541636967535,0.20090485163400285,8.368387514158929,17.838909527022302,15.819900056031493,9.02928800157813,12.294126435828371,15.64781418240543,1.603858771516129,6.8993538170476265,13.003583482322547,7.780604194139968,2.673396973944131,19.716716821547816,3.2520697715851377,18.980469654017114,4.773243712637356,16.02714729637167,17.208883578511397,9.083473697234972,7.390600655269726,2.5072983431096363,11.136540574375339,5.3373674353789236,10.125182424049498,10.13601289107572,5.560842860740656,8.846581665055728,15.65624559805595,18.84506370681374,0.5565053265464659,15.673414661946055,11.953503070035584,5.233827383751093,2.3889437658467516,4.3180681886251415,8.395017548063262,10.5028941731848,18.48415061032388,7.573573226917225,16.432339062581377,11.116816290964726,10.21780834632606,16.699730792087337,6.465565342323236,13.537765825823595,10.47793507092015,11.173105048892849,7.4767313031474725,8.405637545241063,15.7651299543164,17.872713654682876,3.065942105439494,15.240589957792267,0.22627594227975667,19.35949020948325,14.38159860831778,8.50714430316688,12.51985398908149,18.328541494008274,8.149723245721837,16.424872437769984,16.625386068038672,3.7831219427479645,10.074792932746007,0.240134803394354,5.681439403075461,7.929904730596684,9.070217499046404,3.6915010314493157,0.034925241367398385,4.491744453344948,7.3639069553181224,18.667480966584545,9.989164735227153,6.672489391493706,7.968519424515894,16.3444204823031,4.301593938743649,18.349148109912772,5.442353787869543,12.324414221042797,7.991779044049512,9.57696803148519,14.299978411660451,17.008534890237755,0.5795741308092817,18.981640859192712,7.24628698264941,11.973521884362302,9.865331994479485,15.3797708875261,15.467066355346542,0.5352271067806624,13.15663197607674,7.499386936765986,14.996080821821298,2.3132302961277196,2.855966843088167,10.558923185569387,5.774815951925136,18.2668774677858,11.004159173509365,8.416170609364887,19.77248579871898,4.802899084888201,5.3524567743682905,9.571460840608847,18.384005615776786,12.959019271382273,16.905748682015002,0.5699847805846892,8.369409487476611,16.819196740242592,3.849251158343674,9.8546508158186,6.475951150229511,4.229425535115441,16.330300983036572,7.5545111648688446,17.941979039551764,7.56375931582705,13.540791827255298,10.495444568205583,3.7900891508184342,12.534524396943784,6.487749962910101,1.8315758636905421,17.38939934035162,5.283845752094787,15.382760238057447,10.177254981683678,2.7177872687917892,14.843815564371425,17.040658753084934,3.815970033377658,8.121973376313193,14.327056935733914,15.989086417124216,8.583931847126847,2.4831171878856617,19.833639536938254,10.844726077667964,7.7245949544231385,7.7126192809845895,2.2186755233944977,16.181778312007005,19.77336810773453,12.56652649640094,10.403404466550885,4.971751100636652,15.402290617155433,10.556777305303822,10.066651280028665,12.926776221928149,5.729243310649115,17.630148207700277,9.707153233905771,14.480188748417389,3.585978670244141,16.817717996314776,17.409654865785868,6.891919649844702,19.883171208012275,5.6555890574809276,19.80113288195277,12.919766522810821,19.3810930007724,5.547196112091837,7.213032045272185,3.8351337643118244,6.330386574188052,1.8902357798942715,10.608345645340759,17.63730448208827,1.8110018777695513,2.675739698863686,12.103130800679347,18.753319481307813,4.363407328095317,3.3804226404201465,18.43518623909234,17.609010655552353,9.191657392900332,9.246433044366093,7.0806315993401725,18.67278691630519,9.130266636702773,0.6421118969285944,3.2728048004989896,2.9921347438848223,6.438865622944037,6.693830476444571,2.8914581125634564,11.30788117695654,3.819675188062832,13.200093458308455,18.921341825039907,13.93093264088991,14.24740136532141,4.382618842290036,15.229536005208724,5.897663659374812,11.184762851672518,4.320287989281897,5.759316614429828,11.674825532757529,2.7043483948778,1.3575727152295292,12.137130915048981,7.304984450871457,9.395573639451232,1.631647794404496,13.592673031531458,6.546427660115834,2.1615482447169265,19.269626118624068,6.622114690327381,12.228227244992688,6.021196595008229,4.799335275257568,15.207547387396737,2.0025023774816253,9.777669338866048,3.3334136539710757,2.4375489835217445,6.725911839481755,8.735898294210047,8.73641452381342,1.613431929347371,7.269615549623718,15.147672701799788,5.425406662375711,2.557642374287701,5.711531451191116,18.105520373844005,5.747307039248639,16.892478176772205,12.339707078434522,19.61568673017255,17.25345157344293,12.300478661278337,11.356795973701619,4.7926292809089555,19.688305843148036,11.26769675313064,2.6028353672314175,8.851557912194842,7.776602140973856,5.84700558591718,11.761852477369668,0.23617052990747123,6.553396767540254,11.305420437823862,17.02222645308051,16.054173720708317,4.7329270873916895,15.583807467056294,19.34369804530968,3.088189046071337,17.96879399067611,2.236598824178193,8.029567382454825,4.632150843218095,7.430184494473471,2.4524192514381182,16.296641526503276,11.048505720342817,13.925182608171141,9.373177259073259,7.426039860900593,2.7908536383434868,19.422211740757234,2.01496508656017,0.21736272776224475,1.3691220939823756,17.511430820451586,10.959669626429598,18.07193660223472,14.138105965170972,9.62157598084081,3.9798930476317285,3.9007150529658174,15.219353899675117,5.580954044133861,18.31591918252659,19.903871583347936,1.946517181894234,19.79885742779315,6.729800119675318,18.550577784455562,8.31520636088484,0.7295292956646149,19.20493074173389,15.293823980861987,1.7639220690245372,6.073871089050362,18.126045866785102,8.927911452072376,16.26199041367714,11.013671120316628,1.7682285823046051,3.4477266898805636,1.875309760174435,11.938874045906594,10.589170330128802,7.695220915003702,11.613581638558944,0.0710036699167782,14.223890673974648,14.488865004373142,11.536598954137794,1.9920287243944301,0.49018319372073904,11.543428324595833,0.1820675115239867,2.140472950638066,6.144586782878219,0.5957410767289595,14.865175052032953,16.130451467122455,18.80355695411293,7.4365110337943685,8.623313774314365,7.119096348991505,6.9742058085693115,5.941553990864246,18.023696078533543,16.273534866108825,13.089311959356529,16.00366836815642,14.958128992929565,4.745329590586751,16.79189759779616,3.8606411168556143,5.978014668339289,12.66044139523526,9.929567991568224,0.08325734519678107,0.8188027791928576,6.774308956127388,5.310430921891207,16.674260457619148,9.30449935609949,0.20025932088965082,6.000133524135145,1.0590319080192456,14.18574482998666,19.548033014243646,11.240463779428937,7.502290945900403,15.920923247983945,7.476039909416996,14.238282132023059,18.03582773643322,10.930322510427164,19.42200108699624,18.826876985047672,7.25540212582465,8.327982494406637,12.994867828305065,14.65922474239397,19.534945026815898,8.846755665661469,7.389815244546356,10.726273398312749,7.43373127335432,2.5119812982787826,16.511045147545886,0.11205579996103943,18.266885923757226,14.512432646127603,18.893150552846926,12.55511521280821,13.703353097603372,1.3949476463972799,2.090073156869332,18.068030455992307,10.996722439585627,2.77969576379399,3.7240806328687626,4.813619445326616,19.749615398602916,8.775599805153046,4.723173390393147,12.076117049221384,8.960706571199761,18.4032426662837,4.952207985467805,9.599120338632066,19.081240618881303,5.748319255529442,2.462110588998847,1.7937112553254853,5.438625091082323,15.62360422765519,8.95066060104314,8.440650156482228,3.5231165919391394,5.409870972394706,14.990016018499425,6.397801303045787,10.718370588240674,1.6927489269608609,9.585235009853212,15.032297433775623,4.586127322723952,17.81505663044138,2.684239070418455,15.23127734757432,8.750458916529432,0.16306827838612925,0.8910581696385789,12.639126670685803,13.32134643382481,11.19280521463438,1.9427446871135734,16.598181986435257,19.450378084812222,15.101723291559024,3.31112596357348,5.635873578009232,18.793061639546515,0.32942160872412085,14.534059769614679,5.161003935636277,10.629325023517154,4.2081086196659,17.379966285750946,7.478644238673344,6.496665032515163,14.301911424205876,18.17570229567981,11.20455827314268,10.120220962827853,1.0901048990201234,11.70071652425328,14.412219679074457,1.9709424284632027,14.7144964833852,2.731719549703886,6.171665808451263,4.289390306450889,11.515004235872205,3.8902246669789475,5.279606984407841,6.220461166960574,2.653190829596319,12.08820198237433,8.60318813783751,6.2680625136838986,16.209201735597958,6.695757635857222,15.012080273075107,0.17320707565822602,3.131706994204664,15.974891844342988,3.8087198111896203,7.809605043870458,8.100330106373095,14.577330591983282,16.521931447625743,14.183755900392491,15.07374918344205,8.97095718735423,16.875732116347958,15.818689714054063,1.3132174209576464,4.54848552189278,12.417595656454136,16.985540373889542,10.351158205595903,14.439413641193898,13.991819808375453,9.254750003006858,15.95486795376634,4.227489396685233,17.687547164349176,12.9984809121448,1.2684244683450308,7.840197438714007,11.125829432954099,18.37561874926643,7.260542790408477,18.831222844456384,11.28457055595212,8.381594449970656,17.036610421467234,10.667085223777422],"x":[9.619326078840187,9.682016508163187,0.19533890967097456,7.400251428921236,5.279398264609565,0.30071008057958704,0.5994769640849462,6.623795329815736,9.921542842072611,17.32711973875347,18.60593490942071,19.411270801768303,17.923173676354644,1.0970507104160188,0.18922906820133534,7.754337028815947,12.82530059419516,12.4006656323159,2.4144042492484097,4.329071202877768,6.7945883032032794,8.79996629041365,0.49478525051357636,14.67245115694178,1.0514813932257638,1.7265724168617025,18.433724207336386,8.391681355267536,8.868618275671727,13.50217594947241,6.682808713748756,19.169205998169353,7.666393577745492,13.13126719593658,6.401838947002956,5.895043110210323,14.287202294594001,13.696712123662769,0.4697390299715165,5.814316191660307,7.750355513030414,14.218304885684972,3.2741270725118365,14.384217146346616,8.896459769585782,1.8076813101160427,7.928824457433081,15.227520288085952,9.975086809182528,17.611539415032702,1.6805347141704363,9.1956035692405,4.547944974831912,1.6166106493585364,10.181441320502831,5.3424203189067265,18.23497884887738,7.754385308826799,10.803093638208061,11.88933152108687,10.045344247136384,4.009658349800018,1.594297343474298,18.056718100817825,15.779576900427488,14.402798322592044,12.347401871693693,16.744511793759283,10.447676803237282,17.171277680524128,1.8940693612222814,19.180731389337705,19.172331324674317,16.636196027738826,0.007615705547032725,12.640935861435008,6.161666173877194,13.120517134637865,13.568813292113022,15.739034432027506,0.16941196583345697,9.896062666113288,16.08667480565248,14.589439112504987,6.184235883754288,9.834226241520163,10.41972545331955,19.05004211720057,11.164377710171141,2.848143443307727,11.631589944021158,10.802287637887847,0.12459764865740741,7.347432229564141,12.735494700869282,13.331693607969811,6.25266804716909,13.639599798779308,10.106465102627272,7.192414422119828,10.948305096787045,19.280160756179324,0.666688641458637,9.925792147044387,10.311158404809454,15.44986436665253,8.544003845738812,1.5774878025124028,9.062003862198482,4.704147335002871,15.252280365166119,6.173061902210373,4.7360491950636385,3.8219422414469006,7.018323786677807,12.840689633291994,4.329932382891477,12.07366169564036,10.691286889799652,18.037999200654124,9.148626349301804,1.5544124219883404,19.561323826444188,2.7759849196589137,6.1737733218541235,15.606032264231295,14.007066051219299,13.506915094521922,11.286335411919573,9.933987099189117,7.960247486030503,9.70006074577515,19.6315235074039,19.012896542929454,2.827972872563973,13.52514933253849,0.8335726913244246,13.91957433147391,18.550683870477886,0.6044152696870286,1.6564975130334547,6.750107903639577,12.75398162361065,12.171182189476259,9.806626033235379,5.544211204725955,6.668385494265068,7.351179982329077,18.6711740973176,5.536499779272539,19.446996251615634,3.4667891395821337,12.733017822848272,6.253684558175299,5.579082467487204,9.687473540684346,10.228230880203078,13.568247608586388,13.524876582268153,10.844168042755769,15.699640565224886,15.71929689150056,0.7274235650694694,11.202539873276184,7.24050151001415,17.73279214798032,0.2593410434102017,19.306216589091505,1.7370960287333803,6.607931865429784,13.823979085811509,14.394057408747862,2.679688223685175,15.91242005531937,12.446132878887477,12.862397186071362,18.667043793301513,18.113143339367575,11.367887048651632,4.178915205711595,16.241165297308658,11.93720245874994,14.112998532488671,0.24062230051186795,5.2203852899944625,19.916326461323386,16.282761009501378,19.504590444938614,17.047208085952505,1.8836684668951564,15.478698397908076,8.331340453646888,11.006447266557151,0.8528964115091275,4.782443474085953,1.071895179471083,18.076854890601197,9.892940148773125,6.578861831407319,5.278366163346733,4.254096279625901,15.834123631578594,15.077290744184356,16.8041246861479,8.894721823690098,16.687094400732896,12.8499323476616,13.122412132768133,14.455766675728006,18.78712377436385,16.96381052722017,6.68028429392959,10.998419616336355,13.761189758950202,15.411807862479119,0.5023118721649578,14.665537661900627,13.268005167834218,17.829687783559585,14.15504497366789,15.129999540041759,13.631681406519341,6.641598830228959,9.081926473839461,14.565402279141564,4.67992732758582,11.064560026974682,15.18454966766273,4.70989809773259,9.014281391885358,2.7950802437353817,12.691053544354505,13.931867919586143,8.634652952589118,0.6225580714830503,9.55704446969361,1.1221172451108785,12.051101566512376,3.087463831564521,18.518783332233618,11.682543681830563,9.948232168474703,16.53779512733871,11.385013983013717,5.187613924049592,0.4175739762931041,2.757924372961198,14.659911684255139,4.841076604723469,11.418483878255014,14.041428270850007,11.291117206056697,1.994392594202079,5.901953585823301,16.365746339233283,4.276185391858274,8.575004279803293,8.765440496986585,9.046394638242884,7.470056294948666,19.796739073728112,13.136887027543995,2.0320538109558806,5.077496554410912,9.074656044565529,19.85855287034815,18.48593763115022,18.82458625403825,14.974672144294905,8.113106248792947,17.94967392246033,16.72681836729425,0.08571692325598956,10.815861603091053,19.65698718536078,13.471551550665893,15.965853203499062,3.431860931852082,6.692672198278622,11.737229748764303,15.874218956739497,3.0363978302293892,8.381924881282998,11.184989268849339,6.092245280354898,6.428469672850987,3.2929486859514467,5.107265829497392,0.5296294622081499,18.50935091900521,8.458832396571383,16.07474577443872,14.795908304793066,4.765958218790374,8.843176156935627,8.899113168398106,7.289718123708453,12.99634212939794,3.256332214698654,17.581403376380877,6.11359726826437,8.500945440501152,19.132578341362585,16.391097669966328,17.16390288586583,9.106225991780876,13.371205419736754,0.20591198077896333,0.24617971901317315,17.447649081482304,16.689473084267824,19.502253214994234,11.18347352791973,17.743533136887947,1.286398091593095,11.78387485113575,1.5425304697630304,16.660703305245022,7.4535676602642065,5.5583328039951985,19.843593561902054,4.099483741909156,1.1689311349496512,6.350508022871053,14.582171460378358,3.99086490633191,9.070054129913316,0.5111689382597007,11.683212829499677,8.211284983699612,13.285030990724923,11.285041373217215,13.727743783047647,16.85247120918074,16.14663119148354,12.339367663747725,12.815284894047213,3.081263975357995,6.212291483318326,14.173261234221322,7.429675861130169,8.370885375756272,18.53631452713046,13.979208770142982,10.588615820447096,3.5426387828933414,0.44497456113778533,5.952869673118291,11.392383685205125,17.66128026069984,14.28850881497489,14.153768960595233,0.5393166707487174,5.381069186988148,13.300988808784426,7.717324056682693,12.922906809353822,15.573817217388646,9.099229223763423,8.697153560765702,14.446577995323802,15.399152191697896,12.237370837016757,5.2180701481347125,4.402355543456924,13.513565259460186,16.28936243242184,4.264686370167099,18.121590949310182,18.353558158264253,7.565301063680758,19.72331670476602,9.923969447085508,18.570666783166416,0.2871379093422055,12.5612488969379,9.850531655539507,12.313034037001248,6.099829728490684,5.007607651555359,12.699309045735339,3.5192240146830267,16.046178254883998,17.215779190943422,14.48935746462979,18.685969925581574,5.031729363950621,4.206445153339664,4.96940968000759,16.579632019662544,13.372984090612764,11.511705224877913,9.27614761691942,9.746416701399765,10.390176712410328,4.238588172337474,19.61767552729324,17.16922695323486,11.116197415246658,4.948354909038968,13.869603220928909,18.547922407094312,6.091653395925736,12.40469250048712,4.651230095444698,14.809539351445427,4.564123850523489,5.160266808954397,6.949077334051963,16.9578963533383,11.484490405082726,2.7338456022582314,8.616318278324142,1.2655010089425822,10.31529144485955,9.291229813425552,0.8206631860883773,3.6191474375723676,19.131631326155727,3.618803758694513,11.496577665018343,8.579468710524623,8.797537632035608,5.623892637893477,4.479642014637957,10.758061439632879,2.625906338440376,1.9197684733350329,9.021155350678836,13.350548015963941,14.509041038392617,4.396218026120291,5.616085865652849,4.212748713291927,4.620058028607672,13.358939388572061,18.576162421144534,11.774419478958116,5.39471753317748,8.660738054746835,12.1240521505102,0.5954503856755533,4.62965163292731,12.008839248351952,5.232037000361962,15.478162975663615,11.964318600180924,2.3866500569143367,10.099387354768323,4.123762332114005,16.824195602123353,19.968526811221622,5.050990935196968,19.367347884709908,1.0688526683738786,12.771393628090761,13.724162607764946,19.165613121333482,13.797378309001536,19.28422762970839,18.872809906340827,17.303316294165583,10.393558177954123,10.84577167793264,3.1222920948229405,17.737996315002068,11.875655801429819,19.821181479325574,10.581807397952524,12.900874163213611,18.343516958877668,14.603601373123372,1.0350403018018284,0.3730385733331465,6.442867815660471,4.266075514226935,12.41374497445272,13.758367673570602,12.890629751263996,0.47659248084553685,7.825383475054459,19.96761539020293,18.630005226249864,8.226055969882026,1.4023385768499264,2.3849784361211768,18.385847565906236,11.377750202753859,15.53409418506012,2.5762277379715703,10.017602352076302,12.49992385209207,13.95666288084799,12.959969762242668,9.602781527118264,10.26380805570617,15.649670883023571,11.638426658574218,1.037057222069393,10.297951462811113,3.9605408007413034,18.765038173538834,10.795997277952797,17.38755356406353,1.7382064920046503,13.040846496916885,8.923730777321378,8.165092355152188,6.540314004723853,6.319356272228176,2.1934699618676534,19.774553751662104,1.5594774422504232,9.494234655291493,17.621138951697667,6.647591310941214,7.423892016453721,3.6272684194779226,18.393101710111317,15.541372650637015,5.41836212438644,16.757248005647156,5.335516010752954,19.77594081286856,11.046906299928096,9.215604850341528,15.143215444067906,4.315077636401603,1.8911148724508742,4.986705972264982,6.6278601424466554,18.841287225494018,10.910040092991826,17.666138475178556,5.6077285747218,7.155324712435522,3.9993994265064403,17.922034553758017,14.135203716562392,6.491827301554465,19.586023241363172,11.91205825133232,2.3307615796168646,11.946545643213252,8.794518301868667,13.0478003235815,2.6396415155906006,10.36273511873176,4.556772574336607,18.945323623068695,6.733394895783356,12.685205099321797,1.8914980902750234,9.27473869904663,14.244627290156235,14.253648450716515,6.422797169946515,12.423740970452698,19.34178033145351,7.0595166402751675,2.866638870278657,13.091966853644452,2.8641227488888754,2.27867593637308,0.7624324739721722,14.85405159161889,1.3879659824824397,7.269313930381562,4.2359266341586554,16.981512184131745,13.795796849853733,8.919379505892561,18.016722488627227,17.074776653897214,1.8418870828589329,2.508486778819723,7.5298455726909985,12.709268901481344,12.9190597701464,9.092876916329104,14.083049541886705,13.589374798731392,0.43953315102449153,0.9228321672880613,14.519546552205366,5.87341289148875,6.042323672437004,4.273563756374643,3.067829777637785,11.240724501953618,1.1240111107221296,1.1980643866874319,18.227877463842876,5.658681194453452,4.577620580723165,10.915940707465243,19.034884726362613,8.344349731075514,6.406064742690694,9.386819491233492,6.175814353992117,8.563942605695232,2.428739882906785,18.16189736955009,15.251830546477017,3.0539085217955186,8.352190051573842,2.390307193915957,18.015356035579593,17.46610123236237,8.384899226060195,7.868968903858984,17.847357538127,1.1709629330297577,17.807060379074535,6.521810180008867,13.029749075880751,19.94353368094282,6.635737806341355,6.146552806431651,11.286183070793555,4.937337293562933,11.2147049173692,6.153105438645063,6.69042775360984,6.577559571561542,4.492583879902594,19.643547228475544,1.4984206465072614,18.14674894866183,3.4279113286531526,13.742053846727412,15.271212926727546,1.541027649787159,17.777739246066236,1.5729853018444295,12.489067312442366,7.880467260176487,1.6392329763608382,3.098871649044308,12.839727552636893,1.153991107692911,17.10559817425775,1.7565017167523633,10.347544493990387,14.845309841164362,10.957930648899495,10.54961230698476,18.501416479390393,14.886326254090886,5.1596720584963585,3.08365032890884,13.576015629091769,16.53103757245256,8.383502936150261,17.915708406439535,1.946779436927999,12.491739253305738,12.983766568848708,9.106975286610645,18.332288867254043,3.546549931418963,6.039193758541397,10.91484423369069,3.233317389007584,19.317274282864425,15.02107270464569,19.696344817186286,18.840256731286136,16.89187059326658,4.946428794372375,0.4616577463404248,8.239141853136346,8.954078884401557,4.754984671307718,2.3550680717984607,3.2420277693380495,11.010741531985033,19.450068084044062,5.3777116209294595,2.480997262634257,18.596395151606615,1.4520995683411009,2.7585446238526856,14.719914548864699,11.415717968337757,13.994953710849959,9.201335388288934,5.85473778397803,13.098447594797392,4.603486166762503,6.135116666371463,17.547798396729615,15.55013564076794,19.860339446867897,9.183089509859208,11.209998535162299,9.206628752312849,8.50509729357833,16.23674419639652,12.881394762516942,10.881148476623515,7.6560522436627565,8.708387624461938,1.3203914161903185,12.3574560948469,17.070943440640974,14.029525955562354,2.5238854616700612,0.5106149449204711,16.809905205030617,19.057721225781307,16.450744058362282,4.5183748799516055,15.620609486383552,16.269854638469887,3.2771728158679547,3.893780620219456,1.1764282569633178,11.858210288880864,13.6641538018936,7.731123780295945,15.720692960792245,14.66118952274548,1.9596981079836873,4.656193785208673,3.314684345736305,15.198002782757998,13.457322844953726,16.54856020094656,8.398745760746408,18.126899350774302,11.748417852093116,4.098106065337115,17.395398152673202,9.272236406804272,12.223971081822231,15.010885458948803,18.77090213879931,17.03579249293596,19.207988083677154,19.789606504532284,1.5360410065667818,17.105878095608244,16.06842558848516,19.969414026173233,9.593217882334333,3.4591810081456753,0.09213893908259774,5.087004139498776,17.497661119092882,14.30390855518295,1.5949222646422578,17.627696971916457,0.15562322134050177,0.036014340183192495,16.146238446554946,17.993080732925847,19.836206383872028,6.758463685412175,18.82749608211485,13.014320262809157,18.508025684282003,14.177827431798033,9.426140461609322,13.256667929469241,1.958478684716738,9.059572536593098,12.905468787049177,3.823985995782353,17.966745561930022,7.135210457552192,16.27742695758088,16.87772075011358,11.493883508697781,1.3819174677481305,7.248989618381332,2.128904864383081,10.347597217802292,6.607468846002091,13.074290221840247,1.8547367469971965,12.045796506948104,7.67726149374635,5.6592032814686855,14.844735175036444,0.7418543323510862,2.6671508573213076,1.4355052254290435,14.793621230235686,17.353038665022936,1.632559074087201,16.6245758793039,0.6163979792284557,17.331486108129507,9.314612452762816,16.68973604990727,1.9904945878400637,9.792114889622013,5.726893826248909,19.536917514610735,1.7813056156680585,11.004166259540785,10.094332576323804,12.702567908726996,10.310523487338665,5.342719362507928,13.690054490035672,2.7978964822247487,18.76455993825996,9.92027483922957,16.85048669693373,19.24212849759874,16.947117340841405,15.485145156508565,5.062575963928513,0.8909991487212476,11.41740758072297,1.4469332175572536,9.16390946686574,8.881561424563023,0.11848721894017089,18.993312407540053,14.017055447123145,8.032181952919935,15.590265273269225,11.048502973285398,12.085545829687124,5.026070633432047,9.282063521772077,5.688715749640916,0.8659420498885195,11.712834460050319,10.8020764070086,18.187407471598668,18.8150502310498,16.652926799164433,7.688287419225293,2.707318886281569,17.455361091654517,3.998822237111801,10.594442518572528,4.3541992736560875,16.124407428998108,10.036812971940066,7.0323186469486565,11.82385972276537,16.601814112617216,14.927702152753914,3.6977307766922562,1.1251106339640682,0.5773807144895882,16.12544697698176,5.190759329308956,4.495017998681994,8.808005835021584,6.646843985321826,9.42672306686176,6.8968168901301885,16.240250325868804,2.2597243098419595,13.507278438407461,10.721467989525127,18.15134252518022,8.669249588961572,18.708654472846735,7.624163935652275,19.57890574582146,3.103706025961741,11.940796999184737,5.079572897542768,5.243052324123334,9.632945614953128,2.6519121660849487,8.759604049668063,3.315735064076515,6.994907878341681,0.2126174722311891,13.051718032528136,16.725272924159054,12.42649862746605,8.057547800765178,0.5324495452753597,5.172492818279841,5.124798613853705,13.694040069037698,18.276115974989708,6.281231787627881,12.150339800075667,5.412471613458343,7.30613689058492,8.339875090574353,10.221603206575809,4.159843301143642,8.84701638638468,13.817267831093263,0.594629061169667,15.11465351951169,12.882283240124991,9.712853180533255,11.108270489485651,17.927361826409278,5.324996478393089,7.688173734932149,6.56272846658247,11.243557884088165,4.72757908443961,1.5631635072352168,17.664707248865895,15.216419810665123,14.193179609588764,18.60463980393099,0.5205433235384715,0.13025559523693886,14.557610201340943,14.454751043269066,3.6068201589857862,18.277274203075002,2.3320189069590924,14.98873764826353,17.503687046907825,11.75955346916911,3.460878000113219,10.863361711699348,7.617615462651579,0.01971406872574466,18.787121784154092,14.833034389155472,17.330822216491857,18.20466745492061,12.456868202946545,2.948637059148802,15.025011865855511,0.04224370240633046,5.146376767053025,12.687449198821255,1.6433379025693418,8.472812013861294,0.8623326434593537,0.4954741304926191,8.066199256957862,2.082758990031297,18.693727156961724,4.805799893131093,5.398586401892045,11.671600391443619,8.163143876026563,4.087351396496373,7.707405265515139,6.174713522342321,1.5180578670571832,6.4205900105432345,18.81649147209483,9.010225789233214,9.909220386584309,8.955623682582203,17.66005857595748,11.351890454404652,10.377027453415772,10.20859437398537,11.964293203414545,0.5848485988792218,5.466069226696755,8.391672696144546,3.2462438013071804,18.24012467255549,11.098443538884869,1.0947997487377403,10.496511666257948,15.942019959284913,8.267931920496352,9.680564296166537,0.5805886294126195,17.165527490319114,11.491083495755596,19.252768869937196,17.74500460209829,11.6090694444412,15.52743739427925,18.719535653096223,12.56027134934457,16.993705632087178,18.973700946606506,0.9838594026877434,8.764209795272656,2.4469995943251632,9.849072370194145,0.11718741430058799,17.6335198725818,15.719023681828489,3.969355441304918,17.9820639533359,8.033523906097004,13.368532523102829,15.767862700886205,3.260565577377328,13.74326923814317,12.370048012995888,3.8962211748518483,0.6829846256112937,13.141531904041997,13.282993887384213,4.469859861314993,15.6242096466077,1.645501752989742,15.946878604616352,0.7940474964878108,9.474331805706973,11.960811620867076,10.439447807878214,6.849798215724441,11.443277545703587,0.33573696446775436,13.12542129540287,12.938220463155034,10.779322417453564,10.281748492158659,2.093942826002322,3.2855336173046457,16.918902923895367,7.005494098927518,1.6999041385777147,7.38685878073472,4.519809072546894,12.19998076093939,19.240100500486136,14.974347915591935,8.688038160466554,12.443415399359225,10.95028521790372,9.116092583230614,7.631957318741742,2.7301808089153212,18.990301455604758,12.04292880018835,8.662506300694215,0.15687933790279995,7.1677303791362545,7.80817399159881,16.81472665630086,17.31268799617609,12.808577451465823,14.745031892712266,7.450732473882882,11.624619858980441,1.4636264221586082,9.336331597210062,13.515173763024283,7.522786328223914,7.831255425459682,14.545815670106279,14.55345424528112,10.7531694092533,19.34299772906229,8.966004009379587,17.829359916269585,8.300432013920812,17.42162692988518,3.4868328750370425,0.11008370226969433,0.11046446725422765,5.986034369919584,17.979760301258874,15.131506339957209,11.187924044294997,16.010053500865872,17.004325236625796,19.437594563717045,3.6707543843116586,0.7582664397522709,9.49068141165517,8.809284451815289,2.5878805380732706,16.952719256654824,3.9701148493870386,16.39517141849936,3.62439341687963,4.439601651079621,12.50208029383693,10.076200869665882,17.61509663092063,19.867535091186763,15.701154827495301,9.387496377800755,3.044636648764283,12.0417452379826,9.35454557454479,7.572533916681192,2.679343125518967,16.62123192271174,7.377899183790704,14.938920045957307,19.15804336064251,13.555491204217596,19.42360207973573,18.29865342226654,19.481457544127142,12.095744336105998,10.045544991975085,5.945924133993525,12.622693062679966,4.039808276589292,14.246966589806771,9.511022197136331,18.38001382869006,6.9467913402832515,16.351280681115703,9.180420630171202,8.562497432092817,13.702186440282098,8.46699146691888,15.900378972044841,11.986732491022526,4.2521067654883105,1.261155773107454,12.180371716496655,10.609961307962212,9.91680995588557,19.52392494850863,17.7869624552635,5.136465331217925,3.276381001605051,5.410720489720884,12.60958754451118,8.858673285349838,15.052969486842942,8.715008498939213,18.24749052220527,5.7292210698179735,18.0761196167486,13.483366075203733,0.8240897121116486,0.3086576659423912,7.157148325586449,17.144968780615617,7.253173706920446,16.52579990946093,13.30791348660297,14.850984167484945,1.863564904935413,12.221929675757611,2.8037311073226334,6.979791925599517,4.2660849345718965,5.10179654737045,16.757696619437972,10.859927059369095,13.034420260590958,1.1394847141833742,0.538739748977104,6.6553263713823,16.443438852657604,5.569555755250537,15.76256449697711,15.526033542170996,17.64059337683787,19.756890561800464,1.9513959449194118,17.07629382489327,15.292420320178124,4.724193284210694,2.237814383237944,19.844448755968173,7.0237379809655875,16.022791877870155,1.6018290978884053,16.476886726342492,6.47583000750076,13.370080921935212,7.935601497566145,2.7199499208168465,0.09690825178671147,9.939683508160705,2.9894420325778803,19.499463702666,14.406243809751057,17.77354146149856,13.65389318075529,0.3972917400248477,13.48670760920134,15.981203031071892,2.1220886077869894,9.910480863114062,19.163797102963343,2.9410525332780146,7.680335498861535,12.086330816431996,16.168937204567307,14.230752705608092,6.625823742212771,1.2873817786752095,17.606497893128015,2.2359662983524586,19.740410137431383,12.235396879955154,19.385990499974323,1.909852275831585,12.395431303327138,0.28143799123059754,5.862169369378307,13.459821555820977,3.2261284797376044,10.087490968117795,18.071544572166967,8.56003574622575,15.63286094142983,5.252375612804601,15.860663633990937,14.30818417863318,17.823928350984936,9.187604896233559,15.683514829007482,14.432581124287886,6.796937510730143,5.2029762715877,16.884148843154914,12.831672435132289,19.852137044567442,18.155390774541765,13.463997565099532,3.7819370820798914,4.821665423498205,15.156564266004239,12.903325066095693,2.070544137978181,15.50378895967366,15.017050549689266,0.017675500169076486,4.682192265584764,17.575959839860644,5.309606579064918,13.281091448792948,9.802065534579167,13.827368972982313,11.08275393563968,8.419800323740262,1.134808665455922,10.245665372503945,14.441048557708843,19.835887797507223,10.21886995848475,18.19385372067525,4.688767926770203,18.985974112688204,14.222739771609954,14.327125009918241,5.634491544526767,18.29723079940887,15.855369642677939,1.525024533643573,6.718307569390851,6.874561094338767,13.94632869086944,19.37332186359462,8.237080989911746,3.174914170980392,4.184891163411395,15.685725682611334,18.30621916163089,15.789626245292006,12.868264302672415,5.471893365226199,5.202149306480899,1.6750806453143596,10.060724965112499,12.594994453310067,15.61275413468794,0.47854937852878976,9.77263753175096,19.859066816870026,2.3937537809331744,19.21889711652458,6.542189634471054,15.258892358281342,3.102678140483377,15.269549240349182,13.084631334073231,8.813353627376186,5.926762171497302,10.63014120742018,16.122181091668892,15.071760206240254,15.399052541119968,19.196165735984966,5.61844173081584,18.447208623721888,16.78776307091362,8.379693175819739,12.881624477343019,12.366314887338397,7.086530846093537,7.1337352983861235,17.56565585039101,9.920772094565109,9.323709935318423,2.9070020657173146,5.339664932629451,6.4037435616493665,6.6938022667841235,15.392187356528941,16.119619511202785,4.102745484406469,18.66859664039886,7.511414592311976,11.151588247005062,5.082080238097713,6.581209054813595,13.34605946529322,14.644365899139014,15.161544432806346,15.288519738351285,6.21583643924474,7.097475265143687,14.251363768794816,2.3172973668213626,4.178689052542333,12.345238681211148,2.016126377083345,12.076156731911176,5.024820143082316,6.183600010205881,17.620528187098724,13.244035681776678,6.525244582578784,5.095784524543165,16.46582174492378,10.1947900243063,5.7683516064444085,14.071811857145464,9.181318832457794,12.0210129353047,8.810140818095888,5.6038283466911,9.10286776774694,3.4516852149364086,1.013124036474955,9.005244307833134,6.696004175449359,10.897122228786312,17.115839558284506,15.68291097207089,17.881891948339444,17.12654561216627,12.4462396507829,17.007715055922077,7.313444637746138,4.650690464393192,12.72558039619291,14.429844825838698,17.823450587878945,18.806697864576787,0.7178721452412917,6.289971631802396,11.057112707931825,4.197414333507279,6.785908106131124,3.3577459384894492,11.97783655456675,6.373141890449454,3.7235243474995894,7.939497540772917,2.1590947420479534,10.77442188404834,18.943228491061042,4.27754875757016,4.593197274313017,9.369555785096871,18.98836249437087,16.6836918892269,16.20779909167501,17.127219792238296,6.078441515718249,15.083790804791487,14.065029819698465,11.322888648771992,1.259020261017163,9.494857325582085,12.965636176448236,1.4485166637436198,10.924378622103553,11.360889842979628,17.00954177063484,12.15555409578072,0.8478595947710188,12.085653221996594,17.43766841910717,18.265808496116694,4.332754549766489,7.219001494571615,1.281604124561171,19.77293508320182,7.025367582328204,11.716551466968973,13.192168308178033,19.808616263469183,17.439241087250803,19.54411733520818,14.492385844827025,4.739097848934053,14.044011031649667,5.265978279359684,17.732013957534832,13.258785515795184,5.893121084803172,15.337088371149278,13.345143350686342,2.2223480453301914,15.418390758791825,3.104190283914021,19.46550314514547,8.777975146121246,4.07409319584529,6.502897513308561,7.625018221066142,12.00684124378261,19.09394443642781,4.121541192442972,8.203571084347772,18.41229425658831,4.686946132453249,8.22296455130704,16.75227576211512,17.095466732081796,9.68987839292173,10.310854225415973,10.762659400992444,11.023597191365354,11.776814482899663,6.672100908060821,3.3772183392249833,14.426330479977505,8.384922810929236,12.265165940318013,5.440591633789751,15.632912525572618,0.4630528626582242,4.175325611774423,5.538756301050416,13.00446550825594,16.681063533856324,6.596577242775363,16.421387121278276,16.88931359674777,5.171281713319109,14.254462412342717,18.4513909315428,15.828200594245043,12.913850000233978,2.20197084981431,3.0907824553321728,2.9729813406562,13.897726240431743,4.339360423011112,11.6816495586784,3.163472302811705,11.014627508764839,14.344339269946733,11.407566745405141,9.788507262862275,19.815628934329474,15.08963611961021,16.90173656916602,17.949322483783003,19.949138658647904,13.999278109781041,4.855017619734698,7.981950014922439,1.037688346701331,19.06725193921499,10.239631441503686,15.518277437849024,19.8603709927523,0.8507943921163896,12.625353701964723,10.266015265748747,1.8026618376746706,19.42977721875005,13.066185283297308,17.764832702649723,1.5363720026024152,15.175168099781345,10.982894512292386,14.897600346293235,11.175922872694732,1.2983143612344161,3.3497131054716434,18.55077041055431,13.20985516983875,19.50819627874386,12.199900770078397,0.6082666881841048,11.229103057575895,1.8057705400407498,1.039575122117049,16.8392507752896,1.7633318027703826,13.52357754845507,6.907560662719536,7.49994511900701,15.654257854539546,17.176005734978602,1.8597742834943443,13.6676363095434,13.595042429428283,7.452617252480089,18.538027838662767,15.555178839307487,18.42398417066883,16.635119558020296,14.761100094792683,18.41393927512518,3.7341045708460596,6.287950244580305,15.292207765986063,14.234561497420394,6.379420881649147,8.97767309702064,7.753289158560341,17.34355836883184,7.504625879770543,5.060360711522285,6.994504950338816,5.457334583282156,8.046629066751132,11.575261854670567,5.518202147711468,6.612948388757354,8.530776884950356,16.174915694307188,5.277862990008133,0.4628727344169903,0.43906916485290104,2.650569876179474,3.2943941820377587,7.384831322668881,16.248775090118738,9.00809776295933,9.815732314930766,3.9805899602995343,2.5019878488413783,7.878091061206174,6.251988884546984,17.9525957599986,15.51726484512232,12.956709116889922,11.813884118477858,14.27708995895145,12.259327132348847,2.769702544988304,10.447175291915345,10.661894764122483,3.6054562046602223,2.0574493586082587,1.845695568094241,16.785368587500304,3.629741623564957,16.28685779168189,19.913811632721966,10.612471145412119,14.408397356564064,6.089181902747027,3.2554187887877006,3.0003174133332555,1.4461263526121293,11.945297044771825,7.993225469970846,1.3312150842130777,19.08629859970293,16.190461384004834,8.06549640116545,19.640966610464456,7.400194890861331,1.7001183330929548,18.2390858601673,11.192575201680874,2.9270079754002554,9.457001525878898,15.21830130585184,11.657249049123365,7.841640942508934,9.225789384036013,11.738099413674377,1.9661957495072757,18.596381055906193,8.58425373083223,1.038782864460237,18.883582343797265,16.31676430441667,4.341552251115086,13.085936009003838,16.399566569827932,13.253916463048059,6.328626095045529,9.409724696121193,7.084471112483439,7.215530437253572,15.632873253514944,13.915162653033843,17.15126646133758,12.086339869469963,17.894289742868207,9.482964453596136,4.902291502674405,18.67781437020238,2.578683906728405,13.708266382205391,15.42545964971536,18.21342740769795,11.478238255055091,6.36420193991559,5.159994891942912,15.411850568399608,9.937138869074488,7.288996556726652,8.682714696604595,13.422984990880265,7.233536231124673,2.4356778759333553,6.1510512299453435,7.14481155885069,9.091723995255286,7.483959805786378,15.670570831353565,14.3508574121301,18.968091274147977,4.244831024704228,15.573692646805956,7.946958198684602,8.556642886504967,11.186557019825294,4.320375200839592,7.25416251038574,18.381209238607546,7.51328989269703,8.904511392378556,6.869410447175959,1.4604544718244927,3.3021768711681343,15.643737505061894,0.6129824782201565,6.637762731900216,15.525605287432107,9.954077943939899,4.259721336383029,1.6748696348257486,13.48185543138583,3.477133644509598,12.682188732071484,5.946298719513985,8.787382881495741,1.0033173098888692,2.6213854995233543,11.737636217793227,18.208128545085792,17.398269837538965,6.9877058716032,4.351114556460263,3.1991481460024884,6.150972856826362,17.826098383626462,7.369067732740584,6.591445624502645,5.137986607759126,13.318468031133467,9.422343233352247,11.835240932015584,14.162390030245433,7.799201567140979,11.400044995385459,15.12834113747851,15.11941498461523,2.7041778788394266,7.42394491039982,15.424150027932368,0.30202109121687304,16.780853772803802,19.91386739444136,8.190630419371798,14.25874306948625,8.566543801936417,7.221562907316956,4.756291722205184,13.318007902888308,4.070575079248155,5.022794187985848,14.528069081919721,4.930598649803066,6.074837877222601,15.41818670842245,3.7207298885316575,13.045142844980745,15.381519853849337,13.055947077165847,11.766557950701241,12.227587624072731,8.266080267574655,13.28719542791822,3.793631763071441,5.230619522313127,16.215329310403494,14.547760801218356,8.783200533462804,0.7620661733671419,0.6916674484222085,6.909608199128692,6.420051638270152,6.078622337455606,14.97731894988922,9.889985880426803,7.9248289806743255,0.031696266568554954,17.206899054254706,10.119297625955692,14.36681982890088,17.718724864237934,15.891089593066887,16.060638219599017,12.67027025286871,0.8355471901749212,13.671708547900273,4.531035326342372,10.576290548440257,5.019667310929554,1.9077735779252913,10.37061531748343,2.7450824360750925,0.697605020343115,17.254634225612477,0.03536875302320386,6.686134177387482,7.9046952693008565,14.932108020319564,11.633715503993969,15.963873653392273,5.703413500683729,10.08339561517364,17.459983505849145,14.971492069451525,0.9584812989196312,14.513900348726967,18.48202910881081,7.364405991257761,8.20866523568891,3.0896812014013486,19.322962307007007,12.959670750839084,9.32184002106904,16.685714990537335,2.6668096763497484,16.030492135368767,13.474078408333359,17.93587538355576,8.990188731503327,17.56807716945179,17.32954282783727,11.776165996586148,1.5901822514904929,6.846804151042134,7.18339962238677,17.941625103484853,16.384694689511107,4.158999706517963,4.79313400532734,15.177538505737864,17.176203740952932,19.75656207791446,6.608730049440852,14.412432582132064,0.09900473318003034,1.3555146624162706,12.607690236502851,1.636032321813241,19.257443047530227,3.6529207177040224,19.916517821455116,12.488093195342302,6.813716151885449,15.380822643180139,4.467752058716004,9.549132146197445,10.802478623156212,12.359859060019435,2.7497432937716715,7.379715876144144,16.114737732318044,3.596464795744194,16.22024190497023,17.918083500625798,9.088268400499029,18.91160347892859,3.9150950954423847,0.5199159264540976,17.087112903084254,18.350657285174265,5.532791926272607,10.230426935981427,14.99027249377904,5.614984450817233,11.489794045187995,4.355543558698538,3.919502408518225,19.27648122144212,2.7284519709040334,10.252832353353757,5.667163968672697,3.590368295276387,3.2433698358810137,9.769429162230075,5.053926254909187,13.236676816020037,0.5128400906408226,17.7815154574993,0.06927385639190486,15.402988197922296,1.9488401277387224,16.37509637895388,7.700013129474161,14.145021940248078,5.959362157652257,11.770746754212,16.457266817145516,15.516407532510605,11.798964806368065,2.3138502110896475,0.4295749248302494,13.157417696906402,5.323879485539957,6.915149537898464,6.570086694320696,2.045287976796746,10.884087863721902,11.101567970018632,9.407903857347844,1.0149822656749397,17.556121187229916,14.43613184892531,10.476762540006096,1.7092389009995745,4.218156648081952,3.5113248283253107,16.16468428876051,13.21415702583558,13.934103575307795,5.833648389122441,18.42251417172704,3.9523652891443817,4.397704739640593,15.688161698496351,15.001665565756937,5.388078626420318,11.56297310376624,18.506250046696458,11.974826242082713,6.4464128276675625,5.860787244992789,19.12353630780368,6.2747615519603706,5.559030811890668,15.711285136703395,8.878612863363365,8.199060113675213,9.660954541221138,13.00621652340077,6.786526601097713,18.41741583599431,16.597945518972935,11.678115451312493,2.789590911184181,15.282747532562958,19.428644819892533,19.443076039967217,11.052679782008639,18.763434577665006,3.8327531590062236,7.713048293640039,13.455173189504027,13.943775674725586,12.026488936961597,14.054318733373403,6.959139322029921,14.207868942130135,9.226788109673866,9.710001147264444,8.39321017530584,1.5047880872096053,4.41143756519502,7.253872344238346,14.373134710333307,4.356130027396792,15.37830501990241,3.9672427958861434,8.241019787536704,8.562953056491406,8.110433173773908,1.786336926703429,12.160002473102697,5.162361105254365,16.089245062151015,4.241529106265318,2.3703338976655886,15.44014757463649,7.676558921913652,17.010363954018544,12.088361396042945,2.6386320444268563,2.7600036483299295,11.348159726444514,12.683106778372704,6.833660314489132,2.4805813595212722,3.551185565731756,13.061153013391579,0.05506729671923338,11.257171866602915,0.8321725002015867,1.742143262414677,14.965509421393698,18.41933216562897,12.972808002424067,9.205766813404793,17.43947363980036,15.11439561319726,19.26428124109414,3.070804828238667,13.89387364598961,0.7917140527168609,14.481704531298107,19.817781710978153,7.529583105452824,4.465900388380359,9.591375179796096,2.0648245866312154,18.5156683430533,9.703138921894316,19.06333615727895,6.705987671209126,1.691849258331053,12.946935864658528,0.004907372433304857,3.0771366314656534,4.520115487276328,8.496477552123501,13.208582195251068,19.348361284851208,15.789126759637021,3.309293113256362,19.99190586749013,19.857603454294022,13.086482657858003,18.364533146916383,15.349360057704109,3.2209719640378776,15.251302421445438,4.315895671462018,19.8211148921868,0.271193446939928,17.008130298799017,13.280823165586607,2.531387662329827,6.776064426470865,11.353443623843948,17.998557125154512,17.509420961748393,1.2504558543126754,2.577897187790379,11.008961591298188,5.426195879867741,14.231096851733348,7.4745987278207116,12.117417053957972,9.169609596539505,9.94025427477169,18.25741778782772,13.937758059687035,7.638514700883312,5.791098631961544,18.794541362820233,6.08121576015606,11.962138548477913,12.092569638702928,17.348365526564354,6.001032291303718,14.093160444659784,8.572856254529096,11.80828651566526,3.5620020321399615,9.075443178419572,6.337518499235868,1.0816378140174931,16.681970228777963,0.8323367210427479,18.62763454424091,9.291463366816268,15.058896566653303,19.457037746631947,6.4910965318126035,1.7610605163375581,7.166670278174405,11.95550059972106,12.76652006933685,11.341075315492809,0.164109405805144,15.242056103800682,10.672318633806706,13.177733186958562,5.003817466386189,16.339927786810374,16.228019947010782,8.613042935208068,18.32060882754186,12.718186141187147,2.0425548420576023,4.500498028056201,7.024775755186172,14.300772607479217,19.313379656191096,1.9286047460585198,15.290708484841646,1.7271441801257437,9.661541678908394,13.361980157423424,16.74446280045167,11.692765388696476,14.687576376910316,16.92443218577577,9.30000193255141,14.50545097301212,17.445331645664886,3.623012805170025,5.5400207800776835,10.038573858415504,4.347543139683414,18.693655023865738,5.67588388842867,17.613601095689127,18.549007856109693,19.45162628809546,9.07189293476689,11.980025759488875,7.262171441172369,3.2728525489379168,15.089101554608867,11.009764985685502,18.008539502596797,2.176253077868262,19.373112008083634,12.413521728387632,0.6694901927543029,19.732756174125846,16.342062323783257,14.022532264054327,1.8442431129669279,18.534754305399296,9.873785032838484,12.15654251884239,11.946976717916261,2.255993269856149,15.372139618112497,14.127602791931938,3.0655617546537206,15.01764988400916,1.2465627393392742,6.1286096666805445,15.992909039291803,3.7344349366914953,10.979101833822593,18.496267301453354,0.5414399626729827,5.840529875902587,1.5824144022538844,6.003543108047369,14.466330797975777,0.9004126574385474,9.16767763113791,0.22002114561993302,0.4231214729968613,18.851811486862307,7.44229200320913,2.841772838421921,8.765758775747493,14.02848688857607,13.176837014789115,12.162950513290646,15.577967975696563,6.0244757028061136,1.6691470309498735,6.06457481740732,19.764804704999356,16.113853559078947,6.037853836804277,11.356888709837559,18.948463254748113,4.1458412771958475,6.13290279098587,15.884831649989547,12.408860626288579,1.7533201015075184,2.578919126067163,11.80292728791963,0.07189326911582139,14.663301156007122,17.00424016750318,3.0490984322258097,0.681562493214205,1.809657156355975,17.00605282221018,17.500411861388656,12.061704761011253,16.18354261003127,7.796450721132184,2.085723528459482,0.5936257877497786,7.450602160283468,1.6659505748475523,3.593110753846629,16.351357196057947,2.878304070638298,8.722383310088624,2.1106571860927437,2.298935119614489,5.873580383391408,18.329399113940312,19.524742723319765,1.154573258992082,6.667640573754636,0.3845746319621979,12.298601650227553,15.635333289749301,7.051378043715202,7.33797692278547,1.198978153279171,14.234412443786798,1.075177459103731,18.25008624738297,16.54508254752999,3.575723703868583,2.9693297963425103,15.600082679330738,5.073047481195037,16.89123793514572,0.5119332166951462,4.428572261724213,1.4079867615168817,16.998886181228038,0.16005499454722294,9.36283698485838,19.43257278251551,15.670050474874477,10.655111521637544,15.98667002498166,8.582873972467464,10.58399527676405,0.4484893632404807,17.030421009326115,16.427231250869614,18.974374594203812,10.241813851978696,10.57788042508827,8.092184704415155,7.589179382709581,2.730806902276095,19.904596592312632,13.339888391079317,3.67611609316818,9.768404260463566,16.1957672820265,7.785443204135922,1.432319199571137,7.845706145619165,0.6572802155874724,8.457049647687057,11.755007088169581,14.401911989095563,6.599165366390047,13.634613531419376,8.533892558138042,18.722458587731282,11.935398124982207,4.4722008310800465,17.572841595585768,18.745865915859646,3.5054736815762366,6.4126239993179945,4.845098372781238,2.996159186384033,8.63519208543984,16.26633156451029,4.220423461906617,16.673283498773902,3.2925604835448707,8.25435890581308,15.925761899605192,19.003821842147932,6.691211583010004,3.3388684169862914,3.5414496815897145,10.199042000594464,1.7848492448163178,14.952942920547404,16.122980788747224,4.423235907105303,16.149709596332457,10.827667937351517,15.627612991349533,19.728590928461593,4.053164869908583,8.097540862247241,9.632250464326045,8.672155527876884,18.482800306690077,4.830572550556287,1.1540175540809727,3.2753871945563917,14.122643659413372,11.617828242464125,7.596674911283903,14.344500446863492,8.201370375590207,17.32476290274047,3.204203870025588,7.862116847687197,8.49571271139359,14.322321035650948,9.869365059014408,0.05385986866309089,18.03565728038162,17.448239495586133,13.586515647349389,13.071536633080502,4.136577486914965,14.490427203324344,3.651951189218705,10.49172867600975,2.816324773047656,17.520461708677626,6.5605043413142194,4.044008701904023,17.431593988083982,3.357346499145284,0.37884444389811645,9.521502321464975,6.963929098609962,14.947616286707177,16.5701343324907,13.914194360730573,18.3852269023385,7.329075765297626,2.869676820129725,17.150758738875318,17.887350342061644,5.4954230531456005,10.145513335054744,0.4246207250377454,5.099803711884849,3.8785667516166678,7.448610151141413,6.9139605630375645,12.40535045454154,14.169322553427538,18.933310871304123,0.7858484517081266,14.2342362149525,13.67560836188376,10.151079277532968,19.999936714718306,14.157787734694862,8.51337286424377,1.4940214793142514,1.246373071374367,2.0622034662529742,13.62289111394752,18.983626311038012,14.241814506720702,2.739015197523633,1.4893792657476235,8.71829665168705,1.5697631851116967,7.452605379783774,19.138686133536822,10.513132712731448,15.640348060237518,5.527585361527136,13.683487529485948,4.317561853530405,6.5541117034099505,5.020933053725898,9.841792799212694,9.581501003311406,18.91764509667274,0.9520371727473753,6.739986848525308,4.131730098571604,18.385160658895302,8.629858807115784,2.2430165200932084,3.718419843473728,19.976396758765667,19.571694894522253,12.206721215194252,2.5431110748557506,8.19354620201976,18.979357480617082,2.0509844976564917,16.722798106057773,4.200824985956237,8.928529716524686,19.303916224209026,1.5474018771574416,1.2667959056581868,19.725334726973873,10.050997419992079,10.11314726034521,0.6455609718429667,19.248200368032546,6.291811856610576,12.568008900533796,14.748420929487391,19.364964200824424,9.904264457421137,7.685468790614811,17.628609649495246,15.523080760034937,6.804183020079915,10.687695208533743,8.5143284696764,18.695418618457,5.624062256243425,0.05823246689938166,12.51029973928745,12.210208446239115,19.593067618423557,4.470671632238847,17.14761377356517,10.584306514114044,10.286730716295121,4.544893850934297,19.583750996084962,17.783915913276577,8.752418373468727,19.868036528257665,17.169547751009805,6.2571427285665004,17.62503680995301,8.72113547219151,19.83101958018571,12.614746005640844,19.6360160378466,6.470308875042505,15.798947703268214,2.0600795994636556,9.822698696678827,13.738739626198821,6.663039202687262,9.79601160240922,10.00314621553641,17.843728529352482,7.584597859491211,8.127802734328466,6.005149089543309,10.459556747601386,1.306555792590336,10.65233357728995,18.61555346833605,4.884344927313888,11.956841852093518,5.878369244315933,11.996588585907308,19.700658632548055,2.8413143699495746,18.119911171485438,8.242154352597781,3.9205180680428953,12.609405823018246,4.389503213417201,3.1554676307264184,12.171455936000806,14.550518809193678,12.475659697087114,16.820998034150616,16.70116491962527,5.6177677931911685,14.099081620176118,18.234908555312565,3.3873660831474472,16.764687575567745,17.247913065660825,10.765551428122873,3.2026392993622244,9.68870704410772,5.886641788629312,12.155853281797121,1.307304373411835,12.710139343198982,16.235677392943707,15.902527174558676,12.530240152898244,15.679581697443815,14.756077268633705,8.855083965568031,11.050713937192178,18.71119495431495,2.387757006271496,9.299410597324357,0.5471596938053747,14.820795744933477,4.3321903660078975,15.943544258055047,14.048238292665829,2.8984943614733005,11.15151220203774,15.765727726319941,9.392197882281677,2.216759779928874,15.543183059078839,1.3653188050313192,4.121187374291586,14.63856769658026,3.7148173878472113,15.280271017926692,17.48669999071518,16.532016688914418,11.295192672120162,15.72960801531233,8.139167187651006,15.446409102464337,18.723126798268556,3.0537975226117853,9.429253690901081,11.91082555184597,15.341626985440332,2.587160977049896,3.5306706786738484,4.779751028547317,3.762770487274416,14.52082116123524,16.589449334794498,11.920920136256537,18.52512952186915,12.018479321036445,7.77925226491349,14.823305280738172,1.572319931396109,11.675526416647983,17.916766128699134,15.380643852636403,6.0617268149035075,18.33057510924116,15.054462535091577,16.610384621485082,13.441659360668385,4.6384396348412515,2.158937982021647,4.139383254061038,18.429402201600347,13.390357687878826,14.728678283387481,6.61688305909121,15.663861346746032,16.201930774876487,5.435593365161542,8.556841925300901,8.183022808675862,15.259744600834665,17.748669133296357,5.404452631609562,1.4859487514993175,13.205375205432128,16.24632354601203,13.004719760421146,2.4658713242512587,5.875209019388876,18.450573090493926,19.693886992177614,5.825835258827903,14.623370041929014,18.383872906689774,9.504151420157093,2.558285458067986,12.417293288749276,15.693036040980758,11.893552321708668,13.398277699131214,14.250341480268137,16.621349477923598,19.72656905345748,2.5354537368536834,3.8375178909582086,10.084530971765293,3.5145764348277186,5.7980047972234106,11.290038805174692,5.494683254949102,18.68226719563522,0.2166090788424091,8.094451326090324,2.0245197054144715,17.47007637931756,17.44151194054108,9.802236844885698,13.281282161388264,1.5799174302989183,12.382307690388487,12.567787377259943,14.838819368825135,18.817731254113838,19.55212389571755,14.503906264305716,5.335623413058608,3.591570411442535,14.963890676599881,12.90651878212044,7.3947391164851695,10.261466878344372,11.097023834834827,14.351558525197468,12.751136784514614,4.3291031554392445,15.954293389467518,7.372314375093607,18.58166822689677,3.001561636584964,18.203307861880145,1.0527398698271728,19.40079322828688,11.255476202439013,12.485938736779465,5.163706143918518,7.510560489131479,15.323071403855394,2.4691476599223483,11.227940340848392,3.2046529375045996,5.942345875889772,10.111525800834436,6.015507407185456,5.611321169276988,6.478900524394833,8.885240173923838,3.417127817856387,16.499506197784342,6.999270603243994,14.216995975339488,15.379089089643148,4.069829126498905,5.936091102623227,15.309918607380709,9.489124743556708,10.505651863531206,9.854041405110582,16.783801335291862,2.130605111030448,1.1876425683936631,17.65600005322764,0.7150965239538243,14.400424914061674,5.313211280060335,3.7994088033733053,10.039358230091477,17.428541582645124,15.558918043216918,19.943516907255265,8.280766359280971,13.78584529097417,1.473714579294385,3.274151026871537,17.111137810995444,12.186744662273924,7.700313110821244,14.039313607804331,15.330248446021324,4.888798406847794,17.902216909188216,5.242370621909234,4.817064481133091,3.2861025504046815,2.2787491210999233,4.803986417684922,5.677545753081548,18.092653064740286,15.33703795133588,16.539091729600308,0.49258468502936914,6.191155567140614,12.114850807298678,9.297600140390564,0.7128769921126787,15.618668365873605,5.3380686796116095,10.871224465230277,0.1747811796401244,3.0849537532617832,12.562463433381383,16.8662851331851,18.031314900889885,9.802258498388232,6.684925730091518,2.1329450610059952,16.603654523421124,17.773551684279767,13.038530974008502,7.250782102189497,0.1217421466924451,16.50100348533849,13.452592433430638,12.182481577852492,4.575824400830331,19.253308396261545,11.958182057366106,7.962017948654552,19.60125071840921,13.086710943194099,17.42308599592388,6.1251395969120415,2.6065114467162065,1.1974939615174085,2.5695403700549146,10.938235307062572,3.6557833184818067,16.12382625778168,15.306608646657448,14.660473469254015,17.97055568606133,9.003367865645249,6.27723587608235,13.89340489197692,15.683101695337252,6.568245137356992,3.998552782139102,5.774382866298153,11.651959513323895,19.624439596028587,1.133799778952449,14.747813993121305,18.026719625775346,15.35267416562709,19.91742017669513,14.665334795107942,7.927363264887277,14.495145151409625,10.116899458961823,3.3475185133303986,9.424448737438627,12.744231154230278,3.9948363830606803,6.731525119784814,1.8830437036569325,19.894388577429453,2.242065107324902,0.7798518082034889,19.484192907198636,3.33205997511679,17.0138450641433,2.13143792512982,0.4719693098848543,4.299699588553332,19.164875419503215,3.5662294392771665,1.740495364730128,3.5192994286558887,8.506772818436499,9.815327288332387,12.76816212658655,4.82991914875043,6.454720527644673,7.3167540823148824,14.36143019939275,6.146364036344201,8.335306381333996,16.935640448291466,18.889902806231103,11.358919534141059,10.104858270576699,7.079005575191402,10.969239919284274,2.2872898439598766,5.696693258145666,14.107812792766964,2.7998582324338583,19.333246655578122,7.273878597063481,5.024588261537146,19.69241632249551,6.030951311768709,19.365671882379317,1.3205312134088576,3.1841840732818527,4.20505635402308,1.5446949025581302,4.929892484878264,3.1451732463268955,5.972922761263217,14.697984643251623,1.6148971453873262,12.052015242024968,5.029640905892654,14.849841668605595,8.172804950364014,18.76843921602362,19.524440573089908,19.992813314992578,5.52201667304574,15.10089421589579,15.635276295106566,19.039759744256127,11.512839551938692,13.316179915305337,7.536784535962107,4.450891067704017,13.935115214662513,5.5884796145013205,17.083516459054767,9.336326617976859,15.933973558994197,1.139632265161734,3.0870590735755066,13.599365114183515,1.817624455408846,8.9600683698513,17.77081953372661,13.724404453988,14.88702667298034,9.573035582709792,4.786453626866423,4.494589851033246,18.705399243644738,18.764122069177134,11.252769143806546,17.86840358854938,6.428420549168972,9.038984930149581,6.277600128034799,3.741313522553802,0.3174452785155024,3.684258843072832,15.463198507400095,6.798600832984185,18.28903529622103,2.740473794742999,6.429164643821377,11.030289084866931,1.965602548962515,2.073050245978756,18.894210268713255,3.031568760635066,13.687009251534704,2.7233140479977846,4.539010126765501,5.632725187919023,0.2934590285892469,5.436633462258547,9.218011549692196,12.261288644070355,10.116182459008316,18.921245944363292,4.494859807980642,0.7154686374470876,14.657781494272326,10.170196266256202,10.093214025029887,16.606089463702883,15.23295733115142,2.1352644643575136,15.493719155811693,13.294211267709755,16.87221817958605,7.126471155966296,8.2799622115974,18.26147202181192,2.9273802501208657,9.768142784445137,13.092372704744006,15.02297047618038,19.424783970801283,10.355498617343466,19.003813449196734,18.784058272466247,8.894358026578505,19.50397989070549,15.850411239217838,10.030708174281955,10.246831162138887,9.474008702871238,5.286552167576208,14.93451081333201,1.0704603666193213,2.914372896984627,16.988136156335027,15.35264843001649,0.8508810012808876,18.72082059092763,15.731221807431215,16.059099129295728,2.7483981661208112,8.058496097277068,2.4814141975478954,6.113107764884709,2.1286602981053804,6.430567164111043,14.254788659434121,6.163648709207958,11.068284672070735,12.609465739369142,14.228566504658883,2.00284045572241,13.646038641913595,13.473121617660876,5.142603433901467,10.42966875953027,8.342750299841946,8.859459246816957,2.9983909850414348,14.316667483827548,5.433196069604915,18.188604556357774,2.0054199102793335,8.352167170205211,8.26575623470367,14.030875616847736,0.2968142765037918,3.336987509940612,10.576946540414331,17.24428397250037,17.524746572234186,13.576187842631935,14.184011583146434,0.49561011242456043,19.25915320661943,10.276277025954585,1.3817989353302362,10.684233010230546,2.513128376221543,4.989385338755663,17.385960547820396,17.875435988432905,5.279597116263606,7.264688381362858,14.757015512820209,1.0003541447018938,19.90610662409507,19.17985763525181,2.4545091582500556,19.070008744345607,11.949991680920235,2.597553940234527,4.748087798005942,12.137702935208905,18.57270415429834,16.846836388900247,1.3499563769626688,2.268238936834801,5.78760222280283,2.770039632694572,0.6203962981497835,11.781258730033839,19.278055239063093,10.759385077539733,16.699735162181376,4.174503501828797,5.479462863377953,3.267798028586957,18.387629662260885,14.868660073042728,14.318664916384286,16.122990287467296,3.0255422614796856,7.842326047557631,1.0709206445886643,2.495109574300116,14.204825788515084,14.544592385800676,9.826729730308656,15.290144207713453,12.62130960619646,15.20901224281005,16.929140432288015,12.318737116566595,3.5085085197036703,9.52262061603486,16.729704288459033,18.70829355708482,4.30669944956795,10.488925611013808,13.011448732696875,12.917811080241197,8.415216996971505,5.288620592371127,19.835947886067984,14.561827451606808,3.5024828033803157,14.188972082700651,9.182535767708764,14.130985246670512,19.87580230594783,10.667570064741415,6.403963926208358,17.195905451073898,14.847626907020084,16.464211082333765,10.738656084144441,12.60928296219577,13.881249148416446,1.4521246846274671,11.241956470274141,5.295209274332473,17.6198053539814,2.65352307227372,10.799804990061839,14.862349887570181,15.132399416738451,15.079242635546404,3.8874346782922853,19.239542929488394,0.34842514382640744,2.3190193465869857,8.703603086046815,16.688518459231542,10.171570754343925,18.981352727454862,6.334135408160422,14.794324828307035,2.5593604196700293,6.618322938749301,15.699916794818494,14.958133269544769,15.847548323512623,3.011103162420259,14.034716022518472,7.364057351265134,9.124872370716721,9.060274296091958,14.570978522604957,17.955147189268487,6.335944972745362,18.946095644959755,11.619709540424825,6.1376133315598125,18.75847595671095,3.0601692812137626,0.16861783415305087,11.433698751646052,19.86762662197886,3.5495504673900635,14.632985218315437,10.878587130187828,14.93633361739581,8.587831449660213,5.642675272980111,18.81954031357285,9.029396725344814,9.544712097417287,2.0227760428331454,3.4469720887124744,16.39504100149476,10.400561750559483,14.827212264652951,9.126102135591502,19.08158008186199,1.8252796602522414,4.458314712273461,15.001511049876942,3.5621482045841546,10.406458915208137,7.1240460381244874,3.4494412361178606,4.355933568356503,6.485441917888051,4.91531851534087,10.646800119161997,2.7001875717568247,17.45406837908513,8.858863607769223,2.0491879321313133,16.570003431031957,0.5599664606843691,6.1915677456001506,6.380834137397651,7.820020325473442,0.9164239544723118,1.664303654582544,4.514737900926136,18.604409888072702,2.401855179270398,7.68284602362288,13.384622224280234,1.2555284147446377,5.495184866758329,15.16883513084931,15.914447560901293,14.191419559832784,0.1778939680787417,4.969396305616729,3.4496911135478747,18.799643019928254,1.519898310705834,2.918397810611606,14.270648477173067,6.6936606304345725,14.352993265075714,11.760910105445719,10.307556979415402,12.965557456098944,7.054736926167449,1.949280911789053,5.025468379523348,1.1520133086539053,8.606112484472828,11.121181819102945,1.0920611937544145,12.276427608116984,15.739689325742713,8.800628807484877,7.587082792731437,8.041917164432615,3.721324589276236,13.89516752351566,11.058524390429806,6.134424008149071,1.4183823654311922,14.40047031923044,18.308424236152753,1.5183644144187358,13.170969357887232,14.276179604038784,3.151729929925615,3.7701942714016345,14.363801018859759,16.564791479416293,17.16845038472687,3.848596317389479,19.39682163699562,17.148935828950744,17.64302758695099,7.647190075585613,3.85664246007432,13.106677168263428,19.642786242200735,14.032782136765967,13.569301667915541,12.768969981733104,0.5396146129956936,17.49872961531449,1.1882777687480806,9.305412036789612,4.918331306621444,17.506146956448653,15.406959633018475,13.594577327438145,1.3993288734988063,3.4944431635505824,19.197552615221767,14.121136917649647,1.8972691618792048,9.442058315895103,16.028378533465165,2.693405277941432,5.4835982449137965,8.551296243025423,3.0293863096509455,14.192998225126523,6.846784479466934,8.568362487158726,19.719691124306962,17.385105656425196,6.250012628467432,19.584340145911177,16.32469317917728,17.103307202044242,16.412463895727875,12.8101417918234,3.3501455017778836,8.78489446894159,1.3078864437614568,5.657451398375364,10.937718357252004,17.55324356279675,3.97093991974244,18.87184405737195,0.851978553727819,11.304027299420532,8.578719695744867,19.797467916797057,10.261749091768602,4.117186137379507,1.2747789339720983,13.179656192544176,13.31117976780465,4.692517276923613,19.9943263712564,15.464799916995723,17.370520010288026,10.678437734657894,5.351362369256294,1.514028421205098,6.365738427374521,14.889073950988706,8.070100746409373,11.741073235266345,0.29856515816175655,15.73495182107111,14.67485662559541,14.319386046599876,11.474683543852112,15.633721725242955,7.802219804758934,11.936328960272293,16.34300155647395,9.374627043593534,5.817916939085452,5.549136881019261,15.558922888592402,8.061673217205371,8.983687854553114,11.254329904744878,2.871062442133132,4.8135633758466945,0.45115820177929145,9.00458906004812,12.665324217987987,0.6494204887030008,3.98133698369052,11.913449841216561,17.723380338457556,2.21068778331146,4.4552918041955,19.066361851469352,0.4679254016842238,1.0389045756379334,8.674587884910796,10.597927334693512,18.68349740663735,1.2451617277044669,17.6642935120749,10.703919769606372,13.07417258135942,13.124336466131776,9.596671447258096,8.748808030765716,1.0007447116833257,13.229977327394419,7.0558973704725325,5.386406560520864,1.2056490994730629,16.00336163271318,17.787189056802823,7.265650158162771,18.888147446174223,9.325893291458819,12.21435675334861,19.343038938645236,17.909523398754118,14.274125871243255,7.15546084602781,4.472356622262423,11.00588876407745,11.666768100992293,0.1989465621880404,10.438614796903622,10.227052973147126,2.925258122974541,1.3641195733713962,12.25217047781166,19.73538296235251,19.19770853151607,5.51577544897734,6.528399927952133,5.325126196543488,19.21268758081687,19.689753612706248,6.946205842126925,6.401697714086074,13.53078962904351,10.624056067536468,17.744909984822126,15.550213752948245,11.63307951562488,0.3010883018467547,10.03408075712629,10.812965361451695,7.950988371169276,6.553315774656734,0.22890581614041228,1.5347910570993362,10.14303701354403,17.005906553700598,12.641631445609196,13.449430421449069,8.554849694285691,8.137124595195505,8.906257297097259,2.8341566182910816,18.2473179693269,12.444555765919558,19.74206819277319,0.1423419668930137,8.761083116303002,16.16162590758053,9.948750658918302,6.723391414211952,4.52043630696874,1.418509987562353,10.796940987455184,10.424213242935888,9.086958595538341,1.6006054886032617,8.647677206722637,11.080415708969289,0.075427658029672,15.04603696826142,4.7270416348363975,2.1415711541482585,19.564047520822,12.96335505900695,3.6857696608913493,13.672070818585787,19.570956288556687,7.331999686689787,18.269053457083313,16.29555657204436,17.162466910924245,4.146862043859878,9.430589989671262,5.710218682583621,8.845052011920927,6.0752452796809875,17.758415747148053,17.968024057203216,14.421054650207337,0.33040358067014,6.791786893198588,6.366622423531609,6.513699259202639,7.306619102973846,7.438253958735177,16.775714833407143,5.235217546207123,9.88896396820178,8.201413698310041,10.234700233637813,9.38519028645886,4.838801629339304,14.960793490436384,0.20783183811247774,1.8960848865818525,0.37877656845132,3.1512441725977025,4.308037007858556,18.67458175987114,15.05284642432828,16.36836264949976,10.098037470273038,3.35075172195622,2.4681789515350117,11.640256838577816,9.731911149274364,4.339427078309512,15.43300384844839,8.68953817426831,6.551746537337322,1.798895104912468,10.859468970243205,1.5160219362637228,14.627271254148688,8.300898355907954,2.644115962434226,2.7253226258292473,0.727267999226302,15.50108743486922,18.087850280745755,13.306635666155934,1.178100004965934,18.862712687208735,12.413555973101552,15.070253463082114,3.988813609385722,12.888661132583739,18.401342980079363,17.94586605110398,14.71563436967616,4.318473502625926,4.616310748264434,18.03842048903433,3.5136227868981473,19.761804998451705,3.6939836758778277,9.186607792025319,15.135265334209723,0.7287649676842101,9.814556931695098,3.500909839678168,19.679228337224927,13.616909332400668,9.117644190079872,10.381555944517814,19.153981994220448,12.995652216680122,12.372183113637721,18.25294824781008,6.281334078441652,14.65555984464968,6.230779284348298,13.011702465783518,16.613225657364392,9.39224193385793,19.226895482003492,4.85407208381202,16.301667032115578,10.395818176445433,14.869370184615223,12.900921792251205,6.415339050735942,11.82723174838813,7.021098259822871,12.381075143255673,11.542995797787627,4.798929844510775,16.1440514686293,0.2553431248051208,0.35831590929612744,9.868963983780755,5.683004574682311,0.8665685255582556,17.058331610175543,3.9970516356832064,0.30777610065023,17.20182308070106,6.067421479326067,11.46602079280516,15.056270598031114,10.51813618290189,3.581765357809905,17.2653393087209,11.335193803622339,7.893454998961804,6.894057560556659,2.4351876500885883,1.787992647955945,16.167835773100446,9.82356206301552,14.359022622563767,5.438569029254601,0.9952906707949438,6.490570391213248,3.832323907644186,15.850543495329568,3.94161598409974,16.137967920442144,3.448305336051223,4.680884646089729,2.6264885974855057,13.726501080879894,11.939191286033655,9.074878750244263,5.212666405491628,10.905172255004366,13.558482467282271,6.3117041303241095,5.553131569445591,11.37286715828929,19.837026992899702,3.2484049073761057,6.669010609057877,15.485980148512537,11.711240476402981,8.256260416972916,19.486391446896594,12.821572848341297,18.19479381817125,1.9801214562792868,8.054696383661355,10.26435956715857,0.541400044105913,3.6311450687582614,3.6016991088340244,19.232149424521236,5.656134784152083,1.9726691247145967,11.069212110752336,6.860808976782655,7.523425560993378,16.864701517787015,18.832652651773625,19.156463016764857,16.781860441779898,18.42334178244427,17.47802769640298,3.787009520035407,19.053055675956152,10.612735577099182,14.239109587535008,18.690101797593858,12.532220123365999,12.554220480275479,2.682388782896852,11.74590551787379,10.114632146800343,4.299498456665631,18.76693748933008,12.385973418606241,17.461273718407714,5.34167098874931,2.151666614260388,4.516795075327109,16.941059834482832,8.796467598853965,2.7143364139466364,12.472120748289584,16.10604462978302,7.906997223837462,0.7880921676593688,9.450602524390671,11.891482651824479,18.37089561040951,10.463157252887685,4.165997149600531,16.170572913431617,4.259619885651547,15.772645087847557,12.8137634206761,17.6590789179445,4.230693893155837,19.499962773134335,2.9681085283911157,7.308136629211628,5.957853622188476,7.073845017070659,18.849318914777974,1.2279439190610653,12.182442769542053,13.43016443646517,1.2905370170620856,14.984560393308005,17.964347750513614,11.872198331847933,18.765153118290915,7.651572797989572,4.904017977081865,1.1804430885401906,11.087358548631565,14.603256772756561,13.371081299536733,13.991805124440756,14.694959905715175,13.627249593688289,16.37706749978076,7.818313176705063,14.83676820957973,13.461508827218207,9.147459604468295,2.4267230276458873,13.771214633491082,6.121665989577969,16.52347186822898,18.153064664339578,8.67570323519895,6.077962952704206,6.8213907316480515,10.52527172837908,3.4597086768829666,3.6735361787790355,13.85752943604695,12.195179191714951,12.664070682673936,14.407695549882273,13.690512818819304,3.5287937254707424,2.238900744543173,12.323697740260474,13.580180273101208,7.6101621430792665,6.517460709166127,14.058431929442378,2.418435466523241,12.052821432270324,11.612762125936289,4.794455352856768,19.704409896034218,17.35653853535151,12.268146659127556,16.087527893956093,12.711705183014047,4.576911900707081,2.1217765831083257,12.094817412075173,8.812709016805243,3.0802660935219217,18.943495847046915,1.9731758396359655,5.753640315264423,14.251221886750628,15.150531908012255,10.963577427536869,17.018905929146154,11.893559825529092,13.291363798670698,17.490147963573726,11.110974361119194,18.49615156253606,2.4075127361959625,4.927109504036324,18.88380648341713,14.752558294054637,16.90327561321656,10.061886166333744,8.733288731210894,8.185427767971106,6.94524141990756,14.112049317830287,7.469541915195559,10.691290519179493,14.824617755921246,0.585731630802524,16.523929505483558,12.973859147431677,3.0973090896650257,12.734976344727546,7.0439825300212355,7.4545419329908125,17.7856860174128,13.734972490408431,15.635949184927727,10.944502781734101,15.881388935725948,6.474743498140403,5.900434028808776,9.91946382702988,12.22891961132509,2.6095699624753133,18.2571666170985,3.2571073686923846,12.135773759423758,13.396431466964142,0.2154433340237416,5.29188324620582,9.608613162349187,13.812648499074637,11.94432759007309,12.347154013219521,0.0877262633507847,8.900161141789575,1.4468487313521683,16.08607616948789,7.457869960966268,3.7540752472918015,9.359598987215666,1.5172381131316914,19.499771532839496,13.638095808823586,1.6914328663547762,5.938232206332978,6.064213048605129,19.802620208900382,4.086425557544917,8.086470944035558,3.4592095448399673,11.711250900289185,18.507262007665503,4.965025422248868,3.348779141028393,19.994197223583026,0.35431858858302245,3.1428926366373133,0.747596511599502,6.352837398039695,7.298085123470033,0.08226907640393577,11.504166080926051,1.3924190653212287,8.435206201933788,13.231567974246392,10.846434336198998,14.259145899910397,0.23719138892818847,16.152042509995784,2.3304092765428264,18.319479486156883,18.90547425381647,9.452389826065843,6.697518238018749,18.202058521476623,12.836275981012886,4.903248841855081,2.4746271796552755,12.803856247909753,13.272265888028251,2.214521759474284,15.889857074023936,2.1702121711837963,6.007739146615307,16.45597063287586,13.54744144141248,5.094664675298284,17.71967459706218,6.649576464523639,1.7409845764708187,16.978809987144217,18.650074886933275,8.62285239152114,11.214424592349,9.7785216387121,4.785948666302282,7.4753062557611205,3.043735608126279,2.5785071082384636,12.272882640101592,8.495178163673902,3.14097719231639,18.488935108807034,1.953399014910615,8.916047518295818,8.858580395471467,15.370218769214627,10.922148918621218,19.27522684212014,4.035381357239549,12.580633933424835,12.30997065020075,6.585033234872686,17.130367250714094,9.142086871351328,11.893366213744514,4.248657022637494,11.319746911288192,6.554135328219912,16.69763937714794,11.338408789061845,18.39474931763128,9.069783730519333,13.30121554938422,10.061879630332399,19.180406386025236,15.622868550408292,14.73953804438301,17.49193305174456,1.0100429337499595,7.716635708452273,7.30890702816851,1.8813659242106784,17.11378669175881,11.951572377069994,13.560044230758873,6.767454794477024,17.60976247278114,14.170792050013045,9.263576860511954,17.97084799292987,9.693861611462609,1.2061529766981671,5.326806600242788,8.555411968390993,17.932956733778035,18.02782199693602,17.356177691694633,1.8499115061269977,11.637737224344754,4.561265903416745,4.774790176029349,5.059222165507791,19.658056295282165,12.336046420117931,7.820953475814125,4.2824675488266895,16.005029320967097,16.17908654738825,15.258489245217156,7.621689782171148,7.337874203256489,6.9015325019573925,7.471332775271686,7.045573477691027,18.43979374739559,8.095231516264265,2.4926416771547277,11.521055836207799,14.237542908426292,6.795027636364144,15.701613767716061,7.012453345706597,15.88005153188504,19.643761484517206,0.7509394424674554,16.87259093502862,7.859319144433083,4.841345353267195,9.997349125233402,9.645444827891808,10.279048176205263,19.71576459856239,6.730885778442786,8.073535167253292,12.902201046199465,9.664978172928729,2.774283201376453,12.994650162560273,13.345443465242806,8.935272413870837,8.834564545657537,15.694277265542222,17.572757628915152,9.834964705088542,16.677760164391753,0.7062393981334392,5.110750435343192,12.22614391931109,18.25019933023009,3.129568246239658,7.9795695447736525,8.20410664253962,16.436391353926552,4.107859128789615,14.608969545857589,13.959482149351693,16.21464893455559,17.57279705340435,19.48838266117601,7.604438631505981,18.398610905601668,5.087207748185905,0.42190526338135026,11.79573926962107,16.46207167987843,0.6977045272215676,1.9816131381263657,7.767104619543943,9.385020386771718,4.977876819849216,18.084863617705444,14.80386953394532,10.77292064983875,9.804889944930313,2.0562379350008264,2.412663915860578,11.702689725355233,16.041182421412255,16.493594413535952,0.18008338782060207,9.915996023754126,14.078909000255667,18.91091374504509,9.459171762299468,12.16134978137594,4.564762719931834,8.163173259412787,18.217435857437252,7.455960195881417,8.783396636608307,19.816097922185335,4.649402647094667,8.85457458923742,12.611473257318968,16.10374779401989,6.303060765443518,9.883081243796074,16.759645818563037,10.746906576549137,18.080443531549633,10.172124857635193,19.84289134725326,19.725491497722068,10.13674816880837,13.823815243875103,8.305847300440362,18.76550661278634,17.33852829520344,0.5815252897720269,16.18805732658391,10.010118202785305,15.458020573313576,10.428492008257976,2.8276489758199252,3.6862843547580937,12.347400110932636,5.5308621735857555,19.300453295381523,0.9813191766372542,10.673502527058307,3.1782588876985463,0.21803238475772702,0.13623253873244145,3.2768959639900164,10.750562040477249,12.091869949214974,3.316186157414336,7.104178647636221,0.9946617230206511,0.5707013879388612,1.603440031083867,13.5598849998477,5.011879026730108,11.303712996591315,18.687116326579524,18.703492711815866,2.376117672843314,4.062121244558452,10.303164080856826,19.860799119156475,12.441887970030972,13.227891341368583,0.7409838322976459,19.115265328194813,2.4409095405061665,18.97150631861163,5.748764470647405,0.3942485611201185,15.053245573876115,12.880304661374877,15.431016255406163,1.140401700322049,7.636761827268779,13.914783785192242,18.33943667220304,6.977572043851663,15.944167657882456,7.933167645367738,18.674840350083002,6.150909148106742,10.093633523093747,8.243365846292875,12.706982221371831,5.032211413501675,7.438664341278987,9.877366431823393,1.1009052639117112,14.372814916007508,14.87277231755904,7.957833259898162,16.364861446835764,2.851029733388839,12.167750093102562,10.521378152447838,10.300230675028882,15.636761992498883,4.903635568353364,3.8597885708387603,18.50992174408482,8.718900545720555,15.693701667197196,12.089447586897446,0.4172326643850788,17.711869938972935,15.971080287208919,0.07300267454453557,0.8546136452053155,7.180999552386829,8.97338789587538,6.93628651387987,3.020414418139916,8.929659533710147,13.64909422661167,8.65995829351343,3.347623376319313,12.7312271695655,13.073205558592566,10.078766169492726,8.880356582336479,13.631716225329038,17.070162225862585,15.678166354557748,3.294582147342111,15.881572301678402,7.997745172510844,3.557375860279426,14.106180461673116,5.745198950415222,7.267005645658404,15.773678791916481,5.186094072115615,11.69677886862685,19.942598567584653,16.244096358866503,5.7930378985413045,0.20818269749123708,16.573882538007886,6.908031649142838,15.931266285404725,11.211204703262725,7.825841165046685,10.574229724597153,8.204096681863762,15.925154234467588,9.174799379096124,14.960261369540033,5.135958200750204,2.8605745923889847,14.142590362072166,5.645311250411145,18.999410830578537,1.5543707601499523,1.2173560782952242,10.49423997981311,2.3060530029181425,11.68554916785721,15.66691327223069,9.987306552453434,4.579301506454141,12.884363287712851,13.327119036463673,12.87327718488131,18.861851222463596,2.6739276247724453,14.907113968413768,2.387340477317399,2.11663810946503,14.044920278773025,12.281017020313127,4.265747013878318,8.485428056649136,11.35814141286334,15.204773902483058,4.0609887424018565,6.076813984195382,14.188369458345797,13.494247936574721,10.01208708431169,6.7501067260545256,3.2608393287324144,10.113654283995395,19.418750241581776,19.15160740897038,10.422282897819372,3.2907283812662946,15.578711784665735,13.25375252595875,19.865117298692812,13.870647931089897,14.251125794812381,18.507231095125086,0.8948643289264391,0.2811444044673461,4.679453350934111,12.702696560712594,9.448228737361863,13.64155830176626,0.9318657680078646,11.218496927888996,2.942960181229126,1.517906221477343,3.211537787320773,2.9754122265336447,0.25128536491854536,11.418372412503764,3.1565301974523807,8.36505351450028,9.977944276345209,13.908408114223064,0.6765301584343808,3.6172205920465528,16.426663671670067,11.201004999865365,1.9998221725175247,0.19767686727238942,5.956083432440624,16.20973732664357,2.156310544188771,3.027061373402775,13.018851675915212,15.044557068267164,4.975134470361948,14.568291416901324,18.263574629638466,12.448716085159148,4.296263679044809,11.2750688469551,15.653791110626148,0.21120498880371041,6.656197057147728,13.301257981392315,13.127397595008453,12.162054602002602,11.94860232346706,9.53240267262995,8.791020627751248,1.2220349689435084,11.945200313718093,18.143543332725386,15.690909061879786,17.991092686649356,4.315869952616653,11.761329920661616,11.948519741970514,17.22874144694602,17.460129136721662,3.217251736422564,1.4064000281577016,5.4170636066936195,2.847079860814148,18.56157667995422,4.482359366788824,12.095507139914812,15.420521672468963,12.599574930785987,1.1360797716058268,16.861900606217898,6.840691120179412,16.616162318245923,7.367526633429993,1.1856488282019217,5.902654154931581,7.978883803850265,19.96312674156874,4.113521032274585,14.377634269958692,17.977667620338774,1.7015147444673584,0.7329399248146862,8.821715520880936,14.982768064794687,9.107599375815374,17.863076907815692,9.031876229252802,14.09100205361101,18.55477682691511,19.329708939218474,19.205545372965062,1.535920464811098,16.807896958480868,6.349477210048815,14.846244693698537,18.760069723194764,11.137763811925986,6.275468999483813,11.858926589979015,1.114097044576643,5.9005439434653795,18.337190589996837,10.201862458168588,15.010678004054515,13.19483881584883,12.492096733729237,8.83609887623333,3.241339200246549,8.405306628271871,10.729288612924176,1.6219175294531096,14.440552535735431,8.696397162402558,8.028743018056637,12.145163525483138,7.80376286284048,15.533324663267543,12.151307812450955,3.278500480549358,12.276478886407794,17.867523208648258,18.287475603986643,6.427855018989104,19.374814349411494,10.087343673997328,13.685041224184854,14.25683552460702,14.57243362863557,1.2641839382126197,2.9187759868187024,18.847587317375094,5.319146586877803,12.116007361373192,18.743929151000337,5.3775759384731,19.936209829091478,18.648369074763966,1.0711616832640747,1.621666143574867,0.5505668770383121,14.923439969465164,0.39001711561177377,16.808178597468775,6.425895269009549,15.759258448834945,6.448686667712313,1.2242029072367089,2.9563244263576305,7.489779564793904,2.307074461272931,14.529399607357636,0.6355539573360547,16.69235537407711,9.295636169703476,18.67053565105109,1.979195722447744,7.840931675697362,12.654008864341645,14.13279334430591,0.24395097557654566,4.911602765505201,8.689000295439659,10.486464173153278,12.768997532499263,2.3930060000960873,14.244083845417862,3.1538342595066027,10.479713390962644,9.90196623890288,2.687397743348172,2.593289350053527,19.113077239536047,11.44267702211923,16.709181430774823,17.968247523293776,17.198773427920734,5.221480540963368,2.2128762590886453,18.37549810210115,11.85230883732956,1.5259068546816668,10.745982732932031,7.393837851135463,19.117594921142196,7.040648946561405,5.579750926696487,17.769892869586545,3.159769669514878,19.135341068597263,6.099893927219298,2.5923481342569454,18.75186639531165,2.889748503485614,4.576009673543728,8.55703778288964,1.7065089518033183,14.620634156899426,17.78725284957359,0.09724877379864605,11.61732995004025,9.763638077364782,5.714832014191171,9.906521761375856,11.792542585308784,15.86614521684547,19.2006640692833,19.070727190878806,9.220682402768535,18.910383750216226,14.515971504790105,7.566905755553752,5.317274833193109,8.18107230914736,7.106593110531749,15.015367403430888,14.538702161311319,12.263695585829112,5.527749280537431,15.825651262452084,18.35639946687957,16.71530742318425,10.23990820104454,2.3671620046086295,19.88244066155574,17.228417089363983,9.97785909432929,4.287426826068761,8.691487369771401,5.405090904662364,0.39306805114476706,7.0209858427007665,1.1548252462869701,11.801373132432712,9.538182968713533,12.142867915771198,6.516892652649129,6.527260247712543,18.476320131132823,1.6962248839563454,3.1798225664943836,2.597999183534019,7.665540766693235,13.91780166852412,9.26049123718303,15.89147797198482,3.8557133106199615,17.466784396417022,7.537615989821855,7.20492870042726,16.12023592061506,19.29638288826076,8.608551299272165,17.009639189084595,14.274779418307503,2.6994164464740456,17.10983125833932,17.840509870844983,16.02959751014314,18.707506428970206,5.322159502956367,15.867667018799235,7.077633593870636,11.8580877846607,15.913358252747436,12.105509141052973,15.983043061138265,6.432569077120727,4.490892448463697,15.688946125311105,13.244551610867617,0.459187071686733,9.215807703220648,0.5798273473020643,4.971452545826565,12.438515682249133,2.7449986003643767,11.5365831308964,17.07983688647991,10.320132828211882,18.556050671466767,0.2802764243752698,5.602947020483966,2.8799752592336647,10.956019402708467,18.101329259687795,0.4431283819131737,0.28740075463164594,18.377757659813348,4.267683371118118,3.306457605677293,0.7175108827493126,3.500608164417467,16.41140805609815,17.90084894468629,16.61264073783702,5.651310282051534,19.099787990388993,9.088151705087926,16.793907357575005,18.50893719608778,5.8309186077022,5.114907210736526,2.225697883897957,9.237328802485077,2.453748307639958,3.4563668843035877,13.143697644776315,0.7588518336169114,8.826911981288745,6.822771750838577,6.913754847453126,7.3454682352821,1.1514823052308065,10.340981192742497,10.041108647651495,8.641690784185423,2.077824460559512,6.133875232303945,7.757254106427194,2.3963100825586325,10.622377456488268,12.168628053243168,7.042207251149666,17.923656321750077,13.883787602392754,15.012549371800779,12.057504638017399,2.4187937836344453,17.036894436453707,1.2440483440650363,17.951019310397072,13.184952335058737,2.162394121179667,8.411293051666195,17.110873688065094,18.542782992258108,2.158058497383486,6.947488170379157,15.894623002094166,15.449248975822233,19.475442646295576,6.229872728351928,18.64687232552693,10.273625493392199,15.26442136921489,0.0012865240377513132,5.2368485508586105,6.575408718524218,16.911550832576715,8.324140370894177,7.728569835250689,7.719109337980288,4.398313098977744,16.30897903894153,9.102774160876708,15.218257154845638,17.386777714603355,8.36280508008587,8.764617317086376,18.02754291005552,7.297467081123048,7.68642677545663,9.524974310261403,12.198387443061653,2.4981107189934493,5.348420609248201,0.9238544314173502,5.108588378381782,1.3972550412533113,19.74972985369287,9.023739097086239,2.08050067645972,12.69293231293641,19.605392882637954,19.354629818887183,2.813748715475062,18.715335264268923,18.22372995233836,6.91045924379015,1.6779093393108102,6.879612115640583,5.156045965638154,12.953425083157484,11.74632668119683,2.7768566912470627,18.03180602772143,15.068449758002647,11.585091605526587,7.642885208732362,17.693135534732818,6.6647147969291565,5.4293018067680965,18.006262795136706,10.169909674514518,4.717268908656771,9.124212195169981,9.147405757623313,12.164345069597381,10.333835638682217,16.780148011477966,17.84583397112118,0.22387882844746354,12.267989385615937,6.68670913994132,5.016021100656456,3.002365894727439,19.822350336327844,11.451209661859956,8.240024796775831,9.646296255854722,19.85836161864234,9.394972002919516,12.30182410652123,12.190039156015855,6.852442664588163,4.1515979279786075,2.3482914400891186,19.267160461349317,13.3115851236722,2.458609149162889,7.134399222262631,14.465186650151388,2.181257073439382,15.344506040175032,6.8449426980753,5.609716567965157,1.764554202013846,3.253777233042894,4.3373006111918855,16.636876483404492,5.2694877906842486,19.82980432540163,6.406232482074148,1.2280358589500695,10.798858497262849,4.738934355174518,16.76267199199505,6.11433334521537,14.927201987015707,7.856322173587862,10.53128819625423,13.13839891849485,3.2950921167652103,13.050776446374876,2.355750842236506,5.650989632157639,17.799868128504013,19.462132993143246,5.986548540929459,0.49297656197926365,12.51854451434168,12.249451144769878,4.872893820504758,4.1039101514365095,4.029798079533258,6.881686869994956,7.186596870737638,11.512223822468911,12.532921844336036,16.016879831430586,12.19965432020504,13.01827308805493,6.740045843448872,4.143682603119272,18.020533644597304,18.386814430793194,0.18726603379266127,11.84763488691297,5.574794112494055,13.381234521254042,14.261791794089707,13.67649631986383,10.87125444261812,3.343111084062236,16.0603907407492,7.638337375079987,16.086034795706198,4.430219496759289,12.680266688282519,6.513939499232881,6.293521741326331,13.98489941060269,16.931012015515496,12.68018185268387,0.7301702916677089,13.39050489852796,18.790727075016832,12.773581130377947,12.756138612370126,8.05428181903725,15.423571680583574,10.65763364878801,0.026452853486005345,6.276307314701723,11.714703945897412,11.015181517237504,18.828776654906672,0.6818426738176786,11.178678766682353,14.722402665724683,2.0922834305363036,19.40458908514925,11.111278109891343,9.395070568117397,5.426884541377404,10.318200778644666,14.535829039081047,10.088487328905131,10.331312607859623,4.056836751886541,7.371456808506567,4.495598092225976,0.49934881585531166,6.478954639556802,0.34490041684518413,15.304055804018324,7.4417479602675085,3.06247576315529,18.629753028989334,15.707969564655627,10.364555363104206,18.09886719515475,5.709678776157361,19.856904812140137,1.5459549078952373,6.026228774876579,3.841497065927282,17.080657877684594,14.710571263387546,18.039803037043857,1.0537165897792722,8.76150870215223,14.3349048912957,14.08580724436963,6.550138977066258,18.320014390185456,1.3561592824729152,14.068744892016332,0.8672632665740609,5.75627997533013,0.9920615493564311,13.906898736849147,4.963629721682836,8.294313384215219,8.369187588576942,7.512782588429698,8.206558768617406,10.32094300634158,13.531950369391899,10.378895659430324,2.1301725036150954,10.814808198039731,1.5848535246466522,12.072688318465868,14.991186401197801,2.47126941492521,4.8206552762815535,8.980298828151469,15.599570946823569,7.590059312921484,2.521286850587008,13.469285726244763,17.81069468813466,13.531421043594264,10.036395583653857,19.671088606788967,11.107195291556256,3.985553036938847,10.609023348509794,18.028402965540728,18.26096904735406,18.522537850496704,6.442078604135739,13.460059815099953,10.536049838853781,15.674345834727461,4.435673859841649,11.888844038663242,16.557111422070406,12.009090949032256,18.900003515647384,11.542583401237675,2.1147751001773063,13.190881498864595,14.29074814298357,15.037471415832258,0.9239721145913959,15.846105105522202,15.337994728337566,1.2076228625768604,10.106162981011106,6.0420915356089155,5.393834859335183,11.659395783488513,10.625044147083194,8.042103831103343,6.558390443751692,17.9435819525329,1.772540611411344,7.956189788559809,17.886834525536955,15.388804187823602,6.415558206236316,3.6221591523017382,1.8415209610857586,9.895548636638658,14.120451309642771,6.843470007469192,3.199139821353243,10.40512346081445,8.318619337663868,19.95653147193758,11.339022792208002,15.339018276000122,2.0456110622789048,8.15079098734525,8.77254022988495,3.5237499271673345,12.80389514095111,10.013346675605392,9.023167899086491,0.5379710787768399,14.267373394333251,3.95303570158438,8.6496463199081,0.8993797848089624,5.957662681860163,8.103796794570917,16.646624898017357,11.034198488225826,1.3771529004798078,1.2955063140046885,11.827228890182703,9.750971072337457,5.745355719554079,3.846528058525087,5.194196684144021,13.791007956363618,15.754473117022382,4.876722410440073,0.75848488208758,16.186146719612378,9.36556550672693,9.148237494007256,19.47596914682034,10.214151438746107,13.77063557417272,12.677010431432514,8.09282525467136,12.313251983137006,18.566700798344815,2.4597984146424023,4.232646070103927,2.480631767100716,13.77789681040702,8.272606139293629,12.46299404946329,2.1555501285709155,2.0125247204461205,16.34711547280657,17.59218403271582,11.719079914262348,18.719604398849476,13.536353640954477,0.1876883974193566,9.663550156914846,2.319729572552389,11.951036299584356,13.597687422706874,0.9624880521099533,9.063867336956966,0.039664175747513575,1.8023603741193428,7.519692081900922,2.3202841211681013,5.602134521015145,9.808764782307101,19.341306953470493,6.760425485939376,12.549841601795432,5.464120432706809,4.9836173163026665,7.769667582597601,5.899921261128749,18.987485675671802,15.432258984123868,10.248484096653986,5.7468114201430875,6.871515930666088,7.057857765228457,10.83328098510593,2.22150452140923,1.8441092634306777,15.543345501275923,10.004261734214088,5.390525555069892,11.169783916724295,9.28141515628905,4.751520357972647,19.127088724483237,6.186092983109939,4.2442810285295085,19.096439891101195,4.760807124530704,3.8352180999950214,19.32235658224708,17.524355624221894,1.8164279530671656,0.10897927931274864,8.4736437930828,2.259338375839013,0.1976320955259725,8.59310341079254,6.38984138770311,8.584461140717984,16.47904382607863,1.584955678652813,6.022761084094546,6.96971244486718,6.071752455520398,7.136711033431133,12.579802758340648,11.37158592657209,13.960421970234442,9.573685334151328,18.43862719432043,13.636478537593476,0.7296435515224831,10.274199738588678,14.207813385604835,17.495196288320255,12.417495330494388,6.143630738296539,8.17775020276732,15.893163412370601,19.679112158591394,19.03525286399542,5.097791333759294,18.42574551539606,7.452417110962584,18.122703261060472,18.14515321943287,11.779594238191201,19.537351183824498,0.9642752653843223,6.044950731426706,17.935690905229208,1.7948077949399943,19.834831330378933,1.6719407611350912,11.270536262214407,17.830907887286994,14.93010862002572,19.007857886917932,12.698054315222986,7.7578412944884745,7.196628750300196,15.85086410176897,15.875220850212749,9.081306352714996,2.0530751588068474,18.936948252374833,12.86118173280913,19.666489657384922,15.890333744451555,10.055498865800159,15.61421712961006,6.423294783804949,5.77101579565011,4.717973015242003,4.76589049257524,19.869413027426948,4.136743233096549,16.93279736205621,15.58123619086408,5.045891857854472,5.240024485199388,19.562978237775926,7.396398523468539,13.639312239811172,7.719933933102707,14.692829969517058,2.2908973390697884,5.006286944870024,17.17975016677014,14.297517682123658,5.849762756631867,2.9338184340027285,2.2425916413301428,17.810016225521643,8.792202014702353,10.647175281886128,17.793879838004468,15.84126237125484,15.481195068420295,1.813736227615106,14.838943828708913,7.019095584429675,3.817388288957466,2.2152084374458925,4.830159261894655,9.76430442743255,0.5234191102423891,6.23232990248805,1.8498115793990655,1.9487457197902502,0.7248601974468372,8.979908024901304,15.719166165215466,1.2643025902951477,11.785128278481633,0.598734270300203,9.78221585742106,2.022648969881491,12.62655554038484,13.724627700179607,6.692207632936147,7.364439819973776,10.260601507325902,3.274014530436795,12.487132282429867,17.251302334434577,3.0777456751627064,10.800020193258861,18.371055951778686,16.24924193764775,7.454055751763131,0.8704093815870717,15.66789708811131,14.59838567069005,14.626594841958918,10.52193755765552,1.998741924562144,1.4589510778643122,15.306932334894077,7.3968599404772295,9.79094848552152,14.08379957508965,9.770169175792919,0.13560590207597922,18.063989642355935,9.293269817593334,3.1419433002955044,18.941409302353065,3.2730043152106836,14.212634821926846,5.973711203104126,17.523413734909035,19.762046820835465,5.74709738461856,18.12354834959566,8.224737012617855,15.102311393302262,9.30860171854938,6.109152303218139,6.170847532467056,0.7368401211951214,3.7704427977771715,19.864134864206783,8.636950581716224,8.154683564468574,13.90246387680088,11.76304630830646,0.531021623061374,3.9677957410930143,12.709989091616167,4.830292947765429,11.88273618663452,9.361681288880108,2.367903948642991,18.85577960842468,2.4655286354559003,7.089677075868992,16.036159944881675,7.1198153240915385,3.434990243287457,3.037681289705656,13.074568209881576,1.399149043522483,3.444348562209143,14.362924752275102,15.590979522710274,18.473271945831552,3.4312512378575866,10.71936341304176,14.837522474982743,6.181058117295208,16.796403022149498,8.728224300546067,4.238142020324305,8.534213378554302,10.903861295450156,3.7289506563209285,15.499592662934102,14.665401807767235,18.376189269389805,19.272316387971248,5.775381803231814,19.62561772653874,2.770623590638004,0.6542001566626432,4.018665241536747,1.236583643828908,17.56672328083504,4.836729659494914,13.666419640219068,4.481097565911272,10.226414123980344,12.478708409308155,4.584507230609138,1.3484267060346022,4.336983121913702,13.098859599572368,6.743724999951923,16.120241055373057,7.270334825192459,3.065742494141457,16.55156852224483,18.280077553244155,15.088046922126699,15.137229774697069,14.731252561315129,8.022994861665369,2.7397151477409043,0.6127119704040895,2.3540810523802813,1.0808782153396734,9.632209042896264,19.629565929162002,6.044311387299652,8.532766313009557,2.9118843687262475,13.575390734492508,1.3103829136058698,18.496877704696743,12.566880255291096,17.419987101883393,18.40534185168055,11.509182433857731,9.991956179410796,4.143457029459934,17.33787150535196,0.19962014837656028,6.716430197264396,7.184534962763154,8.505247628913368,19.774227983817756,16.636138053946908,3.068895209944218,14.254729778083025,14.22770099885392,5.050140632766671,2.209089233610362,2.4793961615613513,10.171748912541197,13.267435198559374,8.41519037747393,2.2300273232188017,4.541592231988072,0.9657004877406461,10.113255224620241,4.919399680183414,11.046531146336665,15.060431491907007,12.243494013739383,9.510511123400347,14.040013584487344,18.475909744514528,18.200321260992784,1.2659891022127434,15.264533663740462,0.2546962727035318,19.56738632742997,7.067070044727939,2.7917652830230777,10.41208866380086,9.726115653020976,1.4497846648926949,17.03224833938053,7.664256603389847,0.3339876178464518,2.6844717487302416,6.724682807825935,10.002684893554612,3.5578888288655763,4.406777983409147,18.135593377326128,19.43646238265429,6.704324940979407,18.832991797902856,1.0148808191849623,2.264532363619174,11.50618091565239,14.345586649640838,5.658495092606501,10.86383126417239,5.057610000933392,9.978265952563357,2.331225116613269,16.320867191883224,3.8118806694116003,9.559804718235117,15.983808523521743,11.787529456505581,16.76916247331143,1.4809262836403692,0.7255692283237902,8.884850017079003,18.885288300965378,0.6248764478468782,10.29144318035919,6.545785933831927,9.280493698294396,1.194685356542422,1.305414571887944,3.47029906529289,6.676368559585044,1.950298798985064,8.821555269802577,2.6989396002976385,17.384428322430235,16.319572749713483,13.421326825052171,5.039888369989147,2.012412567450288,18.128581826105957,10.410899698391699,15.045027057250554,13.423497819348253,4.977299642775352,0.4297572791803672,11.424138068885817,9.247696039552618,19.56772447100395,14.984699314624281,16.79544019417383,3.5764972741519374,9.450877913294198,18.01420503511837,3.6539719908279356,5.997459023355107,13.884822882081274,6.495834270908714,0.7624967012026174,8.27978189157481,17.524086619427422,10.924641773353274,16.44386276133659,16.362190310409556,9.699016355307496,0.5505973526399721,4.95115610958166,18.62163648450247,2.9949705319315756,18.410762107469388,6.877761801346174,9.919290400199694,6.418344804472826,2.1152468247031253,9.520177414818578,9.963234487515745,9.695662731865538,0.10433767299773411,1.6151925234940068,18.127177753432303,16.826712554833712,6.377559814896503,1.0896044916371261,7.4711686602002425,1.3706077464849775,18.994066272235358,8.747199130748871,14.670234667261433,8.86319332312767,8.539488409273757,9.92323319684425,8.485555449963918,17.998812550676483]}
},{}],53:[function(require,module,exports){
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
			tol = 40.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. k: '+k[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/chisquare/pdf/test/test.factory.js")
},{"./../lib/factory.js":49,"./fixtures/julia/decimal_decimal.json":52,"@stdlib/math/base/assert/is-nan":41,"@stdlib/math/base/random/randu":77,"@stdlib/math/base/special/abs":81,"@stdlib/math/constants/float64-eps":167,"@stdlib/math/constants/float64-ninf":179,"@stdlib/math/constants/float64-pinf":181,"tape":270}],54:[function(require,module,exports){
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

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/chisquare/pdf/test/test.js")
},{"./../lib":50,"tape":270}],55:[function(require,module,exports){
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
			tol = 40.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. k: '+k[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/chisquare/pdf/test/test.pdf.js")
},{"./../lib":50,"./fixtures/julia/decimal_decimal.json":52,"@stdlib/math/base/assert/is-nan":41,"@stdlib/math/base/random/randu":77,"@stdlib/math/base/special/abs":81,"@stdlib/math/constants/float64-eps":167,"@stdlib/math/constants/float64-ninf":179,"@stdlib/math/constants/float64-pinf":181,"tape":270}],56:[function(require,module,exports){
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

},{"./nan.js":58,"@stdlib/math/base/assert/is-nan":41,"@stdlib/math/constants/float64-pinf":181}],57:[function(require,module,exports){
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

},{"./factory.js":56,"./pdf.js":59,"@stdlib/utils/define-read-only-property":189}],58:[function(require,module,exports){
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

},{}],59:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":41,"@stdlib/math/constants/float64-pinf":181}],60:[function(require,module,exports){
'use strict';

// MODULES //

var degenerate = require( '@stdlib/math/base/dist/degenerate/pdf' ).factory;
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var gammaDeriv = require( './gamma_p_derivative.js' );
var nan = require( './nan.js' );


// MAIN //

/**
* Returns a function for evaluating the probability density function (PDF) for a gamma distribution with shape parameter `alpha` and rate parameter `beta`.
*
* @param {NonNegativeNumber} alpha - shape parameter
* @param {PositiveNumber} beta - rate parameter
* @returns {Function} PDF
*
* @example
* var pdf = factory( 3.0, 1.5 );
*
* var y = pdf( 1.0 );
* // returns ~0.377
*
* y = pdf( 4.0 );
* // returns ~0.067
*/
function factory( alpha, beta ) {
	if ( isnan( alpha ) || isnan( beta ) ) {
		return nan;
	}
	if ( alpha < 0.0 || beta <= 0.0 ) {
		return nan;
	}
	if ( alpha === 0.0 ) {
		return degenerate( 0.0 );
	}
	return pdf;

	/**
	* Evaluates the probability density function (PDF) for a gamma distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} evaluated PDF
	*
	* @example
	* var y = pdf( -1.2 );
	* // returns <number>
	*/
	function pdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x < 0.0 || x === PINF ) {
			return 0.0;
		}
		return gammaDeriv( alpha, x * beta ) * beta;
	} // end FUNCTION pdf()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./gamma_p_derivative.js":61,"./nan.js":63,"@stdlib/math/base/assert/is-nan":41,"@stdlib/math/base/dist/degenerate/pdf":57,"@stdlib/math/constants/float64-pinf":181}],61:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_58_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* Copyright John Maddock 2006-7, 2013-14.
* Copyright Paul A. Bristow 2007, 2013-14.
* Copyright Nikhar Agrawal 2013-14
* Copyright Christopher Kormanyos 2013-14
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE_1_0.txt or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var gammaln = require( '@stdlib/math/base/special/gammaln' );
var exp = require( '@stdlib/math/base/special/exp' );
var ln = require( '@stdlib/math/base/special/ln' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var FLOAT64_MAX = require( '@stdlib/math/constants/float64-max' );
var regularisedGammaPrefix = require( './regularised_gamma_prefix.js' );


// MAIN //

/**
* Calculates the partial derivative with respect to x of the incomplete gamma function.
*
* @private
* @param {PositiveNumber} a - function parameter
* @param {NonNegativeNumber} x - function parameter
* @returns {number} function value
*/
function gammaPDerivative( a, x ) {
	var f1;
	if ( a <= 0.0 ) {
		return NaN;
	}
	if ( x < 0.0 ) {
		return NaN;
	}
	if ( x === 0.0 ) {
		if ( a > 1.0 ) {
			return 0.0;
		}
		return a === 1.0 ? 1.0 : PINF;
	}
	f1 = regularisedGammaPrefix( a, x );
	if ( x < 1.0 && ( FLOAT64_MAX * x < f1 ) ) {
		return PINF;
	}
	if ( f1 === 0.0 ) {
		// Underflow in calculation, use logs instead:
		f1 = (a * ln( x )) - x - gammaln( a ) - ln( x );
		f1 = exp( f1 );
	} else {
		f1 /= x;
	}
	return f1;
} // end FUNCTION gammaPDerivative()


// EXPORTS //

module.exports = gammaPDerivative;

},{"./regularised_gamma_prefix.js":65,"@stdlib/math/base/special/exp":90,"@stdlib/math/base/special/gammaln":100,"@stdlib/math/base/special/ln":107,"@stdlib/math/constants/float64-max":176,"@stdlib/math/constants/float64-pinf":181}],62:[function(require,module,exports){
'use strict';

/**
* Gamma distribution probability density function (PDF).
*
* @module @stdlib/math/base/dist/gamma/pdf
*
* @example
* var pdf = require( '@stdlib/math/base/dist/gamma/pdf' );
*
* var y = pdf( 2.0, 0.5, 1.0 );
* // returns ~0.054
*
* var myPDF = pdf.factory( 6.0, 7.0 );
* y = myPDF( 2.0 );
* // returns ~0.026
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var pdf = require( './pdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( pdf, 'factory', factory );


// EXPORTS //

module.exports = pdf;

},{"./factory.js":60,"./pdf.js":64,"@stdlib/utils/define-read-only-property":189}],63:[function(require,module,exports){
'use strict';

/**
* Evaluates the probability density function (PDF) for an invalid gamma distribution.
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

},{}],64:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var gammaDeriv = require( './gamma_p_derivative.js' );


// MAIN //

/**
* Evaluates the probability density function (PDF) for a gamma distribution with shape parameter `alpha` and rate parameter `beta` at a value `x`.
*
* @param {number} x - input value
* @param {NonNegativeNumber} alpha - shape parameter
* @param {PositiveNumber} beta - rate parameter
* @returns {number} evaluated PDF
*
* @example
* var y = pdf( 2.0, 0.5, 1.0 );
* // returns ~0.054
* @example
* var y = pdf( 0.1, 1.0, 1.0 );
* // returns ~0.904
* @example
* var y = pdf( -1.0, 4.0, 2.0 );
* // returns 0.0
* @example
* var y = pdf( NaN, 0.6, 1.0 );
* // returns NaN
* @example
* var y = pdf( 0.0, NaN, 1.0 );
* // returns NaN
* @example
* var y = pdf( 0.0, 1.0, NaN );
* // returns NaN
* @example
* // Negative shape parameter:
* var y = pdf( 2.0, -1.0, 1.0 );
* // returns NaN
* @example
* // Negative rate parameter:
* var y = pdf( 2.0, 1.0, -1.0 );
* // returns NaN
*/
function pdf( x, alpha, beta ) {
	if (
		isnan( x ) ||
		isnan( alpha ) ||
		isnan( beta ) ||
		alpha < 0.0 ||
		beta <= 0.0
	) {
		return NaN;
	}
	if ( x < 0.0 || x === PINF ) {
		return 0.0;
	}
	if ( alpha === 0.0 ) {
		// Point mass at 0...
		return x === 0.0 ? PINF : 0.0;
	}
	return gammaDeriv( alpha, x * beta ) * beta;
} // end FUNCTION pdf()


// EXPORTS //

module.exports = pdf;

},{"./gamma_p_derivative.js":61,"@stdlib/math/base/assert/is-nan":41,"@stdlib/math/constants/float64-pinf":181}],65:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_64_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* Copyright John Maddock 2006-7, 2013-14.
* Copyright Paul A. Bristow 2007, 2013-14.
* Copyright Nikhar Agrawal 2013-14.
* Copyright Christopher Kormanyos 2013-14.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var lanczosSumExpGScaled = require( '@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled' );
var gammaln = require( '@stdlib/math/base/special/gammaln' );
var gamma = require( '@stdlib/math/base/special/gamma' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var max = require( '@stdlib/math/base/special/max' );
var min = require( '@stdlib/math/base/special/min' );
var ln = require( '@stdlib/math/base/special/ln' );
var MAX_LN = require( '@stdlib/math/constants/float64-max-ln' );
var MIN_LN = require( '@stdlib/math/constants/float64-min-ln' );
var G = require( '@stdlib/math/constants/float64-gamma-lanczos-g' );
var E = require( '@stdlib/math/constants/float64-e' );


// MAIN //

/**
* Computes `(z^a)*(e^-z) / gamma(a)`.
*
* @private
* @param {number} a - input value
* @param {number} z - input value
* @returns {number} function value
*/
function regularisedGammaPrefix( a, z ) {
	var prefix;
	var amza;
	var agh;
	var alz;
	var amz;
	var sq;
	var d;

	agh = a + G - 0.5;
	d = ( (z - a) - G + 0.5 ) / agh;
	if ( a < 1.0 ) {
		// Treat a < 1 as a special case because our Lanczos approximations are optimized against the factorials with a > 1, and for high precision types very small values of `a` can give rather erroneous results for gamma:
		if ( z <= MIN_LN ) {
			// Use logs, so should be free of cancellation errors:
			return exp( ( a * ln(z) ) - z - gammaln( a ) );
		}
		// No danger of overflow as gamma(a) < 1/a for small a, so direct calculation:
		return pow( z, a ) * exp( -z ) / gamma( a );
	}
	else if ( abs(d*d*a) <= 100.0 && a > 150.0 ) {
		// Special case for large a and a ~ z:
		prefix = ( a * ( log1p( d ) - d ) ) + ( z * ( 0.5-G ) / agh );
		prefix = exp( prefix );
	}
	else {
		// General case. Direct computation is most accurate, but use various fallbacks for different parts of the problem domain:
		alz = a * ln(z / agh);
		amz = a - z;
		if (
			min(alz, amz) <= MIN_LN ||
			max(alz, amz) >= MAX_LN
		) {
			amza = amz / a;
			if (
				min(alz, amz)/2.0 > MIN_LN &&
				max(alz, amz)/2.0 < MAX_LN
			) {
				// Compute square root of the result and then square it:
				sq = pow( z / agh, a / 2.0 ) * exp( amz / 2.0 );
				prefix = sq * sq;
			}
			else if (
				min(alz, amz)/4.0 > MIN_LN &&
				max(alz, amz)/4.0 < MAX_LN &&
				z > a
			) {
				// Compute the 4th root of the result then square it twice:
				sq = pow( z / agh, a / 4.0 ) * exp( amz / 4.0 );
				prefix = sq * sq;
				prefix *= prefix;
			}
			else if (
				amza > MIN_LN &&
				amza < MAX_LN
			) {
				prefix = pow( (z * exp(amza)) / agh, a );
			}
			else {
				prefix = exp( alz + amz );
			}
		}
		else
		{
			prefix = pow( z / agh, a ) * exp( amz );
		}
	}
	prefix *= sqrt( agh / E ) / lanczosSumExpGScaled( a );
	return prefix;
} // end FUNCTION regularisedGammaPrefix()


// EXPORTS //

module.exports = regularisedGammaPrefix;

},{"@stdlib/math/base/special/abs":81,"@stdlib/math/base/special/exp":90,"@stdlib/math/base/special/gamma":96,"@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled":94,"@stdlib/math/base/special/gammaln":100,"@stdlib/math/base/special/ln":107,"@stdlib/math/base/special/log1p":109,"@stdlib/math/base/special/max":111,"@stdlib/math/base/special/min":113,"@stdlib/math/base/special/pow":115,"@stdlib/math/base/special/sqrt":133,"@stdlib/math/constants/float64-e":166,"@stdlib/math/constants/float64-gamma-lanczos-g":170,"@stdlib/math/constants/float64-max-ln":175,"@stdlib/math/constants/float64-min-ln":178}],66:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":41}],67:[function(require,module,exports){
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

},{"./create_table.js":66,"@stdlib/assert/is-positive-integer":30,"@stdlib/math/base/random/minstd":72,"@stdlib/math/base/special/floor":92,"@stdlib/math/constants/int32-max":184,"@stdlib/utils/define-read-only-property":189}],68:[function(require,module,exports){
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

},{"./factory.js":67,"./minstd_shuffled.js":69,"@stdlib/utils/define-read-only-property":189}],69:[function(require,module,exports){
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

},{"./factory.js":67,"./rand_int32.js":70}],70:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":92,"@stdlib/math/constants/int32-max":184}],71:[function(require,module,exports){
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

},{"./rand_int32.js":74,"@stdlib/assert/is-positive-integer":30,"@stdlib/math/constants/int32-max":184,"@stdlib/utils/define-read-only-property":189}],72:[function(require,module,exports){
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

},{"./factory.js":71,"./minstd.js":73,"@stdlib/utils/define-read-only-property":189}],73:[function(require,module,exports){
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

},{"./factory.js":71,"./rand_int32.js":74}],74:[function(require,module,exports){
arguments[4][70][0].apply(exports,arguments)
},{"@stdlib/math/base/special/floor":92,"@stdlib/math/constants/int32-max":184,"dup":70}],75:[function(require,module,exports){
module.exports={
	"name": "minstd-shuffle"
}

},{}],76:[function(require,module,exports){
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

},{"./defaults.json":75,"./prngs.js":78,"@stdlib/assert/has-own-property":2,"@stdlib/assert/is-plain-object":27,"@stdlib/utils/define-read-only-property":189}],77:[function(require,module,exports){
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

},{"./factory.js":76,"./uniform.js":79,"@stdlib/utils/define-read-only-property":189}],78:[function(require,module,exports){
'use strict';

// MAIN //

var prngs = {};

prngs[ 'minstd' ] = require( '@stdlib/math/base/random/minstd' );
prngs[ 'minstd-shuffle' ] = require( '@stdlib/math/base/random/minstd-shuffle' );


// EXPORTS //

module.exports = prngs;

},{"@stdlib/math/base/random/minstd":72,"@stdlib/math/base/random/minstd-shuffle":68}],79:[function(require,module,exports){
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

},{"./factory.js":76}],80:[function(require,module,exports){
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

},{}],81:[function(require,module,exports){
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

},{"./abs.js":80}],82:[function(require,module,exports){
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

},{}],83:[function(require,module,exports){
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

},{"./ceil.js":82}],84:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-from-words":145,"@stdlib/math/base/utils/float64-get-high-word":149,"@stdlib/math/base/utils/float64-to-words":161}],85:[function(require,module,exports){
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

},{"./copysign.js":84}],86:[function(require,module,exports){
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
* @param {number} x - input value
* @returns {number} cosine (in radians)
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

},{"@stdlib/math/base/special/kernel-cos":101,"@stdlib/math/base/special/kernel-sin":103,"@stdlib/math/base/special/rempio2":123,"@stdlib/math/base/utils/float64-get-high-word":149}],87:[function(require,module,exports){
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

},{"./cos.js":86}],88:[function(require,module,exports){
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

},{"./expmulti.js":89,"@stdlib/math/base/assert/is-nan":41,"@stdlib/math/base/special/trunc":134,"@stdlib/math/constants/float64-ninf":179,"@stdlib/math/constants/float64-pinf":181}],89:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ldexp":105,"@stdlib/math/base/tools/evalpoly":138}],90:[function(require,module,exports){
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

},{"./exp.js":88}],91:[function(require,module,exports){
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

},{}],92:[function(require,module,exports){
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

},{"./floor.js":91}],93:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_64_0/boost/math/special_functions/lanczos.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var evalrational = require( '@stdlib/math/base/tools/evalrational' ).factory;


// VARIABLES //

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
	0.0,
	362880.0,
	1026576.0,
	1172700.0,
	723680.0,
	269325.0,
	63273.0,
	9450.0,
	870.0,
	45.0,
	1.0
];


// MAIN //

/**
* Calculates the Lanczos sum for the approximation of the gamma function (scaled by `exp(-g)`, where `g = 10.900511`.
*
* @name gammaLanczosSumExpGScaled
* @type {Function}
* @param {number} x - input value
* @returns {number} Lanczos sum approximation
*
* @example
* var v = gammaLanczosSumExpGScaled( 4.0 );
* // returns ~0.018
*
* @example
* var v = gammaLanczosSumExpGScaled( -1.5 );
* // returns ~25.337
*
* @example
* var v = gammaLanczosSumExpGScaled( -0.5 );
* // returns ~-12.911
*
* @example
* var v = gammaLanczosSumExpGScaled( 0.5 );
* // returns ~1.772
*
* @example
* var v = gammaLanczosSumExpGScaled( 0.0 );
* // returns Number.POSITIVE_INFINITY
*
* @example
* var v = gammaLanczosSumExpGScaled( NaN );
* // returns NaN
*/
var gammaLanczosSumExpGScaled = evalrational( NUM, DENOM );


// EXPORTS //

module.exports = gammaLanczosSumExpGScaled;

},{"@stdlib/math/base/tools/evalrational":141}],94:[function(require,module,exports){
'use strict';

/**
* Calculate the Lanczos sum for the approximation of the gamma function (scaled by `exp(-g)`, where `g = 10.900511`.
*
* @module @stdlib/math/base/special/gamma-lanczos-sum-expg-scaled
*
* @example
* var gammaLanczosSumExpGScaled = require( '@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled' );
*
* var v = gammaLanczosSumExpGScaled( 4.0 );
* // returns ~0.018
*
* v = gammaLanczosSumExpGScaled( -1.5 );
* // returns ~25.337
*
* v = gammaLanczosSumExpGScaled( -0.5 );
* // returns ~-12.911
*
* v = gammaLanczosSumExpGScaled( 0.5 );
* // returns ~1.772
*
* v = gammaLanczosSumExpGScaled( 0.0 );
* // returns Number.POSITIVE_INFINITY
*
* v = gammaLanczosSumExpGScaled( NaN );
* // returns NaN
*/

// MODULES //

var gammaLanczosSumExpGScaled = require( './gamma_lanczos_sum_expg_scaled.js' );


// EXPORTS //

module.exports = gammaLanczosSumExpGScaled;

},{"./gamma_lanczos_sum_expg_scaled.js":93}],95:[function(require,module,exports){
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

},{"./small_approximation.js":97,"./stirling_approximation.js":98,"@stdlib/math/base/assert/is-integer":39,"@stdlib/math/base/assert/is-nan":41,"@stdlib/math/base/assert/is-negative-zero":43,"@stdlib/math/base/special/abs":81,"@stdlib/math/base/special/floor":92,"@stdlib/math/base/special/sin":129,"@stdlib/math/base/tools/evalrational":141,"@stdlib/math/constants/float64-ninf":179,"@stdlib/math/constants/float64-pi":180,"@stdlib/math/constants/float64-pinf":181}],96:[function(require,module,exports){
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

},{"./gamma.js":95}],97:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-eulergamma":168}],98:[function(require,module,exports){
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

},{"@stdlib/math/base/special/exp":90,"@stdlib/math/base/special/pow":115,"@stdlib/math/base/tools/evalpoly":138,"@stdlib/math/constants/float64-sqrt-two-pi":183}],99:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":37,"@stdlib/math/base/assert/is-nan":41,"@stdlib/math/base/special/abs":81,"@stdlib/math/base/special/ln":107,"@stdlib/math/base/special/sinpi":131,"@stdlib/math/base/special/trunc":134,"@stdlib/math/base/tools/evalpoly":138,"@stdlib/math/constants/float64-pi":180,"@stdlib/math/constants/float64-pinf":181}],100:[function(require,module,exports){
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

},{"./gammaln.js":99}],101:[function(require,module,exports){
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

},{"./kernel_cos.js":102}],102:[function(require,module,exports){
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
* @param {number} x - input value (assumed to be bounded by ~pi/4 in magnitude)
* @param {number} y - tail of `x`
* @returns {number} cosine (in radians)
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

},{"@stdlib/math/base/tools/evalpoly":138}],103:[function(require,module,exports){
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

},{"./kernel_sin.js":104}],104:[function(require,module,exports){
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

},{}],105:[function(require,module,exports){
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

},{"./ldexp.js":106}],106:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":37,"@stdlib/math/base/assert/is-nan":41,"@stdlib/math/base/special/copysign":85,"@stdlib/math/base/utils/float64-exponent":143,"@stdlib/math/base/utils/float64-from-words":145,"@stdlib/math/base/utils/float64-normalize":153,"@stdlib/math/base/utils/float64-to-words":161,"@stdlib/math/constants/float64-exponent-bias":169,"@stdlib/math/constants/float64-max-base2-exponent":174,"@stdlib/math/constants/float64-max-base2-exponent-subnormal":173,"@stdlib/math/constants/float64-min-base2-exponent-subnormal":177,"@stdlib/math/constants/float64-ninf":179,"@stdlib/math/constants/float64-pinf":181}],107:[function(require,module,exports){
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

},{"./ln.js":108}],108:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":41,"@stdlib/math/base/tools/evalpoly":138,"@stdlib/math/base/utils/float64-get-high-word":149,"@stdlib/math/base/utils/float64-set-high-word":156,"@stdlib/math/base/utils/float64-to-words":161,"@stdlib/math/constants/float64-exponent-bias":169,"@stdlib/math/constants/float64-ninf":179}],109:[function(require,module,exports){
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

},{"./log1p.js":110}],110:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":41,"@stdlib/math/base/tools/evalpoly":138,"@stdlib/math/base/utils/float64-get-high-word":149,"@stdlib/math/base/utils/float64-set-high-word":156,"@stdlib/math/constants/float64-exponent-bias":169,"@stdlib/math/constants/float64-ninf":179,"@stdlib/math/constants/float64-pinf":181}],111:[function(require,module,exports){
'use strict';

/**
* Return the maximum value.
*
* @module @stdlib/math/base/special/max
*
* @example
* var max = require( '@stdlib/math/base/special/max' );
*
* var v = max( 3.14, 4.2 );
* // returns 4.2
*
* v = max( 5.9, 3.14, 4.2 );
* // returns 5.9
*
* v = max( 3.14, NaN );
* // returns NaN
*
* v = max( +0.0, -0.0 );
* // returns +0.0
*/

// MODULES //

var max = require( './max.js' );


// EXPORTS //

module.exports = max;

},{"./max.js":112}],112:[function(require,module,exports){
'use strict';

// MODULES //

var isPositiveZero = require( '@stdlib/math/base/assert/is-positive-zero' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );


// MAIN //

/**
* Returns the maximum value.
*
* @param {number} [x] - first number
* @param {number} [y] - second number
* @param {...number} [args] - numbers
* @returns {number} maximum value
*
* @example
* var v = max( 3.14, 4.2 );
* // returns 4.2

* @example
* var v = max( 5.9, 3.14, 4.2 );
* // returns 5.9
*
* @example
* var v = max( 3.14, NaN );
* // returns NaN
*
* @example
* var v = max( +0.0, -0.0 );
* // returns +0.0
*/
function max( x, y ) {
	var len;
	var m;
	var v;
	var i;

	len = arguments.length;
	if ( len === 2 ) {
		if ( isnan( x ) || isnan( y ) ) {
			return NaN;
		}
		if ( x === PINF || y === PINF ) {
			return PINF;
		}
		if ( x === y && x === 0.0 ) {
			if ( isPositiveZero( x ) ) {
				return x;
			}
			return y;
		}
		if ( x > y ) {
			return x;
		}
		return y;
	}
	m = NINF;
	for ( i = 0; i < len; i++ ) {
		v = arguments[ i ];
		if ( isnan( v ) || v === PINF ) {
			return v;
		}
		if ( v > m ) {
			m = v;
		} else if (
			v === m &&
			v === 0.0 &&
			isPositiveZero( v )
		) {
			m = v;
		}
	}
	return m;
} // end FUNCTION max()


// EXPORTS //

module.exports = max;

},{"@stdlib/math/base/assert/is-nan":41,"@stdlib/math/base/assert/is-positive-zero":47,"@stdlib/math/constants/float64-ninf":179,"@stdlib/math/constants/float64-pinf":181}],113:[function(require,module,exports){
'use strict';

/**
* Return the minimum value.
*
* @module @stdlib/math/base/special/min
*
* @example
* var min = require( '@stdlib/math/base/special/min' );
*
* var v = min( 3.14, 4.2 );
* // returns 3.14
*
* v = min( 5.9, 3.14, 4.2 );
* // returns 3.14
*
* v = min( 3.14, NaN );
* // returns NaN
*
* v = min( +0.0, -0.0 );
* // returns -0.0
*/

// MODULES //

var min = require( './min.js' );


// EXPORTS //

module.exports = min;

},{"./min.js":114}],114:[function(require,module,exports){
'use strict';

// MODULES //

var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );


// MAIN //

/**
* Returns the minimum value.
*
* @param {number} [x] - first number
* @param {number} [y] - second number
* @param {...number} [args] - numbers
* @returns {number} minimum value
*
* @example
* var v = min( 3.14, 4.2 );
* // returns 3.14

* @example
* var v = min( 5.9, 3.14, 4.2 );
* // returns 3.14
*
* @example
* var v = min( 3.14, NaN );
* // returns NaN
*
* @example
* var v = min( +0.0, -0.0 );
* // returns -0.0
*/
function min( x, y ) {
	var len;
	var m;
	var v;
	var i;

	len = arguments.length;
	if ( len === 2 ) {
		if ( isnan( x ) || isnan( y ) ) {
			return NaN;
		}
		if ( x === NINF || y === NINF ) {
			return NINF;
		}
		if ( x === y && x === 0.0 ) {
			if ( isNegativeZero( x ) ) {
				return x;
			}
			return y;
		}
		if ( x < y ) {
			return x;
		}
		return y;
	}
	m = PINF;
	for ( i = 0; i < len; i++ ) {
		v = arguments[ i ];
		if ( isnan( v ) || v === NINF ) {
			return v;
		}
		if ( v < m ) {
			m = v;
		} else if (
			v === m &&
			v === 0.0 &&
			isNegativeZero( v )
		) {
			m = v;
		}
	}
	return m;
} // end FUNCTION min()


// EXPORTS //

module.exports = min;

},{"@stdlib/math/base/assert/is-nan":41,"@stdlib/math/base/assert/is-negative-zero":43,"@stdlib/math/constants/float64-ninf":179,"@stdlib/math/constants/float64-pinf":181}],115:[function(require,module,exports){
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

},{"./pow.js":118}],116:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":138,"@stdlib/math/base/utils/float64-get-high-word":149,"@stdlib/math/base/utils/float64-set-high-word":156,"@stdlib/math/base/utils/float64-set-low-word":158,"@stdlib/math/constants/float64-exponent-bias":169}],117:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":138,"@stdlib/math/base/utils/float64-set-low-word":158}],118:[function(require,module,exports){
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

},{"./log2ax.js":116,"./logx.js":117,"./pow2.js":119,"./x_is_zero.js":120,"./y_is_huge.js":121,"./y_is_infinite.js":122,"@stdlib/math/base/assert/is-infinite":37,"@stdlib/math/base/assert/is-integer":39,"@stdlib/math/base/assert/is-nan":41,"@stdlib/math/base/assert/is-odd":45,"@stdlib/math/base/special/abs":81,"@stdlib/math/base/special/sqrt":133,"@stdlib/math/base/utils/float64-get-high-word":149,"@stdlib/math/base/utils/float64-get-low-word":151,"@stdlib/math/base/utils/float64-set-low-word":158,"@stdlib/math/base/utils/float64-to-words":161,"@stdlib/math/base/utils/uint32-to-int32":164,"@stdlib/math/constants/float64-ninf":179,"@stdlib/math/constants/float64-pinf":181}],119:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ldexp":105,"@stdlib/math/base/tools/evalpoly":138,"@stdlib/math/base/utils/float64-get-high-word":149,"@stdlib/math/base/utils/float64-set-high-word":156,"@stdlib/math/base/utils/float64-set-low-word":158,"@stdlib/math/base/utils/uint32-to-int32":164,"@stdlib/math/constants/float64-exponent-bias":169,"@stdlib/math/constants/float64-ln-two":172}],120:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-odd":45,"@stdlib/math/base/special/copysign":85,"@stdlib/math/constants/float64-ninf":179,"@stdlib/math/constants/float64-pinf":181}],121:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":149}],122:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":81,"@stdlib/math/constants/float64-pinf":181}],123:[function(require,module,exports){
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

},{"./rempio2.js":125}],124:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":92,"@stdlib/math/base/special/ldexp":105}],125:[function(require,module,exports){
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

},{"./kernel_rempio2.js":124,"./rempio2_medium.js":126,"@stdlib/math/base/utils/float64-from-words":145,"@stdlib/math/base/utils/float64-get-high-word":149,"@stdlib/math/base/utils/float64-get-low-word":151}],126:[function(require,module,exports){
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

},{"@stdlib/math/base/special/round":127,"@stdlib/math/base/utils/float64-get-high-word":149}],127:[function(require,module,exports){
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

},{"./round.js":128}],128:[function(require,module,exports){
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

},{}],129:[function(require,module,exports){
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

},{"./sin.js":130}],130:[function(require,module,exports){
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
* @param {number} x - input value
* @returns {number} sine (in radians)
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

},{"@stdlib/math/base/special/kernel-cos":101,"@stdlib/math/base/special/kernel-sin":103,"@stdlib/math/base/special/rempio2":123,"@stdlib/math/base/utils/float64-get-high-word":149}],131:[function(require,module,exports){
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

},{"./sinpi.js":132}],132:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":37,"@stdlib/math/base/assert/is-nan":41,"@stdlib/math/base/special/abs":81,"@stdlib/math/base/special/copysign":85,"@stdlib/math/base/special/cos":87,"@stdlib/math/base/special/sin":129,"@stdlib/math/constants/float64-pi":180}],133:[function(require,module,exports){
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

},{}],134:[function(require,module,exports){
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

},{"./trunc.js":135}],135:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ceil":83,"@stdlib/math/base/special/floor":92}],136:[function(require,module,exports){
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

},{}],137:[function(require,module,exports){
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

},{"./evalpoly.js":136}],138:[function(require,module,exports){
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

},{"./evalpoly.js":136,"./factory.js":137,"@stdlib/utils/define-read-only-property":189}],139:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":81}],140:[function(require,module,exports){
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

},{"./evalrational.js":139}],141:[function(require,module,exports){
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

},{"./evalrational.js":139,"./factory.js":140,"@stdlib/utils/define-read-only-property":189}],142:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":149,"@stdlib/math/constants/float64-exponent-bias":169,"@stdlib/math/constants/float64-high-word-exponent-mask":171}],143:[function(require,module,exports){
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

},{"./exponent.js":142}],144:[function(require,module,exports){
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

},{"./indices.js":146}],145:[function(require,module,exports){
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

},{"./from_words.js":144}],146:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":15}],147:[function(require,module,exports){
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

},{"./high.js":148}],148:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":15}],149:[function(require,module,exports){
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

},{"./get_high_word.js":147}],150:[function(require,module,exports){
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

},{"./low.js":152}],151:[function(require,module,exports){
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

},{"./get_low_word.js":150}],152:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":15}],153:[function(require,module,exports){
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

},{"./normalize.js":154}],154:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":37,"@stdlib/math/base/assert/is-nan":41,"@stdlib/math/base/special/abs":81,"@stdlib/math/constants/float64-smallest-normal":182}],155:[function(require,module,exports){
arguments[4][148][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":15,"dup":148}],156:[function(require,module,exports){
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

},{"./set_high_word.js":157}],157:[function(require,module,exports){
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

},{"./high.js":155}],158:[function(require,module,exports){
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

},{"./set_low_word.js":160}],159:[function(require,module,exports){
arguments[4][152][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":15,"dup":152}],160:[function(require,module,exports){
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

},{"./low.js":159}],161:[function(require,module,exports){
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

},{"./to_words.js":163}],162:[function(require,module,exports){
arguments[4][146][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":15,"dup":146}],163:[function(require,module,exports){
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

},{"./indices.js":162}],164:[function(require,module,exports){
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

},{"./uint32_to_int32.js":165}],165:[function(require,module,exports){
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

},{}],166:[function(require,module,exports){
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

},{}],167:[function(require,module,exports){
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

},{}],168:[function(require,module,exports){
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

},{}],169:[function(require,module,exports){
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

},{}],170:[function(require,module,exports){
'use strict';

/**
* Arbitrary constant `g` to be used in Lanczos approximation functions.
*
* @module @stdlib/math/constants/float64-gamma-lanczos-g
* @type {number}
*
* @example
* var FLOAT64_GAMMA_LANCZOS_G = require( '@stdlib/math/constants/float64-gamma-lanczos-g' );
* // returns 10.900511
*/


// MAIN //

/**
* Arbitrary constant `g` to be used in Lanczos approximation functions.
*
* @constant
* @type {number}
* @default 10.900511
* @see [Lanczos Approximation]{@link https://en.wikipedia.org/wiki/Lanczos_approximation}
*/
var FLOAT64_GAMMA_LANCZOS_G = 10.90051099999999983936049829935654997826;


// EXPORTS //

module.exports = FLOAT64_GAMMA_LANCZOS_G;

},{}],171:[function(require,module,exports){
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

},{}],172:[function(require,module,exports){
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

},{}],173:[function(require,module,exports){
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

},{}],174:[function(require,module,exports){
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

},{}],175:[function(require,module,exports){
'use strict';

/**
* Natural logarithm of the maximum double-precision floating-point number.
*
* @module @stdlib/math/constants/float64-max-ln
* @type {number}
*
* @example
* var FLOAT64_MAX_LN = require( '@stdlib/math/constants/float64-max-ln' );
* // returns 709.782712893384
*/


// MAIN //

/**
* The natural logarithm of the maximum double-precision floating-point number is given by
*
* ``` tex
* \ln \left( 2^{1023} (2 - 2^{-52}) \right)
* ```
*
* @constant
* @type {number}
* @default 709.782712893384
* @see [IEEE 754]{@link http://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MAX_LN = 709.782712893384;


// EXPORTS //

module.exports = FLOAT64_MAX_LN;

},{}],176:[function(require,module,exports){
'use strict';

/**
* Maximum double-precision floating-point number.
*
* @module @stdlib/math/constants/float64-max
* @type {number}
*
* @example
* var FLOAT64_MAX = require( '@stdlib/math/constants/float64-max' );
* // returns 1.7976931348623157e+308
*/


// MAIN //

/**
* The maximum double-precision floating-point number is given by
*
* ``` tex
* 2^{1023} (2 - 2^{-52})
* ```
*
* @constant
* @type {number}
* @default 1.7976931348623157e+308
* @see [IEEE 754]{@link http://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MAX = 1.7976931348623157e+308;


// EXPORTS //

module.exports = FLOAT64_MAX;

},{}],177:[function(require,module,exports){
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

},{}],178:[function(require,module,exports){
'use strict';

/**
* Natural logarithm of the smallest normalized double-precision floating-point number.
*
* @module @stdlib/math/constants/float64-min-ln
* @type {number}
*
* @example
* var FLOAT64_MIN_LN = require( '@stdlib/math/constants/float64-min-ln' );
* // returns -708.3964185322641
*/


// MAIN //

/**
* The natural logarithm of the smallest normalized double-precision floating-point number is given by
*
* ``` tex
* -\ln \left( 2^{1023-1} \right)
* ```
*
* @constant
* @type {number}
* @default -708.3964185322641
* @see [IEEE 754]{@link http://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MIN_LN = -708.3964185322641;


// EXPORTS //

module.exports = FLOAT64_MIN_LN;

},{}],179:[function(require,module,exports){
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

},{}],180:[function(require,module,exports){
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

},{}],181:[function(require,module,exports){
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

},{}],182:[function(require,module,exports){
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

},{}],183:[function(require,module,exports){
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

},{}],184:[function(require,module,exports){
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

},{}],185:[function(require,module,exports){
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

},{}],186:[function(require,module,exports){
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

},{"@stdlib/assert/is-buffer":5,"@stdlib/regexp/function-name":185,"@stdlib/utils/native-class":200}],187:[function(require,module,exports){
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

},{"./constructor_name.js":186}],188:[function(require,module,exports){
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

},{}],189:[function(require,module,exports){
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

},{"./define_read_only_property.js":188}],190:[function(require,module,exports){
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

},{}],191:[function(require,module,exports){
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

},{"./detect_symbol_support.js":190}],192:[function(require,module,exports){
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

},{"@stdlib/utils/detect-symbol-support":191}],193:[function(require,module,exports){
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

},{"./has_tostringtag_support.js":192}],194:[function(require,module,exports){
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

},{"./native.js":197,"./polyfill.js":198,"@stdlib/assert/is-function":7}],195:[function(require,module,exports){
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

},{"./detect.js":194}],196:[function(require,module,exports){
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

},{"./get_prototype_of.js":195}],197:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = Object.getPrototypeOf;

},{}],198:[function(require,module,exports){
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

},{"./proto.js":199,"@stdlib/utils/native-class":200}],199:[function(require,module,exports){
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

},{}],200:[function(require,module,exports){
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

},{"./native_class.js":201,"./polyfill.js":202,"@stdlib/utils/detect-tostringtag-support":193}],201:[function(require,module,exports){
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

},{"./tostring.js":203}],202:[function(require,module,exports){
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

},{"./tostring.js":203,"./tostringtag.js":204,"@stdlib/assert/has-own-property":2}],203:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = Object.prototype.toString; // eslint-disable-line no-redeclare

},{}],204:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';

},{}],205:[function(require,module,exports){
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

},{"./fixtures/nodelist.js":206,"./fixtures/re.js":207,"./fixtures/typedarray.js":208}],206:[function(require,module,exports){
'use strict';

// MODULES //

var root = require( 'system.global' )(); // eslint-disable-line no-redeclare


// MAIN //

var nodeList = root.document && root.document.childNodes;


// EXPORTS //

module.exports = nodeList;

},{"system.global":267}],207:[function(require,module,exports){
'use strict';

var RE = /./;


// EXPORTS //

module.exports = RE;

},{}],208:[function(require,module,exports){
'use strict';

var typedarray = Int8Array;


// EXPORTS //

module.exports = typedarray;

},{}],209:[function(require,module,exports){
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

},{"./check.js":205,"./polyfill.js":210,"./typeof.js":211}],210:[function(require,module,exports){
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

},{"@stdlib/utils/constructor-name":187}],211:[function(require,module,exports){
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

},{"@stdlib/utils/constructor-name":187}],212:[function(require,module,exports){
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

},{}],213:[function(require,module,exports){

},{}],214:[function(require,module,exports){
arguments[4][213][0].apply(exports,arguments)
},{"dup":213}],215:[function(require,module,exports){
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

},{}],216:[function(require,module,exports){
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

},{"base64-js":212,"ieee754":235}],217:[function(require,module,exports){
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
},{"../../is-buffer/index.js":237}],218:[function(require,module,exports){
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

},{"./lib/is_arguments.js":219,"./lib/keys.js":220}],219:[function(require,module,exports){
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

},{}],220:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],221:[function(require,module,exports){
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

},{"foreach":231,"object-keys":240}],222:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],223:[function(require,module,exports){
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

},{"./helpers/isFinite":224,"./helpers/isNaN":225,"./helpers/mod":226,"./helpers/sign":227,"es-to-primitive/es5":228,"has":234,"is-callable":238}],224:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],225:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],226:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],227:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],228:[function(require,module,exports){
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

},{"./helpers/isPrimitive":229,"is-callable":238}],229:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],230:[function(require,module,exports){
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

},{}],231:[function(require,module,exports){

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


},{}],232:[function(require,module,exports){
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

},{}],233:[function(require,module,exports){
var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":232}],234:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":233}],235:[function(require,module,exports){
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

},{}],236:[function(require,module,exports){
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

},{}],237:[function(require,module,exports){
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

},{}],238:[function(require,module,exports){
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

},{}],239:[function(require,module,exports){
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

},{}],240:[function(require,module,exports){
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

},{"./isArguments":241}],241:[function(require,module,exports){
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

},{}],242:[function(require,module,exports){
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
},{"_process":215}],243:[function(require,module,exports){
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
},{"_process":215}],244:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":245}],245:[function(require,module,exports){
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
},{"./_stream_readable":247,"./_stream_writable":249,"core-util-is":217,"inherits":236,"process-nextick-args":243}],246:[function(require,module,exports){
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
},{"./_stream_transform":248,"core-util-is":217,"inherits":236}],247:[function(require,module,exports){
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
},{"./_stream_duplex":245,"./internal/streams/BufferList":250,"./internal/streams/destroy":251,"./internal/streams/stream":252,"_process":215,"core-util-is":217,"events":230,"inherits":236,"isarray":253,"process-nextick-args":243,"safe-buffer":260,"string_decoder/":254,"util":213}],248:[function(require,module,exports){
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
},{"./_stream_duplex":245,"core-util-is":217,"inherits":236}],249:[function(require,module,exports){
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
},{"./_stream_duplex":245,"./internal/streams/destroy":251,"./internal/streams/stream":252,"_process":215,"core-util-is":217,"inherits":236,"process-nextick-args":243,"safe-buffer":260,"util-deprecate":276}],250:[function(require,module,exports){
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
},{"safe-buffer":260}],251:[function(require,module,exports){
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
},{"process-nextick-args":243}],252:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":230}],253:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],254:[function(require,module,exports){
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
},{"safe-buffer":260}],255:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":256}],256:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":245,"./lib/_stream_passthrough.js":246,"./lib/_stream_readable.js":247,"./lib/_stream_transform.js":248,"./lib/_stream_writable.js":249}],257:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":256}],258:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":249}],259:[function(require,module,exports){
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
},{"_process":215,"through":275}],260:[function(require,module,exports){
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

},{"buffer":216}],261:[function(require,module,exports){
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

},{"events":230,"inherits":236,"readable-stream/duplex.js":244,"readable-stream/passthrough.js":255,"readable-stream/readable.js":256,"readable-stream/transform.js":257,"readable-stream/writable.js":258}],262:[function(require,module,exports){
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

},{"es-abstract/es5":223,"function-bind":233}],263:[function(require,module,exports){
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

},{"./implementation":262,"./polyfill":264,"./shim":265,"define-properties":221,"function-bind":233}],264:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":262}],265:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":264,"define-properties":221}],266:[function(require,module,exports){
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
},{}],267:[function(require,module,exports){
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

},{"./implementation":266,"./polyfill":268,"./shim":269,"define-properties":221}],268:[function(require,module,exports){
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
},{"./implementation":266}],269:[function(require,module,exports){
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
},{"./polyfill":268,"define-properties":221}],270:[function(require,module,exports){
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
},{"./lib/default_stream":271,"./lib/results":273,"./lib/test":274,"_process":215,"defined":222,"through":275}],271:[function(require,module,exports){
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
},{"_process":215,"fs":214,"through":275}],272:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":215}],273:[function(require,module,exports){
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
},{"_process":215,"events":230,"function-bind":233,"has":234,"inherits":236,"object-inspect":239,"resumer":259,"through":275}],274:[function(require,module,exports){
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
},{"./next_tick":272,"deep-equal":218,"defined":222,"events":230,"has":234,"inherits":236,"path":242,"string.prototype.trim":263}],275:[function(require,module,exports){
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
},{"_process":215,"stream":261}],276:[function(require,module,exports){
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
},{}]},{},[53,54,55]);
