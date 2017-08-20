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

},{"@stdlib/utils/native-class":25}],5:[function(require,module,exports){
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

},{"@stdlib/assert/is-object-like":7}],7:[function(require,module,exports){
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

},{"./is_object_like.js":8,"@stdlib/assert/tools/array-function":10,"@stdlib/utils/define-read-only-property":20}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{"@stdlib/assert/is-array":3}],10:[function(require,module,exports){
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

},{"./arrayfcn.js":9}],11:[function(require,module,exports){
(function (Buffer,__dirname){
'use strict';

// MODULES //

var resolve = require( 'path' ).resolve;
var readFile = require( '@stdlib/fs/read-file' ).sync;


// VARIABLES //

var fpath = resolve( __dirname, '..', 'data', 'image.jpg' );


// MAIN //

/**
* Returns Allium oreophilum (pink lily leek).
*
* ## Notes
*
* * This function synchronously reads data from disk for each invocation. Such behavior is intentional and so is the avoidance of `require`. We assume that invocations are infrequent, and we want to avoid the `require` cache. This means that we allow data to be garbage collected and a user is responsible for explicitly caching data.
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
	return new Buffer( data, 'base64' );
} // end FUNCTION image()


// EXPORTS //

module.exports = image;

}).call(this,require("buffer").Buffer,"/lib/node_modules/@stdlib/datasets/img-allium-oreophilum/lib")
},{"@stdlib/fs/read-file":17,"buffer":34,"path":64}],12:[function(require,module,exports){
(function (Buffer){
'use strict';

// MODULES //

var data = require( './data.js' );


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
	return new Buffer( data, 'base64' );
} // end FUNCTION image()


// EXPORTS //

module.exports = image;

}).call(this,require("buffer").Buffer)
},{"./data.js":13,"buffer":34}],13:[function(require,module,exports){
'use strict';

var data = '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YWN0SW5mbyByZGY6cGFyc2VUeXBlPSdSZXNvdXJjZSc+CiAgIDxJcHRjNHhtcENvcmU6Q2lBZHJDaXR5PkxvcyBBbmdlbGVzPC9JcHRjNHhtcENvcmU6Q2lBZHJDaXR5PgogICA8SXB0YzR4bXBDb3JlOkNpQWRyQ3RyeT5Vbml0ZWQgU3RhdGVzPC9JcHRjNHhtcENvcmU6Q2lBZHJDdHJ5PgogICA8SXB0YzR4bXBDb3JlOkNpQWRyRXh0YWRyPjEyMDAgR2V0dHkgQ2VudGVyIERyaXZlPC9JcHRjNHhtcENvcmU6Q2lBZHJFeHRhZHI+CiAgIDxJcHRjNHhtcENvcmU6Q2lBZHJQY29kZT45MDA0OTwvSXB0YzR4bXBDb3JlOkNpQWRyUGNvZGU+CiAgIDxJcHRjNHhtcENvcmU6Q2lBZHJSZWdpb24+Q2FsaWZvcm5pYTwvSXB0YzR4bXBDb3JlOkNpQWRyUmVnaW9uPgogICA8SXB0YzR4bXBDb3JlOkNpRW1haWxXb3JrPnJpZ2h0c0BnZXR0eS5lZHU8L0lwdGM0eG1wQ29yZTpDaUVtYWlsV29yaz4KICAgPElwdGM0eG1wQ29yZTpDaVVybFdvcms+d3d3LmdldHR5LmVkdTwvSXB0YzR4bXBDb3JlOkNpVXJsV29yaz4KICA8L0lwdGM0eG1wQ29yZTpDcmVhdG9yQ29udGFjdEluZm8+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOklwdGM0eG1wRXh0PSdodHRwOi8vaXB0Yy5vcmcvc3RkL0lwdGM0eG1wRXh0LzIwMDgtMDItMjkvJz4KICA8SXB0YzR4bXBFeHQ6QXJ0d29ya09yT2JqZWN0PgogICA8cmRmOkJhZz4KICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPgogICAgIDxJcHRjNHhtcEV4dDpBT0NyZWF0b3I+CiAgICAgIDxyZGY6U2VxPgogICAgICAgPHJkZjpsaT5LYXJsIEJsb3NzZmVsZHQ8L3JkZjpsaT4KICAgICAgPC9yZGY6U2VxPgogICAgIDwvSXB0YzR4bXBFeHQ6QU9DcmVhdG9yPgogICAgIDxJcHRjNHhtcEV4dDpBT0RhdGVDcmVhdGVkPjE5Mjg8L0lwdGM0eG1wRXh0OkFPRGF0ZUNyZWF0ZWQ+CiAgICAgPElwdGM0eG1wRXh0OkFPU291cmNlPlRoZSBKLiBQYXVsIEdldHR5IE11c2V1bSwgTG9zIEFuZ2VsZXM8L0lwdGM0eG1wRXh0OkFPU291cmNlPgogICAgIDxJcHRjNHhtcEV4dDpBT1NvdXJjZUludk5vPjg0LlhNLjE0Mi43PC9JcHRjNHhtcEV4dDpBT1NvdXJjZUludk5vPgogICAgIDxJcHRjNHhtcEV4dDpBT1RpdGxlPgogICAgICA8cmRmOkFsdD4KICAgICAgIDxyZGY6bGkgeG1sOmxhbmc9J3gtZGVmYXVsdCc+QWxsaXVtIG9zdHJvd3NraWFudW0sIEtub2JsYXVjaHBmbGFuemU8L3JkZjpsaT4KICAgICAgPC9yZGY6QWx0PgogICAgIDwvSXB0YzR4bXBFeHQ6QU9UaXRsZT4KICAgIDwvcmRmOmxpPgogICA8L3JkZjpCYWc+CiAgPC9JcHRjNHhtcEV4dDpBcnR3b3JrT3JPYmplY3Q+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOmRjPSdodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyc+CiAgPGRjOmNyZWF0b3I+CiAgIDxyZGY6U2VxPgogICAgPHJkZjpsaT5UaGUgSi4gUGF1bCBHZXR0eSBNdXNldW08L3JkZjpsaT4KICAgPC9yZGY6U2VxPgogIDwvZGM6Y3JlYXRvcj4KICA8ZGM6ZGVzY3JpcHRpb24+CiAgIDxyZGY6QWx0PgogICAgPHJkZjpsaSB4bWw6bGFuZz0neC1kZWZhdWx0Jz5BbGxpdW0gb3N0cm93c2tpYW51bSwgS25vYmxhdWNocGZsYW56ZTsgS2FybCBCbG9zc2ZlbGR0IChHZXJtYW4sIDE4NjUgLSAxOTMyKTsgQmVybGluLCBHZXJtYW55OyAxOTI4OyBHZWxhdGluIHNpbHZlciBwcmludDsgMTUuOSDDlyAyMCBjbSAoNiAxLzQgw5cgNyA3LzggaW4uKTsgODQuWE0uMTQyLjc8L3JkZjpsaT4KICAgPC9yZGY6QWx0PgogIDwvZGM6ZGVzY3JpcHRpb24+CiAgPGRjOnRpdGxlPgogICA8cmRmOkFsdD4KICAgIDxyZGY6bGkgeG1sOmxhbmc9J3gtZGVmYXVsdCc+QWxsaXVtIG9zdHJvd3NraWFudW0sIEtub2JsYXVjaHBmbGFuemU8L3JkZjpsaT4KICAgPC9yZGY6QWx0PgogIDwvZGM6dGl0bGU+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOnBob3Rvc2hvcD0naHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyc+CiAgPHBob3Rvc2hvcDpTb3VyY2U+VGhlIEouIFBhdWwgR2V0dHkgTXVzZXVtLCBMb3MgQW5nZWxlczwvcGhvdG9zaG9wOlNvdXJjZT4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6eG1wPSdodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvJz4KICA8eG1wOk1ldGFkYXRhRGF0ZT4yMDE2LTA0LTEzVDEyOjMzOjE4PC94bXA6TWV0YWRhdGFEYXRlPgogPC9yZGY6RGVzY3JpcHRpb24+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczp4bXBSaWdodHM9J2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9yaWdodHMvJz4KICA8eG1wUmlnaHRzOlVzYWdlVGVybXM+CiAgIDxyZGY6QWx0PgogICAgPHJkZjpsaSB4bWw6bGFuZz0neC1kZWZhdWx0Jz5odHRwOi8vd3d3LmdldHR5LmVkdS9sZWdhbC9pbWFnZV9yZXF1ZXN0LzwvcmRmOmxpPgogICA8L3JkZjpBbHQ+CiAgPC94bXBSaWdodHM6VXNhZ2VUZXJtcz4KIDwvcmRmOkRlc2NyaXB0aW9uPgo8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSd3Jz8+/9sAQwACAQEBAQECAQEBAgICAgIEAwICAgIFBAQDBAYFBgYGBQYGBgcJCAYHCQcGBggLCAkKCgoKCgYICwwLCgwJCgoK/9sAQwECAgICAgIFAwMFCgcGBwoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoK/8AAEQgEAAMnAwERAAIRAQMRAf/EAB4AAAIBBQEBAQAAAAAAAAAAAAABBwIFBggJBAMK/8QAUBAAAQMCBQIEAwUGBAUDAQIPAQIDEQAEBQYSITEHQQgTUWEicYEJFDKRoRUjQrHB8ApS0eEWJDNi8RdDclOCkhglNGOiwpOyGTVEZHSDlP/EABoBAQEBAQEBAQAAAAAAAAAAAAABAgMEBQb/xAAoEQEBAAIDAQABBQEBAAMBAQAAAREhAjFBAxIiMlFhcQQTIzNCgaH/2gAM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';


// EXPORTS //

module.exports = data;

},{}],14:[function(require,module,exports){
(function (__filename){
/* proxyquireify injected requires to make browserify include dependencies in the bundle */ /* istanbul ignore next */; (function __makeBrowserifyIncludeModule__() { require('./../lib/allium_oreophilum.js');});'use strict';

// MODULES //

var tape = require( 'tape' );
var proxyquire = require('proxyquireify')(require);
var image = require( './../lib/allium_oreophilum.js' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof image, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function throws an error if unable to load data', function test( t ) {
	var image = proxyquire( './../lib/allium_oreophilum.js', {
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

}).call(this,"/lib/node_modules/@stdlib/datasets/img-allium-oreophilum/test/test.allium_oreophilum.js")
},{"./../lib/allium_oreophilum.js":11,"proxyquireify":66,"tape":89}],15:[function(require,module,exports){
(function (__filename){
/* proxyquireify injected requires to make browserify include dependencies in the bundle */ /* istanbul ignore next */; (function __makeBrowserifyIncludeModule__() { require('./../lib');});'use strict';

// MODULES //

var tape = require( 'tape' );
var proxyquire = require('proxyquireify')(require);
var isBuffer = require( '@stdlib/assert/is-buffer' );
var image = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof image, 'function', 'main export is a function' );
	t.end();
});

tape( 'main export is a function (browser)', function test( t ) {
	var image = proxyquire( './../lib', {
		'@stdlib/assert/is-browser': true
	});
	t.equal( typeof image, 'function', 'main export is a function' );
	t.end();
});

tape( 'main export is a function (non-browser)', function test( t ) {
	var image = proxyquire( './../lib', {
		'@stdlib/assert/is-browser': false
	});
	t.equal( typeof image, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a buffer object', function test( t ) {
	var data = image();
	t.equal( isBuffer( data ), true, 'returns a buffer object' );
	t.end();
});

tape( 'the function returns a buffer object (browser)', function test( t ) {
	var image;
	var data;

	image = proxyquire( './../lib', {
		'@stdlib/assert/is-browser': true
	});

	data = image();
	t.equal( isBuffer( data ), true, 'returns a buffer object' );
	t.end();
});

tape( 'the function returns a buffer object (non-browser)', function test( t ) {
	var image;
	var data;

	image = proxyquire( './../lib', {
		'@stdlib/assert/is-browser': false
	});

	data = image();
	t.equal( isBuffer( data ), true, 'returns a buffer object' );
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/datasets/img-allium-oreophilum/test/test.js")
},{"./../lib":12,"@stdlib/assert/is-buffer":5,"proxyquireify":66,"tape":89}],16:[function(require,module,exports){
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
} // end FUNCTION readFile()


// EXPORTS //

module.exports = readFile;

},{"fs":32}],17:[function(require,module,exports){
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
var readFile = require( './async.js' );
var sync = require( './sync.js' );


// MAIN //

setReadOnly( readFile, 'sync', sync );


// EXPORTS //

module.exports = readFile;

},{"./async.js":16,"./sync.js":18,"@stdlib/utils/define-read-only-property":20}],18:[function(require,module,exports){
/* eslint-disable no-sync */
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
			f = fs.readFileSync( file, options );
		} else {
			f = fs.readFileSync( file );
		}
	} catch ( err ) {
		return err;
	}
	return f;
} // end FUNCTION readFileSync()


// EXPORTS //

module.exports = readFileSync;

},{"fs":32}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
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

},{"./define_read_only_property.js":19}],21:[function(require,module,exports){
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

},{}],22:[function(require,module,exports){
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

},{"./detect_symbol_support.js":21}],23:[function(require,module,exports){
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

},{"@stdlib/utils/detect-symbol-support":22}],24:[function(require,module,exports){
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

},{"./has_tostringtag_support.js":23}],25:[function(require,module,exports){
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

},{"./native_class.js":26,"./polyfill.js":27,"@stdlib/utils/detect-tostringtag-support":24}],26:[function(require,module,exports){
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

},{"./tostring.js":28}],27:[function(require,module,exports){
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

},{"./tostring.js":28,"./tostringtag.js":29,"@stdlib/assert/has-own-property":2}],28:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = Object.prototype.toString; // eslint-disable-line no-redeclare

},{}],29:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';

},{}],30:[function(require,module,exports){
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

},{}],31:[function(require,module,exports){

},{}],32:[function(require,module,exports){
arguments[4][31][0].apply(exports,arguments)
},{"dup":31}],33:[function(require,module,exports){
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

},{}],34:[function(require,module,exports){
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

},{"base64-js":30,"ieee754":54}],35:[function(require,module,exports){
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
},{"../../is-buffer/index.js":56}],36:[function(require,module,exports){
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

},{"./lib/is_arguments.js":37,"./lib/keys.js":38}],37:[function(require,module,exports){
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

},{}],38:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],39:[function(require,module,exports){
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

},{"foreach":50,"object-keys":62}],40:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],41:[function(require,module,exports){
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

},{"./helpers/isFinite":42,"./helpers/isNaN":43,"./helpers/mod":44,"./helpers/sign":45,"es-to-primitive/es5":46,"has":53,"is-callable":57}],42:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],43:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],44:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],45:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],46:[function(require,module,exports){
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

},{"./helpers/isPrimitive":47,"is-callable":57}],47:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],48:[function(require,module,exports){
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

},{}],49:[function(require,module,exports){
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

},{"is-object":58,"merge-descriptors":59}],50:[function(require,module,exports){

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


},{}],51:[function(require,module,exports){
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

},{}],52:[function(require,module,exports){
var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":51}],53:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":52}],54:[function(require,module,exports){
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

},{}],55:[function(require,module,exports){
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

},{}],56:[function(require,module,exports){
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

},{}],57:[function(require,module,exports){
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

},{}],58:[function(require,module,exports){
"use strict";

module.exports = function isObject(x) {
	return typeof x === "object" && x !== null;
};

},{}],59:[function(require,module,exports){
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

},{}],60:[function(require,module,exports){
'use strict'

module.exports = function createNotFoundError (path) {
  var err = new Error('Cannot find module \'' + path + '\'')
  err.code = 'MODULE_NOT_FOUND'
  return err
}

},{}],61:[function(require,module,exports){
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

},{}],62:[function(require,module,exports){
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

},{"./isArguments":63}],63:[function(require,module,exports){
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

},{}],64:[function(require,module,exports){
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
},{"_process":33}],65:[function(require,module,exports){
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
},{"_process":33}],66:[function(require,module,exports){
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

},{"fill-keys":49,"module-not-found-error":60}],67:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":68}],68:[function(require,module,exports){
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
},{"./_stream_readable":70,"./_stream_writable":72,"core-util-is":35,"inherits":55,"process-nextick-args":65}],69:[function(require,module,exports){
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
},{"./_stream_transform":71,"core-util-is":35,"inherits":55}],70:[function(require,module,exports){
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
},{"./_stream_duplex":68,"./internal/streams/BufferList":73,"./internal/streams/destroy":74,"./internal/streams/stream":75,"_process":33,"core-util-is":35,"events":48,"inherits":55,"isarray":76,"process-nextick-args":65,"safe-buffer":83,"string_decoder/":77,"util":31}],71:[function(require,module,exports){
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
},{"./_stream_duplex":68,"core-util-is":35,"inherits":55}],72:[function(require,module,exports){
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
},{"./_stream_duplex":68,"./internal/streams/destroy":74,"./internal/streams/stream":75,"_process":33,"core-util-is":35,"inherits":55,"process-nextick-args":65,"safe-buffer":83,"util-deprecate":95}],73:[function(require,module,exports){
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
},{"safe-buffer":83}],74:[function(require,module,exports){
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
},{"process-nextick-args":65}],75:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":48}],76:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],77:[function(require,module,exports){
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
},{"safe-buffer":83}],78:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":79}],79:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":68,"./lib/_stream_passthrough.js":69,"./lib/_stream_readable.js":70,"./lib/_stream_transform.js":71,"./lib/_stream_writable.js":72}],80:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":79}],81:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":72}],82:[function(require,module,exports){
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
},{"_process":33,"through":94}],83:[function(require,module,exports){
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

},{"buffer":34}],84:[function(require,module,exports){
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

},{"events":48,"inherits":55,"readable-stream/duplex.js":67,"readable-stream/passthrough.js":78,"readable-stream/readable.js":79,"readable-stream/transform.js":80,"readable-stream/writable.js":81}],85:[function(require,module,exports){
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

},{"es-abstract/es5":41,"function-bind":52}],86:[function(require,module,exports){
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

},{"./implementation":85,"./polyfill":87,"./shim":88,"define-properties":39,"function-bind":52}],87:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":85}],88:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":87,"define-properties":39}],89:[function(require,module,exports){
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
},{"./lib/default_stream":90,"./lib/results":92,"./lib/test":93,"_process":33,"defined":40,"through":94}],90:[function(require,module,exports){
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
},{"_process":33,"fs":32,"through":94}],91:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":33}],92:[function(require,module,exports){
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
},{"_process":33,"events":48,"function-bind":52,"has":53,"inherits":55,"object-inspect":61,"resumer":82,"through":94}],93:[function(require,module,exports){
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
},{"./next_tick":91,"deep-equal":36,"defined":40,"events":48,"has":53,"inherits":55,"path":64,"string.prototype.trim":86}],94:[function(require,module,exports){
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
},{"_process":33,"stream":84}],95:[function(require,module,exports){
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
},{}]},{},[14,15]);
