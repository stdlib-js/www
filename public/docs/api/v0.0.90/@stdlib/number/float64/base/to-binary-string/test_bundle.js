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
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var main = ( typeof Object.defineProperty === 'function' ) ? Object.defineProperty : null;


// EXPORTS //

module.exports = main;

},{}],2:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test for `Object.defineProperty` support.
*
* @module @stdlib/assert/has-define-property-support
*
* @example
* var hasDefinePropertySupport = require( '@stdlib/assert/has-define-property-support' );
*
* var bool = hasDefinePropertySupport();
* // returns <boolean>
*/

// MODULES //

var hasDefinePropertySupport = require( './main.js' );


// EXPORTS //

module.exports = hasDefinePropertySupport;

},{"./main.js":3}],3:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var defineProperty = require( './define_property.js' );


// MAIN //

/**
* Tests for `Object.defineProperty` support.
*
* @returns {boolean} boolean indicating if an environment has `Object.defineProperty` support
*
* @example
* var bool = hasDefinePropertySupport();
* // returns <boolean>
*/
function hasDefinePropertySupport() {
	var bool;

	if ( typeof defineProperty !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		defineProperty( {}, 'x', {} );
		bool = true;
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasDefinePropertySupport;

},{"./define_property.js":1}],4:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

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

var hasOwnProp = require( './main.js' );


// EXPORTS //

module.exports = hasOwnProp;

},{"./main.js":5}],5:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

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

},{}],6:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

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

var hasProp = require( './main.js' );


// EXPORTS //

module.exports = hasProp;

},{"./main.js":7}],7:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

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
	if ( value === void 0 || value === null ) {
		return false;
	}
	if ( typeof property === 'symbol' ) {
		return property in Object( value );
	}
	return ( String( property ) in Object( value ) );
}


// EXPORTS //

module.exports = hasProp;

},{}],8:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test for native `Symbol` support.
*
* @module @stdlib/assert/has-symbol-support
*
* @example
* var hasSymbolSupport = require( '@stdlib/assert/has-symbol-support' );
*
* var bool = hasSymbolSupport();
* // returns <boolean>
*/

// MODULES //

var hasSymbolSupport = require( './main.js' );


// EXPORTS //

module.exports = hasSymbolSupport;

},{"./main.js":9}],9:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

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

},{}],10:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test for native `toStringTag` support.
*
* @module @stdlib/assert/has-tostringtag-support
*
* @example
* var hasToStringTagSupport = require( '@stdlib/assert/has-tostringtag-support' );
*
* var bool = hasToStringTagSupport();
* // returns <boolean>
*/

// MODULES //

var hasToStringTagSupport = require( './main.js' );


// EXPORTS //

module.exports = hasToStringTagSupport;

},{"./main.js":11}],11:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var hasSymbols = require( '@stdlib/assert/has-symbol-support' );


// VARIABLES //

var FLG = hasSymbols();


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
	return ( FLG && typeof Symbol.toStringTag === 'symbol' );
}


// EXPORTS //

module.exports = hasToStringTagSupport;

},{"@stdlib/assert/has-symbol-support":8}],12:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

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

var isArray = require( './main.js' );


// EXPORTS //

module.exports = isArray;

},{"./main.js":13}],13:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );


// VARIABLES //

var f;


// FUNCTIONS //

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


// MAIN //

if ( Array.isArray ) {
	f = Array.isArray;
} else {
	f = isArray;
}


// EXPORTS //

module.exports = f;

},{"@stdlib/utils/native-class":75}],14:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

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

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var isInteger = require( './main.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isInteger, 'isPrimitive', isPrimitive );
setReadOnly( isInteger, 'isObject', isObject );


// EXPORTS //

module.exports = isInteger;

},{"./main.js":16,"./object.js":17,"./primitive.js":18,"@stdlib/utils/define-nonenumerable-read-only-property":70}],15:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

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

},{"@stdlib/constants/math/float64-ninf":39,"@stdlib/constants/math/float64-pinf":40,"@stdlib/math/base/assert/is-integer":41}],16:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

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

},{"./object.js":17,"./primitive.js":18}],17:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

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

},{"./integer.js":15,"@stdlib/assert/is-number":23}],18:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

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

},{"./integer.js":15,"@stdlib/assert/is-number":23}],19:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is a nonnegative integer.
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
* var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
*
* var bool = isNonNegativeInteger( 3.0 );
* // returns true
*
* bool = isNonNegativeInteger( new Number( 3.0 ) );
* // returns false
*
* @example
* var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isObject;
*
* var bool = isNonNegativeInteger( 3.0 );
* // returns false
*
* bool = isNonNegativeInteger( new Number( 3.0 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var isNonNegativeInteger = require( './main.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isNonNegativeInteger, 'isPrimitive', isPrimitive );
setReadOnly( isNonNegativeInteger, 'isObject', isObject );


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"./main.js":20,"./object.js":21,"./primitive.js":22,"@stdlib/utils/define-nonenumerable-read-only-property":70}],20:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

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

},{"./object.js":21,"./primitive.js":22}],21:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

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

},{"@stdlib/assert/is-integer":14}],22:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

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

},{"@stdlib/assert/is-integer":14}],23:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

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
* var isNumber = require( '@stdlib/assert/is-number' ).isObject;
*
* var bool = isNumber( 3.14 );
* // returns false
*
* bool = isNumber( new Number( 3.14 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var isNumber = require( './main.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isNumber, 'isPrimitive', isPrimitive );
setReadOnly( isNumber, 'isObject', isObject );


// EXPORTS //

module.exports = isNumber;

},{"./main.js":24,"./object.js":25,"./primitive.js":26,"@stdlib/utils/define-nonenumerable-read-only-property":70}],24:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

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
* var bool = isNumber( new Number( 3.14 ) );
* // returns true
*
* @example
* var bool = isNumber( NaN );
* // returns true
*
* @example
* var bool = isNumber( null );
* // returns false
*/
function isNumber( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
}


// EXPORTS //

module.exports = isNumber;

},{"./object.js":25,"./primitive.js":26}],25:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var hasToStringTag = require( '@stdlib/assert/has-tostringtag-support' );
var nativeClass = require( '@stdlib/utils/native-class' );
var Number = require( '@stdlib/number/ctor' );
var test = require( './try2serialize.js' );


// VARIABLES //

var FLG = hasToStringTag();


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
		if ( value instanceof Number ) {
			return true;
		}
		if ( FLG ) {
			return test( value );
		}
		return ( nativeClass( value ) === '[object Number]' );
	}
	return false;
}


// EXPORTS //

module.exports = isNumber;

},{"./try2serialize.js":28,"@stdlib/assert/has-tostringtag-support":10,"@stdlib/number/ctor":53,"@stdlib/utils/native-class":75}],26:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

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

},{}],27:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var Number = require( '@stdlib/number/ctor' );


// MAIN //

// eslint-disable-next-line stdlib/no-redeclare
var toString = Number.prototype.toString; // non-generic


// EXPORTS //

module.exports = toString;

},{"@stdlib/number/ctor":53}],28:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

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

},{"./tostring.js":27}],29:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

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

var isObject = require( './main.js' );


// EXPORTS //

module.exports = isObject;

},{"./main.js":30}],30:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isArray = require( '@stdlib/assert/is-array' );


// MAIN //

/**
* Tests if a value is an object; e.g., `{}`.
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

},{"@stdlib/assert/is-array":12}],31:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

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

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var isString = require( './main.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isString, 'isPrimitive', isPrimitive );
setReadOnly( isString, 'isObject', isObject );


// EXPORTS //

module.exports = isString;

},{"./main.js":32,"./object.js":33,"./primitive.js":34,"@stdlib/utils/define-nonenumerable-read-only-property":70}],32:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

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

},{"./object.js":33,"./primitive.js":34}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var hasToStringTag = require( '@stdlib/assert/has-tostringtag-support' );
var nativeClass = require( '@stdlib/utils/native-class' );
var test = require( './try2valueof.js' );


// VARIABLES //

var FLG = hasToStringTag();


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
		if ( value instanceof String ) {
			return true;
		}
		if ( FLG ) {
			return test( value );
		}
		return ( nativeClass( value ) === '[object String]' );
	}
	return false;
}


// EXPORTS //

module.exports = isString;

},{"./try2valueof.js":35,"@stdlib/assert/has-tostringtag-support":10,"@stdlib/utils/native-class":75}],34:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

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

},{}],35:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

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

},{"./valueof.js":36}],36:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// eslint-disable-next-line stdlib/no-redeclare
var valueOf = String.prototype.valueOf; // non-generic


// EXPORTS //

module.exports = valueOf;

},{}],37:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

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

},{}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Maximum safe double-precision floating-point integer.
*
* @module @stdlib/constants/math/float64-max-safe-integer
* @type {number}
*
* @example
* var FLOAT64_MAX_SAFE_INTEGER = require( '@stdlib/constants/math/float64-max-safe-integer' );
* // returns 9007199254740991
*/


// MAIN //

/**
* Maximum safe double-precision floating-point integer.
*
* ## Notes
*
* The integer has the value
*
* ```tex
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

},{}],39:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

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

// MODULES //

var Number = require( '@stdlib/number/ctor' );


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

},{"@stdlib/number/ctor":53}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

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
var FLOAT64_PINF = Number.POSITIVE_INFINITY; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = FLOAT64_PINF;

},{}],41:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

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

},{"./is_integer.js":42}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

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

},{"@stdlib/math/base/special/floor":52}],43:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

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

},{"./is_nan.js":44}],44:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

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

},{}],45:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

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

},{"./is_negative_zero.js":46}],46:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

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

},{"@stdlib/constants/math/float64-ninf":39}],47:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

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

},{}],48:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

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

},{"./abs.js":47}],49:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

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
var ceil = Math.ceil; // eslint-disable-line stdlib/no-builtin-math


// EXPORTS //

module.exports = ceil;

},{}],50:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

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

},{"./ceil.js":49}],51:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

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
var floor = Math.floor; // eslint-disable-line stdlib/no-builtin-math


// EXPORTS //

module.exports = floor;

},{}],52:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

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

},{"./floor.js":51}],53:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Constructor which returns a `Number` object.
*
* @module @stdlib/number/ctor
*
* @example
* var Number = require( '@stdlib/number/ctor' );
*
* var v = new Number( 10.0 );
* // returns <Number>
*/

// MODULES //

var Number = require( './number.js' );


// EXPORTS //

module.exports = Number;

},{"./number.js":54}],54:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// EXPORTS //

module.exports = Number; // eslint-disable-line stdlib/require-globals

},{}],55:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var floor = require( '@stdlib/math/base/special/floor' );


// MAIN //

/**
* Converts a nonnegative integer to a literal bit representation using the divide-by-2 algorithm.
*
* @private
* @param {number} x - nonnegative integer
* @returns {BinaryString} bit representation
*
* @example
* var v = div2( 3 );
* // returns '11'
*
* @example
* var v = div2( 0 );
* // returns ''
*
* @example
* var v = div2( 12 );
* // returns '1100'
*
* @example
* var v = div2( 188 );
* // returns '10111100'
*/
function div2( x ) {
	var str = '';
	var y;

	// We repeatedly divide by 2 and check for a remainder. If a remainder exists, the number is odd and we add a '1' bit...
	while ( x > 0 ) {
		y = x / 2;
		x = floor( y );
		if ( y === x ) {
			str = '0' + str;
		} else {
			str = '1' + str;
		}
	}
	return str;
}


// EXPORTS //

module.exports = div2;

},{"@stdlib/math/base/special/floor":52}],56:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Return a string giving the literal bit representation of a double-precision floating-point number.
*
* @module @stdlib/number/float64/base/to-binary-string
*
* @example
* var toBinaryString = require( '@stdlib/number/float64/base/to-binary-string' );
*
* var str = toBinaryString( 4.0 );
* // returns '0100000000010000000000000000000000000000000000000000000000000000'
*
* str = toBinaryString( 3.141592653589793 );
* // returns '0100000000001001001000011111101101010100010001000010110100011000'
*
* str = toBinaryString( -1.0e308 );
* // returns '1111111111100001110011001111001110000101111010111100100010100000'
*
* str = toBinaryString( -3.14e-320 );
* // returns '1000000000000000000000000000000000000000000000000001100011010011'
*
* str = toBinaryString( 5.0e-324 );
* // returns '0000000000000000000000000000000000000000000000000000000000000001'
*
* str = toBinaryString( 0.0 );
* // returns '0000000000000000000000000000000000000000000000000000000000000000'
*
* str = toBinaryString( -0.0 );
* // returns '1000000000000000000000000000000000000000000000000000000000000000'
*
* str = toBinaryString( NaN );
* // returns '0111111111111000000000000000000000000000000000000000000000000000'
*
* str = toBinaryString( Infinity );
* // returns '0111111111110000000000000000000000000000000000000000000000000000'
*
* str = toBinaryString( -Infinity );
* // returns '1111111111110000000000000000000000000000000000000000000000000000'
*/

// MODULES //

var toBinaryString = require( './main.js' );


// EXPORTS //

module.exports = toBinaryString;

},{"./main.js":57}],57:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var BIAS = require( '@stdlib/constants/math/float64-exponent-bias' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
var abs = require( '@stdlib/math/base/special/abs' );
var floor = require( '@stdlib/math/base/special/floor' );
var rpad = require( '@stdlib/string/right-pad' );
var lpad = require( '@stdlib/string/left-pad' );
var repeat = require( '@stdlib/string/repeat' );
var div2 = require( './div2.js' );
var mult2 = require( './mult2.js' );


// VARIABLES //

// TODO: consider moving to external constants
var NUM_EXPONENT_BITS = 11;
var NUM_SIGNIFICAND_BITS = 52;


// MAIN //

/**
* Returns a string giving the literal bit representation of a double-precision floating-point number.
*
* @param {number} x - input value
* @returns {BinaryString} bit representation
*
* @example
* var str = toBinaryString( 4.0 );
* // returns '0100000000010000000000000000000000000000000000000000000000000000'
*
* @example
* var str = toBinaryString( 3.141592653589793 );
* // returns '0100000000001001001000011111101101010100010001000010110100011000'
*
* @example
* var str = toBinaryString( -1.0e308 );
* // returns '1111111111100001110011001111001110000101111010111100100010100000'
*
* @example
* var str = toBinaryString( -3.14e-320 );
* // returns '1000000000000000000000000000000000000000000000000001100011010011'
*
* @example
* var str = toBinaryString( 5.0e-324 );
* // returns '0000000000000000000000000000000000000000000000000000000000000001'
*
* @example
* var str = toBinaryString( 0.0 );
* // returns '0000000000000000000000000000000000000000000000000000000000000000'
*
* @example
* var str = toBinaryString( -0.0 );
* // returns '1000000000000000000000000000000000000000000000000000000000000000'
*
* @example
* var str = toBinaryString( NaN );
* // returns '0111111111111000000000000000000000000000000000000000000000000000'
*
* @example
* var str = toBinaryString( Infinity );
* // returns '0111111111110000000000000000000000000000000000000000000000000000'
*
* @example
* var str = toBinaryString( -Infinity );
* // returns '1111111111110000000000000000000000000000000000000000000000000000'
*/
function toBinaryString( x ) {
	var nbits;
	var sign;
	var str;
	var exp;
	var n;
	var f;
	var i;

	// Check for a negative value or negative zero...
	if ( x < 0.0 || isNegativeZero( x ) ) {
		sign = '1';
	} else {
		sign = '0';
	}
	// Special case: +-infinity
	if ( x === PINF || x === NINF ) {
		// Based on IEEE 754-1985...
		exp = repeat( '1', NUM_EXPONENT_BITS ); // all 1s
		str = repeat( '0', NUM_SIGNIFICAND_BITS ); // all 0s
		return sign + exp + str;
	}
	// Special case: NaN
	if ( isnan( x ) ) {
		// Based on IEEE 754-1985...
		exp = repeat( '1', NUM_EXPONENT_BITS ); // all 1s
		str = '1' + repeat( '0', NUM_SIGNIFICAND_BITS-1 ); // can't be all 0s
		return sign + exp + str;
	}
	// Special case: +-0
	if ( x === 0 ) {
		// Based on IEEE 754-1985...
		exp = repeat( '0', NUM_EXPONENT_BITS ); // all 0s
		str = repeat( '0', NUM_SIGNIFICAND_BITS ); // all 0s
		return sign + exp + str;
	}
	x = abs( x );

	// Isolate the integer part (digits before the decimal):
	n = floor( x );

	// Isolate the fractional part (digits after the decimal):
	f = x - n;

	// Convert the integer and fractional parts to bit strings:
	n = div2( n );
	f = mult2( f );

	// Determine the exponent needed to normalize the integer+fractional parts...
	if ( n ) {
		// Move the decimal `d` digits to the left:
		exp = n.length - 1;
	} else {
		// Find the first '1' bit...
		for ( i = 0; i < f.length; i++ ) {
			if ( f[ i ] === '1' ) {
				nbits = i + 1;
				break;
			}
		}
		// Move the decimal `d` digits to the right:
		exp = -nbits;
	}
	// Normalize the combined integer+fractional string...
	str = n + f;
	if ( exp < 0 ) {
		// Handle subnormals...
		if ( exp <= -BIAS ) {
			// Cap the number of bits removed:
			nbits = BIAS - 1;
		}
		// Remove all leading zeros and the first '1' for normal values, and, for subnormals, remove at most BIAS-1 leading bits:
		str = str.substring( nbits );
	} else {
		// Remove the leading '1' (implicit/hidden bit):
		str = str.substring( 1 );
	}
	// Convert the exponent to a bit string:
	exp = div2( exp + BIAS );
	exp = lpad( exp, NUM_EXPONENT_BITS, '0' );

	// Fill in any trailing zeros and ensure we have only 52 fraction bits:
	str = rpad( str, NUM_SIGNIFICAND_BITS, '0' ).substring( 0, NUM_SIGNIFICAND_BITS );

	// Return a bit representation:
	return sign + exp + str;
}


// EXPORTS //

module.exports = toBinaryString;

},{"./div2.js":55,"./mult2.js":58,"@stdlib/constants/math/float64-exponent-bias":37,"@stdlib/constants/math/float64-ninf":39,"@stdlib/constants/math/float64-pinf":40,"@stdlib/math/base/assert/is-nan":43,"@stdlib/math/base/assert/is-negative-zero":45,"@stdlib/math/base/special/abs":48,"@stdlib/math/base/special/floor":52,"@stdlib/string/left-pad":64,"@stdlib/string/repeat":66,"@stdlib/string/right-pad":68}],58:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// VARIABLES //

var MAX_ITER = 1075; // 1023+52 (subnormals) => BIAS+NUM_SIGNFICAND_BITS-1
var MAX_BITS = 54; // only 53 bits for fraction


// MAIN //

/**
* Converts a fraction to a literal bit representation using the multiply-by-2 algorithm.
*
* @private
* @param {number} x - number less than 1
* @returns {BinaryString} bit representation
*
* @example
* var v = mult2( 0.234375 );
* // returns '001111'
*
* @example
* var v = mult2( 0.0 );
* // returns ''
*/
function mult2( x ) {
	var str;
	var y;
	var i;
	var j;

	str = '';
	if ( x === 0.0 ) {
		return str;
	}
	j = MAX_ITER;

	// Each time we multiply by 2 and find a ones digit, add a '1'; otherwise, add a '0'..
	for ( i = 0; i < MAX_ITER; i++ ) {
		y = x * 2.0;
		if ( y >= 1.0 ) {
			x = y - 1.0;
			str += '1';
			if ( j === MAX_ITER ) {
				j = i; // first '1'
			}
		} else {
			x = y;
			str += '0';
		}
		// Stop when we have no more decimals to process or in the event we found a fraction which cannot be represented in a finite number of bits...
		if ( y === 1.0 || i-j > MAX_BITS ) {
			break;
		}
	}
	return str;
}


// EXPORTS //

module.exports = mult2;

},{}],59:[function(require,module,exports){
module.exports={"expected":["1100000010001111010000000000000000000000000000000000000000000000","1100000010001111001100000001100001101101111011101011001000100010","1100000010001111001000000011000011011011110111010110010001000011","1100000010001111000100000100100101001001110011000001011001100101","1100000010001111000000000110000110110111101110101100100010000110","1100000010001110111100000111101000100101101010010111101010101000","1100000010001110111000001001001010010011100110000010110011001010","1100000010001110110100001010101100000001100001101101111011101011","1100000010001110110000001100001101101111011101011001000100001101","1100000010001110101100001101101111011101011001000100001100101110","1100000010001110101000001111010001001011010100101111010101010000","1100000010001110100100010000110010111001010000011010011101110001","1100000010001110100000010010010100100111001100000101100110010011","1100000010001110011100010011110110010101000111110000101110110101","1100000010001110011000010101011000000011000011011011110111010110","1100000010001110010100010110111001110000111111000110111111111000","1100000010001110010000011000011011011110111010110010001000011001","1100000010001110001100011001111101001100110110011101010000111011","1100000010001110001000011011011110111010110010001000011001011101","1100000010001110000100011101000000101000101101110011100001111110","1100000010001110000000011110100010010110101001011110101010100000","1100000010001101111100100000000100000100100101001001110011000001","1100000010001101111000100001100101110010100000110100111011100011","1100000010001101110100100011000111100000011100100000000100000101","1100000010001101110000100100101001001110011000001011001100100110","1100000010001101101100100110001010111100010011110110010101001000","1100000010001101101000100111101100101010001111100001011101101001","1100000010001101100100101001001110011000001011001100100110001011","1100000010001101100000101010110000000110000110110111101110101101","1100000010001101011100101100010001110100000010100010110111001110","1100000010001101011000101101110011100001111110001101111111110000","1100000010001101010100101111010101001111111001111001001000010001","1100000010001101010000110000110110111101110101100100010000110011","1100000010001101001100110010011000101011110001001111011001010100","1100000010001101001000110011111010011001101100111010100001110110","1100000010001101000100110101011100000111101000100101101010011000","1100000010001101000000110110111101110101100100010000110010111001","1100000010001100111100111000011111100011011111111011111011011011","1100000010001100111000111010000001010001011011100111000011111100","1100000010001100110100111011100010111111010111010010001100011110","1100000010001100110000111101000100101101010010111101010101000000","1100000010001100101100111110100110011011001110101000011101100001","1100000010001100101001000000001000001001001010010011100110000011","1100000010001100100101000001101001110111000101111110101110100100","1100000010001100100001000011001011100101000001101001110111000110","1100000010001100011101000100101101010010111101010100111111101000","1100000010001100011001000110001111000000111001000000001000001001","1100000010001100010101000111110000101110110100101011010000101011","1100000010001100010001001001010010011100110000010110011001001100","1100000010001100001101001010110100001010101100000001100001101110","1100000010001100001001001100010101111000100111101100101010010000","1100000010001100000101001101110111100110100011010111110010110001","1100000010001100000001001111011001010100011111000010111011010011","1100000010001011111101010000111011000010011010101110000011110100","1100000010001011111001010010011100110000010110011001001100010110","1100000010001011110101010011111110011110010010000100010100110111","1100000010001011110001010101100000001100001101101111011101011001","1100000010001011101101010111000001111010001001011010100101111011","1100000010001011101001011000100011101000000101000101101110011100","1100000010001011100101011010000101010110000000110000110110111110","1100000010001011100001011011100111000011111100011011111111011111","1100000010001011011101011101001000110001111000000111001000000001","1100000010001011011001011110101010011111110011110010010000100011","1100000010001011010101100000001100001101101111011101011001000100","1100000010001011010001100001101101111011101011001000100001100110","1100000010001011001101100011001111101001100110110011101010000111","1100000010001011001001100100110001010111100010011110110010101001","1100000010001011000101100110010011000101011110001001111011001011","1100000010001011000001100111110100110011011001110101000011101100","1100000010001010111101101001010110100001010101100000001100001110","1100000010001010111001101010111000001111010001001011010100101111","1100000010001010110101101100011001111101001100110110011101010001","1100000010001010110001101101111011101011001000100001100101110011","1100000010001010101101101111011101011001000100001100101110010100","1100000010001010101001110000111111000110111111110111110110110110","1100000010001010100101110010100000110100111011100010111111010111","1100000010001010100001110100000010100010110111001110000111111001","1100000010001010011101110101100100010000110010111001010000011010","1100000010001010011001110111000101111110101110100100011000111100","1100000010001010010101111000100111101100101010001111100001011110","1100000010001010010001111010001001011010100101111010101001111111","1100000010001010001101111011101011001000100001100101110010100001","1100000010001010001001111101001100110110011101010000111011000010","1100000010001010000101111110101110100100011000111100000011100100","1100000010001010000010000000010000010010010100100111001100000110","1100000010001001111110000001110010000000010000010010010100100111","1100000010001001111010000011010011101110001011111101011101001001","1100000010001001110110000100110101011100000111101000100101101010","1100000010001001110010000110010111001010000011010011101110001100","1100000010001001101110000111111000110111111110111110110110101110","1100000010001001101010001001011010100101111010101001111111001111","1100000010001001100110001010111100010011110110010101000111110001","1100000010001001100010001100011110000001110010000000010000010010","1100000010001001011110001101111111101111101101101011011000110100","1100000010001001011010001111100001011101101001010110100001010110","1100000010001001010110010001000011001011100101000001101001110111","1100000010001001010010010010100100111001100000101100110010011001","1100000010001001001110010100000110100111011100010111111010111010","1100000010001001001010010101101000010101011000000011000011011100","1100000010001001000110010111001010000011010011101110001011111101","1100000010001001000010011000101011110001001111011001010100011111","1100000010001000111110011010001101011111001011000100011101000001","1100000010001000111010011011101111001101000110101111100101100010","1100000010001000110110011101010000111011000010011010101110000100","1100000010001000110010011110110010101000111110000101110110100101","1100000010001000101110100000010100010110111001110000111111000111","1100000010001000101010100001110110000100110101011100000111101001","1100000010001000100110100011010111110010110001000111010000001010","1100000010001000100010100100111001100000101100110010011000101100","1100000010001000011110100110011011001110101000011101100001001101","1100000010001000011010100111111100111100100100001000101001101111","1100000010001000010110101001011110101010011111110011110010010001","1100000010001000010010101011000000011000011011011110111010110010","1100000010001000001110101100100010000110010111001010000011010100","1100000010001000001010101110000011110100010010110101001011110101","1100000010001000000110101111100101100010001110100000010100010111","1100000010001000000010110001000111010000001010001011011100111000","1100000010000111111110110010101000111110000101110110100101011010","1100000010000111111010110100001010101100000001100001101101111100","1100000010000111110110110101101100011001111101001100110110011101","1100000010000111110010110111001110000111111000110111111110111111","1100000010000111101110111000101111110101110100100011000111100000","1100000010000111101010111010010001100011110000001110010000000010","1100000010000111100110111011110011010001101011111001011000100100","1100000010000111100010111101010100111111100111100100100001000101","1100000010000111011110111110110110101101100011001111101001100111","1100000010000111011011000000011000011011011110111010110010001000","1100000010000111010111000001111010001001011010100101111010101010","1100000010000111010011000011011011110111010110010001000011001100","1100000010000111001111000100111101100101010001111100001011101101","1100000010000111001011000110011111010011001101100111010100001111","1100000010000111000111001000000001000001001001010010011100110000","1100000010000111000011001001100010101111000100111101100101010010","1100000010000110111111001011000100011101000000101000101101110100","1100000010000110111011001100100110001010111100010011110110010101","1100000010000110110111001110000111111000110111111110111110110111","1100000010000110110011001111101001100110110011101010000111011000","1100000010000110101111010001001011010100101111010101001111111010","1100000010000110101011010010101101000010101011000000011000011011","1100000010000110100111010100001110110000100110101011100000111101","1100000010000110100011010101110000011110100010010110101001011111","1100000010000110011111010111010010001100011110000001110010000000","1100000010000110011011011000110011111010011001101100111010100010","1100000010000110010111011010010101101000010101011000000011000011","1100000010000110010011011011110111010110010001000011001011100101","1100000010000110001111011101011001000100001100101110010100000111","1100000010000110001011011110111010110010001000011001011100101000","1100000010000110000111100000011100100000000100000100100101001010","1100000010000110000011100001111110001101111111101111101101101011","1100000010000101111111100011011111111011111011011010110110001101","1100000010000101111011100101000001101001110111000101111110101111","1100000010000101110111100110100011010111110010110001000111010000","1100000010000101110011101000000101000101101110011100001111110010","1100000010000101101111101001100110110011101010000111011000010011","1100000010000101101011101011001000100001100101110010100000110101","1100000010000101100111101100101010001111100001011101101001010111","1100000010000101100011101110001011111101011101001000110001111000","1100000010000101011111101111101101101011011000110011111010011010","1100000010000101011011110001001111011001010100011111000010111011","1100000010000101010111110010110001000111010000001010001011011101","1100000010000101010011110100010010110101001011110101010011111110","1100000010000101001111110101110100100011000111100000011100100000","1100000010000101001011110111010110010001000011001011100101000010","1100000010000101000111111000110111111110111110110110101101100011","1100000010000101000011111010011001101100111010100001110110000101","1100000010000100111111111011111011011010110110001100111110100110","1100000010000100111011111101011101001000110001111000000111001000","1100000010000100110111111110111110110110101101100011001111101010","1100000010000100110100000000100000100100101001001110011000001011","1100000010000100110000000010000010010010100100111001100000101101","1100000010000100101100000011100100000000100000100100101001001110","1100000010000100101000000101000101101110011100001111110001110000","1100000010000100100100000110100111011100010111111010111010010010","1100000010000100100000001000001001001010010011100110000010110011","1100000010000100011100001001101010111000001111010001001011010101","1100000010000100011000001011001100100110001010111100010011110110","1100000010000100010100001100101110010100000110100111011100011000","1100000010000100010000001110010000000010000010010010100100111010","1100000010000100001100001111110001101111111101111101101101011011","1100000010000100001000010001010011011101111001101000110101111101","1100000010000100000100010010110101001011110101010011111110011110","1100000010000100000000010100010110111001110000111111000111000000","1100000010000011111100010101111000100111101100101010001111100001","1100000010000011111000010111011010010101101000010101011000000011","1100000010000011110100011000111100000011100100000000100000100101","1100000010000011110000011010011101110001011111101011101001000110","1100000010000011101100011011111111011111011011010110110001101000","1100000010000011101000011101100001001101010111000001111010001001","1100000010000011100100011111000010111011010010101101000010101011","1100000010000011100000100000100100101001001110011000001011001101","1100000010000011011100100010000110010111001010000011010011101110","1100000010000011011000100011101000000101000101101110011100010000","1100000010000011010100100101001001110011000001011001100100110001","1100000010000011010000100110101011100000111101000100101101010011","1100000010000011001100101000001101001110111000101111110101110101","1100000010000011001000101001101110111100110100011010111110010110","1100000010000011000100101011010000101010110000000110000110111000","1100000010000011000000101100110010011000101011110001001111011001","1100000010000010111100101110010100000110100111011100010111111011","1100000010000010111000101111110101110100100011000111100000011101","1100000010000010110100110001010111100010011110110010101000111110","1100000010000010110000110010111001010000011010011101110001100000","1100000010000010101100110100011010111110010110001000111010000001","1100000010000010101000110101111100101100010001110100000010100011","1100000010000010100100110111011110011010001101011111001011000100","1100000010000010100000111001000000001000001001001010010011100110","1100000010000010011100111010100001110110000100110101011100001000","1100000010000010011000111100000011100100000000100000100100101001","1100000010000010010100111101100101010001111100001011101101001011","1100000010000010010000111111000110111111110111110110110101101100","1100000010000010001101000000101000101101110011100001111110001110","1100000010000010001001000010001010011011101111001101000110110000","1100000010000010000101000011101100001001101010111000001111010001","1100000010000010000001000101001101110111100110100011010111110011","1100000010000001111101000110101111100101100010001110100000010100","1100000010000001111001001000010001010011011101111001101000110110","1100000010000001110101001001110011000001011001100100110001011000","1100000010000001110001001011010100101111010101001111111001111001","1100000010000001101101001100110110011101010000111011000010011011","1100000010000001101001001110011000001011001100100110001010111100","1100000010000001100101001111111001111001001000010001010011011110","1100000010000001100001010001011011100111000011111100011011111111","1100000010000001011101010010111101010100111111100111100100100001","1100000010000001011001010100011111000010111011010010101101000011","1100000010000001010101010110000000110000110110111101110101100100","1100000010000001010001010111100010011110110010101000111110000110","1100000010000001001101011001000100001100101110010100000110100111","1100000010000001001001011010100101111010101001111111001111001001","1100000010000001000101011100000111101000100101101010010111101011","1100000010000001000001011101101001010110100001010101100000001100","1100000010000000111101011111001011000100011101000000101000101110","1100000010000000111001100000101100110010011000101011110001001111","1100000010000000110101100010001110100000010100010110111001110001","1100000010000000110001100011110000001110010000000010000010010011","1100000010000000101101100101010001111100001011101101001010110100","1100000010000000101001100110110011101010000111011000010011010110","1100000010000000100101101000010101011000000011000011011011110111","1100000010000000100001101001110111000101111110101110100100011001","1100000010000000011101101011011000110011111010011001101100111011","1100000010000000011001101100111010100001110110000100110101011100","1100000010000000010101101110011100001111110001101111111101111110","1100000010000000010001101111111101111101101101011011000110011111","1100000010000000001101110001011111101011101001000110001111000001","1100000010000000001001110011000001011001100100110001010111100010","1100000010000000000101110100100011000111100000011100100000000100","1100000010000000000001110110000100110101011100000111101000100110","1100000001111111111011101111001101000110101111100101100010001111","1100000001111111110011110010010000100010100110111011110011010010","1100000001111111101011110101010011111110011110010010000100010101","1100000001111111100011111000010111011010010101101000010101011000","1100000001111111011011111011011010110110001100111110100110011011","1100000001111111010011111110011110010010000100010100110111011110","1100000001111111001100000001100001101101111011101011001000100010","1100000001111111000100000100100101001001110011000001011001100101","1100000001111110111100000111101000100101101010010111101010101000","1100000001111110110100001010101100000001100001101101111011101011","1100000001111110101100001101101111011101011001000100001100101110","1100000001111110100100010000110010111001010000011010011101110001","1100000001111110011100010011110110010101000111110000101110110101","1100000001111110010100010110111001110000111111000110111111111000","1100000001111110001100011001111101001100110110011101010000111011","1100000001111110000100011101000000101000101101110011100001111110","1100000001111101111100100000000100000100100101001001110011000001","1100000001111101110100100011000111100000011100100000000100000101","1100000001111101101100100110001010111100010011110110010101001000","1100000001111101100100101001001110011000001011001100100110001011","1100000001111101011100101100010001110100000010100010110111001110","1100000001111101010100101111010101001111111001111001001000010001","1100000001111101001100110010011000101011110001001111011001010100","1100000001111101000100110101011100000111101000100101101010011000","1100000001111100111100111000011111100011011111111011111011011011","1100000001111100110100111011100010111111010111010010001100011110","1100000001111100101100111110100110011011001110101000011101100001","1100000001111100100101000001101001110111000101111110101110100100","1100000001111100011101000100101101010010111101010100111111101000","1100000001111100010101000111110000101110110100101011010000101011","1100000001111100001101001010110100001010101100000001100001101110","1100000001111100000101001101110111100110100011010111110010110001","1100000001111011111101010000111011000010011010101110000011110100","1100000001111011110101010011111110011110010010000100010100110111","1100000001111011101101010111000001111010001001011010100101111011","1100000001111011100101011010000101010110000000110000110110111110","1100000001111011011101011101001000110001111000000111001000000001","1100000001111011010101100000001100001101101111011101011001000100","1100000001111011001101100011001111101001100110110011101010000111","1100000001111011000101100110010011000101011110001001111011001011","1100000001111010111101101001010110100001010101100000001100001110","1100000001111010110101101100011001111101001100110110011101010001","1100000001111010101101101111011101011001000100001100101110010100","1100000001111010100101110010100000110100111011100010111111010111","1100000001111010011101110101100100010000110010111001010000011010","1100000001111010010101111000100111101100101010001111100001011110","1100000001111010001101111011101011001000100001100101110010100001","1100000001111010000101111110101110100100011000111100000011100100","1100000001111001111110000001110010000000010000010010010100100111","1100000001111001110110000100110101011100000111101000100101101010","1100000001111001101110000111111000110111111110111110110110101110","1100000001111001100110001010111100010011110110010101000111110001","1100000001111001011110001101111111101111101101101011011000110100","1100000001111001010110010001000011001011100101000001101001110111","1100000001111001001110010100000110100111011100010111111010111010","1100000001111001000110010111001010000011010011101110001011111101","1100000001111000111110011010001101011111001011000100011101000001","1100000001111000110110011101010000111011000010011010101110000100","1100000001111000101110100000010100010110111001110000111111000111","1100000001111000100110100011010111110010110001000111010000001010","1100000001111000011110100110011011001110101000011101100001001101","1100000001111000010110101001011110101010011111110011110010010001","1100000001111000001110101100100010000110010111001010000011010100","1100000001111000000110101111100101100010001110100000010100010111","1100000001110111111110110010101000111110000101110110100101011010","1100000001110111110110110101101100011001111101001100110110011101","1100000001110111101110111000101111110101110100100011000111100000","1100000001110111100110111011110011010001101011111001011000100100","1100000001110111011110111110110110101101100011001111101001100111","1100000001110111010111000001111010001001011010100101111010101010","1100000001110111001111000100111101100101010001111100001011101101","1100000001110111000111001000000001000001001001010010011100110000","1100000001110110111111001011000100011101000000101000101101110100","1100000001110110110111001110000111111000110111111110111110110111","1100000001110110101111010001001011010100101111010101001111111010","1100000001110110100111010100001110110000100110101011100000111101","1100000001110110011111010111010010001100011110000001110010000000","1100000001110110010111011010010101101000010101011000000011000011","1100000001110110001111011101011001000100001100101110010100000111","1100000001110110000111100000011100100000000100000100100101001010","1100000001110101111111100011011111111011111011011010110110001101","1100000001110101110111100110100011010111110010110001000111010000","1100000001110101101111101001100110110011101010000111011000010011","1100000001110101100111101100101010001111100001011101101001010111","1100000001110101011111101111101101101011011000110011111010011010","1100000001110101010111110010110001000111010000001010001011011101","1100000001110101001111110101110100100011000111100000011100100000","1100000001110101000111111000110111111110111110110110101101100011","1100000001110100111111111011111011011010110110001100111110100110","1100000001110100110111111110111110110110101101100011001111101010","1100000001110100110000000010000010010010100100111001100000101101","1100000001110100101000000101000101101110011100001111110001110000","1100000001110100100000001000001001001010010011100110000010110011","1100000001110100011000001011001100100110001010111100010011110110","1100000001110100010000001110010000000010000010010010100100111010","1100000001110100001000010001010011011101111001101000110101111101","1100000001110100000000010100010110111001110000111111000111000000","1100000001110011111000010111011010010101101000010101011000000011","1100000001110011110000011010011101110001011111101011101001000110","1100000001110011101000011101100001001101010111000001111010001001","1100000001110011100000100000100100101001001110011000001011001101","1100000001110011011000100011101000000101000101101110011100010000","1100000001110011010000100110101011100000111101000100101101010011","1100000001110011001000101001101110111100110100011010111110010110","1100000001110011000000101100110010011000101011110001001111011001","1100000001110010111000101111110101110100100011000111100000011101","1100000001110010110000110010111001010000011010011101110001100000","1100000001110010101000110101111100101100010001110100000010100011","1100000001110010100000111001000000001000001001001010010011100110","1100000001110010011000111100000011100100000000100000100100101001","1100000001110010010000111111000110111111110111110110110101101100","1100000001110010001001000010001010011011101111001101000110110000","1100000001110010000001000101001101110111100110100011010111110011","1100000001110001111001001000010001010011011101111001101000110110","1100000001110001110001001011010100101111010101001111111001111001","1100000001110001101001001110011000001011001100100110001010111100","1100000001110001100001010001011011100111000011111100011011111111","1100000001110001011001010100011111000010111011010010101101000011","1100000001110001010001010111100010011110110010101000111110000110","1100000001110001001001011010100101111010101001111111001111001001","1100000001110001000001011101101001010110100001010101100000001100","1100000001110000111001100000101100110010011000101011110001001111","1100000001110000110001100011110000001110010000000010000010010011","1100000001110000101001100110110011101010000111011000010011010110","1100000001110000100001101001110111000101111110101110100100011001","1100000001110000011001101100111010100001110110000100110101011100","1100000001110000010001101111111101111101101101011011000110011111","1100000001110000001001110011000001011001100100110001010111100010","1100000001110000000001110110000100110101011100000111101000100110","1100000001101111110011110010010000100010100110111011110011010010","1100000001101111100011111000010111011010010101101000010101011000","1100000001101111010011111110011110010010000100010100110111011110","1100000001101111000100000100100101001001110011000001011001100101","1100000001101110110100001010101100000001100001101101111011101011","1100000001101110100100010000110010111001010000011010011101110001","1100000001101110010100010110111001110000111111000110111111111000","1100000001101110000100011101000000101000101101110011100001111110","1100000001101101110100100011000111100000011100100000000100000101","1100000001101101100100101001001110011000001011001100100110001011","1100000001101101010100101111010101001111111001111001001000010001","1100000001101101000100110101011100000111101000100101101010011000","1100000001101100110100111011100010111111010111010010001100011110","1100000001101100100101000001101001110111000101111110101110100100","1100000001101100010101000111110000101110110100101011010000101011","1100000001101100000101001101110111100110100011010111110010110001","1100000001101011110101010011111110011110010010000100010100110111","1100000001101011100101011010000101010110000000110000110110111110","1100000001101011010101100000001100001101101111011101011001000100","1100000001101011000101100110010011000101011110001001111011001011","1100000001101010110101101100011001111101001100110110011101010001","1100000001101010100101110010100000110100111011100010111111010111","1100000001101010010101111000100111101100101010001111100001011110","1100000001101010000101111110101110100100011000111100000011100100","1100000001101001110110000100110101011100000111101000100101101010","1100000001101001100110001010111100010011110110010101000111110001","1100000001101001010110010001000011001011100101000001101001110111","1100000001101001000110010111001010000011010011101110001011111101","1100000001101000110110011101010000111011000010011010101110000100","1100000001101000100110100011010111110010110001000111010000001010","1100000001101000010110101001011110101010011111110011110010010001","1100000001101000000110101111100101100010001110100000010100010111","1100000001100111110110110101101100011001111101001100110110011101","1100000001100111100110111011110011010001101011111001011000100100","1100000001100111010111000001111010001001011010100101111010101010","1100000001100111000111001000000001000001001001010010011100110000","1100000001100110110111001110000111111000110111111110111110110111","1100000001100110100111010100001110110000100110101011100000111101","1100000001100110010111011010010101101000010101011000000011000011","1100000001100110000111100000011100100000000100000100100101001010","1100000001100101110111100110100011010111110010110001000111010000","1100000001100101100111101100101010001111100001011101101001010111","1100000001100101010111110010110001000111010000001010001011011101","1100000001100101000111111000110111111110111110110110101101100011","1100000001100100110111111110111110110110101101100011001111101010","1100000001100100101000000101000101101110011100001111110001110000","1100000001100100011000001011001100100110001010111100010011110110","1100000001100100001000010001010011011101111001101000110101111101","1100000001100011111000010111011010010101101000010101011000000011","1100000001100011101000011101100001001101010111000001111010001001","1100000001100011011000100011101000000101000101101110011100010000","1100000001100011001000101001101110111100110100011010111110010110","1100000001100010111000101111110101110100100011000111100000011101","1100000001100010101000110101111100101100010001110100000010100011","1100000001100010011000111100000011100100000000100000100100101001","1100000001100010001001000010001010011011101111001101000110110000","1100000001100001111001001000010001010011011101111001101000110110","1100000001100001101001001110011000001011001100100110001010111100","1100000001100001011001010100011111000010111011010010101101000011","1100000001100001001001011010100101111010101001111111001111001001","1100000001100000111001100000101100110010011000101011110001001111","1100000001100000101001100110110011101010000111011000010011010110","1100000001100000011001101100111010100001110110000100110101011100","1100000001100000001001110011000001011001100100110001010111100010","1100000001011111110011110010010000100010100110111011110011010010","1100000001011111010011111110011110010010000100010100110111011110","1100000001011110110100001010101100000001100001101101111011101011","1100000001011110010100010110111001110000111111000110111111111000","1100000001011101110100100011000111100000011100100000000100000101","1100000001011101010100101111010101001111111001111001001000010001","1100000001011100110100111011100010111111010111010010001100011110","1100000001011100010101000111110000101110110100101011010000101011","1100000001011011110101010011111110011110010010000100010100110111","1100000001011011010101100000001100001101101111011101011001000100","1100000001011010110101101100011001111101001100110110011101010001","1100000001011010010101111000100111101100101010001111100001011110","1100000001011001110110000100110101011100000111101000100101101010","1100000001011001010110010001000011001011100101000001101001110111","1100000001011000110110011101010000111011000010011010101110000100","1100000001011000010110101001011110101010011111110011110010010001","1100000001010111110110110101101100011001111101001100110110011101","1100000001010111010111000001111010001001011010100101111010101010","1100000001010110110111001110000111111000110111111110111110110111","1100000001010110010111011010010101101000010101011000000011000011","1100000001010101110111100110100011010111110010110001000111010000","1100000001010101010111110010110001000111010000001010001011011101","1100000001010100110111111110111110110110101101100011001111101010","1100000001010100011000001011001100100110001010111100010011110110","1100000001010011111000010111011010010101101000010101011000000011","1100000001010011011000100011101000000101000101101110011100010000","1100000001010010111000101111110101110100100011000111100000011101","1100000001010010011000111100000011100100000000100000100100101001","1100000001010001111001001000010001010011011101111001101000110110","1100000001010001011001010100011111000010111011010010101101000011","1100000001010000111001100000101100110010011000101011110001001111","1100000001010000011001101100111010100001110110000100110101011100","1100000001001111110011110010010000100010100110111011110011010010","1100000001001110110100001010101100000001100001101101111011101011","1100000001001101110100100011000111100000011100100000000100000101","1100000001001100110100111011100010111111010111010010001100011110","1100000001001011110101010011111110011110010010000100010100110111","1100000001001010110101101100011001111101001100110110011101010001","1100000001001001110110000100110101011100000111101000100101101010","1100000001001000110110011101010000111011000010011010101110000100","1100000001000111110110110101101100011001111101001100110110011101","1100000001000110110111001110000111111000110111111110111110110111","1100000001000101110111100110100011010111110010110001000111010000","1100000001000100110111111110111110110110101101100011001111101010","1100000001000011111000010111011010010101101000010101011000000011","1100000001000010111000101111110101110100100011000111100000011101","1100000001000001111001001000010001010011011101111001101000110110","1100000001000000111001100000101100110010011000101011110001001111","1100000000111111110011110010010000100010100110111011110011010010","1100000000111101110100100011000111100000011100100000000100000101","1100000000111011110101010011111110011110010010000100010100110111","1100000000111001110110000100110101011100000111101000100101101010","1100000000110111110110110101101100011001111101001100110110011101","1100000000110101110111100110100011010111110010110001000111010000","1100000000110011111000010111011010010101101000010101011000000011","1100000000110001111001001000010001010011011101111001101000110110","1100000000101111110011110010010000100010100110111011110011010010","1100000000101011110101010011111110011110010010000100010100110111","1100000000100111110110110101101100011001111101001100110110011101","1100000000100011111000010111011010010101101000010101011000000011","1100000000011111110011110010010000100010100110111011110011010010","1100000000010111110110110101101100011001111101001100110110011101","1100000000001111110011110010010000100010100110111011110011010010","1011111111111111110011110010010000100010100110111011110011010010","0000000000000000000000000000000000000000000000000000000000000000","0011111111111111110011110010010000100010100110111011110011010010","0100000000001111110011110010010000100010100110111011110011010010","0100000000010111110110110101101100011001111101001100110110011101","0100000000011111110011110010010000100010100110111011110011010010","0100000000100011111000010111011010010101101000010101011000000011","0100000000100111110110110101101100011001111101001100110110011101","0100000000101011110101010011111110011110010010000100010100110111","0100000000101111110011110010010000100010100110111011110011010010","0100000000110001111001001000010001010011011101111001101000110110","0100000000110011111000010111011010010101101000010101011000000011","0100000000110101110111100110100011010111110010110001000111010000","0100000000110111110110110101101100011001111101001100110110011101","0100000000111001110110000100110101011100000111101000100101101010","0100000000111011110101010011111110011110010010000100010100110111","0100000000111101110100100011000111100000011100100000000100000101","0100000000111111110011110010010000100010100110111011110011010010","0100000001000000111001100000101100110010011000101011110001001111","0100000001000001111001001000010001010011011101111001101000110110","0100000001000010111000101111110101110100100011000111100000011101","0100000001000011111000010111011010010101101000010101011000000011","0100000001000100110111111110111110110110101101100011001111101010","0100000001000101110111100110100011010111110010110001000111010000","0100000001000110110111001110000111111000110111111110111110110111","0100000001000111110110110101101100011001111101001100110110011101","0100000001001000110110011101010000111011000010011010101110000100","0100000001001001110110000100110101011100000111101000100101101010","0100000001001010110101101100011001111101001100110110011101010001","0100000001001011110101010011111110011110010010000100010100110111","0100000001001100110100111011100010111111010111010010001100011110","0100000001001101110100100011000111100000011100100000000100000101","0100000001001110110100001010101100000001100001101101111011101011","0100000001001111110011110010010000100010100110111011110011010010","0100000001010000011001101100111010100001110110000100110101011100","0100000001010000111001100000101100110010011000101011110001001111","0100000001010001011001010100011111000010111011010010101101000011","0100000001010001111001001000010001010011011101111001101000110110","0100000001010010011000111100000011100100000000100000100100101001","0100000001010010111000101111110101110100100011000111100000011101","0100000001010011011000100011101000000101000101101110011100010000","0100000001010011111000010111011010010101101000010101011000000011","0100000001010100011000001011001100100110001010111100010011110110","0100000001010100110111111110111110110110101101100011001111101010","0100000001010101010111110010110001000111010000001010001011011101","0100000001010101110111100110100011010111110010110001000111010000","0100000001010110010111011010010101101000010101011000000011000011","0100000001010110110111001110000111111000110111111110111110110111","0100000001010111010111000001111010001001011010100101111010101010","0100000001010111110110110101101100011001111101001100110110011101","0100000001011000010110101001011110101010011111110011110010010001","0100000001011000110110011101010000111011000010011010101110000100","0100000001011001010110010001000011001011100101000001101001110111","0100000001011001110110000100110101011100000111101000100101101010","0100000001011010010101111000100111101100101010001111100001011110","0100000001011010110101101100011001111101001100110110011101010001","0100000001011011010101100000001100001101101111011101011001000100","0100000001011011110101010011111110011110010010000100010100110111","0100000001011100010101000111110000101110110100101011010000101011","0100000001011100110100111011100010111111010111010010001100011110","0100000001011101010100101111010101001111111001111001001000010001","0100000001011101110100100011000111100000011100100000000100000101","0100000001011110010100010110111001110000111111000110111111111000","0100000001011110110100001010101100000001100001101101111011101011","0100000001011111010011111110011110010010000100010100110111011110","0100000001011111110011110010010000100010100110111011110011010010","0100000001100000001001110011000001011001100100110001010111100010","0100000001100000011001101100111010100001110110000100110101011100","0100000001100000101001100110110011101010000111011000010011010110","0100000001100000111001100000101100110010011000101011110001001111","0100000001100001001001011010100101111010101001111111001111001001","0100000001100001011001010100011111000010111011010010101101000011","0100000001100001101001001110011000001011001100100110001010111100","0100000001100001111001001000010001010011011101111001101000110110","0100000001100010001001000010001010011011101111001101000110110000","0100000001100010011000111100000011100100000000100000100100101001","0100000001100010101000110101111100101100010001110100000010100011","0100000001100010111000101111110101110100100011000111100000011101","0100000001100011001000101001101110111100110100011010111110010110","0100000001100011011000100011101000000101000101101110011100010000","0100000001100011101000011101100001001101010111000001111010001001","0100000001100011111000010111011010010101101000010101011000000011","0100000001100100001000010001010011011101111001101000110101111101","0100000001100100011000001011001100100110001010111100010011110110","0100000001100100101000000101000101101110011100001111110001110000","0100000001100100110111111110111110110110101101100011001111101010","0100000001100101000111111000110111111110111110110110101101100011","0100000001100101010111110010110001000111010000001010001011011101","0100000001100101100111101100101010001111100001011101101001010111","0100000001100101110111100110100011010111110010110001000111010000","0100000001100110000111100000011100100000000100000100100101001010","0100000001100110010111011010010101101000010101011000000011000011","0100000001100110100111010100001110110000100110101011100000111101","0100000001100110110111001110000111111000110111111110111110110111","0100000001100111000111001000000001000001001001010010011100110000","0100000001100111010111000001111010001001011010100101111010101010","0100000001100111100110111011110011010001101011111001011000100100","0100000001100111110110110101101100011001111101001100110110011101","0100000001101000000110101111100101100010001110100000010100010111","0100000001101000010110101001011110101010011111110011110010010001","0100000001101000100110100011010111110010110001000111010000001010","0100000001101000110110011101010000111011000010011010101110000100","0100000001101001000110010111001010000011010011101110001011111101","0100000001101001010110010001000011001011100101000001101001110111","0100000001101001100110001010111100010011110110010101000111110001","0100000001101001110110000100110101011100000111101000100101101010","0100000001101010000101111110101110100100011000111100000011100100","0100000001101010010101111000100111101100101010001111100001011110","0100000001101010100101110010100000110100111011100010111111010111","0100000001101010110101101100011001111101001100110110011101010001","0100000001101011000101100110010011000101011110001001111011001011","0100000001101011010101100000001100001101101111011101011001000100","0100000001101011100101011010000101010110000000110000110110111110","0100000001101011110101010011111110011110010010000100010100110111","0100000001101100000101001101110111100110100011010111110010110001","0100000001101100010101000111110000101110110100101011010000101011","0100000001101100100101000001101001110111000101111110101110100100","0100000001101100110100111011100010111111010111010010001100011110","0100000001101101000100110101011100000111101000100101101010011000","0100000001101101010100101111010101001111111001111001001000010001","0100000001101101100100101001001110011000001011001100100110001011","0100000001101101110100100011000111100000011100100000000100000101","0100000001101110000100011101000000101000101101110011100001111110","0100000001101110010100010110111001110000111111000110111111111000","0100000001101110100100010000110010111001010000011010011101110001","0100000001101110110100001010101100000001100001101101111011101011","0100000001101111000100000100100101001001110011000001011001100101","0100000001101111010011111110011110010010000100010100110111011110","0100000001101111100011111000010111011010010101101000010101011000","0100000001101111110011110010010000100010100110111011110011010010","0100000001110000000001110110000100110101011100000111101000100110","0100000001110000001001110011000001011001100100110001010111100010","0100000001110000010001101111111101111101101101011011000110011111","0100000001110000011001101100111010100001110110000100110101011100","0100000001110000100001101001110111000101111110101110100100011001","0100000001110000101001100110110011101010000111011000010011010110","0100000001110000110001100011110000001110010000000010000010010011","0100000001110000111001100000101100110010011000101011110001001111","0100000001110001000001011101101001010110100001010101100000001100","0100000001110001001001011010100101111010101001111111001111001001","0100000001110001010001010111100010011110110010101000111110000110","0100000001110001011001010100011111000010111011010010101101000011","0100000001110001100001010001011011100111000011111100011011111111","0100000001110001101001001110011000001011001100100110001010111100","0100000001110001110001001011010100101111010101001111111001111001","0100000001110001111001001000010001010011011101111001101000110110","0100000001110010000001000101001101110111100110100011010111110011","0100000001110010001001000010001010011011101111001101000110110000","0100000001110010010000111111000110111111110111110110110101101100","0100000001110010011000111100000011100100000000100000100100101001","0100000001110010100000111001000000001000001001001010010011100110","0100000001110010101000110101111100101100010001110100000010100011","0100000001110010110000110010111001010000011010011101110001100000","0100000001110010111000101111110101110100100011000111100000011101","0100000001110011000000101100110010011000101011110001001111011001","0100000001110011001000101001101110111100110100011010111110010110","0100000001110011010000100110101011100000111101000100101101010011","0100000001110011011000100011101000000101000101101110011100010000","0100000001110011100000100000100100101001001110011000001011001101","0100000001110011101000011101100001001101010111000001111010001001","0100000001110011110000011010011101110001011111101011101001000110","0100000001110011111000010111011010010101101000010101011000000011","0100000001110100000000010100010110111001110000111111000111000000","0100000001110100001000010001010011011101111001101000110101111101","0100000001110100010000001110010000000010000010010010100100111010","0100000001110100011000001011001100100110001010111100010011110110","0100000001110100100000001000001001001010010011100110000010110011","0100000001110100101000000101000101101110011100001111110001110000","0100000001110100110000000010000010010010100100111001100000101101","0100000001110100110111111110111110110110101101100011001111101010","0100000001110100111111111011111011011010110110001100111110100110","0100000001110101000111111000110111111110111110110110101101100011","0100000001110101001111110101110100100011000111100000011100100000","0100000001110101010111110010110001000111010000001010001011011101","0100000001110101011111101111101101101011011000110011111010011010","0100000001110101100111101100101010001111100001011101101001010111","0100000001110101101111101001100110110011101010000111011000010011","0100000001110101110111100110100011010111110010110001000111010000","0100000001110101111111100011011111111011111011011010110110001101","0100000001110110000111100000011100100000000100000100100101001010","0100000001110110001111011101011001000100001100101110010100000111","0100000001110110010111011010010101101000010101011000000011000011","0100000001110110011111010111010010001100011110000001110010000000","0100000001110110100111010100001110110000100110101011100000111101","0100000001110110101111010001001011010100101111010101001111111010","0100000001110110110111001110000111111000110111111110111110110111","0100000001110110111111001011000100011101000000101000101101110100","0100000001110111000111001000000001000001001001010010011100110000","0100000001110111001111000100111101100101010001111100001011101101","0100000001110111010111000001111010001001011010100101111010101010","0100000001110111011110111110110110101101100011001111101001100111","0100000001110111100110111011110011010001101011111001011000100100","0100000001110111101110111000101111110101110100100011000111100000","0100000001110111110110110101101100011001111101001100110110011101","0100000001110111111110110010101000111110000101110110100101011010","0100000001111000000110101111100101100010001110100000010100010111","0100000001111000001110101100100010000110010111001010000011010100","0100000001111000010110101001011110101010011111110011110010010001","0100000001111000011110100110011011001110101000011101100001001101","0100000001111000100110100011010111110010110001000111010000001010","0100000001111000101110100000010100010110111001110000111111000111","0100000001111000110110011101010000111011000010011010101110000100","0100000001111000111110011010001101011111001011000100011101000001","0100000001111001000110010111001010000011010011101110001011111101","0100000001111001001110010100000110100111011100010111111010111010","0100000001111001010110010001000011001011100101000001101001110111","0100000001111001011110001101111111101111101101101011011000110100","0100000001111001100110001010111100010011110110010101000111110001","0100000001111001101110000111111000110111111110111110110110101110","0100000001111001110110000100110101011100000111101000100101101010","0100000001111001111110000001110010000000010000010010010100100111","0100000001111010000101111110101110100100011000111100000011100100","0100000001111010001101111011101011001000100001100101110010100001","0100000001111010010101111000100111101100101010001111100001011110","0100000001111010011101110101100100010000110010111001010000011010","0100000001111010100101110010100000110100111011100010111111010111","0100000001111010101101101111011101011001000100001100101110010100","0100000001111010110101101100011001111101001100110110011101010001","0100000001111010111101101001010110100001010101100000001100001110","0100000001111011000101100110010011000101011110001001111011001011","0100000001111011001101100011001111101001100110110011101010000111","0100000001111011010101100000001100001101101111011101011001000100","0100000001111011011101011101001000110001111000000111001000000001","0100000001111011100101011010000101010110000000110000110110111110","0100000001111011101101010111000001111010001001011010100101111011","0100000001111011110101010011111110011110010010000100010100110111","0100000001111011111101010000111011000010011010101110000011110100","0100000001111100000101001101110111100110100011010111110010110001","0100000001111100001101001010110100001010101100000001100001101110","0100000001111100010101000111110000101110110100101011010000101011","0100000001111100011101000100101101010010111101010100111111101000","0100000001111100100101000001101001110111000101111110101110100100","0100000001111100101100111110100110011011001110101000011101100001","0100000001111100110100111011100010111111010111010010001100011110","0100000001111100111100111000011111100011011111111011111011011011","0100000001111101000100110101011100000111101000100101101010011000","0100000001111101001100110010011000101011110001001111011001010100","0100000001111101010100101111010101001111111001111001001000010001","0100000001111101011100101100010001110100000010100010110111001110","0100000001111101100100101001001110011000001011001100100110001011","0100000001111101101100100110001010111100010011110110010101001000","0100000001111101110100100011000111100000011100100000000100000101","0100000001111101111100100000000100000100100101001001110011000001","0100000001111110000100011101000000101000101101110011100001111110","0100000001111110001100011001111101001100110110011101010000111011","0100000001111110010100010110111001110000111111000110111111111000","0100000001111110011100010011110110010101000111110000101110110101","0100000001111110100100010000110010111001010000011010011101110001","0100000001111110101100001101101111011101011001000100001100101110","0100000001111110110100001010101100000001100001101101111011101011","0100000001111110111100000111101000100101101010010111101010101000","0100000001111111000100000100100101001001110011000001011001100101","0100000001111111001100000001100001101101111011101011001000100010","0100000001111111010011111110011110010010000100010100110111011110","0100000001111111011011111011011010110110001100111110100110011011","0100000001111111100011111000010111011010010101101000010101011000","0100000001111111101011110101010011111110011110010010000100010101","0100000001111111110011110010010000100010100110111011110011010010","0100000001111111111011101111001101000110101111100101100010001111","0100000010000000000001110110000100110101011100000111101000100110","0100000010000000000101110100100011000111100000011100100000000100","0100000010000000001001110011000001011001100100110001010111100010","0100000010000000001101110001011111101011101001000110001111000001","0100000010000000010001101111111101111101101101011011000110011111","0100000010000000010101101110011100001111110001101111111101111110","0100000010000000011001101100111010100001110110000100110101011100","0100000010000000011101101011011000110011111010011001101100111011","0100000010000000100001101001110111000101111110101110100100011001","0100000010000000100101101000010101011000000011000011011011110111","0100000010000000101001100110110011101010000111011000010011010110","0100000010000000101101100101010001111100001011101101001010110100","0100000010000000110001100011110000001110010000000010000010010011","0100000010000000110101100010001110100000010100010110111001110001","0100000010000000111001100000101100110010011000101011110001001111","0100000010000000111101011111001011000100011101000000101000101110","0100000010000001000001011101101001010110100001010101100000001100","0100000010000001000101011100000111101000100101101010010111101011","0100000010000001001001011010100101111010101001111111001111001001","0100000010000001001101011001000100001100101110010100000110100111","0100000010000001010001010111100010011110110010101000111110000110","0100000010000001010101010110000000110000110110111101110101100100","0100000010000001011001010100011111000010111011010010101101000011","0100000010000001011101010010111101010100111111100111100100100001","0100000010000001100001010001011011100111000011111100011011111111","0100000010000001100101001111111001111001001000010001010011011110","0100000010000001101001001110011000001011001100100110001010111100","0100000010000001101101001100110110011101010000111011000010011011","0100000010000001110001001011010100101111010101001111111001111001","0100000010000001110101001001110011000001011001100100110001011000","0100000010000001111001001000010001010011011101111001101000110110","0100000010000001111101000110101111100101100010001110100000010100","0100000010000010000001000101001101110111100110100011010111110011","0100000010000010000101000011101100001001101010111000001111010001","0100000010000010001001000010001010011011101111001101000110110000","0100000010000010001101000000101000101101110011100001111110001110","0100000010000010010000111111000110111111110111110110110101101100","0100000010000010010100111101100101010001111100001011101101001011","0100000010000010011000111100000011100100000000100000100100101001","0100000010000010011100111010100001110110000100110101011100001000","0100000010000010100000111001000000001000001001001010010011100110","0100000010000010100100110111011110011010001101011111001011000100","0100000010000010101000110101111100101100010001110100000010100011","0100000010000010101100110100011010111110010110001000111010000001","0100000010000010110000110010111001010000011010011101110001100000","0100000010000010110100110001010111100010011110110010101000111110","0100000010000010111000101111110101110100100011000111100000011101","0100000010000010111100101110010100000110100111011100010111111011","0100000010000011000000101100110010011000101011110001001111011001","0100000010000011000100101011010000101010110000000110000110111000","0100000010000011001000101001101110111100110100011010111110010110","0100000010000011001100101000001101001110111000101111110101110101","0100000010000011010000100110101011100000111101000100101101010011","0100000010000011010100100101001001110011000001011001100100110001","0100000010000011011000100011101000000101000101101110011100010000","0100000010000011011100100010000110010111001010000011010011101110","0100000010000011100000100000100100101001001110011000001011001101","0100000010000011100100011111000010111011010010101101000010101011","0100000010000011101000011101100001001101010111000001111010001001","0100000010000011101100011011111111011111011011010110110001101000","0100000010000011110000011010011101110001011111101011101001000110","0100000010000011110100011000111100000011100100000000100000100101","0100000010000011111000010111011010010101101000010101011000000011","0100000010000011111100010101111000100111101100101010001111100001","0100000010000100000000010100010110111001110000111111000111000000","0100000010000100000100010010110101001011110101010011111110011110","0100000010000100001000010001010011011101111001101000110101111101","0100000010000100001100001111110001101111111101111101101101011011","0100000010000100010000001110010000000010000010010010100100111010","0100000010000100010100001100101110010100000110100111011100011000","0100000010000100011000001011001100100110001010111100010011110110","0100000010000100011100001001101010111000001111010001001011010101","0100000010000100100000001000001001001010010011100110000010110011","0100000010000100100100000110100111011100010111111010111010010010","0100000010000100101000000101000101101110011100001111110001110000","0100000010000100101100000011100100000000100000100100101001001110","0100000010000100110000000010000010010010100100111001100000101101","0100000010000100110100000000100000100100101001001110011000001011","0100000010000100110111111110111110110110101101100011001111101010","0100000010000100111011111101011101001000110001111000000111001000","0100000010000100111111111011111011011010110110001100111110100110","0100000010000101000011111010011001101100111010100001110110000101","0100000010000101000111111000110111111110111110110110101101100011","0100000010000101001011110111010110010001000011001011100101000010","0100000010000101001111110101110100100011000111100000011100100000","0100000010000101010011110100010010110101001011110101010011111110","0100000010000101010111110010110001000111010000001010001011011101","0100000010000101011011110001001111011001010100011111000010111011","0100000010000101011111101111101101101011011000110011111010011010","0100000010000101100011101110001011111101011101001000110001111000","0100000010000101100111101100101010001111100001011101101001010111","0100000010000101101011101011001000100001100101110010100000110101","0100000010000101101111101001100110110011101010000111011000010011","0100000010000101110011101000000101000101101110011100001111110010","0100000010000101110111100110100011010111110010110001000111010000","0100000010000101111011100101000001101001110111000101111110101111","0100000010000101111111100011011111111011111011011010110110001101","0100000010000110000011100001111110001101111111101111101101101011","0100000010000110000111100000011100100000000100000100100101001010","0100000010000110001011011110111010110010001000011001011100101000","0100000010000110001111011101011001000100001100101110010100000111","0100000010000110010011011011110111010110010001000011001011100101","0100000010000110010111011010010101101000010101011000000011000011","0100000010000110011011011000110011111010011001101100111010100010","0100000010000110011111010111010010001100011110000001110010000000","0100000010000110100011010101110000011110100010010110101001011111","0100000010000110100111010100001110110000100110101011100000111101","0100000010000110101011010010101101000010101011000000011000011011","0100000010000110101111010001001011010100101111010101001111111010","0100000010000110110011001111101001100110110011101010000111011000","0100000010000110110111001110000111111000110111111110111110110111","0100000010000110111011001100100110001010111100010011110110010101","0100000010000110111111001011000100011101000000101000101101110100","0100000010000111000011001001100010101111000100111101100101010010","0100000010000111000111001000000001000001001001010010011100110000","0100000010000111001011000110011111010011001101100111010100001111","0100000010000111001111000100111101100101010001111100001011101101","0100000010000111010011000011011011110111010110010001000011001100","0100000010000111010111000001111010001001011010100101111010101010","0100000010000111011011000000011000011011011110111010110010001000","0100000010000111011110111110110110101101100011001111101001100111","0100000010000111100010111101010100111111100111100100100001000101","0100000010000111100110111011110011010001101011111001011000100100","0100000010000111101010111010010001100011110000001110010000000010","0100000010000111101110111000101111110101110100100011000111100000","0100000010000111110010110111001110000111111000110111111110111111","0100000010000111110110110101101100011001111101001100110110011101","0100000010000111111010110100001010101100000001100001101101111100","0100000010000111111110110010101000111110000101110110100101011010","0100000010001000000010110001000111010000001010001011011100111000","0100000010001000000110101111100101100010001110100000010100010111","0100000010001000001010101110000011110100010010110101001011110101","0100000010001000001110101100100010000110010111001010000011010100","0100000010001000010010101011000000011000011011011110111010110010","0100000010001000010110101001011110101010011111110011110010010001","0100000010001000011010100111111100111100100100001000101001101111","0100000010001000011110100110011011001110101000011101100001001101","0100000010001000100010100100111001100000101100110010011000101100","0100000010001000100110100011010111110010110001000111010000001010","0100000010001000101010100001110110000100110101011100000111101001","0100000010001000101110100000010100010110111001110000111111000111","0100000010001000110010011110110010101000111110000101110110100101","0100000010001000110110011101010000111011000010011010101110000100","0100000010001000111010011011101111001101000110101111100101100010","0100000010001000111110011010001101011111001011000100011101000001","0100000010001001000010011000101011110001001111011001010100011111","0100000010001001000110010111001010000011010011101110001011111101","0100000010001001001010010101101000010101011000000011000011011100","0100000010001001001110010100000110100111011100010111111010111010","0100000010001001010010010010100100111001100000101100110010011001","0100000010001001010110010001000011001011100101000001101001110111","0100000010001001011010001111100001011101101001010110100001010110","0100000010001001011110001101111111101111101101101011011000110100","0100000010001001100010001100011110000001110010000000010000010010","0100000010001001100110001010111100010011110110010101000111110001","0100000010001001101010001001011010100101111010101001111111001111","0100000010001001101110000111111000110111111110111110110110101110","0100000010001001110010000110010111001010000011010011101110001100","0100000010001001110110000100110101011100000111101000100101101010","0100000010001001111010000011010011101110001011111101011101001001","0100000010001001111110000001110010000000010000010010010100100111","0100000010001010000010000000010000010010010100100111001100000110","0100000010001010000101111110101110100100011000111100000011100100","0100000010001010001001111101001100110110011101010000111011000010","0100000010001010001101111011101011001000100001100101110010100001","0100000010001010010001111010001001011010100101111010101001111111","0100000010001010010101111000100111101100101010001111100001011110","0100000010001010011001110111000101111110101110100100011000111100","0100000010001010011101110101100100010000110010111001010000011010","0100000010001010100001110100000010100010110111001110000111111001","0100000010001010100101110010100000110100111011100010111111010111","0100000010001010101001110000111111000110111111110111110110110110","0100000010001010101101101111011101011001000100001100101110010100","0100000010001010110001101101111011101011001000100001100101110011","0100000010001010110101101100011001111101001100110110011101010001","0100000010001010111001101010111000001111010001001011010100101111","0100000010001010111101101001010110100001010101100000001100001110","0100000010001011000001100111110100110011011001110101000011101100","0100000010001011000101100110010011000101011110001001111011001011","0100000010001011001001100100110001010111100010011110110010101001","0100000010001011001101100011001111101001100110110011101010000111","0100000010001011010001100001101101111011101011001000100001100110","0100000010001011010101100000001100001101101111011101011001000100","0100000010001011011001011110101010011111110011110010010000100011","0100000010001011011101011101001000110001111000000111001000000001","0100000010001011100001011011100111000011111100011011111111011111","0100000010001011100101011010000101010110000000110000110110111110","0100000010001011101001011000100011101000000101000101101110011100","0100000010001011101101010111000001111010001001011010100101111011","0100000010001011110001010101100000001100001101101111011101011001","0100000010001011110101010011111110011110010010000100010100110111","0100000010001011111001010010011100110000010110011001001100010110","0100000010001011111101010000111011000010011010101110000011110100","0100000010001100000001001111011001010100011111000010111011010011","0100000010001100000101001101110111100110100011010111110010110001","0100000010001100001001001100010101111000100111101100101010010000","0100000010001100001101001010110100001010101100000001100001101110","0100000010001100010001001001010010011100110000010110011001001100","0100000010001100010101000111110000101110110100101011010000101011","0100000010001100011001000110001111000000111001000000001000001001","0100000010001100011101000100101101010010111101010100111111101000","0100000010001100100001000011001011100101000001101001110111000110","0100000010001100100101000001101001110111000101111110101110100100","0100000010001100101001000000001000001001001010010011100110000011","0100000010001100101100111110100110011011001110101000011101100001","0100000010001100110000111101000100101101010010111101010101000000","0100000010001100110100111011100010111111010111010010001100011110","0100000010001100111000111010000001010001011011100111000011111100","0100000010001100111100111000011111100011011111111011111011011011","0100000010001101000000110110111101110101100100010000110010111001","0100000010001101000100110101011100000111101000100101101010011000","0100000010001101001000110011111010011001101100111010100001110110","0100000010001101001100110010011000101011110001001111011001010100","0100000010001101010000110000110110111101110101100100010000110011","0100000010001101010100101111010101001111111001111001001000010001","0100000010001101011000101101110011100001111110001101111111110000","0100000010001101011100101100010001110100000010100010110111001110","0100000010001101100000101010110000000110000110110111101110101101","0100000010001101100100101001001110011000001011001100100110001011","0100000010001101101000100111101100101010001111100001011101101001","0100000010001101101100100110001010111100010011110110010101001000","0100000010001101110000100100101001001110011000001011001100100110","0100000010001101110100100011000111100000011100100000000100000101","0100000010001101111000100001100101110010100000110100111011100011","0100000010001101111100100000000100000100100101001001110011000001","0100000010001110000000011110100010010110101001011110101010100000","0100000010001110000100011101000000101000101101110011100001111110","0100000010001110001000011011011110111010110010001000011001011101","0100000010001110001100011001111101001100110110011101010000111011","0100000010001110010000011000011011011110111010110010001000011001","0100000010001110010100010110111001110000111111000110111111111000","0100000010001110011000010101011000000011000011011011110111010110","0100000010001110011100010011110110010101000111110000101110110101","0100000010001110100000010010010100100111001100000101100110010011","0100000010001110100100010000110010111001010000011010011101110001","0100000010001110101000001111010001001011010100101111010101010000","0100000010001110101100001101101111011101011001000100001100101110","0100000010001110110000001100001101101111011101011001000100001101","0100000010001110110100001010101100000001100001101101111011101011","0100000010001110111000001001001010010011100110000010110011001010","0100000010001110111100000111101000100101101010010111101010101000","0100000010001111000000000110000110110111101110101100100010000110","0100000010001111000100000100100101001001110011000001011001100101","0100000010001111001000000011000011011011110111010110010001000011","0100000010001111001100000001100001101101111011101011001000100010","0100000010001111010000000000000000000000000000000000000000000000"],"x":[-1000.0,-998.0119284294235,-996.0238568588469,-994.0357852882704,-992.0477137176938,-990.0596421471173,-988.0715705765408,-986.0834990059642,-984.0954274353877,-982.1073558648111,-980.1192842942346,-978.131212723658,-976.1431411530815,-974.155069582505,-972.1669980119284,-970.1789264413519,-968.1908548707753,-966.2027833001988,-964.2147117296223,-962.2266401590457,-960.2385685884692,-958.2504970178926,-956.2624254473161,-954.2743538767396,-952.286282306163,-950.2982107355865,-948.3101391650099,-946.3220675944334,-944.3339960238569,-942.3459244532803,-940.3578528827038,-938.3697813121272,-936.3817097415507,-934.3936381709741,-932.4055666003976,-930.4174950298211,-928.4294234592445,-926.441351888668,-924.4532803180914,-922.4652087475149,-920.4771371769384,-918.4890656063618,-916.5009940357853,-914.5129224652087,-912.5248508946322,-910.5367793240557,-908.5487077534791,-906.5606361829026,-904.572564612326,-902.5844930417495,-900.596421471173,-898.6083499005964,-896.6202783300199,-894.6322067594433,-892.6441351888668,-890.6560636182902,-888.6679920477137,-886.6799204771372,-884.6918489065606,-882.7037773359841,-880.7157057654075,-878.727634194831,-876.7395626242545,-874.7514910536779,-872.7634194831014,-870.7753479125248,-868.7872763419483,-866.7992047713718,-864.8111332007952,-862.8230616302187,-860.8349900596421,-858.8469184890656,-856.8588469184891,-854.8707753479125,-852.882703777336,-850.8946322067594,-848.9065606361829,-846.9184890656063,-844.9304174950298,-842.9423459244533,-840.9542743538767,-838.9662027833002,-836.9781312127236,-834.9900596421471,-833.0019880715706,-831.013916500994,-829.0258449304175,-827.0377733598409,-825.0497017892644,-823.0616302186879,-821.0735586481113,-819.0854870775348,-817.0974155069582,-815.1093439363817,-813.1212723658052,-811.1332007952286,-809.1451292246521,-807.1570576540755,-805.168986083499,-803.1809145129224,-801.1928429423459,-799.2047713717694,-797.2166998011928,-795.2286282306163,-793.2405566600397,-791.2524850894632,-789.2644135188867,-787.2763419483101,-785.2882703777336,-783.300198807157,-781.3121272365805,-779.324055666004,-777.3359840954274,-775.3479125248509,-773.3598409542743,-771.3717693836978,-769.3836978131212,-767.3956262425447,-765.4075546719682,-763.4194831013916,-761.4314115308151,-759.4433399602385,-757.455268389662,-755.4671968190855,-753.4791252485089,-751.4910536779324,-749.5029821073558,-747.5149105367793,-745.5268389662028,-743.5387673956262,-741.5506958250497,-739.5626242544731,-737.5745526838966,-735.5864811133201,-733.5984095427435,-731.610337972167,-729.6222664015904,-727.6341948310139,-725.6461232604373,-723.6580516898608,-721.6699801192843,-719.6819085487077,-717.6938369781312,-715.7057654075546,-713.7176938369781,-711.7296222664016,-709.741550695825,-707.7534791252485,-705.7654075546719,-703.7773359840954,-701.7892644135189,-699.8011928429423,-697.8131212723658,-695.8250497017892,-693.8369781312127,-691.8489065606362,-689.8608349900596,-687.8727634194831,-685.8846918489065,-683.89662027833,-681.9085487077534,-679.9204771371769,-677.9324055666004,-675.9443339960238,-673.9562624254473,-671.9681908548707,-669.9801192842942,-667.9920477137177,-666.0039761431411,-664.0159045725646,-662.027833001988,-660.0397614314115,-658.051689860835,-656.0636182902584,-654.0755467196819,-652.0874751491053,-650.0994035785288,-648.1113320079523,-646.1232604373757,-644.1351888667992,-642.1471172962226,-640.1590457256461,-638.1709741550695,-636.182902584493,-634.1948310139165,-632.2067594433399,-630.2186878727634,-628.2306163021868,-626.2425447316103,-624.2544731610338,-622.2664015904572,-620.2783300198807,-618.2902584493041,-616.3021868787276,-614.3141153081511,-612.3260437375745,-610.337972166998,-608.3499005964214,-606.3618290258449,-604.3737574552684,-602.3856858846918,-600.3976143141153,-598.4095427435387,-596.4214711729622,-594.4333996023856,-592.4453280318091,-590.4572564612326,-588.469184890656,-586.4811133200795,-584.4930417495029,-582.5049701789264,-580.51689860835,-578.5288270377733,-576.5407554671968,-574.5526838966202,-572.5646123260437,-570.5765407554672,-568.5884691848906,-566.6003976143141,-564.6123260437375,-562.624254473161,-560.6361829025844,-558.6481113320079,-556.6600397614314,-554.6719681908548,-552.6838966202783,-550.6958250497017,-548.7077534791252,-546.7196819085488,-544.7316103379721,-542.7435387673956,-540.755467196819,-538.7673956262425,-536.779324055666,-534.7912524850894,-532.803180914513,-530.8151093439363,-528.8270377733598,-526.8389662027834,-524.8508946322067,-522.8628230616303,-520.8747514910536,-518.8866799204771,-516.8986083499005,-514.910536779324,-512.9224652087476,-510.934393638171,-508.94632206759445,-506.9582504970179,-504.97017892644135,-502.9821073558648,-500.99403578528825,-499.00596421471175,-497.0178926441352,-495.02982107355865,-493.0417495029821,-491.05367793240555,-489.065606361829,-487.0775347912525,-485.08946322067595,-483.1013916500994,-481.11332007952285,-479.1252485089463,-477.1371769383698,-475.14910536779325,-473.1610337972167,-471.17296222664015,-469.1848906560636,-467.19681908548705,-465.20874751491056,-463.220675944334,-461.23260437375745,-459.2445328031809,-457.25646123260435,-455.26838966202786,-453.2803180914513,-451.29224652087476,-449.3041749502982,-447.31610337972165,-445.3280318091451,-443.3399602385686,-441.35188866799206,-439.3638170974155,-437.37574552683895,-435.3876739562624,-433.3996023856859,-431.41153081510936,-429.4234592445328,-427.43538767395626,-425.4473161033797,-423.45924453280315,-421.47117296222666,-419.4831013916501,-417.49502982107356,-415.506958250497,-413.51888667992046,-411.53081510934396,-409.5427435387674,-407.55467196819086,-405.5666003976143,-403.57852882703776,-401.5904572564612,-399.6023856858847,-397.61431411530816,-395.6262425447316,-393.63817097415506,-391.6500994035785,-389.662027833002,-387.67395626242546,-385.6858846918489,-383.69781312127236,-381.7097415506958,-379.72166998011926,-377.73359840954276,-375.7455268389662,-373.75745526838966,-371.7693836978131,-369.78131212723656,-367.79324055666007,-365.8051689860835,-363.81709741550696,-361.8290258449304,-359.84095427435386,-357.8528827037773,-355.8648111332008,-353.87673956262427,-351.8886679920477,-349.90059642147116,-347.9125248508946,-345.9244532803181,-343.93638170974157,-341.948310139165,-339.96023856858847,-337.9721669980119,-335.98409542743536,-333.99602385685887,-332.0079522862823,-330.01988071570577,-328.0318091451292,-326.04373757455267,-324.05566600397617,-322.0675944333996,-320.07952286282307,-318.0914512922465,-316.10337972166997,-314.1153081510934,-312.1272365805169,-310.13916500994037,-308.1510934393638,-306.16302186878727,-304.1749502982107,-302.1868787276342,-300.1988071570577,-298.2107355864811,-296.22266401590457,-294.234592445328,-292.24652087475147,-290.258449304175,-288.2703777335984,-286.2823061630219,-284.2942345924453,-282.30616302186877,-280.3180914512922,-278.3300198807157,-276.3419483101392,-274.3538767395626,-272.36580516898607,-270.3777335984095,-268.389662027833,-266.4015904572565,-264.4135188866799,-262.4254473161034,-260.4373757455268,-258.44930417495027,-256.4612326043738,-254.47316103379723,-252.48508946322067,-250.49701789264412,-248.5089463220676,-246.52087475149105,-244.5328031809145,-242.54473161033798,-240.55666003976143,-238.5685884691849,-236.58051689860835,-234.5924453280318,-232.60437375745528,-230.61630218687873,-228.62823061630218,-226.64015904572565,-224.6520874751491,-222.66401590457255,-220.67594433399603,-218.68787276341948,-216.69980119284295,-214.7117296222664,-212.72365805168985,-210.73558648111333,-208.74751491053678,-206.75944333996023,-204.7713717693837,-202.78330019880715,-200.7952286282306,-198.80715705765408,-196.81908548707753,-194.831013916501,-192.84294234592446,-190.8548707753479,-188.86679920477138,-186.87872763419483,-184.89065606361828,-182.90258449304176,-180.9145129224652,-178.92644135188866,-176.93836978131213,-174.95029821073558,-172.96222664015906,-170.9741550695825,-168.98608349900596,-166.99801192842943,-165.00994035785288,-163.02186878727633,-161.0337972166998,-159.04572564612326,-157.0576540755467,-155.06958250497019,-153.08151093439363,-151.0934393638171,-149.10536779324056,-147.117296222664,-145.1292246520875,-143.14115308151094,-141.15308151093438,-139.16500994035786,-137.1769383697813,-135.18886679920476,-133.20079522862824,-131.2127236580517,-129.22465208747514,-127.23658051689861,-125.24850894632206,-123.26043737574552,-121.27236580516899,-119.28429423459245,-117.2962226640159,-115.30815109343936,-113.32007952286283,-111.33200795228628,-109.34393638170974,-107.3558648111332,-105.36779324055667,-103.37972166998011,-101.39165009940358,-99.40357852882704,-97.4155069582505,-95.42743538767395,-93.43936381709742,-91.45129224652088,-89.46322067594433,-87.47514910536779,-85.48707753479125,-83.49900596421472,-81.51093439363817,-79.52286282306163,-77.53479125248509,-75.54671968190856,-73.558648111332,-71.57057654075547,-69.58250497017893,-67.59443339960238,-65.60636182902584,-63.618290258449306,-61.63021868787276,-59.642147117296226,-57.65407554671968,-55.66600397614314,-53.6779324055666,-51.68986083499006,-49.70178926441352,-47.713717693836976,-45.72564612326044,-43.737574552683895,-41.74950298210736,-39.761431411530815,-37.77335984095428,-35.785288270377734,-33.79721669980119,-31.809145129224653,-29.821073558648113,-27.83300198807157,-25.84493041749503,-23.856858846918488,-21.868787276341948,-19.880715705765407,-17.892644135188867,-15.904572564612327,-13.916500994035784,-11.928429423459244,-9.940357852882704,-7.952286282306163,-5.964214711729622,-3.9761431411530817,-1.9880715705765408,0.0,1.9880715705765408,3.9761431411530817,5.964214711729622,7.952286282306163,9.940357852882704,11.928429423459244,13.916500994035784,15.904572564612327,17.892644135188867,19.880715705765407,21.868787276341948,23.856858846918488,25.84493041749503,27.83300198807157,29.821073558648113,31.809145129224653,33.79721669980119,35.785288270377734,37.77335984095428,39.761431411530815,41.74950298210736,43.737574552683895,45.72564612326044,47.713717693836976,49.70178926441352,51.68986083499006,53.6779324055666,55.66600397614314,57.65407554671968,59.642147117296226,61.63021868787276,63.618290258449306,65.60636182902584,67.59443339960238,69.58250497017893,71.57057654075547,73.558648111332,75.54671968190856,77.53479125248509,79.52286282306163,81.51093439363817,83.49900596421472,85.48707753479125,87.47514910536779,89.46322067594433,91.45129224652088,93.43936381709742,95.42743538767395,97.4155069582505,99.40357852882704,101.39165009940358,103.37972166998011,105.36779324055667,107.3558648111332,109.34393638170974,111.33200795228628,113.32007952286283,115.30815109343936,117.2962226640159,119.28429423459245,121.27236580516899,123.26043737574552,125.24850894632206,127.23658051689861,129.22465208747514,131.2127236580517,133.20079522862824,135.18886679920476,137.1769383697813,139.16500994035786,141.15308151093438,143.14115308151094,145.1292246520875,147.117296222664,149.10536779324056,151.0934393638171,153.08151093439363,155.06958250497019,157.0576540755467,159.04572564612326,161.0337972166998,163.02186878727633,165.00994035785288,166.99801192842943,168.98608349900596,170.9741550695825,172.96222664015906,174.95029821073558,176.93836978131213,178.92644135188866,180.9145129224652,182.90258449304176,184.89065606361828,186.87872763419483,188.86679920477138,190.8548707753479,192.84294234592446,194.831013916501,196.81908548707753,198.80715705765408,200.7952286282306,202.78330019880715,204.7713717693837,206.75944333996023,208.74751491053678,210.73558648111333,212.72365805168985,214.7117296222664,216.69980119284295,218.68787276341948,220.67594433399603,222.66401590457255,224.6520874751491,226.64015904572565,228.62823061630218,230.61630218687873,232.60437375745528,234.5924453280318,236.58051689860835,238.5685884691849,240.55666003976143,242.54473161033798,244.5328031809145,246.52087475149105,248.5089463220676,250.49701789264412,252.48508946322067,254.47316103379723,256.4612326043738,258.44930417495027,260.4373757455268,262.4254473161034,264.4135188866799,266.4015904572565,268.389662027833,270.3777335984095,272.36580516898607,274.3538767395626,276.3419483101392,278.3300198807157,280.3180914512922,282.30616302186877,284.2942345924453,286.2823061630219,288.2703777335984,290.258449304175,292.24652087475147,294.234592445328,296.22266401590457,298.2107355864811,300.1988071570577,302.1868787276342,304.1749502982107,306.16302186878727,308.1510934393638,310.13916500994037,312.1272365805169,314.1153081510934,316.10337972166997,318.0914512922465,320.07952286282307,322.0675944333996,324.05566600397617,326.04373757455267,328.0318091451292,330.01988071570577,332.0079522862823,333.99602385685887,335.98409542743536,337.9721669980119,339.96023856858847,341.948310139165,343.93638170974157,345.9244532803181,347.9125248508946,349.90059642147116,351.8886679920477,353.87673956262427,355.8648111332008,357.8528827037773,359.84095427435386,361.8290258449304,363.81709741550696,365.8051689860835,367.79324055666007,369.78131212723656,371.7693836978131,373.75745526838966,375.7455268389662,377.73359840954276,379.72166998011926,381.7097415506958,383.69781312127236,385.6858846918489,387.67395626242546,389.662027833002,391.6500994035785,393.63817097415506,395.6262425447316,397.61431411530816,399.6023856858847,401.5904572564612,403.57852882703776,405.5666003976143,407.55467196819086,409.5427435387674,411.53081510934396,413.51888667992046,415.506958250497,417.49502982107356,419.4831013916501,421.47117296222666,423.45924453280315,425.4473161033797,427.43538767395626,429.4234592445328,431.41153081510936,433.3996023856859,435.3876739562624,437.37574552683895,439.3638170974155,441.35188866799206,443.3399602385686,445.3280318091451,447.31610337972165,449.3041749502982,451.29224652087476,453.2803180914513,455.26838966202786,457.25646123260435,459.2445328031809,461.23260437375745,463.220675944334,465.20874751491056,467.19681908548705,469.1848906560636,471.17296222664015,473.1610337972167,475.14910536779325,477.1371769383698,479.1252485089463,481.11332007952285,483.1013916500994,485.08946322067595,487.0775347912525,489.065606361829,491.05367793240555,493.0417495029821,495.02982107355865,497.0178926441352,499.00596421471175,500.99403578528825,502.9821073558648,504.97017892644135,506.9582504970179,508.94632206759445,510.934393638171,512.9224652087476,514.910536779324,516.8986083499005,518.8866799204771,520.8747514910536,522.8628230616303,524.8508946322067,526.8389662027834,528.8270377733598,530.8151093439363,532.803180914513,534.7912524850894,536.779324055666,538.7673956262425,540.755467196819,542.7435387673956,544.7316103379721,546.7196819085488,548.7077534791252,550.6958250497017,552.6838966202783,554.6719681908548,556.6600397614314,558.6481113320079,560.6361829025844,562.624254473161,564.6123260437375,566.6003976143141,568.5884691848906,570.5765407554672,572.5646123260437,574.5526838966202,576.5407554671968,578.5288270377733,580.51689860835,582.5049701789264,584.4930417495029,586.4811133200795,588.469184890656,590.4572564612326,592.4453280318091,594.4333996023856,596.4214711729622,598.4095427435387,600.3976143141153,602.3856858846918,604.3737574552684,606.3618290258449,608.3499005964214,610.337972166998,612.3260437375745,614.3141153081511,616.3021868787276,618.2902584493041,620.2783300198807,622.2664015904572,624.2544731610338,626.2425447316103,628.2306163021868,630.2186878727634,632.2067594433399,634.1948310139165,636.182902584493,638.1709741550695,640.1590457256461,642.1471172962226,644.1351888667992,646.1232604373757,648.1113320079523,650.0994035785288,652.0874751491053,654.0755467196819,656.0636182902584,658.051689860835,660.0397614314115,662.027833001988,664.0159045725646,666.0039761431411,667.9920477137177,669.9801192842942,671.9681908548707,673.9562624254473,675.9443339960238,677.9324055666004,679.9204771371769,681.9085487077534,683.89662027833,685.8846918489065,687.8727634194831,689.8608349900596,691.8489065606362,693.8369781312127,695.8250497017892,697.8131212723658,699.8011928429423,701.7892644135189,703.7773359840954,705.7654075546719,707.7534791252485,709.741550695825,711.7296222664016,713.7176938369781,715.7057654075546,717.6938369781312,719.6819085487077,721.6699801192843,723.6580516898608,725.6461232604373,727.6341948310139,729.6222664015904,731.610337972167,733.5984095427435,735.5864811133201,737.5745526838966,739.5626242544731,741.5506958250497,743.5387673956262,745.5268389662028,747.5149105367793,749.5029821073558,751.4910536779324,753.4791252485089,755.4671968190855,757.455268389662,759.4433399602385,761.4314115308151,763.4194831013916,765.4075546719682,767.3956262425447,769.3836978131212,771.3717693836978,773.3598409542743,775.3479125248509,777.3359840954274,779.324055666004,781.3121272365805,783.300198807157,785.2882703777336,787.2763419483101,789.2644135188867,791.2524850894632,793.2405566600397,795.2286282306163,797.2166998011928,799.2047713717694,801.1928429423459,803.1809145129224,805.168986083499,807.1570576540755,809.1451292246521,811.1332007952286,813.1212723658052,815.1093439363817,817.0974155069582,819.0854870775348,821.0735586481113,823.0616302186879,825.0497017892644,827.0377733598409,829.0258449304175,831.013916500994,833.0019880715706,834.9900596421471,836.9781312127236,838.9662027833002,840.9542743538767,842.9423459244533,844.9304174950298,846.9184890656063,848.9065606361829,850.8946322067594,852.882703777336,854.8707753479125,856.8588469184891,858.8469184890656,860.8349900596421,862.8230616302187,864.8111332007952,866.7992047713718,868.7872763419483,870.7753479125248,872.7634194831014,874.7514910536779,876.7395626242545,878.727634194831,880.7157057654075,882.7037773359841,884.6918489065606,886.6799204771372,888.6679920477137,890.6560636182902,892.6441351888668,894.6322067594433,896.6202783300199,898.6083499005964,900.596421471173,902.5844930417495,904.572564612326,906.5606361829026,908.5487077534791,910.5367793240557,912.5248508946322,914.5129224652087,916.5009940357853,918.4890656063618,920.4771371769384,922.4652087475149,924.4532803180914,926.441351888668,928.4294234592445,930.4174950298211,932.4055666003976,934.3936381709741,936.3817097415507,938.3697813121272,940.3578528827038,942.3459244532803,944.3339960238569,946.3220675944334,948.3101391650099,950.2982107355865,952.286282306163,954.2743538767396,956.2624254473161,958.2504970178926,960.2385685884692,962.2266401590457,964.2147117296223,966.2027833001988,968.1908548707753,970.1789264413519,972.1669980119284,974.155069582505,976.1431411530815,978.131212723658,980.1192842942346,982.1073558648111,984.0954274353877,986.0834990059642,988.0715705765408,990.0596421471173,992.0477137176938,994.0357852882704,996.0238568588469,998.0119284294235,1000.0]}
},{}],60:[function(require,module,exports){
module.exports={"expected":["0001011001101000011111101001001000010101010011101111011110101100","0001011001101000011110000101011001100100001011001000100011111100","0001011001101000011100100001101010110011000010100001101001001100","0001011001101000011010111101111100000001111001111010101110011100","0001011001101000011001011010001101010000110001010011110011101100","0001011001101000010111110110011110011111101000101100111000111100","0001011001101000010110010010101111101110100000000101111110001100","0001011001101000010100101111000000111101010111011111000011011100","0001011001101000010011001011010010001100001110111000001000101100","0001011001101000010001100111100011011011000110010001001101111100","0001011001101000010000000011110100101001111101101010010011001100","0001011001101000001110100000000101111000110101000011011000011011","0001011001101000001100111100010111000111101100011100011101101011","0001011001101000001011011000101000010110100011110101100010111100","0001011001101000001001110100111001100101011011001110101000001100","0001011001101000001000010001001010110100010010100111101101011100","0001011001101000000110101101011100000011001010000000110010101100","0001011001101000000101001001101101010010000001011001110111111100","0001011001101000000011100101111110100000111000110010111101001100","0001011001101000000010000010001111101111110000001100000010011100","0001011001101000000000011110100000111110100111100101000111101100","0001011001100111111110111010110010001101011110111110001100111100","0001011001100111111101010111000011011100010110010111010010001011","0001011001100111111011110011010100101011001101110000010111011011","0001011001100111111010001111100101111010000101001001011100101011","0001011001100111111000101011110111001000111100100010100001111100","0001011001100111110111001000001000010111110011111011100111001100","0001011001100111110101100100011001100110101011010100101100011100","0001011001100111110100000000101010110101100010101101110001101100","0001011001100111110010011100111100000100011010000110110110111100","0001011001100111110000111001001101010011010001011111111100001100","0001011001100111101111010101011110100010001000111001000001011100","0001011001100111101101110001101111110001000000010010000110101100","0001011001100111101100001110000000111111110111101011001011111011","0001011001100111101010101010010010001110101111000100010001001011","0001011001100111101001000110100011011101100110011101010110011011","0001011001100111100111100010110100101100011101110110011011101011","0001011001100111100101111111000101111011010101001111100000111100","0001011001100111100100011011010111001010001100101000100110001100","0001011001100111100010110111101000011001000100000001101011011100","0001011001100111100001010011111001100111111011011010110000101100","0001011001100111011111110000001010110110110010110011110101111100","0001011001100111011110001100011100000101101010001100111011001100","0001011001100111011100101000101101010100100001100110000000011011","0001011001100111011011000100111110100011011000111111000101101011","0001011001100111011001100001001111110010010000011000001010111011","0001011001100111010111111101100001000001000111110001010000001011","0001011001100111010110011001110010001111111111001010010101011011","0001011001100111010100110110000011011110110110100011011010101011","0001011001100111010011010010010100101101101101111100011111111011","0001011001100111010001101110100101111100100101010101100101001100","0001011001100111010000001010110111001011011100101110101010011100","0001011001100111001110100111001000011010010100000111101111101100","0001011001100111001101000011011001101001001011100000110100111100","0001011001100111001011011111101010111000000010111001111010001011","0001011001100111001001111011111100000110111010010010111111011011","0001011001100111001000011000001101010101110001101100000100101011","0001011001100111000110110100011110100100101001000101001001111011","0001011001100111000101010000101111110011100000011110001111001011","0001011001100111000011101101000001000010010111110111010100011011","0001011001100111000010001001010010010001001111010000011001101011","0001011001100111000000100101100011100000000110101001011110111011","0001011001100110111111000001110100101110111110000010100100001100","0001011001100110111101011110000101111101110101011011101001011100","0001011001100110111011111010010111001100101100110100101110101100","0001011001100110111010010110101000011011100100001101110011111011","0001011001100110111000110010111001101010011011100110111001001011","0001011001100110110111001111001010111001010010111111111110011011","0001011001100110110101101011011100001000001010011001000011101011","0001011001100110110100000111101101010111000001110010001000111011","0001011001100110110010100011111110100101111001001011001110001011","0001011001100110110001000000001111110100110000100100010011011011","0001011001100110101111011100100001000011100111111101011000101011","0001011001100110101101111000110010010010011111010110011101111011","0001011001100110101100010101000011100001010110101111100011001100","0001011001100110101010110001010100110000001110001000101000011011","0001011001100110101001001101100101111111000101100001101101101011","0001011001100110100111101001110111001101111100111010110010111011","0001011001100110100110000110001000011100110100010011111000001011","0001011001100110100100100010011001101011101011101100111101011011","0001011001100110100010111110101010111010100011000110000010101011","0001011001100110100001011010111100001001011010011111000111111011","0001011001100110011111110111001101011000010001111000001101001011","0001011001100110011110010011011110100111001001010001010010011011","0001011001100110011100101111101111110110000000101010010111101011","0001011001100110011011001100000001000100111000000011011100111011","0001011001100110011001101000010010010011101111011100100010001011","0001011001100110011000000100100011100010100110110101100111011011","0001011001100110010110100000110100110001011110001110101100101011","0001011001100110010100111101000110000000010101100111110001111011","0001011001100110010011011001010111001111001101000000110111001011","0001011001100110010001110101101000011110000100011001111100011011","0001011001100110010000010001111001101100111011110011000001101011","0001011001100110001110101110001010111011110011001100000110111011","0001011001100110001101001010011100001010101010100101001100001011","0001011001100110001011100110101101011001100001111110010001011011","0001011001100110001010000010111110101000011001010111010110101010","0001011001100110001000011111001111110111010000110000011011111010","0001011001100110000110111011100001000110001000001001100001001011","0001011001100110000101010111110010010100111111100010100110011011","0001011001100110000011110100000011100011110110111011101011101011","0001011001100110000010010000010100110010101110010100110000111011","0001011001100110000000101100100110000001100101101101110110001011","0001011001100101111111001000110111010000011101000110111011011011","0001011001100101111101100101001000011111010100100000000000101011","0001011001100101111100000001011001101110001011111001000101111011","0001011001100101111010011101101010111101000011010010001011001011","0001011001100101111000111001111100001011111010101011010000011010","0001011001100101110111010110001101011010110010000100010101101010","0001011001100101110101110010011110101001101001011101011010111010","0001011001100101110100001110101111111000100000110110100000001010","0001011001100101110010101011000001000111011000001111100101011011","0001011001100101110001000111010010010110001111101000101010101011","0001011001100101101111100011100011100101000111000001101111111011","0001011001100101101101111111110100110011111110011010110101001011","0001011001100101101100011100000110000010110101110011111010011011","0001011001100101101010111000010111010001101101001100111111101011","0001011001100101101001010100101000100000100100100110000100111011","0001011001100101100111110000111001101111011011111111001010001010","0001011001100101100110001101001010111110010011011000001111011010","0001011001100101100100101001011100001101001010110001010100101010","0001011001100101100011000101101101011100000010001010011001111010","0001011001100101100001100001111110101010111001100011011111001010","0001011001100101011111111110001111111001110000111100100100011011","0001011001100101011110011010100001001000101000010101101001101011","0001011001100101011100110110110010010111011111101110101110111011","0001011001100101011011010011000011100110010111000111110100001011","0001011001100101011001101111010100110101001110100000111001011011","0001011001100101011000001011100110000100000101111001111110101010","0001011001100101010110100111110111010010111101010011000011111010","0001011001100101010101000100001000100001110100101100001001001010","0001011001100101010011100000011001110000101100000101001110011010","0001011001100101010001111100101010111111100011011110010011101010","0001011001100101010000011000111100001110011010110111011000111010","0001011001100101001110110101001101011101010010010000011110001010","0001011001100101001101010001011110101100001001101001100011011011","0001011001100101001011101101101111111011000001000010101000101011","0001011001100101001010001010000001001001111000011011101101111011","0001011001100101001000100110010010011000101111110100110011001011","0001011001100101000111000010100011100111100111001101111000011010","0001011001100101000101011110110100110110011110100110111101101010","0001011001100101000011111011000110000101010110000000000010111010","0001011001100101000010010111010111010100001101011001001000001010","0001011001100101000000110011101000100011000100110010001101011010","0001011001100100111111001111111001110001111100001011010010101010","0001011001100100111101101100001011000000110011100100010111111010","0001011001100100111100001000011100001111101010111101011101001010","0001011001100100111010100100101101011110100010010110100010011011","0001011001100100111001000000111110101101011001101111100111101011","0001011001100100110111011101001111111100010001001000101100111011","0001011001100100110101111001100001001011001000100001110010001010","0001011001100100110100010101110010011001111111111010110111011010","0001011001100100110010110010000011101000110111010011111100101010","0001011001100100110001001110010100110111101110101101000001111010","0001011001100100101111101010100110000110100110000110000111001010","0001011001100100101110000110110111010101011101011111001100011010","0001011001100100101100100011001000100100010100111000010001101010","0001011001100100101010111111011001110011001100010001010110111010","0001011001100100101001011011101011000010000011101010011100001010","0001011001100100100111110111111100010000111011000011100001011011","0001011001100100100110010100001101011111110010011100100110101010","0001011001100100100100110000011110101110101001110101101011111010","0001011001100100100011001100101111111101100001001110110001001010","0001011001100100100001101001000001001100011000100111110110011010","0001011001100100100000000101010010011011010000000000111011101010","0001011001100100011110100001100011101010000111011010000000111010","0001011001100100011100111101110100111000111110110011000110001010","0001011001100100011011011010000110000111110110001100001011011010","0001011001100100011001110110010111010110101101100101010000101010","0001011001100100011000010010101000100101100100111110010101111010","0001011001100100010110101110111001110100011100010111011011001010","0001011001100100010101001011001011000011010011110000100000011010","0001011001100100010011100111011100010010001011001001100101101010","0001011001100100010010000011101101100001000010100010101010111010","0001011001100100010000011111111110101111111001111011110000001010","0001011001100100001110111100001111111110110001010100110101011010","0001011001100100001101011000100001001101101000101101111010101010","0001011001100100001011110100110010011100100000000110111111111010","0001011001100100001010010001000011101011010111100000000101001010","0001011001100100001000101101010100111010001110111001001010011010","0001011001100100000111001001100110001001000110010010001111101010","0001011001100100000101100101110111010111111101101011010100111010","0001011001100100000100000010001000100110110101000100011010001001","0001011001100100000010011110011001110101101100011101011111011001","0001011001100100000000111010101011000100100011110110100100101010","0001011001100011111111010110111100010011011011001111101001111010","0001011001100011111101110011001101100010010010101000101111001010","0001011001100011111100001111011110110001001010000001110100011010","0001011001100011111010101011110000000000000001011010111001101010","0001011001100011111001001000000001001110111000110011111110111010","0001011001100011110111100100010010011101110000001101000100001010","0001011001100011110110000000100011101100100111100110001001011010","0001011001100011110100011100110100111011011110111111001110101001","0001011001100011110010111001000110001010010110011000010011111001","0001011001100011110001010101010111011001001101110001011001001001","0001011001100011101111110001101000101000000101001010011110011001","0001011001100011101110001101111001110110111100100011100011101010","0001011001100011101100101010001011000101110011111100101000111010","0001011001100011101011000110011100010100101011010101101110001010","0001011001100011101001100010101101100011100010101110110011011010","0001011001100011100111111110111110110010011010000111111000101010","0001011001100011100110011011010000000001010001100000111101111010","0001011001100011100100110111100001010000001000111010000011001010","0001011001100011100011010011110010011111000000010011001000011001","0001011001100011100001110000000011101101110111101100001101101001","0001011001100011100000001100010100111100101111000101010010111001","0001011001100011011110101000100110001011100110011110011000001001","0001011001100011011101000100110111011010011101110111011101011001","0001011001100011011011100001001000101001010101010000100010101010","0001011001100011011001111101011001111000001100101001100111111010","0001011001100011011000011001101011000111000100000010101101001010","0001011001100011010110110101111100010101111011011011110010011010","0001011001100011010101010010001101100100110010110100110111101010","0001011001100011010011101110011110110011101010001101111100111010","0001011001100011010010001010110000000010100001100111000010001001","0001011001100011010000100111000001010001011001000000000111011001","0001011001100011001111000011010010100000010000011001001100101001","0001011001100011001101011111100011101111000111110010010001111001","0001011001100011001011111011110100111101111111001011010111001001","0001011001100011001010011000000110001100110110100100011100011001","0001011001100011001000110100010111011011101101111101100001101010","0001011001100011000111010000101000101010100101010110100110111010","0001011001100011000101101100111001111001011100101111101100001010","0001011001100011000100001001001011001000010100001000110001011010","0001011001100011000010100101011100010111001011100001110110101001","0001011001100011000001000001101101100110000010111010111011111001","0001011001100010111111011101111110110100111010010100000001001001","0001011001100010111101111010010000000011110001101101000110011001","0001011001100010111100010110100001010010101001000110001011101001","0001011001100010111010110010110010100001100000011111010000111001","0001011001100010111001001111000011110000010111111000010110001001","0001011001100010110111101011010100111111001111010001011011011001","0001011001100010110110000111100110001110000110101010100000101010","0001011001100010110100100011110111011100111110000011100101111010","0001011001100010110011000000001000101011110101011100101011001010","0001011001100010110001011100011001111010101100110101110000011001","0001011001100010101111111000101011001001100100001110110101101001","0001011001100010101110010100111100011000011011100111111010111001","0001011001100010101100110001001101100111010011000001000000001001","0001011001100010101011001101011110110110001010011010000101011001","0001011001100010101001101001110000000101000001110011001010101001","0001011001100010101000000110000001010011111001001100001111111001","0001011001100010100110100010010010100010110000100101010101001001","0001011001100010100100111110100011110001100111111110011010011001","0001011001100010100011011010110101000000011111010111011111101001","0001011001100010100001110111000110001111010110110000100100111010","0001011001100010100000010011010111011110001110001001101010001001","0001011001100010011110101111101000101101000101100010101111011001","0001011001100010011101001011111001111011111100111011110100101001","0001011001100010011011101000001011001010110100010100111001111001","0001011001100010011010000100011100011001101011101101111111001001","0001011001100010011000100000101101101000100011000111000100011001","0001011001100010010110111100111110110111011010100000001001101001","0001011001100010010101011001010000000110010001111001001110111001","0001011001100010010011110101100001010101001001010010010100001001","0001011001100010010010010001110010100100000000101011011001011001","0001011001100010010000101110000011110010111000000100011110101000","0001011001100010001111001010010101000001101111011101100011111001","0001011001100010001101100110100110010000100110110110101001001001","0001011001100010001100000010110111011111011110001111101110011001","0001011001100010001010011111001000101110010101101000110011101001","0001011001100010001000111011011001111101001101000001111000111001","0001011001100010000111010111101011001100000100011010111110001001","0001011001100010000101110011111100011010111011110100000011011001","0001011001100010000100010000001101101001110011001101001000101001","0001011001100010000010101100011110111000101010100110001101111001","0001011001100010000001001000110000000111100001111111010011001001","0001011001100001111111100101000001010110011001011000011000011000","0001011001100001111110000001010010100101010000110001011101101000","0001011001100001111100011101100011110100001000001010100010111001","0001011001100001111010111001110101000010111111100011101000001001","0001011001100001111001010110000110010001110110111100101101011001","0001011001100001110111110010010111100000101110010101110010101001","0001011001100001110110001110101000101111100101101110110111111001","0001011001100001110100101010111001111110011101000111111101001001","0001011001100001110011000111001011001101010100100001000010011001","0001011001100001110001100011011100011100001011111010000111101001","0001011001100001101111111111101101101011000011010011001100111000","0001011001100001101110011011111110111001111010101100010010001000","0001011001100001101100111000010000001000110010000101010111011000","0001011001100001101011010100100001010111101001011110011100101000","0001011001100001101001110000110010100110100000110111100001111001","0001011001100001101000001101000011110101011000010000100111001001","0001011001100001100110101001010101000100001111101001101100011001","0001011001100001100101000101100110010011000111000010110001101001","0001011001100001100011100001110111100001111110011011110110111001","0001011001100001100001111110001000110000110101110100111100001001","0001011001100001100000011010011001111111101101001110000001011001","0001011001100001011110110110101011001110100100100111000110101000","0001011001100001011101010010111100011101011100000000001011111000","0001011001100001011011101111001101101100010011011001010001001000","0001011001100001011010001011011110111011001010110010010110011000","0001011001100001011000100111110000001010000010001011011011101000","0001011001100001010111000100000001011000111001100100100000111001","0001011001100001010101100000010010100111110000111101100110001001","0001011001100001010011111100100011110110101000010110101011011001","0001011001100001010010011000110101000101011111101111110000101001","0001011001100001010000110101000110010100010111001000110101111001","0001011001100001001111010001010111100011001110100001111011001001","0001011001100001001101101101101000110010000101111011000000011000","0001011001100001001100001001111010000000111101010100000101101000","0001011001100001001010100110001011001111110100101101001010111000","0001011001100001001001000010011100011110101100000110010000001000","0001011001100001000111011110101101101101100011011111010101011000","0001011001100001000101111010111110111100011010111000011010101000","0001011001100001000100010111010000001011010010010001011111111000","0001011001100001000010110011100001011010001001101010100101001001","0001011001100001000001001111110010101001000001000011101010011001","0001011001100000111111101100000011110111111000011100101111101001","0001011001100000111110001000010101000110101111110101110100111000","0001011001100000111100100100100110010101100111001110111010001000","0001011001100000111011000000110111100100011110100111111111011000","0001011001100000111001011101001000110011010110000001000100101000","0001011001100000110111111001011010000010001101011010001001111000","0001011001100000110110010101101011010001000100110011001111001000","0001011001100000110100110001111100011111111100001100010100011000","0001011001100000110011001110001101101110110011100101011001101000","0001011001100000110001101010011110111101101010111110011110111000","0001011001100000110000000110110000001100100010010111100100001001","0001011001100000101110100011000001011011011001110000101001011001","0001011001100000101100111111010010101010010001001001101110101000","0001011001100000101011011011100011111001001000100010110011111000","0001011001100000101001110111110101000111111111111011111001001000","0001011001100000101000010100000110010110110111010100111110011000","0001011001100000100110110000010111100101101110101110000011101000","0001011001100000100101001100101000110100100110000111001000111000","0001011001100000100011101000111010000011011101100000001110001000","0001011001100000100010000101001011010010010100111001010011011000","0001011001100000100000100001011100100001001100010010011000101000","0001011001100000011110111101101101110000000011101011011101111000","0001011001100000011101011001111110111110111011000100100011001001","0001011001100000011011110110010000001101110010011101101000011000","0001011001100000011010010010100001011100101001110110101101101000","0001011001100000011000101110110010101011100001001111110010111000","0001011001100000010111001011000011111010011000101000111000001000","0001011001100000010101100111010101001001010000000001111101011000","0001011001100000010100000011100110011000000111011011000010101000","0001011001100000010010011111110111100110111110110100000111111000","0001011001100000010000111100001000110101110110001101001101001000","0001011001100000001111011000011010000100101101100110010010011000","0001011001100000001101110100101011010011100100111111010111101000","0001011001100000001100010000111100100010011100011000011100111000","0001011001100000001010101101001101110001010011110001100010001000","0001011001100000001001001001011111000000001011001010100111011000","0001011001100000000111100101110000001111000010100011101100101000","0001011001100000000110000010000001011101111001111100110001111000","0001011001100000000100011110010010101100110001010101110111001000","0001011001100000000010111010100011111011101000101110111100011000","0001011001100000000001010110110101001010100000001000000001101000","0001011001011111111111100110001100110010101111000010001101101111","0001011001011111111100011110101111010000011101110100011000001111","0001011001011111111001010111010001101110001100100110100010110000","0001011001011111110110001111110100001011111011011000101101010000","0001011001011111110011001000010110101001101010001010110111110000","0001011001011111110000000000111001000111011000111101000010010000","0001011001011111101100111001011011100101000111101111001100101111","0001011001011111101001110001111110000010110110100001010111001111","0001011001011111100110101010100000100000100101010011100001110000","0001011001011111100011100011000010111110010100000101101100010000","0001011001011111100000011011100101011100000010110111110110110000","0001011001011111011101010100000111111001110001101010000001001111","0001011001011111011010001100101010010111100000011100001011101111","0001011001011111010111000101001100110101001111001110010110001111","0001011001011111010011111101101111010010111110000000100000110000","0001011001011111010000110110010001110000101100110010101011010000","0001011001011111001101101110110100001110011011100100110101101111","0001011001011111001010100111010110101100001010010111000000001111","0001011001011111000111011111111001001001111001001001001010101111","0001011001011111000100011000011011100111100111111011010101001111","0001011001011111000001010000111110000101010110101101011111101111","0001011001011110111110001001100000100011000101011111101010010000","0001011001011110111011000010000011000000110100010001110100101111","0001011001011110110111111010100101011110100011000011111111001111","0001011001011110110100110011000111111100010001110110001001101111","0001011001011110110001101011101010011010000000101000010100001111","0001011001011110101110100100001100110111101111011010011110101111","0001011001011110101011011100101111010101011110001100101001001111","0001011001011110101000010101010001110011001100111110110011101111","0001011001011110100101001101110100010000111011110000111110001111","0001011001011110100010000110010110101110101010100011001000101111","0001011001011110011110111110111001001100011001010101010011001111","0001011001011110011011110111011011101010001000000111011101101110","0001011001011110011000101111111110000111110110111001101000001111","0001011001011110010101101000100000100101100101101011110010101111","0001011001011110010010100001000011000011010100011101111101001111","0001011001011110001111011001100101100001000011010000000111101111","0001011001011110001100010010000111111110110010000010010010001111","0001011001011110001001001010101010011100100000110100011100101110","0001011001011110000110000011001100111010001111100110100111001111","0001011001011110000010111011101111010111111110011000110001101111","0001011001011101111111110100010001110101101101001010111100001111","0001011001011101111100101100110100010011011011111101000110101111","0001011001011101111001100101010110110001001010101111010001001110","0001011001011101110110011101111001001110111001100001011011101110","0001011001011101110011010110011011101100101000010011100110001111","0001011001011101110000001110111110001010010111000101110000101111","0001011001011101101101000111100000101000000101110111111011001111","0001011001011101101010000000000011000101110100101010000101101110","0001011001011101100110111000100101100011100011011100010000001110","0001011001011101100011110001001000000001010010001110011010101110","0001011001011101100000101001101010011111000001000000100101001111","0001011001011101011101100010001100111100101111110010101111101111","0001011001011101011010011010101111011010011110100100111010001111","0001011001011101010111010011010001111000001101010111000100101110","0001011001011101010100001011110100010101111100001001001111001110","0001011001011101010001000100010110110011101010111011011001101110","0001011001011101001101111100111001010001011001101101100100001111","0001011001011101001010110101011011101111001000011111101110101111","0001011001011101000111101101111110001100110111010001111001001110","0001011001011101000100100110100000101010100110000100000011101110","0001011001011101000001011111000011001000010100110110001110001110","0001011001011100111110010111100101100110000011101000011000101110","0001011001011100111011010000001000000011110010011010100011001111","0001011001011100111000001000101010100001100001001100101101101110","0001011001011100110101000001001100111111001111111110111000001110","0001011001011100110001111001101111011100111110110001000010101110","0001011001011100101110110010010001111010101101100011001101001110","0001011001011100101011101010110100011000011100010101010111101110","0001011001011100101000100011010110110110001011000111100010001111","0001011001011100100101011011111001010011111001111001101100101110","0001011001011100100010010100011011110001101000101011110111001110","0001011001011100011111001100111110001111010111011110000001101110","0001011001011100011100000101100000101101000110010000001100001110","0001011001011100011000111110000011001010110101000010010110101110","0001011001011100010101110110100101101000100011110100100001001110","0001011001011100010010101111001000000110010010100110101011101110","0001011001011100001111100111101010100100000001011000110110001110","0001011001011100001100100000001101000001110000001011000000101110","0001011001011100001001011000101111011111011110111101001011001110","0001011001011100000110010001010001111101001101101111010101101101","0001011001011100000011001001110100011010111100100001100000001110","0001011001011100000000000010010110111000101011010011101010101110","0001011001011011111100111010111001010110011010000101110101001110","0001011001011011111001110011011011110100001000110111111111101110","0001011001011011110110101011111110010001110111101010001010001101","0001011001011011110011100100100000101111100110011100010100101101","0001011001011011110000011101000011001101010101001110011111001101","0001011001011011101101010101100101101011000100000000101001101110","0001011001011011101010001110001000001000110010110010110100001110","0001011001011011100111000110101010100110100001100100111110101110","0001011001011011100011111111001101000100010000010111001001001101","0001011001011011100000110111101111100001111111001001010011101101","0001011001011011011101110000010001111111101101111011011110001101","0001011001011011011010101000110100011101011100101101101000101110","0001011001011011010111100001010110111011001011011111110011001110","0001011001011011010100011001111001011000111010010001111101101101","0001011001011011010001010010011011110110101001000100001000001101","0001011001011011001110001010111110010100010111110110010010101101","0001011001011011001011000011100000110010000110101000011101001101","0001011001011011000111111100000011001111110101011010100111101110","0001011001011011000100110100100101101101100100001100110010001101","0001011001011011000001101101001000001011010010111110111100101101","0001011001011010111110100101101010101001000001110001000111001101","0001011001011010111011011110001101000110110000100011010001101101","0001011001011010111000010110101111100100011111010101011100001101","0001011001011010110101001111010010000010001110000111100110101110","0001011001011010110010000111110100011111111100111001110001001101","0001011001011010101111000000010110111101101011101011111011101101","0001011001011010101011111000111001011011011010011110000110001101","0001011001011010101000110001011011111001001001010000010000101101","0001011001011010100101101001111110010110111000000010011011001101","0001011001011010100010100010100000110100100110110100100101101101","0001011001011010011111011011000011010010010101100110110000001101","0001011001011010011100010011100101110000000100011000111010101101","0001011001011010011001001100001000001101110011001011000101001101","0001011001011010010110000100101010101011100001111101001111101101","0001011001011010010010111101001101001001010000101111011010001100","0001011001011010001111110101101111100110111111100001100100101101","0001011001011010001100101110010010000100101110010011101111001101","0001011001011010001001100110110100100010011101000101111001101101","0001011001011010000110011111010111000000001011111000000100001101","0001011001011010000011010111111001011101111010101010001110101101","0001011001011010000000010000011011111011101001011100011001001100","0001011001011001111101001000111110011001011000001110100011101101","0001011001011001111010000001100000110111000111000000101110001101","0001011001011001110110111010000011010100110101110010111000101101","0001011001011001110011110010100101110010100100100101000011001101","0001011001011001110000101011001000010000010011010111001101101100","0001011001011001101101100011101010101110000010001001011000001100","0001011001011001101010011100001101001011110000111011100010101101","0001011001011001100111010100101111101001011111101101101101001101","0001011001011001100100001101010010000111001110011111110111101101","0001011001011001100001000101110100100100111101010010000010001100","0001011001011001011101111110010111000010101100000100001100101100","0001011001011001011010110110111001100000011010110110010111001100","0001011001011001010111101111011011111110001001101000100001101101","0001011001011001010100100111111110011011111000011010101100001101","0001011001011001010001100000100000111001100111001100110110101101","0001011001011001001110011001000011010111010101111111000001001100","0001011001011001001011010001100101110101000100110001001011101100","0001011001011001001000001010001000010010110011100011010110001100","0001011001011001000101000010101010110000100010010101100000101101","0001011001011001000001111011001101001110010001000111101011001101","0001011001011000111110110011101111101011111111111001110101101100","0001011001011000111011101100010010001001101110101100000000001100","0001011001011000111000100100110100100111011101011110001010101100","0001011001011000110101011101010111000101001100010000010101001100","0001011001011000110010010101111001100010111011000010011111101100","0001011001011000101111001110011100000000101001110100101010001100","0001011001011000101100000110111110011110011000100110110100101100","0001011001011000101000111111100000111100000111011000111111001100","0001011001011000100101111000000011011001110110001011001001101100","0001011001011000100010110000100101110111100100111101010100001100","0001011001011000011111101001001000010101010011101111011110101100","0001011001011000011100100001101010110011000010100001101001001100","0001011001011000011001011010001101010000110001010011110011101100","0001011001011000010110010010101111101110100000000101111110001100","0001011001011000010011001011010010001100001110111000001000101100","0001011001011000010000000011110100101001111101101010010011001100","0001011001011000001100111100010111000111101100011100011101101011","0001011001011000001001110100111001100101011011001110101000001100","0001011001011000000110101101011100000011001010000000110010101100","0001011001011000000011100101111110100000111000110010111101001100","0001011001011000000000011110100000111110100111100101000111101100","0001011001010111111101010111000011011100010110010111010010001011","0001011001010111111010001111100101111010000101001001011100101011","0001011001010111110111001000001000010111110011111011100111001100","0001011001010111110100000000101010110101100010101101110001101100","0001011001010111110000111001001101010011010001011111111100001100","0001011001010111101101110001101111110001000000010010000110101100","0001011001010111101010101010010010001110101111000100010001001011","0001011001010111100111100010110100101100011101110110011011101011","0001011001010111100100011011010111001010001100101000100110001100","0001011001010111100001010011111001100111111011011010110000101100","0001011001010111011110001100011100000101101010001100111011001100","0001011001010111011011000100111110100011011000111111000101101011","0001011001010111010111111101100001000001000111110001010000001011","0001011001010111010100110110000011011110110110100011011010101011","0001011001010111010001101110100101111100100101010101100101001100","0001011001010111001110100111001000011010010100000111101111101100","0001011001010111001011011111101010111000000010111001111010001011","0001011001010111001000011000001101010101110001101100000100101011","0001011001010111000101010000101111110011100000011110001111001011","0001011001010111000010001001010010010001001111010000011001101011","0001011001010110111111000001110100101110111110000010100100001100","0001011001010110111011111010010111001100101100110100101110101100","0001011001010110111000110010111001101010011011100110111001001011","0001011001010110110101101011011100001000001010011001000011101011","0001011001010110110010100011111110100101111001001011001110001011","0001011001010110101111011100100001000011100111111101011000101011","0001011001010110101100010101000011100001010110101111100011001100","0001011001010110101001001101100101111111000101100001101101101011","0001011001010110100110000110001000011100110100010011111000001011","0001011001010110100010111110101010111010100011000110000010101011","0001011001010110011111110111001101011000010001111000001101001011","0001011001010110011100101111101111110110000000101010010111101011","0001011001010110011001101000010010010011101111011100100010001011","0001011001010110010110100000110100110001011110001110101100101011","0001011001010110010011011001010111001111001101000000110111001011","0001011001010110010000010001111001101100111011110011000001101011","0001011001010110001101001010011100001010101010100101001100001011","0001011001010110001010000010111110101000011001010111010110101010","0001011001010110000110111011100001000110001000001001100001001011","0001011001010110000011110100000011100011110110111011101011101011","0001011001010110000000101100100110000001100101101101110110001011","0001011001010101111101100101001000011111010100100000000000101011","0001011001010101111010011101101010111101000011010010001011001011","0001011001010101110111010110001101011010110010000100010101101010","0001011001010101110100001110101111111000100000110110100000001010","0001011001010101110001000111010010010110001111101000101010101011","0001011001010101101101111111110100110011111110011010110101001011","0001011001010101101010111000010111010001101101001100111111101011","0001011001010101100111110000111001101111011011111111001010001010","0001011001010101100100101001011100001101001010110001010100101010","0001011001010101100001100001111110101010111001100011011111001010","0001011001010101011110011010100001001000101000010101101001101011","0001011001010101011011010011000011100110010111000111110100001011","0001011001010101011000001011100110000100000101111001111110101010","0001011001010101010101000100001000100001110100101100001001001010","0001011001010101010001111100101010111111100011011110010011101010","0001011001010101001110110101001101011101010010010000011110001010","0001011001010101001011101101101111111011000001000010101000101011","0001011001010101001000100110010010011000101111110100110011001011","0001011001010101000101011110110100110110011110100110111101101010","0001011001010101000010010111010111010100001101011001001000001010","0001011001010100111111001111111001110001111100001011010010101010","0001011001010100111100001000011100001111101010111101011101001010","0001011001010100111001000000111110101101011001101111100111101011","0001011001010100110101111001100001001011001000100001110010001010","0001011001010100110010110010000011101000110111010011111100101010","0001011001010100101111101010100110000110100110000110000111001010","0001011001010100101100100011001000100100010100111000010001101010","0001011001010100101001011011101011000010000011101010011100001010","0001011001010100100110010100001101011111110010011100100110101010","0001011001010100100011001100101111111101100001001110110001001010","0001011001010100100000000101010010011011010000000000111011101010","0001011001010100011100111101110100111000111110110011000110001010","0001011001010100011001110110010111010110101101100101010000101010","0001011001010100010110101110111001110100011100010111011011001010","0001011001010100010011100111011100010010001011001001100101101010","0001011001010100010000011111111110101111111001111011110000001010","0001011001010100001101011000100001001101101000101101111010101010","0001011001010100001010010001000011101011010111100000000101001010","0001011001010100000111001001100110001001000110010010001111101010","0001011001010100000100000010001000100110110101000100011010001001","0001011001010100000000111010101011000100100011110110100100101010","0001011001010011111101110011001101100010010010101000101111001010","0001011001010011111010101011110000000000000001011010111001101010","0001011001010011110111100100010010011101110000001101000100001010","0001011001010011110100011100110100111011011110111111001110101001","0001011001010011110001010101010111011001001101110001011001001001","0001011001010011101110001101111001110110111100100011100011101010","0001011001010011101011000110011100010100101011010101101110001010","0001011001010011100111111110111110110010011010000111111000101010","0001011001010011100100110111100001010000001000111010000011001010","0001011001010011100001110000000011101101110111101100001101101001","0001011001010011011110101000100110001011100110011110011000001001","0001011001010011011011100001001000101001010101010000100010101010","0001011001010011011000011001101011000111000100000010101101001010","0001011001010011010101010010001101100100110010110100110111101010","0001011001010011010010001010110000000010100001100111000010001001","0001011001010011001111000011010010100000010000011001001100101001","0001011001010011001011111011110100111101111111001011010111001001","0001011001010011001000110100010111011011101101111101100001101010","0001011001010011000101101100111001111001011100101111101100001010","0001011001010011000010100101011100010111001011100001110110101001","0001011001010010111111011101111110110100111010010100000001001001","0001011001010010111100010110100001010010101001000110001011101001","0001011001010010111001001111000011110000010111111000010110001001","0001011001010010110110000111100110001110000110101010100000101010","0001011001010010110011000000001000101011110101011100101011001010","0001011001010010101111111000101011001001100100001110110101101001","0001011001010010101100110001001101100111010011000001000000001001","0001011001010010101001101001110000000101000001110011001010101001","0001011001010010100110100010010010100010110000100101010101001001","0001011001010010100011011010110101000000011111010111011111101001","0001011001010010100000010011010111011110001110001001101010001001","0001011001010010011101001011111001111011111100111011110100101001","0001011001010010011010000100011100011001101011101101111111001001","0001011001010010010110111100111110110111011010100000001001101001","0001011001010010010011110101100001010101001001010010010100001001","0001011001010010010000101110000011110010111000000100011110101000","0001011001010010001101100110100110010000100110110110101001001001","0001011001010010001010011111001000101110010101101000110011101001","0001011001010010000111010111101011001100000100011010111110001001","0001011001010010000100010000001101101001110011001101001000101001","0001011001010010000001001000110000000111100001111111010011001001","0001011001010001111110000001010010100101010000110001011101101000","0001011001010001111010111001110101000010111111100011101000001001","0001011001010001110111110010010111100000101110010101110010101001","0001011001010001110100101010111001111110011101000111111101001001","0001011001010001110001100011011100011100001011111010000111101001","0001011001010001101110011011111110111001111010101100010010001000","0001011001010001101011010100100001010111101001011110011100101000","0001011001010001101000001101000011110101011000010000100111001001","0001011001010001100101000101100110010011000111000010110001101001","0001011001010001100001111110001000110000110101110100111100001001","0001011001010001011110110110101011001110100100100111000110101000","0001011001010001011011101111001101101100010011011001010001001000","0001011001010001011000100111110000001010000010001011011011101000","0001011001010001010101100000010010100111110000111101100110001001","0001011001010001010010011000110101000101011111101111110000101001","0001011001010001001111010001010111100011001110100001111011001001","0001011001010001001100001001111010000000111101010100000101101000","0001011001010001001001000010011100011110101100000110010000001000","0001011001010001000101111010111110111100011010111000011010101000","0001011001010001000010110011100001011010001001101010100101001001","0001011001010000111111101100000011110111111000011100101111101001","0001011001010000111100100100100110010101100111001110111010001000","0001011001010000111001011101001000110011010110000001000100101000","0001011001010000110110010101101011010001000100110011001111001000","0001011001010000110011001110001101101110110011100101011001101000","0001011001010000110000000110110000001100100010010111100100001001","0001011001010000101100111111010010101010010001001001101110101000","0001011001010000101001110111110101000111111111111011111001001000","0001011001010000100110110000010111100101101110101110000011101000","0001011001010000100011101000111010000011011101100000001110001000","0001011001010000100000100001011100100001001100010010011000101000","0001011001010000011101011001111110111110111011000100100011001001","0001011001010000011010010010100001011100101001110110101101101000","0001011001010000010111001011000011111010011000101000111000001000","0001011001010000010100000011100110011000000111011011000010101000","0001011001010000010000111100001000110101110110001101001101001000","0001011001010000001101110100101011010011100100111111010111101000","0001011001010000001010101101001101110001010011110001100010001000","0001011001010000000111100101110000001111000010100011101100101000","0001011001010000000100011110010010101100110001010101110111001000","0001011001010000000001010110110101001010100000001000000001101000","0001011001001111111100011110101111010000011101110100011000001111","0001011001001111110110001111110100001011111011011000101101010000","0001011001001111110000000000111001000111011000111101000010010000","0001011001001111101001110001111110000010110110100001010111001111","0001011001001111100011100011000010111110010100000101101100010000","0001011001001111011101010100000111111001110001101010000001001111","0001011001001111010111000101001100110101001111001110010110001111","0001011001001111010000110110010001110000101100110010101011010000","0001011001001111001010100111010110101100001010010111000000001111","0001011001001111000100011000011011100111100111111011010101001111","0001011001001110111110001001100000100011000101011111101010010000","0001011001001110110111111010100101011110100011000011111111001111","0001011001001110110001101011101010011010000000101000010100001111","0001011001001110101011011100101111010101011110001100101001001111","0001011001001110100101001101110100010000111011110000111110001111","0001011001001110011110111110111001001100011001010101010011001111","0001011001001110011000101111111110000111110110111001101000001111","0001011001001110010010100001000011000011010100011101111101001111","0001011001001110001100010010000111111110110010000010010010001111","0001011001001110000110000011001100111010001111100110100111001111","0001011001001101111111110100010001110101101101001010111100001111","0001011001001101111001100101010110110001001010101111010001001110","0001011001001101110011010110011011101100101000010011100110001111","0001011001001101101101000111100000101000000101110111111011001111","0001011001001101100110111000100101100011100011011100010000001110","0001011001001101100000101001101010011111000001000000100101001111","0001011001001101011010011010101111011010011110100100111010001111","0001011001001101010100001011110100010101111100001001001111001110","0001011001001101001101111100111001010001011001101101100100001111","0001011001001101000111101101111110001100110111010001111001001110","0001011001001101000001011111000011001000010100110110001110001110","0001011001001100111011010000001000000011110010011010100011001111","0001011001001100110101000001001100111111001111111110111000001110","0001011001001100101110110010010001111010101101100011001101001110","0001011001001100101000100011010110110110001011000111100010001111","0001011001001100100010010100011011110001101000101011110111001110","0001011001001100011100000101100000101101000110010000001100001110","0001011001001100010101110110100101101000100011110100100001001110","0001011001001100001111100111101010100100000001011000110110001110","0001011001001100001001011000101111011111011110111101001011001110","0001011001001100000011001001110100011010111100100001100000001110","0001011001001011111100111010111001010110011010000101110101001110","0001011001001011110110101011111110010001110111101010001010001101","0001011001001011110000011101000011001101010101001110011111001101","0001011001001011101010001110001000001000110010110010110100001110","0001011001001011100011111111001101000100010000010111001001001101","0001011001001011011101110000010001111111101101111011011110001101","0001011001001011010111100001010110111011001011011111110011001110","0001011001001011010001010010011011110110101001000100001000001101","0001011001001011001011000011100000110010000110101000011101001101","0001011001001011000100110100100101101101100100001100110010001101","0001011001001010111110100101101010101001000001110001000111001101","0001011001001010111000010110101111100100011111010101011100001101","0001011001001010110010000111110100011111111100111001110001001101","0001011001001010101011111000111001011011011010011110000110001101","0001011001001010100101101001111110010110111000000010011011001101","0001011001001010011111011011000011010010010101100110110000001101","0001011001001010011001001100001000001101110011001011000101001101","0001011001001010010010111101001101001001010000101111011010001100","0001011001001010001100101110010010000100101110010011101111001101","0001011001001010000110011111010111000000001011111000000100001101","0001011001001010000000010000011011111011101001011100011001001100","0001011001001001111010000001100000110111000111000000101110001101","0001011001001001110011110010100101110010100100100101000011001101","0001011001001001101101100011101010101110000010001001011000001100","0001011001001001100111010100101111101001011111101101101101001101","0001011001001001100001000101110100100100111101010010000010001100","0001011001001001011010110110111001100000011010110110010111001100","0001011001001001010100100111111110011011111000011010101100001101","0001011001001001001110011001000011010111010101111111000001001100","0001011001001001001000001010001000010010110011100011010110001100","0001011001001001000001111011001101001110010001000111101011001101","0001011001001000111011101100010010001001101110101100000000001100","0001011001001000110101011101010111000101001100010000010101001100","0001011001001000101111001110011100000000101001110100101010001100","0001011001001000101000111111100000111100000111011000111111001100","0001011001001000100010110000100101110111100100111101010100001100","0001011001001000011100100001101010110011000010100001101001001100","0001011001001000010110010010101111101110100000000101111110001100","0001011001001000010000000011110100101001111101101010010011001100","0001011001001000001001110100111001100101011011001110101000001100","0001011001001000000011100101111110100000111000110010111101001100","0001011001000111111101010111000011011100010110010111010010001011","0001011001000111110111001000001000010111110011111011100111001100","0001011001000111110000111001001101010011010001011111111100001100","0001011001000111101010101010010010001110101111000100010001001011","0001011001000111100100011011010111001010001100101000100110001100","0001011001000111011110001100011100000101101010001100111011001100","0001011001000111010111111101100001000001000111110001010000001011","0001011001000111010001101110100101111100100101010101100101001100","0001011001000111001011011111101010111000000010111001111010001011","0001011001000111000101010000101111110011100000011110001111001011","0001011001000110111111000001110100101110111110000010100100001100","0001011001000110111000110010111001101010011011100110111001001011","0001011001000110110010100011111110100101111001001011001110001011","0001011001000110101100010101000011100001010110101111100011001100","0001011001000110100110000110001000011100110100010011111000001011","0001011001000110011111110111001101011000010001111000001101001011","0001011001000110011001101000010010010011101111011100100010001011","0001011001000110010011011001010111001111001101000000110111001011","0001011001000110001101001010011100001010101010100101001100001011","0001011001000110000110111011100001000110001000001001100001001011","0001011001000110000000101100100110000001100101101101110110001011","0001011001000101111010011101101010111101000011010010001011001011","0001011001000101110100001110101111111000100000110110100000001010","0001011001000101101101111111110100110011111110011010110101001011","0001011001000101100111110000111001101111011011111111001010001010","0001011001000101100001100001111110101010111001100011011111001010","0001011001000101011011010011000011100110010111000111110100001011","0001011001000101010101000100001000100001110100101100001001001010","0001011001000101001110110101001101011101010010010000011110001010","0001011001000101001000100110010010011000101111110100110011001011","0001011001000101000010010111010111010100001101011001001000001010","0001011001000100111100001000011100001111101010111101011101001010","0001011001000100110101111001100001001011001000100001110010001010","0001011001000100101111101010100110000110100110000110000111001010","0001011001000100101001011011101011000010000011101010011100001010","0001011001000100100011001100101111111101100001001110110001001010","0001011001000100011100111101110100111000111110110011000110001010","0001011001000100010110101110111001110100011100010111011011001010","0001011001000100010000011111111110101111111001111011110000001010","0001011001000100001010010001000011101011010111100000000101001010","0001011001000100000100000010001000100110110101000100011010001001","0001011001000011111101110011001101100010010010101000101111001010","0001011001000011110111100100010010011101110000001101000100001010","0001011001000011110001010101010111011001001101110001011001001001","0001011001000011101011000110011100010100101011010101101110001010","0001011001000011100100110111100001010000001000111010000011001010","0001011001000011011110101000100110001011100110011110011000001001","0001011001000011011000011001101011000111000100000010101101001010","0001011001000011010010001010110000000010100001100111000010001001","0001011001000011001011111011110100111101111111001011010111001001","0001011001000011000101101100111001111001011100101111101100001010","0001011001000010111111011101111110110100111010010100000001001001","0001011001000010111001001111000011110000010111111000010110001001","0001011001000010110011000000001000101011110101011100101011001010","0001011001000010101100110001001101100111010011000001000000001001","0001011001000010100110100010010010100010110000100101010101001001","0001011001000010100000010011010111011110001110001001101010001001","0001011001000010011010000100011100011001101011101101111111001001","0001011001000010010011110101100001010101001001010010010100001001","0001011001000010001101100110100110010000100110110110101001001001","0001011001000010000111010111101011001100000100011010111110001001","0001011001000010000001001000110000000111100001111111010011001001","0001011001000001111010111001110101000010111111100011101000001001","0001011001000001110100101010111001111110011101000111111101001001","0001011001000001101110011011111110111001111010101100010010001000","0001011001000001101000001101000011110101011000010000100111001001","0001011001000001100001111110001000110000110101110100111100001001","0001011001000001011011101111001101101100010011011001010001001000","0001011001000001010101100000010010100111110000111101100110001001","0001011001000001001111010001010111100011001110100001111011001001","0001011001000001001001000010011100011110101100000110010000001000","0001011001000001000010110011100001011010001001101010100101001001","0001011001000000111100100100100110010101100111001110111010001000","0001011001000000110110010101101011010001000100110011001111001000","0001011001000000110000000110110000001100100010010111100100001001","0001011001000000101001110111110101000111111111111011111001001000","0001011001000000100011101000111010000011011101100000001110001000","0001011001000000011101011001111110111110111011000100100011001001","0001011001000000010111001011000011111010011000101000111000001000","0001011001000000010000111100001000110101110110001101001101001000","0001011001000000001010101101001101110001010011110001100010001000","0001011001000000000100011110010010101100110001010101110111001000","0001011000111111111100011110101111010000011101110100011000001111","0001011000111111110000000000111001000111011000111101000010010000","0001011000111111100011100011000010111110010100000101101100010000","0001011000111111010111000101001100110101001111001110010110001111","0001011000111111001010100111010110101100001010010111000000001111","0001011000111110111110001001100000100011000101011111101010010000","0001011000111110110001101011101010011010000000101000010100001111","0001011000111110100101001101110100010000111011110000111110001111","0001011000111110011000101111111110000111110110111001101000001111","0001011000111110001100010010000111111110110010000010010010001111","0001011000111101111111110100010001110101101101001010111100001111","0001011000111101110011010110011011101100101000010011100110001111","0001011000111101100110111000100101100011100011011100010000001110","0001011000111101011010011010101111011010011110100100111010001111","0001011000111101001101111100111001010001011001101101100100001111","0001011000111101000001011111000011001000010100110110001110001110","0001011000111100110101000001001100111111001111111110111000001110","0001011000111100101000100011010110110110001011000111100010001111","0001011000111100011100000101100000101101000110010000001100001110","0001011000111100001111100111101010100100000001011000110110001110","0001011000111100000011001001110100011010111100100001100000001110","0001011000111011110110101011111110010001110111101010001010001101","0001011000111011101010001110001000001000110010110010110100001110","0001011000111011011101110000010001111111101101111011011110001101","0001011000111011010001010010011011110110101001000100001000001101","0001011000111011000100110100100101101101100100001100110010001101","0001011000111010111000010110101111100100011111010101011100001101","0001011000111010101011111000111001011011011010011110000110001101","0001011000111010011111011011000011010010010101100110110000001101","0001011000111010010010111101001101001001010000101111011010001100","0001011000111010000110011111010111000000001011111000000100001101","0001011000111001111010000001100000110111000111000000101110001101","0001011000111001101101100011101010101110000010001001011000001100","0001011000111001100001000101110100100100111101010010000010001100","0001011000111001010100100111111110011011111000011010101100001101","0001011000111001001000001010001000010010110011100011010110001100","0001011000111000111011101100010010001001101110101100000000001100","0001011000111000101111001110011100000000101001110100101010001100","0001011000111000100010110000100101110111100100111101010100001100","0001011000111000010110010010101111101110100000000101111110001100","0001011000111000001001110100111001100101011011001110101000001100","0001011000110111111101010111000011011100010110010111010010001011","0001011000110111110000111001001101010011010001011111111100001100","0001011000110111100100011011010111001010001100101000100110001100","0001011000110111010111111101100001000001000111110001010000001011","0001011000110111001011011111101010111000000010111001111010001011","0001011000110110111111000001110100101110111110000010100100001100","0001011000110110110010100011111110100101111001001011001110001011","0001011000110110100110000110001000011100110100010011111000001011","0001011000110110011001101000010010010011101111011100100010001011","0001011000110110001101001010011100001010101010100101001100001011","0001011000110110000000101100100110000001100101101101110110001011","0001011000110101110100001110101111111000100000110110100000001010","0001011000110101100111110000111001101111011011111111001010001010","0001011000110101011011010011000011100110010111000111110100001011","0001011000110101001110110101001101011101010010010000011110001010","0001011000110101000010010111010111010100001101011001001000001010","0001011000110100110101111001100001001011001000100001110010001010","0001011000110100101001011011101011000010000011101010011100001010","0001011000110100011100111101110100111000111110110011000110001010","0001011000110100010000011111111110101111111001111011110000001010","0001011000110100000100000010001000100110110101000100011010001001","0001011000110011110111100100010010011101110000001101000100001010","0001011000110011101011000110011100010100101011010101101110001010","0001011000110011011110101000100110001011100110011110011000001001","0001011000110011010010001010110000000010100001100111000010001001","0001011000110011000101101100111001111001011100101111101100001010","0001011000110010111001001111000011110000010111111000010110001001","0001011000110010101100110001001101100111010011000001000000001001","0001011000110010100000010011010111011110001110001001101010001001","0001011000110010010011110101100001010101001001010010010100001001","0001011000110010000111010111101011001100000100011010111110001001","0001011000110001111010111001110101000010111111100011101000001001","0001011000110001101110011011111110111001111010101100010010001000","0001011000110001100001111110001000110000110101110100111100001001","0001011000110001010101100000010010100111110000111101100110001001","0001011000110001001001000010011100011110101100000110010000001000","0001011000110000111100100100100110010101100111001110111010001000","0001011000110000110000000110110000001100100010010111100100001001","0001011000110000100011101000111010000011011101100000001110001000","0001011000110000010111001011000011111010011000101000111000001000","0001011000110000001010101101001101110001010011110001100010001000","0001011000101111111100011110101111010000011101110100011000001111","0001011000101111100011100011000010111110010100000101101100010000","0001011000101111001010100111010110101100001010010111000000001111","0001011000101110110001101011101010011010000000101000010100001111","0001011000101110011000101111111110000111110110111001101000001111","0001011000101101111111110100010001110101101101001010111100001111","0001011000101101100110111000100101100011100011011100010000001110","0001011000101101001101111100111001010001011001101101100100001111","0001011000101100110101000001001100111111001111111110111000001110","0001011000101100011100000101100000101101000110010000001100001110","0001011000101100000011001001110100011010111100100001100000001110","0001011000101011101010001110001000001000110010110010110100001110","0001011000101011010001010010011011110110101001000100001000001101","0001011000101010111000010110101111100100011111010101011100001101","0001011000101010011111011011000011010010010101100110110000001101","0001011000101010000110011111010111000000001011111000000100001101","0001011000101001101101100011101010101110000010001001011000001100","0001011000101001010100100111111110011011111000011010101100001101","0001011000101000111011101100010010001001101110101100000000001100","0001011000101000100010110000100101110111100100111101010100001100","0001011000101000001001110100111001100101011011001110101000001100","0001011000100111110000111001001101010011010001011111111100001100","0001011000100111010111111101100001000001000111110001010000001011","0001011000100110111111000001110100101110111110000010100100001100","0001011000100110100110000110001000011100110100010011111000001011","0001011000100110001101001010011100001010101010100101001100001011","0001011000100101110100001110101111111000100000110110100000001010","0001011000100101011011010011000011100110010111000111110100001011","0001011000100101000010010111010111010100001101011001001000001010","0001011000100100101001011011101011000010000011101010011100001010","0001011000100100010000011111111110101111111001111011110000001010","0001011000100011110111100100010010011101110000001101000100001010","0001011000100011011110101000100110001011100110011110011000001001","0001011000100011000101101100111001111001011100101111101100001010","0001011000100010101100110001001101100111010011000001000000001001","0001011000100010010011110101100001010101001001010010010100001001","0001011000100001111010111001110101000010111111100011101000001001","0001011000100001100001111110001000110000110101110100111100001001","0001011000100001001001000010011100011110101100000110010000001000","0001011000100000110000000110110000001100100010010111100100001001","0001011000100000010111001011000011111010011000101000111000001000","0001011000011111111100011110101111010000011101110100011000001111","0001011000011111001010100111010110101100001010010111000000001111","0001011000011110011000101111111110000111110110111001101000001111","0001011000011101100110111000100101100011100011011100010000001110","0001011000011100110101000001001100111111001111111110111000001110","0001011000011100000011001001110100011010111100100001100000001110","0001011000011011010001010010011011110110101001000100001000001101","0001011000011010011111011011000011010010010101100110110000001101","0001011000011001101101100011101010101110000010001001011000001100","0001011000011000111011101100010010001001101110101100000000001100","0001011000011000001001110100111001100101011011001110101000001100","0001011000010111010111111101100001000001000111110001010000001011","0001011000010110100110000110001000011100110100010011111000001011","0001011000010101110100001110101111111000100000110110100000001010","0001011000010101000010010111010111010100001101011001001000001010","0001011000010100010000011111111110101111111001111011110000001010","0001011000010011011110101000100110001011100110011110011000001001","0001011000010010101100110001001101100111010011000001000000001001","0001011000010001111010111001110101000010111111100011101000001001","0001011000010001001001000010011100011110101100000110010000001000","0001011000010000010111001011000011111010011000101000111000001000","0001011000001111001010100111010110101100001010010111000000001111","0001011000001101100110111000100101100011100011011100010000001110","0001011000001100000011001001110100011010111100100001100000001110","0001011000001010011111011011000011010010010101100110110000001101","0001011000001000111011101100010010001001101110101100000000001100","0001011000000111010111111101100001000001000111110001010000001011","0001011000000101110100001110101111111000100000110110100000001010","0001011000000100010000011111111110101111111001111011110000001010","0001011000000010101100110001001101100111010011000001000000001001","0001011000000001001001000010011100011110101100000110010000001000","0001010111111111001010100111010110101100001010010111000000001111","0001010111111100000011001001110100011010111100100001100000001110","0001010111111000111011101100010010001001101110101100000000001100","0001010111110101110100001110101111111000100000110110100000001010","0001010111110010101100110001001101100111010011000001000000001001","0001010111101111001010100111010110101100001010010111000000001111","0001010111101000111011101100010010001001101110101100000000001100","0001010111100010101100110001001101100111010011000001000000001001","0001010111011000111011101100010010001001101110101100000000001100","0001010111001000111011101100010010001001101110101100000000001100","0000000000000111001100001101011001111000000110011110100011010010"],"x":[1.0e-200,9.990059642147117e-201,9.980119284294234e-201,9.970178926441352e-201,9.960238568588469e-201,9.950298210735586e-201,9.940357852882704e-201,9.930417495029821e-201,9.920477137176938e-201,9.910536779324056e-201,9.900596421471173e-201,9.890656063618289e-201,9.880715705765406e-201,9.870775347912525e-201,9.860834990059642e-201,9.85089463220676e-201,9.840954274353877e-201,9.831013916500994e-201,9.821073558648111e-201,9.811133200795229e-201,9.801192842942346e-201,9.791252485089463e-201,9.781312127236579e-201,9.771371769383697e-201,9.761431411530814e-201,9.751491053677933e-201,9.74155069582505e-201,9.731610337972167e-201,9.721669980119285e-201,9.711729622266402e-201,9.701789264413519e-201,9.691848906560637e-201,9.681908548707754e-201,9.67196819085487e-201,9.662027833001987e-201,9.652087475149104e-201,9.642147117296222e-201,9.63220675944334e-201,9.622266401590458e-201,9.612326043737575e-201,9.602385685884692e-201,9.59244532803181e-201,9.582504970178927e-201,9.572564612326043e-201,9.56262425447316e-201,9.552683896620277e-201,9.542743538767395e-201,9.532803180914512e-201,9.52286282306163e-201,9.512922465208747e-201,9.502982107355866e-201,9.493041749502983e-201,9.4831013916501e-201,9.473161033797217e-201,9.463220675944333e-201,9.45328031809145e-201,9.443339960238568e-201,9.433399602385685e-201,9.423459244532803e-201,9.41351888667992e-201,9.403578528827037e-201,9.393638170974155e-201,9.383697813121273e-201,9.37375745526839e-201,9.363817097415508e-201,9.353876739562624e-201,9.343936381709741e-201,9.333996023856858e-201,9.324055666003976e-201,9.314115308151093e-201,9.30417495029821e-201,9.294234592445328e-201,9.284294234592445e-201,9.274353876739562e-201,9.264413518886681e-201,9.254473161033797e-201,9.244532803180914e-201,9.234592445328032e-201,9.224652087475149e-201,9.214711729622266e-201,9.204771371769383e-201,9.194831013916501e-201,9.184890656063618e-201,9.174950298210735e-201,9.165009940357853e-201,9.15506958250497e-201,9.145129224652087e-201,9.135188866799205e-201,9.125248508946322e-201,9.11530815109344e-201,9.105367793240557e-201,9.095427435387674e-201,9.085487077534791e-201,9.075546719681909e-201,9.065606361829026e-201,9.055666003976143e-201,9.045725646123259e-201,9.035785288270376e-201,9.025844930417495e-201,9.015904572564612e-201,9.00596421471173e-201,8.996023856858847e-201,8.986083499005964e-201,8.976143141153082e-201,8.966202783300199e-201,8.956262425447316e-201,8.946322067594434e-201,8.93638170974155e-201,8.926441351888667e-201,8.916500994035784e-201,8.906560636182901e-201,8.89662027833002e-201,8.886679920477138e-201,8.876739562624255e-201,8.866799204771372e-201,8.85685884691849e-201,8.846918489065607e-201,8.836978131212724e-201,8.82703777335984e-201,8.817097415506957e-201,8.807157057654075e-201,8.797216699801192e-201,8.787276341948309e-201,8.777335984095428e-201,8.767395626242545e-201,8.757455268389663e-201,8.74751491053678e-201,8.737574552683897e-201,8.727634194831013e-201,8.71769383697813e-201,8.707753479125248e-201,8.697813121272365e-201,8.687872763419482e-201,8.6779324055666e-201,8.667992047713717e-201,8.658051689860836e-201,8.648111332007953e-201,8.63817097415507e-201,8.628230616302188e-201,8.618290258449304e-201,8.608349900596421e-201,8.598409542743538e-201,8.588469184890655e-201,8.578528827037773e-201,8.56858846918489e-201,8.558648111332007e-201,8.548707753479125e-201,8.538767395626243e-201,8.528827037773361e-201,8.518886679920478e-201,8.508946322067594e-201,8.499005964214711e-201,8.489065606361829e-201,8.479125248508946e-201,8.469184890656063e-201,8.45924453280318e-201,8.449304174950298e-201,8.439363817097415e-201,8.429423459244532e-201,8.419483101391651e-201,8.409542743538767e-201,8.399602385685884e-201,8.389662027833002e-201,8.379721669980119e-201,8.369781312127236e-201,8.359840954274354e-201,8.349900596421471e-201,8.339960238568588e-201,8.330019880715706e-201,8.320079522862823e-201,8.31013916500994e-201,8.300198807157058e-201,8.290258449304175e-201,8.280318091451292e-201,8.27037773359841e-201,8.260437375745527e-201,8.250497017892644e-201,8.240556660039761e-201,8.230616302186879e-201,8.220675944333996e-201,8.210735586481113e-201,8.20079522862823e-201,8.190854870775347e-201,8.180914512922464e-201,8.170974155069583e-201,8.1610337972167e-201,8.151093439363817e-201,8.141153081510935e-201,8.131212723658052e-201,8.121272365805169e-201,8.111332007952287e-201,8.101391650099404e-201,8.09145129224652e-201,8.081510934393637e-201,8.071570576540754e-201,8.061630218687872e-201,8.05168986083499e-201,8.041749502982108e-201,8.031809145129225e-201,8.021868787276342e-201,8.01192842942346e-201,8.001988071570577e-201,7.992047713717694e-201,7.98210735586481e-201,7.972166998011927e-201,7.962226640159045e-201,7.952286282306162e-201,7.94234592445328e-201,7.932405566600398e-201,7.922465208747515e-201,7.912524850894633e-201,7.90258449304175e-201,7.892644135188867e-201,7.882703777335985e-201,7.8727634194831e-201,7.862823061630218e-201,7.852882703777335e-201,7.842942345924453e-201,7.83300198807157e-201,7.823061630218687e-201,7.813121272365806e-201,7.803180914512923e-201,7.79324055666004e-201,7.783300198807158e-201,7.773359840954274e-201,7.763419483101391e-201,7.753479125248508e-201,7.743538767395626e-201,7.733598409542743e-201,7.72365805168986e-201,7.713717693836978e-201,7.703777335984095e-201,7.693836978131214e-201,7.683896620278331e-201,7.673956262425448e-201,7.664015904572564e-201,7.654075546719682e-201,7.644135188866799e-201,7.634194831013916e-201,7.624254473161033e-201,7.614314115308151e-201,7.604373757455268e-201,7.594433399602385e-201,7.584493041749503e-201,7.57455268389662e-201,7.564612326043739e-201,7.554671968190855e-201,7.544731610337972e-201,7.534791252485089e-201,7.524850894632207e-201,7.514910536779324e-201,7.504970178926441e-201,7.495029821073559e-201,7.485089463220676e-201,7.475149105367793e-201,7.46520874751491e-201,7.455268389662026e-201,7.445328031809145e-201,7.435387673956262e-201,7.42544731610338e-201,7.415506958250497e-201,7.405566600397614e-201,7.395626242544732e-201,7.385685884691849e-201,7.375745526838966e-201,7.365805168986084e-201,7.355864811133201e-201,7.345924453280317e-201,7.335984095427434e-201,7.326043737574553e-201,7.31610337972167e-201,7.306163021868787e-201,7.296222664015905e-201,7.286282306163022e-201,7.27634194831014e-201,7.266401590457257e-201,7.256461232604374e-201,7.24652087475149e-201,7.236580516898607e-201,7.226640159045725e-201,7.216699801192842e-201,7.20675944333996e-201,7.196819085487078e-201,7.186878727634195e-201,7.176938369781313e-201,7.16699801192843e-201,7.157057654075547e-201,7.147117296222665e-201,7.13717693836978e-201,7.127236580516898e-201,7.117296222664015e-201,7.107355864811132e-201,7.09741550695825e-201,7.087475149105368e-201,7.077534791252486e-201,7.067594433399603e-201,7.05765407554672e-201,7.047713717693838e-201,7.037773359840955e-201,7.027833001988071e-201,7.017892644135188e-201,7.007952286282305e-201,6.998011928429423e-201,6.98807157057654e-201,6.978131212723657e-201,6.968190854870775e-201,6.958250497017893e-201,6.948310139165011e-201,6.938369781312128e-201,6.928429423459244e-201,6.918489065606361e-201,6.908548707753479e-201,6.898608349900596e-201,6.888667992047713e-201,6.87872763419483e-201,6.868787276341948e-201,6.858846918489065e-201,6.848906560636182e-201,6.838966202783301e-201,6.829025844930419e-201,6.819085487077534e-201,6.809145129224652e-201,6.799204771371769e-201,6.789264413518886e-201,6.779324055666004e-201,6.769383697813121e-201,6.759443339960238e-201,6.749502982107356e-201,6.739562624254473e-201,6.72962226640159e-201,6.719681908548709e-201,6.709741550695825e-201,6.699801192842942e-201,6.68986083499006e-201,6.679920477137177e-201,6.669980119284294e-201,6.660039761431411e-201,6.650099403578529e-201,6.640159045725646e-201,6.630218687872763e-201,6.62027833001988e-201,6.610337972166998e-201,6.600397614314115e-201,6.590457256461233e-201,6.58051689860835e-201,6.570576540755467e-201,6.560636182902585e-201,6.550695825049702e-201,6.540755467196819e-201,6.530815109343936e-201,6.520874751491053e-201,6.510934393638171e-201,6.5009940357852884e-201,6.491053677932406e-201,6.481113320079523e-201,6.47117296222664e-201,6.461232604373757e-201,6.451292246520875e-201,6.441351888667992e-201,6.43141153081511e-201,6.421471172962226e-201,6.4115308151093435e-201,6.401590457256461e-201,6.391650099403579e-201,6.381709741550696e-201,6.371769383697813e-201,6.36182902584493e-201,6.3518886679920474e-201,6.341948310139165e-201,6.332007952286282e-201,6.3220675944334e-201,6.312127236580517e-201,6.302186878727634e-201,6.292246520874751e-201,6.2823061630218686e-201,6.272365805168986e-201,6.262425447316103e-201,6.2524850894632206e-201,6.242544731610338e-201,6.232604373757455e-201,6.2226640159045725e-201,6.212723658051689e-201,6.202783300198807e-201,6.1928429423459244e-201,6.182902584493042e-201,6.172962226640159e-201,6.1630218687872764e-201,6.153081510934393e-201,6.143141153081511e-201,6.133200795228628e-201,6.123260437375746e-201,6.113320079522863e-201,6.1033797216699795e-201,6.093439363817097e-201,6.083499005964215e-201,6.073558648111332e-201,6.0636182902584495e-201,6.053677932405566e-201,6.0437375745526834e-201,6.033797216699801e-201,6.023856858846919e-201,6.013916500994036e-201,6.0039761431411534e-201,5.99403578528827e-201,5.984095427435387e-201,5.9741550695825046e-201,5.964214711729623e-201,5.95427435387674e-201,5.9443339960238566e-201,5.934393638170974e-201,5.924453280318091e-201,5.9145129224652085e-201,5.9045725646123265e-201,5.894632206759443e-201,5.8846918489065604e-201,5.874751491053678e-201,5.864811133200795e-201,5.8548707753479124e-201,5.8449304174950304e-201,5.834990059642147e-201,5.825049701789264e-201,5.8151093439363816e-201,5.805168986083499e-201,5.795228628230616e-201,5.7852882703777336e-201,5.775347912524851e-201,5.765407554671968e-201,5.7554671968190855e-201,5.745526838966203e-201,5.7355864811133194e-201,5.7256461232604375e-201,5.715705765407555e-201,5.705765407554672e-201,5.6958250497017894e-201,5.685884691848906e-201,5.675944333996023e-201,5.6660039761431406e-201,5.656063618290259e-201,5.646123260437376e-201,5.636182902584493e-201,5.62624254473161e-201,5.616302186878727e-201,5.6063618290258445e-201,5.5964214711729625e-201,5.58648111332008e-201,5.5765407554671964e-201,5.566600397614314e-201,5.556660039761431e-201,5.5467196819085484e-201,5.5367793240556664e-201,5.526838966202783e-201,5.5168986083499e-201,5.5069582504970176e-201,5.497017892644135e-201,5.487077534791252e-201,5.47713717693837e-201,5.467196819085487e-201,5.457256461232604e-201,5.4473161033797215e-201,5.437375745526839e-201,5.427435387673956e-201,5.4174950298210735e-201,5.407554671968191e-201,5.397614314115308e-201,5.3876739562624254e-201,5.377733598409543e-201,5.367793240556659e-201,5.357852882703777e-201,5.347912524850895e-201,5.337972166998012e-201,5.328031809145129e-201,5.3180914512922466e-201,5.308151093439363e-201,5.298210735586481e-201,5.2882703777335985e-201,5.278330019880716e-201,5.268389662027833e-201,5.25844930417495e-201,5.248508946322067e-201,5.238568588469185e-201,5.2286282306163024e-201,5.21868787276342e-201,5.208747514910536e-201,5.1988071570576536e-201,5.188866799204771e-201,5.178926441351889e-201,5.168986083499006e-201,5.1590457256461236e-201,5.14910536779324e-201,5.1391650099403575e-201,5.129224652087475e-201,5.119284294234593e-201,5.10934393638171e-201,5.099403578528827e-201,5.089463220675944e-201,5.0795228628230614e-201,5.069582504970179e-201,5.059642147117296e-201,5.049701789264413e-201,5.039761431411531e-201,5.029821073558648e-201,5.019880715705765e-201,5.0099403578528826e-201,5.0e-201,4.990059642147117e-201,4.9801192842942345e-201,4.970178926441352e-201,4.960238568588469e-201,4.9502982107355865e-201,4.940357852882703e-201,4.930417495029821e-201,4.9204771371769384e-201,4.910536779324056e-201,4.900596421471173e-201,4.8906560636182896e-201,4.880715705765407e-201,4.870775347912525e-201,4.860834990059642e-201,4.8508946322067596e-201,4.840954274353877e-201,4.8310139165009935e-201,4.821073558648111e-201,4.811133200795229e-201,4.801192842942346e-201,4.7912524850894635e-201,4.78131212723658e-201,4.7713717693836974e-201,4.761431411530815e-201,4.751491053677933e-201,4.74155069582505e-201,4.731610337972167e-201,4.721669980119284e-201,4.711729622266401e-201,4.7017892644135186e-201,4.6918489065606366e-201,4.681908548707754e-201,4.6719681908548705e-201,4.662027833001988e-201,4.652087475149105e-201,4.6421471172962225e-201,4.6322067594433405e-201,4.622266401590457e-201,4.6123260437375744e-201,4.602385685884692e-201,4.592445328031809e-201,4.582504970178926e-201,4.572564612326044e-201,4.562624254473161e-201,4.552683896620278e-201,4.5427435387673956e-201,4.532803180914513e-201,4.5228628230616295e-201,4.5129224652087476e-201,4.502982107355865e-201,4.493041749502982e-201,4.4831013916500995e-201,4.473161033797217e-201,4.4632206759443334e-201,4.453280318091451e-201,4.443339960238569e-201,4.433399602385686e-201,4.4234592445328034e-201,4.41351888667992e-201,4.403578528827037e-201,4.3936381709741546e-201,4.3836978131212726e-201,4.37375745526839e-201,4.3638170974155065e-201,4.353876739562624e-201,4.343936381709741e-201,4.3339960238568585e-201,4.3240556660039765e-201,4.314115308151094e-201,4.3041749502982104e-201,4.294234592445328e-201,4.284294234592445e-201,4.274353876739562e-201,4.2644135188866804e-201,4.254473161033797e-201,4.244532803180914e-201,4.2345924453280316e-201,4.224652087475149e-201,4.214711729622266e-201,4.2047713717693836e-201,4.194831013916501e-201,4.184890656063618e-201,4.1749502982107355e-201,4.165009940357853e-201,4.15506958250497e-201,4.1451292246520874e-201,4.135188866799205e-201,4.125248508946322e-201,4.1153081510934394e-201,4.105367793240557e-201,4.095427435387673e-201,4.085487077534791e-201,4.0755467196819086e-201,4.065606361829026e-201,4.055666003976143e-201,4.04572564612326e-201,4.035785288270377e-201,4.025844930417495e-201,4.0159045725646125e-201,4.00596421471173e-201,3.996023856858847e-201,3.986083499005964e-201,3.976143141153081e-201,3.966202783300199e-201,3.9562624254473164e-201,3.946322067594434e-201,3.93638170974155e-201,3.9264413518886676e-201,3.916500994035785e-201,3.906560636182903e-201,3.89662027833002e-201,3.886679920477137e-201,3.876739562624254e-201,3.8667992047713715e-201,3.856858846918489e-201,3.846918489065607e-201,3.836978131212724e-201,3.827037773359841e-201,3.817097415506958e-201,3.8071570576540754e-201,3.797216699801193e-201,3.78727634194831e-201,3.777335984095427e-201,3.7673956262425446e-201,3.757455268389662e-201,3.747514910536779e-201,3.7375745526838966e-201,3.727634194831013e-201,3.717693836978131e-201,3.7077534791252485e-201,3.697813121272366e-201,3.687872763419483e-201,3.6779324055666005e-201,3.667992047713717e-201,3.658051689860835e-201,3.6481113320079524e-201,3.63817097415507e-201,3.628230616302187e-201,3.6182902584493036e-201,3.608349900596421e-201,3.598409542743539e-201,3.588469184890656e-201,3.5785288270377736e-201,3.56858846918489e-201,3.5586481113320075e-201,3.548707753479125e-201,3.538767395626243e-201,3.52882703777336e-201,3.5188866799204775e-201,3.508946322067594e-201,3.4990059642147114e-201,3.489065606361829e-201,3.479125248508947e-201,3.469184890656064e-201,3.4592445328031806e-201,3.449304174950298e-201,3.439363817097415e-201,3.4294234592445326e-201,3.4194831013916506e-201,3.409542743538767e-201,3.3996023856858845e-201,3.389662027833002e-201,3.379721669980119e-201,3.3697813121272365e-201,3.3598409542743545e-201,3.349900596421471e-201,3.3399602385685884e-201,3.330019880715706e-201,3.320079522862823e-201,3.31013916500994e-201,3.300198807157058e-201,3.290258449304175e-201,3.280318091451292e-201,3.2703777335984096e-201,3.2604373757455265e-201,3.2504970178926442e-201,3.2405566600397615e-201,3.2306163021868785e-201,3.220675944333996e-201,3.210735586481113e-201,3.2007952286282304e-201,3.190854870775348e-201,3.180914512922465e-201,3.1709741550695824e-201,3.1610337972167e-201,3.151093439363817e-201,3.1411530815109343e-201,3.1312127236580516e-201,3.121272365805169e-201,3.1113320079522863e-201,3.1013916500994036e-201,3.091451292246521e-201,3.0815109343936382e-201,3.0715705765407555e-201,3.061630218687873e-201,3.0516898608349898e-201,3.0417495029821074e-201,3.0318091451292248e-201,3.0218687872763417e-201,3.0119284294234594e-201,3.0019880715705767e-201,2.9920477137176937e-201,2.9821073558648113e-201,2.9721669980119283e-201,2.9622266401590456e-201,2.9522862823061633e-201,2.9423459244532802e-201,2.9324055666003975e-201,2.9224652087475152e-201,2.912524850894632e-201,2.9025844930417495e-201,2.8926441351888668e-201,2.882703777335984e-201,2.8727634194831014e-201,2.8628230616302187e-201,2.852882703777336e-201,2.842942345924453e-201,2.8330019880715703e-201,2.823061630218688e-201,2.813121272365805e-201,2.8031809145129222e-201,2.79324055666004e-201,2.783300198807157e-201,2.7733598409542742e-201,2.7634194831013915e-201,2.7534791252485088e-201,2.743538767395626e-201,2.7335984095427434e-201,2.7236580516898608e-201,2.713717693836978e-201,2.7037773359840954e-201,2.6938369781312127e-201,2.6838966202783297e-201,2.6739562624254473e-201,2.6640159045725646e-201,2.6540755467196816e-201,2.6441351888667993e-201,2.6341948310139166e-201,2.6242544731610335e-201,2.6143141153081512e-201,2.604373757455268e-201,2.5944333996023855e-201,2.584493041749503e-201,2.57455268389662e-201,2.5646123260437374e-201,2.554671968190855e-201,2.544731610337972e-201,2.5347912524850894e-201,2.5248508946322067e-201,2.514910536779324e-201,2.5049701789264413e-201,2.4950298210735586e-201,2.485089463220676e-201,2.4751491053677932e-201,2.4652087475149106e-201,2.455268389662028e-201,2.4453280318091448e-201,2.4353876739562625e-201,2.4254473161033798e-201,2.4155069582504968e-201,2.4055666003976144e-201,2.3956262425447317e-201,2.3856858846918487e-201,2.3757455268389664e-201,2.3658051689860833e-201,2.3558648111332006e-201,2.3459244532803183e-201,2.3359840954274353e-201,2.3260437375745526e-201,2.3161033797216703e-201,2.3061630218687872e-201,2.2962226640159045e-201,2.286282306163022e-201,2.276341948310139e-201,2.2664015904572565e-201,2.2564612326043738e-201,2.246520874751491e-201,2.2365805168986084e-201,2.2266401590457254e-201,2.216699801192843e-201,2.20675944333996e-201,2.1968190854870773e-201,2.186878727634195e-201,2.176938369781312e-201,2.1669980119284292e-201,2.157057654075547e-201,2.147117296222664e-201,2.137176938369781e-201,2.1272365805168985e-201,2.1172962226640158e-201,2.107355864811133e-201,2.0974155069582504e-201,2.0874751491053677e-201,2.077534791252485e-201,2.0675944333996024e-201,2.0576540755467197e-201,2.0477137176938366e-201,2.0377733598409543e-201,2.0278330019880716e-201,2.0178926441351886e-201,2.0079522862823063e-201,1.9980119284294236e-201,1.9880715705765405e-201,1.9781312127236582e-201,1.968190854870775e-201,1.9582504970178925e-201,1.94831013916501e-201,1.938369781312127e-201,1.9284294234592444e-201,1.918489065606362e-201,1.908548707753479e-201,1.8986083499005963e-201,1.8886679920477137e-201,1.878727634194831e-201,1.8687872763419483e-201,1.8588469184890656e-201,1.848906560636183e-201,1.8389662027833002e-201,1.8290258449304175e-201,1.819085487077535e-201,1.8091451292246518e-201,1.7992047713717695e-201,1.7892644135188868e-201,1.7793240556660037e-201,1.7693836978131214e-201,1.7594433399602387e-201,1.7495029821073557e-201,1.7395626242544734e-201,1.7296222664015903e-201,1.7196819085487076e-201,1.7097415506958253e-201,1.6998011928429423e-201,1.6898608349900596e-201,1.6799204771371772e-201,1.6699801192842942e-201,1.6600397614314115e-201,1.650099403578529e-201,1.640159045725646e-201,1.6302186878727633e-201,1.6202783300198808e-201,1.610337972166998e-201,1.6003976143141152e-201,1.5904572564612325e-201,1.58051689860835e-201,1.5705765407554672e-201,1.5606361829025845e-201,1.5506958250497018e-201,1.5407554671968191e-201,1.5308151093439364e-201,1.5208747514910537e-201,1.5109343936381709e-201,1.5009940357852884e-201,1.4910536779324057e-201,1.4811133200795228e-201,1.4711729622266401e-201,1.4612326043737576e-201,1.4512922465208747e-201,1.441351888667992e-201,1.4314115308151094e-201,1.4214711729622265e-201,1.411530815109344e-201,1.4015904572564611e-201,1.3916500994035784e-201,1.3817097415506958e-201,1.371769383697813e-201,1.3618290258449304e-201,1.3518886679920477e-201,1.3419483101391648e-201,1.3320079522862823e-201,1.3220675944333996e-201,1.3121272365805168e-201,1.302186878727634e-201,1.2922465208747516e-201,1.2823061630218687e-201,1.272365805168986e-201,1.2624254473161033e-201,1.2524850894632206e-201,1.242544731610338e-201,1.2326043737574553e-201,1.2226640159045724e-201,1.2127236580516899e-201,1.2027833001988072e-201,1.1928429423459244e-201,1.1829025844930417e-201,1.1729622266401592e-201,1.1630218687872763e-201,1.1530815109343936e-201,1.143141153081511e-201,1.1332007952286282e-201,1.1232604373757455e-201,1.1133200795228627e-201,1.10337972166998e-201,1.0934393638170975e-201,1.0834990059642146e-201,1.073558648111332e-201,1.0636182902584492e-201,1.0536779324055666e-201,1.0437375745526839e-201,1.0337972166998012e-201,1.0238568588469183e-201,1.0139165009940358e-201,1.0039761431411531e-201,9.940357852882703e-202,9.840954274353876e-202,9.74155069582505e-202,9.642147117296222e-202,9.542743538767395e-202,9.443339960238568e-202,9.343936381709741e-202,9.244532803180915e-202,9.145129224652088e-202,9.045725646123259e-202,8.946322067594434e-202,8.846918489065607e-202,8.747514910536778e-202,8.648111332007952e-202,8.548707753479127e-202,8.449304174950298e-202,8.349900596421471e-202,8.250497017892644e-202,8.151093439363816e-202,8.05168986083499e-202,7.952286282306163e-202,7.852882703777336e-202,7.753479125248509e-202,7.654075546719682e-202,7.554671968190854e-202,7.455268389662028e-202,7.355864811133201e-202,7.256461232604374e-202,7.157057654075547e-202,7.05765407554672e-202,6.958250497017892e-202,6.858846918489065e-202,6.7594433399602385e-202,6.660039761431412e-202,6.560636182902584e-202,6.461232604373758e-202,6.36182902584493e-202,6.262425447316103e-202,6.163021868787276e-202,6.0636182902584495e-202,5.964214711729622e-202,5.864811133200796e-202,5.765407554671968e-202,5.666003976143141e-202,5.566600397614313e-202,5.467196819085487e-202,5.36779324055666e-202,5.268389662027833e-202,5.168986083499006e-202,5.069582504970179e-202,4.970178926441351e-202,4.870775347912525e-202,4.771371769383698e-202,4.671968190854871e-202,4.572564612326044e-202,4.473161033797217e-202,4.373757455268389e-202,4.274353876739563e-202,4.1749502982107355e-202,4.075546719681908e-202,3.9761431411530813e-202,3.8767395626242545e-202,3.777335984095427e-202,3.6779324055666003e-202,3.5785288270377734e-202,3.479125248508946e-202,3.3797216699801192e-202,3.280318091451292e-202,3.180914512922465e-202,3.081510934393638e-202,2.982107355864811e-202,2.882703777335984e-202,2.7833001988071567e-202,2.68389662027833e-202,2.584493041749503e-202,2.4850894632206757e-202,2.385685884691849e-202,2.286282306163022e-202,2.1868787276341946e-202,2.0874751491053677e-202,1.9880715705765407e-202,1.8886679920477136e-202,1.7892644135188867e-202,1.6898608349900596e-202,1.5904572564612325e-202,1.4910536779324054e-202,1.3916500994035783e-202,1.2922465208747515e-202,1.1928429423459244e-202,1.0934393638170973e-202,9.940357852882703e-203,8.946322067594434e-203,7.952286282306163e-203,6.958250497017892e-203,5.964214711729622e-203,4.9701789264413516e-203,3.9761431411530813e-203,2.982107355864811e-203,1.9880715705765407e-203,9.940357852882703e-204,1.0e-308]}
},{}],61:[function(require,module,exports){
module.exports={"expected":["0000000000001000000011011011110100000001011001001011001011010111","0000000000001000000010111011000001011001001011110110100111100010","0000000000001000000010011010001110110000111110100010000011101101","0000000000001000000001111001011100001000110001001101011111111000","0000000000001000000001011000101001100000100011111000111100000011","0000000000001000000000110111110110111000010110100100011000001110","0000000000001000000000010111000100010000001001001111110100011001","0000000000000111111111110110010001100111111011111011010000100100","0000000000000111111111010101011110111111101110100110101100101111","0000000000000111111110110100101100010111100001010010001000111010","0000000000000111111110010011111001101111010011111101100101000101","0000000000000111111101110011000111000111000110101001000001010000","0000000000000111111101010010010100011110111001010100011101011011","0000000000000111111100110001100001110110101011111111111001100110","0000000000000111111100010000101111001110011110101011010101110001","0000000000000111111011101111111100100110010001010110110001111100","0000000000000111111011001111001001111110000100000010001110000111","0000000000000111111010101110010111010101110110101101101010010010","0000000000000111111010001101100100101101101001011001000110011101","0000000000000111111001101100110010000101011100000100100010101000","0000000000000111111001001011111111011101001110101111111110110011","0000000000000111111000101011001100110101000001011011011010111110","0000000000000111111000001010011010001100110100000110110111001001","0000000000000111110111101001100111100100100110110010010011010100","0000000000000111110111001000110100111100011001011101101111011111","0000000000000111110110101000000010010100001100001001001011101010","0000000000000111110110000111001111101011111110110100100111110101","0000000000000111110101100110011101000011110001100000000011111111","0000000000000111110101000101101010011011100100001011100000001010","0000000000000111110100100100110111110011010110110110111100010110","0000000000000111110100000100000101001011001001100010011000100001","0000000000000111110011100011010010100010111100001101110100101100","0000000000000111110011000010011111111010101110111001010000110110","0000000000000111110010100001101101010010100001100100101101000001","0000000000000111110010000000111010101010010100010000001001001100","0000000000000111110001100000001000000010000110111011100101010111","0000000000000111110000111111010101011001111001100111000001100010","0000000000000111110000011110100010110001101100010010011101101101","0000000000000111101111111101110000001001011110111101111001111000","0000000000000111101111011100111101100001010001101001010110000011","0000000000000111101110111100001010111001000100010100110010001110","0000000000000111101110011011011000010000110111000000001110011001","0000000000000111101101111010100101101000101001101011101010100100","0000000000000111101101011001110011000000011100010111000110101111","0000000000000111101100111001000000011000001111000010100010111010","0000000000000111101100011000001101110000000001101101111111000101","0000000000000111101011110111011011000111110100011001011011010000","0000000000000111101011010110101000011111100111000100110111011011","0000000000000111101010110101110101110111011001110000010011100110","0000000000000111101010010101000011001111001100011011101111110001","0000000000000111101001110100010000100110111111000111001011111100","0000000000000111101001010011011101111110110001110010101000000111","0000000000000111101000110010101011010110100100011110000100010010","0000000000000111101000010001111000101110010111001001100000011101","0000000000000111100111110001000110000110001001110100111100101000","0000000000000111100111010000010011011101111100100000011000110011","0000000000000111100110101111100000110101101111001011110100111110","0000000000000111100110001110101110001101100001110111010001001001","0000000000000111100101101101111011100101010100100010101101010100","0000000000000111100101001101001000111101000111001110001001011111","0000000000000111100100101100010110010100111001111001100101101010","0000000000000111100100001011100011101100101100100101000001110101","0000000000000111100011101010110001000100011111010000011110000000","0000000000000111100011001001111110011100010001111011111010001011","0000000000000111100010101001001011110100000100100111010110010110","0000000000000111100010001000011001001011110111010010110010100001","0000000000000111100001100111100110100011101001111110001110101100","0000000000000111100001000110110011111011011100101001101010110111","0000000000000111100000100110000001010011001111010101000111000010","0000000000000111100000000101001110101011000010000000100011001101","0000000000000111011111100100011100000010110100101011111111011000","0000000000000111011111000011101001011010100111010111011011100011","0000000000000111011110100010110110110010011010000010110111101110","0000000000000111011110000010000100001010001100101110010011111001","0000000000000111011101100001010001100001111111011001110000000100","0000000000000111011101000000011110111001110010000101001100001111","0000000000000111011100011111101100010001100100110000101000011010","0000000000000111011011111110111001101001010111011100000100100101","0000000000000111011011011110000111000001001010000111100000110000","0000000000000111011010111101010100011000111100110010111100111011","0000000000000111011010011100100001110000101111011110011001000110","0000000000000111011001111011101111001000100010001001110101010001","0000000000000111011001011010111100100000010100110101010001011100","0000000000000111011000111010001001111000000111100000101101100111","0000000000000111011000011001010111001111111010001100001001110001","0000000000000111010111111000100100100111101100110111100101111100","0000000000000111010111010111110001111111011111100011000010001000","0000000000000111010110110110111111010111010010001110011110010011","0000000000000111010110010110001100101111000100111001111010011110","0000000000000111010101110101011010000110110111100101010110101000","0000000000000111010101010100100111011110101010010000110010110011","0000000000000111010100110011110100110110011100111100001110111110","0000000000000111010100010011000010001110001111100111101011001010","0000000000000111010011110010001111100110000010010011000111010100","0000000000000111010011010001011100111101110100111110100011011111","0000000000000111010010110000101010010101100111101001111111101010","0000000000000111010010001111110111101101011010010101011011110101","0000000000000111010001101111000101000101001101000000111000000000","0000000000000111010001001110010010011100111111101100010100001011","0000000000000111010000101101011111110100110010010111110000010110","0000000000000111010000001100101101001100100101000011001100100001","0000000000000111001111101011111010100100010111101110101000101100","0000000000000111001111001011000111111100001010011010000100110111","0000000000000111001110101010010101010011111101000101100001000010","0000000000000111001110001001100010101011101111110000111101001101","0000000000000111001101101000110000000011100010011100011001011000","0000000000000111001101000111111101011011010101000111110101100011","0000000000000111001100100111001010110011000111110011010001101110","0000000000000111001100000110011000001010111010011110101101111001","0000000000000111001011100101100101100010101101001010001010000100","0000000000000111001011000100110010111010011111110101100110001111","0000000000000111001010100100000000010010010010100001000010011010","0000000000000111001010000011001101101010000101001100011110100101","0000000000000111001001100010011011000001110111110111111010110000","0000000000000111001001000001101000011001101010100011010110111011","0000000000000111001000100000110101110001011101001110110011000110","0000000000000111001000000000000011001001001111111010001111010001","0000000000000111000111011111010000100001000010100101101011011100","0000000000000111000110111110011101111000110101010001000111100111","0000000000000111000110011101101011010000100111111100100011110010","0000000000000111000101111100111000101000011010100111111111111101","0000000000000111000101011100000110000000001101010011011100001000","0000000000000111000100111011010011010111111111111110111000010011","0000000000000111000100011010100000101111110010101010010100011110","0000000000000111000011111001101110000111100101010101110000101001","0000000000000111000011011000111011011111011000000001001100110100","0000000000000111000010111000001000110111001010101100101000111111","0000000000000111000010010111010110001110111101011000000101001010","0000000000000111000001110110100011100110110000000011100001010101","0000000000000111000001010101110000111110100010101110111101100000","0000000000000111000000110100111110010110010101011010011001101011","0000000000000111000000010100001011101110001000000101110101110110","0000000000000110111111110011011001000101111010110001010010000001","0000000000000110111111010010100110011101101101011100101110001100","0000000000000110111110110001110011110101100000001000001010010111","0000000000000110111110010001000001001101010010110011100110100010","0000000000000110111101110000001110100101000101011111000010101101","0000000000000110111101001111011011111100111000001010011110111000","0000000000000110111100101110101001010100101010110101111011000011","0000000000000110111100001101110110101100011101100001010111001110","0000000000000110111011101101000100000100010000001100110011011001","0000000000000110111011001100010001011100000010111000001111100100","0000000000000110111010101011011110110011110101100011101011101111","0000000000000110111010001010101100001011101000001111000111111010","0000000000000110111001101001111001100011011010111010100100000101","0000000000000110111001001001000110111011001101100110000000010000","0000000000000110111000101000010100010011000000010001011100011011","0000000000000110111000000111100001101010110010111100111000100110","0000000000000110110111100110101111000010100101101000010100110001","0000000000000110110111000101111100011010011000010011110000111100","0000000000000110110110100101001001110010001010111111001101000111","0000000000000110110110000100010111001001111101101010101001010010","0000000000000110110101100011100100100001110000010110000101011101","0000000000000110110101000010110001111001100011000001100001101000","0000000000000110110100100001111111010001010101101100111101110011","0000000000000110110100000001001100101001001000011000011001111110","0000000000000110110011100000011010000000111011000011110110001001","0000000000000110110010111111100111011000101101101111010010010100","0000000000000110110010011110110100110000100000011010101110011111","0000000000000110110001111110000010001000010011000110001010101001","0000000000000110110001011101001111100000000101110001100110110101","0000000000000110110000111100011100110111111000011101000011000000","0000000000000110110000011011101010001111101011001000011111001011","0000000000000110101111111010110111100111011101110011111011010110","0000000000000110101111011010000100111111010000011111010111100000","0000000000000110101110111001010010010111000011001010110011101011","0000000000000110101110011000011111101110110101110110001111110110","0000000000000110101101110111101101000110101000100001101100000010","0000000000000110101101010110111010011110011011001101001000001100","0000000000000110101100110110000111110110001101111000100100010111","0000000000000110101100010101010101001110000000100100000000100010","0000000000000110101011110100100010100101110011001111011100101101","0000000000000110101011010011101111111101100101111010111000111000","0000000000000110101010110010111101010101011000100110010101000011","0000000000000110101010010010001010101101001011010001110001001110","0000000000000110101001110001011000000100111101111101001101011001","0000000000000110101001010000100101011100110000101000101001100100","0000000000000110101000101111110010110100100011010100000101101111","0000000000000110101000001111000000001100010101111111100001111010","0000000000000110100111101110001101100100001000101010111110000101","0000000000000110100111001101011010111011111011010110011010010000","0000000000000110100110101100101000010011101110000001110110011011","0000000000000110100110001011110101101011100000101101010010100110","0000000000000110100101101011000011000011010011011000101110110001","0000000000000110100101001010010000011011000110000100001010111100","0000000000000110100100101001011101110010111000101111100111000111","0000000000000110100100001000101011001010101011011011000011010010","0000000000000110100011100111111000100010011110000110011111011101","0000000000000110100011000111000101111010010000110001111011101000","0000000000000110100010100110010011010010000011011101010111110011","0000000000000110100010000101100000101001110110001000110011111110","0000000000000110100001100100101110000001101000110100010000001001","0000000000000110100001000011111011011001011011011111101100010100","0000000000000110100000100011001000110001001110001011001000011111","0000000000000110100000000010010110001001000000110110100100101010","0000000000000110011111100001100011100000110011100010000000110101","0000000000000110011111000000110000111000100110001101011101000000","0000000000000110011110011111111110010000011000111000111001001011","0000000000000110011101111111001011101000001011100100010101010110","0000000000000110011101011110011000111111111110001111110001100001","0000000000000110011100111101100110010111110000111011001101101100","0000000000000110011100011100110011101111100011100110101001110111","0000000000000110011011111100000001000111010110010010000110000010","0000000000000110011011011011001110011111001000111101100010001101","0000000000000110011010111010011011110110111011101000111110011000","0000000000000110011010011001101001001110101110010100011010100011","0000000000000110011001111000110110100110100000111111110110101110","0000000000000110011001011000000011111110010011101011010010111001","0000000000000110011000110111010001010110000110010110101111000100","0000000000000110011000010110011110101101111001000010001011001111","0000000000000110010111110101101100000101101011101101100111011010","0000000000000110010111010100111001011101011110011001000011100101","0000000000000110010110110100000110110101010001000100011111110000","0000000000000110010110010011010100001101000011101111111011111011","0000000000000110010101110010100001100100110110011011011000000110","0000000000000110010101010001101110111100101001000110110100010001","0000000000000110010100110000111100010100011011110010010000011011","0000000000000110010100010000001001101100001110011101101100100111","0000000000000110010011101111010111000100000001001001001000110010","0000000000000110010011001110100100011011110011110100100100111101","0000000000000110010010101101110001110011100110100000000001001000","0000000000000110010010001100111111001011011001001011011101010010","0000000000000110010001101100001100100011001011110110111001011101","0000000000000110010001001011011001111010111110100010010101101001","0000000000000110010000101010100111010010110001001101110001110100","0000000000000110010000001001110100101010100011111001001101111110","0000000000000110001111101001000010000010010110100100101010001001","0000000000000110001111001000001111011010001001010000000110010100","0000000000000110001110100111011100110001111011111011100010011111","0000000000000110001110000110101010001001101110100110111110101010","0000000000000110001101100101110111100001100001010010011010110101","0000000000000110001101000101000100111001010011111101110111000000","0000000000000110001100100100010010010001000110101001010011001011","0000000000000110001100000011011111101000111001010100101111010110","0000000000000110001011100010101101000000101100000000001011100001","0000000000000110001011000001111010011000011110101011100111101100","0000000000000110001010100001000111110000010001010111000011110111","0000000000000110001010000000010101001000000100000010100000000010","0000000000000110001001011111100010011111110110101101111100001101","0000000000000110001000111110101111110111101001011001011000011000","0000000000000110001000011101111101001111011100000100110100100011","0000000000000110000111111101001010100111001110110000010000101110","0000000000000110000111011100010111111111000001011011101100111001","0000000000000110000110111011100101010110110100000111001001000100","0000000000000110000110011010110010101110100110110010100101001111","0000000000000110000101111010000000000110011001011110000001011010","0000000000000110000101011001001101011110001100001001011101100101","0000000000000110000100111000011010110101111110110100111001110000","0000000000000110000100010111101000001101110001100000010101111011","0000000000000110000011110110110101100101100100001011110010000110","0000000000000110000011010110000010111101010110110111001110010001","0000000000000110000010110101010000010101001001100010101010011100","0000000000000110000010010100011101101100111100001110000110100111","0000000000000110000001110011101011000100101110111001100010110010","0000000000000110000001010010111000011100100001100100111110111101","0000000000000110000000110010000101110100010100010000011011001000","0000000000000110000000010001010011001100000110111011110111010011","0000000000000101111111110000100000100011111001100111010011011110","0000000000000101111111001111101101111011101100010010101111101001","0000000000000101111110101110111011010011011110111110001011110100","0000000000000101111110001110001000101011010001101001100111111111","0000000000000101111101101101010110000011000100010101000100001010","0000000000000101111101001100100011011010110111000000100000010101","0000000000000101111100101011110000110010101001101011111100100000","0000000000000101111100001010111110001010011100010111011000101011","0000000000000101111011101010001011100010001111000010110100110110","0000000000000101111011001001011000111010000001101110010001000001","0000000000000101111010101000100110010001110100011001101101001100","0000000000000101111010000111110011101001100111000101001001010111","0000000000000101111001100111000001000001011001110000100101100010","0000000000000101111001000110001110011001001100011100000001101101","0000000000000101111000100101011011110000111111000111011101111000","0000000000000101111000000100101001001000110001110010111010000011","0000000000000101110111100011110110100000100100011110010110001110","0000000000000101110111000011000011111000010111001001110010011001","0000000000000101110110100010010001010000001001110101001110100100","0000000000000101110110000001011110100111111100100000101010101111","0000000000000101110101100000101011111111101111001100000110111010","0000000000000101110100111111111001010111100001110111100011000100","0000000000000101110100011111000110101111010100100010111111010000","0000000000000101110011111110010100000111000111001110011011011011","0000000000000101110011011101100001011110111001111001110111100110","0000000000000101110010111100101110110110101100100101010011110000","0000000000000101110010011011111100001110011111010000101111111011","0000000000000101110001111011001001100110010001111100001100000110","0000000000000101110001011010010110111110000100100111101000010010","0000000000000101110000111001100100010101110111010011000100011101","0000000000000101110000011000110001101101101001111110100000100111","0000000000000101101111110111111111000101011100101001111100110010","0000000000000101101111010111001100011101001111010101011000111101","0000000000000101101110110110011001110101000010000000110101001000","0000000000000101101110010101100111001100110100101100010001010011","0000000000000101101101110100110100100100100111010111101101011110","0000000000000101101101010100000001111100011010000011001001101001","0000000000000101101100110011001111010100001100101110100101110100","0000000000000101101100010010011100101011111111011010000001111111","0000000000000101101011110001101010000011110010000101011110001010","0000000000000101101011010000110111011011100100110000111010010101","0000000000000101101010110000000100110011010111011100010110100000","0000000000000101101010001111010010001011001010000111110010101011","0000000000000101101001101110011111100010111100110011001110110110","0000000000000101101001001101101100111010101111011110101011000001","0000000000000101101000101100111010010010100010001010000111001100","0000000000000101101000001100000111101010010100110101100011010111","0000000000000101100111101011010101000010000111100000111111100010","0000000000000101100111001010100010011001111010001100011011101101","0000000000000101100110101001101111110001101100110111110111111000","0000000000000101100110001000111101001001011111100011010100000011","0000000000000101100101101000001010100001010010001110110000001110","0000000000000101100101000111010111111001000100111010001100011001","0000000000000101100100100110100101010000110111100101101000100100","0000000000000101100100000101110010101000101010010001000100101111","0000000000000101100011100101000000000000011100111100100000111010","0000000000000101100011000100001101011000001111100111111101000101","0000000000000101100010100011011010110000000010010011011001010000","0000000000000101100010000010101000000111110100111110110101011011","0000000000000101100001100001110101011111100111101010010001100110","0000000000000101100001000001000010110111011010010101101101110001","0000000000000101100000100000010000001111001101000001001001111100","0000000000000101011111111111011101100110111111101100100110000111","0000000000000101011111011110101010111110110010011000000010010010","0000000000000101011110111101111000010110100101000011011110011101","0000000000000101011110011101000101101110010111101110111010101000","0000000000000101011101111100010011000110001010011010010110110011","0000000000000101011101011011100000011101111101000101110010111110","0000000000000101011100111010101101110101101111110001001111001001","0000000000000101011100011001111011001101100010011100101011010100","0000000000000101011011111001001000100101010101001000000111011111","0000000000000101011011011000010101111101000111110011100011101010","0000000000000101011010110111100011010100111010011110111111110101","0000000000000101011010010110110000101100101101001010011100000000","0000000000000101011001110101111110000100011111110101111000001011","0000000000000101011001010101001011011100010010100001010100010110","0000000000000101011000110100011000110100000101001100110000100001","0000000000000101011000010011100110001011110111111000001100101100","0000000000000101010111110010110011100011101010100011101000110111","0000000000000101010111010010000000111011011101001111000101000010","0000000000000101010110110001001110010011001111111010100001001101","0000000000000101010110010000011011101011000010100101111101011000","0000000000000101010101101111101001000010110101010001011001100010","0000000000000101010101001110110110011010100111111100110101101101","0000000000000101010100101110000011110010011010101000010001111000","0000000000000101010100001101010001001010001101010011101110000100","0000000000000101010011101100011110100001111111111111001010001111","0000000000000101010011001011101011111001110010101010100110011001","0000000000000101010010101010111001010001100101010110000010100100","0000000000000101010010001010000110101001011000000001011110101111","0000000000000101010001101001010100000001001010101100111010111010","0000000000000101010001001000100001011000111101011000010111000101","0000000000000101010000100111101110110000110000000011110011010000","0000000000000101010000000110111100001000100010101111001111011011","0000000000000101001111100110001001100000010101011010101011100110","0000000000000101001111000101010110111000001000000110000111110001","0000000000000101001110100100100100001111111010110001100011111100","0000000000000101001110000011110001100111101101011101000000000111","0000000000000101001101100010111110111111100000001000011100010010","0000000000000101001101000010001100010111010010110011111000011101","0000000000000101001100100001011001101111000101011111010100101000","0000000000000101001100000000100111000110111000001010110000110011","0000000000000101001011011111110100011110101010110110001100111110","0000000000000101001010111111000001110110011101100001101001001001","0000000000000101001010011110001111001110010000001101000101010100","0000000000000101001001111101011100100110000010111000100001011111","0000000000000101001001011100101001111101110101100011111101101010","0000000000000101001000111011110111010101101000001111011001110101","0000000000000101001000011011000100101101011010111010110110000000","0000000000000101000111111010010010000101001101100110010010001011","0000000000000101000111011001011111011101000000010001101110010110","0000000000000101000110111000101100110100110010111101001010100001","0000000000000101000110010111111010001100100101101000100110101100","0000000000000101000101110111000111100100011000010100000010110111","0000000000000101000101010110010100111100001010111111011111000010","0000000000000101000100110101100010010011111101101010111011001101","0000000000000101000100010100101111101011110000010110010111011000","0000000000000101000011110011111101000011100011000001110011100011","0000000000000101000011010011001010011011010101101101001111101110","0000000000000101000010110010010111110011001000011000101011111001","0000000000000101000010010001100101001010111011000100001000000100","0000000000000101000001110000110010100010101101101111100100001111","0000000000000101000001001111111111111010100000011011000000011010","0000000000000101000000101111001101010010010011000110011100100101","0000000000000101000000001110011010101010000101110001111000110000","0000000000000100111111101101101000000001111000011101010100111011","0000000000000100111111001100110101011001101011001000110001000110","0000000000000100111110101100000010110001011101110100001101010001","0000000000000100111110001011010000001001010000011111101001011100","0000000000000100111101101010011101100001000011001011000101100111","0000000000000100111101001001101010111000110101110110100001110010","0000000000000100111100101000111000010000101000100001111101111101","0000000000000100111100001000000101101000011011001101011010001000","0000000000000100111011100111010011000000001101111000110110010011","0000000000000100111011000110100000011000000000100100010010011110","0000000000000100111010100101101101101111110011001111101110101001","0000000000000100111010000100111011000111100101111011001010110100","0000000000000100111001100100001000011111011000100110100110111111","0000000000000100111001000011010101110111001011010010000011001010","0000000000000100111000100010100011001110111101111101011111010101","0000000000000100111000000001110000100110110000101000111011100000","0000000000000100110111100000111101111110100011010100010111101011","0000000000000100110111000000001011010110010101111111110011110110","0000000000000100110110011111011000101110001000101011010000000001","0000000000000100110101111110100110000101111011010110101100001100","0000000000000100110101011101110011011101101110000010001000010111","0000000000000100110100111101000000110101100000101101100100100010","0000000000000100110100011100001110001101010011011001000000101101","0000000000000100110011111011011011100101000110000100011100111000","0000000000000100110011011010101000111100111000101111111001000011","0000000000000100110010111001110110010100101011011011010101001110","0000000000000100110010011001000011101100011110000110110001011001","0000000000000100110001111000010001000100010000110010001101100011","0000000000000100110001010111011110011100000011011101101001101111","0000000000000100110000110110101011110011110110001001000101111010","0000000000000100110000010101111001001011101000110100100010000101","0000000000000100101111110101000110100011011011011111111110010000","0000000000000100101111010100010011111011001110001011011010011010","0000000000000100101110110011100001010011000000110110110110100101","0000000000000100101110010010101110101010110011100010010010110001","0000000000000100101101110001111100000010100110001101101110111100","0000000000000100101101010001001001011010011000111001001011000110","0000000000000100101100110000010110110010001011100100100111010001","0000000000000100101100001111100100001001111110010000000011011100","0000000000000100101011101110110001100001110000111011011111100111","0000000000000100101011001101111110111001100011100110111011110010","0000000000000100101010101101001100010001010110010010010111111101","0000000000000100101010001100011001101001001000111101110100001000","0000000000000100101001101011100111000000111011101001010000010011","0000000000000100101001001010110100011000101110010100101100011110","0000000000000100101000101010000001110000100001000000001000101001","0000000000000100101000001001001111001000010011101011100100110100","0000000000000100100111101000011100100000000110010111000000111111","0000000000000100100111000111101001110111111001000010011101001010","0000000000000100100110100110110111001111101011101101111001010101","0000000000000100100110000110000100100111011110011001010101100000","0000000000000100100101100101010001111111010001000100110001101011","0000000000000100100101000100011111010111000011110000001101110110","0000000000000100100100100011101100101110110110011011101010000001","0000000000000100100100000010111010000110101001000111000110001100","0000000000000100100011100010000111011110011011110010100010010111","0000000000000100100011000001010100110110001110011101111110100010","0000000000000100100010100000100010001110000001001001011010101101","0000000000000100100001111111101111100101110011110100110110111000","0000000000000100100001011110111100111101100110100000010011000011","0000000000000100100000111110001010010101011001001011101111001110","0000000000000100100000011101010111101101001011110111001011011001","0000000000000100011111111100100101000100111110100010100111100100","0000000000000100011111011011110010011100110001001110000011101111","0000000000000100011110111010111111110100100011111001011111111010","0000000000000100011110011010001101001100010110100100111100000101","0000000000000100011101111001011010100100001001010000011000010000","0000000000000100011101011000100111111011111011111011110100011011","0000000000000100011100110111110101010011101110100111010000100110","0000000000000100011100010111000010101011100001010010101100110001","0000000000000100011011110110010000000011010011111110001000111100","0000000000000100011011010101011101011011000110101001100101000111","0000000000000100011010110100101010110010111001010101000001010010","0000000000000100011010010011111000001010101100000000011101011101","0000000000000100011001110011000101100010011110101011111001101000","0000000000000100011001010010010010111010010001010111010101110011","0000000000000100011000110001100000010010000100000010110001111110","0000000000000100011000010000101101101001110110101110001110001001","0000000000000100010111101111111011000001101001011001101010010100","0000000000000100010111001111001000011001011100000101000110011111","0000000000000100010110101110010101110001001110110000100010101010","0000000000000100010110001101100011001001000001011011111110110101","0000000000000100010101101100110000100000110100000111011011000000","0000000000000100010101001011111101111000100110110010110111001011","0000000000000100010100101011001011010000011001011110010011010110","0000000000000100010100001010011000101000001100001001101111100001","0000000000000100010011101001100101111111111110110101001011101100","0000000000000100010011001000110011010111110001100000100111110111","0000000000000100010010101000000000101111100100001100000100000010","0000000000000100010010000111001110000111010110110111100000001100","0000000000000100010001100110011011011111001001100010111100010111","0000000000000100010001000101101000110110111100001110011000100011","0000000000000100010000100100110110001110101110111001110100101110","0000000000000100010000000100000011100110100001100101010000111000","0000000000000100001111100011010000111110010100010000101101000011","0000000000000100001111000010011110010110000110111100001001001110","0000000000000100001110100001101011101101111001100111100101011001","0000000000000100001110000000111001000101101100010011000001100101","0000000000000100001101100000000110011101011110111110011101101111","0000000000000100001100111111010011110101010001101001111001111010","0000000000000100001100011110100001001101000100010101010110000101","0000000000000100001011111101101110100100110111000000110010010000","0000000000000100001011011100111011111100101001101100001110011011","0000000000000100001010111100001001010100011100010111101010100110","0000000000000100001010011011010110101100001111000011000110110001","0000000000000100001001111010100100000100000001101110100010111100","0000000000000100001001011001110001011011110100011001111111000111","0000000000000100001000111000111110110011100111000101011011010010","0000000000000100001000011000001100001011011001110000110111011101","0000000000000100000111110111011001100011001100011100010011101000","0000000000000100000111010110100110111010111111000111101111110011","0000000000000100000110110101110100010010110001110011001011111110","0000000000000100000110010101000001101010100100011110101000001001","0000000000000100000101110100001111000010010111001010000100010100","0000000000000100000101010011011100011010001001110101100000011111","0000000000000100000100110010101001110001111100100000111100101010","0000000000000100000100010001110111001001101111001100011000110101","0000000000000100000011110001000100100001100001110111110101000000","0000000000000100000011010000010001111001010100100011010001001011","0000000000000100000010101111011111010001000111001110101101010110","0000000000000100000010001110101100101000111001111010001001100001","0000000000000100000001101101111010000000101100100101100101101100","0000000000000100000001001101000111011000011111010001000001110111","0000000000000100000000101100010100110000010001111100011110000010","0000000000000100000000001011100010001000000100100111111010001101","0000000000000011111111101010101111011111110111010011010110011000","0000000000000011111111001001111100110111101001111110110010100011","0000000000000011111110101001001010001111011100101010001110101110","0000000000000011111110001000010111100111001111010101101010111001","0000000000000011111101100111100100111111000010000001000111000100","0000000000000011111101000110110010010110110100101100100011001111","0000000000000011111100100101111111101110100111010111111111011010","0000000000000011111100000101001101000110011010000011011011100101","0000000000000011111011100100011010011110001100101110110111110000","0000000000000011111011000011100111110101111111011010010011111011","0000000000000011111010100010110101001101110010000101110000000110","0000000000000011111010000010000010100101100100110001001100010001","0000000000000011111001100001001111111101010111011100101000011100","0000000000000011111001000000011101010101001010001000000100100111","0000000000000011111000011111101010101100111100110011100000110010","0000000000000011110111111110111000000100101111011110111100111101","0000000000000011110111011110000101011100100010001010011001001000","0000000000000011110110111101010010110100010100110101110101010011","0000000000000011110110011100100000001100000111100001010001011110","0000000000000011110101111011101101100011111010001100101101101001","0000000000000011110101011010111010111011101100111000001001110100","0000000000000011110100111010001000010011011111100011100101111111","0000000000000011110100011001010101101011010010001111000010001010","0000000000000011110011111000100011000011000100111010011110010101","0000000000000011110011010111110000011010110111100101111010100000","0000000000000011110010110110111101110010101010010001010110101010","0000000000000011110010010110001011001010011100111100110010110101","0000000000000011110001110101011000100010001111101000001111000001","0000000000000011110001010100100101111010000010010011101011001011","0000000000000011110000110011110011010001110100111111000111010110","0000000000000011110000010011000000101001100111101010100011100001","0000000000000011101111110010001110000001011010010101111111101100","0000000000000011101111010001011011011001001101000001011011110111","0000000000000011101110110000101000110000111111101100111000000010","0000000000000011101110001111110110001000110010011000010100001101","0000000000000011101101101111000011100000100101000011110000011000","0000000000000011101101001110010000111000010111101111001100100011","0000000000000011101100101101011110010000001010011010101000101110","0000000000000011101100001100101011100111111101000110000100111001","0000000000000011101011101011111000111111101111110001100001000100","0000000000000011101011001011000110010111100010011100111101001111","0000000000000011101010101010010011101111010101001000011001011010","0000000000000011101010001001100001000111000111110011110101100101","0000000000000011101001101000101110011110111010011111010001110000","0000000000000011101001000111111011110110101101001010101101111011","0000000000000011101000100111001001001110011111110110001010000110","0000000000000011101000000110010110100110010010100001100110010001","0000000000000011100111100101100011111110000101001101000010011100","0000000000000011100111000100110001010101110111111000011110100111","0000000000000011100110100011111110101101101010100011111010110010","0000000000000011100110000011001100000101011101001111010110111101","0000000000000011100101100010011001011101001111111010110011001000","0000000000000011100101000001100110110101000010100110001111010011","0000000000000011100100100000110100001100110101010001101011011110","0000000000000011100100000000000001100100100111111101000111101001","0000000000000011100011011111001110111100011010101000100011110100","0000000000000011100010111110011100010100001101010011111111111111","0000000000000011100010011101101001101011111111111111011100001010","0000000000000011100001111100110111000011110010101010111000010101","0000000000000011100001011100000100011011100101010110010100100000","0000000000000011100000111011010001110011011000000001110000101011","0000000000000011100000011010011111001011001010101101001100110110","0000000000000011011111111001101100100010111101011000101001000001","0000000000000011011111011000111001111010110000000100000101001100","0000000000000011011110111000000111010010100010101111100001010111","0000000000000011011110010111010100101010010101011010111101100010","0000000000000011011101110110100010000010001000000110011001101101","0000000000000011011101010101101111011001111010110001110101111000","0000000000000011011100110100111100110001101101011101010010000011","0000000000000011011100010100001010001001100000001000101110001110","0000000000000011011011110011010111100001010010110100001010011001","0000000000000011011011010010100100111001000101011111100110100100","0000000000000011011010110001110010010000111000001011000010101111","0000000000000011011010010000111111101000101010110110011110111010","0000000000000011011001110000001101000000011101100001111011000101","0000000000000011011001001111011010011000010000001101010111010000","0000000000000011011000101110100111110000000010111000110011011011","0000000000000011011000001101110101000111110101100100001111100110","0000000000000011010111101101000010011111101000001111101011110001","0000000000000011010111001100001111110111011010111011000111111100","0000000000000011010110101011011101001111001101100110100100000111","0000000000000011010110001010101010100111000000010010000000010010","0000000000000011010101101001110111111110110010111101011100011101","0000000000000011010101001001000101010110100101101000111000101000","0000000000000011010100101000010010101110011000010100010100110011","0000000000000011010100000111100000000110001010111111110000111110","0000000000000011010011100110101101011101111101101011001101001001","0000000000000011010011000101111010110101110000010110101001010100","0000000000000011010010100101001000001101100011000010000101011111","0000000000000011010010000100010101100101010101101101100001101010","0000000000000011010001100011100010111101001000011000111101110101","0000000000000011010001000010110000010100111011000100011001111111","0000000000000011010000100001111101101100101101101111110110001011","0000000000000011010000000001001011000100100000011011010010010110","0000000000000011001111100000011000011100010011000110101110100000","0000000000000011001110111111100101110100000101110010001010101100","0000000000000011001110011110110011001011111000011101100110110110","0000000000000011001101111110000000100011101011001001000011000001","0000000000000011001101011101001101111011011101110100011111001100","0000000000000011001100111100011011010011010000011111111011010111","0000000000000011001100011011101000101011000011001011010111100010","0000000000000011001011111010110110000010110101110110110011101101","0000000000000011001011011010000011011010101000100010001111111000","0000000000000011001010111001010000110010011011001101101100000011","0000000000000011001010011000011110001010001101111001001000001110","0000000000000011001001110111101011100010000000100100100100011001","0000000000000011001001010110111000111001110011010000000000100100","0000000000000011001000110110000110010001100101111011011100101111","0000000000000011001000010101010011101001011000100110111000111010","0000000000000011000111110100100001000001001011010010010101000101","0000000000000011000111010011101110011000111101111101110001010000","0000000000000011000110110010111011110000110000101001001101011011","0000000000000011000110010010001001001000100011010100101001100110","0000000000000011000101110001010110100000010110000000000101110001","0000000000000011000101010000100011111000001000101011100001111100","0000000000000011000100101111110001001111111011010110111110000111","0000000000000011000100001110111110100111101110000010011010010010","0000000000000011000011101110001011111111100000101101110110011101","0000000000000011000011001101011001010111010011011001010010101000","0000000000000011000010101100100110101111000110000100101110110011","0000000000000011000010001011110100000110111000110000001010111110","0000000000000011000001101011000001011110101011011011100111001001","0000000000000011000001001010001110110110011110000111000011010100","0000000000000011000000101001011100001110010000110010011111011111","0000000000000011000000001000101001100110000011011101111011101010","0000000000000010111111100111110110111101110110001001010111110101","0000000000000010111111000111000100010101101000110100110100000000","0000000000000010111110100110010001101101011011100000010000001011","0000000000000010111110000101011111000101001110001011101100010110","0000000000000010111101100100101100011101000000110111001000100001","0000000000000010111101000011111001110100110011100010100100101100","0000000000000010111100100011000111001100100110001110000000110111","0000000000000010111100000010010100100100011000111001011101000010","0000000000000010111011100001100001111100001011100100111001001101","0000000000000010111011000000101111010011111110010000010101011000","0000000000000010111010011111111100101011110000111011110001100011","0000000000000010111001111111001010000011100011100111001101101110","0000000000000010111001011110010111011011010110010010101001111001","0000000000000010111000111101100100110011001000111110000110000100","0000000000000010111000011100110010001010111011101001100010001111","0000000000000010110111111011111111100010101110010100111110011010","0000000000000010110111011011001100111010100001000000011010100101","0000000000000010110110111010011010010010010011101011110110110000","0000000000000010110110011001100111101010000110010111010010111011","0000000000000010110101111000110101000001111001000010101111000110","0000000000000010110101011000000010011001101011101110001011010001","0000000000000010110100110111001111110001011110011001100111011100","0000000000000010110100010110011101001001010001000101000011100111","0000000000000010110011110101101010100001000011110000011111110010","0000000000000010110011010100110111111000110110011011111011111101","0000000000000010110010110100000101010000101001000111011000001000","0000000000000010110010010011010010101000011011110010110100010011","0000000000000010110001110010100000000000001110011110010000011110","0000000000000010110001010001101101011000000001001001101100101000","0000000000000010110000110000111010101111110011110101001000110011","0000000000000010110000010000001000000111100110100000100100111110","0000000000000010101111101111010101011111011001001100000001001001","0000000000000010101111001110100010110111001011110111011101010100","0000000000000010101110101101110000001110111110100010111001011111","0000000000000010101110001100111101100110110001001110010101101010","0000000000000010101101101100001010111110100011111001110001110101","0000000000000010101101001011011000010110010110100101001110000000","0000000000000010101100101010100101101110001001010000101010001011","0000000000000010101100001001110011000101111011111100000110010110","0000000000000010101011101001000000011101101110100111100010100001","0000000000000010101011001000001101110101100001010010111110101100","0000000000000010101010100111011011001101010011111110011010110111","0000000000000010101010000110101000100101000110101001110111000010","0000000000000010101001100101110101111100111001010101010011001101","0000000000000010101001000101000011010100101100000000101111011000","0000000000000010101000100100010000101100011110101100001011100011","0000000000000010101000000011011110000100010001010111100111101110","0000000000000010100111100010101011011100000100000011000011111001","0000000000000010100111000001111000110011110110101110100000000100","0000000000000010100110100001000110001011101001011001111100001111","0000000000000010100110000000010011100011011100000101011000011010","0000000000000010100101011111100000111011001110110000110100100101","0000000000000010100100111110101110010011000001011100010000110000","0000000000000010100100011101111011101010110100000111101100111011","0000000000000010100011111101001001000010100110110011001001000110","0000000000000010100011011100010110011010011001011110100101010001","0000000000000010100010111011100011110010001100001010000001011100","0000000000000010100010011010110001001001111110110101011101100111","0000000000000010100001111001111110100001110001100000111001110010","0000000000000010100001011001001011111001100100001100010101111101","0000000000000010100000111000011001010001010110110111110010001000","0000000000000010100000010111100110101001001001100011001110010011","0000000000000010011111110110110100000000111100001110101010011110","0000000000000010011111010110000001011000101110111010000110101001","0000000000000010011110110101001110110000100001100101100010110100","0000000000000010011110010100011100001000010100010000111110111111","0000000000000010011101110011101001100000000110111100011011001010","0000000000000010011101010010110110110111111001100111110111010101","0000000000000010011100110010000100001111101100010011010011100000","0000000000000010011100010001010001100111011110111110101111101011","0000000000000010011011110000011110111111010001101010001011110110","0000000000000010011011001111101100010111000100010101101000000001","0000000000000010011010101110111001101110110111000001000100001100","0000000000000010011010001110000111000110101001101100100000010111","0000000000000010011001101101010100011110011100010111111100100010","0000000000000010011001001100100001110110001111000011011000101101","0000000000000010011000101011101111001110000001101110110100111000","0000000000000010011000001010111100100101110100011010010001000011","0000000000000010010111101010001001111101100111000101101101001110","0000000000000010010111001001010111010101011001110001001001011001","0000000000000010010110101000100100101101001100011100100101100100","0000000000000010010110000111110010000100111111001000000001101111","0000000000000010010101100110111111011100110001110011011101111010","0000000000000010010101000110001100110100100100011110111010000101","0000000000000010010100100101011010001100010111001010010110010000","0000000000000010010100000100100111100100001001110101110010011011","0000000000000010010011100011110100111011111100100001001110100110","0000000000000010010011000011000010010011101111001100101010110001","0000000000000010010010100010001111101011100001111000000110111100","0000000000000010010010000001011101000011010100100011100011000111","0000000000000010010001100000101010011011000111001110111111010010","0000000000000010010000111111110111110010111001111010011011011101","0000000000000010010000011111000101001010101100100101110111101000","0000000000000010001111111110010010100010011111010001010011110011","0000000000000010001111011101011111111010010001111100101111111101","0000000000000010001110111100101101010010000100101000001100001001","0000000000000010001110011011111010101001110111010011101000010011","0000000000000010001101111011001000000001101001111111000100011110","0000000000000010001101011010010101011001011100101010100000101001","0000000000000010001100111001100010110001001111010101111100110100","0000000000000010001100011000110000001001000010000001011000111111","0000000000000010001011110111111101100000110100101100110101001010","0000000000000010001011010111001010111000100111011000010001010101","0000000000000010001010110110011000010000011010000011101101100000","0000000000000010001010010101100101101000001100101111001001101011","0000000000000010001001110100110010111111111111011010100101110110","0000000000000010001001010100000000010111110010000110000010000001","0000000000000010001000110011001101101111100100110001011110001100","0000000000000010001000010010011011000111010111011100111010010111","0000000000000010000111110001101000011111001010001000010110100010","0000000000000010000111010000110101110110111100110011110010101101","0000000000000010000110110000000011001110101111011111001110111000","0000000000000010000110001111010000100110100010001010101011000011","0000000000000010000101101110011101111110010100110110000111001110","0000000000000010000101001101101011010110000111100001100011011001","0000000000000010000100101100111000101101111010001100111111100100","0000000000000010000100001100000110000101101100111000011011101111","0000000000000010000011101011010011011101011111100011110111111010","0000000000000010000011001010100000110101010010001111010100000101","0000000000000010000010101001101110001101000100111010110000010000","0000000000000010000010001000111011100100110111100110001100011011","0000000000000010000001101000001000111100101010010001101000100110","0000000000000010000001000111010110010100011100111101000100110001","0000000000000010000000100110100011101100001111101000100000111100","0000000000000010000000000101110001000100000010010011111101000111","0000000000000001111111100100111110011011110100111111011001010010","0000000000000001111111000100001011110011100111101010110101011101","0000000000000001111110100011011001001011011010010110010001101000","0000000000000001111110000010100110100011001101000001101101110011","0000000000000001111101100001110011111010111111101101001001111110","0000000000000001111101000001000001010010110010011000100110001001","0000000000000001111100100000001110101010100101000100000010010100","0000000000000001111011111111011100000010010111101111011110011111","0000000000000001111011011110101001011010001010011010111010101010","0000000000000001111010111101110110110001111101000110010110110101","0000000000000001111010011101000100001001101111110001110011000000","0000000000000001111001111100010001100001100010011101001111001011","0000000000000001111001011011011110111001010101001000101011010110","0000000000000001111000111010101100010001000111110100000111100001","0000000000000001111000011001111001101000111010011111100011101100","0000000000000001110111111001000111000000101101001010111111110111","0000000000000001110111011000010100011000011111110110011100000010","0000000000000001110110110111100001110000010010100001111000001101","0000000000000001110110010110101111001000000101001101010100011000","0000000000000001110101110101111100011111110111111000110000100011","0000000000000001110101010101001001110111101010100100001100101110","0000000000000001110100110100010111001111011101001111101000111001","0000000000000001110100010011100100100111001111111011000101000100","0000000000000001110011110010110001111111000010100110100001001111","0000000000000001110011010001111111010110110101010001111101011010","0000000000000001110010110001001100101110100111111101011001100101","0000000000000001110010010000011010000110011010101000110101110000","0000000000000001110001101111100111011110001101010100010001111011","0000000000000001110001001110110100110101111111111111101110000101","0000000000000001110000101110000010001101110010101011001010010000","0000000000000001110000001101001111100101100101010110100110011011","0000000000000001101111101100011100111101011000000010000010100110","0000000000000001101111001011101010010101001010101101011110110001","0000000000000001101110101010110111101100111101011000111010111100","0000000000000001101110001010000101000100110000000100010111000111","0000000000000001101101101001010010011100100010101111110011010010","0000000000000001101101001000011111110100010101011011001111011101","0000000000000001101100100111101101001100001000000110101011101000","0000000000000001101100000110111010100011111010110010000111110011","0000000000000001101011100110000111111011101101011101100011111110","0000000000000001101011000101010101010011100000001001000000001001","0000000000000001101010100100100010101011010010110100011100010100","0000000000000001101010000011110000000011000101011111111000011111","0000000000000001101001100010111101011010111000001011010100101010","0000000000000001101001000010001010110010101010110110110000110101","0000000000000001101000100001011000001010011101100010001101000000","0000000000000001101000000000100101100010010000001101101001001011","0000000000000001100111011111110010111010000010111001000101010110","0000000000000001100110111111000000010001110101100100100001100001","0000000000000001100110011110001101101001101000001111111101101100","0000000000000001100101111101011011000001011010111011011001110111","0000000000000001100101011100101000011001001101100110110110000010","0000000000000001100100111011110101110001000000010010010010001101","0000000000000001100100011011000011001000110010111101101110011000","0000000000000001100011111010010000100000100101101001001010100011","0000000000000001100011011001011101111000011000010100100110101110","0000000000000001100010111000101011010000001011000000000010111001","0000000000000001100010010111111000100111111101101011011111000100","0000000000000001100001110111000101111111110000010110111011001111","0000000000000001100001010110010011010111100011000010010111011010","0000000000000001100000110101100000101111010101101101110011100101","0000000000000001100000010100101110000111001000011001001111110000","0000000000000001011111110011111011011110111011000100101011111011","0000000000000001011111010011001000110110101101110000001000000110","0000000000000001011110110010010110001110100000011011100100010001","0000000000000001011110010001100011100110010011000111000000011100","0000000000000001011101110000110000111110000101110010011100100111","0000000000000001011101001111111110010101111000011101111000110010","0000000000000001011100101111001011101101101011001001010100111101","0000000000000001011100001110011001000101011101110100110001001000","0000000000000001011011101101100110011101010000100000001101010011","0000000000000001011011001100110011110101000011001011101001011110","0000000000000001011010101100000001001100110101110111000101101001","0000000000000001011010001011001110100100101000100010100001110100","0000000000000001011001101010011011111100011011001101111101111111","0000000000000001011001001001101001010100001101111001011010001010","0000000000000001011000101000110110101100000000100100110110010101","0000000000000001011000001000000100000011110011010000010010100000","0000000000000001010111100111010001011011100101111011101110101011","0000000000000001010111000110011110110011011000100111001010110110","0000000000000001010110100101101100001011001011010010100111000001","0000000000000001010110000100111001100010111101111110000011001100","0000000000000001010101100100000110111010110000101001011111010111","0000000000000001010101000011010100010010100011010100111011100010","0000000000000001010100100010100001101010010110000000010111101101","0000000000000001010100000001101111000010001000101011110011111000","0000000000000001010011100000111100011001111011010111010000000011","0000000000000001010011000000001001110001101110000010101100001110","0000000000000001010010011111010111001001100000101110001000011001","0000000000000001010001111110100100100001010011011001100100100100","0000000000000001010001011101110001111001000110000101000000101111","0000000000000001010000111100111111010000111000110000011100111010","0000000000000001010000011100001100101000101011011011111001000100","0000000000000001001111111011011010000000011110000111010101001111","0000000000000001001111011010100111011000010000110010110001011010","0000000000000001001110111001110100110000000011011110001101100101","0000000000000001001110011001000010000111110110001001101001110000","0000000000000001001101111000001111011111101000110101000101111011","0000000000000001001101010111011100110111011011100000100010000110","0000000000000001001100110110101010001111001110001011111110010001","0000000000000001001100010101110111100111000000110111011010011100","0000000000000001001011110101000100111110110011100010110110100111","0000000000000001001011010100010010010110100110001110010010110010","0000000000000001001010110011011111101110011000111001101110111101","0000000000000001001010010010101101000110001011100101001011001000","0000000000000001001001110001111010011101111110010000100111010011","0000000000000001001001010001000111110101110000111100000011011110","0000000000000001001000110000010101001101100011100111011111101001","0000000000000001001000001111100010100101010110010010111011110100","0000000000000001000111101110101111111101001000111110010111111111","0000000000000001000111001101111101010100111011101001110100001010","0000000000000001000110101101001010101100101110010101010000010101","0000000000000001000110001100011000000100100001000000101100100000","0000000000000001000101101011100101011100010011101100001000101011","0000000000000001000101001010110010110100000110010111100100110110","0000000000000001000100101010000000001011111001000011000001000001","0000000000000001000100001001001101100011101011101110011101001100","0000000000000001000011101000011010111011011110011001111001010111","0000000000000001000011000111101000010011010001000101010101100010","0000000000000001000010100110110101101011000011110000110001101101","0000000000000001000010000110000011000010110110011100001101111000","0000000000000001000001100101010000011010101001000111101010000011","0000000000000001000001000100011101110010011011110011000110001110","0000000000000001000000100011101011001010001110011110100010011001","0000000000000001000000000010111000100010000001001001111110100100","0000000000000000111111100010000101111001110011110101011010101111","0000000000000000111111000001010011010001100110100000110110111010","0000000000000000111110100000100000101001011001001100010011000101","0000000000000000111101111111101110000001001011110111101111010000","0000000000000000111101011110111011011000111110100011001011011011","0000000000000000111100111110001000110000110001001110100111100110","0000000000000000111100011101010110001000100011111010000011110001","0000000000000000111011111100100011100000010110100101011111111100","0000000000000000111011011011110000111000001001010000111100000111","0000000000000000111010111010111110001111111011111100011000010010","0000000000000000111010011010001011100111101110100111110100011101","0000000000000000111001111001011000111111100001010011010000101000","0000000000000000111001011000100110010111010011111110101100110011","0000000000000000111000110111110011101111000110101010001000111110","0000000000000000111000010111000001000110111001010101100101001001","0000000000000000110111110110001110011110101100000001000001010100","0000000000000000110111010101011011110110011110101100011101011111","0000000000000000110110110100101001001110010001010111111001101010","0000000000000000110110010011110110100110000100000011010101110101","0000000000000000110101110011000011111101110110101110110010000000","0000000000000000110101010010010001010101101001011010001110001011","0000000000000000110100110001011110101101011100000101101010010110","0000000000000000110100010000101100000101001110110001000110100001","0000000000000000110011101111111001011101000001011100100010101100","0000000000000000110011001111000110110100110100000111111110110111","0000000000000000110010101110010100001100100110110011011011000010","0000000000000000110010001101100001100100011001011110110111001101","0000000000000000110001101100101110111100001100001010010011011000","0000000000000000110001001011111100010011111110110101101111100011","0000000000000000110000101011001001101011110001100001001011101101","0000000000000000110000001010010111000011100100001100100111111000","0000000000000000101111101001100100011011010110111000000100000011","0000000000000000101111001000110001110011001001100011100000001110","0000000000000000101110100111111111001010111100001110111100011001","0000000000000000101110000111001100100010101110111010011000100100","0000000000000000101101100110011001111010100001100101110100101111","0000000000000000101101000101100111010010010100010001010000111010","0000000000000000101100100100110100101010000110111100101101000101","0000000000000000101100000100000010000001111001101000001001010000","0000000000000000101011100011001111011001101100010011100101011011","0000000000000000101011000010011100110001011110111111000001100110","0000000000000000101010100001101010001001010001101010011101110001","0000000000000000101010000000110111100001000100010101111001111100","0000000000000000101001100000000100111000110111000001010110000111","0000000000000000101000111111010010010000101001101100110010010010","0000000000000000101000011110011111101000011100011000001110011101","0000000000000000100111111101101101000000001111000011101010101000","0000000000000000100111011100111010011000000001101111000110110011","0000000000000000100110111100000111101111110100011010100010111110","0000000000000000100110011011010101000111100111000101111111001001","0000000000000000100101111010100010011111011001110001011011010100","0000000000000000100101011001101111110111001100011100110111011111","0000000000000000100100111000111101001110111111001000010011101010","0000000000000000100100011000001010100110110001110011101111110101","0000000000000000100011110111010111111110100100011111001100000000","0000000000000000100011010110100101010110010111001010101000001011","0000000000000000100010110101110010101110001001110110000100010110","0000000000000000100010010101000000000101111100100001100000100001","0000000000000000100001110100001101011101101111001100111100101100","0000000000000000100001010011011010110101100001111000011000110111","0000000000000000100000110010101000001101010100100011110101000010","0000000000000000100000010001110101100101000111001111010001001101","0000000000000000011111110001000010111100111001111010101101011000","0000000000000000011111010000010000010100101100100110001001100011","0000000000000000011110101111011101101100011111010001100101101110","0000000000000000011110001110101011000100010001111101000001111001","0000000000000000011101101101111000011100000100101000011110000100","0000000000000000011101001101000101110011110111010011111010001111","0000000000000000011100101100010011001011101001111111010110011010","0000000000000000011100001011100000100011011100101010110010100101","0000000000000000011011101010101101111011001111010110001110110000","0000000000000000011011001001111011010011000010000001101010111011","0000000000000000011010101001001000101010110100101101000111000110","0000000000000000011010001000010110000010100111011000100011010001","0000000000000000011001100111100011011010011010000011111111011100","0000000000000000011001000110110000110010001100101111011011100111","0000000000000000011000100101111110001001111111011010110111110010","0000000000000000011000000101001011100001110010000110010011111101","0000000000000000010111100100011000111001100100110001110000001000","0000000000000000010111000011100110010001010111011101001100010011","0000000000000000010110100010110011101001001010001000101000011110","0000000000000000010110000010000001000000111100110100000100101001","0000000000000000010101100001001110011000101111011111100000110100","0000000000000000010101000000011011110000100010001010111100111111","0000000000000000010100011111101001001000010100110110011001001010","0000000000000000010011111110110110100000000111100001110101010101","0000000000000000010011011110000011110111111010001101010001100000","0000000000000000010010111101010001001111101100111000101101101011","0000000000000000010010011100011110100111011111100100001001110110","0000000000000000010001111011101011111111010010001111100110000001","0000000000000000010001011010111001010111000100111011000010001100","0000000000000000010000111010000110101110110111100110011110010111","0000000000000000010000011001010100000110101010010001111010100010","0000000000000000001111111000100001011110011100111101010110101100","0000000000000000001111010111101110110110001111101000110010110111","0000000000000000001110110110111100001110000010010100001111000010","0000000000000000001110010110001001100101110100111111101011001101","0000000000000000001101110101010110111101100111101011000111011000","0000000000000000001101010100100100010101011010010110100011100011","0000000000000000001100110011110001101101001101000001111111101110","0000000000000000001100010010111111000100111111101101011011111001","0000000000000000001011110010001100011100110010011000111000000100","0000000000000000001011010001011001110100100101000100010100001111","0000000000000000001010110000100111001100010111101111110000011010","0000000000000000001010001111110100100100001010011011001100100101","0000000000000000001001101111000001111011111101000110101000110000","0000000000000000001001001110001111010011101111110010000100111011","0000000000000000001000101101011100101011100010011101100001000110","0000000000000000001000001100101010000011010101001000111101010001","0000000000000000000111101011110111011011000111110100011001011100","0000000000000000000111001011000100110010111010011111110101100111","0000000000000000000110101010010010001010101101001011010001110010","0000000000000000000110001001011111100010011111110110101101111101","0000000000000000000101101000101100111010010010100010001010001000","0000000000000000000101000111111010010010000101001101100110010011","0000000000000000000100100111000111101001110111111001000010011110","0000000000000000000100000110010101000001101010100100011110101001","0000000000000000000011100101100010011001011101001111111010110100","0000000000000000000011000100101111110001001111111011010110111111","0000000000000000000010100011111101001001000010100110110011001010","0000000000000000000010000011001010100000110101010010001111010101","0000000000000000000001100010010111111000100111111101101011100000","0000000000000000000001000001100101010000011010101001000111101011","0000000000000000000000100000110010101000001101010100100011110110","0000000000000000000000000000000000000000000000000000000000000001"],"x":[1.12e-308,1.118886679920477e-308,1.1177733598409543e-308,1.1166600397614315e-308,1.1155467196819086e-308,1.114433399602386e-308,1.113320079522863e-308,1.11220675944334e-308,1.111093439363817e-308,1.1099801192842943e-308,1.1088667992047715e-308,1.1077534791252486e-308,1.106640159045726e-308,1.105526838966203e-308,1.10441351888668e-308,1.103300198807157e-308,1.1021868787276344e-308,1.1010735586481115e-308,1.0999602385685887e-308,1.098846918489066e-308,1.097733598409543e-308,1.09662027833002e-308,1.095506958250497e-308,1.0943936381709744e-308,1.0932803180914515e-308,1.0921669980119287e-308,1.091053677932406e-308,1.0899403578528825e-308,1.0888270377733596e-308,1.0877137176938373e-308,1.0866003976143144e-308,1.0854870775347915e-308,1.084373757455268e-308,1.0832604373757453e-308,1.0821471172962225e-308,1.0810337972166996e-308,1.079920477137177e-308,1.078807157057654e-308,1.077693836978131e-308,1.076580516898608e-308,1.0754671968190854e-308,1.0743538767395625e-308,1.0732405566600397e-308,1.072127236580517e-308,1.071013916500994e-308,1.069900596421471e-308,1.068787276341948e-308,1.0676739562624254e-308,1.0665606361829025e-308,1.0654473161033797e-308,1.064333996023857e-308,1.063220675944334e-308,1.062107355864811e-308,1.0609940357852883e-308,1.0598807157057654e-308,1.0587673956262425e-308,1.0576540755467197e-308,1.056540755467197e-308,1.055427435387674e-308,1.054314115308151e-308,1.0532007952286283e-308,1.0520874751491054e-308,1.0509741550695826e-308,1.0498608349900597e-308,1.048747514910537e-308,1.047634194831014e-308,1.046520874751491e-308,1.0454075546719683e-308,1.0442942345924454e-308,1.0431809145129226e-308,1.0420675944333997e-308,1.040954274353877e-308,1.039840954274354e-308,1.038727634194831e-308,1.0376143141153083e-308,1.0365009940357855e-308,1.0353876739562626e-308,1.0342743538767397e-308,1.033161033797217e-308,1.032047713717694e-308,1.030934393638171e-308,1.0298210735586483e-308,1.0287077534791255e-308,1.0275944333996026e-308,1.0264811133200793e-308,1.0253677932405564e-308,1.024254473161034e-308,1.023141153081511e-308,1.0220278330019883e-308,1.020914512922465e-308,1.019801192842942e-308,1.0186878727634193e-308,1.017574552683897e-308,1.0164612326043736e-308,1.0153479125248507e-308,1.014234592445328e-308,1.013121272365805e-308,1.012007952286282e-308,1.0108946322067593e-308,1.0097813121272365e-308,1.0086679920477136e-308,1.0075546719681907e-308,1.006441351888668e-308,1.005328031809145e-308,1.004214711729622e-308,1.0031013916500993e-308,1.0019880715705765e-308,1.0008747514910536e-308,9.99761431411531e-309,9.98648111332008e-309,9.97534791252485e-309,9.96421471172962e-309,9.953081510934393e-309,9.941948310139165e-309,9.930815109343936e-309,9.91968190854871e-309,9.90854870775348e-309,9.89741550695825e-309,9.88628230616302e-309,9.875149105367794e-309,9.864015904572565e-309,9.852882703777337e-309,9.84174950298211e-309,9.83061630218688e-309,9.81948310139165e-309,9.80834990059642e-309,9.797216699801194e-309,9.786083499005965e-309,9.774950298210737e-309,9.76381709741551e-309,9.75268389662028e-309,9.74155069582505e-309,9.730417495029823e-309,9.719284294234594e-309,9.708151093439365e-309,9.697017892644137e-309,9.68588469184891e-309,9.67475149105368e-309,9.66361829025845e-309,9.652485089463223e-309,9.641351888667994e-309,9.630218687872766e-309,9.619085487077537e-309,9.60795228628231e-309,9.59681908548708e-309,9.58568588469185e-309,9.574552683896623e-309,9.563419483101394e-309,9.552286282306166e-309,9.541153081510937e-309,9.53001988071571e-309,9.51888667992048e-309,9.50775347912525e-309,9.496620278330023e-309,9.485487077534795e-309,9.474353876739566e-309,9.463220675944337e-309,9.45208747514911e-309,9.44095427435388e-309,9.429821073558647e-309,9.418687872763423e-309,9.407554671968195e-309,9.396421471172966e-309,9.38528827037774e-309,9.374155069582504e-309,9.363021868787276e-309,9.351888667992047e-309,9.340755467196823e-309,9.32962226640159e-309,9.31848906560636e-309,9.307355864811133e-309,9.296222664015904e-309,9.285089463220676e-309,9.273956262425447e-309,9.26282306163022e-309,9.25168986083499e-309,9.24055666003976e-309,9.229423459244533e-309,9.218290258449305e-309,9.207157057654076e-309,9.196023856858847e-309,9.18489065606362e-309,9.17375745526839e-309,9.16262425447316e-309,9.151491053677933e-309,9.140357852882705e-309,9.129224652087476e-309,9.11809145129225e-309,9.10695825049702e-309,9.09582504970179e-309,9.08469184890656e-309,9.073558648111333e-309,9.062425447316105e-309,9.051292246520876e-309,9.04015904572565e-309,9.02902584493042e-309,9.01789264413519e-309,9.00675944333996e-309,8.995626242544734e-309,8.984493041749505e-309,8.973359840954277e-309,8.96222664015905e-309,8.95109343936382e-309,8.93996023856859e-309,8.92882703777336e-309,8.917693836978134e-309,8.906560636182905e-309,8.895427435387677e-309,8.88429423459245e-309,8.87316103379722e-309,8.86202783300199e-309,8.850894632206763e-309,8.839761431411534e-309,8.828628230616305e-309,8.817495029821077e-309,8.80636182902585e-309,8.795228628230615e-309,8.78409542743539e-309,8.772962226640163e-309,8.761829025844934e-309,8.750695825049706e-309,8.73956262425447e-309,8.728429423459244e-309,8.71729622266402e-309,8.70616302186879e-309,8.69502982107356e-309,8.68389662027833e-309,8.6727634194831e-309,8.66163021868787e-309,8.650497017892644e-309,8.639363817097415e-309,8.628230616302187e-309,8.61709741550696e-309,8.60596421471173e-309,8.5948310139165e-309,8.583697813121273e-309,8.572564612326044e-309,8.561431411530815e-309,8.550298210735587e-309,8.53916500994036e-309,8.52803180914513e-309,8.5168986083499e-309,8.505765407554673e-309,8.494632206759444e-309,8.483499005964216e-309,8.472365805168987e-309,8.46123260437376e-309,8.45009940357853e-309,8.4389662027833e-309,8.427833001988073e-309,8.416699801192844e-309,8.405566600397616e-309,8.394433399602387e-309,8.38330019880716e-309,8.37216699801193e-309,8.3610337972167e-309,8.349900596421473e-309,8.338767395626245e-309,8.327634194831016e-309,8.316500994035787e-309,8.30536779324056e-309,8.29423459244533e-309,8.2831013916501e-309,8.271968190854873e-309,8.260834990059645e-309,8.249701789264416e-309,8.23856858846919e-309,8.22743538767396e-309,8.21630218687873e-309,8.2051689860835e-309,8.194035785288273e-309,8.182902584493045e-309,8.171769383697816e-309,8.16063618290259e-309,8.14950298210736e-309,8.13836978131213e-309,8.1272365805169e-309,8.116103379721674e-309,8.10497017892644e-309,8.093836978131217e-309,8.08270377733599e-309,8.07157057654076e-309,8.060437375745526e-309,8.049304174950297e-309,8.03817097415507e-309,8.027037773359845e-309,8.015904572564617e-309,8.004771371769383e-309,7.993638170974155e-309,7.982504970178926e-309,7.9713717693837e-309,7.96023856858847e-309,7.94910536779324e-309,7.93797216699801e-309,7.926838966202783e-309,7.915705765407555e-309,7.904572564612326e-309,7.8934393638171e-309,7.88230616302187e-309,7.87117296222664e-309,7.86003976143141e-309,7.848906560636184e-309,7.837773359840955e-309,7.826640159045726e-309,7.8155069582505e-309,7.80437375745527e-309,7.79324055666004e-309,7.78210735586481e-309,7.770974155069584e-309,7.759840954274355e-309,7.748707753479127e-309,7.7375745526839e-309,7.72644135188867e-309,7.71530815109344e-309,7.704174950298213e-309,7.693041749502984e-309,7.681908548707755e-309,7.670775347912527e-309,7.6596421471173e-309,7.64850894632207e-309,7.63737574552684e-309,7.626242544731613e-309,7.615109343936384e-309,7.603976143141156e-309,7.592842942345927e-309,7.5817097415507e-309,7.57057654075547e-309,7.55944333996024e-309,7.548310139165013e-309,7.537176938369784e-309,7.526043737574556e-309,7.514910536779327e-309,7.5037773359841e-309,7.49264413518887e-309,7.48151093439364e-309,7.470377733598413e-309,7.459244532803185e-309,7.448111332007956e-309,7.436978131212727e-309,7.425844930417494e-309,7.414711729622265e-309,7.403578528827037e-309,7.392445328031813e-309,7.381312127236585e-309,7.37017892644135e-309,7.359045725646123e-309,7.347912524850894e-309,7.336779324055666e-309,7.325646123260437e-309,7.31451292246521e-309,7.30337972166998e-309,7.29224652087475e-309,7.281113320079523e-309,7.269980119284294e-309,7.258846918489066e-309,7.247713717693837e-309,7.23658051689861e-309,7.22544731610338e-309,7.21431411530815e-309,7.203180914512923e-309,7.192047713717694e-309,7.180914512922466e-309,7.169781312127237e-309,7.15864811133201e-309,7.14751491053678e-309,7.13638170974155e-309,7.125248508946323e-309,7.114115308151095e-309,7.102982107355866e-309,7.09184890656064e-309,7.08071570576541e-309,7.06958250497018e-309,7.05844930417495e-309,7.047316103379723e-309,7.036182902584495e-309,7.025049701789266e-309,7.01391650099404e-309,7.00278330019881e-309,6.99165009940358e-309,6.98051689860835e-309,6.969383697813124e-309,6.958250497017895e-309,6.947117296222666e-309,6.93598409542744e-309,6.92485089463221e-309,6.91371769383698e-309,6.90258449304175e-309,6.891451292246524e-309,6.880318091451295e-309,6.869184890656067e-309,6.85805168986084e-309,6.84691848906561e-309,6.83578528827038e-309,6.824652087475152e-309,6.813518886679924e-309,6.802385685884695e-309,6.791252485089467e-309,6.78011928429424e-309,6.76898608349901e-309,6.75785288270378e-309,6.746719681908553e-309,6.735586481113324e-309,6.724453280318096e-309,6.713320079522867e-309,6.70218687872764e-309,6.69105367793241e-309,6.67992047713718e-309,6.668787276341953e-309,6.657654075546724e-309,6.64652087475149e-309,6.635387673956267e-309,6.62425447316104e-309,6.61312127236581e-309,6.60198807157058e-309,6.59085487077535e-309,6.57972166998012e-309,6.568588469184896e-309,6.557455268389667e-309,6.546322067594434e-309,6.535188866799205e-309,6.524055666003977e-309,6.51292246520875e-309,6.50178926441352e-309,6.49065606361829e-309,6.479522862823063e-309,6.468389662027834e-309,6.457256461232606e-309,6.446123260437377e-309,6.43499005964215e-309,6.42385685884692e-309,6.41272365805169e-309,6.401590457256463e-309,6.390457256461234e-309,6.379324055666006e-309,6.368190854870777e-309,6.35705765407555e-309,6.34592445328032e-309,6.33479125248509e-309,6.323658051689863e-309,6.312524850894634e-309,6.301391650099406e-309,6.290258449304177e-309,6.27912524850895e-309,6.26799204771372e-309,6.25685884691849e-309,6.245725646123263e-309,6.234592445328035e-309,6.223459244532806e-309,6.21232604373758e-309,6.20119284294235e-309,6.19005964214712e-309,6.17892644135189e-309,6.167793240556663e-309,6.156660039761435e-309,6.145526838966206e-309,6.13439363817098e-309,6.12326043737575e-309,6.11212723658052e-309,6.10099403578529e-309,6.089860834990064e-309,6.078727634194835e-309,6.067594433399606e-309,6.05646123260438e-309,6.04532803180915e-309,6.03419483101392e-309,6.02306163021869e-309,6.011928429423464e-309,6.000795228628235e-309,5.989662027833007e-309,5.97852882703778e-309,5.96739562624255e-309,5.956262425447316e-309,5.94512922465209e-309,5.933996023856864e-309,5.922862823061635e-309,5.9117296222664e-309,5.900596421471173e-309,5.889463220675945e-309,5.878330019880716e-309,5.867196819085493e-309,5.85606361829026e-309,5.84493041749503e-309,5.8337972166998e-309,5.822664015904574e-309,5.811530815109345e-309,5.800397614314116e-309,5.78926441351889e-309,5.77813121272366e-309,5.76699801192843e-309,5.7558648111332e-309,5.744731610337974e-309,5.733598409542745e-309,5.722465208747517e-309,5.71133200795229e-309,5.70019880715706e-309,5.68906560636183e-309,5.6779324055666e-309,5.666799204771374e-309,5.655666003976145e-309,5.644532803180917e-309,5.63339960238569e-309,5.62226640159046e-309,5.61113320079523e-309,5.600000000000003e-309,5.588866799204774e-309,5.577733598409546e-309,5.566600397614317e-309,5.55546719681909e-309,5.54433399602386e-309,5.53320079522863e-309,5.522067594433403e-309,5.510934393638174e-309,5.499801192842946e-309,5.488667992047717e-309,5.47753479125249e-309,5.46640159045726e-309,5.45526838966203e-309,5.444135188866803e-309,5.433001988071574e-309,5.421868787276346e-309,5.410735586481117e-309,5.39960238568589e-309,5.38846918489066e-309,5.37733598409543e-309,5.366202783300203e-309,5.355069582504975e-309,5.343936381709746e-309,5.33280318091452e-309,5.32166998011929e-309,5.31053677932406e-309,5.29940357852883e-309,5.288270377733603e-309,5.27713717693837e-309,5.26600397614314e-309,5.25487077534792e-309,5.243737574552684e-309,5.232604373757456e-309,5.221471172962227e-309,5.210337972167e-309,5.19920477137177e-309,5.18807157057654e-309,5.176938369781313e-309,5.165805168986084e-309,5.154671968190856e-309,5.143538767395627e-309,5.1324055666004e-309,5.12127236580517e-309,5.11013916500994e-309,5.099005964214713e-309,5.087872763419485e-309,5.076739562624256e-309,5.06560636182903e-309,5.0544731610338e-309,5.04333996023857e-309,5.03220675944334e-309,5.021073558648113e-309,5.009940357852885e-309,4.998807157057656e-309,4.98767395626243e-309,4.9765407554672e-309,4.96540755467197e-309,4.95427435387674e-309,4.943141153081514e-309,4.932007952286285e-309,4.920874751491056e-309,4.90974155069583e-309,4.8986083499006e-309,4.88747514910537e-309,4.87634194831014e-309,4.865208747514914e-309,4.854075546719685e-309,4.842942345924457e-309,4.83180914512923e-309,4.820675944334e-309,4.80954274353877e-309,4.79840954274354e-309,4.787276341948314e-309,4.776143141153085e-309,4.765009940357857e-309,4.75387673956263e-309,4.7427435387674e-309,4.73161033797217e-309,4.720477137176943e-309,4.709343936381714e-309,4.698210735586486e-309,4.687077534791257e-309,4.67594433399603e-309,4.6648111332008e-309,4.65367793240557e-309,4.642544731610343e-309,4.631411530815114e-309,4.620278330019886e-309,4.609145129224657e-309,4.59801192842943e-309,4.5868787276342e-309,4.57574552683897e-309,4.564612326043743e-309,4.553479125248514e-309,4.54234592445328e-309,4.531212723658057e-309,4.52007952286283e-309,4.508946322067595e-309,4.49781312127237e-309,4.48667992047714e-309,4.47554671968191e-309,4.46441351888668e-309,4.453280318091453e-309,4.442147117296224e-309,4.431013916500996e-309,4.419880715705767e-309,4.40874751491054e-309,4.39761431411531e-309,4.38648111332008e-309,4.375347912524853e-309,4.364214711729624e-309,4.353081510934396e-309,4.341948310139167e-309,4.33081510934394e-309,4.31968190854871e-309,4.30854870775348e-309,4.297415506958253e-309,4.286282306163024e-309,4.275149105367796e-309,4.264015904572567e-309,4.25288270377734e-309,4.24174950298211e-309,4.23061630218688e-309,4.219483101391653e-309,4.208349900596425e-309,4.197216699801196e-309,4.18608349900597e-309,4.17495029821074e-309,4.16381709741551e-309,4.15268389662028e-309,4.141550695825053e-309,4.130417495029825e-309,4.119284294234596e-309,4.10815109343937e-309,4.09701789264414e-309,4.08588469184891e-309,4.07475149105368e-309,4.063618290258454e-309,4.052485089463225e-309,4.041351888667996e-309,4.03021868787277e-309,4.01908548707754e-309,4.00795228628231e-309,3.99681908548708e-309,3.985685884691854e-309,3.974552683896625e-309,3.963419483101397e-309,3.95228628230617e-309,3.94115308151094e-309,3.93001988071571e-309,3.91888667992048e-309,3.907753479125254e-309,3.896620278330025e-309,3.885487077534797e-309,3.87435387673957e-309,3.86322067594434e-309,3.852087475149106e-309,3.84095427435388e-309,3.82982107355865e-309,3.81868787276342e-309,3.80755467196819e-309,3.796421471172964e-309,3.785288270377735e-309,3.774155069582506e-309,3.76302186878728e-309,3.75188866799205e-309,3.74075546719682e-309,3.72962226640159e-309,3.718489065606364e-309,3.707355864811135e-309,3.696222664015907e-309,3.68508946322068e-309,3.67395626242545e-309,3.66282306163022e-309,3.65168986083499e-309,3.640556660039764e-309,3.629423459244535e-309,3.618290258449307e-309,3.60715705765408e-309,3.59602385685885e-309,3.58489065606362e-309,3.573757455268393e-309,3.562624254473164e-309,3.551491053677936e-309,3.540357852882707e-309,3.52922465208748e-309,3.51809145129225e-309,3.50695825049702e-309,3.495825049701793e-309,3.484691848906564e-309,3.473558648111336e-309,3.462425447316107e-309,3.45129224652088e-309,3.44015904572565e-309,3.42902584493042e-309,3.417892644135193e-309,3.406759443339964e-309,3.395626242544736e-309,3.384493041749507e-309,3.37335984095428e-309,3.36222664015905e-309,3.35109343936382e-309,3.339960238568593e-309,3.328827037773365e-309,3.317693836978136e-309,3.30656063618291e-309,3.29542743538768e-309,3.28429423459245e-309,3.27316103379722e-309,3.262027833001993e-309,3.250894632206765e-309,3.239761431411536e-309,3.22862823061631e-309,3.21749502982108e-309,3.20636182902585e-309,3.19522862823062e-309,3.184095427435394e-309,3.172962226640165e-309,3.161829025844936e-309,3.15069582504971e-309,3.13956262425448e-309,3.12842942345925e-309,3.117296222664017e-309,3.106163021868794e-309,3.09502982107356e-309,3.08389662027833e-309,3.072763419483103e-309,3.061630218687875e-309,3.050497017892646e-309,3.039363817097418e-309,3.02823061630219e-309,3.01709741550696e-309,3.00596421471173e-309,2.994831013916503e-309,2.983697813121275e-309,2.972564612326046e-309,2.96143141153082e-309,2.95029821073559e-309,2.93916500994036e-309,2.92803180914513e-309,2.916898608349904e-309,2.905765407554675e-309,2.894632206759446e-309,2.88349900596422e-309,2.87236580516899e-309,2.86123260437376e-309,2.85009940357853e-309,2.838966202783304e-309,2.827833001988075e-309,2.816699801192847e-309,2.80556660039762e-309,2.79443339960239e-309,2.78330019880716e-309,2.77216699801193e-309,2.761033797216704e-309,2.749900596421475e-309,2.738767395626247e-309,2.72763419483102e-309,2.71650099403579e-309,2.70536779324056e-309,2.694234592445333e-309,2.683101391650104e-309,2.671968190854876e-309,2.660834990059647e-309,2.64970178926442e-309,2.63856858846919e-309,2.62743538767396e-309,2.616302186878733e-309,2.605168986083504e-309,2.594035785288276e-309,2.582902584493047e-309,2.57176938369782e-309,2.56063618290259e-309,2.54950298210736e-309,2.538369781312133e-309,2.527236580516904e-309,2.516103379721676e-309,2.504970178926447e-309,2.49383697813122e-309,2.48270377733599e-309,2.47157057654076e-309,2.46043737574553e-309,2.4493041749503e-309,2.43817097415507e-309,2.427037773359843e-309,2.415904572564614e-309,2.404771371769386e-309,2.393638170974157e-309,2.38250497017893e-309,2.3713717693837e-309,2.36023856858847e-309,2.349105367793243e-309,2.337972166998014e-309,2.326838966202786e-309,2.315705765407557e-309,2.30457256461233e-309,2.2934393638171e-309,2.28230616302187e-309,2.271172962226643e-309,2.260039761431414e-309,2.248906560636186e-309,2.237773359840957e-309,2.22664015904573e-309,2.2155069582505e-309,2.20437375745527e-309,2.193240556660043e-309,2.182107355864815e-309,2.170974155069586e-309,2.159840954274358e-309,2.14870775347913e-309,2.1375745526839e-309,2.12644135188867e-309,2.115308151093443e-309,2.104174950298215e-309,2.093041749502986e-309,2.08190854870776e-309,2.07077534791253e-309,2.0596421471173e-309,2.04850894632207e-309,2.037375745526844e-309,2.026242544731615e-309,2.015109343936386e-309,2.00397614314116e-309,1.99284294234593e-309,1.9817097415507e-309,1.97057654075547e-309,1.959443339960244e-309,1.948310139165015e-309,1.937176938369787e-309,1.92604373757456e-309,1.91491053677933e-309,1.9037773359841e-309,1.89264413518887e-309,1.881510934393644e-309,1.870377733598415e-309,1.859244532803187e-309,1.84811133200796e-309,1.83697813121273e-309,1.8258449304175e-309,1.814711729622273e-309,1.803578528827044e-309,1.792445328031816e-309,1.781312127236587e-309,1.77017892644136e-309,1.75904572564613e-309,1.747912524850896e-309,1.73677932405567e-309,1.72564612326044e-309,1.71451292246521e-309,1.70337972166998e-309,1.692246520874754e-309,1.681113320079525e-309,1.669980119284297e-309,1.65884691848907e-309,1.64771371769384e-309,1.63658051689861e-309,1.62544731610338e-309,1.614314115308154e-309,1.603180914512925e-309,1.592047713717697e-309,1.58091451292247e-309,1.56978131212724e-309,1.55864811133201e-309,1.547514910536783e-309,1.536381709741554e-309,1.525248508946326e-309,1.514115308151097e-309,1.50298210735587e-309,1.49184890656064e-309,1.48071570576541e-309,1.469582504970183e-309,1.458449304174954e-309,1.447316103379726e-309,1.436182902584497e-309,1.42504970178927e-309,1.41391650099404e-309,1.40278330019881e-309,1.391650099403583e-309,1.380516898608354e-309,1.369383697813126e-309,1.358250497017897e-309,1.34711729622267e-309,1.33598409542744e-309,1.32485089463221e-309,1.313717693836983e-309,1.302584493041755e-309,1.291451292246526e-309,1.280318091451298e-309,1.26918489065607e-309,1.25805168986084e-309,1.24691848906561e-309,1.235785288270383e-309,1.224652087475155e-309,1.213518886679926e-309,1.2023856858847e-309,1.19125248508947e-309,1.18011928429424e-309,1.16898608349901e-309,1.157852882703784e-309,1.146719681908555e-309,1.135586481113326e-309,1.1244532803181e-309,1.11332007952287e-309,1.10218687872764e-309,1.09105367793241e-309,1.079920477137184e-309,1.068787276341955e-309,1.05765407554672e-309,1.046520874751493e-309,1.035387673956265e-309,1.024254473161036e-309,1.013121272365807e-309,1.00198807157058e-309,9.9085487077535e-310,9.7972166998012e-310,9.68588469184893e-310,9.57455268389665e-310,9.46322067594436e-310,9.3518886679921e-310,9.2405566600398e-310,9.1292246520875e-310,9.0178926441352e-310,8.90656063618293e-310,8.79522862823065e-310,8.68389662027836e-310,8.5725646123261e-310,8.4612326043738e-310,8.3499005964215e-310,8.2385685884692e-310,8.12723658051694e-310,8.01590457256465e-310,7.90457256461237e-310,7.7932405566601e-310,7.6819085487078e-310,7.5705765407555e-310,7.4592445328032e-310,7.34791252485094e-310,7.23658051689865e-310,7.12524850894637e-310,7.0139165009941e-310,6.9025844930418e-310,6.7912524850895e-310,6.67992047713723e-310,6.56858846918494e-310,6.45725646123265e-310,6.34592445328037e-310,6.2345924453281e-310,6.1232604373758e-310,6.0119284294235e-310,5.90059642147123e-310,5.78926441351894e-310,5.67793240556666e-310,5.56660039761437e-310,5.4552683896621e-310,5.3439363817098e-310,5.2326043737575e-310,5.12127236580523e-310,5.00994035785294e-310,4.89860834990066e-310,4.78727634194837e-310,4.6759443339961e-310,4.5646123260438e-310,4.4532803180915e-310,4.34194831013923e-310,4.23061630218695e-310,4.11928429423466e-310,4.00795228628238e-310,3.8966202783301e-310,3.7852882703778e-310,3.6739562624255e-310,3.56262425447323e-310,3.4512922465209e-310,3.3399602385686e-310,3.22862823061633e-310,3.11729622266404e-310,3.00596421471176e-310,2.89463220675947e-310,2.7833001988072e-310,2.6719681908549e-310,2.5606361829026e-310,2.44930417495033e-310,2.33797216699804e-310,2.22664015904576e-310,2.11530815109347e-310,2.0039761431412e-310,1.8926441351889e-310,1.7813121272366e-310,1.66998011928433e-310,1.55864811133205e-310,1.44731610337976e-310,1.33598409542747e-310,1.2246520874752e-310,1.1133200795229e-310,1.0019880715706e-310,8.9065606361833e-311,7.7932405566605e-311,6.6799204771376e-311,5.566600397615e-311,4.453280318092e-311,3.339960238569e-311,2.226640159046e-311,1.1133200795233e-311,5.0e-324]}
},{}],62:[function(require,module,exports){
module.exports={"expected":["0110100101110100111001110001100011010111110101110110001001011010","0111111101000010000111100111110010110111001000111110101000111110","0111111101010010000111100111110010110111001000111110101000111110","0111111101011011001011011011101100010010101101011101111101011101","0111111101100010000111100111110010110111001000111110101000111110","0111111101100110101001100001101111100100111011001110010011001110","0111111101101011001011011011101100010010101101011101111101011101","0111111101101111101101010101101001000000011111101101100111101101","0111111101110010000111100111110010110111001000111110101000111110","0111111101110100011000100100110001001110000010000110011110000110","0111111101110110101001100001101111100100111011001110010011001110","0111111101111000111010011110101101111011110100010110001000010101","0111111101111011001011011011101100010010101101011101111101011101","0111111101111101011100011000101010101001100110100101110010100101","0111111101111111101101010101101001000000011111101101100111101101","0111111110000000111111001001010011101011101100011010101110011010","0111111110000010000111100111110010110111001000111110101000111110","0111111110000011010000000110010010000010100101100010100011100010","0111111110000100011000100100110001001110000010000110011110000110","0111111110000101100001000011010000011001011110101010011000101010","0111111110000110101001100001101111100100111011001110010011001110","0111111110000111110010000000001110110000010111110010001101110001","0111111110001000111010011110101101111011110100010110001000010101","0111111110001010000010111101001101000111010000111010000010111001","0111111110001011001011011011101100010010101101011101111101011101","0111111110001100010011111010001011011110001010000001111000000001","0111111110001101011100011000101010101001100110100101110010100101","0111111110001110100100110111001001110101000011001001101101001001","0111111110001111101101010101101001000000011111101101100111101101","0111111110010000011010111010000100000101111110001000110001001000","0111111110010000111111001001010011101011101100011010101110011010","0111111110010001100011011000100011010001011010101100101011101100","0111111110010010000111100111110010110111001000111110101000111110","0111111110010010101011110111000010011100110111010000100110010000","0111111110010011010000000110010010000010100101100010100011100010","0111111110010011110100010101100001101000010011110100100000110100","0111111110010100011000100100110001001110000010000110011110000110","0111111110010100111100110100000000110011110000011000011011011000","0111111110010101100001000011010000011001011110101010011000101010","0111111110010110000101010010011111111111001100111100010101111100","0111111110010110101001100001101111100100111011001110010011001110","0111111110010111001101110000111111001010101001100000010000100000","0111111110010111110010000000001110110000010111110010001101110001","0111111110011000010110001111011110010110000110000100001011000011","0111111110011000111010011110101101111011110100010110001000010101","0111111110011001011110101101111101100001100010101000000101100111","0111111110011010000010111101001101000111010000111010000010111001","0111111110011010100111001100011100101100111111001100000000001011","0111111110011011001011011011101100010010101101011101111101011101","0111111110011011101111101010111011111000011011101111111010101111","0111111110011100010011111010001011011110001010000001111000000001","0111111110011100111000001001011011000011111000010011110101010011","0111111110011101011100011000101010101001100110100101110010100101","0111111110011110000000100111111010001111010100110111101111110111","0111111110011110100100110111001001110101000011001001101101001001","0111111110011111001001000110011001011010110001011011101010011011","0111111110011111101101010101101001000000011111101101100111101101","0111111110100000001000110010011100010011000110111111110010011111","0111111110100000011010111010000100000101111110001000110001001000","0111111110100000101101000001101011111000110101010001101111110010","0111111110100000111111001001010011101011101100011010101110011010","0111111110100001010001010000111011011110100011100011101101000011","0111111110100001100011011000100011010001011010101100101011101100","0111111110100001110101100000001011000100010001110101101010010110","0111111110100010000111100111110010110111001000111110101000111110","0111111110100010011001101111011010101010000000000111100111100111","0111111110100010101011110111000010011100110111010000100110010000","0111111110100010111101111110101010001111101110011001100100111010","0111111110100011010000000110010010000010100101100010100011100010","0111111110100011100010001101111001110101011100101011100010001010","0111111110100011110100010101100001101000010011110100100000110100","0111111110100100000110011101001001011011001010111101011111011101","0111111110100100011000100100110001001110000010000110011110000110","0111111110100100101010101100011001000000111001001111011100101110","0111111110100100111100110100000000110011110000011000011011011000","0111111110100101001110111011101000100110100111100001011010000001","0111111110100101100001000011010000011001011110101010011000101010","0111111110100101110011001010111000001100010101110011010111010010","0111111110100110000101010010011111111111001100111100010101111100","0111111110100110010111011010000111110010000100000101010100100101","0111111110100110101001100001101111100100111011001110010011001110","0111111110100110111011101001010111010111110010010111010001110110","0111111110100111001101110000111111001010101001100000010000100000","0111111110100111011111111000100110111101100000101001001111001001","0111111110100111110010000000001110110000010111110010001101110001","0111111110101000000100000111110110100011001110111011001100011010","0111111110101000010110001111011110010110000110000100001011000011","0111111110101000101000010111000110001000111101001101001001101101","0111111110101000111010011110101101111011110100010110001000010101","0111111110101001001100100110010101101110101011011111000110111110","0111111110101001011110101101111101100001100010101000000101100111","0111111110101001110000110101100101010100011001110001000100010001","0111111110101010000010111101001101000111010000111010000010111001","0111111110101010010101000100110100111010001000000011000001100010","0111111110101010100111001100011100101100111111001100000000001011","0111111110101010111001010100000100011111110110010100111110110101","0111111110101011001011011011101100010010101101011101111101011101","0111111110101011011101100011010100000101100100100110111100000110","0111111110101011101111101010111011111000011011101111111010101111","0111111110101100000001110010100011101011010010111000111001011001","0111111110101100010011111010001011011110001010000001111000000001","0111111110101100100110000001110011010001000001001010110110101001","0111111110101100111000001001011011000011111000010011110101010011","0111111110101101001010010001000010110110101111011100110011111100","0111111110101101011100011000101010101001100110100101110010100101","0111111110101101101110100000010010011100011101101110110001001101","0111111110101110000000100111111010001111010100110111101111110111","0111111110101110010010101111100010000010001100000000101110100000","0111111110101110100100110111001001110101000011001001101101001001","0111111110101110110110111110110001100111111010010010101011110001","0111111110101111001001000110011001011010110001011011101010011011","0111111110101111011011001110000001001101101000100100101001000100","0111111110101111101101010101101001000000011111101101100111101101","0111111110101111111111011101010000110011010110110110100110010101","0111111110110000001000110010011100010011000110111111110010011111","0111111110110000010001110110010000001100100010100100010001110100","0111111110110000011010111010000100000101111110001000110001001000","0111111110110000100011111101110111111111011001101101010000011101","0111111110110000101101000001101011111000110101010001101111110010","0111111110110000110110000101011111110010010000110110001111000110","0111111110110000111111001001010011101011101100011010101110011010","0111111110110001001000001101000111100101000111111111001101101110","0111111110110001010001010000111011011110100011100011101101000011","0111111110110001011010010100101111010111111111001000001100011000","0111111110110001100011011000100011010001011010101100101011101100","0111111110110001101100011100010111001010110110010001001011000000","0111111110110001110101100000001011000100010001110101101010010110","0111111110110001111110100011111110111101101101011010001001101010","0111111110110010000111100111110010110111001000111110101000111110","0111111110110010010000101011100110110000100100100011001000010010","0111111110110010011001101111011010101010000000000111100111100111","0111111110110010100010110011001110100011011011101100000110111100","0111111110110010101011110111000010011100110111010000100110010000","0111111110110010110100111010110110010110010010110101000101100100","0111111110110010111101111110101010001111101110011001100100111010","0111111110110011000111000010011110001001001001111110000100001110","0111111110110011010000000110010010000010100101100010100011100010","0111111110110011011001001010000101111100000001000111000010110110","0111111110110011100010001101111001110101011100101011100010001010","0111111110110011101011010001101101101110111000010000000001100000","0111111110110011110100010101100001101000010011110100100000110100","0111111110110011111101011001010101100001101111011001000000001000","0111111110110100000110011101001001011011001010111101011111011101","0111111110110100001111100000111101010100100110100001111110110010","0111111110110100011000100100110001001110000010000110011110000110","0111111110110100100001101000100101000111011101101010111101011010","0111111110110100101010101100011001000000111001001111011100101110","0111111110110100110011110000001100111010010100110011111100000100","0111111110110100111100110100000000110011110000011000011011011000","0111111110110101000101110111110100101101001011111100111010101100","0111111110110101001110111011101000100110100111100001011010000001","0111111110110101010111111111011100100000000011000101111001010110","0111111110110101100001000011010000011001011110101010011000101010","0111111110110101101010000111000100010010111010001110110111111110","0111111110110101110011001010111000001100010101110011010111010010","0111111110110101111100001110101100000101110001010111110110100111","0111111110110110000101010010011111111111001100111100010101111100","0111111110110110001110010110010011111000101000100000110101010000","0111111110110110010111011010000111110010000100000101010100100101","0111111110110110100000011101111011101011011111101001110011111001","0111111110110110101001100001101111100100111011001110010011001110","0111111110110110110010100101100011011110010110110010110010100010","0111111110110110111011101001010111010111110010010111010001110110","0111111110110111000100101101001011010001001101111011110001001011","0111111110110111001101110000111111001010101001100000010000100000","0111111110110111010110110100110011000100000101000100101111110100","0111111110110111011111111000100110111101100000101001001111001001","0111111110110111101000111100011010110110111100001101101110011101","0111111110110111110010000000001110110000010111110010001101110001","0111111110110111111011000100000010101001110011010110101101000110","0111111110111000000100000111110110100011001110111011001100011010","0111111110111000001101001011101010011100101010011111101011101111","0111111110111000010110001111011110010110000110000100001011000011","0111111110111000011111010011010010001111100001101000101010011000","0111111110111000101000010111000110001000111101001101001001101101","0111111110111000110001011010111010000010011000110001101001000001","0111111110111000111010011110101101111011110100010110001000010101","0111111110111001000011100010100001110101001111111010100111101010","0111111110111001001100100110010101101110101011011111000110111110","0111111110111001010101101010001001101000000111000011100110010011","0111111110111001011110101101111101100001100010101000000101100111","0111111110111001100111110001110001011010111110001100100100111100","0111111110111001110000110101100101010100011001110001000100010001","0111111110111001111001111001011001001101110101010101100011100101","0111111110111010000010111101001101000111010000111010000010111001","0111111110111010001100000001000001000000101100011110100010001101","0111111110111010010101000100110100111010001000000011000001100010","0111111110111010011110001000101000110011100011100111100000110111","0111111110111010100111001100011100101100111111001100000000001011","0111111110111010110000010000010000100110011010110000011111011111","0111111110111010111001010100000100011111110110010100111110110101","0111111110111011000010010111111000011001010001111001011110001001","0111111110111011001011011011101100010010101101011101111101011101","0111111110111011010100011111100000001100001001000010011100110001","0111111110111011011101100011010100000101100100100110111100000110","0111111110111011100110100111000111111111000000001011011011011011","0111111110111011101111101010111011111000011011101111111010101111","0111111110111011111000101110101111110001110111010100011010000011","0111111110111100000001110010100011101011010010111000111001011001","0111111110111100001010110110010111100100101110011101011000101101","0111111110111100010011111010001011011110001010000001111000000001","0111111110111100011100111101111111010111100101100110010111010101","0111111110111100100110000001110011010001000001001010110110101001","0111111110111100101111000101100111001010011100101111010101111111","0111111110111100111000001001011011000011111000010011110101010011","0111111110111101000001001101001110111101010011111000010100100111","0111111110111101001010010001000010110110101111011100110011111100","0111111110111101010011010100110110110000001011000001010011010001","0111111110111101011100011000101010101001100110100101110010100101","0111111110111101100101011100011110100011000010001010010001111001","0111111110111101101110100000010010011100011101101110110001001101","0111111110111101110111100100000110010101111001010011010000100011","0111111110111110000000100111111010001111010100110111101111110111","0111111110111110001001101011101110001000110000011100001111001011","0111111110111110010010101111100010000010001100000000101110100000","0111111110111110011011110011010101111011100111100101001101110101","0111111110111110100100110111001001110101000011001001101101001001","0111111110111110101101111010111101101110011110101110001100011101","0111111110111110110110111110110001100111111010010010101011110001","0111111110111111000000000010100101100001010101110111001011000110","0111111110111111001001000110011001011010110001011011101010011011","0111111110111111010010001010001101010100001101000000001001101111","0111111110111111011011001110000001001101101000100100101001000100","0111111110111111100100010001110101000111000100001001001000011000","0111111110111111101101010101101001000000011111101101100111101101","0111111110111111110110011001011100111001111011010010000111000001","0111111110111111111111011101010000110011010110110110100110010101","0111111111000000000100010000100010010110011001001101100010110101","0111111111000000001000110010011100010011000110111111110010011111","0111111111000000001101010100010110001111110100110010000010001001","0111111111000000010001110110010000001100100010100100010001110100","0111111111000000010110011000001010001001010000010110100001011110","0111111111000000011010111010000100000101111110001000110001001000","0111111111000000011111011011111110000010101011111011000000110011","0111111111000000100011111101110111111111011001101101010000011101","0111111111000000101000011111110001111100000111011111100000000111","0111111111000000101101000001101011111000110101010001101111110010","0111111111000000110001100011100101110101100011000011111111011011","0111111111000000110110000101011111110010010000110110001111000110","0111111111000000111010100111011001101110111110101000011110110000","0111111111000000111111001001010011101011101100011010101110011010","0111111111000001000011101011001101101000011010001100111110000101","0111111111000001001000001101000111100101000111111111001101101110","0111111111000001001100101111000001100001110101110001011101011001","0111111111000001010001010000111011011110100011100011101101000011","0111111111000001010101110010110101011011010001010101111100101101","0111111111000001011010010100101111010111111111001000001100011000","0111111111000001011110110110101001010100101100111010011100000010","0111111111000001100011011000100011010001011010101100101011101100","0111111111000001100111111010011101001110001000011110111011010111","0111111111000001101100011100010111001010110110010001001011000000","0111111111000001110000111110010001000111100100000011011010101011","0111111111000001110101100000001011000100010001110101101010010110","0111111111000001111010000010000101000000111111100111111001111111","0111111111000001111110100011111110111101101101011010001001101010","0111111111000010000011000101111000111010011011001100011001010011","0111111111000010000111100111110010110111001000111110101000111110","0111111111000010001100001001101100110011110110110000111000101001","0111111111000010010000101011100110110000100100100011001000010010","0111111111000010010101001101100000101101010010010101010111111101","0111111111000010011001101111011010101010000000000111100111100111","0111111111000010011110010001010100100110101101111001110111010001","0111111111000010100010110011001110100011011011101100000110111100","0111111111000010100111010101001000100000001001011110010110100101","0111111111000010101011110111000010011100110111010000100110010000","0111111111000010110000011000111100011001100101000010110101111011","0111111111000010110100111010110110010110010010110101000101100100","0111111111000010111001011100110000010011000000100111010101001111","0111111111000010111101111110101010001111101110011001100100111010","0111111111000011000010100000100100001100011100001011110100100011","0111111111000011000111000010011110001001001001111110000100001110","0111111111000011001011100100011000000101110111110000010011110111","0111111111000011010000000110010010000010100101100010100011100010","0111111111000011010100101000001011111111010011010100110011001101","0111111111000011011001001010000101111100000001000111000010110110","0111111111000011011101101011111111111000101110111001010010100001","0111111111000011100010001101111001110101011100101011100010001010","0111111111000011100110101111110011110010001010011101110001110101","0111111111000011101011010001101101101110111000010000000001100000","0111111111000011101111110011100111101011100110000010010001001001","0111111111000011110100010101100001101000010011110100100000110100","0111111111000011111000110111011011100101000001100110110000011111","0111111111000011111101011001010101100001101111011001000000001000","0111111111000100000001111011001111011110011101001011001111110011","0111111111000100000110011101001001011011001010111101011111011101","0111111111000100001010111111000011010111111000101111101111000111","0111111111000100001111100000111101010100100110100001111110110010","0111111111000100010100000010110111010001010100010100001110011011","0111111111000100011000100100110001001110000010000110011110000110","0111111111000100011101000110101011001010101111111000101101110000","0111111111000100100001101000100101000111011101101010111101011010","0111111111000100100110001010011111000100001011011101001101000101","0111111111000100101010101100011001000000111001001111011100101110","0111111111000100101111001110010010111101100111000001101100011001","0111111111000100110011110000001100111010010100110011111100000100","0111111111000100111000010010000110110111000010100110001011101101","0111111111000100111100110100000000110011110000011000011011011000","0111111111000101000001010101111010110000011110001010101011000010","0111111111000101000101110111110100101101001011111100111010101100","0111111111000101001010011001101110101001111001101111001010010111","0111111111000101001110111011101000100110100111100001011010000001","0111111111000101010011011101100010100011010101010011101001101011","0111111111000101010111111111011100100000000011000101111001010110","0111111111000101011100100001010110011100110000111000001000111111","0111111111000101100001000011010000011001011110101010011000101010","0111111111000101100101100101001010010110001100011100101000010100","0111111111000101101010000111000100010010111010001110110111111110","0111111111000101101110101000111110001111101000000001000111101001","0111111111000101110011001010111000001100010101110011010111010010","0111111111000101110111101100110010001001000011100101100110111101","0111111111000101111100001110101100000101110001010111110110100111","0111111111000110000000110000100110000010011111001010000110010001","0111111111000110000101010010011111111111001100111100010101111100","0111111111000110001001110100011001111011111010101110100101100110","0111111111000110001110010110010011111000101000100000110101010000","0111111111000110010010111000001101110101010110010011000100111011","0111111111000110010111011010000111110010000100000101010100100101","0111111111000110011011111100000001101110110001110111100100001111","0111111111000110100000011101111011101011011111101001110011111001","0111111111000110100100111111110101101000001101011100000011100011","0111111111000110101001100001101111100100111011001110010011001110","0111111111000110101110000011101001100001101001000000100010111000","0111111111000110110010100101100011011110010110110010110010100010","0111111111000110110111000111011101011011000100100101000010001100","0111111111000110111011101001010111010111110010010111010001110110","0111111111000111000000001011010001010100100000001001100001100001","0111111111000111000100101101001011010001001101111011110001001011","0111111111000111001001001111000101001101111011101110000000110101","0111111111000111001101110000111111001010101001100000010000100000","0111111111000111010010010010111001000111010111010010100000001010","0111111111000111010110110100110011000100000101000100101111110100","0111111111000111011011010110101101000000110010110110111111011110","0111111111000111011111111000100110111101100000101001001111001001","0111111111000111100100011010100000111010001110011011011110110011","0111111111000111101000111100011010110110111100001101101110011101","0111111111000111101101011110010100110011101001111111111110000111","0111111111000111110010000000001110110000010111110010001101110001","0111111111000111110110100010001000101101000101100100011101011100","0111111111000111111011000100000010101001110011010110101101000110","0111111111000111111111100101111100100110100001001000111100110000","0111111111001000000100000111110110100011001110111011001100011010","0111111111001000001000101001110000011111111100101101011100000101","0111111111001000001101001011101010011100101010011111101011101111","0111111111001000010001101101100100011001011000010001111011011001","0111111111001000010110001111011110010110000110000100001011000011","0111111111001000011010110001011000010010110011110110011010101110","0111111111001000011111010011010010001111100001101000101010011000","0111111111001000100011110101001100001100001111011010111010000010","0111111111001000101000010111000110001000111101001101001001101101","0111111111001000101100111001000000000101101010111111011001010111","0111111111001000110001011010111010000010011000110001101001000001","0111111111001000110101111100110011111111000110100011111000101011","0111111111001000111010011110101101111011110100010110001000010101","0111111111001000111111000000100111111000100010001000011000000000","0111111111001001000011100010100001110101001111111010100111101010","0111111111001001001000000100011011110001111101101100110111010100","0111111111001001001100100110010101101110101011011111000110111110","0111111111001001010001001000001111101011011001010001010110101000","0111111111001001010101101010001001101000000111000011100110010011","0111111111001001011010001100000011100100110100110101110101111101","0111111111001001011110101101111101100001100010101000000101100111","0111111111001001100011001111110111011110010000011010010101010010","0111111111001001100111110001110001011010111110001100100100111100","0111111111001001101100010011101011010111101011111110110100100110","0111111111001001110000110101100101010100011001110001000100010001","0111111111001001110101010111011111010001000111100011010011111010","0111111111001001111001111001011001001101110101010101100011100101","0111111111001001111110011011010011001010100011000111110011001111","0111111111001010000010111101001101000111010000111010000010111001","0111111111001010000111011111000111000011111110101100010010100100","0111111111001010001100000001000001000000101100011110100010001101","0111111111001010010000100010111010111101011010010000110001111000","0111111111001010010101000100110100111010001000000011000001100010","0111111111001010011001100110101110110110110101110101010001001100","0111111111001010011110001000101000110011100011100111100000110111","0111111111001010100010101010100010110000010001011001110000100001","0111111111001010100111001100011100101100111111001100000000001011","0111111111001010101011101110010110101001101100111110001111110110","0111111111001010110000010000010000100110011010110000011111011111","0111111111001010110100110010001010100011001000100010101111001010","0111111111001010111001010100000100011111110110010100111110110101","0111111111001010111101110101111110011100100100000111001110011110","0111111111001011000010010111111000011001010001111001011110001001","0111111111001011000110111001110010010101111111101011101101110011","0111111111001011001011011011101100010010101101011101111101011101","0111111111001011001111111101100110001111011011010000001101001000","0111111111001011010100011111100000001100001001000010011100110001","0111111111001011011001000001011010001000110110110100101100011100","0111111111001011011101100011010100000101100100100110111100000110","0111111111001011100010000101001110000010010010011001001011110000","0111111111001011100110100111000111111111000000001011011011011011","0111111111001011101011001001000001111011101101111101101011000100","0111111111001011101111101010111011111000011011101111111010101111","0111111111001011110100001100110101110101001001100010001010011010","0111111111001011111000101110101111110001110111010100011010000011","0111111111001011111101010000101001101110100101000110101001101110","0111111111001100000001110010100011101011010010111000111001011001","0111111111001100000110010100011101101000000000101011001001000010","0111111111001100001010110110010111100100101110011101011000101101","0111111111001100001111011000010001100001011100001111101000010110","0111111111001100010011111010001011011110001010000001111000000001","0111111111001100011000011100000101011010110111110100000111101100","0111111111001100011100111101111111010111100101100110010111010101","0111111111001100100001011111111001010100010011011000100111000000","0111111111001100100110000001110011010001000001001010110110101001","0111111111001100101010100011101101001101101110111101000110010100","0111111111001100101111000101100111001010011100101111010101111111","0111111111001100110011100111100001000111001010100001100101101000","0111111111001100111000001001011011000011111000010011110101010011","0111111111001100111100101011010101000000100110000110000100111110","0111111111001101000001001101001110111101010011111000010100100111","0111111111001101000101101111001000111010000001101010100100010010","0111111111001101001010010001000010110110101111011100110011111100","0111111111001101001110110010111100110011011101001111000011100110","0111111111001101010011010100110110110000001011000001010011010001","0111111111001101010111110110110000101100111000110011100010111010","0111111111001101011100011000101010101001100110100101110010100101","0111111111001101100000111010100100100110010100011000000010010000","0111111111001101100101011100011110100011000010001010010001111001","0111111111001101101001111110011000011111101111111100100001100100","0111111111001101101110100000010010011100011101101110110001001101","0111111111001101110011000010001100011001001011100001000000111000","0111111111001101110111100100000110010101111001010011010000100011","0111111111001101111100000110000000010010100111000101100000001100","0111111111001110000000100111111010001111010100110111101111110111","0111111111001110000101001001110100001100000010101001111111100001","0111111111001110001001101011101110001000110000011100001111001011","0111111111001110001110001101101000000101011110001110011110110110","0111111111001110010010101111100010000010001100000000101110100000","0111111111001110010111010001011011111110111001110010111110001010","0111111111001110011011110011010101111011100111100101001101110101","0111111111001110100000010101001111111000010101010111011101011110","0111111111001110100100110111001001110101000011001001101101001001","0111111111001110101001011001000011110001110000111011111100110011","0111111111001110101101111010111101101110011110101110001100011101","0111111111001110110010011100110111101011001100100000011100001000","0111111111001110110110111110110001100111111010010010101011110001","0111111111001110111011100000101011100100101000000100111011011100","0111111111001111000000000010100101100001010101110111001011000110","0111111111001111000100100100011111011110000011101001011010110000","0111111111001111001001000110011001011010110001011011101010011011","0111111111001111001101101000010011010111011111001101111010000101","0111111111001111010010001010001101010100001101000000001001101111","0111111111001111010110101100000111010000111010110010011001011010","0111111111001111011011001110000001001101101000100100101001000100","0111111111001111011111101111111011001010010110010110111000101110","0111111111001111100100010001110101000111000100001001001000011000","0111111111001111101000110011101111000011110001111011011000000010","0111111111001111101101010101101001000000011111101101100111101101","0111111111001111110001110111100010111101001101011111110111010111","0111111111001111110110011001011100111001111011010010000111000001","0111111111001111111010111011010110110110101001000100010110101100","0111111111001111111111011101010000110011010110110110100110010101","0111111111010000000001111111100101011000000010010100011011000000","0111111111010000000100010000100010010110011001001101100010110101","0111111111010000000110100001011111010100110000000110101010101010","0111111111010000001000110010011100010011000110111111110010011111","0111111111010000001011000011011001010001011101111000111010010101","0111111111010000001101010100010110001111110100110010000010001001","0111111111010000001111100101010011001110001011101011001001111111","0111111111010000010001110110010000001100100010100100010001110100","0111111111010000010100000111001101001010111001011101011001101001","0111111111010000010110011000001010001001010000010110100001011110","0111111111010000011000101001000111000111100111001111101001010011","0111111111010000011010111010000100000101111110001000110001001000","0111111111010000011101001011000001000100010101000001111000111101","0111111111010000011111011011111110000010101011111011000000110011","0111111111010000100001101100111011000001000010110100001000101000","0111111111010000100011111101110111111111011001101101010000011101","0111111111010000100110001110110100111101110000100110011000010010","0111111111010000101000011111110001111100000111011111100000000111","0111111111010000101010110000101110111010011110011000100111111100","0111111111010000101101000001101011111000110101010001101111110010","0111111111010000101111010010101000110111001100001010110111100111","0111111111010000110001100011100101110101100011000011111111011011","0111111111010000110011110100100010110011111001111101000111010000","0111111111010000110110000101011111110010010000110110001111000110","0111111111010000111000010110011100110000100111101111010110111011","0111111111010000111010100111011001101110111110101000011110110000","0111111111010000111100111000010110101101010101100001100110100101","0111111111010000111111001001010011101011101100011010101110011010","0111111111010001000001011010010000101010000011010011110110001111","0111111111010001000011101011001101101000011010001100111110000101","0111111111010001000101111100001010100110110001000110000101111010","0111111111010001001000001101000111100101000111111111001101101110","0111111111010001001010011110000100100011011110111000010101100100","0111111111010001001100101111000001100001110101110001011101011001","0111111111010001001110111111111110100000001100101010100101001110","0111111111010001010001010000111011011110100011100011101101000011","0111111111010001010011100001111000011100111010011100110100111000","0111111111010001010101110010110101011011010001010101111100101101","0111111111010001011000000011110010011001101000001111000100100010","0111111111010001011010010100101111010111111111001000001100011000","0111111111010001011100100101101100010110010110000001010100001101","0111111111010001011110110110101001010100101100111010011100000010","0111111111010001100001000111100110010011000011110011100011110111","0111111111010001100011011000100011010001011010101100101011101100","0111111111010001100101101001100000001111110001100101110011100001","0111111111010001100111111010011101001110001000011110111011010111","0111111111010001101010001011011010001100011111011000000011001100","0111111111010001101100011100010111001010110110010001001011000000","0111111111010001101110101101010100001001001101001010010010110110","0111111111010001110000111110010001000111100100000011011010101011","0111111111010001110011001111001110000101111010111100100010100000","0111111111010001110101100000001011000100010001110101101010010110","0111111111010001110111110001001000000010101000101110110010001010","0111111111010001111010000010000101000000111111100111111001111111","0111111111010001111100010011000001111111010110100001000001110100","0111111111010001111110100011111110111101101101011010001001101010","0111111111010010000000110100111011111100000100010011010001011111","0111111111010010000011000101111000111010011011001100011001010011","0111111111010010000101010110110101111000110010000101100001001001","0111111111010010000111100111110010110111001000111110101000111110","0111111111010010001001111000101111110101011111110111110000110011","0111111111010010001100001001101100110011110110110000111000101001","0111111111010010001110011010101001110010001101101010000000011110","0111111111010010010000101011100110110000100100100011001000010010","0111111111010010010010111100100011101110111011011100010000001000","0111111111010010010101001101100000101101010010010101010111111101","0111111111010010010111011110011101101011101001001110011111110010","0111111111010010011001101111011010101010000000000111100111100111","0111111111010010011100000000010111101000010111000000101111011100","0111111111010010011110010001010100100110101101111001110111010001","0111111111010010100000100010010001100101000100110010111111000110","0111111111010010100010110011001110100011011011101100000110111100","0111111111010010100101000100001011100001110010100101001110110001","0111111111010010100111010101001000100000001001011110010110100101","0111111111010010101001100110000101011110100000010111011110011011","0111111111010010101011110111000010011100110111010000100110010000","0111111111010010101110000111111111011011001110001001101110000101","0111111111010010110000011000111100011001100101000010110101111011","0111111111010010110010101001111001010111111011111011111101101111","0111111111010010110100111010110110010110010010110101000101100100","0111111111010010110111001011110011010100101001101110001101011010","0111111111010010111001011100110000010011000000100111010101001111","0111111111010010111011101101101101010001010111100000011101000100","0111111111010010111101111110101010001111101110011001100100111010","0111111111010011000000001111100111001110000101010010101100101110","0111111111010011000010100000100100001100011100001011110100100011","0111111111010011000100110001100001001010110011000100111100011000","0111111111010011000111000010011110001001001001111110000100001110","0111111111010011001001010011011011000111100000110111001100000011","0111111111010011001011100100011000000101110111110000010011110111","0111111111010011001101110101010101000100001110101001011011101101","0111111111010011010000000110010010000010100101100010100011100010","0111111111010011010010010111001111000000111100011011101011010111","0111111111010011010100101000001011111111010011010100110011001101","0111111111010011010110111001001000111101101010001101111011000001","0111111111010011011001001010000101111100000001000111000010110110","0111111111010011011011011011000010111010011000000000001010101100","0111111111010011011101101011111111111000101110111001010010100001","0111111111010011011111111100111100110111000101110010011010010110","0111111111010011100010001101111001110101011100101011100010001010","0111111111010011100100011110110110110011110011100100101010000000","0111111111010011100110101111110011110010001010011101110001110101","0111111111010011101001000000110000110000100001010110111001101010","0111111111010011101011010001101101101110111000010000000001100000","0111111111010011101101100010101010101101001111001001001001010100","0111111111010011101111110011100111101011100110000010010001001001","0111111111010011110010000100100100101001111100111011011000111111","0111111111010011110100010101100001101000010011110100100000110100","0111111111010011110110100110011110100110101010101101101000101001","0111111111010011111000110111011011100101000001100110110000011111","0111111111010011111011001000011000100011011000011111111000010011","0111111111010011111101011001010101100001101111011001000000001000","0111111111010011111111101010010010100000000110010010000111111110","0111111111010100000001111011001111011110011101001011001111110011","0111111111010100000100001100001100011100110100000100010111101000","0111111111010100000110011101001001011011001010111101011111011101","0111111111010100001000101110000110011001100001110110100111010010","0111111111010100001010111111000011010111111000101111101111000111","0111111111010100001101010000000000010110001111101000110110111100","0111111111010100001111100000111101010100100110100001111110110010","0111111111010100010001110001111010010010111101011011000110100110","0111111111010100010100000010110111010001010100010100001110011011","0111111111010100010110010011110100001111101011001101010110010001","0111111111010100011000100100110001001110000010000110011110000110","0111111111010100011010110101101110001100011000111111100101111011","0111111111010100011101000110101011001010101111111000101101110000","0111111111010100011111010111101000001001000110110001110101100101","0111111111010100100001101000100101000111011101101010111101011010","0111111111010100100011111001100010000101110100100100000101010000","0111111111010100100110001010011111000100001011011101001101000101","0111111111010100101000011011011100000010100010010110010100111010","0111111111010100101010101100011001000000111001001111011100101110","0111111111010100101100111101010101111111010000001000100100100100","0111111111010100101111001110010010111101100111000001101100011001","0111111111010100110001011111001111111011111101111010110100001110","0111111111010100110011110000001100111010010100110011111100000100","0111111111010100110110000001001001111000101011101101000011111000","0111111111010100111000010010000110110111000010100110001011101101","0111111111010100111010100011000011110101011001011111010011100011","0111111111010100111100110100000000110011110000011000011011011000","0111111111010100111111000100111101110010000111010001100011001101","0111111111010101000001010101111010110000011110001010101011000010","0111111111010101000011100110110111101110110101000011110010110111","0111111111010101000101110111110100101101001011111100111010101100","0111111111010101001000001000110001101011100010110110000010100010","0111111111010101001010011001101110101001111001101111001010010111","0111111111010101001100101010101011101000010000101000010010001011","0111111111010101001110111011101000100110100111100001011010000001","0111111111010101010001001100100101100100111110011010100001110110","0111111111010101010011011101100010100011010101010011101001101011","0111111111010101010101101110011111100001101100001100110001100000","0111111111010101010111111111011100100000000011000101111001010110","0111111111010101011010010000011001011110011001111111000001001010","0111111111010101011100100001010110011100110000111000001000111111","0111111111010101011110110010010011011011000111110001010000110101","0111111111010101100001000011010000011001011110101010011000101010","0111111111010101100011010100001101010111110101100011100000011111","0111111111010101100101100101001010010110001100011100101000010100","0111111111010101100111110110000111010100100011010101110000001001","0111111111010101101010000111000100010010111010001110110111111110","0111111111010101101100011000000001010001010001000111111111110100","0111111111010101101110101000111110001111101000000001000111101001","0111111111010101110000111001111011001101111110111010001111011101","0111111111010101110011001010111000001100010101110011010111010010","0111111111010101110101011011110101001010101100101100011111001000","0111111111010101110111101100110010001001000011100101100110111101","0111111111010101111001111101101111000111011010011110101110110010","0111111111010101111100001110101100000101110001010111110110100111","0111111111010101111110011111101001000100001000010000111110011100","0111111111010110000000110000100110000010011111001010000110010001","0111111111010110000011000001100011000000110110000011001110000111","0111111111010110000101010010011111111111001100111100010101111100","0111111111010110000111100011011100111101100011110101011101110000","0111111111010110001001110100011001111011111010101110100101100110","0111111111010110001100000101010110111010010001100111101101011011","0111111111010110001110010110010011111000101000100000110101010000","0111111111010110010000100111010000110110111111011001111101000110","0111111111010110010010111000001101110101010110010011000100111011","0111111111010110010101001001001010110011101101001100001100101111","0111111111010110010111011010000111110010000100000101010100100101","0111111111010110011001101011000100110000011010111110011100011010","0111111111010110011011111100000001101110110001110111100100001111","0111111111010110011110001100111110101101001000110000101100000100","0111111111010110100000011101111011101011011111101001110011111001","0111111111010110100010101110111000101001110110100010111011101110","0111111111010110100100111111110101101000001101011100000011100011","0111111111010110100111010000110010100110100100010101001011011001","0111111111010110101001100001101111100100111011001110010011001110","0111111111010110101011110010101100100011010010000111011011000010","0111111111010110101110000011101001100001101001000000100010111000","0111111111010110110000010100100110011111111111111001101010101101","0111111111010110110010100101100011011110010110110010110010100010","0111111111010110110100110110100000011100101101101011111010011000","0111111111010110110111000111011101011011000100100101000010001100","0111111111010110111001011000011010011001011011011110001010000001","0111111111010110111011101001010111010111110010010111010001110110","0111111111010110111101111010010100010110001001010000011001101100","0111111111010111000000001011010001010100100000001001100001100001","0111111111010111000010011100001110010010110111000010101001010110","0111111111010111000100101101001011010001001101111011110001001011","0111111111010111000110111110001000001111100100110100111001000000","0111111111010111001001001111000101001101111011101110000000110101","0111111111010111001011100000000010001100010010100111001000101011","0111111111010111001101110000111111001010101001100000010000100000","0111111111010111010000000001111100001001000000011001011000010100","0111111111010111010010010010111001000111010111010010100000001010","0111111111010111010100100011110110000101101110001011100111111111","0111111111010111010110110100110011000100000101000100101111110100","0111111111010111011001000101110000000010011011111101110111101010","0111111111010111011011010110101101000000110010110110111111011110","0111111111010111011101100111101001111111001001110000000111010011","0111111111010111011111111000100110111101100000101001001111001001","0111111111010111100010001001100011111011110111100010010110111110","0111111111010111100100011010100000111010001110011011011110110011","0111111111010111100110101011011101111000100101010100100110100111","0111111111010111101000111100011010110110111100001101101110011101","0111111111010111101011001101010111110101010011000110110110010010","0111111111010111101101011110010100110011101001111111111110000111","0111111111010111101111101111010001110010000000111001000101111101","0111111111010111110010000000001110110000010111110010001101110001","0111111111010111110100010001001011101110101110101011010101100110","0111111111010111110110100010001000101101000101100100011101011100","0111111111010111111000110011000101101011011100011101100101010001","0111111111010111111011000100000010101001110011010110101101000110","0111111111010111111101010100111111101000001010001111110100111100","0111111111010111111111100101111100100110100001001000111100110000","0111111111011000000001110110111001100100111000000010000100100101","0111111111011000000100000111110110100011001110111011001100011010","0111111111011000000110011000110011100001100101110100010100010000","0111111111011000001000101001110000011111111100101101011100000101","0111111111011000001010111010101101011110010011100110100011111001","0111111111011000001101001011101010011100101010011111101011101111","0111111111011000001111011100100111011011000001011000110011100100","0111111111011000010001101101100100011001011000010001111011011001","0111111111011000010011111110100001010111101111001011000011001111","0111111111011000010110001111011110010110000110000100001011000011","0111111111011000011000100000011011010100011100111101010010111000","0111111111011000011010110001011000010010110011110110011010101110","0111111111011000011101000010010101010001001010101111100010100011","0111111111011000011111010011010010001111100001101000101010011000","0111111111011000100001100100001111001101111000100001110010001101","0111111111011000100011110101001100001100001111011010111010000010","0111111111011000100110000110001001001010100110010100000001110111","0111111111011000101000010111000110001000111101001101001001101101","0111111111011000101010101000000011000111010100000110010001100010","0111111111011000101100111001000000000101101010111111011001010111","0111111111011000101111001001111101000100000001111000100001001011","0111111111011000110001011010111010000010011000110001101001000001","0111111111011000110011101011110111000000101111101010110000110110","0111111111011000110101111100110011111111000110100011111000101011","0111111111011000111000001101110000111101011101011101000000100001","0111111111011000111010011110101101111011110100010110001000010101","0111111111011000111100101111101010111010001011001111010000001010","0111111111011000111111000000100111111000100010001000011000000000","0111111111011001000001010001100100110110111001000001011111110101","0111111111011001000011100010100001110101001111111010100111101010","0111111111011001000101110011011110110011100110110011101111011111","0111111111011001001000000100011011110001111101101100110111010100","0111111111011001001010010101011000110000010100100101111111001001","0111111111011001001100100110010101101110101011011111000110111110","0111111111011001001110110111010010101101000010011000001110110100","0111111111011001010001001000001111101011011001010001010110101000","0111111111011001010011011001001100101001110000001010011110011101","0111111111011001010101101010001001101000000111000011100110010011","0111111111011001010111111011000110100110011101111100101110001000","0111111111011001011010001100000011100100110100110101110101111101","0111111111011001011100011101000000100011001011101110111101110011","0111111111011001011110101101111101100001100010101000000101100111","0111111111011001100000111110111010011111111001100001001101011100","0111111111011001100011001111110111011110010000011010010101010010","0111111111011001100101100000110100011100100111010011011101000111","0111111111011001100111110001110001011010111110001100100100111100","0111111111011001101010000010101110011001010101000101101100110001","0111111111011001101100010011101011010111101011111110110100100110","0111111111011001101110100100101000010110000010110111111100011011","0111111111011001110000110101100101010100011001110001000100010001","0111111111011001110011000110100010010010110000101010001100000110","0111111111011001110101010111011111010001000111100011010011111010","0111111111011001110111101000011100001111011110011100011011101111","0111111111011001111001111001011001001101110101010101100011100101","0111111111011001111100001010010110001100001100001110101011011010","0111111111011001111110011011010011001010100011000111110011001111","0111111111011010000000101100010000001000111010000000111011000100","0111111111011010000010111101001101000111010000111010000010111001","0111111111011010000101001110001010000101100111110011001010101110","0111111111011010000111011111000111000011111110101100010010100100","0111111111011010001001110000000100000010010101100101011010011001","0111111111011010001100000001000001000000101100011110100010001101","0111111111011010001110010001111101111111000011010111101010000011","0111111111011010010000100010111010111101011010010000110001111000","0111111111011010010010110011110111111011110001001001111001101101","0111111111011010010101000100110100111010001000000011000001100010","0111111111011010010111010101110001111000011110111100001001011000","0111111111011010011001100110101110110110110101110101010001001100","0111111111011010011011110111101011110101001100101110011001000001","0111111111011010011110001000101000110011100011100111100000110111","0111111111011010100000011001100101110001111010100000101000101100","0111111111011010100010101010100010110000010001011001110000100001","0111111111011010100100111011011111101110101000010010111000010110","0111111111011010100111001100011100101100111111001100000000001011","0111111111011010101001011101011001101011010110000101001000000000","0111111111011010101011101110010110101001101100111110001111110110","0111111111011010101101111111010011101000000011110111010111101011","0111111111011010110000010000010000100110011010110000011111011111","0111111111011010110010100001001101100100110001101001100111010101","0111111111011010110100110010001010100011001000100010101111001010","0111111111011010110111000011000111100001011111011011110110111111","0111111111011010111001010100000100011111110110010100111110110101","0111111111011010111011100101000001011110001101001110000110101001","0111111111011010111101110101111110011100100100000111001110011110","0111111111011011000000000110111011011010111011000000010110010011","0111111111011011000010010111111000011001010001111001011110001001","0111111111011011000100101000110101010111101000110010100101111110","0111111111011011000110111001110010010101111111101011101101110011","0111111111011011001001001010101111010100010110100100110101101000","0111111111011011001011011011101100010010101101011101111101011101","0111111111011011001101101100101001010001000100010111000101010010","0111111111011011001111111101100110001111011011010000001101001000","0111111111011011010010001110100011001101110010001001010100111101","0111111111011011010100011111100000001100001001000010011100110001","0111111111011011010110110000011101001010011111111011100100100111","0111111111011011011001000001011010001000110110110100101100011100","0111111111011011011011010010010111000111001101101101110100010001","0111111111011011011101100011010100000101100100100110111100000110","0111111111011011011111110100010001000011111011100000000011111011","0111111111011011100010000101001110000010010010011001001011110000","0111111111011011100100010110001011000000101001010010010011100101","0111111111011011100110100111000111111111000000001011011011011011","0111111111011011101000111000000100111101010111000100100011010000","0111111111011011101011001001000001111011101101111101101011000100","0111111111011011101101011001111110111010000100110110110010111010","0111111111011011101111101010111011111000011011101111111010101111","0111111111011011110001111011111000110110110010101001000010100100","0111111111011011110100001100110101110101001001100010001010011010","0111111111011011110110011101110010110011100000011011010010001111","0111111111011011111000101110101111110001110111010100011010000011","0111111111011011111010111111101100110000001110001101100001111001","0111111111011011111101010000101001101110100101000110101001101110","0111111111011011111111100001100110101100111011111111110001100011","0111111111011100000001110010100011101011010010111000111001011001","0111111111011100000100000011100000101001101001110010000001001101","0111111111011100000110010100011101101000000000101011001001000010","0111111111011100001000100101011010100110010111100100010000110111","0111111111011100001010110110010111100100101110011101011000101101","0111111111011100001101000111010100100011000101010110100000100010","0111111111011100001111011000010001100001011100001111101000010110","0111111111011100010001101001001110011111110011001000110000001100","0111111111011100010011111010001011011110001010000001111000000001","0111111111011100010110001011001000011100100000111010111111110110","0111111111011100011000011100000101011010110111110100000111101100","0111111111011100011010101101000010011001001110101101001111100000","0111111111011100011100111101111111010111100101100110010111010101","0111111111011100011111001110111100010101111100011111011111001011","0111111111011100100001011111111001010100010011011000100111000000","0111111111011100100011110000110110010010101010010001101110110101","0111111111011100100110000001110011010001000001001010110110101001","0111111111011100101000010010110000001111011000000011111110011111","0111111111011100101010100011101101001101101110111101000110010100","0111111111011100101100110100101010001100000101110110001110001001","0111111111011100101111000101100111001010011100101111010101111111","0111111111011100110001010110100100001000110011101000011101110100","0111111111011100110011100111100001000111001010100001100101101000","0111111111011100110101111000011110000101100001011010101101011110","0111111111011100111000001001011011000011111000010011110101010011","0111111111011100111010011010011000000010001111001100111101001000","0111111111011100111100101011010101000000100110000110000100111110","0111111111011100111110111100010001111110111100111111001100110010","0111111111011101000001001101001110111101010011111000010100100111","0111111111011101000011011110001011111011101010110001011100011101","0111111111011101000101101111001000111010000001101010100100010010","0111111111011101001000000000000101111000011000100011101100000111","0111111111011101001010010001000010110110101111011100110011111100","0111111111011101001100100001111111110101000110010101111011110001","0111111111011101001110110010111100110011011101001111000011100110","0111111111011101010001000011111001110001110100001000001011011011","0111111111011101010011010100110110110000001011000001010011010001","0111111111011101010101100101110011101110100001111010011011000101","0111111111011101010111110110110000101100111000110011100010111010","0111111111011101011010000111101101101011001111101100101010110000","0111111111011101011100011000101010101001100110100101110010100101","0111111111011101011110101001100111100111111101011110111010011010","0111111111011101100000111010100100100110010100011000000010010000","0111111111011101100011001011100001100100101011010001001010000100","0111111111011101100101011100011110100011000010001010010001111001","0111111111011101100111101101011011100001011001000011011001101111","0111111111011101101001111110011000011111101111111100100001100100","0111111111011101101100001111010101011110000110110101101001011001","0111111111011101101110100000010010011100011101101110110001001101","0111111111011101110000110001001111011010110100100111111001000011","0111111111011101110011000010001100011001001011100001000000111000","0111111111011101110101010011001001010111100010011010001000101101","0111111111011101110111100100000110010101111001010011010000100011","0111111111011101111001110101000011010100010000001100011000010111","0111111111011101111100000110000000010010100111000101100000001100","0111111111011101111110010110111101010000111101111110101000000010","0111111111011110000000100111111010001111010100110111101111110111","0111111111011110000010111000110111001101101011110000110111101100","0111111111011110000101001001110100001100000010101001111111100001","0111111111011110000111011010110001001010011001100011000111010110","0111111111011110001001101011101110001000110000011100001111001011","0111111111011110001011111100101011000111000111010101010111000001","0111111111011110001110001101101000000101011110001110011110110110","0111111111011110010000011110100101000011110101000111100110101010","0111111111011110010010101111100010000010001100000000101110100000","0111111111011110010101000000011111000000100010111001110110010101","0111111111011110010111010001011011111110111001110010111110001010","0111111111011110011001100010011000111101010000101100000101111111","0111111111011110011011110011010101111011100111100101001101110101","0111111111011110011110000100010010111001111110011110010101101001","0111111111011110100000010101001111111000010101010111011101011110","0111111111011110100010100110001100110110101100010000100101010100","0111111111011110100100110111001001110101000011001001101101001001","0111111111011110100111001000000110110011011010000010110100111110","0111111111011110101001011001000011110001110000111011111100110011","0111111111011110101011101010000000110000000111110101000100101000","0111111111011110101101111010111101101110011110101110001100011101","0111111111011110110000001011111010101100110101100111010100010011","0111111111011110110010011100110111101011001100100000011100001000","0111111111011110110100101101110100101001100011011001100011111100","0111111111011110110110111110110001100111111010010010101011110001","0111111111011110111001001111101110100110010001001011110011100111","0111111111011110111011100000101011100100101000000100111011011100","0111111111011110111101110001101000100010111110111110000011010001","0111111111011111000000000010100101100001010101110111001011000110","0111111111011111000010010011100010011111101100110000010010111011","0111111111011111000100100100011111011110000011101001011010110000","0111111111011111000110110101011100011100011010100010100010100110","0111111111011111001001000110011001011010110001011011101010011011","0111111111011111001011010111010110011001001000010100110010010000","0111111111011111001101101000010011010111011111001101111010000101","0111111111011111001111111001010000010101110110000111000001111010","0111111111011111010010001010001101010100001101000000001001101111","0111111111011111010100011011001010010010100011111001010001100101","0111111111011111010110101100000111010000111010110010011001011010","0111111111011111011000111101000100001111010001101011100001001110","0111111111011111011011001110000001001101101000100100101001000100","0111111111011111011101011110111110001011111111011101110000111001","0111111111011111011111101111111011001010010110010110111000101110","0111111111011111100010000000111000001000101101010000000000100011","0111111111011111100100010001110101000111000100001001001000011000","0111111111011111100110100010110010000101011011000010010000001101","0111111111011111101000110011101111000011110001111011011000000010","0111111111011111101011000100101100000010001000110100011111111000","0111111111011111101101010101101001000000011111101101100111101101","0111111111011111101111100110100101111110110110100110101111100001","0111111111011111110001110111100010111101001101011111110111010111","0111111111011111110100001000011111111011100100011000111111001100","0111111111011111110110011001011100111001111011010010000111000001","0111111111011111111000101010011001111000010010001011001110110111","0111111111011111111010111011010110110110101001000100010110101100","0111111111011111111101001100010011110100111111111101011110100000","0111111111011111111111011101010000110011010110110110100110010101","0111111111100000000000110111000110111000110110110111110111000101","0111111111100000000001111111100101011000000010010100011011000000","0111111111100000000011001000000011110111001101110000111110111010","0111111111100000000100010000100010010110011001001101100010110101","0111111111100000000101011001000000110101100100101010000110110000","0111111111100000000110100001011111010100110000000110101010101010","0111111111100000000111101001111101110011111011100011001110100101","0111111111100000001000110010011100010011000110111111110010011111","0111111111100000001001111010111010110010010010011100010110011010","0111111111100000001011000011011001010001011101111000111010010101","0111111111100000001100001011110111110000101001010101011110001111","0111111111100000001101010100010110001111110100110010000010001001","0111111111100000001110011100110100101111000000001110100110000100","0111111111100000001111100101010011001110001011101011001001111111","0111111111100000010000101101110001101101010111000111101101111001","0111111111100000010001110110010000001100100010100100010001110100","0111111111100000010010111110101110101011101110000000110101101110","0111111111100000010100000111001101001010111001011101011001101001","0111111111100000010101001111101011101010000100111001111101100011","0111111111100000010110011000001010001001010000010110100001011110","0111111111100000010111100000101000101000011011110011000101011001","0111111111100000011000101001000111000111100111001111101001010011","0111111111100000011001110001100101100110110010101100001101001110","0111111111100000011010111010000100000101111110001000110001001000","0111111111100000011100000010100010100101001001100101010101000011","0111111111100000011101001011000001000100010101000001111000111101","0111111111100000011110010011011111100011100000011110011100110111","0111111111100000011111011011111110000010101011111011000000110011","0111111111100000100000100100011100100001110111010111100100101101","0111111111100000100001101100111011000001000010110100001000101000","0111111111100000100010110101011001100000001110010000101100100010","0111111111100000100011111101110111111111011001101101010000011101","0111111111100000100101000110010110011110100101001001110100010111","0111111111100000100110001110110100111101110000100110011000010010","0111111111100000100111010111010011011100111100000010111100001101","0111111111100000101000011111110001111100000111011111100000000111","0111111111100000101001101000010000011011010010111100000100000010","0111111111100000101010110000101110111010011110011000100111111100","0111111111100000101011111001001101011001101001110101001011110110","0111111111100000101101000001101011111000110101010001101111110010","0111111111100000101110001010001010011000000000101110010011101100","0111111111100000101111010010101000110111001100001010110111100111","0111111111100000110000011011000111010110010111100111011011100001","0111111111100000110001100011100101110101100011000011111111011011","0111111111100000110010101100000100010100101110100000100011010110","0111111111100000110011110100100010110011111001111101000111010000","0111111111100000110100111101000001010011000101011001101011001100","0111111111100000110110000101011111110010010000110110001111000110","0111111111100000110111001101111110010001011100010010110011000000","0111111111100000111000010110011100110000100111101111010110111011","0111111111100000111001011110111011001111110011001011111010110101","0111111111100000111010100111011001101110111110101000011110110000","0111111111100000111011101111111000001110001010000101000010101011","0111111111100000111100111000010110101101010101100001100110100101","0111111111100000111110000000110101001100100000111110001010100000","0111111111100000111111001001010011101011101100011010101110011010","0111111111100001000000010001110010001010110111110111010010010101","0111111111100001000001011010010000101010000011010011110110001111","0111111111100001000010100010101111001001001110110000011010001001","0111111111100001000011101011001101101000011010001100111110000101","0111111111100001000100110011101100000111100101101001100001111111","0111111111100001000101111100001010100110110001000110000101111010","0111111111100001000111000100101001000101111100100010101001110100","0111111111100001001000001101000111100101000111111111001101101110","0111111111100001001001010101100110000100010011011011110001101001","0111111111100001001010011110000100100011011110111000010101100100","0111111111100001001011100110100011000010101010010100111001011111","0111111111100001001100101111000001100001110101110001011101011001","0111111111100001001101110111100000000001000001001110000001010011","0111111111100001001110111111111110100000001100101010100101001110","0111111111100001010000001000011100111111011000000111001001001000","0111111111100001010001010000111011011110100011100011101101000011","0111111111100001010010011001011001111101101111000000010000111110","0111111111100001010011100001111000011100111010011100110100111000","0111111111100001010100101010010110111100000101111001011000110011","0111111111100001010101110010110101011011010001010101111100101101","0111111111100001010110111011010011111010011100110010100000101000","0111111111100001011000000011110010011001101000001111000100100010","0111111111100001011001001100010000111000110011101011101000011110","0111111111100001011010010100101111010111111111001000001100011000","0111111111100001011011011101001101110111001010100100110000010010","0111111111100001011100100101101100010110010110000001010100001101","0111111111100001011101101110001010110101100001011101111000000111","0111111111100001011110110110101001010100101100111010011100000010","0111111111100001011111111111000111110011111000010110111111111101","0111111111100001100001000111100110010011000011110011100011110111","0111111111100001100010010000000100110010001111010000000111110010","0111111111100001100011011000100011010001011010101100101011101100","0111111111100001100100100001000001110000100110001001001111100111","0111111111100001100101101001100000001111110001100101110011100001","0111111111100001100110110001111110101110111101000010010111011011","0111111111100001100111111010011101001110001000011110111011010111","0111111111100001101001000010111011101101010011111011011111010001","0111111111100001101010001011011010001100011111011000000011001100","0111111111100001101011010011111000101011101010110100100111000110","0111111111100001101100011100010111001010110110010001001011000000","0111111111100001101101100100110101101010000001101101101110111011","0111111111100001101110101101010100001001001101001010010010110110","0111111111100001101111110101110010101000011000100110110110110001","0111111111100001110000111110010001000111100100000011011010101011","0111111111100001110010000110101111100110101111011111111110100101","0111111111100001110011001111001110000101111010111100100010100000"],"x":[1.0e200,9.940357852882704e304,1.9880715705765407e305,2.982107355864811e305,3.9761431411530815e305,4.970178926441352e305,5.964214711729622e305,6.958250497017893e305,7.952286282306163e305,8.946322067594434e305,9.940357852882704e305,1.0934393638170974e306,1.1928429423459244e306,1.2922465208747515e306,1.3916500994035786e306,1.4910536779324055e306,1.5904572564612326e306,1.6898608349900597e306,1.7892644135188867e306,1.8886679920477138e306,1.988071570576541e306,2.0874751491053677e306,2.1868787276341947e306,2.2862823061630218e306,2.385685884691849e306,2.485089463220676e306,2.584493041749503e306,2.68389662027833e306,2.7833001988071572e306,2.882703777335984e306,2.982107355864811e306,3.081510934393638e306,3.180914512922465e306,3.280318091451292e306,3.3797216699801193e306,3.4791252485089464e306,3.5785288270377735e306,3.6779324055666006e306,3.7773359840954276e306,3.876739562624255e306,3.976143141153082e306,4.075546719681909e306,4.1749502982107353e306,4.2743538767395624e306,4.3737574552683895e306,4.4731610337972166e306,4.5725646123260436e306,4.671968190854871e306,4.771371769383698e306,4.870775347912525e306,4.970178926441352e306,5.069582504970179e306,5.168986083499006e306,5.268389662027833e306,5.36779324055666e306,5.4671968190854873e306,5.5666003976143144e306,5.666003976143141e306,5.765407554671968e306,5.864811133200796e306,5.964214711729622e306,6.063618290258449e306,6.163021868787276e306,6.262425447316105e306,6.36182902584493e306,6.461232604373757e306,6.560636182902585e306,6.660039761431413e306,6.759443339960239e306,6.858846918489065e306,6.958250497017893e306,7.05765407554672e306,7.157057654075547e306,7.256461232604373e306,7.355864811133201e306,7.455268389662028e306,7.554671968190855e306,7.654075546719681e306,7.75347912524851e306,7.852882703777337e306,7.952286282306164e306,8.05168986083499e306,8.151093439363818e306,8.250497017892645e306,8.349900596421471e306,8.449304174950298e306,8.548707753479125e306,8.648111332007953e306,8.747514910536779e306,8.846918489065606e306,8.946322067594433e306,9.045725646123261e306,9.145129224652087e306,9.244532803180914e306,9.343936381709741e306,9.44333996023857e306,9.542743538767396e306,9.642147117296223e306,9.74155069582505e306,9.840954274353878e306,9.940357852882704e306,1.003976143141153e307,1.0139165009940358e307,1.0238568588469185e307,1.0337972166998012e307,1.0437375745526838e307,1.0536779324055666e307,1.0636182902584493e307,1.073558648111332e307,1.0834990059642146e307,1.0934393638170975e307,1.1033797216699802e307,1.1133200795228629e307,1.1232604373757455e307,1.1332007952286282e307,1.143141153081511e307,1.1530815109343936e307,1.1630218687872764e307,1.1729622266401592e307,1.1829025844930418e307,1.1928429423459244e307,1.202783300198807e307,1.2127236580516898e307,1.2226640159045727e307,1.2326043737574552e307,1.2425447316103378e307,1.252485089463221e307,1.2624254473161035e307,1.272365805168986e307,1.2823061630218687e307,1.2922465208747515e307,1.3021868787276343e307,1.312127236580517e307,1.3220675944333995e307,1.3320079522862826e307,1.3419483101391652e307,1.3518886679920477e307,1.3618290258449303e307,1.371769383697813e307,1.381709741550696e307,1.3916500994035786e307,1.4015904572564611e307,1.411530815109344e307,1.4214711729622268e307,1.4314115308151094e307,1.441351888667992e307,1.4512922465208746e307,1.4612326043737576e307,1.4711729622266402e307,1.4811133200795228e307,1.4910536779324056e307,1.5009940357852885e307,1.510934393638171e307,1.5208747514910536e307,1.5308151093439362e307,1.540755467196819e307,1.550695825049702e307,1.5606361829025845e307,1.5705765407554673e307,1.58051689860835e307,1.5904572564612327e307,1.6003976143141153e307,1.610337972166998e307,1.6202783300198807e307,1.6302186878727635e307,1.6401590457256461e307,1.650099403578529e307,1.6600397614314115e307,1.6699801192842941e307,1.679920477137177e307,1.6898608349900595e307,1.6998011928429424e307,1.709741550695825e307,1.7196819085487078e307,1.7296222664015906e307,1.7395626242544732e307,1.7495029821073558e307,1.7594433399602386e307,1.7693836978131212e307,1.779324055666004e307,1.7892644135188866e307,1.7992047713717695e307,1.8091451292246523e307,1.8190854870775349e307,1.8290258449304175e307,1.8389662027833e307,1.8489065606361829e307,1.8588469184890657e307,1.8687872763419483e307,1.8787276341948309e307,1.888667992047714e307,1.8986083499005965e307,1.908548707753479e307,1.9184890656063617e307,1.9284294234592445e307,1.9383697813121274e307,1.94831013916501e307,1.9582504970178925e307,1.9681908548707756e307,1.9781312127236582e307,1.9880715705765408e307,1.9980119284294234e307,2.007952286282306e307,2.017892644135189e307,2.0278330019880716e307,2.0377733598409542e307,2.047713717693837e307,2.0576540755467199e307,2.0675944333996024e307,2.077534791252485e307,2.0874751491053676e307,2.0974155069582507e307,2.1073558648111333e307,2.1172962226640158e307,2.1272365805168987e307,2.1371769383697815e307,2.147117296222664e307,2.1570576540755467e307,2.1669980119284293e307,2.176938369781312e307,2.186878727634195e307,2.1968190854870775e307,2.2067594433399603e307,2.216699801192843e307,2.2266401590457258e307,2.2365805168986083e307,2.246520874751491e307,2.256461232604374e307,2.2664015904572563e307,2.276341948310139e307,2.286282306163022e307,2.2962226640159046e307,2.306163021868787e307,2.31610337972167e307,2.326043737574553e307,2.3359840954274354e307,2.3459244532803185e307,2.3558648111332006e307,2.3658051689860837e307,2.375745526838966e307,2.385685884691849e307,2.395626242544732e307,2.405566600397614e307,2.415506958250497e307,2.4254473161033797e307,2.435387673956262e307,2.4453280318091453e307,2.455268389662028e307,2.4652087475149105e307,2.4751491053677936e307,2.4850894632206757e307,2.4950298210735587e307,2.504970178926442e307,2.514910536779324e307,2.524850894632207e307,2.534791252485089e307,2.544731610337972e307,2.554671968190855e307,2.5646123260437373e307,2.5745526838966204e307,2.584493041749503e307,2.5944333996023856e307,2.6043737574552686e307,2.6143141153081507e307,2.624254473161034e307,2.634194831013917e307,2.644135188866799e307,2.654075546719682e307,2.664015904572565e307,2.673956262425447e307,2.6838966202783303e307,2.6938369781312124e307,2.7037773359840955e307,2.7137176938369786e307,2.7236580516898606e307,2.7335984095427437e307,2.743538767395626e307,2.753479125248509e307,2.763419483101392e307,2.773359840954274e307,2.783300198807157e307,2.79324055666004e307,2.8031809145129223e307,2.8131212723658054e307,2.823061630218688e307,2.8330019880715705e307,2.8429423459244536e307,2.8528827037773357e307,2.862823061630219e307,2.8727634194831014e307,2.882703777335984e307,2.892644135188867e307,2.902584493041749e307,2.912524850894632e307,2.9224652087475153e307,2.9324055666003974e307,2.9423459244532805e307,2.952286282306163e307,2.9622266401590456e307,2.9721669980119287e307,2.9821073558648113e307,2.992047713717694e307,3.001988071570577e307,3.011928429423459e307,3.021868787276342e307,3.0318091451292247e307,3.0417495029821073e307,3.0516898608349904e307,3.0616302186878724e307,3.0715705765407555e307,3.081510934393638e307,3.0914512922465207e307,3.101391650099404e307,3.1113320079522864e307,3.121272365805169e307,3.131212723658052e307,3.1411530815109346e307,3.151093439363817e307,3.1610337972167e307,3.1709741550695824e307,3.1809145129224654e307,3.190854870775348e307,3.2007952286282306e307,3.210735586481113e307,3.220675944333996e307,3.230616302186879e307,3.2405566600397614e307,3.250497017892644e307,3.260437375745527e307,3.2703777335984097e307,3.2803180914512923e307,3.290258449304175e307,3.300198807157058e307,3.3101391650099405e307,3.320079522862823e307,3.3300198807157057e307,3.3399602385685883e307,3.3499005964214713e307,3.359840954274354e307,3.3697813121272365e307,3.379721669980119e307,3.389662027833002e307,3.399602385685885e307,3.4095427435387673e307,3.41948310139165e307,3.429423459244533e307,3.4393638170974156e307,3.449304174950298e307,3.459244532803181e307,3.469184890656064e307,3.4791252485089464e307,3.489065606361829e307,3.4990059642147116e307,3.5089463220675947e307,3.518886679920477e307,3.52882703777336e307,3.5387673956262424e307,3.548707753479125e307,3.558648111332008e307,3.5685884691848907e307,3.578528827037773e307,3.5884691848906563e307,3.598409542743539e307,3.6083499005964215e307,3.6182902584493046e307,3.6282306163021867e307,3.6381709741550697e307,3.6481113320079523e307,3.658051689860835e307,3.667992047713718e307,3.6779324055666e307,3.687872763419483e307,3.6978131212723657e307,3.7077534791252483e307,3.7176938369781314e307,3.727634194831014e307,3.7375745526838966e307,3.7475149105367796e307,3.7574552683896617e307,3.767395626242545e307,3.777335984095428e307,3.78727634194831e307,3.797216699801193e307,3.8071570576540756e307,3.817097415506958e307,3.8270377733598413e307,3.8369781312127234e307,3.8469184890656065e307,3.856858846918489e307,3.8667992047713716e307,3.8767395626242547e307,3.886679920477137e307,3.89662027833002e307,3.906560636182903e307,3.916500994035785e307,3.926441351888668e307,3.936381709741551e307,3.9463220675944333e307,3.9562624254473164e307,3.9662027833001985e307,3.9761431411530815e307,3.9860834990059646e307,3.9960238568588467e307,4.00596421471173e307,4.015904572564612e307,4.025844930417495e307,4.035785288270378e307,4.04572564612326e307,4.055666003976143e307,4.0656063618290263e307,4.0755467196819084e307,4.0854870775347915e307,4.095427435387674e307,4.1053677932405566e307,4.1153081510934397e307,4.125248508946322e307,4.135188866799205e307,4.145129224652088e307,4.15506958250497e307,4.165009940357853e307,4.174950298210735e307,4.1848906560636183e307,4.1948310139165014e307,4.2047713717693834e307,4.2147117296222665e307,4.224652087475149e307,4.2345924453280317e307,4.244532803180915e307,4.2544731610337974e307,4.26441351888668e307,4.274353876739563e307,4.284294234592445e307,4.294234592445328e307,4.304174950298211e307,4.3141153081510934e307,4.3240556660039764e307,4.3339960238568585e307,4.3439363817097416e307,4.353876739562624e307,4.363817097415507e307,4.37375745526839e307,4.3836978131212724e307,4.393638170974155e307,4.403578528827038e307,4.4135188866799207e307,4.4234592445328033e307,4.433399602385686e307,4.4433399602385684e307,4.4532803180914515e307,4.463220675944334e307,4.4731610337972167e307,4.4831013916501e307,4.493041749502982e307,4.502982107355865e307,4.512922465208748e307,4.52286282306163e307,4.532803180914513e307,4.542743538767396e307,4.552683896620278e307,4.562624254473161e307,4.572564612326044e307,4.582504970178927e307,4.592445328031809e307,4.602385685884692e307,4.612326043737574e307,4.622266401590457e307,4.63220675944334e307,4.642147117296223e307,4.652087475149106e307,4.662027833001988e307,4.671968190854871e307,4.681908548707753e307,4.691848906560637e307,4.70178926441352e307,4.711729622266401e307,4.721669980119284e307,4.731610337972167e307,4.74155069582505e307,4.751491053677932e307,4.761431411530815e307,4.771371769383698e307,4.78131212723658e307,4.791252485089464e307,4.801192842942346e307,4.811133200795228e307,4.821073558648112e307,4.831013916500994e307,4.840954274353877e307,4.850894632206759e307,4.860834990059642e307,4.870775347912524e307,4.880715705765407e307,4.890656063618291e307,4.900596421471173e307,4.910536779324056e307,4.920477137176938e307,4.930417495029821e307,4.940357852882704e307,4.950298210735587e307,4.96023856858847e307,4.970178926441351e307,4.980119284294235e307,4.990059642147117e307,5.0e307,5.009940357852884e307,5.019880715705765e307,5.029821073558648e307,5.03976143141153e307,5.049701789264414e307,5.059642147117297e307,5.069582504970178e307,5.079522862823062e307,5.089463220675944e307,5.099403578528827e307,5.10934393638171e307,5.119284294234593e307,5.129224652087475e307,5.139165009940358e307,5.149105367793241e307,5.159045725646123e307,5.168986083499006e307,5.178926441351889e307,5.188866799204771e307,5.198807157057654e307,5.208747514910537e307,5.21868787276342e307,5.228628230616301e307,5.238568588469185e307,5.248508946322068e307,5.25844930417495e307,5.268389662027834e307,5.278330019880715e307,5.288270377733598e307,5.298210735586482e307,5.308151093439364e307,5.318091451292247e307,5.32803180914513e307,5.337972166998012e307,5.347912524850894e307,5.357852882703777e307,5.367793240556661e307,5.377733598409543e307,5.387673956262425e307,5.397614314115308e307,5.407554671968191e307,5.417495029821074e307,5.427435387673957e307,5.437375745526839e307,5.447316103379721e307,5.457256461232605e307,5.467196819085487e307,5.47713717693837e307,5.487077534791252e307,5.497017892644135e307,5.506958250497018e307,5.5168986083499e307,5.526838966202784e307,5.536779324055666e307,5.546719681908548e307,5.556660039761432e307,5.566600397614314e307,5.576540755467197e307,5.58648111332008e307,5.596421471172962e307,5.606361829025845e307,5.616302186878728e307,5.626242544731611e307,5.636182902584493e307,5.646123260437376e307,5.656063618290259e307,5.666003976143141e307,5.675944333996024e307,5.685884691848907e307,5.695825049701789e307,5.705765407554671e307,5.715705765407555e307,5.725646123260438e307,5.73558648111332e307,5.745526838966203e307,5.755467196819085e307,5.765407554671968e307,5.775347912524851e307,5.785288270377734e307,5.795228628230617e307,5.805168986083498e307,5.815109343936382e307,5.825049701789264e307,5.834990059642147e307,5.844930417495031e307,5.854870775347912e307,5.864811133200795e307,5.874751491053678e307,5.884691848906561e307,5.894632206759443e307,5.904572564612326e307,5.914512922465209e307,5.924453280318091e307,5.934393638170975e307,5.944333996023857e307,5.954274353876739e307,5.964214711729623e307,5.974155069582505e307,5.984095427435388e307,5.99403578528827e307,6.003976143141154e307,6.013916500994035e307,6.023856858846918e307,6.033797216699802e307,6.043737574552684e307,6.053677932405567e307,6.063618290258449e307,6.073558648111332e307,6.083499005964215e307,6.093439363817098e307,6.103379721669981e307,6.113320079522862e307,6.123260437375745e307,6.133200795228628e307,6.143141153081511e307,6.153081510934394e307,6.163021868787276e307,6.172962226640159e307,6.182902584493041e307,6.192842942345925e307,6.202783300198808e307,6.212723658051689e307,6.222664015904573e307,6.232604373757455e307,6.242544731610338e307,6.252485089463221e307,6.262425447316104e307,6.272365805168986e307,6.282306163021869e307,6.292246520874752e307,6.302186878727634e307,6.312127236580517e307,6.3220675944334e307,6.332007952286282e307,6.341948310139165e307,6.351888667992048e307,6.361829025844931e307,6.371769383697812e307,6.381709741550696e307,6.391650099403579e307,6.401590457256461e307,6.411530815109345e307,6.421471172962226e307,6.431411530815109e307,6.441351888667992e307,6.451292246520875e307,6.461232604373758e307,6.47117296222664e307,6.481113320079523e307,6.491053677932405e307,6.500994035785288e307,6.510934393638172e307,6.520874751491054e307,6.530815109343936e307,6.540755467196819e307,6.550695825049702e307,6.560636182902585e307,6.570576540755468e307,6.58051689860835e307,6.590457256461232e307,6.600397614314116e307,6.610337972166998e307,6.620278330019881e307,6.630218687872763e307,6.640159045725646e307,6.650099403578529e307,6.660039761431411e307,6.669980119284295e307,6.679920477137177e307,6.689860834990059e307,6.699801192842943e307,6.709741550695825e307,6.719681908548708e307,6.729622266401591e307,6.739562624254473e307,6.749502982107356e307,6.759443339960238e307,6.769383697813122e307,6.779324055666004e307,6.789264413518886e307,6.79920477137177e307,6.809145129224652e307,6.819085487077535e307,6.829025844930418e307,6.8389662027833e307,6.848906560636182e307,6.858846918489066e307,6.868787276341949e307,6.878727634194831e307,6.888667992047714e307,6.898608349900596e307,6.908548707753479e307,6.918489065606362e307,6.928429423459245e307,6.938369781312128e307,6.948310139165009e307,6.958250497017893e307,6.968190854870775e307,6.978131212723658e307,6.988071570576542e307,6.998011928429423e307,7.007952286282306e307,7.017892644135189e307,7.027833001988072e307,7.037773359840954e307,7.047713717693837e307,7.05765407554672e307,7.067594433399602e307,7.077534791252485e307,7.087475149105368e307,7.09741550695825e307,7.107355864811133e307,7.117296222664016e307,7.127236580516899e307,7.137176938369781e307,7.147117296222665e307,7.157057654075546e307,7.166998011928429e307,7.176938369781313e307,7.186878727634195e307,7.196819085487078e307,7.20675944333996e307,7.216699801192843e307,7.226640159045726e307,7.236580516898609e307,7.246520874751492e307,7.256461232604373e307,7.266401590457256e307,7.276341948310139e307,7.286282306163022e307,7.296222664015905e307,7.306163021868787e307,7.31610337972167e307,7.326043737574552e307,7.335984095427436e307,7.345924453280319e307,7.3558648111332e307,7.365805168986084e307,7.375745526838966e307,7.385685884691849e307,7.395626242544731e307,7.405566600397615e307,7.415506958250497e307,7.425447316103379e307,7.435387673956263e307,7.445328031809145e307,7.455268389662028e307,7.465208747514911e307,7.475149105367793e307,7.485089463220676e307,7.495029821073559e307,7.504970178926442e307,7.514910536779323e307,7.524850894632207e307,7.53479125248509e307,7.544731610337972e307,7.554671968190856e307,7.564612326043737e307,7.57455268389662e307,7.584493041749503e307,7.594433399602386e307,7.604373757455269e307,7.614314115308151e307,7.624254473161034e307,7.634194831013916e307,7.644135188866799e307,7.654075546719683e307,7.664015904572565e307,7.673956262425447e307,7.68389662027833e307,7.693836978131213e307,7.703777335984096e307,7.713717693836978e307,7.723658051689861e307,7.733598409542743e307,7.743538767395626e307,7.753479125248509e307,7.763419483101392e307,7.773359840954274e307,7.783300198807157e307,7.79324055666004e307,7.803180914512922e307,7.813121272365806e307,7.823061630218689e307,7.83300198807157e307,7.842942345924454e307,7.852882703777336e307,7.862823061630219e307,7.872763419483102e307,7.882703777335984e307,7.892644135188867e307,7.902584493041749e307,7.912524850894633e307,7.922465208747515e307,7.932405566600397e307,7.942345924453281e307,7.952286282306163e307,7.962226640159046e307,7.972166998011929e307,7.982107355864811e307,7.992047713717693e307,8.001988071570577e307,8.01192842942346e307,8.021868787276342e307,8.031809145129224e307,8.041749502982107e307,8.05168986083499e307,8.0616302186878725e307,8.071570576540756e307,8.081510934393639e307,8.09145129224652e307,8.101391650099404e307,8.111332007952286e307,8.121272365805169e307,8.131212723658053e307,8.141153081510934e307,8.151093439363817e307,8.1610337972167e307,8.170974155069583e307,8.180914512922465e307,8.190854870775348e307,8.200795228628231e307,8.210735586481113e307,8.220675944333996e307,8.230616302186879e307,8.240556660039761e307,8.250497017892644e307,8.260437375745527e307,8.27037773359841e307,8.280318091451292e307,8.290258449304176e307,8.300198807157057e307,8.31013916500994e307,8.320079522862824e307,8.330019880715706e307,8.339960238568589e307,8.34990059642147e307,8.359840954274354e307,8.369781312127237e307,8.379721669980119e307,8.389662027833003e307,8.399602385685884e307,8.409542743538767e307,8.41948310139165e307,8.429423459244533e307,8.439363817097416e307,8.449304174950298e307,8.459244532803181e307,8.469184890656063e307,8.479125248508947e307,8.48906560636183e307,8.499005964214711e307,8.508946322067595e307,8.518886679920477e307,8.52882703777336e307,8.538767395626242e307,8.548707753479126e307,8.558648111332008e307,8.56858846918489e307,8.578528827037774e307,8.588469184890656e307,8.598409542743539e307,8.608349900596422e307,8.618290258449304e307,8.628230616302187e307,8.63817097415507e307,8.648111332007953e307,8.658051689860834e307,8.667992047713717e307,8.677932405566601e307,8.687872763419483e307,8.697813121272366e307,8.707753479125248e307,8.717693836978131e307,8.727634194831014e307,8.737574552683897e307,8.74751491053678e307,8.757455268389662e307,8.767395626242545e307,8.777335984095427e307,8.78727634194831e307,8.797216699801194e307,8.807157057654076e307,8.817097415506958e307,8.827037773359841e307,8.836978131212724e307,8.846918489065607e307,8.856858846918489e307,8.866799204771372e307,8.876739562624254e307,8.886679920477137e307,8.89662027833002e307,8.906560636182903e307,8.916500994035785e307,8.926441351888668e307,8.936381709741551e307,8.946322067594433e307,8.956262425447317e307,8.9662027833002e307,8.976143141153081e307,8.986083499005964e307,8.996023856858846e307,9.00596421471173e307,9.015904572564611e307,9.025844930417495e307,9.035785288270379e307,9.04572564612326e307,9.055666003976144e307,9.065606361829025e307,9.075546719681909e307,9.085487077534793e307,9.095427435387674e307,9.105367793240556e307,9.11530815109344e307,9.125248508946323e307,9.135188866799204e307,9.145129224652088e307,9.15506958250497e307,9.165009940357853e307,9.174950298210735e307,9.184890656063618e307,9.194831013916502e307,9.204771371769384e307,9.214711729622267e307,9.224652087475149e307,9.234592445328032e307,9.244532803180914e307,9.254473161033795e307,9.26441351888668e307,9.274353876739563e307,9.284294234592446e307,9.294234592445328e307,9.304174950298211e307,9.314115308151093e307,9.324055666003976e307,9.33399602385686e307,9.343936381709742e307,9.353876739562625e307,9.363817097415507e307,9.373757455268388e307,9.383697813121274e307,9.393638170974156e307,9.40357852882704e307,9.41351888667992e307,9.423459244532802e307,9.433399602385686e307,9.443339960238567e307,9.453280318091453e307,9.463220675944335e307,9.473161033797216e307,9.4831013916501e307,9.493041749502981e307,9.502982107355865e307,9.512922465208749e307,9.52286282306163e307,9.532803180914514e307,9.542743538767395e307,9.552683896620279e307,9.56262425447316e307,9.572564612326042e307,9.582504970178928e307,9.59244532803181e307,9.602385685884693e307,9.612326043737574e307,9.622266401590456e307,9.63220675944334e307,9.642147117296223e307,9.652087475149107e307,9.662027833001988e307,9.67196819085487e307,9.681908548707753e307,9.691848906560635e307,9.701789264413519e307,9.711729622266402e307,9.721669980119284e307,9.731610337972167e307,9.741550695825049e307,9.751491053677933e307,9.761431411530814e307,9.7713717693837e307,9.781312127236581e307,9.791252485089463e307,9.801192842942346e307,9.811133200795228e307,9.821073558648112e307,9.831013916500995e307,9.840954274353877e307,9.85089463220676e307,9.860834990059642e307,9.870775347912526e307,9.880715705765407e307,9.890656063618289e307,9.900596421471174e307,9.910536779324056e307,9.92047713717694e307,9.930417495029821e307,9.940357852882703e307,9.950298210735586e307,9.96023856858847e307,9.970178926441353e307,9.980119284294235e307,9.990059642147117e307,1.0e308]}
},{}],63:[function(require,module,exports){
(function (__filename){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var tape = require( 'tape' );
var repeat = require( '@stdlib/string/repeat' );
var rpad = require( '@stdlib/string/right-pad' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var toBinaryString = require( './../lib' );


// VARIABLES //

// TODO: consider moving to external constants
var NUM_EXPONENT_BITS = 11;
var NUM_SIGNIFICAND_BITS = 52;


// FIXTURES //

var small = require( './fixtures/julia/bits_1e-200_1e-308.json' );
var medium = require( './fixtures/julia/bits_-1e3_1e3.json' );
var large = require( './fixtures/julia/bits_1e200_1e308.json' );
var subnormal = require( './fixtures/julia/bits_1e-308_5e-324.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof toBinaryString, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `+0`, the function returns a string of all zeros', function test( t ) {
	var expected = repeat( '0', 64 );
	t.equal( toBinaryString( 0.0 ), expected, 'returns all 0s' );
	t.end();
});

tape( 'if provided `-0`, the function returns a string of all zeros except for the sign bit', function test( t ) {
	var expected = rpad( '1', 64, '0' );
	t.equal( toBinaryString( -0.0 ), expected, 'returns all 0s except the sign bit' );
	t.end();
});

tape( 'if provided `+infinity`, the function returns a string where all exponent bits are 1s and everything else are 0s', function test( t ) {
	var expected;

	expected = '0';
	expected += repeat( '1', NUM_EXPONENT_BITS );
	expected += repeat( '0', NUM_SIGNIFICAND_BITS );

	t.equal( toBinaryString( PINF ), expected, 'returns bit string for +infinity' );
	t.end();
});

tape( 'if provided `-infinity`, the function returns a string where the sign bit is 1, all exponent bits are 1s, and everything else are 0s', function test( t ) {
	var expected;

	expected = '1';
	expected += repeat( '1', NUM_EXPONENT_BITS );
	expected += repeat( '0', NUM_SIGNIFICAND_BITS );

	t.equal( toBinaryString( NINF ), expected, 'returns bit string for -infinity' );
	t.end();
});

tape( 'if provided `NaN`, the function returns a string where the sign bit may be either 1 or 0, all exponent bits are 1s, and the fraction cannot be all 0s', function test( t ) {
	var actual;
	var frac;
	var exp;

	exp = repeat( '1', NUM_EXPONENT_BITS );
	frac = repeat( '0', NUM_SIGNIFICAND_BITS );

	actual = toBinaryString( NaN );

	t.ok( actual[0] === '0' || actual[1] === '1', 'sign bit is either 1 or 0' );
	t.equal( actual.substring( 1, 12 ), exp, 'all 1s for exponent' );
	t.notEqual( actual.substring( 12 ), frac, 'fraction does not equal all 0s' );
	t.end();
});

tape( 'the function returns literal bit representations for small values', function test( t ) {
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

tape( 'the function returns literal bit representations for medium values', function test( t ) {
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

tape( 'the function returns literal bit representations for large values', function test( t ) {
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

tape( 'the function returns literal bit representations for subnormal values', function test( t ) {
	var expected;
	var str;
	var x;
	var i;

	x = subnormal.x;
	expected = subnormal.expected;
	for ( i = 0; i < x.length; i++ ) {
		str = toBinaryString( x[ i ] );
		t.equal( str, expected[ i ], 'returns bit literal for ' + x[ i ] );
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/number/float64/base/to-binary-string/test/test.js")
},{"./../lib":56,"./fixtures/julia/bits_-1e3_1e3.json":59,"./fixtures/julia/bits_1e-200_1e-308.json":60,"./fixtures/julia/bits_1e-308_5e-324.json":61,"./fixtures/julia/bits_1e200_1e308.json":62,"@stdlib/constants/math/float64-ninf":39,"@stdlib/constants/math/float64-pinf":40,"@stdlib/string/repeat":66,"@stdlib/string/right-pad":68,"tape":142}],64:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

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

},{"./left_pad.js":65}],65:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var repeat = require( '@stdlib/string/repeat' );
var ceil = require( '@stdlib/math/base/special/ceil' );
var FLOAT64_MAX_SAFE_INTEGER = require( '@stdlib/constants/math/float64-max-safe-integer' );


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
		throw new TypeError( 'invalid argument. First argument must be a string. Value: `' + str + '`.' );
	}
	if ( !isNonNegativeInteger( len ) ) {
		throw new TypeError( 'invalid argument. Second argument must be a nonnegative integer. Value: `' + len + '`.' );
	}
	if ( arguments.length > 2 ) {
		p = pad;
		if ( !isString( p ) ) {
			throw new TypeError( 'invalid argument. Third argument must be a string. Value: `' + p + '`.' );
		}
		if ( p.length === 0 ) {
			throw new RangeError( 'invalid argument. Third argument must not be an empty string.' );
		}
	} else {
		p = ' ';
	}
	if ( len > FLOAT64_MAX_SAFE_INTEGER ) {
		throw new RangeError( 'invalid argument. Output string length exceeds maximum allowed string length.' );
	}
	n = ( len - str.length ) / p.length;
	if ( n <= 0 ) {
		return str;
	}
	n = ceil( n );
	return repeat( p, n ) + str;
}


// EXPORTS //

module.exports = lpad;

},{"@stdlib/assert/is-nonnegative-integer":19,"@stdlib/assert/is-string":31,"@stdlib/constants/math/float64-max-safe-integer":38,"@stdlib/math/base/special/ceil":50,"@stdlib/string/repeat":66}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

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

},{"./repeat.js":67}],67:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var FLOAT64_MAX_SAFE_INTEGER = require( '@stdlib/constants/math/float64-max-safe-integer' );


// MAIN //

/**
* Repeats a string a specified number of times and returns the concatenated result.
*
* ## Methods
*
* The algorithmic trick used in the implementation is to treat string concatenation the same as binary addition (i.e., any natural number (nonnegative integer) can be expressed as a sum of powers of two).
*
* For example,
*
* ```text
* n = 10 => 1010 => 2^3 + 2^0 + 2^1 + 2^0
* ```
*
* We can produce a 10-repeat string by "adding" the results of a 8-repeat string and a 2-repeat string.
*
* The implementation is then as follows:
*
* 1.  Let `s` be the string to be repeated and `o` be an output string.
*
* 2.  Initialize an output string `o`.
*
* 3.  Check the least significant bit to determine if the current `s` string should be "added" to the output "total".
*
*     -   if the bit is a one, add
*     -   otherwise, move on
*
* 4.  Double the string `s` by adding `s` to `s`.
*
* 5.  Right-shift the bits of `n`.
*
* 6.  Check if we have shifted off all bits.
*
*     -   if yes, done.
*     -   otherwise, move on
*
* 7.  Repeat 3-6.
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
		throw new TypeError( 'invalid argument. First argument must be a string. Value: `' + str + '`.' );
	}
	if ( !isNonNegativeInteger( n ) ) {
		throw new TypeError( 'invalid argument. Second argument must be a nonnegative integer. Value: `' + n + '`.' );
	}
	if ( str.length === 0 || n === 0 ) {
		return '';
	}
	// Check that output string will not exceed the maximum string length:
	if ( str.length * n > FLOAT64_MAX_SAFE_INTEGER ) {
		throw new RangeError( 'invalid argument. Output string length exceeds maximum allowed string length.' );
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
}


// EXPORTS //

module.exports = repeat;

},{"@stdlib/assert/is-nonnegative-integer":19,"@stdlib/assert/is-string":31,"@stdlib/constants/math/float64-max-safe-integer":38}],68:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Right pad a string such that the padded string has a length of at least `len`.
*
* @module @stdlib/string/right-pad
*
* @example
* var rpad = require( '@stdlib/string/right-pad' );
*
* var str = rpad( 'a', 5 );
* // returns 'a    '
*
* str = rpad( 'beep', 10, 'p' );
* // returns 'beeppppppp'
*
* str = rpad( 'beep', 12, 'boop' );
* // returns 'beepboopboop'
*/

// MODULES //

var rpad = require( './right_pad.js' );


// EXPORTS //

module.exports = rpad;

},{"./right_pad.js":69}],69:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var repeat = require( '@stdlib/string/repeat' );
var ceil = require( '@stdlib/math/base/special/ceil' );
var FLOAT64_MAX_SAFE_INTEGER = require( '@stdlib/constants/math/float64-max-safe-integer' );


// MAIN //

/**
* Right pads a string such that the padded string has a length of at least `len`.
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
* var str = rpad( 'a', 5 );
* // returns 'a    '
*
* @example
* var str = rpad( 'beep', 10, 'p' );
* // returns 'beeppppppp'
*
* @example
* var str = rpad( 'beep', 12, 'boop' );
* // returns 'beepboopboop'
*/
function rpad( str, len, pad ) {
	var n;
	var p;
	if ( !isString( str ) ) {
		throw new TypeError( 'invalid argument. First argument must be a string. Value: `' + str + '`.' );
	}
	if ( !isNonNegativeInteger( len ) ) {
		throw new TypeError( 'invalid argument. Second argument must be a nonnegative integer. Value: `' + len + '`.' );
	}
	if ( arguments.length > 2 ) {
		p = pad;
		if ( !isString( p ) ) {
			throw new TypeError( 'invalid argument. Third argument must be a string. Value: `' + p + '`.' );
		}
		if ( p.length === 0 ) {
			throw new RangeError( 'invalid argument. Pad string must not be an empty string.' );
		}
	} else {
		p = ' ';
	}
	if ( len > FLOAT64_MAX_SAFE_INTEGER ) {
		throw new RangeError( 'invalid argument. Output string length exceeds maximum allowed string length.' );
	}
	n = ( len - str.length ) / p.length;
	if ( n <= 0 ) {
		return str;
	}
	n = ceil( n );
	return str + repeat( p, n );
}


// EXPORTS //

module.exports = rpad;

},{"@stdlib/assert/is-nonnegative-integer":19,"@stdlib/assert/is-string":31,"@stdlib/constants/math/float64-max-safe-integer":38,"@stdlib/math/base/special/ceil":50,"@stdlib/string/repeat":66}],70:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Define a non-enumerable read-only property.
*
* @module @stdlib/utils/define-nonenumerable-read-only-property
*
* @example
* var setNonEnumerableReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
*
* var obj = {};
*
* setNonEnumerableReadOnly( obj, 'foo', 'bar' );
*
* try {
*     obj.foo = 'boop';
* } catch ( err ) {
*     console.error( err.message );
* }
*/

// MODULES //

var setNonEnumerableReadOnly = require( './main.js' );


// EXPORTS //

module.exports = setNonEnumerableReadOnly;

},{"./main.js":71}],71:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var defineProperty = require( '@stdlib/utils/define-property' );


// MAIN //

/**
* Defines a non-enumerable read-only property.
*
* @param {Object} obj - object on which to define the property
* @param {(string|symbol)} prop - property name
* @param {*} value - value to set
*
* @example
* var obj = {};
*
* setNonEnumerableReadOnly( obj, 'foo', 'bar' );
*
* try {
*     obj.foo = 'boop';
* } catch ( err ) {
*     console.error( err.message );
* }
*/
function setNonEnumerableReadOnly( obj, prop, value ) {
	defineProperty( obj, prop, {
		'configurable': false,
		'enumerable': false,
		'writable': false,
		'value': value
	});
}


// EXPORTS //

module.exports = setNonEnumerableReadOnly;

},{"@stdlib/utils/define-property":73}],72:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

/**
* Defines (or modifies) an object property.
*
* ## Notes
*
* -   Property descriptors come in two flavors: **data descriptors** and **accessor descriptors**. A data descriptor is a property that has a value, which may or may not be writable. An accessor descriptor is a property described by a getter-setter function pair. A descriptor must be one of these two flavors and cannot be both.
*
* @name defineProperty
* @type {Function}
* @param {Object} obj - object on which to define the property
* @param {(string|symbol)} prop - property name
* @param {Object} descriptor - property descriptor
* @param {boolean} [descriptor.configurable=false] - boolean indicating if property descriptor can be changed and if the property can be deleted from the provided object
* @param {boolean} [descriptor.enumerable=false] - boolean indicating if the property shows up when enumerating object properties
* @param {boolean} [descriptor.writable=false] - boolean indicating if the value associated with the property can be changed with an assignment operator
* @param {*} [descriptor.value] - property value
* @param {(Function|void)} [descriptor.get=undefined] - function which serves as a getter for the property, or, if no getter, undefined. When the property is accessed, a getter function is called without arguments and with the `this` context set to the object through which the property is accessed (which may not be the object on which the property is defined due to inheritance). The return value will be used as the property value.
* @param {(Function|void)} [descriptor.set=undefined] - function which serves as a setter for the property, or, if no setter, undefined. When assigning a property value, a setter function is called with one argument (the value being assigned to the property) and with the `this` context set to the object through which the property is assigned.
* @throws {TypeError} first argument must be an object
* @throws {TypeError} third argument must be an object
* @throws {Error} property descriptor cannot have both a value and a setter and/or getter
* @returns {Object} object with added property
*
* @example
* var obj = {};
*
* defineProperty( obj, 'foo', {
*     'value': 'bar'
* });
*
* var str = obj.foo;
* // returns 'bar'
*/
var defineProperty = Object.defineProperty;


// EXPORTS //

module.exports = defineProperty;

},{}],73:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Define (or modify) an object property.
*
* @module @stdlib/utils/define-property
*
* @example
* var defineProperty = require( '@stdlib/utils/define-property' );
*
* var obj = {};
* defineProperty( obj, 'foo', {
*     'value': 'bar',
*     'writable': false,
*     'configurable': false,
*     'enumerable': false
* });
* obj.foo = 'boop'; // => throws
*/

// MODULES //

var hasDefinePropertySupport = require( '@stdlib/assert/has-define-property-support' );
var builtin = require( './builtin.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var defineProperty;
if ( hasDefinePropertySupport() ) {
	defineProperty = builtin;
} else {
	defineProperty = polyfill;
}


// EXPORTS //

module.exports = defineProperty;

},{"./builtin.js":72,"./polyfill.js":74,"@stdlib/assert/has-define-property-support":2}],74:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

/* eslint-disable no-underscore-dangle, no-proto */

'use strict';

// MODULES //

var hasProperty = require( '@stdlib/assert/has-property' );
var isObject = require( '@stdlib/assert/is-object' );


// VARIABLES //

var objectProtoype = Object.prototype;
var defineGetter = objectProtoype.__defineGetter__;
var defineSetter = objectProtoype.__defineSetter__;
var lookupGetter = objectProtoype.__lookupGetter__;
var lookupSetter = objectProtoype.__lookupSetter__;


// MAIN //

/**
* Defines (or modifies) an object property.
*
* ## Notes
*
* -   Property descriptors come in two flavors: **data descriptors** and **accessor descriptors**. A data descriptor is a property that has a value, which may or may not be writable. An accessor descriptor is a property described by a getter-setter function pair. A descriptor must be one of these two flavors and cannot be both.
*
* @param {Object} obj - object on which to define the property
* @param {string} prop - property name
* @param {Object} descriptor - property descriptor
* @param {boolean} [descriptor.configurable=false] - boolean indicating if property descriptor can be changed and if the property can be deleted from the provided object
* @param {boolean} [descriptor.enumerable=false] - boolean indicating if the property shows up when enumerating object properties
* @param {boolean} [descriptor.writable=false] - boolean indicating if the value associated with the property can be changed with an assignment operator
* @param {*} [descriptor.value] - property value
* @param {(Function|void)} [descriptor.get=undefined] - function which serves as a getter for the property, or, if no getter, undefined. When the property is accessed, a getter function is called without arguments and with the `this` context set to the object through which the property is accessed (which may not be the object on which the property is defined due to inheritance). The return value will be used as the property value.
* @param {(Function|void)} [descriptor.set=undefined] - function which serves as a setter for the property, or, if no setter, undefined. When assigning a property value, a setter function is called with one argument (the value being assigned to the property) and with the `this` context set to the object through which the property is assigned.
* @throws {TypeError} first argument must be an object
* @throws {TypeError} third argument must be an object
* @throws {Error} property descriptor cannot have both a value and a setter and/or getter
* @returns {Object} object with added property
*
* @example
* var obj = {};
*
* defineProperty( obj, 'foo', {
*     'value': 'bar'
* });
*
* var str = obj.foo;
* // returns 'bar'
*/
function defineProperty( obj, prop, descriptor ) {
	var prototype;
	var hasValue;
	var hasGet;
	var hasSet;

	if ( !isObject( obj ) ) {
		throw new TypeError( 'invalid argument. First argument must be an object. Value: `' + obj + '`.' );
	}
	if ( !isObject( descriptor ) ) {
		throw new TypeError( 'invalid argument. Property descriptor must be an object. Value: `' + descriptor + '`.' );
	}
	hasValue = hasProperty( descriptor, 'value' );
	if ( hasValue ) {
		if (
			lookupGetter.call( obj, prop ) ||
			lookupSetter.call( obj, prop )
		) {
			// Override `__proto__` to avoid touching inherited accessors:
			prototype = obj.__proto__;
			obj.__proto__ = objectProtoype;

			// Delete property as existing getters/setters prevent assigning value to specified property:
			delete obj[ prop ];
			obj[ prop ] = descriptor.value;

			// Restore original prototype:
			obj.__proto__ = prototype;
		} else {
			obj[ prop ] = descriptor.value;
		}
	}
	hasGet = hasProperty( descriptor, 'get' );
	hasSet = hasProperty( descriptor, 'set' );

	if ( hasValue && ( hasGet || hasSet ) ) {
		throw new Error( 'invalid argument. Cannot specify one or more accessors and a value or writable attribute in the property descriptor.' );
	}

	if ( hasGet && defineGetter ) {
		defineGetter.call( obj, prop, descriptor.get );
	}
	if ( hasSet && defineSetter ) {
		defineSetter.call( obj, prop, descriptor.set );
	}
	return obj;
}


// EXPORTS //

module.exports = defineProperty;

},{"@stdlib/assert/has-property":6,"@stdlib/assert/is-object":29}],75:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Return a string value indicating a specification defined classification of an object.
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

var hasToStringTag = require( '@stdlib/assert/has-tostringtag-support' );
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

},{"./native_class.js":76,"./polyfill.js":77,"@stdlib/assert/has-tostringtag-support":10}],76:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

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

},{"./tostring.js":78}],77:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

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

},{"./tostring.js":78,"./tostringtag.js":79,"@stdlib/assert/has-own-property":4}],78:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var toStr = Object.prototype.toString;


// EXPORTS //

module.exports = toStr;

},{}],79:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{}],80:[function(require,module,exports){
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

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],81:[function(require,module,exports){

},{}],82:[function(require,module,exports){
arguments[4][81][0].apply(exports,arguments)
},{"dup":81}],83:[function(require,module,exports){
(function (Buffer){
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
var customInspectSymbol =
  (typeof Symbol === 'function' && typeof Symbol.for === 'function')
    ? Symbol.for('nodejs.util.inspect.custom')
    : null

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
    var proto = { foo: function () { return 42 } }
    Object.setPrototypeOf(proto, Uint8Array.prototype)
    Object.setPrototypeOf(arr, proto)
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  Object.setPrototypeOf(buf, Buffer.prototype)
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
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species != null &&
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
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayLike(value)
  }

  if (value == null) {
    throw new TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  var valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  var b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(
      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
    )
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
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
Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype)
Object.setPrototypeOf(Buffer, Uint8Array)

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
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
    throw new TypeError('Unknown encoding: ' + encoding)
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
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
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
  Object.setPrototypeOf(buf, Buffer.prototype)

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

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
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
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
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
    if (isInstance(buf, Uint8Array)) {
      buf = Buffer.from(buf)
    }
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
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  var len = string.length
  var mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

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
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
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

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}
if (customInspectSymbol) {
  Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
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
  byteOffset = +byteOffset // Coerce to Number.
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
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)
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

  var strLen = string.length

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
    out += hexSliceLookupTable[buf[i]]
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
  Object.setPrototypeOf(newBuf, Buffer.prototype)

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
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
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
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (var i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
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
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  } else if (typeof val === 'boolean') {
    val = Number(val)
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
      : Buffer.from(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
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
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
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

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
var hexSliceLookupTable = (function () {
  var alphabet = '0123456789abcdef'
  var table = new Array(256)
  for (var i = 0; i < 16; ++i) {
    var i16 = i * 16
    for (var j = 0; j < 16; ++j) {
      table[i16 + j] = alphabet[i] + alphabet[j]
    }
  }
  return table
})()

}).call(this,require("buffer").Buffer)
},{"base64-js":80,"buffer":83,"ieee754":109}],84:[function(require,module,exports){
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

}).call(this,{"isBuffer":require("../../insert-module-globals/node_modules/is-buffer/index.js")})
},{"../../insert-module-globals/node_modules/is-buffer/index.js":111}],85:[function(require,module,exports){
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

},{"./lib/is_arguments.js":86,"./lib/keys.js":87}],86:[function(require,module,exports){
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

},{}],87:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],88:[function(require,module,exports){
'use strict';

var keys = require('object-keys');
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr = Object.prototype.toString;
var concat = Array.prototype.concat;
var origDefineProperty = Object.defineProperty;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		origDefineProperty(obj, 'x', { enumerable: false, value: obj });
		// eslint-disable-next-line no-unused-vars, no-restricted-syntax
		for (var _ in obj) { // jscs:ignore disallowUnusedVariables
			return false;
		}
		return obj.x === obj;
	} catch (e) { /* this is IE 8. */
		return false;
	}
};
var supportsDescriptors = origDefineProperty && arePropertyDescriptorsSupported();

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		origDefineProperty(object, name, {
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
		props = concat.call(props, Object.getOwnPropertySymbols(map));
	}
	for (var i = 0; i < props.length; i += 1) {
		defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
	}
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;

},{"object-keys":116}],89:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],90:[function(require,module,exports){
'use strict';

/* globals
	Atomics,
	SharedArrayBuffer,
*/

var undefined; // eslint-disable-line no-shadow-restricted-names

var $TypeError = TypeError;

var ThrowTypeError = Object.getOwnPropertyDescriptor
	? (function () { return Object.getOwnPropertyDescriptor(arguments, 'callee').get; }())
	: function () { throw new $TypeError(); };

var hasSymbols = require('has-symbols')();

var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

var generator; // = function * () {};
var generatorFunction = generator ? getProto(generator) : undefined;
var asyncFn; // async function() {};
var asyncFunction = asyncFn ? asyncFn.constructor : undefined;
var asyncGen; // async function * () {};
var asyncGenFunction = asyncGen ? getProto(asyncGen) : undefined;
var asyncGenIterator = asyncGen ? asyncGen() : undefined;

var TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	'$ %Array%': Array,
	'$ %ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'$ %ArrayBufferPrototype%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer.prototype,
	'$ %ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
	'$ %ArrayPrototype%': Array.prototype,
	'$ %ArrayProto_entries%': Array.prototype.entries,
	'$ %ArrayProto_forEach%': Array.prototype.forEach,
	'$ %ArrayProto_keys%': Array.prototype.keys,
	'$ %ArrayProto_values%': Array.prototype.values,
	'$ %AsyncFromSyncIteratorPrototype%': undefined,
	'$ %AsyncFunction%': asyncFunction,
	'$ %AsyncFunctionPrototype%': asyncFunction ? asyncFunction.prototype : undefined,
	'$ %AsyncGenerator%': asyncGen ? getProto(asyncGenIterator) : undefined,
	'$ %AsyncGeneratorFunction%': asyncGenFunction,
	'$ %AsyncGeneratorPrototype%': asyncGenFunction ? asyncGenFunction.prototype : undefined,
	'$ %AsyncIteratorPrototype%': asyncGenIterator && hasSymbols && Symbol.asyncIterator ? asyncGenIterator[Symbol.asyncIterator]() : undefined,
	'$ %Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'$ %Boolean%': Boolean,
	'$ %BooleanPrototype%': Boolean.prototype,
	'$ %DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'$ %DataViewPrototype%': typeof DataView === 'undefined' ? undefined : DataView.prototype,
	'$ %Date%': Date,
	'$ %DatePrototype%': Date.prototype,
	'$ %decodeURI%': decodeURI,
	'$ %decodeURIComponent%': decodeURIComponent,
	'$ %encodeURI%': encodeURI,
	'$ %encodeURIComponent%': encodeURIComponent,
	'$ %Error%': Error,
	'$ %ErrorPrototype%': Error.prototype,
	'$ %eval%': eval, // eslint-disable-line no-eval
	'$ %EvalError%': EvalError,
	'$ %EvalErrorPrototype%': EvalError.prototype,
	'$ %Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'$ %Float32ArrayPrototype%': typeof Float32Array === 'undefined' ? undefined : Float32Array.prototype,
	'$ %Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'$ %Float64ArrayPrototype%': typeof Float64Array === 'undefined' ? undefined : Float64Array.prototype,
	'$ %Function%': Function,
	'$ %FunctionPrototype%': Function.prototype,
	'$ %Generator%': generator ? getProto(generator()) : undefined,
	'$ %GeneratorFunction%': generatorFunction,
	'$ %GeneratorPrototype%': generatorFunction ? generatorFunction.prototype : undefined,
	'$ %Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'$ %Int8ArrayPrototype%': typeof Int8Array === 'undefined' ? undefined : Int8Array.prototype,
	'$ %Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'$ %Int16ArrayPrototype%': typeof Int16Array === 'undefined' ? undefined : Int8Array.prototype,
	'$ %Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'$ %Int32ArrayPrototype%': typeof Int32Array === 'undefined' ? undefined : Int32Array.prototype,
	'$ %isFinite%': isFinite,
	'$ %isNaN%': isNaN,
	'$ %IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'$ %JSON%': JSON,
	'$ %JSONParse%': JSON.parse,
	'$ %Map%': typeof Map === 'undefined' ? undefined : Map,
	'$ %MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
	'$ %MapPrototype%': typeof Map === 'undefined' ? undefined : Map.prototype,
	'$ %Math%': Math,
	'$ %Number%': Number,
	'$ %NumberPrototype%': Number.prototype,
	'$ %Object%': Object,
	'$ %ObjectPrototype%': Object.prototype,
	'$ %ObjProto_toString%': Object.prototype.toString,
	'$ %ObjProto_valueOf%': Object.prototype.valueOf,
	'$ %parseFloat%': parseFloat,
	'$ %parseInt%': parseInt,
	'$ %Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'$ %PromisePrototype%': typeof Promise === 'undefined' ? undefined : Promise.prototype,
	'$ %PromiseProto_then%': typeof Promise === 'undefined' ? undefined : Promise.prototype.then,
	'$ %Promise_all%': typeof Promise === 'undefined' ? undefined : Promise.all,
	'$ %Promise_reject%': typeof Promise === 'undefined' ? undefined : Promise.reject,
	'$ %Promise_resolve%': typeof Promise === 'undefined' ? undefined : Promise.resolve,
	'$ %Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'$ %RangeError%': RangeError,
	'$ %RangeErrorPrototype%': RangeError.prototype,
	'$ %ReferenceError%': ReferenceError,
	'$ %ReferenceErrorPrototype%': ReferenceError.prototype,
	'$ %Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'$ %RegExp%': RegExp,
	'$ %RegExpPrototype%': RegExp.prototype,
	'$ %Set%': typeof Set === 'undefined' ? undefined : Set,
	'$ %SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
	'$ %SetPrototype%': typeof Set === 'undefined' ? undefined : Set.prototype,
	'$ %SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'$ %SharedArrayBufferPrototype%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer.prototype,
	'$ %String%': String,
	'$ %StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,
	'$ %StringPrototype%': String.prototype,
	'$ %Symbol%': hasSymbols ? Symbol : undefined,
	'$ %SymbolPrototype%': hasSymbols ? Symbol.prototype : undefined,
	'$ %SyntaxError%': SyntaxError,
	'$ %SyntaxErrorPrototype%': SyntaxError.prototype,
	'$ %ThrowTypeError%': ThrowTypeError,
	'$ %TypedArray%': TypedArray,
	'$ %TypedArrayPrototype%': TypedArray ? TypedArray.prototype : undefined,
	'$ %TypeError%': $TypeError,
	'$ %TypeErrorPrototype%': $TypeError.prototype,
	'$ %Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'$ %Uint8ArrayPrototype%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array.prototype,
	'$ %Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'$ %Uint8ClampedArrayPrototype%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray.prototype,
	'$ %Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'$ %Uint16ArrayPrototype%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array.prototype,
	'$ %Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'$ %Uint32ArrayPrototype%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array.prototype,
	'$ %URIError%': URIError,
	'$ %URIErrorPrototype%': URIError.prototype,
	'$ %WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'$ %WeakMapPrototype%': typeof WeakMap === 'undefined' ? undefined : WeakMap.prototype,
	'$ %WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet,
	'$ %WeakSetPrototype%': typeof WeakSet === 'undefined' ? undefined : WeakSet.prototype
};

var bind = require('function-bind');
var $replace = bind.call(Function.call, String.prototype.replace);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : (number || match);
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var key = '$ ' + name;
	if (!(key in INTRINSICS)) {
		throw new SyntaxError('intrinsic ' + name + ' does not exist!');
	}

	// istanbul ignore if // hopefully this is impossible to test :-)
	if (typeof INTRINSICS[key] === 'undefined' && !allowMissing) {
		throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
	}

	return INTRINSICS[key];
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new TypeError('"allowMissing" argument must be a boolean');
	}

	var parts = stringToPath(name);

	if (parts.length === 0) {
		return getBaseIntrinsic(name, allowMissing);
	}

	var value = getBaseIntrinsic('%' + parts[0] + '%', allowMissing);
	for (var i = 1; i < parts.length; i += 1) {
		if (value != null) {
			value = value[parts[i]];
		}
	}
	return value;
};

},{"function-bind":105,"has-symbols":106}],91:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('./GetIntrinsic');

var $Object = GetIntrinsic('%Object%');
var $EvalError = GetIntrinsic('%EvalError%');
var $TypeError = GetIntrinsic('%TypeError%');
var $String = GetIntrinsic('%String%');
var $Date = GetIntrinsic('%Date%');
var $Number = GetIntrinsic('%Number%');
var $floor = GetIntrinsic('%Math.floor%');
var $DateUTC = GetIntrinsic('%Date.UTC%');
var $abs = GetIntrinsic('%Math.abs%');

var assertRecord = require('./helpers/assertRecord');
var isPropertyDescriptor = require('./helpers/isPropertyDescriptor');
var $isNaN = require('./helpers/isNaN');
var $isFinite = require('./helpers/isFinite');
var sign = require('./helpers/sign');
var mod = require('./helpers/mod');
var isPrefixOf = require('./helpers/isPrefixOf');
var callBound = require('./helpers/callBound');

var IsCallable = require('is-callable');
var toPrimitive = require('es-to-primitive/es5');

var has = require('has');

var $getUTCFullYear = callBound('Date.prototype.getUTCFullYear');

var HoursPerDay = 24;
var MinutesPerHour = 60;
var SecondsPerMinute = 60;
var msPerSecond = 1e3;
var msPerMinute = msPerSecond * SecondsPerMinute;
var msPerHour = msPerMinute * MinutesPerHour;
var msPerDay = 86400000;

// https://es5.github.io/#x9
var ES5 = {
	ToPrimitive: toPrimitive,

	ToBoolean: function ToBoolean(value) {
		return !!value;
	},
	ToNumber: function ToNumber(value) {
		return +value; // eslint-disable-line no-implicit-coercion
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
		return $String(value);
	},
	ToObject: function ToObject(value) {
		this.CheckObjectCoercible(value);
		return $Object(value);
	},
	CheckObjectCoercible: function CheckObjectCoercible(value, optMessage) {
		/* jshint eqnull:true */
		if (value == null) {
			throw new $TypeError(optMessage || 'Cannot call method on ' + value);
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

	// https://ecma-international.org/ecma-262/5.1/#sec-8
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

	// https://ecma-international.org/ecma-262/6.0/#sec-property-descriptor-specification-type
	IsPropertyDescriptor: function IsPropertyDescriptor(Desc) {
		return isPropertyDescriptor(this, Desc);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.1
	IsAccessorDescriptor: function IsAccessorDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		assertRecord(this, 'Property Descriptor', 'Desc', Desc);

		if (!has(Desc, '[[Get]]') && !has(Desc, '[[Set]]')) {
			return false;
		}

		return true;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.2
	IsDataDescriptor: function IsDataDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		assertRecord(this, 'Property Descriptor', 'Desc', Desc);

		if (!has(Desc, '[[Value]]') && !has(Desc, '[[Writable]]')) {
			return false;
		}

		return true;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.3
	IsGenericDescriptor: function IsGenericDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		assertRecord(this, 'Property Descriptor', 'Desc', Desc);

		if (!this.IsAccessorDescriptor(Desc) && !this.IsDataDescriptor(Desc)) {
			return true;
		}

		return false;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.4
	FromPropertyDescriptor: function FromPropertyDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return Desc;
		}

		assertRecord(this, 'Property Descriptor', 'Desc', Desc);

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
			throw new $TypeError('FromPropertyDescriptor must be called with a fully populated Property Descriptor');
		}
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.5
	ToPropertyDescriptor: function ToPropertyDescriptor(Obj) {
		if (this.Type(Obj) !== 'Object') {
			throw new $TypeError('ToPropertyDescriptor requires an object');
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
				throw new $TypeError('setter must be a function');
			}
			desc['[[Set]]'] = setter;
		}

		if ((has(desc, '[[Get]]') || has(desc, '[[Set]]')) && (has(desc, '[[Value]]') || has(desc, '[[Writable]]'))) {
			throw new $TypeError('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
		}
		return desc;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-11.9.3
	'Abstract Equality Comparison': function AbstractEqualityComparison(x, y) {
		var xType = this.Type(x);
		var yType = this.Type(y);
		if (xType === yType) {
			return x === y; // ES6+ specified this shortcut anyways.
		}
		if (x == null && y == null) {
			return true;
		}
		if (xType === 'Number' && yType === 'String') {
			return this['Abstract Equality Comparison'](x, this.ToNumber(y));
		}
		if (xType === 'String' && yType === 'Number') {
			return this['Abstract Equality Comparison'](this.ToNumber(x), y);
		}
		if (xType === 'Boolean') {
			return this['Abstract Equality Comparison'](this.ToNumber(x), y);
		}
		if (yType === 'Boolean') {
			return this['Abstract Equality Comparison'](x, this.ToNumber(y));
		}
		if ((xType === 'String' || xType === 'Number') && yType === 'Object') {
			return this['Abstract Equality Comparison'](x, this.ToPrimitive(y));
		}
		if (xType === 'Object' && (yType === 'String' || yType === 'Number')) {
			return this['Abstract Equality Comparison'](this.ToPrimitive(x), y);
		}
		return false;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-11.9.6
	'Strict Equality Comparison': function StrictEqualityComparison(x, y) {
		var xType = this.Type(x);
		var yType = this.Type(y);
		if (xType !== yType) {
			return false;
		}
		if (xType === 'Undefined' || xType === 'Null') {
			return true;
		}
		return x === y; // shortcut for steps 4-7
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-11.8.5
	// eslint-disable-next-line max-statements
	'Abstract Relational Comparison': function AbstractRelationalComparison(x, y, LeftFirst) {
		if (this.Type(LeftFirst) !== 'Boolean') {
			throw new $TypeError('Assertion failed: LeftFirst argument must be a Boolean');
		}
		var px;
		var py;
		if (LeftFirst) {
			px = this.ToPrimitive(x, $Number);
			py = this.ToPrimitive(y, $Number);
		} else {
			py = this.ToPrimitive(y, $Number);
			px = this.ToPrimitive(x, $Number);
		}
		var bothStrings = this.Type(px) === 'String' && this.Type(py) === 'String';
		if (!bothStrings) {
			var nx = this.ToNumber(px);
			var ny = this.ToNumber(py);
			if ($isNaN(nx) || $isNaN(ny)) {
				return undefined;
			}
			if ($isFinite(nx) && $isFinite(ny) && nx === ny) {
				return false;
			}
			if (nx === 0 && ny === 0) {
				return false;
			}
			if (nx === Infinity) {
				return false;
			}
			if (ny === Infinity) {
				return true;
			}
			if (ny === -Infinity) {
				return false;
			}
			if (nx === -Infinity) {
				return true;
			}
			return nx < ny; // by now, these are both nonzero, finite, and not equal
		}
		if (isPrefixOf(py, px)) {
			return false;
		}
		if (isPrefixOf(px, py)) {
			return true;
		}
		return px < py; // both strings, neither a prefix of the other. shortcut for steps c-f
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.10
	msFromTime: function msFromTime(t) {
		return mod(t, msPerSecond);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.10
	SecFromTime: function SecFromTime(t) {
		return mod($floor(t / msPerSecond), SecondsPerMinute);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.10
	MinFromTime: function MinFromTime(t) {
		return mod($floor(t / msPerMinute), MinutesPerHour);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.10
	HourFromTime: function HourFromTime(t) {
		return mod($floor(t / msPerHour), HoursPerDay);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.2
	Day: function Day(t) {
		return $floor(t / msPerDay);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.2
	TimeWithinDay: function TimeWithinDay(t) {
		return mod(t, msPerDay);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.3
	DayFromYear: function DayFromYear(y) {
		return (365 * (y - 1970)) + $floor((y - 1969) / 4) - $floor((y - 1901) / 100) + $floor((y - 1601) / 400);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.3
	TimeFromYear: function TimeFromYear(y) {
		return msPerDay * this.DayFromYear(y);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.3
	YearFromTime: function YearFromTime(t) {
		// largest y such that this.TimeFromYear(y) <= t
		return $getUTCFullYear(new $Date(t));
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.6
	WeekDay: function WeekDay(t) {
		return mod(this.Day(t) + 4, 7);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.3
	DaysInYear: function DaysInYear(y) {
		if (mod(y, 4) !== 0) {
			return 365;
		}
		if (mod(y, 100) !== 0) {
			return 366;
		}
		if (mod(y, 400) !== 0) {
			return 365;
		}
		return 366;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.3
	InLeapYear: function InLeapYear(t) {
		var days = this.DaysInYear(this.YearFromTime(t));
		if (days === 365) {
			return 0;
		}
		if (days === 366) {
			return 1;
		}
		throw new $EvalError('Assertion failed: there are not 365 or 366 days in a year, got: ' + days);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.4
	DayWithinYear: function DayWithinYear(t) {
		return this.Day(t) - this.DayFromYear(this.YearFromTime(t));
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.4
	MonthFromTime: function MonthFromTime(t) {
		var day = this.DayWithinYear(t);
		if (0 <= day && day < 31) {
			return 0;
		}
		var leap = this.InLeapYear(t);
		if (31 <= day && day < (59 + leap)) {
			return 1;
		}
		if ((59 + leap) <= day && day < (90 + leap)) {
			return 2;
		}
		if ((90 + leap) <= day && day < (120 + leap)) {
			return 3;
		}
		if ((120 + leap) <= day && day < (151 + leap)) {
			return 4;
		}
		if ((151 + leap) <= day && day < (181 + leap)) {
			return 5;
		}
		if ((181 + leap) <= day && day < (212 + leap)) {
			return 6;
		}
		if ((212 + leap) <= day && day < (243 + leap)) {
			return 7;
		}
		if ((243 + leap) <= day && day < (273 + leap)) {
			return 8;
		}
		if ((273 + leap) <= day && day < (304 + leap)) {
			return 9;
		}
		if ((304 + leap) <= day && day < (334 + leap)) {
			return 10;
		}
		if ((334 + leap) <= day && day < (365 + leap)) {
			return 11;
		}
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.5
	DateFromTime: function DateFromTime(t) {
		var m = this.MonthFromTime(t);
		var d = this.DayWithinYear(t);
		if (m === 0) {
			return d + 1;
		}
		if (m === 1) {
			return d - 30;
		}
		var leap = this.InLeapYear(t);
		if (m === 2) {
			return d - 58 - leap;
		}
		if (m === 3) {
			return d - 89 - leap;
		}
		if (m === 4) {
			return d - 119 - leap;
		}
		if (m === 5) {
			return d - 150 - leap;
		}
		if (m === 6) {
			return d - 180 - leap;
		}
		if (m === 7) {
			return d - 211 - leap;
		}
		if (m === 8) {
			return d - 242 - leap;
		}
		if (m === 9) {
			return d - 272 - leap;
		}
		if (m === 10) {
			return d - 303 - leap;
		}
		if (m === 11) {
			return d - 333 - leap;
		}
		throw new $EvalError('Assertion failed: MonthFromTime returned an impossible value: ' + m);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.12
	MakeDay: function MakeDay(year, month, date) {
		if (!$isFinite(year) || !$isFinite(month) || !$isFinite(date)) {
			return NaN;
		}
		var y = this.ToInteger(year);
		var m = this.ToInteger(month);
		var dt = this.ToInteger(date);
		var ym = y + $floor(m / 12);
		var mn = mod(m, 12);
		var t = $DateUTC(ym, mn, 1);
		if (this.YearFromTime(t) !== ym || this.MonthFromTime(t) !== mn || this.DateFromTime(t) !== 1) {
			return NaN;
		}
		return this.Day(t) + dt - 1;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.13
	MakeDate: function MakeDate(day, time) {
		if (!$isFinite(day) || !$isFinite(time)) {
			return NaN;
		}
		return (day * msPerDay) + time;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.11
	MakeTime: function MakeTime(hour, min, sec, ms) {
		if (!$isFinite(hour) || !$isFinite(min) || !$isFinite(sec) || !$isFinite(ms)) {
			return NaN;
		}
		var h = this.ToInteger(hour);
		var m = this.ToInteger(min);
		var s = this.ToInteger(sec);
		var milli = this.ToInteger(ms);
		var t = (h * msPerHour) + (m * msPerMinute) + (s * msPerSecond) + milli;
		return t;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.14
	TimeClip: function TimeClip(time) {
		if (!$isFinite(time) || $abs(time) > 8.64e15) {
			return NaN;
		}
		return $Number(new $Date(this.ToNumber(time)));
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-5.2
	modulo: function modulo(x, y) {
		return mod(x, y);
	}
};

module.exports = ES5;

},{"./GetIntrinsic":90,"./helpers/assertRecord":92,"./helpers/callBound":94,"./helpers/isFinite":95,"./helpers/isNaN":96,"./helpers/isPrefixOf":97,"./helpers/isPropertyDescriptor":98,"./helpers/mod":99,"./helpers/sign":100,"es-to-primitive/es5":101,"has":108,"is-callable":112}],92:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('../GetIntrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var $SyntaxError = GetIntrinsic('%SyntaxError%');

var has = require('has');

var predicates = {
	// https://ecma-international.org/ecma-262/6.0/#sec-property-descriptor-specification-type
	'Property Descriptor': function isPropertyDescriptor(ES, Desc) {
		if (ES.Type(Desc) !== 'Object') {
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

		for (var key in Desc) { // eslint-disable-line
			if (has(Desc, key) && !allowed[key]) {
				return false;
			}
		}

		var isData = has(Desc, '[[Value]]');
		var IsAccessor = has(Desc, '[[Get]]') || has(Desc, '[[Set]]');
		if (isData && IsAccessor) {
			throw new $TypeError('Property Descriptors may not be both accessor and data descriptors');
		}
		return true;
	}
};

module.exports = function assertRecord(ES, recordType, argumentName, value) {
	var predicate = predicates[recordType];
	if (typeof predicate !== 'function') {
		throw new $SyntaxError('unknown record type: ' + recordType);
	}
	if (!predicate(ES, value)) {
		throw new $TypeError(argumentName + ' must be a ' + recordType);
	}
};

},{"../GetIntrinsic":90,"has":108}],93:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

var GetIntrinsic = require('../GetIntrinsic');

var $Function = GetIntrinsic('%Function%');
var $apply = $Function.apply;
var $call = $Function.call;

module.exports = function callBind() {
	return bind.apply($call, arguments);
};

module.exports.apply = function applyBind() {
	return bind.apply($apply, arguments);
};

},{"../GetIntrinsic":90,"function-bind":105}],94:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('../GetIntrinsic');

var callBind = require('./callBind');

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

module.exports = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.')) {
		return callBind(intrinsic);
	}
	return intrinsic;
};

},{"../GetIntrinsic":90,"./callBind":93}],95:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],96:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],97:[function(require,module,exports){
'use strict';

var $strSlice = require('../helpers/callBound')('String.prototype.slice');

module.exports = function isPrefixOf(prefix, string) {
	if (prefix === string) {
		return true;
	}
	if (prefix.length > string.length) {
		return false;
	}
	return $strSlice(string, 0, prefix.length) === prefix;
};

},{"../helpers/callBound":94}],98:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('../GetIntrinsic');

var has = require('has');
var $TypeError = GetIntrinsic('%TypeError%');

module.exports = function IsPropertyDescriptor(ES, Desc) {
	if (ES.Type(Desc) !== 'Object') {
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

    for (var key in Desc) { // eslint-disable-line
		if (has(Desc, key) && !allowed[key]) {
			return false;
		}
	}

	if (ES.IsDataDescriptor(Desc) && ES.IsAccessorDescriptor(Desc)) {
		throw new $TypeError('Property Descriptors may not be both accessor and data descriptors');
	}
	return true;
};

},{"../GetIntrinsic":90,"has":108}],99:[function(require,module,exports){
'use strict';

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],100:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],101:[function(require,module,exports){
'use strict';

var toStr = Object.prototype.toString;

var isPrimitive = require('./helpers/isPrimitive');

var isCallable = require('is-callable');

// http://ecma-international.org/ecma-262/5.1/#sec-8.12.8
var ES5internalSlots = {
	'[[DefaultValue]]': function (O) {
		var actualHint;
		if (arguments.length > 1) {
			actualHint = arguments[1];
		} else {
			actualHint = toStr.call(O) === '[object Date]' ? String : Number;
		}

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

// http://ecma-international.org/ecma-262/5.1/#sec-9.1
module.exports = function ToPrimitive(input) {
	if (isPrimitive(input)) {
		return input;
	}
	if (arguments.length > 1) {
		return ES5internalSlots['[[DefaultValue]]'](input, arguments[1]);
	}
	return ES5internalSlots['[[DefaultValue]]'](input);
};

},{"./helpers/isPrimitive":102,"is-callable":112}],102:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],103:[function(require,module,exports){
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

var objectCreate = Object.create || objectCreatePolyfill
var objectKeys = Object.keys || objectKeysPolyfill
var bind = Function.prototype.bind || functionBindPolyfill

function EventEmitter() {
  if (!this._events || !Object.prototype.hasOwnProperty.call(this, '_events')) {
    this._events = objectCreate(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

var hasDefineProperty;
try {
  var o = {};
  if (Object.defineProperty) Object.defineProperty(o, 'x', { value: 0 });
  hasDefineProperty = o.x === 0;
} catch (err) { hasDefineProperty = false }
if (hasDefineProperty) {
  Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
    enumerable: true,
    get: function() {
      return defaultMaxListeners;
    },
    set: function(arg) {
      // check whether the input is a positive number (whose value is zero or
      // greater and not a NaN).
      if (typeof arg !== 'number' || arg < 0 || arg !== arg)
        throw new TypeError('"defaultMaxListeners" must be a positive number');
      defaultMaxListeners = arg;
    }
  });
} else {
  EventEmitter.defaultMaxListeners = defaultMaxListeners;
}

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || isNaN(n))
    throw new TypeError('"n" argument must be a positive number');
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

// These standalone emit* functions are used to optimize calling of event
// handlers for fast cases because emit() itself often has a variable number of
// arguments and can be deoptimized because of that. These functions always have
// the same number of arguments and thus do not get deoptimized, so the code
// inside them can execute faster.
function emitNone(handler, isFn, self) {
  if (isFn)
    handler.call(self);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self);
  }
}
function emitOne(handler, isFn, self, arg1) {
  if (isFn)
    handler.call(self, arg1);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1);
  }
}
function emitTwo(handler, isFn, self, arg1, arg2) {
  if (isFn)
    handler.call(self, arg1, arg2);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2);
  }
}
function emitThree(handler, isFn, self, arg1, arg2, arg3) {
  if (isFn)
    handler.call(self, arg1, arg2, arg3);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2, arg3);
  }
}

function emitMany(handler, isFn, self, args) {
  if (isFn)
    handler.apply(self, args);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].apply(self, args);
  }
}

EventEmitter.prototype.emit = function emit(type) {
  var er, handler, len, args, i, events;
  var doError = (type === 'error');

  events = this._events;
  if (events)
    doError = (doError && events.error == null);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    if (arguments.length > 1)
      er = arguments[1];
    if (er instanceof Error) {
      throw er; // Unhandled 'error' event
    } else {
      // At least give some kind of context to the user
      var err = new Error('Unhandled "error" event. (' + er + ')');
      err.context = er;
      throw err;
    }
    return false;
  }

  handler = events[type];

  if (!handler)
    return false;

  var isFn = typeof handler === 'function';
  len = arguments.length;
  switch (len) {
      // fast cases
    case 1:
      emitNone(handler, isFn, this);
      break;
    case 2:
      emitOne(handler, isFn, this, arguments[1]);
      break;
    case 3:
      emitTwo(handler, isFn, this, arguments[1], arguments[2]);
      break;
    case 4:
      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
      break;
      // slower
    default:
      args = new Array(len - 1);
      for (i = 1; i < len; i++)
        args[i - 1] = arguments[i];
      emitMany(handler, isFn, this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');

  events = target._events;
  if (!events) {
    events = target._events = objectCreate(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener) {
      target.emit('newListener', type,
          listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (!existing) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
          prepend ? [listener, existing] : [existing, listener];
    } else {
      // If we've already got an array, just append.
      if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }
    }

    // Check for listener leak
    if (!existing.warned) {
      m = $getMaxListeners(target);
      if (m && m > 0 && existing.length > m) {
        existing.warned = true;
        var w = new Error('Possible EventEmitter memory leak detected. ' +
            existing.length + ' "' + String(type) + '" listeners ' +
            'added. Use emitter.setMaxListeners() to ' +
            'increase limit.');
        w.name = 'MaxListenersExceededWarning';
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        if (typeof console === 'object' && console.warn) {
          console.warn('%s: %s', w.name, w.message);
        }
      }
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    switch (arguments.length) {
      case 0:
        return this.listener.call(this.target);
      case 1:
        return this.listener.call(this.target, arguments[0]);
      case 2:
        return this.listener.call(this.target, arguments[0], arguments[1]);
      case 3:
        return this.listener.call(this.target, arguments[0], arguments[1],
            arguments[2]);
      default:
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; ++i)
          args[i] = arguments[i];
        this.listener.apply(this.target, args);
    }
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = bind.call(onceWrapper, state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');

      events = this._events;
      if (!events)
        return this;

      list = events[type];
      if (!list)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = objectCreate(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else
          spliceOne(list, position);

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (!events)
        return this;

      // not listening for removeListener, no need to emit
      if (!events.removeListener) {
        if (arguments.length === 0) {
          this._events = objectCreate(null);
          this._eventsCount = 0;
        } else if (events[type]) {
          if (--this._eventsCount === 0)
            this._events = objectCreate(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = objectKeys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = objectCreate(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (!events)
    return [];

  var evlistener = events[type];
  if (!evlistener)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};

// About 1.5x faster than the two-arg version of Array#splice().
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
    list[i] = list[k];
  list.pop();
}

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function objectCreatePolyfill(proto) {
  var F = function() {};
  F.prototype = proto;
  return new F;
}
function objectKeysPolyfill(obj) {
  var keys = [];
  for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) {
    keys.push(k);
  }
  return k;
}
function functionBindPolyfill(context) {
  var fn = this;
  return function () {
    return fn.apply(context, arguments);
  };
}

},{}],104:[function(require,module,exports){
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

},{}],105:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":104}],106:[function(require,module,exports){
(function (global){
'use strict';

var origSymbol = global.Symbol;
var hasSymbolSham = require('./shams');

module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./shams":107}],107:[function(require,module,exports){
'use strict';

/* eslint complexity: [2, 18], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};

},{}],108:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":105}],109:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
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
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

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
  var eLen = (nBytes * 8) - mLen - 1
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
      m = ((value * c) - 1) * Math.pow(2, mLen)
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

},{}],110:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}

},{}],111:[function(require,module,exports){
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

},{}],112:[function(require,module,exports){
'use strict';

var fnToStr = Function.prototype.toString;

var constructorRegex = /^\s*class\b/;
var isES6ClassFn = function isES6ClassFunction(value) {
	try {
		var fnStr = fnToStr.call(value);
		return constructorRegex.test(fnStr);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionToStr(value) {
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
	if (typeof value === 'function' && !value.prototype) { return true; }
	if (hasToStringTag) { return tryFunctionObject(value); }
	if (isES6ClassFn(value)) { return false; }
	var strClass = toStr.call(value);
	return strClass === fnClass || strClass === genClass;
};

},{}],113:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],114:[function(require,module,exports){
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

},{}],115:[function(require,module,exports){
'use strict';

var keysShim;
if (!Object.keys) {
	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var isArgs = require('./isArguments'); // eslint-disable-line global-require
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
		$applicationCache: true,
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$onmozfullscreenchange: true,
		$onmozfullscreenerror: true,
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

	keysShim = function keys(object) {
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
}
module.exports = keysShim;

},{"./isArguments":117}],116:[function(require,module,exports){
'use strict';

var slice = Array.prototype.slice;
var isArgs = require('./isArguments');

var origKeys = Object.keys;
var keysShim = origKeys ? function keys(o) { return origKeys(o); } : require('./implementation');

var originalKeys = Object.keys;

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			var args = Object.keys(arguments);
			return args && args.length === arguments.length;
		}(1, 2));
		if (!keysWorksWithArguments) {
			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				}
				return originalKeys(object);
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;

},{"./implementation":115,"./isArguments":117}],117:[function(require,module,exports){
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

},{}],118:[function(require,module,exports){
(function (process){
// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

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

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
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
},{"_process":120}],119:[function(require,module,exports){
(function (process){
'use strict';

if (typeof process === 'undefined' ||
    !process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = { nextTick: nextTick };
} else {
  module.exports = process
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
},{"_process":120}],120:[function(require,module,exports){
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

},{}],121:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":122}],122:[function(require,module,exports){
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

var pna = require('process-nextick-args');
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

{
  // avoid scope creep, the keys array can then be collected
  var keys = objectKeys(Writable.prototype);
  for (var v = 0; v < keys.length; v++) {
    var method = keys[v];
    if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
  }
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

Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._writableState.highWaterMark;
  }
});

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  pna.nextTick(onEndNT, this);
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

  pna.nextTick(cb, err);
};
},{"./_stream_readable":124,"./_stream_writable":126,"core-util-is":84,"inherits":110,"process-nextick-args":119}],123:[function(require,module,exports){
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
},{"./_stream_transform":125,"core-util-is":84,"inherits":110}],124:[function(require,module,exports){
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

var pna = require('process-nextick-args');
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
  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn);

  // This is a hack to make sure that our error handler is attached before any
  // userland ones.  NEVER DO THIS. This is here only because this code needs
  // to continue to work with older versions of Node.js that do not include
  // the prependListener() method. The goal is to eventually remove this hack.
  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
}

function ReadableState(options, stream) {
  Duplex = Duplex || require('./_stream_duplex');

  options = options || {};

  // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.
  var isDuplex = stream instanceof Duplex;

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var readableHwm = options.readableHighWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;

  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (readableHwm || readableHwm === 0)) this.highWaterMark = readableHwm;else this.highWaterMark = defaultHwm;

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
    if (state.sync) pna.nextTick(emitReadable_, stream);else emitReadable_(stream);
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
    pna.nextTick(maybeReadMore_, stream, state);
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
  if (state.endEmitted) pna.nextTick(endFn);else src.once('end', endFn);

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
        pna.nextTick(nReadingNextTick, this);
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
    pna.nextTick(resume_, stream, state);
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
  var _this = this;

  var state = this._readableState;
  var paused = false;

  stream.on('end', function () {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) _this.push(chunk);
    }

    _this.push(null);
  });

  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = _this.push(chunk);
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
    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
  }

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  this._read = function (n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return this;
};

Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._readableState.highWaterMark;
  }
});

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
    pna.nextTick(endReadableNT, state, stream);
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

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./_stream_duplex":122,"./internal/streams/BufferList":127,"./internal/streams/destroy":128,"./internal/streams/stream":129,"_process":120,"core-util-is":84,"events":103,"inherits":110,"isarray":113,"process-nextick-args":119,"safe-buffer":135,"string_decoder/":141,"util":81}],125:[function(require,module,exports){
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

function afterTransform(er, data) {
  var ts = this._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb) {
    return this.emit('error', new Error('write callback called multiple times'));
  }

  ts.writechunk = null;
  ts.writecb = null;

  if (data != null) // single equals check for both `null` and `undefined`
    this.push(data);

  cb(er);

  var rs = this._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    this._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);

  Duplex.call(this, options);

  this._transformState = {
    afterTransform: afterTransform.bind(this),
    needTransform: false,
    transforming: false,
    writecb: null,
    writechunk: null,
    writeencoding: null
  };

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
  this.on('prefinish', prefinish);
}

function prefinish() {
  var _this = this;

  if (typeof this._flush === 'function') {
    this._flush(function (er, data) {
      done(_this, er, data);
    });
  } else {
    done(this, null, null);
  }
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
  var _this2 = this;

  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
    _this2.emit('close');
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);

  if (data != null) // single equals check for both `null` and `undefined`
    stream.push(data);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  if (stream._writableState.length) throw new Error('Calling transform done when ws.length != 0');

  if (stream._transformState.transforming) throw new Error('Calling transform done when still transforming');

  return stream.push(null);
}
},{"./_stream_duplex":122,"core-util-is":84,"inherits":110}],126:[function(require,module,exports){
(function (process,global,setImmediate){
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

var pna = require('process-nextick-args');
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
var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : pna.nextTick;
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

  // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.
  var isDuplex = stream instanceof Duplex;

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var writableHwm = options.writableHighWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;

  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (writableHwm || writableHwm === 0)) this.highWaterMark = writableHwm;else this.highWaterMark = defaultHwm;

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
      if (this !== Writable) return false;

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
  pna.nextTick(cb, er);
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
    pna.nextTick(cb, er);
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;
  var isBuf = !state.objectMode && _isUint8Array(chunk);

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

Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._writableState.highWaterMark;
  }
});

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
    pna.nextTick(cb, er);
    // this can emit finish, and it will always happen
    // after error
    pna.nextTick(finishMaybe, stream, state);
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
    state.bufferedRequestCount = 0;
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      state.bufferedRequestCount--;
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
      pna.nextTick(callFinal, stream, state);
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
    if (state.finished) pna.nextTick(cb);else stream.once('finish', cb);
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
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("timers").setImmediate)
},{"./_stream_duplex":122,"./internal/streams/destroy":128,"./internal/streams/stream":129,"_process":120,"core-util-is":84,"inherits":110,"process-nextick-args":119,"safe-buffer":135,"timers":148,"util-deprecate":149}],127:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Buffer = require('safe-buffer').Buffer;
var util = require('util');

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

if (util && util.inspect && util.inspect.custom) {
  module.exports.prototype[util.inspect.custom] = function () {
    var obj = util.inspect({ length: this.length });
    return this.constructor.name + ' ' + obj;
  };
}
},{"safe-buffer":135,"util":81}],128:[function(require,module,exports){
'use strict';

/*<replacement>*/

var pna = require('process-nextick-args');
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
      pna.nextTick(emitErrorNT, this, err);
    }
    return this;
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
      pna.nextTick(emitErrorNT, _this, err);
      if (_this._writableState) {
        _this._writableState.errorEmitted = true;
      }
    } else if (cb) {
      cb(err);
    }
  });

  return this;
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
},{"process-nextick-args":119}],129:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":103}],130:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":131}],131:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":122,"./lib/_stream_passthrough.js":123,"./lib/_stream_readable.js":124,"./lib/_stream_transform.js":125,"./lib/_stream_writable.js":126}],132:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":131}],133:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":126}],134:[function(require,module,exports){
(function (process,setImmediate){
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

}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":120,"through":147,"timers":148}],135:[function(require,module,exports){
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

},{"buffer":83}],136:[function(require,module,exports){
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

},{"events":103,"inherits":110,"readable-stream/duplex.js":121,"readable-stream/passthrough.js":130,"readable-stream/readable.js":131,"readable-stream/transform.js":132,"readable-stream/writable.js":133}],137:[function(require,module,exports){
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

},{"es-abstract/es5":91,"function-bind":105}],138:[function(require,module,exports){
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

},{"./implementation":137,"./polyfill":139,"./shim":140,"define-properties":88,"function-bind":105}],139:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":137}],140:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":139,"define-properties":88}],141:[function(require,module,exports){
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

var Buffer = require('safe-buffer').Buffer;
/*</replacement>*/

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
// continuation byte. If an invalid byte is detected, -2 is returned.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return byte >> 6 === 0x02 ? -1 : -2;
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
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
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
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd';
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd';
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd';
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

// For UTF-8, a replacement character is added when ending on a partial
// character.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd';
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
},{"safe-buffer":135}],142:[function(require,module,exports){
(function (process,setImmediate){
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

}).call(this,require('_process'),require("timers").setImmediate)
},{"./lib/default_stream":143,"./lib/results":145,"./lib/test":146,"_process":120,"defined":89,"through":147,"timers":148}],143:[function(require,module,exports){
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
},{"_process":120,"fs":82,"through":147}],144:[function(require,module,exports){
(function (process,setImmediate){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":120,"timers":148}],145:[function(require,module,exports){
(function (process,setImmediate){
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

}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":120,"events":103,"function-bind":105,"has":108,"inherits":110,"object-inspect":114,"resumer":134,"through":147,"timers":148}],146:[function(require,module,exports){
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
},{"./next_tick":144,"deep-equal":85,"defined":89,"events":103,"has":108,"inherits":110,"path":118,"string.prototype.trim":138}],147:[function(require,module,exports){
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
},{"_process":120,"stream":136}],148:[function(require,module,exports){
(function (setImmediate,clearImmediate){
var nextTick = require('process/browser.js').nextTick;
var apply = Function.prototype.apply;
var slice = Array.prototype.slice;
var immediateIds = {};
var nextImmediateId = 0;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) { timeout.close(); };

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// That's not how node.js implements it but the exposed api is the same.
exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
  var id = nextImmediateId++;
  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

  immediateIds[id] = true;

  nextTick(function onNextTick() {
    if (immediateIds[id]) {
      // fn.call() is faster so we optimize for the common use-case
      // @see http://jsperf.com/call-apply-segu
      if (args) {
        fn.apply(null, args);
      } else {
        fn.call(null);
      }
      // Prevent ids from leaking
      exports.clearImmediate(id);
    }
  });

  return id;
};

exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
  delete immediateIds[id];
};
}).call(this,require("timers").setImmediate,require("timers").clearImmediate)
},{"process/browser.js":120,"timers":148}],149:[function(require,module,exports){
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
},{}]},{},[63]);
