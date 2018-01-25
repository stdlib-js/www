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

// MAIN //

var ctor = ( typeof Float64Array === 'function' ) ? Float64Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{}],2:[function(require,module,exports){
'use strict';

/**
* Typed array constructor which returns a typed array representing an array of double-precision floating-point numbers in the platform byte order.
*
* @module @stdlib/array/float64
*
* @example
* var ctor = require( '@stdlib/array/float64' );
*
* var arr = new ctor( 10 );
* // returns <Float64Array>
*/

// MODULES //

var hasFloat64ArraySupport = require( '@stdlib/utils/detect-float64array-support' );
var builtin = require( './float64array.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var ctor;
if ( hasFloat64ArraySupport() ) {
	ctor = builtin;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;

},{"./float64array.js":1,"./polyfill.js":3,"@stdlib/utils/detect-float64array-support":112}],3:[function(require,module,exports){
'use strict';

// TODO: write polyfill

// MAIN //

/**
* Typed array which represents an array of double-precision floating-point numbers in the platform byte order.
*
* @throws {Error} not implemented
*/
function polyfill() {
	throw new Error( 'not implemented' );
}


// EXPORTS //

module.exports = polyfill;

},{}],4:[function(require,module,exports){
'use strict';

/**
* Typed array constructor which returns a typed array representing an array of 16-bit unsigned integers in the platform byte order.
*
* @module @stdlib/array/uint16
*
* @example
* var ctor = require( '@stdlib/array/uint16' );
*
* var arr = new ctor( 10 );
* // returns <Uint16Array>
*/

// MODULES //

var hasUint16ArraySupport = require( '@stdlib/utils/detect-uint16array-support' );
var builtin = require( './uint16array.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var ctor;
if ( hasUint16ArraySupport() ) {
	ctor = builtin;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;

},{"./polyfill.js":5,"./uint16array.js":6,"@stdlib/utils/detect-uint16array-support":118}],5:[function(require,module,exports){
'use strict';

// TODO: write polyfill

// MAIN //

/**
* Typed array which represents an array of 16-bit unsigned integers in the platform byte order.
*
* @throws {Error} not implemented
*/
function polyfill() {
	throw new Error( 'not implemented' );
}


// EXPORTS //

module.exports = polyfill;

},{}],6:[function(require,module,exports){
'use strict';

// MAIN //

var ctor = ( typeof Uint16Array === 'function' ) ? Uint16Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{}],7:[function(require,module,exports){
'use strict';

/**
* Typed array constructor which returns a typed array representing an array of 32-bit unsigned integers in the platform byte order.
*
* @module @stdlib/array/uint32
*
* @example
* var ctor = require( '@stdlib/array/uint32' );
*
* var arr = new ctor( 10 );
* // returns <Uint32Array>
*/

// MODULES //

var hasUint32ArraySupport = require( '@stdlib/utils/detect-uint32array-support' );
var builtin = require( './uint32array.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var ctor;
if ( hasUint32ArraySupport() ) {
	ctor = builtin;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;

},{"./polyfill.js":8,"./uint32array.js":9,"@stdlib/utils/detect-uint32array-support":121}],8:[function(require,module,exports){
'use strict';

// TODO: write polyfill

// MAIN //

/**
* Typed array which represents an array of 32-bit unsigned integers in the platform byte order.
*
* @throws {Error} not implemented
*/
function polyfill() {
	throw new Error( 'not implemented' );
}


// EXPORTS //

module.exports = polyfill;

},{}],9:[function(require,module,exports){
'use strict';

// MAIN //

var ctor = ( typeof Uint32Array === 'function' ) ? Uint32Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{}],10:[function(require,module,exports){
'use strict';

/**
* Typed array constructor which returns a typed array representing an array of 8-bit unsigned integers in the platform byte order.
*
* @module @stdlib/array/uint8
*
* @example
* var ctor = require( '@stdlib/array/uint8' );
*
* var arr = new ctor( 10 );
* // returns <Uint8Array>
*/

// MODULES //

var hasUint8ArraySupport = require( '@stdlib/utils/detect-uint8array-support' );
var builtin = require( './uint8array.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var ctor;
if ( hasUint8ArraySupport() ) {
	ctor = builtin;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;

},{"./polyfill.js":11,"./uint8array.js":12,"@stdlib/utils/detect-uint8array-support":124}],11:[function(require,module,exports){
'use strict';

// TODO: write polyfill

// MAIN //

/**
* Typed array which represents an array of 8-bit unsigned integers in the platform byte order.
*
* @throws {Error} not implemented
*/
function polyfill() {
	throw new Error( 'not implemented' );
}


// EXPORTS //

module.exports = polyfill;

},{}],12:[function(require,module,exports){
'use strict';

// MAIN //

var ctor = ( typeof Uint8Array === 'function' ) ? Uint8Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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

},{"./has_own_property.js":13}],15:[function(require,module,exports){
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

},{"./is_array.js":16}],16:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":132}],17:[function(require,module,exports){
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

},{"./is_buffer.js":18}],18:[function(require,module,exports){
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

},{"@stdlib/assert/is-object-like":37}],19:[function(require,module,exports){
'use strict';

/**
* Test if a value is a Float64Array.
*
* @module @stdlib/assert/is-float64array
*
* @example
* var isFloat64Array = require( '@stdlib/assert/is-float64array' );
*
* var bool = isFloat64Array( new Float64Array( 10 ) );
* // returns true
*
* bool = isFloat64Array( [] );
* // returns false
*/

// MODULES //

var isFloat64Array = require( './is_float64array.js' );


// EXPORTS //

module.exports = isFloat64Array;

},{"./is_float64array.js":20}],20:[function(require,module,exports){
'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );


// MAIN //

/**
* Tests if a value is a Float64Array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a Float64Array
*
* @example
* var bool = isFloat64Array( new Float64Array( 10 ) );
* // returns true
*
* @example
* var bool = isFloat64Array( [] );
* // returns false
*/
function isFloat64Array( value ) {
	return ( nativeClass( value ) === '[object Float64Array]' );
}


// EXPORTS //

module.exports = isFloat64Array;

},{"@stdlib/utils/native-class":132}],21:[function(require,module,exports){
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
}


// EXPORTS //

module.exports = isFunction;

},{"@stdlib/utils/type-of":141}],23:[function(require,module,exports){
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

},{"./generic.js":23,"./object.js":26,"./primitive.js":27,"@stdlib/utils/define-read-only-property":109}],25:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-ninf":57,"@stdlib/constants/math/float64-pinf":58,"@stdlib/math/base/assert/is-integer":63}],26:[function(require,module,exports){
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

},{"./integer.js":25,"@stdlib/assert/is-number":32}],27:[function(require,module,exports){
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

},{"./integer.js":25,"@stdlib/assert/is-number":32}],28:[function(require,module,exports){
'use strict';

// MODULES //

var Uint8Array = require( '@stdlib/array/uint8' );
var Uint16Array = require( '@stdlib/array/uint16' );


// MAIN //

var ctors = {
	'uint16': Uint16Array,
	'uint8': Uint8Array
};


// EXPORTS //

module.exports = ctors;

},{"@stdlib/array/uint16":4,"@stdlib/array/uint8":10}],29:[function(require,module,exports){
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

},{"./is_little_endian.js":30}],30:[function(require,module,exports){
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

	/*
	* Set the uint16 view to a value having distinguishable lower and higher order words.
	* 4660 => 0x1234 => 0x12 0x34 => '00010010 00110100' => (0x12,0x34) == (18,52)
	*/
	uint16view[ 0 ] = 0x1234;

	// Create a uint8 view on top of the uint16 buffer:
	uint8view = new ctors[ 'uint8' ]( uint16view.buffer );

	// If little endian, the least significant byte will be first...
	return ( uint8view[ 0 ] === 0x34 );
}


// EXPORTS //

module.exports = isLittleEndian();

},{"./ctors.js":28}],31:[function(require,module,exports){
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

},{"./object.js":33,"./primitive.js":34}],32:[function(require,module,exports){
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

},{"./generic.js":31,"./object.js":33,"./primitive.js":34,"@stdlib/utils/define-read-only-property":109}],33:[function(require,module,exports){
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

},{"./try2serialize.js":36,"@stdlib/utils/detect-tostringtag-support":116,"@stdlib/utils/native-class":132}],34:[function(require,module,exports){
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

},{}],35:[function(require,module,exports){
'use strict';

// eslint-disable-next-line stdlib/no-redeclare
var toString = Number.prototype.toString; // non-generic


// EXPORTS //

module.exports = toString;

},{}],36:[function(require,module,exports){
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

},{"./tostring.js":35}],37:[function(require,module,exports){
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

},{"./is_object_like.js":38,"@stdlib/assert/tools/array-function":54,"@stdlib/utils/define-read-only-property":109}],38:[function(require,module,exports){
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

},{}],39:[function(require,module,exports){
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

},{"./is_object.js":40}],40:[function(require,module,exports){
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

},{"@stdlib/assert/is-array":15}],41:[function(require,module,exports){
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

},{"./is_plain_object.js":42}],42:[function(require,module,exports){
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

},{"@stdlib/assert/has-own-property":14,"@stdlib/assert/is-function":21,"@stdlib/assert/is-object":39,"@stdlib/utils/get-prototype-of":128,"@stdlib/utils/native-class":132}],43:[function(require,module,exports){
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

},{"./object.js":45,"./primitive.js":46}],44:[function(require,module,exports){
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

},{"./generic.js":43,"./object.js":45,"./primitive.js":46,"@stdlib/utils/define-read-only-property":109}],45:[function(require,module,exports){
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

},{"@stdlib/assert/is-integer":24}],46:[function(require,module,exports){
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

},{"@stdlib/assert/is-integer":24}],47:[function(require,module,exports){
'use strict';

/**
* Test if a value is a Uint16Array.
*
* @module @stdlib/assert/is-uint16array
*
* @example
* var isUint16Array = require( '@stdlib/assert/is-uint16array' );
*
* var bool = isUint16Array( new Uint16Array( 10 ) );
* // returns true
*
* bool = isUint16Array( [] );
* // returns false
*/

// MODULES //

var isUint16Array = require( './is_uint16array.js' );


// EXPORTS //

module.exports = isUint16Array;

},{"./is_uint16array.js":48}],48:[function(require,module,exports){
'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );


// MAIN //

/**
* Tests if a value is a Uint16Array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a Uint16Array
*
* @example
* var bool = isUint16Array( new Uint16Array( 10 ) );
* // returns true
*
* @example
* var bool = isUint16Array( [] );
* // returns false
*/
function isUint16Array( value ) {
	return ( nativeClass( value ) === '[object Uint16Array]' );
}


// EXPORTS //

module.exports = isUint16Array;

},{"@stdlib/utils/native-class":132}],49:[function(require,module,exports){
'use strict';

/**
* Test if a value is a Uint32Array.
*
* @module @stdlib/assert/is-uint32array
*
* @example
* var isUint32Array = require( '@stdlib/assert/is-uint32array' );
*
* var bool = isUint32Array( new Uint32Array( 10 ) );
* // returns true
*
* bool = isUint32Array( [] );
* // returns false
*/

// MODULES //

var isUint32Array = require( './is_uint32array.js' );


// EXPORTS //

module.exports = isUint32Array;

},{"./is_uint32array.js":50}],50:[function(require,module,exports){
'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );


// MAIN //

/**
* Tests if a value is a Uint32Array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a Uint32Array
*
* @example
* var bool = isUint32Array( new Uint32Array( 10 ) );
* // returns true
*
* @example
* var bool = isUint32Array( [] );
* // returns false
*/
function isUint32Array( value ) {
	return ( nativeClass( value ) === '[object Uint32Array]' );
}


// EXPORTS //

module.exports = isUint32Array;

},{"@stdlib/utils/native-class":132}],51:[function(require,module,exports){
'use strict';

/**
* Test if a value is a Uint8Array.
*
* @module @stdlib/assert/is-uint8array
*
* @example
* var isUint8Array = require( '@stdlib/assert/is-uint8array' );
*
* var bool = isUint8Array( new Uint8Array( 10 ) );
* // returns true
*
* bool = isUint8Array( [] );
* // returns false
*/

// MODULES //

var isUint8Array = require( './is_uint8array.js' );


// EXPORTS //

module.exports = isUint8Array;

},{"./is_uint8array.js":52}],52:[function(require,module,exports){
'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );


// MAIN //

/**
* Tests if a value is a Uint8Array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a Uint8Array
*
* @example
* var bool = isUint8Array( new Uint8Array( 10 ) );
* // returns true
*
* @example
* var bool = isUint8Array( [] );
* // returns false
*/
function isUint8Array( value ) {
	return ( nativeClass( value ) === '[object Uint8Array]' );
}


// EXPORTS //

module.exports = isUint8Array;

},{"@stdlib/utils/native-class":132}],53:[function(require,module,exports){
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

},{"@stdlib/assert/is-array":15}],54:[function(require,module,exports){
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

},{"./arrayfcn.js":53}],55:[function(require,module,exports){
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

},{}],56:[function(require,module,exports){
'use strict';

/**
* The bias of a double-precision floating-point number's exponent.
*
* @module @stdlib/constants/math/float64-exponent-bias
* @type {integer32}
*
* @example
* var FLOAT64_EXPONENT_BIAS = require( '@stdlib/constants/math/float64-exponent-bias' );
* // returns 1023
*/


// MAIN //

/**
* Bias of a double-precision floating-point number's exponent.
*
* ## Notes
*
* The bias can be computed via
*
* ```tex
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

},{}],57:[function(require,module,exports){
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

},{}],58:[function(require,module,exports){
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

},{}],59:[function(require,module,exports){
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

},{}],60:[function(require,module,exports){
'use strict';

/**
* Maximum unsigned 16-bit integer.
*
* @module @stdlib/constants/math/uint16-max
* @type {integer32}
*
* @example
* var UINT16_MAX = require( '@stdlib/constants/math/uint16-max' );
* // returns 65535
*/


// MAIN //

/**
* Maximum unsigned 16-bit integer.
*
* ## Notes
*
* The number has the value
*
* ```tex
* 2^{16} - 1
* ```
*
* which corresponds to the bit sequence
*
* ```binarystring
* 1111111111111111
* ```
*
* @constant
* @type {integer32}
* @default 65535
*/
var UINT16_MAX = 65535|0; // asm type annotation


// EXPORTS //

module.exports = UINT16_MAX;

},{}],61:[function(require,module,exports){
'use strict';

/**
* Maximum unsigned 32-bit integer.
*
* @module @stdlib/constants/math/uint32-max
* @type {uinteger32}
*
* @example
* var UINT32_MAX = require( '@stdlib/constants/math/uint32-max' );
* // returns 4294967295
*/


// MAIN //

/**
* Maximum unsigned 32-bit integer.
*
* ## Notes
*
* The number has the value
*
* ```tex
* 2^{32} - 1
* ```
*
* which corresponds to the bit sequence
*
* ```binarystring
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

},{}],62:[function(require,module,exports){
'use strict';

/**
* Maximum unsigned 8-bit integer.
*
* @module @stdlib/constants/math/uint8-max
* @type {integer32}
*
* @example
* var UINT8_MAX = require( '@stdlib/constants/math/uint8-max' );
* // returns 255
*/


// MAIN //

/**
* Maximum unsigned 8-bit integer.
*
* ## Notes
*
* The number has the value
*
* ```tex
* 2^{8} - 1
* ```
*
* which corresponds to the bit sequence
*
* ```binarystring
* 11111111
* ```
*
* @constant
* @type {integer32}
* @default 255
*/
var UINT8_MAX = 255|0; // asm type annotation


// EXPORTS //

module.exports = UINT8_MAX;

},{}],63:[function(require,module,exports){
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

},{"./is_integer.js":64}],64:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":81}],65:[function(require,module,exports){
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

},{"./is_nan.js":66}],66:[function(require,module,exports){
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

},{}],67:[function(require,module,exports){
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

},{"./is_negative_zero.js":68}],68:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-ninf":57}],69:[function(require,module,exports){
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

},{"./is_positive_zero.js":70}],70:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-pinf":58}],71:[function(require,module,exports){
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

},{}],72:[function(require,module,exports){
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

},{"./abs.js":71}],73:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_atanh.c?view=markup}.
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
var log1p = require( '@stdlib/math/base/special/log1p' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );


// VARIABLES //

var NEAR_ZERO = 1.0 / (1 << 28); // 2**-28


// MAIN //

/**
* Computes the hyperbolic arctangent of a number.
*
* ## Method
*
* 1.  Reduce \\( x \\) to positive by \\( \operatorname{atanh}(-x) = -\operatorname{atanh}(x) \\)
*
* 2.  For \\( x \ge 0.5 \\), we calculate
*
*     ```tex
*     \operatorname{atanh}(x) = \frac{1}{2} \cdot \log\left( 1 + \tfrac{2x}{1-x} \right) = \frac{1}{2} \cdot \operatorname{log1p}\left( 2 \tfrac{x}{1-x} \right)
*     ```
*
*     For \\( x < 0.5 \\), we have
*
*     ```tex
*     \operatorname{atanh}(x) = \frac{1}{2} \cdot \operatorname{log1p}\left( 2x + \tfrac{2x^2}{1-x} \right)
*     ```
*
* ## Special Cases
*
* ```tex
* \begin{align*}
* \operatorname{atanh}(\mathrm{NaN}) &= \mathrm{NaN}\\
* \operatorname{atanh}(1.0) &= \infty \\
* \operatorname{atanh}(-1.0) &= -\infty \\
* \end{align*}
* ```
*
* @param {number} x - input value
* @returns {number} hyperbolic arctangent (in radians)
*
* @example
* var v = atanh( 0.0 );
* // returns 0.0
*
* @example
* var v = atanh( 0.9 );
* // returns ~1.472
*
* @example
* var v = atanh( 1.0 );
* // returns Infinity
*
* @example
* var v = atanh( -1.0 );
* // returns -Infinity
*
* @example
* var v = atanh( NaN );
* // returns NaN
*/
function atanh( x ) {
	var sgn;
	var t;
	if ( isnan( x ) ) {
		return NaN;
	}
	if ( x < -1.0 || x > 1.0 ) {
		return NaN;
	}
	if ( x === 1.0 ) {
		return PINF;
	}
	if ( x === -1.0 ) {
		return NINF;
	}
	if ( x < 0.0 ) {
		sgn = true;
		x = -x;
	}
	// Case: |x| < 2**-28
	if ( x < NEAR_ZERO ) {
		return ( sgn ) ? -x : x;
	}
	if ( x < 0.5 ) {
		t = x + x;
		t = 0.5 * log1p( t + ( t*x/(1-x) ) );
	} else {
		t = 0.5 * log1p( (x+x) / (1-x) );
	}
	return ( sgn ) ? -t : t;
}


// EXPORTS //

module.exports = atanh;

},{"@stdlib/constants/math/float64-ninf":57,"@stdlib/constants/math/float64-pinf":58,"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/special/log1p":82}],74:[function(require,module,exports){
'use strict';

/**
* Compute the hyperbolic arctangent of a number.
*
* @module @stdlib/math/base/special/atanh
*
* @example
* var atanh = require( '@stdlib/math/base/special/atanh' );
*
* var v = atanh( 0.0 );
* // returns 0.0
*
* v = atanh( 0.9 );
* // returns ~1.472
*
* v = atanh( 1.0 );
* // returns Infinity
*
* v = atanh( -1.0 );
* // returns -Infinity
*
* v = atanh( NaN );
* // returns NaN
*/

// MODULES //

var atanh = require( './atanh.js' );


// EXPORTS //

module.exports = atanh;

},{"./atanh.js":73}],75:[function(require,module,exports){
module.exports={"expected":[-2.6466524123622457,-2.622394778825618,-2.599248515632915,-2.5771157480768716,-2.5559109868960577,-2.535559122844817,-2.5159938114158242,-2.4971561600321643,-2.4789936521885223,-2.4614592590041124,-2.444510700326696,-2.428109826160563,-2.41222209564549,-2.396816135688824,-2.381863365070408,-2.3673376727006943,-2.3532151409317197,-2.339473806556352,-2.3260934534985425,-2.3130554322819443,-2.300342502230495,-2.2879386930503176,-2.275829183004757,-2.264000191351382,-2.2524388830831064,-2.2411332843222187,-2.2300722069689156,-2.2192451814155754,-2.2086423963123685,-2.198254644515678,-2.1880732744730174,-2.178090146401219,-2.16829759270173,-2.158688382130679,-2.149255687304311,-2.1399930551739774,-2.1308943801508775,-2.121953879600218,-2.113166071458426,-2.10452575375649,-2.0960279858578623,-2.0876680712415085,-2.0794415416798357,-2.071344142678094,-2.063371820056414,-2.05552070756856,-2.04778711546274,-2.0401675198997222,-2.032658553152333,-2.0252569945180707,-2.0179597618834793,-2.010763903884979,-2.0036665926162356,-1.9966651168369944,-1.9897568756425414,-1.9829393725568178,-1.9762102100155925,-1.9695670842092095,-1.9630077802571364,-1.95653016768902,-1.950132196209193,-1.9438118917235356,-1.9375673526094583,-1.9313967462113486,-1.925298305545336,-1.919270326198533,-1.91331116340916,-1.9074192293150234,-1.9015929903588356,-1.8958309648397753,-1.89013172060149,-1.88449387284754,-1.8789160820759292,-1.8733970521250234,-1.8679355283237267,-1.862530295739298,-1.8571801775167085,-1.8518840333038429,-1.8466407577572868,-1.8414492791237838,-1.8363085578928344,-1.8312175855161765,-1.8261753831902146,-1.8211810006977185,-1.8162335153053546,-1.8113320307138654,-1.8064756760578964,-1.8016636049526848,-1.7968949945850035,-1.7921690448459013,-1.7874849775029793,-1.7828420354100374,-1.7782394817521017,-1.7736765993239314,-1.7691526898402579,-1.7646670732760825,-1.7602190872354797,-1.7558080863474437,-1.7514334416873865,-1.747094540223011,-1.742790784283321,-1.7385215910496286,-1.734286392067463,-1.7300846327783743,-1.7259157720706537,-1.7217792818480673,-1.7176746466157446,-1.7136013630824005,-1.709558939778135,-1.705546896687079,-1.7015647648941958,-1.6976120862456003,-1.6936884130217615,-1.6897933076230267,-1.6859263422668973,-1.6820870986965486,-1.6782751679000762,-1.6744901498400206,-1.670731653192706,-1.666999295096975,-1.6632927009119203,-1.659611503983215,-1.6559553454176952,-1.652323873865837,-1.6487167453117997,-1.6451336228707292,-1.641574176593005,-1.6380380832751698,-1.634525026277252,-1.6310346953462345,-1.6275667864454124,-1.6241210015894185,-1.6206970486846812,-1.617294641375108,-1.6139134988927892,-1.610553345913522,-1.6072139124169775,-1.60389493355133,-1.6005961495021719,-1.5973173053655672,-1.5940581510250689,-1.5908184410325694,-1.5875979344928324,-1.5843963949515751,-1.5812135902869628,-1.5780492926044032,-1.5749032781345118,-1.5717753271341377,-1.568665223790343,-1.5655727561272206,-1.5624977159154652,-1.5594398985845874,-1.5563991031376887,-1.5533751320686964,-1.550367791281988,-1.547376890014312,-1.5444022407589304,-1.5414436591919107,-1.5385009641004859,-1.5355739773134227,-1.5326625236333282,-1.5297664307708247,-1.526885529280542,-1.5240196524988536,-1.5211686364833144,-1.5183323199537329,-1.5155105442348349,-1.5127031532004558,-1.5099099932192248,-1.5071309131016866,-1.504365764048815,-1.5016143996018816,-1.4988766755936223,-1.4961524501006813,-1.4934415833972754,-1.4907439379100509,-1.4880593781740954,-1.4853877707900618,-1.4827289843823832,-1.4800828895585347,-1.4774493588693196,-1.4748282667701376,-1.4722194895832204,-1.4696229054607952,-1.467038394349152,-1.464465837953592,-1.4619051197042214,-1.4593561247225788,-1.4568187397890637,-1.4542928533111432,-1.451778355292323,-1.449275137301844,-1.4467830924451057,-1.4443021153347777,-1.4418321020625915,-1.4393729501717831,-1.4369245586301822,-1.4344868278039153,-1.4320596594317168,-1.4296429565998279,-1.4272366237174614,-1.424840566492829,-1.4224546919097034,-1.4200789082045135,-1.4177131248439423,-1.4153572525030316,-1.4130112030437671,-1.4106748894941368,-1.4083482260276519,-1.4060311279433084,-1.4037235116459936,-1.4014252946273105,-1.3991363954468192,-1.396856733713682,-1.3945862300686969,-1.3923248061667188,-1.3900723846594505,-1.3878288891785995,-1.3855942443193856,-1.383368375624398,-1.3811512095677854,-1.378942673539777,-1.3767426958315248,-1.3745512056202527,-1.3723681329547164,-1.3701934087409564,-1.3680269647283432,-1.3658687334959048,-1.3637186484389285,-1.3615766437558339,-1.3594426544353078,-1.357316616243698,-1.3551984657126521,-1.3530881401270074,-1.350985577512914,-1.3488907166261952,-1.3468034969409328,-1.3447238586382757,-1.3426517425954647,-1.3405870903750714,-1.3385298442144435,-1.33647994701535,-1.3344373423338274,-1.3324019743702191,-1.3303737879594002,-1.328352728561193,-1.3263387422509547,-1.3243317757103494,-1.3223317762182871,-1.3203386916420345,-1.31835247042849,-1.3163730615956157,-1.314400414724035,-1.312434479948776,-1.3104752079511734,-1.3085225499509099,-1.3065764576982082,-1.304636883466162,-1.3027037800432029,-1.3007771007257076,-1.2988567993107312,-1.2969428300888737,-1.2950351478372721,-1.2931337078127174,-1.2912384657448919,-1.2893493778297234,-1.28746640072286,-1.2855894915332553,-1.2837186078168668,-1.2818537075704621,-1.2799947492255328,-1.2781416916423134,-1.2762944941039014,-1.2744531163104806,-1.272617518373638,-1.2707876608107822,-1.2689635045396532,-1.2671450108729247,-1.2653321415129002,-1.263524858546292,-1.2617231244390934,-1.2599269020315318,-1.25813615453311,-1.2563508455177224,-1.2545709389188588,-1.252796399024883,-1.2510271904743893,-1.2492632782516355,-1.2475046276820483,-1.2457512044278038,-1.2440029744834773,-1.2422599041717652,-1.2405219601392734,-1.2387891093523737,-1.2370613190931274,-1.2353385569552722,-1.2336207908402739,-1.2319079889534388,-1.230200119800089,-1.2284971521817962,-1.2267990551926755,-1.225105798215738,-1.2234173509192963,-1.221733683253429,-1.2200547654464993,-1.2183805680017277,-1.2167110616938142,-1.2150462175656151,-1.2133860069248716,-1.2117304013409838,-1.2100793726418384,-1.2084328929106807,-1.2067909344830352,-1.2051534699436734,-1.2035204721236257,-1.2018919140972382,-1.2002677691792734,-1.1986480109220543,-1.1970326131126496,-1.1954215497701037,-1.193814795142702,-1.192212323705282,-1.1906141101565795,-1.189020129416616,-1.187430356624124,-1.1858447671340073,-1.184263336514841,-1.1826860405464055,-1.181112855217257,-1.1795437567223335,-1.1779787214605921,-1.1764177260326834,-1.1748607472386565,-1.1733077620756998,-1.1717587477359077,-1.170213681604086,-1.168672541255583,-1.1671353044541526,-1.165601949149849,-1.164072453476947,-1.1625467957518947,-1.1610249544712918,-1.1595069083099,-1.1579926361186752,-1.1564821169228308,-1.154975329919926,-1.153472254477981,-1.1519728701336183,-1.1504771565902265,-1.1489850937161528,-1.1474966615429167,-1.1460118402634498,-1.14453061023036,-1.1430529519542154,-1.1415788461018546,-1.1401082734947179,-1.1386412151072027,-1.1371776520650374,-1.1357175656436789,-1.1342609372667318,-1.1328077485043873,-1.131357981071883,-1.1299116168279821,-1.1284686377734738,-1.1270290260496927,-1.1255927639370569,-1.1241598338536258,-1.1227302183536765,-1.121303900126297,-1.1198808619939997,-1.1184610869113534,-1.117044557963628,-1.1156312583654615,-1.114221171459542,-1.1128142807153063,-1.1114105697276564,-1.110010022215689,-1.1086126220214445,-1.1072183531086701,-1.1058271995615996,-1.1044391455837448,-1.1030541754967076,-1.1016722737390021,-1.1002934248648941,-1.0989176135432543,-1.0975448245564248,-1.0961750427990993,-1.09480825327722,-1.0934444411068849,-1.0920835915132696,-1.0907256898295625,-1.089370721495912,-1.0880186720583875,-1.086669527167954,-1.085323272579455,-1.0839798941506131,-1.0826393778410381,-1.0813017097112492,-1.0799668759217103,-1.0786348627318718,-1.0773056564992303,-1.0759792436783935,-1.0746556108201608,-1.073334744570613,-1.0720166316702109,-1.0707012589529077,-1.0693886133452697,-1.068078681865609,-1.066771451623124,-1.0654669098170517,-1.0641650437358303,-1.0628658407562686,-1.0615692883427295,-1.0602753740463189,-1.0589840855040857,-1.057695410438231,-1.0564093366553267,-1.0551258520455418,-1.0538449445818785,-1.0525666023194173,-1.051290813394569,-1.0500175660243385,-1.048746848505592,-1.047478649214337,-1.0462129566050091,-1.044949759209765,-1.043689045637786,-1.0424308045745876,-1.041175024781337,-1.0399216950941788,-1.0386708044235693,-1.0374223417536144,-1.0361762961414192,-1.0349326567164412,-1.0336914126798542,-1.0324525533039157,-1.0312160679313438,-1.0299819459746986,-1.0287501769157734,-1.0275207503049892,-1.0262936557607991,-1.0250688829690957,-1.023846421682628,-1.0226262617204218,-1.0214083929672104,-1.020192805372866,-1.0189794889518418,-1.0177684337826178,-1.0165596300071529,-1.0153530678303435,-1.0141487375194873,-1.0129466294037521,-1.0117467338736517,-1.0105490413805263,-1.0093535424360296,-1.008160227611619,-1.006969087538054,-1.0057801129048964,-1.0045932944600209,-1.0034086230091244,-1.0022260894152462,-1.0010456845982887,-0.9998673995345466,-0.9986912252562394,-0.9975171528510473,-0.9963451734616545,-0.9951752782852963,-0.9940074585733095,-0.99284170563069,-0.991678010815652,-0.9905163655391939,-0.9893567612646674,-0.9881991895073529,-0.9870436418340355,-0.9858901098625892,-0.9847385852615629,-0.9835890597497716,-0.9824415250958921,-0.9812959731180605,-0.9801523956834768,-0.9790107847080107,-0.977871132155815,-0.9767334300389372,-0.9755976704169408,-0.9744638453965266,-0.9733319471311593,-0.9722019678206979,-0.9710738997110284,-0.9699477350937014,-0.968823466305573,-0.967701085728449,-0.9665805857887331,-0.9654619589570771,-0.9643451977480365,-0.9632302947197277,-0.9621172424734905,-0.9610060336535512,-0.9598966609466915,-0.958789117081919,-0.9576833948301415,-0.956579487003845,-0.9554773864567732,-0.954377086083611,-0.9532785788196724,-0.9521818576405877,-0.951086915561999,-0.9499937456392528,-0.9489023409670995,-0.9478126946793946,-0.9467247999488031,-0.9456386499865055,-0.9445542380419071,-0.9434715574023513,-0.9423906013928338,-0.9413113633757209,-0.9402338367504689,-0.9391580149533476,-0.9380838914571655,-0.9370114597709986,-0.9359407134399196,-0.9348716460447318,-0.9338042512017046,-0.9327385225623112,-0.9316744538129695,-0.9306120386747838,-0.9295512709032911,-0.9284921442882078,-0.9274346526531793,-0.9263787898555333,-0.9253245497860325,-0.9242719263686322,-0.9232209135602383,-0.9221715053504693,-0.9211236957614185,-0.9200774788474191,-0.9190328486948124,-0.9179897994217163,-0.9169483251777981,-0.9159084201440465,-0.9148700785325482,-0.9138332945862654,-0.9127980625788148,-0.9117643768142503,-0.910732231626845,-0.9097016213808777,-0.9086725404704197,-0.9076449833191245,-0.906618944380018,-0.9055944181352918,-0.9045713990960986,-0.9035498818023469,-0.9025298608225019,-0.9015113307533829,-0.9004942862199667,-0.8994787218751907,-0.8984646323997579,-0.8974520125019446,-0.8964408569174078,-0.8954311604089964,-0.8944229177665626,-0.8934161238067759,-0.8924107733729378,-0.8914068613347984,-0.890404382588375,-0.8894033320557717,-0.8884037046850014,-0.8874054954498078,-0.8864086993494902,-0.8854133114087293,-0.8844193266774154,-0.8834267402304757,-0.882435547167706,-0.8814457426136015,-0.8804573217171903,-0.8794702796518685,-0.8784846116152352,-0.87750031282893,-0.8765173785384723,-0.8755358040131006,-0.8745555845456148,-0.8735767154522176,-0.8725991920723596,-0.8716230097685838,-0.8706481639263732,-0.8696746499539973,-0.8687024632823626,-0.8677315993648615,-0.866762053677225,-0.8657938217173757,-0.8648268990052803,-0.8638612810828065,-0.8628969635135781,-0.8619339418828336,-0.8609722117972843,-0.8600117688849744,-0.859052608795142,-0.8580947271980807,-0.8571381197850043,-0.8561827822679097,-0.8552287103794429,-0.8542758998727658,-0.8533243465214231,-0.8523740461192126,-0.8514249944800528,-0.8504771874378553,-0.8495306208463956,-0.8485852905791867,-0.8476411925293531,-0.8466983226095046,-0.8457566767516129,-0.8448162509068886,-0.8438770410456589,-0.8429390431572457,-0.8420022532498466,-0.8410666673504146,-0.8401322815045396,-0.8391990917763323,-0.8382670942483066,-0.8373362850212636,-0.8364066602141778,-0.8354782159640837,-0.8345509484259616,-0.8336248537726259,-0.8326999281946148,-0.8317761679000789,-0.8308535691146731,-0.8299321280814468,-0.8290118410607359,-0.8280927043300575,-0.8271747141840022,-0.82625786693413,-0.8253421589088645,-0.8244275864533908,-0.823514145929551,-0.822601833715744,-0.8216906462068222,-0.8207805798139922,-0.8198716309647147,-0.8189637961026054,-0.8180570716873371,-0.8171514541945416,-0.8162469401157134,-0.8153435259581134,-0.8144412082446735,-0.8135399835139026,-0.8126398483197916,-0.8117407992317214,-0.8108428328343693,-0.8099459457276186,-0.8090501345264658,-0.8081553958609313,-0.8072617263759692,-0.8063691227313785,-0.8054775816017148,-0.8045870996762017,-0.8036976736586443,-0.8028093002673429,-0.8019219762350067,-0.8010356983086688,-0.8001504632496018,-0.7992662678332332,-0.7983831088490626,-0.7975009831005794,-0.7966198874051794,-0.7957398185940844,-0.7948607735122609,-0.7939827490183393,-0.7931057419845353,-0.7922297492965694,-0.7913547678535892,-0.7904807945680905,-0.7896078263658416,-0.788735860185804,-0.7878648929800576,-0.7869949217137248,-0.7861259433648944,-0.7852579549245483,-0.7843909533964858,-0.7835249357972506,-0.7826598991560582,-0.781795840514722,-0.780932756927583,-0.7800706454614366,-0.7792095031954621,-0.7783493272211526,-0.7774901146422446,-0.7766318625746479,-0.7757745681463775,-0.7749182284974844,-0.7740628407799873,-0.7732084021578063,-0.7723549098066939,-0.7715023609141696,-0.7706507526794532,-0.769800082313399,-0.7689503470384315,-0.7681015440884789,-0.76725367070891,-0.7664067241564697,-0.7655607016992161,-0.7647156006164568,-0.7638714181986864,-0.7630281517475247,-0.7621857985756547,-0.7613443560067616,-0.7605038213754713,-0.7596641920272905,-0.7588254653185461,-0.7579876386163267,-0.7571507092984215,-0.7563146747532634,-0.7554795323798692,-0.754645279587782,-0.7538119137970145,-0.7529794324379898,-0.7521478329514865,-0.7513171127885807,-0.7504872694105913,-0.7496583002890232,-0.7488302029055127,-0.7480029747517719,-0.7471766133295344,-0.746351116150502,-0.745526480736289,-0.7447027046183703,-0.7438797853380276,-0.7430577204462963,-0.7422365075039145,-0.7414161440812689,-0.7405966277583449,-0.7397779561246741,-0.7389601267792834,-0.7381431373306451,-0.7373269853966257,-0.7365116686044361,-0.7356971845905818,-0.7348835310008142,-0.7340707054900807,-0.7332587057224764,-0.7324475293711957,-0.731637174118484,-0.7308276376555904,-0.73001891768272,-0.7292110119089863,-0.7284039180523654,-0.7275976338396482,-0.7267921570063957,-0.7259874852968916,-0.7251836164640977,-0.7243805482696077,-0.7235782784836037,-0.7227768048848096,-0.7219761252604475,-0.7211762374061941,-0.7203771391261358,-0.7195788282327259,-0.7187813025467409,-0.7179845598972374,-0.7171885981215096,-0.716393415065047,-0.7155990085814913,-0.7148053765325957,-0.7140125167881819,-0.7132204272261001,-0.7124291057321869,-0.7116385502002247,-0.7108487585319007,-0.7100597286367674,-0.7092714584322016,-0.7084839458433655,-0.7076971888031658,-0.7069111852522157,-0.7061259331387949,-0.7053414304188111,-0.7045576750557616,-0.7037746650206941,-0.7029923982921695,-0.7022108728562236,-0.7014300867063297,-0.7006500378433608,-0.6998707242755524,-0.6990921440184661,-0.6983142950949522,-0.6975371755351144,-0.6967607833762715,-0.6959851166629232,-0.6952101734467135,-0.6944359517863956,-0.6936624497477957,-0.6928896654037784,-0.6921175968342118,-0.6913462421259324,-0.6905755993727115,-0.6898056666752196,-0.6890364421409931,-0.6882679238844004,-0.687500110026608,-0.6867329986955475,-0.6859665880258814,-0.6852008761589712,-0.6844358612428433,-0.6836715414321578,-0.6829079148881749,-0.6821449797787231,-0.6813827342781668,-0.6806211765673746,-0.6798603048336883,-0.6791001172708904,-0.6783406120791731,-0.6775817874651073,-0.6768236416416121,-0.6760661728279234,-0.6753093792495632,-0.6745532591383104,-0.6737978107321689,-0.6730430322753396,-0.6722889220181887,-0.6715354782172192,-0.6707826991350408,-0.6700305830403412,-0.669279128207857,-0.6685283329183437,-0.6677781954585479,-0.6670287141211786,-0.6662798872048785,-0.6655317130141959,-0.6647841898595566,-0.6640373160572356,-0.6632910899293297,-0.6625455098037303,-0.6618005740140949,-0.6610562808998206,-0.6603126288060168,-0.6595696160834779,-0.6588272410886574,-0.65808550218364,-0.6573443977361162,-0.656603926119355,-0.6558640857121789,-0.6551248748989364,-0.6543862920694774,-0.6536483356191267,-0.6529110039486588,-0.6521742954642721,-0.6514382085775643,-0.6507027417055062,-0.6499678932704175,-0.649233661699942,-0.6485000454270223,-0.6477670428898755,-0.6470346525319691,-0.6463028728019959,-0.6455717021538511,-0.6448411390466069,-0.6441111819444896,-0.6433818293168554,-0.6426530796381668,-0.6419249313879698,-0.6411973830508696,-0.6404704331165076,-0.6397440800795389,-0.6390183224396091,-0.638293158701331,-0.6375685873742625,-0.6368446069728839,-0.6361212160165751,-0.6353984130295943,-0.6346761965410546,-0.6339545650849023,-0.6332335171998957,-0.6325130514295823,-0.631793166322278,-0.6310738604310449,-0.6303551323136698,-0.6296369805326435,-0.6289194036551392,-0.6282024002529913,-0.6274859689026749,-0.6267701081852841,-0.6260548166865123,-0.6253400929966308,-0.6246259357104689,-0.6239123434273928,-0.6231993147512859,-0.622486848290528,-0.6217749426579768,-0.6210635964709459,-0.6203528083511859,-0.6196425769248648,-0.6189329008225487,-0.6182237786791812,-0.6175152091340651,-0.6168071908308422,-0.6160997224174748,-0.6153928025462266,-0.614686429873643,-0.6139806030605327,-0.6132753207719492,-0.6125705816771719,-0.6118663844496871,-0.6111627277671701,-0.6104596103114664,-0.6097570307685738,-0.6090549878286243,-0.6083534801858653,-0.6076525065386423,-0.6069520655893808,-0.6062521560445684,-0.6055527766147377,-0.6048539260144478,-0.6041556029622671,-0.6034578061807564,-0.6027605343964512,-0.6020637863398441,-0.6013675607453685,-0.6006718563513808,-0.5999766719001436,-0.5992820061378098,-0.5985878578144042,-0.597894225683808,-0.5972011085037418,-0.5965085050357489,-0.59581641404518,-0.595124834301175,-0.5944337645766483,-0.5937432036482717,-0.5930531502964596,-0.5923636033053512,-0.591674561462796,-0.5909860235603372,-0.5902979883931968,-0.5896104547602591,-0.5889234214640555,-0.588236887310749,-0.5875508511101185,-0.5868653116755439,-0.5861802678239911,-0.5854957183759958,-0.5848116621556492,-0.5841280979905826,-0.5834450247119533,-0.5827624411544283,-0.5820803461561709,-0.5813987385588251,-0.5807176172075011,-0.5800369809507617,-0.5793568286406062,-0.5786771591324574,-0.5779979712851464,-0.5773192639608988,-0.5766410360253205,-0.575963286347383,-0.5752860137994105,-0.5746092172570645,-0.5739328955993315,-0.5732570477085078,-0.5725816724701864,-0.5719067687732433,-0.5712323355098234,-0.5705583715753282,-0.5698848758684008,-0.5692118472909131,-0.5685392847479528,-0.56786718714781,-0.5671955534019638,-0.566524382425069,-0.5658536731349431,-0.5651834244525537,-0.5645136353020056,-0.5638443046105273,-0.5631754313084584,-0.5625070143292371,-0.5618390526093874,-0.5611715450885066,-0.5605044907092526,-0.5598378884173311,-0.5591717371614837,-0.5585060358934756,-0.5578407835680828,-0.5571759791430799,-0.5565116215792285,-0.555847709840264,-0.5551842428928853,-0.5545212197067406,-0.5538586392544173,-0.5531965005114288,-0.5525348024562039,-0.5518735440700742,-0.551212724337262,-0.55055234224487,-0.5498923967828684,-0.5492328869440846,-0.5485738117241901,-0.5479151701216906,-0.5472569611379137,-0.5465991837769983,-0.5459418370458828,-0.5452849199542938,-0.5446284315147355,-0.5439723707424784,-0.5433167366555478,-0.5426615282747135,-0.5420067446234785,-0.5413523847280681,-0.5406984476174196,-0.5400449323231702,-0.5393918378796481,-0.5387391633238602,-0.5380869076954827,-0.53743507003685,-0.5367836493929434,-0.5361326448113827,-0.5354820553424136,-0.5348318800388984,-0.534182117956306,-0.5335327681527007,-0.5328838296887327,-0.5322353016276277,-0.5315871830351766,-0.530939472979726,-0.5302921705321674,-0.5296452747659277,-0.5289987847569597,-0.528352699583731,-0.5277070183272152,-0.5270617400708819,-0.5264168639006868,-0.525772388905062,-0.5251283141749065,-0.5244846388035765,-0.523841361886876,-0.523198482523047,-0.5225559998127604,-0.5219139128591059,-0.521272220767584,-0.5206309226460948,-0.5199900176049302,-0.5193495047567643,-0.5187093832166436,-0.5180696521019785,-0.5174303105325342,-0.5167913576304208,-0.5161527925200855,-0.5155146143283028,-0.5148768221841654,-0.514239415219076,-0.5136023925667381,-0.5129657533631468,-0.5123294967465807,-0.5116936218575927,-0.5110581278390015,-0.5104230138358826,-0.5097882789955606,-0.509153922467599,-0.5085199434037935,-0.5078863409581624,-0.5072531142869381,-0.5066202625485593,-0.5059877849036619,-0.5053556805150715,-0.5047239485477943,-0.5040925881690091,-0.5034615985480595,-0.5028309788564448,-0.5022007282678128,-0.5015708459579511,-0.5009413311047792,-0.5003121828883406,-0.4996834004907942,-0.49905498309640706,-0.49842692989154624,-0.4977992400646707,-0.49717191280632345,-0.4965449473091241,-0.4959183427677606,-0.49529209837898164,-0.4946662133415893,-0.49404068685643054,-0.4934155181263908,-0.49279070635638467,-0.49216625075335,-0.4915421505262395,-0.490918404886013,-0.4902950130456308,-0.4896719742200452,-0.48904928762619415,-0.48842695248299306,-0.4878049680113278,-0.4871833334340472,-0.48656204797595604,-0.48594111086380765,-0.48532052132629666,-0.48470027859405174,-0.48408038189962865,-0.48346083047750316,-0.48284162356406346,-0.4822227603976037,-0.4816042402183168,-0.48098606226828733,-0.4803682257914843,-0.47975073003375485,-0.479133574242817,-0.47851675766825247,-0.4779002795615007,-0.477284139175851,-0.4766683357664364,-0.47605286859022683,-0.47543773690602226,-0.47482293997444613,-0.47420847705793856,-0.4735943474207499,-0.4729805503289337,-0.47236708505034075,-0.4717539508546121,-0.47114114701317245,-0.4705286727992243,-0.4699165274877406,-0.4693047103554591,-0.4686932206808754,-0.4680820577442366,-0.46747122082753556,-0.46686070921450373,-0.46625052219060564,-0.46564065904303176,-0.46503111906069317,-0.46442190153421464,-0.46381300575592876,-0.46320443101986986,-0.46259617662176755,-0.4619882418590411,-0.4613806260307925,-0.4607733284378016,-0.4601663483825191,-0.45955968516906065,-0.4589533381032017,-0.4583473064923704,-0.45774158964564243,-0.4571361868737349,-0.4565310974890004,-0.4559263208054213,-0.4553218561386033,-0.454717702805771,-0.4541138601257605,-0.45351032741901487,-0.45290710400757767,-0.45230418921508775,-0.451701582366773,-0.4510992827894455,-0.45049728981149506,-0.449895602762884,-0.4492942209751417,-0.4486931437813586,-0.44809237051618134,-0.44749190051580623,-0.446891733117975,-0.44629186766196804,-0.4456923034886,-0.4450930399402141,-0.4444940763606759,-0.44389541209536937,-0.44329704649119017,-0.44269897889654136,-0.4421012086613273,-0.44150373513694874,-0.4409065576762978,-0.4403096756337519,-0.43971308836516954,-0.43911679522788427,-0.4385207955807002,-0.43792508878388603,-0.4373296741991707,-0.4367345511897379,-0.436139719120221,-0.4355451773566978,-0.43495092526668583,-0.4343569622191372,-0.4337632875844334,-0.4331699007343804,-0.43257680104220386,-0.43198398788254383,-0.43139146063145034,-0.4307992186663777,-0.4302072613661806,-0.4296155881111082,-0.42902419828280003,-0.42843309126428114,-0.42784226643995643,-0.4272517231956071,-0.426661460918385,-0.4260714789968082,-0.425481776820756,-0.42489235378146467,-0.4243032092715223,-0.42371434268486446,-0.42312575341676917,-0.42253744086385264,-0.4219494044240645,-0.421361643496683,-0.42077415748231106,-0.4201869457828705,-0.4196000078015989,-0.41901334294304415,-0.4184269506130602,-0.4178408302188026,-0.41725498116872384,-0.4166694028725695,-0.41608409474137276,-0.4154990561874509,-0.41491428662440066,-0.4143297854670933,-0.41374555213167136,-0.41316158603554287,-0.4125778865973785,-0.4119944532371061,-0.4114112853759068,-0.41082838243621106,-0.41024574384169377,-0.4096633690172705,-0.40908125738909296,-0.40849940838454507,-0.4079178214322386,-0.4073364959620086,-0.4067554314049102,-0.40617462719321346,-0.4055940827604,-0.40501379754115796,-0.4044337709713792,-0.403854002488154,-0.40327449152976763,-0.402695237535696,-0.4021162399466021,-0.4015374982043314,-0.4009590117519079,-0.40038078003353084,-0.3998028024945698,-0.3992250785815612,-0.39864760774220453,-0.39807038942535783,-0.39749342308103447,-0.39691670816039876,-0.3963402441157623,-0.39576403040058,-0.3951880664694462,-0.39461235177809106,-0.39403688578337626,-0.39346166794329196,-0.392886697716952,-0.3923119745645912,-0.3917374979475606,-0.3911632673283244,-0.390589282170456,-0.39001554193863414,-0.3894420460986395,-0.38886879411735054,-0.3882957854627404,-0.3877230196038726,-0.38715049601089807,-0.3865782141550509,-0.3860061735086451,-0.3854343735450708,-0.3848628137387907,-0.3842914935653367,-0.3837204125013058,-0.383149570024357,-0.38257896561320787,-0.38200859874763043,-0.3814384689084482,-0.3808685755775323,-0.3802989182377984,-0.37972949637320264,-0.3791603094687388,-0.3785913570104345,-0.37802263848534756,-0.37745415338156324,-0.3768859011881901,-0.37631788139535705,-0.37575009349420974,-0.3751825369769074,-0.37461521133661935,-0.3740481160675214,-0.37348125066479315,-0.37291461462461395,-0.37234820744416025,-0.3717820286216016,-0.37121607765609793,-0.3706503540477961,-0.3700848572978267,-0.36951958690830033,-0.3689545423823051,-0.3683897232239029,-0.36782512893812636,-0.3672607590309756,-0.36669661300941514,-0.3661326903813705,-0.3655689906557251,-0.3650055133423174,-0.3644422579519374,-0.36387922399632344,-0.36331641098815975,-0.36275381844107213,-0.36219144586962637,-0.36162929278932376,-0.3610673587165988,-0.360505643168816,-0.35994414566426675,-0.3593828657221664,-0.3588218028626507,-0.3582609566067739,-0.3577003264765043,-0.35713991199472256,-0.35657971268521793,-0.35601972807268534,-0.3554599576827229,-0.3549004010418283,-0.35434105767739643,-0.353781927117716,-0.3532230088919668,-0.3526643025302172,-0.3521058075634201,-0.35154752352341156,-0.3509894499429066,-0.35043158635549715,-0.3498739322956487,-0.34931648729869774,-0.34875925090084875,-0.34820222263917155,-0.3476454020515984,-0.34708878867692083,-0.3465323820547876,-0.34597618172570105,-0.34542018723101514,-0.34486439811293196,-0.3443088139144993,-0.343753434179608,-0.34319825845298907,-0.34264328628021096,-0.34208851720767663,-0.3415339507826214,-0.34097958655310956,-0.34042542406803217,-0.3398714628771043,-0.33931770253086196,-0.33876414258066007,-0.33821078257866916,-0.3376576220778733,-0.33710466063206695,-0.3365518977958527,-0.3359993331246384,-0.3354469661746349,-0.3348947965028528,-0.33434282366710066,-0.33379104722598185,-0.333239466738892,-0.3326880817660168,-0.33213689186832906,-0.33158589660758636,-0.33103509554632854,-0.3304844882478749,-0.3299340742763221,-0.3293838531965412,-0.3288338245741753,-0.3282839879756375,-0.3277343429681076,-0.3271848891195303,-0.3266356259986122,-0.3260865531748198,-0.32553767021837693,-0.32498897670026183,-0.3244404721922055,-0.3238921562666887,-0.32334402849693966,-0.3227960884569317,-0.3222483357213809,-0.3217007698657436,-0.3211533904662139,-0.3206061970997216,-0.3200591893439296,-0.3195123667772315,-0.31896572897874925,-0.3184192755283312,-0.31787300600654894,-0.3173269199946959,-0.31678101707478434,-0.3162352968295432,-0.3156897588424161,-0.3151444026975585,-0.31459922797983597,-0.3140542342748214,-0.31350942116879316,-0.3129647882487325,-0.31242033510232126,-0.31187606131794016,-0.31133196648466566,-0.3107880501922687,-0.3102443120312114,-0.3097007515926459,-0.3091573684684114,-0.30861416225103216,-0.30807113253371554,-0.3075282789103493,-0.30698560097549993,-0.30644309832440997,-0.30590077055299647,-0.305358617257848,-0.3048166380362232,-0.3042748324860484,-0.3037332002059152,-0.3031917407950788,-0.3026504538534553,-0.30210933898162023,-0.30156839578080596,-0.3010276238528995,-0.3004870228004411,-0.2999465922266211,-0.29940633173527886,-0.29886624093089986,-0.29832631941861426,-0.2977865668041943,-0.2972469826940526,-0.2967075666952399,-0.29616831841544317,-0.2956292374629834,-0.29509032344681363,-0.29455157597651704,-0.29401299466230446,-0.2934745791150132,-0.29293632894610405,-0.29239824376766005,-0.291860323192384,-0.29132256683359675,-0.2907849743052352,-0.29024754522185,-0.289710279198604,-0.28917317585127006,-0.28863623479622885,-0.2880994556504677,-0.28756283803157745,-0.2870263815577518,-0.2864900858477841,-0.28595395052106665,-0.2854179751975877,-0.28488215949793017,-0.2843465030432697,-0.2838110054553723,-0.2832756663565931,-0.28274048536987384,-0.2822054621187414,-0.2816705962273057,-0.28113588732025785,-0.2806013350228684,-0.28006693896098517,-0.27953269876103193,-0.2789986140500059,-0.27846468445547645,-0.277930909605583,-0.27739728912903283,-0.2768638226551001,-0.2763305098136233,-0.27579735023500374,-0.2752643435502035,-0.27473148939074415,-0.2741987873887042,-0.2736662371767177,-0.27313383838797267,-0.27260159065620876,-0.2720694936157162,-0.2715375469013331,-0.27100575014844447,-0.2704741029929801,-0.26994260507141266,-0.2694112560207565,-0.2688800554785652,-0.26834900308293036,-0.2678180984724795,-0.2672873412863746,-0.2667567311643102,-0.26622626774651176,-0.26569595067373386,-0.2651657795872585,-0.2646357541288936,-0.2641058739409709,-0.26357613866634466,-0.26304654794838955,-0.2625171014309995,-0.2619877987585854,-0.26145863957607396,-0.2609296235289058,-0.26040075026303355,-0.25987201942492083,-0.25934343066153975,-0.25881498362037,-0.25828667794939675,-0.2577585132971091,-0.2572304893124987,-0.25670260564505765,-0.25617486194477734,-0.2556472578621464,-0.2551197930481496,-0.25459246715426537,-0.25406527983246535,-0.25353823073521176,-0.25301131951545647,-0.25248454582663893,-0.2519579093226848,-0.25143140965800453,-0.2509050464874915,-0.2503788194665205,-0.24985272825094623,-0.2493267724971017,-0.24880095186179665,-0.24827526600231598,-0.2477497145764182,-0.24722429724233402,-0.24669901365876448,-0.24617386348487974,-0.24564884638031725,-0.2451239620051807,-0.24459921002003765,-0.24407459008591892,-0.24355010186431653,-0.2430257450171823,-0.24250151920692634,-0.24197742409641557,-0.24145345934897225,-0.24092962462837225,-0.240405919598844,-0.23988234392506647,-0.23935889727216814,-0.23883557930572516,-0.2383123896917602,-0.23778932809674064,-0.2372663941875774,-0.2367435876316233,-0.23622090809667146,-0.23569835525095434,-0.23517592876314175,-0.2346536283023396,-0.2341314535380886,-0.23360940414036263,-0.23308747977956723,-0.23256568012653844,-0.23204400485254123,-0.2315224536292679,-0.231001026128837,-0.23047972202379166,-0.2299585409870982,-0.22943748269214484,-0.2289165468127402,-0.22839573302311184,-0.22787504099790507,-0.22735447041218126,-0.22683402094141675,-0.22631369226150128,-0.2257934840487366,-0.2252733959798351,-0.2247534277319186,-0.2242335789825166,-0.2237138494095655,-0.22319423869140664,-0.22267474650678523,-0.22215537253484896,-0.22163611645514658,-0.2211169779476267,-0.2205979566926362,-0.22007905237091918,-0.21956026466361533,-0.21904159325225883,-0.21852303781877686,-0.21800459804548827,-0.2174862736151024,-0.21696806421071763,-0.21644996951582007,-0.21593198921428228,-0.2154141229903619,-0.21489637052870048,-0.21437873151432202,-0.21386120563263167,-0.21334379256941455,-0.21282649201083434,-0.2123093036434321,-0.2117922271541249,-0.21127526223020449,-0.21075840855933614,-0.21024166582955722,-0.20972503372927612,-0.20920851194727072,-0.20869210017268736,-0.20817579809503942,-0.20765960540420614,-0.20714352179043133,-0.20662754694432206,-0.20611168055684748,-0.20559592231933754,-0.2050802719234818,-0.20456472906132814,-0.20404929342528136,-0.2035339647081023,-0.20301874260290637,-0.20250362680316208,-0.20198861700269047,-0.20147371289566324,-0.20095891417660183,-0.20044422054037628,-0.19992963168220368,-0.19941514729764737,-0.19890076708261534,-0.1983864907333593,-0.19787231794647334,-0.1973582484188928,-0.19684428184789307,-0.1963304179310883,-0.1958166563664303,-0.19530299685220728,-0.19478943908704277,-0.19427598276989433,-0.19376262760005242,-0.19324937327713917,-0.19273621950110734,-0.19222316597223896,-0.19171021239114427,-0.19119735845876054,-0.19068460387635092,-0.19017194834550324,-0.1896593915681289,-0.1891469332464616,-0.18863457308305637,-0.18812231078078825,-0.18761014604285126,-0.18709807857275715,-0.18658610807433437,-0.18607423425172684,-0.18556245680939285,-0.18505077545210397,-0.1845391898849438,-0.18402769981330697,-0.1835163049428979,-0.18300500497972974,-0.1824937996301233,-0.1819826886007058,-0.18147167159840993,-0.1809607483304725,-0.1804499185044335,-0.17993918182813504,-0.17942853800972,-0.1789179867576313,-0.17840752778061034,-0.1778971607876963,-0.17738688548822484,-0.17687670159182714,-0.17636660880842853,-0.17585660684824778,-0.17534669542179576,-0.1748368742398744,-0.1743271430135757,-0.17381750145428057,-0.17330794927365772,-0.17279848618366264,-0.17228911189653662,-0.17177982612480547,-0.17127062858127862,-0.17076151897904807,-0.17025249703148712,-0.16974356245224959,-0.1692347149552685,-0.16872595425475526,-0.1682172800651984,-0.16770869210136272,-0.16720019007828804,-0.1666917737112883,-0.16618344271595045,-0.16567519680813353,-0.16516703570396732,-0.16465895911985168,-0.1641509667724553,-0.16364305837871473,-0.16313523365583332,-0.16262749232128018,-0.1621198340927893,-0.16161225868835816,-0.1611047658262472,-0.16059735522497845,-0.16009002660333466,-0.15958277968035817,-0.15907561417535002,-0.15856852980786898,-0.15806152629773024,-0.15755460336500476,-0.15704776073001814,-0.15654099811334946,-0.15603431523583056,-0.15552771181854486,-0.1550211875828263,-0.15451474225025863,-0.15400837554267405,-0.1535020871821525,-0.15299587689102057,-0.15248974439185053,-0.15198368940745927,-0.15147771166090748,-0.1509718108754985,-0.1504659867747774,-0.14996023908253006,-0.1494545675227822,-0.14894897181979824,-0.14844345169808054,-0.1479380068823683,-0.14743263709763668,-0.14692734206909572,-0.1464221215221895,-0.1459169751825951,-0.14541190277622168,-0.1449069040292095,-0.14440197866792895,-0.14389712641897967,-0.14339234700918954,-0.14288764016561364,-0.14238300561553358,-0.14187844308645614,-0.14137395230611277,-0.1408695330024583,-0.14036518490367023,-0.13986090773814763,-0.13935670123451027,-0.1388525651215977,-0.13834849912846822,-0.13784450298439824,-0.13734057641888087,-0.1368367191616254,-0.13633293094255622,-0.13582921149181187,-0.13532556053974418,-0.13482197781691727,-0.13431846305410672,-0.13381501598229859,-0.13331163633268855,-0.13280832383668095,-0.13230507822588777,-0.13180189923212793,-0.13129878658742627,-0.13079574002401273,-0.13029275927432116,-0.12978984407098879,-0.12928699414685513,-0.12878420923496103,-0.1282814890685479,-0.12777883338105667,-0.12727624190612713,-0.1267737143775967,-0.1262712505294999,-0.12576885009606706,-0.1252665128117238,-0.1247642384110899,-0.1242620266289786,-0.12375987720039543,-0.12325778986053766,-0.12275576434479316,-0.12225380038873969,-0.12175189772814385,-0.12125005609896035,-0.12074827523733112,-0.12024655487958426,-0.11974489476223343,-0.11924329462197678,-0.11874175419569612,-0.1182402732204561,-0.11773885143350332,-0.1172374885722654,-0.11673618437435021,-0.11623493857754494,-0.11573375091981525,-0.11523262113930446,-0.1147315489743326,-0.11423053416339558,-0.11372957644516439,-0.11322867555848418,-0.11272783124237341,-0.112227043236023,-0.11172631127879555,-0.11122563511022439,-0.1107250144700127,-0.11022444909803283,-0.10972393873432532,-0.10922348311909802,-0.10872308199272539,-0.10822273509574752,-0.10772244216886942,-0.10722220295295999,-0.10672201718905135,-0.10622188461833797,-0.10572180498217579,-0.10522177802208134,-0.10472180347973103,-0.10422188109696028,-0.10372201061576256,-0.10322219177828874,-0.10272242432684617,-0.10222270800389782,-0.10172304255206152,-0.10122342771410911,-0.10072386323296562,-0.10022434885170839,-0.09972488431356635,-0.09922546936191913,-0.09872610374029622,-0.09822678719237621,-0.09772751946198596,-0.09722830029309974,-0.09672912942983847,-0.09623000661646883,-0.09573093159740252,-0.09523190411719548,-0.09473292392054694,-0.09423399075229869,-0.09373510435743433,-0.09323626448107837,-0.09273747086849543,-0.0922387232650895,-0.09174002141640307,-0.09124136506811638,-0.09074275396604656,-0.09024418785614682,-0.0897456664845058,-0.08924718959734651,-0.08874875694102578,-0.08825036826203334,-0.087752023306991,-0.08725372182265195,-0.08675546355589987,-0.0862572482537482,-0.0857590756633393,-0.08526094553194373,-0.08476285760695935,-0.08426481163591068,-0.08376680736644791,-0.08326884454634631,-0.08277092292350535,-0.0822730422459479,-0.08177520226181946,-0.0812774027193874,-0.08077964336704016,-0.08028192395328648,-0.07978424422675458,-0.07928660393619141,-0.0787890028304619,-0.07829144065854811,-0.07779391716954848,-0.0772964321126771,-0.0767989852372629,-0.07630157629274881,-0.07580420502869112,-0.07530687119475858,-0.07480957454073174,-0.07431231481650202,-0.07381509177207114,-0.07331790515755021,-0.07282075472315895,-0.07232364021922506,-0.07182656139618328,-0.07132951800457477,-0.07083250979504621,-0.07033553651834917,-0.06983859792533925,-0.06934169376697534,-0.06884482379431885,-0.06834798775853299,-0.06785118541088196,-0.06735441650273022,-0.0668576807855417,-0.06636097801087906,-0.06586430793040296,-0.06536767029587123,-0.06487106485913817,-0.06437449137215379,-0.06387794958696305,-0.06338143925570505,-0.06288496013061239,-0.062388511964010296,-0.061892094508315953,-0.0613957075160377,-0.06089935073977432,-0.06040302393221425,-0.0599067268461349,-0.05941045923440175,-0.05891422084996782,-0.05841801144587274,-0.05792183077524209,-0.057425678591286625,-0.05692955464730153,-0.05643345869666571,-0.05593739049284098,-0.05544134978937138,-0.0549453363398824,-0.05444934989808025,-0.05395339021775109,-0.05345745705276035,-0.052961550157051916,-0.05246566928464743,-0.05196981418964555,-0.05147398462622119,-0.050978180348624814,-0.05048240111118165,-0.049986646668291,-0.04949091677442546,-0.048995211184130236,-0.04849952965202235,-0.04800387193278995,-0.047508237781191544,-0.047012626952055256,-0.04651703920027815,-0.04602147428082545,-0.04552593194872981,-0.04503041195909056,-0.044534914067073064,-0.044039438027907864,-0.043543983596890046,-0.04304855052937846,-0.04255313858079501,-0.042057747506623895,-0.04156237706241092,-0.04106702700376278,-0.040571697086346226,-0.04007638706588748,-0.039581096698171406,-0.03908582573904083,-0.03859057394439578,-0.0380953410701928,-0.03760012687244419,-0.037104931107217305,-0.03660975353063381,-0.03611459389886896,-0.03561945196815088,-0.03512432749475987,-0.03462922023502761,-0.0341341299453365,-0.033639056382118934,-0.03314399930185652,-0.03264895846107942,-0.03215393361636563,-0.0316589245243402,-0.031163930941674554,-0.030668952625085778,-0.030173989331335884,-0.029679040817231085,-0.02918410683962109,-0.028689187155398362,-0.028194281521497434,-0.02769938969489415,-0.027204511432604994,-0.026709646491686317,-0.026214794629233668,-0.025719955602381044,-0.025225129168300185,-0.024730315084199872,-0.024235513107325177,-0.023740722994956776,-0.023245944504410216,-0.02275117739303521,-0.022256421418214913,-0.02176167633736521,-0.021266941907934,-0.020772217887400492,-0.02027750403327447,-0.019782800103095598,-0.01928810585443268,-0.018793421044882987,-0.018298745432071502,-0.01780407877365023,-0.017309420827297476,-0.016814771350717135,-0.01632013010163798,-0.015825496837812952,-0.015330871317018428,-0.014836253297053542,-0.01434164253573944,-0.01384703879091859,-0.013352441820454058,-0.0128578513822288,-0.012363267234144958,-0.011868689134123131,-0.011374116840101678,-0.010879550110036005,-0.010384988701897848,-0.009890432373674566,-0.009395880883368433,-0.008901333988995919,-0.008406791448586986,-0.007912253020184373,-0.007417718461842893,-0.006923187531628715,-0.006428659987618654,-0.005934135587899466,-0.005439614090567133,-0.0049450952537261565,-0.004450578835488847,-0.003956064593974605,-0.0034615522873092303,-0.0029670416736241913,-0.0024725325110559284,-0.001978024557745141,-0.0014835175718360752,-0.0009890113114758166,-0.0004945055348135803,0.0],"x":[-0.99,-0.9895054945054945,-0.989010989010989,-0.9885164835164835,-0.988021978021978,-0.9875274725274725,-0.9870329670329671,-0.9865384615384616,-0.986043956043956,-0.9855494505494505,-0.9850549450549451,-0.9845604395604396,-0.984065934065934,-0.9835714285714285,-0.9830769230769231,-0.9825824175824176,-0.9820879120879121,-0.9815934065934065,-0.9810989010989011,-0.9806043956043956,-0.9801098901098901,-0.9796153846153847,-0.9791208791208791,-0.9786263736263736,-0.9781318681318681,-0.9776373626373627,-0.9771428571428571,-0.9766483516483516,-0.9761538461538461,-0.9756593406593407,-0.9751648351648352,-0.9746703296703296,-0.9741758241758242,-0.9736813186813187,-0.9731868131868132,-0.9726923076923077,-0.9721978021978022,-0.9717032967032967,-0.9712087912087912,-0.9707142857142858,-0.9702197802197802,-0.9697252747252747,-0.9692307692307692,-0.9687362637362638,-0.9682417582417583,-0.9677472527472527,-0.9672527472527472,-0.9667582417582418,-0.9662637362637363,-0.9657692307692308,-0.9652747252747252,-0.9647802197802198,-0.9642857142857143,-0.9637912087912088,-0.9632967032967032,-0.9628021978021978,-0.9623076923076923,-0.9618131868131868,-0.9613186813186814,-0.9608241758241758,-0.9603296703296703,-0.9598351648351648,-0.9593406593406594,-0.9588461538461538,-0.9583516483516483,-0.9578571428571429,-0.9573626373626374,-0.9568681318681319,-0.9563736263736263,-0.9558791208791209,-0.9553846153846154,-0.9548901098901099,-0.9543956043956044,-0.9539010989010989,-0.9534065934065934,-0.9529120879120879,-0.9524175824175825,-0.9519230769230769,-0.9514285714285714,-0.9509340659340659,-0.9504395604395605,-0.949945054945055,-0.9494505494505494,-0.9489560439560439,-0.9484615384615385,-0.947967032967033,-0.9474725274725275,-0.9469780219780219,-0.9464835164835165,-0.945989010989011,-0.9454945054945055,-0.945,-0.9445054945054945,-0.944010989010989,-0.9435164835164835,-0.9430219780219781,-0.9425274725274725,-0.942032967032967,-0.9415384615384615,-0.9410439560439561,-0.9405494505494505,-0.940054945054945,-0.9395604395604396,-0.9390659340659341,-0.9385714285714286,-0.938076923076923,-0.9375824175824176,-0.9370879120879121,-0.9365934065934066,-0.9360989010989011,-0.9356043956043956,-0.9351098901098901,-0.9346153846153846,-0.9341208791208792,-0.9336263736263736,-0.9331318681318681,-0.9326373626373626,-0.9321428571428572,-0.9316483516483517,-0.9311538461538461,-0.9306593406593406,-0.9301648351648352,-0.9296703296703297,-0.9291758241758242,-0.9286813186813186,-0.9281868131868132,-0.9276923076923077,-0.9271978021978022,-0.9267032967032967,-0.9262087912087912,-0.9257142857142857,-0.9252197802197802,-0.9247252747252748,-0.9242307692307692,-0.9237362637362637,-0.9232417582417582,-0.9227472527472528,-0.9222527472527473,-0.9217582417582417,-0.9212637362637363,-0.9207692307692308,-0.9202747252747253,-0.9197802197802197,-0.9192857142857143,-0.9187912087912088,-0.9182967032967033,-0.9178021978021978,-0.9173076923076923,-0.9168131868131868,-0.9163186813186813,-0.9158241758241759,-0.9153296703296703,-0.9148351648351648,-0.9143406593406593,-0.9138461538461539,-0.9133516483516484,-0.9128571428571428,-0.9123626373626373,-0.9118681318681319,-0.9113736263736264,-0.9108791208791209,-0.9103846153846153,-0.9098901098901099,-0.9093956043956044,-0.9089010989010989,-0.9084065934065934,-0.9079120879120879,-0.9074175824175824,-0.9069230769230769,-0.9064285714285715,-0.9059340659340659,-0.9054395604395604,-0.904945054945055,-0.9044505494505495,-0.903956043956044,-0.9034615384615384,-0.902967032967033,-0.9024725274725275,-0.901978021978022,-0.9014835164835164,-0.900989010989011,-0.9004945054945055,-0.9,-0.8995054945054946,-0.899010989010989,-0.8985164835164835,-0.898021978021978,-0.8975274725274726,-0.8970329670329671,-0.8965384615384615,-0.896043956043956,-0.8955494505494506,-0.8950549450549451,-0.8945604395604395,-0.894065934065934,-0.8935714285714286,-0.8930769230769231,-0.8925824175824176,-0.892087912087912,-0.8915934065934066,-0.8910989010989011,-0.8906043956043956,-0.8901098901098901,-0.8896153846153846,-0.8891208791208791,-0.8886263736263736,-0.8881318681318682,-0.8876373626373626,-0.8871428571428571,-0.8866483516483517,-0.8861538461538462,-0.8856593406593407,-0.8851648351648351,-0.8846703296703297,-0.8841758241758242,-0.8836813186813187,-0.8831868131868131,-0.8826923076923077,-0.8821978021978022,-0.8817032967032967,-0.8812087912087913,-0.8807142857142857,-0.8802197802197802,-0.8797252747252747,-0.8792307692307693,-0.8787362637362638,-0.8782417582417582,-0.8777472527472527,-0.8772527472527473,-0.8767582417582418,-0.8762637362637362,-0.8757692307692307,-0.8752747252747253,-0.8747802197802198,-0.8742857142857143,-0.8737912087912088,-0.8732967032967033,-0.8728021978021978,-0.8723076923076923,-0.8718131868131868,-0.8713186813186813,-0.8708241758241758,-0.8703296703296703,-0.8698351648351649,-0.8693406593406593,-0.8688461538461538,-0.8683516483516484,-0.8678571428571429,-0.8673626373626374,-0.8668681318681318,-0.8663736263736264,-0.8658791208791209,-0.8653846153846154,-0.8648901098901098,-0.8643956043956044,-0.8639010989010989,-0.8634065934065934,-0.862912087912088,-0.8624175824175824,-0.8619230769230769,-0.8614285714285714,-0.860934065934066,-0.8604395604395605,-0.8599450549450549,-0.8594505494505494,-0.858956043956044,-0.8584615384615385,-0.8579670329670329,-0.8574725274725274,-0.856978021978022,-0.8564835164835165,-0.855989010989011,-0.8554945054945055,-0.855,-0.8545054945054945,-0.854010989010989,-0.8535164835164836,-0.853021978021978,-0.8525274725274725,-0.852032967032967,-0.8515384615384616,-0.851043956043956,-0.8505494505494505,-0.850054945054945,-0.8495604395604396,-0.8490659340659341,-0.8485714285714285,-0.8480769230769231,-0.8475824175824176,-0.8470879120879121,-0.8465934065934065,-0.8460989010989011,-0.8456043956043956,-0.8451098901098901,-0.8446153846153847,-0.8441208791208791,-0.8436263736263736,-0.8431318681318681,-0.8426373626373627,-0.8421428571428572,-0.8416483516483516,-0.8411538461538461,-0.8406593406593407,-0.8401648351648352,-0.8396703296703296,-0.8391758241758241,-0.8386813186813187,-0.8381868131868132,-0.8376923076923077,-0.8371978021978022,-0.8367032967032967,-0.8362087912087912,-0.8357142857142857,-0.8352197802197803,-0.8347252747252747,-0.8342307692307692,-0.8337362637362637,-0.8332417582417583,-0.8327472527472527,-0.8322527472527472,-0.8317582417582418,-0.8312637362637363,-0.8307692307692308,-0.8302747252747252,-0.8297802197802198,-0.8292857142857143,-0.8287912087912088,-0.8282967032967034,-0.8278021978021978,-0.8273076923076923,-0.8268131868131868,-0.8263186813186814,-0.8258241758241758,-0.8253296703296703,-0.8248351648351648,-0.8243406593406594,-0.8238461538461539,-0.8233516483516483,-0.8228571428571428,-0.8223626373626374,-0.8218681318681319,-0.8213736263736263,-0.8208791208791208,-0.8203846153846154,-0.8198901098901099,-0.8193956043956044,-0.8189010989010989,-0.8184065934065934,-0.8179120879120879,-0.8174175824175824,-0.816923076923077,-0.8164285714285714,-0.8159340659340659,-0.8154395604395605,-0.814945054945055,-0.8144505494505494,-0.8139560439560439,-0.8134615384615385,-0.812967032967033,-0.8124725274725275,-0.8119780219780219,-0.8114835164835165,-0.810989010989011,-0.8104945054945055,-0.81,-0.8095054945054945,-0.809010989010989,-0.8085164835164835,-0.8080219780219781,-0.8075274725274725,-0.807032967032967,-0.8065384615384615,-0.8060439560439561,-0.8055494505494506,-0.805054945054945,-0.8045604395604395,-0.8040659340659341,-0.8035714285714286,-0.803076923076923,-0.8025824175824176,-0.8020879120879121,-0.8015934065934066,-0.8010989010989011,-0.8006043956043956,-0.8001098901098901,-0.7996153846153846,-0.7991208791208791,-0.7986263736263737,-0.7981318681318681,-0.7976373626373626,-0.7971428571428572,-0.7966483516483517,-0.7961538461538461,-0.7956593406593406,-0.7951648351648352,-0.7946703296703297,-0.7941758241758242,-0.7936813186813186,-0.7931868131868132,-0.7926923076923077,-0.7921978021978022,-0.7917032967032968,-0.7912087912087912,-0.7907142857142857,-0.7902197802197802,-0.7897252747252748,-0.7892307692307692,-0.7887362637362637,-0.7882417582417582,-0.7877472527472528,-0.7872527472527473,-0.7867582417582417,-0.7862637362637362,-0.7857692307692308,-0.7852747252747253,-0.7847802197802198,-0.7842857142857143,-0.7837912087912088,-0.7832967032967033,-0.7828021978021978,-0.7823076923076923,-0.7818131868131868,-0.7813186813186813,-0.7808241758241758,-0.7803296703296704,-0.7798351648351648,-0.7793406593406593,-0.7788461538461539,-0.7783516483516484,-0.7778571428571428,-0.7773626373626373,-0.7768681318681319,-0.7763736263736264,-0.7758791208791209,-0.7753846153846153,-0.7748901098901099,-0.7743956043956044,-0.7739010989010989,-0.7734065934065935,-0.7729120879120879,-0.7724175824175824,-0.7719230769230769,-0.7714285714285715,-0.7709340659340659,-0.7704395604395604,-0.7699450549450549,-0.7694505494505495,-0.768956043956044,-0.7684615384615384,-0.767967032967033,-0.7674725274725275,-0.766978021978022,-0.7664835164835165,-0.765989010989011,-0.7654945054945055,-0.765,-0.7645054945054945,-0.764010989010989,-0.7635164835164835,-0.763021978021978,-0.7625274725274725,-0.7620329670329671,-0.7615384615384615,-0.761043956043956,-0.7605494505494506,-0.7600549450549451,-0.7595604395604396,-0.759065934065934,-0.7585714285714286,-0.7580769230769231,-0.7575824175824176,-0.757087912087912,-0.7565934065934066,-0.7560989010989011,-0.7556043956043956,-0.7551098901098902,-0.7546153846153846,-0.7541208791208791,-0.7536263736263736,-0.7531318681318682,-0.7526373626373626,-0.7521428571428571,-0.7516483516483516,-0.7511538461538462,-0.7506593406593407,-0.7501648351648351,-0.7496703296703296,-0.7491758241758242,-0.7486813186813187,-0.7481868131868132,-0.7476923076923077,-0.7471978021978022,-0.7467032967032967,-0.7462087912087912,-0.7457142857142857,-0.7452197802197802,-0.7447252747252747,-0.7442307692307693,-0.7437362637362638,-0.7432417582417582,-0.7427472527472527,-0.7422527472527473,-0.7417582417582418,-0.7412637362637363,-0.7407692307692307,-0.7402747252747253,-0.7397802197802198,-0.7392857142857143,-0.7387912087912087,-0.7382967032967033,-0.7378021978021978,-0.7373076923076923,-0.7368131868131869,-0.7363186813186813,-0.7358241758241758,-0.7353296703296703,-0.7348351648351649,-0.7343406593406593,-0.7338461538461538,-0.7333516483516483,-0.7328571428571429,-0.7323626373626374,-0.7318681318681318,-0.7313736263736264,-0.7308791208791209,-0.7303846153846154,-0.7298901098901099,-0.7293956043956044,-0.7289010989010989,-0.7284065934065934,-0.727912087912088,-0.7274175824175824,-0.7269230769230769,-0.7264285714285714,-0.725934065934066,-0.7254395604395605,-0.7249450549450549,-0.7244505494505494,-0.723956043956044,-0.7234615384615385,-0.722967032967033,-0.7224725274725274,-0.721978021978022,-0.7214835164835165,-0.720989010989011,-0.7204945054945054,-0.72,-0.7195054945054945,-0.719010989010989,-0.7185164835164836,-0.718021978021978,-0.7175274725274725,-0.717032967032967,-0.7165384615384616,-0.7160439560439561,-0.7155494505494505,-0.715054945054945,-0.7145604395604396,-0.7140659340659341,-0.7135714285714285,-0.713076923076923,-0.7125824175824176,-0.7120879120879121,-0.7115934065934066,-0.7110989010989011,-0.7106043956043956,-0.7101098901098901,-0.7096153846153846,-0.7091208791208791,-0.7086263736263736,-0.7081318681318681,-0.7076373626373627,-0.7071428571428572,-0.7066483516483516,-0.7061538461538461,-0.7056593406593407,-0.7051648351648352,-0.7046703296703297,-0.7041758241758241,-0.7036813186813187,-0.7031868131868132,-0.7026923076923077,-0.7021978021978021,-0.7017032967032967,-0.7012087912087912,-0.7007142857142857,-0.7002197802197803,-0.6997252747252747,-0.6992307692307692,-0.6987362637362637,-0.6982417582417583,-0.6977472527472528,-0.6972527472527472,-0.6967582417582417,-0.6962637362637363,-0.6957692307692308,-0.6952747252747252,-0.6947802197802198,-0.6942857142857143,-0.6937912087912088,-0.6932967032967033,-0.6928021978021978,-0.6923076923076923,-0.6918131868131868,-0.6913186813186813,-0.6908241758241759,-0.6903296703296703,-0.6898351648351648,-0.6893406593406594,-0.6888461538461539,-0.6883516483516483,-0.6878571428571428,-0.6873626373626374,-0.6868681318681319,-0.6863736263736264,-0.6858791208791208,-0.6853846153846154,-0.6848901098901099,-0.6843956043956044,-0.6839010989010988,-0.6834065934065934,-0.6829120879120879,-0.6824175824175824,-0.681923076923077,-0.6814285714285714,-0.6809340659340659,-0.6804395604395604,-0.679945054945055,-0.6794505494505495,-0.6789560439560439,-0.6784615384615384,-0.677967032967033,-0.6774725274725275,-0.6769780219780219,-0.6764835164835165,-0.675989010989011,-0.6754945054945055,-0.675,-0.6745054945054945,-0.674010989010989,-0.6735164835164835,-0.673021978021978,-0.6725274725274726,-0.672032967032967,-0.6715384615384615,-0.6710439560439561,-0.6705494505494506,-0.670054945054945,-0.6695604395604395,-0.6690659340659341,-0.6685714285714286,-0.6680769230769231,-0.6675824175824175,-0.6670879120879121,-0.6665934065934066,-0.6660989010989011,-0.6656043956043955,-0.6651098901098901,-0.6646153846153846,-0.6641208791208791,-0.6636263736263737,-0.6631318681318681,-0.6626373626373626,-0.6621428571428571,-0.6616483516483517,-0.6611538461538462,-0.6606593406593406,-0.6601648351648352,-0.6596703296703297,-0.6591758241758242,-0.6586813186813186,-0.6581868131868132,-0.6576923076923077,-0.6571978021978022,-0.6567032967032967,-0.6562087912087912,-0.6557142857142857,-0.6552197802197802,-0.6547252747252748,-0.6542307692307693,-0.6537362637362637,-0.6532417582417582,-0.6527472527472528,-0.6522527472527473,-0.6517582417582417,-0.6512637362637362,-0.6507692307692308,-0.6502747252747253,-0.6497802197802198,-0.6492857142857142,-0.6487912087912088,-0.6482967032967033,-0.6478021978021978,-0.6473076923076924,-0.6468131868131868,-0.6463186813186813,-0.6458241758241758,-0.6453296703296704,-0.6448351648351648,-0.6443406593406593,-0.6438461538461538,-0.6433516483516484,-0.6428571428571429,-0.6423626373626373,-0.6418681318681319,-0.6413736263736264,-0.6408791208791209,-0.6403846153846153,-0.6398901098901099,-0.6393956043956044,-0.6389010989010989,-0.6384065934065934,-0.6379120879120879,-0.6374175824175824,-0.6369230769230769,-0.6364285714285715,-0.635934065934066,-0.6354395604395604,-0.6349450549450549,-0.6344505494505495,-0.633956043956044,-0.6334615384615384,-0.6329670329670329,-0.6324725274725275,-0.631978021978022,-0.6314835164835165,-0.630989010989011,-0.6304945054945055,-0.63,-0.6295054945054945,-0.6290109890109891,-0.6285164835164835,-0.628021978021978,-0.6275274725274725,-0.6270329670329671,-0.6265384615384615,-0.626043956043956,-0.6255494505494505,-0.6250549450549451,-0.6245604395604396,-0.624065934065934,-0.6235714285714286,-0.6230769230769231,-0.6225824175824176,-0.6220879120879121,-0.6215934065934066,-0.6210989010989011,-0.6206043956043956,-0.6201098901098901,-0.6196153846153846,-0.6191208791208791,-0.6186263736263736,-0.6181318681318682,-0.6176373626373627,-0.6171428571428571,-0.6166483516483516,-0.6161538461538462,-0.6156593406593407,-0.6151648351648351,-0.6146703296703296,-0.6141758241758242,-0.6136813186813187,-0.6131868131868132,-0.6126923076923076,-0.6121978021978022,-0.6117032967032967,-0.6112087912087912,-0.6107142857142858,-0.6102197802197802,-0.6097252747252747,-0.6092307692307692,-0.6087362637362638,-0.6082417582417582,-0.6077472527472527,-0.6072527472527472,-0.6067582417582418,-0.6062637362637363,-0.6057692307692307,-0.6052747252747253,-0.6047802197802198,-0.6042857142857143,-0.6037912087912088,-0.6032967032967033,-0.6028021978021978,-0.6023076923076923,-0.6018131868131869,-0.6013186813186813,-0.6008241758241758,-0.6003296703296703,-0.5998351648351649,-0.5993406593406594,-0.5988461538461538,-0.5983516483516483,-0.5978571428571429,-0.5973626373626374,-0.5968681318681318,-0.5963736263736263,-0.5958791208791209,-0.5953846153846154,-0.5948901098901099,-0.5943956043956043,-0.5939010989010989,-0.5934065934065934,-0.5929120879120879,-0.5924175824175825,-0.5919230769230769,-0.5914285714285714,-0.5909340659340659,-0.5904395604395605,-0.5899450549450549,-0.5894505494505494,-0.588956043956044,-0.5884615384615385,-0.587967032967033,-0.5874725274725274,-0.586978021978022,-0.5864835164835165,-0.585989010989011,-0.5854945054945055,-0.585,-0.5845054945054945,-0.584010989010989,-0.5835164835164836,-0.583021978021978,-0.5825274725274725,-0.582032967032967,-0.5815384615384616,-0.5810439560439561,-0.5805494505494505,-0.580054945054945,-0.5795604395604396,-0.5790659340659341,-0.5785714285714286,-0.578076923076923,-0.5775824175824176,-0.5770879120879121,-0.5765934065934066,-0.576098901098901,-0.5756043956043956,-0.5751098901098901,-0.5746153846153846,-0.5741208791208792,-0.5736263736263736,-0.5731318681318681,-0.5726373626373626,-0.5721428571428572,-0.5716483516483516,-0.5711538461538461,-0.5706593406593407,-0.5701648351648352,-0.5696703296703297,-0.5691758241758241,-0.5686813186813187,-0.5681868131868132,-0.5676923076923077,-0.5671978021978022,-0.5667032967032967,-0.5662087912087912,-0.5657142857142857,-0.5652197802197803,-0.5647252747252747,-0.5642307692307692,-0.5637362637362637,-0.5632417582417583,-0.5627472527472528,-0.5622527472527472,-0.5617582417582417,-0.5612637362637363,-0.5607692307692308,-0.5602747252747253,-0.5597802197802197,-0.5592857142857143,-0.5587912087912088,-0.5582967032967033,-0.5578021978021978,-0.5573076923076923,-0.5568131868131868,-0.5563186813186813,-0.5558241758241759,-0.5553296703296703,-0.5548351648351648,-0.5543406593406593,-0.5538461538461539,-0.5533516483516484,-0.5528571428571428,-0.5523626373626374,-0.5518681318681319,-0.5513736263736264,-0.5508791208791208,-0.5503846153846154,-0.5498901098901099,-0.5493956043956044,-0.548901098901099,-0.5484065934065934,-0.5479120879120879,-0.5474175824175824,-0.546923076923077,-0.5464285714285714,-0.5459340659340659,-0.5454395604395604,-0.544945054945055,-0.5444505494505495,-0.5439560439560439,-0.5434615384615384,-0.542967032967033,-0.5424725274725275,-0.541978021978022,-0.5414835164835164,-0.540989010989011,-0.5404945054945055,-0.54,-0.5395054945054945,-0.539010989010989,-0.5385164835164835,-0.538021978021978,-0.5375274725274726,-0.537032967032967,-0.5365384615384615,-0.536043956043956,-0.5355494505494506,-0.5350549450549451,-0.5345604395604395,-0.5340659340659341,-0.5335714285714286,-0.5330769230769231,-0.5325824175824175,-0.5320879120879121,-0.5315934065934066,-0.5310989010989011,-0.5306043956043957,-0.5301098901098901,-0.5296153846153846,-0.5291208791208791,-0.5286263736263737,-0.5281318681318682,-0.5276373626373626,-0.5271428571428571,-0.5266483516483517,-0.5261538461538462,-0.5256593406593406,-0.5251648351648351,-0.5246703296703297,-0.5241758241758242,-0.5236813186813187,-0.5231868131868131,-0.5226923076923077,-0.5221978021978022,-0.5217032967032967,-0.5212087912087912,-0.5207142857142857,-0.5202197802197802,-0.5197252747252747,-0.5192307692307693,-0.5187362637362637,-0.5182417582417582,-0.5177472527472528,-0.5172527472527473,-0.5167582417582418,-0.5162637362637362,-0.5157692307692308,-0.5152747252747253,-0.5147802197802198,-0.5142857142857142,-0.5137912087912088,-0.5132967032967033,-0.5128021978021978,-0.5123076923076924,-0.5118131868131868,-0.5113186813186813,-0.5108241758241758,-0.5103296703296704,-0.5098351648351649,-0.5093406593406593,-0.5088461538461538,-0.5083516483516484,-0.5078571428571429,-0.5073626373626373,-0.5068681318681318,-0.5063736263736264,-0.5058791208791209,-0.5053846153846154,-0.5048901098901099,-0.5043956043956044,-0.5039010989010989,-0.5034065934065934,-0.5029120879120879,-0.5024175824175824,-0.5019230769230769,-0.5014285714285714,-0.500934065934066,-0.5004395604395604,-0.4999450549450549,-0.49945054945054945,-0.498956043956044,-0.49846153846153846,-0.497967032967033,-0.49747252747252746,-0.496978021978022,-0.49648351648351646,-0.495989010989011,-0.4954945054945055,-0.495,-0.4945054945054945,-0.494010989010989,-0.49351648351648353,-0.493021978021978,-0.49252747252747253,-0.492032967032967,-0.49153846153846154,-0.49104395604395606,-0.49054945054945054,-0.49005494505494507,-0.48956043956043954,-0.48906593406593407,-0.48857142857142855,-0.4880769230769231,-0.4875824175824176,-0.4870879120879121,-0.4865934065934066,-0.4860989010989011,-0.4856043956043956,-0.4851098901098901,-0.4846153846153846,-0.48412087912087914,-0.4836263736263736,-0.48313186813186815,-0.4826373626373626,-0.48214285714285715,-0.4816483516483516,-0.48115384615384615,-0.4806593406593407,-0.48016483516483516,-0.4796703296703297,-0.47917582417582416,-0.4786813186813187,-0.47818681318681316,-0.4776923076923077,-0.4771978021978022,-0.4767032967032967,-0.4762087912087912,-0.4757142857142857,-0.47521978021978023,-0.4747252747252747,-0.47423076923076923,-0.47373626373626376,-0.47324175824175824,-0.47274725274725277,-0.47225274725274724,-0.47175824175824177,-0.47126373626373624,-0.4707692307692308,-0.47027472527472525,-0.4697802197802198,-0.4692857142857143,-0.4687912087912088,-0.4682967032967033,-0.4678021978021978,-0.4673076923076923,-0.4668131868131868,-0.4663186813186813,-0.46582417582417585,-0.4653296703296703,-0.46483516483516485,-0.4643406593406593,-0.46384615384615385,-0.4633516483516483,-0.46285714285714286,-0.4623626373626374,-0.46186813186813186,-0.4613736263736264,-0.46087912087912086,-0.4603846153846154,-0.45989010989010987,-0.4593956043956044,-0.4589010989010989,-0.4584065934065934,-0.45791208791208793,-0.4574175824175824,-0.45692307692307693,-0.4564285714285714,-0.45593406593406594,-0.45543956043956046,-0.45494505494505494,-0.45445054945054947,-0.45395604395604394,-0.45346153846153847,-0.45296703296703295,-0.4524725274725275,-0.451978021978022,-0.4514835164835165,-0.450989010989011,-0.4504945054945055,-0.45,-0.4495054945054945,-0.449010989010989,-0.44851648351648354,-0.448021978021978,-0.44752747252747255,-0.447032967032967,-0.44653846153846155,-0.446043956043956,-0.44554945054945055,-0.44505494505494503,-0.44456043956043956,-0.4440659340659341,-0.44357142857142856,-0.4430769230769231,-0.44258241758241756,-0.4420879120879121,-0.44159340659340657,-0.4410989010989011,-0.4406043956043956,-0.4401098901098901,-0.43961538461538463,-0.4391208791208791,-0.43862637362637363,-0.4381318681318681,-0.43763736263736264,-0.43714285714285717,-0.43664835164835164,-0.43615384615384617,-0.43565934065934064,-0.4351648351648352,-0.43467032967032965,-0.4341758241758242,-0.4336813186813187,-0.4331868131868132,-0.4326923076923077,-0.4321978021978022,-0.4317032967032967,-0.4312087912087912,-0.4307142857142857,-0.43021978021978025,-0.4297252747252747,-0.42923076923076925,-0.4287362637362637,-0.42824175824175825,-0.4277472527472527,-0.42725274725274726,-0.4267582417582418,-0.42626373626373626,-0.4257692307692308,-0.42527472527472526,-0.4247802197802198,-0.42428571428571427,-0.4237912087912088,-0.42329670329670327,-0.4228021978021978,-0.42230769230769233,-0.4218131868131868,-0.42131868131868133,-0.4208241758241758,-0.42032967032967034,-0.4198351648351648,-0.41934065934065934,-0.41884615384615387,-0.41835164835164834,-0.41785714285714287,-0.41736263736263735,-0.4168681318681319,-0.41637362637362635,-0.4158791208791209,-0.4153846153846154,-0.4148901098901099,-0.4143956043956044,-0.4139010989010989,-0.4134065934065934,-0.4129120879120879,-0.4124175824175824,-0.41192307692307695,-0.4114285714285714,-0.41093406593406595,-0.4104395604395604,-0.40994505494505495,-0.40945054945054943,-0.40895604395604396,-0.4084615384615385,-0.40796703296703296,-0.4074725274725275,-0.40697802197802196,-0.4064835164835165,-0.40598901098901097,-0.4054945054945055,-0.405,-0.4045054945054945,-0.40401098901098903,-0.4035164835164835,-0.40302197802197803,-0.4025274725274725,-0.40203296703296704,-0.4015384615384615,-0.40104395604395604,-0.40054945054945057,-0.40005494505494504,-0.3995604395604396,-0.39906593406593405,-0.3985714285714286,-0.39807692307692305,-0.3975824175824176,-0.3970879120879121,-0.3965934065934066,-0.3960989010989011,-0.3956043956043956,-0.3951098901098901,-0.3946153846153846,-0.3941208791208791,-0.39362637362637365,-0.3931318681318681,-0.39263736263736265,-0.3921428571428571,-0.39164835164835166,-0.39115384615384613,-0.39065934065934066,-0.3901648351648352,-0.38967032967032966,-0.3891758241758242,-0.38868131868131867,-0.3881868131868132,-0.38769230769230767,-0.3871978021978022,-0.38670329670329673,-0.3862087912087912,-0.38571428571428573,-0.3852197802197802,-0.38472527472527474,-0.3842307692307692,-0.38373626373626374,-0.38324175824175827,-0.38274725274725274,-0.38225274725274727,-0.38175824175824175,-0.3812637362637363,-0.38076923076923075,-0.3802747252747253,-0.3797802197802198,-0.3792857142857143,-0.3787912087912088,-0.3782967032967033,-0.3778021978021978,-0.3773076923076923,-0.3768131868131868,-0.3763186813186813,-0.3758241758241758,-0.37532967032967035,-0.3748351648351648,-0.37434065934065935,-0.37384615384615383,-0.37335164835164836,-0.37285714285714283,-0.37236263736263736,-0.3718681318681319,-0.37137362637362636,-0.3708791208791209,-0.37038461538461537,-0.3698901098901099,-0.36939560439560437,-0.3689010989010989,-0.36840659340659343,-0.3679120879120879,-0.36741758241758243,-0.3669230769230769,-0.36642857142857144,-0.3659340659340659,-0.36543956043956044,-0.36494505494505497,-0.36445054945054944,-0.363956043956044,-0.36346153846153845,-0.362967032967033,-0.36247252747252745,-0.361978021978022,-0.3614835164835165,-0.360989010989011,-0.3604945054945055,-0.36,-0.3595054945054945,-0.359010989010989,-0.3585164835164835,-0.35802197802197805,-0.3575274725274725,-0.35703296703296705,-0.3565384615384615,-0.35604395604395606,-0.35554945054945053,-0.35505494505494506,-0.35456043956043953,-0.35406593406593406,-0.3535714285714286,-0.35307692307692307,-0.3525824175824176,-0.35208791208791207,-0.3515934065934066,-0.3510989010989011,-0.3506043956043956,-0.35010989010989013,-0.3496153846153846,-0.34912087912087914,-0.3486263736263736,-0.34813186813186814,-0.3476373626373626,-0.34714285714285714,-0.34664835164835167,-0.34615384615384615,-0.3456593406593407,-0.34516483516483515,-0.3446703296703297,-0.34417582417582415,-0.3436813186813187,-0.3431868131868132,-0.3426923076923077,-0.3421978021978022,-0.3417032967032967,-0.3412087912087912,-0.3407142857142857,-0.3402197802197802,-0.33972527472527475,-0.3392307692307692,-0.33873626373626375,-0.33824175824175823,-0.33774725274725276,-0.33725274725274723,-0.33675824175824176,-0.3362637362637363,-0.33576923076923076,-0.3352747252747253,-0.33478021978021977,-0.3342857142857143,-0.33379120879120877,-0.3332967032967033,-0.3328021978021978,-0.3323076923076923,-0.33181318681318683,-0.3313186813186813,-0.33082417582417584,-0.3303296703296703,-0.32983516483516484,-0.3293406593406593,-0.32884615384615384,-0.3283516483516484,-0.32785714285714285,-0.3273626373626374,-0.32686813186813185,-0.3263736263736264,-0.32587912087912085,-0.3253846153846154,-0.3248901098901099,-0.3243956043956044,-0.3239010989010989,-0.3234065934065934,-0.3229120879120879,-0.3224175824175824,-0.3219230769230769,-0.32142857142857145,-0.3209340659340659,-0.32043956043956046,-0.31994505494505493,-0.31945054945054946,-0.31895604395604393,-0.31846153846153846,-0.317967032967033,-0.31747252747252747,-0.316978021978022,-0.31648351648351647,-0.315989010989011,-0.3154945054945055,-0.315,-0.31450549450549453,-0.314010989010989,-0.31351648351648354,-0.313021978021978,-0.31252747252747254,-0.312032967032967,-0.31153846153846154,-0.31104395604395607,-0.31054945054945055,-0.3100549450549451,-0.30956043956043955,-0.3090659340659341,-0.30857142857142855,-0.3080769230769231,-0.30758241758241756,-0.3070879120879121,-0.3065934065934066,-0.3060989010989011,-0.3056043956043956,-0.3051098901098901,-0.3046153846153846,-0.3041208791208791,-0.3036263736263736,-0.30313186813186815,-0.30263736263736263,-0.30214285714285716,-0.30164835164835163,-0.30115384615384616,-0.30065934065934063,-0.30016483516483516,-0.2996703296703297,-0.29917582417582417,-0.2986813186813187,-0.29818681318681317,-0.2976923076923077,-0.2971978021978022,-0.2967032967032967,-0.29620879120879123,-0.2957142857142857,-0.29521978021978024,-0.2947252747252747,-0.29423076923076924,-0.2937362637362637,-0.29324175824175824,-0.2927472527472528,-0.29225274725274725,-0.2917582417582418,-0.29126373626373625,-0.2907692307692308,-0.29027472527472525,-0.2897802197802198,-0.2892857142857143,-0.2887912087912088,-0.2882967032967033,-0.2878021978021978,-0.2873076923076923,-0.2868131868131868,-0.2863186813186813,-0.2858241758241758,-0.2853296703296703,-0.28483516483516486,-0.28434065934065933,-0.28384615384615386,-0.28335164835164833,-0.28285714285714286,-0.28236263736263734,-0.28186813186813187,-0.2813736263736264,-0.28087912087912087,-0.2803846153846154,-0.2798901098901099,-0.2793956043956044,-0.2789010989010989,-0.2784065934065934,-0.27791208791208794,-0.2774175824175824,-0.27692307692307694,-0.2764285714285714,-0.27593406593406594,-0.2754395604395604,-0.27494505494505495,-0.2744505494505495,-0.27395604395604395,-0.2734615384615385,-0.27296703296703295,-0.2724725274725275,-0.27197802197802196,-0.2714835164835165,-0.270989010989011,-0.2704945054945055,-0.27,-0.2695054945054945,-0.269010989010989,-0.2685164835164835,-0.268021978021978,-0.26752747252747255,-0.26703296703296703,-0.26653846153846156,-0.26604395604395603,-0.26554945054945056,-0.26505494505494503,-0.26456043956043956,-0.2640659340659341,-0.26357142857142857,-0.2630769230769231,-0.26258241758241757,-0.2620879120879121,-0.2615934065934066,-0.2610989010989011,-0.2606043956043956,-0.2601098901098901,-0.25961538461538464,-0.2591208791208791,-0.25862637362637364,-0.2581318681318681,-0.25763736263736264,-0.2571428571428571,-0.25664835164835165,-0.2561538461538462,-0.25565934065934065,-0.2551648351648352,-0.25467032967032965,-0.2541758241758242,-0.25368131868131866,-0.2531868131868132,-0.2526923076923077,-0.2521978021978022,-0.2517032967032967,-0.2512087912087912,-0.2507142857142857,-0.2502197802197802,-0.24972527472527473,-0.24923076923076923,-0.24873626373626373,-0.24824175824175823,-0.24774725274725276,-0.24725274725274726,-0.24675824175824176,-0.24626373626373627,-0.24576923076923077,-0.24527472527472527,-0.24478021978021977,-0.24428571428571427,-0.2437912087912088,-0.2432967032967033,-0.2428021978021978,-0.2423076923076923,-0.2418131868131868,-0.2413186813186813,-0.2408241758241758,-0.24032967032967034,-0.23983516483516484,-0.23934065934065935,-0.23884615384615385,-0.23835164835164835,-0.23785714285714285,-0.23736263736263735,-0.23686813186813188,-0.23637362637362638,-0.23587912087912088,-0.2353846153846154,-0.2348901098901099,-0.2343956043956044,-0.2339010989010989,-0.2334065934065934,-0.23291208791208792,-0.23241758241758242,-0.23192307692307693,-0.23142857142857143,-0.23093406593406593,-0.23043956043956043,-0.22994505494505493,-0.22945054945054946,-0.22895604395604396,-0.22846153846153847,-0.22796703296703297,-0.22747252747252747,-0.22697802197802197,-0.22648351648351647,-0.225989010989011,-0.2254945054945055,-0.225,-0.2245054945054945,-0.224010989010989,-0.2235164835164835,-0.223021978021978,-0.22252747252747251,-0.22203296703296704,-0.22153846153846155,-0.22104395604395605,-0.22054945054945055,-0.22005494505494505,-0.21956043956043955,-0.21906593406593405,-0.21857142857142858,-0.21807692307692308,-0.2175824175824176,-0.2170879120879121,-0.2165934065934066,-0.2160989010989011,-0.2156043956043956,-0.21510989010989012,-0.21461538461538462,-0.21412087912087913,-0.21362637362637363,-0.21313186813186813,-0.21263736263736263,-0.21214285714285713,-0.21164835164835163,-0.21115384615384616,-0.21065934065934067,-0.21016483516483517,-0.20967032967032967,-0.20917582417582417,-0.20868131868131867,-0.20818681318681317,-0.2076923076923077,-0.2071978021978022,-0.2067032967032967,-0.2062087912087912,-0.2057142857142857,-0.2052197802197802,-0.20472527472527471,-0.20423076923076924,-0.20373626373626375,-0.20324175824175825,-0.20274725274725275,-0.20225274725274725,-0.20175824175824175,-0.20126373626373625,-0.20076923076923076,-0.20027472527472528,-0.1997802197802198,-0.1992857142857143,-0.1987912087912088,-0.1982967032967033,-0.1978021978021978,-0.1973076923076923,-0.19681318681318682,-0.19631868131868133,-0.19582417582417583,-0.19532967032967033,-0.19483516483516483,-0.19434065934065933,-0.19384615384615383,-0.19335164835164836,-0.19285714285714287,-0.19236263736263737,-0.19186813186813187,-0.19137362637362637,-0.19087912087912087,-0.19038461538461537,-0.1898901098901099,-0.1893956043956044,-0.1889010989010989,-0.1884065934065934,-0.1879120879120879,-0.1874175824175824,-0.18692307692307691,-0.18642857142857142,-0.18593406593406595,-0.18543956043956045,-0.18494505494505495,-0.18445054945054945,-0.18395604395604395,-0.18346153846153845,-0.18296703296703296,-0.18247252747252748,-0.181978021978022,-0.1814835164835165,-0.180989010989011,-0.1804945054945055,-0.18,-0.1795054945054945,-0.17901098901098902,-0.17851648351648353,-0.17802197802197803,-0.17752747252747253,-0.17703296703296703,-0.17653846153846153,-0.17604395604395603,-0.17554945054945054,-0.17505494505494507,-0.17456043956043957,-0.17406593406593407,-0.17357142857142857,-0.17307692307692307,-0.17258241758241757,-0.17208791208791208,-0.1715934065934066,-0.1710989010989011,-0.1706043956043956,-0.1701098901098901,-0.1696153846153846,-0.16912087912087911,-0.16862637362637362,-0.16813186813186815,-0.16763736263736265,-0.16714285714285715,-0.16664835164835165,-0.16615384615384615,-0.16565934065934065,-0.16516483516483516,-0.16467032967032966,-0.1641758241758242,-0.1636813186813187,-0.1631868131868132,-0.1626923076923077,-0.1621978021978022,-0.1617032967032967,-0.1612087912087912,-0.16071428571428573,-0.16021978021978023,-0.15972527472527473,-0.15923076923076923,-0.15873626373626373,-0.15824175824175823,-0.15774725274725274,-0.15725274725274727,-0.15675824175824177,-0.15626373626373627,-0.15576923076923077,-0.15527472527472527,-0.15478021978021977,-0.15428571428571428,-0.15379120879120878,-0.1532967032967033,-0.1528021978021978,-0.1523076923076923,-0.1518131868131868,-0.15131868131868131,-0.15082417582417582,-0.15032967032967032,-0.14983516483516485,-0.14934065934065935,-0.14884615384615385,-0.14835164835164835,-0.14785714285714285,-0.14736263736263736,-0.14686813186813186,-0.1463736263736264,-0.1458791208791209,-0.1453846153846154,-0.1448901098901099,-0.1443956043956044,-0.1439010989010989,-0.1434065934065934,-0.1429120879120879,-0.14241758241758243,-0.14192307692307693,-0.14142857142857143,-0.14093406593406593,-0.14043956043956043,-0.13994505494505494,-0.13945054945054944,-0.13895604395604397,-0.13846153846153847,-0.13796703296703297,-0.13747252747252747,-0.13697802197802197,-0.13648351648351648,-0.13598901098901098,-0.1354945054945055,-0.135,-0.1345054945054945,-0.134010989010989,-0.13351648351648351,-0.13302197802197802,-0.13252747252747252,-0.13203296703296705,-0.13153846153846155,-0.13104395604395605,-0.13054945054945055,-0.13005494505494505,-0.12956043956043956,-0.12906593406593406,-0.12857142857142856,-0.1280769230769231,-0.1275824175824176,-0.1270879120879121,-0.1265934065934066,-0.1260989010989011,-0.1256043956043956,-0.1251098901098901,-0.12461538461538461,-0.12412087912087912,-0.12362637362637363,-0.12313186813186813,-0.12263736263736263,-0.12214285714285714,-0.12164835164835165,-0.12115384615384615,-0.12065934065934066,-0.12016483516483517,-0.11967032967032967,-0.11917582417582417,-0.11868131868131868,-0.11818681318681319,-0.1176923076923077,-0.1171978021978022,-0.1167032967032967,-0.11620879120879121,-0.11571428571428571,-0.11521978021978022,-0.11472527472527473,-0.11423076923076923,-0.11373626373626373,-0.11324175824175824,-0.11274725274725275,-0.11225274725274725,-0.11175824175824176,-0.11126373626373626,-0.11076923076923077,-0.11027472527472527,-0.10978021978021978,-0.10928571428571429,-0.1087912087912088,-0.1082967032967033,-0.1078021978021978,-0.10730769230769231,-0.10681318681318681,-0.10631868131868132,-0.10582417582417582,-0.10532967032967033,-0.10483516483516483,-0.10434065934065934,-0.10384615384615385,-0.10335164835164835,-0.10285714285714286,-0.10236263736263736,-0.10186813186813187,-0.10137362637362637,-0.10087912087912088,-0.10038461538461538,-0.0998901098901099,-0.0993956043956044,-0.0989010989010989,-0.09840659340659341,-0.09791208791208791,-0.09741758241758242,-0.09692307692307692,-0.09642857142857143,-0.09593406593406593,-0.09543956043956044,-0.09494505494505495,-0.09445054945054945,-0.09395604395604396,-0.09346153846153846,-0.09296703296703297,-0.09247252747252747,-0.09197802197802198,-0.09148351648351648,-0.090989010989011,-0.0904945054945055,-0.09,-0.08950549450549451,-0.08901098901098901,-0.08851648351648352,-0.08802197802197802,-0.08752747252747253,-0.08703296703296703,-0.08653846153846154,-0.08604395604395604,-0.08554945054945055,-0.08505494505494506,-0.08456043956043956,-0.08406593406593407,-0.08357142857142857,-0.08307692307692308,-0.08258241758241758,-0.0820879120879121,-0.0815934065934066,-0.0810989010989011,-0.0806043956043956,-0.08010989010989011,-0.07961538461538462,-0.07912087912087912,-0.07862637362637363,-0.07813186813186813,-0.07763736263736264,-0.07714285714285714,-0.07664835164835165,-0.07615384615384616,-0.07565934065934066,-0.07516483516483516,-0.07467032967032967,-0.07417582417582418,-0.07368131868131868,-0.0731868131868132,-0.0726923076923077,-0.0721978021978022,-0.0717032967032967,-0.07120879120879121,-0.07071428571428572,-0.07021978021978022,-0.06972527472527472,-0.06923076923076923,-0.06873626373626374,-0.06824175824175824,-0.06774725274725275,-0.06725274725274726,-0.06675824175824176,-0.06626373626373626,-0.06576923076923077,-0.06527472527472528,-0.06478021978021978,-0.06428571428571428,-0.0637912087912088,-0.0632967032967033,-0.0628021978021978,-0.06230769230769231,-0.061813186813186816,-0.06131868131868132,-0.060824175824175826,-0.06032967032967033,-0.059835164835164836,-0.05934065934065934,-0.05884615384615385,-0.05835164835164835,-0.05785714285714286,-0.057362637362637366,-0.05686813186813187,-0.056373626373626376,-0.05587912087912088,-0.055384615384615386,-0.05489010989010989,-0.0543956043956044,-0.0539010989010989,-0.05340659340659341,-0.05291208791208791,-0.05241758241758242,-0.051923076923076926,-0.05142857142857143,-0.050934065934065936,-0.05043956043956044,-0.04994505494505495,-0.04945054945054945,-0.04895604395604396,-0.04846153846153846,-0.04796703296703297,-0.047472527472527476,-0.04697802197802198,-0.046483516483516486,-0.04598901098901099,-0.0454945054945055,-0.045,-0.04450549450549451,-0.04401098901098901,-0.04351648351648352,-0.04302197802197802,-0.04252747252747253,-0.042032967032967036,-0.04153846153846154,-0.04104395604395605,-0.04054945054945055,-0.04005494505494506,-0.03956043956043956,-0.03906593406593407,-0.03857142857142857,-0.03807692307692308,-0.03758241758241758,-0.03708791208791209,-0.0365934065934066,-0.0360989010989011,-0.03560439560439561,-0.03510989010989011,-0.03461538461538462,-0.03412087912087912,-0.03362637362637363,-0.03313186813186813,-0.03263736263736264,-0.03214285714285714,-0.03164835164835165,-0.031153846153846153,-0.03065934065934066,-0.030164835164835164,-0.02967032967032967,-0.029175824175824174,-0.028681318681318683,-0.028186813186813188,-0.027692307692307693,-0.0271978021978022,-0.026703296703296703,-0.02620879120879121,-0.025714285714285714,-0.02521978021978022,-0.024725274725274724,-0.02423076923076923,-0.023736263736263738,-0.023241758241758243,-0.02274725274725275,-0.022252747252747253,-0.02175824175824176,-0.021263736263736264,-0.02076923076923077,-0.020274725274725274,-0.01978021978021978,-0.019285714285714285,-0.01879120879120879,-0.0182967032967033,-0.017802197802197803,-0.01730769230769231,-0.016813186813186814,-0.01631868131868132,-0.015824175824175824,-0.01532967032967033,-0.014835164835164835,-0.014340659340659341,-0.013846153846153847,-0.013351648351648352,-0.012857142857142857,-0.012362637362637362,-0.011868131868131869,-0.011373626373626374,-0.01087912087912088,-0.010384615384615384,-0.00989010989010989,-0.009395604395604395,-0.008901098901098902,-0.008406593406593407,-0.007912087912087912,-0.007417582417582417,-0.006923076923076923,-0.0064285714285714285,-0.0059340659340659345,-0.00543956043956044,-0.004945054945054945,-0.004450549450549451,-0.003956043956043956,-0.0034615384615384616,-0.0029670329670329672,-0.0024725274725274724,-0.001978021978021978,-0.0014835164835164836,-0.000989010989010989,-0.0004945054945054945,0.0]}
},{}],76:[function(require,module,exports){
module.exports={"expected":[0.0,0.0004945055348135803,0.0009890113114758166,0.0014835175718360752,0.001978024557745141,0.0024725325110559284,0.0029670416736241913,0.0034615522873092303,0.003956064593974605,0.004450578835488847,0.0049450952537261565,0.005439614090567133,0.005934135587899466,0.006428659987618654,0.006923187531628715,0.007417718461842893,0.007912253020184373,0.008406791448586986,0.008901333988995919,0.009395880883368433,0.009890432373674566,0.010384988701897848,0.010879550110036005,0.011374116840101678,0.011868689134123131,0.012363267234144958,0.0128578513822288,0.013352441820454058,0.01384703879091859,0.01434164253573944,0.014836253297053542,0.015330871317018428,0.015825496837812952,0.01632013010163798,0.016814771350717135,0.017309420827297476,0.01780407877365023,0.018298745432071502,0.018793421044882987,0.01928810585443268,0.019782800103095598,0.02027750403327447,0.020772217887400492,0.021266941907934,0.02176167633736521,0.022256421418214913,0.02275117739303521,0.023245944504410216,0.023740722994956776,0.024235513107325177,0.024730315084199872,0.025225129168300185,0.025719955602381044,0.026214794629233668,0.026709646491686317,0.027204511432604994,0.02769938969489415,0.028194281521497434,0.028689187155398362,0.02918410683962109,0.029679040817231085,0.030173989331335884,0.030668952625085778,0.031163930941674554,0.0316589245243402,0.03215393361636563,0.03264895846107942,0.03314399930185652,0.033639056382118934,0.0341341299453365,0.03462922023502761,0.03512432749475987,0.03561945196815088,0.03611459389886896,0.03660975353063381,0.037104931107217305,0.03760012687244419,0.0380953410701928,0.03859057394439578,0.03908582573904083,0.039581096698171406,0.04007638706588748,0.040571697086346226,0.04106702700376278,0.04156237706241092,0.042057747506623895,0.04255313858079501,0.04304855052937846,0.043543983596890046,0.044039438027907864,0.044534914067073064,0.04503041195909056,0.04552593194872981,0.04602147428082545,0.04651703920027815,0.047012626952055256,0.047508237781191544,0.04800387193278995,0.04849952965202235,0.048995211184130236,0.04949091677442546,0.049986646668291,0.05048240111118165,0.050978180348624814,0.05147398462622119,0.05196981418964555,0.05246566928464743,0.052961550157051916,0.05345745705276035,0.05395339021775109,0.05444934989808025,0.0549453363398824,0.05544134978937138,0.05593739049284098,0.05643345869666571,0.05692955464730153,0.057425678591286625,0.05792183077524209,0.05841801144587274,0.05891422084996782,0.05941045923440175,0.0599067268461349,0.06040302393221425,0.06089935073977432,0.0613957075160377,0.061892094508315953,0.062388511964010296,0.06288496013061239,0.06338143925570505,0.06387794958696305,0.06437449137215379,0.06487106485913817,0.06536767029587123,0.06586430793040296,0.06636097801087906,0.0668576807855417,0.06735441650273022,0.06785118541088196,0.06834798775853299,0.06884482379431885,0.06934169376697534,0.06983859792533925,0.07033553651834917,0.07083250979504621,0.07132951800457477,0.07182656139618328,0.07232364021922506,0.07282075472315895,0.07331790515755021,0.07381509177207114,0.07431231481650202,0.07480957454073174,0.07530687119475858,0.07580420502869112,0.07630157629274881,0.0767989852372629,0.0772964321126771,0.07779391716954848,0.07829144065854811,0.0787890028304619,0.07928660393619141,0.07978424422675458,0.08028192395328648,0.08077964336704016,0.0812774027193874,0.08177520226181946,0.0822730422459479,0.08277092292350535,0.08326884454634631,0.08376680736644791,0.08426481163591068,0.08476285760695935,0.08526094553194373,0.0857590756633393,0.0862572482537482,0.08675546355589987,0.08725372182265195,0.087752023306991,0.08825036826203334,0.08874875694102578,0.08924718959734651,0.0897456664845058,0.09024418785614682,0.09074275396604656,0.09124136506811638,0.09174002141640307,0.0922387232650895,0.09273747086849543,0.09323626448107837,0.09373510435743433,0.09423399075229869,0.09473292392054694,0.09523190411719548,0.09573093159740252,0.09623000661646883,0.09672912942983847,0.09722830029309974,0.09772751946198596,0.09822678719237621,0.09872610374029622,0.09922546936191913,0.09972488431356635,0.10022434885170839,0.10072386323296562,0.10122342771410911,0.10172304255206152,0.10222270800389782,0.10272242432684617,0.10322219177828874,0.10372201061576256,0.10422188109696028,0.10472180347973103,0.10522177802208134,0.10572180498217579,0.10622188461833797,0.10672201718905135,0.10722220295295999,0.10772244216886942,0.10822273509574752,0.10872308199272539,0.10922348311909802,0.10972393873432532,0.11022444909803283,0.1107250144700127,0.11122563511022439,0.11172631127879555,0.112227043236023,0.11272783124237341,0.11322867555848418,0.11372957644516439,0.11423053416339558,0.1147315489743326,0.11523262113930446,0.11573375091981525,0.11623493857754494,0.11673618437435021,0.1172374885722654,0.11773885143350332,0.1182402732204561,0.11874175419569612,0.11924329462197678,0.11974489476223343,0.12024655487958426,0.12074827523733112,0.12125005609896035,0.12175189772814385,0.12225380038873969,0.12275576434479316,0.12325778986053766,0.12375987720039543,0.1242620266289786,0.1247642384110899,0.1252665128117238,0.12576885009606706,0.1262712505294999,0.1267737143775967,0.12727624190612713,0.12777883338105667,0.1282814890685479,0.12878420923496103,0.12928699414685513,0.12978984407098879,0.13029275927432116,0.13079574002401273,0.13129878658742627,0.13180189923212793,0.13230507822588777,0.13280832383668095,0.13331163633268855,0.13381501598229859,0.13431846305410672,0.13482197781691727,0.13532556053974418,0.13582921149181187,0.13633293094255622,0.1368367191616254,0.13734057641888087,0.13784450298439824,0.13834849912846822,0.1388525651215977,0.13935670123451027,0.13986090773814763,0.14036518490367023,0.1408695330024583,0.14137395230611277,0.14187844308645614,0.14238300561553358,0.14288764016561364,0.14339234700918954,0.14389712641897967,0.14440197866792895,0.1449069040292095,0.14541190277622168,0.1459169751825951,0.1464221215221895,0.14692734206909572,0.14743263709763668,0.1479380068823683,0.14844345169808054,0.14894897181979824,0.1494545675227822,0.14996023908253006,0.1504659867747774,0.1509718108754985,0.15147771166090748,0.15198368940745927,0.15248974439185053,0.15299587689102057,0.1535020871821525,0.15400837554267405,0.15451474225025863,0.1550211875828263,0.15552771181854486,0.15603431523583056,0.15654099811334946,0.15704776073001814,0.15755460336500476,0.15806152629773024,0.15856852980786898,0.15907561417535002,0.15958277968035817,0.16009002660333466,0.16059735522497845,0.1611047658262472,0.16161225868835816,0.1621198340927893,0.16262749232128018,0.16313523365583332,0.16364305837871473,0.1641509667724553,0.16465895911985168,0.16516703570396732,0.16567519680813353,0.16618344271595045,0.1666917737112883,0.16720019007828804,0.16770869210136272,0.1682172800651984,0.16872595425475526,0.1692347149552685,0.16974356245224959,0.17025249703148712,0.17076151897904807,0.17127062858127862,0.17177982612480547,0.17228911189653662,0.17279848618366264,0.17330794927365772,0.17381750145428057,0.1743271430135757,0.1748368742398744,0.17534669542179576,0.17585660684824778,0.17636660880842853,0.17687670159182714,0.17738688548822484,0.1778971607876963,0.17840752778061034,0.1789179867576313,0.17942853800972,0.17993918182813504,0.1804499185044335,0.1809607483304725,0.18147167159840993,0.1819826886007058,0.1824937996301233,0.18300500497972974,0.1835163049428979,0.18402769981330697,0.1845391898849438,0.18505077545210397,0.18556245680939285,0.18607423425172684,0.18658610807433437,0.18709807857275715,0.18761014604285126,0.18812231078078825,0.18863457308305637,0.1891469332464616,0.1896593915681289,0.19017194834550324,0.19068460387635092,0.19119735845876054,0.19171021239114427,0.19222316597223896,0.19273621950110734,0.19324937327713917,0.19376262760005242,0.19427598276989433,0.19478943908704277,0.19530299685220728,0.1958166563664303,0.1963304179310883,0.19684428184789307,0.1973582484188928,0.19787231794647334,0.1983864907333593,0.19890076708261534,0.19941514729764737,0.19992963168220368,0.20044422054037628,0.20095891417660183,0.20147371289566324,0.20198861700269047,0.20250362680316208,0.20301874260290637,0.2035339647081023,0.20404929342528136,0.20456472906132814,0.2050802719234818,0.20559592231933754,0.20611168055684748,0.20662754694432206,0.20714352179043133,0.20765960540420614,0.20817579809503942,0.20869210017268736,0.20920851194727072,0.20972503372927612,0.21024166582955722,0.21075840855933614,0.21127526223020449,0.2117922271541249,0.2123093036434321,0.21282649201083434,0.21334379256941455,0.21386120563263167,0.21437873151432202,0.21489637052870048,0.2154141229903619,0.21593198921428228,0.21644996951582007,0.21696806421071763,0.2174862736151024,0.21800459804548827,0.21852303781877686,0.21904159325225883,0.21956026466361533,0.22007905237091918,0.2205979566926362,0.2211169779476267,0.22163611645514658,0.22215537253484896,0.22267474650678523,0.22319423869140664,0.2237138494095655,0.2242335789825166,0.2247534277319186,0.2252733959798351,0.2257934840487366,0.22631369226150128,0.22683402094141675,0.22735447041218126,0.22787504099790507,0.22839573302311184,0.2289165468127402,0.22943748269214484,0.2299585409870982,0.23047972202379166,0.231001026128837,0.2315224536292679,0.23204400485254123,0.23256568012653844,0.23308747977956723,0.23360940414036263,0.2341314535380886,0.2346536283023396,0.23517592876314175,0.23569835525095434,0.23622090809667146,0.2367435876316233,0.2372663941875774,0.23778932809674064,0.2383123896917602,0.23883557930572516,0.23935889727216814,0.23988234392506647,0.240405919598844,0.24092962462837225,0.24145345934897225,0.24197742409641557,0.24250151920692634,0.2430257450171823,0.24355010186431653,0.24407459008591892,0.24459921002003765,0.2451239620051807,0.24564884638031725,0.24617386348487974,0.24669901365876448,0.24722429724233402,0.2477497145764182,0.24827526600231598,0.24880095186179665,0.2493267724971017,0.24985272825094623,0.2503788194665205,0.2509050464874915,0.25143140965800453,0.2519579093226848,0.25248454582663893,0.25301131951545647,0.25353823073521176,0.25406527983246535,0.25459246715426537,0.2551197930481496,0.2556472578621464,0.25617486194477734,0.25670260564505765,0.2572304893124987,0.2577585132971091,0.25828667794939675,0.25881498362037,0.25934343066153975,0.25987201942492083,0.26040075026303355,0.2609296235289058,0.26145863957607396,0.2619877987585854,0.2625171014309995,0.26304654794838955,0.26357613866634466,0.2641058739409709,0.2646357541288936,0.2651657795872585,0.26569595067373386,0.26622626774651176,0.2667567311643102,0.2672873412863746,0.2678180984724795,0.26834900308293036,0.2688800554785652,0.2694112560207565,0.26994260507141266,0.2704741029929801,0.27100575014844447,0.2715375469013331,0.2720694936157162,0.27260159065620876,0.27313383838797267,0.2736662371767177,0.2741987873887042,0.27473148939074415,0.2752643435502035,0.27579735023500374,0.2763305098136233,0.2768638226551001,0.27739728912903283,0.277930909605583,0.27846468445547645,0.2789986140500059,0.27953269876103193,0.28006693896098517,0.2806013350228684,0.28113588732025785,0.2816705962273057,0.2822054621187414,0.28274048536987384,0.2832756663565931,0.2838110054553723,0.2843465030432697,0.28488215949793017,0.2854179751975877,0.28595395052106665,0.2864900858477841,0.2870263815577518,0.28756283803157745,0.2880994556504677,0.28863623479622885,0.28917317585127006,0.289710279198604,0.29024754522185,0.2907849743052352,0.29132256683359675,0.291860323192384,0.29239824376766005,0.29293632894610405,0.2934745791150132,0.29401299466230446,0.29455157597651704,0.29509032344681363,0.2956292374629834,0.29616831841544317,0.2967075666952399,0.2972469826940526,0.2977865668041943,0.29832631941861426,0.29886624093089986,0.29940633173527886,0.2999465922266211,0.3004870228004411,0.3010276238528995,0.30156839578080596,0.30210933898162023,0.3026504538534553,0.3031917407950788,0.3037332002059152,0.3042748324860484,0.3048166380362232,0.305358617257848,0.30590077055299647,0.30644309832440997,0.30698560097549993,0.3075282789103493,0.30807113253371554,0.30861416225103216,0.3091573684684114,0.3097007515926459,0.3102443120312114,0.3107880501922687,0.31133196648466566,0.31187606131794016,0.31242033510232126,0.3129647882487325,0.31350942116879316,0.3140542342748214,0.31459922797983597,0.3151444026975585,0.3156897588424161,0.3162352968295432,0.31678101707478434,0.3173269199946959,0.31787300600654894,0.3184192755283312,0.31896572897874925,0.3195123667772315,0.3200591893439296,0.3206061970997216,0.3211533904662139,0.3217007698657436,0.3222483357213809,0.3227960884569317,0.32334402849693966,0.3238921562666887,0.3244404721922055,0.32498897670026183,0.32553767021837693,0.3260865531748198,0.3266356259986122,0.3271848891195303,0.3277343429681076,0.3282839879756375,0.3288338245741753,0.3293838531965412,0.3299340742763221,0.3304844882478749,0.33103509554632854,0.33158589660758636,0.33213689186832906,0.3326880817660168,0.333239466738892,0.33379104722598185,0.33434282366710066,0.3348947965028528,0.3354469661746349,0.3359993331246384,0.3365518977958527,0.33710466063206695,0.3376576220778733,0.33821078257866916,0.33876414258066007,0.33931770253086196,0.3398714628771043,0.34042542406803217,0.34097958655310956,0.3415339507826214,0.34208851720767663,0.34264328628021096,0.34319825845298907,0.343753434179608,0.3443088139144993,0.34486439811293196,0.34542018723101514,0.34597618172570105,0.3465323820547876,0.34708878867692083,0.3476454020515984,0.34820222263917155,0.34875925090084875,0.34931648729869774,0.3498739322956487,0.35043158635549715,0.3509894499429066,0.35154752352341156,0.3521058075634201,0.3526643025302172,0.3532230088919668,0.353781927117716,0.35434105767739643,0.3549004010418283,0.3554599576827229,0.35601972807268534,0.35657971268521793,0.35713991199472256,0.3577003264765043,0.3582609566067739,0.3588218028626507,0.3593828657221664,0.35994414566426675,0.360505643168816,0.3610673587165988,0.36162929278932376,0.36219144586962637,0.36275381844107213,0.36331641098815975,0.36387922399632344,0.3644422579519374,0.3650055133423174,0.3655689906557251,0.3661326903813705,0.36669661300941514,0.3672607590309756,0.36782512893812636,0.3683897232239029,0.3689545423823051,0.36951958690830033,0.3700848572978267,0.3706503540477961,0.37121607765609793,0.3717820286216016,0.37234820744416025,0.37291461462461395,0.37348125066479315,0.3740481160675214,0.37461521133661935,0.3751825369769074,0.37575009349420974,0.37631788139535705,0.3768859011881901,0.37745415338156324,0.37802263848534756,0.3785913570104345,0.3791603094687388,0.37972949637320264,0.3802989182377984,0.3808685755775323,0.3814384689084482,0.38200859874763043,0.38257896561320787,0.383149570024357,0.3837204125013058,0.3842914935653367,0.3848628137387907,0.3854343735450708,0.3860061735086451,0.3865782141550509,0.38715049601089807,0.3877230196038726,0.3882957854627404,0.38886879411735054,0.3894420460986395,0.39001554193863414,0.390589282170456,0.3911632673283244,0.3917374979475606,0.3923119745645912,0.392886697716952,0.39346166794329196,0.39403688578337626,0.39461235177809106,0.3951880664694462,0.39576403040058,0.3963402441157623,0.39691670816039876,0.39749342308103447,0.39807038942535783,0.39864760774220453,0.3992250785815612,0.3998028024945698,0.40038078003353084,0.4009590117519079,0.4015374982043314,0.4021162399466021,0.402695237535696,0.40327449152976763,0.403854002488154,0.4044337709713792,0.40501379754115796,0.4055940827604,0.40617462719321346,0.4067554314049102,0.4073364959620086,0.4079178214322386,0.40849940838454507,0.40908125738909296,0.4096633690172705,0.41024574384169377,0.41082838243621106,0.4114112853759068,0.4119944532371061,0.4125778865973785,0.41316158603554287,0.41374555213167136,0.4143297854670933,0.41491428662440066,0.4154990561874509,0.41608409474137276,0.4166694028725695,0.41725498116872384,0.4178408302188026,0.4184269506130602,0.41901334294304415,0.4196000078015989,0.4201869457828705,0.42077415748231106,0.421361643496683,0.4219494044240645,0.42253744086385264,0.42312575341676917,0.42371434268486446,0.4243032092715223,0.42489235378146467,0.425481776820756,0.4260714789968082,0.426661460918385,0.4272517231956071,0.42784226643995643,0.42843309126428114,0.42902419828280003,0.4296155881111082,0.4302072613661806,0.4307992186663777,0.43139146063145034,0.43198398788254383,0.43257680104220386,0.4331699007343804,0.4337632875844334,0.4343569622191372,0.43495092526668583,0.4355451773566978,0.436139719120221,0.4367345511897379,0.4373296741991707,0.43792508878388603,0.4385207955807002,0.43911679522788427,0.43971308836516954,0.4403096756337519,0.4409065576762978,0.44150373513694874,0.4421012086613273,0.44269897889654136,0.44329704649119017,0.44389541209536937,0.4444940763606759,0.4450930399402141,0.4456923034886,0.44629186766196804,0.446891733117975,0.44749190051580623,0.44809237051618134,0.4486931437813586,0.4492942209751417,0.449895602762884,0.45049728981149506,0.4510992827894455,0.451701582366773,0.45230418921508775,0.45290710400757767,0.45351032741901487,0.4541138601257605,0.454717702805771,0.4553218561386033,0.4559263208054213,0.4565310974890004,0.4571361868737349,0.45774158964564243,0.4583473064923704,0.4589533381032017,0.45955968516906065,0.4601663483825191,0.4607733284378016,0.4613806260307925,0.4619882418590411,0.46259617662176755,0.46320443101986986,0.46381300575592876,0.46442190153421464,0.46503111906069317,0.46564065904303176,0.46625052219060564,0.46686070921450373,0.46747122082753556,0.4680820577442366,0.4686932206808754,0.4693047103554591,0.4699165274877406,0.4705286727992243,0.47114114701317245,0.4717539508546121,0.47236708505034075,0.4729805503289337,0.4735943474207499,0.47420847705793856,0.47482293997444613,0.47543773690602226,0.47605286859022683,0.4766683357664364,0.477284139175851,0.4779002795615007,0.47851675766825247,0.479133574242817,0.47975073003375485,0.4803682257914843,0.48098606226828733,0.4816042402183168,0.4822227603976037,0.48284162356406346,0.48346083047750316,0.48408038189962865,0.48470027859405174,0.48532052132629666,0.48594111086380765,0.48656204797595604,0.4871833334340472,0.4878049680113278,0.48842695248299306,0.48904928762619415,0.4896719742200452,0.4902950130456308,0.490918404886013,0.4915421505262395,0.49216625075335,0.49279070635638467,0.4934155181263908,0.49404068685643054,0.4946662133415893,0.49529209837898164,0.4959183427677606,0.4965449473091241,0.49717191280632345,0.4977992400646707,0.49842692989154624,0.49905498309640706,0.4996834004907942,0.5003121828883406,0.5009413311047792,0.5015708459579511,0.5022007282678128,0.5028309788564448,0.5034615985480595,0.5040925881690091,0.5047239485477943,0.5053556805150715,0.5059877849036619,0.5066202625485593,0.5072531142869381,0.5078863409581624,0.5085199434037935,0.509153922467599,0.5097882789955606,0.5104230138358826,0.5110581278390015,0.5116936218575927,0.5123294967465807,0.5129657533631468,0.5136023925667381,0.514239415219076,0.5148768221841654,0.5155146143283028,0.5161527925200855,0.5167913576304208,0.5174303105325342,0.5180696521019785,0.5187093832166436,0.5193495047567643,0.5199900176049302,0.5206309226460948,0.521272220767584,0.5219139128591059,0.5225559998127604,0.523198482523047,0.523841361886876,0.5244846388035765,0.5251283141749065,0.525772388905062,0.5264168639006868,0.5270617400708819,0.5277070183272152,0.528352699583731,0.5289987847569597,0.5296452747659277,0.5302921705321674,0.530939472979726,0.5315871830351766,0.5322353016276277,0.5328838296887327,0.5335327681527007,0.534182117956306,0.5348318800388984,0.5354820553424136,0.5361326448113827,0.5367836493929434,0.53743507003685,0.5380869076954827,0.5387391633238602,0.5393918378796481,0.5400449323231702,0.5406984476174196,0.5413523847280681,0.5420067446234785,0.5426615282747135,0.5433167366555478,0.5439723707424784,0.5446284315147355,0.5452849199542938,0.5459418370458828,0.5465991837769983,0.5472569611379137,0.5479151701216906,0.5485738117241901,0.5492328869440846,0.5498923967828684,0.55055234224487,0.551212724337262,0.5518735440700742,0.5525348024562039,0.5531965005114288,0.5538586392544173,0.5545212197067406,0.5551842428928853,0.555847709840264,0.5565116215792285,0.5571759791430799,0.5578407835680828,0.5585060358934756,0.5591717371614837,0.5598378884173311,0.5605044907092526,0.5611715450885066,0.5618390526093874,0.5625070143292371,0.5631754313084584,0.5638443046105273,0.5645136353020056,0.5651834244525537,0.5658536731349431,0.566524382425069,0.5671955534019638,0.56786718714781,0.5685392847479528,0.5692118472909131,0.5698848758684008,0.5705583715753282,0.5712323355098234,0.5719067687732433,0.5725816724701864,0.5732570477085078,0.5739328955993315,0.5746092172570645,0.5752860137994105,0.575963286347383,0.5766410360253205,0.5773192639608988,0.5779979712851464,0.5786771591324574,0.5793568286406062,0.5800369809507617,0.5807176172075011,0.5813987385588251,0.5820803461561709,0.5827624411544283,0.5834450247119533,0.5841280979905826,0.5848116621556492,0.5854957183759958,0.5861802678239911,0.5868653116755439,0.5875508511101185,0.588236887310749,0.5889234214640555,0.5896104547602591,0.5902979883931968,0.5909860235603372,0.591674561462796,0.5923636033053512,0.5930531502964596,0.5937432036482717,0.5944337645766483,0.595124834301175,0.59581641404518,0.5965085050357489,0.5972011085037418,0.597894225683808,0.5985878578144042,0.5992820061378098,0.5999766719001436,0.6006718563513808,0.6013675607453685,0.6020637863398441,0.6027605343964512,0.6034578061807564,0.6041556029622671,0.6048539260144478,0.6055527766147377,0.6062521560445684,0.6069520655893808,0.6076525065386423,0.6083534801858653,0.6090549878286243,0.6097570307685738,0.6104596103114664,0.6111627277671701,0.6118663844496871,0.6125705816771719,0.6132753207719492,0.6139806030605327,0.614686429873643,0.6153928025462266,0.6160997224174748,0.6168071908308422,0.6175152091340651,0.6182237786791812,0.6189329008225487,0.6196425769248648,0.6203528083511859,0.6210635964709459,0.6217749426579768,0.622486848290528,0.6231993147512859,0.6239123434273928,0.6246259357104689,0.6253400929966308,0.6260548166865123,0.6267701081852841,0.6274859689026749,0.6282024002529913,0.6289194036551392,0.6296369805326435,0.6303551323136698,0.6310738604310449,0.631793166322278,0.6325130514295823,0.6332335171998957,0.6339545650849023,0.6346761965410546,0.6353984130295943,0.6361212160165751,0.6368446069728839,0.6375685873742625,0.638293158701331,0.6390183224396091,0.6397440800795389,0.6404704331165076,0.6411973830508696,0.6419249313879698,0.6426530796381668,0.6433818293168554,0.6441111819444896,0.6448411390466069,0.6455717021538511,0.6463028728019959,0.6470346525319691,0.6477670428898755,0.6485000454270223,0.649233661699942,0.6499678932704175,0.6507027417055062,0.6514382085775643,0.6521742954642721,0.6529110039486588,0.6536483356191267,0.6543862920694774,0.6551248748989364,0.6558640857121789,0.656603926119355,0.6573443977361162,0.65808550218364,0.6588272410886574,0.6595696160834779,0.6603126288060168,0.6610562808998206,0.6618005740140949,0.6625455098037303,0.6632910899293297,0.6640373160572356,0.6647841898595566,0.6655317130141959,0.6662798872048785,0.6670287141211786,0.6677781954585479,0.6685283329183437,0.669279128207857,0.6700305830403412,0.6707826991350408,0.6715354782172192,0.6722889220181887,0.6730430322753396,0.6737978107321689,0.6745532591383104,0.6753093792495632,0.6760661728279234,0.6768236416416121,0.6775817874651073,0.6783406120791731,0.6791001172708904,0.6798603048336883,0.6806211765673746,0.6813827342781668,0.6821449797787231,0.6829079148881749,0.6836715414321578,0.6844358612428433,0.6852008761589712,0.6859665880258814,0.6867329986955475,0.687500110026608,0.6882679238844004,0.6890364421409931,0.6898056666752196,0.6905755993727115,0.6913462421259324,0.6921175968342118,0.6928896654037784,0.6936624497477957,0.6944359517863956,0.6952101734467135,0.6959851166629232,0.6967607833762715,0.6975371755351144,0.6983142950949522,0.6990921440184661,0.6998707242755524,0.7006500378433608,0.7014300867063297,0.7022108728562236,0.7029923982921695,0.7037746650206941,0.7045576750557616,0.7053414304188111,0.7061259331387949,0.7069111852522157,0.7076971888031658,0.7084839458433655,0.7092714584322016,0.7100597286367674,0.7108487585319007,0.7116385502002247,0.7124291057321869,0.7132204272261001,0.7140125167881819,0.7148053765325957,0.7155990085814913,0.716393415065047,0.7171885981215096,0.7179845598972374,0.7187813025467409,0.7195788282327259,0.7203771391261358,0.7211762374061941,0.7219761252604475,0.7227768048848096,0.7235782784836037,0.7243805482696077,0.7251836164640977,0.7259874852968916,0.7267921570063957,0.7275976338396482,0.7284039180523654,0.7292110119089863,0.73001891768272,0.7308276376555904,0.731637174118484,0.7324475293711957,0.7332587057224764,0.7340707054900807,0.7348835310008142,0.7356971845905818,0.7365116686044361,0.7373269853966257,0.7381431373306451,0.7389601267792834,0.7397779561246741,0.7405966277583449,0.7414161440812689,0.7422365075039145,0.7430577204462963,0.7438797853380276,0.7447027046183703,0.745526480736289,0.746351116150502,0.7471766133295344,0.7480029747517719,0.7488302029055127,0.7496583002890232,0.7504872694105913,0.7513171127885807,0.7521478329514865,0.7529794324379898,0.7538119137970145,0.754645279587782,0.7554795323798692,0.7563146747532634,0.7571507092984215,0.7579876386163267,0.7588254653185461,0.7596641920272905,0.7605038213754713,0.7613443560067616,0.7621857985756547,0.7630281517475247,0.7638714181986864,0.7647156006164568,0.7655607016992161,0.7664067241564697,0.76725367070891,0.7681015440884789,0.7689503470384315,0.769800082313399,0.7706507526794532,0.7715023609141696,0.7723549098066939,0.7732084021578063,0.7740628407799873,0.7749182284974844,0.7757745681463775,0.7766318625746479,0.7774901146422446,0.7783493272211526,0.7792095031954621,0.7800706454614366,0.780932756927583,0.781795840514722,0.7826598991560582,0.7835249357972506,0.7843909533964858,0.7852579549245483,0.7861259433648944,0.7869949217137248,0.7878648929800576,0.788735860185804,0.7896078263658416,0.7904807945680905,0.7913547678535892,0.7922297492965694,0.7931057419845353,0.7939827490183393,0.7948607735122609,0.7957398185940844,0.7966198874051794,0.7975009831005794,0.7983831088490626,0.7992662678332332,0.8001504632496018,0.8010356983086688,0.8019219762350067,0.8028093002673429,0.8036976736586443,0.8045870996762017,0.8054775816017148,0.8063691227313785,0.8072617263759692,0.8081553958609313,0.8090501345264658,0.8099459457276186,0.8108428328343693,0.8117407992317214,0.8126398483197916,0.8135399835139026,0.8144412082446735,0.8153435259581134,0.8162469401157134,0.8171514541945416,0.8180570716873371,0.8189637961026054,0.8198716309647147,0.8207805798139922,0.8216906462068222,0.822601833715744,0.823514145929551,0.8244275864533908,0.8253421589088645,0.82625786693413,0.8271747141840022,0.8280927043300575,0.8290118410607359,0.8299321280814468,0.8308535691146731,0.8317761679000789,0.8326999281946148,0.8336248537726259,0.8345509484259616,0.8354782159640837,0.8364066602141778,0.8373362850212636,0.8382670942483066,0.8391990917763323,0.8401322815045396,0.8410666673504146,0.8420022532498466,0.8429390431572457,0.8438770410456589,0.8448162509068886,0.8457566767516129,0.8466983226095046,0.8476411925293531,0.8485852905791867,0.8495306208463956,0.8504771874378553,0.8514249944800528,0.8523740461192126,0.8533243465214231,0.8542758998727658,0.8552287103794429,0.8561827822679097,0.8571381197850043,0.8580947271980807,0.859052608795142,0.8600117688849744,0.8609722117972843,0.8619339418828336,0.8628969635135781,0.8638612810828065,0.8648268990052803,0.8657938217173757,0.866762053677225,0.8677315993648615,0.8687024632823626,0.8696746499539973,0.8706481639263732,0.8716230097685838,0.8725991920723596,0.8735767154522176,0.8745555845456148,0.8755358040131006,0.8765173785384723,0.87750031282893,0.8784846116152352,0.8794702796518685,0.8804573217171903,0.8814457426136015,0.882435547167706,0.8834267402304757,0.8844193266774154,0.8854133114087293,0.8864086993494902,0.8874054954498078,0.8884037046850014,0.8894033320557717,0.890404382588375,0.8914068613347984,0.8924107733729378,0.8934161238067759,0.8944229177665626,0.8954311604089964,0.8964408569174078,0.8974520125019446,0.8984646323997579,0.8994787218751907,0.9004942862199667,0.9015113307533829,0.9025298608225019,0.9035498818023469,0.9045713990960986,0.9055944181352918,0.906618944380018,0.9076449833191245,0.9086725404704197,0.9097016213808777,0.910732231626845,0.9117643768142503,0.9127980625788148,0.9138332945862654,0.9148700785325482,0.9159084201440465,0.9169483251777981,0.9179897994217163,0.9190328486948124,0.9200774788474191,0.9211236957614185,0.9221715053504693,0.9232209135602383,0.9242719263686322,0.9253245497860325,0.9263787898555333,0.9274346526531793,0.9284921442882078,0.9295512709032911,0.9306120386747838,0.9316744538129695,0.9327385225623112,0.9338042512017046,0.9348716460447318,0.9359407134399196,0.9370114597709986,0.9380838914571655,0.9391580149533476,0.9402338367504689,0.9413113633757209,0.9423906013928338,0.9434715574023513,0.9445542380419071,0.9456386499865055,0.9467247999488031,0.9478126946793946,0.9489023409670995,0.9499937456392528,0.951086915561999,0.9521818576405877,0.9532785788196724,0.954377086083611,0.9554773864567732,0.956579487003845,0.9576833948301415,0.958789117081919,0.9598966609466915,0.9610060336535512,0.9621172424734905,0.9632302947197277,0.9643451977480365,0.9654619589570771,0.9665805857887331,0.967701085728449,0.968823466305573,0.9699477350937014,0.9710738997110284,0.9722019678206979,0.9733319471311593,0.9744638453965266,0.9755976704169408,0.9767334300389372,0.977871132155815,0.9790107847080107,0.9801523956834768,0.9812959731180605,0.9824415250958921,0.9835890597497716,0.9847385852615629,0.9858901098625892,0.9870436418340355,0.9881991895073529,0.9893567612646674,0.9905163655391939,0.991678010815652,0.99284170563069,0.9940074585733095,0.9951752782852963,0.9963451734616545,0.9975171528510473,0.9986912252562394,0.9998673995345466,1.0010456845982887,1.0022260894152462,1.0034086230091244,1.0045932944600209,1.0057801129048964,1.006969087538054,1.008160227611619,1.0093535424360296,1.0105490413805263,1.0117467338736517,1.0129466294037521,1.0141487375194873,1.0153530678303435,1.0165596300071529,1.0177684337826178,1.0189794889518418,1.020192805372866,1.0214083929672104,1.0226262617204218,1.023846421682628,1.0250688829690957,1.0262936557607991,1.0275207503049892,1.0287501769157734,1.0299819459746986,1.0312160679313438,1.0324525533039157,1.0336914126798542,1.0349326567164412,1.0361762961414192,1.0374223417536144,1.0386708044235693,1.0399216950941788,1.041175024781337,1.0424308045745876,1.043689045637786,1.044949759209765,1.0462129566050091,1.047478649214337,1.048746848505592,1.0500175660243385,1.051290813394569,1.0525666023194173,1.0538449445818785,1.0551258520455418,1.0564093366553267,1.057695410438231,1.0589840855040857,1.0602753740463189,1.0615692883427295,1.0628658407562686,1.0641650437358303,1.0654669098170517,1.066771451623124,1.068078681865609,1.0693886133452697,1.0707012589529077,1.0720166316702109,1.073334744570613,1.0746556108201608,1.0759792436783935,1.0773056564992303,1.0786348627318718,1.0799668759217103,1.0813017097112492,1.0826393778410381,1.0839798941506131,1.085323272579455,1.086669527167954,1.0880186720583875,1.089370721495912,1.0907256898295625,1.0920835915132696,1.0934444411068849,1.09480825327722,1.0961750427990993,1.0975448245564248,1.0989176135432543,1.1002934248648941,1.1016722737390021,1.1030541754967076,1.1044391455837448,1.1058271995615996,1.1072183531086701,1.1086126220214445,1.110010022215689,1.1114105697276564,1.1128142807153063,1.114221171459542,1.1156312583654615,1.117044557963628,1.1184610869113534,1.1198808619939997,1.121303900126297,1.1227302183536765,1.1241598338536258,1.1255927639370569,1.1270290260496927,1.1284686377734738,1.1299116168279821,1.131357981071883,1.1328077485043873,1.1342609372667318,1.1357175656436789,1.1371776520650374,1.1386412151072027,1.1401082734947179,1.1415788461018546,1.1430529519542154,1.14453061023036,1.1460118402634498,1.1474966615429167,1.1489850937161528,1.1504771565902265,1.1519728701336183,1.153472254477981,1.154975329919926,1.1564821169228308,1.1579926361186752,1.1595069083099,1.1610249544712918,1.1625467957518947,1.164072453476947,1.165601949149849,1.1671353044541526,1.168672541255583,1.170213681604086,1.1717587477359077,1.1733077620756998,1.1748607472386565,1.1764177260326834,1.1779787214605921,1.1795437567223335,1.181112855217257,1.1826860405464055,1.184263336514841,1.1858447671340073,1.187430356624124,1.189020129416616,1.1906141101565795,1.192212323705282,1.193814795142702,1.1954215497701037,1.1970326131126496,1.1986480109220543,1.2002677691792734,1.2018919140972382,1.2035204721236257,1.2051534699436734,1.2067909344830352,1.2084328929106807,1.2100793726418384,1.2117304013409838,1.2133860069248716,1.2150462175656151,1.2167110616938142,1.2183805680017277,1.2200547654464993,1.221733683253429,1.2234173509192963,1.225105798215738,1.2267990551926755,1.2284971521817962,1.230200119800089,1.2319079889534388,1.2336207908402739,1.2353385569552722,1.2370613190931274,1.2387891093523737,1.2405219601392734,1.2422599041717652,1.2440029744834773,1.2457512044278038,1.2475046276820483,1.2492632782516355,1.2510271904743893,1.252796399024883,1.2545709389188588,1.2563508455177224,1.25813615453311,1.2599269020315318,1.2617231244390934,1.263524858546292,1.2653321415129002,1.2671450108729247,1.2689635045396532,1.2707876608107822,1.272617518373638,1.2744531163104806,1.2762944941039014,1.2781416916423134,1.2799947492255328,1.2818537075704621,1.2837186078168668,1.2855894915332553,1.28746640072286,1.2893493778297234,1.2912384657448919,1.2931337078127174,1.2950351478372721,1.2969428300888737,1.2988567993107312,1.3007771007257076,1.3027037800432029,1.304636883466162,1.3065764576982082,1.3085225499509099,1.3104752079511734,1.312434479948776,1.314400414724035,1.3163730615956157,1.31835247042849,1.3203386916420345,1.3223317762182871,1.3243317757103494,1.3263387422509547,1.328352728561193,1.3303737879594002,1.3324019743702191,1.3344373423338274,1.33647994701535,1.3385298442144435,1.3405870903750714,1.3426517425954647,1.3447238586382757,1.3468034969409328,1.3488907166261952,1.350985577512914,1.3530881401270074,1.3551984657126521,1.357316616243698,1.3594426544353078,1.3615766437558339,1.3637186484389285,1.3658687334959048,1.3680269647283432,1.3701934087409564,1.3723681329547164,1.3745512056202527,1.3767426958315248,1.378942673539777,1.3811512095677854,1.383368375624398,1.3855942443193856,1.3878288891785995,1.3900723846594505,1.3923248061667188,1.3945862300686969,1.396856733713682,1.3991363954468192,1.4014252946273105,1.4037235116459936,1.4060311279433084,1.4083482260276519,1.4106748894941368,1.4130112030437671,1.4153572525030316,1.4177131248439423,1.4200789082045135,1.4224546919097034,1.424840566492829,1.4272366237174614,1.4296429565998279,1.4320596594317168,1.4344868278039153,1.4369245586301822,1.4393729501717831,1.4418321020625915,1.4443021153347777,1.4467830924451057,1.449275137301844,1.451778355292323,1.4542928533111432,1.4568187397890637,1.4593561247225788,1.4619051197042214,1.464465837953592,1.467038394349152,1.4696229054607952,1.4722194895832204,1.4748282667701376,1.4774493588693196,1.4800828895585347,1.4827289843823832,1.4853877707900618,1.4880593781740954,1.4907439379100509,1.4934415833972754,1.4961524501006813,1.4988766755936223,1.5016143996018816,1.504365764048815,1.5071309131016866,1.5099099932192248,1.5127031532004558,1.5155105442348349,1.5183323199537329,1.5211686364833144,1.5240196524988536,1.526885529280542,1.5297664307708247,1.5326625236333282,1.5355739773134227,1.5385009641004859,1.5414436591919107,1.5444022407589304,1.547376890014312,1.550367791281988,1.5533751320686964,1.5563991031376887,1.5594398985845874,1.5624977159154652,1.5655727561272206,1.568665223790343,1.5717753271341377,1.5749032781345118,1.5780492926044032,1.5812135902869628,1.5843963949515751,1.5875979344928324,1.5908184410325694,1.5940581510250689,1.5973173053655672,1.6005961495021719,1.60389493355133,1.6072139124169775,1.610553345913522,1.6139134988927892,1.617294641375108,1.6206970486846812,1.6241210015894185,1.6275667864454124,1.6310346953462345,1.634525026277252,1.6380380832751698,1.641574176593005,1.6451336228707292,1.6487167453117997,1.652323873865837,1.6559553454176952,1.659611503983215,1.6632927009119203,1.666999295096975,1.670731653192706,1.6744901498400206,1.6782751679000762,1.6820870986965486,1.6859263422668973,1.6897933076230267,1.6936884130217615,1.6976120862456003,1.7015647648941958,1.705546896687079,1.709558939778135,1.7136013630824005,1.7176746466157446,1.7217792818480673,1.7259157720706537,1.7300846327783743,1.734286392067463,1.7385215910496286,1.742790784283321,1.747094540223011,1.7514334416873865,1.7558080863474437,1.7602190872354797,1.7646670732760825,1.7691526898402579,1.7736765993239314,1.7782394817521017,1.7828420354100374,1.7874849775029793,1.7921690448459013,1.7968949945850035,1.8016636049526848,1.8064756760578964,1.8113320307138654,1.8162335153053546,1.8211810006977185,1.8261753831902146,1.8312175855161765,1.8363085578928344,1.8414492791237838,1.8466407577572868,1.8518840333038429,1.8571801775167085,1.862530295739298,1.8679355283237267,1.8733970521250234,1.8789160820759292,1.88449387284754,1.89013172060149,1.8958309648397753,1.9015929903588356,1.9074192293150234,1.91331116340916,1.919270326198533,1.925298305545336,1.9313967462113486,1.9375673526094583,1.9438118917235356,1.950132196209193,1.95653016768902,1.9630077802571364,1.9695670842092095,1.9762102100155925,1.9829393725568178,1.9897568756425414,1.9966651168369944,2.0036665926162356,2.010763903884979,2.0179597618834793,2.0252569945180707,2.032658553152333,2.0401675198997222,2.04778711546274,2.05552070756856,2.063371820056414,2.071344142678094,2.0794415416798357,2.0876680712415085,2.0960279858578623,2.10452575375649,2.113166071458426,2.121953879600218,2.1308943801508775,2.1399930551739774,2.149255687304311,2.158688382130679,2.16829759270173,2.178090146401219,2.1880732744730174,2.198254644515678,2.2086423963123685,2.2192451814155754,2.2300722069689156,2.2411332843222187,2.2524388830831064,2.264000191351382,2.275829183004757,2.2879386930503176,2.300342502230495,2.3130554322819443,2.3260934534985425,2.339473806556352,2.3532151409317197,2.3673376727006943,2.381863365070408,2.396816135688824,2.41222209564549,2.428109826160563,2.444510700326696,2.4614592590041124,2.4789936521885223,2.4971561600321643,2.5159938114158242,2.535559122844817,2.5559109868960577,2.5771157480768716,2.599248515632915,2.622394778825618,2.6466524123622457],"x":[0.0,0.0004945054945054945,0.000989010989010989,0.0014835164835164836,0.001978021978021978,0.0024725274725274724,0.0029670329670329672,0.0034615384615384616,0.003956043956043956,0.004450549450549451,0.004945054945054945,0.00543956043956044,0.0059340659340659345,0.0064285714285714285,0.006923076923076923,0.007417582417582417,0.007912087912087912,0.008406593406593407,0.008901098901098902,0.009395604395604395,0.00989010989010989,0.010384615384615384,0.01087912087912088,0.011373626373626374,0.011868131868131869,0.012362637362637362,0.012857142857142857,0.013351648351648352,0.013846153846153847,0.014340659340659341,0.014835164835164835,0.01532967032967033,0.015824175824175824,0.01631868131868132,0.016813186813186814,0.01730769230769231,0.017802197802197803,0.0182967032967033,0.01879120879120879,0.019285714285714285,0.01978021978021978,0.020274725274725274,0.02076923076923077,0.021263736263736264,0.02175824175824176,0.022252747252747253,0.02274725274725275,0.023241758241758243,0.023736263736263738,0.02423076923076923,0.024725274725274724,0.02521978021978022,0.025714285714285714,0.02620879120879121,0.026703296703296703,0.0271978021978022,0.027692307692307693,0.028186813186813188,0.028681318681318683,0.029175824175824174,0.02967032967032967,0.030164835164835164,0.03065934065934066,0.031153846153846153,0.03164835164835165,0.03214285714285714,0.03263736263736264,0.03313186813186813,0.03362637362637363,0.03412087912087912,0.03461538461538462,0.03510989010989011,0.03560439560439561,0.0360989010989011,0.0365934065934066,0.03708791208791209,0.03758241758241758,0.03807692307692308,0.03857142857142857,0.03906593406593407,0.03956043956043956,0.04005494505494506,0.04054945054945055,0.04104395604395605,0.04153846153846154,0.042032967032967036,0.04252747252747253,0.04302197802197802,0.04351648351648352,0.04401098901098901,0.04450549450549451,0.045,0.0454945054945055,0.04598901098901099,0.046483516483516486,0.04697802197802198,0.047472527472527476,0.04796703296703297,0.04846153846153846,0.04895604395604396,0.04945054945054945,0.04994505494505495,0.05043956043956044,0.050934065934065936,0.05142857142857143,0.051923076923076926,0.05241758241758242,0.05291208791208791,0.05340659340659341,0.0539010989010989,0.0543956043956044,0.05489010989010989,0.055384615384615386,0.05587912087912088,0.056373626373626376,0.05686813186813187,0.057362637362637366,0.05785714285714286,0.05835164835164835,0.05884615384615385,0.05934065934065934,0.059835164835164836,0.06032967032967033,0.060824175824175826,0.06131868131868132,0.061813186813186816,0.06230769230769231,0.0628021978021978,0.0632967032967033,0.0637912087912088,0.06428571428571428,0.06478021978021978,0.06527472527472528,0.06576923076923077,0.06626373626373626,0.06675824175824176,0.06725274725274726,0.06774725274725275,0.06824175824175824,0.06873626373626374,0.06923076923076923,0.06972527472527472,0.07021978021978022,0.07071428571428572,0.07120879120879121,0.0717032967032967,0.0721978021978022,0.0726923076923077,0.0731868131868132,0.07368131868131868,0.07417582417582418,0.07467032967032967,0.07516483516483516,0.07565934065934066,0.07615384615384616,0.07664835164835165,0.07714285714285714,0.07763736263736264,0.07813186813186813,0.07862637362637363,0.07912087912087912,0.07961538461538462,0.08010989010989011,0.0806043956043956,0.0810989010989011,0.0815934065934066,0.0820879120879121,0.08258241758241758,0.08307692307692308,0.08357142857142857,0.08406593406593407,0.08456043956043956,0.08505494505494506,0.08554945054945055,0.08604395604395604,0.08653846153846154,0.08703296703296703,0.08752747252747253,0.08802197802197802,0.08851648351648352,0.08901098901098901,0.08950549450549451,0.09,0.0904945054945055,0.090989010989011,0.09148351648351648,0.09197802197802198,0.09247252747252747,0.09296703296703297,0.09346153846153846,0.09395604395604396,0.09445054945054945,0.09494505494505495,0.09543956043956044,0.09593406593406593,0.09642857142857143,0.09692307692307692,0.09741758241758242,0.09791208791208791,0.09840659340659341,0.0989010989010989,0.0993956043956044,0.0998901098901099,0.10038461538461538,0.10087912087912088,0.10137362637362637,0.10186813186813187,0.10236263736263736,0.10285714285714286,0.10335164835164835,0.10384615384615385,0.10434065934065934,0.10483516483516483,0.10532967032967033,0.10582417582417582,0.10631868131868132,0.10681318681318681,0.10730769230769231,0.1078021978021978,0.1082967032967033,0.1087912087912088,0.10928571428571429,0.10978021978021978,0.11027472527472527,0.11076923076923077,0.11126373626373626,0.11175824175824176,0.11225274725274725,0.11274725274725275,0.11324175824175824,0.11373626373626373,0.11423076923076923,0.11472527472527473,0.11521978021978022,0.11571428571428571,0.11620879120879121,0.1167032967032967,0.1171978021978022,0.1176923076923077,0.11818681318681319,0.11868131868131868,0.11917582417582417,0.11967032967032967,0.12016483516483517,0.12065934065934066,0.12115384615384615,0.12164835164835165,0.12214285714285714,0.12263736263736263,0.12313186813186813,0.12362637362637363,0.12412087912087912,0.12461538461538461,0.1251098901098901,0.1256043956043956,0.1260989010989011,0.1265934065934066,0.1270879120879121,0.1275824175824176,0.1280769230769231,0.12857142857142856,0.12906593406593406,0.12956043956043956,0.13005494505494505,0.13054945054945055,0.13104395604395605,0.13153846153846155,0.13203296703296705,0.13252747252747252,0.13302197802197802,0.13351648351648351,0.134010989010989,0.1345054945054945,0.135,0.1354945054945055,0.13598901098901098,0.13648351648351648,0.13697802197802197,0.13747252747252747,0.13796703296703297,0.13846153846153847,0.13895604395604397,0.13945054945054944,0.13994505494505494,0.14043956043956043,0.14093406593406593,0.14142857142857143,0.14192307692307693,0.14241758241758243,0.1429120879120879,0.1434065934065934,0.1439010989010989,0.1443956043956044,0.1448901098901099,0.1453846153846154,0.1458791208791209,0.1463736263736264,0.14686813186813186,0.14736263736263736,0.14785714285714285,0.14835164835164835,0.14884615384615385,0.14934065934065935,0.14983516483516485,0.15032967032967032,0.15082417582417582,0.15131868131868131,0.1518131868131868,0.1523076923076923,0.1528021978021978,0.1532967032967033,0.15379120879120878,0.15428571428571428,0.15478021978021977,0.15527472527472527,0.15576923076923077,0.15626373626373627,0.15675824175824177,0.15725274725274727,0.15774725274725274,0.15824175824175823,0.15873626373626373,0.15923076923076923,0.15972527472527473,0.16021978021978023,0.16071428571428573,0.1612087912087912,0.1617032967032967,0.1621978021978022,0.1626923076923077,0.1631868131868132,0.1636813186813187,0.1641758241758242,0.16467032967032966,0.16516483516483516,0.16565934065934065,0.16615384615384615,0.16664835164835165,0.16714285714285715,0.16763736263736265,0.16813186813186815,0.16862637362637362,0.16912087912087911,0.1696153846153846,0.1701098901098901,0.1706043956043956,0.1710989010989011,0.1715934065934066,0.17208791208791208,0.17258241758241757,0.17307692307692307,0.17357142857142857,0.17406593406593407,0.17456043956043957,0.17505494505494507,0.17554945054945054,0.17604395604395603,0.17653846153846153,0.17703296703296703,0.17752747252747253,0.17802197802197803,0.17851648351648353,0.17901098901098902,0.1795054945054945,0.18,0.1804945054945055,0.180989010989011,0.1814835164835165,0.181978021978022,0.18247252747252748,0.18296703296703296,0.18346153846153845,0.18395604395604395,0.18445054945054945,0.18494505494505495,0.18543956043956045,0.18593406593406595,0.18642857142857142,0.18692307692307691,0.1874175824175824,0.1879120879120879,0.1884065934065934,0.1889010989010989,0.1893956043956044,0.1898901098901099,0.19038461538461537,0.19087912087912087,0.19137362637362637,0.19186813186813187,0.19236263736263737,0.19285714285714287,0.19335164835164836,0.19384615384615383,0.19434065934065933,0.19483516483516483,0.19532967032967033,0.19582417582417583,0.19631868131868133,0.19681318681318682,0.1973076923076923,0.1978021978021978,0.1982967032967033,0.1987912087912088,0.1992857142857143,0.1997802197802198,0.20027472527472528,0.20076923076923076,0.20126373626373625,0.20175824175824175,0.20225274725274725,0.20274725274725275,0.20324175824175825,0.20373626373626375,0.20423076923076924,0.20472527472527471,0.2052197802197802,0.2057142857142857,0.2062087912087912,0.2067032967032967,0.2071978021978022,0.2076923076923077,0.20818681318681317,0.20868131868131867,0.20917582417582417,0.20967032967032967,0.21016483516483517,0.21065934065934067,0.21115384615384616,0.21164835164835163,0.21214285714285713,0.21263736263736263,0.21313186813186813,0.21362637362637363,0.21412087912087913,0.21461538461538462,0.21510989010989012,0.2156043956043956,0.2160989010989011,0.2165934065934066,0.2170879120879121,0.2175824175824176,0.21807692307692308,0.21857142857142858,0.21906593406593405,0.21956043956043955,0.22005494505494505,0.22054945054945055,0.22104395604395605,0.22153846153846155,0.22203296703296704,0.22252747252747251,0.223021978021978,0.2235164835164835,0.224010989010989,0.2245054945054945,0.225,0.2254945054945055,0.225989010989011,0.22648351648351647,0.22697802197802197,0.22747252747252747,0.22796703296703297,0.22846153846153847,0.22895604395604396,0.22945054945054946,0.22994505494505493,0.23043956043956043,0.23093406593406593,0.23142857142857143,0.23192307692307693,0.23241758241758242,0.23291208791208792,0.2334065934065934,0.2339010989010989,0.2343956043956044,0.2348901098901099,0.2353846153846154,0.23587912087912088,0.23637362637362638,0.23686813186813188,0.23736263736263735,0.23785714285714285,0.23835164835164835,0.23884615384615385,0.23934065934065935,0.23983516483516484,0.24032967032967034,0.2408241758241758,0.2413186813186813,0.2418131868131868,0.2423076923076923,0.2428021978021978,0.2432967032967033,0.2437912087912088,0.24428571428571427,0.24478021978021977,0.24527472527472527,0.24576923076923077,0.24626373626373627,0.24675824175824176,0.24725274725274726,0.24774725274725276,0.24824175824175823,0.24873626373626373,0.24923076923076923,0.24972527472527473,0.2502197802197802,0.2507142857142857,0.2512087912087912,0.2517032967032967,0.2521978021978022,0.2526923076923077,0.2531868131868132,0.25368131868131866,0.2541758241758242,0.25467032967032965,0.2551648351648352,0.25565934065934065,0.2561538461538462,0.25664835164835165,0.2571428571428571,0.25763736263736264,0.2581318681318681,0.25862637362637364,0.2591208791208791,0.25961538461538464,0.2601098901098901,0.2606043956043956,0.2610989010989011,0.2615934065934066,0.2620879120879121,0.26258241758241757,0.2630769230769231,0.26357142857142857,0.2640659340659341,0.26456043956043956,0.26505494505494503,0.26554945054945056,0.26604395604395603,0.26653846153846156,0.26703296703296703,0.26752747252747255,0.268021978021978,0.2685164835164835,0.269010989010989,0.2695054945054945,0.27,0.2704945054945055,0.270989010989011,0.2714835164835165,0.27197802197802196,0.2724725274725275,0.27296703296703295,0.2734615384615385,0.27395604395604395,0.2744505494505495,0.27494505494505495,0.2754395604395604,0.27593406593406594,0.2764285714285714,0.27692307692307694,0.2774175824175824,0.27791208791208794,0.2784065934065934,0.2789010989010989,0.2793956043956044,0.2798901098901099,0.2803846153846154,0.28087912087912087,0.2813736263736264,0.28186813186813187,0.28236263736263734,0.28285714285714286,0.28335164835164833,0.28384615384615386,0.28434065934065933,0.28483516483516486,0.2853296703296703,0.2858241758241758,0.2863186813186813,0.2868131868131868,0.2873076923076923,0.2878021978021978,0.2882967032967033,0.2887912087912088,0.2892857142857143,0.2897802197802198,0.29027472527472525,0.2907692307692308,0.29126373626373625,0.2917582417582418,0.29225274725274725,0.2927472527472528,0.29324175824175824,0.2937362637362637,0.29423076923076924,0.2947252747252747,0.29521978021978024,0.2957142857142857,0.29620879120879123,0.2967032967032967,0.2971978021978022,0.2976923076923077,0.29818681318681317,0.2986813186813187,0.29917582417582417,0.2996703296703297,0.30016483516483516,0.30065934065934063,0.30115384615384616,0.30164835164835163,0.30214285714285716,0.30263736263736263,0.30313186813186815,0.3036263736263736,0.3041208791208791,0.3046153846153846,0.3051098901098901,0.3056043956043956,0.3060989010989011,0.3065934065934066,0.3070879120879121,0.30758241758241756,0.3080769230769231,0.30857142857142855,0.3090659340659341,0.30956043956043955,0.3100549450549451,0.31054945054945055,0.31104395604395607,0.31153846153846154,0.312032967032967,0.31252747252747254,0.313021978021978,0.31351648351648354,0.314010989010989,0.31450549450549453,0.315,0.3154945054945055,0.315989010989011,0.31648351648351647,0.316978021978022,0.31747252747252747,0.317967032967033,0.31846153846153846,0.31895604395604393,0.31945054945054946,0.31994505494505493,0.32043956043956046,0.3209340659340659,0.32142857142857145,0.3219230769230769,0.3224175824175824,0.3229120879120879,0.3234065934065934,0.3239010989010989,0.3243956043956044,0.3248901098901099,0.3253846153846154,0.32587912087912085,0.3263736263736264,0.32686813186813185,0.3273626373626374,0.32785714285714285,0.3283516483516484,0.32884615384615384,0.3293406593406593,0.32983516483516484,0.3303296703296703,0.33082417582417584,0.3313186813186813,0.33181318681318683,0.3323076923076923,0.3328021978021978,0.3332967032967033,0.33379120879120877,0.3342857142857143,0.33478021978021977,0.3352747252747253,0.33576923076923076,0.3362637362637363,0.33675824175824176,0.33725274725274723,0.33774725274725276,0.33824175824175823,0.33873626373626375,0.3392307692307692,0.33972527472527475,0.3402197802197802,0.3407142857142857,0.3412087912087912,0.3417032967032967,0.3421978021978022,0.3426923076923077,0.3431868131868132,0.3436813186813187,0.34417582417582415,0.3446703296703297,0.34516483516483515,0.3456593406593407,0.34615384615384615,0.34664835164835167,0.34714285714285714,0.3476373626373626,0.34813186813186814,0.3486263736263736,0.34912087912087914,0.3496153846153846,0.35010989010989013,0.3506043956043956,0.3510989010989011,0.3515934065934066,0.35208791208791207,0.3525824175824176,0.35307692307692307,0.3535714285714286,0.35406593406593406,0.35456043956043953,0.35505494505494506,0.35554945054945053,0.35604395604395606,0.3565384615384615,0.35703296703296705,0.3575274725274725,0.35802197802197805,0.3585164835164835,0.359010989010989,0.3595054945054945,0.36,0.3604945054945055,0.360989010989011,0.3614835164835165,0.361978021978022,0.36247252747252745,0.362967032967033,0.36346153846153845,0.363956043956044,0.36445054945054944,0.36494505494505497,0.36543956043956044,0.3659340659340659,0.36642857142857144,0.3669230769230769,0.36741758241758243,0.3679120879120879,0.36840659340659343,0.3689010989010989,0.36939560439560437,0.3698901098901099,0.37038461538461537,0.3708791208791209,0.37137362637362636,0.3718681318681319,0.37236263736263736,0.37285714285714283,0.37335164835164836,0.37384615384615383,0.37434065934065935,0.3748351648351648,0.37532967032967035,0.3758241758241758,0.3763186813186813,0.3768131868131868,0.3773076923076923,0.3778021978021978,0.3782967032967033,0.3787912087912088,0.3792857142857143,0.3797802197802198,0.3802747252747253,0.38076923076923075,0.3812637362637363,0.38175824175824175,0.38225274725274727,0.38274725274725274,0.38324175824175827,0.38373626373626374,0.3842307692307692,0.38472527472527474,0.3852197802197802,0.38571428571428573,0.3862087912087912,0.38670329670329673,0.3871978021978022,0.38769230769230767,0.3881868131868132,0.38868131868131867,0.3891758241758242,0.38967032967032966,0.3901648351648352,0.39065934065934066,0.39115384615384613,0.39164835164835166,0.3921428571428571,0.39263736263736265,0.3931318681318681,0.39362637362637365,0.3941208791208791,0.3946153846153846,0.3951098901098901,0.3956043956043956,0.3960989010989011,0.3965934065934066,0.3970879120879121,0.3975824175824176,0.39807692307692305,0.3985714285714286,0.39906593406593405,0.3995604395604396,0.40005494505494504,0.40054945054945057,0.40104395604395604,0.4015384615384615,0.40203296703296704,0.4025274725274725,0.40302197802197803,0.4035164835164835,0.40401098901098903,0.4045054945054945,0.405,0.4054945054945055,0.40598901098901097,0.4064835164835165,0.40697802197802196,0.4074725274725275,0.40796703296703296,0.4084615384615385,0.40895604395604396,0.40945054945054943,0.40994505494505495,0.4104395604395604,0.41093406593406595,0.4114285714285714,0.41192307692307695,0.4124175824175824,0.4129120879120879,0.4134065934065934,0.4139010989010989,0.4143956043956044,0.4148901098901099,0.4153846153846154,0.4158791208791209,0.41637362637362635,0.4168681318681319,0.41736263736263735,0.41785714285714287,0.41835164835164834,0.41884615384615387,0.41934065934065934,0.4198351648351648,0.42032967032967034,0.4208241758241758,0.42131868131868133,0.4218131868131868,0.42230769230769233,0.4228021978021978,0.42329670329670327,0.4237912087912088,0.42428571428571427,0.4247802197802198,0.42527472527472526,0.4257692307692308,0.42626373626373626,0.4267582417582418,0.42725274725274726,0.4277472527472527,0.42824175824175825,0.4287362637362637,0.42923076923076925,0.4297252747252747,0.43021978021978025,0.4307142857142857,0.4312087912087912,0.4317032967032967,0.4321978021978022,0.4326923076923077,0.4331868131868132,0.4336813186813187,0.4341758241758242,0.43467032967032965,0.4351648351648352,0.43565934065934064,0.43615384615384617,0.43664835164835164,0.43714285714285717,0.43763736263736264,0.4381318681318681,0.43862637362637363,0.4391208791208791,0.43961538461538463,0.4401098901098901,0.4406043956043956,0.4410989010989011,0.44159340659340657,0.4420879120879121,0.44258241758241756,0.4430769230769231,0.44357142857142856,0.4440659340659341,0.44456043956043956,0.44505494505494503,0.44554945054945055,0.446043956043956,0.44653846153846155,0.447032967032967,0.44752747252747255,0.448021978021978,0.44851648351648354,0.449010989010989,0.4495054945054945,0.45,0.4504945054945055,0.450989010989011,0.4514835164835165,0.451978021978022,0.4524725274725275,0.45296703296703295,0.45346153846153847,0.45395604395604394,0.45445054945054947,0.45494505494505494,0.45543956043956046,0.45593406593406594,0.4564285714285714,0.45692307692307693,0.4574175824175824,0.45791208791208793,0.4584065934065934,0.4589010989010989,0.4593956043956044,0.45989010989010987,0.4603846153846154,0.46087912087912086,0.4613736263736264,0.46186813186813186,0.4623626373626374,0.46285714285714286,0.4633516483516483,0.46384615384615385,0.4643406593406593,0.46483516483516485,0.4653296703296703,0.46582417582417585,0.4663186813186813,0.4668131868131868,0.4673076923076923,0.4678021978021978,0.4682967032967033,0.4687912087912088,0.4692857142857143,0.4697802197802198,0.47027472527472525,0.4707692307692308,0.47126373626373624,0.47175824175824177,0.47225274725274724,0.47274725274725277,0.47324175824175824,0.47373626373626376,0.47423076923076923,0.4747252747252747,0.47521978021978023,0.4757142857142857,0.4762087912087912,0.4767032967032967,0.4771978021978022,0.4776923076923077,0.47818681318681316,0.4786813186813187,0.47917582417582416,0.4796703296703297,0.48016483516483516,0.4806593406593407,0.48115384615384615,0.4816483516483516,0.48214285714285715,0.4826373626373626,0.48313186813186815,0.4836263736263736,0.48412087912087914,0.4846153846153846,0.4851098901098901,0.4856043956043956,0.4860989010989011,0.4865934065934066,0.4870879120879121,0.4875824175824176,0.4880769230769231,0.48857142857142855,0.48906593406593407,0.48956043956043954,0.49005494505494507,0.49054945054945054,0.49104395604395606,0.49153846153846154,0.492032967032967,0.49252747252747253,0.493021978021978,0.49351648351648353,0.494010989010989,0.4945054945054945,0.495,0.4954945054945055,0.495989010989011,0.49648351648351646,0.496978021978022,0.49747252747252746,0.497967032967033,0.49846153846153846,0.498956043956044,0.49945054945054945,0.4999450549450549,0.5004395604395604,0.500934065934066,0.5014285714285714,0.5019230769230769,0.5024175824175824,0.5029120879120879,0.5034065934065934,0.5039010989010989,0.5043956043956044,0.5048901098901099,0.5053846153846154,0.5058791208791209,0.5063736263736264,0.5068681318681318,0.5073626373626373,0.5078571428571429,0.5083516483516484,0.5088461538461538,0.5093406593406593,0.5098351648351649,0.5103296703296704,0.5108241758241758,0.5113186813186813,0.5118131868131868,0.5123076923076924,0.5128021978021978,0.5132967032967033,0.5137912087912088,0.5142857142857142,0.5147802197802198,0.5152747252747253,0.5157692307692308,0.5162637362637362,0.5167582417582418,0.5172527472527473,0.5177472527472528,0.5182417582417582,0.5187362637362637,0.5192307692307693,0.5197252747252747,0.5202197802197802,0.5207142857142857,0.5212087912087912,0.5217032967032967,0.5221978021978022,0.5226923076923077,0.5231868131868131,0.5236813186813187,0.5241758241758242,0.5246703296703297,0.5251648351648351,0.5256593406593406,0.5261538461538462,0.5266483516483517,0.5271428571428571,0.5276373626373626,0.5281318681318682,0.5286263736263737,0.5291208791208791,0.5296153846153846,0.5301098901098901,0.5306043956043957,0.5310989010989011,0.5315934065934066,0.5320879120879121,0.5325824175824175,0.5330769230769231,0.5335714285714286,0.5340659340659341,0.5345604395604395,0.5350549450549451,0.5355494505494506,0.536043956043956,0.5365384615384615,0.537032967032967,0.5375274725274726,0.538021978021978,0.5385164835164835,0.539010989010989,0.5395054945054945,0.54,0.5404945054945055,0.540989010989011,0.5414835164835164,0.541978021978022,0.5424725274725275,0.542967032967033,0.5434615384615384,0.5439560439560439,0.5444505494505495,0.544945054945055,0.5454395604395604,0.5459340659340659,0.5464285714285714,0.546923076923077,0.5474175824175824,0.5479120879120879,0.5484065934065934,0.548901098901099,0.5493956043956044,0.5498901098901099,0.5503846153846154,0.5508791208791208,0.5513736263736264,0.5518681318681319,0.5523626373626374,0.5528571428571428,0.5533516483516484,0.5538461538461539,0.5543406593406593,0.5548351648351648,0.5553296703296703,0.5558241758241759,0.5563186813186813,0.5568131868131868,0.5573076923076923,0.5578021978021978,0.5582967032967033,0.5587912087912088,0.5592857142857143,0.5597802197802197,0.5602747252747253,0.5607692307692308,0.5612637362637363,0.5617582417582417,0.5622527472527472,0.5627472527472528,0.5632417582417583,0.5637362637362637,0.5642307692307692,0.5647252747252747,0.5652197802197803,0.5657142857142857,0.5662087912087912,0.5667032967032967,0.5671978021978022,0.5676923076923077,0.5681868131868132,0.5686813186813187,0.5691758241758241,0.5696703296703297,0.5701648351648352,0.5706593406593407,0.5711538461538461,0.5716483516483516,0.5721428571428572,0.5726373626373626,0.5731318681318681,0.5736263736263736,0.5741208791208792,0.5746153846153846,0.5751098901098901,0.5756043956043956,0.576098901098901,0.5765934065934066,0.5770879120879121,0.5775824175824176,0.578076923076923,0.5785714285714286,0.5790659340659341,0.5795604395604396,0.580054945054945,0.5805494505494505,0.5810439560439561,0.5815384615384616,0.582032967032967,0.5825274725274725,0.583021978021978,0.5835164835164836,0.584010989010989,0.5845054945054945,0.585,0.5854945054945055,0.585989010989011,0.5864835164835165,0.586978021978022,0.5874725274725274,0.587967032967033,0.5884615384615385,0.588956043956044,0.5894505494505494,0.5899450549450549,0.5904395604395605,0.5909340659340659,0.5914285714285714,0.5919230769230769,0.5924175824175825,0.5929120879120879,0.5934065934065934,0.5939010989010989,0.5943956043956043,0.5948901098901099,0.5953846153846154,0.5958791208791209,0.5963736263736263,0.5968681318681318,0.5973626373626374,0.5978571428571429,0.5983516483516483,0.5988461538461538,0.5993406593406594,0.5998351648351649,0.6003296703296703,0.6008241758241758,0.6013186813186813,0.6018131868131869,0.6023076923076923,0.6028021978021978,0.6032967032967033,0.6037912087912088,0.6042857142857143,0.6047802197802198,0.6052747252747253,0.6057692307692307,0.6062637362637363,0.6067582417582418,0.6072527472527472,0.6077472527472527,0.6082417582417582,0.6087362637362638,0.6092307692307692,0.6097252747252747,0.6102197802197802,0.6107142857142858,0.6112087912087912,0.6117032967032967,0.6121978021978022,0.6126923076923076,0.6131868131868132,0.6136813186813187,0.6141758241758242,0.6146703296703296,0.6151648351648351,0.6156593406593407,0.6161538461538462,0.6166483516483516,0.6171428571428571,0.6176373626373627,0.6181318681318682,0.6186263736263736,0.6191208791208791,0.6196153846153846,0.6201098901098901,0.6206043956043956,0.6210989010989011,0.6215934065934066,0.6220879120879121,0.6225824175824176,0.6230769230769231,0.6235714285714286,0.624065934065934,0.6245604395604396,0.6250549450549451,0.6255494505494505,0.626043956043956,0.6265384615384615,0.6270329670329671,0.6275274725274725,0.628021978021978,0.6285164835164835,0.6290109890109891,0.6295054945054945,0.63,0.6304945054945055,0.630989010989011,0.6314835164835165,0.631978021978022,0.6324725274725275,0.6329670329670329,0.6334615384615384,0.633956043956044,0.6344505494505495,0.6349450549450549,0.6354395604395604,0.635934065934066,0.6364285714285715,0.6369230769230769,0.6374175824175824,0.6379120879120879,0.6384065934065934,0.6389010989010989,0.6393956043956044,0.6398901098901099,0.6403846153846153,0.6408791208791209,0.6413736263736264,0.6418681318681319,0.6423626373626373,0.6428571428571429,0.6433516483516484,0.6438461538461538,0.6443406593406593,0.6448351648351648,0.6453296703296704,0.6458241758241758,0.6463186813186813,0.6468131868131868,0.6473076923076924,0.6478021978021978,0.6482967032967033,0.6487912087912088,0.6492857142857142,0.6497802197802198,0.6502747252747253,0.6507692307692308,0.6512637362637362,0.6517582417582417,0.6522527472527473,0.6527472527472528,0.6532417582417582,0.6537362637362637,0.6542307692307693,0.6547252747252748,0.6552197802197802,0.6557142857142857,0.6562087912087912,0.6567032967032967,0.6571978021978022,0.6576923076923077,0.6581868131868132,0.6586813186813186,0.6591758241758242,0.6596703296703297,0.6601648351648352,0.6606593406593406,0.6611538461538462,0.6616483516483517,0.6621428571428571,0.6626373626373626,0.6631318681318681,0.6636263736263737,0.6641208791208791,0.6646153846153846,0.6651098901098901,0.6656043956043955,0.6660989010989011,0.6665934065934066,0.6670879120879121,0.6675824175824175,0.6680769230769231,0.6685714285714286,0.6690659340659341,0.6695604395604395,0.670054945054945,0.6705494505494506,0.6710439560439561,0.6715384615384615,0.672032967032967,0.6725274725274726,0.673021978021978,0.6735164835164835,0.674010989010989,0.6745054945054945,0.675,0.6754945054945055,0.675989010989011,0.6764835164835165,0.6769780219780219,0.6774725274725275,0.677967032967033,0.6784615384615384,0.6789560439560439,0.6794505494505495,0.679945054945055,0.6804395604395604,0.6809340659340659,0.6814285714285714,0.681923076923077,0.6824175824175824,0.6829120879120879,0.6834065934065934,0.6839010989010988,0.6843956043956044,0.6848901098901099,0.6853846153846154,0.6858791208791208,0.6863736263736264,0.6868681318681319,0.6873626373626374,0.6878571428571428,0.6883516483516483,0.6888461538461539,0.6893406593406594,0.6898351648351648,0.6903296703296703,0.6908241758241759,0.6913186813186813,0.6918131868131868,0.6923076923076923,0.6928021978021978,0.6932967032967033,0.6937912087912088,0.6942857142857143,0.6947802197802198,0.6952747252747252,0.6957692307692308,0.6962637362637363,0.6967582417582417,0.6972527472527472,0.6977472527472528,0.6982417582417583,0.6987362637362637,0.6992307692307692,0.6997252747252747,0.7002197802197803,0.7007142857142857,0.7012087912087912,0.7017032967032967,0.7021978021978021,0.7026923076923077,0.7031868131868132,0.7036813186813187,0.7041758241758241,0.7046703296703297,0.7051648351648352,0.7056593406593407,0.7061538461538461,0.7066483516483516,0.7071428571428572,0.7076373626373627,0.7081318681318681,0.7086263736263736,0.7091208791208791,0.7096153846153846,0.7101098901098901,0.7106043956043956,0.7110989010989011,0.7115934065934066,0.7120879120879121,0.7125824175824176,0.713076923076923,0.7135714285714285,0.7140659340659341,0.7145604395604396,0.715054945054945,0.7155494505494505,0.7160439560439561,0.7165384615384616,0.717032967032967,0.7175274725274725,0.718021978021978,0.7185164835164836,0.719010989010989,0.7195054945054945,0.72,0.7204945054945054,0.720989010989011,0.7214835164835165,0.721978021978022,0.7224725274725274,0.722967032967033,0.7234615384615385,0.723956043956044,0.7244505494505494,0.7249450549450549,0.7254395604395605,0.725934065934066,0.7264285714285714,0.7269230769230769,0.7274175824175824,0.727912087912088,0.7284065934065934,0.7289010989010989,0.7293956043956044,0.7298901098901099,0.7303846153846154,0.7308791208791209,0.7313736263736264,0.7318681318681318,0.7323626373626374,0.7328571428571429,0.7333516483516483,0.7338461538461538,0.7343406593406593,0.7348351648351649,0.7353296703296703,0.7358241758241758,0.7363186813186813,0.7368131868131869,0.7373076923076923,0.7378021978021978,0.7382967032967033,0.7387912087912087,0.7392857142857143,0.7397802197802198,0.7402747252747253,0.7407692307692307,0.7412637362637363,0.7417582417582418,0.7422527472527473,0.7427472527472527,0.7432417582417582,0.7437362637362638,0.7442307692307693,0.7447252747252747,0.7452197802197802,0.7457142857142857,0.7462087912087912,0.7467032967032967,0.7471978021978022,0.7476923076923077,0.7481868131868132,0.7486813186813187,0.7491758241758242,0.7496703296703296,0.7501648351648351,0.7506593406593407,0.7511538461538462,0.7516483516483516,0.7521428571428571,0.7526373626373626,0.7531318681318682,0.7536263736263736,0.7541208791208791,0.7546153846153846,0.7551098901098902,0.7556043956043956,0.7560989010989011,0.7565934065934066,0.757087912087912,0.7575824175824176,0.7580769230769231,0.7585714285714286,0.759065934065934,0.7595604395604396,0.7600549450549451,0.7605494505494506,0.761043956043956,0.7615384615384615,0.7620329670329671,0.7625274725274725,0.763021978021978,0.7635164835164835,0.764010989010989,0.7645054945054945,0.765,0.7654945054945055,0.765989010989011,0.7664835164835165,0.766978021978022,0.7674725274725275,0.767967032967033,0.7684615384615384,0.768956043956044,0.7694505494505495,0.7699450549450549,0.7704395604395604,0.7709340659340659,0.7714285714285715,0.7719230769230769,0.7724175824175824,0.7729120879120879,0.7734065934065935,0.7739010989010989,0.7743956043956044,0.7748901098901099,0.7753846153846153,0.7758791208791209,0.7763736263736264,0.7768681318681319,0.7773626373626373,0.7778571428571428,0.7783516483516484,0.7788461538461539,0.7793406593406593,0.7798351648351648,0.7803296703296704,0.7808241758241758,0.7813186813186813,0.7818131868131868,0.7823076923076923,0.7828021978021978,0.7832967032967033,0.7837912087912088,0.7842857142857143,0.7847802197802198,0.7852747252747253,0.7857692307692308,0.7862637362637362,0.7867582417582417,0.7872527472527473,0.7877472527472528,0.7882417582417582,0.7887362637362637,0.7892307692307692,0.7897252747252748,0.7902197802197802,0.7907142857142857,0.7912087912087912,0.7917032967032968,0.7921978021978022,0.7926923076923077,0.7931868131868132,0.7936813186813186,0.7941758241758242,0.7946703296703297,0.7951648351648352,0.7956593406593406,0.7961538461538461,0.7966483516483517,0.7971428571428572,0.7976373626373626,0.7981318681318681,0.7986263736263737,0.7991208791208791,0.7996153846153846,0.8001098901098901,0.8006043956043956,0.8010989010989011,0.8015934065934066,0.8020879120879121,0.8025824175824176,0.803076923076923,0.8035714285714286,0.8040659340659341,0.8045604395604395,0.805054945054945,0.8055494505494506,0.8060439560439561,0.8065384615384615,0.807032967032967,0.8075274725274725,0.8080219780219781,0.8085164835164835,0.809010989010989,0.8095054945054945,0.81,0.8104945054945055,0.810989010989011,0.8114835164835165,0.8119780219780219,0.8124725274725275,0.812967032967033,0.8134615384615385,0.8139560439560439,0.8144505494505494,0.814945054945055,0.8154395604395605,0.8159340659340659,0.8164285714285714,0.816923076923077,0.8174175824175824,0.8179120879120879,0.8184065934065934,0.8189010989010989,0.8193956043956044,0.8198901098901099,0.8203846153846154,0.8208791208791208,0.8213736263736263,0.8218681318681319,0.8223626373626374,0.8228571428571428,0.8233516483516483,0.8238461538461539,0.8243406593406594,0.8248351648351648,0.8253296703296703,0.8258241758241758,0.8263186813186814,0.8268131868131868,0.8273076923076923,0.8278021978021978,0.8282967032967034,0.8287912087912088,0.8292857142857143,0.8297802197802198,0.8302747252747252,0.8307692307692308,0.8312637362637363,0.8317582417582418,0.8322527472527472,0.8327472527472527,0.8332417582417583,0.8337362637362637,0.8342307692307692,0.8347252747252747,0.8352197802197803,0.8357142857142857,0.8362087912087912,0.8367032967032967,0.8371978021978022,0.8376923076923077,0.8381868131868132,0.8386813186813187,0.8391758241758241,0.8396703296703296,0.8401648351648352,0.8406593406593407,0.8411538461538461,0.8416483516483516,0.8421428571428572,0.8426373626373627,0.8431318681318681,0.8436263736263736,0.8441208791208791,0.8446153846153847,0.8451098901098901,0.8456043956043956,0.8460989010989011,0.8465934065934065,0.8470879120879121,0.8475824175824176,0.8480769230769231,0.8485714285714285,0.8490659340659341,0.8495604395604396,0.850054945054945,0.8505494505494505,0.851043956043956,0.8515384615384616,0.852032967032967,0.8525274725274725,0.853021978021978,0.8535164835164836,0.854010989010989,0.8545054945054945,0.855,0.8554945054945055,0.855989010989011,0.8564835164835165,0.856978021978022,0.8574725274725274,0.8579670329670329,0.8584615384615385,0.858956043956044,0.8594505494505494,0.8599450549450549,0.8604395604395605,0.860934065934066,0.8614285714285714,0.8619230769230769,0.8624175824175824,0.862912087912088,0.8634065934065934,0.8639010989010989,0.8643956043956044,0.8648901098901098,0.8653846153846154,0.8658791208791209,0.8663736263736264,0.8668681318681318,0.8673626373626374,0.8678571428571429,0.8683516483516484,0.8688461538461538,0.8693406593406593,0.8698351648351649,0.8703296703296703,0.8708241758241758,0.8713186813186813,0.8718131868131868,0.8723076923076923,0.8728021978021978,0.8732967032967033,0.8737912087912088,0.8742857142857143,0.8747802197802198,0.8752747252747253,0.8757692307692307,0.8762637362637362,0.8767582417582418,0.8772527472527473,0.8777472527472527,0.8782417582417582,0.8787362637362638,0.8792307692307693,0.8797252747252747,0.8802197802197802,0.8807142857142857,0.8812087912087913,0.8817032967032967,0.8821978021978022,0.8826923076923077,0.8831868131868131,0.8836813186813187,0.8841758241758242,0.8846703296703297,0.8851648351648351,0.8856593406593407,0.8861538461538462,0.8866483516483517,0.8871428571428571,0.8876373626373626,0.8881318681318682,0.8886263736263736,0.8891208791208791,0.8896153846153846,0.8901098901098901,0.8906043956043956,0.8910989010989011,0.8915934065934066,0.892087912087912,0.8925824175824176,0.8930769230769231,0.8935714285714286,0.894065934065934,0.8945604395604395,0.8950549450549451,0.8955494505494506,0.896043956043956,0.8965384615384615,0.8970329670329671,0.8975274725274726,0.898021978021978,0.8985164835164835,0.899010989010989,0.8995054945054946,0.9,0.9004945054945055,0.900989010989011,0.9014835164835164,0.901978021978022,0.9024725274725275,0.902967032967033,0.9034615384615384,0.903956043956044,0.9044505494505495,0.904945054945055,0.9054395604395604,0.9059340659340659,0.9064285714285715,0.9069230769230769,0.9074175824175824,0.9079120879120879,0.9084065934065934,0.9089010989010989,0.9093956043956044,0.9098901098901099,0.9103846153846153,0.9108791208791209,0.9113736263736264,0.9118681318681319,0.9123626373626373,0.9128571428571428,0.9133516483516484,0.9138461538461539,0.9143406593406593,0.9148351648351648,0.9153296703296703,0.9158241758241759,0.9163186813186813,0.9168131868131868,0.9173076923076923,0.9178021978021978,0.9182967032967033,0.9187912087912088,0.9192857142857143,0.9197802197802197,0.9202747252747253,0.9207692307692308,0.9212637362637363,0.9217582417582417,0.9222527472527473,0.9227472527472528,0.9232417582417582,0.9237362637362637,0.9242307692307692,0.9247252747252748,0.9252197802197802,0.9257142857142857,0.9262087912087912,0.9267032967032967,0.9271978021978022,0.9276923076923077,0.9281868131868132,0.9286813186813186,0.9291758241758242,0.9296703296703297,0.9301648351648352,0.9306593406593406,0.9311538461538461,0.9316483516483517,0.9321428571428572,0.9326373626373626,0.9331318681318681,0.9336263736263736,0.9341208791208792,0.9346153846153846,0.9351098901098901,0.9356043956043956,0.9360989010989011,0.9365934065934066,0.9370879120879121,0.9375824175824176,0.938076923076923,0.9385714285714286,0.9390659340659341,0.9395604395604396,0.940054945054945,0.9405494505494505,0.9410439560439561,0.9415384615384615,0.942032967032967,0.9425274725274725,0.9430219780219781,0.9435164835164835,0.944010989010989,0.9445054945054945,0.945,0.9454945054945055,0.945989010989011,0.9464835164835165,0.9469780219780219,0.9474725274725275,0.947967032967033,0.9484615384615385,0.9489560439560439,0.9494505494505494,0.949945054945055,0.9504395604395605,0.9509340659340659,0.9514285714285714,0.9519230769230769,0.9524175824175825,0.9529120879120879,0.9534065934065934,0.9539010989010989,0.9543956043956044,0.9548901098901099,0.9553846153846154,0.9558791208791209,0.9563736263736263,0.9568681318681319,0.9573626373626374,0.9578571428571429,0.9583516483516483,0.9588461538461538,0.9593406593406594,0.9598351648351648,0.9603296703296703,0.9608241758241758,0.9613186813186814,0.9618131868131868,0.9623076923076923,0.9628021978021978,0.9632967032967032,0.9637912087912088,0.9642857142857143,0.9647802197802198,0.9652747252747252,0.9657692307692308,0.9662637362637363,0.9667582417582418,0.9672527472527472,0.9677472527472527,0.9682417582417583,0.9687362637362638,0.9692307692307692,0.9697252747252747,0.9702197802197802,0.9707142857142858,0.9712087912087912,0.9717032967032967,0.9721978021978022,0.9726923076923077,0.9731868131868132,0.9736813186813187,0.9741758241758242,0.9746703296703296,0.9751648351648352,0.9756593406593407,0.9761538461538461,0.9766483516483516,0.9771428571428571,0.9776373626373627,0.9781318681318681,0.9786263736263736,0.9791208791208791,0.9796153846153847,0.9801098901098901,0.9806043956043956,0.9810989010989011,0.9815934065934065,0.9820879120879121,0.9825824175824176,0.9830769230769231,0.9835714285714285,0.984065934065934,0.9845604395604396,0.9850549450549451,0.9855494505494505,0.986043956043956,0.9865384615384616,0.9870329670329671,0.9875274725274725,0.988021978021978,0.9885164835164835,0.989010989010989,0.9895054945054945,0.99]}
},{}],77:[function(require,module,exports){
module.exports={"expected":[-1.0e-200,-9.995004995054944e-201,-9.99000999010989e-201,-9.985014985164835e-201,-9.980019980219779e-201,-9.975024975274725e-201,-9.97002997032967e-201,-9.965034965384615e-201,-9.96003996043956e-201,-9.955044955494505e-201,-9.950049950549451e-201,-9.945054945604396e-201,-9.940059940659339e-201,-9.935064935714285e-201,-9.93006993076923e-201,-9.925074925824176e-201,-9.920079920879122e-201,-9.915084915934067e-201,-9.910089910989011e-201,-9.905094906043957e-201,-9.9000999010989e-201,-9.895104896153845e-201,-9.890109891208791e-201,-9.885114886263736e-201,-9.880119881318681e-201,-9.875124876373627e-201,-9.870129871428572e-201,-9.865134866483516e-201,-9.860139861538461e-201,-9.855144856593406e-201,-9.850149851648352e-201,-9.845154846703296e-201,-9.840159841758241e-201,-9.835164836813187e-201,-9.830169831868132e-201,-9.825174826923075e-201,-9.820179821978021e-201,-9.815184817032966e-201,-9.81018981208791e-201,-9.805194807142857e-201,-9.800199802197803e-201,-9.795204797252748e-201,-9.790209792307694e-201,-9.785214787362637e-201,-9.780219782417582e-201,-9.775224777472528e-201,-9.770229772527472e-201,-9.765234767582419e-201,-9.760239762637363e-201,-9.755244757692308e-201,-9.750249752747253e-201,-9.745254747802197e-201,-9.740259742857142e-201,-9.735264737912088e-201,-9.730269732967033e-201,-9.725274728021977e-201,-9.720279723076924e-201,-9.715284718131868e-201,-9.710289713186811e-201,-9.705294708241758e-201,-9.700299703296702e-201,-9.695304698351647e-201,-9.690309693406593e-201,-9.685314688461538e-201,-9.680319683516484e-201,-9.67532467857143e-201,-9.670329673626373e-201,-9.665334668681318e-201,-9.660339663736264e-201,-9.655344658791209e-201,-9.650349653846155e-201,-9.6453546489011e-201,-9.640359643956044e-201,-9.635364639010989e-201,-9.630369634065934e-201,-9.625374629120878e-201,-9.620379624175824e-201,-9.615384619230769e-201,-9.610389614285714e-201,-9.60539460934066e-201,-9.600399604395605e-201,-9.595404599450548e-201,-9.590409594505494e-201,-9.585414589560439e-201,-9.580419584615383e-201,-9.57542457967033e-201,-9.570429574725274e-201,-9.565434569780219e-201,-9.560439564835165e-201,-9.55544455989011e-201,-9.550449554945054e-201,-9.54545455e-201,-9.540459545054945e-201,-9.535464540109891e-201,-9.530469535164836e-201,-9.52547453021978e-201,-9.520479525274725e-201,-9.51548452032967e-201,-9.510489515384615e-201,-9.505494510439561e-201,-9.500499505494505e-201,-9.49550450054945e-201,-9.490509495604396e-201,-9.485514490659341e-201,-9.480519485714284e-201,-9.47552448076923e-201,-9.470529475824175e-201,-9.46553447087912e-201,-9.460539465934066e-201,-9.45554446098901e-201,-9.450549456043955e-201,-9.445554451098901e-201,-9.440559446153844e-201,-9.435564441208792e-201,-9.430569436263737e-201,-9.425574431318681e-201,-9.420579426373628e-201,-9.415584421428572e-201,-9.410589416483517e-201,-9.405594411538463e-201,-9.400599406593406e-201,-9.395604401648351e-201,-9.390609396703297e-201,-9.385614391758242e-201,-9.380619386813186e-201,-9.375624381868133e-201,-9.370629376923077e-201,-9.36563437197802e-201,-9.360639367032967e-201,-9.355644362087911e-201,-9.350649357142856e-201,-9.345654352197802e-201,-9.340659347252747e-201,-9.335664342307691e-201,-9.330669337362638e-201,-9.325674332417581e-201,-9.320679327472527e-201,-9.315684322527473e-201,-9.310689317582418e-201,-9.305694312637364e-201,-9.300699307692309e-201,-9.295704302747253e-201,-9.2907092978022e-201,-9.285714292857143e-201,-9.280719287912087e-201,-9.275724282967033e-201,-9.270729278021978e-201,-9.265734273076923e-201,-9.260739268131869e-201,-9.255744263186814e-201,-9.250749258241757e-201,-9.245754253296703e-201,-9.240759248351648e-201,-9.235764243406592e-201,-9.230769238461538e-201,-9.225774233516483e-201,-9.220779228571428e-201,-9.215784223626374e-201,-9.210789218681317e-201,-9.205794213736263e-201,-9.200799208791208e-201,-9.195804203846153e-201,-9.1908091989011e-201,-9.185814193956045e-201,-9.18081918901099e-201,-9.175824184065936e-201,-9.170829179120879e-201,-9.165834174175824e-201,-9.16083916923077e-201,-9.155844164285714e-201,-9.150849159340659e-201,-9.145854154395605e-201,-9.14085914945055e-201,-9.135864144505493e-201,-9.130869139560439e-201,-9.125874134615384e-201,-9.120879129670329e-201,-9.115884124725275e-201,-9.11088911978022e-201,-9.105894114835165e-201,-9.10089910989011e-201,-9.095904104945053e-201,-9.0909091e-201,-9.085914095054944e-201,-9.080919090109889e-201,-9.075924085164835e-201,-9.070929080219781e-201,-9.065934075274726e-201,-9.060939070329672e-201,-9.055944065384615e-201,-9.05094906043956e-201,-9.045954055494506e-201,-9.04095905054945e-201,-9.035964045604395e-201,-9.030969040659341e-201,-9.025974035714286e-201,-9.02097903076923e-201,-9.015984025824176e-201,-9.01098902087912e-201,-9.005994015934065e-201,-9.000999010989011e-201,-8.996004006043956e-201,-8.991009001098902e-201,-8.986013996153846e-201,-8.98101899120879e-201,-8.976023986263736e-201,-8.97102898131868e-201,-8.966033976373625e-201,-8.961038971428571e-201,-8.956043966483516e-201,-8.95104896153846e-201,-8.946053956593408e-201,-8.941058951648352e-201,-8.936063946703296e-201,-8.931068941758242e-201,-8.926073936813187e-201,-8.921078931868132e-201,-8.916083926923078e-201,-8.911088921978022e-201,-8.906093917032966e-201,-8.901098912087912e-201,-8.896103907142857e-201,-8.891108902197803e-201,-8.886113897252747e-201,-8.881118892307692e-201,-8.876123887362638e-201,-8.871128882417583e-201,-8.866133877472526e-201,-8.861138872527472e-201,-8.856143867582417e-201,-8.851148862637362e-201,-8.846153857692308e-201,-8.841158852747252e-201,-8.836163847802197e-201,-8.831168842857143e-201,-8.826173837912088e-201,-8.821178832967032e-201,-8.816183828021979e-201,-8.811188823076923e-201,-8.806193818131868e-201,-8.801198813186814e-201,-8.796203808241759e-201,-8.791208803296702e-201,-8.786213798351648e-201,-8.781218793406593e-201,-8.776223788461539e-201,-8.771228783516484e-201,-8.766233778571428e-201,-8.761238773626374e-201,-8.756243768681319e-201,-8.751248763736262e-201,-8.746253758791208e-201,-8.741258753846153e-201,-8.736263748901098e-201,-8.731268743956044e-201,-8.726273739010989e-201,-8.721278734065933e-201,-8.71628372912088e-201,-8.711288724175823e-201,-8.706293719230769e-201,-8.701298714285715e-201,-8.69630370934066e-201,-8.691308704395604e-201,-8.68631369945055e-201,-8.681318694505495e-201,-8.676323689560438e-201,-8.671328684615384e-201,-8.666333679670329e-201,-8.661338674725275e-201,-8.65634366978022e-201,-8.651348664835165e-201,-8.646353659890111e-201,-8.641358654945055e-201,-8.636363649999999e-201,-8.631368645054945e-201,-8.62637364010989e-201,-8.621378635164834e-201,-8.61638363021978e-201,-8.611388625274725e-201,-8.60639362032967e-201,-8.601398615384616e-201,-8.596403610439559e-201,-8.591408605494504e-201,-8.58641360054945e-201,-8.581418595604396e-201,-8.57642359065934e-201,-8.571428585714287e-201,-8.566433580769231e-201,-8.561438575824176e-201,-8.556443570879121e-201,-8.551448565934065e-201,-8.546453560989012e-201,-8.541458556043956e-201,-8.536463551098901e-201,-8.531468546153847e-201,-8.526473541208792e-201,-8.521478536263735e-201,-8.516483531318681e-201,-8.511488526373626e-201,-8.50649352142857e-201,-8.501498516483517e-201,-8.496503511538461e-201,-8.491508506593406e-201,-8.486513501648352e-201,-8.481518496703295e-201,-8.47652349175824e-201,-8.471528486813186e-201,-8.466533481868131e-201,-8.461538476923077e-201,-8.456543471978023e-201,-8.451548467032968e-201,-8.446553462087912e-201,-8.441558457142857e-201,-8.436563452197802e-201,-8.431568447252748e-201,-8.426573442307693e-201,-8.421578437362637e-201,-8.416583432417583e-201,-8.411588427472528e-201,-8.406593422527471e-201,-8.401598417582417e-201,-8.396603412637362e-201,-8.391608407692307e-201,-8.386613402747253e-201,-8.381618397802198e-201,-8.376623392857142e-201,-8.371628387912088e-201,-8.366633382967032e-201,-8.361638378021976e-201,-8.356643373076922e-201,-8.351648368131867e-201,-8.346653363186812e-201,-8.34165835824176e-201,-8.336663353296704e-201,-8.33166834835165e-201,-8.326673343406593e-201,-8.321678338461538e-201,-8.316683333516484e-201,-8.311688328571429e-201,-8.306693323626374e-201,-8.30169831868132e-201,-8.296703313736264e-201,-8.291708308791208e-201,-8.286713303846154e-201,-8.281718298901098e-201,-8.276723293956043e-201,-8.271728289010989e-201,-8.266733284065934e-201,-8.261738279120879e-201,-8.256743274175825e-201,-8.251748269230768e-201,-8.246753264285713e-201,-8.241758259340659e-201,-8.236763254395603e-201,-8.23176824945055e-201,-8.226773244505494e-201,-8.221778239560439e-201,-8.216783234615386e-201,-8.21178822967033e-201,-8.206793224725274e-201,-8.20179821978022e-201,-8.196803214835165e-201,-8.19180820989011e-201,-8.186813204945056e-201,-8.1818182e-201,-8.176823195054944e-201,-8.17182819010989e-201,-8.166833185164835e-201,-8.16183818021978e-201,-8.156843175274726e-201,-8.15184817032967e-201,-8.146853165384615e-201,-8.141858160439561e-201,-8.136863155494504e-201,-8.131868150549449e-201,-8.126873145604395e-201,-8.12187814065934e-201,-8.116883135714286e-201,-8.11188813076923e-201,-8.106893125824175e-201,-8.101898120879121e-201,-8.096903115934066e-201,-8.09190811098901e-201,-8.086913106043957e-201,-8.081918101098902e-201,-8.076923096153846e-201,-8.071928091208792e-201,-8.066933086263737e-201,-8.06193808131868e-201,-8.056943076373626e-201,-8.051948071428571e-201,-8.046953066483516e-201,-8.041958061538462e-201,-8.036963056593407e-201,-8.031968051648351e-201,-8.026973046703297e-201,-8.02197804175824e-201,-8.016983036813185e-201,-8.011988031868131e-201,-8.006993026923076e-201,-8.001998021978022e-201,-7.997003017032967e-201,-7.992008012087912e-201,-7.987013007142858e-201,-7.982018002197801e-201,-7.977022997252746e-201,-7.972027992307693e-201,-7.967032987362638e-201,-7.962037982417583e-201,-7.957042977472529e-201,-7.952047972527473e-201,-7.947052967582417e-201,-7.942057962637363e-201,-7.937062957692307e-201,-7.932067952747252e-201,-7.927072947802198e-201,-7.922077942857143e-201,-7.917082937912088e-201,-7.912087932967034e-201,-7.907092928021977e-201,-7.902097923076923e-201,-7.897102918131868e-201,-7.892107913186812e-201,-7.887112908241759e-201,-7.882117903296703e-201,-7.877122898351648e-201,-7.872127893406594e-201,-7.867132888461537e-201,-7.862137883516482e-201,-7.857142878571428e-201,-7.852147873626374e-201,-7.847152868681319e-201,-7.842157863736265e-201,-7.83716285879121e-201,-7.832167853846153e-201,-7.827172848901099e-201,-7.822177843956044e-201,-7.817182839010988e-201,-7.812187834065934e-201,-7.807192829120879e-201,-7.802197824175825e-201,-7.79720281923077e-201,-7.792207814285713e-201,-7.78721280934066e-201,-7.782217804395604e-201,-7.777222799450549e-201,-7.772227794505495e-201,-7.76723278956044e-201,-7.762237784615384e-201,-7.75724277967033e-201,-7.752247774725274e-201,-7.747252769780218e-201,-7.742257764835164e-201,-7.737262759890109e-201,-7.732267754945055e-201,-7.727272750000001e-201,-7.722277745054946e-201,-7.717282740109889e-201,-7.712287735164835e-201,-7.70729273021978e-201,-7.702297725274725e-201,-7.697302720329671e-201,-7.692307715384615e-201,-7.687312710439562e-201,-7.682317705494506e-201,-7.67732270054945e-201,-7.672327695604396e-201,-7.66733269065934e-201,-7.662337685714285e-201,-7.657342680769231e-201,-7.652347675824176e-201,-7.64735267087912e-201,-7.642357665934067e-201,-7.63736266098901e-201,-7.632367656043955e-201,-7.6273726510989e-201,-7.622377646153845e-201,-7.61738264120879e-201,-7.612387636263736e-201,-7.607392631318682e-201,-7.602397626373626e-201,-7.597402621428572e-201,-7.592407616483516e-201,-7.587412611538461e-201,-7.582417606593407e-201,-7.577422601648352e-201,-7.572427596703298e-201,-7.567432591758243e-201,-7.562437586813186e-201,-7.557442581868132e-201,-7.552447576923077e-201,-7.547452571978021e-201,-7.542457567032967e-201,-7.537462562087912e-201,-7.532467557142857e-201,-7.527472552197803e-201,-7.522477547252746e-201,-7.517482542307691e-201,-7.512487537362637e-201,-7.507492532417582e-201,-7.502497527472526e-201,-7.497502522527472e-201,-7.492507517582417e-201,-7.487512512637362e-201,-7.482517507692308e-201,-7.477522502747253e-201,-7.472527497802199e-201,-7.467532492857143e-201,-7.462537487912088e-201,-7.457542482967034e-201,-7.452547478021979e-201,-7.447552473076922e-201,-7.442557468131868e-201,-7.437562463186813e-201,-7.432567458241758e-201,-7.427572453296704e-201,-7.422577448351648e-201,-7.417582443406593e-201,-7.412587438461539e-201,-7.407592433516482e-201,-7.402597428571427e-201,-7.397602423626373e-201,-7.392607418681318e-201,-7.387612413736263e-201,-7.382617408791209e-201,-7.377622403846153e-201,-7.372627398901097e-201,-7.367632393956044e-201,-7.362637389010989e-201,-7.357642384065935e-201,-7.35264737912088e-201,-7.347652374175824e-201,-7.34265736923077e-201,-7.337662364285715e-201,-7.332667359340658e-201,-7.327672354395605e-201,-7.32267734945055e-201,-7.317682344505494e-201,-7.31268733956044e-201,-7.307692334615385e-201,-7.30269732967033e-201,-7.297702324725276e-201,-7.292707319780219e-201,-7.287712314835163e-201,-7.28271730989011e-201,-7.277722304945054e-201,-7.272727299999999e-201,-7.267732295054945e-201,-7.26273729010989e-201,-7.257742285164834e-201,-7.252747280219779e-201,-7.247752275274724e-201,-7.242757270329671e-201,-7.237762265384616e-201,-7.232767260439561e-201,-7.227772255494507e-201,-7.222777250549452e-201,-7.217782245604395e-201,-7.212787240659341e-201,-7.207792235714286e-201,-7.20279723076923e-201,-7.197802225824176e-201,-7.192807220879121e-201,-7.187812215934066e-201,-7.182817210989012e-201,-7.177822206043955e-201,-7.1728272010989e-201,-7.167832196153846e-201,-7.16283719120879e-201,-7.157842186263735e-201,-7.152847181318681e-201,-7.147852176373626e-201,-7.142857171428572e-201,-7.137862166483515e-201,-7.13286716153846e-201,-7.127872156593406e-201,-7.122877151648352e-201,-7.117882146703297e-201,-7.112887141758243e-201,-7.107892136813188e-201,-7.102897131868131e-201,-7.097902126923077e-201,-7.092907121978022e-201,-7.087912117032967e-201,-7.082917112087913e-201,-7.077922107142857e-201,-7.072927102197802e-201,-7.067932097252748e-201,-7.062937092307691e-201,-7.057942087362636e-201,-7.052947082417582e-201,-7.047952077472527e-201,-7.042957072527472e-201,-7.037962067582418e-201,-7.032967062637362e-201,-7.027972057692309e-201,-7.022977052747252e-201,-7.017982047802196e-201,-7.012987042857143e-201,-7.007992037912087e-201,-7.002997032967032e-201,-6.99800202802198e-201,-6.993007023076924e-201,-6.988012018131867e-201,-6.983017013186814e-201,-6.978022008241758e-201,-6.973027003296703e-201,-6.968031998351649e-201,-6.963036993406594e-201,-6.958041988461538e-201,-6.953046983516485e-201,-6.948051978571428e-201,-6.943056973626372e-201,-6.938061968681319e-201,-6.933066963736263e-201,-6.92807195879121e-201,-6.923076953846154e-201,-6.918081948901099e-201,-6.913086943956045e-201,-6.908091939010988e-201,-6.903096934065933e-201,-6.898101929120879e-201,-6.893106924175824e-201,-6.888111919230768e-201,-6.883116914285714e-201,-6.87812190934066e-201,-6.873126904395604e-201,-6.86813189945055e-201,-6.863136894505495e-201,-6.858141889560439e-201,-6.853146884615385e-201,-6.84815187967033e-201,-6.843156874725275e-201,-6.838161869780221e-201,-6.833166864835164e-201,-6.828171859890109e-201,-6.823176854945055e-201,-6.81818185e-201,-6.813186845054946e-201,-6.80819184010989e-201,-6.803196835164835e-201,-6.798201830219781e-201,-6.793206825274724e-201,-6.788211820329669e-201,-6.783216815384615e-201,-6.77822181043956e-201,-6.773226805494505e-201,-6.76823180054945e-201,-6.763236795604395e-201,-6.75824179065934e-201,-6.753246785714286e-201,-6.748251780769231e-201,-6.743256775824176e-201,-6.738261770879122e-201,-6.733266765934066e-201,-6.728271760989011e-201,-6.723276756043957e-201,-6.7182817510989e-201,-6.713286746153845e-201,-6.708291741208791e-201,-6.703296736263736e-201,-6.698301731318682e-201,-6.693306726373627e-201,-6.688311721428571e-201,-6.683316716483517e-201,-6.67832171153846e-201,-6.673326706593407e-201,-6.668331701648352e-201,-6.663336696703296e-201,-6.658341691758242e-201,-6.653346686813187e-201,-6.648351681868132e-201,-6.643356676923076e-201,-6.638361671978022e-201,-6.633366667032967e-201,-6.628371662087912e-201,-6.623376657142857e-201,-6.618381652197803e-201,-6.613386647252746e-201,-6.608391642307692e-201,-6.603396637362638e-201,-6.598401632417583e-201,-6.593406627472527e-201,-6.588411622527472e-201,-6.583416617582418e-201,-6.578421612637363e-201,-6.573426607692308e-201,-6.568431602747252e-201,-6.563436597802197e-201,-6.558441592857143e-201,-6.553446587912088e-201,-6.548451582967033e-201,-6.543456578021979e-201,-6.538461573076923e-201,-6.533466568131868e-201,-6.5284715631868134e-201,-6.523476558241758e-201,-6.518481553296703e-201,-6.513486548351648e-201,-6.5084915434065936e-201,-6.503496538461538e-201,-6.498501533516483e-201,-6.493506528571428e-201,-6.488511523626373e-201,-6.483516518681319e-201,-6.478521513736264e-201,-6.4735265087912085e-201,-6.468531503846154e-201,-6.463536498901099e-201,-6.458541493956044e-201,-6.453546489010989e-201,-6.448551484065934e-201,-6.4435564791208795e-201,-6.4385614741758234e-201,-6.433566469230769e-201,-6.428571464285714e-201,-6.4235764593406596e-201,-6.418581454395604e-201,-6.41358644945055e-201,-6.408591444505495e-201,-6.403596439560439e-201,-6.3986014346153845e-201,-6.39360642967033e-201,-6.3886114247252746e-201,-6.383616419780219e-201,-6.378621414835165e-201,-6.373626409890109e-201,-6.368631404945055e-201,-6.3636363999999994e-201,-6.358641395054945e-201,-6.35364639010989e-201,-6.3486513851648356e-201,-6.34365638021978e-201,-6.338661375274725e-201,-6.3336663703296704e-201,-6.328671365384616e-201,-6.32367636043956e-201,-6.318681355494505e-201,-6.3136863505494505e-201,-6.308691345604395e-201,-6.30369634065934e-201,-6.298701335714286e-201,-6.2937063307692314e-201,-6.2887113258241754e-201,-6.283716320879121e-201,-6.278721315934066e-201,-6.273726310989011e-201,-6.2687313060439556e-201,-6.263736301098901e-201,-6.2587412961538456e-201,-6.253746291208791e-201,-6.248751286263736e-201,-6.243756281318681e-201,-6.2387612763736265e-201,-6.233766271428572e-201,-6.2287712664835166e-201,-6.223776261538461e-201,-6.218781256593407e-201,-6.213786251648352e-201,-6.208791246703296e-201,-6.2037962417582415e-201,-6.198801236813187e-201,-6.1938062318681315e-201,-6.188811226923076e-201,-6.1838162219780216e-201,-6.178821217032968e-201,-6.173826212087912e-201,-6.168831207142857e-201,-6.1638362021978025e-201,-6.158841197252747e-201,-6.153846192307692e-201,-6.148851187362637e-201,-6.143856182417582e-201,-6.138861177472527e-201,-6.133866172527472e-201,-6.1288711675824174e-201,-6.123876162637362e-201,-6.118881157692308e-201,-6.113886152747253e-201,-6.1088911478021976e-201,-6.103896142857143e-201,-6.0989011379120884e-201,-6.0939061329670324e-201,-6.088911128021978e-201,-6.083916123076923e-201,-6.0789211181318686e-201,-6.0739261131868125e-201,-6.068931108241758e-201,-6.063936103296703e-201,-6.058941098351647e-201,-6.0539460934065934e-201,-6.048951088461539e-201,-6.0439560835164835e-201,-6.038961078571428e-201,-6.0339660736263736e-201,-6.028971068681319e-201,-6.023976063736264e-201,-6.018981058791208e-201,-6.013986053846154e-201,-6.0089910489010984e-201,-6.003996043956044e-201,-5.9990010390109885e-201,-5.994006034065934e-201,-5.989011029120879e-201,-5.984016024175825e-201,-5.979021019230769e-201,-5.974026014285714e-201,-5.9690310093406595e-201,-5.964036004395605e-201,-5.959040999450549e-201,-5.954045994505494e-201,-5.94905098956044e-201,-5.944055984615384e-201,-5.939060979670329e-201,-5.934065974725275e-201,-5.92907096978022e-201,-5.9240759648351645e-201,-5.91908095989011e-201,-5.914085954945055e-201,-5.90909095e-201,-5.904095945054945e-201,-5.89910094010989e-201,-5.894105935164835e-201,-5.88911093021978e-201,-5.884115925274725e-201,-5.8791209203296695e-201,-5.874125915384616e-201,-5.869130910439561e-201,-5.864135905494506e-201,-5.8591409005494504e-201,-5.854145895604396e-201,-5.849150890659341e-201,-5.844155885714285e-201,-5.8391608807692306e-201,-5.834165875824176e-201,-5.829170870879121e-201,-5.824175865934065e-201,-5.819180860989011e-201,-5.814185856043956e-201,-5.809190851098901e-201,-5.804195846153846e-201,-5.7992008412087916e-201,-5.794205836263736e-201,-5.789210831318681e-201,-5.7842158263736264e-201,-5.779220821428571e-201,-5.7742258164835165e-201,-5.769230811538461e-201,-5.764235806593406e-201,-5.759240801648351e-201,-5.754245796703297e-201,-5.749250791758242e-201,-5.744255786813187e-201,-5.739260781868132e-201,-5.7342657769230775e-201,-5.7292707719780215e-201,-5.724275767032967e-201,-5.719280762087912e-201,-5.714285757142857e-201,-5.709290752197802e-201,-5.704295747252747e-201,-5.6993007423076925e-201,-5.6943057373626364e-201,-5.6893107324175825e-201,-5.684315727472528e-201,-5.6793207225274726e-201,-5.674325717582417e-201,-5.669330712637363e-201,-5.6643357076923074e-201,-5.659340702747253e-201,-5.6543456978021975e-201,-5.649350692857142e-201,-5.6443556879120875e-201,-5.639360682967033e-201,-5.6343656780219776e-201,-5.629370673076923e-201,-5.6243756681318684e-201,-5.619380663186814e-201,-5.614385658241758e-201,-5.609390653296703e-201,-5.6043956483516486e-201,-5.599400643406593e-201,-5.594405638461538e-201,-5.5894106335164834e-201,-5.584415628571429e-201,-5.579420623626373e-201,-5.574425618681318e-201,-5.569430613736264e-201,-5.564435608791209e-201,-5.5594406038461536e-201,-5.554445598901099e-201,-5.549450593956044e-201,-5.544455589010989e-201,-5.539460584065934e-201,-5.534465579120879e-201,-5.529470574175824e-201,-5.524475569230769e-201,-5.519480564285714e-201,-5.5144855593406586e-201,-5.509490554395605e-201,-5.50449554945055e-201,-5.499500544505494e-201,-5.4945055395604395e-201,-5.489510534615385e-201,-5.48451552967033e-201,-5.479520524725274e-201,-5.47452551978022e-201,-5.469530514835165e-201,-5.46453550989011e-201,-5.4595405049450544e-201,-5.4545455e-201,-5.449550495054945e-201,-5.44455549010989e-201,-5.439560485164835e-201,-5.43456548021978e-201,-5.4295704752747254e-201,-5.42457547032967e-201,-5.4195804653846155e-201,-5.41458546043956e-201,-5.4095904554945056e-201,-5.40459545054945e-201,-5.399600445604395e-201,-5.39460544065934e-201,-5.389610435714286e-201,-5.3846154307692304e-201,-5.379620425824176e-201,-5.374625420879121e-201,-5.3696304159340666e-201,-5.3646354109890106e-201,-5.359640406043956e-201,-5.3546454010989014e-201,-5.349650396153846e-201,-5.344655391208791e-201,-5.339660386263736e-201,-5.334665381318681e-201,-5.3296703763736255e-201,-5.324675371428572e-201,-5.319680366483517e-201,-5.314685361538462e-201,-5.3096903565934064e-201,-5.304695351648352e-201,-5.2997003467032965e-201,-5.294705341758242e-201,-5.2897103368131866e-201,-5.284715331868131e-201,-5.279720326923077e-201,-5.274725321978022e-201,-5.269730317032966e-201,-5.264735312087912e-201,-5.2597403071428575e-201,-5.254745302197803e-201,-5.249750297252747e-201,-5.244755292307692e-201,-5.239760287362638e-201,-5.2347652824175824e-201,-5.229770277472527e-201,-5.2247752725274725e-201,-5.219780267582417e-201,-5.214785262637362e-201,-5.209790257692307e-201,-5.2047952527472534e-201,-5.199800247802198e-201,-5.194805242857143e-201,-5.189810237912088e-201,-5.184815232967033e-201,-5.179820228021978e-201,-5.174825223076923e-201,-5.1698302181318676e-201,-5.164835213186813e-201,-5.1598402082417584e-201,-5.154845203296702e-201,-5.149850198351648e-201,-5.144855193406594e-201,-5.139860188461539e-201,-5.134865183516483e-201,-5.1298701785714286e-201,-5.124875173626374e-201,-5.119880168681319e-201,-5.1148851637362634e-201,-5.109890158791209e-201,-5.1048951538461535e-201,-5.099900148901098e-201,-5.0949051439560436e-201,-5.089910139010989e-201,-5.0849151340659336e-201,-5.079920129120879e-201,-5.0749251241758244e-201,-5.069930119230769e-201,-5.0649351142857145e-201,-5.059940109340659e-201,-5.054945104395604e-201,-5.049950099450549e-201,-5.044955094505495e-201,-5.0399600895604394e-201,-5.034965084615384e-201,-5.0299700796703295e-201,-5.024975074725275e-201,-5.0199800697802195e-201,-5.014985064835165e-201,-5.00999005989011e-201,-5.004995054945055e-201,-5.00000005e-201,-4.995005045054945e-201,-4.9900100401098905e-201,-4.9850150351648345e-201,-4.98002003021978e-201,-4.975025025274725e-201,-4.97003002032967e-201,-4.9650350153846146e-201,-4.960040010439561e-201,-4.9550450054945054e-201,-4.950050000549451e-201,-4.9450549956043955e-201,-4.94005999065934e-201,-4.9350649857142856e-201,-4.930069980769231e-201,-4.925074975824176e-201,-4.9200799708791204e-201,-4.915084965934066e-201,-4.910089960989011e-201,-4.905094956043955e-201,-4.900099951098901e-201,-4.895104946153847e-201,-4.890109941208791e-201,-4.885114936263736e-201,-4.8801199313186814e-201,-4.875124926373627e-201,-4.8701299214285715e-201,-4.865134916483516e-201,-4.8601399115384616e-201,-4.855144906593406e-201,-4.850149901648351e-201,-4.845154896703296e-201,-4.840159891758242e-201,-4.835164886813187e-201,-4.830169881868132e-201,-4.825174876923077e-201,-4.820179871978022e-201,-4.815184867032967e-201,-4.810189862087912e-201,-4.805194857142857e-201,-4.800199852197802e-201,-4.7952048472527475e-201,-4.7902098423076914e-201,-4.785214837362637e-201,-4.780219832417582e-201,-4.7752248274725284e-201,-4.770229822527472e-201,-4.765234817582418e-201,-4.760239812637363e-201,-4.755244807692308e-201,-4.7502498027472525e-201,-4.745254797802198e-201,-4.7402597928571426e-201,-4.735264787912087e-201,-4.730269782967033e-201,-4.725274778021977e-201,-4.720279773076923e-201,-4.715284768131868e-201,-4.7102897631868136e-201,-4.705294758241758e-201,-4.7002997532967036e-201,-4.695304748351648e-201,-4.690309743406593e-201,-4.6853147384615384e-201,-4.680319733516484e-201,-4.675324728571428e-201,-4.670329723626373e-201,-4.6653347186813186e-201,-4.660339713736264e-201,-4.655344708791209e-201,-4.650349703846154e-201,-4.6453546989010995e-201,-4.640359693956044e-201,-4.635364689010989e-201,-4.630369684065934e-201,-4.625374679120879e-201,-4.6203796741758236e-201,-4.615384669230769e-201,-4.610389664285714e-201,-4.605394659340659e-201,-4.600399654395604e-201,-4.59540464945055e-201,-4.5904096445054945e-201,-4.58541463956044e-201,-4.5804196346153846e-201,-4.575424629670329e-201,-4.570429624725275e-201,-4.56543461978022e-201,-4.560439614835164e-201,-4.5554446098901095e-201,-4.550449604945055e-201,-4.5454546e-201,-4.540459595054944e-201,-4.5354645901098904e-201,-4.530469585164836e-201,-4.5254745802197804e-201,-4.520479575274725e-201,-4.5154845703296705e-201,-4.510489565384615e-201,-4.50549456043956e-201,-4.500499555494505e-201,-4.495504550549451e-201,-4.4905095456043954e-201,-4.48551454065934e-201,-4.4805195357142855e-201,-4.47552453076923e-201,-4.470529525824176e-201,-4.465534520879121e-201,-4.4605395159340656e-201,-4.455544510989011e-201,-4.4505495060439564e-201,-4.445554501098901e-201,-4.440559496153846e-201,-4.435564491208791e-201,-4.4305694862637366e-201,-4.4255744813186806e-201,-4.420579476373626e-201,-4.415584471428571e-201,-4.410589466483517e-201,-4.4055944615384614e-201,-4.400599456593407e-201,-4.3956044516483515e-201,-4.390609446703297e-201,-4.3856144417582416e-201,-4.380619436813187e-201,-4.375624431868132e-201,-4.3706294269230764e-201,-4.365634421978022e-201,-4.3606394170329665e-201,-4.355644412087912e-201,-4.350649407142857e-201,-4.345654402197802e-201,-4.340659397252747e-201,-4.335664392307693e-201,-4.3306693873626374e-201,-4.325674382417582e-201,-4.3206793774725275e-201,-4.315684372527473e-201,-4.310689367582417e-201,-4.305694362637362e-201,-4.300699357692308e-201,-4.295704352747252e-201,-4.290709347802198e-201,-4.285714342857143e-201,-4.2807193379120886e-201,-4.275724332967033e-201,-4.270729328021978e-201,-4.265734323076923e-201,-4.260739318131868e-201,-4.255744313186813e-201,-4.250749308241758e-201,-4.245754303296703e-201,-4.240759298351648e-201,-4.235764293406593e-201,-4.230769288461538e-201,-4.225774283516484e-201,-4.220779278571429e-201,-4.215784273626374e-201,-4.2107892686813184e-201,-4.205794263736264e-201,-4.200799258791209e-201,-4.195804253846153e-201,-4.1908092489010986e-201,-4.185814243956044e-201,-4.180819239010989e-201,-4.175824234065933e-201,-4.1708292291208795e-201,-4.165834224175825e-201,-4.1608392192307696e-201,-4.155844214285714e-201,-4.15084920934066e-201,-4.145854204395604e-201,-4.140859199450549e-201,-4.1358641945054944e-201,-4.130869189560439e-201,-4.1258741846153845e-201,-4.120879179670329e-201,-4.1158841747252746e-201,-4.110889169780219e-201,-4.1058941648351654e-201,-4.10089915989011e-201,-4.095904154945055e-201,-4.09090915e-201,-4.0859141450549455e-201,-4.0809191401098895e-201,-4.075924135164835e-201,-4.07092913021978e-201,-4.065934125274726e-201,-4.06093912032967e-201,-4.055944115384615e-201,-4.0509491104395605e-201,-4.045954105494506e-201,-4.0409591005494506e-201,-4.035964095604396e-201,-4.030969090659341e-201,-4.025974085714285e-201,-4.020979080769231e-201,-4.0159840758241754e-201,-4.010989070879121e-201,-4.0059940659340655e-201,-4.000999060989011e-201,-3.9960040560439556e-201,-3.991009051098901e-201,-3.9860140461538464e-201,-3.981019041208791e-201,-3.9760240362637365e-201,-3.971029031318682e-201,-3.966034026373626e-201,-3.961039021428571e-201,-3.9560440164835166e-201,-3.951049011538462e-201,-3.946054006593406e-201,-3.9410590016483514e-201,-3.936063996703297e-201,-3.9310689917582415e-201,-3.926073986813187e-201,-3.921078981868132e-201,-3.916083976923077e-201,-3.9110889719780216e-201,-3.906093967032967e-201,-3.9010989620879124e-201,-3.896103957142857e-201,-3.891108952197802e-201,-3.886113947252747e-201,-3.881118942307692e-201,-3.876123937362637e-201,-3.871128932417582e-201,-3.8661339274725274e-201,-3.861138922527473e-201,-3.856143917582418e-201,-3.851148912637362e-201,-3.8461539076923075e-201,-3.841158902747253e-201,-3.836163897802198e-201,-3.831168892857142e-201,-3.826173887912088e-201,-3.821178882967033e-201,-3.816183878021978e-201,-3.8111888730769225e-201,-3.806193868131868e-201,-3.801198863186813e-201,-3.796203858241759e-201,-3.791208853296703e-201,-3.786213848351649e-201,-3.7812188434065934e-201,-3.776223838461538e-201,-3.7712288335164835e-201,-3.766233828571428e-201,-3.7612388236263736e-201,-3.756243818681318e-201,-3.751248813736263e-201,-3.746253808791208e-201,-3.7412588038461545e-201,-3.736263798901099e-201,-3.731268793956044e-201,-3.726273789010989e-201,-3.721278784065935e-201,-3.7162837791208786e-201,-3.711288774175824e-201,-3.7062937692307694e-201,-3.701298764285714e-201,-3.696303759340659e-201,-3.691308754395604e-201,-3.686313749450549e-201,-3.681318744505495e-201,-3.67632373956044e-201,-3.671328734615385e-201,-3.66633372967033e-201,-3.6613387247252744e-201,-3.65634371978022e-201,-3.6513487148351645e-201,-3.64635370989011e-201,-3.6413587049450546e-201,-3.636363699999999e-201,-3.631368695054945e-201,-3.62637369010989e-201,-3.6213786851648355e-201,-3.61638368021978e-201,-3.6113886752747256e-201,-3.606393670329671e-201,-3.601398665384615e-201,-3.59640366043956e-201,-3.591408655494506e-201,-3.5864136505494504e-201,-3.581418645604395e-201,-3.5764236406593405e-201,-3.571428635714286e-201,-3.5664336307692306e-201,-3.561438625824176e-201,-3.5564436208791214e-201,-3.551448615934066e-201,-3.546453610989011e-201,-3.541458606043956e-201,-3.536463601098901e-201,-3.531468596153846e-201,-3.526473591208791e-201,-3.5214785862637356e-201,-3.516483581318681e-201,-3.5114885763736264e-201,-3.506493571428571e-201,-3.501498566483516e-201,-3.496503561538462e-201,-3.491508556593407e-201,-3.486513551648351e-201,-3.481518546703297e-201,-3.476523541758242e-201,-3.471528536813187e-201,-3.4665335318681314e-201,-3.461538526923077e-201,-3.456543521978022e-201,-3.451548517032967e-201,-3.4465535120879116e-201,-3.441558507142857e-201,-3.4365635021978024e-201,-3.431568497252747e-201,-3.4265734923076925e-201,-3.421578487362637e-201,-3.4165834824175825e-201,-3.411588477472527e-201,-3.4065934725274726e-201,-3.401598467582417e-201,-3.396603462637363e-201,-3.3916084576923074e-201,-3.386613452747252e-201,-3.3816184478021975e-201,-3.3766234428571436e-201,-3.3716284379120876e-201,-3.366633432967033e-201,-3.3616384280219784e-201,-3.356643423076924e-201,-3.351648418131868e-201,-3.346653413186813e-201,-3.3416584082417585e-201,-3.336663403296703e-201,-3.3316683983516486e-201,-3.326673393406593e-201,-3.321678388461539e-201,-3.3166833835164834e-201,-3.311688378571428e-201,-3.3066933736263735e-201,-3.301698368681319e-201,-3.2967033637362635e-201,-3.291708358791209e-201,-3.2867133538461536e-201,-3.281718348901098e-201,-3.276723343956044e-201,-3.271728339010989e-201,-3.2667333340659345e-201,-3.261738329120879e-201,-3.2567433241758242e-201,-3.251748319230769e-201,-3.2467533142857143e-201,-3.2417583093406594e-201,-3.2367633043956044e-201,-3.2317682994505494e-201,-3.2267732945054945e-201,-3.2217782895604395e-201,-3.2167832846153846e-201,-3.2117882796703296e-201,-3.206793274725275e-201,-3.2017982697802197e-201,-3.196803264835165e-201,-3.1918082598901098e-201,-3.1868132549450545e-201,-3.18181825e-201,-3.176823245054945e-201,-3.1718282401098903e-201,-3.166833235164835e-201,-3.16183823021978e-201,-3.156843225274725e-201,-3.15184822032967e-201,-3.1468532153846155e-201,-3.1418582104395605e-201,-3.1368632054945052e-201,-3.1318682005494506e-201,-3.1268731956043953e-201,-3.1218781906593407e-201,-3.1168831857142858e-201,-3.1118881807692308e-201,-3.106893175824176e-201,-3.101898170879121e-201,-3.096903165934066e-201,-3.091908160989011e-201,-3.086913156043956e-201,-3.0819181510989014e-201,-3.076923146153846e-201,-3.0719281412087908e-201,-3.066933136263736e-201,-3.061938131318681e-201,-3.0569431263736266e-201,-3.0519481214285713e-201,-3.0469531164835163e-201,-3.0419581115384614e-201,-3.0369631065934064e-201,-3.0319681016483515e-201,-3.026973096703297e-201,-3.0219780917582415e-201,-3.016983086813187e-201,-3.0119880818681316e-201,-3.006993076923077e-201,-3.0019980719780217e-201,-2.997003067032967e-201,-2.992008062087912e-201,-2.9870130571428572e-201,-2.9820180521978022e-201,-2.9770230472527473e-201,-2.972028042307692e-201,-2.9670330373626377e-201,-2.9620380324175824e-201,-2.9570430274725278e-201,-2.9520480225274725e-201,-2.947053017582417e-201,-2.9420580126373626e-201,-2.9370630076923076e-201,-2.932068002747253e-201,-2.9270729978021977e-201,-2.9220779928571427e-201,-2.9170829879120878e-201,-2.9120879829670328e-201,-2.9070929780219782e-201,-2.9020979730769233e-201,-2.897102968131868e-201,-2.8921079631868133e-201,-2.887112958241758e-201,-2.882117953296703e-201,-2.8771229483516485e-201,-2.8721279434065935e-201,-2.8671329384615386e-201,-2.8621379335164836e-201,-2.8571429285714283e-201,-2.8521479236263737e-201,-2.8471529186813184e-201,-2.842157913736264e-201,-2.8371629087912088e-201,-2.8321679038461535e-201,-2.827172898901099e-201,-2.8221778939560436e-201,-2.817182889010989e-201,-2.812187884065934e-201,-2.807192879120879e-201,-2.802197874175824e-201,-2.797202869230769e-201,-2.792207864285714e-201,-2.7872128593406592e-201,-2.7822178543956043e-201,-2.7772228494505497e-201,-2.7722278445054943e-201,-2.7672328395604397e-201,-2.7622378346153844e-201,-2.7572428296703295e-201,-2.752247824725275e-201,-2.74725281978022e-201,-2.742257814835165e-201,-2.73726280989011e-201,-2.7322678049450547e-201,-2.7272728e-201,-2.722277795054945e-201,-2.7172827901098898e-201,-2.7122877851648352e-201,-2.70729278021978e-201,-2.7022977752747253e-201,-2.69730277032967e-201,-2.6923077653846154e-201,-2.6873127604395604e-201,-2.6823177554945054e-201,-2.6773227505494505e-201,-2.6723277456043955e-201,-2.6673327406593402e-201,-2.662337735714286e-201,-2.6573427307692307e-201,-2.652347725824176e-201,-2.6473527208791207e-201,-2.6423577159340658e-201,-2.637362710989011e-201,-2.6323677060439562e-201,-2.6273727010989013e-201,-2.6223776961538463e-201,-2.617382691208791e-201,-2.6123876862637364e-201,-2.607392681318681e-201,-2.602397676373627e-201,-2.5974026714285715e-201,-2.5924076664835162e-201,-2.5874126615384616e-201,-2.5824176565934063e-201,-2.5774226516483517e-201,-2.5724276467032967e-201,-2.5674326417582418e-201,-2.5624376368131868e-201,-2.557442631868132e-201,-2.5524476269230765e-201,-2.547452621978022e-201,-2.5424576170329666e-201,-2.5374626120879124e-201,-2.532467607142857e-201,-2.527472602197802e-201,-2.522477597252747e-201,-2.517482592307692e-201,-2.5124875873626372e-201,-2.5074925824175826e-201,-2.5024975774725273e-201,-2.4975025725274727e-201,-2.4925075675824174e-201,-2.4875125626373628e-201,-2.4825175576923075e-201,-2.4775225527472525e-201,-2.472527547802198e-201,-2.4675325428571426e-201,-2.462537537912088e-201,-2.4575425329670327e-201,-2.4525475280219777e-201,-2.447552523076923e-201,-2.442557518131868e-201,-2.4375625131868132e-201,-2.4325675082417582e-201,-2.427572503296703e-201,-2.4225774983516483e-201,-2.4175824934065934e-201,-2.4125874884615388e-201,-2.4075924835164835e-201,-2.4025974785714285e-201,-2.3976024736263735e-201,-2.3926074686813186e-201,-2.387612463736264e-201,-2.382617458791209e-201,-2.3776224538461537e-201,-2.372627448901099e-201,-2.3676324439560438e-201,-2.362637439010989e-201,-2.3576424340659342e-201,-2.352647429120879e-201,-2.3476524241758243e-201,-2.342657419230769e-201,-2.337662414285714e-201,-2.332667409340659e-201,-2.3276724043956045e-201,-2.3226773994505495e-201,-2.3176823945054946e-201,-2.3126873895604392e-201,-2.3076923846153846e-201,-2.3026973796703293e-201,-2.297702374725275e-201,-2.2927073697802198e-201,-2.2877123648351648e-201,-2.28271735989011e-201,-2.277722354945055e-201,-2.27272735e-201,-2.2677323450549453e-201,-2.26273734010989e-201,-2.2577423351648354e-201,-2.25274733021978e-201,-2.2477523252747255e-201,-2.24275732032967e-201,-2.237762315384615e-201,-2.2327673104395606e-201,-2.2277723054945053e-201,-2.2227773005494507e-201,-2.2177822956043954e-201,-2.2127872906593404e-201,-2.2077922857142855e-201,-2.202797280769231e-201,-2.1978022758241756e-201,-2.192807270879121e-201,-2.1878122659340656e-201,-2.182817260989011e-201,-2.1778222560439557e-201,-2.172827251098901e-201,-2.167832246153846e-201,-2.1628372412087912e-201,-2.1578422362637362e-201,-2.1528472313186813e-201,-2.147852226373626e-201,-2.1428572214285717e-201,-2.1378622164835164e-201,-2.1328672115384618e-201,-2.1278722065934065e-201,-2.1228772016483515e-201,-2.1178821967032966e-201,-2.1128871917582416e-201,-2.107892186813187e-201,-2.1028971818681317e-201,-2.0979021769230767e-201,-2.0929071719780218e-201,-2.087912167032967e-201,-2.0829171620879122e-201,-2.0779221571428573e-201,-2.072927152197802e-201,-2.0679321472527474e-201,-2.062937142307692e-201,-2.0579421373626374e-201,-2.0529471324175825e-201,-2.0479521274725275e-201,-2.0429571225274726e-201,-2.0379621175824176e-201,-2.0329671126373626e-201,-2.0279721076923077e-201,-2.0229771027472527e-201,-2.017982097802198e-201,-2.0129870928571428e-201,-2.007992087912088e-201,-2.002997082967033e-201,-1.9980020780219776e-201,-1.9930070730769233e-201,-1.988012068131868e-201,-1.983017063186813e-201,-1.978022058241758e-201,-1.973027053296703e-201,-1.9680320483516482e-201,-1.9630370434065936e-201,-1.9580420384615383e-201,-1.9530470335164837e-201,-1.9480520285714284e-201,-1.9430570236263738e-201,-1.9380620186813184e-201,-1.933067013736264e-201,-1.928072008791209e-201,-1.923077003846154e-201,-1.918081998901099e-201,-1.913086993956044e-201,-1.9080919890109887e-201,-1.903096984065934e-201,-1.898101979120879e-201,-1.8931069741758245e-201,-1.8881119692307692e-201,-1.8831169642857143e-201,-1.8781219593406593e-201,-1.873126954395604e-201,-1.8681319494505497e-201,-1.8631369445054944e-201,-1.8581419395604395e-201,-1.8531469346153845e-201,-1.8481519296703295e-201,-1.8431569247252742e-201,-1.83816191978022e-201,-1.8331669148351647e-201,-1.82817190989011e-201,-1.8231769049450547e-201,-1.8181818999999998e-201,-1.813186895054945e-201,-1.8081918901098902e-201,-1.8031968851648353e-201,-1.7982018802197803e-201,-1.793206875274725e-201,-1.7882118703296704e-201,-1.783216865384615e-201,-1.778221860439561e-201,-1.7732268554945055e-201,-1.7682318505494506e-201,-1.7632368456043956e-201,-1.7582418406593403e-201,-1.7532468357142857e-201,-1.7482518307692307e-201,-1.7432568258241758e-201,-1.7382618208791208e-201,-1.733266815934066e-201,-1.728271810989011e-201,-1.723276806043956e-201,-1.718281801098901e-201,-1.7132867961538464e-201,-1.708291791208791e-201,-1.7032967862637365e-201,-1.698301781318681e-201,-1.6933067763736262e-201,-1.6883117714285716e-201,-1.6833167664835166e-201,-1.6783217615384617e-201,-1.6733267565934067e-201,-1.6683317516483514e-201,-1.6633367467032968e-201,-1.658341741758242e-201,-1.6533467368131865e-201,-1.648351731868132e-201,-1.643356726923077e-201,-1.638361721978022e-201,-1.633366717032967e-201,-1.628371712087912e-201,-1.6233767071428571e-201,-1.6183817021978024e-201,-1.6133866972527472e-201,-1.6083916923076923e-201,-1.6033966873626375e-201,-1.5984016824175825e-201,-1.5934066774725274e-201,-1.5884116725274726e-201,-1.5834166675824175e-201,-1.5784216626373625e-201,-1.5734266576923077e-201,-1.5684316527472526e-201,-1.5634366478021976e-201,-1.5584416428571429e-201,-1.5534466379120879e-201,-1.548451632967033e-201,-1.543456628021978e-201,-1.538461623076923e-201,-1.533466618131868e-201,-1.5284716131868133e-201,-1.5234766082417581e-201,-1.5184816032967032e-201,-1.5134865983516484e-201,-1.5084915934065934e-201,-1.5034965884615385e-201,-1.4985015835164835e-201,-1.4935065785714286e-201,-1.4885115736263736e-201,-1.4835165686813188e-201,-1.4785215637362639e-201,-1.4735265587912087e-201,-1.468531553846154e-201,-1.4635365489010988e-201,-1.4585415439560439e-201,-1.453546539010989e-201,-1.448551534065934e-201,-1.443556529120879e-201,-1.4385615241758242e-201,-1.4335665192307692e-201,-1.4285715142857141e-201,-1.4235765093406591e-201,-1.4185815043956044e-201,-1.4135864994505494e-201,-1.4085914945054945e-201,-1.4035964895604395e-201,-1.3986014846153845e-201,-1.3936064796703296e-201,-1.3886114747252748e-201,-1.3836164697802198e-201,-1.3786214648351647e-201,-1.37362645989011e-201,-1.368631454945055e-201,-1.36363645e-201,-1.3586414450549452e-201,-1.3536464401098901e-201,-1.3486514351648351e-201,-1.3436564302197802e-201,-1.3386614252747252e-201,-1.33366642032967e-201,-1.3286714153846153e-201,-1.3236764104395603e-201,-1.3186814054945054e-201,-1.3136864005494506e-201,-1.3086913956043955e-201,-1.3036963906593405e-201,-1.2987013857142857e-201,-1.2937063807692308e-201,-1.2887113758241758e-201,-1.2837163708791209e-201,-1.2787213659340659e-201,-1.273726360989011e-201,-1.2687313560439562e-201,-1.2637363510989012e-201,-1.258741346153846e-201,-1.2537463412087913e-201,-1.2487513362637363e-201,-1.2437563313186814e-201,-1.2387613263736264e-201,-1.2337663214285714e-201,-1.2287713164835165e-201,-1.2237763115384615e-201,-1.2187813065934066e-201,-1.2137863016483514e-201,-1.2087912967032967e-201,-1.2037962917582417e-201,-1.1988012868131867e-201,-1.193806281868132e-201,-1.1888112769230768e-201,-1.1838162719780219e-201,-1.178821267032967e-201,-1.1738262620879121e-201,-1.168831257142857e-201,-1.1638362521978022e-201,-1.1588412472527473e-201,-1.1538462423076923e-201,-1.1488512373626375e-201,-1.1438562324175824e-201,-1.1388612274725274e-201,-1.1338662225274726e-201,-1.1288712175824177e-201,-1.1238762126373627e-201,-1.1188812076923076e-201,-1.1138862027472528e-201,-1.1088911978021978e-201,-1.1038961928571427e-201,-1.098901187912088e-201,-1.0939061829670328e-201,-1.0889111780219778e-201,-1.083916173076923e-201,-1.0789211681318681e-201,-1.073926163186813e-201,-1.0689311582417582e-201,-1.0639361532967032e-201,-1.0589411483516483e-201,-1.0539461434065935e-201,-1.0489511384615383e-201,-1.0439561335164834e-201,-1.0389611285714286e-201,-1.0339661236263736e-201,-1.0289711186813187e-201,-1.0239761137362637e-201,-1.0189811087912088e-201,-1.0139861038461538e-201,-1.008991098901099e-201,-1.003996093956044e-201,-9.99001089010989e-202,-9.940060840659342e-202,-9.890110791208792e-202,-9.84016074175824e-202,-9.790210692307691e-202,-9.740260642857141e-202,-9.690310593406592e-202,-9.640360543956044e-202,-9.590410494505495e-202,-9.540460445054943e-202,-9.490510395604395e-202,-9.440560346153846e-202,-9.390610296703296e-202,-9.340660247252748e-202,-9.290710197802197e-202,-9.240760148351647e-202,-9.1908100989011e-202,-9.14086004945055e-202,-9.09091e-202,-9.04095995054945e-202,-8.991009901098901e-202,-8.941059851648352e-202,-8.891109802197804e-202,-8.841159752747253e-202,-8.791209703296703e-202,-8.741259653846155e-202,-8.691309604395606e-202,-8.641359554945054e-202,-8.591409505494505e-202,-8.541459456043955e-202,-8.491509406593405e-202,-8.441559357142858e-202,-8.391609307692308e-202,-8.341659258241757e-202,-8.291709208791209e-202,-8.24175915934066e-202,-8.19180910989011e-202,-8.14185906043956e-202,-8.0919090109890115e-202,-8.041958961538461e-202,-7.992008912087912e-202,-7.942058862637363e-202,-7.892108813186813e-202,-7.842158763736264e-202,-7.792208714285715e-202,-7.742258664835164e-202,-7.692308615384615e-202,-7.642358565934066e-202,-7.592408516483516e-202,-7.542458467032967e-202,-7.492508417582418e-202,-7.442558368131868e-202,-7.392608318681319e-202,-7.3426582692307695e-202,-7.29270821978022e-202,-7.24275817032967e-202,-7.192808120879122e-202,-7.142858071428571e-202,-7.092908021978022e-202,-7.042957972527472e-202,-6.993007923076922e-202,-6.943057873626374e-202,-6.893107824175823e-202,-6.843157774725275e-202,-6.793207725274726e-202,-6.743257675824175e-202,-6.693307626373627e-202,-6.643357576923077e-202,-6.5934075274725275e-202,-6.543457478021977e-202,-6.493507428571428e-202,-6.443557379120879e-202,-6.393607329670329e-202,-6.3436572802197805e-202,-6.29370723076923e-202,-6.243757181318681e-202,-6.193807131868133e-202,-6.143857082417582e-202,-6.0939070329670335e-202,-6.043956983516484e-202,-5.994006934065934e-202,-5.944056884615384e-202,-5.894106835164835e-202,-5.844156785714286e-202,-5.794206736263736e-202,-5.744256686813187e-202,-5.694306637362637e-202,-5.644356587912088e-202,-5.594406538461538e-202,-5.544456489010989e-202,-5.49450643956044e-202,-5.44455639010989e-202,-5.394606340659341e-202,-5.344656291208791e-202,-5.294706241758241e-202,-5.244756192307691e-202,-5.194806142857143e-202,-5.144856093406593e-202,-5.094906043956044e-202,-5.044955994505495e-202,-4.995005945054944e-202,-4.945055895604396e-202,-4.895105846153847e-202,-4.845155796703297e-202,-4.795205747252748e-202,-4.745255697802197e-202,-4.695305648351648e-202,-4.645355598901098e-202,-4.5954055494505495e-202,-4.5454555e-202,-4.49550545054945e-202,-4.445555401098902e-202,-4.395605351648351e-202,-4.3456553021978025e-202,-4.295705252747253e-202,-4.245755203296703e-202,-4.195805153846154e-202,-4.145855104395604e-202,-4.095905054945055e-202,-4.0459550054945055e-202,-3.996004956043956e-202,-3.9460549065934063e-202,-3.896104857142857e-202,-3.8461548076923076e-202,-3.7962047582417584e-202,-3.746254708791209e-202,-3.6963046593406593e-202,-3.6463546098901097e-202,-3.5964045604395605e-202,-3.546454510989011e-202,-3.4965044615384614e-202,-3.446554412087912e-202,-3.3966043626373627e-202,-3.346654313186813e-202,-3.2967042637362635e-202,-3.2467542142857144e-202,-3.1968041648351648e-202,-3.146854115384615e-202,-3.096904065934066e-202,-3.0469540164835165e-202,-2.997003967032967e-202,-2.9470539175824177e-202,-2.897103868131868e-202,-2.847153818681318e-202,-2.797203769230769e-202,-2.74725371978022e-202,-2.6973036703296703e-202,-2.6473536208791207e-202,-2.5974035714285716e-202,-2.5474535219780215e-202,-2.4975034725274724e-202,-2.4475534230769232e-202,-2.3976033736263737e-202,-2.347653324175824e-202,-2.297703274725275e-202,-2.247753225274725e-202,-2.1978031758241753e-202,-2.1478531263736266e-202,-2.097903076923077e-202,-2.0479530274725275e-202,-1.9980029780219779e-202,-1.9480529285714288e-202,-1.8981028791208792e-202,-1.8481528296703296e-202,-1.7982027802197802e-202,-1.7482527307692309e-202,-1.6983026813186813e-202,-1.6483526318681317e-202,-1.5984025824175826e-202,-1.548452532967033e-202,-1.4985024835164834e-202,-1.4485524340659343e-202,-1.3986023846153844e-202,-1.348652335164835e-202,-1.298702285714286e-202,-1.2487522362637361e-202,-1.1988021868131868e-202,-1.1488521373626374e-202,-1.0989020879120878e-202,-1.0489520384615385e-202,-9.99001989010989e-203,-9.490519395604394e-203,-8.991018901098902e-203,-8.491518406593407e-203,-7.992017912087911e-203,-7.492517417582418e-203,-6.993016923076923e-203,-6.493516428571428e-203,-5.994015934065934e-203,-5.494515439560439e-203,-4.995014945054945e-203,-4.495514450549451e-203,-3.9960139560439556e-203,-3.4965134615384614e-203,-2.997012967032967e-203,-2.4975124725274722e-203,-1.998011978021978e-203,-1.4985114835164834e-203,-9.99010989010989e-204,-4.995104945054945e-204,-1.0e-208],"x":[-1.0e-200,-9.995004995054944e-201,-9.99000999010989e-201,-9.985014985164835e-201,-9.980019980219779e-201,-9.975024975274725e-201,-9.97002997032967e-201,-9.965034965384615e-201,-9.96003996043956e-201,-9.955044955494505e-201,-9.950049950549451e-201,-9.945054945604396e-201,-9.940059940659339e-201,-9.935064935714285e-201,-9.93006993076923e-201,-9.925074925824176e-201,-9.920079920879122e-201,-9.915084915934067e-201,-9.910089910989011e-201,-9.905094906043957e-201,-9.9000999010989e-201,-9.895104896153845e-201,-9.890109891208791e-201,-9.885114886263736e-201,-9.880119881318681e-201,-9.875124876373627e-201,-9.870129871428572e-201,-9.865134866483516e-201,-9.860139861538461e-201,-9.855144856593406e-201,-9.850149851648352e-201,-9.845154846703296e-201,-9.840159841758241e-201,-9.835164836813187e-201,-9.830169831868132e-201,-9.825174826923075e-201,-9.820179821978021e-201,-9.815184817032966e-201,-9.81018981208791e-201,-9.805194807142857e-201,-9.800199802197803e-201,-9.795204797252748e-201,-9.790209792307694e-201,-9.785214787362637e-201,-9.780219782417582e-201,-9.775224777472528e-201,-9.770229772527472e-201,-9.765234767582419e-201,-9.760239762637363e-201,-9.755244757692308e-201,-9.750249752747253e-201,-9.745254747802197e-201,-9.740259742857142e-201,-9.735264737912088e-201,-9.730269732967033e-201,-9.725274728021977e-201,-9.720279723076924e-201,-9.715284718131868e-201,-9.710289713186811e-201,-9.705294708241758e-201,-9.700299703296702e-201,-9.695304698351647e-201,-9.690309693406593e-201,-9.685314688461538e-201,-9.680319683516484e-201,-9.67532467857143e-201,-9.670329673626373e-201,-9.665334668681318e-201,-9.660339663736264e-201,-9.655344658791209e-201,-9.650349653846155e-201,-9.6453546489011e-201,-9.640359643956044e-201,-9.635364639010989e-201,-9.630369634065934e-201,-9.625374629120878e-201,-9.620379624175824e-201,-9.615384619230769e-201,-9.610389614285714e-201,-9.60539460934066e-201,-9.600399604395605e-201,-9.595404599450548e-201,-9.590409594505494e-201,-9.585414589560439e-201,-9.580419584615383e-201,-9.57542457967033e-201,-9.570429574725274e-201,-9.565434569780219e-201,-9.560439564835165e-201,-9.55544455989011e-201,-9.550449554945054e-201,-9.54545455e-201,-9.540459545054945e-201,-9.535464540109891e-201,-9.530469535164836e-201,-9.52547453021978e-201,-9.520479525274725e-201,-9.51548452032967e-201,-9.510489515384615e-201,-9.505494510439561e-201,-9.500499505494505e-201,-9.49550450054945e-201,-9.490509495604396e-201,-9.485514490659341e-201,-9.480519485714284e-201,-9.47552448076923e-201,-9.470529475824175e-201,-9.46553447087912e-201,-9.460539465934066e-201,-9.45554446098901e-201,-9.450549456043955e-201,-9.445554451098901e-201,-9.440559446153844e-201,-9.435564441208792e-201,-9.430569436263737e-201,-9.425574431318681e-201,-9.420579426373628e-201,-9.415584421428572e-201,-9.410589416483517e-201,-9.405594411538463e-201,-9.400599406593406e-201,-9.395604401648351e-201,-9.390609396703297e-201,-9.385614391758242e-201,-9.380619386813186e-201,-9.375624381868133e-201,-9.370629376923077e-201,-9.36563437197802e-201,-9.360639367032967e-201,-9.355644362087911e-201,-9.350649357142856e-201,-9.345654352197802e-201,-9.340659347252747e-201,-9.335664342307691e-201,-9.330669337362638e-201,-9.325674332417581e-201,-9.320679327472527e-201,-9.315684322527473e-201,-9.310689317582418e-201,-9.305694312637364e-201,-9.300699307692309e-201,-9.295704302747253e-201,-9.2907092978022e-201,-9.285714292857143e-201,-9.280719287912087e-201,-9.275724282967033e-201,-9.270729278021978e-201,-9.265734273076923e-201,-9.260739268131869e-201,-9.255744263186814e-201,-9.250749258241757e-201,-9.245754253296703e-201,-9.240759248351648e-201,-9.235764243406592e-201,-9.230769238461538e-201,-9.225774233516483e-201,-9.220779228571428e-201,-9.215784223626374e-201,-9.210789218681317e-201,-9.205794213736263e-201,-9.200799208791208e-201,-9.195804203846153e-201,-9.1908091989011e-201,-9.185814193956045e-201,-9.18081918901099e-201,-9.175824184065936e-201,-9.170829179120879e-201,-9.165834174175824e-201,-9.16083916923077e-201,-9.155844164285714e-201,-9.150849159340659e-201,-9.145854154395605e-201,-9.14085914945055e-201,-9.135864144505493e-201,-9.130869139560439e-201,-9.125874134615384e-201,-9.120879129670329e-201,-9.115884124725275e-201,-9.11088911978022e-201,-9.105894114835165e-201,-9.10089910989011e-201,-9.095904104945053e-201,-9.0909091e-201,-9.085914095054944e-201,-9.080919090109889e-201,-9.075924085164835e-201,-9.070929080219781e-201,-9.065934075274726e-201,-9.060939070329672e-201,-9.055944065384615e-201,-9.05094906043956e-201,-9.045954055494506e-201,-9.04095905054945e-201,-9.035964045604395e-201,-9.030969040659341e-201,-9.025974035714286e-201,-9.02097903076923e-201,-9.015984025824176e-201,-9.01098902087912e-201,-9.005994015934065e-201,-9.000999010989011e-201,-8.996004006043956e-201,-8.991009001098902e-201,-8.986013996153846e-201,-8.98101899120879e-201,-8.976023986263736e-201,-8.97102898131868e-201,-8.966033976373625e-201,-8.961038971428571e-201,-8.956043966483516e-201,-8.95104896153846e-201,-8.946053956593408e-201,-8.941058951648352e-201,-8.936063946703296e-201,-8.931068941758242e-201,-8.926073936813187e-201,-8.921078931868132e-201,-8.916083926923078e-201,-8.911088921978022e-201,-8.906093917032966e-201,-8.901098912087912e-201,-8.896103907142857e-201,-8.891108902197803e-201,-8.886113897252747e-201,-8.881118892307692e-201,-8.876123887362638e-201,-8.871128882417583e-201,-8.866133877472526e-201,-8.861138872527472e-201,-8.856143867582417e-201,-8.851148862637362e-201,-8.846153857692308e-201,-8.841158852747252e-201,-8.836163847802197e-201,-8.831168842857143e-201,-8.826173837912088e-201,-8.821178832967032e-201,-8.816183828021979e-201,-8.811188823076923e-201,-8.806193818131868e-201,-8.801198813186814e-201,-8.796203808241759e-201,-8.791208803296702e-201,-8.786213798351648e-201,-8.781218793406593e-201,-8.776223788461539e-201,-8.771228783516484e-201,-8.766233778571428e-201,-8.761238773626374e-201,-8.756243768681319e-201,-8.751248763736262e-201,-8.746253758791208e-201,-8.741258753846153e-201,-8.736263748901098e-201,-8.731268743956044e-201,-8.726273739010989e-201,-8.721278734065933e-201,-8.71628372912088e-201,-8.711288724175823e-201,-8.706293719230769e-201,-8.701298714285715e-201,-8.69630370934066e-201,-8.691308704395604e-201,-8.68631369945055e-201,-8.681318694505495e-201,-8.676323689560438e-201,-8.671328684615384e-201,-8.666333679670329e-201,-8.661338674725275e-201,-8.65634366978022e-201,-8.651348664835165e-201,-8.646353659890111e-201,-8.641358654945055e-201,-8.636363649999999e-201,-8.631368645054945e-201,-8.62637364010989e-201,-8.621378635164834e-201,-8.61638363021978e-201,-8.611388625274725e-201,-8.60639362032967e-201,-8.601398615384616e-201,-8.596403610439559e-201,-8.591408605494504e-201,-8.58641360054945e-201,-8.581418595604396e-201,-8.57642359065934e-201,-8.571428585714287e-201,-8.566433580769231e-201,-8.561438575824176e-201,-8.556443570879121e-201,-8.551448565934065e-201,-8.546453560989012e-201,-8.541458556043956e-201,-8.536463551098901e-201,-8.531468546153847e-201,-8.526473541208792e-201,-8.521478536263735e-201,-8.516483531318681e-201,-8.511488526373626e-201,-8.50649352142857e-201,-8.501498516483517e-201,-8.496503511538461e-201,-8.491508506593406e-201,-8.486513501648352e-201,-8.481518496703295e-201,-8.47652349175824e-201,-8.471528486813186e-201,-8.466533481868131e-201,-8.461538476923077e-201,-8.456543471978023e-201,-8.451548467032968e-201,-8.446553462087912e-201,-8.441558457142857e-201,-8.436563452197802e-201,-8.431568447252748e-201,-8.426573442307693e-201,-8.421578437362637e-201,-8.416583432417583e-201,-8.411588427472528e-201,-8.406593422527471e-201,-8.401598417582417e-201,-8.396603412637362e-201,-8.391608407692307e-201,-8.386613402747253e-201,-8.381618397802198e-201,-8.376623392857142e-201,-8.371628387912088e-201,-8.366633382967032e-201,-8.361638378021976e-201,-8.356643373076922e-201,-8.351648368131867e-201,-8.346653363186812e-201,-8.34165835824176e-201,-8.336663353296704e-201,-8.33166834835165e-201,-8.326673343406593e-201,-8.321678338461538e-201,-8.316683333516484e-201,-8.311688328571429e-201,-8.306693323626374e-201,-8.30169831868132e-201,-8.296703313736264e-201,-8.291708308791208e-201,-8.286713303846154e-201,-8.281718298901098e-201,-8.276723293956043e-201,-8.271728289010989e-201,-8.266733284065934e-201,-8.261738279120879e-201,-8.256743274175825e-201,-8.251748269230768e-201,-8.246753264285713e-201,-8.241758259340659e-201,-8.236763254395603e-201,-8.23176824945055e-201,-8.226773244505494e-201,-8.221778239560439e-201,-8.216783234615386e-201,-8.21178822967033e-201,-8.206793224725274e-201,-8.20179821978022e-201,-8.196803214835165e-201,-8.19180820989011e-201,-8.186813204945056e-201,-8.1818182e-201,-8.176823195054944e-201,-8.17182819010989e-201,-8.166833185164835e-201,-8.16183818021978e-201,-8.156843175274726e-201,-8.15184817032967e-201,-8.146853165384615e-201,-8.141858160439561e-201,-8.136863155494504e-201,-8.131868150549449e-201,-8.126873145604395e-201,-8.12187814065934e-201,-8.116883135714286e-201,-8.11188813076923e-201,-8.106893125824175e-201,-8.101898120879121e-201,-8.096903115934066e-201,-8.09190811098901e-201,-8.086913106043957e-201,-8.081918101098902e-201,-8.076923096153846e-201,-8.071928091208792e-201,-8.066933086263737e-201,-8.06193808131868e-201,-8.056943076373626e-201,-8.051948071428571e-201,-8.046953066483516e-201,-8.041958061538462e-201,-8.036963056593407e-201,-8.031968051648351e-201,-8.026973046703297e-201,-8.02197804175824e-201,-8.016983036813185e-201,-8.011988031868131e-201,-8.006993026923076e-201,-8.001998021978022e-201,-7.997003017032967e-201,-7.992008012087912e-201,-7.987013007142858e-201,-7.982018002197801e-201,-7.977022997252746e-201,-7.972027992307693e-201,-7.967032987362638e-201,-7.962037982417583e-201,-7.957042977472529e-201,-7.952047972527473e-201,-7.947052967582417e-201,-7.942057962637363e-201,-7.937062957692307e-201,-7.932067952747252e-201,-7.927072947802198e-201,-7.922077942857143e-201,-7.917082937912088e-201,-7.912087932967034e-201,-7.907092928021977e-201,-7.902097923076923e-201,-7.897102918131868e-201,-7.892107913186812e-201,-7.887112908241759e-201,-7.882117903296703e-201,-7.877122898351648e-201,-7.872127893406594e-201,-7.867132888461537e-201,-7.862137883516482e-201,-7.857142878571428e-201,-7.852147873626374e-201,-7.847152868681319e-201,-7.842157863736265e-201,-7.83716285879121e-201,-7.832167853846153e-201,-7.827172848901099e-201,-7.822177843956044e-201,-7.817182839010988e-201,-7.812187834065934e-201,-7.807192829120879e-201,-7.802197824175825e-201,-7.79720281923077e-201,-7.792207814285713e-201,-7.78721280934066e-201,-7.782217804395604e-201,-7.777222799450549e-201,-7.772227794505495e-201,-7.76723278956044e-201,-7.762237784615384e-201,-7.75724277967033e-201,-7.752247774725274e-201,-7.747252769780218e-201,-7.742257764835164e-201,-7.737262759890109e-201,-7.732267754945055e-201,-7.727272750000001e-201,-7.722277745054946e-201,-7.717282740109889e-201,-7.712287735164835e-201,-7.70729273021978e-201,-7.702297725274725e-201,-7.697302720329671e-201,-7.692307715384615e-201,-7.687312710439562e-201,-7.682317705494506e-201,-7.67732270054945e-201,-7.672327695604396e-201,-7.66733269065934e-201,-7.662337685714285e-201,-7.657342680769231e-201,-7.652347675824176e-201,-7.64735267087912e-201,-7.642357665934067e-201,-7.63736266098901e-201,-7.632367656043955e-201,-7.6273726510989e-201,-7.622377646153845e-201,-7.61738264120879e-201,-7.612387636263736e-201,-7.607392631318682e-201,-7.602397626373626e-201,-7.597402621428572e-201,-7.592407616483516e-201,-7.587412611538461e-201,-7.582417606593407e-201,-7.577422601648352e-201,-7.572427596703298e-201,-7.567432591758243e-201,-7.562437586813186e-201,-7.557442581868132e-201,-7.552447576923077e-201,-7.547452571978021e-201,-7.542457567032967e-201,-7.537462562087912e-201,-7.532467557142857e-201,-7.527472552197803e-201,-7.522477547252746e-201,-7.517482542307691e-201,-7.512487537362637e-201,-7.507492532417582e-201,-7.502497527472526e-201,-7.497502522527472e-201,-7.492507517582417e-201,-7.487512512637362e-201,-7.482517507692308e-201,-7.477522502747253e-201,-7.472527497802199e-201,-7.467532492857143e-201,-7.462537487912088e-201,-7.457542482967034e-201,-7.452547478021979e-201,-7.447552473076922e-201,-7.442557468131868e-201,-7.437562463186813e-201,-7.432567458241758e-201,-7.427572453296704e-201,-7.422577448351648e-201,-7.417582443406593e-201,-7.412587438461539e-201,-7.407592433516482e-201,-7.402597428571427e-201,-7.397602423626373e-201,-7.392607418681318e-201,-7.387612413736263e-201,-7.382617408791209e-201,-7.377622403846153e-201,-7.372627398901097e-201,-7.367632393956044e-201,-7.362637389010989e-201,-7.357642384065935e-201,-7.35264737912088e-201,-7.347652374175824e-201,-7.34265736923077e-201,-7.337662364285715e-201,-7.332667359340658e-201,-7.327672354395605e-201,-7.32267734945055e-201,-7.317682344505494e-201,-7.31268733956044e-201,-7.307692334615385e-201,-7.30269732967033e-201,-7.297702324725276e-201,-7.292707319780219e-201,-7.287712314835163e-201,-7.28271730989011e-201,-7.277722304945054e-201,-7.272727299999999e-201,-7.267732295054945e-201,-7.26273729010989e-201,-7.257742285164834e-201,-7.252747280219779e-201,-7.247752275274724e-201,-7.242757270329671e-201,-7.237762265384616e-201,-7.232767260439561e-201,-7.227772255494507e-201,-7.222777250549452e-201,-7.217782245604395e-201,-7.212787240659341e-201,-7.207792235714286e-201,-7.20279723076923e-201,-7.197802225824176e-201,-7.192807220879121e-201,-7.187812215934066e-201,-7.182817210989012e-201,-7.177822206043955e-201,-7.1728272010989e-201,-7.167832196153846e-201,-7.16283719120879e-201,-7.157842186263735e-201,-7.152847181318681e-201,-7.147852176373626e-201,-7.142857171428572e-201,-7.137862166483515e-201,-7.13286716153846e-201,-7.127872156593406e-201,-7.122877151648352e-201,-7.117882146703297e-201,-7.112887141758243e-201,-7.107892136813188e-201,-7.102897131868131e-201,-7.097902126923077e-201,-7.092907121978022e-201,-7.087912117032967e-201,-7.082917112087913e-201,-7.077922107142857e-201,-7.072927102197802e-201,-7.067932097252748e-201,-7.062937092307691e-201,-7.057942087362636e-201,-7.052947082417582e-201,-7.047952077472527e-201,-7.042957072527472e-201,-7.037962067582418e-201,-7.032967062637362e-201,-7.027972057692309e-201,-7.022977052747252e-201,-7.017982047802196e-201,-7.012987042857143e-201,-7.007992037912087e-201,-7.002997032967032e-201,-6.99800202802198e-201,-6.993007023076924e-201,-6.988012018131867e-201,-6.983017013186814e-201,-6.978022008241758e-201,-6.973027003296703e-201,-6.968031998351649e-201,-6.963036993406594e-201,-6.958041988461538e-201,-6.953046983516485e-201,-6.948051978571428e-201,-6.943056973626372e-201,-6.938061968681319e-201,-6.933066963736263e-201,-6.92807195879121e-201,-6.923076953846154e-201,-6.918081948901099e-201,-6.913086943956045e-201,-6.908091939010988e-201,-6.903096934065933e-201,-6.898101929120879e-201,-6.893106924175824e-201,-6.888111919230768e-201,-6.883116914285714e-201,-6.87812190934066e-201,-6.873126904395604e-201,-6.86813189945055e-201,-6.863136894505495e-201,-6.858141889560439e-201,-6.853146884615385e-201,-6.84815187967033e-201,-6.843156874725275e-201,-6.838161869780221e-201,-6.833166864835164e-201,-6.828171859890109e-201,-6.823176854945055e-201,-6.81818185e-201,-6.813186845054946e-201,-6.80819184010989e-201,-6.803196835164835e-201,-6.798201830219781e-201,-6.793206825274724e-201,-6.788211820329669e-201,-6.783216815384615e-201,-6.77822181043956e-201,-6.773226805494505e-201,-6.76823180054945e-201,-6.763236795604395e-201,-6.75824179065934e-201,-6.753246785714286e-201,-6.748251780769231e-201,-6.743256775824176e-201,-6.738261770879122e-201,-6.733266765934066e-201,-6.728271760989011e-201,-6.723276756043957e-201,-6.7182817510989e-201,-6.713286746153845e-201,-6.708291741208791e-201,-6.703296736263736e-201,-6.698301731318682e-201,-6.693306726373627e-201,-6.688311721428571e-201,-6.683316716483517e-201,-6.67832171153846e-201,-6.673326706593407e-201,-6.668331701648352e-201,-6.663336696703296e-201,-6.658341691758242e-201,-6.653346686813187e-201,-6.648351681868132e-201,-6.643356676923076e-201,-6.638361671978022e-201,-6.633366667032967e-201,-6.628371662087912e-201,-6.623376657142857e-201,-6.618381652197803e-201,-6.613386647252746e-201,-6.608391642307692e-201,-6.603396637362638e-201,-6.598401632417583e-201,-6.593406627472527e-201,-6.588411622527472e-201,-6.583416617582418e-201,-6.578421612637363e-201,-6.573426607692308e-201,-6.568431602747252e-201,-6.563436597802197e-201,-6.558441592857143e-201,-6.553446587912088e-201,-6.548451582967033e-201,-6.543456578021979e-201,-6.538461573076923e-201,-6.533466568131868e-201,-6.5284715631868134e-201,-6.523476558241758e-201,-6.518481553296703e-201,-6.513486548351648e-201,-6.5084915434065936e-201,-6.503496538461538e-201,-6.498501533516483e-201,-6.493506528571428e-201,-6.488511523626373e-201,-6.483516518681319e-201,-6.478521513736264e-201,-6.4735265087912085e-201,-6.468531503846154e-201,-6.463536498901099e-201,-6.458541493956044e-201,-6.453546489010989e-201,-6.448551484065934e-201,-6.4435564791208795e-201,-6.4385614741758234e-201,-6.433566469230769e-201,-6.428571464285714e-201,-6.4235764593406596e-201,-6.418581454395604e-201,-6.41358644945055e-201,-6.408591444505495e-201,-6.403596439560439e-201,-6.3986014346153845e-201,-6.39360642967033e-201,-6.3886114247252746e-201,-6.383616419780219e-201,-6.378621414835165e-201,-6.373626409890109e-201,-6.368631404945055e-201,-6.3636363999999994e-201,-6.358641395054945e-201,-6.35364639010989e-201,-6.3486513851648356e-201,-6.34365638021978e-201,-6.338661375274725e-201,-6.3336663703296704e-201,-6.328671365384616e-201,-6.32367636043956e-201,-6.318681355494505e-201,-6.3136863505494505e-201,-6.308691345604395e-201,-6.30369634065934e-201,-6.298701335714286e-201,-6.2937063307692314e-201,-6.2887113258241754e-201,-6.283716320879121e-201,-6.278721315934066e-201,-6.273726310989011e-201,-6.2687313060439556e-201,-6.263736301098901e-201,-6.2587412961538456e-201,-6.253746291208791e-201,-6.248751286263736e-201,-6.243756281318681e-201,-6.2387612763736265e-201,-6.233766271428572e-201,-6.2287712664835166e-201,-6.223776261538461e-201,-6.218781256593407e-201,-6.213786251648352e-201,-6.208791246703296e-201,-6.2037962417582415e-201,-6.198801236813187e-201,-6.1938062318681315e-201,-6.188811226923076e-201,-6.1838162219780216e-201,-6.178821217032968e-201,-6.173826212087912e-201,-6.168831207142857e-201,-6.1638362021978025e-201,-6.158841197252747e-201,-6.153846192307692e-201,-6.148851187362637e-201,-6.143856182417582e-201,-6.138861177472527e-201,-6.133866172527472e-201,-6.1288711675824174e-201,-6.123876162637362e-201,-6.118881157692308e-201,-6.113886152747253e-201,-6.1088911478021976e-201,-6.103896142857143e-201,-6.0989011379120884e-201,-6.0939061329670324e-201,-6.088911128021978e-201,-6.083916123076923e-201,-6.0789211181318686e-201,-6.0739261131868125e-201,-6.068931108241758e-201,-6.063936103296703e-201,-6.058941098351647e-201,-6.0539460934065934e-201,-6.048951088461539e-201,-6.0439560835164835e-201,-6.038961078571428e-201,-6.0339660736263736e-201,-6.028971068681319e-201,-6.023976063736264e-201,-6.018981058791208e-201,-6.013986053846154e-201,-6.0089910489010984e-201,-6.003996043956044e-201,-5.9990010390109885e-201,-5.994006034065934e-201,-5.989011029120879e-201,-5.984016024175825e-201,-5.979021019230769e-201,-5.974026014285714e-201,-5.9690310093406595e-201,-5.964036004395605e-201,-5.959040999450549e-201,-5.954045994505494e-201,-5.94905098956044e-201,-5.944055984615384e-201,-5.939060979670329e-201,-5.934065974725275e-201,-5.92907096978022e-201,-5.9240759648351645e-201,-5.91908095989011e-201,-5.914085954945055e-201,-5.90909095e-201,-5.904095945054945e-201,-5.89910094010989e-201,-5.894105935164835e-201,-5.88911093021978e-201,-5.884115925274725e-201,-5.8791209203296695e-201,-5.874125915384616e-201,-5.869130910439561e-201,-5.864135905494506e-201,-5.8591409005494504e-201,-5.854145895604396e-201,-5.849150890659341e-201,-5.844155885714285e-201,-5.8391608807692306e-201,-5.834165875824176e-201,-5.829170870879121e-201,-5.824175865934065e-201,-5.819180860989011e-201,-5.814185856043956e-201,-5.809190851098901e-201,-5.804195846153846e-201,-5.7992008412087916e-201,-5.794205836263736e-201,-5.789210831318681e-201,-5.7842158263736264e-201,-5.779220821428571e-201,-5.7742258164835165e-201,-5.769230811538461e-201,-5.764235806593406e-201,-5.759240801648351e-201,-5.754245796703297e-201,-5.749250791758242e-201,-5.744255786813187e-201,-5.739260781868132e-201,-5.7342657769230775e-201,-5.7292707719780215e-201,-5.724275767032967e-201,-5.719280762087912e-201,-5.714285757142857e-201,-5.709290752197802e-201,-5.704295747252747e-201,-5.6993007423076925e-201,-5.6943057373626364e-201,-5.6893107324175825e-201,-5.684315727472528e-201,-5.6793207225274726e-201,-5.674325717582417e-201,-5.669330712637363e-201,-5.6643357076923074e-201,-5.659340702747253e-201,-5.6543456978021975e-201,-5.649350692857142e-201,-5.6443556879120875e-201,-5.639360682967033e-201,-5.6343656780219776e-201,-5.629370673076923e-201,-5.6243756681318684e-201,-5.619380663186814e-201,-5.614385658241758e-201,-5.609390653296703e-201,-5.6043956483516486e-201,-5.599400643406593e-201,-5.594405638461538e-201,-5.5894106335164834e-201,-5.584415628571429e-201,-5.579420623626373e-201,-5.574425618681318e-201,-5.569430613736264e-201,-5.564435608791209e-201,-5.5594406038461536e-201,-5.554445598901099e-201,-5.549450593956044e-201,-5.544455589010989e-201,-5.539460584065934e-201,-5.534465579120879e-201,-5.529470574175824e-201,-5.524475569230769e-201,-5.519480564285714e-201,-5.5144855593406586e-201,-5.509490554395605e-201,-5.50449554945055e-201,-5.499500544505494e-201,-5.4945055395604395e-201,-5.489510534615385e-201,-5.48451552967033e-201,-5.479520524725274e-201,-5.47452551978022e-201,-5.469530514835165e-201,-5.46453550989011e-201,-5.4595405049450544e-201,-5.4545455e-201,-5.449550495054945e-201,-5.44455549010989e-201,-5.439560485164835e-201,-5.43456548021978e-201,-5.4295704752747254e-201,-5.42457547032967e-201,-5.4195804653846155e-201,-5.41458546043956e-201,-5.4095904554945056e-201,-5.40459545054945e-201,-5.399600445604395e-201,-5.39460544065934e-201,-5.389610435714286e-201,-5.3846154307692304e-201,-5.379620425824176e-201,-5.374625420879121e-201,-5.3696304159340666e-201,-5.3646354109890106e-201,-5.359640406043956e-201,-5.3546454010989014e-201,-5.349650396153846e-201,-5.344655391208791e-201,-5.339660386263736e-201,-5.334665381318681e-201,-5.3296703763736255e-201,-5.324675371428572e-201,-5.319680366483517e-201,-5.314685361538462e-201,-5.3096903565934064e-201,-5.304695351648352e-201,-5.2997003467032965e-201,-5.294705341758242e-201,-5.2897103368131866e-201,-5.284715331868131e-201,-5.279720326923077e-201,-5.274725321978022e-201,-5.269730317032966e-201,-5.264735312087912e-201,-5.2597403071428575e-201,-5.254745302197803e-201,-5.249750297252747e-201,-5.244755292307692e-201,-5.239760287362638e-201,-5.2347652824175824e-201,-5.229770277472527e-201,-5.2247752725274725e-201,-5.219780267582417e-201,-5.214785262637362e-201,-5.209790257692307e-201,-5.2047952527472534e-201,-5.199800247802198e-201,-5.194805242857143e-201,-5.189810237912088e-201,-5.184815232967033e-201,-5.179820228021978e-201,-5.174825223076923e-201,-5.1698302181318676e-201,-5.164835213186813e-201,-5.1598402082417584e-201,-5.154845203296702e-201,-5.149850198351648e-201,-5.144855193406594e-201,-5.139860188461539e-201,-5.134865183516483e-201,-5.1298701785714286e-201,-5.124875173626374e-201,-5.119880168681319e-201,-5.1148851637362634e-201,-5.109890158791209e-201,-5.1048951538461535e-201,-5.099900148901098e-201,-5.0949051439560436e-201,-5.089910139010989e-201,-5.0849151340659336e-201,-5.079920129120879e-201,-5.0749251241758244e-201,-5.069930119230769e-201,-5.0649351142857145e-201,-5.059940109340659e-201,-5.054945104395604e-201,-5.049950099450549e-201,-5.044955094505495e-201,-5.0399600895604394e-201,-5.034965084615384e-201,-5.0299700796703295e-201,-5.024975074725275e-201,-5.0199800697802195e-201,-5.014985064835165e-201,-5.00999005989011e-201,-5.004995054945055e-201,-5.00000005e-201,-4.995005045054945e-201,-4.9900100401098905e-201,-4.9850150351648345e-201,-4.98002003021978e-201,-4.975025025274725e-201,-4.97003002032967e-201,-4.9650350153846146e-201,-4.960040010439561e-201,-4.9550450054945054e-201,-4.950050000549451e-201,-4.9450549956043955e-201,-4.94005999065934e-201,-4.9350649857142856e-201,-4.930069980769231e-201,-4.925074975824176e-201,-4.9200799708791204e-201,-4.915084965934066e-201,-4.910089960989011e-201,-4.905094956043955e-201,-4.900099951098901e-201,-4.895104946153847e-201,-4.890109941208791e-201,-4.885114936263736e-201,-4.8801199313186814e-201,-4.875124926373627e-201,-4.8701299214285715e-201,-4.865134916483516e-201,-4.8601399115384616e-201,-4.855144906593406e-201,-4.850149901648351e-201,-4.845154896703296e-201,-4.840159891758242e-201,-4.835164886813187e-201,-4.830169881868132e-201,-4.825174876923077e-201,-4.820179871978022e-201,-4.815184867032967e-201,-4.810189862087912e-201,-4.805194857142857e-201,-4.800199852197802e-201,-4.7952048472527475e-201,-4.7902098423076914e-201,-4.785214837362637e-201,-4.780219832417582e-201,-4.7752248274725284e-201,-4.770229822527472e-201,-4.765234817582418e-201,-4.760239812637363e-201,-4.755244807692308e-201,-4.7502498027472525e-201,-4.745254797802198e-201,-4.7402597928571426e-201,-4.735264787912087e-201,-4.730269782967033e-201,-4.725274778021977e-201,-4.720279773076923e-201,-4.715284768131868e-201,-4.7102897631868136e-201,-4.705294758241758e-201,-4.7002997532967036e-201,-4.695304748351648e-201,-4.690309743406593e-201,-4.6853147384615384e-201,-4.680319733516484e-201,-4.675324728571428e-201,-4.670329723626373e-201,-4.6653347186813186e-201,-4.660339713736264e-201,-4.655344708791209e-201,-4.650349703846154e-201,-4.6453546989010995e-201,-4.640359693956044e-201,-4.635364689010989e-201,-4.630369684065934e-201,-4.625374679120879e-201,-4.6203796741758236e-201,-4.615384669230769e-201,-4.610389664285714e-201,-4.605394659340659e-201,-4.600399654395604e-201,-4.59540464945055e-201,-4.5904096445054945e-201,-4.58541463956044e-201,-4.5804196346153846e-201,-4.575424629670329e-201,-4.570429624725275e-201,-4.56543461978022e-201,-4.560439614835164e-201,-4.5554446098901095e-201,-4.550449604945055e-201,-4.5454546e-201,-4.540459595054944e-201,-4.5354645901098904e-201,-4.530469585164836e-201,-4.5254745802197804e-201,-4.520479575274725e-201,-4.5154845703296705e-201,-4.510489565384615e-201,-4.50549456043956e-201,-4.500499555494505e-201,-4.495504550549451e-201,-4.4905095456043954e-201,-4.48551454065934e-201,-4.4805195357142855e-201,-4.47552453076923e-201,-4.470529525824176e-201,-4.465534520879121e-201,-4.4605395159340656e-201,-4.455544510989011e-201,-4.4505495060439564e-201,-4.445554501098901e-201,-4.440559496153846e-201,-4.435564491208791e-201,-4.4305694862637366e-201,-4.4255744813186806e-201,-4.420579476373626e-201,-4.415584471428571e-201,-4.410589466483517e-201,-4.4055944615384614e-201,-4.400599456593407e-201,-4.3956044516483515e-201,-4.390609446703297e-201,-4.3856144417582416e-201,-4.380619436813187e-201,-4.375624431868132e-201,-4.3706294269230764e-201,-4.365634421978022e-201,-4.3606394170329665e-201,-4.355644412087912e-201,-4.350649407142857e-201,-4.345654402197802e-201,-4.340659397252747e-201,-4.335664392307693e-201,-4.3306693873626374e-201,-4.325674382417582e-201,-4.3206793774725275e-201,-4.315684372527473e-201,-4.310689367582417e-201,-4.305694362637362e-201,-4.300699357692308e-201,-4.295704352747252e-201,-4.290709347802198e-201,-4.285714342857143e-201,-4.2807193379120886e-201,-4.275724332967033e-201,-4.270729328021978e-201,-4.265734323076923e-201,-4.260739318131868e-201,-4.255744313186813e-201,-4.250749308241758e-201,-4.245754303296703e-201,-4.240759298351648e-201,-4.235764293406593e-201,-4.230769288461538e-201,-4.225774283516484e-201,-4.220779278571429e-201,-4.215784273626374e-201,-4.2107892686813184e-201,-4.205794263736264e-201,-4.200799258791209e-201,-4.195804253846153e-201,-4.1908092489010986e-201,-4.185814243956044e-201,-4.180819239010989e-201,-4.175824234065933e-201,-4.1708292291208795e-201,-4.165834224175825e-201,-4.1608392192307696e-201,-4.155844214285714e-201,-4.15084920934066e-201,-4.145854204395604e-201,-4.140859199450549e-201,-4.1358641945054944e-201,-4.130869189560439e-201,-4.1258741846153845e-201,-4.120879179670329e-201,-4.1158841747252746e-201,-4.110889169780219e-201,-4.1058941648351654e-201,-4.10089915989011e-201,-4.095904154945055e-201,-4.09090915e-201,-4.0859141450549455e-201,-4.0809191401098895e-201,-4.075924135164835e-201,-4.07092913021978e-201,-4.065934125274726e-201,-4.06093912032967e-201,-4.055944115384615e-201,-4.0509491104395605e-201,-4.045954105494506e-201,-4.0409591005494506e-201,-4.035964095604396e-201,-4.030969090659341e-201,-4.025974085714285e-201,-4.020979080769231e-201,-4.0159840758241754e-201,-4.010989070879121e-201,-4.0059940659340655e-201,-4.000999060989011e-201,-3.9960040560439556e-201,-3.991009051098901e-201,-3.9860140461538464e-201,-3.981019041208791e-201,-3.9760240362637365e-201,-3.971029031318682e-201,-3.966034026373626e-201,-3.961039021428571e-201,-3.9560440164835166e-201,-3.951049011538462e-201,-3.946054006593406e-201,-3.9410590016483514e-201,-3.936063996703297e-201,-3.9310689917582415e-201,-3.926073986813187e-201,-3.921078981868132e-201,-3.916083976923077e-201,-3.9110889719780216e-201,-3.906093967032967e-201,-3.9010989620879124e-201,-3.896103957142857e-201,-3.891108952197802e-201,-3.886113947252747e-201,-3.881118942307692e-201,-3.876123937362637e-201,-3.871128932417582e-201,-3.8661339274725274e-201,-3.861138922527473e-201,-3.856143917582418e-201,-3.851148912637362e-201,-3.8461539076923075e-201,-3.841158902747253e-201,-3.836163897802198e-201,-3.831168892857142e-201,-3.826173887912088e-201,-3.821178882967033e-201,-3.816183878021978e-201,-3.8111888730769225e-201,-3.806193868131868e-201,-3.801198863186813e-201,-3.796203858241759e-201,-3.791208853296703e-201,-3.786213848351649e-201,-3.7812188434065934e-201,-3.776223838461538e-201,-3.7712288335164835e-201,-3.766233828571428e-201,-3.7612388236263736e-201,-3.756243818681318e-201,-3.751248813736263e-201,-3.746253808791208e-201,-3.7412588038461545e-201,-3.736263798901099e-201,-3.731268793956044e-201,-3.726273789010989e-201,-3.721278784065935e-201,-3.7162837791208786e-201,-3.711288774175824e-201,-3.7062937692307694e-201,-3.701298764285714e-201,-3.696303759340659e-201,-3.691308754395604e-201,-3.686313749450549e-201,-3.681318744505495e-201,-3.67632373956044e-201,-3.671328734615385e-201,-3.66633372967033e-201,-3.6613387247252744e-201,-3.65634371978022e-201,-3.6513487148351645e-201,-3.64635370989011e-201,-3.6413587049450546e-201,-3.636363699999999e-201,-3.631368695054945e-201,-3.62637369010989e-201,-3.6213786851648355e-201,-3.61638368021978e-201,-3.6113886752747256e-201,-3.606393670329671e-201,-3.601398665384615e-201,-3.59640366043956e-201,-3.591408655494506e-201,-3.5864136505494504e-201,-3.581418645604395e-201,-3.5764236406593405e-201,-3.571428635714286e-201,-3.5664336307692306e-201,-3.561438625824176e-201,-3.5564436208791214e-201,-3.551448615934066e-201,-3.546453610989011e-201,-3.541458606043956e-201,-3.536463601098901e-201,-3.531468596153846e-201,-3.526473591208791e-201,-3.5214785862637356e-201,-3.516483581318681e-201,-3.5114885763736264e-201,-3.506493571428571e-201,-3.501498566483516e-201,-3.496503561538462e-201,-3.491508556593407e-201,-3.486513551648351e-201,-3.481518546703297e-201,-3.476523541758242e-201,-3.471528536813187e-201,-3.4665335318681314e-201,-3.461538526923077e-201,-3.456543521978022e-201,-3.451548517032967e-201,-3.4465535120879116e-201,-3.441558507142857e-201,-3.4365635021978024e-201,-3.431568497252747e-201,-3.4265734923076925e-201,-3.421578487362637e-201,-3.4165834824175825e-201,-3.411588477472527e-201,-3.4065934725274726e-201,-3.401598467582417e-201,-3.396603462637363e-201,-3.3916084576923074e-201,-3.386613452747252e-201,-3.3816184478021975e-201,-3.3766234428571436e-201,-3.3716284379120876e-201,-3.366633432967033e-201,-3.3616384280219784e-201,-3.356643423076924e-201,-3.351648418131868e-201,-3.346653413186813e-201,-3.3416584082417585e-201,-3.336663403296703e-201,-3.3316683983516486e-201,-3.326673393406593e-201,-3.321678388461539e-201,-3.3166833835164834e-201,-3.311688378571428e-201,-3.3066933736263735e-201,-3.301698368681319e-201,-3.2967033637362635e-201,-3.291708358791209e-201,-3.2867133538461536e-201,-3.281718348901098e-201,-3.276723343956044e-201,-3.271728339010989e-201,-3.2667333340659345e-201,-3.261738329120879e-201,-3.2567433241758242e-201,-3.251748319230769e-201,-3.2467533142857143e-201,-3.2417583093406594e-201,-3.2367633043956044e-201,-3.2317682994505494e-201,-3.2267732945054945e-201,-3.2217782895604395e-201,-3.2167832846153846e-201,-3.2117882796703296e-201,-3.206793274725275e-201,-3.2017982697802197e-201,-3.196803264835165e-201,-3.1918082598901098e-201,-3.1868132549450545e-201,-3.18181825e-201,-3.176823245054945e-201,-3.1718282401098903e-201,-3.166833235164835e-201,-3.16183823021978e-201,-3.156843225274725e-201,-3.15184822032967e-201,-3.1468532153846155e-201,-3.1418582104395605e-201,-3.1368632054945052e-201,-3.1318682005494506e-201,-3.1268731956043953e-201,-3.1218781906593407e-201,-3.1168831857142858e-201,-3.1118881807692308e-201,-3.106893175824176e-201,-3.101898170879121e-201,-3.096903165934066e-201,-3.091908160989011e-201,-3.086913156043956e-201,-3.0819181510989014e-201,-3.076923146153846e-201,-3.0719281412087908e-201,-3.066933136263736e-201,-3.061938131318681e-201,-3.0569431263736266e-201,-3.0519481214285713e-201,-3.0469531164835163e-201,-3.0419581115384614e-201,-3.0369631065934064e-201,-3.0319681016483515e-201,-3.026973096703297e-201,-3.0219780917582415e-201,-3.016983086813187e-201,-3.0119880818681316e-201,-3.006993076923077e-201,-3.0019980719780217e-201,-2.997003067032967e-201,-2.992008062087912e-201,-2.9870130571428572e-201,-2.9820180521978022e-201,-2.9770230472527473e-201,-2.972028042307692e-201,-2.9670330373626377e-201,-2.9620380324175824e-201,-2.9570430274725278e-201,-2.9520480225274725e-201,-2.947053017582417e-201,-2.9420580126373626e-201,-2.9370630076923076e-201,-2.932068002747253e-201,-2.9270729978021977e-201,-2.9220779928571427e-201,-2.9170829879120878e-201,-2.9120879829670328e-201,-2.9070929780219782e-201,-2.9020979730769233e-201,-2.897102968131868e-201,-2.8921079631868133e-201,-2.887112958241758e-201,-2.882117953296703e-201,-2.8771229483516485e-201,-2.8721279434065935e-201,-2.8671329384615386e-201,-2.8621379335164836e-201,-2.8571429285714283e-201,-2.8521479236263737e-201,-2.8471529186813184e-201,-2.842157913736264e-201,-2.8371629087912088e-201,-2.8321679038461535e-201,-2.827172898901099e-201,-2.8221778939560436e-201,-2.817182889010989e-201,-2.812187884065934e-201,-2.807192879120879e-201,-2.802197874175824e-201,-2.797202869230769e-201,-2.792207864285714e-201,-2.7872128593406592e-201,-2.7822178543956043e-201,-2.7772228494505497e-201,-2.7722278445054943e-201,-2.7672328395604397e-201,-2.7622378346153844e-201,-2.7572428296703295e-201,-2.752247824725275e-201,-2.74725281978022e-201,-2.742257814835165e-201,-2.73726280989011e-201,-2.7322678049450547e-201,-2.7272728e-201,-2.722277795054945e-201,-2.7172827901098898e-201,-2.7122877851648352e-201,-2.70729278021978e-201,-2.7022977752747253e-201,-2.69730277032967e-201,-2.6923077653846154e-201,-2.6873127604395604e-201,-2.6823177554945054e-201,-2.6773227505494505e-201,-2.6723277456043955e-201,-2.6673327406593402e-201,-2.662337735714286e-201,-2.6573427307692307e-201,-2.652347725824176e-201,-2.6473527208791207e-201,-2.6423577159340658e-201,-2.637362710989011e-201,-2.6323677060439562e-201,-2.6273727010989013e-201,-2.6223776961538463e-201,-2.617382691208791e-201,-2.6123876862637364e-201,-2.607392681318681e-201,-2.602397676373627e-201,-2.5974026714285715e-201,-2.5924076664835162e-201,-2.5874126615384616e-201,-2.5824176565934063e-201,-2.5774226516483517e-201,-2.5724276467032967e-201,-2.5674326417582418e-201,-2.5624376368131868e-201,-2.557442631868132e-201,-2.5524476269230765e-201,-2.547452621978022e-201,-2.5424576170329666e-201,-2.5374626120879124e-201,-2.532467607142857e-201,-2.527472602197802e-201,-2.522477597252747e-201,-2.517482592307692e-201,-2.5124875873626372e-201,-2.5074925824175826e-201,-2.5024975774725273e-201,-2.4975025725274727e-201,-2.4925075675824174e-201,-2.4875125626373628e-201,-2.4825175576923075e-201,-2.4775225527472525e-201,-2.472527547802198e-201,-2.4675325428571426e-201,-2.462537537912088e-201,-2.4575425329670327e-201,-2.4525475280219777e-201,-2.447552523076923e-201,-2.442557518131868e-201,-2.4375625131868132e-201,-2.4325675082417582e-201,-2.427572503296703e-201,-2.4225774983516483e-201,-2.4175824934065934e-201,-2.4125874884615388e-201,-2.4075924835164835e-201,-2.4025974785714285e-201,-2.3976024736263735e-201,-2.3926074686813186e-201,-2.387612463736264e-201,-2.382617458791209e-201,-2.3776224538461537e-201,-2.372627448901099e-201,-2.3676324439560438e-201,-2.362637439010989e-201,-2.3576424340659342e-201,-2.352647429120879e-201,-2.3476524241758243e-201,-2.342657419230769e-201,-2.337662414285714e-201,-2.332667409340659e-201,-2.3276724043956045e-201,-2.3226773994505495e-201,-2.3176823945054946e-201,-2.3126873895604392e-201,-2.3076923846153846e-201,-2.3026973796703293e-201,-2.297702374725275e-201,-2.2927073697802198e-201,-2.2877123648351648e-201,-2.28271735989011e-201,-2.277722354945055e-201,-2.27272735e-201,-2.2677323450549453e-201,-2.26273734010989e-201,-2.2577423351648354e-201,-2.25274733021978e-201,-2.2477523252747255e-201,-2.24275732032967e-201,-2.237762315384615e-201,-2.2327673104395606e-201,-2.2277723054945053e-201,-2.2227773005494507e-201,-2.2177822956043954e-201,-2.2127872906593404e-201,-2.2077922857142855e-201,-2.202797280769231e-201,-2.1978022758241756e-201,-2.192807270879121e-201,-2.1878122659340656e-201,-2.182817260989011e-201,-2.1778222560439557e-201,-2.172827251098901e-201,-2.167832246153846e-201,-2.1628372412087912e-201,-2.1578422362637362e-201,-2.1528472313186813e-201,-2.147852226373626e-201,-2.1428572214285717e-201,-2.1378622164835164e-201,-2.1328672115384618e-201,-2.1278722065934065e-201,-2.1228772016483515e-201,-2.1178821967032966e-201,-2.1128871917582416e-201,-2.107892186813187e-201,-2.1028971818681317e-201,-2.0979021769230767e-201,-2.0929071719780218e-201,-2.087912167032967e-201,-2.0829171620879122e-201,-2.0779221571428573e-201,-2.072927152197802e-201,-2.0679321472527474e-201,-2.062937142307692e-201,-2.0579421373626374e-201,-2.0529471324175825e-201,-2.0479521274725275e-201,-2.0429571225274726e-201,-2.0379621175824176e-201,-2.0329671126373626e-201,-2.0279721076923077e-201,-2.0229771027472527e-201,-2.017982097802198e-201,-2.0129870928571428e-201,-2.007992087912088e-201,-2.002997082967033e-201,-1.9980020780219776e-201,-1.9930070730769233e-201,-1.988012068131868e-201,-1.983017063186813e-201,-1.978022058241758e-201,-1.973027053296703e-201,-1.9680320483516482e-201,-1.9630370434065936e-201,-1.9580420384615383e-201,-1.9530470335164837e-201,-1.9480520285714284e-201,-1.9430570236263738e-201,-1.9380620186813184e-201,-1.933067013736264e-201,-1.928072008791209e-201,-1.923077003846154e-201,-1.918081998901099e-201,-1.913086993956044e-201,-1.9080919890109887e-201,-1.903096984065934e-201,-1.898101979120879e-201,-1.8931069741758245e-201,-1.8881119692307692e-201,-1.8831169642857143e-201,-1.8781219593406593e-201,-1.873126954395604e-201,-1.8681319494505497e-201,-1.8631369445054944e-201,-1.8581419395604395e-201,-1.8531469346153845e-201,-1.8481519296703295e-201,-1.8431569247252742e-201,-1.83816191978022e-201,-1.8331669148351647e-201,-1.82817190989011e-201,-1.8231769049450547e-201,-1.8181818999999998e-201,-1.813186895054945e-201,-1.8081918901098902e-201,-1.8031968851648353e-201,-1.7982018802197803e-201,-1.793206875274725e-201,-1.7882118703296704e-201,-1.783216865384615e-201,-1.778221860439561e-201,-1.7732268554945055e-201,-1.7682318505494506e-201,-1.7632368456043956e-201,-1.7582418406593403e-201,-1.7532468357142857e-201,-1.7482518307692307e-201,-1.7432568258241758e-201,-1.7382618208791208e-201,-1.733266815934066e-201,-1.728271810989011e-201,-1.723276806043956e-201,-1.718281801098901e-201,-1.7132867961538464e-201,-1.708291791208791e-201,-1.7032967862637365e-201,-1.698301781318681e-201,-1.6933067763736262e-201,-1.6883117714285716e-201,-1.6833167664835166e-201,-1.6783217615384617e-201,-1.6733267565934067e-201,-1.6683317516483514e-201,-1.6633367467032968e-201,-1.658341741758242e-201,-1.6533467368131865e-201,-1.648351731868132e-201,-1.643356726923077e-201,-1.638361721978022e-201,-1.633366717032967e-201,-1.628371712087912e-201,-1.6233767071428571e-201,-1.6183817021978024e-201,-1.6133866972527472e-201,-1.6083916923076923e-201,-1.6033966873626375e-201,-1.5984016824175825e-201,-1.5934066774725274e-201,-1.5884116725274726e-201,-1.5834166675824175e-201,-1.5784216626373625e-201,-1.5734266576923077e-201,-1.5684316527472526e-201,-1.5634366478021976e-201,-1.5584416428571429e-201,-1.5534466379120879e-201,-1.548451632967033e-201,-1.543456628021978e-201,-1.538461623076923e-201,-1.533466618131868e-201,-1.5284716131868133e-201,-1.5234766082417581e-201,-1.5184816032967032e-201,-1.5134865983516484e-201,-1.5084915934065934e-201,-1.5034965884615385e-201,-1.4985015835164835e-201,-1.4935065785714286e-201,-1.4885115736263736e-201,-1.4835165686813188e-201,-1.4785215637362639e-201,-1.4735265587912087e-201,-1.468531553846154e-201,-1.4635365489010988e-201,-1.4585415439560439e-201,-1.453546539010989e-201,-1.448551534065934e-201,-1.443556529120879e-201,-1.4385615241758242e-201,-1.4335665192307692e-201,-1.4285715142857141e-201,-1.4235765093406591e-201,-1.4185815043956044e-201,-1.4135864994505494e-201,-1.4085914945054945e-201,-1.4035964895604395e-201,-1.3986014846153845e-201,-1.3936064796703296e-201,-1.3886114747252748e-201,-1.3836164697802198e-201,-1.3786214648351647e-201,-1.37362645989011e-201,-1.368631454945055e-201,-1.36363645e-201,-1.3586414450549452e-201,-1.3536464401098901e-201,-1.3486514351648351e-201,-1.3436564302197802e-201,-1.3386614252747252e-201,-1.33366642032967e-201,-1.3286714153846153e-201,-1.3236764104395603e-201,-1.3186814054945054e-201,-1.3136864005494506e-201,-1.3086913956043955e-201,-1.3036963906593405e-201,-1.2987013857142857e-201,-1.2937063807692308e-201,-1.2887113758241758e-201,-1.2837163708791209e-201,-1.2787213659340659e-201,-1.273726360989011e-201,-1.2687313560439562e-201,-1.2637363510989012e-201,-1.258741346153846e-201,-1.2537463412087913e-201,-1.2487513362637363e-201,-1.2437563313186814e-201,-1.2387613263736264e-201,-1.2337663214285714e-201,-1.2287713164835165e-201,-1.2237763115384615e-201,-1.2187813065934066e-201,-1.2137863016483514e-201,-1.2087912967032967e-201,-1.2037962917582417e-201,-1.1988012868131867e-201,-1.193806281868132e-201,-1.1888112769230768e-201,-1.1838162719780219e-201,-1.178821267032967e-201,-1.1738262620879121e-201,-1.168831257142857e-201,-1.1638362521978022e-201,-1.1588412472527473e-201,-1.1538462423076923e-201,-1.1488512373626375e-201,-1.1438562324175824e-201,-1.1388612274725274e-201,-1.1338662225274726e-201,-1.1288712175824177e-201,-1.1238762126373627e-201,-1.1188812076923076e-201,-1.1138862027472528e-201,-1.1088911978021978e-201,-1.1038961928571427e-201,-1.098901187912088e-201,-1.0939061829670328e-201,-1.0889111780219778e-201,-1.083916173076923e-201,-1.0789211681318681e-201,-1.073926163186813e-201,-1.0689311582417582e-201,-1.0639361532967032e-201,-1.0589411483516483e-201,-1.0539461434065935e-201,-1.0489511384615383e-201,-1.0439561335164834e-201,-1.0389611285714286e-201,-1.0339661236263736e-201,-1.0289711186813187e-201,-1.0239761137362637e-201,-1.0189811087912088e-201,-1.0139861038461538e-201,-1.008991098901099e-201,-1.003996093956044e-201,-9.99001089010989e-202,-9.940060840659342e-202,-9.890110791208792e-202,-9.84016074175824e-202,-9.790210692307691e-202,-9.740260642857141e-202,-9.690310593406592e-202,-9.640360543956044e-202,-9.590410494505495e-202,-9.540460445054943e-202,-9.490510395604395e-202,-9.440560346153846e-202,-9.390610296703296e-202,-9.340660247252748e-202,-9.290710197802197e-202,-9.240760148351647e-202,-9.1908100989011e-202,-9.14086004945055e-202,-9.09091e-202,-9.04095995054945e-202,-8.991009901098901e-202,-8.941059851648352e-202,-8.891109802197804e-202,-8.841159752747253e-202,-8.791209703296703e-202,-8.741259653846155e-202,-8.691309604395606e-202,-8.641359554945054e-202,-8.591409505494505e-202,-8.541459456043955e-202,-8.491509406593405e-202,-8.441559357142858e-202,-8.391609307692308e-202,-8.341659258241757e-202,-8.291709208791209e-202,-8.24175915934066e-202,-8.19180910989011e-202,-8.14185906043956e-202,-8.0919090109890115e-202,-8.041958961538461e-202,-7.992008912087912e-202,-7.942058862637363e-202,-7.892108813186813e-202,-7.842158763736264e-202,-7.792208714285715e-202,-7.742258664835164e-202,-7.692308615384615e-202,-7.642358565934066e-202,-7.592408516483516e-202,-7.542458467032967e-202,-7.492508417582418e-202,-7.442558368131868e-202,-7.392608318681319e-202,-7.3426582692307695e-202,-7.29270821978022e-202,-7.24275817032967e-202,-7.192808120879122e-202,-7.142858071428571e-202,-7.092908021978022e-202,-7.042957972527472e-202,-6.993007923076922e-202,-6.943057873626374e-202,-6.893107824175823e-202,-6.843157774725275e-202,-6.793207725274726e-202,-6.743257675824175e-202,-6.693307626373627e-202,-6.643357576923077e-202,-6.5934075274725275e-202,-6.543457478021977e-202,-6.493507428571428e-202,-6.443557379120879e-202,-6.393607329670329e-202,-6.3436572802197805e-202,-6.29370723076923e-202,-6.243757181318681e-202,-6.193807131868133e-202,-6.143857082417582e-202,-6.0939070329670335e-202,-6.043956983516484e-202,-5.994006934065934e-202,-5.944056884615384e-202,-5.894106835164835e-202,-5.844156785714286e-202,-5.794206736263736e-202,-5.744256686813187e-202,-5.694306637362637e-202,-5.644356587912088e-202,-5.594406538461538e-202,-5.544456489010989e-202,-5.49450643956044e-202,-5.44455639010989e-202,-5.394606340659341e-202,-5.344656291208791e-202,-5.294706241758241e-202,-5.244756192307691e-202,-5.194806142857143e-202,-5.144856093406593e-202,-5.094906043956044e-202,-5.044955994505495e-202,-4.995005945054944e-202,-4.945055895604396e-202,-4.895105846153847e-202,-4.845155796703297e-202,-4.795205747252748e-202,-4.745255697802197e-202,-4.695305648351648e-202,-4.645355598901098e-202,-4.5954055494505495e-202,-4.5454555e-202,-4.49550545054945e-202,-4.445555401098902e-202,-4.395605351648351e-202,-4.3456553021978025e-202,-4.295705252747253e-202,-4.245755203296703e-202,-4.195805153846154e-202,-4.145855104395604e-202,-4.095905054945055e-202,-4.0459550054945055e-202,-3.996004956043956e-202,-3.9460549065934063e-202,-3.896104857142857e-202,-3.8461548076923076e-202,-3.7962047582417584e-202,-3.746254708791209e-202,-3.6963046593406593e-202,-3.6463546098901097e-202,-3.5964045604395605e-202,-3.546454510989011e-202,-3.4965044615384614e-202,-3.446554412087912e-202,-3.3966043626373627e-202,-3.346654313186813e-202,-3.2967042637362635e-202,-3.2467542142857144e-202,-3.1968041648351648e-202,-3.146854115384615e-202,-3.096904065934066e-202,-3.0469540164835165e-202,-2.997003967032967e-202,-2.9470539175824177e-202,-2.897103868131868e-202,-2.847153818681318e-202,-2.797203769230769e-202,-2.74725371978022e-202,-2.6973036703296703e-202,-2.6473536208791207e-202,-2.5974035714285716e-202,-2.5474535219780215e-202,-2.4975034725274724e-202,-2.4475534230769232e-202,-2.3976033736263737e-202,-2.347653324175824e-202,-2.297703274725275e-202,-2.247753225274725e-202,-2.1978031758241753e-202,-2.1478531263736266e-202,-2.097903076923077e-202,-2.0479530274725275e-202,-1.9980029780219779e-202,-1.9480529285714288e-202,-1.8981028791208792e-202,-1.8481528296703296e-202,-1.7982027802197802e-202,-1.7482527307692309e-202,-1.6983026813186813e-202,-1.6483526318681317e-202,-1.5984025824175826e-202,-1.548452532967033e-202,-1.4985024835164834e-202,-1.4485524340659343e-202,-1.3986023846153844e-202,-1.348652335164835e-202,-1.298702285714286e-202,-1.2487522362637361e-202,-1.1988021868131868e-202,-1.1488521373626374e-202,-1.0989020879120878e-202,-1.0489520384615385e-202,-9.99001989010989e-203,-9.490519395604394e-203,-8.991018901098902e-203,-8.491518406593407e-203,-7.992017912087911e-203,-7.492517417582418e-203,-6.993016923076923e-203,-6.493516428571428e-203,-5.994015934065934e-203,-5.494515439560439e-203,-4.995014945054945e-203,-4.495514450549451e-203,-3.9960139560439556e-203,-3.4965134615384614e-203,-2.997012967032967e-203,-2.4975124725274722e-203,-1.998011978021978e-203,-1.4985114835164834e-203,-9.99010989010989e-204,-4.995104945054945e-204,-1.0e-208]}
},{}],78:[function(require,module,exports){
module.exports={"expected":[1.0e-320,9.995e-321,9.99e-321,9.985e-321,9.98e-321,9.975e-321,9.97e-321,9.965e-321,9.96e-321,9.955e-321,9.95e-321,9.946e-321,9.94e-321,9.936e-321,9.93e-321,9.926e-321,9.92e-321,9.916e-321,9.91e-321,9.906e-321,9.9e-321,9.896e-321,9.89e-321,9.886e-321,9.88e-321,9.876e-321,9.87e-321,9.866e-321,9.86e-321,9.857e-321,9.85e-321,9.847e-321,9.84e-321,9.837e-321,9.83e-321,9.827e-321,9.82e-321,9.817e-321,9.81e-321,9.807e-321,9.8e-321,9.797e-321,9.79e-321,9.787e-321,9.782e-321,9.78e-321,9.77e-321,9.763e-321,9.76e-321,9.753e-321,9.75e-321,9.743e-321,9.74e-321,9.733e-321,9.73e-321,9.723e-321,9.72e-321,9.713e-321,9.71e-321,9.703e-321,9.7e-321,9.694e-321,9.69e-321,9.684e-321,9.68e-321,9.674e-321,9.67e-321,9.664e-321,9.66e-321,9.654e-321,9.65e-321,9.644e-321,9.64e-321,9.634e-321,9.63e-321,9.624e-321,9.62e-321,9.615e-321,9.61e-321,9.605e-321,9.6e-321,9.595e-321,9.59e-321,9.585e-321,9.58e-321,9.575e-321,9.57e-321,9.565e-321,9.56e-321,9.555e-321,9.55e-321,9.545e-321,9.54e-321,9.535e-321,9.53e-321,9.526e-321,9.52e-321,9.516e-321,9.51e-321,9.506e-321,9.5e-321,9.496e-321,9.49e-321,9.486e-321,9.48e-321,9.476e-321,9.47e-321,9.466e-321,9.46e-321,9.456e-321,9.45e-321,9.447e-321,9.44e-321,9.437e-321,9.43e-321,9.427e-321,9.42e-321,9.417e-321,9.41e-321,9.407e-321,9.4e-321,9.397e-321,9.39e-321,9.387e-321,9.38e-321,9.377e-321,9.37e-321,9.367e-321,9.363e-321,9.36e-321,9.353e-321,9.35e-321,9.343e-321,9.34e-321,9.333e-321,9.33e-321,9.323e-321,9.313e-321,9.31e-321,9.303e-321,9.3e-321,9.293e-321,9.29e-321,9.283e-321,9.28e-321,9.274e-321,9.27e-321,9.264e-321,9.26e-321,9.254e-321,9.25e-321,9.244e-321,9.24e-321,9.234e-321,9.23e-321,9.224e-321,9.22e-321,9.214e-321,9.21e-321,9.204e-321,9.2e-321,9.195e-321,9.19e-321,9.185e-321,9.18e-321,9.175e-321,9.17e-321,9.165e-321,9.16e-321,9.155e-321,9.15e-321,9.145e-321,9.14e-321,9.135e-321,9.13e-321,9.125e-321,9.12e-321,9.116e-321,9.11e-321,9.106e-321,9.1e-321,9.096e-321,9.09e-321,9.086e-321,9.08e-321,9.076e-321,9.07e-321,9.066e-321,9.06e-321,9.056e-321,9.05e-321,9.046e-321,9.04e-321,9.036e-321,9.03e-321,9.027e-321,9.02e-321,9.017e-321,9.01e-321,9.007e-321,9.0e-321,8.997e-321,8.99e-321,8.987e-321,8.98e-321,8.977e-321,8.97e-321,8.967e-321,8.96e-321,8.957e-321,8.95e-321,8.948e-321,8.943e-321,8.94e-321,8.933e-321,8.93e-321,8.923e-321,8.92e-321,8.913e-321,8.91e-321,8.903e-321,8.9e-321,8.893e-321,8.89e-321,8.883e-321,8.88e-321,8.873e-321,8.87e-321,8.86e-321,8.854e-321,8.85e-321,8.844e-321,8.84e-321,8.834e-321,8.83e-321,8.824e-321,8.82e-321,8.814e-321,8.81e-321,8.804e-321,8.8e-321,8.794e-321,8.79e-321,8.784e-321,8.78e-321,8.775e-321,8.77e-321,8.765e-321,8.76e-321,8.755e-321,8.75e-321,8.745e-321,8.74e-321,8.735e-321,8.73e-321,8.725e-321,8.72e-321,8.715e-321,8.71e-321,8.705e-321,8.7e-321,8.696e-321,8.69e-321,8.686e-321,8.68e-321,8.676e-321,8.67e-321,8.666e-321,8.66e-321,8.656e-321,8.65e-321,8.646e-321,8.64e-321,8.636e-321,8.63e-321,8.626e-321,8.62e-321,8.617e-321,8.61e-321,8.607e-321,8.6e-321,8.597e-321,8.59e-321,8.587e-321,8.58e-321,8.577e-321,8.57e-321,8.567e-321,8.56e-321,8.557e-321,8.55e-321,8.547e-321,8.54e-321,8.537e-321,8.533e-321,8.53e-321,8.523e-321,8.52e-321,8.513e-321,8.51e-321,8.503e-321,8.5e-321,8.493e-321,8.49e-321,8.483e-321,8.48e-321,8.473e-321,8.47e-321,8.463e-321,8.46e-321,8.453e-321,8.45e-321,8.444e-321,8.44e-321,8.434e-321,8.43e-321,8.424e-321,8.42e-321,8.414e-321,8.404e-321,8.4e-321,8.394e-321,8.39e-321,8.384e-321,8.38e-321,8.374e-321,8.37e-321,8.365e-321,8.36e-321,8.355e-321,8.35e-321,8.345e-321,8.34e-321,8.335e-321,8.33e-321,8.325e-321,8.32e-321,8.315e-321,8.31e-321,8.305e-321,8.3e-321,8.295e-321,8.29e-321,8.285e-321,8.28e-321,8.276e-321,8.27e-321,8.266e-321,8.26e-321,8.256e-321,8.25e-321,8.246e-321,8.24e-321,8.236e-321,8.23e-321,8.226e-321,8.22e-321,8.216e-321,8.21e-321,8.206e-321,8.2e-321,8.197e-321,8.19e-321,8.187e-321,8.18e-321,8.177e-321,8.17e-321,8.167e-321,8.16e-321,8.157e-321,8.15e-321,8.147e-321,8.14e-321,8.137e-321,8.13e-321,8.127e-321,8.12e-321,8.117e-321,8.113e-321,8.11e-321,8.103e-321,8.1e-321,8.093e-321,8.09e-321,8.083e-321,8.08e-321,8.073e-321,8.07e-321,8.063e-321,8.06e-321,8.053e-321,8.05e-321,8.043e-321,8.04e-321,8.034e-321,8.03e-321,8.024e-321,8.02e-321,8.014e-321,8.01e-321,8.004e-321,8.0e-321,7.994e-321,7.99e-321,7.984e-321,7.98e-321,7.974e-321,7.97e-321,7.964e-321,7.96e-321,7.95e-321,7.945e-321,7.94e-321,7.935e-321,7.93e-321,7.925e-321,7.92e-321,7.915e-321,7.91e-321,7.905e-321,7.9e-321,7.895e-321,7.89e-321,7.885e-321,7.88e-321,7.875e-321,7.87e-321,7.866e-321,7.86e-321,7.856e-321,7.85e-321,7.846e-321,7.84e-321,7.836e-321,7.83e-321,7.826e-321,7.82e-321,7.816e-321,7.81e-321,7.806e-321,7.8e-321,7.796e-321,7.79e-321,7.786e-321,7.78e-321,7.777e-321,7.77e-321,7.767e-321,7.76e-321,7.757e-321,7.75e-321,7.747e-321,7.74e-321,7.737e-321,7.73e-321,7.727e-321,7.72e-321,7.717e-321,7.71e-321,7.707e-321,7.702e-321,7.7e-321,7.693e-321,7.69e-321,7.683e-321,7.68e-321,7.673e-321,7.67e-321,7.663e-321,7.66e-321,7.653e-321,7.65e-321,7.643e-321,7.64e-321,7.633e-321,7.63e-321,7.623e-321,7.62e-321,7.614e-321,7.61e-321,7.604e-321,7.6e-321,7.594e-321,7.59e-321,7.584e-321,7.58e-321,7.574e-321,7.57e-321,7.564e-321,7.56e-321,7.554e-321,7.55e-321,7.544e-321,7.54e-321,7.535e-321,7.53e-321,7.525e-321,7.52e-321,7.515e-321,7.51e-321,7.505e-321,7.495e-321,7.49e-321,7.485e-321,7.48e-321,7.475e-321,7.47e-321,7.465e-321,7.46e-321,7.455e-321,7.45e-321,7.446e-321,7.44e-321,7.436e-321,7.43e-321,7.426e-321,7.42e-321,7.416e-321,7.41e-321,7.406e-321,7.4e-321,7.396e-321,7.39e-321,7.386e-321,7.38e-321,7.376e-321,7.37e-321,7.367e-321,7.36e-321,7.357e-321,7.35e-321,7.347e-321,7.34e-321,7.337e-321,7.33e-321,7.327e-321,7.32e-321,7.317e-321,7.31e-321,7.307e-321,7.3e-321,7.297e-321,7.29e-321,7.287e-321,7.283e-321,7.28e-321,7.273e-321,7.27e-321,7.263e-321,7.26e-321,7.253e-321,7.25e-321,7.243e-321,7.24e-321,7.233e-321,7.23e-321,7.223e-321,7.22e-321,7.213e-321,7.21e-321,7.203e-321,7.2e-321,7.194e-321,7.19e-321,7.184e-321,7.18e-321,7.174e-321,7.17e-321,7.164e-321,7.16e-321,7.154e-321,7.15e-321,7.144e-321,7.14e-321,7.134e-321,7.13e-321,7.124e-321,7.12e-321,7.115e-321,7.11e-321,7.105e-321,7.1e-321,7.095e-321,7.09e-321,7.085e-321,7.08e-321,7.075e-321,7.07e-321,7.065e-321,7.06e-321,7.055e-321,7.05e-321,7.04e-321,7.035e-321,7.03e-321,7.026e-321,7.02e-321,7.016e-321,7.01e-321,7.006e-321,7.0e-321,6.996e-321,6.99e-321,6.986e-321,6.98e-321,6.976e-321,6.97e-321,6.966e-321,6.96e-321,6.956e-321,6.95e-321,6.947e-321,6.94e-321,6.937e-321,6.93e-321,6.927e-321,6.92e-321,6.917e-321,6.91e-321,6.907e-321,6.9e-321,6.897e-321,6.89e-321,6.887e-321,6.88e-321,6.877e-321,6.87e-321,6.868e-321,6.863e-321,6.86e-321,6.853e-321,6.85e-321,6.843e-321,6.84e-321,6.833e-321,6.83e-321,6.823e-321,6.82e-321,6.813e-321,6.81e-321,6.803e-321,6.8e-321,6.793e-321,6.79e-321,6.784e-321,6.78e-321,6.774e-321,6.77e-321,6.764e-321,6.76e-321,6.754e-321,6.75e-321,6.744e-321,6.74e-321,6.734e-321,6.73e-321,6.724e-321,6.72e-321,6.714e-321,6.71e-321,6.704e-321,6.7e-321,6.695e-321,6.69e-321,6.685e-321,6.68e-321,6.675e-321,6.67e-321,6.665e-321,6.66e-321,6.655e-321,6.65e-321,6.645e-321,6.64e-321,6.635e-321,6.63e-321,6.625e-321,6.62e-321,6.616e-321,6.61e-321,6.606e-321,6.6e-321,6.596e-321,6.586e-321,6.58e-321,6.576e-321,6.57e-321,6.566e-321,6.56e-321,6.556e-321,6.55e-321,6.546e-321,6.54e-321,6.536e-321,6.53e-321,6.527e-321,6.52e-321,6.517e-321,6.51e-321,6.507e-321,6.5e-321,6.497e-321,6.49e-321,6.487e-321,6.48e-321,6.477e-321,6.47e-321,6.467e-321,6.46e-321,6.457e-321,6.452e-321,6.45e-321,6.443e-321,6.44e-321,6.433e-321,6.43e-321,6.423e-321,6.42e-321,6.413e-321,6.41e-321,6.403e-321,6.4e-321,6.393e-321,6.39e-321,6.383e-321,6.38e-321,6.373e-321,6.37e-321,6.364e-321,6.36e-321,6.354e-321,6.35e-321,6.344e-321,6.34e-321,6.334e-321,6.33e-321,6.324e-321,6.32e-321,6.314e-321,6.31e-321,6.304e-321,6.3e-321,6.294e-321,6.29e-321,6.285e-321,6.28e-321,6.275e-321,6.27e-321,6.265e-321,6.26e-321,6.255e-321,6.25e-321,6.245e-321,6.24e-321,6.235e-321,6.23e-321,6.225e-321,6.22e-321,6.215e-321,6.21e-321,6.205e-321,6.2e-321,6.196e-321,6.19e-321,6.186e-321,6.18e-321,6.176e-321,6.17e-321,6.166e-321,6.16e-321,6.156e-321,6.15e-321,6.146e-321,6.14e-321,6.13e-321,6.126e-321,6.12e-321,6.117e-321,6.11e-321,6.107e-321,6.1e-321,6.097e-321,6.09e-321,6.087e-321,6.08e-321,6.077e-321,6.07e-321,6.067e-321,6.06e-321,6.057e-321,6.05e-321,6.047e-321,6.04e-321,6.037e-321,6.033e-321,6.03e-321,6.023e-321,6.02e-321,6.013e-321,6.01e-321,6.003e-321,6.0e-321,5.993e-321,5.99e-321,5.983e-321,5.98e-321,5.973e-321,5.97e-321,5.963e-321,5.96e-321,5.953e-321,5.95e-321,5.944e-321,5.94e-321,5.934e-321,5.93e-321,5.924e-321,5.92e-321,5.914e-321,5.91e-321,5.904e-321,5.9e-321,5.894e-321,5.89e-321,5.884e-321,5.88e-321,5.874e-321,5.87e-321,5.865e-321,5.86e-321,5.855e-321,5.85e-321,5.845e-321,5.84e-321,5.835e-321,5.83e-321,5.825e-321,5.82e-321,5.815e-321,5.81e-321,5.805e-321,5.8e-321,5.795e-321,5.79e-321,5.786e-321,5.78e-321,5.776e-321,5.77e-321,5.766e-321,5.76e-321,5.756e-321,5.75e-321,5.746e-321,5.74e-321,5.736e-321,5.73e-321,5.726e-321,5.72e-321,5.716e-321,5.71e-321,5.706e-321,5.7e-321,5.697e-321,5.69e-321,5.687e-321,5.677e-321,5.67e-321,5.667e-321,5.66e-321,5.657e-321,5.65e-321,5.647e-321,5.64e-321,5.637e-321,5.63e-321,5.627e-321,5.62e-321,5.618e-321,5.613e-321,5.61e-321,5.603e-321,5.6e-321,5.593e-321,5.59e-321,5.583e-321,5.58e-321,5.573e-321,5.57e-321,5.563e-321,5.56e-321,5.553e-321,5.55e-321,5.543e-321,5.54e-321,5.534e-321,5.53e-321,5.524e-321,5.52e-321,5.514e-321,5.51e-321,5.504e-321,5.5e-321,5.494e-321,5.49e-321,5.484e-321,5.48e-321,5.474e-321,5.47e-321,5.464e-321,5.46e-321,5.454e-321,5.45e-321,5.445e-321,5.44e-321,5.435e-321,5.43e-321,5.425e-321,5.42e-321,5.415e-321,5.41e-321,5.405e-321,5.4e-321,5.395e-321,5.39e-321,5.385e-321,5.38e-321,5.375e-321,5.37e-321,5.366e-321,5.36e-321,5.356e-321,5.35e-321,5.346e-321,5.34e-321,5.336e-321,5.33e-321,5.326e-321,5.32e-321,5.316e-321,5.31e-321,5.306e-321,5.3e-321,5.296e-321,5.29e-321,5.287e-321,5.28e-321,5.277e-321,5.27e-321,5.267e-321,5.26e-321,5.257e-321,5.25e-321,5.247e-321,5.24e-321,5.237e-321,5.23e-321,5.22e-321,5.217e-321,5.21e-321,5.207e-321,5.203e-321,5.2e-321,5.193e-321,5.19e-321,5.183e-321,5.18e-321,5.173e-321,5.17e-321,5.163e-321,5.16e-321,5.153e-321,5.15e-321,5.143e-321,5.14e-321,5.133e-321,5.13e-321,5.123e-321,5.12e-321,5.114e-321,5.11e-321,5.104e-321,5.1e-321,5.094e-321,5.09e-321,5.084e-321,5.08e-321,5.074e-321,5.07e-321,5.064e-321,5.06e-321,5.054e-321,5.05e-321,5.044e-321,5.04e-321,5.035e-321,5.03e-321,5.025e-321,5.02e-321,5.015e-321,5.01e-321,5.005e-321,5.0e-321,4.995e-321,4.99e-321,4.985e-321,4.98e-321,4.975e-321,4.97e-321,4.965e-321,4.96e-321,4.955e-321,4.95e-321,4.946e-321,4.94e-321,4.936e-321,4.93e-321,4.926e-321,4.92e-321,4.916e-321,4.91e-321,4.906e-321,4.9e-321,4.896e-321,4.89e-321,4.886e-321,4.88e-321,4.876e-321,4.87e-321,4.867e-321,4.86e-321,4.857e-321,4.85e-321,4.847e-321,4.84e-321,4.837e-321,4.83e-321,4.827e-321,4.82e-321,4.817e-321,4.81e-321,4.807e-321,4.8e-321,4.797e-321,4.79e-321,4.787e-321,4.783e-321,4.78e-321,4.77e-321,4.763e-321,4.76e-321,4.753e-321,4.75e-321,4.743e-321,4.74e-321,4.733e-321,4.73e-321,4.723e-321,4.72e-321,4.713e-321,4.71e-321,4.704e-321,4.7e-321,4.694e-321,4.69e-321,4.684e-321,4.68e-321,4.674e-321,4.67e-321,4.664e-321,4.66e-321,4.654e-321,4.65e-321,4.644e-321,4.64e-321,4.634e-321,4.63e-321,4.624e-321,4.62e-321,4.615e-321,4.61e-321,4.605e-321,4.6e-321,4.595e-321,4.59e-321,4.585e-321,4.58e-321,4.575e-321,4.57e-321,4.565e-321,4.56e-321,4.555e-321,4.55e-321,4.545e-321,4.54e-321,4.536e-321,4.53e-321,4.526e-321,4.52e-321,4.516e-321,4.51e-321,4.506e-321,4.5e-321,4.496e-321,4.49e-321,4.486e-321,4.48e-321,4.476e-321,4.47e-321,4.466e-321,4.46e-321,4.456e-321,4.45e-321,4.447e-321,4.44e-321,4.437e-321,4.43e-321,4.427e-321,4.42e-321,4.417e-321,4.41e-321,4.407e-321,4.4e-321,4.397e-321,4.39e-321,4.387e-321,4.38e-321,4.377e-321,4.372e-321,4.37e-321,4.363e-321,4.36e-321,4.353e-321,4.35e-321,4.343e-321,4.34e-321,4.333e-321,4.33e-321,4.323e-321,4.313e-321,4.31e-321,4.303e-321,4.3e-321,4.293e-321,4.29e-321,4.284e-321,4.28e-321,4.274e-321,4.27e-321,4.264e-321,4.26e-321,4.254e-321,4.25e-321,4.244e-321,4.24e-321,4.234e-321,4.23e-321,4.224e-321,4.22e-321,4.214e-321,4.21e-321,4.204e-321,4.2e-321,4.195e-321,4.19e-321,4.185e-321,4.18e-321,4.175e-321,4.17e-321,4.165e-321,4.16e-321,4.155e-321,4.15e-321,4.145e-321,4.14e-321,4.135e-321,4.13e-321,4.125e-321,4.12e-321,4.116e-321,4.11e-321,4.106e-321,4.1e-321,4.096e-321,4.09e-321,4.086e-321,4.08e-321,4.076e-321,4.07e-321,4.066e-321,4.06e-321,4.056e-321,4.05e-321,4.046e-321,4.04e-321,4.037e-321,4.03e-321,4.027e-321,4.02e-321,4.017e-321,4.01e-321,4.007e-321,4.0e-321,3.997e-321,3.99e-321,3.987e-321,3.98e-321,3.977e-321,3.97e-321,3.967e-321,3.96e-321,3.957e-321,3.953e-321,3.95e-321,3.943e-321,3.94e-321,3.933e-321,3.93e-321,3.923e-321,3.92e-321,3.913e-321,3.91e-321,3.903e-321,3.9e-321,3.893e-321,3.89e-321,3.883e-321,3.88e-321,3.873e-321,3.87e-321,3.86e-321,3.854e-321,3.85e-321,3.844e-321,3.84e-321,3.834e-321,3.83e-321,3.824e-321,3.82e-321,3.814e-321,3.81e-321,3.804e-321,3.8e-321,3.794e-321,3.79e-321,3.785e-321,3.78e-321,3.775e-321,3.77e-321,3.765e-321,3.76e-321,3.755e-321,3.75e-321,3.745e-321,3.74e-321,3.735e-321,3.73e-321,3.725e-321,3.72e-321,3.715e-321,3.71e-321,3.705e-321,3.7e-321,3.696e-321,3.69e-321,3.686e-321,3.68e-321,3.676e-321,3.67e-321,3.666e-321,3.66e-321,3.656e-321,3.65e-321,3.646e-321,3.64e-321,3.636e-321,3.63e-321,3.626e-321,3.62e-321,3.617e-321,3.61e-321,3.607e-321,3.6e-321,3.597e-321,3.59e-321,3.587e-321,3.58e-321,3.577e-321,3.57e-321,3.567e-321,3.56e-321,3.557e-321,3.55e-321,3.547e-321,3.54e-321,3.538e-321,3.533e-321,3.53e-321,3.523e-321,3.52e-321,3.513e-321,3.51e-321,3.503e-321,3.5e-321,3.493e-321,3.49e-321,3.483e-321,3.48e-321,3.473e-321,3.47e-321,3.463e-321,3.46e-321,3.454e-321,3.45e-321,3.444e-321,3.44e-321,3.434e-321,3.43e-321,3.424e-321,3.42e-321,3.414e-321,3.404e-321,3.4e-321,3.394e-321,3.39e-321,3.384e-321,3.38e-321,3.374e-321,3.37e-321,3.365e-321,3.36e-321,3.355e-321,3.35e-321,3.345e-321,3.34e-321,3.335e-321,3.33e-321,3.325e-321,3.32e-321,3.315e-321,3.31e-321,3.305e-321,3.3e-321,3.295e-321,3.29e-321,3.286e-321,3.28e-321,3.276e-321,3.27e-321,3.266e-321,3.26e-321,3.256e-321,3.25e-321,3.246e-321,3.24e-321,3.236e-321,3.23e-321,3.226e-321,3.22e-321,3.216e-321,3.21e-321,3.206e-321,3.2e-321,3.197e-321,3.19e-321,3.187e-321,3.18e-321,3.177e-321,3.17e-321,3.167e-321,3.16e-321,3.157e-321,3.15e-321,3.147e-321,3.14e-321,3.137e-321,3.13e-321,3.127e-321,3.122e-321,3.12e-321,3.113e-321,3.11e-321,3.103e-321,3.1e-321,3.093e-321,3.09e-321,3.083e-321,3.08e-321,3.073e-321,3.07e-321,3.063e-321,3.06e-321,3.053e-321,3.05e-321,3.043e-321,3.04e-321,3.034e-321,3.03e-321,3.024e-321,3.02e-321,3.014e-321,3.01e-321,3.004e-321,3.0e-321,2.994e-321,2.99e-321,2.984e-321,2.98e-321,2.974e-321,2.97e-321,2.964e-321,2.96e-321,2.95e-321,2.945e-321,2.94e-321,2.935e-321,2.93e-321,2.925e-321,2.92e-321,2.915e-321,2.91e-321,2.905e-321,2.9e-321,2.895e-321,2.89e-321,2.885e-321,2.88e-321,2.875e-321,2.87e-321,2.866e-321,2.86e-321,2.856e-321,2.85e-321,2.846e-321,2.84e-321,2.836e-321,2.83e-321,2.826e-321,2.82e-321,2.816e-321,2.81e-321,2.806e-321,2.8e-321,2.796e-321,2.79e-321,2.787e-321,2.78e-321,2.777e-321,2.77e-321,2.767e-321,2.76e-321,2.757e-321,2.75e-321,2.747e-321,2.74e-321,2.737e-321,2.73e-321,2.727e-321,2.72e-321,2.717e-321,2.71e-321,2.707e-321,2.703e-321,2.7e-321,2.693e-321,2.69e-321,2.683e-321,2.68e-321,2.673e-321,2.67e-321,2.663e-321,2.66e-321,2.653e-321,2.65e-321,2.643e-321,2.64e-321,2.633e-321,2.63e-321,2.623e-321,2.62e-321,2.614e-321,2.61e-321,2.604e-321,2.6e-321,2.594e-321,2.59e-321,2.584e-321,2.58e-321,2.574e-321,2.57e-321,2.564e-321,2.56e-321,2.554e-321,2.55e-321,2.544e-321,2.54e-321,2.535e-321,2.53e-321,2.525e-321,2.52e-321,2.515e-321,2.51e-321,2.505e-321,2.495e-321,2.49e-321,2.485e-321,2.48e-321,2.475e-321,2.47e-321,2.465e-321,2.46e-321,2.456e-321,2.45e-321,2.446e-321,2.44e-321,2.436e-321,2.43e-321,2.426e-321,2.42e-321,2.416e-321,2.41e-321,2.406e-321,2.4e-321,2.396e-321,2.39e-321,2.386e-321,2.38e-321,2.376e-321,2.37e-321,2.367e-321,2.36e-321,2.357e-321,2.35e-321,2.347e-321,2.34e-321,2.337e-321,2.33e-321,2.327e-321,2.32e-321,2.317e-321,2.31e-321,2.307e-321,2.3e-321,2.297e-321,2.29e-321,2.288e-321,2.283e-321,2.28e-321,2.273e-321,2.27e-321,2.263e-321,2.26e-321,2.253e-321,2.25e-321,2.243e-321,2.24e-321,2.233e-321,2.23e-321,2.223e-321,2.22e-321,2.213e-321,2.21e-321,2.204e-321,2.2e-321,2.194e-321,2.19e-321,2.184e-321,2.18e-321,2.174e-321,2.17e-321,2.164e-321,2.16e-321,2.154e-321,2.15e-321,2.144e-321,2.14e-321,2.134e-321,2.13e-321,2.124e-321,2.12e-321,2.115e-321,2.11e-321,2.105e-321,2.1e-321,2.095e-321,2.09e-321,2.085e-321,2.08e-321,2.075e-321,2.07e-321,2.065e-321,2.06e-321,2.055e-321,2.05e-321,2.04e-321,2.036e-321,2.03e-321,2.026e-321,2.02e-321,2.016e-321,2.01e-321,2.006e-321,2.0e-321,1.996e-321,1.99e-321,1.986e-321,1.98e-321,1.976e-321,1.97e-321,1.966e-321,1.96e-321,1.956e-321,1.95e-321,1.947e-321,1.94e-321,1.937e-321,1.93e-321,1.927e-321,1.92e-321,1.917e-321,1.91e-321,1.907e-321,1.9e-321,1.897e-321,1.89e-321,1.887e-321,1.88e-321,1.877e-321,1.873e-321,1.87e-321,1.863e-321,1.86e-321,1.853e-321,1.85e-321,1.843e-321,1.84e-321,1.833e-321,1.83e-321,1.823e-321,1.82e-321,1.813e-321,1.81e-321,1.803e-321,1.8e-321,1.793e-321,1.79e-321,1.784e-321,1.78e-321,1.774e-321,1.77e-321,1.764e-321,1.76e-321,1.754e-321,1.75e-321,1.744e-321,1.74e-321,1.734e-321,1.73e-321,1.724e-321,1.72e-321,1.714e-321,1.71e-321,1.705e-321,1.7e-321,1.695e-321,1.69e-321,1.685e-321,1.68e-321,1.675e-321,1.67e-321,1.665e-321,1.66e-321,1.655e-321,1.65e-321,1.645e-321,1.64e-321,1.635e-321,1.63e-321,1.625e-321,1.62e-321,1.616e-321,1.61e-321,1.606e-321,1.6e-321,1.596e-321,1.586e-321,1.58e-321,1.576e-321,1.57e-321,1.566e-321,1.56e-321,1.556e-321,1.55e-321,1.546e-321,1.54e-321,1.537e-321,1.53e-321,1.527e-321,1.52e-321,1.517e-321,1.51e-321,1.507e-321,1.5e-321,1.497e-321,1.49e-321,1.487e-321,1.48e-321,1.477e-321,1.47e-321,1.467e-321,1.46e-321,1.457e-321,1.453e-321,1.45e-321,1.443e-321,1.44e-321,1.433e-321,1.43e-321,1.423e-321,1.42e-321,1.413e-321,1.41e-321,1.403e-321,1.4e-321,1.393e-321,1.39e-321,1.383e-321,1.38e-321,1.374e-321,1.37e-321,1.364e-321,1.36e-321,1.354e-321,1.35e-321,1.344e-321,1.34e-321,1.334e-321,1.33e-321,1.324e-321,1.32e-321,1.314e-321,1.31e-321,1.304e-321,1.3e-321,1.294e-321,1.29e-321,1.285e-321,1.28e-321,1.275e-321,1.27e-321,1.265e-321,1.26e-321,1.255e-321,1.25e-321,1.245e-321,1.24e-321,1.235e-321,1.23e-321,1.225e-321,1.22e-321,1.215e-321,1.21e-321,1.206e-321,1.2e-321,1.196e-321,1.19e-321,1.186e-321,1.18e-321,1.176e-321,1.17e-321,1.166e-321,1.16e-321,1.156e-321,1.15e-321,1.146e-321,1.14e-321,1.13e-321,1.126e-321,1.12e-321,1.117e-321,1.11e-321,1.107e-321,1.1e-321,1.097e-321,1.09e-321,1.087e-321,1.08e-321,1.077e-321,1.07e-321,1.067e-321,1.06e-321,1.057e-321,1.05e-321,1.047e-321,1.042e-321,1.04e-321,1.033e-321,1.03e-321,1.023e-321,1.02e-321,1.013e-321,1.01e-321,1.003e-321,1.0e-321,9.93e-322,9.9e-322,9.83e-322,9.8e-322,9.73e-322,9.7e-322,9.63e-322,9.6e-322,9.54e-322,9.5e-322,9.44e-322,9.4e-322,9.34e-322,9.3e-322,9.24e-322,9.2e-322,9.14e-322,9.1e-322,9.04e-322,9.0e-322,8.94e-322,8.9e-322,8.84e-322,8.8e-322,8.74e-322,8.7e-322,8.65e-322,8.6e-322,8.55e-322,8.5e-322,8.45e-322,8.4e-322,8.35e-322,8.3e-322,8.25e-322,8.2e-322,8.15e-322,8.1e-322,8.05e-322,8.0e-322,7.95e-322,7.9e-322,7.86e-322,7.8e-322,7.76e-322,7.7e-322,7.66e-322,7.6e-322,7.56e-322,7.5e-322,7.46e-322,7.4e-322,7.36e-322,7.3e-322,7.26e-322,7.2e-322,7.16e-322,7.1e-322,7.07e-322,7.0e-322,6.97e-322,6.9e-322,6.87e-322,6.77e-322,6.7e-322,6.67e-322,6.6e-322,6.57e-322,6.5e-322,6.47e-322,6.4e-322,6.37e-322,6.3e-322,6.27e-322,6.23e-322,6.2e-322,6.13e-322,6.1e-322,6.03e-322,6.0e-322,5.93e-322,5.9e-322,5.83e-322,5.8e-322,5.73e-322,5.7e-322,5.63e-322,5.6e-322,5.53e-322,5.5e-322,5.43e-322,5.4e-322,5.34e-322,5.3e-322,5.24e-322,5.2e-322,5.14e-322,5.1e-322,5.04e-322,5.0e-322,4.94e-322,4.9e-322,4.84e-322,4.8e-322,4.74e-322,4.7e-322,4.64e-322,4.6e-322,4.55e-322,4.5e-322,4.45e-322,4.4e-322,4.35e-322,4.3e-322,4.25e-322,4.2e-322,4.15e-322,4.1e-322,4.05e-322,4.0e-322,3.95e-322,3.9e-322,3.85e-322,3.8e-322,3.75e-322,3.7e-322,3.66e-322,3.6e-322,3.56e-322,3.5e-322,3.46e-322,3.4e-322,3.36e-322,3.3e-322,3.26e-322,3.2e-322,3.16e-322,3.1e-322,3.06e-322,3.0e-322,2.96e-322,2.9e-322,2.87e-322,2.8e-322,2.77e-322,2.7e-322,2.67e-322,2.6e-322,2.57e-322,2.5e-322,2.47e-322,2.4e-322,2.37e-322,2.3e-322,2.2e-322,2.17e-322,2.1e-322,2.08e-322,2.03e-322,2.0e-322,1.93e-322,1.9e-322,1.83e-322,1.8e-322,1.73e-322,1.7e-322,1.63e-322,1.6e-322,1.53e-322,1.5e-322,1.43e-322,1.4e-322,1.33e-322,1.3e-322,1.24e-322,1.2e-322,1.14e-322,1.1e-322,1.04e-322,1.0e-322,9.4e-323,9.0e-323,8.4e-323,8.0e-323,7.4e-323,7.0e-323,6.4e-323,6.0e-323,5.4e-323,5.0e-323,4.4e-323,4.0e-323,3.5e-323,3.0e-323,2.5e-323,2.0e-323,1.5e-323,1.0e-323,5.0e-324,0.0],"x":[1.0e-320,9.995e-321,9.99e-321,9.985e-321,9.98e-321,9.975e-321,9.97e-321,9.965e-321,9.96e-321,9.955e-321,9.95e-321,9.946e-321,9.94e-321,9.936e-321,9.93e-321,9.926e-321,9.92e-321,9.916e-321,9.91e-321,9.906e-321,9.9e-321,9.896e-321,9.89e-321,9.886e-321,9.88e-321,9.876e-321,9.87e-321,9.866e-321,9.86e-321,9.857e-321,9.85e-321,9.847e-321,9.84e-321,9.837e-321,9.83e-321,9.827e-321,9.82e-321,9.817e-321,9.81e-321,9.807e-321,9.8e-321,9.797e-321,9.79e-321,9.787e-321,9.782e-321,9.78e-321,9.77e-321,9.763e-321,9.76e-321,9.753e-321,9.75e-321,9.743e-321,9.74e-321,9.733e-321,9.73e-321,9.723e-321,9.72e-321,9.713e-321,9.71e-321,9.703e-321,9.7e-321,9.694e-321,9.69e-321,9.684e-321,9.68e-321,9.674e-321,9.67e-321,9.664e-321,9.66e-321,9.654e-321,9.65e-321,9.644e-321,9.64e-321,9.634e-321,9.63e-321,9.624e-321,9.62e-321,9.615e-321,9.61e-321,9.605e-321,9.6e-321,9.595e-321,9.59e-321,9.585e-321,9.58e-321,9.575e-321,9.57e-321,9.565e-321,9.56e-321,9.555e-321,9.55e-321,9.545e-321,9.54e-321,9.535e-321,9.53e-321,9.526e-321,9.52e-321,9.516e-321,9.51e-321,9.506e-321,9.5e-321,9.496e-321,9.49e-321,9.486e-321,9.48e-321,9.476e-321,9.47e-321,9.466e-321,9.46e-321,9.456e-321,9.45e-321,9.447e-321,9.44e-321,9.437e-321,9.43e-321,9.427e-321,9.42e-321,9.417e-321,9.41e-321,9.407e-321,9.4e-321,9.397e-321,9.39e-321,9.387e-321,9.38e-321,9.377e-321,9.37e-321,9.367e-321,9.363e-321,9.36e-321,9.353e-321,9.35e-321,9.343e-321,9.34e-321,9.333e-321,9.33e-321,9.323e-321,9.313e-321,9.31e-321,9.303e-321,9.3e-321,9.293e-321,9.29e-321,9.283e-321,9.28e-321,9.274e-321,9.27e-321,9.264e-321,9.26e-321,9.254e-321,9.25e-321,9.244e-321,9.24e-321,9.234e-321,9.23e-321,9.224e-321,9.22e-321,9.214e-321,9.21e-321,9.204e-321,9.2e-321,9.195e-321,9.19e-321,9.185e-321,9.18e-321,9.175e-321,9.17e-321,9.165e-321,9.16e-321,9.155e-321,9.15e-321,9.145e-321,9.14e-321,9.135e-321,9.13e-321,9.125e-321,9.12e-321,9.116e-321,9.11e-321,9.106e-321,9.1e-321,9.096e-321,9.09e-321,9.086e-321,9.08e-321,9.076e-321,9.07e-321,9.066e-321,9.06e-321,9.056e-321,9.05e-321,9.046e-321,9.04e-321,9.036e-321,9.03e-321,9.027e-321,9.02e-321,9.017e-321,9.01e-321,9.007e-321,9.0e-321,8.997e-321,8.99e-321,8.987e-321,8.98e-321,8.977e-321,8.97e-321,8.967e-321,8.96e-321,8.957e-321,8.95e-321,8.948e-321,8.943e-321,8.94e-321,8.933e-321,8.93e-321,8.923e-321,8.92e-321,8.913e-321,8.91e-321,8.903e-321,8.9e-321,8.893e-321,8.89e-321,8.883e-321,8.88e-321,8.873e-321,8.87e-321,8.86e-321,8.854e-321,8.85e-321,8.844e-321,8.84e-321,8.834e-321,8.83e-321,8.824e-321,8.82e-321,8.814e-321,8.81e-321,8.804e-321,8.8e-321,8.794e-321,8.79e-321,8.784e-321,8.78e-321,8.775e-321,8.77e-321,8.765e-321,8.76e-321,8.755e-321,8.75e-321,8.745e-321,8.74e-321,8.735e-321,8.73e-321,8.725e-321,8.72e-321,8.715e-321,8.71e-321,8.705e-321,8.7e-321,8.696e-321,8.69e-321,8.686e-321,8.68e-321,8.676e-321,8.67e-321,8.666e-321,8.66e-321,8.656e-321,8.65e-321,8.646e-321,8.64e-321,8.636e-321,8.63e-321,8.626e-321,8.62e-321,8.617e-321,8.61e-321,8.607e-321,8.6e-321,8.597e-321,8.59e-321,8.587e-321,8.58e-321,8.577e-321,8.57e-321,8.567e-321,8.56e-321,8.557e-321,8.55e-321,8.547e-321,8.54e-321,8.537e-321,8.533e-321,8.53e-321,8.523e-321,8.52e-321,8.513e-321,8.51e-321,8.503e-321,8.5e-321,8.493e-321,8.49e-321,8.483e-321,8.48e-321,8.473e-321,8.47e-321,8.463e-321,8.46e-321,8.453e-321,8.45e-321,8.444e-321,8.44e-321,8.434e-321,8.43e-321,8.424e-321,8.42e-321,8.414e-321,8.404e-321,8.4e-321,8.394e-321,8.39e-321,8.384e-321,8.38e-321,8.374e-321,8.37e-321,8.365e-321,8.36e-321,8.355e-321,8.35e-321,8.345e-321,8.34e-321,8.335e-321,8.33e-321,8.325e-321,8.32e-321,8.315e-321,8.31e-321,8.305e-321,8.3e-321,8.295e-321,8.29e-321,8.285e-321,8.28e-321,8.276e-321,8.27e-321,8.266e-321,8.26e-321,8.256e-321,8.25e-321,8.246e-321,8.24e-321,8.236e-321,8.23e-321,8.226e-321,8.22e-321,8.216e-321,8.21e-321,8.206e-321,8.2e-321,8.197e-321,8.19e-321,8.187e-321,8.18e-321,8.177e-321,8.17e-321,8.167e-321,8.16e-321,8.157e-321,8.15e-321,8.147e-321,8.14e-321,8.137e-321,8.13e-321,8.127e-321,8.12e-321,8.117e-321,8.113e-321,8.11e-321,8.103e-321,8.1e-321,8.093e-321,8.09e-321,8.083e-321,8.08e-321,8.073e-321,8.07e-321,8.063e-321,8.06e-321,8.053e-321,8.05e-321,8.043e-321,8.04e-321,8.034e-321,8.03e-321,8.024e-321,8.02e-321,8.014e-321,8.01e-321,8.004e-321,8.0e-321,7.994e-321,7.99e-321,7.984e-321,7.98e-321,7.974e-321,7.97e-321,7.964e-321,7.96e-321,7.95e-321,7.945e-321,7.94e-321,7.935e-321,7.93e-321,7.925e-321,7.92e-321,7.915e-321,7.91e-321,7.905e-321,7.9e-321,7.895e-321,7.89e-321,7.885e-321,7.88e-321,7.875e-321,7.87e-321,7.866e-321,7.86e-321,7.856e-321,7.85e-321,7.846e-321,7.84e-321,7.836e-321,7.83e-321,7.826e-321,7.82e-321,7.816e-321,7.81e-321,7.806e-321,7.8e-321,7.796e-321,7.79e-321,7.786e-321,7.78e-321,7.777e-321,7.77e-321,7.767e-321,7.76e-321,7.757e-321,7.75e-321,7.747e-321,7.74e-321,7.737e-321,7.73e-321,7.727e-321,7.72e-321,7.717e-321,7.71e-321,7.707e-321,7.702e-321,7.7e-321,7.693e-321,7.69e-321,7.683e-321,7.68e-321,7.673e-321,7.67e-321,7.663e-321,7.66e-321,7.653e-321,7.65e-321,7.643e-321,7.64e-321,7.633e-321,7.63e-321,7.623e-321,7.62e-321,7.614e-321,7.61e-321,7.604e-321,7.6e-321,7.594e-321,7.59e-321,7.584e-321,7.58e-321,7.574e-321,7.57e-321,7.564e-321,7.56e-321,7.554e-321,7.55e-321,7.544e-321,7.54e-321,7.535e-321,7.53e-321,7.525e-321,7.52e-321,7.515e-321,7.51e-321,7.505e-321,7.495e-321,7.49e-321,7.485e-321,7.48e-321,7.475e-321,7.47e-321,7.465e-321,7.46e-321,7.455e-321,7.45e-321,7.446e-321,7.44e-321,7.436e-321,7.43e-321,7.426e-321,7.42e-321,7.416e-321,7.41e-321,7.406e-321,7.4e-321,7.396e-321,7.39e-321,7.386e-321,7.38e-321,7.376e-321,7.37e-321,7.367e-321,7.36e-321,7.357e-321,7.35e-321,7.347e-321,7.34e-321,7.337e-321,7.33e-321,7.327e-321,7.32e-321,7.317e-321,7.31e-321,7.307e-321,7.3e-321,7.297e-321,7.29e-321,7.287e-321,7.283e-321,7.28e-321,7.273e-321,7.27e-321,7.263e-321,7.26e-321,7.253e-321,7.25e-321,7.243e-321,7.24e-321,7.233e-321,7.23e-321,7.223e-321,7.22e-321,7.213e-321,7.21e-321,7.203e-321,7.2e-321,7.194e-321,7.19e-321,7.184e-321,7.18e-321,7.174e-321,7.17e-321,7.164e-321,7.16e-321,7.154e-321,7.15e-321,7.144e-321,7.14e-321,7.134e-321,7.13e-321,7.124e-321,7.12e-321,7.115e-321,7.11e-321,7.105e-321,7.1e-321,7.095e-321,7.09e-321,7.085e-321,7.08e-321,7.075e-321,7.07e-321,7.065e-321,7.06e-321,7.055e-321,7.05e-321,7.04e-321,7.035e-321,7.03e-321,7.026e-321,7.02e-321,7.016e-321,7.01e-321,7.006e-321,7.0e-321,6.996e-321,6.99e-321,6.986e-321,6.98e-321,6.976e-321,6.97e-321,6.966e-321,6.96e-321,6.956e-321,6.95e-321,6.947e-321,6.94e-321,6.937e-321,6.93e-321,6.927e-321,6.92e-321,6.917e-321,6.91e-321,6.907e-321,6.9e-321,6.897e-321,6.89e-321,6.887e-321,6.88e-321,6.877e-321,6.87e-321,6.868e-321,6.863e-321,6.86e-321,6.853e-321,6.85e-321,6.843e-321,6.84e-321,6.833e-321,6.83e-321,6.823e-321,6.82e-321,6.813e-321,6.81e-321,6.803e-321,6.8e-321,6.793e-321,6.79e-321,6.784e-321,6.78e-321,6.774e-321,6.77e-321,6.764e-321,6.76e-321,6.754e-321,6.75e-321,6.744e-321,6.74e-321,6.734e-321,6.73e-321,6.724e-321,6.72e-321,6.714e-321,6.71e-321,6.704e-321,6.7e-321,6.695e-321,6.69e-321,6.685e-321,6.68e-321,6.675e-321,6.67e-321,6.665e-321,6.66e-321,6.655e-321,6.65e-321,6.645e-321,6.64e-321,6.635e-321,6.63e-321,6.625e-321,6.62e-321,6.616e-321,6.61e-321,6.606e-321,6.6e-321,6.596e-321,6.586e-321,6.58e-321,6.576e-321,6.57e-321,6.566e-321,6.56e-321,6.556e-321,6.55e-321,6.546e-321,6.54e-321,6.536e-321,6.53e-321,6.527e-321,6.52e-321,6.517e-321,6.51e-321,6.507e-321,6.5e-321,6.497e-321,6.49e-321,6.487e-321,6.48e-321,6.477e-321,6.47e-321,6.467e-321,6.46e-321,6.457e-321,6.452e-321,6.45e-321,6.443e-321,6.44e-321,6.433e-321,6.43e-321,6.423e-321,6.42e-321,6.413e-321,6.41e-321,6.403e-321,6.4e-321,6.393e-321,6.39e-321,6.383e-321,6.38e-321,6.373e-321,6.37e-321,6.364e-321,6.36e-321,6.354e-321,6.35e-321,6.344e-321,6.34e-321,6.334e-321,6.33e-321,6.324e-321,6.32e-321,6.314e-321,6.31e-321,6.304e-321,6.3e-321,6.294e-321,6.29e-321,6.285e-321,6.28e-321,6.275e-321,6.27e-321,6.265e-321,6.26e-321,6.255e-321,6.25e-321,6.245e-321,6.24e-321,6.235e-321,6.23e-321,6.225e-321,6.22e-321,6.215e-321,6.21e-321,6.205e-321,6.2e-321,6.196e-321,6.19e-321,6.186e-321,6.18e-321,6.176e-321,6.17e-321,6.166e-321,6.16e-321,6.156e-321,6.15e-321,6.146e-321,6.14e-321,6.13e-321,6.126e-321,6.12e-321,6.117e-321,6.11e-321,6.107e-321,6.1e-321,6.097e-321,6.09e-321,6.087e-321,6.08e-321,6.077e-321,6.07e-321,6.067e-321,6.06e-321,6.057e-321,6.05e-321,6.047e-321,6.04e-321,6.037e-321,6.033e-321,6.03e-321,6.023e-321,6.02e-321,6.013e-321,6.01e-321,6.003e-321,6.0e-321,5.993e-321,5.99e-321,5.983e-321,5.98e-321,5.973e-321,5.97e-321,5.963e-321,5.96e-321,5.953e-321,5.95e-321,5.944e-321,5.94e-321,5.934e-321,5.93e-321,5.924e-321,5.92e-321,5.914e-321,5.91e-321,5.904e-321,5.9e-321,5.894e-321,5.89e-321,5.884e-321,5.88e-321,5.874e-321,5.87e-321,5.865e-321,5.86e-321,5.855e-321,5.85e-321,5.845e-321,5.84e-321,5.835e-321,5.83e-321,5.825e-321,5.82e-321,5.815e-321,5.81e-321,5.805e-321,5.8e-321,5.795e-321,5.79e-321,5.786e-321,5.78e-321,5.776e-321,5.77e-321,5.766e-321,5.76e-321,5.756e-321,5.75e-321,5.746e-321,5.74e-321,5.736e-321,5.73e-321,5.726e-321,5.72e-321,5.716e-321,5.71e-321,5.706e-321,5.7e-321,5.697e-321,5.69e-321,5.687e-321,5.677e-321,5.67e-321,5.667e-321,5.66e-321,5.657e-321,5.65e-321,5.647e-321,5.64e-321,5.637e-321,5.63e-321,5.627e-321,5.62e-321,5.618e-321,5.613e-321,5.61e-321,5.603e-321,5.6e-321,5.593e-321,5.59e-321,5.583e-321,5.58e-321,5.573e-321,5.57e-321,5.563e-321,5.56e-321,5.553e-321,5.55e-321,5.543e-321,5.54e-321,5.534e-321,5.53e-321,5.524e-321,5.52e-321,5.514e-321,5.51e-321,5.504e-321,5.5e-321,5.494e-321,5.49e-321,5.484e-321,5.48e-321,5.474e-321,5.47e-321,5.464e-321,5.46e-321,5.454e-321,5.45e-321,5.445e-321,5.44e-321,5.435e-321,5.43e-321,5.425e-321,5.42e-321,5.415e-321,5.41e-321,5.405e-321,5.4e-321,5.395e-321,5.39e-321,5.385e-321,5.38e-321,5.375e-321,5.37e-321,5.366e-321,5.36e-321,5.356e-321,5.35e-321,5.346e-321,5.34e-321,5.336e-321,5.33e-321,5.326e-321,5.32e-321,5.316e-321,5.31e-321,5.306e-321,5.3e-321,5.296e-321,5.29e-321,5.287e-321,5.28e-321,5.277e-321,5.27e-321,5.267e-321,5.26e-321,5.257e-321,5.25e-321,5.247e-321,5.24e-321,5.237e-321,5.23e-321,5.22e-321,5.217e-321,5.21e-321,5.207e-321,5.203e-321,5.2e-321,5.193e-321,5.19e-321,5.183e-321,5.18e-321,5.173e-321,5.17e-321,5.163e-321,5.16e-321,5.153e-321,5.15e-321,5.143e-321,5.14e-321,5.133e-321,5.13e-321,5.123e-321,5.12e-321,5.114e-321,5.11e-321,5.104e-321,5.1e-321,5.094e-321,5.09e-321,5.084e-321,5.08e-321,5.074e-321,5.07e-321,5.064e-321,5.06e-321,5.054e-321,5.05e-321,5.044e-321,5.04e-321,5.035e-321,5.03e-321,5.025e-321,5.02e-321,5.015e-321,5.01e-321,5.005e-321,5.0e-321,4.995e-321,4.99e-321,4.985e-321,4.98e-321,4.975e-321,4.97e-321,4.965e-321,4.96e-321,4.955e-321,4.95e-321,4.946e-321,4.94e-321,4.936e-321,4.93e-321,4.926e-321,4.92e-321,4.916e-321,4.91e-321,4.906e-321,4.9e-321,4.896e-321,4.89e-321,4.886e-321,4.88e-321,4.876e-321,4.87e-321,4.867e-321,4.86e-321,4.857e-321,4.85e-321,4.847e-321,4.84e-321,4.837e-321,4.83e-321,4.827e-321,4.82e-321,4.817e-321,4.81e-321,4.807e-321,4.8e-321,4.797e-321,4.79e-321,4.787e-321,4.783e-321,4.78e-321,4.77e-321,4.763e-321,4.76e-321,4.753e-321,4.75e-321,4.743e-321,4.74e-321,4.733e-321,4.73e-321,4.723e-321,4.72e-321,4.713e-321,4.71e-321,4.704e-321,4.7e-321,4.694e-321,4.69e-321,4.684e-321,4.68e-321,4.674e-321,4.67e-321,4.664e-321,4.66e-321,4.654e-321,4.65e-321,4.644e-321,4.64e-321,4.634e-321,4.63e-321,4.624e-321,4.62e-321,4.615e-321,4.61e-321,4.605e-321,4.6e-321,4.595e-321,4.59e-321,4.585e-321,4.58e-321,4.575e-321,4.57e-321,4.565e-321,4.56e-321,4.555e-321,4.55e-321,4.545e-321,4.54e-321,4.536e-321,4.53e-321,4.526e-321,4.52e-321,4.516e-321,4.51e-321,4.506e-321,4.5e-321,4.496e-321,4.49e-321,4.486e-321,4.48e-321,4.476e-321,4.47e-321,4.466e-321,4.46e-321,4.456e-321,4.45e-321,4.447e-321,4.44e-321,4.437e-321,4.43e-321,4.427e-321,4.42e-321,4.417e-321,4.41e-321,4.407e-321,4.4e-321,4.397e-321,4.39e-321,4.387e-321,4.38e-321,4.377e-321,4.372e-321,4.37e-321,4.363e-321,4.36e-321,4.353e-321,4.35e-321,4.343e-321,4.34e-321,4.333e-321,4.33e-321,4.323e-321,4.313e-321,4.31e-321,4.303e-321,4.3e-321,4.293e-321,4.29e-321,4.284e-321,4.28e-321,4.274e-321,4.27e-321,4.264e-321,4.26e-321,4.254e-321,4.25e-321,4.244e-321,4.24e-321,4.234e-321,4.23e-321,4.224e-321,4.22e-321,4.214e-321,4.21e-321,4.204e-321,4.2e-321,4.195e-321,4.19e-321,4.185e-321,4.18e-321,4.175e-321,4.17e-321,4.165e-321,4.16e-321,4.155e-321,4.15e-321,4.145e-321,4.14e-321,4.135e-321,4.13e-321,4.125e-321,4.12e-321,4.116e-321,4.11e-321,4.106e-321,4.1e-321,4.096e-321,4.09e-321,4.086e-321,4.08e-321,4.076e-321,4.07e-321,4.066e-321,4.06e-321,4.056e-321,4.05e-321,4.046e-321,4.04e-321,4.037e-321,4.03e-321,4.027e-321,4.02e-321,4.017e-321,4.01e-321,4.007e-321,4.0e-321,3.997e-321,3.99e-321,3.987e-321,3.98e-321,3.977e-321,3.97e-321,3.967e-321,3.96e-321,3.957e-321,3.953e-321,3.95e-321,3.943e-321,3.94e-321,3.933e-321,3.93e-321,3.923e-321,3.92e-321,3.913e-321,3.91e-321,3.903e-321,3.9e-321,3.893e-321,3.89e-321,3.883e-321,3.88e-321,3.873e-321,3.87e-321,3.86e-321,3.854e-321,3.85e-321,3.844e-321,3.84e-321,3.834e-321,3.83e-321,3.824e-321,3.82e-321,3.814e-321,3.81e-321,3.804e-321,3.8e-321,3.794e-321,3.79e-321,3.785e-321,3.78e-321,3.775e-321,3.77e-321,3.765e-321,3.76e-321,3.755e-321,3.75e-321,3.745e-321,3.74e-321,3.735e-321,3.73e-321,3.725e-321,3.72e-321,3.715e-321,3.71e-321,3.705e-321,3.7e-321,3.696e-321,3.69e-321,3.686e-321,3.68e-321,3.676e-321,3.67e-321,3.666e-321,3.66e-321,3.656e-321,3.65e-321,3.646e-321,3.64e-321,3.636e-321,3.63e-321,3.626e-321,3.62e-321,3.617e-321,3.61e-321,3.607e-321,3.6e-321,3.597e-321,3.59e-321,3.587e-321,3.58e-321,3.577e-321,3.57e-321,3.567e-321,3.56e-321,3.557e-321,3.55e-321,3.547e-321,3.54e-321,3.538e-321,3.533e-321,3.53e-321,3.523e-321,3.52e-321,3.513e-321,3.51e-321,3.503e-321,3.5e-321,3.493e-321,3.49e-321,3.483e-321,3.48e-321,3.473e-321,3.47e-321,3.463e-321,3.46e-321,3.454e-321,3.45e-321,3.444e-321,3.44e-321,3.434e-321,3.43e-321,3.424e-321,3.42e-321,3.414e-321,3.404e-321,3.4e-321,3.394e-321,3.39e-321,3.384e-321,3.38e-321,3.374e-321,3.37e-321,3.365e-321,3.36e-321,3.355e-321,3.35e-321,3.345e-321,3.34e-321,3.335e-321,3.33e-321,3.325e-321,3.32e-321,3.315e-321,3.31e-321,3.305e-321,3.3e-321,3.295e-321,3.29e-321,3.286e-321,3.28e-321,3.276e-321,3.27e-321,3.266e-321,3.26e-321,3.256e-321,3.25e-321,3.246e-321,3.24e-321,3.236e-321,3.23e-321,3.226e-321,3.22e-321,3.216e-321,3.21e-321,3.206e-321,3.2e-321,3.197e-321,3.19e-321,3.187e-321,3.18e-321,3.177e-321,3.17e-321,3.167e-321,3.16e-321,3.157e-321,3.15e-321,3.147e-321,3.14e-321,3.137e-321,3.13e-321,3.127e-321,3.122e-321,3.12e-321,3.113e-321,3.11e-321,3.103e-321,3.1e-321,3.093e-321,3.09e-321,3.083e-321,3.08e-321,3.073e-321,3.07e-321,3.063e-321,3.06e-321,3.053e-321,3.05e-321,3.043e-321,3.04e-321,3.034e-321,3.03e-321,3.024e-321,3.02e-321,3.014e-321,3.01e-321,3.004e-321,3.0e-321,2.994e-321,2.99e-321,2.984e-321,2.98e-321,2.974e-321,2.97e-321,2.964e-321,2.96e-321,2.95e-321,2.945e-321,2.94e-321,2.935e-321,2.93e-321,2.925e-321,2.92e-321,2.915e-321,2.91e-321,2.905e-321,2.9e-321,2.895e-321,2.89e-321,2.885e-321,2.88e-321,2.875e-321,2.87e-321,2.866e-321,2.86e-321,2.856e-321,2.85e-321,2.846e-321,2.84e-321,2.836e-321,2.83e-321,2.826e-321,2.82e-321,2.816e-321,2.81e-321,2.806e-321,2.8e-321,2.796e-321,2.79e-321,2.787e-321,2.78e-321,2.777e-321,2.77e-321,2.767e-321,2.76e-321,2.757e-321,2.75e-321,2.747e-321,2.74e-321,2.737e-321,2.73e-321,2.727e-321,2.72e-321,2.717e-321,2.71e-321,2.707e-321,2.703e-321,2.7e-321,2.693e-321,2.69e-321,2.683e-321,2.68e-321,2.673e-321,2.67e-321,2.663e-321,2.66e-321,2.653e-321,2.65e-321,2.643e-321,2.64e-321,2.633e-321,2.63e-321,2.623e-321,2.62e-321,2.614e-321,2.61e-321,2.604e-321,2.6e-321,2.594e-321,2.59e-321,2.584e-321,2.58e-321,2.574e-321,2.57e-321,2.564e-321,2.56e-321,2.554e-321,2.55e-321,2.544e-321,2.54e-321,2.535e-321,2.53e-321,2.525e-321,2.52e-321,2.515e-321,2.51e-321,2.505e-321,2.495e-321,2.49e-321,2.485e-321,2.48e-321,2.475e-321,2.47e-321,2.465e-321,2.46e-321,2.456e-321,2.45e-321,2.446e-321,2.44e-321,2.436e-321,2.43e-321,2.426e-321,2.42e-321,2.416e-321,2.41e-321,2.406e-321,2.4e-321,2.396e-321,2.39e-321,2.386e-321,2.38e-321,2.376e-321,2.37e-321,2.367e-321,2.36e-321,2.357e-321,2.35e-321,2.347e-321,2.34e-321,2.337e-321,2.33e-321,2.327e-321,2.32e-321,2.317e-321,2.31e-321,2.307e-321,2.3e-321,2.297e-321,2.29e-321,2.288e-321,2.283e-321,2.28e-321,2.273e-321,2.27e-321,2.263e-321,2.26e-321,2.253e-321,2.25e-321,2.243e-321,2.24e-321,2.233e-321,2.23e-321,2.223e-321,2.22e-321,2.213e-321,2.21e-321,2.204e-321,2.2e-321,2.194e-321,2.19e-321,2.184e-321,2.18e-321,2.174e-321,2.17e-321,2.164e-321,2.16e-321,2.154e-321,2.15e-321,2.144e-321,2.14e-321,2.134e-321,2.13e-321,2.124e-321,2.12e-321,2.115e-321,2.11e-321,2.105e-321,2.1e-321,2.095e-321,2.09e-321,2.085e-321,2.08e-321,2.075e-321,2.07e-321,2.065e-321,2.06e-321,2.055e-321,2.05e-321,2.04e-321,2.036e-321,2.03e-321,2.026e-321,2.02e-321,2.016e-321,2.01e-321,2.006e-321,2.0e-321,1.996e-321,1.99e-321,1.986e-321,1.98e-321,1.976e-321,1.97e-321,1.966e-321,1.96e-321,1.956e-321,1.95e-321,1.947e-321,1.94e-321,1.937e-321,1.93e-321,1.927e-321,1.92e-321,1.917e-321,1.91e-321,1.907e-321,1.9e-321,1.897e-321,1.89e-321,1.887e-321,1.88e-321,1.877e-321,1.873e-321,1.87e-321,1.863e-321,1.86e-321,1.853e-321,1.85e-321,1.843e-321,1.84e-321,1.833e-321,1.83e-321,1.823e-321,1.82e-321,1.813e-321,1.81e-321,1.803e-321,1.8e-321,1.793e-321,1.79e-321,1.784e-321,1.78e-321,1.774e-321,1.77e-321,1.764e-321,1.76e-321,1.754e-321,1.75e-321,1.744e-321,1.74e-321,1.734e-321,1.73e-321,1.724e-321,1.72e-321,1.714e-321,1.71e-321,1.705e-321,1.7e-321,1.695e-321,1.69e-321,1.685e-321,1.68e-321,1.675e-321,1.67e-321,1.665e-321,1.66e-321,1.655e-321,1.65e-321,1.645e-321,1.64e-321,1.635e-321,1.63e-321,1.625e-321,1.62e-321,1.616e-321,1.61e-321,1.606e-321,1.6e-321,1.596e-321,1.586e-321,1.58e-321,1.576e-321,1.57e-321,1.566e-321,1.56e-321,1.556e-321,1.55e-321,1.546e-321,1.54e-321,1.537e-321,1.53e-321,1.527e-321,1.52e-321,1.517e-321,1.51e-321,1.507e-321,1.5e-321,1.497e-321,1.49e-321,1.487e-321,1.48e-321,1.477e-321,1.47e-321,1.467e-321,1.46e-321,1.457e-321,1.453e-321,1.45e-321,1.443e-321,1.44e-321,1.433e-321,1.43e-321,1.423e-321,1.42e-321,1.413e-321,1.41e-321,1.403e-321,1.4e-321,1.393e-321,1.39e-321,1.383e-321,1.38e-321,1.374e-321,1.37e-321,1.364e-321,1.36e-321,1.354e-321,1.35e-321,1.344e-321,1.34e-321,1.334e-321,1.33e-321,1.324e-321,1.32e-321,1.314e-321,1.31e-321,1.304e-321,1.3e-321,1.294e-321,1.29e-321,1.285e-321,1.28e-321,1.275e-321,1.27e-321,1.265e-321,1.26e-321,1.255e-321,1.25e-321,1.245e-321,1.24e-321,1.235e-321,1.23e-321,1.225e-321,1.22e-321,1.215e-321,1.21e-321,1.206e-321,1.2e-321,1.196e-321,1.19e-321,1.186e-321,1.18e-321,1.176e-321,1.17e-321,1.166e-321,1.16e-321,1.156e-321,1.15e-321,1.146e-321,1.14e-321,1.13e-321,1.126e-321,1.12e-321,1.117e-321,1.11e-321,1.107e-321,1.1e-321,1.097e-321,1.09e-321,1.087e-321,1.08e-321,1.077e-321,1.07e-321,1.067e-321,1.06e-321,1.057e-321,1.05e-321,1.047e-321,1.042e-321,1.04e-321,1.033e-321,1.03e-321,1.023e-321,1.02e-321,1.013e-321,1.01e-321,1.003e-321,1.0e-321,9.93e-322,9.9e-322,9.83e-322,9.8e-322,9.73e-322,9.7e-322,9.63e-322,9.6e-322,9.54e-322,9.5e-322,9.44e-322,9.4e-322,9.34e-322,9.3e-322,9.24e-322,9.2e-322,9.14e-322,9.1e-322,9.04e-322,9.0e-322,8.94e-322,8.9e-322,8.84e-322,8.8e-322,8.74e-322,8.7e-322,8.65e-322,8.6e-322,8.55e-322,8.5e-322,8.45e-322,8.4e-322,8.35e-322,8.3e-322,8.25e-322,8.2e-322,8.15e-322,8.1e-322,8.05e-322,8.0e-322,7.95e-322,7.9e-322,7.86e-322,7.8e-322,7.76e-322,7.7e-322,7.66e-322,7.6e-322,7.56e-322,7.5e-322,7.46e-322,7.4e-322,7.36e-322,7.3e-322,7.26e-322,7.2e-322,7.16e-322,7.1e-322,7.07e-322,7.0e-322,6.97e-322,6.9e-322,6.87e-322,6.77e-322,6.7e-322,6.67e-322,6.6e-322,6.57e-322,6.5e-322,6.47e-322,6.4e-322,6.37e-322,6.3e-322,6.27e-322,6.23e-322,6.2e-322,6.13e-322,6.1e-322,6.03e-322,6.0e-322,5.93e-322,5.9e-322,5.83e-322,5.8e-322,5.73e-322,5.7e-322,5.63e-322,5.6e-322,5.53e-322,5.5e-322,5.43e-322,5.4e-322,5.34e-322,5.3e-322,5.24e-322,5.2e-322,5.14e-322,5.1e-322,5.04e-322,5.0e-322,4.94e-322,4.9e-322,4.84e-322,4.8e-322,4.74e-322,4.7e-322,4.64e-322,4.6e-322,4.55e-322,4.5e-322,4.45e-322,4.4e-322,4.35e-322,4.3e-322,4.25e-322,4.2e-322,4.15e-322,4.1e-322,4.05e-322,4.0e-322,3.95e-322,3.9e-322,3.85e-322,3.8e-322,3.75e-322,3.7e-322,3.66e-322,3.6e-322,3.56e-322,3.5e-322,3.46e-322,3.4e-322,3.36e-322,3.3e-322,3.26e-322,3.2e-322,3.16e-322,3.1e-322,3.06e-322,3.0e-322,2.96e-322,2.9e-322,2.87e-322,2.8e-322,2.77e-322,2.7e-322,2.67e-322,2.6e-322,2.57e-322,2.5e-322,2.47e-322,2.4e-322,2.37e-322,2.3e-322,2.2e-322,2.17e-322,2.1e-322,2.08e-322,2.03e-322,2.0e-322,1.93e-322,1.9e-322,1.83e-322,1.8e-322,1.73e-322,1.7e-322,1.63e-322,1.6e-322,1.53e-322,1.5e-322,1.43e-322,1.4e-322,1.33e-322,1.3e-322,1.24e-322,1.2e-322,1.14e-322,1.1e-322,1.04e-322,1.0e-322,9.4e-323,9.0e-323,8.4e-323,8.0e-323,7.4e-323,7.0e-323,6.4e-323,6.0e-323,5.4e-323,5.0e-323,4.4e-323,4.0e-323,3.5e-323,3.0e-323,2.5e-323,2.0e-323,1.5e-323,1.0e-323,5.0e-324,0.0]}
},{}],79:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var abs = require( '@stdlib/math/base/special/abs' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var EPS = require( '@stdlib/constants/math/float64-eps' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var randu = require( '@stdlib/random/base/randu' );
var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
var isPositiveZero = require( '@stdlib/math/base/assert/is-positive-zero' );
var atanh = require( './../lib' );


// FIXTURES //

var negative = require( './fixtures/julia/negative.json' );
var positive = require( './fixtures/julia/positive.json' );
var smallNegative = require( './fixtures/julia/small_negative.json' );
var smallPositive = require( './fixtures/julia/small_positive.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof atanh, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function computes the hyperbolic arctangent (negative values)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = negative.x;
	expected = negative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = atanh( x[i] );
		if ( y === expected[ i ] ) {
			t.strictEqual( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic arctangent (positive values)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = positive.x;
	expected = positive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = atanh( x[i] );
		if ( y === expected[ i ] ) {
			t.strictEqual( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic arctangent (small negative)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = smallNegative.x;
	expected = smallNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = atanh( x[i] );
		if ( y === expected[ i ] ) {
			t.strictEqual( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic arctangent (small positive)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = smallPositive.x;
	expected = smallPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = atanh( x[i] );
		if ( y === expected[ i ] ) {
			t.strictEqual( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function returns `+Infinity` if provided `1.0`', function test( t ) {
	var v = atanh( 1.0 );
	t.strictEqual( v, PINF, 'returns +Infinity' );
	t.end();
});

tape( 'the function returns `-Infinity` if provided `-1.0`', function test( t ) {
	var v = atanh( -1.0 );
	t.strictEqual( v, NINF, 'returns -Infinity' );
	t.end();
});

tape( 'the function returns `NaN` if provided a value less than `-1`', function test( t ) {
	var v;
	var i;

	for ( i = 0; i < 1e3; i++ ) {
		v = -(randu()*1.0e6) - (1.0+EPS);
		t.strictEqual( isnan( atanh( v ) ), true, 'returns NaN when provided '+v );
	}
	t.end();
});

tape( 'the function returns `NaN` if provided a value greater than `1`', function test( t ) {
	var v;
	var i;

	for ( i = 0; i < 1e3; i++ ) {
		v = (randu()*1.0e6) + 1.0 + EPS;
		t.strictEqual( isnan( atanh( v ) ), true, 'returns NaN when provided '+v );
	}
	t.end();
});

tape( 'the function returns `-0` if provided `-0`', function test( t ) {
	var v = atanh( -0.0 );
	t.strictEqual( isNegativeZero( v ), true, 'returns -0' );
	t.end();
});

tape( 'the function returns `+0` if provided `+0`', function test( t ) {
	var v = atanh( 0.0 );
	t.strictEqual( isPositiveZero( v ), true, 'returns 0' );
	t.end();
});

tape( 'the function returns `NaN` if provided `NaN`', function test( t ) {
	var v = atanh( NaN );
	t.strictEqual( isnan( v ), true, 'returns NaN' );
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/special/atanh/test/test.js")
},{"./../lib":74,"./fixtures/julia/negative.json":75,"./fixtures/julia/positive.json":76,"./fixtures/julia/small_negative.json":77,"./fixtures/julia/small_positive.json":78,"@stdlib/constants/math/float64-eps":55,"@stdlib/constants/math/float64-ninf":57,"@stdlib/constants/math/float64-pinf":58,"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/assert/is-negative-zero":67,"@stdlib/math/base/assert/is-positive-zero":69,"@stdlib/math/base/special/abs":72,"@stdlib/random/base/randu":102,"tape":202}],80:[function(require,module,exports){
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

},{}],81:[function(require,module,exports){
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

},{"./floor.js":80}],82:[function(require,module,exports){
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
* // returns -Infinity
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

},{"./log1p.js":83}],83:[function(require,module,exports){
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

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var highWord = require( '@stdlib/number/float64/base/get-high-word' );
var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var BIAS = require( '@stdlib/constants/math/float64-exponent-bias' );
var polyval = require( './polyval_lp.js' );


// VARIABLES //

// High and low words of ln(2):
var LN2_HI = 6.93147180369123816490e-01; // 0x3fe62e42 0xfee00000
var LN2_LO = 1.90821492927058770002e-10; // 0x3dea39ef 0x35793c76

// sqrt(2)-1:
var SQRT2M1 = 4.142135623730950488017e-01; // 0x3fda8279 0x99fcef34

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


// MAIN //

/**
* Evaluates the natural logarithm of \\(1+x\\).
*
* ## Method
*
* 1.  Argument Reduction: find \\(k\\) and \\(f\\) such that
*
*     ```tex
*     1+x = 2^k (1+f)
*     ```
*
*     where
*
*     ```tex
*     \frac{\sqrt{2}}{2} < 1+f < \sqrt{2}
*     ```
*
*     <!-- <note> -->
*
*     If \\(k=0\\), then \\(f=x\\) is exact. However, if \\(k \neq 0\\), then \\(f\\) may not be representable exactly. In that case, a correction term is needed. Let
*
*     ```tex
*     u = \operatorname{round}(1+x)
*     ```
*
*     and
*
*     ```tex
*     c = (1+x) - u
*     ```
*
*     then
*
*     ```tex
*     \ln (1+x) - \ln u \approx \frac{c}{u}
*     ```
*
*     We can thus proceed to compute \\(\ln(u)\\), and add back the correction term \\(c/u\\).
*
*     <!-- </note> -->
*
*     <!-- <note> -->
*
*     When \\(x > 2^{53}\\), one can simply return \\(\ln(x)\\).
*
*     <!-- </note> -->
*
* 2.  Approximation of \\(\operatorname{log1p}(f)\\). Let
*
*     ```tex
*     s = \frac{f}{2+f}
*     ```
*
*     based on
*
*     ```tex
*     \begin{align*}
*     \ln 1+f &= \ln (1+s) - \ln (1-s) \\
*             &= 2s + \frac{2}{3} s^3 + \frac{2}{5} s^5 + ... \\
*             &= 2s + sR \\
*     \end{align*}
*     ```
*
*     We use a special Reme algorithm on \\(\[0,0.1716\]\\) to generate a polynomial of degree \\(14\\) to approximate \\(R\\). The maximum error of this polynomial approximation is bounded by \\(2^{-58.45}\\). In other words,
*
*     ```tex
*     R(z) \approx \mathrm{Lp}_1 s^2 + \mathrm{Lp}_2 s^4 + \mathrm{Lp}_3 s^6 + \mathrm{Lp}_4 s^8 + \mathrm{Lp}_5 s^{10} + \mathrm{Lp}_6 s^{12} + \mathrm{Lp}_7 s^{14}
*     ```
*
*     and
*
*     ```tex
*     | \mathrm{Lp}_1 s^2 + \ldots + \mathrm{Lp}_7 s^14 - R(z) | \leq 2^{-58.45}
*     ```
*
*     <!-- <note> -->
*
*     The values of \\(Lp1\\) to \\(Lp7\\) may be found in the source.
*
*     <!-- </note> -->
*
*     Note that
*
*     ```tex
*     \begin{align*}
*     2s &= f - sf \\
*        &= f - \frac{f^2}{2} + s \frac{f^2}{2} \\
*     \end{align*}
*     ```
*
*     In order to guarantee error in \\(\ln\\) below \\(1\ \mathrm{ulp}\\), we compute the log by
*
*     ```tex
*     \operatorname{log1p}(f) = f - \biggl(\frac{f^2}{2} - s\biggl(\frac{f^2}{2}+R\biggr)\biggr)
*     ```
*
* 3.  Finally,
*
*     ```tex
*     \begin{align*}
*     \operatorname{log1p}(x) &= k \cdot \mathrm{ln2} + \operatorname{log1p}(f) \\
*     &= k \cdot \mathrm{ln2}_{hi}+\biggl(f-\biggl(\frac{f^2}{2}-\biggl(s\biggl(\frac{f^2}{2}+R\biggr)+k \cdot \mathrm{ln2}_{lo}\biggr)\biggr)\biggr) \\
*     \end{align*}
*     ```
*
*     Here \\(\mathrm{ln2}\\) is split into two floating point numbers:
*
*     ```tex
*     \mathrm{ln2}_{hi} + \mathrm{ln2}_{lo}
*     ```
*
*     where \\(n \cdot \mathrm{ln2}_{hi}\\) is always exact for \\(|n| < 2000\\).
*
*
* ## Special Cases
*
* -   \\(\operatorname{log1p}(x) = \mathrm{NaN}\\) with signal if \\(x < -1\\) (including \\(-\infty\\))
* -   \\(\operatorname{log1p}(+\infty) = +\infty\\)
* -   \\(\operatorname{log1p}(-1) = -\infty\\) with signal
* -   \\(\operatorname{log1p}(\mathrm{NaN})= \mathrm{NaN}\\) with no signal
*
*
* ## Notes
*
* -   According to an error analysis, the error is always less than \\(1\\) ulp (unit in the last place).
*
* -   The hexadecimal values are the intended ones for the used constants. The decimal values may be used, provided that the compiler will convert from decimal to binary accurately enough to produce the hexadecimal values shown.
*
* -   Assuming \\(\ln(x)\\) is accurate, the following algorithm can be used to evaluate \\(\operatorname{log1p}(x)\\) to within a few ULP:
*
*     ```javascript
*     var u = 1.0 + x;
*     if ( u === 1.0 ) {
*         return x;
*     } else {
*         return ln(u) * (x/(u-1.0));
*     }
*     ```
*
*     See HP-15C Advanced Functions Handbook, p.193.
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
* // returns -Infinity
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
}


// EXPORTS //

module.exports = log1p;

},{"./polyval_lp.js":84,"@stdlib/constants/math/float64-exponent-bias":56,"@stdlib/constants/math/float64-ninf":57,"@stdlib/constants/math/float64-pinf":58,"@stdlib/math/base/assert/is-nan":65,"@stdlib/number/float64/base/get-high-word":86,"@stdlib/number/float64/base/set-high-word":89}],84:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return 0.6666666666666735;
	}
	return 0.6666666666666735 + (x * (0.3999999999940942 + (x * (0.2857142874366239 + (x * (0.22222198432149784 + (x * (0.1818357216161805 + (x * (0.15313837699209373 + (x * 0.14798198605116586))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],85:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":29}],86:[function(require,module,exports){
'use strict';

/**
* Return an unsigned 32-bit integer corresponding to the more significant 32 bits of a double-precision floating-point number.
*
* @module @stdlib/number/float64/base/get-high-word
*
* @example
* var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
*
* var w = getHighWord( 3.14e201 ); // => 01101001110001001000001011000011
* // returns 1774486211
*/

// MODULES //

var getHighWord = require( './main.js' );


// EXPORTS //

module.exports = getHighWord;

},{"./main.js":87}],87:[function(require,module,exports){
'use strict';

// MODULES //

var Uint32Array = require( '@stdlib/array/uint32' );
var Float64Array = require( '@stdlib/array/float64' );
var HIGH = require( './high.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );


// MAIN //

/**
* Returns an unsigned 32-bit integer corresponding to the more significant 32 bits of a double-precision floating-point number.
*
* ## Notes
*
* ```text
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
* ```text
*                         <-- lower      higher -->
* |   f7       f6       f5       f4       f3       f2    e2 | f1 |s|  e1  |
* ```
*
* If big endian (more significant bits first):
*
* ```text
*                         <-- higher      lower -->
* |s| e1    e2 | f1     f2       f3       f4       f5        f6      f7   |
* ```
*
* In which Uint32 can we find the higher order bits? If little endian, the second; if big endian, the first.
*
*
* ## References
*
* -   [Open Group][1]
*
* [1]: http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm
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
}


// EXPORTS //

module.exports = getHighWord;

},{"./high.js":85,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],88:[function(require,module,exports){
arguments[4][85][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":29,"dup":85}],89:[function(require,module,exports){
'use strict';

/**
* Set the more significant 32 bits of a double-precision floating-point number.
*
* @module @stdlib/number/float64/base/set-high-word
*
* @example
* var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
*
* var high = 5 >>> 0; // => 0 00000000000 00000000000000000101
*
* var y = setHighWord( 3.14e201, high ); // => 0 00000000000 0000000000000000010110010011110010110101100010000010
* // returns 1.18350528745e-313
*
* @example
* var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
* var PINF = require( '@stdlib/constants/math/float64-pinf' ); //  => 0 11111111111 00000000000000000000 00000000000000000000000000000000
*
* var high = 1072693248 >>> 0; // => 0 01111111111 00000000000000000000
*
* // Set the higher order bits of `+infinity` to return `1`:
* var y = setHighWord( PINF, high ); => 0 01111111111 0000000000000000000000000000000000000000000000000000
* // returns 1.0
*/

// MODULES //

var setHighWord = require( './main.js' );


// EXPORTS //

module.exports = setHighWord;

},{"./main.js":90}],90:[function(require,module,exports){
'use strict';

// MODULES //

var Uint32Array = require( '@stdlib/array/uint32' );
var Float64Array = require( '@stdlib/array/float64' );
var HIGH = require( './high.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );


// MAIN //

/**
* Sets the more significant 32 bits of a double-precision floating-point number.
*
* ## Notes
*
* ```text
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
* ```text
*                         <-- lower      higher -->
* |   f7       f6       f5       f4       f3       f2    e2 | f1 |s|  e1  |
* ```
*
* If big endian (more significant bits first):
*
* ```text
*                         <-- higher      lower -->
* |s| e1    e2 | f1     f2       f3       f4       f5        f6      f7   |
* ```
*
* In which Uint32 can we find the higher order bits? If little endian, the second; if big endian, the first.
*
*
* ## References
*
* -   [Open Group][1]
*
* [1]: http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm
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
* var PINF = require( '@stdlib/constants/math/float64-pinf' ); // => 0 11111111111 00000000000000000000 00000000000000000000000000000000
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
}


// EXPORTS //

module.exports = setHighWord;

},{"./high.js":88,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],91:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":65}],92:[function(require,module,exports){
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

},{"./create_table.js":91,"@stdlib/assert/is-positive-integer":44,"@stdlib/constants/math/int32-max":59,"@stdlib/math/base/special/floor":81,"@stdlib/random/base/minstd":97,"@stdlib/utils/define-read-only-property":109}],93:[function(require,module,exports){
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

},{"./factory.js":92,"./minstd_shuffled.js":94,"@stdlib/utils/define-read-only-property":109}],94:[function(require,module,exports){
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

},{"./factory.js":92,"./rand_int32.js":95}],95:[function(require,module,exports){
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

},{"@stdlib/constants/math/int32-max":59,"@stdlib/math/base/special/floor":81}],96:[function(require,module,exports){
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

},{"./rand_int32.js":99,"@stdlib/assert/is-positive-integer":44,"@stdlib/constants/math/int32-max":59,"@stdlib/utils/define-read-only-property":109}],97:[function(require,module,exports){
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

},{"./factory.js":96,"./minstd.js":98,"@stdlib/utils/define-read-only-property":109}],98:[function(require,module,exports){
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

},{"./factory.js":96,"./rand_int32.js":99}],99:[function(require,module,exports){
arguments[4][95][0].apply(exports,arguments)
},{"@stdlib/constants/math/int32-max":59,"@stdlib/math/base/special/floor":81,"dup":95}],100:[function(require,module,exports){
module.exports={
	"name": "minstd-shuffle"
}

},{}],101:[function(require,module,exports){
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

},{"./defaults.json":100,"./prngs.js":103,"@stdlib/assert/has-own-property":14,"@stdlib/assert/is-plain-object":41,"@stdlib/utils/define-read-only-property":109}],102:[function(require,module,exports){
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

},{"./factory.js":101,"./uniform.js":104,"@stdlib/utils/define-read-only-property":109}],103:[function(require,module,exports){
'use strict';

// MAIN //

var prngs = {};

prngs[ 'minstd' ] = require( '@stdlib/random/base/minstd' );
prngs[ 'minstd-shuffle' ] = require( '@stdlib/random/base/minstd-shuffle' );


// EXPORTS //

module.exports = prngs;

},{"@stdlib/random/base/minstd":97,"@stdlib/random/base/minstd-shuffle":93}],104:[function(require,module,exports){
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

},{"./factory.js":101}],105:[function(require,module,exports){
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

},{}],106:[function(require,module,exports){
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

},{"@stdlib/assert/is-buffer":17,"@stdlib/regexp/function-name":105,"@stdlib/utils/native-class":132}],107:[function(require,module,exports){
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

},{"./constructor_name.js":106}],108:[function(require,module,exports){
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

},{}],109:[function(require,module,exports){
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

},{"./define_read_only_property.js":108}],110:[function(require,module,exports){
'use strict';

// MODULES //

var isFloat64Array = require( '@stdlib/assert/is-float64array' );
var GlobalFloat64Array = require( './float64array.js' );


// MAIN //

/**
* Tests for native `Float64Array` support.
*
* @returns {boolean} boolean indicating if an environment has `Float64Array` support
*
* @example
* var bool = hasFloat64ArraySupport();
* // returns <boolean>
*/
function hasFloat64ArraySupport() {
	var bool;
	var arr;

	if ( typeof GlobalFloat64Array !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		arr = new GlobalFloat64Array( [ 1.0, 3.14, -3.14, NaN ] );
		bool = (
			isFloat64Array( arr ) &&
			arr[ 0 ] === 1.0 &&
			arr[ 1 ] === 3.14 &&
			arr[ 2 ] === -3.14 &&
			arr[ 3 ] !== arr[ 3 ]
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasFloat64ArraySupport;

},{"./float64array.js":111,"@stdlib/assert/is-float64array":19}],111:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Float64Array === 'function' ) ? Float64Array : null;

},{}],112:[function(require,module,exports){
'use strict';

/**
* Test for native `Float64Array` support.
*
* @module @stdlib/utils/detect-float64array-support
*
* @example
* var hasFloat64ArraySupport = require( '@stdlib/utils/detect-float64array-support' );
*
* var bool = hasFloat64ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasFloat64ArraySupport = require( './detect_float64array_support.js' );


// EXPORTS //

module.exports = hasFloat64ArraySupport;

},{"./detect_float64array_support.js":110}],113:[function(require,module,exports){
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

},{}],114:[function(require,module,exports){
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

},{"./detect_symbol_support.js":113}],115:[function(require,module,exports){
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

},{"@stdlib/utils/detect-symbol-support":114}],116:[function(require,module,exports){
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

},{"./has_tostringtag_support.js":115}],117:[function(require,module,exports){
'use strict';

// MODULES //

var isUint16Array = require( '@stdlib/assert/is-uint16array' );
var UINT16_MAX = require( '@stdlib/constants/math/uint16-max' );
var GlobalUint16Array = require( './uint16array.js' );


// MAIN //

/**
* Tests for native `Uint16Array` support.
*
* @returns {boolean} boolean indicating if an environment has `Uint16Array` support
*
* @example
* var bool = hasUint16ArraySupport();
* // returns <boolean>
*/
function hasUint16ArraySupport() {
	var bool;
	var arr;

	if ( typeof GlobalUint16Array !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		arr = [ 1, 3.14, -3.14, UINT16_MAX+1, UINT16_MAX+2 ];
		arr = new GlobalUint16Array( arr );
		bool = (
			isUint16Array( arr ) &&
			arr[ 0 ] === 1 &&
			arr[ 1 ] === 3 &&            // truncation
			arr[ 2 ] === UINT16_MAX-2 && // truncation and wrap around
			arr[ 3 ] === 0 &&            // wrap around
			arr[ 4 ] === 1               // wrap around
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasUint16ArraySupport;

},{"./uint16array.js":119,"@stdlib/assert/is-uint16array":47,"@stdlib/constants/math/uint16-max":60}],118:[function(require,module,exports){
'use strict';

/**
* Test for native `Uint16Array` support.
*
* @module @stdlib/utils/detect-uint16array-support
*
* @example
* var hasUint16ArraySupport = require( '@stdlib/utils/detect-uint16array-support' );
*
* var bool = hasUint16ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasUint16ArraySupport = require( './detect_uint16array_support.js' );


// EXPORTS //

module.exports = hasUint16ArraySupport;

},{"./detect_uint16array_support.js":117}],119:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint16Array === 'function' ) ? Uint16Array : null;

},{}],120:[function(require,module,exports){
'use strict';

// MODULES //

var isUint32Array = require( '@stdlib/assert/is-uint32array' );
var UINT32_MAX = require( '@stdlib/constants/math/uint32-max' );
var GlobalUint32Array = require( './uint32array.js' );


// MAIN //

/**
* Tests for native `Uint32Array` support.
*
* @returns {boolean} boolean indicating if an environment has `Uint32Array` support
*
* @example
* var bool = hasUint32ArraySupport();
* // returns <boolean>
*/
function hasUint32ArraySupport() {
	var bool;
	var arr;

	if ( typeof GlobalUint32Array !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		arr = [ 1, 3.14, -3.14, UINT32_MAX+1, UINT32_MAX+2 ];
		arr = new GlobalUint32Array( arr );
		bool = (
			isUint32Array( arr ) &&
			arr[ 0 ] === 1 &&
			arr[ 1 ] === 3 &&            // truncation
			arr[ 2 ] === UINT32_MAX-2 && // truncation and wrap around
			arr[ 3 ] === 0 &&            // wrap around
			arr[ 4 ] === 1               // wrap around
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasUint32ArraySupport;

},{"./uint32array.js":122,"@stdlib/assert/is-uint32array":49,"@stdlib/constants/math/uint32-max":61}],121:[function(require,module,exports){
'use strict';

/**
* Test for native `Uint32Array` support.
*
* @module @stdlib/utils/detect-uint32array-support
*
* @example
* var hasUint32ArraySupport = require( '@stdlib/utils/detect-uint32array-support' );
*
* var bool = hasUint32ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasUint32ArraySupport = require( './detect_uint32array_support.js' );


// EXPORTS //

module.exports = hasUint32ArraySupport;

},{"./detect_uint32array_support.js":120}],122:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint32Array === 'function' ) ? Uint32Array : null;

},{}],123:[function(require,module,exports){
'use strict';

// MODULES //

var isUint8Array = require( '@stdlib/assert/is-uint8array' );
var UINT8_MAX = require( '@stdlib/constants/math/uint8-max' );
var GlobalUint8Array = require( './uint8array.js' );


// MAIN //

/**
* Tests for native `Uint8Array` support.
*
* @returns {boolean} boolean indicating if an environment has `Uint8Array` support
*
* @example
* var bool = hasUint8ArraySupport();
* // returns <boolean>
*/
function hasUint8ArraySupport() {
	var bool;
	var arr;

	if ( typeof GlobalUint8Array !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		arr = [ 1, 3.14, -3.14, UINT8_MAX+1, UINT8_MAX+2 ];
		arr = new GlobalUint8Array( arr );
		bool = (
			isUint8Array( arr ) &&
			arr[ 0 ] === 1 &&
			arr[ 1 ] === 3 &&           // truncation
			arr[ 2 ] === UINT8_MAX-2 && // truncation and wrap around
			arr[ 3 ] === 0 &&           // wrap around
			arr[ 4 ] === 1              // wrap around
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasUint8ArraySupport;

},{"./uint8array.js":125,"@stdlib/assert/is-uint8array":51,"@stdlib/constants/math/uint8-max":62}],124:[function(require,module,exports){
'use strict';

/**
* Test for native `Uint8Array` support.
*
* @module @stdlib/utils/detect-uint8array-support
*
* @example
* var hasUint8ArraySupport = require( '@stdlib/utils/detect-uint8array-support' );
*
* var bool = hasUint8ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasUint8ArraySupport = require( './detect_uint8array_support.js' );


// EXPORTS //

module.exports = hasUint8ArraySupport;

},{"./detect_uint8array_support.js":123}],125:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint8Array === 'function' ) ? Uint8Array : null;

},{}],126:[function(require,module,exports){
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

},{"./native.js":129,"./polyfill.js":130,"@stdlib/assert/is-function":21}],127:[function(require,module,exports){
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

},{"./detect.js":126}],128:[function(require,module,exports){
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

},{"./get_prototype_of.js":127}],129:[function(require,module,exports){
'use strict';

// MAIN //

var getProto = Object.getPrototypeOf;


// EXPORTS //

module.exports = getProto;

},{}],130:[function(require,module,exports){
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

},{"./proto.js":131,"@stdlib/utils/native-class":132}],131:[function(require,module,exports){
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

},{}],132:[function(require,module,exports){
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

},{"./native_class.js":133,"./polyfill.js":134,"@stdlib/utils/detect-tostringtag-support":116}],133:[function(require,module,exports){
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

},{"./tostring.js":135}],134:[function(require,module,exports){
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

},{"./tostring.js":135,"./tostringtag.js":136,"@stdlib/assert/has-own-property":14}],135:[function(require,module,exports){
'use strict';

// MAIN //

var toStr = Object.prototype.toString;


// EXPORTS //

module.exports = toStr;

},{}],136:[function(require,module,exports){
'use strict';

// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{}],137:[function(require,module,exports){
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

},{"./fixtures/nodelist.js":138,"./fixtures/re.js":139,"./fixtures/typedarray.js":140}],138:[function(require,module,exports){
'use strict';

// MODULES //

var root = require( 'system.global' )(); // eslint-disable-line stdlib/no-redeclare


// MAIN //

var nodeList = root.document && root.document.childNodes;


// EXPORTS //

module.exports = nodeList;

},{"system.global":199}],139:[function(require,module,exports){
'use strict';

var RE = /./;


// EXPORTS //

module.exports = RE;

},{}],140:[function(require,module,exports){
'use strict';

var typedarray = Int8Array;


// EXPORTS //

module.exports = typedarray;

},{}],141:[function(require,module,exports){
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

},{"./check.js":137,"./polyfill.js":142,"./typeof.js":143}],142:[function(require,module,exports){
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

},{"@stdlib/utils/constructor-name":107}],143:[function(require,module,exports){
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

},{"@stdlib/utils/constructor-name":107}],144:[function(require,module,exports){
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

},{}],145:[function(require,module,exports){

},{}],146:[function(require,module,exports){
arguments[4][145][0].apply(exports,arguments)
},{"dup":145}],147:[function(require,module,exports){
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

},{}],148:[function(require,module,exports){
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

},{"base64-js":144,"ieee754":167}],149:[function(require,module,exports){
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
},{"../../is-buffer/index.js":169}],150:[function(require,module,exports){
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

},{"./lib/is_arguments.js":151,"./lib/keys.js":152}],151:[function(require,module,exports){
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

},{}],152:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],153:[function(require,module,exports){
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

},{"foreach":163,"object-keys":173}],154:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],155:[function(require,module,exports){
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

},{"./helpers/isFinite":156,"./helpers/isNaN":157,"./helpers/mod":158,"./helpers/sign":159,"es-to-primitive/es5":160,"has":166,"is-callable":170}],156:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],157:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],158:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],159:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],160:[function(require,module,exports){
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

},{"./helpers/isPrimitive":161,"is-callable":170}],161:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],162:[function(require,module,exports){
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

},{}],163:[function(require,module,exports){

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


},{}],164:[function(require,module,exports){
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

},{}],165:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":164}],166:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":165}],167:[function(require,module,exports){
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

},{}],168:[function(require,module,exports){
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

},{}],169:[function(require,module,exports){
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

},{}],170:[function(require,module,exports){
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

},{}],171:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],172:[function(require,module,exports){
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

},{}],173:[function(require,module,exports){
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

},{"./isArguments":174}],174:[function(require,module,exports){
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

},{}],175:[function(require,module,exports){
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
},{"_process":147}],176:[function(require,module,exports){
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
},{"_process":147}],177:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":178}],178:[function(require,module,exports){
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
},{"./_stream_readable":180,"./_stream_writable":182,"core-util-is":149,"inherits":168,"process-nextick-args":176}],179:[function(require,module,exports){
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
},{"./_stream_transform":181,"core-util-is":149,"inherits":168}],180:[function(require,module,exports){
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
},{"./_stream_duplex":178,"./internal/streams/BufferList":183,"./internal/streams/destroy":184,"./internal/streams/stream":185,"_process":147,"core-util-is":149,"events":162,"inherits":168,"isarray":171,"process-nextick-args":176,"safe-buffer":191,"string_decoder/":197,"util":145}],181:[function(require,module,exports){
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
},{"./_stream_duplex":178,"core-util-is":149,"inherits":168}],182:[function(require,module,exports){
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
},{"./_stream_duplex":178,"./internal/streams/destroy":184,"./internal/streams/stream":185,"_process":147,"core-util-is":149,"inherits":168,"process-nextick-args":176,"safe-buffer":191,"util-deprecate":208}],183:[function(require,module,exports){
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
},{"safe-buffer":191}],184:[function(require,module,exports){
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
},{"process-nextick-args":176}],185:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":162}],186:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":187}],187:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":178,"./lib/_stream_passthrough.js":179,"./lib/_stream_readable.js":180,"./lib/_stream_transform.js":181,"./lib/_stream_writable.js":182}],188:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":187}],189:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":182}],190:[function(require,module,exports){
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
},{"_process":147,"through":207}],191:[function(require,module,exports){
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

},{"buffer":148}],192:[function(require,module,exports){
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

},{"events":162,"inherits":168,"readable-stream/duplex.js":177,"readable-stream/passthrough.js":186,"readable-stream/readable.js":187,"readable-stream/transform.js":188,"readable-stream/writable.js":189}],193:[function(require,module,exports){
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

},{"es-abstract/es5":155,"function-bind":165}],194:[function(require,module,exports){
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

},{"./implementation":193,"./polyfill":195,"./shim":196,"define-properties":153,"function-bind":165}],195:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":193}],196:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":195,"define-properties":153}],197:[function(require,module,exports){
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
},{"safe-buffer":191}],198:[function(require,module,exports){
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
},{}],199:[function(require,module,exports){
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

},{"./implementation":198,"./polyfill":200,"./shim":201,"define-properties":153}],200:[function(require,module,exports){
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
},{"./implementation":198}],201:[function(require,module,exports){
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
},{"./polyfill":200,"define-properties":153}],202:[function(require,module,exports){
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
},{"./lib/default_stream":203,"./lib/results":205,"./lib/test":206,"_process":147,"defined":154,"through":207}],203:[function(require,module,exports){
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
},{"_process":147,"fs":146,"through":207}],204:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":147}],205:[function(require,module,exports){
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
},{"_process":147,"events":162,"function-bind":165,"has":166,"inherits":168,"object-inspect":172,"resumer":190,"through":207}],206:[function(require,module,exports){
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
},{"./next_tick":204,"deep-equal":150,"defined":154,"events":162,"has":166,"inherits":168,"path":175,"string.prototype.trim":194}],207:[function(require,module,exports){
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
},{"_process":147,"stream":192}],208:[function(require,module,exports){
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
