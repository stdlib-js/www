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
(function (Buffer){(function (){
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

}).call(this)}).call(this,require("buffer").Buffer)
},{"buffer":103}],2:[function(require,module,exports){
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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

},{"./buffer.js":1,"@stdlib/assert/is-buffer":19}],4:[function(require,module,exports){
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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

},{"@stdlib/assert/has-symbol-support":6}],10:[function(require,module,exports){
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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

},{"@stdlib/utils/native-class":88}],12:[function(require,module,exports){
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
* var Boolean = require( '@stdlib/boolean/ctor' );
* var isBoolean = require( '@stdlib/assert/is-boolean' );
*
* var bool = isBoolean( false );
* // returns true
*
* bool = isBoolean( new Boolean( false ) );
* // returns true
*
* @example
* var Boolean = require( '@stdlib/boolean/ctor' );
* var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
*
* var bool = isBoolean( false );
* // returns true
*
* bool = isBoolean( new Boolean( true ) );
* // returns false
*
* @example
* var Boolean = require( '@stdlib/boolean/ctor' );
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
var main = require( './main.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( main, 'isPrimitive', isPrimitive );
setReadOnly( main, 'isObject', isObject );


// EXPORTS //

module.exports = main;

},{"./main.js":13,"./object.js":14,"./primitive.js":15,"@stdlib/utils/define-nonenumerable-read-only-property":76}],13:[function(require,module,exports){
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
* var Boolean = require( '@stdlib/boolean/ctor' );
*
* var bool = isBoolean( new Boolean( false ) );
* // returns true
*
* @example
* var Boolean = require( '@stdlib/boolean/ctor' );
*
* var bool = isBoolean( new Boolean( true ) );
* // returns true
*/
function isBoolean( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
}


// EXPORTS //

module.exports = isBoolean;

},{"./object.js":14,"./primitive.js":15}],14:[function(require,module,exports){
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
var Boolean = require( '@stdlib/boolean/ctor' );
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
* var Boolean = require( '@stdlib/boolean/ctor' );
*
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

},{"./try2serialize.js":17,"@stdlib/assert/has-tostringtag-support":8,"@stdlib/boolean/ctor":34,"@stdlib/utils/native-class":88}],15:[function(require,module,exports){
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
* var Boolean = require( '@stdlib/boolean/ctor' );
*
* var bool = isBoolean( new Boolean( true ) );
* // returns false
*/
function isBoolean( value ) {
	return ( typeof value === 'boolean' );
}


// EXPORTS //

module.exports = isBoolean;

},{}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
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

},{"./tostring.js":16}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":20}],20:[function(require,module,exports){
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

},{"@stdlib/assert/is-object-like":23}],21:[function(require,module,exports){
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":22}],22:[function(require,module,exports){
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

},{"@stdlib/utils/type-of":97}],23:[function(require,module,exports){
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
var main = require( './main.js' );


// VARIABLES //

var isObjectLikeArray = arrayfun( main );


// MAIN //

setReadOnly( main, 'isObjectLikeArray', isObjectLikeArray );


// EXPORTS //

module.exports = main;

},{"./main.js":24,"@stdlib/assert/tools/array-function":32,"@stdlib/utils/define-nonenumerable-read-only-property":76}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
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
var main = require( './main.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( main, 'isPrimitive', isPrimitive );
setReadOnly( main, 'isObject', isObject );


// EXPORTS //

module.exports = main;

},{"./main.js":26,"./object.js":27,"./primitive.js":28,"@stdlib/utils/define-nonenumerable-read-only-property":76}],26:[function(require,module,exports){
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

},{"./object.js":27,"./primitive.js":28}],27:[function(require,module,exports){
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

},{"./try2valueof.js":29,"@stdlib/assert/has-tostringtag-support":8,"@stdlib/utils/native-class":88}],28:[function(require,module,exports){
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

},{}],29:[function(require,module,exports){
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

},{"./valueof.js":30}],30:[function(require,module,exports){
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

},{}],31:[function(require,module,exports){
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
* var PLATFORM = require( '@stdlib/os/platform' );
* var IS_WINDOWS = require( '@stdlib/assert/is-windows' );
*
* if ( IS_WINDOWS ) {
*     console.log( 'Running on Windows...' );
* } else {
*     console.log( 'Running on %s...', PLATFORM );
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

},{"@stdlib/os/platform":54}],32:[function(require,module,exports){
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":33}],33:[function(require,module,exports){
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
var format = require( '@stdlib/string/format' );


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
		throw new TypeError( format( 'invalid argument. Must provide a function. Value: `%s`.', predicate ) );
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

},{"@stdlib/assert/is-array":10,"@stdlib/string/format":69}],34:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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
* Boolean constructor.
*
* @module @stdlib/boolean/ctor
*
* @example
* var Boolean = require( '@stdlib/boolean/ctor' );
*
* var b = Boolean( null );
* // returns false
*
* b = Boolean( [] );
* // returns true
*
* b = Boolean( {} );
* // returns true
*
* @example
* var Boolean = require( '@stdlib/boolean/ctor' );
*
* var b = new Boolean( false );
* // returns <Boolean>
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":35}],35:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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
* Returns a boolean.
*
* @name Boolean
* @constructor
* @type {Function}
* @param {*} value - input value
* @returns {(boolean|Boolean)} boolean
*
* @example
* var b = Boolean( null );
* // returns false
*
* b = Boolean( [] );
* // returns true
*
* b = Boolean( {} );
* // returns true
*
* @example
* var b = new Boolean( false );
* // returns <Boolean>
*/
var Bool = Boolean; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = Bool;

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
var main = require( './main.js' );
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

},{"./main.js":37,"./polyfill.js":38,"@stdlib/assert/has-node-buffer-support":2}],37:[function(require,module,exports){
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

},{"buffer":103}],38:[function(require,module,exports){
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

// MODULES //

var isFunction = require( '@stdlib/assert/is-function' );
var Buffer = require( '@stdlib/buffer/ctor' );


// MAIN //

var bool = isFunction( Buffer.from );


// EXPORTS //

module.exports = bool;

},{"@stdlib/assert/is-function":21,"@stdlib/buffer/ctor":36}],40:[function(require,module,exports){
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

},{"./has_from.js":39,"./main.js":41,"./polyfill.js":42}],41:[function(require,module,exports){
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
var format = require( '@stdlib/string/format' );
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
		throw new TypeError( format( 'invalid argument. First argument must be a string. Value: `%s`.', str ) );
	}
	if ( arguments.length > 1 ) {
		if ( !isString( encoding ) ) {
			throw new TypeError( format( 'invalid argument. Second argument must be a string. Value: `%s`.', encoding ) );
		}
		return Buffer.from( str, encoding );
	}
	return Buffer.from( str, 'utf8' );
}


// EXPORTS //

module.exports = fromString;

},{"@stdlib/assert/is-string":25,"@stdlib/buffer/ctor":36,"@stdlib/string/format":69}],42:[function(require,module,exports){
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
var format = require( '@stdlib/string/format' );
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
		throw new TypeError( format( 'invalid argument. First argument must be a string. Value: `%s`.', str ) );
	}
	if ( arguments.length > 1 ) {
		if ( !isString( encoding ) ) {
			throw new TypeError( format( 'invalid argument. Second argument must be a string. Value: `%s`.', encoding ) );
		}
		return new Buffer( str, encoding ); // eslint-disable-line no-buffer-constructor
	}
	return new Buffer( str, 'utf8' ); // eslint-disable-line no-buffer-constructor
}


// EXPORTS //

module.exports = fromString;

},{"@stdlib/assert/is-string":25,"@stdlib/buffer/ctor":36,"@stdlib/string/format":69}],43:[function(require,module,exports){
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
* Returns an image of Black Canyon.
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

},{"./data.js":44,"@stdlib/buffer/from-string":40}],44:[function(require,module,exports){
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

var data = '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YWN0SW5mbyByZGY6cGFyc2VUeXBlPSdSZXNvdXJjZSc+CiAgIDxJcHRjNHhtcENvcmU6Q2lBZHJDaXR5PkxvcyBBbmdlbGVzPC9JcHRjNHhtcENvcmU6Q2lBZHJDaXR5PgogICA8SXB0YzR4bXBDb3JlOkNpQWRyQ3RyeT5Vbml0ZWQgU3RhdGVzPC9JcHRjNHhtcENvcmU6Q2lBZHJDdHJ5PgogICA8SXB0YzR4bXBDb3JlOkNpQWRyRXh0YWRyPjEyMDAgR2V0dHkgQ2VudGVyIERyaXZlPC9JcHRjNHhtcENvcmU6Q2lBZHJFeHRhZHI+CiAgIDxJcHRjNHhtcENvcmU6Q2lBZHJQY29kZT45MDA0OTwvSXB0YzR4bXBDb3JlOkNpQWRyUGNvZGU+CiAgIDxJcHRjNHhtcENvcmU6Q2lBZHJSZWdpb24+Q2FsaWZvcm5pYTwvSXB0YzR4bXBDb3JlOkNpQWRyUmVnaW9uPgogICA8SXB0YzR4bXBDb3JlOkNpRW1haWxXb3JrPnJpZ2h0c0BnZXR0eS5lZHU8L0lwdGM0eG1wQ29yZTpDaUVtYWlsV29yaz4KICAgPElwdGM0eG1wQ29yZTpDaVVybFdvcms+d3d3LmdldHR5LmVkdTwvSXB0YzR4bXBDb3JlOkNpVXJsV29yaz4KICA8L0lwdGM0eG1wQ29yZTpDcmVhdG9yQ29udGFjdEluZm8+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOklwdGM0eG1wRXh0PSdodHRwOi8vaXB0Yy5vcmcvc3RkL0lwdGM0eG1wRXh0LzIwMDgtMDItMjkvJz4KICA8SXB0YzR4bXBFeHQ6QXJ0d29ya09yT2JqZWN0PgogICA8cmRmOkJhZz4KICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPgogICAgIDxJcHRjNHhtcEV4dDpBT0NyZWF0b3I+CiAgICAgIDxyZGY6U2VxPgogICAgICAgPHJkZjpsaT5UaW1vdGh5IEguIE8mIzM5O1N1bGxpdmFuPC9yZGY6bGk+CiAgICAgIDwvcmRmOlNlcT4KICAgICA8L0lwdGM0eG1wRXh0OkFPQ3JlYXRvcj4KICAgICA8SXB0YzR4bXBFeHQ6QU9EYXRlQ3JlYXRlZD4xODcxPC9JcHRjNHhtcEV4dDpBT0RhdGVDcmVhdGVkPgogICAgIDxJcHRjNHhtcEV4dDpBT1NvdXJjZT5UaGUgSi4gUGF1bCBHZXR0eSBNdXNldW0sIExvcyBBbmdlbGVzPC9JcHRjNHhtcEV4dDpBT1NvdXJjZT4KICAgICA8SXB0YzR4bXBFeHQ6QU9Tb3VyY2VJbnZObz44NC5YTS40ODQuMTA8L0lwdGM0eG1wRXh0OkFPU291cmNlSW52Tm8+CiAgICAgPElwdGM0eG1wRXh0OkFPVGl0bGU+CiAgICAgIDxyZGY6QWx0PgogICAgICAgPHJkZjpsaSB4bWw6bGFuZz0neC1kZWZhdWx0Jz5CbGFjayBDYcOxb24sIENvbG9yYWRvIFJpdmVyLCBGcm9tIENhbXAgOCwgTG9va2luZyBBYm92ZTwvcmRmOmxpPgogICAgICA8L3JkZjpBbHQ+CiAgICAgPC9JcHRjNHhtcEV4dDpBT1RpdGxlPgogICAgPC9yZGY6bGk+CiAgIDwvcmRmOkJhZz4KICA8L0lwdGM0eG1wRXh0OkFydHdvcmtPck9iamVjdD4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6ZGM9J2h0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvJz4KICA8ZGM6Y3JlYXRvcj4KICAgPHJkZjpTZXE+CiAgICA8cmRmOmxpPlRoZSBKLiBQYXVsIEdldHR5IE11c2V1bTwvcmRmOmxpPgogICA8L3JkZjpTZXE+CiAgPC9kYzpjcmVhdG9yPgogIDxkYzpkZXNjcmlwdGlvbj4KICAgPHJkZjpBbHQ+CiAgICA8cmRmOmxpIHhtbDpsYW5nPSd4LWRlZmF1bHQnPkJsYWNrIENhw7FvbiwgQ29sb3JhZG8gUml2ZXIsIEZyb20gQ2FtcCA4LCBMb29raW5nIEFib3ZlOyBUaW1vdGh5IEguIE8mIzM5O1N1bGxpdmFuIChBbWVyaWNhbiwgYWJvdXQgMTg0MCAtIDE4ODIpOyAxODcxOyBBbGJ1bWVuIHNpbHZlciBwcmludDsgMjAuMiB4IDI3LjUgY20gKDcgMTUvMTYgeCAxMCAxMy8xNiBpbi4pOyA4NC5YTS40ODQuMTA8L3JkZjpsaT4KICAgPC9yZGY6QWx0PgogIDwvZGM6ZGVzY3JpcHRpb24+CiAgPGRjOnRpdGxlPgogICA8cmRmOkFsdD4KICAgIDxyZGY6bGkgeG1sOmxhbmc9J3gtZGVmYXVsdCc+QmxhY2sgQ2HDsW9uLCBDb2xvcmFkbyBSaXZlciwgRnJvbSBDYW1wIDgsIExvb2tpbmcgQWJvdmU8L3JkZjpsaT4KICAgPC9yZGY6QWx0PgogIDwvZGM6dGl0bGU+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOnBob3Rvc2hvcD0naHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyc+CiAgPHBob3Rvc2hvcDpTb3VyY2U+VGhlIEouIFBhdWwgR2V0dHkgTXVzZXVtLCBMb3MgQW5nZWxlczwvcGhvdG9zaG9wOlNvdXJjZT4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6eG1wPSdodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvJz4KICA8eG1wOk1ldGFkYXRhRGF0ZT4yMDE2LTA0LTEzVDE0OjEwOjQ4PC94bXA6TWV0YWRhdGFEYXRlPgogPC9yZGY6RGVzY3JpcHRpb24+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczp4bXBSaWdodHM9J2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9yaWdodHMvJz4KICA8eG1wUmlnaHRzOlVzYWdlVGVybXM+CiAgIDxyZGY6QWx0PgogICAgPHJkZjpsaSB4bWw6bGFuZz0neC1kZWZhdWx0Jz5odHRwOi8vd3d3LmdldHR5LmVkdS9sZWdhbC9pbWFnZV9yZXF1ZXN0LzwvcmRmOmxpPgogICA8L3JkZjpBbHQ+CiAgPC94bXBSaWdodHM6VXNhZ2VUZXJtcz4KIDwvcmRmOkRlc2NyaXB0aW9uPgo8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSd3Jz8+/9sAQwACAQEBAQECAQEBAgICAgIEAwICAgIFBAQDBAYFBgYGBQYGBgcJCAYHCQcGBggLCAkKCgoKCgYICwwLCgwJCgoK/9sAQwECAgICAgIFAwMFCgcGBwoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoK/8AAEQgC7gQAAwERAAIRAQMRAf/EAB4AAAEEAwEBAQAAAAAAAAAAAAQBAgMFAAYHCAkK/8QATRAAAgECBQIEBAMGBQQBAQERAQIDBBEABRIhMQZBBxMiUQgUYXEygZEVI0KhsfAJUsHR4RYkM/FiF3IKJTRDghhTkqImYxlUc7LC4v/EABsB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';


// EXPORTS //

module.exports = data;

},{}],45:[function(require,module,exports){
(function (__dirname){(function (){
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
* Returns an image of Black Canyon.
*
* ## Notes
*
* -   This function synchronously reads data from disk for each invocation. Such behavior is intentional and so is the avoidance of `require`. We assume that invocations are infrequent, and we want to avoid the `require` cache. This means that we allow data to be garbage collected and a user is responsible for explicitly caching data.
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/datasets/img-black-canyon/lib")
},{"@stdlib/fs/read-file":51,"path":105}],46:[function(require,module,exports){
module.exports={
  "name": "@stdlib/datasets/img-black-canyon",
  "version": "0.0.0",
  "description": "Image of Black Canyon.",
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
    "img-black-canyon": "./bin/cli"
  },
  "main": "./lib",
  "browser": "./lib/browser.js",
  "directories": {
    "benchmark": "./benchmark",
    "data": "./data",
    "doc": "./docs",
    "example": "./examples",
    "lib": "./lib",
    "test": "./test"
  },
  "types": "./docs/types",
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
    "river",
    "boat",
    "colorado",
    "canyon"
  ]
}

},{}],47:[function(require,module,exports){
(function (__filename){(function (){
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
	t.strictEqual( typeof image, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a buffer object', function test( t ) {
	var data = image();
	t.equal( isBuffer( data ), true, 'returns a buffer object' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/datasets/img-black-canyon/test/test.browser.js")
},{"./../lib/browser.js":43,"@stdlib/assert/is-buffer":19,"tape":228}],48:[function(require,module,exports){
(function (__filename,__dirname){(function (){
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
var EXEC_PATH = require( '@stdlib/process/exec-path' );
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
		EXEC_PATH,
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
		EXEC_PATH,
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
		EXEC_PATH,
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
		EXEC_PATH,
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
		EXEC_PATH,
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/datasets/img-black-canyon/test/test.cli.js","/lib/node_modules/@stdlib/datasets/img-black-canyon/test")
},{"./../package.json":46,"@stdlib/assert/is-browser":18,"@stdlib/assert/is-windows":31,"@stdlib/buffer/from-string":40,"@stdlib/fs/read-file":51,"@stdlib/process/exec-path":55,"child_process":102,"path":105,"tape":228}],49:[function(require,module,exports){
(function (__filename){(function (){
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
	t.strictEqual( typeof image, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a buffer object', opts, function test( t ) {
	var data = image();
	t.equal( isBuffer( data ), true, 'returns a buffer object' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/datasets/img-black-canyon/test/test.js")
},{"./../lib":43,"@stdlib/assert/is-browser":18,"@stdlib/assert/is-buffer":19,"tape":228}],50:[function(require,module,exports){
(function (__filename){(function (){
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/datasets/img-black-canyon/test/test.main.js")
},{"./../lib/main.js":45,"proxyquireify":218,"tape":228}],51:[function(require,module,exports){
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
var main = require( './main.js' );
var sync = require( './sync.js' );


// MAIN //

setReadOnly( main, 'sync', sync );


// EXPORTS //

module.exports = main;

},{"./main.js":52,"./sync.js":53,"@stdlib/utils/define-nonenumerable-read-only-property":76}],52:[function(require,module,exports){
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
* @param {(string|null)} [options.encoding] - file encoding
* @param {string} [options.flag] - file status flag
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
	args = [];
	for ( i = 0; i < arguments.length; i++ ) {
		args.push( arguments[ i ] );
	}
	readfile.apply( null, args );
}


// EXPORTS //

module.exports = readFile;

},{"fs":102}],53:[function(require,module,exports){
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

var readfileSync = require( 'fs' ).readFileSync; // eslint-disable-line node/no-sync


// MAIN //

/**
* Synchronously reads the entire contents of a file.
*
* @param {(string|Buffer|integer)} file - file path or file descriptor
* @param {(Object|string)} [options] - options
* @param {(string|null)} [options.encoding] - file encoding
* @param {string} [options.flag] - file status flag
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

},{"fs":102}],54:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2020 The Stdlib Authors.
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
var PLATFORM = '';


// EXPORTS //

module.exports = PLATFORM;

},{}],55:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2020 The Stdlib Authors.
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

module.exports = null;

},{}],56:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2021 The Stdlib Authors.
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
*
* @example
* var reFunctionName = require( '@stdlib/regexp/function-name' );
* var RE_FUNCTION_NAME = reFunctionName();
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

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var REGEXP = require( './regexp.js' );


// MAIN //

setReadOnly( main, 'REGEXP', REGEXP );


// EXPORTS //

module.exports = main;

},{"./main.js":57,"./regexp.js":58,"@stdlib/utils/define-nonenumerable-read-only-property":76}],57:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2021 The Stdlib Authors.
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
* Returns a regular expression to capture everything that is not a space immediately after the `function` keyword and before the first left parenthesis.
*
* @returns {RegExp} regular expression
*
* @example
* var RE_FUNCTION_NAME = reFunctionName();
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
function reFunctionName() {
	return /^\s*function\s*([^(]*)/i;
}


// EXPORTS //

module.exports = reFunctionName;

},{}],58:[function(require,module,exports){
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

var reFunctionName = require( './main.js' );


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
var RE_FUNCTION_NAME = reFunctionName();


// EXPORTS //

module.exports = RE_FUNCTION_NAME;

},{"./main.js":57}],59:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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

var isNumber = require( './is_number.js' );

// NOTE: for the following, we explicitly avoid using stdlib packages in this particular package in order to avoid circular dependencies.
var abs = Math.abs; // eslint-disable-line stdlib/no-builtin-math
var lowercase = String.prototype.toLowerCase;
var uppercase = String.prototype.toUpperCase;
var replace = String.prototype.replace;


// VARIABLES //

var RE_EXP_POS_DIGITS = /e\+(\d)$/;
var RE_EXP_NEG_DIGITS = /e-(\d)$/;
var RE_ONLY_DIGITS = /^(\d+)$/;
var RE_DIGITS_BEFORE_EXP = /^(\d+)e/;
var RE_TRAILING_PERIOD_ZERO = /\.0$/;
var RE_PERIOD_ZERO_EXP = /\.0*e/;
var RE_ZERO_BEFORE_EXP = /(\..*[^0])0*e/;


// MAIN //

/**
* Formats a token object argument as a floating-point number.
*
* @private
* @param {Object} token - token object
* @throws {Error} must provide a valid floating-point number
* @returns {string} formatted token argument
*/
function formatDouble( token ) {
	var digits;
	var out;
	var f = parseFloat( token.arg );
	if ( !isFinite( f ) ) { // NOTE: We use the global `isFinite` function here instead of `@stdlib/math/base/assert/is-finite` in order to avoid circular dependencies.
		if ( !isNumber( token.arg ) ) {
			throw new Error( 'invalid floating-point number. Value: ' + out );
		}
		// Case: NaN, Infinity, or -Infinity
		f = token.arg;
	}
	switch ( token.specifier ) {
	case 'e':
	case 'E':
		out = f.toExponential( token.precision );
		break;
	case 'f':
	case 'F':
		out = f.toFixed( token.precision );
		break;
	case 'g':
	case 'G':
		if ( abs( f ) < 0.0001 ) {
			digits = token.precision;
			if ( digits > 0 ) {
				digits -= 1;
			}
			out = f.toExponential( digits );
		} else {
			out = f.toPrecision( token.precision );
		}
		if ( !token.alternate ) {
			out = replace.call( out, RE_ZERO_BEFORE_EXP, '$1e' );
			out = replace.call( out, RE_PERIOD_ZERO_EXP, 'e' );
			out = replace.call( out, RE_TRAILING_PERIOD_ZERO, '' );
		}
		break;
	default:
		throw new Error( 'invalid double notation. Value: ' + token.specifier );
	}
	out = replace.call( out, RE_EXP_POS_DIGITS, 'e+0$1' );
	out = replace.call( out, RE_EXP_NEG_DIGITS, 'e-0$1' );
	if ( token.alternate ) {
		out = replace.call( out, RE_ONLY_DIGITS, '$1.' );
		out = replace.call( out, RE_DIGITS_BEFORE_EXP, '$1.e' );
	}
	if ( f >= 0 && token.sign ) {
		out = token.sign + out;
	}
	out = ( token.specifier === uppercase.call( token.specifier ) ) ?
		uppercase.call( out ) :
		lowercase.call( out );
	return out;
}


// EXPORTS //

module.exports = formatDouble;

},{"./is_number.js":62}],60:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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

var isNumber = require( './is_number.js' );
var zeroPad = require( './zero_pad.js' );

// NOTE: for the following, we explicitly avoid using stdlib packages in this particular package in order to avoid circular dependencies.
var lowercase = String.prototype.toLowerCase;
var uppercase = String.prototype.toUpperCase;


// MAIN //

/**
* Formats a token object argument as an integer.
*
* @private
* @param {Object} token - token object
* @throws {Error} must provide a valid integer
* @returns {string} formatted token argument
*/
function formatInteger( token ) {
	var base;
	var out;
	var i;

	switch ( token.specifier ) {
	case 'b':
		// Case: %b (binary)
		base = 2;
		break;
	case 'o':
		// Case: %o (octal)
		base = 8;
		break;
	case 'x':
	case 'X':
		// Case: %x, %X (hexadecimal)
		base = 16;
		break;
	case 'd':
	case 'i':
	case 'u':
	default:
		// Case: %d, %i, %u (decimal)
		base = 10;
		break;
	}
	out = token.arg;
	i = parseInt( out, 10 );
	if ( !isFinite( i ) ) { // NOTE: We use the global `isFinite` function here instead of `@stdlib/math/base/assert/is-finite` in order to avoid circular dependencies.
		if ( !isNumber( out ) ) {
			throw new Error( 'invalid integer. Value: ' + out );
		}
		i = 0;
	}
	if ( i < 0 && ( token.specifier === 'u' || base !== 10 ) ) {
		i = 0xffffffff + i + 1;
	}
	if ( i < 0 ) {
		out = ( -i ).toString( base );
		if ( token.precision ) {
			out = zeroPad( out, token.precision, token.padRight );
		}
		out = '-' + out;
	} else {
		out = i.toString( base );
		if ( !i && !token.precision ) {
			out = '';
		} else if ( token.precision ) {
			out = zeroPad( out, token.precision, token.padRight );
		}
		if ( token.sign ) {
			out = token.sign + out;
		}
	}
	if ( base === 16 ) {
		if ( token.alternate ) {
			out = '0x' + out;
		}
		out = ( token.specifier === uppercase.call( token.specifier ) ) ?
			uppercase.call( out ) :
			lowercase.call( out );
	}
	if ( base === 8 ) {
		if ( token.alternate && out.charAt( 0 ) !== '0' ) {
			out = '0' + out;
		}
	}
	return out;
}


// EXPORTS //

module.exports = formatInteger;

},{"./is_number.js":62,"./zero_pad.js":66}],61:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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
* Generate string from a token array by interpolating values.
*
* @module @stdlib/string/base/format-interpolate
*
* @example
* var formatInterpolate = require( '@stdlib/string/base/format-interpolate' );
*
* var tokens = ['Hello ', { 'specifier': 's' }, '!' ];
* var out = formatInterpolate( tokens, 'World' );
* // returns 'Hello World!'
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":64}],62:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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
	return ( typeof value === 'number' );  // NOTE: we inline the `isNumber.isPrimitive` function from `@stdlib/assert/is-number` in order to avoid circular dependencies.
}


// EXPORTS //

module.exports = isNumber;

},{}],63:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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
	return ( typeof value === 'string' ); // NOTE: we inline the `isString.isPrimitive` function from `@stdlib/assert/is-string` in order to avoid circular dependencies.
}


// EXPORTS //

module.exports = isString;

},{}],64:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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

var formatInteger = require( './format_integer.js' );
var isString = require( './is_string.js' );
var formatDouble = require( './format_double.js' );
var spacePad = require( './space_pad.js' );
var zeroPad = require( './zero_pad.js' );


// VARIABLES //

var fromCharCode = String.fromCharCode;
var isArray = Array.isArray; // NOTE: We use the global `Array.isArray` function here instead of `@stdlib/assert/is-array` to avoid circular dependencies.


// FUNCTIONS //

/**
* Returns a boolean indicating whether a value is `NaN`.
*
* @private
* @param {*} value - input value
* @returns {boolean} boolean indicating whether a value is `NaN`
*
* @example
* var bool = isnan( NaN );
* // returns true
*
* @example
* var bool = isnan( 4 );
* // returns false
*/
function isnan( value ) { // explicitly define a function here instead of `@stdlib/math/base/assert/is-nan` in order to avoid circular dependencies
	return ( value !== value );
}

/**
* Initializes token object with properties of supplied format identifier object or default values if not present.
*
* @private
* @param {Object} token - format identifier object
* @returns {Object} token object
*/
function initialize( token ) {
	var out = {};
	out.specifier = token.specifier;
	out.precision = ( token.precision === void 0 ) ? 1 : token.precision;
	out.width = token.width;
	out.flags = token.flags || '';
	out.mapping = token.mapping;
	return out;
}


// MAIN //

/**
* Generates string from a token array by interpolating values.
*
* @param {Array} tokens - string parts and format identifier objects
* @param {Array} ...args - variable values
* @throws {TypeError} first argument must be an array
* @throws {Error} invalid flags
* @returns {string} formatted string
*
* @example
* var tokens = [ 'beep ', { 'specifier': 's' } ];
* var out = formatInterpolate( tokens, 'boop' );
* // returns 'beep boop'
*/
function formatInterpolate( tokens ) {
	var hasPeriod;
	var flags;
	var token;
	var flag;
	var num;
	var out;
	var pos;
	var i;
	var j;

	if ( !isArray( tokens ) ) {
		throw new TypeError( 'invalid argument. First argument must be an array. Value: `' + tokens + '`.' );
	}
	out = '';
	pos = 1;
	for ( i = 0; i < tokens.length; i++ ) {
		token = tokens[ i ];
		if ( isString( token ) ) {
			out += token;
		} else {
			hasPeriod = token.precision !== void 0;
			token = initialize( token );
			if ( !token.specifier ) {
				throw new TypeError( 'invalid argument. Token is missing `specifier` property. Index: `'+ i +'`. Value: `' + token + '`.' );
			}
			if ( token.mapping ) {
				pos = token.mapping;
			}
			flags = token.flags;
			for ( j = 0; j < flags.length; j++ ) {
				flag = flags.charAt( j );
				switch ( flag ) {
				case ' ':
					token.sign = ' ';
					break;
				case '+':
					token.sign = '+';
					break;
				case '-':
					token.padRight = true;
					token.padZeros = false;
					break;
				case '0':
					token.padZeros = flags.indexOf( '-' ) < 0; // NOTE: We use built-in `Array.prototype.indexOf` here instead of `@stdlib/assert/contains` in order to avoid circular dependencies.
					break;
				case '#':
					token.alternate = true;
					break;
				default:
					throw new Error( 'invalid flag: ' + flag );
				}
			}
			if ( token.width === '*' ) {
				token.width = parseInt( arguments[ pos ], 10 );
				pos += 1;
				if ( isnan( token.width ) ) {
					throw new TypeError( 'the argument for * width at position ' + pos + ' is not a number. Value: `' + token.width + '`.' );
				}
				if ( token.width < 0 ) {
					token.padRight = true;
					token.width = -token.width;
				}
			}
			if ( hasPeriod ) {
				if ( token.precision === '*' ) {
					token.precision = parseInt( arguments[ pos ], 10 );
					pos += 1;
					if ( isnan( token.precision ) ) {
						throw new TypeError( 'the argument for * precision at position ' + pos + ' is not a number. Value: `' + token.precision + '`.' );
					}
					if ( token.precision < 0 ) {
						token.precision = 1;
						hasPeriod = false;
					}
				}
			}
			token.arg = arguments[ pos ];
			switch ( token.specifier ) {
			case 'b':
			case 'o':
			case 'x':
			case 'X':
			case 'd':
			case 'i':
			case 'u':
				// Case: %b (binary), %o (octal), %x, %X (hexadecimal), %d, %i (decimal), %u (unsigned decimal)
				if ( hasPeriod ) {
					token.padZeros = false;
				}
				token.arg = formatInteger( token );
				break;
			case 's':
				// Case: %s (string)
				token.maxWidth = ( hasPeriod ) ? token.precision : -1;
				token.arg = String( token.arg );
				break;
			case 'c':
				// Case: %c (character)
				if ( !isnan( token.arg ) ) {
					num = parseInt( token.arg, 10 );
					if ( num < 0 || num > 127 ) {
						throw new Error( 'invalid character code. Value: ' + token.arg );
					}
					token.arg = ( isnan( num ) ) ? String( token.arg ) : fromCharCode( num ); // eslint-disable-line max-len
				}
				break;
			case 'e':
			case 'E':
			case 'f':
			case 'F':
			case 'g':
			case 'G':
				// Case: %e, %E (scientific notation), %f, %F (decimal floating point), %g, %G (uses the shorter of %e/E or %f/F)
				if ( !hasPeriod ) {
					token.precision = 6;
				}
				token.arg = formatDouble( token );
				break;
			default:
				throw new Error( 'invalid specifier: ' + token.specifier );
			}
			// Fit argument into field width...
			if ( token.maxWidth >= 0 && token.arg.length > token.maxWidth ) {
				token.arg = token.arg.substring( 0, token.maxWidth );
			}
			if ( token.padZeros ) {
				token.arg = zeroPad( token.arg, token.width || token.precision, token.padRight ); // eslint-disable-line max-len
			} else if ( token.width ) {
				token.arg = spacePad( token.arg, token.width, token.padRight );
			}
			out += token.arg || '';
			pos += 1;
		}
	}
	return out;
}


// EXPORTS //

module.exports = formatInterpolate;

},{"./format_double.js":59,"./format_integer.js":60,"./is_string.js":63,"./space_pad.js":65,"./zero_pad.js":66}],65:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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

/**
* Returns `n` spaces.
*
* @private
* @param {number} n - number of spaces
* @returns {string} string of spaces
*/
function spaces( n ) {
	var out = '';
	var i;
	for ( i = 0; i < n; i++ ) {
		out += ' ';
	}
	return out;
}


// MAIN //

/**
* Pads a token with spaces to the specified width.
*
* @private
* @param {string} str - token argument
* @param {number} width - token width
* @param {boolean} [right=false] - boolean indicating whether to pad to the right
* @returns {string} padded token argument
*/
function spacePad( str, width, right ) {
	var pad = width - str.length;
	if ( pad < 0 ) {
		return str;
	}
	str = ( right ) ?
		str + spaces( pad ) :
		spaces( pad ) + str;
	return str;
}


// EXPORTS //

module.exports = spacePad;

},{}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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

/**
* Tests if a string starts with a minus sign (`-`).
*
* @private
* @param {string} str - input string
* @returns {boolean} boolean indicating if a string starts with a minus sign (`-`)
*/
function startsWithMinus( str ) {
	return str[ 0 ] === '-';
}

/**
* Returns a string of `n` zeros.
*
* @private
* @param {number} n - number of zeros
* @returns {string} string of zeros
*/
function zeros( n ) {
	var out = '';
	var i;
	for ( i = 0; i < n; i++ ) {
		out += '0';
	}
	return out;
}


// MAIN //

/**
* Pads a token with zeros to the specified width.
*
* @private
* @param {string} str - token argument
* @param {number} width - token width
* @param {boolean} [right=false] - boolean indicating whether to pad to the right
* @returns {string} padded token argument
*/
function zeroPad( str, width, right ) {
	var negative = false;
	var pad = width - str.length;
	if ( pad < 0 ) {
		return str;
	}
	if ( startsWithMinus( str ) ) {
		negative = true;
		str = str.substr( 1 );
	}
	str = ( right ) ?
		str + zeros( pad ) :
		zeros( pad ) + str;
	if ( negative ) {
		str = '-' + str;
	}
	return str;
}


// EXPORTS //

module.exports = zeroPad;

},{}],67:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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
* Tokenize a string into an array of string parts and format identifier objects.
*
* @module @stdlib/string/base/format-tokenize
*
* @example
* var formatTokenize = require( '@stdlib/string/base/format-tokenize' );
*
* var str = 'Hello %s!';
* var tokens = formatTokenize( str );
* // returns [ 'Hello ', {...}, '!' ]
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":68}],68:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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

var RE = /%(?:([1-9]\d*)\$)?([0 +\-#]*)(\*|\d+)?(?:(\.)(\*|\d+)?)?[hlL]?([%A-Za-z])/g;


// FUNCTIONS //

/**
* Parses a delimiter.
*
* @private
* @param {Array} match - regular expression match
* @returns {Object} delimiter token object
*/
function parse( match ) {
	var token = {
		'mapping': ( match[ 1 ] ) ? parseInt( match[ 1 ], 10 ) : void 0,
		'flags': match[ 2 ],
		'width': match[ 3 ],
		'precision': match[ 5 ],
		'specifier': match[ 6 ]
	};
	if ( match[ 4 ] === '.' && match[ 5 ] === void 0 ) {
		token.precision = '1';
	}
	return token;
}


// MAIN //

/**
* Tokenizes a string into an array of string parts and format identifier objects.
*
* @param {string} str - input string
* @returns {Array} tokens
*
* @example
* var tokens = formatTokenize( 'Hello %s!' );
* // returns [ 'Hello ', {...}, '!' ]
*/
function formatTokenize( str ) {
	var content;
	var tokens;
	var match;
	var prev;

	tokens = [];
	prev = 0;
	match = RE.exec( str );
	while ( match ) {
		content = str.slice( prev, RE.lastIndex - match[ 0 ].length );
		if ( content.length ) {
			tokens.push( content );
		}
		tokens.push( parse( match ) );
		prev = RE.lastIndex;
		match = RE.exec( str );
	}
	content = str.slice( prev );
	if ( content.length ) {
		tokens.push( content );
	}
	return tokens;
}


// EXPORTS //

module.exports = formatTokenize;

},{}],69:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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
* Insert supplied variable values into a format string.
*
* @module @stdlib/string/format
*
* @example
* var format = require( '@stdlib/string/format' );
*
* var out = format( '%s %s!', 'Hello', 'World' );
* // returns 'Hello World!'
*
* out = format( 'Pi: ~%.2f', 3.141592653589793 );
* // returns 'Pi: ~3.14'
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":71}],70:[function(require,module,exports){
arguments[4][63][0].apply(exports,arguments)
},{"dup":63}],71:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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

var interpolate = require( '@stdlib/string/base/format-interpolate' );
var tokenize = require( '@stdlib/string/base/format-tokenize' );
var isString = require( './is_string.js' );


// MAIN //

/**
* Inserts supplied variable values into a format string.
*
* @param {string} str - input string
* @param {Array} ...args - variable values
* @throws {TypeError} first argument must be a string
* @throws {Error} invalid flags
* @returns {string} formatted string
*
* @example
* var str = format( 'Hello %s!', 'world' );
* // returns 'Hello world!'
*
* @example
* var str = format( 'Pi: ~%.2f', 3.141592653589793 );
* // returns 'Pi: ~3.14'
*/
function format( str ) {
	var args;
	var i;

	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be a string. Value: `%s`.', str ) );
	}
	args = [ tokenize( str ) ];
	for ( i = 1; i < arguments.length; i++ ) {
		args.push( arguments[ i ] );
	}
	return interpolate.apply( null, args );
}


// EXPORTS //

module.exports = format;

},{"./is_string.js":70,"@stdlib/string/base/format-interpolate":61,"@stdlib/string/base/format-tokenize":67}],72:[function(require,module,exports){
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
* Symbol factory.
*
* @module @stdlib/symbol/ctor
*
* @example
* var Symbol = require( '@stdlib/symbol/ctor' );
*
* var s = Symbol( 'beep' );
* // returns <symbol>
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":73}],73:[function(require,module,exports){
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

var Sym = ( typeof Symbol === 'function' ) ? Symbol : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = Sym;

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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":75}],75:[function(require,module,exports){
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
var RE = require( '@stdlib/regexp/function-name' ).REGEXP;
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

},{"@stdlib/assert/is-buffer":19,"@stdlib/regexp/function-name":56,"@stdlib/utils/native-class":88}],76:[function(require,module,exports){
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":77}],77:[function(require,module,exports){
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

},{"@stdlib/utils/define-property":81}],78:[function(require,module,exports){
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

},{}],79:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2021 The Stdlib Authors.
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

},{}],80:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2021 The Stdlib Authors.
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
* @private
* @returns {boolean} boolean indicating if an environment has `Object.defineProperty` support
*
* @example
* var bool = hasDefinePropertySupport();
* // returns <boolean>
*/
function hasDefinePropertySupport() {
	// Test basic support...
	try {
		defineProperty( {}, 'x', {} );
		return true;
	} catch ( err ) { // eslint-disable-line no-unused-vars
		return false;
	}
}


// EXPORTS //

module.exports = hasDefinePropertySupport;

},{"./define_property.js":79}],81:[function(require,module,exports){
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

var hasDefinePropertySupport = require( './has_define_property_support.js' );
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

},{"./builtin.js":78,"./has_define_property_support.js":80,"./polyfill.js":82}],82:[function(require,module,exports){
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

var format = require( '@stdlib/string/format' );


// VARIABLES //

var objectProtoype = Object.prototype;
var toStr = objectProtoype.toString;
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

	if ( typeof obj !== 'object' || obj === null || toStr.call( obj ) === '[object Array]' ) {
		throw new TypeError( format( 'invalid argument. First argument must be an object. Value: `%s`.', obj ) );
	}
	if ( typeof descriptor !== 'object' || descriptor === null || toStr.call( descriptor ) === '[object Array]' ) {
		throw new TypeError( format( 'invalid argument. Property descriptor must be an object. Value: `%s`.', descriptor ) );
	}
	hasValue = ( 'value' in descriptor );
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
	hasGet = ( 'get' in descriptor );
	hasSet = ( 'set' in descriptor );

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

},{"@stdlib/string/format":69}],83:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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
var format = require( '@stdlib/string/format' );
var getThis = require( './codegen.js' );
var Self = require( './self.js' );
var Win = require( './window.js' );
var GlobalThis = require( './global_this.js' );


// MAIN //

/**
* Returns the global object.
*
* ## Notes
*
* -   Using code generation is the **most** reliable way to resolve the global object; however, doing so is likely to violate content security policies (CSPs) in, e.g., Chrome Apps and elsewhere.
*
* @private
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
			throw new TypeError( format( 'invalid argument. Must provide a boolean. Value: `%s`.', codegen ) );
		}
		if ( codegen ) {
			return getThis();
		}
		// Fall through...
	}
	// Case: 2020 revision of ECMAScript standard
	if ( GlobalThis ) {
		return GlobalThis;
	}
	// Case: browsers and web workers
	if ( Self ) {
		return Self;
	}
	// Case: browsers
	if ( Win ) {
		return Win;
	}
	// Case: unknown
	throw new Error( 'unexpected error. Unable to resolve global object.' );
}


// EXPORTS //

module.exports = getGlobal;

},{"./codegen.js":84,"./global_this.js":85,"./self.js":86,"./window.js":87,"@stdlib/assert/is-boolean":12,"@stdlib/string/format":69}],84:[function(require,module,exports){
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
	return new Function( 'return this;' )(); // eslint-disable-line no-new-func, stdlib/require-globals
}


// EXPORTS //

module.exports = getGlobal;

},{}],85:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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

var obj = ( typeof globalThis === 'object' ) ? globalThis : null; // eslint-disable-line no-undef


// EXPORTS //

module.exports = obj;

},{}],86:[function(require,module,exports){
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

},{}],87:[function(require,module,exports){
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

},{}],88:[function(require,module,exports){
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
var builtin = require( './main.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var main;
if ( hasToStringTag() ) {
	main = polyfill;
} else {
	main = builtin;
}


// EXPORTS //

module.exports = main;

},{"./main.js":89,"./polyfill.js":90,"@stdlib/assert/has-tostringtag-support":8}],89:[function(require,module,exports){
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

},{"./tostring.js":91}],90:[function(require,module,exports){
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

},{"./tostring.js":91,"./tostringtag.js":92,"@stdlib/assert/has-own-property":4}],91:[function(require,module,exports){
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

},{}],92:[function(require,module,exports){
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

var Symbol = require( '@stdlib/symbol/ctor' );


// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{"@stdlib/symbol/ctor":72}],93:[function(require,module,exports){
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

},{"./fixtures/nodelist.js":94,"./fixtures/re.js":95,"./fixtures/typedarray.js":96}],94:[function(require,module,exports){
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

},{"@stdlib/utils/global":83}],95:[function(require,module,exports){
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

},{}],96:[function(require,module,exports){
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

},{}],97:[function(require,module,exports){
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
var builtin = require( './main.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var main = ( usePolyfill() ) ? polyfill : builtin;


// EXPORTS //

module.exports = main;

},{"./check.js":93,"./main.js":98,"./polyfill.js":99}],98:[function(require,module,exports){
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

},{"@stdlib/utils/constructor-name":74}],99:[function(require,module,exports){
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

},{"@stdlib/utils/constructor-name":74}],100:[function(require,module,exports){
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
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
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

},{}],101:[function(require,module,exports){

},{}],102:[function(require,module,exports){
arguments[4][101][0].apply(exports,arguments)
},{"dup":101}],103:[function(require,module,exports){
(function (Buffer){(function (){
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
    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function () { return 42 } }
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
    throw TypeError(
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
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

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

}).call(this)}).call(this,require("buffer").Buffer)
},{"base64-js":100,"buffer":103,"ieee754":207}],104:[function(require,module,exports){
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

var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
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
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
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
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
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

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}

},{}],105:[function(require,module,exports){
(function (process){(function (){
// 'path' module extracted from Node.js v8.11.1 (only the posix part)
// transplited with Babel

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

function assertPath(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string. Received ' + JSON.stringify(path));
  }
}

// Resolves . and .. elements in a path with directory names
function normalizeStringPosix(path, allowAboveRoot) {
  var res = '';
  var lastSegmentLength = 0;
  var lastSlash = -1;
  var dots = 0;
  var code;
  for (var i = 0; i <= path.length; ++i) {
    if (i < path.length)
      code = path.charCodeAt(i);
    else if (code === 47 /*/*/)
      break;
    else
      code = 47 /*/*/;
    if (code === 47 /*/*/) {
      if (lastSlash === i - 1 || dots === 1) {
        // NOOP
      } else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 /*.*/ || res.charCodeAt(res.length - 2) !== 46 /*.*/) {
          if (res.length > 2) {
            var lastSlashIndex = res.lastIndexOf('/');
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1) {
                res = '';
                lastSegmentLength = 0;
              } else {
                res = res.slice(0, lastSlashIndex);
                lastSegmentLength = res.length - 1 - res.lastIndexOf('/');
              }
              lastSlash = i;
              dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = '';
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0)
            res += '/..';
          else
            res = '..';
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0)
          res += '/' + path.slice(lastSlash + 1, i);
        else
          res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === 46 /*.*/ && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}

function _format(sep, pathObject) {
  var dir = pathObject.dir || pathObject.root;
  var base = pathObject.base || (pathObject.name || '') + (pathObject.ext || '');
  if (!dir) {
    return base;
  }
  if (dir === pathObject.root) {
    return dir + base;
  }
  return dir + sep + base;
}

var posix = {
  // path.resolve([from ...], to)
  resolve: function resolve() {
    var resolvedPath = '';
    var resolvedAbsolute = false;
    var cwd;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path;
      if (i >= 0)
        path = arguments[i];
      else {
        if (cwd === undefined)
          cwd = process.cwd();
        path = cwd;
      }

      assertPath(path);

      // Skip empty entries
      if (path.length === 0) {
        continue;
      }

      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charCodeAt(0) === 47 /*/*/;
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);

    if (resolvedAbsolute) {
      if (resolvedPath.length > 0)
        return '/' + resolvedPath;
      else
        return '/';
    } else if (resolvedPath.length > 0) {
      return resolvedPath;
    } else {
      return '.';
    }
  },

  normalize: function normalize(path) {
    assertPath(path);

    if (path.length === 0) return '.';

    var isAbsolute = path.charCodeAt(0) === 47 /*/*/;
    var trailingSeparator = path.charCodeAt(path.length - 1) === 47 /*/*/;

    // Normalize the path
    path = normalizeStringPosix(path, !isAbsolute);

    if (path.length === 0 && !isAbsolute) path = '.';
    if (path.length > 0 && trailingSeparator) path += '/';

    if (isAbsolute) return '/' + path;
    return path;
  },

  isAbsolute: function isAbsolute(path) {
    assertPath(path);
    return path.length > 0 && path.charCodeAt(0) === 47 /*/*/;
  },

  join: function join() {
    if (arguments.length === 0)
      return '.';
    var joined;
    for (var i = 0; i < arguments.length; ++i) {
      var arg = arguments[i];
      assertPath(arg);
      if (arg.length > 0) {
        if (joined === undefined)
          joined = arg;
        else
          joined += '/' + arg;
      }
    }
    if (joined === undefined)
      return '.';
    return posix.normalize(joined);
  },

  relative: function relative(from, to) {
    assertPath(from);
    assertPath(to);

    if (from === to) return '';

    from = posix.resolve(from);
    to = posix.resolve(to);

    if (from === to) return '';

    // Trim any leading backslashes
    var fromStart = 1;
    for (; fromStart < from.length; ++fromStart) {
      if (from.charCodeAt(fromStart) !== 47 /*/*/)
        break;
    }
    var fromEnd = from.length;
    var fromLen = fromEnd - fromStart;

    // Trim any leading backslashes
    var toStart = 1;
    for (; toStart < to.length; ++toStart) {
      if (to.charCodeAt(toStart) !== 47 /*/*/)
        break;
    }
    var toEnd = to.length;
    var toLen = toEnd - toStart;

    // Compare paths to find the longest common path from root
    var length = fromLen < toLen ? fromLen : toLen;
    var lastCommonSep = -1;
    var i = 0;
    for (; i <= length; ++i) {
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === 47 /*/*/) {
            // We get here if `from` is the exact base path for `to`.
            // For example: from='/foo/bar'; to='/foo/bar/baz'
            return to.slice(toStart + i + 1);
          } else if (i === 0) {
            // We get here if `from` is the root
            // For example: from='/'; to='/foo'
            return to.slice(toStart + i);
          }
        } else if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === 47 /*/*/) {
            // We get here if `to` is the exact base path for `from`.
            // For example: from='/foo/bar/baz'; to='/foo/bar'
            lastCommonSep = i;
          } else if (i === 0) {
            // We get here if `to` is the root.
            // For example: from='/foo'; to='/'
            lastCommonSep = 0;
          }
        }
        break;
      }
      var fromCode = from.charCodeAt(fromStart + i);
      var toCode = to.charCodeAt(toStart + i);
      if (fromCode !== toCode)
        break;
      else if (fromCode === 47 /*/*/)
        lastCommonSep = i;
    }

    var out = '';
    // Generate the relative path based on the path difference between `to`
    // and `from`
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === 47 /*/*/) {
        if (out.length === 0)
          out += '..';
        else
          out += '/..';
      }
    }

    // Lastly, append the rest of the destination (`to`) path that comes after
    // the common path parts
    if (out.length > 0)
      return out + to.slice(toStart + lastCommonSep);
    else {
      toStart += lastCommonSep;
      if (to.charCodeAt(toStart) === 47 /*/*/)
        ++toStart;
      return to.slice(toStart);
    }
  },

  _makeLong: function _makeLong(path) {
    return path;
  },

  dirname: function dirname(path) {
    assertPath(path);
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
    if (hasRoot && end === 1) return '//';
    return path.slice(0, end);
  },

  basename: function basename(path, ext) {
    if (ext !== undefined && typeof ext !== 'string') throw new TypeError('"ext" argument must be a string');
    assertPath(path);

    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i;

    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
      if (ext.length === path.length && ext === path) return '';
      var extIdx = ext.length - 1;
      var firstNonSlashEnd = -1;
      for (i = path.length - 1; i >= 0; --i) {
        var code = path.charCodeAt(i);
        if (code === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
          if (firstNonSlashEnd === -1) {
            // We saw the first non-path separator, remember this index in case
            // we need it if the extension ends up not matching
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            // Try to match the explicit extension
            if (code === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                // We matched the extension, so mark this as the end of our path
                // component
                end = i;
              }
            } else {
              // Extension does not match, so our result is the entire path
              // component
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }

      if (start === end) end = firstNonSlashEnd;else if (end === -1) end = path.length;
      return path.slice(start, end);
    } else {
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
  },

  extname: function extname(path) {
    assertPath(path);
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
  },

  format: function format(pathObject) {
    if (pathObject === null || typeof pathObject !== 'object') {
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
    }
    return _format('/', pathObject);
  },

  parse: function parse(path) {
    assertPath(path);

    var ret = { root: '', dir: '', base: '', ext: '', name: '' };
    if (path.length === 0) return ret;
    var code = path.charCodeAt(0);
    var isAbsolute = code === 47 /*/*/;
    var start;
    if (isAbsolute) {
      ret.root = '/';
      start = 1;
    } else {
      start = 0;
    }
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1;

    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;

    // Get non-dir info
    for (; i >= start; --i) {
      code = path.charCodeAt(i);
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
          if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
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
      if (end !== -1) {
        if (startPart === 0 && isAbsolute) ret.base = ret.name = path.slice(1, end);else ret.base = ret.name = path.slice(startPart, end);
      }
    } else {
      if (startPart === 0 && isAbsolute) {
        ret.name = path.slice(1, startDot);
        ret.base = path.slice(1, end);
      } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
      }
      ret.ext = path.slice(startDot, end);
    }

    if (startPart > 0) ret.dir = path.slice(0, startPart - 1);else if (isAbsolute) ret.dir = '/';

    return ret;
  },

  sep: '/',
  delimiter: ':',
  win32: null,
  posix: null
};

posix.posix = posix;

module.exports = posix;

}).call(this)}).call(this,require('_process'))
},{"_process":217}],106:[function(require,module,exports){
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
Stream.Readable = require('readable-stream/lib/_stream_readable.js');
Stream.Writable = require('readable-stream/lib/_stream_writable.js');
Stream.Duplex = require('readable-stream/lib/_stream_duplex.js');
Stream.Transform = require('readable-stream/lib/_stream_transform.js');
Stream.PassThrough = require('readable-stream/lib/_stream_passthrough.js');
Stream.finished = require('readable-stream/lib/internal/streams/end-of-stream.js')
Stream.pipeline = require('readable-stream/lib/internal/streams/pipeline.js')

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

},{"events":104,"inherits":208,"readable-stream/lib/_stream_duplex.js":108,"readable-stream/lib/_stream_passthrough.js":109,"readable-stream/lib/_stream_readable.js":110,"readable-stream/lib/_stream_transform.js":111,"readable-stream/lib/_stream_writable.js":112,"readable-stream/lib/internal/streams/end-of-stream.js":116,"readable-stream/lib/internal/streams/pipeline.js":118}],107:[function(require,module,exports){
'use strict';

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var codes = {};

function createErrorType(code, message, Base) {
  if (!Base) {
    Base = Error;
  }

  function getMessage(arg1, arg2, arg3) {
    if (typeof message === 'string') {
      return message;
    } else {
      return message(arg1, arg2, arg3);
    }
  }

  var NodeError =
  /*#__PURE__*/
  function (_Base) {
    _inheritsLoose(NodeError, _Base);

    function NodeError(arg1, arg2, arg3) {
      return _Base.call(this, getMessage(arg1, arg2, arg3)) || this;
    }

    return NodeError;
  }(Base);

  NodeError.prototype.name = Base.name;
  NodeError.prototype.code = code;
  codes[code] = NodeError;
} // https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js


function oneOf(expected, thing) {
  if (Array.isArray(expected)) {
    var len = expected.length;
    expected = expected.map(function (i) {
      return String(i);
    });

    if (len > 2) {
      return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(', '), ", or ") + expected[len - 1];
    } else if (len === 2) {
      return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
    } else {
      return "of ".concat(thing, " ").concat(expected[0]);
    }
  } else {
    return "of ".concat(thing, " ").concat(String(expected));
  }
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith


function startsWith(str, search, pos) {
  return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith


function endsWith(str, search, this_len) {
  if (this_len === undefined || this_len > str.length) {
    this_len = str.length;
  }

  return str.substring(this_len - search.length, this_len) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes


function includes(str, search, start) {
  if (typeof start !== 'number') {
    start = 0;
  }

  if (start + search.length > str.length) {
    return false;
  } else {
    return str.indexOf(search, start) !== -1;
  }
}

createErrorType('ERR_INVALID_OPT_VALUE', function (name, value) {
  return 'The value "' + value + '" is invalid for option "' + name + '"';
}, TypeError);
createErrorType('ERR_INVALID_ARG_TYPE', function (name, expected, actual) {
  // determiner: 'must be' or 'must not be'
  var determiner;

  if (typeof expected === 'string' && startsWith(expected, 'not ')) {
    determiner = 'must not be';
    expected = expected.replace(/^not /, '');
  } else {
    determiner = 'must be';
  }

  var msg;

  if (endsWith(name, ' argument')) {
    // For cases like 'first argument'
    msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  } else {
    var type = includes(name, '.') ? 'property' : 'argument';
    msg = "The \"".concat(name, "\" ").concat(type, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  }

  msg += ". Received type ".concat(typeof actual);
  return msg;
}, TypeError);
createErrorType('ERR_STREAM_PUSH_AFTER_EOF', 'stream.push() after EOF');
createErrorType('ERR_METHOD_NOT_IMPLEMENTED', function (name) {
  return 'The ' + name + ' method is not implemented';
});
createErrorType('ERR_STREAM_PREMATURE_CLOSE', 'Premature close');
createErrorType('ERR_STREAM_DESTROYED', function (name) {
  return 'Cannot call ' + name + ' after a stream was destroyed';
});
createErrorType('ERR_MULTIPLE_CALLBACK', 'Callback called multiple times');
createErrorType('ERR_STREAM_CANNOT_PIPE', 'Cannot pipe, not readable');
createErrorType('ERR_STREAM_WRITE_AFTER_END', 'write after end');
createErrorType('ERR_STREAM_NULL_VALUES', 'May not write null values to stream', TypeError);
createErrorType('ERR_UNKNOWN_ENCODING', function (arg) {
  return 'Unknown encoding: ' + arg;
}, TypeError);
createErrorType('ERR_STREAM_UNSHIFT_AFTER_END_EVENT', 'stream.unshift() after end event');
module.exports.codes = codes;

},{}],108:[function(require,module,exports){
(function (process){(function (){
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

var objectKeys = Object.keys || function (obj) {
  var keys = [];

  for (var key in obj) {
    keys.push(key);
  }

  return keys;
};
/*</replacement>*/


module.exports = Duplex;

var Readable = require('./_stream_readable');

var Writable = require('./_stream_writable');

require('inherits')(Duplex, Readable);

{
  // Allow the keys array to be GC'ed.
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
  this.allowHalfOpen = true;

  if (options) {
    if (options.readable === false) this.readable = false;
    if (options.writable === false) this.writable = false;

    if (options.allowHalfOpen === false) {
      this.allowHalfOpen = false;
      this.once('end', onend);
    }
  }
}

Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.highWaterMark;
  }
});
Object.defineProperty(Duplex.prototype, 'writableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState && this._writableState.getBuffer();
  }
});
Object.defineProperty(Duplex.prototype, 'writableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.length;
  }
}); // the no-half-open enforcer

function onend() {
  // If the writable side ended, then we're ok.
  if (this._writableState.ended) return; // no more data can be written.
  // But allow more writes to happen in this tick.

  process.nextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }

    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});
}).call(this)}).call(this,require('_process'))
},{"./_stream_readable":110,"./_stream_writable":112,"_process":217,"inherits":208}],109:[function(require,module,exports){
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

require('inherits')(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);
  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};
},{"./_stream_transform":111,"inherits":208}],110:[function(require,module,exports){
(function (process,global){(function (){
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

module.exports = Readable;
/*<replacement>*/

var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;
/*<replacement>*/

var EE = require('events').EventEmitter;

var EElistenerCount = function EElistenerCount(emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/


var Stream = require('./internal/streams/stream');
/*</replacement>*/


var Buffer = require('buffer').Buffer;

var OurUint8Array = global.Uint8Array || function () {};

function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}

function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*<replacement>*/


var debugUtil = require('util');

var debug;

if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function debug() {};
}
/*</replacement>*/


var BufferList = require('./internal/streams/buffer_list');

var destroyImpl = require('./internal/streams/destroy');

var _require = require('./internal/streams/state'),
    getHighWaterMark = _require.getHighWaterMark;

var _require$codes = require('../errors').codes,
    ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
    ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF,
    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
    ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT; // Lazy loaded to improve the startup performance.


var StringDecoder;
var createReadableStreamAsyncIterator;
var from;

require('inherits')(Readable, Stream);

var errorOrDestroy = destroyImpl.errorOrDestroy;
var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn); // This is a hack to make sure that our error handler is attached before any
  // userland ones.  NEVER DO THIS. This is here only because this code needs
  // to continue to work with older versions of Node.js that do not include
  // the prependListener() method. The goal is to eventually remove this hack.

  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (Array.isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
}

function ReadableState(options, stream, isDuplex) {
  Duplex = Duplex || require('./_stream_duplex');
  options = options || {}; // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.

  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex; // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away

  this.objectMode = !!options.objectMode;
  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode; // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"

  this.highWaterMark = getHighWaterMark(this, options, 'readableHighWaterMark', isDuplex); // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()

  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false; // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.

  this.sync = true; // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.

  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;
  this.paused = true; // Should close be emitted on destroy. Defaults to true.

  this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'end' (and potentially 'finish')

  this.autoDestroy = !!options.autoDestroy; // has it been destroyed

  this.destroyed = false; // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.

  this.defaultEncoding = options.defaultEncoding || 'utf8'; // the number of writers that are awaiting a drain event in .pipe()s

  this.awaitDrain = 0; // if true, a maybeReadMore has been scheduled

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
  if (!(this instanceof Readable)) return new Readable(options); // Checking for a Stream.Duplex instance is faster here instead of inside
  // the ReadableState constructor, at least with V8 6.5

  var isDuplex = this instanceof Duplex;
  this._readableState = new ReadableState(options, this, isDuplex); // legacy

  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;
    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  Stream.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._readableState === undefined) {
      return false;
    }

    return this._readableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._readableState.destroyed = value;
  }
});
Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;

Readable.prototype._destroy = function (err, cb) {
  cb(err);
}; // Manually shove something into the read() buffer.
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
}; // Unshift should *always* be something directly out of read()


Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  debug('readableAddChunk', chunk);
  var state = stream._readableState;

  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);

    if (er) {
      errorOrDestroy(stream, er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
      } else if (state.destroyed) {
        return false;
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
      maybeReadMore(stream, state);
    }
  } // We can push more data if we are below the highWaterMark.
  // Also, if we have no data yet, we can stand some more bytes.
  // This is to work around cases where hwm=0, such as the repl.


  return !state.ended && (state.length < state.highWaterMark || state.length === 0);
}

function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    state.awaitDrain = 0;
    stream.emit('data', chunk);
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
    er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer', 'Uint8Array'], chunk);
  }

  return er;
}

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
}; // backwards compatibility.


Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
  var decoder = new StringDecoder(enc);
  this._readableState.decoder = decoder; // If setEncoding(null), decoder.encoding equals utf8

  this._readableState.encoding = this._readableState.decoder.encoding; // Iterate over current buffer to convert already stored Buffers:

  var p = this._readableState.buffer.head;
  var content = '';

  while (p !== null) {
    content += decoder.write(p.data);
    p = p.next;
  }

  this._readableState.buffer.clear();

  if (content !== '') this._readableState.buffer.push(content);
  this._readableState.length = content.length;
  return this;
}; // Don't raise the hwm > 1GB


var MAX_HWM = 0x40000000;

function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    // TODO(ronag): Throw ERR_VALUE_OUT_OF_RANGE.
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
} // This function is designed to be inlinable, so please take care when making
// changes to the function body.


function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;

  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  } // If we're asking for more than the current hwm, then raise the hwm.


  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n; // Don't have enough

  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }

  return state.length;
} // you can override either this method, or the async _read(n) below.


Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;
  if (n !== 0) state.emittedReadable = false; // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.

  if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state); // if we've ended, and we're now clear, then finish it up.

  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  } // All the actual chunk generation logic needs to be
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
  debug('need readable', doRead); // if we currently have less than the highWaterMark, then also read some

  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  } // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.


  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true; // if the length is currently zero, then we *need* a readable event.

    if (state.length === 0) state.needReadable = true; // call internal read method

    this._read(state.highWaterMark);

    state.sync = false; // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.

    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = state.length <= state.highWaterMark;
    n = 0;
  } else {
    state.length -= n;
    state.awaitDrain = 0;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true; // If we tried to read() past the EOF, then emit end on the next tick.

    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);
  return ret;
};

function onEofChunk(stream, state) {
  debug('onEofChunk');
  if (state.ended) return;

  if (state.decoder) {
    var chunk = state.decoder.end();

    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }

  state.ended = true;

  if (state.sync) {
    // if we are sync, wait until next tick to emit the data.
    // Otherwise we risk emitting data in the flow()
    // the readable code triggers during a read() call
    emitReadable(stream);
  } else {
    // emit 'readable' now to make sure it gets picked up.
    state.needReadable = false;

    if (!state.emittedReadable) {
      state.emittedReadable = true;
      emitReadable_(stream);
    }
  }
} // Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.


function emitReadable(stream) {
  var state = stream._readableState;
  debug('emitReadable', state.needReadable, state.emittedReadable);
  state.needReadable = false;

  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    process.nextTick(emitReadable_, stream);
  }
}

function emitReadable_(stream) {
  var state = stream._readableState;
  debug('emitReadable_', state.destroyed, state.length, state.ended);

  if (!state.destroyed && (state.length || state.ended)) {
    stream.emit('readable');
    state.emittedReadable = false;
  } // The stream needs another readable event if
  // 1. It is not flowing, as the flow mechanism will take
  //    care of it.
  // 2. It is not ended.
  // 3. It is below the highWaterMark, so we can schedule
  //    another readable later.


  state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
  flow(stream);
} // at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.


function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    process.nextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  // Attempt to read more data if we should.
  //
  // The conditions for reading more data are (one of):
  // - Not enough data buffered (state.length < state.highWaterMark). The loop
  //   is responsible for filling the buffer with enough data if such data
  //   is available. If highWaterMark is 0 and we are not in the flowing mode
  //   we should _not_ attempt to buffer any extra data. We'll get more data
  //   when the stream consumer calls read() instead.
  // - No data in the buffer, and the stream is in flowing mode. In this mode
  //   the loop below is responsible for ensuring read() is called. Failing to
  //   call read here would abort the flow and there's no other mechanism for
  //   continuing the flow if the stream consumer has just subscribed to the
  //   'data' event.
  //
  // In addition to the above conditions to keep reading data, the following
  // conditions prevent the data from being read:
  // - The stream has ended (state.ended).
  // - There is already a pending 'read' operation (state.reading). This is a
  //   case where the the stream has called the implementation defined _read()
  //   method, but they are processing the call asynchronously and have _not_
  //   called push() with new data. In this case we skip performing more
  //   read()s. The execution ends in this method again after the _read() ends
  //   up calling push() with more data.
  while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
    var len = state.length;
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length) // didn't get any data, stop spinning.
      break;
  }

  state.readingMore = false;
} // abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.


Readable.prototype._read = function (n) {
  errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED('_read()'));
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
  if (state.endEmitted) process.nextTick(endFn);else src.once('end', endFn);
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
  } // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.


  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);
  var cleanedUp = false;

  function cleanup() {
    debug('cleanup'); // cleanup event handlers once the pipe is broken

    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);
    cleanedUp = true; // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.

    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  src.on('data', ondata);

  function ondata(chunk) {
    debug('ondata');
    var ret = dest.write(chunk);
    debug('dest.write', ret);

    if (ret === false) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', state.awaitDrain);
        state.awaitDrain++;
      }

      src.pause();
    }
  } // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.


  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) errorOrDestroy(dest, er);
  } // Make sure our error handler is attached before userland ones.


  prependListener(dest, 'error', onerror); // Both close and finish should trigger unpipe, but only once.

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
  } // tell the dest that it's being piped to


  dest.emit('pipe', src); // start the flow if it hasn't been started already.

  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function pipeOnDrainFunctionResult() {
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
  var unpipeInfo = {
    hasUnpiped: false
  }; // if we're not piping anywhere, then do nothing.

  if (state.pipesCount === 0) return this; // just one destination.  most common case.

  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;
    if (!dest) dest = state.pipes; // got a match.

    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  } // slow case. multiple pipe destinations.


  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, {
        hasUnpiped: false
      });
    }

    return this;
  } // try to find the right one.


  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;
  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];
  dest.emit('unpipe', this, unpipeInfo);
  return this;
}; // set up data events if they are asked for
// Ensure readable listeners eventually get something


Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);
  var state = this._readableState;

  if (ev === 'data') {
    // update readableListening so that resume() may be a no-op
    // a few lines down. This is needed to support once('readable').
    state.readableListening = this.listenerCount('readable') > 0; // Try start flowing on next tick if stream isn't explicitly paused

    if (state.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.flowing = false;
      state.emittedReadable = false;
      debug('on readable', state.length, state.reading);

      if (state.length) {
        emitReadable(this);
      } else if (!state.reading) {
        process.nextTick(nReadingNextTick, this);
      }
    }
  }

  return res;
};

Readable.prototype.addListener = Readable.prototype.on;

Readable.prototype.removeListener = function (ev, fn) {
  var res = Stream.prototype.removeListener.call(this, ev, fn);

  if (ev === 'readable') {
    // We need to check if there is someone still listening to
    // readable and reset the state. However this needs to happen
    // after readable has been emitted but before I/O (nextTick) to
    // support once('readable', fn) cycles. This means that calling
    // resume within the same tick will have no
    // effect.
    process.nextTick(updateReadableListening, this);
  }

  return res;
};

Readable.prototype.removeAllListeners = function (ev) {
  var res = Stream.prototype.removeAllListeners.apply(this, arguments);

  if (ev === 'readable' || ev === undefined) {
    // We need to check if there is someone still listening to
    // readable and reset the state. However this needs to happen
    // after readable has been emitted but before I/O (nextTick) to
    // support once('readable', fn) cycles. This means that calling
    // resume within the same tick will have no
    // effect.
    process.nextTick(updateReadableListening, this);
  }

  return res;
};

function updateReadableListening(self) {
  var state = self._readableState;
  state.readableListening = self.listenerCount('readable') > 0;

  if (state.resumeScheduled && !state.paused) {
    // flowing needs to be set to true now, otherwise
    // the upcoming resume will not flow.
    state.flowing = true; // crude way to check if we should resume
  } else if (self.listenerCount('data') > 0) {
    self.resume();
  }
}

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
} // pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.


Readable.prototype.resume = function () {
  var state = this._readableState;

  if (!state.flowing) {
    debug('resume'); // we flow only if there is no one listening
    // for readable, but we still have to call
    // resume()

    state.flowing = !state.readableListening;
    resume(this, state);
  }

  state.paused = false;
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    process.nextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  debug('resume', state.reading);

  if (!state.reading) {
    stream.read(0);
  }

  state.resumeScheduled = false;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);

  if (this._readableState.flowing !== false) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }

  this._readableState.paused = true;
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);

  while (state.flowing && stream.read() !== null) {
    ;
  }
} // wrap an old-style stream as the async data source.
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
    if (state.decoder) chunk = state.decoder.write(chunk); // don't skip over falsy values in objectMode

    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = _this.push(chunk);

    if (!ret) {
      paused = true;
      stream.pause();
    }
  }); // proxy all the other methods.
  // important when wrapping filters and duplexes.

  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function methodWrap(method) {
        return function methodWrapReturnFunction() {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  } // proxy certain important events.


  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
  } // when we try to consume some more bytes, simply unpause the
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

if (typeof Symbol === 'function') {
  Readable.prototype[Symbol.asyncIterator] = function () {
    if (createReadableStreamAsyncIterator === undefined) {
      createReadableStreamAsyncIterator = require('./internal/streams/async_iterator');
    }

    return createReadableStreamAsyncIterator(this);
  };
}

Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.highWaterMark;
  }
});
Object.defineProperty(Readable.prototype, 'readableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState && this._readableState.buffer;
  }
});
Object.defineProperty(Readable.prototype, 'readableFlowing', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.flowing;
  },
  set: function set(state) {
    if (this._readableState) {
      this._readableState.flowing = state;
    }
  }
}); // exposed for testing purposes only.

Readable._fromList = fromList;
Object.defineProperty(Readable.prototype, 'readableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.length;
  }
}); // Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.

function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;
  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.first();else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = state.buffer.consume(n, state.decoder);
  }
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;
  debug('endReadable', state.endEmitted);

  if (!state.endEmitted) {
    state.ended = true;
    process.nextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  debug('endReadableNT', state.endEmitted, state.length); // Check that we didn't get one last unshift.

  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');

    if (state.autoDestroy) {
      // In case of duplex streams we need a way to detect
      // if the writable side is ready for autoDestroy as well
      var wState = stream._writableState;

      if (!wState || wState.autoDestroy && wState.finished) {
        stream.destroy();
      }
    }
  }
}

if (typeof Symbol === 'function') {
  Readable.from = function (iterable, opts) {
    if (from === undefined) {
      from = require('./internal/streams/from');
    }

    return from(Readable, iterable, opts);
  };
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }

  return -1;
}
}).call(this)}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../errors":107,"./_stream_duplex":108,"./internal/streams/async_iterator":113,"./internal/streams/buffer_list":114,"./internal/streams/destroy":115,"./internal/streams/from":117,"./internal/streams/state":119,"./internal/streams/stream":120,"_process":217,"buffer":103,"events":104,"inherits":208,"string_decoder/":227,"util":101}],111:[function(require,module,exports){
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

var _require$codes = require('../errors').codes,
    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
    ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK,
    ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING,
    ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes.ERR_TRANSFORM_WITH_LENGTH_0;

var Duplex = require('./_stream_duplex');

require('inherits')(Transform, Duplex);

function afterTransform(er, data) {
  var ts = this._transformState;
  ts.transforming = false;
  var cb = ts.writecb;

  if (cb === null) {
    return this.emit('error', new ERR_MULTIPLE_CALLBACK());
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
  }; // start out asking for a readable event once data is transformed.

  this._readableState.needReadable = true; // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.

  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;
    if (typeof options.flush === 'function') this._flush = options.flush;
  } // When the writable side finishes, then flush out anything remaining.


  this.on('prefinish', prefinish);
}

function prefinish() {
  var _this = this;

  if (typeof this._flush === 'function' && !this._readableState.destroyed) {
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
}; // This is the part where you do stuff!
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
  cb(new ERR_METHOD_NOT_IMPLEMENTED('_transform()'));
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
}; // Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.


Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && !ts.transforming) {
    ts.transforming = true;

    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform.prototype._destroy = function (err, cb) {
  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);
  if (data != null) // single equals check for both `null` and `undefined`
    stream.push(data); // TODO(BridgeAR): Write a test for these two error cases
  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided

  if (stream._writableState.length) throw new ERR_TRANSFORM_WITH_LENGTH_0();
  if (stream._transformState.transforming) throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
  return stream.push(null);
}
},{"../errors":107,"./_stream_duplex":108,"inherits":208}],112:[function(require,module,exports){
(function (process,global){(function (){
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

module.exports = Writable;
/* <replacement> */

function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
} // It seems a linked list but it is not
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


var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;
/*<replacement>*/

var internalUtil = {
  deprecate: require('util-deprecate')
};
/*</replacement>*/

/*<replacement>*/

var Stream = require('./internal/streams/stream');
/*</replacement>*/


var Buffer = require('buffer').Buffer;

var OurUint8Array = global.Uint8Array || function () {};

function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}

function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

var destroyImpl = require('./internal/streams/destroy');

var _require = require('./internal/streams/state'),
    getHighWaterMark = _require.getHighWaterMark;

var _require$codes = require('../errors').codes,
    ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
    ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK,
    ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE,
    ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED,
    ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES,
    ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END,
    ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;

var errorOrDestroy = destroyImpl.errorOrDestroy;

require('inherits')(Writable, Stream);

function nop() {}

function WritableState(options, stream, isDuplex) {
  Duplex = Duplex || require('./_stream_duplex');
  options = options || {}; // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream,
  // e.g. options.readableObjectMode vs. options.writableObjectMode, etc.

  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex; // object stream flag to indicate whether or not this stream
  // contains buffers or objects.

  this.objectMode = !!options.objectMode;
  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode; // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()

  this.highWaterMark = getHighWaterMark(this, options, 'writableHighWaterMark', isDuplex); // if _final has been called

  this.finalCalled = false; // drain event flag.

  this.needDrain = false; // at the start of calling end()

  this.ending = false; // when end() has been called, and returned

  this.ended = false; // when 'finish' is emitted

  this.finished = false; // has it been destroyed

  this.destroyed = false; // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.

  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode; // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.

  this.defaultEncoding = options.defaultEncoding || 'utf8'; // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.

  this.length = 0; // a flag to see when we're in the middle of a write.

  this.writing = false; // when true all writes will be buffered until .uncork() call

  this.corked = 0; // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.

  this.sync = true; // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.

  this.bufferProcessing = false; // the callback that's passed to _write(chunk,cb)

  this.onwrite = function (er) {
    onwrite(stream, er);
  }; // the callback that the user supplies to write(chunk,encoding,cb)


  this.writecb = null; // the amount that is being written when _write is called.

  this.writelen = 0;
  this.bufferedRequest = null;
  this.lastBufferedRequest = null; // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted

  this.pendingcb = 0; // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams

  this.prefinished = false; // True if the error was already emitted and should not be thrown again

  this.errorEmitted = false; // Should close be emitted on destroy. Defaults to true.

  this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'finish' (and potentially 'end')

  this.autoDestroy = !!options.autoDestroy; // count buffered requests

  this.bufferedRequestCount = 0; // allocate the first CorkedRequest, there is always
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
      get: internalUtil.deprecate(function writableStateBufferGetter() {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})(); // Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.


var realHasInstance;

if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function value(object) {
      if (realHasInstance.call(this, object)) return true;
      if (this !== Writable) return false;
      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function realHasInstance(object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || require('./_stream_duplex'); // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.
  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  // Checking for a Stream.Duplex instance is faster here instead of inside
  // the WritableState constructor, at least with V8 6.5

  var isDuplex = this instanceof Duplex;
  if (!isDuplex && !realHasInstance.call(Writable, this)) return new Writable(options);
  this._writableState = new WritableState(options, this, isDuplex); // legacy.

  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;
    if (typeof options.writev === 'function') this._writev = options.writev;
    if (typeof options.destroy === 'function') this._destroy = options.destroy;
    if (typeof options.final === 'function') this._final = options.final;
  }

  Stream.call(this);
} // Otherwise people can pipe Writable streams, which is just wrong.


Writable.prototype.pipe = function () {
  errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
};

function writeAfterEnd(stream, cb) {
  var er = new ERR_STREAM_WRITE_AFTER_END(); // TODO: defer error events consistently everywhere, not just the cb

  errorOrDestroy(stream, er);
  process.nextTick(cb, er);
} // Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.


function validChunk(stream, state, chunk, cb) {
  var er;

  if (chunk === null) {
    er = new ERR_STREAM_NULL_VALUES();
  } else if (typeof chunk !== 'string' && !state.objectMode) {
    er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer'], chunk);
  }

  if (er) {
    errorOrDestroy(stream, er);
    process.nextTick(cb, er);
    return false;
  }

  return true;
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
  if (state.ending) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }
  return ret;
};

Writable.prototype.cork = function () {
  this._writableState.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;
    if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new ERR_UNKNOWN_ENCODING(encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

Object.defineProperty(Writable.prototype, 'writableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState && this._writableState.getBuffer();
  }
});

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
  get: function get() {
    return this._writableState.highWaterMark;
  }
}); // if we're already writing something, then just put this
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
  var ret = state.length < state.highWaterMark; // we must ensure that previous needDrain will not be reset to false.

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
  if (state.destroyed) state.onwrite(new ERR_STREAM_DESTROYED('write'));else if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    process.nextTick(cb, er); // this can emit finish, and it will always happen
    // after error

    process.nextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    errorOrDestroy(stream, er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    errorOrDestroy(stream, er); // this can emit finish, but finish must
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
  if (typeof cb !== 'function') throw new ERR_MULTIPLE_CALLBACK();
  onwriteStateUpdate(state);
  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state) || stream.destroyed;

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      process.nextTick(afterWrite, stream, state, finished, cb);
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
} // Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.


function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
} // if there's something in the buffer waiting, then process it


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
    doWrite(stream, state, true, state.length, buffer, '', holder.finish); // doWrite is almost always async, defer these to save a bit of time
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
      state.bufferedRequestCount--; // if we didn't call the onwrite immediately, then
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
  cb(new ERR_METHOD_NOT_IMPLEMENTED('_write()'));
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

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding); // .end() fully uncorks

  if (state.corked) {
    state.corked = 1;
    this.uncork();
  } // ignore unnecessary end() calls.


  if (!state.ending) endWritable(this, state, cb);
  return this;
};

Object.defineProperty(Writable.prototype, 'writableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.length;
  }
});

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}

function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;

    if (err) {
      errorOrDestroy(stream, err);
    }

    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}

function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function' && !state.destroyed) {
      state.pendingcb++;
      state.finalCalled = true;
      process.nextTick(callFinal, stream, state);
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

      if (state.autoDestroy) {
        // In case of duplex streams we need a way to detect
        // if the readable side is ready for autoDestroy as well
        var rState = stream._readableState;

        if (!rState || rState.autoDestroy && rState.endEmitted) {
          stream.destroy();
        }
      }
    }
  }

  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);

  if (cb) {
    if (state.finished) process.nextTick(cb);else stream.once('finish', cb);
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
  } // reuse the free corkReq.


  state.corkedRequestsFree.next = corkReq;
}

Object.defineProperty(Writable.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._writableState === undefined) {
      return false;
    }

    return this._writableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._writableState.destroyed = value;
  }
});
Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;

Writable.prototype._destroy = function (err, cb) {
  cb(err);
};
}).call(this)}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../errors":107,"./_stream_duplex":108,"./internal/streams/destroy":115,"./internal/streams/state":119,"./internal/streams/stream":120,"_process":217,"buffer":103,"inherits":208,"util-deprecate":236}],113:[function(require,module,exports){
(function (process){(function (){
'use strict';

var _Object$setPrototypeO;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var finished = require('./end-of-stream');

var kLastResolve = Symbol('lastResolve');
var kLastReject = Symbol('lastReject');
var kError = Symbol('error');
var kEnded = Symbol('ended');
var kLastPromise = Symbol('lastPromise');
var kHandlePromise = Symbol('handlePromise');
var kStream = Symbol('stream');

function createIterResult(value, done) {
  return {
    value: value,
    done: done
  };
}

function readAndResolve(iter) {
  var resolve = iter[kLastResolve];

  if (resolve !== null) {
    var data = iter[kStream].read(); // we defer if data is null
    // we can be expecting either 'end' or
    // 'error'

    if (data !== null) {
      iter[kLastPromise] = null;
      iter[kLastResolve] = null;
      iter[kLastReject] = null;
      resolve(createIterResult(data, false));
    }
  }
}

function onReadable(iter) {
  // we wait for the next tick, because it might
  // emit an error with process.nextTick
  process.nextTick(readAndResolve, iter);
}

function wrapForNext(lastPromise, iter) {
  return function (resolve, reject) {
    lastPromise.then(function () {
      if (iter[kEnded]) {
        resolve(createIterResult(undefined, true));
        return;
      }

      iter[kHandlePromise](resolve, reject);
    }, reject);
  };
}

var AsyncIteratorPrototype = Object.getPrototypeOf(function () {});
var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
  get stream() {
    return this[kStream];
  },

  next: function next() {
    var _this = this;

    // if we have detected an error in the meanwhile
    // reject straight away
    var error = this[kError];

    if (error !== null) {
      return Promise.reject(error);
    }

    if (this[kEnded]) {
      return Promise.resolve(createIterResult(undefined, true));
    }

    if (this[kStream].destroyed) {
      // We need to defer via nextTick because if .destroy(err) is
      // called, the error will be emitted via nextTick, and
      // we cannot guarantee that there is no error lingering around
      // waiting to be emitted.
      return new Promise(function (resolve, reject) {
        process.nextTick(function () {
          if (_this[kError]) {
            reject(_this[kError]);
          } else {
            resolve(createIterResult(undefined, true));
          }
        });
      });
    } // if we have multiple next() calls
    // we will wait for the previous Promise to finish
    // this logic is optimized to support for await loops,
    // where next() is only called once at a time


    var lastPromise = this[kLastPromise];
    var promise;

    if (lastPromise) {
      promise = new Promise(wrapForNext(lastPromise, this));
    } else {
      // fast path needed to support multiple this.push()
      // without triggering the next() queue
      var data = this[kStream].read();

      if (data !== null) {
        return Promise.resolve(createIterResult(data, false));
      }

      promise = new Promise(this[kHandlePromise]);
    }

    this[kLastPromise] = promise;
    return promise;
  }
}, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function () {
  return this;
}), _defineProperty(_Object$setPrototypeO, "return", function _return() {
  var _this2 = this;

  // destroy(err, cb) is a private API
  // we can guarantee we have that here, because we control the
  // Readable class this is attached to
  return new Promise(function (resolve, reject) {
    _this2[kStream].destroy(null, function (err) {
      if (err) {
        reject(err);
        return;
      }

      resolve(createIterResult(undefined, true));
    });
  });
}), _Object$setPrototypeO), AsyncIteratorPrototype);

var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator(stream) {
  var _Object$create;

  var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
    value: stream,
    writable: true
  }), _defineProperty(_Object$create, kLastResolve, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kLastReject, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kError, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kEnded, {
    value: stream._readableState.endEmitted,
    writable: true
  }), _defineProperty(_Object$create, kHandlePromise, {
    value: function value(resolve, reject) {
      var data = iterator[kStream].read();

      if (data) {
        iterator[kLastPromise] = null;
        iterator[kLastResolve] = null;
        iterator[kLastReject] = null;
        resolve(createIterResult(data, false));
      } else {
        iterator[kLastResolve] = resolve;
        iterator[kLastReject] = reject;
      }
    },
    writable: true
  }), _Object$create));
  iterator[kLastPromise] = null;
  finished(stream, function (err) {
    if (err && err.code !== 'ERR_STREAM_PREMATURE_CLOSE') {
      var reject = iterator[kLastReject]; // reject if we are waiting for data in the Promise
      // returned by next() and store the error

      if (reject !== null) {
        iterator[kLastPromise] = null;
        iterator[kLastResolve] = null;
        iterator[kLastReject] = null;
        reject(err);
      }

      iterator[kError] = err;
      return;
    }

    var resolve = iterator[kLastResolve];

    if (resolve !== null) {
      iterator[kLastPromise] = null;
      iterator[kLastResolve] = null;
      iterator[kLastReject] = null;
      resolve(createIterResult(undefined, true));
    }

    iterator[kEnded] = true;
  });
  stream.on('readable', onReadable.bind(null, iterator));
  return iterator;
};

module.exports = createReadableStreamAsyncIterator;
}).call(this)}).call(this,require('_process'))
},{"./end-of-stream":116,"_process":217}],114:[function(require,module,exports){
'use strict';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('buffer'),
    Buffer = _require.Buffer;

var _require2 = require('util'),
    inspect = _require2.inspect;

var custom = inspect && inspect.custom || 'inspect';

function copyBuffer(src, target, offset) {
  Buffer.prototype.copy.call(src, target, offset);
}

module.exports =
/*#__PURE__*/
function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  _createClass(BufferList, [{
    key: "push",
    value: function push(v) {
      var entry = {
        data: v,
        next: null
      };
      if (this.length > 0) this.tail.next = entry;else this.head = entry;
      this.tail = entry;
      ++this.length;
    }
  }, {
    key: "unshift",
    value: function unshift(v) {
      var entry = {
        data: v,
        next: this.head
      };
      if (this.length === 0) this.tail = entry;
      this.head = entry;
      ++this.length;
    }
  }, {
    key: "shift",
    value: function shift() {
      if (this.length === 0) return;
      var ret = this.head.data;
      if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
      --this.length;
      return ret;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.head = this.tail = null;
      this.length = 0;
    }
  }, {
    key: "join",
    value: function join(s) {
      if (this.length === 0) return '';
      var p = this.head;
      var ret = '' + p.data;

      while (p = p.next) {
        ret += s + p.data;
      }

      return ret;
    }
  }, {
    key: "concat",
    value: function concat(n) {
      if (this.length === 0) return Buffer.alloc(0);
      var ret = Buffer.allocUnsafe(n >>> 0);
      var p = this.head;
      var i = 0;

      while (p) {
        copyBuffer(p.data, ret, i);
        i += p.data.length;
        p = p.next;
      }

      return ret;
    } // Consumes a specified amount of bytes or characters from the buffered data.

  }, {
    key: "consume",
    value: function consume(n, hasStrings) {
      var ret;

      if (n < this.head.data.length) {
        // `slice` is the same for buffers and strings.
        ret = this.head.data.slice(0, n);
        this.head.data = this.head.data.slice(n);
      } else if (n === this.head.data.length) {
        // First chunk is a perfect match.
        ret = this.shift();
      } else {
        // Result spans more than one buffer.
        ret = hasStrings ? this._getString(n) : this._getBuffer(n);
      }

      return ret;
    }
  }, {
    key: "first",
    value: function first() {
      return this.head.data;
    } // Consumes a specified amount of characters from the buffered data.

  }, {
    key: "_getString",
    value: function _getString(n) {
      var p = this.head;
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
            if (p.next) this.head = p.next;else this.head = this.tail = null;
          } else {
            this.head = p;
            p.data = str.slice(nb);
          }

          break;
        }

        ++c;
      }

      this.length -= c;
      return ret;
    } // Consumes a specified amount of bytes from the buffered data.

  }, {
    key: "_getBuffer",
    value: function _getBuffer(n) {
      var ret = Buffer.allocUnsafe(n);
      var p = this.head;
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
            if (p.next) this.head = p.next;else this.head = this.tail = null;
          } else {
            this.head = p;
            p.data = buf.slice(nb);
          }

          break;
        }

        ++c;
      }

      this.length -= c;
      return ret;
    } // Make sure the linked list only shows the minimal necessary information.

  }, {
    key: custom,
    value: function value(_, options) {
      return inspect(this, _objectSpread({}, options, {
        // Only inspect one level.
        depth: 0,
        // It should not recurse.
        customInspect: false
      }));
    }
  }]);

  return BufferList;
}();
},{"buffer":103,"util":101}],115:[function(require,module,exports){
(function (process){(function (){
'use strict'; // undocumented cb() API, needed for core, not for public API

function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err) {
      if (!this._writableState) {
        process.nextTick(emitErrorNT, this, err);
      } else if (!this._writableState.errorEmitted) {
        this._writableState.errorEmitted = true;
        process.nextTick(emitErrorNT, this, err);
      }
    }

    return this;
  } // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks


  if (this._readableState) {
    this._readableState.destroyed = true;
  } // if this is a duplex stream mark the writable part as destroyed as well


  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      if (!_this._writableState) {
        process.nextTick(emitErrorAndCloseNT, _this, err);
      } else if (!_this._writableState.errorEmitted) {
        _this._writableState.errorEmitted = true;
        process.nextTick(emitErrorAndCloseNT, _this, err);
      } else {
        process.nextTick(emitCloseNT, _this);
      }
    } else if (cb) {
      process.nextTick(emitCloseNT, _this);
      cb(err);
    } else {
      process.nextTick(emitCloseNT, _this);
    }
  });

  return this;
}

function emitErrorAndCloseNT(self, err) {
  emitErrorNT(self, err);
  emitCloseNT(self);
}

function emitCloseNT(self) {
  if (self._writableState && !self._writableState.emitClose) return;
  if (self._readableState && !self._readableState.emitClose) return;
  self.emit('close');
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
    this._writableState.finalCalled = false;
    this._writableState.prefinished = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

function errorOrDestroy(stream, err) {
  // We have tests that rely on errors being emitted
  // in the same tick, so changing this is semver major.
  // For now when you opt-in to autoDestroy we allow
  // the error to be emitted nextTick. In a future
  // semver major update we should change the default to this.
  var rState = stream._readableState;
  var wState = stream._writableState;
  if (rState && rState.autoDestroy || wState && wState.autoDestroy) stream.destroy(err);else stream.emit('error', err);
}

module.exports = {
  destroy: destroy,
  undestroy: undestroy,
  errorOrDestroy: errorOrDestroy
};
}).call(this)}).call(this,require('_process'))
},{"_process":217}],116:[function(require,module,exports){
// Ported from https://github.com/mafintosh/end-of-stream with
// permission from the author, Mathias Buus (@mafintosh).
'use strict';

var ERR_STREAM_PREMATURE_CLOSE = require('../../../errors').codes.ERR_STREAM_PREMATURE_CLOSE;

function once(callback) {
  var called = false;
  return function () {
    if (called) return;
    called = true;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    callback.apply(this, args);
  };
}

function noop() {}

function isRequest(stream) {
  return stream.setHeader && typeof stream.abort === 'function';
}

function eos(stream, opts, callback) {
  if (typeof opts === 'function') return eos(stream, null, opts);
  if (!opts) opts = {};
  callback = once(callback || noop);
  var readable = opts.readable || opts.readable !== false && stream.readable;
  var writable = opts.writable || opts.writable !== false && stream.writable;

  var onlegacyfinish = function onlegacyfinish() {
    if (!stream.writable) onfinish();
  };

  var writableEnded = stream._writableState && stream._writableState.finished;

  var onfinish = function onfinish() {
    writable = false;
    writableEnded = true;
    if (!readable) callback.call(stream);
  };

  var readableEnded = stream._readableState && stream._readableState.endEmitted;

  var onend = function onend() {
    readable = false;
    readableEnded = true;
    if (!writable) callback.call(stream);
  };

  var onerror = function onerror(err) {
    callback.call(stream, err);
  };

  var onclose = function onclose() {
    var err;

    if (readable && !readableEnded) {
      if (!stream._readableState || !stream._readableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
      return callback.call(stream, err);
    }

    if (writable && !writableEnded) {
      if (!stream._writableState || !stream._writableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
      return callback.call(stream, err);
    }
  };

  var onrequest = function onrequest() {
    stream.req.on('finish', onfinish);
  };

  if (isRequest(stream)) {
    stream.on('complete', onfinish);
    stream.on('abort', onclose);
    if (stream.req) onrequest();else stream.on('request', onrequest);
  } else if (writable && !stream._writableState) {
    // legacy streams
    stream.on('end', onlegacyfinish);
    stream.on('close', onlegacyfinish);
  }

  stream.on('end', onend);
  stream.on('finish', onfinish);
  if (opts.error !== false) stream.on('error', onerror);
  stream.on('close', onclose);
  return function () {
    stream.removeListener('complete', onfinish);
    stream.removeListener('abort', onclose);
    stream.removeListener('request', onrequest);
    if (stream.req) stream.req.removeListener('finish', onfinish);
    stream.removeListener('end', onlegacyfinish);
    stream.removeListener('close', onlegacyfinish);
    stream.removeListener('finish', onfinish);
    stream.removeListener('end', onend);
    stream.removeListener('error', onerror);
    stream.removeListener('close', onclose);
  };
}

module.exports = eos;
},{"../../../errors":107}],117:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],118:[function(require,module,exports){
// Ported from https://github.com/mafintosh/pump with
// permission from the author, Mathias Buus (@mafintosh).
'use strict';

var eos;

function once(callback) {
  var called = false;
  return function () {
    if (called) return;
    called = true;
    callback.apply(void 0, arguments);
  };
}

var _require$codes = require('../../../errors').codes,
    ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS,
    ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;

function noop(err) {
  // Rethrow the error if it exists to avoid swallowing it
  if (err) throw err;
}

function isRequest(stream) {
  return stream.setHeader && typeof stream.abort === 'function';
}

function destroyer(stream, reading, writing, callback) {
  callback = once(callback);
  var closed = false;
  stream.on('close', function () {
    closed = true;
  });
  if (eos === undefined) eos = require('./end-of-stream');
  eos(stream, {
    readable: reading,
    writable: writing
  }, function (err) {
    if (err) return callback(err);
    closed = true;
    callback();
  });
  var destroyed = false;
  return function (err) {
    if (closed) return;
    if (destroyed) return;
    destroyed = true; // request.destroy just do .end - .abort is what we want

    if (isRequest(stream)) return stream.abort();
    if (typeof stream.destroy === 'function') return stream.destroy();
    callback(err || new ERR_STREAM_DESTROYED('pipe'));
  };
}

function call(fn) {
  fn();
}

function pipe(from, to) {
  return from.pipe(to);
}

function popCallback(streams) {
  if (!streams.length) return noop;
  if (typeof streams[streams.length - 1] !== 'function') return noop;
  return streams.pop();
}

function pipeline() {
  for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) {
    streams[_key] = arguments[_key];
  }

  var callback = popCallback(streams);
  if (Array.isArray(streams[0])) streams = streams[0];

  if (streams.length < 2) {
    throw new ERR_MISSING_ARGS('streams');
  }

  var error;
  var destroys = streams.map(function (stream, i) {
    var reading = i < streams.length - 1;
    var writing = i > 0;
    return destroyer(stream, reading, writing, function (err) {
      if (!error) error = err;
      if (err) destroys.forEach(call);
      if (reading) return;
      destroys.forEach(call);
      callback(error);
    });
  });
  return streams.reduce(pipe);
}

module.exports = pipeline;
},{"../../../errors":107,"./end-of-stream":116}],119:[function(require,module,exports){
'use strict';

var ERR_INVALID_OPT_VALUE = require('../../../errors').codes.ERR_INVALID_OPT_VALUE;

function highWaterMarkFrom(options, isDuplex, duplexKey) {
  return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
}

function getHighWaterMark(state, options, duplexKey, isDuplex) {
  var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);

  if (hwm != null) {
    if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
      var name = isDuplex ? duplexKey : 'highWaterMark';
      throw new ERR_INVALID_OPT_VALUE(name, hwm);
    }

    return Math.floor(hwm);
  } // Default value


  return state.objectMode ? 16 : 16 * 1024;
}

module.exports = {
  getHighWaterMark: getHighWaterMark
};
},{"../../../errors":107}],120:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":104}],121:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var callBind = require('./');

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

module.exports = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBind(intrinsic);
	}
	return intrinsic;
};

},{"./":122,"get-intrinsic":198}],122:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var GetIntrinsic = require('get-intrinsic');
var setFunctionLength = require('set-function-length');

var $TypeError = require('es-errors/type');
var $apply = GetIntrinsic('%Function.prototype.apply%');
var $call = GetIntrinsic('%Function.prototype.call%');
var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

var $defineProperty = require('es-define-property');
var $max = GetIntrinsic('%Math.max%');

module.exports = function callBind(originalFunction) {
	if (typeof originalFunction !== 'function') {
		throw new $TypeError('a function is required');
	}
	var func = $reflectApply(bind, $call, arguments);
	return setFunctionLength(
		func,
		1 + $max(0, originalFunction.length - (arguments.length - 1)),
		true
	);
};

var applyBind = function applyBind() {
	return $reflectApply(bind, $apply, arguments);
};

if ($defineProperty) {
	$defineProperty(module.exports, 'apply', { value: applyBind });
} else {
	module.exports.apply = applyBind;
}

},{"es-define-property":182,"es-errors/type":188,"function-bind":197,"get-intrinsic":198,"set-function-length":222}],123:[function(require,module,exports){
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

},{"./lib/is_arguments.js":124,"./lib/keys.js":125}],124:[function(require,module,exports){
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

},{}],125:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],126:[function(require,module,exports){
'use strict';

var $defineProperty = require('es-define-property');

var $SyntaxError = require('es-errors/syntax');
var $TypeError = require('es-errors/type');

var gopd = require('gopd');

/** @type {import('.')} */
module.exports = function defineDataProperty(
	obj,
	property,
	value
) {
	if (!obj || (typeof obj !== 'object' && typeof obj !== 'function')) {
		throw new $TypeError('`obj` must be an object or a function`');
	}
	if (typeof property !== 'string' && typeof property !== 'symbol') {
		throw new $TypeError('`property` must be a string or a symbol`');
	}
	if (arguments.length > 3 && typeof arguments[3] !== 'boolean' && arguments[3] !== null) {
		throw new $TypeError('`nonEnumerable`, if provided, must be a boolean or null');
	}
	if (arguments.length > 4 && typeof arguments[4] !== 'boolean' && arguments[4] !== null) {
		throw new $TypeError('`nonWritable`, if provided, must be a boolean or null');
	}
	if (arguments.length > 5 && typeof arguments[5] !== 'boolean' && arguments[5] !== null) {
		throw new $TypeError('`nonConfigurable`, if provided, must be a boolean or null');
	}
	if (arguments.length > 6 && typeof arguments[6] !== 'boolean') {
		throw new $TypeError('`loose`, if provided, must be a boolean');
	}

	var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
	var nonWritable = arguments.length > 4 ? arguments[4] : null;
	var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
	var loose = arguments.length > 6 ? arguments[6] : false;

	/* @type {false | TypedPropertyDescriptor<unknown>} */
	var desc = !!gopd && gopd(obj, property);

	if ($defineProperty) {
		$defineProperty(obj, property, {
			configurable: nonConfigurable === null && desc ? desc.configurable : !nonConfigurable,
			enumerable: nonEnumerable === null && desc ? desc.enumerable : !nonEnumerable,
			value: value,
			writable: nonWritable === null && desc ? desc.writable : !nonWritable
		});
	} else if (loose || (!nonEnumerable && !nonWritable && !nonConfigurable)) {
		// must fall back to [[Set]], and was not explicitly asked to make non-enumerable, non-writable, or non-configurable
		obj[property] = value; // eslint-disable-line no-param-reassign
	} else {
		throw new $SyntaxError('This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.');
	}
};

},{"es-define-property":182,"es-errors/syntax":187,"es-errors/type":188,"gopd":199}],127:[function(require,module,exports){
'use strict';

var keys = require('object-keys');
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr = Object.prototype.toString;
var concat = Array.prototype.concat;
var defineDataProperty = require('define-data-property');

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var supportsDescriptors = require('has-property-descriptors')();

var defineProperty = function (object, name, value, predicate) {
	if (name in object) {
		if (predicate === true) {
			if (object[name] === value) {
				return;
			}
		} else if (!isFunction(predicate) || !predicate()) {
			return;
		}
	}

	if (supportsDescriptors) {
		defineDataProperty(object, name, value, true);
	} else {
		defineDataProperty(object, name, value);
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

},{"define-data-property":126,"has-property-descriptors":200,"object-keys":215}],128:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],129:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');
var ToPrimitive = require('./ToPrimitive');
var Type = require('./Type');

// https://262.ecma-international.org/5.1/#sec-11.9.3

module.exports = function AbstractEqualityComparison(x, y) {
	var xType = Type(x);
	var yType = Type(y);
	if (xType === yType) {
		return x === y; // ES6+ specified this shortcut anyways.
	}
	if (x == null && y == null) {
		return true;
	}
	if (xType === 'Number' && yType === 'String') {
		return AbstractEqualityComparison(x, ToNumber(y));
	}
	if (xType === 'String' && yType === 'Number') {
		return AbstractEqualityComparison(ToNumber(x), y);
	}
	if (xType === 'Boolean') {
		return AbstractEqualityComparison(ToNumber(x), y);
	}
	if (yType === 'Boolean') {
		return AbstractEqualityComparison(x, ToNumber(y));
	}
	if ((xType === 'String' || xType === 'Number') && yType === 'Object') {
		return AbstractEqualityComparison(x, ToPrimitive(y));
	}
	if (xType === 'Object' && (yType === 'String' || yType === 'Number')) {
		return AbstractEqualityComparison(ToPrimitive(x), y);
	}
	return false;
};

},{"./ToNumber":160,"./ToPrimitive":162,"./Type":167}],130:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Number = GetIntrinsic('%Number%');
var $TypeError = require('es-errors/type');

var $isNaN = require('../helpers/isNaN');
var $isFinite = require('../helpers/isFinite');
var isPrefixOf = require('../helpers/isPrefixOf');

var ToNumber = require('./ToNumber');
var ToPrimitive = require('./ToPrimitive');

// https://262.ecma-international.org/5.1/#sec-11.8.5

// eslint-disable-next-line max-statements
module.exports = function AbstractRelationalComparison(x, y, LeftFirst) {
	if (typeof LeftFirst !== 'boolean') {
		throw new $TypeError('Assertion failed: LeftFirst argument must be a Boolean');
	}
	var px;
	var py;
	if (LeftFirst) {
		px = ToPrimitive(x, $Number);
		py = ToPrimitive(y, $Number);
	} else {
		py = ToPrimitive(y, $Number);
		px = ToPrimitive(x, $Number);
	}
	var bothStrings = typeof px === 'string' && typeof py === 'string';
	if (!bothStrings) {
		var nx = ToNumber(px);
		var ny = ToNumber(py);
		if ($isNaN(nx) || $isNaN(ny)) {
			return undefined;
		}
		if ($isFinite(nx) && $isFinite(ny) && nx === ny) {
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
};

},{"../helpers/isFinite":175,"../helpers/isNaN":176,"../helpers/isPrefixOf":177,"./ToNumber":160,"./ToPrimitive":162,"es-errors/type":188,"get-intrinsic":198}],131:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

var callBound = require('call-bind/callBound');

var $charCodeAt = callBound('String.prototype.charCodeAt');
var $toUpperCase = callBound('String.prototype.toUpperCase');

// https://262.ecma-international.org/5.1/#sec-15.10.2.8

module.exports = function Canonicalize(ch, IgnoreCase) {
	if (typeof ch !== 'string' || ch.length !== 1) {
		throw new $TypeError('Assertion failed: `ch` must be a character');
	}

	if (typeof IgnoreCase !== 'boolean') {
		throw new $TypeError('Assertion failed: `IgnoreCase` must be a Boolean');
	}

	if (!IgnoreCase) {
		return ch; // step 1
	}

	var u = $toUpperCase(ch); // step 2

	if (u.length !== 1) {
		return ch; // step 3
	}

	var cu = u; // step 4

	if ($charCodeAt(ch, 0) >= 128 && $charCodeAt(cu, 0) < 128) {
		return ch; // step 5
	}

	return cu;
};

},{"call-bind/callBound":121,"es-errors/type":188}],132:[function(require,module,exports){
'use strict';

var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value) {
	return RequireObjectCoercible(value, arguments.length > 1 ? arguments[1] : void undefined);
};

},{"es-object-atoms/RequireObjectCoercible":190}],133:[function(require,module,exports){
'use strict';

var $EvalError = require('es-errors/eval');

var DayWithinYear = require('./DayWithinYear');
var InLeapYear = require('./InLeapYear');
var MonthFromTime = require('./MonthFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.5

module.exports = function DateFromTime(t) {
	var m = MonthFromTime(t);
	var d = DayWithinYear(t);
	if (m === 0) {
		return d + 1;
	}
	if (m === 1) {
		return d - 30;
	}
	var leap = InLeapYear(t);
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
};

},{"./DayWithinYear":136,"./InLeapYear":140,"./MonthFromTime":150,"es-errors/eval":183}],134:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":181,"./floor":171}],135:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":171}],136:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":134,"./DayFromYear":135,"./YearFromTime":169}],137:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DaysInYear(y) {
	if (modulo(y, 4) !== 0) {
		return 365;
	}
	if (modulo(y, 100) !== 0) {
		return 366;
	}
	if (modulo(y, 400) !== 0) {
		return 365;
	}
	return 366;
};

},{"./modulo":172}],138:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

var IsDataDescriptor = require('./IsDataDescriptor');
var IsAccessorDescriptor = require('./IsAccessorDescriptor');

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/5.1/#sec-8.10.4

module.exports = function FromPropertyDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return Desc;
	}

	if (!isPropertyDescriptor(Desc)) {
		throw new $TypeError('Assertion failed: `Desc` must be a Property Descriptor');
	}

	if (IsDataDescriptor(Desc)) {
		return {
			value: Desc['[[Value]]'],
			writable: !!Desc['[[Writable]]'],
			enumerable: !!Desc['[[Enumerable]]'],
			configurable: !!Desc['[[Configurable]]']
		};
	} else if (IsAccessorDescriptor(Desc)) {
		return {
			get: Desc['[[Get]]'],
			set: Desc['[[Set]]'],
			enumerable: !!Desc['[[Enumerable]]'],
			configurable: !!Desc['[[Configurable]]']
		};
	}
	throw new $TypeError('FromPropertyDescriptor must be called with a fully populated Property Descriptor');

};

},{"../helpers/records/property-descriptor":179,"./IsAccessorDescriptor":141,"./IsDataDescriptor":143,"es-errors/type":188}],139:[function(require,module,exports){
'use strict';

var floor = require('./floor');
var modulo = require('./modulo');

var timeConstants = require('../helpers/timeConstants');
var msPerHour = timeConstants.msPerHour;
var HoursPerDay = timeConstants.HoursPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function HourFromTime(t) {
	return modulo(floor(t / msPerHour), HoursPerDay);
};

},{"../helpers/timeConstants":181,"./floor":171,"./modulo":172}],140:[function(require,module,exports){
'use strict';

var $EvalError = require('es-errors/eval');

var DaysInYear = require('./DaysInYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function InLeapYear(t) {
	var days = DaysInYear(YearFromTime(t));
	if (days === 365) {
		return 0;
	}
	if (days === 366) {
		return 1;
	}
	throw new $EvalError('Assertion failed: there are not 365 or 366 days in a year, got: ' + days);
};

},{"./DaysInYear":137,"./YearFromTime":169,"es-errors/eval":183}],141:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

var hasOwn = require('hasown');

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/5.1/#sec-8.10.1

module.exports = function IsAccessorDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	if (!isPropertyDescriptor(Desc)) {
		throw new $TypeError('Assertion failed: `Desc` must be a Property Descriptor');
	}

	if (!hasOwn(Desc, '[[Get]]') && !hasOwn(Desc, '[[Set]]')) {
		return false;
	}

	return true;
};

},{"../helpers/records/property-descriptor":179,"es-errors/type":188,"hasown":206}],142:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":209}],143:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

var hasOwn = require('hasown');

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/5.1/#sec-8.10.2

module.exports = function IsDataDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	if (!isPropertyDescriptor(Desc)) {
		throw new $TypeError('Assertion failed: `Desc` must be a Property Descriptor');
	}

	if (!hasOwn(Desc, '[[Value]]') && !hasOwn(Desc, '[[Writable]]')) {
		return false;
	}

	return true;
};

},{"../helpers/records/property-descriptor":179,"es-errors/type":188,"hasown":206}],144:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

var IsAccessorDescriptor = require('./IsAccessorDescriptor');
var IsDataDescriptor = require('./IsDataDescriptor');

var isPropertyDescriptor = require('./IsPropertyDescriptor');

// https://262.ecma-international.org/5.1/#sec-8.10.3

module.exports = function IsGenericDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	if (!isPropertyDescriptor(Desc)) {
		throw new $TypeError('Assertion failed: `Desc` must be a Property Descriptor');
	}

	if (!IsAccessorDescriptor(Desc) && !IsDataDescriptor(Desc)) {
		return true;
	}

	return false;
};

},{"./IsAccessorDescriptor":141,"./IsDataDescriptor":143,"./IsPropertyDescriptor":145,"es-errors/type":188}],145:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor(Desc);
};

},{"../helpers/records/property-descriptor":179}],146:[function(require,module,exports){
'use strict';

var $isFinite = require('../helpers/isFinite');
var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.13

module.exports = function MakeDate(day, time) {
	if (!$isFinite(day) || !$isFinite(time)) {
		return NaN;
	}
	return (day * msPerDay) + time;
};

},{"../helpers/isFinite":175,"../helpers/timeConstants":181}],147:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $DateUTC = GetIntrinsic('%Date.UTC%');

var $isFinite = require('../helpers/isFinite');

var DateFromTime = require('./DateFromTime');
var Day = require('./Day');
var floor = require('./floor');
var modulo = require('./modulo');
var MonthFromTime = require('./MonthFromTime');
var ToInteger = require('./ToInteger');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.12

module.exports = function MakeDay(year, month, date) {
	if (!$isFinite(year) || !$isFinite(month) || !$isFinite(date)) {
		return NaN;
	}
	var y = ToInteger(year);
	var m = ToInteger(month);
	var dt = ToInteger(date);
	var ym = y + floor(m / 12);
	var mn = modulo(m, 12);
	var t = $DateUTC(ym, mn, 1);
	if (YearFromTime(t) !== ym || MonthFromTime(t) !== mn || DateFromTime(t) !== 1) {
		return NaN;
	}
	return Day(t) + dt - 1;
};

},{"../helpers/isFinite":175,"./DateFromTime":133,"./Day":134,"./MonthFromTime":150,"./ToInteger":159,"./YearFromTime":169,"./floor":171,"./modulo":172,"get-intrinsic":198}],148:[function(require,module,exports){
'use strict';

var $isFinite = require('../helpers/isFinite');
var timeConstants = require('../helpers/timeConstants');
var msPerSecond = timeConstants.msPerSecond;
var msPerMinute = timeConstants.msPerMinute;
var msPerHour = timeConstants.msPerHour;

var ToInteger = require('./ToInteger');

// https://262.ecma-international.org/5.1/#sec-15.9.1.11

module.exports = function MakeTime(hour, min, sec, ms) {
	if (!$isFinite(hour) || !$isFinite(min) || !$isFinite(sec) || !$isFinite(ms)) {
		return NaN;
	}
	var h = ToInteger(hour);
	var m = ToInteger(min);
	var s = ToInteger(sec);
	var milli = ToInteger(ms);
	var t = (h * msPerHour) + (m * msPerMinute) + (s * msPerSecond) + milli;
	return t;
};

},{"../helpers/isFinite":175,"../helpers/timeConstants":181,"./ToInteger":159}],149:[function(require,module,exports){
'use strict';

var floor = require('./floor');
var modulo = require('./modulo');

var timeConstants = require('../helpers/timeConstants');
var msPerMinute = timeConstants.msPerMinute;
var MinutesPerHour = timeConstants.MinutesPerHour;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function MinFromTime(t) {
	return modulo(floor(t / msPerMinute), MinutesPerHour);
};

},{"../helpers/timeConstants":181,"./floor":171,"./modulo":172}],150:[function(require,module,exports){
'use strict';

var DayWithinYear = require('./DayWithinYear');
var InLeapYear = require('./InLeapYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function MonthFromTime(t) {
	var day = DayWithinYear(t);
	if (0 <= day && day < 31) {
		return 0;
	}
	var leap = InLeapYear(t);
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
};

},{"./DayWithinYear":136,"./InLeapYear":140}],151:[function(require,module,exports){
'use strict';

var $isNaN = require('../helpers/isNaN');

// http://262.ecma-international.org/5.1/#sec-9.12

module.exports = function SameValue(x, y) {
	if (x === y) { // 0 === -0, but they are not identical.
		if (x === 0) { return 1 / x === 1 / y; }
		return true;
	}
	return $isNaN(x) && $isNaN(y);
};

},{"../helpers/isNaN":176}],152:[function(require,module,exports){
'use strict';

var floor = require('./floor');
var modulo = require('./modulo');

var timeConstants = require('../helpers/timeConstants');
var msPerSecond = timeConstants.msPerSecond;
var SecondsPerMinute = timeConstants.SecondsPerMinute;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function SecFromTime(t) {
	return modulo(floor(t / msPerSecond), SecondsPerMinute);
};

},{"../helpers/timeConstants":181,"./floor":171,"./modulo":172}],153:[function(require,module,exports){
'use strict';

var Type = require('./Type');

// https://262.ecma-international.org/5.1/#sec-11.9.6

module.exports = function StrictEqualityComparison(x, y) {
	var xType = Type(x);
	var yType = Type(y);
	if (xType !== yType) {
		return false;
	}
	if (xType === 'Undefined' || xType === 'Null') {
		return true;
	}
	return x === y; // shortcut for steps 4-7
};

},{"./Type":167}],154:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Date = GetIntrinsic('%Date%');
var $Number = GetIntrinsic('%Number%');

var $isFinite = require('../helpers/isFinite');

var abs = require('./abs');
var ToNumber = require('./ToNumber');

// https://262.ecma-international.org/5.1/#sec-15.9.1.14

module.exports = function TimeClip(time) {
	if (!$isFinite(time) || abs(time) > 8.64e15) {
		return NaN;
	}
	return $Number(new $Date(ToNumber(time)));
};


},{"../helpers/isFinite":175,"./ToNumber":160,"./abs":170,"get-intrinsic":198}],155:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":181,"./DayFromYear":135}],156:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":181,"./modulo":172}],157:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],158:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":160}],159:[function(require,module,exports){
'use strict';

var abs = require('./abs');
var floor = require('./floor');
var ToNumber = require('./ToNumber');

var $isNaN = require('../helpers/isNaN');
var $isFinite = require('../helpers/isFinite');
var $sign = require('../helpers/sign');

// http://262.ecma-international.org/5.1/#sec-9.4

module.exports = function ToInteger(value) {
	var number = ToNumber(value);
	if ($isNaN(number)) { return 0; }
	if (number === 0 || !$isFinite(number)) { return number; }
	return $sign(number) * floor(abs(number));
};

},{"../helpers/isFinite":175,"../helpers/isNaN":176,"../helpers/sign":180,"./ToNumber":160,"./abs":170,"./floor":171}],160:[function(require,module,exports){
'use strict';

var ToPrimitive = require('./ToPrimitive');

var callBound = require('call-bind/callBound');

var $replace = callBound('String.prototype.replace');

var safeRegexTester = require('safe-regex-test');

var isNonDecimal = safeRegexTester(/^0[ob]|^[+-]0x/);

// http://262.ecma-international.org/5.1/#sec-9.3

module.exports = function ToNumber(value) {
	var prim = ToPrimitive(value, Number);
	if (typeof prim !== 'string') {
		return +prim; // eslint-disable-line no-implicit-coercion
	}

	var trimmed = $replace(
		prim,
		// eslint-disable-next-line no-control-regex
		/^[ \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u0085]+|[ \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u0085]+$/g,
		''
	);
	if (isNonDecimal(trimmed)) {
		return NaN;
	}

	return +trimmed; // eslint-disable-line no-implicit-coercion
};

},{"./ToPrimitive":162,"call-bind/callBound":121,"safe-regex-test":221}],161:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = require('es-object-atoms/ToObject');

},{"es-object-atoms/ToObject":191}],162:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":193}],163:[function(require,module,exports){
'use strict';

var hasOwn = require('hasown');

var $TypeError = require('es-errors/type');

var Type = require('./Type');
var ToBoolean = require('./ToBoolean');
var IsCallable = require('./IsCallable');

// https://262.ecma-international.org/5.1/#sec-8.10.5

module.exports = function ToPropertyDescriptor(Obj) {
	if (Type(Obj) !== 'Object') {
		throw new $TypeError('ToPropertyDescriptor requires an object');
	}

	var desc = {};
	if (hasOwn(Obj, 'enumerable')) {
		desc['[[Enumerable]]'] = ToBoolean(Obj.enumerable);
	}
	if (hasOwn(Obj, 'configurable')) {
		desc['[[Configurable]]'] = ToBoolean(Obj.configurable);
	}
	if (hasOwn(Obj, 'value')) {
		desc['[[Value]]'] = Obj.value;
	}
	if (hasOwn(Obj, 'writable')) {
		desc['[[Writable]]'] = ToBoolean(Obj.writable);
	}
	if (hasOwn(Obj, 'get')) {
		var getter = Obj.get;
		if (typeof getter !== 'undefined' && !IsCallable(getter)) {
			throw new $TypeError('getter must be a function');
		}
		desc['[[Get]]'] = getter;
	}
	if (hasOwn(Obj, 'set')) {
		var setter = Obj.set;
		if (typeof setter !== 'undefined' && !IsCallable(setter)) {
			throw new $TypeError('setter must be a function');
		}
		desc['[[Set]]'] = setter;
	}

	if ((hasOwn(desc, '[[Get]]') || hasOwn(desc, '[[Set]]')) && (hasOwn(desc, '[[Value]]') || hasOwn(desc, '[[Writable]]'))) {
		throw new $TypeError('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
	}
	return desc;
};

},{"./IsCallable":142,"./ToBoolean":157,"./Type":167,"es-errors/type":188,"hasown":206}],164:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":198}],165:[function(require,module,exports){
'use strict';

var abs = require('./abs');
var floor = require('./floor');
var modulo = require('./modulo');
var ToNumber = require('./ToNumber');

var $isNaN = require('../helpers/isNaN');
var $isFinite = require('../helpers/isFinite');
var $sign = require('../helpers/sign');

// http://262.ecma-international.org/5.1/#sec-9.7

module.exports = function ToUint16(value) {
	var number = ToNumber(value);
	if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
	var posInt = $sign(number) * floor(abs(number));
	return modulo(posInt, 0x10000);
};

},{"../helpers/isFinite":175,"../helpers/isNaN":176,"../helpers/sign":180,"./ToNumber":160,"./abs":170,"./floor":171,"./modulo":172}],166:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":160}],167:[function(require,module,exports){
'use strict';

// https://262.ecma-international.org/5.1/#sec-8

module.exports = function Type(x) {
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
};

},{}],168:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":134,"./modulo":172}],169:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Date = GetIntrinsic('%Date%');

var callBound = require('call-bind/callBound');

var $getUTCFullYear = callBound('Date.prototype.getUTCFullYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function YearFromTime(t) {
	// largest y such that this.TimeFromYear(y) <= t
	return $getUTCFullYear(new $Date(t));
};

},{"call-bind/callBound":121,"get-intrinsic":198}],170:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":198}],171:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],172:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":178}],173:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":181,"./modulo":172}],174:[function(require,module,exports){
'use strict';

/* eslint global-require: 0 */

// https://es5.github.io/#x9
module.exports = {
	'Abstract Equality Comparison': require('./5/AbstractEqualityComparison'),
	'Abstract Relational Comparison': require('./5/AbstractRelationalComparison'),
	'Strict Equality Comparison': require('./5/StrictEqualityComparison'),
	abs: require('./5/abs'),
	Canonicalize: require('./5/Canonicalize'),
	CheckObjectCoercible: require('./5/CheckObjectCoercible'),
	DateFromTime: require('./5/DateFromTime'),
	Day: require('./5/Day'),
	DayFromYear: require('./5/DayFromYear'),
	DaysInYear: require('./5/DaysInYear'),
	DayWithinYear: require('./5/DayWithinYear'),
	floor: require('./5/floor'),
	FromPropertyDescriptor: require('./5/FromPropertyDescriptor'),
	HourFromTime: require('./5/HourFromTime'),
	InLeapYear: require('./5/InLeapYear'),
	IsAccessorDescriptor: require('./5/IsAccessorDescriptor'),
	IsCallable: require('./5/IsCallable'),
	IsDataDescriptor: require('./5/IsDataDescriptor'),
	IsGenericDescriptor: require('./5/IsGenericDescriptor'),
	IsPropertyDescriptor: require('./5/IsPropertyDescriptor'),
	MakeDate: require('./5/MakeDate'),
	MakeDay: require('./5/MakeDay'),
	MakeTime: require('./5/MakeTime'),
	MinFromTime: require('./5/MinFromTime'),
	modulo: require('./5/modulo'),
	MonthFromTime: require('./5/MonthFromTime'),
	msFromTime: require('./5/msFromTime'),
	SameValue: require('./5/SameValue'),
	SecFromTime: require('./5/SecFromTime'),
	TimeClip: require('./5/TimeClip'),
	TimeFromYear: require('./5/TimeFromYear'),
	TimeWithinDay: require('./5/TimeWithinDay'),
	ToBoolean: require('./5/ToBoolean'),
	ToInt32: require('./5/ToInt32'),
	ToInteger: require('./5/ToInteger'),
	ToNumber: require('./5/ToNumber'),
	ToObject: require('./5/ToObject'),
	ToPrimitive: require('./5/ToPrimitive'),
	ToPropertyDescriptor: require('./5/ToPropertyDescriptor'),
	ToString: require('./5/ToString'),
	ToUint16: require('./5/ToUint16'),
	ToUint32: require('./5/ToUint32'),
	Type: require('./5/Type'),
	WeekDay: require('./5/WeekDay'),
	YearFromTime: require('./5/YearFromTime')
};

},{"./5/AbstractEqualityComparison":129,"./5/AbstractRelationalComparison":130,"./5/Canonicalize":131,"./5/CheckObjectCoercible":132,"./5/DateFromTime":133,"./5/Day":134,"./5/DayFromYear":135,"./5/DayWithinYear":136,"./5/DaysInYear":137,"./5/FromPropertyDescriptor":138,"./5/HourFromTime":139,"./5/InLeapYear":140,"./5/IsAccessorDescriptor":141,"./5/IsCallable":142,"./5/IsDataDescriptor":143,"./5/IsGenericDescriptor":144,"./5/IsPropertyDescriptor":145,"./5/MakeDate":146,"./5/MakeDay":147,"./5/MakeTime":148,"./5/MinFromTime":149,"./5/MonthFromTime":150,"./5/SameValue":151,"./5/SecFromTime":152,"./5/StrictEqualityComparison":153,"./5/TimeClip":154,"./5/TimeFromYear":155,"./5/TimeWithinDay":156,"./5/ToBoolean":157,"./5/ToInt32":158,"./5/ToInteger":159,"./5/ToNumber":160,"./5/ToObject":161,"./5/ToPrimitive":162,"./5/ToPropertyDescriptor":163,"./5/ToString":164,"./5/ToUint16":165,"./5/ToUint32":166,"./5/Type":167,"./5/WeekDay":168,"./5/YearFromTime":169,"./5/abs":170,"./5/floor":171,"./5/modulo":172,"./5/msFromTime":173}],175:[function(require,module,exports){
'use strict';

var $isNaN = require('./isNaN');

module.exports = function (x) { return (typeof x === 'number' || typeof x === 'bigint') && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{"./isNaN":176}],176:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],177:[function(require,module,exports){
'use strict';

var $strSlice = require('call-bind/callBound')('String.prototype.slice');

module.exports = function isPrefixOf(prefix, string) {
	if (prefix === string) {
		return true;
	}
	if (prefix.length > string.length) {
		return false;
	}
	return $strSlice(string, 0, prefix.length) === prefix;
};

},{"call-bind/callBound":121}],178:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],179:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

var hasOwn = require('hasown');

var allowed = {
	__proto__: null,
	'[[Configurable]]': true,
	'[[Enumerable]]': true,
	'[[Get]]': true,
	'[[Set]]': true,
	'[[Value]]': true,
	'[[Writable]]': true
};

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function isPropertyDescriptor(Desc) {
	if (!Desc || typeof Desc !== 'object') {
		return false;
	}

	for (var key in Desc) { // eslint-disable-line
		if (hasOwn(Desc, key) && !allowed[key]) {
			return false;
		}
	}

	var isData = hasOwn(Desc, '[[Value]]') || hasOwn(Desc, '[[Writable]]');
	var IsAccessor = hasOwn(Desc, '[[Get]]') || hasOwn(Desc, '[[Set]]');
	if (isData && IsAccessor) {
		throw new $TypeError('Property Descriptors may not be both accessor and data descriptors');
	}
	return true;
};

},{"es-errors/type":188,"hasown":206}],180:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],181:[function(require,module,exports){
'use strict';

var HoursPerDay = 24;
var MinutesPerHour = 60;
var SecondsPerMinute = 60;
var msPerSecond = 1e3;
var msPerMinute = msPerSecond * SecondsPerMinute;
var msPerHour = msPerMinute * MinutesPerHour;
var msPerDay = 86400000;

module.exports = {
	HoursPerDay: HoursPerDay,
	MinutesPerHour: MinutesPerHour,
	SecondsPerMinute: SecondsPerMinute,
	msPerSecond: msPerSecond,
	msPerMinute: msPerMinute,
	msPerHour: msPerHour,
	msPerDay: msPerDay
};

},{}],182:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

/** @type {import('.')} */
var $defineProperty = GetIntrinsic('%Object.defineProperty%', true) || false;
if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = false;
	}
}

module.exports = $defineProperty;

},{"get-intrinsic":198}],183:[function(require,module,exports){
'use strict';

/** @type {import('./eval')} */
module.exports = EvalError;

},{}],184:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Error;

},{}],185:[function(require,module,exports){
'use strict';

/** @type {import('./range')} */
module.exports = RangeError;

},{}],186:[function(require,module,exports){
'use strict';

/** @type {import('./ref')} */
module.exports = ReferenceError;

},{}],187:[function(require,module,exports){
'use strict';

/** @type {import('./syntax')} */
module.exports = SyntaxError;

},{}],188:[function(require,module,exports){
'use strict';

/** @type {import('./type')} */
module.exports = TypeError;

},{}],189:[function(require,module,exports){
'use strict';

/** @type {import('./uri')} */
module.exports = URIError;

},{}],190:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

/** @type {import('./RequireObjectCoercible')} */
module.exports = function RequireObjectCoercible(value) {
	if (value == null) {
		throw new $TypeError((arguments.length > 0 && arguments[1]) || ('Cannot call method on ' + value));
	}
	return value;
};

},{"es-errors/type":188}],191:[function(require,module,exports){
'use strict';

var $Object = require('./');
var RequireObjectCoercible = require('./RequireObjectCoercible');

/** @type {import('./ToObject')} */
module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

},{"./":192,"./RequireObjectCoercible":190}],192:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Object;

},{}],193:[function(require,module,exports){
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

},{"./helpers/isPrimitive":194,"is-callable":209}],194:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],195:[function(require,module,exports){
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

},{"is-object":210,"merge-descriptors":212}],196:[function(require,module,exports){
'use strict';

/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var toStr = Object.prototype.toString;
var max = Math.max;
var funcType = '[object Function]';

var concatty = function concatty(a, b) {
    var arr = [];

    for (var i = 0; i < a.length; i += 1) {
        arr[i] = a[i];
    }
    for (var j = 0; j < b.length; j += 1) {
        arr[j + a.length] = b[j];
    }

    return arr;
};

var slicy = function slicy(arrLike, offset) {
    var arr = [];
    for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) {
        arr[j] = arrLike[i];
    }
    return arr;
};

var joiny = function (arr, joiner) {
    var str = '';
    for (var i = 0; i < arr.length; i += 1) {
        str += arr[i];
        if (i + 1 < arr.length) {
            str += joiner;
        }
    }
    return str;
};

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.apply(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slicy(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                concatty(args, arguments)
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        }
        return target.apply(
            that,
            concatty(args, arguments)
        );

    };

    var boundLength = max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs[i] = '$' + i;
    }

    bound = Function('binder', 'return function (' + joiny(boundArgs, ',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};

},{}],197:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":196}],198:[function(require,module,exports){
'use strict';

var undefined;

var $Error = require('es-errors');
var $EvalError = require('es-errors/eval');
var $RangeError = require('es-errors/range');
var $ReferenceError = require('es-errors/ref');
var $SyntaxError = require('es-errors/syntax');
var $TypeError = require('es-errors/type');
var $URIError = require('es-errors/uri');

var $Function = Function;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function (expressionSyntax) {
	try {
		return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
};

var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
	try {
		$gOPD({}, '');
	} catch (e) {
		$gOPD = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError = function () {
	throw new $TypeError();
};
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = require('has-symbols')();
var hasProto = require('has-proto')();

var getProto = Object.getPrototypeOf || (
	hasProto
		? function (x) { return x.__proto__; } // eslint-disable-line no-proto
		: null
);

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' || !getProto ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	__proto__: null,
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined,
	'%AsyncFromSyncIteratorPrototype%': undefined,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
	'%BigInt64Array%': typeof BigInt64Array === 'undefined' ? undefined : BigInt64Array,
	'%BigUint64Array%': typeof BigUint64Array === 'undefined' ? undefined : BigUint64Array,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': $Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': $EvalError,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
	'%Function%': $Function,
	'%GeneratorFunction%': needsEval,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined,
	'%Map%': typeof Map === 'undefined' ? undefined : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols || !getProto ? undefined : getProto(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': Object,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'%RangeError%': $RangeError,
	'%ReferenceError%': $ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols || !getProto ? undefined : getProto(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols && getProto ? getProto(''[Symbol.iterator]()) : undefined,
	'%Symbol%': hasSymbols ? Symbol : undefined,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'%URIError%': $URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet
};

if (getProto) {
	try {
		null.error; // eslint-disable-line no-unused-expressions
	} catch (e) {
		// https://github.com/tc39/proposal-shadowrealm/pull/384#issuecomment-1364264229
		var errorProto = getProto(getProto(e));
		INTRINSICS['%Error.prototype%'] = errorProto;
	}
}

var doEval = function doEval(name) {
	var value;
	if (name === '%AsyncFunction%') {
		value = getEvalledConstructor('async function () {}');
	} else if (name === '%GeneratorFunction%') {
		value = getEvalledConstructor('function* () {}');
	} else if (name === '%AsyncGeneratorFunction%') {
		value = getEvalledConstructor('async function* () {}');
	} else if (name === '%AsyncGenerator%') {
		var fn = doEval('%AsyncGeneratorFunction%');
		if (fn) {
			value = fn.prototype;
		}
	} else if (name === '%AsyncIteratorPrototype%') {
		var gen = doEval('%AsyncGenerator%');
		if (gen && getProto) {
			value = getProto(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
	__proto__: null,
	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	'%ArrayPrototype%': ['Array', 'prototype'],
	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	'%BooleanPrototype%': ['Boolean', 'prototype'],
	'%DataViewPrototype%': ['DataView', 'prototype'],
	'%DatePrototype%': ['Date', 'prototype'],
	'%ErrorPrototype%': ['Error', 'prototype'],
	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	'%FunctionPrototype%': ['Function', 'prototype'],
	'%Generator%': ['GeneratorFunction', 'prototype'],
	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	'%JSONParse%': ['JSON', 'parse'],
	'%JSONStringify%': ['JSON', 'stringify'],
	'%MapPrototype%': ['Map', 'prototype'],
	'%NumberPrototype%': ['Number', 'prototype'],
	'%ObjectPrototype%': ['Object', 'prototype'],
	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	'%PromisePrototype%': ['Promise', 'prototype'],
	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	'%Promise_all%': ['Promise', 'all'],
	'%Promise_reject%': ['Promise', 'reject'],
	'%Promise_resolve%': ['Promise', 'resolve'],
	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	'%RegExpPrototype%': ['RegExp', 'prototype'],
	'%SetPrototype%': ['Set', 'prototype'],
	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	'%StringPrototype%': ['String', 'prototype'],
	'%SymbolPrototype%': ['Symbol', 'prototype'],
	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	'%URIErrorPrototype%': ['URIError', 'prototype'],
	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
	'%WeakSetPrototype%': ['WeakSet', 'prototype']
};

var bind = require('function-bind');
var hasOwn = require('hasown');
var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);
var $exec = bind.call(Function.call, RegExp.prototype.exec);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var first = $strSlice(string, 0, 1);
	var last = $strSlice(string, -1);
	if (first === '%' && last !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
	} else if (last === '%' && first !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
	}
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var intrinsicName = name;
	var alias;
	if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
		alias = LEGACY_ALIASES[intrinsicName];
		intrinsicName = '%' + alias[0] + '%';
	}

	if (hasOwn(INTRINSICS, intrinsicName)) {
		var value = INTRINSICS[intrinsicName];
		if (value === needsEval) {
			value = doEval(intrinsicName);
		}
		if (typeof value === 'undefined' && !allowMissing) {
			throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}

		return {
			alias: alias,
			name: intrinsicName,
			value: value
		};
	}

	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new $TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new $TypeError('"allowMissing" argument must be a boolean');
	}

	if ($exec(/^%?[^%]*%?$/, name) === null) {
		throw new $SyntaxError('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
	}
	var parts = stringToPath(name);
	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

	var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
	var intrinsicRealName = intrinsic.name;
	var value = intrinsic.value;
	var skipFurtherCaching = false;

	var alias = intrinsic.alias;
	if (alias) {
		intrinsicBaseName = alias[0];
		$spliceApply(parts, $concat([0, 1], alias));
	}

	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
		var part = parts[i];
		var first = $strSlice(part, 0, 1);
		var last = $strSlice(part, -1);
		if (
			(
				(first === '"' || first === "'" || first === '`')
				|| (last === '"' || last === "'" || last === '`')
			)
			&& first !== last
		) {
			throw new $SyntaxError('property names with quotes must have matching quotes');
		}
		if (part === 'constructor' || !isOwn) {
			skipFurtherCaching = true;
		}

		intrinsicBaseName += '.' + part;
		intrinsicRealName = '%' + intrinsicBaseName + '%';

		if (hasOwn(INTRINSICS, intrinsicRealName)) {
			value = INTRINSICS[intrinsicRealName];
		} else if (value != null) {
			if (!(part in value)) {
				if (!allowMissing) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				return void undefined;
			}
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, part);
				isOwn = !!desc;

				// By convention, when a data property is converted to an accessor
				// property to emulate a data property that does not suffer from
				// the override mistake, that accessor's getter is marked with
				// an `originalValue` property. Here, when we detect this, we
				// uphold the illusion by pretending to see that original data
				// property, i.e., returning the value rather than the getter
				// itself.
				if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
					value = desc.get;
				} else {
					value = value[part];
				}
			} else {
				isOwn = hasOwn(value, part);
				value = value[part];
			}

			if (isOwn && !skipFurtherCaching) {
				INTRINSICS[intrinsicRealName] = value;
			}
		}
	}
	return value;
};

},{"es-errors":184,"es-errors/eval":183,"es-errors/range":185,"es-errors/ref":186,"es-errors/syntax":187,"es-errors/type":188,"es-errors/uri":189,"function-bind":197,"has-proto":201,"has-symbols":202,"hasown":206}],199:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);

if ($gOPD) {
	try {
		$gOPD([], 'length');
	} catch (e) {
		// IE 8 has a broken gOPD
		$gOPD = null;
	}
}

module.exports = $gOPD;

},{"get-intrinsic":198}],200:[function(require,module,exports){
'use strict';

var $defineProperty = require('es-define-property');

var hasPropertyDescriptors = function hasPropertyDescriptors() {
	return !!$defineProperty;
};

hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
	// node v0.6 has a bug where array lengths can be Set but not Defined
	if (!$defineProperty) {
		return null;
	}
	try {
		return $defineProperty([], 'length', { value: 1 }).length !== 1;
	} catch (e) {
		// In Firefox 4-22, defining length on an array throws an exception.
		return true;
	}
};

module.exports = hasPropertyDescriptors;

},{"es-define-property":182}],201:[function(require,module,exports){
'use strict';

var test = {
	__proto__: null,
	foo: {}
};

var $Object = Object;

/** @type {import('.')} */
module.exports = function hasProto() {
	// @ts-expect-error: TS errors on an inherited property for some reason
	return { __proto__: test }.foo === test.foo
		&& !(test instanceof $Object);
};

},{}],202:[function(require,module,exports){
'use strict';

var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = require('./shams');

module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};

},{"./shams":203}],203:[function(require,module,exports){
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
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
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

},{}],204:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":203}],205:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":197}],206:[function(require,module,exports){
'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);

},{"function-bind":197}],207:[function(require,module,exports){
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
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

},{}],208:[function(require,module,exports){
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

},{}],209:[function(require,module,exports){
'use strict';

var fnToStr = Function.prototype.toString;
var reflectApply = typeof Reflect === 'object' && Reflect !== null && Reflect.apply;
var badArrayLike;
var isCallableMarker;
if (typeof reflectApply === 'function' && typeof Object.defineProperty === 'function') {
	try {
		badArrayLike = Object.defineProperty({}, 'length', {
			get: function () {
				throw isCallableMarker;
			}
		});
		isCallableMarker = {};
		// eslint-disable-next-line no-throw-literal
		reflectApply(function () { throw 42; }, null, badArrayLike);
	} catch (_) {
		if (_ !== isCallableMarker) {
			reflectApply = null;
		}
	}
} else {
	reflectApply = null;
}

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
var objectClass = '[object Object]';
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var ddaClass = '[object HTMLAllCollection]'; // IE 11
var ddaClass2 = '[object HTML document.all class]';
var ddaClass3 = '[object HTMLCollection]'; // IE 9-10
var hasToStringTag = typeof Symbol === 'function' && !!Symbol.toStringTag; // better: use `has-tostringtag`

var isIE68 = !(0 in [,]); // eslint-disable-line no-sparse-arrays, comma-spacing

var isDDA = function isDocumentDotAll() { return false; };
if (typeof document === 'object') {
	// Firefox 3 canonicalizes DDA to undefined when it's not accessed directly
	var all = document.all;
	if (toStr.call(all) === toStr.call(document.all)) {
		isDDA = function isDocumentDotAll(value) {
			/* globals document: false */
			// in IE 6-8, typeof document.all is "object" and it's truthy
			if ((isIE68 || !value) && (typeof value === 'undefined' || typeof value === 'object')) {
				try {
					var str = toStr.call(value);
					return (
						str === ddaClass
						|| str === ddaClass2
						|| str === ddaClass3 // opera 12.16
						|| str === objectClass // IE 6-8
					) && value('') == null; // eslint-disable-line eqeqeq
				} catch (e) { /**/ }
			}
			return false;
		};
	}
}

module.exports = reflectApply
	? function isCallable(value) {
		if (isDDA(value)) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		try {
			reflectApply(value, null, badArrayLike);
		} catch (e) {
			if (e !== isCallableMarker) { return false; }
		}
		return !isES6ClassFn(value) && tryFunctionObject(value);
	}
	: function isCallable(value) {
		if (isDDA(value)) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (hasToStringTag) { return tryFunctionObject(value); }
		if (isES6ClassFn(value)) { return false; }
		var strClass = toStr.call(value);
		if (strClass !== fnClass && strClass !== genClass && !(/^\[object HTML/).test(strClass)) { return false; }
		return tryFunctionObject(value);
	};

},{}],210:[function(require,module,exports){
'use strict';

module.exports = function isObject(x) {
	return typeof x === 'object' && x !== null;
};

},{}],211:[function(require,module,exports){
'use strict';

var callBound = require('call-bind/callBound');
var hasToStringTag = require('has-tostringtag/shams')();
var has;
var $exec;
var isRegexMarker;
var badStringifier;

if (hasToStringTag) {
	has = callBound('Object.prototype.hasOwnProperty');
	$exec = callBound('RegExp.prototype.exec');
	isRegexMarker = {};

	var throwRegexMarker = function () {
		throw isRegexMarker;
	};
	badStringifier = {
		toString: throwRegexMarker,
		valueOf: throwRegexMarker
	};

	if (typeof Symbol.toPrimitive === 'symbol') {
		badStringifier[Symbol.toPrimitive] = throwRegexMarker;
	}
}

var $toString = callBound('Object.prototype.toString');
var gOPD = Object.getOwnPropertyDescriptor;
var regexClass = '[object RegExp]';

module.exports = hasToStringTag
	// eslint-disable-next-line consistent-return
	? function isRegex(value) {
		if (!value || typeof value !== 'object') {
			return false;
		}

		var descriptor = gOPD(value, 'lastIndex');
		var hasLastIndexDataProperty = descriptor && has(descriptor, 'value');
		if (!hasLastIndexDataProperty) {
			return false;
		}

		try {
			$exec(value, badStringifier);
		} catch (e) {
			return e === isRegexMarker;
		}
	}
	: function isRegex(value) {
		// In older browsers, typeof regex incorrectly returns 'function'
		if (!value || (typeof value !== 'object' && typeof value !== 'function')) {
			return false;
		}

		return $toString(value) === regexClass;
	};

},{"call-bind/callBound":121,"has-tostringtag/shams":204}],212:[function(require,module,exports){
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

},{}],213:[function(require,module,exports){
'use strict'

module.exports = function createNotFoundError (path) {
  var err = new Error('Cannot find module \'' + path + '\'')
  err.code = 'MODULE_NOT_FOUND'
  return err
}

},{}],214:[function(require,module,exports){
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

},{"./isArguments":216}],215:[function(require,module,exports){
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

},{"./implementation":214,"./isArguments":216}],216:[function(require,module,exports){
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

},{}],217:[function(require,module,exports){
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

},{}],218:[function(require,module,exports){
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

},{"fill-keys":195,"module-not-found-error":213}],219:[function(require,module,exports){
(function (process,setImmediate){(function (){
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

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":217,"through":234,"timers":235}],220:[function(require,module,exports){
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
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

SafeBuffer.prototype = Object.create(Buffer.prototype)

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

},{"buffer":103}],221:[function(require,module,exports){
'use strict';

var callBound = require('call-bind/callBound');
var isRegex = require('is-regex');

var $exec = callBound('RegExp.prototype.exec');
var $TypeError = require('es-errors/type');

module.exports = function regexTester(regex) {
	if (!isRegex(regex)) {
		throw new $TypeError('`regex` must be a RegExp');
	}
	return function test(s) {
		return $exec(regex, s) !== null;
	};
};

},{"call-bind/callBound":121,"es-errors/type":188,"is-regex":211}],222:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');
var define = require('define-data-property');
var hasDescriptors = require('has-property-descriptors')();
var gOPD = require('gopd');

var $TypeError = require('es-errors/type');
var $floor = GetIntrinsic('%Math.floor%');

/** @type {import('.')} */
module.exports = function setFunctionLength(fn, length) {
	if (typeof fn !== 'function') {
		throw new $TypeError('`fn` is not a function');
	}
	if (typeof length !== 'number' || length < 0 || length > 0xFFFFFFFF || $floor(length) !== length) {
		throw new $TypeError('`length` must be a positive 32-bit integer');
	}

	var loose = arguments.length > 2 && !!arguments[2];

	var functionLengthIsConfigurable = true;
	var functionLengthIsWritable = true;
	if ('length' in fn && gOPD) {
		var desc = gOPD(fn, 'length');
		if (desc && !desc.configurable) {
			functionLengthIsConfigurable = false;
		}
		if (desc && !desc.writable) {
			functionLengthIsWritable = false;
		}
	}

	if (functionLengthIsConfigurable || functionLengthIsWritable || !loose) {
		if (hasDescriptors) {
			define(/** @type {Parameters<define>[0]} */ (fn), 'length', length, true, true);
		} else {
			define(/** @type {Parameters<define>[0]} */ (fn), 'length', length);
		}
	}
	return fn;
};

},{"define-data-property":126,"es-errors/type":188,"get-intrinsic":198,"gopd":199,"has-property-descriptors":200}],223:[function(require,module,exports){
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

},{"es-abstract/es5":174,"function-bind":197}],224:[function(require,module,exports){
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

},{"./implementation":223,"./polyfill":225,"./shim":226,"define-properties":127,"function-bind":197}],225:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":223}],226:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":225,"define-properties":127}],227:[function(require,module,exports){
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
},{"safe-buffer":220}],228:[function(require,module,exports){
(function (process,setImmediate){(function (){
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

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"./lib/default_stream":229,"./lib/results":231,"./lib/test":232,"_process":217,"defined":128,"through":234,"timers":235}],229:[function(require,module,exports){
(function (process){(function (){
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

}).call(this)}).call(this,require('_process'))
},{"_process":217,"fs":102,"through":234}],230:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":217,"timers":235}],231:[function(require,module,exports){
(function (process,setImmediate){(function (){
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

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":217,"events":104,"function-bind":197,"has":205,"inherits":208,"object-inspect":233,"resumer":219,"through":234,"timers":235}],232:[function(require,module,exports){
(function (__dirname){(function (){
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


}).call(this)}).call(this,"/node_modules/tape/lib")
},{"./next_tick":230,"deep-equal":123,"defined":128,"events":104,"has":205,"inherits":208,"path":105,"string.prototype.trim":224}],233:[function(require,module,exports){
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

},{}],234:[function(require,module,exports){
(function (process){(function (){
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


}).call(this)}).call(this,require('_process'))
},{"_process":217,"stream":106}],235:[function(require,module,exports){
(function (setImmediate,clearImmediate){(function (){
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
}).call(this)}).call(this,require("timers").setImmediate,require("timers").clearImmediate)
},{"process/browser.js":217,"timers":235}],236:[function(require,module,exports){
(function (global){(function (){

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

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[47,48,49,50]);
