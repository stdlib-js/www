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

},{"./float64array.js":1,"./polyfill.js":3,"@stdlib/utils/detect-float64array-support":233}],3:[function(require,module,exports){
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

},{"./polyfill.js":5,"./uint16array.js":6,"@stdlib/utils/detect-uint16array-support":239}],5:[function(require,module,exports){
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

},{"./polyfill.js":8,"./uint32array.js":9,"@stdlib/utils/detect-uint32array-support":242}],8:[function(require,module,exports){
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

},{"./polyfill.js":11,"./uint8array.js":12,"@stdlib/utils/detect-uint8array-support":245}],11:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":253}],17:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":253}],21:[function(require,module,exports){
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

},{"@stdlib/utils/type-of":262}],23:[function(require,module,exports){
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

},{"./generic.js":23,"./object.js":26,"./primitive.js":27,"@stdlib/utils/define-read-only-property":230}],25:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-ninf":68,"@stdlib/constants/math/float64-pinf":70,"@stdlib/math/base/assert/is-integer":81}],26:[function(require,module,exports){
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

},{"./generic.js":31,"./object.js":33,"./primitive.js":34,"@stdlib/utils/define-read-only-property":230}],33:[function(require,module,exports){
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

},{"./try2serialize.js":36,"@stdlib/utils/detect-tostringtag-support":237,"@stdlib/utils/native-class":253}],34:[function(require,module,exports){
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

},{"./is_object_like.js":38,"@stdlib/assert/tools/array-function":54,"@stdlib/utils/define-read-only-property":230}],38:[function(require,module,exports){
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

},{"@stdlib/assert/has-own-property":14,"@stdlib/assert/is-function":21,"@stdlib/assert/is-object":39,"@stdlib/utils/get-prototype-of":249,"@stdlib/utils/native-class":253}],43:[function(require,module,exports){
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

},{"./generic.js":43,"./object.js":45,"./primitive.js":46,"@stdlib/utils/define-read-only-property":230}],45:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":253}],49:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":253}],51:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":253}],53:[function(require,module,exports){
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
* Euler's number.
*
* @module @stdlib/constants/math/float64-e
* @type {number}
*
* @example
* var E = require( '@stdlib/constants/math/float64-e' );
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

},{}],56:[function(require,module,exports){
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

},{}],57:[function(require,module,exports){
'use strict';

/**
* The Euler-Mascheroni constant.
*
* @module @stdlib/constants/math/float64-eulergamma
* @type {number}
*
* @example
* var GAMMA = require( '@stdlib/constants/math/float64-eulergamma' );
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

},{}],58:[function(require,module,exports){
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

},{}],59:[function(require,module,exports){
'use strict';

/**
* Arbitrary constant `g` to be used in Lanczos approximation functions.
*
* @module @stdlib/constants/math/float64-gamma-lanczos-g
* @type {number}
*
* @example
* var FLOAT64_GAMMA_LANCZOS_G = require( '@stdlib/constants/math/float64-gamma-lanczos-g' );
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

},{}],60:[function(require,module,exports){
'use strict';

/**
* High word mask for the exponent of a double-precision floating-point number.
*
* @module @stdlib/constants/math/float64-high-word-exponent-mask
* @type {uinteger32}
*
* @example
* var FLOAT64_HIGH_WORD_EXPONENT_MASK = require( '@stdlib/constants/math/float64-high-word-exponent-mask' );
* // returns 2146435072
*/


// MAIN //

/**
* High word mask for the exponent of a double-precision floating-point number.
*
* ## Notes
*
* The high word mask for the exponent of a double-precision floating-point number is an unsigned 32-bit integer with the value \\( 2146435072 \\), which corresponds to the bit sequence
*
* ```binarystring
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

},{}],61:[function(require,module,exports){
'use strict';

/**
* Natural logarithm of `2`.
*
* @module @stdlib/constants/math/float64-ln-two
* @type {number}
*
* @example
* var LN2 = require( '@stdlib/constants/math/float64-ln-two' );
* // returns 0.6931471805599453
*/


// MAIN //

/**
* Natural logarithm of `2`.
*
* ```tex
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

},{}],62:[function(require,module,exports){
'use strict';

/**
* The maximum biased base 2 exponent for a subnormal double-precision floating-point number.
*
* @module @stdlib/constants/math/float64-max-base2-exponent-subnormal
* @type {integer32}
*
* @example
* var FLOAT64_MAX_BASE2_EXPONENT_SUBNORMAL = require( '@stdlib/constants/math/float64-max-base2-exponent-subnormal' );
* // returns -1023
*/


// MAIN //

/**
* The maximum biased base 2 exponent for a subnormal double-precision floating-point number.
*
* ```text
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

},{}],63:[function(require,module,exports){
'use strict';

/**
* The maximum biased base 2 exponent for a double-precision floating-point number.
*
* @module @stdlib/constants/math/float64-max-base2-exponent
* @type {integer32}
*
* @example
* var FLOAT64_MAX_BASE2_EXPONENT = require( '@stdlib/constants/math/float64-max-base2-exponent' );
* // returns 1023
*/


// MAIN //

/**
* The maximum biased base 2 exponent for a double-precision floating-point number.
*
* ```text
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

},{}],64:[function(require,module,exports){
'use strict';

/**
* Natural logarithm of the maximum double-precision floating-point number.
*
* @module @stdlib/constants/math/float64-max-ln
* @type {number}
*
* @example
* var FLOAT64_MAX_LN = require( '@stdlib/constants/math/float64-max-ln' );
* // returns 709.782712893384
*/


// MAIN //

/**
* Natural logarithm of the maximum double-precision floating-point number.
*
* ## Notes
*
* The natural logarithm of the maximum is given by
*
* ```tex
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

},{}],65:[function(require,module,exports){
'use strict';

/**
* Maximum double-precision floating-point number.
*
* @module @stdlib/constants/math/float64-max
* @type {number}
*
* @example
* var FLOAT64_MAX = require( '@stdlib/constants/math/float64-max' );
* // returns 1.7976931348623157e+308
*/


// MAIN //

/**
* Maximum double-precision floating-point number.
*
* ## Notes
*
* The maximum is given by
*
* ```tex
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

},{}],66:[function(require,module,exports){
'use strict';

/**
* The minimum biased base 2 exponent for a subnormal double-precision floating-point number.
*
* @module @stdlib/constants/math/float64-min-base2-exponent-subnormal
* @type {integer32}
*
* @example
* var FLOAT64_MIN_BASE2_EXPONENT_SUBNORMAL = require( '@stdlib/constants/math/float64-min-base2-exponent-subnormal' );
* // returns -1074
*/


// MAIN //

/**
* The minimum biased base 2 exponent for a subnormal double-precision floating-point number.
*
* ```text
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

},{}],67:[function(require,module,exports){
'use strict';

/**
* Natural logarithm of the smallest normalized double-precision floating-point number.
*
* @module @stdlib/constants/math/float64-min-ln
* @type {number}
*
* @example
* var FLOAT64_MIN_LN = require( '@stdlib/constants/math/float64-min-ln' );
* // returns -708.3964185322641
*/


// MAIN //

/**
* Natural logarithm of the smallest normalized double-precision floating-point number.
*
* ## Notes
*
* The number has the value
*
* ```tex
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

},{}],68:[function(require,module,exports){
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

},{}],69:[function(require,module,exports){
'use strict';

/**
* The mathematical constant `π`.
*
* @module @stdlib/constants/math/float64-pi
* @type {number}
*
* @example
* var PI = require( '@stdlib/constants/math/float64-pi' );
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

},{}],70:[function(require,module,exports){
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

},{}],71:[function(require,module,exports){
'use strict';

/**
* Smallest positive double-precision floating-point normal number.
*
* @module @stdlib/constants/math/float64-smallest-normal
* @type {number}
*
* @example
* var FLOAT64_SMALLEST_NORMAL = require( '@stdlib/constants/math/float64-smallest-normal' );
* // returns 2.2250738585072014e-308
*/


// MAIN //

/**
* The smallest positive double-precision floating-point normal number.
*
* ## Notes
*
* The number has the value
*
* ```tex
* \frac{1}{2^{1023-1}}
* ```
*
* which corresponds to the bit sequence
*
* ```binarystring
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

},{}],72:[function(require,module,exports){
'use strict';

/**
* Square root of the mathematical constant `π` times `2`.
*
* @module @stdlib/constants/math/float64-sqrt-two-pi
* @type {number}
*
* @example
* var SQRT_TWO_PI = require( '@stdlib/constants/math/float64-sqrt-two-pi' );
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

},{}],73:[function(require,module,exports){
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

},{}],74:[function(require,module,exports){
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

},{}],75:[function(require,module,exports){
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

},{}],76:[function(require,module,exports){
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

},{}],77:[function(require,module,exports){
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

},{"./is_even.js":78}],78:[function(require,module,exports){
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
}


// EXPORTS //

module.exports = isEven;

},{"@stdlib/math/base/assert/is-integer":81}],79:[function(require,module,exports){
'use strict';

/**
* Test if a numeric value is infinite.
*
* @module @stdlib/assert/is-infinite
*
* @example
* var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
*
* var bool = isInfinite( Infinity );
* // returns true
*
* bool = isInfinite( -Infinity );
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

},{"./is_infinite.js":80}],80:[function(require,module,exports){
'use strict';

// MODULES //

var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );


// MAIN //

/**
* Tests if a numeric value is infinite.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is infinite
*
* @example
* var bool = isInfinite( Infinity );
* // returns true
*
* @example
* var bool = isInfinite( -Infinity );
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
}


// EXPORTS //

module.exports = isInfinite;

},{"@stdlib/constants/math/float64-ninf":68,"@stdlib/constants/math/float64-pinf":70}],81:[function(require,module,exports){
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

},{"./is_integer.js":82}],82:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":119}],83:[function(require,module,exports){
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

},{"./is_nan.js":84}],84:[function(require,module,exports){
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

},{}],85:[function(require,module,exports){
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

},{"./is_negative_zero.js":86}],86:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-ninf":68}],87:[function(require,module,exports){
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

},{"./is_odd.js":88}],88:[function(require,module,exports){
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
}


// EXPORTS //

module.exports = isOdd;

},{"@stdlib/math/base/assert/is-even":77}],89:[function(require,module,exports){
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

},{"./is_positive_zero.js":90}],90:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-pinf":70}],91:[function(require,module,exports){
'use strict';

// MODULES //

var gammaFactory = require( '@stdlib/math/base/dists/gamma/logpdf' ).factory;


// MAIN //

/**
* Returns a function for evaluating the natural logarithm of the probability density function (PDF) for a chi-squared distribution with degrees of freedom `k`.
*
* @param {NonNegativeNumber} k - degrees of freedom
* @returns {Function} logPDF
*
* @example
* var logpdf = factory( 0.5 );
*
* var y = logpdf( 2.0 );
* // returns ~-2.976
*
* y = logpdf( 1.0 );
* // returns ~-1.959
*/
function factory( k ) {
	return gammaFactory( k/2.0, 0.5 );
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/dists/gamma/logpdf":103}],92:[function(require,module,exports){
'use strict';

/**
* Natural logarithm of the probability density function (PDF) for a chi-squared distribution.
*
* @module @stdlib/math/base/dists/chisquare/logpdf
*
* @example
* var logpdf = require( '@stdlib/math/base/dists/chisquare/logpdf' );
*
* var y = logpdf( 2.0, 1.0 );
* // returns ~-2.266
*
* @example
* var factory = require( '@stdlib/math/base/dists/chisquare/logpdf' ).factory;
*
* var logpdf = factory( 6.0 );
*
* var y = logpdf( 3.0 );
* // returns ~-2.071
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var logpdf = require( './logpdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( logpdf, 'factory', factory );


// EXPORTS //

module.exports = logpdf;

},{"./factory.js":91,"./logpdf.js":93,"@stdlib/utils/define-read-only-property":230}],93:[function(require,module,exports){
'use strict';

// MODULES //

var gammaLogPDF = require( '@stdlib/math/base/dists/gamma/logpdf' );


// MAIN //

/**
* Evaluates the natural logarithm of the probability density function (PDF) for a chi-squared distribution with degrees of freedom `k` at a value `x`.
*
* @param {number} x - input value
* @param {NonNegativeNumber} k - degrees of freedom
* @returns {number} evaluated logPDF
*
* @example
* var y = logpdf( 0.3, 4.0 );
* // returns ~-2.74
*
* @example
* var y = logpdf( 0.7, 0.7 );
* // returns ~-1.295
*
* @example
* var y = logpdf( -1.0, 0.5 );
* // returns -Infinity
*
* @example
* var y = logpdf( 0.0, NaN );
* // returns NaN
*
* @example
* var y = logpdf( NaN, 2.0 );
* // returns NaN
*
* @example
* // Negative degrees of freedom:
* var y = logpdf( 2.0, -1.0 );
* // returns NaN
*/
function logpdf( x, k ) {
	return gammaLogPDF( x, k/2.0, 0.5 );
}


// EXPORTS //

module.exports = logpdf;

},{"@stdlib/math/base/dists/gamma/logpdf":103}],94:[function(require,module,exports){
module.exports={"expected":[-1.8027475960393602,-10.481344923814447,-6.785873928250485,-1.9845336280815933,-8.010222346994418,-5.570826202482977,-3.8285680636425634,-2.8496065382209945,-6.200784416093725,-4.4973109662796675,-2.7012324695065484,-5.683449902687329,-10.939782498443442,-6.473365211775874,-2.2880850575104192,-2.6283961926296673,-2.7662086235603978,-3.2185049354701523,-2.5421848119037698,-6.64451673795359,-7.12932401983403,-9.62357495279844,-3.2070212180571396,-3.3915739264239346,-6.301117255303642,-2.678575499893307,-5.894060363688289,-9.097537067070542,-10.71903891912576,-5.321364340806384,-3.0905748413771885,-2.7674914915721267,-2.766949178890213,-3.5156657528391033,-2.4538739996832226,-2.252622761037934,-4.23136757293946,-2.4721550112356665,-11.41112484208436,-13.929326416771154,-11.828592250820451,-2.876122874711008,-3.76170771474862,-2.530383701133969,-2.8572118214286673,-2.969909539879026,-1.8871064126254788,-3.5355705100452735,-2.30676030222429,-1.9333392963276528,-1.5920999983441475,-3.2456386568145237,-2.438278568042336,-4.832472931587732,-5.707065362481585,-1.8534177096797126,-2.5551612073514467,-3.1315959103380226,-2.6481782558337703,-3.167675735263358,-3.083427759786418,-3.7928159034495676,-4.525422361953322,-9.48155295608877,-3.900880049739546,-7.428794552739598,-4.646825526152423,-5.93708489411383,-3.364150811757696,-5.484608792692157,-1.5923965504029811,-2.607001368686432,-2.596106498974439,-3.399349268490722,-4.0112874273635315,-9.805379408638736,-2.475177981374095,-3.204473591156837,-8.903463517721237,-3.192102367296778,-3.5547803862791,-23.725657123098397,-3.4522787819417733,-2.4822938570924586,-2.3807490652811967,-4.223442733280081,-5.572503476375188,-2.6196702532237244,-3.2974857195583667,-3.4397700530440956,-2.8071174778617056,-3.2833651818445375,-2.145788607556811,-3.575694196028328,-13.000199934522055,-2.5842638425352664,-7.924794331067011,-2.3448036648503967,-2.5499099000418872,-2.227486768041055,-3.2724911122911395,-3.4702614043845244,-2.31585684605403,-2.992120486700693,-2.3886519052383073,-2.5172809616356253,-2.8302057802473857,-3.2441176855604508,-9.065959555247762,-5.730276568833097,-2.6380129432750183,-2.6450507677004214,-3.8640268777589935,-7.233128968183362,-3.022312016176179,-8.366087778878507,-2.4433558400083353,-5.335056981224637,-4.016019065670516,-1.6613707877908022,-4.049662699684306,-2.7408595559294215,-3.7364600470462923,-4.603788013239859,-3.045846958906078,-3.2761464981243495,-5.150900500322068,-2.832598427948588,-5.570858098638435,-6.083754840495162,-3.088807303604969,-3.121374264771024,-1.593756213835133,-4.1382060755609995,-3.806119235476942,-2.2845412153706857,-2.338291446229201,-2.1275713969041274,-4.933023308931137,-10.363364431145593,-4.242547659952907,-5.247338032123469,-2.4554400504176606,-3.038641396672606,-2.240741832440054,-3.2306747223204235,-5.26720559036859,-2.2214939870927,-5.043334731337813,-4.518272365025721,-9.48105531156597,-6.047231494228299,-5.6820576882428515,-2.7265796363886836,-3.0912367846226734,-2.5386129525094034,-6.804363199544175,-2.8929575364293716,-3.7377763174383265,-3.709250266633717,-2.8622592057903664,-2.6605394746662596,-1.916404042316826,-7.569292843481146,-3.814274562281161,-8.87163069667085,-3.3897567201723318,-10.188830730093835,-2.4630847152845265,-2.1261607540068153,-4.828553185588491,-5.036833118740291,-3.0909154500493554,-3.622050235376177,-2.747492384948066,-9.5411263633645,-4.309424866326435,-4.566648532478909,-2.2115495617728764,-2.7335065621314185,-2.708529843828794,-5.885036044315245,-2.691778739228954,-3.0938365390846396,-4.619542384503718,-9.294242522355802,-4.098262223903132,-2.4020205641681085,-3.0350146700756375,-2.347910410886201,-3.2171639290966945,-5.671924370918573,-9.022742615547543,-3.038155089030289,-3.0351124863450933,-2.554056392170393,-2.673811449218218,-5.1288797716201024,-8.733947760568414,-2.5501141683391206,-2.7096023878259645,-8.032696692580252,-2.7966288680716476,-2.625973035562146,-2.6979423150746555,-3.0110168501448538,-2.922307023419486,0.41751656826927475,-3.844137909704216,-2.6983973166808797,-2.349105383345789,-3.530948079588795,-2.3339227796779505,-13.027949521182236,-5.007783470055578,-5.755703899694433,-3.3563222494628997,-2.6965599445475608,-2.7209958415423174,-1.7046124842651262,-2.4252450724318657,-11.265969500709055,-4.833672950970796,-3.452469425896408,-5.7104275458157465,-8.443846253875748,-1.9677522891891086,-2.6838980104072827,-3.490511171487766,-2.514314881710698,-8.806715201077335,-3.2994021491213488,-3.4330338053024194,-2.6286310003010986,-4.239365389478927,-2.3373473135311826,-2.7917439286876204,-3.1813106214244233,-4.367259584661854,-4.358198412557513,-2.9272872386053437,-10.934281359452328,-2.7999584772702697,-24.46038011713274,-11.187077740483636,-3.095264001406276,-2.557350086410172,-3.29540856838561,-3.1193161344910676,-3.0509542616512917,-3.571007625874533,-5.69908038418106,-4.819826804170511,-4.663211928540173,-4.657887440865877,-3.34869086584074,-1.8720290134820652,-2.1515072698570132,-8.909066803179952,-25.16170678748581,-6.159746884405186,-2.9311512373936157,-6.958290280356356,-4.255823736039515,-3.0240473028954415,-2.442474201532676,-3.0183443474566793,-2.7989439466536696,-2.605701828632399,-2.193965091138249,-10.009029203843943,-6.536372458708166,-9.958727479378233,-5.12910383387648,-2.7298071474685384,-4.777913411707852,-3.7747705552734,-2.6768877889826426,-2.7513318673081266,-2.0787426059640133,-2.6639544103687665,-2.6760670137245115,-2.7919816671758575,-2.5020536996189136,-1.7311923405031058,-9.2621175570263,-3.0745718596044,-3.2443297796922357,-5.058350643580188,-2.55673954089516,-3.5391509949166515,-8.828879359381682,-5.734546849643316,-2.3396030070991833,-2.859418904270035,-2.663291103014674,-2.605195971224973,-3.8749191891548627,-2.3884518629554194,-2.603771888828938,-2.514484408274018,-3.8940025759283587,-5.28074486879783,-10.328739766254865,-2.4419529133887496,-4.416599071002305,-2.3416812674541836,-5.087457160487414,-5.861039945721999,-6.102275805935394,-3.5419779785215724,-14.399912264053201,-2.5271665753044137,-4.209455485083417,-3.9313020033545234,-3.064061555476899,-2.616599791330475,-7.073688781321366,-3.799846066010343,-3.4134656370604777,-2.5822563950190385,-2.598655687421108,-6.422051024480747,-3.0679508413799073,-3.2938700609269698,-3.549962155041065,-2.8802558919686296,-2.485397226725795,-4.404432764742497,-2.6162907430252065,-3.063926039411931,-2.8784132283277977,-5.3325508795032555,-5.869444636088309,-2.384060392034047,-3.345209479812573,-6.247325821025132,-5.241844840667209,-6.9795873474409795,-2.9441569813190758,-7.379544256085101,-2.5470119554092503,-9.38174676961401,-4.926056270932908,-4.319019407011116,-3.1640081844883325,-5.006405128975532,-3.149892834199566,-2.3546652838692594,-6.364625717437065,-3.4730588937334153,-2.499503345353184,-6.637522466784056,-4.3691193374261985,-2.196654094012703,-2.8862145743921284,-5.60030520932135,-2.8964076761509925,-3.0078888023453123,-9.646650632603786,-2.5655647013180345,-3.196324347148149,-4.527578805203568,-2.731795140013086,-4.478994834241795,-5.188977194313896,-3.237044840083671,-3.7281812326339714,-2.729223526395034,-3.409893748632096,-2.7223879491005554,-4.447914779905479,-2.6795215165603152,-3.8342667507495287,-6.775738748230576,-3.9377919888303285,-3.013064619078445,-3.493397597726844,-47.60240974538412,-2.440952452633309,-3.3487814277727668,-31.465299663319463,-3.9901933909223506,-5.792805509731988,-2.538106407175434,-5.6099887628513825,-3.408302029472166,-9.690944358212473,-3.6580455458895,-1.6122080289908034,-2.801153516213711,-2.9895685023596257,-2.8917728665332656,-3.1553426089143444,-3.2760178917985483,-3.8162254658363466,-3.5173450842825713,-2.6765017123041903,-6.692148813407778,-2.986359975025324,-2.9542684494113947,-3.407749470540407,-3.9769828614986213,-10.146118590822667,-3.3048508902267932,-4.426523437600443,-12.213656632933608,-3.1833641023119883,-1.982661759299158,-3.278952836096521,-5.118150710673902,-2.5945128637421058,-10.949602561015336,-7.8595640569616325,-2.0800745769957802,-20.327959314951034,-4.105774129614069,-2.3671237770644162,-8.232240704442763,-2.7948447877482345,-22.741944201741514,-1.9870612524900761,-3.6058047080310334,-2.8022211188695496,-3.1669782006748117,-2.4425361017824967,-2.9332324383211144,-2.687978978044527,-2.714634221070312,-2.23162826976781,-12.7242678631785,-4.172382980558192,-2.6390154463257325,-2.62071820282902,-3.4456149879247495,-4.129168545577175,-3.1691225248051036,-3.4367011469644018,-4.11135360342865,-2.3717574946162516,-2.7537547389441928,-7.051564620379536,-3.989945125587373,-3.410145908346539,-3.4179716775321625,-3.2825770902579765,-3.642926675166269,-3.5709676072715943,-2.8273097962871696,-2.5780137714119977,-2.7326483329937514,-3.7061273733697324,-6.872348942814758,-2.815177073067364,-2.763661666862154,-2.8924030977958384,-2.582642676261576,-3.8373526089722656,-2.7545844738390755,-3.0930999144144007,-2.707479368733402,-3.396304603838904,-2.665057849403541,-2.394069957702204,-2.4646014306666637,-5.894210392517923,-2.7281022477160874,-2.3136960427554287,-6.677419695330754,-3.3188272688967015,-12.593921745629508,-2.406462722176943,-3.0713881196118455,-3.210015092604571,-2.6697892596466555,-3.492998824482708,-5.583393744884194,-3.333978104611398,-3.9443701363098755,-9.33795991086025,-2.798221705969249,-31.739638531461914,-4.5961290472041085,-2.5510675490064214,-3.434533432008434,-2.366448272629289,-2.786286590996129,-5.872720026191612,-58.888458601331884,-2.814619237065793,-2.872050574574761,-2.7048555461246924,-6.82039752999181,-2.535911307811676,-5.003886648513591,-2.6287944758134882,-3.940688258772887,-4.1365432017532315,-5.575140259052094,-2.488940058311288,-5.713624892974206,-8.463048022055462,-3.396838123373384,-26.312291831081907,-3.2893737052570207,-2.801329596653901,-4.632777979778663,-8.114413609473782,-3.844101198748163,-4.164255640492851,-4.163312241498792,-3.833702108268086,-4.633440909134518,-2.9605898784803033,-8.415261634673517,-12.154377980390452,-2.5513680885134,-2.621358788690154,-2.4794474800971766,-4.421637377353664,-2.6852447771756127,-5.685103451677757,-0.8200305152004743,-3.2601731519261747,-13.190546550594084,-9.750638778939567,-4.691113683594077,-3.3149426879611292,-1.5256563555224885,-7.546882229149089,-4.719468267008071,-3.259624428258837,-2.020674586563278,-3.899275502500707,-2.6730495645030032,-2.6123468099993135,-3.003501770061713,-5.1953087505322655,-2.463258899117239,-2.471061916814258,-5.440088805402714,-5.467438035085439,-2.43209286772185,-3.270571999888337,-5.206025438618776,-1.9914463674330647,-2.7547028786552095,-2.4612921998082555,-2.745175661131719,-2.438854472728722,-4.9091390079733,-13.281890043431153,-5.788693537794213,-2.285789289565597,-2.429203511045394,-4.503421422684765,-2.3872322812252023,-5.996398308684883,-3.6246356005071223,-10.859560425281257,-2.746808328392748,-7.932632162411629,-3.796952506662427,-3.099686354928047,-4.8871609138852286,-4.084018830254508,-7.966874772699072,-3.9195972098829905,-2.553944979673942,-5.274956397870229,-6.627561716459116,-3.163168344490974,-2.7004026099413734,-2.293781343068514,-1.7214338695035174,-4.045092869218091,-4.735589674852518,-3.4748429985669174,-4.08214143991434,-7.120957723822424,-3.5368592647568824,-2.582104088787328,-4.601471155480941,-2.907760488383133,-2.169769908917763,-7.41799646519522,-3.3111993050617077,-11.076722541245754,-3.0037672007056426,-3.179959719492621,-4.531160153706122,-5.535524448016626,-8.350330114992744,-5.898410444070531,-2.070743844084819,-15.51447763889297,-1.781602945734659,-9.596556301576124,-6.215458228644031,-7.850569021363113,-2.5549389216592147,-5.703148502705689,-2.724646944312594,-5.932790389368465,-2.7066385858220596,-3.5452878592891386,-5.012978294125666,-4.541539307792059,-3.1759814745434287,-2.1460789694999067,-2.248745640661998,-3.721253565939425,-7.377007104907291,-4.016164813766344,-2.4343127736115133,-16.056097717859874,-8.081025820178173,-6.189753357911181,-2.3817261778367382,-3.5569569035121247,-6.47167028398124,-2.897756977388658,-1.817363501459468,-3.6659118349882602,-3.614969232891532,-2.8229113624871625,-2.6682619019863214,-2.800299656461866,-2.3224577319982846,-2.532313217150654,-2.0972463476008465,-4.904626901868213,-2.5196511075375763,-7.811636676956443,-3.7087769860214754,-3.3513113053182693,-4.485240276304173,-3.788083197826566,-1.7372415648506743,-3.2590599444119763,-3.2732634330795687,-4.054651854674595,-2.2801363449398204,-4.961795499430863,-7.044861852127711,-2.8071854806888035,-2.9564925648254916,-10.226051268084175,-5.358589350481159,-2.6578683885538137,-3.067530983248448,-4.766076478586697,-6.5287594914276195,-6.141709656892827,-5.818310950574518,-2.5563336329597353,-2.6551285838356633,-4.185042584267854,-2.2845593816171457,-23.71354776895344,-2.6467072304666495,-4.238237424817913,-1.6766793104534625,-2.902439757465884,-3.9465327324640005,-2.6817001543524444,-5.756513390111563,-2.348135957116655,-2.7135918162990644,-3.2912503562540514,-1.7834431590841255,-2.7444399714915653,-2.941526626903579,-3.8787657357376695,-3.2152324550861686,-5.847256111099544,-2.574979755783625,-5.842606623966759,-2.505362183780417,-3.8372826586218967,-5.213237004174715,-3.3332694890708217,-2.5033136975952304,-2.792061436339834,-10.629612638966414,-8.171171553011066,-5.40500092294662,-9.604267628302633,-1.5565009672366188,-3.198825697515301,-2.00239116719509,-2.6885759591649867,-7.8016175340832525,-3.3273175301611486,-3.7145882063858835,-1.9222783986318106,-2.3504787306426524,-5.216061024056941,-2.410083808290778,-2.7164006001277223,-9.826162902517325,-7.512486523982099,-2.949495706588218,-1.4973559437702597,-3.889017422388445,-3.316326079367284,-2.638459838346508,-5.026346154060313,-3.2240810688577333,-2.7517435807190984,-3.054359395786282,-31.739264610005407,-6.670435878205044,-2.2949847676515263,-4.305132197687666,-10.408614424673967,-3.6953944418326232,-3.8259962704291306,-5.348523481340084,-2.6088454785437936,-4.433022653760991,-1.9790790833097525,-2.901054623787749,-2.6568596221557033,-2.6388698391508814,-4.7106736869058725,-6.31409130697766,-8.68834881927383,-4.5986266832227765,-2.579445530208695,-3.0843225814831254,-5.698798864289169,-2.721980762480705,-2.823106443781747,-3.4877823487497164,-7.569196345719027,-4.212044190335925,-2.4752628366234517,-4.602904261923939,-3.018576790262648,-3.0110137500176237,-3.099332846520219,-14.141444959623502,-5.032357096384439,-2.883111356768936,-3.255988757133244,-6.757628882766768,-1.9088897942015337,-2.586011702087733,-6.171185453072177,-5.894001433832072,-2.9834404541269977,-3.041437110733019,-2.174210870641737,-2.151724660275912,-8.43125564218756,-2.5803442852387826,-2.7232810507858933,-35.13824843604923,-2.9822412262282993,-8.95985409070193,-9.912216484490637,-2.899557071454536,-3.2674204338719957,-2.2496726373031026,-5.165238715714155,-2.601162555528717,-26.217871982855296,-7.036600346130315,-2.60987410189113,-5.031877276524423,-1.8518576991290878,-19.788393293381695,-3.0776800881892767,-2.4291714134248594,-8.734731337393404,-7.3357339073300345,-2.1503751926358254,-7.56473872966237,-9.029520963588883,-5.872504335763553,-2.796094969689371,-2.287716990870586,-4.964427808195249,-8.676677466325316,-2.410071307473193,-4.935085204157655,-2.3733785669565823,-2.748520411567252,-4.095868031341679,-3.3200973055849814,-2.722141756271136,-3.991925201241143,-4.452184517993919,-22.43842393157418,-3.017192536651363,-4.020304529236281,-2.8259104930882666,-10.890868067346169,-19.93657756261442,-3.777369949154102,-12.233489091531775,-3.2876020124593883,-2.7410004099278376,-2.8023119716083764,-10.620710562834384,-2.8407154197726245,-24.05610783010527,-2.759737372969729,-3.0204016434057737,-2.6322066184879036,-2.7052612495958774,-7.383933850236963,-4.079648389502431,-3.842385334439991,-2.441987131179731,-1.8792173980859244,-4.350625234264751,-2.8870064103074125,-6.4268464847649875,-2.485753881582004,-2.875084332000125,-2.4589285928547184,-4.907636483583396,-3.5806281961166926,-2.2129105705479093,-2.9894607175313683,-3.2699954066038046,-2.841474562253364,-1.7701361848028752,-4.715700043459397,-6.547748905361713,-11.12563695774243,-2.4608265998986987,-6.822292998913767,-1.097979930052846,-2.8456790251500075,-7.540733861736494,-2.4523327158210058,-14.94835152674371,-4.777515445502556,-4.429302810527856,-2.6289731547374307,-5.806601276783545,-5.9462458264677815,-5.602455902545723,-5.96163226303856,-4.064562152266014,-2.466543116489476,-5.621351789388854,-2.6957186015943324,-8.180801539848268,-3.683942548088263,-10.893655606303652,-10.933374865078218,-2.603235432850719,-2.100689700153963,-6.752978260456659,-3.5365932702553384,-2.735723686381837,-6.33045267867605,-2.5610235289770404,-2.753418675238875,-1.3425000088333237,-3.0771036839216284,-5.716714301291567,-2.3927194954881164,-2.8156383372258125,-2.650916799934194,-2.4230939280804478,-2.26315826252581,-3.048885622864854,-6.855015142658155,-2.6887788262689254,-4.312631685687139,-2.6273657153904946,-6.208962674764199,-10.377081456797086,-8.962232444096728,-7.665319322321895,-16.665660921837397,-3.5176204518748193,-3.052356141908792,-4.124182769793933,-7.426975954584739,-3.725707927539079,-1.0724360940177962,-6.992551708863051,-8.249945566707918,-3.57813783436679,-6.904826944717553,-2.8510184653176434,-3.295959251164305,-2.414582090453041,-6.3732066123580875,-6.188638638046479,-7.711674470000237,-3.400865187426855,-3.557686501965246,-2.087430278547859,-3.010388776990214,-3.3805496584118306,-2.9302048159464924,-3.263288278364107,-0.791256728426181,-4.702822118126056,-2.488572662834091,-4.284242451281182,-3.8730083551825807,-8.226054942090142,-2.4830606040209102,-4.121594301828222,-2.624293123324302,-4.39055512379154,-9.302583468652221,-2.5766992174640584,-2.4822496518742008,-2.7790513296715282,-5.376630699426683,-2.6271631430329836,-3.208110199008157,-3.236980822499117,-3.70425040892789,-5.459593472109399,-2.8127597354782474,-5.9222938620856045,-2.6036224893532576,-7.840120517723547,-4.732339528697378,-6.940717628817393,-2.701530919908478,-2.3696430589455866,-2.31757163841785,-3.6552971165326786,-2.524314781308509,-3.190966036726103,-2.1635040167694544,-4.4035292487517275,-3.1327179544125268,-2.013280788314063,-2.7442619592878206,-6.773651280750945,-3.1826543290823675,-10.549829220199133,-5.614868376594968,-9.18300997154604,-3.339979197607451,-5.359147391520538,-2.8365071954188634,-4.128744009732013,-8.698808256936637,-3.080734427135385,-7.480460840708239,-2.7338966952205386,-3.4291635913802256,-2.776159507762864,-0.29394726315125874,-11.71637002501746,-4.233202278548808,-3.451936514964696,-3.8210101831383825,-1.766591402814055,-3.662240755086449,-6.714984678722505,-7.162979020957834,-3.436670234124878,-3.0142825633703403,-2.7661548198812174,-4.396831346181402,-9.439019208460966,-2.8550762265294334,-3.4279610304141137,-2.7903879254114337,-2.8219720883335504,-6.019496897032308,-2.9462479736233127,-9.905443653925587,-6.645501520502812,-5.066896303472403,-5.636393139379244,-2.396941755295137,-2.68696307717686,-8.189759007542314,-2.6783179748184294,-5.588436085068258,-3.229491404182315,-25.158866788506767,-10.17522354452614,-9.98280649979644,-11.044854800893926,-2.280549849195102,-10.081081448236052,-2.4254462588953194,-3.734254343479985,-5.1337184965109905,-2.825725803439749,-9.246269591019805,-2.6197506324753825,-8.041672801048573,-2.6787078789918963,-2.908149249667267,-3.2667753221864015,-1.7051116851248806,-2.6161184786230463,-7.27298870563353,-2.9086035081106387,-4.536665267738459,-2.570508238848854,-7.28905267577332,-2.9121719378528623,-7.833043740481419,-2.6843415744580104,-4.0823912019083215,-3.5598779257764535,-7.180446830715169,-12.662043973047721,-1.73138472154251,-2.672726979978837,-2.782497943630321,-4.4037688859202,-4.703992657094046,-4.325778966267337,-2.587441556500532,-6.495325054521986,-2.8334616450572145,-3.51293082104252,-7.865002343219372,-2.9618452625058995,-2.946131110948881,-6.959464211277116,-1.1982043080209723,-3.162053790047869,-3.5813911981400377,-2.6088340036645565,-11.202544251510034,-2.376367640482192,-2.1704163031535986,-7.988918140052919,-2.4524051810309184,-6.839912213102547,-3.477719850709608,-3.81278424612535,-2.204659521969543,-4.660419672881028,-2.762379077116824,-2.7572499743453465,-2.059994075437998,-8.295389258053785,-7.577818773156981,-3.704930442261321,-1.8596244662529808,-5.958383388893566,-2.589946000132318,-4.142360596634501,-7.293005486473133,-2.814658879762363,-5.642980132961995,-16.628268937573466,-2.712840966687135,-11.533613730386811,-2.6963857215182796,-2.8949278862564394,-2.616185919554497,-2.8918071507579692,-2.743999189727841,-2.2928030071276466,-2.7519076665717424,-4.119882169237454,-2.975070648442731,-2.4837069435373484,-6.029768361440073,-13.132737992844719,-2.718084360351702,-7.066674029382042,-2.6817630117172575,-1.9432815046672038,-3.8075533480066435,-5.8244386183534065,-3.321920928140728,-3.6869370228593548,-5.4926305924017464,-1.2786636113949572,-4.691629917662622,-2.5265905372841786,-3.6456969564712494,-3.3315927303010033,-4.963392963265134,-2.4624074425027036,-4.634920079319281,-2.2000623200957956,-2.9897865747746124,-8.749419356757512,-6.041523100898951,-3.057647702485294,-3.1190903575269515,-4.431020578354922,-2.637129686696682,-3.6663901004086887,-6.3857510522701855,-9.621224112370477,-4.923774160834736,-2.997985421226385,-4.463435900217325,-2.1092183152181545,-2.840693245921688,-2.4253135912006747,-16.53973406881783,-3.092206663103246,-10.490851600956217,-3.9996540854706653,-6.066841600562146,-2.192890053604526,-3.380523562191089,-1.577216521259329,-3.8356718251485384,-3.8622502421296927,-9.615125585155424,-3.5294853200790244,-2.6694728809000727,-2.5248722465728792,-2.933950248141966,-2.8890526193594575,-3.3943171846161073,-5.37592798036434,-7.926219079419971,-2.8041251121999493,-1.9628439140051848,-2.299461662676889,-5.201154035204613,-2.731231163968739,-6.694588137614793,-3.5282819812874875,-2.8969146481270496,-4.68350462275397,-2.250680424451277,-3.1228775095349963,-2.5144708502872217,-3.9204759754906986,-2.893862022093449,-8.208298457045947,-3.125226657239362,-4.022505559181362,-12.411055175726917,-3.0664218343673966,-14.681614086937904,-10.940720044672853,-2.5624505394195976,-3.5513215860289242,-5.038068434289709,-1.993363771652099,-2.9281438678844958,-2.4242920134952257,-7.009011745028114,-3.671401262507404,-3.05485360234347,-2.5603889908065476,-7.042549907829841,-2.9739168418008965,-3.8292142111685092,-2.7560084528181266,-4.055446249741076,-3.4085879912199575,-2.6333232148858188,-7.944576022829061,-10.549270802255442,-4.132862646325689,-6.181632303700123,-4.1357590588046955,-2.973170199948568,-3.7695417345638464,-2.7134743374164985,-6.503097711759698,-2.839217503673094,-3.705871524058341,-2.81675100494364,-2.7017552619328185,-2.535392018714225,-2.5436935315441103,-2.5991391691727457,-2.7093982188126353,-2.9481049204828143,-5.693090839932447,-2.856989774752423,-2.5426101457106167,-0.7829048817964133,-1.9705670267572977,-2.2896743326646254,-3.901916098374071,-6.311852423910544,-17.182639073447646,-2.972085479509929,-2.6632305167798145,-3.0350217718200425,-3.7835451204266723,-3.135659652473387,-2.17659280836647,-3.522070604661007,-2.7403511786614754,-2.565772009058346,-5.62150560725371,-6.156114286361492,-2.834795450807143,-2.2512032505053536,-2.8874238931291343,-6.795916700290576,-3.6797663575197497,-2.6743457045373535,-3.5385900158501276,-2.5843424064379255,-4.890688779872337,-3.515049211978902,-3.545878046970854,-2.089881495261117,-2.8070395813394042,-3.6065872028705783,-12.435885286264279,-3.639283094831282,-5.290620281690166,-2.6428378659081693,-2.6488121585352737,-9.276894859864296,-2.8761155257711737,-3.2829954102207752,-8.39701087978724,-2.4247954804763623,-3.151690862666851,-3.7793270192321815,-1.135506763710066,-7.554166326627489,-2.679902690825878,-2.838579875720101,-3.2310317345287984,-3.030678037907227,-2.3391656523233277,-2.5222860590875666,-3.033092582946016,-8.612557217079056,-6.58830304840239,-7.674081373637302,-2.984116472969132,-3.018947581863573,-2.5767575985049396,-2.8792765650879444,-2.3776704541362723,-3.3577592059469783,-2.6050938405068984,-2.5126260477762785,-9.337357528140032,-2.876716146903478,-7.64880104867356,-3.3805756918836343,-28.303968703316684,-4.641448952821779,-3.9527322005682084,-1.582601921615714,-2.780605029061859,-2.622169586641731,-6.06551793326045,-4.504081407239151,-6.878285966211984,-20.16278389064153,-2.748063220650882,-2.903760062176857,-6.242651908119942,-8.842446187899059,-5.821863813752983,-2.798763965058175,-2.5857282033748037,-3.40937939831148,-3.739953041941731,-4.4975331168224475,-12.892407520503175,-2.9614118157801776,-7.229304380921875,-2.1346482943173344,-5.104150329074415,-3.0169678805464133,-14.893154737985135,-2.7687736603691704,-5.86441550949405,-3.885245880853147,-4.650140970256938,-4.091210420540052,-4.579941310656228,-3.4931479933857883,-5.952254021795446,-6.926158799870028,-3.970499026719829,-6.378458117521415,-17.021048501727865,-2.762536358311337,-9.206182483367265,-8.814394874798543,-2.293102935291452,-4.472529124259871,-3.901675894568453,-2.776969072106458,-6.122593845748035,-9.588630279199942,-2.4206133126619047,-2.2291798812276666,-2.58695094516094,-2.314452719236285,-7.107206217988416,-2.777359153720731,-4.5364170950442215,-2.7082475367274323,-18.78387622414373,-2.8358348600431267,-4.135766660700734,-7.792174257453986,-11.432214203773725,-7.903595117346809,-11.21036854759739,-2.361654788963115,-15.823230906132416,-3.1967488242045627,-3.4019013891895074,-14.277628632726868,-2.192338604669204,-3.8240052567991047,-4.193962672929132,-5.678974337033155,-6.260358788827578,-4.6917241606351405,-1.9963507510066232,-4.571871938182176,-5.23023346591193,-41.697669771922605,-5.974200640852835,-2.549706827406633,-3.4505388469085805,-5.116681337437077,-2.3541001378374316,-2.3196281038974043,-2.385251024128157,-5.191194330390298,-11.043248656072226,-5.29367873909551,-8.866449122121416,-3.0197479466836588,-5.737169073232012,-1.6524165761999214,-6.395663235387693,-12.54703555124302,-3.3932479660799784,-2.290527193597226,-9.034232040819493,-1.9704231084402055,-13.144726186123272,-2.5590130775282622,-5.565601551452831,-2.492042108449487,-2.6013874444248373,-2.491368897983274,-3.6030048848693212,-4.200194500245375,-7.898532201427825,-0.43680761765006837,-3.112992344274766,-15.390999330100167,-2.70968584742373,-7.1358184386538746,-3.156926350185696,-4.602952797418143,-2.0418576097088263,-3.369716159629335,-3.2046774023692866,-8.163260712721248,-7.990244299271241,-5.222781505185678,-3.699936127546019,-10.464106126644143,-2.682889674969841,-2.9370279014100764,-2.3079343107542707,-2.8451738507891426,-2.7634303965410196,-9.021959496002133,-2.900439522283449,-2.760497429546011,-13.097645232244666,-2.5309726178278367,-3.5419035283353715,-3.0661957867664924,-6.267930663471689,-3.7462129023949524,-3.548688997380957,-7.465451618158533,-34.22020863510298,-2.69081678106056,-3.8157653776062848,-3.765209291209744,-2.9264521795713274,-14.057737815826203,-2.3433044326822117,-2.715616312239182,-3.1339892669205387,-7.1674520267147175,-3.4822520183692696,-3.295886174870513,-2.423694018989503,-2.681754387664682,-4.203039573162173,-3.7958663929666194,-5.337192923271003,-2.5582723071695965,-4.825283972671075,-11.144584742078846,-7.549460433006139,-9.588182201903118,-3.2590812459554885,-3.8793070424733274,-9.159103993606399,-3.910876364798048,-4.172021063102109,-2.928094985301068,-3.0525250551214187,-2.676559278583159,-2.259604375503736,-2.581687547119539,-7.210164141371251,-2.620172885251391,-3.53467635264872,-2.7797846695334125,-13.986510957134653,-4.482224509571787,-2.562109978586725,-9.890888730892046,-4.292612221452012,-9.638595804903638,-3.810559940455579,-8.692176057870196,-2.2909416518951957,-2.1315283608292286,-2.642287945633444,-2.8023947001435388,-9.097395432657937,-2.6527149786612765,-2.902039344580869,-3.725086998446556,-6.690599004857958,-4.106931104455222,-2.282205365045064,-3.808554831435202,-2.087051109959235,-2.040520052741604,-9.661600449778716,-1.816702620602062,-3.097043005455584,-3.374881567759857,-6.857968526081963,-3.0514527619583687,-3.1144151858150133,-2.0898262919824058,-4.375164661692556,-2.8155441380225295,-2.5457264876906693,-3.949898294703109,-2.7429616547335236,-7.277545164654441,-3.968146439555005,-5.182413445871734,-11.772053742109987,-2.5949655762150208,-4.5430992149153395,-2.7400225027062435,-3.6037469863930096,-5.753406861593173,-2.5711632847738044,-9.193217971558461,-5.512280899024434,-3.2836214616006316,-7.516387921322908,-3.411290756470443,-4.2207141502986145,-4.708161727786354,-8.174450958018998,-4.590508364939217,-2.77920462685469,-3.3427586983723288,-2.5285986054917737,-10.552943606196537,-8.626658893269468,-2.894708316952742,-4.436786675560373,-8.272081482291131,-2.2499601091984576,-3.8439952751860265,-7.192254076769242,-5.051341629540422,-4.205815491537913,-1.9619120780385235,-2.98967583432925,-2.5545259163929663,-11.07003403210263,-2.613264257945845,-3.513265336447578,-4.008746564396366,-2.35581373213586,-6.961240049283285,-3.2021959559574777,-2.388623714493735,-2.9000243395182115,-2.010120805694833,-4.30786362711754,-4.026471278312284,-1.4522823798771753,-5.4285484227139404,-2.414371415382207,-9.025142620493686,-7.554465648912457,-3.038200781726632,-3.202228945873893,-6.0194825334476025,-3.2473636158221577,-3.9487709825532864,-2.7034371138668467,-3.0173504273668414,-2.2831937720237363,-10.427656979326011,-9.488042021698124,-1.8583544389795672,-6.4822689083939995,-2.7223382156629414,-5.101652921267433,-1.8187173311905127,-2.8693210012658046,-2.364543274832273,-7.314215035897773,-2.697799486792428,-2.876294234424052,-2.616409012623034,-4.831932927365849,-13.10978890394337,-3.976017297890371,-4.486291101264757,-6.847635054481083,-2.6142592648403027,-2.557368199090548,-2.64986363747011,-2.554576655687279,-2.4641541423492948,-6.522482302081419,-9.456714720397834,-2.958220882242575,-2.816383237066405,-4.512526405196039,-1.6612053955827215,-4.20481865930895,-2.625331022670282,-3.559153479505915,-2.7235289691892004,-3.5440353737779517,-8.650498134670999,-15.02064171648544,-13.564534009193604,-2.520178194016915,-2.873584579473028,-12.551035783097397,-13.871242195826628,-3.4093878568968234,-0.43599926788732435,-2.585070187563387,-8.389062576233327,-6.399861627007985,-2.4030107784908004,-2.5667855190507787,-3.7969919872050975,-3.9767044908820868,-4.42640301597679,-4.810131241976457,-2.3951561626496884,-7.236880141380294,-4.050911302221473,-3.110516940840862,-6.915430475402247,-2.6122790604433113,-2.3633624391122527,-13.549434257460794,-1.9696878319962234,-6.1011581842173275,-6.474413306428971,-5.487990923054,-3.192494046680967,-2.781737090993492,-2.212142666338394,-3.394109484631689,-11.038308863882463,-6.132095876232673,-7.1866218627078435,-2.625567239569327,-3.4932702553524186,-8.168493525423044,-2.2752269601145585,-4.270722493283329,-2.247079048093729,-2.529204047907313,-2.707926570844313,-6.107834516857951,-9.25206083236705,-3.110004421615619,-5.661559259666374,-2.6670297791206132,-2.5126720234326068,-3.5527261542927997,-3.4678176351813823,-3.6255899494085098,-3.189060382644268,-2.226797479427232,-9.252046785967561,-5.932177137687573,-5.09042501097081,-2.7085309699100013,-2.6815000508971085,-3.0423632509600624,-2.6595348146846747,-2.20077114171691,-3.0275502980068763,-6.2977973734386765,-2.5065047588597418,-10.671867528641219,-2.0725399986734776,-2.659031202662052,-3.0242068053830162,-6.070306232605617,-2.63301695754007,-2.5150950564378687,-2.6657189745024876,-2.8826375307913357,-11.86328795477436,-2.3603136912329736,-2.6899525265164197,-2.844185036222803,-3.744394561002947,-5.903388660660447,-4.8156020193316005,-1.9130453805078194,-3.1393932407053797,-2.835587870670557,-4.949945286737564,-4.399687147980573,-2.3632379419228595,-2.3471190409752904,-2.456994645812007,-3.0346287235697185,-3.9532907785835087,-3.1689302578786545,-2.5877571986334402,-2.775284439839199,-8.035829194602552,-2.6520087176275737,-2.9211135776068806,-2.3924660895084857,-10.973068935620576,-2.7025016246525833,-3.4098907520354222,-10.538493383901104,-4.616527439120355,-2.083952372856957,-3.927199511394626,-2.8522589405940364,-5.31343967311095,-1.9384629596152605,-2.736794954249195,-9.10095337003972,-2.5751049297810646,-3.3695093463875914,-1.1607406102211364,-2.1946811121722067,-3.527405361173344,-2.563551191921607,-2.892962402890472,-5.982864483249205,-3.467231994885691,-2.9396912748526285,-2.5497725646942277,-4.058488558148773,-4.551284900748746,-5.260245152134003,-5.244254187589307,-1.971832005742673,-3.5444092843489265,-5.243088644933919,-3.4343140489537585,-2.70791155741284,-3.859243636357712,-3.3552009525350335,-3.260325712101873,-8.55127638786744,-8.978155378349118,-5.596327769156313,-8.035930082670781,-2.645560753785258,-2.614362374054709,-2.954660048222328,-3.203268078797339,-2.3616730738195644,-3.408807454934058,-8.647949691396938,-3.1702036045421296,-2.433080368194652,-2.648510067143814,-2.762011804153965,-7.172820421559003,-3.7153608730672767,-2.515255683179725,-2.4135800434956227,-2.7293166714989128,-7.915715132452335,-1.9075114990430384,-6.530286970478381,-2.486709841901581,-6.541382299797304,-2.560247742558368,-3.8306989999396883,-4.270074651859734,-6.9930693183956,-2.338634750067662,-11.562490554703992,-32.45808892306154,-2.3929139290680888,-2.585851676751844,-2.6929484285633407,-3.4558120978342663,-4.879295433637885,-2.858810525669611,-2.5960505908793134,-2.7155825143916625,-4.594475319697202,-2.6971663733759743,-6.5762613853138845,-4.470064978567239,-15.076696263893668,-2.4810140800968528,-9.430597315034023,-4.316949484951824,-1.8051006640291494,-2.9022673794322618,-2.6551626403218167,-3.1366259472070084,-2.760326827615639,-3.9136663848204423,-3.0838788703945914,-9.619631215530706,-3.2581204272492275,-4.656081922122097,-2.69676311990508,-3.4088154377334963,-3.1932963144420934,-5.117320080322247,-7.051292016730546,-17.01022586459416,-2.3542844858214167,-3.1604171778220587,-10.209426499475455,-2.903442109306814,-2.307305988827277,-6.587289051632626,-6.383554721028155,-2.673925391923573,-3.083091881633813,-5.565087218918874,-6.167621146474932,-2.6210570406173948,-2.854066666992685,-5.993660081170349,-3.4888147921698094,-2.7596373349303445,-2.8530554178879544,-8.452664798532528,-2.613455058136959,-2.733945312891022,-2.8391958412739102,-2.63945306600013,-14.008637859336293,-2.2520638204845214,-5.149648336942612,-2.847374494109007,-4.246999796921646,-8.987084742648175,-7.6181051097975025,-3.2084184936381117,-2.694751363264888,-7.321034987556035,-2.6945462051806044,-2.4651052230671513,-2.0891809538022748,-2.467580781912877,-4.163912065631754,-2.104053373623008,-6.448654441645439,-6.708524384691464,-6.890141417906131,-2.6829434467782396,-3.3739365738257123,-4.645376935788332,-17.74332863261421,-5.820357547843016,-4.717881601653567,-3.0647296794527654,-2.5653935000586694,-13.44597539206471,-9.19802825998993,-3.5337260172283655,-2.638574060796053,-3.697155080515732,-6.2815678515406255,-3.598849686932447,-2.2895536856776864,-2.5538946878918014,-6.1246435645068935,-2.9752773506086756,-3.872577367436163,-7.100197474585549,-4.882023490213099,-3.037047959091135,-2.799771046049126,-2.614523209003454,-2.7118638113699505,-2.696477069778837,-4.120640986383632,-10.768875060414404,-4.863220115866124,-2.91375829089113,-2.6549356013674217,-2.7715930791268897,-2.614215072217014,-2.6276666246625644,-4.602495217170814,-2.4005724191819042,-8.601942350588525,-2.8400538256709744,-8.5818997225263,-9.498110405348651,-3.040407350993937,-2.535493556796869,-4.2418976584331265,-4.061834884728254,-2.6500573285303104,-3.3083982359712794,-4.482539465348333,-2.5113724180957044,-5.227018959516695,-9.388798665511459,-2.377238928364596,-21.686571927003584,-4.483593047398008,-11.754814934646223,-9.809036837601486,-2.333407437386977,-2.401522772330078,-4.7921265700151245,-4.527069325892143,-3.5424402083915743,-5.93141748413297,-3.802957201462639,-3.2487037878195313,-3.22647091772685,-6.702305779472601,-8.63429191624216,-10.353903975350764,-6.6275396364580805,-4.713039728759887,-3.761524219428006,-3.591592085817013,-3.2029994724594846,-4.098400771374305,-5.08876697196202,-1.98428670084995,-4.311133100530318,-4.094468433103467,-5.206103642757271,-6.027076197115708,-6.330107073276524,-2.618750257096276,-2.4383014745771123,-9.423444980734665,-12.438251263694678,-4.109983698335545,-2.6549295845737313,-5.7140654537463496,-6.501667840312084,-3.1880359101172093,-2.600068250005866,-2.6725871120408007,-2.9235194576937413,-2.617242395635993,-4.38073076802408,-3.5552973699652113,-3.9783418616706783,-4.7361723279760515,-2.749294877013327,-3.5448797937045677,-1.8663554087563314,-2.877235995110383,-0.5937695978262778,-2.784688246711225,-5.017636966840487,-3.0305151295128097,-9.619354960600363,-2.8559962860256163,-3.724521193691138,-4.642708487239518,-10.347164479357042,-4.885030749184023,-2.1386026280555317,-12.448132539727071,-2.671301417179046,-4.644393147976755,-2.825630467354421,-11.473379035298443,-2.3646976933100134,-14.739470967505572,-11.084783941253672,-4.376390165145492,-2.706616392687847,-3.1813243057108047,-2.2935058156005863,-5.071742009790489,-5.198520963815984,-2.7319145996578156,-2.9051242543214455,-6.275609639361159,-3.4914999966648503,-2.7779748259661723,-2.589791939726412,-7.571417442837818,-4.271753110296184,-6.117725300135195,-2.787306673374599,-8.0747085003209,-7.334833821180306,-2.680434998623725,-3.6668954704160948,-8.072725316776541,-3.6686437759550232,-2.3608124574142524,-2.2730579095718615,-1.397695730584017,-4.055431883385006,-2.7052145280448205,-5.771211022998386,-6.066839666253954,-5.366355418608196,-9.627671591541757,-2.726240105704444,-2.54286302917014,-4.883917469691025,-2.5386480712645687,-3.067135543356709,-3.6247466311916026,-3.983646726157148,-3.2361796353969776,-14.47141071458772,-6.99840793541226,-3.184005579096017,-2.8799050814614024,-2.47386331881156,-4.401146908525285,-2.0063632030895695,-4.582902382158542,-2.8813106584235624,-4.556840835484468,-2.9578534948330755,-11.456956373753759,-3.5312908729057124,-2.5354837941205783,-8.793256311361613,-10.384080350364984,-2.934371215705033,-2.376642126692008,-6.066096687549534,-9.720152835106772,-7.184529764061131,-3.8968755197031895,-2.853257912665616,-2.5587296464062788,-2.643290702124025,-2.9488640909574753,-9.40430672162466,-2.6886853013899903,-3.2779260547472973,-2.774451753188249,-2.9061790633798283,-2.3780152689264535,-2.7043683387238007,-2.8701179633153955,-3.2370918659360015,-6.469307704067162,-3.690782296161478,-2.63233795220687,-2.6557710714079223,-2.8749032649367834,-6.690922133667932,-6.753723881640253,-5.302188440091326,-4.91231349844221,-2.3335997987060697,-22.137554020688825,-2.5878615018602416,-3.58761409709411,-7.578578030518543,-2.533971246142106,-2.8729570804476694,-3.658789154194701,-13.296380143408012,-2.17844999815746,-2.763038008808324,-5.499387694910338,-4.962891413558241,-2.8888843500219776,-3.932837236453763,-2.7125730825299654,-3.9068861451355708,-3.0886711745650666,-9.307627236319831,-3.1704055034345466,-2.613231042037836,-3.057176660678166,-2.669172346745063,-3.006111765048447,-2.877974558575396,-2.705585008383326,-9.116213172341004,-7.412916606761132,-6.292777141851413,-3.4410218111715505,-7.69042111359521,-6.950892823744352,-5.036643606065474,-2.7146266214176693,-3.011387761587436,-2.7460700896352144,-3.18120288999699,-2.6207472088717902,-3.379359068229224,-5.848973255768338,-4.079438688759578,-3.292129237213868,-6.79096838347515,-5.003505011568152,-2.5688743537641034,-2.0671778502613556,-3.6822738639517265,-7.4231238916803495,-4.809748685589914,-2.8864802411143717,-5.583354675049264,-2.698552341520052,-3.2972160776146056,-3.266919084576588,-5.248802925513311,-3.3534842398063476,-2.6574237394333786,-2.5961436458970604,-2.6910030233807785,-2.536386387758121,-3.9379697771689433,-3.789287800453419,-3.857807558496823,-1.6359990240888345,-3.2277771968842686,-2.636074585624921,-6.208564353797983,-2.6206687884563293,-3.6843051565088283,-4.5855299278924715,-2.483953921902862,-2.5622261936538226,-2.235122100168818,-2.9548784468328533,-6.915083552505866,-2.5951692992750104,-2.035396970555934,-2.771599618616069,-3.66113267307568,-2.1167342957291146,-3.9906136479921486,-3.020316221207906,-6.93600972635466,-2.3490631383802323,-2.3907480256163827,-9.647098897397093,-1.916628951129883,-12.367165275630258,-3.3123786264643202,-2.5635077117277354,-2.1773080971709002,-13.25607901133657,-2.3970644472386384,-5.072948590557107,-3.360226366344332,-3.9712041957664264,-6.012295492697392,-4.24354944179551,-2.6315551140677367,-2.249504033171999,-3.735147899336705,-4.210211595812553,-1.9399876512116996,-14.060485427304094,-2.6658772161594326,-7.010838035137595,-2.444203884653685,-3.3285546735415092,-2.2434666964277583,-2.7079035637073097,-3.198104913995563,-7.737486455299631,-13.947184176666312,-3.283104937462699,-2.443354144503654,-3.703786458512751,-8.683415610501287,-2.7864150472312366,-2.5721850874611407,-5.57769308293158,-2.992979126465692,-8.514869085388597,-2.9857934294646404,-3.2615333093186574,-1.8578974616898543,-2.505737055305601,-4.357160868353998,-1.9001436360235986,-7.5605035296024194,-5.207765671476853,-2.8764272011655194,-2.823565291915106,-3.4443756867697797,-2.809948517487363,-3.536864960069695,-5.277935981021933,-2.5830230736173165,-1.7557334097068695,-2.766083872100642,-6.329791761027595,-6.195760779303234,-3.058092742306371,-4.402742146411258,-9.379127830818325,-11.005867802302948,-3.341968882876306,-9.226574997081485,-3.943013565765625,-7.820070688902374,-6.303822548404035,-2.5096966328757553,-2.9264906017410928,-2.481871232515648,-2.636531229955615,-3.1234812598378783,-4.031163369685477,-3.364056528627328,-2.4300575441840433,-6.016832959123455,-6.367725286339787,-6.213702801163981,-2.552480378877298,-4.02077962234703,-12.28098179298245,-2.670533099850535,-2.74248583967381,-3.900514125331465,-2.0139111990183904,-3.3620213887053896,-4.450919754452268,-2.9208049426029046,-2.5248094940666252,-1.8257018185054879,-4.217683800643522,-4.382478024311299,-7.539763004695908,-9.689566175165622,-4.893049587152236,-2.5277739384118494,-3.9809033205512914,-3.030329605646409,-6.891164551807508,-2.3963683951907204,-8.885433292284485,-7.014418340828351,-2.4202446648924982,-2.7407018105680225,-28.647691079634757,-4.060544720708924,-7.094059729017566,-13.410849515103315,-6.867801335680475,-2.99021330528428,-4.281419873517005,-2.6650330344689337,-3.5552542694490255,-2.234731035341748,-6.471507991805478,-2.7064822030706774,-2.2326337406816945,-2.4777233296545496,-2.8707549918409216,-2.0455253937579996,-7.048753474826224,-2.8644695123938657,-4.98449504451688,-1.4157253256547053,-2.624811287497097,-4.413032394452618,-9.478913725355984,-4.0851606138171865,-10.686892043940748,-2.5093046615763446,-3.231273805647059,-3.7296202790541466,-2.712971840029365,-3.675993901672183,-2.970640462492494,-2.9316271163529954,-2.6845542865730327,-1.4992202058393738,-2.9144834082468045,-4.169923639520893,-3.0701428313545414,-2.90469308705156,-2.469319518924145,-2.4938300985517565,-13.861478809733928,-11.609032309631502,-2.7121370506807554,-4.68691162940173,-7.158064526937517,-2.5918203368581354,-2.417526065478148,-10.331082278268475,-7.3960648981296,-6.297570705911853,-10.179493579335844,-5.1506264573396106,-2.580592314229913,-3.686383716982542,-2.5449621698906606,-4.76296672674942,-3.7985215648396897,-4.2270919649637415,-4.101270137178869,-4.412814429167178,-2.3883039429678754,-2.5418276114320832,-2.6813527895549316,-3.560983630374121,-4.160678117080458,-2.6495811545129855,-7.691952993551114,-5.492266340537659,-8.62192567097981,-2.710082001148833,-2.513711480730099,-2.8372228561611395,-7.665594362854471,-2.2469511871326113,-5.523978442721639,-9.121289745766044,-8.935561886917712,-0.833281662596969,-2.4070494871357497,-4.05514294918937,-3.3387283678537507,-2.7422019192699105,-3.7272638915499146,-2.330341558660658,-2.212791711474771,-2.5709266080575235,-3.225277523599873,-2.9141077643711335,-2.8286602999706103,-2.666863243650543,-7.752549250395537,-4.357839987288289,-5.511633346723793,-7.333090621833394,-3.35911570330595,-6.783875250947227,-2.682641600603376,-4.2955034812490185,-6.352763059954722,-2.6448279372358474,-0.8867850872855064,-2.6792955335693476,-4.618404254248812,-5.585818564237734,-5.162373022144876,-9.140805566449584,-2.7372721078979456,-2.516734874579099,-3.2866555918938403,-2.7076103450431326,-5.296619818556548,-10.498491005314342,-4.045679403989253,-4.3410415714494235,-1.7411788609497392,-2.113820454488141,-2.9242545244359945,-2.9336035318085396,-2.7937750514551447,-6.174614924113859,-4.671883302434113,-3.1506933442080167,-9.77618666054133,-8.17403801116852,-3.0680173286365595,-6.432965402953657,-2.11200505402886,-2.6960348097873714,-3.6127016620254957,-2.4420304442425005,-2.5049793361161568,-2.470964713021961,-4.814503310393052,-6.997921699950856,-6.273291437099093,-6.345073552125163,-3.2415935844833013,-2.330531215061341,-9.064715422541363,-2.3423993466546174,-3.818130899089086,-7.605359166072526,-4.192985161819068,-11.15257475201336,-4.4978789396886425,-3.2364234399674072,-14.499073519638275,-9.492770230673104,-4.5330990428010836,-11.950425402913663,-6.652535380596427,-2.541886296146863,-2.1868082508352757,-4.592707585998479,-9.956310584042349,-2.179309199918973,-2.4116532649308313,-3.098991176249934,-1.8592167613664925,-2.543284576506272,-3.2321363214068226,-8.384626743695675,-5.296025655011577,-8.18536489361106,-10.364949771295159,-6.5619943053495255,-2.620487422133469,-2.728244527759064,-4.6197529390247185,-4.865976668569241,-3.094301977771787,-3.1953395766858566,-2.5317764063377437,-6.372973531730963,-4.637495712302222,-2.3910904929065824,-4.810674704048035,-2.5948802453232336,-9.420798715974547,-3.5306088933222695,-3.06375556751763,-7.918376244113479,-7.716159042661362,-3.055465167909582,-3.5609408047792677,-2.2451345411876478,-5.566507820868918,-2.5914154247751764,-3.2270438334385947,-8.690016044811525,-3.309983873668517,-3.0249396077259694,-3.997364869600299,-2.405866663425687,-3.7601715742632433,-2.118715890227883,-6.256844609237625,-2.435283728025673,-5.4069050551507685,-7.655994696398469,-2.686461870562894,-5.141595608666729,-6.902548689226938,-6.211964583959182,-13.606234083967772,-5.546705670626766,-9.55558957810858,-7.420367291689092,-6.512597130493197,-2.5753203647504073,-4.790812900532773,-2.423382230922121,-7.554215528785474,-4.86220921271533,-3.1343264609060646,-2.783594209285752,-5.65781401953315,-4.289073617704685,-5.7450384960166385,-2.701863074475422,-4.506701582739635,-3.3322539016951715,-2.6947388012278735,-2.778097375687786,-6.364244115382171,-2.861389960222968,-2.457279656615691,-10.425739575220284,-2.895109351747568,-13.882329160573132,-2.676248223475279,-5.995085742202582,-3.41779722294333,-4.5363636005156405,-9.235340967092082,-1.3974002885448533,-4.277210954671638,-5.28493522604766,-2.431569276223781,-2.4965350248387095,-3.8652253425753305,-2.0928929599721346,-1.5530348358964137,-2.48643484854756,-3.5386044989063903,-4.56286029379115,-7.395166181927518,-3.422201596142395,-3.0832018301104673,-2.1086169241034454,-2.31299816858506,-2.5982024795947702,-10.932318350193553,-2.9807557809314775,-4.375057119596805,-3.7783130890228795,-2.345223934954614,-12.427343139042462,-6.889884718680493,-3.103914994918361,-6.572989971124139,-4.667955235104003,-2.414836116837841,-11.864538814369208,-13.09257990195384,-3.1849425832162304,-2.483390075495525,-2.8191364086863526,-5.661848441164854,-7.754384943127463,-2.5350610508082716,-4.026115167720666,-2.966105878183207,-3.2227169736910377,-2.3836270446847223,-2.4210028995787924,-2.2412763493671704,-2.803526639372251,-1.6653847346568091,-3.022103471027608,-2.794072589125223,-4.430094890585995,-5.250597250311798,-10.924940763181786,-3.9994107346444117,-7.611615049883529,-3.377036325274278,-2.225427367330873,-7.470657632207038,-2.7085901555557954,-5.18219778525051,-2.5303945559570646,-3.612229173796477,-9.421773792920124,-3.2479507716817895,-6.159724166475122,-3.3775195482267666,-4.8403752086591565,-3.784940656048132,-2.989000414554164,-9.71883037383104,-15.936004485305322,-2.363496043054578,-6.33802511748473,-7.925849939589927,-4.078003241866504,-15.342288359951835,-15.142570046920275,-1.6010270233317645,-2.639137671229164,-2.702670232864335,-28.489492689367253,-1.833286282381994,-3.143382537748959,-5.854333300020098,-2.6004726582612077,-5.826425828228212,-2.250125447626203,-3.18262657762341,-3.2229888996648075,-4.660026888052247,-7.675113433543078,-15.375858787776885,-3.639423933571276,-3.9149232394166855,-3.6064141401707612,-13.742642696567891,-2.9465259828720627,-3.697520463174042,-8.993482947912955,-1.9014199412607669,-5.227641088460035,-3.2363741884839006,-5.9760572158750875,-2.5385444427537585,-2.1047912364262285,-2.869828717481727,-7.955262547374842,-4.508356896246657,-2.906450929719447,-7.629995185062276,-3.4276795129763618,-4.682831771582157,-8.542600871393669,-2.7946525347328355,-2.677523196573953,-9.27445711339644,-3.0081514138588967,-3.6353693226615644,-2.918605701678323,-2.931638563985609,-2.80790634956415,-2.292916656957143,-2.0745787597285728,-2.4380176041169594,-1.0018748267881026,-2.698678560999949,-11.081547740258426,-2.1371614983149314,-4.311897657173214,-4.846135981183856,-2.6087831629446447,-2.913887631719156,-2.908765565537729,-9.142720354168382,-2.4010279489678337,-5.466711973571581,-15.21896900120481,-3.5910406762800138,-9.2265313965095,-3.346129842117862,-3.3546772627957826,-7.088861968289611,-26.07900192985568,-2.6079345287819575,-4.110542685241382,-2.6142941313284975,-5.9196737512365925,-1.2609671543603445,-3.2867391946415423,-2.494164055044769,-2.9009757234858053,-4.842139506655334,-11.079276450341608,-6.562212103642925,-2.6923211328108687,-5.3825488275365165,-4.093721413389192,-3.0450758026193525,-2.6278882044333334,-4.609773580799099,-3.852201798137159,-3.799516575920904,-2.4209798474932276,-3.5863841580262137,-4.8675931083987365,-0.4932084549177042,-3.029041868270631,-4.424041799203513,-5.759505393729418,-2.521953418769186,-2.7907762939881584,-3.3659569491652865,-10.69951651243399,-6.353456591180621,-2.4950626163061598,-2.675734556411595,-2.723147838400269,-6.05825644547201,-3.0131076470123066,-4.4590280335232055,-25.412082964474724,-2.6177478684782463,-2.7352087860956886,-3.1558432591973378,-3.588826117156902,-4.1492551332496115,-4.647338575154641,-5.8130496892913035,-2.807519520003461,-2.4191203066907185,-11.590172143030298,-8.008293134677551,-3.475358646472403,-5.590329953654169,-2.721875597869102,-2.6209067387517266,-2.8201598630566167,-2.8189879147105867,-3.108526659830834,-2.591672522319916,-10.502677369554602,-8.8733640556224,-6.271402096072252,-2.7625333579699345,-3.1275841432858074,-2.681505797796233,-1.703172068853834,-2.6488564925234295,-6.243231178483615,-3.0197972935813437,-10.110726271692416,-6.971226380159321,-3.952773733726473,-2.7388507131799966,-5.393349793720725,-10.284924054202696,-2.7585510242214513,-4.986519400773595,-3.085049826966897,-10.667558210710485,0.24648672222740808,-6.175909194612674,-2.2942056291563886,-2.623434942824858,-3.1644860171764138,-9.283816062403648,-6.9564371877526,-8.092415105130698,-16.36203749008005,-9.18462652447151,-2.3894637300127033,-3.296139570964673,-2.776273634902756,-2.2356421048917867,-2.64677920489568,-6.3740940123786345,-2.660495583991301,-3.3906313745714507,-4.13602843246263,-10.512381098787495,-3.5734871350905606,-7.879149701444724,-1.2301969156983776,-19.898096554438396,-2.9144520946778973,-2.754590164950506,-2.390197289680237,-1.6811227487542997,-3.742766932040115,-2.9459721719189704,-7.980501662664034,-2.1565049324536556,-2.5802764458511094,-2.247632743582122,-3.2193037238848077,-3.0828392939571896,-3.7293635167807837,-8.112757810990965,-4.9211829261544535,-3.1495325633490383,-2.875547209277867,-7.835586353730982,-4.261190268542334,-2.8229302250426223,-10.641034235448624,-3.5313354320762014,-2.449347354950982,-2.988697429575131,-2.7294869883145236,-2.4909965589711067,-14.639791618826518,-3.8634821277557734,-3.4041788964532693,-2.597009383940224,-2.570861808737946,-2.558971129595722,-10.617421391961011,-1.9092649750212622,-2.5835648784681062,-6.359975514995114,-2.0813008825966253,-6.433731040131224,-9.204100438392452,-2.649945434438034,-6.888072228845402,-8.195469636386715,-2.8016295838014007,-9.627263076459386,-2.8331396077875413,-3.0039729986435,-7.261659834819125,-7.230121217500439,-2.774980933135728,-6.461659445321116,-4.346496114702925,-4.839220802995449,-5.029964725940796,-2.591938885570818,-2.8082930839069706,-2.4801954034550637,-4.830527221891419,-2.661692616152867,-9.471602307866945,-9.559806556329283,-7.2877437024018485,-2.723975435459477,-3.899395480239142,-8.108214442221378,-10.270631813463101,-2.1186234589473627,-2.772883992756505,-7.972776366178277,-2.2620487101549944,-3.740649247714373,-3.82154696344748,-2.775671140642019,-14.762904937720743,-2.3739451399526255,-3.8457135155645097,-5.064503429439374,-5.909625154754704,-3.2742030857380415,-3.778131342956271,-2.756589862586595,-9.999162380501053,-2.8014531801016456,-9.701282981849461,-2.6970470465946588,-9.443389576451576,-2.7860779740042636,-3.6217934764676194,-5.74192871759556,-2.6633506348315303,-5.487882857416755,-8.92747873399017,-3.6838526182891647,-3.0907898890012726,-4.592115067999516,-2.0638730731095016,-2.344392371453401,-9.712727876793581,-4.527691559521602,-4.864957257141113,-5.2980249141801785,-0.5211407378208341,-7.194920821669449,-2.6893290336958646,-2.454653145839821,-2.6177905979595555,-4.723076396556028,-3.122981300913148,-10.119844150983262,-0.8360263788502922,-3.78564542722065,-3.7723436259930754,-3.431003164138741,-2.8116107169338673,-6.359193450341379,-1.865052194792833,-6.321276097090189,-4.53120708327015,-4.499801587391968,-1.666969516622867,-2.5172290234416512,-5.407974950321364,-2.676010309210176,-2.4631257659189694,-3.2412733520235637,-5.275751737707304,-2.5587539648122033,-2.977314231428591,-4.181150148938698,-5.294967219925155,-8.82252207942676,-7.192525104000133,-2.716033685774076,-3.8888734993500274,-3.116399615483893,-2.8749040301719715,-11.01843200743929,-16.067671324885318,-2.948428725058117,-3.4916416481254418,-2.5428841904885124,-2.746397153734381,-4.789533090500584,-2.3526596244093603,-2.922326996039491,-2.6885319067646103,-19.240798948182057,-2.780790425533588,-10.268732464851533,-2.3912314636849836,-3.7277377390962387,-3.6676270230000614,-7.585417732969221,-4.955496650785128,-2.326124232313039,-2.668821606403891,-4.1411408817383055,-2.735110062818713,-2.9297846921296373,-1.6641462359955206,-2.282103183440172,-5.00866084203023,-2.467758035626654,-10.632225109702857,-6.132511684378767,-7.246001887322987,-2.5845998200907663,-2.534379943877514,-6.581484060886176,-2.5066272387042043,-2.743084026604079,-7.812873043701657,-3.84918755850094,-2.5111138915915694,-9.942725927596511,-3.2786158802756615,-2.2867063751100205,-2.5213255205962333,-6.708717301243373,-2.8762484613443173,-5.739715259899238,-3.088298642665115,-2.8323534611723975,-7.408718645068696,-2.797703997622094,-2.7259992336763754,-4.672488507068182,-2.531845095976665,-9.360996507662515,-2.853819167271465,-9.988941871208649,-5.093309267911536,-1.7253703726216285,-2.5530088378019453,-2.3221980464216743,-2.7216412638112275,-2.7291137276537496,-2.6549016981479845,-3.992083761447788,-2.4672753900163533,-1.9743469371778728,-2.085387457575689,-4.220944435726712,-2.8112324502809636,-3.5813011863918787,-2.852043324527968,-2.730474259123098,-2.3443396635290745,-2.7010582294438366,-4.154146035637305,-2.3188504295336956,-3.911075851539291,-2.952372696936531,-4.522680665148737,-4.584978691256817,-3.7393249458305924,-1.9436814375622617,-3.0394611340013333,-3.7177600952895538,-4.55185497161946,-8.752892901851864,-2.4139399304953533,-2.142760956129017,-2.2223638464358535,-3.549792618466665,-3.351124604031166,-2.538088680815413,-2.5088891161895597,-2.6939973326474282,-7.9269861325134565,-2.3372779867519977,-4.747180941042272,-8.693023673463568,-2.737685283452166,-2.964531873615684,-5.727283157568508,-2.457788177360903,-2.1165880354466147,-3.7780104864822484,-1.877486813351371,-12.302714777727715,-5.76108664174527,-9.315389572517915,-2.7602510628390475,-2.753636106144102,-2.1264194637649587,-2.6421589224078432,-15.65019608622419,-8.057077858229663,-16.204889413676735,-3.134820442332906,-4.585332732384055,-2.7189633803306563,-6.335263586328049,-3.142444870131021,-8.12036598022707,-3.470108880462267,-12.284836821060438,-4.842659512263595,-5.482981246222283,-9.394006399597266,-4.277899754487911,-5.6573030899558265,-7.968295394279397,-3.5856584210002813,-3.895758962963731,-5.600898950118767,-6.424613216051952,-6.060914558534657,0.0684371915647104,-2.6638944701083185,-4.5237163624085195,-6.829249616041126,-2.513872189125727,-6.5663592488597615,-2.731215395980006,-2.2532848327214663,-2.7996299834017186,-9.489794108898549,-2.7004983729807535,-3.7581418855031323,-3.4001545710035948,-9.02648859923773,-4.376058573341826,-3.5507894484299563,-5.570716648374239,-2.7928687111748243,-15.040455917263575,-12.598234330932693,-2.6391294377119765,-6.058738819692937,-3.1635564305305857,-5.121277898462418,-3.5089759799485223,-4.381925254562446,-4.971915883357752,-2.1412121089189484,-2.211709713851553,-2.6869630043409565,-5.359761583760384,-2.6000805856373987,-8.03751756852293,-3.4453113169057445,-9.484342124776932,-4.8668187330682615,-2.4805985518313114,-1.660039405774342,-2.6591079627725853,-2.8491200749338073,-3.6998198009218206,-3.3070306777685388,-2.3540785304300536,-2.4118898517983984,-13.38207034103503,-2.823339030614852,-5.3732124953033455,-4.263175547589933,-3.6386145595277863,-3.2998828719631086,-3.166496867735096,-6.9003301261252386,-3.952580031973346,-1.9560166442258318,-2.457761447816651,-5.092173253985004,-2.762207483113196,-2.594274241521472,-5.72497751813734,-6.057703629718759,-2.612752536650668,-4.407032801332013,-2.780960356822453,-4.015767371474047,-4.7072689945229556,-2.8876377740723065,-3.080883959687668,-3.16983290475605,-2.621763764046112,-3.152510554879081,-3.139596162505438,-3.8912925933129556,-2.5022776081514095,-5.132510538713946,-3.061656560638733,-4.247139335177912,-3.5121501815272334,-5.7361808088736055,-1.6243519017228154,-3.245288928224908,-4.812440234088159,-2.6973565304814824,-5.188648000885161,-2.56247786769031,-3.8928705332258255,-2.8361505622700256,-2.4199751618311653,-2.815986066960045,-6.936562999031858,-6.379148352072471,-5.37401171105265,-4.591674309911482,-3.184027243527769,-6.446417813995197,-4.393037459968475,-2.7336322964002773,-4.622586377550471,-2.9714093351155153,-2.6984116585877658,-2.718416253602092,-9.166284521736374,-2.95365046390673,-2.6487358771826783,-6.416645413581268,-4.06414363445192,-3.094973764840899,-6.3313566021492225,-3.561605821371236,-4.010118361651536,-2.9951078295637545,-3.4217361771605583,-3.183036335603099,-4.416874093866207,-11.314432109167136,-4.054983662417951,-3.2371781721337833,-4.348733552264283,-2.8561075787174808,-13.715749857600551,-4.258520761019803,-4.759463116379893,-2.665269440086173,-2.7094482667052158,-3.273256516196701,-2.4449361292229033,-8.038709712480541,-2.950795219899531,-3.3111460327005466,-8.063573567492945,-2.3545028922225995,-2.019461551257111,-3.9396693075596247,-4.3769226057012185,-4.121781209204556,-2.6289048840888225,-3.3510848152946537,-4.146188387234854,-3.0615424520565173,-2.264144127331407,-7.210076979190732,-2.467853128911841,-2.2507874679796003,-3.8493296068483676,-2.608072021598467,-2.2848171245654685,-15.004326072783845,-3.9682364282367084,-9.816152119985075,-3.981032877609918,-1.86509866422699,-2.436845550912795,-7.9081490467065105,-10.317544245176757,-3.4184168864675026,-2.6247352029581306,-1.129515867258568,-3.262306049682999,-2.836670169235922,-2.8952838095440874,-2.2070892719269466,-2.10550974227239,-2.510948345411574,-2.479368766951972,-3.8774781577496005,-16.270551431995827,-2.1871204099685273,-8.269315309170546,-3.1953904386979324,-5.05623159268063,-3.496638899803677,-6.786818774945447,-6.316233926269031,-2.6301585959568112,-28.941153243728184,-5.227567915197569,-5.2841717533982795,-16.039569730650676,-12.01276872687846,-2.9222195338110764,-2.727651381497562,-8.795272722929647,-2.429912125456949,-9.151459698531347,-2.747319576274784,-2.596812599152964,-2.4690997304242317,-2.709715566550343,-3.1447165711290714,-2.379466231319599,-10.11114527588465,-4.548557830302462,-2.731765915630564,-7.497604973388743,-9.115971331197194,-3.734844426499146,-3.946609599241821,-2.2556110115224683,-2.4987755534683096,-2.697771450981556,-2.413284935512928,-2.4591792437064837,-3.7221362968048193,-7.2687823504657585,-3.8938099978006324,-1.9908718669984373,-4.244883428404511,-2.9366609562703077,-18.740033512107452,-2.593860975461805,-2.4063149092929055,-4.127322859026247,-11.729868603008043,-2.6632357743737267,-2.829784964794352,-2.846486814955899,-2.3282759310644114,-7.3601630471207224,-3.1326991080799567,-2.3164448985089066,-2.5597715527329012,-8.689766373568888,-4.186027001832619,-3.1918296189298663,-7.489735575316075,-3.2015935264736326,-2.493731104862402,-3.94967193395718,-2.9899383585603734,-2.611776033808351,-3.594760439797078,-2.451328391356609,-5.81194280593737,-2.25115148855568,-2.5053445394541396,-2.415909641795558,-10.785999903531607,-2.708054649523465,-1.9221886572122533,-10.559186023124699,-4.918752634335108,-1.6207655414009499,-3.870917769460568,-9.642666660035072,-3.2182442622154905,-4.353394585298079,-3.4573856367521816,-4.010328576288278,-3.7529392420156666,-3.2435537593489236,-4.577082222780159,-2.5944406578793298,-3.049791416542333,-2.448625531713929,-6.092171797638331,-5.610601479145804,-3.284759352793728,-2.8450412741252293,-3.8664215636468775,-2.829516211559556,-2.7858566030678773,-5.137775117464651,-2.262495344792496,-6.331196685395284,-2.9181026887398622,-6.429237685566552,-7.682873224921065,-9.254985739575327,-3.917408682254849,-2.903774372862759,-3.671293261750953,-4.863643267051436,-2.8621986080349733,-3.3371061803129534,-4.886420278738069,-4.302349368770442,-4.943994674616966,-4.41022605261907,-9.398130841739349,-3.598315837742713,-3.1674316752492633,-5.806496945346679,-2.5561647555665585,-5.779077498215694,-2.384810566185435,-2.7320791225750503,-2.651092921212901,-4.233672056095793,-2.701508706275011,-8.489702374557995,-3.220335074398695,-3.4059311879876666,-7.122288731368205,-2.871140832007323,-4.338047590705789,-2.1201314614379436,-3.0552542660233213,-2.0772674672141647,-4.198937680119428,-10.435333905840837,-5.0921978775316585,-2.6624942017799076,-2.719708304893005,-3.5814674718583404,-5.68311534924989,-4.775412069116287,-4.891600657304701,-9.805769657441976,-1.7975828320274716,-3.2174831102212234,-8.91144335308586,-2.406038807541145,-2.7899830021175562,-2.05748488775588,-3.4113463761866516,-3.436850558066279,-3.712263216991242,-2.3981469404235654,-2.5957698123764703,-4.604636480816902,-3.025275170471597,-9.921486262240496,-3.5726783416761063,-3.4627172333634326,-4.147127036796435,-5.617055812678616,-2.687250009333854,-5.128711801829022,-2.41431491906415,-2.781772711686639,-3.8138462953805154,-7.09377615230761,-2.1941678318928513,-2.909797678289941,-2.660671683443379,-2.65709136801501,-7.914600112726959,-2.9440278704764147,-12.826916340767628,-17.71429172150241,-5.642978089940238,-4.430089099953951,-12.69917577142868,-2.7458215982400893,-2.7660583745841762,-2.6440071333771344,-3.3464639222852717,-2.695769852312455,-4.545588981691429,-8.473624775212665,-9.828406749025145,-2.489966227056479,-4.65634441023746,-2.4963312076732898,-6.399083586341533,-2.8430859936224206,-6.863125418566629,-3.209118162537454,-1.9902211771430989,-4.540606510762556,-7.133749924180732,-2.721889764816546,-6.189897391652505,-4.63045094990869,-13.680945266407733,-2.735739682224349,-3.4685982651743617,-34.74919474451514,-2.629050052071695,-16.76902412435679,-2.593791309941866,-2.0366869580051463,-1.9071978396312153,-2.981610581498666,-7.556916027919613,-2.399089850113098,-2.62364450868833,-7.831927804218347,-4.80984413677999,-4.72343361402115,-8.441283215461654,-5.326084182041134,-6.932599207079084,-9.899311946200328,-2.6886625953938403,-5.056548681450761,-2.661917512502333,-3.3475430653667297,-11.58640043491594,-2.9449058677996547,-2.896040885407659,-12.775013254344472,-2.9966391887789863,-2.7024661293351753,-3.0151851886360204,-2.7602335779661855,-17.189818149846744,-3.6626297641943313,-3.4096865619467702,-3.1301003758671793,-3.1246645846686905,-6.204536403683066,-3.2036791064041172,-2.645647917171906,-3.496858719699654,-4.477556503748245,-10.811968827963746,-1.9879783387089836,-7.025966883411755,-5.04957488763508,-5.3326698641964825,-2.733725770499758,-2.7413162349142493,-2.5190098122135063,-2.8497594597153295,-5.169704819889939,-6.099166450671034,-10.033558616415167,-3.372412123133703,-3.278430396261096,-4.42171813512706,-7.296596023498406,-2.2495733115104866,-10.214382725431948,-3.1158065491251143,-2.3854926528251372,-8.86852115319945,-12.69636640214681,-4.225008673132028,-2.884796405912427,-15.722618236404212,-2.960108930377825,-2.5387915994581918,-9.805102956106893,-5.917504626950048,-2.717645446512333,-5.823295441737273,-2.5680450501182692,-3.7941986930124,-4.119495335331185,-15.725923196083633,-2.38664697015955,-7.792629628796835,-3.159765737398373,-7.371784036320412,-4.314848611826109,-8.86946953979244,-5.444023823103172,-2.6704459055200966,-10.017544460761513,-1.599532791826225,-6.9486164566407185,-2.555413711734043,-2.706755464422072,-2.687927180005493,-2.312684126377073,-13.136309960220123,-4.272378378457595,-2.7198585866802647,-7.520443264499236,-2.1719093601099084,-2.6420396471387773,-8.998060293007379,-2.1231841360409955,-2.1328382302860995,-2.3640657609305866,-2.760561100423748,-3.0227507165906085,-2.8138805591131506,-4.454609184382762,-2.965504490996639,-2.1049437179089776,-2.358773319324424,-4.819000722942297,-6.326405835630919,-2.6186657351142366,-5.7512471561257,-3.0041297430795764,-15.001944729429754,-8.923613466679232,-8.048669154137668,-9.57108401215841,-5.227991588594534,-4.893317066295567,-5.9071176740852005,-4.067025974528073,-1.4043446488313083,-6.721187624280439,-2.9184306671064757,-8.016625886067702,-2.778304124614207,-4.044255960071048,-2.021220505924283,-6.775540823646479,-2.614767090786738,-7.902661335857761,-6.791177432252633,-4.556855196294552,-2.334712531832656,-3.509889672553757,-3.0310655816324,-2.738512366174982,-4.75607002968793,-2.3356271731251494,-8.271975606683078,-12.246904446987362,-16.455429425133293,-2.7225092519366743,-8.793520162182498,-6.4455741797265915,-2.647621478230368,-3.483965264594649,-2.409045056519153,-5.842064444163491,-18.937256782465006,-2.996239081123159,-3.480292636664422,-2.4307280149789783,-2.381223428152816,-2.6655248808269953,-4.755121808890122,-5.04732837657617,-7.788634508594933,-2.223050868109151,-2.4938659043672233,-5.059990913972367,-12.560136846590067,-2.5129926645206986,-3.2632689611396133,-5.885466368674521,-7.852085277125114,-4.078298990988794,-4.462176122370593,-2.5810312433792086,-9.830522190789688,-3.466697288543316,-2.5120481870156257,-9.252799637216427,-2.9297943599545313,-2.540504345569566,-2.7092974732584687,-3.0867746857747314,-3.2061884390060023,-2.643729543996873,-3.9239700715872576,-1.8190823115392338,-2.698915565036946,-8.101592455889037,-5.255444090131803,-2.418064608880599,-2.342725004343741,-2.3373268884720644,-2.814368173785363,-3.3701031095020575,-2.6542774778330958,-3.8068798077100223,-2.023549264209427,-2.513629017232235,-3.4392953920264597,-5.772574584171402,-3.362933329571118,-2.804588229348115,-2.692553227674138,-5.0818225861221284,-9.298732151844987,-1.586255360374314,-13.55816903107611,-3.285186517019924,-4.48921609993593,-4.667015768829307,-4.0259136217192255,-3.5285512190539583,-2.783529377545144,-7.0534440233221325,-4.737616866047387,-6.085123216398352,-3.0301099247195005,-3.4389960264859862,-2.6817887642413725,-3.4618068582356147,-3.5170400094413665,-4.727925985531728,-2.4199183821464825,-4.333447843618743,-2.5049306189502882,-6.50400185213047,-2.2883700154202398,-3.1524700850476384,-9.82356767847196,-16.07269663081708,-9.493911269400783,-3.0291740941804504,-2.7012723111142334,-3.4939086403054764,-4.7607149147878935,-3.2280595836354125,-2.812697530294988,-2.584829279940133,-2.567112944286106,-4.990374776975445,-3.1984590624066356,-3.5402959731414456,-33.78477507390963,-2.148237506241529,-3.2898434303866737,-9.739731467569609,-3.1747800643358075,-2.5195832868637575,-2.5027437113698694,-2.2507152414631406,-7.802621763090222,-14.028036908794885,-2.653837871335581,-2.9630043785675664,-12.50482999367317,-2.4851522106417963,-2.5117670659452083,-2.785326575343041,-31.985408025565857,-3.0315330410047454,-2.842042578125279,-4.876983713033233,-13.860068543128776,-4.111064650244514,-1.8001483577582396,-13.880124178754187,-2.4510632621996975,-5.814718324485153,-9.218642710791087,-6.80934248517133,-2.1440672448931783,-4.5699039888474955,-5.752281256939302,-3.7741785017998972,-2.224154431459895,-3.521805022229086,-4.20267369334953,-1.8862889362939992,-10.11851517765547,-3.7489923977431294,-8.843304907205873,-2.7566136523924354,-4.9847240198602805,-4.055573134540693,-3.5435634575621116,-2.627135561187006,-6.715716990579668,-2.377007493218712,-4.68182193974009,-4.023839626046936,-3.148822497633339,-2.969139261948929,-2.5580248151594467,-3.3154741273528567,-2.7485103378058304,-3.266663179140209,-2.837522459244879,-2.8536111256919052,-3.6159492144154366,-3.5091271824251704,-2.6134995030215773,-2.7222218830979967,-4.649936174956933,-3.650715108620739,-2.91218431067771,-2.244926140087896,-10.05868430842965,-2.7161866915238075,-2.478255175885039,-2.5609711082111066,-2.7604081141816645,-4.471777726487697,-3.954844930601194,-4.311007934222185,-4.322897367299124,-7.998314099958904,-4.424476089432458,-2.5639968996118827,-3.497452567135491,-2.105617097436319,-2.9150778507301545,-5.752411198517784,-4.853895868649167,-2.626379640126733,-2.4635425564152498,-5.873634900258594,-5.239894560117133,-4.015852990133554,-2.7105233477574964,-2.7165970587042256,-2.5701736761681286,-2.355784284532091,-2.4801050194929637,-2.714169140519166,-2.726787138703171,-4.19590854658945,-2.4318161063933905,-4.741340077605488,-19.668118604029875,-2.940719506603969,-4.701403697043216,-6.7527060173421445,-3.152060499112758,-27.389126205066592,-2.322942611562112,-6.48264680738694,-2.8767701839185458,-6.776406540721225,-6.980208245685338,-4.279210607248763,-8.156382835130485,-5.346443085375876,-3.48253311380303,-2.9453113472437127,-2.365354390787342,-14.693782518379871,-4.503339004655246,-4.322862055768436,-4.819806666132392,-2.7034692424565097,-2.8311858503874268,-4.308423585170197,-2.517535452528382,-3.0004963749810862,-2.759761171887083,-2.6846967515767544,-3.4831653701750316,-3.0137896149337084,-2.8863680512589203,-4.936960544276126,-9.786238467102017,-2.5179710478686284,-6.381045708846981,-3.1704602953971848,-1.415168458313224,-8.64343031593913,-2.3914797181642253,-3.5019788745148968,-4.983147899170442,-2.58376748390926,-3.021162860492624,-6.343649248271827,-4.090112288875949,-4.097958166710963,-2.7206947050643406,-2.8493636502157815,-6.891517141707183,-7.241243495516391,-22.58922828632178,-2.141975320221977,-6.972814970433705,-2.6752600753209923,-4.268595030342761,-3.2339148506119173,-2.331658023667298,-3.2818447146737153,-5.737593911947717,-5.61195768964129,-6.291362223768296,-31.4886017814367,-11.322632116394686,-3.036962571529572,-2.1120849448667864,-2.518556406645567,-9.55787508848447,-3.655163370692936,-2.700989190144162,-3.7761719195687466,-9.215856598062569,-2.86956408136116,-7.656976030028401,-4.098798757200782,-13.337371697640483,-3.5336182068308792,-2.651867459178183,-3.5579129970105665,-7.720685708425489,-6.692047410393314,-2.7846230160388656,-3.2899885865843492,-2.637392932098953,-4.438003322800361,-2.54180028488541,-3.451898959532591,-5.508537891246633,-5.843631964713721,-2.7970988427782224,-8.495162827850768,-3.0790529970795,-1.4137702487010206,-2.4068927409535665,-5.2824030126920265,-12.325996268195118,-6.183294937482171,-2.8058240969755004,-2.97435324409096,-7.785820678950031,-7.919912677248866,-2.9417155111482547,-3.024033211349333,-9.503973760847447,-3.6841772694889032,-2.117991936702819,-2.195721138626533,-5.901184106691719,-2.103367912926647,-2.805175981205634,-3.284085896984845,-7.295034505549281,-3.1621926903128497,-3.971012704020911,-2.9388399853032983,-4.280044623567659,-3.0373508119230475,-2.7650901474627254,-2.5850051504320333,-4.467914710259403,-2.558117485459397,-13.309741622859375,-7.643561383784094,-7.2017422019150805,-4.260718159112661,-6.449068079541524,-3.5666765602875024,-14.251043528434764,-2.078351359553023,-9.947925167792691,-3.7429080774433716,-8.040420233072357,-4.125157801434816,-6.653639119046252,-4.122748645141308,-2.7047727967464046,-7.887473323561506,-2.3767709094405665,-4.047922598894162,-10.313210450647505,-2.2670828507363687,-2.731677594502515,-2.876526732579246,-3.3929810664089346,-4.0481875509798435,-5.191484043228513,-2.489110264223854,-3.0928230346018606,-10.782918916608137,-2.6596820179376026,-2.690115144012806,-2.099473432021778,-2.861097150487638,-9.083416907129706,-5.514396141486258,-2.878168032660823,-8.5446905462242,-3.346392325337016,-4.803139277727302,-2.4987751044003343,-2.680060083057234,-2.631195384136634,-16.919347681626324,-5.794246931055763,-4.940518637566333,-3.9635528450580626,-2.3111864437626726,-2.8478460923931106,-11.016159588773357,-2.3928706959958466,-2.607665933354131,-3.4322712585404327,-7.418643958964438,-5.757823744298451,-17.0474397701945,-2.673924377423706,-2.595474358910656,-2.677925617796462,-2.9382456380779014,-3.5150828746310276,-5.767562049302849,-9.876526756455759,-6.238408157852534,-3.0222350184021387,-5.4614601798566325,-7.358514649996952,-2.7795773519720397,-4.9117505668420876,-1.970898028672313,-5.326827529321217,-5.079516968530164,-2.7998103272276653,-4.663630699809761,-1.963326162051878,-3.0214852266684806,-3.3515174732737876,-8.161942650079064,-5.4740295139456965,-4.229168009803101,-9.124640882339904,-2.9871737932360576,-3.277097761598239,-4.174868569769891,-3.936790598533059,-3.194307619759422,-2.9704720861257714,-2.9400041060983333,-2.983710546397955,-4.1426126276196245,-3.1743668850112803,-2.7774425222225165,-7.3302142569212565,-3.290400914175116,-2.0769910441723627,-2.807642409185344,-3.744571174525552,-3.949407150740009,-2.157737912881718,-2.3754857495541084,-3.2388694614495908,-1.2151343905326595,-3.6947196944666905,-9.408893455644503,-11.950975827496332,-8.261520427290517,-2.5794073256143593,-3.337450555455909,-2.8703223671982037,-4.308205295856869,-1.9668412257392407,-4.815728576464082,-3.580858681103473,-3.2715038441254647,-10.033931587483533,-2.036224400538359,-7.950199636404053,-4.084147416279991,-2.801532873510923,-2.536579952639106,-5.52787159348585,-2.839501337005967,-4.473762565994386,-0.6631025061418829,-2.6780188479723326,-2.3130320962461917,-2.277736069986914,-4.008027935045031,-2.516209400903299,-2.5497799197879063,-10.978141579110817,-2.828243591815306,-3.0692715311075407,-3.9320320056490017,-2.859505255350007,-2.872768064542141,-6.158765905341709,-4.639763992898034,-8.73851283017352,-4.347110272397246,-8.129127507874445,-4.862025073450961,-1.890647148128616,-8.278074789128606,-23.009119980381758,-2.6340249360552077,-2.772426200274046,-2.837894652691591,-7.8975787356632186,-6.793519311907753,-6.334608252312869,-2.8427388135774954,-2.4390600468592734,-8.019113697661346,-2.3992461453375022,-2.921677051195818,-2.5863840512025695,-4.878822723293535,-3.871584518257203,-2.4923076549919587,-9.741741398747974,-3.27414025803463,-2.850161107549071,-3.3299780387860336,-3.325808171819906,-3.3574255821426524,-2.254921874567624,-5.279065796329853,-2.2492282828925774,-2.7116882512216742,-3.6201821494330675,-3.9981464082358107,-16.64805195144567,-4.601961823511093,-6.34681812346774,-2.880884940458194,-2.3671393573304407,-3.3114849505568738,-2.4592895975588505,-12.44311438379061,-5.927542628445257,-2.6297445593439965,-2.978124986206981,-13.725622828136343,-2.7186302542015164,-2.5671350801780073,-6.500365727155952,-4.474266496799913,-4.820667894774172,-2.6275560129421804,-2.747269479949454,-4.019159742988224,-3.7353270523882713,-3.634730421595628,-9.250649561516008,-12.408310255121034,-3.7541861183608027,-3.1977974531218156,-8.221190594636186,-3.523582304145969,-7.339355340965717,-2.7167451444922346,-2.6128359169804947,-10.061956930994288,-3.6083778420200785,-6.354525224226347,-4.179201893243498,-6.853058626424133,-12.976749001754659,-2.4658124698119406,-5.435109553187056,-8.788382659998778,-1.9678017109215977,-3.055198970150022,-3.6204766857095922,-5.5279731581535785,-2.0430863093558704,-2.956454487093415,-3.520360446782941,-1.8056053581646716,-4.6047390675076345,-11.137815013005776,-4.612544636996937,-2.9819112909120093,-6.05219913601247,-2.61252250003983,-2.9332998303149123,-4.281561932839843,-5.332919678133912,-1.592624938333612,-3.129218635241525,-3.3248374356058714,-4.385523172361945,-2.1794360662983348,-6.891253378918771,-15.365016785953522,-2.8902181434999448,-2.320919085050347,-2.595286613901725,-2.8495543212162238,-2.6573056460445863,-2.153932516088766,-2.1327317407363515,-8.192599347860227,-6.37540009189537,-2.700702855748719,-2.7909032517936914,-4.024360058502472,-7.282357779164951,-4.329023748909664,-7.1881753174479925,-2.8044244874532938,-2.701600229434157,-8.910028732445639,-3.3349850947530797,-5.717410505221932,-3.377963721799842,-1.9447802908816407,-8.405596578146648,-2.2263977139983844,-4.551350712788383,-2.495727480965942,-4.089729363855817,-2.6760756211140695,-2.868054285897302,-7.874116616141258,-2.491411806792068,-11.018994411357337,-6.601431102410925,-2.610872849189487,-6.736179658882412,-5.373505152833011,-13.661092740902918,-3.459254208472645,-2.7370023595059685,-4.591618426695814,-6.342428315363562,-4.328086997819971,-2.9420022071643217,-32.55088999862561,-5.707939920537009,-2.5348220157146533,-2.502875350044794,-3.451835008838186,-2.182911476278242,-11.851948410897682,-2.601607655764222,-2.342550059490608,-3.963368255476615,-7.038024039993639,-2.0595853643310713,-2.648423649763561,-4.003629790240614,-3.8345249436815854,-7.771025193000856,-1.9910277622565364,-0.5008282632664867,-1.9845178026076362,-5.741070392327026,-4.143144461024255,-3.9822807375396607,-5.30728936351268,-1.4785568553691708,-8.182156925392924,-2.9120830101766537,-2.5097989336178275,-3.2499772628838106,-11.091721005870994,-4.902802524929415,-3.459578454111689,-3.4119843445614957,-3.499622607423866,-2.4184265130110125,-5.099850790685992,-2.651996349434594,-2.7358865983257106,-5.014404458869082,-2.5726710495619196,-2.7142160064476193,-6.061683811613554,-19.858069658502004,-10.633780037011288,-2.550647765482192,-4.231034337837542,-2.1522701650343663,-7.841173529118702,-4.221028022202622,-2.247812629804419,-24.986706746279133,-2.8825079043269555,-5.043771471495316,-2.8247958463500895,-3.0746960487521124,-2.4643331592603697,-2.6066376289174977,-6.82659358903839,-8.281898409485187,-4.6229346473400454,-3.0736317008990737,-3.156253071437652,-6.025069158915334,-4.9945205372629875,-2.856182185225898,-2.852065055336097,-2.5980342685804296,-4.209067210551728,-3.9954090075068844,-3.1082111501336325,-3.6137278755111435,-5.62154724023512,-4.365414262209522,-2.5858730013299756,-2.5996777440195125,-2.626808170629731,-2.6419574073201475,-10.70956560406067,-11.108343551776306,-5.057597327460514,-2.000767299270097,-1.4413888424642893,-2.8969081281756464,-14.236775143706016,-2.4631499593060378,-3.84523077014706,-3.958006082723564,-3.9084812238313322,-2.6561035083191173,-2.6764385641266646,-2.3113877547109056,-2.996513178832566,-3.710760240103925,-2.481645069966323,-9.624460160743945,-11.191990138936179,-5.318638210731359,-3.732736707495219,-2.558456220590034,-3.039775337496331,-7.535623098914132,-1.7162194928140808,-6.906600015355258,-5.313801875422055,-4.2663609862752025,-3.1073959473047075,-2.617766696223053,-3.689851382451066,-4.7455257003101465,-3.4865279419488227,-3.4436673827004434,-3.7029570708971544,-10.013757287021164,-8.364829578710026,-32.99894711094085,-5.077732590512432,-13.500439318886333,-2.079244623733939,-5.095720049946029,-1.3801527926444592,-1.492482111204167,-4.4785055663270885,-2.6494301966237397,-3.3352743889236844,-6.466302101791633,-3.6381142627612366,-11.325270555648537,-9.519182777385463,-2.76912502429814,-2.703275971873312,-4.588625700111945,-2.4954460530677274,-4.10675429260802,-1.4793278636719003,-2.40494493707824,-3.1884871030766564,-2.9062841855939756,-5.369924675921808,-4.491029587634531,-3.2879371252908705,-9.880804997557995,-6.718330890688206,-2.882949938435156,-3.4413735309102838,-7.769280700782927,-4.012839656261561,-2.7440105767683907,-3.3002417312622345,-12.535140041978437,-1.911889899279506,-2.456499546119506,-8.447791391590057,-2.437632393326845,-12.357628248082927,-3.5241211300783215,-1.7959620078862168,-2.2438398205623633,-5.865224004211235,-2.4739569720760533,-2.1385445492948594,-2.759202291597328,-3.359672570958931,-11.634161757268314,-2.7847655361185746,-6.494325648854447,-3.909968995985569,-3.56935827456111,-5.185985925505583,-6.254831393121878,-2.9248051397017365,-4.70472697330537,-3.141475245368413,-2.893741066289072,-3.34178095812935,-3.139086063981315,-1.863039067346378,-2.404739898089521,-5.176548501949457,-2.805758913612422,-2.6226328469443505,-3.7024239914493946,-2.976562917818703,-3.6229108205668368,-2.7704269983824497,-2.8610358548087658,-6.3356646974164175,-5.666874672357501,-10.032226488739731,-2.618101675328204,-3.1007685221830843,-1.3262272146074316,-4.133948754982208,-4.210531883476381,-3.259122202497668,-3.2423070552457522,-2.8458133978465128,-2.3658297424561336,-3.1272324241697618,-3.3391176091954273,-5.5694535928339635,-4.6102255273503445,-3.558189067717547,-3.944881535459813,-12.702795010522623,-3.1017876042504944,-2.7453071201707475,-4.741354400386006,-9.884039896741683,-1.8700965223547539,-16.276006199922918,-11.591075296311475,-2.8819232888275086,-3.407147998299673,-2.514621096016887,-6.7030376145860044,-3.9967588919675814,-3.413842344279815,-20.150577350481072,-3.1294318787417765,-8.76828113561939,-4.802559435828138,-23.56234683915374,-6.605199231637062,-1.415740265163668,-2.537926271963921,-2.7806096419335913,-2.8729507335017064,-3.4127910922993214,-11.189648257429354,-3.786144660320155,-3.3131878369498846,-2.5767232014875066,-4.482397599629555,-4.9008108231837735,-3.56125005374345,-3.1717258520838607,-2.834977597814024,-2.3194348841079084,-2.6505351924445377,-2.7526872375279026,-2.5416858494877115,-2.4421335640157995,-4.718184213073392,-6.9783759342793505,-2.6151890708295635,-1.3192538939286074,-5.553277008458515,-8.357379325172149,-3.6144092327423434,-4.0161949794627265,-2.3351914401965517,-5.295854927519549,-4.040994037506181,-8.838382778812825,-2.638443653585048,-2.991710072846004,-7.840247307726647,-2.197390552194191,-2.720676327282058,-2.704048517553191,-3.5480853609785563,-3.031465807277051,-2.3425748948259897,-4.328337278548714,-3.284939309977717,-3.7395926807492983,-2.635623037704435,-8.501806566673267,-19.3419176928373,-2.6167766922038638,-2.7180018505139105,-3.0677434271006674,-3.707399592455781,-5.0733977074322825,-9.475191611943167,-2.5884366304826116,-9.445577201601981,-3.7180887487249707,-2.4343607243363796,-3.1228710853088133,-2.63985077228632,-3.3315831670231724,-3.5379134748361762,-2.7410726409475084,-5.546425181897435,-2.514348693096326,-16.665644404307667,-2.2706018989164827,-4.1159274497583604,-2.870182839674889,-2.5013192680048495,-2.8838500740730257,-3.0175997799937035,-2.5230033363770374,-2.819434566283007,-8.05937521792192,-2.3602931510885763,-2.965171696571227,-2.770234398278841,-4.275720172588007,-4.07550480227299,-3.559391778723985,-10.80284277718851,-2.6575059812632627,-2.742475833771111,-3.3798285556587704,-16.454405844345157,-2.7041901706255587,-4.985361105983523,-3.465861051391477,-2.572704456549543,-2.5329381956380312,-13.916211703445853,-3.0681274258050055,-3.3935914400655594,-2.868931248326227,-2.6073081513642893,-2.5129555395430345,-2.724240107222655,-8.736842369353731,-3.1095035216874556,-2.5667014295908976,-2.84445412846523,-7.869265771882242,-6.93733398233671,-4.305780375672407,-7.808538807520513,-3.3261779039442834,-11.954100257697812,-19.76568734434773,-4.016948168703454,-2.7439337186740453,-5.015284122732137,-5.827447847773793,-3.1911626987307544,-2.9722106580389833,-3.054204415224176,-3.170994040967115,-6.461968361624725,-4.260122803900433,-2.602251582838234,-4.4108926644316755,-2.656433115552588,-2.954381786321268,-4.251927646344889,-2.0608944756290843,-7.823129149032754,-3.7773090472907804,-3.8391367162195067,-7.333692052120435,-2.4579006972151385,-4.081084550791881,-15.118098655812657,-11.319654058511945,-2.6137663856737454,-2.415900667243522,-3.5033744725935176,-6.138048896589487,-2.910177548794589,-2.7928133508868007,-8.900866013142057,-2.7771664756059433,-3.24997115308957,-2.730804454402049,-1.8900077462858196,-4.475085693451657,-2.6100646491040957,-2.676788588008304,-2.2028110618998378,-4.487510074603975,-2.9048564981555702,-3.826940511936714,-4.64819404618388,-2.606761466292991,-2.0936819983092807,-15.777222682626745,-3.4586730364560134,-2.990667642772832,-3.154085032125166,-2.574712399223364,-3.0594637249491834,-5.246412554765388,-2.7301646224641645,-1.3707695924259058,-5.961886010190818,-9.598472728514057,-2.886980118495315,-3.806461176451445,-2.7372893083779,-2.2581668582295076,-5.101106391282876,-3.8612953554164715,-2.081097790617096,-2.340936994352404,-5.3866054012848625,-15.1368182261712,-6.969853256505687,-3.091870998674669,-3.1077157012639174,-4.93002652748205,-3.523549704133637,-3.263090286478589,-6.7823480041039295,-10.73840304416577,-3.7575387030666296,-2.7581163944403753,-2.840423897962558,-2.355492776353263,-2.8366385927078333,-2.654820897367678,-5.827470194752397,-0.755843317813092,-19.921918314462285,-2.238306124391982,-12.461096997778895,-2.8131937351420966,-2.5938400873869782,-3.0193131447773083,-2.2661160891770025,-7.944429142395285,-2.6788913960241105,-2.4276728576339264,-2.499109685970761,-5.4049815851626555,-4.465039697953247,-2.6046586376095853,-2.8367060619719644,-2.522395192840602,-2.7178400915000753,-4.312871653770008,-5.551841064035253,-4.204309421928904,-13.271950984863016,-2.545317472564125,-2.7412462177950085,-3.774686376536591,-4.907881973416842,-3.3960742338986645,-2.4245310434573346,-16.551334948355628,-2.728295450528434,-17.682300408389313,-2.541164508145253,-2.7544777558964535,-2.3814452154674988,-8.574796171770823,-11.591999246171643,-8.16946618364523,-5.044385916849426,-3.1846223112491794,-2.6334872904432594,-2.8423565528302577,-3.413525203942519,-3.9533955734027773,-2.944737383398185,-2.047388813167005,-4.4158096807866185,-2.7694901604204842,-2.3130633957370876,-2.6359011849802,-3.867149991867035,-4.624911353301375,-14.678418085383663,-2.7170824108558436,-3.347664816953813,-3.9115740624516535,-1.5291063295742213,-9.109619337535916,-3.6862207507872644,-2.5324920276481913,-2.663044570862194,-2.384259375500362,-3.1150986045655493,-3.5777717648191394,-4.903860347884583,-5.402724087106681,-13.168180113071587,-4.741244181877825,-4.14042413251541,-2.6513421020296675,-2.5839556642281445,-17.187007900823687,-8.353963153075247,-6.791033391206145,-6.983106912884377,-2.6398526986980246,-2.3689095421470645,-2.6266386935709893,-6.109259332546569,-9.003783312324481,-2.338617086022911,-2.708365526466993,-2.749917725380357,-3.51450099117839,-1.9985257961876939,-3.171522172680204,-8.036774055855203,-2.2230461713656062,-8.23928236021862,-3.604439584763648,-3.1691946557762423,-2.6200422175354805,-2.5064975709351893,-9.130128793296704,-6.109537397993446,-3.0169104913488916,-4.734597403056142,-2.6922063954373945,-4.86982366892317,-2.699009604535127,-1.989187569556854,-3.5944702435168367,-2.198125831393579,-5.067492834895688,-28.55482007268227,-2.7470205291387,-3.1453825523754464,-7.141688811747358,-4.170743825583322,-6.880368575753936,-5.657838388568446,-4.413194891619328,-5.250838872583328,-3.535926566346144,-3.7711215003497585,-4.569356875182366,-3.2022485779977727,-2.8126914455848127,-2.649110180526571,-4.2323794191569375,-8.726703410638535,-4.593740946607054,-2.8733038599522773,-2.5010634160819327,-4.726278336143642,-2.78447185387739,-6.1514565043683564,-3.5562289101889633,-6.8521235408015215,-3.3162538043179026,-3.662749270592544,-2.688383610052543,-2.980343623171528,-7.186055036005822,-8.383806709150367,-2.516755685219536,-2.7155763330756093,-2.395299072637235,-3.377511412617245,-2.266825234432422,-3.526843759440172,-2.659504320034066,-2.5310695805943095,-2.744068659743769,-11.898266379240912,-6.224420051633885,-2.8456275223043166,-2.537750215563068,-2.8783916074028837,-2.5028768449901557,-2.5990818508616185,-2.5671156077478554,-2.905450578059214,-3.1014338229992116,-6.036623647890554,-6.654458306812453,-3.9789030052355128,-2.028275504155618,-4.78441900585999,-2.7853139049048554,-3.453032608174344,-6.023701766728698,-4.041077520670323,-2.5890131126731335,-3.436187155938974,-1.4130756844620933,-8.744044941320292,-2.665000055370845,-2.627150644894157,-2.1934091504253623,-1.5243210743883955,-18.444510970363236,-2.059373354887039,-8.573507547064334,-2.6070224037049585,-4.31573162984131,-3.0449583695047977,-2.7396814432635868,-2.4539981261150294,-2.4426356740597437,-2.8280929225333975,-8.963065589563232,-8.765674276215865,-8.22695501100701,-4.278708101707704,-4.796685029451191,-5.139233922473647,-2.512561231152106,-5.200870337646556,-2.7040500109423906,-1.6475778496200562,-4.298765512336424,-3.249522548059121,-2.539591715159286,-6.030400769486259,-3.2217910933658134,-2.8302835997405715,-3.001597335793333,-7.877906000544344,-2.701267896787857,-14.333788791190111,-3.3440606207099957,-6.42265835767458,-10.519982535954197,-5.8338516591342175,-3.3117213224291033,-2.9038783705379414,-3.5032277183962814,-2.8125956057132613,-15.204722465335598,-2.3253264932032756,-2.596944839801233,-4.665754690721458,-5.560226914335138,-5.44411438923737,-4.458621316785046,-7.188413642861241,-6.052264806537583,-3.204291033367369,-2.44060001596261,-2.7869599476502085,-3.2678502899192914,-1.8708214796252176,-3.7859427750322037,-3.8922215269344926,-2.465918328325964,-2.4261676003718775,-3.906885316810097,-2.6913414768763864,-2.403029979341329,-2.4265924769089042,-2.6706134782338404,-6.241028262867204,-3.632131480511774,-5.295606864566917,-3.8518190324490207,-3.8165559101788995,-12.400853766899774,-2.7997413219938254,-3.460773775981992,-4.910311123608882,-1.9658872315499187,-3.1220979352066043,-14.801491337073136,-8.524690528908472,-3.3507953945624003,-1.854066199230454,-2.362836139326291,-5.691352536477821,-2.935368013806236,-3.2679006794074756,-2.544285581536812,-11.820997151227644,-13.80254286823338,-2.348144399523613,-24.13236997845615,-3.065273343508367,-2.5271326732404233,-2.620784822225903,-7.64668217688199,-2.841345474380245,-11.650430487519246,-2.971933297631398,-2.6490219281623983,-3.9090852998206636,-1.7868464787416225,-3.4705126525617533,-2.8371159074707353,-9.063059249701706,-2.3726833470344357,-3.6165870635807753,-3.1548794795181028,-2.406935049719156,-26.947300321423175,-5.51028420535697,-2.6426496063669793,-2.750375788251617,-3.146943756661489,-2.6970128505790028,-2.0101704338886917,-11.886804089350946,-2.7646155066837155,-5.207970966078475,-3.2004478476770704,-2.7321153770079607,-2.7787401093031323,-2.0205757420283885,-3.3030575620539953,-9.51650969459995,-5.930231509192672,-5.091679086923411,-2.6641442936320407,-4.689342133606843,-4.593018428620534,-6.941734832232439,-2.6903847046246483,-3.226951299042288,-2.8349311252011176,-2.6839725068192153,-4.357897384745323,-2.493256686697791,-2.6950259086936312,-2.910870682498342,-2.565064825426197,-6.768047687051519,-11.577058063526913,-15.127762184872763,-11.05490063951558,-3.247020445409217,-3.6246127727885593,-12.3645384483934,-2.842418565063616,-2.5941491109063657,-5.779002195269868,-6.760808824664839,-11.483592463083127,-2.718066317572456,-1.970232777252681,-4.548348466805686,-2.3416056204040663,-3.153191530310568,-4.191630698179926,-2.6151847454574955,-5.798806879575413,-5.6015465300182505,-3.537136704445402,-2.57351976572246,-6.494921059497617,-3.487542924164101,-3.3203613934596494,-5.433287056432962,-4.1775210715801885,-3.209726013310302,-2.963540818571503,-7.3374310483663505,-4.1932853754499915,-14.786228322061698,-2.4709514104712764,-3.237937911977897,-2.3883202554362724,-5.88045711887366,-5.529100593179015,-2.5378680436276633,-2.7006404011476524,-2.202429144188047,-5.308602225903945,-2.4078885175546785,-2.5887105931657284,-2.9882166176673906,-4.813839713226519,-9.324421613174113,-7.39403554573996,-2.9279142874931186,-2.1314799223316254,-2.9606529644072457,-11.45277481855062,-4.256504335299957,-2.5207630871866455,-2.6377067937509455,-2.451963393167368,-3.6514106861215154,-8.806179562813933,-4.643659699053443,-3.0270731821163146,-4.062375788629324,-16.826959086576306,-2.8481718617511365,-2.4459046016585284,-3.753146270623242,-3.4883360792854825,-4.074525880205916,-14.486319957795777,-3.7053300638719695,-2.879738741839456,-2.129170874783663,-5.98355024186743,-4.2596922750035695,-7.426559513013099,-8.007663877924466,-2.620099933278581,-2.8810631119869576,-6.293903311577911,-2.1217886990926136,-4.213603752867354,-3.0598887305870446,-3.468274747044876,-3.199762985206564,-2.4842565139885373,-2.584543942114449,-2.5905922485614044,-5.301597922672764,-4.5787422353725855,-2.658188091343982,-2.296413959190928,-2.780771875344294,-4.486073466162681,-6.29533254863203,-4.8444522632779705,-11.439588812537723,-3.292132915659163,-4.809468449664794,-4.206188634010819,-2.0038233791488667,-11.446901010654196,-3.2903364272548963,-5.844273541764589,-2.452508829293694,-3.27154701902142,-3.1693534125333542,-17.607868971116794,-2.690221274648299,-2.292348993704065,-3.5044257635433604,-4.396839995595017,-2.87872751122249,-2.090009518441397,-2.182419390845243,-2.560386567839317,-3.203151817154496,-3.725809577673075,-2.5231583161613567,-4.356711290820364,-2.33493590461047,-6.9803467417707665,-2.4418803587184037,-16.74777051689534,-3.881906587263172,-2.7254054857393744,-2.7212377862598136,-4.479616808156082,-2.6027669487367864,-2.7214057422368336,-2.7572976668439635,-2.9723481053981433,-2.7173882902534565,-2.9493103319126748,-16.714004160177694,-2.797815637937136,-2.829697894253278,-1.7623602179287419,-2.9694496871673546,-2.2210102892313293,-13.07190919621907,-3.5729288890177417,-2.5064095240971556,-11.352761938004035,-3.0371453287065244,-6.3825708209539105,-2.1407368293006424,-5.767981701832324,-6.710623859264108,-3.557831131859757,-4.973676352117336,-2.2210924772097274,-2.8209775118500486,-3.8599377909884938,-2.8521133594361157,-3.1686542261959594,-3.9381527649258556,-7.661657865936268,-21.303187080553517,-3.1115599334698847,-2.9599016259854136,-5.363991476400941,-9.447363397971577,-6.277688736092065,-5.722238435033836,-2.245485753932691,-2.552115953068338,-4.462224218936314,-2.274947142131848,-3.198567710022193,-3.0377865175294287,-2.8834827525085878,-2.9504304330605255,-7.460216099746594,-2.6937650443637255,-3.445168185507898,-1.8955267642141558,-4.310615833830071,-2.0537883340569616,-2.581985218340226,-7.014389239759021,-3.4986641631788373,-8.128579477733288,-2.6604273548665787,-4.44917350189001,-2.8981025387163815,-6.963491831886406,-4.313205771150966,-2.3490345601526785,-2.5510650255339065,-3.013587146994544,-2.4632828436515153,-4.521948864046943,-3.664032321070653,-2.8234957104018323,-2.9741416889010868,-3.0139106560355144,-3.4262550588670666,-3.6364891049793506,-2.4504512497238182,-9.964214496300029,-2.8445379372726323,-2.5468190667416595,-2.5994785088937498,-2.633102728617279,-6.718189602070854,-1.7816989247458954,-2.795069481255975,-16.124418419380117,-12.192542050083118,-2.443807648215409,-3.022947911706588,-7.56931930986461,-9.661306372447811,-2.2467018347273457,-2.6689229277533246,-4.649329429356506,-2.6226388950644397,-19.785672138997146,-2.8488895870395545,-2.470385417905416,-5.073059557505368,-2.921460409163206,-2.5548087453011568,-2.680369546280954,-2.168352794364759,-10.999642341663206,-3.0956505731989696,-2.7133600275025826,-1.8197170530769275,-2.7976109293519555,-6.43865113635673,-2.407422219890353,-26.087455702310386,-4.140553033203184,-6.95037815617698,-4.904296339044993,-2.0521467725455897,-5.648337460125454,-2.683609814667446,-4.331094760254486,-3.0058806258257986,-6.042752930208517,-2.8551501054655004,-2.5833080449041663,-4.040963741555672,-2.626636035122805,-10.819014995440952,-1.9260887459356546,-6.100878031594584,-2.4819572831921164,-3.119389572456619,-6.963134415625326,-2.6139054581911605,-2.314757128960317,-2.626611112747641,-4.073917123714721,-7.42316725851257,-2.5706904756228433,-10.660913517177782,-3.4531061951207884,-3.8712088688279724,-4.21797000655511,-2.7995643940636326,-2.6354840399265385,-2.5484136098665053,-7.276755063533696],"k":[2.808366351729905,17.108501940489624,2.7637864622060793,5.8637185835216865,3.8534844057638606,18.458103530815052,18.925901028078943,12.403351230331513,3.034967555494701,7.2351834073052235,7.479569207268337,5.189283259231536,0.02394642343062081,2.604993462787437,0.5524752703090963,16.65487355353495,19.092618365296495,10.849104857545363,14.359688039135907,4.976186702700249,11.990555437765806,2.669934243719947,19.143814890643874,3.4366504573674783,3.36988858479089,17.472045350967935,4.103963279919163,12.096561833176507,15.40192257694029,13.944410998844967,6.30290073103581,13.218516048640208,1.5308445266503323,8.356434425627643,11.596085156368403,5.08800406374097,9.009367112375987,7.264632728770994,1.2485571720151256,0.3605231510705442,0.023024531156328187,17.433985554882714,4.9259220261264325,7.746337667641989,12.737801931166967,19.491950720373925,3.015486338844582,16.171908382761252,9.224272192650552,5.027600645543804,3.00561663836989,13.360894258507589,9.498269095607519,5.671397888400267,6.104277592142484,4.672964963582733,14.7586068443726,7.242978044759241,4.688186393556837,18.608527460930212,3.9641933447243582,17.90949819167498,8.930422557105846,18.63699105989076,10.540212034122804,15.619538644313828,5.478184952458185,18.077488143236646,13.738431450205288,18.78299432508001,2.4852374769853336,5.473986603617118,13.986934059425963,10.441635454736357,13.012774204200973,2.4321091944776407,12.608734076928387,13.256472270923126,11.431411047268112,14.827280148446178,2.300399539563336,13.544156082383427,8.486351047220637,12.562163318565872,6.282225006917241,15.86083699811164,5.831654898536565,14.590622830443847,18.70773980680285,18.805751635688583,6.675590331777825,6.62779380201894,6.948753081077599,7.327548572718823,13.404859734831769,5.796475268210246,4.260596446876845,7.962211518908049,10.988568875627216,3.8216594328112885,13.946327442615667,3.526755453805408,9.41774834676302,3.3237120460836467,11.05491645178529,12.567818153379427,18.073097411008906,13.09174707612514,2.297520891408076,10.980961220461758,16.269558414982164,17.40730625697475,4.647728388522467,1.5547786800920482,11.232507750403705,0.25911415453751196,11.97922430188398,5.450074491768069,11.095088505816504,3.02643776436736,3.285375210711101,3.8448809200613487,9.056332310574003,13.5938404559414,18.469153674842033,12.882302482884498,16.010530521571514,8.714298151337744,6.9108027192219845,4.576691306648426,8.716844259760297,12.224829630168323,3.4146101254042627,14.73842693251334,9.051612603885921,8.050394033598796,9.540811479351472,6.86265475758034,3.5584461185947713,14.558488122079458,10.050345885911325,7.395547194067049,7.926683727270167,7.298900658973033,8.53731029441211,6.158159268539434,4.518275864669135,7.516498278843344,19.791877082820328,14.39502846869563,0.6158975574842973,4.663682536774019,2.319209529205497,19.853813214124646,18.8073279757451,13.179141153742172,19.848430114451983,17.129069652467777,8.810585303694808,4.507239517553372,12.196624173128999,16.47458471021097,5.324431828858596,0.2527934703167478,12.965473840196054,2.10786756009111,9.759962193166288,16.11822880708225,5.593253247411383,7.214238707242222,7.925518588029226,2.4135905808807934,19.789086319709316,10.099645245699719,2.054937037338447,0.9348062056248452,4.856327573857753,16.094652641023686,5.7499804878620875,19.382202964426945,17.504657160215334,3.98311911728936,17.986758756167692,18.69199318022586,7.561563384496099,1.4930424464718595,10.109668834085088,8.478128725057093,15.599493414946606,4.37313912262939,19.961421136207473,1.0632100103278663,14.043796241616624,13.061885358665677,15.9390411953664,8.522957648554774,18.373655852360198,1.9719541616800118,1.9934896944471658,14.404712142999978,19.016496155443964,1.5329031578506802,18.930482636008374,16.852269693362185,18.99441028528042,16.212577194382636,13.661975466095427,0.3343130214364676,8.382647869566426,19.176393684649277,9.935022740423719,11.648128775546542,9.667698690387422,12.702167264513724,7.558644402415515,4.051513448550312,8.324446576053122,18.338872951335247,19.64224903492072,4.018436779731243,9.679911290697433,0.549138365912234,9.405578814255072,10.359588809792953,4.748262084209189,18.791479744240206,4.465069570308335,14.673082103859816,12.927051193604285,11.94300148254365,1.554200228682019,13.796052722727596,6.972936769062716,11.17228594329029,2.8247503754402548,7.406013245894965,19.86781338156909,14.612078398558562,3.8508291662518257,11.924624935129572,5.834786594308938,0.6459810421844558,10.834808314509647,10.270922633625034,17.06435537536152,19.98332179688376,13.656994403913988,4.55007277418038,0.7136179097512718,3.7916842268847173,18.67648134575086,4.617902720932321,12.435462922651492,16.021500597973855,8.023644244664187,10.987382025528497,3.6674939731483525,4.328206299227375,3.347131785325499,19.597824936669596,3.728943449746569,8.528543168581365,4.242465071882218,18.3357115985517,10.97335276605753,3.369052549634346,2.2464199042947097,14.639257926769895,15.310518920230995,5.057781464803517,1.9244317322581894,2.149127316958803,1.9239075540577222,8.721611007026905,19.370543533456917,7.027842463705043,8.061948358662159,18.449904056500266,17.055812384256136,2.5064146592343928,14.531420616787805,16.597764826212508,1.3842755605376533,11.796140726351997,1.8753119015632302,0.5543059726223687,11.7976301441916,10.035932028265883,8.14009086295719,13.354253790779381,11.195877314907626,1.6514675365573517,19.739711764129947,4.979620417762742,19.58589631054064,13.103380659785158,12.138868483959161,17.850438918803306,7.799116026436126,6.855813750859849,10.923241219677058,7.802162286012546,3.8029043219660563,18.907641899853807,12.02695969266335,4.8896606055776015,9.460828473363065,6.684196273419611,6.7615827028845965,3.999331800718644,12.797180798332422,18.421584664187257,8.00733620164667,7.182187548713368,10.9229892398054,16.194125095614496,8.138744516537525,4.388001012030669,2.321268031393524,7.046978200020648,15.54744382283272,6.810076939921501,18.542381972441856,15.51057838554868,10.128748476698295,10.51562465560837,6.109051378058736,11.966267501912702,8.770039608186746,16.117741155684364,13.197150317005217,15.755738769330726,4.652129526021431,1.9785974121575878,10.313937712472306,11.096418646700336,6.165922988802923,17.294587841961302,5.660586032059798,6.9986722135507495,18.522773096346306,12.650573905077005,17.067320662275087,17.136746867003552,14.750907924899956,17.6780103490701,17.84377912925165,17.62868360962425,10.114681653178303,18.342207616366302,2.945334644708577,13.37210221708537,19.07239414501113,5.659246066928878,8.075426929567326,16.694724690722808,3.734031789701313,13.457271582303463,2.8632393169044956,2.0086310592094536,15.00683829955005,9.93137942806015,6.838963413447092,19.32369831393543,4.378987814553206,6.727337824516111,18.5976510980742,5.888191834077201,14.719620365019615,11.64721899788618,19.42287070675448,14.06949997307077,18.179550318294353,1.175221731999736,3.7268691947922283,7.13026915607085,13.770278217442335,7.995292130946181,17.284124288529657,12.1527476270435,13.103248591901782,12.31554226574588,10.309334984445453,4.785577077462522,14.195613054983758,5.8653819352787595,12.215363515557428,19.954994645620417,7.880571911754868,3.5203097147340934,18.83270366704574,15.845454862193854,13.419013670718275,15.601410735524448,7.069652329205822,9.318002800937975,15.068419609227298,18.25444911532834,19.41892949826219,18.811318367139126,17.03611812501908,19.041132726747666,16.288205870165513,13.461474668866767,11.747289083193557,1.118156153307135,19.696457707885312,6.959704717005435,3.3894745686663486,10.435682992155723,5.333065212625034,13.671676248309952,19.433492701479246,14.360946782780228,6.617666603879222,19.769804994552743,13.591311100002962,8.983076746175168,14.850459741317032,12.958443015348987,17.357029350338138,5.191678879433934,11.900338543014781,12.180692791205843,11.834940529578155,9.704635826040487,15.719670941946656,11.780979842737874,12.165772498684625,7.777084080221921,0.3627801447333212,10.33974221996576,14.840900444393178,15.697487560021525,19.410470042456495,3.1459683283914597,8.121863375718608,11.59611547031873,9.311958780259491,7.206135591833656,17.12594875641478,4.737859292317634,11.660584606600036,13.626310049885442,16.131222914786036,12.253920776115397,12.674286415573949,14.841009500709873,2.511968563032707,13.858171143164224,16.111544701311228,3.5475536200969815,1.5031178615035845,16.449030947639972,16.94233999376513,10.611094360610833,15.410226567224704,11.531957207252375,18.529665097140487,10.219324522378322,18.597881531708616,13.506856317244305,16.11350659222182,9.06086164874344,9.081575616740029,1.0808830116019585,19.98092205116185,9.776734233201235,2.1220160315467806,19.63079382215743,0.24630472150719562,9.937637458792107,6.510515982859673,11.761342398277396,17.516440500735946,16.590007610433158,15.276804345434574,11.642164610953225,16.502893255141004,2.4034283101629006,16.50783176916893,18.27479114732851,9.092153761109918,11.491839213667149,18.448828662828753,7.612609026168955,15.582007439889175,3.097360442553949,18.630845003958143,14.541340284696433,3.090691419987306,19.06123149360394,1.290064490516638,8.812710143635488,4.403041779309382,16.910393455256475,11.98838653495136,15.282877255128039,7.907067929407958,13.022321051159395,11.824431403013538,2.074224061633587,10.02264486966872,18.497718154398264,13.13191015437277,11.9051841388122,14.75228644671601,14.494065912182021,19.400915875636436,7.963546479804875,18.4692593661485,9.024733340755287,16.616185824307223,15.038028890628112,7.411203316845412,12.155000754170988,14.61510755540818,16.69867831728883,11.798084767837942,16.032170767846928,9.799406315245953,0.4620664685830045,0.6899624105791302,14.723547947743745,19.76018697076239,2.6368740624736065,18.141758763785575,7.106819964846589,1.8031183284366925,4.572771540848719,5.284806877615824,13.053075462619654,6.082205008836499,13.739923920232506,18.24111582678762,14.968643133441901,13.668082820582903,6.0272860603648,12.617709367717032,7.610813817426001,4.841792774561817,7.248454856278994,4.240669666761487,5.009625641002788,7.304142368699149,5.427884156415734,17.31041383950837,12.409564069843713,19.813543905638518,11.994143848908205,7.900448866147687,15.828097725110034,5.588800166938079,8.9571129094996,11.262076505376474,11.630719273464646,10.55601707965538,18.366111693675702,19.125481559080253,16.765083178620415,18.494160464314366,1.3797598734518468,9.992713362172037,19.33384532562238,8.429502852212023,12.134266718361527,0.29694605887980785,6.844436479651903,14.621669759292688,18.720513821902976,1.8067265511279063,18.03785667957242,15.449706765696005,0.45505762820370776,3.0231222261997504,8.519626716922634,3.5142437672564064,6.8432613958031,4.2795600831433855,1.0822153102800147,17.18478516592073,15.57972772941401,2.2983024917613326,2.1560711481523764,7.2711549464153435,19.15865482973517,6.198665285897045,11.489260181478507,17.23542339394846,19.376062290990085,1.0767339043243052,6.085694096272394,2.589298322024711,18.01922054041495,5.258874373182398,14.52212430950777,4.32539457586901,17.006165340611616,2.688330320191108,18.02469825292934,10.09958061117417,17.345096266102445,12.513703384656356,4.805834229975674,19.517648909856113,7.975549991850879,4.7551604582151,3.2588394691402334,14.869512010046533,3.8394769657991157,7.306339554794672,7.240397881787817,9.126205955496967,7.871331713665932,10.887799942656091,17.796654507045417,3.4720263416409614,4.629348436998493,2.0368346365945422,16.348158501617156,15.63451104308379,15.600166290159954,3.394583767559678,12.510655531228178,6.765590971225204,16.750678037894108,1.7064331693448542,9.987212589029312,7.472233894193088,8.108321867164925,6.581911984475757,2.4135630302893807,13.493542284260819,14.903137286386293,5.540797158786526,10.835988309883572,4.948293555084935,7.061166150494782,4.172700795571727,17.097839203393104,6.199270873407907,17.810598420695033,7.110359018170991,1.6337994892367735,18.013619582093717,18.328228107717244,10.956742076395782,0.5536967964989437,15.705095492488397,17.574653775544302,11.251441130596325,8.285005598779742,5.819487445556781,5.31157146169146,16.590970836557958,14.340633520472611,12.197528558233843,11.20272152158634,8.340301894765535,19.825706121841694,1.9096882664138848,4.08475476165632,2.1854697573335535,12.196397802311601,4.246742859313106,17.036893837646637,5.465570365511465,9.382311031395663,16.171229050207376,10.60127660527655,3.1272082050213124,3.9813450775035486,19.30057711602842,18.73930267115889,16.00120796837802,19.642977594592676,1.9569647477095664,16.07674674770412,11.69520466660984,11.835082265191698,2.582391720870434,9.389489583501227,10.04618521199137,15.660100347143104,2.0140621066829123,0.25623262075646025,17.534390604011413,0.7592454597506881,3.27565689334822,14.552084984432936,5.163649930267131,18.8798939457093,0.15963544053131606,14.233559568473474,8.507332046656888,2.3290914549820174,10.223612660769689,18.23677531518774,8.031589613237822,16.117990775066243,17.925591973585654,2.243308923543945,3.7428402741500832,2.0555909525822935,19.064266533371757,10.487123670835409,3.313244841920988,17.04007726614407,6.702737812603958,10.947532744082281,13.307826122726842,16.426200055171925,13.780113281494142,9.157032642395965,10.672153912611062,0.918318056819154,11.900998286962423,10.238452619894996,7.426687950061712,8.661259396782143,14.366940413052962,2.868715970259128,8.472372047971643,17.618822197070227,13.76739295311054,16.383490105702556,2.9615237535951033,2.217806032431753,9.72211327238362,15.006053796527322,18.60768021324985,2.823507884529235,11.00361598590004,13.588660963588941,5.366235602880183,0.5771596388155631,10.591852782854705,6.683017068858432,8.039067950492038,16.198317146577864,17.953780122750974,0.45918977358498037,19.208694387504046,6.328693986331251,15.71239571701045,12.423811235812474,1.0678937968731894,4.497332594510501,15.206742483877305,7.548520641736554,6.6210682217372785,18.76536576193732,9.577005696408655,7.772530901376191,7.091599234826909,2.74683872029156,15.288542882544075,11.579771065008199,12.97482425344504,14.034723724448206,17.217532901433955,0.995363457853693,13.37758896124086,11.409091621133314,5.100912264208839,6.9121492548223,15.69626005739304,19.065158008567437,2.8055859621087453,13.72080522930589,3.720629455762885,4.3569576928211795,19.068420052508408,5.61426698701633,7.204833855182997,2.167147619198584,3.9876682228012017,7.047438751267365,11.846908564202728,2.6699718080780244,5.49750323857352,6.420344230979831,9.12118973227873,6.952210383216606,3.5810446713261657,9.947791106359425,8.218422936528702,6.556145967748899,16.676862397610503,17.20155860963876,8.582247237243553,14.00529490425507,18.744412717951295,8.23138226211209,19.856798106158212,7.916722615659926,1.079926526549948,14.944297049621094,1.0648221956431714,19.572166743904866,3.8262672036994827,12.494220476459862,12.453160935274816,19.907591400187307,15.73296597356768,18.005476082962275,14.468899598040995,9.713029765067237,17.07014545680933,13.815433652764275,17.018571856995955,16.807314247058173,15.069877666114158,9.064549023080115,15.931556043017263,12.164826989628374,3.992625932686269,9.729867836578872,15.052893709743373,5.860932929071043,11.148374088093117,13.434493855670159,12.483919572861097,4.093346306942918,8.527558404661022,7.820028833403989,17.20617642196717,14.140482239779434,10.59159909669913,1.722723618950055,5.83398687822672,3.883643287448293,13.890439708598104,6.470690989618504,3.006079417291856,2.2644577594149906,16.651446113887097,2.299095990511568,10.757594060482791,16.11900777342327,2.7426335964187043,3.7558947593959324,12.46818668275678,3.2793113607292312,17.408783782900855,17.194723558395335,5.709824973213724,18.961151164844946,2.4766109418861237,4.8844822617244565,13.482476995625783,13.447516144725444,10.8830470502398,18.913546928808138,1.13862541133543,10.414565043655415,6.466226786749472,4.079114748546742,9.528581343056688,17.615204040257474,18.70132269151407,12.465274724153236,14.63610984156729,2.260656384998856,8.029516885930406,6.875528955173342,10.671022097897902,12.838965184178814,15.208537963111057,0.7705311507162937,7.943220798782447,7.594739310140142,0.9439871675551226,18.042800891181262,8.061043159596295,15.74535205839739,6.241615760320527,0.5599484972899615,16.50738307838384,2.4938201698577345,10.706758539561335,19.61822096297651,13.145465421846438,8.771582823277724,19.167700809844487,18.55513500781047,2.303515500498552,5.296643235381824,3.9972282247511393,2.6119663113639957,16.314876415889252,18.32728642864179,12.03895399302545,4.573874641074562,5.028717153063673,0.8295998278960859,0.9145346527013398,6.3429840056334585,19.999508496427044,6.732643780211922,16.58254672378311,4.467936666261139,10.870363644391595,13.368654290294986,2.0277037825522193,10.838983705356728,7.886581994326147,14.349394025546918,11.276337499070683,3.6503979559051203,10.39937035705234,7.542685294585727,14.04118821810223,8.954185000897198,3.0851861223333277,14.37572442245013,12.725441131482143,15.457697825863196,17.735198623197157,16.256938001361306,5.268255825105781,6.4058713331873385,8.661358962640456,0.7181252926737525,12.62888721809941,7.123731414236998,12.385381006890253,11.30322038892511,6.67434737115252,10.630323164246395,18.931626685823055,8.85721728446823,4.991606550986614,14.627968156710999,13.927603972593122,13.009449301965489,7.660368417934151,18.9319364843977,12.955506442663198,4.506184531175701,19.401779844685212,5.988235289385879,14.261690754265821,0.31899012267352145,4.76779866058294,2.5593578104919334,15.304786196108129,1.005009477483907,17.19515896782845,7.293820629201875,2.1302602967694284,13.56574130091522,1.4534506345483234,19.475213849638333,12.560295057095283,16.819588399846175,1.0805478000278468,19.681725373587334,17.187839470143388,0.5814042618473492,11.471243724892467,2.960295011733156,10.60576518004217,3.7262511625886496,1.3513068746442558,10.573920619061528,16.190698591409713,19.99373785093625,10.1061580983013,0.8157934509310261,2.166652216700111,4.481159808622226,14.552247680899232,18.23716577271981,12.015211747909763,16.673561783741974,0.8253885514481896,11.508270470858971,19.654773450455213,10.101876619001398,10.159551529580174,15.124790320411243,1.0711337628949602,18.472881947340362,2.583334178938679,13.359574676456955,18.7925909240461,0.5900226704939637,18.477467563797955,1.464882040227109,9.22269389269589,2.1432871895828187,10.396752131636568,6.230471604898944,0.10265180824012177,12.059381152246885,1.1208779156833693,13.25384476302149,15.136283107822557,17.77479085726467,9.940519505613569,8.771452429234277,0.829218433779566,16.370046818938874,4.935822403039092,13.333554530000931,16.747974217181625,9.505710336130285,1.1286498580284166,17.361077658994173,3.8599396546352382,17.04237333055303,3.7122066337626336,3.842983032114069,2.2071986605202953,0.2595642588978464,1.0513235843089896,16.169082926992118,17.25660484565441,2.2538425056921696,8.768960770289178,18.585894962095946,14.926591968864017,0.3077862805900766,17.804277043263177,1.8427068203957297,0.9781053510719229,3.8579129111265242,14.584241998242709,5.018235666235702,2.495528567835348,7.232742327117605,11.424088522677263,10.489141961444481,0.8650331555862456,10.799012020403577,7.664773608499984,4.0955248800048905,12.077209470289425,1.5329095655732283,9.443653792416097,10.876607577547258,8.192420993109021,4.860718835931657,5.9547780964519115,15.35184939670112,5.994260846440804,0.7066470424335147,3.476731225162184,17.885713226607987,4.864029241476446,1.4161003564745922,13.301924441946596,15.841847577110869,19.316195673348723,18.26728355734676,1.522742904889025,17.274821465903013,17.78952988946612,18.66108179737671,16.87834522680228,3.1414953504294685,13.078561206695959,17.98162134810486,7.001940742925163,8.654753662158669,19.813542129512285,10.937412195583027,3.0029601511498782,13.051111636745505,0.7731470527273343,9.920189347589394,19.7475302163385,9.578129057973124,16.4816088924919,1.9172066805598176,11.278696266084953,16.18504870952026,15.051965643780987,18.50822370835996,17.323176756764255,2.5630576255139426,3.4185410199499433,13.00246248144794,18.171882048169216,10.79500848974468,14.757379939345224,10.289238857573398,5.584989342249611,6.435241545542367,1.1508166586767032,19.29900174605254,16.2754311441136,5.411410310919158,12.051354717094105,14.519012228566663,13.583395902384359,5.82740376150519,0.05982700786152595,12.887720815906505,8.561779969914918,19.235508306848153,12.214690261966087,5.963342538875027,19.242317377984378,11.80302347496533,13.242779667621477,15.826119899953301,19.03668635530235,9.519522182187895,6.610265949579537,1.2174635862238148,11.697498169407346,3.4044622841154215,8.297055518215322,13.088438099736216,2.7616075968712117,11.02615988959144,11.309813659243574,12.677303922132563,7.0067730708221765,5.725251783996432,19.150830584423495,17.88465585982951,0.06602057604437217,6.308982697229348,4.917970147315605,9.069050921546872,1.062991069693937,19.61341919230614,3.597495605892016,13.113122774465346,9.17178156724258,6.668434752289292,6.370952504756353,16.93968836982497,10.501461951999103,5.491260926671759,17.836444350744834,2.6514040893550073,15.813804838586858,16.653287241178802,16.27005085843123,10.652521062273394,17.070757422741313,0.9277294995802521,14.991285612762152,8.301941259119952,3.991970743935287,4.950576059245573,16.796417476979954,8.044438308030383,4.4457063975684985,6.113171635262029,5.599609335402187,13.181974754258881,1.929539769831461,11.15367799907158,2.6672293629374533,13.191821714470006,6.972416187526571,10.393872567087833,7.917520925505563,17.516171454062697,15.994795324718623,2.802860979810573,17.30715483282645,16.608356982644935,18.02979583544703,17.13511329033458,17.05563225400427,18.99030362428464,14.543687702439536,11.450093695363478,14.663126195424736,14.182583275256295,14.321160761560105,11.276257902727057,15.105304104099652,7.21128404338601,14.76776275999526,2.221635876308663,17.717711781211882,10.41725098889485,1.49972420632837,5.512515552310879,4.958388826242124,13.939423442289378,2.192193409652168,17.736311273705883,7.318742358258907,14.521843103373083,13.479460133553145,9.92029940618362,14.800091392403974,7.768664197389796,10.843594347946972,17.367266270485157,14.889110256834801,10.180631924304176,17.476840661214812,7.339669901622541,6.006797405896429,15.434992699583393,17.823916115891677,9.610595798328498,18.23913516510444,6.021018284826347,15.24641051103313,13.504984841881651,1.605389257380061,12.522370436239534,5.965782135477831,12.131155528140294,18.77000674732382,15.19743424065146,1.5605097362608644,2.4317667428676426,15.993400644032798,15.765901310725784,0.3789710725621598,17.097425208697466,14.705643536727342,1.3847211695944495,9.732835085069222,15.021226016669518,5.414766673510272,2.3992519606063567,1.3951260463669168,18.04970170443147,15.864526061899525,6.195943101655508,18.236226985316897,10.172866496934741,5.82193888247545,9.487622457838029,1.309951095690467,4.055865119999282,14.089208267024237,12.211713607985967,14.646951922603382,8.493300268843127,17.54165718738634,10.89869241452229,6.690471901013995,11.882662790408718,11.683847735686292,18.096072211630588,11.461678823222371,3.641594923408178,8.784428201805344,19.185224728915706,6.284092921332891,5.307930346706313,3.4622357868251807,10.844940406490743,14.535998703951346,17.83592272436005,5.963363907081636,8.06545690602388,19.75308652668374,19.7239197858539,15.72142512370335,8.057795216401233,2.5194263280003515,3.7300298822703892,13.602337104531852,15.592387494695501,10.152453705105739,15.93042207878527,8.155936523149574,10.891457088586414,6.3047627346918045,2.733251347970498,5.511006786912853,16.754690244651385,12.227621429459049,19.13784966455724,1.3241420459595732,2.759482844356551,14.607327973572811,0.34860904402339354,4.217248160740703,0.31494273775925397,15.256709409396088,5.207250698463728,3.9333559621951997,3.88129787814004,0.9301065317529744,17.399148505903867,18.296549699106524,16.572773811003657,1.5977033149926756,8.721380506430663,4.260768005407503,10.888613523164569,11.121317052671124,2.4811929684734224,1.685670685369991,11.487836346593664,2.052607348459161,6.602733936432017,9.595307636893263,4.93907584594214,3.95160331837785,1.6792030587420959,10.539974596361414,17.068558836027947,11.584347693665023,11.282411082493224,1.4613963727623291,1.155782803578731,14.093291268255633,1.100948678316085,6.744331364901592,18.441121814847822,8.862891502784219,3.440096746668395,17.912297832592277,7.730533454167876,2.2158081392617124,9.229325343838081,6.790061515405159,5.086291412592621,5.951537380948699,0.8918772609369885,3.9969217031192272,9.699101538623802,19.107822324968943,1.0582018608915789,12.447411313621831,9.927705462600894,5.5989098830840245,10.356500676425027,9.803029909928584,10.102419831982568,18.679847427862267,18.578868990309765,19.156608222378786,3.0056240318433725,13.192661819924147,3.5267179539487303,1.562471374147223,5.673804230794737,9.828833339882394,18.043906206972142,5.793247642306163,1.7664030558853971,5.050442373409831,0.1706558769022104,9.484465617283021,0.9977352232532821,13.23464865395243,8.685678897735238,13.103620257453077,19.06325533911939,7.630754314211461,0.3280924161089738,1.7735886454378624,8.77267311938921,18.66089573593648,18.833281396231808,14.652162037632085,14.705484089129097,10.12587379893716,4.4392525396310045,13.825956282946045,11.199609584879724,0.1339844409456381,1.6128790126337123,17.207480290439143,11.023693502483232,0.44965110406294695,17.853500237312993,17.708297002452124,6.2292720814961955,18.99618306819231,15.696218969069715,19.210971973717072,4.987706216534549,10.847019154219165,19.814801484271577,13.981754988769591,11.698194257038224,19.618474007957865,2.9135133361570764,11.209991665415068,17.41751200792908,16.96041450378837,18.588773711254184,18.399276077035694,11.497822102692297,7.527157009767103,10.465678619453183,0.1817892902322793,8.759463196929463,7.138333034295528,7.481744768783836,4.048583478879211,1.2931231979658087,1.5661584166298947,8.63277274762886,16.577603207516496,17.012404575605196,9.008651620930998,4.589642917315158,10.519374109901193,0.9580818763535159,15.803615000178151,4.058228843827143,2.1116532572808255,10.407702461416818,5.875019607376881,19.388405913517374,18.43642473249333,6.588996089528343,15.74018511262009,7.593366950486615,11.175234130563542,3.8828618988581898,8.667886560757276,14.669555791038022,15.502766782068322,7.934092693800205,10.002169503358424,15.5302310106096,9.55749109560253,6.6256212912390655,13.555895761790339,5.767037339271526,0.7562423659148676,7.379492806742589,9.300108782466943,6.048359316196437,2.8087403653245513,13.570904329189627,13.969778783629998,0.10901951989513048,16.667807450247338,15.739521299279474,8.358799008756034,13.194840209706733,9.016633280859683,8.534744713998382,19.920042014811653,6.690974906757341,6.365283230031742,19.05291545476795,3.696474493641615,9.293259912984627,8.424500902884757,1.5121431637623184,18.97716633099715,15.366485812411552,0.5123701963963745,9.346687460151637,10.702671861112565,10.89579401792037,4.605246742083429,19.47789515921707,17.695117073146566,4.943245930676725,8.029739658948198,18.812024388580642,15.368142733804518,8.527900178479705,16.317188472466533,9.652436332748863,5.537624275400894,12.207582908904993,2.447666426020505,6.053252130305928,10.982394923996113,14.749582160734182,3.7840084400115703,7.313478211761955,6.888959153603955,3.5300700890267223,6.799128154733309,16.464321483247236,8.703672666269417,10.481130434880788,17.049814010147593,16.47738361655218,11.156256008293862,5.431659954001926,14.14264312041201,8.808365750098229,16.147107591960065,5.103097562629055,5.944794943467779,19.145372646068793,5.677859965047314,2.744116143434794,12.487756820960358,14.57994686605165,5.9088465138203095,12.544632828730848,5.257524419723465,10.487762106222087,1.6826179967095811,11.822498854419345,10.28398391818886,16.210435306390636,5.247784722509019,6.916046476360123,6.270795381406691,3.094301013323837,7.8025928636323805,11.483760153251122,11.430180555880579,1.645370818007943,10.097370066449113,6.622485537179297,11.307578480182148,9.796460786837544,6.5615103917488815,19.325239147421364,9.140805140560161,8.614073329968148,16.83257844263374,2.7155018811060616,4.77902833887994,1.9031834587149987,10.728599474805298,7.64684821258506,3.876543224643547,19.542627638024936,4.863188695555931,2.409685250729807,19.151544575178043,16.95918709539312,16.569082111515346,7.571242580642159,17.29467649774788,11.417756839524671,15.277869442014964,5.633097748151763,12.245727800132368,14.890122029752547,17.250887848547695,8.837973238752559,11.138095445721024,10.289217026769082,10.686218046618281,9.61431714553894,16.845600481428335,15.058426623912862,2.5553876728790925,18.585827497966193,14.061870985605882,14.955639706965641,19.013569725752482,8.541354861240222,15.4180462019395,0.029468684798579226,0.40778311928028277,11.371769294641648,18.64624333967495,0.6494701659049484,16.552244061916927,11.236010802563632,1.6940994224476125,12.581309944916965,3.061169244026858,4.5388527639980625,7.918874348927161,15.160737717399568,8.120880944678465,1.8439821019034985,12.238134344342452,1.9458801183100949,1.9081929969624678,9.769773860568435,3.218947969706254,17.23954053393438,8.59376399912087,14.72128900255127,7.60745562077938,16.19170235727414,5.34910438884614,17.50840775121945,13.846710930218777,7.592517501596152,12.692160145622907,17.79037902597279,8.200724204854346,12.179016742294277,0.9871060409847177,2.5242531623721565,1.3827344391601315,14.909059782978463,13.407780805660217,1.313628596498977,6.066972271181839,9.774164813901077,6.906939651716906,10.882053250779983,10.682093973204818,6.410776772613871,0.30851473281800157,1.231219891590114,7.560628958067155,15.532721869667876,6.683471420919718,7.6999401044550275,4.968073753344959,5.396225471357674,18.519825570929648,8.271227612351396,17.32598225408357,17.559026399979075,10.620503335098634,18.67868943782948,18.07738935760679,15.322082431733449,12.736397666540626,8.076522459015871,19.373696112336724,0.7406118087057978,13.20693915523492,0.28629463510236874,5.224949976605728,12.712103522753072,8.055795333040683,19.534963879900538,15.074791273621088,13.233693439659891,18.02036843260325,18.733365861330604,1.141225863706281,10.426144246775477,15.30147997246,7.367029136744492,11.47448963111065,16.30597181571471,8.899359876986042,3.645595081208959,12.369117999285265,11.801569084858595,3.556095183472876,16.04334996487388,10.635906485327471,10.179118239867847,11.393654378353379,11.694207602268367,4.470540249830113,5.8409144980381855,11.065364815359313,18.79907387355138,4.2512495501114955,1.2719208596016074,8.924882634474134,10.35858751747778,18.826143470868985,15.357648301489672,9.423167957731371,0.5328145857149513,10.017487743218041,6.791393867045463,4.418443551044522,16.45489540272424,13.415983233894124,5.274399194905022,10.403735117660906,0.4472647403625807,13.011599507643972,12.400567970434642,1.4888655404829176,5.760617503247465,15.923107132599185,13.25536631392437,16.616565102127993,5.207968451579981,12.808672376362678,12.652594549048795,8.016661591893858,4.699591262786047,13.630406804293006,1.5386921711216317,13.252975457876811,5.711522167281258,11.300699511948725,2.1653083797110106,13.73309922094375,17.334526560234167,2.2945978878035334,19.087802868473887,19.071261621496266,2.2490002240812457,3.007033456437167,15.295577280241318,4.043852799925682,17.389615349643798,14.155114503794252,8.252869679381604,15.23187200070938,9.311549337511153,17.131079393931294,0.9421701225954004,8.81140330006466,10.48269409802645,1.5564207007671582,9.163624534867969,5.114157976430582,10.193400972381648,13.838114273999471,1.8922802300157882,18.47521210809781,2.8540342952096998,4.06776188488847,0.03994406579068688,5.926679116723066,2.9058455802468197,14.959181650630153,16.847302643016175,10.891587543049681,18.063943259627607,8.123081057803422,0.4800835571855444,14.592915112105715,8.458657361553549,13.80255359755196,14.06532039154586,17.681602205897434,15.639349393378584,13.972051723101648,2.98890584915382,19.381345281760744,9.616113872741256,14.94797732850715,2.4965515131150973,5.173564094049872,17.223856700227206,12.213602099750084,14.017832632650435,4.01307122200508,4.418651317436346,8.887981892648199,17.31980810321776,3.1751701687558054,17.273020892120982,11.296709064425698,15.938688093533656,19.130503019716013,13.638847988067724,5.509247802102926,9.997575665075434,4.8845244230794505,12.500800816064128,4.374841130896159,4.491151856816131,18.066309214097835,7.134400692502112,2.2069830697883175,1.809959040237672,12.592014330185425,6.7079476343172795,2.47968508566065,15.960248259248061,18.38644824800465,14.217409796259686,3.3153377693219044,16.961297787989338,15.853471576905672,17.330983441497708,15.338528002526193,17.76586072999271,9.37283773591858,16.693980170649244,0.6590380965161824,15.706444064636212,11.010286874963517,16.63951645207468,16.36591687993314,19.482649963717638,6.004702534908284,13.006245488668657,12.088149203725212,17.484140020068637,1.71323410825162,4.015591689023785,13.157513881095358,16.844455085277765,10.453258744597642,17.705513595504666,7.001169937056488,6.565118717058418,2.8419211333271255,7.134359900181306,4.881812674392458,18.13010192479903,17.462693641078893,4.5316976473181025,15.371085876041487,12.459462571144218,3.0335182903567715,18.349066967753078,2.9800743409482555,3.0409063108732015,16.025318959714046,11.322162716206883,0.20917291609303668,0.999995880062996,16.827072828178174,7.622166221584656,19.42706139023935,1.3252129636898324,19.581341844603962,6.343971610780268,0.6023692562091609,7.0196448733239025,14.397741693051724,7.46567663490771,4.612991618237365,7.011866912223823,6.189349969790259,14.468483427511165,11.056450680683625,8.926802387464829,17.02677689457301,6.982159847578515,1.5672623260563956,15.349012600991037,18.82811076421907,13.613665065468581,12.430117265281059,14.690143598992425,7.842487539979319,7.052712387945728,8.04251233867868,2.2440833812816097,1.1488229488872248,2.892485407161991,1.6359418499454348,18.970971404709278,12.814775986026312,9.467429478101387,7.832461119167049,17.58917982204069,1.8002974957450668,9.699024002883556,12.649062669248238,18.9308035150734,9.532963013065228,3.5163272446159777,19.686662474607846,5.4635323473039765,0.3020143440756984,0.41623652341828077,8.14754493133715,11.360118444106867,16.84685962671773,4.159664905088918,11.283155423871808,15.526333194833853,16.91833518804537,8.926569173047302,13.52791057311293,0.7821647909219553,1.6826251147037663,1.0928314494153524,4.303310938269154,6.150241047692737,2.431764739298794,3.3433118475531742,9.93206609674434,11.149893713477397,14.385649451373439,4.374473535058434,4.797549708325737,10.970002262916797,3.496615628924835,10.543316027734452,13.628209247843742,7.935350192307307,11.918693921875253,1.266134559497809,0.6630042054969465,16.888619005559885,12.664896249145276,6.294415463237479,6.41046788610713,16.336917442481543,2.102233305557455,17.987325565631842,18.24974068738637,4.985537198864702,2.5532067574934736,8.653165656109248,10.63597409558286,18.9102750598444,18.976697737673284,16.690059831589444,4.977459293884738,15.98761799727438,1.1148466134731105,14.04517109713379,7.962034103744116,12.130935377806074,17.710721307961936,11.692840256400444,8.930971976986179,12.469710751351904,13.736388377650076,7.378681133227438,7.296545250629385,13.403661796309972,15.874631236211187,13.552156703977683,12.407356493714158,13.882506825821238,9.756596466891704,15.710291421815699,0.1199895094155412,18.951000643537967,7.4956301329617725,11.253964713467726,7.38210320105654,7.855536862100672,18.056571854173097,19.515220361062447,15.728363773927079,5.262127378109969,7.726549903720619,17.00146718279576,14.100321553541399,4.341772028478061,8.927572904209091,12.76993301342726,9.290551492284624,2.189489529757065,1.4084084743763237,18.337265006277853,1.5265146540756636,3.3546104680876,2.9915265449192097,10.60107356402133,7.722714496562775,2.185368072984395,6.01064312494255,13.10971119096154,7.299630507572417,3.7186622960510496,10.938188499162646,14.421861586050664,13.90175595829296,14.114775891753029,0.35825941774512593,13.551980340367656,10.837920033900655,6.5947595757802535,6.295578998298037,12.600303733969405,18.773133100576374,18.354711355075093,14.587123050822651,10.543504331437198,12.121204295208617,14.797452823949957,5.84761390476495,5.629489151213609,15.681089723936704,3.9474288609821295,3.403247370840665,17.735100086050906,10.303605920150769,11.560970470275983,1.5333912394277505,9.589720717201207,4.78965302288505,7.125765597677383,1.4862455871789315,19.60791421600404,19.275370465566372,6.077558129174556,17.582278702035055,13.839972050986038,4.061984335157516,6.227740728273852,12.91886069879066,16.111349292966825,8.7626472531755,16.648527640067847,4.355914450906178,10.06748662319271,19.323629823454315,12.827906061227505,6.852814669274063,2.3277042630937306,15.314673123419222,3.980518305235905,17.46075276708856,15.926818208456952,3.740337985686244,15.785414705730219,3.71754350556055,8.335543307636257,10.08850928330439,15.911810292795119,6.955296321680264,10.14643965919062,1.9946573468853401,12.773380581471233,17.755182219622903,11.541746999838946,0.5634349815854822,6.424661805524301,16.902425216864536,7.83535830537053,6.454878706591551,5.600489313669157,19.210359726555716,18.779715638123076,13.201581002011258,11.304708094165257,1.9604881312788747,3.1847158257287678,16.02978583054394,10.859606818733273,14.794129790705956,15.742713369954355,6.471040948626681,12.285630062711302,0.7072923414064114,1.1506666415975708,15.441208831786902,2.8191756096416043,1.7966357756701656,12.934762361950574,5.858320324578372,12.842179045691786,12.187999235757708,7.529568730260752,2.779996360643775,15.734999520413048,12.066065288702696,0.40372075945362074,10.517761222684916,5.296912912176399,16.98412462272165,7.368449678265105,14.570434133808545,6.295964610975511,8.659340850313688,2.413350162340535,12.75071839603056,15.89142262713015,3.6089267233976807,17.310959103628146,15.950114827605653,3.506350114133787,16.42520807107207,15.314689330013662,17.63081279987157,15.557418896965496,9.858196131302975,9.808728393304964,19.426140295184112,6.294819419019584,6.716981777714515,2.361357614049351,1.567763224771066,15.75016642664663,6.174092355034846,11.62424379633103,6.724019803098962,6.812468766767594,11.653572008867886,12.16973673506506,7.9082983990213895,10.763314970063043,4.837820298416182,15.768721928502384,2.390242918192582,2.847511122114126,11.646111001809714,6.004907971615716,5.110655861322262,14.133464511937497,2.1295062670427845,0.8204431969372772,4.560622073682055,14.551906122161963,5.329705933966458,0.0582546973610798,11.499862556136895,4.377437801095381,2.7747558275114725,19.959583900013094,10.361949061508913,6.837851318253438,9.771071428805698,6.203926151702728,19.463615627359925,5.936339217983413,12.212172143320936,8.22088641563067,6.4446816610875945,3.699268924019221,4.773022883800393,0.18459987937581523,17.51443534447022,0.3837352329802224,10.832600641933393,10.410785027649418,8.19763869901803,4.216336812052304,14.493838069138976,4.408092702150825,13.332513602672226,4.008432408926046,7.250937763458882,11.995777145007214,1.5089197759231832,19.93497596705256,13.017502122596603,6.121947320056402,10.511606036781318,19.23672005918249,19.58288644323261,13.969436655577514,3.3905399075252696,13.536312702254524,5.621076595522925,4.666011338785405,3.713197124071712,16.97806832631697,7.927434651654153,17.0943639515326,7.062096270487879,18.93126491084942,4.226362701949444,8.345956476970882,10.805285245300666,4.090723615590983,7.63950512620414,6.197705488285514,5.314441753794266,14.944850055387802,7.829516132580294,15.65423622202411,1.636167289683188,12.133616851167943,2.451196177682955,9.799959071679204,18.10159951684429,16.95692264928291,11.233311990743523,10.416940446323174,5.79998318276671,10.46748147569653,19.296550526833997,18.680196612176623,14.731687539068478,6.077488093048942,1.0623234782590396,5.855462589792633,17.545437618605888,14.652790865809253,1.9212898920743715,19.6820620647919,15.250853911143437,3.1660475073360983,8.061968963831072,4.477804818812334,16.17547741811262,13.58895959492659,12.6350649263187,7.365654507479165,4.195383552008307,2.273684596569474,8.034538962351284,13.308715163813169,16.951147203274406,12.387515250163887,6.779342405294129,17.734198317828497,8.706537028259582,4.4939568860509205,9.356890001221313,1.7015583159281755,2.651298013881327,8.792906517060178,19.453122768661242,18.873055002086986,4.32744738329482,4.194819471061453,0.16724767680903696,15.730764915100632,19.517630263573665,14.988246254955122,15.922369359829144,4.64150533524323,6.933057899223383,6.433920285138841,19.21562476222066,3.8157893465162074,12.899166891627324,4.529327405226451,6.331892377000963,0.0815682582855537,1.0910430730786702,0.6319604767419307,2.576961374259472,13.1351577231896,7.7326741775237995,1.5333370673835622,4.888377209573953,1.3350878470221739,5.698792596770685,12.916060293239946,8.345673683908927,19.264678933221468,4.822643994731659,6.355090108991885,14.441637682778538,15.896567850289154,3.1707781363914345,17.953310081700472,3.7948153878853397,18.042324868035955,8.238686930028791,12.063888660439899,13.32709918640187,0.10416433152568683,0.8076040930231665,19.39352451147718,6.633147891095801,2.477131077712147,8.71943230161682,11.333780486672161,0.21184769165062178,17.70752787518434,2.3022944604372686,16.147171212625558,11.976539455404783,13.349630926003151,17.644282796234968,11.3935546380884,3.9507911526757677,15.82216931644902,5.5768850782316814,7.889650256341398,13.717505080447193,8.408311737478197,13.007539879209862,12.865938589706062,13.480998914414224,6.951438927976548,7.369195877162307,2.5006179304113285,8.065932622067429,15.246001846663546,19.55312008163395,10.584716332177674,9.224504307372023,4.627472971499382,3.9080126021800154,15.857585239424687,16.849999391069105,15.182682415683315,1.2736158174773893,8.386316966696992,1.0005320607754253,12.625804125613072,0.6709195277475244,2.249600603496793,6.680648900396009,4.047481585193489,10.834324391236244,12.229213932899498,19.017626028925033,17.741385001612443,15.646785670195671,0.4852288358876544,16.673880790953195,17.426480721828437,19.762175766241707,12.838681722776517,4.975811787401709,16.547315610412305,2.036282264179463,3.002293464895547,15.569376015582069,1.0549093287121813,18.41522718841793,4.500471126114887,6.100391511120726,2.394446247825388,2.715968366339929,19.84690522765925,12.041956441896424,19.884659997674557,19.220081821727376,2.4135821999319074,0.4620274210967823,16.550745830476615,1.72322772260042,2.362203691982625,4.408465783154125,9.066934376218985,6.266250864526857,13.084611251131664,3.31811963885972,2.393324889897448,5.911315964676054,2.0276167871657735,17.373566667960002,13.491821913523822,5.223622938813408,6.9695225985474085,11.606572511763353,10.0600966688262,12.141762196912818,12.397982779021511,6.203772452637475,8.637376557246505,17.4493232373384,13.758951597035898,4.401931952623621,14.77971715346007,7.086258997848782,18.410003239126496,9.85062222373771,11.413535561299408,4.037082606923237,8.335606514519025,17.798687161319705,17.28476586854565,17.76158610020824,16.232451765829484,2.374734498120308,7.503183574748631,1.0030004272617354,4.586310006461245,9.033381540125642,2.95115470188136,0.8033638880205451,0.1422198495727489,6.7354564205577905,6.49068347792507,15.463691848376978,4.864658589296269,9.997259780308179,4.246542830114093,1.1271913051897098,6.844706407280685,3.7658037173736503,15.74421623864838,4.923818748512767,5.550757374515181,18.16073721636745,8.270263818859664,6.87751418253872,5.584424495079099,11.470558113992277,1.5209305839110954,19.599418525573178,2.4348382897275123,9.090200127914535,19.69391353737056,15.44023215972035,2.1315317460508965,8.813657801701126,16.160198226991234,2.5314326855306124,0.7326051790211618,4.685385899716978,17.785060087803352,4.611834799448835,19.90372637846879,15.805638711840167,19.55014543845506,19.111163833040777,6.749224953464603,7.8851899019047345,14.580847256735098,11.236989603618262,9.007059396160724,4.490139771008264,1.152336410595849,7.380109900874392,2.1276131968482925,0.9901196073216312,11.078440694243383,2.818552594361501,3.4624360982913416,19.899285624131675,15.05499349518856,14.387434759965396,12.664923040072358,11.843744895987577,11.634237523098196,15.38956339021022,2.291516782674776,8.675411908468046,19.535673874595677,3.068294960048288,10.556660956986704,17.04941606646536,17.99358411848385,7.358947040941084,7.339463794790064,17.75288160084346,16.46452504914913,8.656135584990263,13.6024922797856,19.25087856840402,13.879872638408287,16.844884070346687,12.465960861993004,14.200102796889169,12.748784455653702,0.019772976712513213,17.604865491852102,5.306212328283801,12.011965120151293,7.065688116876236,2.6446548678746584,1.035515611417961,0.4284107174822571,5.3798688356599556,11.900307377677288,11.090731345779297,1.7378330244839502,3.446259684373998,3.2423385097137647,7.265314137433219,14.120577400135339,0.7936558409001115,3.8392473725593357,13.649465988079598,4.32367807389368,3.081456702802412,8.204303148684978,5.114923037550789,18.93513413938281,9.065393331924252,3.5353261994707363,15.503672527671256,8.534834091843656,0.5224938279372404,15.244204499638832,9.075976912607375,15.97627530948467,6.895432826529961,7.166369894568381,0.7049477304849328,0.709501882395096,7.593686959344548,5.315853492008102,17.048807238991866,4.624001561381337,11.859466636228774,5.505030359479575,7.912442769661814,10.466431713852252,13.849258849159249,4.435980214974995,5.572354336884469,6.484851118442365,15.629268659951446,3.6095202573981533,15.885046105217832,12.896146673604143,19.24155959458734,17.021223289610017,0.3141585934910207,6.409985639072029,15.515356462795463,9.148687170431199,6.580394896942776,1.5369404079831916,16.276976614654593,7.493583290712071,12.68210733150065,10.752683296355663,6.574642643553421,2.8763231665809696,4.20551962268068,9.233411828896712,0.6643115422289281,9.92789904422767,3.392341511863348,1.4072822295619414,14.61383687168173,9.641197073541719,3.8533789029103493,17.448754844127954,6.458159843809268,0.12359347814167254,18.25448174044098,3.5998067099818964,17.15051990532775,18.983096703446897,19.63736076500259,3.1875521123711748,15.050355219933387,1.109445528527031,15.996330156713544,1.739785241213987,4.024081373676136,18.53713271375122,13.796129740861943,2.3968946664787216,17.426779074760308,18.970427380810687,7.010366356524305,3.2314847366062915,13.115362706351718,15.206098996998328,11.134100627109845,11.960111480744233,1.9964767748958234,2.3963329869486083,5.100381917065371,11.714409302232141,5.486380229145444,3.654926599054007,6.818648698481931,15.263206285258327,2.1492994548086886,13.759357659483808,12.35596610603161,0.20890325602995752,13.414491227155931,13.829847239250004,0.8477008749479298,13.939592475976013,18.32440123827307,17.56935627469412,6.7847746249517105,17.68700801908977,14.647532721921706,4.315430967484577,14.610504705921116,8.426130596409855,5.298036262135608,7.745926155069789,2.1816642970689815,17.57529995307877,7.9076064249778355,5.125863531463013,4.598477339672864,4.442841626046952,14.734388789906587,12.950812299748184,10.641955428690029,1.9332928240283076,4.049209803839866,17.0917135686626,8.67432108764785,3.799071646668848,0.9465552410728062,4.9059490083804835,15.747601527633709,3.788883189412595,15.730266270326002,11.607795809116883,10.24616561605487,12.078832216566994,8.353050726540708,2.14453269835027,9.671242709905371,13.258289805405855,11.440557193185361,8.392620036143024,0.3761414150441178,0.8473645881413328,12.231489490827254,16.400849281446238,6.45844959317194,14.893265153499451,7.769227992041703,5.588147764938807,7.120098352405537,8.06483637697121,10.079357205323106,9.82322231436041,6.605370179364836,0.9529515542577505,14.189984602602369,4.5163438651953,4.38999769321593,5.545952511688146,13.829716391758527,3.4071717333507445,9.567202302356863,11.469124273023027,10.566493339459448,17.782943852634332,14.660737785725084,2.780084159529448,7.708379077316141,7.920156492579249,17.66717133955359,16.14018336391753,12.472727435285385,17.41265306761228,9.730899236878292,9.691704450337806,3.769165272025905,11.831634630811303,18.477591498738846,2.459945708131781,11.53144883021389,13.706332244784655,2.9742229197049808,16.23061814622744,19.45870221188938,14.5954165050762,15.474455449880665,19.319179813813676,4.801599987942313,13.670629413868824,14.759778768326473,1.9162513045182328,5.28286677841483,17.856644913400856,12.668577633352257,9.407676343701885,3.929679905691401,16.310710362608944,5.829857746225593,10.410413041866473,12.657161232720648,5.541801050750466,6.376698978830464,19.008907967073792,13.832123458116046,1.150686689117566,9.34602591813948,16.56425014362298,14.519758848895453,1.295164868165437,1.4217692341774768,2.2523634383282287,4.894563668093883,11.922088089906499,12.813952612128357,10.90997779708295,5.08051464178112,4.323675863436334,14.04541613870316,2.722618525930005,9.700432741675291,3.139061170970079,19.656932439628527,7.92723082606464,5.967533998691685,6.30781932300525,10.66413680668827,5.844187673846091,9.511929513581139,17.52273642602528,3.2470156477945222,15.409259889043675,2.5284297445766635,16.024518288124604,16.031758550084856,18.438396992478673,9.244615574621818,3.25224551665642,3.5186660612367104,16.84103015838454,1.2669936064469889,7.594252702526316,11.080419046123332,6.372344413595443,13.755694171591518,8.513112808533073,15.496895987705326,17.39341649618701,12.1702163347789,1.0738403060438007,9.149866147567227,14.894612826476816,14.976016197603577,17.7022860416221,1.3230243913803985,11.755790388285469,8.628413300272278,9.815806179601978,17.993352838930825,6.074507853996751,16.013634544325818,9.638132896724727,11.446807682373299,14.748094729801133,5.9145566957451035,6.03205750177747,1.649940404544501,5.268831933930023,15.347384786328027,10.671427647255435,6.491708124947175,5.639756424715885,1.7001657978288254,8.482143688522484,2.992035963561559,3.3989246732550438,18.53686696181335,16.010735403053932,7.950833562205144,7.453094745016431,17.869844959909802,17.49019402645662,19.73433610339495,18.394207574142758,5.40450111494156,7.089094605774031,2.5867860599904535,15.462496324150393,8.942151024569212,9.644396756668048,1.5617701468832967,1.6120259374412527,0.25499465754525996,1.1216791607451349,3.2210243574372344,14.567142991234828,1.010343972872767,0.7042813322724761,9.267802491666739,3.722512887479845,17.851461239430662,12.60025260520572,8.601518337912042,6.032644531495128,2.06563896556216,7.838534739422465,18.211989358000487,1.8602760088537007,4.241376909151016,2.5798574856649736,16.84545017986003,9.636052128688597,10.542046175990677,17.17374325797531,17.939499917385106,18.059504719984787,14.030604590852032,9.97993087217273,1.3637415314436963,14.666479320980216,17.393576860050413,3.133645135807961,8.553781167624756,7.402506968513842,17.025611148239626,9.89530518124302,10.04599254888577,3.0590361116246845,6.4289083887250476,7.7363173921508555,0.6878353048280106,8.089802432953856,15.321824037509808,2.783234672180539,1.302454690427095,18.284161840774313,18.027046646227866,6.767825084791754,9.400805636796058,5.3688517205294195,19.374709617233428,1.320387579758191,1.479500237028173,10.784093903525624,6.912236778901986,15.631596616439506,14.700956458169866,6.600077096358121,3.683416905388488,3.425073728149717,8.150056215551093,1.065078043323715,2.376448286358692,8.567942952599644,8.631754876965513,14.789873955880548,7.104898730936102,13.233079416085616,6.27322165703506,14.802377253767997,18.224663335992986,17.394721001917837,5.531716173910546,1.5306762932820916,12.156072385842599,7.09508159851906,9.945389836912476,2.6990468990307237,13.133816303829322,0.3064720057812531,16.331544572180647,13.06530034537824,11.717962675447936,10.138839100652554,11.302752117975565,2.7494169263295865,8.988857961273617,14.592611967373589,6.975957285546541,19.820267724486925,12.912985611179813,0.9517382161446264,8.605178726200373,11.400947361066653,6.315687617362875,3.527512041844174,9.003075659359844,9.117207117907306,4.453862681969487,8.324542360864505,15.797064052431633,16.1501359220585,3.6023639744010882,7.977339905702565,4.294478101429946,11.742133788510563,1.631945424487462,18.853633820734178,17.696720569331724,11.335079823146472,14.134966137337809,18.322569807490293,12.31071031869444,14.36155102290735,18.93711903278817,10.733719049765549,13.320861754925502,18.722068557283404,6.264159710263559,6.198237519023588,9.44632895771377,1.4190590573546702,13.912719893846006,14.891148465293513,13.01019491612426,18.504269151337258,3.37411592162554,7.874167269185621,14.100697634929716,1.7235667172120728,7.550136824840448,17.288413611425767,11.303352789521268,19.783037225373686,6.673686478818923,3.0728594508588936,14.283539424141146,9.847164395622588,17.691940123346836,11.640776152007808,17.41275923183249,16.23454289546631,6.951592482815947,5.7821299279927185,5.384484352779735,9.428133996163268,17.20665111140277,13.067321694177778,15.588837655108625,19.24935453717196,3.0111863680692563,16.665527841061145,17.84133520346338,7.050098176572068,13.10091785856073,10.736649591466527,5.591740148414428,18.55570869115253,10.854205711861962,3.5728077032725336,12.093964791848627,6.564024318017885,0.6902422119479334,1.0314025360291224,11.570282616845216,7.204352949500348,8.294295550235598,6.999202307240564,14.925888327512107,12.896993192860005,13.31749366652554,17.39536311215784,7.089521515375612,8.261833892224807,10.674177630868812,0.3633835946711761,10.933357881097887,14.046970714165985,0.9930606944451759,8.688963816855635,4.194588736935394,3.77852585179407,5.048228700114321,12.234584936548991,1.1258759521996753,1.3122571719332532,12.759069367421585,13.229136906656151,5.281523015615948,10.814387575577085,16.624351992873713,3.572514880960833,17.708326874884456,7.246288790709596,13.372307735438671,19.881630650211115,1.701278532668793,14.816894424783893,2.463051784920318,12.243914716144362,0.5968630308403577,9.256364614835402,8.432195216877897,0.538796321233459,15.397947486834909,6.566563507060339,2.420393022642844,12.334466165837586,8.833373909651714,6.084495129452843,4.475056039006642,11.681547515069362,0.8815030714171801,10.297049484077565,14.109161005433517,2.4951673680763964,7.234149541153139,4.302771405823962,11.29302145975307,6.785424996026981,16.640209102851667,10.466583201984898,19.168477467299777,16.625665236797985,17.542782933262956,19.915776608488397,3.0505374901638715,2.7955158081468223,5.508113008686086,17.179035165123256,0.13569936026626372,19.012967151134212,13.753778155791574,11.228452426303996,12.263438148035322,12.548569796094394,11.339197297974884,5.412609661720689,6.111417186255315,0.44388383319441616,7.812627756894064,15.621640775214853,13.637896485549179,13.20770302443917,4.068906056511987,19.380775461974658,12.815815656610159,8.807926770257804,8.443700228293425,3.635623151513059,14.63512377580155,12.578535820343792,8.02468137619671,17.326885808947257,10.334857973824793,7.379506387277632,17.60538782947275,15.235279419824245,6.725238735368149,7.334648937052353,15.270477840875598,0.857050830142212,14.571435525384535,2.132475147230082,6.88672519392608,3.4725109159724044,6.776109503386665,6.871529346699492,18.387679500924555,11.89123251822135,3.092400404186062,14.85745376902826,15.625354578751075,6.432847641265389,4.000784445894117,14.598247245106005,3.964000063745363,16.136855732523298,11.894921103463268,18.0903892634511,13.148983148720351,2.8251499545457026,18.213379364175495,1.1407333854402335,5.750938045372278,8.175672064976428,4.773806514541832,2.627426768416554,16.295991752835945,19.655908579846916,3.5584460296672837,14.057078788928749,18.803578027436558,11.734795240760176,16.166002500494862,12.911968288072062,1.8966938338201622,15.501645982026307,5.288811044315702,17.19690449682007,3.7753459533247424,0.6742777406247713,2.2961970050675085,10.926551196912087,19.45419783572705,6.582329220980512,13.740140732077514,6.939238297906609,15.003586619063496,3.0477818489729325,19.10052682051134,11.046058913286402,11.48060738567716,19.62256259970804,16.52195875382131,19.83535824283368,8.400809735450032,18.721040905612615,4.67210970403082,13.110457232234122,16.804685533357908,13.824646632554973,16.25182795596642,10.475494836804602,8.883341354828236,14.378834789140843,18.56748375265647,19.873819335250626,10.209252471965296,9.280350145780147,19.694569297707083,15.730133193747928,6.0976520943995105,17.624359858676094,10.059114628603343,9.245677929602962,9.612179570337748,2.986643222457026,18.22908249666321,10.846997717921436,18.827944229741846,10.480082998466873,3.2874527061476355,14.745955035906132,10.83530314512001,13.873422687392276,11.244836332239538,16.684265910314416,16.544159712678443,19.33459463673442,6.6082812356700815,5.3194933348143625,10.28850728935569,8.789377131730154,19.823362833543992,8.792016247479776,7.6704870449272855,16.100824739657288,6.972659675802766,18.006570082463348,9.403904524897705,2.654352868014551,12.025732306893161,0.28596466699486456,1.8748642254945258,11.958809370296288,15.031952614088105,2.067263014682399,18.104215634940047,18.424821937313315,2.543419762749317,8.179271515351312,7.022610986377393,5.895080616697825,12.855879875251034,19.89923697783118,13.491393107671454,7.870467740104332,3.4931480757740863,13.556006147080488,2.7630520704092643,7.463269661763583,1.774116398725356,4.411905166621022,14.999632410358323,16.83634617015029,13.425418386315297,6.800081691330391,19.644756158405478,13.332970998738167,14.331238554372838,19.698023093404224,19.48014328476395,11.149928291570571,2.911935692598755,14.805026815168464,6.559093583183246,12.308686345905135,19.560163935041,19.56279588270682,9.760775006794248,0.9787044041544979,17.63503047552552,14.726378882941367,12.52812142346218,1.1368363546150206,10.119869827596784,5.147663844148163,8.900427943008431,11.423589943801563,15.800365959995135,9.085771828295677,12.020747749878034,6.2984564958843725,2.607530839604091,7.215921791787472,2.7010125105856186,11.498347664775789,14.90941385880106,15.245542699573607,9.088280697281386,10.126023284813916,1.0019042168106207,1.0292847011384687,16.962182176625195,1.918083641259618,16.707334971140945,9.041860972474275,4.189586941076424,13.535794272440924,2.4019717594913015,13.401398576128942,2.1055729916349453,19.345235109889387,18.514818576697746,3.8249478346904864,8.24839846786733,12.409989758127576,7.589581567071648,14.53661881842982,15.549965255890946,5.090483874184577,8.766903538994097,1.1699180423486144,8.522056943270586,3.823499253633438,10.556431752986084,11.93239366607569,9.589516199505464,3.6591926249269413,1.7953368604829656,7.329845506141419,3.279900600487733,3.1133762633119177,0.22323229406001843,14.648880218929925,6.546226669792596,11.909622641586811,12.715627206234231,10.132532593290424,3.969821276404071,19.74039501392141,15.906264190556204,10.81781161197826,12.051491711964237,6.327206020086447,0.8395539985668021,13.745459231450772,8.468662856678755,10.755716368653662,13.068818139052727,18.228957402978438,7.755049191587404,7.8964753323383885,5.745465975054014,2.514904458949281,0.4362656544237309,0.07690924990020331,1.2081346346601718,5.900615928979902,14.7902534070214,6.616801393132241,5.561327659646547,1.9798091346812274,12.276419269360606,14.720355113346164,18.681857704614586,12.798674123048869,12.69306070619936,17.381733903882942,19.462484796968916,8.05826575609621,5.325417453059611,10.465082972726027,17.673994681045894,6.731482423726702,17.478047824421502,14.447297261851064,4.944680749789714,18.581094407227493,3.0478884101951653,6.992735747187524,15.253411144882193,1.1853898274925934,13.298082703993241,9.013893583446325,7.115578935437852,14.984224877363047,5.961503879262242,10.622422395962365,1.9000846282135075,8.376159215787933,16.56281326352593,19.79321392543898,12.581624284515915,15.43279418628741,2.919965261583193,12.277092954192517,1.7096221150203972,2.2073735719855714,12.508194217425142,16.55385355483563,11.440058292292283,6.195836813053051,3.5677948532048553,15.989048856472973,7.4127616836640575,10.592815605263532,10.50233769496161,13.557465841933585,8.451806015158127,16.086438827135666,1.8517783391832854,10.641372108159338,10.921624127614106,16.472429149631115,10.87160701036073,18.62196392745957,7.640119982176716,11.446788003274166,18.590755075039173,1.0816947684040112,14.91094808881693,3.8775083242239106,13.319147956489692,17.546817140389656,16.141818680848537,4.030647191597536,15.373166301255559,17.783014906709692,12.44894096261052,4.238836547435905,10.195216997910661,0.7431736128840472,15.573697796549828,19.4278195038719,14.047853582957064,1.1406747716573573,8.019551184218617,15.447373664542408,17.890289018891465,17.694354024442603,10.826486113791049,8.187565755240618,12.218429389099835,0.34248167826691045,17.71282898101576,5.3956445206689985,13.470169526464826,5.896616636991507,9.326862836431182,5.4129651468913265,19.22293230065943,1.7010445635115445,8.406440007525253,0.17370812596657625,17.40487801616329,10.647759960897375,15.88993722910316,6.186146528401175,17.872407810400507,12.873545782686291,4.570893780265846,3.072964211242466,19.511088686449213,18.826881950772133,5.287944624210681,16.005709642552027,2.622507280405091,11.561498255432303,8.151037834109944,0.1762754362797736,0.9603417482167886,1.5876492677657161,0.3318704300895092,18.498159103859418,8.129870443410617,13.656015468433772,7.4716772301460965,1.3561082046867146,16.902079495535624,3.205916962220341,15.217585791034107,11.240150074883699,18.55436252452604,16.455025348809635,19.535173374499962,16.718889167027633,11.248937147702648,9.24683017116401,14.309367107063352,9.23887636487283,4.0490885916671715,12.131157138831291,16.876076025196134,12.722908775040205,8.071745687878224,0.21151281966101276,0.7394538060950406,19.300453443163303,2.0804258535343845,19.666062324888184,7.396852871798889,13.382230426451947,13.08709889343406,7.840955363048709,3.4868812967615304,2.5853323060269506,1.6934463007886347,6.608132735999868,18.198681459389718,15.950526768809063,4.007739041047791,8.626801970026676,1.5609446814353412,13.44184156828872,1.8842700146817082,12.942979003462703,17.970296068206327,10.05688052827255,19.73285611231759,18.70386374294505,11.229207812102956,14.265925778418902,1.221177121441217,2.135403079752294,19.799212110543216,2.9598030479146464,11.979515908267473,18.03364746602048,8.904093436765113,17.457520525577333,1.9545592599705541,0.05259554563135538,12.631143777594946,2.8638369316380974,10.324494008967333,17.16099902163656,14.365586208751143,7.271511347444504,1.611859713042687,3.246601689067856,4.719517605116756,12.16396206415956,16.67829733375102,18.36963128049681,8.369649288994228,13.437893160748784,3.61486045189642,19.5408910101608,11.237620609037805,5.477357653344539,12.17321674771294,18.346033556485008,7.000214650381453,7.291006234859756,6.7820513400786275,14.466326742693374,19.50864125716687,5.649693364020201,3.981965694774865,15.66843513236913,3.0315205483153695,6.889548025165353,3.9975660031141347,16.550328642952145,10.305544053468827,6.828643513330461,9.085168703991574,11.94592590328378,2.495759557489814,2.9205509221290527,2.850144452609653,7.415957881464572,16.65645422440778,19.31487963778576,9.153468438794334,2.732013750989579,17.121698394334235,4.669509471828288,2.979028576682863,17.16776898998614,4.271227195360012,6.186835643774691,5.913020707845589,16.49366020592304,18.85968252369889,5.393723016644012,7.544436577591482,6.95947585213847,8.991131966343321,14.96222934692395,17.899736590919765,0.661185256621768,8.597971830810497,0.8850873673174453,13.616229270292695,18.711073209540587,19.766440114402265,1.4920342269260667,3.2563422248869234,17.10591883651354,0.8575840254210165,6.179765759747773,2.1544645506843185,15.862444755812923,10.366638658777582,4.931463918743315,11.646101593831336,9.636807976303036,17.723194368708825,15.411212412237898,17.110454347271983,3.5080588956417813,7.335691586140847,10.972187251476395,1.5545653947121973,12.844442663867287,13.77966240146717,13.09463141507345,0.16796746985407562,14.241228327602009,18.708669010543417,11.884786500831591,14.787612771848838,16.130392130762292,3.902135767445496,7.242050134528508,1.6252274905978803,16.596093524637837,13.219801645212472,14.920077091695996,10.736043221978457,13.8985473810204,6.522419545339324,5.262156941411562,2.448823426425357,9.264945531516675,3.895849082014835,2.605502054197335,5.402503208189531,4.679656870476343,9.194996480430412,13.45709330779123,6.467007201645099,3.949226652953026,11.750616242457536,6.092934279783591,13.634098735566646,16.709845446494008,4.2998274663311165,9.138948307338342,13.67749608317348,16.661710927878353,8.996528053696453,1.6753494613642461,2.7481040215588637,17.727947092090297,10.315424281758734,19.22287279151053,17.28178757385969,7.066742999680069,17.033416389942385,18.853196528871955,4.621122576246965,8.058100853800983,2.358886705899317,11.86271614037679,4.954682893020679,18.194551910345766,18.03129283314739,12.39823637958111,0.07460756814751335,11.711818036257085,16.92168526919652,2.777010315838151,5.480536045219879,8.208600986772883,11.455379367489535,12.958397708951548,0.018152591582922817,0.7729104294522582,3.058205614573377,17.299752163732187,4.028565347575084,1.0766970494572492,11.876271328910954,10.890636447618398,15.290317882914785,7.414981335313886,1.7013599833388326,10.526685232382134,19.48652534397025,14.342544421434367,6.261126893984956,19.187222853209235,2.2753338267623135,12.16095617475264,13.56014903567564,12.921805260479191,5.771250313942975,3.7617059930328534,18.756388494561122,10.218972287172221,7.64459986852049,17.74993335164609,12.959463508241917,10.713436559381545,13.712823742185902,17.798707491515135,14.904963714612665,16.810134559674555,14.396619945154523,16.625513390832513,3.929716332667592,4.563539624076194,18.08939049592432,9.950908693262388,18.549465055837068,0.1856113332145526,2.5286289960169706,3.7410064283101585,5.422917530369871,2.160809685247873,7.693262740085842,8.45029969277439,12.885937371626856,6.614453554712156,5.027963905349915,14.306790856695347,7.461705389364086,2.654950859796532,19.26270678395717,19.866437319978427,9.662187474194784,10.788175495647545,16.47601448207321,5.5999109323819996,10.286788031505152,10.457242125649131,18.951575972632625,10.95349568393759,12.271230119097257,10.274377969597385,18.771441341391856,18.37217385314299,11.912998977968009,17.964507742610557,8.592886213427452,18.724988872869275,12.807727348160714,8.258142021631137,16.246189200665686,14.966323764386473,17.750253566341062,13.212888615180717,4.529055159779882,0.6132258820988756,11.592676033873225,11.661105494423968,14.638934892503617,19.26129203799124,9.492782313246163,11.89913745823688,1.6498464583324113,5.6562229258480246,12.799552408339213,8.88216201788179,10.088564411779291,16.41924538651945,6.274141917048155,16.2821811116371,6.358497815827917,2.101326176608085,16.19299312873213,7.691016486694906,5.137163369646753,16.498768536313364,18.672183155598866,17.01292156878473,1.3510327826451807,11.28232036732976,6.333986837374543,9.16003768542334,14.935193931527566,14.018727355390679,7.587017436940888,8.469299356436654,7.935272530116806,18.028376294048705,12.406056743676452,0.18869016107850634,3.1927064526060356,12.771684829103819,18.348827674145916,8.172573786259335,19.335106059097747,15.525212440775595,4.898956910006391,3.111546212181069,10.323911964505639,0.6983393110282732,14.023236697873834,10.848552953218054,9.908734070576365,7.566661005378004,13.880006224740598,9.464948970346438,17.372518287592666,7.570411721032841,18.263649021223035,17.015996777720652,10.639875899087748,13.139880657460719,16.198903197871267,11.140962554413392,11.418446498701616,10.480623629382269,15.554062809493123,8.473906742907996,1.9338473205428963,12.882693143941886,11.727022323640197,19.875348749536865,17.90489956390234,2.946154136712038,3.124724207615257,8.294298815330286,6.095622971056924,17.252875326399746,15.160126441795772,11.245181215354565,17.767277369737187,12.166528928060973,17.65529178854686,6.2719012614601155,8.736290421294548,5.807327159239346,5.11556543204537,14.096805745942174,7.410978671889028,5.169092768627612,18.06403485577823,13.7294792960326,7.991348693939981,7.951459826946015,9.285452260277438,1.3239901121254505,4.445645950281225,1.010324546450283,19.162810021193625,1.5184424455180778,17.994613463680675,3.191194313196397,11.077937528734916,0.8203214503717016,12.515068674971115,15.379385710974036,7.533878414622999,0.061629947533456964,10.299782856963535,2.632601339329348,7.4045373425246686,14.359139453196663,9.948010507441811,17.514855098845842,7.837564979076879,11.697597162001582,1.0594073891192801,3.327407867917165,16.565695711541007,7.241899637079072,15.869952303211496,9.550756795734525,7.631402022207006,6.542445752336086,5.8064843987508,14.361527799629936,13.053030671807786,11.275118153335724,2.419315119539047,10.317904327165039,6.976352380132624,19.649305973363113,4.137027766489059,11.79422471063262,14.977526331626553,2.3834247634333883,3.4552812633615027,16.74242582738203,0.3197218882449615,2.3452518764899866,13.028937691240037,4.43629861227905,8.049806489947953,7.4876957181385695,6.691351433041439,10.381897308282348,6.253638898720202,2.9861234184128493,8.76446955829084,14.459271194721119,19.572059286329498,4.435207619638755,11.641446723293413,2.07273755068059,15.414804114685513,5.7713228334288535,14.926316480735316,15.72487001070586,2.5638659216130355,14.715078275018708,16.485626583598258,2.6085752883563718,7.136733255648666,16.216413549821404,6.731793054684241,0.6826523821507546,5.541707884515779,15.849689104328167,15.43812881360925,0.7421292692289017,6.1909088843394455,19.256040245668057,1.3367396985278246,9.5143542870075,11.36848693074799,9.607996192088212,8.034387032405448,19.982932701081417,11.281104135800621,13.07305860386387,5.641501052684212,3.390069921665435,13.138343264584798,10.952959182115078,0.4257246352759658,17.044405594810716,13.729842831305916,3.660971595243949,10.700306841053017,1.3264941176428602,7.002712298376563,19.045101614573777,3.5578471933149114,8.885176784603871,16.457991002219355,13.434124176928028,16.436648098457812,16.97475316023931,11.489429999410925,3.3391628445933064,7.259246913819877,8.805643397516768,7.7468288127678075,0.5791891090272117,1.5295767401700244,10.566511813511749,15.808996836709547,7.983027856229388,17.640884995852872,11.91167947728447,17.41033451195745,15.44890856538954,15.550215132063459,17.014128199697804,11.733689180004161,8.357986137803618,17.783538622149248,2.4186113732536896,8.547746594808503,10.266110667644188,12.861174776121471,3.708734905979618,7.8100947630436846,1.9394529318861142,4.972295231189912,5.096289536329355,17.469733153461064,7.614185197720471,18.02491549153682,5.691778999163657,6.637634258687428,12.682071813032238,2.3751457042198165,6.896942695305617,11.018879742416381,14.585585966875465,11.937448687835204,5.69424725817937,9.907905072004603,11.027403264314263,7.779931490069694,16.151825551587585,16.917704558839766,16.348099731001675,6.202051179109174,18.158102249093922,16.37963923462321,4.125431628029017,18.712975775529756,5.169558470273823,18.182400155762757,10.47151481158297,4.405000960950898,1.5723852666382188,10.59177373292794,11.805392695399206,2.526127058928398,11.457600873345509,17.05505326611601,13.645362624186932,16.871502344020406,13.985467717854316,8.09632742300288,13.690392952979863,12.176086568153579,2.2594201474753994,8.393288711628784,8.16421324930765,17.742927839206573,19.68037131379386,6.052038738200616,2.8444357832764977,11.84875001230159,16.332113084201822,13.74749152211708,16.511475472346568,11.637301346728863,7.430585246893147,1.3887233160995915,17.726194559744517,8.423589619164735,2.327347107395976,8.820351222260538,13.817989748517366,13.735676879153438,12.020168919629413,14.73070091561123,12.010023003894359,11.504215253500178,19.225643051576583,14.924658162156392,3.4203961497489166,16.053483677202124,1.5786176320474299,15.5762143567067,2.2360272772947276,6.950247389485629,3.4747964358627836,0.2561840611362953,16.498722287630734,16.462886502502236,17.97779808037605,18.032224596074478,4.2463114799848345,5.8210042692557185,5.966529508045109,15.416618805974483,10.617429875840338,10.647712171232403,8.237890640547736,10.86441997029488,12.399683133403325,3.2205623030059316,10.513434366582377,12.681522654006269,6.755042577822223,18.72438149202146,8.787253778641787,8.804706515971596,3.217242497184749,2.6309621575724806,7.139734690643427,2.5492158843759283,7.649336610163031,18.86187747739349,10.021101442201847,8.533900458095722,17.585928324182333,2.187825553442697,5.932439422079536,4.191799756923054,10.610764976653758,15.573109375853974,12.548075265065615,11.27892303953642,2.7694138779060973,13.923085459218472,7.175606075726235,17.071885001664103,19.070117650509797,11.277432943396267,17.36404622738409,1.3236755867074468,7.3152154008333925,16.79871551199036,10.048696251144204,8.443245828981372,14.841020609467499,7.481015846063608,11.834401929385127,14.763627845437854,10.063105098169412,10.124274242602116,7.912441992242383,18.345748739709414,17.26573683978629,17.637285316323272,15.258650746149144,0.2969424672234533,7.886882274799811,0.6245600608616986,9.972529418957109,3.4280217084575426,0.3264345746028763,11.436731099881957,4.215918453308629,13.783376999221243,5.123872047525957,12.757096961225782,6.950631815170207,4.591790194617009,3.4307932263967134,15.522365261958345,16.77956276786439,4.584490866993884,7.387298844269794,0.12436340765148213,10.088417897474438,17.215044133555185,18.95466659287333,14.341084520835988,8.938292130846701,1.6310851634855572,7.19799267631545,3.5689227228271703,0.4188209118232811,16.41324553983756,19.652953569913937,4.734355827334391,4.747085502483173,0.03448532879535726,15.660901533364676,7.746410172382747,14.073035329392454,15.435719980423634,14.29914494403263,7.3840769160251885,1.2077366285561997,9.014371412018818,6.165293669605401,15.298770269243072,12.583410777894507,9.781659726147325,3.837305240361677,10.53323629146265,3.0168990028844833,18.37718536773724,14.739672854977979,0.9445367758396239,4.813358153862577,13.721504625357873,10.444853348172543,3.0152735767714844,1.6220819861428515,7.500500914980952,3.615645648552679,5.2882029716151235,8.578391278809146,1.2616465559314927,2.9532296204791164,18.820366834847405,9.812147797918055,0.694241204242565,1.7707872564816762,14.666612173364516,15.238336335433456,2.7624711491410237,0.1555157116694561,14.684297400646198,15.43205092400429,7.622796569267272,16.60271069390737,17.298564772779777,16.21815345388031,16.166106976386573,11.616687206049665,14.055078242507317,8.612997369389216,10.235998698996678,6.339813175082991,13.22074748394825,4.052199351982733,9.153301064834785,11.200295030712324,3.071033651860051,5.400077088828796,16.363407032130457,10.897569428794412,12.78873612907172,9.710287924096797,4.55036762223894,0.8171319955662515,5.814279469301038,3.185068559690718,9.439467784743005,11.448351779245938,14.682184753448993,2.6833305204299363,13.389172986138647,13.079579891145748,1.9882563697204692,16.85074362260943,18.841887535274523,16.5805210548713,8.205885988767626,19.356282633710737,11.408948363423201,11.598586808892808,5.405863247642535,17.560764777088636,15.648510043515508,18.699143403489387,15.062581961658438,19.70185521176182,19.42608875069595,19.852537343605803,1.3198425134860203,14.731818961483443,2.8692571866126304,0.9981973780817199,15.970302688189584,9.69035229193032,8.562487432404907,15.52104881337896,17.003022177228736,2.5604177436238063,19.984036649557076,13.470596425022524,12.09741805915547,15.420902896333132,15.778397135730625,3.6976876264485314,8.586911369481207,11.608172644259307,12.47309989878894,4.981563141684813,17.6262112070915,12.645138492320974,16.85403756277757,16.00711395955343,4.5384663049290275,15.690252648755605,6.065375510251618,12.640696091151874,16.756968232946225,1.4521792677706147,10.25096163223882,13.859535557438125,16.53968067104287,9.126954009767715,14.77046773017927,0.24063311701665313,4.398682175013273,6.0047479793405945,3.0519898587332683,13.128280145020472,0.24294415535939695,5.359195359664608,9.373309161484652,3.7149062678694733,10.757288998450264,12.604622476933137,8.382636982355729,9.721628822091727,0.7432238647389067,11.549163468680126,12.967424971920565,0.24000459373048066,15.959918962300254,19.23521800376819,6.526079335987132,14.737948268256144,9.4600259815719,2.5459479248593286,4.111678249887878,1.1748783279515917,7.0019430466563515,7.67357154769841,11.620978853616379,9.023025488353156,10.147681039081252,7.602361062469534,4.553065738561255,14.400215671821432,4.021225870662768,1.5240338901016237,18.116159614153897,18.139100744613238,5.235766081497664,0.11272676205976051,3.6165400093074274,17.29983679878437,1.0987564332663302,3.1547933975449727,18.728113508162355,17.05418655074483,0.5681714956134387,1.9918874276441523,17.266858371208855,1.060730734367099,18.613782348193375,6.8417516656961075,16.426453773765274,8.070535245709314,13.053935588578067,19.056576440204466,2.682125645674298,11.41852455971392,11.286208684434303,18.876328571346356,13.482004582300364,5.485443262215353,14.343265830717247,14.567259064004618,10.103395473402177,3.9488375960317557,11.391334296759874,0.3983254817859594,13.686118686099684,18.24198987558125,10.893623673001112,0.11463277558026785,5.277276937881439,9.19915057667724,18.774448270142855,11.837639960299636,19.443200321932252,8.259521015058224,4.436864616404961,7.56763278202599,6.641727709868492,8.340763427231543,6.9209797129953365,17.649111343798133,17.482842950572373,11.954381052939983,13.468474073569805,11.69980413106192,1.305333451281685,19.979564297317637,8.58029277993285,11.343590456276962,16.20250810034973,9.35108820900265,2.186726950007931,6.691090467284653,5.896830888260278,17.853825244943152,4.53719202477505,10.883252670287424,6.61968459837365,9.063321764165915,11.051338987194494,3.623391613345164,16.63098590328125,11.146414004564393,17.66832395069382,15.549313656851727,4.714169158894732,1.9395304642455002,1.956685692259934,15.389506632104318,12.540471738154423,2.7681082394869394,13.961286244536272,9.66324453745575,15.976937845288326,10.526720130699378,11.831609577537607,8.791029987212422,16.23992809319335,8.539398347001729,3.363473168217852,15.799649511947491,0.22285279428984062,16.218391589774548,0.8338213203931355,16.030629760393616,12.656140237848792,12.142426183098788,2.5936182685298004,5.001836298160143,13.849555354623252,19.612017153364434,16.81711808155643,5.410498308671903,13.000693966736737,12.340078102421428,16.317656636416675,12.486025239881076,19.789163162305186,12.956108115749988,1.5618564460378792,19.225168521176357,15.112975663802466,4.381557839642487,2.2755906502660705,6.917042627493455,9.781157660207196,16.912976485702945,15.896266262688478,18.32571556222593,8.808656133589414,8.869003502912465,14.794345902453854,7.17925678547946,10.013877086732649,15.585350134938212,12.219175302226155,15.09539682947044,5.61786883793657,13.376707598205613,5.8140653371410655,12.710765335412301,10.850452953303975,15.707625705321222,18.928826529996215,11.059156515079188,2.7503048315326684,2.546850943196106,3.5657445235089114,17.32029612896916,8.030904242033419,8.178169494060658,2.0963923062540912,7.194969791554415,1.6652196666264851,17.141148228523132,11.59655580130114,10.523947566891522,7.982590276613144,19.815601664063767,18.132188386347764,16.16980263218746,16.205488102453216,8.612611704318267,8.210652640532633,14.368727990823075,12.655385676873925,7.161019895420093,17.303598392605718,19.16299071513768,12.568937551687407,19.836969469602323,19.235994965136378,4.468563497003748,9.010492585787201,1.931941303768543,12.453078476801377,0.758468414258946,7.8695705241808644,11.32470925464757,3.969466361771641,17.14940535963917,16.453279581865804,1.2439273260137806,14.837397562770551,5.9982765241061875,13.270723233294145,19.342561232226632,9.122876313775695,10.82470253765444,10.352839498191656,8.850618599262656,15.513259229408106,14.345060054978283,10.416923690603234,8.453185160988879,15.989224374939441,4.292371513144992,10.263324874338124,6.103256956280387,6.470041056757494,17.20949612239284,19.967404046624484,0.7679156741659332,14.025855424902778,17.348759687357337,6.537650075120616,18.057817465227313,8.810570809090352,6.614337171634541,4.141061544638447,12.006736974718933,14.024612108435367,0.36279023754571593,14.733469776474756,11.673963120298684,17.039473593226084,1.4034970682434533,12.250374598520883,19.715663860169418,0.2719636886589871,13.087720811075174,12.404154261461153,17.92932095622042,0.23088173624126185,10.251603590503478,7.969314080012229,19.461955436620343,10.92821976844576,14.3596031910438,19.66163297132986,16.782334829318685,16.99118097368347,1.260871919868518,4.121005385693612,0.3504748384560763,12.40670561608946,12.383855108806333,14.61179752499783,12.494574229841069,5.365314145448932,11.31656172297378,10.200315261158046,11.958281161241434,9.077560568960115,13.376957963045912,6.458460874229042,3.787259598263084,10.92438621580829,3.513311310901277,2.6530676743172954,8.631303393411054,16.129878664213663,18.527229863448405,11.363468078888562,5.7374254907346245,10.399606893291736,19.465333144989152,4.484993948789362,15.033946833403817,18.684202229894137,1.1664044574296328,18.766857490184748,12.73317185017822,13.587107863808612,3.439684025569134,7.064038016469638,15.113661320478284,10.808783525988117,2.5202850109082364,3.650780339316384,7.351711464797397,8.288631094631796,12.503953216202731,16.205445369935184,1.9831823744756027,17.95607092724344,10.32452789780737,9.94057482706635,8.946879141991445,3.529702114655473,13.00642818070969,17.00715592925294,19.67151295801134,1.6142810191480939,13.5509036838911,16.298896886861748,0.5762674020122072,3.393121983333165,18.82482842816442,7.255996541359133,2.1273358955404875,8.42824504165446,5.997716377704223,9.687419310696473,19.118600340732247,19.87318333936145,0.6745127411678009,5.898616661984892,12.06414847363041,12.272769898345825,17.61108908949619,11.362314510674985,3.02178648800719,19.53497558825532,15.349792281786566,8.418143115071505,11.041068786375675,5.069126797264096,6.772641892099038,13.942996575193876,2.300661379722002,2.0239546307232104,19.135623381249054,4.918388261033573,14.180671665612717,6.120641145625583,15.87661662668368,11.632155061466714,0.45674900877500146,3.473002614611138,17.00363847176799,11.244795325052754,11.66603777117885,8.086918945741077,17.697682100686222,9.696899954408437,17.917481820587,11.440333269226794,18.17106104624729,1.2490034898082403,17.256990455379114,6.67588265363936,13.571047273116053,14.477243824858519,11.824135604633517,9.351281171026645,13.905784716006067,12.633501917900563,6.788202905285221,0.009245130894810494,14.101790429367128,14.87345698507668,8.091712834000218,10.697455936382436,6.868275614936965,3.788962129258704,1.340610914857785,4.148225770916385,7.953954344777019,19.794279169999744,16.958708197388535,6.413014129415808,8.59023444243347,10.81299127905336,10.086664330750947,1.171026846424188,15.307216896513305,19.958792620232323,8.287959679997808,10.665658576682176,5.5997728808003355,4.987533642470523,18.55203433198504,18.07408667843141,4.949771318204017,10.982675364726004,2.6828796081816098,19.13882566986151,16.664658171795857,5.082472411398045,14.319471297210233,9.643724789210752,4.52550890122374,7.1112531711941696,8.080552209047877,18.245529201439375,0.22105486018482168,6.471859018820791,4.886399456648141,8.930659164617548,5.446174719691226,14.649100477235045,18.317724872116855,3.014320258021179,6.612234067445346,16.414723772198712,1.815164214234386,16.103731534094802,6.904005116876055,17.831020477722976,2.949310472689737,17.82515042034816,18.725804147063418,8.414345189376773,5.428325638328246,15.090082608053352,4.302055100546456,7.360416680066195,13.024733850935197,2.845180274333976,6.315094579638405,16.647054413577898,3.181955769220992,1.4550329206773105,3.3684668901988335,14.744902986037808,12.80384811604283,9.402969313413386,8.055177662416595,14.719857571417796,5.906725789267053,3.9404508325325027,8.028950578557254,13.934693863806,18.781963145052487,14.299539739038135,14.623448303991896,4.992635950751958,4.946083401404526,0.823586118745836,18.234897381048214,10.25172450235058,6.351360575151941,10.723108137157302,18.688709550479707,7.745410155722161,15.752171462779753,14.39439204478938,12.939174516194424,8.106820444725473,17.319685671474527,6.249483720794067,14.053248145028135,9.130321667406346,3.690365994590774,19.81587983481831,4.743337023260121,6.5496395071951286,17.306562352700674,7.2942447593368875,8.044218561509613,17.560267951280352,12.741915160348354,2.1373770050643515,1.5598807093752454,12.666497453090106,19.087158911399253,10.528073039906886,16.926710937134022,8.93500590318351,10.401698881012255,14.61542390383392,13.7107844581552,15.416233370669037,17.028692002862435,7.751418750735959,17.651563777558046,10.627739833251653,13.019019906455643,10.279943625100362,12.18116899363752,11.311124609073628,17.0564753791751,15.581329460019017,2.7578692560002915,10.9188233636587,17.196110682913158,1.9456148699637543,19.878702883601484,13.746688624669892,3.047759536589232,17.53191442321495,5.431786583631393,14.151516054042661,19.155279894099525,0.6964363919232541,3.0191360772103337,11.460229773031214,16.28369391766803,2.716592035257692,3.303844660172972,10.207683242309145,4.09061034508615,0.8381691015847226,13.166539878771815,7.470735107892654,14.691398094412484,18.298821981535074,12.218694559959111,9.36057356828675,14.117308872899613,2.499205374931388,2.5133787392201112,1.497492737096966,3.789711606117878,3.5145236630108823,14.897786111237998,13.768099335307994,0.7296959893861832,16.867001220025095,2.933973680701203,4.208040320533564,15.79899955065188,14.42124556702639,3.158147774376201,9.76045228171223,12.773092608423893,15.49320519138876,4.069519664678101,19.098476848994153,18.59550301238581,3.0403665549328585,0.2096644508199219,13.150340865113584,10.850070540403625,14.301727032616558,10.479883125598036,17.21742741901877,13.582707599043168,19.45642062591945,9.653974284473232,13.01320976116199,8.127776679683851,5.745185971163478,9.308076259238526,4.8722527371736435,12.844740942713408,3.0934084397045813,18.146154360939054,12.081374409920329,13.295980139099154,1.9230845255845619,4.712876079020414,15.53864886631997,5.177742681495019,8.887068480004054,7.7375678716831375,8.676887982498783,14.73848424999284,11.376304113737401,10.683268564154659,0.7968397942972372,5.456063211409661,8.822139272135004,18.20919356198641,15.793984497461446,4.770178682801101,19.177130466634104,15.641443728925704,14.405729426537931,5.836500482879958,4.9923350701213876,14.016388597000988,12.208377186300389,2.627222796450215,12.059083762361995,4.796588699677291,10.393064694971708,6.203298785911078,12.534081252505818,16.965415083406178,13.824715454643751,0.869636586070115,16.20452284675896,6.850058413918583,18.502461648057032,8.667211682761945,10.782466588133017,10.58347253007681,18.083864736830687,18.279640370569474,19.341974417064133,9.604096082192122,7.059309284281254,19.721944252012953,4.220789892349881,11.537613465171571,13.08764953065368,2.1753676219866325,9.840069917899722,16.017673841009753,8.661220360437095,4.657201813495617,16.106506375435238,2.579454602744553,13.224984898289506,19.110993136301563,10.480119558946491,19.117206899757168,5.684298241583443,0.6657434761553471,18.265956053894183,7.138746148359951,8.123497782058724,17.737936255209497,11.543943778935448,3.6015205090130475,12.669317910329635,1.2449007080079433,4.791797665287438,7.798852424949527,17.563720096421807,1.7380379049861894,5.899827493215213,1.0972499924063905,12.939927197873162,10.025521223373651,7.198014593092528,12.58869935740182,8.419281512975779,4.671752097026722,8.577907462500015,14.190878856787892,15.074161428953655,19.71162970990161,7.469742456130408,0.06602984789808808,1.678102146566367,11.709084490398528,10.079494329882369,14.665465088496191,3.0826411453864777,15.399209649799154,17.68482857385333,5.098676278456251,1.0012874560832241,18.96952464304348,1.9530942549458619,15.750456081342197,4.446885019550946,6.509948714422444,10.913248214711695,12.13986287611121,3.3928373801021383,15.972315311399989,11.255449402141235,12.430905375761444,1.7435668392680492,14.251191407729609,14.903457590013378,6.107829382287457,10.411480830440127,1.2913745961734202,13.961883370458645,2.960457797388756,6.361176801252637,9.970537253517735,8.032538509168784,13.269046093675513,4.924976397003089,16.536920652011933,4.0727863545144904,13.841164518008178,13.164425710021144,5.632784508685327,7.712070999541916,11.145004117644053,15.450579383591162,6.9461388528179135,8.636375729308835,1.3704220611106832,2.786599913633241,9.476580503728709,5.849266526333392,16.950223642799994,1.057450075633919,3.9449407586513363,12.620482278400168,17.11767323068259,11.282587615854496,8.877038791259846,1.6191807766346678,6.265026574455663,16.38151687769993,7.953924281330407,17.758938471223516,7.670441562840216,7.419035426575271,7.784036415803883,8.364526945211988,19.53205483902311,15.388653404502563,9.530437956861523,8.117077480366008,6.769191855414509,15.127621249868275,14.821786759421531,17.443176856872114,3.1683718133240335,16.536121683145332,14.517309349494717,3.0132333013963786,4.707658431268791,7.490406419090898,13.752357225106099,9.328000274965067,0.025254744505276427,8.127616344838238,14.819143916919067,14.248206677904562,5.745150676317579,7.273165907932171,17.34680257686248,9.426021488683567,17.082470905773313,5.829410291667614,2.2597500808541104,17.626504893713246,12.09247295356021,9.24712991366198,3.1072009328006844,5.147763675346346,4.658422838819241,17.057422641095062,5.193065646109982,2.732447026545133,10.797703409832348,17.501509787258325,14.700631758706027,17.441032095861964,16.53389474395317,1.0104264421816422,7.295648577899967,1.2738057415856119,18.67918744409453,6.636465310610542,7.323055100960585,13.416108621609762,7.713359274052207,12.203961832919514,6.751177332801754,8.239513155461516,10.138464757582263,4.483358631843015,6.181664550078789,14.856094404751396,13.013124991017841,10.138123311373164,19.68574314484659,10.004212311307587,16.083427689001873,17.208910003010715,10.546353896360824,12.875360222970338,16.049837317043828,5.456694581178763,18.172579862136562,15.78870396775792,14.269773147520187,3.9582037523040414,11.203654539733048,4.811185226138006,18.392080654117706,17.615712415167465,12.323392637984089,18.801035014058858,9.741576185065455,1.4795954160661573,7.404191057321481,6.740096862264964,4.343634229240352,3.9253524602382583,3.693972713157887,6.865942699816574,18.583611993495186,5.37321217393933,16.096955861519824,7.486766142031525,0.7347291488618879,13.601517796890068,15.786481577155183,9.93908241271277,6.471194385654067,3.6808245044899257,13.949518103209474,0.6338616227658589,2.7581446407883714,6.324226751427613,13.69441374151223,9.08564382783052,9.07305306519229,2.1333095366787402,15.564952057030554,5.295744313252291,4.91318247310689,3.3153577909448817,17.25559699742711,8.660384297000206,4.277289890405078,3.88492146834972,6.488700130117486,14.70194852743905,4.723025628143893,0.4156553770295135,8.913322743848902,17.891424757767822,17.71054773702741,15.49008969831203,14.805160470405191,6.986301224247864,10.390860500206532,13.534628517541849,6.360171863491737,6.626273290131204,5.762703121409869,11.985498219867212,17.018867155048333,17.217520846394876,11.124456839147673,7.718658741702771,11.824904625007191,9.66997966379445,2.1390777388250726,16.13909799992183,8.794159414024744,12.818089181698596,17.030177942242425,0.4268456204126414,2.4329664218152836,1.1349367894703288,15.972502672268618,17.26691808022315,11.889244761624775,14.085278880372902,10.185015866838532,16.15649193309548,6.3376672592938865,9.712499354133769,4.373444708894927,8.987757169913188,19.42877811842908,19.624677694460328,11.274088049813216,4.1276167803521835,17.269682446088453,9.424634184844308,18.41481915947857,6.848851225111141,0.7544791876913415,12.996746313890796,19.746212285376057,4.219241811458598,19.815172043487816,17.013266892095107,10.402395890827876,16.877175265643647,15.5658213790058,4.038053284459231,6.480348180133766,1.1219346305752476,6.318228101338859,18.190531369766436,19.815731832324666,14.433809274365132,14.00617207325201,19.659686411721687,6.31566173617879,2.4721311904448617,16.653056366329903,1.2024882314322083,5.40033246879025,5.387040325950383,12.92736097482213,5.596760391578739,3.826896245512219,12.34828388709198,9.095142385470524,11.614272077371979,6.463874854590204,18.3666514250579,15.129032630228076,0.3686547310434829,16.9697628160227,7.269522605844969,3.385483273202503,18.2380914881919,15.254915238465557,8.318917244857055,18.972092381003506],"x":[2.702164558053548,2.288649585169358,13.903071626517995,3.945848250683648,18.850690811111757,6.212022553784209,9.593308823502262,15.013781018761673,13.209043373502606,15.744364413854424,9.743063947600476,15.882171456434762,8.742023343692562,12.905644416770636,1.3710711742559,15.398744224469931,14.974120265602329,15.493710471344162,12.911401483336089,17.867391651039114,1.7020878908980386,19.617304671353388,11.885120115588567,7.47458487494943,14.087909830522044,14.091094223438718,14.528188885431765,1.1082842276864469,1.654675847395266,3.768241713035594,10.079479078441098,8.045242434564601,3.510045367397079,2.1943158328683143,8.404910526125722,5.745368767754662,17.264802464411698,8.436379281493696,19.01970264769766,19.473231245925014,10.144999509046748,11.955463165699388,10.459785350638766,9.13083182015868,15.36171810768478,13.538635382522926,3.0610707863049713,8.087315597285212,8.18751584954109,2.2554722569450547,2.077479444411896,6.476005995054415,9.766352189065927,14.443366403351344,17.430259426238948,3.3320625546155735,12.341004221055227,11.264742572994791,6.8617641699754195,11.549660102696663,7.352721235766646,8.855838330831695,18.131582125348473,3.294153280381784,17.98984251111911,3.0847787143592997,13.656595055108136,5.564728178354592,19.25205631803891,6.524585150735507,1.9889246587118548,1.24121245045969,13.981679699485179,15.860467785291736,4.701690846683602,19.3856556964605,11.372934259112618,6.496614843167561,0.9692910632003926,7.923511994800974,6.201989389486102,0.10847898629062325,13.867674422320366,9.619354813883003,7.214783218447454,6.389406630647874,16.643790541700227,10.752165392618824,11.092825132299877,10.655908010679411,1.8761639138145592,1.3465100869159219,5.9793565676951355,12.940976274041947,0.7076762343449472,7.695125781259322,19.489183450305315,8.12492018301494,6.750118361325752,4.692331645369112,6.907371172394585,7.792727324675082,8.330919894778122,6.32927310144241,9.394653583944281,12.19861580695996,19.562231748428257,6.24962521883031,17.529191348668576,1.9467010137950247,15.658735347160473,15.125298566360081,10.35923552567031,11.935675706434496,14.916516731278513,8.802394148365714,10.653825932983793,15.4210828273424,19.099831466331022,2.336504319922441,8.835499484961407,0.23918970933831663,15.591410938859207,4.304873172147667,12.01545357875525,17.90396474925727,5.181651004688952,11.518590651594609,18.330772251700406,15.814834044610585,3.003623895209353,5.8235804026023,1.9641764434505626,5.724919588738433,15.838499538277127,7.663089617213097,6.488092950197206,4.061121812300925,11.337265717626996,1.4984618182645004,18.633676014890543,18.160583361347147,8.841995812493897,10.971673811481466,6.014409390740498,10.39292421656587,13.741217056080268,6.874987695548427,7.816779810354495,4.9308537653270434,12.863034543228608,15.879939777678684,10.657181487850988,18.73923839295292,12.115223235871039,12.760996073951375,5.72236557085839,19.43279682005312,15.300262238297137,9.750106362047347,6.599976049162515,16.19354626271913,3.231433366833496,7.441145432606522,4.977841296856935,16.643121493663852,15.06406198557707,2.0498489248344676,7.027947863181434,4.962531912379604,1.069094413585292,9.5067161351266,13.101120202339573,16.38777272667939,4.179669363707923,14.320863494059456,11.841535545530398,6.0073049881960205,5.985904426691229,15.962136857199098,13.62982963222767,14.290580001026925,17.411288681304917,11.98718717706949,16.5635253069969,15.74209274217802,18.19397415749839,4.56741785522063,9.223312118583706,5.5540071518074585,12.623346761726918,7.672650024148364,1.7397720397439054,16.78837754139678,9.553117160165678,4.02585524475457,16.23656439729394,8.813355616564639,16.06426195695635,13.197097372663746,15.957039129919224,13.418473238583992,14.382500096265542,14.9528989075584,17.65111466644914,9.930318037094569,7.79976758161776,0.06477136093460345,15.152644362749811,16.866116469330613,7.0450932920818765,17.77067519439678,8.635941340274176,0.5773242450390548,17.70903131200981,14.1112001560912,13.31968903683844,17.625643793812955,18.53357038467857,1.7810103565267,5.924718126584656,15.771437944696313,19.76446404366638,3.6555462645225267,15.209958477376112,3.932351531079643,4.071818044058859,15.477678597878516,19.00036166186617,11.879921024430367,14.97994858426452,18.975468214488874,12.030586093569532,12.444293487423188,8.52920056307088,7.743136395746508,15.645726934668374,19.150055674815356,10.471759119208501,3.534341913680552,8.999187182906034,15.65909612053118,5.499890215977481,0.014494739604100637,2.037863878013142,13.272756178742986,13.244625070358627,8.664345862954764,2.6575486949903704,7.05514866309477,10.11409385534983,14.960644172579137,3.369139402246981,5.817472565683639,17.319312365245846,4.304286170429159,3.3299876869762812,0.8986982546481315,19.71658103498303,0.5197195234380692,14.455303650167405,11.793467503994663,17.250332611190295,8.156194523401066,4.985865690999369,4.932326762711026,4.994569923041063,9.398537783269493,12.02114557698624,1.4889449591900794,18.417976962199845,12.03128877133552,18.316294805484375,19.73293115329527,16.02903888201421,0.7403689249149847,1.7736889862601402,16.71904936138357,12.536278408250103,3.208549119243007,10.226975456662695,16.52839055623869,3.3406890122519517,8.14479437605932,1.9976676200696186,12.16903316257496,5.574659829747235,3.7556735595306456,18.6924771931633,9.760676928869799,17.299048110009817,15.306211028699842,6.816889524740333,6.022352027123761,14.526011990045928,8.516192798051634,7.766693350979121,8.607688783355965,3.841092258283685,8.735061531098832,11.311378676718654,14.596457506548518,12.56552288206651,3.0106532909624573,10.57405950107826,12.172418589294484,6.315449064971044,16.65516923393827,0.38839168873093577,14.823308573911266,5.341827118357836,1.5965159877106982,9.32192436728216,14.798489261121226,18.567011995962748,9.675938430931277,9.915723497305326,17.793060023902164,6.75019261797865,12.051101129048188,13.278591945159231,8.67138810545387,5.347194761911993,19.31876438369185,15.063486550978515,16.574782945671373,1.3894506776872584,8.575307083221912,1.6896798443758154,15.066656355112658,17.07002113358023,10.137735087632084,14.122737321487895,10.304962558325524,9.514480663801166,16.338736616214486,18.929479769560803,5.881730817149902,19.89830882869044,1.9341277047630179,4.524273764222464,8.878523742910701,2.708692404371953,6.194451888074672,5.451422332111071,10.673764982904759,6.552282666722422,10.687276022601884,8.985550409039034,5.288381421257511,6.984920094575973,11.791195116120129,5.442799066560147,13.163479389809378,6.279678723736386,11.089330110879363,13.185339175387249,16.26803787100201,5.7890441248964075,17.930889488897456,12.52836918695845,14.423399552591496,15.282839537518571,15.907394919305279,11.563624593401398,17.00150163324048,11.235993967931108,0.6991672840816854,15.98113296114839,17.230059250923404,16.314220314244572,4.808491192369866,15.31991873894809,4.736031036166133,15.842065404849258,13.881781359035132,7.558679406490856,13.44803887961409,0.015674379826489115,10.236854287557167,18.50283897113814,0.01369305339978144,2.9246600631107667,15.474387415544104,12.847082338978009,16.795110319001974,5.15203570690868,3.7421192069843645,1.7670495438277989,2.0075401443956498,14.211166499147932,19.085695102962195,16.202309137027196,19.97042032345788,11.596955271171211,2.487708727311757,7.217117274056788,15.61019011617744,5.586437824762793,12.711132720849703,19.87996455975209,10.980148006123564,7.163690288524078,1.236886854245225,16.850279029450284,5.625842446185456,2.5723847140160006,11.141039285301648,3.582926957723682,15.329180224479009,14.67627832525058,13.793690015484765,2.949585839256059,2.3181496941470803,5.139911727486797,0.9497543069642012,4.964816766035063,8.848524996508583,2.3450499232378963,7.640540891542007,0.4237981992966544,4.384446002258295,18.38002782657229,14.504619380758976,16.266995843988287,9.923987497672474,9.809911582110802,13.365223293286856,13.872867710682666,7.040687653157209,17.27732663015217,18.74837064592566,15.03449750160755,12.369335341590677,11.175370878977313,8.801468738311812,2.4455460345990643,17.295286084384873,17.240478578003273,3.2466442577870946,12.59869648203816,18.39888970973567,19.68180179955695,19.365923736259404,8.37989817215659,17.278372345232462,5.058163282055879,6.902906134630937,4.929377618911737,13.655958711413536,11.556476639801861,8.404210754310348,11.103508409265256,11.290148189302652,17.96453914290698,5.010999778749485,12.81951925063284,18.921789114736498,14.382594903548242,14.250884753409716,15.287906661983257,6.222530799350534,12.29464619499744,9.134218251058797,9.712507067068863,8.120574697851147,18.782156163431416,7.582716241744798,12.25420816253349,11.862675131910843,16.076425623274236,9.686714116680463,10.24096975195858,16.406182939039798,16.730885221361863,8.557326187882662,4.284165674013178,4.8473165160531195,7.395047894979343,18.355677383293333,18.02413419437684,0.1699547431948778,18.576683879608037,12.014525619406644,10.35653876028638,8.06496890762888,10.518209918591644,12.616123110246825,0.0070995916389859914,9.204622345487374,5.745054050334519,17.94947669982839,10.41803102821901,10.001920768578225,12.906622904613133,15.165855573707208,19.877800367438137,6.119740142453742,19.855184565540753,10.426221017839698,2.350479300897903,15.733517337831668,15.385643114471943,0.3532355708028989,6.169034205612802,6.543301163793904,5.015925690842655,2.2563614979087987,9.941759795439197,1.4383000918776778,8.447137392247779,2.2897926380335276,6.264995026714142,18.142006652493528,0.2032805330389964,0.5841755370086288,13.134699482024118,14.506159287038166,8.392043827077451,6.185933163323014,4.871632262402321,5.6451663566472865,0.414938299886467,19.715571488216682,2.283433024499253,19.79715282915892,7.232981380851635,11.777469886086468,1.5809112065471531,19.23963365681395,13.56044061757383,6.177066923188508,4.527434612676267,5.400931086119849,15.76842683769431,14.693506262653248,17.157886484899283,15.956256675450113,10.43371266289963,8.697486129777548,14.701461319628933,18.56048825685166,0.5753591211281783,9.157689201761308,17.90798450496286,4.433029031218374,18.107387870442395,11.013178085235552,16.383581336990957,9.524835367556364,17.906780349545656,1.1803254694242549,16.806212929853885,7.851609623666436,8.20362974415239,3.2020796655076467,9.590521087158681,5.6732628980310595,10.335302505071517,2.044237861774212,14.441734854191385,12.781782426200582,16.93839162468783,12.596180422738183,18.58479564249619,3.9990810874757443,8.42183160272068,13.455047196747278,12.015036310651578,6.7596486398539435,11.404667917458369,11.021327363802262,16.189001144964642,1.2066637971884386,0.27790242234663864,16.010352499021433,10.804352892827694,12.017202697196021,10.407380295902868,10.355199171974663,8.938598129884294,13.625540696990633,8.382111269246657,4.641037543074122,4.388632084591824,4.8220064154850695,10.706918203924953,0.5981988822197604,10.990040371278633,12.234307957496497,5.706924838598568,16.950373143674717,16.782418669706907,5.571163225936586,4.947282838312499,0.6091459969679036,2.8301913923842603,2.593191372334287,12.53720471539852,3.9471706593928513,5.70049025279487,5.377543842541659,14.229387535275922,15.849870831052284,17.54657227700146,13.610875486937989,13.495043768772188,9.931139712763194,19.374749426650766,4.434021950263731,7.046109404905998,13.321282698990476,0.6889083307445976,15.087124927086286,7.530998429477966,1.1453674242352907,18.20214371470241,16.161010324731873,3.4176022152267826,8.177936119299996,3.727442137755026,18.169651436140015,3.0123613004286565,19.332637088699535,12.384962288521791,11.573441815205321,3.572237689620481,4.697364632757948,7.681756065863614,9.431116362575134,3.831841105554936,9.230038314328368,12.44741598859402,2.564521257567045,11.122677156066608,4.182547918549235,12.439542982563307,13.314704104098126,2.461955441205199,9.756808846642251,10.582330154343342,8.171299065131263,7.183829609833019,7.768247828698098,4.519211453656777,13.53582155279177,14.298875901445545,13.901025342951968,4.762254638474168,14.844347137955438,15.16983701150663,18.012627521767158,19.058839498391844,17.22820188806548,4.814109190340807,13.383866799436547,13.42923002838377,19.869183436498325,5.10464878619544,0.644575422303455,3.7937424328867797,10.51272287550438,2.066656606466628,15.159156991831715,10.011442085024086,16.83570160317551,16.522098155145034,6.124557455127224,11.81140731586536,15.562085763756084,2.7883946426244144,6.421737799795126,13.531437368857574,9.312889869033345,8.910706166830419,6.61829072476305,3.7114472010231125,4.495789970103656,11.64824074209653,19.2778319377163,10.202458469284274,14.420498270780717,10.654453807234177,10.566329117622884,19.913284838588787,8.455029498391497,5.83327416342196,13.731052412512735,0.8507949369436041,19.19197550820382,2.1299173142648664,16.974890124122616,6.950493765380097,19.578723964291008,14.850879515318098,2.706446363957662,7.6305962614552,6.522973449917631,8.627921570728173,11.716998264549927,2.848618640081275,14.233593540562296,6.723616746341681,1.6278045200018143,9.550140258925314,3.9764991126072724,5.404236772382318,5.994917763977603,10.995477337453622,5.777110925687907,17.12154610175372,0.09417596438638487,2.687762844293915,7.984058411763435,19.643525003503438,15.876285679195426,18.764548823782565,3.0653954621854673,18.493973690522523,3.993420035407622,5.026834125519142,0.08659030811101864,11.602169499126308,16.261946021213515,14.379496552905389,5.993724114353043,13.30671307596135,16.557961315695202,19.424373706979566,14.009727140581361,11.951994807911719,11.707002448328133,5.945423184871488,15.86481440132622,10.245938640587147,9.293193014724878,19.2073263434512,7.989281912958801,1.2246377625669602,19.61987891216401,11.68127979303829,2.0318832135163456,1.8661648155264832,15.972068560401205,18.148164275034645,17.32407435040674,9.645538366540283,3.7592959235449763,14.192448127433618,0.5272292559708136,18.747128418555903,12.681092806632872,13.353348232940267,5.497537007327309,4.243096082105904,17.32382543162575,12.614486802899911,13.455451265740091,0.010512407532523582,7.925151802883397,2.963181438036928,15.243833412713187,7.612222419693704,16.31429579244164,5.741780513830634,17.211596286507252,12.811688699880722,0.40819385444542,14.523646720282732,9.69180666560867,11.842883108371026,1.5579010911513702,0.8926805103220259,9.26445416213614,3.0683619953559393,16.521537475586424,17.614707818189636,6.03210686413596,1.4829450894309648,18.385852697375668,16.86794217689663,9.123522970763007,6.441634010085737,16.70430703953167,19.73387496713096,9.730862398252388,1.1428894691178204,2.564875115376104,12.098619299877718,7.619564976718438,13.4700498528418,15.377355993134865,9.042430582984027,16.961652244376857,0.7524442610942517,11.537451876576,4.844913978355279,17.028342405002682,17.352456563765784,0.9609075782121845,8.979653709853551,0.6364955556920693,17.512567733173093,19.238642149694112,17.45990275447811,2.555186249070762,8.98877624768389,0.010102640008224917,12.471722366647175,17.402944827277558,14.77971752810408,12.724358637942178,2.862411062360275,2.091437549009969,7.166620916524984,10.326077126049714,3.477507360345493,2.2409645387455868,17.610527497122067,18.87387864011254,11.144591365000803,16.102037645659113,10.1561276726129,12.167998191664449,2.2351746289118424,6.814913299634373,11.035231304270301,19.173426361506856,5.139653202186034,1.964867839305664,14.369808546636484,15.628911415664755,1.1307779793376715,7.748202802871926,14.492123811873597,0.6295850083246624,18.603151925120653,14.424411521436689,7.162515764307189,0.967558970940714,9.565849871491285,10.472767153658857,13.398648932443923,12.81726688727186,5.161779837569536,5.396667373822721,17.44512903489417,9.045023670313768,4.077340006675834,0.07994784206151184,14.743313640920569,1.8313883692166666,17.54362150838642,2.7796385327849027,17.70739300681686,11.679139478105816,3.5879931372137808,16.468631745686444,15.391731203987927,13.417798233606163,5.527133385804697,12.710577016417975,16.14733972215571,1.3131995412114383,11.900492824899583,18.672739095585076,9.694677698080877,7.424941786187258,15.405834570646938,1.8712508870073652,4.67914861498377,2.2272569592444835,9.427674828763877,14.803249921241942,16.29153941539219,12.325821165066841,18.95597773845479,14.207473290727757,2.6748981646867964,15.139026498240845,0.12166309670359698,11.10822297387585,16.952380774953145,16.598250543348975,4.819680270984059,9.562545100343346,0.43632433856183095,19.280302599102576,19.681492764921344,6.730981253233015,3.755849761962642,19.987857917126618,17.116982021558286,5.960964612432602,0.058207147306825746,7.8687292328356895,10.876813934124346,11.172579340771588,11.307632251135544,4.317795940640177,19.912197002963396,8.79969673349799,14.074529594509965,18.342171547909825,0.13778282463984493,2.5666056957694883,3.5860027445930953,5.225791564625495,18.7618576857882,18.899970659425836,6.454567747847033,15.000984432635764,14.380820411600634,1.7936776717343461,19.95176682051167,11.02360922631853,11.545141033547752,17.02406391163818,5.994200103021958,15.388916973405395,9.27866636626575,10.70010475080776,14.999679363012874,6.25516371724153,14.965122527814554,19.617475813400617,8.0718197684234,1.2099778732729227,15.640603104621423,1.2736451015439476,16.061104143656422,8.810100588584344,1.2292618337034833,6.543935885456755,12.443121824484136,6.319012949402767,5.454346501388407,8.31200337396047,17.220231650318265,1.2921216122601997,15.76877038940951,19.961028651981536,18.807758841121533,13.035940744057788,15.00914737111902,18.430997467918402,7.892270575250335,6.956754578524262,18.948738360401617,14.696379763105982,16.353459815345623,7.138727628448356,12.130904666940058,18.92385684527589,18.3118592485229,18.020922906923236,0.22327328465148621,2.7430855341866334,7.342939953812384,2.7883619308465235,18.784455474578742,2.665297701887348,3.5235900636774486,15.704418104282585,11.237117681980266,3.8386390167700224,19.58172745653399,16.228118698353935,19.243166434371393,13.662896704745533,4.545905041669838,8.948139523040792,9.353987543146536,19.591443281447972,2.2554051783215456,19.49580434190009,14.563108100945744,1.719231276437494,7.686113569786808,1.607776946706032,6.824080888477564,15.815046515904312,12.295278768717793,16.823094643519816,10.99838068045845,18.153645510650623,0.43621545745850643,13.994198235312854,2.9950126595388404,19.051764102630756,7.540945483735557,19.17430397643763,6.896910144478485,12.089499361250109,2.542031608995954,14.553173414518078,14.443842573242712,13.839552000007505,2.5490939414951175,14.589941791363836,4.370341931785786,13.468469631645377,1.1508852332973563,14.987209054790593,19.288585708588325,16.23793687380365,6.505111187104928,10.756935445814717,10.810355479731605,19.800920142877736,18.470495109752008,13.337148133020978,9.566131760599447,8.45201804842404,13.47260994936088,16.323730247576115,1.3808182829008908,12.270403707425611,12.484937856650845,7.891201994426642,18.484446496174755,8.205501591153546,11.732466009071164,6.112258049694144,19.39229441538039,5.382468699280882,11.378726827865894,6.893095223209276,8.608736210500933,18.696777530163274,0.3715446441697656,11.366885884774142,17.736788682447695,5.879265553658097,17.146056181946868,9.208728569125313,6.114156906140713,19.300185568155218,10.88136589407343,11.12065587466438,15.062825475918347,18.05040213237571,6.321230759655125,12.762711187467563,8.529765000166464,10.46150374753475,5.061149419384852,11.134419170512547,17.11396972947098,9.063294986158223,3.227657308275358,9.140897626367712,9.333088784503015,6.5170315396230105,5.0040433699091125,13.39209683103741,8.809834187727015,0.958227019948561,17.765545152616724,2.4542926918935404,17.00940190937075,5.863091031370948,8.823750365243352,12.446425294041305,9.48173809349659,7.934865554706092,19.48843179633597,19.298544472120355,5.88832161079043,11.340665680768458,7.403976704360091,0.19473532002332483,17.15479850997069,0.8912702014657992,12.58242317505812,2.4333636271499737,3.788991644037978,4.574673075117781,7.725187603135892,9.630692212797323,5.598849638260939,0.2863660411176028,10.542662734692353,12.50213658390856,9.464250399694594,15.95132325885162,4.618263568729066,6.455806817281058,13.782726832295097,6.288873411482108,3.2948616359525884,3.9805005318735276,4.4249108161325434,8.969820273219554,16.24005664503469,5.131784622416289,9.279428037032549,11.366784676895598,3.380848373464276,1.2037120934387913,18.88177190573103,13.082855275730182,3.599298120911345,5.459756057621323,14.300832906770594,10.045720950938817,0.35049797178849484,19.78051011121825,2.9906438316569695,2.4290742662179143,19.186691658831165,2.1669199192387234,4.798488156009784,1.0388482969774682,1.8578067736256765,4.9881759559120376,19.82751527465954,17.066896817673197,12.854475965534649,12.354793425296675,1.952923466199774,8.749274488399173,11.128324580707773,6.089718274275691,5.666516520656644,1.6120179071742768,4.173030833405158,8.072640968659597,6.838290003993661,18.8858318905999,15.407366735274458,19.38175165756214,12.268414727058365,15.492569598700111,2.724633064560704,10.143229546342688,6.3815390617291,11.669317427996795,12.273376623803163,16.634496464905475,19.985249581848446,7.350373223865576,1.4728485279572467,14.562565926179891,1.2145836300917967,16.912586939244143,13.314695078624329,14.018519301092862,12.31377589431013,1.8748365889460494,19.454341809645705,8.730017518974513,17.75257300996623,11.746527691303093,9.172938327511817,9.472815189221283,12.52678226313023,5.27544061488455,7.368723576129579,8.075644155364161,14.044767052179981,15.847017068324107,9.810805830998595,3.6479612454505483,1.891448981145718,8.257241725860407,4.875065207093203,7.095710700435913,11.974585975479055,8.286007591857754,12.953382781314428,5.524035382322445,16.800433415089927,18.28947315475733,16.71931546263778,15.317002840420306,12.508602410650411,7.135776856248124,11.80771022670665,9.5304310760061,17.80829696833841,10.475641630078778,19.570790105343775,11.223508461812997,0.48324011274470724,4.201286222937459,5.805229097729896,5.542779565464637,11.67287781188637,0.9716244972578858,10.731971176670863,15.143906165370499,17.17178597169289,2.907368983088263,19.06346068630888,6.151397742001503,16.829944036035066,17.952343011801695,13.588120141567632,1.6492323652914065,4.995332712827332,2.343412168849399,6.357104981998756,17.94461715811897,4.6196345652769955,16.03980640956122,15.683540498173887,11.21938028452519,12.392170172071086,3.9322640288166433,4.984514589988915,18.810559612245083,2.8675542990055547,6.746512941058396,10.085858097651235,1.1910926104104025,5.134747824983181,10.072582789909523,12.447421751245988,12.025927035507507,11.210907122525722,19.252398824775334,19.82516524606865,13.683957458092578,9.775593342122733,19.3783380740485,11.162243244387827,0.30689711874125614,12.105268902042795,17.090125137826064,17.89660277145302,1.1376534461222843,11.861561598382227,8.484161502931467,7.468934565296599,3.7127874030547847,13.865177809071586,16.047314420947558,2.2939938440768293,15.657273394856471,18.17909487841837,9.993558924986452,19.647962244215265,9.033828589309284,11.441223080686278,7.465880807240404,11.727379824467148,3.1414948603831405,14.327801120328285,17.612534137324612,2.6352662833484874,0.3272619320287218,14.820898899399202,11.511460480836039,1.814261154693857,13.196717788370368,14.634013439616332,5.290443104130702,13.974322653895207,0.5187248584907156,0.9657474242122488,19.362634406050002,9.963717379640983,0.6519120879441997,17.629954301977957,13.686817603511274,8.29317911065029,14.014319811274047,3.570665035737708,7.389816356921446,17.002785485840228,0.3184041605710197,1.437049530055865,14.772513191551052,5.4308813184760085,5.709633416313764,6.118956345959519,1.674594794112343,3.2124839477692735,11.935573820039336,6.068926638706826,3.603063438522023,10.339352358206071,3.3508133663961015,7.433815529141734,16.581777506673777,16.582968770187428,9.542276197649922,8.5304956945278,0.9299570534764046,18.859716948058207,2.5926655147444366,15.122301082362185,7.951247115511633,11.365845367011161,18.41142001249851,5.85771898248304,11.909596227715987,16.89468036443554,10.194958457848319,3.124781721263341,8.435068308470068,6.977664784302093,18.902773187894468,6.483946879283464,7.051117904905517,12.484844194267506,0.679808076854953,14.193357402207463,19.78292332955877,12.750876327466173,18.723525707571596,2.191135977158072,18.095835268843537,7.45205895751496,1.3244190426919422,13.282488414783206,7.5048274143692595,1.4927768210763936,6.520446335105765,6.6265966748855565,17.4201464906537,18.437490895930942,17.132260947415674,14.477104458065831,1.5304846917798676,11.19875799321418,1.6404619718087732,0.06612377058451191,8.1988748727875,12.569525372480372,15.501587384935341,15.086798632522523,8.85534520176726,8.226537731433945,6.860076340260792,6.848075468520323,2.6015230255750588,7.020244983485804,18.84359657260543,16.805075930762065,13.122082599487207,1.6591365828927795,18.4773388326334,0.2169157459795512,10.137116471569483,6.417382978220965,16.037212504502506,4.245544102826728,16.2367648581727,5.0100247656449115,7.298299651591811,11.552681645809596,10.291843601790722,10.546655737795563,10.348197518960092,15.36554221940107,8.520680494414453,0.07567267017098978,12.835622862693805,1.454658450591908,18.09713372164422,2.8152518009233907,7.928430865314318,19.972306602023973,4.411622487408575,19.37301291775231,15.795691961570757,7.21097174475926,13.561426839587796,5.850048017189473,17.771594748284905,13.752226820139569,17.15079410261896,11.855005480467412,6.806016568782431,13.96833696266012,17.052559217903912,3.7827671833983256,7.993111376265243,5.646344870830391,2.3281720825132224,12.682782932084272,17.874574768355153,13.06826568458337,13.110139705597534,18.17608272982365,9.102615606734883,3.689570899588279,0.13729766000336152,17.462673910271846,18.794503650615365,13.82358157261602,13.666976880684182,18.027217160610252,5.26149624372934,9.489288522841228,11.534886492578128,17.35401763123569,4.3658150150429575,4.514796185353136,4.646861935262239,16.613249699507925,7.269447026839049,15.749371582323333,14.030819704052512,11.419493003383607,5.906683905545025,1.6579396357478693,18.236750924908627,18.095443568508532,15.210551794156268,12.063285966669323,3.784299608889259,8.990172163955892,13.887763213848249,9.856800783468135,11.339214235878314,12.797615602180358,4.8468888953296,10.16380104363002,2.780897383600398,12.070853620597601,13.523928586066983,12.440067658316716,0.9922572375895644,18.81946779408313,8.344838825161766,1.3278435395715737,0.4564210733295093,13.781211634710449,13.788834566736337,0.4964737399355812,2.260986098148603,3.5895125034084607,9.223083096081837,16.0277606641421,8.346317608214079,13.319612629001988,9.991647312080211,14.708071525038964,2.4109638391416466,16.8514552314516,7.779712231196472,10.468200081097855,4.207334858287175,4.43026784927842,3.3775243902932894,3.10788849014497,13.312541391742112,2.3967157824181484,11.100081640766977,12.499574000154192,19.483012228531447,1.1249520224649867,18.185223348945847,13.276726106302483,6.6651702181346595,10.529332396429849,15.909369890216482,4.180230770808726,11.051341311236662,18.900702779869025,2.424039907488944,12.346902213973792,17.648509539010597,17.247108888092136,15.796758081200819,16.63257775271703,12.665167069547918,18.171830845826417,16.83796211436066,15.936073581016537,2.649764429082895,7.991077609730364,1.094068749087933,0.7140291552655897,18.530114804592365,15.410278747033356,17.792157745378702,13.69474191547766,6.274669890986608,2.242985733286176,2.819700029105805,14.148223810942104,13.021308923354562,2.0538062657736633,6.647867233052502,7.331286700239299,19.406773509090122,15.44424888767396,8.875255329291555,3.748330488563485,5.593312123519163,12.64851829862839,1.3259620603607747,7.913592575911195,18.686320863855723,11.598680773071766,8.272482311216578,11.746085578557356,16.430802821212676,7.111522783074302,18.71444926790315,2.2158913799918123,14.738369093675544,13.025954458696617,1.076574032996711,19.280967980992738,9.989847506145892,0.941528262941449,12.802760434060815,13.865288349361812,10.827959339427476,1.9364923372312948,14.502962783039862,13.176513532188729,16.93533311615174,12.799117190518361,5.550683616470922,2.211957917239906,19.449506940479356,2.3061260411086693,11.3503276231442,5.666539909725192,0.8524359651621127,0.9998568472645708,14.383529659344783,6.024515041644047,14.219230003035017,17.47761068891217,11.436888360209775,14.597124409822841,17.21079054262072,1.5876466121410537,19.335408335252158,5.567320433061456,19.52601040293242,13.108116117149496,12.700277682137449,14.442358572943665,10.137351266153182,7.58857536374467,1.3015756624331454,0.6748147159869466,3.9731686941775735,11.72902014736174,5.381389698829389,2.1963648516518486,8.449357513673853,14.405895029328146,7.023690189305465,18.5131002178179,14.273341116398628,2.384299326564858,16.123713312038987,19.139247032956487,7.422424370073344,13.322230948363782,18.673304521971893,1.2412844096740727,4.38543023773311,0.12229012555070806,13.043443173834145,17.959535493183655,16.49852442046427,3.918595369092106,13.16363713436016,14.666769929653633,6.287930687973731,3.6545766466547702,8.125639188214993,3.301464029477983,0.903818368374476,8.735242218408743,10.484989752886577,0.6467354843023099,11.026285608094973,3.7225499665173123,1.2162701821004163,4.241299402801109,5.066217319852977,2.838634383690497,19.136391968361657,6.041157387984137,13.135007811907919,5.779101594628395,17.73426415476344,17.332773596468858,12.01999042207822,11.371171006200678,14.877510678492705,19.537870549797347,13.031694062786784,6.524449638073975,2.332736850157211,6.845760583253013,11.42132774084641,12.602705540545859,18.97099781369142,10.686515531404805,3.626874636315418,19.575840394182006,15.815581572583785,2.3670869762141766,13.3092227066283,9.683891079243612,10.691279241702198,11.368524252945434,6.943209925310039,2.8692849473918303,5.2638913819452915,2.164517879545391,15.39693225840059,17.143191929930506,8.925046392827397,13.866728404530178,6.456749309627541,13.04450973598183,7.751047184488731,10.335580055150896,12.996160392465512,1.96000324058196,8.0921285815756,2.6021692984113542,6.2934236533638455,11.260733694995206,10.200858861553638,15.594723259939638,13.34830525974768,19.494616564619673,7.876057756649666,10.950793317775997,2.350109392528057,18.476504225921634,4.568918381244678,1.502291923498782,3.4801130315891715,16.667294897805228,6.312642167225517,11.372490961099523,6.228580713022205,8.767491340991786,7.607521539593378,10.887335535388,5.590767227534457,10.347978194423026,0.9835600415201418,6.623135397586273,19.367578410187196,19.721323348333645,2.9456135899257285,3.4719116904141645,7.186236515619959,2.7168768603267424,10.906038651095319,14.769201604305803,14.356969520680195,19.874964067019576,4.70035326871006,10.20569969482677,18.504006556358185,3.4775145928795848,2.690925498343324,5.29289514311547,11.313201424084216,9.090681903235351,17.85595664796532,0.9157389007616512,2.2137074055306227,7.900820989898092,9.54042983325834,19.000879743991334,16.658852990467928,18.7614729633067,15.809865344981908,9.455122135752978,10.951374635865644,4.391052383721021,8.122207505755785,3.4472108653080413,4.020591965768747,17.439471195515136,9.441037715313332,19.600858479791157,17.443524116771314,6.830731431154176,11.21800776629145,11.58352565747277,16.359226067174987,19.082818837732294,4.282624187878956,19.300050506023418,15.010142932586712,10.220382780376465,11.619602893655872,8.252245526148748,8.935309745242215,9.277654816285068,12.692345232063428,2.947211252180826,10.226233490633359,3.3364398118315597,11.584250305684511,19.380802416503048,3.1707998280741734,11.810735978341844,3.319217574773896,18.41095629582248,16.48853753425989,1.0327844875450554,3.0455625340423254,7.411410001475418,13.681197267258876,12.734803153634132,7.912034023463108,19.793782837443725,4.586607775495413,8.165718644666406,15.923412121351511,0.04017913093224745,8.779064309124514,10.052755384198019,9.43398267147138,9.610886607057129,5.276625909212496,16.458747553395344,4.942417816300959,18.341351107670455,19.270027597718702,15.812061560560227,12.887099125756286,0.24918535291706956,1.180944874228529,11.49907213420982,1.5998023352406676,10.599090703743324,3.002520182909185,12.016812359065447,16.271806275536242,6.500315220459472,18.153832960798553,18.946362659571715,19.832114752682454,3.4306420520974346,18.593448876145466,13.72758083309948,11.953368101485996,9.407933468655564,17.083625084973207,13.138443802538147,17.936404328530564,1.0583958877452782,3.227155517929785,5.236446921377116,18.484664966316803,15.528809984920361,7.118100257806512,12.87325875122724,3.9652451764314556,16.350306301130637,18.175063038592384,12.345857491036632,4.6935788844034665,12.618946287896513,19.232079333711315,3.951265626501095,9.580898378623118,11.761529052294918,11.300660104513582,11.212493698564248,12.528501208993518,5.906146083150761,18.532136092431468,15.717279989057307,1.9762410659441532,6.3604384263486,3.392456129499033,14.717703025400496,7.536690953723131,15.793327617297805,18.305965688439017,6.400195809433598,12.908529051151332,1.0922298737504876,14.147127405166655,8.192981167491848,3.8850745627030436,4.466705873641921,14.594361482126725,4.939062217172148,5.089800036309562,4.4990468272720685,17.637102312939682,15.925934605792165,17.94029608063824,9.785514505022896,1.0125883793178758,12.274873135121961,9.960283685860825,9.509962115260414,12.034715567102147,17.236541287195905,13.924512586801772,8.64393298284333,9.577381805152703,10.374865894729384,9.507814911557698,10.80800460689522,6.782584022662408,1.7360187521182313,0.4034330116115914,8.303666285002084,14.100563719688823,18.2794940396101,16.555701147280118,9.76702197591294,9.20942320149802,12.248991531602297,3.9560472287601733,17.090372605681164,14.258781347216537,18.844459911392576,5.110162512075238,13.21708760945313,14.446844720642043,7.199803206148907,14.59682436205782,9.716985928942199,15.802400784827103,8.57131178616514,16.44964796185598,3.055372871649902,17.98025892540455,16.569976089574816,12.555502013199792,12.566969101325295,17.888871450949793,15.1860305048681,15.778691763540964,4.918279545898039,19.006158134127812,9.289355923738377,6.963996011156173,0.4474823816630513,4.8879116371570985,0.7962178750873106,13.194721377281668,15.05438300575718,12.38065751773398,4.5127304937059876,9.369581775434144,6.1892576264247445,11.344599990107316,4.191481106972561,4.107336921410343,8.032576793179134,13.565282135396842,18.309624773712724,8.60204949926989,15.01429802335187,16.438046934610018,16.60065066194391,14.826767260872394,6.847771514720726,7.83369120733826,14.453752172503505,19.479314725102135,4.254810873568653,4.115820931682106,11.759829844447992,19.24372217807949,11.859499401207621,1.606688301003767,2.8258742673647808,3.2740914657033615,10.521292629574845,15.270377668554772,18.53129018673134,7.355110707914276,13.77357089366372,17.75157475800075,19.988765302704973,9.317517043888767,3.937921888388791,16.83114273557053,12.519790457195352,7.050673917545369,8.37523907941915,14.446098910853834,18.399132811137502,7.69946554616785,19.040267348465253,8.497332561384061,3.0102008489857024,10.389542459453258,0.36715829243544995,8.838035261099275,18.317088752321933,15.841264332329633,2.8557079976542443,14.414975298335428,15.397253419359846,3.5652250150723352,1.265074001721045,17.092339673191308,5.725426298501808,0.7846674655185071,16.071560968819405,4.23109005215395,14.85925268235,1.058285177863456,9.116914865263412,0.9159079444592599,11.871496914884467,8.378874557152137,2.6925477387032126,4.854595178857619,3.753053632975676,18.324050334251787,6.428896937458446,18.882079506339878,9.963683224543999,17.473840865233008,1.8240962144946637,18.173879647213784,13.945219441861688,18.846918700179216,17.294416882407386,2.5497452104077922,4.092859413084344,15.24322493685229,11.725545227847292,15.624761518886228,5.123847850054428,17.931007993051477,7.5039247995136105,8.579303350228402,7.427588233096669,1.4419171302429756,12.76122276000692,8.264463649907231,19.47942526445564,14.224932427678612,2.14159752808297,1.6694134152079698,9.023498999703472,13.028053710196165,3.9733741544787815,12.876523484670903,14.752919231197893,1.0851799354506353,12.931146828051938,5.852350358849017,1.6721655854891448,4.735656076042378,19.1409212612239,13.491780389307308,8.983511624951097,5.362844126039832,3.2694733918406227,13.707161167109323,18.106656338572805,11.08382519649345,6.339126077322752,2.1704695200549518,16.25710049924102,11.904175171769932,14.892401908483404,0.34732380419014053,7.880912732470122,7.803069832325087,9.522558742344804,3.579803667345005,5.07155708440024,12.38316954685045,12.283186924760647,13.33232888805377,6.2095839092813465,9.495257706107608,1.2681836478539665,11.999742442304001,13.503529030949771,11.834543758665879,7.309079660783517,9.37635823922812,17.799099226080678,7.188198834090773,11.211948148593379,12.295635888572555,7.010464842181978,6.092764546944891,14.675096279131651,18.262496410838423,15.677665214356619,3.5983390866893394,12.467276728216238,18.529894328764314,7.818697488193145,0.31529258793201453,2.4575892732324123,16.30493120361711,13.757463127962701,12.527193214866754,19.760758810174647,18.198478548778322,19.603499307070635,6.13337253843198,17.928945089404394,0.786323019076498,15.968457815013636,8.61613330846998,9.557802355922647,15.468164928726459,4.997451903431247,15.331258357256822,17.120667485057332,6.595167560598587,13.124725261048006,14.724863688943518,15.389465965645162,9.488551378159201,9.488574171672543,13.90033194517434,12.617433531201243,11.108562741090502,3.7639676578658365,6.730078334235681,13.471349616219793,2.162782388196134,15.27322640270587,14.412504948218787,15.789723137235967,2.6469926612929795,6.08143536355644,15.128783372744245,17.543157810504397,5.630798280837883,18.63104088568951,9.570816055829589,4.1815942190865,17.421699369491456,11.494207391680789,5.11004982615523,2.21422986248736,14.45198011626962,3.56424895937022,18.32895933024738,12.921924539147632,17.271610932294546,8.590161338607626,7.2559652296674315,5.325544914867151,7.86169230519056,16.283653836040727,12.67885033525419,4.910474496974011,5.46295928954732,9.718951475121935,12.341209088597576,13.097295455395276,2.054525699902938,4.393287840758986,15.43822255342183,18.843509438783595,12.719153709072373,12.557119337351343,0.728843241652819,11.359752068649517,12.548698250520944,4.855624776629055,14.103535593038107,18.261543426594145,14.369129185824114,3.0122126483051748,5.209889804532848,18.32776477899197,2.7910110741596528,11.345300790466585,7.875600582308078,12.794132336661663,1.8573642514067146,5.865175511220508,1.7055959152218536,3.377797805497953,12.716396381630336,16.621947034277532,6.278957275912345,3.677787531548513,2.3261307006750576,7.136712640713552,16.84268490915928,14.954014528685985,12.7721800795302,6.315489311618587,0.5276263991955554,7.686046926775898,7.31786515937539,12.365557684324937,9.85652157187937,3.9986783393877268,18.066818361734324,16.618059360575582,7.387553823105519,10.507815075401613,15.520802799865038,5.2648790848966165,0.4081126447541905,19.1293757594432,19.356446948979062,0.5814042594756907,7.947357773544859,8.270415985347196,18.908831408865936,14.60716351867581,15.812463579942158,9.126432303807,17.11874012137241,4.661818867994714,4.094953117074476,13.528115293185614,6.9575743941315915,0.45054331497209166,11.165674266488534,13.075868906657009,1.8330905079378246,17.564621641819645,5.722728556021273,10.953477607031612,18.737818799061788,12.175066005400472,14.238006273503645,8.909875050304228,1.0491919548067186,11.819211936748598,2.7554057686271394,10.186361848765326,19.193549610631102,17.366814662656168,18.716325225159256,16.265994828756234,2.177862909023416,19.52644289130368,17.43867130381375,18.249161326250025,17.24813477159094,4.004091919508217,4.5690076729585805,7.324699260887146,13.620354535678594,1.6571540317664546,11.953513064088348,12.43501259287774,8.900814055713457,7.331190627292821,7.2879048199597385,8.28739479460249,18.71582826524363,4.979684451432624,13.15566027184075,6.5142893780666,2.544774060851016,15.693743394424748,5.509473351887921,14.94519256303429,1.2604244403713327,8.585732194534677,4.48852438657068,15.676994714030892,8.792186907452892,3.226233949468047,7.541377162067415,16.477661703377393,2.0411840161610506,2.5339868208083915,3.2728076097021175,8.319248612755047,8.272547721188324,3.0929445355101315,17.569100901369097,9.309802853457976,15.560435224532396,14.14071241819654,4.852426510783259,15.91781088968478,0.29110856491045833,10.421633558689756,17.470429295336046,16.671572810727973,3.492077736563153,13.429750901318421,5.673883238284585,12.029852439713782,9.509064004370531,6.769410565918448,19.950393422713745,16.466904810381813,4.704420026152212,11.23887913375401,7.396601572436623,3.9531398311619403,4.712467612923645,2.9987714440177093,5.19432889718527,1.4861065079397173,13.815072795028293,16.167300643342717,16.223597741094494,11.290974678968716,17.9253033587294,7.307615556085079,6.132769506331637,1.9785946341373828,18.247536888678194,10.083452887098808,9.709875707516149,8.530354483603023,11.764544089278512,0.8810835507632175,12.260640709189365,9.904847578379524,11.461335222492819,11.386693408130956,11.256946088903321,11.296910558697126,16.483813803964082,17.660528255074063,18.196787694053715,15.451751976420525,14.051216040444064,10.264561671358155,10.162273782081117,11.727630974814849,4.101530299498926,11.887050847880346,2.0628688543392526,2.8248080180028223,9.488527559889729,8.912688602058164,7.27090423293439,11.58709329472254,7.174978909249767,12.6520303158149,15.387924496063823,4.621790277109801,8.713800329213353,12.741992203514464,14.153613838804384,19.94035382412411,14.340545885751013,9.404124204208353,15.20995073731207,0.8679509715631806,2.3298460695255008,17.972273814823243,11.092555679064953,12.025938443218607,19.619429855320384,4.825725129377312,4.680633070924891,2.7390950599201425,2.1769649431038696,0.5415049292566376,8.838497343815943,4.721734115606231,17.947002301927757,2.08513695846412,6.481610407798,7.233475298384446,0.6196191323266076,11.743813209358711,16.96741428916772,13.42282380258602,19.291883758211878,15.878817995796464,9.172300375709836,6.7456524411968966,5.640637547156784,5.207366332928758,18.273309715836437,18.20052082565948,12.661427259871388,7.271954644714409,13.472596692535191,11.8014255942784,0.5562207173828604,16.966701433874945,12.101883973392432,17.10602228545045,9.731693761378422,18.72912221206816,16.6362418556179,11.958571756391493,12.235880681913876,18.036695384731118,10.049226766358771,13.887279787655181,7.226342047507441,6.764908663675255,2.307182543328734,4.701360791719473,12.295881517241,9.48089091219284,15.219795892367912,13.70738342062674,8.704748276900842,9.842964400541373,18.242758500523234,3.4459646776158515,7.112253045276118,17.792685767164784,5.462361379139651,6.679611705643431,16.30497746343774,10.412459746191374,11.948834666681293,2.020846572661066,18.649749057323245,4.263157273217986,2.926289320829918,16.12179796771261,19.667214171624885,3.2562635122246597,3.4107433362936224,6.99096451905675,18.704996893373597,18.320393552067777,16.26553141624692,2.2919321078308386,6.946087790207911,10.455714353325485,1.0603761240215803,18.598113605733253,16.22182963704061,19.124650379561395,17.180825949096807,4.596712457808811,3.85404108910516,5.095300833062439,10.273253690101352,6.258589934454224,7.526007950281883,8.836927471901284,3.219253150435928,10.932060035329116,8.108943149429173,12.846009722871248,17.47446935129554,19.054808050186534,1.8679651473818026,17.575724250591435,7.605009782885586,14.253491891004062,17.53991574560859,16.31526248934671,9.284948625043313,16.03241850262663,3.0854475414735516,6.0058511134647175,8.708864507712054,9.123386323388956,8.128009549056877,12.484269084803632,17.8119524102811,14.54134763531528,19.90424061876776,15.75059119381573,10.205740273293502,8.130093663238508,9.380184633494402,5.366366569903431,7.137829556621451,14.075391480961951,12.183010777058652,3.930334488869631,11.34672143885001,11.536221041567618,5.84798225737321,8.621543378860794,15.618390629102375,1.0856659074726505,8.98211843515866,8.32209462514442,9.696126265219283,11.036506125260534,12.788332736780239,10.49405702144984,15.600722967288153,6.355679237875025,0.9514441875693525,3.814087110941591,1.1567904983330068,1.5340555520249222,1.830938999050944,13.473871726699365,8.761549839874938,4.698237115811987,4.910944280871252,10.330174240184832,14.79296833919419,18.272865360560058,5.821455104884121,15.280558286665475,19.468861081794344,17.542224003829592,6.354434384095438,2.60822830951851,14.823792312459503,19.692122296648105,2.9252580746907864,18.907830513026727,10.19399731975513,1.377020629215271,7.014524584134927,13.391148459310385,14.35911653754725,16.85520689638971,17.66348221589344,15.625485404454004,18.75051672747088,1.0002625347354988,3.4214017581278666,15.180456307216218,10.246780721786317,11.230461946383912,5.879864620434105,3.9741212805153125,0.7983833387535233,8.512327779050892,6.395416774378453,5.0196528995003575,17.45215433969852,6.278940419021741,0.3123482954653589,3.746925279004021,7.989332516555003,7.108504987970701,2.772368875404232,12.556336374636373,9.99368479295812,6.968890723519587,8.431563517598889,17.758838812585672,3.241109095318251,3.2554239540538443,3.827058375605863,15.771447908415816,3.0706158445563325,17.666931741816043,19.987079132427716,11.851295986682597,6.867900443073003,18.656740539046496,14.880699303210655,1.4217532168430047,1.348966971740282,15.172429381732059,13.873601622599576,6.962170783191479,5.732316460712141,1.5616532838062591,6.583118643478549,17.388892491409557,2.329096252281313,9.55738437094752,7.579697357072703,8.490411705879378,5.697421800840536,13.665422308914565,13.130355076825214,2.933743348265443,14.329369266385372,3.063000886383076,12.344902021703646,11.996588998168205,18.118842557448044,12.43659964788758,17.10116701550174,0.06841521542114037,6.366778072720591,15.331750359432608,14.426254193360727,5.072988430979728,16.81550108678195,6.405636165945796,16.29512374893946,0.5814941720370781,6.371340397133167,15.094206952571746,3.6281666085901154,13.43055482603269,19.520647930953597,1.4051538027911015,1.6569237079351185,14.687350005123827,16.124211468781645,0.3559064021600822,2.9809390208449393,8.290071364821188,8.129719251633706,13.548341972118475,9.676336579697002,0.5727842820979179,11.41361540556062,18.564186690350407,8.686495362981802,3.77599325138938,1.5324103522512544,12.76693528794195,8.43729556359747,5.462704732356305,0.9619885935056738,5.333545804785804,18.841342716440494,16.591178593128074,2.7060593261110677,14.588549606391027,16.486538206851762,17.11011841932471,5.486950421203476,4.243924746794088,17.65638533966048,14.901398930059152,4.527178215455803,15.330768365924229,7.171860328573438,19.22613457087248,4.3613403356126135,12.145228496351299,15.941295676437214,16.92969585391516,2.956805808859584,10.307182319660079,9.085990454327387,8.794215415034504,7.337939630200507,9.316194385507561,5.165171558367421,4.986019130615471,8.605500521292022,0.0543600691657975,13.882456290932378,0.10878915395594824,5.23749555407409,11.468065872433154,12.580984158327958,14.532065844708736,15.923612466460995,4.993790230689625,16.717143056290826,5.44813454784379,5.486064273257618,0.05061482326857991,8.47106154393276,13.780223625418223,9.252962189586809,8.234117955728205,16.666189004803012,0.16694287692521126,7.130674900775067,18.408199184428348,12.991590362113605,0.8300000820612796,1.1279889543698607,14.53586248763524,11.64886368742669,14.449606931209917,18.395512881859798,14.389599694223104,8.583157771392184,13.75471377423735,5.157664978012564,13.477959308096757,18.58262707048854,9.654206964849298,0.3285213904412476,13.595707105419951,14.60617939240144,6.489900644371782,15.927063262456652,15.92372623017463,0.31051433312495824,7.896908603629078,11.633222548931418,14.71382758636775,7.222532915613211,8.574721830779435,7.371312233766183,0.3151626413880493,1.837870453196384,6.583813929202109,16.939405218894883,15.877767864576263,12.390845724507003,11.303111230542653,16.563677162672032,0.3219558498681252,13.211616867733182,7.413442881596537,10.455568987726425,15.829752479815875,17.852027711532404,11.015669616123391,2.2924217327229046,19.59190680840352,3.9521730929295273,0.5406892710302191,1.9962067652582682,7.031635467702033,4.8327942384685985,16.394676392625204,10.744340347986693,10.178786836249266,14.6157111746512,8.424781037021871,13.755927213366785,1.5207897745304155,16.134297269533167,17.499219003293817,18.57535817442122,16.9050768909076,11.35897049487522,2.404063383679964,15.90186798619123,18.35859326898557,4.511379938245765,1.0280962584811748,19.667168836664445,12.94564392174526,18.85370236176609,3.6396799785777434,16.515805723812296,11.731461127191274,5.7374686459172874,8.003998206079444,17.752164162375838,0.03118688191012353,11.528546391234475,5.774768245417996,12.959371242003414,6.22077182715985,0.7572836064793886,18.802809602503842,19.995253075451608,0.4627367332196908,18.83645844957651,9.397725653416607,6.838418182253405,19.900633103156686,7.1120049043324185,8.100551346573997,19.490284232978556,5.842405304500771,0.8469715419922741,17.578888644689936,2.4231224744771307,7.652879580997807,2.744624650833174,0.7778075057189016,0.4519804205804512,10.228496519721473,14.261579174221225,5.591851492245135,2.4461090198896995,8.452173655744346,10.89536209988375,12.532306995300813,5.494161115209368,6.6814842626583415,6.5581263271628565,18.502828753369187,12.434878036975384,7.06958517248963,3.4906134367049324,3.1235772579248566,3.411889068806979,12.14381084149959,2.54910955380117,5.696824076510012,12.658036237539418,17.796049100723707,17.89259624317726,4.5267308095495595,13.344706232169559,14.004716879419599,7.555823695236805,0.9921976022343904,2.638510575471429,16.98553192661374,14.33695432505722,7.749396987166315,7.806633380552217,18.806704006716203,3.391965789786653,12.632976063318736,1.5110646149587614,3.8215432256588455,18.51402171266988,16.1819793944627,10.38713250822186,14.604005296859786,18.292809476277107,19.558770724878386,2.212778805512845,2.8356666715959022,2.184500480212681,4.280071500108384,4.111606115464732,19.920874570354453,5.22597619357394,12.736234011352856,0.7414618435029796,9.821528071679847,14.352826227504947,11.615599265462265,5.553346942376427,7.361814622286311,3.4346858758799037,10.642438851348718,15.03842457114942,15.946598598439007,15.816609814699945,4.488038186295351,10.789778331348124,0.3094854625841714,4.256488520856125,18.710274123546576,1.603782890811658,5.782581383415533,0.7561666077478302,6.36897235224497,10.418753742602256,1.468626936493993,3.206668109435147,9.742892531673455,9.88189412964143,4.871557007439109,14.44443681067392,17.518919805466503,18.038829123427085,2.779754330311275,13.268730304441597,1.5230728369412105,5.0103764551858765,15.625573814316226,9.50412642033541,8.877560748047326,12.398402223419392,10.520515186292908,18.85027923218265,2.900046844557118,3.0100481875511154,14.062287186962813,9.709803833828401,4.998760977156778,7.990856620673483,13.616593139495308,17.007443592619374,5.090595109302538,10.766276539317943,0.3095991145023813,4.542660264887219,17.360417900283327,7.955985337841174,10.974964985845013,13.696598993928628,12.514932240660617,16.784166909260136,0.5390712734395464,17.83422817226985,13.075988197149133,7.914725099735858,16.70794489972742,0.2778347938959369,3.308050461948775,14.2397867660027,17.10019376670814,5.6246070583078644,2.1362119422827197,4.196555798086297,1.1079173252501295,15.466736425371415,2.8763126791669347,18.086351125842445,16.54984574250047,13.336389322019372,12.153061879776384,7.5965288799636,15.446872430495322,14.941110783063877,1.739578331397147,9.450390667483166,17.226036956963586,5.82405365359199,7.471449459217663,13.77223435152886,0.8554532593829345,16.248081565605794,17.6750827972366,5.803210690620415,13.378448049184275,9.60409855286704,5.511306871337154,17.467088152221656,9.219334902640743,1.0907071053995843,14.979643638818132,15.745717343781083,8.853476572573182,18.322741455860225,11.991228630177142,17.23646876682597,19.59478730462953,8.455555741336518,6.691075114347025,16.0808290424548,16.825763691637867,10.269109481849497,2.324239258640426,4.595330347741018,12.741720783376778,11.157774307001699,18.779972232696338,5.818206223107691,4.204028114444949,12.210283457808693,11.557330976446956,5.075828612745843,8.835869525768985,9.433367523360543,4.416513231956909,3.3644502507353113,10.452121401717033,3.1096479841301505,10.675898011002452,6.671955890499963,10.37626871501731,10.565459648786932,16.53315850979596,3.923970979704139,6.611676264899216,19.91231883543348,16.530214612129367,10.552572065004568,15.485111700729739,7.403559696277764,8.979404567907219,2.8047618131425978,5.770686387884982,3.5179683833408815,16.65579384913628,2.5719797900752495,11.323183915737172,7.442046556250519,17.865053895379226,6.5692909112965525,16.25038421690419,7.092648877513152,8.164920358962835,3.7926695545171007,2.112681587819587,17.766647132017713,18.694879421526487,19.577366489248156,10.111167966687686,15.818636602106192,4.3229177117293505,12.58701788325566,7.9873203100537715,7.403763043283265,4.918415264307954,14.064531647501418,13.48797719905615,7.705032891009012,3.58979124402123,3.5559693472639475,15.854577387090947,12.4623046801354,4.699971137573962,13.206907780556847,9.828151221024669,5.887448262243908,6.826091981193869,12.456068227189888,7.5331045048448875,12.639958411045122,12.175694660067649,17.22929754837701,0.19807660001959881,8.22697149358397,2.4412180942686224,10.098524537560847,5.8147970222061,17.261270598496765,7.5696245505044635,4.55875105861375,4.57415698098107,8.913036095972732,3.1433220440641207,0.580461880005636,8.007437209058432,15.214555092675145,7.595216088452643,15.033638107801348,1.8710954607628816,12.266784656728857,0.9671464426684295,18.364408275513814,1.1041412842096632,11.280433529423322,4.186234674282998,17.483669632545737,10.574670069226094,19.12118898191357,16.005205558359826,18.15759396485678,17.905170425214646,19.589278232173886,1.003355108512336,12.326194462318227,5.968017218217079,18.029982157246685,15.59007961940372,4.904538357957127,15.889814101061607,17.12046965615162,16.44148641689929,2.0802889684887838,0.13084534479057108,5.448668658111098,4.735746191841379,13.409868458119822,2.8735024424671263,16.457480452505266,13.269717393471051,6.825122937051797,11.62236456455239,0.6210522846260691,16.666298226731552,7.903288403466644,9.668472242754307,4.096100365149664,9.209177481885543,6.944488988957653,16.118961166959874,18.472844185787437,19.17091112797056,2.226241346193394,9.473524686859843,1.881561031095309,16.686908317350753,3.1612363415534572,17.32985694368815,12.844519264246369,15.481120905484707,1.058470042156614,4.926881443539006,16.13497633395863,3.5607253183858623,13.593544728629858,19.35484179344902,11.149866923068599,1.217478400938492,19.04820150169,9.375723383365067,2.2795750795474135,10.401228848626186,15.16648754513119,14.213416556093033,9.79292446119092,7.81726449473628,8.187307577660174,1.6084200436074525,17.246790883656292,17.505827220001237,1.081850465402714,7.093034679425956,3.217233094839913,19.022541304028184,12.729015223020754,13.612929715232145,3.543376619800238,7.9780433554581665,16.94649351129832,18.912157512951303,12.680954905605596,12.282634501432629,3.641314148036323,14.922681312263366,14.36364982618857,6.548359884430699,5.828879377460243,11.474286355164708,10.487568013766424,15.8818128343633,11.042405804159415,8.866909105503993,6.0762789238189585,11.296368935297982,4.760137787985967,7.32466346827461,18.96384964699578,8.251476734664177,8.215216199385518,8.254728571048325,6.761991138057262,1.1398147972045614,18.952725610100025,7.499390485657145,13.397509535113805,5.234431647683788,9.079707896733066,6.218131086920473,17.576568644208464,6.595613625482999,18.73805178374827,16.29796243974232,7.6468636907170495,9.974957102887423,2.709394622341268,12.290651643599514,0.26353582953447585,4.6626724759459615,9.377901355334068,5.194512004673859,5.935617518230711,16.608876486331102,12.977044486082079,0.923980847729764,13.793387162915618,15.971302218865947,6.098799957619772,15.923085548096783,12.010238498847485,16.57489273104121,19.534193555791255,7.491115215133295,7.675616521597837,8.472913310093354,4.216262448256551,17.715887530592656,1.2166898109733726,8.75852917076613,12.446084922258208,19.20853443002818,3.9159016384857326,2.114850631744911,6.236220526360987,14.878273032789714,16.60188851461244,12.082439216187622,14.01502533940353,9.891140583098279,17.047361887416024,12.320346926443646,4.2645483720934685,4.191770506058208,8.612634253415745,0.26551825631815795,6.072483587153554,2.852324613247692,5.138020266779386,6.609788223209834,9.068375093439535,7.028341280389805,12.806051837974737,6.796033791730567,19.845270774847613,10.49266118220598,6.502574349137564,10.275340076610746,4.124389984954662,7.503690467726356,0.9557073859301468,1.0705516720117458,2.884518703742205,16.89735223399797,2.7853600801456224,9.734700546719669,8.24553490381454,18.888935794466825,17.608502977864134,14.925036935007183,0.8523640299276591,10.672328593315804,19.90234896809045,5.121064561806468,5.866501843865226,5.03499080835025,7.486207453905052,10.346551861241654,10.261643345345849,0.39841385428291076,5.438554364108823,18.657147478611567,18.168909393077715,10.206452502724028,12.831619892277914,11.636936744789597,16.07202753070289,14.992553625487858,0.1588651751769321,3.5592794362970137,17.374352343258256,1.5656623921282975,0.8367083275824516,17.23179238068888,18.783717649982414,4.035716764123687,10.402883986591442,19.22325277454344,9.906754540578508,2.10191858016759,9.40703226756507,17.197385231049658,12.589625081384433,6.397235758027762,15.554032152383535,7.11023937773914,9.924981637304287,1.7570717418201864,14.253033682759671,16.852030373051274,11.274700885572994,6.9786796977252985,11.433260851623075,16.386124129888415,9.3130372080279,11.049562878032816,12.138920207283682,14.575554967540722,13.851452812112708,3.1429039003708725,3.39283397652979,17.854360629053105,0.43830423395898155,10.575903061395614,6.6832656916260635,4.8443704389881725,18.80958693564785,16.430513613596837,4.163121673718448,11.359495701832643,5.790326287777363,18.067390142003198,17.79836553620925,3.660932675324231,9.791874272607348,16.271013252630084,9.072158008777587,11.351542084081547,17.63453884121288,12.634699888653603,11.769154643437542,14.509508472836362,17.883723620285032,14.882957410448224,10.206285410504488,9.405083211286808,8.220624542216814,5.784537865252619,5.557525120154816,7.227958199931335,0.731157815650616,4.594078663613144,0.608524478229624,19.13360385335459,17.120401877357327,2.1782855397551604,8.154821952835363,10.651343993988363,7.68108697833628,14.365356472627596,4.816133769216231,4.4961431288705045,16.936736908758046,7.792380276403401,8.578030500140482,13.698736196628634,14.645896308276054,10.782898878643174,18.7941205861762,6.902597408066802,18.845433486048865,11.34156964582678,3.3575743495121912,7.597992536759319,19.138857210744327,18.371967316436404,7.395094327055349,18.43782148631654,5.135331968071437,6.713950110312199,5.544134231587243,14.757078954948714,12.209401986603062,17.507507761555495,1.0679128240897784,14.36049859079159,4.310773908741985,5.350682114567391,4.683708121658463,8.32363805379945,3.462443338682726,3.9601209055645192,2.8249700265583044,10.706907501002156,12.292451550259331,16.41628386789347,6.106576258383969,5.492871141573308,7.568326629932587,13.282651183648024,14.953823298608743,11.769169506037631,15.407060628255781,18.143141568139853,1.6256036285396336,7.661680919997114,10.67484848820737,15.953785539363384,17.627412123277082,4.7716600158091405,18.735311433497156,5.210819378309437,19.198088935653793,19.196525116174534,19.130431952967587,16.267553288902747,17.179064697528617,19.037394154719827,4.279158487866881,9.876714347947736,3.2108834940481,17.392185144763168,2.34469544965878,5.820648834983229,2.7165779705413318,9.315214674490818,8.875193776348592,0.41526009615079573,8.276625258710322,12.562812305563401,3.446464210628304,9.768053179421274,9.61411251753534,17.73991610015081,9.740871257676464,18.035773567148418,3.6770785117401594,16.664522619295134,6.973343841985966,1.960287330879531,17.280400751727377,18.178614047397843,10.019646509145176,14.12553124277463,4.503756456536756,2.9578463291465207,4.6255860802962445,16.232763510227727,14.681152422027353,15.983818178853682,19.001541910739373,18.32426998623083,1.7924840914351226,0.21138755640484064,14.173926864923336,19.473012453123225,19.410655834797666,16.779983875087723,19.589414661106836,14.617850425064987,3.8521947836673265,10.210819027078442,5.5972588674093116,3.506022457391267,2.7583525780333185,11.01505724070945,17.540132197205935,11.75310037674115,6.168649888655544,19.423568531004463,19.144010524215954,18.15679106403787,3.71297668068971,1.8822221204517353,19.83087410290213,18.529225531211843,10.291463885685612,1.37675114712974,17.242631757747642,13.144124454265622,16.384244005028684,0.05001838771541589,1.7490121569683303,1.0544231699419937,13.318694510347635,4.455064876829122,3.1548087442834793,13.479844089780837,4.546345545284356,1.35853714758285,12.822167152102217,15.783565067670985,2.8781703732726394,17.69625351784855,8.163038764313196,6.773101794989649,11.443524268083923,11.98305025824316,15.64487151099065,18.672512218743,9.17617123177013,12.313740670916618,19.735782285021948,19.68539890819542,5.943679758737019,1.1306146282053442,5.291035395737818,17.835177296284094,19.83108953006258,15.675148015785112,0.7891420722115505,17.87863090692521,14.569844217909482,18.547956404791222,13.37692395209254,15.15085795268217,16.757050049849674,13.836325440389917,18.80653429280036,16.826447210984156,12.562514974823099,1.3395165838312995,5.2194135571947164,8.876524896334645,7.302030693241561,2.5591407654599063,8.359915453076209,12.391326554906982,10.751648254579166,11.759113655681489,12.078433408626381,17.792000597036576,1.2649847599298703,10.696785546058805,6.128658707667665,17.56607642452682,6.048044919605142,17.741424734562944,6.916341697001882,3.2558252790655784,1.4260002536983407,1.8809844822740995,18.580105120434,14.463853409222471,1.4026732233159844,14.580751886895186,11.718707257230498,15.847602975460134,10.747250638113698,18.280533480705287,12.241834578875697,12.49015201028179,8.95333775045632,16.75133167122262,1.1257727735121748,3.3366542432932667,5.120785483777532,6.0746056925291825,15.360443905096407,19.236772741057386,2.983854837720248,3.894658958387356,9.411657335559118,17.51383550939326,0.6719780131253472,18.122809536729065,12.47250786773594,17.051700449035483,17.364314336780104,8.057632383284501,0.6960699017187144,9.87507063152755,18.49729784326982,1.287956610754173,5.615623923556368,13.301140438804024,3.418431178285357,5.655670405955129,5.044386534663854,7.491865979851444,9.43968274306771,13.213529659668023,8.406446268166722,10.889179588023552,9.601070468139795,3.6977158953658673,7.536966784775085,11.797977198599593,4.327484613080292,5.639366329374984,18.69281843700955,12.682723426320077,0.3010555939959536,17.738547657370912,16.919695849453717,19.953070942699686,18.135631670639107,5.921539576421404,6.345064056606788,2.1530002385459035,0.32410477578549646,4.3083096832627055,7.697737982340929,16.98341432773124,12.416766633862784,10.298130187551426,4.247005085663198,19.835811811071164,14.26552271588719,4.315877235235264,18.965511314338933,16.350598193050555,7.443396312332267,14.668575577142997,18.555489648228175,13.757524437772295,4.929915487330412,5.093384602467497,11.791709382857945,0.8601381471605007,1.2766355859906886,16.980183947108628,14.769846551248849,14.183334126072769,16.0285443352659,3.492970644468283,7.272131382848355,10.635653392852591,0.500108606637788,13.928308674195922,9.67312300929712,8.912809502478773,6.200183605549556,14.87562897611243,5.287774836954151,6.013047821622157,17.64092655649444,6.837186340370618,11.136759892960324,7.779467030732263,0.659746201447291,11.693566166293827,18.058443750156417,4.170037770382633,2.2732984214327345,8.816525407867069,3.3978066931062534,14.027827845767305,2.180225508249989,8.292034329468994,8.626042715671032,16.05848249202646,10.730799996014756,12.80650311873794,15.923803298241733,14.747142865453275,7.053011579627531,8.606713139633907,11.368271436548852,2.543957258716789,11.33394445355789,19.141313409102402,10.336418798813476,6.683093306319545,5.791042694652773,5.940401512493452,15.687805859790366,11.218909616414212,6.124919206486363,19.054562188562052,4.571585005644203,11.079191796947496,8.81665683116703,14.58789221849103,14.262083593333173,8.342955351897551,16.83022455412468,19.97661458048491,16.295542246763866,0.167840023536856,1.6009709257813753,3.8993400996612015,8.363443389538183,6.672253941519477,1.0833836495921734,8.833601977376603,19.52470304053364,18.185557036595497,1.1666098497535637,11.572290499119688,15.576983401028306,9.583679542046163,17.153273490056943,9.897822993862707,5.080838635683671,1.769173114998277,9.560291310812019,6.966474407539001,4.489538104243507,18.41380579828118,7.758404034174071,5.087975578750994,1.1741965786647324,17.111072493010987,13.586414273674933,6.088816614212251,17.313280371684026,8.532140490196976,6.103847888283362,16.61469033866831,13.429698439449801,14.147955290847346,2.915898088094453,7.9695625701941575,15.061587686267925,10.9160993917266,0.028774091260390655,2.9904412723555396,11.569015467489914,18.840369162899844,16.640353662825795,12.438541048522747,12.035727791983604,6.203786442229573,18.200702397998242,1.7690832555014868,11.869156217948929,2.3833571016014643,1.8674309609878303,10.401676909870368,11.156361188766217,15.679952050847277,0.14314519689566207,18.50469156880746,18.696578567389782,4.49248621400002,1.2607207242405094,9.963437591578659,2.5921314181791377,1.6241722501065414,6.100273012983504,5.982749715858193,9.552911689284137,13.442380457855773,4.355051027183108,13.368170542091047,10.467003873762227,14.059987677099773,6.3058411328350905,5.451041183449141,14.013708839320671,3.43409767940019,1.4898164731577035,13.68820813705474,17.962834605798573,19.326647719965845,7.961314945217746,17.483685044312253,16.857547247053244,13.598209766192415,19.143309717508807,7.268735497069021,2.3751631395399952,9.131560900782905,4.677416767859435,6.306072486269398,11.242268418516023,11.081054021641613,18.690019261207823,16.842118538972063,12.839265117218543,11.50158242625154,10.019285907238391,18.956719122692757,3.5909401027295473,11.81988424181001,5.133860139736659,9.096793459378443,16.151845272366096,5.30339755968924,13.89697859365652,13.416601854809983,11.285278637918065,13.495607345829868,15.289372038867217,18.699605268783156,19.828276363582713,6.562250732433843,13.030908200438844,1.6653429588977708,17.739183622864367,11.151051881780486,8.399610783991104,3.238941309315657,18.900483353420803,17.954607624588718,8.522744616667097,13.086459562817986,3.463284561817792,16.268670340829704,5.381904967808202,8.92968353336987,17.304560609342694,3.1656748406549173,12.049680127832886,2.3874414029326996,4.992461490895752,15.985913726145466,15.429785923304578,15.29425087964562,9.068182925309078,1.11247361143604,0.7398199472495781,6.524842833575146,2.78809155547056,14.726444751766415,17.140897543566602,0.29782475507977857,4.604702193395558,5.741301686215792,17.936387871193716,18.04361551125416,15.052280509529279,19.110069351471456,10.851104435097518,3.7899858471644388,3.967783055748497,13.223785934741596,8.028313491054483,0.5913570593542428,18.76805185672605,7.313640662199208,17.173734836641586,17.779006803824636,11.811256813555818,19.614440417825286,12.373273496388094,9.965901862150641,13.325950350898266,13.051190305014346,3.6964046443932164,18.99049325253435,3.166330825951249,8.35304917345196,1.162065302057278,11.811310138207096,6.159513487615462,10.862471800479057,0.7192082263454846,18.644870557730194,4.399544544314242,11.196901734661076,6.1927384818214914,12.236544322929168,14.922959534082377,4.983422498454737,4.0126958280869784,7.960860507833822,8.682628646296315,3.460896542572476,0.10906182814874654,19.54630949478206,0.16354082392727065,5.228045170305533,19.002598631840325,15.234721224468766,4.824359699546101,12.477920442819975,4.274347436082051,14.094095446411078,8.492661580079478,14.455975673314875,8.625370969112168,0.22326196357945527,19.768986574990947,11.583643046829252,3.8417371348767215,11.44466439103021,13.900294263699259,19.29045301359594,10.94628224974102,13.868456656487233,7.5460320017604054,13.206913243249083,15.442234758274749,1.2031204205476653,0.8479971867402103,15.861120363693972,14.97991515387708,13.491615191702548,1.3777757672058266,9.499931957452725,5.802537184028513,9.164740088343294,9.233286278528778,6.04709335969845,10.596189924307948,12.87257484140174,17.592640969066274,17.302845475479764,16.30857134462103,1.5802894165642245,15.25249942340233,1.4955974298362795,6.9612834094452225,17.634752689662257,2.5187632276299032,15.26233204656445,6.415750956290269,18.183797201592114,15.127013665394262,17.81561099245241,10.81673277001316,1.5589527889926602,18.544501958195305,5.251058000635176,4.736103338665636,6.3111764763959055,0.5701781804872397,5.477655518920286,5.052325906864739,10.681802345177527,15.462702495008704,13.033320607510603,5.804681437503616,13.846814713420951,11.143548895295496,15.398885164060975,4.238361127086736,12.735607915465966,13.59772068311547,12.99440642866081,1.1509374256190696,15.256383280455704,2.8060823579259697,6.777633813204287,12.862272086000491,12.679435611234279,1.0976036100912845,4.844838494408457,14.022583340678922,11.223803347188284,2.8495825669962827,6.252215378754773,8.37207112650599,13.202524712251847,17.880994375164914,12.567768569959652,6.062408617471697,19.55405158195282,0.3570517225951697,7.484896371804397,17.062725758727982,5.676850031744425,18.689668390666444,12.237740749066862,11.638490699504942,11.535246778708256,4.80296506619565,14.179810039357537,16.3701011734577,9.063092486305582,4.148680299485439,5.1825029835372005,14.816431401357555,18.316968286846187,13.736240564328174,19.396263503034817,13.912373355521508,5.913584774365823,11.569975450219081,12.542986031745418,15.263805086460902,0.16685461935629142,12.90230920301684,17.081675570298202,16.091765141133504,4.12193417513484,2.0255326177049238,19.20687450565437,7.531879487169237,12.850822874744111,13.211734429887967,4.052641611357344,2.364622893128252,0.9286306145039802,15.858839066904427,14.455211255843201,16.754051674122973,14.939302312212902,13.951943472393506,5.571165275273597,19.49598110865952,0.8001992464791652,13.957182364558832,3.0527529643524165,17.107322603178545,2.818499929549727,8.314457386631222,4.23649444265771,14.833275754306708,6.204828113114633,2.6202978529454723,7.195707172631143,3.7110555988814964,10.198589775174224,18.06942688884333,15.878185043936291,18.0443598762181,19.803809102386786,1.8912609144410997,5.944252867149045,9.99998890547651,18.214839691604773,18.713752618943875,12.092291505058341,19.221316420194906,11.008216013548825,10.195913367613759,13.27584718648784,11.087331356933753,11.495384238031976,17.873681984883483,11.125778309105474,4.944434912580711,13.356950749454324,17.30447816398206,10.244753624569277,2.502179275782317,7.888977906308612,16.5938257634726,0.6740163150115519,18.251916608717945,2.692051257488721,0.91542474986543,3.1741851591215253,10.392344494932804,12.989738926976662,16.295118852050923,3.7499496219944506,2.7540593510252576,18.315392063765543,13.961973224580895,10.302910615435824,3.4536986648407453,3.391209868368703,16.53951526671805,3.8091372547994284,11.25691145183441,10.695198799937508,5.065681804428994,6.139216183159766,15.94227142288081,0.395325431392366,16.993838112157412,5.008593089684634,3.5004616103797037,2.012596272715257,12.111797196664194,13.136788244194788,0.7197323225761298,16.869746029382434,15.934110717868055,19.266470908636457,14.104991277369706,17.389078246595645,13.869141320962438,5.872509667244996,14.91895151379724,5.983595596513278,15.46935502501109,16.40927060393965,3.315266037323128,8.632204260016083,0.32735000362320577,13.383431823233956,18.78979940315567,19.61614535779363,19.398970326165216,19.720916515692444,0.1709207573712268,17.562366990891995,7.0860508562652225,0.9611920026774357,8.688266689139642,14.02261794631077,12.942382738900346,10.633210509699026,3.1912857792783633,11.790873382247536,0.07075708181168316,11.20173677993284,11.672520212449253,13.757465549183108,7.015956327997919,6.270923237804511,3.631025659660163,10.277836663760285,7.184485195499839,18.15992148507022,16.289307706123463,15.86942277064975,1.015305505524191,8.1766456375558,18.792910652821433,7.049964213795539,9.065460766965717,8.211974602626908,10.516387205754526,0.4092442404092722,12.09026900615009,9.767546418388783,2.017912632323897,1.3958121389541622,18.401761598810754,6.987746273867823,4.620835271014241,6.180113151977293,16.813607022893834,15.25977807538817,12.296338285731668,15.825962031448926,6.5419377208816565,1.5559743605265597,0.9994779027937817,1.091624047935893,3.0358817667121585,14.634234929408008,0.2965259273789034,9.975619859263766,3.922790778912777,17.75386355480114,14.815982916121984,12.00783609312436,1.8142300457493343,7.4133655784997865,18.311606816423197,15.422424035153313,17.46308374074541,8.006675040552956,13.639447331186796,1.7305245968708105,2.227444273292414,16.59084551134346,12.631032156296502,14.500645702968367,3.805202023680634,9.497266419428376,8.641164001953126,2.4444791938254795,16.27684048960483,12.033618914901538,19.95523435592249,11.084511919810742,5.964227048917703,10.492172524550462,12.210971770571524,6.469092630648925,18.108322218152047,1.563267890732014,1.9562629242628038,8.91283590629608,8.886253555801753,5.187050886813758,18.038514970021154,17.032354111942297,9.973264218216272,4.073049467826957,14.01328960393171,9.962146972588894,9.996169655956034,4.8202641133405955,2.0680558412113337,0.5118558234376192,19.25606457757254,16.09115656305604,14.773550970451112,17.520415834137335,17.19586618383046,19.55249762528812,15.300029646463166,19.481279403721654,10.166019486367496,13.185628072710088,9.105511716879647,3.3084684775845696,15.772264886049916,3.2312761238251664,14.395877817636977,6.919398083673398,10.539200479829232,6.890851882334372,16.23550189187027,2.9692362296289065,5.568689699972507,4.316317079537257,10.403806937451323,16.04632132149718,11.265139052309316,10.966486961463676,3.33990850800999,10.88939030886927,16.964315569309207,7.043500627730599,10.707290284143692,16.564034533790103,4.34229502789389,7.250125588894294,10.274878772747442,0.07639006050800035,2.2547337242928656,12.789601284249619,4.296191038351362,3.5662848198025854,2.939013878775243,0.8383284449344108,0.3785799281133029,5.829709424016576,19.024574997218807,15.092147523190643,2.223760469821876,12.918528469339062,18.812731135243617,4.816285226388679,0.7588044390925974,1.3913268008748947,0.30190724412741954,3.5123995369740113,12.494032908341177,17.512112860559487,3.6725418825100986,4.207922340869592,0.1896730083483522,1.809614181502326,7.271504394981552,3.619501826612863,9.563614867038076,2.677279699625519,5.858733062634918,13.570453547241792,11.248844755702713,17.366952754181433,10.032809608502099,14.742629649269174,15.105055067842601,16.72833585196347,7.1152166082978985,13.781145266339191,18.122320497106518,6.237236775612827,1.0189850869688444,17.771280094140778,12.745416234837549,8.584365242524914,1.8487511693730907,3.0082100364337228,2.3277706768531514,7.238422331731305,0.18331561787523487,19.232756649590634,9.801155524646813,15.370621089470703,17.39927353649545,11.161266512382442,12.185403976613332,3.5438814396857543,19.12304057100375,17.980998919111805,5.411860441064937,16.861531840525576,16.3767859590285,6.42422156025753,7.062788950324297,18.827724641096918,14.226322581379236,11.113333041153997,6.674886779941063,1.1565872324363191,5.085769807972107,5.112783216271781,6.259527492624826,5.724068186857263,9.97839971085659,13.740569047498443,10.892489865669614,1.4690597550883666,13.369072017989247,13.031360371654085,4.064737869689838,1.1841752718905907,7.37783875415464,19.029985913166083,6.826808069423516,2.492329495939778,9.26604940614913,3.306938800454162,13.739747581671221,3.544270761519881,7.456689755291128,2.5543549056453063,18.424136021230847,10.580867445633086,10.774389712535815,1.6917932993354068,7.0374537702188755,12.461404080174665,13.369460726645386,13.226500999412325,14.991025251874515,2.1084297033430532,10.243334846002995,17.760653431415093,15.630596489745653,15.745706187328764,10.665103221066152,16.710122872054125,16.998072473253472,9.203276040154943,6.846475246295642,9.065255794103857,17.235251360829746,3.670491544376744,0.13959808936539808,14.419344119504235,15.998406856319294,4.050299925821106,6.072507439614521,1.0192762578407555,1.4863059401327883,8.020570110023971,16.089540940488995,2.6014905124964116,11.527390210541025,8.727837272289122,18.162153519577874,3.2660607111408835,9.431717987555302,16.85047697942224,17.170365975019088,11.844022680026182,9.024052550811405,1.6830110160343104,9.292667488084124,15.807802461865045,13.325569013675542,3.4650775849122084,13.246857841803283,19.47994496318087,1.6387551381203824,1.1660653688554445,6.7800155938679785,17.091061690972612,8.734231482685232,5.175156283380389,14.140933454199466,4.321483323362458,14.315752663777573,3.0963407842505886,9.728952185286492,3.9220805635010914,9.163819444158538,2.4400901123630803,13.86961387507049,2.0413810527496024,4.269040883131536,18.70349896091811,9.258514460299057,4.061269069662425,13.192725450836518,9.750616243360874,0.612976811439716,8.222587807931351,1.866777158949362,5.134825173781983,11.250915399976002,19.703314141970083,1.8328367080943497,10.349752547441465,1.7851654666951866,5.1679795415508245,9.775504684746297,10.44737139885228,10.951113526585852,3.4571598451886576,9.926281337869982,0.49182769534248827,3.843412186325552,6.427789561831747,8.503548059106553,19.6982882192304,17.596104527824078,18.553297420155637,17.82732802369331,16.660080941182592,9.814832935948195,18.555888446610442,11.930108171946795,16.631319365064748,0.7680095434719014,5.181071206038457,18.030229463392196,8.738722594430875,15.262021560428177,6.305065083778145,5.154156252376794,9.459770479792091,13.496107052291153,12.444149998794689,5.743232619717036,1.7193011135642111,7.175274374000682,19.834975956995727,9.362741302742394,7.558856134948417,3.272870850569869,19.962795029153718,3.0499659078572394,0.44362684132138064,2.764762589825005,11.247422595860366,10.059047553744183,12.288718641731933,2.034073878408247,7.146530665529447,18.15901957881994,0.9733260616056283,17.202750690629426,14.927790420160068,7.810817088611275,0.19914167918742454,16.693569736273876,1.494688106474995,8.4836502903809,4.5617177067877,19.07071495155642,8.192599106064584,2.4594476893383588,15.471472727325883,2.783088724134304,13.927325827308682,15.622464183581606,1.9873138258440548,7.534179174840454,16.684100233960844,17.229562323002323,6.428084173145665,8.926254831109702,8.353024920146343,9.01672385855222,10.488691226125315,5.531744060819781,5.059260783308006,12.256130351182918,0.6991183682882207,10.851624950274118,19.005585495646464,8.836367555318754,15.291422580840667,8.16674154631512,9.406560951552043,14.291591321219785,15.364310254245499,15.587222956013589,15.10792529551495,0.9705037944146433,5.513790798946014,17.181724299760887,17.74482508941506,8.052448212565523,19.71924236768896,8.444618441758,16.539964676049372,7.238009407244679,19.818366523310658,2.5430828904099068,3.2326865631814306,0.959832804780234,13.354408431875644,18.263772013003354,12.67131401600392,9.692529429836458,19.97027784964629,17.37572922016423,8.264622652889045,13.436943951400245,1.7102081066694108,10.508532395992805,0.1851244910764427,15.669415389691856,8.926563757342102,4.36834785964253,9.98693523122251,16.840811723965746,10.283700561385277,1.3804291106345623,7.17512772755537,19.14478471682218,13.260044174185852,9.8072724434649,17.98341301562948,17.88627208610293,6.230715924713359,11.206750128549569,2.8995462521642157,5.5278430655363575,13.67030371057789,8.707680618041515,14.032635492589694,7.666760481150496,11.273712670321201,15.981328539124782,14.753140819198208,12.995887101669625,11.335036258558691,1.1382404724226713,10.962517663184887,16.266981637409927,8.607470771160779,12.553663011910746,11.341006682923647,19.46601642335571,18.578965348405458,4.754587589096895,11.572707458548127,3.057633369043349,12.005821500785574,16.805765721204267,9.527762046893361,6.617895039185111,8.374569241621948,19.607262374338372,7.750312414340557,1.1445843688903334,1.354677402464981,4.681360400202972,16.07114214023389,1.0810337201798736,0.9965131086358348,7.460068582388009,17.754510299430972,7.011177064997596,14.402517945533653,1.822109604193125,15.773827140181208,6.150201836648477,19.08915546191778,2.2245280142598833,12.44388243896745,12.343934398484397,19.41321242431598,13.259273520436397,12.447081672909288,4.609035623904552,4.912636185796186,18.298886585617666,17.9664741316192,8.678551660376979,14.813315935679373,9.358626247071115,6.841994294875282,1.4753292065037193,0.5433526488050777,1.4259729495816709,6.992262505858018,11.021933414579879,15.78191582217424,17.77035724031581,19.54341526705705,13.947216701707159,14.403786306387477,5.930519601797761,8.644830833624368,0.4595867255600927,15.441342175482395,11.636283567745158,12.502376772286645,3.5135296766464297,10.444584232243418,10.495534806994682,14.977021304819536,3.5802426149532884,14.601609867217785,2.7856730578597055,1.224488050133301,15.980761325699717,4.178061134827296,3.074000866071809,5.460967694432992,6.696397168806856,5.693643097874714,16.53059658234671,1.2470047529680173,3.036899557507562,2.328317132951261,2.0653806876823166,8.422671077670799,18.735281357467237,7.097772577338297,9.075536424324664,15.268380764740993,5.24930115105843,6.709751371224075,6.868759910348872,1.8128515046400073,8.663815746727913,9.632155506513765,5.719805942982488,3.1737834953165356,9.34176984446423,16.244364109157484,14.438906890590083,3.075840246208559,6.892726955644566,10.87982859464197,5.565237128780582,6.157383651560484,9.635663216047753,14.668794008173883,10.917789057981345,0.05117561811446514,0.8891286712120827,5.562998121503222,0.9483093412770449,8.886526156059196,14.138800072069486,15.292796758299009,1.1855590433828311,17.90677650200003,13.367621006180093,10.378068002472194,11.55844430439251,19.633510039223232,7.2971776694382795,5.054845940122585,12.792035166033418,11.698566828986383,14.431805356335756,5.726345446922676,5.490865903362594,14.101830589011882,0.7033725506016575,12.009016908253889,6.706785941196682,16.08622759067746,4.156519372134189,5.511760493463718,2.6647438697306303,16.73857091789639,15.506907271885883,0.4683960951662902,9.467817192709944,5.520389200055789,2.860319301215304,19.960915109329495,19.692861944150618,19.81274639295013,18.384744150031594,12.617836055505904,14.463385939449097,9.293930125104044,2.4623577282835996,18.519072609556623,13.394543055431459,1.9063572816072094,5.690961206825067,19.934618615233735,8.026749756348295,12.105606066622737,0.52927528647011,12.863430131498394,1.570629514416222,14.304478727033182,9.311836323992523,3.452046252187282,1.8454508072995734,3.7021480207366686,8.108245927200443,1.0426557899581423,15.009193720105252,9.316675969489498,8.117334987363986,12.685730651334936,1.099760052397638,6.285612411440806,16.861123561777234,15.373479886825221,11.436336663095537,10.779810253172206,7.369419899065388,0.47740620663943023,3.768917534941698,14.44207639624944,0.21057233393073638,15.738729978633664,3.1463610747877535,12.92489605338245,19.770765532283082,3.1965602626450806,4.249114597801151,14.087174887937817,14.71197926632156,2.2326666790101424,4.494067108538569,8.229825573407172,19.82582468616147,6.8451575433575895,1.6584867899400368,7.1395597378516,10.364999962804475,14.40175391339321,4.917419507205056,15.30813074139736,13.66004802610496,18.25756960467046,3.671920983025627,11.416113743460375,18.007374310590492,10.162873186813414,3.9210451795906165,8.674313609582303,6.442438326307509,4.00765914460274,0.28778930108403156,9.338737785122797,7.892110462766766,19.083273185430404,11.602918637442245,9.06289552383222,5.969876928658748,19.48746179487294,16.60207375248906,16.752019857150685,9.550347847847132,1.1121058043400511,8.728595842720503,16.46319554331553,8.418806203281775,16.094821171822144,3.1218212803613676,14.636747484113153,16.63543396697289,10.007377119207277,11.074200065143422,15.681139039084048,16.269995618332132,11.928542021703645,4.301755669945071,11.997571012455808,14.107925151197804,17.18781216723854,6.707050585066945,13.318062382842996,14.175627362462002,9.244427683276125,18.317875963954037,9.727552010875403,9.197630746276708,6.445831151595991,16.350263059073793,15.160285159262878,12.732899201087022,10.6339986536186,1.8179854193481892,0.5702997015624645,19.401882634659053,6.39514145378917,15.753744158923606,10.803082641023725,7.8577674174845,12.04248880309931,19.482937777194085,19.606635209296364,12.299752404286405,1.4855943574923014,7.858018547415853,2.6228866125376493,8.304366547142678,15.707779133872357,7.084182921677424,5.155826537711552,11.929492643535099,13.95679256797656,10.98054716028333,0.782819863026023,18.6161489665804,6.668101330346605,15.391183624384528,3.6672974580580897,1.4763163004761592,0.06006823398736927,4.286604288449638,12.164968361376598,13.645920793990856,15.513078260366783,18.39045764198337,18.502747966857992,10.874329601203549,9.720398269570815,8.685422512052927,17.82828061619021,17.456866593512835,13.69168343651802,10.161911916667666,10.94677943305463,4.5100582413329615,11.6704158547903,5.865709182407373,17.12234123442108,2.2701321536622077,10.850357608707991,8.610520768451956,12.203110621953307,13.0794698015381,14.3533369557281,15.21114399740223,9.263168938197524,18.998254712922893,16.439460337174005,1.6561386069727702,6.8173688124906695,5.30542177429175,1.0685518904457858,1.8325979275069493,19.565986529275836,13.560996416222007,9.06413628915617,8.204401543040376,1.6893922017152363,8.47325811130862,8.89812273550346,17.48694592618608,16.47363566766977,1.3640534660935044,12.25652735472812,2.012992975494794,13.00111812193693,10.947558495390503,9.724633509484853,15.346486171922042,5.031568713432062,2.0672538878905833,6.979989632520143,11.164365627734574,4.746855398293981,3.6346581909693265,15.734774479059418,15.604015707632044,9.217937141650783,7.305514752170135,2.2251269917253635,17.72082535381328,2.3681123239868374,6.399764241085664,7.039951428003719,10.399363909242357,2.339453431865537,17.363390514764273,6.809136383152574,14.901016197536677,4.205631403934897,18.212294640021973,0.3450189229623257,17.234732626760085,17.40094487100551,3.2362793364146647,9.092259674406836,17.54692393265887,6.663899116020775,9.60382534669848,13.047658819252677,18.32822825398672,1.1727703546312185,7.449240978254843,0.46365550000729616,12.521847621315922,11.338557125047032,11.934436883937876,4.112419863838994,19.844414043548497,2.647953286020215,13.053581735792473,9.121548886210903,10.032939432245204,2.9479562242571866,4.506133557105896,15.533099111974632,17.206326255973924,9.245377542127011,7.751852989996966,2.8586293978182153,6.006578065231163,0.16639297854686763,10.825590465469425,14.056168248900075,15.239056057050675,14.773325622394125,17.463305933692347,2.9075193562895763,17.5181237578918,18.870613145645045,17.668531160515325,12.493504243120196,13.6250230251135,6.2701608689586985,3.842235237747209,5.749586202258916,15.377420029703375,15.819503315781049,18.300795637615312,16.565428206686367,7.4659257033675575,14.12951378176051,10.07285821797456,14.287093596089893,14.659267218847294,10.053691973715132,13.964962283652795,16.911115474169627,0.8000041043434392,10.707850073474535,8.371308918076048,12.796459399060245,5.679642174766655,0.06472703130174562,17.85072609765374,19.75411994784961,5.084736165687773,3.210429995001012,1.0765562926202321,5.662177569008833,12.425155671515519,5.499447187994768,18.366301270469755,18.231526701979273,18.360267694690002,2.5154259320275463,5.799091936609382,0.7832002888678202,10.529560893341952,19.534191731981974,7.703591874211746,13.012917735310232,4.669526933195467,17.357427065930505,12.827668364226895,10.989722932257365,6.618241312729123,7.6008009010995,16.71489183747914,2.7930763470296105,3.8974047516233723,7.927684804670538,15.497793354230204,0.7019828604519862,0.13069879132787676,9.01376958324942,18.105701004451674,6.166532097490132,4.72246733200314,13.616111229510919,10.83854901093963,8.352422784807558,5.86719866447722,18.803149975623086,8.36642942043467,14.245634173844874,10.403552269857453,18.646305700262687,15.418248813874822,15.237408626222182,12.715595803294995,5.569362439597012,19.856283704669757,18.39208069998627,10.345900488088034,9.124896871091215,15.564931061554539,10.7780314999941,15.065346849838296,15.168672659386742,14.799600054559527,10.023179845972056,15.344400380331823,1.024054725566348,2.5828414655715815,3.237906261171122,14.101346663453157,13.860981872488232,9.471152274717042,0.8882125952766939,16.041820848644793,11.155672007611921,3.8767452977665062,3.8455753284140437,5.590922618344316,3.9498260568942856,17.384513245392167,15.0714517663863,17.098756910616856,13.367360683356239,1.2850807083872606,15.22187295336462,7.379018546282019,14.893748933381751,0.2661941234177334,3.849349464175651,14.11226310269095,14.024700914895384,15.799959378482864,16.04034554641637,14.366102457349514,7.011265181159878,12.293195207737107,13.731642018606237,11.788973189488274,6.639962640335018,0.6662875393558831,14.094550879450667,10.28022173550875,0.29185632909268566,4.3322703118227635,1.9562292584076646,0.5907424769468594,11.838599775296426,10.593820014730696,10.08084337776534,7.883067348877093,0.8649850971801243,16.723280280465374,2.049715178396001,1.5551689805200564,5.930488778820089,13.318355086163534,5.3014929591456195,4.3593898633979,9.805626324140508,2.1179096203340597,19.241415048390223,8.273799672977894,16.669020547864797,7.990083178302356,17.75686970815146,7.425976614171219,0.5423284068309941,4.901936436282033,12.246097572308003,16.860935910191447,2.2882801270656206,13.681112236891506,17.58285410886255,12.793090751836079,16.217848171291088,16.79346936080295,8.665280520479186,1.1226042105458989,10.671053946523248,16.493891393409747,1.2764417745594248,5.332371993828833,1.2160777836163916,1.9047621739847376,9.20134175793256,8.857379070779317,2.5664382282133724,13.500570498850838,10.106776270759731,5.263429738548027,18.59900720197189,16.86863192975785,8.55921838594436,11.661565592376558,3.441803010987541,19.835319595165064,11.337672442164761,10.656814430812522,11.671858331548046,3.882146152114503,2.103391126721683,0.34433781420204035,14.048403122042036,9.794306419890342,12.546059738527212,1.5727655146004338,7.320152378211238,11.628989833566724,6.517269667017249,10.335791071083339,18.131672986177115,7.552857996070599,5.2082997493813865,9.178210828241241,8.271898300526228,8.068786344812828,16.519182639845518,13.49831702107782,14.040929632012977,1.3074251275826487,10.386589226080062,4.385894357484803,14.030332511741491,18.28397741612324,2.37312145536674,0.500046328262358,16.206674677250298,7.334122186114986,9.753774814946677,2.987200041623863,14.850098999820617,8.326243175623773,13.094895286795865,9.870140719910584,2.419246753678208,13.734465951606825,18.72758412043524,11.871842667606241,11.129047195408969,5.143553800399725,12.882819050175392,18.426797571101577,9.973296009145987,18.927286906719733,18.17508209889725,4.328162338568142,13.34489835174658,15.330273162937736,7.1379211594827385,2.4438092811415446,2.9631196480718325,0.7840914185073089,1.8088058969092824,9.120998959155656,17.674946017285983,0.9405414921947797,2.2524305534232925,6.532352168672282,4.840189262612258,11.981877006747975,10.664285260503327,0.9537960876356655,14.67407834223399,11.02244381357201,12.623172398327608,11.48601042572636,10.590577230054956,15.815003642218217,6.19679740851288,16.287005580611567,17.055002171484364,17.909678625057058,3.1866282572538784,15.496263751053739,4.483102540365023,9.874998451088466,0.2373656875309038,6.318468425817714,16.840497652157808,15.843121292920582,1.8594818206028885,0.3210320363328645,15.206229615131623,9.121590389082105,8.216840795854177,3.2101628071959176,14.653885743125038,1.9224683184425917,7.51029397491787,15.323019921820595,17.719317220464642,3.3561471360863715,17.25505795175376,11.428456577740844,9.380570614825503,16.458813630805487,13.175898272181445,8.301389815933842,7.033438249294908,13.425970255889798,4.412359451162473,12.61924501536484,13.588983112840367,9.000101104656988,13.84708004458897,9.386356124945472,19.321195880354605,11.481243358007438,9.690642208761977,4.8363136403331985]}
},{}],95:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var randu = require( '@stdlib/random/base/randu' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var EPS = require( '@stdlib/constants/math/float64-eps' );
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
	var logpdf = factory( 0.0, 1.0 );
	t.equal( typeof logpdf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 1.0 );
	y = logpdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NaN );
	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a finite `k`, the function returns a function which returns `-Infinity` when provided `Infinity` for `x`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 1.0 );
	y = logpdf( PINF );
	t.equal( y, NINF, 'returns -Infinity' );

	t.end();
});

tape( 'if provided a finite `k`, the function returns a function which returns `-Infinity` when provided `-Infinity` for `x`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 1.0 );
	y = logpdf( NINF );
	t.equal( y, NINF, 'returns -Infinity' );

	t.end();
});

tape( 'if provided a negative `k`, the created function always returns `NaN`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( -1.0 );

	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if `k` equals `0`, the created function evaluates a degenerate distribution centered at `0.0`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 0.0 );

	y = logpdf( -2.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpdf( 0.0 );
	t.equal( y, PINF, 'returns Infinity for x equal to 0' );

	y = logpdf( 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpdf( PINF );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpdf( NINF );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the returned function returns `-Infinity` for all `x < 0`', function test( t ) {
	var logpdf;
	var x;
	var y;
	var i;

	logpdf = factory( 1.0 );
	for ( i = 0; i < 100; i++ ) {
		x = -( randu()*100.0 ) - EPS;
		y = logpdf( x );
		t.equal( y, NINF, 'returns -Infinity for x='+x );
	}
	t.end();
});

tape( 'the created function evaluates the logpdf for `x` given degrees of freedom `k`', function test( t ) {
	var expected;
	var delta;
	var logpdf;
	var tol;
	var k;
	var x;
	var y;
	var i;

	expected = decimalDecimal.expected;
	x = decimalDecimal.x;
	k = decimalDecimal.k;
	for ( i = 0; i < x.length; i++ ) {
		logpdf = factory( k[i] );
		y = logpdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+'. k:'+k[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 10.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. k: '+k[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/chisquare/logpdf/test/test.factory.js")
},{"./../lib/factory.js":91,"./fixtures/julia/decimal_decimal.json":94,"@stdlib/constants/math/float64-eps":56,"@stdlib/constants/math/float64-ninf":68,"@stdlib/constants/math/float64-pinf":70,"@stdlib/math/base/assert/is-nan":83,"@stdlib/math/base/special/abs":107,"@stdlib/random/base/randu":221,"tape":323}],96:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var logpdf = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof logpdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `logpdf` functions', function test( t ) {
	t.equal( typeof logpdf.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/chisquare/logpdf/test/test.js")
},{"./../lib":92,"tape":323}],97:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var randu = require( '@stdlib/random/base/randu' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var EPS = require( '@stdlib/constants/math/float64-eps' );
var logpdf = require( './../lib' );


// FIXTURES //

var decimalDecimal = require( './fixtures/julia/decimal_decimal.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof logpdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = logpdf( NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = logpdf( 0.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `Infinity` for `x` and a finite `k`, the function returns `-Infinity`', function test( t ) {
	var y = logpdf( PINF, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );
	t.end();
});

tape( 'if provided `-Infinity` for `x` and a finite `k`, the function returns `-Infinity`', function test( t ) {
	var y = logpdf( NINF, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );
	t.end();
});

tape( 'if provided a negative `k`, the function always returns `NaN`', function test( t ) {
	var y;

	y = logpdf( 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 0.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if `k` equals `0`, the function evaluates a degenerate distribution centered at `0`', function test( t ) {
	var y;

	y = logpdf( 0.0, 0.0 );
	t.equal( y, PINF, 'returns +Infinity for x equal to 0' );

	y = logpdf( 1.0, 0.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpdf( -1.5, 0.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpdf( PINF, 0.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpdf( NINF, 0.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpdf( NaN, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function returns `-Infinity` for all `x < 0`', function test( t ) {
	var x;
	var y;
	var i;

	for ( i = 0; i < 100; i++ ) {
		x = -( randu()*100.0 ) - EPS;
		y = logpdf( x, 1.0 );
		t.equal( y, NINF, 'returns -Infinity for x='+x );
	}
	t.end();
});

tape( 'the function evaluates the logpdf for `x` given degrees of freedom `k`', function test( t ) {
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
		y = logpdf( x[i], k[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+'. k:'+k[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 10.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. k: '+k[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/chisquare/logpdf/test/test.logpdf.js")
},{"./../lib":92,"./fixtures/julia/decimal_decimal.json":94,"@stdlib/constants/math/float64-eps":56,"@stdlib/constants/math/float64-ninf":68,"@stdlib/constants/math/float64-pinf":70,"@stdlib/math/base/assert/is-nan":83,"@stdlib/math/base/special/abs":107,"@stdlib/random/base/randu":221,"tape":323}],98:[function(require,module,exports){
'use strict';

// MODULES //

var constantFunction = require( '@stdlib/utils/constant-function' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );


// MAIN //

/**
* Returns a function for evaluating the natural logarithm of the probability density function (logPDF) of a degenerate distribution centered at a provided mean value.
*
* @param {number} mu - value at which to center the distribution
* @returns {Function} function to evaluate the natural logarithm of the probability density function
*
* @example
* var logpdf = factory( 5.0 );
*
* var y = logpdf( 0.0 );
* // returns -Infinity
*
* y = logpdf( 5.0 );
* // returns Infinity
*/
function factory( mu ) {
	if ( isnan( mu ) ) {
		return constantFunction( NaN );
	}
	return logpdf;

	/**
	* Evaluates the natural logarithm of the probability density function (logPDF) of a degenerate distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} natural logarithm of the probability density function
	*
	* @example
	* var y = logpdf( 10.0 );
	* // returns <number>
	*/
	function logpdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		return ( x === mu ) ? PINF : NINF;
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/constants/math/float64-ninf":68,"@stdlib/constants/math/float64-pinf":70,"@stdlib/math/base/assert/is-nan":83,"@stdlib/utils/constant-function":226}],99:[function(require,module,exports){
'use strict';

/**
* Degenerate distribution logarithm of probability density function (logPDF).
*
* @module @stdlib/math/base/dists/degenerate/logpdf
*
* @example
* var logpdf = require( '@stdlib/math/base/dists/degenerate/logpdf' );
*
* var y = logpdf( 2.0, 0.0 );
* // returns -Infinity
*
* @example
* var factory = require( '@stdlib/math/base/dists/degenerate/logpdf' ).factory;
*
* var logPDF = factory( 10.0 );
*
* var y = logPDF( 10.0 );
* // returns Infinity
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var logpdf = require( './logpdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( logpdf, 'factory', factory );


// EXPORTS //

module.exports = logpdf;

},{"./factory.js":98,"./logpdf.js":100,"@stdlib/utils/define-read-only-property":230}],100:[function(require,module,exports){
'use strict';

// MODULES //

var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );


// MAIN //

/**
* Evaluates the natural logarithm of the probability density function (logPDF) for a degenerate distribution centered at `mu`.
*
* @param {number} x - input value
* @param {number} mu - constant value of the distribution
* @returns {number} natural logarithm of probability density function
*
* @example
* var y = logpdf( 2.0, 3.0 );
* // returns -Infinity
*
* @example
* var y = logpdf( 3.0, 3.0 );
* // returns Infinity
*
* @example
* var y = logpdf( NaN, 0.0 );
* // returns NaN
*
* @example
* var y = logpdf( 0.0, NaN );
* // returns NaN
*/
function logpdf( x, mu ) {
	if ( isnan( x ) || isnan( mu ) ) {
		return NaN;
	}
	return ( x === mu ) ? PINF : NINF;
}


// EXPORTS //

module.exports = logpdf;

},{"@stdlib/constants/math/float64-ninf":68,"@stdlib/constants/math/float64-pinf":70,"@stdlib/math/base/assert/is-nan":83}],101:[function(require,module,exports){
'use strict';

// MODULES //

var constantFunction = require( '@stdlib/utils/constant-function' );
var degenerate = require( '@stdlib/math/base/dists/degenerate/logpdf' ).factory;
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var ln = require( '@stdlib/math/base/special/ln' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var gammaDeriv = require( './gamma_p_derivative.js' );


// MAIN //

/**
* Returns a function for evaluating the logarithm of the probability density function (PDF) for a gamma distribution with shape parameter `alpha` and rate parameter `beta`.
*
* @param {NonNegativeNumber} alpha - shape parameter
* @param {PositiveNumber} beta - rate parameter
* @returns {Function} logPDF
*
* @example
* var logpdf = factory( 3.0, 1.5 );
*
* var y = logpdf( 1.0 );
* // returns ~-0.977
*
* y = logpdf( 4.0 );
* // returns ~-2.704
*/
function factory( alpha, beta ) {
	if (
		isnan( alpha ) ||
		isnan( beta ) ||
		alpha < 0.0 ||
		beta <= 0.0
	) {
		return constantFunction( NaN );
	}
	if ( alpha === 0.0 ) {
		return degenerate( 0.0 );
	}
	return logpdf;

	/**
	* Evaluates the logarithm of the probability density function (PDF) for a gamma distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} evaluated logPDF
	*
	* @example
	* var y = logpdf( -1.2 );
	* // returns <number>
	*/
	function logpdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x < 0.0 || x === PINF ) {
			return NINF;
		}
		return ln( gammaDeriv( alpha, x * beta ) ) + ln( beta );
	}
}


// EXPORTS //

module.exports = factory;

},{"./gamma_p_derivative.js":102,"@stdlib/constants/math/float64-ninf":68,"@stdlib/constants/math/float64-pinf":70,"@stdlib/math/base/assert/is-nan":83,"@stdlib/math/base/dists/degenerate/logpdf":99,"@stdlib/math/base/special/ln":149,"@stdlib/utils/constant-function":226}],102:[function(require,module,exports){
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
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var FLOAT64_MAX = require( '@stdlib/constants/math/float64-max' );
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
}


// EXPORTS //

module.exports = gammaPDerivative;

},{"./regularised_gamma_prefix.js":105,"@stdlib/constants/math/float64-max":65,"@stdlib/constants/math/float64-pinf":70,"@stdlib/math/base/special/exp":116,"@stdlib/math/base/special/gammaln":130,"@stdlib/math/base/special/ln":149}],103:[function(require,module,exports){
'use strict';

/**
* Gamma distribution logarithm of probability density function (PDF).
*
* @module @stdlib/math/base/dists/gamma/logpdf
*
* @example
* var logpdf = require( '@stdlib/math/base/dists/gamma/logpdf' );
*
* var y = logpdf( 2.0, 0.5, 1.0 );
* // returns ~-2.919
*
* @example
* var factory = require( '@stdlib/math/base/dists/gamma/logpdf' ).factory;
*
* var logpdf = factory( 6.0, 7.0 );
* var y = logpdf( 2.0 );
* // returns ~-3.646
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var logpdf = require( './logpdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( logpdf, 'factory', factory );


// EXPORTS //

module.exports = logpdf;

},{"./factory.js":101,"./logpdf.js":104,"@stdlib/utils/define-read-only-property":230}],104:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var ln = require( '@stdlib/math/base/special/ln' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var gammaDeriv = require( './gamma_p_derivative.js' );


// MAIN //

/**
* Evaluates the logarithm of the probability density function (PDF) for a gamma distribution with shape parameter `alpha` and rate parameter `beta` at a value `x`.
*
* @param {number} x - input value
* @param {NonNegativeNumber} alpha - shape parameter
* @param {PositiveNumber} beta - rate parameter
* @returns {number} evaluated logPDF
*
* @example
* var y = logpdf( 2.0, 0.5, 1.0 );
* // returns ~-2.919
*
* @example
* var y = logpdf( 0.1, 1.0, 1.0 );
* // returns ~-0.1
*
* @example
* var y = logpdf( -1.0, 4.0, 2.0 );
* // returns -Infinity
*
* @example
* var y = logpdf( NaN, 0.6, 1.0 );
* // returns NaN
*
* @example
* var y = logpdf( 0.0, NaN, 1.0 );
* // returns NaN
*
* @example
* var y = logpdf( 0.0, 1.0, NaN );
* // returns NaN
*
* @example
* // Negative shape parameter:
* var y = logpdf( 2.0, -1.0, 1.0 );
* // returns NaN
*
* @example
* // Negative rate parameter:
* var y = logpdf( 2.0, 1.0, -1.0 );
* // returns NaN
*/
function logpdf( x, alpha, beta ) {
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
		return NINF;
	}
	if ( alpha === 0.0 ) {
		// Point mass at 0...
		return x === 0.0 ? PINF : NINF;
	}
	return ln( gammaDeriv( alpha, x * beta ) ) + ln( beta );
}


// EXPORTS //

module.exports = logpdf;

},{"./gamma_p_derivative.js":102,"@stdlib/constants/math/float64-ninf":68,"@stdlib/constants/math/float64-pinf":70,"@stdlib/math/base/assert/is-nan":83,"@stdlib/math/base/special/ln":149}],105:[function(require,module,exports){
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
var MAX_LN = require( '@stdlib/constants/math/float64-max-ln' );
var MIN_LN = require( '@stdlib/constants/math/float64-min-ln' );
var G = require( '@stdlib/constants/math/float64-gamma-lanczos-g' );
var E = require( '@stdlib/constants/math/float64-e' );


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
}


// EXPORTS //

module.exports = regularisedGammaPrefix;

},{"@stdlib/constants/math/float64-e":55,"@stdlib/constants/math/float64-gamma-lanczos-g":59,"@stdlib/constants/math/float64-max-ln":64,"@stdlib/constants/math/float64-min-ln":67,"@stdlib/math/base/special/abs":107,"@stdlib/math/base/special/exp":116,"@stdlib/math/base/special/gamma":124,"@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled":121,"@stdlib/math/base/special/gammaln":130,"@stdlib/math/base/special/ln":149,"@stdlib/math/base/special/log1p":153,"@stdlib/math/base/special/max":156,"@stdlib/math/base/special/min":158,"@stdlib/math/base/special/pow":160,"@stdlib/math/base/special/sqrt":181}],106:[function(require,module,exports){
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

},{}],107:[function(require,module,exports){
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

},{"./abs.js":106}],108:[function(require,module,exports){
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

},{}],109:[function(require,module,exports){
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

},{"./ceil.js":108}],110:[function(require,module,exports){
'use strict';

// MODULES //

var toWords = require( '@stdlib/number/float64/base/to-words' );
var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var fromWords = require( '@stdlib/number/float64/base/from-words' );


// VARIABLES //

// 10000000000000000000000000000000 => 2147483648 => 0x80000000
var SIGN_MASK = 0x80000000>>>0; // asm type annotation

// 01111111111111111111111111111111 => 2147483647 => 0x7fffffff
var MAGNITUDE_MASK = 0x7fffffff|0; // asm type annotation

// High/low words workspace:
var WORDS = [ 0, 0 ]; // WARNING: not thread safe


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
	toWords( WORDS, x );
	hx = WORDS[ 0 ];

	// Turn off the sign bit of `x`:
	hx &= MAGNITUDE_MASK;

	// Extract the higher order word from `y`:
	hy = getHighWord( y );

	// Leave only the sign bit of `y` turned on:
	hy &= SIGN_MASK;

	// Copy the sign bit of `y` to `x`:
	hx |= hy;

	// Return a new value having the same magnitude as `x`, but with the sign of `y`:
	return fromWords( hx, WORDS[ 1 ] );
}


// EXPORTS //

module.exports = copysign;

},{"@stdlib/number/float64/base/from-words":186,"@stdlib/number/float64/base/get-high-word":190,"@stdlib/number/float64/base/to-words":204}],111:[function(require,module,exports){
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

},{"./copysign.js":110}],112:[function(require,module,exports){
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

var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var kernelCos = require( '@stdlib/math/base/special/kernel-cos' );
var kernelSin = require( '@stdlib/math/base/special/kernel-sin' );
var rempio2 = require( '@stdlib/math/base/special/rempio2' );


// VARIABLES //

// Scratch array for storing temporary values. Note that, in C, this would not be thread safe.
var buffer = new Array( 2 );

// High word absolute value mask: 0x7fffffff => 01111111111111111111111111111111
var HIGH_WORD_ABS_MASK = 0x7fffffff|0; // asm type annotation

// High word of π/4: 0x3fe921fb => 00111111111010010010000111111011
var HIGH_WORD_PIO4 = 0x3fe921fb|0; // asm type annotation

// High word of 2^-27: 0x3e400000 => 00111110010000000000000000000000
var HIGH_WORD_TWO_NEG_27 = 0x3e400000|0; // asm type annotation

// High word exponent mask: 0x7ff00000 => 01111111111100000000000000000000
var HIGH_WORD_EXPONENT_MASK = 0x7ff00000|0; // asm type annotation


// MAIN //

/**
* Computes the cosine of a number.
*
* @param {number} x - input value (in radians)
* @returns {number} cosine
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

	ix = getHighWord( x );
	ix &= HIGH_WORD_ABS_MASK;

	// Case: |x| ~< pi/4
	if ( ix <= HIGH_WORD_PIO4 ) {
		// Case: x < 2**-27
		if ( ix < HIGH_WORD_TWO_NEG_27 ) {
			return 1.0;
		}
		return kernelCos( x, 0.0 );
	}
	// Case: cos(Inf or NaN) is NaN */
	if ( ix >= HIGH_WORD_EXPONENT_MASK ) {
		return NaN;
	}
	// Case: Argument reduction needed...
	n = rempio2( x, buffer );
	switch ( n & 3 ) {
	case 0:
		return kernelCos( buffer[ 0 ], buffer[ 1 ] );
	case 1:
		return -kernelSin( buffer[ 0 ], buffer[ 1 ] );
	case 2:
		return -kernelCos( buffer[ 0 ], buffer[ 1 ] );
	default:
		return kernelSin( buffer[ 0 ], buffer[ 1 ] );
	}
}


// EXPORTS //

module.exports = cos;

},{"@stdlib/math/base/special/kernel-cos":141,"@stdlib/math/base/special/kernel-sin":145,"@stdlib/math/base/special/rempio2":171,"@stdlib/number/float64/base/get-high-word":190}],113:[function(require,module,exports){
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

},{"./cos.js":112}],114:[function(require,module,exports){
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
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
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
* ## Method
*
* 1.  We reduce \\( x \\) to an \\( r \\) so that \\( |r| \leq 0.5 \cdot \ln(2) \approx 0.34658 \\). Given \\( x \\), we find an \\( r \\) and integer \\( k \\) such that
*
*    ```tex
*    \begin{align*}
*    x &= k \cdot \ln(2) + r \\
*    |r| &\leq 0.5 \cdot \ln(2)
*    \end{align*}
*    ```
*
*    <!-- <note> -->
*
*    \\( r \\) can be represented as \\( r = \mathrm{hi} - \mathrm{lo} \\) for better accuracy.
*
*    <!-- </note> -->
*
* 2.  We approximate of \\( e^{r} \\) by a special rational function on the interval \\([0,0.34658]\\):
*
*    ```tex
*    \begin{align*}
*    R\left(r^2\right) &= r \cdot \frac{ e^{r}+1 }{ e^{r}-1 } \\
*    &= 2 + \frac{r^2}{6} - \frac{r^4}{360} + \ldots
*    \end{align*}
*    ```
*
*    We use a special Remes algorithm on \\([0,0.34658]\\) to generate a polynomial of degree \\(5\\) to approximate \\(R\\). The maximum error of this polynomial approximation is bounded by \\(2^{-59}\\). In other words,
*
*    ```tex
*    R(z) \sim 2 + P_1 z + P_2 z^2 + P_3 z^3 + P_4 z^4 + P_5 z^5
*    ```
*
*    where \\( z = r^2 \\) and
*
*    ```tex
*    \left|  2 + P_1 z + \ldots + P_5 z^5  - R(z) \right| \leq 2^{-59}
*    ```
*
*    <!-- <note> -->
*
*    The values of \\( P_1 \\) to \\( P_5 \\) are listed in the source code.
*
*    <!-- </note> -->
*
*    The computation of \\( e^{r} \\) thus becomes
*
*    ```tex
*    \begin{align*}
*    e^{r} &= 1 + \frac{2r}{R-r} \\
*          &= 1 + r + \frac{r \cdot R_1(r)}{2 - R_1(r)}\ \text{for better accuracy}
*    \end{align*}
*    ```
*
*    where
*
*    ```tex
*    R_1(r) = r - P_1\ r^2 + P_2\ r^4 + \ldots + P_5\ r^{10}
*    ```
*
* 3.  We scale back to obtain \\( e^{x} \\). From step 1, we have
*
*    ```tex
*    e^{x} = 2^k e^{r}
*    ```
*
*
* ## Special Cases
*
* ```tex
* \begin{align*}
* e^\infty &= \infty \\
* e^{-\infty} &= 0 \\
* e^{\mathrm{NaN}} &= \mathrm{NaN} \\
* e^0 &= 1\ \mathrm{is\ exact\ for\ finite\ argument\ only}
* \end{align*}
* ```
*
* ## Notes
*
* -   According to an error analysis, the error is always less than \\(1\\) ulp (unit in the last place).
*
* -   For an IEEE double,
*
*     -   if \\(x > 7.09782712893383973096\mbox{e+}02\\), then \\(e^{x}\\) overflows
*     -   if \\(x < -7.45133219101941108420\mbox{e+}02\\), then \\(e^{x}\\) underflows
*
* -   The hexadecimal values included in the source code are the intended ones for the used constants. Decimal values may be used, provided that the compiler will convert from decimal to binary accurately enough to produce the intended hexadecimal values.
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
}


// EXPORTS //

module.exports = exp;

},{"./expmulti.js":115,"@stdlib/constants/math/float64-ninf":68,"@stdlib/constants/math/float64-pinf":70,"@stdlib/math/base/assert/is-nan":83,"@stdlib/math/base/special/trunc":182}],115:[function(require,module,exports){
'use strict';

// MODULES //

var ldexp = require( '@stdlib/math/base/special/ldexp' );
var polyvalP = require( './polyval_p.js' );


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
	c = r - ( t*polyvalP( t ) );
	y = 1.0 - ( lo - ( (r*c)/(2.0-c) ) - hi);

	return ldexp( y, k );
}


// EXPORTS //

module.exports = expmulti;

},{"./polyval_p.js":117,"@stdlib/math/base/special/ldexp":147}],116:[function(require,module,exports){
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

},{"./exp.js":114}],117:[function(require,module,exports){
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
		return 0.16666666666666602;
	}
	return 0.16666666666666602 + (x * (-0.0027777777777015593 + (x * (0.00006613756321437934 + (x * (-0.0000016533902205465252 + (x * 4.1381367970572385e-8))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],118:[function(require,module,exports){
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

},{}],119:[function(require,module,exports){
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

},{"./floor.js":118}],120:[function(require,module,exports){
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
* // returns Infinity
*
* @example
* var v = gammaLanczosSumExpGScaled( NaN );
* // returns NaN
*/
var gammaLanczosSumExpGScaled = require( './rational_pq.js' );


// EXPORTS //

module.exports = gammaLanczosSumExpGScaled;

},{"./rational_pq.js":122}],121:[function(require,module,exports){
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
* // returns Infinity
*
* v = gammaLanczosSumExpGScaled( NaN );
* // returns NaN
*/

// MODULES //

var gammaLanczosSumExpGScaled = require( './gamma_lanczos_sum_expg_scaled.js' );


// EXPORTS //

module.exports = gammaLanczosSumExpGScaled;

},{"./gamma_lanczos_sum_expg_scaled.js":120}],122:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a rational function, i.e., the ratio of two polynomials described by the coefficients stored in \\(P\\) and \\(Q\\).
*
* ## Notes
*
* -   Coefficients should be sorted in ascending degree.
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the rational function
* @returns {number} evaluated rational function
*/
function evalrational( x ) {
	var ax;
	var s1;
	var s2;
	if ( x === 0.0 ) {
		return Infinity;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = 709811.662581658 + (x * (679979.8474157227 + (x * (293136.7857211597 + (x * (74887.54032914672 + (x * (12555.290582413863 + (x * (1443.4299244417066 + (x * (115.24194596137347 + (x * (6.309239205732627 + (x * (0.22668404630224365 + (x * (0.004826466289237662 + (x * 0.00004624429436045379))))))))))))))))))); // eslint-disable-line max-len
		s2 = 0.0 + (x * (362880.0 + (x * (1026576.0 + (x * (1172700.0 + (x * (723680.0 + (x * (269325.0 + (x * (63273.0 + (x * (9450.0 + (x * (870.0 + (x * (45.0 + (x * 1.0))))))))))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 0.00004624429436045379 + (x * (0.004826466289237662 + (x * (0.22668404630224365 + (x * (6.309239205732627 + (x * (115.24194596137347 + (x * (1443.4299244417066 + (x * (12555.290582413863 + (x * (74887.54032914672 + (x * (293136.7857211597 + (x * (679979.8474157227 + (x * 709811.662581658))))))))))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (45.0 + (x * (870.0 + (x * (9450.0 + (x * (63273.0 + (x * (269325.0 + (x * (723680.0 + (x * (1172700.0 + (x * (1026576.0 + (x * (362880.0 + (x * 0.0))))))))))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

},{}],123:[function(require,module,exports){
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
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var PI = require( '@stdlib/constants/math/float64-pi' );
var stirlingApprox = require( './stirling_approximation.js' );
var smallApprox = require( './small_approximation.js' );
var rateval = require( './rational_pq.js' );


// MAIN //

/**
* Evaluates the gamma function.
*
* ## Method
*
* 1.  Arguments \\(|x| \leq 34\\) are reduced by recurrence and the function approximated by a rational function of degree \\(6/7\\) in the interval \\((2,3)\\).
* 2.  Large negative arguments are made positive using a reflection formula.
* 3.  Large arguments are handled by Stirling's formula.
*
*
* ## Notes
*
* -   Relative error:
*
*     | arithmetic | domain    | # trials | peak    | rms     |
*     |:----------:|:---------:|:--------:|:-------:|:-------:|
*     | DEC        | -34,34    | 10000    | 1.3e-16 | 2.5e-17 |
*     | IEEE       | -170,-33  | 20000    | 2.3e-15 | 3.3e-16 |
*     | IEEE       | -33, 33   | 20000    | 9.4e-16 | 2.2e-16 |
*     | IEEE       | 33, 171.6 | 20000    | 2.3e-15 | 3.2e-16 |
*
* -   Error for arguments outside the test range will be larger owing to error amplification by the exponential function.
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
* // returns Infinity
*
* @example
* var v = gamma( -0.0 );
* // returns -Infinity
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
}


// EXPORTS //

module.exports = gamma;

},{"./rational_pq.js":126,"./small_approximation.js":127,"./stirling_approximation.js":128,"@stdlib/constants/math/float64-ninf":68,"@stdlib/constants/math/float64-pi":69,"@stdlib/constants/math/float64-pinf":70,"@stdlib/math/base/assert/is-integer":81,"@stdlib/math/base/assert/is-nan":83,"@stdlib/math/base/assert/is-negative-zero":85,"@stdlib/math/base/special/abs":107,"@stdlib/math/base/special/floor":119,"@stdlib/math/base/special/sin":177}],124:[function(require,module,exports){
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
* // returns Infinity
*
* v = gamma( -0.0 );
* // returns -Infinity
*
* v = gamma( NaN );
* // returns NaN
*/

// MODULES //

var gamma = require( './gamma.js' );


// EXPORTS //

module.exports = gamma;

},{"./gamma.js":123}],125:[function(require,module,exports){
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
		return 0.08333333333334822;
	}
	return 0.08333333333334822 + (x * (0.0034722222160545866 + (x * (-0.0026813261780578124 + (x * (-0.00022954996161337813 + (x * 0.0007873113957930937))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],126:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a rational function, i.e., the ratio of two polynomials described by the coefficients stored in \\(P\\) and \\(Q\\).
*
* ## Notes
*
* -   Coefficients should be sorted in ascending degree.
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the rational function
* @returns {number} evaluated rational function
*/
function evalrational( x ) {
	var ax;
	var s1;
	var s2;
	if ( x === 0.0 ) {
		return 1.0;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = 1.0 + (x * (0.4942148268014971 + (x * (0.20744822764843598 + (x * (0.04763678004571372 + (x * (0.010421379756176158 + (x * (0.0011913514700658638 + (x * (0.00016011952247675185 + (x * 0.0))))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (0.0714304917030273 + (x * (-0.23459179571824335 + (x * (0.035823639860549865 + (x * (0.011813978522206043 + (x * (-0.004456419138517973 + (x * (0.0005396055804933034 + (x * -0.000023158187332412014))))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 0.0 + (x * (0.00016011952247675185 + (x * (0.0011913514700658638 + (x * (0.010421379756176158 + (x * (0.04763678004571372 + (x * (0.20744822764843598 + (x * (0.4942148268014971 + (x * 1.0))))))))))))); // eslint-disable-line max-len
		s2 = -0.000023158187332412014 + (x * (0.0005396055804933034 + (x * (-0.004456419138517973 + (x * (0.011813978522206043 + (x * (0.035823639860549865 + (x * (-0.23459179571824335 + (x * (0.0714304917030273 + (x * 1.0))))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

},{}],127:[function(require,module,exports){
'use strict';

// MODULES //

var EULER = require( '@stdlib/constants/math/float64-eulergamma' );


// MAIN //

/**
* Evaluates the gamma function using a small-value approximation.
*
* @private
* @param {number} x - input value
* @param {number} z - scale factor
* @returns {number} function value
*/
function gamma( x, z ) {
	return z / ( ( 1.0 + ( EULER*x ) ) * x );
}


// EXPORTS //

module.exports = gamma;

},{"@stdlib/constants/math/float64-eulergamma":57}],128:[function(require,module,exports){
'use strict';

// MODULES //

var SQRT_TWO_PI = require( '@stdlib/constants/math/float64-sqrt-two-pi' );
var pow = require( '@stdlib/math/base/special/pow' );
var exp = require( '@stdlib/math/base/special/exp' );
var polyval = require( './polyval_s.js' );


// VARIABLES //

var MAX_STIRLING = 143.01608;


// MAIN //

/**
* Evaluates the gamma function using Stirling's formula. The polynomial is valid for \\(33 \leq x \leq 172\\).
*
* @private
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
}


// EXPORTS //

module.exports = gamma;

},{"./polyval_s.js":125,"@stdlib/constants/math/float64-sqrt-two-pi":72,"@stdlib/math/base/special/exp":116,"@stdlib/math/base/special/pow":160}],129:[function(require,module,exports){
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
var PI = require( '@stdlib/constants/math/float64-pi' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var polyvalA1 = require( './polyval_a1.js' );
var polyvalA2 = require( './polyval_a2.js' );
var polyvalR = require( './polyval_r.js' );
var polyvalS = require( './polyval_s.js' );
var polyvalT1 = require( './polyval_t1.js' );
var polyvalT2 = require( './polyval_t2.js' );
var polyvalT3 = require( './polyval_t3.js' );
var polyvalU = require( './polyval_u.js' );
var polyvalV = require( './polyval_v.js' );
var polyvalW = require( './polyval_w.js' );


// VARIABLES //

var A1C = 7.72156649015328655494e-02; // 0x3FB3C467E37DB0C8
var A2C = 3.22467033424113591611e-01; // 0x3FD4A34CC4A60FAD
var RC = 1.0;
var SC = -7.72156649015328655494e-02; // 0xBFB3C467E37DB0C8
var T1C = 4.83836122723810047042e-01; // 0x3FDEF72BC8EE38A2
var T2C = -1.47587722994593911752e-01; // 0xBFC2E4278DC6C509
var T3C = 6.46249402391333854778e-02; // 0x3FB08B4294D5419B
var UC = -7.72156649015328655494e-02; // 0xBFB3C467E37DB0C8
var VC = 1.0;
var WC = 4.18938533204672725052e-01; // 0x3FDACFE390C97D69
var YMIN = 1.461632144968362245;
var TWO52 = 4503599627370496; // 2**52
var TWO58 = 288230376151711744; // 2**58
var TINY = 8.470329472543003e-22;
var TC = 1.46163214496836224576e+00; // 0x3FF762D86356BE3F
var TF = -1.21486290535849611461e-01; // 0xBFBF19B9BCC38A42
var TT = -3.63867699703950536541e-18; // 0xBC50C7CAA48A971F => TT = -(tail of TF)


// MAIN //

/**
* Evaluates the natural logarithm of the gamma function.
*
* ## Method
*
* 1.  Argument reduction for \\(0 < x \leq 8\\). Since \\(\Gamma(1+s) = s \Gamma(s)\\), for \\(x \in [0,8]\\), we may reduce \\(x\\) to a number in \\([1.5,2.5]\\) by
*
*     ```tex
*     \operatorname{lgamma}(1+s) = \ln(s) + \operatorname{lgamma}(s)
*     ```
*
*     For example,
*
*     ```tex
*     \begin{align}
*     \operatorname{lgamma}(7.3) &= \ln(6.3) + \operatorname{lgamma}(6.3) \\
*     &= \ln(6.3 \cdot 5.3) + \operatorname{lgamma}(5.3) \\
*     &= \ln(6.3 \cdot 5.3 \cdot 4.3 \cdot 3.3 \cdot2.3) + \operatorname{lgamma}(2.3)
*     \end{align}
*     ```
*
* 2.  Compute a polynomial approximation of \\(\mathrm{lgamma}\\) around its
minimum (\\(\mathrm{ymin} = 1.461632144968362245\\)) to maintain monotonicity. On the interval \\([\mathrm{ymin} - 0.23, \mathrm{ymin} + 0.27]\\) (i.e., \\([1.23164,1.73163]\\)), we let \\(z = x - \mathrm{ymin}\\) and use
*
*     ```tex
*     \operatorname{lgamma}(x) = -1.214862905358496078218 + z^2 \cdot \operatorname{poly}(z)
*     ```
*
*     where \\(\operatorname{poly}(z)\\) is a \\(14\\) degree polynomial.
*
* 3.  Compute a rational approximation in the primary interval \\([2,3]\\). Let \\( s = x - 2.0 \\). We can thus use the approximation
*
*     ```tex
*     \operatorname{lgamma}(x) = \frac{s}{2} + s\frac{\operatorname{P}(s)}{\operatorname{Q}(s)}
*     ```
*
*     with accuracy
*
*     ```tex
*     \biggl|\frac{\mathrm{P}}{\mathrm{Q}} - \biggr(\operatorname{lgamma}(x)-\frac{s}{2}\biggl)\biggl| < 2^{-61.71}
*     ```
*
*     The algorithms are based on the observation
*
*     ```tex
*     \operatorname{lgamma}(2+s) = s(1 - \gamma) + \frac{\zeta(2) - 1}{2} s^2 - \frac{\zeta(3) - 1}{3} s^3 + \ldots
*     ```
*
*     where \\(\zeta\\) is the zeta function and \\(\gamma = 0.5772156649...\\) is the Euler-Mascheroni constant, which is very close to \\(0.5\\).
*
* 3.  For \\(x \geq 8\\),
*
*     ```tex
*     \operatorname{lgamma}(x) \approx \biggl(x-\frac{1}{2}\biggr) \ln(x) - x + \frac{\ln(2\pi)}{2} + \frac{1}{12x} - \frac{1}{360x^3} + \ldots
*     ```
*
*     which can be expressed
*
*     ```tex
*     \operatorname{lgamma}(x) \approx \biggl(x-\frac{1}{2}\biggr)(\ln(x)-1)-\frac{\ln(2\pi)-1}{2} + \ldots
*     ```
*
*     Let \\(z = \frac{1}{x}\\). We can then use the approximation
*
*     ```tex
*     f(z) = \operatorname{lgamma}(x) - \biggl(x-\frac{1}{2}\biggr)(\ln(x)-1)
*     ```
*
*     by
*
*     ```tex
*     w = w_0 + w_1 z + w_2 z^3 + w_3 z^5 + \ldots + w_6 z^{11}
*     ```

*     where
*
*     ```tex
*     |w - f(z)| < 2^{-58.74}
*     ```
*
* 4.  For negative \\(x\\), since
*
*     ```tex
*     -x \Gamma(-x) \Gamma(x) = \frac{\pi}{\sin(\pi x)}
*     ```
*
*     where \\(\Gamma\\) is the gamma function, we have
*
*     ```tex
*     \Gamma(x) = \frac{\pi}{\sin(\pi x)(-x)\Gamma(-x)}
*     ```
*
*     Since \\(\Gamma(-x)\\) is positive,
*
*     ```tex
*     \operatorname{sign}(\Gamma(x)) = \operatorname{sign}(\sin(\pi x))
*     ```
*
*     for \\(x < 0\\). Hence, for \\(x < 0\\),
*
*     ```tex
*     \mathrm{signgam} = \operatorname{sign}(\sin(\pi x))
*     ```
*
*     and
*
*     ```tex
*     \begin{align}
*     \operatorname{lgamma}(x) &= \ln(|\Gamma(x)|) \\
*     &= \ln\biggl(\frac{\pi}{|x \sin(\pi x)|}\biggr) - \operatorname{lgamma}(-x)
*     \end{align}
*     ```
*
*     <!-- <note> -->
*
*     Note that one should avoid computing \\(\pi (-x)\\) directly in the computation of \\(\sin(\pi (-x))\\).
*
*     <!-- </note> -->
*
*
* ## Special Cases
*
* ```tex
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
* // returns Infinity
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
}


// EXPORTS //

module.exports = gammaln;

},{"./polyval_a1.js":131,"./polyval_a2.js":132,"./polyval_r.js":133,"./polyval_s.js":134,"./polyval_t1.js":135,"./polyval_t2.js":136,"./polyval_t3.js":137,"./polyval_u.js":138,"./polyval_v.js":139,"./polyval_w.js":140,"@stdlib/constants/math/float64-pi":69,"@stdlib/constants/math/float64-pinf":70,"@stdlib/math/base/assert/is-infinite":79,"@stdlib/math/base/assert/is-nan":83,"@stdlib/math/base/special/abs":107,"@stdlib/math/base/special/ln":149,"@stdlib/math/base/special/sinpi":179,"@stdlib/math/base/special/trunc":182}],130:[function(require,module,exports){
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
* // returns Infinity
*
* v = gammaln( NaN );
* // returns NaN
*/

// MODULES //

var gammaln = require( './gammaln.js' );


// EXPORTS //

module.exports = gammaln;

},{"./gammaln.js":129}],131:[function(require,module,exports){
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
		return 0.06735230105312927;
	}
	return 0.06735230105312927 + (x * (0.007385550860814029 + (x * (0.0011927076318336207 + (x * (0.00022086279071390839 + (x * 0.000025214456545125733))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],132:[function(require,module,exports){
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
		return 0.020580808432516733;
	}
	return 0.020580808432516733 + (x * (0.0028905138367341563 + (x * (0.0005100697921535113 + (x * (0.00010801156724758394 + (x * 0.000044864094961891516))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],133:[function(require,module,exports){
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
		return 1.3920053346762105;
	}
	return 1.3920053346762105 + (x * (0.7219355475671381 + (x * (0.17193386563280308 + (x * (0.01864591917156529 + (x * (0.0007779424963818936 + (x * 0.000007326684307446256))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],134:[function(require,module,exports){
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
		return 0.21498241596060885;
	}
	return 0.21498241596060885 + (x * (0.325778796408931 + (x * (0.14635047265246445 + (x * (0.02664227030336386 + (x * (0.0018402845140733772 + (x * 0.00003194753265841009))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],135:[function(require,module,exports){
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
		return -0.032788541075985965;
	}
	return -0.032788541075985965 + (x * (0.006100538702462913 + (x * (-0.0014034646998923284 + (x * 0.00031563207090362595))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],136:[function(require,module,exports){
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
		return 0.01797067508118204;
	}
	return 0.01797067508118204 + (x * (-0.0036845201678113826 + (x * (0.000881081882437654 + (x * -0.00031275416837512086))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],137:[function(require,module,exports){
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
		return -0.010314224129834144;
	}
	return -0.010314224129834144 + (x * (0.0022596478090061247 + (x * (-0.0005385953053567405 + (x * 0.0003355291926355191))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],138:[function(require,module,exports){
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
		return 0.6328270640250934;
	}
	return 0.6328270640250934 + (x * (1.4549225013723477 + (x * (0.9777175279633727 + (x * (0.22896372806469245 + (x * 0.013381091853678766))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],139:[function(require,module,exports){
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
		return 2.4559779371304113;
	}
	return 2.4559779371304113 + (x * (2.128489763798934 + (x * (0.7692851504566728 + (x * (0.10422264559336913 + (x * 0.003217092422824239))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],140:[function(require,module,exports){
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
		return 0.08333333333333297;
	}
	return 0.08333333333333297 + (x * (-0.0027777777772877554 + (x * (0.0007936505586430196 + (x * (-0.00059518755745034 + (x * (0.0008363399189962821 + (x * -0.0016309293409657527))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],141:[function(require,module,exports){
'use strict';

/**
* Compute the cosine of a number on `[-π/4, π/4]`.
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

},{"./kernel_cos.js":142}],142:[function(require,module,exports){
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

var polyval13 = require( './polyval_c13.js' );
var polyval46 = require( './polyval_c46.js' );


// MAIN //

/**
* Computes the cosine on \\( [-\pi/4, \pi/4] \\), where \\( \pi/4 \approx 0.785398164 \\).
*
* ## Method
*
* -   Since \\( \cos(-x) = \cos(x) \\), we need only to consider positive \\(x\\).
*
* -   If \\( x < 2^{-27} \\), return \\(1\\) which is inexact if \\( x \ne 0 \\).
*
* -   \\( cos(x) \\) is approximated by a polynomial of degree \\(14\\) on \\( [0,\pi/4] \\).
*
*     ```tex
*     \cos(x) \approx 1 - \frac{x \cdot x}{2} + C_1 \cdot x^4 + \ldots + C_6 \cdot x^{14}
*     ```
*
*     where the Remez error is
*
*     ```tex
*     \left| \cos(x) - \left( 1 - \frac{x^2}{2} + C_1x^4 + C_2x^6 + C_3x^8 + C_4x^{10} + C_5x^{12} + C_6x^{15} \right) \right| \le 2^{-58}
*     ```
*
* -   Let \\( C_1x^4 + C_2x^6 + C_3x^8 + C_4x^{10} + C_5x^{12} + C_6x^{14} \\), then
*
*     ```tex
*     \cos(x) \approx 1 - \frac{x \cdot x}{2} + r
*     ```
*
*     Since
*
*     ```tex
*     \cos(x+y) \approx \cos(x) - \sin(x) \cdot y \approx \cos(x) - x \cdot y
*     ```

*     a correction term is necessary in \\( \cos(x) \\). Hence,
*
*     ```tex
*     \cos(x+y) = 1 - \left( \frac{x \cdot x}{2} - (r - x \cdot y) \right)
*     ```
*
*     For better accuracy, rearrange to
*
*     ```tex
*     \cos(x+y) \approx w + \left( t + ( r - x \cdot y ) \right)
*     ```
*
*     where \\( w = 1 - \frac{x \cdot x}{2} \\) and \\( t \\) is a tiny correction term (\\( 1 - \frac{x \cdot x}{2} = w + t \\) exactly in infinite precision). The exactness of \\(w + t\\) in infinite precision depends on \\(w\\) and \\(t\\) having the same precision as \\(x\\).
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
}


// EXPORTS //

module.exports = kernelCos;

},{"./polyval_c13.js":143,"./polyval_c46.js":144}],143:[function(require,module,exports){
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
		return 0.0416666666666666;
	}
	return 0.0416666666666666 + (x * (-0.001388888888887411 + (x * 0.00002480158728947673))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],144:[function(require,module,exports){
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
		return -2.7557314351390663e-7;
	}
	return -2.7557314351390663e-7 + (x * (2.087572321298175e-9 + (x * -1.1359647557788195e-11))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],145:[function(require,module,exports){
'use strict';

/**
* Compute the sine of a number on `[-π/4, π/4]`.
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

},{"./kernel_sin.js":146}],146:[function(require,module,exports){
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
* -   Since \\( \sin(-x) = -\sin(x) \\), we need only to consider positive \\(x\\).
*
* -   Callers must return \\( \sin(-0) = -0 \\) without calling here since our odd polynomial is not evaluated in a way that preserves \\(-0\\). Callers may do the optimization \\( \sin(x) \approx x \\) for tiny \\(x\\).
*
* -   \\( \sin(x) \\) is approximated by a polynomial of degree \\(13\\) on \\( \left[0,\tfrac{pi}{4}\right] \\)
*
*     ```tex
*     \sin(x) \approx x + S_1 \cdot x^3 + \ldots + S_6 \cdot x^{13}
*     ```
*
*     where
*
*     ```tex
*     \left| \frac{\sin(x)}{x} \left( 1 + S_1 \cdot x + S_2 \cdot x + S_3 \cdot x + S_4 \cdot x + S_5 \cdot x + S_6 \cdot x \right) \right| \le 2^{-58}
*     ```
*
* -   We have
*
*     ```tex
*     \sin(x+y) = \sin(x) + \sin'(x') \cdot y \approx \sin(x) + (1-x*x/2) \cdot y
*     ```
*
*     For better accuracy, let
*
*     ```tex
*     r = x^3 * \left( S_2 + x^2 \cdot \left( S_3 + x^2 * \left( S_4 + x^2 \cdot ( S_5+x^2 \cdot S_6 ) \right) \right) \right)
*     ```
*
*     then
*
*     ```tex
*     \sin(x) = x + \left( S_1 \cdot x + ( x \cdot (r-y/2) + y ) \right)
*     ```
*
*
* @param {number} x - input value (in radians, assumed to be bounded by `~pi/4` in magnitude)
* @param {number} y - tail of `x`
* @returns {number} sine
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
	if ( y === 0.0 ) {
		return x + (v * (S1 + (z*r)));
	}
	return x - (((z*((0.5*y) - (v*r))) - y) - (v*S1));
}


// EXPORTS //

module.exports = kernelSin;

},{}],147:[function(require,module,exports){
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
* x = ldexp( Infinity, 11 );
* // returns Infinity
*
* x = ldexp( -Infinity, -118 );
* // returns -Infinity
*/

// MODULES //

var ldexp = require( './ldexp.js' );


// EXPORTS //

module.exports = ldexp;

},{"./ldexp.js":148}],148:[function(require,module,exports){
'use strict';

// NOTES //

/*
* => ldexp: load exponent (see [The Open Group]{@link http://pubs.opengroup.org/onlinepubs/9699919799/functions/ldexp.html} and [cppreference]{@link http://en.cppreference.com/w/c/numeric/math/ldexp}).
*/


// MODULES //

var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var BIAS = require( '@stdlib/constants/math/float64-exponent-bias' );
var MAX_EXPONENT = require( '@stdlib/constants/math/float64-max-base2-exponent' );
var MAX_SUBNORMAL_EXPONENT = require( '@stdlib/constants/math/float64-max-base2-exponent-subnormal' );
var MIN_SUBNORMAL_EXPONENT = require( '@stdlib/constants/math/float64-min-base2-exponent-subnormal' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
var copysign = require( '@stdlib/math/base/special/copysign' );
var normalize = require( '@stdlib/number/float64/base/normalize' );
var floatExp = require( '@stdlib/number/float64/base/exponent' );
var toWords = require( '@stdlib/number/float64/base/to-words' );
var fromWords = require( '@stdlib/number/float64/base/from-words' );


// VARIABLES //

// 1/(1<<52) = 1/(2**52) = 1/4503599627370496
var TWO52_INV = 2.220446049250313e-16;

// Exponent all 0s: 1 00000000000 11111111111111111111 => 2148532223
var CLEAR_EXP_MASK = 0x800fffff>>>0; // asm type annotation

// Normalization workspace:
var FRAC = [ 0.0, 0.0 ]; // WARNING: not thread safe

// High/low words workspace:
var WORDS = [ 0, 0 ]; // WARNING: not thread safe


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
* var x = ldexp( Infinity, 11 );
* // returns Infinity
*
* @example
* var x = ldexp( -Infinity, -118 );
* // returns -Infinity
*/
function ldexp( frac, exp ) {
	var high;
	var m;
	if (
		frac === 0.0 || // handles +-0
		isnan( frac ) ||
		isInfinite( frac )
	) {
		return frac;
	}
	// Normalize the input fraction:
	normalize( FRAC, frac );
	frac = FRAC[ 0 ];
	exp += FRAC[ 1 ];

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
	toWords( WORDS, frac );
	high = WORDS[ 0 ];

	// Clear the exponent bits within the higher order word:
	high &= CLEAR_EXP_MASK;

	// Set the exponent bits to the new exponent:
	high |= ((exp+BIAS) << 20);

	// Create a new floating-point number:
	return m * fromWords( high, WORDS[ 1 ] );
}


// EXPORTS //

module.exports = ldexp;

},{"@stdlib/constants/math/float64-exponent-bias":58,"@stdlib/constants/math/float64-max-base2-exponent":63,"@stdlib/constants/math/float64-max-base2-exponent-subnormal":62,"@stdlib/constants/math/float64-min-base2-exponent-subnormal":66,"@stdlib/constants/math/float64-ninf":68,"@stdlib/constants/math/float64-pinf":70,"@stdlib/math/base/assert/is-infinite":79,"@stdlib/math/base/assert/is-nan":83,"@stdlib/math/base/special/copysign":111,"@stdlib/number/float64/base/exponent":184,"@stdlib/number/float64/base/from-words":186,"@stdlib/number/float64/base/normalize":195,"@stdlib/number/float64/base/to-words":204}],149:[function(require,module,exports){
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
* // returns -Infinity
*
* v = ln( Infinity );
* // returns Infinity
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

},{"./ln.js":150}],150:[function(require,module,exports){
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

var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var BIAS = require( '@stdlib/constants/math/float64-exponent-bias' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var polyvalP = require( './polyval_p.js' );
var polyvalQ = require( './polyval_q.js' );


// VARIABLES //

var LN2_HI = 6.93147180369123816490e-01; // 3FE62E42 FEE00000
var LN2_LO = 1.90821492927058770002e-10; // 3DEA39EF 35793C76
var TWO54 = 1.80143985094819840000e+16;  // 0x43500000, 0x00000000
var ONE_THIRD = 0.33333333333333333;

// 0x000fffff = 1048575 => 0 00000000000 11111111111111111111
var HIGH_SIGNIFICAND_MASK = 0x000fffff|0; // asm type annotation

// 0x7ff00000 = 2146435072 => 0 11111111111 00000000000000000000 => biased exponent: 2047 = 1023+1023 => 2^1023
var HIGH_MAX_NORMAL_EXP = 0x7ff00000|0; // asm type annotation

// 0x00100000 = 1048576 => 0 00000000001 00000000000000000000 => biased exponent: 1 = -1022+1023 => 2^-1022
var HIGH_MIN_NORMAL_EXP = 0x00100000|0; // asm type annotation

// 0x3ff00000 = 1072693248 => 0 01111111111 00000000000000000000 => biased exponent: 1023 = 0+1023 => 2^0 = 1
var HIGH_BIASED_EXP_0 = 0x3ff00000|0; // asm type annotation


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
* // returns -Infinity
*
* @example
* var v = ln( Infinity );
* // returns Infinity
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
	var hfsq;
	var hx;
	var t2;
	var t1;
	var k;
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
	hx = getHighWord( x );
	k = 0|0; // asm type annotation
	if ( hx < HIGH_MIN_NORMAL_EXP ) {
		// Case: 0 < x < 2**-1022
		k -= 54|0; // asm type annotation

		// Subnormal number, scale up `x`:
		x *= TWO54;
		hx = getHighWord( x );
	}
	if ( hx >= HIGH_MAX_NORMAL_EXP ) {
		return x + x;
	}
	k += ( ( hx>>20 ) - BIAS )|0; // asm type annotation
	hx &= HIGH_SIGNIFICAND_MASK;
	i = ( (hx+0x95f64) & 0x100000 )|0; // asm type annotation

	// Normalize `x` or `x/2`...
	x = setHighWord( x, hx|(i^HIGH_BIASED_EXP_0) );
	k += ( i>>20 )|0; // asm type annotation
	f = x - 1.0;
	if ( (HIGH_SIGNIFICAND_MASK&(2+hx)) < 3 ) {
		// Case: -2**-20 <= f < 2**-20
		if ( f === 0.0 ) {
			if ( k === 0 ) {
				return 0.0;
			}
			return (k * LN2_HI) + (k * LN2_LO);
		}
		R = f * f * ( 0.5 - (ONE_THIRD*f) );
		if ( k === 0 ) {
			return f - R;
		}
		return (k * LN2_HI) - ( (R-(k*LN2_LO)) - f );
	}
	s = f / (2.0 + f);
	z = s * s;
	i = ( hx - 0x6147a )|0; // asm type annotation
	w = z * z;
	j = ( 0x6b851 - hx )|0; // asm type annotation
	t1 = w * polyvalP( w );
	t2 = z * polyvalQ( w );
	i |= j;
	R = t2 + t1;
	if ( i > 0 ) {
		hfsq = 0.5 * f * f;
		if ( k === 0 ) {
			return f - ( hfsq - (s * (hfsq+R)) );
		}
		return (k * LN2_HI) - ( hfsq - ((s*(hfsq+R))+(k*LN2_LO)) - f );
	}
	if ( k === 0 ) {
		return f - (s*(f-R));
	}
	return (k * LN2_HI) - ( ( (s*(f-R)) - (k*LN2_LO) ) - f );
}


// EXPORTS //

module.exports = ln;

},{"./polyval_p.js":151,"./polyval_q.js":152,"@stdlib/constants/math/float64-exponent-bias":58,"@stdlib/constants/math/float64-ninf":68,"@stdlib/math/base/assert/is-nan":83,"@stdlib/number/float64/base/get-high-word":190,"@stdlib/number/float64/base/set-high-word":199}],151:[function(require,module,exports){
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
		return 0.3999999999940942;
	}
	return 0.3999999999940942 + (x * (0.22222198432149784 + (x * 0.15313837699209373))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],152:[function(require,module,exports){
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
	return 0.6666666666666735 + (x * (0.2857142874366239 + (x * (0.1818357216161805 + (x * 0.14798198605116586))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],153:[function(require,module,exports){
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

},{"./log1p.js":154}],154:[function(require,module,exports){
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

},{"./polyval_lp.js":155,"@stdlib/constants/math/float64-exponent-bias":58,"@stdlib/constants/math/float64-ninf":68,"@stdlib/constants/math/float64-pinf":70,"@stdlib/math/base/assert/is-nan":83,"@stdlib/number/float64/base/get-high-word":190,"@stdlib/number/float64/base/set-high-word":199}],155:[function(require,module,exports){
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

},{}],156:[function(require,module,exports){
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

},{"./max.js":157}],157:[function(require,module,exports){
'use strict';

// MODULES //

var isPositiveZero = require( '@stdlib/math/base/assert/is-positive-zero' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );


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
}


// EXPORTS //

module.exports = max;

},{"@stdlib/constants/math/float64-ninf":68,"@stdlib/constants/math/float64-pinf":70,"@stdlib/math/base/assert/is-nan":83,"@stdlib/math/base/assert/is-positive-zero":89}],158:[function(require,module,exports){
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

},{"./min.js":159}],159:[function(require,module,exports){
'use strict';

// MODULES //

var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );


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
}


// EXPORTS //

module.exports = min;

},{"@stdlib/constants/math/float64-ninf":68,"@stdlib/constants/math/float64-pinf":70,"@stdlib/math/base/assert/is-nan":83,"@stdlib/math/base/assert/is-negative-zero":85}],160:[function(require,module,exports){
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

},{"./pow.js":166}],161:[function(require,module,exports){
'use strict';

// MODULES //

var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var setLowWord = require( '@stdlib/number/float64/base/set-low-word' );
var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
var BIAS = require( '@stdlib/constants/math/float64-exponent-bias' );
var polyvalL = require( './polyval_l.js' );


// VARIABLES //

// 0x000fffff = 1048575 => 0 00000000000 11111111111111111111
var HIGH_SIGNIFICAND_MASK = 0x000fffff|0; // asm type annotation

// 0x00100000 = 1048576 => 0 00000000001 00000000000000000000 => biased exponent: 1 = -1022+1023 => 2^-1022
var HIGH_MIN_NORMAL_EXP = 0x00100000|0; // asm type annotation

// 0x3ff00000 = 1072693248 => 0 01111111111 00000000000000000000 => biased exponent: 1023 = 0+1023 => 2^0 = 1
var HIGH_BIASED_EXP_0 = 0x3ff00000|0; // asm type annotation

// 0x20000000 = 536870912 => 0 01000000000 00000000000000000000 => biased exponent: 512 = -511+1023
var HIGH_BIASED_EXP_NEG_512 = 0x20000000|0; // asm type annotation

// 0x00080000 = 524288 => 0 00000000000 10000000000000000000
var HIGH_SIGNIFICAND_HALF = 0x00080000|0; // asm type annotation

// TODO: consider making an external constant
var HIGH_NUM_SIGNIFICAND_BITS = 20|0; // asm type annotation

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


// MAIN //

/**
* Computes \\(\operatorname{log2}(ax)\\).
*
* @private
* @param {Array} out - output array
* @param {number} ax - absolute value of `x`
* @param {number} ahx - high word of `ax`
* @returns {Array} output array containing a tuple comprised of high and low parts
*
* @example
* var t = log2ax( [ 0.0, 0.0 ], 9.0, 1075970048 ); // => [ t1, t2 ]
* // returns [ 3.169923782348633, 0.0000012190936795504075 ]
*/
function log2ax( out, ax, ahx ) {
	var tmp;
	var ss; // `hs + ls`
	var s2; // `ss` squared
	var hs;
	var ls;
	var ht;
	var lt;
	var bp; // `BP` constant
	var dp; // `DP` constant
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

	n = 0|0; // asm type annotation

	// Check if `x` is subnormal...
	if ( ahx < HIGH_MIN_NORMAL_EXP ) {
		ax *= TWO53;
		n -= 53|0; // asm type annotation
		ahx = getHighWord( ax );
	}
	// Extract the unbiased exponent of `x`:
	n += ((ahx >> HIGH_NUM_SIGNIFICAND_BITS) - BIAS)|0; // asm type annotation

	// Isolate the significand bits of `x`:
	j = (ahx & HIGH_SIGNIFICAND_MASK)|0; // asm type annotation

	// Normalize `ahx` by setting the (biased) exponent to `1023`:
	ahx = (j | HIGH_BIASED_EXP_0)|0; // asm type annotation

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
		n += 1|0; // asm type annotation
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

	out[ 0 ] = t1;
	out[ 1 ] = t2;
	return out;
}


// EXPORTS //

module.exports = log2ax;

},{"./polyval_l.js":163,"@stdlib/constants/math/float64-exponent-bias":58,"@stdlib/number/float64/base/get-high-word":190,"@stdlib/number/float64/base/set-high-word":199,"@stdlib/number/float64/base/set-low-word":201}],162:[function(require,module,exports){
'use strict';

// MODULES //

var setLowWord = require( '@stdlib/number/float64/base/set-low-word' );
var polyvalW = require( './polyval_w.js' );


// VARIABLES //

// 1/LN2
var INV_LN2 = 1.44269504088896338700e+00; // 0x3FF71547, 0x652B82FE

// High (24 bits): 1/LN2
var INV_LN2_HI = 1.44269502162933349609e+00; // 0x3FF71547, 0x60000000

// Low: 1/LN2
var INV_LN2_LO = 1.92596299112661746887e-08; // 0x3E54AE0B, 0xF85DDF44


// MAIN //

/**
* Computes \\(\operatorname{log}(x)\\) assuming \\(|1-x|\\) is small and using the approximation \\(x - x^2/2 + x^3/3 - x^4/4\\).
*
* @private
* @param {Array} out - output array
* @param {number} ax - absolute value of `x`
* @returns {Array} output array containing a tuple comprised of high and low parts
*
* @example
* var t = logx( [ 0.0, 0.0 ], 9.0 ); // => [ t1, t2 ]
* // returns [ -1265.7236328125, -0.0008163940840404393 ]
*/
function logx( out, ax ) {
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

	out[ 0 ] = t1;
	out[ 1 ] = t2;
	return out;
}


// EXPORTS //

module.exports = logx;

},{"./polyval_w.js":165,"@stdlib/number/float64/base/set-low-word":201}],163:[function(require,module,exports){
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
		return 0.5999999999999946;
	}
	return 0.5999999999999946 + (x * (0.4285714285785502 + (x * (0.33333332981837743 + (x * (0.272728123808534 + (x * (0.23066074577556175 + (x * 0.20697501780033842))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],164:[function(require,module,exports){
arguments[4][117][0].apply(exports,arguments)
},{"dup":117}],165:[function(require,module,exports){
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
		return 0.5;
	}
	return 0.5 + (x * (-0.3333333333333333 + (x * 0.25))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],166:[function(require,module,exports){
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
var toWords = require( '@stdlib/number/float64/base/to-words' );
var setLowWord = require( '@stdlib/number/float64/base/set-low-word' );
var uint32ToInt32 = require( '@stdlib/number/uint32/base/to-int32' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var xIsZero = require( './x_is_zero.js' );
var yIsHuge = require( './y_is_huge.js' );
var yIsInfinite = require( './y_is_infinite.js' );
var log2ax = require( './log2ax.js' );
var logx = require( './logx.js' );
var pow2 = require( './pow2.js' );


// VARIABLES //

// 0x7fffffff = 2147483647 => 0 11111111111 11111111111111111111
var ABS_MASK = 0x7fffffff|0; // asm type annotation

// 0x3fefffff = 1072693247 => 0 01111111110 11111111111111111111 => biased exponent: 1022 = -1+1023 => 2^-1
var HIGH_MAX_NEAR_UNITY = 0x3fefffff|0; // asm type annotation

// 0x41e00000 = 1105199104 => 0 10000011110 00000000000000000000 => biased exponent: 1054 = 31+1023 => 2^31
var HIGH_BIASED_EXP_31 = 0x41e00000|0; // asm type annotation

// 0x43f00000 = 1139802112 => 0 10000111111 00000000000000000000 => biased exponent: 1087 = 64+1023 => 2^64
var HIGH_BIASED_EXP_64 = 0x43f00000|0; // asm type annotation

// 0x40900000 = 1083179008 => 0 10000001001 00000000000000000000 => biased exponent: 1033 = 10+1023 => 2^10 = 1024
var HIGH_BIASED_EXP_10 = 0x40900000|0; // asm type annotation

// 0x3ff00000 = 1072693248 => 0 01111111111 00000000000000000000 => biased exponent: 1023 = 0+1023 => 2^0 = 1
var HIGH_BIASED_EXP_0 = 0x3ff00000|0; // asm type annotation

// 0x4090cc00 = 1083231232 => 0 10000001001 00001100110000000000
var HIGH_1075 = 0x4090cc00|0; // asm type annotation

// 0xc090cc00 = 3230714880 => 1 10000001001 00001100110000000000
var HIGH_NEG_1075 = 0xc090cc00>>>0; // asm type annotation

var HIGH_NUM_NONSIGN_BITS = 31|0; // asm type annotation

var HUGE = 1.0e300;
var TINY = 1.0e-300;

// -(1024-log2(ovfl+.5ulp))
var OVT = 8.0085662595372944372e-17;

// High/low words workspace:
var WORDS = [ 0|0, 0|0 ]; // WARNING: not thread safe

// Log workspace:
var LOG_WORKSPACE = [ 0.0, 0.0 ]; // WARNING: not thread safe


// MAIN //

/**
* Evaluates the exponential function.
*
* ## Method
*
* 1.  Let \\(x = 2^n (1+f)\\).
*
* 2.  Compute \\(\operatorname{log2}(x)\\) as
*
*     ```tex
*     \operatorname{log2}(x) = w_1 + w_2
*     ```
*
*     where \\(w_1\\) has \\(53 - 24 = 29\\) bit trailing zeros.
*
* 3.  Compute
*
*     ```tex
*     y \cdot \operatorname{log2}(x) = n + y^\prime
*     ```
*
*     by simulating multi-precision arithmetic, where \\(|y^\prime| \leq 0.5\\).
*
* 4.  Return
*
*     ```tex
*     x^y = 2^n e^{y^\prime \cdot \mathrm{log2}}
*     ```
*
* ## Special Cases
*
* ```tex
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
* ## Notes
*
* -   \\(\operatorname{pow}(x,y)\\) returns \\(x^y\\) nearly rounded. In particular, \\(\operatorname{pow}(<\mathrm{integer}>,<\mathrm{integer}>)\\) **always** returns the correct integer, provided the value is representable.
* -   The hexadecimal values shown in the source code are the intended values for used constants. Decimal values may be used, provided the compiler will accurately convert decimal to binary in order to produce the hexadecimal values.
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
	var t;
	var z;   // y prime
	var j;
	var i;
	if ( isnan( x ) || isnan( y ) ) {
		return NaN;
	}
	// Split `y` into high and low words:
	toWords( WORDS, y );
	hy = WORDS[ 0 ];
	ly = WORDS[ 1 ];

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
	toWords( WORDS, x );
	hx = WORDS[ 0 ];
	lx = WORDS[ 1 ];

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
	ahx = (hx & ABS_MASK)|0; // asm type annotation
	ahy = (hy & ABS_MASK)|0; // asm type annotation

	// Extract the sign bits:
	sx = (hx >>> HIGH_NUM_NONSIGN_BITS)|0; // asm type annotation
	sy = (hy >>> HIGH_NUM_NONSIGN_BITS)|0; // asm type annotation

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
		t = logx( LOG_WORKSPACE, ax );
	}
	// Case 2: `|y|` is not huge...
	else {
		t = log2ax( LOG_WORKSPACE, ax, ahx );
	}
	// Split `y` into `y1 + y2` and compute `(y1+y2) * (t1+t2)`...
	y1 = setLowWord( y, 0 );
	lp = ( (y-y1)*t[0] ) + ( y*t[1] );
	hp = y1 * t[0];
	z = lp + hp;

	// Note: *can* be more performant to use `getHighWord` and `getLowWord` directly, but using `toWords` looks cleaner.
	toWords( WORDS, z );
	j = uint32ToInt32( WORDS[0] );
	i = uint32ToInt32( WORDS[1] );

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
}


// EXPORTS //

module.exports = pow;

},{"./log2ax.js":161,"./logx.js":162,"./pow2.js":167,"./x_is_zero.js":168,"./y_is_huge.js":169,"./y_is_infinite.js":170,"@stdlib/constants/math/float64-ninf":68,"@stdlib/constants/math/float64-pinf":70,"@stdlib/math/base/assert/is-infinite":79,"@stdlib/math/base/assert/is-integer":81,"@stdlib/math/base/assert/is-nan":83,"@stdlib/math/base/assert/is-odd":87,"@stdlib/math/base/special/abs":107,"@stdlib/math/base/special/sqrt":181,"@stdlib/number/float64/base/set-low-word":201,"@stdlib/number/float64/base/to-words":204,"@stdlib/number/uint32/base/to-int32":208}],167:[function(require,module,exports){
'use strict';

// MODULES //

var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
var setLowWord = require( '@stdlib/number/float64/base/set-low-word' );
var uint32ToInt32 = require( '@stdlib/number/uint32/base/to-int32' );
var ldexp = require( '@stdlib/math/base/special/ldexp' );
var LN2 = require( '@stdlib/constants/math/float64-ln-two' );
var BIAS = require( '@stdlib/constants/math/float64-exponent-bias' );
var polyvalP = require( './polyval_p.js' );


// VARIABLES //

// 0x7fffffff = 2147483647 => 0 11111111111 11111111111111111111
var ABS_MASK = 0x7fffffff|0; // asm type annotation

// 0x000fffff = 1048575 => 0 00000000000 11111111111111111111
var HIGH_SIGNIFICAND_MASK = 0x000fffff|0; // asm type annotation

// 0x00100000 = 1048576 => 0 00000000001 00000000000000000000 => biased exponent: 1 = -1022+1023 => 2^-1022
var HIGH_MIN_NORMAL_EXP = 0x00100000|0; // asm type annotation

// 0x3fe00000 = 1071644672 => 0 01111111110 00000000000000000000 => biased exponent: 1022 = -1+1023 => 2^-1
var HIGH_BIASED_EXP_NEG_1 = 0x3fe00000|0; // asm type annotation

// TODO: consider making into an external constant
var HIGH_NUM_SIGNIFICAND_BITS = 20|0; // asm type annotation

// High: LN2
var LN2_HI = 6.93147182464599609375e-01; // 0x3FE62E43, 0x00000000

// Low: LN2
var LN2_LO = -1.90465429995776804525e-09; // 0xBE205C61, 0x0CA86C39


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

	i = (j & ABS_MASK)|0; // asm type annotation
	k = ((i>>HIGH_NUM_SIGNIFICAND_BITS) - BIAS)|0; // asm type annotation
	n = 0;

	// `|z| > 0.5`, set `n = z+0.5`
	if ( i > HIGH_BIASED_EXP_NEG_1 ) {
		n = (j + (HIGH_MIN_NORMAL_EXP>>(k+1)))>>>0; // asm type annotation
		k = (((n & ABS_MASK)>>HIGH_NUM_SIGNIFICAND_BITS) - BIAS)|0; // new k for n
		tmp = ((n & ~(HIGH_SIGNIFICAND_MASK >> k)))>>>0; // asm type annotation
		t = setHighWord( 0.0, tmp );
		n = (((n & HIGH_SIGNIFICAND_MASK)|HIGH_MIN_NORMAL_EXP) >> (HIGH_NUM_SIGNIFICAND_BITS-k))>>>0; // eslint-disable-line max-len
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
	j += (n << HIGH_NUM_SIGNIFICAND_BITS)>>>0; // asm type annotation

	// Check for subnormal output...
	if ( (j>>HIGH_NUM_SIGNIFICAND_BITS) <= 0 ) {
		z = ldexp( z, n );
	} else {
		z = setHighWord( z, j );
	}
	return z;
}


// EXPORTS //

module.exports = pow2;

},{"./polyval_p.js":164,"@stdlib/constants/math/float64-exponent-bias":58,"@stdlib/constants/math/float64-ln-two":61,"@stdlib/math/base/special/ldexp":147,"@stdlib/number/float64/base/get-high-word":190,"@stdlib/number/float64/base/set-high-word":199,"@stdlib/number/float64/base/set-low-word":201,"@stdlib/number/uint32/base/to-int32":208}],168:[function(require,module,exports){
'use strict';

// MODULES //

var isOdd = require( '@stdlib/math/base/assert/is-odd' );
var copysign = require( '@stdlib/math/base/special/copysign' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );


// MAIN //

/**
* Evaluates the exponential function when \\(|x| = 0\\).
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
* // returns -Infinity
*
* @example
* var v = pow( 0.0, -9 );
* // returns Infinity
*
* @example
* var v = pow( -0.0, 9 );
* // returns Infinity
*
* @example
* var v = pow( 0.0, -Infinity  );
* // returns Infinity
*
* @example
* var v = pow( 0.0, Infinity );
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
}


// EXPORTS //

module.exports = pow;

},{"@stdlib/constants/math/float64-ninf":68,"@stdlib/constants/math/float64-pinf":70,"@stdlib/math/base/assert/is-odd":87,"@stdlib/math/base/special/copysign":111}],169:[function(require,module,exports){
'use strict';

// MODULES //

var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );


// VARIABLES //

// 0x7fffffff = 2147483647 => 0 11111111111 11111111111111111111
var ABS_MASK = 0x7fffffff|0; // asm type annotation

// 0x3fefffff = 1072693247 => 0 01111111110 11111111111111111111 => biased exponent: 1022 = -1+1023 => 2^-1
var HIGH_MAX_NEAR_UNITY = 0x3fefffff|0; // asm type annotation

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
* // returns Infinity
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
}


// EXPORTS //

module.exports = pow;

},{"@stdlib/number/float64/base/get-high-word":190}],170:[function(require,module,exports){
'use strict';

// MODULES //

var abs = require( '@stdlib/math/base/special/abs' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );


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
* var v = pow( -1.0, Infinity );
* // returns NaN
*
* @example
* var v = pow( -1.0, -Infinity  );
* // returns NaN
*
* @example
* var v = pow( 1.0, Infinity );
* // returns 1.0
*
* @example
* var v = pow( 1.0, -Infinity  );
* // returns 1.0
*
* @example
* var v = pow( 0.5, Infinity );
* // returns 0.0
*
* @example
* var v = pow( 0.5, -Infinity  );
* // returns Infinity
*
* @example
* var v = pow( 1.5, -Infinity  );
* // returns 0.0
*
* @example
* var v = pow( 1.5, Infinity );
* // returns Infinity
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
}


// EXPORTS //

module.exports = pow;

},{"@stdlib/constants/math/float64-pinf":70,"@stdlib/math/base/special/abs":107}],171:[function(require,module,exports){
'use strict';

/**
* Compute `x - nπ/2 = r`.
*
* @module @stdlib/math/base/special/rempio2
*
* @example
* var rempio2 = require( '@stdlib/math/base/special/rempio2' );
*
* var y = new Array( 2 );
* var n = rempio2( 128.0, y );
* // returns 81
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

},{"./rempio2.js":173}],172:[function(require,module,exports){
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
* Table of constants for `2/π` (`396` hex digits, `476` decimal).
*
* Integer array which contains the (`24*i`)-th to (`24*i+23`)-th bit of `2/π` after binary point. The corresponding floating value is
*
* ```tex
* \operatorname{ipio2}[i] \cdot 2^{-24(i+1)}
* ```
*
* This table must have at least `(e0-3)/24 + jk` terms. For quad precision (`e0 <= 16360`, `jk = 6`), this is `686`.
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

// Double precision array, obtained by cutting `π/2` into `24` bits chunks...
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
}

/**
* Performs the computation for `kernelRempio2()`.
*
* @private
* @param {PositiveNumber} x - input value
* @param {(Array|TypedArray|Object)} y - output object for storing double precision numbers
* @param {integer} jz - number of terms of `ipio2[]` used
* @param {Array<integer>} q - array with integral values, representing the 24-bits chunk of the product of `x` and `2/π`
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
	for ( i = 0; j > 0; i++ ) {
		fw = ( TWON24 * z )|0;
		IQ[ i ] = ( z - (TWO24*fw) )|0;
		z = q[ j-1 ] + fw;
		j -= 1;
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
}


// MAIN //

/**
* Returns the last three binary digits of `N` with `y = x - Nπ/2` so that `|y| < π/2`.
*
* ## Method
*
* -   The method is to compute the integer (`mod 8`) and fraction parts of `2x/π` without doing the full multiplication. In general, we skip the part of the product that is known to be a huge integer (more accurately, equals `0 mod 8` ). Thus, the number of operations is independent of the exponent of the input.
*
* @private
* @param {PositiveNumber} x - input value
* @param {(Array|TypedArray|Object)} y - remainder elements
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
	for ( i = 0; i <= m; i++ ) {
		if ( j < 0 ) {
			F[ i ] = 0.0;
		} else {
			F[ i ] = IPIO2[ j ];
		}
		j += 1;
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
}


// EXPORTS //

module.exports = kernelRempio2;

},{"@stdlib/math/base/special/floor":119,"@stdlib/math/base/special/ldexp":147}],173:[function(require,module,exports){
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

var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var getLowWord = require( '@stdlib/number/float64/base/get-low-word' );
var fromWords = require( '@stdlib/number/float64/base/from-words' );
var rempio2Kernel = require( './kernel_rempio2.js' );
var rempio2Medium = require( './rempio2_medium.js' );


// VARIABLES //

var ZERO = 0.00000000000000000000e+00;    // 0x00000000, 0x00000000
var TWO24 = 1.67772160000000000000e+07;   // 0x41700000, 0x00000000

// 33 bits of π/2:
var PIO2_1 = 1.57079632673412561417e+00;  // 0x3FF921FB, 0x54400000

// PIO2_1T = π/2 - PIO2_1:
var PIO2_1T = 6.07710050650619224932e-11; // 0x3DD0B461, 0x1A626331
var TWO_PIO2_1T = 2.0 * PIO2_1T;
var THREE_PIO2_1T = 3.0 * PIO2_1T;
var FOUR_PIO2_1T = 4.0 * PIO2_1T;

// Absolute value mask: 0x7fffffff = 2147483647 => 01111111111111111111111111111111
var ABS_MASK = 0x7fffffff|0; // asm type annotation

// Exponent mask: 0x7ff00000 = 2146435072 => 01111111111100000000000000000000
var EXPONENT_MASK = 0x7ff00000|0; // asm type annotation

// High word significand mask: 0xfffff = 1048575 => 00000000000011111111111111111111
var SIGNIFICAND_MASK = 0xfffff|0; // asm type annotation

// High word significand for π and π/2: 0x921fb = 598523 => 00000000000010010010000111111011
var PI_HIGH_WORD_SIGNIFICAND = 0x921fb|0; // asm type annotation

// High word for π/4: 0x3fe921fb = 1072243195 => 00111111111010010010000111111011
var PIO4_HIGH_WORD = 0x3fe921fb|0; // asm type annotation

// High word for 3π/4: 0x4002d97c = 1073928572 => 01000000000000101101100101111100
var THREE_PIO4_HIGH_WORD = 0x4002d97c|0; // asm type annotation

// High word for 5π/4: 0x400f6a7a = 1074752122 => 01000000000011110110101001111010
var FIVE_PIO4_HIGH_WORD = 0x400f6a7a|0; // asm type annotation

// High word for 6π/4: 0x4012d97c = 1074977148 => 01000000000100101101100101111100
var THREE_PIO2_HIGH_WORD = 0x4012d97c|0; // asm type annotation

// High word for 7π/4: 0x4015fdbc = 1075183036 => 01000000000101011111110110111100
var SEVEN_PIO4_HIGH_WORD = 0x4015fdbc|0; // asm type annotation

// High word for 8π/4: 0x401921fb = 1075388923 => 01000000000110010010000111111011
var TWO_PI_HIGH_WORD = 0x401921fb|0; // asm type annotation

// High word for 9π/4: 0x401c463b = 1075594811 => 01000000000111000100011000111011
var NINE_PIO4_HIGH_WORD = 0x401c463b|0; // asm type annotation

// 2^20*π/2 = 1647099.3291652855 => 0100000100111001001000011111101101010100010001000010110100011000 => high word => 0x413921fb = 1094263291 => 01000001001110010010000111111011
var MEDIUM = 0x413921fb|0; // asm type annotation

// Arrays for storing temporary values:
var TX = new Array( 3 ); // WARNING: not thread safe
var TY = new Array( 2 ); // WARNING: not thread safe


// MAIN //

/**
* Computes `x - nπ/2 = r`.
*
* ## Notes
*
* -   Returns `n` and stores the remainder `r` as two numbers `y[0]` and `y[1]`, such that `y[0]+y[1] = r`.
*
*
* @param {number} x - input value
* @param {(Array|TypedArray|Object)} y - remainder elements
* @returns {integer} factor of `π/2`
*
* @example
* var y = new Array( 2 );
* var n = rempio2( 128.0, y );
* // returns 81
*
* var y1 = y[ 0 ];
* // returns ~0.765
*
* var y2 = y[ 1 ];
* // returns ~3.618e-17
*
* @example
* var y = new Array( 2 );
* var n = rempio2( NaN, y );
* // returns 0
*
* var y1 = y[ 0 ];
* // returns NaN
*
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
	ix = (hx & ABS_MASK)|0; // asm type annotation

	// Case: |x| ~<= π/4 (no need for reduction)
	if ( ix <= PIO4_HIGH_WORD ) {
		y[ 0 ] = x;
		y[ 1 ] = 0.0;
		return 0;
	}
	// Case: |x| ~<= 5π/4
	if ( ix <= FIVE_PIO4_HIGH_WORD ) {
		// Case: |x| ~= π/2 or π
		if ( (ix & SIGNIFICAND_MASK) === PI_HIGH_WORD_SIGNIFICAND ) {
			// Cancellation => use medium case
			return rempio2Medium( x, ix, y );
		}
		// Case: |x| ~<= 3π/4
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
	// Case: |x| ~<= 9π/4
	if ( ix <= NINE_PIO4_HIGH_WORD ) {
		// Case: |x| ~<= 7π/4
		if ( ix <= SEVEN_PIO4_HIGH_WORD ) {
			// Case: |x| ~= 3π/2
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
		// Case: |x| ~= 4π/2
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
	// Case: |x| ~< 2^20*π/2 (medium size)
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
}


// EXPORTS //

module.exports = rempio2;

},{"./kernel_rempio2.js":172,"./rempio2_medium.js":174,"@stdlib/number/float64/base/from-words":186,"@stdlib/number/float64/base/get-high-word":190,"@stdlib/number/float64/base/get-low-word":192}],174:[function(require,module,exports){
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
var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );


// VARIABLES //

// 53 bits of 2/π:
var INVPIO2 = 6.36619772367581382433e-01; // 0x3FE45F30, 0x6DC9C883

// First 33 bits of π/2:
var PIO2_1 = 1.57079632673412561417e+00;  // 0x3FF921FB, 0x54400000

// PIO2_1T = π/2 - PIO2_1:
var PIO2_1T = 6.07710050650619224932e-11; // 0x3DD0B461, 0x1A626331

// Another 33 bits of π/2:
var PIO2_2 = 6.07710050630396597660e-11;  // 0x3DD0B461, 0x1A600000

// PIO2_2T = π/2 - ( PIO2_1 + PIO2_2 ):
var PIO2_2T = 2.02226624879595063154e-21; // 0x3BA3198A, 0x2E037073

// Another 33 bits of π/2:
var PIO2_3 = 2.02226624871116645580e-21;  // 0x3BA3198A, 0x2E000000

// PIO2_3T = π/2 - ( PIO2_1 + PIO2_2 + PIO2_3 ):
var PIO2_3T = 8.47842766036889956997e-32; // 0x397B839A, 0x252049C1

// Exponent mask (2047 => 0x7ff):
var EXPONENT_MASK = 0x7ff|0; // asm type annotation


// MAIN //

/**
* Computes `x - nπ/2 = r` for medium-sized inputs.
*
* @private
* @param {number} x - input value
* @param {uint32} ix - high word of `x`
* @param {(Array|TypedArray|Object)} y - remainder elements
* @returns {integer} factor of `π/2`
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
	j = (ix >> 20)|0; // asm type annotation
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
}


// EXPORTS //

module.exports = rempio2Medium;

},{"@stdlib/math/base/special/round":175,"@stdlib/number/float64/base/get-high-word":190}],175:[function(require,module,exports){
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

},{"./round.js":176}],176:[function(require,module,exports){
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

},{}],177:[function(require,module,exports){
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

},{"./sin.js":178}],178:[function(require,module,exports){
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

var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var kernelCos = require( '@stdlib/math/base/special/kernel-cos' );
var kernelSin = require( '@stdlib/math/base/special/kernel-sin' );
var rempio2 = require( '@stdlib/math/base/special/rempio2' );


// VARIABLES //

// Absolute value mask: 0x7fffffff = 2147483647 => 01111111111111111111111111111111
var ABS_MASK = 0x7fffffff|0; // asm type annotation

// Exponent mask: 0x7ff00000 = 2146435072 => 01111111111100000000000000000000
var EXPONENT_MASK = 0x7ff00000|0; // asm type annotation

// High word for PI/4: 0x3fe921fb = 1072243195 => 00111111111010010010000111111011
var PIO4_HIGH_WORD = 0x3fe921fb|0; // asm type annotation

// 2^-26 = 1.4901161193847656e-8 => 0011111001010000000000000000000000000000000000000000000000000000 => high word => 00111110010100000000000000000000 => 0x3e500000 = 1045430272
var SMALL_HIGH_WORD = 0x3e500000|0; // asm type annotation

// Array for storing remainder elements:
var Y = [ 0.0, 0.0 ]; // WARNING: not thread safe


// MAIN //

/**
* Computes the sine of a number.
*
* ## Method
*
* -   Let \\(S\\), \\(C\\), and \\(T\\) denote the \\(\sin\\), \\(\cos\\), and \\(\tan\\), respectively, on \\(\[-\pi/4, +\pi/4\]\\).
*
* -   Reduce the argument \\(x\\) to \\(y1+y2 = x-k\pi/2\\) in \\(\[-\pi/4, +\pi/4\]\\), and let \\(n = k \mod 4\\).
*
* -   We have
*
*     | n | sin(x) | cos(x) | tan(x) |
*     | - | ------ | ------ | ------ |
*     | 0 |   S    |   C    |    T   |
*     | 1 |   C    |  -S    |  -1/T  |
*     | 2 |  -S    |  -C    |    T   |
*     | 3 |  -C    |   S    |  -1/T  |
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

	ix = getHighWord( x );
	ix &= ABS_MASK;

	// Case: |x| ~< π/4
	if ( ix <= PIO4_HIGH_WORD ) {
		// Case: |x| ~< 2^-26
		if ( ix < SMALL_HIGH_WORD ) {
			return x;
		}
		return kernelSin( x, 0.0 );
	}
	// Case: x is NaN or infinity
	if ( ix >= EXPONENT_MASK ) {
		return NaN;
	}
	// Argument reduction...
	n = rempio2( x, Y );
	switch ( n & 3 ) {
	case 0:
		return kernelSin( Y[ 0 ], Y[ 1 ] );
	case 1:
		return kernelCos( Y[ 0 ], Y[ 1 ] );
	case 2:
		return -kernelSin( Y[ 0 ], Y[ 1 ] );
	default:
		return -kernelCos( Y[ 0 ], Y[ 1 ] );
	}
}


// EXPORTS //

module.exports = sin;

},{"@stdlib/math/base/special/kernel-cos":141,"@stdlib/math/base/special/kernel-sin":145,"@stdlib/math/base/special/rempio2":171,"@stdlib/number/float64/base/get-high-word":190}],179:[function(require,module,exports){
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

},{"./sinpi.js":180}],180:[function(require,module,exports){
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
var PI = require( '@stdlib/constants/math/float64-pi' );


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
}


// EXPORTS //

module.exports = sinpi;

},{"@stdlib/constants/math/float64-pi":69,"@stdlib/math/base/assert/is-infinite":79,"@stdlib/math/base/assert/is-nan":83,"@stdlib/math/base/special/abs":107,"@stdlib/math/base/special/copysign":111,"@stdlib/math/base/special/cos":113,"@stdlib/math/base/special/sin":177}],181:[function(require,module,exports){
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

},{}],182:[function(require,module,exports){
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
* v = trunc( Infinity );
* // returns Infinity
*
* v = trunc( -Infinity );
* // returns -Infinity
*/

// MODULES //

var trunc = require( './trunc.js' );


// EXPORTS //

module.exports = trunc;

},{"./trunc.js":183}],183:[function(require,module,exports){
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
* var v = trunc( Infinity );
* // returns Infinity
*
* @example
* var v = trunc( -Infinity );
* // returns -Infinity
*/
function trunc( x ) {
	if ( x < 0.0 ) {
		return ceil( x );
	}
	return floor( x );
}


// EXPORTS //

module.exports = trunc;

},{"@stdlib/math/base/special/ceil":109,"@stdlib/math/base/special/floor":119}],184:[function(require,module,exports){
'use strict';

/**
* Return an integer corresponding to the unbiased exponent of a double-precision floating-point number.
*
* @module @stdlib/number/float64/base/exponent
*
* @example
* var exponent = require( '@stdlib/number/float64/base/exponent );
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

var exponent = require( './main.js' );


// EXPORTS //

module.exports = exponent;

},{"./main.js":185}],185:[function(require,module,exports){
'use strict';

// MODULES //

var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var EXP_MASK = require( '@stdlib/constants/math/float64-high-word-exponent-mask' );
var BIAS = require( '@stdlib/constants/math/float64-exponent-bias' );


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
	return (high - BIAS)|0; // asm type annotation
}


// EXPORTS //

module.exports = exponent;

},{"@stdlib/constants/math/float64-exponent-bias":58,"@stdlib/constants/math/float64-high-word-exponent-mask":60,"@stdlib/number/float64/base/get-high-word":190}],186:[function(require,module,exports){
'use strict';

/**
* Create a double-precision floating-point number from a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* @module @stdlib/number/float64/base/from-words
*
* @example
* var fromWords = require( '@stdlib/number/float64/base/from-words' );
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
* // returns Infinity
*
* v = fromWords( 4293918720, 0 );
* // returns -Infinity
*/

// MODULES //

var fromWords = require( './main.js' );


// EXPORTS //

module.exports = fromWords;

},{"./main.js":188}],187:[function(require,module,exports){
'use strict';

// MODULES //

var isLittleEndian = require( '@stdlib/assert/is-little-endian' );


// MAIN //

var indices;
var HIGH;
var LOW;

if ( isLittleEndian === true ) {
	HIGH = 1; // second index
	LOW = 0; // first index
} else {
	HIGH = 0; // first index
	LOW = 1; // second index
}
indices = {
	'HIGH': HIGH,
	'LOW': LOW
};


// EXPORTS //

module.exports = indices;

},{"@stdlib/assert/is-little-endian":29}],188:[function(require,module,exports){
'use strict';

// MODULES //

var Uint32Array = require( '@stdlib/array/uint32' );
var Float64Array = require( '@stdlib/array/float64' );
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
*
* In which Uint32 should we place the higher order bits? If little endian, the second; if big endian, the first.
*
*
* ## References
*
* -   [Open Group][1]
*
* [1]: http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm
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
* // returns Infinity
* @example
* var v = fromWords( 4293918720, 0 );
* // returns -Infinity
*/
function fromWords( high, low ) {
	UINT32_VIEW[ HIGH ] = high;
	UINT32_VIEW[ LOW ] = low;
	return FLOAT64_VIEW[ 0 ];
}


// EXPORTS //

module.exports = fromWords;

},{"./indices.js":187,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],189:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":29}],190:[function(require,module,exports){
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

},{"./main.js":191}],191:[function(require,module,exports){
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

},{"./high.js":189,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],192:[function(require,module,exports){
'use strict';

/**
* Returns an unsigned 32-bit integer corresponding to the less significant 32 bits of a double-precision floating-point number.
*
* @module @stdlib/number/float64/base/get-low-word
*
* @example
* var getLowWord = require( '@stdlib/number/float64/base/get-low-word' );
*
* var w = getLowWord( 3.14e201 ); // => 10010011110010110101100010000010
* // returns 2479577218
*/

// MODULES //

var getLowWord = require( './main.js' );


// EXPORTS //

module.exports = getLowWord;

},{"./main.js":194}],193:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":29}],194:[function(require,module,exports){
'use strict';

// MODULES //

var Uint32Array = require( '@stdlib/array/uint32' );
var Float64Array = require( '@stdlib/array/float64' );
var LOW = require( './low.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );


// MAIN //

/**
* Returns a 32-bit unsigned integer corresponding to the less significant 32 bits of a double-precision floating-point number.
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
* In which Uint32 can we find the lower order bits? If little endian, the first; if big endian, the second.
*
*
* ## References
*
* -   [Open Group][1]
*
* [1]: http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm
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
}


// EXPORTS //

module.exports = getLowWord;

},{"./low.js":193,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],195:[function(require,module,exports){
'use strict';

/**
* Returns a normal number `y` and exponent `exp` satisfying \\(x = y \cdot 2^\mathrm{exp}\\).
*
* @module @stdlib/number/float64/base/normalize
*
* @example
* var normalize = require( '@stdlib/number/float64/base/normalize' );
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
* var Float64Array = require( '@stdlib/array/float64' );
* var normalize = require( '@stdlib/number/float64/base/normalize' );
*
* var out = new Float64Array( 2 );
*
* var v = normalize( out, 3.14e-319 );
* // returns <Float64Array>[ 1.4141234400356668e-303, -52 ]
*
* var bool = ( v === out );
* // returns true
*/

// MODULES //

var normalize = require( './main.js' );


// EXPORTS //

module.exports = normalize;

},{"./main.js":196}],196:[function(require,module,exports){
'use strict';

// MODULES //

var fcn = require( './normalize.js' );


// MAIN //

/**
* Returns a normal number `y` and exponent `exp` satisfying \\(x = y \cdot 2^\mathrm{exp}\\).
*
* @param {(Array|TypedArray|Object)} [out] - output array
* @param {number} x - input value
* @returns {(Array|TypedArray|Object)} output array
*
* @example
* var pow = require( '@stdlib/math/base/special/pow' );
*
* var out = normalize( new Array( 2 ), 3.14e-319 );
* // returns [ 1.4141234400356668e-303, -52 ]
*
* var y = out[ 0 ];
* var exp = out[ 1 ];
*
* var bool = ( y*pow(2.0,exp) === 3.14e-319 );
* // returns true
*
* @example
* var Float64Array = require( '@stdlib/array/float64' );
* var pow = require( '@stdlib/math/base/special/pow' );
*
* var out = new Float64Array( 2 );
*
* var v = normalize( out, 3.14e-319 );
* // returns <Float64Array>[ 1.4141234400356668e-303, -52 ]
*
* var bool = ( v === out );
* // returns true
*
* @example
* var out = normalize( new Array( 2 ), 0.0 );
* // returns [ 0.0, 0 ];
*
* @example
* var out = normalize( new Array( 2 ), Infinity );
* // returns [ Infinity, 0 ]
*
* @example
* var out = normalize( new Array( 2 ), -Infinity );
* // returns [ -Infinity, 0 ]
*
* @example
* var out = normalize( new Array( 2 ), NaN );
* // returns [ NaN, 0 ]
*/
function normalize( out, x ) {
	if ( arguments.length === 1 ) {
		return fcn( [ 0.0, 0 ], out );
	}
	return fcn( out, x );
}


// EXPORTS //

module.exports = normalize;

},{"./normalize.js":197}],197:[function(require,module,exports){
'use strict';

// MODULES //

var FLOAT64_SMALLEST_NORMAL = require( '@stdlib/constants/math/float64-smallest-normal' );
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
* @private
* @param {(Array|TypedArray|Object)} out - output array
* @param {number} x - input value
* @returns {(Array|TypedArray|Object)} output array
*
* @example
* var pow = require( '@stdlib/math/base/special/pow' );
*
* var out = normalize( new Array( 2 ), 3.14e-319 );
* // returns [ 1.4141234400356668e-303, -52 ]
*
* var y = out[ 0 ];
* var exp = out[ 1 ];
*
* var bool = ( y*pow(2.0,exp) === 3.14e-319 );
* // returns true
*
* @example
* var out = normalize( new Array( 2 ), 0.0 );
* // returns [ 0.0, 0 ];
*
* @example
* var out = normalize( new Array( 2 ), Infinity );
* // returns [ Infinity, 0 ]
*
* @example
* var out = normalize( new Array( 2 ), -Infinity );
* // returns [ -Infinity, 0 ]
*
* @example
* var out = normalize( new Array( 2 ), NaN );
* // returns [ NaN, 0 ]
*/
function normalize( out, x ) {
	if ( isnan( x ) || isInfinite( x ) ) {
		out[ 0 ] = x;
		out[ 1 ] = 0;
		return out;
	}
	if ( x !== 0.0 && abs( x ) < FLOAT64_SMALLEST_NORMAL ) {
		out[ 0 ] = x * SCALAR;
		out[ 1 ] = -52;
		return out;
	}
	out[ 0 ] = x;
	out[ 1 ] = 0;
	return out;
}


// EXPORTS //

module.exports = normalize;

},{"@stdlib/constants/math/float64-smallest-normal":71,"@stdlib/math/base/assert/is-infinite":79,"@stdlib/math/base/assert/is-nan":83,"@stdlib/math/base/special/abs":107}],198:[function(require,module,exports){
arguments[4][189][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":29,"dup":189}],199:[function(require,module,exports){
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

},{"./main.js":200}],200:[function(require,module,exports){
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

},{"./high.js":198,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],201:[function(require,module,exports){
'use strict';

/**
* Set the less significant 32 bits of a double-precision floating-point number.
*
* @module @stdlib/number/float64/base/set-low-word
*
* @example
* var setLowWord = require( '@stdlib/number/float64/base/set-low-word' );
*
* var low = 5 >>> 0; // => 00000000000000000000000000000101
*
* var x = 3.14e201; // => 0 11010011100 01001000001011000011 10010011110010110101100010000010
*
* var y = setLowWord( x, low ); // => 0 11010011100 01001000001011000011 00000000000000000000000000000101
* // returns 3.139998651394392e+201
*
* @example
* var setLowWord = require( '@stdlib/number/float64/base/set-low-word' );
* var PINF = require( '@stdlib/constants/math/float64-pinf' );
* var NINF = require( '@stdlib/constants/math/float64-ninf' );
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

var setLowWord = require( './main.js' );


// EXPORTS //

module.exports = setLowWord;

},{"./main.js":203}],202:[function(require,module,exports){
arguments[4][193][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":29,"dup":193}],203:[function(require,module,exports){
'use strict';

// MODULES //

var Uint32Array = require( '@stdlib/array/uint32' );
var Float64Array = require( '@stdlib/array/float64' );
var LOW = require( './low.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );


// MAIN //

/**
* Sets the less significant 32 bits of a double-precision floating-point number.
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
* In which Uint32 can we find the lower order bits? If little endian, the first; if big endian, the second.
*
*
* ## References
*
* -   [Open Group][1]
*
* [1]: http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm
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
* var PINF = require( '@stdlib/constants/math/float64-pinf' );
* var NINF = require( '@stdlib/constants/math/float64-ninf' );
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
}


// EXPORTS //

module.exports = setLowWord;

},{"./low.js":202,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],204:[function(require,module,exports){
'use strict';

/**
* Split a floating-point number into a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* @module @stdlib/number/float64/base/to-words
*
* @example
* var toWords = require( '@stdlib/number/float64/base/to-words' );
*
* var w = toWords( 3.14e201 );
* // returns [ 1774486211, 2479577218 ]
*
* @example
* var Uint32Array = require( '@stdlib/array/uint32' );
* var toWords = require( '@stdlib/number/float64/base/to-words' );
*
* var out = new Uint32Array( 2 );
*
* var w = toWords( out, 3.14e201 );
* // returns <Uint32Array>[ 1774486211, 2479577218 ]
*
* var bool = ( w === out );
* // returns true
*/

// MODULES //

var toWords = require( './main.js' );


// EXPORTS //

module.exports = toWords;

},{"./main.js":206}],205:[function(require,module,exports){
arguments[4][187][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":29,"dup":187}],206:[function(require,module,exports){
'use strict';

// MODULES //

var fcn = require( './to_words.js' );


// MAIN //

/**
* Splits a floating-point number into a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* @param {(Array|TypedArray|Object)} [out] - output array
* @param {number} x - input value
* @returns {(Array|TypedArray|Object)} output array
*
* @example
* var w = toWords( 3.14e201 );
* // returns [ 1774486211, 2479577218 ]
*
* @example
* var Uint32Array = require( '@stdlib/array/uint32' );
*
* var out = new Uint32Array( 2 );
*
* var w = toWords( out, 3.14e201 );
* // returns <Uint32Array>[ 1774486211, 2479577218 ]
*
* var bool = ( w === out );
* // returns true
*/
function toWords( out, x ) {
	if ( arguments.length === 1 ) {
		return fcn( [ 0, 0 ], out );
	}
	return fcn( out, x );
}


// EXPORTS //

module.exports = toWords;

},{"./to_words.js":207}],207:[function(require,module,exports){
'use strict';

// MODULES //

var Uint32Array = require( '@stdlib/array/uint32' );
var Float64Array = require( '@stdlib/array/float64' );
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
*
* @private
* @param {(Array|TypedArray|Object)} out - output array
* @param {number} x - input value
* @returns {(Array|TypedArray|Object)} output array
*
* @example
* var Uint32Array = require( '@stdlib/array/uint32' );
*
* var out = new Uint32Array( 2 );
*
* var w = toWords( out, 3.14e201 );
* // returns <Uint32Array>[ 1774486211, 2479577218 ]
*
* var bool = ( w === out );
* // returns true
*/
function toWords( out, x ) {
	FLOAT64_VIEW[ 0 ] = x;
	out[ 0 ] = UINT32_VIEW[ HIGH ];
	out[ 1 ] = UINT32_VIEW[ LOW ];
	return out;
}


// EXPORTS //

module.exports = toWords;

},{"./indices.js":205,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],208:[function(require,module,exports){
'use strict';

/**
* Convert an unsigned 32-bit integer to a signed 32-bit integer.
*
* @module @stdlib/number/uint32/base/to-int32
*
* @example
* var float64ToUint32 = require( '@stdlib/number/float64/base/to-uint32' );
* var uint32ToInt32 = require( '@stdlib/number/uint32/base/to-int32' );
*
* var y = uint32ToInt32( float64ToUint32( 4294967295 ) );
* // returns -1
*
* y = uint32ToInt32( float64ToUint32( 3 ) );
* // returns 3
*/

// MODULES //

var uint32ToInt32 = require( './main.js' );


// EXPORTS //

module.exports = uint32ToInt32;

},{"./main.js":209}],209:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Converts an unsigned 32-bit integer to a signed 32-bit integer.
*
* @param {uinteger32} x - unsigned 32-bit integer
* @returns {integer32} signed 32-bit integer
*
* @example
* var float64ToUint32 = require( '@stdlib/number/float64/base/to-uint32' );
* var y = uint32ToInt32( float64ToUint32( 4294967295 ) );
* // returns -1
*
* @example
* var float64ToUint32 = require( '@stdlib/number/float64/base/to-uint32' );
* var y = uint32ToInt32( float64ToUint32( 3 ) );
* // returns 3
*/
function uint32ToInt32( x ) {
	// NOTE: we could also use typed-arrays to achieve the same end.
	return x|0; // asm type annotation
}


// EXPORTS //

module.exports = uint32ToInt32;

},{}],210:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":83}],211:[function(require,module,exports){
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

},{"./create_table.js":210,"@stdlib/assert/is-positive-integer":44,"@stdlib/constants/math/int32-max":73,"@stdlib/math/base/special/floor":119,"@stdlib/random/base/minstd":216,"@stdlib/utils/define-read-only-property":230}],212:[function(require,module,exports){
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

},{"./factory.js":211,"./minstd_shuffled.js":213,"@stdlib/utils/define-read-only-property":230}],213:[function(require,module,exports){
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

},{"./factory.js":211,"./rand_int32.js":214}],214:[function(require,module,exports){
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

},{"@stdlib/constants/math/int32-max":73,"@stdlib/math/base/special/floor":119}],215:[function(require,module,exports){
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

},{"./rand_int32.js":218,"@stdlib/assert/is-positive-integer":44,"@stdlib/constants/math/int32-max":73,"@stdlib/utils/define-read-only-property":230}],216:[function(require,module,exports){
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

},{"./factory.js":215,"./minstd.js":217,"@stdlib/utils/define-read-only-property":230}],217:[function(require,module,exports){
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

},{"./factory.js":215,"./rand_int32.js":218}],218:[function(require,module,exports){
arguments[4][214][0].apply(exports,arguments)
},{"@stdlib/constants/math/int32-max":73,"@stdlib/math/base/special/floor":119,"dup":214}],219:[function(require,module,exports){
module.exports={
	"name": "minstd-shuffle"
}

},{}],220:[function(require,module,exports){
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

},{"./defaults.json":219,"./prngs.js":222,"@stdlib/assert/has-own-property":14,"@stdlib/assert/is-plain-object":41,"@stdlib/utils/define-read-only-property":230}],221:[function(require,module,exports){
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

},{"./factory.js":220,"./uniform.js":223,"@stdlib/utils/define-read-only-property":230}],222:[function(require,module,exports){
'use strict';

// MAIN //

var prngs = {};

prngs[ 'minstd' ] = require( '@stdlib/random/base/minstd' );
prngs[ 'minstd-shuffle' ] = require( '@stdlib/random/base/minstd-shuffle' );


// EXPORTS //

module.exports = prngs;

},{"@stdlib/random/base/minstd":216,"@stdlib/random/base/minstd-shuffle":212}],223:[function(require,module,exports){
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

},{"./factory.js":220}],224:[function(require,module,exports){
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

},{}],225:[function(require,module,exports){
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
	}
}


// EXPORTS //

module.exports = wrap;

},{}],226:[function(require,module,exports){
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

},{"./constant_function.js":225}],227:[function(require,module,exports){
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

},{"@stdlib/assert/is-buffer":17,"@stdlib/regexp/function-name":224,"@stdlib/utils/native-class":253}],228:[function(require,module,exports){
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

},{"./constructor_name.js":227}],229:[function(require,module,exports){
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

},{}],230:[function(require,module,exports){
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

},{"./define_read_only_property.js":229}],231:[function(require,module,exports){
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

},{"./float64array.js":232,"@stdlib/assert/is-float64array":19}],232:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Float64Array === 'function' ) ? Float64Array : null;

},{}],233:[function(require,module,exports){
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

},{"./detect_float64array_support.js":231}],234:[function(require,module,exports){
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

},{}],235:[function(require,module,exports){
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

},{"./detect_symbol_support.js":234}],236:[function(require,module,exports){
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

},{"@stdlib/utils/detect-symbol-support":235}],237:[function(require,module,exports){
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

},{"./has_tostringtag_support.js":236}],238:[function(require,module,exports){
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

},{"./uint16array.js":240,"@stdlib/assert/is-uint16array":47,"@stdlib/constants/math/uint16-max":74}],239:[function(require,module,exports){
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

},{"./detect_uint16array_support.js":238}],240:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint16Array === 'function' ) ? Uint16Array : null;

},{}],241:[function(require,module,exports){
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

},{"./uint32array.js":243,"@stdlib/assert/is-uint32array":49,"@stdlib/constants/math/uint32-max":75}],242:[function(require,module,exports){
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

},{"./detect_uint32array_support.js":241}],243:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint32Array === 'function' ) ? Uint32Array : null;

},{}],244:[function(require,module,exports){
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

},{"./uint8array.js":246,"@stdlib/assert/is-uint8array":51,"@stdlib/constants/math/uint8-max":76}],245:[function(require,module,exports){
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

},{"./detect_uint8array_support.js":244}],246:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint8Array === 'function' ) ? Uint8Array : null;

},{}],247:[function(require,module,exports){
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

},{"./native.js":250,"./polyfill.js":251,"@stdlib/assert/is-function":21}],248:[function(require,module,exports){
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

},{"./detect.js":247}],249:[function(require,module,exports){
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

},{"./get_prototype_of.js":248}],250:[function(require,module,exports){
'use strict';

// MAIN //

var getProto = Object.getPrototypeOf;


// EXPORTS //

module.exports = getProto;

},{}],251:[function(require,module,exports){
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

},{"./proto.js":252,"@stdlib/utils/native-class":253}],252:[function(require,module,exports){
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

},{}],253:[function(require,module,exports){
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

},{"./native_class.js":254,"./polyfill.js":255,"@stdlib/utils/detect-tostringtag-support":237}],254:[function(require,module,exports){
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

},{"./tostring.js":256}],255:[function(require,module,exports){
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

},{"./tostring.js":256,"./tostringtag.js":257,"@stdlib/assert/has-own-property":14}],256:[function(require,module,exports){
'use strict';

// MAIN //

var toStr = Object.prototype.toString;


// EXPORTS //

module.exports = toStr;

},{}],257:[function(require,module,exports){
'use strict';

// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{}],258:[function(require,module,exports){
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

},{"./fixtures/nodelist.js":259,"./fixtures/re.js":260,"./fixtures/typedarray.js":261}],259:[function(require,module,exports){
'use strict';

// MODULES //

var root = require( 'system.global' )(); // eslint-disable-line stdlib/no-redeclare


// MAIN //

var nodeList = root.document && root.document.childNodes;


// EXPORTS //

module.exports = nodeList;

},{"system.global":320}],260:[function(require,module,exports){
'use strict';

var RE = /./;


// EXPORTS //

module.exports = RE;

},{}],261:[function(require,module,exports){
'use strict';

var typedarray = Int8Array;


// EXPORTS //

module.exports = typedarray;

},{}],262:[function(require,module,exports){
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

},{"./check.js":258,"./polyfill.js":263,"./typeof.js":264}],263:[function(require,module,exports){
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

},{"@stdlib/utils/constructor-name":228}],264:[function(require,module,exports){
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

},{"@stdlib/utils/constructor-name":228}],265:[function(require,module,exports){
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

},{}],266:[function(require,module,exports){

},{}],267:[function(require,module,exports){
arguments[4][266][0].apply(exports,arguments)
},{"dup":266}],268:[function(require,module,exports){
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

},{}],269:[function(require,module,exports){
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

},{"base64-js":265,"ieee754":288}],270:[function(require,module,exports){
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
},{"../../is-buffer/index.js":290}],271:[function(require,module,exports){
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

},{"./lib/is_arguments.js":272,"./lib/keys.js":273}],272:[function(require,module,exports){
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

},{}],273:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],274:[function(require,module,exports){
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

},{"foreach":284,"object-keys":294}],275:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],276:[function(require,module,exports){
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

},{"./helpers/isFinite":277,"./helpers/isNaN":278,"./helpers/mod":279,"./helpers/sign":280,"es-to-primitive/es5":281,"has":287,"is-callable":291}],277:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],278:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],279:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],280:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],281:[function(require,module,exports){
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

},{"./helpers/isPrimitive":282,"is-callable":291}],282:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],283:[function(require,module,exports){
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

},{}],284:[function(require,module,exports){

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


},{}],285:[function(require,module,exports){
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

},{}],286:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":285}],287:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":286}],288:[function(require,module,exports){
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

},{}],289:[function(require,module,exports){
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

},{}],290:[function(require,module,exports){
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

},{}],291:[function(require,module,exports){
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

},{}],292:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],293:[function(require,module,exports){
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

},{}],294:[function(require,module,exports){
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

},{"./isArguments":295}],295:[function(require,module,exports){
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

},{}],296:[function(require,module,exports){
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
},{"_process":268}],297:[function(require,module,exports){
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
},{"_process":268}],298:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":299}],299:[function(require,module,exports){
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
},{"./_stream_readable":301,"./_stream_writable":303,"core-util-is":270,"inherits":289,"process-nextick-args":297}],300:[function(require,module,exports){
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
},{"./_stream_transform":302,"core-util-is":270,"inherits":289}],301:[function(require,module,exports){
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
},{"./_stream_duplex":299,"./internal/streams/BufferList":304,"./internal/streams/destroy":305,"./internal/streams/stream":306,"_process":268,"core-util-is":270,"events":283,"inherits":289,"isarray":292,"process-nextick-args":297,"safe-buffer":312,"string_decoder/":318,"util":266}],302:[function(require,module,exports){
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
},{"./_stream_duplex":299,"core-util-is":270,"inherits":289}],303:[function(require,module,exports){
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
},{"./_stream_duplex":299,"./internal/streams/destroy":305,"./internal/streams/stream":306,"_process":268,"core-util-is":270,"inherits":289,"process-nextick-args":297,"safe-buffer":312,"util-deprecate":329}],304:[function(require,module,exports){
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
},{"safe-buffer":312}],305:[function(require,module,exports){
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
},{"process-nextick-args":297}],306:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":283}],307:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":308}],308:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":299,"./lib/_stream_passthrough.js":300,"./lib/_stream_readable.js":301,"./lib/_stream_transform.js":302,"./lib/_stream_writable.js":303}],309:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":308}],310:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":303}],311:[function(require,module,exports){
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
},{"_process":268,"through":328}],312:[function(require,module,exports){
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

},{"buffer":269}],313:[function(require,module,exports){
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

},{"events":283,"inherits":289,"readable-stream/duplex.js":298,"readable-stream/passthrough.js":307,"readable-stream/readable.js":308,"readable-stream/transform.js":309,"readable-stream/writable.js":310}],314:[function(require,module,exports){
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

},{"es-abstract/es5":276,"function-bind":286}],315:[function(require,module,exports){
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

},{"./implementation":314,"./polyfill":316,"./shim":317,"define-properties":274,"function-bind":286}],316:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":314}],317:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":316,"define-properties":274}],318:[function(require,module,exports){
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
},{"safe-buffer":312}],319:[function(require,module,exports){
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
},{}],320:[function(require,module,exports){
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

},{"./implementation":319,"./polyfill":321,"./shim":322,"define-properties":274}],321:[function(require,module,exports){
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
},{"./implementation":319}],322:[function(require,module,exports){
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
},{"./polyfill":321,"define-properties":274}],323:[function(require,module,exports){
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
},{"./lib/default_stream":324,"./lib/results":326,"./lib/test":327,"_process":268,"defined":275,"through":328}],324:[function(require,module,exports){
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
},{"_process":268,"fs":267,"through":328}],325:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":268}],326:[function(require,module,exports){
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
},{"_process":268,"events":283,"function-bind":286,"has":287,"inherits":289,"object-inspect":293,"resumer":311,"through":328}],327:[function(require,module,exports){
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
},{"./next_tick":325,"deep-equal":271,"defined":275,"events":283,"has":287,"inherits":289,"path":296,"string.prototype.trim":315}],328:[function(require,module,exports){
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
},{"_process":268,"stream":313}],329:[function(require,module,exports){
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
},{}]},{},[95,96,97]);
