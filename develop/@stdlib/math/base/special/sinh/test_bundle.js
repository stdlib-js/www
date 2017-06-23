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

},{"@stdlib/utils/native-class":127}],5:[function(require,module,exports){
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

},{"@stdlib/utils/type-of":136}],9:[function(require,module,exports){
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

},{"./generic.js":9,"./object.js":12,"./primitive.js":13,"@stdlib/utils/define-read-only-property":116}],11:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-integer":37,"@stdlib/math/constants/float64-ninf":108,"@stdlib/math/constants/float64-pinf":109}],12:[function(require,module,exports){
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

},{"./generic.js":17,"./object.js":19,"./primitive.js":20,"@stdlib/utils/define-read-only-property":116}],19:[function(require,module,exports){
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

},{"./try2serialize.js":22,"@stdlib/utils/detect-tostringtag-support":120,"@stdlib/utils/native-class":127}],20:[function(require,module,exports){
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

},{"./is_object_like.js":24,"@stdlib/assert/tools/array-function":34,"@stdlib/utils/define-read-only-property":116}],24:[function(require,module,exports){
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

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var arrayfun = require( '@stdlib/assert/tools/array-function' );
var isPlainObject = require( './is_plain_object.js' );


// MAIN //

setReadOnly( isPlainObject, 'isPlainObjectArray', arrayfun( isPlainObject ) );


// EXPORTS //

module.exports = isPlainObject;

},{"./is_plain_object.js":28,"@stdlib/assert/tools/array-function":34,"@stdlib/utils/define-read-only-property":116}],28:[function(require,module,exports){
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

},{"@stdlib/assert/has-own-property":2,"@stdlib/assert/is-function":7,"@stdlib/assert/is-object":25,"@stdlib/utils/get-prototype-of":123,"@stdlib/utils/native-class":127}],29:[function(require,module,exports){
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
* @example
* var bool = isPositiveInteger( new Number( 5.0 ) );
* // returns true
* @example
* var bool = isPositiveInteger( 0.0 );
* // returns false
* @example
* var bool = isPositiveInteger( -5.0 );
* // returns false
* @example
* var bool = isPositiveInteger( 3.14 );
* // returns false
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

},{"./generic.js":29,"./object.js":31,"./primitive.js":32,"@stdlib/utils/define-read-only-property":116}],31:[function(require,module,exports){
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

},{"./is_infinite.js":36}],36:[function(require,module,exports){
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
* @example
* var bool = isInfinite( Number.NEGATIVE_INFINITY );
* // returns true
* @example
* var bool = isInfinite( 5.0 );
* // returns false
* @example
* var bool = isInfinite( NaN );
* // returns false
*/
function isInfinite( x ) {
	return (x === PINF || x === NINF);
} // end FUNCTION isInfinite()


// EXPORTS //

module.exports = isInfinite;

},{"@stdlib/math/constants/float64-ninf":108,"@stdlib/math/constants/float64-pinf":109}],37:[function(require,module,exports){
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

},{"./is_integer.js":38}],38:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":69}],39:[function(require,module,exports){
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

},{"./is_nan.js":40}],40:[function(require,module,exports){
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

},{}],41:[function(require,module,exports){
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

},{"./is_negative_zero.js":42}],42:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-ninf":108}],43:[function(require,module,exports){
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

},{"./is_positive_zero.js":44}],44:[function(require,module,exports){
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
* @example
* var bool = isPositiveZero( -0.0 );
* // returns false
*/
function isPositiveZero( x ) {
	return (x === 0.0 && 1.0/x === PINF);
} // end FUNCTION isPositiveZero()


// EXPORTS //

module.exports = isPositiveZero;

},{"@stdlib/math/constants/float64-pinf":109}],45:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":39}],46:[function(require,module,exports){
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

},{"./create_table.js":45,"@stdlib/assert/is-positive-integer":30,"@stdlib/math/base/random/minstd":51,"@stdlib/math/base/special/floor":69,"@stdlib/math/constants/int32-max":111,"@stdlib/utils/define-read-only-property":116}],47:[function(require,module,exports){
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

},{"./factory.js":46,"./minstd_shuffled.js":48,"@stdlib/utils/define-read-only-property":116}],48:[function(require,module,exports){
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

},{"./factory.js":46,"./rand_int32.js":49}],49:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":69,"@stdlib/math/constants/int32-max":111}],50:[function(require,module,exports){
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

},{"./rand_int32.js":53,"@stdlib/assert/is-positive-integer":30,"@stdlib/math/constants/int32-max":111,"@stdlib/utils/define-read-only-property":116}],51:[function(require,module,exports){
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

},{"./factory.js":50,"./minstd.js":52,"@stdlib/utils/define-read-only-property":116}],52:[function(require,module,exports){
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

},{"./factory.js":50,"./rand_int32.js":53}],53:[function(require,module,exports){
arguments[4][49][0].apply(exports,arguments)
},{"@stdlib/math/base/special/floor":69,"@stdlib/math/constants/int32-max":111,"dup":49}],54:[function(require,module,exports){
module.exports={
	"name": "minstd-shuffle"
}

},{}],55:[function(require,module,exports){
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

},{"./defaults.json":54,"./prngs.js":57,"@stdlib/assert/has-own-property":2,"@stdlib/assert/is-plain-object":27,"@stdlib/utils/define-read-only-property":116}],56:[function(require,module,exports){
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

},{"./factory.js":55,"./uniform.js":58,"@stdlib/utils/define-read-only-property":116}],57:[function(require,module,exports){
'use strict';

// MAIN //

var prngs = {};

prngs[ 'minstd' ] = require( '@stdlib/math/base/random/minstd' );
prngs[ 'minstd-shuffle' ] = require( '@stdlib/math/base/random/minstd-shuffle' );


// EXPORTS //

module.exports = prngs;

},{"@stdlib/math/base/random/minstd":51,"@stdlib/math/base/random/minstd-shuffle":47}],58:[function(require,module,exports){
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

},{"./factory.js":55}],59:[function(require,module,exports){
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
* @example
* var v = abs( 2.0 );
* // returns 2.0
* @example
* var v = abs( 0.0 );
* // returns 0.0
* @example
* var v = abs( -0.0 );
* // returns 0.0
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

},{}],60:[function(require,module,exports){
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

},{"./abs.js":59}],61:[function(require,module,exports){
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

},{}],62:[function(require,module,exports){
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

},{"./ceil.js":61}],63:[function(require,module,exports){
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
* @example
* var z = copysign( 3.14, -1.0 );
* // returns -3.14
* @example
* var z = copysign( 1.0, -0.0 );
* // returns -1.0
* @example
* var z = copysign( -3.14, -0.0 );
* // returns -3.14
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

},{"@stdlib/math/base/utils/float64-from-words":91,"@stdlib/math/base/utils/float64-get-high-word":95,"@stdlib/math/base/utils/float64-to-words":98}],64:[function(require,module,exports){
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

},{"./copysign.js":63}],65:[function(require,module,exports){
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
* @example
* var v = exp( -9.0 );
* // returns ~1.234e-4
* @example
* var v = exp( 0.0 );
* // returns 1.0
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

},{"./expmulti.js":66,"@stdlib/math/base/assert/is-nan":39,"@stdlib/math/base/special/trunc":80,"@stdlib/math/constants/float64-ninf":108,"@stdlib/math/constants/float64-pinf":109}],66:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ldexp":70,"@stdlib/math/base/tools/evalpoly":84}],67:[function(require,module,exports){
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

},{"./exp.js":65}],68:[function(require,module,exports){
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

},{}],69:[function(require,module,exports){
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

},{"./floor.js":68}],70:[function(require,module,exports){
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

},{"./ldexp.js":71}],71:[function(require,module,exports){
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
* @example
* var x = ldexp( 4.0, -2 ); // => 4 * 2^(-2) = 4 * (1/4)
* // returns 1.0
* @example
* var x = ldexp( 0.0, 20 );
* // returns 0.0
* @example
* var x = ldexp( -0.0, 39 );
* // returns -0.0
* @example
* var x = ldexp( NaN, -101 );
* // returns NaN
* @example
* var x = ldexp( Number.POSITIVE_INFINITY, 11 );
* // returns Number.POSITIVE_INFINITY
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

},{"@stdlib/math/base/assert/is-infinite":35,"@stdlib/math/base/assert/is-nan":39,"@stdlib/math/base/special/copysign":64,"@stdlib/math/base/utils/float64-exponent":89,"@stdlib/math/base/utils/float64-from-words":91,"@stdlib/math/base/utils/float64-normalize":96,"@stdlib/math/base/utils/float64-to-words":98,"@stdlib/math/constants/float64-exponent-bias":102,"@stdlib/math/constants/float64-max-base2-exponent":106,"@stdlib/math/constants/float64-max-base2-exponent-subnormal":105,"@stdlib/math/constants/float64-min-base2-exponent-subnormal":107,"@stdlib/math/constants/float64-ninf":108,"@stdlib/math/constants/float64-pinf":109}],72:[function(require,module,exports){
'use strict';

/**
* Compute the hyperbolic sine of a number.
*
* @module @stdlib/math/base/special/sinh
*
* @example
* var sinh = require( '@stdlib/math/base/special/sinh' );
*
* var v = sinh( 0.0 );
* // returns 0.0
*
* v = sinh( 2.0 );
* // returns ~3.627
*
* v = sinh( -2.0 );
* // returns ~-3.627
*
* v = sinh( NaN );
* // returns NaN
*/

// MODULES //

var sinh = require( './sinh.js' );


// EXPORTS //

module.exports = sinh;

},{"./sinh.js":73}],73:[function(require,module,exports){
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
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );
var LN2 = require( '@stdlib/math/constants/float64-ln-two' );


// VARIABLES //

// ln(2^1024)
var MAXLOG = 7.09782712893383996843e2;

// ln(2^-1022)
var MINLOG = -7.08396418532264106224e2;

var POS_OVERFLOW = MAXLOG + LN2;
var NEG_OVERFLOW = MINLOG - LN2;

var LARGE = MAXLOG - LN2;

var P = [
	-3.51754964808151394800e5,
	-1.15614435765005216044e4,
	-1.63725857525983828727e2,
	-7.89474443963537015605e-1
];
var Q = [
	-2.11052978884890840399e6,
	3.61578279834431989373e4,
	-2.77711081420602794433e2,
	1.0
];


// FUNCTIONS //

// Compile a function to evaluate a rational function based on the above coefficients...
var rateval = evalrational( P, Q );


// MAIN //

/**
* Computes the hyperbolic sine of a number.
*
* #### Method
*
* The range is partitioned into two segments. If \\( |x| \le 1 \\), we use a rational function of the form
*
* ``` tex
* x + x^3 \frac{\mathrm{P}(x)}{\mathrm{Q}(x)}
* ```
*
* Otherwise, the calculation is
*
* ``` tex
* \operatorname{sinh}(x) = \frac{ e^x - e^{-x} }{2}.
* ```
*
*
* #### Notes
*
* * Relative error:
*
*   | arithmetic | domain   | # trials | peak    | rms     |
*   |:----------:|:--------:|:--------:|:-------:|:-------:|
*   | DEC        | +- 88    | 50000    | 4.0e-17 | 7.7e-18 |
*   | IEEE       | +-MAXLOG | 30000    | 2.6e-16 | 5.7e-17 |
*
*
* @param {number} x - input value
* @returns {number} hyperbolic sine (in radians)
*
* @example
* var v = sinh( 0.0 );
* // returns 0.0
* @example
* var v = sinh( 2.0 );
* // returns ~3.627
* @example
* var v = sinh( -2.0 );
* // returns ~-3.627
* @example
* var v = sinh( NaN );
* // returns NaN
*/
function sinh( x ) {
	var a;
	if ( x === 0.0 ) {
		return x; // handles `+-0`
	}
	a = abs( x );
	if (
		x > POS_OVERFLOW ||
		x < NEG_OVERFLOW
	) {
		return ( x > 0.0 ) ? PINF : NINF;
	}
	if ( a > 1.0 ) {
		if ( a >= LARGE ) {
			a = exp( 0.5*a );
			a = ( 0.5 * a ) * a;
			if ( x < 0.0 ) {
				a = -a;
			}
			return a;
		}
		a = exp( a );
		a = 0.5*a - (0.5/a);
		if ( x < 0.0 ) {
			a = -a;
		}
		return a;
	}
	a *= a;
	return x + x*a*rateval( a );
} // end FUNCTION sinh()


// EXPORTS //

module.exports = sinh;

},{"@stdlib/math/base/special/abs":60,"@stdlib/math/base/special/exp":67,"@stdlib/math/base/tools/evalrational":87,"@stdlib/math/constants/float64-ln-two":104,"@stdlib/math/constants/float64-ninf":108,"@stdlib/math/constants/float64-pinf":109}],74:[function(require,module,exports){
module.exports={"expected":[-1.3440585709080678e43,-1.2162759870131366e43,-1.100641972459074e43,-9.960015362249354e42,-9.013094948087966e42,-8.156200325870043e42,-7.380772546930164e42,-6.679066380546126e42,-6.044072951996769e42,-5.469449735589009e42,-4.949457203399863e42,-4.478901496961774e42,-4.053082549275605e42,-3.66774713897719e42,-3.319046407747075e42,-3.003497416632373e42,-2.7179483572935842e42,-2.45954707069388e42,-2.225712558785567e42,-2.0141092046424003e42,-1.8226234435405696e42,-1.6493426519707942e42,-1.4925360437181616e42,-1.350637382193485e42,-1.2222293363408658e42,-1.106029323863504e42,-1.0008767003648447e42,-9.057211664460645e41,-8.196122769661839e41,-7.416899476796052e41,-6.711758644284827e41,-6.073657090818735e41,-5.496221245718367e41,-4.9736834875895595e41,-4.500824535400923e41,-4.072921316568229e41,-3.6856997913335e41,-3.33529226223343e41,-3.018198742250134e41,-2.7312519957756955e41,-2.4715859032090517e41,-2.236606833199504e41,-2.023967736593588e41,-1.831544703327135e41,-1.6574157481045249e41,-1.4998416129700284e41,-1.3572483950204615e41,-1.2282118257392666e41,-1.1114430449284422e41,-1.0057757271440295e41,-9.101544320493994e40,-8.236240623259014e40,-7.453203238430328e40,-6.7446109280094765e40,-6.103386036176999e40,-5.523123795310502e40,-4.998028353034033e40,-4.522854881315962e40,-4.092857189380641e40,-3.70374031717569e40,-3.351617635881534e40,-3.0329720269692164e40,-2.7446207520501996e40,-2.483683662625834e40,-2.247554432205813e40,-2.0338745234517415e40,-1.8405096303212422e40,-1.6655283599090027e40,-1.5071829410514967e40,-1.3638917670070474e40,-1.234223597841297e40,-1.1168832647264035e40,-1.0106987333638131e40,-9.146093973155288e39,-8.276554843141008e39,-7.489684697377736e39,-6.77762401497559e39,-6.133260496861352e39,-5.550158025768774e39,-5.0224923801572385e39,-4.5449930599486114e39,-4.112890643018682e39,-3.721869146621291e39,-3.36802291791656e39,-3.0478176230104345e39,-2.7580549448514695e39,-2.495840637375863e39,-2.2585556168143046e39,-2.0438298014118137e39,-1.849518438262351e39,-1.6736806808029868e39,-1.5145602029926033e39,-1.370567656542733e39,-1.2402647959780129e39,-1.1223501129616951e39,-1.0156458363972163e39,-9.190861684585773e38,-8.317066390468625e38,-7.52634472341974e38,-6.810798692272609e38,-6.163281185130833e38,-5.577324581636282e38,-5.047076152223941e38,-4.567239599111573e38,-4.13302215511469e38,-3.74008671189309e38,-3.3845084994689796e38,-3.062735884318502e38,-2.7715548944740397e38,-2.508057117302536e38,-2.2696106493123317e38,-2.0538338078249537e38,-1.8585713419360408e38,-1.681872905151993e38,-1.5219735746800884e38,-1.3772762227923416e38,-1.24633556418209e38,-1.127843719973444e38,-1.020617154191784e38,-9.235848522125457e37,-8.357776231107647e37,-7.563184190594837e37,-6.844135750842277e37,-6.193448816730893e37,-5.604624110610911e37,-5.071780255354043e37,-4.589595029200858e37,-4.1532522056389447e37,-3.758393447329545e37,-3.401074773583696e37,-3.0777271665707286e37,-2.785120922780083e37,-2.5203333936679934e37,-2.280719793271074e37,-2.063886781204054e37,-1.867668557179288e37,-1.6901052282728344e37,-1.5294232328616336e37,-1.3840176256997475e37,-1.2524360471911885e37,-1.133364216738801e37,-1.02561280527234e37,-9.281055558338836e36,-8.398685335651399e36,-7.600203977220027e36,-6.877635985498085e36,-6.2237641109101e36,-5.632057263560939e36,-5.0966052785362823e36,-4.6120598832088223e36,-4.173581276910877e36,-3.7767897893949243e36,-3.4177221352295126e36,-3.092791827185326e36,-2.7987533532073217e36,-2.532669759159919e36,-2.2918833135518556e36,-2.0739889612294938e36,-1.8768103008855082e36,-1.6983778464384192e36,-1.5369093551499888e36,-1.3907920259917264e36,-1.2585663904514217e36,-1.1389117348759993e36,-1.030632908743899e36,-9.326483871039919e35,-8.43979467944412e35,-7.637404965911337e35,-6.911300194943821e35,-6.254227790437822e35,-5.65962469454023e35,-5.12155181364241e35,-4.63463469673661e35,-4.1940098536109216e35,-3.795276176690036e35,-3.434450981308354e35,-3.1079302253300187e35,-2.8124525107765785e35,-2.545066507898733e35,-2.303101476312328e35,-2.0841405887547354e35,-1.8859967910097795e35,-1.706690956882336e35,-1.5444321200273356e35,-1.397599585181711e35,-1.2647267401208405e35,-1.144486406647525e35,-1.0356775842944487e35,-9.372134543318737e34,-8.481105242603744e34,-7.674788043605072e34,-6.9451291817928225e34,-6.284840581621098e34,-5.687327060804307e34,-5.146620455441015e34,-4.657320008007061e34,-4.214538422791836e34,-3.8138530499624667e34,-3.451261710665021e34,-3.1231427219304283e34,-2.8262187220996093e34,-2.557523935444461e34,-2.3143745490130123e34,-2.094341905812245e34,-1.8952282465739317e34,-1.715044757803604e34,-1.5519917068494575e34,-1.4044404655737583e34,-1.2709172430728469e34,-1.150088364963205e34,-1.040746952197833e34,-9.41800866356662e33,-8.522618010045982e33,-7.71235410157853e33,-6.979123752586706e33,-6.315603214322145e33,-5.715165022825709e33,-5.171811801612142e33,-4.6801163578772716e33,-4.2351674738904317e33,-3.832520852117203e33,-3.468154724096505e33,-3.1384296796789463e33,-2.840052315386727e33,-2.5700423388038534e33,-2.3257028004235462e33,-2.104593155619142e33,-1.9045048876719297e33,-1.723439448371301e33,-1.5595882958500597e33,-1.4113148302663407e33,-1.2771380468998037e33,-1.1557177433834737e33,-1.0458411333165598e33,-9.464107325502424e32,-8.564333971507328e32,-7.7501040354719e32,-7.013284717815193e32,-6.3465164219753866e32,-5.7431392443098926e32,-5.1971264527612456e32,-4.7030242898518934e32,-4.255897498739005e32,-3.85128002822697e32,-3.4851304243616435e32,-3.1537914630432015e32,-2.853953620454867e32,-2.5826220164373213e32,-2.3370865006291557e32,-2.1148945825830618e32,-1.913826935475013e32,-1.7318752287294576e32,-1.5672220681449761e32,-1.4182228431562753e32,-1.2833892999164813e32,-1.1613746761224921e32,-1.0509602491047713e32,-9.510431628198065e31,-8.606254121568893e31,-7.788038745309191e31,-7.047612891935041e31,-6.377580941605486e31,-5.771250392210733e31,-5.222565012433661e31,-4.7260443500958195e31,-4.276728991577422e31,-3.8701310255431685e31,-3.502189216190523e31,-3.169228438274842e31,-2.8679229687352928e31,-2.5952632682662693e31,-2.3485259210369642e31,-2.1252464323078583e31,-1.9231946122370223e31,-1.740352300001733e31,-1.5748932057366225e31,-1.4251646689425502e31,-1.2896711511636293e31,-1.1670592980513808e31,-1.0561044216110813e31,-9.556982676105528e30,-8.648379459679637e30,-7.826159135519894e30,-7.082109093389559e30,-6.408797513844559e30,-5.799499136746912e30,-5.248128087128696e30,-4.749177087447346e30,-4.297662449064659e30,-3.8890742935063236e30,-3.519331506294424e30,-3.1847409734180847e30,-2.8819606932815754e30,-2.607966395680102e30,-2.3600213343826597e30,-2.135648951599643e30,-1.932608141299592e30,-1.748870864296257e30,-1.5826018915182451e30,-1.4321404731303712e30,-1.2959837504114582e30,-1.1727717447013688e30,-1.0612737734815137e30,-9.603761579082667e29,-8.690710990180926e29,-7.864466114960117e29,-7.116774144628215e29,-6.440166882950009e29,-5.827886151417576e29,-5.273816286314532e29,-4.7724230534309824e29,-4.3186983702907716e29,-3.9081102837568526e29,-3.536557703375323e29,-3.2003294383187614e29,-2.8960671287773744e29,-2.6207317015434826e29,-2.371573014736867e29,-2.1461023884725472e29,-1.9420677470976347e29,-1.7574311247103523e29,-1.5903483092783275e29,-1.439150422035029e29,-1.302327248163319e29,-1.178512152267125e29,-1.0664684279623676e29,-9.650769452419932e28,-8.733249722329981e28,-7.902960596934907e28,-7.151608872125852e28,-6.471689796821907e28,-5.8564121130185515e28,-5.299630222442467e28,-4.795782802271008e28,-4.3398372567885425e28,-3.927239450145888e28,-3.5538682181357357e28,-3.2159942046329553e28,-2.9102426115446574e28,-2.633559490203404e28,-2.3831812375117466e28,-2.1566069921546663e28,-1.9515736551645866e28,-1.7660332853355226e28,-1.5981326437048815e28,-1.4461946827859039e28,-1.3087017956592178e28,-1.1842806576099377e28,-1.071688508903245e28,-9.698007416866411e27,-8.775996670324207e27,-7.941643499219586e27,-7.18661410640299e27,-6.503367007021376e27,-5.885077701658153e27,-5.325570510961656e27,-4.819256890904419e27,-4.361079612545811e27,-3.946462248745878e27,-3.5712634632883047e27,-3.2317356458359555e27,-2.9244874795515813e27,-2.646450067496671e27,-2.394846279467429e27,-2.1671630130940156e27,-1.9611260921378238e27,-1.774677551262234e27,-1.6059550803899854e27,-1.4532734233303688e27,-1.3151075448794503e27,-1.1900773982610041e27,-1.0769341407599516e27,-9.745476598657377e26,-8.818952853324852e26,-7.980515744081805e26,-7.221790682045277e26,-6.535199268788135e26,-5.913883600773895e26,-5.351637770333492e26,-4.8428458789943e26,-4.382425944017272e26,-3.96577913786179e26,-3.588743853565944e26,-3.2475541372309745e26,-2.9388020724205046e26,-2.6594037407570578e26,-2.4065684187188124e26,-2.177770702964458e26,-1.970725285764025e26,-1.783364128584778e26,-1.6138158058341304e26,-1.4603868124379158e26,-1.3215446485481972e26,-1.1959025124246747e26,-1.0822054485974488e26,-9.79317812954066e25,-8.86211929548207e25,-8.019578258303356e25,-7.257139437723285e25,-6.567187341058655e25,-5.942830497148498e25,-5.377832622046799e25,-4.866550328943074e25,-4.403876760136488e25,-3.985190578041848e25,-3.6063098057315263e25,-3.2634500559583737e25,-2.95318673143623e25,-2.672420818822602e25,-2.4183479347420783e25,-2.188430314671732e25,-1.9803714649046275e25,-1.7920932244062736e25,-1.6217150074506443e25,-1.4675350197041097e25,-1.3280132601371831e25,-1.2017561389818077e25,-1.0875025580928877e25,-9.841113146803482e24,-8.905497025958896e24,-8.058831973202378e24,-7.292661216212859e24,-6.599331986484051e24,-5.971919080926173e24,-5.404155690632385e24,-4.890370805905973e24,-4.4254325723282456e24,-4.00469703208845e24,-3.623961738587892e24,-3.2794237810044934e24,-2.967641799553977e24,-2.685501612043095e24,-2.4301851083813177e24,-2.1991421023595304e24,-1.9900648595413283e24,-1.8008650468435043e24,-1.6296528735702394e24,-1.4747182155546088e24,-1.3345135338693646e24,-1.2076384174930125e24,-1.092825595538546e24,-9.889282793300073e23,-8.949087078955653e23,-8.098277824655745e23,-7.328356864414806e23,-6.631633971448611e23,-6.001150045629378e23,-5.430607603677859e23,-4.914307877804618e23,-4.4470938945204895e23,-4.024298965069406e23,-3.6417000729877354e23,-3.2954756932106425e23,-2.9821676214077223e23,-2.698646432287334e23,-2.442080221855349e23,-2.2099063214154487e23,-1.9998057007814668e23,-1.8096798050319815e23,-1.6376295934454105e23,-1.4819365712493017e23,-1.341045624722541e23,-1.2135494882020445e23,-1.0981746878448992e23,-9.937688217478343e22,-8.992890493735059e22,-8.137916753120964e22,-7.364227233375495e22,-6.664094066087677e22,-6.0305240881750054e22,-5.457188991842858e22,-4.9383621153403175e22,-4.468861243156835e22,-4.0439968443287936e22,-3.6595252318438148e22,-3.31160617528234e22,-2.9967645433182516e22,-2.7118555929507078e22,-2.4540335587643064e22,-2.220723228477201e22,-2.009594220863634e22,-1.818537709130828e22,-1.6456453572550405e22,-1.4891902588863077e22,-1.347609688433125e22,-1.2194894920390814e22,-1.1035499625435848e22,-9.98633057340784e21,-9.036908314646491e21,-8.177749703659069e21,-7.40027317830673e21,-6.696713044306389e21,-6.060041908891345e21,-5.483900488873777e21,-4.962534092007953e21,-4.4907351372086253e21,-4.063791139498331e21,-3.677437640138833e21,-3.3278156117982545e21,-3.011432913301585e21,-2.7251294089625144e21,-2.4660454040965433e21,-2.2315930814386114e21,-2.0194306531631686e21,-1.8274389703278912e21,-1.65370035610884e21,-1.496479451406162e21,-1.3542058814997796e21,-1.2254585706241505e21,-1.1089515477904974e21,-1.0035211020806689e21,-9.081141591151395e20,-8.217777625956682e20,-7.436495558606568e20,-6.729491683797761e20,-6.089704211534437e20,-5.510742731619185e20,-4.9868243841093704e20,-4.512716098187559e20,-4.083682322508345e20,-3.6954377249357726e20,-3.344104389219559e20,-3.0261730810771014e20,-2.7384681967936274e20,-2.478116044235284e20,-2.2425161394558897e20,-2.029315232197676e20,-1.836383800844676e20,-1.661794782051999e20,-1.503804322595856e20,-1.360834361187226e20,-1.2314568662704384e20,-1.1143795723688213e20,-1.0084330725069814e20,-9.125591377847802e19,-8.258001474349128e19,-7.47289523787937e19,-6.7624307660615975e19,-6.119511703305149e19,-5.537716360044703e19,-5.011233570767401e19,-4.534804650157867e19,-4.103670867599252e19,-3.713525915387874e19,-3.3604728958989574e19,-3.0409853980760506e19,-2.7518722744638816e19,-2.490245766965595e19,-2.253492662953683e19,-2.03924819363272e19,-1.845372413941507e19,-1.6699288280696699e19,-1.5111650470930653e19,-1.3674952855299154e19,-1.2374845219877503e19,-1.119834165692076e19,-1.0133690857296155e19,-9.170258734495971e18,-8.298422207842711e18,-7.509473083956836e18,-6.795531076422746e18,-6.149465094865909e18,-5.564822017248571e18,-5.035762233939388e18,-4.557001319749065e18,-4.123757251332634e18,-3.7317026427490734e18,-3.376921522090108e18,-3.055870217449759e18,-2.765341961549813e18,-2.5024348614811023e18,-2.2645229136314122e18,-2.0492297742873295e18,-1.8544050239225093e18,-1.6781026880916644e18,-1.518561800390228e18,-1.3741888133358756e18,-1.2435416814858532e18,-1.1253154578072584e18,-1.0183292594317158e18,-9.215144726043154e17,-8.339040790138056e17,-7.546229968918252e17,-6.828793404050205e17,-6.179565100357523e17,-5.5920603494766675e17,-5.060410958431345e17,-4.5793066361682534e17,-4.1439419526028314e17,-3.749968340384075e17,-3.393450659956859e17,-3.0708278940782234e17,-2.7788775791921238e17,-2.5146836183910298e17,-2.2756071544693834e17,-2.0592602121397558e17,-1.8634818461408234e17,-1.6863165569969814e17,-1.525994758838814e17,-1.3809151041904181e17,-1.2496284891779693e17,-1.1308235793978787e17,-1.023313711872426e17,-9.260250422649498e16,-8.37985818965261e16,-7.583166769111717e16,-6.8622185419755544e16,-6.209812437416499e16,-5.6194320061382296e16,-5.0851803319116136e16,-4.6017211312129896e16,-4.1642254526481304e16,-3.768323443778895e16,-3.4100607035825228e16,-3.0858587845783948e16,-2.792479450103491e16,-2.5269923297269856e16,-2.2867456497351864e16,-2.0693397463330336e16,-1.872603097003633e16,-1.6945706306185488e16,-1.5334640996534436e16,-1.3876743184600214e16,-1.2557450901841508e16,-1.1363586617871404e16,-1.0283225618897656e16,-9.305576899713036e15,-8.420875379544206e15,-7.62028436517461e15,-6.895807287112244e15,-6.240207827191812e15,-5.646937639821024e15,-5.110070944925159e15,-4.624245339283709e15,-4.184608235062467e15,-3.7867683905510335e15,-3.4267520489794445e15,-3.100963247312859e15,-2.806147898576109e15,-2.539361288950067e15,-2.297938664989866e15,-2.0794686171807975e15,-1.8817689939774168e15,-1.702865105747797e15,-1.5409700009161998e15,-1.3944666172960762e15,-1.261891630334809e15,-1.1419208369410075e15,-1.0333559289034062e15,-9.351125237895858e14,-8.462093337733788e14,-7.657583642055008e14,-6.929560440274212e14,-6.270751994362445e14,-5.674577906307221e14,-5.135083390907363e14,-4.646879797396728e14,-4.205090785806725e14,-3.805303620460117e14,-3.443525094098246e14,-3.116141642398204e14,-2.8198832504895725e14,-2.5517907909577138e14,-2.309186467094383e14,-2.0896470661728956e14,-1.8909797555930962e14,-1.711200180139447e14,-1.5485126415807862e14,-1.4012921626388067e14,-1.2680682561741216e14,-1.1475102374714145e14,-1.0384139329175688e14,-9.396896523149339e13,-8.503513046929203e13,-7.695065489032362e13,-6.963478806195367e13,-6.301445667154319e13,-5.702353464588711e13,-5.160218266198464e13,-4.669625045196783e13,-4.225673593220556e13,-3.823929575418186e13,-3.46038023883751e13,-3.1313943317137688e13,-2.8336858333184938e13,-2.5642811320908734e13,-2.3204893242158555e13,-2.099875335981264e13,-1.9002356014512094e13,-1.7195760525161273e13,-1.5560922014768758e13,-1.4081511172210514e13,-1.2742751149635965e13,-1.153126996639368e13,-1.0434966945238633e13,-9.442891846740535e12,-8.545135494648156e12,-7.732730799739103e12,-6.9975631935484e12,-6.332289577358002e12,-5.730264976883117e12,-5.18547617005748e12,-4.692481624970145e12,-4.246357148033786e12,-3.8426466995003784e12,-3.477317885053133e12,-3.146721678910154e12,-2.847555976140455e12,-2.5768326101409683e12,-2.331847505834041e12,-2.110153670465601e12,-1.909536752227207e12,-1.727992922573205e12,-1.5637088613143389e12,-1.4150436445722178e12,-1.2805123546855168e12,-1.1587712483581682e12,-1.0486043349041454e12,-9.489112305277834e11,-8.586961673242197e11,-7.77058047218164e11,-7.031814414964346e11,-6.36328446034583e11,-5.75831310864936e11,-5.2108577046767737e11,-4.7154500816573645e11,-4.26714194337834e11,-3.861455438955448e11,-3.494338436568036e11,-3.162124049417944e11,-2.8614940096437476e11,-2.5894455243570398e11,-2.3432612827477213e11,-2.120482314679264e11,-1.9188834296766824e11,-1.736450990983478e11,-1.5713628026875775e11,-1.421969909022127e11,-1.286780124046517e11,-1.1644431271965814e11,-1.0537369758334384e11,-9.535559000737262e10,-8.628992579920056e10,-7.808615408761919e10,-7.066233287051822e10,-6.394431055089682e10,-5.786498528603627e10,-5.236363475196205e10,-4.738530962866353e10,-4.288028474799831e10,-3.8803562422164185e10,-3.511442299181736e10,-3.1776018104564083e10,-2.8755002661353035e10,-2.6021201754528744e10,-2.3547309270811577e10,-2.1308615148750748e10,-1.928275856640663e10,-1.744950459401991e10,-1.579054208079851e10,-1.4289300757049564e10,-1.2930785724811077e10,-1.1701427683820524e10,-1.058894739682819e10,-9.582233040488726e9,-8.671229216771564e9,-7.846836516298903e9,-7.100820630416534e9,-6.425730104178484e9,-5.814821908735296e9,-5.261994089717653e9,-4.761724818885414e9,-4.309017240269453e9,-3.899349559911275e9,-3.528629880680032e9,-3.193155331042259e9,-2.889575079548609e9,-2.614856865614173e9,-2.3662567122906127e9,-2.1412915185111964e9,-1.937714257050925e9,-1.753491530470836e9,-1.5867832608676252e9,-1.4359243105631707e9,-1.2994078501552367e9,-1.1758703078039289e9,-1.0640777494223372e9,-9.629135537322416e8,-8.71367259079152e8,-7.885244706050197e8,-7.135577269680834e8,-6.457182353835942e8,-5.843283924322951e8,-5.2877501593194944e8,-4.785032202696369e8,-4.3301087401958364e8,-3.918435844873706e8,-3.545901590844725e8,-3.208784981998448e8,-2.9037187854516673e8,-2.6276558985057557e8,-2.3778389131708214e8,-2.1517725742570353e8,-1.9471988559353304e8,-1.7620744078239858e8,-1.594550145324946e8,-1.4429527803514796e8,-1.3057681079698882e8,-1.1816258820167007e8,-1.0692861286239493e8,-9.676267609475341e7,-8.756323713903694e7,-7.923840893733767e7,-7.170504033503383e7,-6.488788553938325e7,-5.87188525395049e7,-5.3136322980711706e7,-4.8084536699877374e7,-4.3513034774369806e7,-3.937615552153903e7,-3.563257841463389e7,-3.224491135963004e7,-2.9179317210549977e7,-2.6405175792788003e7,-2.3894778058615718e7,-2.1623049319991674e7,-1.956729879423192e7,-1.7706992960921448e7,-1.6023550466278305e7,-1.4500156526408112e7,-1.3121594975646513e7,-1.1874096282432536e7,-1.0745200014644617e7,-9.723630380657952e6,-8.799183602984928e6,-7.962625999549745e6,-7.205601754598844e6,-6.520549458032316e6,-5.900626579523258e6,-5.33964112304779e6,-4.831989779167937e6,-4.372601957312195e6,-3.956889139029339e6,-3.580699046339118e6,-3.2402741673978483e6,-2.932214225219593e6,-2.6534422145780297e6,-2.401173667854189e6,-2.1728888428471824e6,-1.9663075547505408e6,-1.7793664009074976e6,-1.6101981508585333e6,-1.457113095822144e6,-1.3185821713211758e6,-1.1932216843779397e6,-1.0797794927282704e6,-977122.4980078513,-884225.327988669,-800160.0948199418,-724087.1269754578,-655246.5823349329,-592950.8586280294,-536577.72543404,-485564.1091373705,-439400.4687608701,-397625.70650097204,-359822.56212938065,-325613.44525904214,-294656.6638456933,-266643.01125401043,-241292.67779882808,-218352.45591288022,-197593.21102535276,-178807.59288953143,-161807.9644995296,-146424.527909429,-132503.62823488525,-119906.21889700515,-108506.47277884296,-98190.52542227949,-88855.33771191943,-80407.66668611605,-72763.13419523717,-65845.38410462637,-59585.31962411771,-53920.41314629968,-48794.08169996344,-44155.12178055494,-39957.19791253047,-36158.37983520675,-32720.723689362345,-29609.893021343694,-26794.81581913907,-24247.37415478147,-21942.12333312619,-19856.03774176786,-17968.280863560572,-16259.997154550018,-14714.123708525487,-13315.219827033883,-12049.312792544782,-10903.758304297702,-9867.114182817917,-8929.026081619837,-8080.124064548416,-7311.929015738424,-6616.7679473832595,-5987.697359379223,-5418.433885335546,-4903.2915322198305,-4437.1248867672775,-4015.2777213805557,-3633.536486178997,-3288.0882226600684,-2975.4824786008635,-2692.5968437930087,-2436.605762370328,-2204.952310216482,-1995.322655555964,-1805.6229476322558,-1633.9584026296204,-1478.6143779417791,-1338.0392457508967,-1210.8288948525642,-1095.7127059257818,-991.5408601643189,-897.2728545038136,-811.9671087308756,-734.7715606665562,-664.9151554857335,-601.7001441649106,-544.4951141327498,-492.7286825111768,-445.8837889530351,-403.49253107125645,-365.13149087409977,-330.41750552533546,-299.00384018631576,-270.57672471301345,-244.8522196153989,-221.57337997531613,-200.50768899512855,-181.44473554256115,-164.19411249428617,-148.58351488620576,-134.45701887412721,-121.6735243145154,-110.10534540929942,-99.63693533762748,-90.16373213576601,-81.59111429740648,-73.83345566257024,-66.81327015502603,-60.460437825572484,-54.71150447064939,-49.509047830634685,-44.80110403720505,-40.540648580924994,-36.6851266147968,-33.196027902286325,-30.038502164263914,-27.181010982818215,-24.59501278504196,-22.25467776030294,-20.136629863499156,-18.21971332734065,-16.484781351505106,-14.914504858024037,-13.493199402684889,-12.206668513582347,-11.042061892032292,-9.987747059511923,-9.0331931685929,-8.168865817332536,-7.386131816494088,-6.677172958379479,-6.034907925968899,-5.452921562369698,-4.92540079409434,-4.44707656814781,-4.013171222972714,-3.6193507675756305,-3.261681592182684,-2.9365911780360046,-2.640832413887418,-2.37145116277065,-2.12575675509815,-1.9012951133577882,-1.6958242399699333,-1.507291823469478,-1.333814739335908,-1.1736602407188768,-1.0252286511859992,-0.8870373866222641,-0.7577061466864816,-0.6359431279121056,-0.520532120744291,-0.4103203616340996,-0.30420701885252754,-0.20113219701683444,-0.10006635050272182,0.0,0.10006635050272182,0.20113219701683444,0.30420701885252754,0.4103203616340996,0.520532120744291,0.6359431279121056,0.7577061466864816,0.8870373866222641,1.0252286511859992,1.1736602407188768,1.333814739335908,1.507291823469478,1.6958242399699333,1.9012951133577882,2.12575675509815,2.37145116277065,2.640832413887418,2.9365911780360046,3.261681592182684,3.6193507675756305,4.013171222972714,4.44707656814781,4.92540079409434,5.452921562369698,6.034907925968899,6.677172958379479,7.386131816494088,8.168865817332536,9.0331931685929,9.987747059511923,11.042061892032292,12.206668513582347,13.493199402684889,14.914504858024037,16.484781351505106,18.21971332734065,20.136629863499156,22.25467776030294,24.59501278504196,27.181010982818215,30.038502164263914,33.196027902286325,36.6851266147968,40.540648580924994,44.80110403720505,49.509047830634685,54.71150447064939,60.460437825572484,66.81327015502603,73.83345566257024,81.59111429740648,90.16373213576601,99.63693533762748,110.10534540929942,121.6735243145154,134.45701887412721,148.58351488620576,164.19411249428617,181.44473554256115,200.50768899512855,221.57337997531613,244.8522196153989,270.57672471301345,299.00384018631576,330.41750552533546,365.13149087409977,403.49253107125645,445.8837889530351,492.7286825111768,544.4951141327498,601.7001441649106,664.9151554857335,734.7715606665562,811.9671087308756,897.2728545038136,991.5408601643189,1095.7127059257818,1210.8288948525642,1338.0392457508967,1478.6143779417791,1633.9584026296204,1805.6229476322558,1995.322655555964,2204.952310216482,2436.605762370328,2692.5968437930087,2975.4824786008635,3288.0882226600684,3633.536486178997,4015.2777213805557,4437.1248867672775,4903.2915322198305,5418.433885335546,5987.697359379223,6616.7679473832595,7311.929015738424,8080.124064548416,8929.026081619837,9867.114182817917,10903.758304297702,12049.312792544782,13315.219827033883,14714.123708525487,16259.997154550018,17968.280863560572,19856.03774176786,21942.12333312619,24247.37415478147,26794.81581913907,29609.893021343694,32720.723689362345,36158.37983520675,39957.19791253047,44155.12178055494,48794.08169996344,53920.41314629968,59585.31962411771,65845.38410462637,72763.13419523717,80407.66668611605,88855.33771191943,98190.52542227949,108506.47277884296,119906.21889700515,132503.62823488525,146424.527909429,161807.9644995296,178807.59288953143,197593.21102535276,218352.45591288022,241292.67779882808,266643.01125401043,294656.6638456933,325613.44525904214,359822.56212938065,397625.70650097204,439400.4687608701,485564.1091373705,536577.72543404,592950.8586280294,655246.5823349329,724087.1269754578,800160.0948199418,884225.327988669,977122.4980078513,1.0797794927282704e6,1.1932216843779397e6,1.3185821713211758e6,1.457113095822144e6,1.6101981508585333e6,1.7793664009074976e6,1.9663075547505408e6,2.1728888428471824e6,2.401173667854189e6,2.6534422145780297e6,2.932214225219593e6,3.2402741673978483e6,3.580699046339118e6,3.956889139029339e6,4.372601957312195e6,4.831989779167937e6,5.33964112304779e6,5.900626579523258e6,6.520549458032316e6,7.205601754598844e6,7.962625999549745e6,8.799183602984928e6,9.723630380657952e6,1.0745200014644617e7,1.1874096282432536e7,1.3121594975646513e7,1.4500156526408112e7,1.6023550466278305e7,1.7706992960921448e7,1.956729879423192e7,2.1623049319991674e7,2.3894778058615718e7,2.6405175792788003e7,2.9179317210549977e7,3.224491135963004e7,3.563257841463389e7,3.937615552153903e7,4.3513034774369806e7,4.8084536699877374e7,5.3136322980711706e7,5.87188525395049e7,6.488788553938325e7,7.170504033503383e7,7.923840893733767e7,8.756323713903694e7,9.676267609475341e7,1.0692861286239493e8,1.1816258820167007e8,1.3057681079698882e8,1.4429527803514796e8,1.594550145324946e8,1.7620744078239858e8,1.9471988559353304e8,2.1517725742570353e8,2.3778389131708214e8,2.6276558985057557e8,2.9037187854516673e8,3.208784981998448e8,3.545901590844725e8,3.918435844873706e8,4.3301087401958364e8,4.785032202696369e8,5.2877501593194944e8,5.843283924322951e8,6.457182353835942e8,7.135577269680834e8,7.885244706050197e8,8.71367259079152e8,9.629135537322416e8,1.0640777494223372e9,1.1758703078039289e9,1.2994078501552367e9,1.4359243105631707e9,1.5867832608676252e9,1.753491530470836e9,1.937714257050925e9,2.1412915185111964e9,2.3662567122906127e9,2.614856865614173e9,2.889575079548609e9,3.193155331042259e9,3.528629880680032e9,3.899349559911275e9,4.309017240269453e9,4.761724818885414e9,5.261994089717653e9,5.814821908735296e9,6.425730104178484e9,7.100820630416534e9,7.846836516298903e9,8.671229216771564e9,9.582233040488726e9,1.058894739682819e10,1.1701427683820524e10,1.2930785724811077e10,1.4289300757049564e10,1.579054208079851e10,1.744950459401991e10,1.928275856640663e10,2.1308615148750748e10,2.3547309270811577e10,2.6021201754528744e10,2.8755002661353035e10,3.1776018104564083e10,3.511442299181736e10,3.8803562422164185e10,4.288028474799831e10,4.738530962866353e10,5.236363475196205e10,5.786498528603627e10,6.394431055089682e10,7.066233287051822e10,7.808615408761919e10,8.628992579920056e10,9.535559000737262e10,1.0537369758334384e11,1.1644431271965814e11,1.286780124046517e11,1.421969909022127e11,1.5713628026875775e11,1.736450990983478e11,1.9188834296766824e11,2.120482314679264e11,2.3432612827477213e11,2.5894455243570398e11,2.8614940096437476e11,3.162124049417944e11,3.494338436568036e11,3.861455438955448e11,4.26714194337834e11,4.7154500816573645e11,5.2108577046767737e11,5.75831310864936e11,6.36328446034583e11,7.031814414964346e11,7.77058047218164e11,8.586961673242197e11,9.489112305277834e11,1.0486043349041454e12,1.1587712483581682e12,1.2805123546855168e12,1.4150436445722178e12,1.5637088613143389e12,1.727992922573205e12,1.909536752227207e12,2.110153670465601e12,2.331847505834041e12,2.5768326101409683e12,2.847555976140455e12,3.146721678910154e12,3.477317885053133e12,3.8426466995003784e12,4.246357148033786e12,4.692481624970145e12,5.18547617005748e12,5.730264976883117e12,6.332289577358002e12,6.9975631935484e12,7.732730799739103e12,8.545135494648156e12,9.442891846740535e12,1.0434966945238633e13,1.153126996639368e13,1.2742751149635965e13,1.4081511172210514e13,1.5560922014768758e13,1.7195760525161273e13,1.9002356014512094e13,2.099875335981264e13,2.3204893242158555e13,2.5642811320908734e13,2.8336858333184938e13,3.1313943317137688e13,3.46038023883751e13,3.823929575418186e13,4.225673593220556e13,4.669625045196783e13,5.160218266198464e13,5.702353464588711e13,6.301445667154319e13,6.963478806195367e13,7.695065489032362e13,8.503513046929203e13,9.396896523149339e13,1.0384139329175688e14,1.1475102374714145e14,1.2680682561741216e14,1.4012921626388067e14,1.5485126415807862e14,1.711200180139447e14,1.8909797555930962e14,2.0896470661728956e14,2.309186467094383e14,2.5517907909577138e14,2.8198832504895725e14,3.116141642398204e14,3.443525094098246e14,3.805303620460117e14,4.205090785806725e14,4.646879797396728e14,5.135083390907363e14,5.674577906307221e14,6.270751994362445e14,6.929560440274212e14,7.657583642055008e14,8.462093337733788e14,9.351125237895858e14,1.0333559289034062e15,1.1419208369410075e15,1.261891630334809e15,1.3944666172960762e15,1.5409700009161998e15,1.702865105747797e15,1.8817689939774168e15,2.0794686171807975e15,2.297938664989866e15,2.539361288950067e15,2.806147898576109e15,3.100963247312859e15,3.4267520489794445e15,3.7867683905510335e15,4.184608235062467e15,4.624245339283709e15,5.110070944925159e15,5.646937639821024e15,6.240207827191812e15,6.895807287112244e15,7.62028436517461e15,8.420875379544206e15,9.305576899713036e15,1.0283225618897656e16,1.1363586617871404e16,1.2557450901841508e16,1.3876743184600214e16,1.5334640996534436e16,1.6945706306185488e16,1.872603097003633e16,2.0693397463330336e16,2.2867456497351864e16,2.5269923297269856e16,2.792479450103491e16,3.0858587845783948e16,3.4100607035825228e16,3.768323443778895e16,4.1642254526481304e16,4.6017211312129896e16,5.0851803319116136e16,5.6194320061382296e16,6.209812437416499e16,6.8622185419755544e16,7.583166769111717e16,8.37985818965261e16,9.260250422649498e16,1.023313711872426e17,1.1308235793978787e17,1.2496284891779693e17,1.3809151041904181e17,1.525994758838814e17,1.6863165569969814e17,1.8634818461408234e17,2.0592602121397558e17,2.2756071544693834e17,2.5146836183910298e17,2.7788775791921238e17,3.0708278940782234e17,3.393450659956859e17,3.749968340384075e17,4.1439419526028314e17,4.5793066361682534e17,5.060410958431345e17,5.5920603494766675e17,6.179565100357523e17,6.828793404050205e17,7.546229968918252e17,8.339040790138056e17,9.215144726043154e17,1.0183292594317158e18,1.1253154578072584e18,1.2435416814858532e18,1.3741888133358756e18,1.518561800390228e18,1.6781026880916644e18,1.8544050239225093e18,2.0492297742873295e18,2.2645229136314122e18,2.5024348614811023e18,2.765341961549813e18,3.055870217449759e18,3.376921522090108e18,3.7317026427490734e18,4.123757251332634e18,4.557001319749065e18,5.035762233939388e18,5.564822017248571e18,6.149465094865909e18,6.795531076422746e18,7.509473083956836e18,8.298422207842711e18,9.170258734495971e18,1.0133690857296155e19,1.119834165692076e19,1.2374845219877503e19,1.3674952855299154e19,1.5111650470930653e19,1.6699288280696699e19,1.845372413941507e19,2.03924819363272e19,2.253492662953683e19,2.490245766965595e19,2.7518722744638816e19,3.0409853980760506e19,3.3604728958989574e19,3.713525915387874e19,4.103670867599252e19,4.534804650157867e19,5.011233570767401e19,5.537716360044703e19,6.119511703305149e19,6.7624307660615975e19,7.47289523787937e19,8.258001474349128e19,9.125591377847802e19,1.0084330725069814e20,1.1143795723688213e20,1.2314568662704384e20,1.360834361187226e20,1.503804322595856e20,1.661794782051999e20,1.836383800844676e20,2.029315232197676e20,2.2425161394558897e20,2.478116044235284e20,2.7384681967936274e20,3.0261730810771014e20,3.344104389219559e20,3.6954377249357726e20,4.083682322508345e20,4.512716098187559e20,4.9868243841093704e20,5.510742731619185e20,6.089704211534437e20,6.729491683797761e20,7.436495558606568e20,8.217777625956682e20,9.081141591151395e20,1.0035211020806689e21,1.1089515477904974e21,1.2254585706241505e21,1.3542058814997796e21,1.496479451406162e21,1.65370035610884e21,1.8274389703278912e21,2.0194306531631686e21,2.2315930814386114e21,2.4660454040965433e21,2.7251294089625144e21,3.011432913301585e21,3.3278156117982545e21,3.677437640138833e21,4.063791139498331e21,4.4907351372086253e21,4.962534092007953e21,5.483900488873777e21,6.060041908891345e21,6.696713044306389e21,7.40027317830673e21,8.177749703659069e21,9.036908314646491e21,9.98633057340784e21,1.1035499625435848e22,1.2194894920390814e22,1.347609688433125e22,1.4891902588863077e22,1.6456453572550405e22,1.818537709130828e22,2.009594220863634e22,2.220723228477201e22,2.4540335587643064e22,2.7118555929507078e22,2.9967645433182516e22,3.31160617528234e22,3.6595252318438148e22,4.0439968443287936e22,4.468861243156835e22,4.9383621153403175e22,5.457188991842858e22,6.0305240881750054e22,6.664094066087677e22,7.364227233375495e22,8.137916753120964e22,8.992890493735059e22,9.937688217478343e22,1.0981746878448992e23,1.2135494882020445e23,1.341045624722541e23,1.4819365712493017e23,1.6376295934454105e23,1.8096798050319815e23,1.9998057007814668e23,2.2099063214154487e23,2.442080221855349e23,2.698646432287334e23,2.9821676214077223e23,3.2954756932106425e23,3.6417000729877354e23,4.024298965069406e23,4.4470938945204895e23,4.914307877804618e23,5.430607603677859e23,6.001150045629378e23,6.631633971448611e23,7.328356864414806e23,8.098277824655745e23,8.949087078955653e23,9.889282793300073e23,1.092825595538546e24,1.2076384174930125e24,1.3345135338693646e24,1.4747182155546088e24,1.6296528735702394e24,1.8008650468435043e24,1.9900648595413283e24,2.1991421023595304e24,2.4301851083813177e24,2.685501612043095e24,2.967641799553977e24,3.2794237810044934e24,3.623961738587892e24,4.00469703208845e24,4.4254325723282456e24,4.890370805905973e24,5.404155690632385e24,5.971919080926173e24,6.599331986484051e24,7.292661216212859e24,8.058831973202378e24,8.905497025958896e24,9.841113146803482e24,1.0875025580928877e25,1.2017561389818077e25,1.3280132601371831e25,1.4675350197041097e25,1.6217150074506443e25,1.7920932244062736e25,1.9803714649046275e25,2.188430314671732e25,2.4183479347420783e25,2.672420818822602e25,2.95318673143623e25,3.2634500559583737e25,3.6063098057315263e25,3.985190578041848e25,4.403876760136488e25,4.866550328943074e25,5.377832622046799e25,5.942830497148498e25,6.567187341058655e25,7.257139437723285e25,8.019578258303356e25,8.86211929548207e25,9.79317812954066e25,1.0822054485974488e26,1.1959025124246747e26,1.3215446485481972e26,1.4603868124379158e26,1.6138158058341304e26,1.783364128584778e26,1.970725285764025e26,2.177770702964458e26,2.4065684187188124e26,2.6594037407570578e26,2.9388020724205046e26,3.2475541372309745e26,3.588743853565944e26,3.96577913786179e26,4.382425944017272e26,4.8428458789943e26,5.351637770333492e26,5.913883600773895e26,6.535199268788135e26,7.221790682045277e26,7.980515744081805e26,8.818952853324852e26,9.745476598657377e26,1.0769341407599516e27,1.1900773982610041e27,1.3151075448794503e27,1.4532734233303688e27,1.6059550803899854e27,1.774677551262234e27,1.9611260921378238e27,2.1671630130940156e27,2.394846279467429e27,2.646450067496671e27,2.9244874795515813e27,3.2317356458359555e27,3.5712634632883047e27,3.946462248745878e27,4.361079612545811e27,4.819256890904419e27,5.325570510961656e27,5.885077701658153e27,6.503367007021376e27,7.18661410640299e27,7.941643499219586e27,8.775996670324207e27,9.698007416866411e27,1.071688508903245e28,1.1842806576099377e28,1.3087017956592178e28,1.4461946827859039e28,1.5981326437048815e28,1.7660332853355226e28,1.9515736551645866e28,2.1566069921546663e28,2.3831812375117466e28,2.633559490203404e28,2.9102426115446574e28,3.2159942046329553e28,3.5538682181357357e28,3.927239450145888e28,4.3398372567885425e28,4.795782802271008e28,5.299630222442467e28,5.8564121130185515e28,6.471689796821907e28,7.151608872125852e28,7.902960596934907e28,8.733249722329981e28,9.650769452419932e28,1.0664684279623676e29,1.178512152267125e29,1.302327248163319e29,1.439150422035029e29,1.5903483092783275e29,1.7574311247103523e29,1.9420677470976347e29,2.1461023884725472e29,2.371573014736867e29,2.6207317015434826e29,2.8960671287773744e29,3.2003294383187614e29,3.536557703375323e29,3.9081102837568526e29,4.3186983702907716e29,4.7724230534309824e29,5.273816286314532e29,5.827886151417576e29,6.440166882950009e29,7.116774144628215e29,7.864466114960117e29,8.690710990180926e29,9.603761579082667e29,1.0612737734815137e30,1.1727717447013688e30,1.2959837504114582e30,1.4321404731303712e30,1.5826018915182451e30,1.748870864296257e30,1.932608141299592e30,2.135648951599643e30,2.3600213343826597e30,2.607966395680102e30,2.8819606932815754e30,3.1847409734180847e30,3.519331506294424e30,3.8890742935063236e30,4.297662449064659e30,4.749177087447346e30,5.248128087128696e30,5.799499136746912e30,6.408797513844559e30,7.082109093389559e30,7.826159135519894e30,8.648379459679637e30,9.556982676105528e30,1.0561044216110813e31,1.1670592980513808e31,1.2896711511636293e31,1.4251646689425502e31,1.5748932057366225e31,1.740352300001733e31,1.9231946122370223e31,2.1252464323078583e31,2.3485259210369642e31,2.5952632682662693e31,2.8679229687352928e31,3.169228438274842e31,3.502189216190523e31,3.8701310255431685e31,4.276728991577422e31,4.7260443500958195e31,5.222565012433661e31,5.771250392210733e31,6.377580941605486e31,7.047612891935041e31,7.788038745309191e31,8.606254121568893e31,9.510431628198065e31,1.0509602491047713e32,1.1613746761224921e32,1.2833892999164813e32,1.4182228431562753e32,1.5672220681449761e32,1.7318752287294576e32,1.913826935475013e32,2.1148945825830618e32,2.3370865006291557e32,2.5826220164373213e32,2.853953620454867e32,3.1537914630432015e32,3.4851304243616435e32,3.85128002822697e32,4.255897498739005e32,4.7030242898518934e32,5.1971264527612456e32,5.7431392443098926e32,6.3465164219753866e32,7.013284717815193e32,7.7501040354719e32,8.564333971507328e32,9.464107325502424e32,1.0458411333165598e33,1.1557177433834737e33,1.2771380468998037e33,1.4113148302663407e33,1.5595882958500597e33,1.723439448371301e33,1.9045048876719297e33,2.104593155619142e33,2.3257028004235462e33,2.5700423388038534e33,2.840052315386727e33,3.1384296796789463e33,3.468154724096505e33,3.832520852117203e33,4.2351674738904317e33,4.6801163578772716e33,5.171811801612142e33,5.715165022825709e33,6.315603214322145e33,6.979123752586706e33,7.71235410157853e33,8.522618010045982e33,9.41800866356662e33,1.040746952197833e34,1.150088364963205e34,1.2709172430728469e34,1.4044404655737583e34,1.5519917068494575e34,1.715044757803604e34,1.8952282465739317e34,2.094341905812245e34,2.3143745490130123e34,2.557523935444461e34,2.8262187220996093e34,3.1231427219304283e34,3.451261710665021e34,3.8138530499624667e34,4.214538422791836e34,4.657320008007061e34,5.146620455441015e34,5.687327060804307e34,6.284840581621098e34,6.9451291817928225e34,7.674788043605072e34,8.481105242603744e34,9.372134543318737e34,1.0356775842944487e35,1.144486406647525e35,1.2647267401208405e35,1.397599585181711e35,1.5444321200273356e35,1.706690956882336e35,1.8859967910097795e35,2.0841405887547354e35,2.303101476312328e35,2.545066507898733e35,2.8124525107765785e35,3.1079302253300187e35,3.434450981308354e35,3.795276176690036e35,4.1940098536109216e35,4.63463469673661e35,5.12155181364241e35,5.65962469454023e35,6.254227790437822e35,6.911300194943821e35,7.637404965911337e35,8.43979467944412e35,9.326483871039919e35,1.030632908743899e36,1.1389117348759993e36,1.2585663904514217e36,1.3907920259917264e36,1.5369093551499888e36,1.6983778464384192e36,1.8768103008855082e36,2.0739889612294938e36,2.2918833135518556e36,2.532669759159919e36,2.7987533532073217e36,3.092791827185326e36,3.4177221352295126e36,3.7767897893949243e36,4.173581276910877e36,4.6120598832088223e36,5.0966052785362823e36,5.632057263560939e36,6.2237641109101e36,6.877635985498085e36,7.600203977220027e36,8.398685335651399e36,9.281055558338836e36,1.02561280527234e37,1.133364216738801e37,1.2524360471911885e37,1.3840176256997475e37,1.5294232328616336e37,1.6901052282728344e37,1.867668557179288e37,2.063886781204054e37,2.280719793271074e37,2.5203333936679934e37,2.785120922780083e37,3.0777271665707286e37,3.401074773583696e37,3.758393447329545e37,4.1532522056389447e37,4.589595029200858e37,5.071780255354043e37,5.604624110610911e37,6.193448816730893e37,6.844135750842277e37,7.563184190594837e37,8.357776231107647e37,9.235848522125457e37,1.020617154191784e38,1.127843719973444e38,1.24633556418209e38,1.3772762227923416e38,1.5219735746800884e38,1.681872905151993e38,1.8585713419360408e38,2.0538338078249537e38,2.2696106493123317e38,2.508057117302536e38,2.7715548944740397e38,3.062735884318502e38,3.3845084994689796e38,3.74008671189309e38,4.13302215511469e38,4.567239599111573e38,5.047076152223941e38,5.577324581636282e38,6.163281185130833e38,6.810798692272609e38,7.52634472341974e38,8.317066390468625e38,9.190861684585773e38,1.0156458363972163e39,1.1223501129616951e39,1.2402647959780129e39,1.370567656542733e39,1.5145602029926033e39,1.6736806808029868e39,1.849518438262351e39,2.0438298014118137e39,2.2585556168143046e39,2.495840637375863e39,2.7580549448514695e39,3.0478176230104345e39,3.36802291791656e39,3.721869146621291e39,4.112890643018682e39,4.5449930599486114e39,5.0224923801572385e39,5.550158025768774e39,6.133260496861352e39,6.77762401497559e39,7.489684697377736e39,8.276554843141008e39,9.146093973155288e39,1.0106987333638131e40,1.1168832647264035e40,1.234223597841297e40,1.3638917670070474e40,1.5071829410514967e40,1.6655283599090027e40,1.8405096303212422e40,2.0338745234517415e40,2.247554432205813e40,2.483683662625834e40,2.7446207520501996e40,3.0329720269692164e40,3.351617635881534e40,3.70374031717569e40,4.092857189380641e40,4.522854881315962e40,4.998028353034033e40,5.523123795310502e40,6.103386036176999e40,6.7446109280094765e40,7.453203238430328e40,8.236240623259014e40,9.101544320493994e40,1.0057757271440295e41,1.1114430449284422e41,1.2282118257392666e41,1.3572483950204615e41,1.4998416129700284e41,1.6574157481045249e41,1.831544703327135e41,2.023967736593588e41,2.236606833199504e41,2.4715859032090517e41,2.7312519957756955e41,3.018198742250134e41,3.33529226223343e41,3.6856997913335e41,4.072921316568229e41,4.500824535400923e41,4.9736834875895595e41,5.496221245718367e41,6.073657090818735e41,6.711758644284827e41,7.416899476796052e41,8.196122769661839e41,9.057211664460645e41,1.0008767003648447e42,1.106029323863504e42,1.2222293363408658e42,1.350637382193485e42,1.4925360437181616e42,1.6493426519707942e42,1.8226234435405696e42,2.0141092046424003e42,2.225712558785567e42,2.45954707069388e42,2.7179483572935842e42,3.003497416632373e42,3.319046407747075e42,3.66774713897719e42,4.053082549275605e42,4.478901496961774e42,4.949457203399863e42,5.469449735589009e42,6.044072951996769e42,6.679066380546126e42,7.380772546930164e42,8.156200325870043e42,9.013094948087966e42,9.960015362249354e42,1.100641972459074e43,1.2162759870131366e43,1.3440585709080678e43],"x":[-100.0,-99.9000999000999,-99.8001998001998,-99.7002997002997,-99.6003996003996,-99.5004995004995,-99.4005994005994,-99.3006993006993,-99.2007992007992,-99.1008991008991,-99.000999000999,-98.9010989010989,-98.80119880119881,-98.7012987012987,-98.6013986013986,-98.5014985014985,-98.4015984015984,-98.3016983016983,-98.2017982017982,-98.1018981018981,-98.001998001998,-97.9020979020979,-97.8021978021978,-97.7022977022977,-97.6023976023976,-97.5024975024975,-97.40259740259741,-97.3026973026973,-97.2027972027972,-97.1028971028971,-97.002997002997,-96.90309690309691,-96.8031968031968,-96.7032967032967,-96.6033966033966,-96.5034965034965,-96.40359640359641,-96.3036963036963,-96.2037962037962,-96.1038961038961,-96.00399600399601,-95.90409590409591,-95.8041958041958,-95.7042957042957,-95.6043956043956,-95.50449550449551,-95.4045954045954,-95.3046953046953,-95.2047952047952,-95.1048951048951,-95.00499500499501,-94.9050949050949,-94.8051948051948,-94.7052947052947,-94.60539460539461,-94.50549450549451,-94.4055944055944,-94.3056943056943,-94.2057942057942,-94.10589410589411,-94.00599400599401,-93.9060939060939,-93.8061938061938,-93.7062937062937,-93.60639360639361,-93.50649350649351,-93.4065934065934,-93.3066933066933,-93.20679320679321,-93.10689310689311,-93.00699300699301,-92.9070929070929,-92.8071928071928,-92.70729270729271,-92.60739260739261,-92.5074925074925,-92.4075924075924,-92.3076923076923,-92.20779220779221,-92.10789210789211,-92.007992007992,-91.9080919080919,-91.80819180819181,-91.70829170829171,-91.60839160839161,-91.5084915084915,-91.4085914085914,-91.30869130869131,-91.20879120879121,-91.10889110889111,-91.008991008991,-90.9090909090909,-90.80919080919081,-90.70929070929071,-90.60939060939062,-90.5094905094905,-90.40959040959041,-90.30969030969031,-90.20979020979021,-90.10989010989012,-90.00999000999,-89.91008991008991,-89.81018981018981,-89.71028971028971,-89.6103896103896,-89.5104895104895,-89.41058941058941,-89.31068931068931,-89.21078921078922,-89.1108891108891,-89.01098901098901,-88.91108891108891,-88.81118881118881,-88.71128871128872,-88.6113886113886,-88.51148851148851,-88.41158841158841,-88.31168831168831,-88.21178821178822,-88.1118881118881,-88.01198801198801,-87.91208791208791,-87.81218781218782,-87.71228771228772,-87.61238761238761,-87.51248751248751,-87.41258741258741,-87.31268731268732,-87.21278721278722,-87.11288711288711,-87.01298701298701,-86.91308691308691,-86.81318681318682,-86.7132867132867,-86.61338661338661,-86.51348651348651,-86.41358641358642,-86.31368631368632,-86.21378621378621,-86.11388611388611,-86.01398601398601,-85.91408591408592,-85.81418581418582,-85.71428571428571,-85.61438561438561,-85.51448551448551,-85.41458541458542,-85.31468531468532,-85.21478521478521,-85.11488511488511,-85.01498501498502,-84.91508491508492,-84.81518481518482,-84.71528471528471,-84.61538461538461,-84.51548451548452,-84.41558441558442,-84.31568431568432,-84.21578421578421,-84.11588411588411,-84.01598401598402,-83.91608391608392,-83.81618381618381,-83.71628371628371,-83.61638361638362,-83.51648351648352,-83.41658341658342,-83.31668331668331,-83.21678321678321,-83.11688311688312,-83.01698301698302,-82.91708291708292,-82.81718281718281,-82.71728271728271,-82.61738261738262,-82.51748251748252,-82.41758241758242,-82.31768231768231,-82.21778221778222,-82.11788211788212,-82.01798201798202,-81.91808191808192,-81.81818181818181,-81.71828171828172,-81.61838161838162,-81.51848151848152,-81.41858141858143,-81.31868131868131,-81.21878121878122,-81.11888111888112,-81.01898101898102,-80.91908091908093,-80.81918081918081,-80.71928071928072,-80.61938061938062,-80.51948051948052,-80.41958041958041,-80.31968031968032,-80.21978021978022,-80.11988011988012,-80.01998001998003,-79.92007992007991,-79.82017982017982,-79.72027972027972,-79.62037962037962,-79.52047952047953,-79.42057942057941,-79.32067932067932,-79.22077922077922,-79.12087912087912,-79.02097902097903,-78.92107892107892,-78.82117882117882,-78.72127872127872,-78.62137862137862,-78.52147852147853,-78.42157842157842,-78.32167832167832,-78.22177822177822,-78.12187812187813,-78.02197802197803,-77.92207792207792,-77.82217782217782,-77.72227772227772,-77.62237762237763,-77.52247752247752,-77.42257742257742,-77.32267732267732,-77.22277722277722,-77.12287712287713,-77.02297702297702,-76.92307692307692,-76.82317682317682,-76.72327672327673,-76.62337662337663,-76.52347652347652,-76.42357642357642,-76.32367632367632,-76.22377622377623,-76.12387612387613,-76.02397602397602,-75.92407592407592,-75.82417582417582,-75.72427572427573,-75.62437562437563,-75.52447552447552,-75.42457542457542,-75.32467532467533,-75.22477522477523,-75.12487512487513,-75.02497502497502,-74.92507492507492,-74.82517482517483,-74.72527472527473,-74.62537462537462,-74.52547452547452,-74.42557442557442,-74.32567432567433,-74.22577422577423,-74.12587412587412,-74.02597402597402,-73.92607392607393,-73.82617382617383,-73.72627372627373,-73.62637362637362,-73.52647352647352,-73.42657342657343,-73.32667332667333,-73.22677322677323,-73.12687312687312,-73.02697302697302,-72.92707292707293,-72.82717282717283,-72.72727272727273,-72.62737262737262,-72.52747252747253,-72.42757242757243,-72.32767232767233,-72.22777222777223,-72.12787212787212,-72.02797202797203,-71.92807192807193,-71.82817182817183,-71.72827172827172,-71.62837162837162,-71.52847152847153,-71.42857142857143,-71.32867132867133,-71.22877122877122,-71.12887112887113,-71.02897102897103,-70.92907092907093,-70.82917082917083,-70.72927072927072,-70.62937062937063,-70.52947052947053,-70.42957042957043,-70.32967032967034,-70.22977022977022,-70.12987012987013,-70.02997002997003,-69.93006993006993,-69.83016983016984,-69.73026973026973,-69.63036963036963,-69.53046953046953,-69.43056943056943,-69.33066933066934,-69.23076923076923,-69.13086913086913,-69.03096903096903,-68.93106893106894,-68.83116883116882,-68.73126873126873,-68.63136863136863,-68.53146853146853,-68.43156843156844,-68.33166833166833,-68.23176823176823,-68.13186813186813,-68.03196803196803,-67.93206793206794,-67.83216783216783,-67.73226773226773,-67.63236763236763,-67.53246753246754,-67.43256743256744,-67.33266733266733,-67.23276723276723,-67.13286713286713,-67.03296703296704,-66.93306693306694,-66.83316683316683,-66.73326673326673,-66.63336663336663,-66.53346653346654,-66.43356643356644,-66.33366633366633,-66.23376623376623,-66.13386613386614,-66.03396603396604,-65.93406593406593,-65.83416583416583,-65.73426573426573,-65.63436563436564,-65.53446553446554,-65.43456543456543,-65.33466533466533,-65.23476523476523,-65.13486513486514,-65.03496503496504,-64.93506493506493,-64.83516483516483,-64.73526473526474,-64.63536463536464,-64.53546453546454,-64.43556443556443,-64.33566433566433,-64.23576423576424,-64.13586413586414,-64.03596403596404,-63.93606393606394,-63.836163836163834,-63.73626373626374,-63.63636363636363,-63.536463536463536,-63.43656343656344,-63.336663336663335,-63.23676323676324,-63.136863136863134,-63.03696303696304,-62.93706293706294,-62.837162837162836,-62.73726273726274,-62.637362637362635,-62.53746253746254,-62.437562437562434,-62.33766233766234,-62.23776223776224,-62.137862137862136,-62.03796203796204,-61.938061938061935,-61.83816183816184,-61.73826173826174,-61.63836163836164,-61.53846153846154,-61.438561438561436,-61.33866133866134,-61.23876123876124,-61.13886113886114,-61.03896103896104,-60.93906093906094,-60.83916083916084,-60.739260739260736,-60.63936063936064,-60.53946053946054,-60.43956043956044,-60.33966033966034,-60.23976023976024,-60.13986013986014,-60.03996003996004,-59.94005994005994,-59.84015984015984,-59.74025974025974,-59.64035964035964,-59.54045954045954,-59.44055944055944,-59.34065934065934,-59.24075924075924,-59.14085914085914,-59.04095904095904,-58.94105894105894,-58.841158841158844,-58.74125874125874,-58.64135864135864,-58.54145854145854,-58.44155844155844,-58.341658341658345,-58.24175824175824,-58.141858141858144,-58.04195804195804,-57.94205794205794,-57.84215784215784,-57.74225774225774,-57.642357642357645,-57.54245754245754,-57.442557442557444,-57.34265734265734,-57.24275724275724,-57.142857142857146,-57.04295704295704,-56.943056943056945,-56.84315684315684,-56.743256743256744,-56.64335664335665,-56.54345654345654,-56.443556443556446,-56.34365634365634,-56.243756243756245,-56.14385614385614,-56.043956043956044,-55.94405594405595,-55.84415584415584,-55.744255744255746,-55.64435564435564,-55.544455544455545,-55.44455544455545,-55.344655344655344,-55.24475524475525,-55.14485514485514,-55.044955044955046,-54.94505494505494,-54.845154845154845,-54.74525474525475,-54.645354645354644,-54.54545454545455,-54.44555444555444,-54.345654345654346,-54.24575424575425,-54.145854145854145,-54.04595404595405,-53.946053946053944,-53.84615384615385,-53.74625374625375,-53.646353646353646,-53.54645354645355,-53.446553446553445,-53.34665334665335,-53.246753246753244,-53.14685314685315,-53.04695304695305,-52.947052947052946,-52.84715284715285,-52.747252747252745,-52.64735264735265,-52.54745254745255,-52.44755244755245,-52.34765234765235,-52.247752247752246,-52.14785214785215,-52.047952047952045,-51.94805194805195,-51.84815184815185,-51.74825174825175,-51.64835164835165,-51.548451548451546,-51.44855144855145,-51.34865134865135,-51.24875124875125,-51.14885114885115,-51.04895104895105,-50.94905094905095,-50.84915084915085,-50.74925074925075,-50.64935064935065,-50.54945054945055,-50.44955044955045,-50.34965034965035,-50.24975024975025,-50.14985014985015,-50.04995004995005,-49.95004995004995,-49.85014985014985,-49.75024975024975,-49.65034965034965,-49.55044955044955,-49.45054945054945,-49.35064935064935,-49.25074925074925,-49.15084915084915,-49.05094905094905,-48.95104895104895,-48.85114885114885,-48.75124875124875,-48.65134865134865,-48.55144855144855,-48.451548451548454,-48.35164835164835,-48.25174825174825,-48.15184815184815,-48.05194805194805,-47.952047952047955,-47.85214785214785,-47.752247752247754,-47.65234765234765,-47.55244755244755,-47.45254745254745,-47.35264735264735,-47.252747252747255,-47.15284715284715,-47.052947052947054,-46.95304695304695,-46.85314685314685,-46.753246753246756,-46.65334665334665,-46.553446553446555,-46.45354645354645,-46.353646353646354,-46.25374625374625,-46.15384615384615,-46.053946053946056,-45.95404595404595,-45.854145854145855,-45.75424575424575,-45.654345654345654,-45.55444555444556,-45.45454545454545,-45.354645354645356,-45.25474525474525,-45.154845154845155,-45.05494505494506,-44.955044955044954,-44.85514485514486,-44.75524475524475,-44.655344655344656,-44.55544455544455,-44.455544455544455,-44.35564435564436,-44.255744255744254,-44.15584415584416,-44.05594405594405,-43.956043956043956,-43.85614385614386,-43.756243756243755,-43.65634365634366,-43.556443556443554,-43.45654345654346,-43.35664335664335,-43.256743256743256,-43.15684315684316,-43.056943056943055,-42.95704295704296,-42.857142857142854,-42.75724275724276,-42.65734265734266,-42.557442557442556,-42.45754245754246,-42.357642357642355,-42.25774225774226,-42.15784215784216,-42.05794205794206,-41.95804195804196,-41.858141858141856,-41.75824175824176,-41.658341658341655,-41.55844155844156,-41.45854145854146,-41.35864135864136,-41.25874125874126,-41.158841158841156,-41.05894105894106,-40.95904095904096,-40.85914085914086,-40.75924075924076,-40.65934065934066,-40.55944055944056,-40.45954045954046,-40.35964035964036,-40.25974025974026,-40.15984015984016,-40.05994005994006,-39.96003996003996,-39.86013986013986,-39.76023976023976,-39.66033966033966,-39.56043956043956,-39.46053946053946,-39.36063936063936,-39.260739260739264,-39.16083916083916,-39.06093906093906,-38.96103896103896,-38.86113886113886,-38.76123876123876,-38.66133866133866,-38.561438561438564,-38.46153846153846,-38.36163836163836,-38.26173826173826,-38.16183816183816,-38.061938061938065,-37.96203796203796,-37.862137862137864,-37.76223776223776,-37.66233766233766,-37.562437562437566,-37.46253746253746,-37.362637362637365,-37.26273726273726,-37.162837162837164,-37.06293706293706,-36.96303696303696,-36.863136863136866,-36.76323676323676,-36.663336663336665,-36.56343656343656,-36.463536463536464,-36.36363636363637,-36.26373626373626,-36.163836163836166,-36.06393606393606,-35.964035964035965,-35.86413586413586,-35.764235764235764,-35.66433566433567,-35.56443556443556,-35.464535464535466,-35.36463536463536,-35.264735264735265,-35.16483516483517,-35.064935064935064,-34.96503496503497,-34.86513486513486,-34.765234765234766,-34.66533466533467,-34.565434565434565,-34.46553446553447,-34.365634365634364,-34.26573426573427,-34.16583416583416,-34.065934065934066,-33.96603396603397,-33.866133866133865,-33.76623376623377,-33.666333666333664,-33.56643356643357,-33.46653346653347,-33.366633366633366,-33.26673326673327,-33.166833166833165,-33.06693306693307,-32.967032967032964,-32.86713286713287,-32.76723276723277,-32.667332667332666,-32.56743256743257,-32.467532467532465,-32.36763236763237,-32.26773226773227,-32.16783216783217,-32.06793206793207,-31.96803196803197,-31.86813186813187,-31.768231768231768,-31.668331668331668,-31.568431568431567,-31.46853146853147,-31.36863136863137,-31.26873126873127,-31.16883116883117,-31.068931068931068,-30.969030969030968,-30.86913086913087,-30.76923076923077,-30.66933066933067,-30.56943056943057,-30.46953046953047,-30.369630369630368,-30.26973026973027,-30.16983016983017,-30.06993006993007,-29.97002997002997,-29.87012987012987,-29.77022977022977,-29.67032967032967,-29.57042957042957,-29.47052947052947,-29.37062937062937,-29.27072927072927,-29.170829170829172,-29.070929070929072,-28.97102897102897,-28.87112887112887,-28.77122877122877,-28.67132867132867,-28.571428571428573,-28.471528471528472,-28.371628371628372,-28.27172827172827,-28.17182817182817,-28.07192807192807,-27.972027972027973,-27.872127872127873,-27.772227772227772,-27.672327672327672,-27.57242757242757,-27.47252747252747,-27.372627372627374,-27.272727272727273,-27.172827172827173,-27.072927072927072,-26.973026973026972,-26.873126873126875,-26.773226773226774,-26.673326673326674,-26.573426573426573,-26.473526473526473,-26.373626373626372,-26.273726273726275,-26.173826173826175,-26.073926073926074,-25.974025974025974,-25.874125874125873,-25.774225774225773,-25.674325674325676,-25.574425574425575,-25.474525474525475,-25.374625374625374,-25.274725274725274,-25.174825174825173,-25.074925074925076,-24.975024975024976,-24.875124875124875,-24.775224775224775,-24.675324675324674,-24.575424575424574,-24.475524475524477,-24.375624375624376,-24.275724275724276,-24.175824175824175,-24.075924075924075,-23.976023976023978,-23.876123876123877,-23.776223776223777,-23.676323676323676,-23.576423576423576,-23.476523476523475,-23.376623376623378,-23.276723276723278,-23.176823176823177,-23.076923076923077,-22.977022977022976,-22.877122877122876,-22.77722277722278,-22.677322677322678,-22.577422577422578,-22.477522477522477,-22.377622377622377,-22.277722277722276,-22.17782217782218,-22.07792207792208,-21.978021978021978,-21.878121878121878,-21.778221778221777,-21.678321678321677,-21.57842157842158,-21.47852147852148,-21.37862137862138,-21.278721278721278,-21.178821178821178,-21.07892107892108,-20.97902097902098,-20.87912087912088,-20.77922077922078,-20.67932067932068,-20.579420579420578,-20.47952047952048,-20.37962037962038,-20.27972027972028,-20.17982017982018,-20.07992007992008,-19.98001998001998,-19.88011988011988,-19.78021978021978,-19.68031968031968,-19.58041958041958,-19.48051948051948,-19.38061938061938,-19.280719280719282,-19.18081918081918,-19.08091908091908,-18.98101898101898,-18.88111888111888,-18.781218781218783,-18.681318681318682,-18.581418581418582,-18.48151848151848,-18.38161838161838,-18.28171828171828,-18.181818181818183,-18.081918081918083,-17.982017982017982,-17.882117882117882,-17.78221778221778,-17.68231768231768,-17.582417582417584,-17.482517482517483,-17.382617382617383,-17.282717282717282,-17.182817182817182,-17.08291708291708,-16.983016983016984,-16.883116883116884,-16.783216783216783,-16.683316683316683,-16.583416583416582,-16.483516483516482,-16.383616383616385,-16.283716283716284,-16.183816183816184,-16.083916083916083,-15.984015984015985,-15.884115884115884,-15.784215784215784,-15.684315684315685,-15.584415584415584,-15.484515484515484,-15.384615384615385,-15.284715284715285,-15.184815184815184,-15.084915084915085,-14.985014985014985,-14.885114885114884,-14.785214785214785,-14.685314685314685,-14.585414585414586,-14.485514485514486,-14.385614385614385,-14.285714285714286,-14.185814185814186,-14.085914085914085,-13.986013986013987,-13.886113886113886,-13.786213786213786,-13.686313686313687,-13.586413586413586,-13.486513486513486,-13.386613386613387,-13.286713286713287,-13.186813186813186,-13.086913086913087,-12.987012987012987,-12.887112887112886,-12.787212787212788,-12.687312687312687,-12.587412587412587,-12.487512487512488,-12.387612387612387,-12.287712287712287,-12.187812187812188,-12.087912087912088,-11.988011988011989,-11.888111888111888,-11.788211788211788,-11.688311688311689,-11.588411588411589,-11.488511488511488,-11.38861138861139,-11.288711288711289,-11.188811188811188,-11.08891108891109,-10.989010989010989,-10.889110889110889,-10.78921078921079,-10.68931068931069,-10.589410589410589,-10.48951048951049,-10.38961038961039,-10.289710289710289,-10.18981018981019,-10.08991008991009,-9.99000999000999,-9.89010989010989,-9.79020979020979,-9.69030969030969,-9.59040959040959,-9.49050949050949,-9.390609390609391,-9.290709290709291,-9.19080919080919,-9.090909090909092,-8.991008991008991,-8.89110889110889,-8.791208791208792,-8.691308691308691,-8.591408591408591,-8.491508491508492,-8.391608391608392,-8.291708291708291,-8.191808191808192,-8.091908091908092,-7.992007992007992,-7.892107892107892,-7.792207792207792,-7.6923076923076925,-7.592407592407592,-7.492507492507492,-7.392607392607393,-7.292707292707293,-7.192807192807193,-7.092907092907093,-6.993006993006993,-6.893106893106893,-6.793206793206793,-6.693306693306694,-6.593406593406593,-6.4935064935064934,-6.393606393606394,-6.293706293706293,-6.193806193806194,-6.093906093906094,-5.994005994005994,-5.894105894105894,-5.794205794205794,-5.694305694305695,-5.594405594405594,-5.4945054945054945,-5.394605394605395,-5.294705294705294,-5.194805194805195,-5.094905094905095,-4.995004995004995,-4.895104895104895,-4.795204795204795,-4.695304695304696,-4.595404595404595,-4.495504495504496,-4.395604395604396,-4.2957042957042955,-4.195804195804196,-4.095904095904096,-3.996003996003996,-3.896103896103896,-3.796203796203796,-3.6963036963036964,-3.5964035964035963,-3.4965034965034967,-3.3966033966033966,-3.2967032967032965,-3.196803196803197,-3.096903096903097,-2.997002997002997,-2.897102897102897,-2.797202797202797,-2.6973026973026974,-2.5974025974025974,-2.4975024975024973,-2.3976023976023977,-2.2977022977022976,-2.197802197802198,-2.097902097902098,-1.998001998001998,-1.898101898101898,-1.7982017982017982,-1.6983016983016983,-1.5984015984015985,-1.4985014985014986,-1.3986013986013985,-1.2987012987012987,-1.1988011988011988,-1.098901098901099,-0.999000999000999,-0.8991008991008991,-0.7992007992007992,-0.6993006993006993,-0.5994005994005994,-0.4995004995004995,-0.3996003996003996,-0.2997002997002997,-0.1998001998001998,-0.0999000999000999,0.0,0.0999000999000999,0.1998001998001998,0.2997002997002997,0.3996003996003996,0.4995004995004995,0.5994005994005994,0.6993006993006993,0.7992007992007992,0.8991008991008991,0.999000999000999,1.098901098901099,1.1988011988011988,1.2987012987012987,1.3986013986013985,1.4985014985014986,1.5984015984015985,1.6983016983016983,1.7982017982017982,1.898101898101898,1.998001998001998,2.097902097902098,2.197802197802198,2.2977022977022976,2.3976023976023977,2.4975024975024973,2.5974025974025974,2.6973026973026974,2.797202797202797,2.897102897102897,2.997002997002997,3.096903096903097,3.196803196803197,3.2967032967032965,3.3966033966033966,3.4965034965034967,3.5964035964035963,3.6963036963036964,3.796203796203796,3.896103896103896,3.996003996003996,4.095904095904096,4.195804195804196,4.2957042957042955,4.395604395604396,4.495504495504496,4.595404595404595,4.695304695304696,4.795204795204795,4.895104895104895,4.995004995004995,5.094905094905095,5.194805194805195,5.294705294705294,5.394605394605395,5.4945054945054945,5.594405594405594,5.694305694305695,5.794205794205794,5.894105894105894,5.994005994005994,6.093906093906094,6.193806193806194,6.293706293706293,6.393606393606394,6.4935064935064934,6.593406593406593,6.693306693306694,6.793206793206793,6.893106893106893,6.993006993006993,7.092907092907093,7.192807192807193,7.292707292707293,7.392607392607393,7.492507492507492,7.592407592407592,7.6923076923076925,7.792207792207792,7.892107892107892,7.992007992007992,8.091908091908092,8.191808191808192,8.291708291708291,8.391608391608392,8.491508491508492,8.591408591408591,8.691308691308691,8.791208791208792,8.89110889110889,8.991008991008991,9.090909090909092,9.19080919080919,9.290709290709291,9.390609390609391,9.49050949050949,9.59040959040959,9.69030969030969,9.79020979020979,9.89010989010989,9.99000999000999,10.08991008991009,10.18981018981019,10.289710289710289,10.38961038961039,10.48951048951049,10.589410589410589,10.68931068931069,10.78921078921079,10.889110889110889,10.989010989010989,11.08891108891109,11.188811188811188,11.288711288711289,11.38861138861139,11.488511488511488,11.588411588411589,11.688311688311689,11.788211788211788,11.888111888111888,11.988011988011989,12.087912087912088,12.187812187812188,12.287712287712287,12.387612387612387,12.487512487512488,12.587412587412587,12.687312687312687,12.787212787212788,12.887112887112886,12.987012987012987,13.086913086913087,13.186813186813186,13.286713286713287,13.386613386613387,13.486513486513486,13.586413586413586,13.686313686313687,13.786213786213786,13.886113886113886,13.986013986013987,14.085914085914085,14.185814185814186,14.285714285714286,14.385614385614385,14.485514485514486,14.585414585414586,14.685314685314685,14.785214785214785,14.885114885114884,14.985014985014985,15.084915084915085,15.184815184815184,15.284715284715285,15.384615384615385,15.484515484515484,15.584415584415584,15.684315684315685,15.784215784215784,15.884115884115884,15.984015984015985,16.083916083916083,16.183816183816184,16.283716283716284,16.383616383616385,16.483516483516482,16.583416583416582,16.683316683316683,16.783216783216783,16.883116883116884,16.983016983016984,17.08291708291708,17.182817182817182,17.282717282717282,17.382617382617383,17.482517482517483,17.582417582417584,17.68231768231768,17.78221778221778,17.882117882117882,17.982017982017982,18.081918081918083,18.181818181818183,18.28171828171828,18.38161838161838,18.48151848151848,18.581418581418582,18.681318681318682,18.781218781218783,18.88111888111888,18.98101898101898,19.08091908091908,19.18081918081918,19.280719280719282,19.38061938061938,19.48051948051948,19.58041958041958,19.68031968031968,19.78021978021978,19.88011988011988,19.98001998001998,20.07992007992008,20.17982017982018,20.27972027972028,20.37962037962038,20.47952047952048,20.579420579420578,20.67932067932068,20.77922077922078,20.87912087912088,20.97902097902098,21.07892107892108,21.178821178821178,21.278721278721278,21.37862137862138,21.47852147852148,21.57842157842158,21.678321678321677,21.778221778221777,21.878121878121878,21.978021978021978,22.07792207792208,22.17782217782218,22.277722277722276,22.377622377622377,22.477522477522477,22.577422577422578,22.677322677322678,22.77722277722278,22.877122877122876,22.977022977022976,23.076923076923077,23.176823176823177,23.276723276723278,23.376623376623378,23.476523476523475,23.576423576423576,23.676323676323676,23.776223776223777,23.876123876123877,23.976023976023978,24.075924075924075,24.175824175824175,24.275724275724276,24.375624375624376,24.475524475524477,24.575424575424574,24.675324675324674,24.775224775224775,24.875124875124875,24.975024975024976,25.074925074925076,25.174825174825173,25.274725274725274,25.374625374625374,25.474525474525475,25.574425574425575,25.674325674325676,25.774225774225773,25.874125874125873,25.974025974025974,26.073926073926074,26.173826173826175,26.273726273726275,26.373626373626372,26.473526473526473,26.573426573426573,26.673326673326674,26.773226773226774,26.873126873126875,26.973026973026972,27.072927072927072,27.172827172827173,27.272727272727273,27.372627372627374,27.47252747252747,27.57242757242757,27.672327672327672,27.772227772227772,27.872127872127873,27.972027972027973,28.07192807192807,28.17182817182817,28.27172827172827,28.371628371628372,28.471528471528472,28.571428571428573,28.67132867132867,28.77122877122877,28.87112887112887,28.97102897102897,29.070929070929072,29.170829170829172,29.27072927072927,29.37062937062937,29.47052947052947,29.57042957042957,29.67032967032967,29.77022977022977,29.87012987012987,29.97002997002997,30.06993006993007,30.16983016983017,30.26973026973027,30.369630369630368,30.46953046953047,30.56943056943057,30.66933066933067,30.76923076923077,30.86913086913087,30.969030969030968,31.068931068931068,31.16883116883117,31.26873126873127,31.36863136863137,31.46853146853147,31.568431568431567,31.668331668331668,31.768231768231768,31.86813186813187,31.96803196803197,32.06793206793207,32.16783216783217,32.26773226773227,32.36763236763237,32.467532467532465,32.56743256743257,32.667332667332666,32.76723276723277,32.86713286713287,32.967032967032964,33.06693306693307,33.166833166833165,33.26673326673327,33.366633366633366,33.46653346653347,33.56643356643357,33.666333666333664,33.76623376623377,33.866133866133865,33.96603396603397,34.065934065934066,34.16583416583416,34.26573426573427,34.365634365634364,34.46553446553447,34.565434565434565,34.66533466533467,34.765234765234766,34.86513486513486,34.96503496503497,35.064935064935064,35.16483516483517,35.264735264735265,35.36463536463536,35.464535464535466,35.56443556443556,35.66433566433567,35.764235764235764,35.86413586413586,35.964035964035965,36.06393606393606,36.163836163836166,36.26373626373626,36.36363636363637,36.463536463536464,36.56343656343656,36.663336663336665,36.76323676323676,36.863136863136866,36.96303696303696,37.06293706293706,37.162837162837164,37.26273726273726,37.362637362637365,37.46253746253746,37.562437562437566,37.66233766233766,37.76223776223776,37.862137862137864,37.96203796203796,38.061938061938065,38.16183816183816,38.26173826173826,38.36163836163836,38.46153846153846,38.561438561438564,38.66133866133866,38.76123876123876,38.86113886113886,38.96103896103896,39.06093906093906,39.16083916083916,39.260739260739264,39.36063936063936,39.46053946053946,39.56043956043956,39.66033966033966,39.76023976023976,39.86013986013986,39.96003996003996,40.05994005994006,40.15984015984016,40.25974025974026,40.35964035964036,40.45954045954046,40.55944055944056,40.65934065934066,40.75924075924076,40.85914085914086,40.95904095904096,41.05894105894106,41.158841158841156,41.25874125874126,41.35864135864136,41.45854145854146,41.55844155844156,41.658341658341655,41.75824175824176,41.858141858141856,41.95804195804196,42.05794205794206,42.15784215784216,42.25774225774226,42.357642357642355,42.45754245754246,42.557442557442556,42.65734265734266,42.75724275724276,42.857142857142854,42.95704295704296,43.056943056943055,43.15684315684316,43.256743256743256,43.35664335664335,43.45654345654346,43.556443556443554,43.65634365634366,43.756243756243755,43.85614385614386,43.956043956043956,44.05594405594405,44.15584415584416,44.255744255744254,44.35564435564436,44.455544455544455,44.55544455544455,44.655344655344656,44.75524475524475,44.85514485514486,44.955044955044954,45.05494505494506,45.154845154845155,45.25474525474525,45.354645354645356,45.45454545454545,45.55444555444556,45.654345654345654,45.75424575424575,45.854145854145855,45.95404595404595,46.053946053946056,46.15384615384615,46.25374625374625,46.353646353646354,46.45354645354645,46.553446553446555,46.65334665334665,46.753246753246756,46.85314685314685,46.95304695304695,47.052947052947054,47.15284715284715,47.252747252747255,47.35264735264735,47.45254745254745,47.55244755244755,47.65234765234765,47.752247752247754,47.85214785214785,47.952047952047955,48.05194805194805,48.15184815184815,48.25174825174825,48.35164835164835,48.451548451548454,48.55144855144855,48.65134865134865,48.75124875124875,48.85114885114885,48.95104895104895,49.05094905094905,49.15084915084915,49.25074925074925,49.35064935064935,49.45054945054945,49.55044955044955,49.65034965034965,49.75024975024975,49.85014985014985,49.95004995004995,50.04995004995005,50.14985014985015,50.24975024975025,50.34965034965035,50.44955044955045,50.54945054945055,50.64935064935065,50.74925074925075,50.84915084915085,50.94905094905095,51.04895104895105,51.14885114885115,51.24875124875125,51.34865134865135,51.44855144855145,51.548451548451546,51.64835164835165,51.74825174825175,51.84815184815185,51.94805194805195,52.047952047952045,52.14785214785215,52.247752247752246,52.34765234765235,52.44755244755245,52.54745254745255,52.64735264735265,52.747252747252745,52.84715284715285,52.947052947052946,53.04695304695305,53.14685314685315,53.246753246753244,53.34665334665335,53.446553446553445,53.54645354645355,53.646353646353646,53.74625374625375,53.84615384615385,53.946053946053944,54.04595404595405,54.145854145854145,54.24575424575425,54.345654345654346,54.44555444555444,54.54545454545455,54.645354645354644,54.74525474525475,54.845154845154845,54.94505494505494,55.044955044955046,55.14485514485514,55.24475524475525,55.344655344655344,55.44455544455545,55.544455544455545,55.64435564435564,55.744255744255746,55.84415584415584,55.94405594405595,56.043956043956044,56.14385614385614,56.243756243756245,56.34365634365634,56.443556443556446,56.54345654345654,56.64335664335665,56.743256743256744,56.84315684315684,56.943056943056945,57.04295704295704,57.142857142857146,57.24275724275724,57.34265734265734,57.442557442557444,57.54245754245754,57.642357642357645,57.74225774225774,57.84215784215784,57.94205794205794,58.04195804195804,58.141858141858144,58.24175824175824,58.341658341658345,58.44155844155844,58.54145854145854,58.64135864135864,58.74125874125874,58.841158841158844,58.94105894105894,59.04095904095904,59.14085914085914,59.24075924075924,59.34065934065934,59.44055944055944,59.54045954045954,59.64035964035964,59.74025974025974,59.84015984015984,59.94005994005994,60.03996003996004,60.13986013986014,60.23976023976024,60.33966033966034,60.43956043956044,60.53946053946054,60.63936063936064,60.739260739260736,60.83916083916084,60.93906093906094,61.03896103896104,61.13886113886114,61.23876123876124,61.33866133866134,61.438561438561436,61.53846153846154,61.63836163836164,61.73826173826174,61.83816183816184,61.938061938061935,62.03796203796204,62.137862137862136,62.23776223776224,62.33766233766234,62.437562437562434,62.53746253746254,62.637362637362635,62.73726273726274,62.837162837162836,62.93706293706294,63.03696303696304,63.136863136863134,63.23676323676324,63.336663336663335,63.43656343656344,63.536463536463536,63.63636363636363,63.73626373626374,63.836163836163834,63.93606393606394,64.03596403596404,64.13586413586414,64.23576423576424,64.33566433566433,64.43556443556443,64.53546453546454,64.63536463536464,64.73526473526474,64.83516483516483,64.93506493506493,65.03496503496504,65.13486513486514,65.23476523476523,65.33466533466533,65.43456543456543,65.53446553446554,65.63436563436564,65.73426573426573,65.83416583416583,65.93406593406593,66.03396603396604,66.13386613386614,66.23376623376623,66.33366633366633,66.43356643356644,66.53346653346654,66.63336663336663,66.73326673326673,66.83316683316683,66.93306693306694,67.03296703296704,67.13286713286713,67.23276723276723,67.33266733266733,67.43256743256744,67.53246753246754,67.63236763236763,67.73226773226773,67.83216783216783,67.93206793206794,68.03196803196803,68.13186813186813,68.23176823176823,68.33166833166833,68.43156843156844,68.53146853146853,68.63136863136863,68.73126873126873,68.83116883116882,68.93106893106894,69.03096903096903,69.13086913086913,69.23076923076923,69.33066933066934,69.43056943056943,69.53046953046953,69.63036963036963,69.73026973026973,69.83016983016984,69.93006993006993,70.02997002997003,70.12987012987013,70.22977022977022,70.32967032967034,70.42957042957043,70.52947052947053,70.62937062937063,70.72927072927072,70.82917082917083,70.92907092907093,71.02897102897103,71.12887112887113,71.22877122877122,71.32867132867133,71.42857142857143,71.52847152847153,71.62837162837162,71.72827172827172,71.82817182817183,71.92807192807193,72.02797202797203,72.12787212787212,72.22777222777223,72.32767232767233,72.42757242757243,72.52747252747253,72.62737262737262,72.72727272727273,72.82717282717283,72.92707292707293,73.02697302697302,73.12687312687312,73.22677322677323,73.32667332667333,73.42657342657343,73.52647352647352,73.62637362637362,73.72627372627373,73.82617382617383,73.92607392607393,74.02597402597402,74.12587412587412,74.22577422577423,74.32567432567433,74.42557442557442,74.52547452547452,74.62537462537462,74.72527472527473,74.82517482517483,74.92507492507492,75.02497502497502,75.12487512487513,75.22477522477523,75.32467532467533,75.42457542457542,75.52447552447552,75.62437562437563,75.72427572427573,75.82417582417582,75.92407592407592,76.02397602397602,76.12387612387613,76.22377622377623,76.32367632367632,76.42357642357642,76.52347652347652,76.62337662337663,76.72327672327673,76.82317682317682,76.92307692307692,77.02297702297702,77.12287712287713,77.22277722277722,77.32267732267732,77.42257742257742,77.52247752247752,77.62237762237763,77.72227772227772,77.82217782217782,77.92207792207792,78.02197802197803,78.12187812187813,78.22177822177822,78.32167832167832,78.42157842157842,78.52147852147853,78.62137862137862,78.72127872127872,78.82117882117882,78.92107892107892,79.02097902097903,79.12087912087912,79.22077922077922,79.32067932067932,79.42057942057941,79.52047952047953,79.62037962037962,79.72027972027972,79.82017982017982,79.92007992007991,80.01998001998003,80.11988011988012,80.21978021978022,80.31968031968032,80.41958041958041,80.51948051948052,80.61938061938062,80.71928071928072,80.81918081918081,80.91908091908093,81.01898101898102,81.11888111888112,81.21878121878122,81.31868131868131,81.41858141858143,81.51848151848152,81.61838161838162,81.71828171828172,81.81818181818181,81.91808191808192,82.01798201798202,82.11788211788212,82.21778221778222,82.31768231768231,82.41758241758242,82.51748251748252,82.61738261738262,82.71728271728271,82.81718281718281,82.91708291708292,83.01698301698302,83.11688311688312,83.21678321678321,83.31668331668331,83.41658341658342,83.51648351648352,83.61638361638362,83.71628371628371,83.81618381618381,83.91608391608392,84.01598401598402,84.11588411588411,84.21578421578421,84.31568431568432,84.41558441558442,84.51548451548452,84.61538461538461,84.71528471528471,84.81518481518482,84.91508491508492,85.01498501498502,85.11488511488511,85.21478521478521,85.31468531468532,85.41458541458542,85.51448551448551,85.61438561438561,85.71428571428571,85.81418581418582,85.91408591408592,86.01398601398601,86.11388611388611,86.21378621378621,86.31368631368632,86.41358641358642,86.51348651348651,86.61338661338661,86.7132867132867,86.81318681318682,86.91308691308691,87.01298701298701,87.11288711288711,87.21278721278722,87.31268731268732,87.41258741258741,87.51248751248751,87.61238761238761,87.71228771228772,87.81218781218782,87.91208791208791,88.01198801198801,88.1118881118881,88.21178821178822,88.31168831168831,88.41158841158841,88.51148851148851,88.6113886113886,88.71128871128872,88.81118881118881,88.91108891108891,89.01098901098901,89.1108891108891,89.21078921078922,89.31068931068931,89.41058941058941,89.5104895104895,89.6103896103896,89.71028971028971,89.81018981018981,89.91008991008991,90.00999000999,90.10989010989012,90.20979020979021,90.30969030969031,90.40959040959041,90.5094905094905,90.60939060939062,90.70929070929071,90.80919080919081,90.9090909090909,91.008991008991,91.10889110889111,91.20879120879121,91.30869130869131,91.4085914085914,91.5084915084915,91.60839160839161,91.70829170829171,91.80819180819181,91.9080919080919,92.007992007992,92.10789210789211,92.20779220779221,92.3076923076923,92.4075924075924,92.5074925074925,92.60739260739261,92.70729270729271,92.8071928071928,92.9070929070929,93.00699300699301,93.10689310689311,93.20679320679321,93.3066933066933,93.4065934065934,93.50649350649351,93.60639360639361,93.7062937062937,93.8061938061938,93.9060939060939,94.00599400599401,94.10589410589411,94.2057942057942,94.3056943056943,94.4055944055944,94.50549450549451,94.60539460539461,94.7052947052947,94.8051948051948,94.9050949050949,95.00499500499501,95.1048951048951,95.2047952047952,95.3046953046953,95.4045954045954,95.50449550449551,95.6043956043956,95.7042957042957,95.8041958041958,95.90409590409591,96.00399600399601,96.1038961038961,96.2037962037962,96.3036963036963,96.40359640359641,96.5034965034965,96.6033966033966,96.7032967032967,96.8031968031968,96.90309690309691,97.002997002997,97.1028971028971,97.2027972027972,97.3026973026973,97.40259740259741,97.5024975024975,97.6023976023976,97.7022977022977,97.8021978021978,97.9020979020979,98.001998001998,98.1018981018981,98.2017982017982,98.3016983016983,98.4015984015984,98.5014985014985,98.6013986013986,98.7012987012987,98.80119880119881,98.9010989010989,99.000999000999,99.1008991008991,99.2007992007992,99.3006993006993,99.4005994005994,99.5004995004995,99.6003996003996,99.7002997002997,99.8001998001998,99.9000999000999,100.0]}
},{}],75:[function(require,module,exports){
module.exports={"expected":[-4.4939375181275414e307,-3.3151032212250334e307,-2.445496699285871e307,-1.8040023815630834e307,-1.3307826559880442e307,-9.816963079305464e306,-7.241810949880865e306,-5.342163906510154e306,-3.940825768793725e306,-2.907081851431278e306,-2.1445060976417974e306,-1.5819666035746788e306,-1.1669905427538256e306,-8.60869580811239e305,-6.3504922106514075e305,-4.684652845967201e305,-3.455790757513575e305,-2.5492795629449857e305,-1.8805612799092366e305,-1.387258886353292e305,-1.0233578869915053e305,-7.54914151331039e304,-5.568876569224396e304,-4.1080679423719914e304,-3.0304536308824964e304,-2.2355154144863844e304,-1.649102668154119e304,-1.2165157048304966e304,-8.974034720079445e303,-6.619996670607852e303,-4.8834618191076157e303,-3.6024488417899484e303,-2.6574668008940734e303,-1.9603692121679158e303,-1.4461318751837166e303,-1.0667875150466705e303,-7.869514681119553e302,-5.8052105450122295e302,-4.282407599133288e302,-3.1590611060391752e302,-2.3303870172725343e302,-1.7190878770562207e302,-1.268142633450136e302,-9.354878015471395e301,-6.900938457235542e301,-5.09070791856256e301,-3.7553308543052796e301,-2.7702453275452653e301,-2.0435640620024552e301,-1.5075033369726934e301,-1.112060225191675e301,-8.203483960020045e300,-6.05157414659934e300,-4.4641459446086236e300,-3.29312647122843e300,-2.4292848150722686e300,-1.792043143286865e300,-1.3219605241329293e300,-9.751883674857823e299,-7.193802951893974e299,-5.306749202116465e299,-3.914700928351977e299,-2.8878099896504673e299,-2.1302895646324123e299,-1.5714793028091572e299,-1.1592542348035035e299,-8.551626346636684e298,-6.308393014832917e298,-4.65359696699561e298,-3.432881350339706e298,-2.532379672990264e298,-1.8680945112013272e298,-1.378062357710903e298,-1.0165737602423076e298,-7.49909613473285e297,-5.531958922938087e297,-4.0808344066069286e297,-3.0103639029380395e297,-2.220695555163753e297,-1.6381703035674856e297,-1.2084510806760252e297,-8.914543324384338e296,-6.576110854057919e296,-4.851087979635786e296,-3.578567196999922e296,-2.6398497073647984e296,-1.9473733742703157e296,-1.4365450609694408e296,-1.0597154810998618e296,-7.817345458865999e295,-5.766726174447672e295,-4.2540183168366935e295,-3.138118803034275e295,-2.3149382274590227e295,-1.7076915608708395e295,-1.259735759891145e295,-9.292861902646177e294,-6.855190198705254e294,-5.056960186511359e294,-3.730435711730954e294,-2.7518805934993e294,-2.0300167020874174e294,-1.4975096741076646e294,-1.1046880657384955e294,-8.149100761651977e293,-6.0114565625505276e293,-4.4345518677953044e293,-3.271295411277711e293,-2.4131804039910176e293,-1.7801631861588366e293,-1.31319687666692e293,-9.687235700053855e292,-7.146113212405205e292,-5.271569271741177e292,-3.8887492768127316e292,-2.8686658864521393e292,-2.1161672770115167e292,-1.5610615253048081e292,-1.1515692130104869e292,-8.494935214643832e291,-6.266572906402498e291,-4.62274696616492e291,-3.4101238160576143e291,-2.5155918171511263e291,-1.8557103882031218e291,-1.3689267954390439e291,-1.009834607373916e291,-7.449382521021414e290,-5.4952860140939506e290,-4.0537814095969596e290,-2.9904073554404867e290,-2.2059739408496237e290,-1.6273104126950505e290,-1.2004399191794223e290,-8.855446313854002e289,-6.532515968907956e289,-4.818928755435042e289,-3.5548438703377763e289,-2.622349402494676e289,-1.9344636894306098e289,-1.4270218004381701e289,-1.0526903296514998e289,-7.765522081033711e288,-5.728496927579749e288,-4.225817235062973e288,-3.117315332435367e288,-2.2995918520108256e288,-1.69637079406487e288,-1.2513846178574203e288,-9.231256912043374e287,-6.80974521822575e287,-5.023436177650884e287,-3.705705606046698e287,-2.7336376044313788e287,-2.0165591514250227e287,-1.4875822620395729e287,-1.0973647784002523e287,-8.095078084774429e286,-5.971604929230406e286,-4.4051539784259675e286,-3.2496090755522905e286,-2.3971827535722727e286,-1.7683619846018066e286,-1.3044913258804306e286,-9.623016294824233e285,-7.098739621588802e285,-5.236622559000813e285,-3.862969666057684e285,-2.849648694888457e285,-2.1021386100004517e285,-1.550712810172238e285,-1.1439351373847014e285,-8.438619904081472e284,-6.225030035212923e284,-4.592101478651134e284,-3.387517147860035e284,-2.498915252721678e284,-1.843408363033429e284,-1.3598517953743707e284,-1.0031401302420777e284,-7.399998472812787e283,-5.458856220258148e283,-4.026907754499527e283,-2.9705831054989257e283,-2.19134992025e283,-1.6165225150880305e283,-1.1924818659215815e283,-8.796741073997456e282,-6.489210086491282e282,-4.786982723759954e282,-3.5312778122690017e282,-2.6049651120585995e282,-1.9216395865164285e282,-1.4175616722745355e282,-1.0457117499045789e282,-7.714042254922922e281,-5.6905211131231444e281,-4.1978031061780216e281,-3.0966497738841635e281,-2.2843472119940987e281,-1.6851250758006504e281,-1.2430888378888903e281,-9.170060318220444e280,-6.764601505280906e280,-4.990134408856725e280,-3.681139443176208e280,-2.715515553259553e280,-2.0031908146442895e280,-1.4777206615731171e280,-1.090090039189849e280,-8.041413539388311e279,-5.932017483576245e279,-4.3759509759184663e279,-3.2280665046353837e279,-2.381291156069358e279,-1.7566390165233856e279,-1.2958434866342615e279,-9.559222618063107e278,-7.051680083606455e278,-5.201907517831385e278,-3.8373609555801745e278,-2.8307575736272108e278,-2.0882029429616693e278,-1.5404326995779463e278,-1.1363516701895703e278,-8.382677923522873e277,-6.183762563379974e277,-4.561659148677537e277,-3.365060345612949e277,-2.482349241919636e277,-1.8311878914424832e277,-1.3508369560328553e277,-9.96490032678677e276,-7.350941805323886e276,-5.422667929754276e276,-4.000212252406285e276,-2.95089027607639e276,-2.1768228463885004e276,-1.6058061334832242e276,-1.184576568833077e276,-8.738425007658908e275,-6.446191290927639e275,-4.755248471298501e275,-3.5078679802155333e275,-2.5876960669649052e275,-1.9089004981809403e275,-1.4081642579566694e275,-1.0387794331220955e275,-7.662903703031945e274,-5.652797051002603e274,-4.169974690818177e274,-3.076121213122625e274,-2.2692036329758455e274,-1.6739539085601345e274,-1.2348480529747414e274,-9.109269413799425e273,-6.719757062682886e273,-4.957053406838222e273,-3.656736136296128e273,-2.697513638253172e273,-1.9899111003213483e273,-1.4679244364250485e273,-1.0828635262681155e273,-7.988104751341242e272,-5.892692474213834e272,-4.3469415683140737e272,-3.2066667454693435e272,-2.3655049084282605e272,-1.7449937632916786e272,-1.2872529763422623e272,-9.495851847495845e271,-7.004932516512958e271,-5.167422612416407e271,-3.8119220124338474e271,-2.8119916869126465e271,-2.074359659372007e271,-1.5302207387230118e271,-1.1288184759274696e271,-8.327106798060531e270,-6.1427686652032975e270,-4.531418629456793e270,-3.342752415812516e270,-2.4658930518545293e270,-1.819048432788714e270,-1.3418818785924803e270,-9.89884020479095e269,-7.302210348257675e269,-5.38671954158832e269,-3.9736937222918604e269,-2.9313279959490236e269,-2.1623920765784745e269,-1.5951607937807904e269,-1.1767236781783174e269,-8.680495534896844e268,-6.403457679036947e268,-4.723724594106273e268,-3.4846133385108596e268,-2.570541503219567e268,-1.8962458608384184e268,-1.3988291417367194e268,-1.0318930726137519e268,-7.612104162959902e267,-5.6153230722805685e267,-4.142330757837288e267,-3.055728741953941e267,-2.254160444994849e267,-1.662856798123655e267,-1.2266618985375985e267,-9.04888150935137e266,-6.675209906486067e266,-4.924191708069869e266,-3.6324946057892047e266,-2.679631062995557e266,-1.9767194209528212e266,-1.458193153203859e266,-1.0756849199293222e266,-7.935149362217028e265,-5.853628161378647e265,-4.318124472217325e265,-3.1854088513146147e265,-2.3498233122548972e265,-1.73342570971295e265,-1.2787194149549932e265,-9.432901179557476e264,-6.958494852167293e264,-5.13316631712077e264,-3.7866517111842683e264,-2.793350204529793e264,-2.0606081467961143e264,-1.5200764758236785e264,-1.121335221325268e264,-8.27190406919094e263,-6.102046527087714e263,-4.501378583128244e263,-3.320592371542248e263,-2.4495459544935783e263,-1.8069894500144104e263,-1.332986166874671e263,-9.833218013889657e262,-7.253801945702123e262,-5.35100946537972e262,-3.9473509909588646e262,-2.9118953996685652e262,-2.148056972393079e262,-1.5845860250238326e262,-1.1689228465406069e262,-8.622950092872926e261,-6.361007360258028e261,-4.692409697546546e261,-3.4615128583553776e261,-2.5535006618935845e261,-1.8836751146399515e261,-1.3895559106231038e261,-1.025052363722739e261,-7.561641387301395e260,-5.578097519085254e260,-4.1148700842493957e260,-3.035471458201646e260,-2.2392169825304805e260,-1.6518332535476783e260,-1.2185300124165511e260,-8.988893933275293e259,-6.630958065894664e259,-4.891547858728293e259,-3.608413779194026e259,-2.661867036349706e259,-1.963615192930727e259,-1.448526381391118e259,-1.0685539025875253e259,-7.882545029234095e258,-5.814822816841544e258,-4.289498412741244e258,-3.164291881708932e258,-2.3342456737853076e258,-1.7219343440094206e258,-1.2702424249420293e258,-9.370367829271872e257,-6.912365036136339e257,-5.099137116424974e257,-3.761548933856522e257,-2.7748323017670937e257,-2.0469477968579404e257,-1.5099994620910205e257,-1.1139015753188115e257,-8.217067294708723e256,-6.061594347458782e256,-4.471537680700294e256,-3.298579232427067e256,-2.4333072266303414e256,-1.7950104096227836e256,-1.3241494273272342e256,-9.768030850916947e255,-7.205714456038178e255,-5.31553612129282e255,-3.921182892987818e255,-2.8925916275250457e255,-2.1338168996380296e255,-1.5740813593780999e255,-1.1611737288059718e255,-8.565786135741532e254,-6.318838456560578e254,-4.6613023962275036e254,-3.438565517768501e254,-2.536572789088823e254,-1.871187703447377e254,-1.380344154361921e254,-1.0182570038115514e254,-7.511513143549724e253,-5.541118744533459e253,-4.087591455176068e253,-3.015348465671094e253,-2.224372584474038e253,-1.6408827871438362e253,-1.2104520348515578e253,-8.92930403168406e252,-6.586999583178618e252,-4.859120414629594e252,-3.584492591159241e252,-2.6442207724241923e252,-1.950597836515314e252,-1.4389236933229155e252,-1.06147015876178e252,-7.830289425144508e251,-5.776274723828306e251,-4.261062123449953e251,-3.1433149024235326e251,-2.318771303854422e251,-1.710519157795437e251,-1.2618216312757042e251,-9.308249030122075e250,-6.866541027606409e250,-5.0653335048545735e250,-3.7366125698870724e250,-2.75643715938118e250,-2.0333780052145333e250,-1.499989251711774e250,-1.1065172090386644e250,-8.162594048601367e249,-6.021410336685899e249,-4.441894601993132e249,-3.2767120245914543e249,-2.417176149853546e249,-1.7831107816531293e249,-1.3153712690073969e249,-9.703275831949428e248,-7.157945751843369e248,-5.28029793996331e248,-3.895188270684693e248,-2.8734158255067625e248,-2.1196712283230525e248,-1.5636463321102061e248,-1.1534759821482983e248,-8.509001134531223e247,-6.2769491023643e247,-4.630401313943072e247,-3.4157703015446445e247,-2.5197571359058152e247,-1.8587830748093325e247,-1.3711934654194288e247,-1.0115066922490693e247,-7.46171721400066e246,-5.5043851126602706e246,-4.060493663794037e246,-2.9953588741077254e246,-2.2096265941002543e246,-1.6300049144562209e246,-1.2024276084679407e246,-8.870109168280842e245,-6.543332513585467e245,-4.826907941162103e245,-3.5607299833956084e245,-2.626691490536578e245,-1.9376667758100906e245,-1.4293846641699526e245,-1.0544333750625565e245,-7.778380238125633e244,-5.7379821769457e244,-4.2328143463045855e244,-3.122476985422925e244,-2.3033995178666314e244,-1.6991796460555823e244,-1.2534566614149454e244,-9.246542033932217e243,-6.821020799295278e243,-5.031753986915922e243,-3.711841516075895e243,-2.7381639635587338e243,-2.0198981715299946e243,-1.4900454018275824e243,-1.0991817957959371e243,-8.108481920936279e242,-5.981492717001748e242,-4.412448035577262e242,-3.254989780615616e242,-2.4011520105136393e242,-1.7712900396580052e242,-1.3066513035636036e242,-9.638950092182066e241,-7.110493719800945e241,-5.245293362430655e241,-3.869365974031466e241,-2.854367145263501e241,-2.1056193326349795e241,-1.5532804815677927e241,-1.145829266014557e241,-8.452592577036803e240,-6.23533744445849e240,-4.599705083608842e240,-3.3931262012094736e240,-2.503052958408894e240,-1.846460679937445e240,-1.362103438963069e240,-1.0048011303970276e240,-7.412251395649205e239,-5.467894998345423e239,-4.033575511279009e239,-2.9755017991587383e239,-2.194978359036719e239,-1.6191991542405218e239,-1.1944563782597458e239,-8.81130672424558e238,-6.49995492525729e238,-4.794909013224606e238,-3.5371249046307976e238,-2.609278415179793e238,-1.9248214387370064e238,-1.4199088719194072e238,-1.0474432401782311e238,-7.726815171681446e237,-5.699943482107986e237,-4.2047538316047154e237,-3.101777208824889e237,-2.288129635763912e237,-1.687915307122908e237,-1.2451471452879291e237,-9.185244110743815e236,-6.7758023373578095e236,-4.9983970770288495e236,-3.687234676535113e236,-2.7200119058814387e236,-2.0065076994475274e236,-1.4801674725159244e236,-1.0918950110670748e236,-8.054728517757001e235,-5.941839722426372e235,-4.383196678717037e235,-3.2334115394941664e235,-2.3852340996923285e235,-1.7595476606805407e235,-1.2979891452189408e235,-9.575050785804709e234,-7.063356260601488e234,-5.2105208400708885e234,-3.843714860632581e234,-2.835444744069974e234,-2.091660590908611e234,-1.5429833491587493e234,-1.138233242108946e234,-8.396557967706236e233,-6.19400164191576e233,-4.569212347203203e233,-3.3706322149729455e233,-2.486459517594155e233,-1.8342199736807785e233,-1.3530736728440361e233,-9.9814002159726e232,-7.363113500094708e232,-5.431646787243897e232,-4.006835806754046e232,-2.955776362334967e232,-2.180427231236035e232,-1.6084650284432845e232,-1.1865379915745907e232,-8.752894098122108e231,-6.456864899140763e231,-4.763122215164919e231,-3.513676310560443e231,-2.591980775988713e231,-1.9120612570098163e231,-1.4104958973559389e231,-1.0404994448605931e231,-7.675591944539171e230,-5.662156956458035e230,-4.176879337934542e230,-3.0812146568575577e230,-2.272960981996541e230,-1.6767256426555757e230,-1.2368927152761446e230,-9.124352548699182e229,-6.730883641299223e229,-4.965261299463219e229,-3.662790962642224e229,-2.701980183291138e229,-1.9932059965639827e229,-1.4703550267711533e229,-1.0846565324800062e229,-8.001331460980035e228,-5.902449598684947e228,-4.3541392373145004e228,-3.2119763465913836e228,-2.3694217131706704e228,-1.7478831252300895e228,-1.2893844107537719e228,-9.511575085869594e227,-7.016531288852505e227,-5.175978834524523e227,-3.818233795665749e227,-2.816647784786582e227,-2.0777943855999438e227,-1.5327544793316273e227,-1.1306875743783243e227,-8.340894827534065e226,-6.152939866012762e226,-4.5389217557088093e226,-3.3482873476865554e226,-2.4699760793576075e226,-1.822060414502569e226,-1.3441037675799428e226,-9.915230711578883e225,-7.314301353446556e225,-5.395638875710752e225,-3.980273367238232e225,-2.936181690969983e225,-2.1659725669466468e225,-1.5978020621796535e225,-1.1786720980977912e225,-8.694868705697044e224,-6.4140605289045206e224,-4.731546140713981e224,-3.4903831638031743e224,-2.5747978077042874e224,-1.899385666109608e224,-1.4011453240437839e224,-1.0336016819115272e224,-7.624708290551846e223,-5.624620928295502e223,-4.1491896321093804e223,-3.0607884198203274e223,-2.2578928854939794e223,-1.66561015761559e223,-1.2286930061985493e223,-9.06386465391516e222,-6.686262723888875e222,-4.932345188270221e222,-3.638509292991096e222,-2.6840679980524467e222,-1.9799924744031927e222,-1.460607630484151e222,-1.0774660397996938e222,-7.948288388284116e221,-5.863320603132579e221,-4.325274425849142e221,-3.1906832536002826e221,-2.353714151398994e221,-1.736295917259957e221,-1.2808367194893708e221,-9.44852018417015e220,-6.970016732988548e220,-5.14166581763059e220,-3.7929216518330393e220,-2.7979754358235246e220,-2.064020103259558e220,-1.5225934195543442e220,-1.1231919289977272e220,-8.285600693945519e219,-6.112150300151362e219,-4.508831969049513e219,-3.326090610798538e219,-2.4536019144609945e219,-1.8099814644559474e219,-1.3351933263362214e219,-9.849499863406878e218,-7.265812796222956e218,-5.3598696707323806e218,-3.953887017591596e218,-2.91671691818268e218,-2.151613726685348e218,-1.587209783713011e218,-1.1708583498373993e218,-8.637227979888993e217,-6.37153992085699e217,-4.70017939292556e217,-3.4672444338559027e217,-2.5577287501407373e217,-1.8867941052604713e217,-1.391856738307288e217,-1.026749646169773e217,-7.574161958592387e216,-5.587333737001579e216,-4.121683489118018e216,-3.040497594043082e216,-2.242924679633628e216,-1.654568360246606e216,-1.220547655294567e216,-9.003777750367635e215,-6.641937611067739e215,-4.899647287219516e215,-3.614388593345781e215,-2.6662745577185477e215,-1.966866548390839e215,-1.450924852423716e215,-1.0703232149141508e215,-7.895596953008938e214,-5.824451004677523e214,-4.2966009673227823e214,-3.1695313185008356e214,-2.3381107194641993e214,-1.7247855241446654e214,-1.2723456932701253e214,-9.385883291117268e213,-6.923810535174372e213,-5.1075802713593174e213,-3.7677773093083935e213,-2.779426871104322e213,-2.0503371345040524e213,-1.512499720295214e213,-1.1157459743548235e213,-8.230673120693293e212,-6.0716311397740715e212,-4.478941656034199e212,-3.3040410223116503e212,-2.437336298500527e212,-1.7979825891604526e212,-1.3263419549091108e212,-9.784204763481898e211,-7.21764568325835e211,-5.324337589856317e211,-3.9276755904647336e211,-2.8973811828390837e211,-2.137350075207385e211,-1.5766877244341961e211,-1.163096401107935e211,-8.579969370635444e210,-6.329301193857865e210,-4.669020584114972e210,-3.4442590970458445e210,-2.5407728481522026e210,-1.8742860174033907e210,-1.382629729213567e210,-1.0199430344967175e210,-7.523950712459225e209,-5.550293732968071e209,-4.09435969207136e209,-3.0203412818467345e209,-2.228055702212248e209,-1.643599762052459e209,-1.212456302208534e209,-8.944089179773633e208,-6.5979063418637665e208,-4.8671661497350895e208,-3.590427796590301e208,-2.648599075096281e208,-1.9538276378271242e208,-1.4413062642175657e208,-1.0632277418201827e208,-7.843254824051766e207,-5.785839083703925e207,-4.2681175932035523e207,-3.148519605517927e207,-2.322610727060628e207,-1.7133514366570724e207,-1.2639109564476863e207,-9.323661635614801e206,-6.877910651218678e206,-5.073720687744371e206,-3.742799655689617e206,-2.761001270028151e206,-2.0367448739899196e206,-1.5024729350022781e206,-1.1083493810356988e206,-8.176109677745072e205,-6.031380592286674e205,-4.449249494295566e205,-3.2821376067372623e205,-2.42117851187497e205,-1.786063257778077e205,-1.3175492617082875e205,-9.71934252310647e204,-7.16979788360932e204,-5.289041061120615e204,-3.901637926247597e204,-2.8781736295139157e204,-2.123180981479831e204,-1.5662354188405865e204,-1.1553859085158965e204,-8.52309034477896e203,-6.287342479239255e203,-4.638068335795825e203,-3.4214261364866325e203,-2.5239293515983185e203,-1.8618608491723596e203,-1.3734638885536108e203,-1.0131815457633987e203,-7.4740723307734845e202,-5.513499277520279e202,-4.067217032146479e202,-3.0003185915029924e202,-2.213285295416785e202,-1.6327038777752681e202,-1.204418588973824e202,-8.884796301472675e201,-6.554166968305871e201,-4.834900338830676e201,-3.5666258426839116e201,-2.631040768211008e201,-1.9408751658624313e201,-1.4317514403332152e201,-1.0561793066095286e201,-7.79125968576339e200,-5.747483131994755e200,-4.2398230433680645e200,-3.127647185079419e200,-2.3072134884583217e200,-1.7019931489455543e200,-1.2555321358636953e200,-9.261852464935387e199,-6.832315050480117e199,-5.040085568815285e199,-3.717987585949366e199,-2.7426978174346574e199,-2.023242720386877e199,-1.492512620084154e199,-1.1010018218104055e199,-8.121907951179763e198,-5.991396876979592e198,-4.4197541702336766e198,-3.260379395054472e198,-2.405127839753527e198,-1.7742229429899895e198,-1.3088148577393904e198,-9.654910272733665e197,-7.12226728045743e197,-5.2539785229833996e197,-3.875772873016629e197,-2.8590934084522592e197,-2.109105818652569e197,-1.5558524045152412e197,-1.1477265309439711e197,-8.466588385953664e196,-6.245661920719758e196,-4.6073212786208905e196,-3.398744542033515e196,-2.507197515312044e196,-1.849518050870003e196,-1.3643588108247766e196,-1.0064648808372953e196,-7.424524606884139e195,-5.476948742848318e195,-4.040254308535001e195,-2.980428637195248e195,-2.1986128057950114e195,-1.6218802253741544e195,-1.196434159996871e195,-8.825896492308446e194,-6.510717555335118e194,-4.802848427045373e194,-3.5429816786123654e194,-2.6135988602715715e194,-1.9280085594707982e194,-1.4222599580589105e194,-1.049177597454734e194,-7.73960923784436e193,-5.709381452658224e193,-4.211716066047371e193,-3.1069131337761066e193,-2.2919183224736157e193,-1.6907101585122114e193,-1.2472088608338514e193,-9.200453044602379e192,-6.787021715780588e192,-5.006673426533208e192,-3.6933400023858325e192,-2.7245157035674103e192,-2.0098300763510275e192,-1.482618334890149e192,-1.0937029716180435e192,-8.068065543076989e191,-5.951678224946708e191,-4.390454378955804e191,-3.238765424665544e191,-2.3891835720438016e191,-1.7624611209727998e191,-1.3001383565865862e191,-9.590905161837932e190,-7.075051771018453e190,-5.2191484242556005e190,-3.850079286485362e190,-2.8401396755329544e190,-2.0951239640314103e190,-1.5455382221070656e190,-1.14011792953647e190,-8.410460994477302e189,-6.204257674325209e189,-4.576778052320726e189,-3.376213310238268e189,-2.4905765990662578e189,-1.8372570764430424e189,-1.3553140932126116e189,-9.997927425686905e188,-7.375305348766977e188,-5.4406405119322584e188,-4.0134703283881273e188,-2.9606705389787133e188,-2.1840375842262413e188,-1.6111283260035475e188,-1.1885026620412341e188,-8.767387146515786e187,-6.4675561807217384e187,-4.77100899638214e187,-3.519494258342749e187,-2.596272579636829e187,-1.9152272494254525e187,-1.4128313974854966e187,-1.0422223045957745e187,-7.688301195246321e186,-5.671532360051706e186,-4.1837954177708456e186,-3.0863165343203196e186,-2.2767245524385984e186,-1.6795019661903414e186,-1.2389407631309392e186,-9.13946065826464e185,-6.742028643312884e185,-4.9734827827227764e185,-3.668855814573549e185,-2.706454124037617e185,-1.9965063484980906e185,-1.4727896416905153e185,-1.0864525075528208e185,-8.014580071414238e184,-5.912222879009497e184,-4.3613488242204764e184,-3.2172947393546287e184,-2.3733450033613475e184,-1.7507772713760926e184,-1.2915193743959987e184,-9.527324358792843e183,-7.0281492664481e183,-5.184549224031408e183,-3.824556029953119e183,-2.821311592230753e183,-2.0812347990501776e183,-1.5352924153097799e183,-1.1325597676838134e183,-8.354705687236797e182,-6.16312790830425e182,-4.5464373056427134e182,-3.353831444304234e182,-2.474065867540586e182,-1.825077383457826e182,-1.3463293355728015e182,-9.931648357779275e181,-7.326412378930596e181,-5.4045729784727845e181,-3.986863906765476e181,-2.9410434227426764e181,-2.1695589858934903e181,-1.6004477039926464e181,-1.1806237442124475e181,-8.709265675603878e180,-6.424680934978958e180,-4.739380638244232e180,-3.49616254277659e180,-2.57906115978106e180,-1.9025306702727497e180,-1.4034653414871917e180,-1.0353131203258753e180,-7.637333288067395e179,-5.633934179706207e179,-4.156059863310465e179,-3.065856475504819e179,-2.261631506170794e179,-1.6683680761220728e179,-1.230727476969038e179,-9.078872607580065e178,-6.697333842554754e178,-4.940512169008718e178,-3.644533939316624e178,-2.6885122797896207e178,-1.983270947377953e178,-1.4630261056576739e178,-1.0792501088495769e178,-7.961449169960092e177,-5.8730290936382605e177,-4.332436218379366e177,-3.1959663892448976e177,-2.3576114329973665e177,-1.7391708772986024e177,-1.2829575298581314e177,-9.464165050741449e176,-6.98155769174842e176,-5.150179391619225e176,-3.799201974254082e176,-2.8026083255787447e176,-2.0674377092429876e176,-1.5251145308423503e176,-1.1250517110080964e176,-8.299319997581767e175,-6.1222708030497735e175,-4.5162976962931086e175,-3.331597954043564e175,-2.4576645902898653e175,-1.8129784330770636e175,-1.3374041404140087e175,-9.865808672421775e174,-7.277843534318789e174,-5.368744546819183e174,-3.960433866581965e174,-2.92154642017048e174,-2.155176370253953e174,-1.5898378868236394e174,-1.1727970579419537e174,-8.651529508240241e173,-6.382089921277429e173,-4.7079619533720815e173,-3.472985499703297e173,-2.5619638392596206e173,-1.889918260307922e173,-1.3941613757036989e173,-1.0284497389783133e173,-7.58670326145483e172,-5.5965852482545435e172,-4.12850817562783e172,-3.045532052163715e172,-2.246638515944327e172,-1.6573079957370947e172,-1.2225686389871231e172,-9.018686212094597e171,-6.6529353361796714e171,-4.907760126750028e171,-3.6203733005991415e171,-2.670689377064316e171,-1.9701232874476787e171,-1.4533272948463064e171,-1.0720954568694097e171,-7.908670488168183e170,-5.834095134873903e170,-4.3037152823195896e170,-3.1747794307559773e170,-2.3419821648886614e170,-1.727641425266045e170,-1.2744524441915157e170,-9.401424443475637e169,-6.935274985678797e169,-5.116037406476015e169,-3.774015997708854e169,-2.7840290481326316e169,-2.053732084217896e169,-1.5150041184286688e169,-1.1175934273480964e169,-8.244301475213926e168,-6.081684551017353e168,-4.486357890875575e168,-3.309511855831884e168,-2.4413720417106976e168,-1.8009596900351547e168,-1.3285381128796714e168,-9.800405456822998e167,-7.229596666213616e167,-5.333153631897843e167,-3.934179038555062e167,-2.902178668702283e167,-2.1408891010115314e167,-1.5792984051114418e167,-1.1650222569721555e167,-8.594176090140467e166,-6.339781255363874e166,-4.676751551783275e166,-3.4499621037558846e166,-2.5449798616762798e166,-1.877389461549899e166,-1.3849190885216308e166,-1.0216318569127147e166,-7.536408875503917e165,-5.559483913355184e165,-4.101139135817977e165,-3.0253423651310195e165,-2.231744918459352e165,-1.6463212357301054e165,-1.214463888232784e165,-8.95889880912213e164,-6.608831159968228e164,-4.875225206974606e164,-3.5963728295390215e164,-2.652984627365108e164,-1.9570627870463992e164,-1.4436927801748306e164,-1.0649882350860088e164,-7.856241691076381e163,-5.795419280253562e163,-4.275184745408843e163,-3.153732926563478e163,-2.3264565075864304e163,-1.7161884052081004e163,-1.266003741125731e163,-9.339099761310879e162,-6.8892991006615776e162,-5.082121758137679e162,-3.748996986073106e162,-2.76557293793284e162,-2.0401173176289496e162,-1.5049607307773752e162,-1.1101845867443913e162,-8.189647686077311e161,-6.041367356644244e161,-4.4566165648340087e161,-3.287572172566108e161,-2.425187501010332e161,-1.7890206226152345e161,-1.3197308607311467e161,-9.735435817503485e160,-7.181669640143235e160,-5.29779865914427e160,-3.908098261154637e160,-2.8829393114963935e160,-2.1266965460883105e160,-1.568828792582652e160,-1.157298997340893e160,-8.537202883951243e159,-6.297753065474817e159,-4.6457480527089195e159,-3.427091336364024e159,-2.5281084756485896e159,-1.8649437197163023e159,-1.3757380710560642e159,-1.0148591725014489e159,-7.486447905157619e158,-5.522628533621386e158,-4.073951533057114e158,-3.005286521202089e158,-2.216950054813609e158,-1.6354073100399216e158,-1.206412866146741e158,-8.899507753630293e157,-6.565019362723883e157,-4.842905970317103e157,-3.572531464340097e157,-2.6353972474225646e157,-1.9440888683692363e157,-1.4341221354061652e157,-1.0579281290711621e157,-7.804160459199882e156,-5.756999818731743e156,-4.246843345437223e156,-3.132825945556075e156,-2.3110337742252833e156,-1.7048113104355547e156,-1.2576110468845423e156,-9.27718824696184e155,-6.843628002694255e155,-5.048430946154283e155,-3.7241438324897903e155,-2.747239178469272e155,-2.026592807150297e155,-1.4949839235626733e155,-1.1028248614252056e155,-8.135356212253859e154,-6.001317436272369e154,-4.4270724023931525e154,-3.2657779336206383e154,-2.4091102521743527e154,-1.7771607026253365e154,-1.31098199432975e154,-9.670896880163245e153,-7.134060335784185e153,-5.262678064430986e153,-3.882190380549776e153,-2.8638274973908697e153,-2.1125980775962343e153,-1.5584285860546589e153,-1.1496269373660309e153,-8.480607369141559e152,-6.256003492256305e152,-4.614950084534423e152,-3.404372185710366e152,-2.5113489347758047e152,-1.8525804841996734e152,-1.3666179171330032e152,-1.0081313861166913e152,-7.436818140111134e151,-5.486017478547615e151,-4.046944164548332e151,-2.9853636330935813e151,-2.2022532704728815e151,-1.6245657358272218e151,-1.1984152165464304e151,-8.840510418119347e150,-6.521498006183631e150,-4.8108009869530276e150,-3.548848150244539e150,-2.617926459159316e150,-1.9312009574414112e150,-1.4246149371286292e150,-1.0509148264812724e150,-7.75242448843174e149,-5.718835050606942e149,-4.218689828563103e149,-3.1120575627957587e149,-2.2957132824937806e149,-1.693509637618568e149,-1.2492739901698692e149,-9.215687161424128e148,-6.798259671258293e148,-5.0149634800227916e148,-3.6994554374395224e148,-2.729026958644701e148,-2.0131579544486133e148,-1.4850732554039858e148,-1.0955139257914034e148,-8.08142465185271e147,-5.961533018066651e147,-4.397724096499639e147,-3.244128174803869e147,-2.3931395839345938e147,-1.765379405374723e147,-1.3022911266200464e147,-9.606785789558484e146,-7.086766646870448e146,-5.227790294000461e146,-3.856454250559302e146,-2.844842380867017e146,-2.098593071810176e146,-1.548097325415774e146,-1.1420057376308027e146,-8.424387041889695e145,-6.214530688680557e145,-4.584356284738006e145,-3.381803646685177e145,-2.4947004976047052e145,-1.8402992080422617e145,-1.3575582232707807e145,-1.0014482001167039e145,-7.387517384710696e144,-5.44964912843648e144,-4.0201158354677115e144,-2.9655728194036945e144,-2.1876539152416703e144,-1.6137960334538418e144,-1.1904705856107282e144,-8.781904192509505e143,-6.478265164934875e143,-4.778908836537419e143,-3.525321839487611e143,-2.600571489656684e143,-1.918398484093626e143,-1.4151707647377819e143,-1.0439480170433544e143,-7.701031489939569e142,-5.680923287445445e142,-4.190722949256919e142,-3.091426859475483e142,-2.2804943546031935e142,-1.6822828867636291e142,-1.240992202144786e142,-9.154593783848872e141,-6.753192099228575e141,-4.9817178791202746e141,-3.674930708691308e141,-2.7109354727384274e141,-1.9998121651574374e141,-1.475228287847026e141,-1.0882514564025248e141,-8.027850618907203e140,-5.922012341939031e140,-4.368570348765927e140,-3.2226219383168327e140,-2.3772747897386317e140,-1.753676209651383e140,-1.293657873112499e140,-9.543099709373618e139,-7.039786481099022e139,-5.193133804395453e139,-3.830888732600389e139,-2.825983122010671e139,-2.0846809091393782e139,-1.537834553604165e139,-1.134435060968271e139,-8.368539414971039e138,-6.173332819963201e138,-4.553965299829647e138,-3.3593847208413024e138,-2.4781624275978027e138,-1.82809934791257e138,-1.3485585886627564e138,-9.948093188330714e137,-7.338543457859413e137,-5.413521874329261e137,-3.9934653589130745e137,-2.945913204574364e137,-2.173151343235303e137,-1.6030977264612713e137,-1.1825786218640885e137,-8.723686484023919e136,-6.435318926329107e136,-4.747228108141175e136,-3.5019514912497017e136,-2.5833315711192923e136,-1.905680881935957e136,-1.4057892004171642e136,-1.0370273925411319e136,-7.649979190062984e135,-5.64326285200567e135,-4.162941470245355e135,-3.070932922879762e135,-2.2653763172584358e135,-1.671130561192113e135,-1.2327653164177033e135,-9.093905411426044e134,-6.708423292787327e134,-4.948692672640406e134,-3.650568561255698e134,-2.692963920371717e134,-1.986554848850529e134,-1.4654485853441426e134,-1.081037131962286e134,-7.974631743267909e133,-5.88275365946956e133,-4.3396098694108546e133,-3.201258272709344e133,-2.361515167717435e133,-1.7420505976981642e133,-1.2850818518662382e133,-9.47983582209416e132,-6.993117760036174e132,-5.1587070623898427e132,-3.805492695637543e132,-2.8072488864761805e132,-2.0708609741008825e132,-1.527639816588255e132,-1.1269145724468666e132,-8.313062017651394e131,-6.132408063484571e131,-4.523775785293029e131,-3.3371144163513395e131,-2.4617339931003193e131,-1.815980364080995e131,-1.3396186151593487e131,-9.882144485574463e130,-7.289894192919484e130,-5.377634117932244e130,-3.966991555849638e130,-2.926383918851173e130,-2.158744912850362e130,-1.5924703415493035e130,-1.1747389761607934e130,-8.665854717072503e129,-6.392657390396212e129,-4.715757400187834e129,-3.478736071611684e129,-2.5662059408421373e129,-1.8930475883335654e129,-1.3964698291203817e129,-1.030152646801817e129,-7.599265330216078e128,-5.60585207816623e128,-4.1353441624582786e128,-3.050574846343754e128,-2.2503585016278817e128,-1.6600521675180149e128,-1.2245929690259427e128,-9.033619359263296e127,-6.663951271332817e127,-4.915886399526117e127,-3.6263679173351103e127,-2.6751115064711576e127,-1.97338541901541e127,-1.4557337152348019e127,-1.0738706333041829e127,-7.921765670496423e126,-5.843755233828053e126,-4.310841377204327e126,-3.1800362328391965e126,-2.345860020655264e126,-1.7305020551905723e126,-1.276562683472682e126,-9.416991328885886e125,-6.946758419028286e125,-5.1245085449228785e125,-3.780265016134091e125,-2.7886388454490017e125,-2.0571326552919374e125,-1.5175126633463688e125,-1.1194439393553752e125,-8.257952395573856e124,-6.091754608706261e124,-4.493786405523979e124,-3.314991747962227e124,-2.4454144673074014e124,-1.8039417203956437e124,-1.330737907250192e124,-9.81663297528388e123,-7.241567437615122e123,-5.341984271548174e123,-3.9406932550594537e123,-2.906984098246053e123,-2.1444339867371703e123,-1.5819134085557354e123,-1.1669513016699788e123,-8.608406333141456e122,-6.350278669762964e122,-4.6844953203934485e122,-3.455674553508569e122,-2.5491938411764006e122,-1.880498044381475e122,-1.3872122385524967e122,-1.0233234756820926e122,-7.548887666784012e121,-5.568689310849645e121,-4.107929804972466e121,-3.030351729212632e121,-2.235440243313393e121,-1.6490472156258404e121,-1.2164747984194283e121,-8.97373296026564e120,-6.619774067394426e120,-4.883297608406942e120,-3.602327706277608e120,-2.6573774412345617e120,-1.9603032930282084e120,-1.44608324772703e120,-1.0667516433778002e120,-7.869250061764384e119,-5.805015339699591e119,-4.2822635994098775e119,-3.1589548798297955e119,-2.3303086559584156e119,-1.719030071213712e119,-1.2680999910381629e119,-9.354563449466676e118,-6.900706407107321e118,-5.090536739029435e118,-3.755204578000737e118,-2.7701521756085606e118,-2.0434953453626018e118,-1.5074526458465207e118,-1.112022831188027e118,-8.203208110653563e117,-6.051370657093477e117,-4.4639958337731895e117,-3.293015736952993e117,-2.429203128232948e117,-1.7919828842593354e117,-1.3219160720471744e117,-9.751555759188478e116,-7.193561053940226e116,-5.306570758005082e116,-3.9145692930889e116,-2.887712884498553e116,-2.1302179317712176e116,-1.5714264604348401e116,-1.159215253859753e116,-8.551338790676118e115,-6.308180889566618e115,-4.653440485702848e115,-3.43276591668348e115,-2.532294519495494e115,-1.868031694879527e115,-1.3780160191515543e115,-1.0165395770550684e115,-7.498843971026791e114,-5.531772905951364e114,-4.0806971849592395e114,-3.0102626768029544e114,-2.2206208823218248e114,-1.638115218649586e114,-1.2084104454451782e114,-8.91424356502106e113,-6.575889726544441e113,-4.85092485753395e113,-3.5784468645289023e113,-2.6397609400955583e113,-1.947307892126982e113,-1.4364967558777354e113,-1.0596798472342954e113,-7.817082593746384e112,-5.7665322632055296e112,-4.253875271727637e112,-3.138013281028083e112,-2.3148603856241874e112,-1.7076341382393932e112,-1.2596934001677646e112,-9.292549421987292e111,-6.854959686902872e111,-5.056790141775131e111,-3.7303102725479116e111,-2.751788059092937e111,-2.0299484409896934e111,-1.4974593190271993e111,-1.1046509196303219e111,-8.148826740968392e110,-6.011254422034413e110,-4.434402752086744e110,-3.271185411090876e110,-2.413099258676552e110,-1.7801033266052175e110,-1.313152719266447e110,-9.686909958228995e109,-7.145872918060502e109,-5.27139201058561e109,-3.88861851419655e109,-2.868569425037377e109,-2.116096119024851e109,-1.561009033237382e109,-1.1515304904824548e109,-8.49464956497222e108,-6.266362187374679e108,-4.62259152223045e108,-3.4100091476437943e108,-2.515507228162709e108,-1.8556479883085131e108,-1.368880764070976e108,-1.0098006507967083e108,-7.44913202897936e107,-5.495101230266058e107,-4.0536450976301e107,-2.990306800361701e107,-2.2058997630348044e107,-1.6272556929504444e107,-1.2003995533308611e107,-8.855148541679202e106,-6.532296307310476e106,-4.818766714715143e106,-3.5547243355846936e106,-2.6222612236885115e106,-1.934398641386954e106,-1.4269738155744393e106,-1.0526549320129224e106,-7.765260958520556e105,-5.72830430183016e105,-4.225675138239986e105,-3.117210509964446e105,-2.299514526211303e105,-1.6963137521043144e105,-1.2513425389485036e105,-9.230946502907557e104,-6.809516234550825e104,-5.023267260188954e104,-3.705580998435007e104,-2.73354568346142e104,-2.0164913428491656e104,-1.4875322407769888e104,-1.0973278785439965e104,-8.09480588065043e103,-5.971404128760186e103,-4.405005851247054e103,-3.2494998045878542e103,-2.397102146192811e103,-1.7683025218741253e103,-1.304447461211726e103,-9.622692712434204e102,-7.098500920222573e102,-5.23644647295966e102,-3.862839770303488e102,-2.8495528729437384e102,-2.1020679237399382e102,-1.5506606660895523e102,-1.143896671559147e102,-8.438336148061491e101,-6.224820713100523e101,-4.5919470651980177e101,-3.387403239615228e101,-2.498831224497343e101,-1.8433463768051888e101,-1.359806069161127e101,-1.0031063987725254e101,-7.399749641352386e100,-5.458672661414441e100,-4.026772346182852e100,-2.9704832170282425e100,-2.191276234180679e100,-1.6164681580961124e100,-1.1924417676695294e100,-8.796445275838753e99,-6.488991881092018e99,-4.78682175725389e99,-3.531159069945257e99,-2.6048775178146457e99,-1.9215749696944077e99,-1.4175140055160593e99,-1.0456765869268563e99,-7.713782863464e98,-5.69032976434357e98,-4.197661951354649e98,-3.096545646310744e98,-2.2842703988089458e98,-1.6850684119872184e98,-1.2430470379328395e98,-9.169751966873416e97,-6.7643740396026664e97,-4.989966611196501e97,-3.681015661623256e97,-2.715424241659743e97,-2.0031234555904625e97,-1.4776709719156525e97,-1.0900533839530692e97,-8.041143139782558e96,-5.931818014268551e96,-4.375803830716582e96,-3.227957958058666e96,-2.3812110830589814e96,-1.756579947990771e96,-1.2957999127567243e96,-9.558901180791321e95,-7.0514429646584e95,-5.2017325991138874e95,-3.8372319209412934e95,-2.8306623869129857e95,-2.088132725300163e95,-1.540380901172981e95,-1.1363134593647085e95,-8.382396048601693e94,-6.183554628922451e94,-4.561505758874943e94,-3.3649471924977824e94,-2.4822657707422032e94,-1.8311263161383013e94,-1.3507915329516324e94,-9.964565248244785e93,-7.350694623437723e93,-5.422485587773524e93,-4.0000777417495847e93,-2.9507910497942556e93,-2.1767496488050064e93,-1.6057521368390211e93,-1.184536736403562e93,-8.738131170428998e92,-6.445974532073048e92,-4.755088571884463e92,-3.5077500250678916e92,-2.5876090534077142e92,-1.90883630972192e92,-1.408116907194438e92,-1.0387445032495653e92,-7.662646031152484e91,-5.6526069707276506e91,-4.1698344717501146e91,-3.076017775840037e91,-2.2691273290070565e91,-1.673897620386983e91,-1.2348065301224403e91,-9.10896310659979e90,-6.719531104939063e90,-4.956886721555516e90,-3.6566131753260505e90,-2.6974229319835166e90,-1.9898441878095445e90,-1.4678750761742325e90,-1.082827114029161e90,-7.987836144290166e89,-5.892494327244014e89,-4.346795398578922e89,-3.206558918478267e89,-2.3654253662442834e89,-1.7449350863408515e89,-1.287209691328266e89,-9.495532541121708e88,-7.00469696949358e88,-5.1672488532840515e88,-3.81179383320214e88,-2.8118971312177946e88,-2.07428990720327e88,-1.5301692837041723e88,-1.1287805184129899e88,-8.326826791767106e87,-6.142562109202022e87,-4.531266256518009e87,-3.342640012821403e87,-2.465810134030897e87,-1.8189872656844594e87,-1.3418367566335777e87,-9.898507347578413e86,-7.301964805009428e86,-5.3865384084036e86,-3.973560103343956e86,-2.931229427465689e86,-2.1623193642421892e86,-1.595107155095411e86,-1.1766841098092613e86,-8.680203645596182e85,-6.403242357138205e85,-4.72356575471021e85,-3.484496165321305e85,-2.570455066499603e85,-1.896182097902876e85,-1.3987821048759452e85,-1.0318583743012416e85,-7.61184819925924e84,-5.615134252101444e84,-4.142191468320678e84,-3.055625990386053e84,-2.2540846468664283e84,-1.6628008831005595e84,-1.2266206509519084e84,-9.048577232747904e83,-6.674985446679378e83,-4.92402612779056e83,-3.6323724599618173e83,-2.679540958043078e83,-1.9766529520229566e83,-1.4581441201759626e83,-1.0756487490774145e83,-7.934882535837282e82,-5.8534313279812214e82,-4.317979271482264e82,-3.185301739139207e82,-2.3497442973783233e82,-1.733367421748252e82,-1.278676416889471e82,-9.432583989955478e81,-6.958260866654842e81,-5.132993709886924e81,-3.7865243816885672e81,-2.7932562756711107e81,-2.0605388570340287e81,-1.5200253619145622e81,-1.1212975154417773e81,-8.271625919137614e80,-6.10184134040399e80,-4.501227220312323e80,-3.320480713701933e80,-2.4494635863553397e80,-1.806928688404217e80,-1.332941344041864e80,-9.832887363281873e79,-7.2535580302288e79,-5.350829532978193e79,-3.947218257808368e79,-2.9117974846236285e79,-2.1479847420872247e79,-1.5845327419244932e79,-1.1688835404813118e79,-8.62266013858888e78,-6.3607934657884256e78,-4.692251911141301e78,-3.461396461939696e78,-2.5534147981868325e78,-1.8836117744067574e78,-1.3895091855828463e78,-1.0250178954350553e78,-7.561387120455754e77,-5.577909950647952e77,-4.1147317181218637e77,-3.035369387802923e77,-2.2391416868890702e77,-1.6517777092011102e77,-1.2184890382726523e77,-8.988591673807625e76,-6.630735094094864e76,-4.891383376127561e76,-3.608292443105519e76,-2.661777528728481e76,-1.9635491646420044e76,-1.448477673417012e76,-1.0685179715222892e76,-7.882279971722004e75,-5.814627288307808e75,-4.2893541745825e75,-3.1641854796101183e75,-2.3341671827204678e75,-1.721876442451956e75,-1.2701997119227196e75,-9.370052742408533e74,-6.912132601779347e74,-5.098965653452652e74,-3.761422448463583e74,-2.774738995589423e74,-2.046878966437083e74,-1.509948687030487e74,-1.1138641193981766e74,-8.216790988590892e73,-6.06139052101502e73,-4.471387321311357e73,-3.2984683147978305e73,-2.433225404533824e73,-1.7949500508182618e73,-1.3241049016376459e73,-9.767702392284597e72,-7.205472157548805e72,-5.315357381713549e72,-3.921051039762531e72,-2.8924943615863503e72,-2.133745148167091e72,-1.5740284295073411e72,-1.1611346833175464e72,-8.565498103645597e71,-6.318625980057109e71,-4.661145655832904e71,-3.43844989297724e71,-2.5364874945969065e71,-1.871124783114319e71,-1.3802977390751916e71,-1.0182227640237949e71,-7.51126056231103e70,-5.540932419539831e70,-4.0874540063167914e70,-3.0152470719256144e70,-2.2242977879887008e70,-1.6408276110162428e70,-1.210411332336866e70,-8.929003775979011e69,-6.586778089521294e69,-4.858957022430064e69,-3.584372059441629e69,-2.6441318581740436e69,-1.9505322459466e69,-1.4388753082476043e69,-1.0614344658936332e69,-7.830026124772639e68,-5.776080491507787e68,-4.2609188414867013e68,-3.1432092056940156e68,-2.318693333129086e68,-1.710461640083605e68,-1.2617792014130992e68,-9.307936032057752e67,-6.866310134122613e67,-5.0651631785582914e67,-3.7364869230016334e67,-2.7563444717562013e67,-2.0333096310899762e67,-1.4999388132532873e67,-1.1064800014239379e67,-8.162319574194136e66,-6.021207861464687e66,-4.4417452393786726e66,-3.27660184226623e66,-2.41709487017861e66,-1.783050822984018e66,-1.3153270384910683e66,-9.702949550761019e65,-7.157705059619115e65,-5.2801203852985925e65,-3.895057291551787e65,-2.873319204371201e65,-2.1195999525129406e65,-1.5635937531263764e65,-1.1534371955034764e65,-8.508715011880677e64,-6.276738034427761e64,-4.630245612624423e64,-3.415655443262782e64,-2.5196724068548897e64,-1.8587205715929334e64,-1.3711473578326274e64,-1.0114726794464503e64,-7.461466307193701e63,-5.504200022867181e63,-4.060357126121723e63,-2.9952581525297672e63,-2.2095522934617553e63,-1.629950104106622e63,-1.2023871757815779e63,-8.869810903054658e62,-6.543112488272155e62,-4.8267456321352e62,-3.560610250716896e62,-2.626603165723882e62,-1.9376016200598368e62,-1.4293365998528494e62,-1.0543979188125436e62,-7.778118683245631e61,-5.737789232246257e61,-4.2326720141975755e61,-3.12237198938688e61,-2.3033220640309935e61,-1.6991225096449554e61,-1.2534145128317764e61,-9.246231110819676e60,-6.820791436469018e60,-5.031584789760336e60,-3.711716702138831e60,-2.738071890385966e60,-2.0198302506766486e60,-1.4899952977397555e60,-1.0991448348408726e60,-8.108209266096493e59,-5.981291584046135e59,-4.412299663129384e59,-3.254880328720238e59,-2.40107126966442e59,-1.7712304784718964e59,-1.3066073662637488e59,-9.638625974004082e58,-7.110254623192821e58,-5.245116984826106e58,-3.869235863195786e58,-2.8542711646567367e58,-2.1055485293321644e58,-1.553228251144765e58,-1.1457907364972607e58,-8.452308351173401e57,-6.2351277757503846e57,-4.5995504144778184e57,-3.3930121043553124e57,-2.502968791050564e57,-1.846398591072363e57,-1.3620576370363283e57,-1.0047673430748834e57,-7.4120021521737015e56,-5.467711135565004e56,-4.033439878753145e56,-2.9754017452926528e56,-2.194904550957951e56,-1.619144707244257e56,-1.1944162136129787e56,-8.811010436304071e55,-6.499736358553369e55,-4.7947477801900846e55,-3.537005965693428e55,-2.609190675897301e55,-1.924756714922432e55,-1.4198611262340963e55,-1.0474080189776245e55,-7.726555350721957e54,-5.699751816492964e54,-4.204612443057084e54,-3.101672908836957e54,-2.2880526953914642e54,-1.6878585494855163e54,-1.2451052761194984e54,-9.184935248828535e53,-6.775574495041832e53,-4.998229001529066e53,-3.687110690024575e53,-2.7199204430878153e53,-2.0064402288605307e53,-1.480117700582289e53,-1.0918582951365275e53,-8.0544576704235e52,-5.941639922837338e52,-4.3830492898720836e52,-3.233302813185994e52,-2.3851538940967658e52,-1.759488494342182e52,-1.2979454991917454e52,-9.574728816296853e51,-7.063118749031706e51,-5.210345631722852e51,-3.843585612338051e51,-2.835349399745559e51,-2.0915902569806792e51,-1.5429314649859695e51,-1.138194968014589e51,-8.396275626056477e50,-6.193793363160124e50,-4.569058703417664e50,-3.3705188744987687e50,-2.4863759082050863e50,-1.8341582964201631e50,-1.3530281745512424e50,-9.981064582607463e49,-7.362865908924705e49,-5.431464143341238e49,-4.006701073374561e49,-2.955676971753925e49,-2.1803539124516503e49,-1.608410942391399e49,-1.18649809319051e49,-8.7525997743563e48,-6.456647781376704e48,-4.7629620509893156e48,-3.513558160102632e48,-2.5918936183544475e48,-1.911996962267526e48,-1.410448468190301e48,-1.0404644571511695e48,-7.675333846006316e47,-5.661966561448025e47,-4.176738886691644e47,-3.081111048303442e47,-2.272884551683585e47,-1.6766692612804263e47,-1.236851123670292e47,-9.124045734315994e46,-6.7306573094145e46,-4.965094338182972e46,-3.662667798072919e46,-2.7018893268299376e46,-1.993138973258393e46,-1.4703055847895982e46,-1.0846200599496399e46,-8.001062409169209e45,-5.902251123623231e45,-4.353992825551457e45,-3.211868341060343e45,-2.369342039280721e45,-1.7478243511219493e45,-1.2893410540684364e45,-9.511255250787598e44,-7.016295351814201e44,-5.17580478768167e44,-3.818105404194777e44,-2.816553072526342e44,-2.0777245179355152e44,-1.5327029391135523e44,-1.1306495540137808e44,-8.340614357606135e43,-6.152732967995996e43,-4.538769130470867e43,-3.34817475857806e43,-2.469893024238583e43,-1.821999146117779e43,-1.3440585709080678e43],"x":[-709.0895,-708.7852594905095,-708.481018981019,-708.1767784715285,-707.872537962038,-707.5682974525474,-707.264056943057,-706.9598164335664,-706.655575924076,-706.3513354145854,-706.0470949050949,-705.7428543956044,-705.4386138861139,-705.1343733766233,-704.8301328671329,-704.5258923576423,-704.2216518481519,-703.9174113386614,-703.6131708291708,-703.3089303196804,-703.0046898101898,-702.7004493006993,-702.3962087912088,-702.0919682817183,-701.7877277722278,-701.4834872627373,-701.1792467532467,-700.8750062437563,-700.5707657342657,-700.2665252247753,-699.9622847152847,-699.6580442057942,-699.3538036963037,-699.0495631868132,-698.7453226773226,-698.4410821678322,-698.1368416583416,-697.8326011488512,-697.5283606393606,-697.2241201298701,-696.9198796203797,-696.6156391108891,-696.3113986013987,-696.0071580919081,-695.7029175824176,-695.3986770729271,-695.0944365634366,-694.790196053946,-694.4859555444556,-694.181715034965,-693.8774745254746,-693.573234015984,-693.2689935064935,-692.964752997003,-692.6605124875125,-692.3562719780219,-692.0520314685315,-691.7477909590409,-691.4435504495505,-691.1393099400599,-690.8350694305694,-690.5308289210789,-690.2265884115884,-689.922347902098,-689.6181073926074,-689.3138668831169,-689.0096263736264,-688.7053858641359,-688.4011453546453,-688.0969048451549,-687.7926643356643,-687.4884238261739,-687.1841833166833,-686.8799428071928,-686.5757022977023,-686.2714617882118,-685.9672212787212,-685.6629807692308,-685.3587402597402,-685.0544997502498,-684.7502592407592,-684.4460187312687,-684.1417782217782,-683.8375377122877,-683.5332972027973,-683.2290566933067,-682.9248161838162,-682.6205756743257,-682.3163351648352,-682.0120946553446,-681.7078541458542,-681.4036136363636,-681.0993731268732,-680.7951326173826,-680.4908921078921,-680.1866515984016,-679.8824110889111,-679.5781705794205,-679.2739300699301,-678.9696895604395,-678.6654490509491,-678.3612085414585,-678.056968031968,-677.7527275224775,-677.448487012987,-677.1442465034964,-676.840005994006,-676.5357654845155,-676.231524975025,-675.9272844655345,-675.623043956044,-675.3188034465535,-675.0145629370629,-674.7103224275725,-674.4060819180819,-674.1018414085914,-673.7976008991009,-673.4933603896104,-673.1891198801198,-672.8848793706294,-672.5806388611388,-672.2763983516484,-671.9721578421578,-671.6679173326673,-671.3636768231768,-671.0594363136863,-670.7551958041958,-670.4509552947053,-670.1467147852148,-669.8424742757243,-669.5382337662338,-669.2339932567432,-668.9297527472528,-668.6255122377622,-668.3212717282718,-668.0170312187812,-667.7127907092907,-667.4085501998002,-667.1043096903097,-666.8000691808192,-666.4958286713287,-666.1915881618381,-665.8873476523477,-665.5831071428571,-665.2788666333666,-664.9746261238761,-664.6703856143856,-664.366145104895,-664.0619045954046,-663.757664085914,-663.4534235764236,-663.1491830669331,-662.8449425574426,-662.5407020479521,-662.2364615384615,-661.9322210289711,-661.6279805194805,-661.32374000999,-661.0194995004995,-660.715258991009,-660.4110184815185,-660.106777972028,-659.8025374625374,-659.498296953047,-659.1940564435564,-658.889815934066,-658.5855754245754,-658.2813349150849,-657.9770944055944,-657.6728538961039,-657.3686133866133,-657.0643728771229,-656.7601323676324,-656.4558918581419,-656.1516513486514,-655.8474108391608,-655.5431703296704,-655.2389298201798,-654.9346893106894,-654.6304488011988,-654.3262082917083,-654.0219677822178,-653.7177272727273,-653.4134867632367,-653.1092462537463,-652.8050057442557,-652.5007652347653,-652.1965247252747,-651.8922842157842,-651.5880437062937,-651.2838031968032,-650.9795626873126,-650.6753221778222,-650.3710816683316,-650.0668411588412,-649.7626006493507,-649.4583601398601,-649.1541196303697,-648.8498791208791,-648.5456386113887,-648.2413981018981,-647.9371575924076,-647.6329170829171,-647.3286765734266,-647.024436063936,-646.7201955544456,-646.415955044955,-646.1117145354646,-645.807474025974,-645.5032335164835,-645.198993006993,-644.8947524975025,-644.5905119880119,-644.2862714785215,-643.9820309690309,-643.6777904595405,-643.37354995005,-643.0693094405594,-642.765068931069,-642.4608284215784,-642.156587912088,-641.8523474025974,-641.5481068931069,-641.2438663836164,-640.9396258741259,-640.6353853646353,-640.3311448551449,-640.0269043456543,-639.7226638361639,-639.4184233266733,-639.1141828171828,-638.8099423076923,-638.5057017982018,-638.2014612887112,-637.8972207792208,-637.5929802697302,-637.2887397602398,-636.9844992507492,-636.6802587412587,-636.3760182317683,-636.0717777222777,-635.7675372127873,-635.4632967032967,-635.1590561938062,-634.8548156843157,-634.5505751748252,-634.2463346653346,-633.9420941558442,-633.6378536463536,-633.3336131368632,-633.0293726273726,-632.7251321178821,-632.4208916083916,-632.1166510989011,-631.8124105894105,-631.5081700799201,-631.2039295704295,-630.8996890609391,-630.5954485514485,-630.291208041958,-629.9869675324676,-629.682727022977,-629.3784865134866,-629.074246003996,-628.7700054945055,-628.465764985015,-628.1615244755245,-627.857283966034,-627.5530434565435,-627.2488029470529,-626.9445624375625,-626.6403219280719,-626.3360814185814,-626.0318409090909,-625.7276003996004,-625.4233598901099,-625.1191193806194,-624.8148788711288,-624.5106383616384,-624.2063978521478,-623.9021573426573,-623.5979168331668,-623.2936763236763,-622.9894358141859,-622.6851953046953,-622.3809547952048,-622.0767142857143,-621.7724737762238,-621.4682332667333,-621.1639927572428,-620.8597522477522,-620.5555117382618,-620.2512712287712,-619.9470307192807,-619.6427902097902,-619.3385497002997,-619.0343091908092,-618.7300686813187,-618.4258281718281,-618.1215876623377,-617.8173471528471,-617.5131066433567,-617.2088661338661,-616.9046256243756,-616.6003851148852,-616.2961446053946,-615.9919040959041,-615.6876635864136,-615.3834230769231,-615.0791825674326,-614.7749420579421,-614.4707015484515,-614.1664610389611,-613.8622205294705,-613.55798001998,-613.2537395104895,-612.949499000999,-612.6452584915085,-612.341017982018,-612.0367774725274,-611.732536963037,-611.4282964535464,-611.124055944056,-610.8198154345654,-610.5155749250749,-610.2113344155844,-609.9070939060939,-609.6028533966035,-609.2986128871129,-608.9943723776224,-608.6901318681319,-608.3858913586414,-608.0816508491508,-607.7774103396604,-607.4731698301698,-607.1689293206794,-606.8646888111888,-606.5604483016983,-606.2562077922078,-605.9519672827173,-605.6477267732267,-605.3434862637363,-605.0392457542457,-604.7350052447553,-604.4307647352647,-604.1265242257742,-603.8222837162837,-603.5180432067932,-603.2138026973028,-602.9095621878122,-602.6053216783217,-602.3010811688312,-601.9968406593407,-601.6926001498501,-601.3883596403597,-601.0841191308691,-600.7798786213787,-600.4756381118881,-600.1713976023976,-599.8671570929071,-599.5629165834166,-599.258676073926,-598.9544355644356,-598.650195054945,-598.3459545454546,-598.041714035964,-597.7374735264735,-597.433233016983,-597.1289925074925,-596.824751998002,-596.5205114885115,-596.216270979021,-595.9120304695305,-595.60778996004,-595.3035494505494,-594.999308941059,-594.6950684315684,-594.390827922078,-594.0865874125874,-593.7823469030969,-593.4781063936064,-593.1738658841159,-592.8696253746253,-592.5653848651349,-592.2611443556443,-591.9569038461539,-591.6526633366633,-591.3484228271728,-591.0441823176823,-590.7399418081918,-590.4357012987012,-590.1314607892108,-589.8272202797203,-589.5229797702298,-589.2187392607393,-588.9144987512487,-588.6102582417583,-588.3060177322677,-588.0017772227773,-587.6975367132867,-587.3932962037962,-587.0890556943057,-586.7848151848152,-586.4805746753246,-586.1763341658342,-585.8720936563436,-585.5678531468532,-585.2636126373626,-584.9593721278721,-584.6551316183816,-584.3508911088911,-584.0466505994006,-583.7424100899101,-583.4381695804195,-583.1339290709291,-582.8296885614386,-582.525448051948,-582.2212075424576,-581.916967032967,-581.6127265234766,-581.308486013986,-581.0042455044955,-580.700004995005,-580.3957644855145,-580.091523976024,-579.7872834665335,-579.4830429570429,-579.1788024475525,-578.8745619380619,-578.5703214285714,-578.2660809190809,-577.9618404095904,-577.6575999000999,-577.3533593906094,-577.0491188811188,-576.7448783716284,-576.4406378621378,-576.1363973526474,-575.8321568431569,-575.5279163336663,-575.2236758241759,-574.9194353146853,-574.6151948051948,-574.3109542957043,-574.0067137862138,-573.7024732767233,-573.3982327672328,-573.0939922577422,-572.7897517482518,-572.4855112387612,-572.1812707292708,-571.8770302197802,-571.5727897102897,-571.2685492007992,-570.9643086913087,-570.6600681818181,-570.3558276723277,-570.0515871628371,-569.7473466533467,-569.4431061438562,-569.1388656343656,-568.8346251248752,-568.5303846153846,-568.2261441058942,-567.9219035964036,-567.6176630869131,-567.3134225774226,-567.0091820679321,-566.7049415584415,-566.4007010489511,-566.0964605394605,-565.79222002997,-565.4879795204795,-565.183739010989,-564.8794985014985,-564.575257992008,-564.2710174825174,-563.966776973027,-563.6625364635364,-563.358295954046,-563.0540554445554,-562.7498149350649,-562.4455744255745,-562.1413339160839,-561.8370934065935,-561.5328528971029,-561.2286123876124,-560.9243718781219,-560.6201313686314,-560.3158908591408,-560.0116503496504,-559.7074098401598,-559.4031693306694,-559.0989288211788,-558.7946883116883,-558.4904478021978,-558.1862072927073,-557.8819667832167,-557.5777262737263,-557.2734857642357,-556.9692452547453,-556.6650047452547,-556.3607642357642,-556.0565237262738,-555.7522832167832,-555.4480427072928,-555.1438021978022,-554.8395616883117,-554.5353211788212,-554.2310806693307,-553.9268401598401,-553.6225996503497,-553.3183591408591,-553.0141186313687,-552.7098781218781,-552.4056376123876,-552.1013971028971,-551.7971565934066,-551.492916083916,-551.1886755744256,-550.884435064935,-550.5801945554446,-550.275954045954,-549.9717135364635,-549.667473026973,-549.3632325174825,-549.0589920079921,-548.7547514985015,-548.450510989011,-548.1462704795205,-547.84202997003,-547.5377894605394,-547.233548951049,-546.9293084415584,-546.625067932068,-546.3208274225774,-546.0165869130869,-545.7123464035964,-545.4081058941059,-545.1038653846153,-544.7996248751249,-544.4953843656343,-544.1911438561439,-543.8869033466533,-543.5826628371628,-543.2784223276723,-542.9741818181818,-542.6699413086914,-542.3657007992008,-542.0614602897103,-541.7572197802198,-541.4529792707293,-541.1487387612387,-540.8444982517483,-540.5402577422577,-540.2360172327673,-539.9317767232767,-539.6275362137862,-539.3232957042957,-539.0190551948052,-538.7148146853146,-538.4105741758242,-538.1063336663336,-537.8020931568432,-537.4978526473526,-537.1936121378621,-536.8893716283716,-536.5851311188811,-536.2808906093906,-535.9766500999001,-535.6724095904096,-535.3681690809191,-535.0639285714286,-534.759688061938,-534.4554475524476,-534.151207042957,-533.8469665334666,-533.542726023976,-533.2384855144855,-532.934245004995,-532.6300044955045,-532.325763986014,-532.0215234765235,-531.7172829670329,-531.4130424575425,-531.1088019480519,-530.8045614385614,-530.5003209290709,-530.1960804195804,-529.8918399100899,-529.5875994005994,-529.283358891109,-528.9791183816184,-528.6748778721279,-528.3706373626374,-528.0663968531469,-527.7621563436563,-527.4579158341659,-527.1536753246753,-526.8494348151848,-526.5451943056943,-526.2409537962038,-525.9367132867133,-525.6324727772228,-525.3282322677322,-525.0239917582418,-524.7197512487512,-524.4155107392608,-524.1112702297702,-523.8070297202797,-523.5027892107892,-523.1985487012987,-522.8943081918081,-522.5900676823177,-522.2858271728272,-521.9815866633367,-521.6773461538462,-521.3731056443556,-521.0688651348652,-520.7646246253746,-520.4603841158842,-520.1561436063936,-519.8519030969031,-519.5476625874126,-519.2434220779221,-518.9391815684315,-518.6349410589411,-518.3307005494505,-518.02646003996,-517.7222195304695,-517.417979020979,-517.1137385114885,-516.809498001998,-516.5052574925074,-516.201016983017,-515.8967764735265,-515.592535964036,-515.2882954545455,-514.9840549450549,-514.6798144355645,-514.3755739260739,-514.0713334165835,-513.7670929070929,-513.4628523976024,-513.1586118881119,-512.8543713786214,-512.5501308691308,-512.2458903596404,-511.9416498501499,-511.63740934065936,-511.33316883116885,-511.02892832167834,-510.7246878121878,-510.4204473026973,-510.1162067932068,-509.8119662837163,-509.5077257742258,-509.20348526473526,-508.89924475524475,-508.59500424575424,-508.2907637362637,-507.9865232267732,-507.6822827172827,-507.3780422077922,-507.0738016983017,-506.76956118881117,-506.46532067932066,-506.16108016983014,-505.8568396603397,-505.5525991508492,-505.24835864135866,-504.94411813186815,-504.63987762237764,-504.3356371128871,-504.0313966033966,-503.7271560939061,-503.4229155844156,-503.1186750749251,-502.81443456543457,-502.51019405594405,-502.20595354645354,-501.90171303696303,-501.5974725274725,-501.293232017982,-500.9889915084915,-500.684750999001,-500.38051048951047,-500.07626998001996,-499.77202947052945,-499.46778896103893,-499.1635484515485,-498.85930794205797,-498.55506743256745,-498.25082692307694,-497.94658641358643,-497.6423459040959,-497.3381053946054,-497.0338648851149,-496.7296243756244,-496.42538386613387,-496.12114335664336,-495.81690284715285,-495.51266233766233,-495.2084218281718,-494.9041813186813,-494.5999408091908,-494.2957002997003,-493.9914597902098,-493.68721928071926,-493.38297877122875,-493.07873826173824,-492.7744977522477,-492.47025724275727,-492.16601673326676,-491.86177622377625,-491.55753571428573,-491.2532952047952,-490.9490546953047,-490.6448141858142,-490.3405736763237,-490.0363331668332,-489.73209265734266,-489.42785214785215,-489.12361163836164,-488.8193711288711,-488.5151306193806,-488.2108901098901,-487.9066496003996,-487.6024090909091,-487.29816858141857,-486.99392807192805,-486.68968756243754,-486.38544705294703,-486.0812065434565,-485.77696603396606,-485.47272552447555,-485.16848501498504,-484.8642445054945,-484.560003996004,-484.2557634865135,-483.951522977023,-483.6472824675325,-483.34304195804197,-483.03880144855145,-482.73456093906094,-482.43032042957043,-482.1260799200799,-481.8218394105894,-481.5175989010989,-481.2133583916084,-480.90911788211787,-480.60487737262736,-480.30063686313684,-479.99639635364633,-479.6921558441558,-479.3879153346653,-479.08367482517485,-478.77943431568434,-478.47519380619383,-478.1709532967033,-477.8667127872128,-477.5624722777223,-477.2582317682318,-476.95399125874127,-476.64975074925076,-476.34551023976024,-476.04126973026973,-475.7370292207792,-475.4327887112887,-475.1285482017982,-474.8243076923077,-474.5200671828172,-474.21582667332666,-473.91158616383615,-473.60734565434564,-473.3031051448551,-472.9988646353646,-472.6946241258741,-472.39038361638364,-472.08614310689313,-471.7819025974026,-471.4776620879121,-471.1734215784216,-470.8691810689311,-470.5649405594406,-470.26070004995006,-469.95645954045955,-469.65221903096904,-469.3479785214785,-469.043738011988,-468.7394975024975,-468.435256993007,-468.1310164835165,-467.82677597402596,-467.52253546453545,-467.21829495504494,-466.9140544455544,-466.6098139360639,-466.3055734265734,-466.0013329170829,-465.69709240759244,-465.3928518981019,-465.0886113886114,-464.7843708791209,-464.4801303696304,-464.1758898601399,-463.87164935064936,-463.56740884115885,-463.26316833166834,-462.9589278221778,-462.6546873126873,-462.3504468031968,-462.0462062937063,-461.7419657842158,-461.43772527472527,-461.13348476523475,-460.82924425574424,-460.52500374625373,-460.2207632367632,-459.9165227272727,-459.6122822177822,-459.3080417082917,-459.0038011988012,-458.6995606893107,-458.3953201798202,-458.0910796703297,-457.7868391608392,-457.48259865134867,-457.17835814185815,-456.87411763236764,-456.56987712287713,-456.2656366133866,-455.9613961038961,-455.6571555944056,-455.3529150849151,-455.04867457542457,-454.74443406593406,-454.44019355644355,-454.13595304695303,-453.8317125374625,-453.527472027972,-453.2232315184815,-452.918991008991,-452.6147504995005,-452.31050999000996,-452.0062694805195,-451.702028971029,-451.3977884615385,-451.09354795204797,-450.78930744255746,-450.48506693306695,-450.18082642357643,-449.8765859140859,-449.5723454045954,-449.2681048951049,-448.9638643856144,-448.6596238761239,-448.35538336663336,-448.05114285714285,-447.74690234765234,-447.4426618381618,-447.1384213286713,-446.8341808191808,-446.5299403096903,-446.2256998001998,-445.92145929070927,-445.61721878121875,-445.3129782717283,-445.0087377622378,-444.7044972527473,-444.40025674325676,-444.09601623376625,-443.79177572427574,-443.4875352147852,-443.1832947052947,-442.8790541958042,-442.5748136863137,-442.2705731768232,-441.96633266733267,-441.66209215784215,-441.35785164835164,-441.05361113886113,-440.7493706293706,-440.4451301198801,-440.1408896103896,-439.8366491008991,-439.53240859140857,-439.22816808191806,-438.92392757242754,-438.6196870629371,-438.3154465534466,-438.01120604395607,-437.70696553446555,-437.40272502497504,-437.09848451548453,-436.794244005994,-436.4900034965035,-436.185762987013,-435.8815224775225,-435.57728196803197,-435.27304145854146,-434.96880094905094,-434.66456043956043,-434.3603199300699,-434.0560794205794,-433.7518389110889,-433.4475984015984,-433.1433578921079,-432.83911738261736,-432.53487687312685,-432.23063636363634,-431.9263958541459,-431.62215534465537,-431.31791483516486,-431.01367432567434,-430.70943381618383,-430.4051933066933,-430.1009527972028,-429.7967122877123,-429.4924717782218,-429.1882312687313,-428.88399075924076,-428.57975024975025,-428.27550974025974,-427.9712692307692,-427.6670287212787,-427.3627882117882,-427.0585477022977,-426.7543071928072,-426.45006668331666,-426.14582617382615,-425.84158566433564,-425.5373451548451,-425.2331046453547,-424.92886413586416,-424.62462362637365,-424.32038311688314,-424.0161426073926,-423.7119020979021,-423.4076615884116,-423.1034210789211,-422.7991805694306,-422.49494005994006,-422.19069955044955,-421.88645904095904,-421.5822185314685,-421.277978021978,-420.9737375124875,-420.669497002997,-420.3652564935065,-420.06101598401597,-419.75677547452545,-419.45253496503494,-419.14829445554443,-418.8440539460539,-418.53981343656346,-418.23557292707295,-417.93133241758244,-417.6270919080919,-417.3228513986014,-417.0186108891109,-416.7143703796204,-416.4101298701299,-416.10588936063937,-415.80164885114885,-415.49740834165834,-415.19316783216783,-414.8889273226773,-414.5846868131868,-414.2804463036963,-413.9762057942058,-413.67196528471527,-413.36772477522476,-413.06348426573425,-412.75924375624373,-412.4550032467532,-412.1507627372627,-411.84652222777225,-411.54228171828174,-411.23804120879123,-410.9338006993007,-410.6295601898102,-410.3253196803197,-410.0210791708292,-409.71683866133867,-409.41259815184816,-409.10835764235765,-408.80411713286713,-408.4998766233766,-408.1956361138861,-407.8913956043956,-407.5871550949051,-407.2829145854146,-406.97867407592406,-406.67443356643355,-406.37019305694304,-406.0659525474525,-405.761712037962,-405.4574715284715,-405.15323101898105,-404.84899050949053,-404.54475,-404.2405094905095,-403.936268981019,-403.6320284715285,-403.327787962038,-403.02354745254746,-402.71930694305695,-402.41506643356644,-402.1108259240759,-401.8065854145854,-401.5023449050949,-401.1981043956044,-400.8938638861139,-400.58962337662336,-400.28538286713285,-399.98114235764234,-399.67690184815183,-399.3726613386613,-399.0684208291708,-398.7641803196803,-398.45993981018984,-398.1556993006993,-397.8514587912088,-397.5472182817183,-397.2429777722278,-396.9387372627373,-396.63449675324676,-396.33025624375625,-396.02601573426574,-395.72177522477523,-395.4175347152847,-395.1132942057942,-394.8090536963037,-394.5048131868132,-394.20057267732267,-393.89633216783216,-393.59209165834164,-393.28785114885113,-392.9836106393606,-392.6793701298701,-392.3751296203796,-392.0708891108891,-391.76664860139863,-391.4624080919081,-391.1581675824176,-390.8539270729271,-390.5496865634366,-390.24544605394607,-389.94120554445556,-389.63696503496504,-389.33272452547453,-389.028484015984,-388.7242435064935,-388.420002997003,-388.1157624875125,-387.811521978022,-387.50728146853146,-387.20304095904095,-386.89880044955044,-386.5945599400599,-386.2903194305694,-385.9860789210789,-385.6818384115884,-385.3775979020979,-385.0733573926074,-384.7691168831169,-384.4648763736264,-384.1606358641359,-383.8563953546454,-383.55215484515486,-383.24791433566435,-382.94367382617384,-382.6394333166833,-382.3351928071928,-382.0309522977023,-381.7267117882118,-381.4224712787213,-381.11823076923076,-380.81399025974025,-380.50974975024974,-380.2055092407592,-379.9012687312687,-379.5970282217782,-379.2927877122877,-378.9885472027972,-378.68430669330667,-378.3800661838162,-378.0758256743257,-377.7715851648352,-377.4673446553447,-377.16310414585416,-376.85886363636365,-376.55462312687314,-376.2503826173826,-375.9461421078921,-375.6419015984016,-375.3376610889111,-375.0334205794206,-374.72918006993007,-374.42493956043955,-374.12069905094904,-373.81645854145853,-373.512218031968,-373.2079775224775,-372.903737012987,-372.5994965034965,-372.29525599400597,-371.99101548451546,-371.686774975025,-371.3825344655345,-371.078293956044,-370.77405344655347,-370.46981293706295,-370.16557242757244,-369.86133191808193,-369.5570914085914,-369.2528508991009,-368.9486103896104,-368.6443698801199,-368.34012937062937,-368.03588886113886,-367.73164835164835,-367.42740784215783,-367.1231673326673,-366.8189268231768,-366.5146863136863,-366.2104458041958,-365.9062052947053,-365.60196478521476,-365.29772427572425,-364.9934837662338,-364.6892432567433,-364.38500274725277,-364.08076223776226,-363.77652172827175,-363.47228121878123,-363.1680407092907,-362.8638001998002,-362.5595596903097,-362.2553191808192,-361.9510786713287,-361.64683816183816,-361.34259765234765,-361.03835714285714,-360.7341166333666,-360.4298761238761,-360.1256356143856,-359.8213951048951,-359.5171545954046,-359.21291408591406,-358.90867357642355,-358.60443306693304,-358.3001925574426,-357.9959520479521,-357.69171153846156,-357.38747102897105,-357.08323051948054,-356.77899000999,-356.4747495004995,-356.170508991009,-355.8662684815185,-355.562027972028,-355.25778746253746,-354.95354695304695,-354.64930644355644,-354.34506593406593,-354.0408254245754,-353.7365849150849,-353.4323444055944,-353.1281038961039,-352.82386338661337,-352.51962287712286,-352.21538236763234,-351.91114185814183,-351.6069013486514,-351.30266083916086,-350.99842032967035,-350.69417982017984,-350.38993931068933,-350.0856988011988,-349.7814582917083,-349.4772177822178,-349.1729772727273,-348.86873676323677,-348.56449625374626,-348.26025574425574,-347.95601523476523,-347.6517747252747,-347.3475342157842,-347.0432937062937,-346.7390531968032,-346.4348126873127,-346.13057217782216,-345.82633166833165,-345.52209115884114,-345.2178506493506,-344.91361013986017,-344.60936963036966,-344.30512912087914,-344.00088861138863,-343.6966481018981,-343.3924075924076,-343.0881670829171,-342.7839265734266,-342.4796860639361,-342.17544555444556,-341.87120504495505,-341.56696453546454,-341.262724025974,-340.9584835164835,-340.654243006993,-340.3500024975025,-340.045761988012,-339.74152147852146,-339.43728096903095,-339.13304045954044,-338.8287999500499,-338.5245594405594,-338.2203189310689,-337.91607842157845,-337.61183791208794,-337.3075974025974,-337.0033568931069,-336.6991163836164,-336.3948758741259,-336.0906353646354,-335.78639485514486,-335.48215434565435,-335.17791383616384,-334.8736733266733,-334.5694328171828,-334.2651923076923,-333.9609517982018,-333.6567112887113,-333.35247077922077,-333.04823026973025,-332.74398976023974,-332.43974925074923,-332.1355087412587,-331.8312682317682,-331.5270277222777,-331.22278721278724,-330.9185467032967,-330.6143061938062,-330.3100656843157,-330.0058251748252,-329.7015846653347,-329.39734415584417,-329.09310364635365,-328.78886313686314,-328.48462262737263,-328.1803821178821,-327.8761416083916,-327.5719010989011,-327.2676605894106,-326.96342007992007,-326.65917957042956,-326.35493906093905,-326.05069855144853,-325.746458041958,-325.4422175324675,-325.137977022977,-324.8337365134865,-324.52949600399603,-324.2252554945055,-323.921014985015,-323.6167744755245,-323.312533966034,-323.00829345654347,-322.70405294705296,-322.39981243756245,-322.09557192807193,-321.7913314185814,-321.4870909090909,-321.1828503996004,-320.8786098901099,-320.5743693806194,-320.27012887112886,-319.96588836163835,-319.66164785214784,-319.3574073426573,-319.0531668331668,-318.7489263236763,-318.4446858141858,-318.1404453046953,-317.8362047952048,-317.5319642857143,-317.2277237762238,-316.9234832667333,-316.6192427572428,-316.31500224775226,-316.01076173826175,-315.70652122877124,-315.4022807192807,-315.0980402097902,-314.7937997002997,-314.4895591908092,-314.1853186813187,-313.88107817182816,-313.57683766233765,-313.27259715284714,-312.9683566433566,-312.6641161338661,-312.3598756243756,-312.0556351148851,-311.7513946053946,-311.44715409590407,-311.1429135864136,-310.8386730769231,-310.5344325674326,-310.2301920579421,-309.92595154845156,-309.62171103896105,-309.31747052947054,-309.01323001998,-308.7089895104895,-308.404749000999,-308.1005084915085,-307.796267982018,-307.49202747252747,-307.18778696303696,-306.88354645354644,-306.57930594405593,-306.2750654345654,-305.9708249250749,-305.6665844155844,-305.3623439060939,-305.05810339660337,-304.75386288711286,-304.4496223776224,-304.1453818681319,-303.8411413586414,-303.53690084915087,-303.23266033966036,-302.92841983016984,-302.62417932067933,-302.3199388111888,-302.0156983016983,-301.7114577922078,-301.4072172827173,-301.10297677322677,-300.79873626373626,-300.49449575424575,-300.19025524475524,-299.8860147352647,-299.5817742257742,-299.2775337162837,-298.9732932067932,-298.6690526973027,-298.36481218781216,-298.06057167832165,-297.7563311688312,-297.4520906593407,-297.14785014985017,-296.84360964035966,-296.53936913086915,-296.23512862137864,-295.9308881118881,-295.6266476023976,-295.3224070929071,-295.0181665834166,-294.7139260739261,-294.40968556443556,-294.10544505494505,-293.80120454545454,-293.496964035964,-293.1927235264735,-292.888483016983,-292.5842425074925,-292.280001998002,-291.97576148851147,-291.67152097902095,-291.36728046953044,-291.06303996004,-290.7587994505495,-290.45455894105896,-290.15031843156845,-289.84607792207794,-289.5418374125874,-289.2375969030969,-288.9333563936064,-288.6291158841159,-288.3248753746254,-288.02063486513487,-287.71639435564435,-287.41215384615384,-287.10791333666333,-286.8036728271728,-286.4994323176823,-286.1951918081918,-285.8909512987013,-285.58671078921077,-285.28247027972026,-284.97822977022975,-284.67398926073923,-284.3697487512488,-284.06550824175827,-283.76126773226775,-283.45702722277724,-283.15278671328673,-282.8485462037962,-282.5443056943057,-282.2400651848152,-281.9358246753247,-281.63158416583417,-281.32734365634366,-281.02310314685315,-280.71886263736263,-280.4146221278721,-280.1103816183816,-279.8061411088911,-279.5019005994006,-279.1976600899101,-278.89341958041956,-278.58917907092905,-278.28493856143854,-277.980698051948,-277.67645754245757,-277.37221703296706,-277.06797652347655,-276.76373601398603,-276.4594955044955,-276.155254995005,-275.8510144855145,-275.546773976024,-275.2425334665335,-274.93829295704296,-274.63405244755245,-274.32981193806194,-274.0255714285714,-273.7213309190809,-273.4170904095904,-273.1128499000999,-272.8086093906094,-272.50436888111886,-272.20012837162835,-271.89588786213784,-271.5916473526473,-271.2874068431568,-270.98316633366636,-270.67892582417585,-270.37468531468534,-270.0704448051948,-269.7662042957043,-269.4619637862138,-269.1577232767233,-268.8534827672328,-268.54924225774226,-268.24500174825175,-267.94076123876124,-267.6365207292707,-267.3322802197802,-267.0280397102897,-266.7237992007992,-266.4195586913087,-266.11531818181817,-265.81107767232766,-265.50683716283714,-265.20259665334663,-264.8983561438561,-264.5941156343656,-264.28987512487515,-263.98563461538464,-263.6813941058941,-263.3771535964036,-263.0729130869131,-262.7686725774226,-262.4644320679321,-262.16019155844157,-261.85595104895106,-261.55171053946054,-261.24747002997003,-260.9432295204795,-260.638989010989,-260.3347485014985,-260.030507992008,-259.72626748251747,-259.42202697302696,-259.11778646353645,-258.81354595404594,-258.5093054445554,-258.2050649350649,-257.9008244255744,-257.59658391608394,-257.29234340659343,-256.9881028971029,-256.6838623876124,-256.3796218781219,-256.0753813686314,-255.77114085914087,-255.46690034965036,-255.16265984015985,-254.85841933066934,-254.55417882117882,-254.2499383116883,-253.9456978021978,-253.6414572927073,-253.33721678321677,-253.03297627372626,-252.72873576423575,-252.42449525474527,-252.12025474525475,-251.81601423576424,-251.51177372627373,-251.20753321678322,-250.9032927072927,-250.5990521978022,-250.29481168831168,-249.99057117882117,-249.68633066933066,-249.38209015984015,-249.07784965034966,-248.77360914085915,-248.46936863136864,-248.16512812187813,-247.86088761238761,-247.5566471028971,-247.2524065934066,-246.94816608391608,-246.64392557442557,-246.33968506493505,-246.03544455544454,-245.73120404595406,-245.42696353646355,-245.12272302697303,-244.81848251748252,-244.514242007992,-244.2100014985015,-243.905760989011,-243.60152047952047,-243.29727997002996,-242.99303946053945,-242.68879895104894,-242.38455844155845,-242.08031793206794,-241.77607742257743,-241.47183691308692,-241.1675964035964,-240.8633558941059,-240.55911538461538,-240.25487487512487,-239.95063436563436,-239.64639385614385,-239.34215334665333,-239.03791283716285,-238.73367232767234,-238.42943181818183,-238.1251913086913,-237.8209507992008,-237.5167102897103,-237.21246978021978,-236.90822927072927,-236.60398876123875,-236.29974825174824,-235.99550774225773,-235.69126723276725,-235.38702672327673,-235.08278621378622,-234.7785457042957,-234.4743051948052,-234.17006468531468,-233.86582417582417,-233.56158366633366,-233.25734315684315,-232.95310264735264,-232.64886213786212,-232.34462162837164,-232.04038111888113,-231.73614060939062,-231.4319000999001,-231.1276595904096,-230.82341908091908,-230.51917857142857,-230.21493806193806,-229.91069755244754,-229.60645704295703,-229.30221653346652,-228.99797602397604,-228.69373551448552,-228.389495004995,-228.0852544955045,-227.781013986014,-227.47677347652348,-227.17253296703296,-226.86829245754245,-226.56405194805194,-226.25981143856143,-225.95557092907092,-225.65133041958043,-225.34708991008992,-225.0428494005994,-224.7386088911089,-224.43436838161838,-224.13012787212787,-223.82588736263736,-223.52164685314685,-223.21740634365634,-222.91316583416582,-222.6089253246753,-222.30468481518483,-222.00044430569432,-221.6962037962038,-221.3919632867133,-221.08772277722278,-220.78348226773227,-220.47924175824176,-220.17500124875124,-219.87076073926073,-219.56652022977022,-219.2622797202797,-218.95803921078922,-218.6537987012987,-218.3495581918082,-218.0453176823177,-217.74107717282718,-217.43683666333666,-217.13259615384615,-216.82835564435564,-216.52411513486513,-216.21987462537462,-215.9156341158841,-215.61139360639362,-215.3071530969031,-215.0029125874126,-214.69867207792208,-214.39443156843157,-214.09019105894106,-213.78595054945055,-213.48171003996003,-213.17746953046952,-212.873229020979,-212.5689885114885,-212.26474800199802,-211.9605074925075,-211.656266983017,-211.35202647352648,-211.04778596403597,-210.74354545454545,-210.43930494505494,-210.13506443556443,-209.83082392607392,-209.5265834165834,-209.2223429070929,-208.9181023976024,-208.6138618881119,-208.3096213786214,-208.00538086913087,-207.70114035964036,-207.39689985014985,-207.09265934065934,-206.78841883116883,-206.4841783216783,-206.1799378121878,-205.8756973026973,-205.5714567932068,-205.2672162837163,-204.96297577422578,-204.65873526473527,-204.35449475524476,-204.05025424575425,-203.74601373626373,-203.44177322677322,-203.1375327172827,-202.8332922077922,-202.52905169830169,-202.2248111888112,-201.9205706793207,-201.61633016983018,-201.31208966033967,-201.00784915084915,-200.70360864135864,-200.39936813186813,-200.09512762237762,-199.7908871128871,-199.4866466033966,-199.18240609390608,-198.8781655844156,-198.57392507492509,-198.26968456543457,-197.96544405594406,-197.66120354645355,-197.35696303696304,-197.05272252747253,-196.748482017982,-196.4442415084915,-196.140000999001,-195.83576048951048,-195.53151998002,-195.22727947052948,-194.92303896103897,-194.61879845154846,-194.31455794205795,-194.01031743256743,-193.70607692307692,-193.4018364135864,-193.0975959040959,-192.79335539460538,-192.48911488511487,-192.1848743756244,-191.88063386613388,-191.57639335664336,-191.27215284715285,-190.96791233766234,-190.66367182817183,-190.35943131868132,-190.0551908091908,-189.7509502997003,-189.44670979020978,-189.14246928071927,-188.83822877122878,-188.53398826173827,-188.22974775224776,-187.92550724275725,-187.62126673326674,-187.31702622377622,-187.0127857142857,-186.7085452047952,-186.4043046953047,-186.10006418581418,-185.79582367632366,-185.49158316683318,-185.18734265734267,-184.88310214785216,-184.57886163836164,-184.27462112887113,-183.97038061938062,-183.6661401098901,-183.3618996003996,-183.05765909090908,-182.75341858141857,-182.44917807192806,-182.14493756243758,-181.84069705294706,-181.53645654345655,-181.23221603396604,-180.92797552447553,-180.62373501498502,-180.3194945054945,-180.015253996004,-179.71101348651348,-179.40677297702297,-179.10253246753246,-178.79829195804197,-178.49405144855146,-178.18981093906095,-177.88557042957044,-177.58132992007992,-177.2770894105894,-176.9728489010989,-176.6686083916084,-176.36436788211788,-176.06012737262736,-175.75588686313685,-175.45164635364637,-175.14740584415586,-174.84316533466534,-174.53892482517483,-174.23468431568432,-173.9304438061938,-173.6262032967033,-173.32196278721278,-173.01772227772227,-172.71348176823176,-172.40924125874125,-172.10500074925076,-171.80076023976025,-171.49651973026974,-171.19227922077923,-170.88803871128871,-170.5837982017982,-170.2795576923077,-169.97531718281718,-169.67107667332667,-169.36683616383615,-169.06259565434564,-168.75835514485516,-168.45411463536465,-168.14987412587413,-167.84563361638362,-167.5413931068931,-167.2371525974026,-166.9329120879121,-166.62867157842157,-166.32443106893106,-166.02019055944055,-165.71595004995004,-165.41170954045955,-165.10746903096904,-164.80322852147853,-164.49898801198802,-164.1947475024975,-163.890506993007,-163.58626648351648,-163.28202597402597,-162.97778546453546,-162.67354495504495,-162.36930444555443,-162.06506393606395,-161.76082342657344,-161.45658291708293,-161.1523424075924,-160.8481018981019,-160.5438613886114,-160.23962087912088,-159.93538036963037,-159.63113986013985,-159.32689935064934,-159.02265884115883,-158.71841833166832,-158.41417782217783,-158.10993731268732,-157.8056968031968,-157.5014562937063,-157.19721578421579,-156.89297527472527,-156.58873476523476,-156.28449425574425,-155.98025374625374,-155.67601323676323,-155.3717727272727,-155.06753221778223,-154.76329170829172,-154.4590511988012,-154.1548106893107,-153.85057017982018,-153.54632967032967,-153.24208916083916,-152.93784865134865,-152.63360814185813,-152.32936763236762,-152.0251271228771,-151.72088661338663,-151.4166461038961,-151.1124055944056,-150.8081650849151,-150.50392457542458,-150.19968406593406,-149.89544355644355,-149.59120304695304,-149.28696253746253,-148.98272202797202,-148.6784815184815,-148.37424100899102,-148.0700004995005,-147.76575999001,-147.46151948051948,-147.15727897102897,-146.85303846153846,-146.54879795204795,-146.24455744255744,-145.94031693306692,-145.6360764235764,-145.3318359140859,-145.02759540459542,-144.7233548951049,-144.4191143856144,-144.11487387612388,-143.81063336663337,-143.50639285714286,-143.20215234765234,-142.89791183816183,-142.59367132867132,-142.2894308191808,-141.9851903096903,-141.6809498001998,-141.3767092907093,-141.0724687812188,-140.76822827172828,-140.46398776223776,-140.15974725274725,-139.85550674325674,-139.55126623376623,-139.24702572427572,-138.9427852147852,-138.6385447052947,-138.3343041958042,-138.0300636863137,-137.72582317682318,-137.42158266733267,-137.11734215784216,-136.81310164835165,-136.50886113886114,-136.20462062937062,-135.9003801198801,-135.5961396103896,-135.2918991008991,-134.9876585914086,-134.6834180819181,-134.37917757242758,-134.07493706293707,-133.77069655344656,-133.46645604395604,-133.16221553446553,-132.85797502497502,-132.5537345154845,-132.249494005994,-131.94525349650348,-131.641012987013,-131.3367724775225,-131.03253196803198,-130.72829145854146,-130.42405094905095,-130.11981043956044,-129.81556993006993,-129.51132942057941,-129.2070889110889,-128.9028484015984,-128.59860789210788,-128.2943673826174,-127.99012687312687,-127.68588636363636,-127.38164585414586,-127.07740534465535,-126.77316483516483,-126.46892432567432,-126.16468381618381,-125.86044330669331,-125.5562027972028,-125.25196228771229,-124.94772177822178,-124.64348126873126,-124.33924075924075,-124.03500024975025,-123.73075974025974,-123.42651923076923,-123.12227872127872,-122.8180382117882,-122.51379770229771,-122.2095571928072,-121.90531668331668,-121.60107617382617,-121.29683566433566,-120.99259515484515,-120.68835464535465,-120.38411413586414,-120.07987362637363,-119.77563311688311,-119.4713926073926,-119.1671520979021,-118.86291158841159,-118.55867107892108,-118.25443056943057,-117.95019005994006,-117.64594955044954,-117.34170904095905,-117.03746853146853,-116.73322802197802,-116.42898751248751,-116.124747002997,-115.8205064935065,-115.51626598401599,-115.21202547452548,-114.90778496503496,-114.60354445554445,-114.29930394605394,-113.99506343656344,-113.69082292707293,-113.38658241758242,-113.0823419080919,-112.7781013986014,-112.4738608891109,-112.16962037962038,-111.86537987012987,-111.56113936063936,-111.25689885114885,-110.95265834165833,-110.64841783216784,-110.34417732267733,-110.03993681318681,-109.7356963036963,-109.43145579420579,-109.12721528471529,-108.82297477522478,-108.51873426573427,-108.21449375624375,-107.91025324675324,-107.60601273726273,-107.30177222777223,-106.99753171828172,-106.69329120879121,-106.3890506993007,-106.08481018981018,-105.78056968031969,-105.47632917082917,-105.17208866133866,-104.86784815184815,-104.56360764235764,-104.25936713286713,-103.95512662337663,-103.65088611388612,-103.3466456043956,-103.04240509490509,-102.73816458541458,-102.43392407592408,-102.12968356643357,-101.82544305694306,-101.52120254745255,-101.21696203796203,-100.91272152847152,-100.60848101898102,-100.30424050949051,-100.0]}
},{}],76:[function(require,module,exports){
module.exports={"expected":[1.3440585709080678e43,1.8232605115159048e43,2.4733140093792606e43,3.355133372523785e43,4.551350901961644e43,6.174060084295655e43,8.375319492079478e43,1.1361401676804024e44,1.5412122269933603e44,2.0907060556475442e44,2.836112856208271e44,3.847282171217831e44,5.2189672468673514e44,7.079704038254278e44,9.60385587768527e44,1.3027952471031799e45,1.7672854294058172e45,2.3973819339108303e45,3.252128966498905e45,4.41162197192674e45,5.984513106237248e45,8.118192661708109e45,1.1012600511129812e46,1.493896179500346e46,2.0265202509346295e46,2.7490426602614816e46,3.729168531354296e46,5.05874213458746e46,6.862353301838164e46,9.309012316970008e46,1.2627987296178087e47,1.7130288125383219e47,2.323781014156216e47,3.152286851352661e47,4.276182795485654e47,5.8007853227446625e47,7.868959763855892e47,1.0674507729564785e48,1.4480327602120328e48,1.96430498508131e48,2.664645566340842e48,3.6146810440059526e48,4.903436019762507e48,6.651675350381048e48,9.023220612759303e48,1.2240301268139944e49,1.6604379031026452e49,2.25243968237631e49,3.0555099430477524e49,4.1449016748870163e49,5.622698081402689e49,7.627378450532436e49,1.0346794578935327e50,1.4035773726582604e50,1.9039997614806715e50,2.5828395087708245e50,3.503708384332768e50,4.752897886514852e50,6.447465325782043e50,8.746202868171226e50,1.186451741048008e51,1.609461562981289e51,2.183288568000336e51,2.9617041380791103e51,4.017650955571464e51,5.450078214521969e51,7.393213813961601e51,1.0029142398967592e52,1.36048678950452e52,1.8455459408042957e52,2.5035449413365625e52,3.396142645227454e52,4.6069813552357673e52,6.249524659194286e52,8.477689717908169e52,1.150027032014189e53,1.5600502240245952e53,2.1162604301714598e53,2.8707782219702106e53,3.894306902043585e53,5.2827578707546235e53,7.166238158162496e53,9.721242312430192e53,1.3187191105188718e54,1.788886683982832e54,2.4266847599348953e54,3.291879232389031e54,4.465544540249542e54,6.057660877942001e54,8.217420066332708e54,1.1147205812139722e55,1.512155839851796e55,2.051290092363459e55,2.7826437805782024e55,3.7747495775543205e55,5.120574351879777e55,6.946230777544188e55,9.422794924789641e55,1.2782337218290987e56,1.7339668969369461e56,2.3521842276002935e56,3.1908167626181767e56,4.328449911847318e56,5.871687418364467e56,7.965140833584105e56,1.0804980575158207e57,1.4657318391320411e57,1.988314379004682e57,2.6972151141219985e57,3.658862727477672e57,4.9633699545998494e57,6.732977742296057e57,9.133510033085753e57,1.238991256430807e58,1.68073317700546e58,2.2799709018322878e58,3.092856965234522e58,4.1955641625566123e58,5.691423444405746e58,7.720606709490456e58,1.0473261837724872e59,1.4207330802993777e59,1.9272720540475258e59,2.614409153850334e59,3.546533666267582e59,4.810991817193362e59,6.526271690368843e59,8.853106343746818e59,1.2009535559078221e60,1.6291337610175783e60,2.209974564154515e60,2.997904586520469e60,4.0667580775162004e60,5.516693671775024e60,7.48357991503402e60,1.0151727044630525e61,1.3771158076584428e61,1.8681037614243034e61,2.5341453812671553e61,3.4376531678848377e61,4.663291770876701e61,6.325911625839407e61,8.581311199064872e61,1.1640836333280694e62,1.5791184749598019e62,2.1421271518355546e62,2.905867297099279e62,3.941906408830813e62,5.347328197503219e62,7.253829971142039e62,9.840063543286066e62,1.334837608837186e63,1.8107519673304893e63,2.456345749838003e63,3.332115359588612e63,4.520126195727499e63,6.1317027234686975e63,8.317860312070824e63,1.1283456372781558e64,1.5306386851880697e64,2.0763626917065931e64,2.816655602155594e64,3.820887753783524e64,5.183162334734746e64,7.031133474572886e64,9.537968279704823e64,1.2938573735464326e65,1.7551609042804255e65,2.380934609098949e65,3.2298176189886697e65,4.381355881032559e65,5.943456139257158e65,8.062497509548935e65,1.0937048170024398e66,1.4836472511372754e66,2.0126172360108984e66,2.730182754413533e66,3.703584436785924e66,5.0240364525889515e66,6.815273880685887e66,9.245147503821161e66,1.2541352536049678e67,1.7012765168805226e67,2.3078386310961588e67,3.130660474257276e67,4.246845889923117e67,5.760988826817988e67,7.814974482938568e67,1.0601274886123338e68,1.4380984794832838e68,1.9508288002221625e68,2.64636466978518e68,3.5898823949541285e68,4.869795820939417e68,6.6060412928771475e68,8.961316483855853e68,1.2156326241922576e69,1.6490464092668098e69,2.2369867390837675e69,3.0345475074055245e69,4.116465428164639e69,5.584123359387785e69,7.575050546886869e69,1.027581002332693e70,1.3939480797115557e70,1.8909373027727276e70,2.5651198456095236e70,3.479671067196059e70,4.720290459958562e70,6.403232258481863e70,8.686199229448232e70,1.178312046290717e71,1.5984197941566348e71,2.1683100384101266e71,2.941385260529084e71,3.99008771697669e71,5.4126877572999355e71,7.342492405210598e71,9.960337107542174e71,1.3511531210502643e72,1.832884506631335e72,2.486369281401469e72,3.3728432867048646e72,4.575374994280074e72,6.206649570942426e72,8.419528223290744e72,1.1421372302806776e73,1.5493474434644797e73,2.1017417495268398e73,2.851083144931406e73,3.86758986975549e73,5.246515320757067e73,7.11707392404532e73,9.654549380600711e73,1.3096719907255722e74,1.7766139626750348e74,2.4100364020332477e74,3.2692951767528155e74,4.434908511639889e74,6.016102078048311e74,8.161044161002327e74,1.1070730006535212e75,1.5017816404334513e75,2.037217143053518e75,2.763553353038165e75,3.748852772582355e75,5.0854444677351315e75,6.89857591195894e75,9.358149501975604e75,1.2694643534981515e76,1.7220709547995794e76,2.336046983274866e76,3.168926049683429e76,4.2987544258569075e76,5.831404496065751e76,7.910495698985479e76,1.0730852618076379e77,1.45567613323703e77,1.974673476836703e77,2.6787107730147337e77,3.633760968400535e77,4.929318576865471e77,6.686785906814065e77,9.07084925965543e77,1.2304911124423022e78,1.6692024467144658e78,2.2643290796204633e78,3.0716383090060053e78,4.166780344019041e78,5.652377229571135e78,7.66763921002776e78,1.040140964894799e79,1.410986090004615e79,1.914049934941092e79,2.5964729060057683e79,3.522202544746941e79,4.777985835140431e79,6.48149796917565e79,8.792369289892075e79,1.1927143709291576e80,1.6179570303721371e80,2.1948129543297928e80,2.9773373544945335e80,4.038857937748561e80,5.478846196817335e80,7.432238546403012e80,1.0082080756843487e81,1.367668055228241e81,1.8552875685132637e81,2.516759785915547e81,3.4140690249315314e81,4.631299090293103e81,6.282512482061047e81,8.522438805556343e81,1.1560973957766803e82,1.5682848759797103e82,2.1274310116184385e82,2.8859314902010236e82,3.914862818417869e82,5.310642660461319e82,7.204064810247796e82,9.772555434136921e82,1.325679907507617e83,1.7983292384614282e83,2.4394939016503717e83,3.3092552625575106e83,4.48911570771116e83,6.089635956836029e83,8.260795332829359e83,1.1206045815314876e84,1.5201376835458514e84,2.062117730928875e84,2.7973318352928455e84,3.794674416197402e84,5.147603063486975e84,6.982896130987276e84,9.472532705955227e84,1.2849808185920293e85,1.7431195598949176e85,2.364600121749251e85,3.207659339278851e85,4.351297431741489e85,5.90268084507261e85,8.00718445598022e85,1.086201415846741e86,1.4734686359151682e86,1.9988096032200736e86,2.711452237626594e86,3.678175862816787e86,4.989568870167487e86,6.768517449592249e86,9.181720837515618e86,1.2455312136802538e87,1.6896048482689096e87,2.292005621327404e87,3.1091824656981463e87,4.217710251254183e87,5.721465356180281e87,7.761359569979007e87,1.052854445923287e88,1.4282323532440466e88,1.937445069213026e88,2.6282091899764957e88,3.5652538779242244e88,4.83638641190801e88,6.560720309462605e88,8.899837050450674e88,1.207292732938721e89,1.6377330671832874e89,2.2216398112633374e89,3.0137288853055553e89,4.08822426933374e89,5.545813280637831e89,7.523081640702473e89,1.0205312459810575e90,1.384384848874737e90,1.8779644595316012e90,2.547521748833463e90,3.4557986589362893e90,4.687906737822542e90,6.359302653727828e90,8.62660724784229e90,1.1702281942014668e91,1.5874537777833705e91,2.1534342695598887e91,2.9212057813677963e91,3.962713576969625e91,5.375553818651962e91,7.292118972504878e91,9.892003857288214e91,1.34188348656351e92,1.82030993668195e92,2.4693114556978473e92,3.349703774267848e92,4.543985469898102e92,6.164068628772438e92,8.361765747694974e92,1.1343015568151967e93,1.5387180897145524e93,2.0873226748119026e93,2.8315231866756637e93,3.841056130626363e93,5.210521414074625e93,7.068246982921263e93,9.588313998023724e93,1.3006869390223435e94,1.7644254388123506e94,2.393502260788511e94,3.246866059840904e94,4.404482662604259e94,5.9748283937932204e94,8.10505502459397e94,1.0994778865940003e95,1.4914786135826417e95,2.0232407417174103e95,2.7445938960615196e95,3.7231336335705744e95,5.050555593421507e95,6.851247984289616e95,9.293947581405505e95,1.2607551477333802e96,1.7102566252002034e96,2.320020449093448e96,3.1471855187706297e96,4.2692626668139365e96,5.791397936201427e96,7.856225459294483e96,1.0657233218504638e97,1.4456894148732628e97,1.961126158567745e97,2.6603333816037754e97,3.608831420842475e97,4.895500809830458e97,6.640910972077268e97,9.008618372710185e97,1.2220492839967792e98,1.6577508234125775e98,2.248794568691324e98,3.050565224130191e98,4.1381939979018634e98,5.613598892694805e98,7.615035095996401e98,1.0330050404691649e99,1.401305969286599e99,1.9009185266573436e99,2.578659710433438e99,3.4980383477587606e99,4.745206291811993e99,6.437031419704043e99,8.732048924775716e99,1.184531711174752e100,1.6068569780884795e100,2.179755361273563e100,2.9569112247020905e100,4.011149207891277e100,5.441258375820289e100,7.381249407074192e100,1.0012912279913492e101,1.3582851194427537e101,1.8425593015536767e101,2.4994934650648354e101,3.390646681837609e101,4.5995258966431614e101,6.23941107966622e101,8.463970308216714e101,1.1481659480947124e102,1.5575256012942504e102,2.1128356947988021e102,2.866132453621674e102,3.8880047615275747e102,5.274208805862977e102,7.1546410650264e102,9.70551046679408e102,1.3165850329166988e103,1.7859917361697395e103,2.4227576661721996e103,3.2865519980425632e103,4.458317968260983e103,6.047857790766009e103,8.2041218499261e103,1.1129166335756355e104,1.509708724402377e104,2.0479704982158384e104,2.7781406398262087e104,3.768640916154828e104,5.112287747896149e104,6.934989721428623e104,9.407546055308426e104,1.276165161561552e105,1.7311608255847427e105,2.3483776977363443e105,3.185653077242447e105,4.3214451995206076e105,5.86218529125745e105,7.952250879601208e105,1.0787494920439755e106,1.4633598514481133e106,1.9850966981896936e106,2.6928502222224834e106,3.6529416052813047e106,4.955337753832584e106,6.72208179267265e106,9.118729312130712e106,1.2369862020802864e107,1.6780132535588103e107,2.2762812344904312e107,3.087851807787693e107,4.1887744986802846e107,5.682213037731421e107,7.708112484054099e107,1.0456313002047052e108,1.4184339139180597e108,1.924153157770833e108,2.6101782664887324e108,3.5407943257195486e108,4.803206209326361e108,6.515710252281581e108,8.838779398905435e108,1.1990100578084565e109,1.6264973406892235e109,2.206398171592162e109,2.993053090109704e109,4.060176859986605e109,5.507766029558443e109,7.471469269064598e109,1.0135298547358952e110,1.3748872269263475e110,1.8650806169472454e110,2.530044384431948e110,3.4320900281902896e110,4.655745185374787e110,6.315674429603886e110,8.567424099165459e110,1.1621998016696789e111,1.5765629941590164e111,2.1386605564557542e111,2.90116474424764e111,3.935527238232677e111,5.33867463872301e111,7.242091128542603e111,9.82413940975073e111,1.3326774467368493e112,1.8078216350210683e112,2.4523706558197588e112,3.3267230112865017e112,4.512811294475012e112,6.121779814684829e112,8.304399553636184e112,1.1265196402687558e113,1.5281616590275686e113,2.0730025226766214e113,2.8120974202156414e113,3.8147044271670726e113,5.174774444881133e113,7.019755020779236e113,9.522533025666436e113,1.2917635295888445e114,1.752320534755135e114,2.377081552613347e114,3.224590818690754e114,4.3742655511979527e114,5.933837869130316e114,8.04945000366568e114,1.0919348790871127e115,1.4812462710173705e115,2.009360225984411e115,2.7257645111200924e115,3.6975909416350706e115,5.015906075482452e115,6.80424475156691e115,9.23018612041601e115,1.2521056917874118e116,1.6985233482331696e116,2.3041038655249896e116,3.1255941395504477e116,4.23997323704249e116,5.751665842777094e116,7.802327542530924e116,1.0584118887466539e117,1.4357712107493458e117,1.9476717821619984e117,2.642082068946251e117,3.584072903340286e117,4.8619150508000805e117,6.595350763977109e117,8.946814422998868e117,1.2136653710182924e118,1.646377764383362e118,2.233366632832027e118,3.029636711909588e118,4.109803769438333e118,5.575086595990729e118,7.562791874377803e118,1.0259180723091685e119,1.3916922593842381e119,1.8878772068714794e119,2.5609687229287375e119,3.474039930111494e119,4.712651633717319e119,6.3928699345910374e119,8.672142389689198e119,1.1764051888513094e120,1.5958330781119516e120,2.1648010713749894e120,2.936625229106371e120,3.9836305747699006e120,5.403928427418256e120,7.330610080565998e120,9.944218335802283e120,1.3489665556249477e121,1.8299183573265004e121,2.482345600428168e121,3.3673850285691336e121,4.567970684128628e121,6.196605375989652e121,8.405902936101818e121,1.1402889143942667e122,1.54684014099902e122,2.0983405096741674e122,2.8464692490433846e122,3.86133096530065e122,5.238024907031905e122,7.105556393182761e122,9.638925463856284e122,1.3075525540394104e123,1.7737388757553283e123,2.406136250238206e123,3.264004490088757e123,4.427731517807794e123,6.006366245303944e123,8.147837177486835e123,1.1052814290627258e124,1.4993513135074128e124,2.0339203231006465e124,2.7590811062449414e124,3.742786019873558e124,5.077214714295581e124,6.887411975512549e124,9.343005247910827e124,1.2674099846625355e125,1.719284134600563e125,2.3322665682456845e125,3.1637977899566606e125,4.29179776961055e125,5.821967558642998e125,7.897694176994567e125,1.0713486924319468e126,1.4533204186597507e126,1.971477871036389e126,2.6743758266127735e126,3.627880468275535e126,4.9213414812998866e126,6.67596470924397e126,9.056169942366799e126,1.2284998138391252e127,1.6665011834003015e127,2.260664725373846e127,3.066667489621588e127,4.1600372608754524e127,5.643230011222248e127,7.65523070167349e127,1.0384577091365423e128,1.4087026971367848e128,1.910952435964259e128,2.592271044798853e128,3.516502579150651e128,4.770253640715531e128,6.471008988213489e128,8.778140635570294e128,1.1907842062682648e129,1.6153386973001257e129,2.1912610977369887e129,2.972519141948955e129,4.0323218708980606e129,5.469979803010484e129,7.420210985954976e129,1.006576496786715e130,1.3654547637542926e130,1.8522851644273542e130,2.512686924116262e130,3.408544051356548e130,4.623804278412042e130,6.272345518477766e130,8.508646978604271e130,1.1542264882130027e131,1.5657469271466434e131,2.1239881989406752e131,2.8812611993820224e131,3.9085274123487135e131,5.302048469731592e131,7.192406502399381e131,9.756740548691303e131,1.3235345652768712e132,1.7954190098020005e132,2.4355460789074643e132,3.303899908654391e132,4.4818509906012854e132,6.079781124524057e132,8.2474269224109e132,1.118791111840115e133,1.5176776511122376e133,2.0587806144592054e133,2.792804924923629e133,3.7885335105151533e133,5.139272719052786e133,6.97159573948411e133,9.457203346031222e133,1.2829013395261438e134,1.7402986768266613e134,2.3607734992959745e134,3.202468397631996e134,4.344255745369097e134,5.893128561433223e134,7.99422646297942e134,1.0844436206540448e135,1.4710841278055176e135,1.9955749380277838e135,2.707064305849862e135,3.672223486254449e135,4.981494271804968e135,6.75756398620987e135,9.166862097218099e135,1.2435155757443986e136,1.6868705678338872e136,2.2882964782494306e136,3.104150888762431e136,4.2108847484553387e136,5.712206332806211e136,7.748799394359772e136,1.0511506159920674e137,1.4259210508207952e137,1.93430970998853e137,2.6239559700743464e137,3.5594842425363327e137,4.8285597080749585e137,6.550103123319823e137,8.885434481502753e137,1.2053389761757364e138,1.635082730633854e138,2.2180445408804815e138,3.008851780498478e138,4.0816083131561305e138,5.5368385142804354e138,7.510907069256182e138,1.0188797245486214e139,1.3821445046837478e139,1.874925357528233e139,2.543399105078761e139,3.450206154469823e139,4.680320318022924e139,6.349011420931832e139,8.612646845536994e139,1.1683344188259693e140,1.5848848079970074e140,2.1499493759189894e140,2.916478406311521e140,3.9563007342187255e140,5.366854582467201e140,7.2803181669750205e140,9.875995668960992e140,1.3397119221488191e141,1.8173641367508914e141,2.4653153793322943e141,3.3442829627078875e141,4.536631957282229e141,6.154093342379675e141,8.348233937278125e141,1.1324659213662377e142,1.536227988687657e142,2.083944769287327e142,2.8269409445859184e142,3.8348401656102004e142,5.202089249137885e142,7.05680846849281e142,9.572797269720945e142,1.2985820428076446e143,1.7615700765296086e143,2.389628866124856e143,3.2416116701226137e143,4.397354906796093e143,5.965159354078696e143,8.091938648062952e143,1.0976986061444125e144,1.489064960001674e144,2.0199665397161654e144,2.740152331278109e144,3.717108502036609e144,5.042382300500837e144,6.840160638429947e144,9.278907225039078e144,1.2587148729689027e145,1.707488924081196e145,2.316265969737338e145,3.1420924416537066e145,4.2623537369574667e145,5.782025741226603e145,7.843511762604479e145,1.063998666271309e146,1.4433498617604817e146,1.9579524763357862e146,2.6560281752572093e146,3.6029912640996632e146,4.887578441415201e146,6.630164013721533e146,8.994039763404728e146,1.2200716467691817e147,1.655068092212295e147,2.2451553538785487e147,3.0456285072305887e147,4.131497175922108e147,5.604514429165742e147,7.602711716659534e147,1.0313333327474876e148,1.399038241717501e148,1.8978422781834262e148,2.574486676246085e148,3.4923774869810455e148,4.737527144384493e148,6.426614398772459e148,8.717917886647401e148,1.182614788477799e149,1.604256608184494e149,2.1762278723203464e149,2.9521260676766315e149,4.0046579819622454e149,5.432452810226564e149,7.36930436213634e149,9.996708425993083e149,1.3560870123343699e150,1.8395774955687702e150,2.4954485452801207e150,3.385159612542252e150,4.592082503187907e150,6.229313866901547e150,8.450273100588505e150,1.1463078759594991e151,1.555005064150253e151,2.1094165016611148e151,2.861494203500558e151,3.881712819739167e151,5.265673575887241e151,7.143062739417251e151,9.689804079937465e151,1.3144544088833345e152,1.7831014732385434e152,2.418836927608859e152,3.2812333847371274e152,4.451103091003609e152,6.038070567884682e152,8.1908451539671795e152,1.1111156052582385e153,1.5072655691096201e153,2.044656276153495e153,2.7736447864880745e153,3.762542140376334e153,5.1040145540888256e153,6.923766856666992e153,9.392321863008695e153,1.2740999488364051e154,1.728359295286032e154,2.3445773279637657e154,3.180497748236999e154,4.314451822890335e154,5.852698541403185e154,7.939381785376743e154,1.077003756268295e155,1.4609917023419412e155,1.981884224534008e155,2.688492394009134e155,3.647030065212034e155,4.94731855154211e155,6.71120347591879e155,9.10397251075436e155,1.234984392500842e156,1.6752977317528122e156,2.2725975381216844e156,3.0828547501663295e156,4.181995822488512e156,5.673017536219564e156,7.695638477970548e156,1.0439391594598582e157,1.4161384682680072e157,1.921039308790841e157,2.60595422595454e157,3.535064273122237e157,4.795433200875897e157,6.505165905725437e157,8.824475639298512e157,1.1970697048638748e158,1.6238651868689138e158,2.202827566690883e158,2.9882094448552203e158,4.0536062928138325e158,5.498852834907637e158,7.459378221702509e158,1.011889663625528e159,1.3726622526971764e159,1.8620623648122072e159,2.5259500242227085e159,3.42653589130146e159,4.6482108124803875e159,6.305453800179892e159,8.553559472701532e159,1.1603190186081554e160,1.574011648882086e160,2.1351995710527692e160,2.896469801517628e160,3.92915839101966e160,5.330035083960203e160,7.230371282862879e160,9.808241046173864e160,1.3305207804177738e161,1.8048960448561768e161,2.448401994679551e161,3.321339389398734e161,4.505508230896523e161,6.111872964102601e161,8.290960578690425e161,1.124696598262685e162,1.5256886414281508e162,2.0696477913941477e162,2.8075466147621532e162,3.808531107002134e162,5.166400129114467e162,7.008394980689606e162,9.507122750435153e162,1.289673074090182e163,1.7494847617877774e163,2.373234731512885e163,3.219372476901825e163,4.36718669561436e163,5.924235164209824e163,8.036423612506668e163,1.0901678054549165e164,1.4788491763933914e164,2.0061084867635805e164,2.7213534178512314e164,3.6916071457322667e164,5.007788855731246e164,6.793233470841494e164,9.21524894895405e164,1.2500794144012275e165,1.695774635027084e165,2.30037514390927e165,3.1205360036719022e165,4.233111706147298e165,5.74235794608231e165,7.7897010686132e165,1.0566990652290366e166,1.4334477082246324e166,1.9445198730909115e166,2.6378063986223613e166,3.578272813202442e166,4.854047034077573e166,6.584677535515123e166,8.932335830766106e166,1.2117013014418826e167,1.6437134381567763e167,2.229752384983105e167,3.02473386353348e167,4.103152891246036e167,5.566064456749952e167,7.550553040027011e167,1.024257833398322e168,1.3894400896415285e168,1.8848220631106397e168,2.5568243179921465e168,3.46841790587244e168,4.705025169356524e168,6.382524380005476e168,8.658108298055199e168,1.1745014172713269e169,1.593250548139033e169,2.1612977828862943e169,2.9318729008225324e169,3.977183882129246e169,5.395183272723365e169,7.318746985037712e169,9.928125649003335e169,1.3467835287093205e170,1.8269570081286377e170,2.478328430960899e170,3.3619356035096367e170,4.5605783563413546e170,6.186577435515592e170,8.392299698658204e170,1.1384435896296005e171,1.5443368960906177e171,2.0949447740336737e171,2.8418628198037157e171,3.8550821896047323e171,5.229548233307791e171,7.094057501092261e171,9.623326831230206e171,1.305436547228743e172,1.770868441576718e172,2.4022424100425147e172,3.258722365320815e172,4.420566138474822e172,5.996646168016337e172,8.134651566777338e172,1.1034927567647172e173,1.496924919569239e173,2.0306288383777264e173,2.754616096870013e173,3.7367290849653156e173,5.068998279031196e173,6.876266105617658e173,9.327885501728842e173,1.2653589404034203e174,1.7165018243010282e174,2.3284922710463453e174,3.1586778292708157e174,4.284852371291799e174,5.812545892976471e174,7.884913371652967e174,1.0696149333392186e175,1.4509685163255266e175,1.968287436671586e175,2.6700478954362308e175,3.6220094845392084e175,4.913377295034577e175,6.665161023572679e175,9.041514380555988e175,1.2265117377461556e176,1.6638042915290797e176,2.2570063011363282e176,3.061704714493319e176,4.153305090035016e176,5.634097595778587e176,7.642842273956432e176,1.0367771773840445e177,1.4064229994739698e177,1.9078599496570204e177,2.588075983446294e177,3.5108118377848644e177,4.762533959268555e177,6.460536981525384e177,8.763935007419341e177,1.1888571651847423e178,1.6127246014655358e178,2.1877149890988022e178,2.967708726696603e178,4.025796381337229e178,5.461127757651675e178,7.408202889657114e178,1.0049475582663637e179,1.3632450540406472e179,1.849287619119429e179,2.5086206534122057e179,3.40302801882321e179,4.6163215953532006e179,6.262195008048984e179,8.494877470907873e179,1.1523586083311837e180,1.5632130854655663e180,2.12055095775228e180,2.876598466475135e180,3.9022022588403897e180,5.293468186944654e180,7.180767061141628e180,9.740951256408429e180,1.3213926948444915e181,1.79251349075345e181,2.4316046449093265e181,3.298553221298018e181,4.474598029952621e181,6.0699422402458564e181,8.234080146035152e181,1.116980576879165e182,1.51522159973883e182,2.0554488984309967e182,2.788285340434465e182,3.7824025426347985e182,5.1309558555800357e182,6.960313635357284e182,9.441898793546316e182,1.2808252256723944e183,1.7374823587816356e183,2.3569530694497545e183,3.197285856464223e183,4.337225454528332e183,5.883591736214529e183,7.981289439844537e183,1.0826886700938702e184,1.4687034785353337e184,1.9923455074805994e184,2.7026834750447083e184,3.6662807423982255e184,4.973432740531234e184,6.746628248770738e184,9.152027402757644e184,1.2415031997069558e185,1.6841407122734173e185,2.2845933376621987e185,3.099127454406643e185,4.2040702913391483e185,5.702962293270485e185,7.73625954482003e185,1.0494495433616748e186,1.423613488768555e186,1.9311794247027636e186,2.61970963314019e186,3.5537239441248724e186,4.820745670163873e186,6.539503118924817e186,8.871055220171715e186,1.2033883811691561e187,1.632436683112982e187,2.2144550887086604e187,3.0039825682894712e187,4.075003063552638e187,5.527878271749771e187,7.498752199867768e187,1.0172308757664171e188,1.3799077860324001e188,1.8718911736907223e188,2.5392831329811457e188,3.4446227003298653e188,4.672746175294629e188,6.338736842394859e188,8.598709035292405e188,1.1664437081392472e189,1.582319995563578e189,2.146470121866844e189,2.911758681546459e189,3.9498982693443365e189,5.358169424220002e189,7.268536458639433e189,9.860013386616916e189,1.3375438719677067e190,1.8144231039954987e190,2.4613257698003527e190,3.338870923624619e190,4.529290344825089e190,6.144134198951192e190,8.33472402533281e190,1.130633256518422e191,1.5337419173808033e191,2.0805723302130858e191,2.8223661179193963e191,3.8286342598642447e191,5.1936707299378304e191,7.045388464964251e191,9.557305652074457e191,1.2964805529376562e192,1.7587193350677154e192,2.385761739759597e192,3.236365783561245e192,4.390238685804987e192,5.955505961730563e192,8.078843497709028e192,1.0959222050969089e193,1.4866552124262087e193,2.0166976363423352e193,2.7357179542601133e193,3.711093120947718e193,5.034222234385799e193,6.829091235175552e193,9.263891208418502e193,1.2566778999725499e194,1.7047257019213423e194,2.312517566239282e194,3.1370076066421074e194,4.255455987793188e194,5.7726687132355727e194,7.830818640436695e194,1.0622768016950701e195,1.4410140947365614e195,1.9547839300604639e195,2.6517299360080056e195,3.5971605584579995e195,4.879668893735641e195,6.619434447123589e195,8.979484746601783e195,1.2180972099435409e196,1.6523897024646551e196,2.2415220283918316e196,3.0406997793992267e196,4.124811191381374e196,5.595444666986041e196,7.590408280195083e196,1.0296643303434005e197,1.3967741840024114e197,1.8947710079895035e197,2.5703203952625183e197,3.4867257871506685e197,4.729860424089183e197,6.416214235661768e197,8.703809716718785e197,1.1807009679288013e198,1.6016604464482106e198,2.17270609188776e198,2.947348654450789e198,3.998177260756551e198,5.423661494642683e198,7.35737864781458e198,9.980530794701469e198,1.3538924624135333e199,1.8366005150280272e199,2.4914101713721885e199,3.3796814229479155e199,4.584651155345043e199,6.2192329944139144e199,8.436598059093916e199,1.144452810734657e200,1.5524886059809816e200,2.1060028417891527e200,2.8568634594401482e200,3.87543106017375e200,5.257152158438353e200,7.131503150964048e200,9.674123110661058e200,1.3123272328299388e201,1.780215887607618e201,2.4149225339602805e201,3.2759233785212825e201,4.4438998895518206e201,6.028299183625239e201,8.177589943629841e201,1.1093174915373143e202,1.50482636756482e202,2.0413474174828064e202,2.7691562087705294e202,3.7564532342211944e202,5.095754748756464e202,6.9125621538205025e202,9.377122307954939e202,1.272038078236344e203,1.7255622986920465e203,2.3407831083136404e203,3.1753507620789354e203,4.307469763612237e203,5.843227143915896e203,7.926533517153454e203,1.0752608456094937e204,1.458627385601529e204,1.978676949611013e204,2.68414161805097e204,3.6411280917633516e204,4.9393123266927685e204,6.70034276349928e204,9.089239590247745e204,1.2329858224414384e205,1.6725866044644036e205,2.268919803063376e205,3.0778657792620806e205,4.175228116199973e205,5.663836915749211e205,7.6831846585186935e205,1.0422497570993065e206,1.4138467373280568e206,1.9179304989396396e206,2.6017370211671946e206,3.5293434934449956e206,4.787672771452386e206,6.494638623041071e206,8.810195027405982e206,1.1951324919843539e207,1.6212372926519465e207,2.1992627400845304e207,2.9833736380515243e207,4.0470463587623406e207,5.489954064442483e207,7.447306741231835e207,1.0102521268295798e208,1.3704408791343456e208,1.8590489971019324e208,2.521862289899412e208,3.4209907426490475e208,4.640688632430155e208,6.29524971075778e208,8.53971728330394e208,1.1584412792099669e209,1.57146443243651e209,2.131744186547937e209,2.8917824565937322e209,3.922799850485359e209,5.321409510552913e209,7.218670403359823e209,9.792368410852052e209,1.3283676042227512e210,1.801975189161571e210,2.4444397560070108e210,3.315964479803862e210,4.498216985834918e210,6.101982145735093e210,8.277543351981422e210,1.1228765064778413e211,1.5232196259027355e211,2.0662984890592294e211,2.803003173858191e211,3.8023677770950934e211,5.158039365467862e211,6.997053324505177e211,9.491737413587602e211,1.28758600156688e212,1.7466535779400115e212,2.3693941357067312e212,3.214162579933512e212,4.36011929571305e212,5.9146479993064055e212,8.023418301901799e212,1.0884035914705634e213,1.4764559609776658e213,2.0028620098185703e213,2.7169494630360944e213,3.6856330333812594e213,4.9996847720426974e213,6.782240009625463e213,9.200335950254499e213,1.2480564161311626e214,1.6930303700520441e214,2.2966524564680926e214,3.115486053353421e214,4.2262612792387564e214,5.733065112317684e214,7.777095028065668e214,1.0549890135664695e215,1.4311279658143038e215,1.9413730647410466e215,2.6335376475978128e215,3.572482109326126e215,4.846191750133782e215,6.57402157949359e215,8.917880669178391e215,1.2097404103110254e216,1.6410534235981413e216,2.2261439860563085e216,3.019838949416322e216,4.0965127761422386e216,5.557056917998929e216,7.538334011730484e216,1.0226002812451372e217,1.3871915645756618e217,1.8817718634761262e217,2.5526866199288163e217,3.4628049797314207e217,4.697411046870997e217,6.372195567587481e217,8.644096917732791e217,1.1726007265569024e218,1.590672197463531e218,2.1578001637547805e218,2.9271282632114445e218,3.970747622144235e218,5.3864522702756135e218,7.306903087507132e218,9.912059004931896e218,1.3446040345769894e219,1.8240004512696497e219,2.4743177624621202e219,3.3564949972318436e219,4.553197991527116e219,6.176565723215516e219,8.378718475276657e219,1.136601251146321e220,1.5418377021728575e220,2.0915545336979162e220,2.837263845129153e220,3.848843526276298e220,5.221085277349188e220,7.082577217610574e220,9.60775344180639e220,1.3033239647430169e221,1.7680026526096927e221,2.3983548712320703e221,3.253448788593218e221,4.4134123548451535e221,5.986941820689352e221,8.121487294285854e221,1.1017069790675815e222,1.4945024522541922e222,2.0273426802506048e222,2.7501583132010167e222,3.7306819519696275e222,5.060795140389804e222,6.86513827303724e222,9.312790223768121e222,1.263311215340622e223,1.7137240166024765e223,2.3247240817763237e223,3.153566154196221e223,4.277918212681757e223,5.80313947435195e223,7.872153249434567e223,1.0678839799815541e224,1.448620420065062e224,1.965102165373326e224,2.6657269681328508e224,3.6161480017910166e224,4.9054259971784775e224,6.654374821460191e224,9.026882535779348e224,1.2245268789484532e225,1.6611117640267496e225,2.2533537973114e225,3.056749970603038e225,4.146583813838397e225,5.6249799592841906e225,7.630473894379958e225,1.0350993652290876e226,1.404146991036395e226,1.9047724679073942e226,2.5838877109437695e226,3.505130305721947e226,4.754826770549395e226,6.450081921641754e226,8.7497523681778e226,1.1869332426236504e227,1.6101147360112644e227,2.1841746191132184e227,2.9629060961190657e227,4.0192814519489955e227,5.45229003752072e227,7.3962142260119376e227,1.0033212558503268e228,1.3610389202909582e228,1.8462949247263905e228,2.504560963136964e228,3.3975209128623644e228,4.6088510214892126e228,6.252060924148629e228,8.481130246347508e228,1.1504937512315381e229,1.560683344289759e229,2.1171192790368748e229,2.8719432792495057e229,3.895887341301665e229,5.284901789593341e229,7.169146455942407e229,9.725187515870995e229,1.3192542905919687e230,1.7896126736941813e230,2.4276695893175623e230,3.2932151864631677e230,4.467356806739735e230,6.060119278192446e230,8.220754968691598e230,1.1151729718994072e231,1.5127695229830522e231,2.0521225741050873e231,2.783773069969753e231,3.776281496474034e231,5.122652451252247e231,6.949049789012221e231,9.426619008355002e231,1.278752471585054e232,1.7346705983722825e232,2.3531388221889875e232,3.192111702181071e232,4.330206540777484e232,5.874070344400062e232,7.968373352640353e232,1.0809365595628834e233,1.4663266818598727e233,1.989121303107203e233,2.6983097337196616e233,3.660347615659236e233,4.9653842551997275e233,6.735710208590375e233,9.137216715220457e233,1.2394940802892088e234,1.681415274426649e234,2.2808961898518383e234,3.094112149453766e234,4.19726686203031e234,5.693733213325793e234,7.72373998846573e234,1.0477512235699807e235,1.4213096610342192e235,1.928054205144538e235,2.615470168035421e235,3.547972967580358e235,4.8129442776775447e235,6.528920268472067e235,8.856699228738942e235,1.2014409428022203e236,1.6297949176797082e236,2.210871445332351e236,2.999121235906318e236,4.0684085031968577e236,5.518932529541676e236,7.486617000653474e236,1.0155846953092197e237,1.377674687053459e237,1.868861900060395e237,2.5351738217437577e237,3.439048281870309e237,4.665184289769459e237,6.328478891165213e237,8.584793780548128e237,1.1645560571816948e238,1.5797593337555255e238,2.1429964982768078e238,2.907046594692177e238,3.9435061655517596e238,5.349498321127944e238,7.256773816593411e238,9.844056968333843e238,1.3353793303331035e239,1.8114868307009679e239,2.457342616636773e239,3.3334676428212965e239,4.521960613268577e239,6.13419117236307e239,8.321235976421771e239,1.1288035574644382e240,1.5312598692726245e240,2.0772053487428446e240,2.817798694675509e240,3.822438397109513e240,5.185265834392656e240,7.033986942379075e240,9.541839104447791e240,1.2943824638998312e241,1.755873206948766e241,2.3819008715488407e241,3.2311283863960834e241,4.3831339809649457e241,5.945868191426415e241,8.065769539181964e241,1.094148678791703e242,1.4842493645351317e242,2.0134340230212306e242,2.7312907533759913e242,3.7050874745247986e242,5.026075373671224e242,6.8180397454899875e242,9.248899492154077e242,1.2546442234010482e243,1.70196695147241e243,2.3087752287670075e243,3.1319310003976672e243,4.248569401227192e243,5.7633268276836715e243,7.8181460594948e243,1.0605577236050488e244,1.4386821076747768e244,1.9516205114301705e244,2.64743865258134e244,3.591339288622601e244,4.871772146043895e244,6.608722244138618e244,8.964953284121446e244,1.2161259683408669e245,1.6497156471438096e245,2.2378945827005014e245,3.0357790277072567e245,4.1181360267413633e245,5.586389582364728e245,7.578124754330657e245,1.0279980288788996e246,1.3945137902023408e246,1.8917047080192463e246,2.5661608565538358e246,3.481083233442408e246,4.722206110815419e246,6.405830903091754e246,8.689724377982355e246,1.1787902445074991e247,1.5990684860695698e247,2.1691900107375443e247,2.9425789724927193e247,3.99170702727524e247,5.41488440600761e247,7.345472232826257e247,9.964379343602113e247,1.3517014639236232e248,1.8336283521222954e248,2.487378332747803e248,3.3742120986851924e248,4.577231833620946e248,6.209168435759923e248,8.422945147861107e248,1.142600747554083e249,1.5499762201854925e249,2.1025947062287553e249,2.8522402092934165e249,3.869159466353254e249,5.24864453116356e249,7.119962269343919e249,9.65846751783142e249,1.3102034991766976e250,1.77733497170791e250,2.411014474958516e250,3.270621965466026e250,4.4367083450107116e250,6.018543612355593e250,8.164356184143762e250,1.1075222876964043e251,1.5023911133695572e251,2.0380439135242178e251,2.7646748948993094e251,3.7503741817173313e251,5.087508310232118e251,6.901375583497606e251,9.3619473502784e251,1.2699795443527493e252,1.7227698284659103e252,2.3369950288331188e252,3.17021210526697e252,4.3004990033716105e252,5.833771073951744e252,7.91370604122871e252,1.073520755495636e253,1.4562668950249753e253,1.9754748650074538e253,2.6797978829352796e253,3.635235669453739e253,4.93131905828378e253,6.689499626925097e253,9.074530511964038e253,1.2309904866595745e254,1.669879864581813e254,2.2652480196682776e254,3.072884881988858e254,4.1684713620618807e254,5.654671152238437e254,7.670750993030155e254,1.040563088691505e255,1.4115587150865885e255,1.9148267200623737e255,2.5975266410649533e255,3.523631971681297e255,4.779924900699243e255,6.484128376613725e255,8.795937525767744e255,1.1931984140883737e256,1.6186136511452542e256,2.1957036824221142e256,2.9785456570135142e256,4.040497040624594e256,5.4810696948199145e256,7.435254795987346e256,1.0086172400526135e257,1.3682231004111065e257,1.8560405059119764e257,2.5177811707392724e257,3.4154545676874273e257,4.6331786254920646e257,6.285062134570755e257,8.525897494664326e257,1.1565665785495001e258,1.5689213381406175e258,2.1282943938772265e258,2.8871026971804547e258,3.9164515999502965e258,5.31279789587487e258,7.2069884593417805e258,9.776521462148813e258,1.3262179125037287e259,1.7990590602753755e259,2.440483929408686e259,3.3105982684028184e259,4.490937540164851e259,6.092107333637439e259,8.264147838313622e259,1.1210593601398946e260,1.5207546059746965e260,2.0629546068862233e260,2.798467085585735e260,3.796214421279192e260,5.149692132009976e260,6.985730022474957e260,9.476376974766102e260,1.2855023065442103e261,1.7438269757851841e261,2.365559755120921e261,3.208961114119416e261,4.353063332955339e261,5.905076349271378e261,8.0104340377365e261,1.0866422325062354e262,1.474066618492404e262,1.9996207866338028e262,2.7125526351223987e262,3.679668588911198e262,4.991593803158487e262,6.771264339081582e262,9.18544708519868e262,1.2460366916707787e263,1.6902905461094963e263,2.2929357934362476e263,3.110444275348346e263,4.2194219383470913e263,5.72378731710694e263,7.764509387821092e263,1.0532817292733913e264,1.4288119774333823e264,1.9382313488578176e264,2.629275804675132e264,3.5667007765213885e264,4.838349178363031e264,6.563382867961712e264,8.903448900317501e264,1.2077826924820559e265,1.6383977137298098e265,2.222541426586351e265,3.014951956717966e265,4.0898834067088465e265,5.548063956110694e265,7.526134757435743e265,1.0209454115016455e266,1.3849466782883937e266,1.8787265999668802e266,2.5485556178850417e266,3.457201136965416e266,4.6898092462879327e266,6.361883470242914e266,8.630108211968357e266,1.1707031117222177e267,1.5880980193221065e267,2.154308204805751e267,2.922391303827657e267,3.964321777931747e267,5.3777353971721755e267,7.295078356906218e267,9.896018361442566e267,1.3424280675108656e268,1.821048678994426e268,2.4703135844112004e268,3.351063195464357e268,4.545829570326024e268,6.166570212827438e268,8.365159230331435e268,1.1347618941116776e269,1.5393425526903007e269,2.0881697797737472e269,2.832672312956005e269,3.8426149589503276e269,5.212636016956697e269,7.071115512623866e269,9.59220525473332e269,1.3012148010406613e270,1.765141501336825e270,2.3944736236093676e270,3.2481837460725217e270,4.40627014815351e270,5.977253177867259e270,8.108344325481757e270,1.0999240912869987e271,1.4920839052077503e271,2.024061840099619e271,2.7457077435444677e271,3.724644605023464e271,5.0526052768535355e271,6.854028448581197e271,9.29771937443343e271,1.2612668041026273e272,1.7109507042186604e272,2.3209619905510518e272,3.1484627513235874e272,4.270995275591977e272,5.793748278094884e272,7.859413776869295e272,1.0661558278183834e273,1.4462761237187565e273,1.961922048786352e273,2.6614130333676893e273,3.610296004656168e273,4.89748756687405e273,6.643606074614071e273,9.012274369655192e273,1.222545232239274e274,1.6584235938304709e274,2.249707204317955e274,3.0518032449543486e274,4.139873414654604e274,5.615877077823308e274,7.618125530499811e274,1.033424268270382e275,1.4018746658538026e275,1.9016899826164177e275,2.579706216305352e275,3.499457968058324e275,4.747132054341935e275,6.439643781137289e275,8.73559268064083e275,1.1850124335384994e276,1.607509094091213e276,2.1806399784937722e276,2.9581112376182676e276,4.012777065643193e276,5.443466619435472e276,7.384244963569984e276,1.0016975852727782e277,1.3588363567181802e277,1.8433070733983383e277,2.5005078426413153e277,3.392022719027597e277,4.6013925372238166e277,6.241943240193365e277,8.467405268863921e277,1.1486319120222453e278,1.558157696983657e278,2.1136931537926123e278,2.867295625493501e278,3.889582643167712e278,5.2763492552066103e278,7.157544656320626e278,9.70944928572816e278,1.317119346910223e279,1.7867165510148843e279,2.423740901809472e279,3.287885790148062e279,4.460127301967731e279,6.05031221259799e279,8.207451355426151e279,1.1133682921590753e280,1.5103214144128834e280,2.0488016327556416e280,2.779268101693714e280,3.770170355976368e280,5.114362484289416e280,6.937804170902029e280,9.411363950374868e280,1.276683071827027e281,1.7318633882229013e281,2.349330747508822e281,3.1869459212099004e281,4.323198985705794e281,5.864564361013676e281,7.955478167484981e281,1.079187284465077e282,1.4639537315444132e282,1.9859023164504388e282,2.6939430704016923e282,3.6544240904747634e282,4.957348794697973e282,6.724809837027849e282,9.122429995757792e282,1.2374882122209133e283,1.6786942471447007e283,2.2772050251201333e283,3.0891049607474945e283,4.190474442682808e283,5.684519068761796e283,7.711240692457815e283,1.0460556521620189e284,1.4190095615747983e284,1.9249340431158983e284,2.6112375636389422e284,3.542231297817252e284,4.8051555101516636e284,6.518354544202532e284,8.842366469546353e284,1.1994966559667572e285,1.6271574274042554e285,2.207293601350826e285,2.9942677705971285e285,4.0618246147901937e285,5.51000126419128e285,7.474501439780715e285,1.0139411788590628e286,1.3754452018891452e286,1.865837528690658e286,2.5310711605877877e286,3.4334828844685554e286,4.657634641612428e286,6.318237540334632e286,8.57090104480123e286,1.1626714610018309e287,1.5772028158555508e287,2.1395284960374926e287,2.9023421333881107e287,3.9371244060743714e287,5.340841250445326e287,7.245030209980824e287,9.82812637225607e287,1.3332182915670675e288,1.8085553091653926e288,2.453365909393102e288,3.328073106125e288,4.5146427433856256e288,6.124264236532452e288,8.307769755164151e288,1.1269768194046904e289,1.5287818378526567e289,2.0738438160444683e289,2.8132386628738092e289,3.8162525610932573e289,5.17687454045408e289,7.0226038708308476e289,9.526397586269698e289,1.292287770190838e290,1.7530316847069073e290,2.378046251364636e290,3.2258994648889565e290,4.376040773638431e290,5.936246017886177e290,8.052716738186658e290,1.092378022576798e291,1.481847410017516e291,2.0101756911916378e291,2.7268707170126345e291,3.6990915470140706e291,5.017941696987722e291,6.807006140383413e291,9.233932036922216e291,1.252613837919736e292,1.699212665497558e292,2.3050389475038893e292,3.1268626096036294e292,4.241693959195817e292,5.754000060065625e292,7.805493986538347e292,1.0588414274918255e293,1.4363538944577039e293,1.9484622121471918e293,2.643154313720484e293,3.585527439324154e293,4.863888177625522e293,6.598027376666029e293,8.950445337846363e293,1.2141579167900675e294,1.6470459192356545e294,2.2342730072891825e294,3.0308662392474433e294,4.111471664492041e294,5.577349151548222e294,7.565861106845016e294,1.026334423983007e295,1.392257054388229e295,1.8886433702292548e295,2.5620080492094803e295,3.4754498110549355e295,4.714564184484166e295,6.395464373825627e295,8.675661833489995e295,1.1768826132020247e296,1.5964807202494407e296,2.1656796196469444e296,2.9378170092907787e296,3.9852472645451644e296,5.406121521298854e296,7.333585085938925e296,9.94825403032942e296,1.3495140111172976e297,1.8306609990555287e297,2.4833530188310844e297,3.3687516254065874e297,4.569824518554576e297,6.199120164538608e297,8.409314331078206e297,1.1407516815595166e298,1.5474679001732163e298,2.0991920860399506e298,2.8476244409328326e298,3.862898021827157e298,5.240150671745984e298,7.108440064284891e298,9.642837260381408e298,1.3080832023525656e299,1.7744587179824124e299,2.4071127403520955e299,3.2653291316656394e299,4.4295284385157e299,6.008803828486675e299,8.151143840794657e299,1.1057299890262104e300,1.4999598001361096e300,2.0347457556121055e300,2.760200833119834e300,3.74430496691841e300,5.0792752168852055e300,6.890207116354122e300,9.34679695017112e300,1.2679243417860437e301,1.7199818772825238e301,2.333213079585988e301,3.1650817643215784e301,4.293539523882538e301,5.82433030670626e301,7.900899323953969e301,1.0717834813624286e302,1.4539102244203325e302,1.9722779623241944e302,2.675461177267745e302,3.629352782826007e302,4.923338725347792e302,6.6786740377529474e302,9.059845237321017e302,1.2289983799211625e303,1.6671775050052043e303,2.2615821783047095e303,3.0679120452804397e303,4.161725542351127e303,5.645520221643964e303,7.658337448891165e303,1.03887914981205e304,1.4092743955420715e304,1.91172796401733e304,2.5933230746028665e304,3.5179296928496983e304,4.772189568292551e304,6.4736351388748e304,8.781703096984072e304,1.1912674661024001e305,1.6159942554666932e305,2.192150384367652e305,2.973725489077294e305,4.033958321220673e305,5.472199702736043e305,7.423222354354844e305,1.0069849990059423e306,1.3660089107099456e306,1.8530368833505818e306,2.5137066560374284e306,3.4099273518943194e306,4.625680771967211e306,6.274891044895163e306,8.512100070529701e306,1.1546949117093761e307,1.5663823593234623e307,2.1248501839917584e307,2.882430511002032e307,3.9101136227628773e307,5.304200217336416e307,7.195325420163898e307,9.760700158497263e307,1.3240716996217181e308,1.7961476505485224e308],"x":[100.0,100.30493256743257,100.60986513486513,100.9147977022977,101.21973026973026,101.52466283716284,101.82959540459541,102.13452797202797,102.43946053946054,102.74439310689311,103.04932567432567,103.35425824175825,103.6591908091908,103.96412337662338,104.26905594405595,104.57398851148851,104.87892107892108,105.18385364635364,105.48878621378621,105.79371878121879,106.09865134865134,106.40358391608392,106.70851648351649,107.01344905094905,107.31838161838162,107.62331418581418,107.92824675324675,108.23317932067933,108.53811188811189,108.84304445554446,109.14797702297702,109.45290959040959,109.75784215784216,110.06277472527472,110.3677072927073,110.67263986013987,110.97757242757243,111.282504995005,111.58743756243756,111.89237012987013,112.1973026973027,112.50223526473526,112.80716783216783,113.1121003996004,113.41703296703297,113.72196553446554,114.0268981018981,114.33183066933067,114.63676323676324,114.9416958041958,115.24662837162838,115.55156093906093,115.8564935064935,116.16142607392608,116.46635864135864,116.77129120879121,117.07622377622377,117.38115634365634,117.68608891108892,117.99102147852147,118.29595404595405,118.6008866133866,118.90581918081918,119.21075174825175,119.51568431568431,119.82061688311688,120.12554945054946,120.43048201798202,120.73541458541459,121.04034715284715,121.34527972027972,121.65021228771229,121.95514485514485,122.26007742257742,122.56500999000998,122.86994255744256,123.17487512487513,123.47980769230769,123.78474025974026,124.08967282717283,124.39460539460539,124.69953796203797,125.00447052947052,125.3094030969031,125.61433566433567,125.91926823176823,126.2242007992008,126.52913336663336,126.83406593406593,127.1389985014985,127.44393106893106,127.74886363636364,128.0537962037962,128.35872877122878,128.66366133866134,128.9685939060939,129.2735264735265,129.57845904095905,129.8833916083916,130.18832417582416,130.49325674325675,130.7981893106893,131.10312187812187,131.40805444555446,131.712987012987,132.01791958041957,132.32285214785216,132.62778471528472,132.93271728271728,133.23764985014984,133.54258241758242,133.84751498501498,134.15244755244754,134.45738011988013,134.7623126873127,135.06724525474525,135.37217782217783,135.6771103896104,135.98204295704295,136.28697552447554,136.5919080919081,136.89684065934065,137.2017732267732,137.5067057942058,137.81163836163836,138.11657092907092,138.4215034965035,138.72643606393606,139.03136863136862,139.3363011988012,139.64123376623377,139.94616633366633,140.2510989010989,140.55603146853147,140.86096403596403,141.1658966033966,141.47082917082918,141.77576173826174,142.0806943056943,142.38562687312688,142.69055944055944,142.995492007992,143.30042457542459,143.60535714285714,143.9102897102897,144.2152222777223,144.52015484515485,144.8250874125874,145.13001998001997,145.43495254745255,145.7398851148851,146.04481768231767,146.34975024975026,146.65468281718282,146.95961538461538,147.26454795204796,147.56948051948052,147.87441308691308,148.17934565434567,148.48427822177823,148.78921078921078,149.09414335664334,149.39907592407593,149.7040084915085,150.00894105894105,150.31387362637363,150.6188061938062,150.92373876123875,151.22867132867134,151.5336038961039,151.83853646353646,152.14346903096904,152.4484015984016,152.75333416583416,153.05826673326672,153.3631993006993,153.66813186813187,153.97306443556442,154.277997002997,154.58292957042957,154.88786213786213,155.19279470529472,155.49772727272727,155.80265984015983,156.10759240759242,156.41252497502498,156.71745754245754,157.0223901098901,157.32732267732268,157.63225524475524,157.9371878121878,158.2421203796204,158.54705294705295,158.8519855144855,159.1569180819181,159.46185064935065,159.7667832167832,160.0717157842158,160.37664835164836,160.68158091908091,160.98651348651347,161.29144605394606,161.59637862137862,161.90131118881118,162.20624375624377,162.51117632367632,162.81610889110888,163.12104145854147,163.42597402597403,163.7309065934066,164.03583916083917,164.34077172827173,164.6457042957043,164.95063686313685,165.25556943056944,165.560501998002,165.86543456543455,166.17036713286714,166.4752997002997,166.78023226773226,167.08516483516485,167.3900974025974,167.69502997002996,167.99996253746255,168.3048951048951,168.60982767232767,168.91476023976023,169.2196928071928,169.52462537462537,169.82955794205793,170.13449050949052,170.43942307692308,170.74435564435564,171.04928821178822,171.35422077922078,171.65915334665334,171.96408591408593,172.2690184815185,172.57395104895105,172.8788836163836,173.1838161838162,173.48874875124875,173.7936813186813,174.0986138861139,174.40354645354645,174.708479020979,175.0134115884116,175.31834415584416,175.62327672327672,175.9282092907093,176.23314185814186,176.53807442557442,176.84300699300698,177.14793956043957,177.45287212787213,177.75780469530469,178.06273726273727,178.36766983016983,178.6726023976024,178.97753496503498,179.28246753246754,179.5874000999001,179.89233266733268,180.19726523476524,180.5021978021978,180.80713036963036,181.11206293706294,181.4169955044955,181.72192807192806,182.02686063936065,182.3317932067932,182.63672577422577,182.94165834165835,183.2465909090909,183.55152347652347,183.85645604395606,184.16138861138862,184.46632117882118,184.77125374625373,185.07618631368632,185.38111888111888,185.68605144855144,185.99098401598403,186.29591658341658,186.60084915084914,186.90578171828173,187.2107142857143,187.51564685314685,187.82057942057943,188.125511988012,188.43044455544455,188.7353771228771,189.0403096903097,189.34524225774226,189.65017482517482,189.9551073926074,190.26003996003996,190.56497252747252,190.8699050949051,191.17483766233767,191.47977022977022,191.78470279720278,192.08963536463537,192.39456793206793,192.6995004995005,193.00443306693307,193.30936563436563,193.6142982017982,193.91923076923078,194.22416333666334,194.5290959040959,194.83402847152848,195.13896103896104,195.4438936063936,195.74882617382616,196.05375874125875,196.3586913086913,196.66362387612386,196.96855644355645,197.273489010989,197.57842157842157,197.88335414585416,198.18828671328671,198.49321928071927,198.79815184815186,199.10308441558442,199.40801698301698,199.71294955044954,200.01788211788212,200.32281468531468,200.62774725274724,200.93267982017983,201.2376123876124,201.54254495504495,201.84747752247753,202.1524100899101,202.45734265734265,202.76227522477524,203.0672077922078,203.37214035964035,203.6770729270729,203.9820054945055,204.28693806193806,204.59187062937062,204.8968031968032,205.20173576423576,205.50666833166832,205.8116008991009,206.11653346653347,206.42146603396603,206.7263986013986,207.03133116883117,207.33626373626373,207.6411963036963,207.94612887112888,208.25106143856144,208.555994005994,208.86092657342658,209.16585914085914,209.4707917082917,209.7757242757243,210.08065684315685,210.3855894105894,210.690521978022,210.99545454545455,211.3003871128871,211.60531968031967,211.91025224775225,212.2151848151848,212.52011738261737,212.82504995004996,213.12998251748252,213.43491508491508,213.73984765234766,214.04478021978022,214.34971278721278,214.65464535464537,214.95957792207793,215.26451048951049,215.56944305694304,215.87437562437563,216.1793081918082,216.48424075924075,216.78917332667334,217.0941058941059,217.39903846153845,217.70397102897104,218.0089035964036,218.31383616383616,218.61876873126874,218.9237012987013,219.22863386613386,219.53356643356642,219.838499000999,220.14343156843157,220.44836413586413,220.7532967032967,221.05822927072927,221.36316183816183,221.66809440559442,221.97302697302698,222.27795954045953,222.58289210789212,222.88782467532468,223.19275724275724,223.4976898101898,223.80262237762238,224.10755494505494,224.4124875124875,224.7174200799201,225.02235264735265,225.3272852147852,225.6322177822178,225.93715034965035,226.2420829170829,226.5470154845155,226.85194805194806,227.15688061938062,227.46181318681317,227.76674575424576,228.07167832167832,228.37661088911088,228.68154345654347,228.98647602397602,229.29140859140858,229.59634115884117,229.90127372627373,230.2062062937063,230.51113886113887,230.81607142857143,231.121003996004,231.42593656343655,231.73086913086914,232.0358016983017,232.34073426573426,232.64566683316684,232.9505994005994,233.25553196803196,233.56046453546455,233.8653971028971,234.17032967032966,234.47526223776225,234.7801948051948,235.08512737262737,235.39005994005993,235.69499250749251,235.99992507492507,236.30485764235763,236.60979020979022,236.91472277722278,237.21965534465534,237.52458791208792,237.82952047952048,238.13445304695304,238.43938561438563,238.7443181818182,239.04925074925075,239.3541833166833,239.6591158841159,239.96404845154845,240.268981018981,240.5739135864136,240.87884615384615,241.1837787212787,241.4887112887113,241.79364385614386,242.09857642357642,242.403508991009,242.70844155844156,243.01337412587412,243.31830669330668,243.62323926073927,243.92817182817183,244.23310439560439,244.53803696303697,244.84296953046953,245.1479020979021,245.45283466533468,245.75776723276724,246.0626998001998,246.36763236763238,246.67256493506494,246.9774975024975,247.28243006993006,247.58736263736265,247.8922952047952,248.19722777222776,248.50216033966035,248.8070929070929,249.11202547452547,249.41695804195805,249.7218906093906,250.02682317682317,250.33175574425573,250.63668831168832,250.94162087912088,251.24655344655343,251.55148601398602,251.85641858141858,252.16135114885114,252.46628371628373,252.77121628371629,253.07614885114884,253.38108141858143,253.686013986014,253.99094655344655,254.2958791208791,254.6008116883117,254.90574425574425,255.2106768231768,255.5156093906094,255.82054195804196,256.12547452547454,256.4304070929071,256.73533966033966,257.0402722277722,257.3452047952048,257.65013736263734,257.95506993006995,258.2600024975025,258.56493506493507,258.86986763236763,259.1748001998002,259.47973276723275,259.78466533466536,260.0895979020979,260.3945304695305,260.69946303696304,261.0043956043956,261.30932817182816,261.6142607392607,261.91919330669333,262.2241258741259,262.52905844155845,262.833991008991,263.13892357642357,263.4438561438561,263.74878871128874,264.0537212787213,264.35865384615386,264.6635864135864,264.968518981019,265.27345154845153,265.5783841158841,265.8833166833167,266.18824925074927,266.4931818181818,266.7981143856144,267.10304695304694,267.4079795204795,267.7129120879121,268.0178446553447,268.32277722277723,268.6277097902098,268.93264235764235,269.2375749250749,269.54250749250747,269.8474400599401,270.15237262737264,270.4573051948052,270.76223776223776,271.0671703296703,271.3721028971029,271.6770354645355,271.98196803196805,272.2869005994006,272.59183316683317,272.8967657342657,273.2016983016983,273.50663086913084,273.81156343656346,274.116496003996,274.4214285714286,274.72636113886114,275.0312937062937,275.33622627372625,275.64115884115887,275.9460914085914,276.251023976024,276.55595654345655,276.8608891108891,277.16582167832166,277.4707542457542,277.77568681318684,278.0806193806194,278.38555194805195,278.6904845154845,278.9954170829171,279.30034965034963,279.6052822177822,279.9102147852148,280.21514735264736,280.5200799200799,280.8250124875125,281.12994505494504,281.4348776223776,281.7398101898102,282.0447427572428,282.34967532467533,282.6546078921079,282.95954045954045,283.264473026973,283.56940559440557,283.8743381618382,284.17927072927074,284.4842032967033,284.78913586413586,285.0940684315684,285.399000999001,285.7039335664336,286.00886613386615,286.3137987012987,286.61873126873127,286.9236638361638,287.2285964035964,287.53352897102894,287.83846153846156,288.1433941058941,288.4483266733267,288.75325924075923,289.0581918081918,289.36312437562435,289.66805694305697,289.9729895104895,290.2779220779221,290.58285464535464,290.8877872127872,291.19271978021976,291.4976523476523,291.80258491508494,292.1075174825175,292.41245004995005,292.7173826173826,293.02231518481517,293.32724775224773,293.63218031968034,293.9371128871129,294.24204545454546,294.546978021978,294.8519105894106,295.15684315684314,295.4617757242757,295.7667082917083,296.07164085914087,296.37657342657343,296.681505994006,296.98643856143855,297.2913711288711,297.5963036963037,297.9012362637363,298.20616883116884,298.5111013986014,298.81603396603396,299.1209665334665,299.4258991008991,299.7308316683317,300.03576423576425,300.3406968031968,300.64562937062936,300.9505619380619,301.2554945054945,301.5604270729271,301.86535964035966,302.1702922077922,302.4752247752248,302.78015734265733,303.0850899100899,303.39002247752245,303.69495504495507,303.9998876123876,304.3048201798202,304.60975274725274,304.9146853146853,305.21961788211786,305.5245504495505,305.82948301698303,306.1344155844156,306.43934815184815,306.7442807192807,307.04921328671327,307.3541458541458,307.65907842157844,307.964010989011,308.26894355644356,308.5738761238761,308.8788086913087,309.18374125874124,309.48867382617385,309.7936063936064,310.09853896103897,310.4034715284715,310.7084040959041,311.01333666333664,311.3182692307692,311.6232017982018,311.9281343656344,312.23306693306694,312.5379995004995,312.84293206793205,313.1478646353646,313.4527972027972,313.7577297702298,314.06266233766235,314.3675949050949,314.67252747252746,314.97746003996,315.2823926073926,315.5873251748252,315.89225774225775,316.1971903096903,316.5021228771229,316.80705544455543,317.111988011988,317.4169205794206,317.72185314685316,318.0267857142857,318.3317182817183,318.63665084915084,318.9415834165834,319.24651598401596,319.5514485514486,319.85638111888113,320.1613136863137,320.46624625374625,320.7711788211788,321.07611138861137,321.381043956044,321.68597652347654,321.9909090909091,322.29584165834166,322.6007742257742,322.9057067932068,323.21063936063933,323.51557192807195,323.8205044955045,324.12543706293707,324.4303696303696,324.7353021978022,325.04023476523474,325.34516733266736,325.6500999000999,325.9550324675325,326.25996503496503,326.5648976023976,326.86983016983015,327.1747627372627,327.4796953046953,327.7846278721279,328.08956043956044,328.394493006993,328.69942557442556,329.0043581418581,329.30929070929074,329.6142232767233,329.91915584415585,330.2240884115884,330.52902097902097,330.83395354645353,331.1388861138861,331.4438186813187,331.74875124875126,332.0536838161838,332.3586163836164,332.66354895104894,332.9684815184815,333.2734140859141,333.57834665334667,333.88327922077923,334.1882117882118,334.49314435564435,334.7980769230769,335.10300949050946,335.4079420579421,335.71287462537464,336.0178071928072,336.32273976023976,336.6276723276723,336.9326048951049,337.2375374625375,337.54247002997005,337.8474025974026,338.15233516483516,338.4572677322677,338.7622002997003,339.06713286713284,339.37206543456546,339.676998001998,339.9819305694306,340.28686313686313,340.5917957042957,340.89672827172825,341.20166083916087,341.5065934065934,341.811525974026,342.11645854145854,342.4213911088911,342.72632367632366,343.0312562437562,343.33618881118883,343.6411213786214,343.94605394605395,344.2509865134865,344.55591908091907,344.8608516483516,345.16578421578424,345.4707167832168,345.77564935064936,346.0805819180819,346.3855144855145,346.69044705294704,346.9953796203796,347.3003121878122,347.60524475524477,347.9101773226773,348.2151098901099,348.52004245754244,348.824975024975,349.1299075924076,349.4348401598402,349.73977272727274,350.0447052947053,350.34963786213785,350.6545704295704,350.95950299700297,351.2644355644356,351.56936813186815,351.8743006993007,352.17923326673326,352.4841658341658,352.7890984015984,353.094030969031,353.39896353646355,353.7038961038961,354.0088286713287,354.31376123876123,354.6186938061938,354.92362637362635,355.22855894105896,355.5334915084915,355.8384240759241,356.14335664335664,356.4482892107892,356.75322177822176,357.0581543456544,357.36308691308693,357.6680194805195,357.97295204795205,358.2778846153846,358.58281718281717,358.8877497502497,359.19268231768234,359.4976148851149,359.80254745254746,360.10748001998,360.4124125874126,360.71734515484513,361.02227772227775,361.3272102897103,361.63214285714287,361.9370754245754,362.242007992008,362.54694055944054,362.8518731268731,363.1568056943057,363.4617382617383,363.76667082917083,364.0716033966034,364.37653596403595,364.6814685314685,364.9864010989011,365.2913336663337,365.59626623376624,365.9011988011988,366.20613136863136,366.5110639360639,366.8159965034965,367.1209290709291,367.42586163836165,367.7307942057942,368.03572677322677,368.34065934065933,368.6455919080919,368.9505244755245,369.25545704295706,369.5603896103896,369.8653221778222,370.17025474525474,370.4751873126873,370.78011988011986,371.08505244755247,371.38998501498503,371.6949175824176,371.99985014985015,372.3047827172827,372.60971528471526,372.9146478521479,373.21958041958044,373.524512987013,373.82944555444556,374.1343781218781,374.4393106893107,374.74424325674323,375.04917582417585,375.3541083916084,375.65904095904096,375.9639735264735,376.2689060939061,376.57383866133864,376.87877122877126,377.1837037962038,377.4886363636364,377.79356893106893,378.0985014985015,378.40343406593405,378.7083666333666,379.0132992007992,379.3182317682318,379.62316433566434,379.9280969030969,380.23302947052946,380.537962037962,380.84289460539463,381.1478271728272,381.45275974025975,381.7576923076923,382.06262487512487,382.3675574425574,382.67249000999,382.9774225774226,383.28235514485516,383.5872877122877,383.8922202797203,384.19715284715284,384.5020854145854,384.807017982018,385.11195054945057,385.4168831168831,385.7218156843157,386.02674825174824,386.3316808191808,386.63661338661336,386.941545954046,387.24647852147854,387.5514110889111,387.85634365634365,388.1612762237762,388.46620879120877,388.7711413586414,389.07607392607395,389.3810064935065,389.68593906093906,389.9908716283716,390.2958041958042,390.60073676323674,390.90566933066935,391.2106018981019,391.5155344655345,391.82046703296703,392.1253996003996,392.43033216783215,392.73526473526476,393.0401973026973,393.3451298701299,393.65006243756244,393.954995004995,394.25992757242756,394.5648601398601,394.86979270729273,395.1747252747253,395.47965784215785,395.7845904095904,396.08952297702297,396.3944555444555,396.6993881118881,397.0043206793207,397.30925324675326,397.6141858141858,397.9191183816184,398.22405094905093,398.5289835164835,398.8339160839161,399.13884865134867,399.4437812187812,399.7487137862138,400.05364635364634,400.3585789210789,400.66351148851146,400.9684440559441,401.27337662337663,401.5783091908092,401.88324175824175,402.1881743256743,402.49310689310687,402.7980394605395,403.10297202797204,403.4079045954046,403.71283716283716,404.0177697302697,404.3227022977023,404.62763486513484,404.93256743256745,405.2375,405.54243256743257,405.84736513486513,406.1522977022977,406.45723026973025,406.76216283716286,407.0670954045954,407.372027972028,407.67696053946054,407.9818931068931,408.28682567432566,408.5917582417582,408.89669080919083,409.2016233766234,409.50655594405595,409.8114885114885,410.11642107892106,410.4213536463536,410.72628621378624,411.0312187812188,411.33615134865136,411.6410839160839,411.9460164835165,412.25094905094903,412.5558816183816,412.8608141858142,413.16574675324676,413.4706793206793,413.7756118881119,414.08054445554444,414.385477022977,414.6904095904096,414.9953421578422,415.30027472527473,415.6052072927073,415.91013986013985,416.2150724275724,416.52000499500497,416.8249375624376,417.12987012987014,417.4348026973027,417.73973526473526,418.0446678321678,418.3496003996004,418.654532967033,418.95946553446555,419.2643981018981,419.56933066933067,419.8742632367632,420.1791958041958,420.48412837162834,420.78906093906096,421.0939935064935,421.3989260739261,421.70385864135864,422.0087912087912,422.31372377622375,422.61865634365637,422.9235889110889,423.2285214785215,423.53345404595404,423.8383866133866,424.14331918081916,424.4482517482517,424.75318431568434,425.0581168831169,425.36304945054945,425.667982017982,425.97291458541457,426.27784715284713,426.58277972027975,426.8877122877123,427.19264485514486,427.4975774225774,427.80250999001,428.10744255744254,428.4123751248751,428.7173076923077,429.0222402597403,429.32717282717283,429.6321053946054,429.93703796203795,430.2419705294705,430.5469030969031,430.8518356643357,431.15676823176824,431.4617007992008,431.76663336663336,432.0715659340659,432.3764985014985,432.6814310689311,432.98636363636365,433.2912962037962,433.59622877122877,433.9011613386613,434.2060939060939,434.5110264735265,434.81595904095906,435.1208916083916,435.4258241758242,435.73075674325673,436.0356893106893,436.34062187812185,436.64555444555447,436.950487012987,437.2554195804196,437.56035214785214,437.8652847152847,438.17021728271726,438.4751498501499,438.78008241758243,439.085014985015,439.38994755244755,439.6948801198801,439.99981268731267,440.3047452547452,440.60967782217784,440.9146103896104,441.21954295704296,441.5244755244755,441.8294080919081,442.13434065934064,442.43927322677325,442.7442057942058,443.04913836163837,443.35407092907093,443.6590034965035,443.96393606393605,444.2688686313686,444.5738011988012,444.8787337662338,445.18366633366634,445.4885989010989,445.79353146853146,446.098464035964,446.40339660339663,446.7083291708292,447.01326173826175,447.3181943056943,447.62312687312686,447.9280594405594,448.232992007992,448.5379245754246,448.84285714285716,449.1477897102897,449.4527222777223,449.75765484515483,450.0625874125874,450.36751998002,450.67245254745256,450.9773851148851,451.2823176823177,451.58725024975024,451.8921828171828,452.19711538461536,452.502047952048,452.80698051948053,453.1119130869131,453.41684565434565,453.7217782217782,454.02671078921077,454.3316433566434,454.63657592407594,454.9415084915085,455.24644105894106,455.5513736263736,455.8563061938062,456.16123876123874,456.46617132867135,456.7711038961039,457.07603646353647,457.380969030969,457.6859015984016,457.99083416583414,458.29576673326676,458.6006993006993,458.9056318681319,459.21056443556444,459.515497002997,459.82042957042955,460.1253621378621,460.4302947052947,460.7352272727273,461.04015984015984,461.3450924075924,461.65002497502496,461.9549575424575,462.25989010989014,462.5648226773227,462.86975524475525,463.1746878121878,463.47962037962037,463.78455294705293,464.0894855144855,464.3944180819181,464.69935064935066,465.0042832167832,465.3092157842158,465.61414835164834,465.9190809190809,466.2240134865135,466.5289460539461,466.83387862137863,467.1388111888112,467.44374375624375,467.7486763236763,468.05360889110887,468.3585414585415,468.66347402597404,468.9684065934066,469.27333916083916,469.5782717282717,469.8832042957043,470.1881368631369,470.49306943056945,470.798001998002,471.10293456543457,471.4078671328671,471.7127997002997,472.01773226773224,472.32266483516486,472.6275974025974,472.93252997003,473.23746253746253,473.5423951048951,473.84732767232765,474.15226023976027,474.4571928071928,474.7621253746254,475.06705794205794,475.3719905094905,475.67692307692306,475.9818556443556,476.28678821178823,476.5917207792208,476.89665334665335,477.2015859140859,477.50651848151847,477.811451048951,478.11638361638364,478.4213161838162,478.72624875124876,479.0311813186813,479.3361138861139,479.64104645354644,479.945979020979,480.2509115884116,480.55584415584417,480.86077672327673,481.1657092907093,481.47064185814185,481.7755744255744,482.080506993007,482.3854395604396,482.69037212787214,482.9953046953047,483.30023726273726,483.6051698301698,483.9101023976024,484.215034965035,484.51996753246755,484.8249000999001,485.12983266733266,485.4347652347652,485.7396978021978,486.0446303696304,486.34956293706296,486.6544955044955,486.9594280719281,487.26436063936063,487.5692932067932,487.87422577422575,488.17915834165836,488.4840909090909,488.7890234765235,489.09395604395604,489.3988886113886,489.70382117882116,490.0087537462538,490.31368631368633,490.6186188811189,490.92355144855145,491.228484015984,491.53341658341657,491.8383491508491,492.14328171828174,492.4482142857143,492.75314685314686,493.0580794205794,493.363011988012,493.66794455544454,493.97287712287715,494.2778096903097,494.58274225774227,494.8876748251748,495.1926073926074,495.49753996003994,495.8024725274725,496.1074050949051,496.4123376623377,496.71727022977024,497.0222027972028,497.32713536463535,497.6320679320679,497.9370004995005,498.2419330669331,498.54686563436564,498.8517982017982,499.15673076923076,499.4616633366633,499.7665959040959,500.0715284715285,500.37646103896105,500.6813936063936,500.98632617382617,501.29125874125873,501.5961913086913,501.9011238761239,502.20605644355646,502.510989010989,502.8159215784216,503.12085414585414,503.4257867132867,503.73071928071926,504.0356518481519,504.34058441558443,504.645516983017,504.95044955044955,505.2553821178821,505.56031468531467,505.8652472527473,506.17017982017984,506.4751123876124,506.78004495504496,507.0849775224775,507.3899100899101,507.69484265734263,507.99977522477525,508.3047077922078,508.60964035964037,508.9145729270729,509.2195054945055,509.52443806193804,509.82937062937066,510.1343031968032,510.4392357642358,510.74416833166833,511.0491008991009,511.35403346653345,511.658966033966,511.9638986013986,512.2688311688312,512.5737637362637,512.8786963036963,513.1836288711289,513.4885614385614,513.793494005994,514.0984265734265,514.4033591408592,514.7082917082917,515.0132242757243,515.3181568431569,515.6230894105894,515.928021978022,516.2329545454545,516.5378871128871,516.8428196803197,517.1477522477522,517.4526848151849,517.7576173826174,518.06254995005,518.3674825174825,518.6724150849151,518.9773476523477,519.2822802197802,519.5872127872128,519.8921453546453,520.1970779220779,520.5020104895104,520.806943056943,521.1118756243757,521.4168081918082,521.7217407592408,522.0266733266733,522.3316058941059,522.6365384615384,522.941471028971,523.2464035964036,523.5513361638361,523.8562687312688,524.1612012987013,524.4661338661339,524.7710664335665,525.075999000999,525.3809315684316,525.6858641358641,525.9907967032967,526.2957292707292,526.6006618381618,526.9055944055945,527.210526973027,527.5154595404596,527.8203921078921,528.1253246753247,528.4302572427572,528.7351898101898,529.0401223776224,529.3450549450549,529.6499875124875,529.95492007992,530.2598526473527,530.5647852147852,530.8697177822178,531.1746503496504,531.4795829170829,531.7845154845155,532.089448051948,532.3943806193806,532.6993131868132,533.0042457542457,533.3091783216784,533.6141108891109,533.9190434565435,534.223976023976,534.5289085914086,534.8338411588412,535.1387737262737,535.4437062937063,535.7486388611388,536.0535714285714,536.358503996004,536.6634365634366,536.9683691308692,537.2733016983017,537.5782342657343,537.8831668331668,538.1880994005994,538.4930319680319,538.7979645354645,539.1028971028971,539.4078296703296,539.7127622377623,540.0176948051948,540.3226273726274,540.62755994006,540.9324925074925,541.2374250749251,541.5423576423576,541.8472902097902,542.1522227772227,542.4571553446553,542.762087912088,543.0670204795205,543.3719530469531,543.6768856143856,543.9818181818182,544.2867507492507,544.5916833166833,544.8966158841159,545.2015484515484,545.506481018981,545.8114135864136,546.1163461538462,546.4212787212787,546.7262112887113,547.0311438561439,547.3360764235764,547.641008991009,547.9459415584415,548.2508741258741,548.5558066933067,548.8607392607393,549.1656718281719,549.4706043956044,549.775536963037,550.0804695304695,550.3854020979021,550.6903346653347,550.9952672327672,551.3001998001998,551.6051323676323,551.910064935065,552.2149975024975,552.5199300699301,552.8248626373627,553.1297952047952,553.4347277722278,553.7396603396603,554.0445929070929,554.3495254745254,554.654458041958,554.9593906093907,555.2643231768232,555.5692557442558,555.8741883116883,556.1791208791209,556.4840534465535,556.788986013986,557.0939185814186,557.3988511488511,557.7037837162837,558.0087162837162,558.3136488511489,558.6185814185815,558.923513986014,559.2284465534466,559.5333791208791,559.8383116883117,560.1432442557442,560.4481768231768,560.7531093906094,561.0580419580419,561.3629745254746,561.6679070929071,561.9728396603397,562.2777722277722,562.5827047952048,562.8876373626374,563.1925699300699,563.4975024975025,563.802435064935,564.1073676323676,564.4123001998003,564.7172327672328,565.0221653346654,565.3270979020979,565.6320304695305,565.936963036963,566.2418956043956,566.5468281718282,566.8517607392607,567.1566933066933,567.4616258741258,567.7665584415585,568.071491008991,568.3764235764236,568.6813561438562,568.9862887112887,569.2912212787213,569.5961538461538,569.9010864135864,570.2060189810189,570.5109515484515,570.8158841158842,571.1208166833167,571.4257492507493,571.7306818181818,572.0356143856144,572.3405469530469,572.6454795204795,572.9504120879121,573.2553446553446,573.5602772227772,573.8652097902097,574.1701423576424,574.475074925075,574.7800074925075,575.0849400599401,575.3898726273726,575.6948051948052,575.9997377622377,576.3046703296703,576.609602897103,576.9145354645354,577.2194680319681,577.5244005994006,577.8293331668332,578.1342657342657,578.4391983016983,578.7441308691309,579.0490634365634,579.353996003996,579.6589285714285,579.9638611388611,580.2687937062936,580.5737262737263,580.8786588411589,581.1835914085914,581.488523976024,581.7934565434565,582.0983891108891,582.4033216783217,582.7082542457542,583.0131868131868,583.3181193806194,583.623051948052,583.9279845154845,584.2329170829171,584.5378496503497,584.8427822177822,585.1477147852148,585.4526473526473,585.7575799200799,586.0625124875124,586.367445054945,586.6723776223777,586.9773101898102,587.2822427572428,587.5871753246753,587.8921078921079,588.1970404595404,588.501973026973,588.8069055944056,589.1118381618381,589.4167707292708,589.7217032967033,590.0266358641359,590.3315684315685,590.636500999001,590.9414335664336,591.2463661338661,591.5512987012987,591.8562312687312,592.1611638361638,592.4660964035965,592.771028971029,593.0759615384616,593.3808941058941,593.6858266733267,593.9907592407592,594.2956918081918,594.6006243756244,594.9055569430569,595.2104895104895,595.515422077922,595.8203546453547,596.1252872127872,596.4302197802198,596.7351523476524,597.0400849150849,597.3450174825175,597.64995004995,597.9548826173826,598.2598151848152,598.5647477522477,598.8696803196804,599.1746128871129,599.4795454545455,599.784478021978,600.0894105894106,600.3943431568432,600.6992757242757,601.0042082917083,601.3091408591408,601.6140734265734,601.9190059940059,602.2239385614386,602.5288711288712,602.8338036963037,603.1387362637363,603.4436688311688,603.7486013986014,604.0535339660339,604.3584665334665,604.6633991008991,604.9683316683316,605.2732642357643,605.5781968031968,605.8831293706294,606.188061938062,606.4929945054945,606.7979270729271,607.1028596403596,607.4077922077922,607.7127247752247,608.0176573426573,608.32258991009,608.6275224775225,608.9324550449551,609.2373876123876,609.5423201798202,609.8472527472527,610.1521853146853,610.4571178821179,610.7620504495504,611.066983016983,611.3719155844155,611.6768481518482,611.9817807192807,612.2867132867133,612.5916458541459,612.8965784215784,613.201510989011,613.5064435564435,613.8113761238761,614.1163086913087,614.4212412587412,614.7261738261739,615.0311063936064,615.336038961039,615.6409715284715,615.9459040959041,616.2508366633367,616.5557692307692,616.8607017982018,617.1656343656343,617.470566933067,617.7754995004994,618.0804320679321,618.3853646353647,618.6902972027972,618.9952297702298,619.3001623376623,619.6050949050949,619.9100274725274,620.21496003996,620.5198926073926,620.8248251748252,621.1297577422578,621.4346903096903,621.7396228771229,622.0445554445555,622.349488011988,622.6544205794206,622.9593531468531,623.2642857142857,623.5692182817182,623.8741508491509,624.1790834165835,624.484015984016,624.7889485514486,625.0938811188811,625.3988136863137,625.7037462537462,626.0086788211788,626.3136113886114,626.6185439560439,626.9234765234766,627.228409090909,627.5333416583417,627.8382742257742,628.1432067932068,628.4481393606394,628.7530719280719,629.0580044955045,629.362937062937,629.6678696303696,629.9728021978023,630.2777347652348,630.5826673326674,630.8875999000999,631.1925324675325,631.497465034965,631.8023976023976,632.1073301698302,632.4122627372627,632.7171953046953,633.0221278721278,633.3270604395605,633.631993006993,633.9369255744256,634.2418581418582,634.5467907092907,634.8517232767233,635.1566558441558,635.4615884115884,635.7665209790209,636.0714535464535,636.3763861138862,636.6813186813187,636.9862512487513,637.2911838161838,637.5961163836164,637.901048951049,638.2059815184815,638.5109140859141,638.8158466533466,639.1207792207792,639.4257117882117,639.7306443556444,640.035576923077,640.3405094905095,640.6454420579421,640.9503746253746,641.2553071928072,641.5602397602397,641.8651723276723,642.1701048951049,642.4750374625374,642.7799700299701,643.0849025974026,643.3898351648352,643.6947677322677,643.9997002997003,644.3046328671329,644.6095654345654,644.914498001998,645.2194305694305,645.5243631368631,645.8292957042958,646.1342282717283,646.4391608391609,646.7440934065934,647.049025974026,647.3539585414585,647.6588911088911,647.9638236763237,648.2687562437562,648.5736888111888,648.8786213786213,649.183553946054,649.4884865134865,649.7934190809191,650.0983516483517,650.4032842157842,650.7082167832168,651.0131493506493,651.3180819180819,651.6230144855144,651.927947052947,652.2328796203797,652.5378121878122,652.8427447552448,653.1476773226773,653.4526098901099,653.7575424575425,654.062475024975,654.3674075924076,654.6723401598401,654.9772727272727,655.2822052947052,655.5871378621379,655.8920704295705,656.197002997003,656.5019355644356,656.8068681318681,657.1118006993007,657.4167332667332,657.7216658341658,658.0265984015984,658.331530969031,658.6364635364636,658.9413961038961,659.2463286713287,659.5512612387612,659.8561938061938,660.1611263736264,660.4660589410589,660.7709915084915,661.075924075924,661.3808566433567,661.6857892107893,661.9907217782218,662.2956543456544,662.6005869130869,662.9055194805195,663.210452047952,663.5153846153846,663.8203171828172,664.1252497502497,664.4301823176824,664.7351148851149,665.0400474525475,665.34498001998,665.6499125874126,665.9548451548452,666.2597777222777,666.5647102897103,666.8696428571428,667.1745754245754,667.4795079920079,667.7844405594406,668.0893731268732,668.3943056943057,668.6992382617383,669.0041708291708,669.3091033966034,669.614035964036,669.9189685314685,670.2239010989011,670.5288336663336,670.8337662337663,671.1386988011988,671.4436313686314,671.748563936064,672.0534965034965,672.3584290709291,672.6633616383616,672.9682942057942,673.2732267732267,673.5781593406593,673.883091908092,674.1880244755245,674.4929570429571,674.7978896103896,675.1028221778222,675.4077547452547,675.7126873126873,676.0176198801199,676.3225524475524,676.627485014985,676.9324175824175,677.2373501498502,677.5422827172828,677.8472152847153,678.1521478521479,678.4570804195804,678.762012987013,679.0669455544455,679.3718781218781,679.6768106893107,679.9817432567432,680.2866758241759,680.5916083916084,680.896540959041,681.2014735264735,681.5064060939061,681.8113386613387,682.1162712287712,682.4212037962038,682.7261363636363,683.031068931069,683.3360014985014,683.6409340659341,683.9458666333667,684.2507992007992,684.5557317682318,684.8606643356643,685.1655969030969,685.4705294705295,685.775462037962,686.0803946053946,686.3853271728271,686.6902597402598,686.9951923076923,687.3001248751249,687.6050574425575,687.90999000999,688.2149225774226,688.5198551448551,688.8247877122877,689.1297202797202,689.4346528471528,689.7395854145855,690.044517982018,690.3494505494506,690.6543831168831,690.9593156843157,691.2642482517482,691.5691808191808,691.8741133866134,692.1790459540459,692.4839785214785,692.788911088911,693.0938436563437,693.3987762237762,693.7037087912088,694.0086413586414,694.3135739260739,694.6185064935065,694.923439060939,695.2283716283716,695.5333041958042,695.8382367632368,696.1431693306694,696.4481018981019,696.7530344655345,697.057967032967,697.3628996003996,697.6678321678322,697.9727647352647,698.2776973026973,698.5826298701298,698.8875624375625,699.192495004995,699.4974275724276,699.8023601398602,700.1072927072927,700.4122252747253,700.7171578421578,701.0220904095904,701.3270229770229,701.6319555444555,701.9368881118882,702.2418206793207,702.5467532467533,702.8516858141858,703.1566183816184,703.461550949051,703.7664835164835,704.0714160839161,704.3763486513486,704.6812812187812,704.9862137862137,705.2911463536464,705.596078921079,705.9010114885115,706.2059440559441,706.5108766233766,706.8158091908092,707.1207417582417,707.4256743256743,707.7306068931069,708.0355394605394,708.340472027972,708.6454045954046,708.9503371628372,709.2552697302697,709.5602022977023,709.8651348651349,710.1700674325674,710.475]}
},{}],77:[function(require,module,exports){
module.exports={"expected":[-1.0e-200,-9.995004995054944e-201,-9.99000999010989e-201,-9.985014985164835e-201,-9.980019980219779e-201,-9.975024975274725e-201,-9.97002997032967e-201,-9.965034965384615e-201,-9.96003996043956e-201,-9.955044955494505e-201,-9.950049950549451e-201,-9.945054945604396e-201,-9.940059940659339e-201,-9.935064935714285e-201,-9.93006993076923e-201,-9.925074925824176e-201,-9.920079920879122e-201,-9.915084915934067e-201,-9.910089910989011e-201,-9.905094906043957e-201,-9.9000999010989e-201,-9.895104896153845e-201,-9.890109891208791e-201,-9.885114886263736e-201,-9.880119881318681e-201,-9.875124876373627e-201,-9.870129871428572e-201,-9.865134866483516e-201,-9.860139861538461e-201,-9.855144856593406e-201,-9.850149851648352e-201,-9.845154846703296e-201,-9.840159841758241e-201,-9.835164836813187e-201,-9.830169831868132e-201,-9.825174826923075e-201,-9.820179821978021e-201,-9.815184817032966e-201,-9.81018981208791e-201,-9.805194807142857e-201,-9.800199802197803e-201,-9.795204797252748e-201,-9.790209792307694e-201,-9.785214787362637e-201,-9.780219782417582e-201,-9.775224777472528e-201,-9.770229772527472e-201,-9.765234767582419e-201,-9.760239762637363e-201,-9.755244757692308e-201,-9.750249752747253e-201,-9.745254747802197e-201,-9.740259742857142e-201,-9.735264737912088e-201,-9.730269732967033e-201,-9.725274728021977e-201,-9.720279723076924e-201,-9.715284718131868e-201,-9.710289713186811e-201,-9.705294708241758e-201,-9.700299703296702e-201,-9.695304698351647e-201,-9.690309693406593e-201,-9.685314688461538e-201,-9.680319683516484e-201,-9.67532467857143e-201,-9.670329673626373e-201,-9.665334668681318e-201,-9.660339663736264e-201,-9.655344658791209e-201,-9.650349653846155e-201,-9.6453546489011e-201,-9.640359643956044e-201,-9.635364639010989e-201,-9.630369634065934e-201,-9.625374629120878e-201,-9.620379624175824e-201,-9.615384619230769e-201,-9.610389614285714e-201,-9.60539460934066e-201,-9.600399604395605e-201,-9.595404599450548e-201,-9.590409594505494e-201,-9.585414589560439e-201,-9.580419584615383e-201,-9.57542457967033e-201,-9.570429574725274e-201,-9.565434569780219e-201,-9.560439564835165e-201,-9.55544455989011e-201,-9.550449554945054e-201,-9.54545455e-201,-9.540459545054945e-201,-9.535464540109891e-201,-9.530469535164836e-201,-9.52547453021978e-201,-9.520479525274725e-201,-9.51548452032967e-201,-9.510489515384615e-201,-9.505494510439561e-201,-9.500499505494505e-201,-9.49550450054945e-201,-9.490509495604396e-201,-9.485514490659341e-201,-9.480519485714284e-201,-9.47552448076923e-201,-9.470529475824175e-201,-9.46553447087912e-201,-9.460539465934066e-201,-9.45554446098901e-201,-9.450549456043955e-201,-9.445554451098901e-201,-9.440559446153844e-201,-9.435564441208792e-201,-9.430569436263737e-201,-9.425574431318681e-201,-9.420579426373628e-201,-9.415584421428572e-201,-9.410589416483517e-201,-9.405594411538463e-201,-9.400599406593406e-201,-9.395604401648351e-201,-9.390609396703297e-201,-9.385614391758242e-201,-9.380619386813186e-201,-9.375624381868133e-201,-9.370629376923077e-201,-9.36563437197802e-201,-9.360639367032967e-201,-9.355644362087911e-201,-9.350649357142856e-201,-9.345654352197802e-201,-9.340659347252747e-201,-9.335664342307691e-201,-9.330669337362638e-201,-9.325674332417581e-201,-9.320679327472527e-201,-9.315684322527473e-201,-9.310689317582418e-201,-9.305694312637364e-201,-9.300699307692309e-201,-9.295704302747253e-201,-9.2907092978022e-201,-9.285714292857143e-201,-9.280719287912087e-201,-9.275724282967033e-201,-9.270729278021978e-201,-9.265734273076923e-201,-9.260739268131869e-201,-9.255744263186814e-201,-9.250749258241757e-201,-9.245754253296703e-201,-9.240759248351648e-201,-9.235764243406592e-201,-9.230769238461538e-201,-9.225774233516483e-201,-9.220779228571428e-201,-9.215784223626374e-201,-9.210789218681317e-201,-9.205794213736263e-201,-9.200799208791208e-201,-9.195804203846153e-201,-9.1908091989011e-201,-9.185814193956045e-201,-9.18081918901099e-201,-9.175824184065936e-201,-9.170829179120879e-201,-9.165834174175824e-201,-9.16083916923077e-201,-9.155844164285714e-201,-9.150849159340659e-201,-9.145854154395605e-201,-9.14085914945055e-201,-9.135864144505493e-201,-9.130869139560439e-201,-9.125874134615384e-201,-9.120879129670329e-201,-9.115884124725275e-201,-9.11088911978022e-201,-9.105894114835165e-201,-9.10089910989011e-201,-9.095904104945053e-201,-9.0909091e-201,-9.085914095054944e-201,-9.080919090109889e-201,-9.075924085164835e-201,-9.070929080219781e-201,-9.065934075274726e-201,-9.060939070329672e-201,-9.055944065384615e-201,-9.05094906043956e-201,-9.045954055494506e-201,-9.04095905054945e-201,-9.035964045604395e-201,-9.030969040659341e-201,-9.025974035714286e-201,-9.02097903076923e-201,-9.015984025824176e-201,-9.01098902087912e-201,-9.005994015934065e-201,-9.000999010989011e-201,-8.996004006043956e-201,-8.991009001098902e-201,-8.986013996153846e-201,-8.98101899120879e-201,-8.976023986263736e-201,-8.97102898131868e-201,-8.966033976373625e-201,-8.961038971428571e-201,-8.956043966483516e-201,-8.95104896153846e-201,-8.946053956593408e-201,-8.941058951648352e-201,-8.936063946703296e-201,-8.931068941758242e-201,-8.926073936813187e-201,-8.921078931868132e-201,-8.916083926923078e-201,-8.911088921978022e-201,-8.906093917032966e-201,-8.901098912087912e-201,-8.896103907142857e-201,-8.891108902197803e-201,-8.886113897252747e-201,-8.881118892307692e-201,-8.876123887362638e-201,-8.871128882417583e-201,-8.866133877472526e-201,-8.861138872527472e-201,-8.856143867582417e-201,-8.851148862637362e-201,-8.846153857692308e-201,-8.841158852747252e-201,-8.836163847802197e-201,-8.831168842857143e-201,-8.826173837912088e-201,-8.821178832967032e-201,-8.816183828021979e-201,-8.811188823076923e-201,-8.806193818131868e-201,-8.801198813186814e-201,-8.796203808241759e-201,-8.791208803296702e-201,-8.786213798351648e-201,-8.781218793406593e-201,-8.776223788461539e-201,-8.771228783516484e-201,-8.766233778571428e-201,-8.761238773626374e-201,-8.756243768681319e-201,-8.751248763736262e-201,-8.746253758791208e-201,-8.741258753846153e-201,-8.736263748901098e-201,-8.731268743956044e-201,-8.726273739010989e-201,-8.721278734065933e-201,-8.71628372912088e-201,-8.711288724175823e-201,-8.706293719230769e-201,-8.701298714285715e-201,-8.69630370934066e-201,-8.691308704395604e-201,-8.68631369945055e-201,-8.681318694505495e-201,-8.676323689560438e-201,-8.671328684615384e-201,-8.666333679670329e-201,-8.661338674725275e-201,-8.65634366978022e-201,-8.651348664835165e-201,-8.646353659890111e-201,-8.641358654945055e-201,-8.636363649999999e-201,-8.631368645054945e-201,-8.62637364010989e-201,-8.621378635164834e-201,-8.61638363021978e-201,-8.611388625274725e-201,-8.60639362032967e-201,-8.601398615384616e-201,-8.596403610439559e-201,-8.591408605494504e-201,-8.58641360054945e-201,-8.581418595604396e-201,-8.57642359065934e-201,-8.571428585714287e-201,-8.566433580769231e-201,-8.561438575824176e-201,-8.556443570879121e-201,-8.551448565934065e-201,-8.546453560989012e-201,-8.541458556043956e-201,-8.536463551098901e-201,-8.531468546153847e-201,-8.526473541208792e-201,-8.521478536263735e-201,-8.516483531318681e-201,-8.511488526373626e-201,-8.50649352142857e-201,-8.501498516483517e-201,-8.496503511538461e-201,-8.491508506593406e-201,-8.486513501648352e-201,-8.481518496703295e-201,-8.47652349175824e-201,-8.471528486813186e-201,-8.466533481868131e-201,-8.461538476923077e-201,-8.456543471978023e-201,-8.451548467032968e-201,-8.446553462087912e-201,-8.441558457142857e-201,-8.436563452197802e-201,-8.431568447252748e-201,-8.426573442307693e-201,-8.421578437362637e-201,-8.416583432417583e-201,-8.411588427472528e-201,-8.406593422527471e-201,-8.401598417582417e-201,-8.396603412637362e-201,-8.391608407692307e-201,-8.386613402747253e-201,-8.381618397802198e-201,-8.376623392857142e-201,-8.371628387912088e-201,-8.366633382967032e-201,-8.361638378021976e-201,-8.356643373076922e-201,-8.351648368131867e-201,-8.346653363186812e-201,-8.34165835824176e-201,-8.336663353296704e-201,-8.33166834835165e-201,-8.326673343406593e-201,-8.321678338461538e-201,-8.316683333516484e-201,-8.311688328571429e-201,-8.306693323626374e-201,-8.30169831868132e-201,-8.296703313736264e-201,-8.291708308791208e-201,-8.286713303846154e-201,-8.281718298901098e-201,-8.276723293956043e-201,-8.271728289010989e-201,-8.266733284065934e-201,-8.261738279120879e-201,-8.256743274175825e-201,-8.251748269230768e-201,-8.246753264285713e-201,-8.241758259340659e-201,-8.236763254395603e-201,-8.23176824945055e-201,-8.226773244505494e-201,-8.221778239560439e-201,-8.216783234615386e-201,-8.21178822967033e-201,-8.206793224725274e-201,-8.20179821978022e-201,-8.196803214835165e-201,-8.19180820989011e-201,-8.186813204945056e-201,-8.1818182e-201,-8.176823195054944e-201,-8.17182819010989e-201,-8.166833185164835e-201,-8.16183818021978e-201,-8.156843175274726e-201,-8.15184817032967e-201,-8.146853165384615e-201,-8.141858160439561e-201,-8.136863155494504e-201,-8.131868150549449e-201,-8.126873145604395e-201,-8.12187814065934e-201,-8.116883135714286e-201,-8.11188813076923e-201,-8.106893125824175e-201,-8.101898120879121e-201,-8.096903115934066e-201,-8.09190811098901e-201,-8.086913106043957e-201,-8.081918101098902e-201,-8.076923096153846e-201,-8.071928091208792e-201,-8.066933086263737e-201,-8.06193808131868e-201,-8.056943076373626e-201,-8.051948071428571e-201,-8.046953066483516e-201,-8.041958061538462e-201,-8.036963056593407e-201,-8.031968051648351e-201,-8.026973046703297e-201,-8.02197804175824e-201,-8.016983036813185e-201,-8.011988031868131e-201,-8.006993026923076e-201,-8.001998021978022e-201,-7.997003017032967e-201,-7.992008012087912e-201,-7.987013007142858e-201,-7.982018002197801e-201,-7.977022997252746e-201,-7.972027992307693e-201,-7.967032987362638e-201,-7.962037982417583e-201,-7.957042977472529e-201,-7.952047972527473e-201,-7.947052967582417e-201,-7.942057962637363e-201,-7.937062957692307e-201,-7.932067952747252e-201,-7.927072947802198e-201,-7.922077942857143e-201,-7.917082937912088e-201,-7.912087932967034e-201,-7.907092928021977e-201,-7.902097923076923e-201,-7.897102918131868e-201,-7.892107913186812e-201,-7.887112908241759e-201,-7.882117903296703e-201,-7.877122898351648e-201,-7.872127893406594e-201,-7.867132888461537e-201,-7.862137883516482e-201,-7.857142878571428e-201,-7.852147873626374e-201,-7.847152868681319e-201,-7.842157863736265e-201,-7.83716285879121e-201,-7.832167853846153e-201,-7.827172848901099e-201,-7.822177843956044e-201,-7.817182839010988e-201,-7.812187834065934e-201,-7.807192829120879e-201,-7.802197824175825e-201,-7.79720281923077e-201,-7.792207814285713e-201,-7.78721280934066e-201,-7.782217804395604e-201,-7.777222799450549e-201,-7.772227794505495e-201,-7.76723278956044e-201,-7.762237784615384e-201,-7.75724277967033e-201,-7.752247774725274e-201,-7.747252769780218e-201,-7.742257764835164e-201,-7.737262759890109e-201,-7.732267754945055e-201,-7.727272750000001e-201,-7.722277745054946e-201,-7.717282740109889e-201,-7.712287735164835e-201,-7.70729273021978e-201,-7.702297725274725e-201,-7.697302720329671e-201,-7.692307715384615e-201,-7.687312710439562e-201,-7.682317705494506e-201,-7.67732270054945e-201,-7.672327695604396e-201,-7.66733269065934e-201,-7.662337685714285e-201,-7.657342680769231e-201,-7.652347675824176e-201,-7.64735267087912e-201,-7.642357665934067e-201,-7.63736266098901e-201,-7.632367656043955e-201,-7.6273726510989e-201,-7.622377646153845e-201,-7.61738264120879e-201,-7.612387636263736e-201,-7.607392631318682e-201,-7.602397626373626e-201,-7.597402621428572e-201,-7.592407616483516e-201,-7.587412611538461e-201,-7.582417606593407e-201,-7.577422601648352e-201,-7.572427596703298e-201,-7.567432591758243e-201,-7.562437586813186e-201,-7.557442581868132e-201,-7.552447576923077e-201,-7.547452571978021e-201,-7.542457567032967e-201,-7.537462562087912e-201,-7.532467557142857e-201,-7.527472552197803e-201,-7.522477547252746e-201,-7.517482542307691e-201,-7.512487537362637e-201,-7.507492532417582e-201,-7.502497527472526e-201,-7.497502522527472e-201,-7.492507517582417e-201,-7.487512512637362e-201,-7.482517507692308e-201,-7.477522502747253e-201,-7.472527497802199e-201,-7.467532492857143e-201,-7.462537487912088e-201,-7.457542482967034e-201,-7.452547478021979e-201,-7.447552473076922e-201,-7.442557468131868e-201,-7.437562463186813e-201,-7.432567458241758e-201,-7.427572453296704e-201,-7.422577448351648e-201,-7.417582443406593e-201,-7.412587438461539e-201,-7.407592433516482e-201,-7.402597428571427e-201,-7.397602423626373e-201,-7.392607418681318e-201,-7.387612413736263e-201,-7.382617408791209e-201,-7.377622403846153e-201,-7.372627398901097e-201,-7.367632393956044e-201,-7.362637389010989e-201,-7.357642384065935e-201,-7.35264737912088e-201,-7.347652374175824e-201,-7.34265736923077e-201,-7.337662364285715e-201,-7.332667359340658e-201,-7.327672354395605e-201,-7.32267734945055e-201,-7.317682344505494e-201,-7.31268733956044e-201,-7.307692334615385e-201,-7.30269732967033e-201,-7.297702324725276e-201,-7.292707319780219e-201,-7.287712314835163e-201,-7.28271730989011e-201,-7.277722304945054e-201,-7.272727299999999e-201,-7.267732295054945e-201,-7.26273729010989e-201,-7.257742285164834e-201,-7.252747280219779e-201,-7.247752275274724e-201,-7.242757270329671e-201,-7.237762265384616e-201,-7.232767260439561e-201,-7.227772255494507e-201,-7.222777250549452e-201,-7.217782245604395e-201,-7.212787240659341e-201,-7.207792235714286e-201,-7.20279723076923e-201,-7.197802225824176e-201,-7.192807220879121e-201,-7.187812215934066e-201,-7.182817210989012e-201,-7.177822206043955e-201,-7.1728272010989e-201,-7.167832196153846e-201,-7.16283719120879e-201,-7.157842186263735e-201,-7.152847181318681e-201,-7.147852176373626e-201,-7.142857171428572e-201,-7.137862166483515e-201,-7.13286716153846e-201,-7.127872156593406e-201,-7.122877151648352e-201,-7.117882146703297e-201,-7.112887141758243e-201,-7.107892136813188e-201,-7.102897131868131e-201,-7.097902126923077e-201,-7.092907121978022e-201,-7.087912117032967e-201,-7.082917112087913e-201,-7.077922107142857e-201,-7.072927102197802e-201,-7.067932097252748e-201,-7.062937092307691e-201,-7.057942087362636e-201,-7.052947082417582e-201,-7.047952077472527e-201,-7.042957072527472e-201,-7.037962067582418e-201,-7.032967062637362e-201,-7.027972057692309e-201,-7.022977052747252e-201,-7.017982047802196e-201,-7.012987042857143e-201,-7.007992037912087e-201,-7.002997032967032e-201,-6.99800202802198e-201,-6.993007023076924e-201,-6.988012018131867e-201,-6.983017013186814e-201,-6.978022008241758e-201,-6.973027003296703e-201,-6.968031998351649e-201,-6.963036993406594e-201,-6.958041988461538e-201,-6.953046983516485e-201,-6.948051978571428e-201,-6.943056973626372e-201,-6.938061968681319e-201,-6.933066963736263e-201,-6.92807195879121e-201,-6.923076953846154e-201,-6.918081948901099e-201,-6.913086943956045e-201,-6.908091939010988e-201,-6.903096934065933e-201,-6.898101929120879e-201,-6.893106924175824e-201,-6.888111919230768e-201,-6.883116914285714e-201,-6.87812190934066e-201,-6.873126904395604e-201,-6.86813189945055e-201,-6.863136894505495e-201,-6.858141889560439e-201,-6.853146884615385e-201,-6.84815187967033e-201,-6.843156874725275e-201,-6.838161869780221e-201,-6.833166864835164e-201,-6.828171859890109e-201,-6.823176854945055e-201,-6.81818185e-201,-6.813186845054946e-201,-6.80819184010989e-201,-6.803196835164835e-201,-6.798201830219781e-201,-6.793206825274724e-201,-6.788211820329669e-201,-6.783216815384615e-201,-6.77822181043956e-201,-6.773226805494505e-201,-6.76823180054945e-201,-6.763236795604395e-201,-6.75824179065934e-201,-6.753246785714286e-201,-6.748251780769231e-201,-6.743256775824176e-201,-6.738261770879122e-201,-6.733266765934066e-201,-6.728271760989011e-201,-6.723276756043957e-201,-6.7182817510989e-201,-6.713286746153845e-201,-6.708291741208791e-201,-6.703296736263736e-201,-6.698301731318682e-201,-6.693306726373627e-201,-6.688311721428571e-201,-6.683316716483517e-201,-6.67832171153846e-201,-6.673326706593407e-201,-6.668331701648352e-201,-6.663336696703296e-201,-6.658341691758242e-201,-6.653346686813187e-201,-6.648351681868132e-201,-6.643356676923076e-201,-6.638361671978022e-201,-6.633366667032967e-201,-6.628371662087912e-201,-6.623376657142857e-201,-6.618381652197803e-201,-6.613386647252746e-201,-6.608391642307692e-201,-6.603396637362638e-201,-6.598401632417583e-201,-6.593406627472527e-201,-6.588411622527472e-201,-6.583416617582418e-201,-6.578421612637363e-201,-6.573426607692308e-201,-6.568431602747252e-201,-6.563436597802197e-201,-6.558441592857143e-201,-6.553446587912088e-201,-6.548451582967033e-201,-6.543456578021979e-201,-6.538461573076923e-201,-6.533466568131868e-201,-6.5284715631868134e-201,-6.523476558241758e-201,-6.518481553296703e-201,-6.513486548351648e-201,-6.5084915434065936e-201,-6.503496538461538e-201,-6.498501533516483e-201,-6.493506528571428e-201,-6.488511523626373e-201,-6.483516518681319e-201,-6.478521513736264e-201,-6.4735265087912085e-201,-6.468531503846154e-201,-6.463536498901099e-201,-6.458541493956044e-201,-6.453546489010989e-201,-6.448551484065934e-201,-6.4435564791208795e-201,-6.4385614741758234e-201,-6.433566469230769e-201,-6.428571464285714e-201,-6.4235764593406596e-201,-6.418581454395604e-201,-6.41358644945055e-201,-6.408591444505495e-201,-6.403596439560439e-201,-6.3986014346153845e-201,-6.39360642967033e-201,-6.3886114247252746e-201,-6.383616419780219e-201,-6.378621414835165e-201,-6.373626409890109e-201,-6.368631404945055e-201,-6.3636363999999994e-201,-6.358641395054945e-201,-6.35364639010989e-201,-6.3486513851648356e-201,-6.34365638021978e-201,-6.338661375274725e-201,-6.3336663703296704e-201,-6.328671365384616e-201,-6.32367636043956e-201,-6.318681355494505e-201,-6.3136863505494505e-201,-6.308691345604395e-201,-6.30369634065934e-201,-6.298701335714286e-201,-6.2937063307692314e-201,-6.2887113258241754e-201,-6.283716320879121e-201,-6.278721315934066e-201,-6.273726310989011e-201,-6.2687313060439556e-201,-6.263736301098901e-201,-6.2587412961538456e-201,-6.253746291208791e-201,-6.248751286263736e-201,-6.243756281318681e-201,-6.2387612763736265e-201,-6.233766271428572e-201,-6.2287712664835166e-201,-6.223776261538461e-201,-6.218781256593407e-201,-6.213786251648352e-201,-6.208791246703296e-201,-6.2037962417582415e-201,-6.198801236813187e-201,-6.1938062318681315e-201,-6.188811226923076e-201,-6.1838162219780216e-201,-6.178821217032968e-201,-6.173826212087912e-201,-6.168831207142857e-201,-6.1638362021978025e-201,-6.158841197252747e-201,-6.153846192307692e-201,-6.148851187362637e-201,-6.143856182417582e-201,-6.138861177472527e-201,-6.133866172527472e-201,-6.1288711675824174e-201,-6.123876162637362e-201,-6.118881157692308e-201,-6.113886152747253e-201,-6.1088911478021976e-201,-6.103896142857143e-201,-6.0989011379120884e-201,-6.0939061329670324e-201,-6.088911128021978e-201,-6.083916123076923e-201,-6.0789211181318686e-201,-6.0739261131868125e-201,-6.068931108241758e-201,-6.063936103296703e-201,-6.058941098351647e-201,-6.0539460934065934e-201,-6.048951088461539e-201,-6.0439560835164835e-201,-6.038961078571428e-201,-6.0339660736263736e-201,-6.028971068681319e-201,-6.023976063736264e-201,-6.018981058791208e-201,-6.013986053846154e-201,-6.0089910489010984e-201,-6.003996043956044e-201,-5.9990010390109885e-201,-5.994006034065934e-201,-5.989011029120879e-201,-5.984016024175825e-201,-5.979021019230769e-201,-5.974026014285714e-201,-5.9690310093406595e-201,-5.964036004395605e-201,-5.959040999450549e-201,-5.954045994505494e-201,-5.94905098956044e-201,-5.944055984615384e-201,-5.939060979670329e-201,-5.934065974725275e-201,-5.92907096978022e-201,-5.9240759648351645e-201,-5.91908095989011e-201,-5.914085954945055e-201,-5.90909095e-201,-5.904095945054945e-201,-5.89910094010989e-201,-5.894105935164835e-201,-5.88911093021978e-201,-5.884115925274725e-201,-5.8791209203296695e-201,-5.874125915384616e-201,-5.869130910439561e-201,-5.864135905494506e-201,-5.8591409005494504e-201,-5.854145895604396e-201,-5.849150890659341e-201,-5.844155885714285e-201,-5.8391608807692306e-201,-5.834165875824176e-201,-5.829170870879121e-201,-5.824175865934065e-201,-5.819180860989011e-201,-5.814185856043956e-201,-5.809190851098901e-201,-5.804195846153846e-201,-5.7992008412087916e-201,-5.794205836263736e-201,-5.789210831318681e-201,-5.7842158263736264e-201,-5.779220821428571e-201,-5.7742258164835165e-201,-5.769230811538461e-201,-5.764235806593406e-201,-5.759240801648351e-201,-5.754245796703297e-201,-5.749250791758242e-201,-5.744255786813187e-201,-5.739260781868132e-201,-5.7342657769230775e-201,-5.7292707719780215e-201,-5.724275767032967e-201,-5.719280762087912e-201,-5.714285757142857e-201,-5.709290752197802e-201,-5.704295747252747e-201,-5.6993007423076925e-201,-5.6943057373626364e-201,-5.6893107324175825e-201,-5.684315727472528e-201,-5.6793207225274726e-201,-5.674325717582417e-201,-5.669330712637363e-201,-5.6643357076923074e-201,-5.659340702747253e-201,-5.6543456978021975e-201,-5.649350692857142e-201,-5.6443556879120875e-201,-5.639360682967033e-201,-5.6343656780219776e-201,-5.629370673076923e-201,-5.6243756681318684e-201,-5.619380663186814e-201,-5.614385658241758e-201,-5.609390653296703e-201,-5.6043956483516486e-201,-5.599400643406593e-201,-5.594405638461538e-201,-5.5894106335164834e-201,-5.584415628571429e-201,-5.579420623626373e-201,-5.574425618681318e-201,-5.569430613736264e-201,-5.564435608791209e-201,-5.5594406038461536e-201,-5.554445598901099e-201,-5.549450593956044e-201,-5.544455589010989e-201,-5.539460584065934e-201,-5.534465579120879e-201,-5.529470574175824e-201,-5.524475569230769e-201,-5.519480564285714e-201,-5.5144855593406586e-201,-5.509490554395605e-201,-5.50449554945055e-201,-5.499500544505494e-201,-5.4945055395604395e-201,-5.489510534615385e-201,-5.48451552967033e-201,-5.479520524725274e-201,-5.47452551978022e-201,-5.469530514835165e-201,-5.46453550989011e-201,-5.4595405049450544e-201,-5.4545455e-201,-5.449550495054945e-201,-5.44455549010989e-201,-5.439560485164835e-201,-5.43456548021978e-201,-5.4295704752747254e-201,-5.42457547032967e-201,-5.4195804653846155e-201,-5.41458546043956e-201,-5.4095904554945056e-201,-5.40459545054945e-201,-5.399600445604395e-201,-5.39460544065934e-201,-5.389610435714286e-201,-5.3846154307692304e-201,-5.379620425824176e-201,-5.374625420879121e-201,-5.3696304159340666e-201,-5.3646354109890106e-201,-5.359640406043956e-201,-5.3546454010989014e-201,-5.349650396153846e-201,-5.344655391208791e-201,-5.339660386263736e-201,-5.334665381318681e-201,-5.3296703763736255e-201,-5.324675371428572e-201,-5.319680366483517e-201,-5.314685361538462e-201,-5.3096903565934064e-201,-5.304695351648352e-201,-5.2997003467032965e-201,-5.294705341758242e-201,-5.2897103368131866e-201,-5.284715331868131e-201,-5.279720326923077e-201,-5.274725321978022e-201,-5.269730317032966e-201,-5.264735312087912e-201,-5.2597403071428575e-201,-5.254745302197803e-201,-5.249750297252747e-201,-5.244755292307692e-201,-5.239760287362638e-201,-5.2347652824175824e-201,-5.229770277472527e-201,-5.2247752725274725e-201,-5.219780267582417e-201,-5.214785262637362e-201,-5.209790257692307e-201,-5.2047952527472534e-201,-5.199800247802198e-201,-5.194805242857143e-201,-5.189810237912088e-201,-5.184815232967033e-201,-5.179820228021978e-201,-5.174825223076923e-201,-5.1698302181318676e-201,-5.164835213186813e-201,-5.1598402082417584e-201,-5.154845203296702e-201,-5.149850198351648e-201,-5.144855193406594e-201,-5.139860188461539e-201,-5.134865183516483e-201,-5.1298701785714286e-201,-5.124875173626374e-201,-5.119880168681319e-201,-5.1148851637362634e-201,-5.109890158791209e-201,-5.1048951538461535e-201,-5.099900148901098e-201,-5.0949051439560436e-201,-5.089910139010989e-201,-5.0849151340659336e-201,-5.079920129120879e-201,-5.0749251241758244e-201,-5.069930119230769e-201,-5.0649351142857145e-201,-5.059940109340659e-201,-5.054945104395604e-201,-5.049950099450549e-201,-5.044955094505495e-201,-5.0399600895604394e-201,-5.034965084615384e-201,-5.0299700796703295e-201,-5.024975074725275e-201,-5.0199800697802195e-201,-5.014985064835165e-201,-5.00999005989011e-201,-5.004995054945055e-201,-5.00000005e-201,-4.995005045054945e-201,-4.9900100401098905e-201,-4.9850150351648345e-201,-4.98002003021978e-201,-4.975025025274725e-201,-4.97003002032967e-201,-4.9650350153846146e-201,-4.960040010439561e-201,-4.9550450054945054e-201,-4.950050000549451e-201,-4.9450549956043955e-201,-4.94005999065934e-201,-4.9350649857142856e-201,-4.930069980769231e-201,-4.925074975824176e-201,-4.9200799708791204e-201,-4.915084965934066e-201,-4.910089960989011e-201,-4.905094956043955e-201,-4.900099951098901e-201,-4.895104946153847e-201,-4.890109941208791e-201,-4.885114936263736e-201,-4.8801199313186814e-201,-4.875124926373627e-201,-4.8701299214285715e-201,-4.865134916483516e-201,-4.8601399115384616e-201,-4.855144906593406e-201,-4.850149901648351e-201,-4.845154896703296e-201,-4.840159891758242e-201,-4.835164886813187e-201,-4.830169881868132e-201,-4.825174876923077e-201,-4.820179871978022e-201,-4.815184867032967e-201,-4.810189862087912e-201,-4.805194857142857e-201,-4.800199852197802e-201,-4.7952048472527475e-201,-4.7902098423076914e-201,-4.785214837362637e-201,-4.780219832417582e-201,-4.7752248274725284e-201,-4.770229822527472e-201,-4.765234817582418e-201,-4.760239812637363e-201,-4.755244807692308e-201,-4.7502498027472525e-201,-4.745254797802198e-201,-4.7402597928571426e-201,-4.735264787912087e-201,-4.730269782967033e-201,-4.725274778021977e-201,-4.720279773076923e-201,-4.715284768131868e-201,-4.7102897631868136e-201,-4.705294758241758e-201,-4.7002997532967036e-201,-4.695304748351648e-201,-4.690309743406593e-201,-4.6853147384615384e-201,-4.680319733516484e-201,-4.675324728571428e-201,-4.670329723626373e-201,-4.6653347186813186e-201,-4.660339713736264e-201,-4.655344708791209e-201,-4.650349703846154e-201,-4.6453546989010995e-201,-4.640359693956044e-201,-4.635364689010989e-201,-4.630369684065934e-201,-4.625374679120879e-201,-4.6203796741758236e-201,-4.615384669230769e-201,-4.610389664285714e-201,-4.605394659340659e-201,-4.600399654395604e-201,-4.59540464945055e-201,-4.5904096445054945e-201,-4.58541463956044e-201,-4.5804196346153846e-201,-4.575424629670329e-201,-4.570429624725275e-201,-4.56543461978022e-201,-4.560439614835164e-201,-4.5554446098901095e-201,-4.550449604945055e-201,-4.5454546e-201,-4.540459595054944e-201,-4.5354645901098904e-201,-4.530469585164836e-201,-4.5254745802197804e-201,-4.520479575274725e-201,-4.5154845703296705e-201,-4.510489565384615e-201,-4.50549456043956e-201,-4.500499555494505e-201,-4.495504550549451e-201,-4.4905095456043954e-201,-4.48551454065934e-201,-4.4805195357142855e-201,-4.47552453076923e-201,-4.470529525824176e-201,-4.465534520879121e-201,-4.4605395159340656e-201,-4.455544510989011e-201,-4.4505495060439564e-201,-4.445554501098901e-201,-4.440559496153846e-201,-4.435564491208791e-201,-4.4305694862637366e-201,-4.4255744813186806e-201,-4.420579476373626e-201,-4.415584471428571e-201,-4.410589466483517e-201,-4.4055944615384614e-201,-4.400599456593407e-201,-4.3956044516483515e-201,-4.390609446703297e-201,-4.3856144417582416e-201,-4.380619436813187e-201,-4.375624431868132e-201,-4.3706294269230764e-201,-4.365634421978022e-201,-4.3606394170329665e-201,-4.355644412087912e-201,-4.350649407142857e-201,-4.345654402197802e-201,-4.340659397252747e-201,-4.335664392307693e-201,-4.3306693873626374e-201,-4.325674382417582e-201,-4.3206793774725275e-201,-4.315684372527473e-201,-4.310689367582417e-201,-4.305694362637362e-201,-4.300699357692308e-201,-4.295704352747252e-201,-4.290709347802198e-201,-4.285714342857143e-201,-4.2807193379120886e-201,-4.275724332967033e-201,-4.270729328021978e-201,-4.265734323076923e-201,-4.260739318131868e-201,-4.255744313186813e-201,-4.250749308241758e-201,-4.245754303296703e-201,-4.240759298351648e-201,-4.235764293406593e-201,-4.230769288461538e-201,-4.225774283516484e-201,-4.220779278571429e-201,-4.215784273626374e-201,-4.2107892686813184e-201,-4.205794263736264e-201,-4.200799258791209e-201,-4.195804253846153e-201,-4.1908092489010986e-201,-4.185814243956044e-201,-4.180819239010989e-201,-4.175824234065933e-201,-4.1708292291208795e-201,-4.165834224175825e-201,-4.1608392192307696e-201,-4.155844214285714e-201,-4.15084920934066e-201,-4.145854204395604e-201,-4.140859199450549e-201,-4.1358641945054944e-201,-4.130869189560439e-201,-4.1258741846153845e-201,-4.120879179670329e-201,-4.1158841747252746e-201,-4.110889169780219e-201,-4.1058941648351654e-201,-4.10089915989011e-201,-4.095904154945055e-201,-4.09090915e-201,-4.0859141450549455e-201,-4.0809191401098895e-201,-4.075924135164835e-201,-4.07092913021978e-201,-4.065934125274726e-201,-4.06093912032967e-201,-4.055944115384615e-201,-4.0509491104395605e-201,-4.045954105494506e-201,-4.0409591005494506e-201,-4.035964095604396e-201,-4.030969090659341e-201,-4.025974085714285e-201,-4.020979080769231e-201,-4.0159840758241754e-201,-4.010989070879121e-201,-4.0059940659340655e-201,-4.000999060989011e-201,-3.9960040560439556e-201,-3.991009051098901e-201,-3.9860140461538464e-201,-3.981019041208791e-201,-3.9760240362637365e-201,-3.971029031318682e-201,-3.966034026373626e-201,-3.961039021428571e-201,-3.9560440164835166e-201,-3.951049011538462e-201,-3.946054006593406e-201,-3.9410590016483514e-201,-3.936063996703297e-201,-3.9310689917582415e-201,-3.926073986813187e-201,-3.921078981868132e-201,-3.916083976923077e-201,-3.9110889719780216e-201,-3.906093967032967e-201,-3.9010989620879124e-201,-3.896103957142857e-201,-3.891108952197802e-201,-3.886113947252747e-201,-3.881118942307692e-201,-3.876123937362637e-201,-3.871128932417582e-201,-3.8661339274725274e-201,-3.861138922527473e-201,-3.856143917582418e-201,-3.851148912637362e-201,-3.8461539076923075e-201,-3.841158902747253e-201,-3.836163897802198e-201,-3.831168892857142e-201,-3.826173887912088e-201,-3.821178882967033e-201,-3.816183878021978e-201,-3.8111888730769225e-201,-3.806193868131868e-201,-3.801198863186813e-201,-3.796203858241759e-201,-3.791208853296703e-201,-3.786213848351649e-201,-3.7812188434065934e-201,-3.776223838461538e-201,-3.7712288335164835e-201,-3.766233828571428e-201,-3.7612388236263736e-201,-3.756243818681318e-201,-3.751248813736263e-201,-3.746253808791208e-201,-3.7412588038461545e-201,-3.736263798901099e-201,-3.731268793956044e-201,-3.726273789010989e-201,-3.721278784065935e-201,-3.7162837791208786e-201,-3.711288774175824e-201,-3.7062937692307694e-201,-3.701298764285714e-201,-3.696303759340659e-201,-3.691308754395604e-201,-3.686313749450549e-201,-3.681318744505495e-201,-3.67632373956044e-201,-3.671328734615385e-201,-3.66633372967033e-201,-3.6613387247252744e-201,-3.65634371978022e-201,-3.6513487148351645e-201,-3.64635370989011e-201,-3.6413587049450546e-201,-3.636363699999999e-201,-3.631368695054945e-201,-3.62637369010989e-201,-3.6213786851648355e-201,-3.61638368021978e-201,-3.6113886752747256e-201,-3.606393670329671e-201,-3.601398665384615e-201,-3.59640366043956e-201,-3.591408655494506e-201,-3.5864136505494504e-201,-3.581418645604395e-201,-3.5764236406593405e-201,-3.571428635714286e-201,-3.5664336307692306e-201,-3.561438625824176e-201,-3.5564436208791214e-201,-3.551448615934066e-201,-3.546453610989011e-201,-3.541458606043956e-201,-3.536463601098901e-201,-3.531468596153846e-201,-3.526473591208791e-201,-3.5214785862637356e-201,-3.516483581318681e-201,-3.5114885763736264e-201,-3.506493571428571e-201,-3.501498566483516e-201,-3.496503561538462e-201,-3.491508556593407e-201,-3.486513551648351e-201,-3.481518546703297e-201,-3.476523541758242e-201,-3.471528536813187e-201,-3.4665335318681314e-201,-3.461538526923077e-201,-3.456543521978022e-201,-3.451548517032967e-201,-3.4465535120879116e-201,-3.441558507142857e-201,-3.4365635021978024e-201,-3.431568497252747e-201,-3.4265734923076925e-201,-3.421578487362637e-201,-3.4165834824175825e-201,-3.411588477472527e-201,-3.4065934725274726e-201,-3.401598467582417e-201,-3.396603462637363e-201,-3.3916084576923074e-201,-3.386613452747252e-201,-3.3816184478021975e-201,-3.3766234428571436e-201,-3.3716284379120876e-201,-3.366633432967033e-201,-3.3616384280219784e-201,-3.356643423076924e-201,-3.351648418131868e-201,-3.346653413186813e-201,-3.3416584082417585e-201,-3.336663403296703e-201,-3.3316683983516486e-201,-3.326673393406593e-201,-3.321678388461539e-201,-3.3166833835164834e-201,-3.311688378571428e-201,-3.3066933736263735e-201,-3.301698368681319e-201,-3.2967033637362635e-201,-3.291708358791209e-201,-3.2867133538461536e-201,-3.281718348901098e-201,-3.276723343956044e-201,-3.271728339010989e-201,-3.2667333340659345e-201,-3.261738329120879e-201,-3.2567433241758242e-201,-3.251748319230769e-201,-3.2467533142857143e-201,-3.2417583093406594e-201,-3.2367633043956044e-201,-3.2317682994505494e-201,-3.2267732945054945e-201,-3.2217782895604395e-201,-3.2167832846153846e-201,-3.2117882796703296e-201,-3.206793274725275e-201,-3.2017982697802197e-201,-3.196803264835165e-201,-3.1918082598901098e-201,-3.1868132549450545e-201,-3.18181825e-201,-3.176823245054945e-201,-3.1718282401098903e-201,-3.166833235164835e-201,-3.16183823021978e-201,-3.156843225274725e-201,-3.15184822032967e-201,-3.1468532153846155e-201,-3.1418582104395605e-201,-3.1368632054945052e-201,-3.1318682005494506e-201,-3.1268731956043953e-201,-3.1218781906593407e-201,-3.1168831857142858e-201,-3.1118881807692308e-201,-3.106893175824176e-201,-3.101898170879121e-201,-3.096903165934066e-201,-3.091908160989011e-201,-3.086913156043956e-201,-3.0819181510989014e-201,-3.076923146153846e-201,-3.0719281412087908e-201,-3.066933136263736e-201,-3.061938131318681e-201,-3.0569431263736266e-201,-3.0519481214285713e-201,-3.0469531164835163e-201,-3.0419581115384614e-201,-3.0369631065934064e-201,-3.0319681016483515e-201,-3.026973096703297e-201,-3.0219780917582415e-201,-3.016983086813187e-201,-3.0119880818681316e-201,-3.006993076923077e-201,-3.0019980719780217e-201,-2.997003067032967e-201,-2.992008062087912e-201,-2.9870130571428572e-201,-2.9820180521978022e-201,-2.9770230472527473e-201,-2.972028042307692e-201,-2.9670330373626377e-201,-2.9620380324175824e-201,-2.9570430274725278e-201,-2.9520480225274725e-201,-2.947053017582417e-201,-2.9420580126373626e-201,-2.9370630076923076e-201,-2.932068002747253e-201,-2.9270729978021977e-201,-2.9220779928571427e-201,-2.9170829879120878e-201,-2.9120879829670328e-201,-2.9070929780219782e-201,-2.9020979730769233e-201,-2.897102968131868e-201,-2.8921079631868133e-201,-2.887112958241758e-201,-2.882117953296703e-201,-2.8771229483516485e-201,-2.8721279434065935e-201,-2.8671329384615386e-201,-2.8621379335164836e-201,-2.8571429285714283e-201,-2.8521479236263737e-201,-2.8471529186813184e-201,-2.842157913736264e-201,-2.8371629087912088e-201,-2.8321679038461535e-201,-2.827172898901099e-201,-2.8221778939560436e-201,-2.817182889010989e-201,-2.812187884065934e-201,-2.807192879120879e-201,-2.802197874175824e-201,-2.797202869230769e-201,-2.792207864285714e-201,-2.7872128593406592e-201,-2.7822178543956043e-201,-2.7772228494505497e-201,-2.7722278445054943e-201,-2.7672328395604397e-201,-2.7622378346153844e-201,-2.7572428296703295e-201,-2.752247824725275e-201,-2.74725281978022e-201,-2.742257814835165e-201,-2.73726280989011e-201,-2.7322678049450547e-201,-2.7272728e-201,-2.722277795054945e-201,-2.7172827901098898e-201,-2.7122877851648352e-201,-2.70729278021978e-201,-2.7022977752747253e-201,-2.69730277032967e-201,-2.6923077653846154e-201,-2.6873127604395604e-201,-2.6823177554945054e-201,-2.6773227505494505e-201,-2.6723277456043955e-201,-2.6673327406593402e-201,-2.662337735714286e-201,-2.6573427307692307e-201,-2.652347725824176e-201,-2.6473527208791207e-201,-2.6423577159340658e-201,-2.637362710989011e-201,-2.6323677060439562e-201,-2.6273727010989013e-201,-2.6223776961538463e-201,-2.617382691208791e-201,-2.6123876862637364e-201,-2.607392681318681e-201,-2.602397676373627e-201,-2.5974026714285715e-201,-2.5924076664835162e-201,-2.5874126615384616e-201,-2.5824176565934063e-201,-2.5774226516483517e-201,-2.5724276467032967e-201,-2.5674326417582418e-201,-2.5624376368131868e-201,-2.557442631868132e-201,-2.5524476269230765e-201,-2.547452621978022e-201,-2.5424576170329666e-201,-2.5374626120879124e-201,-2.532467607142857e-201,-2.527472602197802e-201,-2.522477597252747e-201,-2.517482592307692e-201,-2.5124875873626372e-201,-2.5074925824175826e-201,-2.5024975774725273e-201,-2.4975025725274727e-201,-2.4925075675824174e-201,-2.4875125626373628e-201,-2.4825175576923075e-201,-2.4775225527472525e-201,-2.472527547802198e-201,-2.4675325428571426e-201,-2.462537537912088e-201,-2.4575425329670327e-201,-2.4525475280219777e-201,-2.447552523076923e-201,-2.442557518131868e-201,-2.4375625131868132e-201,-2.4325675082417582e-201,-2.427572503296703e-201,-2.4225774983516483e-201,-2.4175824934065934e-201,-2.4125874884615388e-201,-2.4075924835164835e-201,-2.4025974785714285e-201,-2.3976024736263735e-201,-2.3926074686813186e-201,-2.387612463736264e-201,-2.382617458791209e-201,-2.3776224538461537e-201,-2.372627448901099e-201,-2.3676324439560438e-201,-2.362637439010989e-201,-2.3576424340659342e-201,-2.352647429120879e-201,-2.3476524241758243e-201,-2.342657419230769e-201,-2.337662414285714e-201,-2.332667409340659e-201,-2.3276724043956045e-201,-2.3226773994505495e-201,-2.3176823945054946e-201,-2.3126873895604392e-201,-2.3076923846153846e-201,-2.3026973796703293e-201,-2.297702374725275e-201,-2.2927073697802198e-201,-2.2877123648351648e-201,-2.28271735989011e-201,-2.277722354945055e-201,-2.27272735e-201,-2.2677323450549453e-201,-2.26273734010989e-201,-2.2577423351648354e-201,-2.25274733021978e-201,-2.2477523252747255e-201,-2.24275732032967e-201,-2.237762315384615e-201,-2.2327673104395606e-201,-2.2277723054945053e-201,-2.2227773005494507e-201,-2.2177822956043954e-201,-2.2127872906593404e-201,-2.2077922857142855e-201,-2.202797280769231e-201,-2.1978022758241756e-201,-2.192807270879121e-201,-2.1878122659340656e-201,-2.182817260989011e-201,-2.1778222560439557e-201,-2.172827251098901e-201,-2.167832246153846e-201,-2.1628372412087912e-201,-2.1578422362637362e-201,-2.1528472313186813e-201,-2.147852226373626e-201,-2.1428572214285717e-201,-2.1378622164835164e-201,-2.1328672115384618e-201,-2.1278722065934065e-201,-2.1228772016483515e-201,-2.1178821967032966e-201,-2.1128871917582416e-201,-2.107892186813187e-201,-2.1028971818681317e-201,-2.0979021769230767e-201,-2.0929071719780218e-201,-2.087912167032967e-201,-2.0829171620879122e-201,-2.0779221571428573e-201,-2.072927152197802e-201,-2.0679321472527474e-201,-2.062937142307692e-201,-2.0579421373626374e-201,-2.0529471324175825e-201,-2.0479521274725275e-201,-2.0429571225274726e-201,-2.0379621175824176e-201,-2.0329671126373626e-201,-2.0279721076923077e-201,-2.0229771027472527e-201,-2.017982097802198e-201,-2.0129870928571428e-201,-2.007992087912088e-201,-2.002997082967033e-201,-1.9980020780219776e-201,-1.9930070730769233e-201,-1.988012068131868e-201,-1.983017063186813e-201,-1.978022058241758e-201,-1.973027053296703e-201,-1.9680320483516482e-201,-1.9630370434065936e-201,-1.9580420384615383e-201,-1.9530470335164837e-201,-1.9480520285714284e-201,-1.9430570236263738e-201,-1.9380620186813184e-201,-1.933067013736264e-201,-1.928072008791209e-201,-1.923077003846154e-201,-1.918081998901099e-201,-1.913086993956044e-201,-1.9080919890109887e-201,-1.903096984065934e-201,-1.898101979120879e-201,-1.8931069741758245e-201,-1.8881119692307692e-201,-1.8831169642857143e-201,-1.8781219593406593e-201,-1.873126954395604e-201,-1.8681319494505497e-201,-1.8631369445054944e-201,-1.8581419395604395e-201,-1.8531469346153845e-201,-1.8481519296703295e-201,-1.8431569247252742e-201,-1.83816191978022e-201,-1.8331669148351647e-201,-1.82817190989011e-201,-1.8231769049450547e-201,-1.8181818999999998e-201,-1.813186895054945e-201,-1.8081918901098902e-201,-1.8031968851648353e-201,-1.7982018802197803e-201,-1.793206875274725e-201,-1.7882118703296704e-201,-1.783216865384615e-201,-1.778221860439561e-201,-1.7732268554945055e-201,-1.7682318505494506e-201,-1.7632368456043956e-201,-1.7582418406593403e-201,-1.7532468357142857e-201,-1.7482518307692307e-201,-1.7432568258241758e-201,-1.7382618208791208e-201,-1.733266815934066e-201,-1.728271810989011e-201,-1.723276806043956e-201,-1.718281801098901e-201,-1.7132867961538464e-201,-1.708291791208791e-201,-1.7032967862637365e-201,-1.698301781318681e-201,-1.6933067763736262e-201,-1.6883117714285716e-201,-1.6833167664835166e-201,-1.6783217615384617e-201,-1.6733267565934067e-201,-1.6683317516483514e-201,-1.6633367467032968e-201,-1.658341741758242e-201,-1.6533467368131865e-201,-1.648351731868132e-201,-1.643356726923077e-201,-1.638361721978022e-201,-1.633366717032967e-201,-1.628371712087912e-201,-1.6233767071428571e-201,-1.6183817021978024e-201,-1.6133866972527472e-201,-1.6083916923076923e-201,-1.6033966873626375e-201,-1.5984016824175825e-201,-1.5934066774725274e-201,-1.5884116725274726e-201,-1.5834166675824175e-201,-1.5784216626373625e-201,-1.5734266576923077e-201,-1.5684316527472526e-201,-1.5634366478021976e-201,-1.5584416428571429e-201,-1.5534466379120879e-201,-1.548451632967033e-201,-1.543456628021978e-201,-1.538461623076923e-201,-1.533466618131868e-201,-1.5284716131868133e-201,-1.5234766082417581e-201,-1.5184816032967032e-201,-1.5134865983516484e-201,-1.5084915934065934e-201,-1.5034965884615385e-201,-1.4985015835164835e-201,-1.4935065785714286e-201,-1.4885115736263736e-201,-1.4835165686813188e-201,-1.4785215637362639e-201,-1.4735265587912087e-201,-1.468531553846154e-201,-1.4635365489010988e-201,-1.4585415439560439e-201,-1.453546539010989e-201,-1.448551534065934e-201,-1.443556529120879e-201,-1.4385615241758242e-201,-1.4335665192307692e-201,-1.4285715142857141e-201,-1.4235765093406591e-201,-1.4185815043956044e-201,-1.4135864994505494e-201,-1.4085914945054945e-201,-1.4035964895604395e-201,-1.3986014846153845e-201,-1.3936064796703296e-201,-1.3886114747252748e-201,-1.3836164697802198e-201,-1.3786214648351647e-201,-1.37362645989011e-201,-1.368631454945055e-201,-1.36363645e-201,-1.3586414450549452e-201,-1.3536464401098901e-201,-1.3486514351648351e-201,-1.3436564302197802e-201,-1.3386614252747252e-201,-1.33366642032967e-201,-1.3286714153846153e-201,-1.3236764104395603e-201,-1.3186814054945054e-201,-1.3136864005494506e-201,-1.3086913956043955e-201,-1.3036963906593405e-201,-1.2987013857142857e-201,-1.2937063807692308e-201,-1.2887113758241758e-201,-1.2837163708791209e-201,-1.2787213659340659e-201,-1.273726360989011e-201,-1.2687313560439562e-201,-1.2637363510989012e-201,-1.258741346153846e-201,-1.2537463412087913e-201,-1.2487513362637363e-201,-1.2437563313186814e-201,-1.2387613263736264e-201,-1.2337663214285714e-201,-1.2287713164835165e-201,-1.2237763115384615e-201,-1.2187813065934066e-201,-1.2137863016483514e-201,-1.2087912967032967e-201,-1.2037962917582417e-201,-1.1988012868131867e-201,-1.193806281868132e-201,-1.1888112769230768e-201,-1.1838162719780219e-201,-1.178821267032967e-201,-1.1738262620879121e-201,-1.168831257142857e-201,-1.1638362521978022e-201,-1.1588412472527473e-201,-1.1538462423076923e-201,-1.1488512373626375e-201,-1.1438562324175824e-201,-1.1388612274725274e-201,-1.1338662225274726e-201,-1.1288712175824177e-201,-1.1238762126373627e-201,-1.1188812076923076e-201,-1.1138862027472528e-201,-1.1088911978021978e-201,-1.1038961928571427e-201,-1.098901187912088e-201,-1.0939061829670328e-201,-1.0889111780219778e-201,-1.083916173076923e-201,-1.0789211681318681e-201,-1.073926163186813e-201,-1.0689311582417582e-201,-1.0639361532967032e-201,-1.0589411483516483e-201,-1.0539461434065935e-201,-1.0489511384615383e-201,-1.0439561335164834e-201,-1.0389611285714286e-201,-1.0339661236263736e-201,-1.0289711186813187e-201,-1.0239761137362637e-201,-1.0189811087912088e-201,-1.0139861038461538e-201,-1.008991098901099e-201,-1.003996093956044e-201,-9.99001089010989e-202,-9.940060840659342e-202,-9.890110791208792e-202,-9.84016074175824e-202,-9.790210692307691e-202,-9.740260642857141e-202,-9.690310593406592e-202,-9.640360543956044e-202,-9.590410494505495e-202,-9.540460445054943e-202,-9.490510395604395e-202,-9.440560346153846e-202,-9.390610296703296e-202,-9.340660247252748e-202,-9.290710197802197e-202,-9.240760148351647e-202,-9.1908100989011e-202,-9.14086004945055e-202,-9.09091e-202,-9.04095995054945e-202,-8.991009901098901e-202,-8.941059851648352e-202,-8.891109802197804e-202,-8.841159752747253e-202,-8.791209703296703e-202,-8.741259653846155e-202,-8.691309604395606e-202,-8.641359554945054e-202,-8.591409505494505e-202,-8.541459456043955e-202,-8.491509406593405e-202,-8.441559357142858e-202,-8.391609307692308e-202,-8.341659258241757e-202,-8.291709208791209e-202,-8.24175915934066e-202,-8.19180910989011e-202,-8.14185906043956e-202,-8.0919090109890115e-202,-8.041958961538461e-202,-7.992008912087912e-202,-7.942058862637363e-202,-7.892108813186813e-202,-7.842158763736264e-202,-7.792208714285715e-202,-7.742258664835164e-202,-7.692308615384615e-202,-7.642358565934066e-202,-7.592408516483516e-202,-7.542458467032967e-202,-7.492508417582418e-202,-7.442558368131868e-202,-7.392608318681319e-202,-7.3426582692307695e-202,-7.29270821978022e-202,-7.24275817032967e-202,-7.192808120879122e-202,-7.142858071428571e-202,-7.092908021978022e-202,-7.042957972527472e-202,-6.993007923076922e-202,-6.943057873626374e-202,-6.893107824175823e-202,-6.843157774725275e-202,-6.793207725274726e-202,-6.743257675824175e-202,-6.693307626373627e-202,-6.643357576923077e-202,-6.5934075274725275e-202,-6.543457478021977e-202,-6.493507428571428e-202,-6.443557379120879e-202,-6.393607329670329e-202,-6.3436572802197805e-202,-6.29370723076923e-202,-6.243757181318681e-202,-6.193807131868133e-202,-6.143857082417582e-202,-6.0939070329670335e-202,-6.043956983516484e-202,-5.994006934065934e-202,-5.944056884615384e-202,-5.894106835164835e-202,-5.844156785714286e-202,-5.794206736263736e-202,-5.744256686813187e-202,-5.694306637362637e-202,-5.644356587912088e-202,-5.594406538461538e-202,-5.544456489010989e-202,-5.49450643956044e-202,-5.44455639010989e-202,-5.394606340659341e-202,-5.344656291208791e-202,-5.294706241758241e-202,-5.244756192307691e-202,-5.194806142857143e-202,-5.144856093406593e-202,-5.094906043956044e-202,-5.044955994505495e-202,-4.995005945054944e-202,-4.945055895604396e-202,-4.895105846153847e-202,-4.845155796703297e-202,-4.795205747252748e-202,-4.745255697802197e-202,-4.695305648351648e-202,-4.645355598901098e-202,-4.5954055494505495e-202,-4.5454555e-202,-4.49550545054945e-202,-4.445555401098902e-202,-4.395605351648351e-202,-4.3456553021978025e-202,-4.295705252747253e-202,-4.245755203296703e-202,-4.195805153846154e-202,-4.145855104395604e-202,-4.095905054945055e-202,-4.0459550054945055e-202,-3.996004956043956e-202,-3.9460549065934063e-202,-3.896104857142857e-202,-3.8461548076923076e-202,-3.7962047582417584e-202,-3.746254708791209e-202,-3.6963046593406593e-202,-3.6463546098901097e-202,-3.5964045604395605e-202,-3.546454510989011e-202,-3.4965044615384614e-202,-3.446554412087912e-202,-3.3966043626373627e-202,-3.346654313186813e-202,-3.2967042637362635e-202,-3.2467542142857144e-202,-3.1968041648351648e-202,-3.146854115384615e-202,-3.096904065934066e-202,-3.0469540164835165e-202,-2.997003967032967e-202,-2.9470539175824177e-202,-2.897103868131868e-202,-2.847153818681318e-202,-2.797203769230769e-202,-2.74725371978022e-202,-2.6973036703296703e-202,-2.6473536208791207e-202,-2.5974035714285716e-202,-2.5474535219780215e-202,-2.4975034725274724e-202,-2.4475534230769232e-202,-2.3976033736263737e-202,-2.347653324175824e-202,-2.297703274725275e-202,-2.247753225274725e-202,-2.1978031758241753e-202,-2.1478531263736266e-202,-2.097903076923077e-202,-2.0479530274725275e-202,-1.9980029780219779e-202,-1.9480529285714288e-202,-1.8981028791208792e-202,-1.8481528296703296e-202,-1.7982027802197802e-202,-1.7482527307692309e-202,-1.6983026813186813e-202,-1.6483526318681317e-202,-1.5984025824175826e-202,-1.548452532967033e-202,-1.4985024835164834e-202,-1.4485524340659343e-202,-1.3986023846153844e-202,-1.348652335164835e-202,-1.298702285714286e-202,-1.2487522362637361e-202,-1.1988021868131868e-202,-1.1488521373626374e-202,-1.0989020879120878e-202,-1.0489520384615385e-202,-9.99001989010989e-203,-9.490519395604394e-203,-8.991018901098902e-203,-8.491518406593407e-203,-7.992017912087911e-203,-7.492517417582418e-203,-6.993016923076923e-203,-6.493516428571428e-203,-5.994015934065934e-203,-5.494515439560439e-203,-4.995014945054945e-203,-4.495514450549451e-203,-3.9960139560439556e-203,-3.4965134615384614e-203,-2.997012967032967e-203,-2.4975124725274722e-203,-1.998011978021978e-203,-1.4985114835164834e-203,-9.99010989010989e-204,-4.995104945054945e-204,-1.0e-208],"x":[-1.0e-200,-9.995004995054944e-201,-9.99000999010989e-201,-9.985014985164835e-201,-9.980019980219779e-201,-9.975024975274725e-201,-9.97002997032967e-201,-9.965034965384615e-201,-9.96003996043956e-201,-9.955044955494505e-201,-9.950049950549451e-201,-9.945054945604396e-201,-9.940059940659339e-201,-9.935064935714285e-201,-9.93006993076923e-201,-9.925074925824176e-201,-9.920079920879122e-201,-9.915084915934067e-201,-9.910089910989011e-201,-9.905094906043957e-201,-9.9000999010989e-201,-9.895104896153845e-201,-9.890109891208791e-201,-9.885114886263736e-201,-9.880119881318681e-201,-9.875124876373627e-201,-9.870129871428572e-201,-9.865134866483516e-201,-9.860139861538461e-201,-9.855144856593406e-201,-9.850149851648352e-201,-9.845154846703296e-201,-9.840159841758241e-201,-9.835164836813187e-201,-9.830169831868132e-201,-9.825174826923075e-201,-9.820179821978021e-201,-9.815184817032966e-201,-9.81018981208791e-201,-9.805194807142857e-201,-9.800199802197803e-201,-9.795204797252748e-201,-9.790209792307694e-201,-9.785214787362637e-201,-9.780219782417582e-201,-9.775224777472528e-201,-9.770229772527472e-201,-9.765234767582419e-201,-9.760239762637363e-201,-9.755244757692308e-201,-9.750249752747253e-201,-9.745254747802197e-201,-9.740259742857142e-201,-9.735264737912088e-201,-9.730269732967033e-201,-9.725274728021977e-201,-9.720279723076924e-201,-9.715284718131868e-201,-9.710289713186811e-201,-9.705294708241758e-201,-9.700299703296702e-201,-9.695304698351647e-201,-9.690309693406593e-201,-9.685314688461538e-201,-9.680319683516484e-201,-9.67532467857143e-201,-9.670329673626373e-201,-9.665334668681318e-201,-9.660339663736264e-201,-9.655344658791209e-201,-9.650349653846155e-201,-9.6453546489011e-201,-9.640359643956044e-201,-9.635364639010989e-201,-9.630369634065934e-201,-9.625374629120878e-201,-9.620379624175824e-201,-9.615384619230769e-201,-9.610389614285714e-201,-9.60539460934066e-201,-9.600399604395605e-201,-9.595404599450548e-201,-9.590409594505494e-201,-9.585414589560439e-201,-9.580419584615383e-201,-9.57542457967033e-201,-9.570429574725274e-201,-9.565434569780219e-201,-9.560439564835165e-201,-9.55544455989011e-201,-9.550449554945054e-201,-9.54545455e-201,-9.540459545054945e-201,-9.535464540109891e-201,-9.530469535164836e-201,-9.52547453021978e-201,-9.520479525274725e-201,-9.51548452032967e-201,-9.510489515384615e-201,-9.505494510439561e-201,-9.500499505494505e-201,-9.49550450054945e-201,-9.490509495604396e-201,-9.485514490659341e-201,-9.480519485714284e-201,-9.47552448076923e-201,-9.470529475824175e-201,-9.46553447087912e-201,-9.460539465934066e-201,-9.45554446098901e-201,-9.450549456043955e-201,-9.445554451098901e-201,-9.440559446153844e-201,-9.435564441208792e-201,-9.430569436263737e-201,-9.425574431318681e-201,-9.420579426373628e-201,-9.415584421428572e-201,-9.410589416483517e-201,-9.405594411538463e-201,-9.400599406593406e-201,-9.395604401648351e-201,-9.390609396703297e-201,-9.385614391758242e-201,-9.380619386813186e-201,-9.375624381868133e-201,-9.370629376923077e-201,-9.36563437197802e-201,-9.360639367032967e-201,-9.355644362087911e-201,-9.350649357142856e-201,-9.345654352197802e-201,-9.340659347252747e-201,-9.335664342307691e-201,-9.330669337362638e-201,-9.325674332417581e-201,-9.320679327472527e-201,-9.315684322527473e-201,-9.310689317582418e-201,-9.305694312637364e-201,-9.300699307692309e-201,-9.295704302747253e-201,-9.2907092978022e-201,-9.285714292857143e-201,-9.280719287912087e-201,-9.275724282967033e-201,-9.270729278021978e-201,-9.265734273076923e-201,-9.260739268131869e-201,-9.255744263186814e-201,-9.250749258241757e-201,-9.245754253296703e-201,-9.240759248351648e-201,-9.235764243406592e-201,-9.230769238461538e-201,-9.225774233516483e-201,-9.220779228571428e-201,-9.215784223626374e-201,-9.210789218681317e-201,-9.205794213736263e-201,-9.200799208791208e-201,-9.195804203846153e-201,-9.1908091989011e-201,-9.185814193956045e-201,-9.18081918901099e-201,-9.175824184065936e-201,-9.170829179120879e-201,-9.165834174175824e-201,-9.16083916923077e-201,-9.155844164285714e-201,-9.150849159340659e-201,-9.145854154395605e-201,-9.14085914945055e-201,-9.135864144505493e-201,-9.130869139560439e-201,-9.125874134615384e-201,-9.120879129670329e-201,-9.115884124725275e-201,-9.11088911978022e-201,-9.105894114835165e-201,-9.10089910989011e-201,-9.095904104945053e-201,-9.0909091e-201,-9.085914095054944e-201,-9.080919090109889e-201,-9.075924085164835e-201,-9.070929080219781e-201,-9.065934075274726e-201,-9.060939070329672e-201,-9.055944065384615e-201,-9.05094906043956e-201,-9.045954055494506e-201,-9.04095905054945e-201,-9.035964045604395e-201,-9.030969040659341e-201,-9.025974035714286e-201,-9.02097903076923e-201,-9.015984025824176e-201,-9.01098902087912e-201,-9.005994015934065e-201,-9.000999010989011e-201,-8.996004006043956e-201,-8.991009001098902e-201,-8.986013996153846e-201,-8.98101899120879e-201,-8.976023986263736e-201,-8.97102898131868e-201,-8.966033976373625e-201,-8.961038971428571e-201,-8.956043966483516e-201,-8.95104896153846e-201,-8.946053956593408e-201,-8.941058951648352e-201,-8.936063946703296e-201,-8.931068941758242e-201,-8.926073936813187e-201,-8.921078931868132e-201,-8.916083926923078e-201,-8.911088921978022e-201,-8.906093917032966e-201,-8.901098912087912e-201,-8.896103907142857e-201,-8.891108902197803e-201,-8.886113897252747e-201,-8.881118892307692e-201,-8.876123887362638e-201,-8.871128882417583e-201,-8.866133877472526e-201,-8.861138872527472e-201,-8.856143867582417e-201,-8.851148862637362e-201,-8.846153857692308e-201,-8.841158852747252e-201,-8.836163847802197e-201,-8.831168842857143e-201,-8.826173837912088e-201,-8.821178832967032e-201,-8.816183828021979e-201,-8.811188823076923e-201,-8.806193818131868e-201,-8.801198813186814e-201,-8.796203808241759e-201,-8.791208803296702e-201,-8.786213798351648e-201,-8.781218793406593e-201,-8.776223788461539e-201,-8.771228783516484e-201,-8.766233778571428e-201,-8.761238773626374e-201,-8.756243768681319e-201,-8.751248763736262e-201,-8.746253758791208e-201,-8.741258753846153e-201,-8.736263748901098e-201,-8.731268743956044e-201,-8.726273739010989e-201,-8.721278734065933e-201,-8.71628372912088e-201,-8.711288724175823e-201,-8.706293719230769e-201,-8.701298714285715e-201,-8.69630370934066e-201,-8.691308704395604e-201,-8.68631369945055e-201,-8.681318694505495e-201,-8.676323689560438e-201,-8.671328684615384e-201,-8.666333679670329e-201,-8.661338674725275e-201,-8.65634366978022e-201,-8.651348664835165e-201,-8.646353659890111e-201,-8.641358654945055e-201,-8.636363649999999e-201,-8.631368645054945e-201,-8.62637364010989e-201,-8.621378635164834e-201,-8.61638363021978e-201,-8.611388625274725e-201,-8.60639362032967e-201,-8.601398615384616e-201,-8.596403610439559e-201,-8.591408605494504e-201,-8.58641360054945e-201,-8.581418595604396e-201,-8.57642359065934e-201,-8.571428585714287e-201,-8.566433580769231e-201,-8.561438575824176e-201,-8.556443570879121e-201,-8.551448565934065e-201,-8.546453560989012e-201,-8.541458556043956e-201,-8.536463551098901e-201,-8.531468546153847e-201,-8.526473541208792e-201,-8.521478536263735e-201,-8.516483531318681e-201,-8.511488526373626e-201,-8.50649352142857e-201,-8.501498516483517e-201,-8.496503511538461e-201,-8.491508506593406e-201,-8.486513501648352e-201,-8.481518496703295e-201,-8.47652349175824e-201,-8.471528486813186e-201,-8.466533481868131e-201,-8.461538476923077e-201,-8.456543471978023e-201,-8.451548467032968e-201,-8.446553462087912e-201,-8.441558457142857e-201,-8.436563452197802e-201,-8.431568447252748e-201,-8.426573442307693e-201,-8.421578437362637e-201,-8.416583432417583e-201,-8.411588427472528e-201,-8.406593422527471e-201,-8.401598417582417e-201,-8.396603412637362e-201,-8.391608407692307e-201,-8.386613402747253e-201,-8.381618397802198e-201,-8.376623392857142e-201,-8.371628387912088e-201,-8.366633382967032e-201,-8.361638378021976e-201,-8.356643373076922e-201,-8.351648368131867e-201,-8.346653363186812e-201,-8.34165835824176e-201,-8.336663353296704e-201,-8.33166834835165e-201,-8.326673343406593e-201,-8.321678338461538e-201,-8.316683333516484e-201,-8.311688328571429e-201,-8.306693323626374e-201,-8.30169831868132e-201,-8.296703313736264e-201,-8.291708308791208e-201,-8.286713303846154e-201,-8.281718298901098e-201,-8.276723293956043e-201,-8.271728289010989e-201,-8.266733284065934e-201,-8.261738279120879e-201,-8.256743274175825e-201,-8.251748269230768e-201,-8.246753264285713e-201,-8.241758259340659e-201,-8.236763254395603e-201,-8.23176824945055e-201,-8.226773244505494e-201,-8.221778239560439e-201,-8.216783234615386e-201,-8.21178822967033e-201,-8.206793224725274e-201,-8.20179821978022e-201,-8.196803214835165e-201,-8.19180820989011e-201,-8.186813204945056e-201,-8.1818182e-201,-8.176823195054944e-201,-8.17182819010989e-201,-8.166833185164835e-201,-8.16183818021978e-201,-8.156843175274726e-201,-8.15184817032967e-201,-8.146853165384615e-201,-8.141858160439561e-201,-8.136863155494504e-201,-8.131868150549449e-201,-8.126873145604395e-201,-8.12187814065934e-201,-8.116883135714286e-201,-8.11188813076923e-201,-8.106893125824175e-201,-8.101898120879121e-201,-8.096903115934066e-201,-8.09190811098901e-201,-8.086913106043957e-201,-8.081918101098902e-201,-8.076923096153846e-201,-8.071928091208792e-201,-8.066933086263737e-201,-8.06193808131868e-201,-8.056943076373626e-201,-8.051948071428571e-201,-8.046953066483516e-201,-8.041958061538462e-201,-8.036963056593407e-201,-8.031968051648351e-201,-8.026973046703297e-201,-8.02197804175824e-201,-8.016983036813185e-201,-8.011988031868131e-201,-8.006993026923076e-201,-8.001998021978022e-201,-7.997003017032967e-201,-7.992008012087912e-201,-7.987013007142858e-201,-7.982018002197801e-201,-7.977022997252746e-201,-7.972027992307693e-201,-7.967032987362638e-201,-7.962037982417583e-201,-7.957042977472529e-201,-7.952047972527473e-201,-7.947052967582417e-201,-7.942057962637363e-201,-7.937062957692307e-201,-7.932067952747252e-201,-7.927072947802198e-201,-7.922077942857143e-201,-7.917082937912088e-201,-7.912087932967034e-201,-7.907092928021977e-201,-7.902097923076923e-201,-7.897102918131868e-201,-7.892107913186812e-201,-7.887112908241759e-201,-7.882117903296703e-201,-7.877122898351648e-201,-7.872127893406594e-201,-7.867132888461537e-201,-7.862137883516482e-201,-7.857142878571428e-201,-7.852147873626374e-201,-7.847152868681319e-201,-7.842157863736265e-201,-7.83716285879121e-201,-7.832167853846153e-201,-7.827172848901099e-201,-7.822177843956044e-201,-7.817182839010988e-201,-7.812187834065934e-201,-7.807192829120879e-201,-7.802197824175825e-201,-7.79720281923077e-201,-7.792207814285713e-201,-7.78721280934066e-201,-7.782217804395604e-201,-7.777222799450549e-201,-7.772227794505495e-201,-7.76723278956044e-201,-7.762237784615384e-201,-7.75724277967033e-201,-7.752247774725274e-201,-7.747252769780218e-201,-7.742257764835164e-201,-7.737262759890109e-201,-7.732267754945055e-201,-7.727272750000001e-201,-7.722277745054946e-201,-7.717282740109889e-201,-7.712287735164835e-201,-7.70729273021978e-201,-7.702297725274725e-201,-7.697302720329671e-201,-7.692307715384615e-201,-7.687312710439562e-201,-7.682317705494506e-201,-7.67732270054945e-201,-7.672327695604396e-201,-7.66733269065934e-201,-7.662337685714285e-201,-7.657342680769231e-201,-7.652347675824176e-201,-7.64735267087912e-201,-7.642357665934067e-201,-7.63736266098901e-201,-7.632367656043955e-201,-7.6273726510989e-201,-7.622377646153845e-201,-7.61738264120879e-201,-7.612387636263736e-201,-7.607392631318682e-201,-7.602397626373626e-201,-7.597402621428572e-201,-7.592407616483516e-201,-7.587412611538461e-201,-7.582417606593407e-201,-7.577422601648352e-201,-7.572427596703298e-201,-7.567432591758243e-201,-7.562437586813186e-201,-7.557442581868132e-201,-7.552447576923077e-201,-7.547452571978021e-201,-7.542457567032967e-201,-7.537462562087912e-201,-7.532467557142857e-201,-7.527472552197803e-201,-7.522477547252746e-201,-7.517482542307691e-201,-7.512487537362637e-201,-7.507492532417582e-201,-7.502497527472526e-201,-7.497502522527472e-201,-7.492507517582417e-201,-7.487512512637362e-201,-7.482517507692308e-201,-7.477522502747253e-201,-7.472527497802199e-201,-7.467532492857143e-201,-7.462537487912088e-201,-7.457542482967034e-201,-7.452547478021979e-201,-7.447552473076922e-201,-7.442557468131868e-201,-7.437562463186813e-201,-7.432567458241758e-201,-7.427572453296704e-201,-7.422577448351648e-201,-7.417582443406593e-201,-7.412587438461539e-201,-7.407592433516482e-201,-7.402597428571427e-201,-7.397602423626373e-201,-7.392607418681318e-201,-7.387612413736263e-201,-7.382617408791209e-201,-7.377622403846153e-201,-7.372627398901097e-201,-7.367632393956044e-201,-7.362637389010989e-201,-7.357642384065935e-201,-7.35264737912088e-201,-7.347652374175824e-201,-7.34265736923077e-201,-7.337662364285715e-201,-7.332667359340658e-201,-7.327672354395605e-201,-7.32267734945055e-201,-7.317682344505494e-201,-7.31268733956044e-201,-7.307692334615385e-201,-7.30269732967033e-201,-7.297702324725276e-201,-7.292707319780219e-201,-7.287712314835163e-201,-7.28271730989011e-201,-7.277722304945054e-201,-7.272727299999999e-201,-7.267732295054945e-201,-7.26273729010989e-201,-7.257742285164834e-201,-7.252747280219779e-201,-7.247752275274724e-201,-7.242757270329671e-201,-7.237762265384616e-201,-7.232767260439561e-201,-7.227772255494507e-201,-7.222777250549452e-201,-7.217782245604395e-201,-7.212787240659341e-201,-7.207792235714286e-201,-7.20279723076923e-201,-7.197802225824176e-201,-7.192807220879121e-201,-7.187812215934066e-201,-7.182817210989012e-201,-7.177822206043955e-201,-7.1728272010989e-201,-7.167832196153846e-201,-7.16283719120879e-201,-7.157842186263735e-201,-7.152847181318681e-201,-7.147852176373626e-201,-7.142857171428572e-201,-7.137862166483515e-201,-7.13286716153846e-201,-7.127872156593406e-201,-7.122877151648352e-201,-7.117882146703297e-201,-7.112887141758243e-201,-7.107892136813188e-201,-7.102897131868131e-201,-7.097902126923077e-201,-7.092907121978022e-201,-7.087912117032967e-201,-7.082917112087913e-201,-7.077922107142857e-201,-7.072927102197802e-201,-7.067932097252748e-201,-7.062937092307691e-201,-7.057942087362636e-201,-7.052947082417582e-201,-7.047952077472527e-201,-7.042957072527472e-201,-7.037962067582418e-201,-7.032967062637362e-201,-7.027972057692309e-201,-7.022977052747252e-201,-7.017982047802196e-201,-7.012987042857143e-201,-7.007992037912087e-201,-7.002997032967032e-201,-6.99800202802198e-201,-6.993007023076924e-201,-6.988012018131867e-201,-6.983017013186814e-201,-6.978022008241758e-201,-6.973027003296703e-201,-6.968031998351649e-201,-6.963036993406594e-201,-6.958041988461538e-201,-6.953046983516485e-201,-6.948051978571428e-201,-6.943056973626372e-201,-6.938061968681319e-201,-6.933066963736263e-201,-6.92807195879121e-201,-6.923076953846154e-201,-6.918081948901099e-201,-6.913086943956045e-201,-6.908091939010988e-201,-6.903096934065933e-201,-6.898101929120879e-201,-6.893106924175824e-201,-6.888111919230768e-201,-6.883116914285714e-201,-6.87812190934066e-201,-6.873126904395604e-201,-6.86813189945055e-201,-6.863136894505495e-201,-6.858141889560439e-201,-6.853146884615385e-201,-6.84815187967033e-201,-6.843156874725275e-201,-6.838161869780221e-201,-6.833166864835164e-201,-6.828171859890109e-201,-6.823176854945055e-201,-6.81818185e-201,-6.813186845054946e-201,-6.80819184010989e-201,-6.803196835164835e-201,-6.798201830219781e-201,-6.793206825274724e-201,-6.788211820329669e-201,-6.783216815384615e-201,-6.77822181043956e-201,-6.773226805494505e-201,-6.76823180054945e-201,-6.763236795604395e-201,-6.75824179065934e-201,-6.753246785714286e-201,-6.748251780769231e-201,-6.743256775824176e-201,-6.738261770879122e-201,-6.733266765934066e-201,-6.728271760989011e-201,-6.723276756043957e-201,-6.7182817510989e-201,-6.713286746153845e-201,-6.708291741208791e-201,-6.703296736263736e-201,-6.698301731318682e-201,-6.693306726373627e-201,-6.688311721428571e-201,-6.683316716483517e-201,-6.67832171153846e-201,-6.673326706593407e-201,-6.668331701648352e-201,-6.663336696703296e-201,-6.658341691758242e-201,-6.653346686813187e-201,-6.648351681868132e-201,-6.643356676923076e-201,-6.638361671978022e-201,-6.633366667032967e-201,-6.628371662087912e-201,-6.623376657142857e-201,-6.618381652197803e-201,-6.613386647252746e-201,-6.608391642307692e-201,-6.603396637362638e-201,-6.598401632417583e-201,-6.593406627472527e-201,-6.588411622527472e-201,-6.583416617582418e-201,-6.578421612637363e-201,-6.573426607692308e-201,-6.568431602747252e-201,-6.563436597802197e-201,-6.558441592857143e-201,-6.553446587912088e-201,-6.548451582967033e-201,-6.543456578021979e-201,-6.538461573076923e-201,-6.533466568131868e-201,-6.5284715631868134e-201,-6.523476558241758e-201,-6.518481553296703e-201,-6.513486548351648e-201,-6.5084915434065936e-201,-6.503496538461538e-201,-6.498501533516483e-201,-6.493506528571428e-201,-6.488511523626373e-201,-6.483516518681319e-201,-6.478521513736264e-201,-6.4735265087912085e-201,-6.468531503846154e-201,-6.463536498901099e-201,-6.458541493956044e-201,-6.453546489010989e-201,-6.448551484065934e-201,-6.4435564791208795e-201,-6.4385614741758234e-201,-6.433566469230769e-201,-6.428571464285714e-201,-6.4235764593406596e-201,-6.418581454395604e-201,-6.41358644945055e-201,-6.408591444505495e-201,-6.403596439560439e-201,-6.3986014346153845e-201,-6.39360642967033e-201,-6.3886114247252746e-201,-6.383616419780219e-201,-6.378621414835165e-201,-6.373626409890109e-201,-6.368631404945055e-201,-6.3636363999999994e-201,-6.358641395054945e-201,-6.35364639010989e-201,-6.3486513851648356e-201,-6.34365638021978e-201,-6.338661375274725e-201,-6.3336663703296704e-201,-6.328671365384616e-201,-6.32367636043956e-201,-6.318681355494505e-201,-6.3136863505494505e-201,-6.308691345604395e-201,-6.30369634065934e-201,-6.298701335714286e-201,-6.2937063307692314e-201,-6.2887113258241754e-201,-6.283716320879121e-201,-6.278721315934066e-201,-6.273726310989011e-201,-6.2687313060439556e-201,-6.263736301098901e-201,-6.2587412961538456e-201,-6.253746291208791e-201,-6.248751286263736e-201,-6.243756281318681e-201,-6.2387612763736265e-201,-6.233766271428572e-201,-6.2287712664835166e-201,-6.223776261538461e-201,-6.218781256593407e-201,-6.213786251648352e-201,-6.208791246703296e-201,-6.2037962417582415e-201,-6.198801236813187e-201,-6.1938062318681315e-201,-6.188811226923076e-201,-6.1838162219780216e-201,-6.178821217032968e-201,-6.173826212087912e-201,-6.168831207142857e-201,-6.1638362021978025e-201,-6.158841197252747e-201,-6.153846192307692e-201,-6.148851187362637e-201,-6.143856182417582e-201,-6.138861177472527e-201,-6.133866172527472e-201,-6.1288711675824174e-201,-6.123876162637362e-201,-6.118881157692308e-201,-6.113886152747253e-201,-6.1088911478021976e-201,-6.103896142857143e-201,-6.0989011379120884e-201,-6.0939061329670324e-201,-6.088911128021978e-201,-6.083916123076923e-201,-6.0789211181318686e-201,-6.0739261131868125e-201,-6.068931108241758e-201,-6.063936103296703e-201,-6.058941098351647e-201,-6.0539460934065934e-201,-6.048951088461539e-201,-6.0439560835164835e-201,-6.038961078571428e-201,-6.0339660736263736e-201,-6.028971068681319e-201,-6.023976063736264e-201,-6.018981058791208e-201,-6.013986053846154e-201,-6.0089910489010984e-201,-6.003996043956044e-201,-5.9990010390109885e-201,-5.994006034065934e-201,-5.989011029120879e-201,-5.984016024175825e-201,-5.979021019230769e-201,-5.974026014285714e-201,-5.9690310093406595e-201,-5.964036004395605e-201,-5.959040999450549e-201,-5.954045994505494e-201,-5.94905098956044e-201,-5.944055984615384e-201,-5.939060979670329e-201,-5.934065974725275e-201,-5.92907096978022e-201,-5.9240759648351645e-201,-5.91908095989011e-201,-5.914085954945055e-201,-5.90909095e-201,-5.904095945054945e-201,-5.89910094010989e-201,-5.894105935164835e-201,-5.88911093021978e-201,-5.884115925274725e-201,-5.8791209203296695e-201,-5.874125915384616e-201,-5.869130910439561e-201,-5.864135905494506e-201,-5.8591409005494504e-201,-5.854145895604396e-201,-5.849150890659341e-201,-5.844155885714285e-201,-5.8391608807692306e-201,-5.834165875824176e-201,-5.829170870879121e-201,-5.824175865934065e-201,-5.819180860989011e-201,-5.814185856043956e-201,-5.809190851098901e-201,-5.804195846153846e-201,-5.7992008412087916e-201,-5.794205836263736e-201,-5.789210831318681e-201,-5.7842158263736264e-201,-5.779220821428571e-201,-5.7742258164835165e-201,-5.769230811538461e-201,-5.764235806593406e-201,-5.759240801648351e-201,-5.754245796703297e-201,-5.749250791758242e-201,-5.744255786813187e-201,-5.739260781868132e-201,-5.7342657769230775e-201,-5.7292707719780215e-201,-5.724275767032967e-201,-5.719280762087912e-201,-5.714285757142857e-201,-5.709290752197802e-201,-5.704295747252747e-201,-5.6993007423076925e-201,-5.6943057373626364e-201,-5.6893107324175825e-201,-5.684315727472528e-201,-5.6793207225274726e-201,-5.674325717582417e-201,-5.669330712637363e-201,-5.6643357076923074e-201,-5.659340702747253e-201,-5.6543456978021975e-201,-5.649350692857142e-201,-5.6443556879120875e-201,-5.639360682967033e-201,-5.6343656780219776e-201,-5.629370673076923e-201,-5.6243756681318684e-201,-5.619380663186814e-201,-5.614385658241758e-201,-5.609390653296703e-201,-5.6043956483516486e-201,-5.599400643406593e-201,-5.594405638461538e-201,-5.5894106335164834e-201,-5.584415628571429e-201,-5.579420623626373e-201,-5.574425618681318e-201,-5.569430613736264e-201,-5.564435608791209e-201,-5.5594406038461536e-201,-5.554445598901099e-201,-5.549450593956044e-201,-5.544455589010989e-201,-5.539460584065934e-201,-5.534465579120879e-201,-5.529470574175824e-201,-5.524475569230769e-201,-5.519480564285714e-201,-5.5144855593406586e-201,-5.509490554395605e-201,-5.50449554945055e-201,-5.499500544505494e-201,-5.4945055395604395e-201,-5.489510534615385e-201,-5.48451552967033e-201,-5.479520524725274e-201,-5.47452551978022e-201,-5.469530514835165e-201,-5.46453550989011e-201,-5.4595405049450544e-201,-5.4545455e-201,-5.449550495054945e-201,-5.44455549010989e-201,-5.439560485164835e-201,-5.43456548021978e-201,-5.4295704752747254e-201,-5.42457547032967e-201,-5.4195804653846155e-201,-5.41458546043956e-201,-5.4095904554945056e-201,-5.40459545054945e-201,-5.399600445604395e-201,-5.39460544065934e-201,-5.389610435714286e-201,-5.3846154307692304e-201,-5.379620425824176e-201,-5.374625420879121e-201,-5.3696304159340666e-201,-5.3646354109890106e-201,-5.359640406043956e-201,-5.3546454010989014e-201,-5.349650396153846e-201,-5.344655391208791e-201,-5.339660386263736e-201,-5.334665381318681e-201,-5.3296703763736255e-201,-5.324675371428572e-201,-5.319680366483517e-201,-5.314685361538462e-201,-5.3096903565934064e-201,-5.304695351648352e-201,-5.2997003467032965e-201,-5.294705341758242e-201,-5.2897103368131866e-201,-5.284715331868131e-201,-5.279720326923077e-201,-5.274725321978022e-201,-5.269730317032966e-201,-5.264735312087912e-201,-5.2597403071428575e-201,-5.254745302197803e-201,-5.249750297252747e-201,-5.244755292307692e-201,-5.239760287362638e-201,-5.2347652824175824e-201,-5.229770277472527e-201,-5.2247752725274725e-201,-5.219780267582417e-201,-5.214785262637362e-201,-5.209790257692307e-201,-5.2047952527472534e-201,-5.199800247802198e-201,-5.194805242857143e-201,-5.189810237912088e-201,-5.184815232967033e-201,-5.179820228021978e-201,-5.174825223076923e-201,-5.1698302181318676e-201,-5.164835213186813e-201,-5.1598402082417584e-201,-5.154845203296702e-201,-5.149850198351648e-201,-5.144855193406594e-201,-5.139860188461539e-201,-5.134865183516483e-201,-5.1298701785714286e-201,-5.124875173626374e-201,-5.119880168681319e-201,-5.1148851637362634e-201,-5.109890158791209e-201,-5.1048951538461535e-201,-5.099900148901098e-201,-5.0949051439560436e-201,-5.089910139010989e-201,-5.0849151340659336e-201,-5.079920129120879e-201,-5.0749251241758244e-201,-5.069930119230769e-201,-5.0649351142857145e-201,-5.059940109340659e-201,-5.054945104395604e-201,-5.049950099450549e-201,-5.044955094505495e-201,-5.0399600895604394e-201,-5.034965084615384e-201,-5.0299700796703295e-201,-5.024975074725275e-201,-5.0199800697802195e-201,-5.014985064835165e-201,-5.00999005989011e-201,-5.004995054945055e-201,-5.00000005e-201,-4.995005045054945e-201,-4.9900100401098905e-201,-4.9850150351648345e-201,-4.98002003021978e-201,-4.975025025274725e-201,-4.97003002032967e-201,-4.9650350153846146e-201,-4.960040010439561e-201,-4.9550450054945054e-201,-4.950050000549451e-201,-4.9450549956043955e-201,-4.94005999065934e-201,-4.9350649857142856e-201,-4.930069980769231e-201,-4.925074975824176e-201,-4.9200799708791204e-201,-4.915084965934066e-201,-4.910089960989011e-201,-4.905094956043955e-201,-4.900099951098901e-201,-4.895104946153847e-201,-4.890109941208791e-201,-4.885114936263736e-201,-4.8801199313186814e-201,-4.875124926373627e-201,-4.8701299214285715e-201,-4.865134916483516e-201,-4.8601399115384616e-201,-4.855144906593406e-201,-4.850149901648351e-201,-4.845154896703296e-201,-4.840159891758242e-201,-4.835164886813187e-201,-4.830169881868132e-201,-4.825174876923077e-201,-4.820179871978022e-201,-4.815184867032967e-201,-4.810189862087912e-201,-4.805194857142857e-201,-4.800199852197802e-201,-4.7952048472527475e-201,-4.7902098423076914e-201,-4.785214837362637e-201,-4.780219832417582e-201,-4.7752248274725284e-201,-4.770229822527472e-201,-4.765234817582418e-201,-4.760239812637363e-201,-4.755244807692308e-201,-4.7502498027472525e-201,-4.745254797802198e-201,-4.7402597928571426e-201,-4.735264787912087e-201,-4.730269782967033e-201,-4.725274778021977e-201,-4.720279773076923e-201,-4.715284768131868e-201,-4.7102897631868136e-201,-4.705294758241758e-201,-4.7002997532967036e-201,-4.695304748351648e-201,-4.690309743406593e-201,-4.6853147384615384e-201,-4.680319733516484e-201,-4.675324728571428e-201,-4.670329723626373e-201,-4.6653347186813186e-201,-4.660339713736264e-201,-4.655344708791209e-201,-4.650349703846154e-201,-4.6453546989010995e-201,-4.640359693956044e-201,-4.635364689010989e-201,-4.630369684065934e-201,-4.625374679120879e-201,-4.6203796741758236e-201,-4.615384669230769e-201,-4.610389664285714e-201,-4.605394659340659e-201,-4.600399654395604e-201,-4.59540464945055e-201,-4.5904096445054945e-201,-4.58541463956044e-201,-4.5804196346153846e-201,-4.575424629670329e-201,-4.570429624725275e-201,-4.56543461978022e-201,-4.560439614835164e-201,-4.5554446098901095e-201,-4.550449604945055e-201,-4.5454546e-201,-4.540459595054944e-201,-4.5354645901098904e-201,-4.530469585164836e-201,-4.5254745802197804e-201,-4.520479575274725e-201,-4.5154845703296705e-201,-4.510489565384615e-201,-4.50549456043956e-201,-4.500499555494505e-201,-4.495504550549451e-201,-4.4905095456043954e-201,-4.48551454065934e-201,-4.4805195357142855e-201,-4.47552453076923e-201,-4.470529525824176e-201,-4.465534520879121e-201,-4.4605395159340656e-201,-4.455544510989011e-201,-4.4505495060439564e-201,-4.445554501098901e-201,-4.440559496153846e-201,-4.435564491208791e-201,-4.4305694862637366e-201,-4.4255744813186806e-201,-4.420579476373626e-201,-4.415584471428571e-201,-4.410589466483517e-201,-4.4055944615384614e-201,-4.400599456593407e-201,-4.3956044516483515e-201,-4.390609446703297e-201,-4.3856144417582416e-201,-4.380619436813187e-201,-4.375624431868132e-201,-4.3706294269230764e-201,-4.365634421978022e-201,-4.3606394170329665e-201,-4.355644412087912e-201,-4.350649407142857e-201,-4.345654402197802e-201,-4.340659397252747e-201,-4.335664392307693e-201,-4.3306693873626374e-201,-4.325674382417582e-201,-4.3206793774725275e-201,-4.315684372527473e-201,-4.310689367582417e-201,-4.305694362637362e-201,-4.300699357692308e-201,-4.295704352747252e-201,-4.290709347802198e-201,-4.285714342857143e-201,-4.2807193379120886e-201,-4.275724332967033e-201,-4.270729328021978e-201,-4.265734323076923e-201,-4.260739318131868e-201,-4.255744313186813e-201,-4.250749308241758e-201,-4.245754303296703e-201,-4.240759298351648e-201,-4.235764293406593e-201,-4.230769288461538e-201,-4.225774283516484e-201,-4.220779278571429e-201,-4.215784273626374e-201,-4.2107892686813184e-201,-4.205794263736264e-201,-4.200799258791209e-201,-4.195804253846153e-201,-4.1908092489010986e-201,-4.185814243956044e-201,-4.180819239010989e-201,-4.175824234065933e-201,-4.1708292291208795e-201,-4.165834224175825e-201,-4.1608392192307696e-201,-4.155844214285714e-201,-4.15084920934066e-201,-4.145854204395604e-201,-4.140859199450549e-201,-4.1358641945054944e-201,-4.130869189560439e-201,-4.1258741846153845e-201,-4.120879179670329e-201,-4.1158841747252746e-201,-4.110889169780219e-201,-4.1058941648351654e-201,-4.10089915989011e-201,-4.095904154945055e-201,-4.09090915e-201,-4.0859141450549455e-201,-4.0809191401098895e-201,-4.075924135164835e-201,-4.07092913021978e-201,-4.065934125274726e-201,-4.06093912032967e-201,-4.055944115384615e-201,-4.0509491104395605e-201,-4.045954105494506e-201,-4.0409591005494506e-201,-4.035964095604396e-201,-4.030969090659341e-201,-4.025974085714285e-201,-4.020979080769231e-201,-4.0159840758241754e-201,-4.010989070879121e-201,-4.0059940659340655e-201,-4.000999060989011e-201,-3.9960040560439556e-201,-3.991009051098901e-201,-3.9860140461538464e-201,-3.981019041208791e-201,-3.9760240362637365e-201,-3.971029031318682e-201,-3.966034026373626e-201,-3.961039021428571e-201,-3.9560440164835166e-201,-3.951049011538462e-201,-3.946054006593406e-201,-3.9410590016483514e-201,-3.936063996703297e-201,-3.9310689917582415e-201,-3.926073986813187e-201,-3.921078981868132e-201,-3.916083976923077e-201,-3.9110889719780216e-201,-3.906093967032967e-201,-3.9010989620879124e-201,-3.896103957142857e-201,-3.891108952197802e-201,-3.886113947252747e-201,-3.881118942307692e-201,-3.876123937362637e-201,-3.871128932417582e-201,-3.8661339274725274e-201,-3.861138922527473e-201,-3.856143917582418e-201,-3.851148912637362e-201,-3.8461539076923075e-201,-3.841158902747253e-201,-3.836163897802198e-201,-3.831168892857142e-201,-3.826173887912088e-201,-3.821178882967033e-201,-3.816183878021978e-201,-3.8111888730769225e-201,-3.806193868131868e-201,-3.801198863186813e-201,-3.796203858241759e-201,-3.791208853296703e-201,-3.786213848351649e-201,-3.7812188434065934e-201,-3.776223838461538e-201,-3.7712288335164835e-201,-3.766233828571428e-201,-3.7612388236263736e-201,-3.756243818681318e-201,-3.751248813736263e-201,-3.746253808791208e-201,-3.7412588038461545e-201,-3.736263798901099e-201,-3.731268793956044e-201,-3.726273789010989e-201,-3.721278784065935e-201,-3.7162837791208786e-201,-3.711288774175824e-201,-3.7062937692307694e-201,-3.701298764285714e-201,-3.696303759340659e-201,-3.691308754395604e-201,-3.686313749450549e-201,-3.681318744505495e-201,-3.67632373956044e-201,-3.671328734615385e-201,-3.66633372967033e-201,-3.6613387247252744e-201,-3.65634371978022e-201,-3.6513487148351645e-201,-3.64635370989011e-201,-3.6413587049450546e-201,-3.636363699999999e-201,-3.631368695054945e-201,-3.62637369010989e-201,-3.6213786851648355e-201,-3.61638368021978e-201,-3.6113886752747256e-201,-3.606393670329671e-201,-3.601398665384615e-201,-3.59640366043956e-201,-3.591408655494506e-201,-3.5864136505494504e-201,-3.581418645604395e-201,-3.5764236406593405e-201,-3.571428635714286e-201,-3.5664336307692306e-201,-3.561438625824176e-201,-3.5564436208791214e-201,-3.551448615934066e-201,-3.546453610989011e-201,-3.541458606043956e-201,-3.536463601098901e-201,-3.531468596153846e-201,-3.526473591208791e-201,-3.5214785862637356e-201,-3.516483581318681e-201,-3.5114885763736264e-201,-3.506493571428571e-201,-3.501498566483516e-201,-3.496503561538462e-201,-3.491508556593407e-201,-3.486513551648351e-201,-3.481518546703297e-201,-3.476523541758242e-201,-3.471528536813187e-201,-3.4665335318681314e-201,-3.461538526923077e-201,-3.456543521978022e-201,-3.451548517032967e-201,-3.4465535120879116e-201,-3.441558507142857e-201,-3.4365635021978024e-201,-3.431568497252747e-201,-3.4265734923076925e-201,-3.421578487362637e-201,-3.4165834824175825e-201,-3.411588477472527e-201,-3.4065934725274726e-201,-3.401598467582417e-201,-3.396603462637363e-201,-3.3916084576923074e-201,-3.386613452747252e-201,-3.3816184478021975e-201,-3.3766234428571436e-201,-3.3716284379120876e-201,-3.366633432967033e-201,-3.3616384280219784e-201,-3.356643423076924e-201,-3.351648418131868e-201,-3.346653413186813e-201,-3.3416584082417585e-201,-3.336663403296703e-201,-3.3316683983516486e-201,-3.326673393406593e-201,-3.321678388461539e-201,-3.3166833835164834e-201,-3.311688378571428e-201,-3.3066933736263735e-201,-3.301698368681319e-201,-3.2967033637362635e-201,-3.291708358791209e-201,-3.2867133538461536e-201,-3.281718348901098e-201,-3.276723343956044e-201,-3.271728339010989e-201,-3.2667333340659345e-201,-3.261738329120879e-201,-3.2567433241758242e-201,-3.251748319230769e-201,-3.2467533142857143e-201,-3.2417583093406594e-201,-3.2367633043956044e-201,-3.2317682994505494e-201,-3.2267732945054945e-201,-3.2217782895604395e-201,-3.2167832846153846e-201,-3.2117882796703296e-201,-3.206793274725275e-201,-3.2017982697802197e-201,-3.196803264835165e-201,-3.1918082598901098e-201,-3.1868132549450545e-201,-3.18181825e-201,-3.176823245054945e-201,-3.1718282401098903e-201,-3.166833235164835e-201,-3.16183823021978e-201,-3.156843225274725e-201,-3.15184822032967e-201,-3.1468532153846155e-201,-3.1418582104395605e-201,-3.1368632054945052e-201,-3.1318682005494506e-201,-3.1268731956043953e-201,-3.1218781906593407e-201,-3.1168831857142858e-201,-3.1118881807692308e-201,-3.106893175824176e-201,-3.101898170879121e-201,-3.096903165934066e-201,-3.091908160989011e-201,-3.086913156043956e-201,-3.0819181510989014e-201,-3.076923146153846e-201,-3.0719281412087908e-201,-3.066933136263736e-201,-3.061938131318681e-201,-3.0569431263736266e-201,-3.0519481214285713e-201,-3.0469531164835163e-201,-3.0419581115384614e-201,-3.0369631065934064e-201,-3.0319681016483515e-201,-3.026973096703297e-201,-3.0219780917582415e-201,-3.016983086813187e-201,-3.0119880818681316e-201,-3.006993076923077e-201,-3.0019980719780217e-201,-2.997003067032967e-201,-2.992008062087912e-201,-2.9870130571428572e-201,-2.9820180521978022e-201,-2.9770230472527473e-201,-2.972028042307692e-201,-2.9670330373626377e-201,-2.9620380324175824e-201,-2.9570430274725278e-201,-2.9520480225274725e-201,-2.947053017582417e-201,-2.9420580126373626e-201,-2.9370630076923076e-201,-2.932068002747253e-201,-2.9270729978021977e-201,-2.9220779928571427e-201,-2.9170829879120878e-201,-2.9120879829670328e-201,-2.9070929780219782e-201,-2.9020979730769233e-201,-2.897102968131868e-201,-2.8921079631868133e-201,-2.887112958241758e-201,-2.882117953296703e-201,-2.8771229483516485e-201,-2.8721279434065935e-201,-2.8671329384615386e-201,-2.8621379335164836e-201,-2.8571429285714283e-201,-2.8521479236263737e-201,-2.8471529186813184e-201,-2.842157913736264e-201,-2.8371629087912088e-201,-2.8321679038461535e-201,-2.827172898901099e-201,-2.8221778939560436e-201,-2.817182889010989e-201,-2.812187884065934e-201,-2.807192879120879e-201,-2.802197874175824e-201,-2.797202869230769e-201,-2.792207864285714e-201,-2.7872128593406592e-201,-2.7822178543956043e-201,-2.7772228494505497e-201,-2.7722278445054943e-201,-2.7672328395604397e-201,-2.7622378346153844e-201,-2.7572428296703295e-201,-2.752247824725275e-201,-2.74725281978022e-201,-2.742257814835165e-201,-2.73726280989011e-201,-2.7322678049450547e-201,-2.7272728e-201,-2.722277795054945e-201,-2.7172827901098898e-201,-2.7122877851648352e-201,-2.70729278021978e-201,-2.7022977752747253e-201,-2.69730277032967e-201,-2.6923077653846154e-201,-2.6873127604395604e-201,-2.6823177554945054e-201,-2.6773227505494505e-201,-2.6723277456043955e-201,-2.6673327406593402e-201,-2.662337735714286e-201,-2.6573427307692307e-201,-2.652347725824176e-201,-2.6473527208791207e-201,-2.6423577159340658e-201,-2.637362710989011e-201,-2.6323677060439562e-201,-2.6273727010989013e-201,-2.6223776961538463e-201,-2.617382691208791e-201,-2.6123876862637364e-201,-2.607392681318681e-201,-2.602397676373627e-201,-2.5974026714285715e-201,-2.5924076664835162e-201,-2.5874126615384616e-201,-2.5824176565934063e-201,-2.5774226516483517e-201,-2.5724276467032967e-201,-2.5674326417582418e-201,-2.5624376368131868e-201,-2.557442631868132e-201,-2.5524476269230765e-201,-2.547452621978022e-201,-2.5424576170329666e-201,-2.5374626120879124e-201,-2.532467607142857e-201,-2.527472602197802e-201,-2.522477597252747e-201,-2.517482592307692e-201,-2.5124875873626372e-201,-2.5074925824175826e-201,-2.5024975774725273e-201,-2.4975025725274727e-201,-2.4925075675824174e-201,-2.4875125626373628e-201,-2.4825175576923075e-201,-2.4775225527472525e-201,-2.472527547802198e-201,-2.4675325428571426e-201,-2.462537537912088e-201,-2.4575425329670327e-201,-2.4525475280219777e-201,-2.447552523076923e-201,-2.442557518131868e-201,-2.4375625131868132e-201,-2.4325675082417582e-201,-2.427572503296703e-201,-2.4225774983516483e-201,-2.4175824934065934e-201,-2.4125874884615388e-201,-2.4075924835164835e-201,-2.4025974785714285e-201,-2.3976024736263735e-201,-2.3926074686813186e-201,-2.387612463736264e-201,-2.382617458791209e-201,-2.3776224538461537e-201,-2.372627448901099e-201,-2.3676324439560438e-201,-2.362637439010989e-201,-2.3576424340659342e-201,-2.352647429120879e-201,-2.3476524241758243e-201,-2.342657419230769e-201,-2.337662414285714e-201,-2.332667409340659e-201,-2.3276724043956045e-201,-2.3226773994505495e-201,-2.3176823945054946e-201,-2.3126873895604392e-201,-2.3076923846153846e-201,-2.3026973796703293e-201,-2.297702374725275e-201,-2.2927073697802198e-201,-2.2877123648351648e-201,-2.28271735989011e-201,-2.277722354945055e-201,-2.27272735e-201,-2.2677323450549453e-201,-2.26273734010989e-201,-2.2577423351648354e-201,-2.25274733021978e-201,-2.2477523252747255e-201,-2.24275732032967e-201,-2.237762315384615e-201,-2.2327673104395606e-201,-2.2277723054945053e-201,-2.2227773005494507e-201,-2.2177822956043954e-201,-2.2127872906593404e-201,-2.2077922857142855e-201,-2.202797280769231e-201,-2.1978022758241756e-201,-2.192807270879121e-201,-2.1878122659340656e-201,-2.182817260989011e-201,-2.1778222560439557e-201,-2.172827251098901e-201,-2.167832246153846e-201,-2.1628372412087912e-201,-2.1578422362637362e-201,-2.1528472313186813e-201,-2.147852226373626e-201,-2.1428572214285717e-201,-2.1378622164835164e-201,-2.1328672115384618e-201,-2.1278722065934065e-201,-2.1228772016483515e-201,-2.1178821967032966e-201,-2.1128871917582416e-201,-2.107892186813187e-201,-2.1028971818681317e-201,-2.0979021769230767e-201,-2.0929071719780218e-201,-2.087912167032967e-201,-2.0829171620879122e-201,-2.0779221571428573e-201,-2.072927152197802e-201,-2.0679321472527474e-201,-2.062937142307692e-201,-2.0579421373626374e-201,-2.0529471324175825e-201,-2.0479521274725275e-201,-2.0429571225274726e-201,-2.0379621175824176e-201,-2.0329671126373626e-201,-2.0279721076923077e-201,-2.0229771027472527e-201,-2.017982097802198e-201,-2.0129870928571428e-201,-2.007992087912088e-201,-2.002997082967033e-201,-1.9980020780219776e-201,-1.9930070730769233e-201,-1.988012068131868e-201,-1.983017063186813e-201,-1.978022058241758e-201,-1.973027053296703e-201,-1.9680320483516482e-201,-1.9630370434065936e-201,-1.9580420384615383e-201,-1.9530470335164837e-201,-1.9480520285714284e-201,-1.9430570236263738e-201,-1.9380620186813184e-201,-1.933067013736264e-201,-1.928072008791209e-201,-1.923077003846154e-201,-1.918081998901099e-201,-1.913086993956044e-201,-1.9080919890109887e-201,-1.903096984065934e-201,-1.898101979120879e-201,-1.8931069741758245e-201,-1.8881119692307692e-201,-1.8831169642857143e-201,-1.8781219593406593e-201,-1.873126954395604e-201,-1.8681319494505497e-201,-1.8631369445054944e-201,-1.8581419395604395e-201,-1.8531469346153845e-201,-1.8481519296703295e-201,-1.8431569247252742e-201,-1.83816191978022e-201,-1.8331669148351647e-201,-1.82817190989011e-201,-1.8231769049450547e-201,-1.8181818999999998e-201,-1.813186895054945e-201,-1.8081918901098902e-201,-1.8031968851648353e-201,-1.7982018802197803e-201,-1.793206875274725e-201,-1.7882118703296704e-201,-1.783216865384615e-201,-1.778221860439561e-201,-1.7732268554945055e-201,-1.7682318505494506e-201,-1.7632368456043956e-201,-1.7582418406593403e-201,-1.7532468357142857e-201,-1.7482518307692307e-201,-1.7432568258241758e-201,-1.7382618208791208e-201,-1.733266815934066e-201,-1.728271810989011e-201,-1.723276806043956e-201,-1.718281801098901e-201,-1.7132867961538464e-201,-1.708291791208791e-201,-1.7032967862637365e-201,-1.698301781318681e-201,-1.6933067763736262e-201,-1.6883117714285716e-201,-1.6833167664835166e-201,-1.6783217615384617e-201,-1.6733267565934067e-201,-1.6683317516483514e-201,-1.6633367467032968e-201,-1.658341741758242e-201,-1.6533467368131865e-201,-1.648351731868132e-201,-1.643356726923077e-201,-1.638361721978022e-201,-1.633366717032967e-201,-1.628371712087912e-201,-1.6233767071428571e-201,-1.6183817021978024e-201,-1.6133866972527472e-201,-1.6083916923076923e-201,-1.6033966873626375e-201,-1.5984016824175825e-201,-1.5934066774725274e-201,-1.5884116725274726e-201,-1.5834166675824175e-201,-1.5784216626373625e-201,-1.5734266576923077e-201,-1.5684316527472526e-201,-1.5634366478021976e-201,-1.5584416428571429e-201,-1.5534466379120879e-201,-1.548451632967033e-201,-1.543456628021978e-201,-1.538461623076923e-201,-1.533466618131868e-201,-1.5284716131868133e-201,-1.5234766082417581e-201,-1.5184816032967032e-201,-1.5134865983516484e-201,-1.5084915934065934e-201,-1.5034965884615385e-201,-1.4985015835164835e-201,-1.4935065785714286e-201,-1.4885115736263736e-201,-1.4835165686813188e-201,-1.4785215637362639e-201,-1.4735265587912087e-201,-1.468531553846154e-201,-1.4635365489010988e-201,-1.4585415439560439e-201,-1.453546539010989e-201,-1.448551534065934e-201,-1.443556529120879e-201,-1.4385615241758242e-201,-1.4335665192307692e-201,-1.4285715142857141e-201,-1.4235765093406591e-201,-1.4185815043956044e-201,-1.4135864994505494e-201,-1.4085914945054945e-201,-1.4035964895604395e-201,-1.3986014846153845e-201,-1.3936064796703296e-201,-1.3886114747252748e-201,-1.3836164697802198e-201,-1.3786214648351647e-201,-1.37362645989011e-201,-1.368631454945055e-201,-1.36363645e-201,-1.3586414450549452e-201,-1.3536464401098901e-201,-1.3486514351648351e-201,-1.3436564302197802e-201,-1.3386614252747252e-201,-1.33366642032967e-201,-1.3286714153846153e-201,-1.3236764104395603e-201,-1.3186814054945054e-201,-1.3136864005494506e-201,-1.3086913956043955e-201,-1.3036963906593405e-201,-1.2987013857142857e-201,-1.2937063807692308e-201,-1.2887113758241758e-201,-1.2837163708791209e-201,-1.2787213659340659e-201,-1.273726360989011e-201,-1.2687313560439562e-201,-1.2637363510989012e-201,-1.258741346153846e-201,-1.2537463412087913e-201,-1.2487513362637363e-201,-1.2437563313186814e-201,-1.2387613263736264e-201,-1.2337663214285714e-201,-1.2287713164835165e-201,-1.2237763115384615e-201,-1.2187813065934066e-201,-1.2137863016483514e-201,-1.2087912967032967e-201,-1.2037962917582417e-201,-1.1988012868131867e-201,-1.193806281868132e-201,-1.1888112769230768e-201,-1.1838162719780219e-201,-1.178821267032967e-201,-1.1738262620879121e-201,-1.168831257142857e-201,-1.1638362521978022e-201,-1.1588412472527473e-201,-1.1538462423076923e-201,-1.1488512373626375e-201,-1.1438562324175824e-201,-1.1388612274725274e-201,-1.1338662225274726e-201,-1.1288712175824177e-201,-1.1238762126373627e-201,-1.1188812076923076e-201,-1.1138862027472528e-201,-1.1088911978021978e-201,-1.1038961928571427e-201,-1.098901187912088e-201,-1.0939061829670328e-201,-1.0889111780219778e-201,-1.083916173076923e-201,-1.0789211681318681e-201,-1.073926163186813e-201,-1.0689311582417582e-201,-1.0639361532967032e-201,-1.0589411483516483e-201,-1.0539461434065935e-201,-1.0489511384615383e-201,-1.0439561335164834e-201,-1.0389611285714286e-201,-1.0339661236263736e-201,-1.0289711186813187e-201,-1.0239761137362637e-201,-1.0189811087912088e-201,-1.0139861038461538e-201,-1.008991098901099e-201,-1.003996093956044e-201,-9.99001089010989e-202,-9.940060840659342e-202,-9.890110791208792e-202,-9.84016074175824e-202,-9.790210692307691e-202,-9.740260642857141e-202,-9.690310593406592e-202,-9.640360543956044e-202,-9.590410494505495e-202,-9.540460445054943e-202,-9.490510395604395e-202,-9.440560346153846e-202,-9.390610296703296e-202,-9.340660247252748e-202,-9.290710197802197e-202,-9.240760148351647e-202,-9.1908100989011e-202,-9.14086004945055e-202,-9.09091e-202,-9.04095995054945e-202,-8.991009901098901e-202,-8.941059851648352e-202,-8.891109802197804e-202,-8.841159752747253e-202,-8.791209703296703e-202,-8.741259653846155e-202,-8.691309604395606e-202,-8.641359554945054e-202,-8.591409505494505e-202,-8.541459456043955e-202,-8.491509406593405e-202,-8.441559357142858e-202,-8.391609307692308e-202,-8.341659258241757e-202,-8.291709208791209e-202,-8.24175915934066e-202,-8.19180910989011e-202,-8.14185906043956e-202,-8.0919090109890115e-202,-8.041958961538461e-202,-7.992008912087912e-202,-7.942058862637363e-202,-7.892108813186813e-202,-7.842158763736264e-202,-7.792208714285715e-202,-7.742258664835164e-202,-7.692308615384615e-202,-7.642358565934066e-202,-7.592408516483516e-202,-7.542458467032967e-202,-7.492508417582418e-202,-7.442558368131868e-202,-7.392608318681319e-202,-7.3426582692307695e-202,-7.29270821978022e-202,-7.24275817032967e-202,-7.192808120879122e-202,-7.142858071428571e-202,-7.092908021978022e-202,-7.042957972527472e-202,-6.993007923076922e-202,-6.943057873626374e-202,-6.893107824175823e-202,-6.843157774725275e-202,-6.793207725274726e-202,-6.743257675824175e-202,-6.693307626373627e-202,-6.643357576923077e-202,-6.5934075274725275e-202,-6.543457478021977e-202,-6.493507428571428e-202,-6.443557379120879e-202,-6.393607329670329e-202,-6.3436572802197805e-202,-6.29370723076923e-202,-6.243757181318681e-202,-6.193807131868133e-202,-6.143857082417582e-202,-6.0939070329670335e-202,-6.043956983516484e-202,-5.994006934065934e-202,-5.944056884615384e-202,-5.894106835164835e-202,-5.844156785714286e-202,-5.794206736263736e-202,-5.744256686813187e-202,-5.694306637362637e-202,-5.644356587912088e-202,-5.594406538461538e-202,-5.544456489010989e-202,-5.49450643956044e-202,-5.44455639010989e-202,-5.394606340659341e-202,-5.344656291208791e-202,-5.294706241758241e-202,-5.244756192307691e-202,-5.194806142857143e-202,-5.144856093406593e-202,-5.094906043956044e-202,-5.044955994505495e-202,-4.995005945054944e-202,-4.945055895604396e-202,-4.895105846153847e-202,-4.845155796703297e-202,-4.795205747252748e-202,-4.745255697802197e-202,-4.695305648351648e-202,-4.645355598901098e-202,-4.5954055494505495e-202,-4.5454555e-202,-4.49550545054945e-202,-4.445555401098902e-202,-4.395605351648351e-202,-4.3456553021978025e-202,-4.295705252747253e-202,-4.245755203296703e-202,-4.195805153846154e-202,-4.145855104395604e-202,-4.095905054945055e-202,-4.0459550054945055e-202,-3.996004956043956e-202,-3.9460549065934063e-202,-3.896104857142857e-202,-3.8461548076923076e-202,-3.7962047582417584e-202,-3.746254708791209e-202,-3.6963046593406593e-202,-3.6463546098901097e-202,-3.5964045604395605e-202,-3.546454510989011e-202,-3.4965044615384614e-202,-3.446554412087912e-202,-3.3966043626373627e-202,-3.346654313186813e-202,-3.2967042637362635e-202,-3.2467542142857144e-202,-3.1968041648351648e-202,-3.146854115384615e-202,-3.096904065934066e-202,-3.0469540164835165e-202,-2.997003967032967e-202,-2.9470539175824177e-202,-2.897103868131868e-202,-2.847153818681318e-202,-2.797203769230769e-202,-2.74725371978022e-202,-2.6973036703296703e-202,-2.6473536208791207e-202,-2.5974035714285716e-202,-2.5474535219780215e-202,-2.4975034725274724e-202,-2.4475534230769232e-202,-2.3976033736263737e-202,-2.347653324175824e-202,-2.297703274725275e-202,-2.247753225274725e-202,-2.1978031758241753e-202,-2.1478531263736266e-202,-2.097903076923077e-202,-2.0479530274725275e-202,-1.9980029780219779e-202,-1.9480529285714288e-202,-1.8981028791208792e-202,-1.8481528296703296e-202,-1.7982027802197802e-202,-1.7482527307692309e-202,-1.6983026813186813e-202,-1.6483526318681317e-202,-1.5984025824175826e-202,-1.548452532967033e-202,-1.4985024835164834e-202,-1.4485524340659343e-202,-1.3986023846153844e-202,-1.348652335164835e-202,-1.298702285714286e-202,-1.2487522362637361e-202,-1.1988021868131868e-202,-1.1488521373626374e-202,-1.0989020879120878e-202,-1.0489520384615385e-202,-9.99001989010989e-203,-9.490519395604394e-203,-8.991018901098902e-203,-8.491518406593407e-203,-7.992017912087911e-203,-7.492517417582418e-203,-6.993016923076923e-203,-6.493516428571428e-203,-5.994015934065934e-203,-5.494515439560439e-203,-4.995014945054945e-203,-4.495514450549451e-203,-3.9960139560439556e-203,-3.4965134615384614e-203,-2.997012967032967e-203,-2.4975124725274722e-203,-1.998011978021978e-203,-1.4985114835164834e-203,-9.99010989010989e-204,-4.995104945054945e-204,-1.0e-208]}
},{}],78:[function(require,module,exports){
module.exports={"expected":[1.0e-300,9.995004995054944e-301,9.99000999010989e-301,9.985014985164834e-301,9.980019980219781e-301,9.975024975274727e-301,9.97002997032967e-301,9.965034965384617e-301,9.960039960439559e-301,9.955044955494506e-301,9.950049950549451e-301,9.945054945604395e-301,9.940059940659342e-301,9.935064935714285e-301,9.930069930769232e-301,9.925074925824176e-301,9.920079920879121e-301,9.915084915934066e-301,9.91008991098901e-301,9.905094906043957e-301,9.9000999010989e-301,9.895104896153846e-301,9.890109891208793e-301,9.885114886263736e-301,9.880119881318683e-301,9.875124876373627e-301,9.870129871428572e-301,9.865134866483516e-301,9.86013986153846e-301,9.855144856593408e-301,9.850149851648351e-301,9.845154846703298e-301,9.840159841758242e-301,9.835164836813187e-301,9.830169831868134e-301,9.825174826923076e-301,9.820179821978023e-301,9.815184817032966e-301,9.810189812087912e-301,9.805194807142857e-301,9.800199802197802e-301,9.795204797252749e-301,9.790209792307693e-301,9.785214787362638e-301,9.780219782417583e-301,9.775224777472527e-301,9.770229772527474e-301,9.765234767582417e-301,9.760239762637363e-301,9.755244757692308e-301,9.750249752747253e-301,9.745254747802198e-301,9.740259742857144e-301,9.735264737912089e-301,9.730269732967032e-301,9.725274728021978e-301,9.720279723076923e-301,9.715284718131868e-301,9.710289713186812e-301,9.705294708241759e-301,9.700299703296704e-301,9.69530469835165e-301,9.690309693406595e-301,9.685314688461536e-301,9.680319683516483e-301,9.675324678571429e-301,9.670329673626374e-301,9.665334668681319e-301,9.660339663736263e-301,9.65534465879121e-301,9.650349653846153e-301,9.6453546489011e-301,9.640359643956045e-301,9.635364639010989e-301,9.630369634065934e-301,9.625374629120878e-301,9.620379624175825e-301,9.61538461923077e-301,9.610389614285715e-301,9.60539460934066e-301,9.600399604395604e-301,9.595404599450551e-301,9.590409594505493e-301,9.58541458956044e-301,9.580419584615385e-301,9.575424579670329e-301,9.570429574725276e-301,9.56543456978022e-301,9.560439564835166e-301,9.555444559890111e-301,9.550449554945055e-301,9.545454550000002e-301,9.540459545054944e-301,9.53546454010989e-301,9.530469535164834e-301,9.52547453021978e-301,9.520479525274727e-301,9.51548452032967e-301,9.510489515384617e-301,9.50549451043956e-301,9.500499505494506e-301,9.49550450054945e-301,9.490509495604395e-301,9.485514490659342e-301,9.480519485714285e-301,9.47552448076923e-301,9.470529475824176e-301,9.465534470879121e-301,9.460539465934068e-301,9.455544460989012e-301,9.450549456043955e-301,9.4455544510989e-301,9.440559446153846e-301,9.435564441208791e-301,9.430569436263736e-301,9.425574431318681e-301,9.420579426373627e-301,9.415584421428572e-301,9.410589416483517e-301,9.405594411538461e-301,9.400599406593408e-301,9.395604401648351e-301,9.390609396703297e-301,9.385614391758242e-301,9.380619386813187e-301,9.375624381868132e-301,9.370629376923078e-301,9.365634371978023e-301,9.360639367032968e-301,9.355644362087912e-301,9.350649357142857e-301,9.345654352197802e-301,9.340659347252748e-301,9.335664342307693e-301,9.330669337362638e-301,9.325674332417583e-301,9.320679327472529e-301,9.315684322527472e-301,9.310689317582417e-301,9.305694312637363e-301,9.300699307692308e-301,9.295704302747253e-301,9.290709297802197e-301,9.285714292857144e-301,9.280719287912087e-301,9.275724282967034e-301,9.27072927802198e-301,9.265734273076921e-301,9.260739268131868e-301,9.255744263186812e-301,9.250749258241759e-301,9.245754253296704e-301,9.240759248351648e-301,9.235764243406595e-301,9.230769238461538e-301,9.225774233516485e-301,9.220779228571429e-301,9.215784223626372e-301,9.21078921868132e-301,9.205794213736263e-301,9.20079920879121e-301,9.195804203846153e-301,9.1908091989011e-301,9.185814193956045e-301,9.180819189010989e-301,9.175824184065936e-301,9.170829179120878e-301,9.165834174175825e-301,9.160839169230768e-301,9.155844164285714e-301,9.15084915934066e-301,9.145854154395604e-301,9.140859149450551e-301,9.135864144505495e-301,9.13086913956044e-301,9.125874134615387e-301,9.120879129670329e-301,9.115884124725276e-301,9.11088911978022e-301,9.105894114835165e-301,9.10089910989011e-301,9.095904104945055e-301,9.090909100000002e-301,9.085914095054946e-301,9.080919090109891e-301,9.075924085164834e-301,9.07092908021978e-301,9.065934075274725e-301,9.06093907032967e-301,9.055944065384616e-301,9.05094906043956e-301,9.045954055494506e-301,9.040959050549451e-301,9.035964045604397e-301,9.03096904065934e-301,9.025974035714285e-301,9.02097903076923e-301,9.015984025824176e-301,9.010989020879121e-301,9.005994015934065e-301,9.000999010989012e-301,8.996004006043957e-301,8.991009001098902e-301,8.986013996153846e-301,8.98101899120879e-301,8.976023986263736e-301,8.971028981318682e-301,8.966033976373627e-301,8.961038971428572e-301,8.956043966483517e-301,8.951048961538463e-301,8.946053956593406e-301,8.941058951648353e-301,8.936063946703297e-301,8.931068941758242e-301,8.926073936813187e-301,8.92107893186813e-301,8.916083926923078e-301,8.911088921978023e-301,8.906093917032968e-301,8.901098912087913e-301,8.896103907142857e-301,8.891108902197802e-301,8.886113897252746e-301,8.881118892307693e-301,8.876123887362638e-301,8.871128882417582e-301,8.866133877472529e-301,8.861138872527472e-301,8.856143867582419e-301,8.851148862637364e-301,8.846153857692306e-301,8.841158852747253e-301,8.836163847802197e-301,8.831168842857144e-301,8.826173837912087e-301,8.821178832967033e-301,8.81618382802198e-301,8.811188823076923e-301,8.80619381813187e-301,8.801198813186814e-301,8.796203808241757e-301,8.791208803296702e-301,8.786213798351648e-301,8.781218793406595e-301,8.776223788461538e-301,8.771228783516483e-301,8.766233778571429e-301,8.761238773626374e-301,8.756243768681321e-301,8.751248763736263e-301,8.746253758791208e-301,8.741258753846153e-301,8.736263748901099e-301,8.731268743956044e-301,8.726273739010989e-301,8.721278734065936e-301,8.71628372912088e-301,8.711288724175825e-301,8.706293719230769e-301,8.701298714285714e-301,8.69630370934066e-301,8.691308704395604e-301,8.68631369945055e-301,8.681318694505495e-301,8.67632368956044e-301,8.671328684615385e-301,8.66633367967033e-301,8.661338674725276e-301,8.65634366978022e-301,8.651348664835165e-301,8.64635365989011e-301,8.641358654945055e-301,8.63636365e-301,8.631368645054946e-301,8.626373640109891e-301,8.621378635164836e-301,8.616383630219781e-301,8.611388625274723e-301,8.60639362032967e-301,8.601398615384616e-301,8.59640361043956e-301,8.591408605494506e-301,8.58641360054945e-301,8.581418595604397e-301,8.57642359065934e-301,8.571428585714287e-301,8.56643358076923e-301,8.561438575824174e-301,8.556443570879121e-301,8.551448565934065e-301,8.546453560989012e-301,8.541458556043957e-301,8.5364635510989e-301,8.531468546153847e-301,8.526473541208791e-301,8.521478536263738e-301,8.51648353131868e-301,8.511488526373625e-301,8.506493521428572e-301,8.501498516483516e-301,8.496503511538463e-301,8.491508506593406e-301,8.486513501648353e-301,8.481518496703298e-301,8.476523491758242e-301,8.471528486813187e-301,8.466533481868131e-301,8.461538476923078e-301,8.456543471978021e-301,8.451548467032967e-301,8.446553462087914e-301,8.441558457142857e-301,8.436563452197804e-301,8.431568447252748e-301,8.426573442307691e-301,8.421578437362638e-301,8.416583432417582e-301,8.411588427472529e-301,8.406593422527472e-301,8.401598417582418e-301,8.396603412637363e-301,8.391608407692308e-301,8.386613402747255e-301,8.381618397802199e-301,8.376623392857142e-301,8.371628387912087e-301,8.366633382967033e-301,8.361638378021978e-301,8.356643373076923e-301,8.351648368131868e-301,8.346653363186814e-301,8.341658358241759e-301,8.336663353296704e-301,8.331668348351648e-301,8.326673343406593e-301,8.321678338461538e-301,8.316683333516484e-301,8.311688328571429e-301,8.306693323626374e-301,8.301698318681318e-301,8.296703313736265e-301,8.29170830879121e-301,8.286713303846153e-301,8.281718298901099e-301,8.276723293956042e-301,8.27172828901099e-301,8.266733284065934e-301,8.26173827912088e-301,8.256743274175825e-301,8.25174826923077e-301,8.246753264285715e-301,8.241758259340657e-301,8.236763254395604e-301,8.23176824945055e-301,8.226773244505495e-301,8.22177823956044e-301,8.216783234615384e-301,8.21178822967033e-301,8.206793224725276e-301,8.201798219780221e-301,8.196803214835166e-301,8.191808209890108e-301,8.186813204945055e-301,8.181818199999999e-301,8.176823195054946e-301,8.171828190109891e-301,8.166833185164835e-301,8.161838180219782e-301,8.156843175274725e-301,8.151848170329672e-301,8.146853165384616e-301,8.14185816043956e-301,8.136863155494506e-301,8.13186815054945e-301,8.126873145604397e-301,8.12187814065934e-301,8.116883135714286e-301,8.111888130769232e-301,8.106893125824176e-301,8.101898120879123e-301,8.096903115934065e-301,8.09190811098901e-301,8.086913106043955e-301,8.0819181010989e-301,8.076923096153848e-301,8.071928091208791e-301,8.066933086263736e-301,8.061938081318682e-301,8.056943076373627e-301,8.051948071428572e-301,8.046953066483516e-301,8.041958061538461e-301,8.036963056593406e-301,8.031968051648352e-301,8.026973046703297e-301,8.021978041758242e-301,8.016983036813189e-301,8.011988031868133e-301,8.006993026923076e-301,8.001998021978021e-301,7.997003017032967e-301,7.992008012087914e-301,7.987013007142857e-301,7.982018002197802e-301,7.977022997252748e-301,7.972027992307693e-301,7.967032987362638e-301,7.962037982417583e-301,7.957042977472527e-301,7.952047972527472e-301,7.947052967582418e-301,7.942057962637363e-301,7.937062957692308e-301,7.932067952747253e-301,7.927072947802199e-301,7.922077942857144e-301,7.917082937912089e-301,7.912087932967033e-301,7.907092928021976e-301,7.902097923076923e-301,7.897102918131868e-301,7.892107913186814e-301,7.887112908241759e-301,7.882117903296703e-301,7.87712289835165e-301,7.872127893406593e-301,7.867132888461538e-301,7.862137883516484e-301,7.857142878571427e-301,7.852147873626374e-301,7.847152868681318e-301,7.842157863736265e-301,7.83716285879121e-301,7.832167853846153e-301,7.8271728489011e-301,7.822177843956042e-301,7.81718283901099e-301,7.812187834065933e-301,7.807192829120878e-301,7.802197824175825e-301,7.797202819230769e-301,7.792207814285716e-301,7.787212809340659e-301,7.782217804395606e-301,7.777222799450551e-301,7.772227794505493e-301,7.76723278956044e-301,7.762237784615384e-301,7.75724277967033e-301,7.752247774725274e-301,7.74725276978022e-301,7.742257764835166e-301,7.73726275989011e-301,7.732267754945057e-301,7.727272749999999e-301,7.722277745054944e-301,7.717282740109891e-301,7.712287735164835e-301,7.707292730219782e-301,7.702297725274725e-301,7.69730272032967e-301,7.692307715384616e-301,7.687312710439561e-301,7.682317705494508e-301,7.67732270054945e-301,7.672327695604395e-301,7.66733269065934e-301,7.662337685714286e-301,7.65734268076923e-301,7.652347675824176e-301,7.647352670879121e-301,7.642357665934067e-301,7.637362660989012e-301,7.632367656043955e-301,7.6273726510989e-301,7.622377646153846e-301,7.617382641208791e-301,7.612387636263736e-301,7.607392631318682e-301,7.602397626373627e-301,7.597402621428572e-301,7.592407616483517e-301,7.587412611538461e-301,7.582417606593406e-301,7.577422601648352e-301,7.572427596703297e-301,7.567432591758242e-301,7.562437586813187e-301,7.557442581868131e-301,7.552447576923076e-301,7.547452571978023e-301,7.542457567032968e-301,7.537462562087912e-301,7.532467557142857e-301,7.527472552197803e-301,7.522477547252748e-301,7.517482542307693e-301,7.512487537362638e-301,7.507492532417584e-301,7.502497527472527e-301,7.497502522527472e-301,7.492507517582418e-301,7.487512512637363e-301,7.482517507692308e-301,7.477522502747253e-301,7.472527497802197e-301,7.467532492857142e-301,7.462537487912088e-301,7.457542482967034e-301,7.452547478021978e-301,7.447552473076923e-301,7.4425574681318685e-301,7.437562463186813e-301,7.432567458241758e-301,7.427572453296703e-301,7.422577448351649e-301,7.417582443406594e-301,7.4125874384615384e-301,7.407592433516484e-301,7.402597428571428e-301,7.397602423626373e-301,7.3926074186813194e-301,7.387612413736264e-301,7.382617408791209e-301,7.377622403846154e-301,7.372627398901099e-301,7.367632393956043e-301,7.362637389010989e-301,7.3576423840659346e-301,7.35264737912088e-301,7.347652374175824e-301,7.342657369230769e-301,7.337662364285714e-301,7.33266735934066e-301,7.327672354395605e-301,7.32267734945055e-301,7.317682344505494e-301,7.312687339560439e-301,7.307692334615385e-301,7.302697329670331e-301,7.297702324725274e-301,7.29270731978022e-301,7.287712314835165e-301,7.28271730989011e-301,7.277722304945055e-301,7.272727300000001e-301,7.267732295054945e-301,7.26273729010989e-301,7.2577422851648356e-301,7.252747280219781e-301,7.247752275274725e-301,7.2427572703296705e-301,7.237762265384616e-301,7.232767260439561e-301,7.2277722554945054e-301,7.222777250549451e-301,7.217782245604395e-301,7.212787240659341e-301,7.2077922357142865e-301,7.202797230769231e-301,7.197802225824176e-301,7.1928072208791206e-301,7.187812215934066e-301,7.182817210989011e-301,7.177822206043956e-301,7.172827201098902e-301,7.167832196153847e-301,7.162837191208791e-301,7.157842186263736e-301,7.152847181318681e-301,7.147852176373627e-301,7.142857171428572e-301,7.137862166483517e-301,7.132867161538461e-301,7.127872156593406e-301,7.122877151648352e-301,7.117882146703298e-301,7.112887141758242e-301,7.107892136813187e-301,7.102897131868132e-301,7.097902126923077e-301,7.092907121978022e-301,7.087912117032967e-301,7.082917112087912e-301,7.077922107142857e-301,7.0729271021978026e-301,7.067932097252748e-301,7.0629370923076914e-301,7.0579420873626375e-301,7.052947082417583e-301,7.047952077472528e-301,7.042957072527473e-301,7.037962067582418e-301,7.032967062637362e-301,7.027972057692308e-301,7.0229770527472535e-301,7.017982047802198e-301,7.012987042857143e-301,7.0079920379120876e-301,7.002997032967033e-301,6.998002028021979e-301,6.993007023076923e-301,6.988012018131869e-301,6.983017013186813e-301,6.978022008241758e-301,6.9730270032967035e-301,6.968031998351648e-301,6.963036993406594e-301,6.9580419884615385e-301,6.953046983516484e-301,6.948051978571428e-301,6.9430569736263734e-301,6.938061968681319e-301,6.933066963736265e-301,6.928071958791209e-301,6.923076953846154e-301,6.918081948901099e-301,6.913086943956044e-301,6.908091939010989e-301,6.903096934065935e-301,6.898101929120879e-301,6.893106924175824e-301,6.8881119192307696e-301,6.883116914285715e-301,6.8781219093406584e-301,6.8731269043956045e-301,6.86813189945055e-301,6.863136894505495e-301,6.85814188956044e-301,6.853146884615384e-301,6.848151879670329e-301,6.843156874725275e-301,6.8381618697802205e-301,6.833166864835166e-301,6.828171859890109e-301,6.823176854945055e-301,6.81818185e-301,6.813186845054946e-301,6.80819184010989e-301,6.803196835164836e-301,6.79820183021978e-301,6.793206825274725e-301,6.7882118203296705e-301,6.783216815384616e-301,6.778221810439561e-301,6.7732268054945055e-301,6.768231800549451e-301,6.763236795604396e-301,6.7582417906593404e-301,6.7532467857142865e-301,6.748251780769231e-301,6.743256775824176e-301,6.738261770879121e-301,6.733266765934066e-301,6.728271760989011e-301,6.7232767560439556e-301,6.718281751098902e-301,6.713286746153846e-301,6.708291741208791e-301,6.703296736263737e-301,6.698301731318682e-301,6.693306726373626e-301,6.6883117214285715e-301,6.683316716483517e-301,6.678321711538462e-301,6.673326706593407e-301,6.668331701648351e-301,6.663336696703296e-301,6.658341691758242e-301,6.6533466868131875e-301,6.648351681868133e-301,6.643356676923076e-301,6.638361671978022e-301,6.633366667032967e-301,6.628371662087913e-301,6.623376657142858e-301,6.618381652197802e-301,6.613386647252747e-301,6.608391642307692e-301,6.6033966373626376e-301,6.598401632417583e-301,6.593406627472527e-301,6.5884116225274725e-301,6.583416617582418e-301,6.578421612637363e-301,6.5734266076923074e-301,6.5684316027472535e-301,6.563436597802198e-301,6.558441592857143e-301,6.5534465879120885e-301,6.548451582967033e-301,6.543456578021978e-301,6.538461573076923e-301,6.533466568131869e-301,6.528471563186813e-301,6.523476558241758e-301,6.518481553296704e-301,6.513486548351648e-301,6.508491543406593e-301,6.5034965384615385e-301,6.498501533516484e-301,6.493506528571429e-301,6.4885115236263735e-301,6.483516518681319e-301,6.478521513736263e-301,6.473526508791209e-301,6.4685315038461545e-301,6.4635364989011e-301,6.458541493956043e-301,6.453546489010989e-301,6.448551484065934e-301,6.44355647912088e-301,6.438561474175825e-301,6.433566469230769e-301,6.428571464285714e-301,6.423576459340659e-301,6.4185814543956046e-301,6.413586449450551e-301,6.408591444505494e-301,6.4035964395604395e-301,6.398601434615385e-301,6.39360642967033e-301,6.3886114247252745e-301,6.38361641978022e-301,6.378621414835165e-301,6.37362640989011e-301,6.3686314049450555e-301,6.3636364e-301,6.358641395054945e-301,6.3536463901098904e-301,6.348651385164836e-301,6.343656380219781e-301,6.338661375274725e-301,6.333666370329671e-301,6.328671365384615e-301,6.323676360439561e-301,6.3186813554945055e-301,6.313686350549451e-301,6.308691345604396e-301,6.3036963406593405e-301,6.298701335714286e-301,6.293706330769231e-301,6.288711325824176e-301,6.2837163208791215e-301,6.278721315934066e-301,6.273726310989011e-301,6.268731306043956e-301,6.263736301098901e-301,6.258741296153847e-301,6.253746291208791e-301,6.248751286263736e-301,6.243756281318681e-301,6.238761276373626e-301,6.2337662714285716e-301,6.228771266483518e-301,6.223776261538461e-301,6.2187812565934065e-301,6.213786251648352e-301,6.208791246703297e-301,6.203796241758242e-301,6.198801236813187e-301,6.193806231868132e-301,6.188811226923077e-301,6.1838162219780225e-301,6.178821217032967e-301,6.173826212087911e-301,6.1688312071428574e-301,6.163836202197803e-301,6.158841197252748e-301,6.153846192307692e-301,6.148851187362637e-301,6.143856182417582e-301,6.138861177472528e-301,6.133866172527473e-301,6.128871167582418e-301,6.123876162637363e-301,6.1188811576923075e-301,6.113886152747253e-301,6.108891147802198e-301,6.103896142857143e-301,6.0989011379120885e-301,6.093906132967033e-301,6.088911128021978e-301,6.083916123076923e-301,6.078921118131869e-301,6.073926113186814e-301,6.068931108241758e-301,6.063936103296704e-301,6.058941098351648e-301,6.053946093406593e-301,6.0489510884615394e-301,6.043956083516484e-301,6.038961078571428e-301,6.0339660736263735e-301,6.028971068681319e-301,6.023976063736264e-301,6.0189810587912085e-301,6.013986053846154e-301,6.008991048901099e-301,6.003996043956044e-301,5.9990010390109895e-301,5.994006034065935e-301,5.989011029120878e-301,5.9840160241758244e-301,5.97902101923077e-301,5.974026014285715e-301,5.969031009340659e-301,5.964036004395604e-301,5.959040999450549e-301,5.954045994505495e-301,5.94905098956044e-301,5.944055984615385e-301,5.939060979670329e-301,5.9340659747252745e-301,5.92907096978022e-301,5.924075964835166e-301,5.91908095989011e-301,5.914085954945055e-301,5.90909095e-301,5.904095945054945e-301,5.89910094010989e-301,5.894105935164836e-301,5.889110930219781e-301,5.884115925274725e-301,5.879120920329671e-301,5.874125915384615e-301,5.86913091043956e-301,5.8641359054945064e-301,5.859140900549451e-301,5.854145895604396e-301,5.8491508906593405e-301,5.844155885714286e-301,5.839160880769231e-301,5.834165875824176e-301,5.829170870879121e-301,5.824175865934066e-301,5.819180860989011e-301,5.8141858560439565e-301,5.809190851098901e-301,5.804195846153845e-301,5.7992008412087915e-301,5.794205836263737e-301,5.789210831318682e-301,5.7842158263736256e-301,5.779220821428571e-301,5.774225816483516e-301,5.769230811538462e-301,5.764235806593407e-301,5.759240801648352e-301,5.754245796703296e-301,5.7492507917582415e-301,5.744255786813187e-301,5.739260781868133e-301,5.734265776923077e-301,5.729270771978022e-301,5.724275767032967e-301,5.719280762087912e-301,5.7142857571428575e-301,5.709290752197803e-301,5.704295747252747e-301,5.6993007423076924e-301,5.694305737362638e-301,5.689310732417582e-301,5.684315727472527e-301,5.679320722527473e-301,5.674325717582418e-301,5.669330712637363e-301,5.6643357076923076e-301,5.659340702747253e-301,5.654345697802198e-301,5.649350692857143e-301,5.6443556879120886e-301,5.639360682967033e-301,5.634365678021978e-301,5.6293706730769235e-301,5.624375668131868e-301,5.619380663186813e-301,5.6143856582417585e-301,5.609390653296704e-301,5.604395648351649e-301,5.599400643406593e-301,5.594405638461538e-301,5.589410633516484e-301,5.584415628571429e-301,5.5794206236263744e-301,5.574425618681318e-301,5.569430613736263e-301,5.5644356087912085e-301,5.559440603846154e-301,5.5544455989011e-301,5.549450593956044e-301,5.544455589010989e-301,5.539460584065934e-301,5.534465579120879e-301,5.5294705741758245e-301,5.52447556923077e-301,5.519480564285714e-301,5.5144855593406594e-301,5.509490554395605e-301,5.50449554945055e-301,5.499500544505494e-301,5.49450553956044e-301,5.489510534615385e-301,5.48451552967033e-301,5.4795205247252746e-301,5.47452551978022e-301,5.469530514835164e-301,5.46453550989011e-301,5.459540504945056e-301,5.4545455e-301,5.449550495054945e-301,5.44455549010989e-301,5.439560485164835e-301,5.434565480219781e-301,5.4295704752747255e-301,5.424575470329671e-301,5.419580465384616e-301,5.41458546043956e-301,5.409590455494505e-301,5.404595450549451e-301,5.399600445604396e-301,5.3946054406593414e-301,5.389610435714286e-301,5.38461543076923e-301,5.3796204258241755e-301,5.374625420879122e-301,5.369630415934067e-301,5.3646354109890105e-301,5.359640406043956e-301,5.354645401098901e-301,5.349650396153846e-301,5.3446553912087915e-301,5.339660386263736e-301,5.334665381318681e-301,5.3296703763736264e-301,5.324675371428572e-301,5.319680366483517e-301,5.314685361538461e-301,5.309690356593407e-301,5.304695351648352e-301,5.299700346703297e-301,5.294705341758242e-301,5.289710336813187e-301,5.284715331868131e-301,5.279720326923077e-301,5.274725321978023e-301,5.269730317032967e-301,5.264735312087912e-301,5.259740307142857e-301,5.254745302197802e-301,5.249750297252748e-301,5.2447552923076925e-301,5.239760287362638e-301,5.234765282417582e-301,5.2297702774725274e-301,5.224775272527472e-301,5.219780267582418e-301,5.214785262637363e-301,5.209790257692308e-301,5.204795252747253e-301,5.199800247802197e-301,5.1948052428571426e-301,5.189810237912089e-301,5.184815232967034e-301,5.179820228021978e-301,5.174825223076923e-301,5.169830218131868e-301,5.164835213186813e-301,5.159840208241759e-301,5.154845203296703e-301,5.149850198351648e-301,5.1448551934065935e-301,5.139860188461539e-301,5.134865183516484e-301,5.129870178571428e-301,5.124875173626374e-301,5.119880168681319e-301,5.114885163736264e-301,5.1098901587912094e-301,5.104895153846153e-301,5.099900148901098e-301,5.094905143956044e-301,5.08991013901099e-301,5.084915134065935e-301,5.079920129120879e-301,5.074925124175824e-301,5.069930119230769e-301,5.064935114285715e-301,5.0599401093406595e-301,5.054945104395605e-301,5.049950099450549e-301,5.0449550945054944e-301,5.03996008956044e-301,5.034965084615385e-301,5.02997007967033e-301,5.024975074725275e-301,5.01998006978022e-301,5.014985064835164e-301,5.0099900598901096e-301,5.004995054945056e-301,5.00000005e-301,4.995005045054945e-301,4.99001004010989e-301,4.985015035164835e-301,4.98002003021978e-301,4.9750250252747255e-301,4.970030020329671e-301,4.965035015384615e-301,4.9600400104395605e-301,4.955045005494506e-301,4.950050000549451e-301,4.945054995604395e-301,4.940059990659341e-301,4.935064985714286e-301,4.930069980769231e-301,4.9250749758241764e-301,4.92007997087912e-301,4.915084965934066e-301,4.910089960989011e-301,4.905094956043957e-301,4.900099951098902e-301,4.8951049461538455e-301,4.890109941208791e-301,4.885114936263737e-301,4.880119931318682e-301,4.8751249263736265e-301,4.870129921428571e-301,4.865134916483516e-301,4.8601399115384614e-301,4.855144906593407e-301,4.850149901648352e-301,4.845154896703297e-301,4.840159891758242e-301,4.835164886813187e-301,4.830169881868132e-301,4.8251748769230766e-301,4.820179871978023e-301,4.815184867032967e-301,4.810189862087912e-301,4.805194857142857e-301,4.800199852197802e-301,4.795204847252747e-301,4.7902098423076925e-301,4.785214837362638e-301,4.780219832417582e-301,4.7752248274725275e-301,4.770229822527473e-301,4.765234817582417e-301,4.760239812637363e-301,4.755244807692308e-301,4.750249802747253e-301,4.745254797802198e-301,4.7402597928571434e-301,4.735264787912087e-301,4.730269782967033e-301,4.725274778021978e-301,4.720279773076924e-301,4.715284768131869e-301,4.7102897631868125e-301,4.705294758241758e-301,4.700299753296704e-301,4.695304748351649e-301,4.690309743406594e-301,4.685314738461538e-301,4.680319733516483e-301,4.6753247285714285e-301,4.6703297236263745e-301,4.665334718681319e-301,4.660339713736263e-301,4.655344708791209e-301,4.650349703846154e-301,4.645354698901099e-301,4.640359693956044e-301,4.635364689010989e-301,4.630369684065934e-301,4.625374679120879e-301,4.620379674175825e-301,4.615384669230769e-301,4.610389664285714e-301,4.6053946593406596e-301,4.600399654395605e-301,4.595404649450549e-301,4.5904096445054945e-301,4.58541463956044e-301,4.580419634615384e-301,4.57542462967033e-301,4.570429624725275e-301,4.56543461978022e-301,4.560439614835165e-301,4.55544460989011e-301,4.550449604945055e-301,4.5454546e-301,4.540459595054945e-301,4.535464590109891e-301,4.530469585164835e-301,4.5254745802197795e-301,4.520479575274725e-301,4.515484570329671e-301,4.510489565384616e-301,4.505494560439561e-301,4.500499555494505e-301,4.49550455054945e-301,4.4905095456043955e-301,4.4855145406593416e-301,4.480519535714287e-301,4.47552453076923e-301,4.470529525824176e-301,4.465534520879121e-301,4.460539515934066e-301,4.4555445109890114e-301,4.450549506043956e-301,4.445554501098901e-301,4.440559496153846e-301,4.435564491208792e-301,4.430569486263736e-301,4.425574481318681e-301,4.4205794763736266e-301,4.415584471428572e-301,4.410589466483517e-301,4.4055944615384615e-301,4.400599456593406e-301,4.395604451648351e-301,4.390609446703297e-301,4.385614441758242e-301,4.380619436813187e-301,4.375624431868132e-301,4.370629426923077e-301,4.365634421978022e-301,4.360639417032967e-301,4.355644412087912e-301,4.350649407142858e-301,4.345654402197802e-301,4.340659397252747e-301,4.335664392307692e-301,4.330669387362638e-301,4.325674382417583e-301,4.3206793774725275e-301,4.315684372527472e-301,4.310689367582417e-301,4.3056943626373625e-301,4.3006993576923086e-301,4.295704352747253e-301,4.2907093478021974e-301,4.285714342857143e-301,4.280719337912088e-301,4.275724332967033e-301,4.270729328021979e-301,4.265734323076923e-301,4.260739318131868e-301,4.255744313186813e-301,4.250749308241759e-301,4.245754303296703e-301,4.240759298351648e-301,4.2357642934065936e-301,4.230769288461539e-301,4.225774283516484e-301,4.2207792785714285e-301,4.215784273626373e-301,4.210789268681319e-301,4.205794263736264e-301,4.2007992587912095e-301,4.195804253846154e-301,4.190809248901098e-301,4.185814243956044e-301,4.180819239010989e-301,4.175824234065934e-301,4.1708292291208794e-301,4.165834224175824e-301,4.160839219230769e-301,4.155844214285714e-301,4.150849209340659e-301,4.145854204395605e-301,4.14085919945055e-301,4.1358641945054946e-301,4.13086918956044e-301,4.125874184615384e-301,4.1208791796703295e-301,4.1158841747252756e-301,4.11088916978022e-301,4.1058941648351644e-301,4.10089915989011e-301,4.095904154945055e-301,4.09090915e-301,4.0859141450549455e-301,4.08091914010989e-301,4.075924135164835e-301,4.07092913021978e-301,4.065934125274726e-301,4.06093912032967e-301,4.055944115384615e-301,4.050949110439561e-301,4.045954105494506e-301,4.040959100549451e-301,4.0359640956043955e-301,4.03096909065934e-301,4.025974085714286e-301,4.020979080769231e-301,4.0159840758241766e-301,4.010989070879121e-301,4.005994065934065e-301,4.000999060989011e-301,3.996004056043957e-301,3.991009051098902e-301,3.9860140461538464e-301,3.981019041208791e-301,3.976024036263736e-301,3.971029031318681e-301,3.966034026373627e-301,3.961039021428572e-301,3.956044016483516e-301,3.9510490115384616e-301,3.946054006593407e-301,3.941059001648351e-301,3.9360639967032965e-301,3.931068991758243e-301,3.926073986813187e-301,3.921078981868132e-301,3.916083976923077e-301,3.911088971978022e-301,3.906093967032967e-301,3.9010989620879125e-301,3.896103957142857e-301,3.891108952197802e-301,3.886113947252747e-301,3.881118942307693e-301,3.876123937362637e-301,3.871128932417582e-301,3.866133927472528e-301,3.861138922527473e-301,3.856143917582418e-301,3.8511489126373625e-301,3.846153907692307e-301,3.841158902747253e-301,3.836163897802198e-301,3.8311688928571436e-301,3.826173887912087e-301,3.8211788829670324e-301,3.8161838780219785e-301,3.811188873076923e-301,3.806193868131868e-301,3.8011988631868134e-301,3.796203858241759e-301,3.791208853296703e-301,3.786213848351648e-301,3.781218843406594e-301,3.776223838461538e-301,3.771228833516484e-301,3.7662338285714286e-301,3.761238823626374e-301,3.756243818681319e-301,3.7512488137362635e-301,3.746253808791209e-301,3.741258803846154e-301,3.736263798901099e-301,3.731268793956044e-301,3.726273789010989e-301,3.7212787840659342e-301,3.716283779120879e-301,3.7112887741758243e-301,3.7062937692307696e-301,3.701298764285714e-301,3.6963037593406597e-301,3.6913087543956045e-301,3.6863137494505494e-301,3.6813187445054946e-301,3.6763237395604395e-301,3.6713287346153847e-301,3.66633372967033e-301,3.661338724725275e-301,3.6563437197802197e-301,3.6513487148351653e-301,3.6463537098901098e-301,3.641358704945055e-301,3.6363637000000003e-301,3.631368695054945e-301,3.6263736901098904e-301,3.621378685164835e-301,3.6163836802197805e-301,3.6113886752747253e-301,3.6063936703296706e-301,3.601398665384616e-301,3.5964036604395602e-301,3.5914086554945055e-301,3.5864136505494508e-301,3.5814186456043956e-301,3.5764236406593404e-301,3.5714286357142857e-301,3.566433630769231e-301,3.5614386258241758e-301,3.556443620879121e-301,3.551448615934066e-301,3.546453610989011e-301,3.541458606043956e-301,3.5364636010989012e-301,3.531468596153846e-301,3.5264735912087913e-301,3.5214785862637366e-301,3.516483581318681e-301,3.5114885763736267e-301,3.506493571428571e-301,3.5014985664835164e-301,3.496503561538462e-301,3.4915085565934065e-301,3.4865135516483517e-301,3.481518546703297e-301,3.476523541758242e-301,3.4715285368131867e-301,3.466533531868132e-301,3.461538526923077e-301,3.456543521978022e-301,3.4515485170329673e-301,3.446553512087912e-301,3.441558507142857e-301,3.4365635021978022e-301,3.4315684972527475e-301,3.4265734923076923e-301,3.4215784873626376e-301,3.416583482417583e-301,3.4115884774725273e-301,3.406593472527473e-301,3.4015984675824173e-301,3.3966034626373626e-301,3.3916084576923083e-301,3.3866134527472527e-301,3.381618447802198e-301,3.3766234428571432e-301,3.371628437912088e-301,3.366633432967033e-301,3.3616384280219777e-301,3.3566434230769234e-301,3.3516484181318683e-301,3.346653413186813e-301,3.3416584082417583e-301,3.336663403296703e-301,3.331668398351648e-301,3.3266733934065937e-301,3.3216783884615385e-301,3.3166833835164834e-301,3.311688378571429e-301,3.3066933736263735e-301,3.3016983686813187e-301,3.2967033637362636e-301,3.291708358791209e-301,3.286713353846154e-301,3.281718348901099e-301,3.276723343956044e-301,3.2717283390109886e-301,3.2667333340659343e-301,3.261738329120879e-301,3.256743324175824e-301,3.2517483192307696e-301,3.2467533142857145e-301,3.2417583093406593e-301,3.2367633043956046e-301,3.2317682994505494e-301,3.2267732945054943e-301,3.22177828956044e-301,3.2167832846153848e-301,3.2117882796703296e-301,3.2067932747252753e-301,3.2017982697802197e-301,3.196803264835165e-301,3.19180825989011e-301,3.186813254945055e-301,3.1818182500000003e-301,3.176823245054945e-301,3.1718282401098904e-301,3.166833235164835e-301,3.1618382302197805e-301,3.1568432252747254e-301,3.15184822032967e-301,3.146853215384616e-301,3.1418582104395607e-301,3.1368632054945056e-301,3.1318682005494504e-301,3.1268731956043957e-301,3.1218781906593405e-301,3.1168831857142858e-301,3.111888180769231e-301,3.106893175824176e-301,3.1018981708791207e-301,3.096903165934066e-301,3.091908160989011e-301,3.0869131560439556e-301,3.0819181510989013e-301,3.0769231461538466e-301,3.071928141208791e-301,3.0669331362637367e-301,3.061938131318681e-301,3.0569431263736263e-301,3.0519481214285716e-301,3.0469531164835164e-301,3.0419581115384617e-301,3.0369631065934065e-301,3.0319681016483518e-301,3.0269730967032966e-301,3.021978091758242e-301,3.0169830868131867e-301,3.011988081868132e-301,3.0069930769230772e-301,3.001998071978022e-301,2.997003067032967e-301,2.992008062087912e-301,2.9870130571428574e-301,2.982018052197802e-301,2.9770230472527475e-301,2.9720280423076928e-301,2.9670330373626372e-301,2.962038032417583e-301,2.9570430274725273e-301,2.9520480225274726e-301,2.947053017582418e-301,2.9420580126373627e-301,2.937063007692308e-301,2.9320680027472528e-301,2.927072997802198e-301,2.922077992857143e-301,2.917082987912088e-301,2.912087982967033e-301,2.9070929780219782e-301,2.902097973076923e-301,2.8971029681318683e-301,2.892107963186813e-301,2.887112958241758e-301,2.8821179532967037e-301,2.877122948351648e-301,2.8721279434065933e-301,2.8671329384615386e-301,2.8621379335164834e-301,2.8571429285714287e-301,2.8521479236263735e-301,2.847152918681319e-301,2.8421579137362636e-301,2.837162908791209e-301,2.832167903846154e-301,2.8271728989010986e-301,2.8221778939560443e-301,2.817182889010989e-301,2.812187884065934e-301,2.807192879120879e-301,2.8021978741758244e-301,2.7972028692307693e-301,2.7922078642857145e-301,2.7872128593406594e-301,2.7822178543956042e-301,2.77722284945055e-301,2.7722278445054943e-301,2.7672328395604396e-301,2.762237834615385e-301,2.7572428296703297e-301,2.752247824725275e-301,2.7472528197802198e-301,2.742257814835165e-301,2.73726280989011e-301,2.732267804945055e-301,2.7272728000000004e-301,2.722277795054945e-301,2.7172827901098905e-301,2.7122877851648353e-301,2.70729278021978e-301,2.7022977752747254e-301,2.6973027703296703e-301,2.6923077653846155e-301,2.6873127604395608e-301,2.6823177554945056e-301,2.6773227505494505e-301,2.6723277456043957e-301,2.6673327406593406e-301,2.662337735714286e-301,2.6573427307692307e-301,2.652347725824176e-301,2.647352720879121e-301,2.6423577159340656e-301,2.6373627109890113e-301,2.6323677060439557e-301,2.627372701098901e-301,2.6223776961538466e-301,2.617382691208791e-301,2.6123876862637363e-301,2.6073926813186816e-301,2.6023976763736264e-301,2.5974026714285712e-301,2.5924076664835165e-301,2.5874126615384617e-301,2.5824176565934066e-301,2.577422651648352e-301,2.5724276467032967e-301,2.567432641758242e-301,2.5624376368131868e-301,2.557442631868132e-301,2.552447626923077e-301,2.547452621978022e-301,2.5424576170329674e-301,2.537462612087912e-301,2.5324676071428575e-301,2.527472602197802e-301,2.522477597252747e-301,2.517482592307693e-301,2.5124875873626373e-301,2.5074925824175825e-301,2.5024975774725278e-301,2.4975025725274726e-301,2.4925075675824175e-301,2.4875125626373627e-301,2.482517557692308e-301,2.477522552747253e-301,2.472527547802198e-301,2.467532542857143e-301,2.4625375379120878e-301,2.457542532967033e-301,2.4525475280219783e-301,2.447552523076923e-301,2.4425575181318684e-301,2.4375625131868136e-301,2.432567508241758e-301,2.4275725032967033e-301,2.422577498351648e-301,2.4175824934065934e-301,2.4125874884615387e-301,2.4075924835164835e-301,2.4025974785714288e-301,2.3976024736263736e-301,2.392607468681319e-301,2.3876124637362637e-301,2.3826174587912085e-301,2.3776224538461542e-301,2.372627448901099e-301,2.367632443956044e-301,2.362637439010989e-301,2.357642434065934e-301,2.352647429120879e-301,2.3476524241758245e-301,2.3426574192307693e-301,2.337662414285714e-301,2.33266740934066e-301,2.3276724043956043e-301,2.3226773994505495e-301,2.3176823945054944e-301,2.3126873895604396e-301,2.307692384615385e-301,2.3026973796703297e-301,2.297702374725275e-301,2.2927073697802194e-301,2.287712364835165e-301,2.28271735989011e-301,2.2777223549450548e-301,2.2727273500000004e-301,2.2677323450549453e-301,2.26273734010989e-301,2.2577423351648354e-301,2.2527473302197802e-301,2.247752325274725e-301,2.2427573203296707e-301,2.2377623153846156e-301,2.2327673104395604e-301,2.2277723054945057e-301,2.2227773005494505e-301,2.2177822956043958e-301,2.2127872906593406e-301,2.207792285714286e-301,2.202797280769231e-301,2.1978022758241756e-301,2.1928072708791212e-301,2.1878122659340657e-301,2.182817260989011e-301,2.177822256043956e-301,2.172827251098901e-301,2.1678322461538463e-301,2.1628372412087915e-301,2.1578422362637364e-301,2.152847231318681e-301,2.1478522263736265e-301,2.1428572214285713e-301,2.1378622164835166e-301,2.132867211538462e-301,2.1278722065934067e-301,2.1228772016483515e-301,2.1178821967032967e-301,2.112887191758242e-301,2.1078921868131864e-301,2.102897181868132e-301,2.0979021769230774e-301,2.0929071719780218e-301,2.0879121670329675e-301,2.082917162087912e-301,2.077922157142857e-301,2.0729271521978024e-301,2.0679321472527472e-301,2.0629371423076925e-301,2.0579421373626373e-301,2.0529471324175826e-301,2.0479521274725274e-301,2.0429571225274727e-301,2.0379621175824175e-301,2.0329671126373628e-301,2.027972107692308e-301,2.022977102747253e-301,2.0179820978021977e-301,2.012987092857143e-301,2.0079920879120882e-301,2.0029970829670327e-301,1.9980020780219783e-301,1.9930070730769236e-301,1.988012068131868e-301,1.9830170631868137e-301,1.978022058241758e-301,1.9730270532967034e-301,1.9680320483516482e-301,1.9630370434065935e-301,1.9580420384615387e-301,1.953047033516483e-301,1.948052028571429e-301,1.9430570236263737e-301,1.9380620186813185e-301,1.9330670137362638e-301,1.928072008791209e-301,1.9230770038461534e-301,1.918081998901099e-301,1.913086993956044e-301,1.9080919890109892e-301,1.903096984065934e-301,1.898101979120879e-301,1.893106974175824e-301,1.8881119692307694e-301,1.8831169642857142e-301,1.8781219593406595e-301,1.8731269543956043e-301,1.8681319494505496e-301,1.8631369445054947e-301,1.8581419395604395e-301,1.8531469346153847e-301,1.8481519296703298e-301,1.8431569247252746e-301,1.8381619197802197e-301,1.8331669148351652e-301,1.82817190989011e-301,1.823176904945055e-301,1.8181819e-301,1.813186895054945e-301,1.8081918901098902e-301,1.8031968851648352e-301,1.7982018802197803e-301,1.7932068752747253e-301,1.7882118703296704e-301,1.7832168653846154e-301,1.7782218604395605e-301,1.7732268554945053e-301,1.7682318505494506e-301,1.7632368456043958e-301,1.7582418406593407e-301,1.7532468357142857e-301,1.748251830769231e-301,1.7432568258241758e-301,1.7382618208791209e-301,1.733266815934066e-301,1.728271810989011e-301,1.7232768060439562e-301,1.7182818010989013e-301,1.7132867961538461e-301,1.7082917912087912e-301,1.7032967862637364e-301,1.6983017813186813e-301,1.6933067763736265e-301,1.6883117714285716e-301,1.6833167664835166e-301,1.6783217615384617e-301,1.6733267565934065e-301,1.6683317516483516e-301,1.6633367467032968e-301,1.6583417417582419e-301,1.653346736813187e-301,1.648351731868132e-301,1.6433567269230768e-301,1.638361721978022e-301,1.633366717032967e-301,1.628371712087912e-301,1.6233767071428572e-301,1.6183817021978025e-301,1.6133866972527473e-301,1.6083916923076923e-301,1.6033966873626374e-301,1.5984016824175824e-301,1.5934066774725275e-301,1.5884116725274727e-301,1.5834166675824176e-301,1.5784216626373626e-301,1.5734266576923079e-301,1.5684316527472527e-301,1.5634366478021978e-301,1.5584416428571426e-301,1.553446637912088e-301,1.5484516329670331e-301,1.543456628021978e-301,1.538461623076923e-301,1.5334666181318683e-301,1.5284716131868131e-301,1.5234766082417582e-301,1.5184816032967034e-301,1.5134865983516485e-301,1.5084915934065935e-301,1.5034965884615386e-301,1.4985015835164834e-301,1.4935065785714285e-301,1.4885115736263737e-301,1.4835165686813188e-301,1.4785215637362638e-301,1.4735265587912089e-301,1.468531553846154e-301,1.463536548901099e-301,1.458541543956044e-301,1.4535465390109889e-301,1.4485515340659343e-301,1.4435565291208792e-301,1.4385615241758242e-301,1.4335665192307693e-301,1.4285715142857143e-301,1.4235765093406594e-301,1.4185815043956044e-301,1.4135864994505495e-301,1.4085914945054945e-301,1.4035964895604398e-301,1.3986014846153846e-301,1.3936064796703297e-301,1.3886114747252747e-301,1.3836164697802197e-301,1.378621464835165e-301,1.37362645989011e-301,1.3686314549450549e-301,1.3636364500000002e-301,1.3586414450549452e-301,1.35364644010989e-301,1.348651435164835e-301,1.3436564302197806e-301,1.3386614252747254e-301,1.3336664203296704e-301,1.3286714153846153e-301,1.3236764104395603e-301,1.3186814054945056e-301,1.3136864005494504e-301,1.3086913956043957e-301,1.3036963906593407e-301,1.2987013857142858e-301,1.2937063807692308e-301,1.2887113758241759e-301,1.2837163708791207e-301,1.278721365934066e-301,1.2737263609890112e-301,1.268731356043956e-301,1.2637363510989011e-301,1.2587413461538464e-301,1.2537463412087912e-301,1.2487513362637363e-301,1.2437563313186813e-301,1.2387613263736262e-301,1.2337663214285716e-301,1.2287713164835167e-301,1.2237763115384615e-301,1.2187813065934066e-301,1.2137863016483516e-301,1.2087912967032967e-301,1.203796291758242e-301,1.1988012868131868e-301,1.193806281868132e-301,1.188811276923077e-301,1.183816271978022e-301,1.178821267032967e-301,1.173826262087912e-301,1.1688312571428573e-301,1.1638362521978023e-301,1.1588412472527474e-301,1.1538462423076922e-301,1.1488512373626375e-301,1.1438562324175825e-301,1.1388612274725273e-301,1.1338662225274724e-301,1.1288712175824179e-301,1.1238762126373627e-301,1.1188812076923077e-301,1.1138862027472528e-301,1.1088911978021978e-301,1.1038961928571429e-301,1.0989011879120877e-301,1.093906182967033e-301,1.088911178021978e-301,1.083916173076923e-301,1.0789211681318681e-301,1.0739261631868132e-301,1.068931158241758e-301,1.0639361532967033e-301,1.0589411483516485e-301,1.0539461434065934e-301,1.0489511384615384e-301,1.0439561335164837e-301,1.0389611285714285e-301,1.0339661236263736e-301,1.0289711186813186e-301,1.0239761137362639e-301,1.018981108791209e-301,1.013986103846154e-301,1.0089910989010988e-301,1.0039960939560439e-301,9.990010890109891e-302,9.94006084065934e-302,9.890110791208792e-302,9.84016074175824e-302,9.790210692307693e-302,9.740260642857144e-302,9.690310593406592e-302,9.640360543956043e-302,9.590410494505495e-302,9.540460445054946e-302,9.490510395604396e-302,9.440560346153847e-302,9.390610296703297e-302,9.340660247252748e-302,9.290710197802198e-302,9.240760148351649e-302,9.190810098901099e-302,9.14086004945055e-302,9.090910000000001e-302,9.04095995054945e-302,8.991009901098901e-302,8.941059851648351e-302,8.891109802197803e-302,8.841159752747252e-302,8.791209703296704e-302,8.741259653846154e-302,8.691309604395605e-302,8.641359554945054e-302,8.591409505494507e-302,8.541459456043956e-302,8.491509406593406e-302,8.441559357142858e-302,8.391609307692308e-302,8.341659258241758e-302,8.291709208791208e-302,8.24175915934066e-302,8.19180910989011e-302,8.14185906043956e-302,8.091909010989011e-302,8.041958961538462e-302,7.992008912087912e-302,7.942058862637363e-302,7.892108813186814e-302,7.842158763736264e-302,7.792208714285714e-302,7.742258664835165e-302,7.692308615384616e-302,7.642358565934065e-302,7.592408516483517e-302,7.542458467032967e-302,7.492508417582418e-302,7.442558368131868e-302,7.392608318681319e-302,7.342658269230769e-302,7.292708219780221e-302,7.24275817032967e-302,7.192808120879122e-302,7.142858071428571e-302,7.092908021978023e-302,7.042957972527472e-302,6.993007923076924e-302,6.943057873626374e-302,6.893107824175824e-302,6.843157774725275e-302,6.793207725274726e-302,6.743257675824176e-302,6.693307626373626e-302,6.643357576923077e-302,6.593407527472528e-302,6.543457478021978e-302,6.493507428571429e-302,6.44355737912088e-302,6.393607329670329e-302,6.34365728021978e-302,6.293707230769231e-302,6.243757181318682e-302,6.193807131868131e-302,6.143857082417584e-302,6.093907032967033e-302,6.043956983516483e-302,5.994006934065933e-302,5.944056884615385e-302,5.894106835164835e-302,5.844156785714285e-302,5.794206736263737e-302,5.744256686813187e-302,5.694306637362637e-302,5.644356587912088e-302,5.594406538461539e-302,5.544456489010989e-302,5.494506439560439e-302,5.444556390109891e-302,5.394606340659341e-302,5.344656291208791e-302,5.294706241758241e-302,5.244756192307693e-302,5.194806142857142e-302,5.144856093406594e-302,5.094906043956044e-302,5.044955994505495e-302,4.995005945054945e-302,4.945055895604396e-302,4.895105846153846e-302,4.845155796703297e-302,4.795205747252747e-302,4.745255697802198e-302,4.695305648351648e-302,4.6453555989010986e-302,4.5954055494505496e-302,4.5454555e-302,4.4955054505494506e-302,4.4455554010989016e-302,4.3956053516483516e-302,4.3456553021978026e-302,4.295705252747253e-302,4.2457552032967036e-302,4.195805153846154e-302,4.1458551043956045e-302,4.0959050549450555e-302,4.0459550054945055e-302,3.996004956043956e-302,3.9460549065934065e-302,3.896104857142857e-302,3.8461548076923075e-302,3.7962047582417585e-302,3.7462547087912084e-302,3.6963046593406594e-302,3.6463546098901104e-302,3.5964045604395604e-302,3.5464545109890114e-302,3.4965044615384614e-302,3.4465544120879124e-302,3.396604362637363e-302,3.3466543131868134e-302,3.2967042637362644e-302,3.246754214285714e-302,3.196804164835165e-302,3.1468541153846153e-302,3.096904065934066e-302,3.0469540164835163e-302,2.997003967032967e-302,2.947053917582418e-302,2.8971038681318683e-302,2.847153818681319e-302,2.797203769230769e-302,2.74725371978022e-302,2.69730367032967e-302,2.647353620879121e-302,2.5974035714285717e-302,2.547453521978022e-302,2.497503472527473e-302,2.4475534230769227e-302,2.3976033736263737e-302,2.347653324175824e-302,2.297703274725275e-302,2.2477532252747251e-302,2.1978031758241756e-302,2.1478531263736264e-302,2.097903076923077e-302,2.0479530274725276e-302,1.998002978021978e-302,1.9480529285714286e-302,1.8981028791208793e-302,1.8481528296703296e-302,1.79820278021978e-302,1.7482527307692305e-302,1.6983026813186815e-302,1.648352631868132e-302,1.5984025824175825e-302,1.548452532967033e-302,1.4985024835164835e-302,1.448552434065934e-302,1.3986023846153845e-302,1.3486523351648352e-302,1.2987022857142857e-302,1.2487522362637364e-302,1.198802186813187e-302,1.1488521373626374e-302,1.0989020879120879e-302,1.0489520384615385e-302,9.99001989010989e-303,9.490519395604396e-303,8.991018901098901e-303,8.491518406593407e-303,7.992017912087912e-303,7.492517417582418e-303,6.993016923076923e-303,6.493516428571428e-303,5.994015934065934e-303,5.494515439560439e-303,4.9950149450549454e-303,4.49551445054945e-303,3.9960139560439565e-303,3.4965134615384614e-303,2.9970129670329675e-303,2.4975124725274724e-303,1.998011978021978e-303,1.4985114835164835e-303,9.990109890109891e-304,4.995104945054945e-304,1.0e-308],"x":[1.0e-300,9.995004995054944e-301,9.99000999010989e-301,9.985014985164834e-301,9.980019980219781e-301,9.975024975274727e-301,9.97002997032967e-301,9.965034965384617e-301,9.960039960439559e-301,9.955044955494506e-301,9.950049950549451e-301,9.945054945604395e-301,9.940059940659342e-301,9.935064935714285e-301,9.930069930769232e-301,9.925074925824176e-301,9.920079920879121e-301,9.915084915934066e-301,9.91008991098901e-301,9.905094906043957e-301,9.9000999010989e-301,9.895104896153846e-301,9.890109891208793e-301,9.885114886263736e-301,9.880119881318683e-301,9.875124876373627e-301,9.870129871428572e-301,9.865134866483516e-301,9.86013986153846e-301,9.855144856593408e-301,9.850149851648351e-301,9.845154846703298e-301,9.840159841758242e-301,9.835164836813187e-301,9.830169831868134e-301,9.825174826923076e-301,9.820179821978023e-301,9.815184817032966e-301,9.810189812087912e-301,9.805194807142857e-301,9.800199802197802e-301,9.795204797252749e-301,9.790209792307693e-301,9.785214787362638e-301,9.780219782417583e-301,9.775224777472527e-301,9.770229772527474e-301,9.765234767582417e-301,9.760239762637363e-301,9.755244757692308e-301,9.750249752747253e-301,9.745254747802198e-301,9.740259742857144e-301,9.735264737912089e-301,9.730269732967032e-301,9.725274728021978e-301,9.720279723076923e-301,9.715284718131868e-301,9.710289713186812e-301,9.705294708241759e-301,9.700299703296704e-301,9.69530469835165e-301,9.690309693406595e-301,9.685314688461536e-301,9.680319683516483e-301,9.675324678571429e-301,9.670329673626374e-301,9.665334668681319e-301,9.660339663736263e-301,9.65534465879121e-301,9.650349653846153e-301,9.6453546489011e-301,9.640359643956045e-301,9.635364639010989e-301,9.630369634065934e-301,9.625374629120878e-301,9.620379624175825e-301,9.61538461923077e-301,9.610389614285715e-301,9.60539460934066e-301,9.600399604395604e-301,9.595404599450551e-301,9.590409594505493e-301,9.58541458956044e-301,9.580419584615385e-301,9.575424579670329e-301,9.570429574725276e-301,9.56543456978022e-301,9.560439564835166e-301,9.555444559890111e-301,9.550449554945055e-301,9.545454550000002e-301,9.540459545054944e-301,9.53546454010989e-301,9.530469535164834e-301,9.52547453021978e-301,9.520479525274727e-301,9.51548452032967e-301,9.510489515384617e-301,9.50549451043956e-301,9.500499505494506e-301,9.49550450054945e-301,9.490509495604395e-301,9.485514490659342e-301,9.480519485714285e-301,9.47552448076923e-301,9.470529475824176e-301,9.465534470879121e-301,9.460539465934068e-301,9.455544460989012e-301,9.450549456043955e-301,9.4455544510989e-301,9.440559446153846e-301,9.435564441208791e-301,9.430569436263736e-301,9.425574431318681e-301,9.420579426373627e-301,9.415584421428572e-301,9.410589416483517e-301,9.405594411538461e-301,9.400599406593408e-301,9.395604401648351e-301,9.390609396703297e-301,9.385614391758242e-301,9.380619386813187e-301,9.375624381868132e-301,9.370629376923078e-301,9.365634371978023e-301,9.360639367032968e-301,9.355644362087912e-301,9.350649357142857e-301,9.345654352197802e-301,9.340659347252748e-301,9.335664342307693e-301,9.330669337362638e-301,9.325674332417583e-301,9.320679327472529e-301,9.315684322527472e-301,9.310689317582417e-301,9.305694312637363e-301,9.300699307692308e-301,9.295704302747253e-301,9.290709297802197e-301,9.285714292857144e-301,9.280719287912087e-301,9.275724282967034e-301,9.27072927802198e-301,9.265734273076921e-301,9.260739268131868e-301,9.255744263186812e-301,9.250749258241759e-301,9.245754253296704e-301,9.240759248351648e-301,9.235764243406595e-301,9.230769238461538e-301,9.225774233516485e-301,9.220779228571429e-301,9.215784223626372e-301,9.21078921868132e-301,9.205794213736263e-301,9.20079920879121e-301,9.195804203846153e-301,9.1908091989011e-301,9.185814193956045e-301,9.180819189010989e-301,9.175824184065936e-301,9.170829179120878e-301,9.165834174175825e-301,9.160839169230768e-301,9.155844164285714e-301,9.15084915934066e-301,9.145854154395604e-301,9.140859149450551e-301,9.135864144505495e-301,9.13086913956044e-301,9.125874134615387e-301,9.120879129670329e-301,9.115884124725276e-301,9.11088911978022e-301,9.105894114835165e-301,9.10089910989011e-301,9.095904104945055e-301,9.090909100000002e-301,9.085914095054946e-301,9.080919090109891e-301,9.075924085164834e-301,9.07092908021978e-301,9.065934075274725e-301,9.06093907032967e-301,9.055944065384616e-301,9.05094906043956e-301,9.045954055494506e-301,9.040959050549451e-301,9.035964045604397e-301,9.03096904065934e-301,9.025974035714285e-301,9.02097903076923e-301,9.015984025824176e-301,9.010989020879121e-301,9.005994015934065e-301,9.000999010989012e-301,8.996004006043957e-301,8.991009001098902e-301,8.986013996153846e-301,8.98101899120879e-301,8.976023986263736e-301,8.971028981318682e-301,8.966033976373627e-301,8.961038971428572e-301,8.956043966483517e-301,8.951048961538463e-301,8.946053956593406e-301,8.941058951648353e-301,8.936063946703297e-301,8.931068941758242e-301,8.926073936813187e-301,8.92107893186813e-301,8.916083926923078e-301,8.911088921978023e-301,8.906093917032968e-301,8.901098912087913e-301,8.896103907142857e-301,8.891108902197802e-301,8.886113897252746e-301,8.881118892307693e-301,8.876123887362638e-301,8.871128882417582e-301,8.866133877472529e-301,8.861138872527472e-301,8.856143867582419e-301,8.851148862637364e-301,8.846153857692306e-301,8.841158852747253e-301,8.836163847802197e-301,8.831168842857144e-301,8.826173837912087e-301,8.821178832967033e-301,8.81618382802198e-301,8.811188823076923e-301,8.80619381813187e-301,8.801198813186814e-301,8.796203808241757e-301,8.791208803296702e-301,8.786213798351648e-301,8.781218793406595e-301,8.776223788461538e-301,8.771228783516483e-301,8.766233778571429e-301,8.761238773626374e-301,8.756243768681321e-301,8.751248763736263e-301,8.746253758791208e-301,8.741258753846153e-301,8.736263748901099e-301,8.731268743956044e-301,8.726273739010989e-301,8.721278734065936e-301,8.71628372912088e-301,8.711288724175825e-301,8.706293719230769e-301,8.701298714285714e-301,8.69630370934066e-301,8.691308704395604e-301,8.68631369945055e-301,8.681318694505495e-301,8.67632368956044e-301,8.671328684615385e-301,8.66633367967033e-301,8.661338674725276e-301,8.65634366978022e-301,8.651348664835165e-301,8.64635365989011e-301,8.641358654945055e-301,8.63636365e-301,8.631368645054946e-301,8.626373640109891e-301,8.621378635164836e-301,8.616383630219781e-301,8.611388625274723e-301,8.60639362032967e-301,8.601398615384616e-301,8.59640361043956e-301,8.591408605494506e-301,8.58641360054945e-301,8.581418595604397e-301,8.57642359065934e-301,8.571428585714287e-301,8.56643358076923e-301,8.561438575824174e-301,8.556443570879121e-301,8.551448565934065e-301,8.546453560989012e-301,8.541458556043957e-301,8.5364635510989e-301,8.531468546153847e-301,8.526473541208791e-301,8.521478536263738e-301,8.51648353131868e-301,8.511488526373625e-301,8.506493521428572e-301,8.501498516483516e-301,8.496503511538463e-301,8.491508506593406e-301,8.486513501648353e-301,8.481518496703298e-301,8.476523491758242e-301,8.471528486813187e-301,8.466533481868131e-301,8.461538476923078e-301,8.456543471978021e-301,8.451548467032967e-301,8.446553462087914e-301,8.441558457142857e-301,8.436563452197804e-301,8.431568447252748e-301,8.426573442307691e-301,8.421578437362638e-301,8.416583432417582e-301,8.411588427472529e-301,8.406593422527472e-301,8.401598417582418e-301,8.396603412637363e-301,8.391608407692308e-301,8.386613402747255e-301,8.381618397802199e-301,8.376623392857142e-301,8.371628387912087e-301,8.366633382967033e-301,8.361638378021978e-301,8.356643373076923e-301,8.351648368131868e-301,8.346653363186814e-301,8.341658358241759e-301,8.336663353296704e-301,8.331668348351648e-301,8.326673343406593e-301,8.321678338461538e-301,8.316683333516484e-301,8.311688328571429e-301,8.306693323626374e-301,8.301698318681318e-301,8.296703313736265e-301,8.29170830879121e-301,8.286713303846153e-301,8.281718298901099e-301,8.276723293956042e-301,8.27172828901099e-301,8.266733284065934e-301,8.26173827912088e-301,8.256743274175825e-301,8.25174826923077e-301,8.246753264285715e-301,8.241758259340657e-301,8.236763254395604e-301,8.23176824945055e-301,8.226773244505495e-301,8.22177823956044e-301,8.216783234615384e-301,8.21178822967033e-301,8.206793224725276e-301,8.201798219780221e-301,8.196803214835166e-301,8.191808209890108e-301,8.186813204945055e-301,8.181818199999999e-301,8.176823195054946e-301,8.171828190109891e-301,8.166833185164835e-301,8.161838180219782e-301,8.156843175274725e-301,8.151848170329672e-301,8.146853165384616e-301,8.14185816043956e-301,8.136863155494506e-301,8.13186815054945e-301,8.126873145604397e-301,8.12187814065934e-301,8.116883135714286e-301,8.111888130769232e-301,8.106893125824176e-301,8.101898120879123e-301,8.096903115934065e-301,8.09190811098901e-301,8.086913106043955e-301,8.0819181010989e-301,8.076923096153848e-301,8.071928091208791e-301,8.066933086263736e-301,8.061938081318682e-301,8.056943076373627e-301,8.051948071428572e-301,8.046953066483516e-301,8.041958061538461e-301,8.036963056593406e-301,8.031968051648352e-301,8.026973046703297e-301,8.021978041758242e-301,8.016983036813189e-301,8.011988031868133e-301,8.006993026923076e-301,8.001998021978021e-301,7.997003017032967e-301,7.992008012087914e-301,7.987013007142857e-301,7.982018002197802e-301,7.977022997252748e-301,7.972027992307693e-301,7.967032987362638e-301,7.962037982417583e-301,7.957042977472527e-301,7.952047972527472e-301,7.947052967582418e-301,7.942057962637363e-301,7.937062957692308e-301,7.932067952747253e-301,7.927072947802199e-301,7.922077942857144e-301,7.917082937912089e-301,7.912087932967033e-301,7.907092928021976e-301,7.902097923076923e-301,7.897102918131868e-301,7.892107913186814e-301,7.887112908241759e-301,7.882117903296703e-301,7.87712289835165e-301,7.872127893406593e-301,7.867132888461538e-301,7.862137883516484e-301,7.857142878571427e-301,7.852147873626374e-301,7.847152868681318e-301,7.842157863736265e-301,7.83716285879121e-301,7.832167853846153e-301,7.8271728489011e-301,7.822177843956042e-301,7.81718283901099e-301,7.812187834065933e-301,7.807192829120878e-301,7.802197824175825e-301,7.797202819230769e-301,7.792207814285716e-301,7.787212809340659e-301,7.782217804395606e-301,7.777222799450551e-301,7.772227794505493e-301,7.76723278956044e-301,7.762237784615384e-301,7.75724277967033e-301,7.752247774725274e-301,7.74725276978022e-301,7.742257764835166e-301,7.73726275989011e-301,7.732267754945057e-301,7.727272749999999e-301,7.722277745054944e-301,7.717282740109891e-301,7.712287735164835e-301,7.707292730219782e-301,7.702297725274725e-301,7.69730272032967e-301,7.692307715384616e-301,7.687312710439561e-301,7.682317705494508e-301,7.67732270054945e-301,7.672327695604395e-301,7.66733269065934e-301,7.662337685714286e-301,7.65734268076923e-301,7.652347675824176e-301,7.647352670879121e-301,7.642357665934067e-301,7.637362660989012e-301,7.632367656043955e-301,7.6273726510989e-301,7.622377646153846e-301,7.617382641208791e-301,7.612387636263736e-301,7.607392631318682e-301,7.602397626373627e-301,7.597402621428572e-301,7.592407616483517e-301,7.587412611538461e-301,7.582417606593406e-301,7.577422601648352e-301,7.572427596703297e-301,7.567432591758242e-301,7.562437586813187e-301,7.557442581868131e-301,7.552447576923076e-301,7.547452571978023e-301,7.542457567032968e-301,7.537462562087912e-301,7.532467557142857e-301,7.527472552197803e-301,7.522477547252748e-301,7.517482542307693e-301,7.512487537362638e-301,7.507492532417584e-301,7.502497527472527e-301,7.497502522527472e-301,7.492507517582418e-301,7.487512512637363e-301,7.482517507692308e-301,7.477522502747253e-301,7.472527497802197e-301,7.467532492857142e-301,7.462537487912088e-301,7.457542482967034e-301,7.452547478021978e-301,7.447552473076923e-301,7.4425574681318685e-301,7.437562463186813e-301,7.432567458241758e-301,7.427572453296703e-301,7.422577448351649e-301,7.417582443406594e-301,7.4125874384615384e-301,7.407592433516484e-301,7.402597428571428e-301,7.397602423626373e-301,7.3926074186813194e-301,7.387612413736264e-301,7.382617408791209e-301,7.377622403846154e-301,7.372627398901099e-301,7.367632393956043e-301,7.362637389010989e-301,7.3576423840659346e-301,7.35264737912088e-301,7.347652374175824e-301,7.342657369230769e-301,7.337662364285714e-301,7.33266735934066e-301,7.327672354395605e-301,7.32267734945055e-301,7.317682344505494e-301,7.312687339560439e-301,7.307692334615385e-301,7.302697329670331e-301,7.297702324725274e-301,7.29270731978022e-301,7.287712314835165e-301,7.28271730989011e-301,7.277722304945055e-301,7.272727300000001e-301,7.267732295054945e-301,7.26273729010989e-301,7.2577422851648356e-301,7.252747280219781e-301,7.247752275274725e-301,7.2427572703296705e-301,7.237762265384616e-301,7.232767260439561e-301,7.2277722554945054e-301,7.222777250549451e-301,7.217782245604395e-301,7.212787240659341e-301,7.2077922357142865e-301,7.202797230769231e-301,7.197802225824176e-301,7.1928072208791206e-301,7.187812215934066e-301,7.182817210989011e-301,7.177822206043956e-301,7.172827201098902e-301,7.167832196153847e-301,7.162837191208791e-301,7.157842186263736e-301,7.152847181318681e-301,7.147852176373627e-301,7.142857171428572e-301,7.137862166483517e-301,7.132867161538461e-301,7.127872156593406e-301,7.122877151648352e-301,7.117882146703298e-301,7.112887141758242e-301,7.107892136813187e-301,7.102897131868132e-301,7.097902126923077e-301,7.092907121978022e-301,7.087912117032967e-301,7.082917112087912e-301,7.077922107142857e-301,7.0729271021978026e-301,7.067932097252748e-301,7.0629370923076914e-301,7.0579420873626375e-301,7.052947082417583e-301,7.047952077472528e-301,7.042957072527473e-301,7.037962067582418e-301,7.032967062637362e-301,7.027972057692308e-301,7.0229770527472535e-301,7.017982047802198e-301,7.012987042857143e-301,7.0079920379120876e-301,7.002997032967033e-301,6.998002028021979e-301,6.993007023076923e-301,6.988012018131869e-301,6.983017013186813e-301,6.978022008241758e-301,6.9730270032967035e-301,6.968031998351648e-301,6.963036993406594e-301,6.9580419884615385e-301,6.953046983516484e-301,6.948051978571428e-301,6.9430569736263734e-301,6.938061968681319e-301,6.933066963736265e-301,6.928071958791209e-301,6.923076953846154e-301,6.918081948901099e-301,6.913086943956044e-301,6.908091939010989e-301,6.903096934065935e-301,6.898101929120879e-301,6.893106924175824e-301,6.8881119192307696e-301,6.883116914285715e-301,6.8781219093406584e-301,6.8731269043956045e-301,6.86813189945055e-301,6.863136894505495e-301,6.85814188956044e-301,6.853146884615384e-301,6.848151879670329e-301,6.843156874725275e-301,6.8381618697802205e-301,6.833166864835166e-301,6.828171859890109e-301,6.823176854945055e-301,6.81818185e-301,6.813186845054946e-301,6.80819184010989e-301,6.803196835164836e-301,6.79820183021978e-301,6.793206825274725e-301,6.7882118203296705e-301,6.783216815384616e-301,6.778221810439561e-301,6.7732268054945055e-301,6.768231800549451e-301,6.763236795604396e-301,6.7582417906593404e-301,6.7532467857142865e-301,6.748251780769231e-301,6.743256775824176e-301,6.738261770879121e-301,6.733266765934066e-301,6.728271760989011e-301,6.7232767560439556e-301,6.718281751098902e-301,6.713286746153846e-301,6.708291741208791e-301,6.703296736263737e-301,6.698301731318682e-301,6.693306726373626e-301,6.6883117214285715e-301,6.683316716483517e-301,6.678321711538462e-301,6.673326706593407e-301,6.668331701648351e-301,6.663336696703296e-301,6.658341691758242e-301,6.6533466868131875e-301,6.648351681868133e-301,6.643356676923076e-301,6.638361671978022e-301,6.633366667032967e-301,6.628371662087913e-301,6.623376657142858e-301,6.618381652197802e-301,6.613386647252747e-301,6.608391642307692e-301,6.6033966373626376e-301,6.598401632417583e-301,6.593406627472527e-301,6.5884116225274725e-301,6.583416617582418e-301,6.578421612637363e-301,6.5734266076923074e-301,6.5684316027472535e-301,6.563436597802198e-301,6.558441592857143e-301,6.5534465879120885e-301,6.548451582967033e-301,6.543456578021978e-301,6.538461573076923e-301,6.533466568131869e-301,6.528471563186813e-301,6.523476558241758e-301,6.518481553296704e-301,6.513486548351648e-301,6.508491543406593e-301,6.5034965384615385e-301,6.498501533516484e-301,6.493506528571429e-301,6.4885115236263735e-301,6.483516518681319e-301,6.478521513736263e-301,6.473526508791209e-301,6.4685315038461545e-301,6.4635364989011e-301,6.458541493956043e-301,6.453546489010989e-301,6.448551484065934e-301,6.44355647912088e-301,6.438561474175825e-301,6.433566469230769e-301,6.428571464285714e-301,6.423576459340659e-301,6.4185814543956046e-301,6.413586449450551e-301,6.408591444505494e-301,6.4035964395604395e-301,6.398601434615385e-301,6.39360642967033e-301,6.3886114247252745e-301,6.38361641978022e-301,6.378621414835165e-301,6.37362640989011e-301,6.3686314049450555e-301,6.3636364e-301,6.358641395054945e-301,6.3536463901098904e-301,6.348651385164836e-301,6.343656380219781e-301,6.338661375274725e-301,6.333666370329671e-301,6.328671365384615e-301,6.323676360439561e-301,6.3186813554945055e-301,6.313686350549451e-301,6.308691345604396e-301,6.3036963406593405e-301,6.298701335714286e-301,6.293706330769231e-301,6.288711325824176e-301,6.2837163208791215e-301,6.278721315934066e-301,6.273726310989011e-301,6.268731306043956e-301,6.263736301098901e-301,6.258741296153847e-301,6.253746291208791e-301,6.248751286263736e-301,6.243756281318681e-301,6.238761276373626e-301,6.2337662714285716e-301,6.228771266483518e-301,6.223776261538461e-301,6.2187812565934065e-301,6.213786251648352e-301,6.208791246703297e-301,6.203796241758242e-301,6.198801236813187e-301,6.193806231868132e-301,6.188811226923077e-301,6.1838162219780225e-301,6.178821217032967e-301,6.173826212087911e-301,6.1688312071428574e-301,6.163836202197803e-301,6.158841197252748e-301,6.153846192307692e-301,6.148851187362637e-301,6.143856182417582e-301,6.138861177472528e-301,6.133866172527473e-301,6.128871167582418e-301,6.123876162637363e-301,6.1188811576923075e-301,6.113886152747253e-301,6.108891147802198e-301,6.103896142857143e-301,6.0989011379120885e-301,6.093906132967033e-301,6.088911128021978e-301,6.083916123076923e-301,6.078921118131869e-301,6.073926113186814e-301,6.068931108241758e-301,6.063936103296704e-301,6.058941098351648e-301,6.053946093406593e-301,6.0489510884615394e-301,6.043956083516484e-301,6.038961078571428e-301,6.0339660736263735e-301,6.028971068681319e-301,6.023976063736264e-301,6.0189810587912085e-301,6.013986053846154e-301,6.008991048901099e-301,6.003996043956044e-301,5.9990010390109895e-301,5.994006034065935e-301,5.989011029120878e-301,5.9840160241758244e-301,5.97902101923077e-301,5.974026014285715e-301,5.969031009340659e-301,5.964036004395604e-301,5.959040999450549e-301,5.954045994505495e-301,5.94905098956044e-301,5.944055984615385e-301,5.939060979670329e-301,5.9340659747252745e-301,5.92907096978022e-301,5.924075964835166e-301,5.91908095989011e-301,5.914085954945055e-301,5.90909095e-301,5.904095945054945e-301,5.89910094010989e-301,5.894105935164836e-301,5.889110930219781e-301,5.884115925274725e-301,5.879120920329671e-301,5.874125915384615e-301,5.86913091043956e-301,5.8641359054945064e-301,5.859140900549451e-301,5.854145895604396e-301,5.8491508906593405e-301,5.844155885714286e-301,5.839160880769231e-301,5.834165875824176e-301,5.829170870879121e-301,5.824175865934066e-301,5.819180860989011e-301,5.8141858560439565e-301,5.809190851098901e-301,5.804195846153845e-301,5.7992008412087915e-301,5.794205836263737e-301,5.789210831318682e-301,5.7842158263736256e-301,5.779220821428571e-301,5.774225816483516e-301,5.769230811538462e-301,5.764235806593407e-301,5.759240801648352e-301,5.754245796703296e-301,5.7492507917582415e-301,5.744255786813187e-301,5.739260781868133e-301,5.734265776923077e-301,5.729270771978022e-301,5.724275767032967e-301,5.719280762087912e-301,5.7142857571428575e-301,5.709290752197803e-301,5.704295747252747e-301,5.6993007423076924e-301,5.694305737362638e-301,5.689310732417582e-301,5.684315727472527e-301,5.679320722527473e-301,5.674325717582418e-301,5.669330712637363e-301,5.6643357076923076e-301,5.659340702747253e-301,5.654345697802198e-301,5.649350692857143e-301,5.6443556879120886e-301,5.639360682967033e-301,5.634365678021978e-301,5.6293706730769235e-301,5.624375668131868e-301,5.619380663186813e-301,5.6143856582417585e-301,5.609390653296704e-301,5.604395648351649e-301,5.599400643406593e-301,5.594405638461538e-301,5.589410633516484e-301,5.584415628571429e-301,5.5794206236263744e-301,5.574425618681318e-301,5.569430613736263e-301,5.5644356087912085e-301,5.559440603846154e-301,5.5544455989011e-301,5.549450593956044e-301,5.544455589010989e-301,5.539460584065934e-301,5.534465579120879e-301,5.5294705741758245e-301,5.52447556923077e-301,5.519480564285714e-301,5.5144855593406594e-301,5.509490554395605e-301,5.50449554945055e-301,5.499500544505494e-301,5.49450553956044e-301,5.489510534615385e-301,5.48451552967033e-301,5.4795205247252746e-301,5.47452551978022e-301,5.469530514835164e-301,5.46453550989011e-301,5.459540504945056e-301,5.4545455e-301,5.449550495054945e-301,5.44455549010989e-301,5.439560485164835e-301,5.434565480219781e-301,5.4295704752747255e-301,5.424575470329671e-301,5.419580465384616e-301,5.41458546043956e-301,5.409590455494505e-301,5.404595450549451e-301,5.399600445604396e-301,5.3946054406593414e-301,5.389610435714286e-301,5.38461543076923e-301,5.3796204258241755e-301,5.374625420879122e-301,5.369630415934067e-301,5.3646354109890105e-301,5.359640406043956e-301,5.354645401098901e-301,5.349650396153846e-301,5.3446553912087915e-301,5.339660386263736e-301,5.334665381318681e-301,5.3296703763736264e-301,5.324675371428572e-301,5.319680366483517e-301,5.314685361538461e-301,5.309690356593407e-301,5.304695351648352e-301,5.299700346703297e-301,5.294705341758242e-301,5.289710336813187e-301,5.284715331868131e-301,5.279720326923077e-301,5.274725321978023e-301,5.269730317032967e-301,5.264735312087912e-301,5.259740307142857e-301,5.254745302197802e-301,5.249750297252748e-301,5.2447552923076925e-301,5.239760287362638e-301,5.234765282417582e-301,5.2297702774725274e-301,5.224775272527472e-301,5.219780267582418e-301,5.214785262637363e-301,5.209790257692308e-301,5.204795252747253e-301,5.199800247802197e-301,5.1948052428571426e-301,5.189810237912089e-301,5.184815232967034e-301,5.179820228021978e-301,5.174825223076923e-301,5.169830218131868e-301,5.164835213186813e-301,5.159840208241759e-301,5.154845203296703e-301,5.149850198351648e-301,5.1448551934065935e-301,5.139860188461539e-301,5.134865183516484e-301,5.129870178571428e-301,5.124875173626374e-301,5.119880168681319e-301,5.114885163736264e-301,5.1098901587912094e-301,5.104895153846153e-301,5.099900148901098e-301,5.094905143956044e-301,5.08991013901099e-301,5.084915134065935e-301,5.079920129120879e-301,5.074925124175824e-301,5.069930119230769e-301,5.064935114285715e-301,5.0599401093406595e-301,5.054945104395605e-301,5.049950099450549e-301,5.0449550945054944e-301,5.03996008956044e-301,5.034965084615385e-301,5.02997007967033e-301,5.024975074725275e-301,5.01998006978022e-301,5.014985064835164e-301,5.0099900598901096e-301,5.004995054945056e-301,5.00000005e-301,4.995005045054945e-301,4.99001004010989e-301,4.985015035164835e-301,4.98002003021978e-301,4.9750250252747255e-301,4.970030020329671e-301,4.965035015384615e-301,4.9600400104395605e-301,4.955045005494506e-301,4.950050000549451e-301,4.945054995604395e-301,4.940059990659341e-301,4.935064985714286e-301,4.930069980769231e-301,4.9250749758241764e-301,4.92007997087912e-301,4.915084965934066e-301,4.910089960989011e-301,4.905094956043957e-301,4.900099951098902e-301,4.8951049461538455e-301,4.890109941208791e-301,4.885114936263737e-301,4.880119931318682e-301,4.8751249263736265e-301,4.870129921428571e-301,4.865134916483516e-301,4.8601399115384614e-301,4.855144906593407e-301,4.850149901648352e-301,4.845154896703297e-301,4.840159891758242e-301,4.835164886813187e-301,4.830169881868132e-301,4.8251748769230766e-301,4.820179871978023e-301,4.815184867032967e-301,4.810189862087912e-301,4.805194857142857e-301,4.800199852197802e-301,4.795204847252747e-301,4.7902098423076925e-301,4.785214837362638e-301,4.780219832417582e-301,4.7752248274725275e-301,4.770229822527473e-301,4.765234817582417e-301,4.760239812637363e-301,4.755244807692308e-301,4.750249802747253e-301,4.745254797802198e-301,4.7402597928571434e-301,4.735264787912087e-301,4.730269782967033e-301,4.725274778021978e-301,4.720279773076924e-301,4.715284768131869e-301,4.7102897631868125e-301,4.705294758241758e-301,4.700299753296704e-301,4.695304748351649e-301,4.690309743406594e-301,4.685314738461538e-301,4.680319733516483e-301,4.6753247285714285e-301,4.6703297236263745e-301,4.665334718681319e-301,4.660339713736263e-301,4.655344708791209e-301,4.650349703846154e-301,4.645354698901099e-301,4.640359693956044e-301,4.635364689010989e-301,4.630369684065934e-301,4.625374679120879e-301,4.620379674175825e-301,4.615384669230769e-301,4.610389664285714e-301,4.6053946593406596e-301,4.600399654395605e-301,4.595404649450549e-301,4.5904096445054945e-301,4.58541463956044e-301,4.580419634615384e-301,4.57542462967033e-301,4.570429624725275e-301,4.56543461978022e-301,4.560439614835165e-301,4.55544460989011e-301,4.550449604945055e-301,4.5454546e-301,4.540459595054945e-301,4.535464590109891e-301,4.530469585164835e-301,4.5254745802197795e-301,4.520479575274725e-301,4.515484570329671e-301,4.510489565384616e-301,4.505494560439561e-301,4.500499555494505e-301,4.49550455054945e-301,4.4905095456043955e-301,4.4855145406593416e-301,4.480519535714287e-301,4.47552453076923e-301,4.470529525824176e-301,4.465534520879121e-301,4.460539515934066e-301,4.4555445109890114e-301,4.450549506043956e-301,4.445554501098901e-301,4.440559496153846e-301,4.435564491208792e-301,4.430569486263736e-301,4.425574481318681e-301,4.4205794763736266e-301,4.415584471428572e-301,4.410589466483517e-301,4.4055944615384615e-301,4.400599456593406e-301,4.395604451648351e-301,4.390609446703297e-301,4.385614441758242e-301,4.380619436813187e-301,4.375624431868132e-301,4.370629426923077e-301,4.365634421978022e-301,4.360639417032967e-301,4.355644412087912e-301,4.350649407142858e-301,4.345654402197802e-301,4.340659397252747e-301,4.335664392307692e-301,4.330669387362638e-301,4.325674382417583e-301,4.3206793774725275e-301,4.315684372527472e-301,4.310689367582417e-301,4.3056943626373625e-301,4.3006993576923086e-301,4.295704352747253e-301,4.2907093478021974e-301,4.285714342857143e-301,4.280719337912088e-301,4.275724332967033e-301,4.270729328021979e-301,4.265734323076923e-301,4.260739318131868e-301,4.255744313186813e-301,4.250749308241759e-301,4.245754303296703e-301,4.240759298351648e-301,4.2357642934065936e-301,4.230769288461539e-301,4.225774283516484e-301,4.2207792785714285e-301,4.215784273626373e-301,4.210789268681319e-301,4.205794263736264e-301,4.2007992587912095e-301,4.195804253846154e-301,4.190809248901098e-301,4.185814243956044e-301,4.180819239010989e-301,4.175824234065934e-301,4.1708292291208794e-301,4.165834224175824e-301,4.160839219230769e-301,4.155844214285714e-301,4.150849209340659e-301,4.145854204395605e-301,4.14085919945055e-301,4.1358641945054946e-301,4.13086918956044e-301,4.125874184615384e-301,4.1208791796703295e-301,4.1158841747252756e-301,4.11088916978022e-301,4.1058941648351644e-301,4.10089915989011e-301,4.095904154945055e-301,4.09090915e-301,4.0859141450549455e-301,4.08091914010989e-301,4.075924135164835e-301,4.07092913021978e-301,4.065934125274726e-301,4.06093912032967e-301,4.055944115384615e-301,4.050949110439561e-301,4.045954105494506e-301,4.040959100549451e-301,4.0359640956043955e-301,4.03096909065934e-301,4.025974085714286e-301,4.020979080769231e-301,4.0159840758241766e-301,4.010989070879121e-301,4.005994065934065e-301,4.000999060989011e-301,3.996004056043957e-301,3.991009051098902e-301,3.9860140461538464e-301,3.981019041208791e-301,3.976024036263736e-301,3.971029031318681e-301,3.966034026373627e-301,3.961039021428572e-301,3.956044016483516e-301,3.9510490115384616e-301,3.946054006593407e-301,3.941059001648351e-301,3.9360639967032965e-301,3.931068991758243e-301,3.926073986813187e-301,3.921078981868132e-301,3.916083976923077e-301,3.911088971978022e-301,3.906093967032967e-301,3.9010989620879125e-301,3.896103957142857e-301,3.891108952197802e-301,3.886113947252747e-301,3.881118942307693e-301,3.876123937362637e-301,3.871128932417582e-301,3.866133927472528e-301,3.861138922527473e-301,3.856143917582418e-301,3.8511489126373625e-301,3.846153907692307e-301,3.841158902747253e-301,3.836163897802198e-301,3.8311688928571436e-301,3.826173887912087e-301,3.8211788829670324e-301,3.8161838780219785e-301,3.811188873076923e-301,3.806193868131868e-301,3.8011988631868134e-301,3.796203858241759e-301,3.791208853296703e-301,3.786213848351648e-301,3.781218843406594e-301,3.776223838461538e-301,3.771228833516484e-301,3.7662338285714286e-301,3.761238823626374e-301,3.756243818681319e-301,3.7512488137362635e-301,3.746253808791209e-301,3.741258803846154e-301,3.736263798901099e-301,3.731268793956044e-301,3.726273789010989e-301,3.7212787840659342e-301,3.716283779120879e-301,3.7112887741758243e-301,3.7062937692307696e-301,3.701298764285714e-301,3.6963037593406597e-301,3.6913087543956045e-301,3.6863137494505494e-301,3.6813187445054946e-301,3.6763237395604395e-301,3.6713287346153847e-301,3.66633372967033e-301,3.661338724725275e-301,3.6563437197802197e-301,3.6513487148351653e-301,3.6463537098901098e-301,3.641358704945055e-301,3.6363637000000003e-301,3.631368695054945e-301,3.6263736901098904e-301,3.621378685164835e-301,3.6163836802197805e-301,3.6113886752747253e-301,3.6063936703296706e-301,3.601398665384616e-301,3.5964036604395602e-301,3.5914086554945055e-301,3.5864136505494508e-301,3.5814186456043956e-301,3.5764236406593404e-301,3.5714286357142857e-301,3.566433630769231e-301,3.5614386258241758e-301,3.556443620879121e-301,3.551448615934066e-301,3.546453610989011e-301,3.541458606043956e-301,3.5364636010989012e-301,3.531468596153846e-301,3.5264735912087913e-301,3.5214785862637366e-301,3.516483581318681e-301,3.5114885763736267e-301,3.506493571428571e-301,3.5014985664835164e-301,3.496503561538462e-301,3.4915085565934065e-301,3.4865135516483517e-301,3.481518546703297e-301,3.476523541758242e-301,3.4715285368131867e-301,3.466533531868132e-301,3.461538526923077e-301,3.456543521978022e-301,3.4515485170329673e-301,3.446553512087912e-301,3.441558507142857e-301,3.4365635021978022e-301,3.4315684972527475e-301,3.4265734923076923e-301,3.4215784873626376e-301,3.416583482417583e-301,3.4115884774725273e-301,3.406593472527473e-301,3.4015984675824173e-301,3.3966034626373626e-301,3.3916084576923083e-301,3.3866134527472527e-301,3.381618447802198e-301,3.3766234428571432e-301,3.371628437912088e-301,3.366633432967033e-301,3.3616384280219777e-301,3.3566434230769234e-301,3.3516484181318683e-301,3.346653413186813e-301,3.3416584082417583e-301,3.336663403296703e-301,3.331668398351648e-301,3.3266733934065937e-301,3.3216783884615385e-301,3.3166833835164834e-301,3.311688378571429e-301,3.3066933736263735e-301,3.3016983686813187e-301,3.2967033637362636e-301,3.291708358791209e-301,3.286713353846154e-301,3.281718348901099e-301,3.276723343956044e-301,3.2717283390109886e-301,3.2667333340659343e-301,3.261738329120879e-301,3.256743324175824e-301,3.2517483192307696e-301,3.2467533142857145e-301,3.2417583093406593e-301,3.2367633043956046e-301,3.2317682994505494e-301,3.2267732945054943e-301,3.22177828956044e-301,3.2167832846153848e-301,3.2117882796703296e-301,3.2067932747252753e-301,3.2017982697802197e-301,3.196803264835165e-301,3.19180825989011e-301,3.186813254945055e-301,3.1818182500000003e-301,3.176823245054945e-301,3.1718282401098904e-301,3.166833235164835e-301,3.1618382302197805e-301,3.1568432252747254e-301,3.15184822032967e-301,3.146853215384616e-301,3.1418582104395607e-301,3.1368632054945056e-301,3.1318682005494504e-301,3.1268731956043957e-301,3.1218781906593405e-301,3.1168831857142858e-301,3.111888180769231e-301,3.106893175824176e-301,3.1018981708791207e-301,3.096903165934066e-301,3.091908160989011e-301,3.0869131560439556e-301,3.0819181510989013e-301,3.0769231461538466e-301,3.071928141208791e-301,3.0669331362637367e-301,3.061938131318681e-301,3.0569431263736263e-301,3.0519481214285716e-301,3.0469531164835164e-301,3.0419581115384617e-301,3.0369631065934065e-301,3.0319681016483518e-301,3.0269730967032966e-301,3.021978091758242e-301,3.0169830868131867e-301,3.011988081868132e-301,3.0069930769230772e-301,3.001998071978022e-301,2.997003067032967e-301,2.992008062087912e-301,2.9870130571428574e-301,2.982018052197802e-301,2.9770230472527475e-301,2.9720280423076928e-301,2.9670330373626372e-301,2.962038032417583e-301,2.9570430274725273e-301,2.9520480225274726e-301,2.947053017582418e-301,2.9420580126373627e-301,2.937063007692308e-301,2.9320680027472528e-301,2.927072997802198e-301,2.922077992857143e-301,2.917082987912088e-301,2.912087982967033e-301,2.9070929780219782e-301,2.902097973076923e-301,2.8971029681318683e-301,2.892107963186813e-301,2.887112958241758e-301,2.8821179532967037e-301,2.877122948351648e-301,2.8721279434065933e-301,2.8671329384615386e-301,2.8621379335164834e-301,2.8571429285714287e-301,2.8521479236263735e-301,2.847152918681319e-301,2.8421579137362636e-301,2.837162908791209e-301,2.832167903846154e-301,2.8271728989010986e-301,2.8221778939560443e-301,2.817182889010989e-301,2.812187884065934e-301,2.807192879120879e-301,2.8021978741758244e-301,2.7972028692307693e-301,2.7922078642857145e-301,2.7872128593406594e-301,2.7822178543956042e-301,2.77722284945055e-301,2.7722278445054943e-301,2.7672328395604396e-301,2.762237834615385e-301,2.7572428296703297e-301,2.752247824725275e-301,2.7472528197802198e-301,2.742257814835165e-301,2.73726280989011e-301,2.732267804945055e-301,2.7272728000000004e-301,2.722277795054945e-301,2.7172827901098905e-301,2.7122877851648353e-301,2.70729278021978e-301,2.7022977752747254e-301,2.6973027703296703e-301,2.6923077653846155e-301,2.6873127604395608e-301,2.6823177554945056e-301,2.6773227505494505e-301,2.6723277456043957e-301,2.6673327406593406e-301,2.662337735714286e-301,2.6573427307692307e-301,2.652347725824176e-301,2.647352720879121e-301,2.6423577159340656e-301,2.6373627109890113e-301,2.6323677060439557e-301,2.627372701098901e-301,2.6223776961538466e-301,2.617382691208791e-301,2.6123876862637363e-301,2.6073926813186816e-301,2.6023976763736264e-301,2.5974026714285712e-301,2.5924076664835165e-301,2.5874126615384617e-301,2.5824176565934066e-301,2.577422651648352e-301,2.5724276467032967e-301,2.567432641758242e-301,2.5624376368131868e-301,2.557442631868132e-301,2.552447626923077e-301,2.547452621978022e-301,2.5424576170329674e-301,2.537462612087912e-301,2.5324676071428575e-301,2.527472602197802e-301,2.522477597252747e-301,2.517482592307693e-301,2.5124875873626373e-301,2.5074925824175825e-301,2.5024975774725278e-301,2.4975025725274726e-301,2.4925075675824175e-301,2.4875125626373627e-301,2.482517557692308e-301,2.477522552747253e-301,2.472527547802198e-301,2.467532542857143e-301,2.4625375379120878e-301,2.457542532967033e-301,2.4525475280219783e-301,2.447552523076923e-301,2.4425575181318684e-301,2.4375625131868136e-301,2.432567508241758e-301,2.4275725032967033e-301,2.422577498351648e-301,2.4175824934065934e-301,2.4125874884615387e-301,2.4075924835164835e-301,2.4025974785714288e-301,2.3976024736263736e-301,2.392607468681319e-301,2.3876124637362637e-301,2.3826174587912085e-301,2.3776224538461542e-301,2.372627448901099e-301,2.367632443956044e-301,2.362637439010989e-301,2.357642434065934e-301,2.352647429120879e-301,2.3476524241758245e-301,2.3426574192307693e-301,2.337662414285714e-301,2.33266740934066e-301,2.3276724043956043e-301,2.3226773994505495e-301,2.3176823945054944e-301,2.3126873895604396e-301,2.307692384615385e-301,2.3026973796703297e-301,2.297702374725275e-301,2.2927073697802194e-301,2.287712364835165e-301,2.28271735989011e-301,2.2777223549450548e-301,2.2727273500000004e-301,2.2677323450549453e-301,2.26273734010989e-301,2.2577423351648354e-301,2.2527473302197802e-301,2.247752325274725e-301,2.2427573203296707e-301,2.2377623153846156e-301,2.2327673104395604e-301,2.2277723054945057e-301,2.2227773005494505e-301,2.2177822956043958e-301,2.2127872906593406e-301,2.207792285714286e-301,2.202797280769231e-301,2.1978022758241756e-301,2.1928072708791212e-301,2.1878122659340657e-301,2.182817260989011e-301,2.177822256043956e-301,2.172827251098901e-301,2.1678322461538463e-301,2.1628372412087915e-301,2.1578422362637364e-301,2.152847231318681e-301,2.1478522263736265e-301,2.1428572214285713e-301,2.1378622164835166e-301,2.132867211538462e-301,2.1278722065934067e-301,2.1228772016483515e-301,2.1178821967032967e-301,2.112887191758242e-301,2.1078921868131864e-301,2.102897181868132e-301,2.0979021769230774e-301,2.0929071719780218e-301,2.0879121670329675e-301,2.082917162087912e-301,2.077922157142857e-301,2.0729271521978024e-301,2.0679321472527472e-301,2.0629371423076925e-301,2.0579421373626373e-301,2.0529471324175826e-301,2.0479521274725274e-301,2.0429571225274727e-301,2.0379621175824175e-301,2.0329671126373628e-301,2.027972107692308e-301,2.022977102747253e-301,2.0179820978021977e-301,2.012987092857143e-301,2.0079920879120882e-301,2.0029970829670327e-301,1.9980020780219783e-301,1.9930070730769236e-301,1.988012068131868e-301,1.9830170631868137e-301,1.978022058241758e-301,1.9730270532967034e-301,1.9680320483516482e-301,1.9630370434065935e-301,1.9580420384615387e-301,1.953047033516483e-301,1.948052028571429e-301,1.9430570236263737e-301,1.9380620186813185e-301,1.9330670137362638e-301,1.928072008791209e-301,1.9230770038461534e-301,1.918081998901099e-301,1.913086993956044e-301,1.9080919890109892e-301,1.903096984065934e-301,1.898101979120879e-301,1.893106974175824e-301,1.8881119692307694e-301,1.8831169642857142e-301,1.8781219593406595e-301,1.8731269543956043e-301,1.8681319494505496e-301,1.8631369445054947e-301,1.8581419395604395e-301,1.8531469346153847e-301,1.8481519296703298e-301,1.8431569247252746e-301,1.8381619197802197e-301,1.8331669148351652e-301,1.82817190989011e-301,1.823176904945055e-301,1.8181819e-301,1.813186895054945e-301,1.8081918901098902e-301,1.8031968851648352e-301,1.7982018802197803e-301,1.7932068752747253e-301,1.7882118703296704e-301,1.7832168653846154e-301,1.7782218604395605e-301,1.7732268554945053e-301,1.7682318505494506e-301,1.7632368456043958e-301,1.7582418406593407e-301,1.7532468357142857e-301,1.748251830769231e-301,1.7432568258241758e-301,1.7382618208791209e-301,1.733266815934066e-301,1.728271810989011e-301,1.7232768060439562e-301,1.7182818010989013e-301,1.7132867961538461e-301,1.7082917912087912e-301,1.7032967862637364e-301,1.6983017813186813e-301,1.6933067763736265e-301,1.6883117714285716e-301,1.6833167664835166e-301,1.6783217615384617e-301,1.6733267565934065e-301,1.6683317516483516e-301,1.6633367467032968e-301,1.6583417417582419e-301,1.653346736813187e-301,1.648351731868132e-301,1.6433567269230768e-301,1.638361721978022e-301,1.633366717032967e-301,1.628371712087912e-301,1.6233767071428572e-301,1.6183817021978025e-301,1.6133866972527473e-301,1.6083916923076923e-301,1.6033966873626374e-301,1.5984016824175824e-301,1.5934066774725275e-301,1.5884116725274727e-301,1.5834166675824176e-301,1.5784216626373626e-301,1.5734266576923079e-301,1.5684316527472527e-301,1.5634366478021978e-301,1.5584416428571426e-301,1.553446637912088e-301,1.5484516329670331e-301,1.543456628021978e-301,1.538461623076923e-301,1.5334666181318683e-301,1.5284716131868131e-301,1.5234766082417582e-301,1.5184816032967034e-301,1.5134865983516485e-301,1.5084915934065935e-301,1.5034965884615386e-301,1.4985015835164834e-301,1.4935065785714285e-301,1.4885115736263737e-301,1.4835165686813188e-301,1.4785215637362638e-301,1.4735265587912089e-301,1.468531553846154e-301,1.463536548901099e-301,1.458541543956044e-301,1.4535465390109889e-301,1.4485515340659343e-301,1.4435565291208792e-301,1.4385615241758242e-301,1.4335665192307693e-301,1.4285715142857143e-301,1.4235765093406594e-301,1.4185815043956044e-301,1.4135864994505495e-301,1.4085914945054945e-301,1.4035964895604398e-301,1.3986014846153846e-301,1.3936064796703297e-301,1.3886114747252747e-301,1.3836164697802197e-301,1.378621464835165e-301,1.37362645989011e-301,1.3686314549450549e-301,1.3636364500000002e-301,1.3586414450549452e-301,1.35364644010989e-301,1.348651435164835e-301,1.3436564302197806e-301,1.3386614252747254e-301,1.3336664203296704e-301,1.3286714153846153e-301,1.3236764104395603e-301,1.3186814054945056e-301,1.3136864005494504e-301,1.3086913956043957e-301,1.3036963906593407e-301,1.2987013857142858e-301,1.2937063807692308e-301,1.2887113758241759e-301,1.2837163708791207e-301,1.278721365934066e-301,1.2737263609890112e-301,1.268731356043956e-301,1.2637363510989011e-301,1.2587413461538464e-301,1.2537463412087912e-301,1.2487513362637363e-301,1.2437563313186813e-301,1.2387613263736262e-301,1.2337663214285716e-301,1.2287713164835167e-301,1.2237763115384615e-301,1.2187813065934066e-301,1.2137863016483516e-301,1.2087912967032967e-301,1.203796291758242e-301,1.1988012868131868e-301,1.193806281868132e-301,1.188811276923077e-301,1.183816271978022e-301,1.178821267032967e-301,1.173826262087912e-301,1.1688312571428573e-301,1.1638362521978023e-301,1.1588412472527474e-301,1.1538462423076922e-301,1.1488512373626375e-301,1.1438562324175825e-301,1.1388612274725273e-301,1.1338662225274724e-301,1.1288712175824179e-301,1.1238762126373627e-301,1.1188812076923077e-301,1.1138862027472528e-301,1.1088911978021978e-301,1.1038961928571429e-301,1.0989011879120877e-301,1.093906182967033e-301,1.088911178021978e-301,1.083916173076923e-301,1.0789211681318681e-301,1.0739261631868132e-301,1.068931158241758e-301,1.0639361532967033e-301,1.0589411483516485e-301,1.0539461434065934e-301,1.0489511384615384e-301,1.0439561335164837e-301,1.0389611285714285e-301,1.0339661236263736e-301,1.0289711186813186e-301,1.0239761137362639e-301,1.018981108791209e-301,1.013986103846154e-301,1.0089910989010988e-301,1.0039960939560439e-301,9.990010890109891e-302,9.94006084065934e-302,9.890110791208792e-302,9.84016074175824e-302,9.790210692307693e-302,9.740260642857144e-302,9.690310593406592e-302,9.640360543956043e-302,9.590410494505495e-302,9.540460445054946e-302,9.490510395604396e-302,9.440560346153847e-302,9.390610296703297e-302,9.340660247252748e-302,9.290710197802198e-302,9.240760148351649e-302,9.190810098901099e-302,9.14086004945055e-302,9.090910000000001e-302,9.04095995054945e-302,8.991009901098901e-302,8.941059851648351e-302,8.891109802197803e-302,8.841159752747252e-302,8.791209703296704e-302,8.741259653846154e-302,8.691309604395605e-302,8.641359554945054e-302,8.591409505494507e-302,8.541459456043956e-302,8.491509406593406e-302,8.441559357142858e-302,8.391609307692308e-302,8.341659258241758e-302,8.291709208791208e-302,8.24175915934066e-302,8.19180910989011e-302,8.14185906043956e-302,8.091909010989011e-302,8.041958961538462e-302,7.992008912087912e-302,7.942058862637363e-302,7.892108813186814e-302,7.842158763736264e-302,7.792208714285714e-302,7.742258664835165e-302,7.692308615384616e-302,7.642358565934065e-302,7.592408516483517e-302,7.542458467032967e-302,7.492508417582418e-302,7.442558368131868e-302,7.392608318681319e-302,7.342658269230769e-302,7.292708219780221e-302,7.24275817032967e-302,7.192808120879122e-302,7.142858071428571e-302,7.092908021978023e-302,7.042957972527472e-302,6.993007923076924e-302,6.943057873626374e-302,6.893107824175824e-302,6.843157774725275e-302,6.793207725274726e-302,6.743257675824176e-302,6.693307626373626e-302,6.643357576923077e-302,6.593407527472528e-302,6.543457478021978e-302,6.493507428571429e-302,6.44355737912088e-302,6.393607329670329e-302,6.34365728021978e-302,6.293707230769231e-302,6.243757181318682e-302,6.193807131868131e-302,6.143857082417584e-302,6.093907032967033e-302,6.043956983516483e-302,5.994006934065933e-302,5.944056884615385e-302,5.894106835164835e-302,5.844156785714285e-302,5.794206736263737e-302,5.744256686813187e-302,5.694306637362637e-302,5.644356587912088e-302,5.594406538461539e-302,5.544456489010989e-302,5.494506439560439e-302,5.444556390109891e-302,5.394606340659341e-302,5.344656291208791e-302,5.294706241758241e-302,5.244756192307693e-302,5.194806142857142e-302,5.144856093406594e-302,5.094906043956044e-302,5.044955994505495e-302,4.995005945054945e-302,4.945055895604396e-302,4.895105846153846e-302,4.845155796703297e-302,4.795205747252747e-302,4.745255697802198e-302,4.695305648351648e-302,4.6453555989010986e-302,4.5954055494505496e-302,4.5454555e-302,4.4955054505494506e-302,4.4455554010989016e-302,4.3956053516483516e-302,4.3456553021978026e-302,4.295705252747253e-302,4.2457552032967036e-302,4.195805153846154e-302,4.1458551043956045e-302,4.0959050549450555e-302,4.0459550054945055e-302,3.996004956043956e-302,3.9460549065934065e-302,3.896104857142857e-302,3.8461548076923075e-302,3.7962047582417585e-302,3.7462547087912084e-302,3.6963046593406594e-302,3.6463546098901104e-302,3.5964045604395604e-302,3.5464545109890114e-302,3.4965044615384614e-302,3.4465544120879124e-302,3.396604362637363e-302,3.3466543131868134e-302,3.2967042637362644e-302,3.246754214285714e-302,3.196804164835165e-302,3.1468541153846153e-302,3.096904065934066e-302,3.0469540164835163e-302,2.997003967032967e-302,2.947053917582418e-302,2.8971038681318683e-302,2.847153818681319e-302,2.797203769230769e-302,2.74725371978022e-302,2.69730367032967e-302,2.647353620879121e-302,2.5974035714285717e-302,2.547453521978022e-302,2.497503472527473e-302,2.4475534230769227e-302,2.3976033736263737e-302,2.347653324175824e-302,2.297703274725275e-302,2.2477532252747251e-302,2.1978031758241756e-302,2.1478531263736264e-302,2.097903076923077e-302,2.0479530274725276e-302,1.998002978021978e-302,1.9480529285714286e-302,1.8981028791208793e-302,1.8481528296703296e-302,1.79820278021978e-302,1.7482527307692305e-302,1.6983026813186815e-302,1.648352631868132e-302,1.5984025824175825e-302,1.548452532967033e-302,1.4985024835164835e-302,1.448552434065934e-302,1.3986023846153845e-302,1.3486523351648352e-302,1.2987022857142857e-302,1.2487522362637364e-302,1.198802186813187e-302,1.1488521373626374e-302,1.0989020879120879e-302,1.0489520384615385e-302,9.99001989010989e-303,9.490519395604396e-303,8.991018901098901e-303,8.491518406593407e-303,7.992017912087912e-303,7.492517417582418e-303,6.993016923076923e-303,6.493516428571428e-303,5.994015934065934e-303,5.494515439560439e-303,4.9950149450549454e-303,4.49551445054945e-303,3.9960139560439565e-303,3.4965134615384614e-303,2.9970129670329675e-303,2.4975124725274724e-303,1.998011978021978e-303,1.4985114835164835e-303,9.990109890109891e-304,4.995104945054945e-304,1.0e-308]}
},{}],79:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var randu = require( '@stdlib/math/base/random/randu' );
var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
var isPositiveZero = require( '@stdlib/math/base/assert/is-positive-zero' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var EPS = require( '@stdlib/math/constants/float64-eps' );
var abs = require( '@stdlib/math/base/special/abs' );
var sinh = require( './../lib' );


// FIXTURES //

var data = require( './fixtures/julia/data.json' );
var largeNegative = require( './fixtures/julia/large_negative.json' );
var largePositive = require( './fixtures/julia/large_positive.json' );
var tinyNegative = require( './fixtures/julia/tiny_negative.json' );
var tinyPositive = require( './fixtures/julia/tiny_positive.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof sinh, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function computes the hyperbolic sine', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = data.x;
	expected = data.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = sinh( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. Expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. Value: '+y+'. Expected: '+expected[i]+'. Tolerance: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic sine (large negative)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = largeNegative.x;
	expected = largeNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = sinh( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. Expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. Value: '+y+'. Expected: '+expected[i]+'. Tolerance: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic sine (large positive)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = largePositive.x;
	expected = largePositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = sinh( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. Expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. Value: '+y+'. Expected: '+expected[i]+'. Tolerance: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic sine (tiny negative)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = tinyNegative.x;
	expected = tinyNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = sinh( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. Expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. Value: '+y+'. Expected: '+expected[i]+'. Tolerance: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic sine (tiny positive)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = tinyPositive.x;
	expected = tinyPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = sinh( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. Expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. Value: '+y+'. Expected: '+expected[i]+'. Tolerance: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function returns `NaN` if provided a `NaN`', function test( t ) {
	var v = sinh( NaN );
	t.equal( isnan( v ), true, 'returns NaN' );
	t.end();
});

tape( 'the function returns `-0` if provided `-0`', function test( t ) {
	var v = sinh( -0.0 );
	t.equal( isNegativeZero( v ), true, 'returns -0' );
	t.end();
});

tape( 'the function returns `0` if provided `0`', function test( t ) {
	var v = sinh( 0.0 );
	t.equal( isPositiveZero( v ), true, 'returns 0' );
	t.end();
});

tape( 'the function returns `+infinity` if provided `+infinity`', function test( t ) {
	var v = sinh( PINF );
	t.equal( v, PINF, 'returns +infinity' );
	t.end();
});

tape( 'the function returns `-infinity` if provided `-infinity`', function test( t ) {
	var v = sinh( NINF );
	t.equal( v, NINF, 'returns -infinity' );
	t.end();
});

tape( 'the function returns `+infinity` if provided a value greater than `~710.476`', function test( t ) {
	var y;
	var v;
	var i;

	for ( i = 0; i < 500; i++ ) {
		v = randu()*1e6 + 710.476;
		y = sinh( v );
		t.equal( y, PINF, 'returns +infinity' );
	}
	t.end();
});

tape( 'the function returns `-infinity` if provided a value less than `~-709.0896`', function test( t ) {
	var y;
	var v;
	var i;

	for ( i = 0; i < 500; i++ ) {
		v = -randu()*1e6 - 709.0896;
		y = sinh( v );
		t.equal( y, NINF, 'returns -infinity' );
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/special/sinh/test/test.js")
},{"./../lib":72,"./fixtures/julia/data.json":74,"./fixtures/julia/large_negative.json":75,"./fixtures/julia/large_positive.json":76,"./fixtures/julia/tiny_negative.json":77,"./fixtures/julia/tiny_positive.json":78,"@stdlib/math/base/assert/is-nan":39,"@stdlib/math/base/assert/is-negative-zero":41,"@stdlib/math/base/assert/is-positive-zero":43,"@stdlib/math/base/random/randu":56,"@stdlib/math/base/special/abs":60,"@stdlib/math/constants/float64-eps":101,"@stdlib/math/constants/float64-ninf":108,"@stdlib/math/constants/float64-pinf":109,"tape":197}],80:[function(require,module,exports){
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

},{"./trunc.js":81}],81:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ceil":62,"@stdlib/math/base/special/floor":69}],82:[function(require,module,exports){
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

},{}],83:[function(require,module,exports){
'use strict';

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
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{}],84:[function(require,module,exports){
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

},{"./evalpoly.js":82,"./factory.js":83,"@stdlib/utils/define-read-only-property":116}],85:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":60}],86:[function(require,module,exports){
/* jshint evil:true */
'use strict';

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
	return ( new Function( f ) )();

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
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{}],87:[function(require,module,exports){
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

},{"./evalrational.js":85,"./factory.js":86,"@stdlib/utils/define-read-only-property":116}],88:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":95,"@stdlib/math/constants/float64-exponent-bias":102,"@stdlib/math/constants/float64-high-word-exponent-mask":103}],89:[function(require,module,exports){
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

},{"./exponent.js":88}],90:[function(require,module,exports){
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

},{"./indices.js":92}],91:[function(require,module,exports){
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

},{"./from_words.js":90}],92:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":15}],93:[function(require,module,exports){
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

},{"./high.js":94}],94:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":15}],95:[function(require,module,exports){
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

},{"./get_high_word.js":93}],96:[function(require,module,exports){
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

},{"./normalize.js":97}],97:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":35,"@stdlib/math/base/assert/is-nan":39,"@stdlib/math/base/special/abs":60,"@stdlib/math/constants/float64-smallest-normal":110}],98:[function(require,module,exports){
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

},{"./to_words.js":100}],99:[function(require,module,exports){
arguments[4][92][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":15,"dup":92}],100:[function(require,module,exports){
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

},{"./indices.js":99}],101:[function(require,module,exports){
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

},{}],102:[function(require,module,exports){
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

},{}],103:[function(require,module,exports){
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

},{}],104:[function(require,module,exports){
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

},{}],105:[function(require,module,exports){
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

},{}],106:[function(require,module,exports){
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

},{}],107:[function(require,module,exports){
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

},{}],108:[function(require,module,exports){
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

},{}],109:[function(require,module,exports){
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

},{}],110:[function(require,module,exports){
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

},{}],111:[function(require,module,exports){
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

},{}],112:[function(require,module,exports){
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

},{}],113:[function(require,module,exports){
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

},{"@stdlib/assert/is-buffer":5,"@stdlib/regexp/function-name":112,"@stdlib/utils/native-class":127}],114:[function(require,module,exports){
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

},{"./constructor_name.js":113}],115:[function(require,module,exports){
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

},{}],116:[function(require,module,exports){
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

},{"./define_read_only_property.js":115}],117:[function(require,module,exports){
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

},{}],118:[function(require,module,exports){
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

},{"./detect_symbol_support.js":117}],119:[function(require,module,exports){
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

},{"@stdlib/utils/detect-symbol-support":118}],120:[function(require,module,exports){
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

},{"./has_tostringtag_support.js":119}],121:[function(require,module,exports){
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

},{"./native.js":124,"./polyfill.js":125,"@stdlib/assert/is-function":7}],122:[function(require,module,exports){
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

},{"./detect.js":121}],123:[function(require,module,exports){
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

},{"./get_prototype_of.js":122}],124:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = Object.getPrototypeOf;

},{}],125:[function(require,module,exports){
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

},{"./proto.js":126,"@stdlib/utils/native-class":127}],126:[function(require,module,exports){
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

},{}],127:[function(require,module,exports){
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

},{"./native_class.js":128,"./polyfill.js":129,"@stdlib/utils/detect-tostringtag-support":120}],128:[function(require,module,exports){
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

},{"./tostring.js":130}],129:[function(require,module,exports){
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

},{"./tostring.js":130,"./tostringtag.js":131,"@stdlib/assert/has-own-property":2}],130:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = Object.prototype.toString; // eslint-disable-line no-redeclare

},{}],131:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';

},{}],132:[function(require,module,exports){
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

},{"./fixtures/nodelist.js":133,"./fixtures/re.js":134,"./fixtures/typedarray.js":135}],133:[function(require,module,exports){
'use strict';

// MODULES //

var root = require( 'system.global' )(); // eslint-disable-line no-redeclare


// MAIN //

var nodeList = root.document && root.document.childNodes;


// EXPORTS //

module.exports = nodeList;

},{"system.global":194}],134:[function(require,module,exports){
'use strict';

var RE = /./;


// EXPORTS //

module.exports = RE;

},{}],135:[function(require,module,exports){
'use strict';

var typedarray = Int8Array;


// EXPORTS //

module.exports = typedarray;

},{}],136:[function(require,module,exports){
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

},{"./check.js":132,"./polyfill.js":137,"./typeof.js":138}],137:[function(require,module,exports){
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

},{"@stdlib/utils/constructor-name":114}],138:[function(require,module,exports){
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

},{"@stdlib/utils/constructor-name":114}],139:[function(require,module,exports){
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

},{}],140:[function(require,module,exports){

},{}],141:[function(require,module,exports){
arguments[4][140][0].apply(exports,arguments)
},{"dup":140}],142:[function(require,module,exports){
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

},{}],143:[function(require,module,exports){
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

},{"base64-js":139,"ieee754":162}],144:[function(require,module,exports){
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
},{"../../is-buffer/index.js":164}],145:[function(require,module,exports){
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

},{"./lib/is_arguments.js":146,"./lib/keys.js":147}],146:[function(require,module,exports){
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

},{}],147:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],148:[function(require,module,exports){
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

},{"foreach":158,"object-keys":167}],149:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],150:[function(require,module,exports){
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

},{"./helpers/isFinite":151,"./helpers/isNaN":152,"./helpers/mod":153,"./helpers/sign":154,"es-to-primitive/es5":155,"is-callable":165}],151:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],152:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],153:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],154:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],155:[function(require,module,exports){
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

},{"./helpers/isPrimitive":156,"is-callable":165}],156:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],157:[function(require,module,exports){
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

},{}],158:[function(require,module,exports){

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


},{}],159:[function(require,module,exports){
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

},{}],160:[function(require,module,exports){
var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":159}],161:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":160}],162:[function(require,module,exports){
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

},{}],163:[function(require,module,exports){
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

},{}],164:[function(require,module,exports){
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

},{}],165:[function(require,module,exports){
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

},{}],166:[function(require,module,exports){
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

},{}],167:[function(require,module,exports){
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

},{"./isArguments":168}],168:[function(require,module,exports){
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

},{}],169:[function(require,module,exports){
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
},{"_process":142}],170:[function(require,module,exports){
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
},{"_process":142}],171:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":172}],172:[function(require,module,exports){
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
},{"./_stream_readable":174,"./_stream_writable":176,"core-util-is":144,"inherits":163,"process-nextick-args":170}],173:[function(require,module,exports){
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
},{"./_stream_transform":175,"core-util-is":144,"inherits":163}],174:[function(require,module,exports){
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
},{"./_stream_duplex":172,"./internal/streams/BufferList":177,"./internal/streams/destroy":178,"./internal/streams/stream":179,"_process":142,"core-util-is":144,"events":157,"inherits":163,"isarray":180,"process-nextick-args":170,"safe-buffer":187,"string_decoder/":181,"util":140}],175:[function(require,module,exports){
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
},{"./_stream_duplex":172,"core-util-is":144,"inherits":163}],176:[function(require,module,exports){
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
},{"./_stream_duplex":172,"./internal/streams/destroy":178,"./internal/streams/stream":179,"_process":142,"core-util-is":144,"inherits":163,"process-nextick-args":170,"safe-buffer":187,"util-deprecate":203}],177:[function(require,module,exports){
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
},{"safe-buffer":187}],178:[function(require,module,exports){
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
},{"process-nextick-args":170}],179:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":157}],180:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],181:[function(require,module,exports){
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
},{"safe-buffer":187}],182:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":183}],183:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":172,"./lib/_stream_passthrough.js":173,"./lib/_stream_readable.js":174,"./lib/_stream_transform.js":175,"./lib/_stream_writable.js":176}],184:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":183}],185:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":176}],186:[function(require,module,exports){
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
},{"_process":142,"through":202}],187:[function(require,module,exports){
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

},{"buffer":143}],188:[function(require,module,exports){
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

},{"events":157,"inherits":163,"readable-stream/duplex.js":171,"readable-stream/passthrough.js":182,"readable-stream/readable.js":183,"readable-stream/transform.js":184,"readable-stream/writable.js":185}],189:[function(require,module,exports){
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

},{"es-abstract/es5":150,"function-bind":160}],190:[function(require,module,exports){
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

},{"./implementation":189,"./polyfill":191,"./shim":192,"define-properties":148,"function-bind":160}],191:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":189}],192:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":191,"define-properties":148}],193:[function(require,module,exports){
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
},{}],194:[function(require,module,exports){
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

},{"./implementation":193,"./polyfill":195,"./shim":196,"define-properties":148}],195:[function(require,module,exports){
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
},{"./implementation":193}],196:[function(require,module,exports){
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
},{"./polyfill":195,"define-properties":148}],197:[function(require,module,exports){
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
},{"./lib/default_stream":198,"./lib/results":200,"./lib/test":201,"_process":142,"defined":149,"through":202}],198:[function(require,module,exports){
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
},{"_process":142,"fs":141,"through":202}],199:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":142}],200:[function(require,module,exports){
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
},{"_process":142,"events":157,"function-bind":160,"has":161,"inherits":163,"object-inspect":166,"resumer":186,"through":202}],201:[function(require,module,exports){
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
},{"./next_tick":199,"deep-equal":145,"defined":149,"events":157,"has":161,"inherits":163,"path":169,"string.prototype.trim":190}],202:[function(require,module,exports){
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
},{"_process":142,"stream":188}],203:[function(require,module,exports){
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
},{}]},{},[79]);
