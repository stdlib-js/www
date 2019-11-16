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

},{"@stdlib/utils/native-class":53}],5:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = true;

},{}],6:[function(require,module,exports){
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

},{"./is_buffer.js":7}],7:[function(require,module,exports){
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

},{"@stdlib/assert/is-object-like":10}],8:[function(require,module,exports){
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

},{"./is_function.js":9}],9:[function(require,module,exports){
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

},{"@stdlib/utils/type-of":62}],10:[function(require,module,exports){
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

},{"./is_object_like.js":11,"@stdlib/assert/tools/array-function":20,"@stdlib/utils/define-read-only-property":45}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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

},{"./object.js":14,"./primitive.js":15}],13:[function(require,module,exports){
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

},{"./generic.js":12,"./object.js":14,"./primitive.js":15,"@stdlib/utils/define-read-only-property":45}],14:[function(require,module,exports){
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

},{"./try2valueof.js":16,"@stdlib/utils/detect-tostringtag-support":52,"@stdlib/utils/native-class":53}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
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

},{"./valueof.js":17}],17:[function(require,module,exports){
'use strict';

// eslint-disable-next-line stdlib/no-redeclare
var valueOf = String.prototype.valueOf; // non-generic


// EXPORTS //

module.exports = valueOf;

},{}],18:[function(require,module,exports){
'use strict';

/**
* Boolean indicating if the current process is running on Windows.
*
* @module @stdlib/assert/is-windows
* @type {boolean}
*
* @example
* var isWindows = require( '@stdlib/assert/is-windows' );
*
* if ( isWindows ) {
*     console.log( 'Running on Windows...' );
* } else {
*     console.log( 'Running on %s...', process.platform );
* }
*/

// MODULES //

var platform = require( '@stdlib/os/platform' );


// MAIN //

/**
* Boolean indicating if the current process is running on Windows.
*
* @constant
* @type {boolean}
*/
var IS_WINDOWS = ( platform === 'win32' );


// EXPORTS //

module.exports = IS_WINDOWS;

},{"@stdlib/os/platform":39}],19:[function(require,module,exports){
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

},{"@stdlib/assert/is-array":3}],20:[function(require,module,exports){
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

},{"./arrayfcn.js":19}],21:[function(require,module,exports){
'use strict';

// MAIN //

var ctor = require( 'buffer' ).Buffer;


// EXPORTS //

module.exports = ctor;

},{"buffer":69}],22:[function(require,module,exports){
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

},{"./buffer.js":21,"./polyfill.js":23,"@stdlib/utils/detect-node-buffer-support":47}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
'use strict';

// MODULES //

var isFunction = require( '@stdlib/assert/is-function' );
var Buffer = require( '@stdlib/buffer/ctor' );


// MAIN //

var bool = isFunction( Buffer.from );


// EXPORTS //

module.exports = bool;

},{"@stdlib/assert/is-function":8,"@stdlib/buffer/ctor":22}],25:[function(require,module,exports){
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

},{"./has_from.js":24,"./main.js":26,"./polyfill.js":27}],26:[function(require,module,exports){
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

},{"@stdlib/assert/is-string":13,"@stdlib/buffer/ctor":22}],27:[function(require,module,exports){
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

},{"@stdlib/assert/is-string":13,"@stdlib/buffer/ctor":22}],28:[function(require,module,exports){
'use strict';

// MODULES //

var data = require( './data.js' );
var string2buffer = require( '@stdlib/buffer/from-string' );


// MAIN //

/**
* Returns an image of an abandoned dust bowl home.
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

},{"./data.js":29,"@stdlib/buffer/from-string":25}],29:[function(require,module,exports){
'use strict';

var data = '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YWN0SW5mbyByZGY6cGFyc2VUeXBlPSdSZXNvdXJjZSc+CiAgIDxJcHRjNHhtcENvcmU6Q2lBZHJDaXR5PkxvcyBBbmdlbGVzPC9JcHRjNHhtcENvcmU6Q2lBZHJDaXR5PgogICA8SXB0YzR4bXBDb3JlOkNpQWRyQ3RyeT5Vbml0ZWQgU3RhdGVzPC9JcHRjNHhtcENvcmU6Q2lBZHJDdHJ5PgogICA8SXB0YzR4bXBDb3JlOkNpQWRyRXh0YWRyPjEyMDAgR2V0dHkgQ2VudGVyIERyaXZlPC9JcHRjNHhtcENvcmU6Q2lBZHJFeHRhZHI+CiAgIDxJcHRjNHhtcENvcmU6Q2lBZHJQY29kZT45MDA0OTwvSXB0YzR4bXBDb3JlOkNpQWRyUGNvZGU+CiAgIDxJcHRjNHhtcENvcmU6Q2lBZHJSZWdpb24+Q2FsaWZvcm5pYTwvSXB0YzR4bXBDb3JlOkNpQWRyUmVnaW9uPgogICA8SXB0YzR4bXBDb3JlOkNpRW1haWxXb3JrPnJpZ2h0c0BnZXR0eS5lZHU8L0lwdGM0eG1wQ29yZTpDaUVtYWlsV29yaz4KICAgPElwdGM0eG1wQ29yZTpDaVVybFdvcms+d3d3LmdldHR5LmVkdTwvSXB0YzR4bXBDb3JlOkNpVXJsV29yaz4KICA8L0lwdGM0eG1wQ29yZTpDcmVhdG9yQ29udGFjdEluZm8+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOklwdGM0eG1wRXh0PSdodHRwOi8vaXB0Yy5vcmcvc3RkL0lwdGM0eG1wRXh0LzIwMDgtMDItMjkvJz4KICA8SXB0YzR4bXBFeHQ6QXJ0d29ya09yT2JqZWN0PgogICA8cmRmOkJhZz4KICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPgogICAgIDxJcHRjNHhtcEV4dDpBT0NyZWF0b3I+CiAgICAgIDxyZGY6U2VxPgogICAgICAgPHJkZjpsaT5Eb3JvdGhlYSBMYW5nZTwvcmRmOmxpPgogICAgICA8L3JkZjpTZXE+CiAgICAgPC9JcHRjNHhtcEV4dDpBT0NyZWF0b3I+CiAgICAgPElwdGM0eG1wRXh0OkFPU291cmNlPlRoZSBKLiBQYXVsIEdldHR5IE11c2V1bSwgTG9zIEFuZ2VsZXM8L0lwdGM0eG1wRXh0OkFPU291cmNlPgogICAgIDxJcHRjNHhtcEV4dDpBT1NvdXJjZUludk5vPjIwMDAuNTAuMTI8L0lwdGM0eG1wRXh0OkFPU291cmNlSW52Tm8+CiAgICAgPElwdGM0eG1wRXh0OkFPVGl0bGU+CiAgICAgIDxyZGY6QWx0PgogICAgICAgPHJkZjpsaSB4bWw6bGFuZz0neC1kZWZhdWx0Jz5BYmFuZG9uZWQgRHVzdCBCb3dsIEhvbWU8L3JkZjpsaT4KICAgICAgPC9yZGY6QWx0PgogICAgIDwvSXB0YzR4bXBFeHQ6QU9UaXRsZT4KICAgIDwvcmRmOmxpPgogICA8L3JkZjpCYWc+CiAgPC9JcHRjNHhtcEV4dDpBcnR3b3JrT3JPYmplY3Q+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOmRjPSdodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyc+CiAgPGRjOmNyZWF0b3I+CiAgIDxyZGY6U2VxPgogICAgPHJkZjpsaT5UaGUgSi4gUGF1bCBHZXR0eSBNdXNldW08L3JkZjpsaT4KICAgPC9yZGY6U2VxPgogIDwvZGM6Y3JlYXRvcj4KICA8ZGM6ZGVzY3JpcHRpb24+CiAgIDxyZGY6QWx0PgogICAgPHJkZjpsaSB4bWw6bGFuZz0neC1kZWZhdWx0Jz5BYmFuZG9uZWQgRHVzdCBCb3dsIEhvbWU7IERvcm90aGVhIExhbmdlIChBbWVyaWNhbiwgMTg5NSAtIDE5NjUpOyBhYm91dCAxOTM1IC0gMTk0MDsgR2VsYXRpbiBzaWx2ZXIgcHJpbnQ7IDE4LjkgeCAyNC40IGNtICg3IDcvMTYgeCA5IDUvOCBpbi4pOyAyMDAwLjUwLjEyPC9yZGY6bGk+CiAgIDwvcmRmOkFsdD4KICA8L2RjOmRlc2NyaXB0aW9uPgogIDxkYzp0aXRsZT4KICAgPHJkZjpBbHQ+CiAgICA8cmRmOmxpIHhtbDpsYW5nPSd4LWRlZmF1bHQnPkFiYW5kb25lZCBEdXN0IEJvd2wgSG9tZTwvcmRmOmxpPgogICA8L3JkZjpBbHQ+CiAgPC9kYzp0aXRsZT4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6cGhvdG9zaG9wPSdodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvJz4KICA8cGhvdG9zaG9wOlNvdXJjZT5UaGUgSi4gUGF1bCBHZXR0eSBNdXNldW0sIExvcyBBbmdlbGVzPC9waG90b3Nob3A6U291cmNlPgogPC9yZGY6RGVzY3JpcHRpb24+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczp4bXA9J2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8nPgogIDx4bXA6TWV0YWRhdGFEYXRlPjIwMTYtMDQtMTRUMDM6MTg6Mjg8L3htcDpNZXRhZGF0YURhdGU+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOnhtcFJpZ2h0cz0naHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3JpZ2h0cy8nPgogIDx4bXBSaWdodHM6VXNhZ2VUZXJtcz4KICAgPHJkZjpBbHQ+CiAgICA8cmRmOmxpIHhtbDpsYW5nPSd4LWRlZmF1bHQnPmh0dHA6Ly93d3cuZ2V0dHkuZWR1L2xlZ2FsL2ltYWdlX3JlcXVlc3QvPC9yZGY6bGk+CiAgIDwvcmRmOkFsdD4KICA8L3htcFJpZ2h0czpVc2FnZVRlcm1zPgogPC9yZGY6RGVzY3JpcHRpb24+CjwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9J3cnPz7/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr/wAARCAMUBAADAREAAhEBAxEB/8QAHgAAAQUBAQEBAQAAAAAAAAAAAwECBAUGAAcICQr/xABTEAACAQIEBAQDBQYFAwMAARUBAgMEEQAFEiEGEzFBByJRYRRxgQgjMpGhFUKxwdHwCRYzUuEkYvEXQ3IKghglNFNUY5IZJic1c6I2REaDk6PC/8QAGQEBAQEBAQEAAAAAAAAAAAAAAQACAwQF/8QANBEAAwACAgEDAgUCBgMBAQEBAAERITECQRIDUWEicQQTMqHwgbEzQpHB0fEUI+EFQ1Ik/9oADAMBAAIRAxEAPwDR5rwxRS5lI7mZgb2aRdJ032vbva2PlpYPe3kWmyxEADRlQx31ML27fPDhGax5y6n1holaxYg7XufS+Doid8LEYFEaFyehUdx2AwWDsHT5ZTEPKq289rAE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';


// EXPORTS //

module.exports = data;

},{}],30:[function(require,module,exports){
(function (__dirname){
'use strict';

// MODULES //

var resolve = require( 'path' ).resolve;
var readFile = require( '@stdlib/fs/read-file' ).sync;


// VARIABLES //

var fpath = resolve( __dirname, '..', 'data', 'image.jpg' );


// MAIN //

/**
* Returns an image of an abandoned dust bowl home.
*
* ## Notes
*
* -   This function synchronously reads data from disk for each invocation. Such behavior is intentional and so is the avoidance of `require`. We assume that invocations are infrequent, and we want to avoid the `require` cache. This means that we allow data to be garbage collected and a user is responsible for explicitly caching data.
*
*
* @throws {Error} unable to read data
* @returns {Buffer} image
*
* @example
* var img = image();
* // returns <Buffer>
*/
function image() {
	var data = readFile( fpath );
	if ( data instanceof Error ) {
		throw data;
	}
	return data;
}


// EXPORTS //

module.exports = image;

}).call(this,"/lib/node_modules/@stdlib/datasets/img-dust-bowl-home/lib")
},{"@stdlib/fs/read-file":36,"path":100}],31:[function(require,module,exports){
module.exports={
  "name": "@stdlib/datasets/img-dust-bowl-home",
  "version": "0.0.0",
  "description": "Image of an abandoned Dust Bowl home.",
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
    "img-dust-bowl-home": "./bin/cli"
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
    "home",
    "house",
    "architecture",
    "dust bowl",
    "desert",
    "abandoned"
  ]
}

},{}],32:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isBuffer = require( '@stdlib/assert/is-buffer' );
var image = require( './../lib/browser.js' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof image, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a buffer object', function test( t ) {
	var data = image();
	t.equal( isBuffer( data ), true, 'returns a buffer object' );
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/datasets/img-dust-bowl-home/test/test.browser.js")
},{"./../lib/browser.js":28,"@stdlib/assert/is-buffer":6,"tape":128}],33:[function(require,module,exports){
(function (process,__filename,__dirname){
'use strict';

// MODULES //

var resolve = require( 'path' ).resolve;
var exec = require( 'child_process' ).exec;
var tape = require( 'tape' );
var IS_BROWSER = require( '@stdlib/assert/is-browser' );
var IS_WINDOWS = require( '@stdlib/assert/is-windows' );
var readFileSync = require( '@stdlib/fs/read-file' ).sync;
var string2buffer = require( '@stdlib/buffer/from-string' );


// VARIABLES //

var fpath = resolve( __dirname, '..', 'bin', 'cli' );
var opts = {
	'skip': IS_BROWSER || IS_WINDOWS
};


// FIXTURES //

var PKG_VERSION = require( './../package.json' ).version;


// TESTS //

tape( 'command-line interface', function test( t ) {
	t.ok( true, __filename );
	t.end();
});

tape( 'when invoked with a `--help` flag, the command-line interface prints the help text to `stderr`', opts, function test( t ) {
	var expected;
	var cmd;

	expected = readFileSync( resolve( __dirname, '..', 'docs', 'usage.txt' ), {
		'encoding': 'utf8'
	});
	cmd = [
		process.execPath,
		fpath,
		'--help'
	];

	exec( cmd.join( ' ' ), done );

	function done( error, stdout, stderr ) {
		if ( error ) {
			t.fail( error.message );
		} else {
			t.strictEqual( stdout.toString(), '', 'does not print to `stdout`' );
			t.strictEqual( stderr.toString(), expected+'\n', 'expected value' );
		}
		t.end();
	}
});

tape( 'when invoked with a `-h` flag, the command-line interface prints the help text to `stderr`', opts, function test( t ) {
	var expected;
	var cmd;

	expected = readFileSync( resolve( __dirname, '..', 'docs', 'usage.txt' ), {
		'encoding': 'utf8'
	});
	cmd = [
		process.execPath,
		fpath,
		'-h'
	];

	exec( cmd.join( ' ' ), done );

	function done( error, stdout, stderr ) {
		if ( error ) {
			t.fail( error.message );
		} else {
			t.strictEqual( stdout.toString(), '', 'does not print to `stdout`' );
			t.strictEqual( stderr.toString(), expected+'\n', 'expected value' );
		}
		t.end();
	}
});

tape( 'when invoked with a `--version` flag, the command-line interface prints the version to `stderr`', opts, function test( t ) {
	var cmd = [
		process.execPath,
		fpath,
		'--version'
	];

	exec( cmd.join( ' ' ), done );

	function done( error, stdout, stderr ) {
		if ( error ) {
			t.fail( error.message );
		} else {
			t.strictEqual( stdout.toString(), '', 'does not print to `stdout`' );
			t.strictEqual( stderr.toString(), PKG_VERSION+'\n', 'expected value' );
		}
		t.end();
	}
});

tape( 'when invoked with a `-V` flag, the command-line interface prints the version to `stderr`', opts, function test( t ) {
	var cmd = [
		process.execPath,
		fpath,
		'-V'
	];

	exec( cmd.join( ' ' ), done );

	function done( error, stdout, stderr ) {
		if ( error ) {
			t.fail( error.message );
		} else {
			t.strictEqual( stdout.toString(), '', 'does not print to `stdout`' );
			t.strictEqual( stderr.toString(), PKG_VERSION+'\n', 'expected value' );
		}
		t.end();
	}
});

tape( 'the command-line interface prints the image buffer data', opts, function test( t ) {
	var expected;
	var opts;
	var cmd;

	cmd = [
		process.execPath,
		fpath
	];

	expected = readFileSync( resolve( __dirname, '..', 'data', 'image.jpg' ) );
	expected = string2buffer( expected.toString(), 'base64' );

	opts = {
		'maxBuffer': 600*1024
	};
	exec( cmd.join( ' ' ), opts, done );

	function done( error, stdout, stderr ) {
		var i;
		if ( error ) {
			t.fail( error.message );
		} else {
			stdout = string2buffer( stdout.toString(), 'base64' );
			for ( i = 0; i < expected.length; i++ ) {
				t.strictEqual( stdout[ i ], expected[ i ], 'prints byte ' + i );
			}
			t.strictEqual( stderr.toString(), '', 'does not print to `stderr`' );
		}
		t.end();
	}
});

}).call(this,require('_process'),"/lib/node_modules/@stdlib/datasets/img-dust-bowl-home/test/test.cli.js","/lib/node_modules/@stdlib/datasets/img-dust-bowl-home/test")
},{"./../package.json":31,"@stdlib/assert/is-browser":5,"@stdlib/assert/is-windows":18,"@stdlib/buffer/from-string":25,"@stdlib/fs/read-file":36,"_process":68,"child_process":67,"path":100,"tape":128}],34:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var IS_BROWSER = require( '@stdlib/assert/is-browser' );
var isBuffer = require( '@stdlib/assert/is-buffer' );
var image = require( './../lib' );


// VARIABLES //

var opts = {
	'skip': IS_BROWSER
};


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof image, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a buffer object', opts, function test( t ) {
	var data = image();
	t.equal( isBuffer( data ), true, 'returns a buffer object' );
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/datasets/img-dust-bowl-home/test/test.js")
},{"./../lib":28,"@stdlib/assert/is-browser":5,"@stdlib/assert/is-buffer":6,"tape":128}],35:[function(require,module,exports){
(function (__filename){
/* proxyquireify injected requires to make browserify include dependencies in the bundle */ /* istanbul ignore next */; (function __makeBrowserifyIncludeModule__() { require('./../lib/main.js');});'use strict';

// MODULES //

var tape = require( 'tape' );
var proxyquire = require('proxyquireify')(require);
var image = require( './../lib/main.js' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof image, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function throws an error if unable to load data', function test( t ) {
	var image = proxyquire( './../lib/main.js', {
		'@stdlib/fs/read-file': {
			'sync': readFile
		}
	});
	t.throws( image, Error, 'throws an error' );
	t.end();

	function readFile() {
		return new Error( 'unable to read data' );
	}
});

}).call(this,"/lib/node_modules/@stdlib/datasets/img-dust-bowl-home/test/test.main.js")
},{"./../lib/main.js":30,"proxyquireify":102,"tape":128}],36:[function(require,module,exports){
'use strict';

/**
* Read the entire contents of a file.
*
* @module @stdlib/fs/read-file
*
* @example
* var readFile = require( '@stdlib/fs/read-file' );
*
* function onFile( error, data ) {
*     if ( error ) {
*         throw error;
*     }
*     console.log( data );
* }
* readFile( __filename, onFile );
*
* @example
* var readFileSync = require( '@stdlib/fs/read-file' ).sync;
*
* var out = readFileSync( __filename );
* if ( out instanceof Error ) {
*     throw out;
* }
* console.log( out );
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var readFile = require( './main.js' );
var sync = require( './sync.js' );


// MAIN //

setReadOnly( readFile, 'sync', sync );


// EXPORTS //

module.exports = readFile;

},{"./main.js":37,"./sync.js":38,"@stdlib/utils/define-read-only-property":45}],37:[function(require,module,exports){
'use strict';

// MODULES //

var fs = require( 'fs' );


// MAIN //

/**
* Asynchronously reads the entire contents of a file.
*
* @param {(string|Buffer|integer)} file - file path or file descriptor
* @param {(Object|string)} [options] - options
* @param {Function} clbk - callback to invoke after reading file contents
*
* @example
* function onFile( error, data ) {
*     if ( error ) {
*         throw error;
*     }
*     console.log( data );
* }
* readFile( __filename, onFile );
*/
function readFile() {
	var args;
	var i;
	args = new Array( arguments.length );
	for ( i = 0; i < args.length; i++ ) {
		args[ i ] = arguments[ i ];
	}
	fs.readFile.apply( null, args );
}


// EXPORTS //

module.exports = readFile;

},{"fs":67}],38:[function(require,module,exports){
'use strict';

// MODULES //

var fs = require( 'fs' );


// MAIN //

/**
* Synchronously reads the entire contents of a file.
*
* @param {(string|Buffer|integer)} file - file path or file descriptor
* @param {(Object|string)} [options] - options
* @returns {(Buffer|string|Error)} file contents or an error
*
* @example
* var out = readFileSync( __filename );
* if ( out instanceof Error ) {
*     throw out;
* }
* console.log( out );
*/
function readFileSync( file, options ) {
	var f;
	try {
		if ( arguments.length > 1 ) {
			f = fs.readFileSync( file, options ); // eslint-disable-line no-sync
		} else {
			f = fs.readFileSync( file ); // eslint-disable-line no-sync
		}
	} catch ( err ) {
		return err;
	}
	return f;
}


// EXPORTS //

module.exports = readFileSync;

},{"fs":67}],39:[function(require,module,exports){
'use strict';

/**
* Platform on which the current process is running.
*
* @module @stdlib/os/platform
*
* @example
* var PLATFORM = require( '@stdlib/os/platform' );
*
* if ( PLATFORM === 'win32' ) {
*    console.log( 'Running on a PC...' );
* }
* else if ( PLATFORM === 'darwin' ) {
*    console.log( 'Running on a Mac...' );
* }
* else {
*    console.log( 'Running on something else...' );
* }
*/

// MODULES //

var PLATFORM = require( './platform.js' );


// EXPORTS //

module.exports = PLATFORM;

},{"./platform.js":40}],40:[function(require,module,exports){
(function (process){
'use strict';

// MAIN //

/**
* Platform on which the current process is running.
*
* @constant
* @type {string}
*/
var PLATFORM = process.platform;


// EXPORTS //

module.exports = PLATFORM;

}).call(this,require('_process'))
},{"_process":68}],41:[function(require,module,exports){
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

},{}],42:[function(require,module,exports){
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

},{"@stdlib/assert/is-buffer":6,"@stdlib/regexp/function-name":41,"@stdlib/utils/native-class":53}],43:[function(require,module,exports){
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

},{"./constructor_name.js":42}],44:[function(require,module,exports){
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

},{}],45:[function(require,module,exports){
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

},{"./define_read_only_property.js":44}],46:[function(require,module,exports){
(function (Buffer){
'use strict';

// EXPORTS //

module.exports = ( typeof Buffer === 'function' ) ? Buffer : null;

}).call(this,require("buffer").Buffer)
},{"buffer":69}],47:[function(require,module,exports){
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

},{"./main.js":48}],48:[function(require,module,exports){
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

},{"./buffer.js":46,"@stdlib/assert/is-buffer":6}],49:[function(require,module,exports){
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

},{}],50:[function(require,module,exports){
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

},{"./detect_symbol_support.js":49}],51:[function(require,module,exports){
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

},{"@stdlib/utils/detect-symbol-support":50}],52:[function(require,module,exports){
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

},{"./has_tostringtag_support.js":51}],53:[function(require,module,exports){
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

},{"./native_class.js":54,"./polyfill.js":55,"@stdlib/utils/detect-tostringtag-support":52}],54:[function(require,module,exports){
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

},{"./tostring.js":56}],55:[function(require,module,exports){
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

},{"./tostring.js":56,"./tostringtag.js":57,"@stdlib/assert/has-own-property":2}],56:[function(require,module,exports){
'use strict';

// MAIN //

var toStr = Object.prototype.toString;


// EXPORTS //

module.exports = toStr;

},{}],57:[function(require,module,exports){
'use strict';

// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{}],58:[function(require,module,exports){
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

},{"./fixtures/nodelist.js":59,"./fixtures/re.js":60,"./fixtures/typedarray.js":61}],59:[function(require,module,exports){
'use strict';

// MODULES //

var root = require( 'system.global' )(); // eslint-disable-line stdlib/no-redeclare


// MAIN //

var nodeList = root.document && root.document.childNodes;


// EXPORTS //

module.exports = nodeList;

},{"system.global":125}],60:[function(require,module,exports){
'use strict';

var RE = /./;


// EXPORTS //

module.exports = RE;

},{}],61:[function(require,module,exports){
'use strict';

var typedarray = Int8Array;


// EXPORTS //

module.exports = typedarray;

},{}],62:[function(require,module,exports){
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

},{"./check.js":58,"./polyfill.js":63,"./typeof.js":64}],63:[function(require,module,exports){
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

},{"@stdlib/utils/constructor-name":43}],64:[function(require,module,exports){
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

},{"@stdlib/utils/constructor-name":43}],65:[function(require,module,exports){
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

},{}],66:[function(require,module,exports){

},{}],67:[function(require,module,exports){
arguments[4][66][0].apply(exports,arguments)
},{"dup":66}],68:[function(require,module,exports){
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

},{}],69:[function(require,module,exports){
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

},{"base64-js":65,"ieee754":89}],70:[function(require,module,exports){
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
},{"../../is-buffer/index.js":91}],71:[function(require,module,exports){
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

},{"./lib/is_arguments.js":72,"./lib/keys.js":73}],72:[function(require,module,exports){
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

},{}],73:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],74:[function(require,module,exports){
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

},{"foreach":85,"object-keys":98}],75:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],76:[function(require,module,exports){
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

},{"./helpers/isFinite":77,"./helpers/isNaN":78,"./helpers/mod":79,"./helpers/sign":80,"es-to-primitive/es5":81,"has":88,"is-callable":92}],77:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],78:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],79:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],80:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],81:[function(require,module,exports){
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

},{"./helpers/isPrimitive":82,"is-callable":92}],82:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],83:[function(require,module,exports){
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

},{}],84:[function(require,module,exports){
'use strict'

var mergeDescriptors = require('merge-descriptors')
var isObject = require('is-object')
var hasOwnProperty = Object.prototype.hasOwnProperty

function fill (destination, source, merge) {
  if (destination && (isObject(source) || isFunction(source))) {
    merge(destination, source, false)
    if (isFunction(destination) && isFunction(source) && source.prototype) {
      merge(destination.prototype, source.prototype, false)
    }
  }
  return destination
}

exports = module.exports = function fillKeys (destination, source) {
  return fill(destination, source, mergeDescriptors)
}

exports.es3 = function fillKeysEs3 (destination, source) {
  return fill(destination, source, es3Merge)
}

function es3Merge (destination, source) {
  for (var key in source) {
    if (!hasOwnProperty.call(destination, key)) {
      destination[key] = source[key]
    }
  }
  return destination
}

function isFunction (value) {
  return typeof value === 'function'
}

},{"is-object":93,"merge-descriptors":95}],85:[function(require,module,exports){

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


},{}],86:[function(require,module,exports){
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

},{}],87:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":86}],88:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":87}],89:[function(require,module,exports){
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

},{}],90:[function(require,module,exports){
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

},{}],91:[function(require,module,exports){
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

},{}],92:[function(require,module,exports){
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

},{}],93:[function(require,module,exports){
"use strict";

module.exports = function isObject(x) {
	return typeof x === "object" && x !== null;
};

},{}],94:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],95:[function(require,module,exports){
/*!
 * merge-descriptors
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

'use strict'

/**
 * Module exports.
 * @public
 */

module.exports = merge

/**
 * Module variables.
 * @private
 */

var hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * Merge the property descriptors of `src` into `dest`
 *
 * @param {object} dest Object to add descriptors to
 * @param {object} src Object to clone descriptors from
 * @param {boolean} [redefine=true] Redefine `dest` properties with `src` properties
 * @returns {object} Reference to dest
 * @public
 */

function merge(dest, src, redefine) {
  if (!dest) {
    throw new TypeError('argument dest is required')
  }

  if (!src) {
    throw new TypeError('argument src is required')
  }

  if (redefine === undefined) {
    // Default to true
    redefine = true
  }

  Object.getOwnPropertyNames(src).forEach(function forEachOwnPropertyName(name) {
    if (!redefine && hasOwnProperty.call(dest, name)) {
      // Skip desriptor
      return
    }

    // Copy descriptor
    var descriptor = Object.getOwnPropertyDescriptor(src, name)
    Object.defineProperty(dest, name, descriptor)
  })

  return dest
}

},{}],96:[function(require,module,exports){
'use strict'

module.exports = function createNotFoundError (path) {
  var err = new Error('Cannot find module \'' + path + '\'')
  err.code = 'MODULE_NOT_FOUND'
  return err
}

},{}],97:[function(require,module,exports){
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

},{}],98:[function(require,module,exports){
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

},{"./isArguments":99}],99:[function(require,module,exports){
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

},{}],100:[function(require,module,exports){
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
},{"_process":68}],101:[function(require,module,exports){
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
},{"_process":68}],102:[function(require,module,exports){
'use strict';

var fillMissingKeys = require('fill-keys');
var moduleNotFoundError = require('module-not-found-error');

function ProxyquireifyError(msg) {
  this.name = 'ProxyquireifyError';
  Error.captureStackTrace(this, ProxyquireifyError);
  this.message = msg || 'An error occurred inside proxyquireify.';
}

function validateArguments(request, stubs) {
  var msg = (function getMessage() {
    if (!request)
      return 'Missing argument: "request". Need it to resolve desired module.';

    if (!stubs)
      return 'Missing argument: "stubs". If no stubbing is needed, use regular require instead.';

    if (typeof request != 'string')
      return 'Invalid argument: "request". Needs to be a requirable string that is the module to load.';

    if (typeof stubs != 'object')
      return 'Invalid argument: "stubs". Needs to be an object containing overrides e.g., {"path": { extname: function () { ... } } }.';
  })();

  if (msg) throw new ProxyquireifyError(msg);
}

var stubs;

function stub(stubs_) {
  stubs = stubs_;
  // This cache is used by the prelude as an alternative to the regular cache.
  // It is not read or written here, except to set it to an empty object when
  // adding stubs and to reset it to null when clearing stubs.
  module.exports._cache = {};
}

function reset() {
  stubs = undefined;
  module.exports._cache = null;
}

var proxyquire = module.exports = function (require_) {
  if (typeof require_ != 'function')
    throw new ProxyquireifyError(
        'It seems like you didn\'t initialize proxyquireify with the require in your test.\n'
      + 'Make sure to correct this, i.e.: "var proxyquire = require(\'proxyquireify\')(require);"'
    );

  reset();

  return function(request, stubs) {

    validateArguments(request, stubs);

    // set the stubs and require dependency
    // when stub require is invoked by the module under test it will find the stubs here
    stub(stubs);
    var dep = require_(request);
    reset();

    return dep;
  };
};

// Start with the default cache
proxyquire._cache = null;

proxyquire._proxy = function (require_, request) {
  function original() {
    return require_(request);
  }

  if (!stubs || !stubs.hasOwnProperty(request)) return original();

  var stub = stubs[request];

  if (stub === null) throw moduleNotFoundError(request)

  var stubWideNoCallThru = Boolean(stubs['@noCallThru']) && (stub == null || stub['@noCallThru'] !== false);
  var noCallThru = stubWideNoCallThru || (stub != null && Boolean(stub['@noCallThru']));
  return noCallThru ? stub : fillMissingKeys(stub, original());
};

if (require.cache) {
  // only used during build, so prevent browserify from including it
  var replacePreludePath = './lib/replace-prelude';
  var replacePrelude = require(replacePreludePath);
  proxyquire.browserify = replacePrelude.browserify;
  proxyquire.plugin = replacePrelude.plugin;
}

},{"fill-keys":84,"module-not-found-error":96}],103:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":104}],104:[function(require,module,exports){
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
},{"./_stream_readable":106,"./_stream_writable":108,"core-util-is":70,"inherits":90,"process-nextick-args":101}],105:[function(require,module,exports){
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
},{"./_stream_transform":107,"core-util-is":70,"inherits":90}],106:[function(require,module,exports){
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
},{"./_stream_duplex":104,"./internal/streams/BufferList":109,"./internal/streams/destroy":110,"./internal/streams/stream":111,"_process":68,"core-util-is":70,"events":83,"inherits":90,"isarray":94,"process-nextick-args":101,"safe-buffer":117,"string_decoder/":123,"util":66}],107:[function(require,module,exports){
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
},{"./_stream_duplex":104,"core-util-is":70,"inherits":90}],108:[function(require,module,exports){
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
},{"./_stream_duplex":104,"./internal/streams/destroy":110,"./internal/streams/stream":111,"_process":68,"core-util-is":70,"inherits":90,"process-nextick-args":101,"safe-buffer":117,"util-deprecate":134}],109:[function(require,module,exports){
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
},{"safe-buffer":117}],110:[function(require,module,exports){
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
},{"process-nextick-args":101}],111:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":83}],112:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":113}],113:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":104,"./lib/_stream_passthrough.js":105,"./lib/_stream_readable.js":106,"./lib/_stream_transform.js":107,"./lib/_stream_writable.js":108}],114:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":113}],115:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":108}],116:[function(require,module,exports){
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
},{"_process":68,"through":133}],117:[function(require,module,exports){
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

},{"buffer":69}],118:[function(require,module,exports){
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

},{"events":83,"inherits":90,"readable-stream/duplex.js":103,"readable-stream/passthrough.js":112,"readable-stream/readable.js":113,"readable-stream/transform.js":114,"readable-stream/writable.js":115}],119:[function(require,module,exports){
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

},{"es-abstract/es5":76,"function-bind":87}],120:[function(require,module,exports){
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

},{"./implementation":119,"./polyfill":121,"./shim":122,"define-properties":74,"function-bind":87}],121:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":119}],122:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":121,"define-properties":74}],123:[function(require,module,exports){
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
},{"safe-buffer":117}],124:[function(require,module,exports){
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
},{}],125:[function(require,module,exports){
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

},{"./implementation":124,"./polyfill":126,"./shim":127,"define-properties":74}],126:[function(require,module,exports){
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
},{"./implementation":124}],127:[function(require,module,exports){
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
},{"./polyfill":126,"define-properties":74}],128:[function(require,module,exports){
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
},{"./lib/default_stream":129,"./lib/results":131,"./lib/test":132,"_process":68,"defined":75,"through":133}],129:[function(require,module,exports){
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
},{"_process":68,"fs":67,"through":133}],130:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":68}],131:[function(require,module,exports){
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
},{"_process":68,"events":83,"function-bind":87,"has":88,"inherits":90,"object-inspect":97,"resumer":116,"through":133}],132:[function(require,module,exports){
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
},{"./next_tick":130,"deep-equal":71,"defined":75,"events":83,"has":88,"inherits":90,"path":100,"string.prototype.trim":120}],133:[function(require,module,exports){
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
},{"_process":68,"stream":118}],134:[function(require,module,exports){
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
},{}]},{},[32,33,34,35]);
