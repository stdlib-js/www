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

},{"./object.js":6,"./primitive.js":7}],4:[function(require,module,exports){
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

},{"./generic.js":3,"./object.js":6,"./primitive.js":7,"@stdlib/utils/define-read-only-property":46}],5:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-integer":24,"@stdlib/math/constants/float64-ninf":38,"@stdlib/math/constants/float64-pinf":39}],6:[function(require,module,exports){
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

},{"./integer.js":5,"@stdlib/assert/is-number":13}],7:[function(require,module,exports){
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

},{"./integer.js":5,"@stdlib/assert/is-number":13}],8:[function(require,module,exports){
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

},{"./object.js":10,"./primitive.js":11}],9:[function(require,module,exports){
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

},{"./generic.js":8,"./object.js":10,"./primitive.js":11,"@stdlib/utils/define-read-only-property":46}],10:[function(require,module,exports){
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

},{"@stdlib/assert/is-integer":4}],11:[function(require,module,exports){
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

},{"@stdlib/assert/is-integer":4}],12:[function(require,module,exports){
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

},{"./object.js":14,"./primitive.js":15}],13:[function(require,module,exports){
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

},{"./generic.js":12,"./object.js":14,"./primitive.js":15,"@stdlib/utils/define-read-only-property":46}],14:[function(require,module,exports){
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

},{"./try2serialize.js":17,"@stdlib/utils/detect-tostringtag-support":50,"@stdlib/utils/native-class":51}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
'use strict';

// eslint-disable-next-line no-redeclare
var toString = Number.prototype.toString; // non-generic


// EXPORTS //

module.exports = toString;

},{}],17:[function(require,module,exports){
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

},{"./tostring.js":16}],18:[function(require,module,exports){
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

},{"./object.js":20,"./primitive.js":21}],19:[function(require,module,exports){
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

},{"./generic.js":18,"./object.js":20,"./primitive.js":21,"@stdlib/utils/define-read-only-property":46}],20:[function(require,module,exports){
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

},{"./try2valueof.js":22,"@stdlib/utils/detect-tostringtag-support":50,"@stdlib/utils/native-class":51}],21:[function(require,module,exports){
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

},{}],22:[function(require,module,exports){
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

},{"./valueof.js":23}],23:[function(require,module,exports){
'use strict';

// eslint-disable-next-line no-redeclare
var valueOf = String.prototype.valueOf; // non-generic


// EXPORTS //

module.exports = valueOf;

},{}],24:[function(require,module,exports){
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

},{"./is_integer.js":25}],25:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":29}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
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

},{"./ceil.js":26}],28:[function(require,module,exports){
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

},{}],29:[function(require,module,exports){
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

},{"./floor.js":28}],30:[function(require,module,exports){
'use strict';

// MODULES //

var floor = require( '@stdlib/math/base/special/floor' );


// VARIABLES //

var NBITS = 32;


// MAIN //

/**
* Converts a nonnegative integer to a literal bit representation using the divide-by-2 algorithm.
*
* @private
* @param {NonNegativeInteger} x - nonnegative integer
* @returns {BinaryString} bit representation
*
* @example
* var v = div2( 3 );
* // returns '11'
* @example
* var v = div2( 0 );
* // returns ''
* @example
* var v = div2( 12 );
* // returns '1100'
* @example
* var v = div2( 188 );
* // returns '10111100'
*/
function div2( x ) {
	var str = '';
	var i;
	var y;

	// We repeatedly divide by 2 and check for a remainder. If a remainder exists, the number is odd and we add a '1' bit...
	i = NBITS;
	while ( x > 0 && i ) {
		y = x / 2;
		x = floor( y );
		if ( y === x ) {
			str = '0' + str;
		} else {
			str = '1' + str;
		}
		i -= 1;
	}
	return str;
} // end FUNCTION div2()


// EXPORTS //

module.exports = div2;

},{"@stdlib/math/base/special/floor":29}],31:[function(require,module,exports){
'use strict';

/**
* Return a string giving the literal bit representation of an unsigned 32-bit integer.
*
* @module @stdlib/math/base/utils/uint32-to-binary-string
*
* @example
* var toBinaryString = require( '@stdlib/math/base/utils/uint32-to-binary-string' );
* var a = new Uint32Array( [ 1, 4, 9 ] );
*
* var str = toBinaryString( a[0] );
* // returns '00000000000000000000000000000001'
*
* str = toBinaryString( a[1] );
* // returns '00000000000000000000000000000100'
*
* str = toBinaryString( a[2] );
* // returns '00000000000000000000000000001001'
*/

// MODULES //

var toBinaryString = require( './to_binary_string.js' );


// EXPORTS //

module.exports = toBinaryString;

},{"./to_binary_string.js":32}],32:[function(require,module,exports){
'use strict';

// MODULES //

var lpad = require( '@stdlib/string/left-pad' );
var div2 = require( './div2.js' );


// VARIABLES //

var NBITS = 32;


// MAIN //

/**
* Returns a string giving the literal bit representation of an unsigned 32-bit integer.
*
* @param {uinteger32} x - input value
* @returns {BinaryString} bit representation
*
* @example
* var a = new Uint32Array( [ 1 ] );
* var str = toBinaryString( a[0] );
* // returns '00000000000000000000000000000001'
* @example
* var a = new Uint32Array( [ 4 ] );
* var str = toBinaryString( a[0] );
* // returns '00000000000000000000000000000100'
* @example
* var a = new Uint32Array( [ 9 ] );
* var str = toBinaryString( a[0] );
* // returns '00000000000000000000000000001001'
*/
function toBinaryString( x ) {
	var b;

	// Convert the input value to a bit string:
	b = div2( x );

	// Left pad the bit string to ensure 32 bits are represented:
	b = lpad( b, NBITS, '0' );

	return b;
} // end FUNCTION toBinaryString()


// EXPORTS //

module.exports = toBinaryString;

},{"./div2.js":30,"@stdlib/string/left-pad":41}],33:[function(require,module,exports){
module.exports={"expected":["00000101111101011110000100000000","00000110000000111001110010100000","00000110000100010101100001000000","00000110000111110001001111100000","00000110001011001100111110000000","00000110001110101000101100100000","00000110010010000100011011000000","00000110010101100000001001100000","00000110011000111011111000000000","00000110011100010111100110100000","00000110011111110011010101000000","00000110100011001111000011100000","00000110100110101010110010000000","00000110101010000110100000100000","00000110101101100010001111000000","00000110110000111101111101100000","00000110110100011001101100000000","00000110110111110101011010100000","00000110111011010001001001000000","00000110111110101100110111100000","00000111000010001000100110000000","00000111000101100100010100100000","00000111001001000000000011000000","00000111001100011011110001100000","00000111001111110111100000000000","00000111010011010011001110100000","00000111010110101110111101000000","00000111011010001010101011100000","00000111011101100110011010000000","00000111100001000010001000100000","00000111100100011101110111000000","00000111100111111001100101100000","00000111101011010101010100000000","00000111101110110001000010100000","00000111110010001100110001000000","00000111110101101000011111100000","00000111111001000100001110000000","00000111111100011111111100100000","00000111111111111011101011000000","00001000000011010111011001100000","00001000000110110011001000000000","00001000001010001110110110100000","00001000001101101010100101000000","00001000010001000110010011100000","00001000010100100010000010000000","00001000010111111101110000100000","00001000011011011001011111000000","00001000011110110101001101100000","00001000100010010000111100000000","00001000100101101100101010100000","00001000101001001000011001000000","00001000101100100100000111100000","00001000101111111111110110000000","00001000110011011011100100100000","00001000110110110111010011000000","00001000111010010011000001100000","00001000111101101110110000000000","00001001000001001010011110100000","00001001000100100110001101000000","00001001001000000001111011100000","00001001001011011101101010000000","00001001001110111001011000100000","00001001010010010101000111000000","00001001010101110000110101100000","00001001011001001100100100000000","00001001011100101000010010100000","00001001100000000100000001000000","00001001100011011111101111100000","00001001100110111011011110000000","00001001101010010111001100100000","00001001101101110010111011000000","00001001110001001110101001100000","00001001110100101010011000000000","00001001111000000110000110100000","00001001111011100001110101000000","00001001111110111101100011100000","00001010000010011001010010000000","00001010000101110101000000100000","00001010001001010000101111000000","00001010001100101100011101100000","00001010010000001000001100000000","00001010010011100011111010100000","00001010010110111111101001000000","00001010011010011011010111100000","00001010011101110111000110000000","00001010100001010010110100100000","00001010100100101110100011000000","00001010101000001010010001100000","00001010101011100110000000000000","00001010101111000001101110100000","00001010110010011101011101000000","00001010110101111001001011100000","00001010111001010100111010000000","00001010111100110000101000100000","00001011000000001100010111000000","00001011000011101000000101100000","00001011000111000011110100000000","00001011001010011111100010100000","00001011001101111011010001000000","00001011010001010110111111100000","00001011010100110010101110000000","00001011011000001110011100100000","00001011011011101010001011000000","00001011011111000101111001100000","00001011100010100001101000000000","00001011100101111101010110100000","00001011101001011001000101000000","00001011101100110100110011100000","00001011110000010000100010000000","00001011110011101100010000100000","00001011110111000111111111000000","00001011111010100011101101100000","00001011111101111111011100000000","00001100000001011011001010100000","00001100000100110110111001000000","00001100001000010010100111100000","00001100001011101110010110000000","00001100001111001010000100100000","00001100010010100101110011000000","00001100010110000001100001100000","00001100011001011101010000000000","00001100011100111000111110100000","00001100100000010100101101000000","00001100100011110000011011100000","00001100100111001100001010000000","00001100101010100111111000100000","00001100101110000011100111000000","00001100110001011111010101100000","00001100110100111011000100000000","00001100111000010110110010100000","00001100111011110010100001000000","00001100111111001110001111100000","00001101000010101001111110000000","00001101000110000101101100100000","00001101001001100001011011000000","00001101001100111101001001100000","00001101010000011000111000000000","00001101010011110100100110100000","00001101010111010000010101000000","00001101011010101100000011100000","00001101011110000111110010000000","00001101100001100011100000100000","00001101100100111111001111000000","00001101101000011010111101100000","00001101101011110110101100000000","00001101101111010010011010100000","00001101110010101110001001000000","00001101110110001001110111100000","00001101111001100101100110000000","00001101111101000001010100100000","00001110000000011101000011000000","00001110000011111000110001100000","00001110000111010100100000000000","00001110001010110000001110100000","00001110001110001011111101000000","00001110010001100111101011100000","00001110010101000011011010000000","00001110011000011111001000100000","00001110011011111010110111000000","00001110011111010110100101100000","00001110100010110010010100000000","00001110100110001110000010100000","00001110101001101001110001000000","00001110101101000101011111100000","00001110110000100001001110000000","00001110110011111100111100100000","00001110110111011000101011000000","00001110111010110100011001100000","00001110111110010000001000000000","00001111000001101011110110100000","00001111000101000111100101000000","00001111001000100011010011100000","00001111001011111111000010000000","00001111001111011010110000100000","00001111010010110110011111000000","00001111010110010010001101100000","00001111011001101101111100000000","00001111011101001001101010100000","00001111100000100101011001000000","00001111100100000001000111100000","00001111100111011100110110000000","00001111101010111000100100100000","00001111101110010100010011000000","00001111110001110000000001100000","00001111110101001011110000000000","00001111111000100111011110100000","00001111111100000011001101000000","00001111111111011110111011100000","00010000000010111010101010000000","00010000000110010110011000100000","00010000001001110010000111000000","00010000001101001101110101100000","00010000010000101001100100000000","00010000010100000101010010100000","00010000010111100001000001000000","00010000011010111100101111100000","00010000011110011000011110000000","00010000100001110100001100100000","00010000100101001111111011000000","00010000101000101011101001100000","00010000101100000111011000000000","00010000101111100011000110100000","00010000110010111110110101000000","00010000110110011010100011100000","00010000111001110110010010000000","00010000111101010010000000100000","00010001000000101101101111000000","00010001000100001001011101100000","00010001000111100101001100000000","00010001001011000000111010100000","00010001001110011100101001000000","00010001010001111000010111100000","00010001010101010100000110000000","00010001011000101111110100100000","00010001011100001011100011000000","00010001011111100111010001100000","00010001100011000011000000000000","00010001100110011110101110100000","00010001101001111010011101000000","00010001101101010110001011100000","00010001110000110001111010000000","00010001110100001101101000100000","00010001110111101001010111000000","00010001111011000101000101100000","00010001111110100000110100000000","00010010000001111100100010100000","00010010000101011000010001000000","00010010001000110011111111100000","00010010001100001111101110000000","00010010001111101011011100100000","00010010010011000111001011000000","00010010010110100010111001100000","00010010011001111110101000000000","00010010011101011010010110100000","00010010100000110110000101000000","00010010100100010001110011100000","00010010100111101101100010000000","00010010101011001001010000100000","00010010101110100100111111000000","00010010110010000000101101100000","00010010110101011100011100000000","00010010111000111000001010100000","00010010111100010011111001000000","00010010111111101111100111100000","00010011000011001011010110000000","00010011000110100111000100100000","00010011001010000010110011000000","00010011001101011110100001100000","00010011010000111010010000000000","00010011010100010101111110100000","00010011010111110001101101000000","00010011011011001101011011100000","00010011011110101001001010000000","00010011100010000100111000100000","00010011100101100000100111000000","00010011101000111100010101100000","00010011101100011000000100000000","00010011101111110011110010100000","00010011110011001111100001000000","00010011110110101011001111100000","00010011111010000110111110000000","00010011111101100010101100100000","00010100000000111110011011000000","00010100000100011010001001100000","00010100000111110101111000000000","00010100001011010001100110100000","00010100001110101101010101000000","00010100010010001001000011100000","00010100010101100100110010000000","00010100011001000000100000100000","00010100011100011100001111000000","00010100011111110111111101100000","00010100100011010011101100000000","00010100100110101111011010100000","00010100101010001011001001000000","00010100101101100110110111100000","00010100110001000010100110000000","00010100110100011110010100100000","00010100110111111010000011000000","00010100111011010101110001100000","00010100111110110001100000000000","00010101000010001101001110100000","00010101000101101000111101000000","00010101001001000100101011100000","00010101001100100000011010000000","00010101001111111100001000100000","00010101010011010111110111000000","00010101010110110011100101100000","00010101011010001111010100000000","00010101011101101011000010100000","00010101100001000110110001000000","00010101100100100010011111100000","00010101100111111110001110000000","00010101101011011001111100100000","00010101101110110101101011000000","00010101110010010001011001100000","00010101110101101101001000000000","00010101111001001000110110100000","00010101111100100100100101000000","00010110000000000000010011100000","00010110000011011100000010000000","00010110000110110111110000100000","00010110001010010011011111000000","00010110001101101111001101100000","00010110010001001010111100000000","00010110010100100110101010100000","00010110011000000010011001000000","00010110011011011110000111100000","00010110011110111001110110000000","00010110100010010101100100100000","00010110100101110001010011000000","00010110101001001101000001100000","00010110101100101000110000000000","00010110110000000100011110100000","00010110110011100000001101000000","00010110110110111011111011100000","00010110111010010111101010000000","00010110111101110011011000100000","00010111000001001111000111000000","00010111000100101010110101100000","00010111001000000110100100000000","00010111001011100010010010100000","00010111001110111110000001000000","00010111010010011001101111100000","00010111010101110101011110000000","00010111011001010001001100100000","00010111011100101100111011000000","00010111100000001000101001100000","00010111100011100100011000000000","00010111100111000000000110100000","00010111101010011011110101000000","00010111101101110111100011100000","00010111110001010011010010000000","00010111110100101111000000100000","00010111111000001010101111000000","00010111111011100110011101100000","00010111111111000010001100000000","00011000000010011101111010100000","00011000000101111001101001000000","00011000001001010101010111100000","00011000001100110001000110000000","00011000010000001100110100100000","00011000010011101000100011000000","00011000010111000100010001100000","00011000011010100000000000000000","00011000011101111011101110100000","00011000100001010111011101000000","00011000100100110011001011100000","00011000101000001110111010000000","00011000101011101010101000100000","00011000101111000110010111000000","00011000110010100010000101100000","00011000110101111101110100000000","00011000111001011001100010100000","00011000111100110101010001000000","00011001000000010000111111100000","00011001000011101100101110000000","00011001000111001000011100100000","00011001001010100100001011000000","00011001001101111111111001100000","00011001010001011011101000000000","00011001010100110111010110100000","00011001011000010011000101000000","00011001011011101110110011100000","00011001011111001010100010000000","00011001100010100110010000100000","00011001100110000001111111000000","00011001101001011101101101100000","00011001101100111001011100000000","00011001110000010101001010100000","00011001110011110000111001000000","00011001110111001100100111100000","00011001111010101000010110000000","00011001111110000100000100100000","00011010000001011111110011000000","00011010000100111011100001100000","00011010001000010111010000000000","00011010001011110010111110100000","00011010001111001110101101000000","00011010010010101010011011100000","00011010010110000110001010000000","00011010011001100001111000100000","00011010011100111101100111000000","00011010100000011001010101100000","00011010100011110101000100000000","00011010100111010000110010100000","00011010101010101100100001000000","00011010101110001000001111100000","00011010110001100011111110000000","00011010110100111111101100100000","00011010111000011011011011000000","00011010111011110111001001100000","00011010111111010010111000000000","00011011000010101110100110100000","00011011000110001010010101000000","00011011001001100110000011100000","00011011001101000001110010000000","00011011010000011101100000100000","00011011010011111001001111000000","00011011010111010100111101100000","00011011011010110000101100000000","00011011011110001100011010100000","00011011100001101000001001000000","00011011100101000011110111100000","00011011101000011111100110000000","00011011101011111011010100100000","00011011101111010111000011000000","00011011110010110010110001100000","00011011110110001110100000000000","00011011111001101010001110100000","00011011111101000101111101000000","00011100000000100001101011100000","00011100000011111101011010000000","00011100000111011001001000100000","00011100001010110100110111000000","00011100001110010000100101100000","00011100010001101100010100000000","00011100010101001000000010100000","00011100011000100011110001000000","00011100011011111111011111100000","00011100011111011011001110000000","00011100100010110110111100100000","00011100100110010010101011000000","00011100101001101110011001100000","00011100101101001010001000000000","00011100110000100101110110100000","00011100110100000001100101000000","00011100110111011101010011100000","00011100111010111001000010000000","00011100111110010100110000100000","00011101000001110000011111000000","00011101000101001100001101100000","00011101001000100111111100000000","00011101001100000011101010100000","00011101001111011111011001000000","00011101010010111011000111100000","00011101010110010110110110000000","00011101011001110010100100100000","00011101011101001110010011000000","00011101100000101010000001100000","00011101100100000101110000000000","00011101100111100001011110100000","00011101101010111101001101000000","00011101101110011000111011100000","00011101110001110100101010000000","00011101110101010000011000100000","00011101111000101100000111000000","00011101111100000111110101100000","00011101111111100011100100000000","00011110000010111111010010100000","00011110000110011011000001000000","00011110001001110110101111100000","00011110001101010010011110000000","00011110010000101110001100100000","00011110010100001001111011000000","00011110010111100101101001100000","00011110011011000001011000000000","00011110011110011101000110100000","00011110100001111000110101000000","00011110100101010100100011100000","00011110101000110000010010000000","00011110101100001100000000100000","00011110101111100111101111000000","00011110110011000011011101100000","00011110110110011111001100000000","00011110111001111010111010100000","00011110111101010110101001000000","00011111000000110010010111100000","00011111000100001110000110000000","00011111000111101001110100100000","00011111001011000101100011000000","00011111001110100001010001100000","00011111010001111101000000000000","00011111010101011000101110100000","00011111011000110100011101000000","00011111011100010000001011100000","00011111011111101011111010000000","00011111100011000111101000100000","00011111100110100011010111000000","00011111101001111111000101100000","00011111101101011010110100000000","00011111110000110110100010100000","00011111110100010010010001000000","00011111110111101101111111100000","00011111111011001001101110000000","00011111111110100101011100100000","00100000000010000001001011000000","00100000000101011100111001100000","00100000001000111000101000000000","00100000001100010100010110100000","00100000001111110000000101000000","00100000010011001011110011100000","00100000010110100111100010000000","00100000011010000011010000100000","00100000011101011110111111000000","00100000100000111010101101100000","00100000100100010110011100000000","00100000100111110010001010100000","00100000101011001101111001000000","00100000101110101001100111100000","00100000110010000101010110000000","00100000110101100001000100100000","00100000111000111100110011000000","00100000111100011000100001100000","00100000111111110100010000000000","00100001000011001111111110100000","00100001000110101011101101000000","00100001001010000111011011100000","00100001001101100011001010000000","00100001010000111110111000100000","00100001010100011010100111000000","00100001010111110110010101100000","00100001011011010010000100000000","00100001011110101101110010100000","00100001100010001001100001000000","00100001100101100101001111100000","00100001101001000000111110000000","00100001101100011100101100100000","00100001101111111000011011000000","00100001110011010100001001100000","00100001110110101111111000000000","00100001111010001011100110100000","00100001111101100111010101000000","00100010000001000011000011100000","00100010000100011110110010000000","00100010000111111010100000100000","00100010001011010110001111000000","00100010001110110001111101100000","00100010010010001101101100000000","00100010010101101001011010100000","00100010011001000101001001000000","00100010011100100000110111100000","00100010011111111100100110000000","00100010100011011000010100100000","00100010100110110100000011000000","00100010101010001111110001100000","00100010101101101011100000000000","00100010110001000111001110100000","00100010110100100010111101000000","00100010110111111110101011100000","00100010111011011010011010000000","00100010111110110110001000100000","00100011000010010001110111000000","00100011000101101101100101100000","00100011001001001001010100000000","00100011001100100101000010100000","00100011010000000000110001000000","00100011010011011100011111100000","00100011010110111000001110000000","00100011011010010011111100100000","00100011011101101111101011000000","00100011100001001011011001100000","00100011100100100111001000000000","00100011101000000010110110100000","00100011101011011110100101000000","00100011101110111010010011100000","00100011110010010110000010000000","00100011110101110001110000100000","00100011111001001101011111000000","00100011111100101001001101100000","00100100000000000100111100000000","00100100000011100000101010100000","00100100000110111100011001000000","00100100001010011000000111100000","00100100001101110011110110000000","00100100010001001111100100100000","00100100010100101011010011000000","00100100011000000111000001100000","00100100011011100010110000000000","00100100011110111110011110100000","00100100100010011010001101000000","00100100100101110101111011100000","00100100101001010001101010000000","00100100101100101101011000100000","00100100110000001001000111000000","00100100110011100100110101100000","00100100110111000000100100000000","00100100111010011100010010100000","00100100111101111000000001000000","00100101000001010011101111100000","00100101000100101111011110000000","00100101001000001011001100100000","00100101001011100110111011000000","00100101001111000010101001100000","00100101010010011110011000000000","00100101010101111010000110100000","00100101011001010101110101000000","00100101011100110001100011100000","00100101100000001101010010000000","00100101100011101001000000100000","00100101100111000100101111000000","00100101101010100000011101100000","00100101101101111100001100000000","00100101110001010111111010100000","00100101110100110011101001000000","00100101111000001111010111100000","00100101111011101011000110000000","00100101111111000110110100100000","00100110000010100010100011000000","00100110000101111110010001100000","00100110001001011010000000000000","00100110001100110101101110100000","00100110010000010001011101000000","00100110010011101101001011100000","00100110010111001000111010000000","00100110011010100100101000100000","00100110011110000000010111000000","00100110100001011100000101100000","00100110100100110111110100000000","00100110101000010011100010100000","00100110101011101111010001000000","00100110101111001010111111100000","00100110110010100110101110000000","00100110110110000010011100100000","00100110111001011110001011000000","00100110111100111001111001100000","00100111000000010101101000000000","00100111000011110001010110100000","00100111000111001101000101000000","00100111001010101000110011100000","00100111001110000100100010000000","00100111010001100000010000100000","00100111010100111011111111000000","00100111011000010111101101100000","00100111011011110011011100000000","00100111011111001111001010100000","00100111100010101010111001000000","00100111100110000110100111100000","00100111101001100010010110000000","00100111101100111110000100100000","00100111110000011001110011000000","00100111110011110101100001100000","00100111110111010001010000000000","00100111111010101100111110100000","00100111111110001000101101000000","00101000000001100100011011100000","00101000000101000000001010000000","00101000001000011011111000100000","00101000001011110111100111000000","00101000001111010011010101100000","00101000010010101111000100000000","00101000010110001010110010100000","00101000011001100110100001000000","00101000011101000010001111100000","00101000100000011101111110000000","00101000100011111001101100100000","00101000100111010101011011000000","00101000101010110001001001100000","00101000101110001100111000000000","00101000110001101000100110100000","00101000110101000100010101000000","00101000111000100000000011100000","00101000111011111011110010000000","00101000111111010111100000100000","00101001000010110011001111000000","00101001000110001110111101100000","00101001001001101010101100000000","00101001001101000110011010100000","00101001010000100010001001000000","00101001010011111101110111100000","00101001010111011001100110000000","00101001011010110101010100100000","00101001011110010001000011000000","00101001100001101100110001100000","00101001100101001000100000000000","00101001101000100100001110100000","00101001101011111111111101000000","00101001101111011011101011100000","00101001110010110111011010000000","00101001110110010011001000100000","00101001111001101110110111000000","00101001111101001010100101100000","00101010000000100110010100000000","00101010000100000010000010100000","00101010000111011101110001000000","00101010001010111001011111100000","00101010001110010101001110000000","00101010010001110000111100100000","00101010010101001100101011000000","00101010011000101000011001100000","00101010011100000100001000000000","00101010011111011111110110100000","00101010100010111011100101000000","00101010100110010111010011100000","00101010101001110011000010000000","00101010101101001110110000100000","00101010110000101010011111000000","00101010110100000110001101100000","00101010110111100001111100000000","00101010111010111101101010100000","00101010111110011001011001000000","00101011000001110101000111100000","00101011000101010000110110000000","00101011001000101100100100100000","00101011001100001000010011000000","00101011001111100100000001100000","00101011010010111111110000000000","00101011010110011011011110100000","00101011011001110111001101000000","00101011011101010010111011100000","00101011100000101110101010000000","00101011100100001010011000100000","00101011100111100110000111000000","00101011101011000001110101100000","00101011101110011101100100000000","00101011110001111001010010100000","00101011110101010101000001000000","00101011111000110000101111100000","00101011111100001100011110000000","00101011111111101000001100100000","00101100000011000011111011000000","00101100000110011111101001100000","00101100001001111011011000000000","00101100001101010111000110100000","00101100010000110010110101000000","00101100010100001110100011100000","00101100010111101010010010000000","00101100011011000110000000100000","00101100011110100001101111000000","00101100100001111101011101100000","00101100100101011001001100000000","00101100101000110100111010100000","00101100101100010000101001000000","00101100101111101100010111100000","00101100110011001000000110000000","00101100110110100011110100100000","00101100111001111111100011000000","00101100111101011011010001100000","00101101000000110111000000000000","00101101000100010010101110100000","00101101000111101110011101000000","00101101001011001010001011100000","00101101001110100101111010000000","00101101010010000001101000100000","00101101010101011101010111000000","00101101011000111001000101100000","00101101011100010100110100000000","00101101011111110000100010100000","00101101100011001100010001000000","00101101100110100111111111100000","00101101101010000011101110000000","00101101101101011111011100100000","00101101110000111011001011000000","00101101110100010110111001100000","00101101110111110010101000000000","00101101111011001110010110100000","00101101111110101010000101000000","00101110000010000101110011100000","00101110000101100001100010000000","00101110001000111101010000100000","00101110001100011000111111000000","00101110001111110100101101100000","00101110010011010000011100000000","00101110010110101100001010100000","00101110011010000111111001000000","00101110011101100011100111100000","00101110100000111111010110000000","00101110100100011011000100100000","00101110100111110110110011000000","00101110101011010010100001100000","00101110101110101110010000000000","00101110110010001001111110100000","00101110110101100101101101000000","00101110111001000001011011100000","00101110111100011101001010000000","00101110111111111000111000100000","00101111000011010100100111000000","00101111000110110000010101100000","00101111001010001100000100000000","00101111001101100111110010100000","00101111010001000011100001000000","00101111010100011111001111100000","00101111010111111010111110000000","00101111011011010110101100100000","00101111011110110010011011000000","00101111100010001110001001100000","00101111100101101001111000000000","00101111101001000101100110100000","00101111101100100001010101000000","00101111101111111101000011100000","00101111110011011000110010000000","00101111110110110100100000100000","00101111111010010000001111000000","00101111111101101011111101100000","00110000000001000111101100000000","00110000000100100011011010100000","00110000000111111111001001000000","00110000001011011010110111100000","00110000001110110110100110000000","00110000010010010010010100100000","00110000010101101110000011000000","00110000011001001001110001100000","00110000011100100101100000000000","00110000100000000001001110100000","00110000100011011100111101000000","00110000100110111000101011100000","00110000101010010100011010000000","00110000101101110000001000100000","00110000110001001011110111000000","00110000110100100111100101100000","00110000111000000011010100000000","00110000111011011111000010100000","00110000111110111010110001000000","00110001000010010110011111100000","00110001000101110010001110000000","00110001001001001101111100100000","00110001001100101001101011000000","00110001010000000101011001100000","00110001010011100001001000000000","00110001010110111100110110100000","00110001011010011000100101000000","00110001011101110100010011100000","00110001100001010000000010000000","00110001100100101011110000100000","00110001101000000111011111000000","00110001101011100011001101100000","00110001101110111110111100000000","00110001110010011010101010100000","00110001110101110110011001000000","00110001111001010010000111100000","00110001111100101101110110000000","00110010000000001001100100100000","00110010000011100101010011000000","00110010000111000001000001100000","00110010001010011100110000000000","00110010001101111000011110100000","00110010010001010100001101000000","00110010010100101111111011100000","00110010011000001011101010000000","00110010011011100111011000100000","00110010011111000011000111000000","00110010100010011110110101100000","00110010100101111010100100000000","00110010101001010110010010100000","00110010101100110010000001000000","00110010110000001101101111100000","00110010110011101001011110000000","00110010110111000101001100100000","00110010111010100000111011000000","00110010111101111100101001100000","00110011000001011000011000000000","00110011000100110100000110100000","00110011001000001111110101000000","00110011001011101011100011100000","00110011001111000111010010000000","00110011010010100011000000100000","00110011010101111110101111000000","00110011011001011010011101100000","00110011011100110110001100000000","00110011100000010001111010100000","00110011100011101101101001000000","00110011100111001001010111100000","00110011101010100101000110000000","00110011101110000000110100100000","00110011110001011100100011000000","00110011110100111000010001100000","00110011111000010100000000000000","00110011111011101111101110100000","00110011111111001011011101000000","00110100000010100111001011100000","00110100000110000010111010000000","00110100001001011110101000100000","00110100001100111010010111000000","00110100010000010110000101100000","00110100010011110001110100000000","00110100010111001101100010100000","00110100011010101001010001000000","00110100011110000100111111100000","00110100100001100000101110000000","00110100100100111100011100100000","00110100101000011000001011000000","00110100101011110011111001100000","00110100101111001111101000000000","00110100110010101011010110100000","00110100110110000111000101000000","00110100111001100010110011100000","00110100111100111110100010000000","00110101000000011010010000100000","00110101000011110101111111000000","00110101000111010001101101100000","00110101001010101101011100000000","00110101001110001001001010100000","00110101010001100100111001000000","00110101010101000000100111100000","00110101011000011100010110000000","00110101011011111000000100100000","00110101011111010011110011000000","00110101100010101111100001100000","00110101100110001011010000000000","00110101101001100110111110100000","00110101101101000010101101000000","00110101110000011110011011100000","00110101110011111010001010000000","00110101110111010101111000100000","00110101111010110001100111000000","00110101111110001101010101100000","00110110000001101001000100000000","00110110000101000100110010100000","00110110001000100000100001000000","00110110001011111100001111100000","00110110001111010111111110000000","00110110010010110011101100100000","00110110010110001111011011000000","00110110011001101011001001100000","00110110011101000110111000000000","00110110100000100010100110100000","00110110100011111110010101000000","00110110100111011010000011100000","00110110101010110101110010000000","00110110101110010001100000100000","00110110110001101101001111000000","00110110110101001000111101100000","00110110111000100100101100000000","00110110111100000000011010100000","00110110111111011100001001000000","00110111000010110111110111100000","00110111000110010011100110000000","00110111001001101111010100100000","00110111001101001011000011000000","00110111010000100110110001100000","00110111010100000010100000000000","00110111010111011110001110100000","00110111011010111001111101000000","00110111011110010101101011100000","00110111100001110001011010000000","00110111100101001101001000100000","00110111101000101000110111000000","00110111101100000100100101100000","00110111101111100000010100000000","00110111110010111100000010100000","00110111110110010111110001000000","00110111111001110011011111100000","00110111111101001111001110000000","00111000000000101010111100100000","00111000000100000110101011000000","00111000000111100010011001100000","00111000001010111110001000000000","00111000001110011001110110100000","00111000010001110101100101000000","00111000010101010001010011100000","00111000011000101101000010000000","00111000011100001000110000100000","00111000011111100100011111000000","00111000100011000000001101100000","00111000100110011011111100000000","00111000101001110111101010100000","00111000101101010011011001000000","00111000110000101111000111100000","00111000110100001010110110000000","00111000110111100110100100100000","00111000111011000010010011000000","00111000111110011110000001100000","00111001000001111001110000000000","00111001000101010101011110100000","00111001001000110001001101000000","00111001001100001100111011100000","00111001001111101000101010000000","00111001010011000100011000100000","00111001010110100000000111000000","00111001011001111011110101100000","00111001011101010111100100000000","00111001100000110011010010100000","00111001100100001111000001000000","00111001100111101010101111100000","00111001101011000110011110000000","00111001101110100010001100100000","00111001110001111101111011000000","00111001110101011001101001100000","00111001111000110101011000000000","00111001111100010001000110100000","00111001111111101100110101000000","00111010000011001000100011100000","00111010000110100100010010000000","00111010001010000000000000100000","00111010001101011011101111000000","00111010010000110111011101100000","00111010010100010011001100000000","00111010010111101110111010100000","00111010011011001010101001000000","00111010011110100110010111100000","00111010100010000010000110000000","00111010100101011101110100100000","00111010101000111001100011000000","00111010101100010101010001100000","00111010101111110001000000000000","00111010110011001100101110100000","00111010110110101000011101000000","00111010111010000100001011100000","00111010111101011111111010000000","00111011000000111011101000100000","00111011000100010111010111000000","00111011000111110011000101100000","00111011001011001110110100000000","00111011001110101010100010100000","00111011010010000110010001000000","00111011010101100001111111100000","00111011011000111101101110000000","00111011011100011001011100100000","00111011011111110101001011000000","00111011100011010000111001100000","00111011100110101100101000000000"],"x":[1.0e8,1.009e8,1.018e8,1.027e8,1.036e8,1.045e8,1.054e8,1.063e8,1.072e8,1.081e8,1.09e8,1.099e8,1.108e8,1.117e8,1.126e8,1.135e8,1.144e8,1.153e8,1.162e8,1.171e8,1.18e8,1.189e8,1.198e8,1.207e8,1.216e8,1.225e8,1.234e8,1.243e8,1.252e8,1.261e8,1.27e8,1.279e8,1.288e8,1.297e8,1.306e8,1.315e8,1.324e8,1.333e8,1.342e8,1.351e8,1.36e8,1.369e8,1.378e8,1.387e8,1.396e8,1.405e8,1.414e8,1.423e8,1.432e8,1.441e8,1.45e8,1.459e8,1.468e8,1.477e8,1.486e8,1.495e8,1.504e8,1.513e8,1.522e8,1.531e8,1.54e8,1.549e8,1.558e8,1.567e8,1.576e8,1.585e8,1.594e8,1.603e8,1.612e8,1.621e8,1.63e8,1.639e8,1.648e8,1.657e8,1.666e8,1.675e8,1.684e8,1.693e8,1.702e8,1.711e8,1.72e8,1.729e8,1.738e8,1.747e8,1.756e8,1.765e8,1.774e8,1.783e8,1.792e8,1.801e8,1.81e8,1.819e8,1.828e8,1.837e8,1.846e8,1.855e8,1.864e8,1.873e8,1.882e8,1.891e8,1.9e8,1.909e8,1.918e8,1.927e8,1.936e8,1.945e8,1.954e8,1.963e8,1.972e8,1.981e8,1.99e8,1.999e8,2.008e8,2.017e8,2.026e8,2.035e8,2.044e8,2.053e8,2.062e8,2.071e8,2.08e8,2.089e8,2.098e8,2.107e8,2.116e8,2.125e8,2.134e8,2.143e8,2.152e8,2.161e8,2.17e8,2.179e8,2.188e8,2.197e8,2.206e8,2.215e8,2.224e8,2.233e8,2.242e8,2.251e8,2.26e8,2.269e8,2.278e8,2.287e8,2.296e8,2.305e8,2.314e8,2.323e8,2.332e8,2.341e8,2.35e8,2.359e8,2.368e8,2.377e8,2.386e8,2.395e8,2.404e8,2.413e8,2.422e8,2.431e8,2.44e8,2.449e8,2.458e8,2.467e8,2.476e8,2.485e8,2.494e8,2.503e8,2.512e8,2.521e8,2.53e8,2.539e8,2.548e8,2.557e8,2.566e8,2.575e8,2.584e8,2.593e8,2.602e8,2.611e8,2.62e8,2.629e8,2.638e8,2.647e8,2.656e8,2.665e8,2.674e8,2.683e8,2.692e8,2.701e8,2.71e8,2.719e8,2.728e8,2.737e8,2.746e8,2.755e8,2.764e8,2.773e8,2.782e8,2.791e8,2.8e8,2.809e8,2.818e8,2.827e8,2.836e8,2.845e8,2.854e8,2.863e8,2.872e8,2.881e8,2.89e8,2.899e8,2.908e8,2.917e8,2.926e8,2.935e8,2.944e8,2.953e8,2.962e8,2.971e8,2.98e8,2.989e8,2.998e8,3.007e8,3.016e8,3.025e8,3.034e8,3.043e8,3.052e8,3.061e8,3.07e8,3.079e8,3.088e8,3.097e8,3.106e8,3.115e8,3.124e8,3.133e8,3.142e8,3.151e8,3.16e8,3.169e8,3.178e8,3.187e8,3.196e8,3.205e8,3.214e8,3.223e8,3.232e8,3.241e8,3.25e8,3.259e8,3.268e8,3.277e8,3.286e8,3.295e8,3.304e8,3.313e8,3.322e8,3.331e8,3.34e8,3.349e8,3.358e8,3.367e8,3.376e8,3.385e8,3.394e8,3.403e8,3.412e8,3.421e8,3.43e8,3.439e8,3.448e8,3.457e8,3.466e8,3.475e8,3.484e8,3.493e8,3.502e8,3.511e8,3.52e8,3.529e8,3.538e8,3.547e8,3.556e8,3.565e8,3.574e8,3.583e8,3.592e8,3.601e8,3.61e8,3.619e8,3.628e8,3.637e8,3.646e8,3.655e8,3.664e8,3.673e8,3.682e8,3.691e8,3.7e8,3.709e8,3.718e8,3.727e8,3.736e8,3.745e8,3.754e8,3.763e8,3.772e8,3.781e8,3.79e8,3.799e8,3.808e8,3.817e8,3.826e8,3.835e8,3.844e8,3.853e8,3.862e8,3.871e8,3.88e8,3.889e8,3.898e8,3.907e8,3.916e8,3.925e8,3.934e8,3.943e8,3.952e8,3.961e8,3.97e8,3.979e8,3.988e8,3.997e8,4.006e8,4.015e8,4.024e8,4.033e8,4.042e8,4.051e8,4.06e8,4.069e8,4.078e8,4.087e8,4.096e8,4.105e8,4.114e8,4.123e8,4.132e8,4.141e8,4.15e8,4.159e8,4.168e8,4.177e8,4.186e8,4.195e8,4.204e8,4.213e8,4.222e8,4.231e8,4.24e8,4.249e8,4.258e8,4.267e8,4.276e8,4.285e8,4.294e8,4.303e8,4.312e8,4.321e8,4.33e8,4.339e8,4.348e8,4.357e8,4.366e8,4.375e8,4.384e8,4.393e8,4.402e8,4.411e8,4.42e8,4.429e8,4.438e8,4.447e8,4.456e8,4.465e8,4.474e8,4.483e8,4.492e8,4.501e8,4.51e8,4.519e8,4.528e8,4.537e8,4.546e8,4.555e8,4.564e8,4.573e8,4.582e8,4.591e8,4.6e8,4.609e8,4.618e8,4.627e8,4.636e8,4.645e8,4.654e8,4.663e8,4.672e8,4.681e8,4.69e8,4.699e8,4.708e8,4.717e8,4.726e8,4.735e8,4.744e8,4.753e8,4.762e8,4.771e8,4.78e8,4.789e8,4.798e8,4.807e8,4.816e8,4.825e8,4.834e8,4.843e8,4.852e8,4.861e8,4.87e8,4.879e8,4.888e8,4.897e8,4.906e8,4.915e8,4.924e8,4.933e8,4.942e8,4.951e8,4.96e8,4.969e8,4.978e8,4.987e8,4.996e8,5.005e8,5.014e8,5.023e8,5.032e8,5.041e8,5.05e8,5.059e8,5.068e8,5.077e8,5.086e8,5.095e8,5.104e8,5.113e8,5.122e8,5.131e8,5.14e8,5.149e8,5.158e8,5.167e8,5.176e8,5.185e8,5.194e8,5.203e8,5.212e8,5.221e8,5.23e8,5.239e8,5.248e8,5.257e8,5.266e8,5.275e8,5.284e8,5.293e8,5.302e8,5.311e8,5.32e8,5.329e8,5.338e8,5.347e8,5.356e8,5.365e8,5.374e8,5.383e8,5.392e8,5.401e8,5.41e8,5.419e8,5.428e8,5.437e8,5.446e8,5.455e8,5.464e8,5.473e8,5.482e8,5.491e8,5.5e8,5.509e8,5.518e8,5.527e8,5.536e8,5.545e8,5.554e8,5.563e8,5.572e8,5.581e8,5.59e8,5.599e8,5.608e8,5.617e8,5.626e8,5.635e8,5.644e8,5.653e8,5.662e8,5.671e8,5.68e8,5.689e8,5.698e8,5.707e8,5.716e8,5.725e8,5.734e8,5.743e8,5.752e8,5.761e8,5.77e8,5.779e8,5.788e8,5.797e8,5.806e8,5.815e8,5.824e8,5.833e8,5.842e8,5.851e8,5.86e8,5.869e8,5.878e8,5.887e8,5.896e8,5.905e8,5.914e8,5.923e8,5.932e8,5.941e8,5.95e8,5.959e8,5.968e8,5.977e8,5.986e8,5.995e8,6.004e8,6.013e8,6.022e8,6.031e8,6.04e8,6.049e8,6.058e8,6.067e8,6.076e8,6.085e8,6.094e8,6.103e8,6.112e8,6.121e8,6.13e8,6.139e8,6.148e8,6.157e8,6.166e8,6.175e8,6.184e8,6.193e8,6.202e8,6.211e8,6.22e8,6.229e8,6.238e8,6.247e8,6.256e8,6.265e8,6.274e8,6.283e8,6.292e8,6.301e8,6.31e8,6.319e8,6.328e8,6.337e8,6.346e8,6.355e8,6.364e8,6.373e8,6.382e8,6.391e8,6.4e8,6.409e8,6.418e8,6.427e8,6.436e8,6.445e8,6.454e8,6.463e8,6.472e8,6.481e8,6.49e8,6.499e8,6.508e8,6.517e8,6.526e8,6.535e8,6.544e8,6.553e8,6.562e8,6.571e8,6.58e8,6.589e8,6.598e8,6.607e8,6.616e8,6.625e8,6.634e8,6.643e8,6.652e8,6.661e8,6.67e8,6.679e8,6.688e8,6.697e8,6.706e8,6.715e8,6.724e8,6.733e8,6.742e8,6.751e8,6.76e8,6.769e8,6.778e8,6.787e8,6.796e8,6.805e8,6.814e8,6.823e8,6.832e8,6.841e8,6.85e8,6.859e8,6.868e8,6.877e8,6.886e8,6.895e8,6.904e8,6.913e8,6.922e8,6.931e8,6.94e8,6.949e8,6.958e8,6.967e8,6.976e8,6.985e8,6.994e8,7.003e8,7.012e8,7.021e8,7.03e8,7.039e8,7.048e8,7.057e8,7.066e8,7.075e8,7.084e8,7.093e8,7.102e8,7.111e8,7.12e8,7.129e8,7.138e8,7.147e8,7.156e8,7.165e8,7.174e8,7.183e8,7.192e8,7.201e8,7.21e8,7.219e8,7.228e8,7.237e8,7.246e8,7.255e8,7.264e8,7.273e8,7.282e8,7.291e8,7.3e8,7.309e8,7.318e8,7.327e8,7.336e8,7.345e8,7.354e8,7.363e8,7.372e8,7.381e8,7.39e8,7.399e8,7.408e8,7.417e8,7.426e8,7.435e8,7.444e8,7.453e8,7.462e8,7.471e8,7.48e8,7.489e8,7.498e8,7.507e8,7.516e8,7.525e8,7.534e8,7.543e8,7.552e8,7.561e8,7.57e8,7.579e8,7.588e8,7.597e8,7.606e8,7.615e8,7.624e8,7.633e8,7.642e8,7.651e8,7.66e8,7.669e8,7.678e8,7.687e8,7.696e8,7.705e8,7.714e8,7.723e8,7.732e8,7.741e8,7.75e8,7.759e8,7.768e8,7.777e8,7.786e8,7.795e8,7.804e8,7.813e8,7.822e8,7.831e8,7.84e8,7.849e8,7.858e8,7.867e8,7.876e8,7.885e8,7.894e8,7.903e8,7.912e8,7.921e8,7.93e8,7.939e8,7.948e8,7.957e8,7.966e8,7.975e8,7.984e8,7.993e8,8.002e8,8.011e8,8.02e8,8.029e8,8.038e8,8.047e8,8.056e8,8.065e8,8.074e8,8.083e8,8.092e8,8.101e8,8.11e8,8.119e8,8.128e8,8.137e8,8.146e8,8.155e8,8.164e8,8.173e8,8.182e8,8.191e8,8.2e8,8.209e8,8.218e8,8.227e8,8.236e8,8.245e8,8.254e8,8.263e8,8.272e8,8.281e8,8.29e8,8.299e8,8.308e8,8.317e8,8.326e8,8.335e8,8.344e8,8.353e8,8.362e8,8.371e8,8.38e8,8.389e8,8.398e8,8.407e8,8.416e8,8.425e8,8.434e8,8.443e8,8.452e8,8.461e8,8.47e8,8.479e8,8.488e8,8.497e8,8.506e8,8.515e8,8.524e8,8.533e8,8.542e8,8.551e8,8.56e8,8.569e8,8.578e8,8.587e8,8.596e8,8.605e8,8.614e8,8.623e8,8.632e8,8.641e8,8.65e8,8.659e8,8.668e8,8.677e8,8.686e8,8.695e8,8.704e8,8.713e8,8.722e8,8.731e8,8.74e8,8.749e8,8.758e8,8.767e8,8.776e8,8.785e8,8.794e8,8.803e8,8.812e8,8.821e8,8.83e8,8.839e8,8.848e8,8.857e8,8.866e8,8.875e8,8.884e8,8.893e8,8.902e8,8.911e8,8.92e8,8.929e8,8.938e8,8.947e8,8.956e8,8.965e8,8.974e8,8.983e8,8.992e8,9.001e8,9.01e8,9.019e8,9.028e8,9.037e8,9.046e8,9.055e8,9.064e8,9.073e8,9.082e8,9.091e8,9.1e8,9.109e8,9.118e8,9.127e8,9.136e8,9.145e8,9.154e8,9.163e8,9.172e8,9.181e8,9.19e8,9.199e8,9.208e8,9.217e8,9.226e8,9.235e8,9.244e8,9.253e8,9.262e8,9.271e8,9.28e8,9.289e8,9.298e8,9.307e8,9.316e8,9.325e8,9.334e8,9.343e8,9.352e8,9.361e8,9.37e8,9.379e8,9.388e8,9.397e8,9.406e8,9.415e8,9.424e8,9.433e8,9.442e8,9.451e8,9.46e8,9.469e8,9.478e8,9.487e8,9.496e8,9.505e8,9.514e8,9.523e8,9.532e8,9.541e8,9.55e8,9.559e8,9.568e8,9.577e8,9.586e8,9.595e8,9.604e8,9.613e8,9.622e8,9.631e8,9.64e8,9.649e8,9.658e8,9.667e8,9.676e8,9.685e8,9.694e8,9.703e8,9.712e8,9.721e8,9.73e8,9.739e8,9.748e8,9.757e8,9.766e8,9.775e8,9.784e8,9.793e8,9.802e8,9.811e8,9.82e8,9.829e8,9.838e8,9.847e8,9.856e8,9.865e8,9.874e8,9.883e8,9.892e8,9.901e8,9.91e8,9.919e8,9.928e8,9.937e8,9.946e8,9.955e8,9.964e8,9.973e8,9.982e8,9.991e8,1.0e9]}
},{}],34:[function(require,module,exports){
module.exports={"expected":["00000000000000011000011010100000","00000000000000011000101000100100","00000000000000011000110110101000","00000000000000011001000100101100","00000000000000011001010010110000","00000000000000011001100000110100","00000000000000011001101110111000","00000000000000011001111100111100","00000000000000011010001011000000","00000000000000011010011001000100","00000000000000011010100111001000","00000000000000011010110101001100","00000000000000011011000011010000","00000000000000011011010001010100","00000000000000011011011111011000","00000000000000011011101101011100","00000000000000011011111011100000","00000000000000011100001001100100","00000000000000011100010111101000","00000000000000011100100101101100","00000000000000011100110011110000","00000000000000011101000001110100","00000000000000011101001111111000","00000000000000011101011101111100","00000000000000011101101100000000","00000000000000011101111010000100","00000000000000011110001000001000","00000000000000011110010110001100","00000000000000011110100100010000","00000000000000011110110010010100","00000000000000011111000000011000","00000000000000011111001110011100","00000000000000011111011100100000","00000000000000011111101010100100","00000000000000011111111000101000","00000000000000100000000110101100","00000000000000100000010100110000","00000000000000100000100010110100","00000000000000100000110000111000","00000000000000100000111110111100","00000000000000100001001101000000","00000000000000100001011011000100","00000000000000100001101001001000","00000000000000100001110111001100","00000000000000100010000101010000","00000000000000100010010011010100","00000000000000100010100001011000","00000000000000100010101111011100","00000000000000100010111101100000","00000000000000100011001011100100","00000000000000100011011001101000","00000000000000100011100111101100","00000000000000100011110101110000","00000000000000100100000011110100","00000000000000100100010001111000","00000000000000100100011111111100","00000000000000100100101110000000","00000000000000100100111100000100","00000000000000100101001010001000","00000000000000100101011000001100","00000000000000100101100110010000","00000000000000100101110100010100","00000000000000100110000010011000","00000000000000100110010000011100","00000000000000100110011110100000","00000000000000100110101100100100","00000000000000100110111010101000","00000000000000100111001000101100","00000000000000100111010110110000","00000000000000100111100100110100","00000000000000100111110010111000","00000000000000101000000000111100","00000000000000101000001111000000","00000000000000101000011101000100","00000000000000101000101011001000","00000000000000101000111001001100","00000000000000101001000111010000","00000000000000101001010101010100","00000000000000101001100011011000","00000000000000101001110001011100","00000000000000101001111111100000","00000000000000101010001101100100","00000000000000101010011011101000","00000000000000101010101001101100","00000000000000101010110111110000","00000000000000101011000101110100","00000000000000101011010011111000","00000000000000101011100001111100","00000000000000101011110000000000","00000000000000101011111110000100","00000000000000101100001100001000","00000000000000101100011010001100","00000000000000101100101000010000","00000000000000101100110110010100","00000000000000101101000100011000","00000000000000101101010010011100","00000000000000101101100000100000","00000000000000101101101110100100","00000000000000101101111100101000","00000000000000101110001010101100","00000000000000101110011000110000","00000000000000101110100110110100","00000000000000101110110100111000","00000000000000101111000010111100","00000000000000101111010001000000","00000000000000101111011111000100","00000000000000101111101101001000","00000000000000101111111011001100","00000000000000110000001001010000","00000000000000110000010111010100","00000000000000110000100101011000","00000000000000110000110011011100","00000000000000110001000001100000","00000000000000110001001111100100","00000000000000110001011101101000","00000000000000110001101011101100","00000000000000110001111001110000","00000000000000110010000111110100","00000000000000110010010101111000","00000000000000110010100011111100","00000000000000110010110010000000","00000000000000110011000000000100","00000000000000110011001110001000","00000000000000110011011100001100","00000000000000110011101010010000","00000000000000110011111000010100","00000000000000110100000110011000","00000000000000110100010100011100","00000000000000110100100010100000","00000000000000110100110000100100","00000000000000110100111110101000","00000000000000110101001100101100","00000000000000110101011010110000","00000000000000110101101000110100","00000000000000110101110110111000","00000000000000110110000100111100","00000000000000110110010011000000","00000000000000110110100001000100","00000000000000110110101111001000","00000000000000110110111101001100","00000000000000110111001011010000","00000000000000110111011001010100","00000000000000110111100111011000","00000000000000110111110101011100","00000000000000111000000011100000","00000000000000111000010001100100","00000000000000111000011111101000","00000000000000111000101101101100","00000000000000111000111011110000","00000000000000111001001001110100","00000000000000111001010111111000","00000000000000111001100101111100","00000000000000111001110100000000","00000000000000111010000010000100","00000000000000111010010000001000","00000000000000111010011110001100","00000000000000111010101100010000","00000000000000111010111010010100","00000000000000111011001000011000","00000000000000111011010110011100","00000000000000111011100100100000","00000000000000111011110010100100","00000000000000111100000000101000","00000000000000111100001110101100","00000000000000111100011100110000","00000000000000111100101010110100","00000000000000111100111000111000","00000000000000111101000110111100","00000000000000111101010101000000","00000000000000111101100011000100","00000000000000111101110001001000","00000000000000111101111111001100","00000000000000111110001101010000","00000000000000111110011011010100","00000000000000111110101001011000","00000000000000111110110111011100","00000000000000111111000101100000","00000000000000111111010011100100","00000000000000111111100001101000","00000000000000111111101111101100","00000000000000111111111101110000","00000000000001000000001011110100","00000000000001000000011001111000","00000000000001000000100111111100","00000000000001000000110110000000","00000000000001000001000100000100","00000000000001000001010010001000","00000000000001000001100000001100","00000000000001000001101110010000","00000000000001000001111100010100","00000000000001000010001010011000","00000000000001000010011000011100","00000000000001000010100110100000","00000000000001000010110100100100","00000000000001000011000010101000","00000000000001000011010000101100","00000000000001000011011110110000","00000000000001000011101100110100","00000000000001000011111010111000","00000000000001000100001000111100","00000000000001000100010111000000","00000000000001000100100101000100","00000000000001000100110011001000","00000000000001000101000001001100","00000000000001000101001111010000","00000000000001000101011101010100","00000000000001000101101011011000","00000000000001000101111001011100","00000000000001000110000111100000","00000000000001000110010101100100","00000000000001000110100011101000","00000000000001000110110001101100","00000000000001000110111111110000","00000000000001000111001101110100","00000000000001000111011011111000","00000000000001000111101001111100","00000000000001000111111000000000","00000000000001001000000110000100","00000000000001001000010100001000","00000000000001001000100010001100","00000000000001001000110000010000","00000000000001001000111110010100","00000000000001001001001100011000","00000000000001001001011010011100","00000000000001001001101000100000","00000000000001001001110110100100","00000000000001001010000100101000","00000000000001001010010010101100","00000000000001001010100000110000","00000000000001001010101110110100","00000000000001001010111100111000","00000000000001001011001010111100","00000000000001001011011001000000","00000000000001001011100111000100","00000000000001001011110101001000","00000000000001001100000011001100","00000000000001001100010001010000","00000000000001001100011111010100","00000000000001001100101101011000","00000000000001001100111011011100","00000000000001001101001001100000","00000000000001001101010111100100","00000000000001001101100101101000","00000000000001001101110011101100","00000000000001001110000001110000","00000000000001001110001111110100","00000000000001001110011101111000","00000000000001001110101011111100","00000000000001001110111010000000","00000000000001001111001000000100","00000000000001001111010110001000","00000000000001001111100100001100","00000000000001001111110010010000","00000000000001010000000000010100","00000000000001010000001110011000","00000000000001010000011100011100","00000000000001010000101010100000","00000000000001010000111000100100","00000000000001010001000110101000","00000000000001010001010100101100","00000000000001010001100010110000","00000000000001010001110000110100","00000000000001010001111110111000","00000000000001010010001100111100","00000000000001010010011011000000","00000000000001010010101001000100","00000000000001010010110111001000","00000000000001010011000101001100","00000000000001010011010011010000","00000000000001010011100001010100","00000000000001010011101111011000","00000000000001010011111101011100","00000000000001010100001011100000","00000000000001010100011001100100","00000000000001010100100111101000","00000000000001010100110101101100","00000000000001010101000011110000","00000000000001010101010001110100","00000000000001010101011111111000","00000000000001010101101101111100","00000000000001010101111100000000","00000000000001010110001010000100","00000000000001010110011000001000","00000000000001010110100110001100","00000000000001010110110100010000","00000000000001010111000010010100","00000000000001010111010000011000","00000000000001010111011110011100","00000000000001010111101100100000","00000000000001010111111010100100","00000000000001011000001000101000","00000000000001011000010110101100","00000000000001011000100100110000","00000000000001011000110010110100","00000000000001011001000000111000","00000000000001011001001110111100","00000000000001011001011101000000","00000000000001011001101011000100","00000000000001011001111001001000","00000000000001011010000111001100","00000000000001011010010101010000","00000000000001011010100011010100","00000000000001011010110001011000","00000000000001011010111111011100","00000000000001011011001101100000","00000000000001011011011011100100","00000000000001011011101001101000","00000000000001011011110111101100","00000000000001011100000101110000","00000000000001011100010011110100","00000000000001011100100001111000","00000000000001011100101111111100","00000000000001011100111110000000","00000000000001011101001100000100","00000000000001011101011010001000","00000000000001011101101000001100","00000000000001011101110110010000","00000000000001011110000100010100","00000000000001011110010010011000","00000000000001011110100000011100","00000000000001011110101110100000","00000000000001011110111100100100","00000000000001011111001010101000","00000000000001011111011000101100","00000000000001011111100110110000","00000000000001011111110100110100","00000000000001100000000010111000","00000000000001100000010000111100","00000000000001100000011111000000","00000000000001100000101101000100","00000000000001100000111011001000","00000000000001100001001001001100","00000000000001100001010111010000","00000000000001100001100101010100","00000000000001100001110011011000","00000000000001100010000001011100","00000000000001100010001111100000","00000000000001100010011101100100","00000000000001100010101011101000","00000000000001100010111001101100","00000000000001100011000111110000","00000000000001100011010101110100","00000000000001100011100011111000","00000000000001100011110001111100","00000000000001100100000000000000","00000000000001100100001110000100","00000000000001100100011100001000","00000000000001100100101010001100","00000000000001100100111000010000","00000000000001100101000110010100","00000000000001100101010100011000","00000000000001100101100010011100","00000000000001100101110000100000","00000000000001100101111110100100","00000000000001100110001100101000","00000000000001100110011010101100","00000000000001100110101000110000","00000000000001100110110110110100","00000000000001100111000100111000","00000000000001100111010010111100","00000000000001100111100001000000","00000000000001100111101111000100","00000000000001100111111101001000","00000000000001101000001011001100","00000000000001101000011001010000","00000000000001101000100111010100","00000000000001101000110101011000","00000000000001101001000011011100","00000000000001101001010001100000","00000000000001101001011111100100","00000000000001101001101101101000","00000000000001101001111011101100","00000000000001101010001001110000","00000000000001101010010111110100","00000000000001101010100101111000","00000000000001101010110011111100","00000000000001101011000010000000","00000000000001101011010000000100","00000000000001101011011110001000","00000000000001101011101100001100","00000000000001101011111010010000","00000000000001101100001000010100","00000000000001101100010110011000","00000000000001101100100100011100","00000000000001101100110010100000","00000000000001101101000000100100","00000000000001101101001110101000","00000000000001101101011100101100","00000000000001101101101010110000","00000000000001101101111000110100","00000000000001101110000110111000","00000000000001101110010100111100","00000000000001101110100011000000","00000000000001101110110001000100","00000000000001101110111111001000","00000000000001101111001101001100","00000000000001101111011011010000","00000000000001101111101001010100","00000000000001101111110111011000","00000000000001110000000101011100","00000000000001110000010011100000","00000000000001110000100001100100","00000000000001110000101111101000","00000000000001110000111101101100","00000000000001110001001011110000","00000000000001110001011001110100","00000000000001110001100111111000","00000000000001110001110101111100","00000000000001110010000100000000","00000000000001110010010010000100","00000000000001110010100000001000","00000000000001110010101110001100","00000000000001110010111100010000","00000000000001110011001010010100","00000000000001110011011000011000","00000000000001110011100110011100","00000000000001110011110100100000","00000000000001110100000010100100","00000000000001110100010000101000","00000000000001110100011110101100","00000000000001110100101100110000","00000000000001110100111010110100","00000000000001110101001000111000","00000000000001110101010110111100","00000000000001110101100101000000","00000000000001110101110011000100","00000000000001110110000001001000","00000000000001110110001111001100","00000000000001110110011101010000","00000000000001110110101011010100","00000000000001110110111001011000","00000000000001110111000111011100","00000000000001110111010101100000","00000000000001110111100011100100","00000000000001110111110001101000","00000000000001110111111111101100","00000000000001111000001101110000","00000000000001111000011011110100","00000000000001111000101001111000","00000000000001111000110111111100","00000000000001111001000110000000","00000000000001111001010100000100","00000000000001111001100010001000","00000000000001111001110000001100","00000000000001111001111110010000","00000000000001111010001100010100","00000000000001111010011010011000","00000000000001111010101000011100","00000000000001111010110110100000","00000000000001111011000100100100","00000000000001111011010010101000","00000000000001111011100000101100","00000000000001111011101110110000","00000000000001111011111100110100","00000000000001111100001010111000","00000000000001111100011000111100","00000000000001111100100111000000","00000000000001111100110101000100","00000000000001111101000011001000","00000000000001111101010001001100","00000000000001111101011111010000","00000000000001111101101101010100","00000000000001111101111011011000","00000000000001111110001001011100","00000000000001111110010111100000","00000000000001111110100101100100","00000000000001111110110011101000","00000000000001111111000001101100","00000000000001111111001111110000","00000000000001111111011101110100","00000000000001111111101011111000","00000000000001111111111001111100","00000000000010000000001000000000","00000000000010000000010110000100","00000000000010000000100100001000","00000000000010000000110010001100","00000000000010000001000000010000","00000000000010000001001110010100","00000000000010000001011100011000","00000000000010000001101010011100","00000000000010000001111000100000","00000000000010000010000110100100","00000000000010000010010100101000","00000000000010000010100010101100","00000000000010000010110000110000","00000000000010000010111110110100","00000000000010000011001100111000","00000000000010000011011010111100","00000000000010000011101001000000","00000000000010000011110111000100","00000000000010000100000101001000","00000000000010000100010011001100","00000000000010000100100001010000","00000000000010000100101111010100","00000000000010000100111101011000","00000000000010000101001011011100","00000000000010000101011001100000","00000000000010000101100111100100","00000000000010000101110101101000","00000000000010000110000011101100","00000000000010000110010001110000","00000000000010000110011111110100","00000000000010000110101101111000","00000000000010000110111011111100","00000000000010000111001010000000","00000000000010000111011000000100","00000000000010000111100110001000","00000000000010000111110100001100","00000000000010001000000010010000","00000000000010001000010000010100","00000000000010001000011110011000","00000000000010001000101100011100","00000000000010001000111010100000","00000000000010001001001000100100","00000000000010001001010110101000","00000000000010001001100100101100","00000000000010001001110010110000","00000000000010001010000000110100","00000000000010001010001110111000","00000000000010001010011100111100","00000000000010001010101011000000","00000000000010001010111001000100","00000000000010001011000111001000","00000000000010001011010101001100","00000000000010001011100011010000","00000000000010001011110001010100","00000000000010001011111111011000","00000000000010001100001101011100","00000000000010001100011011100000","00000000000010001100101001100100","00000000000010001100110111101000","00000000000010001101000101101100","00000000000010001101010011110000","00000000000010001101100001110100","00000000000010001101101111111000","00000000000010001101111101111100","00000000000010001110001100000000","00000000000010001110011010000100","00000000000010001110101000001000","00000000000010001110110110001100","00000000000010001111000100010000","00000000000010001111010010010100","00000000000010001111100000011000","00000000000010001111101110011100","00000000000010001111111100100000","00000000000010010000001010100100","00000000000010010000011000101000","00000000000010010000100110101100","00000000000010010000110100110000","00000000000010010001000010110100","00000000000010010001010000111000","00000000000010010001011110111100","00000000000010010001101101000000","00000000000010010001111011000100","00000000000010010010001001001000","00000000000010010010010111001100","00000000000010010010100101010000","00000000000010010010110011010100","00000000000010010011000001011000","00000000000010010011001111011100","00000000000010010011011101100000","00000000000010010011101011100100","00000000000010010011111001101000","00000000000010010100000111101100","00000000000010010100010101110000","00000000000010010100100011110100","00000000000010010100110001111000","00000000000010010100111111111100","00000000000010010101001110000000","00000000000010010101011100000100","00000000000010010101101010001000","00000000000010010101111000001100","00000000000010010110000110010000","00000000000010010110010100010100","00000000000010010110100010011000","00000000000010010110110000011100","00000000000010010110111110100000","00000000000010010111001100100100","00000000000010010111011010101000","00000000000010010111101000101100","00000000000010010111110110110000","00000000000010011000000100110100","00000000000010011000010010111000","00000000000010011000100000111100","00000000000010011000101111000000","00000000000010011000111101000100","00000000000010011001001011001000","00000000000010011001011001001100","00000000000010011001100111010000","00000000000010011001110101010100","00000000000010011010000011011000","00000000000010011010010001011100","00000000000010011010011111100000","00000000000010011010101101100100","00000000000010011010111011101000","00000000000010011011001001101100","00000000000010011011010111110000","00000000000010011011100101110100","00000000000010011011110011111000","00000000000010011100000001111100","00000000000010011100010000000000","00000000000010011100011110000100","00000000000010011100101100001000","00000000000010011100111010001100","00000000000010011101001000010000","00000000000010011101010110010100","00000000000010011101100100011000","00000000000010011101110010011100","00000000000010011110000000100000","00000000000010011110001110100100","00000000000010011110011100101000","00000000000010011110101010101100","00000000000010011110111000110000","00000000000010011111000110110100","00000000000010011111010100111000","00000000000010011111100010111100","00000000000010011111110001000000","00000000000010011111111111000100","00000000000010100000001101001000","00000000000010100000011011001100","00000000000010100000101001010000","00000000000010100000110111010100","00000000000010100001000101011000","00000000000010100001010011011100","00000000000010100001100001100000","00000000000010100001101111100100","00000000000010100001111101101000","00000000000010100010001011101100","00000000000010100010011001110000","00000000000010100010100111110100","00000000000010100010110101111000","00000000000010100011000011111100","00000000000010100011010010000000","00000000000010100011100000000100","00000000000010100011101110001000","00000000000010100011111100001100","00000000000010100100001010010000","00000000000010100100011000010100","00000000000010100100100110011000","00000000000010100100110100011100","00000000000010100101000010100000","00000000000010100101010000100100","00000000000010100101011110101000","00000000000010100101101100101100","00000000000010100101111010110000","00000000000010100110001000110100","00000000000010100110010110111000","00000000000010100110100100111100","00000000000010100110110011000000","00000000000010100111000001000100","00000000000010100111001111001000","00000000000010100111011101001100","00000000000010100111101011010000","00000000000010100111111001010100","00000000000010101000000111011000","00000000000010101000010101011100","00000000000010101000100011100000","00000000000010101000110001100100","00000000000010101000111111101000","00000000000010101001001101101100","00000000000010101001011011110000","00000000000010101001101001110100","00000000000010101001110111111000","00000000000010101010000101111100","00000000000010101010010100000000","00000000000010101010100010000100","00000000000010101010110000001000","00000000000010101010111110001100","00000000000010101011001100010000","00000000000010101011011010010100","00000000000010101011101000011000","00000000000010101011110110011100","00000000000010101100000100100000","00000000000010101100010010100100","00000000000010101100100000101000","00000000000010101100101110101100","00000000000010101100111100110000","00000000000010101101001010110100","00000000000010101101011000111000","00000000000010101101100110111100","00000000000010101101110101000000","00000000000010101110000011000100","00000000000010101110010001001000","00000000000010101110011111001100","00000000000010101110101101010000","00000000000010101110111011010100","00000000000010101111001001011000","00000000000010101111010111011100","00000000000010101111100101100000","00000000000010101111110011100100","00000000000010110000000001101000","00000000000010110000001111101100","00000000000010110000011101110000","00000000000010110000101011110100","00000000000010110000111001111000","00000000000010110001000111111100","00000000000010110001010110000000","00000000000010110001100100000100","00000000000010110001110010001000","00000000000010110010000000001100","00000000000010110010001110010000","00000000000010110010011100010100","00000000000010110010101010011000","00000000000010110010111000011100","00000000000010110011000110100000","00000000000010110011010100100100","00000000000010110011100010101000","00000000000010110011110000101100","00000000000010110011111110110000","00000000000010110100001100110100","00000000000010110100011010111000","00000000000010110100101000111100","00000000000010110100110111000000","00000000000010110101000101000100","00000000000010110101010011001000","00000000000010110101100001001100","00000000000010110101101111010000","00000000000010110101111101010100","00000000000010110110001011011000","00000000000010110110011001011100","00000000000010110110100111100000","00000000000010110110110101100100","00000000000010110111000011101000","00000000000010110111010001101100","00000000000010110111011111110000","00000000000010110111101101110100","00000000000010110111111011111000","00000000000010111000001001111100","00000000000010111000011000000000","00000000000010111000100110000100","00000000000010111000110100001000","00000000000010111001000010001100","00000000000010111001010000010000","00000000000010111001011110010100","00000000000010111001101100011000","00000000000010111001111010011100","00000000000010111010001000100000","00000000000010111010010110100100","00000000000010111010100100101000","00000000000010111010110010101100","00000000000010111011000000110000","00000000000010111011001110110100","00000000000010111011011100111000","00000000000010111011101010111100","00000000000010111011111001000000","00000000000010111100000111000100","00000000000010111100010101001000","00000000000010111100100011001100","00000000000010111100110001010000","00000000000010111100111111010100","00000000000010111101001101011000","00000000000010111101011011011100","00000000000010111101101001100000","00000000000010111101110111100100","00000000000010111110000101101000","00000000000010111110010011101100","00000000000010111110100001110000","00000000000010111110101111110100","00000000000010111110111101111000","00000000000010111111001011111100","00000000000010111111011010000000","00000000000010111111101000000100","00000000000010111111110110001000","00000000000011000000000100001100","00000000000011000000010010010000","00000000000011000000100000010100","00000000000011000000101110011000","00000000000011000000111100011100","00000000000011000001001010100000","00000000000011000001011000100100","00000000000011000001100110101000","00000000000011000001110100101100","00000000000011000010000010110000","00000000000011000010010000110100","00000000000011000010011110111000","00000000000011000010101100111100","00000000000011000010111011000000","00000000000011000011001001000100","00000000000011000011010111001000","00000000000011000011100101001100","00000000000011000011110011010000","00000000000011000100000001010100","00000000000011000100001111011000","00000000000011000100011101011100","00000000000011000100101011100000","00000000000011000100111001100100","00000000000011000101000111101000","00000000000011000101010101101100","00000000000011000101100011110000","00000000000011000101110001110100","00000000000011000101111111111000","00000000000011000110001101111100","00000000000011000110011100000000","00000000000011000110101010000100","00000000000011000110111000001000","00000000000011000111000110001100","00000000000011000111010100010000","00000000000011000111100010010100","00000000000011000111110000011000","00000000000011000111111110011100","00000000000011001000001100100000","00000000000011001000011010100100","00000000000011001000101000101000","00000000000011001000110110101100","00000000000011001001000100110000","00000000000011001001010010110100","00000000000011001001100000111000","00000000000011001001101110111100","00000000000011001001111101000000","00000000000011001010001011000100","00000000000011001010011001001000","00000000000011001010100111001100","00000000000011001010110101010000","00000000000011001011000011010100","00000000000011001011010001011000","00000000000011001011011111011100","00000000000011001011101101100000","00000000000011001011111011100100","00000000000011001100001001101000","00000000000011001100010111101100","00000000000011001100100101110000","00000000000011001100110011110100","00000000000011001101000001111000","00000000000011001101001111111100","00000000000011001101011110000000","00000000000011001101101100000100","00000000000011001101111010001000","00000000000011001110001000001100","00000000000011001110010110010000","00000000000011001110100100010100","00000000000011001110110010011000","00000000000011001111000000011100","00000000000011001111001110100000","00000000000011001111011100100100","00000000000011001111101010101000","00000000000011001111111000101100","00000000000011010000000110110000","00000000000011010000010100110100","00000000000011010000100010111000","00000000000011010000110000111100","00000000000011010000111111000000","00000000000011010001001101000100","00000000000011010001011011001000","00000000000011010001101001001100","00000000000011010001110111010000","00000000000011010010000101010100","00000000000011010010010011011000","00000000000011010010100001011100","00000000000011010010101111100000","00000000000011010010111101100100","00000000000011010011001011101000","00000000000011010011011001101100","00000000000011010011100111110000","00000000000011010011110101110100","00000000000011010100000011111000","00000000000011010100010001111100","00000000000011010100100000000000","00000000000011010100101110000100","00000000000011010100111100001000","00000000000011010101001010001100","00000000000011010101011000010000","00000000000011010101100110010100","00000000000011010101110100011000","00000000000011010110000010011100","00000000000011010110010000100000","00000000000011010110011110100100","00000000000011010110101100101000","00000000000011010110111010101100","00000000000011010111001000110000","00000000000011010111010110110100","00000000000011010111100100111000","00000000000011010111110010111100","00000000000011011000000001000000","00000000000011011000001111000100","00000000000011011000011101001000","00000000000011011000101011001100","00000000000011011000111001010000","00000000000011011001000111010100","00000000000011011001010101011000","00000000000011011001100011011100","00000000000011011001110001100000","00000000000011011001111111100100","00000000000011011010001101101000","00000000000011011010011011101100","00000000000011011010101001110000","00000000000011011010110111110100","00000000000011011011000101111000","00000000000011011011010011111100","00000000000011011011100010000000","00000000000011011011110000000100","00000000000011011011111110001000","00000000000011011100001100001100","00000000000011011100011010010000","00000000000011011100101000010100","00000000000011011100110110011000","00000000000011011101000100011100","00000000000011011101010010100000","00000000000011011101100000100100","00000000000011011101101110101000","00000000000011011101111100101100","00000000000011011110001010110000","00000000000011011110011000110100","00000000000011011110100110111000","00000000000011011110110100111100","00000000000011011111000011000000","00000000000011011111010001000100","00000000000011011111011111001000","00000000000011011111101101001100","00000000000011011111111011010000","00000000000011100000001001010100","00000000000011100000010111011000","00000000000011100000100101011100","00000000000011100000110011100000","00000000000011100001000001100100","00000000000011100001001111101000","00000000000011100001011101101100","00000000000011100001101011110000","00000000000011100001111001110100","00000000000011100010000111111000","00000000000011100010010101111100","00000000000011100010100100000000","00000000000011100010110010000100","00000000000011100011000000001000","00000000000011100011001110001100","00000000000011100011011100010000","00000000000011100011101010010100","00000000000011100011111000011000","00000000000011100100000110011100","00000000000011100100010100100000","00000000000011100100100010100100","00000000000011100100110000101000","00000000000011100100111110101100","00000000000011100101001100110000","00000000000011100101011010110100","00000000000011100101101000111000","00000000000011100101110110111100","00000000000011100110000101000000","00000000000011100110010011000100","00000000000011100110100001001000","00000000000011100110101111001100","00000000000011100110111101010000","00000000000011100111001011010100","00000000000011100111011001011000","00000000000011100111100111011100","00000000000011100111110101100000","00000000000011101000000011100100","00000000000011101000010001101000","00000000000011101000011111101100","00000000000011101000101101110000","00000000000011101000111011110100","00000000000011101001001001111000","00000000000011101001010111111100","00000000000011101001100110000000","00000000000011101001110100000100","00000000000011101010000010001000","00000000000011101010010000001100","00000000000011101010011110010000","00000000000011101010101100010100","00000000000011101010111010011000","00000000000011101011001000011100","00000000000011101011010110100000","00000000000011101011100100100100","00000000000011101011110010101000","00000000000011101100000000101100","00000000000011101100001110110000","00000000000011101100011100110100","00000000000011101100101010111000","00000000000011101100111000111100","00000000000011101101000111000000","00000000000011101101010101000100","00000000000011101101100011001000","00000000000011101101110001001100","00000000000011101101111111010000","00000000000011101110001101010100","00000000000011101110011011011000","00000000000011101110101001011100","00000000000011101110110111100000","00000000000011101111000101100100","00000000000011101111010011101000","00000000000011101111100001101100","00000000000011101111101111110000","00000000000011101111111101110100","00000000000011110000001011111000","00000000000011110000011001111100","00000000000011110000101000000000","00000000000011110000110110000100","00000000000011110001000100001000","00000000000011110001010010001100","00000000000011110001100000010000","00000000000011110001101110010100","00000000000011110001111100011000","00000000000011110010001010011100","00000000000011110010011000100000","00000000000011110010100110100100","00000000000011110010110100101000","00000000000011110011000010101100","00000000000011110011010000110000","00000000000011110011011110110100","00000000000011110011101100111000","00000000000011110011111010111100","00000000000011110100001001000000"],"x":[100000.0,100900.0,101800.0,102700.0,103600.0,104500.0,105400.0,106300.0,107200.0,108100.0,109000.0,109900.0,110800.0,111700.0,112600.0,113500.0,114400.0,115300.0,116200.0,117100.0,118000.0,118900.0,119800.0,120700.0,121600.0,122500.0,123400.0,124300.0,125200.0,126100.0,127000.0,127900.0,128800.0,129700.0,130600.0,131500.0,132400.0,133300.0,134200.0,135100.0,136000.0,136900.0,137800.0,138700.0,139600.0,140500.0,141400.0,142300.0,143200.0,144100.0,145000.0,145900.0,146800.0,147700.0,148600.0,149500.0,150400.0,151300.0,152200.0,153100.0,154000.0,154900.0,155800.0,156700.0,157600.0,158500.0,159400.0,160300.0,161200.0,162100.0,163000.0,163900.0,164800.0,165700.0,166600.0,167500.0,168400.0,169300.0,170200.0,171100.0,172000.0,172900.0,173800.0,174700.0,175600.0,176500.0,177400.0,178300.0,179200.0,180100.0,181000.0,181900.0,182800.0,183700.0,184600.0,185500.0,186400.0,187300.0,188200.0,189100.0,190000.0,190900.0,191800.0,192700.0,193600.0,194500.0,195400.0,196300.0,197200.0,198100.0,199000.0,199900.0,200800.0,201700.0,202600.0,203500.0,204400.0,205300.0,206200.0,207100.0,208000.0,208900.0,209800.0,210700.0,211600.0,212500.0,213400.0,214300.0,215200.0,216100.0,217000.0,217900.0,218800.0,219700.0,220600.0,221500.0,222400.0,223300.0,224200.0,225100.0,226000.0,226900.0,227800.0,228700.0,229600.0,230500.0,231400.0,232300.0,233200.0,234100.0,235000.0,235900.0,236800.0,237700.0,238600.0,239500.0,240400.0,241300.0,242200.0,243100.0,244000.0,244900.0,245800.0,246700.0,247600.0,248500.0,249400.0,250300.0,251200.0,252100.0,253000.0,253900.0,254800.0,255700.0,256600.0,257500.0,258400.0,259300.0,260200.0,261100.0,262000.0,262900.0,263800.0,264700.0,265600.0,266500.0,267400.0,268300.0,269200.0,270100.0,271000.0,271900.0,272800.0,273700.0,274600.0,275500.0,276400.0,277300.0,278200.0,279100.0,280000.0,280900.0,281800.0,282700.0,283600.0,284500.0,285400.0,286300.0,287200.0,288100.0,289000.0,289900.0,290800.0,291700.0,292600.0,293500.0,294400.0,295300.0,296200.0,297100.0,298000.0,298900.0,299800.0,300700.0,301600.0,302500.0,303400.0,304300.0,305200.0,306100.0,307000.0,307900.0,308800.0,309700.0,310600.0,311500.0,312400.0,313300.0,314200.0,315100.0,316000.0,316900.0,317800.0,318700.0,319600.0,320500.0,321400.0,322300.0,323200.0,324100.0,325000.0,325900.0,326800.0,327700.0,328600.0,329500.0,330400.0,331300.0,332200.0,333100.0,334000.0,334900.0,335800.0,336700.0,337600.0,338500.0,339400.0,340300.0,341200.0,342100.0,343000.0,343900.0,344800.0,345700.0,346600.0,347500.0,348400.0,349300.0,350200.0,351100.0,352000.0,352900.0,353800.0,354700.0,355600.0,356500.0,357400.0,358300.0,359200.0,360100.0,361000.0,361900.0,362800.0,363700.0,364600.0,365500.0,366400.0,367300.0,368200.0,369100.0,370000.0,370900.0,371800.0,372700.0,373600.0,374500.0,375400.0,376300.0,377200.0,378100.0,379000.0,379900.0,380800.0,381700.0,382600.0,383500.0,384400.0,385300.0,386200.0,387100.0,388000.0,388900.0,389800.0,390700.0,391600.0,392500.0,393400.0,394300.0,395200.0,396100.0,397000.0,397900.0,398800.0,399700.0,400600.0,401500.0,402400.0,403300.0,404200.0,405100.0,406000.0,406900.0,407800.0,408700.0,409600.0,410500.0,411400.0,412300.0,413200.0,414100.0,415000.0,415900.0,416800.0,417700.0,418600.0,419500.0,420400.0,421300.0,422200.0,423100.0,424000.0,424900.0,425800.0,426700.0,427600.0,428500.0,429400.0,430300.0,431200.0,432100.0,433000.0,433900.0,434800.0,435700.0,436600.0,437500.0,438400.0,439300.0,440200.0,441100.0,442000.0,442900.0,443800.0,444700.0,445600.0,446500.0,447400.0,448300.0,449200.0,450100.0,451000.0,451900.0,452800.0,453700.0,454600.0,455500.0,456400.0,457300.0,458200.0,459100.0,460000.0,460900.0,461800.0,462700.0,463600.0,464500.0,465400.0,466300.0,467200.0,468100.0,469000.0,469900.0,470800.0,471700.0,472600.0,473500.0,474400.0,475300.0,476200.0,477100.0,478000.0,478900.0,479800.0,480700.0,481600.0,482500.0,483400.0,484300.0,485200.0,486100.0,487000.0,487900.0,488800.0,489700.0,490600.0,491500.0,492400.0,493300.0,494200.0,495100.0,496000.0,496900.0,497800.0,498700.0,499600.0,500500.0,501400.0,502300.0,503200.0,504100.0,505000.0,505900.0,506800.0,507700.0,508600.0,509500.0,510400.0,511300.0,512200.0,513100.0,514000.0,514900.0,515800.0,516700.0,517600.0,518500.0,519400.0,520300.0,521200.0,522100.0,523000.0,523900.0,524800.0,525700.0,526600.0,527500.0,528400.0,529300.0,530200.0,531100.0,532000.0,532900.0,533800.0,534700.0,535600.0,536500.0,537400.0,538300.0,539200.0,540100.0,541000.0,541900.0,542800.0,543700.0,544600.0,545500.0,546400.0,547300.0,548200.0,549100.0,550000.0,550900.0,551800.0,552700.0,553600.0,554500.0,555400.0,556300.0,557200.0,558100.0,559000.0,559900.0,560800.0,561700.0,562600.0,563500.0,564400.0,565300.0,566200.0,567100.0,568000.0,568900.0,569800.0,570700.0,571600.0,572500.0,573400.0,574300.0,575200.0,576100.0,577000.0,577900.0,578800.0,579700.0,580600.0,581500.0,582400.0,583300.0,584200.0,585100.0,586000.0,586900.0,587800.0,588700.0,589600.0,590500.0,591400.0,592300.0,593200.0,594100.0,595000.0,595900.0,596800.0,597700.0,598600.0,599500.0,600400.0,601300.0,602200.0,603100.0,604000.0,604900.0,605800.0,606700.0,607600.0,608500.0,609400.0,610300.0,611200.0,612100.0,613000.0,613900.0,614800.0,615700.0,616600.0,617500.0,618400.0,619300.0,620200.0,621100.0,622000.0,622900.0,623800.0,624700.0,625600.0,626500.0,627400.0,628300.0,629200.0,630100.0,631000.0,631900.0,632800.0,633700.0,634600.0,635500.0,636400.0,637300.0,638200.0,639100.0,640000.0,640900.0,641800.0,642700.0,643600.0,644500.0,645400.0,646300.0,647200.0,648100.0,649000.0,649900.0,650800.0,651700.0,652600.0,653500.0,654400.0,655300.0,656200.0,657100.0,658000.0,658900.0,659800.0,660700.0,661600.0,662500.0,663400.0,664300.0,665200.0,666100.0,667000.0,667900.0,668800.0,669700.0,670600.0,671500.0,672400.0,673300.0,674200.0,675100.0,676000.0,676900.0,677800.0,678700.0,679600.0,680500.0,681400.0,682300.0,683200.0,684100.0,685000.0,685900.0,686800.0,687700.0,688600.0,689500.0,690400.0,691300.0,692200.0,693100.0,694000.0,694900.0,695800.0,696700.0,697600.0,698500.0,699400.0,700300.0,701200.0,702100.0,703000.0,703900.0,704800.0,705700.0,706600.0,707500.0,708400.0,709300.0,710200.0,711100.0,712000.0,712900.0,713800.0,714700.0,715600.0,716500.0,717400.0,718300.0,719200.0,720100.0,721000.0,721900.0,722800.0,723700.0,724600.0,725500.0,726400.0,727300.0,728200.0,729100.0,730000.0,730900.0,731800.0,732700.0,733600.0,734500.0,735400.0,736300.0,737200.0,738100.0,739000.0,739900.0,740800.0,741700.0,742600.0,743500.0,744400.0,745300.0,746200.0,747100.0,748000.0,748900.0,749800.0,750700.0,751600.0,752500.0,753400.0,754300.0,755200.0,756100.0,757000.0,757900.0,758800.0,759700.0,760600.0,761500.0,762400.0,763300.0,764200.0,765100.0,766000.0,766900.0,767800.0,768700.0,769600.0,770500.0,771400.0,772300.0,773200.0,774100.0,775000.0,775900.0,776800.0,777700.0,778600.0,779500.0,780400.0,781300.0,782200.0,783100.0,784000.0,784900.0,785800.0,786700.0,787600.0,788500.0,789400.0,790300.0,791200.0,792100.0,793000.0,793900.0,794800.0,795700.0,796600.0,797500.0,798400.0,799300.0,800200.0,801100.0,802000.0,802900.0,803800.0,804700.0,805600.0,806500.0,807400.0,808300.0,809200.0,810100.0,811000.0,811900.0,812800.0,813700.0,814600.0,815500.0,816400.0,817300.0,818200.0,819100.0,820000.0,820900.0,821800.0,822700.0,823600.0,824500.0,825400.0,826300.0,827200.0,828100.0,829000.0,829900.0,830800.0,831700.0,832600.0,833500.0,834400.0,835300.0,836200.0,837100.0,838000.0,838900.0,839800.0,840700.0,841600.0,842500.0,843400.0,844300.0,845200.0,846100.0,847000.0,847900.0,848800.0,849700.0,850600.0,851500.0,852400.0,853300.0,854200.0,855100.0,856000.0,856900.0,857800.0,858700.0,859600.0,860500.0,861400.0,862300.0,863200.0,864100.0,865000.0,865900.0,866800.0,867700.0,868600.0,869500.0,870400.0,871300.0,872200.0,873100.0,874000.0,874900.0,875800.0,876700.0,877600.0,878500.0,879400.0,880300.0,881200.0,882100.0,883000.0,883900.0,884800.0,885700.0,886600.0,887500.0,888400.0,889300.0,890200.0,891100.0,892000.0,892900.0,893800.0,894700.0,895600.0,896500.0,897400.0,898300.0,899200.0,900100.0,901000.0,901900.0,902800.0,903700.0,904600.0,905500.0,906400.0,907300.0,908200.0,909100.0,910000.0,910900.0,911800.0,912700.0,913600.0,914500.0,915400.0,916300.0,917200.0,918100.0,919000.0,919900.0,920800.0,921700.0,922600.0,923500.0,924400.0,925300.0,926200.0,927100.0,928000.0,928900.0,929800.0,930700.0,931600.0,932500.0,933400.0,934300.0,935200.0,936100.0,937000.0,937900.0,938800.0,939700.0,940600.0,941500.0,942400.0,943300.0,944200.0,945100.0,946000.0,946900.0,947800.0,948700.0,949600.0,950500.0,951400.0,952300.0,953200.0,954100.0,955000.0,955900.0,956800.0,957700.0,958600.0,959500.0,960400.0,961300.0,962200.0,963100.0,964000.0,964900.0,965800.0,966700.0,967600.0,968500.0,969400.0,970300.0,971200.0,972100.0,973000.0,973900.0,974800.0,975700.0,976600.0,977500.0,978400.0,979300.0,980200.0,981100.0,982000.0,982900.0,983800.0,984700.0,985600.0,986500.0,987400.0,988300.0,989200.0,990100.0,991000.0,991900.0,992800.0,993700.0,994600.0,995500.0,996400.0,997300.0,998200.0,999100.0,1.0e6]}
},{}],35:[function(require,module,exports){
module.exports={"expected":["00000000000000000000000000000000","00000000000000000000000000000001","00000000000000000000000000000010","00000000000000000000000000000011","00000000000000000000000000000100","00000000000000000000000000000101","00000000000000000000000000000110","00000000000000000000000000000111","00000000000000000000000000001000","00000000000000000000000000001001","00000000000000000000000000001010","00000000000000000000000000001011","00000000000000000000000000001100","00000000000000000000000000001101","00000000000000000000000000001110","00000000000000000000000000001111","00000000000000000000000000010000","00000000000000000000000000010001","00000000000000000000000000010010","00000000000000000000000000010011","00000000000000000000000000010100","00000000000000000000000000010101","00000000000000000000000000010110","00000000000000000000000000010111","00000000000000000000000000011000","00000000000000000000000000011001","00000000000000000000000000011010","00000000000000000000000000011011","00000000000000000000000000011100","00000000000000000000000000011101","00000000000000000000000000011110","00000000000000000000000000011111","00000000000000000000000000100000","00000000000000000000000000100001","00000000000000000000000000100010","00000000000000000000000000100011","00000000000000000000000000100100","00000000000000000000000000100101","00000000000000000000000000100110","00000000000000000000000000100111","00000000000000000000000000101000","00000000000000000000000000101001","00000000000000000000000000101010","00000000000000000000000000101011","00000000000000000000000000101100","00000000000000000000000000101101","00000000000000000000000000101110","00000000000000000000000000101111","00000000000000000000000000110000","00000000000000000000000000110001","00000000000000000000000000110010","00000000000000000000000000110011","00000000000000000000000000110100","00000000000000000000000000110101","00000000000000000000000000110110","00000000000000000000000000110111","00000000000000000000000000111000","00000000000000000000000000111001","00000000000000000000000000111010","00000000000000000000000000111011","00000000000000000000000000111100","00000000000000000000000000111101","00000000000000000000000000111110","00000000000000000000000000111111","00000000000000000000000001000000","00000000000000000000000001000001","00000000000000000000000001000010","00000000000000000000000001000011","00000000000000000000000001000100","00000000000000000000000001000101","00000000000000000000000001000110","00000000000000000000000001000111","00000000000000000000000001001000","00000000000000000000000001001001","00000000000000000000000001001010","00000000000000000000000001001011","00000000000000000000000001001100","00000000000000000000000001001101","00000000000000000000000001001110","00000000000000000000000001001111","00000000000000000000000001010000","00000000000000000000000001010001","00000000000000000000000001010010","00000000000000000000000001010011","00000000000000000000000001010100","00000000000000000000000001010101","00000000000000000000000001010110","00000000000000000000000001010111","00000000000000000000000001011000","00000000000000000000000001011001","00000000000000000000000001011010","00000000000000000000000001011011","00000000000000000000000001011100","00000000000000000000000001011101","00000000000000000000000001011110","00000000000000000000000001011111","00000000000000000000000001100000","00000000000000000000000001100001","00000000000000000000000001100010","00000000000000000000000001100011","00000000000000000000000001100100","00000000000000000000000001100101","00000000000000000000000001100110","00000000000000000000000001100111","00000000000000000000000001101000","00000000000000000000000001101001","00000000000000000000000001101010","00000000000000000000000001101011","00000000000000000000000001101100","00000000000000000000000001101101","00000000000000000000000001101110","00000000000000000000000001101111","00000000000000000000000001110000","00000000000000000000000001110001","00000000000000000000000001110010","00000000000000000000000001110011","00000000000000000000000001110100","00000000000000000000000001110101","00000000000000000000000001110110","00000000000000000000000001110111","00000000000000000000000001111000","00000000000000000000000001111001","00000000000000000000000001111010","00000000000000000000000001111011","00000000000000000000000001111100","00000000000000000000000001111101","00000000000000000000000001111110","00000000000000000000000001111111","00000000000000000000000010000000","00000000000000000000000010000001","00000000000000000000000010000010","00000000000000000000000010000011","00000000000000000000000010000100","00000000000000000000000010000101","00000000000000000000000010000110","00000000000000000000000010000111","00000000000000000000000010001000","00000000000000000000000010001001","00000000000000000000000010001010","00000000000000000000000010001011","00000000000000000000000010001100","00000000000000000000000010001101","00000000000000000000000010001110","00000000000000000000000010001111","00000000000000000000000010010000","00000000000000000000000010010001","00000000000000000000000010010010","00000000000000000000000010010011","00000000000000000000000010010100","00000000000000000000000010010101","00000000000000000000000010010110","00000000000000000000000010010111","00000000000000000000000010011000","00000000000000000000000010011001","00000000000000000000000010011010","00000000000000000000000010011011","00000000000000000000000010011100","00000000000000000000000010011101","00000000000000000000000010011110","00000000000000000000000010011111","00000000000000000000000010100000","00000000000000000000000010100001","00000000000000000000000010100010","00000000000000000000000010100011","00000000000000000000000010100100","00000000000000000000000010100101","00000000000000000000000010100110","00000000000000000000000010100111","00000000000000000000000010101000","00000000000000000000000010101001","00000000000000000000000010101010","00000000000000000000000010101011","00000000000000000000000010101100","00000000000000000000000010101101","00000000000000000000000010101110","00000000000000000000000010101111","00000000000000000000000010110000","00000000000000000000000010110001","00000000000000000000000010110010","00000000000000000000000010110011","00000000000000000000000010110100","00000000000000000000000010110101","00000000000000000000000010110110","00000000000000000000000010110111","00000000000000000000000010111000","00000000000000000000000010111001","00000000000000000000000010111010","00000000000000000000000010111011","00000000000000000000000010111100","00000000000000000000000010111101","00000000000000000000000010111110","00000000000000000000000010111111","00000000000000000000000011000000","00000000000000000000000011000001","00000000000000000000000011000010","00000000000000000000000011000011","00000000000000000000000011000100","00000000000000000000000011000101","00000000000000000000000011000110","00000000000000000000000011000111","00000000000000000000000011001000","00000000000000000000000011001001","00000000000000000000000011001010","00000000000000000000000011001011","00000000000000000000000011001100","00000000000000000000000011001101","00000000000000000000000011001110","00000000000000000000000011001111","00000000000000000000000011010000","00000000000000000000000011010001","00000000000000000000000011010010","00000000000000000000000011010011","00000000000000000000000011010100","00000000000000000000000011010101","00000000000000000000000011010110","00000000000000000000000011010111","00000000000000000000000011011000","00000000000000000000000011011001","00000000000000000000000011011010","00000000000000000000000011011011","00000000000000000000000011011100","00000000000000000000000011011101","00000000000000000000000011011110","00000000000000000000000011011111","00000000000000000000000011100000","00000000000000000000000011100001","00000000000000000000000011100010","00000000000000000000000011100011","00000000000000000000000011100100","00000000000000000000000011100101","00000000000000000000000011100110","00000000000000000000000011100111","00000000000000000000000011101000","00000000000000000000000011101001","00000000000000000000000011101010","00000000000000000000000011101011","00000000000000000000000011101100","00000000000000000000000011101101","00000000000000000000000011101110","00000000000000000000000011101111","00000000000000000000000011110000","00000000000000000000000011110001","00000000000000000000000011110010","00000000000000000000000011110011","00000000000000000000000011110100","00000000000000000000000011110101","00000000000000000000000011110110","00000000000000000000000011110111","00000000000000000000000011111000","00000000000000000000000011111001","00000000000000000000000011111010","00000000000000000000000011111011","00000000000000000000000011111100","00000000000000000000000011111101","00000000000000000000000011111110","00000000000000000000000011111111","00000000000000000000000100000000","00000000000000000000000100000001","00000000000000000000000100000010","00000000000000000000000100000011","00000000000000000000000100000100","00000000000000000000000100000101","00000000000000000000000100000110","00000000000000000000000100000111","00000000000000000000000100001000","00000000000000000000000100001001","00000000000000000000000100001010","00000000000000000000000100001011","00000000000000000000000100001100","00000000000000000000000100001101","00000000000000000000000100001110","00000000000000000000000100001111","00000000000000000000000100010000","00000000000000000000000100010001","00000000000000000000000100010010","00000000000000000000000100010011","00000000000000000000000100010100","00000000000000000000000100010101","00000000000000000000000100010110","00000000000000000000000100010111","00000000000000000000000100011000","00000000000000000000000100011001","00000000000000000000000100011010","00000000000000000000000100011011","00000000000000000000000100011100","00000000000000000000000100011101","00000000000000000000000100011110","00000000000000000000000100011111","00000000000000000000000100100000","00000000000000000000000100100001","00000000000000000000000100100010","00000000000000000000000100100011","00000000000000000000000100100100","00000000000000000000000100100101","00000000000000000000000100100110","00000000000000000000000100100111","00000000000000000000000100101000","00000000000000000000000100101001","00000000000000000000000100101010","00000000000000000000000100101011","00000000000000000000000100101100","00000000000000000000000100101101","00000000000000000000000100101110","00000000000000000000000100101111","00000000000000000000000100110000","00000000000000000000000100110001","00000000000000000000000100110010","00000000000000000000000100110011","00000000000000000000000100110100","00000000000000000000000100110101","00000000000000000000000100110110","00000000000000000000000100110111","00000000000000000000000100111000","00000000000000000000000100111001","00000000000000000000000100111010","00000000000000000000000100111011","00000000000000000000000100111100","00000000000000000000000100111101","00000000000000000000000100111110","00000000000000000000000100111111","00000000000000000000000101000000","00000000000000000000000101000001","00000000000000000000000101000010","00000000000000000000000101000011","00000000000000000000000101000100","00000000000000000000000101000101","00000000000000000000000101000110","00000000000000000000000101000111","00000000000000000000000101001000","00000000000000000000000101001001","00000000000000000000000101001010","00000000000000000000000101001011","00000000000000000000000101001100","00000000000000000000000101001101","00000000000000000000000101001110","00000000000000000000000101001111","00000000000000000000000101010000","00000000000000000000000101010001","00000000000000000000000101010010","00000000000000000000000101010011","00000000000000000000000101010100","00000000000000000000000101010101","00000000000000000000000101010110","00000000000000000000000101010111","00000000000000000000000101011000","00000000000000000000000101011001","00000000000000000000000101011010","00000000000000000000000101011011","00000000000000000000000101011100","00000000000000000000000101011101","00000000000000000000000101011110","00000000000000000000000101011111","00000000000000000000000101100000","00000000000000000000000101100001","00000000000000000000000101100010","00000000000000000000000101100011","00000000000000000000000101100100","00000000000000000000000101100101","00000000000000000000000101100110","00000000000000000000000101100111","00000000000000000000000101101000","00000000000000000000000101101001","00000000000000000000000101101010","00000000000000000000000101101011","00000000000000000000000101101100","00000000000000000000000101101101","00000000000000000000000101101110","00000000000000000000000101101111","00000000000000000000000101110000","00000000000000000000000101110001","00000000000000000000000101110010","00000000000000000000000101110011","00000000000000000000000101110100","00000000000000000000000101110101","00000000000000000000000101110110","00000000000000000000000101110111","00000000000000000000000101111000","00000000000000000000000101111001","00000000000000000000000101111010","00000000000000000000000101111011","00000000000000000000000101111100","00000000000000000000000101111101","00000000000000000000000101111110","00000000000000000000000101111111","00000000000000000000000110000000","00000000000000000000000110000001","00000000000000000000000110000010","00000000000000000000000110000011","00000000000000000000000110000100","00000000000000000000000110000101","00000000000000000000000110000110","00000000000000000000000110000111","00000000000000000000000110001000","00000000000000000000000110001001","00000000000000000000000110001010","00000000000000000000000110001011","00000000000000000000000110001100","00000000000000000000000110001101","00000000000000000000000110001110","00000000000000000000000110001111","00000000000000000000000110010000","00000000000000000000000110010001","00000000000000000000000110010010","00000000000000000000000110010011","00000000000000000000000110010100","00000000000000000000000110010101","00000000000000000000000110010110","00000000000000000000000110010111","00000000000000000000000110011000","00000000000000000000000110011001","00000000000000000000000110011010","00000000000000000000000110011011","00000000000000000000000110011100","00000000000000000000000110011101","00000000000000000000000110011110","00000000000000000000000110011111","00000000000000000000000110100000","00000000000000000000000110100001","00000000000000000000000110100010","00000000000000000000000110100011","00000000000000000000000110100100","00000000000000000000000110100101","00000000000000000000000110100110","00000000000000000000000110100111","00000000000000000000000110101000","00000000000000000000000110101001","00000000000000000000000110101010","00000000000000000000000110101011","00000000000000000000000110101100","00000000000000000000000110101101","00000000000000000000000110101110","00000000000000000000000110101111","00000000000000000000000110110000","00000000000000000000000110110001","00000000000000000000000110110010","00000000000000000000000110110011","00000000000000000000000110110100","00000000000000000000000110110101","00000000000000000000000110110110","00000000000000000000000110110111","00000000000000000000000110111000","00000000000000000000000110111001","00000000000000000000000110111010","00000000000000000000000110111011","00000000000000000000000110111100","00000000000000000000000110111101","00000000000000000000000110111110","00000000000000000000000110111111","00000000000000000000000111000000","00000000000000000000000111000001","00000000000000000000000111000010","00000000000000000000000111000011","00000000000000000000000111000100","00000000000000000000000111000101","00000000000000000000000111000110","00000000000000000000000111000111","00000000000000000000000111001000","00000000000000000000000111001001","00000000000000000000000111001010","00000000000000000000000111001011","00000000000000000000000111001100","00000000000000000000000111001101","00000000000000000000000111001110","00000000000000000000000111001111","00000000000000000000000111010000","00000000000000000000000111010001","00000000000000000000000111010010","00000000000000000000000111010011","00000000000000000000000111010100","00000000000000000000000111010101","00000000000000000000000111010110","00000000000000000000000111010111","00000000000000000000000111011000","00000000000000000000000111011001","00000000000000000000000111011010","00000000000000000000000111011011","00000000000000000000000111011100","00000000000000000000000111011101","00000000000000000000000111011110","00000000000000000000000111011111","00000000000000000000000111100000","00000000000000000000000111100001","00000000000000000000000111100010","00000000000000000000000111100011","00000000000000000000000111100100","00000000000000000000000111100101","00000000000000000000000111100110","00000000000000000000000111100111","00000000000000000000000111101000","00000000000000000000000111101001","00000000000000000000000111101010","00000000000000000000000111101011","00000000000000000000000111101100","00000000000000000000000111101101","00000000000000000000000111101110","00000000000000000000000111101111","00000000000000000000000111110000","00000000000000000000000111110001","00000000000000000000000111110010","00000000000000000000000111110011","00000000000000000000000111110100","00000000000000000000000111110101","00000000000000000000000111110110","00000000000000000000000111110111","00000000000000000000000111111000","00000000000000000000000111111001","00000000000000000000000111111010","00000000000000000000000111111011","00000000000000000000000111111100","00000000000000000000000111111101","00000000000000000000000111111110","00000000000000000000000111111111","00000000000000000000001000000000","00000000000000000000001000000001","00000000000000000000001000000010","00000000000000000000001000000011","00000000000000000000001000000100","00000000000000000000001000000101","00000000000000000000001000000110","00000000000000000000001000000111","00000000000000000000001000001000","00000000000000000000001000001001","00000000000000000000001000001010","00000000000000000000001000001011","00000000000000000000001000001100","00000000000000000000001000001101","00000000000000000000001000001110","00000000000000000000001000001111","00000000000000000000001000010000","00000000000000000000001000010001","00000000000000000000001000010010","00000000000000000000001000010011","00000000000000000000001000010100","00000000000000000000001000010101","00000000000000000000001000010110","00000000000000000000001000010111","00000000000000000000001000011000","00000000000000000000001000011001","00000000000000000000001000011010","00000000000000000000001000011011","00000000000000000000001000011100","00000000000000000000001000011101","00000000000000000000001000011110","00000000000000000000001000011111","00000000000000000000001000100000","00000000000000000000001000100001","00000000000000000000001000100010","00000000000000000000001000100011","00000000000000000000001000100100","00000000000000000000001000100101","00000000000000000000001000100110","00000000000000000000001000100111","00000000000000000000001000101000","00000000000000000000001000101001","00000000000000000000001000101010","00000000000000000000001000101011","00000000000000000000001000101100","00000000000000000000001000101101","00000000000000000000001000101110","00000000000000000000001000101111","00000000000000000000001000110000","00000000000000000000001000110001","00000000000000000000001000110010","00000000000000000000001000110011","00000000000000000000001000110100","00000000000000000000001000110101","00000000000000000000001000110110","00000000000000000000001000110111","00000000000000000000001000111000","00000000000000000000001000111001","00000000000000000000001000111010","00000000000000000000001000111011","00000000000000000000001000111100","00000000000000000000001000111101","00000000000000000000001000111110","00000000000000000000001000111111","00000000000000000000001001000000","00000000000000000000001001000001","00000000000000000000001001000010","00000000000000000000001001000011","00000000000000000000001001000100","00000000000000000000001001000101","00000000000000000000001001000110","00000000000000000000001001000111","00000000000000000000001001001000","00000000000000000000001001001001","00000000000000000000001001001010","00000000000000000000001001001011","00000000000000000000001001001100","00000000000000000000001001001101","00000000000000000000001001001110","00000000000000000000001001001111","00000000000000000000001001010000","00000000000000000000001001010001","00000000000000000000001001010010","00000000000000000000001001010011","00000000000000000000001001010100","00000000000000000000001001010101","00000000000000000000001001010110","00000000000000000000001001010111","00000000000000000000001001011000","00000000000000000000001001011001","00000000000000000000001001011010","00000000000000000000001001011011","00000000000000000000001001011100","00000000000000000000001001011101","00000000000000000000001001011110","00000000000000000000001001011111","00000000000000000000001001100000","00000000000000000000001001100001","00000000000000000000001001100010","00000000000000000000001001100011","00000000000000000000001001100100","00000000000000000000001001100101","00000000000000000000001001100110","00000000000000000000001001100111","00000000000000000000001001101000","00000000000000000000001001101001","00000000000000000000001001101010","00000000000000000000001001101011","00000000000000000000001001101100","00000000000000000000001001101101","00000000000000000000001001101110","00000000000000000000001001101111","00000000000000000000001001110000","00000000000000000000001001110001","00000000000000000000001001110010","00000000000000000000001001110011","00000000000000000000001001110100","00000000000000000000001001110101","00000000000000000000001001110110","00000000000000000000001001110111","00000000000000000000001001111000","00000000000000000000001001111001","00000000000000000000001001111010","00000000000000000000001001111011","00000000000000000000001001111100","00000000000000000000001001111101","00000000000000000000001001111110","00000000000000000000001001111111","00000000000000000000001010000000","00000000000000000000001010000001","00000000000000000000001010000010","00000000000000000000001010000011","00000000000000000000001010000100","00000000000000000000001010000101","00000000000000000000001010000110","00000000000000000000001010000111","00000000000000000000001010001000","00000000000000000000001010001001","00000000000000000000001010001010","00000000000000000000001010001011","00000000000000000000001010001100","00000000000000000000001010001101","00000000000000000000001010001110","00000000000000000000001010001111","00000000000000000000001010010000","00000000000000000000001010010001","00000000000000000000001010010010","00000000000000000000001010010011","00000000000000000000001010010100","00000000000000000000001010010101","00000000000000000000001010010110","00000000000000000000001010010111","00000000000000000000001010011000","00000000000000000000001010011001","00000000000000000000001010011010","00000000000000000000001010011011","00000000000000000000001010011100","00000000000000000000001010011101","00000000000000000000001010011110","00000000000000000000001010011111","00000000000000000000001010100000","00000000000000000000001010100001","00000000000000000000001010100010","00000000000000000000001010100011","00000000000000000000001010100100","00000000000000000000001010100101","00000000000000000000001010100110","00000000000000000000001010100111","00000000000000000000001010101000","00000000000000000000001010101001","00000000000000000000001010101010","00000000000000000000001010101011","00000000000000000000001010101100","00000000000000000000001010101101","00000000000000000000001010101110","00000000000000000000001010101111","00000000000000000000001010110000","00000000000000000000001010110001","00000000000000000000001010110010","00000000000000000000001010110011","00000000000000000000001010110100","00000000000000000000001010110101","00000000000000000000001010110110","00000000000000000000001010110111","00000000000000000000001010111000","00000000000000000000001010111001","00000000000000000000001010111010","00000000000000000000001010111011","00000000000000000000001010111100","00000000000000000000001010111101","00000000000000000000001010111110","00000000000000000000001010111111","00000000000000000000001011000000","00000000000000000000001011000001","00000000000000000000001011000010","00000000000000000000001011000011","00000000000000000000001011000100","00000000000000000000001011000101","00000000000000000000001011000110","00000000000000000000001011000111","00000000000000000000001011001000","00000000000000000000001011001001","00000000000000000000001011001010","00000000000000000000001011001011","00000000000000000000001011001100","00000000000000000000001011001101","00000000000000000000001011001110","00000000000000000000001011001111","00000000000000000000001011010000","00000000000000000000001011010001","00000000000000000000001011010010","00000000000000000000001011010011","00000000000000000000001011010100","00000000000000000000001011010101","00000000000000000000001011010110","00000000000000000000001011010111","00000000000000000000001011011000","00000000000000000000001011011001","00000000000000000000001011011010","00000000000000000000001011011011","00000000000000000000001011011100","00000000000000000000001011011101","00000000000000000000001011011110","00000000000000000000001011011111","00000000000000000000001011100000","00000000000000000000001011100001","00000000000000000000001011100010","00000000000000000000001011100011","00000000000000000000001011100100","00000000000000000000001011100101","00000000000000000000001011100110","00000000000000000000001011100111","00000000000000000000001011101000","00000000000000000000001011101001","00000000000000000000001011101010","00000000000000000000001011101011","00000000000000000000001011101100","00000000000000000000001011101101","00000000000000000000001011101110","00000000000000000000001011101111","00000000000000000000001011110000","00000000000000000000001011110001","00000000000000000000001011110010","00000000000000000000001011110011","00000000000000000000001011110100","00000000000000000000001011110101","00000000000000000000001011110110","00000000000000000000001011110111","00000000000000000000001011111000","00000000000000000000001011111001","00000000000000000000001011111010","00000000000000000000001011111011","00000000000000000000001011111100","00000000000000000000001011111101","00000000000000000000001011111110","00000000000000000000001011111111","00000000000000000000001100000000","00000000000000000000001100000001","00000000000000000000001100000010","00000000000000000000001100000011","00000000000000000000001100000100","00000000000000000000001100000101","00000000000000000000001100000110","00000000000000000000001100000111","00000000000000000000001100001000","00000000000000000000001100001001","00000000000000000000001100001010","00000000000000000000001100001011","00000000000000000000001100001100","00000000000000000000001100001101","00000000000000000000001100001110","00000000000000000000001100001111","00000000000000000000001100010000","00000000000000000000001100010001","00000000000000000000001100010010","00000000000000000000001100010011","00000000000000000000001100010100","00000000000000000000001100010101","00000000000000000000001100010110","00000000000000000000001100010111","00000000000000000000001100011000","00000000000000000000001100011001","00000000000000000000001100011010","00000000000000000000001100011011","00000000000000000000001100011100","00000000000000000000001100011101","00000000000000000000001100011110","00000000000000000000001100011111","00000000000000000000001100100000","00000000000000000000001100100001","00000000000000000000001100100010","00000000000000000000001100100011","00000000000000000000001100100100","00000000000000000000001100100101","00000000000000000000001100100110","00000000000000000000001100100111","00000000000000000000001100101000","00000000000000000000001100101001","00000000000000000000001100101010","00000000000000000000001100101011","00000000000000000000001100101100","00000000000000000000001100101101","00000000000000000000001100101110","00000000000000000000001100101111","00000000000000000000001100110000","00000000000000000000001100110001","00000000000000000000001100110010","00000000000000000000001100110011","00000000000000000000001100110100","00000000000000000000001100110101","00000000000000000000001100110110","00000000000000000000001100110111","00000000000000000000001100111000","00000000000000000000001100111001","00000000000000000000001100111010","00000000000000000000001100111011","00000000000000000000001100111100","00000000000000000000001100111101","00000000000000000000001100111110","00000000000000000000001100111111","00000000000000000000001101000000","00000000000000000000001101000001","00000000000000000000001101000010","00000000000000000000001101000011","00000000000000000000001101000100","00000000000000000000001101000101","00000000000000000000001101000110","00000000000000000000001101000111","00000000000000000000001101001000","00000000000000000000001101001001","00000000000000000000001101001010","00000000000000000000001101001011","00000000000000000000001101001100","00000000000000000000001101001101","00000000000000000000001101001110","00000000000000000000001101001111","00000000000000000000001101010000","00000000000000000000001101010001","00000000000000000000001101010010","00000000000000000000001101010011","00000000000000000000001101010100","00000000000000000000001101010101","00000000000000000000001101010110","00000000000000000000001101010111","00000000000000000000001101011000","00000000000000000000001101011001","00000000000000000000001101011010","00000000000000000000001101011011","00000000000000000000001101011100","00000000000000000000001101011101","00000000000000000000001101011110","00000000000000000000001101011111","00000000000000000000001101100000","00000000000000000000001101100001","00000000000000000000001101100010","00000000000000000000001101100011","00000000000000000000001101100100","00000000000000000000001101100101","00000000000000000000001101100110","00000000000000000000001101100111","00000000000000000000001101101000","00000000000000000000001101101001","00000000000000000000001101101010","00000000000000000000001101101011","00000000000000000000001101101100","00000000000000000000001101101101","00000000000000000000001101101110","00000000000000000000001101101111","00000000000000000000001101110000","00000000000000000000001101110001","00000000000000000000001101110010","00000000000000000000001101110011","00000000000000000000001101110100","00000000000000000000001101110101","00000000000000000000001101110110","00000000000000000000001101110111","00000000000000000000001101111000","00000000000000000000001101111001","00000000000000000000001101111010","00000000000000000000001101111011","00000000000000000000001101111100","00000000000000000000001101111101","00000000000000000000001101111110","00000000000000000000001101111111","00000000000000000000001110000000","00000000000000000000001110000001","00000000000000000000001110000010","00000000000000000000001110000011","00000000000000000000001110000100","00000000000000000000001110000101","00000000000000000000001110000110","00000000000000000000001110000111","00000000000000000000001110001000","00000000000000000000001110001001","00000000000000000000001110001010","00000000000000000000001110001011","00000000000000000000001110001100","00000000000000000000001110001101","00000000000000000000001110001110","00000000000000000000001110001111","00000000000000000000001110010000","00000000000000000000001110010001","00000000000000000000001110010010","00000000000000000000001110010011","00000000000000000000001110010100","00000000000000000000001110010101","00000000000000000000001110010110","00000000000000000000001110010111","00000000000000000000001110011000","00000000000000000000001110011001","00000000000000000000001110011010","00000000000000000000001110011011","00000000000000000000001110011100","00000000000000000000001110011101","00000000000000000000001110011110","00000000000000000000001110011111","00000000000000000000001110100000","00000000000000000000001110100001","00000000000000000000001110100010","00000000000000000000001110100011","00000000000000000000001110100100","00000000000000000000001110100101","00000000000000000000001110100110","00000000000000000000001110100111","00000000000000000000001110101000","00000000000000000000001110101001","00000000000000000000001110101010","00000000000000000000001110101011","00000000000000000000001110101100","00000000000000000000001110101101","00000000000000000000001110101110","00000000000000000000001110101111","00000000000000000000001110110000","00000000000000000000001110110001","00000000000000000000001110110010","00000000000000000000001110110011","00000000000000000000001110110100","00000000000000000000001110110101","00000000000000000000001110110110","00000000000000000000001110110111","00000000000000000000001110111000","00000000000000000000001110111001","00000000000000000000001110111010","00000000000000000000001110111011","00000000000000000000001110111100","00000000000000000000001110111101","00000000000000000000001110111110","00000000000000000000001110111111","00000000000000000000001111000000","00000000000000000000001111000001","00000000000000000000001111000010","00000000000000000000001111000011","00000000000000000000001111000100","00000000000000000000001111000101","00000000000000000000001111000110","00000000000000000000001111000111","00000000000000000000001111001000","00000000000000000000001111001001","00000000000000000000001111001010","00000000000000000000001111001011","00000000000000000000001111001100","00000000000000000000001111001101","00000000000000000000001111001110","00000000000000000000001111001111","00000000000000000000001111010000","00000000000000000000001111010001","00000000000000000000001111010010","00000000000000000000001111010011","00000000000000000000001111010100","00000000000000000000001111010101","00000000000000000000001111010110","00000000000000000000001111010111","00000000000000000000001111011000","00000000000000000000001111011001","00000000000000000000001111011010","00000000000000000000001111011011","00000000000000000000001111011100","00000000000000000000001111011101","00000000000000000000001111011110","00000000000000000000001111011111","00000000000000000000001111100000","00000000000000000000001111100001","00000000000000000000001111100010","00000000000000000000001111100011","00000000000000000000001111100100","00000000000000000000001111100101","00000000000000000000001111100110","00000000000000000000001111100111","00000000000000000000001111101000"],"x":[0.0,1.0,2.0,3.0,4.0,5.0,6.0,7.0,8.0,9.0,10.0,11.0,12.0,13.0,14.0,15.0,16.0,17.0,18.0,19.0,20.0,21.0,22.0,23.0,24.0,25.0,26.0,27.0,28.0,29.0,30.0,31.0,32.0,33.0,34.0,35.0,36.0,37.0,38.0,39.0,40.0,41.0,42.0,43.0,44.0,45.0,46.0,47.0,48.0,49.0,50.0,51.0,52.0,53.0,54.0,55.0,56.0,57.0,58.0,59.0,60.0,61.0,62.0,63.0,64.0,65.0,66.0,67.0,68.0,69.0,70.0,71.0,72.0,73.0,74.0,75.0,76.0,77.0,78.0,79.0,80.0,81.0,82.0,83.0,84.0,85.0,86.0,87.0,88.0,89.0,90.0,91.0,92.0,93.0,94.0,95.0,96.0,97.0,98.0,99.0,100.0,101.0,102.0,103.0,104.0,105.0,106.0,107.0,108.0,109.0,110.0,111.0,112.0,113.0,114.0,115.0,116.0,117.0,118.0,119.0,120.0,121.0,122.0,123.0,124.0,125.0,126.0,127.0,128.0,129.0,130.0,131.0,132.0,133.0,134.0,135.0,136.0,137.0,138.0,139.0,140.0,141.0,142.0,143.0,144.0,145.0,146.0,147.0,148.0,149.0,150.0,151.0,152.0,153.0,154.0,155.0,156.0,157.0,158.0,159.0,160.0,161.0,162.0,163.0,164.0,165.0,166.0,167.0,168.0,169.0,170.0,171.0,172.0,173.0,174.0,175.0,176.0,177.0,178.0,179.0,180.0,181.0,182.0,183.0,184.0,185.0,186.0,187.0,188.0,189.0,190.0,191.0,192.0,193.0,194.0,195.0,196.0,197.0,198.0,199.0,200.0,201.0,202.0,203.0,204.0,205.0,206.0,207.0,208.0,209.0,210.0,211.0,212.0,213.0,214.0,215.0,216.0,217.0,218.0,219.0,220.0,221.0,222.0,223.0,224.0,225.0,226.0,227.0,228.0,229.0,230.0,231.0,232.0,233.0,234.0,235.0,236.0,237.0,238.0,239.0,240.0,241.0,242.0,243.0,244.0,245.0,246.0,247.0,248.0,249.0,250.0,251.0,252.0,253.0,254.0,255.0,256.0,257.0,258.0,259.0,260.0,261.0,262.0,263.0,264.0,265.0,266.0,267.0,268.0,269.0,270.0,271.0,272.0,273.0,274.0,275.0,276.0,277.0,278.0,279.0,280.0,281.0,282.0,283.0,284.0,285.0,286.0,287.0,288.0,289.0,290.0,291.0,292.0,293.0,294.0,295.0,296.0,297.0,298.0,299.0,300.0,301.0,302.0,303.0,304.0,305.0,306.0,307.0,308.0,309.0,310.0,311.0,312.0,313.0,314.0,315.0,316.0,317.0,318.0,319.0,320.0,321.0,322.0,323.0,324.0,325.0,326.0,327.0,328.0,329.0,330.0,331.0,332.0,333.0,334.0,335.0,336.0,337.0,338.0,339.0,340.0,341.0,342.0,343.0,344.0,345.0,346.0,347.0,348.0,349.0,350.0,351.0,352.0,353.0,354.0,355.0,356.0,357.0,358.0,359.0,360.0,361.0,362.0,363.0,364.0,365.0,366.0,367.0,368.0,369.0,370.0,371.0,372.0,373.0,374.0,375.0,376.0,377.0,378.0,379.0,380.0,381.0,382.0,383.0,384.0,385.0,386.0,387.0,388.0,389.0,390.0,391.0,392.0,393.0,394.0,395.0,396.0,397.0,398.0,399.0,400.0,401.0,402.0,403.0,404.0,405.0,406.0,407.0,408.0,409.0,410.0,411.0,412.0,413.0,414.0,415.0,416.0,417.0,418.0,419.0,420.0,421.0,422.0,423.0,424.0,425.0,426.0,427.0,428.0,429.0,430.0,431.0,432.0,433.0,434.0,435.0,436.0,437.0,438.0,439.0,440.0,441.0,442.0,443.0,444.0,445.0,446.0,447.0,448.0,449.0,450.0,451.0,452.0,453.0,454.0,455.0,456.0,457.0,458.0,459.0,460.0,461.0,462.0,463.0,464.0,465.0,466.0,467.0,468.0,469.0,470.0,471.0,472.0,473.0,474.0,475.0,476.0,477.0,478.0,479.0,480.0,481.0,482.0,483.0,484.0,485.0,486.0,487.0,488.0,489.0,490.0,491.0,492.0,493.0,494.0,495.0,496.0,497.0,498.0,499.0,500.0,501.0,502.0,503.0,504.0,505.0,506.0,507.0,508.0,509.0,510.0,511.0,512.0,513.0,514.0,515.0,516.0,517.0,518.0,519.0,520.0,521.0,522.0,523.0,524.0,525.0,526.0,527.0,528.0,529.0,530.0,531.0,532.0,533.0,534.0,535.0,536.0,537.0,538.0,539.0,540.0,541.0,542.0,543.0,544.0,545.0,546.0,547.0,548.0,549.0,550.0,551.0,552.0,553.0,554.0,555.0,556.0,557.0,558.0,559.0,560.0,561.0,562.0,563.0,564.0,565.0,566.0,567.0,568.0,569.0,570.0,571.0,572.0,573.0,574.0,575.0,576.0,577.0,578.0,579.0,580.0,581.0,582.0,583.0,584.0,585.0,586.0,587.0,588.0,589.0,590.0,591.0,592.0,593.0,594.0,595.0,596.0,597.0,598.0,599.0,600.0,601.0,602.0,603.0,604.0,605.0,606.0,607.0,608.0,609.0,610.0,611.0,612.0,613.0,614.0,615.0,616.0,617.0,618.0,619.0,620.0,621.0,622.0,623.0,624.0,625.0,626.0,627.0,628.0,629.0,630.0,631.0,632.0,633.0,634.0,635.0,636.0,637.0,638.0,639.0,640.0,641.0,642.0,643.0,644.0,645.0,646.0,647.0,648.0,649.0,650.0,651.0,652.0,653.0,654.0,655.0,656.0,657.0,658.0,659.0,660.0,661.0,662.0,663.0,664.0,665.0,666.0,667.0,668.0,669.0,670.0,671.0,672.0,673.0,674.0,675.0,676.0,677.0,678.0,679.0,680.0,681.0,682.0,683.0,684.0,685.0,686.0,687.0,688.0,689.0,690.0,691.0,692.0,693.0,694.0,695.0,696.0,697.0,698.0,699.0,700.0,701.0,702.0,703.0,704.0,705.0,706.0,707.0,708.0,709.0,710.0,711.0,712.0,713.0,714.0,715.0,716.0,717.0,718.0,719.0,720.0,721.0,722.0,723.0,724.0,725.0,726.0,727.0,728.0,729.0,730.0,731.0,732.0,733.0,734.0,735.0,736.0,737.0,738.0,739.0,740.0,741.0,742.0,743.0,744.0,745.0,746.0,747.0,748.0,749.0,750.0,751.0,752.0,753.0,754.0,755.0,756.0,757.0,758.0,759.0,760.0,761.0,762.0,763.0,764.0,765.0,766.0,767.0,768.0,769.0,770.0,771.0,772.0,773.0,774.0,775.0,776.0,777.0,778.0,779.0,780.0,781.0,782.0,783.0,784.0,785.0,786.0,787.0,788.0,789.0,790.0,791.0,792.0,793.0,794.0,795.0,796.0,797.0,798.0,799.0,800.0,801.0,802.0,803.0,804.0,805.0,806.0,807.0,808.0,809.0,810.0,811.0,812.0,813.0,814.0,815.0,816.0,817.0,818.0,819.0,820.0,821.0,822.0,823.0,824.0,825.0,826.0,827.0,828.0,829.0,830.0,831.0,832.0,833.0,834.0,835.0,836.0,837.0,838.0,839.0,840.0,841.0,842.0,843.0,844.0,845.0,846.0,847.0,848.0,849.0,850.0,851.0,852.0,853.0,854.0,855.0,856.0,857.0,858.0,859.0,860.0,861.0,862.0,863.0,864.0,865.0,866.0,867.0,868.0,869.0,870.0,871.0,872.0,873.0,874.0,875.0,876.0,877.0,878.0,879.0,880.0,881.0,882.0,883.0,884.0,885.0,886.0,887.0,888.0,889.0,890.0,891.0,892.0,893.0,894.0,895.0,896.0,897.0,898.0,899.0,900.0,901.0,902.0,903.0,904.0,905.0,906.0,907.0,908.0,909.0,910.0,911.0,912.0,913.0,914.0,915.0,916.0,917.0,918.0,919.0,920.0,921.0,922.0,923.0,924.0,925.0,926.0,927.0,928.0,929.0,930.0,931.0,932.0,933.0,934.0,935.0,936.0,937.0,938.0,939.0,940.0,941.0,942.0,943.0,944.0,945.0,946.0,947.0,948.0,949.0,950.0,951.0,952.0,953.0,954.0,955.0,956.0,957.0,958.0,959.0,960.0,961.0,962.0,963.0,964.0,965.0,966.0,967.0,968.0,969.0,970.0,971.0,972.0,973.0,974.0,975.0,976.0,977.0,978.0,979.0,980.0,981.0,982.0,983.0,984.0,985.0,986.0,987.0,988.0,989.0,990.0,991.0,992.0,993.0,994.0,995.0,996.0,997.0,998.0,999.0,1000.0]}
},{}],36:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var MAX_UINT32 = require( '@stdlib/math/constants/uint32-max' );
var toBinaryString = require( './../lib' );


// FIXTURES //

var small = require( './fixtures/julia/small.json' );
var medium = require( './fixtures/julia/medium.json' );
var large = require( './fixtures/julia/large.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof toBinaryString, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a literal 32-bit unsigned integer representation for 0', function test( t ) {
	var expected;

	expected = '00000000000000000000000000000000';

	t.equal( toBinaryString(0), expected, 'returns bit literal for 0' );
	t.end();
});

tape( 'the function returns a literal 32-bit unsigned integer representation for MAX_UINT32', function test( t ) {
	var expected;

	expected = '11111111111111111111111111111111';

	t.equal( toBinaryString(MAX_UINT32), expected, 'returns bit literal for MAX_UINT32' );
	t.end();
});

tape( 'the function returns literal bit representations for unsigned 32-bit integers (small)', function test( t ) {
	var expected;
	var str;
	var x;
	var i;

	x = small.x;
	expected = small.expected;
	for ( i = 0; i < x.length; i++ ) {
		str = toBinaryString( x[ i ] );
		t.equal( str, expected[ i ], 'returns bit literal for ' + x[ i ] );
	}
	t.end();
});

tape( 'the function returns literal bit representations for unsigned 32-bit integers (medium)', function test( t ) {
	var expected;
	var str;
	var x;
	var i;

	x = medium.x;
	expected = medium.expected;
	for ( i = 0; i < x.length; i++ ) {
		str = toBinaryString( x[ i ] );
		t.equal( str, expected[ i ], 'returns bit literal for ' + x[ i ] );
	}
	t.end();
});

tape( 'the function returns literal bit representations for unsigned 32-bit integers (large)', function test( t ) {
	var expected;
	var str;
	var x;
	var i;

	x = large.x;
	expected = large.expected;
	for ( i = 0; i < x.length; i++ ) {
		str = toBinaryString( x[ i ] );
		t.equal( str, expected[ i ], 'returns bit literal for ' + x[ i ] );
	}
	t.end();
});

tape( 'the function will accept floating-point values, but will interpret the values as unsigned 32-bit integers', function test( t ) {
	var values;
	var str;
	var i;

	values = [
		1.0e308,
		3.14,
		1.0/3.0,
		1.0/10.0,
		-0.0,
		-1.0e-308,
		-1.0e308,
		1.0/0.0,
		1.0/-0.0,
		NaN
	];

	for ( i = 0; i < values.length; i++ ) {
		str = toBinaryString( values[i] );
		t.equal( typeof str, 'string', 'returns a string' );
		t.equal( str.length, 32, 'returns a string of length 32' );
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/utils/uint32-to-binary-string/test/test.js")
},{"./../lib":31,"./fixtures/julia/large.json":33,"./fixtures/julia/medium.json":34,"./fixtures/julia/small.json":35,"@stdlib/math/constants/uint32-max":40,"tape":110}],37:[function(require,module,exports){
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

},{}],38:[function(require,module,exports){
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

},{}],39:[function(require,module,exports){
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

},{}],40:[function(require,module,exports){
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

},{}],41:[function(require,module,exports){
'use strict';

/**
* Left pad a string such that the padded string has a length of at least `len`.
*
* @module @stdlib/string/left-pad
*
* @example
* var lpad = require( '@stdlib/string/left-pad' );
*
* var str = lpad( 'a', 5 );
* // returns '    a'
*
* str = lpad( 'beep', 10, 'b' );
* // returns 'bbbbbbbeep'
*
* str = lpad( 'boop', 12, 'beep' );
* // returns 'beepbeepboop'
*/

// MODULES //

var lpad = require( './left_pad.js' );


// EXPORTS //

module.exports = lpad;

},{"./left_pad.js":42}],42:[function(require,module,exports){
'use strict';

// MODULES //

var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var repeat = require( '@stdlib/string/repeat' );
var ceil = require( '@stdlib/math/base/special/ceil' );
var MAX_SAFE_INTEGER = require( '@stdlib/math/constants/float64-max-safe-integer' );


// MAIN //

/**
* Left pads a string such that the padded string has a length of at least `len`.
*
* @param {string} str - string to pad
* @param {NonNegativeInteger} len - minimum string length
* @param {string} [pad=' '] - string used to pad
* @throws {TypeError} first argument must be a string
* @throws {TypeError} second argument must be a nonnegative integer
* @throws {TypeError} third argument must be a string
* @throws {RangeError} padding must have a length greater than `0`
* @returns {string} padded string
*
* @example
* var str = lpad( 'a', 5 );
* // returns '    a'
*
* @example
* var str = lpad( 'beep', 10, 'b' );
* // returns 'bbbbbbbeep'
*
* @example
* var str = lpad( 'boop', 12, 'beep' );
* // returns 'beepbeepboop'
*/
function lpad( str, len, pad ) {
	var n;
	var p;
	if ( !isString( str ) ) {
		throw new TypeError( 'invalid input argument. First argument must be a string. Value: `' + str + '`.' );
	}
	if ( !isNonNegativeInteger( len ) ) {
		throw new TypeError( 'invalid input argument. Second argument must be a nonnegative integer. Value: `' + len + '`.' );
	}
	if ( arguments.length > 2 ) {
		p = pad;
		if ( !isString( p ) ) {
			throw new TypeError( 'invalid input argument. Third argument must be a string. Value: `' + p + '`.' );
		}
		if ( p.length === 0 ) {
			throw new RangeError( 'invalid input argument. Third argument must not be an empty string.' );
		}
	} else {
		p = ' ';
	}
	if ( len > MAX_SAFE_INTEGER ) {
		throw new RangeError( 'invalid input argument. Output string length exceeds maximum allowed string length.' );
	}
	n = ( len - str.length ) / p.length;
	if ( n <= 0 ) {
		return str;
	}
	n = ceil( n );
	return repeat( p, n ) + str;
} // end FUNCTION lpad()


// EXPORTS //

module.exports = lpad;

},{"@stdlib/assert/is-nonnegative-integer":9,"@stdlib/assert/is-string":19,"@stdlib/math/base/special/ceil":27,"@stdlib/math/constants/float64-max-safe-integer":37,"@stdlib/string/repeat":43}],43:[function(require,module,exports){
'use strict';

/**
* Repeat a string a specified number of times and return the concatenated result.
*
* @module @stdlib/string/repeat
*
* @example
* var replace = require( '@stdlib/string/repeat' );
*
* var str = repeat( 'a', 5 );
* // returns 'aaaaa'
*
* str = repeat( '', 100 );
* // returns ''
*
* str = repeat( 'beep', 0 );
* // returns ''
*/

// MODULES //

var repeat = require( './repeat.js' );


// EXPORTS //

module.exports = repeat;

},{"./repeat.js":44}],44:[function(require,module,exports){
'use strict';

// MODULES //

var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var MAX_SAFE_INTEGER = require( '@stdlib/math/constants/float64-max-safe-integer' );


// MAIN //

/**
* Repeats a string a specified number of times and returns the concatenated result.
*
* #### Implementation
*
* The algorithmic trick used in the implementation is to treat string concatenation the same as binary addition (i.e., any natural number (nonnegative integer) can be expressed as a sum of powers of two).
*
* For example,
*
* ``` text
* n = 10 => 1010 => 2^3 + 2^0 + 2^1 + 2^0
* ```
*
* We can produce a 10-repeat string by "adding" the results of a 8-repeat string and a 2-repeat string.
*
* The implementation is then as follows:
*
*   1. Let `s` be the string to be repeated and `o` be an output string.
*   2. Initialize an output string `o`.
*   3. Check the least significant bit to determine if the current `s` string should be "added" to the output "total".
*      - if the bit is a one, add
*      - otherwise, move on
*   4. Double the string `s` by adding `s` to `s`.
*   5. Right-shift the bits of `n`.
*   6. Check if we have shifted off all bits.
*      - if yes, done.
*      - otherwise, move on
*   7. Repeat 3-6.
*
* The result is that, as the string is repeated, we continually check to see if the doubled string is one which we want to add to our "total".
*
* The algorithm runs in `O(log_2(n))` compared to `O(n)`.
*
*
* @param {string} str - string to repeat
* @param {NonNegativeInteger} n - number of times to repeat the string
* @throws {TypeError} first argument must be a string primitive
* @throws {TypeError} second argument must be a nonnegative integer
* @throws {RangeError} output string length must not exceed maximum allowed string length
* @returns {string} repeated string
*
* @example
* var str = repeat( 'a', 5 );
* // returns 'aaaaa'
*
* @example
* var str = repeat( '', 100 );
* // returns ''
*
* @example
* var str = repeat( 'beep', 0 );
* // returns ''
*/
function repeat( str, n ) {
	var rpt;
	var cnt;
	if ( !isString( str ) ) {
		throw new TypeError( 'invalid input argument. First argument must be a string. Value: `' + str + '`.' );
	}
	if ( !isNonNegativeInteger( n ) ) {
		throw new TypeError( 'invalid input argument. Second argument must be a nonnegative integer. Value: `' + n + '`.' );
	}
	if ( str.length === 0 || n === 0 ) {
		return '';
	}
	// Check that output string will not exceed the maximum string length:
	if ( str.length * n > MAX_SAFE_INTEGER ) {
		throw new RangeError( 'invalid input argument. Output string length exceeds maximum allowed string length.' );
	}
	rpt = '';
	cnt = n;
	for ( ; ; ) {
		// If the count is odd, append the current concatenated string:
		if ( (cnt&1) === 1 ) {
			rpt += str;
		}
		// Right-shift the bits:
		cnt >>>= 1;
		if ( cnt === 0 ) {
			break;
		}
		// Double the string:
		str += str;
	}
	return rpt;
} // end FUNCTION repeat()


// EXPORTS //

module.exports = repeat;

},{"@stdlib/assert/is-nonnegative-integer":9,"@stdlib/assert/is-string":19,"@stdlib/math/constants/float64-max-safe-integer":37}],45:[function(require,module,exports){
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

},{}],46:[function(require,module,exports){
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

},{"./define_read_only_property.js":45}],47:[function(require,module,exports){
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

},{}],48:[function(require,module,exports){
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

},{"./detect_symbol_support.js":47}],49:[function(require,module,exports){
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

},{"@stdlib/utils/detect-symbol-support":48}],50:[function(require,module,exports){
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

},{"./has_tostringtag_support.js":49}],51:[function(require,module,exports){
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

},{"./native_class.js":52,"./polyfill.js":53,"@stdlib/utils/detect-tostringtag-support":50}],52:[function(require,module,exports){
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

},{"./tostring.js":54}],53:[function(require,module,exports){
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

},{"./tostring.js":54,"./tostringtag.js":55,"@stdlib/assert/has-own-property":2}],54:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = Object.prototype.toString; // eslint-disable-line no-redeclare

},{}],55:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';

},{}],56:[function(require,module,exports){
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

},{}],57:[function(require,module,exports){

},{}],58:[function(require,module,exports){
arguments[4][57][0].apply(exports,arguments)
},{"dup":57}],59:[function(require,module,exports){
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

},{}],60:[function(require,module,exports){
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

},{"base64-js":56,"ieee754":79}],61:[function(require,module,exports){
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
},{"../../is-buffer/index.js":81}],62:[function(require,module,exports){
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

},{"./lib/is_arguments.js":63,"./lib/keys.js":64}],63:[function(require,module,exports){
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

},{}],64:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],65:[function(require,module,exports){
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

},{"foreach":75,"object-keys":84}],66:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],67:[function(require,module,exports){
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

},{"./helpers/isFinite":68,"./helpers/isNaN":69,"./helpers/mod":70,"./helpers/sign":71,"es-to-primitive/es5":72,"has":78,"is-callable":82}],68:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],69:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],70:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],71:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],72:[function(require,module,exports){
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

},{"./helpers/isPrimitive":73,"is-callable":82}],73:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],74:[function(require,module,exports){
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

},{}],75:[function(require,module,exports){

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


},{}],76:[function(require,module,exports){
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

},{}],77:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":76}],78:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":77}],79:[function(require,module,exports){
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

},{}],80:[function(require,module,exports){
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

},{}],81:[function(require,module,exports){
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

},{}],82:[function(require,module,exports){
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

},{}],83:[function(require,module,exports){
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

},{}],84:[function(require,module,exports){
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

},{"./isArguments":85}],85:[function(require,module,exports){
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

},{}],86:[function(require,module,exports){
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
},{"_process":59}],87:[function(require,module,exports){
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
},{"_process":59}],88:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":89}],89:[function(require,module,exports){
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
},{"./_stream_readable":91,"./_stream_writable":93,"core-util-is":61,"inherits":80,"process-nextick-args":87}],90:[function(require,module,exports){
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
},{"./_stream_transform":92,"core-util-is":61,"inherits":80}],91:[function(require,module,exports){
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
},{"./_stream_duplex":89,"./internal/streams/BufferList":94,"./internal/streams/destroy":95,"./internal/streams/stream":96,"_process":59,"core-util-is":61,"events":74,"inherits":80,"isarray":97,"process-nextick-args":87,"safe-buffer":104,"string_decoder/":98,"util":57}],92:[function(require,module,exports){
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
},{"./_stream_duplex":89,"core-util-is":61,"inherits":80}],93:[function(require,module,exports){
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
},{"./_stream_duplex":89,"./internal/streams/destroy":95,"./internal/streams/stream":96,"_process":59,"core-util-is":61,"inherits":80,"process-nextick-args":87,"safe-buffer":104,"util-deprecate":116}],94:[function(require,module,exports){
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
},{"safe-buffer":104}],95:[function(require,module,exports){
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
},{"process-nextick-args":87}],96:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":74}],97:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],98:[function(require,module,exports){
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
},{"safe-buffer":104}],99:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":100}],100:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":89,"./lib/_stream_passthrough.js":90,"./lib/_stream_readable.js":91,"./lib/_stream_transform.js":92,"./lib/_stream_writable.js":93}],101:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":100}],102:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":93}],103:[function(require,module,exports){
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
},{"_process":59,"through":115}],104:[function(require,module,exports){
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

},{"buffer":60}],105:[function(require,module,exports){
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

},{"events":74,"inherits":80,"readable-stream/duplex.js":88,"readable-stream/passthrough.js":99,"readable-stream/readable.js":100,"readable-stream/transform.js":101,"readable-stream/writable.js":102}],106:[function(require,module,exports){
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

},{"es-abstract/es5":67,"function-bind":77}],107:[function(require,module,exports){
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

},{"./implementation":106,"./polyfill":108,"./shim":109,"define-properties":65,"function-bind":77}],108:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":106}],109:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":108,"define-properties":65}],110:[function(require,module,exports){
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
},{"./lib/default_stream":111,"./lib/results":113,"./lib/test":114,"_process":59,"defined":66,"through":115}],111:[function(require,module,exports){
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
},{"_process":59,"fs":58,"through":115}],112:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":59}],113:[function(require,module,exports){
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
},{"_process":59,"events":74,"function-bind":77,"has":78,"inherits":80,"object-inspect":83,"resumer":103,"through":115}],114:[function(require,module,exports){
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
},{"./next_tick":112,"deep-equal":62,"defined":66,"events":74,"has":78,"inherits":80,"path":86,"string.prototype.trim":107}],115:[function(require,module,exports){
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
},{"_process":59,"stream":105}],116:[function(require,module,exports){
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
},{}]},{},[36]);
