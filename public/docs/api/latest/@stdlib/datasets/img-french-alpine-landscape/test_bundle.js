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
* Returns an image of a French alpine landscape.
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

var data = '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YWN0SW5mbyByZGY6cGFyc2VUeXBlPSdSZXNvdXJjZSc+CiAgIDxJcHRjNHhtcENvcmU6Q2lBZHJDaXR5PkxvcyBBbmdlbGVzPC9JcHRjNHhtcENvcmU6Q2lBZHJDaXR5PgogICA8SXB0YzR4bXBDb3JlOkNpQWRyQ3RyeT5Vbml0ZWQgU3RhdGVzPC9JcHRjNHhtcENvcmU6Q2lBZHJDdHJ5PgogICA8SXB0YzR4bXBDb3JlOkNpQWRyRXh0YWRyPjEyMDAgR2V0dHkgQ2VudGVyIERyaXZlPC9JcHRjNHhtcENvcmU6Q2lBZHJFeHRhZHI+CiAgIDxJcHRjNHhtcENvcmU6Q2lBZHJQY29kZT45MDA0OTwvSXB0YzR4bXBDb3JlOkNpQWRyUGNvZGU+CiAgIDxJcHRjNHhtcENvcmU6Q2lBZHJSZWdpb24+Q2FsaWZvcm5pYTwvSXB0YzR4bXBDb3JlOkNpQWRyUmVnaW9uPgogICA8SXB0YzR4bXBDb3JlOkNpRW1haWxXb3JrPnJpZ2h0c0BnZXR0eS5lZHU8L0lwdGM0eG1wQ29yZTpDaUVtYWlsV29yaz4KICAgPElwdGM0eG1wQ29yZTpDaVVybFdvcms+d3d3LmdldHR5LmVkdTwvSXB0YzR4bXBDb3JlOkNpVXJsV29yaz4KICA8L0lwdGM0eG1wQ29yZTpDcmVhdG9yQ29udGFjdEluZm8+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOklwdGM0eG1wRXh0PSdodHRwOi8vaXB0Yy5vcmcvc3RkL0lwdGM0eG1wRXh0LzIwMDgtMDItMjkvJz4KICA8SXB0YzR4bXBFeHQ6QXJ0d29ya09yT2JqZWN0PgogICA8cmRmOkJhZz4KICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPgogICAgIDxJcHRjNHhtcEV4dDpBT0NyZWF0b3I+CiAgICAgIDxyZGY6U2VxPgogICAgICAgPHJkZjpsaT5BZG9scGhlIEJyYXVuPC9yZGY6bGk+CiAgICAgIDwvcmRmOlNlcT4KICAgICA8L0lwdGM0eG1wRXh0OkFPQ3JlYXRvcj4KICAgICA8SXB0YzR4bXBFeHQ6QU9Tb3VyY2U+VGhlIEouIFBhdWwgR2V0dHkgTXVzZXVtLCBMb3MgQW5nZWxlczwvSXB0YzR4bXBFeHQ6QU9Tb3VyY2U+CiAgICAgPElwdGM0eG1wRXh0OkFPU291cmNlSW52Tm8+ODUuWE0uMzY2LjExPC9JcHRjNHhtcEV4dDpBT1NvdXJjZUludk5vPgogICAgIDxJcHRjNHhtcEV4dDpBT1RpdGxlPgogICAgICA8cmRmOkFsdD4KICAgICAgIDxyZGY6bGkgeG1sOmxhbmc9J3gtZGVmYXVsdCc+W0FscGluZSBMYW5kc2NhcGVdPC9yZGY6bGk+CiAgICAgIDwvcmRmOkFsdD4KICAgICA8L0lwdGM0eG1wRXh0OkFPVGl0bGU+CiAgICA8L3JkZjpsaT4KICAgPC9yZGY6QmFnPgogIDwvSXB0YzR4bXBFeHQ6QXJ0d29ya09yT2JqZWN0PgogPC9yZGY6RGVzY3JpcHRpb24+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpkYz0naHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8nPgogIDxkYzpjcmVhdG9yPgogICA8cmRmOlNlcT4KICAgIDxyZGY6bGk+VGhlIEouIFBhdWwgR2V0dHkgTXVzZXVtPC9yZGY6bGk+CiAgIDwvcmRmOlNlcT4KICA8L2RjOmNyZWF0b3I+CiAgPGRjOmRlc2NyaXB0aW9uPgogICA8cmRmOkFsdD4KICAgIDxyZGY6bGkgeG1sOmxhbmc9J3gtZGVmYXVsdCc+W0FscGluZSBMYW5kc2NhcGVdOyBBZG9scGhlIEJyYXVuIChGcmVuY2gsIDE4MTEgLSAxODc3KTsgMTg2NSAtIDE4NzA7IENhcmJvbiBwcmludDsgMjIuMiB4IDQ2LjggY20gKDggMy80IHggMTggNy8xNiBpbi4pOyA4NS5YTS4zNjYuMTE8L3JkZjpsaT4KICAgPC9yZGY6QWx0PgogIDwvZGM6ZGVzY3JpcHRpb24+CiAgPGRjOnRpdGxlPgogICA8cmRmOkFsdD4KICAgIDxyZGY6bGkgeG1sOmxhbmc9J3gtZGVmYXVsdCc+W0FscGluZSBMYW5kc2NhcGVdPC9yZGY6bGk+CiAgIDwvcmRmOkFsdD4KICA8L2RjOnRpdGxlPgogPC9yZGY6RGVzY3JpcHRpb24+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpwaG90b3Nob3A9J2h0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8nPgogIDxwaG90b3Nob3A6U291cmNlPlRoZSBKLiBQYXVsIEdldHR5IE11c2V1bSwgTG9zIEFuZ2VsZXM8L3Bob3Rvc2hvcDpTb3VyY2U+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOnhtcD0naHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyc+CiAgPHhtcDpNZXRhZGF0YURhdGU+MjAxNi0wNC0xM1QxNjozNzowMTwveG1wOk1ldGFkYXRhRGF0ZT4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6eG1wUmlnaHRzPSdodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyc+CiAgPHhtcFJpZ2h0czpVc2FnZVRlcm1zPgogICA8cmRmOkFsdD4KICAgIDxyZGY6bGkgeG1sOmxhbmc9J3gtZGVmYXVsdCc+aHR0cDovL3d3dy5nZXR0eS5lZHUvbGVnYWwvaW1hZ2VfcmVxdWVzdC88L3JkZjpsaT4KICAgPC9yZGY6QWx0PgogIDwveG1wUmlnaHRzOlVzYWdlVGVybXM+CiA8L3JkZjpEZXNjcmlwdGlvbj4KPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0ndyc/Pv/bAEMAAgEBAQEBAgEBAQICAgICBAMCAgICBQQEAwQGBQYGBgUGBgYHCQgGBwkHBgYICwgJCgoKCgoGCAsMCwoMCQoKCv/bAEMBAgICAgICBQMDBQoHBgcKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCv/AABEIAeQEAAMBEQACEQEDEQH/xAAdAAABBQEBAQEAAAAAAAAAAAAEAgMFBgcBCAAJ/8QASRAAAgEDAwIFAgMGBAYBAgENAQIDBAURBhIhADEHEyJBURRhCDJxFSNCgZGhUrHB8AkWJDPR4WIlQ/EXcoImNFOSojVEY3PS/8QAGgEAAwEBAQEAAAAAAAAAAAAAAAECAwQFBv/EADcRAAICAgIBAwMBBgUEAwEBAAABAhEhMQMSQQQiURNhcTIFFIGRsfAjQqHB0SQz4fEVJVI0cv/aAAwDAQACEQMRAD8A8tGqlz6w7Z75br5qkexbCqWpnii2o2Aft26YBqSTTovmZJHGQPbpUAVG03m7SWCnGc/26VUA9FPIrZWQkA/lPRVAFxzCKYlI9pD5QZz75HSodj0M0iuw3EHuCO3z0qoLY61WY8PGcArwN3Q0FsVDUT1JOZBwMKxH9uihZHgx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';


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
* Returns an image of a French alpine landscape.
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/datasets/img-french-alpine-landscape/lib")
},{"@stdlib/fs/read-file":51,"path":105}],46:[function(require,module,exports){
module.exports={
  "name": "@stdlib/datasets/img-french-alpine-landscape",
  "version": "0.0.0",
  "description": "Image of a French alpine landscape.",
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
    "img-french-alpine-landscape": "./bin/cli"
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
    "landscape",
    "mountains",
    "alpine",
    "alps",
    "nature",
    "france",
    "french"
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/datasets/img-french-alpine-landscape/test/test.browser.js")
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/datasets/img-french-alpine-landscape/test/test.cli.js","/lib/node_modules/@stdlib/datasets/img-french-alpine-landscape/test")
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/datasets/img-french-alpine-landscape/test/test.js")
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/datasets/img-french-alpine-landscape/test/test.main.js")
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
