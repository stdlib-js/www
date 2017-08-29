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

// MODULES //

var isArrayLike = require( '@stdlib/assert/is-array-like' );
var isInteger = require( '@stdlib/assert/is-integer' ).isPrimitive;
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var isnan = require( '@stdlib/assert/is-nan' ).isPrimitive;


// MAIN //

/**
* Tests if an array-like value contains a search value.
*
* @param {ArrayLike} val - input value
* @param {*} searchValue - search value
* @param {integer} [position=0] - position at which to start searching for `searchValue`
* @throws {TypeError} first argument must be array-like
* @throws {Error} must provide a search value
* @throws {TypeError} second argument must be a primitive string primitive when the first argument is a string
* @throws {TypeError} third argument must be an integer
* @returns {boolean} boolean indicating whether one value contains another
*
* @example
* var bool = contains( 'last man standing', 'stand' );
* // returns true
*
* @example
* var bool = contains( [ 1, 2, 3, 4 ], 2 );
* // returns true
*
* @example
* var bool = contains( 'presidential election', 'president' );
* // returns true
*
* @example
* var bool = contains( [ NaN, 2, 3, 4 ], NaN );
* // returns true
*
* @example
* var bool = contains( 'javaScript', 'js' );
* // returns false
*
* @example
* var bool = contains( [ 1, 2, 3, {} ], {} );
* // returns false
*
* @example
* var bool = contains( 'Hidden Treasures', '' );
* // returns true
*/
function contains( val, searchValue, position ) {
	var len;
	var pos;
	var i;
	if ( !isArrayLike( val ) ) {
		throw new TypeError( 'invalid input argument. First argument must be array-like. Value: `' + val + '`.' );
	}
	if ( arguments.length < 2 ) {
		throw new Error( 'insufficient input arguments. Must provide a search value.' );
	}
	if ( arguments.length > 2 ) {
		if ( !isInteger( position ) ) {
			throw new TypeError( 'invalid input argument. Third argument must be an integer. Value: `' + position + '`.' );
		}
		pos = position;
	} else {
		pos = 0;
	}
	if ( isString( val ) ) {
		if ( !isString( searchValue ) ) {
			throw new TypeError( 'invalid input argument. Second argument must be a string primitive. Value: `' + searchValue + '`.' );
		}
		return val.indexOf( searchValue, pos ) > -1;
	}
	len = val.length;
	if ( isnan( searchValue ) ) {
		for ( i = pos; i < len; i++ ) {
			if ( isnan( val[ i ] ) ) {
				return true;
			}
		}
		return false;
	}
	for ( i = pos; i < len; i++ ) {
		if ( val[ i ] === searchValue ) {
			return true;
		}
	}
	return false;
} // end FUNCTION contains()


// EXPORTS //

module.exports = contains;

},{"@stdlib/assert/is-array-like":27,"@stdlib/assert/is-integer":116,"@stdlib/assert/is-nan":135,"@stdlib/assert/is-string":256}],2:[function(require,module,exports){
'use strict';

/**
* Test if an array-like value contains another value.
*
* @module @stdlib/assert/contains
*
* @example
* var contains = require( '@stdlib/assert/contains' );
*
* var bool = contains( 'Hello World', 'World' );
* // returns true
*
* bool = contains( 'Hello World', 'world' );
* // returns false
*
* bool = contains( [ 1, 2, 3, 4 ], 2 );
* // returns true
*
* bool = contains( [ NaN, 2, 3, 4 ], NaN );
* // returns true
*/

// MODULES //

var contains = require( './contains.js' );


// EXPORTS //

module.exports = contains;

},{"./contains.js":1}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{"./has_own_property.js":3}],5:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Tests if an object has a specified property, either own or inherited.
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
* var bool = hasProp( beep, 'boop' );
* // returns true
*
* @example
* var beep = {
*     'boop': true
* };
*
* var bool = hasProp( beep, 'bap' );
* // returns false
*/
function hasProp( value, property ) {
	if (
		value === void 0 ||
		value === null
	) {
		return false;
	}
	return ( String( property ) in Object( value ) );
} // end FUNCTION hasProp()


// EXPORTS //

module.exports = hasProp;

},{}],6:[function(require,module,exports){
'use strict';

/**
* Test whether an object has a specified property, either own or inherited.
*
* @module @stdlib/assert/has-property
*
* @example
* var hasProp = require( '@stdlib/assert/has-property' );
*
* var beep = {
*     'boop': true
* };
*
* var bool = hasProp( beep, 'boop' );
* // returns true
*
* bool = hasProp( beep, 'bop' );
* // returns false
*/

// MODULES //

var hasProp = require( './has_property.js' );


// EXPORTS //

module.exports = hasProp;

},{"./has_property.js":5}],7:[function(require,module,exports){
'use strict';

/**
* Tests if an object's prototype chain contains a provided prototype.
*
* @param {*} value - value to test
* @param {(Object|Function)} proto - prototype
* @throws {TypeError} second argument must be an object and not null
* @returns {boolean} boolean indicating if a provided prototype exists in a prototype chain
*
* @example
* var inherit = require( '@stdlib/utils/inherit' );
* var hasPrototype = require( '@stdlib/assert/has-prototype' );
*
* function Foo() {
*     return this;
* }
*
* function Bar() {
*     return this;
* }
* inherit( Bar, Foo );
*
* var bar = new Bar();
*
* var bool = hasPrototype( bar, Foo.prototype );
* // returns true
*/
function hasPrototype( value, proto ) {
	var type = typeof proto;
	if (
		proto === null ||
		(type !== 'object' && type !== 'function')
	) {
		throw new TypeError( 'invalid input argument. Second argument must be either an object (except null) or a function. Value: `'+proto+'`.' );
	}
	type = typeof value;
	if (
		value === null ||
		(type !== 'object' && type !== 'function')
	) {
		return false;
	}
	return proto.isPrototypeOf( value ); // eslint-disable-line no-prototype-builtins
} // end FUNCTION hasPrototype()


// EXPORTS //

module.exports = hasPrototype;

},{}],8:[function(require,module,exports){
'use strict';

/**
* Test if an object's prototype chain contains a provided prototype.
*
* @module @stdlib/assert/has-prototype
*
* @example
* var inherit = require( '@stdlib/utils/inherit' );
* var hasPrototype = require( '@stdlib/assert/has-prototype' );
*
* function Foo() {
*     return this;
* }
*
* function Bar() {
*     return this;
* }
* inherit( Bar, Foo );
*
* var bar = new Bar();
*
* var bool = hasPrototype( bar, Foo.prototype );
* // returns true
*/

// MODULES //

var hasPrototype = require( './has_prototype.js' );


// EXPORTS //

module.exports = hasPrototype;

},{"./has_prototype.js":7}],9:[function(require,module,exports){
'use strict';

/**
* Test whether a value has in its prototype chain a specified constructor as a prototype property.
*
* @module @stdlib/assert/instance-of
*
* @example
* var instanceOf = require( '@stdlib/assert/instance-of' );
*
* var bool = instanceOf( [], Array );
* // returns true
*
* bool = instanceOf( {}, Object ); // exception
* // returns true
*
* bool = instanceOf( 'beep', String );
* // returns false
*
* bool = instanceOf( null, Object );
* // returns false
*
* bool = instanceOf( 5, Object );
* // returns false
*/

// MODULES //

var instanceOf = require( './instance_of.js' );


// EXPORTS //

module.exports = instanceOf;

},{"./instance_of.js":10}],10:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Tests whether a value has in its prototype chain a specified constructor as a prototype property.
*
* @param {*} value - value to test
* @param {Function} constructor - constructor to test against
* @throws {TypeError} constructor must be callable
* @returns {boolean} boolean indicating whether a value is an instance of a provided constructor
*
* @example
* var bool = instanceOf( [], Array );
* // returns true
*
* @example
* var bool = instanceOf( {}, Object ); // exception
* // returns true
*
* @example
* var bool = instanceOf( 'beep', String );
* // returns false
*
* @example
* var bool = instanceOf( null, Object );
* // returns false
*
* @example
* var bool = instanceOf( 5, Object );
* // returns false
*/
function instanceOf( value, constructor ) {
	// TODO: replace with `isCallable` check
	if ( typeof constructor !== 'function' ) {
		throw new TypeError( 'invalid input argument. `constructor` argument must be callable. Value: `'+constructor+'`.' );
	}
	return ( value instanceof constructor );
} // end FUNCTION instanceOf()


// EXPORTS //

module.exports = instanceOf;

},{}],11:[function(require,module,exports){
'use strict';

/**
* Test if a value is an absolute path.
*
* @module @stdlib/assert/is-absolute-path
*
* @example
* var isWindows = require( '@stdlib/assert/is-windows' );
* var isAbsolutePath = require( '@stdlib/assert/is-absolute-path' );
*
* var bool;
* if ( isWindows ) {
*     bool = isAbsolutePath( 'C:\\foo\\bar\\baz' );
*     // returns true
* } else {
*     bool = isAbsolutePath( '/foo/bar/baz' );
*     // returns true
* }
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isWindows = require( '@stdlib/assert/is-windows' );
var isAbsolutePathPosix = require( './posix.js' );
var isAbsolutePathWin32 = require( './win32.js' );


// MAIN //

var isAbsolutePath;
if ( isWindows ) {
	isAbsolutePath = isAbsolutePathWin32;
} else {
	isAbsolutePath = isAbsolutePathPosix;
}
setReadOnly( isAbsolutePath, 'posix', isAbsolutePathPosix );
setReadOnly( isAbsolutePath, 'win32', isAbsolutePathWin32 );


// EXPORTS //

module.exports = isAbsolutePath;

},{"./posix.js":12,"./win32.js":13,"@stdlib/assert/is-windows":310,"@stdlib/utils/define-read-only-property":356}],12:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;


// MAIN //

/**
* Tests if a value is a POSIX absolute path.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a POSIX absolute path
*
* @example
* var bool = isAbsolutePath( '/foo/bar/baz' );
* // returns true
*
* @example
* var bool = isAbsolutePath( 'foo/bar/baz' );
* // returns false
*/
function isAbsolutePath( value ) {
	// Must be string longer than `0` characters and start with a forward slash '/':
	return (
		isString( value ) &&
		value.length > 0 &&
		value.charCodeAt( 0 ) === 47
	);
} // end FUNCTION isAbsolutePath()


// EXPORTS //

module.exports = isAbsolutePath;

},{"@stdlib/assert/is-string":256}],13:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;


// MAIN //

/**
* Tests if a value is a Windows absolute path.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a Windows absolute path
*
* @example
* var bool = isAbsolutePath( 'C:\\foo\\bar\\baz' );
* // returns true
*
* @example
* var bool = isAbsolutePath( 'foo\\bar\\baz' );
* // returns false
*/
function isAbsolutePath( value ) {
	var code;
	var len;
	if ( !isString( value ) ) {
		return false;
	}
	len = value.length;
	if ( len === 0 ) {
		return false;
	}
	code = value.charCodeAt( 0 );

	// Check if the string begins with either a forward '/' or backward slash '\\':
	if ( code === 47 || code === 92 ) {
		return true;
	}
	// Check for a device root (e.g., C:\\)...
	if (
		(code >= 65 && code <= 90) || // A-Z
		(code >= 97 && code <= 122)   // a-z
	) {
		// Check if the string has a colon ':' character:
		if ( len > 2 && value.charCodeAt( 1 ) === 58 ) {
			code = value.charCodeAt( 2 );

			// Check for either a forward or backward slash:
			if ( code === 47 || code === 92 ) {
				return true;
			}
		}
	}
	return false;
} // end FUNCTION isAbsolutePath()


// EXPORTS //

module.exports = isAbsolutePath;

},{"@stdlib/assert/is-string":256}],14:[function(require,module,exports){
'use strict';

/**
* Test if a value is an alphagram.
*
* @module @stdlib/assert/is-alphagram
*
* @example
* var isAlphagram = require( '@stdlib/assert/is-alphagram' );
*
* var out = isAlphagram( 'beep' );
* // returns true
*
* out = isAlphagram( 'zba' );
* // returns false
*
* out = isAlphagram( '' );
* // returns false
*/

// MODULES //

var isAlphagram = require( './is_alphagram.js' );


// EXPORTS //

module.exports = isAlphagram;

},{"./is_alphagram.js":15}],15:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' );


// MAIN //

/**
* Tests if a value is an alphagram.
*
* @param {*} x - value to test
* @returns {boolean} boolean indicating if a value is an alphagram
*
* @example
* var out = isAlphagram( 'beep' );
* // returns true
*
* @example
* var out = isAlphagram( new String( 'beep' ) );
* // returns true
*
* @example
* var out = isAlphagram( 'zba' );
* // returns false
*
* @example
* var out = isAlphagram( '' );
* // returns false
*
* @example
* var out = isAlphagram( 123 );
* // returns false
*/
function isAlphagram( x ) {
	var len;
	var i;

	if ( !isString( x ) ) {
		return false;
	}
	len = x.length;
	if ( !len ) {
		return false;
	}
	for ( i = 1; i < len; i++ ) {
		if ( x[ i-1 ] > x[ i ] ) {
			return false;
		}
	}
	return true;
} // end FUNCTION isAlphagram()


// EXPORTS //

module.exports = isAlphagram;

},{"@stdlib/assert/is-string":256}],16:[function(require,module,exports){
'use strict';

/**
* Test if a value is an anagram.
*
* @module @stdlib/assert/is-anagram
*
* @example
* var isAnagram = require( '@stdlib/assert/is-anagram' );
*
* var bool = isAnagram( 'I am a weakish speller', 'William Shakespeare' );
* // returns true
*
* bool = isAnagram( 'bat', 'tabba' );
* // returns false
*/

// MODULES //

var isAnagram = require( './is_anagram.js' );


// EXPORTS //

module.exports = isAnagram;

},{"./is_anagram.js":17}],17:[function(require,module,exports){
'use strict';

// MODULES //

var lowercase = require( '@stdlib/string/lowercase' );
var replace = require( '@stdlib/string/replace' );
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;


// VARIABLES //

var RE_NON_ALPHANUMERIC = /[^a-z0-9]/g;


// FUNCTIONS //

/**
* Comparator function for sorting characters in ascending order.
*
* @private
* @param {string} a - character
* @param {string} b - character
* @returns {number} comparison value
*/
function ascending( a, b ) {
	if ( a < b ) {
		return -1;
	}
	if ( a === b ) {
		return 0;
	}
	return 1;
} // end FUNCTION ascending()


// MAIN //

/**
* Tests if a value is an anagram.
*
* @param {string} str - comparison string
* @param {*} x - value to test
* @throws {TypeError} first argument must be a string primitive
* @returns {boolean} boolean indicating if a value is an anagram
*
* @example
* var bool = isAnagram( 'I am a weakish speller', 'William Shakespeare' );
* // returns true
*
* @example
* var bool = isAnagram( 'bat', 'tabba' );
* // returns false
*/
function isAnagram( str, x ) {
	if ( !isString( str ) ) {
		throw new TypeError( 'invalid input argument. First argument must be a string primitive. Value: `' + str + '`.' );
	}
	if ( !isString( x ) ) {
		return false;
	}
	str = lowercase( str );
	str = replace( str, RE_NON_ALPHANUMERIC, '' );
	x = lowercase( x );
	x = replace( x, RE_NON_ALPHANUMERIC, '' );
	if ( str.length !== x.length ) {
		return false;
	}
	str = str.split( '' )
		.sort( ascending )
		.join( '' );
	x = x.split( '' )
		.sort( ascending )
		.join( '' );
	return ( str === x );
} // end FUNCTION isAnagram()


// EXPORTS //

module.exports = isAnagram;

},{"@stdlib/assert/is-string":256,"@stdlib/string/lowercase":345,"@stdlib/string/replace":347}],18:[function(require,module,exports){
'use strict';

// MODULES //

var isArguments = require( './is_arguments.js' );


// MAIN //

/**
* Detects whether an environment returns the expected internal class of the `arguments` object.
*
* @private
* @returns {boolean} boolean indicating whether an environment behaves as expected
*
* @example
* var bool = detect();
* // returns <boolean>
*/
function detect() {
	return isArguments( arguments );
} // end FUNCTION detect()


// EXPORTS //

module.exports = detect();

},{"./is_arguments.js":20}],19:[function(require,module,exports){
'use strict';

/**
* Test if a value is an `arguments` object.
*
* @module @stdlib/assert/is-arguments
*
* @example
* var isArguments = require( '@stdlib/assert/is-arguments' );
*
* function foo() {
*     return arguments;
* }
*
* var bool = isArguments( foo() );
* // returns true
*
* bool = isArguments( [] );
* // returns false
*/

// MODULES //

var hasArgumentsClass = require( './detect.js' );


// MAIN //

var isArguments;
if ( hasArgumentsClass ) {
	isArguments = require( './is_arguments.js' );
} else {
	isArguments = require( './polyfill.js' );
}


// EXPORTS //

module.exports = isArguments;

},{"./detect.js":18,"./is_arguments.js":20,"./polyfill.js":21}],20:[function(require,module,exports){
'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );


// MAIN //

/**
* Tests whether a value is an `arguments` object.
*
* @private
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether a value is an `arguments` object
*
* @example
* function foo() {
*     return arguments;
* }
*
* var bool = isArguments( foo() );
* // returns true
*
* @example
* var bool = isArguments( [] );
* // returns false
*/
function isArguments( value ) {
	return ( nativeClass( value ) === '[object Arguments]' );
} // end FUNCTION isArguments()


// EXPORTS //

module.exports = isArguments;

},{"@stdlib/utils/native-class":369}],21:[function(require,module,exports){
'use strict';

// MODULES //

var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var isEnumerableProperty = require( '@stdlib/assert/is-enumerable-property' );
var isArray = require( '@stdlib/assert/is-array' );
var isInteger = require( '@stdlib/math/base/assert/is-integer' );
var MAX_LENGTH = require( '@stdlib/math/constants/uint32-max' );


// MAIN //

/**
* Tests whether a value is an `arguments` object.
*
* @private
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether a value is an `arguments` object
*
* @example
* function foo() {
*     return arguments;
* }
*
* var bool = isArguments( foo() );
* // returns true
*
* @example
* var bool = isArguments( [] );
* // returns false
*/
function isArguments( value ) {
	return (
		value !== null &&
		typeof value === 'object' &&
		!isArray( value ) &&
		typeof value.length === 'number' &&
		isInteger( value.length ) &&
		value.length >= 0 &&
		value.length <= MAX_LENGTH &&
		hasOwnProp( value, 'callee' ) &&
		!isEnumerableProperty( value, 'callee' )
	);
} // end FUNCTION isArguments()


// EXPORTS //

module.exports = isArguments;

},{"@stdlib/assert/has-own-property":4,"@stdlib/assert/is-array":29,"@stdlib/assert/is-enumerable-property":76,"@stdlib/math/base/assert/is-integer":321,"@stdlib/math/constants/uint32-max":338}],22:[function(require,module,exports){
'use strict';

/**
* Test if a value is an array of arrays.
*
* @module @stdlib/assert/is-array-array
*
* @example
* var isArrayArray = require( '@stdlib/assert/is-array-array' );
*
* var bool = isArrayArray( [ [], [] ] );
* // returns true
*
* bool = isArrayArray( [ {}, {} ] );
* // returns false
*
* bool = isArrayArray( [] );
* // returns false
*/

// MODULES //

var arrayfun = require( '@stdlib/assert/tools/array-function' );
var isArray = require( '@stdlib/assert/is-array' );


// MAIN //

var isArrayArray = arrayfun( isArray );


// EXPORTS //

module.exports = isArrayArray;

},{"@stdlib/assert/is-array":29,"@stdlib/assert/tools/array-function":314}],23:[function(require,module,exports){
'use strict';

/**
* Test if a value is a valid array length.
*
* @module @stdlib/assert/is-array-length
*
* @example
* var isArrayLength = require( '@stdlib/assert/is-array-length' );
*
* var bool = isArrayLength( 5 );
* // returns true
*
* bool = isArrayLength( 2.0e200 );
* // returns false
*
* bool = isArrayLength( -3.14 );
* // returns false
*
* bool = isArrayLength( null );
* // returns false
*/

// MODULES //

var isArrayLength = require( './is_array_length.js' );


// EXPORTS //

module.exports = isArrayLength;

},{"./is_array_length.js":24}],24:[function(require,module,exports){
'use strict';

// MODULES //

var isInteger = require( '@stdlib/assert/is-integer' ).isPrimitive;
var MAX_UINT32 = require( '@stdlib/math/constants/uint32-max' );


// MAIN //

/**
* Tests if a value is a valid array length.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a valid array length
*
* @example
* var bool = isArrayLength( 3 );
* // returns true
*
* @example
* var bool = isArrayLength( 3.14 );
* // returns false
*/
function isArrayLength( value ) {
	return (
		isInteger( value ) &&
		value >= 0 &&
		value <= MAX_UINT32
	);
} // end FUNCTION isArrayLength()


// EXPORTS //

module.exports = isArrayLength;

},{"@stdlib/assert/is-integer":116,"@stdlib/math/constants/uint32-max":338}],25:[function(require,module,exports){
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

},{"./is_array_like_object.js":26}],26:[function(require,module,exports){
'use strict';

// MODULES //

var isInteger = require( '@stdlib/math/base/assert/is-integer' );
var MAX_LENGTH = require( '@stdlib/math/constants/uint32-max' );


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
} // end FUNCTION isArrayLikeObject()


// EXPORTS //

module.exports = isArrayLikeObject;

},{"@stdlib/math/base/assert/is-integer":321,"@stdlib/math/constants/uint32-max":338}],27:[function(require,module,exports){
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

},{"./is_array_like.js":28}],28:[function(require,module,exports){
'use strict';

// MODULES //

var isInteger = require( '@stdlib/math/base/assert/is-integer' );
var MAX_LENGTH = require( '@stdlib/math/constants/uint32-max' );


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
} // end FUNCTION isArrayLike()


// EXPORTS //

module.exports = isArrayLike;

},{"@stdlib/math/base/assert/is-integer":321,"@stdlib/math/constants/uint32-max":338}],29:[function(require,module,exports){
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

},{"./is_array.js":30}],30:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":369}],31:[function(require,module,exports){
'use strict';

/**
* Test if a value is an ArrayBuffer.
*
* @module @stdlib/assert/is-arraybuffer
*
* @example
* var isArrayBuffer = require( '@stdlib/assert/is-arraybuffer' );
*
* var bool = isArrayBuffer( new ArrayBuffer( 10 ) );
* // returns true
*
* bool = isArrayBuffer( [] );
* // returns false
*/

// MODULES //

var isArrayBuffer = require( './is_arraybuffer.js' );


// EXPORTS //

module.exports = isArrayBuffer;

},{"./is_arraybuffer.js":32}],32:[function(require,module,exports){
'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );


// MAIN //

/**
* Tests if a value is an ArrayBuffer.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is an ArrayBuffer
*
* @example
* var bool = isArrayBuffer( new ArrayBuffer( 10 ) );
* // returns true
*
* @example
* var bool = isArrayBuffer( [] );
* // returns false
*/
function isArrayBuffer( value ) {
	return ( nativeClass( value ) === '[object ArrayBuffer]' );
} // end FUNCTION isArrayBuffer()


// EXPORTS //

module.exports = isArrayBuffer;

},{"@stdlib/utils/native-class":369}],33:[function(require,module,exports){
'use strict';

/**
* Test whether a character belongs to the ASCII character set and whether this is true for all characters in a provided string.
*
* @module @stdlib/assert/is-ascii
*
* @example
* var isASCII = require( '@stdlib/assert/is-ascii' );
*
* var out = isASCII( 'beep' );
* // returns true
*
* out = isASCII( 'È' );
* // returns false
*
* out = isASCII( '' );
* // returns false
*/

// MODULES //

var isASCII = require( './is_ascii.js' );


// EXPORTS //

module.exports = isASCII;

},{"./is_ascii.js":34}],34:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;


// VARIABLES //

var MAX_ASCII = 127;


// MAIN //

/**
* Tests whether a character belongs to the ASCII character set and whether this is true for all characters in a provided string.
*
* @param {*} x - value to test
* @returns {boolean} boolean indicating if a string has all ASCII characters
*
* @example
* var out = isASCII( 'beep' );
* // returns true
*
* @example
* var out = isASCII( 'È' );
* // returns false
*
* @example
* var out = isASCII( '' );
* // returns false
*
* @example
* var out = isASCII( 123 );
* // returns false
*/
function isASCII( x ) {
	var len;
	var i;
	if ( !isString( x ) ) {
		return false;
	}
	len = x.length;
	if ( !len ) {
		return false;
	}
	for ( i = 0; i < len; i++ ) {
		if ( x.charCodeAt( i ) > MAX_ASCII ) {
			return false;
		}
	}
	return true;
} // end FUNCTION isASCII()


// EXPORTS //

module.exports = isASCII;

},{"@stdlib/assert/is-string":256}],35:[function(require,module,exports){
'use strict';

/**
* Test if a value is an array-like object where every element is between two values.
*
* @module @stdlib/assert/is-between-array
*
* @example
* var isBetweenArray = require( '@stdlib/assert/is-between-array' );
*
* var arr = [ 3.0, 3.14, 4.0 ];
*
* var bool = isBetweenArray( arr, 3.0, 4.0 );
* // returns true
*
* bool = isBetweenArray( arr, 3.14, 4.0 );
* // returns false
*
* bool = isBetweenArray( arr, 3.0, 3.14 );
* // returns false
*
* bool = isBetweenArray( arr, 3.0, 4.0, 'open', 'closed' );
* // returns false
*
* bool = isBetweenArray( arr, 3.0, 4.0, 'closed', 'open' );
* // returns false
*/

// MODULES //

var isBetweenArray = require( './is_between_array.js' );


// EXPORTS //

module.exports = isBetweenArray;

},{"./is_between_array.js":36}],36:[function(require,module,exports){
'use strict';

// MODULES //

var isArrayLike = require( '@stdlib/assert/is-array-like' );


// MAIN //

/**
* Tests if a value is an array-like object where every element is between two values.
*
* @param {*} value - value to test
* @param {*} a - left comparison value
* @param {*} b - right comparison value
* @param {string} [left="closed"] - indicates whether the left comparison value is inclusive
* @param {string} [right="closed"] - indicates whether the right comparison value is inclusive
* @throws {TypeError} `left` must be a recognized string
* @throws {TypeError} `right` must be a recognized string
* @returns {boolean} boolean indicating whether a value is an array-like object where every element is between two values
*
* @example
* var arr = [ 3.0, 3.14, 4.0 ];
* var bool = isBetweenArray( arr, 3.0, 4.0 );
* // returns true
*
* @example
* var arr = [ 3.0, 3.14, 4.0 ];
* var bool = isBetweenArray( arr, 3.14, 4.0 );
* // returns false
*
* @example
* var arr = [ 3.0, 3.14, 4.0 ];
* var bool = isBetweenArray( arr, 3.0, 3.14 );
* // returns false
*
* @example
* var arr = [ 3.0, 3.14, 4.0 ];
* var bool = isBetweenArray( arr, 3.0, 4.0, 'open', 'closed' );
* // returns false
*
* @example
* var arr = [ 3.0, 3.14, 4.0 ];
* var bool = isBetweenArray( arr, 3.0, 4.0, 'closed', 'open' );
* // returns false
*/
function isBetweenArray( value, a, b, left, right ) {
	var len;
	var i;
	if ( arguments.length > 3 ) {
		if ( left !== 'closed' && left !== 'open' ) {
			throw new TypeError( 'invalid input argument. `left` must be one of the following strings: \'closed\' or \'open\'. Value: `'+left+'`.' );
		}
		if ( right !== 'closed' && right !== 'open' ) {
			throw new TypeError( 'invalid input argument. `right` must be one of the following strings: \'closed\' or \'open\'. Value: `'+right+'`.' );
		}
	}
	if ( !isArrayLike( value ) ) {
		return false;
	}
	len = value.length;
	if ( len === 0 ) {
		return false;
	}
	if ( left === 'closed' || left === void 0 ) {
		if ( right === 'closed' || right === void 0 ) {
			for ( i = 0; i < len; i++ ) {
				if ( value[ i ] < a || value[ i ] > b ) {
					return false;
				}
			}
			return true;
		}
		for ( i = 0; i < len; i++ ) {
			if ( value[ i ] < a || value[ i ] >= b ) {
				return false;
			}
		}
		return true;
	}
	if ( right === 'closed' || right === void 0 ) {
		for ( i = 0; i < len; i++ ) {
			if ( value[ i ] <= a || value[ i ] > b ) {
				return false;
			}
		}
		return true;
	}
	for ( i = 0; i < len; i++ ) {
		if ( value[ i ] <= a || value[ i ] >= b ) {
			return false;
		}
	}
	return true;
} // end FUNCTION isBetweenArray()


// EXPORTS //

module.exports = isBetweenArray;

},{"@stdlib/assert/is-array-like":27}],37:[function(require,module,exports){
'use strict';

/**
* Test if a value is between two values.
*
* @module @stdlib/assert/is-between
*
* @example
* var isBetween = require( '@stdlib/assert/is-between' );
*
* var bool = isBetween( 3.14, 3.0, 4.0 );
* // returns true
*
* bool = isBetween( 4.5, 3.0, 4.0 );
* // returns false
*
* bool = isBetween( 3.14, 3.14, 4.0 );
* // returns true
*
* bool = isBetween( 3.14, 3.14, 4.0, 'open', 'closed' );
* // returns false
*
* bool = isBetween( 3.14, 3.0, 3.14 );
* // returns true
*
* bool = isBetween( 3.14, 3.0, 3.14, 'closed', 'open' );
* // returns false
*/

// MODULES //

var isBetween = require( './is_between.js' );


// EXPORTS //

module.exports = isBetween;

},{"./is_between.js":38}],38:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Tests if a value is between two values.
*
* @param {*} value - value to test
* @param {*} a - left comparison value
* @param {*} b - right comparison value
* @param {string} [left="closed"] - indicates whether the left comparison value is inclusive
* @param {string} [right="closed"] - indicates whether the right comparison value is inclusive
* @throws {TypeError} `left` must be a recognized string
* @throws {TypeError} `right` must be a recognized string
* @returns {boolean} boolean indicating whether a value is between two values
*
* @example
* var bool = isBetween( 3.14, 3.0, 4.0 );
* // returns true
*
* @example
* var bool = isBetween( 4.5, 3.0, 4.0 );
* // returns false
*
* @example
* var bool = isBetween( 3.14, 3.14, 4.0 );
* // returns true
*
* @example
* var bool = isBetween( 3.14, 3.14, 4.0, 'open', 'closed' );
* // returns false
*
* @example
* var bool = isBetween( 3.14, 3.0, 3.14 );
* // returns true
*
* @example
* var bool = isBetween( 3.14, 3.0, 3.14, 'closed', 'open' );
* // returns false
*/
function isBetween( value, a, b, left, right ) {
	if ( arguments.length > 3 ) {
		if ( left !== 'closed' && left !== 'open' ) {
			throw new TypeError( 'invalid input argument. `left` must be one of the following strings: \'closed\' or \'open\'. Value: `'+left+'`.' );
		}
		if ( right !== 'closed' && right !== 'open' ) {
			throw new TypeError( 'invalid input argument. `right` must be one of the following strings: \'closed\' or \'open\'. Value: `'+right+'`.' );
		}
	}
	if ( left === 'closed' || left === void 0 ) {
		if ( right === 'closed' || right === void 0 ) {
			return ( value >= a && value <= b );
		}
		return ( value >= a && value < b );
	}
	if ( right === 'closed' || right === void 0 ) {
		return ( value > a && value <= b );
	}
	return ( value > a && value < b );
} // end FUNCTION isBetween()


// EXPORTS //

module.exports = isBetween;

},{}],39:[function(require,module,exports){
'use strict';

/**
* Tests if a value is a binary string.
*
* @module @stdlib/assert/is-binary-string
*
* @example
* var isBinaryString = require( '@stdlib/assert/is-binary-string' );
*
* var bool = isBinaryString( '1000101' );
* // returns true
*
* bool = isBinaryString( 'beep' );
* // returns false
*
* bool = isBinaryString( '' );
* // returns false
*/

// MODULES //

var isBinaryString = require( './is_binary_string.js' );


// EXPORTS //

module.exports = isBinaryString;

},{"./is_binary_string.js":40}],40:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;


// MAIN //

/**
* Tests if a value is a binary string.
*
* @param {*} str - value to test
* @returns {boolean} boolean indicating if an input value is a binary string
*
* @example
* var bool = isBinaryString( '1000101' );
* // returns true
*
* @example
* var bool = isBinaryString( 'beep' );
* // returns false
*
* @example
* var bool = isBinaryString( '' );
* // returns false
*/
function isBinaryString( str ) {
	var ch;
	var i;
	if ( !isString( str ) ) {
		return false;
	}
	if ( str.length === 0 ) {
		return false;
	}
	for ( i = 0; i < str.length; i++ ) {
		ch = str[ i ];
		if ( ch !== '1' && ch !== '0' ) {
			return false;
		}
	}
	return true;
} // end FUNCTION isBinaryString()


// EXPORTS //

module.exports = isBinaryString;

},{"@stdlib/assert/is-string":256}],41:[function(require,module,exports){
'use strict';

/**
* Test if a value is an array-like object of booleans.
*
* @module @stdlib/assert/is-boolean-array
*
* @example
* var isBooleanArray = require( '@stdlib/assert/is-boolean-array' );
*
* var bool = isBooleanArray( [ true, false, true ] );
* // returns true
*
* bool = isBooleanArray( [ true, 'abc', false ] );
* // returns false
*
* @example
* // Use interface to check for primitives...
* var isBooleanArray = require( '@stdlib/assert/is-boolean-array' ).primitives;
*
* var bool = isBooleanArray( [ true, false ] );
* // returns true
*
* bool = isBooleanArray( [ false, new Boolean( true ) ] );
* // returns false
*
* @example
* // Use interface to check for objects...
* var isBooleanArray = require( '@stdlib/assert/is-boolean-array' ).objects;
*
* var bool = isBooleanArray( [ new Boolean( false ), new Boolean( true ) ] );
* // returns true
*
* bool = isBooleanArray( [ new Boolean( false ), true ] );
* // returns false
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var arrayfun = require( '@stdlib/assert/tools/array-like-function' );
var isBoolean = require( '@stdlib/assert/is-boolean' );


// MAIN //

var isBooleanArray = arrayfun( isBoolean );
setReadOnly( isBooleanArray, 'primitives', arrayfun( isBoolean.isPrimitive ) );
setReadOnly( isBooleanArray, 'objects', arrayfun( isBoolean.isObject ) );


// EXPORTS //

module.exports = isBooleanArray;

},{"@stdlib/assert/is-boolean":43,"@stdlib/assert/tools/array-like-function":316,"@stdlib/utils/define-read-only-property":356}],42:[function(require,module,exports){
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
} // end FUNCTION isBoolean()


// EXPORTS //

module.exports = isBoolean;

},{"./object.js":44,"./primitive.js":45}],43:[function(require,module,exports){
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

},{"./generic.js":42,"./object.js":44,"./primitive.js":45,"@stdlib/utils/define-read-only-property":356}],44:[function(require,module,exports){
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
} // end FUNCTION isBoolean()


// EXPORTS //

module.exports = isBoolean;

},{"./try2serialize.js":47,"@stdlib/utils/detect-tostringtag-support":360,"@stdlib/utils/native-class":369}],45:[function(require,module,exports){
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
} // end FUNCTION isBoolean()


// EXPORTS //

module.exports = isBoolean;

},{}],46:[function(require,module,exports){
'use strict';

// eslint-disable-next-line no-redeclare
var toString = Boolean.prototype.toString; // non-generic


// EXPORTS //

module.exports = toString;

},{}],47:[function(require,module,exports){
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

},{"./tostring.js":46}],48:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = true;

},{}],49:[function(require,module,exports){
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

},{"./is_buffer.js":50}],50:[function(require,module,exports){
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

},{"@stdlib/assert/is-object-like":199}],51:[function(require,module,exports){
'use strict';

/**
* Test if a value is a string having an uppercase first character.
*
* @module @stdlib/assert/is-capitalized
*
* @example
* var isCapitalized = require( '@stdlib/assert/is-capitalized' );
*
* var bool = isCapitalized( 'Hello' );
* // returns true
*
* bool = isCapitalized( 'world' );
* // returns false
*/

// MODULES //

var isCapitalized = require( './is_capitalized.js' );


// EXPORTS //

module.exports = isCapitalized;

},{"./is_capitalized.js":52}],52:[function(require,module,exports){
'use strict';

// MODULES //

var lowercase = require( '@stdlib/string/lowercase' );
var uppercase = require( '@stdlib/string/uppercase' );
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;


// MAIN //

/**
* Tests if a value is a string having an uppercase first character.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a string with an uppercase first character
*
* @example
* var bool = isCapitalized( 'Hello' );
* // returns true
*
* @example
* var bool = isCapitalized( 'WORLD' );
* // returns true
*
* @example
* var bool = isCapitalized( '!' );
* // returns false
*
* @example
* var bool = isCapitalized( 'salt and light' );
* // returns false
*/
function isCapitalized( value ) {
	var ch;
	if ( isString( value ) && value !== '' ) {
		ch = value[ 0 ];
		return ( ch === uppercase( ch ) && ch !== lowercase( ch ) );
	}
	return false;
} // end FUNCTION isCapitalized()


// EXPORTS //

module.exports = isCapitalized;

},{"@stdlib/assert/is-string":256,"@stdlib/string/lowercase":345,"@stdlib/string/uppercase":349}],53:[function(require,module,exports){
'use strict';

/**
* Test if a value is a collection.
*
* @module @stdlib/assert/is-collection
*
* @example
* var isCollection = require( '@stdlib/assert/is-collection' );
*
* var bool = isCollection( [] );
* // returns true
*
* bool = isCollection( {} );
* // returns false
*/

// MODULES //

var isCollection = require( './is_collection.js' );


// EXPORTS //

module.exports = isCollection;

},{"./is_collection.js":54}],54:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var isArrayLike = require( '@stdlib/assert/is-array-like' );


// MAIN //

/**
* Tests if a value is a collection.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether a value is a collection
*
* @example
* var bool = isCollection( [] );
* // returns true
*
* @example
* var bool = isCollection( {} );
* // returns false
*/
function isCollection( value ) {
	return (
		isArrayLike( value ) &&
		!isString( value )
	);
} // end FUNCTION isCollection()


// EXPORTS //

module.exports = isCollection;

},{"@stdlib/assert/is-array-like":27,"@stdlib/assert/is-string":256}],55:[function(require,module,exports){
'use strict';

/**
* Boolean indicating if the current process is running on Darwin.
*
* @module @stdlib/assert/is-darwin
* @type {boolean}
*
* @example
* var IS_DARWIN = require( '@stdlib/assert/is-darwin' );
*
* if ( IS_DARWIN ) {
*     console.log( 'Running on Darwin...' );
* } else {
*     console.log( 'Running on %s...', process.platform );
* }
*/

// MODULES //

var platform = require( '@stdlib/utils/platform' );


// MAIN //

/**
* Boolean indicating if the current process is running on Darwin.
*
* @constant
* @type {boolean}
*/
var IS_DARWIN = ( platform === 'darwin' );


// EXPORTS //

module.exports = IS_DARWIN;

},{"@stdlib/utils/platform":374}],56:[function(require,module,exports){
'use strict';

var getDay = Date.prototype.getDay; // non-generic


// EXPORTS //

module.exports = getDay;

},{}],57:[function(require,module,exports){
'use strict';

/**
* Test if a value is a `Date` object.
*
* @module @stdlib/assert/is-date-object
*
* @example
* var isDateObject = require( '@stdlib/assert/is-date-object' );
*
* var bool = isDateObject( new Date() );
* // returns true
*
* bool = isDateObject( '2017-01-01' );
* // returns false
*/

// MODULES //

var isDateObject = require( './is_date_object.js' );


// EXPORTS //

module.exports = isDateObject;

},{"./is_date_object.js":58}],58:[function(require,module,exports){
'use strict';

// MODULES //

var hasToStringTag = require( '@stdlib/utils/detect-tostringtag-support' )();
var nativeClass = require( '@stdlib/utils/native-class' );
var test = require( './try2getday.js' );


// MAIN //

/**
* Tests if a value is a `Date` object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a `Date` object
*
* @example
* var bool = isDateObject( new Date() );
* // returns true
*
* @example
* var bool = isDateObject( '2017-01-01' );
* // returns false
*/
function isDateObject( value ) {
	if ( typeof value === 'object' ) {
		if ( hasToStringTag ) {
			return test( value );
		}
		return ( nativeClass( value ) === '[object Date]' );
	}
	return false;
} // end FUNCTION isDateObject()


// EXPORTS //

module.exports = isDateObject;

},{"./try2getday.js":59,"@stdlib/utils/detect-tostringtag-support":360,"@stdlib/utils/native-class":369}],59:[function(require,module,exports){
'use strict';

// MODULES //

var getDay = require( './getday.js' );


// MAIN //

/**
* Attempts to call a `Date` method.
*
* @private
* @param {*} value - value to test
* @returns {boolean} boolean indicating if able to call a `Date` method
*/
function test( value ) {
	try {
		getDay.call( value );
		return true;
	} catch ( err ) { // eslint-disable-line no-unused-vars
		return false;
	}
} // end FUNCTION test()


// EXPORTS //

module.exports = test;

},{"./getday.js":56}],60:[function(require,module,exports){
'use strict';

/**
* Test whether a string contains only numeric digits.
*
* @module @stdlib/assert/is-digit-string
*
* @example
* var isDigitString = require( '@stdlib/assert/is-digit-string' );
*
* var out = isDigitString( '0123456789' );
* // returns true
*
* out = isDigitString( '0xffffff' );
* // returns false
*
* out = isDigitString( '' );
* // returns false
*/

// MODULES //

var isDigitString = require( './is_digit_string.js' );


// EXPORTS //

module.exports = isDigitString;

},{"./is_digit_string.js":61}],61:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;


// VARIABLES //

// Character codes:
var ZERO = 48;
var NINE = 57;


// MAIN //

/**
* Tests whether a string contains only numeric digits.
*
* @param {*} x - value to test
* @returns {boolean} boolean indicating if a string contains only numeric digits
*
* @example
* var out = isDigitString( '0123456789' );
* // returns true
*
* @example
* var out = isDigitString( '0xffffff' );
* // returns false
*
* @example
* var out = isDigitString( '' );
* // returns false
*
* @example
* var out = isDigitString( 123 );
* // returns false
*/
function isDigitString( x ) {
	var len;
	var ch;
	var i;
	if ( !isString( x ) ) {
		return false;
	}
	len = x.length;
	if ( !len ) {
		return false;
	}
	for ( i = 0; i < len; i++ ) {
		ch = x.charCodeAt( i );
		if ( ch < ZERO || ch > NINE ) {
			return false;
		}
	}
	return true;
} // end FUNCTION isDigitString()


// EXPORTS //

module.exports = isDigitString;

},{"@stdlib/assert/is-string":256}],62:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = false;

},{}],63:[function(require,module,exports){
arguments[4][62][0].apply(exports,arguments)
},{"dup":62}],64:[function(require,module,exports){
arguments[4][62][0].apply(exports,arguments)
},{"dup":62}],65:[function(require,module,exports){
'use strict';

/**
* Test if a value is an email address.
*
* @module @stdlib/assert/is-email-address
*
* @example
* var isEmail = require( '@stdlib/assert/is-email-address' );
*
* var bool = isEmail( 'beep@boop.com' );
* // returns true
*
* bool = isEmail( 'beep' );
* // returns false
*
* bool = isEmail( null );
* // returns false
*/

// MODULES //

var isEmail = require( './is_email.js' );


// EXPORTS //

module.exports = isEmail;

},{"./is_email.js":66}],66:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;


// VARIABLES //

var RE = /@/;


// MAIN //

/**
* Tests if a value is a valid(ish) email address.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether a value is a valid(ish) email address
*
* @example
* var bool = isEmail( 'beep@boop.com' );
* // returns true
*
* @example
* var bool = isEmail( 'beep' );
* // returns false
*
* @example
* var bool = isEmail( 'beep.com' );
// returns false
*
* @example
* var bool = isEmail( null );
* // returns false
*/
function isEmail( value ) {
	return isString( value ) && RE.test( value );
} // end FUNCTION isEmail()


// EXPORTS //

module.exports = isEmail;

},{"@stdlib/assert/is-string":256}],67:[function(require,module,exports){
'use strict';

/**
* Test if a value is an empty array.
*
* @module @stdlib/assert/is-empty-array
*
* @example
* var isEmptyArray = require( '@stdlib/assert/is-empty-array' );
*
* var bool = isEmptyArray( [] );
* // returns true
*
* bool = isEmptyArray( [ 1, 2, 3 ] );
* // returns false
*
* bool = isEmptyArray( {} );
* // returns false
*/

// MODULES //

var isEmptyArray = require( './is_empty_array.js' );


// EXPORTS //

module.exports = isEmptyArray;

},{"./is_empty_array.js":68}],68:[function(require,module,exports){
'use strict';

// MODULES //

var isArray = require( '@stdlib/assert/is-array' );


// MAIN //

/**
* Tests if a value is an empty array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is an empty array
*
* @example
* var bool = isEmptyArray( [] );
* // returns true
*
* @example
* var bool = isEmptyArray( [ 1, 2, 3 ] );
* // returns false
*
* @example
* var bool = isEmptyArray( {} );
* // returns false
*/
function isEmptyArray( value ) {
	return (
		isArray( value ) &&
		value.length === 0
	);
} // end FUNCTION isEmptyArray()


// EXPORTS //

module.exports = isEmptyArray;

},{"@stdlib/assert/is-array":29}],69:[function(require,module,exports){
'use strict';

/**
* Test if a value is an empty object.
*
* @module @stdlib/assert/is-empty-object
*
* @example
* var isEmptyObject = require( '@stdlib/assert/is-empty-object' );
*
* var bool = isEmptyObject( {} );
* // returns true
*
* bool = isEmptyObject( { 'beep': 'boop' } );
* // returns false
*
* bool = isEmptyObject( [] );
* // returns false
*/

// MODULES //

var isEmptyObject = require( './is_empty_object.js' );


// EXPORTS //

module.exports = isEmptyObject;

},{"./is_empty_object.js":70}],70:[function(require,module,exports){
'use strict';

// MODULES //

var keys = require( 'object-keys' );
var isPlainObject = require( '@stdlib/assert/is-plain-object' );
var hasSymbolSupport = require( '@stdlib/utils/detect-symbol-support' )();


// MAIN //

/**
* Tests if a value is an empty object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is an empty object
*
* @example
* var bool = isEmptyObject( {} );
* // returns true
*
* @example
* var bool = isEmptyObject( { 'beep': 'boop' } );
* // returns false
*
* @example
* var bool = isEmptyObject( [] );
* // returns false
*/
function isEmptyObject( value ) {
	if ( !isPlainObject( value ) ) {
		return false;
	}
	if ( keys( value ).length > 0 ) {
		return false;
	}
	if (
		hasSymbolSupport &&
		Object.getOwnPropertySymbols( value ).length > 0
	) {
		return false;
	}
	return true;
} // end FUNCTION isEmptyObject()


// EXPORTS //

module.exports = isEmptyObject;

},{"@stdlib/assert/is-plain-object":208,"@stdlib/utils/detect-symbol-support":358,"object-keys":411}],71:[function(require,module,exports){
'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is an empty string.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is an empty string
*/
function isEmptyString( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
} // end FUNCTION isEmptyString()


// EXPORTS //

module.exports = isEmptyString;

},{"./object.js":73,"./primitive.js":74}],72:[function(require,module,exports){
'use strict';

/**
* Test if a value is an empty string.
*
* @module @stdlib/assert/is-empty-string
*
* @example
* var isEmptyString = require( '@stdlib/assert/is-empty-string' );
*
* var bool = isEmptyString( '' );
* // returns true
*
* bool = isEmptyString( 'beep' );
* // returns false
*
* bool = isEmptyString( [] );
* // returns false
*
* @example
* var isEmptyString = require( '@stdlib/assert/is-empty-string' ).isObject;
*
* var bool = isEmptyString( new String( '' ) );
* // returns true
*
* bool = isEmptyString( '' );
* // returns false
*
* @example
* var isEmptyString = require( '@stdlib/assert/is-empty-string' ).isPrimitive;
*
* var bool = isEmptyString( '' );
* // returns true
*
* bool = isEmptyString( new String( '' ) );
* // returns false
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isEmptyString = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isEmptyString, 'isPrimitive', isPrimitive );
setReadOnly( isEmptyString, 'isObject', isObject );


// EXPORTS //

module.exports = isEmptyString;

},{"./generic.js":71,"./object.js":73,"./primitive.js":74,"@stdlib/utils/define-read-only-property":356}],73:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isObject;


// MAIN //

/**
* Tests if a value is an empty string object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is an empty string object
*
* @example
* var bool = isEmptyString( '' );
* // returns false
*
* @example
* var bool = isEmptyString( new String( '' ) );
* // returns true
*
* @example
* var bool = isEmptyString( [] );
* // returns false
*/
function isEmptyString( value ) {
	return (
		isString( value ) &&
		value.valueOf() === ''
	);
} // end FUNCTION isEmptyString()


// EXPORTS //

module.exports = isEmptyString;

},{"@stdlib/assert/is-string":256}],74:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Tests if a value is an empty string primitive.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is an empty string primitive
*
* @example
* var bool = isEmptyString( '' );
* // returns true
*
* @example
* var bool = isEmptyString( 'beep' );
* // returns false
*
* @example
* var bool = isEmptyString( [] );
* // returns false
*/
function isEmptyString( value ) {
	return ( value === '' );
} // end FUNCTION isEmptyString()


// EXPORTS //

module.exports = isEmptyString;

},{}],75:[function(require,module,exports){
'use strict';

// MODULES //

var isEnum = require( './native.js' );


// MAIN //

/**
* Detects whether an environment has a bug where String indices are not detected as "enumerable" properties. Observed in Node v0.10.
*
* @private
* @returns {boolean} boolean indicating whether an environment has the bug
*/
function detect() {
	return !isEnum.call( 'beep', '0' );
} // end FUNCTION detect()


// EXPORTS //

module.exports = detect();

},{"./native.js":78}],76:[function(require,module,exports){
'use strict';

/**
* Test whether an object property is enumerable.
*
* @module @stdlib/assert/is-enumerable-property
*
* @example
* var isEnumerableProperty = require( '@stdlib/assert/is-enumerable-property' );
*
* var beep = {
*     'boop': true
* };
*
* var bool = isEnumerableProperty( beep, 'boop' );
* // returns true
*
* bool = isEnumerableProperty( beep, 'hasOwnProperty' );
* // returns false
*/

// MODULES //

var isEnumerableProperty = require( './is_enumerable_property.js' );


// EXPORTS //

module.exports = isEnumerableProperty;

},{"./is_enumerable_property.js":77}],77:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' );
var isnan = require( '@stdlib/assert/is-nan' ).isPrimitive;
var isInteger = require( '@stdlib/assert/is-integer' ).isPrimitive;
var isEnum = require( './native.js' );
var hasStringEnumBug = require( './has_string_enumerability_bug.js' );


// MAIN //

/**
* Tests if an object property is enumerable.
*
* @param {*} value - value to test
* @param {*} property - property to test
* @returns {boolean} boolean indicating if an object property is enumerable
*
* @example
* var beep = {
*     'boop': true
* };
*
* var bool = isEnumerableProperty( beep, 'boop' );
* // returns true
*
* @example
* var beep = {
*     'boop': true
* };
*
* var bool = isEnumerableProperty( beep, 'hasOwnProperty' );
* // returns false
*/
function isEnumerableProperty( value, property ) {
	var bool;
	if (
		value === void 0 ||
		value === null
	) {
		return false;
	}
	bool = isEnum.call( value, property );
	if ( !bool && hasStringEnumBug && isString( value ) ) {
		// Note: we only check for indices, as properties attached to a `String` object are properly detected as enumerable above.
		property = +property;
		return (
			!isnan( property ) &&
			isInteger( property ) &&
			property >= 0 &&
			property < value.length
		);
	}
	return bool;
} // end FUNCTION isEnumerableProperty()


// EXPORTS //

module.exports = isEnumerableProperty;

},{"./has_string_enumerability_bug.js":75,"./native.js":78,"@stdlib/assert/is-integer":116,"@stdlib/assert/is-nan":135,"@stdlib/assert/is-string":256}],78:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = Object.prototype.propertyIsEnumerable;

},{}],79:[function(require,module,exports){
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

},{"./is_error.js":80}],80:[function(require,module,exports){
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
} // end FUNCTION isError()


// EXPORTS //

module.exports = isError;

},{"@stdlib/utils/get-prototype-of":365,"@stdlib/utils/native-class":369}],81:[function(require,module,exports){
'use strict';

/**
* Test if a value is an `EvalError` object.
*
* @module @stdlib/assert/is-eval-error
*
* @example
* var isEvalError = require( '@stdlib/assert/is-eval-error' );
*
* var bool = isEvalError( new EvalError( 'beep' ) );
* // returns true
*
* bool = isEvalError( {} );
* // returns false
*/

// MODULES //

var isEvalError = require( './is_eval_error.js' );


// EXPORTS //

module.exports = isEvalError;

},{"./is_eval_error.js":82}],82:[function(require,module,exports){
'use strict';

// MODULES //

var getPrototypeOf = require( '@stdlib/utils/get-prototype-of' );
var typeOf = require( '@stdlib/utils/type-of' );
var isError = require( '@stdlib/assert/is-error' );


// MAIN //

/**
* Tests if a value is an `EvalError` object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether a value is an `EvalError` object
*
* @example
* var bool = isEvalError( new EvalError( 'beep' ) );
* // returns true
*
* @example
* var bool = isEvalError( {} );
* // returns false
*/
function isEvalError( value ) {
	if ( typeof value !== 'object' || value === null ) {
		return false;
	}
	// Check for `EvalError` objects from the same realm (same Node.js `vm` or same `Window` object)...
	if ( value instanceof EvalError ) {
		return true;
	}
	// All `EvalError` objects are `Error` objects...
	if ( isError( value ) ) {
		// Walk the prototype tree until we find the desired constructor...
		while ( value ) {
			if ( typeOf( value ) === 'evalerror' ) {
				return true;
			}
			value = getPrototypeOf( value );
		}
	}
	return false;
} // end FUNCTION isEvalError()


// EXPORTS //

module.exports = isEvalError;

},{"@stdlib/assert/is-error":79,"@stdlib/utils/get-prototype-of":365,"@stdlib/utils/type-of":380}],83:[function(require,module,exports){
'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is an even number.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is an even number.
*
* @example
* var bool = isEven( 4.0 );
* // returns true
*
* @example
* var bool = isEven( new Number( 4.0 ) );
* // returns true
*
* @example
* var bool = isEven( 3.0 );
* // returns false
*
* @example
* var bool = isEven( new Number( 5.0 ) );
* // returns false
*
* @example
* var bool = isEven( -3.14 );
* // returns false
*
* @example
* var bool = isEven( null );
* // returns false
*/
function isEven( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
} // end FUNCTION isEven()


// EXPORTS //

module.exports = isEven;

},{"./object.js":85,"./primitive.js":86}],84:[function(require,module,exports){
'use strict';

/**
* Test if a value is an even number.
*
* @module @stdlib/assert/is-even
*
* @example
* var isEven = require( '@stdlib/assert/is-even' );
*
* var bool = isEven( 4.0 );
* // returns true
*
* bool = isEven( new Number( 4.0 ) );
* // returns true
*
* bool = isEven( 3.0 );
* // returns false
*
* bool = isEven( new Number( 5.0 ) );
* // returns false
*
* bool = isEven( -3.14 );
* // returns false
*
* bool = isEven( null );
* // returns false
*
* @example
* // Use interface to check for even number primitives...
* var isEven = require( '@stdlib/assert/is-even' ).isPrimitive;
*
* var bool = isEven( -4.0 );
* // returns true
*
* bool = isEven( new Number( -4.0 ) );
* // returns false
*
* @example
* // Use interface to check for even number objects...
* var isEven = require( '@stdlib/assert/is-even' ).isObject;
*
* var bool = isEven( 4.0 );
* // returns false
*
* bool = isEven( new Number( 4.0 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isEven = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isEven, 'isPrimitive', isPrimitive );
setReadOnly( isEven, 'isObject', isObject );


// EXPORTS //

module.exports = isEven;

},{"./generic.js":83,"./object.js":85,"./primitive.js":86,"@stdlib/utils/define-read-only-property":356}],85:[function(require,module,exports){
'use strict';

// MODULES //

var isInteger = require( '@stdlib/assert/is-integer' ).isObject;


// MAIN //

/**
* Tests if a value is a number object that is an even number.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object that is an even number
*
* @example
* var bool = isEven( 4.0 );
* // returns false
*
* @example
* var bool = isEven( new Number( 4.0 ) );
* // returns true
*/
function isEven( value ) {
	return (
		isInteger( value ) &&
		value % 2 === 0
	);
} // end FUNCTION isEven()


// EXPORTS //

module.exports = isEven;

},{"@stdlib/assert/is-integer":116}],86:[function(require,module,exports){
'use strict';

// MODULES //

var isInteger = require( '@stdlib/assert/is-integer' ).isPrimitive;


// MAIN //

/**
* Tests if a value is a number primitive that is an even number.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number primitive that is an even number
*
* @example
* var bool = isEven( -4.0 );
* // returns true
*
* @example
* var bool = isEven( new Number( -4.0 ) );
* // returns false
*/
function isEven( value ) {
	return (
		isInteger( value ) &&
		value % 2 === 0
	);
} // end FUNCTION isEven()


// EXPORTS //

module.exports = isEven;

},{"@stdlib/assert/is-integer":116}],87:[function(require,module,exports){
'use strict';

/**
* Test if a value is an array-like object containing only falsy values.
*
* @module @stdlib/assert/is-falsy-array
*
* @example
* var isFalsyArray = require( '@stdlib/assert/is-falsy-array' );
*
* var bool = isFalsyArray( [ false, null, void 0, '', 0, NaN ] );
* // returns true
*
* bool = isFalsyArray( [ {}, [] ] );
* // returns false
*
* bool = isFalsyArray( [] );
* // returns false
*/

// MODULES //

var arrayfun = require( '@stdlib/assert/tools/array-like-function' );
var isFalsy = require( '@stdlib/assert/is-falsy' );


// MAIN //

var isFalsyArray = arrayfun( isFalsy );


// EXPORTS //

module.exports = isFalsyArray;

},{"@stdlib/assert/is-falsy":88,"@stdlib/assert/tools/array-like-function":316}],88:[function(require,module,exports){
'use strict';

/**
* Test if a value is falsy.
*
* @module @stdlib/assert/is-falsy
*
* @example
* var isFalsy = require( '@stdlib/assert/is-falsy' );
*
* var bool = isFalsy( false );
* // returns true
*
* bool = isFalsy( null );
* // returns true
*
* bool = isFalsy( '' );
* // returns true
*
* bool = isFalsy( 0 );
* // returns true
*
* bool = isFalsy( void 0 );
* // returns true
*
* bool = isFalsy( NaN );
* // returns true
*
* bool = isFalsy( [] );
* // returns false
*/

// MODULES //

var isFalsy = require( './is_falsy.js' );


// EXPORTS //

module.exports = isFalsy;

},{"./is_falsy.js":89}],89:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Tests if a value is falsy.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether a value is falsy
*
* @example
* var bool = isFalsy( false );
* // returns true
*
* @example
* var bool = isFalsy( null );
* // returns true
*
* @example
* var bool = isFalsy( '' );
* // returns true
*
* @example
* var bool = isFalsy( 0 );
* // returns true
*
* @example
* var bool = isFalsy( void 0 );
* // returns true
*
* @example
* var bool = isFalsy( NaN );
* // returns true
*
* @example
* var bool = isFalsy( [] );
* // returns false
*/
function isFalsy( value ) {
	return ( value ) ? false : true; // eslint-disable-line no-unneeded-ternary
} // end FUNCTION isFalsy()


// EXPORTS //

module.exports = isFalsy;

},{}],90:[function(require,module,exports){
'use strict';

/**
* Test if a value is an array-like object containing only finite numbers.
*
* @module @stdlib/assert/is-finite-array
*
* @example
* var isFiniteArray = require( '@stdlib/assert/is-finite-array' );
*
* var bool = isFiniteArray( [ -3.0, new Number(0.0), 2.0 ] );
* // returns true
*
* bool = isFiniteArray( [ -3.0, 1.0/0.0 ] );
* // returns false
*
* @example
* var isFiniteArray = require( '@stdlib/assert/is-finite-array' ).primitives;
*
* var bool = isFiniteArray( [ -1.0, 10.0 ] );
* // returns true
*
* bool = isFiniteArray( [ -1.5, 0.0, 5.0 ] );
* // returns true
*
* bool = isFiniteArray( [ -3.0, new Number(-1.0) ] );
* // returns false
*
* @example
* var isFiniteArray = require( '@stdlib/assert/is-finite-array' ).objects;
*
* var bool = isFiniteArray( [ new Number(1.0), new Number(3.0) ] );
* // returns true
*
* bool = isFiniteArray( [ -1.0, 0.0, 3.0 ] );
* // returns false
*
* bool = isFiniteArray( [ 3.0, new Number(-1.0) ] );
* // returns false
*/

// MODULES //

var isFinite = require( '@stdlib/assert/is-finite' ); // eslint-disable-line no-redeclare
var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var arrayfun = require( '@stdlib/assert/tools/array-like-function' );


// MAIN //

var isFiniteArray = arrayfun( isFinite );
setReadOnly( isFiniteArray, 'primitives', arrayfun( isFinite.isPrimitive ) );
setReadOnly( isFiniteArray, 'objects', arrayfun( isFinite.isObject ) );


// EXPORTS //

module.exports = isFiniteArray;

},{"@stdlib/assert/is-finite":92,"@stdlib/assert/tools/array-like-function":316,"@stdlib/utils/define-read-only-property":356}],91:[function(require,module,exports){
/* eslint-disable no-redeclare */
'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is a finite number.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether a value is a finite number
*
* @example
* var bool = isFinite( 5.0 );
* // returns true
*
* @example
* var bool = isFinite( new Number( 5.0 ) );
* // returns true
*
* @example
* var bool = isFinite( 1.0/0.0 );
* // returns false
*
* @example
* var bool = isFinite( null );
* // returns false
*/
function isFinite( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
} // end FUNCTION isFinite()


// EXPORTS //

module.exports = isFinite;

},{"./object.js":93,"./primitive.js":94}],92:[function(require,module,exports){
/* eslint-disable no-redeclare */
'use strict';

/**
* Test if a value is a finite number.
*
* @module @stdlib/assert/is-finite
*
* @example
* var isFinite = require( '@stdlib/assert/is-finite' );
*
* var bool = isFinite( 5.0 );
* // returns true
*
* bool = isFinite( new Number( 5.0 ) );
* // returns true
*
* bool = isFinite( 1.0/0.0 );
* // returns false
*
* bool = isFinite( null );
* // returns false
*
* @example
* var isFinite = require( '@stdlib/assert/is-finite' ).isPrimitive;
*
* var bool = isFinite( -3.0 );
* // returns true
*
* bool = isFinite( new Number( -3.0 ) );
* // returns false
*
* @example
* var isFinite = require( '@stdlib/assert/is-finite' ).isObject;
*
* var bool = isFinite( 3.0 );
* // returns false
*
* bool = isFinite( new Number( 3.0 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isFinite = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isFinite, 'isPrimitive', isPrimitive );
setReadOnly( isFinite, 'isObject', isObject );


// EXPORTS //

module.exports = isFinite;

},{"./generic.js":91,"./object.js":93,"./primitive.js":94,"@stdlib/utils/define-read-only-property":356}],93:[function(require,module,exports){
/* eslint-disable no-redeclare */
'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isObject;
var isfinite = require( '@stdlib/math/base/assert/is-finite' );


// MAIN //

/**
* Tests if a value is a number object having a finite value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object having a finite value
*
* @example
* var bool = isFinite( 3.0 );
* // returns false
*
* @example
* var bool = isFinite( new Number( 3.0 ) );
* // returns true
*/
function isFinite( value ) {
	return (
		isNumber( value ) &&
		isfinite( value.valueOf() )
	);
} // end FUNCTION isFinite()


// EXPORTS //

module.exports = isFinite;

},{"@stdlib/assert/is-number":191,"@stdlib/math/base/assert/is-finite":317}],94:[function(require,module,exports){
/* eslint-disable no-redeclare */
'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;
var isfinite = require( '@stdlib/math/base/assert/is-finite' );


// MAIN //

/**
* Tests if a value is a number primitive having a finite value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number primitive having a finite value
*
* @example
* var bool = isFinite( -3.0 );
* // returns true
*
* @example
* var bool = isFinite( new Number( -3.0 ) );
* // returns false
*/
function isFinite( value ) {
	return (
		isNumber( value ) &&
		isfinite( value )
	);
} // end FUNCTION isFinite()


// EXPORTS //

module.exports = isFinite;

},{"@stdlib/assert/is-number":191,"@stdlib/math/base/assert/is-finite":317}],95:[function(require,module,exports){
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

},{"./is_float32array.js":96}],96:[function(require,module,exports){
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
} // end FUNCTION isFloat32Array()


// EXPORTS //

module.exports = isFloat32Array;

},{"@stdlib/utils/native-class":369}],97:[function(require,module,exports){
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

},{"./is_float64array.js":98}],98:[function(require,module,exports){
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
} // end FUNCTION isFloat64Array()


// EXPORTS //

module.exports = isFloat64Array;

},{"@stdlib/utils/native-class":369}],99:[function(require,module,exports){
'use strict';

/**
* Test if a value is an array-like object containing only functions.
*
* @module @stdlib/assert/is-function-array
*
* @example
* var isFunctionArray = require( '@stdlib/assert/is-function-array' );
*
* function beep(){}
* function boop(){}
*
* var bool = isFunctionArray( [ beep, boop ] );
* // returns true
*
* bool = isFunctionArray( [ {}, beep ] );
* // returns false
*
* bool = isFunctionArray( [] );
* // returns false
*/

// MODULES //

var arrayfun = require( '@stdlib/assert/tools/array-like-function' );
var isFunction = require( '@stdlib/assert/is-function' );


// MAIN //

var isFunctionArray = arrayfun( isFunction );


// EXPORTS //

module.exports = isFunctionArray;

},{"@stdlib/assert/is-function":100,"@stdlib/assert/tools/array-like-function":316}],100:[function(require,module,exports){
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

},{"./is_function.js":101}],101:[function(require,module,exports){
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

},{"@stdlib/utils/type-of":380}],102:[function(require,module,exports){
'use strict';

/**
* Test whether a string contains only hexadecimal digits.
*
* @module @stdlib/assert/is-hex-string
*
* @example
* var isHexString = require( '@stdlib/assert/is-hex-string' );
*
* var out = isHexString( '0123456789abcdefABCDEF' );
* // returns true
*
* out = isHexString( '0xffffff' );
* // returns false
*
* out = isHexString( '' );
* // returns false
*/

// MODULES //

var isHexString = require( './is_hex_string.js' );


// EXPORTS //

module.exports = isHexString;

},{"./is_hex_string.js":103}],103:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;


// VARIABLES //

// Character codes:
var ZERO = 48;
var NINE = 57;
var A = 65;
var F = 70;
var a = 97;
var f = 102;


// MAIN //

/**
* Tests whether a string contains only hexadecimal digits.
*
* @param {*} x - value to test
* @returns {boolean} boolean indicating if a string contains only hexadecimal digits
*
* @example
* var out = isHexString( '0123456789abcdefABCDEF' );
* // returns true
*
* @example
* var out = isHexString( '0xffffff' );
* // returns false
*
* @example
* var out = isHexString( '' );
* // returns false
*
* @example
* var out = isHexString( 123 );
* // returns false
*/
function isHexString( x ) {
	var len;
	var ch;
	var i;
	if ( !isString( x ) ) {
		return false;
	}
	len = x.length;
	if ( !len ) {
		return false;
	}
	for ( i = 0; i < len; i++ ) {
		ch = x.charCodeAt( i );
		if (
			ch < ZERO ||
			( ch > NINE && ch < A ) ||
			( ch > F && ch < a ) ||
			ch > f
		) {
			return false;
		}
	}
	return true;
} // end FUNCTION isHexString()


// EXPORTS //

module.exports = isHexString;

},{"@stdlib/assert/is-string":256}],104:[function(require,module,exports){
'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is an infinite number.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether a value is an infinite number
*
* @example
* var bool = isInfinite( 1.0/0.0 );
* // returns true
*
* @example
* var bool = isInfinite( new Number( 1.0/0.0 ) );
* // returns true
*
* @example
* var bool = isInfinite( 5.0 );
* // returns false
*
* @example
* var bool = isInfinite( null );
* // returns false
*/
function isInfinite( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
} // end FUNCTION isInfinite()


// EXPORTS //

module.exports = isInfinite;

},{"./object.js":106,"./primitive.js":107}],105:[function(require,module,exports){
'use strict';

/**
* Test if a value is an infinite number.
*
* @module @stdlib/assert/is-infinite
*
* @example
* var isInfinite = require( '@stdlib/assert/is-infinite' );
*
* var bool = isInfinite( 1.0/0.0 );
* // returns true
*
* bool = isInfinite( new Number( 1.0/0.0 ) );
* // returns true
*
* bool = isInfinite( 5.0 );
* // returns false
*
* bool = isInfinite( null );
* // returns false
*
* @example
* var isInfinite = require( '@stdlib/assert/is-infinite' ).isPrimitive;
*
* var bool = isInfinite( -1.0/0.0 );
* // returns true
*
* bool = isInfinite( new Number( -1.0/0.0 ) );
* // returns false
*
* @example
* var isInfinite = require( '@stdlib/assert/is-infinite' ).isObject;
*
* var bool = isInfinite( 1.0/0.0 );
* // returns false
*
* bool = isInfinite( new Number( 1.0/0.0 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isInfinite = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isInfinite, 'isPrimitive', isPrimitive );
setReadOnly( isInfinite, 'isObject', isObject );


// EXPORTS //

module.exports = isInfinite;

},{"./generic.js":104,"./object.js":106,"./primitive.js":107,"@stdlib/utils/define-read-only-property":356}],106:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isObject;
var isinf = require( '@stdlib/math/base/assert/is-infinite' );


// MAIN //

/**
* Tests if a value is a number object having an infinite value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object having an infinite value
*
* @example
* var bool = isInfinite( 1.0/0.0 );
* // returns false
*
* @example
* var bool = isInfinite( new Number( 1.0/0.0 ) );
* // returns true
*/
function isInfinite( value ) {
	return (
		isNumber( value ) &&
		isinf( value.valueOf() )
	);
} // end FUNCTION isInfinite()


// EXPORTS //

module.exports = isInfinite;

},{"@stdlib/assert/is-number":191,"@stdlib/math/base/assert/is-infinite":319}],107:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;
var isinf = require( '@stdlib/math/base/assert/is-infinite' );


// MAIN //

/**
* Tests if a value is a number primitive having an infinite value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number primitive having an infinite value
*
* @example
* var bool = isInfinite( -1.0/0.0 );
* // returns true
*
* @example
* var bool = isInfinite( new Number( -1.0/0.0 ) );
* // returns false
*/
function isInfinite( value ) {
	return (
		isNumber( value ) &&
		isinf( value )
	);
} // end FUNCTION isInfinite()


// EXPORTS //

module.exports = isInfinite;

},{"@stdlib/assert/is-number":191,"@stdlib/math/base/assert/is-infinite":319}],108:[function(require,module,exports){
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

},{"./is_int16array.js":109}],109:[function(require,module,exports){
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
} // end FUNCTION isInt16Array()


// EXPORTS //

module.exports = isInt16Array;

},{"@stdlib/utils/native-class":369}],110:[function(require,module,exports){
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

},{"./is_int32array.js":111}],111:[function(require,module,exports){
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
} // end FUNCTION isInt32Array()


// EXPORTS //

module.exports = isInt32Array;

},{"@stdlib/utils/native-class":369}],112:[function(require,module,exports){
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

},{"./is_int8array.js":113}],113:[function(require,module,exports){
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
} // end FUNCTION isInt8Array()


// EXPORTS //

module.exports = isInt8Array;

},{"@stdlib/utils/native-class":369}],114:[function(require,module,exports){
'use strict';

/**
* Test if a value is an array-like object containing only integers.
*
* @module @stdlib/assert/is-integer-array
*
* @example
* var isIntegerArray = require( '@stdlib/assert/is-integer-array' );
*
* var bool = isIntegerArray( [ -3.0, new Number(0.0), 2.0 ] );
* // returns true
*
* bool = isIntegerArray( [ -3.0, '3.0' ] );
* // returns false
*
* @example
* // Use interface to check for primitives...
* var isIntegerArray = require( '@stdlib/assert/is-integer-array' ).primitives;
*
* var bool = isIntegerArray( [ -1.0, 10.0 ] );
* // returns true
*
* bool = isIntegerArray( [ -1.0, 0.0, 5.0 ] );
* // returns true
*
* bool = isIntegerArray( [ -3.0, new Number(-1.0) ] );
* // returns false
*
* @example
* // Use interface to check for objects...
* var isIntegerArray = require( '@stdlib/assert/is-integer-array' ).objects;
*
* var bool = isIntegerArray( [ new Number(1.0), new Number(3.0) ] );
* // returns true
*
* bool = isIntegerArray( [ -1.0, 0.0, 3.0 ] );
* // returns false
*
* bool = isIntegerArray( [ 3.0, new Number(-1.0) ] );
* // returns false
*/

// MODULES //

var isInteger = require( '@stdlib/assert/is-integer' );
var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var arrayfun = require( '@stdlib/assert/tools/array-like-function' );


// MAIN //

var isIntegerArray = arrayfun( isInteger );
setReadOnly( isIntegerArray, 'primitives', arrayfun( isInteger.isPrimitive ) );
setReadOnly( isIntegerArray, 'objects', arrayfun( isInteger.isObject ) );


// EXPORTS //

module.exports = isIntegerArray;

},{"@stdlib/assert/is-integer":116,"@stdlib/assert/tools/array-like-function":316,"@stdlib/utils/define-read-only-property":356}],115:[function(require,module,exports){
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

},{"./object.js":118,"./primitive.js":119}],116:[function(require,module,exports){
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

},{"./generic.js":115,"./object.js":118,"./primitive.js":119,"@stdlib/utils/define-read-only-property":356}],117:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-integer":321,"@stdlib/math/constants/float64-ninf":335,"@stdlib/math/constants/float64-pinf":336}],118:[function(require,module,exports){
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

},{"./integer.js":117,"@stdlib/assert/is-number":191}],119:[function(require,module,exports){
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

},{"./integer.js":117,"@stdlib/assert/is-number":191}],120:[function(require,module,exports){
'use strict';

/**
* Test if a value is a parseable JSON string.
*
* @module @stdlib/assert/is-json
*
* @example
* var isJSON = require( '@stdlib/assert/is-json' );
*
* var v = isJSON( '{"a":5}' );
* // returns true
*
* v = isJSON( '{a":5}' );
* // returns false
*/

// MODULES //

var isJSON = require( './is_json.js' );


// EXPORTS //

module.exports = isJSON;

},{"./is_json.js":121}],121:[function(require,module,exports){
'use strict';

// VARIABLES //

/**
* Detects a JSON string.
*
* Regular expression: `/^\{[\s\S]*\}$|^\[[\s\S]*\]$/`
*
* * `^\{`
*   - match a `{` literal which is the first character
* * `[\s\S]*`
*   - match any whitespace and non-whitespace characters which occur `0` or more times
* * `\}$`
*   - match a `}` literal which is the last character
* * `|`
*   - alternatively
* * `^\[`
*   - match a `[` literal which is the first character
* * `[\s\S]*`
*   - match any whitespace and non-whitespace characters which occur `0` or more times
* * `\]$`
*   - match a `]` literal which is the last character
*
* Example matching strings:
*
* * `'{}'`
* * `'[]'`
* * `'{adjlkfaj3743.,><\n\t\rdf}'`
* * `'[adjlkfaj3743.,><\n\t\rdf]'`
* * `'{"a":5}'`
*
* @constant
* @type {RegExp}
* @default /^\{[\s\S]*\}$|^\[[\s\S]*\]$/
*/
var re = /^\{[\s\S]*\}$|^\[[\s\S]*\]$/; // eslint-disable-line no-useless-escape


// MAIN //

/**
* Tests if a value is a parseable JSON string.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a parseable JSON string
*
* @example
* var v = isJSON( '{"a":5}' );
* // returns true
*
* @example
* var v = isJSON( '{a":5}' );
* // returns false
*/
function isJSON( value ) {
	if ( typeof value !== 'string' ) {
		return false;
	}
	if ( !re.test( value ) ) {
		return false;
	}
	try {
		JSON.parse( value );
	} catch ( err ) { // eslint-disable-line no-unused-vars
		return false;
	}
	return true;
} // end FUNCTION isJSON()


// EXPORTS //

module.exports = isJSON;

},{}],122:[function(require,module,exports){
'use strict';

/**
* Test whether a value corresponds to a leap year in the Gregorian calendar.
*
* @module @stdlib/assert/is-leap-year
*
* @example
* var isLeapYear = require( '@stdlib/assert/is-leap-year' );
*
* var bool = isLeapYear();
* // returns <boolean>
*
* bool = isLeapYear( new Date() );
* // returns <boolean>
*
* bool = isLeapYear( 1996 );
* // returns true
*
* bool = isLeapYear( 2001 );
* // returns false
*/

// MODULES //

var isLeapYear = require( './is_leap_year.js' );


// EXPORTS //

module.exports = isLeapYear;

},{"./is_leap_year.js":123}],123:[function(require,module,exports){
'use strict';

// MODULES //

var isDateObject = require( '@stdlib/assert/is-date-object' );
var isInteger = require( '@stdlib/assert/is-integer' ).isPrimitive;


// MAIN //

/**
* Tests whether a value corresponds to a leap year in the Gregorian calendar.
*
* #### Notes
*
* * According to the Gregorian calendar, every year that is exactly divisible by `4` is a leap year, except those years which are also divisible by `100` and not by `400` (e.g., `1900`).
*
* @param {*} [value] - input value
* @returns {boolean} boolean whether a value corresponds to a leap year
*
* @example
* var bool = isLeapYear();
* // returns <boolean>
*
* @example
* var bool = isLeapYear( new Date() );
* // returns <boolean>
*
* @example
* var bool = isLeapYear( 1996 );
* // returns true
*
* @example
* var bool = isLeapYear( 2001 );
* // returns false
*/
function isLeapYear( value ) {
	var yr;
	if ( arguments.length ) {
		if ( isDateObject( value ) ) {
			yr = value.getFullYear();
		} else if ( isInteger( value ) ) {
			yr = value;
		} else {
			return false;
		}
	} else {
		// Note: cannot cache, as possible for application to cross into a new year:
		yr = ( new Date() ).getFullYear();
	}
	// Special case if year is a new century...
	if ( (yr % 100) === 0 ) {
		// Centuries are only leap years at the end of "leap cycles" which happen every `400` years:
		return ( (yr % 400) === 0 );
	}
	// All other years which are exactly divisible by `4` are leap years:
	return ( (yr % 4) === 0 );
} // end FUNCTION isLeapYear()


// EXPORTS //

module.exports = isLeapYear;

},{"@stdlib/assert/is-date-object":57,"@stdlib/assert/is-integer":116}],124:[function(require,module,exports){
'use strict';

var ctors = {
	'uint16': Uint16Array,
	'uint8': Uint8Array
};


// EXPORTS //

module.exports = ctors;

},{}],125:[function(require,module,exports){
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

},{"./is_little_endian.js":126}],126:[function(require,module,exports){
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

},{"./ctors.js":124}],127:[function(require,module,exports){
'use strict';

/**
* Test if a value is a lowercase string.
*
* @module @stdlib/assert/is-lowercase
*
* @example
* var isLowercase = require( '@stdlib/assert/is-lowercase' );
*
* var bool = isLowercase( 'hello' );
* // returns true
*
* bool = isLowercase( 'World' );
* // returns false
*/

// MODULES //

var isLowercase = require( './is_lowercase.js' );


// EXPORTS //

module.exports = isLowercase;

},{"./is_lowercase.js":128}],128:[function(require,module,exports){
'use strict';

// MODULES //

var lowercase = require( '@stdlib/string/lowercase' );
var uppercase = require( '@stdlib/string/uppercase' );
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;


// MAIN //

/**
* Tests if a value is a lowercase string.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a lowercase string
*
* @example
* var bool = isLowercase( 'salt and light' );
* // returns true
*
* @example
* var bool = isLowercase( 'HELLO' );
* // returns false
*
* @example
* var bool = isLowercase( 'World' );
* // returns false
*
* @example
* var bool = isLowercase( '!' );
* // returns false
*/
function isLowercase( value ) {
	return (
		isString( value ) &&
		value === lowercase( value ) &&
		value !== uppercase( value )
	);
} // end FUNCTION isLowercase()


// EXPORTS //

module.exports = isLowercase;

},{"@stdlib/assert/is-string":256,"@stdlib/string/lowercase":345,"@stdlib/string/uppercase":349}],129:[function(require,module,exports){
'use strict';

/**
* Tests if a value is matrix-like.
*
* @module @stdlib/assert/is-matrix-like
*
* @example
* var isMatrixLike = require( '@stdlib/assert/is-matrix-like' );
*
* var mat = {
* 	'data': new Int8Array( 10 ),
* 	'shape': [5,2],
* 	'offset': 0,
* 	'strides': [2,1],
* 	'dtype': 'int8',
* 	'length': 10
* };
*
* var bool = isMatrixLike( mat );
* // returns true
*/

// MODULES //

var isMatrixLike = require( './is_matrix_like.js' );


// EXPORTS //

module.exports = isMatrixLike;

},{"./is_matrix_like.js":130}],130:[function(require,module,exports){
'use strict';

/**
* Tests if a value is matrix-like.
*
* @param {*} v - value to test
* @returns {boolean} boolean indicating if a value is matrix-like
*
* @example
* var mat = {
* 	'data': new Int8Array( 10 ),
* 	'shape': [5,2],
* 	'offset': 0,
* 	'strides': [2,1],
* 	'dtype': 'int8',
* 	'length': 10
* };
*
* var bool = isMatrixLike( mat );
* // returns true
*/
function isMatrixLike( v ) {
	return (
		v !== null &&
		typeof v === 'object' &&
		typeof v.data === 'object' &&
		typeof v.shape === 'object' &&
		typeof v.offset === 'number' &&
		typeof v.strides === 'object' &&
		typeof v.dtype === 'string' &&
		typeof v.length === 'number'
	);
} // end FUNCTION isMatrixLike()


// EXPORTS //

module.exports = isMatrixLike;

},{}],131:[function(require,module,exports){
'use strict';

/**
* Tests if a value is a matrix.
*
* @module @stdlib/assert/is-matrix
*
* @example
* var isMatrix = require( '@stdlib/assert/is-matrix' );
* var matrix = require( 'dstructs-matrix' );
*
* var mat = matrix( [10,10] );
*
* var bool = isMatrix( mat );
* // returns true
*/

// MODULES //

var isMatrix = require( './is_matrix.js' );


// EXPORTS //

module.exports = isMatrix;

},{"./is_matrix.js":132}],132:[function(require,module,exports){
'use strict';

// MODULES //

var typeOf = require( '@stdlib/utils/type-of' );


// MAIN //

/**
* Tests if a value is a matrix.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a matrix
*
* @example
* var matrix = require( 'dstructs-matrix' );
*
* var mat = matrix( [10,10] );
*
* var bool = isMatrix( mat );
* // returns true
*/
function isMatrix( value ) {
	return ( typeOf( value ) === 'Matrix' );
} // end FUNCTION isMatrix()


// EXPORTS //

module.exports = isMatrix;

},{"@stdlib/utils/type-of":380}],133:[function(require,module,exports){
'use strict';

/**
* Test if a value is an array-like object containing only `NaN` values.
*
* @module @stdlib/assert/is-nan-array
*
* @example
* var isNaNArray = require( '@stdlib/assert/is-nan-array' );
*
* var bool = isNaNArray( [NaN,NaN,NaN] );
* // returns true
*
* bool = isNaNArray( [NaN,2] );
* // returns false
*
* bool = isNaNArray.primitives( [NaN,new Number( NaN )] );
* // returns false
*
* bool = isNaNArray.primitives( [NaN,NaN,NaN] );
* // returns true
*
* bool = isNaNArray.objects( [new Number( NaN ),new Number( NaN )] );
* // returns true
*
* bool = isNaNArray.objects( [NaN,new Number( NaN ),new Number( NaN )] );
* // returns false
*
* bool = isNaNArray.objects( [NaN,NaN,NaN] );
* // returns false
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var arrayfun = require( '@stdlib/assert/tools/array-like-function' );
var isnan = require( '@stdlib/assert/is-nan' );


// MAIN //

var isNaNArray = arrayfun( isnan );
setReadOnly( isNaNArray, 'primitives', arrayfun( isnan.isPrimitive ) );
setReadOnly( isNaNArray, 'objects', arrayfun( isnan.isObject ) );


// EXPORTS //

module.exports = isNaNArray;

},{"@stdlib/assert/is-nan":135,"@stdlib/assert/tools/array-like-function":316,"@stdlib/utils/define-read-only-property":356}],134:[function(require,module,exports){
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
} // end FUNCTION isnan()


// EXPORTS //

module.exports = isnan;

},{"./object.js":136,"./primitive.js":137}],135:[function(require,module,exports){
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

},{"./generic.js":134,"./object.js":136,"./primitive.js":137,"@stdlib/utils/define-read-only-property":356}],136:[function(require,module,exports){
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
} // end FUNCTION isnan()


// EXPORTS //

module.exports = isnan;

},{"@stdlib/assert/is-number":191,"@stdlib/math/base/assert/is-nan":323}],137:[function(require,module,exports){
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
} // end FUNCTION isnan()


// EXPORTS //

module.exports = isnan;

},{"@stdlib/assert/is-number":191,"@stdlib/math/base/assert/is-nan":323}],138:[function(require,module,exports){
'use strict';

/**
* Test if a value is a native function.
*
* @module @stdlib/assert/is-native-function
*
* @example
* var isNativeFunction = require( '@stdlib/assert/is-native-function' );
*
* function beep() {
*     console.log( 'boop' );
* }
*
* var bool = isNativeFunction( beep );
* // returns false
*
* bool = isNativeFunction( Date );
* // returns true
*/

// MODULES //

var isNativeFunction = require( './is_native_function.js' );


// EXPORTS //

module.exports = isNativeFunction;

},{"./is_native_function.js":139}],139:[function(require,module,exports){
'use strict';

// MODULES //

var isFunction = require( '@stdlib/assert/is-function' );
var RE_NATIVE_FUNCTION = require( '@stdlib/regexp/native-function' );


// FUNCTIONS //

// Using `Function#toString` bypasses a value's own `toString` method to provide an extra, but not security proof, precaution to prevent a provided function from impersonating a native function:
var fcn2str = Function.prototype.toString;


// MAIN //

/**
* Tests if a value is a native function.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a native function
*
* @example
* function beep() {
*     console.log( 'boop' );
* }
*
* var bool = isNativeFunction( beep );
* // returns false
*
* bool = isNativeFunction( Date );
* // returns true
*/
function isNativeFunction( value ) {
	return (
		isFunction( value ) &&
		RE_NATIVE_FUNCTION.test( fcn2str.call( value ) )
	);
} // end FUNCTION isNativeFunction()


// EXPORTS //

module.exports = isNativeFunction;

},{"@stdlib/assert/is-function":100,"@stdlib/regexp/native-function":340}],140:[function(require,module,exports){
'use strict';

/**
* Test if a value is an array-like object containing only negative integers.
*
* @module @stdlib/assert/is-negative-integer-array
*
* @example
* var isNegativeIntegerArray = require( '@stdlib/assert/is-negative-integer-array' );
*
* var bool = isNegativeIntegerArray( [ -3.0, new Number(-3.0) ] );
* // returns true
*
* bool = isNegativeIntegerArray( [ -3.0, '-3.0' ] );
* // returns false
*
* @example
* // Use interface to check for primitives...
* var isNegativeIntegerArray = require( '@stdlib/assert/is-negative-integer-array' ).primitives;
*
* var bool = isNegativeIntegerArray( [ -1.0, -10.0 ] );
* // returns true
*
* bool = isNegativeIntegerArray( [ -1.0, 0.0, -10.0 ] );
* // returns false
*
* bool = isNegativeIntegerArray( [ -3.0, new Number(-1.0) ] );
* // returns false
*
* @example
* // Use interface to check for objects...
* var isNegativeIntegerArray = require( '@stdlib/assert/is-negative-integer-array' ).objects;
*
* var bool = isNegativeIntegerArray( [ new Number(-1.0), new Number(-10.0) ] );
* // returns true
*
* bool = isNegativeIntegerArray( [ -1.0, 0.0, -10.0 ] );
* // returns false
*
* bool = isNegativeIntegerArray( [ -3.0, new Number(-1.0) ] );
* // returns false
*/

// MODULES //

var isNegativeInteger = require( '@stdlib/assert/is-negative-integer' );
var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var arrayfun = require( '@stdlib/assert/tools/array-like-function' );


// MAIN //

var isNegativeIntegerArray = arrayfun( isNegativeInteger );
setReadOnly( isNegativeIntegerArray, 'primitives', arrayfun( isNegativeInteger.isPrimitive ) );
setReadOnly( isNegativeIntegerArray, 'objects', arrayfun( isNegativeInteger.isObject ) );


// EXPORTS //

module.exports = isNegativeIntegerArray;

},{"@stdlib/assert/is-negative-integer":142,"@stdlib/assert/tools/array-like-function":316,"@stdlib/utils/define-read-only-property":356}],141:[function(require,module,exports){
'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is a negative integer.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a negative integer
*
* @example
* var bool = isNegativeInteger( -5.0 );
* // returns true
*
* @example
* var bool = isNegativeInteger( new Number( -5.0 ) );
* // returns true
*
* @example
* var bool = isNegativeInteger( 5.0 );
* // returns false
*
* @example
* var bool = isNegativeInteger( -3.14 );
* // returns false
*
* @example
* var bool = isNegativeInteger( null );
* // returns false
*/
function isNegativeInteger( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
} // end FUNCTION isNegativeInteger()


// EXPORTS //

module.exports = isNegativeInteger;

},{"./object.js":143,"./primitive.js":144}],142:[function(require,module,exports){
'use strict';

/**
* Test if a value is a negative integer.
*
* @module @stdlib/assert/is-negative-integer
*
* @example
* var isNegativeInteger = require( '@stdlib/assert/is-negative-integer' );
*
* var bool = isNegativeInteger( -5.0 );
* // returns true
*
* bool = isNegativeInteger( new Number( -5.0 ) );
* // returns true
*
* bool = isNegativeInteger( 5.0 );
* // returns false
*
* bool = isNegativeInteger( -3.14 );
* // returns false
*
* bool = isNegativeInteger( null );
* // returns false
*
* @example
* // Use interface to check for negative integer primitives...
* var isNegativeInteger = require( '@stdlib/assert/is-negative-integer' ).isPrimitive;
*
* var bool = isNegativeInteger( -3.0 );
* // returns true
*
* bool = isNegativeInteger( new Number( -3.0 ) );
* // returns false
*
* @example
* // Use interface to check for negative integer objects...
* var isNegativeInteger = require( '@stdlib/assert/is-negative-integer' ).isObject;
*
* var bool = isNegativeInteger( -3.0 );
* // returns false
*
* bool = isNegativeInteger( new Number( -3.0 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isNegativeInteger = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isNegativeInteger, 'isPrimitive', isPrimitive );
setReadOnly( isNegativeInteger, 'isObject', isObject );


// EXPORTS //

module.exports = isNegativeInteger;

},{"./generic.js":141,"./object.js":143,"./primitive.js":144,"@stdlib/utils/define-read-only-property":356}],143:[function(require,module,exports){
'use strict';

// MODULES //

var isInteger = require( '@stdlib/assert/is-integer' ).isObject;


// MAIN //

/**
* Tests if a value is a number object having a negative integer value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object having a negative integer value
*
* @example
* var bool = isNegativeInteger( -3.0 );
* // returns false
*
* @example
* var bool = isNegativeInteger( new Number( -3.0 ) );
* // returns true
*/
function isNegativeInteger( value ) {
	return (
		isInteger( value ) &&
		value.valueOf() < 0.0
	);
} // end FUNCTION isNegativeInteger()


// EXPORTS //

module.exports = isNegativeInteger;

},{"@stdlib/assert/is-integer":116}],144:[function(require,module,exports){
'use strict';

// MODULES //

var isInteger = require( '@stdlib/assert/is-integer' ).isPrimitive;


// MAIN //

/**
* Tests if a value is a number primitive having a negative integer value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number primitive having a negative integer value
*
* @example
* var bool = isNegativeInteger( -3.0 );
* // returns true
*
* @example
* var bool = isNegativeInteger( new Number( -3.0 ) );
* // returns false
*/
function isNegativeInteger( value ) {
	return (
		isInteger( value ) &&
		value < 0.0
	);
} // end FUNCTION isNegativeInteger()


// EXPORTS //

module.exports = isNegativeInteger;

},{"@stdlib/assert/is-integer":116}],145:[function(require,module,exports){
'use strict';

/**
* Test if a value is an array-like object containing only negative numbers.
*
* @module @stdlib/assert/is-negative-number-array
*
* @example
* var isNegativeNumberArray = require( '@stdlib/assert/is-negative-number-array' );
*
* var bool = isNegativeNumberArray( [ -3.0, new Number(-3.0) ] );
* // returns true
*
* bool = isNegativeNumberArray( [ -3.0, '-3.0' ] );
* // returns false
*
* @example
* // Use interface to check for primitives...
* var isNegativeNumberArray = require( '@stdlib/assert/is-negative-number-array' ).primitives;
*
* var bool = isNegativeNumberArray( [ -1.0, -5.0, -10.0 ] );
* // returns true
*
* bool = isNegativeNumberArray( [ -3.0, new Number(-1.0) ] );
* // returns false
*
* @example
* // Use interface to check for objects...
* var isNegativeNumberArray = require( '@stdlib/assert/is-negative-number-array' ).objects;
*
* var bool = isNegativeNumberArray( [ new Number(-3.0), new Number(-1.0) ] );
* // returns true
*
* bool = isNegativeNumberArray( [ -1.0, -5.0, -10.0 ] );
* // returns false
*/

// MODULES //

var isNegativeNumber = require( '@stdlib/assert/is-negative-number' );
var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var arrayfun = require( '@stdlib/assert/tools/array-like-function' );


// MAIN //

var isNegativeNumberArray = arrayfun( isNegativeNumber );
setReadOnly( isNegativeNumberArray, 'primitives', arrayfun( isNegativeNumber.isPrimitive ) );
setReadOnly( isNegativeNumberArray, 'objects', arrayfun( isNegativeNumber.isObject ) );


// EXPORTS //

module.exports = isNegativeNumberArray;

},{"@stdlib/assert/is-negative-number":147,"@stdlib/assert/tools/array-like-function":316,"@stdlib/utils/define-read-only-property":356}],146:[function(require,module,exports){
'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is a negative number.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a negative number
*
* @example
* var bool = isNegativeNumber( -5.0 );
* // returns true
*
* @example
* var bool = isNegativeNumber( new Number( -5.0 ) );
* // returns true
*
* @example
* var bool = isNegativeNumber( -3.14 );
* // returns true
*
* @example
* var bool = isNegativeNumber( 5.0 );
* // returns false
*
* @example
* var bool = isNegativeNumber( null );
* // returns false
*/
function isNegativeNumber( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
} // end FUNCTION isNegativeNumber()


// EXPORTS //

module.exports = isNegativeNumber;

},{"./object.js":148,"./primitive.js":149}],147:[function(require,module,exports){
'use strict';

/**
* Test if a value is a negative number.
*
* @module @stdlib/assert/is-negative-number
*
* @example
* var isNegativeNumber = require( '@stdlib/assert/is-negative-number' );
*
* var bool = isNegativeNumber( -5.0 );
* // returns true
*
* bool = isNegativeNumber( new Number( -5.0 ) );
* // returns true
*
* bool = isNegativeNumber( -3.14 );
* // returns true
*
* bool = isNegativeNumber( 5.0 );
* // returns false
*
* bool = isNegativeNumber( null );
* // returns false
*
* @example
* // Use interface to check for negative number primitives...
* var isNegativeNumber = require( '@stdlib/assert/is-negative-number' ).isPrimitive;
*
* var bool = isNegativeNumber( -3.0 );
* // returns true
*
* bool = isNegativeNumber( new Number( -3.0 ) );
* // returns false
*
* @example
* // Use interface to check for negative number objects...
* var isNegativeNumber = require( '@stdlib/assert/is-negative-number' ).isObject;
*
* var bool = isNegativeNumber( -3.0 );
* // returns false
*
* bool = isNegativeNumber( new Number( -3.0 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isNegativeNumber = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isNegativeNumber, 'isPrimitive', isPrimitive );
setReadOnly( isNegativeNumber, 'isObject', isObject );


// EXPORTS //

module.exports = isNegativeNumber;

},{"./generic.js":146,"./object.js":148,"./primitive.js":149,"@stdlib/utils/define-read-only-property":356}],148:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isObject;


// MAIN //

/**
* Tests if a value is a number object having a negative value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object having a negative value
*
* @example
* var bool = isNegativeNumber( -3.0 );
* // returns false
*
* @example
* var bool = isNegativeNumber( new Number( -3.0 ) );
* // returns true
*/
function isNegativeNumber( value ) {
	return (
		isNumber( value ) &&
		value.valueOf() < 0.0
	);
} // end FUNCTION isNegativeNumber()


// EXPORTS //

module.exports = isNegativeNumber;

},{"@stdlib/assert/is-number":191}],149:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;


// MAIN //

/**
* Tests if a value is a number primitive having a negative value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number primitive having a negative value
*
* @example
* var bool = isNegativeNumber( -3.0 );
* // returns true
*
* @example
* var bool = isNegativeNumber( new Number( -3.0 ) );
* // returns false
*/
function isNegativeNumber( value ) {
	return (
		isNumber( value ) &&
		value < 0.0
	);
} // end FUNCTION isNegativeNumber()


// EXPORTS //

module.exports = isNegativeNumber;

},{"@stdlib/assert/is-number":191}],150:[function(require,module,exports){
'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is equal to negative zero.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is equal to negative zero
*
* @example
* var bool = isNegativeZero( -0.0 );
* // returns true
*
* @example
* var bool = isNegativeZero( new Number( -0.0 ) );
* // returns true
*
* @example
* var bool = isNegativeZero( -3.14 );
* // returns false
*
* @example
* var bool = isNegativeZero( 5.0 );
* // returns false
*
* @example
* var bool = isNegativeZero( 0.0 );
* // returns false
*
* @example
* var bool = isNegativeZero( null );
* // returns false
*/
function isNegativeZero( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
} // end FUNCTION isNegativeZero()


// EXPORTS //

module.exports = isNegativeZero;

},{"./object.js":152,"./primitive.js":153}],151:[function(require,module,exports){
'use strict';

/**
* Test if a value is equal to negative zero.
*
* @module @stdlib/assert/is-negative-zero
*
* @example
* var isNegativeZero = require( '@stdlib/assert/is-negative-zero' );
*
* var bool = isNegativeZero( -0.0 );
* // returns true
*
* bool = isNegativeZero( new Number( -0.0 ) );
* // returns true
*
* bool = isNegativeZero( -3.14 );
* // returns false
*
* bool = isNegativeZero( 5.0 );
* // returns false
*
* bool = isNegativeZero( 0.0 );
* // returns false
*
* bool = isNegativeZero( null );
* // returns false
*
* @example
* var isNegativeZero = require( '@stdlib/assert/is-negative-zero' ).isPrimitive;
*
* var bool = isNegativeZero( -0.0 );
* // returns true
*
* bool = isNegativeZero( new Number( -0.0 ) );
* // returns false
*
* @example
* var isNegativeZero = require( '@stdlib/assert/is-negative-zero' ).isObject;
*
* var bool = isNegativeZero( -0.0 );
* // returns false
*
* bool = isNegativeZero( new Number( -0.0 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isNegativeZero = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isNegativeZero, 'isPrimitive', isPrimitive );
setReadOnly( isNegativeZero, 'isObject', isObject );


// EXPORTS //

module.exports = isNegativeZero;

},{"./generic.js":150,"./object.js":152,"./primitive.js":153,"@stdlib/utils/define-read-only-property":356}],152:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isObject;
var NINF = require( '@stdlib/math/constants/float64-ninf' );


// MAIN //

/**
* Tests if a value is a number object having a value equal to negative zero.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object having a value equal to negative zero
*
* @example
* var bool = isNegativeZero( -0.0 );
* // returns false
*
* @example
* var bool = isNegativeZero( new Number( -0.0 ) );
* // returns true
*/
function isNegativeZero( value ) {
	return (
		isNumber( value ) &&
		( 1.0 / value.valueOf() ) === NINF
	);
} // end FUNCTION isNegativeZero()


// EXPORTS //

module.exports = isNegativeZero;

},{"@stdlib/assert/is-number":191,"@stdlib/math/constants/float64-ninf":335}],153:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;
var NINF = require( '@stdlib/math/constants/float64-ninf' );


// MAIN //

/**
* Tests if a value is a number primitive equal to negative zero.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number primitive equal to negative zero
*
* @example
* var bool = isNegativeZero( -0.0 );
* // returns true
*
* @example
* var bool = isNegativeZero( new Number( -0.0 ) );
* // returns false
*/
function isNegativeZero( value ) {
	return (
		isNumber( value ) &&
		( 1.0 / value ) === NINF
	);
} // end FUNCTION isNegativeZero()


// EXPORTS //

module.exports = isNegativeZero;

},{"@stdlib/assert/is-number":191,"@stdlib/math/constants/float64-ninf":335}],154:[function(require,module,exports){
'use strict';

/**
* Test if a value is Node duplex stream-like.
*
* @module @stdlib/assert/is-node-duplex-stream-like
*
* @example
* var transformStream = require( '@stdlib/streams/utils/transform' );
* var isNodeDuplexStreamLike = require( '@stdlib/assert/is-node-duplex-stream-like' );
*
* var stream = transformStream();
*
* var bool = isNodeDuplexStreamLike( stream );
* // returns true
*
* bool = isNodeDuplexStreamLike( {} );
* // returns false
*/

// MODULES //

var isNodeDuplexStreamLike = require( './is_duplex_stream_like.js' );


// EXPORTS //

module.exports = isNodeDuplexStreamLike;

},{"./is_duplex_stream_like.js":155}],155:[function(require,module,exports){
'use strict';

// MODULES //

var isNodeWritableStreamLike = require( '@stdlib/assert/is-node-writable-stream-like' );
var isNodeReadableStreamLike = require( '@stdlib/assert/is-node-readable-stream-like' );


// MAIN //

/**
* Tests if a value is Node duplex stream-like.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is Node duplex stream-like
*
* @example
* var transformStream = require( '@stdlib/streams/utils/transform' );
*
* var stream = transformStream();
*
* var bool = isNodeDuplexStreamLike( stream );
* // returns true
*
* bool = isNodeDuplexStreamLike( {} );
* // returns false
*/
function isNodeDuplexStreamLike( value ) {
	return (
		// Must be both readable and writable:
		isNodeWritableStreamLike( value ) &&
		isNodeReadableStreamLike( value )
	);
} // end FUNCTION isNodeDuplexStreamLike()


// EXPORTS //

module.exports = isNodeDuplexStreamLike;

},{"@stdlib/assert/is-node-readable-stream-like":156,"@stdlib/assert/is-node-writable-stream-like":163}],156:[function(require,module,exports){
'use strict';

/**
* Test if a value is Node readable stream-like.
*
* @module @stdlib/assert/is-node-readable-stream-like
*
* @example
* var transformStream = require( '@stdlib/streams/utils/transform' );
* var isNodeReadableStreamLike = require( '@stdlib/assert/is-node-readable-stream-like' );
*
* var stream = transformStream();
*
* var bool = isNodeReadableStreamLike( stream );
* // returns true
*
* bool = isNodeReadableStreamLike( {} );
* // returns false
*/

// MODULES //

var isNodeReadableStreamLike = require( './is_readable_stream_like.js' );


// EXPORTS //

module.exports = isNodeReadableStreamLike;

},{"./is_readable_stream_like.js":157}],157:[function(require,module,exports){
/* eslint-disable no-underscore-dangle */
'use strict';

// MODULES //

var isNodeStreamLike = require( '@stdlib/assert/is-node-stream-like' );


// MAIN //

/**
* Tests if a value is Node readable stream-like.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is Node readable stream-like
*
* @example
* var transformStream = require( '@stdlib/streams/utils/transform' );
*
* var stream = transformStream();
*
* var bool = isNodeReadableStreamLike( stream );
* // returns true
*
* bool = isNodeReadableStreamLike( {} );
* // returns false
*/
function isNodeReadableStreamLike( value ) {
	return (
		// Must be stream-like:
		isNodeStreamLike( value ) &&

		// Should have readable stream methods:
		typeof value._read === 'function' &&

		// Should have readable stream state:
		typeof value._readableState === 'object'
	);
} // end FUNCTION isNodeReadableStreamLike()


// EXPORTS //

module.exports = isNodeReadableStreamLike;

},{"@stdlib/assert/is-node-stream-like":159}],158:[function(require,module,exports){
'use strict';

// MODULES //

var constantFcn = require( '@stdlib/utils/constant-function' );


// EXPORTS //

module.exports = constantFcn( false );

},{"@stdlib/utils/constant-function":352}],159:[function(require,module,exports){
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

},{"./is_stream_like.js":160}],160:[function(require,module,exports){
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
} // end FUNCTION isNodeStreamLike()


// EXPORTS //

module.exports = isNodeStreamLike;

},{}],161:[function(require,module,exports){
'use strict';

/**
* Test if a value is Node transform stream-like.
*
* @module @stdlib/assert/is-node-transform-stream-like
*
* @example
* var transformStream = require( '@stdlib/streams/utils/transform' );
* var isNodeTransformStreamLike = require( '@stdlib/assert/is-node-transform-stream-like' );
*
* var stream = transformStream();
*
* var bool = isNodeTransformStreamLike( stream );
* // returns true
*
* bool = isNodeTransformStreamLike( {} );
* // returns false
*/

// MODULES //

var isNodeTransformStreamLike = require( './is_transform_stream_like.js' );


// EXPORTS //

module.exports = isNodeTransformStreamLike;

},{"./is_transform_stream_like.js":162}],162:[function(require,module,exports){
/* eslint-disable no-underscore-dangle */
'use strict';

// MODULES //

var isNodeDuplexStreamLike = require( '@stdlib/assert/is-node-duplex-stream-like' );


// MAIN //

/**
* Tests if a value is Node transform stream-like.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is Node transform stream-like
*
* @example
* var transformStream = require( '@stdlib/streams/utils/transform' );
*
* var stream = transformStream();
*
* var bool = isNodeTransformStreamLike( stream );
* // returns true
*
* bool = isNodeTransformStreamLike( {} );
* // returns false
*/
function isNodeTransformStreamLike( value ) {
	return (
		// Must be duplex stream-like:
		isNodeDuplexStreamLike( value ) &&

		// Should have transform stream methods:
		typeof value._transform === 'function' &&

		// Should have transform stream state:
		typeof value._transformState === 'object'
	);
} // end FUNCTION isNodeTransformStreamLike()


// EXPORTS //

module.exports = isNodeTransformStreamLike;

},{"@stdlib/assert/is-node-duplex-stream-like":154}],163:[function(require,module,exports){
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

},{"./is_writable_stream_like.js":164}],164:[function(require,module,exports){
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
} // end FUNCTION isNodeWritableStreamLike()


// EXPORTS //

module.exports = isNodeWritableStreamLike;

},{"@stdlib/assert/is-node-stream-like":159}],165:[function(require,module,exports){
arguments[4][62][0].apply(exports,arguments)
},{"dup":62}],166:[function(require,module,exports){
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

},{"@stdlib/assert/is-nonnegative-integer":168,"@stdlib/assert/tools/array-like-function":316,"@stdlib/utils/define-read-only-property":356}],167:[function(require,module,exports){
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
} // end FUNCTION isNonNegativeInteger()


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"./object.js":169,"./primitive.js":170}],168:[function(require,module,exports){
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

},{"./generic.js":167,"./object.js":169,"./primitive.js":170,"@stdlib/utils/define-read-only-property":356}],169:[function(require,module,exports){
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
} // end FUNCTION isNonNegativeInteger()


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"@stdlib/assert/is-integer":116}],170:[function(require,module,exports){
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
} // end FUNCTION isNonNegativeInteger()


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"@stdlib/assert/is-integer":116}],171:[function(require,module,exports){
'use strict';

/**
* Test if a value is an array-like object containing only nonnegative numbers.
*
* @module @stdlib/assert/is-nonnegative-number-array
*
* @example
* var isNonNegativeNumberArray = require( '@stdlib/assert/is-nonnegative-number-array' );
*
* var bool = isNonNegativeNumberArray( [ 3.0, new Number(3.0) ] );
* // returns true
*
* bool = isNonNegativeNumberArray( [ 3.0, '3.0' ] );
* // returns false
*
* @example
* // Use interface to check for primitives...
* var isNonNegativeNumberArray = require( '@stdlib/assert/is-nonnegative-number-array' ).primitives;
*
* var bool = isNonNegativeNumberArray( [ 1.0, 0.0, 10.0 ] );
* // returns true
*
* bool = isNonNegativeNumberArray( [ 3.0, new Number(1.0) ] );
* // returns false
*
* @example
* // Use interface to check for objects...
* var isNonNegativeNumberArray = require( '@stdlib/assert/is-nonnegative-number-array' ).objects;
*
* var bool = isNonNegativeNumberArray( [ new Number(3.0), new Number(1.0) ] );
* // returns true
*
* bool = isNonNegativeNumberArray( [ 1.0, 0.0, 10.0 ] );
* // returns false
*/

// MODULES //

var isNonNegativeNumber = require( '@stdlib/assert/is-nonnegative-number' );
var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var arrayfun = require( '@stdlib/assert/tools/array-like-function' );


// MAIN //

var isNonNegativeNumberArray = arrayfun( isNonNegativeNumber );
setReadOnly( isNonNegativeNumberArray, 'primitives', arrayfun( isNonNegativeNumber.isPrimitive ) );
setReadOnly( isNonNegativeNumberArray, 'objects', arrayfun( isNonNegativeNumber.isObject ) );


// EXPORTS //

module.exports = isNonNegativeNumberArray;

},{"@stdlib/assert/is-nonnegative-number":173,"@stdlib/assert/tools/array-like-function":316,"@stdlib/utils/define-read-only-property":356}],172:[function(require,module,exports){
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
} // end FUNCTION isNonNegativeNumber()


// EXPORTS //

module.exports = isNonNegativeNumber;

},{"./object.js":174,"./primitive.js":175}],173:[function(require,module,exports){
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

},{"./generic.js":172,"./object.js":174,"./primitive.js":175,"@stdlib/utils/define-read-only-property":356}],174:[function(require,module,exports){
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
} // end FUNCTION isNonNegativeNumber()


// EXPORTS //

module.exports = isNonNegativeNumber;

},{"@stdlib/assert/is-number":191}],175:[function(require,module,exports){
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
} // end FUNCTION isNonNegativeNumber()


// EXPORTS //

module.exports = isNonNegativeNumber;

},{"@stdlib/assert/is-number":191}],176:[function(require,module,exports){
'use strict';

/**
* Test if a value is an array-like object containing only nonpositive integers.
*
* @module @stdlib/assert/is-nonpositive-integer-array
*
* @example
* var isNonPositiveIntegerArray = require( '@stdlib/assert/is-nonpositive-integer-array' );
*
* var bool = isNonPositiveIntegerArray( [ -3.0, new Number(-3.0) ] );
* // returns true
*
* bool = isNonPositiveIntegerArray( [ -3.0, '-3.0' ] );
* // returns false
*
* @example
* // Use interface to check for primitives...
* var isNonPositiveIntegerArray = require( '@stdlib/assert/is-nonpositive-integer-array' ).primitives;
*
* var bool = isNonPositiveIntegerArray( [ -1.0, 0.0, -10.0 ] );
* // returns true
*
* bool = isNonPositiveIntegerArray( [ -3.0, new Number(-1.0) ] );
* // returns false
*
* @example
* // Use interface to check for objects...
* var isNonPositiveIntegerArray = require( '@stdlib/assert/is-nonpositive-integer-array' ).objects;
*
* var bool = isNonPositiveIntegerArray( [ new Number(-3.0), new Number(-1.0) ] );
* // returns true
*
* bool = isNonPositiveIntegerArray( [ -1.0, 0.0, -10.0 ] );
* // returns false
*/

// MODULES //

var isNonPositiveInteger = require( '@stdlib/assert/is-nonpositive-integer' );
var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var arrayfun = require( '@stdlib/assert/tools/array-like-function' );


// MAIN //

var isNonPositiveIntegerArray = arrayfun( isNonPositiveInteger );
setReadOnly( isNonPositiveIntegerArray, 'primitives', arrayfun( isNonPositiveInteger.isPrimitive ) );
setReadOnly( isNonPositiveIntegerArray, 'objects', arrayfun( isNonPositiveInteger.isObject ) );


// EXPORTS //

module.exports = isNonPositiveIntegerArray;

},{"@stdlib/assert/is-nonpositive-integer":178,"@stdlib/assert/tools/array-like-function":316,"@stdlib/utils/define-read-only-property":356}],177:[function(require,module,exports){
'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is a nonpositive integer.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a nonpositive integer
*
* @example
* var bool = isNonPositiveInteger( -5.0 );
* // returns true
*
* @example
* var bool = isNonPositiveInteger( new Number( -5.0 ) );
* // returns true
*
* @example
* var bool = isNonPositiveInteger( 5.0 );
* // returns false
*
* @example
* var bool = isNonPositiveInteger( -3.14 );
* // returns false
*
* @example
* var bool = isNonPositiveInteger( null );
* // returns false
*/
function isNonPositiveInteger( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
} // end FUNCTION isNonPositiveInteger()


// EXPORTS //

module.exports = isNonPositiveInteger;

},{"./object.js":179,"./primitive.js":180}],178:[function(require,module,exports){
'use strict';

/**
* Tests if a value is a nonpositive integer.
*
* @module @stdlib/assert/is-nonpositive-integer
*
* @example
* var isNonPositiveInteger = require( '@stdlib/assert/is-nonpositive-integer' );
*
* var bool = isNonPositiveInteger( -5.0 );
* // returns true
*
* bool = isNonPositiveInteger( new Number( -5.0 ) );
* // returns true
*
* bool = isNonPositiveInteger( 5.0 );
* // returns false
*
* bool = isNonPositiveInteger( -3.14 );
* // returns false
*
* bool = isNonPositiveInteger( null );
* // returns false
*
* @example
* // Use interface to check for nonpositive integer primitives...
* var isNonPositiveInteger = require( '@stdlib/assert/is-nonpositive-integer' ).isPrimitive;
*
* var bool = isNonPositiveInteger( -3.0 );
* // returns true
*
* bool = isNonPositiveInteger( new Number( -3.0 ) );
* // returns false
*
* @example
* // Use interface to check for nonpositive integer objects...
* var isNonPositiveInteger = require( '@stdlib/assert/is-nonpositive-integer' ).isObject;
*
* var bool = isNonPositiveInteger( -3.0 );
* // returns false
*
* bool = isNonPositiveInteger( new Number( -3.0 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isNonPositiveInteger = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isNonPositiveInteger, 'isPrimitive', isPrimitive );
setReadOnly( isNonPositiveInteger, 'isObject', isObject );


// EXPORTS //

module.exports = isNonPositiveInteger;

},{"./generic.js":177,"./object.js":179,"./primitive.js":180,"@stdlib/utils/define-read-only-property":356}],179:[function(require,module,exports){
'use strict';

// MODULES //

var isInteger = require( '@stdlib/assert/is-integer' ).isObject;


// MAIN //

/**
* Tests if a value is a number object having a nonpositive integer value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object having a nonpositive integer value
*
* @example
* var bool = isNonPositiveInteger( -3.0 );
* // returns false
*
* @example
* var bool = isNonPositiveInteger( new Number( -3.0 ) );
* // returns true
*/
function isNonPositiveInteger( value ) {
	return (
		isInteger( value ) &&
		value.valueOf() <= 0
	);
} // end FUNCTION isNonPositiveInteger()


// EXPORTS //

module.exports = isNonPositiveInteger;

},{"@stdlib/assert/is-integer":116}],180:[function(require,module,exports){
'use strict';

// MODULES //

var isInteger = require( '@stdlib/assert/is-integer' ).isPrimitive;


// MAIN //

/**
* Tests if a value is a number primitive having a nonpositive integer value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number primitive having a nonpositive integer value
*
* @example
* var bool = isNonPositiveInteger( -3.0 );
* // returns true
*
* @example
* var bool = isNonPositiveInteger( new Number( -3.0 ) );
* // returns false
*/
function isNonPositiveInteger( value ) {
	return (
		isInteger( value ) &&
		value <= 0
	);
} // end FUNCTION isNonPositiveInteger()


// EXPORTS //

module.exports = isNonPositiveInteger;

},{"@stdlib/assert/is-integer":116}],181:[function(require,module,exports){
'use strict';

/**
* Test if a value is an array-like object containing only nonpositive numbers.
*
* @module @stdlib/assert/is-nonpositive-number-array
*
* @example
* var isNonPositiveNumberArray = require( '@stdlib/assert/is-nonpositive-number-array' );
*
* var bool = isNonPositiveNumberArray( [ -3.0, new Number(-3.0) ] );
* // returns true
*
* bool = isNonPositiveNumberArray( [ -3.0, '-3.0' ] );
* // returns false
*
* @example
* // Use interface to check for primitives...
* var isNonPositiveNumberArray = require( '@stdlib/assert/is-nonpositive-number-array' ).primitives;
*
* var bool = isNonPositiveNumberArray( [ -1.0, 0.0, -10.0 ] );
* // returns true
*
* bool = isNonPositiveNumberArray( [ -3.0, new Number(-1.0) ] );
* // returns false
*
* @example
* // Use interface to check for objects...
* var isNonPositiveNumberArray = require( '@stdlib/assert/is-nonpositive-number-array' ).objects;
*
* var bool = isNonPositiveNumberArray( [ new Number(-3.0), new Number(-1.0) ] );
* // returns true
*
* bool = isNonPositiveNumberArray( [ -1.0, 0.0, -10.0 ] );
* // returns false
*/

// MODULES //

var isNonPositiveNumber = require( '@stdlib/assert/is-nonpositive-number' );
var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var arrayfun = require( '@stdlib/assert/tools/array-like-function' );


// MAIN //

var isNonPositiveNumberArray = arrayfun( isNonPositiveNumber );
setReadOnly( isNonPositiveNumberArray, 'primitives', arrayfun( isNonPositiveNumber.isPrimitive ) );
setReadOnly( isNonPositiveNumberArray, 'objects', arrayfun( isNonPositiveNumber.isObject ) );


// EXPORTS //

module.exports = isNonPositiveNumberArray;

},{"@stdlib/assert/is-nonpositive-number":183,"@stdlib/assert/tools/array-like-function":316,"@stdlib/utils/define-read-only-property":356}],182:[function(require,module,exports){
'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is a nonpositive number.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a nonpositive number
*
* @example
* var bool = isNonPositiveNumber( -5.0 );
* // returns true
*
* @example
* var bool = isNonPositiveNumber( new Number( -5.0 ) );
* // returns true
*
* @example
* var bool = isNonPositiveNumber( -3.14 );
* // returns true
*
* @example
* var bool = isNonPositiveNumber( 5.0 );
* // returns false
*
* @example
* var bool = isNonPositiveNumber( null );
* // returns false
*/
function isNonPositiveNumber( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
} // end FUNCTION isNonPositiveNumber()


// EXPORTS //

module.exports = isNonPositiveNumber;

},{"./object.js":184,"./primitive.js":185}],183:[function(require,module,exports){
'use strict';

/**
* Test if a value is a nonpositive number.
*
* @module @stdlib/assert/is-nonpositive-number
*
* @example
* var isNonPositiveNumber = require( '@stdlib/assert/is-nonpositive-number' );
*
* var bool = isNonPositiveNumber( -5.0 );
* // returns true
*
* bool = isNonPositiveNumber( new Number( -5.0 ) );
* // returns true
*
* bool = isNonPositiveNumber( -3.14 );
* // returns true
*
* bool = isNonPositiveNumber( 5.0 );
* // returns false
*
* bool = isNonPositiveNumber( null );
* // returns false
*
* @example
* // Use interface to check for nonpositive number primitives...
* var isNonPositiveNumber = require( '@stdlib/assert/is-nonpositive-number' ).isPrimitive;
*
* var bool = isNonPositiveNumber( -3.0 );
* // returns true
*
* bool = isNonPositiveNumber( new Number( -3.0 ) );
* // returns false
*
* @example
* // Use interface to check for nonpositive number objects...
* var isNonPositiveNumber = require( '@stdlib/assert/is-nonpositive-number' ).isObject;
*
* var bool = isNonPositiveNumber( -3.0 );
* // returns false
*
* bool = isNonPositiveNumber( new Number( -3.0 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isNonPositiveNumber = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isNonPositiveNumber, 'isPrimitive', isPrimitive );
setReadOnly( isNonPositiveNumber, 'isObject', isObject );


// EXPORTS //

module.exports = isNonPositiveNumber;

},{"./generic.js":182,"./object.js":184,"./primitive.js":185,"@stdlib/utils/define-read-only-property":356}],184:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isObject;


// MAIN //

/**
* Tests if a value is a number object having a nonpositive value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object having a nonpositive number value
*
* @example
* var bool = isNonPositiveNumber( -3.0 );
* // returns false
*
* @example
* var bool = isNonPositiveNumber( new Number( -3.0 ) );
* // returns true
*/
function isNonPositiveNumber( value ) {
	return (
		isNumber( value ) &&
		value.valueOf() <= 0.0
	);
} // end FUNCTION isNonPositiveNumber()


// EXPORTS //

module.exports = isNonPositiveNumber;

},{"@stdlib/assert/is-number":191}],185:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;


// MAIN //

/**
* Tests if a value is a number primitive having a nonpositive value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number primitive having a nonpositive number value
*
* @example
* var bool = isNonPositiveNumber( -3.0 );
* // returns true
*
* @example
* var bool = isNonPositiveNumber( new Number( -3.0 ) );
* // returns false
*/
function isNonPositiveNumber( value ) {
	return (
		isNumber( value ) &&
		value <= 0.0
	);
} // end FUNCTION isNonPositiveNumber()


// EXPORTS //

module.exports = isNonPositiveNumber;

},{"@stdlib/assert/is-number":191}],186:[function(require,module,exports){
'use strict';

/**
* Test if a value is an array-like object containing only null values.
*
* @module @stdlib/assert/is-null-array
*
* @example
* var isNullArray = require( '@stdlib/assert/is-null-array' );
*
* var bool = isNullArray( [null,null,null] );
* // returns true
*
* bool = isNullArray( [NaN,2,null] );
* // returns false
*/

// MODULES //

var arrayfun = require( '@stdlib/assert/tools/array-like-function' );
var isNull = require( '@stdlib/assert/is-null' );


// MAIN //

var isNullArray = arrayfun( isNull );


// EXPORTS //

module.exports = isNullArray;

},{"@stdlib/assert/is-null":187,"@stdlib/assert/tools/array-like-function":316}],187:[function(require,module,exports){
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

},{"./is_null.js":188}],188:[function(require,module,exports){
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
} // end FUNCTION isNull()


// EXPORTS //

module.exports = isNull;

},{}],189:[function(require,module,exports){
'use strict';

/**
* Test if a value is an array-like object of numbers.
*
* @module @stdlib/assert/is-number-array
*
* @example
* var isNumberArray = require( '@stdlib/assert/is-number-array' );
*
* var bool = isNumberArray( [ 1, 2, 3 ] );
* // returns true
*
* bool = isNumberArray( [ '1', 2, 3 ] );
* // returns false
*
* @example
* // Use interface to check for primitives...
* var isNumberArray = require( '@stdlib/assert/is-number-array' ).primitives;
*
* var bool = isNumberArray( [ 1, 2, 3 ] );
* // returns true
*
* bool = isNumberArray( [ 1, new Number( 2 ) ] );
* // returns false
*
* @example
* // Use interface to check for objects...
* var isNumberArray = require( '@stdlib/assert/is-number-array' ).objects;
*
* var bool = isNumberArray( [ new Number( 1 ), new Number( 2 ) ] );
* // returns true
*
* bool = isNumberArray( [ new Number( 1 ), 2 ] );
* // returns false
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var arrayfun = require( '@stdlib/assert/tools/array-like-function' );
var isNumber = require( '@stdlib/assert/is-number' );


// MAIN //

var isNumberArray = arrayfun( isNumber );
setReadOnly( isNumberArray, 'primitives', arrayfun( isNumber.isPrimitive ) );
setReadOnly( isNumberArray, 'objects', arrayfun( isNumber.isObject ) );


// EXPORTS //

module.exports = isNumberArray;

},{"@stdlib/assert/is-number":191,"@stdlib/assert/tools/array-like-function":316,"@stdlib/utils/define-read-only-property":356}],190:[function(require,module,exports){
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

},{"./object.js":192,"./primitive.js":193}],191:[function(require,module,exports){
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

},{"./generic.js":190,"./object.js":192,"./primitive.js":193,"@stdlib/utils/define-read-only-property":356}],192:[function(require,module,exports){
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

},{"./try2serialize.js":195,"@stdlib/utils/detect-tostringtag-support":360,"@stdlib/utils/native-class":369}],193:[function(require,module,exports){
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

},{}],194:[function(require,module,exports){
'use strict';

// eslint-disable-next-line no-redeclare
var toString = Number.prototype.toString; // non-generic


// EXPORTS //

module.exports = toString;

},{}],195:[function(require,module,exports){
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

},{"./tostring.js":194}],196:[function(require,module,exports){
'use strict';

/**
* Test if a value is a numeric array.
*
* @module @stdlib/assert/is-numeric-array
*
* @example
* var isNumericArray = require( '@stdlib/assert/is-numeric-array' );
*
* var bool = isNumericArray( new Int8Array( 10 ) );
* // returns true
*
* bool = isNumericArray( [ 1, 2, 3 ] );
* // returns true
*
* bool = isNumericArray( [ '1', '2', '3' ] );
* // returns false
*/

// MODULES //

var isNumericArray = require( './is_numeric_array.js' );


// EXPORTS //

module.exports = isNumericArray;

},{"./is_numeric_array.js":197}],197:[function(require,module,exports){
'use strict';

// MODULES //

var isTypedArray = require( '@stdlib/assert/is-typed-array' );
var isNumberArray = require( '@stdlib/assert/is-number-array' ).primitives;
var isBuffer = require( '@stdlib/assert/is-buffer' );


// MAIN //

/**
* Tests if a value is a numeric array.
*
* @param {*} v - value to test
* @returns {boolean} boolean indicating if a value is a numeric array
*
* @example
* var bool = isNumericArray( new Int8Array( 10 ) );
* // returns true
*
* bool = isNumericArray( [ 1, 2, 3 ] );
* // returns true
*
* bool = isNumericArray( [ '1', '2', '3' ] );
* // returns false
*/
function isNumericArray( v ) {
	return (
		!isBuffer( v ) &&
		(isTypedArray( v ) || isNumberArray( v ))
	);
} // end FUNCTION isNumericArray()


// EXPORTS //

module.exports = isNumericArray;

},{"@stdlib/assert/is-buffer":49,"@stdlib/assert/is-number-array":189,"@stdlib/assert/is-typed-array":280}],198:[function(require,module,exports){
'use strict';

/**
* Test if a value is an array-like object containing only objects.
*
* @module @stdlib/assert/is-object-array
*
* @example
* var isObjectArray = require( '@stdlib/assert/is-object-array' );
*
* var bool = isObjectArray( [ {}, new Number(3.0) ] );
* // returns true
*
* bool = isObjectArray( [ {}, { 'beep': 'boop' } ] );
* // returns true
*
* bool = isObjectArray( [ {}, '3.0' ] );
* // returns false
*/

// MODULES //

var arrayfun = require( '@stdlib/assert/tools/array-like-function' );
var isObject = require( '@stdlib/assert/is-object' );


// MAIN //

var isObjectArray = arrayfun( isObject );


// EXPORTS //

module.exports = isObjectArray;

},{"@stdlib/assert/is-object":201,"@stdlib/assert/tools/array-like-function":316}],199:[function(require,module,exports){
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

},{"./is_object_like.js":200,"@stdlib/assert/tools/array-function":314,"@stdlib/utils/define-read-only-property":356}],200:[function(require,module,exports){
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

},{}],201:[function(require,module,exports){
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

},{"./is_object.js":202}],202:[function(require,module,exports){
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

},{"@stdlib/assert/is-array":29}],203:[function(require,module,exports){
'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is an odd number.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is an odd number.
*
* @example
* var bool = isOdd( 5.0 );
* // returns true
*
* @example
* var bool = isOdd( new Number( 5.0 ) );
* // returns true
*
* @example
* var bool = isOdd( 4.0 );
* // returns false
*
* @example
* var bool = isOdd( new Number( 4.0 ) );
* // returns false
*
* @example
* var bool = isOdd( -3.14 );
* // returns false
*
* @example
* var bool = isOdd( null );
* // returns false
*/
function isOdd( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
} // end FUNCTION isOdd()


// EXPORTS //

module.exports = isOdd;

},{"./object.js":205,"./primitive.js":206}],204:[function(require,module,exports){
'use strict';

/**
* Test if a value is an odd number.
*
* @module @stdlib/assert/is-odd
*
* @example
* var isOdd = require( '@stdlib/assert/is-odd' );
*
* var bool = isOdd( 5.0 );
* // returns true
*
* bool = isOdd( new Number( 5.0 ) );
* // returns true
*
* bool = isOdd( 4.0 );
* // returns false
*
* bool = isOdd( new Number( 4.0 ) );
* // returns false
*
* bool = isOdd( -3.14 );
* // returns false
*
* bool = isOdd( null );
* // returns false
*
* @example
* // Use interface to check for odd number primitives...
* var isOdd = require( '@stdlib/assert/is-odd' ).isPrimitive;
*
* var bool = isOdd( -5.0 );
* // returns true
*
* bool = isOdd( new Number( -5.0 ) );
* // returns false
*
* @example
* // Use interface to check for odd number objects...
* var isOdd = require( '@stdlib/assert/is-odd' ).isObject;
*
* var bool = isOdd( 5.0 );
* // returns false
*
* bool = isOdd( new Number( 5.0 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isOdd = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isOdd, 'isPrimitive', isPrimitive );
setReadOnly( isOdd, 'isObject', isObject );


// EXPORTS //

module.exports = isOdd;

},{"./generic.js":203,"./object.js":205,"./primitive.js":206,"@stdlib/utils/define-read-only-property":356}],205:[function(require,module,exports){
'use strict';

// MODULES //

var isInteger = require( '@stdlib/assert/is-integer' ).isObject;
var isEven = require( '@stdlib/assert/is-even' ).isPrimitive;


// MAIN //

/**
* Tests if a value is a number object that has an odd number value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object that has an odd number value
*
* @example
* var bool = isOdd( 5.0 );
* // returns false
*
* @example
* var bool = isOdd( new Number( 5.0 ) );
* // returns true
*/
function isOdd( value ) {
	if ( !isInteger( value ) ) {
		return false;
	}
	// Check sign to prevent overflow...
	if ( value > 0.0 ) {
		return isEven( value-1.0 );
	}
	return isEven( value+1.0 );
} // end FUNCTION isOdd()


// EXPORTS //

module.exports = isOdd;

},{"@stdlib/assert/is-even":84,"@stdlib/assert/is-integer":116}],206:[function(require,module,exports){
'use strict';

// MODULES //

var isInteger = require( '@stdlib/assert/is-integer' ).isPrimitive;
var isEven = require( '@stdlib/assert/is-even' ).isPrimitive;


// MAIN //

/**
* Tests if a value is a number primitive that is an odd number.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number primitive that is an odd number
*
* @example
* var bool = isOdd( -5.0 );
* // returns true
*
* @example
* var bool = isOdd( new Number( -5.0 ) );
* // returns false
*/
function isOdd( value ) {
	if ( !isInteger( value ) ) {
		return false;
	}
	// Check sign to prevent overflow...
	if ( value > 0.0 ) {
		return isEven( value-1.0 );
	}
	return isEven( value+1.0 );
} // end FUNCTION isOdd()


// EXPORTS //

module.exports = isOdd;

},{"@stdlib/assert/is-even":84,"@stdlib/assert/is-integer":116}],207:[function(require,module,exports){
'use strict';

/**
* Test if a value is an array-like object containing only plain objects.
*
* @module @stdlib/assert/is-plain-object-array
*
* @example
* var isObjectArray = require( '@stdlib/assert/is-plain-object-array' );
*
* var bool = isObjectArray( [ {}, { 'beep': 'boop' } ] );
* // returns true
*
* bool = isObjectArray( [ {}, new Number(3.0) ] );
* // returns false
*
* bool = isObjectArray( [ {}, '3.0' ] );
* // returns false
*/

// MODULES //

var arrayfun = require( '@stdlib/assert/tools/array-like-function' );
var isPlainObject = require( '@stdlib/assert/is-plain-object' );


// MAIN //

var isPlainObjectArray = arrayfun( isPlainObject );


// EXPORTS //

module.exports = isPlainObjectArray;

},{"@stdlib/assert/is-plain-object":208,"@stdlib/assert/tools/array-like-function":316}],208:[function(require,module,exports){
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

},{"./is_plain_object.js":209}],209:[function(require,module,exports){
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

},{"@stdlib/assert/has-own-property":4,"@stdlib/assert/is-function":100,"@stdlib/assert/is-object":201,"@stdlib/utils/get-prototype-of":365,"@stdlib/utils/native-class":369}],210:[function(require,module,exports){
'use strict';

/**
* Test if a value is an array-like object containing only positive integers.
*
* @module @stdlib/assert/is-positive-integer-array
*
* @example
* var isPositiveIntegerArray = require( '@stdlib/assert/is-positive-integer-array' );
*
* var bool = isPositiveIntegerArray( [ 3.0, new Number(3.0) ] );
* // returns true
*
* bool = isPositiveIntegerArray( [ 3.0, '3.0' ] );
* // returns false
*
* @example
* // Use interface to check for primitives...
* var isPositiveIntegerArray = require( '@stdlib/assert/is-positive-integer-array' ).primitives;
*
* var bool = isPositiveIntegerArray( [ 1.0, 2.0, 10.0 ] );
* // returns true
*
* bool = isPositiveIntegerArray( [ 3.0, new Number(1.0) ] );
* // returns false
*
* @example
* // Use interface to check for objects...
* var isPositiveIntegerArray = require( '@stdlib/assert/is-positive-integer-array' ).objects;
*
* var bool = isPositiveIntegerArray( [ new Number(3.0), new Number(1.0) ] );
* // returns true
*
* bool = isPositiveIntegerArray( [ 1.0, 2.0, 10.0 ] );
* // returns false
*/

// MODULES //

var isPositiveInteger = require( '@stdlib/assert/is-positive-integer' );
var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var arrayfun = require( '@stdlib/assert/tools/array-like-function' );


// MAIN //

var isPositiveIntegerArray = arrayfun( isPositiveInteger );
setReadOnly( isPositiveIntegerArray, 'primitives', arrayfun( isPositiveInteger.isPrimitive ) );
setReadOnly( isPositiveIntegerArray, 'objects', arrayfun( isPositiveInteger.isObject ) );


// EXPORTS //

module.exports = isPositiveIntegerArray;

},{"@stdlib/assert/is-positive-integer":212,"@stdlib/assert/tools/array-like-function":316,"@stdlib/utils/define-read-only-property":356}],211:[function(require,module,exports){
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

},{"./object.js":213,"./primitive.js":214}],212:[function(require,module,exports){
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

},{"./generic.js":211,"./object.js":213,"./primitive.js":214,"@stdlib/utils/define-read-only-property":356}],213:[function(require,module,exports){
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

},{"@stdlib/assert/is-integer":116}],214:[function(require,module,exports){
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

},{"@stdlib/assert/is-integer":116}],215:[function(require,module,exports){
'use strict';

/**
* Test if a value is an array-like object containing only positive numbers.
*
* @module @stdlib/assert/is-positive-number-array
*
* @example
* var isPositiveNumberArray = require( '@stdlib/assert/is-positive-number-array' );
*
* var bool = isPositiveNumberArray( [ 3.0, new Number(3.0) ] );
* // returns true
*
* bool = isPositiveNumberArray( [ 3.0, '3.0' ] );
* // returns false
*
* @example
* // Use interface to check for primitives...
* var isPositiveNumberArray = require( '@stdlib/assert/is-positive-number-array' ).primitives;
*
* var bool = isPositiveNumberArray( [ 1.0, 5.0, 10.0 ] );
* // returns true
*
* bool = isPositiveNumberArray( [ 3.0, new Number(1.0) ] );
* // returns false
*
* @example
* // Use interface to check for objects...
* var isPositiveNumberArray = require( '@stdlib/assert/is-positive-number-array' ).objects;
*
* var bool = isPositiveNumberArray( [ new Number(3.0), new Number(1.0) ] );
* // returns true
*
* bool = isPositiveNumberArray( [ 1.0, 5.0, 10.0 ] );
* // returns false
*/

// MODULES //

var isPositiveNumber = require( '@stdlib/assert/is-positive-number' );
var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var arrayfun = require( '@stdlib/assert/tools/array-like-function' );


// MAIN //

var isPositiveNumberArray = arrayfun( isPositiveNumber );
setReadOnly( isPositiveNumberArray, 'primitives', arrayfun( isPositiveNumber.isPrimitive ) );
setReadOnly( isPositiveNumberArray, 'objects', arrayfun( isPositiveNumber.isObject ) );


// EXPORTS //

module.exports = isPositiveNumberArray;

},{"@stdlib/assert/is-positive-number":217,"@stdlib/assert/tools/array-like-function":316,"@stdlib/utils/define-read-only-property":356}],216:[function(require,module,exports){
'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is a positive number.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a positive number
*
* @example
* var bool = isPositiveNumber( 5.0 );
* // returns true
*
* @example
* var bool = isPositiveNumber( new Number( 5.0 ) );
* // returns true
*
* @example
* var bool = isPositiveNumber( 3.14 );
* // returns true
*
* @example
* var bool = isPositiveNumber( -5.0 );
* // returns false
*
* @example
* var bool = isPositiveNumber( null );
* // returns false
*/
function isPositiveNumber( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
} // end FUNCTION isPositiveNumber()


// EXPORTS //

module.exports = isPositiveNumber;

},{"./object.js":218,"./primitive.js":219}],217:[function(require,module,exports){
'use strict';

/**
* Test if a value is a positive number.
*
* @module @stdlib/assert/is-positive-number
*
* @example
* var isPositiveNumber = require( '@stdlib/assert/is-positive-number' );
*
* var bool = isPositiveNumber( 5.0 );
* // returns true
*
* bool = isPositiveNumber( new Number( 5.0 ) );
* // returns true
*
* bool = isPositiveNumber( 3.14 );
* // returns true
*
* bool = isPositiveNumber( -5.0 );
* // returns false
*
* bool = isPositiveNumber( null );
* // returns false
*
* @example
* // Use interface to check for positive number primitives...
* var isPositiveNumber = require( '@stdlib/assert/is-positive-number' ).isPrimitive;
*
* var bool = isPositiveNumber( 3.0 );
* // returns true
*
* bool = isPositiveNumber( new Number( 3.0 ) );
* // returns false
*
* @example
* // Use interface to check for positive number objects...
* var isPositiveNumber = require( '@stdlib/assert/is-positive-number' ).isObject;
*
* var bool = isPositiveNumber( 3.0 );
* // returns false
*
* bool = isPositiveNumber( new Number( 3.0 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isPositiveNumber = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isPositiveNumber, 'isPrimitive', isPrimitive );
setReadOnly( isPositiveNumber, 'isObject', isObject );


// EXPORTS //

module.exports = isPositiveNumber;

},{"./generic.js":216,"./object.js":218,"./primitive.js":219,"@stdlib/utils/define-read-only-property":356}],218:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isObject;


// MAIN //

/**
* Tests if a value is a number object having a positive value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object having a positive value
*
* @example
* var bool = isPositiveNumber( 3.0 );
* // returns false
*
* @example
* var bool = isPositiveNumber( new Number( 3.0 ) );
* // returns true
*/
function isPositiveNumber( value ) {
	return (
		isNumber( value ) &&
		value.valueOf() > 0.0
	);
} // end FUNCTION isPositiveNumber()


// EXPORTS //

module.exports = isPositiveNumber;

},{"@stdlib/assert/is-number":191}],219:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;


// MAIN //

/**
* Tests if a value is a number primitive having a positive value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number primitive having a positive value
*
* @example
* var bool = isPositiveNumber( 3.0 );
* // returns true
*
* @example
* var bool = isPositiveNumber( new Number( 3.0 ) );
* // returns false
*/
function isPositiveNumber( value ) {
	return (
		isNumber( value ) &&
		value > 0.0
	);
} // end FUNCTION isPositiveNumber()


// EXPORTS //

module.exports = isPositiveNumber;

},{"@stdlib/assert/is-number":191}],220:[function(require,module,exports){
'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is equal to positive zero.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is equal to positive zero
*
* @example
* var bool = isPositiveZero( 0.0 );
* // returns true
*
* @example
* var bool = isPositiveZero( new Number( 0.0 ) );
* // returns true
*
* @example
* var bool = isPositiveZero( -3.14 );
* // returns false
*
* @example
* var bool = isPositiveZero( 5.0 );
* // returns false
*
* @example
* var bool = isPositiveZero( -0.0 );
* // returns false
*
* @example
* var bool = isPositiveZero( null );
* // returns false
*/
function isPositiveZero( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
} // end FUNCTION isPositiveZero()


// EXPORTS //

module.exports = isPositiveZero;

},{"./object.js":222,"./primitive.js":223}],221:[function(require,module,exports){
'use strict';

/**
* Test if a value is equal to positive zero.
*
* @module @stdlib/assert/is-positive-zero
*
* @example
* var isPositiveZero = require( '@stdlib/assert/is-positive-zero' );
*
* var bool = isPositiveZero( 0.0 );
* // returns true
*
* bool = isPositiveZero( new Number( 0.0 ) );
* // returns true
*
* bool = isPositiveZero( -3.14 );
* // returns false
*
* bool = isPositiveZero( 5.0 );
* // returns false
*
* bool = isPositiveZero( -0.0 );
* // returns false
*
* bool = isPositiveZero( null );
* // returns false
*
* @example
* var isPositiveZero = require( '@stdlib/assert/is-positive-zero' ).isPrimitive;
*
* var bool = isPositiveZero( 0.0 );
* // returns true
*
* bool = isPositiveZero( new Number( 0.0 ) );
* // returns false
*
* @example
* var isPositiveZero = require( '@stdlib/assert/is-positive-zero' ).isObject;
*
* var bool = isPositiveZero( 0.0 );
* // returns false
*
* bool = isPositiveZero( new Number( 0.0 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isPositiveZero = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isPositiveZero, 'isPrimitive', isPrimitive );
setReadOnly( isPositiveZero, 'isObject', isObject );


// EXPORTS //

module.exports = isPositiveZero;

},{"./generic.js":220,"./object.js":222,"./primitive.js":223,"@stdlib/utils/define-read-only-property":356}],222:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isObject;
var PINF = require( '@stdlib/math/constants/float64-pinf' );


// MAIN //

/**
* Tests if a value is a number object having a value equal to positive zero.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object having a value equal to positive zero
*
* @example
* var bool = isPositiveZero( 0.0 );
* // returns false
*
* @example
* var bool = isPositiveZero( new Number( 0.0 ) );
* // returns true
*/
function isPositiveZero( value ) {
	return (
		isNumber( value ) &&
		( 1.0 / value.valueOf() ) === PINF
	);
} // end FUNCTION isPositiveZero()


// EXPORTS //

module.exports = isPositiveZero;

},{"@stdlib/assert/is-number":191,"@stdlib/math/constants/float64-pinf":336}],223:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;
var PINF = require( '@stdlib/math/constants/float64-pinf' );


// MAIN //

/**
* Tests if a value is a number primitive equal to positive zero.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number primitive equal to positive zero
*
* @example
* var bool = isPositiveZero( 0.0 );
* // returns true
*
* @example
* var bool = isPositiveZero( new Number( 0.0 ) );
* // returns false
*/
function isPositiveZero( value ) {
	return (
		isNumber( value ) &&
		( 1.0 / value ) === PINF
	);
} // end FUNCTION isPositiveZero()


// EXPORTS //

module.exports = isPositiveZero;

},{"@stdlib/assert/is-number":191,"@stdlib/math/constants/float64-pinf":336}],224:[function(require,module,exports){
'use strict';

/**
* Test if a value is an array-like object containing only JavaScript primitives.
*
* @module @stdlib/assert/is-primitive-array
*
* @example
* var isPrimitiveArray = require( '@stdlib/assert/is-primitive-array' );
*
* var bool = isPrimitiveArray( [ '3', 2, null ] );
* // returns true
*
* bool = isPrimitiveArray( [ {}, 2, 1 ] );
* // returns false
*
* bool = isPrimitiveArray( [ new String('abc'), '3.0' ] );
* // returns false
*/

// MODULES //

var arrayfun = require( '@stdlib/assert/tools/array-like-function' );
var isPrimitive = require( '@stdlib/assert/is-primitive' );


// MAIN //

var isPrimitiveArray = arrayfun( isPrimitive );


// EXPORTS //

module.exports = isPrimitiveArray;

},{"@stdlib/assert/is-primitive":225,"@stdlib/assert/tools/array-like-function":316}],225:[function(require,module,exports){
'use strict';

/**
* Test if a value is a JavaScript primitive.
*
* @module @stdlib/assert/is-primitive
*
* @example
* var isPrimitive = require( '@stdlib/assert/is-primitive' );
*
* var bool = isPrimitive( true );
* // returns true
*
* bool = isPrimitive( {} );
* // returns false
*/

// MODULES //

var isPrimitive = require( './is_primitive.js' );


// EXPORTS //

module.exports = isPrimitive;

},{"./is_primitive.js":226}],226:[function(require,module,exports){
'use strict';

/**
* Tests if a value is a JavaScript primitive.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a JavaScript primitive
*
* @example
* var bool = isPrimitive( true );
* // returns true
*
* @example
* var bool = isPrimitive( {} );
* // returns false
*/
function isPrimitive( value ) {
	var type = typeof value;
	return (
		type === 'string' ||
		type === 'number' ||
		type === 'boolean' ||
		type === 'symbol' ||  // ES6/ES2015
		value === null ||
		value === void 0
	);
} // end FUNCTION isPrimitive()


// EXPORTS //

module.exports = isPrimitive;

},{}],227:[function(require,module,exports){
'use strict';

/**
* Test if a value is an array-like object containing only probabilities.
*
* @module @stdlib/assert/is-probability-array
*
* @example
* var isNonNegativeNumberArray = require( '@stdlib/assert/is-probability-array' );
*
* var bool = isProbabilityArray( [ 0.5, new Number(0.8) ] );
* // returns true
*
* bool = isProbabilityArray( [ 0.8, 1.2 ] );
* // returns false
*
* bool = isProbabilityArray( [ 0.8, '0.2' ] );
* // returns false
*
* @example
* // Use interface to check for primitives...
* var isProbabilityArray = require( '@stdlib/assert/is-probability-array' ).primitives;
*
* var bool = isProbabilityArray( [ 1.0, 0.0, 0.5 ] );
* // returns true
*
* bool = isProbabilityArray( [ 0.3, new Number(0.4) ] );
* // returns false
*
* @example
* // Use interface to check for objects...
* var isProbabilityArray = require( '@stdlib/assert/is-probability-array' ).objects;
*
* var bool = isProbabilityArray( [ new Number(0.7), new Number(1.0) ] );
* // returns true
*
* bool = isProbabilityArray( [ 1.0, 0.0, new Number(0.7) ] );
* // returns false
*/

// MODULES //

var isProbability = require( '@stdlib/assert/is-probability' );
var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var arrayfun = require( '@stdlib/assert/tools/array-like-function' );


// MAIN //

var isProbabilityArray = arrayfun( isProbability );
setReadOnly( isProbabilityArray, 'primitives', arrayfun( isProbability.isPrimitive ) );
setReadOnly( isProbabilityArray, 'objects', arrayfun( isProbability.isObject ) );


// EXPORTS //

module.exports = isProbabilityArray;

},{"@stdlib/assert/is-probability":229,"@stdlib/assert/tools/array-like-function":316,"@stdlib/utils/define-read-only-property":356}],228:[function(require,module,exports){
'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is a probability.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a probability
*
* @example
* var bool = isProbability( 0.5 );
* // returns true
*
* @example
* var bool = isProbability( new Number( 0.5 ) );
* // returns true
*
* @example
* var bool = isProbability( 3.14 );
* // returns false
*
* @example
* var bool = isProbability( -5.0 );
* // returns false
*
* @example
* var bool = isProbability( null );
* // returns false
*/
function isProbability( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
} // end FUNCTION isProbability()


// EXPORTS //

module.exports = isProbability;

},{"./object.js":230,"./primitive.js":231}],229:[function(require,module,exports){
'use strict';

/**
* Tests if a value is a probability.
*
* @module @stdlib/assert/is-probability
*
* @example
* var isProbability = require( '@stdlib/assert/is-probability' );
*
* var bool = isProbability( 0.5 );
* // returns true
*
* bool = isProbability( new Number( 0.5 ) );
* // returns true
*
* bool = isProbability( 3.14 );
* // returns false
*
* bool = isProbability( -5.0 );
* // returns false
*
* bool = isProbability( null );
* // returns false
*
* @example
* // Use interface to check for probability primitives...
* var isProbability = require( '@stdlib/assert/is-probability' ).isPrimitive;
*
* var bool = isProbability( 0.3 );
* // returns true
*
* bool = isProbability( new Number( 0.3 ) );
* // returns false
*
* @example
* // Use interface to check for probability objects...
* var isProbability = require( '@stdlib/assert/is-probability' ).isObject;
*
* var bool = isProbability( 0.77 );
* // returns false
*
* bool = isProbability( new Number( 0.77 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isProbability = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isProbability, 'isPrimitive', isPrimitive );
setReadOnly( isProbability, 'isObject', isObject );


// EXPORTS //

module.exports = isProbability;

},{"./generic.js":228,"./object.js":230,"./primitive.js":231,"@stdlib/utils/define-read-only-property":356}],230:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isObject;


// MAIN //

/**
* Tests if a value is a number object having a value which is a probability.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object having a value which is a probability
*
* @example
* var bool = isProbability( 0.5 );
* // returns false
*
* @example
* var bool = isProbability( new Number( 0.5 ) );
* // returns true
*/
function isProbability( value ) {
	return (
		isNumber( value ) &&
		value.valueOf() >= 0.0 &&
		value.valueOf() <= 1.0
	);
} // end FUNCTION isProbability()


// EXPORTS //

module.exports = isProbability;

},{"@stdlib/assert/is-number":191}],231:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;


// MAIN //

/**
* Tests if a value is a number primitive having a value which is a probability.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number primitive having a value which is a probability
*
* @example
* var bool = isProbability( 0.66 );
* // returns true
*
* @example
* var bool = isProbability( new Number( 0.66 ) );
* // returns false
*/
function isProbability( value ) {
	return (
		isNumber( value ) &&
		value >= 0.0 &&
		value <= 1.0
	);
} // end FUNCTION isProbability()


// EXPORTS //

module.exports = isProbability;

},{"@stdlib/assert/is-number":191}],232:[function(require,module,exports){
'use strict';

/**
* Test if a value is a `RangeError` object.
*
* @module @stdlib/assert/is-range-error
*
* @example
* var isRangeError = require( '@stdlib/assert/is-range-error' );
*
* var bool = isRangeError( new RangeError( 'beep' ) );
* // returns true
*
* bool = isRangeError( {} );
* // returns false
*/

// MODULES //

var isRangeError = require( './is_range_error.js' );


// EXPORTS //

module.exports = isRangeError;

},{"./is_range_error.js":233}],233:[function(require,module,exports){
'use strict';

// MODULES //

var getPrototypeOf = require( '@stdlib/utils/get-prototype-of' );
var typeOf = require( '@stdlib/utils/type-of' );
var isError = require( '@stdlib/assert/is-error' );


// MAIN //

/**
* Tests if a value is a `RangeError` object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether a value is a `RangeError` object
*
* @example
* var bool = isRangeError( new RangeError( 'beep' ) );
* // returns true
*
* @example
* var bool = isRangeError( {} );
* // returns false
*/
function isRangeError( value ) {
	if ( typeof value !== 'object' || value === null ) {
		return false;
	}
	// Check for `RangeError` objects from the same realm (same Node.js `vm` or same `Window` object)...
	if ( value instanceof RangeError ) {
		return true;
	}
	// All `RangeError` objects are `Error` objects...
	if ( isError( value ) ) {
		// Walk the prototype tree until we find the desired constructor...
		while ( value ) {
			if ( typeOf( value ) === 'rangeerror' ) {
				return true;
			}
			value = getPrototypeOf( value );
		}
	}
	return false;
} // end FUNCTION isRangeError()


// EXPORTS //

module.exports = isRangeError;

},{"@stdlib/assert/is-error":79,"@stdlib/utils/get-prototype-of":365,"@stdlib/utils/type-of":380}],234:[function(require,module,exports){
'use strict';

/**
* Test if a value is a `ReferenceError` object.
*
* @module @stdlib/assert/is-reference-error
*
* @example
* var isReferenceError = require( '@stdlib/assert/is-reference-error' );
*
* var bool = isReferenceError( new ReferenceError( 'beep' ) );
* // returns true
*
* bool = isReferenceError( {} );
* // returns false
*/

// MODULES //

var isReferenceError = require( './is_reference_error.js' );


// EXPORTS //

module.exports = isReferenceError;

},{"./is_reference_error.js":235}],235:[function(require,module,exports){
'use strict';

// MODULES //

var getPrototypeOf = require( '@stdlib/utils/get-prototype-of' );
var typeOf = require( '@stdlib/utils/type-of' );
var isError = require( '@stdlib/assert/is-error' );


// MAIN //

/**
* Tests if a value is a `ReferenceError` object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether a value is a `ReferenceError` object
*
* @example
* var bool = isReferenceError( new ReferenceError( 'beep' ) );
* // returns true
*
* @example
* var bool = isReferenceError( {} );
* // returns false
*/
function isReferenceError( value ) {
	if ( typeof value !== 'object' || value === null ) {
		return false;
	}
	// Check for `ReferenceError` objects from the same realm (same Node.js `vm` or same `Window` object)...
	if ( value instanceof ReferenceError ) {
		return true;
	}
	// All `ReferenceError` objects are `Error` objects...
	if ( isError( value ) ) {
		// Walk the prototype tree until we find the desired constructor...
		while ( value ) {
			if ( typeOf( value ) === 'referenceerror' ) {
				return true;
			}
			value = getPrototypeOf( value );
		}
	}
	return false;
} // end FUNCTION isReferenceError()


// EXPORTS //

module.exports = isReferenceError;

},{"@stdlib/assert/is-error":79,"@stdlib/utils/get-prototype-of":365,"@stdlib/utils/type-of":380}],236:[function(require,module,exports){
'use strict';

/**
* Test if a value is a regular expression string.
*
* @module @stdlib/assert/is-regexp-string
*
* @example
* var isRegExpString = require( '@stdlib/assert/is-regexp-string' );
*
* var bool = isRegExpString( '/beep/' );
* // returns true
*
* bool = isRegExpString( 'beep' );
* // returns false
*
* bool = isRegExpString( '' );
* // returns false
*
* bool = isRegExpString( null );
* // returns false
*/

// MODULES //

var isRegExpString = require( './is_regexp_string.js' );


// EXPORTS //

module.exports = isRegExpString;

},{"./is_regexp_string.js":237}],237:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var RE = require( '@stdlib/regexp/regexp' );


// MAIN //

/**
* Tests if a value is a regular expression string.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether a value is a regular expression string
*
* @example
* var bool = isRegExpString( '/beep/' );
* // returns true
*
* @example
* var bool = isRegExpString( '/beep/gim' );
* // returns true
*
* @example
* var bool = isRegExpString( 'beep' );
* // returns false
*
* @example
* var bool = isRegExpString( '' );
* // returns false
*
* @example
* var bool = isRegExpString( null );
* // returns false
*/
function isRegExpString( value ) {
	return isString( value ) && RE.test( value );
} // end FUNCTION isRegExpString()


// EXPORTS //

module.exports = isRegExpString;

},{"@stdlib/assert/is-string":256,"@stdlib/regexp/regexp":342}],238:[function(require,module,exports){
'use strict';

var exec = RegExp.prototype.exec; // non-generic


// EXPORTS //

module.exports = exec;

},{}],239:[function(require,module,exports){
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

},{"./is_regexp.js":240}],240:[function(require,module,exports){
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
} // end FUNCTION isRegExp()


// EXPORTS //

module.exports = isRegExp;

},{"./try2exec.js":241,"@stdlib/utils/detect-tostringtag-support":360,"@stdlib/utils/native-class":369}],241:[function(require,module,exports){
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
} // end FUNCTION test()


// EXPORTS //

module.exports = test;

},{"./exec.js":238}],242:[function(require,module,exports){
'use strict';

/**
* Test if a value is a relative path.
*
* @module @stdlib/assert/is-relative-path
*
* @example
* var isWindows = require( '@stdlib/assert/is-windows' );
* var isRelativePath = require( '@stdlib/assert/is-relative-path' );
*
* var bool;
* if ( isWindows ) {
*     bool = isRelativePath( 'foo\\bar\\baz' );
*     // returns true
*
*     bool = isRelativePath( 'C:\\foo\\..\\bar\\baz' );
*     // returns false
* } else {
*     bool = isRelativePath( './foo/bar/baz' );
*     // returns true
*
*     bool = isRelativePath( '/foo/../bar/baz' );
*     // returns false
* }
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isWindows = require( '@stdlib/assert/is-windows' );
var isRelativePathPosix = require( './posix.js' );
var isRelativePathWin32 = require( './win32.js' );


// MAIN //

var isRelativePath;
if ( isWindows ) {
	isRelativePath = isRelativePathWin32;
} else {
	isRelativePath = isRelativePathPosix;
}
setReadOnly( isRelativePath, 'posix', isRelativePathPosix );
setReadOnly( isRelativePath, 'win32', isRelativePathWin32 );


// EXPORTS //

module.exports = isRelativePath;

},{"./posix.js":243,"./win32.js":244,"@stdlib/assert/is-windows":310,"@stdlib/utils/define-read-only-property":356}],243:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var isAbsolutePath = require( '@stdlib/assert/is-absolute-path' ).posix;


// MAIN //

/**
* Tests if a value is a POSIX relative path.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a POSIX relative path
*
* @example
* var bool = isRelativePath( './foo/bar/baz' );
* // returns true
*
* @example
* var bool = isRelativePath( '/foo/../bar/baz' );
* // returns false
*/
function isRelativePath( value ) {
	return (
		isString( value ) &&
		!isAbsolutePath( value )
	);
} // end FUNCTION isRelativePath()


// EXPORTS //

module.exports = isRelativePath;

},{"@stdlib/assert/is-absolute-path":11,"@stdlib/assert/is-string":256}],244:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var isAbsolutePath = require( '@stdlib/assert/is-absolute-path' ).win32;


// MAIN //

/**
* Tests if a value is a Windows relative path.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a Windows relative path
*
* @example
* var bool = isRelativePath( 'foo\\bar\\baz' );
* // returns true
*
* @example
* var bool = isRelativePath( 'C:\\foo\\..\\bar\\baz' );
* // returns false
*/
function isRelativePath( value ) {
	return (
		isString( value ) &&
		!isAbsolutePath( value )
	);
} // end FUNCTION isRelativePath()


// EXPORTS //

module.exports = isRelativePath;

},{"@stdlib/assert/is-absolute-path":11,"@stdlib/assert/is-string":256}],245:[function(require,module,exports){
'use strict';

/**
* Test if a value is an array-like object containing only safe integers.
*
* @module @stdlib/assert/is-safe-integer-array
*
* @example
* var isSafeIntegerArray = require( '@stdlib/assert/is-safe-integer-array' );
*
* var bool = isSafeIntegerArray( [ -3.0, new Number(0.0), 2.0 ] );
* // returns true
*
* bool = isSafeIntegerArray( [ -3.0, '3.0' ] );
* // returns false
*
* @example
* // Use interface to check for primitives...
* var isSafeIntegerArray = require( '@stdlib/assert/is-safe-integer-array' ).primitives;
*
* var bool = isSafeIntegerArray( [ -1.0, 10.0 ] );
* // returns true
*
* bool = isSafeIntegerArray( [ -1.0, 0.0, 5.0 ] );
* // returns true
*
* bool = isSafeIntegerArray( [ -3.0, new Number(-1.0) ] );
* // returns false
*
* @example
* // Use interface to check for objects...
* var isSafeIntegerArray = require( '@stdlib/assert/is-safe-integer-array' ).objects;
*
* var bool = isSafeIntegerArray( [ new Number(1.0), new Number(3.0) ] );
* // returns true
*
* bool = isSafeIntegerArray( [ -1.0, 0.0, 3.0 ] );
* // returns false
*
* bool = isSafeIntegerArray( [ 3.0, new Number(-1.0) ] );
* // returns false
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var arrayfun = require( '@stdlib/assert/tools/array-like-function' );
var isSafeInteger = require( '@stdlib/assert/is-safe-integer' );


// MAIN //

var isSafeIntegerArray = arrayfun( isSafeInteger );
setReadOnly( isSafeIntegerArray, 'primitives', arrayfun( isSafeInteger.isPrimitive ) );
setReadOnly( isSafeIntegerArray, 'objects', arrayfun( isSafeInteger.isObject ) );


// EXPORTS //

module.exports = isSafeIntegerArray;

},{"@stdlib/assert/is-safe-integer":247,"@stdlib/assert/tools/array-like-function":316,"@stdlib/utils/define-read-only-property":356}],246:[function(require,module,exports){
'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is a safe integer.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a safe integer
*
* @example
* var bool = isSafeInteger( 5.0 );
* // returns true
*
* @example
* var bool = isSafeInteger( new Number( 5.0 ) );
* // returns true
*
* @example
* var bool = isSafeInteger( 2.0e300 );
* // returns false
*
* @example
* var bool = isSafeInteger( -3.14 );
* // returns false
*
* @example
* var bool = isSafeInteger( null );
* // returns false
*/
function isSafeInteger( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
} // end FUNCTION isSafeInteger()


// EXPORTS //

module.exports = isSafeInteger;

},{"./object.js":248,"./primitive.js":249}],247:[function(require,module,exports){
'use strict';

/**
* Test if a value is a safe integer.
*
* @module @stdlib/assert/is-safe-integer
*
* @example
* var isSafeInteger = require( '@stdlib/assert/is-safe-integer' );
*
* var bool = isSafeInteger( 5.0 );
* // returns true
*
* bool = isSafeInteger( new Number( 5.0 ) );
* // returns true
*
* bool = isSafeInteger( 2.0e200 );
* // returns false
*
* bool = isSafeInteger( -3.14 );
* // returns false
*
* bool = isSafeInteger( null );
* // returns false
*
* @example
* // Use interface to check for integer primitives...
* var isSafeInteger = require( '@stdlib/assert/is-safe-integer' ).isPrimitive;
*
* var bool = isSafeInteger( -3.0 );
* // returns true
*
* bool = isSafeInteger( new Number( -3.0 ) );
* // returns false
*
* @example
* // Use interface to check for integer objects...
* var isSafeInteger = require( '@stdlib/assert/is-safe-integer' ).isObject;
*
* var bool = isSafeInteger( 3.0 );
* // returns false
*
* bool = isSafeInteger( new Number( 3.0 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isSafeInteger = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isSafeInteger, 'isPrimitive', isPrimitive );
setReadOnly( isSafeInteger, 'isObject', isObject );


// EXPORTS //

module.exports = isSafeInteger;

},{"./generic.js":246,"./object.js":248,"./primitive.js":249,"@stdlib/utils/define-read-only-property":356}],248:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isObject;
var isSafeInt = require( '@stdlib/math/base/assert/is-safe-integer' );


// MAIN //

/**
* Tests if a value is a number object having a safe integer value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object having a safe integer value
*
* @example
* var bool = isSafeInteger( 3.0 );
* // returns false
*
* @example
* var bool = isSafeInteger( new Number( 3.0 ) );
* // returns true
*/
function isSafeInteger( value ) {
	return (
		isNumber( value ) &&
		isSafeInt( value.valueOf() )
	);
} // end FUNCTION isSafeInteger()


// EXPORTS //

module.exports = isSafeInteger;

},{"@stdlib/assert/is-number":191,"@stdlib/math/base/assert/is-safe-integer":325}],249:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;
var isSafeInt = require( '@stdlib/math/base/assert/is-safe-integer' );


// MAIN //

/**
* Tests if a value is a number primitive having a safe integer value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number primitive having a safe integer value
*
* @example
* var bool = isSafeInteger( -3.0 );
* // returns true
*
* @example
* var bool = isSafeInteger( new Number( -3.0 ) );
* // returns false
*/
function isSafeInteger( value ) {
	return (
		isNumber( value ) &&
		isSafeInt( value )
	);
} // end FUNCTION isSafeInteger()


// EXPORTS //

module.exports = isSafeInteger;

},{"@stdlib/assert/is-number":191,"@stdlib/math/base/assert/is-safe-integer":325}],250:[function(require,module,exports){
'use strict';

/**
* Test if two arguments are the same value.
*
* @module @stdlib/assert/is-same-value
*
* @example
* var isSameValue = require( '@stdlib/assert/is-same-value' );
*
* var bool = isSameValue( true, true );
* // returns true
*
* bool = isSameValue( 3.14, 3.14 );
* // returns true
*
* bool = isSameValue( {}, {} );
* // returns false
*
* bool = isSameValue( -0.0, -0.0 );
* // returns true
*
* bool = isSameValue( -0.0, 0.0 );
* // returns false
*
* bool = isSameValue( NaN, NaN );
* // returns true
*
* bool = isSameValue( [], [] );
* // returns false
*/

// MODULES //

var isSameValue = require( './is_same_value.js' );


// EXPORTS //

module.exports = isSameValue;

},{"./is_same_value.js":251}],251:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Tests if two arguments are the same value.
*
* ## Notes
*
* * The function implements the [SameValue Algorithm]{@link http://ecma-international.org/ecma-262/5.1/#sec-9.12}, as specified in ECMAScript 5.
* * In contrast to the strict equality operator `===`, `-0` and `+0` are distinguishable and `NaNs` are the same.
*
*
* @param {*} a - first input value
* @param {*} b - second input value
* @returns {boolean} boolean indicating whether two arguments are the same value
*
* @example
* var bool = isSameValue( true, true );
* // returns true
*
* @example
* var bool = isSameValue( 3.14, 3.14 );
* // returns true
*
* @example
* var bool = isSameValue( {}, {} );
* // returns false
*
* @example
* var bool = isSameValue( -0.0, -0.0 );
* // returns true
*
* @example
* var bool = isSameValue( -0.0, 0.0 );
* // returns false
*
* @example
* var bool = isSameValue( NaN, NaN );
* // returns true
*
* @example
* var bool = isSameValue( [], [] );
* // returns false
*/
function isSameValue( a, b ) {
	if ( a === b ) {
		if ( a === 0.0 ) {
			return 1.0 / a === 1.0 / b; // handles +-0
		}
		return true;
	}
	return ( a !== a && b !== b ); // handles NaNs
} // end FUNCTION isSameValue()


// EXPORTS //

module.exports = isSameValue;

},{}],252:[function(require,module,exports){
'use strict';

/**
* Test if two arguments are strictly equal.
*
* @module @stdlib/assert/is-strict-equal
*
* @example
* var isStrictEqual = require( '@stdlib/assert/is-strict-equal' );
*
* var bool = isStrictEqual( true, true );
* // returns true
*
* bool = isStrictEqual( 3.14, 3.14 );
* // returns true
*
* bool = isStrictEqual( {}, {} );
* // returns false
*
* bool = isStrictEqual( -0.0, -0.0 );
* // returns true
*
* bool = isStrictEqual( -0.0, 0.0 );
* // returns false
*
* bool = isStrictEqual( NaN, NaN );
* // returns false
*
* bool = isStrictEqual( [], [] );
* // returns false
*/

// MODULES //

var isStrictEqual = require( './is_strict_equal.js' );


// EXPORTS //

module.exports = isStrictEqual;

},{"./is_strict_equal.js":253}],253:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Tests if two arguments are strictly equal.
*
* ## Notes
*
* * In contrast to the strict equality operator `===`, `-0` and `+0` are distinguishable.
*
*
* @param {*} a - first input value
* @param {*} b - second input value
* @returns {boolean} boolean indicating whether two arguments are strictly equal
*
* @example
* var bool = isStrictEqual( true, true );
* // returns true
*
* @example
* var bool = isStrictEqual( 3.14, 3.14 );
* // returns true
*
* @example
* var bool = isStrictEqual( {}, {} );
* // returns false
*
* @example
* var bool = isStrictEqual( -0.0, -0.0 );
* // returns true
*
* @example
* var bool = isStrictEqual( -0.0, 0.0 );
* // returns false
*
* @example
* var bool = isStrictEqual( NaN, NaN );
* // returns false
*
* @example
* var bool = isStrictEqual( [], [] );
* // returns false
*/
function isStrictEqual( a, b ) {
	if ( a === b ) {
		if ( a === 0.0 ) {
			return 1.0 / a === 1.0 / b; // handles +-0
		}
		return true;
	}
	return false;
} // end FUNCTION isStrictEqual()


// EXPORTS //

module.exports = isStrictEqual;

},{}],254:[function(require,module,exports){
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

},{"@stdlib/assert/is-string":256,"@stdlib/assert/tools/array-function":314,"@stdlib/utils/define-read-only-property":356}],255:[function(require,module,exports){
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
} // end FUNCTION isString()


// EXPORTS //

module.exports = isString;

},{"./object.js":257,"./primitive.js":258}],256:[function(require,module,exports){
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

},{"./generic.js":255,"./object.js":257,"./primitive.js":258,"@stdlib/utils/define-read-only-property":356}],257:[function(require,module,exports){
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
} // end FUNCTION isString()


// EXPORTS //

module.exports = isString;

},{"./try2valueof.js":259,"@stdlib/utils/detect-tostringtag-support":360,"@stdlib/utils/native-class":369}],258:[function(require,module,exports){
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
} // end FUNCTION isString()


// EXPORTS //

module.exports = isString;

},{}],259:[function(require,module,exports){
'use strict';

// MODULES //

var valueOf = require( './valueof.js' ); // eslint-disable-line no-redeclare


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
} // end FUNCTION test()


// EXPORTS //

module.exports = test;

},{"./valueof.js":260}],260:[function(require,module,exports){
'use strict';

// eslint-disable-next-line no-redeclare
var valueOf = String.prototype.valueOf; // non-generic


// EXPORTS //

module.exports = valueOf;

},{}],261:[function(require,module,exports){
'use strict';

/**
* Test if a value is an array-like object containing only symbols.
*
* @module @stdlib/assert/is-symbol-array
*
* @example
* var isSymbolArray = require( '@stdlib/assert/is-symbol-array' );
*
* var bool = isSymbolArray( [ Symbol( 'abc' ), Symbol( 'def' ) ] );
* // returns true
*
* bool = isSymbolArray( [ Symbol( 'abc' ), 'def' ] );
* // returns false
*
* @example
* // Use interface to check for primitives...
* var isSymbolArray = require( '@stdlib/assert/is-symbol-array' ).primitives;
*
* var bool = isSymbolArray( [ Symbol( 'abc' ), Symbol( 'def' ) ] );
* // returns true
*
* bool = isSymbolArray( [ Symbol( 'abc' ), Object( Symbol( 'def' ) ) ] );
* // returns false
*
* @example
* // Use interface to check for objects...
* var isSymbolArray = require( '@stdlib/assert/is-symbol-array' ).objects;
*
* var bool = isSymbolArray( [ Object( Symbol( 'abc' ) ), Object( Symbol( 'def' ) ) ] );
* // returns true
*
* bool = isSymbolArray( [ Symbol( 'abc' ), Symbol( 'def' ) ] );
* // returns false
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var arrayfun = require( '@stdlib/assert/tools/array-like-function' );
var isSymbol = require( '@stdlib/assert/is-symbol' );


// MAIN //

var isSymbolArray = arrayfun( isSymbol );
setReadOnly( isSymbolArray, 'primitives', arrayfun( isSymbol.isPrimitive ) );
setReadOnly( isSymbolArray, 'objects', arrayfun( isSymbol.isObject ) );


// EXPORTS //

module.exports = isSymbolArray;

},{"@stdlib/assert/is-symbol":263,"@stdlib/assert/tools/array-like-function":316,"@stdlib/utils/define-read-only-property":356}],262:[function(require,module,exports){
'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is a symbol.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a symbol
*/
function isSymbol( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
} // end FUNCTION isSymbol()


// EXPORTS //

module.exports = isSymbol;

},{"./object.js":265,"./primitive.js":267}],263:[function(require,module,exports){
'use strict';

/**
* Test if a value is a symbol.
*
* @module @stdlib/assert/is-symbol
*
* @example
* var isSymbol = require( '@stdlib/assert/is-symbol' );
*
* var bool = isSymbol( Symbol( 'beep' ) );
* // returns true
*
* bool = isSymbol( Object( Symbol( 'beep' ) ) );
* // returns true
*
* bool = isSymbol( {} );
* // returns false
*
* @example
* var isSymbol = require( '@stdlib/assert/is-symbol' ).isPrimitive;
*
* var bool = isSymbol( Symbol( 'beep' ) );
* // returns true
*
* bool = isSymbol( Object( Symbol( 'beep' ) ) );
* // returns false
*
* bool = isSymbol( {} );
* // returns false
*
* @example
* var isSymbolObject = require( '@stdlib/assert/is-symbol' ).isObject;
*
* var bool = isSymbolObject( Symbol( 'beep' ) );
* // returns false
*
* bool = isSymbolObject( Object( Symbol( 'beep' ) ) );
* // returns true
*
* bool = isSymbolObject( {} );
* // returns false
*/

// MODULES //

var hasSymbols = require( '@stdlib/utils/detect-symbol-support' )();


// MAIN //

var isSymbol;
if ( hasSymbols ) {
	isSymbol = require( './is_symbol.js' );
} else {
	isSymbol = require( './polyfill.js' );
}


// EXPORTS //

module.exports = isSymbol;

},{"./is_symbol.js":264,"./polyfill.js":266,"@stdlib/utils/detect-symbol-support":358}],264:[function(require,module,exports){
'use strict';

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isSymbol = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isSymbol, 'isPrimitive', isPrimitive );
setReadOnly( isSymbol, 'isObject', isObject );


// EXPORTS //

module.exports = isSymbol;

},{"./generic.js":262,"./object.js":265,"./primitive.js":267,"@stdlib/utils/define-read-only-property":356}],265:[function(require,module,exports){
'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );
var test = require( './try2tostring.js' );


// MAIN //

/**
* Tests if a value is a symbol object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a symbol object
*/
function isSymbol( value ) {
	return (
		typeof value === 'object' &&
		nativeClass( value ) === '[object Symbol]' &&
		test( value )
	);
} // end FUNCTION isSymbol()


// EXPORTS //

module.exports = isSymbol;

},{"./try2tostring.js":269,"@stdlib/utils/native-class":369}],266:[function(require,module,exports){
'use strict';

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var constantFunction = require( '@stdlib/utils/constant-function' );


// MAIN //

var isSymbol = constantFunction( false );
var isPrimitive = constantFunction( false );
var isObject = constantFunction( false );

setReadOnly( isSymbol, 'isPrimitive', isPrimitive );
setReadOnly( isSymbol, 'isObject', isObject );


// EXPORTS //

module.exports = isSymbol;

},{"@stdlib/utils/constant-function":352,"@stdlib/utils/define-read-only-property":356}],267:[function(require,module,exports){
'use strict';

/**
* Tests if a value is a symbol primitive.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a symbol primitive
*/
function isSymbol( value ) {
	return ( typeof value === 'symbol' );
} // end FUNCTION isSymbol()


// EXPORTS //

module.exports = isSymbol;

},{}],268:[function(require,module,exports){
'use strict';

/*
* Note: we wrap `toString` to allow loading this file in non-ES2015 environments.
*/

// MAIN //

/**
* Attempts to serialize a value as a symbol.
*
* @private
* @param {*} value - value to serialize
* @returns {string} serialized value
*/
function toStr( value ) {
	// Non-generic:
	return Symbol.prototype.toString.call( value );
} // end FUNCTION toStr()


// EXPORTS //

module.exports = toStr;

},{}],269:[function(require,module,exports){
'use strict';

// MODULES //

var toStr = require( './tostring.js' );


// VARIABLES //

var RE = /^Symbol\(.*\)$/;


// MAIN //

/**
* Attempts to call a `Symbol` method.
*
* @private
* @param {*} value - value to test
* @returns {boolean} boolean indicating if able to call a `Symbol` method
*/
function test( value ) {
	try {
		return (
			// Objects created via `Object.create( null )` have no `valueOf()` method:
			typeof value.valueOf() === 'symbol' &&

			// Test output of a non-generic method:
			RE.test( toStr( value ) )
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		return false;
	}
} // end FUNCTION test()


// EXPORTS //

module.exports = test;

},{"./tostring.js":268}],270:[function(require,module,exports){
'use strict';

/**
* Test if a value is a `SyntaxError` object.
*
* @module @stdlib/assert/is-syntax-error
*
* @example
* var isSyntaxError = require( '@stdlib/assert/is-syntax-error' );
*
* var bool = isSyntaxError( new SyntaxError( 'beep' ) );
* // returns true
*
* bool = isSyntaxError( {} );
* // returns false
*/

// MODULES //

var isSyntaxError = require( './is_syntax_error.js' );


// EXPORTS //

module.exports = isSyntaxError;

},{"./is_syntax_error.js":271}],271:[function(require,module,exports){
'use strict';

// MODULES //

var getPrototypeOf = require( '@stdlib/utils/get-prototype-of' );
var typeOf = require( '@stdlib/utils/type-of' );
var isError = require( '@stdlib/assert/is-error' );


// MAIN //

/**
* Tests if a value is a `SyntaxError` object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether a value is a `SyntaxError` object
*
* @example
* var bool = isSyntaxError( new SyntaxError( 'beep' ) );
* // returns true
*
* @example
* var bool = isSyntaxError( {} );
* // returns false
*/
function isSyntaxError( value ) {
	if ( typeof value !== 'object' || value === null ) {
		return false;
	}
	// Check for `SyntaxError` objects from the same realm (same Node.js `vm` or same `Window` object)...
	if ( value instanceof SyntaxError ) {
		return true;
	}
	// All `SyntaxError` objects are `Error` objects...
	if ( isError( value ) ) {
		// Walk the prototype tree until we find the desired constructor...
		while ( value ) {
			if ( typeOf( value ) === 'syntaxerror' ) {
				return true;
			}
			value = getPrototypeOf( value );
		}
	}
	return false;
} // end FUNCTION isSyntaxError()


// EXPORTS //

module.exports = isSyntaxError;

},{"@stdlib/assert/is-error":79,"@stdlib/utils/get-prototype-of":365,"@stdlib/utils/type-of":380}],272:[function(require,module,exports){
'use strict';

/**
* Test if a value is an array-like object containing only truthy values.
*
* @module @stdlib/assert/is-truthy-array
*
* @example
* var isTruthyArray = require( '@stdlib/assert/is-truthy-array' );
*
* var bool = isTruthyArray( [ {}, [] ] );
* // returns true

* bool = isTruthyArray( [ false, null, void 0, '', 0, NaN ] );
* // returns false
*
* bool = isTruthyArray( [] );
* // returns false
*/

// MODULES //

var arrayfun = require( '@stdlib/assert/tools/array-like-function' );
var isTruthy = require( '@stdlib/assert/is-truthy' );


// MAIN //

var isTruthyArray = arrayfun( isTruthy );


// EXPORTS //

module.exports = isTruthyArray;

},{"@stdlib/assert/is-truthy":273,"@stdlib/assert/tools/array-like-function":316}],273:[function(require,module,exports){
'use strict';

/**
* Test if a value is truthy.
*
* @module @stdlib/assert/is-truthy
*
* @example
* var isTruthy = require( '@stdlib/assert/is-truthy' );
*
* var bool = isTruthy( true );
* // returns true
*
* bool = isTruthy( [] );
* // returns true
*
* bool = isTruthy( false );
* // returns false
*
* bool = isTruthy( null );
* // returns false
*
* bool = isTruthy( '' );
* // returns false
*
* bool = isTruthy( 0 );
* // returns false
*
* bool = isTruthy( void 0 );
* // returns false
*
* bool = isTruthy( NaN );
* // returns false
*/

// MODULES //

var isTruthy = require( './is_truthy.js' );


// EXPORTS //

module.exports = isTruthy;

},{"./is_truthy.js":274}],274:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Tests if a value is truthy.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether a value is truthy
*
* @example
* var bool = isTruthy( true );
* // returns true
*
* @example
* var bool = isTruthy( [] );
* // returns true
*
* @example
* var bool = isTruthy( false );
* // returns false
*
* @example
* var bool = isTruthy( null );
* // returns false
*
* @example
* var bool = isTruthy( '' );
* // returns false
*
* @example
* var bool = isTruthy( 0 );
* // returns false
*
* @example
* var bool = isTruthy( void 0 );
* // returns false
*
* @example
* var bool = isTruthy( NaN );
* // returns false
*/
function isTruthy( value ) {
	return ( value ) ? true : false; // eslint-disable-line no-unneeded-ternary
} // end FUNCTION isTruthy()


// EXPORTS //

module.exports = isTruthy;

},{}],275:[function(require,module,exports){
'use strict';

/**
* Test if a value is a `TypeError` object.
*
* @module @stdlib/assert/is-type-error
*
* @example
* var isTypeError = require( '@stdlib/assert/is-type-error' );
*
* var bool = isTypeError( new TypeError( 'beep' ) );
* // returns true
*
* bool = isTypeError( {} );
* // returns false
*/

// MODULES //

var isTypeError = require( './is_type_error.js' );


// EXPORTS //

module.exports = isTypeError;

},{"./is_type_error.js":276}],276:[function(require,module,exports){
'use strict';

// MODULES //

var getPrototypeOf = require( '@stdlib/utils/get-prototype-of' );
var typeOf = require( '@stdlib/utils/type-of' );
var isError = require( '@stdlib/assert/is-error' );


// MAIN //

/**
* Tests if a value is a `TypeError` object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether a value is a `TypeError` object
*
* @example
* var bool = isTypeError( new TypeError( 'beep' ) );
* // returns true
*
* @example
* var bool = isTypeError( {} );
* // returns false
*/
function isTypeError( value ) {
	if ( typeof value !== 'object' || value === null ) {
		return false;
	}
	// Check for `TypeError` objects from the same realm (same Node.js `vm` or same `Window` object)...
	if ( value instanceof TypeError ) {
		return true;
	}
	// All `TypeError` objects are `Error` objects...
	if ( isError( value ) ) {
		// Walk the prototype tree until we find the desired constructor...
		while ( value ) {
			if ( typeOf( value ) === 'typeerror' ) {
				return true;
			}
			value = getPrototypeOf( value );
		}
	}
	return false;
} // end FUNCTION isTypeError()


// EXPORTS //

module.exports = isTypeError;

},{"@stdlib/assert/is-error":79,"@stdlib/utils/get-prototype-of":365,"@stdlib/utils/type-of":380}],277:[function(require,module,exports){
'use strict';

/**
* Test if a value is typed-array-like.
*
* @module @stdlib/assert/is-typed-array-like
*
* @example
* var isTypedArrayLike = require( '@stdlib/assert/is-typed-array-like' );
*
* var bool = isTypedArrayLike( new Int16Array() );
* // returns true
*
* bool = isTypedArrayLike({
*	'length': 10,
*	'byteOffset': 0,
*	'byteLength': 10,
*	'BYTES_PER_ELEMENT': 4
* });
* // returns true
*/

// MODULES //

var isTypedArrayLike = require( './is_typed_array_like.js' );


// EXPORTS //

module.exports = isTypedArrayLike;

},{"./is_typed_array_like.js":278}],278:[function(require,module,exports){
'use strict';

// MODULES //

var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;
var MAX = require( '@stdlib/math/constants/uint32-max' );


// MAIN //

/**
* Tests if a value is typed-array-like.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is typed-array-like
*
* @example
* var arr = {
*	'BYTES_PER_ELEMENT': 8,
*	'length': 10,
*	'byteOffset': 0,
*	'byteLength': 10
* };
* var val = isTypedArrayLike( arr );
* // returns true
*
* @example
* var val = isTypedArrayLike( new Int8Array( 4 ) );
* // returns true
*
* @example
* var val = isTypedArrayLike( [] );
* // returns false
*
* @example
* var val = isTypedArrayLike( {} );
* // returns false
*
* @example
* var val = isTypedArrayLike( null );
* // returns false
*
* @example
* var val = isTypedArrayLike( 'beep' );
* // returns false
*/
function isTypedArrayLike( value ) {
	return (
		value !== null &&
		typeof value === 'object' &&
		isNonNegativeInteger( value.length ) &&
		value.length <= MAX &&
		isNumber( value.BYTES_PER_ELEMENT ) &&
		isNumber( value.byteOffset ) &&
		isNumber( value.byteLength )
	);
} // end FUNCTION isTypedArrayLike()


// EXPORTS //

module.exports = isTypedArrayLike;

},{"@stdlib/assert/is-nonnegative-integer":168,"@stdlib/assert/is-number":191,"@stdlib/math/constants/uint32-max":338}],279:[function(require,module,exports){
'use strict';

// MAIN //

var CTORS = [
	Float64Array,
	Float32Array,
	Int32Array,
	Uint32Array,
	Int16Array,
	Uint16Array,
	Int8Array,
	Uint8Array,
	Uint8ClampedArray
];


// EXPORTS //

module.exports = CTORS;

},{}],280:[function(require,module,exports){
'use strict';

/**
* Test if a value is a typed array.
*
* @module @stdlib/assert/is-typed-array
*
* @example
* var isTypedArray = require( '@stdlib/assert/is-typed-array' );
*
* var bool = isTypedArray( new Int8Array( 10 ) );
* // returns true
*/

// MODULES //

var isTypedArray = require( './is_typed_array.js' );


// EXPORTS //

module.exports = isTypedArray;

},{"./is_typed_array.js":281}],281:[function(require,module,exports){
'use strict';

// MODULES //

var ctorName = require( '@stdlib/utils/constructor-name' );
var instanceOf = require( '@stdlib/assert/instance-of' );
var getPrototypeOf = require( '@stdlib/utils/get-prototype-of' );
var CTORS = require( './ctors.js' );
var NAMES = require( './names.json' );


// MAIN //

/**
* Tests if a value is a typed array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a typed array
*
* @example
* var bool = isTypedArray( new Int8Array( 10 ) );
* // returns true
*/
function isTypedArray( value ) {
	var v;
	var i;

	if ( typeof value !== 'object' || value === null ) {
		return false;
	}
	// Check for typed array objects from the same realm (same Node.js `vm` or same `Window` object)...
	for ( i = 0; i < CTORS.length; i++ ) {
		if ( instanceOf( value, CTORS[ i ] ) ) {
			return true;
		}
	}
	// Walk the prototype tree until we find an object having a desired native class...
	while ( value ) {
		v = ctorName( value );
		for ( i = 0; i < NAMES.length; i++ ) {
			if ( NAMES[ i ] === v ) {
				return true;
			}
		}
		value = getPrototypeOf( value );
	}

	return false;
} // end FUNCTION isTypedArray()


// EXPORTS //

module.exports = isTypedArray;

},{"./ctors.js":279,"./names.json":282,"@stdlib/assert/instance-of":9,"@stdlib/utils/constructor-name":354,"@stdlib/utils/get-prototype-of":365}],282:[function(require,module,exports){
module.exports=[
	"Int8Array",
	"Uint8Array",
	"Uint8ClampedArray",
	"Int16Array",
	"Uint16Array",
	"Int32Array",
	"Uint32Array",
	"Float32Array",
	"Float64Array"
]

},{}],283:[function(require,module,exports){
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

},{"./is_uint16array.js":284}],284:[function(require,module,exports){
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
} // end FUNCTION isUint16Array()


// EXPORTS //

module.exports = isUint16Array;

},{"@stdlib/utils/native-class":369}],285:[function(require,module,exports){
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

},{"./is_uint32array.js":286}],286:[function(require,module,exports){
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
} // end FUNCTION isUint32Array()


// EXPORTS //

module.exports = isUint32Array;

},{"@stdlib/utils/native-class":369}],287:[function(require,module,exports){
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

},{"./is_uint8array.js":288}],288:[function(require,module,exports){
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
} // end FUNCTION isUint8Array()


// EXPORTS //

module.exports = isUint8Array;

},{"@stdlib/utils/native-class":369}],289:[function(require,module,exports){
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

},{"./is_uint8array_clamped.js":290}],290:[function(require,module,exports){
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
} // end FUNCTION isUint8ClampedArray()


// EXPORTS //

module.exports = isUint8ClampedArray;

},{"@stdlib/utils/native-class":369}],291:[function(require,module,exports){
'use strict';

/**
* Test if a value is a UNC path.
*
* @module @stdlib/assert/is-unc-path
*
* @example
* var isUNCPath = require( '@stdlib/assert/is-unc-path' );
*
* var bool = isUNCPath( '\\\\server\\share\\foo\\bar\\baz' );
* // returns true
*
* bool = isUNCPath( '/foo/bar/baz' );
* // returns false
*/

// MODULES //

var isUNCPath = require( './is_unc_path.js' );


// EXPORTS //

module.exports = isUNCPath;

},{"./is_unc_path.js":292}],292:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var RE_UNC_PATH = require( '@stdlib/regexp/unc-path' );


// MAIN //

/**
* Tests if a value is a UNC path.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a UNC path
*
* @example
* var bool = isUNCPath( '\\\\server\\share\\foo\\bar\\baz' );
* // returns true
*
* @example
* var bool = isUNCPath( '/foo/bar/baz' );
* // returns false
*/
function isUNCPath( value ) {
	return (
		isString( value ) &&
		RE_UNC_PATH.test( value )
	);
} // end FUNCTION isUNCPath()


// EXPORTS //

module.exports = isUNCPath;

},{"@stdlib/assert/is-string":256,"@stdlib/regexp/unc-path":343}],293:[function(require,module,exports){
'use strict';

/**
* Test if a value is `undefined` or `null`.
*
* @module @stdlib/assert/is-undefined-or-null
*
* @example
* var isUndefinedOrNull = require( '@stdlib/assert/is-undefined-or-null' );
*
* var bool = isUndefinedOrNull( void 0 );
* // returns true
*
* bool = isUndefinedOrNull( null );
* // returns true
*
* bool = isUndefinedOrNull( false );
* // returns false
*/

// MODULES //

var isUndefinedOrNull = require( './is_undefined_or_null.js' );


// EXPORTS //

module.exports = isUndefinedOrNull;

},{"./is_undefined_or_null.js":294}],294:[function(require,module,exports){
'use strict';

/**
* Tests if a value is `undefined` or `null`.
*
* #### Notes
*
* * In older browsers, `undefined` is a global which can be overridden. `void`, however, is an operator which __cannot__ be overridden. Consequently, better to use `void` to check for `undefined`. See [Stack Overflow]{@link http://stackoverflow.com/a/19369078/2225624}.
*
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is undefined
*
* @example
* var bool = isUndefinedOrNull( undefined );
* // returns true
*
* bool = isUndefinedOrNull( null );
* // returns true
*
* bool = isUndefinedOrNull( false );
* // returns false
*/
function isUndefinedOrNull( value ) {
	return ( value === void 0 || value === null );
} // end FUNCTION isUndefinedOrNull()


// EXPORTS //

module.exports = isUndefinedOrNull;

},{}],295:[function(require,module,exports){
'use strict';

/**
* Test if a value is `undefined`.
*
* @module @stdlib/assert/is-undefined
*
* @example
* var isUndefined = require( '@stdlib/assert/is-undefined' );
*
* var bool = isUndefined( void 0 );
* // returns true
*
* bool = isUndefined( null );
* // returns false
*/

// MODULES //

var isUndefined = require( './is_undefined.js' );


// EXPORTS //

module.exports = isUndefined;

},{"./is_undefined.js":296}],296:[function(require,module,exports){
'use strict';

/**
* Tests if a value is `undefined`.
*
* #### Notes
*
* * In older browsers, `undefined` is a global which can be overridden. `void`, however, is an operator which __cannot__ be overridden. Consequently, better to use `void` to check for `undefined`. See [Stack Overflow]{@link http://stackoverflow.com/a/19369078/2225624}.
*
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is undefined
*
* @example
* var bool = isUndefined( undefined );
* // returns true
*
* bool = isUndefined( null );
* // returns false
*/
function isUndefined( value ) {
	return value === void 0;
} // end FUNCTION isUndefined()


// EXPORTS //

module.exports = isUndefined;

},{}],297:[function(require,module,exports){
'use strict';

/**
* Test if a value is an array of probabilities that sum to one.
*
* @module @stdlib/assert/is-unity-probability-array
*
* @example
* var isUnityProbabilityArray = require( '@stdlib/assert/is-unity-probability-array' );
*
* var bool = isUnityProbabilityArray( [ 0.25, 0.5, 0.25 ] );
* // returns true
*
* bool = isUnityProbabilityArray( new Uint8Array( [ 0, 1 ] ) );
* // returns true
*
* bool = isUnityProbabilityArray( [ 0.4, 0.4, 0.4 ] );
* // returns false
*
* bool = isUnityProbabilityArray( [ 3.14, 0.0 ] );
* // returns false
*/

// MODULES //

var isUnityProbabilityArray = require( './is_unity_probability_array.js' );


// EXPORTS //

module.exports = isUnityProbabilityArray;

},{"./is_unity_probability_array.js":298}],298:[function(require,module,exports){
'use strict';

// MODULES //

var isTypedArray = require( '@stdlib/assert/is-typed-array' );
var isArray = require( '@stdlib/assert/is-array' );
var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;
var absdiff = require( '@stdlib/math/base/utils/absolute-difference' );
var FLOAT64_SQRT_EPS = require( '@stdlib/math/constants/float64-sqrt-eps' );


// MAIN //

/**
* Tests if a value is an array of probabilities that sum to one.
*
* @param {*} v - value to test
* @returns {boolean} boolean indicating if a value is a probability array
*
* @example
* var bool = isUnityProbabilityArray( [ 0.25, 0.5, 0.25 ] );
* // returns true
*
* @example
* var bool = isUnityProbabilityArray( new Uint8Array( [ 0, 1 ] ) );
* // returns true
*
* @example
* var bool = isUnityProbabilityArray( [ 0.4, 0.4, 0.4 ] );
* // returns false
*
* @example
* var bool = isUnityProbabilityArray( [ 3.14, 0.0 ] );
* // returns false
*/
function isUnityProbabilityArray( v ) {
	var sum;
	var i;
	if ( isTypedArray( v ) ) {
		sum = 0.0;
		for ( i = 0; i < v.length; i++ ) {
			if (
				v[ i ] > 1.0 ||
				v[ i ] < 0.0
			) {
				return false;
			}
			sum += v[ i ];
		}
		return ( absdiff( sum, 1.0 ) <= FLOAT64_SQRT_EPS );
	}
	if ( isArray( v ) ) {
		sum = 0.0;
		for ( i = 0; i < v.length; i++ ) {
			if (
				!isNumber( v[ i ] ) ||
				v[ i ] > 1.0 ||
				v[ i ] < 0.0
			) {
				return false;
			}
			sum += v[ i ];
		}
		return ( absdiff( sum, 1.0 ) <= FLOAT64_SQRT_EPS );
	}
	return false;
} // end FUNCTION isUnityProbabilityArray()


// EXPORTS //

module.exports = isUnityProbabilityArray;

},{"@stdlib/assert/is-array":29,"@stdlib/assert/is-number":191,"@stdlib/assert/is-typed-array":280,"@stdlib/math/base/utils/absolute-difference":332,"@stdlib/math/constants/float64-sqrt-eps":337}],299:[function(require,module,exports){
'use strict';

/**
* Test if a value is an uppercase string.
*
* @module @stdlib/assert/is-uppercase
*
* @example
* var isUppercase = require( '@stdlib/assert/is-uppercase' );
*
* var bool = isUppercase( 'HELLO' );
* // returns true
*
* bool = isUppercase( 'World' );
* // returns false
*/

// MODULES //

var isUppercase = require( './is_uppercase.js' );


// EXPORTS //

module.exports = isUppercase;

},{"./is_uppercase.js":300}],300:[function(require,module,exports){
'use strict';

// MODULES //

var lowercase = require( '@stdlib/string/lowercase' );
var uppercase = require( '@stdlib/string/uppercase' );
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;


// MAIN //

/**
* Tests if a value is an uppercase string.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is an uppercase string
*
* @example
* var bool = isUppercase( 'HELLO' );
* // returns true
*
* @example
* var bool = isUppercase( 'World' );
* // returns false
*
* @example
* var bool = isUppercase( '!' );
* // returns false
*
* @example
* var bool = isUppercase( 'salt and light' );
* // returns false
*/
function isUppercase( value ) {
	return (
		isString( value ) &&
		value === uppercase( value ) &&
		value !== lowercase( value )
	);
} // end FUNCTION isUppercase()


// EXPORTS //

module.exports = isUppercase;

},{"@stdlib/assert/is-string":256,"@stdlib/string/lowercase":345,"@stdlib/string/uppercase":349}],301:[function(require,module,exports){
'use strict';

/**
* Test if a value is a `URIError` object.
*
* @module @stdlib/assert/is-uri-error
*
* @example
* var isURIError = require( '@stdlib/assert/is-uri-error' );
*
* var bool = isURIError( new URIError( 'beep' ) );
* // returns true
*
* bool = isURIError( {} );
* // returns false
*/

// MODULES //

var isURIError = require( './is_uri_error.js' );


// EXPORTS //

module.exports = isURIError;

},{"./is_uri_error.js":302}],302:[function(require,module,exports){
'use strict';

// MODULES //

var getPrototypeOf = require( '@stdlib/utils/get-prototype-of' );
var typeOf = require( '@stdlib/utils/type-of' );
var isError = require( '@stdlib/assert/is-error' );


// MAIN //

/**
* Tests if a value is a `URIError` object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether a value is a `URIError` object
*
* @example
* var bool = isURIError( new URIError( 'beep' ) );
* // returns true
*
* @example
* var bool = isURIError( {} );
* // returns false
*/
function isURIError( value ) {
	if ( typeof value !== 'object' || value === null ) {
		return false;
	}
	// Check for `URIError` objects from the same realm (same Node.js `vm` or same `Window` object)...
	if ( value instanceof URIError ) {
		return true;
	}
	// All `URIError` objects are `Error` objects...
	if ( isError( value ) ) {
		// Walk the prototype tree until we find the desired constructor...
		while ( value ) {
			if ( typeOf( value ) === 'urierror' ) {
				return true;
			}
			value = getPrototypeOf( value );
		}
	}
	return false;
} // end FUNCTION isURIError()


// EXPORTS //

module.exports = isURIError;

},{"@stdlib/assert/is-error":79,"@stdlib/utils/get-prototype-of":365,"@stdlib/utils/type-of":380}],303:[function(require,module,exports){
'use strict';

/**
* Test if a value is a URI.
*
* @module @stdlib/assert/is-uri
*
* @example
* var isURI = require( '@stdlib/assert/is-uri' );
*
* var bool = isURI( 'http://google.com' );
* // returns true
*
* bool = isURI( 'http://localhost/' );
* // returns true
*
* bool = isURI( 'http://example.w3.org/path%20with%20spaces.html' );
* // returns true
*
* bool = isURI( 'http://example.w3.org/%20' );
* // returns true
*
* bool = isURI( 'ftp://ftp.is.co.za/rfc/rfc1808.txt' );
* // returns true
*
* bool = isURI( 'ftp://ftp.is.co.za/../../../rfc/rfc1808.txt' );
* // returns true
*
* bool = isURI( 'http://www.ietf.org/rfc/rfc2396.txt' );
* // returns true
*
* bool = isURI( 'ldap://[2001:db8::7]/c=GB?objectClass?one' );
* // returns true
*
* bool = isURI( 'mailto:John.Doe@example.com' );
* // returns true
*
* bool = isURI( 'news:comp.infosystems.www.servers.unix' );
* // returns true
*
* bool = isURI( 'tel:+1-816-555-1212' );
* // returns true
*
* bool = isURI( 'telnet://192.0.2.16:80/' );
* // returns true
*
* bool = isURI( 'urn:oasis:names:specification:docbook:dtd:xml:4.1.2' );
* // returns true
*
* // No scheme:
* bool = isURI( '' );
* // returns false
*
* // No scheme:
* bool = isURI( 'foo' );
* // returns false
*
* // No scheme:
* bool = isURI( 'foo@bar' );
* // returns false
*
* // No scheme:
* bool = isURI( '://foo/' );
* // returns false
*
* // Illegal characters:
* bool = isURI( 'http://<foo>' );
* // returns false
*
* // Invalid path:
* bool = isURI( 'http:////foo.html' );
* // returns false
*
* // Incomplete hex escapes...
* bool = isURI( 'http://example.w3.org/%a' );
* // returns false
*
* bool = isURI( 'http://example.w3.org/%a/foo' );
* // returns false
*
* bool = isURI( 'http://example.w3.org/%at' );
* // returns false
*/

// MODULES //

var isURI = require( './is_uri.js' );


// EXPORTS //

module.exports = isURI;

},{"./is_uri.js":304}],304:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;


// VARIABLES //

/**
* Matches parts of a URI according to RFC 3986.
*
* ``` text
* <scheme name> : <hierarchical part > [ ? <query> ] [ # <fragment> ]
* ```
*
* Regular expression: `/(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*)(?:\?[^#]*)?(?:#.*)?/`
*
* * `(?:([^:\/?#]+):)`
*   - match the scheme, including the `:`, but only capture the scheme name
* * `?`
*   - match the scheme zero or one times
* * `(?:\/\/([^\/?#]*))`
*   - match the hierarchical part which is everything which is not a `/`, `#`, or `?`, but only capture whatever comes after the `//`
* * `?`
*   - match the hierarchical part zero or one times
* * `([^?#]*)`
*   - capture everything (the path) until meeting a `?` or `#`
* * `(?:\?[^#]*)`
*   - match, but don't capture, a query
* * `?`
*   - match the query zero or one times
* * `(?:#.*)`
*   - match, but don't capture, a fragment
* * `?`
*   - match the fragment zero or one times
*
* @private
* @constant
* @type {RegExp}
* @default /(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*)(?:\?[^#]*)?(?:#.*)?/
*/
var RE_URI = /(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*)(?:\?[^#]*)?(?:#.*)?/; // eslint-disable-line no-useless-escape

// Illegal characters (anything which is not in between the square brackets):
var RE_ILLEGALS = /[^a-z0-9:\/?#\[\]@!$&'()*+,;=.\-_~%]/i; // eslint-disable-line no-useless-escape

// Incomplete HEX escapes:
var RE_HEX1 = /%[^0-9a-f]/i;
var RE_HEX2 = /%[0-9a-f](:?[^0-9a-f]|$)/i;

// If authority is not present, path must not begin with '//'
var RE_PATH = /^\/\//;

// Scheme must begin with a letter, then consist of letters, digits, '+', '.', or '-' => e.g., 'http', 'https', 'ftp'
var RE_SCHEME = /^[a-z][a-z0-9+\-.]*$/;


// MAIN //

/**
* Tests if a value is a URI.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a URI
*
* @example
* var bool = isURI( 'http://google.com' );
* // returns true
*
* @example
* var bool = isURI( 'http://localhost/' );
* // returns true
*
* @example
* var bool = isURI( 'http://example.w3.org/path%20with%20spaces.html' );
* // returns true
*
* @example
* var bool = isURI( 'http://example.w3.org/%20' );
* // returns true
*
* @example
* var bool = isURI( 'ftp://ftp.is.co.za/rfc/rfc1808.txt' );
* // returns true
*
* @example
* var bool = isURI( 'ftp://ftp.is.co.za/../../../rfc/rfc1808.txt' );
* // returns true
*
* @example
* var bool = isURI( 'http://www.ietf.org/rfc/rfc2396.txt' );
* // returns true
*
* @example
* var bool = isURI( 'ldap://[2001:db8::7]/c=GB?objectClass?one' );
* // returns true
*
* @example
* var bool = isURI( 'mailto:John.Doe@example.com' );
* // returns true
*
* @example
* var bool = isURI( 'news:comp.infosystems.www.servers.unix' );
* // returns true
*
* @example
* var bool = isURI( 'tel:+1-816-555-1212' );
* // returns true
*
* @example
* var bool = isURI( 'telnet://192.0.2.16:80/' );
* // returns true
*
* @example
* var bool = isURI( 'urn:oasis:names:specification:docbook:dtd:xml:4.1.2' );
* // returns true
*
* @example
* var // No scheme:
* bool = isURI( '' );
* // returns false
*
* @example
* var // No scheme:
* bool = isURI( 'foo' );
* // returns false
*
* @example
* // No scheme:
* var bool = isURI( 'foo@bar' );
* // returns false
*
* @example
* // No scheme:
* var bool = isURI( '://foo/' );
* // returns false
*
* @example
* // Illegal characters:
* var bool = isURI( 'http://<foo>' );
* // returns false
*
* @example
* // Invalid path:
* var bool = isURI( 'http:////foo.html' );
* // returns false
*
* @example
* // Incomplete hex escapes...
* var bool = isURI( 'http://example.w3.org/%a' );
* // returns false
*
* @example
* var bool = isURI( 'http://example.w3.org/%a/foo' );
* // returns false
*
* @example
* var bool = isURI( 'http://example.w3.org/%at' );
* // returns false
*/
function isURI( value ) {
	var authority;
	var scheme;
	var parts;
	var path;

	if ( !isString( value ) ) {
		return false;
	}
	// Check for illegal characters:
	if ( RE_ILLEGALS.test( value ) ) {
		return false;
	}
	// Check for incomplete HEX escapes:
	if (
		RE_HEX1.test( value ) ||
		RE_HEX2.test( value )
	) {
		return false;
	}
	// Split the string into various URI components:
	parts = value.match( RE_URI );
	scheme = parts[ 1 ];
	authority = parts[ 2 ];
	path = parts[ 3 ];

	// Scheme is required and must be valid:
	if (
		!scheme ||
		!scheme.length ||
		!RE_SCHEME.test( scheme.toLowerCase() )
	) {
		return false;
	}
	// If authority is not present, path must not begin with `//`:
	if (
		!authority &&
		RE_PATH.test( path )
	) {
		return false;
	}
	return true;
} // end FUNCTION isURI()


// EXPORTS //

module.exports = isURI;

},{"@stdlib/assert/is-string":256}],305:[function(require,module,exports){
/* eslint-disable no-new-func */
'use strict';

/**
* Test if the global scope is bound to the "self" variable present in browser web worker environments. When creating a new function using the `Function(){}` constructor, the execution scope aliased by the `this` variable is the global scope.
*
* @private
* @returns {boolean} boolean indicating if global scope is bound to "self" variable
*/
function globalScope() {
	var fcn = '';
	fcn += 'try {';
	fcn += 'return this === self;';
	fcn += '} catch ( err ) {';
	fcn += 'return false;';
	fcn += '}';
	return (new Function( fcn ))();
} // end FUNCTION globalScope()


// EXPORTS //

module.exports = globalScope();

},{}],306:[function(require,module,exports){
'use strict';

/**
* Boolean indicating if the runtime is a web worker.
*
* @module @stdlib/assert/is-web-worker
*
* @example
* var IS_WEB_WORKER = require( '@stdlib/assert/is-web-worker' );
*
* var bool = IS_WEB_WORKER;
* // returns <boolean>
*/

// MODULES //

var isWebWorker = require( './is_web_worker.js' );


// EXPORTS //

module.exports = isWebWorker();

},{"./is_web_worker.js":307}],307:[function(require,module,exports){
/* global WorkerGlobalScope, WorkerNavigator, WorkerLocation, self, importScripts, navigator, location */
'use strict';

// MODULES //

var Global = require( 'system.global' )();
var isNode = require( '@stdlib/assert/is-node' );
var isObject = require( '@stdlib/assert/is-plain-object' );
var globalScope = require( './global_scope.js' );


// MAIN //

/**
* Returns a boolean indicating if the runtime is a web worker.
*
* @returns {boolean} boolean indicating if runtime is a web worker
*
* @example
* var bool = isWebWorker;
* // returns <boolean>
*/
function isWebWorker() {
	return (
		// Check that we are not running in a Node.js runtime:
		isNode === false &&

		// Check for presence of `WorkerGlobalScope` global variable:
		typeof WorkerGlobalScope === 'object' &&

		// Check for presence of `WorkerNavigator` global variable:
		isObject( WorkerNavigator ) &&

		// Check that the `navigator` global object is an instance of `WorkerNavigator`:
		navigator instanceof WorkerNavigator &&

		// Check for presence of `WorkerLocation` global variable:
		isObject( WorkerLocation ) &&

		// Check that the `location` global object is an instance of `WorkerLocation`:
		location instanceof WorkerLocation &&

		// Check for presence of `self` variable:
		typeof self === 'object' &&

		// Check that the `self` variable matches the determined global variable:
		self === Global &&

		// Check that the `self` variable is equal to the global scope:
		globalScope === true &&

		// Check for presence of `importScripts` function:
		typeof importScripts === 'function'
	);
} // end FUNCTION isWebWorker()


// EXPORTS //

module.exports = isWebWorker;

},{"./global_scope.js":305,"@stdlib/assert/is-node":165,"@stdlib/assert/is-plain-object":208,"system.global":438}],308:[function(require,module,exports){
'use strict';

/**
* Test whether a string contains only white space characters.
*
* @module @stdlib/assert/is-whitespace
*
* @example
* var isWhitespace = require( '@stdlib/assert/is-whitespace' );
*
* var out = isWhitespace( '          ' );
* // returns true
*
* out = isWhitespace( 'beep boop' );
* // returns false
*
* out = isWhitespace( '' );
* // returns false
*/

// MODULES //

var isWhitespace = require( './is_whitespace.js' );


// EXPORTS //

module.exports = isWhitespace;

},{"./is_whitespace.js":309}],309:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var RE_WHITESPACE = require( '@stdlib/regexp/whitespace' );


// VARIABLES //

var RE = new RegExp( '^'+RE_WHITESPACE.source+'+$' );


// MAIN //

/**
* Tests whether a string contains only white space characters.
*
* @param {*} x - value to test
* @returns {boolean} boolean indicating if a string contains only white space characters
*
* @example
* var out = isWhitespace( '           ' );
* // returns true
*
* @example
* var out = isWhitespace( 'beep boop' );
* // returns false
*
* @example
* var out = isWhitespace( '' );
* // returns false
*
* @example
* var out = isWhitespace( 123 );
* // returns false
*/
function isWhitespace( x ) {
	if ( !isString( x ) ) {
		return false;
	}
	return RE.test( x );
} // end FUNCTION isWhitespace()


// EXPORTS //

module.exports = isWhitespace;

},{"@stdlib/assert/is-string":256,"@stdlib/regexp/whitespace":344}],310:[function(require,module,exports){
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

var platform = require( '@stdlib/utils/platform' );


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

},{"@stdlib/utils/platform":374}],311:[function(require,module,exports){
'use strict';

/*
* When adding modules to the namespace, ensure that they are added in alphabetical order according to module name.
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );


// MAIN //

/**
* Top-level namespace.
*
* @namespace ns
*/
var ns = {};

/**
* @name contains
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/contains}
*/
setReadOnly( ns, 'contains', require( '@stdlib/assert/contains' ) );

/**
* @name hasOwnProp
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/has-own-property}
*/
setReadOnly( ns, 'hasOwnProp', require( '@stdlib/assert/has-own-property' ) );

/**
* @name hasProp
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/has-property}
*/
setReadOnly( ns, 'hasProp', require( '@stdlib/assert/has-property' ) );

/**
* @name hasPrototype
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/has-prototype}
*/
setReadOnly( ns, 'hasPrototype', require( '@stdlib/assert/has-prototype' ) );

/**
* @name instanceOf
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/instance-of}
*/
setReadOnly( ns, 'instanceOf', require( '@stdlib/assert/instance-of' ) );

/**
* @name isAbsolutePath
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-absolute-path}
*/
setReadOnly( ns, 'isAbsolutePath', require( '@stdlib/assert/is-absolute-path' ) );

/**
* @name isAlphagram
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-alphagram}
*/
setReadOnly( ns, 'isAlphagram', require( '@stdlib/assert/is-alphagram' ) );

/**
* @name isAnagram
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-anagram}
*/
setReadOnly( ns, 'isAnagram', require( '@stdlib/assert/is-anagram' ) );

/**
* @name isArguments
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-arguments}
*/
setReadOnly( ns, 'isArguments', require( '@stdlib/assert/is-arguments' ) );

/**
* @name isArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-array}
*/
setReadOnly( ns, 'isArray', require( '@stdlib/assert/is-array' ) );

/**
* @name isArrayArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-array-array}
*/
setReadOnly( ns, 'isArrayArray', require( '@stdlib/assert/is-array-array' ) );

/**
* @name isArrayLength
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-array-length}
*/
setReadOnly( ns, 'isArrayLength', require( '@stdlib/assert/is-array-length' ) );

/**
* @name isArrayLike
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-array-like}
*/
setReadOnly( ns, 'isArrayLike', require( '@stdlib/assert/is-array-like' ) );

/**
* @name isArrayLikeObject
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-array-like-object}
*/
setReadOnly( ns, 'isArrayLikeObject', require( '@stdlib/assert/is-array-like-object' ) );

/**
* @name isArrayBuffer
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-arraybuffer}
*/
setReadOnly( ns, 'isArrayBuffer', require( '@stdlib/assert/is-arraybuffer' ) );

/**
* @name isASCII
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-ascii}
*/
setReadOnly( ns, 'isASCII', require( '@stdlib/assert/is-ascii' ) );

/**
* @name isBetween
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-between}
*/
setReadOnly( ns, 'isBetween', require( '@stdlib/assert/is-between' ) );

/**
* @name isBetweenArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-between-array}
*/
setReadOnly( ns, 'isBetweenArray', require( '@stdlib/assert/is-between-array' ) );

/**
* @name isBinaryString
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-binary-string}
*/
setReadOnly( ns, 'isBinaryString', require( '@stdlib/assert/is-binary-string' ) );

/**
* @name isBoolean
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-boolean}
*/
setReadOnly( ns, 'isBoolean', require( '@stdlib/assert/is-boolean' ) );

/**
* @name isBooleanArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-boolean-array}
*/
setReadOnly( ns, 'isBooleanArray', require( '@stdlib/assert/is-boolean-array' ) );

/**
* @name IS_BROWSER
* @memberof ns
* @readonly
* @type {boolean}
* @see {@link module:@stdlib/assert/is-browser}
*/
setReadOnly( ns, 'IS_BROWSER', require( '@stdlib/assert/is-browser' ) );

/**
* @name isBuffer
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-buffer}
*/
setReadOnly( ns, 'isBuffer', require( '@stdlib/assert/is-buffer' ) );

/**
* @name isCapitalized
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-capitalized}
*/
setReadOnly( ns, 'isCapitalized', require( '@stdlib/assert/is-capitalized' ) );

/**
* @name isCollection
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-collection}
*/
setReadOnly( ns, 'isCollection', require( '@stdlib/assert/is-collection' ) );

/**
* @name IS_DARWIN
* @memberof ns
* @readonly
* @type {boolean}
* @see {@link module:@stdlib/assert/is-darwin}
*/
setReadOnly( ns, 'IS_DARWIN', require( '@stdlib/assert/is-darwin' ) );

/**
* @name isDateObject
* @memberof ns
* @readonly
* @type {boolean}
* @type {Function}
* @see {@link module:@stdlib/assert/is-date-object}
*/
setReadOnly( ns, 'isDateObject', require( '@stdlib/assert/is-date-object' ) );

/**
* @name isDigitString
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-digit-string}
*/
setReadOnly( ns, 'isDigitString', require( '@stdlib/assert/is-digit-string' ) );

/**
* @name IS_ELECTRON
* @memberof ns
* @readonly
* @type {boolean}
* @see {@link module:@stdlib/assert/is-electron}
*/
setReadOnly( ns, 'IS_ELECTRON', require( '@stdlib/assert/is-electron' ) );

/**
* @name IS_ELECTRON_MAIN
* @memberof ns
* @readonly
* @type {boolean}
* @see {@link module:@stdlib/assert/is-electron-main}
*/
setReadOnly( ns, 'IS_ELECTRON_MAIN', require( '@stdlib/assert/is-electron-main' ) );

/**
* @name IS_ELECTRON_RENDERER
* @memberof ns
* @readonly
* @type {boolean}
* @see {@link module:@stdlib/assert/is-electron-renderer}
*/
setReadOnly( ns, 'IS_ELECTRON_RENDERER', require( '@stdlib/assert/is-electron-renderer' ) );

/**
* @name isEmailAddress
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-email-address}
*/
setReadOnly( ns, 'isEmailAddress', require( '@stdlib/assert/is-email-address' ) );

/**
* @name isEmptyArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-empty-array}
*/
setReadOnly( ns, 'isEmptyArray', require( '@stdlib/assert/is-empty-array' ) );

/**
* @name isEmptyObject
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-empty-object}
*/
setReadOnly( ns, 'isEmptyObject', require( '@stdlib/assert/is-empty-object' ) );

/**
* @name isEmptyString
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-empty-string}
*/
setReadOnly( ns, 'isEmptyString', require( '@stdlib/assert/is-empty-string' ) );

/**
* @name isEnumerableProperty
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-enumerable-property}
*/
setReadOnly( ns, 'isEnumerableProperty', require( '@stdlib/assert/is-enumerable-property' ) );

/**
* @name isError
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-error}
*/
setReadOnly( ns, 'isError', require( '@stdlib/assert/is-error' ) );

/**
* @name isEvalError
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-eval-error}
*/
setReadOnly( ns, 'isEvalError', require( '@stdlib/assert/is-eval-error' ) );

/**
* @name isEven
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-even}
*/
setReadOnly( ns, 'isEven', require( '@stdlib/assert/is-even' ) );

/**
* @name isFalsy
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-falsy}
*/
setReadOnly( ns, 'isFalsy', require( '@stdlib/assert/is-falsy' ) );

/**
* @name isFalsyArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-falsy-array}
*/
setReadOnly( ns, 'isFalsyArray', require( '@stdlib/assert/is-falsy-array' ) );

/**
* @name isFinite
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-finite}
*/
setReadOnly( ns, 'isFinite', require( '@stdlib/assert/is-finite' ) );

/**
* @name isFiniteArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-finite-array}
*/
setReadOnly( ns, 'isFiniteArray', require( '@stdlib/assert/is-finite-array' ) );

/**
* @name isFloat32Array
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-float32array}
*/
setReadOnly( ns, 'isFloat32Array', require( '@stdlib/assert/is-float32array' ) );

/**
* @name isFloat64Array
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-float64array}
*/
setReadOnly( ns, 'isFloat64Array', require( '@stdlib/assert/is-float64array' ) );

/**
* @name isFunction
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-function}
*/
setReadOnly( ns, 'isFunction', require( '@stdlib/assert/is-function' ) );

/**
* @name isFunctionArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-function-array}
*/
setReadOnly( ns, 'isFunctionArray', require( '@stdlib/assert/is-function-array' ) );

/**
* @name isHexString
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-hex-string}
*/
setReadOnly( ns, 'isHexString', require( '@stdlib/assert/is-hex-string' ) );

/**
* @name isInfinite
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-infinite}
*/
setReadOnly( ns, 'isInfinite', require( '@stdlib/assert/is-infinite' ) );

/**
* @name isInt16Array
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-int16array}
*/
setReadOnly( ns, 'isInt16Array', require( '@stdlib/assert/is-int16array' ) );

/**
* @name isInt32Array
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-int32array}
*/
setReadOnly( ns, 'isInt32Array', require( '@stdlib/assert/is-int32array' ) );

/**
* @name isInt8Array
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-int8array}
*/
setReadOnly( ns, 'isInt8Array', require( '@stdlib/assert/is-int8array' ) );

/**
* @name isInteger
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-integer}
*/
setReadOnly( ns, 'isInteger', require( '@stdlib/assert/is-integer' ) );

/**
* @name isIntegerArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-integer-array}
*/
setReadOnly( ns, 'isIntegerArray', require( '@stdlib/assert/is-integer-array' ) );

/**
* @name isJSON
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-json}
*/
setReadOnly( ns, 'isJSON', require( '@stdlib/assert/is-json' ) );

/**
* @name isLeapYear
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-leap-year}
*/
setReadOnly( ns, 'isLeapYear', require( '@stdlib/assert/is-leap-year' ) );

/**
* @name IS_LITTLE_ENDIAN
* @memberof ns
* @readonly
* @type {boolean}
* @see {@link module:@stdlib/assert/is-little-endian}
*/
setReadOnly( ns, 'IS_LITTLE_ENDIAN', require( '@stdlib/assert/is-little-endian' ) );

/**
* @name isLowercase
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-lowercase}
*/
setReadOnly( ns, 'isLowercase', require( '@stdlib/assert/is-lowercase' ) );

/**
* @name isMatrix
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-matrix}
*/
setReadOnly( ns, 'isMatrix', require( '@stdlib/assert/is-matrix' ) );

/**
* @name isMatrixLike
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-matrix-like}
*/
setReadOnly( ns, 'isMatrixLike', require( '@stdlib/assert/is-matrix-like' ) );

/**
* @name isnan
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-nan}
*/
setReadOnly( ns, 'isnan', require( '@stdlib/assert/is-nan' ) );

/**
* @name isNaNArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-nan-array}
*/
setReadOnly( ns, 'isNaNArray', require( '@stdlib/assert/is-nan-array' ) );

/**
* @name isNativeFunction
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-native-function}
*/
setReadOnly( ns, 'isNativeFunction', require( '@stdlib/assert/is-native-function' ) );

/**
* @name isNegativeInteger
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-negative-integer}
*/
setReadOnly( ns, 'isNegativeInteger', require( '@stdlib/assert/is-negative-integer' ) );

/**
* @name isNegativeIntegerArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-negative-integer-array}
*/
setReadOnly( ns, 'isNegativeIntegerArray', require( '@stdlib/assert/is-negative-integer-array' ) );

/**
* @name isNegativeNumber
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-negative-number}
*/
setReadOnly( ns, 'isNegativeNumber', require( '@stdlib/assert/is-negative-number' ) );

/**
* @name isNegativeNumberArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-negative-number-array}
*/
setReadOnly( ns, 'isNegativeNumberArray', require( '@stdlib/assert/is-negative-number-array' ) );

/**
* @name isNegativeZero
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-negative-zero}
*/
setReadOnly( ns, 'isNegativeZero', require( '@stdlib/assert/is-negative-zero' ) );

/**
* @name IS_NODE
* @memberof ns
* @readonly
* @type {boolean}
* @see {@link module:@stdlib/assert/is-node}
*/
setReadOnly( ns, 'IS_NODE', require( '@stdlib/assert/is-node' ) );

/**
* @name isNodeDuplexStreamLike
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-node-duplex-stream-like}
*/
setReadOnly( ns, 'isNodeDuplexStreamLike', require( '@stdlib/assert/is-node-duplex-stream-like' ) );

/**
* @name isNodeReadableStreamLike
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-node-readable-stream-like}
*/
setReadOnly( ns, 'isNodeReadableStreamLike', require( '@stdlib/assert/is-node-readable-stream-like' ) );

/**
* @name isNodeREPL
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-node-repl}
*/
setReadOnly( ns, 'isNodeREPL', require( '@stdlib/assert/is-node-repl' ) );

/**
* @name isNodeStreamLike
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-node-stream-like}
*/
setReadOnly( ns, 'isNodeStreamLike', require( '@stdlib/assert/is-node-stream-like' ) );

/**
* @name isNodeTransformStreamLike
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-node-transform-stream-like}
*/
setReadOnly( ns, 'isNodeTransformStreamLike', require( '@stdlib/assert/is-node-transform-stream-like' ) );

/**
* @name isNodeWritableStreamLike
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-node-writable-stream-like}
*/
setReadOnly( ns, 'isNodeWritableStreamLike', require( '@stdlib/assert/is-node-writable-stream-like' ) );

/**
* @name isNonNegativeInteger
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-nonnegative-integer}
*/
setReadOnly( ns, 'isNonNegativeInteger', require( '@stdlib/assert/is-nonnegative-integer' ) );

/**
* @name isNonNegativeIntegerArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-nonnegative-integer-array}
*/
setReadOnly( ns, 'isNonNegativeIntegerArray', require( '@stdlib/assert/is-nonnegative-integer-array' ) );

/**
* @name isNonNegativeNumber
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-nonnegative-number}
*/
setReadOnly( ns, 'isNonNegativeNumber', require( '@stdlib/assert/is-nonnegative-number' ) );

/**
* @name isNonNegativeNumberArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-nonnegative-number-array}
*/
setReadOnly( ns, 'isNonNegativeNumberArray', require( '@stdlib/assert/is-nonnegative-number-array' ) );

/**
* @name isNonPositiveInteger
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-nonpositive-integer}
*/
setReadOnly( ns, 'isNonPositiveInteger', require( '@stdlib/assert/is-nonpositive-integer' ) );

/**
* @name isNonPositiveIntegerArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-nonpositive-integer-array}
*/
setReadOnly( ns, 'isNonPositiveIntegerArray', require( '@stdlib/assert/is-nonpositive-integer-array' ) );

/**
* @name isNonPositiveNumber
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-nonpositive-number}
*/
setReadOnly( ns, 'isNonPositiveNumber', require( '@stdlib/assert/is-nonpositive-number' ) );

/**
* @name isNonPositiveNumberArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-nonpositive-number-array}
*/
setReadOnly( ns, 'isNonPositiveNumberArray', require( '@stdlib/assert/is-nonpositive-number-array' ) );

/**
* @name isNull
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-null}
*/
setReadOnly( ns, 'isNull', require( '@stdlib/assert/is-null' ) );

/**
* @name isNullArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-null-array}
*/
setReadOnly( ns, 'isNullArray', require( '@stdlib/assert/is-null-array' ) );

/**
* @name isNumber
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-number}
*/
setReadOnly( ns, 'isNumber', require( '@stdlib/assert/is-number' ) );

/**
* @name isNumberArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-number-array}
*/
setReadOnly( ns, 'isNumberArray', require( '@stdlib/assert/is-number-array' ) );

/**
* @name isNumericArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-numeric-array}
*/
setReadOnly( ns, 'isNumericArray', require( '@stdlib/assert/is-numeric-array' ) );

/**
* @name isObject
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-object}
*/
setReadOnly( ns, 'isObject', require( '@stdlib/assert/is-object' ) );

/**
* @name isObjectArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-object-array}
*/
setReadOnly( ns, 'isObjectArray', require( '@stdlib/assert/is-object-array' ) );

/**
* @name isObjectLike
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-object-like}
*/
setReadOnly( ns, 'isObjectLike', require( '@stdlib/assert/is-object-like' ) );

/**
* @name isOdd
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-odd}
*/
setReadOnly( ns, 'isOdd', require( '@stdlib/assert/is-odd' ) );

/**
* @name isPlainObject
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-plain-object}
*/
setReadOnly( ns, 'isPlainObject', require( '@stdlib/assert/is-plain-object' ) );

/**
* @name isPlainObjectArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-plain-object-array}
*/
setReadOnly( ns, 'isPlainObjectArray', require( '@stdlib/assert/is-plain-object-array' ) );

/**
* @name isPositiveInteger
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-positive-integer}
*/
setReadOnly( ns, 'isPositiveInteger', require( '@stdlib/assert/is-positive-integer' ) );

/**
* @name isPositiveIntegerArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-positive-integer-array}
*/
setReadOnly( ns, 'isPositiveIntegerArray', require( '@stdlib/assert/is-positive-integer-array' ) );

/**
* @name isPositiveNumber
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-positive-number}
*/
setReadOnly( ns, 'isPositiveNumber', require( '@stdlib/assert/is-positive-number' ) );

/**
* @name isPositiveZero
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-positive-zero}
*/
setReadOnly( ns, 'isPositiveZero', require( '@stdlib/assert/is-positive-zero' ) );

/**
* @name isPositiveNumberArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-positive-number-array}
*/
setReadOnly( ns, 'isPositiveNumberArray', require( '@stdlib/assert/is-positive-number-array' ) );

/**
* @name isPrimitive
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-primitive}
*/
setReadOnly( ns, 'isPrimitive', require( '@stdlib/assert/is-primitive' ) );

/**
* @name isPrimitiveArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-primitive-array}
*/
setReadOnly( ns, 'isPrimitiveArray', require( '@stdlib/assert/is-primitive-array' ) );

/**
* @name isProbability
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-probability}
*/
setReadOnly( ns, 'isProbability', require( '@stdlib/assert/is-probability' ) );

/**
* @name isProbabilityArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-probability-array}
*/
setReadOnly( ns, 'isProbabilityArray', require( '@stdlib/assert/is-probability-array' ) );

/**
* @name isRangeError
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-range-error}
*/
setReadOnly( ns, 'isRangeError', require( '@stdlib/assert/is-range-error' ) );

/**
* @name isReferenceError
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-reference-error}
*/
setReadOnly( ns, 'isReferenceError', require( '@stdlib/assert/is-reference-error' ) );

/**
* @name isRegExp
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-regexp}
*/
setReadOnly( ns, 'isRegExp', require( '@stdlib/assert/is-regexp' ) );

/**
* @name isRegExpString
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-regexp-string}
*/
setReadOnly( ns, 'isRegExpString', require( '@stdlib/assert/is-regexp-string' ) );

/**
* @name isRelativePath
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-relative-path}
*/
setReadOnly( ns, 'isRelativePath', require( '@stdlib/assert/is-relative-path' ) );

/**
* @name isSafeInteger
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-safe-integer}
*/
setReadOnly( ns, 'isSafeInteger', require( '@stdlib/assert/is-safe-integer' ) );

/**
* @name isSafeIntegerArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-safe-integer-array}
*/
setReadOnly( ns, 'isSafeIntegerArray', require( '@stdlib/assert/is-safe-integer-array' ) );

/**
* @name isSameValue
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-same-value}
*/
setReadOnly( ns, 'isSameValue', require( '@stdlib/assert/is-same-value' ) );

/**
* @name isStrictEqual
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-strict-equal}
*/
setReadOnly( ns, 'isStrictEqual', require( '@stdlib/assert/is-strict-equal' ) );

/**
* @name isString
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-string}
*/
setReadOnly( ns, 'isString', require( '@stdlib/assert/is-string' ) );

/**
* @name isStringArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-string-array}
*/
setReadOnly( ns, 'isStringArray', require( '@stdlib/assert/is-string-array' ) );

/**
* @name isSymbol
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-symbol}
*/
setReadOnly( ns, 'isSymbol', require( '@stdlib/assert/is-symbol' ) );

/**
* @name isSymbolArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-symbol-array}
*/
setReadOnly( ns, 'isSymbolArray', require( '@stdlib/assert/is-symbol-array' ) );

/**
* @name isSyntaxError
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-syntax-error}
*/
setReadOnly( ns, 'isSyntaxError', require( '@stdlib/assert/is-syntax-error' ) );

/**
* @name isTruthy
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-truthy}
*/
setReadOnly( ns, 'isTruthy', require( '@stdlib/assert/is-truthy' ) );

/**
* @name isTruthyArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-truthy-array}
*/
setReadOnly( ns, 'isTruthyArray', require( '@stdlib/assert/is-truthy-array' ) );

/**
* @name isTypeError
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-type-error}
*/
setReadOnly( ns, 'isTypeError', require( '@stdlib/assert/is-type-error' ) );

/**
* @name isTypedArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-typed-array}
*/
setReadOnly( ns, 'isTypedArray', require( '@stdlib/assert/is-typed-array' ) );

/**
* @name isTypedArrayLike
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-typed-array-like}
*/
setReadOnly( ns, 'isTypedArrayLike', require( '@stdlib/assert/is-typed-array-like' ) );

/**
* @name isUint16Array
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-uint16array}
*/
setReadOnly( ns, 'isUint16Array', require( '@stdlib/assert/is-uint16array' ) );

/**
* @name isUint32Array
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-uint32array}
*/
setReadOnly( ns, 'isUint32Array', require( '@stdlib/assert/is-uint32array' ) );

/**
* @name isUint8Array
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-uint8array}
*/
setReadOnly( ns, 'isUint8Array', require( '@stdlib/assert/is-uint8array' ) );

/**
* @name isUint8ClampedArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-uint8clampedarray}
*/
setReadOnly( ns, 'isUint8ClampedArray', require( '@stdlib/assert/is-uint8clampedarray' ) );

/**
* @name isUNCPath
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-unc-path}
*/
setReadOnly( ns, 'isUNCPath', require( '@stdlib/assert/is-unc-path' ) );

/**
* @name isUndefined
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-undefined}
*/
setReadOnly( ns, 'isUndefined', require( '@stdlib/assert/is-undefined' ) );

/**
* @name isUndefinedOrNull
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-undefined-or-null}
*/
setReadOnly( ns, 'isUndefinedOrNull', require( '@stdlib/assert/is-undefined-or-null' ) );

/**
* @name isUnityProbabilityArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-unity-probability-array}
*/
setReadOnly( ns, 'isUnityProbabilityArray', require( '@stdlib/assert/is-unity-probability-array' ) );

/**
* @name isUppercase
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-uppercase}
*/
setReadOnly( ns, 'isUppercase', require( '@stdlib/assert/is-uppercase' ) );

/**
* @name isURI
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-uri}
*/
setReadOnly( ns, 'isURI', require( '@stdlib/assert/is-uri' ) );

/**
* @name isURIError
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-uri-error}
*/
setReadOnly( ns, 'isURIError', require( '@stdlib/assert/is-uri-error' ) );

/**
* @name IS_WEB_WORKER
* @memberof ns
* @readonly
* @type {boolean}
* @see {@link module:@stdlib/assert/is-web-worker}
*/
setReadOnly( ns, 'IS_WEB_WORKER', require( '@stdlib/assert/is-web-worker' ) );

/**
* @name isWhitespace
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-whitespace}
*/
setReadOnly( ns, 'isWhitespace', require( '@stdlib/assert/is-whitespace' ) );

/**
* @name IS_WINDOWS
* @memberof ns
* @readonly
* @type {boolean}
* @see {@link module:@stdlib/assert/is-windows}
*/
setReadOnly( ns, 'IS_WINDOWS', require( '@stdlib/assert/is-windows' ) );


// EXPORTS //

module.exports = ns;

},{"@stdlib/assert/contains":2,"@stdlib/assert/has-own-property":4,"@stdlib/assert/has-property":6,"@stdlib/assert/has-prototype":8,"@stdlib/assert/instance-of":9,"@stdlib/assert/is-absolute-path":11,"@stdlib/assert/is-alphagram":14,"@stdlib/assert/is-anagram":16,"@stdlib/assert/is-arguments":19,"@stdlib/assert/is-array":29,"@stdlib/assert/is-array-array":22,"@stdlib/assert/is-array-length":23,"@stdlib/assert/is-array-like":27,"@stdlib/assert/is-array-like-object":25,"@stdlib/assert/is-arraybuffer":31,"@stdlib/assert/is-ascii":33,"@stdlib/assert/is-between":37,"@stdlib/assert/is-between-array":35,"@stdlib/assert/is-binary-string":39,"@stdlib/assert/is-boolean":43,"@stdlib/assert/is-boolean-array":41,"@stdlib/assert/is-browser":48,"@stdlib/assert/is-buffer":49,"@stdlib/assert/is-capitalized":51,"@stdlib/assert/is-collection":53,"@stdlib/assert/is-darwin":55,"@stdlib/assert/is-date-object":57,"@stdlib/assert/is-digit-string":60,"@stdlib/assert/is-electron":64,"@stdlib/assert/is-electron-main":62,"@stdlib/assert/is-electron-renderer":63,"@stdlib/assert/is-email-address":65,"@stdlib/assert/is-empty-array":67,"@stdlib/assert/is-empty-object":69,"@stdlib/assert/is-empty-string":72,"@stdlib/assert/is-enumerable-property":76,"@stdlib/assert/is-error":79,"@stdlib/assert/is-eval-error":81,"@stdlib/assert/is-even":84,"@stdlib/assert/is-falsy":88,"@stdlib/assert/is-falsy-array":87,"@stdlib/assert/is-finite":92,"@stdlib/assert/is-finite-array":90,"@stdlib/assert/is-float32array":95,"@stdlib/assert/is-float64array":97,"@stdlib/assert/is-function":100,"@stdlib/assert/is-function-array":99,"@stdlib/assert/is-hex-string":102,"@stdlib/assert/is-infinite":105,"@stdlib/assert/is-int16array":108,"@stdlib/assert/is-int32array":110,"@stdlib/assert/is-int8array":112,"@stdlib/assert/is-integer":116,"@stdlib/assert/is-integer-array":114,"@stdlib/assert/is-json":120,"@stdlib/assert/is-leap-year":122,"@stdlib/assert/is-little-endian":125,"@stdlib/assert/is-lowercase":127,"@stdlib/assert/is-matrix":131,"@stdlib/assert/is-matrix-like":129,"@stdlib/assert/is-nan":135,"@stdlib/assert/is-nan-array":133,"@stdlib/assert/is-native-function":138,"@stdlib/assert/is-negative-integer":142,"@stdlib/assert/is-negative-integer-array":140,"@stdlib/assert/is-negative-number":147,"@stdlib/assert/is-negative-number-array":145,"@stdlib/assert/is-negative-zero":151,"@stdlib/assert/is-node":165,"@stdlib/assert/is-node-duplex-stream-like":154,"@stdlib/assert/is-node-readable-stream-like":156,"@stdlib/assert/is-node-repl":158,"@stdlib/assert/is-node-stream-like":159,"@stdlib/assert/is-node-transform-stream-like":161,"@stdlib/assert/is-node-writable-stream-like":163,"@stdlib/assert/is-nonnegative-integer":168,"@stdlib/assert/is-nonnegative-integer-array":166,"@stdlib/assert/is-nonnegative-number":173,"@stdlib/assert/is-nonnegative-number-array":171,"@stdlib/assert/is-nonpositive-integer":178,"@stdlib/assert/is-nonpositive-integer-array":176,"@stdlib/assert/is-nonpositive-number":183,"@stdlib/assert/is-nonpositive-number-array":181,"@stdlib/assert/is-null":187,"@stdlib/assert/is-null-array":186,"@stdlib/assert/is-number":191,"@stdlib/assert/is-number-array":189,"@stdlib/assert/is-numeric-array":196,"@stdlib/assert/is-object":201,"@stdlib/assert/is-object-array":198,"@stdlib/assert/is-object-like":199,"@stdlib/assert/is-odd":204,"@stdlib/assert/is-plain-object":208,"@stdlib/assert/is-plain-object-array":207,"@stdlib/assert/is-positive-integer":212,"@stdlib/assert/is-positive-integer-array":210,"@stdlib/assert/is-positive-number":217,"@stdlib/assert/is-positive-number-array":215,"@stdlib/assert/is-positive-zero":221,"@stdlib/assert/is-primitive":225,"@stdlib/assert/is-primitive-array":224,"@stdlib/assert/is-probability":229,"@stdlib/assert/is-probability-array":227,"@stdlib/assert/is-range-error":232,"@stdlib/assert/is-reference-error":234,"@stdlib/assert/is-regexp":239,"@stdlib/assert/is-regexp-string":236,"@stdlib/assert/is-relative-path":242,"@stdlib/assert/is-safe-integer":247,"@stdlib/assert/is-safe-integer-array":245,"@stdlib/assert/is-same-value":250,"@stdlib/assert/is-strict-equal":252,"@stdlib/assert/is-string":256,"@stdlib/assert/is-string-array":254,"@stdlib/assert/is-symbol":263,"@stdlib/assert/is-symbol-array":261,"@stdlib/assert/is-syntax-error":270,"@stdlib/assert/is-truthy":273,"@stdlib/assert/is-truthy-array":272,"@stdlib/assert/is-type-error":275,"@stdlib/assert/is-typed-array":280,"@stdlib/assert/is-typed-array-like":277,"@stdlib/assert/is-uint16array":283,"@stdlib/assert/is-uint32array":285,"@stdlib/assert/is-uint8array":287,"@stdlib/assert/is-uint8clampedarray":289,"@stdlib/assert/is-unc-path":291,"@stdlib/assert/is-undefined":295,"@stdlib/assert/is-undefined-or-null":293,"@stdlib/assert/is-unity-probability-array":297,"@stdlib/assert/is-uppercase":299,"@stdlib/assert/is-uri":303,"@stdlib/assert/is-uri-error":301,"@stdlib/assert/is-web-worker":306,"@stdlib/assert/is-whitespace":308,"@stdlib/assert/is-windows":310,"@stdlib/utils/define-read-only-property":356}],312:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var getKeys = require( 'object-keys' ).shim();
var ns = require( './../lib' );


// TESTS //

tape( 'main export is an object', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof ns, 'object', 'main export is an object' );
	t.end();
});

tape( 'the exported object contains assertion utilities', function test( t ) {
	var keys = getKeys( ns );
	t.strictEqual( keys.length > 0, true, 'has keys' );
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/assert/test/test.js")
},{"./../lib":311,"object-keys":411,"tape":441}],313:[function(require,module,exports){
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

},{"@stdlib/assert/is-array":29}],314:[function(require,module,exports){
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

},{"./arrayfcn.js":313}],315:[function(require,module,exports){
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
	} // end FUNCTION every()
} // end FUNCTION arraylikefcn()


// EXPORTS //

module.exports = arraylikefcn;

},{"@stdlib/assert/is-array-like":27}],316:[function(require,module,exports){
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

},{"./arraylikefcn.js":315}],317:[function(require,module,exports){
'use strict';

/**
* Test if a numeric value is finite.
*
* @module @stdlib/math/base/assert/is-finite
*
* @example
* var isfinite = require( '@stdlib/math/base/assert/is-finite' );
*
* var bool = isfinite( 5.0 );
* // returns true
*
* bool = isfinite( -2.0e64 );
* // returns true
*
* bool = isfinite( Number.POSITIVE_INFINITY );
* // returns false
*
* bool = isfinite( Number.NEGATIVE_INFINITY );
* // returns false
*/

// MODULES //

var isfinite = require( './is_finite.js' );


// EXPORTS //

module.exports = isfinite;

},{"./is_finite.js":318}],318:[function(require,module,exports){
'use strict';

// MODULES //

var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );


// MAIN //

/**
* Tests if a numeric value is finite.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is finite
*
* @example
* var bool = isfinite( 5.0 );
* // returns true
*
* @example
* var bool = isfinite( -2.0e64 );
* // returns true
*
* @example
* var bool = isfinite( Number.POSITIVE_INFINITY );
* // returns false
*
* @example
* var bool = isfinite( Number.NEGATIVE_INFINITY );
* // returns false
*/
function isfinite( x ) {
	return (
		// NaN check (x !== x ):
		x === x &&

		// +-infinity check:
		x > NINF &&
		x < PINF
	);
} // end FUNCTION isfinite()


// EXPORTS //

module.exports = isfinite;

},{"@stdlib/math/constants/float64-ninf":335,"@stdlib/math/constants/float64-pinf":336}],319:[function(require,module,exports){
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

},{"./is_infinite.js":320}],320:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-ninf":335,"@stdlib/math/constants/float64-pinf":336}],321:[function(require,module,exports){
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

},{"./is_integer.js":322}],322:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":330}],323:[function(require,module,exports){
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

},{"./is_nan.js":324}],324:[function(require,module,exports){
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

},{}],325:[function(require,module,exports){
'use strict';

/**
* Test if a finite double-precision floating-point number is a safe integer.
*
* @module @stdlib/math/base/assert/is-safe-integer
*
* @example
* var isSafeInteger = require( '@stdlib/math/base/assert/is-safe-integer' );
*
* var bool = isSafeInteger( 1.0 );
* // returns true
*
* bool = isSafeInteger( 2.0e200 );
* // returns false
*
* bool = isSafeInteger( 3.14 );
* // returns false
*/

// MODULES //

var isSafeInteger = require( './is_safe_integer.js' );


// EXPORTS //

module.exports = isSafeInteger;

},{"./is_safe_integer.js":326}],326:[function(require,module,exports){
'use strict';

// MODULES //

var MAX_SAFE_INTEGER = require( '@stdlib/math/constants/float64-max-safe-integer' );
var MIN_SAFE_INTEGER = require( '@stdlib/math/constants/float64-min-safe-integer' );
var isInteger = require( '@stdlib/math/base/assert/is-integer' );


// MAIN //

/**
* Tests if a finite double-precision floating-point number is a safe integer.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is a safe integer
*
* @example
* var bool = isSafeInteger( 1.0 );
* // returns true
*
* @example
* var bool = isSafeInteger( 2.0e200 );
* // returns false
*
* @example
* var bool = isSafeInteger( 3.14 );
* // returns false
*/
function isSafeInteger( x ) {
	return (
		x >= MIN_SAFE_INTEGER &&
		x <= MAX_SAFE_INTEGER &&
		isInteger( x )
	);
} // end FUNCTION isSafeInteger()


// EXPORTS //

module.exports = isSafeInteger;

},{"@stdlib/math/base/assert/is-integer":321,"@stdlib/math/constants/float64-max-safe-integer":333,"@stdlib/math/constants/float64-min-safe-integer":334}],327:[function(require,module,exports){
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

},{}],328:[function(require,module,exports){
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

},{"./abs.js":327}],329:[function(require,module,exports){
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

},{}],330:[function(require,module,exports){
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

},{"./floor.js":329}],331:[function(require,module,exports){
'use strict';

// MODULES //

var PINF = require( '@stdlib/math/constants/float64-pinf' );
var abs = require( '@stdlib/math/base/special/abs' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );


// MAIN //

/**
* Computes the absolute difference.
*
* @param {number} x - first number
* @param {number} y - second number
* @returns {number} absolute difference
*
* @example
* var d = absoluteDifference( 2.0, 5.0 );
* // returns 3.0
* @example
* var d = absoluteDifference( -1.0, 3.14 );
* // returns ~4.14
* @example
* var d = absoluteDifference( 10.1, -2.05 );
* // returns ~12.15
* @example
* var d = absoluteDifference( -0.0, 0.0 );
* // returns +0.0
* @example
* var d = absoluteDifference( NaN, 5.0 );
* // returns NaN
* @example
* var d = absoluteDifference( Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY );
* // returns Number.POSITIVE_INFINITY
* @example
* var d = absoluteDifference( Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY );
* // returns NaN
*/
function absoluteDifference( x, y ) {
	if ( isnan( x ) || isnan( y ) ) {
		return NaN;
	}
	if ( isInfinite( x ) || isInfinite( y ) ) {
		if ( x === y ) {
			return NaN;
		}
		return PINF;
	}
	return abs( x - y );
} // end FUNCTION absoluteDifference()


// EXPORTS //

module.exports = absoluteDifference;

},{"@stdlib/math/base/assert/is-infinite":319,"@stdlib/math/base/assert/is-nan":323,"@stdlib/math/base/special/abs":328,"@stdlib/math/constants/float64-pinf":336}],332:[function(require,module,exports){
'use strict';

/**
* Compute the absolute difference.
*
* @module @stdlib/math/base/utils/absolute-difference
*
* @example
* var diff = require( '@stdlib/math/base/utils/absolute-difference' );
*
* var d = diff( 2.0, 5.0 );
* // returns 3.0
*
* d = diff( -1.0, 3.14 );
* // returns ~4.14
*
* d = diff( 10.1, -2.05 );
* // returns ~12.15
*
* d = diff( -0.0, 0.0 );
* // returns +0.0
*
* d = diff( NaN, 5.0 );
* // returns NaN
*
* d = diff( Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY );
* // returns Number.POSITIVE_INFINITY
*
* d = diff( Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY );
* // returns NaN
*/

// MODULES //

var absoluteDifference = require( './absolute_difference.js' );


// EXPORTS //

module.exports = absoluteDifference;

},{"./absolute_difference.js":331}],333:[function(require,module,exports){
'use strict';

/**
* Maximum safe double-precision floating-point integer.
*
* @module @stdlib/math/constants/float64-max-safe-integer
* @type {number}
*
* @example
* var FLOAT64_MAX_SAFE_INTEGER = require( '@stdlib/math/constants/float64-max-safe-integer' );
* // returns 9007199254740991
*/


// MAIN //

/**
* The maximum safe double-precision floating-point integer is given by
*
* ``` tex
* 2^{53} - 1
* ```
*
* @constant
* @type {number}
* @default 9007199254740991
* @see [Safe Integers]{@link http://www.2ality.com/2013/10/safe-integers.html}
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MAX_SAFE_INTEGER = 9007199254740991;


// EXPORTS //

module.exports = FLOAT64_MAX_SAFE_INTEGER;

},{}],334:[function(require,module,exports){
'use strict';

/**
* Minimum safe double-precision floating-point integer.
*
* @module @stdlib/math/constants/float64-min-safe-integer
* @type {number}
*
* @example
* var FLOAT64_MIN_SAFE_INTEGER = require( '@stdlib/math/constants/float64-min-safe-integer' );
* // returns -9007199254740991
*/


// MAIN //

/**
* The minimum safe double-precision floating-point integer is given by
*
* ``` tex
* -(2^{53} - 1)
* ```
*
* @constant
* @type {number}
* @default -9007199254740991
* @see [Safe Integers]{@link http://www.2ality.com/2013/10/safe-integers.html}
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MIN_SAFE_INTEGER = -9007199254740991;


// EXPORTS //

module.exports = FLOAT64_MIN_SAFE_INTEGER;

},{}],335:[function(require,module,exports){
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

},{}],336:[function(require,module,exports){
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

},{}],337:[function(require,module,exports){
'use strict';

/**
* Square root of double-precision floating-point epsilon.
*
* @module @stdlib/math/constants/float64-sqrt-eps
* @type {number}
*
* @example
* var FLOAT64_SQRT_EPSILON = require( '@stdlib/math/constants/float64-sqrt-eps' );
* // returns 0.14901161193847656e-7
*/


// MAIN //

/**
* Square root of double-precision floating-point epsilon.
*
* ``` tex
* \sqrt{\frac{1}{2^{52}}}
* ```
*
* @constant
* @type {number}
* @default 0.14901161193847656e-7
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
* @see [Machine Epsilon]{@link https://en.wikipedia.org/wiki/Machine_epsilon}
*/
var FLOAT64_SQRT_EPSILON = 0.1490116119384765625e-7;


// EXPORTS //

module.exports = FLOAT64_SQRT_EPSILON;

},{}],338:[function(require,module,exports){
'use strict';

/**
* Maximum unsigned 32-bit integer.
*
* @module @stdlib/math/constants/uint32-max
* @type {uinteger32}
*
* @example
* var UINT32_MAX = require( '@stdlib/math/constants/uint32-max' );
* // returns 4294967295
*/


// MAIN //

/**
* The maximum unsigned 32-bit integer is given by
*
* ``` tex
* 2^{32} - 1
* ```
*
* which corresponds to the bit sequence
*
* ``` binarystring
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

},{}],339:[function(require,module,exports){
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

},{}],340:[function(require,module,exports){
'use strict';

/**
* Regular expression to match a native function.
*
* @module @stdlib/regexp/native-function
* @type {RegExp}
*
* @example
* var RE_NATIVE_FUNCTION = require( '@stdlib/utils/regexp/native-function' );
*
* function isNativeFunction( fcn ) {
*     return RE_NATIVE_FUNCTION.test( fcn.toString() );
* }
*
* var bool = isNativeFunction( Math.sqrt );
* // returns true
*
* bool = isNativeFunction( Int8Array );
* // returns true
*
* bool = isNativeFunction( Object.prototype.toString );
* // returns true
*
* bool = isNativeFunction( function noop() {} );
* // returns false
*/


// MAIN //

/**
* Matches a native function.
*
* @constant
* @type {RegExp}
*/
var RE_NATIVE_FUNCTION = require( './regexp.js' );


// EXPORTS //

module.exports = RE_NATIVE_FUNCTION;

},{"./regexp.js":341}],341:[function(require,module,exports){
'use strict';

var re = '';

// Use a native function as a template:
re += Function.prototype.toString.call( Function );

// Escape special RegExp characters:
re = re.replace( /([.*+?^=!:$(){}|[\]\/\\])/g, '\\$1' ); // eslint-disable-line no-useless-escape

// Replace any mentions of `Function` to make template generic and replace `for ...` and additional info provided in other environments, such as Rhino.
re = re.replace( /Function|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?' );

// Bracket the regular expression:
re = '^' + re + '$';


// EXPORTS //

module.exports = new RegExp( re );

},{}],342:[function(require,module,exports){
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
* * `/^\/`
*   - match a string that begins with a `/`
* * `()`
*   - capture
* * `(?:)+`
*   - capture, but do not remember, a group of characters which occur one or more times
* * `\\\/`
*   - match the literal `\/`
* * `|`
*   - OR
* * `[^\/]`
*   - anything which is not the literal `\/`
* * `\/`
*   - match the literal `/`
* * `([imgy]*)`
*   - capture any characters matching `imgy` occurring zero or more times
* * `$/`
*   - string end
*
*
* @constant
* @type {RegExp}
* @default /^\/((?:\\\/|[^\/])+)\/([imgy]*)$/
*/
var RE_REGEXP = /^\/((?:\\\/|[^\/])+)\/([imgy]*)$/; // eslint-disable-line no-useless-escape


// EXPORTS //

module.exports = RE_REGEXP;

},{}],343:[function(require,module,exports){
'use strict';

/**
* Regular expression to parse a UNC path.
*
* @module @stdlib/regexp/unc-path
* @type {RegExp}
*
* @example
* var RE_UNC_PATH = require( '@stdlib/regexp/unc-path' );
*
* var bool = RE_UNC_PATH.test( '\\\\server\\share' );
* // returns true
*
* bool = RE_UNC_PATH.test( 'C:\\foo\\bar\\baz' );
* // returns false
*
* @example
* var RE_UNC_PATH = require( '@stdlib/regexp/unc-path' );
*
* var parts = RE_UNC_PATH.exec( '\\\\server\\share\\foo\\bar\\baz' )[ 1 ];
* // returns 'server'
*/


// MAIN //

/**
* Matches parts of a UNC path.
*
* Regular Expression: `/^\\\\([^\\:\|\[\]\/";<>+=,?* _]+)\\([\u0020-\u0021\u0023-\u0029\u002D-\u002E\u0030-\u0039\u0040-\u005A\u005E-\u007B\u007E-\u00FF]{1,80})(((?:\\[\u0020-\u0021\u0023-\u0029\u002D-\u002E\u0030-\u0039\u0040-\u005A\u005E-\u007B\u007E-\u00FF]{1,255})+?|)(?:\\((?:[\u0020-\u0021\u0023-\u0029\u002B-\u002E\u0030-\u0039\u003B\u003D\u0040-\u005B\u005D-\u007B]{1,255}){1}(?:\:(?=[\u0001-\u002E\u0030-\u0039\u003B-\u005B\u005D-\u00FF]|\:)(?:([\u0001-\u002E\u0030-\u0039\u003B-\u005B\u005D-\u00FF]+(?!\:)|[\u0001-\u002E\u0030-\u0039\u003B-\u005B\u005D-\u00FF]*)(?:\:([\u0001-\u002E\u0030-\u0039\u003B-\u005B\u005D-\u00FF]+)|))|)))|)$/`
*
* * `/^\\\\`
*   - match a string that begins with two backward slashes `\\\\`
* * `()`
*   - capture (1) (host name)
* * `[^\\:\|\[\]\/";<>+=,?* _]+`
*   - match any sequence of characters, excluding `\\:\|\[\]\/";<>+=,?* _`, one or more times
* * `\\`
*   - match a literal backward slash `\\`
* * `()`
*   - capture (2) (share name)
* * `[\u0020-\u0021\u0023-\u0029\u002D-\u002E\u0030-\u0039\u0040-\u005A\u005E-\u007B\u007E-\u00FF]{1,80}`
*   - match any sequence of 1 to 80 characters matching `` !#$%'()\-\.0-9@A-Z^_`a-z{}~`` and Latin-1 Unicode supplement
* * `(`
*   - begin capture (3) (object name)
* * `(`
*   - begin capture (4) (path name)
* * `(?:\\[\u0020-\u0021\u0023-\u0029\u002D-\u002E\u0030-\u0039\u0040-\u005A\u005E-\u007B\u007E-\u00FF]{1,255})+?`
*   - capture but do not remember a `\\` literal followed by one or more sequences of 1 to 255 characters matching `` !#$%'()\-\.0-9@A-Z^_`a-z{}~`` and Latin-1 Unicode supplement and do so non-greedily (5)
* * `|)`
*   - OR capture nothing (4) (path name)
* * `(?:`
*   - begin capture but do not remember (6)
* * `\\`
*   - match a `\\` literal
* * `(`
*   - begin capture (7) (file name)
* * `(?:[0-9a-z]{1,255}){1}`
*   - capture but do not remember a sequence of 1 to 255 characters matching `` !#$%'()\+,\-\.0-9;=@A-Z\[\]^_`a-z{`` (8)
* * `(?:`
*   - begin capture but do not remember (9)
* * `\:(?=[\u0001-\u002E\u0030-\u0039\u003B-\u005B\u005D-\u00FF]|\:)`
*   - match a literal `:` only if followed by `\u0001-\u002E\u0030-\u0039\u003B-\u005B\u005D-\u00FF` OR a literal `:`
* * `(?:`
*   - begin capture but do not remember (10)
* * `([\u0001-\u002E\u0030-\u0039\u003B-\u005B\u005D-\u00FF]+(?!\:)|[\u0001-\u002E\u0030-\u0039\u003B-\u005B\u005D-\u00FF]*)`
*   - capture a sequence of one or more characters not followed by a literal `:`; otherwise, capture a sequence of 0 or more characters (11) (stream name)
* * `(?:`
*   - begin capture but do not remember (12)
* * `\:`
*   - match a literal `:`
* * `([\u0001-\u002E\u0030-\u0039\u003B-\u005B\u005D-\u00FF]+)`
*   - capture a sequence of one or more characters (13) (stream type)
* * `|)`
*   - OR capture nothing (12)
* * `)`
*   - end capture (10)
* * `|)`
*   - OR capture nothing (9)
* * `)`
*   - end capture (7) (file name)
* * `)`
*   - end capture (6)
* * `|)`
*   - OR capture nothing (3) (object name)
* * `$/`
*   - end of string
*
*
* @constant
* @type {RegExp}
* @default /^\\\\([^\\:\|\[\]\/";<>+=,?* _]+)\\([\u0020-\u0021\u0023-\u0029\u002D-\u002E\u0030-\u0039\u0040-\u005A\u005E-\u007B\u007E-\u00FF]{1,80})(((?:\\[\u0020-\u0021\u0023-\u0029\u002D-\u002E\u0030-\u0039\u0040-\u005A\u005E-\u007B\u007E-\u00FF]{1,255})+?|)(?:\\((?:[\u0020-\u0021\u0023-\u0029\u002B-\u002E\u0030-\u0039\u003B\u003D\u0040-\u005B\u005D-\u007B]{1,255}){1}(?:\:(?=[\u0001-\u002E\u0030-\u0039\u003B-\u005B\u005D-\u00FF]|\:)(?:([\u0001-\u002E\u0030-\u0039\u003B-\u005B\u005D-\u00FF]+(?!\:)|[\u0001-\u002E\u0030-\u0039\u003B-\u005B\u005D-\u00FF]*)(?:\:([\u0001-\u002E\u0030-\u0039\u003B-\u005B\u005D-\u00FF]+)|))|)))|)$/
* @see [MSDN]{@link https://msdn.microsoft.com/en-us/library/gg465305.aspx}
*/
var RE_UNC_PATH = /^\\\\([^\\:\|\[\]\/";<>+=,?* _]+)\\([\u0020-\u0021\u0023-\u0029\u002D-\u002E\u0030-\u0039\u0040-\u005A\u005E-\u007B\u007E-\u00FF]{1,80})(((?:\\[\u0020-\u0021\u0023-\u0029\u002D-\u002E\u0030-\u0039\u0040-\u005A\u005E-\u007B\u007E-\u00FF]{1,255})+?|)(?:\\((?:[\u0020-\u0021\u0023-\u0029\u002B-\u002E\u0030-\u0039\u003B\u003D\u0040-\u005B\u005D-\u007B]{1,255}){1}(?:\:(?=[\u0001-\u002E\u0030-\u0039\u003B-\u005B\u005D-\u00FF]|\:)(?:([\u0001-\u002E\u0030-\u0039\u003B-\u005B\u005D-\u00FF]+(?!\:)|[\u0001-\u002E\u0030-\u0039\u003B-\u005B\u005D-\u00FF]*)(?:\:([\u0001-\u002E\u0030-\u0039\u003B-\u005B\u005D-\u00FF]+)|))|)))|)$/; // eslint-disable-line no-useless-escape


// EXPORTS //

module.exports = RE_UNC_PATH;

},{}],344:[function(require,module,exports){
'use strict';

/**
* Regular expression to match a whitespace character.
*
* ## Notes
*
* * Matches the 25 characters defined as whitespace ("WSpace=Y","WS") characters in the Unicode 9.0 character database.
* * Matches one related whitespace character without the Unicode character property "WSpace=Y" (zero width non-breaking space which was deprecated as of Unicode 3.2).
*
* @module @stdlib/regexp/whitespace
* @type {RegExp}
*
* @example
* var RE_WHITESPACE = require( '@stdlib/regexp/whitespace' );
*
* var bool = RE_WHITESPACE.test( ' ' );
* // returns true
*
* bool = RE_WHITESPACE.test( '\t' );
* // returns true
*
* bool = RE_WHITESPACE.test( 'a' );
* // returns false
*/


// MAIN //

/**
* Matches a space.
*
* Regular expression: `/[\u0009\u000A\u000B\u000C\u000D\u0020\u0085\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]/`
*
* * `[]`
*   - match any one of the listed characters
* * `\u0009`
*   - character tabulation (horizontal tab; `\t`)
* * `\u000A`
*   - line feed (LF; `\n`)
* * `\u000B`
*   - line tabulation (vertical tab; `\v`)
* * `\u000C`
*   - form feed (`\f`)
* * `\u000D`
*   - carriage return (CR; `\r`)
* * `\u0020`
*   - space (most common)
* * `\u0085`
*   - next line (NEL)
* * `\u00A0`
*   - non-breaking space
* * `\u1680`
*   - Ogham space mark
* * `\u2000`
*   - en quad
* * `\u2001`
*   - em quad
* * `\u2002`
*   - en space
* * `\u2003`
*   - em space
* * `\u2004`
*   - three-per-em space (thick space)
* * `\u2005`
*   - four-per-em space (mid space)
* * `\u2006`
*   - six-per-em space
* * `\u2007`
*   - figure space
* * `\u2008`
*   - punctuation space
* * `\u2009`
*   - thin space
* * `\u200A`
*   - hair space
* * `\u2028`
*   - line separator
* * `\u2029`
*   - paragraph separator
* * `\u202F`
*   - narrow no-break space
* * `\u205F`
*   - medium mathematical space
* * `\u3000`
*   - ideographic space
* * `\uFEFF`
*   - zero width non-breaking space
*
* @constant
* @type {RegExp}
* @see [whitespace]{@link https://en.wikipedia.org/wiki/Whitespace_character}
* @default /[\u0009\u000A\u000B\u000C\u000D\u0020\u0085\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]/
*/
var RE_WHITESPACE = /[\u0009\u000A\u000B\u000C\u000D\u0020\u0085\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]/;


// EXPORTS //

module.exports = RE_WHITESPACE;

},{}],345:[function(require,module,exports){
'use strict';

/**
* Convert a string to lowercase.
*
* @module @stdlib/string/lowercase
*
* @example
* var lowercase = require( '@stdlib/string/lowercase' );
*
* var str = lowercase( 'bEEp' );
* // returns 'beep'
*/

// MODULES //

var lowercase = require( './lowercase.js' );


// EXPORTS //

module.exports = lowercase;

},{"./lowercase.js":346}],346:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;


// MAIN //

/**
* Converts a string to lowercase.
*
* @param {string} str - string to convert
* @throws {TypeError} must provide a primitive string
* @returns {string} lowercase string
*
* @example
* var str = lowercase( 'bEEp' );
* // returns 'beep'
*/
function lowercase( str ) {
	if ( !isString( str ) ) {
		throw new TypeError( 'invalid input argument. Must provide a primitive string. Value: `'+str+'`.' );
	}
	return str.toLowerCase();
} // end FUNCTION lowercase()


// EXPORTS //

module.exports = lowercase;

},{"@stdlib/assert/is-string":256}],347:[function(require,module,exports){
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

},{"./replace.js":348}],348:[function(require,module,exports){
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
} // end FUNCTION replace()


// EXPORTS //

module.exports = replace;

},{"@stdlib/assert/is-function":100,"@stdlib/assert/is-regexp":239,"@stdlib/assert/is-string":256,"@stdlib/utils/escape-regexp-string":362}],349:[function(require,module,exports){
'use strict';

/**
* Convert a string to uppercase.
*
* @module @stdlib/string/uppercase
*
* @example
* var uppercase = require( '@stdlib/string/uppercase' );
*
* var str = uppercase( 'bEEp' );
* // returns 'BEEP'
*/

// MODULES //

var uppercase = require( './uppercase.js' );


// EXPORTS //

module.exports = uppercase;

},{"./uppercase.js":350}],350:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;


// MAIN //

/**
* Converts a string to uppercase.
*
* @param {string} str - string to convert
* @throws {TypeError} must provide a primitive string
* @returns {string} uppercase string
*
* @example
* var str = uppercase( 'bEEp' );
* // returns 'BEEP'
*/
function uppercase( str ) {
	if ( !isString( str ) ) {
		throw new TypeError( 'invalid input argument. Must provide a primitive string. Value: `'+str+'`.' );
	}
	return str.toUpperCase();
} // end FUNCTION uppercase()


// EXPORTS //

module.exports = uppercase;

},{"@stdlib/assert/is-string":256}],351:[function(require,module,exports){
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
	} // end FUNCTION constantFunction()
} // end FUNCTION wrap()


// EXPORTS //

module.exports = wrap;

},{}],352:[function(require,module,exports){
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

},{"./constant_function.js":351}],353:[function(require,module,exports){
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

},{"@stdlib/assert/is-buffer":49,"@stdlib/regexp/function-name":339,"@stdlib/utils/native-class":369}],354:[function(require,module,exports){
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

},{"./constructor_name.js":353}],355:[function(require,module,exports){
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

},{}],356:[function(require,module,exports){
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

},{"./define_read_only_property.js":355}],357:[function(require,module,exports){
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

},{}],358:[function(require,module,exports){
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

},{"./detect_symbol_support.js":357}],359:[function(require,module,exports){
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

},{"@stdlib/utils/detect-symbol-support":358}],360:[function(require,module,exports){
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

},{"./has_tostringtag_support.js":359}],361:[function(require,module,exports){
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
} // end FUNCTION rescape()


// EXPORTS //

module.exports = rescape;

},{"@stdlib/assert/is-string":256}],362:[function(require,module,exports){
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

},{"./escape_regexp_string.js":361}],363:[function(require,module,exports){
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

},{"./native.js":366,"./polyfill.js":367,"@stdlib/assert/is-function":100}],364:[function(require,module,exports){
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

},{"./detect.js":363}],365:[function(require,module,exports){
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

},{"./get_prototype_of.js":364}],366:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = Object.getPrototypeOf;

},{}],367:[function(require,module,exports){
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

},{"./proto.js":368,"@stdlib/utils/native-class":369}],368:[function(require,module,exports){
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

},{}],369:[function(require,module,exports){
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

},{"./native_class.js":370,"./polyfill.js":371,"@stdlib/utils/detect-tostringtag-support":360}],370:[function(require,module,exports){
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

},{"./tostring.js":372}],371:[function(require,module,exports){
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

},{"./tostring.js":372,"./tostringtag.js":373,"@stdlib/assert/has-own-property":4}],372:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = Object.prototype.toString; // eslint-disable-line no-redeclare

},{}],373:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';

},{}],374:[function(require,module,exports){
'use strict';

/**
* Platform on which the current process is running.
*
* @module @stdlib/utils/platform
* @type {string}
*
* @example
* var PLATFORM = require( '@stdlib/utils/platform' );
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

},{"./platform.js":375}],375:[function(require,module,exports){
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
},{"_process":386}],376:[function(require,module,exports){
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

},{"./fixtures/nodelist.js":377,"./fixtures/re.js":378,"./fixtures/typedarray.js":379}],377:[function(require,module,exports){
'use strict';

// MODULES //

var root = require( 'system.global' )(); // eslint-disable-line no-redeclare


// MAIN //

var nodeList = root.document && root.document.childNodes;


// EXPORTS //

module.exports = nodeList;

},{"system.global":438}],378:[function(require,module,exports){
'use strict';

var RE = /./;


// EXPORTS //

module.exports = RE;

},{}],379:[function(require,module,exports){
'use strict';

var typedarray = Int8Array;


// EXPORTS //

module.exports = typedarray;

},{}],380:[function(require,module,exports){
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

},{"./check.js":376,"./polyfill.js":381,"./typeof.js":382}],381:[function(require,module,exports){
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

},{"@stdlib/utils/constructor-name":354}],382:[function(require,module,exports){
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

},{"@stdlib/utils/constructor-name":354}],383:[function(require,module,exports){
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

},{}],384:[function(require,module,exports){

},{}],385:[function(require,module,exports){
arguments[4][384][0].apply(exports,arguments)
},{"dup":384}],386:[function(require,module,exports){
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

},{}],387:[function(require,module,exports){
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

},{"base64-js":383,"ieee754":406}],388:[function(require,module,exports){
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
},{"../../is-buffer/index.js":408}],389:[function(require,module,exports){
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

},{"./lib/is_arguments.js":390,"./lib/keys.js":391}],390:[function(require,module,exports){
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

},{}],391:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],392:[function(require,module,exports){
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

},{"foreach":402,"object-keys":411}],393:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],394:[function(require,module,exports){
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

},{"./helpers/isFinite":395,"./helpers/isNaN":396,"./helpers/mod":397,"./helpers/sign":398,"es-to-primitive/es5":399,"has":405,"is-callable":409}],395:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],396:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],397:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],398:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],399:[function(require,module,exports){
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

},{"./helpers/isPrimitive":400,"is-callable":409}],400:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],401:[function(require,module,exports){
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

},{}],402:[function(require,module,exports){

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


},{}],403:[function(require,module,exports){
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

},{}],404:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":403}],405:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":404}],406:[function(require,module,exports){
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

},{}],407:[function(require,module,exports){
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

},{}],408:[function(require,module,exports){
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

},{}],409:[function(require,module,exports){
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

},{}],410:[function(require,module,exports){
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

},{}],411:[function(require,module,exports){
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

},{"./isArguments":412}],412:[function(require,module,exports){
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

},{}],413:[function(require,module,exports){
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
},{"_process":386}],414:[function(require,module,exports){
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
},{"_process":386}],415:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":416}],416:[function(require,module,exports){
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
},{"./_stream_readable":418,"./_stream_writable":420,"core-util-is":388,"inherits":407,"process-nextick-args":414}],417:[function(require,module,exports){
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
},{"./_stream_transform":419,"core-util-is":388,"inherits":407}],418:[function(require,module,exports){
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
},{"./_stream_duplex":416,"./internal/streams/BufferList":421,"./internal/streams/destroy":422,"./internal/streams/stream":423,"_process":386,"core-util-is":388,"events":401,"inherits":407,"isarray":424,"process-nextick-args":414,"safe-buffer":431,"string_decoder/":425,"util":384}],419:[function(require,module,exports){
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
},{"./_stream_duplex":416,"core-util-is":388,"inherits":407}],420:[function(require,module,exports){
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
},{"./_stream_duplex":416,"./internal/streams/destroy":422,"./internal/streams/stream":423,"_process":386,"core-util-is":388,"inherits":407,"process-nextick-args":414,"safe-buffer":431,"util-deprecate":447}],421:[function(require,module,exports){
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
},{"safe-buffer":431}],422:[function(require,module,exports){
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
},{"process-nextick-args":414}],423:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":401}],424:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],425:[function(require,module,exports){
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
},{"safe-buffer":431}],426:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":427}],427:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":416,"./lib/_stream_passthrough.js":417,"./lib/_stream_readable.js":418,"./lib/_stream_transform.js":419,"./lib/_stream_writable.js":420}],428:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":427}],429:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":420}],430:[function(require,module,exports){
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
},{"_process":386,"through":446}],431:[function(require,module,exports){
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

},{"buffer":387}],432:[function(require,module,exports){
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

},{"events":401,"inherits":407,"readable-stream/duplex.js":415,"readable-stream/passthrough.js":426,"readable-stream/readable.js":427,"readable-stream/transform.js":428,"readable-stream/writable.js":429}],433:[function(require,module,exports){
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

},{"es-abstract/es5":394,"function-bind":404}],434:[function(require,module,exports){
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

},{"./implementation":433,"./polyfill":435,"./shim":436,"define-properties":392,"function-bind":404}],435:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":433}],436:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":435,"define-properties":392}],437:[function(require,module,exports){
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
},{}],438:[function(require,module,exports){
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

},{"./implementation":437,"./polyfill":439,"./shim":440,"define-properties":392}],439:[function(require,module,exports){
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
},{"./implementation":437}],440:[function(require,module,exports){
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
},{"./polyfill":439,"define-properties":392}],441:[function(require,module,exports){
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
},{"./lib/default_stream":442,"./lib/results":444,"./lib/test":445,"_process":386,"defined":393,"through":446}],442:[function(require,module,exports){
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
},{"_process":386,"fs":385,"through":446}],443:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":386}],444:[function(require,module,exports){
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
},{"_process":386,"events":401,"function-bind":404,"has":405,"inherits":407,"object-inspect":410,"resumer":430,"through":446}],445:[function(require,module,exports){
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
},{"./next_tick":443,"deep-equal":389,"defined":393,"events":401,"has":405,"inherits":407,"path":413,"string.prototype.trim":434}],446:[function(require,module,exports){
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
},{"_process":386,"stream":432}],447:[function(require,module,exports){
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
},{}]},{},[312]);
