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
(function (Buffer){
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

var main = ( typeof Buffer === 'function' ) ? Buffer : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = main;

}).call(this,require("buffer").Buffer)
},{"buffer":90}],5:[function(require,module,exports){
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
* Test for native `Buffer` support.
*
* @module @stdlib/assert/has-node-buffer-support
*
* @example
* var hasNodeBufferSupport = require( '@stdlib/assert/has-node-buffer-support' );
*
* var bool = hasNodeBufferSupport();
* // returns <boolean>
*/

// MODULES //

var hasNodeBufferSupport = require( './main.js' );


// EXPORTS //

module.exports = hasNodeBufferSupport;

},{"./main.js":6}],6:[function(require,module,exports){
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

},{"./buffer.js":4,"@stdlib/assert/is-buffer":24}],7:[function(require,module,exports){
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

},{"./main.js":8}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{"./main.js":10}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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

},{"./main.js":12}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
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

},{"./main.js":14}],14:[function(require,module,exports){
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

},{"@stdlib/assert/has-symbol-support":11}],15:[function(require,module,exports){
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

},{"./main.js":16}],16:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":75}],17:[function(require,module,exports){
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
* Test if a value is a boolean.
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

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var isBoolean = require( './main.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isBoolean, 'isPrimitive', isPrimitive );
setReadOnly( isBoolean, 'isObject', isObject );


// EXPORTS //

module.exports = isBoolean;

},{"./main.js":18,"./object.js":19,"./primitive.js":20,"@stdlib/utils/define-nonenumerable-read-only-property":64}],18:[function(require,module,exports){
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

},{"./object.js":19,"./primitive.js":20}],19:[function(require,module,exports){
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
var test = require( './try2serialize.js' );


// VARIABLES //

var FLG = hasToStringTag();


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
		if ( value instanceof Boolean ) {
			return true;
		}
		if ( FLG ) {
			return test( value );
		}
		return ( nativeClass( value ) === '[object Boolean]' );
	}
	return false;
}


// EXPORTS //

module.exports = isBoolean;

},{"./try2serialize.js":22,"@stdlib/assert/has-tostringtag-support":13,"@stdlib/utils/native-class":75}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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
var toString = Boolean.prototype.toString; // non-generic


// EXPORTS //

module.exports = toString;

},{}],22:[function(require,module,exports){
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

},{"./tostring.js":21}],23:[function(require,module,exports){
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

module.exports = true;

},{}],24:[function(require,module,exports){
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
* Test if a value is a Buffer instance.
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

var isBuffer = require( './main.js' );


// EXPORTS //

module.exports = isBuffer;

},{"./main.js":25}],25:[function(require,module,exports){
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

},{"@stdlib/assert/is-object-like":28}],26:[function(require,module,exports){
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

var isFunction = require( './main.js' );


// EXPORTS //

module.exports = isFunction;

},{"./main.js":27}],27:[function(require,module,exports){
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

},{"@stdlib/utils/type-of":84}],28:[function(require,module,exports){
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

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var arrayfun = require( '@stdlib/assert/tools/array-function' );
var isObjectLike = require( './main.js' );


// MAIN //

setReadOnly( isObjectLike, 'isObjectLikeArray', arrayfun( isObjectLike ) );


// EXPORTS //

module.exports = isObjectLike;

},{"./main.js":29,"@stdlib/assert/tools/array-function":40,"@stdlib/utils/define-nonenumerable-read-only-property":64}],29:[function(require,module,exports){
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

},{}],30:[function(require,module,exports){
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

},{"./main.js":31}],31:[function(require,module,exports){
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

},{"@stdlib/assert/is-array":15}],32:[function(require,module,exports){
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

},{"./main.js":33,"./object.js":34,"./primitive.js":35,"@stdlib/utils/define-nonenumerable-read-only-property":64}],33:[function(require,module,exports){
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

},{"./object.js":34,"./primitive.js":35}],34:[function(require,module,exports){
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

},{"./try2valueof.js":36,"@stdlib/assert/has-tostringtag-support":13,"@stdlib/utils/native-class":75}],35:[function(require,module,exports){
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

},{}],36:[function(require,module,exports){
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

},{"./valueof.js":37}],37:[function(require,module,exports){
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
* Boolean indicating if the current process is running on Windows.
*
* @module @stdlib/assert/is-windows
* @type {boolean}
*
* @example
* var IS_WINDOWS = require( '@stdlib/assert/is-windows' );
*
* if ( IS_WINDOWS ) {
*     console.log( 'Running on Windows...' );
* } else {
*     console.log( 'Running on %s...', process.platform );
* }
*/

// MODULES //

var PLATFORM = require( '@stdlib/os/platform' );


// MAIN //

/**
* Boolean indicating if the current process is running on Windows.
*
* @constant
* @type {boolean}
*/
var IS_WINDOWS = ( PLATFORM === 'win32' );


// EXPORTS //

module.exports = IS_WINDOWS;

},{"@stdlib/os/platform":59}],39:[function(require,module,exports){
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
		throw new TypeError( 'invalid argument. Must provide a function. Value: `' + predicate + '`.' );
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

},{"@stdlib/assert/is-array":15}],40:[function(require,module,exports){
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

},{"./arrayfcn.js":39}],41:[function(require,module,exports){
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

var ctor = require( 'buffer' ).Buffer; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{"buffer":90}],42:[function(require,module,exports){
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

var hasNodeBufferSupport = require( '@stdlib/assert/has-node-buffer-support' );
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

},{"./buffer.js":41,"./polyfill.js":43,"@stdlib/assert/has-node-buffer-support":5}],43:[function(require,module,exports){
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

},{}],44:[function(require,module,exports){
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

var isFunction = require( '@stdlib/assert/is-function' );
var Buffer = require( '@stdlib/buffer/ctor' );


// MAIN //

var bool = isFunction( Buffer.from );


// EXPORTS //

module.exports = bool;

},{"@stdlib/assert/is-function":26,"@stdlib/buffer/ctor":42}],45:[function(require,module,exports){
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

},{"./has_from.js":44,"./main.js":46,"./polyfill.js":47}],46:[function(require,module,exports){
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
		throw new TypeError( 'invalid argument. First argument must be a string. Value: `' + str + '`' );
	}
	if ( arguments.length > 1 ) {
		if ( !isString( encoding ) ) {
			throw new TypeError( 'invalid argument. Second argument must be a string. Value: `' + encoding + '`' );
		}
		return Buffer.from( str, encoding );
	}
	return Buffer.from( str, 'utf8' );
}


// EXPORTS //

module.exports = fromString;

},{"@stdlib/assert/is-string":32,"@stdlib/buffer/ctor":42}],47:[function(require,module,exports){
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
		throw new TypeError( 'invalid argument. First argument must be a string. Value: `' + str + '`' );
	}
	if ( arguments.length > 1 ) {
		if ( !isString( encoding ) ) {
			throw new TypeError( 'invalid argument. Second argument must be a string. Value: `' + encoding + '`' );
		}
		return new Buffer( str, encoding ); // eslint-disable-line no-buffer-constructor
	}
	return new Buffer( str, 'utf8' ); // eslint-disable-line no-buffer-constructor
}


// EXPORTS //

module.exports = fromString;

},{"@stdlib/assert/is-string":32,"@stdlib/buffer/ctor":42}],48:[function(require,module,exports){
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

var string2buffer = require( '@stdlib/buffer/from-string' );
var data = require( './data.js' );


// MAIN //

/**
* Returns an image of an airplane, viewed from above looking down.
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

},{"./data.js":49,"@stdlib/buffer/from-string":45}],49:[function(require,module,exports){
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

var data = '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YWN0SW5mbyByZGY6cGFyc2VUeXBlPSdSZXNvdXJjZSc+CiAgIDxJcHRjNHhtcENvcmU6Q2lBZHJDaXR5PkxvcyBBbmdlbGVzPC9JcHRjNHhtcENvcmU6Q2lBZHJDaXR5PgogICA8SXB0YzR4bXBDb3JlOkNpQWRyQ3RyeT5Vbml0ZWQgU3RhdGVzPC9JcHRjNHhtcENvcmU6Q2lBZHJDdHJ5PgogICA8SXB0YzR4bXBDb3JlOkNpQWRyRXh0YWRyPjEyMDAgR2V0dHkgQ2VudGVyIERyaXZlPC9JcHRjNHhtcENvcmU6Q2lBZHJFeHRhZHI+CiAgIDxJcHRjNHhtcENvcmU6Q2lBZHJQY29kZT45MDA0OTwvSXB0YzR4bXBDb3JlOkNpQWRyUGNvZGU+CiAgIDxJcHRjNHhtcENvcmU6Q2lBZHJSZWdpb24+Q2FsaWZvcm5pYTwvSXB0YzR4bXBDb3JlOkNpQWRyUmVnaW9uPgogICA8SXB0YzR4bXBDb3JlOkNpRW1haWxXb3JrPnJpZ2h0c0BnZXR0eS5lZHU8L0lwdGM0eG1wQ29yZTpDaUVtYWlsV29yaz4KICAgPElwdGM0eG1wQ29yZTpDaVVybFdvcms+d3d3LmdldHR5LmVkdTwvSXB0YzR4bXBDb3JlOkNpVXJsV29yaz4KICA8L0lwdGM0eG1wQ29yZTpDcmVhdG9yQ29udGFjdEluZm8+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOklwdGM0eG1wRXh0PSdodHRwOi8vaXB0Yy5vcmcvc3RkL0lwdGM0eG1wRXh0LzIwMDgtMDItMjkvJz4KICA8SXB0YzR4bXBFeHQ6QXJ0d29ya09yT2JqZWN0PgogICA8cmRmOkJhZz4KICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPgogICAgIDxJcHRjNHhtcEV4dDpBT0NyZWF0b3I+CiAgICAgIDxyZGY6U2VxPgogICAgICAgPHJkZjpsaT5Gw6lkw6hsZSBBemFyaTwvcmRmOmxpPgogICAgICA8L3JkZjpTZXE+CiAgICAgPC9JcHRjNHhtcEV4dDpBT0NyZWF0b3I+CiAgICAgPElwdGM0eG1wRXh0OkFPU291cmNlPlRoZSBKLiBQYXVsIEdldHR5IE11c2V1bSwgTG9zIEFuZ2VsZXM8L0lwdGM0eG1wRXh0OkFPU291cmNlPgogICAgIDxJcHRjNHhtcEV4dDpBT1NvdXJjZUludk5vPjg0LlhBLjI0MC4zNjwvSXB0YzR4bXBFeHQ6QU9Tb3VyY2VJbnZObz4KICAgICA8SXB0YzR4bXBFeHQ6QU9UaXRsZT4KICAgICAgPHJkZjpBbHQ+CiAgICAgICA8cmRmOmxpIHhtbDpsYW5nPSd4LWRlZmF1bHQnPltBaXJwbGFuZSwgdmlld2VkIGZyb20gYWJvdmUgbG9va2luZyBkb3duXTwvcmRmOmxpPgogICAgICA8L3JkZjpBbHQ+CiAgICAgPC9JcHRjNHhtcEV4dDpBT1RpdGxlPgogICAgPC9yZGY6bGk+CiAgIDwvcmRmOkJhZz4KICA8L0lwdGM0eG1wRXh0OkFydHdvcmtPck9iamVjdD4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6ZGM9J2h0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvJz4KICA8ZGM6Y3JlYXRvcj4KICAgPHJkZjpTZXE+CiAgICA8cmRmOmxpPlRoZSBKLiBQYXVsIEdldHR5IE11c2V1bTwvcmRmOmxpPgogICA8L3JkZjpTZXE+CiAgPC9kYzpjcmVhdG9yPgogIDxkYzpkZXNjcmlwdGlvbj4KICAgPHJkZjpBbHQ+CiAgICA8cmRmOmxpIHhtbDpsYW5nPSd4LWRlZmF1bHQnPltBaXJwbGFuZSwgdmlld2VkIGZyb20gYWJvdmUgbG9va2luZyBkb3duXTsgRsOpZMOobGUgQXphcmkgKEl0YWxpYW4sIDE4OTUgLSAxOTMwKTsgSXRhbHk7IDE5MTQgLSAxOTI5OyBHZWxhdGluIHNpbHZlciBwcmludDsgMTEuOCB4IDEyLjIgY20gKDQgNS84IHggNCAxMy8xNiBpbi4pOyA4NC5YQS4yNDAuMzY8L3JkZjpsaT4KICAgPC9yZGY6QWx0PgogIDwvZGM6ZGVzY3JpcHRpb24+CiAgPGRjOnRpdGxlPgogICA8cmRmOkFsdD4KICAgIDxyZGY6bGkgeG1sOmxhbmc9J3gtZGVmYXVsdCc+W0FpcnBsYW5lLCB2aWV3ZWQgZnJvbSBhYm92ZSBsb29raW5nIGRvd25dPC9yZGY6bGk+CiAgIDwvcmRmOkFsdD4KICA8L2RjOnRpdGxlPgogPC9yZGY6RGVzY3JpcHRpb24+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpwaG90b3Nob3A9J2h0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8nPgogIDxwaG90b3Nob3A6U291cmNlPlRoZSBKLiBQYXVsIEdldHR5IE11c2V1bSwgTG9zIEFuZ2VsZXM8L3Bob3Rvc2hvcDpTb3VyY2U+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOnhtcD0naHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyc+CiAgPHhtcDpNZXRhZGF0YURhdGU+MjAxNi0wNC0xNFQwNDoxMDo1MjwveG1wOk1ldGFkYXRhRGF0ZT4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6eG1wUmlnaHRzPSdodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyc+CiAgPHhtcFJpZ2h0czpVc2FnZVRlcm1zPgogICA8cmRmOkFsdD4KICAgIDxyZGY6bGkgeG1sOmxhbmc9J3gtZGVmYXVsdCc+aHR0cDovL3d3dy5nZXR0eS5lZHUvbGVnYWwvaW1hZ2VfcmVxdWVzdC88L3JkZjpsaT4KICAgPC9yZGY6QWx0PgogIDwveG1wUmlnaHRzOlVzYWdlVGVybXM+CiA8L3JkZjpEZXNjcmlwdGlvbj4KPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0ndyc/Pv/bAEMAAgEBAQEBAgEBAQICAgICBAMCAgICBQQEAwQGBQYGBgUGBgYHCQgGBwkHBgYICwgJCgoKCgoGCAsMCwoMCQoKCv/bAEMBAgICAgICBQMDBQoHBgcKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCv/AABEIAs0EAAMBEQACEQEDEQH/xAAdAAABBQEBAQEAAAAAAAAAAAAEAgMFBgcBCAAJ/8QASBAAAgECBAQEBAMHAwQBAwALAQIDBBEABRIhBhMxQQciUWEIFHGBIzKRCRVCobHB8FLR4RYkM/FiF0NyJTSCGFNjkhkmojX/xAAaAQADAQEBAQAAAAAAAAAAAAAAAQIDBAUG/8QAMhEAAwACAgICAgMAAQQCAQQDAAERAiESMQNBIlEEYRMycRQjM0KBBZGhJDRSsfDB4f/aAAwDAQACEQMRAD8A8A8RpPTcQVBkCn8d9tW19Rx5b7PWx/qiuZvDOlW87RMDcWIAK4NE5diK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';


// EXPORTS //

module.exports = data;

},{}],50:[function(require,module,exports){
(function (__dirname){
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

var resolve = require( 'path' ).resolve;
var readFile = require( '@stdlib/fs/read-file' ).sync;


// VARIABLES //

var fpath = resolve( __dirname, '..', 'data', 'image.jpg' );


// MAIN //

/**
* Returns an image of an airplane, viewed from above looking down.
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

}).call(this,"/lib/node_modules/@stdlib/datasets/img-airplane-from-above/lib")
},{"@stdlib/fs/read-file":56,"path":129}],51:[function(require,module,exports){
module.exports={
  "name": "@stdlib/datasets/img-airplane-from-above",
  "version": "0.0.0",
  "description": "Image of an airplane, viewed from above looking down.",
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
    "img-airplane-from-above": "./bin/cli"
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
    "airplane",
    "plane",
    "flying",
    "flight",
    "fly"
  ]
}

},{}],52:[function(require,module,exports){
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

}).call(this,"/lib/node_modules/@stdlib/datasets/img-airplane-from-above/test/test.browser.js")
},{"./../lib/browser.js":48,"@stdlib/assert/is-buffer":24,"tape":154}],53:[function(require,module,exports){
(function (process,__filename,__dirname){
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

}).call(this,require('_process'),"/lib/node_modules/@stdlib/datasets/img-airplane-from-above/test/test.cli.js","/lib/node_modules/@stdlib/datasets/img-airplane-from-above/test")
},{"./../package.json":51,"@stdlib/assert/is-browser":23,"@stdlib/assert/is-windows":38,"@stdlib/buffer/from-string":45,"@stdlib/fs/read-file":56,"_process":131,"child_process":89,"path":129,"tape":154}],54:[function(require,module,exports){
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

}).call(this,"/lib/node_modules/@stdlib/datasets/img-airplane-from-above/test/test.js")
},{"./../lib":48,"@stdlib/assert/is-browser":23,"@stdlib/assert/is-buffer":24,"tape":154}],55:[function(require,module,exports){
(function (__filename){
/* proxyquireify injected requires to make browserify include dependencies in the bundle */ /* istanbul ignore next */; (function __makeBrowserifyIncludeModule__() { require('./../lib/main.js');});/**
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

}).call(this,"/lib/node_modules/@stdlib/datasets/img-airplane-from-above/test/test.main.js")
},{"./../lib/main.js":50,"proxyquireify":132,"tape":154}],56:[function(require,module,exports){
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

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var readFile = require( './main.js' );
var sync = require( './sync.js' );


// MAIN //

setReadOnly( readFile, 'sync', sync );


// EXPORTS //

module.exports = readFile;

},{"./main.js":57,"./sync.js":58,"@stdlib/utils/define-nonenumerable-read-only-property":64}],57:[function(require,module,exports){
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

var readfile = require( 'fs' ).readFile;


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
	readfile.apply( null, args );
}


// EXPORTS //

module.exports = readFile;

},{"fs":89}],58:[function(require,module,exports){
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

var readfileSync = require( 'fs' ).readFileSync; // eslint-disable-line no-sync


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
			f = readfileSync( file, options );
		} else {
			f = readfileSync( file );
		}
	} catch ( err ) {
		return err;
	}
	return f;
}


// EXPORTS //

module.exports = readFileSync;

},{"fs":89}],59:[function(require,module,exports){
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

},{"./platform.js":60}],60:[function(require,module,exports){
(function (process){
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
* Platform on which the current process is running.
*
* @constant
* @type {string}
*/
var PLATFORM = process.platform;


// EXPORTS //

module.exports = PLATFORM;

}).call(this,require('_process'))
},{"_process":131}],61:[function(require,module,exports){
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
* Regular expression to capture everything that is not a space immediately after the `function` keyword and before the first left parenthesis.
*
* @module @stdlib/regexp/function-name
* @type {RegExp}
*
* @example
* var RE_FUNCTION_NAME = require( '@stdlib/regexp/function-name' );
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

},{}],62:[function(require,module,exports){
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
* Determine the name of a value's constructor.
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

var constructorName = require( './main.js' );


// EXPORTS //

module.exports = constructorName;

},{"./main.js":63}],63:[function(require,module,exports){
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
	var match;
	var name;
	var ctor;
	name = nativeClass( v ).slice( 8, -1 );
	if ( (name === 'Object' || name === 'Error') && v.constructor ) {
		ctor = v.constructor;
		if ( typeof ctor.name === 'string' ) {
			return ctor.name;
		}
		match = RE.exec( ctor.toString() );
		if ( match ) {
			return match[ 1 ];
		}
	}
	if ( isBuffer( v ) ) {
		return 'Buffer';
	}
	return name;
}


// EXPORTS //

module.exports = constructorName;

},{"@stdlib/assert/is-buffer":24,"@stdlib/regexp/function-name":61,"@stdlib/utils/native-class":75}],64:[function(require,module,exports){
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

},{"./main.js":65}],65:[function(require,module,exports){
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

},{"@stdlib/utils/define-property":67}],66:[function(require,module,exports){
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

},{}],67:[function(require,module,exports){
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

},{"./builtin.js":66,"./polyfill.js":68,"@stdlib/assert/has-define-property-support":2}],68:[function(require,module,exports){
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

},{"@stdlib/assert/has-property":9,"@stdlib/assert/is-object":30}],69:[function(require,module,exports){
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
* Returns the global object using code generation.
*
* @private
* @returns {Object} global object
*/
function getGlobal() {
	return new Function( 'return this;' )(); // eslint-disable-line no-new-func
}


// EXPORTS //

module.exports = getGlobal;

},{}],70:[function(require,module,exports){
(function (global){
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

var obj = ( typeof global === 'object' ) ? global : null;


// EXPORTS //

module.exports = obj;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],71:[function(require,module,exports){
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
* Return the global object.
*
* @module @stdlib/utils/global
*
* @example
* var getGlobal = require( '@stdlib/utils/global' );
*
* var g = getGlobal();
* // returns {...}
*/

// MODULES //

var getGlobal = require( './main.js' );


// EXPORTS //

module.exports = getGlobal;

},{"./main.js":72}],72:[function(require,module,exports){
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

var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
var getThis = require( './codegen.js' );
var Self = require( './self.js' );
var Win = require( './window.js' );
var Global = require( './global.js' );


// MAIN //

/**
* Returns the global object.
*
* ## Notes
*
* -   Using code generation is the **most** reliable way to resolve the global object; however, doing so is likely to violate content security policies (CSPs) in, e.g., Chrome Apps and elsewhere.
*
* @param {boolean} [codegen=false] - boolean indicating whether to use code generation to resolve the global object
* @throws {TypeError} must provide a boolean
* @throws {Error} unable to resolve global object
* @returns {Object} global object
*
* @example
* var g = getGlobal();
* // returns {...}
*/
function getGlobal( codegen ) {
	if ( arguments.length ) {
		if ( !isBoolean( codegen ) ) {
			throw new TypeError( 'invalid argument. Must provide a boolean primitive. Value: `'+codegen+'`.' );
		}
		if ( codegen ) {
			return getThis();
		}
		// Fall through...
	}
	// Case: browsers and web workers
	if ( Self ) {
		return Self;
	}
	// Case: browsers
	if ( Win ) {
		return Win;
	}
	// Case: Node.js
	if ( Global ) {
		return Global;
	}
	// Case: unknown
	throw new Error( 'unexpected error. Unable to resolve global object.' );
}


// EXPORTS //

module.exports = getGlobal;

},{"./codegen.js":69,"./global.js":70,"./self.js":73,"./window.js":74,"@stdlib/assert/is-boolean":17}],73:[function(require,module,exports){
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

var obj = ( typeof self === 'object' ) ? self : null;


// EXPORTS //

module.exports = obj;

},{}],74:[function(require,module,exports){
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

var obj = ( typeof window === 'object' ) ? window : null;


// EXPORTS //

module.exports = obj;

},{}],75:[function(require,module,exports){
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

},{"./native_class.js":76,"./polyfill.js":77,"@stdlib/assert/has-tostringtag-support":13}],76:[function(require,module,exports){
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

},{"./tostring.js":78,"./tostringtag.js":79,"@stdlib/assert/has-own-property":7}],78:[function(require,module,exports){
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

},{"./fixtures/nodelist.js":81,"./fixtures/re.js":82,"./fixtures/typedarray.js":83}],81:[function(require,module,exports){
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

var getGlobal = require( '@stdlib/utils/global' );


// MAIN //

var root = getGlobal();
var nodeList = root.document && root.document.childNodes;


// EXPORTS //

module.exports = nodeList;

},{"@stdlib/utils/global":71}],82:[function(require,module,exports){
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

var RE = /./;


// EXPORTS //

module.exports = RE;

},{}],83:[function(require,module,exports){
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

var typedarray = Int8Array; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = typedarray;

},{}],84:[function(require,module,exports){
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


// MAIN //

var main = ( usePolyfill() ) ? polyfill : typeOf;


// EXPORTS //

module.exports = main;

},{"./check.js":80,"./polyfill.js":85,"./typeof.js":86}],85:[function(require,module,exports){
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

},{"@stdlib/utils/constructor-name":62}],86:[function(require,module,exports){
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

},{"@stdlib/utils/constructor-name":62}],87:[function(require,module,exports){
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

},{}],88:[function(require,module,exports){

},{}],89:[function(require,module,exports){
arguments[4][88][0].apply(exports,arguments)
},{"dup":88}],90:[function(require,module,exports){
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
},{"base64-js":87,"buffer":90,"ieee754":117}],91:[function(require,module,exports){
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
},{"../../insert-module-globals/node_modules/is-buffer/index.js":119}],92:[function(require,module,exports){
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

},{"./lib/is_arguments.js":93,"./lib/keys.js":94}],93:[function(require,module,exports){
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

},{}],94:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],95:[function(require,module,exports){
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

},{"object-keys":127}],96:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],97:[function(require,module,exports){
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

},{"function-bind":113,"has-symbols":114}],98:[function(require,module,exports){
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

},{"./GetIntrinsic":97,"./helpers/assertRecord":99,"./helpers/callBound":101,"./helpers/isFinite":102,"./helpers/isNaN":103,"./helpers/isPrefixOf":104,"./helpers/isPropertyDescriptor":105,"./helpers/mod":106,"./helpers/sign":107,"es-to-primitive/es5":108,"has":116,"is-callable":120}],99:[function(require,module,exports){
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

},{"../GetIntrinsic":97,"has":116}],100:[function(require,module,exports){
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

},{"../GetIntrinsic":97,"function-bind":113}],101:[function(require,module,exports){
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

},{"../GetIntrinsic":97,"./callBind":100}],102:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],103:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],104:[function(require,module,exports){
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

},{"../helpers/callBound":101}],105:[function(require,module,exports){
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

},{"../GetIntrinsic":97,"has":116}],106:[function(require,module,exports){
'use strict';

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],107:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],108:[function(require,module,exports){
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

},{"./helpers/isPrimitive":109,"is-callable":120}],109:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],110:[function(require,module,exports){
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

},{}],111:[function(require,module,exports){
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

},{"is-object":121,"merge-descriptors":123}],112:[function(require,module,exports){
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

},{}],113:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":112}],114:[function(require,module,exports){
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
},{"./shams":115}],115:[function(require,module,exports){
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

},{}],116:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":113}],117:[function(require,module,exports){
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

},{}],118:[function(require,module,exports){
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

},{}],119:[function(require,module,exports){
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

},{}],120:[function(require,module,exports){
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

},{}],121:[function(require,module,exports){
"use strict";

module.exports = function isObject(x) {
	return typeof x === "object" && x !== null;
};

},{}],122:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],123:[function(require,module,exports){
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

},{}],124:[function(require,module,exports){
'use strict'

module.exports = function createNotFoundError (path) {
  var err = new Error('Cannot find module \'' + path + '\'')
  err.code = 'MODULE_NOT_FOUND'
  return err
}

},{}],125:[function(require,module,exports){
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

},{}],126:[function(require,module,exports){
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

},{"./isArguments":128}],127:[function(require,module,exports){
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

},{"./implementation":126,"./isArguments":128}],128:[function(require,module,exports){
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

},{}],129:[function(require,module,exports){
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
},{"_process":131}],130:[function(require,module,exports){
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
},{"_process":131}],131:[function(require,module,exports){
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

},{}],132:[function(require,module,exports){
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

},{"fill-keys":111,"module-not-found-error":124}],133:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":134}],134:[function(require,module,exports){
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
},{"./_stream_readable":136,"./_stream_writable":138,"core-util-is":91,"inherits":118,"process-nextick-args":130}],135:[function(require,module,exports){
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
},{"./_stream_transform":137,"core-util-is":91,"inherits":118}],136:[function(require,module,exports){
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
},{"./_stream_duplex":134,"./internal/streams/BufferList":139,"./internal/streams/destroy":140,"./internal/streams/stream":141,"_process":131,"core-util-is":91,"events":110,"inherits":118,"isarray":122,"process-nextick-args":130,"safe-buffer":147,"string_decoder/":153,"util":88}],137:[function(require,module,exports){
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
},{"./_stream_duplex":134,"core-util-is":91,"inherits":118}],138:[function(require,module,exports){
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
},{"./_stream_duplex":134,"./internal/streams/destroy":140,"./internal/streams/stream":141,"_process":131,"core-util-is":91,"inherits":118,"process-nextick-args":130,"safe-buffer":147,"timers":160,"util-deprecate":161}],139:[function(require,module,exports){
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
},{"safe-buffer":147,"util":88}],140:[function(require,module,exports){
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
},{"process-nextick-args":130}],141:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":110}],142:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":143}],143:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":134,"./lib/_stream_passthrough.js":135,"./lib/_stream_readable.js":136,"./lib/_stream_transform.js":137,"./lib/_stream_writable.js":138}],144:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":143}],145:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":138}],146:[function(require,module,exports){
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
},{"_process":131,"through":159,"timers":160}],147:[function(require,module,exports){
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

},{"buffer":90}],148:[function(require,module,exports){
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

},{"events":110,"inherits":118,"readable-stream/duplex.js":133,"readable-stream/passthrough.js":142,"readable-stream/readable.js":143,"readable-stream/transform.js":144,"readable-stream/writable.js":145}],149:[function(require,module,exports){
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

},{"es-abstract/es5":98,"function-bind":113}],150:[function(require,module,exports){
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

},{"./implementation":149,"./polyfill":151,"./shim":152,"define-properties":95,"function-bind":113}],151:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":149}],152:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":151,"define-properties":95}],153:[function(require,module,exports){
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
},{"safe-buffer":147}],154:[function(require,module,exports){
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
},{"./lib/default_stream":155,"./lib/results":157,"./lib/test":158,"_process":131,"defined":96,"through":159,"timers":160}],155:[function(require,module,exports){
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
},{"_process":131,"fs":89,"through":159}],156:[function(require,module,exports){
(function (process,setImmediate){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":131,"timers":160}],157:[function(require,module,exports){
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
},{"_process":131,"events":110,"function-bind":113,"has":116,"inherits":118,"object-inspect":125,"resumer":146,"through":159,"timers":160}],158:[function(require,module,exports){
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
},{"./next_tick":156,"deep-equal":92,"defined":96,"events":110,"has":116,"inherits":118,"path":129,"string.prototype.trim":150}],159:[function(require,module,exports){
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
},{"_process":131,"stream":148}],160:[function(require,module,exports){
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
},{"process/browser.js":131,"timers":160}],161:[function(require,module,exports){
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
},{}]},{},[52,53,54,55]);
