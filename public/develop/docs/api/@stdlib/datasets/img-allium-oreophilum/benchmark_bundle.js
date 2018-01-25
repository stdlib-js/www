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

var ctor = ( typeof Float32Array === 'function' ) ? Float32Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{}],2:[function(require,module,exports){
'use strict';

/**
* Typed array constructor which returns a typed array representing an array of single-precision floating-point numbers in the platform byte order.
*
* @module @stdlib/array/float32
*
* @example
* var ctor = require( '@stdlib/array/float32' );
*
* var arr = new ctor( 10 );
* // returns <Float32Array>
*/

// MODULES //

var hasFloat32ArraySupport = require( '@stdlib/utils/detect-float32array-support' );
var builtin = require( './float32array.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var ctor;
if ( hasFloat32ArraySupport() ) {
	ctor = builtin;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;

},{"./float32array.js":1,"./polyfill.js":3,"@stdlib/utils/detect-float32array-support":255}],3:[function(require,module,exports){
'use strict';

// TODO: write polyfill

// MAIN //

/**
* Typed array which represents an array of single-precision floating-point numbers in the platform byte order.
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

// MAIN //

var ctor = ( typeof Float64Array === 'function' ) ? Float64Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{}],5:[function(require,module,exports){
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

},{"./float64array.js":4,"./polyfill.js":6,"@stdlib/utils/detect-float64array-support":258}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
'use strict';

/**
* Typed array constructor which returns a typed array representing an array of twos-complement 16-bit signed integers in the platform byte order.
*
* @module @stdlib/array/int16
*
* @example
* var ctor = require( '@stdlib/array/int16' );
*
* var arr = new ctor( 10 );
* // returns <Int16Array>
*/

// MODULES //

var hasInt16ArraySupport = require( '@stdlib/utils/detect-int16array-support' );
var builtin = require( './int16array.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var ctor;
if ( hasInt16ArraySupport() ) {
	ctor = builtin;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;

},{"./int16array.js":8,"./polyfill.js":9,"@stdlib/utils/detect-int16array-support":260}],8:[function(require,module,exports){
'use strict';

// MAIN //

var ctor = ( typeof Int16Array === 'function' ) ? Int16Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{}],9:[function(require,module,exports){
'use strict';

// TODO: write polyfill

// MAIN //

/**
* Typed array which represents an array of twos-complement 16-bit signed integers in the platform byte order.
*
* @throws {Error} not implemented
*/
function polyfill() {
	throw new Error( 'not implemented' );
}


// EXPORTS //

module.exports = polyfill;

},{}],10:[function(require,module,exports){
'use strict';

/**
* Typed array constructor which returns a typed array representing an array of twos-complement 32-bit signed integers in the platform byte order.
*
* @module @stdlib/array/int32
*
* @example
* var ctor = require( '@stdlib/array/int32' );
*
* var arr = new ctor( 10 );
* // returns <Int32Array>
*/

// MODULES //

var hasInt32ArraySupport = require( '@stdlib/utils/detect-int32array-support' );
var builtin = require( './int32array.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var ctor;
if ( hasInt32ArraySupport() ) {
	ctor = builtin;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;

},{"./int32array.js":11,"./polyfill.js":12,"@stdlib/utils/detect-int32array-support":263}],11:[function(require,module,exports){
'use strict';

// MAIN //

var ctor = ( typeof Int32Array === 'function' ) ? Int32Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{}],12:[function(require,module,exports){
'use strict';

// TODO: write polyfill

// MAIN //

/**
* Typed array which represents an array of twos-complement 32-bit signed integers in the platform byte order.
*
* @throws {Error} not implemented
*/
function polyfill() {
	throw new Error( 'not implemented' );
}


// EXPORTS //

module.exports = polyfill;

},{}],13:[function(require,module,exports){
'use strict';

/**
* Typed array constructor which returns a typed array representing an array of twos-complement 8-bit signed integers in the platform byte order.
*
* @module @stdlib/array/int8
*
* @example
* var ctor = require( '@stdlib/array/int8' );
*
* var arr = new ctor( 10 );
* // returns <Int8Array>
*/

// MODULES //

var hasInt8ArraySupport = require( '@stdlib/utils/detect-int8array-support' );
var builtin = require( './int8array.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var ctor;
if ( hasInt8ArraySupport() ) {
	ctor = builtin;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;

},{"./int8array.js":14,"./polyfill.js":15,"@stdlib/utils/detect-int8array-support":266}],14:[function(require,module,exports){
'use strict';

// MAIN //

var ctor = ( typeof Int8Array === 'function' ) ? Int8Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{}],15:[function(require,module,exports){
'use strict';

// TODO: write polyfill

// MAIN //

/**
* Typed array which represents an array of twos-complement 8-bit signed integers in the platform byte order.
*
* @throws {Error} not implemented
*/
function polyfill() {
	throw new Error( 'not implemented' );
}


// EXPORTS //

module.exports = polyfill;

},{}],16:[function(require,module,exports){
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

},{"./polyfill.js":17,"./uint16array.js":18,"@stdlib/utils/detect-uint16array-support":276}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
'use strict';

// MAIN //

var ctor = ( typeof Uint16Array === 'function' ) ? Uint16Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{}],19:[function(require,module,exports){
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

},{"./polyfill.js":20,"./uint32array.js":21,"@stdlib/utils/detect-uint32array-support":279}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
'use strict';

// MAIN //

var ctor = ( typeof Uint32Array === 'function' ) ? Uint32Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{}],22:[function(require,module,exports){
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

},{"./polyfill.js":23,"./uint8array.js":24,"@stdlib/utils/detect-uint8array-support":282}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
'use strict';

// MAIN //

var ctor = ( typeof Uint8Array === 'function' ) ? Uint8Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{}],25:[function(require,module,exports){
'use strict';

/**
* Typed array constructor which returns a typed array representing an array of 8-bit unsigned integers in the platform byte order clamped to 0-255.
*
* @module @stdlib/array/uint8c
*
* @example
* var ctor = require( '@stdlib/array/uint8c' );
*
* var arr = new ctor( 10 );
* // returns <Uint8ClampedArray>
*/

// MODULES //

var hasUint8ClampedArraySupport = require( '@stdlib/utils/detect-uint8clampedarray-support' ); // eslint-disable-line id-length
var builtin = require( './uint8clampedarray.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var ctor;
if ( hasUint8ClampedArraySupport() ) {
	ctor = builtin;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;

},{"./polyfill.js":26,"./uint8clampedarray.js":27,"@stdlib/utils/detect-uint8clampedarray-support":285}],26:[function(require,module,exports){
'use strict';

// TODO: write polyfill

// MAIN //

/**
* Typed array which represents an array of 8-bit unsigned integers in the platform byte order clamped to 0-255.
*
* @throws {Error} not implemented
*/
function polyfill() {
	throw new Error( 'not implemented' );
}


// EXPORTS //

module.exports = polyfill;

},{}],27:[function(require,module,exports){
'use strict';

// MAIN //

var ctor = ( typeof Uint8ClampedArray === 'function' ) ? Uint8ClampedArray : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{}],28:[function(require,module,exports){
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

},{}],29:[function(require,module,exports){
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

},{"./has_own_property.js":28}],30:[function(require,module,exports){
'use strict';

/**
* Test if a value is an array-like object.
*
* @module @stdlib/assert/is-array-like-object
*
* @example
* var isArrayLikeObject = require( '@stdlib/assert/is-array-like-object' );
*
* var bool = isArrayLikeObject( [] );
* // returns true
*
* bool = isArrayLikeObject( { 'length':10 } );
* // returns true
*
* bool = isArrayLikeObject( 'beep' );
* // returns false
*/

// MODULES //

var isArrayLikeObject = require( './is_array_like_object.js' );


// EXPORTS //

module.exports = isArrayLikeObject;

},{"./is_array_like_object.js":31}],31:[function(require,module,exports){
'use strict';

// MODULES //

var isInteger = require( '@stdlib/math/base/assert/is-integer' );
var MAX_LENGTH = require( '@stdlib/constants/array/max-array-length' );


// MAIN //

/**
* Tests if a value is an array-like object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is an array-like object
*
* @example
* var bool = isArrayLikeObject( [] );
* // returns true
*
* @example
* var bool = isArrayLikeObject( { 'length':10 } );
* // returns true
*
* @example
* var bool = isArrayLikeObject( 'beep' );
* // returns false
*/
function isArrayLikeObject( value ) {
	return (
		typeof value === 'object' &&
		value !== null &&
		typeof value.length === 'number' &&
		isInteger( value.length ) &&
		value.length >= 0 &&
		value.length <= MAX_LENGTH
	);
}


// EXPORTS //

module.exports = isArrayLikeObject;

},{"@stdlib/constants/array/max-array-length":181,"@stdlib/math/base/assert/is-integer":203}],32:[function(require,module,exports){
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

},{"./is_array_like.js":33}],33:[function(require,module,exports){
'use strict';

// MODULES //

var isInteger = require( '@stdlib/math/base/assert/is-integer' );
var MAX_LENGTH = require( '@stdlib/constants/array/max-array-length' );


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
}


// EXPORTS //

module.exports = isArrayLike;

},{"@stdlib/constants/array/max-array-length":181,"@stdlib/math/base/assert/is-integer":203}],34:[function(require,module,exports){
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

},{"./is_array.js":35}],35:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":303}],36:[function(require,module,exports){
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
}


// EXPORTS //

module.exports = isBoolean;

},{"./object.js":38,"./primitive.js":39}],37:[function(require,module,exports){
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

},{"./generic.js":36,"./object.js":38,"./primitive.js":39,"@stdlib/utils/define-read-only-property":252}],38:[function(require,module,exports){
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
}


// EXPORTS //

module.exports = isBoolean;

},{"./try2serialize.js":41,"@stdlib/utils/detect-tostringtag-support":274,"@stdlib/utils/native-class":303}],39:[function(require,module,exports){
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
}


// EXPORTS //

module.exports = isBoolean;

},{}],40:[function(require,module,exports){
'use strict';

// eslint-disable-next-line stdlib/no-redeclare
var toString = Boolean.prototype.toString; // non-generic


// EXPORTS //

module.exports = toString;

},{}],41:[function(require,module,exports){
'use strict';

// MODULES //

var toString = require( './tostring.js' ); // eslint-disable-line stdlib/no-redeclare


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
}


// EXPORTS //

module.exports = test;

},{"./tostring.js":40}],42:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = true;

},{}],43:[function(require,module,exports){
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

},{"./is_buffer.js":44}],44:[function(require,module,exports){
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

},{"@stdlib/assert/is-object-like":92}],45:[function(require,module,exports){
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

},{"./is_error.js":46}],46:[function(require,module,exports){
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
}


// EXPORTS //

module.exports = isError;

},{"@stdlib/utils/get-prototype-of":291,"@stdlib/utils/native-class":303}],47:[function(require,module,exports){
'use strict';

/**
* Test if a value is a Float32Array.
*
* @module @stdlib/assert/is-float32array
*
* @example
* var isFloat32Array = require( '@stdlib/assert/is-float32array' );
*
* var bool = isFloat32Array( new Float32Array( 10 ) );
* // returns true
*
* bool = isFloat32Array( [] );
* // returns false
*/

// MODULES //

var isFloat32Array = require( './is_float32array.js' );


// EXPORTS //

module.exports = isFloat32Array;

},{"./is_float32array.js":48}],48:[function(require,module,exports){
'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );


// MAIN //

/**
* Tests if a value is a Float32Array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a Float32Array
*
* @example
* var bool = isFloat32Array( new Float32Array( 10 ) );
* // returns true
*
* @example
* var bool = isFloat32Array( [] );
* // returns false
*/
function isFloat32Array( value ) {
	return ( nativeClass( value ) === '[object Float32Array]' );
}


// EXPORTS //

module.exports = isFloat32Array;

},{"@stdlib/utils/native-class":303}],49:[function(require,module,exports){
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

},{"./is_float64array.js":50}],50:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":303}],51:[function(require,module,exports){
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

},{"./is_function.js":52}],52:[function(require,module,exports){
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

},{"@stdlib/utils/type-of":320}],53:[function(require,module,exports){
'use strict';

/**
* Test if a value is an Int16Array.
*
* @module @stdlib/assert/is-int16array
*
* @example
* var isInt16Array = require( '@stdlib/assert/is-int16array' );
*
* var bool = isInt16Array( new Int16Array( 10 ) );
* // returns true
*
* bool = isInt16Array( [] );
* // returns false
*/

// MODULES //

var isInt16Array = require( './is_int16array.js' );


// EXPORTS //

module.exports = isInt16Array;

},{"./is_int16array.js":54}],54:[function(require,module,exports){
'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );


// MAIN //

/**
* Tests if a value is an Int16Array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is an Int16Array
*
* @example
* var bool = isInt16Array( new Int16Array( 10 ) );
* // returns true
*
* @example
* var bool = isInt16Array( [] );
* // returns false
*/
function isInt16Array( value ) {
	return ( nativeClass( value ) === '[object Int16Array]' );
}


// EXPORTS //

module.exports = isInt16Array;

},{"@stdlib/utils/native-class":303}],55:[function(require,module,exports){
'use strict';

/**
* Test if a value is an Int32Array.
*
* @module @stdlib/assert/is-int32array
*
* @example
* var isInt32Array = require( '@stdlib/assert/is-int32array' );
*
* var bool = isInt32Array( new Int32Array( 10 ) );
* // returns true
*
* bool = isInt32Array( [] );
* // returns false
*/

// MODULES //

var isInt32Array = require( './is_int32array.js' );


// EXPORTS //

module.exports = isInt32Array;

},{"./is_int32array.js":56}],56:[function(require,module,exports){
'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );


// MAIN //

/**
* Tests if a value is an Int32Array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is an Int32Array
*
* @example
* var bool = isInt32Array( new Int32Array( 10 ) );
* // returns true
*
* @example
* var bool = isInt32Array( [] );
* // returns false
*/
function isInt32Array( value ) {
	return ( nativeClass( value ) === '[object Int32Array]' );
}


// EXPORTS //

module.exports = isInt32Array;

},{"@stdlib/utils/native-class":303}],57:[function(require,module,exports){
'use strict';

/**
* Test if a value is an Int8Array.
*
* @module @stdlib/assert/is-int8array
*
* @example
* var isInt8Array = require( '@stdlib/assert/is-int8array' );
*
* var bool = isInt8Array( new Int8Array( 10 ) );
* // returns true
*
* bool = isInt8Array( [] );
* // returns false
*/

// MODULES //

var isInt8Array = require( './is_int8array.js' );


// EXPORTS //

module.exports = isInt8Array;

},{"./is_int8array.js":58}],58:[function(require,module,exports){
'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );


// MAIN //

/**
* Tests if a value is an Int8Array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is an Int8Array
*
* @example
* var bool = isInt8Array( new Int8Array( 10 ) );
* // returns true
*
* @example
* var bool = isInt8Array( [] );
* // returns false
*/
function isInt8Array( value ) {
	return ( nativeClass( value ) === '[object Int8Array]' );
}


// EXPORTS //

module.exports = isInt8Array;

},{"@stdlib/utils/native-class":303}],59:[function(require,module,exports){
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

},{"./object.js":62,"./primitive.js":63}],60:[function(require,module,exports){
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

},{"./generic.js":59,"./object.js":62,"./primitive.js":63,"@stdlib/utils/define-read-only-property":252}],61:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-ninf":185,"@stdlib/constants/math/float64-pinf":186,"@stdlib/math/base/assert/is-integer":203}],62:[function(require,module,exports){
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

},{"./integer.js":61,"@stdlib/assert/is-number":87}],63:[function(require,module,exports){
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

},{"./integer.js":61,"@stdlib/assert/is-number":87}],64:[function(require,module,exports){
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

},{"@stdlib/array/uint16":16,"@stdlib/array/uint8":22}],65:[function(require,module,exports){
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

},{"./is_little_endian.js":66}],66:[function(require,module,exports){
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

},{"./ctors.js":64}],67:[function(require,module,exports){
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
}


// EXPORTS //

module.exports = isnan;

},{"./object.js":69,"./primitive.js":70}],68:[function(require,module,exports){
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

},{"./generic.js":67,"./object.js":69,"./primitive.js":70,"@stdlib/utils/define-read-only-property":252}],69:[function(require,module,exports){
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
}


// EXPORTS //

module.exports = isnan;

},{"@stdlib/assert/is-number":87,"@stdlib/math/base/assert/is-nan":205}],70:[function(require,module,exports){
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
}


// EXPORTS //

module.exports = isnan;

},{"@stdlib/assert/is-number":87,"@stdlib/math/base/assert/is-nan":205}],71:[function(require,module,exports){
'use strict';

/**
* Test if a value is Node stream-like.
*
* @module @stdlib/assert/is-node-stream-like
*
* @example
* var transformStream = require( '@stdlib/streams/utils/transform' );
* var isNodeStreamLike = require( '@stdlib/assert/is-node-stream-like' );
*
* var stream = transformStream();
*
* var bool = isNodeStreamLike( stream );
* // returns true
*
* bool = isNodeStreamLike( {} );
* // returns false
*/

// MODULES //

var isNodeStreamLike = require( './is_stream_like.js' );


// EXPORTS //

module.exports = isNodeStreamLike;

},{"./is_stream_like.js":72}],72:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Tests if a value is Node stream-like.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is Node stream-like
*
* @example
* var transformStream = require( '@stdlib/streams/utils/transform' );
*
* var stream = transformStream();
*
* var bool = isNodeStreamLike( stream );
* // returns true
*
* bool = isNodeStreamLike( {} );
* // returns false
*/
function isNodeStreamLike( value ) {
	return (
		// Must be an object:
		value !== null &&
		typeof value === 'object' &&

		// Should be an event emitter:
		typeof value.on === 'function' &&
		typeof value.once === 'function' &&
		typeof value.emit === 'function' &&
		typeof value.addListener === 'function' &&
		typeof value.removeListener === 'function' &&
		typeof value.removeAllListeners === 'function' &&

		// Should have a `pipe` method (Node streams inherit from `Stream`, including writable streams):
		typeof value.pipe === 'function'
	);
}


// EXPORTS //

module.exports = isNodeStreamLike;

},{}],73:[function(require,module,exports){
'use strict';

/**
* Test if a value is Node writable stream-like.
*
* @module @stdlib/assert/is-node-writable-stream-like
*
* @example
* var transformStream = require( '@stdlib/streams/utils/transform' );
* var isNodeWritableStreamLike = require( '@stdlib/assert/is-node-writable-stream-like' );
*
* var stream = transformStream();
*
* var bool = isNodeWritableStreamLike( stream );
* // returns true
*
* bool = isNodeWritableStreamLike( {} );
* // returns false
*/

// MODULES //

var isNodeWritableStreamLike = require( './is_writable_stream_like.js' );


// EXPORTS //

module.exports = isNodeWritableStreamLike;

},{"./is_writable_stream_like.js":74}],74:[function(require,module,exports){
/* eslint-disable no-underscore-dangle */
'use strict';

// MODULES //

var isNodeStreamLike = require( '@stdlib/assert/is-node-stream-like' );


// MAIN //

/**
* Tests if a value is Node writable stream-like.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is Node writable stream-like
*
* @example
* var transformStream = require( '@stdlib/streams/utils/transform' );
*
* var stream = transformStream();
*
* var bool = isNodeWritableStreamLike( stream );
* // returns true
*
* bool = isNodeWritableStreamLike( {} );
* // returns false
*/
function isNodeWritableStreamLike( value ) {
	return (
		// Must be stream-like:
		isNodeStreamLike( value ) &&

		// Should have writable stream methods:
		typeof value._write === 'function' &&

		// Should have writable stream state:
		typeof value._writableState === 'object'
	);
}


// EXPORTS //

module.exports = isNodeWritableStreamLike;

},{"@stdlib/assert/is-node-stream-like":71}],75:[function(require,module,exports){
'use strict';

/**
* Test if a value is an array-like object containing only nonnegative integers.
*
* @module @stdlib/assert/is-nonnegative-integer-array
*
* @example
* var isNonNegativeIntegerArray = require( '@stdlib/assert/is-nonnegative-integer-array' );
*
* var bool = isNonNegativeIntegerArray( [ 3.0, new Number(3.0) ] );
* // returns true
*
* bool = isNonNegativeIntegerArray( [ 3.0, '3.0' ] );
* // returns false
*
* @example
* // Use interface to check for primitives...
* var isNonNegativeIntegerArray = require( '@stdlib/assert/is-nonnegative-integer-array' ).primitives;
*
* var bool = isNonNegativeIntegerArray( [ 1.0, 0.0, 10.0 ] );
* // returns true
*
* bool = isNonNegativeIntegerArray( [ 3.0, new Number(1.0) ] );
* // returns false
*
* @example
* // Use interface to check for objects...
* var isNonNegativeIntegerArray = require( '@stdlib/assert/is-nonnegative-integer-array' ).objects;
*
* var bool = isNonNegativeIntegerArray( [ new Number(3.0), new Number(1.0) ] );
* // returns true
*
* bool = isNonNegativeIntegerArray( [ 1.0, 0.0, 10.0 ] );
* // returns false
*/

// MODULES //

var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' );
var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var arrayfun = require( '@stdlib/assert/tools/array-like-function' );


// MAIN //

var isNonNegativeIntegerArray = arrayfun( isNonNegativeInteger );
setReadOnly( isNonNegativeIntegerArray, 'primitives', arrayfun( isNonNegativeInteger.isPrimitive ) );
setReadOnly( isNonNegativeIntegerArray, 'objects', arrayfun( isNonNegativeInteger.isObject ) );


// EXPORTS //

module.exports = isNonNegativeIntegerArray;

},{"@stdlib/assert/is-nonnegative-integer":77,"@stdlib/assert/tools/array-like-function":124,"@stdlib/utils/define-read-only-property":252}],76:[function(require,module,exports){
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
}


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"./object.js":78,"./primitive.js":79}],77:[function(require,module,exports){
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

},{"./generic.js":76,"./object.js":78,"./primitive.js":79,"@stdlib/utils/define-read-only-property":252}],78:[function(require,module,exports){
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
}


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"@stdlib/assert/is-integer":60}],79:[function(require,module,exports){
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
}


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"@stdlib/assert/is-integer":60}],80:[function(require,module,exports){
'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is a nonnegative number.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a nonnegative number
*
* @example
* var bool = isNonNegativeNumber( 5.0 );
* // returns true
*
* @example
* var bool = isNonNegativeNumber( new Number( 5.0 ) );
* // returns true
*
* @example
* var bool = isNonNegativeNumber( 3.14 );
* // returns true
*
* @example
* var bool = isNonNegativeNumber( -5.0 );
* // returns false
*
* @example
* var bool = isNonNegativeNumber( null );
* // returns false
*/
function isNonNegativeNumber( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
}


// EXPORTS //

module.exports = isNonNegativeNumber;

},{"./object.js":82,"./primitive.js":83}],81:[function(require,module,exports){
'use strict';

/**
* Test if a value is a nonnegative number.
*
* @module @stdlib/assert/is-nonnegative-number
*
* @example
* var isNonNegativeNumber = require( '@stdlib/assert/is-nonnegative-number' );
*
* var bool = isNonNegativeNumber( 5.0 );
* // returns true
*
* bool = isNonNegativeNumber( new Number( 5.0 ) );
* // returns true
*
* bool = isNonNegativeNumber( 3.14 );
* // returns true
*
* bool = isNonNegativeNumber( -5.0 );
* // returns false
*
* bool = isNonNegativeNumber( null );
* // returns false
*
* @example
* // Use interface to check for nonnegative number primitives...
* var isNonNegativeNumber = require( '@stdlib/assert/is-nonnegative-number' ).isPrimitive;
*
* var bool = isNonNegativeNumber( 3.0 );
* // returns true
*
* bool = isNonNegativeNumber( new Number( 3.0 ) );
* // returns false
*
* @example
* // Use interface to check for nonnegative number objects...
* var isNonNegativeNumber = require( '@stdlib/assert/is-nonnegative-number' ).isObject;
*
* var bool = isNonNegativeNumber( 3.0 );
* // returns false
*
* bool = isNonNegativeNumber( new Number( 3.0 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isNonNegativeNumber = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isNonNegativeNumber, 'isPrimitive', isPrimitive );
setReadOnly( isNonNegativeNumber, 'isObject', isObject );


// EXPORTS //

module.exports = isNonNegativeNumber;

},{"./generic.js":80,"./object.js":82,"./primitive.js":83,"@stdlib/utils/define-read-only-property":252}],82:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isObject;


// MAIN //

/**
* Tests if a value is a number object having a nonnegative value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object having a nonnegative number value
*
* @example
* var bool = isNonNegativeNumber( 3.0 );
* // returns false
*
* @example
* var bool = isNonNegativeNumber( new Number( 3.0 ) );
* // returns true
*/
function isNonNegativeNumber( value ) {
	return (
		isNumber( value ) &&
		value.valueOf() >= 0.0
	);
}


// EXPORTS //

module.exports = isNonNegativeNumber;

},{"@stdlib/assert/is-number":87}],83:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;


// MAIN //

/**
* Tests if a value is a number primitive having a nonnegative value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number primitive having a nonnegative number value
*
* @example
* var bool = isNonNegativeNumber( 3.0 );
* // returns true
*
* @example
* var bool = isNonNegativeNumber( new Number( 3.0 ) );
* // returns false
*/
function isNonNegativeNumber( value ) {
	return (
		isNumber( value ) &&
		value >= 0.0
	);
}


// EXPORTS //

module.exports = isNonNegativeNumber;

},{"@stdlib/assert/is-number":87}],84:[function(require,module,exports){
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

},{"./is_null.js":85}],85:[function(require,module,exports){
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
}


// EXPORTS //

module.exports = isNull;

},{}],86:[function(require,module,exports){
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

},{"./object.js":88,"./primitive.js":89}],87:[function(require,module,exports){
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

},{"./generic.js":86,"./object.js":88,"./primitive.js":89,"@stdlib/utils/define-read-only-property":252}],88:[function(require,module,exports){
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

},{"./try2serialize.js":91,"@stdlib/utils/detect-tostringtag-support":274,"@stdlib/utils/native-class":303}],89:[function(require,module,exports){
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

},{}],90:[function(require,module,exports){
'use strict';

// eslint-disable-next-line stdlib/no-redeclare
var toString = Number.prototype.toString; // non-generic


// EXPORTS //

module.exports = toString;

},{}],91:[function(require,module,exports){
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

},{"./tostring.js":90}],92:[function(require,module,exports){
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

},{"./is_object_like.js":93,"@stdlib/assert/tools/array-function":122,"@stdlib/utils/define-read-only-property":252}],93:[function(require,module,exports){
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

},{}],94:[function(require,module,exports){
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

},{"./is_object.js":95}],95:[function(require,module,exports){
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

},{"@stdlib/assert/is-array":34}],96:[function(require,module,exports){
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

},{"./is_plain_object.js":97}],97:[function(require,module,exports){
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

},{"@stdlib/assert/has-own-property":29,"@stdlib/assert/is-function":51,"@stdlib/assert/is-object":94,"@stdlib/utils/get-prototype-of":291,"@stdlib/utils/native-class":303}],98:[function(require,module,exports){
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

},{"./object.js":100,"./primitive.js":101}],99:[function(require,module,exports){
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

},{"./generic.js":98,"./object.js":100,"./primitive.js":101,"@stdlib/utils/define-read-only-property":252}],100:[function(require,module,exports){
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

},{"@stdlib/assert/is-integer":60}],101:[function(require,module,exports){
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

},{"@stdlib/assert/is-integer":60}],102:[function(require,module,exports){
'use strict';

var exec = RegExp.prototype.exec; // non-generic


// EXPORTS //

module.exports = exec;

},{}],103:[function(require,module,exports){
'use strict';

/**
* Test if a value is a regular expression.
*
* @module @stdlib/assert/is-regexp
*
* @example
* var isRegExp = require( '@stdlib/assert/is-regexp' );
*
* var bool = isRegExp( /\.+/ );
* // returns true
*
* bool = isRegExp( {} );
* // returns false
*/

// MODULES //

var isRegExp = require( './is_regexp.js' );


// EXPORTS //

module.exports = isRegExp;

},{"./is_regexp.js":104}],104:[function(require,module,exports){
'use strict';

// MODULES //

var hasToStringTag = require( '@stdlib/utils/detect-tostringtag-support' )();
var nativeClass = require( '@stdlib/utils/native-class' );
var test = require( './try2exec.js' );


// MAIN //

/**
* Tests if a value is a regular expression.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a regular expression
*
* @example
* var bool = isRegExp( /\.+/ );
* // returns true
*
* @example
* var bool = isRegExp( {} );
* // returns false
*/
function isRegExp( value ) {
	if ( typeof value === 'object' ) {
		if ( hasToStringTag ) {
			return test( value );
		}
		return ( nativeClass( value ) === '[object RegExp]' );
	}
	return false;
}


// EXPORTS //

module.exports = isRegExp;

},{"./try2exec.js":105,"@stdlib/utils/detect-tostringtag-support":274,"@stdlib/utils/native-class":303}],105:[function(require,module,exports){
'use strict';

// MODULES //

var exec = require( './exec.js' );


// MAIN //

/**
* Attempts to call a `RegExp` method.
*
* @private
* @param {*} value - value to test
* @returns {boolean} boolean indicating if able to call a `RegExp` method
*/
function test( value ) {
	try {
		exec.call( value );
		return true;
	} catch ( err ) { // eslint-disable-line no-unused-vars
		return false;
	}
}


// EXPORTS //

module.exports = test;

},{"./exec.js":102}],106:[function(require,module,exports){
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

},{"@stdlib/assert/is-string":108,"@stdlib/assert/tools/array-function":122,"@stdlib/utils/define-read-only-property":252}],107:[function(require,module,exports){
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
}


// EXPORTS //

module.exports = isString;

},{"./object.js":109,"./primitive.js":110}],108:[function(require,module,exports){
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

},{"./generic.js":107,"./object.js":109,"./primitive.js":110,"@stdlib/utils/define-read-only-property":252}],109:[function(require,module,exports){
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
}


// EXPORTS //

module.exports = isString;

},{"./try2valueof.js":111,"@stdlib/utils/detect-tostringtag-support":274,"@stdlib/utils/native-class":303}],110:[function(require,module,exports){
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
}


// EXPORTS //

module.exports = isString;

},{}],111:[function(require,module,exports){
'use strict';

// MODULES //

var valueOf = require( './valueof.js' ); // eslint-disable-line stdlib/no-redeclare


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
}


// EXPORTS //

module.exports = test;

},{"./valueof.js":112}],112:[function(require,module,exports){
'use strict';

// eslint-disable-next-line stdlib/no-redeclare
var valueOf = String.prototype.valueOf; // non-generic


// EXPORTS //

module.exports = valueOf;

},{}],113:[function(require,module,exports){
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

},{"./is_uint16array.js":114}],114:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":303}],115:[function(require,module,exports){
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

},{"./is_uint32array.js":116}],116:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":303}],117:[function(require,module,exports){
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

},{"./is_uint8array.js":118}],118:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":303}],119:[function(require,module,exports){
'use strict';

/**
* Test if a value is a Uint8ClampedArray.
*
* @module @stdlib/assert/is-uint8clampedarray
*
* @example
* var isUint8ClampedArray = require( '@stdlib/assert/is-uint8clampedarray' );
*
* var bool = isUint8ClampedArray( new Uint8ClampedArray( 10 ) );
* // returns true
*
* bool = isUint8ClampedArray( [] );
* // returns false
*/

// MODULES //

var isUint8ClampedArray = require( './is_uint8array_clamped.js' );


// EXPORTS //

module.exports = isUint8ClampedArray;

},{"./is_uint8array_clamped.js":120}],120:[function(require,module,exports){
'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );


// MAIN //

/**
* Tests if a value is a Uint8ClampedArray.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a Uint8ClampedArray
*
* @example
* var bool = isUint8ClampedArray( new Uint8ClampedArray( 10 ) );
* // returns true
*
* @example
* var bool = isUint8ClampedArray( [] );
* // returns false
*/
function isUint8ClampedArray( value ) {
	return ( nativeClass( value ) === '[object Uint8ClampedArray]' );
}


// EXPORTS //

module.exports = isUint8ClampedArray;

},{"@stdlib/utils/native-class":303}],121:[function(require,module,exports){
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

},{"@stdlib/assert/is-array":34}],122:[function(require,module,exports){
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

},{"./arrayfcn.js":121}],123:[function(require,module,exports){
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
	}
}


// EXPORTS //

module.exports = arraylikefcn;

},{"@stdlib/assert/is-array-like":32}],124:[function(require,module,exports){
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

},{"./arraylikefcn.js":123}],125:[function(require,module,exports){
'use strict';

// MODULES //

var TransformStream = require( '@stdlib/streams/utils/transform' );
var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isFunction = require( '@stdlib/assert/is-function' );
var createHarness = require( './harness' );
var harness = require( './get_harness.js' );


// VARIABLES //

var listeners = [];


// FUNCTIONS //

/**
* Callback invoked when a harness finishes running all benchmarks.
*
* @private
*/
function done() {
	var len;
	var f;
	var i;

	len = listeners.length;

	// Inform all the listeners that the harness has finished...
	for ( i = 0; i < len; i++ ) {
		f = listeners.shift();
		f();
	}
}

/**
* Creates a results stream.
*
* @memberof bench
* @param {Options} [options] - stream options
* @throws {Error} must provide valid stream options
* @returns {TransformStream} results stream
*/
function createStream( options ) {
	var stream;
	var bench;
	var opts;
	if ( arguments.length ) {
		opts = options;
	} else {
		opts = {};
	}
	// If we have already created a harness, calling this function simply creates another results stream...
	if ( harness.cached ) {
		bench = harness();
		return bench.createStream( opts );
	}
	stream = new TransformStream( opts );
	opts.stream = stream;

	// Create a harness which uses the created output stream:
	harness( opts, done );

	return stream;
}

/**
* Adds a listener for when a harness finishes running all benchmarks.
*
* @memberof bench
* @param {Callback} clbk - listener
* @throws {TypeError} must provide a function
* @throws {Error} must provide a listener only once
* @returns {void}
*/
function onFinish( clbk ) {
	var i;
	if ( !isFunction( clbk ) ) {
		throw new TypeError( 'invalid input argument. Must provide a function. Value: `'+clbk+'`.' );
	}
	// Allow adding a listener only once...
	for ( i = 0; i < listeners.length; i++ ) {
		if ( clbk === listeners[ i ] ) {
			throw new Error( 'invalid input argument. Attempted to add duplicate listener.' );
		}
	}
	listeners.push( clbk );
}


// MAIN //

/**
* Runs a benchmark.
*
* @param {string} name - benchmark name
* @param {Options} [options] - benchmark options
* @param {boolean} [options.skip=false] - boolean indicating whether to skip a benchmark
* @param {(PositiveInteger|null)} [options.iterations=null] - number of iterations
* @param {PositiveInteger} [options.repeats=3] - number of repeats
* @param {PositiveInteger} [options.timeout=300000] - number of milliseconds before a benchmark automatically fails
* @param {Function} [benchmark] - function containing benchmark code
* @throws {TypeError} first argument must be a string
* @throws {TypeError} options argument must be an object
* @throws {TypeError} must provide valid options
* @throws {TypeError} benchmark argument must a function
* @returns {Benchmark} benchmark harness
*
* @example
* bench( 'beep', function benchmark( b ) {
*     var x;
*     var i;
*     b.tic();
*     for ( i = 0; i < b.iterations; i++ ) {
*         x = Math.sin( Math.random() );
*         if ( x !== x ) {
*             b.ok( false, 'should not return NaN' );
*         }
*     }
*     b.toc();
*     if ( x !== x ) {
*         b.ok( false, 'should not return NaN' );
*     }
*     b.end();
* });
*/
function bench( name, options, benchmark ) {
	var h = harness( done );
	if ( arguments.length < 2 ) {
		h( name );
	} else if ( arguments.length === 2 ) {
		h( name, options );
	} else {
		h( name, options, benchmark );
	}
	return bench;
}


// EXPORTS //

module.exports = bench;

setReadOnly( bench, 'createHarness', createHarness );
setReadOnly( bench, 'createStream', createStream );
setReadOnly( bench, 'onFinish', onFinish );

},{"./get_harness.js":147,"./harness":148,"@stdlib/assert/is-function":51,"@stdlib/streams/utils/transform":229,"@stdlib/utils/define-read-only-property":252}],126:[function(require,module,exports){
'use strict';

// MODULES //

var hasOwnProp = require( '@stdlib/assert/has-own-property' );


// MAIN //

/**
* Generates an assertion.
*
* @private
* @param {boolean} ok - assertion outcome
* @param {Options} opts - options
*/
function assert( ok, opts ) {
	/* eslint-disable no-invalid-this, no-unused-vars */ // TODO: remove no-unused-vars once `err` is used
	var result;
	var err;

	result = {
		'id': this._count,
		'ok': ok,
		'skip': opts.skip,
		'todo': opts.todo,
		'name': opts.message || '(unnamed assert)',
		'operator': opts.operator
	};
	if ( hasOwnProp( opts, 'actual' ) ) {
		result.actual = opts.actual;
	}
	if ( hasOwnProp( opts, 'expected' ) ) {
		result.expected = opts.expected;
	}
	if ( !ok ) {
		result.error = opts.error || new Error( this.name );
		err = new Error( 'exception' );

		// TODO: generate an exception in order to locate the calling function (https://github.com/substack/tape/blob/master/lib/test.js#L215)
	}
	this._count += 1;
	this.emit( 'result', result );
}


// EXPORTS //

module.exports = assert;

},{"@stdlib/assert/has-own-property":29}],127:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = clearTimeout;

},{}],128:[function(require,module,exports){
'use strict';

// MODULES //

var trim = require( '@stdlib/string/trim' );
var replace = require( '@stdlib/string/replace' );
var EOL = require( '@stdlib/regexp/eol' );


// VARIABLES //

var RE_COMMENT = /^#\s*/;


// MAIN //

/**
* Writes a comment.
*
* @private
* @param {string} msg - comment message
*/
function comment( msg ) {
	/* eslint-disable no-invalid-this */
	var lines;
	var i;
	msg = trim( msg );
	lines = msg.split( EOL );
	for ( i = 0; i < lines.length; i++ ) {
		msg = trim( lines[ i ] );
		msg = replace( msg, RE_COMMENT, '' );
		this.emit( 'result', msg );
	}
}


// EXPORTS //

module.exports = comment;

},{"@stdlib/regexp/eol":221,"@stdlib/string/replace":235,"@stdlib/string/trim":237}],129:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Asserts that `actual` is deeply equal to `expected`.
*
* @private
* @param {*} actual - actual value
* @param {*} expected - expected value
* @param {string} [msg] message
*/
function deepEqual( actual, expected, msg ) {
	/* eslint-disable no-invalid-this */
	this.comment( 'actual: '+actual+'. expected: '+expected+'. msg: '+msg+'.' );

	// TODO: implement
}


// EXPORTS //

module.exports = deepEqual;

},{}],130:[function(require,module,exports){
'use strict';

// MODULES //

var nextTick = require( './../utils/next_tick.js' );


// MAIN //

/**
* Ends a benchmark.
*
* @private
*/
function end() {
	/* eslint-disable no-invalid-this */
	var self = this;
	if ( this._ended ) {
		this.fail( '.end() called more than once' );
	} else {
		// Prevents releasing the zalgo when running synchronous benchmarks.
		nextTick( onTick );
	}
	this._ended = true;
	this._running = false;

	/**
	* Callback invoked upon a subsequent tick of the event loop.
	*
	* @private
	*/
	function onTick() {
		self.emit( 'end' );
	}
}


// EXPORTS //

module.exports = end;

},{"./../utils/next_tick.js":167}],131:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Returns a `boolean` indicating if a benchmark has ended.
*
* @private
* @returns {boolean} boolean indicating if a benchmark has ended
*/
function ended() {
	/* eslint-disable no-invalid-this */
	return this._ended;
}


// EXPORTS //

module.exports = ended;

},{}],132:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Asserts that `actual` is strictly equal to `expected`.
*
* @private
* @param {*} actual - actual value
* @param {*} expected - expected value
* @param {string} [msg] - message
*/
function equal( actual, expected, msg ) {
	/* eslint-disable no-invalid-this */
	this._assert( actual === expected, {
		'message': msg || 'should be equal',
		'operator': 'equal',
		'expected': expected,
		'actual': actual
	});
}


// EXPORTS //

module.exports = equal;

},{}],133:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Forcefully ends a benchmark.
*
* @private
* @returns {void}
*/
function exit() {
	/* eslint-disable no-invalid-this */
	if ( this._exited ) {
		// If we have already "exited", do not create more failing assertions when one should suffice...
		return;
	}
	// Only "exit" when a benchmark has either not yet been run or is currently running. If a benchmark has already ended, no need to generate a failing assertion.
	if ( !this._ended ) {
		this._exited = true;
		this.fail( 'benchmark exited without ending' );

		// Allow running benchmarks to call `end` on their own...
		if ( !this._running ) {
			this.end();
		}
	}
}


// EXPORTS //

module.exports = exit;

},{}],134:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Generates a failing assertion.
*
* @private
* @param {string} msg - message
*/
function fail( msg ) {
	/* eslint-disable no-invalid-this */
	this._assert( false, {
		'message': msg,
		'operator': 'fail'
	});
}


// EXPORTS //

module.exports = fail;

},{}],135:[function(require,module,exports){
'use strict';

// MODULES //

var EventEmitter = require( 'events' ).EventEmitter;
var inherit = require( '@stdlib/utils/inherit' );
var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var tic = require( '@stdlib/time/tic' );
var toc = require( '@stdlib/time/toc' );


// MAIN //

/**
* Benchmark constructor.
*
* @constructor
* @param {string} name - benchmark name
* @param {Options} opts - benchmark options
* @param {boolean} opts.skip - boolean indicating whether to skip a benchmark
* @param {PositiveInteger} opts.iterations - number of iterations
* @param {PositiveInteger} opts.timeout - number of milliseconds before a benchmark automatically fails
* @param {Function} [benchmark] - function containing benchmark code
* @returns {Benchmark} Benchmark instance
*
* @example
* var bench = new Benchmark( 'beep', function benchmark( b ) {
*     var x;
*     var i;
*     b.comment( 'Running benchmarks...' );
*     b.tic();
*     for ( i = 0; i < b.iterations; i++ ) {
*         x = Math.sin( Math.random() );
*         if ( x !== x ) {
*             b.ok( false, 'should not return NaN' );
*         }
*     }
*     b.toc();
*     if ( x !== x ) {
*         b.ok( false, 'should not return NaN' );
*     }
*     b.comment( 'Finished running benchmarks.' );
*     b.end();
* });
*/
function Benchmark( name, opts, benchmark ) {
	var hasTicked;
	var hasTocked;
	var self;
	var time;
	if ( !( this instanceof Benchmark ) ) {
		return new Benchmark( name, opts, benchmark );
	}
	self = this;
	hasTicked = false;
	hasTocked = false;

	EventEmitter.call( this );

	// Private properties:
	Object.defineProperty( this, '_benchmark', {
		'value': benchmark, // this may be `undefined`
		'configurable': false,
		'writable': false,
		'enumerable': false
	});

	Object.defineProperty( this, '_skip', {
		'value': opts.skip,
		'configurable': false,
		'writable': false,
		'enumerable': false
	});

	Object.defineProperty( this, '_ended', {
		'value': false,
		'configurable': false,
		'writable': true,
		'enumerable': false
	});

	Object.defineProperty( this, '_running', {
		'value': false,
		'configurable': false,
		'writable': true,
		'enumerable': false
	});

	Object.defineProperty( this, '_exited', {
		'value': false,
		'configurable': false,
		'writable': true,
		'enumerable': false
	});

	Object.defineProperty( this, '_count', {
		'value': 0,
		'configurable': false,
		'writable': true,
		'enumerable': false
	});

	// Read-only:
	setReadOnly( this, 'name', name );
	setReadOnly( this, 'tic', start );
	setReadOnly( this, 'toc', stop );
	setReadOnly( this, 'iterations', opts.iterations );
	setReadOnly( this, 'timeout', opts.timeout );

	return this;

	/**
	* Starts a benchmark timer.
	*
	* ## Notes
	*
	* -   Using a scoped variable prevents nefarious mutation by bad actors hoping to manipulate benchmark results.
	* -   The one attack vector which remains is manipulation of the `require` cache for `tic` and `toc`.
	* -   One way to combat cache manipulation is by comparing the checksum of `Function#toString()` against known values.
	*
	* @private
	*/
	function start() {
		if ( hasTicked ) {
			self.fail( '.tic() called more than once' );
		} else {
			self.emit( 'tic' );
			hasTicked = true;
			time = tic();
		}
	}

	/**
	* Stops a benchmark timer.
	*
	* @private
	* @returns {void}
	*/
	function stop() {
		var elapsed;
		var secs;
		var rate;
		var out;

		if ( hasTicked === false ) {
			return self.fail( '.toc() called before .tic()' );
		}
		elapsed = toc( time );
		if ( hasTocked ) {
			return self.fail( '.toc() called more than once' );
		}
		hasTocked = true;
		self.emit( 'toc' );

		secs = elapsed[ 0 ] + ( elapsed[ 1 ]/1e9 );
		rate = self.iterations / secs;

		out = {
			'ok': true,
			'operator': 'result',
			'iterations': self.iterations,
			'elapsed': secs,
			'rate': rate
		};
		self.emit( 'result', out );
	}
}

/*
* Inherit from the `EventEmitter` prototype.
*/
inherit( Benchmark, EventEmitter );

/**
* Runs a benchmark.
*
* @private
* @memberof Benchmark.prototype
* @function run
*/
Object.defineProperty( Benchmark.prototype, 'run', {
	'value': require( './run.js' ),
	'configurable': false,
	'writable': false,
	'enumerable': false
});

/**
* Forcefully ends a benchmark.
*
* @private
* @memberof Benchmark.prototype
* @function exit
*/
Object.defineProperty( Benchmark.prototype, 'exit', {
	'value': require( './exit.js' ),
	'configurable': false,
	'writable': false,
	'enumerable': false
});

/**
* Returns a `boolean` indicating if a benchmark has ended.
*
* @private
* @memberof Benchmark.prototype
* @function ended
* @returns {boolean} boolean indicating if a benchmark has ended
*/
Object.defineProperty( Benchmark.prototype, 'ended', {
	'value': require( './ended.js' ),
	'configurable': false,
	'writable': false,
	'enumerable': false
});

/**
* Generates an assertion.
*
* @private
* @memberof Benchmark.prototype
* @function _assert
* @param {boolean} ok - assertion outcome
* @param {Options} opts - options
*/
Object.defineProperty( Benchmark.prototype, '_assert', {
	'value': require( './assert.js' ),
	'configurable': false,
	'writable': false,
	'enumerable': false
});

/**
* Writes a comment.
*
* @memberof Benchmark.prototype
* @function comment
* @param {string} msg - comment message
*/
setReadOnly( Benchmark.prototype, 'comment', require( './comment.js' ) );

/**
* Generates an assertion which will be skipped.
*
* @memberof Benchmark.prototype
* @function skip
* @param {*} value - value
* @param {string} msg - message
*/
setReadOnly( Benchmark.prototype, 'skip', require( './skip.js' ) );

/**
* Generates an assertion which should be implemented.
*
* @memberof Benchmark.prototype
* @function todo
* @param {*} value - value
* @param {string} msg - message
*/
setReadOnly( Benchmark.prototype, 'todo', require( './todo.js' ) );

/**
* Generates a failing assertion.
*
* @memberof Benchmark.prototype
* @function fail
* @param {string} msg - message
*/
setReadOnly( Benchmark.prototype, 'fail', require( './fail.js' ) );

/**
* Generates a passing assertion.
*
* @memberof Benchmark.prototype
* @function pass
* @param {string} msg - message
*/
setReadOnly( Benchmark.prototype, 'pass', require( './pass.js' ) );

/**
* Asserts that a `value` is truthy.
*
* @memberof Benchmark.prototype
* @function ok
* @param {*} value - value
* @param {string} [msg] - message
*/
setReadOnly( Benchmark.prototype, 'ok', require( './ok.js' ) );

/**
* Asserts that a `value` is falsy.
*
* @memberof Benchmark.prototype
* @function notOk
* @param {*} value - value
* @param {string} [msg] - message
*/
setReadOnly( Benchmark.prototype, 'notOk', require( './not_ok.js' ) );

/**
* Asserts that `actual` is strictly equal to `expected`.
*
* @memberof Benchmark.prototype
* @function equal
* @param {*} actual - actual value
* @param {*} expected - expected value
* @param {string} [msg] - message
*/
setReadOnly( Benchmark.prototype, 'equal', require( './equal.js' ) );

/**
* Asserts that `actual` is not strictly equal to `expected`.
*
* @memberof Benchmark.prototype
* @function notEqual
* @param {*} actual - actual value
* @param {*} expected - expected value
* @param {string} [msg] - message
*/
setReadOnly( Benchmark.prototype, 'notEqual', require( './not_equal.js' ) );

/**
* Asserts that `actual` is deeply equal to `expected`.
*
* @memberof Benchmark.prototype
* @function deepEqual
* @param {*} actual - actual value
* @param {*} expected - expected value
* @param {string} [msg] message
*/
setReadOnly( Benchmark.prototype, 'deepEqual', require( './deep_equal.js' ) );

/**
* Asserts that `actual` is not deeply equal to `expected`.
*
* @memberof Benchmark.prototype
* @function notDeepEqual
* @param {*} actual - actual value
* @param {*} expected - expected value
* @param {string} [msg] message
*/
setReadOnly( Benchmark.prototype, 'notDeepEqual', require( './not_deep_equal.js' ) );

/**
* Ends a benchmark.
*
* @memberof Benchmark.prototype
* @function end
*/
setReadOnly( Benchmark.prototype, 'end', require( './end.js' ) );


// EXPORTS //

module.exports = Benchmark;

},{"./assert.js":126,"./comment.js":128,"./deep_equal.js":129,"./end.js":130,"./ended.js":131,"./equal.js":132,"./exit.js":133,"./fail.js":134,"./not_deep_equal.js":136,"./not_equal.js":137,"./not_ok.js":138,"./ok.js":139,"./pass.js":140,"./run.js":141,"./skip.js":143,"./todo.js":144,"@stdlib/time/tic":239,"@stdlib/time/toc":243,"@stdlib/utils/define-read-only-property":252,"@stdlib/utils/inherit":298,"events":331}],136:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Asserts that `actual` is not deeply equal to `expected`.
*
* @private
* @param {*} actual - actual value
* @param {*} expected - expected value
* @param {string} [msg] message
*/
function notDeepEqual( actual, expected, msg ) {
	/* eslint-disable no-invalid-this */
	this.comment( 'actual: '+actual+'. expected: '+expected+'. msg: '+msg+'.' );

	// TODO: implement
}


// EXPORTS //

module.exports = notDeepEqual;

},{}],137:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Asserts that `actual` is not strictly equal to `expected`.
*
* @private
* @param {*} actual - actual value
* @param {*} expected - expected value
* @param {string} [msg] - message
*/
function notEqual( actual, expected, msg ) {
	/* eslint-disable no-invalid-this */
	this._assert( actual !== expected, {
		'message': msg || 'should not be equal',
		'operator': 'notEqual',
		'expected': expected,
		'actual': actual
	});
}


// EXPORTS //

module.exports = notEqual;

},{}],138:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Asserts that a `value` is falsy.
*
* @private
* @param {*} value - value
* @param {string} [msg] - message
*/
function notOk( value, msg ) {
	/* eslint-disable no-invalid-this */
	this._assert( !value, {
		'message': msg || 'should be falsy',
		'operator': 'notOk',
		'expected': false,
		'actual': value
	});
}


// EXPORTS //

module.exports = notOk;

},{}],139:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Asserts that a `value` is truthy.
*
* @private
* @param {*} value - value
* @param {string} [msg] - message
*/
function ok( value, msg ) {
	/* eslint-disable no-invalid-this */
	this._assert( !!value, {
		'message': msg || 'should be truthy',
		'operator': 'ok',
		'expected': true,
		'actual': value
	});
}


// EXPORTS //

module.exports = ok;

},{}],140:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Generates a passing assertion.
*
* @private
* @param {string} msg - message
*/
function pass( msg ) {
	/* eslint-disable no-invalid-this */
	this._assert( true, {
		'message': msg,
		'operator': 'pass'
	});
}


// EXPORTS //

module.exports = pass;

},{}],141:[function(require,module,exports){
/* eslint-disable no-underscore-dangle */
'use strict';

// MODULES //

var timeout = require( './set_timeout.js' );
var clear = require( './clear_timeout.js' );


// MAIN //

/**
* Runs a benchmark.
*
* @private
* @returns {void}
*/
function run() {
	/* eslint-disable no-invalid-this */
	var self;
	var id;
	if ( this._skip ) {
		this.comment( 'SKIP '+this.name );
		return this.end();
	}
	if ( !this._benchmark ) {
		this.comment( 'TODO '+this.name );
		return this.end();
	}
	self = this;
	this._running = true;

	id = timeout( onTimeout, this.timeout );
	this.once( 'end', endTimeout );

	this.emit( 'prerun' );
	this._benchmark( this );
	this.emit( 'run' );

	/**
	* Callback invoked once a timeout ends.
	*
	* @private
	*/
	function onTimeout() {
		self.fail( 'benchmark timed out after '+self.timeout+'ms' );
	}

	/**
	* Clears a timeout.
	*
	* @private
	*/
	function endTimeout() {
		clear( id );
	}
}


// EXPORTS //

module.exports = run;

},{"./clear_timeout.js":127,"./set_timeout.js":142}],142:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = setTimeout;

},{}],143:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Generates an assertion which will be skipped.
*
* @private
* @param {*} value - value
* @param {string} msg - message
*/
function skip( value, msg ) {
	/* eslint-disable no-invalid-this */
	this._assert( true, {
		'message': msg,
		'operator': 'skip',
		'skip': true
	});
}


// EXPORTS //

module.exports = skip;

},{}],144:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Generates an assertion which should be implemented.
*
* @private
* @param {*} value - value
* @param {string} msg - message
*/
function todo( value, msg ) {
	/* eslint-disable no-invalid-this */
	this._assert( !!value, {
		'message': msg,
		'operator': 'todo',
		'todo': true
	});
}


// EXPORTS //

module.exports = todo;

},{}],145:[function(require,module,exports){
module.exports={
	"skip": false,
	"iterations": null,
	"repeats": 3,
	"timeout": 300000
}

},{}],146:[function(require,module,exports){
'use strict';

// MODULES //

var isFunction = require( '@stdlib/assert/is-function' );
var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
var isObject = require( '@stdlib/assert/is-plain-object' );
var isNodeWritableStreamLike = require( '@stdlib/assert/is-node-writable-stream-like' );
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var pick = require( '@stdlib/utils/pick' );
var omit = require( '@stdlib/utils/omit' );
var noop = require( '@stdlib/utils/noop' );
var createHarness = require( './harness' );
var logStream = require( './log' );
var canEmitExit = require( './utils/can_emit_exit.js' );
var proc = require( './utils/process.js' );


// MAIN //

/**
* Creates a benchmark harness which supports closing when a process exits.
*
* @private
* @param {Options} [options] - function options
* @param {boolean} [options.autoclose] - boolean indicating whether to automatically close a harness after a harness finishes running all benchmarks
* @param {Stream} [options.stream] - output writable stream
* @param {Callback} [clbk] - callback to invoke when a harness finishes running all benchmarks
* @throws {TypeError} options argument must be an object
* @throws {TypeError} must provide valid options
* @throws {TypeError} callback argument must be a function
* @returns {Function} benchmark harness
*
* @example
* var bench = createExitHarness( onFinish );
*
* function onFinish() {
*     bench.close();
* }
*
* bench( 'beep', function benchmark( b ) {
*     var x;
*     var i;
*     b.tic();
*     for ( i = 0; i < b.iterations; i++ ) {
*         x = Math.sin( Math.random() );
*         if ( x !== x ) {
*             b.ok( false, 'should not return NaN' );
*         }
*     }
*     b.toc();
*     if ( x !== x ) {
*         b.ok( false, 'should not return NaN' );
*     }
*     b.end();
* });
*
* @example
* var stream = createExitHarness().createStream();
* stream.pipe( process.stdout );
*/
function createExitHarness() {
	var exitCode;
	var pipeline;
	var harness;
	var options;
	var stream;
	var topts;
	var opts;
	var clbk;

	if ( arguments.length === 0 ) {
		options = {};
		clbk = noop;
	} else if ( arguments.length === 1 ) {
		if ( isFunction( arguments[ 0 ] ) ) {
			options = {};
			clbk = arguments[ 0 ];
		} else if ( isObject( arguments[ 0 ] ) ) {
			options = arguments[ 0 ];
			clbk = noop;
		} else {
			throw new TypeError( 'invalid input argument. Must provide either an options object or a callback function. Value: `'+arguments[ 0 ]+'`.' );
		}
	} else {
		options = arguments[ 0 ];
		if ( !isObject( options ) ) {
			throw new TypeError( 'invalid input argument. First argument must be an object. Value: `'+options+'`.' );
		}
		clbk = arguments[ 1 ];
		if ( !isFunction( clbk ) ) {
			throw new TypeError( 'invalid input argument. Second argument must be a function. Value: `'+clbk+'`.' );
		}
	}
	opts = {};
	if ( hasOwnProp( options, 'autoclose' ) ) {
		opts.autoclose = options.autoclose;
		if ( !isBoolean( opts.autoclose ) ) {
			throw new TypeError( 'invalid option. `autoclose` option must be a boolean primitive. Option: `'+opts.autoclose+'`.' );
		}
	}
	if ( hasOwnProp( options, 'stream' ) ) {
		opts.stream = options.stream;
		if ( !isNodeWritableStreamLike( opts.stream ) ) {
			throw new TypeError( 'invalid option. `stream` option must be a writable stream. Option: `'+opts.stream+'`.' );
		}
	}
	exitCode = 0;

	// Create a new harness:
	topts = pick( opts, [ 'autoclose' ] );
	harness = createHarness( topts, done );

	// Create a results stream:
	topts = omit( options, [ 'autoclose', 'stream' ] );
	stream = harness.createStream( topts );

	// Pipe results to an output stream:
	pipeline = stream.pipe( opts.stream || logStream() );

	// If a process can emit an 'exit' event, capture errors in order to set the exit code...
	if ( canEmitExit ) {
		pipeline.on( 'error', onError );
		proc.on( 'exit', onExit );
	}
	return harness;

	/**
	* Callback invoked when a harness finishes.
	*
	* @private
	* @returns {void}
	*/
	function done() {
		return clbk();
	}

	/**
	* Callback invoked upon a stream `error` event.
	*
	* @private
	* @param {Error} error - error object
	*/
	function onError() {
		exitCode = 1;
	}

	/**
	* Callback invoked upon an `exit` event.
	*
	* @private
	* @param {integer} code - exit code
	*/
	function onExit( code ) {
		if ( code !== 0 ) {
			// Allow the process to exit...
			return;
		}
		harness.close();
		proc.exit( exitCode || harness.exitCode );
	}
}


// EXPORTS //

module.exports = createExitHarness;

},{"./harness":148,"./log":154,"./utils/can_emit_exit.js":165,"./utils/process.js":168,"@stdlib/assert/has-own-property":29,"@stdlib/assert/is-boolean":37,"@stdlib/assert/is-function":51,"@stdlib/assert/is-node-writable-stream-like":73,"@stdlib/assert/is-plain-object":96,"@stdlib/utils/noop":308,"@stdlib/utils/omit":310,"@stdlib/utils/pick":312}],147:[function(require,module,exports){
'use strict';

// MODULES //

var canEmitExit = require( './utils/can_emit_exit.js' );
var createExitHarness = require( './exit_harness.js' );


// VARIABLES //

var harness;


// MAIN //

/**
* Returns a benchmark harness. If a harness has already been created, returns the cached harness.
*
* @private
* @param {Options} [options] - harness options
* @param {Callback} [clbk] - callback to invoke when a harness finishes running all benchmarks
* @returns {Function} benchmark harness
*/
function getHarness( options, clbk ) {
	var opts;
	var cb;
	if ( harness ) {
		return harness;
	}
	if ( arguments.length > 1 ) {
		opts = options;
		cb = clbk;
	} else {
		opts = {};
		cb = options;
	}
	opts.autoclose = !canEmitExit;
	harness = createExitHarness( opts, cb );

	// Update state:
	getHarness.cached = true;

	return harness;
}


// EXPORTS //

module.exports = getHarness;

},{"./exit_harness.js":146,"./utils/can_emit_exit.js":165}],148:[function(require,module,exports){
'use strict';

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var isFunction = require( '@stdlib/assert/is-function' );
var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
var isObject = require( '@stdlib/assert/is-plain-object' );
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var copy = require( '@stdlib/utils/copy' );
var Benchmark = require( './../benchmark-class' );
var Runner = require( './../runner' );
var nextTick = require( './../utils/next_tick.js' );
var DEFAULTS = require( './../defaults.json' );
var validate = require( './validate.js' );
var init = require( './init.js' );


// MAIN //

/**
* Creates a benchmark harness.
*
* @param {Options} [options] - function options
* @param {boolean} [options.autoclose] - boolean indicating whether to automatically close a harness after a harness finishes running all benchmarks
* @param {Callback} [clbk] - callback to invoke when a harness finishes running all benchmarks
* @throws {TypeError} options argument must be an object
* @throws {TypeError} must provide valid options
* @throws {TypeError} callback argument must be a function
* @returns {Function} benchmark harness
*
* @example
* var bench = createHarness( onFinish );
*
* function onFinish() {
*     bench.close();
*     console.log( 'Exit code: %d', bench.exitCode );
* }
*
* bench( 'beep', function benchmark( b ) {
*     var x;
*     var i;
*     b.tic();
*     for ( i = 0; i < b.iterations; i++ ) {
*         x = Math.sin( Math.random() );
*         if ( x !== x ) {
*             b.ok( false, 'should not return NaN' );
*         }
*     }
*     b.toc();
*     if ( x !== x ) {
*         b.ok( false, 'should not return NaN' );
*     }
*     b.end();
* });
*
* @example
* var stream = createHarness().createStream();
* stream.pipe( process.stdout );
*/
function createHarness( options, clbk ) {
	var exitCode;
	var runner;
	var queue;
	var opts;
	var cb;

	opts = {};
	if ( arguments.length === 1 ) {
		if ( isFunction( options ) ) {
			cb = options;
		} else if ( isObject( options ) ) {
			opts = options;
		} else {
			throw new TypeError( 'invalid input argument. Must provide either an options object or a callback function. Value: `'+options+'`.' );
		}
	} else if ( arguments.length > 1 ) {
		if ( !isObject( options ) ) {
			throw new TypeError( 'invalid input argument. First argument must be an object. Value: `'+options+'`.' );
		}
		if ( hasOwnProp( options, 'autoclose' ) ) {
			opts.autoclose = options.autoclose;
			if ( !isBoolean( opts.autoclose ) ) {
				throw new TypeError( 'invalid option. `autoclose` option must be a boolean primitive. Option: `'+opts.autoclose+'`.' );
			}
		}
		cb = clbk;
		if ( !isFunction( cb ) ) {
			throw new TypeError( 'invalid input argument. Second argument must be a function. Value: `'+cb+'`.' );
		}
	}
	runner = new Runner();
	if ( opts.autoclose ) {
		runner.once( 'done', close );
	}
	if ( cb ) {
		runner.once( 'done', cb );
	}
	exitCode = 0;
	queue = [];

	/**
	* Benchmark harness.
	*
	* @private
	* @param {string} name - benchmark name
	* @param {Options} [options] - benchmark options
	* @param {boolean} [options.skip=false] - boolean indicating whether to skip a benchmark
	* @param {(PositiveInteger|null)} [options.iterations=null] - number of iterations
	* @param {PositiveInteger} [options.repeats=3] - number of repeats
	* @param {PositiveInteger} [options.timeout=300000] - number of milliseconds before a benchmark automatically fails
	* @param {Function} [benchmark] - function containing benchmark code
	* @throws {TypeError} first argument must be a string
	* @throws {TypeError} options argument must be an object
	* @throws {TypeError} must provide valid options
	* @throws {TypeError} benchmark argument must a function
	* @throws {Error} benchmark error
	* @returns {Function} benchmark harness
	*/
	function harness( name, options, benchmark ) {
		var opts;
		var err;
		var b;
		if ( !isString( name ) ) {
			throw new TypeError( 'invalid input argument. First argument must be a string. Value: `'+name+'`.' );
		}
		opts = copy( DEFAULTS );
		if ( arguments.length === 2 ) {
			if ( isFunction( options ) ) {
				b = options;
			} else {
				err = validate( opts, options );
				if ( err ) {
					throw err;
				}
			}
		} else if ( arguments.length > 2 ) {
			err = validate( opts, options );
			if ( err ) {
				throw err;
			}
			b = benchmark;
			if ( !isFunction( b ) ) {
				throw new TypeError( 'invalid input argument. Third argument must be a function. Value: `'+b+'`.' );
			}
		}
		// Add the benchmark to the initialization queue:
		queue.push( [ name, opts, b ] );

		// Perform initialization on the next turn of the event loop (note: this allows all benchmarks to be "registered" within the same turn of the loop; otherwise, we run the risk of registration-execution race conditions (i.e., a benchmark registers and executes before other benchmarks can register, depleting the benchmark queue and leading the harness to close)):
		if ( queue.length === 1 ) {
			nextTick( initialize );
		}
		return harness;
	}

	/**
	* Initializes each benchmark.
	*
	* @private
	* @returns {void}
	*/
	function initialize() {
		var idx = -1;
		return next();

		/**
		* Initialize the next benchmark.
		*
		* @private
		* @returns {void}
		*/
		function next() {
			var args;

			idx += 1;

			// If all benchmarks have been initialized, begin running the benchmarks:
			if ( idx === queue.length ) {
				queue.length = 0;
				return runner.run();
			}
			// Initialize the next benchmark:
			args = queue[ idx ];
			init( args[ 0 ], args[ 1 ], args[ 2 ], onInit );
		}

		/**
		* Callback invoked after performing initialization tasks.
		*
		* @private
		* @param {string} name - benchmark name
		* @param {Options} opts - benchmark options
		* @param {(Function|undefined)} benchmark - function containing benchmark code
		* @returns {void}
		*/
		function onInit( name, opts, benchmark ) {
			var b;
			var i;

			// Create a `Benchmark` instance for each repeat to ensure each benchmark has its own state...
			for ( i = 0; i < opts.repeats; i++ ) {
				b = new Benchmark( name, opts, benchmark );
				b.on( 'result', onResult );
				runner.push( b );
			}
			return next();
		}
	}

	/**
	* Callback invoked upon a `result` event.
	*
	* @private
	* @param {(string|Object)} result - result
	*/
	function onResult( result ) {
		if (
			!isString( result ) &&
			!result.ok &&
			!result.todo
		) {
			exitCode = 1;
		}
	}

	/**
	* Returns a results stream.
	*
	* @private
	* @param {Object} [options] - options
	* @returns {TransformStream} transform stream
	*/
	function createStream( options ) {
		if ( arguments.length ) {
			return runner.createStream( options );
		}
		return runner.createStream();
	}

	/**
	* Closes a benchmark harness.
	*
	* @private
	*/
	function close() {
		runner.close();
	}

	/**
	* Forcefully exits a benchmark harness.
	*
	* @private
	*/
	function exit() {
		runner.exit();
	}

	/**
	* Returns the harness exit code.
	*
	* @private
	* @returns {NonNegativeInteger} exit code
	*/
	function getExitCode() {
		return exitCode;
	}

	setReadOnly( harness, 'createStream', createStream );
	setReadOnly( harness, 'close', close );
	setReadOnly( harness, 'exit', exit );

	Object.defineProperty( harness, 'exitCode', {
		'configurable': false,
		'enumerable': true,
		'get': getExitCode
	});

	return harness;
}


// EXPORTS //

module.exports = createHarness;

},{"./../benchmark-class":135,"./../defaults.json":145,"./../runner":162,"./../utils/next_tick.js":167,"./init.js":149,"./validate.js":152,"@stdlib/assert/has-own-property":29,"@stdlib/assert/is-boolean":37,"@stdlib/assert/is-function":51,"@stdlib/assert/is-plain-object":96,"@stdlib/assert/is-string":108,"@stdlib/utils/copy":249,"@stdlib/utils/define-read-only-property":252}],149:[function(require,module,exports){
'use strict';

// MODULES //

var pretest = require( './pretest.js' );
var iterations = require( './iterations.js' );


// MAIN //

/**
* Performs benchmark initialization tasks.
*
* @private
* @param {string} name - benchmark name
* @param {Options} opts - benchmark options
* @param {(Function|undefined)} benchmark - function containing benchmark code
* @param {Callback} clbk - callback to invoke after completing initialization tasks
* @returns {void}
*/
function init( name, opts, benchmark, clbk ) {
	// If no benchmark function, then the benchmark is considered a "todo", so no need to repeat multiple times...
	if ( !benchmark ) {
		opts.repeats = 1;
		return clbk( name, opts, benchmark );
	}
	// If the `skip` option to `true`, no need to initialize or repeat multiple times as will not be running the benchmark:
	if ( opts.skip ) {
		opts.repeats = 1;
		return clbk( name, opts, benchmark );
	}
	// Perform pretests:
	pretest( name, opts, benchmark, onPreTest );

	/**
	* Callback invoked upon completing pretests.
	*
	* @private
	* @param {Error} [error] - error object
	* @returns {void}
	*/
	function onPreTest( error ) {
		// If the pretests failed, don't run the benchmark multiple times...
		if ( error ) {
			opts.repeats = 1;
			opts.iterations = 1;
			return clbk( name, opts, benchmark );
		}
		// If a user specified an iteration number, we can begin running benchmarks...
		if ( opts.iterations ) {
			return clbk( name, opts, benchmark );
		}
		// Determine iteration number:
		iterations( name, opts, benchmark, onIterations );
	}

	/**
	* Callback invoked upon determining an iteration number.
	*
	* @private
	* @param {(Error|null)} error - error object
	* @param {PositiveInteger} iter - number of iterations
	* @returns {void}
	*/
	function onIterations( error, iter ) {
		// If provided an error, then a benchmark failed, and, similar to pretests, don't run the benchmark multiple times...
		if ( error ) {
			opts.repeats = 1;
			opts.iterations = 1;
			return clbk( name, opts, benchmark );
		}
		opts.iterations = iter;
		return clbk( name, opts, benchmark );
	}
}


// EXPORTS //

module.exports = init;

},{"./iterations.js":150,"./pretest.js":151}],150:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var copy = require( '@stdlib/utils/copy' );
var Benchmark = require( './../benchmark-class' );


// VARIABLES //

var MIN_TIME = 0.1; // seconds
var ITERATIONS = 10; // 10^1
var MAX_ITERATIONS = 10000000000; // 10^10


// MAIN //

/**
* Determines the number of iterations.
*
* @private
* @param {string} name - benchmark name
* @param {Options} options - benchmark options
* @param {(Function|undefined)} benchmark - function containing benchmark code
* @param {Callback} clbk - callback to invoke after determining number of iterations
* @returns {void}
*/
function iterations( name, options, benchmark, clbk ) {
	var opts;
	var time;

	// Elapsed time (in seconds):
	time = 0;

	// Create a local copy:
	opts = copy( options );
	opts.iterations = ITERATIONS;

	// Begin running benchmarks:
	return next();

	/**
	* Run a new benchmark.
	*
	* @private
	*/
	function next() {
		var b = new Benchmark( name, opts, benchmark );
		b.on( 'result', onResult );
		b.once( 'end', onEnd );
		b.run();
	}

	/**
	* Callback invoked upon a `result` event.
	*
	* @private
	* @param {(string|Object)} result - result
	*/
	function onResult( result ) {
		if ( !isString( result ) && result.operator === 'result' ) {
			time = result.elapsed;
		}
	}

	/**
	* Callback invoked upon an `end` event.
	*
	* @private
	* @returns {void}
	*/
	function onEnd() {
		if (
			time < MIN_TIME &&
			opts.iterations < MAX_ITERATIONS
		) {
			opts.iterations *= 10;
			return next();
		}
		clbk( null, opts.iterations );
	}
}


// EXPORTS //

module.exports = iterations;

},{"./../benchmark-class":135,"@stdlib/assert/is-string":108,"@stdlib/utils/copy":249}],151:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var copy = require( '@stdlib/utils/copy' );
var Benchmark = require( './../benchmark-class' );


// MAIN //

/**
* Runs pretests to sanity check and/or catch failures.
*
* @private
* @param {string} name - benchmark name
* @param {Options} options - benchmark options
* @param {(Function|undefined)} benchmark - function containing benchmark code
* @param {Callback} clbk - callback to invoke after completing pretests
*/
function pretest( name, options, benchmark, clbk ) {
	var fail;
	var opts;
	var tic;
	var toc;
	var b;

	// Counters to determine the number of `tic` and `toc` events:
	tic = 0;
	toc = 0;

	// Local copy:
	opts = copy( options );
	opts.iterations = 1;

	// Pretest to check for minimum requirements and/or errors...
	b = new Benchmark( name, opts, benchmark );
	b.on( 'result', onResult );
	b.on( 'tic', onTic );
	b.on( 'toc', onToc );
	b.once( 'end', onEnd );
	b.run();

	/**
	* Callback invoked upon a `result` event.
	*
	* @private
	* @param {(string|Object)} result - result
	*/
	function onResult( result ) {
		if (
			!isString( result ) &&
			!result.ok &&
			!result.todo
		) {
			fail = true;
		}
	}

	/**
	* Callback invoked upon a `tic` event.
	*
	* @private
	*/
	function onTic() {
		tic += 1;
	}

	/**
	* Callback invoked upon a `toc` event.
	*
	* @private
	*/
	function onToc() {
		toc += 1;
	}

	/**
	* Callback invoked upon an `end` event.
	*
	* @private
	* @returns {void}
	*/
	function onEnd() {
		var err;
		if ( fail ) {
			// Possibility that failure is intermittent, but we will assume that the usual case is that the failure would persist across all repeats and no sense failing multiple times when once suffices.
			err = new Error( 'benchmark failed' );
		} else if ( tic !== 1 || toc !== 1 ) {
			// Unable to do anything definitive with timing information (e.g., a tic with no toc or vice versa, or benchmark function calls neither tic nor toc).
			err = new Error( 'invalid benchmark' );
		}
		if ( err ) {
			return clbk( err );
		}
		return clbk();
	}
}


// EXPORTS //

module.exports = pretest;

},{"./../benchmark-class":135,"@stdlib/assert/is-string":108,"@stdlib/utils/copy":249}],152:[function(require,module,exports){
'use strict';

// MODULES //

var isObject = require( '@stdlib/assert/is-plain-object' );
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
var isNull = require( '@stdlib/assert/is-null' );
var isPositiveInteger = require( '@stdlib/assert/is-positive-integer' ).isPrimitive;


// MAIN //

/**
* Validates function options.
*
* @private
* @param {Object} opts - destination object
* @param {Options} options - function options
* @param {boolean} [options.skip] - boolean indicating whether to skip a benchmark
* @param {(PositiveInteger|null)} [options.iterations] - number of iterations
* @param {PositiveInteger} [options.repeats] - number of repeats
* @param {PositiveInteger} [options.timeout] - number of milliseconds before a benchmark automatically fails
* @returns {(Error|null)} error object or null
*
* @example
* var opts = {};
* var options = {
*     'skip': false,
*     'iterations': 1e6,
*     'repeats': 3,
*     'timeout': 10000
* };
*
* var err = validate( opts, options );
* if ( err ) {
*    throw err;
* }
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( hasOwnProp( options, 'skip' ) ) {
		opts.skip = options.skip;
		if ( !isBoolean( opts.skip ) ) {
			return new TypeError( 'invalid option. `skip` option must be a boolean primitive. Option: `' + opts.skip + '`.' );
		}
	}
	if ( hasOwnProp( options, 'iterations' ) ) {
		opts.iterations = options.iterations;
		if (
			!isPositiveInteger( opts.iterations ) &&
			!isNull( opts.iterations )
		) {
			return new TypeError( 'invalid option. `iterations` option must be either a positive integer or `null`. Option: `' + opts.iterations + '`.' );
		}
	}
	if ( hasOwnProp( options, 'repeats' ) ) {
		opts.repeats = options.repeats;
		if ( !isPositiveInteger( opts.repeats ) ) {
			return new TypeError( 'invalid option. `repeats` option must be a positive integer. Option: `' + opts.repeats + '`.' );
		}
	}
	if ( hasOwnProp( options, 'timeout' ) ) {
		opts.timeout = options.timeout;
		if ( !isPositiveInteger( opts.timeout ) ) {
			return new TypeError( 'invalid option. `timeout` option must be a positive integer. Option: `' + opts.timeout + '`.' );
		}
	}
	return null;
}


// EXPORTS //

module.exports = validate;

},{"@stdlib/assert/has-own-property":29,"@stdlib/assert/is-boolean":37,"@stdlib/assert/is-null":84,"@stdlib/assert/is-plain-object":96,"@stdlib/assert/is-positive-integer":99}],153:[function(require,module,exports){
'use strict';

/**
* Benchmark harness.
*
* @module @stdlib/bench/harness
*
* @example
* var bench = require( '@stdlib/bench/harness' );
*
* bench( 'beep', function benchmark( b ) {
*     var x;
*     var i;
*     b.tic();
*     for ( i = 0; i < b.iterations; i++ ) {
*         x = Math.sin( Math.random() );
*         if ( x !== x ) {
*             b.ok( false, 'should not return NaN' );
*         }
*     }
*     b.toc();
*     if ( x !== x ) {
*         b.ok( false, 'should not return NaN' );
*     }
*     b.end();
* });
*/

// MODULES //

var bench = require( './bench.js' );


// EXPORTS //

module.exports = bench;

},{"./bench.js":125}],154:[function(require,module,exports){
'use strict';

// MODULES //

var TransformStream = require( '@stdlib/streams/utils/transform' );
var fromCodePoint = require( '@stdlib/string/from-code-point' );
var log = require( './log.js' );


// MAIN //

/**
* Returns a Transform stream for logging to the console.
*
* @private
* @returns {TransformStream} transform stream
*/
function createStream() {
	var stream;
	var line;

	stream = new TransformStream({
		'transform': transform,
		'flush': flush
	});
	line = '';

	return stream;

	/**
	* Callback invoked upon receiving a new chunk.
	*
	* @private
	* @param {(Buffer|string)} chunk - chunk
	* @param {string} enc - Buffer encoding
	* @param {Callback} clbk - callback to invoke after transforming the streamed chunk
	*/
	function transform( chunk, enc, clbk ) {
		var c;
		var i;

		for ( i = 0; i < chunk.length; i++ ) {
			c = fromCodePoint( chunk[ i ] );
			if ( c === '\n' ) {
				flush();
			} else {
				line += c;
			}
		}
		clbk();
	}

	/**
	* Callback to flush data to `stdout`.
	*
	* @private
	* @param {Callback} [clbk] - callback to invoke after processing data
	* @returns {void}
	*/
	function flush( clbk ) {
		try {
			log( line );
		} catch ( err ) {
			stream.emit( 'error', err );
		}
		line = '';
		if ( clbk ) {
			return clbk();
		}
	}
}


// EXPORTS //

module.exports = createStream;

},{"./log.js":155,"@stdlib/streams/utils/transform":229,"@stdlib/string/from-code-point":233}],155:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Writes a string to the console.
*
* @private
* @param {string} str - string to write
*/
function log( str ) {
	console.log( str ); // eslint-disable-line no-console
}


// EXPORTS //

module.exports = log;

},{}],156:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Removes any pending benchmarks.
*
* @private
*/
function clear() {
	/* eslint-disable no-invalid-this */
	this._benchmarks.length = 0;
}


// EXPORTS //

module.exports = clear;

},{}],157:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Closes a benchmark runner.
*
* @private
* @returns {void}
*/
function closeRunner() {
	/* eslint-disable no-invalid-this */
	var self = this;
	if ( this._closed ) {
		return;
	}
	this._closed = true;
	if ( this._benchmarks.length ) {
		this.clear();
		this._stream.write( '# WARNING: harness closed before completion.\n' );
	} else {
		this._stream.write( '#\n' );
		this._stream.write( '1..'+this.total+'\n' );
		this._stream.write( '# total '+this.total+'\n' );
		this._stream.write( '# pass  '+this.pass+'\n' );
		if ( this.fail ) {
			this._stream.write( '# fail  '+this.fail+'\n' );
		}
		if ( this.skip ) {
			this._stream.write( '# skip  '+this.skip+'\n' );
		}
		if ( this.todo ) {
			this._stream.write( '# todo  '+this.todo+'\n' );
		}
		if ( !this.fail ) {
			this._stream.write( '#\n# ok\n' );
		}
	}
	this._stream.once( 'close', onClose );
	this._stream.destroy();

	/**
	* Callback invoked upon a `close` event.
	*
	* @private
	*/
	function onClose() {
		self.emit( 'close' );
	}
}


// EXPORTS //

module.exports = closeRunner;

},{}],158:[function(require,module,exports){
/* eslint-disable no-underscore-dangle */
'use strict';

// MODULES //

var TransformStream = require( '@stdlib/streams/utils/transform' );
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var nextTick = require( './../utils/next_tick.js' );


// VARIABLES //

var TAP_HEADER = 'TAP version 13';


// MAIN //

/**
* Creates a results stream.
*
* @private
* @param {Options} [options] - stream options
* @throws {TypeError} options argument must be an object
* @throws {TypeError} must provide valid options
* @returns {TransformStream} transform stream
*/
function createStream( options ) {
	/* eslint-disable no-invalid-this */
	var stream;
	var opts;
	var self;
	var id;

	self = this;
	if ( arguments.length ) {
		opts = options;
	} else {
		opts = {};
	}
	stream = new TransformStream( opts );
	if ( opts.objectMode ) {
		id = 0;
		this.on( '_push', onPush );
		this.on( 'done', onDone );
	} else {
		stream.write( TAP_HEADER+'\n' );
		this._stream.pipe( stream );
	}
	this.on( '_run', onRun );
	return stream;

	/**
	* Runs the next benchmark.
	*
	* @private
	*/
	function next() {
		nextTick( onTick );
	}

	/**
	* Callback invoked upon the next tick.
	*
	* @private
	* @returns {void}
	*/
	function onTick() {
		var b = self._benchmarks.shift();
		if ( b ) {
			b.run();
			if ( !b.ended() ) {
				return b.once( 'end', next );
			}
			return next();
		}
		self._running = false;
		self.emit( 'done' );
	}

	/**
	* Callback invoked upon a run event.
	*
	* @private
	* @returns {void}
	*/
	function onRun() {
		if ( !self._running ) {
			self._running = true;
			return next();
		}
	}

	/**
	* Callback invoked upon a push event.
	*
	* @private
	* @param {Benchmark} b - benchmark
	*/
	function onPush( b ) {
		var bid = id;
		id += 1;

		b.once( 'prerun', onPreRun );
		b.on( 'result', onResult );
		b.on( 'end', onEnd );

		/**
		* Callback invoked upon a `prerun` event.
		*
		* @private
		*/
		function onPreRun() {
			var row = {
				'type': 'benchmark',
				'name': b.name,
				'id': bid
			};
			stream.write( row );
		}

		/**
		* Callback invoked upon a `result` event.
		*
		* @private
		* @param {(Object|string)} res - result
		*/
		function onResult( res ) {
			if ( isString( res ) ) {
				res = {
					'benchmark': bid,
					'type': 'comment',
					'name': res
				};
			} else if ( res.operator === 'result' ) {
				res.benchmark = bid;
				res.type = 'result';
			} else {
				res.benchmark = bid;
				res.type = 'assert';
			}
			stream.write( res );
		}

		/**
		* Callback invoked upon an `end` event.
		*
		* @private
		*/
		function onEnd() {
			stream.write({
				'benchmark': bid,
				'type': 'end'
			});
		}
	}

	/**
	* Callback invoked upon a `done` event.
	*
	* @private
	*/
	function onDone() {
		stream.destroy();
	}
}


// EXPORTS //

module.exports = createStream;

},{"./../utils/next_tick.js":167,"@stdlib/assert/is-string":108,"@stdlib/streams/utils/transform":229}],159:[function(require,module,exports){
'use strict';

// MODULES //

var replace = require( '@stdlib/string/replace' );
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var RE_EOL = require( '@stdlib/regexp/eol' );


// VARIABLES //

var RE_WHITESPACE = /\s+/g;


// MAIN //

/**
* Encodes an assertion.
*
* @private
* @param {Object} result - result
* @param {PositiveInteger} count - result count
* @returns {string} encoded assertion
*/
function encodeAssertion( result, count ) {
	var actualStack;
	var errorStack;
	var expected;
	var actual;
	var indent;
	var stack;
	var lines;
	var out;
	var i;

	out = '';

	if ( !result.ok ) {
		out += 'not ';
	}
	// Add result count:
	out += 'ok ' + count;

	// Add description:
	if ( result.name ) {
		out += ' ' + replace( result.name.toString(), RE_WHITESPACE, ' ' );
	}
	// Append directives:
	if ( result.skip ) {
		out += ' # SKIP';
	} else if ( result.todo ) {
		out += ' # TODO';
	}
	out += '\n';
	if ( result.ok ) {
		return out;
	}
	// Format diagnostics as YAML...
	indent = '  ';
	out += indent + '---\n';
	out += indent + 'operator: ' + result.operator + '\n';
	if (
		hasOwnProp( result, 'actual' ) ||
		hasOwnProp( result, 'expected' )
	) {
		// TODO: inspect object logic (https://github.com/substack/tape/blob/master/lib/results.js#L145)
		expected = result.expected;
		actual = result.actual;
		if ( actual !== actual && expected !== expected ) {
			throw new Error( 'TODO: remove me' );
		}
	}
	if ( result.at ) {
		out += indent + 'at: ' + result.at + '\n';
	}
	if ( result.actual ) {
		actualStack = result.actual.stack;
	}
	if ( result.error ) {
		errorStack = result.error.stack;
	}
	if ( actualStack ) {
		stack = actualStack;
	} else {
		stack = errorStack;
	}
	if ( stack ) {
		lines = stack.toString().split( RE_EOL );
		out += indent + 'stack: |-\n';
		for ( i = 0; i < lines.length; i++ ) {
			out += indent + '  ' + lines[ i ] + '\n';
		}
	}
	out += indent + '...\n';
	return out;
}


// EXPORTS //

module.exports = encodeAssertion;

},{"@stdlib/assert/has-own-property":29,"@stdlib/regexp/eol":221,"@stdlib/string/replace":235}],160:[function(require,module,exports){
'use strict';

// VARIABLES //

var YAML_INDENT = '  ';
var YAML_BEGIN = YAML_INDENT + '---\n';
var YAML_END = YAML_INDENT + '...\n';


// MAIN //

/**
* Encodes a result as a YAML block.
*
* @private
* @param {Object} result - result
* @returns {string} encoded result
*/
function encodeResult( result ) {
	var out = YAML_BEGIN;
	out += YAML_INDENT + 'iterations: '+result.iterations+'\n';
	out += YAML_INDENT + 'elapsed: '+result.elapsed+'\n';
	out += YAML_INDENT + 'rate: '+result.rate+'\n';
	out += YAML_END;
	return out;
}


// EXPORTS //

module.exports = encodeResult;

},{}],161:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Forcefully exits a benchmark runner.
*
* @private
*/
function exit() {
	/* eslint-disable no-invalid-this */
	var self;
	var i;
	for ( i = 0; i < this._benchmarks.length; i++ ) {
		this._benchmarks[ i ].exit();
	}
	self = this;
	this.clear();
	this._stream.once( 'close', onClose );
	this._stream.destroy();

	/**
	* Callback invoked upon a `close` event.
	*
	* @private
	*/
	function onClose() {
		self.emit( 'close' );
	}
}


// EXPORTS //

module.exports = exit;

},{}],162:[function(require,module,exports){
'use strict';

// MODULES //

var EventEmitter = require( 'events' ).EventEmitter;
var inherit = require( '@stdlib/utils/inherit' );
var TransformStream = require( '@stdlib/streams/utils/transform' );


// MAIN //

/**
* Benchmark runner.
*
* @private
* @constructor
* @returns {Runner} Runner instance
*
* @example
* var runner = new Runner();
*/
function Runner() {
	if ( !( this instanceof Runner ) ) {
		return new Runner();
	}
	EventEmitter.call( this );

	// Private properties:
	Object.defineProperty( this, '_benchmarks', {
		'value': [],
		'configurable': false,
		'writable': false,
		'enumerable': false
	});

	Object.defineProperty( this, '_stream', {
		'value': new TransformStream(),
		'configurable': false,
		'writable': false,
		'enumerable': false
	});

	Object.defineProperty( this, '_closed', {
		'value': false,
		'configurable': false,
		'writable': true,
		'enumerable': false
	});

	Object.defineProperty( this, '_running', {
		'value': false,
		'configurable': false,
		'writable': true,
		'enumerable': false
	});

	// Public properties:
	Object.defineProperty( this, 'total', {
		'value': 0,
		'configurable': false,
		'writable': true,
		'enumerable': true
	});

	Object.defineProperty( this, 'fail', {
		'value': 0,
		'configurable': false,
		'writable': true,
		'enumerable': true
	});

	Object.defineProperty( this, 'pass', {
		'value': 0,
		'configurable': false,
		'writable': true,
		'enumerable': true
	});

	Object.defineProperty( this, 'skip', {
		'value': 0,
		'configurable': false,
		'writable': true,
		'enumerable': true
	});

	Object.defineProperty( this, 'todo', {
		'value': 0,
		'configurable': false,
		'writable': true,
		'enumerable': true
	});

	return this;
}

/*
* Inherit from the `EventEmitter` prototype.
*/
inherit( Runner, EventEmitter );

/**
* Adds a new benchmark.
*
* @private
* @memberof Runner.prototype
* @function push
* @param {Benchmark} b - benchmark
*/
Object.defineProperty( Runner.prototype, 'push', {
	'value': require( './push.js' ),
	'configurable': false,
	'writable': false,
	'enumerable': false
});

/**
* Creates a results stream.
*
* @private
* @memberof Runner.prototype
* @function createStream
* @param {Options} [options] - stream options
* @returns {TransformStream} transform stream
*/
Object.defineProperty( Runner.prototype, 'createStream', {
	'value': require( './create_stream.js' ),
	'configurable': false,
	'writable': false,
	'enumerable': false
});

/**
* Runs pending benchmarks.
*
* @private
* @memberof Runner.prototype
* @function run
*/
Object.defineProperty( Runner.prototype, 'run', {
	'value': require( './run.js' ),
	'configurable': false,
	'writable': false,
	'enumerable': false
});

/**
* Removes any pending benchmarks.
*
* @private
* @memberof Runner.prototype
* @function clear
*/
Object.defineProperty( Runner.prototype, 'clear', {
	'value': require( './clear.js' ),
	'configurable': false,
	'writable': false,
	'enumerable': false
});

/**
* Closes a benchmark runner.
*
* @private
* @memberof Runner.prototype
* @function close
*/
Object.defineProperty( Runner.prototype, 'close', {
	'value': require( './close.js' ),
	'configurable': false,
	'writable': false,
	'enumerable': false
});

/**
* Forcefully exits a benchmark runner.
*
* @private
* @memberof Runner.prototype
* @function exit
*/
Object.defineProperty( Runner.prototype, 'exit', {
	'value': require( './exit.js' ),
	'configurable': false,
	'writable': false,
	'enumerable': false
});


// EXPORTS //

module.exports = Runner;

},{"./clear.js":156,"./close.js":157,"./create_stream.js":158,"./exit.js":161,"./push.js":163,"./run.js":164,"@stdlib/streams/utils/transform":229,"@stdlib/utils/inherit":298,"events":331}],163:[function(require,module,exports){
/* eslint-disable no-underscore-dangle */
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var encodeAssertion = require( './encode_assertion.js' );
var encodeResult = require( './encode_result.js' );


// MAIN //

/**
* Adds a new benchmark.
*
* @private
* @param {Benchmark} b - benchmark
*/
function push( b ) {
	/* eslint-disable no-invalid-this */
	var self = this;

	this._benchmarks.push( b );

	b.once( 'prerun', onPreRun );
	b.on( 'result', onResult );

	this.emit( '_push', b );

	/**
	* Callback invoked upon a `prerun` event.
	*
	* @private
	*/
	function onPreRun() {
		self._stream.write( '# '+b.name+'\n' );
	}

	/**
	* Callback invoked upon a `result` event.
	*
	* @private
	* @param {(Object|string)} res - result
	* @returns {void}
	*/
	function onResult( res ) {
		// Check for a comment...
		if ( isString( res ) ) {
			return self._stream.write( '# '+res+'\n' );
		}
		if ( res.operator === 'result' ) {
			res = encodeResult( res );
			return self._stream.write( res );
		}
		self.total += 1;
		if ( res.ok ) {
			if ( res.skip ) {
				self.skip += 1;
			} else if ( res.todo ) {
				self.todo += 1;
			}
			self.pass += 1;
		}
		// According to the TAP spec, todos pass even if not "ok"...
		else if ( res.todo ) {
			self.pass += 1;
			self.todo += 1;
		}
		// Everything else is a failure...
		else {
			self.fail += 1;
		}
		res = encodeAssertion( res, self.total );
		self._stream.write( res );
	}
}


// EXPORTS //

module.exports = push;

},{"./encode_assertion.js":159,"./encode_result.js":160,"@stdlib/assert/is-string":108}],164:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Runs pending benchmarks.
*
* @private
*/
function run() {
	/* eslint-disable no-invalid-this */
	this.emit( '_run' );
}


// EXPORTS //

module.exports = run;

},{}],165:[function(require,module,exports){
'use strict';

// MODULES //

var IS_BROWSER = require( '@stdlib/assert/is-browser' );
var canExit = require( './can_exit.js' );


// EXPORTS //

module.exports = ( !IS_BROWSER && canExit );

},{"./can_exit.js":166,"@stdlib/assert/is-browser":42}],166:[function(require,module,exports){
'use strict';

// MODULES //

var proc = require( './process.js' );


// EXPORTS //

module.exports = ( proc && typeof proc.exit === 'function' );

},{"./process.js":168}],167:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Runs a function on a subsequent turn of the event loop.
*
* ## Notes
*
* -   `process.nextTick` is only Node.js.
* -   `setImmediate` is non-standard.
* -   Everything else is browser based (e.g., mutation observer, requestAnimationFrame, etc).
* -   Only API which is universal is `setTimeout`.
* -   Note that `0` is not actually `0ms`. Browser environments commonly have a minimum delay of `4ms`. This is acceptable. Here, the main intent of this function is to give the runtime a chance to run garbage collection, clear state, and tend to any other pending tasks before returning control to benchmark tasks. The larger aim (attainable or not) is to provide each benchmark run with as much of a fresh state as possible.
*
*
* @private
* @param {Function} fcn - function to run upon a subsequent turn of the event loop
*/
function nextTick( fcn ) {
	setTimeout( fcn, 0 );
}


// EXPORTS //

module.exports = nextTick;

},{}],168:[function(require,module,exports){
(function (process){
'use strict';

// EXPORTS //

module.exports = process;

}).call(this,require('_process'))
},{"_process":325}],169:[function(require,module,exports){
'use strict';

/**
* Benchmark harness.
*
* @module @stdlib/bench
*
* @example
* var bench = require( '@stdlib/bench' );
*
* bench( 'beep', function benchmark( b ) {
*     var x;
*     var i;
*     b.tic();
*     for ( i = 0; i < b.iterations; i++ ) {
*         x = Math.sin( Math.random() );
*         if ( x !== x ) {
*             b.ok( false, 'should not return NaN' );
*         }
*     }
*     b.toc();
*     if ( x !== x ) {
*         b.ok( false, 'should not return NaN' );
*     }
*     b.end();
* });
*/

// MODULES //

var bench = require( '@stdlib/bench/harness' );


// EXPORTS //

module.exports = bench;

},{"@stdlib/bench/harness":153}],170:[function(require,module,exports){
'use strict';

// MAIN //

var ctor = require( 'buffer' ).Buffer;


// EXPORTS //

module.exports = ctor;

},{"buffer":326}],171:[function(require,module,exports){
'use strict';

/**
* Buffer constructor.
*
* @module @stdlib/buffer/ctor
*
* @example
* var ctor = require( '@stdlib/buffer/ctor' );
*
* var b = new ctor( [ 1, 2, 3, 4 ] );
* // returns <Buffer>
*/

// MODULES //

var hasNodeBufferSupport = require( '@stdlib/utils/detect-node-buffer-support' );
var main = require( './buffer.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var ctor;
if ( hasNodeBufferSupport() ) {
	ctor = main;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;

},{"./buffer.js":170,"./polyfill.js":172,"@stdlib/utils/detect-node-buffer-support":269}],172:[function(require,module,exports){
'use strict';

// TODO: write (browser) polyfill

// MAIN //

/**
* Buffer constructor.
*
* @throws {Error} not implemented
*/
function polyfill() {
	throw new Error( 'not implemented' );
}


// EXPORTS //

module.exports = polyfill;

},{}],173:[function(require,module,exports){
'use strict';

// MODULES //

var isFunction = require( '@stdlib/assert/is-function' );
var Buffer = require( '@stdlib/buffer/ctor' );


// MAIN //

var bool = isFunction( Buffer.from );


// EXPORTS //

module.exports = bool;

},{"@stdlib/assert/is-function":51,"@stdlib/buffer/ctor":171}],174:[function(require,module,exports){
'use strict';

/**
* Copy buffer data to a new `Buffer` instance.
*
* @module @stdlib/buffer/from-buffer
*
* @example
* var fromArray = require( '@stdlib/type/buffer/from-array' );
* var copyBuffer = require( '@stdlib/buffer/from-buffer' );
*
* var b1 = fromArray( [ 1, 2, 3, 4 ] );
* // returns <Buffer>
*
* var b2 = copyBuffer( b1 );
* // returns <Buffer>
*/

// MODULES //

var hasFrom = require( './has_from.js' );
var main = require( './main.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var copyBuffer;
if ( hasFrom ) {
	copyBuffer = main;
} else {
	copyBuffer = polyfill;
}


// EXPORTS //

module.exports = copyBuffer;

},{"./has_from.js":173,"./main.js":175,"./polyfill.js":176}],175:[function(require,module,exports){
'use strict';

// MODULES //

var isBuffer = require( '@stdlib/assert/is-buffer' );
var Buffer = require( '@stdlib/buffer/ctor' );


// MAIN //

/**
* Copies buffer data to a new `Buffer` instance.
*
* @param {Buffer} buffer - buffer from which to copy
* @throws {TypeError} must provide a `Buffer` instance
* @returns {Buffer} new `Buffer` instance
*
* @example
* var fromArray = require( '@stdlib/type/buffer/from-array' );
*
* var b1 = fromArray( [ 1, 2, 3, 4 ] );
* // returns <Buffer>
*
* var b2 = fromBuffer( b1 );
* // returns <Buffer>
*/
function fromBuffer( buffer ) {
	if ( !isBuffer( buffer ) ) {
		throw new TypeError( 'invalid input argument. Must provide a Buffer. Value: `' + buffer + '`' );
	}
	return Buffer.from( buffer );
}


// EXPORTS //

module.exports = fromBuffer;

},{"@stdlib/assert/is-buffer":43,"@stdlib/buffer/ctor":171}],176:[function(require,module,exports){
'use strict';

// MODULES //

var isBuffer = require( '@stdlib/assert/is-buffer' );
var Buffer = require( '@stdlib/buffer/ctor' );


// MAIN //

/**
* Copies buffer data to a new `Buffer` instance.
*
* @param {Buffer} buffer - buffer from which to copy
* @throws {TypeError} must provide a `Buffer` instance
* @returns {Buffer} new `Buffer` instance
*
* @example
* var fromArray = require( '@stdlib/type/buffer/from-array' );
*
* var b1 = fromArray( [ 1, 2, 3, 4 ] );
* // returns <Buffer>
*
* var b2 = fromBuffer( b1 );
* // returns <Buffer>
*/
function fromBuffer( buffer ) {
	if ( !isBuffer( buffer ) ) {
		throw new TypeError( 'invalid input argument. Must provide a Buffer. Value: `' + buffer + '`' );
	}
	return new Buffer( buffer ); // eslint-disable-line no-buffer-constructor
}


// EXPORTS //

module.exports = fromBuffer;

},{"@stdlib/assert/is-buffer":43,"@stdlib/buffer/ctor":171}],177:[function(require,module,exports){
arguments[4][173][0].apply(exports,arguments)
},{"@stdlib/assert/is-function":51,"@stdlib/buffer/ctor":171,"dup":173}],178:[function(require,module,exports){
'use strict';

/**
* Allocate a buffer containing a provided string.
*
* @module @stdlib/buffer/from-string
*
* @example
* var string2buffer = require( '@stdlib/buffer/from-string' );
*
* var buf = string2buffer( 'beep boop' );
* // returns <Buffer>
*/

// MODULES //

var hasFrom = require( './has_from.js' );
var main = require( './main.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var string2buffer;
if ( hasFrom ) {
	string2buffer = main;
} else {
	string2buffer = polyfill;
}


// EXPORTS //

module.exports = string2buffer;

},{"./has_from.js":177,"./main.js":179,"./polyfill.js":180}],179:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var Buffer = require( '@stdlib/buffer/ctor' );


// MAIN //

/**
* Allocates a buffer containing a provided string.
*
* @param {string} str - input string
* @param {string} [encoding="utf8"] - character encoding
* @throws {TypeError} first argument must be a string
* @throws {TypeError} second argument must be a string
* @throws {TypeError} second argument must be a valid encoding
* @returns {Buffer} new `Buffer` instance
*
* @example
* var buf = fromString( 'beep boop' );
* // returns <Buffer>
*/
function fromString( str, encoding ) {
	if ( !isString( str ) ) {
		throw new TypeError( 'invalid input argument. First argument must be a string. Value: `' + str + '`' );
	}
	if ( arguments.length > 1 ) {
		if ( !isString( encoding ) ) {
			throw new TypeError( 'invalid input argument. Second argument must be a string. Value: `' + encoding + '`' );
		}
		return Buffer.from( str, encoding );
	}
	return Buffer.from( str, 'utf8' );
}


// EXPORTS //

module.exports = fromString;

},{"@stdlib/assert/is-string":108,"@stdlib/buffer/ctor":171}],180:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var Buffer = require( '@stdlib/buffer/ctor' );


// MAIN //

/**
* Allocates a buffer containing a provided string.
*
* @param {string} str - input string
* @param {string} [encoding="utf8"] - character encoding
* @throws {TypeError} first argument must be a string
* @throws {TypeError} second argument must be a string
* @throws {TypeError} second argument must be a valid encoding
* @returns {Buffer} new `Buffer` instance
*
* @example
* var buf = fromString( 'beep boop' );
* // returns <Buffer>
*/
function fromString( str, encoding ) {
	if ( !isString( str ) ) {
		throw new TypeError( 'invalid input argument. First argument must be a string. Value: `' + str + '`' );
	}
	if ( arguments.length > 1 ) {
		if ( !isString( encoding ) ) {
			throw new TypeError( 'invalid input argument. Second argument must be a string. Value: `' + encoding + '`' );
		}
		return new Buffer( str, encoding ); // eslint-disable-line no-buffer-constructor
	}
	return new Buffer( str, 'utf8' ); // eslint-disable-line no-buffer-constructor
}


// EXPORTS //

module.exports = fromString;

},{"@stdlib/assert/is-string":108,"@stdlib/buffer/ctor":171}],181:[function(require,module,exports){
'use strict';

/**
* Maximum length of a generic array.
*
* @module @stdlib/constants/array/max-array-length
*
* @example
* var MAX_ARRAY_LENGTH = require( '@stdlib/constants/array/max-array-length' );
* // returns 4294967295
*/

// MAIN //

/**
* Maximum length of a generic array.
*
* ```tex
* 2^{32} - 1
* ```
*
* @constant
* @type {uinteger32}
* @default 4294967295
*/
var MAX_ARRAY_LENGTH = 4294967295>>>0; // asm type annotation


// EXPORTS //

module.exports = MAX_ARRAY_LENGTH;

},{}],182:[function(require,module,exports){
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

},{}],183:[function(require,module,exports){
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

},{}],184:[function(require,module,exports){
'use strict';

/**
* High word mask for the significand of a double-precision floating-point number.
*
* @module @stdlib/constants/math/float64-high-word-significand-mask
* @type {uinteger32}
*
* @example
* var FLOAT64_HIGH_WORD_SIGNIFICAND_MASK = require( '@stdlib/constants/math/float64-high-word-significand-mask' );
* // returns 1048575
*/


// MAIN //

/**
* High word mask for the significand of a double-precision floating-point number.
*
* ## Notes
*
* The high word mask for the significand of a double-precision floating-point number is an unsigned 32-bit integer with the value \\( 1048575 \\), which corresponds to the bit sequence
*
* ```binarystring
* 0 00000000000 11111111111111111111
* ```
*
* @constant
* @type {uinteger32}
* @default 0x000fffff
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_HIGH_WORD_SIGNIFICAND_MASK = 0x000fffff;


// EXPORTS //

module.exports = FLOAT64_HIGH_WORD_SIGNIFICAND_MASK;

},{}],185:[function(require,module,exports){
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

},{}],186:[function(require,module,exports){
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

},{}],187:[function(require,module,exports){
'use strict';

/**
* Maximum signed 16-bit integer.
*
* @module @stdlib/constants/math/int16-max
* @type {integer32}
*
* @example
* var INT16_MAX = require( '@stdlib/constants/math/int16-max' );
* // returns 32767
*/


// MAIN //

/**
* Maximum signed 16-bit integer.
*
* ## Notes
*
* The number has the value
*
* ```tex
* 2^{15} - 1
* ```
*
* which corresponds to the bit sequence
*
* ```binarystring
* 0111111111111111
* ```
*
* @constant
* @type {integer32}
* @default 32767
*/
var INT16_MAX = 32767|0; // asm type annotation


// EXPORTS //

module.exports = INT16_MAX;

},{}],188:[function(require,module,exports){
'use strict';

/**
* Minimum signed 16-bit integer.
*
* @module @stdlib/constants/math/int16-min
* @type {integer32}
*
* @example
* var INT16_MIN = require( '@stdlib/constants/math/int16-min' );
* // returns -32768
*/


// MAIN //

/**
* Minimum signed 16-bit integer.
*
* ## Notes
*
* The number has the value
*
* ```tex
* -(2^{15})
* ```
*
* which corresponds to the two's complement bit sequence
*
* ```binarystring
* 1000000000000000
* ```
*
* @constant
* @type {integer32}
* @default -32768
*/
var INT16_MIN = -32768|0; // asm type annotation


// EXPORTS //

module.exports = INT16_MIN;

},{}],189:[function(require,module,exports){
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

},{}],190:[function(require,module,exports){
'use strict';

/**
* Minimum signed 32-bit integer.
*
* @module @stdlib/constants/math/int32-min
* @type {integer32}
*
* @example
* var INT32_MIN = require( '@stdlib/constants/math/int32-min' );
* // returns -2147483648
*/


// MAIN //

/**
* Minimum signed 32-bit integer.
*
* ## Notes
*
* The number has the value
*
* ```tex
* -(2^{31})
* ```
*
* which corresponds to the two's complement bit sequence
*
* ```binarystring
* 10000000000000000000000000000000
* ```
*
* @constant
* @type {integer32}
* @default -2147483648
*/
var INT32_MIN = -2147483648|0; // asm type annotation


// EXPORTS //

module.exports = INT32_MIN;

},{}],191:[function(require,module,exports){
'use strict';

/**
* Maximum signed 8-bit integer.
*
* @module @stdlib/constants/math/int8-max
* @type {integer32}
*
* @example
* var INT8_MAX = require( '@stdlib/constants/math/int8-max' );
* // returns 127
*/


// MAIN //

/**
* Maximum signed 8-bit integer.
*
* ## Notes
*
* The number is given by
*
* ```tex
* 2^{7} - 1
* ```
*
* which corresponds to the bit sequence
*
* ```binarystring
* 01111111
* ```
*
* @constant
* @type {integer32}
* @default 127
*/
var INT8_MAX = 127|0; // asm type annotation


// EXPORTS //

module.exports = INT8_MAX;

},{}],192:[function(require,module,exports){
'use strict';

/**
* Minimum signed 8-bit integer.
*
* @module @stdlib/constants/math/int8-min
* @type {integer32}
*
* @example
* var INT8_MIN = require( '@stdlib/constants/math/int8-min' );
* // returns -128
*/


// MAIN //

/**
* Minimum signed 8-bit integer.
*
* ## Notes
*
* The number is given by
*
* ```tex
* -(2^{7})
* ```
*
* which corresponds to the two's complement bit sequence
*
* ```binarystring
* 10000000
* ```
*
* @constant
* @type {integer32}
* @default -128
*/
var INT8_MIN = -128|0; // asm type annotation


// EXPORTS //

module.exports = INT8_MIN;

},{}],193:[function(require,module,exports){
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

},{}],194:[function(require,module,exports){
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

},{}],195:[function(require,module,exports){
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

},{}],196:[function(require,module,exports){
'use strict';

/**
* Maximum Unicode code point in the Basic Multilingual Plane (BMP).
*
* @module @stdlib/constants/string/unicode-max-bmp
* @type {integer32}
*
* @example
* var UNICODE_MAX_BMP = require( '@stdlib/constants/string/unicode-max-bmp' );
* // returns 65535
*/


// MAIN //

/**
* Maximum Unicode code point in the Basic Multilingual Plane (BMP).
*
* @constant
* @type {integer32}
* @default 65535
* @see [Unicode]{@link https://en.wikipedia.org/wiki/Unicode}
*/
var UNICODE_MAX_BMP = 0xFFFF|0; // asm type annotation


// EXPORTS //

module.exports = UNICODE_MAX_BMP;

},{}],197:[function(require,module,exports){
'use strict';

/**
* Maximum Unicode code point.
*
* @module @stdlib/constants/string/unicode-max
* @type {integer32}
*
* @example
* var UNICODE_MAX = require( '@stdlib/constants/string/unicode-max' );
* // returns 1114111
*/


// MAIN //

/**
* Maximum Unicode code point.
*
* @constant
* @type {integer32}
* @default 1114111
* @see [Unicode]{@link https://en.wikipedia.org/wiki/Unicode}
*/
var UNICODE_MAX = 0x10FFFF|0; // asm type annotation


// EXPORTS //

module.exports = UNICODE_MAX;

},{}],198:[function(require,module,exports){
'use strict';

// MODULES //

var bench = require( '@stdlib/bench' );
var isBuffer = require( '@stdlib/assert/is-buffer' );
var pkg = require( './../package.json' ).name;
var image = require( './../lib/browser.js' );


// MAIN //

bench( pkg+'::browser', function benchmark( b ) {
	var data;
	var i;
	b.tic();
	for ( i = 0; i < b.iterations; i++ ) {
		data = image();
		if ( !isBuffer( data ) ) {
			b.fail( 'should return a buffer object' );
		}
	}
	b.toc();
	if ( !isBuffer( data ) ) {
		b.fail( 'should return a buffer object' );
	}
	b.pass( 'benchmark finished' );
	b.end();
});

},{"./../lib/browser.js":200,"./../package.json":202,"@stdlib/assert/is-buffer":43,"@stdlib/bench":169}],199:[function(require,module,exports){
'use strict';

// MODULES //

var bench = require( '@stdlib/bench' );
var IS_BROWSER = require( '@stdlib/assert/is-browser' );
var isBuffer = require( '@stdlib/assert/is-buffer' );
var pkg = require( './../package.json' ).name;
var image = require( './../lib' );


// VARIABLES //

var opts = {
	'skip': IS_BROWSER
};


// MAIN //

bench( pkg, opts, function benchmark( b ) {
	var data;
	var i;
	b.tic();
	for ( i = 0; i < b.iterations; i++ ) {
		data = image();
		if ( !isBuffer( data ) ) {
			b.fail( 'should return a buffer object' );
		}
	}
	b.toc();
	if ( !isBuffer( data ) ) {
		b.fail( 'should return a buffer object' );
	}
	b.pass( 'benchmark finished' );
	b.end();
});

},{"./../lib":200,"./../package.json":202,"@stdlib/assert/is-browser":42,"@stdlib/assert/is-buffer":43,"@stdlib/bench":169}],200:[function(require,module,exports){
'use strict';

// MODULES //

var data = require( './data.js' );
var string2buffer = require( '@stdlib/buffer/from-string' );


// MAIN //

/**
* Returns Allium oreophilum (pink lily leek).
*
* @returns {Buffer} image
*
* @example
* var img = image();
* // returns <Buffer>
*/
function image() {
	return string2buffer( data, 'base64' );
}


// EXPORTS //

module.exports = image;

},{"./data.js":201,"@stdlib/buffer/from-string":178}],201:[function(require,module,exports){
'use strict';

var data = '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YWN0SW5mbyByZGY6cGFyc2VUeXBlPSdSZXNvdXJjZSc+CiAgIDxJcHRjNHhtcENvcmU6Q2lBZHJDaXR5PkxvcyBBbmdlbGVzPC9JcHRjNHhtcENvcmU6Q2lBZHJDaXR5PgogICA8SXB0YzR4bXBDb3JlOkNpQWRyQ3RyeT5Vbml0ZWQgU3RhdGVzPC9JcHRjNHhtcENvcmU6Q2lBZHJDdHJ5PgogICA8SXB0YzR4bXBDb3JlOkNpQWRyRXh0YWRyPjEyMDAgR2V0dHkgQ2VudGVyIERyaXZlPC9JcHRjNHhtcENvcmU6Q2lBZHJFeHRhZHI+CiAgIDxJcHRjNHhtcENvcmU6Q2lBZHJQY29kZT45MDA0OTwvSXB0YzR4bXBDb3JlOkNpQWRyUGNvZGU+CiAgIDxJcHRjNHhtcENvcmU6Q2lBZHJSZWdpb24+Q2FsaWZvcm5pYTwvSXB0YzR4bXBDb3JlOkNpQWRyUmVnaW9uPgogICA8SXB0YzR4bXBDb3JlOkNpRW1haWxXb3JrPnJpZ2h0c0BnZXR0eS5lZHU8L0lwdGM0eG1wQ29yZTpDaUVtYWlsV29yaz4KICAgPElwdGM0eG1wQ29yZTpDaVVybFdvcms+d3d3LmdldHR5LmVkdTwvSXB0YzR4bXBDb3JlOkNpVXJsV29yaz4KICA8L0lwdGM0eG1wQ29yZTpDcmVhdG9yQ29udGFjdEluZm8+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOklwdGM0eG1wRXh0PSdodHRwOi8vaXB0Yy5vcmcvc3RkL0lwdGM0eG1wRXh0LzIwMDgtMDItMjkvJz4KICA8SXB0YzR4bXBFeHQ6QXJ0d29ya09yT2JqZWN0PgogICA8cmRmOkJhZz4KICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPgogICAgIDxJcHRjNHhtcEV4dDpBT0NyZWF0b3I+CiAgICAgIDxyZGY6U2VxPgogICAgICAgPHJkZjpsaT5LYXJsIEJsb3NzZmVsZHQ8L3JkZjpsaT4KICAgICAgPC9yZGY6U2VxPgogICAgIDwvSXB0YzR4bXBFeHQ6QU9DcmVhdG9yPgogICAgIDxJcHRjNHhtcEV4dDpBT0RhdGVDcmVhdGVkPjE5Mjg8L0lwdGM0eG1wRXh0OkFPRGF0ZUNyZWF0ZWQ+CiAgICAgPElwdGM0eG1wRXh0OkFPU291cmNlPlRoZSBKLiBQYXVsIEdldHR5IE11c2V1bSwgTG9zIEFuZ2VsZXM8L0lwdGM0eG1wRXh0OkFPU291cmNlPgogICAgIDxJcHRjNHhtcEV4dDpBT1NvdXJjZUludk5vPjg0LlhNLjE0Mi43PC9JcHRjNHhtcEV4dDpBT1NvdXJjZUludk5vPgogICAgIDxJcHRjNHhtcEV4dDpBT1RpdGxlPgogICAgICA8cmRmOkFsdD4KICAgICAgIDxyZGY6bGkgeG1sOmxhbmc9J3gtZGVmYXVsdCc+QWxsaXVtIG9zdHJvd3NraWFudW0sIEtub2JsYXVjaHBmbGFuemU8L3JkZjpsaT4KICAgICAgPC9yZGY6QWx0PgogICAgIDwvSXB0YzR4bXBFeHQ6QU9UaXRsZT4KICAgIDwvcmRmOmxpPgogICA8L3JkZjpCYWc+CiAgPC9JcHRjNHhtcEV4dDpBcnR3b3JrT3JPYmplY3Q+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOmRjPSdodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyc+CiAgPGRjOmNyZWF0b3I+CiAgIDxyZGY6U2VxPgogICAgPHJkZjpsaT5UaGUgSi4gUGF1bCBHZXR0eSBNdXNldW08L3JkZjpsaT4KICAgPC9yZGY6U2VxPgogIDwvZGM6Y3JlYXRvcj4KICA8ZGM6ZGVzY3JpcHRpb24+CiAgIDxyZGY6QWx0PgogICAgPHJkZjpsaSB4bWw6bGFuZz0neC1kZWZhdWx0Jz5BbGxpdW0gb3N0cm93c2tpYW51bSwgS25vYmxhdWNocGZsYW56ZTsgS2FybCBCbG9zc2ZlbGR0IChHZXJtYW4sIDE4NjUgLSAxOTMyKTsgQmVybGluLCBHZXJtYW55OyAxOTI4OyBHZWxhdGluIHNpbHZlciBwcmludDsgMTUuOSDDlyAyMCBjbSAoNiAxLzQgw5cgNyA3LzggaW4uKTsgODQuWE0uMTQyLjc8L3JkZjpsaT4KICAgPC9yZGY6QWx0PgogIDwvZGM6ZGVzY3JpcHRpb24+CiAgPGRjOnRpdGxlPgogICA8cmRmOkFsdD4KICAgIDxyZGY6bGkgeG1sOmxhbmc9J3gtZGVmYXVsdCc+QWxsaXVtIG9zdHJvd3NraWFudW0sIEtub2JsYXVjaHBmbGFuemU8L3JkZjpsaT4KICAgPC9yZGY6QWx0PgogIDwvZGM6dGl0bGU+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOnBob3Rvc2hvcD0naHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyc+CiAgPHBob3Rvc2hvcDpTb3VyY2U+VGhlIEouIFBhdWwgR2V0dHkgTXVzZXVtLCBMb3MgQW5nZWxlczwvcGhvdG9zaG9wOlNvdXJjZT4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6eG1wPSdodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvJz4KICA8eG1wOk1ldGFkYXRhRGF0ZT4yMDE2LTA0LTEzVDEyOjMzOjE4PC94bXA6TWV0YWRhdGFEYXRlPgogPC9yZGY6RGVzY3JpcHRpb24+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczp4bXBSaWdodHM9J2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9yaWdodHMvJz4KICA8eG1wUmlnaHRzOlVzYWdlVGVybXM+CiAgIDxyZGY6QWx0PgogICAgPHJkZjpsaSB4bWw6bGFuZz0neC1kZWZhdWx0Jz5odHRwOi8vd3d3LmdldHR5LmVkdS9sZWdhbC9pbWFnZV9yZXF1ZXN0LzwvcmRmOmxpPgogICA8L3JkZjpBbHQ+CiAgPC94bXBSaWdodHM6VXNhZ2VUZXJtcz4KIDwvcmRmOkRlc2NyaXB0aW9uPgo8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSd3Jz8+/9sAQwACAQEBAQECAQEBAgICAgIEAwICAgIFBAQDBAYFBgYGBQYGBgcJCAYHCQcGBggLCAkKCgoKCgYICwwLCgwJCgoK/9sAQwECAgICAgIFAwMFCgcGBwoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoK/8AAEQgEAAMnAwERAAIRAQMRAf/EAB4AAAIBBQEBAQAAAAAAAAAAAAABBwIFBggJBAMK/8QAUBAAAQMCBQIEAwUGBAUDAQIPAQIDEQAEBQYSITEHQQgTUWEicYEJFDKRoRUjQrHB8ApS0eEWJDNi8RdDclOCkhglNGOiwpOyGTVEZHSDlP/EABoBAQEBAQEBAQAAAAAAAAAAAAABAgMEBQb/xAAoEQEBAAIDAQABBQEBAAMBAQAAAREhAjFBAxIiMlFhcQQTIzNCgaH/2gAM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';


// EXPORTS //

module.exports = data;

},{}],202:[function(require,module,exports){
module.exports={
  "name": "@stdlib/datasets/img-allium-oreophilum",
  "version": "0.0.0",
  "description": "Allium oreophilum (pink lily leek).",
  "license": "Apache-2.0",
  "author": {
    "name": "The Stdlib Authors",
    "url": "https://github.com/stdlib-js/stdlib/graphs/contributors"
  },
  "contributors": [
    {
      "name": "The Stdlib Authors",
      "url": "https://github.com/stdlib-js/stdlib/graphs/contributors"
    }
  ],
  "bin": {
    "img-allium-oreophilum": "./bin/cli"
  },
  "main": "./lib",
  "browser": "./lib/browser.js",
  "directories": {
    "benchmark": "./benchmark",
    "bin": "./bin",
    "data": "./data",
    "doc": "./docs",
    "example": "./examples",
    "lib": "./lib",
    "test": "./test"
  },
  "scripts": {},
  "homepage": "https://github.com/stdlib-js/stdlib",
  "repository": {
    "type": "git",
    "url": "git://github.com/stdlib-js/stdlib.git"
  },
  "bugs": {
    "url": "https://github.com/stdlib-js/stdlib/issues"
  },
  "dependencies": {},
  "devDependencies": {},
  "engines": {
    "node": ">=0.10.0",
    "npm": ">2.7.0"
  },
  "os": [
    "aix",
    "darwin",
    "freebsd",
    "linux",
    "macos",
    "openbsd",
    "sunos",
    "win32",
    "windows"
  ],
  "keywords": [
    "stdlib",
    "datasets",
    "dataset",
    "data",
    "image",
    "img",
    "plant",
    "flower"
  ]
}

},{}],203:[function(require,module,exports){
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

},{"./is_integer.js":204}],204:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":208}],205:[function(require,module,exports){
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

},{"./is_nan.js":206}],206:[function(require,module,exports){
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

},{}],207:[function(require,module,exports){
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

},{}],208:[function(require,module,exports){
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

},{"./floor.js":207}],209:[function(require,module,exports){
'use strict';

/**
* Decompose a double-precision floating-point number into integral and fractional parts.
*
* @module @stdlib/math/base/special/modf
*
* @example
* var modf = require( '@stdlib/math/base/special/modf' );
*
* var parts = modf( 3.14 );
* // returns [ 3.0, 0.14000000000000012 ]
*
* @example
* var Float64Array = require( '@stdlib/array/float64' );
* var modf = require( '@stdlib/math/base/special/modf' );
*
* var out = new Float64Array( 2 );
*
* var parts = modf( out, 3.14 );
* // returns [ 3.0, 0.14000000000000012 ]
*
* var bool = ( parts === out );
* // returns true
*/

// MODULES //

var modf = require( './main.js' );


// EXPORTS //

module.exports = modf;

},{"./main.js":210}],210:[function(require,module,exports){
'use strict';

// MODULES //

var fcn = require( './modf.js' );


// MAIN //

/**
* Decomposes a double-precision floating-point number into integral and fractional parts, each having the same type and sign as the input value.
*
* @param {(Array|TypedArray|Object)} [out] - output array
* @param {number} x - input value
* @returns {(Array|TypedArray|Object)} output array
*
* @example
* var parts = modf( 3.14 );
* // returns [ 3.0, 0.14000000000000012 ]
*
* @example
* var Float64Array = require( '@stdlib/array/float64' );
*
* var out = new Float64Array( 2 );
*
* var parts = modf( out, 3.14 );
* // returns <Float64Array>[ 3.0, 0.14000000000000012 ]
*
* var bool = ( parts === out );
* // returns true
*/
function modf( out, x ) {
	if ( arguments.length === 1 ) {
		return fcn( [ 0.0, 0.0 ], out );
	}
	return fcn( out, x );
}


// EXPORTS //

module.exports = modf;

},{"./modf.js":211}],211:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var toWords = require( '@stdlib/number/float64/base/to-words' );
var fromWords = require( '@stdlib/number/float64/base/from-words' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var FLOAT64_EXPONENT_BIAS = require( '@stdlib/constants/math/float64-exponent-bias' );
var FLOAT64_HIGH_WORD_EXPONENT_MASK = require( '@stdlib/constants/math/float64-high-word-exponent-mask' ); // eslint-disable-line id-length
var FLOAT64_HIGH_WORD_SIGNIFICAND_MASK = require( '@stdlib/constants/math/float64-high-word-significand-mask' ); // eslint-disable-line id-length


// VARIABLES //

// 4294967295 => 0xffffffff => 11111111111111111111111111111111
var ALL_ONES = 4294967295>>>0; // asm type annotation

// High/low words workspace:
var WORDS = [ 0|0, 0|0 ]; // WARNING: not thread safe


// MAIN //

/**
* Decomposes a double-precision floating-point number into integral and fractional parts, each having the same type and sign as the input value.
*
* @private
* @param {(Array|TypedArray|Object)} out - output array
* @param {number} x - input value
* @returns {(Array|TypedArray|Object)} output array
*
* @example
* var parts = modf( new Array( 2 ), 3.14 );
* // returns [ 3.0, 0.14000000000000012 ]
*/
function modf( out, x ) {
	var high;
	var low;
	var exp;
	var i;

	// Special cases...
	if ( x < 1.0 ) {
		if ( x < 0.0 ) {
			modf( out, -x );
			out[ 0 ] *= -1.0;
			out[ 1 ] *= -1.0;
			return out;
		}
		if ( x === 0.0 ) { // [ +-0, +-0 ]
			out[ 0 ] = x;
			out[ 1 ] = x;
			return out;
		}
		out[ 0 ] = 0.0;
		out[ 1 ] = x;
		return out;
	}
	if ( isnan( x ) ) {
		out[ 0 ] = NaN;
		out[ 1 ] = NaN;
		return out;
	}
	if ( x === PINF ) {
		out[ 0 ] = PINF;
		out[ 1 ] = 0.0;
		return out;
	}
	// Decompose |x|...

	// Extract the high and low words:
	toWords( WORDS, x );
	high = WORDS[ 0 ];
	low = WORDS[ 1 ];

	// Extract the unbiased exponent from the high word:
	exp = ((high & FLOAT64_HIGH_WORD_EXPONENT_MASK) >> 20)|0; // asm type annotation
	exp -= FLOAT64_EXPONENT_BIAS|0; // asm type annotation

	// Handle smaller values (x < 2**20 = 1048576)...
	if ( exp < 20 ) {
		i = (FLOAT64_HIGH_WORD_SIGNIFICAND_MASK >> exp)|0; // asm type annotation

		// Determine if `x` is integral by checking for significand bits which cannot be exponentiated away...
		if ( ((high&i)|low) === 0 ) {
			out[ 0 ] = x;
			out[ 1 ] = 0.0;
			return out;
		}
		// Turn off all the bits which cannot be exponentiated away:
		high &= (~i);

		// Generate the integral part:
		i = fromWords( high, 0 );

		// The fractional part is whatever is leftover:
		out[ 0 ] = i;
		out[ 1 ] = x - i;
		return out;
	}
	// Check if `x` can even have a fractional part...
	if ( exp > 51 ) {
		// `x` is integral:
		out[ 0 ] = x;
		out[ 1 ] = 0.0;
		return out;
	}
	i = ALL_ONES >>> (exp-20);

	// Determine if `x` is integral by checking for less significant significand bits which cannot be exponentiated away...
	if ( (low&i) === 0 ) {
		out[ 0 ] = x;
		out[ 1 ] = 0.0;
		return out;
	}
	// Turn off all the bits which cannot be exponentiated away:
	low &= (~i);

	// Generate the integral part:
	i = fromWords( high, low );

	// The fractional part is whatever is leftover:
	out[ 0 ] = i;
	out[ 1 ] = x - i;
	return out;
}


// EXPORTS //

module.exports = modf;

},{"@stdlib/constants/math/float64-exponent-bias":182,"@stdlib/constants/math/float64-high-word-exponent-mask":183,"@stdlib/constants/math/float64-high-word-significand-mask":184,"@stdlib/constants/math/float64-pinf":186,"@stdlib/math/base/assert/is-nan":205,"@stdlib/number/float64/base/from-words":214,"@stdlib/number/float64/base/to-words":217}],212:[function(require,module,exports){
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

},{"./round.js":213}],213:[function(require,module,exports){
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

},{}],214:[function(require,module,exports){
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

},{"./main.js":216}],215:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":65}],216:[function(require,module,exports){
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

},{"./indices.js":215,"@stdlib/array/float64":5,"@stdlib/array/uint32":19}],217:[function(require,module,exports){
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

},{"./main.js":219}],218:[function(require,module,exports){
arguments[4][215][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":65,"dup":215}],219:[function(require,module,exports){
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

},{"./to_words.js":220}],220:[function(require,module,exports){
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

},{"./indices.js":218,"@stdlib/array/float64":5,"@stdlib/array/uint32":19}],221:[function(require,module,exports){
'use strict';

/**
* Regular expression to match a newline character sequence.
*
* @module @stdlib/regexp/eol
* @type {RegExp}
*
* @example
* var RE_EOL = require( '@stdlib/regexp/eol' );
*
* var bool = RE_EOL.test( '\n' );
* // returns true
*
* bool = RE_EOL.test( '\r\n' );
* // returns true
*
* bool = RE_EOL.test( '\\r\\n' );
* // returns false
*/


// MAIN //

/**
* Matches a newline character sequence.
*
* Regular expression: `/\r?\n/`
*
* -   `\r?`
*     -   match a carriage return character (optional)
*
* -   `\n`
*     -   match a line feed character
*
* @constant
* @type {RegExp}
* @default /\r?\n/
*/
var RE_EOL = /\r?\n/;


// EXPORTS //

module.exports = RE_EOL;

},{}],222:[function(require,module,exports){
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

},{}],223:[function(require,module,exports){
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
* -   `/^\/`
*     -   match a string that begins with a `/`
*
* -   `()`
*     -   capture
*
* -   `(?:)+`
*     -   capture, but do not remember, a group of characters which occur one or more times
*
* -   `\\\/`
*     -   match the literal `\/`
*
* -   `|`
*     -   OR
*
* -   `[^\/]`
*     -   anything which is not the literal `\/`
*
* -   `\/`
*     -   match the literal `/`
*
* -   `([imgy]*)`
*     -   capture any characters matching `imgy` occurring zero or more times
*
* -   `$/`
*     -   string end
*
*
* @constant
* @type {RegExp}
* @default /^\/((?:\\\/|[^\/])+)\/([imgy]*)$/
*/
var RE_REGEXP = /^\/((?:\\\/|[^\/])+)\/([imgy]*)$/; // eslint-disable-line no-useless-escape


// EXPORTS //

module.exports = RE_REGEXP;

},{}],224:[function(require,module,exports){
'use strict';

// MODULES //

var logger = require( 'debug' );


// VARIABLES //

var debug = logger( 'transform-stream' );


// MAIN //

/**
* Implements the `_transform` method as a pass through.
*
* @private
* @param {(Buffer|string)} chunk - streamed chunk
* @param {string} encoding - Buffer encoding
* @param {Callback} clbk - callback to invoke after transforming the streamed chunk
*/
function transform( chunk, encoding, clbk ) {
	debug( 'Received a new chunk. Chunk: %s. Encoding: %s.', chunk.toString(), encoding );
	clbk( null, chunk );
}


// EXPORTS //

module.exports = transform;

},{"debug":328}],225:[function(require,module,exports){
'use strict';

// MODULES //

var logger = require( 'debug' );
var Transform = require( 'readable-stream' ).Transform;
var copy = require( '@stdlib/utils/copy' );
var DEFAULTS = require( './defaults.json' );
var validate = require( './validate.js' );
var destroy = require( './destroy.js' );
var _transform = require( './_transform.js' ); // eslint-disable-line no-underscore-dangle


// VARIABLES //

var debug = logger( 'transform-stream' );


// MAIN //

/**
* Transform stream constructor factory.
*
* @param {Options} [options] - stream options
* @param {Function} [options.transform] - callback to invoke upon receiving a new chunk
* @param {Function} [options.flush] - callback to invoke after receiving all chunks and prior to the stream closing
* @param {boolean} [options.objectMode=false] - specifies whether a stream should operate in object mode
* @param {(string|null)} [options.encoding=null] - specifies how `Buffer` objects should be decoded to `strings`
* @param {NonNegativeNumber} [options.highWaterMark] - specifies the `Buffer` level for when `write()` starts returning `false`
* @param {boolean} [options.allowHalfOpen=false] - specifies whether the stream should remain open even if one side ends
* @param {boolean} [options.decodeStrings=true] - specifies whether to decode `strings` into `Buffer` objects when writing
* @throws {TypeError} must provide valid options
* @returns {Function} Transform stream constructor
*
* @example
* var stdout = require( '@stdlib/streams/base/stdout' );
*
* function transform( chunk, enc, clbk ) {
*     clbk( null, chunk.toString()+'\n' );
* }
*
* var opts = {
*     'transform': transform
* };
*
* var TransformStream = ctor( opts );
*
* var stream = new TransformStream();
*
* stream.pipe( stdout );
*
* stream.write( '1' );
* stream.write( '2' );
* stream.write( '3' );
*
* stream.end();
* // => '1\n2\n3\n'
*/
function ctor( options ) {
	var transform;
	var copts;
	var err;

	copts = copy( DEFAULTS );
	if ( arguments.length ) {
		err = validate( copts, options );
		if ( err ) {
			throw err;
		}
	}
	if ( copts.transform ) {
		transform = copts.transform;
	} else {
		transform = _transform;
	}
	/**
	* Transform stream constructor.
	*
	* @private
	* @constructor
	* @param {Options} [options] - stream options
	* @param {boolean} [options.objectMode=false] - specifies whether a stream should operate in object mode
	* @param {(string|null)} [options.encoding=null] - specifies how `Buffer` objects should be decoded to `strings`
	* @param {NonNegativeNumber} [options.highWaterMark] - specifies the `Buffer` level for when `write()` starts returning `false`
	* @param {boolean} [options.allowHalfOpen=false] - specifies whether the stream should remain open even if one side ends
	* @param {boolean} [options.decodeStrings=true] - specifies whether to decode `strings` into `Buffer` objects when writing
	* @throws {TypeError} must provide valid options
	* @returns {TransformStream} transform stream
	*
	* @example
	* var stdout = require( '@stdlib/streams/base/stdout' );
	*
	* var stream = new TransformStream();
	*
	* stream.pipe( stdout );
	*
	* stream.write( '1' );
	* stream.write( '2' );
	* stream.write( '3' );
	*
	* stream.end();
	* // => '1\n2\n3\n'
	*/
	function TransformStream( options ) {
		var opts;
		var err;
		if ( !( this instanceof TransformStream ) ) {
			if ( arguments.length ) {
				return new TransformStream( options );
			}
			return new TransformStream();
		}
		opts = copy( copts );
		if ( arguments.length ) {
			err = validate( opts, options );
			if ( err ) {
				throw err;
			}
		}
		debug( 'Creating a transform stream configured with the following options: %s.', JSON.stringify( opts ) );
		Transform.call( this, opts );
		this._destroyed = false;
		return this;
	}

	/*
	* Create a prototype which inherits from the parent prototype.
	*/
	TransformStream.prototype = Object.create( Transform.prototype );

	/*
	* Set the constructor.
	*/
	TransformStream.prototype.constructor = TransformStream;

	/**
	* Implements the `_transform` method.
	*
	* @private
	* @memberof TransformStream.prototype
	* @function _transform
	* @param {(Buffer|string)} chunk - streamed chunk
	* @param {string} encoding - Buffer encoding
	* @param {Callback} clbk - callback to invoke after transforming the streamed chunk
	*/
	TransformStream.prototype._transform = transform; // eslint-disable-line no-underscore-dangle

	if ( copts.flush ) {
		/**
		* Implements the `_flush` method.
		*
		* @private
		* @memberof TransformStream.prototype
		* @function _flush
		* @param {Callback} callback to invoke after performing flush tasks
		*/
		TransformStream.prototype._flush = copts.flush; // eslint-disable-line no-underscore-dangle
	}

	/**
	* Gracefully destroys a stream, providing backwards compatibility.
	*
	* @private
	* @memberof TransformStream.prototype
	* @function destroy
	* @param {Object} [error] - optional error message
	* @returns {TransformStream} stream instance
	*/
	TransformStream.prototype.destroy = destroy;

	return TransformStream;
}


// EXPORTS //

module.exports = ctor;

},{"./_transform.js":224,"./defaults.json":226,"./destroy.js":227,"./validate.js":232,"@stdlib/utils/copy":249,"debug":328,"readable-stream":349}],226:[function(require,module,exports){
module.exports={
	"objectMode": false,
	"encoding": null,
	"allowHalfOpen": false,
	"decodeStrings": true
}

},{}],227:[function(require,module,exports){
(function (process){
'use strict';

// MODULES //

var logger = require( 'debug' );


// VARIABLES //

var debug = logger( 'transform-stream' );


// MAIN //

/**
* Gracefully destroys a stream, providing backwards compatibility.
*
* @private
* @param {Object} [error] - optional error message
* @returns {Stream} stream instance
*/
function destroy( error ) {
	/* eslint-disable no-invalid-this */
	var self;
	if ( this._destroyed ) {
		debug( 'Attempted to destroy an already destroyed stream.' );
		return this;
	}
	self = this;
	this._destroyed = true;

	// TODO: replace with polyfill
	process.nextTick( close );

	return this;

	/**
	* Closes a stream.
	*
	* @private
	*/
	function close() {
		if ( error ) {
			debug( 'Stream was destroyed due to an error. Error: %s.', JSON.stringify( error ) );
			self.emit( 'error', error );
		}
		debug( 'Closing the stream...' );
		self.emit( 'close' );
	}
}


// EXPORTS //

module.exports = destroy;

}).call(this,require('_process'))
},{"_process":325,"debug":328}],228:[function(require,module,exports){
'use strict';

// MODULES //

var copy = require( '@stdlib/utils/copy' );
var Stream = require( './stream.js' );


// MAIN //

/**
* Creates a reusable transform stream factory.
*
* @param {Options} [options] - stream options
* @param {boolean} [options.objectMode=false] - specifies whether a stream should operate in object mode
* @param {(string|null)} [options.encoding=null] - specifies how `Buffer` objects should be decoded to `strings`
* @param {NonNegativeNumber} [options.highWaterMark] - specifies the `Buffer` level for when `write()` starts returning `false`
* @param {boolean} [options.allowHalfOpen=false] - specifies whether the stream should remain open even if one side ends
* @param {boolean} [options.decodeStrings=true] - specifies whether to decode `strings` into `Buffer` objects when writing
* @returns {Function} transform stream factory
*
* @example
* function transform( chunk, enc, clbk ) {
*     clbk( null, chunk.toString()+'\n' );
* }
*
* var opts = {
*     'objectMode': true,
*     'encoding': 'utf8',
*     'highWaterMark': 64,
*     'decodeStrings': false
* };
*
* var factory = streamFactory( opts );
*
* // Create 10 identically configured streams...
* var streams = [];
* var i;
* for ( i = 0; i < 10; i++ ) {
*     streams.push( factory( transform ) );
* }
*/
function streamFactory( options ) {
	var opts;
	if ( arguments.length ) {
		opts = copy( options );
	} else {
		opts = {};
	}
	return createStream;

	/**
	* Creates a transform stream.
	*
	* @private
	* @param {Function} transform - callback to invoke upon receiving a new chunk
	* @param {Function} [flush] - callback to invoke after receiving all chunks and prior to the stream closing
	* @throws {TypeError} must provide valid options
	* @throws {TypeError} transform callback must be a function
	* @throws {TypeError} flush callback must be a function
	* @returns {TransformStream} transform stream
	*/
	function createStream( transform, flush ) {
		opts.transform = transform;
		if ( arguments.length > 1 ) {
			opts.flush = flush;
		} else {
			delete opts.flush; // clear any previous `flush`
		}
		return new Stream( opts );
	}
}


// EXPORTS //

module.exports = streamFactory;

},{"./stream.js":231,"@stdlib/utils/copy":249}],229:[function(require,module,exports){
'use strict';

/**
* Transform stream.
*
* @module @stdlib/streams/utils/transform
*
* @example
* var stdout = require( '@stdlib/streams/base/stdout' );
* var transformStream = require( '@stdlib/streams/utils/transform' );
*
* function transform( chunk, enc, clbk ) {
*     clbk( null, chunk.toString()+'\n' );
* }
*
* var opts = {
*     'transform': transform
* };
* var stream = transformStream( opts );
*
* stream.pipe( stdout );
*
* stream.write( '1' );
* stream.write( '2' );
* stream.write( '3' );
*
* stream.end();
* // => '1\n2\n3\n'
*
*
* @example
* var transformStream = require( '@stdlib/streams/utils/transform' );
*
* function transform( chunk, enc, clbk ) {
*     clbk( null, chunk.toString()+'\n' );
* }
*
* var opts = {
*     'objectMode': true,
*     'encoding': 'utf8',
*     'highWaterMark': 64,
*     'decodeStrings': false
* };
*
* var factory = transformStream.factory( opts );
*
* // Create 10 identically configured streams...
* var streams = [];
* var i;
* for ( i = 0; i < 10; i++ ) {
*     streams.push( factory( transform ) );
* }
*
*
* @example
* var stdout = require( '@stdlib/streams/base/stdout' );
* var transformStream = require( '@stdlib/streams/utils/transform' );
*
* function stringify( chunk, enc, clbk ) {
*     clbk( null, JSON.stringify( chunk ) );
* }
*
* function newline( chunk, enc, clbk ) {
*     clbk( null, chunk+'\n' );
* }
*
* var s1 = transformStream.objectMode({
*     'transform': stringify
* });
*
* var s2 = transformStream.objectMode({
*     'transform': newline
* });
*
* s1.pipe( s2 ).pipe( stdout );
*
* s1.write( {'value': 'a'} );
* s1.write( {'value': 'b'} );
* s1.write( {'value': 'c'} );
*
* s1.end();
* // => '{"value":"a"}\n{"value":"b"}\n{"value":"c"}\n'
*
*
* @example
* var stdout = require( '@stdlib/streams/base/stdout' );
* var transformStream = require( '@stdlib/streams/utils/transform' );
*
* function transform( chunk, enc, clbk ) {
*     clbk( null, chunk.toString()+'\n' );
* }
*
* var opts = {
*     'transform': transform
* };
*
* var Stream = transformStream.ctor( opts );
*
* var stream = new Stream();
*
* stream.pipe( stdout );
*
* stream.write( '1' );
* stream.write( '2' );
* stream.write( '3' );
*
* stream.end();
* // => '1\n2\n3\n'
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var transform = require( './stream.js' );
var objectMode = require( './object_mode.js' );
var factory = require( './factory.js' );
var ctor = require( './ctor.js' );


// MAIN //

setReadOnly( transform, 'objectMode', objectMode );
setReadOnly( transform, 'factory', factory );
setReadOnly( transform, 'ctor', ctor );


// EXPORTS //

module.exports = transform;

},{"./ctor.js":225,"./factory.js":228,"./object_mode.js":230,"./stream.js":231,"@stdlib/utils/define-read-only-property":252}],230:[function(require,module,exports){
'use strict';

// MODULES //

var Stream = require( './stream.js' );


// MAIN //

/**
* Returns a transform stream with `objectMode` set to `true`.
*
* @param {Options} [options] - stream options
* @param {Function} [options.transform] - callback to invoke upon receiving a new chunk
* @param {Function} [options.flush] - callback to invoke after receiving all chunks and prior to the stream closing
* @param {(string|null)} [options.encoding=null] - specifies how `Buffer` objects should be decoded to `strings`
* @param {NonNegativeNumber} [options.highWaterMark] - specifies the `Buffer` level for when `write()` starts returning `false`
* @param {boolean} [options.allowHalfOpen=false] - specifies whether the stream should remain open even if one side ends
* @param {boolean} [options.decodeStrings=true] - specifies whether to decode `strings` into `Buffer` objects when writing
* @throws {TypeError} must provide valid options
* @returns {TransformStream} transform stream
*
* @example
* var stdout = require( '@stdlib/streams/base/stdout' );
*
* function stringify( chunk, enc, clbk ) {
*     clbk( null, JSON.stringify( chunk ) );
* }
*
* function newline( chunk, enc, clbk ) {
*     clbk( null, chunk+'\n' );
* }
*
* var s1 = objectMode({
*     'transform': stringify
* });
*
* var s2 = objectMode({
*     'transform': newline
* });
*
* s1.pipe( s2 ).pipe( stdout );
*
* s1.write( {'value': 'a'} );
* s1.write( {'value': 'b'} );
* s1.write( {'value': 'c'} );
*
* s1.end();
* // => '{"value":"a"}\n{"value":"b"}\n{"value":"c"}\n'
*/
function objectMode( options ) {
	var opts;
	if ( arguments.length ) {
		opts = options;
	} else {
		opts = {};
	}
	opts.objectMode = true;
	return new Stream( opts );
}


// EXPORTS //

module.exports = objectMode;

},{"./stream.js":231}],231:[function(require,module,exports){
'use strict';

// MODULES //

var logger = require( 'debug' );
var Transform = require( 'readable-stream' ).Transform;
var copy = require( '@stdlib/utils/copy' );
var DEFAULTS = require( './defaults.json' );
var validate = require( './validate.js' );
var destroy = require( './destroy.js' );
var _transform = require( './_transform.js' ); // eslint-disable-line no-underscore-dangle


// VARIABLES //

var debug = logger( 'transform-stream' );


// MAIN //

/**
* Transform stream constructor.
*
* @constructor
* @param {Options} [options] - stream options
* @param {Function} [options.transform] - callback to invoke upon receiving a new chunk
* @param {Function} [options.flush] - callback to invoke after receiving all chunks and prior to the stream closing
* @param {boolean} [options.objectMode=false] - specifies whether stream should operate in object mode
* @param {(string|null)} [options.encoding=null] - specifies how `Buffer` objects should be decoded to `strings`
* @param {NonNegativeNumber} [options.highWaterMark] - specifies the `Buffer` level for when `write()` starts returning `false`
* @param {boolean} [options.allowHalfOpen=false] - specifies whether the stream should remain open even if one side ends
* @param {boolean} [options.decodeStrings=true] - specifies whether to decode `strings` into `Buffer` objects when writing
* @throws {TypeError} must provide valid options
* @returns {TransformStream} transform stream
*
* @example
* var stdout = require( '@stdlib/streams/base/stdout' );
*
* function transform( chunk, enc, clbk ) {
*     clbk( null, chunk.toString()+'\n' );
* }
*
* var opts = {
*     'transform': transform
* };
* var stream = new TransformStream( opts );
*
* stream.pipe( stdout );
*
* stream.write( '1' );
* stream.write( '2' );
* stream.write( '3' );
*
* stream.end();
* // => '1\n2\n3\n'
*/
function TransformStream( options ) {
	var opts;
	var err;
	if ( !( this instanceof TransformStream ) ) {
		if ( arguments.length ) {
			return new TransformStream( options );
		}
		return new TransformStream();
	}
	opts = copy( DEFAULTS );
	if ( arguments.length ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	debug( 'Creating a transform stream configured with the following options: %s.', JSON.stringify( opts ) );
	Transform.call( this, opts );
	this._destroyed = false;
	if ( opts.transform ) {
		this._transform = opts.transform;
	} else {
		this._transform = _transform;
	}
	if ( opts.flush ) {
		this._flush = opts.flush;
	}
	return this;
}

/*
* Create a prototype which inherits from the parent prototype.
*/
TransformStream.prototype = Object.create( Transform.prototype );

/*
* Set the constructor.
*/
TransformStream.prototype.constructor = TransformStream;

/**
* Gracefully destroys a stream, providing backwards compatibility.
*
* @memberof TransformStream.prototype
* @function destroy
* @param {Object} [error] - optional error message
* @returns {TransformStream} stream instance
*/
TransformStream.prototype.destroy = destroy;


// EXPORTS //

module.exports = TransformStream;

},{"./_transform.js":224,"./defaults.json":226,"./destroy.js":227,"./validate.js":232,"@stdlib/utils/copy":249,"debug":328,"readable-stream":349}],232:[function(require,module,exports){
'use strict';

// MODULES //

var isObject = require( '@stdlib/assert/is-plain-object' );
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var isFunction = require( '@stdlib/assert/is-function' );
var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
var isNonNegative = require( '@stdlib/assert/is-nonnegative-number' ).isPrimitive;
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;


// MAIN //

/**
* Validates function options.
*
* @private
* @param {Object} opts - destination object
* @param {Options} options - function options
* @param {Function} [options.transform] - callback to invoke upon receiving a new chunk
* @param {Function} [options.flush] - callback to invoke after receiving all chunks and prior to the stream closing
* @param {boolean} [options.objectMode] - specifies whether a stream should operate in object mode
* @param {(string|null)} [options.encoding] - specifies how `Buffer` objects should be decoded to `strings`
* @param {NonNegativeNumber} [options.highWaterMark] - specifies the `Buffer` level for when `write()` starts returning `false`
* @param {boolean} [options.allowHalfOpen] - specifies whether the stream should remain open even if one side ends
* @param {boolean} [options.decodeStrings] - specifies whether to decode `strings` into `Buffer` objects when writing
* @returns {(Error|null)} null or an error object
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'invalid input argument. Options must be an object. Value: `' + options + '`.' );
	}
	if ( hasOwnProp( options, 'transform' ) ) {
		opts.transform = options.transform;
		if ( !isFunction( opts.transform ) ) {
			return new TypeError( 'invalid option. `transform` option must be a function. Option: `' + opts.transform + '`.' );
		}
	}
	if ( hasOwnProp( options, 'flush' ) ) {
		opts.flush = options.flush;
		if ( !isFunction( opts.flush ) ) {
			return new TypeError( 'invalid option. `flush` option must be a function. Option: `' + opts.flush + '`.' );
		}
	}
	if ( hasOwnProp( options, 'objectMode' ) ) {
		opts.objectMode = options.objectMode;
		if ( !isBoolean( opts.objectMode ) ) {
			return new TypeError( 'invalid option. `objectMode` option must be a primitive boolean. Option: `' + opts.objectMode + '`.' );
		}
	}
	if ( hasOwnProp( options, 'encoding' ) ) {
		opts.encoding = options.encoding;
		if ( !isString( opts.encoding ) ) {
			return new TypeError( 'invalid option. `encoding` option must be a primitive string. Option: `' + opts.encoding + '`.' );
		}
	}
	if ( hasOwnProp( options, 'allowHalfOpen' ) ) {
		opts.allowHalfOpen = options.allowHalfOpen;
		if ( !isBoolean( opts.allowHalfOpen ) ) {
			return new TypeError( 'invalid option. `allowHalfOpen` option must be a primitive boolean. Option: `' + opts.allowHalfOpen + '`.' );
		}
	}
	if ( hasOwnProp( options, 'highWaterMark' ) ) {
		opts.highWaterMark = options.highWaterMark;
		if ( !isNonNegative( opts.highWaterMark ) ) {
			return new TypeError( 'invalid option. `highWaterMark` option must be a nonnegative number. Option: `' + opts.highWaterMark + '`.' );
		}
	}
	if ( hasOwnProp( options, 'decodeStrings' ) ) {
		opts.decodeStrings = options.decodeStrings;
		if ( !isBoolean( opts.decodeStrings ) ) {
			return new TypeError( 'invalid option. `decodeStrings` option must be a primitive boolean. Option: `' + opts.decodeStrings + '`.' );
		}
	}
	return null;
}


// EXPORTS //

module.exports = validate;

},{"@stdlib/assert/has-own-property":29,"@stdlib/assert/is-boolean":37,"@stdlib/assert/is-function":51,"@stdlib/assert/is-nonnegative-number":81,"@stdlib/assert/is-plain-object":96,"@stdlib/assert/is-string":108}],233:[function(require,module,exports){
'use strict';

/**
* Create a string from a sequence of Unicode code points.
*
* @module @stdlib/string/from-code-point
*
* @example
* var fromCodePoint = require( '@stdlib/string/from-code-point' );
*
* var str = fromCodePoint( 9731 );
* // returns '☃'
*/

// MODULES //

var fromCodePoint = require( './main.js' );


// EXPORTS //

module.exports = fromCodePoint;

},{"./main.js":234}],234:[function(require,module,exports){
'use strict';

// MODULES //

var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
var isArrayLikeObject = require( '@stdlib/assert/is-array-like-object' );
var MAX_CODE_POINT = require( '@stdlib/constants/string/unicode-max' );
var MAX_BMP_CODE_POINT = require( '@stdlib/constants/string/unicode-max-bmp' );


// VARIABLES //

var fromCharCode = String.fromCharCode;

// Factor to rescale a code point from a supplementary plane:
var Ox10000 = 0x10000|0; // 65536

// Factor added to obtain a high surrogate:
var OxD800 = 0xD800|0; // 55296

// Factor added to obtain a low surrogate:
var OxDC00 = 0xDC00|0; // 56320

// 10-bit mask: 2^10-1 = 1023 => 0x3ff => 00000000 00000000 00000011 11111111
var Ox3FF = 1023|0;


// MAIN //

/**
* Creates a string from a sequence of Unicode code points.
*
* ## Notes
*
* -   UTF-16 encoding uses one 16-bit unit for non-surrogates (U+0000 to U+D7FF and U+E000 to U+FFFF).
* -   UTF-16 encoding uses two 16-bit units (surrogate pairs) for U+10000 to U+10FFFF and encodes U+10000-U+10FFFF by subtracting 0x10000 from the code point, expressing the result as a 20-bit binary, and splitting the 20 bits of 0x0-0xFFFFF as upper and lower 10-bits. The respective 10-bits are stored in two 16-bit words: a high and a low surrogate.
*
*
* @param {...NonNegativeInteger} args - sequence of code points
* @throws {Error} must provide either an array-like object of code points or one or more code points as separate arguments
* @throws {TypeError} a code point must be a nonnegative integer
* @throws {RangeError} must provide a valid Unicode code point
* @returns {string} created string
*
* @example
* var str = fromCodePoint( 9731 );
* // returns '☃'
*/
function fromCodePoint( args ) {
	var len;
	var str;
	var arr;
	var low;
	var hi;
	var pt;
	var i;

	len = arguments.length;
	if ( len === 1 && isArrayLikeObject( args ) ) {
		arr = arguments[ 0 ];
		len = arr.length;
	} else {
		arr = new Array( len );
		for ( i = 0; i < len; i++ ) {
			arr[ i ] = arguments[ i ];
		}
	}
	if ( len === 0 ) {
		throw new Error( 'insufficient input arguments. Must provide either an array of code points or one or more code points as separate arguments.' );
	}
	str = '';
	for ( i = 0; i < len; i++ ) {
		pt = arr[ i ];
		if ( !isNonNegativeInteger( pt ) ) {
			throw new TypeError( 'invalid input argument. Must provide valid code points (nonnegative integers). Value: `'+pt+'`.' );
		}
		if ( pt > MAX_CODE_POINT ) {
			throw new RangeError( 'invalid input argument. Must provide a valid code point (cannot exceed max). Value: `'+pt+'`.' );
		}
		if ( pt <= MAX_BMP_CODE_POINT ) {
			str += fromCharCode( pt );
		} else {
			// Code point from a supplementary plane. Split into two 16-bit code units (surrogate pair).
			pt -= Ox10000;
			hi = (pt >> 10) + OxD800;
			low = (pt & Ox3FF) + OxDC00;
			str += fromCharCode( hi, low );
		}
	}
	return str;
}


// EXPORTS //

module.exports = fromCodePoint;

},{"@stdlib/assert/is-array-like-object":30,"@stdlib/assert/is-nonnegative-integer":77,"@stdlib/constants/string/unicode-max":197,"@stdlib/constants/string/unicode-max-bmp":196}],235:[function(require,module,exports){
'use strict';

/**
* Replace search occurrences with a replacement string.
*
* @module @stdlib/string/replace
*
* @example
* var replace = require( '@stdlib/string/replace' );
*
* var str = 'beep';
* var out = replace( str, 'e', 'o' );
* // returns 'boop'
*
* str = 'Hello World';
* out = replace( str, /world/i, 'Mr. President' );
* // returns 'Hello Mr. President'
*/

// MODULES //

var replace = require( './replace.js' );


// EXPORTS //

module.exports = replace;

},{"./replace.js":236}],236:[function(require,module,exports){
'use strict';

// MODULES //

var rescape = require( '@stdlib/utils/escape-regexp-string' );
var isFunction = require( '@stdlib/assert/is-function' );
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var isRegexp = require( '@stdlib/assert/is-regexp' );


// MAIN //

/**
* Replace search occurrences with a replacement string.
*
* @param {string} str - input string
* @param {(string|RegExp)} search - search expression
* @param {(string|Function)} newval - replacement value or function
* @throws {TypeError} first argument must be a string primitive
* @throws {TypeError} second argument argument must be a string primitive or regular expression
* @throws {TypeError} third argument must be a string primitive or function
* @returns {string} new string containing replacement(s)
*
* @example
* var str = 'beep';
* var out = replace( str, 'e', 'o' );
* // returns 'boop'
*
* @example
* var str = 'Hello World';
* var out = replace( str, /world/i, 'Mr. President' );
* // returns 'Hello Mr. President'
*
* @example
* var capitalize = require( '@stdlib/utils/string/capitalize' );
*
* var str = 'Oranges and lemons say the bells of St. Clement\'s';
*
* function replacer( match, p1 ) {
*     return capitalize( p1 );
* }
*
* var out = replace( str, /([^\s]*)/gi, replacer);
* // returns 'Oranges And Lemons Say The Bells Of St. Clement\'s'
*/
function replace( str, search, newval ) {
	if ( !isString( str ) ) {
		throw new TypeError( 'invalid input argument. First argument must be a string primitive. Value: `' + str + '`.' );
	}
	if ( isString( search ) ) {
		search = rescape( search );
		search = new RegExp( search, 'g' );
	}
	else if ( !isRegexp( search ) ) {
		throw new TypeError( 'invalid input argument. Second argument must be a string primitive or regular expression. Value: `' + search + '`.' );
	}
	if ( !isString( newval ) && !isFunction( newval ) ) {
		throw new TypeError( 'invalid input argument. Third argument must be a string primitive or replacement function. Value: `' + newval + '`.' );
	}
	return str.replace( search, newval );
}


// EXPORTS //

module.exports = replace;

},{"@stdlib/assert/is-function":51,"@stdlib/assert/is-regexp":103,"@stdlib/assert/is-string":108,"@stdlib/utils/escape-regexp-string":288}],237:[function(require,module,exports){
'use strict';

/**
* Trim whitespace characters from the beginning and end of a string.
*
* @module @stdlib/string/trim
*
* @example
* var trim = require( '@stdlib/string/trim' );
*
* var out = trim( '   Whitespace   ' );
* // returns 'Whitespace'
*
* out = trim( '\t\t\tTabs\t\t\t' );
* // returns 'Tabs'
*
* out = trim( '\n\n\nNew Lines\n\n\n' );
* // returns 'New Lines'
*/

// MODULES //

var trim = require( './trim.js' );


// EXPORTS //

module.exports = trim;

},{"./trim.js":238}],238:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var replace = require( '@stdlib/string/replace' );


// VARIABLES //

// The following regular expression should suffice to polyfill (most?) all environments.
var RE = /^[\u0020\f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]*([\S\s]*?)[\u0020\f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]*$/;


// MAIN //

/**
* Trim whitespace characters from beginning and end of a string.
*
* @param {string} str - input string
* @throws {TypeError} must provide a string primitive
* @returns {string} trimmed string
*
* @example
* var out = trim( '   Whitespace   ' );
* // returns 'Whitespace'
*
* @example
* var out = trim( '\t\t\tTabs\t\t\t' );
* // returns 'Tabs'
*
* @example
* var out = trim( '\n\n\nNew Lines\n\n\n' ) );
* // returns 'New Lines'
*/
function trim( str ) {
	if ( !isString( str ) ) {
		throw new TypeError( 'invalid input argument. Must provide a string primitive. Value: `' + str + '`.' );
	}
	return replace( str, RE, '$1' );
}


// EXPORTS //

module.exports = trim;

},{"@stdlib/assert/is-string":108,"@stdlib/string/replace":235}],239:[function(require,module,exports){
'use strict';

// MODULES //

var Global = require( 'system.global' )();
var isObject = require( '@stdlib/assert/is-object' );
var modf = require( '@stdlib/math/base/special/modf' );
var round = require( '@stdlib/math/base/special/round' );
var now = require( './now.js' );


// VARIABLES //

var ts;
var ns;

if ( isObject( Global.performance ) ) {
	ns = Global.performance;
} else {
	ns = {};
}
if ( ns.now ) {
	ts = ns.now.bind( ns );
} else if ( ns.mozNow ) {
	ts = ns.mozNow.bind( ns );
} else if ( ns.msNow ) {
	ts = ns.msNow.bind( ns );
} else if ( ns.oNow ) {
	ts = ns.oNow.bind( ns );
} else if ( ns.webkitNow ) {
	ts = ns.webkitNow.bind( ns );
} else {
	ts = now;
}


// MAIN //

/**
* Returns a high-resolution time.
*
* ## Notes
*
* -   Output format: `[seconds, nanoseconds]`.
*
*
* @private
* @returns {NumberArray} high-resolution time
*
* @example
* var t = tic();
* // returns [<number>,<number>]
*/
function tic() {
	var parts;
	var t;

	// Get a millisecond timestamp and convert to seconds:
	t = ts() / 1000;

	// Decompose the timestamp into integer (seconds) and fractional parts:
	parts = modf( t );

	// Convert the fractional part to nanoseconds:
	parts[ 1 ] = round( parts[1] * 1.0e9 );

	// Return the high-resolution time:
	return parts;
}


// EXPORTS //

module.exports = tic;

},{"./now.js":241,"@stdlib/assert/is-object":94,"@stdlib/math/base/special/modf":209,"@stdlib/math/base/special/round":212,"system.global":353}],240:[function(require,module,exports){
'use strict';

// MODULES //

var isFunction = require( '@stdlib/assert/is-function' );


// MAIN //

var bool = isFunction( Date.now );


// EXPORTS //

module.exports = bool;

},{"@stdlib/assert/is-function":51}],241:[function(require,module,exports){
'use strict';

// MODULES //

var bool = require( './detect.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var now;
if ( bool ) {
	now = Date.now;
} else {
	now = polyfill;
}


// EXPORTS //

module.exports = now;

},{"./detect.js":240,"./polyfill.js":242}],242:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Returns the time in milliseconds since the epoch.
*
* @private
* @returns {number} time
*
* @example
* var ts = now();
* // returns <number>
*/
function now() {
	var d = new Date();
	return d.getTime();
}


// EXPORTS //

module.exports = now;

},{}],243:[function(require,module,exports){
'use strict';

/**
* Return a high-resolution time difference.
*
* @module @stdlib/time/toc
*
* @example
* var tic = require( '@stdlib/time/tic' );
* var toc = require( '@stdlib/time/toc' );
*
* var start = tic();
* var delta = toc( start );
* // returns [<number>,<number>]
*/

// MODULES //

var toc = require( './toc.js' );


// EXPORTS //

module.exports = toc;

},{"./toc.js":244}],244:[function(require,module,exports){
'use strict';

// MODULES //

var isNonNegativeIntegerArray = require( '@stdlib/assert/is-nonnegative-integer-array' ).primitives;
var tic = require( '@stdlib/time/tic' );


// MAIN //

/**
* Returns a high-resolution time difference.
*
* ## Notes
*
* -   Output format: `[seconds, nanoseconds]`.
*
*
* @param {NonNegativeIntegerArray} time - high-resolution time
* @throws {TypeError} must provide a nonnegative integer array
* @throws {RangeError} input array must have length `2`
* @returns {NumberArray} high resolution time difference
*
* @example
* var tic = require( '@stdlib/time/tic' );
*
* var start = tic();
* var delta = toc( start );
* // returns [<number>,<number>]
*/
function toc( time ) {
	var now = tic();
	var sec;
	var ns;
	if ( !isNonNegativeIntegerArray( time ) ) {
		throw new TypeError( 'invalid input argument. Must provide an array of nonnegative integers. Value: `' + time + '`.' );
	}
	if ( time.length !== 2 ) {
		throw new RangeError( 'invalid input argument. Input array must have length `2`.' );
	}
	sec = now[ 0 ] - time[ 0 ];
	ns = now[ 1 ] - time[ 1 ];
	if ( sec > 0 && ns < 0 ) {
		sec -= 1;
		ns += 1e9;
	}
	else if ( sec < 0 && ns > 0 ) {
		sec += 1;
		ns -= 1e9;
	}
	return [ sec, ns ];
}


// EXPORTS //

module.exports = toc;

},{"@stdlib/assert/is-nonnegative-integer-array":75,"@stdlib/time/tic":239}],245:[function(require,module,exports){
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

},{"@stdlib/assert/is-buffer":43,"@stdlib/regexp/function-name":222,"@stdlib/utils/native-class":303}],246:[function(require,module,exports){
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

},{"./constructor_name.js":245}],247:[function(require,module,exports){
'use strict';

// MODULES //

var isArray = require( '@stdlib/assert/is-array' );
var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
var PINF = require( '@stdlib/constants/math/float64-pinf' );
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
	out = ( isArray( value ) ) ? new Array( value.length ) : {};
	return deepCopy( value, out, [value], [out], level );
}


// EXPORTS //

module.exports = copy;

},{"./deep_copy.js":248,"@stdlib/assert/is-array":34,"@stdlib/assert/is-nonnegative-integer":77,"@stdlib/constants/math/float64-pinf":186}],248:[function(require,module,exports){
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
var copyBuffer = require( '@stdlib/buffer/from-buffer' );
var typedArrays = require( './typed_arrays.js' );


// FUNCTIONS //

/**
* Clones a class instance.
*
* ## Notes
*
* -   This should **only** be used for simple cases. Any instances with privileged access to variables (e.g., within closures) cannot be cloned. This approach should be considered **fragile**.
* -   The function is greedy, disregarding the notion of a `level`. Instead, the function deep copies all properties, as we assume the concept of `level` applies only to the class instance reference but not to its internal state. This prevents, in theory, two instances from sharing state.
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
}

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
}


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
		return copyBuffer( val );
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
			ref = ( isArray( x ) ) ? new Array( x.length ) : {};
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
}


// EXPORTS //

module.exports = deepCopy;

},{"./typed_arrays.js":250,"@stdlib/assert/has-own-property":29,"@stdlib/assert/is-array":34,"@stdlib/assert/is-buffer":43,"@stdlib/assert/is-error":45,"@stdlib/buffer/from-buffer":174,"@stdlib/utils/index-of":295,"@stdlib/utils/regexp-from-string":315,"@stdlib/utils/type-of":320,"object-keys":338}],249:[function(require,module,exports){
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

},{"./copy.js":247}],250:[function(require,module,exports){
/* eslint-disable no-new-func */
'use strict';

// MODULES //

var Int8Array = require( '@stdlib/array/int8' );
var Uint8Array = require( '@stdlib/array/uint8' );
var Uint8ClampedArray = require( '@stdlib/array/uint8c' );
var Int16Array = require( '@stdlib/array/int16' );
var Uint16Array = require( '@stdlib/array/uint16' );
var Int32Array = require( '@stdlib/array/int32' );
var Uint32Array = require( '@stdlib/array/uint32' );
var Float32Array = require( '@stdlib/array/float32' );
var Float64Array = require( '@stdlib/array/float64' );


// FUNCTIONS //

/**
* Copies an `Int8Array`.
*
* @private
* @param {Int8Array} arr - array to copy
* @returns {Int8Array} new array
*/
function int8array( arr ) {
	return new Int8Array( arr );
}

/**
* Copies a `Uint8Array`.
*
* @private
* @param {Uint8Array} arr - array to copy
* @returns {Uint8Array} new array
*/
function uint8array( arr ) {
	return new Uint8Array( arr );
}

/**
* Copies a `Uint8ClampedArray`.
*
* @private
* @param {Uint8ClampedArray} arr - array to copy
* @returns {Uint8ClampedArray} new array
*/
function uint8clampedarray( arr ) {
	return new Uint8ClampedArray( arr );
}

/**
* Copies an `Int16Array`.
*
* @private
* @param {Int16Array} arr - array to copy
* @returns {Int16Array} new array
*/
function int16array( arr ) {
	return new Int16Array( arr );
}

/**
* Copies a `Uint16Array`.
*
* @private
* @param {Uint16Array} arr - array to copy
* @returns {Uint16Array} new array
*/
function uint16array( arr ) {
	return new Uint16Array( arr );
}

/**
* Copies an `Int32Array`.
*
* @private
* @param {Int32Array} arr - array to copy
* @returns {Int32Array} new array
*/
function int32array( arr ) {
	return new Int32Array( arr );
}

/**
* Copies a `Uint32Array`.
*
* @private
* @param {Uint32Array} arr - array to copy
* @returns {Uint32Array} new array
*/
function uint32array( arr ) {
	return new Uint32Array( arr );
}

/**
* Copies a `Float32Array`.
*
* @private
* @param {Float32Array} arr - array to copy
* @returns {Float32Array} new array
*/
function float32array( arr ) {
	return new Float32Array( arr );
}

/**
* Copies a `Float64Array`.
*
* @private
* @param {Float64Array} arr - array to copy
* @returns {Float64Array} new array
*/
function float64array( arr ) {
	return new Float64Array( arr );
}


// MAIN //

/**
* Returns a hash of functions for copying typed arrays.
*
* @private
* @returns {Object} function hash
*/
function typedarrays() {
	var out = {
		'int8array': int8array,
		'uint8array': uint8array,
		'uint8clampedarray': uint8clampedarray,
		'int16array': int16array,
		'uint16array': uint16array,
		'int32array': int32array,
		'uint32array': uint32array,
		'float32array': float32array,
		'float64array': float64array
	};
	return out;
}


// EXPORTS //

module.exports = typedarrays();

},{"@stdlib/array/float32":2,"@stdlib/array/float64":5,"@stdlib/array/int16":7,"@stdlib/array/int32":10,"@stdlib/array/int8":13,"@stdlib/array/uint16":16,"@stdlib/array/uint32":19,"@stdlib/array/uint8":22,"@stdlib/array/uint8c":25}],251:[function(require,module,exports){
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

},{}],252:[function(require,module,exports){
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

},{"./define_read_only_property.js":251}],253:[function(require,module,exports){
'use strict';

// MODULES //

var isFloat32Array = require( '@stdlib/assert/is-float32array' );
var GlobalFloat32Array = require( './float32array.js' );


// MAIN //

/**
* Tests for native `Float32Array` support.
*
* @returns {boolean} boolean indicating if an environment has `Float32Array` support
*
* @example
* var bool = hasFloat32ArraySupport();
* // returns <boolean>
*/
function hasFloat32ArraySupport() {
	var bool;
	var arr;

	if ( typeof GlobalFloat32Array !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		arr = new GlobalFloat32Array( [ 1.0, 3.14, -3.14, 5.0e40 ] );
		bool = (
			isFloat32Array( arr ) &&
			arr[ 0 ] === 1.0 &&
			arr[ 1 ] === 3.140000104904175 &&
			arr[ 2 ] === -3.140000104904175 &&
			arr[ 3 ] === Number.POSITIVE_INFINITY
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasFloat32ArraySupport;

},{"./float32array.js":254,"@stdlib/assert/is-float32array":47}],254:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Float32Array === 'function' ) ? Float32Array : null;

},{}],255:[function(require,module,exports){
'use strict';

/**
* Test for native `Float32Array` support.
*
* @module @stdlib/utils/detect-float32array-support
*
* @example
* var hasFloat32ArraySupport = require( '@stdlib/utils/detect-float32array-support' );
*
* var bool = hasFloat32ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasFloat32ArraySupport = require( './detect_float32array_support.js' );


// EXPORTS //

module.exports = hasFloat32ArraySupport;

},{"./detect_float32array_support.js":253}],256:[function(require,module,exports){
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

},{"./float64array.js":257,"@stdlib/assert/is-float64array":49}],257:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Float64Array === 'function' ) ? Float64Array : null;

},{}],258:[function(require,module,exports){
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

},{"./detect_float64array_support.js":256}],259:[function(require,module,exports){
'use strict';

// MODULES //

var isInt16Array = require( '@stdlib/assert/is-int16array' );
var INT16_MAX = require( '@stdlib/constants/math/int16-max' );
var INT16_MIN = require( '@stdlib/constants/math/int16-min' );
var GlobalInt16Array = require( './int16array.js' );


// MAIN //

/**
* Tests for native `Int16Array` support.
*
* @returns {boolean} boolean indicating if an environment has `Int16Array` support
*
* @example
* var bool = hasInt16ArraySupport();
* // returns <boolean>
*/
function hasInt16ArraySupport() {
	var bool;
	var arr;

	if ( typeof GlobalInt16Array !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		arr = new GlobalInt16Array( [ 1, 3.14, -3.14, INT16_MAX+1 ] );
		bool = (
			isInt16Array( arr ) &&
			arr[ 0 ] === 1 &&
			arr[ 1 ] === 3 &&      // truncation
			arr[ 2 ] === -3 &&     // truncation
			arr[ 3 ] === INT16_MIN // wrap around
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasInt16ArraySupport;

},{"./int16array.js":261,"@stdlib/assert/is-int16array":53,"@stdlib/constants/math/int16-max":187,"@stdlib/constants/math/int16-min":188}],260:[function(require,module,exports){
'use strict';

/**
* Test for native `Int16Array` support.
*
* @module @stdlib/utils/detect-int16array-support
*
* @example
* var hasInt16ArraySupport = require( '@stdlib/utils/detect-int16array-support' );
*
* var bool = hasInt16ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasInt16ArraySupport = require( './detect_int16array_support.js' );


// EXPORTS //

module.exports = hasInt16ArraySupport;

},{"./detect_int16array_support.js":259}],261:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Int16Array === 'function' ) ? Int16Array : null;

},{}],262:[function(require,module,exports){
'use strict';

// MODULES //

var isInt32Array = require( '@stdlib/assert/is-int32array' );
var INT32_MAX = require( '@stdlib/constants/math/int32-max' );
var INT32_MIN = require( '@stdlib/constants/math/int32-min' );
var GlobalInt32Array = require( './int32array.js' );


// MAIN //

/**
* Tests for native `Int32Array` support.
*
* @returns {boolean} boolean indicating if an environment has `Int32Array` support
*
* @example
* var bool = hasInt32ArraySupport();
* // returns <boolean>
*/
function hasInt32ArraySupport() {
	var bool;
	var arr;

	if ( typeof GlobalInt32Array !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		arr = new GlobalInt32Array( [ 1, 3.14, -3.14, INT32_MAX+1 ] );
		bool = (
			isInt32Array( arr ) &&
			arr[ 0 ] === 1 &&
			arr[ 1 ] === 3 &&      // truncation
			arr[ 2 ] === -3 &&     // truncation
			arr[ 3 ] === INT32_MIN // wrap around
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasInt32ArraySupport;

},{"./int32array.js":264,"@stdlib/assert/is-int32array":55,"@stdlib/constants/math/int32-max":189,"@stdlib/constants/math/int32-min":190}],263:[function(require,module,exports){
'use strict';

/**
* Test for native `Int32Array` support.
*
* @module @stdlib/utils/detect-int32array-support
*
* @example
* var hasInt32ArraySupport = require( '@stdlib/utils/detect-int32array-support' );
*
* var bool = hasInt32ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasInt32ArraySupport = require( './detect_int32array_support.js' );


// EXPORTS //

module.exports = hasInt32ArraySupport;

},{"./detect_int32array_support.js":262}],264:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Int32Array === 'function' ) ? Int32Array : null;

},{}],265:[function(require,module,exports){
'use strict';

// MODULES //

var isInt8Array = require( '@stdlib/assert/is-int8array' );
var INT8_MAX = require( '@stdlib/constants/math/int8-max' );
var INT8_MIN = require( '@stdlib/constants/math/int8-min' );
var GlobalInt8Array = require( './int8array.js' );


// MAIN //

/**
* Tests for native `Int8Array` support.
*
* @returns {boolean} boolean indicating if an environment has `Int8Array` support
*
* @example
* var bool = hasInt8ArraySupport();
* // returns <boolean>
*/
function hasInt8ArraySupport() {
	var bool;
	var arr;

	if ( typeof GlobalInt8Array !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		arr = new GlobalInt8Array( [ 1, 3.14, -3.14, INT8_MAX+1 ] );
		bool = (
			isInt8Array( arr ) &&
			arr[ 0 ] === 1 &&
			arr[ 1 ] === 3 &&     // truncation
			arr[ 2 ] === -3 &&    // truncation
			arr[ 3 ] === INT8_MIN // wrap around
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasInt8ArraySupport;

},{"./int8array.js":267,"@stdlib/assert/is-int8array":57,"@stdlib/constants/math/int8-max":191,"@stdlib/constants/math/int8-min":192}],266:[function(require,module,exports){
'use strict';

/**
* Test for native `Int8Array` support.
*
* @module @stdlib/utils/detect-int8array-support
*
* @example
* var hasInt8ArraySupport = require( '@stdlib/utils/detect-int8array-support' );
*
* var bool = hasInt8ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasInt8ArraySupport = require( './detect_int8array_support.js' );


// EXPORTS //

module.exports = hasInt8ArraySupport;

},{"./detect_int8array_support.js":265}],267:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Int8Array === 'function' ) ? Int8Array : null;

},{}],268:[function(require,module,exports){
(function (Buffer){
'use strict';

// EXPORTS //

module.exports = ( typeof Buffer === 'function' ) ? Buffer : null;

}).call(this,require("buffer").Buffer)
},{"buffer":326}],269:[function(require,module,exports){
'use strict';

/**
* Test for native `Buffer` support.
*
* @module @stdlib/utils/detect-node-buffer-support
*
* @example
* var hasNodeBufferSupport = require( '@stdlib/utils/detect-node-buffer-support' );
*
* var bool = hasNodeBufferSupport();
* // returns <boolean>
*/

// MODULES //

var hasNodeBufferSupport = require( './main.js' );


// EXPORTS //

module.exports = hasNodeBufferSupport;

},{"./main.js":270}],270:[function(require,module,exports){
'use strict';

// MODULES //

var isBuffer = require( '@stdlib/assert/is-buffer' );
var GlobalBuffer = require( './buffer.js' );


// MAIN //

/**
* Tests for native `Buffer` support.
*
* @returns {boolean} boolean indicating if an environment has `Buffer` support
*
* @example
* var bool = hasNodeBufferSupport();
* // returns <boolean>
*/
function hasNodeBufferSupport() {
	var bool;
	var b;

	if ( typeof GlobalBuffer !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		if ( typeof GlobalBuffer.from === 'function' ) {
			b = GlobalBuffer.from( [ 1, 2, 3, 4 ] );
		} else {
			b = new GlobalBuffer( [ 1, 2, 3, 4 ] ); // Note: this is deprecated behavior starting in Node v6 (see https://nodejs.org/api/buffer.html#buffer_new_buffer_array)
		}
		bool = (
			isBuffer( b ) &&
			b[ 0 ] === 1 &&
			b[ 1 ] === 2 &&
			b[ 2 ] === 3 &&
			b[ 3 ] === 4
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasNodeBufferSupport;

},{"./buffer.js":268,"@stdlib/assert/is-buffer":43}],271:[function(require,module,exports){
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

},{}],272:[function(require,module,exports){
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

},{"./detect_symbol_support.js":271}],273:[function(require,module,exports){
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

},{"@stdlib/utils/detect-symbol-support":272}],274:[function(require,module,exports){
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

},{"./has_tostringtag_support.js":273}],275:[function(require,module,exports){
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

},{"./uint16array.js":277,"@stdlib/assert/is-uint16array":113,"@stdlib/constants/math/uint16-max":193}],276:[function(require,module,exports){
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

},{"./detect_uint16array_support.js":275}],277:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint16Array === 'function' ) ? Uint16Array : null;

},{}],278:[function(require,module,exports){
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

},{"./uint32array.js":280,"@stdlib/assert/is-uint32array":115,"@stdlib/constants/math/uint32-max":194}],279:[function(require,module,exports){
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

},{"./detect_uint32array_support.js":278}],280:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint32Array === 'function' ) ? Uint32Array : null;

},{}],281:[function(require,module,exports){
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

},{"./uint8array.js":283,"@stdlib/assert/is-uint8array":117,"@stdlib/constants/math/uint8-max":195}],282:[function(require,module,exports){
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

},{"./detect_uint8array_support.js":281}],283:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint8Array === 'function' ) ? Uint8Array : null;

},{}],284:[function(require,module,exports){
'use strict';

// MODULES //

var isUint8ClampedArray = require( '@stdlib/assert/is-uint8clampedarray' );
var GlobalUint8ClampedArray = require( './uint8clampedarray.js' );


// MAIN //

/**
* Tests for native `Uint8ClampedArray` support.
*
* @returns {boolean} boolean indicating if an environment has `Uint8ClampedArray` support
*
* @example
* var bool = hasUint8ClampedArraySupport();
* // returns <boolean>
*/
function hasUint8ClampedArraySupport() {
	var bool;
	var arr;

	if ( typeof GlobalUint8ClampedArray !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		arr = new GlobalUint8ClampedArray( [ -1, 0, 1, 3.14, 4.99, 255, 256 ] );
		bool = (
			isUint8ClampedArray( arr ) &&
			arr[ 0 ] === 0 &&   // clamped
			arr[ 1 ] === 0 &&
			arr[ 2 ] === 1 &&
			arr[ 3 ] === 3 &&   // round to nearest
			arr[ 4 ] === 5 &&   // round to nearest
			arr[ 5 ] === 255 &&
			arr[ 6 ] === 255    // clamped
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasUint8ClampedArraySupport;

},{"./uint8clampedarray.js":286,"@stdlib/assert/is-uint8clampedarray":119}],285:[function(require,module,exports){
'use strict';

/**
* Test for native `Uint8ClampedArray` support.
*
* @module @stdlib/utils/detect-uint8clamped-support
*
* @example
* var hasUint8ClampedArraySupport = require( '@stdlib/utils/detect-uint8clampedarray-support' );
*
* var bool = hasUint8ClampedArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasUint8ClampedArraySupport = require( './detect_uint8clampedarray_support.js' );


// EXPORTS //

module.exports = hasUint8ClampedArraySupport;

},{"./detect_uint8clampedarray_support.js":284}],286:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint8ClampedArray === 'function' ) ? Uint8ClampedArray : null;

},{}],287:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;


// VARIABLES //

var RE = /[-\/\\^$*+?.()|[\]{}]/g; // eslint-disable-line no-useless-escape


// MAIN //

/**
* Escapes a regular expression string.
*
* @param {string} str - regular expression string
* @throws {TypeError} first argument must be a string primitive
* @returns {string} escaped string
*
* @example
* var str = rescape( '[A-Z]*' );
* // returns '\\[A\\-Z\\]\\*'
*/
function rescape( str ) {
	var len;
	var s;
	var i;

	if ( !isString( str ) ) {
		throw new TypeError( 'invalid input argument. Must provide a regular expression string. Value: `' + str + '`.' );
	}
	// Check if the string starts with a forward slash...
	if ( str[ 0 ] === '/' ) {
		// Find the last forward slash...
		len = str.length;
		for ( i = len-1; i >= 0; i-- ) {
			if ( str[ i ] === '/' ) {
				break;
			}
		}
	}
	// If we searched the string to no avail or if the first letter is not `/`, assume that the string is not of the form `/[...]/[gimy]`:
	if ( i === void 0 || i <= 0 ) {
		return str.replace( RE, '\\$&' );
	}
	// We need to de-construct the string...
	s = str.substring( 1, i );

	// Only escape the characters between the `/`:
	s = s.replace( RE, '\\$&' );

	// Reassemble:
	str = str[ 0 ] + s + str.substring( i );

	return str;
}


// EXPORTS //

module.exports = rescape;

},{"@stdlib/assert/is-string":108}],288:[function(require,module,exports){
'use strict';

/**
* Escape a regular expression string or pattern.
*
* @module @stdlib/utils/escape-regexp-string
*
* @example
* var rescape = require( '@stdlib/utils/escape-regexp-string' );
*
* var str = rescape( '[A-Z]*' );
* // returns '\\[A\\-Z\\]\\*'
*/

// MODULES //

var rescape = require( './escape_regexp_string.js' );


// EXPORTS //

module.exports = rescape;

},{"./escape_regexp_string.js":287}],289:[function(require,module,exports){
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

},{"./native.js":292,"./polyfill.js":293,"@stdlib/assert/is-function":51}],290:[function(require,module,exports){
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

},{"./detect.js":289}],291:[function(require,module,exports){
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

},{"./get_prototype_of.js":290}],292:[function(require,module,exports){
'use strict';

// MAIN //

var getProto = Object.getPrototypeOf;


// EXPORTS //

module.exports = getProto;

},{}],293:[function(require,module,exports){
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

},{"./proto.js":294,"@stdlib/utils/native-class":303}],294:[function(require,module,exports){
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

},{}],295:[function(require,module,exports){
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

},{"./index_of.js":296}],296:[function(require,module,exports){
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
}


// EXPORTS //

module.exports = indexOf;

},{"@stdlib/assert/is-array-like":32,"@stdlib/assert/is-integer":60,"@stdlib/assert/is-nan":68}],297:[function(require,module,exports){
'use strict';

// MODULES //

var builtin = require( './native.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var createObject;
if ( typeof builtin === 'function' ) {
	createObject = builtin;
} else {
	createObject = polyfill;
}


// EXPORTS //

module.exports = createObject;

},{"./native.js":300,"./polyfill.js":301}],298:[function(require,module,exports){
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

},{"./inherit.js":299}],299:[function(require,module,exports){
'use strict';

// MODULES //

var validate = require( './validate.js' );
var createObject = require( './detect.js' );


// MAIN //

/**
* Implements prototypical inheritance by replacing the prototype of one constructor with the prototype of another constructor.
*
* ## Notes
*
* -   This implementation is not designed to work with ES2015/ES6 classes. For ES2015/ES6 classes, use `class` with `extends`.
* -   For reference, see [node#3455](https://github.com/nodejs/node/pull/3455), [node#4179](https://github.com/nodejs/node/issues/4179), [node#3452](https://github.com/nodejs/node/issues/3452), and [node commit](https://github.com/nodejs/node/commit/29da8cf8d7ab8f66b9091ab22664067d4468461e#diff-3deb3f32958bb937ae05c6f3e4abbdf5).
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
}


// EXPORTS //

module.exports = inherit;

},{"./detect.js":297,"./validate.js":302}],300:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = Object.create;

},{}],301:[function(require,module,exports){
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
}


// EXPORTS //

module.exports = createObject;

},{}],302:[function(require,module,exports){
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
}


// EXPORTS //

module.exports = validate;

},{}],303:[function(require,module,exports){
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

},{"./native_class.js":304,"./polyfill.js":305,"@stdlib/utils/detect-tostringtag-support":274}],304:[function(require,module,exports){
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

},{"./tostring.js":306}],305:[function(require,module,exports){
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

},{"./tostring.js":306,"./tostringtag.js":307,"@stdlib/assert/has-own-property":29}],306:[function(require,module,exports){
'use strict';

// MAIN //

var toStr = Object.prototype.toString;


// EXPORTS //

module.exports = toStr;

},{}],307:[function(require,module,exports){
'use strict';

// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{}],308:[function(require,module,exports){
'use strict';

/**
* No operation.
*
* @module @stdlib/utils/noop
*
* @example
* var noop = require( '@stdlib/utils/noop' );
*
* noop();
* // ...does nothing.
*/

// MODULES //

var noop = require( './noop.js' );


// EXPORTS //

module.exports = noop;

},{"./noop.js":309}],309:[function(require,module,exports){
'use strict';

/**
* No operation.
*
* @example
* noop();
* // ...does nothing.
*/
function noop() {
	// Empty function...
}


// EXPORTS //

module.exports = noop;

},{}],310:[function(require,module,exports){
'use strict';

/**
* Return a partial object copy excluding specified keys.
*
* @module @stdlib/utils/omit
*
* @example
* var omit = require( '@stdlib/utils/omit' );
*
* var obj1 = {
*     'a': 1,
*     'b': 2
* };
*
* var obj2 = omit( obj1, 'b' );
* // returns { 'a': 1 }
*/

// MODULES //

var omit = require( './omit.js' );


// EXPORTS //

module.exports = omit;

},{"./omit.js":311}],311:[function(require,module,exports){
'use strict';

// MODULES //

var getKeys = require( 'object-keys' ).shim();
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var isStringArray = require( '@stdlib/assert/is-string-array' ).primitives;
var indexOf = require( '@stdlib/utils/index-of' );


// MAIN //

/**
* Returns a partial object copy excluding specified keys.
*
* @param {Object} obj - source object
* @param {(string|StringArray)} keys - keys to exclude
* @throws {TypeError} first argument must be an object
* @throws {TypeError} second argument must be either a string or an array of strings
* @returns {Object} new object
*
* @example
* var obj1 = {
*     'a': 1,
*     'b': 2
* };
*
* var obj2 = omit( obj1, 'b' );
* // returns { 'a': 1 }
*/
function omit( obj, keys ) {
	var ownKeys;
	var out;
	var key;
	var i;
	if ( typeof obj !== 'object' || obj === null ) {
		throw new TypeError( 'invalid input argument. First argument must be an object. Value: `'+obj+'`.' );
	}
	ownKeys = getKeys( obj );
	out = {};
	if ( isString( keys ) ) {
		for ( i = 0; i < ownKeys.length; i++ ) {
			key = ownKeys[ i ];
			if ( key !== keys ) {
				out[ key ] = obj[ key ];
			}
		}
		return out;
	}
	if ( isStringArray( keys ) ) {
		for ( i = 0; i < ownKeys.length; i++ ) {
			key = ownKeys[ i ];
			if ( indexOf( keys, key ) === -1 ) {
				out[ key ] = obj[ key ];
			}
		}
		return out;
	}
	throw new TypeError( 'invalid input argument. Second argument must be either a string primitive or an array of string primitives. Value: `'+keys+'`.' );
}


// EXPORTS //

module.exports = omit;

},{"@stdlib/assert/is-string":108,"@stdlib/assert/is-string-array":106,"@stdlib/utils/index-of":295,"object-keys":338}],312:[function(require,module,exports){
'use strict';

/**
* Return a partial object copy containing only specified keys.
*
* @module @stdlib/utils/pick
*
* @example
* var pick = require( '@stdlib/utils/pick' );
*
* var obj1 = {
*     'a': 1,
*     'b': 2
* };
*
* var obj2 = pick( obj1, 'b' );
* // returns { 'b': 2 }
*/

// MODULES //

var pick = require( './pick.js' );


// EXPORTS //

module.exports = pick;

},{"./pick.js":313}],313:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var isStringArray = require( '@stdlib/assert/is-string-array' ).primitives;
var hasOwnProp = require( '@stdlib/assert/has-own-property' );


// MAIN //

/**
* Returns a partial object copy containing only specified keys. If a key does not exist as an own property in a source object, the key is ignored.
*
* @param {Object} obj - source object
* @param {(string|StringArray)} keys - keys to copy
* @throws {TypeError} first argument must be an object
* @throws {TypeError} second argument must be either a string or an array of strings
* @returns {Object} new object
*
* @example
* var obj1 = {
*     'a': 1,
*     'b': 2
* };
*
* var obj2 = pick( obj1, 'b' );
* // returns { 'b': 2 }
*/
function pick( obj, keys ) {
	var out;
	var key;
	var i;
	if ( typeof obj !== 'object' || obj === null ) {
		throw new TypeError( 'invalid input argument. First argument must be an object. Value: `'+obj+'`.' );
	}
	out = {};
	if ( isString( keys ) ) {
		if ( hasOwnProp( obj, keys ) ) {
			out[ keys ] = obj[ keys ];
		}
		return out;
	}
	if ( isStringArray( keys ) ) {
		for ( i = 0; i < keys.length; i++ ) {
			key = keys[ i ];
			if ( hasOwnProp( obj, key ) ) {
				out[ key ] = obj[ key ];
			}
		}
		return out;
	}
	throw new TypeError( 'invalid input argument. Second argument must be either a string primitive or an array of string primitives. Value: `'+keys+'`.' );
}


// EXPORTS //

module.exports = pick;

},{"@stdlib/assert/has-own-property":29,"@stdlib/assert/is-string":108,"@stdlib/assert/is-string-array":106}],314:[function(require,module,exports){
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
}


// EXPORTS //

module.exports = reFromString;

},{"@stdlib/assert/is-string":108,"@stdlib/regexp/regexp":223}],315:[function(require,module,exports){
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

},{"./from_string.js":314}],316:[function(require,module,exports){
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

},{"./fixtures/nodelist.js":317,"./fixtures/re.js":318,"./fixtures/typedarray.js":319}],317:[function(require,module,exports){
'use strict';

// MODULES //

var root = require( 'system.global' )(); // eslint-disable-line stdlib/no-redeclare


// MAIN //

var nodeList = root.document && root.document.childNodes;


// EXPORTS //

module.exports = nodeList;

},{"system.global":353}],318:[function(require,module,exports){
'use strict';

var RE = /./;


// EXPORTS //

module.exports = RE;

},{}],319:[function(require,module,exports){
'use strict';

var typedarray = Int8Array;


// EXPORTS //

module.exports = typedarray;

},{}],320:[function(require,module,exports){
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

},{"./check.js":316,"./polyfill.js":321,"./typeof.js":322}],321:[function(require,module,exports){
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

},{"@stdlib/utils/constructor-name":246}],322:[function(require,module,exports){
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

},{"@stdlib/utils/constructor-name":246}],323:[function(require,module,exports){
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

},{}],324:[function(require,module,exports){

},{}],325:[function(require,module,exports){
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

},{}],326:[function(require,module,exports){
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

},{"base64-js":323,"ieee754":333}],327:[function(require,module,exports){
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
},{"../../is-buffer/index.js":335}],328:[function(require,module,exports){
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
},{"./debug":329,"_process":325}],329:[function(require,module,exports){

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

},{"ms":337}],330:[function(require,module,exports){
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

},{"foreach":332,"object-keys":338}],331:[function(require,module,exports){
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

},{}],332:[function(require,module,exports){

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


},{}],333:[function(require,module,exports){
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

},{}],334:[function(require,module,exports){
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

},{}],335:[function(require,module,exports){
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

},{}],336:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],337:[function(require,module,exports){
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

},{}],338:[function(require,module,exports){
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

},{"./isArguments":339}],339:[function(require,module,exports){
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

},{}],340:[function(require,module,exports){
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
},{"_process":325}],341:[function(require,module,exports){
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
},{"./_stream_readable":343,"./_stream_writable":345,"core-util-is":327,"inherits":334,"process-nextick-args":340}],342:[function(require,module,exports){
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
},{"./_stream_transform":344,"core-util-is":327,"inherits":334}],343:[function(require,module,exports){
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
},{"./_stream_duplex":341,"./internal/streams/BufferList":346,"./internal/streams/destroy":347,"./internal/streams/stream":348,"_process":325,"core-util-is":327,"events":331,"inherits":334,"isarray":336,"process-nextick-args":340,"safe-buffer":350,"string_decoder/":351,"util":324}],344:[function(require,module,exports){
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
},{"./_stream_duplex":341,"core-util-is":327,"inherits":334}],345:[function(require,module,exports){
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
},{"./_stream_duplex":341,"./internal/streams/destroy":347,"./internal/streams/stream":348,"_process":325,"core-util-is":327,"inherits":334,"process-nextick-args":340,"safe-buffer":350,"util-deprecate":356}],346:[function(require,module,exports){
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
},{"safe-buffer":350}],347:[function(require,module,exports){
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
},{"process-nextick-args":340}],348:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":331}],349:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":341,"./lib/_stream_passthrough.js":342,"./lib/_stream_readable.js":343,"./lib/_stream_transform.js":344,"./lib/_stream_writable.js":345}],350:[function(require,module,exports){
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

},{"buffer":326}],351:[function(require,module,exports){
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
},{"safe-buffer":350}],352:[function(require,module,exports){
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
},{}],353:[function(require,module,exports){
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

},{"./implementation":352,"./polyfill":354,"./shim":355,"define-properties":330}],354:[function(require,module,exports){
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
},{"./implementation":352}],355:[function(require,module,exports){
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
},{"./polyfill":354,"define-properties":330}],356:[function(require,module,exports){
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
},{}]},{},[198,199]);
