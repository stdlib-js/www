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

var hasFloat32ArraySupport = require( '@stdlib/assert/has-float32array-support' );
var builtin = require( './main.js' );
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

},{"./main.js":2,"./polyfill.js":3,"@stdlib/assert/has-float32array-support":8}],2:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var ctor = ( typeof Float32Array === 'function' ) ? Float32Array : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{}],3:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

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
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var hasUint32ArraySupport = require( '@stdlib/assert/has-uint32array-support' );
var builtin = require( './main.js' );
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

},{"./main.js":5,"./polyfill.js":6,"@stdlib/assert/has-uint32array-support":16}],5:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var ctor = ( typeof Uint32Array === 'function' ) ? Uint32Array : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

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

},{}],7:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var main = ( typeof Float32Array === 'function' ) ? Float32Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = main;

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
* Test for native `Float32Array` support.
*
* @module @stdlib/assert/has-float32array-support
*
* @example
* var hasFloat32ArraySupport = require( '@stdlib/assert/has-float32array-support' );
*
* var bool = hasFloat32ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasFloat32ArraySupport = require( './main.js' );


// EXPORTS //

module.exports = hasFloat32ArraySupport;

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

var isFloat32Array = require( '@stdlib/assert/is-float32array' );
var PINF = require( '@stdlib/constants/float64/pinf' );
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
			arr[ 3 ] === PINF
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasFloat32ArraySupport;

},{"./float32array.js":7,"@stdlib/assert/is-float32array":31,"@stdlib/constants/float64/pinf":48}],10:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],12:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],14:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":15}],15:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/has-symbol-support":12}],16:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Test for native `Uint32Array` support.
*
* @module @stdlib/assert/has-uint32array-support
*
* @example
* var hasUint32ArraySupport = require( '@stdlib/assert/has-uint32array-support' );
*
* var bool = hasUint32ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasUint32ArraySupport = require( './main.js' );


// EXPORTS //

module.exports = hasUint32ArraySupport;

},{"./main.js":17}],17:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var isUint32Array = require( '@stdlib/assert/is-uint32array' );
var UINT32_MAX = require( '@stdlib/constants/uint32/max' );
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

},{"./uint32array.js":18,"@stdlib/assert/is-uint32array":37,"@stdlib/constants/uint32/max":49}],18:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var main = ( typeof Uint32Array === 'function' ) ? Uint32Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = main;

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

},{"@stdlib/utils/native-class":119}],21:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":22,"./object.js":23,"./primitive.js":24,"@stdlib/utils/define-nonenumerable-read-only-property":101}],22:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./object.js":23,"./primitive.js":24}],23:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./try2serialize.js":26,"@stdlib/assert/has-tostringtag-support":14,"@stdlib/boolean/ctor":41,"@stdlib/utils/native-class":119}],24:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// eslint-disable-next-line stdlib/no-redeclare
var toString = Boolean.prototype.toString; // non-generic


// EXPORTS //

module.exports = toString;

},{}],26:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./tostring.js":25}],27:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":28}],28:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/is-object-like":35}],29:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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

},{"@stdlib/utils/get-prototype-of":109,"@stdlib/utils/native-class":119}],31:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var isFloat32Array = require( './main.js' );


// EXPORTS //

module.exports = isFloat32Array;

},{"./main.js":32}],32:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var hasFloat32Array = ( typeof Float32Array === 'function' ); // eslint-disable-line stdlib/require-globals


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
	return (
		( hasFloat32Array && value instanceof Float32Array ) || // eslint-disable-line stdlib/require-globals
		nativeClass( value ) === '[object Float32Array]'
	);
}


// EXPORTS //

module.exports = isFloat32Array;

},{"@stdlib/utils/native-class":119}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":34}],34:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/type-of":130}],35:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":36,"@stdlib/assert/tools/array-function":39,"@stdlib/utils/define-nonenumerable-read-only-property":101}],36:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var isUint32Array = require( './main.js' );


// EXPORTS //

module.exports = isUint32Array;

},{"./main.js":38}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var hasUint32Array = ( typeof Uint32Array === 'function' ); // eslint-disable-line stdlib/require-globals


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
	return (
		( hasUint32Array && value instanceof Uint32Array ) || // eslint-disable-line stdlib/require-globals
		nativeClass( value ) === '[object Uint32Array]'
	);
}


// EXPORTS //

module.exports = isUint32Array;

},{"@stdlib/utils/native-class":119}],39:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":40}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/is-array":19,"@stdlib/string/format":94}],41:[function(require,module,exports){
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

},{"./main.js":42}],42:[function(require,module,exports){
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

},{}],43:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Difference between one and the smallest value greater than one that can be represented as a single-precision floating-point number.
*
* @module @stdlib/constants/float32/eps
* @type {number}
*
* @example
* var FLOAT32_EPSILON = require( '@stdlib/constants/float32/eps' );
* // returns 1.1920928955078125e-7
*/

// MODULES //

var float64ToFloat32 = require( '@stdlib/number/float64/base/to-float32' );


// MAIN //

/**
* Difference between one and the smallest value greater than one that can be represented as a single-precision floating-point number.
*
* ## Notes
*
* The difference is equal to
*
* ```tex
* \frac{1}{2^{23}}
* ```
*
* @constant
* @type {number}
* @default 1.1920928955078125e-7
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
* @see [Machine Epsilon]{@link https://en.wikipedia.org/wiki/Machine_epsilon}
*/
var FLOAT32_EPSILON = float64ToFloat32( 1.1920928955078125e-7 );


// EXPORTS //

module.exports = FLOAT32_EPSILON;

},{"@stdlib/number/float64/base/to-float32":76}],44:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2024 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* One fourth times the mathematical constant `π`.
*
* @module @stdlib/constants/float32/fourth-pi
* @type {number}
*
* @example
* var FLOAT32_FOURTH_PI = require( '@stdlib/constants/float32/fourth-pi' );
* // returns 7.853981852531433e-1
*/

// MODULES //

var float64ToFloat32 = require( '@stdlib/number/float64/base/to-float32' );


// MAIN //

/**
* One fourth times the mathematical constant `π`.
*
* @constant
* @type {number}
* @default 7.853981852531433e-1
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/Pi}
*/
var FLOAT32_FOURTH_PI = float64ToFloat32( 7.85398163397448309616e-1 );


// EXPORTS //

module.exports = FLOAT32_FOURTH_PI;

},{"@stdlib/number/float64/base/to-float32":76}],45:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2024 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* One half times the mathematical constant `π`.
*
* @module @stdlib/constants/float32/half-pi
* @type {number}
*
* @example
* var FLOAT32_HALF_PI = require( '@stdlib/constants/float32/half-pi' );
* // returns 1.5707963705062866
*/

// MODULES //

var float64ToFloat32 = require( '@stdlib/number/float64/base/to-float32' );


// MAIN //

/**
* One half times the mathematical constant `π`.
*
* @constant
* @type {number}
* @default 1.5707963705062866
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/Pi}
*/
var FLOAT32_HALF_PI = float64ToFloat32( 1.5707963267948966 );


// EXPORTS //

module.exports = FLOAT32_HALF_PI;

},{"@stdlib/number/float64/base/to-float32":76}],46:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Single-precision floating-point negative infinity.
*
* @module @stdlib/constants/float32/ninf
* @type {number}
*
* @example
* var FLOAT32_NINF = require( '@stdlib/constants/float32/ninf' );
* // returns -infinity
*/

// MODULES //

var Float32Array = require( '@stdlib/array/float32' );
var Uint32Array = require( '@stdlib/array/uint32' );


// VARIABLES //

var FLOAT32_VIEW = new Float32Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT32_VIEW.buffer );
var v;


// MAIN //

/**
* Single-precision floating-point negative infinity.
*
* ## Notes
*
* Single-precision floating-point negative infinity has the bit sequence
*
* ```binarystring
* 1 11111111 00000000000000000000000
* ```
*
* This bit sequence corresponds to the unsigned 32-bit integer `4286578688` and to the HEX value `0xff800000`.
*
* @constant
* @type {number}
* @default 0xff800000
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT32_NINF = 0xff800000;

// Set the ArrayBuffer bit sequence:
UINT32_VIEW[ 0 ] = FLOAT32_NINF;

v = FLOAT32_VIEW[ 0 ];


// EXPORTS //

module.exports = v;

},{"@stdlib/array/float32":1,"@stdlib/array/uint32":4}],47:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Single-precision floating-point positive infinity.
*
* @module @stdlib/constants/float32/pinf
* @type {number}
*
* @example
* var FLOAT32_PINF = require( '@stdlib/constants/float32/pinf' );
* // returns +infinity
*/

// MODULES //

var Float32Array = require( '@stdlib/array/float32' );
var Uint32Array = require( '@stdlib/array/uint32' );


// VARIABLES //

var FLOAT32_VIEW = new Float32Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT32_VIEW.buffer );
var v;


// MAIN //

/**
* Single-precision floating-point positive infinity.
*
* ## Notes
*
* Single-precision floating-point positive infinity has the bit sequence
*
* ```binarystring
* 0 11111111 00000000000000000000000
* ```
*
* This bit sequence corresponds to the unsigned 32-bit integer `2139095040` and to the HEX value `0x7f800000`.
*
* @constant
* @type {number}
* @default 0x7f800000
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT32_PINF = 0x7f800000;

// Set the ArrayBuffer bit sequence:
UINT32_VIEW[ 0 ] = FLOAT32_PINF;

v = FLOAT32_VIEW[ 0 ];


// EXPORTS //

module.exports = v;

},{"@stdlib/array/float32":1,"@stdlib/array/uint32":4}],48:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* @module @stdlib/constants/float64/pinf
* @type {number}
*
* @example
* var FLOAT64_PINF = require( '@stdlib/constants/float64/pinf' );
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

},{}],49:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Maximum unsigned 32-bit integer.
*
* @module @stdlib/constants/uint32/max
* @type {uinteger32}
*
* @example
* var UINT32_MAX = require( '@stdlib/constants/uint32/max' );
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

},{}],50:[function(require,module,exports){
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

/**
* Test if a single-precision floating-point numeric value is `NaN`.
*
* @module @stdlib/math/base/assert/is-nanf
*
* @example
* var isnanf = require( '@stdlib/math/base/assert/is-nanf' );
*
* var bool = isnanf( NaN );
* // returns true
*
* bool = isnanf( 7.0 );
* // returns false
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":51}],51:[function(require,module,exports){
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
* Tests if a single-precision floating-point numeric value is `NaN`.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is `NaN`
*
* @example
* var bool = isnanf( NaN );
* // returns true
*
* @example
* var bool = isnanf( 7.0 );
* // returns false
*/
function isnanf( x ) {
	return ( x !== x );
}


// EXPORTS //

module.exports = isnanf;

},{}],52:[function(require,module,exports){
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

/**
* Test if a single-precision floating-point numeric value is negative zero.
*
* @module @stdlib/math/base/assert/is-negative-zerof
*
* @example
* var isNegativeZerof = require( '@stdlib/math/base/assert/is-negative-zerof' );
*
* var bool = isNegativeZerof( -0.0 );
* // returns true
*
* bool = isNegativeZerof( 0.0 );
* // returns false
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":53}],53:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var NINF = require( '@stdlib/constants/float32/ninf' );


// MAIN //

/**
* Tests if a single-precision floating-point numeric value is negative zero.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is negative zero
*
* @example
* var bool = isNegativeZerof( -0.0 );
* // returns true
*
* @example
* var bool = isNegativeZerof( 0.0 );
* // returns false
*/
function isNegativeZerof( x ) {
	return (x === 0.0 && 1.0/x === NINF);
}


// EXPORTS //

module.exports = isNegativeZerof;

},{"@stdlib/constants/float32/ninf":46}],54:[function(require,module,exports){
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

/**
* Test if a single-precision floating-point numeric value is positive zero.
*
* @module @stdlib/math/base/assert/is-positive-zerof
*
* @example
* var isPositiveZerof = require( '@stdlib/math/base/assert/is-positive-zerof' );
*
* var bool = isPositiveZerof( 0.0 );
* // returns true
*
* bool = isPositiveZerof( -0.0 );
* // returns false
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":55}],55:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var PINF = require( '@stdlib/constants/float32/pinf' );


// MAIN //

/**
* Tests if a single-precision floating-point numeric value is positive zero.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is positive zero
*
* @example
* var bool = isPositiveZerof( 0.0 );
* // returns true
*
* @example
* var bool = isPositiveZerof( -0.0 );
* // returns false
*/
function isPositiveZerof( x ) {
	return (x === 0.0 && 1.0/x === PINF);
}


// EXPORTS //

module.exports = isPositiveZerof;

},{"@stdlib/constants/float32/pinf":47}],56:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Compute an absolute value of a double-precision floating-point number.
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":57}],57:[function(require,module,exports){
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
* Computes the absolute value of a double-precision floating-point number `x`.
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
	return Math.abs( x ); // eslint-disable-line stdlib/no-builtin-math
}


// EXPORTS //

module.exports = abs;

},{}],58:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2024 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Compute the arctangent of a single-precision floating-point number.
*
* @module @stdlib/math/base/special/atanf
*
* @example
* var FLOAT32_PI = require( '@stdlib/constants/float32/pi' );
* var atanf = require( '@stdlib/math/base/special/atanf' );
*
* var v = atanf( 0.0 );
* // returns 0.0
*
* v = atanf( -FLOAT32_PI/4.0 );
* // returns ~-0.666
*
* v = atanf( FLOAT32_PI/4.0 );
* // returns ~0.666
*
* v = atanf( NaN );
* // returns NaN
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":59}],59:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2024 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*
* ## Notice
*
* The original C code, long comment, copyright, license, and constants are from [Cephes]{@link http://www.netlib.org/cephes}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright 1984, 1995, 2000 by Stephen L. Moshier
*
* Some software in this archive may be from the book _Methods and Programs for Mathematical Functions_ (Prentice-Hall or Simon & Schuster International, 1989) or from the Cephes Mathematical Library, a commercial product. In either event, it is copyrighted by the author. What you see here may be used freely but it comes with no support or guarantee.
*
* Stephen L. Moshier
* moshier@na-net.ornl.gov
* ```
*/

'use strict';

// MODULES //

var isnanf = require( '@stdlib/math/base/assert/is-nanf' );
var float64ToFloat32 = require( '@stdlib/number/float64/base/to-float32' );
var PI02F = require( '@stdlib/constants/float32/half-pi' );
var PI04F = require( '@stdlib/constants/float32/fourth-pi' );
var polyp = require( './poly_p.js' );


// MAIN //

/**
* Computes the arctangent of a single-precision floating-point number.
*
* ## Method
*
* -   Range reduction is from four intervals into the interval from zero to  tan( pi/8 ). A polynomial approximates the function in this basic interval.
*
* ## Notes
*
* -   Relative error:
*
*     | arithmetic | domain  | # trials | peak    | rms     |
*     |:-----------|:--------|:---------|:--------|:--------|
*     | IEEE       | -10, 10 | 10^5     | 1.9e-7  | 4.1e-8  |
*
* @param {number} x - input value
* @returns {number} arctangent (in radians)
*
* @example
* var v = atanf( 0.0 );
* // returns 0.0
*
* @example
* var FLOAT32_PI = require( '@stdlib/constants/float32/pi' );
*
* var v = atanf( -FLOAT32_PI/4.0 );
* // returns ~-0.666
*
* @example
* var FLOAT32_PI = require( '@stdlib/constants/float32/pi' );
*
* var v = atanf( FLOAT32_PI/4.0 );
* // returns ~0.666
*
* @example
* var v = atanf( NaN );
* // returns NaN
*/
function atanf( x ) {
	var sgn;
	var y;
	var z;

	if ( isnanf( x ) || x === 0.0 ) {
		return x;
	}
	x = float64ToFloat32( x );
	if ( x < 0.0 ) {
		sgn = -1;
		x = -x;
	} else {
		sgn = 1;
	}
	// Range reduction...
	if ( x > 2.414213562373095 ) { // tan(3*pi/8)
		y = PI02F;
		x = -float64ToFloat32( 1.0 / x );
	} else if ( x > 0.4142135623730950 ) { // tan(pi/8)
		y = PI04F;
		x = float64ToFloat32( float64ToFloat32( x - 1.0 ) / float64ToFloat32( x + 1.0 ) ); // eslint-disable-line max-len
	} else {
		y = 0.0;
	}
	z = float64ToFloat32( x * x );
	y = float64ToFloat32( y + float64ToFloat32( ( float64ToFloat32( polyp( z ) ) * float64ToFloat32( z * x ) ) + x ) ); // eslint-disable-line max-len
	if ( sgn < 0 ) {
		y = -y;
	}
	return y;
}


// EXPORTS //

module.exports = atanf;

},{"./poly_p.js":60,"@stdlib/constants/float32/fourth-pi":44,"@stdlib/constants/float32/half-pi":45,"@stdlib/math/base/assert/is-nanf":50,"@stdlib/number/float64/base/to-float32":76}],60:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2024 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

/* This is a generated file. Do not edit directly. */
'use strict';

// MODULES //

var float64ToFloat32 = require( '@stdlib/number/float64/base/to-float32' );


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
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return -0.3333294987678528;
	}
	return float64ToFloat32(-0.3333294987678528 + float64ToFloat32(x * float64ToFloat32(0.19977711141109467 + float64ToFloat32(x * float64ToFloat32(-0.13877685368061066 + float64ToFloat32(x * 0.08053744584321976)))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{"@stdlib/number/float64/base/to-float32":76}],61:[function(require,module,exports){
module.exports={"expected":[-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966,-1.5707963267948966],"x":[-1.0e20,-1.9920418525896414e25,-3.984073705179283e25,-5.976105557768924e25,-7.968137410358566e25,-9.960169262948207e25,-1.1952201115537847e26,-1.394423296812749e26,-1.593626482071713e26,-1.7928296673306773e26,-1.9920328525896412e26,-2.1912360378486055e26,-2.3904392231075697e26,-2.5896424083665336e26,-2.788845593625498e26,-2.988048778884462e26,-3.187251964143426e26,-3.3864551494023906e26,-3.5856583346613545e26,-3.7848615199203184e26,-3.984064705179283e26,-4.183267890438247e26,-4.382471075697211e26,-4.5816742609561754e26,-4.780877446215139e26,-4.980080631474103e26,-5.179283816733068e26,-5.378487001992032e26,-5.5776901872509956e26,-5.77689337250996e26,-5.976096557768924e26,-6.175299743027888e26,-6.374502928286853e26,-6.573706113545816e26,-6.77290929880478e26,-6.972112484063744e26,-7.171315669322708e26,-7.370518854581673e26,-7.569722039840637e26,-7.768925225099601e26,-7.968128410358565e26,-8.167331595617529e26,-8.366534780876493e26,-8.565737966135458e26,-8.764941151394422e26,-8.964144336653386e26,-9.16334752191235e26,-9.362550707171314e26,-9.561753892430279e26,-9.760957077689243e26,-9.960160262948207e26,-1.0159363448207171e27,-1.0358566633466135e27,-1.0557769818725099e27,-1.0756973003984064e27,-1.0956176189243028e27,-1.1155379374501992e27,-1.1354582559760956e27,-1.155378574501992e27,-1.1752988930278883e27,-1.1952192115537849e27,-1.2151395300796813e27,-1.2350598486055777e27,-1.2549801671314742e27,-1.2749004856573704e27,-1.294820804183267e27,-1.3147411227091632e27,-1.3346614412350597e27,-1.354581759760956e27,-1.3745020782868525e27,-1.394422396812749e27,-1.4143427153386453e27,-1.4342630338645418e27,-1.454183352390438e27,-1.4741036709163346e27,-1.4940239894422311e27,-1.5139443079681274e27,-1.533864626494024e27,-1.5537849450199202e27,-1.5737052635458167e27,-1.593625582071713e27,-1.6135459005976095e27,-1.633466219123506e27,-1.6533865376494023e27,-1.6733068561752988e27,-1.693227174701195e27,-1.7131474932270916e27,-1.733067811752988e27,-1.7529881302788844e27,-1.772908448804781e27,-1.792828767330677e27,-1.8127490858565737e27,-1.83266940438247e27,-1.8525897229083664e27,-1.872510041434263e27,-1.8924303599601592e27,-1.9123506784860558e27,-1.932270997011952e27,-1.9521913155378485e27,-1.972111634063745e27,-1.9920319525896413e27,-2.0119522711155378e27,-2.031872589641434e27,-2.0517929081673306e27,-2.071713226693227e27,-2.0916335452191234e27,-2.11155386374502e27,-2.1314741822709162e27,-2.1513945007968127e27,-2.171314819322709e27,-2.1912351378486055e27,-2.211155456374502e27,-2.2310757749003983e27,-2.2509960934262948e27,-2.270916411952191e27,-2.2908367304780876e27,-2.3107570490039838e27,-2.3306773675298804e27,-2.350597686055777e27,-2.3705180045816731e27,-2.3904383231075697e27,-2.410358641633466e27,-2.4302789601593625e27,-2.450199278685259e27,-2.4701195972111552e27,-2.4900399157370515e27,-2.509960234262948e27,-2.5298805527888445e27,-2.549800871314741e27,-2.5697211898406376e27,-2.5896415083665336e27,-2.60956182689243e27,-2.6294821454183266e27,-2.649402463944223e27,-2.669322782470119e27,-2.6892431009960157e27,-2.709163419521912e27,-2.7290837380478087e27,-2.749004056573705e27,-2.768924375099601e27,-2.788844693625498e27,-2.8087650121513943e27,-2.828685330677291e27,-2.8486056492031873e27,-2.8685259677290833e27,-2.88844628625498e27,-2.9083666047808764e27,-2.928286923306773e27,-2.9482072418326694e27,-2.9681275603585654e27,-2.988047878884462e27,-3.0079681974103585e27,-3.027888515936255e27,-3.0478088344621515e27,-3.0677291529880475e27,-3.087649471513944e27,-3.1075697900398405e27,-3.127490108565737e27,-3.1474104270916336e27,-3.1673307456175296e27,-3.187251064143426e27,-3.2071713826693226e27,-3.227091701195219e27,-3.247012019721115e27,-3.2669323382470117e27,-3.286852656772908e27,-3.306772975298805e27,-3.326693293824701e27,-3.346613612350597e27,-3.366533930876494e27,-3.3864542494023903e27,-3.406374567928287e27,-3.4262948864541833e27,-3.4462152049800793e27,-3.466135523505976e27,-3.4860558420318724e27,-3.505976160557769e27,-3.5258964790836654e27,-3.5458167976095614e27,-3.565737116135458e27,-3.5856574346613545e27,-3.605577753187251e27,-3.6254980717131475e27,-3.6454183902390435e27,-3.66533870876494e27,-3.6852590272908366e27,-3.705179345816733e27,-3.725099664342629e27,-3.7450199828685256e27,-3.764940301394422e27,-3.7848606199203186e27,-3.804780938446215e27,-3.824701256972111e27,-3.8446215754980077e27,-3.864541894023904e27,-3.884462212549801e27,-3.904382531075697e27,-3.924302849601593e27,-3.94422316812749e27,-3.9641434866533863e27,-3.984063805179283e27,-4.0039841237051794e27,-4.0239044422310753e27,-4.043824760756972e27,-4.0637450792828684e27,-4.083665397808765e27,-4.1035857163346614e27,-4.1235060348605574e27,-4.143426353386454e27,-4.1633466719123505e27,-4.183266990438247e27,-4.203187308964143e27,-4.2231076274900395e27,-4.243027946015936e27,-4.2629482645418326e27,-4.282868583067729e27,-4.302788901593625e27,-4.3227092201195216e27,-4.342629538645418e27,-4.3625498571713147e27,-4.382470175697211e27,-4.402390494223107e27,-4.4223108127490037e27,-4.4422311312749e27,-4.462151449800797e27,-4.482071768326693e27,-4.501992086852589e27,-4.521912405378486e27,-4.5418327239043823e27,-4.561753042430279e27,-4.5816733609561754e27,-4.6015936794820713e27,-4.621513998007968e27,-4.6414343165338644e27,-4.661354635059761e27,-4.6812749535856574e27,-4.7011952721115534e27,-4.72111559063745e27,-4.7410359091633465e27,-4.760956227689243e27,-4.780876546215139e27,-4.8007968647410355e27,-4.820717183266932e27,-4.8406375017928286e27,-4.860557820318725e27,-4.880478138844621e27,-4.9003984573705176e27,-4.920318775896414e27,-4.9402390944223107e27,-4.960159412948207e27,-4.980079731474103e27,-5.00000005e27,-5.019920368525896e27,-5.039840687051793e27,-5.059761005577689e27,-5.079681324103586e27,-5.099601642629482e27,-5.119521961155378e27,-5.139442279681274e27,-5.159362598207171e27,-5.179282916733067e27,-5.199203235258964e27,-5.21912355378486e27,-5.239043872310757e27,-5.258964190836653e27,-5.27888450936255e27,-5.298804827888447e27,-5.318725146414342e27,-5.338645464940238e27,-5.358565783466135e27,-5.378486101992032e27,-5.398406420517928e27,-5.418326739043825e27,-5.438247057569721e27,-5.458167376095618e27,-5.478087694621514e27,-5.49800801314741e27,-5.517928331673306e27,-5.537848650199203e27,-5.557768968725099e27,-5.577689287250996e27,-5.597609605776892e27,-5.617529924302789e27,-5.637450242828685e27,-5.657370561354582e27,-5.677290879880478e27,-5.697211198406374e27,-5.71713151693227e27,-5.737051835458167e27,-5.756972153984063e27,-5.77689247250996e27,-5.796812791035856e27,-5.816733109561753e27,-5.83665342808765e27,-5.856573746613546e27,-5.876494065139443e27,-5.896414383665338e27,-5.916334702191234e27,-5.936255020717131e27,-5.956175339243028e27,-5.976095657768924e27,-5.996015976294821e27,-6.015936294820717e27,-6.035856613346614e27,-6.05577693187251e27,-6.075697250398406e27,-6.095617568924302e27,-6.115537887450199e27,-6.135458205976095e27,-6.155378524501992e27,-6.175298843027888e27,-6.195219161553785e27,-6.215139480079681e27,-6.235059798605578e27,-6.254980117131474e27,-6.27490043565737e27,-6.294820754183266e27,-6.314741072709163e27,-6.334661391235059e27,-6.354581709760956e27,-6.374502028286852e27,-6.394422346812749e27,-6.414342665338645e27,-6.434262983864542e27,-6.454183302390439e27,-6.474103620916334e27,-6.49402393944223e27,-6.513944257968127e27,-6.533864576494024e27,-6.55378489501992e27,-6.573705213545817e27,-6.593625532071713e27,-6.61354585059761e27,-6.633466169123506e27,-6.653386487649402e27,-6.673306806175298e27,-6.693227124701195e27,-6.713147443227091e27,-6.733067761752988e27,-6.752988080278884e27,-6.772908398804781e27,-6.792828717330677e27,-6.812749035856574e27,-6.83266935438247e27,-6.852589672908366e27,-6.872509991434262e27,-6.892430309960159e27,-6.912350628486055e27,-6.932270947011952e27,-6.952191265537848e27,-6.972111584063745e27,-6.992031902589641e27,-7.011952221115538e27,-7.031872539641433e27,-7.05179285816733e27,-7.071713176693226e27,-7.091633495219123e27,-7.11155381374502e27,-7.131474132270916e27,-7.151394450796813e27,-7.171314769322709e27,-7.191235087848606e27,-7.211155406374502e27,-7.231075724900398e27,-7.250996043426294e27,-7.270916361952191e27,-7.290836680478087e27,-7.310756999003984e27,-7.33067731752988e27,-7.350597636055777e27,-7.370517954581673e27,-7.39043827310757e27,-7.410358591633466e27,-7.430278910159362e27,-7.450199228685258e27,-7.470119547211155e27,-7.490039865737051e27,-7.509960184262948e27,-7.529880502788844e27,-7.549800821314741e27,-7.569721139840637e27,-7.589641458366534e27,-7.609561776892429e27,-7.629482095418326e27,-7.649402413944222e27,-7.669322732470119e27,-7.689243050996016e27,-7.709163369521912e27,-7.729083688047809e27,-7.749004006573705e27,-7.768924325099602e27,-7.788844643625498e27,-7.808764962151394e27,-7.82868528067729e27,-7.848605599203187e27,-7.868525917729083e27,-7.88844623625498e27,-7.908366554780876e27,-7.928286873306773e27,-7.948207191832669e27,-7.968127510358566e27,-7.988047828884461e27,-8.007968147410358e27,-8.027888465936254e27,-8.047808784462151e27,-8.067729102988047e27,-8.087649421513944e27,-8.10756974003984e27,-8.127490058565737e27,-8.147410377091633e27,-8.16733069561753e27,-8.187251014143425e27,-8.207171332669322e27,-8.227091651195219e27,-8.247011969721115e27,-8.266932288247012e27,-8.286852606772908e27,-8.306772925298805e27,-8.326693243824701e27,-8.346613562350598e27,-8.366533880876494e27,-8.38645419940239e27,-8.406374517928286e27,-8.426294836454183e27,-8.446215154980079e27,-8.466135473505976e27,-8.486055792031872e27,-8.505976110557769e27,-8.525896429083665e27,-8.545816747609562e27,-8.565737066135457e27,-8.585657384661354e27,-8.60557770318725e27,-8.625498021713147e27,-8.645418340239043e27,-8.66533865876494e27,-8.685258977290836e27,-8.705179295816733e27,-8.72509961434263e27,-8.745019932868526e27,-8.764940251394421e27,-8.784860569920318e27,-8.804780888446215e27,-8.824701206972111e27,-8.844621525498008e27,-8.864541844023904e27,-8.884462162549801e27,-8.904382481075697e27,-8.924302799601594e27,-8.94422311812749e27,-8.964143436653386e27,-8.984063755179282e27,-9.003984073705179e27,-9.023904392231075e27,-9.043824710756972e27,-9.063745029282868e27,-9.083665347808765e27,-9.103585666334661e27,-9.123505984860558e27,-9.143426303386453e27,-9.16334662191235e27,-9.183266940438246e27,-9.203187258964143e27,-9.223107577490039e27,-9.243027896015936e27,-9.262948214541832e27,-9.282868533067729e27,-9.302788851593626e27,-9.322709170119522e27,-9.342629488645417e27,-9.362549807171314e27,-9.38247012569721e27,-9.402390444223107e27,-9.422310762749004e27,-9.4422310812749e27,-9.462151399800797e27,-9.482071718326693e27,-9.50199203685259e27,-9.521912355378485e27,-9.541832673904382e27,-9.561752992430278e27,-9.581673310956175e27,-9.601593629482071e27,-9.621513948007968e27,-9.641434266533864e27,-9.661354585059761e27,-9.681274903585657e27,-9.701195222111554e27,-9.721115540637449e27,-9.741035859163346e27,-9.760956177689242e27,-9.780876496215139e27,-9.800796814741035e27,-9.820717133266932e27,-9.840637451792828e27,-9.860557770318725e27,-9.880478088844622e27,-9.900398407370518e27,-9.920318725896413e27,-9.94023904442231e27,-9.960159362948207e27,-9.980079681474103e27,-1.0e28]}

},{}],62:[function(require,module,exports){
module.exports={"expected":[1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966,1.5707963267948966],"x":[1.0e30,1.9920418525896412e35,3.9840737051792825e35,5.976105557768924e35,7.968137410358565e35,9.960169262948207e35,1.1952201115537848e36,1.394423296812749e36,1.593626482071713e36,1.792829667330677e36,1.9920328525896415e36,2.1912360378486056e36,2.3904392231075697e36,2.5896424083665338e36,2.788845593625498e36,2.988048778884462e36,3.1872519641434263e36,3.38645514940239e36,3.5856583346613545e36,3.784861519920319e36,3.984064705179283e36,4.183267890438247e36,4.382471075697211e36,4.581674260956175e36,4.780877446215139e36,4.9800806314741035e36,5.179283816733068e36,5.378487001992032e36,5.577690187250995e36,5.77689337250996e36,5.976096557768924e36,6.175299743027889e36,6.374502928286853e36,6.573706113545816e36,6.77290929880478e36,6.972112484063745e36,7.171315669322709e36,7.370518854581673e36,7.569722039840637e36,7.768925225099601e36,7.968128410358566e36,8.16733159561753e36,8.366534780876493e36,8.565737966135458e36,8.764941151394422e36,8.964144336653386e36,9.163347521912351e36,9.362550707171314e36,9.561753892430278e36,9.760957077689243e36,9.960160262948207e36,1.0159363448207172e37,1.0358566633466135e37,1.0557769818725099e37,1.0756973003984064e37,1.0956176189243027e37,1.1155379374501992e37,1.1354582559760956e37,1.155378574501992e37,1.1752988930278884e37,1.1952192115537848e37,1.2151395300796813e37,1.2350598486055776e37,1.2549801671314742e37,1.2749004856573705e37,1.2948208041832668e37,1.3147411227091634e37,1.3346614412350597e37,1.354581759760956e37,1.3745020782868526e37,1.394422396812749e37,1.4143427153386455e37,1.4342630338645418e37,1.454183352390438e37,1.4741036709163347e37,1.494023989442231e37,1.5139443079681275e37,1.5338646264940239e37,1.5537849450199202e37,1.5737052635458167e37,1.593625582071713e37,1.6135459005976096e37,1.633466219123506e37,1.6533865376494023e37,1.6733068561752988e37,1.6932271747011951e37,1.7131474932270917e37,1.733067811752988e37,1.7529881302788843e37,1.772908448804781e37,1.7928287673306772e37,1.8127490858565738e37,1.83266940438247e37,1.8525897229083664e37,1.872510041434263e37,1.8924303599601593e37,1.9123506784860558e37,1.9322709970119522e37,1.9521913155378485e37,1.972111634063745e37,1.9920319525896414e37,2.011952271115538e37,2.0318725896414342e37,2.0517929081673306e37,2.071713226693227e37,2.0916335452191234e37,2.11155386374502e37,2.1314741822709163e37,2.1513945007968126e37,2.171314819322709e37,2.1912351378486057e37,2.211155456374502e37,2.2310757749003984e37,2.2509960934262947e37,2.270916411952191e37,2.290836730478088e37,2.310757049003984e37,2.3306773675298805e37,2.350597686055777e37,2.370518004581673e37,2.39043832310757e37,2.410358641633466e37,2.4302789601593625e37,2.450199278685259e37,2.470119597211155e37,2.490039915737052e37,2.5099602342629483e37,2.5298805527888446e37,2.549800871314741e37,2.5697211898406372e37,2.5896415083665336e37,2.6095618268924304e37,2.6294821454183267e37,2.649402463944223e37,2.6693227824701193e37,2.6892431009960156e37,2.7091634195219124e37,2.7290837380478088e37,2.749004056573705e37,2.7689243750996014e37,2.7888446936254977e37,2.8087650121513945e37,2.828685330677291e37,2.848605649203187e37,2.8685259677290835e37,2.88844628625498e37,2.9083666047808766e37,2.928286923306773e37,2.948207241832669e37,2.9681275603585656e37,2.988047878884462e37,3.0079681974103587e37,3.027888515936255e37,3.0478088344621513e37,3.0677291529880476e37,3.087649471513944e37,3.1075697900398407e37,3.127490108565737e37,3.1474104270916334e37,3.1673307456175297e37,3.187251064143426e37,3.207171382669323e37,3.227091701195219e37,3.2470120197211155e37,3.266932338247012e37,3.286852656772908e37,3.306772975298805e37,3.326693293824701e37,3.3466136123505975e37,3.366533930876494e37,3.38645424940239e37,3.406374567928287e37,3.4262948864541833e37,3.4462152049800796e37,3.466135523505976e37,3.4860558420318722e37,3.505976160557769e37,3.5258964790836654e37,3.5458167976095617e37,3.565737116135458e37,3.5856574346613543e37,3.605577753187251e37,3.6254980717131474e37,3.6454183902390438e37,3.66533870876494e37,3.6852590272908364e37,3.705179345816733e37,3.7250996643426295e37,3.745019982868526e37,3.764940301394422e37,3.7848606199203185e37,3.8047809384462153e37,3.8247012569721116e37,3.844621575498008e37,3.864541894023904e37,3.8844622125498005e37,3.9043825310756973e37,3.9243028496015937e37,3.94422316812749e37,3.9641434866533863e37,3.9840638051792826e37,4.0039841237051794e37,4.0239044422310757e37,4.043824760756972e37,4.0637450792828684e37,4.0836653978087647e37,4.1035857163346615e37,4.123506034860558e37,4.143426353386454e37,4.1633466719123505e37,4.183266990438247e37,4.2031873089641436e37,4.22310762749004e37,4.243027946015936e37,4.262948264541833e37,4.282868583067729e37,4.302788901593626e37,4.322709220119522e37,4.342629538645418e37,4.362549857171315e37,4.382470175697211e37,4.402390494223107e37,4.422310812749004e37,4.4422311312749e37,4.462151449800797e37,4.482071768326693e37,4.50199208685259e37,4.521912405378486e37,4.541832723904382e37,4.561753042430279e37,4.581673360956175e37,4.601593679482071e37,4.621513998007968e37,4.641434316533864e37,4.661354635059761e37,4.681274953585658e37,4.701195272111554e37,4.72111559063745e37,4.741035909163347e37,4.760956227689243e37,4.780876546215139e37,4.800796864741036e37,4.820717183266932e37,4.840637501792828e37,4.860557820318725e37,4.880478138844622e37,4.900398457370518e37,4.920318775896414e37,4.940239094422311e37,4.960159412948207e37,4.980079731474103e37,5.00000005e37,5.019920368525896e37,5.039840687051792e37,5.059761005577689e37,5.079681324103586e37,5.099601642629482e37,5.119521961155379e37,5.139442279681275e37,5.159362598207171e37,5.1792829167330675e37,5.199203235258964e37,5.21912355378486e37,5.2390438723107565e37,5.258964190836653e37,5.27888450936255e37,5.298804827888446e37,5.318725146414343e37,5.338645464940239e37,5.358565783466135e37,5.378486101992032e37,5.398406420517928e37,5.418326739043824e37,5.438247057569721e37,5.458167376095617e37,5.478087694621514e37,5.498008013147411e37,5.517928331673307e37,5.537848650199203e37,5.5577689687250995e37,5.577689287250996e37,5.597609605776892e37,5.617529924302788e37,5.637450242828685e37,5.657370561354581e37,5.677290879880478e37,5.697211198406375e37,5.717131516932271e37,5.737051835458167e37,5.756972153984064e37,5.77689247250996e37,5.796812791035856e37,5.816733109561753e37,5.836653428087649e37,5.856573746613545e37,5.8764940651394425e37,5.896414383665339e37,5.916334702191235e37,5.9362550207171315e37,5.956175339243028e37,5.976095657768924e37,5.99601597629482e37,6.015936294820717e37,6.035856613346613e37,6.055776931872509e37,6.075697250398407e37,6.095617568924303e37,6.115537887450199e37,6.135458205976096e37,6.155378524501992e37,6.175298843027888e37,6.195219161553785e37,6.215139480079681e37,6.235059798605577e37,6.254980117131474e37,6.274900435657371e37,6.294820754183267e37,6.314741072709163e37,6.33466139123506e37,6.354581709760956e37,6.374502028286852e37,6.394422346812749e37,6.414342665338645e37,6.434262983864541e37,6.454183302390438e37,6.474103620916335e37,6.494023939442231e37,6.513944257968128e37,6.533864576494024e37,6.55378489501992e37,6.573705213545817e37,6.593625532071713e37,6.613545850597609e37,6.633466169123506e37,6.653386487649402e37,6.673306806175299e37,6.693227124701195e37,6.713147443227092e37,6.733067761752988e37,6.752988080278884e37,6.772908398804781e37,6.792828717330677e37,6.812749035856573e37,6.83266935438247e37,6.852589672908366e37,6.872509991434262e37,6.89243030996016e37,6.912350628486056e37,6.932270947011952e37,6.952191265537849e37,6.972111584063745e37,6.992031902589641e37,7.0119522211155375e37,7.031872539641434e37,7.05179285816733e37,7.0717131766932265e37,7.091633495219124e37,7.11155381374502e37,7.131474132270916e37,7.151394450796813e37,7.171314769322709e37,7.191235087848605e37,7.211155406374502e37,7.231075724900398e37,7.250996043426294e37,7.270916361952191e37,7.290836680478088e37,7.310756999003984e37,7.330677317529881e37,7.350597636055777e37,7.370517954581673e37,7.3904382731075695e37,7.410358591633466e37,7.430278910159362e37,7.450199228685258e37,7.470119547211155e37,7.490039865737052e37,7.509960184262948e37,7.529880502788845e37,7.549800821314741e37,7.569721139840637e37,7.589641458366534e37,7.60956177689243e37,7.629482095418326e37,7.649402413944223e37,7.669322732470119e37,7.689243050996016e37,7.7091633695219125e37,7.729083688047809e37,7.749004006573705e37,7.7689243250996015e37,7.788844643625498e37,7.808764962151394e37,7.82868528067729e37,7.848605599203187e37,7.868525917729083e37,7.88844623625498e37,7.908366554780877e37,7.928286873306773e37,7.948207191832669e37,7.968127510358566e37,7.988047828884462e37,8.007968147410358e37,8.027888465936255e37,8.047808784462151e37,8.067729102988047e37,8.0876494215139445e37,8.107569740039841e37,8.127490058565737e37,8.147410377091633e37,8.16733069561753e37,8.187251014143426e37,8.207171332669322e37,8.227091651195219e37,8.247011969721115e37,8.266932288247011e37,8.286852606772909e37,8.306772925298805e37,8.326693243824701e37,8.346613562350598e37,8.366533880876494e37,8.38645419940239e37,8.406374517928287e37,8.426294836454183e37,8.446215154980079e37,8.466135473505976e37,8.486055792031872e37,8.505976110557769e37,8.525896429083664e37,8.545816747609562e37,8.565737066135457e37,8.585657384661354e37,8.605577703187252e37,8.625498021713147e37,8.645418340239044e37,8.66533865876494e37,8.685258977290837e37,8.705179295816732e37,8.72509961434263e37,8.745019932868525e37,8.764940251394422e37,8.784860569920318e37,8.804780888446215e37,8.824701206972112e37,8.844621525498008e37,8.864541844023905e37,8.8844621625498e37,8.904382481075697e37,8.924302799601593e37,8.94422311812749e37,8.964143436653385e37,8.984063755179283e37,9.00398407370518e37,9.023904392231075e37,9.043824710756973e37,9.063745029282868e37,9.083665347808765e37,9.10358566633466e37,9.123505984860558e37,9.143426303386453e37,9.16334662191235e37,9.183266940438246e37,9.203187258964143e37,9.22310757749004e37,9.243027896015936e37,9.262948214541833e37,9.282868533067728e37,9.302788851593626e37,9.322709170119521e37,9.342629488645418e37,9.362549807171314e37,9.382470125697211e37,9.402390444223108e37,9.422310762749004e37,9.4422310812749e37,9.462151399800796e37,9.482071718326694e37,9.501992036852589e37,9.521912355378486e37,9.541832673904382e37,9.561752992430279e37,9.581673310956174e37,9.601593629482071e37,9.621513948007969e37,9.641434266533864e37,9.661354585059761e37,9.681274903585657e37,9.701195222111554e37,9.72111554063745e37,9.741035859163347e37,9.760956177689242e37,9.78087649621514e37,9.800796814741037e37,9.820717133266932e37,9.84063745179283e37,9.860557770318725e37,9.880478088844622e37,9.900398407370517e37,9.920318725896414e37,9.94023904442231e37,9.960159362948207e37,9.980079681474103e37,1.0e38]}

},{}],63:[function(require,module,exports){
module.exports={"expected":[-1.2490457723982544,-1.2674114406038157,-1.2838486558828017,-1.298638369461895,-1.312010853533173,-1.3241563385084274,-1.3352331540021403,-1.3453740096828903,-1.3546908803160567,-1.3632788355274768,-1.3712190655600236,-1.3785812897116743,-1.385425687170635,-1.391804455586742,-1.3977630773904783,-1.403341355078251,-1.4085742626391276,-1.4134926497289835,-1.4181238271875496,-1.422492056380978,-1.4266189601565034,-1.4305238695648,-1.4342241176805643,-1.4377352896405224,-1.4410714362770427,-1.4442452573471392,-1.4472682592594281,-1.4501508913236898,-1.4529026638417402,-1.4555322507879145,-1.4580475793644783,-1.46045590833978,-1.4627638967678902,-1.4649776644343417,-1.467102845162831,-1.4691446339439547,-1.4711078287025148,-1.4729968673993112,-1.4748158610623348,-1.4765686232574027,-1.478258696436762,-1.4798893755437044,-1.4814637291999613,-1.482984618759049,-1.4844547154715377,-1.485876515976433,-1.487252356305596,-1.488584424564706,-1.489874772434089,-1.4911253256153043,-1.4923378933342963,-1.493514176998839,-1.494655778096616,-1.4957642054103752,-1.4968408816179386,-1.4978871493372903,-1.4989042766703218,-1.4998934622930016,-1.5008558401346093,-1.501792483684159,-1.5027044099581601,-1.5035925831603365,-1.5044579180608044,-1.5053012831194483,-1.506123503375772,-1.5069253631253139,-1.5077076084007721,-1.5084709492742387,-1.5092160619953967,-1.509943590979136,-1.5106541506548017,-1.5113483271881716,-1.5120266800862527,-1.5126897436940867,-1.5133380285919364,-1.5139720229004974,-1.5145921935011137,-1.5151989871773779,-1.5157928316839573,-1.5163741367479961,-1.516943295007997,-1.51750068289469,-1.5180466614580157,-1.5185815771440365,-1.5191057625252655,-1.519619536987641,-1.5201232073771171,-1.5206170686086078,-1.5211014042398199,-1.5215764870123074,-1.5220425793619121,-1.5224999339005911,-1.5229487938714823,-1.5233893935789247,-1.5238219587950281,-1.5242467071442671,-1.5246638484674735,-1.5250735851665005,-1.5254761125307474,-1.5258716190466461,-1.5262602866911372,-1.5266422912100936,-1.5270178023825847,-1.527386984271812,-1.5277499954634952,-1.5281069892924335,-1.5284581140579194,-1.5288035132286428,-1.529143325637674,-1.5294776856680843,-1.529806723429723,-1.5301305649276393,-1.5304493322226034,-1.530763143584159,-1.5310721136366072,-1.5313763534982996,-1.531675970914595,-1.5319710703848175,-1.532261753283521,-1.532548117976365,-1.5328302599308716,-1.5331082718223288,-1.5333822436350868,-1.533652262759477,-1.5339184140845754,-1.534180780087013,-1.5344394409160338,-1.5346944744749773,-1.5349459564993668,-1.5351939606317597,-1.5354385584935213,-1.535679819753666,-1.535917812194905,-1.5361526017770315,-1.536384252697768,-1.5366128274511939,-1.5368383868838646,-1.5370609902487269,-1.537280695256932,-1.537497558127642,-1.537711633635916,-1.5379229751587675,-1.5381316347194682,-1.5383376630301802,-1.5385411095329864,-1.5387420224393915,-1.5389404487683562,-1.5391364343829328,-1.5393300240255565,-1.5395212613520532,-1.5397101889644165,-1.5398968484424052,-1.540081280374012,-1.5402635243848486,-1.5404436191664925,-1.5406216025038384,-1.540797511301494,-1.5409713816092592,-1.541143248646726,-1.541313146827034,-1.541481109779815,-1.5416471703733579,-1.5418113607360286,-1.5419737122769666,-1.5421342557060944,-1.5422930210534618,-1.5424500376879515,-1.54260533433537,-1.5427589390959495,-1.54291087946128,-1.5430611823306952,-1.5432098740271318,-1.5433569803124825,-1.54350252640246,-1.5436465369809922,-1.543789036214164,-1.5439300477637221,-1.544069594800162,-1.544207700015406,-1.5443443856350945,-1.5444796734304973,-1.5446135847300642,-1.5447461404306226,-1.5448773610082405,-1.545007266528759,-1.5451358766580139,-1.5452632106717503,-1.545389287465246,-1.5455141255626503,-1.5456377431260488,-1.5457601579642655,-1.5458813875414075,-1.546001448985164,-1.5461203590948662,-1.5462381343493186,-1.5463547909144029,-1.5464703446504715,-1.5465848111195293,-1.5466982055922145,-1.546810543054585,-1.5469218382147156,-1.5470321055091123,-1.5471413591089502,-1.5472496129261406,-1.5473568806192315,-1.5474631755991481,-1.547568511034779,-1.5476728998584097,-1.5477763547710128,-1.5478788882473953,-1.547980512541209,-1.54808123968983,-1.5481810815191075,-1.54828004964799,-1.5483781554930287,-1.548475410272765,-1.5485718250120044,-1.5486674105459803,-1.5487621775244096,-1.5488561364154458,-1.5489492975095318,-1.5490416709231545,-1.5491332666025033,-1.5492240943270394,-1.5493141637129737,-1.5494034842166584,-1.5494920651378947,-1.549579915623159,-1.549667044668749,-1.5497534611238524,-1.549839173693542,-1.549924190941697,-1.550008521293853,-1.5500921730399848,-1.5501751543372213,-1.5502574732124945,-1.5503391375651283,-1.550420155169362,-1.5505005336768172,-1.5505802806189053,-1.5506594034091783,-1.5507379093456257,-1.550815805612916,-1.5508930992845884,-1.5509697973251928,-1.5510459065923803,-1.5511214338389456,-1.5511963857148245,-1.5512707687690441,-1.5513445894516285,-1.5514178541154633,-1.5514905690181175,-1.5515627403236232,-1.551634374104217,-1.5517054763420421,-1.5517760529308138,-1.5518461096774456,-1.5519156523036426,-1.551984686447457,-1.552053217664813,-1.552121251430995,-1.5521887931421061,-1.5522558481164936,-1.552322421596145,-1.5523885187480524,-1.5524541446655498,-1.5525193043696202,-1.5525840028101756,-1.5526482448673102,-1.5527120353525272,-1.5527753790099381,-1.5528382805174406,-1.5529007444878675,-1.5529627754701152,-1.5530243779502466,-1.5530855563525736,-1.5531463150407143,-1.5532066583186304,-1.553266590431644,-1.553326115567432,-1.5533852378570012,-1.5534439613756437,-1.553502290143873,-1.5535602281283414,-1.5536177792427377,-1.55367494734867,-1.5537317362565275,-1.553788149726328,-1.553844191468546,-1.553899865144927,-1.5539551743692852,-1.5540101227082836,-1.554064713682202,-1.5541189507656865,-1.5541728373884895,-1.554226376936189,-1.5542795727509002,-1.5543324281319686,-1.5543849463366535,-1.5544371305807958,-1.5544889840394747,-1.5545405098476512,-1.5545917111008,-1.554642590855529,-1.554693152130187,-1.5547433979054606,-1.5547933311249604,-1.5548429546957951,-1.5548922714891347,-1.554941284340766,-1.5549899960516336,-1.5550384093883758,-1.555086527083846,-1.5551343518376284,-1.5551818863165419,-1.5552291331551351,-1.555276094956175,-1.555322774291122,-1.555369173700601,-1.5554152956948621,-1.5554611427542324,-1.5555067173295607,-1.5555520218426546,-1.5555970586867087,-1.5556418302267263,-1.5556863387999333,-1.5557305867161846,-1.5557745762583635,-1.5558183096827745,-1.5558617892195283,-1.555905017072922,-1.55594799542181,-1.5559907264199717,-1.556033212196469,-1.556075454856002,-1.556117456479255,-1.556159219123239,-1.556200744821626,-1.5562420355850808,-1.5562830934015843,-1.5563239202367531,-1.556364518034152,-1.5564048887156041,-1.5564450341814917,-1.5564849563110568,-1.5565246569626927,-1.5565641379742328,-1.5566034011632337,-1.556642448327255,-1.5566812812441324,-1.5567199016722488,-1.556758311350798,-1.5567965120000467,-1.5568345053215917,-1.5568722929986112,-1.5569098766961147,-1.5569472580611863,-1.556984438723226,-1.5570214202941859,-1.5570582043688037,-1.5570947925248313,-1.5571311863232604,-1.5571673873085452,-1.5572033970088197,-1.5572392169361131,-1.5572748485865622,-1.557310293440618,-1.5573455529632523,-1.5573806286041587,-1.557415521797951,-1.5574502339643599,-1.5574847665084237,-1.5575191208206798,-1.5575532982773495,-1.5575873002405232,-1.5576211280583403,-1.5576547830651684,-1.557688266581777,-1.5577215799155122,-1.5577547243604655,-1.5577877011976418,-1.5578205116951243,-1.557853157108237,-1.557885638679705,-1.557917957639812,-1.5579501152065551,-1.5579821125857987,-1.5580139509714244,-1.5580456315454803,-1.5580771554783264,-1.5581085239287789,-1.5581397380442525,-1.5581707989609004,-1.5582017078037511,-1.5582324656868458,-1.5582630737133705,-1.558293532975789,-1.5583238445559728,-1.5583540095253288,-1.5583840289449253,-1.558413903865617,-1.5584436353281674,-1.5584732243633694,-1.5585026719921644,-1.5585319792257604,-1.5585611470657466,-1.558590176504208,-1.5586190685238386,-1.558647824098051,-1.5586764441910865,-1.5587049297581228,-1.5587332817453794,-1.558761501090224,-1.5587895887212742,-1.5588175455585,-1.5588453725133247,-1.5588730704887226,-1.5589006403793182,-1.5589280830714813,-1.5589553994434229,-1.5589825903652876,-1.5590096566992482,-1.5590365992995938,-1.5590634190128223,-1.5590901166777276,-1.5591166931254878,-1.5591431491797505,-1.559169485656719,-1.5591957033652357,-1.5592218031068643,-1.5592477856759723,-1.5592736518598116,-1.5592994024385975,-1.5593250381855872,-1.5593505598671575,-1.5593759682428812,-1.5594012640656019,-1.5594264480815088,-1.55945152103021,-1.5594764836448047,-1.559501336651955,-1.559526080771956,-1.5595507167188056,-1.559575245200273,-1.5595996669179666,-1.5596239825674012,-1.5596481928380634,-1.559672298413477,-1.5596962999712674,-1.559720198183225,-1.559743993715368,-1.5597676872280046,-1.5597912793757929,-1.559814770807802,-1.559838162167572,-1.559861454093172,-1.5598846472172578,-1.5599077421671304,-1.5599307395647914,-1.5599536400269993,-1.559976444165325,-1.5599991525862051,-1.560021765890997,-1.560044284676031,-1.5600667095326632,-1.5600890410473274,-1.560111279801585,-1.5601334263721776,-1.5601554813310747,-1.5601774452455246,-1.5601993186781018,-1.5602211021867558,-1.5602427963248584,-1.56026440164125,-1.5602859186802864,-1.5603073479818852,-1.560328690081569,-1.560349945510512,-1.5603711147955828,-1.5603921984593887,-1.560413197020318,-1.5604341109925832,-1.5604549408862625,-1.560475687207341,-1.5604963504577527,-1.5605169311354197,-1.5605374297342933,-1.560557846744393,-1.5605781826518448,-1.5605984379389215,-1.5606186130840793,-1.5606387085619964,-1.5606587248436092,-1.5606786623961506,-1.5606985216831846,-1.5607183031646437,-1.5607380072968637,-1.5607576345326188,-1.5607771853211565,-1.5607966601082315],"x":[-3.0,-3.19438877755511,-3.3887775551102206,-3.5831663326653307,-3.7775551102204408,-3.9719438877755513,-4.166332665330661,-4.3607214428857715,-4.5551102204408815,-4.749498997995992,-4.943887775551103,-5.138276553106213,-5.332665330661323,-5.527054108216433,-5.721442885771543,-5.915831663326653,-6.110220440881764,-6.304609218436874,-6.498997995991984,-6.693386773547094,-6.887775551102204,-7.082164328657314,-7.2765531062124245,-7.470941883767535,-7.6653306613226455,-7.859719438877756,-8.054108216432866,-8.248496993987976,-8.442885771543086,-8.637274549098196,-8.831663326653306,-9.026052104208416,-9.220440881763528,-9.414829659318638,-9.609218436873748,-9.803607214428858,-9.997995991983968,-10.192384769539078,-10.386773547094188,-10.581162324649299,-10.775551102204409,-10.969939879759519,-11.164328657314629,-11.358717434869739,-11.553106212424849,-11.74749498997996,-11.94188376753507,-12.136272545090181,-12.330661322645291,-12.525050100200401,-12.719438877755511,-12.913827655310621,-13.108216432865731,-13.302605210420841,-13.496993987975952,-13.691382765531062,-13.885771543086172,-14.080160320641282,-14.274549098196394,-14.468937875751504,-14.663326653306614,-14.857715430861724,-15.052104208416834,-15.246492985971944,-15.440881763527054,-15.635270541082164,-15.829659318637274,-16.024048096192384,-16.218436873747496,-16.412825651302605,-16.607214428857716,-16.801603206412825,-16.995991983967937,-17.190380761523045,-17.384769539078157,-17.579158316633265,-17.773547094188377,-17.96793587174349,-18.162324649298597,-18.35671342685371,-18.551102204408817,-18.74549098196393,-18.939879759519037,-19.13426853707415,-19.328657314629258,-19.52304609218437,-19.717434869739478,-19.91182364729459,-20.106212424849698,-20.30060120240481,-20.49498997995992,-20.68937875751503,-20.88376753507014,-21.07815631262525,-21.272545090180362,-21.46693386773547,-21.661322645290582,-21.85571142284569,-22.050100200400802,-22.24448897795591,-22.438877755511022,-22.63326653306613,-22.827655310621243,-23.022044088176354,-23.216432865731463,-23.410821643286575,-23.605210420841683,-23.799599198396795,-23.993987975951903,-24.188376753507015,-24.382765531062123,-24.577154308617235,-24.771543086172343,-24.965931863727455,-25.160320641282564,-25.354709418837675,-25.549098196392787,-25.743486973947896,-25.937875751503007,-26.132264529058116,-26.326653306613228,-26.521042084168336,-26.715430861723448,-26.909819639278556,-27.104208416833668,-27.298597194388776,-27.492985971943888,-27.687374749498996,-27.881763527054108,-28.07615230460922,-28.27054108216433,-28.46492985971944,-28.65931863727455,-28.85370741482966,-29.04809619238477,-29.24248496993988,-29.43687374749499,-29.6312625250501,-29.82565130260521,-30.02004008016032,-30.21442885771543,-30.40881763527054,-30.603206412825653,-30.79759519038076,-30.991983967935873,-31.18637274549098,-31.380761523046093,-31.5751503006012,-31.769539078156313,-31.96392785571142,-32.15831663326653,-32.35270541082164,-32.547094188376754,-32.741482965931866,-32.93587174348698,-33.13026052104208,-33.324649298597194,-33.519038076152306,-33.71342685370742,-33.90781563126252,-34.102204408817634,-34.296593186372746,-34.49098196392786,-34.68537074148296,-34.879759519038075,-35.07414829659319,-35.2685370741483,-35.46292585170341,-35.657314629258515,-35.85170340681363,-36.04609218436874,-36.24048096192385,-36.434869739478955,-36.62925851703407,-36.82364729458918,-37.01803607214429,-37.212424849699396,-37.40681362725451,-37.60120240480962,-37.79559118236473,-37.98997995991984,-38.18436873747495,-38.37875751503006,-38.57314629258517,-38.76753507014028,-38.96192384769539,-39.1563126252505,-39.35070140280561,-39.545090180360724,-39.73947895791583,-39.93386773547094,-40.12825651302605,-40.322645290581164,-40.517034068136276,-40.71142284569138,-40.90581162324649,-41.100200400801604,-41.294589178356716,-41.48897795591182,-41.68336673346693,-41.877755511022045,-42.07214428857716,-42.26653306613226,-42.46092184368737,-42.655310621242485,-42.8496993987976,-43.04408817635271,-43.23847695390781,-43.432865731462925,-43.62725450901804,-43.82164328657315,-44.016032064128254,-44.210420841683366,-44.40480961923848,-44.59919839679359,-44.793587174348694,-44.987975951903806,-45.18236472945892,-45.37675350701403,-45.57114228456914,-45.765531062124246,-45.95991983967936,-46.15430861723447,-46.34869739478958,-46.54308617234469,-46.7374749498998,-46.93186372745491,-47.12625250501002,-47.32064128256513,-47.51503006012024,-47.70941883767535,-47.90380761523046,-48.098196392785574,-48.29258517034068,-48.48697394789579,-48.6813627254509,-48.875751503006015,-49.07014028056112,-49.26452905811623,-49.45891783567134,-49.653306613226455,-49.84769539078156,-50.04208416833667,-50.236472945891784,-50.430861723446895,-50.62525050100201,-50.81963927855711,-51.014028056112224,-51.208416833667336,-51.40280561122245,-51.59719438877755,-51.791583166332664,-51.985971943887776,-52.18036072144289,-52.37474949899799,-52.569138276553105,-52.763527054108216,-52.95791583166333,-53.15230460921844,-53.346693386773545,-53.54108216432866,-53.73547094188377,-53.92985971943888,-54.124248496993985,-54.3186372745491,-54.51302605210421,-54.70741482965932,-54.901803607214426,-55.09619238476954,-55.29058116232465,-55.48496993987976,-55.67935871743487,-55.87374749498998,-56.06813627254509,-56.2625250501002,-56.45691382765531,-56.65130260521042,-56.84569138276553,-57.04008016032064,-57.234468937875754,-57.42885771543086,-57.62324649298597,-57.81763527054108,-58.012024048096194,-58.206412825651306,-58.40080160320641,-58.59519038076152,-58.789579158316634,-58.983967935871746,-59.17835671342685,-59.37274549098196,-59.567134268537075,-59.76152304609219,-59.95591182364729,-60.1503006012024,-60.344689378757515,-60.53907815631263,-60.73346693386774,-60.92785571142284,-61.122244488977955,-61.31663326653307,-61.51102204408818,-61.705410821643284,-61.899799599198396,-62.09418837675351,-62.28857715430862,-62.482965931863724,-62.677354709418836,-62.87174348697395,-63.06613226452906,-63.26052104208417,-63.454909819639276,-63.64929859719439,-63.8436873747495,-64.03807615230461,-64.23246492985972,-64.42685370741484,-64.62124248496994,-64.81563126252505,-65.01002004008016,-65.20440881763527,-65.39879759519039,-65.59318637274549,-65.7875751503006,-65.98196392785572,-66.17635270541082,-66.37074148296593,-66.56513026052104,-66.75951903807615,-66.95390781563127,-67.14829659318637,-67.34268537074148,-67.5370741482966,-67.7314629258517,-67.92585170340682,-68.12024048096193,-68.31462925851703,-68.50901803607215,-68.70340681362725,-68.89779559118236,-69.09218436873748,-69.28657314629258,-69.4809619238477,-69.6753507014028,-69.86973947895791,-70.06412825651303,-70.25851703406813,-70.45290581162325,-70.64729458917836,-70.84168336673346,-71.03607214428858,-71.23046092184369,-71.42484969939879,-71.61923847695391,-71.81362725450902,-72.00801603206413,-72.20240480961924,-72.39679358717434,-72.59118236472946,-72.78557114228457,-72.97995991983969,-73.17434869739479,-73.3687374749499,-73.56312625250501,-73.75751503006012,-73.95190380761522,-74.14629258517034,-74.34068136272545,-74.53507014028057,-74.72945891783567,-74.92384769539078,-75.1182364729459,-75.312625250501,-75.50701402805612,-75.70140280561122,-75.89579158316633,-76.09018036072145,-76.28456913827655,-76.47895791583166,-76.67334669338678,-76.86773547094188,-77.062124248497,-77.2565130260521,-77.45090180360721,-77.64529058116233,-77.83967935871743,-78.03406813627255,-78.22845691382766,-78.42284569138276,-78.61723446893788,-78.81162324649299,-79.00601202404809,-79.20040080160321,-79.39478957915831,-79.58917835671343,-79.78356713426854,-79.97795591182364,-80.17234468937876,-80.36673346693387,-80.56112224448898,-80.75551102204409,-80.9498997995992,-81.14428857715431,-81.33867735470942,-81.53306613226452,-81.72745490981964,-81.92184368737475,-82.11623246492987,-82.31062124248497,-82.50501002004007,-82.6993987975952,-82.8937875751503,-83.08817635270542,-83.28256513026052,-83.47695390781563,-83.67134268537075,-83.86573146292585,-84.06012024048096,-84.25450901803607,-84.44889779559118,-84.6432865731463,-84.8376753507014,-85.03206412825651,-85.22645290581163,-85.42084168336673,-85.61523046092185,-85.80961923847696,-86.00400801603206,-86.19839679358718,-86.39278557114228,-86.58717434869739,-86.78156312625251,-86.97595190380761,-87.17034068136273,-87.36472945891784,-87.55911823647294,-87.75350701402806,-87.94789579158316,-88.14228456913828,-88.33667334669339,-88.53106212424849,-88.72545090180361,-88.91983967935872,-89.11422845691382,-89.30861723446894,-89.50300601202404,-89.69739478957916,-89.89178356713427,-90.08617234468937,-90.28056112224449,-90.4749498997996,-90.66933867735472,-90.86372745490982,-91.05811623246493,-91.25250501002004,-91.44689378757515,-91.64128256513025,-91.83567134268537,-92.03006012024048,-92.2244488977956,-92.4188376753507,-92.6132264529058,-92.80761523046093,-93.00200400801603,-93.19639278557115,-93.39078156312625,-93.58517034068136,-93.77955911823648,-93.97394789579158,-94.16833667334669,-94.3627254509018,-94.55711422845691,-94.75150300601203,-94.94589178356713,-95.14028056112224,-95.33466933867736,-95.52905811623246,-95.72344689378758,-95.91783567134269,-96.11222444889779,-96.30661322645291,-96.50100200400801,-96.69539078156312,-96.88977955911824,-97.08416833667334,-97.27855711422846,-97.47294589178357,-97.66733466933867,-97.86172344689379,-98.0561122244489,-98.25050100200401,-98.44488977955912,-98.63927855711422,-98.83366733466934,-99.02805611222445,-99.22244488977955,-99.41683366733467,-99.61122244488978,-99.8056112224449,-100.0]}

},{}],64:[function(require,module,exports){
module.exports={"expected":[1.2490457723982544,1.2674114406038157,1.2838486558828017,1.298638369461895,1.312010853533173,1.3241563385084274,1.3352331540021403,1.3453740096828903,1.3546908803160567,1.3632788355274768,1.3712190655600236,1.3785812897116743,1.385425687170635,1.391804455586742,1.3977630773904783,1.403341355078251,1.4085742626391276,1.4134926497289835,1.4181238271875496,1.422492056380978,1.4266189601565034,1.4305238695648,1.4342241176805643,1.4377352896405224,1.4410714362770427,1.4442452573471392,1.4472682592594281,1.4501508913236898,1.4529026638417402,1.4555322507879145,1.4580475793644783,1.46045590833978,1.4627638967678902,1.4649776644343417,1.467102845162831,1.4691446339439547,1.4711078287025148,1.4729968673993112,1.4748158610623348,1.4765686232574027,1.478258696436762,1.4798893755437044,1.4814637291999613,1.482984618759049,1.4844547154715377,1.485876515976433,1.487252356305596,1.488584424564706,1.489874772434089,1.4911253256153043,1.4923378933342963,1.493514176998839,1.494655778096616,1.4957642054103752,1.4968408816179386,1.4978871493372903,1.4989042766703218,1.4998934622930016,1.5008558401346093,1.501792483684159,1.5027044099581601,1.5035925831603365,1.5044579180608044,1.5053012831194483,1.506123503375772,1.5069253631253139,1.5077076084007721,1.5084709492742387,1.5092160619953967,1.509943590979136,1.5106541506548017,1.5113483271881716,1.5120266800862527,1.5126897436940867,1.5133380285919364,1.5139720229004974,1.5145921935011137,1.5151989871773779,1.5157928316839573,1.5163741367479961,1.516943295007997,1.51750068289469,1.5180466614580157,1.5185815771440365,1.5191057625252655,1.519619536987641,1.5201232073771171,1.5206170686086078,1.5211014042398199,1.5215764870123074,1.5220425793619121,1.5224999339005911,1.5229487938714823,1.5233893935789247,1.5238219587950281,1.5242467071442671,1.5246638484674735,1.5250735851665005,1.5254761125307474,1.5258716190466461,1.5262602866911372,1.5266422912100936,1.5270178023825847,1.527386984271812,1.5277499954634952,1.5281069892924335,1.5284581140579194,1.5288035132286428,1.529143325637674,1.5294776856680843,1.529806723429723,1.5301305649276393,1.5304493322226034,1.530763143584159,1.5310721136366072,1.5313763534982996,1.531675970914595,1.5319710703848175,1.532261753283521,1.532548117976365,1.5328302599308716,1.5331082718223288,1.5333822436350868,1.533652262759477,1.5339184140845754,1.534180780087013,1.5344394409160338,1.5346944744749773,1.5349459564993668,1.5351939606317597,1.5354385584935213,1.535679819753666,1.535917812194905,1.5361526017770315,1.536384252697768,1.5366128274511939,1.5368383868838646,1.5370609902487269,1.537280695256932,1.537497558127642,1.537711633635916,1.5379229751587675,1.5381316347194682,1.5383376630301802,1.5385411095329864,1.5387420224393915,1.5389404487683562,1.5391364343829328,1.5393300240255565,1.5395212613520532,1.5397101889644165,1.5398968484424052,1.540081280374012,1.5402635243848486,1.5404436191664925,1.5406216025038384,1.540797511301494,1.5409713816092592,1.541143248646726,1.541313146827034,1.541481109779815,1.5416471703733579,1.5418113607360286,1.5419737122769666,1.5421342557060944,1.5422930210534618,1.5424500376879515,1.54260533433537,1.5427589390959495,1.54291087946128,1.5430611823306952,1.5432098740271318,1.5433569803124825,1.54350252640246,1.5436465369809922,1.543789036214164,1.5439300477637221,1.544069594800162,1.544207700015406,1.5443443856350945,1.5444796734304973,1.5446135847300642,1.5447461404306226,1.5448773610082405,1.545007266528759,1.5451358766580139,1.5452632106717503,1.545389287465246,1.5455141255626503,1.5456377431260488,1.5457601579642655,1.5458813875414075,1.546001448985164,1.5461203590948662,1.5462381343493186,1.5463547909144029,1.5464703446504715,1.5465848111195293,1.5466982055922145,1.546810543054585,1.5469218382147156,1.5470321055091123,1.5471413591089502,1.5472496129261406,1.5473568806192315,1.5474631755991481,1.547568511034779,1.5476728998584097,1.5477763547710128,1.5478788882473953,1.547980512541209,1.54808123968983,1.5481810815191075,1.54828004964799,1.5483781554930287,1.548475410272765,1.5485718250120044,1.5486674105459803,1.5487621775244096,1.5488561364154458,1.5489492975095318,1.5490416709231545,1.5491332666025033,1.5492240943270394,1.5493141637129737,1.5494034842166584,1.5494920651378947,1.549579915623159,1.549667044668749,1.5497534611238524,1.549839173693542,1.549924190941697,1.550008521293853,1.5500921730399848,1.5501751543372213,1.5502574732124945,1.5503391375651283,1.550420155169362,1.5505005336768172,1.5505802806189053,1.5506594034091783,1.5507379093456257,1.550815805612916,1.5508930992845884,1.5509697973251928,1.5510459065923803,1.5511214338389456,1.5511963857148245,1.5512707687690441,1.5513445894516285,1.5514178541154633,1.5514905690181175,1.5515627403236232,1.551634374104217,1.5517054763420421,1.5517760529308138,1.5518461096774456,1.5519156523036426,1.551984686447457,1.552053217664813,1.552121251430995,1.5521887931421061,1.5522558481164936,1.552322421596145,1.5523885187480524,1.5524541446655498,1.5525193043696202,1.5525840028101756,1.5526482448673102,1.5527120353525272,1.5527753790099381,1.5528382805174406,1.5529007444878675,1.5529627754701152,1.5530243779502466,1.5530855563525736,1.5531463150407143,1.5532066583186304,1.553266590431644,1.553326115567432,1.5533852378570012,1.5534439613756437,1.553502290143873,1.5535602281283414,1.5536177792427377,1.55367494734867,1.5537317362565275,1.553788149726328,1.553844191468546,1.553899865144927,1.5539551743692852,1.5540101227082836,1.554064713682202,1.5541189507656865,1.5541728373884895,1.554226376936189,1.5542795727509002,1.5543324281319686,1.5543849463366535,1.5544371305807958,1.5544889840394747,1.5545405098476512,1.5545917111008,1.554642590855529,1.554693152130187,1.5547433979054606,1.5547933311249604,1.5548429546957951,1.5548922714891347,1.554941284340766,1.5549899960516336,1.5550384093883758,1.555086527083846,1.5551343518376284,1.5551818863165419,1.5552291331551351,1.555276094956175,1.555322774291122,1.555369173700601,1.5554152956948621,1.5554611427542324,1.5555067173295607,1.5555520218426546,1.5555970586867087,1.5556418302267263,1.5556863387999333,1.5557305867161846,1.5557745762583635,1.5558183096827745,1.5558617892195283,1.555905017072922,1.55594799542181,1.5559907264199717,1.556033212196469,1.556075454856002,1.556117456479255,1.556159219123239,1.556200744821626,1.5562420355850808,1.5562830934015843,1.5563239202367531,1.556364518034152,1.5564048887156041,1.5564450341814917,1.5564849563110568,1.5565246569626927,1.5565641379742328,1.5566034011632337,1.556642448327255,1.5566812812441324,1.5567199016722488,1.556758311350798,1.5567965120000467,1.5568345053215917,1.5568722929986112,1.5569098766961147,1.5569472580611863,1.556984438723226,1.5570214202941859,1.5570582043688037,1.5570947925248313,1.5571311863232604,1.5571673873085452,1.5572033970088197,1.5572392169361131,1.5572748485865622,1.557310293440618,1.5573455529632523,1.5573806286041587,1.557415521797951,1.5574502339643599,1.5574847665084237,1.5575191208206798,1.5575532982773495,1.5575873002405232,1.5576211280583403,1.5576547830651684,1.557688266581777,1.5577215799155122,1.5577547243604655,1.5577877011976418,1.5578205116951243,1.557853157108237,1.557885638679705,1.557917957639812,1.5579501152065551,1.5579821125857987,1.5580139509714244,1.5580456315454803,1.5580771554783264,1.5581085239287789,1.5581397380442525,1.5581707989609004,1.5582017078037511,1.5582324656868458,1.5582630737133705,1.558293532975789,1.5583238445559728,1.5583540095253288,1.5583840289449253,1.558413903865617,1.5584436353281674,1.5584732243633694,1.5585026719921644,1.5585319792257604,1.5585611470657466,1.558590176504208,1.5586190685238386,1.558647824098051,1.5586764441910865,1.5587049297581228,1.5587332817453794,1.558761501090224,1.5587895887212742,1.5588175455585,1.5588453725133247,1.5588730704887226,1.5589006403793182,1.5589280830714813,1.5589553994434229,1.5589825903652876,1.5590096566992482,1.5590365992995938,1.5590634190128223,1.5590901166777276,1.5591166931254878,1.5591431491797505,1.559169485656719,1.5591957033652357,1.5592218031068643,1.5592477856759723,1.5592736518598116,1.5592994024385975,1.5593250381855872,1.5593505598671575,1.5593759682428812,1.5594012640656019,1.5594264480815088,1.55945152103021,1.5594764836448047,1.559501336651955,1.559526080771956,1.5595507167188056,1.559575245200273,1.5595996669179666,1.5596239825674012,1.5596481928380634,1.559672298413477,1.5596962999712674,1.559720198183225,1.559743993715368,1.5597676872280046,1.5597912793757929,1.559814770807802,1.559838162167572,1.559861454093172,1.5598846472172578,1.5599077421671304,1.5599307395647914,1.5599536400269993,1.559976444165325,1.5599991525862051,1.560021765890997,1.560044284676031,1.5600667095326632,1.5600890410473274,1.560111279801585,1.5601334263721776,1.5601554813310747,1.5601774452455246,1.5601993186781018,1.5602211021867558,1.5602427963248584,1.56026440164125,1.5602859186802864,1.5603073479818852,1.560328690081569,1.560349945510512,1.5603711147955828,1.5603921984593887,1.560413197020318,1.5604341109925832,1.5604549408862625,1.560475687207341,1.5604963504577527,1.5605169311354197,1.5605374297342933,1.560557846744393,1.5605781826518448,1.5605984379389215,1.5606186130840793,1.5606387085619964,1.5606587248436092,1.5606786623961506,1.5606985216831846,1.5607183031646437,1.5607380072968637,1.5607576345326188,1.5607771853211565,1.5607966601082315],"x":[3.0,3.19438877755511,3.3887775551102206,3.5831663326653307,3.7775551102204408,3.9719438877755513,4.166332665330661,4.3607214428857715,4.5551102204408815,4.749498997995992,4.943887775551103,5.138276553106213,5.332665330661323,5.527054108216433,5.721442885771543,5.915831663326653,6.110220440881764,6.304609218436874,6.498997995991984,6.693386773547094,6.887775551102204,7.082164328657314,7.2765531062124245,7.470941883767535,7.6653306613226455,7.859719438877756,8.054108216432866,8.248496993987976,8.442885771543086,8.637274549098196,8.831663326653306,9.026052104208416,9.220440881763528,9.414829659318638,9.609218436873748,9.803607214428858,9.997995991983968,10.192384769539078,10.386773547094188,10.581162324649299,10.775551102204409,10.969939879759519,11.164328657314629,11.358717434869739,11.553106212424849,11.74749498997996,11.94188376753507,12.136272545090181,12.330661322645291,12.525050100200401,12.719438877755511,12.913827655310621,13.108216432865731,13.302605210420841,13.496993987975952,13.691382765531062,13.885771543086172,14.080160320641282,14.274549098196394,14.468937875751504,14.663326653306614,14.857715430861724,15.052104208416834,15.246492985971944,15.440881763527054,15.635270541082164,15.829659318637274,16.024048096192384,16.218436873747496,16.412825651302605,16.607214428857716,16.801603206412825,16.995991983967937,17.190380761523045,17.384769539078157,17.579158316633265,17.773547094188377,17.96793587174349,18.162324649298597,18.35671342685371,18.551102204408817,18.74549098196393,18.939879759519037,19.13426853707415,19.328657314629258,19.52304609218437,19.717434869739478,19.91182364729459,20.106212424849698,20.30060120240481,20.49498997995992,20.68937875751503,20.88376753507014,21.07815631262525,21.272545090180362,21.46693386773547,21.661322645290582,21.85571142284569,22.050100200400802,22.24448897795591,22.438877755511022,22.63326653306613,22.827655310621243,23.022044088176354,23.216432865731463,23.410821643286575,23.605210420841683,23.799599198396795,23.993987975951903,24.188376753507015,24.382765531062123,24.577154308617235,24.771543086172343,24.965931863727455,25.160320641282564,25.354709418837675,25.549098196392787,25.743486973947896,25.937875751503007,26.132264529058116,26.326653306613228,26.521042084168336,26.715430861723448,26.909819639278556,27.104208416833668,27.298597194388776,27.492985971943888,27.687374749498996,27.881763527054108,28.07615230460922,28.27054108216433,28.46492985971944,28.65931863727455,28.85370741482966,29.04809619238477,29.24248496993988,29.43687374749499,29.6312625250501,29.82565130260521,30.02004008016032,30.21442885771543,30.40881763527054,30.603206412825653,30.79759519038076,30.991983967935873,31.18637274549098,31.380761523046093,31.5751503006012,31.769539078156313,31.96392785571142,32.15831663326653,32.35270541082164,32.547094188376754,32.741482965931866,32.93587174348698,33.13026052104208,33.324649298597194,33.519038076152306,33.71342685370742,33.90781563126252,34.102204408817634,34.296593186372746,34.49098196392786,34.68537074148296,34.879759519038075,35.07414829659319,35.2685370741483,35.46292585170341,35.657314629258515,35.85170340681363,36.04609218436874,36.24048096192385,36.434869739478955,36.62925851703407,36.82364729458918,37.01803607214429,37.212424849699396,37.40681362725451,37.60120240480962,37.79559118236473,37.98997995991984,38.18436873747495,38.37875751503006,38.57314629258517,38.76753507014028,38.96192384769539,39.1563126252505,39.35070140280561,39.545090180360724,39.73947895791583,39.93386773547094,40.12825651302605,40.322645290581164,40.517034068136276,40.71142284569138,40.90581162324649,41.100200400801604,41.294589178356716,41.48897795591182,41.68336673346693,41.877755511022045,42.07214428857716,42.26653306613226,42.46092184368737,42.655310621242485,42.8496993987976,43.04408817635271,43.23847695390781,43.432865731462925,43.62725450901804,43.82164328657315,44.016032064128254,44.210420841683366,44.40480961923848,44.59919839679359,44.793587174348694,44.987975951903806,45.18236472945892,45.37675350701403,45.57114228456914,45.765531062124246,45.95991983967936,46.15430861723447,46.34869739478958,46.54308617234469,46.7374749498998,46.93186372745491,47.12625250501002,47.32064128256513,47.51503006012024,47.70941883767535,47.90380761523046,48.098196392785574,48.29258517034068,48.48697394789579,48.6813627254509,48.875751503006015,49.07014028056112,49.26452905811623,49.45891783567134,49.653306613226455,49.84769539078156,50.04208416833667,50.236472945891784,50.430861723446895,50.62525050100201,50.81963927855711,51.014028056112224,51.208416833667336,51.40280561122245,51.59719438877755,51.791583166332664,51.985971943887776,52.18036072144289,52.37474949899799,52.569138276553105,52.763527054108216,52.95791583166333,53.15230460921844,53.346693386773545,53.54108216432866,53.73547094188377,53.92985971943888,54.124248496993985,54.3186372745491,54.51302605210421,54.70741482965932,54.901803607214426,55.09619238476954,55.29058116232465,55.48496993987976,55.67935871743487,55.87374749498998,56.06813627254509,56.2625250501002,56.45691382765531,56.65130260521042,56.84569138276553,57.04008016032064,57.234468937875754,57.42885771543086,57.62324649298597,57.81763527054108,58.012024048096194,58.206412825651306,58.40080160320641,58.59519038076152,58.789579158316634,58.983967935871746,59.17835671342685,59.37274549098196,59.567134268537075,59.76152304609219,59.95591182364729,60.1503006012024,60.344689378757515,60.53907815631263,60.73346693386774,60.92785571142284,61.122244488977955,61.31663326653307,61.51102204408818,61.705410821643284,61.899799599198396,62.09418837675351,62.28857715430862,62.482965931863724,62.677354709418836,62.87174348697395,63.06613226452906,63.26052104208417,63.454909819639276,63.64929859719439,63.8436873747495,64.03807615230461,64.23246492985972,64.42685370741484,64.62124248496994,64.81563126252505,65.01002004008016,65.20440881763527,65.39879759519039,65.59318637274549,65.7875751503006,65.98196392785572,66.17635270541082,66.37074148296593,66.56513026052104,66.75951903807615,66.95390781563127,67.14829659318637,67.34268537074148,67.5370741482966,67.7314629258517,67.92585170340682,68.12024048096193,68.31462925851703,68.50901803607215,68.70340681362725,68.89779559118236,69.09218436873748,69.28657314629258,69.4809619238477,69.6753507014028,69.86973947895791,70.06412825651303,70.25851703406813,70.45290581162325,70.64729458917836,70.84168336673346,71.03607214428858,71.23046092184369,71.42484969939879,71.61923847695391,71.81362725450902,72.00801603206413,72.20240480961924,72.39679358717434,72.59118236472946,72.78557114228457,72.97995991983969,73.17434869739479,73.3687374749499,73.56312625250501,73.75751503006012,73.95190380761522,74.14629258517034,74.34068136272545,74.53507014028057,74.72945891783567,74.92384769539078,75.1182364729459,75.312625250501,75.50701402805612,75.70140280561122,75.89579158316633,76.09018036072145,76.28456913827655,76.47895791583166,76.67334669338678,76.86773547094188,77.062124248497,77.2565130260521,77.45090180360721,77.64529058116233,77.83967935871743,78.03406813627255,78.22845691382766,78.42284569138276,78.61723446893788,78.81162324649299,79.00601202404809,79.20040080160321,79.39478957915831,79.58917835671343,79.78356713426854,79.97795591182364,80.17234468937876,80.36673346693387,80.56112224448898,80.75551102204409,80.9498997995992,81.14428857715431,81.33867735470942,81.53306613226452,81.72745490981964,81.92184368737475,82.11623246492987,82.31062124248497,82.50501002004007,82.6993987975952,82.8937875751503,83.08817635270542,83.28256513026052,83.47695390781563,83.67134268537075,83.86573146292585,84.06012024048096,84.25450901803607,84.44889779559118,84.6432865731463,84.8376753507014,85.03206412825651,85.22645290581163,85.42084168336673,85.61523046092185,85.80961923847696,86.00400801603206,86.19839679358718,86.39278557114228,86.58717434869739,86.78156312625251,86.97595190380761,87.17034068136273,87.36472945891784,87.55911823647294,87.75350701402806,87.94789579158316,88.14228456913828,88.33667334669339,88.53106212424849,88.72545090180361,88.91983967935872,89.11422845691382,89.30861723446894,89.50300601202404,89.69739478957916,89.89178356713427,90.08617234468937,90.28056112224449,90.4749498997996,90.66933867735472,90.86372745490982,91.05811623246493,91.25250501002004,91.44689378757515,91.64128256513025,91.83567134268537,92.03006012024048,92.2244488977956,92.4188376753507,92.6132264529058,92.80761523046093,93.00200400801603,93.19639278557115,93.39078156312625,93.58517034068136,93.77955911823648,93.97394789579158,94.16833667334669,94.3627254509018,94.55711422845691,94.75150300601203,94.94589178356713,95.14028056112224,95.33466933867736,95.52905811623246,95.72344689378758,95.91783567134269,96.11222444889779,96.30661322645291,96.50100200400801,96.69539078156312,96.88977955911824,97.08416833667334,97.27855711422846,97.47294589178357,97.66733466933867,97.86172344689379,98.0561122244489,98.25050100200401,98.44488977955912,98.63927855711422,98.83366733466934,99.02805611222445,99.22244488977955,99.41683366733467,99.61122244488978,99.8056112224449,100.0]}

},{}],65:[function(require,module,exports){
module.exports={"expected":[-1.5607966601082315,-1.5609738080597586,-1.5611447889691563,-1.5613099193566238,-1.5614694944470011,-1.561623789931026,-1.5617730635546374,-1.5619175565556005,-1.5620574949642936,-1.562193090783411,-1.5623245430595263,-1.5624520388579106,-1.5625757541506429,-1.5626958546268785,-1.5628124964331218,-1.562925826850457,-1.5630359849149111,-1.563143101986447,-1.563247302271477,-1.5633487033032702,-1.5634474163841585,-1.5635435469930394,-1.5636371951613102,-1.5637284558200537,-1.5638174191210035,-1.5639041707335746,-1.563988792120013,-1.5640713607905243,-1.5641519505400587,-1.5642306316682726,-1.5643074711840483,-1.5643825329958179,-1.5644558780888287,-1.5645275646903871,-1.5645976484240158,-1.564666182453386,-1.5647332176168087,-1.5647988025529946,-1.5648629838187418,-1.5649258059991464,-1.5649873118108872,-1.5650475421990824,-1.5651065364281858,-1.5651643321673414,-1.5652209655705909,-1.5652764713522864,-1.5653308828580486,-1.5653842321315636,-1.5654365499775102,-1.5654878660208702,-1.5655382087628638,-1.5655876056337337,-1.565636083042581,-1.565683666424444,-1.5657303802847955,-1.5657762482416246,-1.5658212930652513,-1.5658655367160177,-1.5659090003799856,-1.5659517045027624,-1.5659936688215697,-1.5660349123956585,-1.5660754536351729,-1.5661153103285477,-1.566154499668535,-1.56619303827693,-1.566230942228077,-1.566268227071224,-1.5663049078517906,-1.5663409991316093,-1.5663765150082007,-1.5664114691331323,-1.5664458747295147,-1.5664797446086784,-1.5665130911860803,-1.566545926496476,-1.5665782622084015,-1.5666101096379974,-1.566641479762213,-1.56667238323142,-1.5667028303814678,-1.5667328312452091,-1.5667623955635217,-1.5667915327958535,-1.5668202521303123,-1.5668485624933268,-1.5668764725588955,-1.566903990757448,-1.5669311252843336,-1.5669578841079599,-1.5669842749775929,-1.5670103054308393,-1.5670359828008247,-1.5670613142230794,-1.56708630664215,-1.5671109668179477,-1.567135301331841,-1.5671593165925146,-1.5671830188415943,-1.5672064141590558,-1.5672295084684245,-1.567252307541775,-1.5672748170045407,-1.5672970423401418,-1.5673189888944377,-1.5673406618800145,-1.5673620663803125,-1.5673832073536,-1.5674040896368038,-1.5674247179491976,-1.5674450968959586,-1.5674652309715935,-1.5674851245632444,-1.567504781953875,-1.5675242073253446,-1.5675434047613745,-1.5675623782504093,-1.56758113168838,-1.5675996688813705,-1.5676179935481933,-1.5676361093228754,-1.5676540197570628,-1.5676717283223394,-1.5676892384124728,-1.5677065533455805,-1.567723676366227,-1.5677406106474503,-1.567757359292723,-1.5677739253378467,-1.5677903117527878,-1.5678065214434522,-1.5678225572534026,-1.5678384219655226,-1.5678541183036256,-1.5678696489340143,-1.5678850164669904,-1.5679002234583175,-1.5679152724106376,-1.5679301657748446,-1.5679449059514148,-1.567959495291696,-1.5679739360991591,-1.5679882306306099,-1.5680023810973642,-1.56801638966639,-1.5680302584614114,-1.5680439895639842,-1.568057585014535,-1.568071046813375,-1.5680843769216777,-1.5680975772624342,-1.568110649721376,-1.5681235961478743,-1.5681364183558117,-1.5681491181244294,-1.56816169719915,-1.5681741572923782,-1.568186500084276,-1.5681987272235203,-1.5682108403280346,-1.568222840985705,-1.5682347307550726,-1.5682465111660084,-1.5682581837203702,-1.5682697498926403,-1.5682812111305466,-1.5682925688556666,-1.5683038244640153,-1.568314979326617,-1.568326034790062,-1.5683369921770491,-1.5683478527869128,-1.568358617896136,-1.5683692887588516,-1.5683798666073288,-1.5683903526524476,-1.5684007480841604,-1.5684110540719434,-1.5684212717652335,-1.5684314022938572,-1.5684414467684462,-1.5684514062808435,-1.5684612819044987,-1.5684710746948545,-1.5684807856897218,-1.5684904159096473,-1.5684999663582702,-1.5685094380226712,-1.5685188318737122,-1.5685281488663692,-1.568537389940054,-1.5685465560189327,-1.5685556480122307,-1.5685646668145354,-1.5685736133060888,-1.5685824883530748,-1.568591292807897,-1.568600027509454,-1.5686086932834034,-1.5686172909424239,-1.5686258212864679,-1.568634285103011,-1.5686426831672933,-1.5686510162425564,-1.5686592850802747,-1.5686674904203814,-1.5686756329914888,-1.5686837135111047,-1.568691732685842,-1.5686996912116264,-1.5687075897738962,-1.5687154290477994,-1.5687232096983865,-1.5687309323807987,-1.5687385977404509,-1.5687462064132127,-1.568753759025583,-1.568761256194863,-1.5687686985293237,-1.5687760866283709,-1.5687834210827054,-1.5687907024744818,-1.5687979313774612,-1.568805108357162,-1.568812233971008,-1.568819308768473,-1.568826333291221,-1.5688333080732448,-1.568840233641002,-1.5688471105135464,-1.5688539392026588,-1.568860720212973,-1.5688674540421006,-1.5688741411807523,-1.568880782112858,-1.5688873773156826,-1.568893927259941,-1.568900432409909,-1.5689068932235348,-1.568913310152545,-1.5689196836425503,-1.568926014133149,-1.5689323020580268,-1.5689385478450584,-1.5689447519164017,-1.5689509146885945,-1.5689570365726477,-1.5689631179741361,-1.5689691592932884,-1.5689751609250746,-1.5689811232592925,-1.5689870466806521,-1.568992931568858,-1.5689987782986905,-1.5690045872400855,-1.5690103587582127,-1.5690160932135515,-1.5690217909619664,-1.5690274523547807,-1.5690330777388481,-1.569038667456625,-1.5690442218462384,-1.5690497412415543,-1.569055225972246,-1.5690606763638577,-1.569066092737871,-1.5690714754117665,-1.569076824699086,-1.5690821409094946,-1.5690874243488393,-1.5690926753192076,-1.569097894118986,-1.5691030810429158,-1.569108236382149,-1.5691133604243017,-1.5691184534535096,-1.5691235157504786,-1.5691285475925376,-1.5691335492536882,-1.5691385210046551,-1.569143463112935,-1.5691483758428444,-1.5691532594555657,-1.569158114209196,-1.5691629403587897,-1.5691677381564049,-1.5691725078511471,-1.5691772496892122,-1.569181963913928,-1.5691866507657972,-1.5691913104825377,-1.5691959432991223,-1.569200549447819,-1.5692051291582292,-1.5692096826573265,-1.5692142101694935,-1.5692187119165593,-1.569223188117835,-1.5692276389901498,-1.5692320647478863,-1.5692364656030142,-1.5692408417651247,-1.5692451934414633,-1.569249520836963,-1.5692538241542764,-1.5692581035938067,-1.56926235935374,-1.5692665916300743,-1.5692708006166514,-1.5692749865051852,-1.5692791494852907,-1.569283289744514,-1.5692874074683592,-1.569291502840316,-1.5692955760418885,-1.5692996272526198,-1.5693036566501206,-1.5693076644100934,-1.569311650706359,-1.5693156157108812,-1.5693195595937917,-1.569323482523415,-1.5693273846662907,-1.5693312661871994,-1.5693351272491838,-1.5693389680135723,-1.569342788640002,-1.5693465892864402,-1.5693503701092062,-1.569354131262993,-1.5693578729008886,-1.5693615951743956,-1.569365298233453,-1.5693689822264556,-1.5693726473002745,-1.5693762936002758,-1.56937992127034,-1.5693835304528816,-1.5693871212888666,-1.569390693917832,-1.569394248477903,-1.5693977851058118,-1.5694013039369137,-1.5694048051052054,-1.569408288743342,-1.5694117549826534,-1.569415203953161,-1.5694186357835938,-1.5694220506014045,-1.5694254485327852,-1.5694288297026835,-1.5694321942348164,-1.5694355422516875,-1.5694388738745997,-1.5694421892236716,-1.5694454884178506,-1.569448771574928,-1.5694520388115525,-1.569455290243245,-1.5694585259844105,-1.5694617461483527,-1.5694649508472878,-1.5694681401923554,-1.569471314293634,-1.5694744732601515,-1.569477617199899,-1.5694807462198421,-1.5694838604259342,-1.5694869599231276,-1.5694900448153852,-1.5694931152056932,-1.5694961711960709,-1.5694992128875833,-1.5695022403803525,-1.5695052537735668,-1.5695082531654936,-1.569511238653489,-1.569514210334009,-1.5695171683026186,-1.5695201126540037,-1.56952304348198,-1.5695259608795038,-1.5695288649386807,-1.5695317557507769,-1.5695346334062268,-1.5695374979946446,-1.569540349604832,-1.5695431883247877,-1.5695460142417166,-1.5695488274420393,-1.5695516280113997,-1.569554416034675,-1.5695571915959832,-1.5695599547786918,-1.569562705665427,-1.5695654443380809,-1.56956817087782,-1.569570885365093,-1.569573587879639,-1.569576278500496,-1.5695789573060068,-1.5695816243738285,-1.5695842797809383,-1.5695869236036424,-1.5695895559175825,-1.569592176797743,-1.5695947863184587,-1.5695973845534212,-1.5695999715756859,-1.5696025474576794,-1.5696051122712054,-1.569607666087452,-1.5696102089769985,-1.5696127410098213,-1.5696152622553006,-1.569617772782226,-1.5696202726588047,-1.5696227619526655,-1.5696252407308662,-1.5696277090598991,-1.569630167005697,-1.5696326146336395,-1.5696350520085582,-1.5696374791947425,-1.5696398962559461,-1.569642303255391,-1.569644700255775,-1.5696470873192747,-1.5696494645075538,-1.5696518318817656,-1.56965418950256,-1.5696565374300884,-1.5696588757240082,-1.5696612044434886,-1.5696635236472147,-1.5696658333933935,-1.5696681337397584,-1.569670424743573,-1.5696727064616376,-1.5696749789502922,-1.5696772422654228,-1.5696794964624643,-1.5696817415964064,-1.5696839777217972,-1.5696862048927482,-1.5696884231629382,-1.5696906325856177,-1.5696928332136135,-1.5696950250993327,-1.5696972082947664,-1.569699382851495,-1.5697015488206907,-1.5697037062531232,-1.5697058551991616,-1.569707995708781,-1.5697101278315635,-1.5697122516167044,-1.5697143671130145,-1.5697164743689243,-1.569718573432488,-1.569720664351387,-1.5697227471729331,-1.5697248219440723,-1.5697268887113884,-1.569728947521107,-1.5697309984190977,-1.5697330414508788,-1.5697350766616198,-1.569737104096145,-1.569739123798937,-1.56974113581414,-1.5697431401855622,-1.5697451369566795,-1.5697471261706397,-1.5697491078702637,-1.5697510820980496,-1.5697530488961762,-1.5697550083065046,-1.569756960370583,-1.5697589051296477,-1.5697608426246272,-1.5697627728961454,-1.569764695984523,-1.5697666119297817,-1.5697685207716465,-1.569770422549548,-1.5697723173026257,-1.5697742050697305,-1.5697760858894274,-1.5697779597999977,-1.5697798268394425,-1.5697816870454846,-1.5697835404555707,-1.569785387106875,-1.5697872270363007,-1.569789060280483,-1.569790886875791,-1.5697927068583313,-1.5697945202639487,-1.5697963271282298],"x":[-100.0,-101.80360721442885,-103.60721442885772,-105.41082164328657,-107.21442885771543,-109.01803607214428,-110.82164328657315,-112.625250501002,-114.42885771543087,-116.23246492985972,-118.03607214428858,-119.83967935871743,-121.6432865731463,-123.44689378757515,-125.25050100200401,-127.05410821643287,-128.85771543086173,-130.66132264529057,-132.46492985971943,-134.2685370741483,-136.07214428857716,-137.875751503006,-139.67935871743487,-141.48296593186373,-143.2865731462926,-145.09018036072143,-146.8937875751503,-148.69739478957916,-150.50100200400803,-152.30460921843687,-154.10821643286573,-155.9118236472946,-157.71543086172343,-159.5190380761523,-161.32264529058116,-163.12625250501003,-164.92985971943887,-166.73346693386773,-168.5370741482966,-170.34068136272546,-172.1442885771543,-173.94789579158316,-175.75150300601203,-177.5551102204409,-179.35871743486973,-181.1623246492986,-182.96593186372746,-184.7695390781563,-186.57314629258516,-188.37675350701403,-190.1803607214429,-191.98396793587173,-193.7875751503006,-195.59118236472946,-197.39478957915833,-199.19839679358716,-201.00200400801603,-202.8056112224449,-204.60921843687376,-206.4128256513026,-208.21643286573146,-210.02004008016033,-211.82364729458916,-213.62725450901803,-215.4308617234469,-217.23446893787576,-219.0380761523046,-220.84168336673346,-222.64529058116233,-224.4488977955912,-226.25250501002003,-228.0561122244489,-229.85971943887776,-231.66332665330663,-233.46693386773546,-235.27054108216433,-237.0741482965932,-238.87775551102203,-240.6813627254509,-242.48496993987976,-244.28857715430863,-246.09218436873746,-247.89579158316633,-249.6993987975952,-251.50300601202406,-253.3066132264529,-255.11022044088176,-256.9138276553106,-258.71743486973946,-260.52104208416836,-262.3246492985972,-264.12825651302603,-265.9318637274549,-267.73547094188376,-269.5390781563126,-271.3426853707415,-273.14629258517033,-274.9498997995992,-276.75350701402806,-278.5571142284569,-280.3607214428858,-282.1643286573146,-283.96793587174346,-285.77154308617236,-287.5751503006012,-289.3787575150301,-291.1823647294589,-292.98597194388776,-294.78957915831666,-296.5931863727455,-298.39679358717433,-300.2004008016032,-302.00400801603206,-303.8076152304609,-305.6112224448898,-307.4148296593186,-309.2184368737475,-311.02204408817636,-312.8256513026052,-314.6292585170341,-316.4328657314629,-318.23647294589176,-320.04008016032066,-321.8436873747495,-323.64729458917833,-325.4509018036072,-327.25450901803606,-329.05811623246495,-330.8617234468938,-332.6653306613226,-334.4689378757515,-336.27254509018036,-338.0761523046092,-339.8797595190381,-341.6833667334669,-343.4869739478958,-345.29058116232466,-347.0941883767535,-348.8977955911824,-350.7014028056112,-352.50501002004006,-354.30861723446895,-356.1122244488978,-357.9158316633266,-359.7194388777555,-361.52304609218436,-363.32665330661325,-365.1302605210421,-366.9338677354709,-368.7374749498998,-370.54108216432866,-372.3446893787575,-374.1482965931864,-375.9519038076152,-377.75551102204406,-379.55911823647295,-381.3627254509018,-383.1663326653307,-384.9699398797595,-386.77354709418836,-388.57715430861725,-390.3807615230461,-392.1843687374749,-393.9879759519038,-395.79158316633266,-397.59519038076155,-399.3987975951904,-401.2024048096192,-403.0060120240481,-404.80961923847696,-406.6132264529058,-408.4168336673347,-410.2204408817635,-412.02404809619236,-413.82765531062125,-415.6312625250501,-417.434869739479,-419.2384769539078,-421.04208416833666,-422.84569138276555,-424.6492985971944,-426.4529058116232,-428.2565130260521,-430.06012024048096,-431.8637274549098,-433.6673346693387,-435.4709418837675,-437.2745490981964,-439.07815631262525,-440.8817635270541,-442.685370741483,-444.4889779559118,-446.29258517034066,-448.09619238476955,-449.8997995991984,-451.7034068136273,-453.5070140280561,-455.31062124248496,-457.11422845691385,-458.9178356713427,-460.7214428857715,-462.5250501002004,-464.32865731462925,-466.1322645290581,-467.935871743487,-469.7394789579158,-471.5430861723447,-473.34669338677355,-475.1503006012024,-476.9539078156313,-478.7575150300601,-480.56112224448896,-482.36472945891785,-484.1683366733467,-485.9719438877755,-487.7755511022044,-489.57915831663325,-491.38276553106215,-493.186372745491,-494.9899799599198,-496.7935871743487,-498.59719438877755,-500.4008016032064,-502.2044088176353,-504.0080160320641,-505.811623246493,-507.61523046092185,-509.4188376753507,-511.2224448897796,-513.0260521042084,-514.8296593186373,-516.6332665330661,-518.436873747495,-520.2404809619238,-522.0440881763527,-523.8476953907816,-525.6513026052104,-527.4549098196393,-529.2585170340682,-531.062124248497,-532.8657314629259,-534.6693386773547,-536.4729458917835,-538.2765531062124,-540.0801603206413,-541.8837675350701,-543.687374749499,-545.4909819639279,-547.2945891783567,-549.0981963927856,-550.9018036072144,-552.7054108216433,-554.5090180360721,-556.312625250501,-558.1162324649299,-559.9198396793587,-561.7234468937876,-563.5270541082165,-565.3306613226453,-567.1342685370741,-568.937875751503,-570.7414829659318,-572.5450901803607,-574.3486973947896,-576.1523046092184,-577.9559118236473,-579.7595190380762,-581.563126252505,-583.3667334669339,-585.1703406813627,-586.9739478957916,-588.7775551102204,-590.5811623246493,-592.3847695390782,-594.188376753507,-595.9919839679359,-597.7955911823648,-599.5991983967936,-601.4028056112224,-603.2064128256513,-605.0100200400801,-606.813627254509,-608.6172344689379,-610.4208416833667,-612.2244488977956,-614.0280561122245,-615.8316633266533,-617.6352705410821,-619.438877755511,-621.2424849699398,-623.0460921843687,-624.8496993987976,-626.6533066132265,-628.4569138276553,-630.2605210420842,-632.0641282565131,-633.8677354709419,-635.6713426853707,-637.4749498997996,-639.2785571142284,-641.0821643286573,-642.8857715430862,-644.689378757515,-646.4929859719439,-648.2965931863728,-650.1002004008016,-651.9038076152304,-653.7074148296593,-655.5110220440881,-657.314629258517,-659.1182364729459,-660.9218436873748,-662.7254509018036,-664.5290581162325,-666.3326653306614,-668.1362725450902,-669.939879759519,-671.7434869739479,-673.5470941883767,-675.3507014028056,-677.1543086172345,-678.9579158316633,-680.7615230460922,-682.5651302605211,-684.3687374749499,-686.1723446893787,-687.9759519038076,-689.7795591182364,-691.5831663326653,-693.3867735470942,-695.1903807615231,-696.9939879759519,-698.7975951903808,-700.6012024048097,-702.4048096192384,-704.2084168336673,-706.0120240480962,-707.815631262525,-709.6192384769539,-711.4228456913828,-713.2264529058116,-715.0300601202405,-716.8336673346694,-718.6372745490982,-720.440881763527,-722.2444889779559,-724.0480961923847,-725.8517034068136,-727.6553106212425,-729.4589178356713,-731.2625250501002,-733.0661322645291,-734.869739478958,-736.6733466933867,-738.4769539078156,-740.2805611222445,-742.0841683366733,-743.8877755511022,-745.6913827655311,-747.4949899799599,-749.2985971943888,-751.1022044088177,-752.9058116232464,-754.7094188376753,-756.5130260521042,-758.316633266533,-760.1202404809619,-761.9238476953908,-763.7274549098196,-765.5310621242485,-767.3346693386774,-769.1382765531063,-770.941883767535,-772.7454909819639,-774.5490981963928,-776.3527054108216,-778.1563126252505,-779.9599198396794,-781.7635270541082,-783.5671342685371,-785.370741482966,-787.1743486973947,-788.9779559118236,-790.7815631262525,-792.5851703406813,-794.3887775551102,-796.1923847695391,-797.9959919839679,-799.7995991983968,-801.6032064128257,-803.4068136272546,-805.2104208416833,-807.0140280561122,-808.8176352705411,-810.6212424849699,-812.4248496993988,-814.2284569138277,-816.0320641282565,-817.8356713426854,-819.6392785571143,-821.442885771543,-823.2464929859719,-825.0501002004008,-826.8537074148296,-828.6573146292585,-830.4609218436874,-832.2645290581162,-834.0681362725451,-835.871743486974,-837.6753507014027,-839.4789579158316,-841.2825651302605,-843.0861723446894,-844.8897795591182,-846.6933867735471,-848.496993987976,-850.3006012024048,-852.1042084168337,-853.9078156312626,-855.7114228456913,-857.5150300601202,-859.3186372745491,-861.1222444889779,-862.9258517034068,-864.7294589178357,-866.5330661322645,-868.3366733466934,-870.1402805611223,-871.943887775551,-873.7474949899799,-875.5511022044088,-877.3547094188377,-879.1583166332665,-880.9619238476954,-882.7655310621243,-884.5691382765531,-886.372745490982,-888.1763527054109,-889.9799599198396,-891.7835671342685,-893.5871743486974,-895.3907815631262,-897.1943887775551,-898.997995991984,-900.8016032064128,-902.6052104208417,-904.4088176352706,-906.2124248496993,-908.0160320641282,-909.8196392785571,-911.623246492986,-913.4268537074148,-915.2304609218437,-917.0340681362726,-918.8376753507014,-920.6412825651303,-922.4448897795592,-924.2484969939879,-926.0521042084168,-927.8557114228457,-929.6593186372745,-931.4629258517034,-933.2665330661323,-935.0701402805611,-936.87374749499,-938.6773547094189,-940.4809619238476,-942.2845691382765,-944.0881763527054,-945.8917835671342,-947.6953907815631,-949.498997995992,-951.3026052104209,-953.1062124248497,-954.9098196392786,-956.7134268537075,-958.5170340681362,-960.3206412825651,-962.124248496994,-963.9278557114228,-965.7314629258517,-967.5350701402806,-969.3386773547094,-971.1422845691383,-972.9458917835672,-974.7494989979959,-976.5531062124248,-978.3567134268537,-980.1603206412825,-981.9639278557114,-983.7675350701403,-985.5711422845692,-987.374749498998,-989.1783567134269,-990.9819639278558,-992.7855711422845,-994.5891783567134,-996.3927855711423,-998.1963927855711,-1000.0]}

},{}],66:[function(require,module,exports){
module.exports={"expected":[1.5607966601082315,1.5609738080597586,1.5611447889691563,1.5613099193566238,1.5614694944470011,1.561623789931026,1.5617730635546374,1.5619175565556005,1.5620574949642936,1.562193090783411,1.5623245430595263,1.5624520388579106,1.5625757541506429,1.5626958546268785,1.5628124964331218,1.562925826850457,1.5630359849149111,1.563143101986447,1.563247302271477,1.5633487033032702,1.5634474163841585,1.5635435469930394,1.5636371951613102,1.5637284558200537,1.5638174191210035,1.5639041707335746,1.563988792120013,1.5640713607905243,1.5641519505400587,1.5642306316682726,1.5643074711840483,1.5643825329958179,1.5644558780888287,1.5645275646903871,1.5645976484240158,1.564666182453386,1.5647332176168087,1.5647988025529946,1.5648629838187418,1.5649258059991464,1.5649873118108872,1.5650475421990824,1.5651065364281858,1.5651643321673414,1.5652209655705909,1.5652764713522864,1.5653308828580486,1.5653842321315636,1.5654365499775102,1.5654878660208702,1.5655382087628638,1.5655876056337337,1.565636083042581,1.565683666424444,1.5657303802847955,1.5657762482416246,1.5658212930652513,1.5658655367160177,1.5659090003799856,1.5659517045027624,1.5659936688215697,1.5660349123956585,1.5660754536351729,1.5661153103285477,1.566154499668535,1.56619303827693,1.566230942228077,1.566268227071224,1.5663049078517906,1.5663409991316093,1.5663765150082007,1.5664114691331323,1.5664458747295147,1.5664797446086784,1.5665130911860803,1.566545926496476,1.5665782622084015,1.5666101096379974,1.566641479762213,1.56667238323142,1.5667028303814678,1.5667328312452091,1.5667623955635217,1.5667915327958535,1.5668202521303123,1.5668485624933268,1.5668764725588955,1.566903990757448,1.5669311252843336,1.5669578841079599,1.5669842749775929,1.5670103054308393,1.5670359828008247,1.5670613142230794,1.56708630664215,1.5671109668179477,1.567135301331841,1.5671593165925146,1.5671830188415943,1.5672064141590558,1.5672295084684245,1.567252307541775,1.5672748170045407,1.5672970423401418,1.5673189888944377,1.5673406618800145,1.5673620663803125,1.5673832073536,1.5674040896368038,1.5674247179491976,1.5674450968959586,1.5674652309715935,1.5674851245632444,1.567504781953875,1.5675242073253446,1.5675434047613745,1.5675623782504093,1.56758113168838,1.5675996688813705,1.5676179935481933,1.5676361093228754,1.5676540197570628,1.5676717283223394,1.5676892384124728,1.5677065533455805,1.567723676366227,1.5677406106474503,1.567757359292723,1.5677739253378467,1.5677903117527878,1.5678065214434522,1.5678225572534026,1.5678384219655226,1.5678541183036256,1.5678696489340143,1.5678850164669904,1.5679002234583175,1.5679152724106376,1.5679301657748446,1.5679449059514148,1.567959495291696,1.5679739360991591,1.5679882306306099,1.5680023810973642,1.56801638966639,1.5680302584614114,1.5680439895639842,1.568057585014535,1.568071046813375,1.5680843769216777,1.5680975772624342,1.568110649721376,1.5681235961478743,1.5681364183558117,1.5681491181244294,1.56816169719915,1.5681741572923782,1.568186500084276,1.5681987272235203,1.5682108403280346,1.568222840985705,1.5682347307550726,1.5682465111660084,1.5682581837203702,1.5682697498926403,1.5682812111305466,1.5682925688556666,1.5683038244640153,1.568314979326617,1.568326034790062,1.5683369921770491,1.5683478527869128,1.568358617896136,1.5683692887588516,1.5683798666073288,1.5683903526524476,1.5684007480841604,1.5684110540719434,1.5684212717652335,1.5684314022938572,1.5684414467684462,1.5684514062808435,1.5684612819044987,1.5684710746948545,1.5684807856897218,1.5684904159096473,1.5684999663582702,1.5685094380226712,1.5685188318737122,1.5685281488663692,1.568537389940054,1.5685465560189327,1.5685556480122307,1.5685646668145354,1.5685736133060888,1.5685824883530748,1.568591292807897,1.568600027509454,1.5686086932834034,1.5686172909424239,1.5686258212864679,1.568634285103011,1.5686426831672933,1.5686510162425564,1.5686592850802747,1.5686674904203814,1.5686756329914888,1.5686837135111047,1.568691732685842,1.5686996912116264,1.5687075897738962,1.5687154290477994,1.5687232096983865,1.5687309323807987,1.5687385977404509,1.5687462064132127,1.568753759025583,1.568761256194863,1.5687686985293237,1.5687760866283709,1.5687834210827054,1.5687907024744818,1.5687979313774612,1.568805108357162,1.568812233971008,1.568819308768473,1.568826333291221,1.5688333080732448,1.568840233641002,1.5688471105135464,1.5688539392026588,1.568860720212973,1.5688674540421006,1.5688741411807523,1.568880782112858,1.5688873773156826,1.568893927259941,1.568900432409909,1.5689068932235348,1.568913310152545,1.5689196836425503,1.568926014133149,1.5689323020580268,1.5689385478450584,1.5689447519164017,1.5689509146885945,1.5689570365726477,1.5689631179741361,1.5689691592932884,1.5689751609250746,1.5689811232592925,1.5689870466806521,1.568992931568858,1.5689987782986905,1.5690045872400855,1.5690103587582127,1.5690160932135515,1.5690217909619664,1.5690274523547807,1.5690330777388481,1.569038667456625,1.5690442218462384,1.5690497412415543,1.569055225972246,1.5690606763638577,1.569066092737871,1.5690714754117665,1.569076824699086,1.5690821409094946,1.5690874243488393,1.5690926753192076,1.569097894118986,1.5691030810429158,1.569108236382149,1.5691133604243017,1.5691184534535096,1.5691235157504786,1.5691285475925376,1.5691335492536882,1.5691385210046551,1.569143463112935,1.5691483758428444,1.5691532594555657,1.569158114209196,1.5691629403587897,1.5691677381564049,1.5691725078511471,1.5691772496892122,1.569181963913928,1.5691866507657972,1.5691913104825377,1.5691959432991223,1.569200549447819,1.5692051291582292,1.5692096826573265,1.5692142101694935,1.5692187119165593,1.569223188117835,1.5692276389901498,1.5692320647478863,1.5692364656030142,1.5692408417651247,1.5692451934414633,1.569249520836963,1.5692538241542764,1.5692581035938067,1.56926235935374,1.5692665916300743,1.5692708006166514,1.5692749865051852,1.5692791494852907,1.569283289744514,1.5692874074683592,1.569291502840316,1.5692955760418885,1.5692996272526198,1.5693036566501206,1.5693076644100934,1.569311650706359,1.5693156157108812,1.5693195595937917,1.569323482523415,1.5693273846662907,1.5693312661871994,1.5693351272491838,1.5693389680135723,1.569342788640002,1.5693465892864402,1.5693503701092062,1.569354131262993,1.5693578729008886,1.5693615951743956,1.569365298233453,1.5693689822264556,1.5693726473002745,1.5693762936002758,1.56937992127034,1.5693835304528816,1.5693871212888666,1.569390693917832,1.569394248477903,1.5693977851058118,1.5694013039369137,1.5694048051052054,1.569408288743342,1.5694117549826534,1.569415203953161,1.5694186357835938,1.5694220506014045,1.5694254485327852,1.5694288297026835,1.5694321942348164,1.5694355422516875,1.5694388738745997,1.5694421892236716,1.5694454884178506,1.569448771574928,1.5694520388115525,1.569455290243245,1.5694585259844105,1.5694617461483527,1.5694649508472878,1.5694681401923554,1.569471314293634,1.5694744732601515,1.569477617199899,1.5694807462198421,1.5694838604259342,1.5694869599231276,1.5694900448153852,1.5694931152056932,1.5694961711960709,1.5694992128875833,1.5695022403803525,1.5695052537735668,1.5695082531654936,1.569511238653489,1.569514210334009,1.5695171683026186,1.5695201126540037,1.56952304348198,1.5695259608795038,1.5695288649386807,1.5695317557507769,1.5695346334062268,1.5695374979946446,1.569540349604832,1.5695431883247877,1.5695460142417166,1.5695488274420393,1.5695516280113997,1.569554416034675,1.5695571915959832,1.5695599547786918,1.569562705665427,1.5695654443380809,1.56956817087782,1.569570885365093,1.569573587879639,1.569576278500496,1.5695789573060068,1.5695816243738285,1.5695842797809383,1.5695869236036424,1.5695895559175825,1.569592176797743,1.5695947863184587,1.5695973845534212,1.5695999715756859,1.5696025474576794,1.5696051122712054,1.569607666087452,1.5696102089769985,1.5696127410098213,1.5696152622553006,1.569617772782226,1.5696202726588047,1.5696227619526655,1.5696252407308662,1.5696277090598991,1.569630167005697,1.5696326146336395,1.5696350520085582,1.5696374791947425,1.5696398962559461,1.569642303255391,1.569644700255775,1.5696470873192747,1.5696494645075538,1.5696518318817656,1.56965418950256,1.5696565374300884,1.5696588757240082,1.5696612044434886,1.5696635236472147,1.5696658333933935,1.5696681337397584,1.569670424743573,1.5696727064616376,1.5696749789502922,1.5696772422654228,1.5696794964624643,1.5696817415964064,1.5696839777217972,1.5696862048927482,1.5696884231629382,1.5696906325856177,1.5696928332136135,1.5696950250993327,1.5696972082947664,1.569699382851495,1.5697015488206907,1.5697037062531232,1.5697058551991616,1.569707995708781,1.5697101278315635,1.5697122516167044,1.5697143671130145,1.5697164743689243,1.569718573432488,1.569720664351387,1.5697227471729331,1.5697248219440723,1.5697268887113884,1.569728947521107,1.5697309984190977,1.5697330414508788,1.5697350766616198,1.569737104096145,1.569739123798937,1.56974113581414,1.5697431401855622,1.5697451369566795,1.5697471261706397,1.5697491078702637,1.5697510820980496,1.5697530488961762,1.5697550083065046,1.569756960370583,1.5697589051296477,1.5697608426246272,1.5697627728961454,1.569764695984523,1.5697666119297817,1.5697685207716465,1.569770422549548,1.5697723173026257,1.5697742050697305,1.5697760858894274,1.5697779597999977,1.5697798268394425,1.5697816870454846,1.5697835404555707,1.569785387106875,1.5697872270363007,1.569789060280483,1.569790886875791,1.5697927068583313,1.5697945202639487,1.5697963271282298],"x":[100.0,101.80360721442885,103.60721442885772,105.41082164328657,107.21442885771543,109.01803607214428,110.82164328657315,112.625250501002,114.42885771543087,116.23246492985972,118.03607214428858,119.83967935871743,121.6432865731463,123.44689378757515,125.25050100200401,127.05410821643287,128.85771543086173,130.66132264529057,132.46492985971943,134.2685370741483,136.07214428857716,137.875751503006,139.67935871743487,141.48296593186373,143.2865731462926,145.09018036072143,146.8937875751503,148.69739478957916,150.50100200400803,152.30460921843687,154.10821643286573,155.9118236472946,157.71543086172343,159.5190380761523,161.32264529058116,163.12625250501003,164.92985971943887,166.73346693386773,168.5370741482966,170.34068136272546,172.1442885771543,173.94789579158316,175.75150300601203,177.5551102204409,179.35871743486973,181.1623246492986,182.96593186372746,184.7695390781563,186.57314629258516,188.37675350701403,190.1803607214429,191.98396793587173,193.7875751503006,195.59118236472946,197.39478957915833,199.19839679358716,201.00200400801603,202.8056112224449,204.60921843687376,206.4128256513026,208.21643286573146,210.02004008016033,211.82364729458916,213.62725450901803,215.4308617234469,217.23446893787576,219.0380761523046,220.84168336673346,222.64529058116233,224.4488977955912,226.25250501002003,228.0561122244489,229.85971943887776,231.66332665330663,233.46693386773546,235.27054108216433,237.0741482965932,238.87775551102203,240.6813627254509,242.48496993987976,244.28857715430863,246.09218436873746,247.89579158316633,249.6993987975952,251.50300601202406,253.3066132264529,255.11022044088176,256.9138276553106,258.71743486973946,260.52104208416836,262.3246492985972,264.12825651302603,265.9318637274549,267.73547094188376,269.5390781563126,271.3426853707415,273.14629258517033,274.9498997995992,276.75350701402806,278.5571142284569,280.3607214428858,282.1643286573146,283.96793587174346,285.77154308617236,287.5751503006012,289.3787575150301,291.1823647294589,292.98597194388776,294.78957915831666,296.5931863727455,298.39679358717433,300.2004008016032,302.00400801603206,303.8076152304609,305.6112224448898,307.4148296593186,309.2184368737475,311.02204408817636,312.8256513026052,314.6292585170341,316.4328657314629,318.23647294589176,320.04008016032066,321.8436873747495,323.64729458917833,325.4509018036072,327.25450901803606,329.05811623246495,330.8617234468938,332.6653306613226,334.4689378757515,336.27254509018036,338.0761523046092,339.8797595190381,341.6833667334669,343.4869739478958,345.29058116232466,347.0941883767535,348.8977955911824,350.7014028056112,352.50501002004006,354.30861723446895,356.1122244488978,357.9158316633266,359.7194388777555,361.52304609218436,363.32665330661325,365.1302605210421,366.9338677354709,368.7374749498998,370.54108216432866,372.3446893787575,374.1482965931864,375.9519038076152,377.75551102204406,379.55911823647295,381.3627254509018,383.1663326653307,384.9699398797595,386.77354709418836,388.57715430861725,390.3807615230461,392.1843687374749,393.9879759519038,395.79158316633266,397.59519038076155,399.3987975951904,401.2024048096192,403.0060120240481,404.80961923847696,406.6132264529058,408.4168336673347,410.2204408817635,412.02404809619236,413.82765531062125,415.6312625250501,417.434869739479,419.2384769539078,421.04208416833666,422.84569138276555,424.6492985971944,426.4529058116232,428.2565130260521,430.06012024048096,431.8637274549098,433.6673346693387,435.4709418837675,437.2745490981964,439.07815631262525,440.8817635270541,442.685370741483,444.4889779559118,446.29258517034066,448.09619238476955,449.8997995991984,451.7034068136273,453.5070140280561,455.31062124248496,457.11422845691385,458.9178356713427,460.7214428857715,462.5250501002004,464.32865731462925,466.1322645290581,467.935871743487,469.7394789579158,471.5430861723447,473.34669338677355,475.1503006012024,476.9539078156313,478.7575150300601,480.56112224448896,482.36472945891785,484.1683366733467,485.9719438877755,487.7755511022044,489.57915831663325,491.38276553106215,493.186372745491,494.9899799599198,496.7935871743487,498.59719438877755,500.4008016032064,502.2044088176353,504.0080160320641,505.811623246493,507.61523046092185,509.4188376753507,511.2224448897796,513.0260521042084,514.8296593186373,516.6332665330661,518.436873747495,520.2404809619238,522.0440881763527,523.8476953907816,525.6513026052104,527.4549098196393,529.2585170340682,531.062124248497,532.8657314629259,534.6693386773547,536.4729458917835,538.2765531062124,540.0801603206413,541.8837675350701,543.687374749499,545.4909819639279,547.2945891783567,549.0981963927856,550.9018036072144,552.7054108216433,554.5090180360721,556.312625250501,558.1162324649299,559.9198396793587,561.7234468937876,563.5270541082165,565.3306613226453,567.1342685370741,568.937875751503,570.7414829659318,572.5450901803607,574.3486973947896,576.1523046092184,577.9559118236473,579.7595190380762,581.563126252505,583.3667334669339,585.1703406813627,586.9739478957916,588.7775551102204,590.5811623246493,592.3847695390782,594.188376753507,595.9919839679359,597.7955911823648,599.5991983967936,601.4028056112224,603.2064128256513,605.0100200400801,606.813627254509,608.6172344689379,610.4208416833667,612.2244488977956,614.0280561122245,615.8316633266533,617.6352705410821,619.438877755511,621.2424849699398,623.0460921843687,624.8496993987976,626.6533066132265,628.4569138276553,630.2605210420842,632.0641282565131,633.8677354709419,635.6713426853707,637.4749498997996,639.2785571142284,641.0821643286573,642.8857715430862,644.689378757515,646.4929859719439,648.2965931863728,650.1002004008016,651.9038076152304,653.7074148296593,655.5110220440881,657.314629258517,659.1182364729459,660.9218436873748,662.7254509018036,664.5290581162325,666.3326653306614,668.1362725450902,669.939879759519,671.7434869739479,673.5470941883767,675.3507014028056,677.1543086172345,678.9579158316633,680.7615230460922,682.5651302605211,684.3687374749499,686.1723446893787,687.9759519038076,689.7795591182364,691.5831663326653,693.3867735470942,695.1903807615231,696.9939879759519,698.7975951903808,700.6012024048097,702.4048096192384,704.2084168336673,706.0120240480962,707.815631262525,709.6192384769539,711.4228456913828,713.2264529058116,715.0300601202405,716.8336673346694,718.6372745490982,720.440881763527,722.2444889779559,724.0480961923847,725.8517034068136,727.6553106212425,729.4589178356713,731.2625250501002,733.0661322645291,734.869739478958,736.6733466933867,738.4769539078156,740.2805611222445,742.0841683366733,743.8877755511022,745.6913827655311,747.4949899799599,749.2985971943888,751.1022044088177,752.9058116232464,754.7094188376753,756.5130260521042,758.316633266533,760.1202404809619,761.9238476953908,763.7274549098196,765.5310621242485,767.3346693386774,769.1382765531063,770.941883767535,772.7454909819639,774.5490981963928,776.3527054108216,778.1563126252505,779.9599198396794,781.7635270541082,783.5671342685371,785.370741482966,787.1743486973947,788.9779559118236,790.7815631262525,792.5851703406813,794.3887775551102,796.1923847695391,797.9959919839679,799.7995991983968,801.6032064128257,803.4068136272546,805.2104208416833,807.0140280561122,808.8176352705411,810.6212424849699,812.4248496993988,814.2284569138277,816.0320641282565,817.8356713426854,819.6392785571143,821.442885771543,823.2464929859719,825.0501002004008,826.8537074148296,828.6573146292585,830.4609218436874,832.2645290581162,834.0681362725451,835.871743486974,837.6753507014027,839.4789579158316,841.2825651302605,843.0861723446894,844.8897795591182,846.6933867735471,848.496993987976,850.3006012024048,852.1042084168337,853.9078156312626,855.7114228456913,857.5150300601202,859.3186372745491,861.1222444889779,862.9258517034068,864.7294589178357,866.5330661322645,868.3366733466934,870.1402805611223,871.943887775551,873.7474949899799,875.5511022044088,877.3547094188377,879.1583166332665,880.9619238476954,882.7655310621243,884.5691382765531,886.372745490982,888.1763527054109,889.9799599198396,891.7835671342685,893.5871743486974,895.3907815631262,897.1943887775551,898.997995991984,900.8016032064128,902.6052104208417,904.4088176352706,906.2124248496993,908.0160320641282,909.8196392785571,911.623246492986,913.4268537074148,915.2304609218437,917.0340681362726,918.8376753507014,920.6412825651303,922.4448897795592,924.2484969939879,926.0521042084168,927.8557114228457,929.6593186372745,931.4629258517034,933.2665330661323,935.0701402805611,936.87374749499,938.6773547094189,940.4809619238476,942.2845691382765,944.0881763527054,945.8917835671342,947.6953907815631,949.498997995992,951.3026052104209,953.1062124248497,954.9098196392786,956.7134268537075,958.5170340681362,960.3206412825651,962.124248496994,963.9278557114228,965.7314629258517,967.5350701402806,969.3386773547094,971.1422845691383,972.9458917835672,974.7494989979959,976.5531062124248,978.3567134268537,980.1603206412825,981.9639278557114,983.7675350701403,985.5711422845692,987.374749498998,989.1783567134269,990.9819639278558,992.7855711422845,994.5891783567134,996.3927855711423,998.1963927855711,1000.0]}

},{}],67:[function(require,module,exports){
module.exports={"expected":[-0.7853981633974483,-0.787398160730788,-0.7893901581598713,-0.7913741878736364,-0.7933502820549494,-0.7953184728776538,-0.7972787925036813,-0.79923127308022,-0.801175946736943,-0.8031128455832933,-0.8050420017058257,-0.8069634471656065,-0.8088772139956663,-0.8107833341985095,-0.812681839743677,-0.8145727625653624,-0.8164561345600805,-0.8183319875843877,-0.8202003534526546,-0.8220612639348867,-0.8239147507545972,-0.8257608455867277,-0.827599580055617,-0.829430985733018,-0.8312550941361613,-0.8330719367258652,-0.8348815449046908,-0.8366839500151424,-0.8384791833379118,-0.840267276090167,-0.8420482594238821,-0.8438221644242102,-0.8455890221078991,-0.8473488634217461,-0.8491017192410933,-0.850847620368364,-0.8525865975316363,-0.8543186813832562,-0.8560439024984878,-0.8577622913742018,-0.8594738784275984,-0.8611786939949689,-0.8628767683304903,-0.8645681316050559,-0.8662528139051398,-0.8679308452316947,-0.869602255499084,-0.8712670745340443,-0.8729253320746817,-0.8745770577694983,-0.8762222811764508,-0.8778610317620377,-0.8794933389004174,-0.8811192318725559,-0.8827387398654023,-0.8843518919710927,-0.885958717186182,-0.8875592444109037,-0.8891535024484546,-0.8907415200043076,-0.892323325685549,-0.8938989480002416,-0.8954684153568131,-0.8970317560634675,-0.8985889983276216,-0.9001401702553649,-0.9016852998509416,-0.9032244150162562,-0.9047575435504006,-0.9062847131492031,-0.9078059514047989,-0.9093212858052209,-0.9108307437340117,-0.9123343524698556,-0.9138321391862291,-0.9153241309510725,-0.9168103547264789,-0.9182908373684028,-0.9197656056263861,-0.9212346861433018,-0.9226981054551163,-0.9241558899906671,-0.9256080660714584,-0.9270546599114726,-0.9284956976169978,-0.9299312051864713,-0.9313612085103382,-0.9327857333709246,-0.9342048054423265,-0.9356184502903122,-0.9370266933722394,-0.9384295600369854,-0.9398270755248915,-0.94121926496772,-0.9426061533886243,-0.9439877657021318,-0.9453641267141388,-0.9467352611219175,-0.9481011935141347,-0.9494619483708824,-0.9508175500637189,-0.9521680228557219,-0.953513390901551,-0.9548536782475219,-0.9561889088316899,-0.9575191064839443,-0.9588442949261112,-0.9601644977720671,-0.9614797385278616,-0.9627900405918476,-0.9640954272548229,-0.9653959217001781,-0.9666915470040539,-0.967982326135507,-0.969268281956683,-0.9705494372229974,-0.9718258145833243,-0.973097436580193,-0.9743643256499903,-0.9756265041231715,-0.9768839942244769,-0.9781368180731551,-0.9793849976831941,-0.9806285549635562,-0.9818675117184213,-0.9831018896474353,-0.984331710345963,-0.985556995305349,-0.986777765913182,-0.9879940434535651,-0.9892058491073916,-0.9904132039526249,-0.991616128964584,-0.9928146450162331,-0.9940087728784761,-0.9951985332204555,-0.9963839466098545,-0.9975650335132056,-0.9987418142962001,-0.9999143092240038,-1.0010825384615758,-1.00224652207399,-1.0034062800267611,-1.004561832186174,-1.0057131983196155,-1.0068603980959092,-1.0080034510856557,-1.0091423767615717,-1.0102771944988354,-1.011407923575432,-1.012534583172505,-1.0136571923747055,-1.0147757701705482,-1.0158903354527666,-1.0170009070186723,-1.018107503570515,-1.0192101437158456,-1.0203088459678806,-1.0214036287458683,-1.0224945103754572,-1.0235815090890648,-1.02466464302625,-1.0257439302340847,-1.0268193886675294,-1.0278910361898064,-1.028958890572779,-1.0300229694973266,-1.0310832905537268,-1.0321398712420327,-1.0331927289724545,-1.0342418810657419,-1.0352873447535662,-1.036329137178904,-1.037367275396421,-1.0384017763728561,-1.0394326569874082,-1.04045993403212,-1.0414836242122656,-1.0425037441467369,-1.0435203103684298,-1.0445333393246323,-1.045542847377411,-1.0465488508040002,-1.0475513657971873,-1.0485504084657031,-1.0495459948346084,-1.0505381408456813,-1.0515268623578065,-1.0525121751473616,-1.0534940949086053,-1.054472637254065,-1.0554478177149225,-1.0564196517414028,-1.0573881547031587,-1.058353341889659,-1.0593152285105714,-1.0602738296961514,-1.0612291604976238,-1.0621812358875695,-1.063130070760308,-1.064075679932281,-1.0650180781424359,-1.0659572800526063,-1.0668933002478944,-1.0678261532370523,-1.0687558534528603,-1.0696824152525075,-1.07060585291797,-1.0715261806563887,-1.0724434126004456,-1.0733575628087402,-1.074268645266165,-1.0751766738842787,-1.0760816625016811,-1.076983624884384,-1.0778825747261838,-1.0787785256490305,-1.0796714912033991,-1.0805614848686567,-1.0814485200534296,-1.0823326100959711,-1.0832137682645253,-1.0840920077576919,-1.084967341704789,-1.0858397831662157,-1.086709345133812,-1.0875760405312187,-1.088439882214236,-1.0893008829711808,-1.0901590555232423,-1.0910144125248373,-1.0918669665639642,-1.0927167301625538,-1.0935637157768223,-1.0944079357976197,-1.09524940255078,-1.0960881282974662,-1.0969241252345188,-1.0977574054947985,-1.0985879811475312,-1.099415864198649,-1.1002410665911306,-1.101063600205343,-1.1018834768593766,-1.1027007083093836,-1.1035153062499135,-1.104327282314246,-1.1051366480747247,-1.105943415043088,-1.1067475946707985,-1.1075491983493722,-1.1083482374107048,-1.1091447231273983,-1.1099386667130844,-1.110730079322748,-1.1115189720530478,-1.1123053559426381,-1.1130892419724854,-1.1138706410661867,-1.1146495640902851,-1.115426021854584,-1.1162000251124602,-1.1169715845611756,-1.1177407108421868,-1.1185074145414537,-1.1192717061897475,-1.1200335962629553,-1.120793095182385,-1.1215502133150692,-1.122304960974064,-1.123057348418752,-1.123807385855139,-1.124555083436151,-1.1253004512619316,-1.1260434993801343,-1.1267842377862163,-1.12752267642373,-1.1282588251846122,-1.128992693909473,-1.1297242923878832,-1.1304536303586596,-1.1311807175101487,-1.13190556348051,-1.1326281778579979,-1.1333485701812402,-1.1340667499395176,-1.1347827265730404,-1.1354965094732246,-1.136208107982965,-1.1369175313969093,-1.1376247889617288,-1.1383298898763883,-1.1390328432924148,-1.139733658314165,-1.1404323439990907,-1.1411289093580026,-1.1418233633553347,-1.142515714909405,-1.1432059728926747,-1.1438941461320093,-1.144580243408934,-1.1452642734598912,-1.1459462449764932,-1.1466261666057782,-1.1473040469504596,-1.1479798945691784,-1.1486537179767515,-1.1493255256444201,-1.1499953260000955,-1.150663127428605,-1.151328938271935,-1.151992766829474,-1.152654621358254,-1.1533145100731894,-1.1539724411473165,-1.1546284227120298,-1.1552824628573182,-1.155934569632,-1.1565847510439557,-1.1572330150603598,-1.157879369607912,-1.1585238225730656,-1.1591663818022568,-1.1598070551021311,-1.160445850239768,-1.1610827749429062,-1.1617178369001664,-1.1623510437612727,-1.1629824031372733,-1.16361192260076,-1.1642396096860852,-1.1648654718895803,-1.1654895166697696,-1.1661117514475852,-1.1667321836065803,-1.1673508204931409,-1.1679676694166958,-1.168582737649927,-1.1691960324289772,-1.1698075609536576,-1.1704173303876524,-1.1710253478587247,-1.1716316204589192,-1.1722361552447653,-1.1728389592374775,-1.1734400394231548,-1.1740394027529812,-1.174637056143422,-1.1752330064764205,-1.1758272605995934,-1.1764198253264257,-1.1770107074364626,-1.1775999136755022,-1.1781874507557861,-1.1787733253561894,-1.1793575441224087,-1.1799401136671506,-1.1805210405703166,-1.1811003313791906,-1.18167799260862,-1.1822540307412028,-1.1828284522274657,-1.183401263486048,-1.1839724709038801,-1.184542080836363,-1.185110099607545,-1.1856765335103003,-1.1862413888065035,-1.1868046717272043,-1.1873663884728012,-1.1879265452132146,-1.1884851480880583,-1.1890422032068093,-1.1895977166489784,-1.1901516944642783,-1.1907041426727905,-1.1912550672651336,-1.1918044742026275,-1.192352369417458,-1.1928987588128408,-1.193443648263185,-1.1939870436142523,-1.1945289506833212,-1.1950693752593433,-1.1956083231031047,-1.1961457999473821,-1.1966818114971014,-1.1972163634294917,-1.197749461394242,-1.1982811110136553,-1.1988113178827997,-1.1993400875696638,-1.1998674256153057,-1.2003933375340043,-1.200917828813409,-1.2014409049146886,-1.201962571272678,-1.2024828332960262,-1.2030016963673424,-1.20351916584334,-1.2040352470549816,-1.204549945307623,-1.2050632658811549,-1.2055752140301448,-1.2060857949839776,-1.2065950139469965,-1.2071028760986415,-1.2076093865935873,-1.2081145505618816,-1.2086183731090818,-1.2091208593163902,-1.2096220142407894,-1.2101218429151768,-1.2106203503484974,-1.2111175415258764,-1.2116134214087526,-1.2121079949350069,-1.2126012670190949,-1.213093242552174,-1.2135839264022352,-1.2140733234142274,-1.2145614384101875,-1.2150482761893653,-1.2155338415283492,-1.2160181391811917,-1.2165011738795328,-1.2169829503327239,-1.21746347322795,-1.2179427472303517,-1.2184207769831468,-1.2188975671077502,-1.2193731222038937,-1.2198474468497449,-1.2203205456020259,-1.2207924229961304,-1.2212630835462408,-1.221732531745444,-1.2222007720658477,-1.2226678089586938,-1.223133646854474,-1.2235982901630416,-1.2240617432737255,-1.2245240105554418,-1.224985096356805,-1.2254450050062382,-1.2259037408120845,-1.2263613080627151,-1.2268177110266383,-1.2272729539526082,-1.2277270410697305,-1.2281799765875716,-1.2286317646962628,-1.229082409566606,-1.2295319153501798,-1.2299802861794422,-1.2304275261678348,-1.2308736394098865,-1.2313186299813144,-1.2317625019391265,-1.2322052593217232,-1.2326469061489962,-1.2330874464224302,-1.2335268841252014,-1.2339652232222758,-1.2344024676605088,-1.2348386213687406,-1.2352736882578952,-1.2357076722210756,-1.2361405771336602,-1.236572406853397,-1.2370031652205002,-1.2374328560577423,-1.2378614831705486,-1.23828905034709,-1.238715561358376,-1.2391410199583452,-1.2395654298839582,-1.2399887948552872,-1.2404111185756066,-1.2408324047314832,-1.2412526569928646,-1.2416718790131682,-1.2420900744293695,-1.2425072468620888,-1.24292339991568,-1.2433385371783148,-1.243752662222071,-1.244165778603016,-1.244577889861294,-1.244988999521208,-1.245399111091306,-1.2458082280644631,-1.2462163539179651,-1.2466234921135908,-1.2470296460976942,-1.2474348193012859,-1.2478390151401142,-1.2482422370147455,-1.2486444883106447,-1.2490457723982544],"x":[-1.0,-1.0040080160320641,-1.0080160320641283,-1.0120240480961924,-1.0160320641282565,-1.0200400801603207,-1.0240480961923848,-1.028056112224449,-1.032064128256513,-1.0360721442885772,-1.0400801603206413,-1.0440881763527055,-1.0480961923847696,-1.0521042084168337,-1.0561122244488979,-1.060120240480962,-1.0641282565130261,-1.0681362725450902,-1.0721442885771544,-1.0761523046092185,-1.0801603206412826,-1.0841683366733468,-1.088176352705411,-1.092184368737475,-1.0961923847695392,-1.1002004008016033,-1.1042084168336674,-1.1082164328657316,-1.1122244488977955,-1.1162324649298596,-1.1202404809619237,-1.1242484969939879,-1.128256513026052,-1.1322645290581161,-1.1362725450901803,-1.1402805611222444,-1.1442885771543085,-1.1482965931863727,-1.1523046092184368,-1.156312625250501,-1.160320641282565,-1.1643286573146292,-1.1683366733466933,-1.1723446893787575,-1.1763527054108216,-1.1803607214428857,-1.1843687374749499,-1.188376753507014,-1.1923847695390781,-1.1963927855711423,-1.2004008016032064,-1.2044088176352705,-1.2084168336673347,-1.2124248496993988,-1.216432865731463,-1.220440881763527,-1.2244488977955912,-1.2284569138276553,-1.2324649298597194,-1.2364729458917836,-1.2404809619238477,-1.2444889779559118,-1.248496993987976,-1.25250501002004,-1.2565130260521042,-1.2605210420841684,-1.2645290581162325,-1.2685370741482966,-1.2725450901803608,-1.276553106212425,-1.280561122244489,-1.2845691382765532,-1.2885771543086173,-1.2925851703406814,-1.2965931863727456,-1.3006012024048097,-1.3046092184368738,-1.308617234468938,-1.312625250501002,-1.3166332665330662,-1.3206412825651304,-1.3246492985971945,-1.3286573146292586,-1.3326653306613228,-1.3366733466933867,-1.3406813627254508,-1.344689378757515,-1.348697394789579,-1.3527054108216432,-1.3567134268537073,-1.3607214428857715,-1.3647294589178356,-1.3687374749498997,-1.3727454909819639,-1.376753507014028,-1.3807615230460921,-1.3847695390781563,-1.3887775551102204,-1.3927855711422845,-1.3967935871743486,-1.4008016032064128,-1.404809619238477,-1.408817635270541,-1.4128256513026052,-1.4168336673346693,-1.4208416833667334,-1.4248496993987976,-1.4288577154308617,-1.4328657314629258,-1.43687374749499,-1.440881763527054,-1.4448897795591182,-1.4488977955911824,-1.4529058116232465,-1.4569138276553106,-1.4609218436873748,-1.464929859719439,-1.468937875751503,-1.4729458917835672,-1.4769539078156313,-1.4809619238476954,-1.4849699398797596,-1.4889779559118237,-1.4929859719438878,-1.496993987975952,-1.501002004008016,-1.5050100200400802,-1.5090180360721444,-1.5130260521042085,-1.5170340681362726,-1.5210420841683367,-1.5250501002004009,-1.529058116232465,-1.5330661322645291,-1.5370741482965933,-1.5410821643286574,-1.5450901803607215,-1.5490981963927857,-1.5531062124248498,-1.5571142284569137,-1.5611222444889779,-1.565130260521042,-1.5691382765531061,-1.5731462925851702,-1.5771543086172344,-1.5811623246492985,-1.5851703406813626,-1.5891783567134268,-1.593186372745491,-1.597194388777555,-1.6012024048096192,-1.6052104208416833,-1.6092184368737474,-1.6132264529058116,-1.6172344689378757,-1.6212424849699398,-1.625250501002004,-1.629258517034068,-1.6332665330661322,-1.6372745490981964,-1.6412825651302605,-1.6452905811623246,-1.6492985971943888,-1.653306613226453,-1.657314629258517,-1.6613226452905812,-1.6653306613226453,-1.6693386773547094,-1.6733466933867736,-1.6773547094188377,-1.6813627254509018,-1.685370741482966,-1.68937875751503,-1.6933867735470942,-1.6973947895791583,-1.7014028056112225,-1.7054108216432866,-1.7094188376753507,-1.7134268537074149,-1.717434869739479,-1.7214428857715431,-1.7254509018036073,-1.7294589178356714,-1.7334669338677355,-1.7374749498997997,-1.7414829659318638,-1.745490981963928,-1.749498997995992,-1.7535070140280562,-1.7575150300601203,-1.7615230460921845,-1.7655310621242486,-1.7695390781563127,-1.7735470941883769,-1.777555110220441,-1.781563126252505,-1.785571142284569,-1.7895791583166332,-1.7935871743486973,-1.7975951903807614,-1.8016032064128256,-1.8056112224448897,-1.8096192384769538,-1.813627254509018,-1.817635270541082,-1.8216432865731462,-1.8256513026052104,-1.8296593186372745,-1.8336673346693386,-1.8376753507014028,-1.8416833667334669,-1.845691382765531,-1.8496993987975952,-1.8537074148296593,-1.8577154308617234,-1.8617234468937875,-1.8657314629258517,-1.8697394789579158,-1.87374749498998,-1.877755511022044,-1.8817635270541082,-1.8857715430861723,-1.8897795591182365,-1.8937875751503006,-1.8977955911823647,-1.9018036072144289,-1.905811623246493,-1.9098196392785571,-1.9138276553106213,-1.9178356713426854,-1.9218436873747495,-1.9258517034068137,-1.9298597194388778,-1.933867735470942,-1.937875751503006,-1.9418837675350702,-1.9458917835671343,-1.9498997995991985,-1.9539078156312626,-1.9579158316633267,-1.9619238476953909,-1.965931863727455,-1.9699398797595191,-1.9739478957915833,-1.9779559118236474,-1.9819639278557115,-1.9859719438877756,-1.9899799599198398,-1.993987975951904,-1.997995991983968,-2.002004008016032,-2.006012024048096,-2.0100200400801604,-2.0140280561122244,-2.0180360721442887,-2.0220440881763526,-2.026052104208417,-2.030060120240481,-2.0340681362725452,-2.038076152304609,-2.0420841683366735,-2.0460921843687374,-2.0501002004008018,-2.0541082164328657,-2.05811623246493,-2.062124248496994,-2.0661322645290583,-2.070140280561122,-2.0741482965931866,-2.0781563126252505,-2.082164328657315,-2.0861723446893787,-2.090180360721443,-2.094188376753507,-2.0981963927855714,-2.1022044088176353,-2.1062124248496996,-2.1102204408817635,-2.1142284569138274,-2.118236472945892,-2.1222444889779557,-2.12625250501002,-2.130260521042084,-2.1342685370741483,-2.1382765531062122,-2.1422845691382766,-2.1462925851703405,-2.150300601202405,-2.1543086172344688,-2.158316633266533,-2.162324649298597,-2.1663326653306614,-2.1703406813627253,-2.1743486973947896,-2.1783567134268536,-2.182364729458918,-2.186372745490982,-2.190380761523046,-2.19438877755511,-2.1983967935871744,-2.2024048096192383,-2.2064128256513027,-2.2104208416833666,-2.214428857715431,-2.218436873747495,-2.2224448897795592,-2.226452905811623,-2.2304609218436875,-2.2344689378757514,-2.2384769539078158,-2.2424849699398797,-2.246492985971944,-2.250501002004008,-2.2545090180360723,-2.258517034068136,-2.2625250501002006,-2.2665330661322645,-2.270541082164329,-2.2745490981963927,-2.278557114228457,-2.282565130260521,-2.2865731462925853,-2.2905811623246493,-2.2945891783567136,-2.2985971943887775,-2.302605210420842,-2.306613226452906,-2.31062124248497,-2.314629258517034,-2.3186372745490984,-2.3226452905811623,-2.3266533066132267,-2.3306613226452906,-2.3346693386773545,-2.338677354709419,-2.3426853707414828,-2.346693386773547,-2.350701402805611,-2.3547094188376754,-2.3587174348697393,-2.3627254509018036,-2.3667334669338675,-2.370741482965932,-2.374749498997996,-2.37875751503006,-2.382765531062124,-2.3867735470941884,-2.3907815631262523,-2.3947895791583167,-2.3987975951903806,-2.402805611222445,-2.406813627254509,-2.4108216432865732,-2.414829659318637,-2.4188376753507015,-2.4228456913827654,-2.4268537074148298,-2.4308617234468937,-2.434869739478958,-2.438877755511022,-2.4428857715430863,-2.44689378757515,-2.4509018036072145,-2.4549098196392785,-2.458917835671343,-2.4629258517034067,-2.466933867735471,-2.470941883767535,-2.4749498997995993,-2.4789579158316633,-2.4829659318637276,-2.4869739478957915,-2.490981963927856,-2.49498997995992,-2.498997995991984,-2.503006012024048,-2.5070140280561124,-2.5110220440881763,-2.5150300601202407,-2.5190380761523046,-2.523046092184369,-2.527054108216433,-2.531062124248497,-2.535070140280561,-2.5390781563126255,-2.5430861723446894,-2.5470941883767537,-2.5511022044088176,-2.555110220440882,-2.559118236472946,-2.56312625250501,-2.567134268537074,-2.571142284569138,-2.5751503006012024,-2.5791583166332663,-2.5831663326653307,-2.5871743486973946,-2.591182364729459,-2.595190380761523,-2.599198396793587,-2.603206412825651,-2.6072144288577155,-2.6112224448897794,-2.6152304609218437,-2.6192384769539077,-2.623246492985972,-2.627254509018036,-2.6312625250501003,-2.635270541082164,-2.6392785571142285,-2.6432865731462925,-2.647294589178357,-2.6513026052104207,-2.655310621242485,-2.659318637274549,-2.6633266533066133,-2.6673346693386772,-2.6713426853707416,-2.6753507014028055,-2.67935871743487,-2.6833667334669338,-2.687374749498998,-2.691382765531062,-2.6953907815631264,-2.6993987975951903,-2.7034068136272547,-2.7074148296593186,-2.711422845691383,-2.715430861723447,-2.719438877755511,-2.723446893787575,-2.7274549098196395,-2.7314629258517034,-2.7354709418837677,-2.7394789579158316,-2.743486973947896,-2.74749498997996,-2.7515030060120242,-2.755511022044088,-2.7595190380761525,-2.7635270541082164,-2.7675350701402808,-2.7715430861723447,-2.775551102204409,-2.779559118236473,-2.783567134268537,-2.787575150300601,-2.791583166332665,-2.7955911823647295,-2.7995991983967934,-2.8036072144288577,-2.8076152304609217,-2.811623246492986,-2.81563126252505,-2.8196392785571143,-2.823647294589178,-2.8276553106212425,-2.8316633266533064,-2.835671342685371,-2.8396793587174347,-2.843687374749499,-2.847695390781563,-2.8517034068136273,-2.8557114228456912,-2.8597194388777556,-2.8637274549098195,-2.867735470941884,-2.8717434869739478,-2.875751503006012,-2.879759519038076,-2.8837675350701404,-2.8877755511022043,-2.8917835671342687,-2.8957915831663326,-2.899799599198397,-2.903807615230461,-2.907815631262525,-2.911823647294589,-2.9158316633266534,-2.9198396793587174,-2.9238476953907817,-2.9278557114228456,-2.93186372745491,-2.935871743486974,-2.9398797595190382,-2.943887775551102,-2.9478957915831665,-2.9519038076152304,-2.9559118236472948,-2.9599198396793587,-2.963927855711423,-2.967935871743487,-2.9719438877755513,-2.975951903807615,-2.9799599198396796,-2.9839679358717435,-2.987975951903808,-2.9919839679358717,-2.995991983967936,-3.0]}

},{}],68:[function(require,module,exports){
module.exports={"expected":[0.7853981633974483,0.787398160730788,0.7893901581598713,0.7913741878736364,0.7933502820549494,0.7953184728776538,0.7972787925036813,0.79923127308022,0.801175946736943,0.8031128455832933,0.8050420017058257,0.8069634471656065,0.8088772139956663,0.8107833341985095,0.812681839743677,0.8145727625653624,0.8164561345600805,0.8183319875843877,0.8202003534526546,0.8220612639348867,0.8239147507545972,0.8257608455867277,0.827599580055617,0.829430985733018,0.8312550941361613,0.8330719367258652,0.8348815449046908,0.8366839500151424,0.8384791833379118,0.840267276090167,0.8420482594238821,0.8438221644242102,0.8455890221078991,0.8473488634217461,0.8491017192410933,0.850847620368364,0.8525865975316363,0.8543186813832562,0.8560439024984878,0.8577622913742018,0.8594738784275984,0.8611786939949689,0.8628767683304903,0.8645681316050559,0.8662528139051398,0.8679308452316947,0.869602255499084,0.8712670745340443,0.8729253320746817,0.8745770577694983,0.8762222811764508,0.8778610317620377,0.8794933389004174,0.8811192318725559,0.8827387398654023,0.8843518919710927,0.885958717186182,0.8875592444109037,0.8891535024484546,0.8907415200043076,0.892323325685549,0.8938989480002416,0.8954684153568131,0.8970317560634675,0.8985889983276216,0.9001401702553649,0.9016852998509416,0.9032244150162562,0.9047575435504006,0.9062847131492031,0.9078059514047989,0.9093212858052209,0.9108307437340117,0.9123343524698556,0.9138321391862291,0.9153241309510725,0.9168103547264789,0.9182908373684028,0.9197656056263861,0.9212346861433018,0.9226981054551163,0.9241558899906671,0.9256080660714584,0.9270546599114726,0.9284956976169978,0.9299312051864713,0.9313612085103382,0.9327857333709246,0.9342048054423265,0.9356184502903122,0.9370266933722394,0.9384295600369854,0.9398270755248915,0.94121926496772,0.9426061533886243,0.9439877657021318,0.9453641267141388,0.9467352611219175,0.9481011935141347,0.9494619483708824,0.9508175500637189,0.9521680228557219,0.953513390901551,0.9548536782475219,0.9561889088316899,0.9575191064839443,0.9588442949261112,0.9601644977720671,0.9614797385278616,0.9627900405918476,0.9640954272548229,0.9653959217001781,0.9666915470040539,0.967982326135507,0.969268281956683,0.9705494372229974,0.9718258145833243,0.973097436580193,0.9743643256499903,0.9756265041231715,0.9768839942244769,0.9781368180731551,0.9793849976831941,0.9806285549635562,0.9818675117184213,0.9831018896474353,0.984331710345963,0.985556995305349,0.986777765913182,0.9879940434535651,0.9892058491073916,0.9904132039526249,0.991616128964584,0.9928146450162331,0.9940087728784761,0.9951985332204555,0.9963839466098545,0.9975650335132056,0.9987418142962001,0.9999143092240038,1.0010825384615758,1.00224652207399,1.0034062800267611,1.004561832186174,1.0057131983196155,1.0068603980959092,1.0080034510856557,1.0091423767615717,1.0102771944988354,1.011407923575432,1.012534583172505,1.0136571923747055,1.0147757701705482,1.0158903354527666,1.0170009070186723,1.018107503570515,1.0192101437158456,1.0203088459678806,1.0214036287458683,1.0224945103754572,1.0235815090890648,1.02466464302625,1.0257439302340847,1.0268193886675294,1.0278910361898064,1.028958890572779,1.0300229694973266,1.0310832905537268,1.0321398712420327,1.0331927289724545,1.0342418810657419,1.0352873447535662,1.036329137178904,1.037367275396421,1.0384017763728561,1.0394326569874082,1.04045993403212,1.0414836242122656,1.0425037441467369,1.0435203103684298,1.0445333393246323,1.045542847377411,1.0465488508040002,1.0475513657971873,1.0485504084657031,1.0495459948346084,1.0505381408456813,1.0515268623578065,1.0525121751473616,1.0534940949086053,1.054472637254065,1.0554478177149225,1.0564196517414028,1.0573881547031587,1.058353341889659,1.0593152285105714,1.0602738296961514,1.0612291604976238,1.0621812358875695,1.063130070760308,1.064075679932281,1.0650180781424359,1.0659572800526063,1.0668933002478944,1.0678261532370523,1.0687558534528603,1.0696824152525075,1.07060585291797,1.0715261806563887,1.0724434126004456,1.0733575628087402,1.074268645266165,1.0751766738842787,1.0760816625016811,1.076983624884384,1.0778825747261838,1.0787785256490305,1.0796714912033991,1.0805614848686567,1.0814485200534296,1.0823326100959711,1.0832137682645253,1.0840920077576919,1.084967341704789,1.0858397831662157,1.086709345133812,1.0875760405312187,1.088439882214236,1.0893008829711808,1.0901590555232423,1.0910144125248373,1.0918669665639642,1.0927167301625538,1.0935637157768223,1.0944079357976197,1.09524940255078,1.0960881282974662,1.0969241252345188,1.0977574054947985,1.0985879811475312,1.099415864198649,1.1002410665911306,1.101063600205343,1.1018834768593766,1.1027007083093836,1.1035153062499135,1.104327282314246,1.1051366480747247,1.105943415043088,1.1067475946707985,1.1075491983493722,1.1083482374107048,1.1091447231273983,1.1099386667130844,1.110730079322748,1.1115189720530478,1.1123053559426381,1.1130892419724854,1.1138706410661867,1.1146495640902851,1.115426021854584,1.1162000251124602,1.1169715845611756,1.1177407108421868,1.1185074145414537,1.1192717061897475,1.1200335962629553,1.120793095182385,1.1215502133150692,1.122304960974064,1.123057348418752,1.123807385855139,1.124555083436151,1.1253004512619316,1.1260434993801343,1.1267842377862163,1.12752267642373,1.1282588251846122,1.128992693909473,1.1297242923878832,1.1304536303586596,1.1311807175101487,1.13190556348051,1.1326281778579979,1.1333485701812402,1.1340667499395176,1.1347827265730404,1.1354965094732246,1.136208107982965,1.1369175313969093,1.1376247889617288,1.1383298898763883,1.1390328432924148,1.139733658314165,1.1404323439990907,1.1411289093580026,1.1418233633553347,1.142515714909405,1.1432059728926747,1.1438941461320093,1.144580243408934,1.1452642734598912,1.1459462449764932,1.1466261666057782,1.1473040469504596,1.1479798945691784,1.1486537179767515,1.1493255256444201,1.1499953260000955,1.150663127428605,1.151328938271935,1.151992766829474,1.152654621358254,1.1533145100731894,1.1539724411473165,1.1546284227120298,1.1552824628573182,1.155934569632,1.1565847510439557,1.1572330150603598,1.157879369607912,1.1585238225730656,1.1591663818022568,1.1598070551021311,1.160445850239768,1.1610827749429062,1.1617178369001664,1.1623510437612727,1.1629824031372733,1.16361192260076,1.1642396096860852,1.1648654718895803,1.1654895166697696,1.1661117514475852,1.1667321836065803,1.1673508204931409,1.1679676694166958,1.168582737649927,1.1691960324289772,1.1698075609536576,1.1704173303876524,1.1710253478587247,1.1716316204589192,1.1722361552447653,1.1728389592374775,1.1734400394231548,1.1740394027529812,1.174637056143422,1.1752330064764205,1.1758272605995934,1.1764198253264257,1.1770107074364626,1.1775999136755022,1.1781874507557861,1.1787733253561894,1.1793575441224087,1.1799401136671506,1.1805210405703166,1.1811003313791906,1.18167799260862,1.1822540307412028,1.1828284522274657,1.183401263486048,1.1839724709038801,1.184542080836363,1.185110099607545,1.1856765335103003,1.1862413888065035,1.1868046717272043,1.1873663884728012,1.1879265452132146,1.1884851480880583,1.1890422032068093,1.1895977166489784,1.1901516944642783,1.1907041426727905,1.1912550672651336,1.1918044742026275,1.192352369417458,1.1928987588128408,1.193443648263185,1.1939870436142523,1.1945289506833212,1.1950693752593433,1.1956083231031047,1.1961457999473821,1.1966818114971014,1.1972163634294917,1.197749461394242,1.1982811110136553,1.1988113178827997,1.1993400875696638,1.1998674256153057,1.2003933375340043,1.200917828813409,1.2014409049146886,1.201962571272678,1.2024828332960262,1.2030016963673424,1.20351916584334,1.2040352470549816,1.204549945307623,1.2050632658811549,1.2055752140301448,1.2060857949839776,1.2065950139469965,1.2071028760986415,1.2076093865935873,1.2081145505618816,1.2086183731090818,1.2091208593163902,1.2096220142407894,1.2101218429151768,1.2106203503484974,1.2111175415258764,1.2116134214087526,1.2121079949350069,1.2126012670190949,1.213093242552174,1.2135839264022352,1.2140733234142274,1.2145614384101875,1.2150482761893653,1.2155338415283492,1.2160181391811917,1.2165011738795328,1.2169829503327239,1.21746347322795,1.2179427472303517,1.2184207769831468,1.2188975671077502,1.2193731222038937,1.2198474468497449,1.2203205456020259,1.2207924229961304,1.2212630835462408,1.221732531745444,1.2222007720658477,1.2226678089586938,1.223133646854474,1.2235982901630416,1.2240617432737255,1.2245240105554418,1.224985096356805,1.2254450050062382,1.2259037408120845,1.2263613080627151,1.2268177110266383,1.2272729539526082,1.2277270410697305,1.2281799765875716,1.2286317646962628,1.229082409566606,1.2295319153501798,1.2299802861794422,1.2304275261678348,1.2308736394098865,1.2313186299813144,1.2317625019391265,1.2322052593217232,1.2326469061489962,1.2330874464224302,1.2335268841252014,1.2339652232222758,1.2344024676605088,1.2348386213687406,1.2352736882578952,1.2357076722210756,1.2361405771336602,1.236572406853397,1.2370031652205002,1.2374328560577423,1.2378614831705486,1.23828905034709,1.238715561358376,1.2391410199583452,1.2395654298839582,1.2399887948552872,1.2404111185756066,1.2408324047314832,1.2412526569928646,1.2416718790131682,1.2420900744293695,1.2425072468620888,1.24292339991568,1.2433385371783148,1.243752662222071,1.244165778603016,1.244577889861294,1.244988999521208,1.245399111091306,1.2458082280644631,1.2462163539179651,1.2466234921135908,1.2470296460976942,1.2474348193012859,1.2478390151401142,1.2482422370147455,1.2486444883106447,1.2490457723982544],"x":[1.0,1.0040080160320641,1.0080160320641283,1.0120240480961924,1.0160320641282565,1.0200400801603207,1.0240480961923848,1.028056112224449,1.032064128256513,1.0360721442885772,1.0400801603206413,1.0440881763527055,1.0480961923847696,1.0521042084168337,1.0561122244488979,1.060120240480962,1.0641282565130261,1.0681362725450902,1.0721442885771544,1.0761523046092185,1.0801603206412826,1.0841683366733468,1.088176352705411,1.092184368737475,1.0961923847695392,1.1002004008016033,1.1042084168336674,1.1082164328657316,1.1122244488977955,1.1162324649298596,1.1202404809619237,1.1242484969939879,1.128256513026052,1.1322645290581161,1.1362725450901803,1.1402805611222444,1.1442885771543085,1.1482965931863727,1.1523046092184368,1.156312625250501,1.160320641282565,1.1643286573146292,1.1683366733466933,1.1723446893787575,1.1763527054108216,1.1803607214428857,1.1843687374749499,1.188376753507014,1.1923847695390781,1.1963927855711423,1.2004008016032064,1.2044088176352705,1.2084168336673347,1.2124248496993988,1.216432865731463,1.220440881763527,1.2244488977955912,1.2284569138276553,1.2324649298597194,1.2364729458917836,1.2404809619238477,1.2444889779559118,1.248496993987976,1.25250501002004,1.2565130260521042,1.2605210420841684,1.2645290581162325,1.2685370741482966,1.2725450901803608,1.276553106212425,1.280561122244489,1.2845691382765532,1.2885771543086173,1.2925851703406814,1.2965931863727456,1.3006012024048097,1.3046092184368738,1.308617234468938,1.312625250501002,1.3166332665330662,1.3206412825651304,1.3246492985971945,1.3286573146292586,1.3326653306613228,1.3366733466933867,1.3406813627254508,1.344689378757515,1.348697394789579,1.3527054108216432,1.3567134268537073,1.3607214428857715,1.3647294589178356,1.3687374749498997,1.3727454909819639,1.376753507014028,1.3807615230460921,1.3847695390781563,1.3887775551102204,1.3927855711422845,1.3967935871743486,1.4008016032064128,1.404809619238477,1.408817635270541,1.4128256513026052,1.4168336673346693,1.4208416833667334,1.4248496993987976,1.4288577154308617,1.4328657314629258,1.43687374749499,1.440881763527054,1.4448897795591182,1.4488977955911824,1.4529058116232465,1.4569138276553106,1.4609218436873748,1.464929859719439,1.468937875751503,1.4729458917835672,1.4769539078156313,1.4809619238476954,1.4849699398797596,1.4889779559118237,1.4929859719438878,1.496993987975952,1.501002004008016,1.5050100200400802,1.5090180360721444,1.5130260521042085,1.5170340681362726,1.5210420841683367,1.5250501002004009,1.529058116232465,1.5330661322645291,1.5370741482965933,1.5410821643286574,1.5450901803607215,1.5490981963927857,1.5531062124248498,1.5571142284569137,1.5611222444889779,1.565130260521042,1.5691382765531061,1.5731462925851702,1.5771543086172344,1.5811623246492985,1.5851703406813626,1.5891783567134268,1.593186372745491,1.597194388777555,1.6012024048096192,1.6052104208416833,1.6092184368737474,1.6132264529058116,1.6172344689378757,1.6212424849699398,1.625250501002004,1.629258517034068,1.6332665330661322,1.6372745490981964,1.6412825651302605,1.6452905811623246,1.6492985971943888,1.653306613226453,1.657314629258517,1.6613226452905812,1.6653306613226453,1.6693386773547094,1.6733466933867736,1.6773547094188377,1.6813627254509018,1.685370741482966,1.68937875751503,1.6933867735470942,1.6973947895791583,1.7014028056112225,1.7054108216432866,1.7094188376753507,1.7134268537074149,1.717434869739479,1.7214428857715431,1.7254509018036073,1.7294589178356714,1.7334669338677355,1.7374749498997997,1.7414829659318638,1.745490981963928,1.749498997995992,1.7535070140280562,1.7575150300601203,1.7615230460921845,1.7655310621242486,1.7695390781563127,1.7735470941883769,1.777555110220441,1.781563126252505,1.785571142284569,1.7895791583166332,1.7935871743486973,1.7975951903807614,1.8016032064128256,1.8056112224448897,1.8096192384769538,1.813627254509018,1.817635270541082,1.8216432865731462,1.8256513026052104,1.8296593186372745,1.8336673346693386,1.8376753507014028,1.8416833667334669,1.845691382765531,1.8496993987975952,1.8537074148296593,1.8577154308617234,1.8617234468937875,1.8657314629258517,1.8697394789579158,1.87374749498998,1.877755511022044,1.8817635270541082,1.8857715430861723,1.8897795591182365,1.8937875751503006,1.8977955911823647,1.9018036072144289,1.905811623246493,1.9098196392785571,1.9138276553106213,1.9178356713426854,1.9218436873747495,1.9258517034068137,1.9298597194388778,1.933867735470942,1.937875751503006,1.9418837675350702,1.9458917835671343,1.9498997995991985,1.9539078156312626,1.9579158316633267,1.9619238476953909,1.965931863727455,1.9699398797595191,1.9739478957915833,1.9779559118236474,1.9819639278557115,1.9859719438877756,1.9899799599198398,1.993987975951904,1.997995991983968,2.002004008016032,2.006012024048096,2.0100200400801604,2.0140280561122244,2.0180360721442887,2.0220440881763526,2.026052104208417,2.030060120240481,2.0340681362725452,2.038076152304609,2.0420841683366735,2.0460921843687374,2.0501002004008018,2.0541082164328657,2.05811623246493,2.062124248496994,2.0661322645290583,2.070140280561122,2.0741482965931866,2.0781563126252505,2.082164328657315,2.0861723446893787,2.090180360721443,2.094188376753507,2.0981963927855714,2.1022044088176353,2.1062124248496996,2.1102204408817635,2.1142284569138274,2.118236472945892,2.1222444889779557,2.12625250501002,2.130260521042084,2.1342685370741483,2.1382765531062122,2.1422845691382766,2.1462925851703405,2.150300601202405,2.1543086172344688,2.158316633266533,2.162324649298597,2.1663326653306614,2.1703406813627253,2.1743486973947896,2.1783567134268536,2.182364729458918,2.186372745490982,2.190380761523046,2.19438877755511,2.1983967935871744,2.2024048096192383,2.2064128256513027,2.2104208416833666,2.214428857715431,2.218436873747495,2.2224448897795592,2.226452905811623,2.2304609218436875,2.2344689378757514,2.2384769539078158,2.2424849699398797,2.246492985971944,2.250501002004008,2.2545090180360723,2.258517034068136,2.2625250501002006,2.2665330661322645,2.270541082164329,2.2745490981963927,2.278557114228457,2.282565130260521,2.2865731462925853,2.2905811623246493,2.2945891783567136,2.2985971943887775,2.302605210420842,2.306613226452906,2.31062124248497,2.314629258517034,2.3186372745490984,2.3226452905811623,2.3266533066132267,2.3306613226452906,2.3346693386773545,2.338677354709419,2.3426853707414828,2.346693386773547,2.350701402805611,2.3547094188376754,2.3587174348697393,2.3627254509018036,2.3667334669338675,2.370741482965932,2.374749498997996,2.37875751503006,2.382765531062124,2.3867735470941884,2.3907815631262523,2.3947895791583167,2.3987975951903806,2.402805611222445,2.406813627254509,2.4108216432865732,2.414829659318637,2.4188376753507015,2.4228456913827654,2.4268537074148298,2.4308617234468937,2.434869739478958,2.438877755511022,2.4428857715430863,2.44689378757515,2.4509018036072145,2.4549098196392785,2.458917835671343,2.4629258517034067,2.466933867735471,2.470941883767535,2.4749498997995993,2.4789579158316633,2.4829659318637276,2.4869739478957915,2.490981963927856,2.49498997995992,2.498997995991984,2.503006012024048,2.5070140280561124,2.5110220440881763,2.5150300601202407,2.5190380761523046,2.523046092184369,2.527054108216433,2.531062124248497,2.535070140280561,2.5390781563126255,2.5430861723446894,2.5470941883767537,2.5511022044088176,2.555110220440882,2.559118236472946,2.56312625250501,2.567134268537074,2.571142284569138,2.5751503006012024,2.5791583166332663,2.5831663326653307,2.5871743486973946,2.591182364729459,2.595190380761523,2.599198396793587,2.603206412825651,2.6072144288577155,2.6112224448897794,2.6152304609218437,2.6192384769539077,2.623246492985972,2.627254509018036,2.6312625250501003,2.635270541082164,2.6392785571142285,2.6432865731462925,2.647294589178357,2.6513026052104207,2.655310621242485,2.659318637274549,2.6633266533066133,2.6673346693386772,2.6713426853707416,2.6753507014028055,2.67935871743487,2.6833667334669338,2.687374749498998,2.691382765531062,2.6953907815631264,2.6993987975951903,2.7034068136272547,2.7074148296593186,2.711422845691383,2.715430861723447,2.719438877755511,2.723446893787575,2.7274549098196395,2.7314629258517034,2.7354709418837677,2.7394789579158316,2.743486973947896,2.74749498997996,2.7515030060120242,2.755511022044088,2.7595190380761525,2.7635270541082164,2.7675350701402808,2.7715430861723447,2.775551102204409,2.779559118236473,2.783567134268537,2.787575150300601,2.791583166332665,2.7955911823647295,2.7995991983967934,2.8036072144288577,2.8076152304609217,2.811623246492986,2.81563126252505,2.8196392785571143,2.823647294589178,2.8276553106212425,2.8316633266533064,2.835671342685371,2.8396793587174347,2.843687374749499,2.847695390781563,2.8517034068136273,2.8557114228456912,2.8597194388777556,2.8637274549098195,2.867735470941884,2.8717434869739478,2.875751503006012,2.879759519038076,2.8837675350701404,2.8877755511022043,2.8917835671342687,2.8957915831663326,2.899799599198397,2.903807615230461,2.907815631262525,2.911823647294589,2.9158316633266534,2.9198396793587174,2.9238476953907817,2.9278557114228456,2.93186372745491,2.935871743486974,2.9398797595190382,2.943887775551102,2.9478957915831665,2.9519038076152304,2.9559118236472948,2.9599198396793587,2.963927855711423,2.967935871743487,2.9719438877755513,2.975951903807615,2.9799599198396796,2.9839679358717435,2.987975951903808,2.9919839679358717,2.995991983967936,3.0]}

},{}],69:[function(require,module,exports){
module.exports={"expected":[-0.6747409422235527,-0.674985285667842,-0.6752295335756933,-0.6754736859740013,-0.6757177428896854,-0.6759617043496899,-0.6762055703809827,-0.6764493410105566,-0.6766930162654285,-0.6769365961726395,-0.6771800807592543,-0.6774234700523624,-0.6776667640790767,-0.6779099628665344,-0.6781530664418962,-0.6783960748323467,-0.6786389880650939,-0.6788818061673701,-0.6791245291664306,-0.6793671570895541,-0.6796096899640431,-0.679852127817223,-0.680094470676443,-0.6803367185690752,-0.6805788715225146,-0.6808209295641797,-0.6810628927215118,-0.6813047610219752,-0.681546534493057,-0.681788213162267,-0.682029797057138,-0.6822712862052251,-0.6825126806341065,-0.6827539803713825,-0.6829951854446759,-0.6832362958816318,-0.6834773117099182,-0.6837182329572248,-0.6839590596512636,-0.6841997918197686,-0.6844404294904963,-0.6846809726912249,-0.6849214214497543,-0.6851617757939068,-0.6854020357515259,-0.6856422013504772,-0.685882272618648,-0.6861222495839469,-0.6863621322743041,-0.6866019207176716,-0.6868416149420222,-0.6870812149753507,-0.6873207208456726,-0.687560132581025,-0.6877994502094658,-0.6880386737590739,-0.6882778032579497,-0.6885168387342144,-0.6887557802160096,-0.688994627731498,-0.6892333813088632,-0.6894720409763093,-0.6897106067620611,-0.6899490786943637,-0.6901874568014831,-0.6904257411117052,-0.6906639316533367,-0.6909020284547045,-0.6911400315441554,-0.6913779409500567,-0.6916157567007956,-0.6918534788247795,-0.6920911073504358,-0.6923286423062114,-0.6925660837205736,-0.6928034316220089,-0.6930406860390239,-0.6932778470001449,-0.6935149145339176,-0.6937518886689069,-0.6939887694336979,-0.6942255568568945,-0.6944622509671202,-0.6946988517930177,-0.6949353593632488,-0.6951717737064946,-0.6954080948514554,-0.69564432282685,-0.6958804576614166,-0.6961164993839122,-0.6963524480231127,-0.6965883036078125,-0.696824066166825,-0.697059735728982,-0.697295312323134,-0.6975307959781503,-0.6977661867229179,-0.698001484586343,-0.6982366895973497,-0.6984718017848803,-0.6987068211778957,-0.6989417478053748,-0.6991765816963141,-0.6994113228797288,-0.6996459713846519,-0.6998805272401339,-0.7001149904752437,-0.7003493611190675,-0.7005836392007097,-0.7008178247492918,-0.7010519177939534,-0.7012859183638513,-0.7015198264881601,-0.7017536421960714,-0.7019873655167944,-0.7022209964795558,-0.7024545351135991,-0.7026879814481853,-0.7029213355125924,-0.7031545973361154,-0.7033877669480664,-0.7036208443777744,-0.7038538296545852,-0.7040867228078616,-0.7043195238669829,-0.7045522328613454,-0.7047848498203618,-0.7050173747734616,-0.7052498077500905,-0.7054821487797109,-0.7057143978918016,-0.7059465551158577,-0.7061786204813906,-0.7064105940179277,-0.706642475755013,-0.7068742657222064,-0.7071059639490836,-0.7073375704652369,-0.7075690853002738,-0.7078005084838183,-0.7080318400455097,-0.7082630800150036,-0.7084942284219709,-0.7087252852960981,-0.7089562506670878,-0.7091871245646575,-0.7094179070185406,-0.7096485980584856,-0.7098791977142567,-0.7101097060156332,-0.7103401229924096,-0.7105704486743956,-0.7108006830914162,-0.7110308262733113,-0.7112608782499359,-0.7114908390511598,-0.7117207087068681,-0.7119504872469602,-0.7121801747013505,-0.7124097710999685,-0.7126392764727578,-0.712868690849677,-0.713098014260699,-0.7133272467358114,-0.7135563883050163,-0.71378543899833,-0.7140143988457833,-0.7142432678774212,-0.7144720461233027,-0.7147007336135015,-0.714929330378105,-0.7151578364472149,-0.7153862518509466,-0.7156145766194296,-0.7158428107828076,-0.7160709543712377,-0.7162990074148909,-0.7165269699439522,-0.7167548419886197,-0.7169826235791058,-0.717210314745636,-0.7174379155184494,-0.7176654259277988,-0.71789284600395,-0.7181201757771825,-0.7183474152777887,-0.7185745645360748,-0.7188016235823598,-0.7190285924469756,-0.7192554711602678,-0.7194822597525946,-0.7197089582543272,-0.71993556669585,-0.7201620851075597,-0.7203885135198664,-0.7206148519631926,-0.7208411004679737,-0.7210672590646574,-0.7212933277837046,-0.7215193066555882,-0.7217451957107937,-0.7219709949798192,-0.7221967044931751,-0.7224223242813841,-0.7226478543749811,-0.7228732948045136,-0.7230986456005407,-0.723323906793634,-0.7235490784143772,-0.7237741604933658,-0.7239991530612073,-0.7242240561485214,-0.724448869785939,-0.7246735940041037,-0.72489822883367,-0.7251227743053048,-0.7253472304496862,-0.725571597297504,-0.7257958748794596,-0.726020063226266,-0.7262441623686474,-0.7264681723373396,-0.7266920931630896,-0.7269159248766558,-0.7271396675088078,-0.7273633210903263,-0.7275868856520032,-0.7278103612246417,-0.7280337478390558,-0.7282570455260705,-0.7284802543165216,-0.7287033742412563,-0.728926405331132,-0.7291493476170172,-0.7293722011297912,-0.7295949659003439,-0.7298176419595757,-0.7300402293383979,-0.7302627280677318,-0.73048513817851,-0.7307074597016747,-0.730929692668179,-0.7311518371089861,-0.7313738930550696,-0.7315958605374134,-0.7318177395870114,-0.7320395302348676,-0.7322612325119963,-0.7324828464494217,-0.7327043720781783,-0.7329258094293101,-0.7331471585338709,-0.7333684194229251,-0.7335895921275462,-0.7338106766788176,-0.7340316731078326,-0.7342525814456937,-0.7344734017235137,-0.7346941339724142,-0.734914778223527,-0.7351353345079928,-0.7353558028569619,-0.7355761833015941,-0.7357964758730583,-0.7360166806025328,-0.7362367975212051,-0.7364568266602718,-0.7366767680509386,-0.7368966217244205,-0.7371163877119412,-0.7373360660447337,-0.7375556567540394,-0.7377751598711095,-0.7379945754272031,-0.7382139034535887,-0.7384331439815432,-0.7386522970423522,-0.7388713626673103,-0.7390903408877205,-0.739309231734894,-0.7395280352401512,-0.7397467514348203,-0.7399653803502384,-0.7401839220177507,-0.7404023764687109,-0.7406207437344806,-0.7408390238464303,-0.7410572168359381,-0.7412753227343903,-0.7414933415731817,-0.7417112733837148,-0.7419291181973999,-0.7421468760456559,-0.7423645469599092,-0.7425821309715939,-0.7427996281121522,-0.743017038413034,-0.743234361905697,-0.7434515986216066,-0.7436687485922355,-0.7438858118490644,-0.7441027884235814,-0.7443196783472819,-0.7445364816516692,-0.7447531983682537,-0.7449698285285531,-0.7451863721640928,-0.745402829306405,-0.7456191999870295,-0.7458354842375132,-0.74605168208941,-0.7462677935742811,-0.7464838187236946,-0.7466997575692258,-0.7469156101424568,-0.7471313764749765,-0.7473470565983813,-0.7475626505442736,-0.7477781583442632,-0.7479935800299665,-0.7482089156330064,-0.7484241651850126,-0.7486393287176217,-0.7488544062624765,-0.7490693978512264,-0.7492843035155273,-0.7494991232870418,-0.7497138571974387,-0.7499285052783928,-0.7501430675615861,-0.7503575440787059,-0.7505719348614466,-0.7507862399415082,-0.751000459350597,-0.7512145931204256,-0.7514286412827124,-0.7516426038691818,-0.7518564809115647,-0.7520702724415972,-0.7522839784910217,-0.7524975990915865,-0.7527111342750457,-0.7529245840731588,-0.7531379485176914,-0.753351227640415,-0.753564421473106,-0.7537775300475471,-0.7539905533955262,-0.7542034915488369,-0.7544163445392782,-0.7546291123986544,-0.7548417951587755,-0.7550543928514566,-0.7552669055085183,-0.7554793331617862,-0.7556916758430913,-0.7559039335842699,-0.7561161064171634,-0.7563281943736182,-0.7565401974854858,-0.7567521157846226,-0.7569639493028906,-0.7571756980721558,-0.7573873621242898,-0.7575989414911688,-0.7578104362046739,-0.7580218462966911,-0.7582331717991109,-0.7584444127438286,-0.7586555691627441,-0.7588666410877623,-0.7590776285507921,-0.7592885315837474,-0.7594993502185465,-0.7597100844871121,-0.7599207344213712,-0.7601313000532556,-0.7603417814147009,-0.7605521785376476,-0.7607624914540398,-0.7609727201958265,-0.7611828647949607,-0.7613929252833991,-0.761602901693103,-0.7618127940560376,-0.7620226024041724,-0.7622323267694805,-0.7624419671839391,-0.7626515236795294,-0.7628609962882364,-0.763070385042049,-0.76327968997296,-0.7634889111129659,-0.7636980484940666,-0.7639071021482661,-0.764116072107572,-0.7643249584039955,-0.7645337610695512,-0.7647424801362573,-0.7649511156361357,-0.7651596676012116,-0.7653681360635136,-0.7655765210550739,-0.7657848226079278,-0.7659930407541138,-0.7662011755256742,-0.7664092269546541,-0.7666171950731019,-0.7668250799130691,-0.7670328815066106,-0.7672405998857842,-0.7674482350826507,-0.767655787129274,-0.7678632560577208,-0.768070641900061,-0.7682779446883675,-0.7684851644547156,-0.7686923012311839,-0.7688993550498535,-0.7691063259428084,-0.7693132139421353,-0.7695200190799235,-0.7697267413882652,-0.7699333808992549,-0.7701399376449898,-0.7703464116575699,-0.7705528029690971,-0.7707591116116765,-0.7709653376174151,-0.7711714810184226,-0.7713775418468108,-0.7715835201346941,-0.7717894159141889,-0.7719952292174141,-0.772200960076491,-0.7724066085235426,-0.7726121745906942,-0.7728176583100734,-0.7730230597138098,-0.7732283788340352,-0.7734336157028829,-0.7736387703524887,-0.7738438428149902,-0.7740488331225268,-0.7742537413072399,-0.7744585674012726,-0.7746633114367699,-0.7748679734458787,-0.7750725534607471,-0.7752770515135257,-0.775481467636366,-0.7756858018614219,-0.775890054220848,-0.7760942247468012,-0.7762983134714396,-0.776502320426923,-0.7767062456454122,-0.7769100891590701,-0.7771138510000604,-0.7773175312005485,-0.7775211297927009,-0.7777246468086858,-0.777928082280672,-0.7781314362408301,-0.7783347087213317,-0.7785378997543495,-0.7787410093720574,-0.7789440376066303,-0.7791469844902442,-0.7793498500550763,-0.7795526343333046,-0.7797553373571079,-0.7799579591586663,-0.7801604997701606,-0.7803629592237724,-0.7805653375516843,-0.7807676347860796,-0.7809698509591423,-0.7811719861030572,-0.7813740402500098,-0.7815760134321863,-0.7817779056817734,-0.7819797170309585,-0.7821814475119298,-0.7823830971568754,-0.7825846659979846,-0.7827861540674467,-0.7829875613974517,-0.7831888880201899,-0.7833901339678521,-0.7835912992726292,-0.7837923839667126,-0.7839933880822939,-0.7841943116515652,-0.7843951547067183,-0.7845959172799457,-0.7847965994034397,-0.7849972011093931,-0.7851977224299983,-0.7853981633974483],"x":[-0.8,-0.8004008016032064,-0.8008016032064128,-0.8012024048096192,-0.8016032064128257,-0.8020040080160321,-0.8024048096192384,-0.8028056112224449,-0.8032064128256513,-0.8036072144288577,-0.8040080160320642,-0.8044088176352705,-0.8048096192384769,-0.8052104208416834,-0.8056112224448898,-0.8060120240480962,-0.8064128256513026,-0.806813627254509,-0.8072144288577154,-0.8076152304609219,-0.8080160320641283,-0.8084168336673346,-0.8088176352705411,-0.8092184368737475,-0.8096192384769539,-0.8100200400801604,-0.8104208416833667,-0.8108216432865731,-0.8112224448897796,-0.811623246492986,-0.8120240480961923,-0.8124248496993988,-0.8128256513026052,-0.8132264529058116,-0.8136272545090181,-0.8140280561122244,-0.8144288577154308,-0.8148296593186373,-0.8152304609218437,-0.8156312625250501,-0.8160320641282565,-0.8164328657314629,-0.8168336673346693,-0.8172344689378758,-0.8176352705410822,-0.8180360721442885,-0.818436873747495,-0.8188376753507014,-0.8192384769539078,-0.8196392785571143,-0.8200400801603206,-0.820440881763527,-0.8208416833667335,-0.8212424849699399,-0.8216432865731463,-0.8220440881763527,-0.8224448897795591,-0.8228456913827655,-0.823246492985972,-0.8236472945891784,-0.8240480961923847,-0.8244488977955912,-0.8248496993987976,-0.825250501002004,-0.8256513026052105,-0.8260521042084168,-0.8264529058116232,-0.8268537074148297,-0.8272545090180361,-0.8276553106212425,-0.8280561122244489,-0.8284569138276553,-0.8288577154308617,-0.8292585170340682,-0.8296593186372746,-0.8300601202404809,-0.8304609218436874,-0.8308617234468938,-0.8312625250501002,-0.8316633266533067,-0.832064128256513,-0.8324649298597194,-0.8328657314629259,-0.8332665330661323,-0.8336673346693386,-0.8340681362725451,-0.8344689378757515,-0.8348697394789579,-0.8352705410821644,-0.8356713426853707,-0.8360721442885771,-0.8364729458917836,-0.83687374749499,-0.8372745490981964,-0.8376753507014028,-0.8380761523046092,-0.8384769539078156,-0.8388777555110221,-0.8392785571142285,-0.8396793587174348,-0.8400801603206413,-0.8404809619238477,-0.8408817635270541,-0.8412825651302606,-0.8416833667334669,-0.8420841683366733,-0.8424849699398798,-0.8428857715430862,-0.8432865731462926,-0.843687374749499,-0.8440881763527054,-0.8444889779559118,-0.8448897795591183,-0.8452905811623247,-0.845691382765531,-0.8460921843687375,-0.8464929859719439,-0.8468937875751503,-0.8472945891783568,-0.8476953907815631,-0.8480961923847695,-0.848496993987976,-0.8488977955911824,-0.8492985971943888,-0.8496993987975952,-0.8501002004008016,-0.850501002004008,-0.8509018036072145,-0.8513026052104209,-0.8517034068136272,-0.8521042084168337,-0.8525050100200401,-0.8529058116232465,-0.853306613226453,-0.8537074148296593,-0.8541082164328657,-0.8545090180360722,-0.8549098196392786,-0.855310621242485,-0.8557114228456913,-0.8561122244488978,-0.8565130260521042,-0.8569138276553107,-0.857314629258517,-0.8577154308617234,-0.8581162324649299,-0.8585170340681363,-0.8589178356713427,-0.859318637274549,-0.8597194388777555,-0.8601202404809619,-0.8605210420841684,-0.8609218436873748,-0.8613226452905811,-0.8617234468937875,-0.862124248496994,-0.8625250501002004,-0.8629258517034069,-0.8633266533066132,-0.8637274549098196,-0.864128256513026,-0.8645290581162325,-0.8649298597194389,-0.8653306613226452,-0.8657314629258517,-0.8661322645290581,-0.8665330661322646,-0.866933867735471,-0.8673346693386773,-0.8677354709418837,-0.8681362725450902,-0.8685370741482966,-0.868937875751503,-0.8693386773547094,-0.8697394789579158,-0.8701402805611222,-0.8705410821643287,-0.8709418837675351,-0.8713426853707414,-0.8717434869739479,-0.8721442885771543,-0.8725450901803607,-0.8729458917835672,-0.8733466933867735,-0.87374749498998,-0.8741482965931864,-0.8745490981963928,-0.8749498997995993,-0.8753507014028056,-0.875751503006012,-0.8761523046092184,-0.8765531062124249,-0.8769539078156313,-0.8773547094188376,-0.8777555110220441,-0.8781563126252505,-0.878557114228457,-0.8789579158316633,-0.8793587174348697,-0.8797595190380761,-0.8801603206412826,-0.880561122244489,-0.8809619238476953,-0.8813627254509018,-0.8817635270541082,-0.8821643286573146,-0.8825651302605211,-0.8829659318637274,-0.8833667334669338,-0.8837675350701403,-0.8841683366733467,-0.8845691382765531,-0.8849699398797595,-0.8853707414829659,-0.8857715430861723,-0.8861723446893788,-0.8865731462925852,-0.8869739478957915,-0.887374749498998,-0.8877755511022044,-0.8881763527054108,-0.8885771543086173,-0.8889779559118236,-0.88937875751503,-0.8897795591182365,-0.8901803607214429,-0.8905811623246493,-0.8909819639278557,-0.8913827655310621,-0.8917835671342685,-0.892184368737475,-0.8925851703406814,-0.8929859719438877,-0.8933867735470942,-0.8937875751503006,-0.894188376753507,-0.8945891783567135,-0.8949899799599198,-0.8953907815631262,-0.8957915831663327,-0.8961923847695391,-0.8965931863727455,-0.8969939879759519,-0.8973947895791583,-0.8977955911823647,-0.8981963927855712,-0.8985971943887776,-0.8989979959919839,-0.8993987975951904,-0.8997995991983968,-0.9002004008016032,-0.9006012024048096,-0.901002004008016,-0.9014028056112224,-0.9018036072144289,-0.9022044088176353,-0.9026052104208416,-0.9030060120240481,-0.9034068136272545,-0.9038076152304609,-0.9042084168336674,-0.9046092184368737,-0.9050100200400801,-0.9054108216432866,-0.905811623246493,-0.9062124248496994,-0.9066132264529058,-0.9070140280561122,-0.9074148296593186,-0.9078156312625251,-0.9082164328657315,-0.9086172344689378,-0.9090180360721443,-0.9094188376753507,-0.9098196392785571,-0.9102204408817636,-0.9106212424849699,-0.9110220440881763,-0.9114228456913828,-0.9118236472945892,-0.9122244488977956,-0.912625250501002,-0.9130260521042084,-0.9134268537074148,-0.9138276553106213,-0.9142284569138277,-0.914629258517034,-0.9150300601202405,-0.9154308617234469,-0.9158316633266533,-0.9162324649298598,-0.9166332665330661,-0.9170340681362725,-0.917434869739479,-0.9178356713426854,-0.9182364729458918,-0.9186372745490982,-0.9190380761523046,-0.919438877755511,-0.9198396793587175,-0.9202404809619239,-0.9206412825651302,-0.9210420841683367,-0.9214428857715431,-0.9218436873747495,-0.9222444889779559,-0.9226452905811623,-0.9230460921843687,-0.9234468937875752,-0.9238476953907816,-0.9242484969939879,-0.9246492985971944,-0.9250501002004008,-0.9254509018036072,-0.9258517034068137,-0.92625250501002,-0.9266533066132264,-0.9270541082164329,-0.9274549098196393,-0.9278557114228457,-0.928256513026052,-0.9286573146292585,-0.9290581162324649,-0.9294589178356714,-0.9298597194388778,-0.9302605210420841,-0.9306613226452906,-0.931062124248497,-0.9314629258517034,-0.9318637274549099,-0.9322645290581162,-0.9326653306613226,-0.9330661322645291,-0.9334669338677355,-0.9338677354709419,-0.9342685370741483,-0.9346693386773547,-0.9350701402805611,-0.9354709418837676,-0.935871743486974,-0.9362725450901803,-0.9366733466933868,-0.9370741482965932,-0.9374749498997996,-0.9378757515030061,-0.9382765531062124,-0.9386773547094188,-0.9390781563126253,-0.9394789579158317,-0.9398797595190381,-0.9402805611222445,-0.9406813627254509,-0.9410821643286573,-0.9414829659318638,-0.9418837675350702,-0.9422845691382765,-0.942685370741483,-0.9430861723446894,-0.9434869739478958,-0.9438877755511023,-0.9442885771543086,-0.944689378757515,-0.9450901803607215,-0.9454909819639279,-0.9458917835671342,-0.9462925851703406,-0.9466933867735471,-0.9470941883767535,-0.94749498997996,-0.9478957915831663,-0.9482965931863727,-0.9486973947895792,-0.9490981963927856,-0.949498997995992,-0.9498997995991983,-0.9503006012024048,-0.9507014028056112,-0.9511022044088177,-0.9515030060120241,-0.9519038076152304,-0.9523046092184368,-0.9527054108216433,-0.9531062124248497,-0.9535070140280562,-0.9539078156312625,-0.9543086172344689,-0.9547094188376753,-0.9551102204408818,-0.9555110220440882,-0.9559118236472945,-0.956312625250501,-0.9567134268537074,-0.9571142284569139,-0.9575150300601203,-0.9579158316633266,-0.958316633266533,-0.9587174348697395,-0.9591182364729459,-0.9595190380761524,-0.9599198396793587,-0.9603206412825651,-0.9607214428857715,-0.961122244488978,-0.9615230460921844,-0.9619238476953907,-0.9623246492985972,-0.9627254509018036,-0.96312625250501,-0.9635270541082165,-0.9639278557114228,-0.9643286573146292,-0.9647294589178357,-0.9651302605210421,-0.9655310621242486,-0.9659318637274549,-0.9663326653306613,-0.9667334669338677,-0.9671342685370742,-0.9675350701402805,-0.9679358717434869,-0.9683366733466934,-0.9687374749498998,-0.9691382765531062,-0.9695390781563126,-0.969939879759519,-0.9703406813627254,-0.9707414829659319,-0.9711422845691383,-0.9715430861723446,-0.9719438877755511,-0.9723446893787575,-0.972745490981964,-0.9731462925851704,-0.9735470941883767,-0.9739478957915831,-0.9743486973947896,-0.974749498997996,-0.9751503006012024,-0.9755511022044088,-0.9759519038076152,-0.9763527054108216,-0.9767535070140281,-0.9771543086172345,-0.9775551102204408,-0.9779559118236473,-0.9783567134268537,-0.9787575150300601,-0.9791583166332666,-0.9795591182364729,-0.9799599198396793,-0.9803607214428858,-0.9807615230460922,-0.9811623246492986,-0.981563126252505,-0.9819639278557114,-0.9823647294589178,-0.9827655310621243,-0.9831663326653307,-0.983567134268537,-0.9839679358717435,-0.9843687374749499,-0.9847695390781563,-0.9851703406813628,-0.9855711422845691,-0.9859719438877755,-0.986372745490982,-0.9867735470941884,-0.9871743486973948,-0.9875751503006012,-0.9879759519038076,-0.988376753507014,-0.9887775551102205,-0.9891783567134268,-0.9895791583166332,-0.9899799599198397,-0.9903807615230461,-0.9907815631262525,-0.9911823647294589,-0.9915831663326653,-0.9919839679358717,-0.9923847695390782,-0.9927855711422846,-0.9931863727454909,-0.9935871743486974,-0.9939879759519038,-0.9943887775551102,-0.9947895791583167,-0.995190380761523,-0.9955911823647294,-0.9959919839679359,-0.9963927855711423,-0.9967935871743487,-0.9971943887775551,-0.9975951903807615,-0.9979959919839679,-0.9983967935871744,-0.9987975951903808,-0.9991983967935871,-0.9995991983967936,-1.0]}

},{}],70:[function(require,module,exports){
module.exports={"expected":[0.6747409422235527,0.674985285667842,0.6752295335756933,0.6754736859740013,0.6757177428896854,0.6759617043496899,0.6762055703809827,0.6764493410105566,0.6766930162654285,0.6769365961726395,0.6771800807592543,0.6774234700523624,0.6776667640790767,0.6779099628665344,0.6781530664418962,0.6783960748323467,0.6786389880650939,0.6788818061673701,0.6791245291664306,0.6793671570895541,0.6796096899640431,0.679852127817223,0.680094470676443,0.6803367185690752,0.6805788715225146,0.6808209295641797,0.6810628927215118,0.6813047610219752,0.681546534493057,0.681788213162267,0.682029797057138,0.6822712862052251,0.6825126806341065,0.6827539803713825,0.6829951854446759,0.6832362958816318,0.6834773117099182,0.6837182329572248,0.6839590596512636,0.6841997918197686,0.6844404294904963,0.6846809726912249,0.6849214214497543,0.6851617757939068,0.6854020357515259,0.6856422013504772,0.685882272618648,0.6861222495839469,0.6863621322743041,0.6866019207176716,0.6868416149420222,0.6870812149753507,0.6873207208456726,0.687560132581025,0.6877994502094658,0.6880386737590739,0.6882778032579497,0.6885168387342144,0.6887557802160096,0.688994627731498,0.6892333813088632,0.6894720409763093,0.6897106067620611,0.6899490786943637,0.6901874568014831,0.6904257411117052,0.6906639316533367,0.6909020284547045,0.6911400315441554,0.6913779409500567,0.6916157567007956,0.6918534788247795,0.6920911073504358,0.6923286423062114,0.6925660837205736,0.6928034316220089,0.6930406860390239,0.6932778470001449,0.6935149145339176,0.6937518886689069,0.6939887694336979,0.6942255568568945,0.6944622509671202,0.6946988517930177,0.6949353593632488,0.6951717737064946,0.6954080948514554,0.69564432282685,0.6958804576614166,0.6961164993839122,0.6963524480231127,0.6965883036078125,0.696824066166825,0.697059735728982,0.697295312323134,0.6975307959781503,0.6977661867229179,0.698001484586343,0.6982366895973497,0.6984718017848803,0.6987068211778957,0.6989417478053748,0.6991765816963141,0.6994113228797288,0.6996459713846519,0.6998805272401339,0.7001149904752437,0.7003493611190675,0.7005836392007097,0.7008178247492918,0.7010519177939534,0.7012859183638513,0.7015198264881601,0.7017536421960714,0.7019873655167944,0.7022209964795558,0.7024545351135991,0.7026879814481853,0.7029213355125924,0.7031545973361154,0.7033877669480664,0.7036208443777744,0.7038538296545852,0.7040867228078616,0.7043195238669829,0.7045522328613454,0.7047848498203618,0.7050173747734616,0.7052498077500905,0.7054821487797109,0.7057143978918016,0.7059465551158577,0.7061786204813906,0.7064105940179277,0.706642475755013,0.7068742657222064,0.7071059639490836,0.7073375704652369,0.7075690853002738,0.7078005084838183,0.7080318400455097,0.7082630800150036,0.7084942284219709,0.7087252852960981,0.7089562506670878,0.7091871245646575,0.7094179070185406,0.7096485980584856,0.7098791977142567,0.7101097060156332,0.7103401229924096,0.7105704486743956,0.7108006830914162,0.7110308262733113,0.7112608782499359,0.7114908390511598,0.7117207087068681,0.7119504872469602,0.7121801747013505,0.7124097710999685,0.7126392764727578,0.712868690849677,0.713098014260699,0.7133272467358114,0.7135563883050163,0.71378543899833,0.7140143988457833,0.7142432678774212,0.7144720461233027,0.7147007336135015,0.714929330378105,0.7151578364472149,0.7153862518509466,0.7156145766194296,0.7158428107828076,0.7160709543712377,0.7162990074148909,0.7165269699439522,0.7167548419886197,0.7169826235791058,0.717210314745636,0.7174379155184494,0.7176654259277988,0.71789284600395,0.7181201757771825,0.7183474152777887,0.7185745645360748,0.7188016235823598,0.7190285924469756,0.7192554711602678,0.7194822597525946,0.7197089582543272,0.71993556669585,0.7201620851075597,0.7203885135198664,0.7206148519631926,0.7208411004679737,0.7210672590646574,0.7212933277837046,0.7215193066555882,0.7217451957107937,0.7219709949798192,0.7221967044931751,0.7224223242813841,0.7226478543749811,0.7228732948045136,0.7230986456005407,0.723323906793634,0.7235490784143772,0.7237741604933658,0.7239991530612073,0.7242240561485214,0.724448869785939,0.7246735940041037,0.72489822883367,0.7251227743053048,0.7253472304496862,0.725571597297504,0.7257958748794596,0.726020063226266,0.7262441623686474,0.7264681723373396,0.7266920931630896,0.7269159248766558,0.7271396675088078,0.7273633210903263,0.7275868856520032,0.7278103612246417,0.7280337478390558,0.7282570455260705,0.7284802543165216,0.7287033742412563,0.728926405331132,0.7291493476170172,0.7293722011297912,0.7295949659003439,0.7298176419595757,0.7300402293383979,0.7302627280677318,0.73048513817851,0.7307074597016747,0.730929692668179,0.7311518371089861,0.7313738930550696,0.7315958605374134,0.7318177395870114,0.7320395302348676,0.7322612325119963,0.7324828464494217,0.7327043720781783,0.7329258094293101,0.7331471585338709,0.7333684194229251,0.7335895921275462,0.7338106766788176,0.7340316731078326,0.7342525814456937,0.7344734017235137,0.7346941339724142,0.734914778223527,0.7351353345079928,0.7353558028569619,0.7355761833015941,0.7357964758730583,0.7360166806025328,0.7362367975212051,0.7364568266602718,0.7366767680509386,0.7368966217244205,0.7371163877119412,0.7373360660447337,0.7375556567540394,0.7377751598711095,0.7379945754272031,0.7382139034535887,0.7384331439815432,0.7386522970423522,0.7388713626673103,0.7390903408877205,0.739309231734894,0.7395280352401512,0.7397467514348203,0.7399653803502384,0.7401839220177507,0.7404023764687109,0.7406207437344806,0.7408390238464303,0.7410572168359381,0.7412753227343903,0.7414933415731817,0.7417112733837148,0.7419291181973999,0.7421468760456559,0.7423645469599092,0.7425821309715939,0.7427996281121522,0.743017038413034,0.743234361905697,0.7434515986216066,0.7436687485922355,0.7438858118490644,0.7441027884235814,0.7443196783472819,0.7445364816516692,0.7447531983682537,0.7449698285285531,0.7451863721640928,0.745402829306405,0.7456191999870295,0.7458354842375132,0.74605168208941,0.7462677935742811,0.7464838187236946,0.7466997575692258,0.7469156101424568,0.7471313764749765,0.7473470565983813,0.7475626505442736,0.7477781583442632,0.7479935800299665,0.7482089156330064,0.7484241651850126,0.7486393287176217,0.7488544062624765,0.7490693978512264,0.7492843035155273,0.7494991232870418,0.7497138571974387,0.7499285052783928,0.7501430675615861,0.7503575440787059,0.7505719348614466,0.7507862399415082,0.751000459350597,0.7512145931204256,0.7514286412827124,0.7516426038691818,0.7518564809115647,0.7520702724415972,0.7522839784910217,0.7524975990915865,0.7527111342750457,0.7529245840731588,0.7531379485176914,0.753351227640415,0.753564421473106,0.7537775300475471,0.7539905533955262,0.7542034915488369,0.7544163445392782,0.7546291123986544,0.7548417951587755,0.7550543928514566,0.7552669055085183,0.7554793331617862,0.7556916758430913,0.7559039335842699,0.7561161064171634,0.7563281943736182,0.7565401974854858,0.7567521157846226,0.7569639493028906,0.7571756980721558,0.7573873621242898,0.7575989414911688,0.7578104362046739,0.7580218462966911,0.7582331717991109,0.7584444127438286,0.7586555691627441,0.7588666410877623,0.7590776285507921,0.7592885315837474,0.7594993502185465,0.7597100844871121,0.7599207344213712,0.7601313000532556,0.7603417814147009,0.7605521785376476,0.7607624914540398,0.7609727201958265,0.7611828647949607,0.7613929252833991,0.761602901693103,0.7618127940560376,0.7620226024041724,0.7622323267694805,0.7624419671839391,0.7626515236795294,0.7628609962882364,0.763070385042049,0.76327968997296,0.7634889111129659,0.7636980484940666,0.7639071021482661,0.764116072107572,0.7643249584039955,0.7645337610695512,0.7647424801362573,0.7649511156361357,0.7651596676012116,0.7653681360635136,0.7655765210550739,0.7657848226079278,0.7659930407541138,0.7662011755256742,0.7664092269546541,0.7666171950731019,0.7668250799130691,0.7670328815066106,0.7672405998857842,0.7674482350826507,0.767655787129274,0.7678632560577208,0.768070641900061,0.7682779446883675,0.7684851644547156,0.7686923012311839,0.7688993550498535,0.7691063259428084,0.7693132139421353,0.7695200190799235,0.7697267413882652,0.7699333808992549,0.7701399376449898,0.7703464116575699,0.7705528029690971,0.7707591116116765,0.7709653376174151,0.7711714810184226,0.7713775418468108,0.7715835201346941,0.7717894159141889,0.7719952292174141,0.772200960076491,0.7724066085235426,0.7726121745906942,0.7728176583100734,0.7730230597138098,0.7732283788340352,0.7734336157028829,0.7736387703524887,0.7738438428149902,0.7740488331225268,0.7742537413072399,0.7744585674012726,0.7746633114367699,0.7748679734458787,0.7750725534607471,0.7752770515135257,0.775481467636366,0.7756858018614219,0.775890054220848,0.7760942247468012,0.7762983134714396,0.776502320426923,0.7767062456454122,0.7769100891590701,0.7771138510000604,0.7773175312005485,0.7775211297927009,0.7777246468086858,0.777928082280672,0.7781314362408301,0.7783347087213317,0.7785378997543495,0.7787410093720574,0.7789440376066303,0.7791469844902442,0.7793498500550763,0.7795526343333046,0.7797553373571079,0.7799579591586663,0.7801604997701606,0.7803629592237724,0.7805653375516843,0.7807676347860796,0.7809698509591423,0.7811719861030572,0.7813740402500098,0.7815760134321863,0.7817779056817734,0.7819797170309585,0.7821814475119298,0.7823830971568754,0.7825846659979846,0.7827861540674467,0.7829875613974517,0.7831888880201899,0.7833901339678521,0.7835912992726292,0.7837923839667126,0.7839933880822939,0.7841943116515652,0.7843951547067183,0.7845959172799457,0.7847965994034397,0.7849972011093931,0.7851977224299983,0.7853981633974483],"x":[0.8,0.8004008016032064,0.8008016032064128,0.8012024048096192,0.8016032064128257,0.8020040080160321,0.8024048096192384,0.8028056112224449,0.8032064128256513,0.8036072144288577,0.8040080160320642,0.8044088176352705,0.8048096192384769,0.8052104208416834,0.8056112224448898,0.8060120240480962,0.8064128256513026,0.806813627254509,0.8072144288577154,0.8076152304609219,0.8080160320641283,0.8084168336673346,0.8088176352705411,0.8092184368737475,0.8096192384769539,0.8100200400801604,0.8104208416833667,0.8108216432865731,0.8112224448897796,0.811623246492986,0.8120240480961923,0.8124248496993988,0.8128256513026052,0.8132264529058116,0.8136272545090181,0.8140280561122244,0.8144288577154308,0.8148296593186373,0.8152304609218437,0.8156312625250501,0.8160320641282565,0.8164328657314629,0.8168336673346693,0.8172344689378758,0.8176352705410822,0.8180360721442885,0.818436873747495,0.8188376753507014,0.8192384769539078,0.8196392785571143,0.8200400801603206,0.820440881763527,0.8208416833667335,0.8212424849699399,0.8216432865731463,0.8220440881763527,0.8224448897795591,0.8228456913827655,0.823246492985972,0.8236472945891784,0.8240480961923847,0.8244488977955912,0.8248496993987976,0.825250501002004,0.8256513026052105,0.8260521042084168,0.8264529058116232,0.8268537074148297,0.8272545090180361,0.8276553106212425,0.8280561122244489,0.8284569138276553,0.8288577154308617,0.8292585170340682,0.8296593186372746,0.8300601202404809,0.8304609218436874,0.8308617234468938,0.8312625250501002,0.8316633266533067,0.832064128256513,0.8324649298597194,0.8328657314629259,0.8332665330661323,0.8336673346693386,0.8340681362725451,0.8344689378757515,0.8348697394789579,0.8352705410821644,0.8356713426853707,0.8360721442885771,0.8364729458917836,0.83687374749499,0.8372745490981964,0.8376753507014028,0.8380761523046092,0.8384769539078156,0.8388777555110221,0.8392785571142285,0.8396793587174348,0.8400801603206413,0.8404809619238477,0.8408817635270541,0.8412825651302606,0.8416833667334669,0.8420841683366733,0.8424849699398798,0.8428857715430862,0.8432865731462926,0.843687374749499,0.8440881763527054,0.8444889779559118,0.8448897795591183,0.8452905811623247,0.845691382765531,0.8460921843687375,0.8464929859719439,0.8468937875751503,0.8472945891783568,0.8476953907815631,0.8480961923847695,0.848496993987976,0.8488977955911824,0.8492985971943888,0.8496993987975952,0.8501002004008016,0.850501002004008,0.8509018036072145,0.8513026052104209,0.8517034068136272,0.8521042084168337,0.8525050100200401,0.8529058116232465,0.853306613226453,0.8537074148296593,0.8541082164328657,0.8545090180360722,0.8549098196392786,0.855310621242485,0.8557114228456913,0.8561122244488978,0.8565130260521042,0.8569138276553107,0.857314629258517,0.8577154308617234,0.8581162324649299,0.8585170340681363,0.8589178356713427,0.859318637274549,0.8597194388777555,0.8601202404809619,0.8605210420841684,0.8609218436873748,0.8613226452905811,0.8617234468937875,0.862124248496994,0.8625250501002004,0.8629258517034069,0.8633266533066132,0.8637274549098196,0.864128256513026,0.8645290581162325,0.8649298597194389,0.8653306613226452,0.8657314629258517,0.8661322645290581,0.8665330661322646,0.866933867735471,0.8673346693386773,0.8677354709418837,0.8681362725450902,0.8685370741482966,0.868937875751503,0.8693386773547094,0.8697394789579158,0.8701402805611222,0.8705410821643287,0.8709418837675351,0.8713426853707414,0.8717434869739479,0.8721442885771543,0.8725450901803607,0.8729458917835672,0.8733466933867735,0.87374749498998,0.8741482965931864,0.8745490981963928,0.8749498997995993,0.8753507014028056,0.875751503006012,0.8761523046092184,0.8765531062124249,0.8769539078156313,0.8773547094188376,0.8777555110220441,0.8781563126252505,0.878557114228457,0.8789579158316633,0.8793587174348697,0.8797595190380761,0.8801603206412826,0.880561122244489,0.8809619238476953,0.8813627254509018,0.8817635270541082,0.8821643286573146,0.8825651302605211,0.8829659318637274,0.8833667334669338,0.8837675350701403,0.8841683366733467,0.8845691382765531,0.8849699398797595,0.8853707414829659,0.8857715430861723,0.8861723446893788,0.8865731462925852,0.8869739478957915,0.887374749498998,0.8877755511022044,0.8881763527054108,0.8885771543086173,0.8889779559118236,0.88937875751503,0.8897795591182365,0.8901803607214429,0.8905811623246493,0.8909819639278557,0.8913827655310621,0.8917835671342685,0.892184368737475,0.8925851703406814,0.8929859719438877,0.8933867735470942,0.8937875751503006,0.894188376753507,0.8945891783567135,0.8949899799599198,0.8953907815631262,0.8957915831663327,0.8961923847695391,0.8965931863727455,0.8969939879759519,0.8973947895791583,0.8977955911823647,0.8981963927855712,0.8985971943887776,0.8989979959919839,0.8993987975951904,0.8997995991983968,0.9002004008016032,0.9006012024048096,0.901002004008016,0.9014028056112224,0.9018036072144289,0.9022044088176353,0.9026052104208416,0.9030060120240481,0.9034068136272545,0.9038076152304609,0.9042084168336674,0.9046092184368737,0.9050100200400801,0.9054108216432866,0.905811623246493,0.9062124248496994,0.9066132264529058,0.9070140280561122,0.9074148296593186,0.9078156312625251,0.9082164328657315,0.9086172344689378,0.9090180360721443,0.9094188376753507,0.9098196392785571,0.9102204408817636,0.9106212424849699,0.9110220440881763,0.9114228456913828,0.9118236472945892,0.9122244488977956,0.912625250501002,0.9130260521042084,0.9134268537074148,0.9138276553106213,0.9142284569138277,0.914629258517034,0.9150300601202405,0.9154308617234469,0.9158316633266533,0.9162324649298598,0.9166332665330661,0.9170340681362725,0.917434869739479,0.9178356713426854,0.9182364729458918,0.9186372745490982,0.9190380761523046,0.919438877755511,0.9198396793587175,0.9202404809619239,0.9206412825651302,0.9210420841683367,0.9214428857715431,0.9218436873747495,0.9222444889779559,0.9226452905811623,0.9230460921843687,0.9234468937875752,0.9238476953907816,0.9242484969939879,0.9246492985971944,0.9250501002004008,0.9254509018036072,0.9258517034068137,0.92625250501002,0.9266533066132264,0.9270541082164329,0.9274549098196393,0.9278557114228457,0.928256513026052,0.9286573146292585,0.9290581162324649,0.9294589178356714,0.9298597194388778,0.9302605210420841,0.9306613226452906,0.931062124248497,0.9314629258517034,0.9318637274549099,0.9322645290581162,0.9326653306613226,0.9330661322645291,0.9334669338677355,0.9338677354709419,0.9342685370741483,0.9346693386773547,0.9350701402805611,0.9354709418837676,0.935871743486974,0.9362725450901803,0.9366733466933868,0.9370741482965932,0.9374749498997996,0.9378757515030061,0.9382765531062124,0.9386773547094188,0.9390781563126253,0.9394789579158317,0.9398797595190381,0.9402805611222445,0.9406813627254509,0.9410821643286573,0.9414829659318638,0.9418837675350702,0.9422845691382765,0.942685370741483,0.9430861723446894,0.9434869739478958,0.9438877755511023,0.9442885771543086,0.944689378757515,0.9450901803607215,0.9454909819639279,0.9458917835671342,0.9462925851703406,0.9466933867735471,0.9470941883767535,0.94749498997996,0.9478957915831663,0.9482965931863727,0.9486973947895792,0.9490981963927856,0.949498997995992,0.9498997995991983,0.9503006012024048,0.9507014028056112,0.9511022044088177,0.9515030060120241,0.9519038076152304,0.9523046092184368,0.9527054108216433,0.9531062124248497,0.9535070140280562,0.9539078156312625,0.9543086172344689,0.9547094188376753,0.9551102204408818,0.9555110220440882,0.9559118236472945,0.956312625250501,0.9567134268537074,0.9571142284569139,0.9575150300601203,0.9579158316633266,0.958316633266533,0.9587174348697395,0.9591182364729459,0.9595190380761524,0.9599198396793587,0.9603206412825651,0.9607214428857715,0.961122244488978,0.9615230460921844,0.9619238476953907,0.9623246492985972,0.9627254509018036,0.96312625250501,0.9635270541082165,0.9639278557114228,0.9643286573146292,0.9647294589178357,0.9651302605210421,0.9655310621242486,0.9659318637274549,0.9663326653306613,0.9667334669338677,0.9671342685370742,0.9675350701402805,0.9679358717434869,0.9683366733466934,0.9687374749498998,0.9691382765531062,0.9695390781563126,0.969939879759519,0.9703406813627254,0.9707414829659319,0.9711422845691383,0.9715430861723446,0.9719438877755511,0.9723446893787575,0.972745490981964,0.9731462925851704,0.9735470941883767,0.9739478957915831,0.9743486973947896,0.974749498997996,0.9751503006012024,0.9755511022044088,0.9759519038076152,0.9763527054108216,0.9767535070140281,0.9771543086172345,0.9775551102204408,0.9779559118236473,0.9783567134268537,0.9787575150300601,0.9791583166332666,0.9795591182364729,0.9799599198396793,0.9803607214428858,0.9807615230460922,0.9811623246492986,0.981563126252505,0.9819639278557114,0.9823647294589178,0.9827655310621243,0.9831663326653307,0.983567134268537,0.9839679358717435,0.9843687374749499,0.9847695390781563,0.9851703406813628,0.9855711422845691,0.9859719438877755,0.986372745490982,0.9867735470941884,0.9871743486973948,0.9875751503006012,0.9879759519038076,0.988376753507014,0.9887775551102205,0.9891783567134268,0.9895791583166332,0.9899799599198397,0.9903807615230461,0.9907815631262525,0.9911823647294589,0.9915831663326653,0.9919839679358717,0.9923847695390782,0.9927855711422846,0.9931863727454909,0.9935871743486974,0.9939879759519038,0.9943887775551102,0.9947895791583167,0.995190380761523,0.9955911823647294,0.9959919839679359,0.9963927855711423,0.9967935871743487,0.9971943887775551,0.9975951903807615,0.9979959919839679,0.9983967935871744,0.9987975951903808,0.9991983967935871,0.9995991983967936,1.0]}

},{}],71:[function(require,module,exports){
module.exports={"expected":[-0.6747409422235527,-0.6727827521382143,-0.6708184323091616,-0.6688479691394533,-0.6668713491377914,-0.6648885589208774,-0.6628995852157924,-0.6609044148624001,-0.6589030348157728,-0.6568954321486407,-0.6548815940538645,-0.6528615078469313,-0.6508351609684729,-0.648802540986808,-0.6467636356005062,-0.6447184326409763,-0.6426669200750761,-0.6406090860077449,-0.6385449186846608,-0.6364744064949163,-0.6343975379737208,-0.6323143018051223,-0.6302246868247519,-0.6281286820225912,-0.6260262765457607,-0.6239174597013291,-0.6218022209591462,-0.6196805499546949,-0.6175524364919655,-0.6154178705463507,-0.6132768422675612,-0.6111293419825619,-0.6089753601985274,-0.6068148876058195,-0.6046479150809823,-0.6024744336897581,-0.6002944346901217,-0.5981079095353344,-0.5959148498770157,-0.5937152475682343,-0.5915090946666158,-0.5892963834374689,-0.587077106356929,-0.584851256115118,-0.5826188256193212,-0.58037980799718,-0.5781341965999005,-0.5758819850054774,-0.5736231670219331,-0.5713577366905701,-0.5690856882892396,-0.5668070163356209,-0.5645217155905161,-0.5622297810611567,-0.559931208004521,-0.5576259919306651,-0.5553141286060634,-0.5529956140569602,-0.5506704445727307,-0.5483386167092519,-0.5460001272922813,-0.5436549734208448,-0.541303152470631,-0.5389446620973928,-0.5365795002403555,-0.5342076651256293,-0.5318291552696282,-0.5294439694824906,-0.5270521068715062,-0.5246535668445435,-0.5222483491134791,-0.5198364536976297,-0.5174178809271831,-0.5149926314466292,-0.5125607062181893,-0.5101221065252444,-0.5076768339757592,-0.5052248905057036,-0.5027662783824686,-0.5003010002082765,-0.4978290589235862,-0.49535045781048925,-0.49286520049609867,-0.4903732909559286,-0.48787473351726257,-0.4853695328625126,-0.4828576940325641,-0.4803392224301086,-0.4778141238229628,-0.4752824043473707,-0.4727440705112911,-0.4701991291976673,-0.46764758766767756,-0.46508945356396725,-0.4625247349138595,-0.45995344013254447,-0.45737557802624584,-0.45479115779536305,-0.4522001890375886,-0.44960268175099866,-0.4469986463371167,-0.4443880936039483,-0.4417710347689854,-0.43914748146218036,-0.4365174457288873,-0.4338809400327697,-0.43123797725867374,-0.4285885707154645,-0.42593273413882665,-0.4232704816940246,-0.4206018279786242,-0.4179267880251726,-0.415245377303836,-0.4125576117249935,-0.4098635076417863,-0.4071630818526198,-0.4044563516036189,-0.401743334591034,-0.39902404896359656,-0.39629851332482313,-0.3935667467352668,-0.39082876871471406,-0.3880845992443258,-0.38533425876872224,-0.38257776819800854,-0.379815148909742,-0.37704642275083716,-0.3742716120394094,-0.3714907395665551,-0.3687038285980661,-0.36591090287607897,-0.3631119866206558,-0.36030710453129694,-0.35749628178838316,-0.35467954405454655,-0.3518569174759685,-0.34902842868360406,-0.3461941047943308,-0.3433539734120211,-0.3405080626285368,-0.33765640102464456,-0.3347990176708517,-0.3319359421281596,-0.3290672044487352,-0.32619283517649866,-0.3233128653476254,-0.32042732649096256,-0.3175362506283582,-0.3146396702749019,-0.31173761843907594,-0.3088301286228157,-0.3059172348214792,-0.3029989715237231,-0.30007537371128573,-0.29714647685867496,-0.29421231693276106,-0.2912729303922726,-0.28832835418719516,-0.2853786257580715,-0.28242378303520305,-0.2794638644377508,-0.2764989088727359,-0.27352895573393865,-0.27055404490069485,-0.2675742167365898,-0.26458951208804826,-0.2615999722828201,-0.25860563912836154,-0.2556065549101104,-0.25260276238965595,-0.2495943048028018,-0.2465812258575224,-0.24356356973181206,-0.2405413810714261,-0.2375147049875143,-0.23448358705414596,-0.2314480733057263,-0.2284082102343044,-0.2253640447867719,-0.22231562436195287,-0.21926299680758432,-0.21620621041718807,-0.21314531392683272,-0.21008035651178733,-0.2070113877830653,-0.20393845778386013,-0.20086161698587202,-0.1977809162855263,-0.1946964070000835,-0.19160814086364208,-0.18851617002303298,-0.18542054703360808,-0.18232132485492128,-0.17921855684630433,-0.1761122967623367,-0.17300259874821092,-0.1698895173349938,-0.1667731074347842,-0.16365342433576816,-0.16053052369717224,-0.15740446154411594,-0.15427529426236405,-0.1511430785929801,-0.14800787162688142,-0.1448697307992978,-0.14172871388413355,-0.13858487898823557,-0.13543828454556744,-0.13228898931129146,-0.12913705235575965,-0.12598253305841547,-0.12282549110160676,-0.11966598646431255,-0.11650407941578417,-0.11333983050910279,-0.11017330057465481,-0.10700455071352669,-0.10383364229082076,-0.1006606369288941,-0.09748559650052172,-0.09430858312198631,-0.09112965914609601,-0.0879488871551323,-0.08476632995372972,-0.08158205056168964,-0.07839611220672973,-0.07520857831717137,-0.0720195125145669,-0.06882897860626895,-0.06563704057794381,-0.06244376258603102,-0.05924920895015143,-0.056053444145465786,-0.052856532794986255,-0.04965853966184298,-0.04645952964150798,-0.04325956775397884,-0.04005871913592429,-0.03685704903279419,-0.033654622790896226,-0.030451505849441764,-0.02724776373256313,-0.02404346204130491,-0.020838666445591576,-0.017633442676173977,-0.014427856516557067,-0.011221973794911449,-0.008015860375971122,-0.004809582152919986,-0.0016032050392695586,0.0016032050392695586,0.004809582152919986,0.008015860375971122,0.011221973794911449,0.014427856516557067,0.017633442676173977,0.020838666445591576,0.02404346204130491,0.02724776373256313,0.030451505849441764,0.033654622790896226,0.03685704903279419,0.04005871913592429,0.04325956775397884,0.04645952964150798,0.04965853966184298,0.052856532794986255,0.056053444145465786,0.05924920895015143,0.06244376258603102,0.06563704057794381,0.06882897860626895,0.0720195125145669,0.07520857831717137,0.07839611220672973,0.08158205056168964,0.08476632995372972,0.0879488871551323,0.09112965914609601,0.09430858312198631,0.09748559650052172,0.1006606369288941,0.10383364229082076,0.10700455071352669,0.11017330057465481,0.11333983050910279,0.11650407941578417,0.11966598646431255,0.12282549110160676,0.12598253305841547,0.12913705235575965,0.13228898931129146,0.13543828454556744,0.13858487898823557,0.14172871388413355,0.1448697307992978,0.14800787162688142,0.1511430785929801,0.15427529426236405,0.15740446154411594,0.16053052369717224,0.16365342433576816,0.1667731074347842,0.1698895173349938,0.17300259874821092,0.1761122967623367,0.17921855684630433,0.18232132485492128,0.18542054703360808,0.18851617002303298,0.19160814086364208,0.1946964070000835,0.1977809162855263,0.20086161698587202,0.20393845778386013,0.2070113877830653,0.21008035651178733,0.21314531392683272,0.21620621041718807,0.21926299680758432,0.22231562436195287,0.2253640447867719,0.2284082102343044,0.2314480733057263,0.23448358705414596,0.2375147049875143,0.2405413810714261,0.24356356973181206,0.2465812258575224,0.2495943048028018,0.25260276238965595,0.2556065549101104,0.25860563912836154,0.2615999722828201,0.26458951208804826,0.2675742167365898,0.27055404490069485,0.27352895573393865,0.2764989088727359,0.2794638644377508,0.28242378303520305,0.2853786257580715,0.28832835418719516,0.2912729303922726,0.29421231693276106,0.29714647685867496,0.30007537371128573,0.3029989715237231,0.3059172348214792,0.3088301286228157,0.31173761843907594,0.3146396702749019,0.3175362506283582,0.32042732649096256,0.3233128653476254,0.32619283517649866,0.3290672044487352,0.3319359421281596,0.3347990176708517,0.33765640102464456,0.3405080626285368,0.3433539734120211,0.3461941047943308,0.34902842868360406,0.3518569174759685,0.35467954405454655,0.35749628178838316,0.36030710453129694,0.3631119866206558,0.36591090287607897,0.3687038285980661,0.3714907395665551,0.3742716120394094,0.37704642275083716,0.379815148909742,0.38257776819800854,0.38533425876872224,0.3880845992443258,0.39082876871471406,0.3935667467352668,0.39629851332482313,0.39902404896359656,0.401743334591034,0.4044563516036189,0.4071630818526198,0.4098635076417863,0.4125576117249935,0.415245377303836,0.4179267880251726,0.4206018279786242,0.4232704816940246,0.42593273413882665,0.4285885707154645,0.43123797725867374,0.4338809400327697,0.4365174457288873,0.43914748146218036,0.4417710347689854,0.4443880936039483,0.4469986463371167,0.44960268175099866,0.4522001890375886,0.45479115779536305,0.45737557802624584,0.45995344013254447,0.4625247349138595,0.46508945356396725,0.46764758766767756,0.4701991291976673,0.4727440705112911,0.4752824043473707,0.4778141238229628,0.4803392224301086,0.4828576940325641,0.4853695328625126,0.48787473351726257,0.4903732909559286,0.49286520049609867,0.49535045781048925,0.4978290589235862,0.5003010002082765,0.5027662783824686,0.5052248905057036,0.5076768339757592,0.5101221065252444,0.5125607062181893,0.5149926314466292,0.5174178809271831,0.5198364536976297,0.5222483491134791,0.5246535668445435,0.5270521068715062,0.5294439694824906,0.5318291552696282,0.5342076651256293,0.5365795002403555,0.5389446620973928,0.541303152470631,0.5436549734208448,0.5460001272922813,0.5483386167092519,0.5506704445727307,0.5529956140569602,0.5553141286060634,0.5576259919306651,0.559931208004521,0.5622297810611567,0.5645217155905161,0.5668070163356209,0.5690856882892396,0.5713577366905701,0.5736231670219331,0.5758819850054774,0.5781341965999005,0.58037980799718,0.5826188256193212,0.584851256115118,0.587077106356929,0.5892963834374689,0.5915090946666158,0.5937152475682343,0.5959148498770157,0.5981079095353344,0.6002944346901217,0.6024744336897581,0.6046479150809823,0.6068148876058195,0.6089753601985274,0.6111293419825619,0.6132768422675612,0.6154178705463507,0.6175524364919655,0.6196805499546949,0.6218022209591462,0.6239174597013291,0.6260262765457607,0.6281286820225912,0.6302246868247519,0.6323143018051223,0.6343975379737208,0.6364744064949163,0.6385449186846608,0.6406090860077449,0.6426669200750761,0.6447184326409763,0.6467636356005062,0.648802540986808,0.6508351609684729,0.6528615078469313,0.6548815940538645,0.6568954321486407,0.6589030348157728,0.6609044148624001,0.6628995852157924,0.6648885589208774,0.6668713491377914,0.6688479691394533,0.6708184323091616,0.6727827521382143,0.6747409422235527],"x":[-0.8,-0.7967935871743487,-0.7935871743486974,-0.790380761523046,-0.7871743486973948,-0.7839679358717435,-0.7807615230460921,-0.7775551102204409,-0.7743486973947896,-0.7711422845691382,-0.767935871743487,-0.7647294589178357,-0.7615230460921844,-0.7583166332665331,-0.7551102204408817,-0.7519038076152305,-0.7486973947895792,-0.7454909819639278,-0.7422845691382766,-0.7390781563126253,-0.7358717434869739,-0.7326653306613227,-0.7294589178356713,-0.72625250501002,-0.7230460921843688,-0.7198396793587174,-0.7166332665330661,-0.7134268537074149,-0.7102204408817635,-0.7070140280561122,-0.7038076152304609,-0.7006012024048096,-0.6973947895791583,-0.694188376753507,-0.6909819639278557,-0.6877755511022045,-0.6845691382765531,-0.6813627254509018,-0.6781563126252504,-0.6749498997995992,-0.6717434869739479,-0.6685370741482966,-0.6653306613226453,-0.662124248496994,-0.6589178356713427,-0.6557114228456914,-0.6525050100200401,-0.6492985971943888,-0.6460921843687375,-0.6428857715430861,-0.6396793587174349,-0.6364729458917836,-0.6332665330661322,-0.630060120240481,-0.6268537074148297,-0.6236472945891783,-0.6204408817635271,-0.6172344689378757,-0.6140280561122244,-0.6108216432865732,-0.6076152304609218,-0.6044088176352705,-0.6012024048096193,-0.5979959919839679,-0.5947895791583167,-0.5915831663326653,-0.588376753507014,-0.5851703406813628,-0.5819639278557114,-0.5787575150300601,-0.5755511022044089,-0.5723446893787575,-0.5691382765531062,-0.565931863727455,-0.5627254509018036,-0.5595190380761523,-0.556312625250501,-0.5531062124248497,-0.5498997995991984,-0.5466933867735471,-0.5434869739478958,-0.5402805611222445,-0.5370741482965932,-0.5338677354709419,-0.5306613226452905,-0.5274549098196393,-0.524248496993988,-0.5210420841683366,-0.5178356713426854,-0.5146292585170341,-0.5114228456913827,-0.5082164328657315,-0.5050100200400801,-0.5018036072144288,-0.49859719438877753,-0.49539078156312627,-0.49218436873747495,-0.48897795591182364,-0.4857715430861723,-0.48256513026052106,-0.47935871743486974,-0.4761523046092184,-0.4729458917835671,-0.46973947895791585,-0.46653306613226453,-0.4633266533066132,-0.46012024048096195,-0.45691382765531063,-0.4537074148296593,-0.450501002004008,-0.44729458917835674,-0.4440881763527054,-0.4408817635270541,-0.4376753507014028,-0.4344689378757515,-0.4312625250501002,-0.4280561122244489,-0.4248496993987976,-0.4216432865731463,-0.418436873747495,-0.4152304609218437,-0.41202404809619236,-0.4088176352705411,-0.4056112224448898,-0.40240480961923847,-0.39919839679358715,-0.3959919839679359,-0.3927855711422846,-0.38957915831663326,-0.38637274549098194,-0.3831663326653307,-0.37995991983967936,-0.37675350701402804,-0.3735470941883767,-0.37034068136272547,-0.36713426853707415,-0.36392785571142283,-0.36072144288577157,-0.35751503006012025,-0.35430861723446894,-0.3511022044088176,-0.34789579158316636,-0.34468937875751504,-0.3414829659318637,-0.3382765531062124,-0.33507014028056115,-0.33186372745490983,-0.3286573146292585,-0.3254509018036072,-0.32224448897795593,-0.3190380761523046,-0.3158316633266533,-0.312625250501002,-0.3094188376753507,-0.3062124248496994,-0.3030060120240481,-0.29979959919839677,-0.2965931863727455,-0.2933867735470942,-0.2901803607214429,-0.28697394789579156,-0.2837675350701403,-0.280561122244489,-0.27735470941883766,-0.27414829659318635,-0.2709418837675351,-0.26773547094188377,-0.26452905811623245,-0.26132264529058113,-0.2581162324649299,-0.25490981963927856,-0.25170340681362724,-0.24849699398797595,-0.24529058116232466,-0.24208416833667334,-0.23887775551102206,-0.23567134268537074,-0.23246492985971945,-0.22925851703406813,-0.22605210420841684,-0.22284569138276553,-0.21963927855711424,-0.21643286573146292,-0.21322645290581163,-0.21002004008016031,-0.20681362725450902,-0.2036072144288577,-0.20040080160320642,-0.1971943887775551,-0.1939879759519038,-0.1907815631262525,-0.1875751503006012,-0.1843687374749499,-0.1811623246492986,-0.17795591182364728,-0.174749498997996,-0.17154308617234468,-0.1683366733466934,-0.16513026052104207,-0.16192384769539078,-0.15871743486973947,-0.15551102204408818,-0.1523046092184369,-0.14909819639278557,-0.14589178356713428,-0.14268537074148296,-0.13947895791583168,-0.13627254509018036,-0.13306613226452907,-0.12985971943887775,-0.12665330661322646,-0.12344689378757515,-0.12024048096192384,-0.11703406813627254,-0.11382765531062124,-0.11062124248496993,-0.10741482965931863,-0.10420841683366733,-0.10100200400801604,-0.09779559118236474,-0.09458917835671343,-0.09138276553106213,-0.08817635270541083,-0.08496993987975952,-0.08176352705410822,-0.07855711422845692,-0.07535070140280561,-0.07214428857715431,-0.06893787575150301,-0.0657314629258517,-0.0625250501002004,-0.0593186372745491,-0.056112224448897796,-0.05290581162324649,-0.04969939879759519,-0.04649298597194389,-0.043286573146292584,-0.04008016032064128,-0.03687374749498998,-0.033667334669338675,-0.030460921843687375,-0.027254509018036072,-0.02404809619238477,-0.020841683366733466,-0.017635270541082163,-0.014428857715430862,-0.011222444889779559,-0.008016032064128256,-0.004809619238476954,-0.0016032064128256513,0.0016032064128256513,0.004809619238476954,0.008016032064128256,0.011222444889779559,0.014428857715430862,0.017635270541082163,0.020841683366733466,0.02404809619238477,0.027254509018036072,0.030460921843687375,0.033667334669338675,0.03687374749498998,0.04008016032064128,0.043286573146292584,0.04649298597194389,0.04969939879759519,0.05290581162324649,0.056112224448897796,0.0593186372745491,0.0625250501002004,0.0657314629258517,0.06893787575150301,0.07214428857715431,0.07535070140280561,0.07855711422845692,0.08176352705410822,0.08496993987975952,0.08817635270541083,0.09138276553106213,0.09458917835671343,0.09779559118236474,0.10100200400801604,0.10420841683366733,0.10741482965931863,0.11062124248496993,0.11382765531062124,0.11703406813627254,0.12024048096192384,0.12344689378757515,0.12665330661322646,0.12985971943887775,0.13306613226452907,0.13627254509018036,0.13947895791583168,0.14268537074148296,0.14589178356713428,0.14909819639278557,0.1523046092184369,0.15551102204408818,0.15871743486973947,0.16192384769539078,0.16513026052104207,0.1683366733466934,0.17154308617234468,0.174749498997996,0.17795591182364728,0.1811623246492986,0.1843687374749499,0.1875751503006012,0.1907815631262525,0.1939879759519038,0.1971943887775551,0.20040080160320642,0.2036072144288577,0.20681362725450902,0.21002004008016031,0.21322645290581163,0.21643286573146292,0.21963927855711424,0.22284569138276553,0.22605210420841684,0.22925851703406813,0.23246492985971945,0.23567134268537074,0.23887775551102206,0.24208416833667334,0.24529058116232466,0.24849699398797595,0.25170340681362724,0.25490981963927856,0.2581162324649299,0.26132264529058113,0.26452905811623245,0.26773547094188377,0.2709418837675351,0.27414829659318635,0.27735470941883766,0.280561122244489,0.2837675350701403,0.28697394789579156,0.2901803607214429,0.2933867735470942,0.2965931863727455,0.29979959919839677,0.3030060120240481,0.3062124248496994,0.3094188376753507,0.312625250501002,0.3158316633266533,0.3190380761523046,0.32224448897795593,0.3254509018036072,0.3286573146292585,0.33186372745490983,0.33507014028056115,0.3382765531062124,0.3414829659318637,0.34468937875751504,0.34789579158316636,0.3511022044088176,0.35430861723446894,0.35751503006012025,0.36072144288577157,0.36392785571142283,0.36713426853707415,0.37034068136272547,0.3735470941883767,0.37675350701402804,0.37995991983967936,0.3831663326653307,0.38637274549098194,0.38957915831663326,0.3927855711422846,0.3959919839679359,0.39919839679358715,0.40240480961923847,0.4056112224448898,0.4088176352705411,0.41202404809619236,0.4152304609218437,0.418436873747495,0.4216432865731463,0.4248496993987976,0.4280561122244489,0.4312625250501002,0.4344689378757515,0.4376753507014028,0.4408817635270541,0.4440881763527054,0.44729458917835674,0.450501002004008,0.4537074148296593,0.45691382765531063,0.46012024048096195,0.4633266533066132,0.46653306613226453,0.46973947895791585,0.4729458917835671,0.4761523046092184,0.47935871743486974,0.48256513026052106,0.4857715430861723,0.48897795591182364,0.49218436873747495,0.49539078156312627,0.49859719438877753,0.5018036072144288,0.5050100200400801,0.5082164328657315,0.5114228456913827,0.5146292585170341,0.5178356713426854,0.5210420841683366,0.524248496993988,0.5274549098196393,0.5306613226452905,0.5338677354709419,0.5370741482965932,0.5402805611222445,0.5434869739478958,0.5466933867735471,0.5498997995991984,0.5531062124248497,0.556312625250501,0.5595190380761523,0.5627254509018036,0.565931863727455,0.5691382765531062,0.5723446893787575,0.5755511022044089,0.5787575150300601,0.5819639278557114,0.5851703406813628,0.588376753507014,0.5915831663326653,0.5947895791583167,0.5979959919839679,0.6012024048096193,0.6044088176352705,0.6076152304609218,0.6108216432865732,0.6140280561122244,0.6172344689378757,0.6204408817635271,0.6236472945891783,0.6268537074148297,0.630060120240481,0.6332665330661322,0.6364729458917836,0.6396793587174349,0.6428857715430861,0.6460921843687375,0.6492985971943888,0.6525050100200401,0.6557114228456914,0.6589178356713427,0.662124248496994,0.6653306613226453,0.6685370741482966,0.6717434869739479,0.6749498997995992,0.6781563126252504,0.6813627254509018,0.6845691382765531,0.6877755511022045,0.6909819639278557,0.694188376753507,0.6973947895791583,0.7006012024048096,0.7038076152304609,0.7070140280561122,0.7102204408817635,0.7134268537074149,0.7166332665330661,0.7198396793587174,0.7230460921843688,0.72625250501002,0.7294589178356713,0.7326653306613227,0.7358717434869739,0.7390781563126253,0.7422845691382766,0.7454909819639278,0.7486973947895792,0.7519038076152305,0.7551102204408817,0.7583166332665331,0.7615230460921844,0.7647294589178357,0.767935871743487,0.7711422845691382,0.7743486973947896,0.7775551102204409,0.7807615230460921,0.7839679358717435,0.7871743486973948,0.790380761523046,0.7935871743486974,0.7967935871743487,0.8]}

},{}],72:[function(require,module,exports){
module.exports={"expected":[-1.0e-30,-9.979959920040082e-31,-9.95991984008016e-31,-9.939879760120242e-31,-9.91983968016032e-31,-9.899799600200402e-31,-9.879759520240483e-31,-9.859719440280562e-31,-9.839679360320643e-31,-9.819639280360722e-31,-9.799599200400803e-31,-9.779559120440882e-31,-9.759519040480963e-31,-9.739478960521044e-31,-9.719438880561123e-31,-9.699398800601204e-31,-9.679358720641283e-31,-9.659318640681364e-31,-9.639278560721445e-31,-9.619238480761524e-31,-9.599198400801605e-31,-9.579158320841684e-31,-9.559118240881765e-31,-9.539078160921844e-31,-9.519038080961925e-31,-9.498998001002005e-31,-9.478957921042085e-31,-9.458917841082165e-31,-9.438877761122245e-31,-9.418837681162326e-31,-9.398797601202406e-31,-9.378757521242486e-31,-9.358717441282566e-31,-9.338677361322646e-31,-9.318637281362726e-31,-9.298597201402806e-31,-9.278557121442886e-31,-9.258517041482967e-31,-9.238476961523046e-31,-9.218436881563127e-31,-9.198396801603207e-31,-9.178356721643287e-31,-9.158316641683368e-31,-9.138276561723447e-31,-9.118236481763528e-31,-9.098196401803607e-31,-9.078156321843688e-31,-9.058116241883767e-31,-9.038076161923848e-31,-9.01803608196393e-31,-8.997996002004008e-31,-8.97795592204409e-31,-8.957915842084168e-31,-8.93787576212425e-31,-8.91783568216433e-31,-8.89779560220441e-31,-8.87775552224449e-31,-8.85771544228457e-31,-8.83767536232465e-31,-8.81763528236473e-31,-8.79759520240481e-31,-8.777555122444891e-31,-8.75751504248497e-31,-8.737474962525051e-31,-8.71743488256513e-31,-8.697394802605211e-31,-8.677354722645292e-31,-8.657314642685371e-31,-8.637274562725452e-31,-8.617234482765531e-31,-8.597194402805612e-31,-8.577154322845693e-31,-8.557114242885772e-31,-8.537074162925853e-31,-8.517034082965932e-31,-8.496994003006013e-31,-8.476953923046092e-31,-8.456913843086173e-31,-8.436873763126254e-31,-8.416833683166333e-31,-8.396793603206414e-31,-8.376753523246493e-31,-8.356713443286574e-31,-8.336673363326655e-31,-8.316633283366734e-31,-8.296593203406815e-31,-8.276553123446894e-31,-8.256513043486975e-31,-8.236472963527054e-31,-8.216432883567135e-31,-8.196392803607216e-31,-8.176352723647295e-31,-8.156312643687376e-31,-8.136272563727455e-31,-8.116232483767536e-31,-8.096192403807617e-31,-8.076152323847696e-31,-8.056112243887777e-31,-8.036072163927856e-31,-8.016032083967937e-31,-7.995992004008016e-31,-7.975951924048097e-31,-7.955911844088178e-31,-7.935871764128257e-31,-7.915831684168338e-31,-7.895791604208417e-31,-7.875751524248498e-31,-7.855711444288578e-31,-7.835671364328658e-31,-7.815631284368738e-31,-7.795591204408819e-31,-7.775551124448899e-31,-7.755511044488979e-31,-7.735470964529059e-31,-7.715430884569139e-31,-7.695390804609219e-31,-7.6753507246493e-31,-7.65531064468938e-31,-7.63527056472946e-31,-7.61523048476954e-31,-7.59519040480962e-31,-7.5751503248497e-31,-7.5551102448897805e-31,-7.5350701649298605e-31,-7.5150300849699405e-31,-7.4949900050100205e-31,-7.4749499250501005e-31,-7.4549098450901806e-31,-7.4348697651302614e-31,-7.4148296851703415e-31,-7.3947896052104215e-31,-7.3747495252505015e-31,-7.3547094452905815e-31,-7.3346693653306615e-31,-7.314629285370742e-31,-7.294589205410822e-31,-7.274549125450902e-31,-7.254509045490982e-31,-7.234468965531062e-31,-7.214428885571143e-31,-7.194388805611223e-31,-7.174348725651303e-31,-7.154308645691383e-31,-7.134268565731463e-31,-7.114228485771543e-31,-7.094188405811624e-31,-7.074148325851704e-31,-7.054108245891784e-31,-7.034068165931864e-31,-7.014028085971944e-31,-6.993988006012024e-31,-6.973947926052105e-31,-6.953907846092185e-31,-6.933867766132265e-31,-6.913827686172345e-31,-6.893787606212425e-31,-6.873747526252505e-31,-6.853707446292586e-31,-6.833667366332666e-31,-6.813627286372746e-31,-6.793587206412826e-31,-6.773547126452906e-31,-6.753507046492986e-31,-6.733466966533067e-31,-6.713426886573147e-31,-6.693386806613227e-31,-6.673346726653307e-31,-6.653306646693387e-31,-6.633266566733467e-31,-6.613226486773548e-31,-6.593186406813628e-31,-6.573146326853708e-31,-6.553106246893788e-31,-6.533066166933868e-31,-6.513026086973948e-31,-6.492986007014029e-31,-6.472945927054109e-31,-6.452905847094189e-31,-6.432865767134269e-31,-6.412825687174349e-31,-6.392785607214429e-31,-6.37274552725451e-31,-6.35270544729459e-31,-6.33266536733467e-31,-6.31262528737475e-31,-6.29258520741483e-31,-6.27254512745491e-31,-6.252505047494991e-31,-6.232464967535071e-31,-6.212424887575151e-31,-6.192384807615231e-31,-6.172344727655311e-31,-6.152304647695391e-31,-6.132264567735472e-31,-6.112224487775552e-31,-6.092184407815632e-31,-6.072144327855712e-31,-6.052104247895792e-31,-6.032064167935872e-31,-6.012024087975953e-31,-5.991984008016033e-31,-5.971943928056113e-31,-5.951903848096193e-31,-5.931863768136273e-31,-5.911823688176354e-31,-5.891783608216434e-31,-5.871743528256514e-31,-5.851703448296594e-31,-5.831663368336674e-31,-5.811623288376754e-31,-5.791583208416835e-31,-5.771543128456915e-31,-5.751503048496995e-31,-5.731462968537075e-31,-5.711422888577155e-31,-5.691382808617235e-31,-5.6713427286573155e-31,-5.6513026486973955e-31,-5.6312625687374755e-31,-5.6112224887775555e-31,-5.5911824088176355e-31,-5.5711423288577156e-31,-5.5511022488977964e-31,-5.5310621689378765e-31,-5.5110220889779565e-31,-5.4909820090180365e-31,-5.4709419290581165e-31,-5.4509018490981965e-31,-5.430861769138277e-31,-5.410821689178357e-31,-5.390781609218437e-31,-5.370741529258517e-31,-5.350701449298597e-31,-5.330661369338677e-31,-5.310621289378758e-31,-5.290581209418838e-31,-5.270541129458918e-31,-5.250501049498998e-31,-5.230460969539078e-31,-5.210420889579158e-31,-5.190380809619239e-31,-5.170340729659319e-31,-5.150300649699399e-31,-5.130260569739479e-31,-5.110220489779559e-31,-5.090180409819639e-31,-5.07014032985972e-31,-5.0501002498998e-31,-5.03006016993988e-31,-5.01002008997996e-31,-4.98998001002004e-31,-4.96993993006012e-31,-4.949899850100201e-31,-4.929859770140281e-31,-4.909819690180361e-31,-4.889779610220441e-31,-4.869739530260521e-31,-4.849699450300601e-31,-4.829659370340682e-31,-4.809619290380762e-31,-4.789579210420842e-31,-4.769539130460922e-31,-4.749499050501002e-31,-4.729458970541082e-31,-4.709418890581163e-31,-4.689378810621243e-31,-4.669338730661323e-31,-4.649298650701403e-31,-4.629258570741483e-31,-4.609218490781564e-31,-4.589178410821644e-31,-4.569138330861724e-31,-4.549098250901804e-31,-4.529058170941884e-31,-4.509018090981964e-31,-4.488978011022045e-31,-4.468937931062125e-31,-4.448897851102205e-31,-4.428857771142285e-31,-4.408817691182365e-31,-4.388777611222445e-31,-4.368737531262526e-31,-4.348697451302606e-31,-4.328657371342686e-31,-4.308617291382766e-31,-4.288577211422846e-31,-4.268537131462926e-31,-4.248497051503007e-31,-4.228456971543087e-31,-4.208416891583167e-31,-4.188376811623247e-31,-4.168336731663327e-31,-4.148296651703407e-31,-4.128256571743488e-31,-4.108216491783568e-31,-4.088176411823648e-31,-4.068136331863728e-31,-4.048096251903808e-31,-4.028056171943888e-31,-4.008016091983969e-31,-3.987976012024049e-31,-3.967935932064129e-31,-3.947895852104209e-31,-3.927855772144289e-31,-3.907815692184369e-31,-3.887775612224449e-31,-3.8677355322645296e-31,-3.8476954523046096e-31,-3.8276553723446896e-31,-3.80761529238477e-31,-3.78757521242485e-31,-3.76753513246493e-31,-3.7474950525050105e-31,-3.7274549725450905e-31,-3.7074148925851705e-31,-3.687374812625251e-31,-3.667334732665331e-31,-3.647294652705411e-31,-3.6272545727454915e-31,-3.6072144927855715e-31,-3.5871744128256515e-31,-3.567134332865732e-31,-3.547094252905812e-31,-3.527054172945892e-31,-3.5070140929859724e-31,-3.4869740130260524e-31,-3.4669339330661324e-31,-3.446893853106213e-31,-3.426853773146293e-31,-3.406813693186373e-31,-3.3867736132264533e-31,-3.3667335332665334e-31,-3.3466934533066134e-31,-3.326653373346694e-31,-3.306613293386774e-31,-3.286573213426854e-31,-3.2665331334669343e-31,-3.2464930535070143e-31,-3.2264529735470943e-31,-3.2064128935871747e-31,-3.1863728136272548e-31,-3.1663327336673348e-31,-3.146292653707415e-31,-3.1262525737474952e-31,-3.1062124937875752e-31,-3.0861724138276557e-31,-3.0661323338677357e-31,-3.0460922539078157e-31,-3.026052173947896e-31,-3.006012093987976e-31,-2.985972014028056e-31,-2.9659319340681366e-31,-2.9458918541082166e-31,-2.9258517741482966e-31,-2.905811694188377e-31,-2.885771614228457e-31,-2.865731534268537e-31,-2.8456914543086176e-31,-2.8256513743486976e-31,-2.8056112943887776e-31,-2.785571214428858e-31,-2.765531134468938e-31,-2.745491054509018e-31,-2.7254509745490985e-31,-2.7054108945891785e-31,-2.6853708146292585e-31,-2.665330734669339e-31,-2.645290654709419e-31,-2.6252505747494994e-31,-2.6052104947895794e-31,-2.5851704148296595e-31,-2.56513033486974e-31,-2.54509025490982e-31,-2.5250501749499e-31,-2.5050100949899804e-31,-2.4849700150300604e-31,-2.4649299350701404e-31,-2.444889855110221e-31,-2.424849775150301e-31,-2.404809695190381e-31,-2.3847696152304613e-31,-2.3647295352705413e-31,-2.3446894553106213e-31,-2.3246493753507018e-31,-2.304609295390782e-31,-2.284569215430862e-31,-2.2645291354709422e-31,-2.2444890555110223e-31,-2.2244489755511023e-31,-2.2044088955911827e-31,-2.1843688156312627e-31,-2.1643287356713427e-31,-2.144288655711423e-31,-2.124248575751503e-31,-2.104208495791583e-31,-2.0841684158316637e-31,-2.0641283358717437e-31,-2.0440882559118237e-31,-2.024048175951904e-31,-2.004008095991984e-31,-1.983968016032064e-31,-1.9639279360721444e-31,-1.9438878561122246e-31,-1.9238477761523048e-31,-1.9038076961923848e-31,-1.883767616232465e-31,-1.8637275362725453e-31,-1.8436874563126253e-31,-1.8236473763527055e-31,-1.8036072963927858e-31,-1.7835672164328658e-31,-1.763527136472946e-31,-1.7434870565130262e-31,-1.7234469765531063e-31,-1.7034068965931865e-31,-1.6833668166332667e-31,-1.663326736673347e-31,-1.643286656713427e-31,-1.6232465767535072e-31,-1.6032064967935874e-31,-1.5831664168336674e-31,-1.5631263368737477e-31,-1.5430862569138279e-31,-1.5230461769539079e-31,-1.5030060969939881e-31,-1.4829660170340683e-31,-1.4629259370741484e-31,-1.4428858571142286e-31,-1.4228457771543088e-31,-1.4028056971943888e-31,-1.382765617234469e-31,-1.3627255372745493e-31,-1.3426854573146293e-31,-1.3226453773547095e-31,-1.3026052973947898e-31,-1.2825652174348698e-31,-1.26252513747495e-31,-1.2424850575150302e-31,-1.2224449775551102e-31,-1.2024048975951905e-31,-1.1823648176352707e-31,-1.1623247376753507e-31,-1.142284657715431e-31,-1.1222445777555112e-31,-1.1022044977955912e-31,-1.0821644178356714e-31,-1.0621243378757516e-31,-1.0420842579158316e-31,-1.0220441779559119e-31,-1.002004097995992e-31,-9.819640180360722e-32,-9.619239380761523e-32,-9.418838581162326e-32,-9.218437781563127e-32,-9.018036981963928e-32,-8.81763618236473e-32,-8.617235382765532e-32,-8.416834583166333e-32,-8.216433783567135e-32,-8.016032983967936e-32,-7.815632184368739e-32,-7.61523138476954e-32,-7.414830585170341e-32,-7.214429785571143e-32,-7.014028985971945e-32,-6.813628186372746e-32,-6.613227386773548e-32,-6.412826587174349e-32,-6.21242578757515e-32,-6.012024987975953e-32,-5.811624188376754e-32,-5.611223388777555e-32,-5.410822589178357e-32,-5.210421789579159e-32,-5.01002098997996e-32,-4.809620190380762e-32,-4.6092193907815633e-32,-4.408818591182365e-32,-4.208417791583167e-32,-4.0080169919839685e-32,-3.80761619238477e-32,-3.6072153927855715e-32,-3.406814593186373e-32,-3.2064137935871744e-32,-3.006012993987976e-32,-2.805612194388778e-32,-2.605211394789579e-32,-2.4048105951903809e-32,-2.2044097955911826e-32,-2.004008995991984e-32,-1.8036081963927858e-32,-1.6032073967935873e-32,-1.4028065971943888e-32,-1.2024057975951905e-32,-1.0020049979959921e-32,-8.016041983967936e-33,-6.012033987975952e-33,-4.008025991983968e-33,-2.004017995991984e-33,-1.0e-38],"x":[-1.0e-30,-9.979959920040082e-31,-9.95991984008016e-31,-9.939879760120242e-31,-9.91983968016032e-31,-9.899799600200402e-31,-9.879759520240483e-31,-9.859719440280562e-31,-9.839679360320643e-31,-9.819639280360722e-31,-9.799599200400803e-31,-9.779559120440882e-31,-9.759519040480963e-31,-9.739478960521044e-31,-9.719438880561123e-31,-9.699398800601204e-31,-9.679358720641283e-31,-9.659318640681364e-31,-9.639278560721445e-31,-9.619238480761524e-31,-9.599198400801605e-31,-9.579158320841684e-31,-9.559118240881765e-31,-9.539078160921844e-31,-9.519038080961925e-31,-9.498998001002005e-31,-9.478957921042085e-31,-9.458917841082165e-31,-9.438877761122245e-31,-9.418837681162326e-31,-9.398797601202406e-31,-9.378757521242486e-31,-9.358717441282566e-31,-9.338677361322646e-31,-9.318637281362726e-31,-9.298597201402806e-31,-9.278557121442886e-31,-9.258517041482967e-31,-9.238476961523046e-31,-9.218436881563127e-31,-9.198396801603207e-31,-9.178356721643287e-31,-9.158316641683368e-31,-9.138276561723447e-31,-9.118236481763528e-31,-9.098196401803607e-31,-9.078156321843688e-31,-9.058116241883767e-31,-9.038076161923848e-31,-9.01803608196393e-31,-8.997996002004008e-31,-8.97795592204409e-31,-8.957915842084168e-31,-8.93787576212425e-31,-8.91783568216433e-31,-8.89779560220441e-31,-8.87775552224449e-31,-8.85771544228457e-31,-8.83767536232465e-31,-8.81763528236473e-31,-8.79759520240481e-31,-8.777555122444891e-31,-8.75751504248497e-31,-8.737474962525051e-31,-8.71743488256513e-31,-8.697394802605211e-31,-8.677354722645292e-31,-8.657314642685371e-31,-8.637274562725452e-31,-8.617234482765531e-31,-8.597194402805612e-31,-8.577154322845693e-31,-8.557114242885772e-31,-8.537074162925853e-31,-8.517034082965932e-31,-8.496994003006013e-31,-8.476953923046092e-31,-8.456913843086173e-31,-8.436873763126254e-31,-8.416833683166333e-31,-8.396793603206414e-31,-8.376753523246493e-31,-8.356713443286574e-31,-8.336673363326655e-31,-8.316633283366734e-31,-8.296593203406815e-31,-8.276553123446894e-31,-8.256513043486975e-31,-8.236472963527054e-31,-8.216432883567135e-31,-8.196392803607216e-31,-8.176352723647295e-31,-8.156312643687376e-31,-8.136272563727455e-31,-8.116232483767536e-31,-8.096192403807617e-31,-8.076152323847696e-31,-8.056112243887777e-31,-8.036072163927856e-31,-8.016032083967937e-31,-7.995992004008016e-31,-7.975951924048097e-31,-7.955911844088178e-31,-7.935871764128257e-31,-7.915831684168338e-31,-7.895791604208417e-31,-7.875751524248498e-31,-7.855711444288578e-31,-7.835671364328658e-31,-7.815631284368738e-31,-7.795591204408819e-31,-7.775551124448899e-31,-7.755511044488979e-31,-7.735470964529059e-31,-7.715430884569139e-31,-7.695390804609219e-31,-7.6753507246493e-31,-7.65531064468938e-31,-7.63527056472946e-31,-7.61523048476954e-31,-7.59519040480962e-31,-7.5751503248497e-31,-7.5551102448897805e-31,-7.5350701649298605e-31,-7.5150300849699405e-31,-7.4949900050100205e-31,-7.4749499250501005e-31,-7.4549098450901806e-31,-7.4348697651302614e-31,-7.4148296851703415e-31,-7.3947896052104215e-31,-7.3747495252505015e-31,-7.3547094452905815e-31,-7.3346693653306615e-31,-7.314629285370742e-31,-7.294589205410822e-31,-7.274549125450902e-31,-7.254509045490982e-31,-7.234468965531062e-31,-7.214428885571143e-31,-7.194388805611223e-31,-7.174348725651303e-31,-7.154308645691383e-31,-7.134268565731463e-31,-7.114228485771543e-31,-7.094188405811624e-31,-7.074148325851704e-31,-7.054108245891784e-31,-7.034068165931864e-31,-7.014028085971944e-31,-6.993988006012024e-31,-6.973947926052105e-31,-6.953907846092185e-31,-6.933867766132265e-31,-6.913827686172345e-31,-6.893787606212425e-31,-6.873747526252505e-31,-6.853707446292586e-31,-6.833667366332666e-31,-6.813627286372746e-31,-6.793587206412826e-31,-6.773547126452906e-31,-6.753507046492986e-31,-6.733466966533067e-31,-6.713426886573147e-31,-6.693386806613227e-31,-6.673346726653307e-31,-6.653306646693387e-31,-6.633266566733467e-31,-6.613226486773548e-31,-6.593186406813628e-31,-6.573146326853708e-31,-6.553106246893788e-31,-6.533066166933868e-31,-6.513026086973948e-31,-6.492986007014029e-31,-6.472945927054109e-31,-6.452905847094189e-31,-6.432865767134269e-31,-6.412825687174349e-31,-6.392785607214429e-31,-6.37274552725451e-31,-6.35270544729459e-31,-6.33266536733467e-31,-6.31262528737475e-31,-6.29258520741483e-31,-6.27254512745491e-31,-6.252505047494991e-31,-6.232464967535071e-31,-6.212424887575151e-31,-6.192384807615231e-31,-6.172344727655311e-31,-6.152304647695391e-31,-6.132264567735472e-31,-6.112224487775552e-31,-6.092184407815632e-31,-6.072144327855712e-31,-6.052104247895792e-31,-6.032064167935872e-31,-6.012024087975953e-31,-5.991984008016033e-31,-5.971943928056113e-31,-5.951903848096193e-31,-5.931863768136273e-31,-5.911823688176354e-31,-5.891783608216434e-31,-5.871743528256514e-31,-5.851703448296594e-31,-5.831663368336674e-31,-5.811623288376754e-31,-5.791583208416835e-31,-5.771543128456915e-31,-5.751503048496995e-31,-5.731462968537075e-31,-5.711422888577155e-31,-5.691382808617235e-31,-5.6713427286573155e-31,-5.6513026486973955e-31,-5.6312625687374755e-31,-5.6112224887775555e-31,-5.5911824088176355e-31,-5.5711423288577156e-31,-5.5511022488977964e-31,-5.5310621689378765e-31,-5.5110220889779565e-31,-5.4909820090180365e-31,-5.4709419290581165e-31,-5.4509018490981965e-31,-5.430861769138277e-31,-5.410821689178357e-31,-5.390781609218437e-31,-5.370741529258517e-31,-5.350701449298597e-31,-5.330661369338677e-31,-5.310621289378758e-31,-5.290581209418838e-31,-5.270541129458918e-31,-5.250501049498998e-31,-5.230460969539078e-31,-5.210420889579158e-31,-5.190380809619239e-31,-5.170340729659319e-31,-5.150300649699399e-31,-5.130260569739479e-31,-5.110220489779559e-31,-5.090180409819639e-31,-5.07014032985972e-31,-5.0501002498998e-31,-5.03006016993988e-31,-5.01002008997996e-31,-4.98998001002004e-31,-4.96993993006012e-31,-4.949899850100201e-31,-4.929859770140281e-31,-4.909819690180361e-31,-4.889779610220441e-31,-4.869739530260521e-31,-4.849699450300601e-31,-4.829659370340682e-31,-4.809619290380762e-31,-4.789579210420842e-31,-4.769539130460922e-31,-4.749499050501002e-31,-4.729458970541082e-31,-4.709418890581163e-31,-4.689378810621243e-31,-4.669338730661323e-31,-4.649298650701403e-31,-4.629258570741483e-31,-4.609218490781564e-31,-4.589178410821644e-31,-4.569138330861724e-31,-4.549098250901804e-31,-4.529058170941884e-31,-4.509018090981964e-31,-4.488978011022045e-31,-4.468937931062125e-31,-4.448897851102205e-31,-4.428857771142285e-31,-4.408817691182365e-31,-4.388777611222445e-31,-4.368737531262526e-31,-4.348697451302606e-31,-4.328657371342686e-31,-4.308617291382766e-31,-4.288577211422846e-31,-4.268537131462926e-31,-4.248497051503007e-31,-4.228456971543087e-31,-4.208416891583167e-31,-4.188376811623247e-31,-4.168336731663327e-31,-4.148296651703407e-31,-4.128256571743488e-31,-4.108216491783568e-31,-4.088176411823648e-31,-4.068136331863728e-31,-4.048096251903808e-31,-4.028056171943888e-31,-4.008016091983969e-31,-3.987976012024049e-31,-3.967935932064129e-31,-3.947895852104209e-31,-3.927855772144289e-31,-3.907815692184369e-31,-3.887775612224449e-31,-3.8677355322645296e-31,-3.8476954523046096e-31,-3.8276553723446896e-31,-3.80761529238477e-31,-3.78757521242485e-31,-3.76753513246493e-31,-3.7474950525050105e-31,-3.7274549725450905e-31,-3.7074148925851705e-31,-3.687374812625251e-31,-3.667334732665331e-31,-3.647294652705411e-31,-3.6272545727454915e-31,-3.6072144927855715e-31,-3.5871744128256515e-31,-3.567134332865732e-31,-3.547094252905812e-31,-3.527054172945892e-31,-3.5070140929859724e-31,-3.4869740130260524e-31,-3.4669339330661324e-31,-3.446893853106213e-31,-3.426853773146293e-31,-3.406813693186373e-31,-3.3867736132264533e-31,-3.3667335332665334e-31,-3.3466934533066134e-31,-3.326653373346694e-31,-3.306613293386774e-31,-3.286573213426854e-31,-3.2665331334669343e-31,-3.2464930535070143e-31,-3.2264529735470943e-31,-3.2064128935871747e-31,-3.1863728136272548e-31,-3.1663327336673348e-31,-3.146292653707415e-31,-3.1262525737474952e-31,-3.1062124937875752e-31,-3.0861724138276557e-31,-3.0661323338677357e-31,-3.0460922539078157e-31,-3.026052173947896e-31,-3.006012093987976e-31,-2.985972014028056e-31,-2.9659319340681366e-31,-2.9458918541082166e-31,-2.9258517741482966e-31,-2.905811694188377e-31,-2.885771614228457e-31,-2.865731534268537e-31,-2.8456914543086176e-31,-2.8256513743486976e-31,-2.8056112943887776e-31,-2.785571214428858e-31,-2.765531134468938e-31,-2.745491054509018e-31,-2.7254509745490985e-31,-2.7054108945891785e-31,-2.6853708146292585e-31,-2.665330734669339e-31,-2.645290654709419e-31,-2.6252505747494994e-31,-2.6052104947895794e-31,-2.5851704148296595e-31,-2.56513033486974e-31,-2.54509025490982e-31,-2.5250501749499e-31,-2.5050100949899804e-31,-2.4849700150300604e-31,-2.4649299350701404e-31,-2.444889855110221e-31,-2.424849775150301e-31,-2.404809695190381e-31,-2.3847696152304613e-31,-2.3647295352705413e-31,-2.3446894553106213e-31,-2.3246493753507018e-31,-2.304609295390782e-31,-2.284569215430862e-31,-2.2645291354709422e-31,-2.2444890555110223e-31,-2.2244489755511023e-31,-2.2044088955911827e-31,-2.1843688156312627e-31,-2.1643287356713427e-31,-2.144288655711423e-31,-2.124248575751503e-31,-2.104208495791583e-31,-2.0841684158316637e-31,-2.0641283358717437e-31,-2.0440882559118237e-31,-2.024048175951904e-31,-2.004008095991984e-31,-1.983968016032064e-31,-1.9639279360721444e-31,-1.9438878561122246e-31,-1.9238477761523048e-31,-1.9038076961923848e-31,-1.883767616232465e-31,-1.8637275362725453e-31,-1.8436874563126253e-31,-1.8236473763527055e-31,-1.8036072963927858e-31,-1.7835672164328658e-31,-1.763527136472946e-31,-1.7434870565130262e-31,-1.7234469765531063e-31,-1.7034068965931865e-31,-1.6833668166332667e-31,-1.663326736673347e-31,-1.643286656713427e-31,-1.6232465767535072e-31,-1.6032064967935874e-31,-1.5831664168336674e-31,-1.5631263368737477e-31,-1.5430862569138279e-31,-1.5230461769539079e-31,-1.5030060969939881e-31,-1.4829660170340683e-31,-1.4629259370741484e-31,-1.4428858571142286e-31,-1.4228457771543088e-31,-1.4028056971943888e-31,-1.382765617234469e-31,-1.3627255372745493e-31,-1.3426854573146293e-31,-1.3226453773547095e-31,-1.3026052973947898e-31,-1.2825652174348698e-31,-1.26252513747495e-31,-1.2424850575150302e-31,-1.2224449775551102e-31,-1.2024048975951905e-31,-1.1823648176352707e-31,-1.1623247376753507e-31,-1.142284657715431e-31,-1.1222445777555112e-31,-1.1022044977955912e-31,-1.0821644178356714e-31,-1.0621243378757516e-31,-1.0420842579158316e-31,-1.0220441779559119e-31,-1.002004097995992e-31,-9.819640180360722e-32,-9.619239380761523e-32,-9.418838581162326e-32,-9.218437781563127e-32,-9.018036981963928e-32,-8.81763618236473e-32,-8.617235382765532e-32,-8.416834583166333e-32,-8.216433783567135e-32,-8.016032983967936e-32,-7.815632184368739e-32,-7.61523138476954e-32,-7.414830585170341e-32,-7.214429785571143e-32,-7.014028985971945e-32,-6.813628186372746e-32,-6.613227386773548e-32,-6.412826587174349e-32,-6.21242578757515e-32,-6.012024987975953e-32,-5.811624188376754e-32,-5.611223388777555e-32,-5.410822589178357e-32,-5.210421789579159e-32,-5.01002098997996e-32,-4.809620190380762e-32,-4.6092193907815633e-32,-4.408818591182365e-32,-4.208417791583167e-32,-4.0080169919839685e-32,-3.80761619238477e-32,-3.6072153927855715e-32,-3.406814593186373e-32,-3.2064137935871744e-32,-3.006012993987976e-32,-2.805612194388778e-32,-2.605211394789579e-32,-2.4048105951903809e-32,-2.2044097955911826e-32,-2.004008995991984e-32,-1.8036081963927858e-32,-1.6032073967935873e-32,-1.4028065971943888e-32,-1.2024057975951905e-32,-1.0020049979959921e-32,-8.016041983967936e-33,-6.012033987975952e-33,-4.008025991983968e-33,-2.004017995991984e-33,-1.0e-38]}

},{}],73:[function(require,module,exports){
module.exports={"expected":[1.0e-30,9.979959920040082e-31,9.95991984008016e-31,9.939879760120242e-31,9.91983968016032e-31,9.899799600200402e-31,9.879759520240483e-31,9.859719440280562e-31,9.839679360320643e-31,9.819639280360722e-31,9.799599200400803e-31,9.779559120440882e-31,9.759519040480963e-31,9.739478960521044e-31,9.719438880561123e-31,9.699398800601204e-31,9.679358720641283e-31,9.659318640681364e-31,9.639278560721445e-31,9.619238480761524e-31,9.599198400801605e-31,9.579158320841684e-31,9.559118240881765e-31,9.539078160921844e-31,9.519038080961925e-31,9.498998001002005e-31,9.478957921042085e-31,9.458917841082165e-31,9.438877761122245e-31,9.418837681162326e-31,9.398797601202406e-31,9.378757521242486e-31,9.358717441282566e-31,9.338677361322646e-31,9.318637281362726e-31,9.298597201402806e-31,9.278557121442886e-31,9.258517041482967e-31,9.238476961523046e-31,9.218436881563127e-31,9.198396801603207e-31,9.178356721643287e-31,9.158316641683368e-31,9.138276561723447e-31,9.118236481763528e-31,9.098196401803607e-31,9.078156321843688e-31,9.058116241883767e-31,9.038076161923848e-31,9.01803608196393e-31,8.997996002004008e-31,8.97795592204409e-31,8.957915842084168e-31,8.93787576212425e-31,8.91783568216433e-31,8.89779560220441e-31,8.87775552224449e-31,8.85771544228457e-31,8.83767536232465e-31,8.81763528236473e-31,8.79759520240481e-31,8.777555122444891e-31,8.75751504248497e-31,8.737474962525051e-31,8.71743488256513e-31,8.697394802605211e-31,8.677354722645292e-31,8.657314642685371e-31,8.637274562725452e-31,8.617234482765531e-31,8.597194402805612e-31,8.577154322845693e-31,8.557114242885772e-31,8.537074162925853e-31,8.517034082965932e-31,8.496994003006013e-31,8.476953923046092e-31,8.456913843086173e-31,8.436873763126254e-31,8.416833683166333e-31,8.396793603206414e-31,8.376753523246493e-31,8.356713443286574e-31,8.336673363326655e-31,8.316633283366734e-31,8.296593203406815e-31,8.276553123446894e-31,8.256513043486975e-31,8.236472963527054e-31,8.216432883567135e-31,8.196392803607216e-31,8.176352723647295e-31,8.156312643687376e-31,8.136272563727455e-31,8.116232483767536e-31,8.096192403807617e-31,8.076152323847696e-31,8.056112243887777e-31,8.036072163927856e-31,8.016032083967937e-31,7.995992004008016e-31,7.975951924048097e-31,7.955911844088178e-31,7.935871764128257e-31,7.915831684168338e-31,7.895791604208417e-31,7.875751524248498e-31,7.855711444288578e-31,7.835671364328658e-31,7.815631284368738e-31,7.795591204408819e-31,7.775551124448899e-31,7.755511044488979e-31,7.735470964529059e-31,7.715430884569139e-31,7.695390804609219e-31,7.6753507246493e-31,7.65531064468938e-31,7.63527056472946e-31,7.61523048476954e-31,7.59519040480962e-31,7.5751503248497e-31,7.5551102448897805e-31,7.5350701649298605e-31,7.5150300849699405e-31,7.4949900050100205e-31,7.4749499250501005e-31,7.4549098450901806e-31,7.4348697651302614e-31,7.4148296851703415e-31,7.3947896052104215e-31,7.3747495252505015e-31,7.3547094452905815e-31,7.3346693653306615e-31,7.314629285370742e-31,7.294589205410822e-31,7.274549125450902e-31,7.254509045490982e-31,7.234468965531062e-31,7.214428885571143e-31,7.194388805611223e-31,7.174348725651303e-31,7.154308645691383e-31,7.134268565731463e-31,7.114228485771543e-31,7.094188405811624e-31,7.074148325851704e-31,7.054108245891784e-31,7.034068165931864e-31,7.014028085971944e-31,6.993988006012024e-31,6.973947926052105e-31,6.953907846092185e-31,6.933867766132265e-31,6.913827686172345e-31,6.893787606212425e-31,6.873747526252505e-31,6.853707446292586e-31,6.833667366332666e-31,6.813627286372746e-31,6.793587206412826e-31,6.773547126452906e-31,6.753507046492986e-31,6.733466966533067e-31,6.713426886573147e-31,6.693386806613227e-31,6.673346726653307e-31,6.653306646693387e-31,6.633266566733467e-31,6.613226486773548e-31,6.593186406813628e-31,6.573146326853708e-31,6.553106246893788e-31,6.533066166933868e-31,6.513026086973948e-31,6.492986007014029e-31,6.472945927054109e-31,6.452905847094189e-31,6.432865767134269e-31,6.412825687174349e-31,6.392785607214429e-31,6.37274552725451e-31,6.35270544729459e-31,6.33266536733467e-31,6.31262528737475e-31,6.29258520741483e-31,6.27254512745491e-31,6.252505047494991e-31,6.232464967535071e-31,6.212424887575151e-31,6.192384807615231e-31,6.172344727655311e-31,6.152304647695391e-31,6.132264567735472e-31,6.112224487775552e-31,6.092184407815632e-31,6.072144327855712e-31,6.052104247895792e-31,6.032064167935872e-31,6.012024087975953e-31,5.991984008016033e-31,5.971943928056113e-31,5.951903848096193e-31,5.931863768136273e-31,5.911823688176354e-31,5.891783608216434e-31,5.871743528256514e-31,5.851703448296594e-31,5.831663368336674e-31,5.811623288376754e-31,5.791583208416835e-31,5.771543128456915e-31,5.751503048496995e-31,5.731462968537075e-31,5.711422888577155e-31,5.691382808617235e-31,5.6713427286573155e-31,5.6513026486973955e-31,5.6312625687374755e-31,5.6112224887775555e-31,5.5911824088176355e-31,5.5711423288577156e-31,5.5511022488977964e-31,5.5310621689378765e-31,5.5110220889779565e-31,5.4909820090180365e-31,5.4709419290581165e-31,5.4509018490981965e-31,5.430861769138277e-31,5.410821689178357e-31,5.390781609218437e-31,5.370741529258517e-31,5.350701449298597e-31,5.330661369338677e-31,5.310621289378758e-31,5.290581209418838e-31,5.270541129458918e-31,5.250501049498998e-31,5.230460969539078e-31,5.210420889579158e-31,5.190380809619239e-31,5.170340729659319e-31,5.150300649699399e-31,5.130260569739479e-31,5.110220489779559e-31,5.090180409819639e-31,5.07014032985972e-31,5.0501002498998e-31,5.03006016993988e-31,5.01002008997996e-31,4.98998001002004e-31,4.96993993006012e-31,4.949899850100201e-31,4.929859770140281e-31,4.909819690180361e-31,4.889779610220441e-31,4.869739530260521e-31,4.849699450300601e-31,4.829659370340682e-31,4.809619290380762e-31,4.789579210420842e-31,4.769539130460922e-31,4.749499050501002e-31,4.729458970541082e-31,4.709418890581163e-31,4.689378810621243e-31,4.669338730661323e-31,4.649298650701403e-31,4.629258570741483e-31,4.609218490781564e-31,4.589178410821644e-31,4.569138330861724e-31,4.549098250901804e-31,4.529058170941884e-31,4.509018090981964e-31,4.488978011022045e-31,4.468937931062125e-31,4.448897851102205e-31,4.428857771142285e-31,4.408817691182365e-31,4.388777611222445e-31,4.368737531262526e-31,4.348697451302606e-31,4.328657371342686e-31,4.308617291382766e-31,4.288577211422846e-31,4.268537131462926e-31,4.248497051503007e-31,4.228456971543087e-31,4.208416891583167e-31,4.188376811623247e-31,4.168336731663327e-31,4.148296651703407e-31,4.128256571743488e-31,4.108216491783568e-31,4.088176411823648e-31,4.068136331863728e-31,4.048096251903808e-31,4.028056171943888e-31,4.008016091983969e-31,3.987976012024049e-31,3.967935932064129e-31,3.947895852104209e-31,3.927855772144289e-31,3.907815692184369e-31,3.887775612224449e-31,3.8677355322645296e-31,3.8476954523046096e-31,3.8276553723446896e-31,3.80761529238477e-31,3.78757521242485e-31,3.76753513246493e-31,3.7474950525050105e-31,3.7274549725450905e-31,3.7074148925851705e-31,3.687374812625251e-31,3.667334732665331e-31,3.647294652705411e-31,3.6272545727454915e-31,3.6072144927855715e-31,3.5871744128256515e-31,3.567134332865732e-31,3.547094252905812e-31,3.527054172945892e-31,3.5070140929859724e-31,3.4869740130260524e-31,3.4669339330661324e-31,3.446893853106213e-31,3.426853773146293e-31,3.406813693186373e-31,3.3867736132264533e-31,3.3667335332665334e-31,3.3466934533066134e-31,3.326653373346694e-31,3.306613293386774e-31,3.286573213426854e-31,3.2665331334669343e-31,3.2464930535070143e-31,3.2264529735470943e-31,3.2064128935871747e-31,3.1863728136272548e-31,3.1663327336673348e-31,3.146292653707415e-31,3.1262525737474952e-31,3.1062124937875752e-31,3.0861724138276557e-31,3.0661323338677357e-31,3.0460922539078157e-31,3.026052173947896e-31,3.006012093987976e-31,2.985972014028056e-31,2.9659319340681366e-31,2.9458918541082166e-31,2.9258517741482966e-31,2.905811694188377e-31,2.885771614228457e-31,2.865731534268537e-31,2.8456914543086176e-31,2.8256513743486976e-31,2.8056112943887776e-31,2.785571214428858e-31,2.765531134468938e-31,2.745491054509018e-31,2.7254509745490985e-31,2.7054108945891785e-31,2.6853708146292585e-31,2.665330734669339e-31,2.645290654709419e-31,2.6252505747494994e-31,2.6052104947895794e-31,2.5851704148296595e-31,2.56513033486974e-31,2.54509025490982e-31,2.5250501749499e-31,2.5050100949899804e-31,2.4849700150300604e-31,2.4649299350701404e-31,2.444889855110221e-31,2.424849775150301e-31,2.404809695190381e-31,2.3847696152304613e-31,2.3647295352705413e-31,2.3446894553106213e-31,2.3246493753507018e-31,2.304609295390782e-31,2.284569215430862e-31,2.2645291354709422e-31,2.2444890555110223e-31,2.2244489755511023e-31,2.2044088955911827e-31,2.1843688156312627e-31,2.1643287356713427e-31,2.144288655711423e-31,2.124248575751503e-31,2.104208495791583e-31,2.0841684158316637e-31,2.0641283358717437e-31,2.0440882559118237e-31,2.024048175951904e-31,2.004008095991984e-31,1.983968016032064e-31,1.9639279360721444e-31,1.9438878561122246e-31,1.9238477761523048e-31,1.9038076961923848e-31,1.883767616232465e-31,1.8637275362725453e-31,1.8436874563126253e-31,1.8236473763527055e-31,1.8036072963927858e-31,1.7835672164328658e-31,1.763527136472946e-31,1.7434870565130262e-31,1.7234469765531063e-31,1.7034068965931865e-31,1.6833668166332667e-31,1.663326736673347e-31,1.643286656713427e-31,1.6232465767535072e-31,1.6032064967935874e-31,1.5831664168336674e-31,1.5631263368737477e-31,1.5430862569138279e-31,1.5230461769539079e-31,1.5030060969939881e-31,1.4829660170340683e-31,1.4629259370741484e-31,1.4428858571142286e-31,1.4228457771543088e-31,1.4028056971943888e-31,1.382765617234469e-31,1.3627255372745493e-31,1.3426854573146293e-31,1.3226453773547095e-31,1.3026052973947898e-31,1.2825652174348698e-31,1.26252513747495e-31,1.2424850575150302e-31,1.2224449775551102e-31,1.2024048975951905e-31,1.1823648176352707e-31,1.1623247376753507e-31,1.142284657715431e-31,1.1222445777555112e-31,1.1022044977955912e-31,1.0821644178356714e-31,1.0621243378757516e-31,1.0420842579158316e-31,1.0220441779559119e-31,1.002004097995992e-31,9.819640180360722e-32,9.619239380761523e-32,9.418838581162326e-32,9.218437781563127e-32,9.018036981963928e-32,8.81763618236473e-32,8.617235382765532e-32,8.416834583166333e-32,8.216433783567135e-32,8.016032983967936e-32,7.815632184368739e-32,7.61523138476954e-32,7.414830585170341e-32,7.214429785571143e-32,7.014028985971945e-32,6.813628186372746e-32,6.613227386773548e-32,6.412826587174349e-32,6.21242578757515e-32,6.012024987975953e-32,5.811624188376754e-32,5.611223388777555e-32,5.410822589178357e-32,5.210421789579159e-32,5.01002098997996e-32,4.809620190380762e-32,4.6092193907815633e-32,4.408818591182365e-32,4.208417791583167e-32,4.0080169919839685e-32,3.80761619238477e-32,3.6072153927855715e-32,3.406814593186373e-32,3.2064137935871744e-32,3.006012993987976e-32,2.805612194388778e-32,2.605211394789579e-32,2.4048105951903809e-32,2.2044097955911826e-32,2.004008995991984e-32,1.8036081963927858e-32,1.6032073967935873e-32,1.4028065971943888e-32,1.2024057975951905e-32,1.0020049979959921e-32,8.016041983967936e-33,6.012033987975952e-33,4.008025991983968e-33,2.004017995991984e-33,1.0e-38],"x":[1.0e-30,9.979959920040082e-31,9.95991984008016e-31,9.939879760120242e-31,9.91983968016032e-31,9.899799600200402e-31,9.879759520240483e-31,9.859719440280562e-31,9.839679360320643e-31,9.819639280360722e-31,9.799599200400803e-31,9.779559120440882e-31,9.759519040480963e-31,9.739478960521044e-31,9.719438880561123e-31,9.699398800601204e-31,9.679358720641283e-31,9.659318640681364e-31,9.639278560721445e-31,9.619238480761524e-31,9.599198400801605e-31,9.579158320841684e-31,9.559118240881765e-31,9.539078160921844e-31,9.519038080961925e-31,9.498998001002005e-31,9.478957921042085e-31,9.458917841082165e-31,9.438877761122245e-31,9.418837681162326e-31,9.398797601202406e-31,9.378757521242486e-31,9.358717441282566e-31,9.338677361322646e-31,9.318637281362726e-31,9.298597201402806e-31,9.278557121442886e-31,9.258517041482967e-31,9.238476961523046e-31,9.218436881563127e-31,9.198396801603207e-31,9.178356721643287e-31,9.158316641683368e-31,9.138276561723447e-31,9.118236481763528e-31,9.098196401803607e-31,9.078156321843688e-31,9.058116241883767e-31,9.038076161923848e-31,9.01803608196393e-31,8.997996002004008e-31,8.97795592204409e-31,8.957915842084168e-31,8.93787576212425e-31,8.91783568216433e-31,8.89779560220441e-31,8.87775552224449e-31,8.85771544228457e-31,8.83767536232465e-31,8.81763528236473e-31,8.79759520240481e-31,8.777555122444891e-31,8.75751504248497e-31,8.737474962525051e-31,8.71743488256513e-31,8.697394802605211e-31,8.677354722645292e-31,8.657314642685371e-31,8.637274562725452e-31,8.617234482765531e-31,8.597194402805612e-31,8.577154322845693e-31,8.557114242885772e-31,8.537074162925853e-31,8.517034082965932e-31,8.496994003006013e-31,8.476953923046092e-31,8.456913843086173e-31,8.436873763126254e-31,8.416833683166333e-31,8.396793603206414e-31,8.376753523246493e-31,8.356713443286574e-31,8.336673363326655e-31,8.316633283366734e-31,8.296593203406815e-31,8.276553123446894e-31,8.256513043486975e-31,8.236472963527054e-31,8.216432883567135e-31,8.196392803607216e-31,8.176352723647295e-31,8.156312643687376e-31,8.136272563727455e-31,8.116232483767536e-31,8.096192403807617e-31,8.076152323847696e-31,8.056112243887777e-31,8.036072163927856e-31,8.016032083967937e-31,7.995992004008016e-31,7.975951924048097e-31,7.955911844088178e-31,7.935871764128257e-31,7.915831684168338e-31,7.895791604208417e-31,7.875751524248498e-31,7.855711444288578e-31,7.835671364328658e-31,7.815631284368738e-31,7.795591204408819e-31,7.775551124448899e-31,7.755511044488979e-31,7.735470964529059e-31,7.715430884569139e-31,7.695390804609219e-31,7.6753507246493e-31,7.65531064468938e-31,7.63527056472946e-31,7.61523048476954e-31,7.59519040480962e-31,7.5751503248497e-31,7.5551102448897805e-31,7.5350701649298605e-31,7.5150300849699405e-31,7.4949900050100205e-31,7.4749499250501005e-31,7.4549098450901806e-31,7.4348697651302614e-31,7.4148296851703415e-31,7.3947896052104215e-31,7.3747495252505015e-31,7.3547094452905815e-31,7.3346693653306615e-31,7.314629285370742e-31,7.294589205410822e-31,7.274549125450902e-31,7.254509045490982e-31,7.234468965531062e-31,7.214428885571143e-31,7.194388805611223e-31,7.174348725651303e-31,7.154308645691383e-31,7.134268565731463e-31,7.114228485771543e-31,7.094188405811624e-31,7.074148325851704e-31,7.054108245891784e-31,7.034068165931864e-31,7.014028085971944e-31,6.993988006012024e-31,6.973947926052105e-31,6.953907846092185e-31,6.933867766132265e-31,6.913827686172345e-31,6.893787606212425e-31,6.873747526252505e-31,6.853707446292586e-31,6.833667366332666e-31,6.813627286372746e-31,6.793587206412826e-31,6.773547126452906e-31,6.753507046492986e-31,6.733466966533067e-31,6.713426886573147e-31,6.693386806613227e-31,6.673346726653307e-31,6.653306646693387e-31,6.633266566733467e-31,6.613226486773548e-31,6.593186406813628e-31,6.573146326853708e-31,6.553106246893788e-31,6.533066166933868e-31,6.513026086973948e-31,6.492986007014029e-31,6.472945927054109e-31,6.452905847094189e-31,6.432865767134269e-31,6.412825687174349e-31,6.392785607214429e-31,6.37274552725451e-31,6.35270544729459e-31,6.33266536733467e-31,6.31262528737475e-31,6.29258520741483e-31,6.27254512745491e-31,6.252505047494991e-31,6.232464967535071e-31,6.212424887575151e-31,6.192384807615231e-31,6.172344727655311e-31,6.152304647695391e-31,6.132264567735472e-31,6.112224487775552e-31,6.092184407815632e-31,6.072144327855712e-31,6.052104247895792e-31,6.032064167935872e-31,6.012024087975953e-31,5.991984008016033e-31,5.971943928056113e-31,5.951903848096193e-31,5.931863768136273e-31,5.911823688176354e-31,5.891783608216434e-31,5.871743528256514e-31,5.851703448296594e-31,5.831663368336674e-31,5.811623288376754e-31,5.791583208416835e-31,5.771543128456915e-31,5.751503048496995e-31,5.731462968537075e-31,5.711422888577155e-31,5.691382808617235e-31,5.6713427286573155e-31,5.6513026486973955e-31,5.6312625687374755e-31,5.6112224887775555e-31,5.5911824088176355e-31,5.5711423288577156e-31,5.5511022488977964e-31,5.5310621689378765e-31,5.5110220889779565e-31,5.4909820090180365e-31,5.4709419290581165e-31,5.4509018490981965e-31,5.430861769138277e-31,5.410821689178357e-31,5.390781609218437e-31,5.370741529258517e-31,5.350701449298597e-31,5.330661369338677e-31,5.310621289378758e-31,5.290581209418838e-31,5.270541129458918e-31,5.250501049498998e-31,5.230460969539078e-31,5.210420889579158e-31,5.190380809619239e-31,5.170340729659319e-31,5.150300649699399e-31,5.130260569739479e-31,5.110220489779559e-31,5.090180409819639e-31,5.07014032985972e-31,5.0501002498998e-31,5.03006016993988e-31,5.01002008997996e-31,4.98998001002004e-31,4.96993993006012e-31,4.949899850100201e-31,4.929859770140281e-31,4.909819690180361e-31,4.889779610220441e-31,4.869739530260521e-31,4.849699450300601e-31,4.829659370340682e-31,4.809619290380762e-31,4.789579210420842e-31,4.769539130460922e-31,4.749499050501002e-31,4.729458970541082e-31,4.709418890581163e-31,4.689378810621243e-31,4.669338730661323e-31,4.649298650701403e-31,4.629258570741483e-31,4.609218490781564e-31,4.589178410821644e-31,4.569138330861724e-31,4.549098250901804e-31,4.529058170941884e-31,4.509018090981964e-31,4.488978011022045e-31,4.468937931062125e-31,4.448897851102205e-31,4.428857771142285e-31,4.408817691182365e-31,4.388777611222445e-31,4.368737531262526e-31,4.348697451302606e-31,4.328657371342686e-31,4.308617291382766e-31,4.288577211422846e-31,4.268537131462926e-31,4.248497051503007e-31,4.228456971543087e-31,4.208416891583167e-31,4.188376811623247e-31,4.168336731663327e-31,4.148296651703407e-31,4.128256571743488e-31,4.108216491783568e-31,4.088176411823648e-31,4.068136331863728e-31,4.048096251903808e-31,4.028056171943888e-31,4.008016091983969e-31,3.987976012024049e-31,3.967935932064129e-31,3.947895852104209e-31,3.927855772144289e-31,3.907815692184369e-31,3.887775612224449e-31,3.8677355322645296e-31,3.8476954523046096e-31,3.8276553723446896e-31,3.80761529238477e-31,3.78757521242485e-31,3.76753513246493e-31,3.7474950525050105e-31,3.7274549725450905e-31,3.7074148925851705e-31,3.687374812625251e-31,3.667334732665331e-31,3.647294652705411e-31,3.6272545727454915e-31,3.6072144927855715e-31,3.5871744128256515e-31,3.567134332865732e-31,3.547094252905812e-31,3.527054172945892e-31,3.5070140929859724e-31,3.4869740130260524e-31,3.4669339330661324e-31,3.446893853106213e-31,3.426853773146293e-31,3.406813693186373e-31,3.3867736132264533e-31,3.3667335332665334e-31,3.3466934533066134e-31,3.326653373346694e-31,3.306613293386774e-31,3.286573213426854e-31,3.2665331334669343e-31,3.2464930535070143e-31,3.2264529735470943e-31,3.2064128935871747e-31,3.1863728136272548e-31,3.1663327336673348e-31,3.146292653707415e-31,3.1262525737474952e-31,3.1062124937875752e-31,3.0861724138276557e-31,3.0661323338677357e-31,3.0460922539078157e-31,3.026052173947896e-31,3.006012093987976e-31,2.985972014028056e-31,2.9659319340681366e-31,2.9458918541082166e-31,2.9258517741482966e-31,2.905811694188377e-31,2.885771614228457e-31,2.865731534268537e-31,2.8456914543086176e-31,2.8256513743486976e-31,2.8056112943887776e-31,2.785571214428858e-31,2.765531134468938e-31,2.745491054509018e-31,2.7254509745490985e-31,2.7054108945891785e-31,2.6853708146292585e-31,2.665330734669339e-31,2.645290654709419e-31,2.6252505747494994e-31,2.6052104947895794e-31,2.5851704148296595e-31,2.56513033486974e-31,2.54509025490982e-31,2.5250501749499e-31,2.5050100949899804e-31,2.4849700150300604e-31,2.4649299350701404e-31,2.444889855110221e-31,2.424849775150301e-31,2.404809695190381e-31,2.3847696152304613e-31,2.3647295352705413e-31,2.3446894553106213e-31,2.3246493753507018e-31,2.304609295390782e-31,2.284569215430862e-31,2.2645291354709422e-31,2.2444890555110223e-31,2.2244489755511023e-31,2.2044088955911827e-31,2.1843688156312627e-31,2.1643287356713427e-31,2.144288655711423e-31,2.124248575751503e-31,2.104208495791583e-31,2.0841684158316637e-31,2.0641283358717437e-31,2.0440882559118237e-31,2.024048175951904e-31,2.004008095991984e-31,1.983968016032064e-31,1.9639279360721444e-31,1.9438878561122246e-31,1.9238477761523048e-31,1.9038076961923848e-31,1.883767616232465e-31,1.8637275362725453e-31,1.8436874563126253e-31,1.8236473763527055e-31,1.8036072963927858e-31,1.7835672164328658e-31,1.763527136472946e-31,1.7434870565130262e-31,1.7234469765531063e-31,1.7034068965931865e-31,1.6833668166332667e-31,1.663326736673347e-31,1.643286656713427e-31,1.6232465767535072e-31,1.6032064967935874e-31,1.5831664168336674e-31,1.5631263368737477e-31,1.5430862569138279e-31,1.5230461769539079e-31,1.5030060969939881e-31,1.4829660170340683e-31,1.4629259370741484e-31,1.4428858571142286e-31,1.4228457771543088e-31,1.4028056971943888e-31,1.382765617234469e-31,1.3627255372745493e-31,1.3426854573146293e-31,1.3226453773547095e-31,1.3026052973947898e-31,1.2825652174348698e-31,1.26252513747495e-31,1.2424850575150302e-31,1.2224449775551102e-31,1.2024048975951905e-31,1.1823648176352707e-31,1.1623247376753507e-31,1.142284657715431e-31,1.1222445777555112e-31,1.1022044977955912e-31,1.0821644178356714e-31,1.0621243378757516e-31,1.0420842579158316e-31,1.0220441779559119e-31,1.002004097995992e-31,9.819640180360722e-32,9.619239380761523e-32,9.418838581162326e-32,9.218437781563127e-32,9.018036981963928e-32,8.81763618236473e-32,8.617235382765532e-32,8.416834583166333e-32,8.216433783567135e-32,8.016032983967936e-32,7.815632184368739e-32,7.61523138476954e-32,7.414830585170341e-32,7.214429785571143e-32,7.014028985971945e-32,6.813628186372746e-32,6.613227386773548e-32,6.412826587174349e-32,6.21242578757515e-32,6.012024987975953e-32,5.811624188376754e-32,5.611223388777555e-32,5.410822589178357e-32,5.210421789579159e-32,5.01002098997996e-32,4.809620190380762e-32,4.6092193907815633e-32,4.408818591182365e-32,4.208417791583167e-32,4.0080169919839685e-32,3.80761619238477e-32,3.6072153927855715e-32,3.406814593186373e-32,3.2064137935871744e-32,3.006012993987976e-32,2.805612194388778e-32,2.605211394789579e-32,2.4048105951903809e-32,2.2044097955911826e-32,2.004008995991984e-32,1.8036081963927858e-32,1.6032073967935873e-32,1.4028065971943888e-32,1.2024057975951905e-32,1.0020049979959921e-32,8.016041983967936e-33,6.012033987975952e-33,4.008025991983968e-33,2.004017995991984e-33,1.0e-38]}

},{}],74:[function(require,module,exports){
(function (__filename){(function (){
/**
* @license Apache-2.0
*
* Copyright (c) 2024 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
var isnanf = require( '@stdlib/math/base/assert/is-nanf' );
var abs = require( '@stdlib/math/base/special/abs' );
var EPS = require( '@stdlib/constants/float32/eps' );
var PINF = require( '@stdlib/constants/float32/pinf' );
var NINF = require( '@stdlib/constants/float32/ninf' );
var HALF_PI = require( '@stdlib/constants/float32/half-pi' );
var float64ToFloat32 = require( '@stdlib/number/float64/base/to-float32' );
var isNegativeZerof = require( '@stdlib/math/base/assert/is-negative-zerof' );
var isPositiveZerof = require( '@stdlib/math/base/assert/is-positive-zerof' );
var atanf = require( './../lib' );


// FIXTURES //

var largerNegative = require( './fixtures/julia/larger_negative.json' );
var largerPositive = require( './fixtures/julia/larger_positive.json' );
var largeNegative = require( './fixtures/julia/large_negative.json' );
var largePositive = require( './fixtures/julia/large_positive.json' );
var mediumNegative = require( './fixtures/julia/medium_negative.json' );
var mediumPositive = require( './fixtures/julia/medium_positive.json' );
var smallNegative = require( './fixtures/julia/small_negative.json' );
var smallPositive = require( './fixtures/julia/small_positive.json' );
var smaller = require( './fixtures/julia/smaller.json' );
var tinyNegative = require( './fixtures/julia/tiny_negative.json' );
var tinyPositive = require( './fixtures/julia/tiny_positive.json' );
var hugeNegative = require( './fixtures/julia/huge_negative.json' );
var hugePositive = require( './fixtures/julia/huge_positive.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.true( typeof atanf, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function computes the arctangent on the interval `[ -1e-38, -1e-30] `', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;
	var e;

	x = tinyNegative.x;
	expected = tinyNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = atanf( x[ i ] );
		e = float64ToFloat32( expected[ i ] );
		if ( y === e ) {
			t.equal( y, e, 'x: '+x[ i ]+'. E: '+e );
		} else {
			delta = abs( y - e );
			tol = EPS * abs( e );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. y: '+y+'. E: '+e+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the arctangent on the interval `[ 1e-30, 1e-38 ]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;
	var e;

	x = tinyPositive.x;
	expected = tinyPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = atanf( x[ i ] );
		e = float64ToFloat32( expected[ i ] );
		if ( y === e ) {
			t.equal( y, e, 'x: '+x[ i ]+'. E: '+e );
		} else {
			delta = abs( y - e );
			tol = EPS * abs( e );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. y: '+y+'. E: '+e+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the arctangent on the interval `[ -0.8, 0.8 ]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;
	var e;

	x = smaller.x;
	expected = smaller.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = atanf( x[ i ] );
		e = float64ToFloat32( expected[ i ] );
		if ( y === e ) {
			t.equal( y, e, 'x: '+x[ i ]+'. E: '+e );
		} else {
			delta = abs( y - e );
			tol = 1.8 * EPS * abs( e );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. y: '+y+'. E: '+e+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the arctangent on the interval `[ -1.0, -0.8 ]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;
	var e;

	x = smallNegative.x;
	expected = smallNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = atanf( x[ i ] );
		e = float64ToFloat32( expected[ i ] );
		if ( y === e ) {
			t.equal( y, e, 'x: '+x[ i ]+'. E: '+e );
		} else {
			delta = abs( y - e );
			tol = EPS * abs( e );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. y: '+y+'. E: '+e+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the arctangent on the interval `[ 0.8, 1.0 ]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;
	var e;

	x = smallPositive.x;
	expected = smallPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = atanf( x[ i ] );
		e = float64ToFloat32( expected[ i ] );
		if ( y === e ) {
			t.equal( y, e, 'x: '+x[ i ]+'. E: '+e );
		} else {
			delta = abs( y - e );
			tol = EPS * abs( e );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. y: '+y+'. E: '+e+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the arctangent on the interval `[ -3.0, -1.0 ]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;
	var e;

	x = mediumNegative.x;
	expected = mediumNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = atanf( x[ i ] );
		e = float64ToFloat32( expected[ i ] );
		if ( y === e ) {
			t.equal( y, e, 'x: '+x[ i ]+'. E: '+e );
		} else {
			delta = abs( y - e );
			tol = EPS * abs( e );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. y: '+y+'. E: '+e+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the arctangent on the interval `[ 1.0, 3.0 ]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;
	var e;

	x = mediumPositive.x;
	expected = mediumPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = atanf( x[ i ] );
		e = float64ToFloat32( expected[ i ] );
		if ( y === e ) {
			t.equal( y, e, 'x: '+x[ i ]+'. E: '+e );
		} else {
			delta = abs( y - e );
			tol = EPS * abs( e );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. y: '+y+'. E: '+e+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the arctangent on the interval `[ 3.0, 100.0 ]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;
	var e;

	x = largePositive.x;
	expected = largePositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = atanf( x[ i ] );
		e = float64ToFloat32( expected[ i ] );
		if ( y === e ) {
			t.equal( y, e, 'x: '+x[ i ]+'. E: '+e );
		} else {
			delta = abs( y - e );
			tol = EPS * abs( e );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. y: '+y+'. E: '+e+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the arctangent on the interval `[ -100.0, -3.0 ]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;
	var e;

	x = largeNegative.x;
	expected = largeNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = atanf( x[ i ] );
		e = float64ToFloat32( expected[ i ] );
		if ( y === e ) {
			t.equal( y, e, 'x: '+x[ i ]+'. E: '+e );
		} else {
			delta = abs( y - e );
			tol = EPS * abs( e );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. y: '+y+'. E: '+e+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the arctangent on the interval `[ 100.0, 1000.0 ]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;
	var e;

	x = largerPositive.x;
	expected = largerPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = atanf( x[ i ] );
		e = float64ToFloat32( expected[ i ] );
		if ( y === e ) {
			t.equal( y, e, 'x: '+x[ i ]+'. E: '+e );
		} else {
			delta = abs( y - e );
			tol = EPS * abs( e );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. y: '+y+'. E: '+e+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the arctangent on the interval `[ -1000.0, -100.0 ]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;
	var e;

	x = largerNegative.x;
	expected = largerNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = atanf( x[ i ] );
		e = float64ToFloat32( expected[ i ] );
		if ( y === e ) {
			t.equal( y, e, 'x: '+x[ i ]+'. E: '+e );
		} else {
			delta = abs( y - e );
			tol = EPS * abs( e );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. y: '+y+'. E: '+e+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the arctangent on the interval `[ -1e20, -1e28 ]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;
	var e;

	x = hugeNegative.x;
	expected = hugeNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = atanf( x[ i ] );
		e = float64ToFloat32( expected[ i ] );
		if ( y === e ) {
			t.equal( y, e, 'x: '+x[ i ]+'. E: '+e );
		} else {
			delta = abs( y - e );
			tol = EPS * abs( e );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. y: '+y+'. E: '+e+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the arctangent on the interval `[ 1e30, 1e38 ]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;
	var e;

	x = hugePositive.x;
	expected = hugePositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = atanf( x[ i ] );
		e = float64ToFloat32( expected[ i ] );
		if ( y === e ) {
			t.equal( y, e, 'x: '+x[ i ]+'. E: '+e );
		} else {
			delta = abs( y - e );
			tol = EPS * abs( e );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. y: '+y+'. E: '+e+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function returns `NaN` if provided `NaN`', function test( t ) {
	var v = atanf( NaN );
	t.equal( isnanf( v ), true, 'returns NaN' );
	t.end();
});

tape( 'the function returns `pi/2` if provided `+infinity`', function test( t ) {
	var v = atanf( PINF );
	t.equal( v, HALF_PI, 'returns expected value' );
	t.end();
});

tape( 'the function returns `-pi/2` if provided `-infinity`', function test( t ) {
	var v = atanf( NINF );
	t.equal( v, -HALF_PI, 'returns expected value' );
	t.end();
});

tape( 'the function returns `-0` if provided `-0`', function test( t ) {
	var v = atanf( -0.0 );
	t.equal( isNegativeZerof( v ), true, 'returns -0' );
	t.end();
});

tape( 'the function returns `0` if provided +0', function test( t ) {
	var v;

	v = atanf( 0.0 );
	t.equal( isPositiveZerof( v ), true, 'returns +0' );

	v = atanf( +0.0 );
	t.equal( isPositiveZerof( v ), true, 'returns +0' );

	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/atanf/test/test.js")
},{"./../lib":58,"./fixtures/julia/huge_negative.json":61,"./fixtures/julia/huge_positive.json":62,"./fixtures/julia/large_negative.json":63,"./fixtures/julia/large_positive.json":64,"./fixtures/julia/larger_negative.json":65,"./fixtures/julia/larger_positive.json":66,"./fixtures/julia/medium_negative.json":67,"./fixtures/julia/medium_positive.json":68,"./fixtures/julia/small_negative.json":69,"./fixtures/julia/small_positive.json":70,"./fixtures/julia/smaller.json":71,"./fixtures/julia/tiny_negative.json":72,"./fixtures/julia/tiny_positive.json":73,"@stdlib/constants/float32/eps":43,"@stdlib/constants/float32/half-pi":45,"@stdlib/constants/float32/ninf":46,"@stdlib/constants/float32/pinf":47,"@stdlib/math/base/assert/is-nanf":50,"@stdlib/math/base/assert/is-negative-zerof":52,"@stdlib/math/base/assert/is-positive-zerof":54,"@stdlib/math/base/special/abs":56,"@stdlib/number/float64/base/to-float32":76,"tape":256}],75:[function(require,module,exports){
(function (__filename,__dirname){(function (){
/**
* @license Apache-2.0
*
* Copyright (c) 2024 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
var tape = require( 'tape' );
var isnanf = require( '@stdlib/math/base/assert/is-nanf' );
var abs = require( '@stdlib/math/base/special/abs' );
var EPS = require( '@stdlib/constants/float32/eps' );
var PINF = require( '@stdlib/constants/float32/pinf' );
var NINF = require( '@stdlib/constants/float32/ninf' );
var HALF_PI = require( '@stdlib/constants/float32/half-pi' );
var float64ToFloat32 = require( '@stdlib/number/float64/base/to-float32' );
var isNegativeZerof = require( '@stdlib/math/base/assert/is-negative-zerof' );
var isPositiveZerof = require( '@stdlib/math/base/assert/is-positive-zerof' );
var tryRequire = require( '@stdlib/utils/try-require' );


// VARIABLES //

var atanf = tryRequire( resolve( __dirname, './../lib/native.js' ) );
var opts = {
	'skip': ( atanf instanceof Error )
};


// FIXTURES //

var largerNegative = require( './fixtures/julia/larger_negative.json' );
var largerPositive = require( './fixtures/julia/larger_positive.json' );
var largeNegative = require( './fixtures/julia/large_negative.json' );
var largePositive = require( './fixtures/julia/large_positive.json' );
var mediumNegative = require( './fixtures/julia/medium_negative.json' );
var mediumPositive = require( './fixtures/julia/medium_positive.json' );
var smallNegative = require( './fixtures/julia/small_negative.json' );
var smallPositive = require( './fixtures/julia/small_positive.json' );
var smaller = require( './fixtures/julia/smaller.json' );
var tinyNegative = require( './fixtures/julia/tiny_negative.json' );
var tinyPositive = require( './fixtures/julia/tiny_positive.json' );
var hugeNegative = require( './fixtures/julia/huge_negative.json' );
var hugePositive = require( './fixtures/julia/huge_positive.json' );


// TESTS //

tape( 'main export is a function', opts, function test( t ) {
	t.ok( true, __filename );
	t.true( typeof atan, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function computes the arctangent on the interval `[ -1e-38, -1e-30] `', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;
	var e;

	x = tinyNegative.x;
	expected = tinyNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = atanf( x[ i ] );
		e = float64ToFloat32( expected[ i ] );
		if ( y === e ) {
			t.equal( y, e, 'x: '+x[ i ]+'. E: '+e );
		} else {
			delta = abs( y - e );
			tol = EPS * abs( e );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. y: '+y+'. E: '+e+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the arctangent on the interval `[ 1e-30, 1e-38 ]`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;
	var e;

	x = tinyPositive.x;
	expected = tinyPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = atanf( x[ i ] );
		e = float64ToFloat32( expected[ i ] );
		if ( y === e ) {
			t.equal( y, e, 'x: '+x[ i ]+'. E: '+e );
		} else {
			delta = abs( y - e );
			tol = EPS * abs( e );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. y: '+y+'. E: '+e+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the arctangent on the interval `[ -0.8, 0.8 ]`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;
	var e;

	x = smaller.x;
	expected = smaller.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = atanf( x[ i ] );
		e = float64ToFloat32( expected[ i ] );
		if ( y === e ) {
			t.equal( y, e, 'x: '+x[ i ]+'. E: '+e );
		} else {
			delta = abs( y - e );
			tol = 1.8 * EPS * abs( e );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. y: '+y+'. E: '+e+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the arctangent on the interval `[ -1.0, -0.8 ]`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;
	var e;

	x = smallNegative.x;
	expected = smallNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = atanf( x[ i ] );
		e = float64ToFloat32( expected[ i ] );
		if ( y === e ) {
			t.equal( y, e, 'x: '+x[ i ]+'. E: '+e );
		} else {
			delta = abs( y - e );
			tol = EPS * abs( e );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. y: '+y+'. E: '+e+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the arctangent on the interval `[ 0.8, 1.0 ]`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;
	var e;

	x = smallPositive.x;
	expected = smallPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = atanf( x[ i ] );
		e = float64ToFloat32( expected[ i ] );
		if ( y === e ) {
			t.equal( y, e, 'x: '+x[ i ]+'. E: '+e );
		} else {
			delta = abs( y - e );
			tol = EPS * abs( e );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. y: '+y+'. E: '+e+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the arctangent on the interval `[ -3.0, -1.0 ]`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;
	var e;

	x = mediumNegative.x;
	expected = mediumNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = atanf( x[ i ] );
		e = float64ToFloat32( expected[ i ] );
		if ( y === e ) {
			t.equal( y, e, 'x: '+x[ i ]+'. E: '+e );
		} else {
			delta = abs( y - e );
			tol = EPS * abs( e );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. y: '+y+'. E: '+e+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the arctangent on the interval `[ 1.0, 3.0 ]`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;
	var e;

	x = mediumPositive.x;
	expected = mediumPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = atanf( x[ i ] );
		e = float64ToFloat32( expected[ i ] );
		if ( y === e ) {
			t.equal( y, e, 'x: '+x[ i ]+'. E: '+e );
		} else {
			delta = abs( y - e );
			tol = EPS * abs( e );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. y: '+y+'. E: '+e+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the arctangent on the interval `[ 3.0, 100.0 ]`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;
	var e;

	x = largePositive.x;
	expected = largePositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = atanf( x[ i ] );
		e = float64ToFloat32( expected[ i ] );
		if ( y === e ) {
			t.equal( y, e, 'x: '+x[ i ]+'. E: '+e );
		} else {
			delta = abs( y - e );
			tol = EPS * abs( e );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. y: '+y+'. E: '+e+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the arctangent on the interval `[ -100.0, -3.0 ]`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;
	var e;

	x = largeNegative.x;
	expected = largeNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = atanf( x[ i ] );
		e = float64ToFloat32( expected[ i ] );
		if ( y === e ) {
			t.equal( y, e, 'x: '+x[ i ]+'. E: '+e );
		} else {
			delta = abs( y - e );
			tol = EPS * abs( e );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. y: '+y+'. E: '+e+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the arctangent on the interval `[ 100.0, 1000.0 ]`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;
	var e;

	x = largerPositive.x;
	expected = largerPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = atanf( x[ i ] );
		e = float64ToFloat32( expected[ i ] );
		if ( y === e ) {
			t.equal( y, e, 'x: '+x[ i ]+'. E: '+e );
		} else {
			delta = abs( y - e );
			tol = EPS * abs( e );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. y: '+y+'. E: '+e+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the arctangent on the interval `[ -1000.0, -100.0 ]`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;
	var e;

	x = largerNegative.x;
	expected = largerNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = atanf( x[ i ] );
		e = float64ToFloat32( expected[ i ] );
		if ( y === e ) {
			t.equal( y, e, 'x: '+x[ i ]+'. E: '+e );
		} else {
			delta = abs( y - e );
			tol = EPS * abs( e );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. y: '+y+'. E: '+e+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the arctangent on the interval `[ -1e20, -1e28 ]`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;
	var e;

	x = hugeNegative.x;
	expected = hugeNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = atanf( x[ i ] );
		e = float64ToFloat32( expected[ i ] );
		if ( y === e ) {
			t.equal( y, e, 'x: '+x[ i ]+'. E: '+e );
		} else {
			delta = abs( y - e );
			tol = EPS * abs( e );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. y: '+y+'. E: '+e+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the arctangent on the interval `[ 1e30, 1e38 ]`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;
	var e;

	x = hugePositive.x;
	expected = hugePositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = atanf( x[ i ] );
		e = float64ToFloat32( expected[ i ] );
		if ( y === e ) {
			t.equal( y, e, 'x: '+x[ i ]+'. E: '+e );
		} else {
			delta = abs( y - e );
			tol = EPS * abs( e );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. y: '+y+'. E: '+e+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function returns `NaN` if provided `NaN`', opts, function test( t ) {
	var v = atanf( NaN );
	t.equal( isnanf( v ), true, 'returns NaN' );
	t.end();
});

tape( 'the function returns `pi/2` if provided `+infinity`', opts, function test( t ) {
	var v = atanf( PINF );
	t.equal( v, HALF_PI, 'returns expected value' );
	t.end();
});

tape( 'the function returns `-pi/2` if provided `-infinity`', opts, function test( t ) {
	var v = atanf( NINF );
	t.equal( v, -HALF_PI, 'returns expected value' );
	t.end();
});

tape( 'the function returns `-0` if provided `-0`', opts, function test( t ) {
	var v = atanf( -0.0 );
	t.equal( isNegativeZerof( v ), true, 'returns -0' );
	t.end();
});

tape( 'the function returns `0` if provided +0', opts, function test( t ) {
	var v;

	v = atanf( 0.0 );
	t.equal( isPositiveZerof( v ), true, 'returns +0' );

	v = atanf( +0.0 );
	t.equal( isPositiveZerof( v ), true, 'returns +0' );

	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/atanf/test/test.native.js","/lib/node_modules/@stdlib/math/base/special/atanf/test")
},{"./fixtures/julia/huge_negative.json":61,"./fixtures/julia/huge_positive.json":62,"./fixtures/julia/large_negative.json":63,"./fixtures/julia/large_positive.json":64,"./fixtures/julia/larger_negative.json":65,"./fixtures/julia/larger_positive.json":66,"./fixtures/julia/medium_negative.json":67,"./fixtures/julia/medium_positive.json":68,"./fixtures/julia/small_negative.json":69,"./fixtures/julia/small_positive.json":70,"./fixtures/julia/smaller.json":71,"./fixtures/julia/tiny_negative.json":72,"./fixtures/julia/tiny_positive.json":73,"@stdlib/constants/float32/eps":43,"@stdlib/constants/float32/half-pi":45,"@stdlib/constants/float32/ninf":46,"@stdlib/constants/float32/pinf":47,"@stdlib/math/base/assert/is-nanf":50,"@stdlib/math/base/assert/is-negative-zerof":52,"@stdlib/math/base/assert/is-positive-zerof":54,"@stdlib/math/base/special/abs":56,"@stdlib/number/float64/base/to-float32":76,"@stdlib/utils/try-require":124,"path":138,"tape":256}],76:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Convert a double-precision floating-point number to the nearest single-precision floating-point number.
*
* @module @stdlib/number/float64/base/to-float32
*
* @example
* var float64ToFloat32 = require( '@stdlib/number/float64/base/to-float32' );
*
* var y = float64ToFloat32( 1.337 );
* // returns 1.3370000123977661
*/

// MODULES //

var builtin = require( './main.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var float64ToFloat32;
if ( typeof builtin === 'function' ) {
	float64ToFloat32 = builtin;
} else {
	float64ToFloat32 = polyfill;
}


// EXPORTS //

module.exports = float64ToFloat32;

},{"./main.js":77,"./polyfill.js":78}],77:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var fround = ( typeof Math.fround === 'function' ) ? Math.fround : null; // eslint-disable-line stdlib/no-builtin-math


// EXPORTS //

module.exports = fround;

},{}],78:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var Float32Array = require( '@stdlib/array/float32' );


// VARIABLES //

var FLOAT32_VIEW = new Float32Array( 1 );


// MAIN //

/**
* Converts a double-precision floating-point number to the nearest single-precision floating-point number.
*
* @param {number} x - double-precision floating-point number
* @returns {number} nearest single-precision floating-point number
*
* @example
* var y = float64ToFloat32( 1.337 );
* // returns 1.3370000123977661
*/
function float64ToFloat32( x ) {
	FLOAT32_VIEW[ 0 ] = x;
	return FLOAT32_VIEW[ 0 ];
}


// EXPORTS //

module.exports = float64ToFloat32;

},{"@stdlib/array/float32":1}],79:[function(require,module,exports){
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
* Object constructor.
*
* @module @stdlib/object/ctor
*
* @example
* var Object = require( '@stdlib/object/ctor' );
*
* var o = new Object( null );
* // returns {}
*
* o = new Object( 5.0 );
* // returns <Number>
*
* o = new Object( 'beep' );
* // returns <String>
*
* var o1 = {};
*
* var o2 = new Object( o1 );
* // returns {}
*
* var bool = ( o1 === o2 );
* // returns true
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":80}],80:[function(require,module,exports){
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
* Returns an object.
*
* @name Object
* @constructor
* @type {Function}
* @param {*} value - input value
* @returns {Object} object
*
* @example
* var o = new Object( null );
* // returns {}
*
* @example
* var o = new Object( 5.0 );
* // returns <Number>
*
* @example
* var o = new Object( 'beep' );
* // returns <String>
*
* @example
* var o1 = {};
*
* var o2 = new Object( o1 );
* // returns {}
*
* var bool = ( o1 === o2 );
* // returns true
*/
var Obj = Object; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = Obj;

},{}],81:[function(require,module,exports){
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

},{"./main.js":82,"./regexp.js":83,"@stdlib/utils/define-nonenumerable-read-only-property":101}],82:[function(require,module,exports){
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

},{"./main.js":82}],84:[function(require,module,exports){
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

},{"./is_number.js":87}],85:[function(require,module,exports){
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

},{"./is_number.js":87,"./zero_pad.js":91}],86:[function(require,module,exports){
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

},{"./main.js":89}],87:[function(require,module,exports){
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

},{}],88:[function(require,module,exports){
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

},{}],89:[function(require,module,exports){
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

},{"./format_double.js":84,"./format_integer.js":85,"./is_string.js":88,"./space_pad.js":90,"./zero_pad.js":91}],90:[function(require,module,exports){
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

},{}],91:[function(require,module,exports){
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

},{}],92:[function(require,module,exports){
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

},{"./main.js":93}],93:[function(require,module,exports){
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

},{}],94:[function(require,module,exports){
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

},{"./main.js":96}],95:[function(require,module,exports){
arguments[4][88][0].apply(exports,arguments)
},{"dup":88}],96:[function(require,module,exports){
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

},{"./is_string.js":95,"@stdlib/string/base/format-interpolate":86,"@stdlib/string/base/format-tokenize":92}],97:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":98}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],99:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":100}],100:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/is-buffer":27,"@stdlib/regexp/function-name":81,"@stdlib/utils/native-class":119}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":102}],102:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/define-property":106}],103:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],104:[function(require,module,exports){
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

},{}],105:[function(require,module,exports){
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

},{"./define_property.js":104}],106:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./builtin.js":103,"./has_define_property_support.js":105,"./polyfill.js":107}],107:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":94}],108:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./native.js":111,"./polyfill.js":112,"@stdlib/assert/is-function":33}],109:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":110}],110:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var Object = require( '@stdlib/object/ctor' );
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

},{"./detect.js":108,"@stdlib/object/ctor":79}],111:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var getProto = Object.getPrototypeOf;


// EXPORTS //

module.exports = getProto;

},{}],112:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./proto.js":113,"@stdlib/utils/native-class":119}],113:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],114:[function(require,module,exports){
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

},{"./codegen.js":115,"./global_this.js":116,"./self.js":117,"./window.js":118,"@stdlib/assert/is-boolean":21,"@stdlib/string/format":94}],115:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],116:[function(require,module,exports){
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

},{}],117:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],118:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],119:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":120,"./polyfill.js":121,"@stdlib/assert/has-tostringtag-support":14}],120:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./tostring.js":122}],121:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./tostring.js":122,"./tostringtag.js":123,"@stdlib/assert/has-own-property":10}],122:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],123:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/symbol/ctor":97}],124:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Wrap `require` in a try/catch block.
*
* @module @stdlib/utils/try-require
*
* @example
* var tryRequire = require( '@stdlib/utils/try-require' );
*
* var out = tryRequire( 'beepboop' );
*
* if ( out instanceof Error ) {
*     console.log( out.message );
* }
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":125}],125:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var isError = require( '@stdlib/assert/is-error' );


// MAIN //

/**
* Wraps `require` in a try/catch block.
*
* @param {string} id - module id
* @returns {*|Error} `module.exports` of the resolved module or an error
*
* @example
* var out = tryRequire( 'beepboop' );
*
* if ( out instanceof Error ) {
*     console.error( out.message );
* }
*/
function tryRequire( id ) {
	try {
		return require( id ); // eslint-disable-line stdlib/no-dynamic-require
	} catch ( error ) {
		if ( isError( error ) ) {
			return error;
		}
		// Handle case where a literal is thrown...
		if ( typeof error === 'object' ) {
			return new Error( JSON.stringify( error ) );
		}
		return new Error( error.toString() );
	}
}


// EXPORTS //

module.exports = tryRequire;

},{"@stdlib/assert/is-error":29}],126:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./fixtures/nodelist.js":127,"./fixtures/re.js":128,"./fixtures/typedarray.js":129}],127:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/global":114}],128:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],129:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],130:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./check.js":126,"./main.js":131,"./polyfill.js":132}],131:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/constructor-name":99}],132:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/constructor-name":99}],133:[function(require,module,exports){
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

},{}],134:[function(require,module,exports){

},{}],135:[function(require,module,exports){
arguments[4][134][0].apply(exports,arguments)
},{"dup":134}],136:[function(require,module,exports){
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
},{"base64-js":133,"buffer":136,"ieee754":239}],137:[function(require,module,exports){
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

},{}],138:[function(require,module,exports){
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
},{"_process":246}],139:[function(require,module,exports){
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

},{"events":137,"inherits":240,"readable-stream/lib/_stream_duplex.js":141,"readable-stream/lib/_stream_passthrough.js":142,"readable-stream/lib/_stream_readable.js":143,"readable-stream/lib/_stream_transform.js":144,"readable-stream/lib/_stream_writable.js":145,"readable-stream/lib/internal/streams/end-of-stream.js":149,"readable-stream/lib/internal/streams/pipeline.js":151}],140:[function(require,module,exports){
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

},{}],141:[function(require,module,exports){
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
},{"./_stream_readable":143,"./_stream_writable":145,"_process":246,"inherits":240}],142:[function(require,module,exports){
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
},{"./_stream_transform":144,"inherits":240}],143:[function(require,module,exports){
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
},{"../errors":140,"./_stream_duplex":141,"./internal/streams/async_iterator":146,"./internal/streams/buffer_list":147,"./internal/streams/destroy":148,"./internal/streams/from":150,"./internal/streams/state":152,"./internal/streams/stream":153,"_process":246,"buffer":136,"events":137,"inherits":240,"string_decoder/":255,"util":134}],144:[function(require,module,exports){
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
},{"../errors":140,"./_stream_duplex":141,"inherits":240}],145:[function(require,module,exports){
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
},{"../errors":140,"./_stream_duplex":141,"./internal/streams/destroy":148,"./internal/streams/state":152,"./internal/streams/stream":153,"_process":246,"buffer":136,"inherits":240,"util-deprecate":264}],146:[function(require,module,exports){
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
},{"./end-of-stream":149,"_process":246}],147:[function(require,module,exports){
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
},{"buffer":136,"util":134}],148:[function(require,module,exports){
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
},{"_process":246}],149:[function(require,module,exports){
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
},{"../../../errors":140}],150:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],151:[function(require,module,exports){
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
},{"../../../errors":140,"./end-of-stream":149}],152:[function(require,module,exports){
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
},{"../../../errors":140}],153:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":137}],154:[function(require,module,exports){
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

},{"./":155,"get-intrinsic":230}],155:[function(require,module,exports){
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

},{"es-define-property":215,"es-errors/type":221,"function-bind":229,"get-intrinsic":230,"set-function-length":250}],156:[function(require,module,exports){
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

},{"./lib/is_arguments.js":157,"./lib/keys.js":158}],157:[function(require,module,exports){
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

},{}],158:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],159:[function(require,module,exports){
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

},{"es-define-property":215,"es-errors/syntax":220,"es-errors/type":221,"gopd":231}],160:[function(require,module,exports){
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

},{"define-data-property":159,"has-property-descriptors":232,"object-keys":244}],161:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],162:[function(require,module,exports){
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

},{"./ToNumber":193,"./ToPrimitive":195,"./Type":200}],163:[function(require,module,exports){
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

},{"../helpers/isFinite":208,"../helpers/isNaN":209,"../helpers/isPrefixOf":210,"./ToNumber":193,"./ToPrimitive":195,"es-errors/type":221,"get-intrinsic":230}],164:[function(require,module,exports){
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

},{"call-bind/callBound":154,"es-errors/type":221}],165:[function(require,module,exports){
'use strict';

var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value) {
	return RequireObjectCoercible(value, arguments.length > 1 ? arguments[1] : void undefined);
};

},{"es-object-atoms/RequireObjectCoercible":223}],166:[function(require,module,exports){
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

},{"./DayWithinYear":169,"./InLeapYear":173,"./MonthFromTime":183,"es-errors/eval":216}],167:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":214,"./floor":204}],168:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":204}],169:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":167,"./DayFromYear":168,"./YearFromTime":202}],170:[function(require,module,exports){
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

},{"./modulo":205}],171:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":212,"./IsAccessorDescriptor":174,"./IsDataDescriptor":176,"es-errors/type":221}],172:[function(require,module,exports){
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

},{"../helpers/timeConstants":214,"./floor":204,"./modulo":205}],173:[function(require,module,exports){
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

},{"./DaysInYear":170,"./YearFromTime":202,"es-errors/eval":216}],174:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":212,"es-errors/type":221,"hasown":238}],175:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":241}],176:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":212,"es-errors/type":221,"hasown":238}],177:[function(require,module,exports){
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

},{"./IsAccessorDescriptor":174,"./IsDataDescriptor":176,"./IsPropertyDescriptor":178,"es-errors/type":221}],178:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor(Desc);
};

},{"../helpers/records/property-descriptor":212}],179:[function(require,module,exports){
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

},{"../helpers/isFinite":208,"../helpers/timeConstants":214}],180:[function(require,module,exports){
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

},{"../helpers/isFinite":208,"./DateFromTime":166,"./Day":167,"./MonthFromTime":183,"./ToInteger":192,"./YearFromTime":202,"./floor":204,"./modulo":205,"get-intrinsic":230}],181:[function(require,module,exports){
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

},{"../helpers/isFinite":208,"../helpers/timeConstants":214,"./ToInteger":192}],182:[function(require,module,exports){
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

},{"../helpers/timeConstants":214,"./floor":204,"./modulo":205}],183:[function(require,module,exports){
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

},{"./DayWithinYear":169,"./InLeapYear":173}],184:[function(require,module,exports){
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

},{"../helpers/isNaN":209}],185:[function(require,module,exports){
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

},{"../helpers/timeConstants":214,"./floor":204,"./modulo":205}],186:[function(require,module,exports){
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

},{"./Type":200}],187:[function(require,module,exports){
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


},{"../helpers/isFinite":208,"./ToNumber":193,"./abs":203,"get-intrinsic":230}],188:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":214,"./DayFromYear":168}],189:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":214,"./modulo":205}],190:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],191:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":193}],192:[function(require,module,exports){
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

},{"../helpers/isFinite":208,"../helpers/isNaN":209,"../helpers/sign":213,"./ToNumber":193,"./abs":203,"./floor":204}],193:[function(require,module,exports){
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

},{"./ToPrimitive":195,"call-bind/callBound":154,"safe-regex-test":249}],194:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = require('es-object-atoms/ToObject');

},{"es-object-atoms/ToObject":224}],195:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":226}],196:[function(require,module,exports){
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

},{"./IsCallable":175,"./ToBoolean":190,"./Type":200,"es-errors/type":221,"hasown":238}],197:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":230}],198:[function(require,module,exports){
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

},{"../helpers/isFinite":208,"../helpers/isNaN":209,"../helpers/sign":213,"./ToNumber":193,"./abs":203,"./floor":204,"./modulo":205}],199:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":193}],200:[function(require,module,exports){
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

},{}],201:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":167,"./modulo":205}],202:[function(require,module,exports){
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

},{"call-bind/callBound":154,"get-intrinsic":230}],203:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":230}],204:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],205:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":211}],206:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":214,"./modulo":205}],207:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":162,"./5/AbstractRelationalComparison":163,"./5/Canonicalize":164,"./5/CheckObjectCoercible":165,"./5/DateFromTime":166,"./5/Day":167,"./5/DayFromYear":168,"./5/DayWithinYear":169,"./5/DaysInYear":170,"./5/FromPropertyDescriptor":171,"./5/HourFromTime":172,"./5/InLeapYear":173,"./5/IsAccessorDescriptor":174,"./5/IsCallable":175,"./5/IsDataDescriptor":176,"./5/IsGenericDescriptor":177,"./5/IsPropertyDescriptor":178,"./5/MakeDate":179,"./5/MakeDay":180,"./5/MakeTime":181,"./5/MinFromTime":182,"./5/MonthFromTime":183,"./5/SameValue":184,"./5/SecFromTime":185,"./5/StrictEqualityComparison":186,"./5/TimeClip":187,"./5/TimeFromYear":188,"./5/TimeWithinDay":189,"./5/ToBoolean":190,"./5/ToInt32":191,"./5/ToInteger":192,"./5/ToNumber":193,"./5/ToObject":194,"./5/ToPrimitive":195,"./5/ToPropertyDescriptor":196,"./5/ToString":197,"./5/ToUint16":198,"./5/ToUint32":199,"./5/Type":200,"./5/WeekDay":201,"./5/YearFromTime":202,"./5/abs":203,"./5/floor":204,"./5/modulo":205,"./5/msFromTime":206}],208:[function(require,module,exports){
'use strict';

var $isNaN = require('./isNaN');

module.exports = function (x) { return (typeof x === 'number' || typeof x === 'bigint') && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{"./isNaN":209}],209:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],210:[function(require,module,exports){
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

},{"call-bind/callBound":154}],211:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],212:[function(require,module,exports){
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

},{"es-errors/type":221,"hasown":238}],213:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],214:[function(require,module,exports){
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

},{}],215:[function(require,module,exports){
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

},{"get-intrinsic":230}],216:[function(require,module,exports){
'use strict';

/** @type {import('./eval')} */
module.exports = EvalError;

},{}],217:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Error;

},{}],218:[function(require,module,exports){
'use strict';

/** @type {import('./range')} */
module.exports = RangeError;

},{}],219:[function(require,module,exports){
'use strict';

/** @type {import('./ref')} */
module.exports = ReferenceError;

},{}],220:[function(require,module,exports){
'use strict';

/** @type {import('./syntax')} */
module.exports = SyntaxError;

},{}],221:[function(require,module,exports){
'use strict';

/** @type {import('./type')} */
module.exports = TypeError;

},{}],222:[function(require,module,exports){
'use strict';

/** @type {import('./uri')} */
module.exports = URIError;

},{}],223:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

/** @type {import('./RequireObjectCoercible')} */
module.exports = function RequireObjectCoercible(value) {
	if (value == null) {
		throw new $TypeError((arguments.length > 0 && arguments[1]) || ('Cannot call method on ' + value));
	}
	return value;
};

},{"es-errors/type":221}],224:[function(require,module,exports){
'use strict';

var $Object = require('./');
var RequireObjectCoercible = require('./RequireObjectCoercible');

/** @type {import('./ToObject')} */
module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

},{"./":225,"./RequireObjectCoercible":223}],225:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Object;

},{}],226:[function(require,module,exports){
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

},{"./helpers/isPrimitive":227,"is-callable":241}],227:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],228:[function(require,module,exports){
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

},{}],229:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":228}],230:[function(require,module,exports){
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

},{"es-errors":217,"es-errors/eval":216,"es-errors/range":218,"es-errors/ref":219,"es-errors/syntax":220,"es-errors/type":221,"es-errors/uri":222,"function-bind":229,"has-proto":233,"has-symbols":234,"hasown":238}],231:[function(require,module,exports){
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

},{"get-intrinsic":230}],232:[function(require,module,exports){
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

},{"es-define-property":215}],233:[function(require,module,exports){
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

},{}],234:[function(require,module,exports){
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

},{"./shams":235}],235:[function(require,module,exports){
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

},{}],236:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":235}],237:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":229}],238:[function(require,module,exports){
'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);

},{"function-bind":229}],239:[function(require,module,exports){
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

},{}],240:[function(require,module,exports){
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

},{}],241:[function(require,module,exports){
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

},{}],242:[function(require,module,exports){
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

},{"call-bind/callBound":154,"has-tostringtag/shams":236}],243:[function(require,module,exports){
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

},{"./isArguments":245}],244:[function(require,module,exports){
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

},{"./implementation":243,"./isArguments":245}],245:[function(require,module,exports){
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

},{}],246:[function(require,module,exports){
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

},{}],247:[function(require,module,exports){
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
},{"_process":246,"through":262,"timers":263}],248:[function(require,module,exports){
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

},{"buffer":136}],249:[function(require,module,exports){
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

},{"call-bind/callBound":154,"es-errors/type":221,"is-regex":242}],250:[function(require,module,exports){
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

},{"define-data-property":159,"es-errors/type":221,"get-intrinsic":230,"gopd":231,"has-property-descriptors":232}],251:[function(require,module,exports){
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

},{"es-abstract/es5":207,"function-bind":229}],252:[function(require,module,exports){
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

},{"./implementation":251,"./polyfill":253,"./shim":254,"define-properties":160,"function-bind":229}],253:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":251}],254:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":253,"define-properties":160}],255:[function(require,module,exports){
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
},{"safe-buffer":248}],256:[function(require,module,exports){
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
},{"./lib/default_stream":257,"./lib/results":259,"./lib/test":260,"_process":246,"defined":161,"through":262,"timers":263}],257:[function(require,module,exports){
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
},{"_process":246,"fs":135,"through":262}],258:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":246,"timers":263}],259:[function(require,module,exports){
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
},{"_process":246,"events":137,"function-bind":229,"has":237,"inherits":240,"object-inspect":261,"resumer":247,"through":262,"timers":263}],260:[function(require,module,exports){
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
},{"./next_tick":258,"deep-equal":156,"defined":161,"events":137,"has":237,"inherits":240,"path":138,"string.prototype.trim":252}],261:[function(require,module,exports){
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

},{}],262:[function(require,module,exports){
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
},{"_process":246,"stream":139}],263:[function(require,module,exports){
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
},{"process/browser.js":246,"timers":263}],264:[function(require,module,exports){
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
},{}]},{},[74,75]);
