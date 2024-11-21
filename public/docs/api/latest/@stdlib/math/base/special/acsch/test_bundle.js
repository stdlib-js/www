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

var hasFloat64ArraySupport = require( '@stdlib/assert/has-float64array-support' );
var builtin = require( './main.js' );
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

},{"./main.js":2,"./polyfill.js":3,"@stdlib/assert/has-float64array-support":14}],2:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var ctor = ( typeof Float64Array === 'function' ) ? Float64Array : void 0; // eslint-disable-line stdlib/require-globals


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
* Typed array which represents an array of double-precision floating-point numbers in the platform byte order.
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

var hasUint16ArraySupport = require( '@stdlib/assert/has-uint16array-support' );
var builtin = require( './main.js' );
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

},{"./main.js":5,"./polyfill.js":6,"@stdlib/assert/has-uint16array-support":22}],5:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var ctor = ( typeof Uint16Array === 'function' ) ? Uint16Array : void 0; // eslint-disable-line stdlib/require-globals


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
* Typed array which represents an array of 16-bit unsigned integers in the platform byte order.
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

},{"./main.js":8,"./polyfill.js":9,"@stdlib/assert/has-uint32array-support":25}],8:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var hasUint8ArraySupport = require( '@stdlib/assert/has-uint8array-support' );
var builtin = require( './main.js' );
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

},{"./main.js":11,"./polyfill.js":12,"@stdlib/assert/has-uint8array-support":28}],11:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var ctor = ( typeof Uint8Array === 'function' ) ? Uint8Array : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

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

// MAIN //

var main = ( typeof Float64Array === 'function' ) ? Float64Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = main;

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
* Test for native `Float64Array` support.
*
* @module @stdlib/assert/has-float64array-support
*
* @example
* var hasFloat64ArraySupport = require( '@stdlib/assert/has-float64array-support' );
*
* var bool = hasFloat64ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasFloat64ArraySupport = require( './main.js' );


// EXPORTS //

module.exports = hasFloat64ArraySupport;

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

},{"./float64array.js":13,"@stdlib/assert/is-float64array":43}],16:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],18:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":19}],19:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],20:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":21}],21:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/has-symbol-support":18}],22:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Test for native `Uint16Array` support.
*
* @module @stdlib/assert/has-uint16array-support
*
* @example
* var hasUint16ArraySupport = require( '@stdlib/assert/has-uint16array-support' );
*
* var bool = hasUint16ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasUint16ArraySupport = require( './main.js' );


// EXPORTS //

module.exports = hasUint16ArraySupport;

},{"./main.js":23}],23:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var isUint16Array = require( '@stdlib/assert/is-uint16array' );
var UINT16_MAX = require( '@stdlib/constants/uint16/max' );
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

},{"./uint16array.js":24,"@stdlib/assert/is-uint16array":52,"@stdlib/constants/uint16/max":67}],24:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var main = ( typeof Uint16Array === 'function' ) ? Uint16Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = main;

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

},{"./main.js":26}],26:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint32array.js":27,"@stdlib/assert/is-uint32array":54,"@stdlib/constants/uint32/max":68}],27:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],28:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Test for native `Uint8Array` support.
*
* @module @stdlib/assert/has-uint8array-support
*
* @example
* var hasUint8ArraySupport = require( '@stdlib/assert/has-uint8array-support' );
*
* var bool = hasUint8ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasUint8ArraySupport = require( './main.js' );


// EXPORTS //

module.exports = hasUint8ArraySupport;

},{"./main.js":29}],29:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var isUint8Array = require( '@stdlib/assert/is-uint8array' );
var UINT8_MAX = require( '@stdlib/constants/uint8/max' );
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

},{"./uint8array.js":30,"@stdlib/assert/is-uint8array":56,"@stdlib/constants/uint8/max":69}],30:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var main = ( typeof Uint8Array === 'function' ) ? Uint8Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = main;

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

},{"@stdlib/utils/native-class":156}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":34,"./object.js":35,"./primitive.js":36,"@stdlib/utils/define-nonenumerable-read-only-property":138}],34:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./object.js":35,"./primitive.js":36}],35:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./try2serialize.js":38,"@stdlib/assert/has-tostringtag-support":20,"@stdlib/boolean/ctor":60,"@stdlib/utils/native-class":156}],36:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// eslint-disable-next-line stdlib/no-redeclare
var toString = Boolean.prototype.toString; // non-generic


// EXPORTS //

module.exports = toString;

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

},{"./tostring.js":37}],39:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/is-object-like":50}],41:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":42}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/get-prototype-of":146,"@stdlib/utils/native-class":156}],43:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var isFloat64Array = require( './main.js' );


// EXPORTS //

module.exports = isFloat64Array;

},{"./main.js":44}],44:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var hasFloat64Array = ( typeof Float64Array === 'function' ); // eslint-disable-line stdlib/require-globals


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
	return (
		( hasFloat64Array && value instanceof Float64Array ) || // eslint-disable-line stdlib/require-globals
		nativeClass( value ) === '[object Float64Array]'
	);
}


// EXPORTS //

module.exports = isFloat64Array;

},{"@stdlib/utils/native-class":156}],45:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":46}],46:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/type-of":167}],47:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var Uint8Array = require( '@stdlib/array/uint8' );
var Uint16Array = require( '@stdlib/array/uint16' );


// MAIN //

var ctors = {
	'uint16': Uint16Array,
	'uint8': Uint8Array
};


// EXPORTS //

module.exports = ctors;

},{"@stdlib/array/uint16":4,"@stdlib/array/uint8":10}],48:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Return a boolean indicating if an environment is little endian.
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

var IS_LITTLE_ENDIAN = require( './main.js' );


// EXPORTS //

module.exports = IS_LITTLE_ENDIAN;

},{"./main.js":49}],49:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var ctors = require( './ctors.js' );


// VARIABLES //

var bool;


// FUNCTIONS //

/**
* Returns a boolean indicating if an environment is little endian.
*
* @private
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
	*
	* 4660 => 0x1234 => 0x12 0x34 => '00010010 00110100' => (0x12,0x34) == (18,52)
	*/
	uint16view[ 0 ] = 0x1234;

	// Create a uint8 view on top of the uint16 buffer:
	uint8view = new ctors[ 'uint8' ]( uint16view.buffer );

	// If little endian, the least significant byte will be first...
	return ( uint8view[ 0 ] === 0x34 );
}


// MAIN //

bool = isLittleEndian();


// EXPORTS //

module.exports = bool;

},{"./ctors.js":47}],50:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":51,"@stdlib/assert/tools/array-function":58,"@stdlib/utils/define-nonenumerable-read-only-property":138}],51:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var isUint16Array = require( './main.js' );


// EXPORTS //

module.exports = isUint16Array;

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

var nativeClass = require( '@stdlib/utils/native-class' );


// VARIABLES //

var hasUint16Array = ( typeof Uint16Array === 'function' ); // eslint-disable-line stdlib/require-globals


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
	return (
		( hasUint16Array && value instanceof Uint16Array ) || // eslint-disable-line stdlib/require-globals
		nativeClass( value ) === '[object Uint16Array]'
	);
}


// EXPORTS //

module.exports = isUint16Array;

},{"@stdlib/utils/native-class":156}],54:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/native-class":156}],56:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var isUint8Array = require( './main.js' );


// EXPORTS //

module.exports = isUint8Array;

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

var nativeClass = require( '@stdlib/utils/native-class' );


// VARIABLES //

var hasUint8Array = ( typeof Uint8Array === 'function' ); // eslint-disable-line stdlib/require-globals


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
	return (
		( hasUint8Array && value instanceof Uint8Array ) || // eslint-disable-line stdlib/require-globals
		nativeClass( value ) === '[object Uint8Array]'
	);
}


// EXPORTS //

module.exports = isUint8Array;

},{"@stdlib/utils/native-class":156}],58:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":59}],59:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/is-array":31,"@stdlib/string/format":131}],60:[function(require,module,exports){
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

},{"./main.js":61}],61:[function(require,module,exports){
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
* Difference between one and the smallest value greater than one that can be represented as a double-precision floating-point number.
*
* @module @stdlib/constants/float64/eps
* @type {number}
*
* @example
* var FLOAT64_EPSILON = require( '@stdlib/constants/float64/eps' );
* // returns 2.220446049250313e-16
*/


// MAIN //

/**
* Difference between one and the smallest value greater than one that can be represented as a double-precision floating-point number.
*
* ## Notes
*
* The difference is
*
* ```tex
* \frac{1}{2^{52}}
* ```
*
* @constant
* @type {number}
* @default 2.220446049250313e-16
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
* @see [Machine Epsilon]{@link https://en.wikipedia.org/wiki/Machine_epsilon}
*/
var FLOAT64_EPSILON = 2.2204460492503130808472633361816E-16;


// EXPORTS //

module.exports = FLOAT64_EPSILON;

},{}],63:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* @module @stdlib/constants/float64/exponent-bias
* @type {integer32}
*
* @example
* var FLOAT64_EXPONENT_BIAS = require( '@stdlib/constants/float64/exponent-bias' );
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

},{}],64:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Natural logarithm of `2`.
*
* @module @stdlib/constants/float64/ln-two
* @type {number}
*
* @example
* var LN2 = require( '@stdlib/constants/float64/ln-two' );
* // returns 0.6931471805599453
*/


// MAIN //

/**
* Natural logarithm of `2`.
*
* ```tex
* \ln 2
* ```
*
* @constant
* @type {number}
* @default 0.6931471805599453
*/
var LN2 = 6.93147180559945309417232121458176568075500134360255254120680009493393621969694715605863326996418687542001481021e-01; // eslint-disable-line max-len


// EXPORTS //

module.exports = LN2;

},{}],65:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* @module @stdlib/constants/float64/ninf
* @type {number}
*
* @example
* var FLOAT64_NINF = require( '@stdlib/constants/float64/ninf' );
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

},{"@stdlib/number/ctor":108}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Maximum unsigned 16-bit integer.
*
* @module @stdlib/constants/uint16/max
* @type {integer32}
*
* @example
* var UINT16_MAX = require( '@stdlib/constants/uint16/max' );
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

},{}],68:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],69:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Maximum unsigned 8-bit integer.
*
* @module @stdlib/constants/uint8/max
* @type {integer32}
*
* @example
* var UINT8_MAX = require( '@stdlib/constants/uint8/max' );
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

},{}],70:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Test if a double-precision floating-point numeric value is infinite.
*
* @module @stdlib/math/base/assert/is-infinite
*
* @example
* var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
*
* var bool = isInfinite( Infinity );
* // returns true
*
* bool = isInfinite( -Infinity );
* // returns true
*
* bool = isInfinite( 5.0 );
* // returns false
*
* bool = isInfinite( NaN );
* // returns false
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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

var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );


// MAIN //

/**
* Tests if a double-precision floating-point numeric value is infinite.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is infinite
*
* @example
* var bool = isInfinite( Infinity );
* // returns true
*
* @example
* var bool = isInfinite( -Infinity );
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
}


// EXPORTS //

module.exports = isInfinite;

},{"@stdlib/constants/float64/ninf":65,"@stdlib/constants/float64/pinf":66}],72:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Test if a double-precision floating-point numeric value is `NaN`.
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

/**
* Tests if a double-precision floating-point numeric value is `NaN`.
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
* Test if a double-precision floating-point numeric value is negative zero.
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

var NINF = require( '@stdlib/constants/float64/ninf' );


// MAIN //

/**
* Tests if a double-precision floating-point numeric value is negative zero.
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

},{"@stdlib/constants/float64/ninf":65}],76:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Test if a double-precision floating-point numeric value is positive zero.
*
* @module @stdlib/math/base/assert/is-positive-zero
*
* @example
* var isPositiveZero = require( '@stdlib/math/base/assert/is-positive-zero' );
*
* var bool = isPositiveZero( 0.0 );
* // returns true
*
* bool = isPositiveZero( -0.0 );
* // returns false
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

var PINF = require( '@stdlib/constants/float64/pinf' );


// MAIN //

/**
* Tests if a double-precision floating-point numeric value is positive zero.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is positive zero
*
* @example
* var bool = isPositiveZero( 0.0 );
* // returns true
*
* @example
* var bool = isPositiveZero( -0.0 );
* // returns false
*/
function isPositiveZero( x ) {
	return (x === 0.0 && 1.0/x === PINF);
}


// EXPORTS //

module.exports = isPositiveZero;

},{"@stdlib/constants/float64/pinf":66}],78:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":79}],79:[function(require,module,exports){
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

},{}],80:[function(require,module,exports){
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
* Compute the hyperbolic arccosecant of a number.
*
* @module @stdlib/math/base/special/acsch
*
* @example
* var acsch = require( '@stdlib/math/base/special/acsch' );
*
* var v = acsch( 0.0 );
* // returns Infinity
*
* v = acsch( -1.0 );
* // returns ~-0.881
*
* v = acsch( NaN );
* // returns NaN
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":81}],81:[function(require,module,exports){
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

var asinh = require( '@stdlib/math/base/special/asinh' );


// MAIN //

/**
* Computes the hyperbolic arccosecant of a number.
*
* @param {number} x - input value
* @returns {number} hyperbolic arccosecant
*
* @example
* var v = acsch( 0.0 );
* // returns Infinity
*
* @example
* var v = acsch( -1.0 );
* // returns ~-0.881
*
* @example
* var v = acsch( 1.0 );
* // returns ~0.881
*/
function acsch( x ) {
	return asinh( 1.0 / x );
}


// EXPORTS //

module.exports = acsch;

},{"@stdlib/math/base/special/asinh":97}],82:[function(require,module,exports){
module.exports={"expected":[-1.0e-200,-5.019974849926002e-206,-2.509993725015688e-206,-1.6733305500268516e-206,-1.2549984375269452e-206,-1.003999002024992e-206,-8.36665975022794e-207,-7.171423500207668e-207,-6.274996125189893e-207,-5.5777747223967364e-207,-5.0199975301612156e-207,-4.563634326595951e-207,-4.1833316251395865e-207,-3.8615370090064635e-207,-3.58571303583717e-207,-3.3466655801159086e-207,-3.1374990469846644e-207,-2.9529403340140812e-207,-2.7888881389878562e-207,-2.642104591507096e-207,-2.5099993950901458e-207,-2.3904756429434362e-207,-2.281817683967051e-207,-2.1826082411002838e-207,-2.091666250076472e-207,-2.0079996168736732e-207,-1.9307688772900055e-207,-1.85925893216741e-207,-1.7928568393520922e-207,-1.7310342004209735e-207,-1.6733330700622636e-207,-1.619354592672254e-207,-1.5687497695898776e-207,-1.5212119050156414e-207,-1.4764703850034883e-207,-1.4342855229110461e-207,-1.3944442639413815e-207,-1.3567565862454559e-207,-1.3210524702714879e-207,-1.287179334368197e-207,-1.2549998550475168e-207,-1.2243901062332101e-207,-1.1952379643310801e-207,-1.1674417358474984e-207,-1.1409089721508387e-207,-1.1155554422647029e-207,-1.0913042396446232e-207,-1.0680850029832605e-207,-1.04583323441494e-207,-1.0244897012053398e-207,-1.0039999092384082e-207,-9.8431363844599e-208,-9.653845318417232e-208,-9.471697310793945e-208,-9.296295525048076e-208,-9.127271985474441e-208,-8.964285000344445e-208,-8.807016856294298e-208,-8.655171751224783e-208,-8.508473937414584e-208,-8.366666050322268e-208,-8.229507601768385e-208,-8.096773618938647e-208,-7.968253413005834e-208,-7.843749463193396e-208,-7.723076403848556e-208,-7.606060103599666e-208,-7.492536826977087e-208,-7.382352470008681e-208,-7.275361862285264e-208,-7.171428128849008e-208,-7.07042210600677e-208,-6.972221805825642e-208,-6.876711924642546e-208,-6.7837833914244195e-208,-6.693332952259577e-208,-6.605262787652375e-208,-6.519480159639082e-208,-6.435897086048672e-208,-6.354430039503303e-208,-6.274999668993768e-208,-6.197530542078969e-208,-6.1219509059488565e-208,-6.048192465759923e-208,-5.976190178803869e-208,-5.90588206320555e-208,-5.837209019967563e-208,-5.770114667287634e-208,-5.704545186172533e-208,-5.640449176460055e-208,-5.577777522439518e-208,-5.516483267332459e-208,-5.456521495959368e-208,-5.397849224976309e-208,-5.340425300117711e-208,-5.284210299929096e-208,-5.229166445516502e-208,-5.175257515878423e-208,-5.122448768421499e-208,-5.070706864293447e-208,-5.019999798196008e-208,-4.970296832367423e-208,-4.921568434448297e-208,-4.8737862189669224e-208,-4.826922892200451e-208,-4.780952200186855e-208,-4.7358488796796086e-208,-4.691588611852571e-208,-4.648147978576824e-208,-4.60550442110429e-208,-4.563636201004964e-208,-4.522522363215654e-208,-4.482142701068245e-208,-4.442477723174882e-208,-4.403508622056022e-208,-4.365217244405298e-208,-4.3275860628923946e-208,-4.290598149411941e-208,-4.254237149692622e-208,-4.218487259186503e-208,-4.183333200163893e-208,-4.1487601999439965e-208,-4.114753970196188e-208,-4.0813006872509785e-208,-4.048386973363687e-208,-4.015999878877444e-208,-3.9841268652355795e-208,-3.952755788796581e-208,-3.921874885407718e-208,-3.8914727556961756e-208,-3.8615383510390566e-208,-3.832060960175984e-208,-3.8030301964302143e-208,-3.77443598550625e-208,-3.746268553833819e-208,-3.718518417429907e-208,-3.6911763712521655e-208,-3.6642334790185974e-208,-3.637681063469862e-208,-3.6115106970519154e-208,-3.5857141929979613e-208,-3.560283596789902e-208,-3.5352111779805616e-208,-3.5104894223590417e-208,-3.4861110244425173e-208,-3.462068880278718e-208,-3.438356080544194e-208,-3.4149659039242926e-208,-3.3918918107615066e-208,-3.3691274369595984e-208,-3.3466665881315573e-208,-3.3245032339800905e-208,-3.3026315028999326e-208,-3.281045676791834e-208,-3.2597401860785986e-208,-3.2387096049140495e-208,-3.2179486465762673e-208,-3.1974521590368795e-208,-3.1772151206986077e-208,-3.157232636293661e-208,-3.1374999329359393e-208,-3.1180123563203596e-208,-3.0987653670629493e-208,-3.0797545371756573e-208,-3.0609755466701383e-208,-3.0424241802850332e-208,-3.024096324331544e-208,-3.005987963652337e-208,-2.98809517868906e-208,-2.9704141426539696e-208,-2.952941118801385e-208,-2.9356724577948783e-208,-2.918604595166307e-208,-2.9017340488629767e-208,-2.8850574168793775e-208,-2.8685713749701234e-208,-2.8522726744408582e-208,-2.8361581400140456e-208,-2.820224667766697e-208,-2.8044692231372315e-208,-2.7888888389987665e-208,-2.7734806137962833e-208,-2.7582417097452006e-208,-2.7431693510890154e-208,-2.7282608224137533e-208,-2.7135134670170936e-208,-2.698924685330097e-208,-2.6844919333895745e-208,-2.6702127213592132e-208,-2.6560846120976465e-208,-2.6421052197717457e-208,-2.6282722085134735e-208,-2.614583291118707e-208,-2.6010362277865185e-208,-2.587628824897439e-208,-2.5743589338293235e-208,-2.561224449809455e-208,-2.5482233108016187e-208,-2.5353534964268957e-208,-2.5226130269169975e-208,-2.5099999620990004e-208,-2.4975124004103865e-208,-2.4851484779433395e-208,-2.4729063675172906e-208,-2.4607842777787394e-208,-2.4487804523274247e-208,-2.436893168867943e-208,-2.425120738385961e-208,-2.4134615043481884e-208,-2.4019138419253227e-208,-2.3904761572371887e-208,-2.379146886619349e-208,-2.367924495910467e-208,-2.3568074797597483e-208,-2.3457943609537956e-208,-2.33488368976225e-208,-2.324074043301612e-208,-2.3133640249166475e-208,-2.3027522635788237e-208,-2.2922374133012244e-208,-2.2818181525694216e-208,-2.2714931837878014e-208,-2.261261232740849e-208,-2.2511210480689338e-208,-2.2410714007581317e-208,-2.2311110836436547e-208,-2.221238910926463e-208,-2.2114537177026534e-208,-2.2017543595052328e-208,-2.192139711857898e-208,-2.182608669840454e-208,-2.173160147665524e-208,-2.1637930782662015e-208,-2.1545064128943253e-208,-2.1452991207290528e-208,-2.1361701884954283e-208,-2.1271186200926463e-208,-2.1181434362317296e-208,-2.1092436740823393e-208,-2.1004183869284506e-208,-2.091666643832639e-208,-2.0829875293087243e-208,-2.0743801430025273e-208,-2.0658435993805146e-208,-2.0573770274260955e-208,-2.048979570343357e-208,-2.0406503852680287e-208,-2.0323886429854614e-208,-2.0241935276554375e-208,-2.0160642365436046e-208,-2.00799997975936e-208,-1.99999998e-208,-1.9920634723009578e-208,-1.984189703791967e-208,-1.976377933458987e-208,-1.9686274319117264e-208,-1.9609374811566166e-208,-1.9533073743750855e-208,-1.945736415706989e-208,-1.9382239200390575e-208,-1.9307692127982252e-208,-1.9233716297497104e-208,-1.9160305167997206e-208,-1.9087452298026575e-208,-1.9015151343727046e-208,-1.8943396056996799e-208,-1.8872180283690431e-208,-1.8801497961859477e-208,-1.8731343120032303e-208,-1.8661709875532403e-208,-1.8592592432834023e-208,-1.8523985081954225e-208,-1.845588219688041e-208,-1.8388278234032393e-208,-1.8321167730758168e-208,-1.8254545303862484e-208,-1.8188405648167406e-208,-1.8122743535104067e-208,-1.8057553811334816e-208,-1.7992831397404967e-208,-1.7928571286423468e-208,-1.7864768542771747e-208,-1.7801418300839998e-208,-1.7738515763790282e-208,-1.7676056202345766e-208,-1.7614034953605416e-208,-1.7552447419883613e-208,-1.7491289067573966e-208,-1.7430555426036844e-208,-1.737024208650998e-208,-1.7310344701041617e-208,-1.7250858981445661e-208,-1.719178069827829e-208,-1.7133105679835526e-208,-1.7074829811171271e-208,-1.7016949033135306e-208,-1.695945934143079e-208,-1.6902356785690802e-208,-1.6845637468573488e-208,-1.6789297544875337e-208,-1.6733333220662223e-208,-1.6677740752417744e-208,-1.66225164462085e-208,-1.6567656656865886e-208,-1.651315778718404e-208,-1.6459016287133568e-208,-1.6405228653090692e-208,-1.6351791427081457e-208,-1.6298701196040649e-208,-1.6245954591085138e-208,-1.619354828680125e-208,-1.6141479000545902e-208,-1.6089743491761178e-208,-1.6038338561302046e-208,-1.5987261050776909e-208,-1.5936507841900732e-208,-1.5886075855860441e-208,-1.5835962052692336e-208,-1.5786163430671257e-208,-1.5736677025711226e-208,-1.5687499910777346e-208,-1.5638629195308666e-208,-1.5590062024651828e-208,-1.554179557950522e-208,-1.549382707537342e-208,-1.5446153762031718e-208,-1.539877292300049e-208,-1.5351681875029224e-208,-1.5304877967589976e-208,-1.5258358582380058e-208,-1.5212121132833792e-208,-1.5166163063643084e-208,-1.5120481850286688e-208,-1.5075074998567936e-208,-1.502994004416078e-208,-1.4985074552163957e-208,-1.4940476116663124e-208,-1.4896142360300787e-208,-1.4852070933853856e-208,-1.4808259515818692e-208,-1.4764705812003461e-208,-1.4721407555127666e-208,-1.4678362504428714e-208,-1.4635568445275353e-208,-1.459302318878786e-208,-1.455072457146482e-208,-1.4508670454816398e-208,-1.4466858725003944e-208,-1.4425287292485799e-208,-1.43839540916692e-208,-1.4342857080568164e-208,-1.4301994240467204e-208,-1.426136357559078e-208,-1.4220963112778372e-208,-1.4180790901165055e-208,-1.4140845011867488e-208,-1.4101123537675169e-208,-1.4061624592746903e-208,-1.4022346312312351e-208,-1.3983286852378551e-208,-1.3944444389441359e-208,-1.3905817120201658e-208,-1.3867403261286286e-208,-1.3829201048973583e-208,-1.379120873892344e-208,-1.3753424605911804e-208,-1.371584694356953e-208,-1.3678474064125506e-208,-1.3641304298153947e-208,-1.3604335994325837e-208,-1.3567567519164355e-208,-1.3530997256804297e-208,-1.3494623608755348e-208,-1.3458444993669186e-208,-1.34224598471103e-208,-1.338666662133049e-208,-1.335106378504697e-208,-1.331564982322397e-208,-1.328042323685787e-208,-1.3245382542765644e-208,-1.3210526273376732e-208,-1.317585297652813e-208,-1.314136121526274e-208,-1.3107049567630839e-208,-1.3072916626494683e-208,-1.3038960999336144e-208,-1.300518130806733e-208,-1.2971576188844153e-208,-1.2938144291882772e-208,-1.290488428127887e-208,-1.2871794834829718e-208,-1.2838874643858948e-208,-1.2806122413044044e-208,-1.2773536860246424e-208,-1.2741116716344147e-208,-1.2708860725067136e-208,-1.2676767642834915e-208,-1.264483623859678e-208,-1.2613065293674402e-208,-1.2581453601606774e-208,-1.25499999679975e-208,-1.2518703210364363e-208,-1.248756215799114e-208,-1.2456575651781613e-208,-1.2425742544115774e-208,-1.2395061698708123e-208,-1.2364531990468102e-208,-1.2334152305362544e-208,-1.230392154028018e-208,-1.2273838602898118e-208,-1.2243902411550268e-208,-1.221411189509771e-208,-1.2184465992800925e-208,-1.2154963654193905e-208,-1.212560383896007e-208,-1.2096385516809988e-208,-1.2067307667360855e-208,-1.2038369280017714e-208,-1.2009569353856369e-208,-1.198090689750799e-208,-1.1952380929045352e-208,-1.1923990475870708e-208,-1.1895734574605244e-208,-1.186761227098011e-208,-1.1839622619728996e-208,-1.1811764684482216e-208,-1.1784037537662282e-208,-1.175644026038096e-208,-1.1728971942337758e-208,-1.1701631681719833e-208,-1.16744185851033e-208,-1.1647331767355904e-208,-1.1620370351541067e-208,-1.1593533468823236e-208,-1.1566820258374567e-208,-1.1540229867282864e-208,-1.151376145046082e-208,-1.1487414170556478e-208,-1.1461187197864932e-208,-1.143507971024123e-208,-1.1409090893014463e-208,-1.1383219938903028e-208,-1.1357466047931041e-208,-1.1331828427345871e-208,-1.1306306291536808e-208,-1.1280898861954804e-208,-1.125560536703332e-208,-1.1230425042110215e-208,-1.1205357129350686e-208,-1.1180400877671242e-208,-1.1155555542664692e-208,-1.1130820386526123e-208,-1.1106194677979874e-208,-1.1081677692207456e-208,-1.1057268710776457e-208,-1.1032967021570342e-208,-1.100877191871922e-208,-1.0984682702531494e-208,-1.0960698679426404e-208,-1.0936819161867468e-208,-1.0913043468296786e-208,-1.088937092307019e-208,-1.0865800856393246e-208,-1.084233260425808e-208,-1.081896550838102e-208,-1.0795698916141057e-208,-1.0772532180519074e-208,-1.0749464660037874e-208,-1.0726495718702974e-208,-1.0703624725944146e-208,-1.0680851056557719e-208,-1.065817409064961e-208,-1.0635593213579073e-208,-1.061310781590317e-208,-1.059071729332194e-208,-1.0568421046624266e-208,-1.0546218481634418e-208,-1.0524109009159271e-208,-1.0502092044936188e-208,-1.0480167009581548e-208,-1.045833332853993e-208,-1.043659043203392e-208,-1.0414937755014549e-208,-1.0393374737112336e-208,-1.0371900822588962e-208,-1.035051546028951e-208,-1.032921810359532e-208,-1.030800821037741e-208,-1.0286885242950484e-208,-1.0265848668027484e-208,-1.0244897956674718e-208,-1.0224032584267528e-208,-1.0203252030446493e-208,-1.0182555779074177e-208,-1.0161943318192398e-208,-1.0141414139980003e-208,-1.0120967740711173e-208,-1.0100603620714225e-208,-1.0080321284330898e-208,-1.0060120239876146e-208,-1.00399999995984e-208,-1.001996007964032e-208,-1.0e-208],"x":[-1.0e200,-1.9920418525896414e205,-3.9840737051792828e205,-5.9761055577689245e205,-7.9681374103585654e205,-9.960169262948207e205,-1.1952201115537848e206,-1.3944232968127489e206,-1.5936264820717132e206,-1.792829667330677e206,-1.9920328525896414e206,-2.1912360378486056e206,-2.3904392231075695e206,-2.5896424083665338e206,-2.788845593625498e206,-2.988048778884462e206,-3.1872519641434262e206,-3.3864551494023905e206,-3.5856583346613544e206,-3.784861519920318e206,-3.984064705179283e206,-4.183267890438247e206,-4.382471075697211e206,-4.5816742609561754e206,-4.780877446215139e206,-4.980080631474103e206,-5.179283816733068e206,-5.378487001992032e206,-5.577690187250996e206,-5.77689337250996e206,-5.976096557768924e206,-6.175299743027888e206,-6.374502928286853e206,-6.573706113545817e206,-6.77290929880478e206,-6.972112484063744e206,-7.171315669322708e206,-7.370518854581674e206,-7.569722039840638e206,-7.768925225099602e206,-7.968128410358565e206,-8.16733159561753e206,-8.366534780876493e206,-8.565737966135459e206,-8.764941151394423e206,-8.964144336653386e206,-9.16334752191235e206,-9.362550707171314e206,-9.561753892430278e206,-9.760957077689244e206,-9.960160262948207e206,-1.0159363448207171e207,-1.0358566633466135e207,-1.0557769818725099e207,-1.0756973003984063e207,-1.0956176189243027e207,-1.1155379374501992e207,-1.1354582559760956e207,-1.155378574501992e207,-1.1752988930278884e207,-1.1952192115537848e207,-1.2151395300796812e207,-1.2350598486055777e207,-1.2549801671314741e207,-1.2749004856573705e207,-1.294820804183267e207,-1.3147411227091633e207,-1.3346614412350597e207,-1.354581759760956e207,-1.3745020782868525e207,-1.3944223968127489e207,-1.4143427153386455e207,-1.434263033864542e207,-1.4541833523904383e207,-1.4741036709163347e207,-1.494023989442231e207,-1.5139443079681275e207,-1.533864626494024e207,-1.5537849450199203e207,-1.5737052635458167e207,-1.593625582071713e207,-1.6135459005976094e207,-1.6334662191235058e207,-1.6533865376494022e207,-1.673306856175299e207,-1.6932271747011953e207,-1.7131474932270917e207,-1.733067811752988e207,-1.7529881302788845e207,-1.7729084488047809e207,-1.7928287673306772e207,-1.8127490858565736e207,-1.83266940438247e207,-1.8525897229083664e207,-1.8725100414342628e207,-1.8924303599601592e207,-1.912350678486056e207,-1.9322709970119523e207,-1.9521913155378487e207,-1.972111634063745e207,-1.9920319525896414e207,-2.0119522711155378e207,-2.0318725896414342e207,-2.0517929081673306e207,-2.071713226693227e207,-2.0916335452191234e207,-2.1115538637450198e207,-2.1314741822709162e207,-2.1513945007968126e207,-2.1713148193227092e207,-2.1912351378486056e207,-2.211155456374502e207,-2.2310757749003984e207,-2.2509960934262948e207,-2.2709164119521912e207,-2.2908367304780876e207,-2.310757049003984e207,-2.3306773675298804e207,-2.3505976860557768e207,-2.3705180045816732e207,-2.3904383231075696e207,-2.4103586416334662e207,-2.4302789601593626e207,-2.450199278685259e207,-2.4701195972111554e207,-2.4900399157370518e207,-2.5099602342629482e207,-2.5298805527888446e207,-2.549800871314741e207,-2.5697211898406374e207,-2.589641508366534e207,-2.60956182689243e207,-2.6294821454183265e207,-2.649402463944223e207,-2.6693227824701193e207,-2.6892431009960157e207,-2.709163419521912e207,-2.7290837380478085e207,-2.749004056573705e207,-2.768924375099601e207,-2.788844693625498e207,-2.8087650121513946e207,-2.828685330677291e207,-2.8486056492031874e207,-2.868525967729084e207,-2.88844628625498e207,-2.9083666047808766e207,-2.928286923306773e207,-2.9482072418326694e207,-2.968127560358566e207,-2.988047878884462e207,-3.0079681974103585e207,-3.027888515936255e207,-3.0478088344621513e207,-3.0677291529880477e207,-3.087649471513944e207,-3.1075697900398405e207,-3.127490108565737e207,-3.147410427091633e207,-3.1673307456175297e207,-3.187251064143426e207,-3.2071713826693224e207,-3.227091701195219e207,-3.247012019721115e207,-3.2669323382470116e207,-3.2868526567729086e207,-3.306772975298805e207,-3.3266932938247014e207,-3.346613612350598e207,-3.366533930876494e207,-3.3864542494023905e207,-3.406374567928287e207,-3.4262948864541833e207,-3.4462152049800797e207,-3.466135523505976e207,-3.4860558420318725e207,-3.505976160557769e207,-3.525896479083665e207,-3.5458167976095617e207,-3.565737116135458e207,-3.5856574346613544e207,-3.605577753187251e207,-3.625498071713147e207,-3.6454183902390436e207,-3.66533870876494e207,-3.6852590272908364e207,-3.705179345816733e207,-3.725099664342629e207,-3.7450199828685256e207,-3.764940301394422e207,-3.784860619920319e207,-3.8047809384462153e207,-3.8247012569721117e207,-3.844621575498008e207,-3.8645418940239045e207,-3.884462212549801e207,-3.904382531075697e207,-3.9243028496015937e207,-3.94422316812749e207,-3.9641434866533865e207,-3.984063805179283e207,-4.003984123705179e207,-4.0239044422310756e207,-4.043824760756972e207,-4.0637450792828684e207,-4.083665397808765e207,-4.103585716334661e207,-4.1235060348605576e207,-4.143426353386454e207,-4.1633466719123504e207,-4.183266990438247e207,-4.203187308964143e207,-4.2231076274900395e207,-4.243027946015936e207,-4.2629482645418323e207,-4.282868583067729e207,-4.3027889015936257e207,-4.322709220119522e207,-4.3426295386454185e207,-4.362549857171315e207,-4.382470175697211e207,-4.4023904942231076e207,-4.422310812749004e207,-4.4422311312749004e207,-4.462151449800797e207,-4.482071768326693e207,-4.5019920868525896e207,-4.521912405378486e207,-4.5418327239043824e207,-4.561753042430279e207,-4.581673360956175e207,-4.6015936794820715e207,-4.621513998007968e207,-4.6414343165338643e207,-4.6613546350597607e207,-4.681274953585657e207,-4.7011952721115535e207,-4.72111559063745e207,-4.741035909163346e207,-4.7609562276892427e207,-4.7808765462151396e207,-4.800796864741036e207,-4.8207171832669324e207,-4.840637501792829e207,-4.860557820318725e207,-4.8804781388446216e207,-4.900398457370518e207,-4.9203187758964144e207,-4.940239094422311e207,-4.960159412948207e207,-4.9800797314741035e207,-5.00000005e207,-5.0199203685258963e207,-5.0398406870517927e207,-5.059761005577689e207,-5.0796813241035855e207,-5.099601642629482e207,-5.119521961155378e207,-5.139442279681275e207,-5.159362598207171e207,-5.179282916733067e207,-5.199203235258964e207,-5.21912355378486e207,-5.239043872310757e207,-5.258964190836653e207,-5.278884509362549e207,-5.298804827888446e207,-5.318725146414342e207,-5.338645464940239e207,-5.358565783466135e207,-5.378486101992031e207,-5.398406420517928e207,-5.418326739043824e207,-5.43824705756972e207,-5.458167376095617e207,-5.478087694621513e207,-5.49800801314741e207,-5.517928331673307e207,-5.537848650199204e207,-5.5577689687251e207,-5.577689287250996e207,-5.597609605776893e207,-5.617529924302789e207,-5.637450242828686e207,-5.657370561354582e207,-5.677290879880478e207,-5.697211198406375e207,-5.717131516932271e207,-5.737051835458168e207,-5.756972153984064e207,-5.77689247250996e207,-5.796812791035857e207,-5.816733109561753e207,-5.83665342808765e207,-5.856573746613546e207,-5.876494065139442e207,-5.896414383665339e207,-5.916334702191235e207,-5.936255020717131e207,-5.956175339243028e207,-5.976095657768924e207,-5.996015976294821e207,-6.015936294820717e207,-6.035856613346613e207,-6.05577693187251e207,-6.075697250398406e207,-6.095617568924303e207,-6.115537887450199e207,-6.135458205976095e207,-6.155378524501992e207,-6.175298843027888e207,-6.195219161553785e207,-6.215139480079681e207,-6.235059798605577e207,-6.254980117131474e207,-6.27490043565737e207,-6.294820754183266e207,-6.314741072709163e207,-6.334661391235059e207,-6.354581709760956e207,-6.374502028286852e207,-6.394422346812748e207,-6.414342665338645e207,-6.434262983864541e207,-6.454183302390438e207,-6.474103620916334e207,-6.49402393944223e207,-6.513944257968128e207,-6.533864576494024e207,-6.553784895019921e207,-6.573705213545817e207,-6.593625532071714e207,-6.61354585059761e207,-6.633466169123506e207,-6.653386487649403e207,-6.673306806175299e207,-6.693227124701195e207,-6.713147443227092e207,-6.733067761752988e207,-6.752988080278885e207,-6.772908398804781e207,-6.792828717330677e207,-6.812749035856574e207,-6.83266935438247e207,-6.852589672908367e207,-6.872509991434263e207,-6.892430309960159e207,-6.912350628486056e207,-6.932270947011952e207,-6.952191265537849e207,-6.972111584063745e207,-6.992031902589641e207,-7.011952221115538e207,-7.031872539641434e207,-7.05179285816733e207,-7.071713176693227e207,-7.091633495219123e207,-7.11155381374502e207,-7.131474132270916e207,-7.151394450796812e207,-7.171314769322709e207,-7.191235087848605e207,-7.211155406374502e207,-7.231075724900398e207,-7.250996043426294e207,-7.270916361952191e207,-7.290836680478087e207,-7.310756999003984e207,-7.33067731752988e207,-7.350597636055776e207,-7.370517954581673e207,-7.390438273107569e207,-7.410358591633466e207,-7.430278910159362e207,-7.450199228685258e207,-7.470119547211155e207,-7.490039865737051e207,-7.509960184262949e207,-7.529880502788845e207,-7.549800821314741e207,-7.569721139840638e207,-7.589641458366534e207,-7.609561776892431e207,-7.629482095418327e207,-7.649402413944223e207,-7.66932273247012e207,-7.689243050996016e207,-7.709163369521913e207,-7.729083688047809e207,-7.749004006573705e207,-7.768924325099602e207,-7.788844643625498e207,-7.808764962151395e207,-7.828685280677291e207,-7.848605599203187e207,-7.868525917729084e207,-7.88844623625498e207,-7.908366554780876e207,-7.928286873306773e207,-7.948207191832669e207,-7.968127510358566e207,-7.988047828884462e207,-8.007968147410358e207,-8.027888465936255e207,-8.047808784462151e207,-8.067729102988048e207,-8.087649421513944e207,-8.10756974003984e207,-8.127490058565737e207,-8.147410377091633e207,-8.16733069561753e207,-8.187251014143426e207,-8.207171332669322e207,-8.227091651195219e207,-8.247011969721115e207,-8.266932288247012e207,-8.286852606772908e207,-8.306772925298804e207,-8.326693243824701e207,-8.346613562350597e207,-8.366533880876493e207,-8.38645419940239e207,-8.406374517928286e207,-8.426294836454183e207,-8.446215154980079e207,-8.466135473505975e207,-8.486055792031872e207,-8.505976110557769e207,-8.525896429083666e207,-8.545816747609562e207,-8.565737066135459e207,-8.585657384661355e207,-8.605577703187251e207,-8.625498021713148e207,-8.645418340239044e207,-8.66533865876494e207,-8.685258977290837e207,-8.705179295816733e207,-8.72509961434263e207,-8.745019932868526e207,-8.764940251394422e207,-8.784860569920319e207,-8.804780888446215e207,-8.824701206972112e207,-8.844621525498008e207,-8.864541844023904e207,-8.884462162549801e207,-8.904382481075697e207,-8.924302799601594e207,-8.94422311812749e207,-8.964143436653386e207,-8.984063755179283e207,-9.003984073705179e207,-9.023904392231076e207,-9.043824710756972e207,-9.063745029282868e207,-9.083665347808765e207,-9.103585666334661e207,-9.123505984860557e207,-9.143426303386454e207,-9.16334662191235e207,-9.183266940438247e207,-9.203187258964143e207,-9.223107577490039e207,-9.243027896015936e207,-9.262948214541832e207,-9.282868533067729e207,-9.302788851593625e207,-9.322709170119521e207,-9.342629488645418e207,-9.362549807171314e207,-9.38247012569721e207,-9.402390444223107e207,-9.422310762749003e207,-9.4422310812749e207,-9.462151399800796e207,-9.482071718326693e207,-9.50199203685259e207,-9.521912355378486e207,-9.541832673904383e207,-9.561752992430279e207,-9.581673310956176e207,-9.601593629482072e207,-9.621513948007968e207,-9.641434266533865e207,-9.661354585059761e207,-9.681274903585658e207,-9.701195222111554e207,-9.72111554063745e207,-9.741035859163347e207,-9.760956177689243e207,-9.78087649621514e207,-9.800796814741036e207,-9.820717133266932e207,-9.840637451792829e207,-9.860557770318725e207,-9.880478088844621e207,-9.900398407370518e207,-9.920318725896414e207,-9.940239044422311e207,-9.960159362948207e207,-9.980079681474103e207,-1.0e208]}

},{}],83:[function(require,module,exports){
module.exports={"expected":[1.0e-300,5.0199748499260014e-306,2.5099937250156875e-306,1.6733305500268516e-306,1.2549984375269454e-306,1.003999002024992e-306,8.366659750227939e-307,7.171423500207668e-307,6.2749961251898935e-307,5.5777747223967356e-307,5.0199975301612154e-307,4.563634326595951e-307,4.183331625139586e-307,3.861537009006463e-307,3.585713035837171e-307,3.346665580115908e-307,3.1374990469846647e-307,2.952940334014081e-307,2.788888138987856e-307,2.642104591507096e-307,2.5099993950901456e-307,2.3904756429434363e-307,2.2818176839670507e-307,2.1826082411002836e-307,2.0916662500764718e-307,2.007999616873673e-307,1.9307688772900056e-307,1.85925893216741e-307,1.7928568393520923e-307,1.7310342004209736e-307,1.6733330700622637e-307,1.6193545926722538e-307,1.5687497695898777e-307,1.5212119050156414e-307,1.4764703850034881e-307,1.4342855229110458e-307,1.3944442639413815e-307,1.356756586245456e-307,1.3210524702714877e-307,1.287179334368197e-307,1.2549998550475168e-307,1.22439010623321e-307,1.1952379643310803e-307,1.1674417358474985e-307,1.1409089721508388e-307,1.1155554422647027e-307,1.0913042396446232e-307,1.0680850029832604e-307,1.04583323441494e-307,1.0244897012053398e-307,1.0039999092384082e-307,9.8431363844599e-308,9.653845318417233e-308,9.471697310793945e-308,9.296295525048074e-308,9.12727198547444e-308,8.964285000344444e-308,8.807016856294298e-308,8.655171751224784e-308,8.508473937414583e-308,8.366666050322267e-308,8.229507601768385e-308,8.096773618938646e-308,7.968253413005834e-308,7.843749463193397e-308,7.723076403848555e-308,7.606060103599666e-308,7.492536826977087e-308,7.382352470008681e-308,7.275361862285263e-308,7.171428128849006e-308,7.070422106006771e-308,6.972221805825643e-308,6.876711924642545e-308,6.78378339142442e-308,6.693332952259577e-308,6.605262787652375e-308,6.519480159639082e-308,6.435897086048671e-308,6.354430039503302e-308,6.274999668993767e-308,6.197530542078968e-308,6.121950905948856e-308,6.048192465759922e-308,5.97619017880387e-308,5.90588206320555e-308,5.837209019967564e-308,5.770114667287633e-308,5.704545186172533e-308,5.640449176460055e-308,5.577777522439517e-308,5.516483267332459e-308,5.456521495959369e-308,5.397849224976308e-308,5.340425300117711e-308,5.284210299929095e-308,5.229166445516502e-308,5.175257515878424e-308,5.1224487684215e-308,5.070706864293448e-308,5.019999798196008e-308,4.970296832367423e-308,4.921568434448296e-308,4.873786218966922e-308,4.826922892200451e-308,4.780952200186855e-308,4.735848879679608e-308,4.69158861185257e-308,4.648147978576823e-308,4.60550442110429e-308,4.563636201004964e-308,4.522522363215654e-308,4.482142701068245e-308,4.4424777231748815e-308,4.4035086220560225e-308,4.365217244405298e-308,4.327586062892395e-308,4.2905981494119407e-308,4.254237149692621e-308,4.218487259186502e-308,4.183333200163893e-308,4.1487601999439974e-308,4.114753970196188e-308,4.081300687250978e-308,4.0483869733636873e-308,4.0159998788774436e-308,3.984126865235579e-308,3.952755788796581e-308,3.9218748854077183e-308,3.891472755696175e-308,3.861538351039056e-308,3.832060960175983e-308,3.8030301964302143e-308,3.77443598550625e-308,3.746268553833819e-308,3.7185184174299063e-308,3.6911763712521654e-308,3.664233479018597e-308,3.637681063469862e-308,3.6115106970519153e-308,3.585714192997961e-308,3.560283596789902e-308,3.5352111779805616e-308,3.5104894223590417e-308,3.486111024442518e-308,3.462068880278718e-308,3.4383560805441937e-308,3.414965903924293e-308,3.391891810761507e-308,3.3691274369595983e-308,3.3466665881315576e-308,3.3245032339800904e-308,3.3026315028999325e-308,3.2810456767918336e-308,3.2597401860785983e-308,3.23870960491405e-308,3.217948646576267e-308,3.197452159036879e-308,3.1772151206986073e-308,3.1572326362936607e-308,3.137499932935939e-308,3.1180123563203597e-308,3.098765367062949e-308,3.079754537175657e-308,3.060975546670138e-308,3.0424241802850334e-308,3.0240963243315443e-308,3.0059879636523373e-308,2.9880951786890605e-308,2.97041414265397e-308,2.9529411188013853e-308,2.9356724577948783e-308,2.9186045951663073e-308,2.901734048862977e-308,2.8850574168793774e-308,2.8685713749701233e-308,2.852272674440858e-308,2.8361581400140456e-308,2.8202246677666973e-308,2.804469223137231e-308,2.788888838998766e-308,2.773480613796283e-308,2.7582417097452005e-308,2.743169351089015e-308,2.7282608224137534e-308,2.713513467017094e-308,2.6989246853300965e-308,2.684491933389574e-308,2.670212721359213e-308,2.6560846120976464e-308,2.642105219771746e-308,2.6282722085134736e-308,2.614583291118707e-308,2.6010362277865185e-308,2.587628824897439e-308,2.5743589338293234e-308,2.561224449809455e-308,2.5482233108016185e-308,2.5353534964268957e-308,2.5226130269169975e-308,2.5099999620990007e-308,2.4975124004103863e-308,2.4851484779433393e-308,2.4729063675172905e-308,2.4607842777787393e-308,2.448780452327425e-308,2.4368931688679427e-308,2.425120738385961e-308,2.4134615043481885e-308,2.4019138419253227e-308,2.3904761572371884e-308,2.3791468866193485e-308,2.367924495910467e-308,2.356807479759748e-308,2.345794360953795e-308,2.33488368976225e-308,2.324074043301612e-308,2.3133640249166474e-308,2.302752263578824e-308,2.2922374133012245e-308,2.2818181525694215e-308,2.2714931837878016e-308,2.261261232740849e-308,2.251121048068934e-308,2.2410714007581317e-308,2.231111083643655e-308,2.221238910926463e-308,2.211453717702653e-308,2.201754359505233e-308,2.1921397118578976e-308,2.182608669840454e-308,2.173160147665524e-308,2.1637930782662015e-308,2.1545064128943254e-308,2.1452991207290524e-308,2.136170188495428e-308,2.1271186200926457e-308,2.1181434362317293e-308,2.109243674082339e-308,2.1004183869284505e-308,2.091666643832639e-308,2.082987529308724e-308,2.0743801430025275e-308,2.065843599380515e-308,2.0573770274260954e-308,2.0489795703433574e-308,2.0406503852680285e-308,2.032388642985461e-308,2.024193527655437e-308,2.0160642365436043e-308,2.00799997975936e-308,1.99999998e-308,1.9920634723009577e-308,1.984189703791967e-308,1.976377933458987e-308,1.9686274319117267e-308,1.9609374811566163e-308,1.953307374375085e-308,1.945736415706989e-308,1.938223920039057e-308,1.9307692127982247e-308,1.92337162974971e-308,1.9160305167997205e-308,1.9087452298026575e-308,1.9015151343727044e-308,1.89433960569968e-308,1.887218028369043e-308,1.8801497961859476e-308,1.87313431200323e-308,1.86617098755324e-308,1.859259243283402e-308,1.852398508195422e-308,1.845588219688041e-308,1.838827823403239e-308,1.832116773075817e-308,1.825454530386248e-308,1.8188405648167404e-308,1.812274353510407e-308,1.8057553811334817e-308,1.799283139740497e-308,1.792857128642347e-308,1.786476854277175e-308,1.7801418300839997e-308,1.773851576379028e-308,1.767605620234577e-308,1.761403495360542e-308,1.7552447419883614e-308,1.7491289067573967e-308,1.7430555426036845e-308,1.737024208650998e-308,1.731034470104162e-308,1.725085898144566e-308,1.7191780698278286e-308,1.7133105679835524e-308,1.707482981117127e-308,1.7016949033135307e-308,1.695945934143079e-308,1.69023567856908e-308,1.684563746857349e-308,1.6789297544875336e-308,1.6733333220662223e-308,1.6677740752417747e-308,1.66225164462085e-308,1.6567656656865886e-308,1.6513157787184035e-308,1.6459016287133565e-308,1.640522865309069e-308,1.6351791427081456e-308,1.629870119604065e-308,1.624595459108514e-308,1.6193548286801248e-308,1.6141479000545904e-308,1.6089743491761176e-308,1.6038338561302044e-308,1.5987261050776905e-308,1.593650784190073e-308,1.588607585586044e-308,1.583596205269233e-308,1.5786163430671255e-308,1.5736677025711226e-308,1.5687499910777345e-308,1.563862919530866e-308,1.5590062024651827e-308,1.554179557950522e-308,1.549382707537342e-308,1.544615376203172e-308,1.539877292300049e-308,1.5351681875029223e-308,1.530487796758998e-308,1.525835858238006e-308,1.521212113283379e-308,1.5166163063643086e-308,1.512048185028669e-308,1.507507499856794e-308,1.502994004416078e-308,1.498507455216396e-308,1.4940476116663124e-308,1.4896142360300783e-308,1.485207093385386e-308,1.4808259515818693e-308,1.476470581200346e-308,1.4721407555127665e-308,1.4678362504428715e-308,1.463556844527535e-308,1.459302318878786e-308,1.455072457146482e-308,1.4508670454816397e-308,1.4466858725003944e-308,1.4425287292485796e-308,1.43839540916692e-308,1.4342857080568163e-308,1.43019942404672e-308,1.426136357559078e-308,1.422096311277837e-308,1.4180790901165055e-308,1.4140845011867487e-308,1.4101123537675166e-308,1.40616245927469e-308,1.402234631231235e-308,1.3983286852378553e-308,1.3944444389441358e-308,1.3905817120201655e-308,1.3867403261286285e-308,1.3829201048973584e-308,1.379120873892344e-308,1.3753424605911806e-308,1.371584694356953e-308,1.3678474064125505e-308,1.3641304298153946e-308,1.3604335994325834e-308,1.3567567519164357e-308,1.3530997256804295e-308,1.349462360875535e-308,1.3458444993669186e-308,1.3422459847110297e-308,1.338666662133049e-308,1.3351063785046965e-308,1.331564982322397e-308,1.328042323685787e-308,1.3245382542765645e-308,1.321052627337673e-308,1.317585297652813e-308,1.314136121526274e-308,1.310704956763084e-308,1.307291662649468e-308,1.3038960999336143e-308,1.300518130806733e-308,1.297157618884415e-308,1.2938144291882773e-308,1.290488428127887e-308,1.287179483482972e-308,1.283887464385895e-308,1.2806122413044047e-308,1.2773536860246425e-308,1.274111671634415e-308,1.2708860725067137e-308,1.2676767642834913e-308,1.264483623859678e-308,1.26130652936744e-308,1.2581453601606775e-308,1.25499999679975e-308,1.2518703210364366e-308,1.248756215799114e-308,1.2456575651781613e-308,1.2425742544115773e-308,1.2395061698708126e-308,1.23645319904681e-308,1.2334152305362545e-308,1.230392154028018e-308,1.2273838602898116e-308,1.224390241155027e-308,1.221411189509771e-308,1.2184465992800926e-308,1.21549636541939e-308,1.212560383896007e-308,1.209638551680999e-308,1.2067307667360853e-308,1.203836928001771e-308,1.2009569353856366e-308,1.198090689750799e-308,1.195238092904535e-308,1.1923990475870706e-308,1.189573457460524e-308,1.186761227098011e-308,1.1839622619728997e-308,1.1811764684482214e-308,1.178403753766228e-308,1.175644026038096e-308,1.172897194233776e-308,1.1701631681719834e-308,1.16744185851033e-308,1.16473317673559e-308,1.1620370351541066e-308,1.1593533468823235e-308,1.1566820258374566e-308,1.1540229867282865e-308,1.151376145046082e-308,1.148741417055648e-308,1.1461187197864934e-308,1.143507971024123e-308,1.1409090893014463e-308,1.138321993890303e-308,1.1357466047931043e-308,1.133182842734587e-308,1.130630629153681e-308,1.12808988619548e-308,1.125560536703332e-308,1.1230425042110214e-308,1.1205357129350684e-308,1.1180400877671244e-308,1.115555554266469e-308,1.113082038652612e-308,1.110619467797987e-308,1.1081677692207457e-308,1.1057268710776455e-308,1.1032967021570343e-308,1.100877191871922e-308,1.0984682702531495e-308,1.0960698679426404e-308,1.093681916186747e-308,1.0913043468296788e-308,1.088937092307019e-308,1.086580085639325e-308,1.0842332604258076e-308,1.081896550838102e-308,1.0795698916141057e-308,1.0772532180519075e-308,1.074946466003787e-308,1.0726495718702973e-308,1.0703624725944145e-308,1.0680851056557716e-308,1.065817409064961e-308,1.063559321357907e-308,1.0613107815903167e-308,1.059071729332194e-308,1.056842104662427e-308,1.0546218481634417e-308,1.0524109009159273e-308,1.050209204493619e-308,1.048016700958155e-308,1.045833332853993e-308,1.043659043203392e-308,1.041493775501455e-308,1.0393374737112336e-308,1.0371900822588965e-308,1.035051546028951e-308,1.032921810359532e-308,1.030800821037741e-308,1.028688524295048e-308,1.0265848668027483e-308,1.024489795667472e-308,1.022403258426753e-308,1.020325203044649e-308,1.018255577907418e-308,1.0161943318192396e-308,1.014141413998e-308,1.0120967740711173e-308,1.0100603620714223e-308,1.0080321284330897e-308,1.0060120239876145e-308,1.00399999995984e-308,1.0019960079640323e-308,1.0e-308],"x":[1.0e300,1.9920418525896416e305,3.9840737051792825e305,5.9761055577689246e305,7.968137410358565e305,9.960169262948207e305,1.195220111553785e306,1.394423296812749e306,1.593626482071713e306,1.7928296673306772e306,1.9920328525896414e306,2.1912360378486056e306,2.39043922310757e306,2.5896424083665337e306,2.788845593625498e306,2.988048778884462e306,3.187251964143426e306,3.3864551494023906e306,3.5856583346613545e306,3.784861519920319e306,3.984064705179283e306,4.183267890438247e306,4.382471075697211e306,4.581674260956175e306,4.78087744621514e306,4.9800806314741036e306,5.1792838167330675e306,5.378487001992032e306,5.577690187250996e306,5.77689337250996e306,5.976096557768924e306,6.175299743027889e306,6.374502928286852e306,6.573706113545817e306,6.772909298804781e306,6.972112484063746e306,7.171315669322709e306,7.370518854581673e306,7.569722039840638e306,7.768925225099601e306,7.968128410358566e306,8.16733159561753e306,8.366534780876494e306,8.565737966135458e306,8.764941151394423e306,8.964144336653387e306,9.16334752191235e306,9.362550707171315e306,9.56175389243028e306,9.760957077689243e306,9.960160262948207e306,1.0159363448207172e307,1.0358566633466135e307,1.05577698187251e307,1.0756973003984064e307,1.0956176189243029e307,1.1155379374501992e307,1.1354582559760956e307,1.155378574501992e307,1.1752988930278885e307,1.1952192115537849e307,1.2151395300796812e307,1.2350598486055778e307,1.254980167131474e307,1.2749004856573704e307,1.294820804183267e307,1.3147411227091633e307,1.3346614412350597e307,1.3545817597609562e307,1.3745020782868526e307,1.3944223968127491e307,1.4143427153386455e307,1.4342630338645418e307,1.4541833523904384e307,1.4741036709163347e307,1.494023989442231e307,1.5139443079681276e307,1.533864626494024e307,1.5537849450199202e307,1.5737052635458168e307,1.5936255820717132e307,1.6135459005976095e307,1.633466219123506e307,1.6533865376494024e307,1.6733068561752987e307,1.6932271747011953e307,1.7131474932270916e307,1.7330678117529882e307,1.7529881302788845e307,1.7729084488047808e307,1.7928287673306774e307,1.8127490858565737e307,1.83266940438247e307,1.8525897229083667e307,1.872510041434263e307,1.8924303599601593e307,1.912350678486056e307,1.9322709970119522e307,1.9521913155378485e307,1.972111634063745e307,1.9920319525896414e307,2.0119522711155378e307,2.0318725896414343e307,2.0517929081673307e307,2.071713226693227e307,2.0916335452191236e307,2.11155386374502e307,2.1314741822709165e307,2.1513945007968128e307,2.1713148193227091e307,2.1912351378486057e307,2.211155456374502e307,2.2310757749003984e307,2.250996093426295e307,2.2709164119521913e307,2.2908367304780876e307,2.310757049003984e307,2.3306773675298807e307,2.350597686055777e307,2.3705180045816734e307,2.3904383231075697e307,2.410358641633466e307,2.4302789601593624e307,2.450199278685259e307,2.4701195972111555e307,2.490039915737052e307,2.509960234262948e307,2.5298805527888445e307,2.549800871314741e307,2.5697211898406377e307,2.589641508366534e307,2.6095618268924303e307,2.6294821454183267e307,2.649402463944223e307,2.6693227824701193e307,2.689243100996016e307,2.7091634195219125e307,2.729083738047809e307,2.749004056573705e307,2.7689243750996014e307,2.7888446936254983e307,2.8087650121513946e307,2.828685330677291e307,2.848605649203187e307,2.8685259677290836e307,2.88844628625498e307,2.9083666047808767e307,2.928286923306773e307,2.9482072418326694e307,2.9681275603585657e307,2.988047878884462e307,3.0079681974103584e307,3.027888515936255e307,3.0478088344621515e307,3.067729152988048e307,3.087649471513944e307,3.1075697900398405e307,3.1274901085657373e307,3.1474104270916337e307,3.16733074561753e307,3.1872510641434263e307,3.2071713826693226e307,3.227091701195219e307,3.247012019721116e307,3.266932338247012e307,3.2868526567729084e307,3.306772975298805e307,3.326693293824701e307,3.3466136123505974e307,3.366533930876494e307,3.3864542494023906e307,3.406374567928287e307,3.426294886454183e307,3.4462152049800796e307,3.4661355235059764e307,3.4860558420318727e307,3.505976160557769e307,3.5258964790836654e307,3.5458167976095617e307,3.565737116135458e307,3.585657434661355e307,3.605577753187251e307,3.6254980717131475e307,3.645418390239044e307,3.66533870876494e307,3.6852590272908365e307,3.7051793458167333e307,3.7250996643426296e307,3.745019982868526e307,3.7649403013944223e307,3.7848606199203186e307,3.804780938446215e307,3.824701256972112e307,3.844621575498008e307,3.8645418940239044e307,3.8844622125498007e307,3.904382531075697e307,3.924302849601594e307,3.94422316812749e307,3.9641434866533866e307,3.984063805179283e307,4.003984123705179e307,4.0239044422310755e307,4.0438247607569724e307,4.0637450792828687e307,4.083665397808765e307,4.1035857163346613e307,4.1235060348605577e307,4.143426353386454e307,4.163346671912351e307,4.183266990438247e307,4.2031873089641435e307,4.22310762749004e307,4.243027946015936e307,4.262948264541833e307,4.2828685830677293e307,4.3027889015936256e307,4.322709220119522e307,4.3426295386454183e307,4.3625498571713146e307,4.3824701756972114e307,4.4023904942231077e307,4.422310812749004e307,4.4422311312749004e307,4.4621514498007967e307,4.482071768326693e307,4.50199208685259e307,4.521912405378486e307,4.541832723904383e307,4.561753042430279e307,4.581673360956175e307,4.601593679482072e307,4.621513998007968e307,4.641434316533864e307,4.661354635059761e307,4.681274953585658e307,4.701195272111554e307,4.72111559063745e307,4.741035909163347e307,4.760956227689243e307,4.780876546215139e307,4.800796864741036e307,4.820717183266932e307,4.840637501792828e307,4.860557820318725e307,4.880478138844621e307,4.900398457370518e307,4.920318775896415e307,4.940239094422311e307,4.960159412948207e307,4.980079731474104e307,5.00000005e307,5.019920368525896e307,5.039840687051793e307,5.059761005577689e307,5.079681324103585e307,5.099601642629482e307,5.119521961155379e307,5.139442279681275e307,5.159362598207172e307,5.179282916733068e307,5.199203235258964e307,5.219123553784861e307,5.239043872310757e307,5.258964190836653e307,5.27888450936255e307,5.298804827888446e307,5.318725146414342e307,5.338645464940239e307,5.358565783466136e307,5.378486101992032e307,5.398406420517929e307,5.418326739043825e307,5.438247057569721e307,5.458167376095618e307,5.478087694621514e307,5.49800801314741e307,5.517928331673307e307,5.537848650199203e307,5.557768968725099e307,5.577689287250997e307,5.597609605776893e307,5.617529924302789e307,5.637450242828686e307,5.657370561354582e307,5.677290879880478e307,5.697211198406374e307,5.717131516932271e307,5.737051835458167e307,5.756972153984063e307,5.77689247250996e307,5.796812791035857e307,5.816733109561753e307,5.83665342808765e307,5.856573746613546e307,5.876494065139442e307,5.896414383665339e307,5.916334702191235e307,5.936255020717131e307,5.956175339243028e307,5.976095657768924e307,5.99601597629482e307,6.015936294820717e307,6.035856613346614e307,6.05577693187251e307,6.075697250398407e307,6.095617568924303e307,6.115537887450199e307,6.135458205976096e307,6.155378524501992e307,6.175298843027888e307,6.195219161553785e307,6.215139480079681e307,6.235059798605577e307,6.254980117131475e307,6.274900435657371e307,6.294820754183267e307,6.314741072709164e307,6.33466139123506e307,6.354581709760956e307,6.374502028286853e307,6.394422346812749e307,6.414342665338645e307,6.434262983864542e307,6.454183302390438e307,6.474103620916334e307,6.494023939442232e307,6.513944257968128e307,6.533864576494024e307,6.553784895019921e307,6.573705213545817e307,6.593625532071713e307,6.61354585059761e307,6.633466169123506e307,6.653386487649402e307,6.673306806175299e307,6.693227124701195e307,6.713147443227092e307,6.733067761752988e307,6.752988080278885e307,6.772908398804781e307,6.792828717330677e307,6.812749035856574e307,6.83266935438247e307,6.852589672908366e307,6.872509991434263e307,6.892430309960159e307,6.912350628486055e307,6.932270947011953e307,6.952191265537849e307,6.972111584063745e307,6.992031902589642e307,7.011952221115538e307,7.031872539641434e307,7.051792858167331e307,7.071713176693227e307,7.091633495219123e307,7.11155381374502e307,7.131474132270916e307,7.151394450796812e307,7.17131476932271e307,7.191235087848606e307,7.211155406374502e307,7.231075724900399e307,7.250996043426295e307,7.270916361952191e307,7.290836680478088e307,7.310756999003984e307,7.33067731752988e307,7.350597636055777e307,7.370517954581673e307,7.39043827310757e307,7.410358591633467e307,7.430278910159363e307,7.450199228685259e307,7.470119547211156e307,7.490039865737052e307,7.509960184262948e307,7.529880502788845e307,7.549800821314741e307,7.569721139840637e307,7.589641458366534e307,7.60956177689243e307,7.629482095418327e307,7.649402413944224e307,7.66932273247012e307,7.689243050996016e307,7.709163369521913e307,7.729083688047809e307,7.749004006573705e307,7.768924325099601e307,7.788844643625498e307,7.808764962151394e307,7.82868528067729e307,7.848605599203188e307,7.868525917729084e307,7.88844623625498e307,7.908366554780877e307,7.928286873306773e307,7.948207191832669e307,7.968127510358566e307,7.988047828884462e307,8.007968147410358e307,8.027888465936255e307,8.047808784462151e307,8.067729102988047e307,8.087649421513945e307,8.107569740039841e307,8.127490058565737e307,8.147410377091634e307,8.16733069561753e307,8.187251014143426e307,8.207171332669323e307,8.227091651195219e307,8.247011969721115e307,8.266932288247012e307,8.286852606772908e307,8.306772925298805e307,8.326693243824702e307,8.346613562350598e307,8.366533880876494e307,8.386454199402391e307,8.406374517928287e307,8.426294836454183e307,8.44621515498008e307,8.466135473505976e307,8.486055792031872e307,8.505976110557769e307,8.525896429083666e307,8.545816747609562e307,8.565737066135459e307,8.585657384661355e307,8.605577703187251e307,8.625498021713148e307,8.645418340239044e307,8.66533865876494e307,8.685258977290837e307,8.705179295816733e307,8.725099614342629e307,8.745019932868526e307,8.764940251394423e307,8.784860569920319e307,8.804780888446215e307,8.824701206972112e307,8.844621525498008e307,8.864541844023904e307,8.884462162549801e307,8.904382481075697e307,8.924302799601593e307,8.94422311812749e307,8.964143436653386e307,8.984063755179283e307,9.00398407370518e307,9.023904392231075e307,9.043824710756972e307,9.063745029282868e307,9.083665347808765e307,9.103585666334662e307,9.123505984860558e307,9.143426303386455e307,9.16334662191235e307,9.183266940438248e307,9.203187258964143e307,9.22310757749004e307,9.243027896015936e307,9.262948214541833e307,9.282868533067728e307,9.302788851593626e307,9.322709170119523e307,9.342629488645418e307,9.362549807171316e307,9.38247012569721e307,9.402390444223108e307,9.422310762749004e307,9.4422310812749e307,9.462151399800796e307,9.482071718326694e307,9.501992036852589e307,9.521912355378486e307,9.541832673904382e307,9.561752992430279e307,9.581673310956176e307,9.601593629482072e307,9.621513948007969e307,9.641434266533864e307,9.661354585059762e307,9.681274903585657e307,9.701195222111554e307,9.72111554063745e307,9.741035859163347e307,9.760956177689242e307,9.78087649621514e307,9.800796814741037e307,9.820717133266932e307,9.84063745179283e307,9.860557770318725e307,9.880478088844622e307,9.900398407370517e307,9.920318725896415e307,9.94023904442231e307,9.960159362948207e307,9.980079681474103e307,1.0e308]}

},{}],84:[function(require,module,exports){
module.exports={"expected":[-0.32745015023725843,-0.32228220501757976,-0.317272386683515,-0.3124136500429473,-0.30769935672565835,-0.3031232466029938,-0.2986794115555974,-0.29436227136958615,-0.2901665515644846,-0.28608726297654286,-0.2821196829390524,-0.2782593379172548,-0.2745019874696298,-0.27084360941999,-0.2672803861360766,-0.26380869182040123,-0.2604250807280673,-0.2571262762343455,-0.2539091606819807,-0.2507707659446741,-0.2477082646489839,-0.2447189620021126,-0.2418002881777449,-0.23894979121633422,-0.23616513040005896,-0.233444070066118,-0.2307844738251565,-0.2281842991544351,-0.22564159233791684,-0.2231544837277625,-0.22072118330383614,-0.2183399765097308,-0.216009220345571,-0.21372733969942823,-0.21149282390063295,-0.20930422347958236,-0.2071601471198436,-0.2050592587894541,-0.20300027503931994,-0.20098196245753583,-0.1990031352692899,-0.19706265307278792,-0.19515941870233972,-0.19329237621039916,-0.19146050896094657,-0.18966283782715046,-0.18789841948675062,-0.1861663448090685,-0.1844657373279805,-0.18279575179558286,-0.18115557281164252,-0.17954441352426334,-0.1779615143975094,-0.17640614204201288,-0.1748775881048603,-0.17337516821529744,-0.17189822098302027,-0.17044610704603122,-0.16901820816523483,-0.16761392636313044,-0.16623268310412634,-0.16487391851415778,-0.1635370906374371,-0.16222167472829832,-0.16092716257622758,-0.15965306186228406,-0.15839889554523037,-0.15716420127578884,-0.15594853083753865,-0.15475144961305537,-0.1535725360739786,-0.1524113812937703,-0.15126758848199823,-0.15014077253904828,-0.14903055963022988,-0.1479365867783013,-0.14685850147349372,-0.1457959613001678,-0.1447486335792827,-0.1437161950259048,-0.1426983314210256,-0.14169473729699794,-0.1407051156359385,-0.13972917758047806,-0.13876664215627746,-0.13781723600575385,-0.13688069313249654,-0.13595675465587448,-0.13504516857536697,-0.1341456895441721,-0.13325807865167058,-0.13238210321434454,-0.13151753657477194,-0.13066415790833558,-0.1298217520373042,-0.12899010925196158,-0.12816902513847303,-0.12735830041319784,-0.1265577407631667,-0.12576715669246008,-0.12498636337423422,-0.1242151805081555,-0.12345343218301351,-0.12270094674429595,-0.12195755666651785,-0.1212230984301074,-0.12049741240266042,-0.11978034272438426,-0.11907173719755963,-0.11837144717985787,-0.11767932748135736,-0.11699523626511117,-0.11631903495112404,-0.11565058812360322,-0.11498976344135406,-0.11433643155119712,-0.11369046600428852,-0.11305174317523091,-0.1124201421838675,-0.11179554481965587,-0.11117783546852315,-0.11056690104210817,-0.1099626309093005,-0.1093649168299901,-0.10877365289094452,-0.10818873544373496,-0.10761006304463518,-0.1070375363964206,-0.10647105829199799,-0.10591053355979911,-0.10535586901087435,-0.10480697338762507,-0.10426375731411565,-0.10372613324790905,-0.10319401543337196,-0.10266731985639682,-0.1021459642004918,-0.10162986780419023,-0.10111895161973389,-0.10061313817298566,-0.10011235152452942,-0.09961651723191638,-0.09912556231301861,-0.09863941521045212,-0.09815800575703339,-0.09768126514223459,-0.09720912587960374,-0.09674152177511809,-0.09627838789643918,-0.09581966054304042,-0.09536527721717779,-0.0949151765956766,-0.09446929850250768,-0.09402758388212691,-0.09358997477355396,-0.09315641428516636,-0.09272684657018579,-0.09230121680283478,-0.09187947115514235,-0.09146155677437846,-0.091047421761097,-0.09063701514776869,-0.09023028687798529,-0.08982718778621761,-0.08942766957810985,-0.08903168481129424,-0.08863918687670962,-0.08825012998040899,-0.08786446912584081,-0.08748216009659004,-0.08710315943956486,-0.08672742444861593,-0.08635491314857514,-0.08598558427970121,-0.08561939728252065,-0.08525631228305183,-0.0848962900784012,-0.0845392921227208,-0.08418528051351655,-0.08383421797829697,-0.0834860678615527,-0.08314079411205731,-0.08279836127047999,-0.08245873445730147,-0.08212187936102444,-0.0817877622266702,-0.08145634984455333,-0.08112760953932671,-0.08080150915928938,-0.08047801706594986,-0.08015710212383755,-0.07983873369055605,-0.07952288160707115,-0.07920951618822702,-0.078898608213485,-0.07859012891787814,-0.0782840499831764,-0.07798034352925604,-0.07767898210566845,-0.07737993868340264,-0.07708318664683629,-0.07678869978587041,-0.0764964522882428,-0.07620641873201538,-0.07591857407823109,-0.07563289366373571,-0.07534935319416045,-0.07506792873706089,-0.07478859671520864,-0.07451133390003126,-0.07423611740519705,-0.07396292468034087,-0.07369173350492719,-0.07342252198224719,-0.07315526853354644,-0.07288995189227947,-0.07262655109848881,-0.07236504549330461,-0.07210541471356222,-0.07184763868653482,-0.07159169762477803,-0.0713375720210839,-0.07108524264354162,-0.07083469053070202,-0.07058589698684384,-0.0703388435773388,-0.07009351212411324,-0.0698498847012042,-0.0696079436304073,-0.06936767147701454,-0.0691290510456396,-0.06889206537612866,-0.06865669773955489,-0.06842293163429422,-0.06819075078218083,-0.06796013912474037,-0.06773108081949887,-0.06750356023636608,-0.06727756195409082,-0.0670530707567874,-0.06683007163053074,-0.0666085497600192,-0.06638849052530324,-0.06616987949857848,-0.06595270244104161,-0.06573694529980796,-0.06552259420488896,-0.06530963546622849,-0.06509805557079655,-0.06488784117973906,-0.06467897912558251,-0.06447145640949227,-0.06426526019858322,-0.06406037782328189,-0.06385679677473835,-0.06365450470228749,-0.06345348941095806,-0.06325373885902857,-0.06305524115562922,-0.0628579845583885,-0.06266195747112376,-0.06246714844157484,-0.062273546159179474,-0.06208113945289,-0.06188991728903014,-0.061699868769191264,-0.06151098312816712,-0.06132324973192626,-0.06113665807562135,-0.06095119778163467,-0.060766858597658874,-0.06058363039481244,-0.06040150316578901,-0.060220467023039834,-0.06004051219698878,-0.05986162903427913,-0.05968380799605154,-0.05950703965625245,-0.05933131469997254,-0.05915662392181417,-0.05898295822428787,-0.058810308616236505,-0.058638666211287306,-0.05846802222633063,-0.05829836798002517,-0.05812969489132918,-0.05796199447805683,-0.05779525835545957,-0.05762947823483178,-0.05746464592214034,-0.057300753316677444,-0.057137792409736564,-0.056975755283310635,-0.05681463410881247,-0.05665442114581667,-0.05649510874082263,-0.05633668932603854,-0.0561791554181855,-0.05602249961732166,-0.055866714605685965,-0.055711793146561085,-0.055557728083155115,-0.05540451233750176,-0.05525213890937866,-0.05510060087524337,-0.05494989138718687,-0.05480000367190407,-0.054650931029681146,-0.0545026668333993,-0.05435520452755455,-0.05420853762729355,-0.05406265971746478,-0.053917564451684996,-0.05377324555142073,-0.05362969680508438,-0.05348691206714467,-0.05334488525725141,-0.05320361035937394,-0.053063081420953354,-0.05292329255206797,-0.052784237924611954,-0.052645911771486975,-0.05250830838580623,-0.052371422120111144,-0.05223524738560015,-0.05209977865136942,-0.05196501044366543,-0.051830937345149014,-0.05169755399417077,-0.05156485508405757,-0.051432835362410154,-0.051301489630411166,-0.05117081274214409,-0.0510407996039223,-0.05091144517362835,-0.050782744460063325,-0.05065469252230599,-0.050527284469081495,-0.050400515458139734,-0.05027438069564286,-0.05014887543556204,-0.05002399497908319,-0.04989973467402152,-0.049776089914244835,-0.04965305613910528,-0.0495306288328795,-0.04940880352421715,-0.04928757578559736,-0.04916694123279316,-0.04904689552434397,-0.04892743436103544,-0.04880855348538717,-0.04869024868114764,-0.04857251577279654,-0.0484553506250544,-0.048338749142399016,-0.048222707268589106,-0.04810722098619463,-0.04799228631613393,-0.047877899317217296,-0.04776405608569734,-0.047650752754825436,-0.04753798549441466,-0.04742575051040881,-0.047314044044457534,-0.04720286237349746,-0.047092201809339165,-0.046982058698259936,-0.04687242942060225,-0.04676331039037784,-0.04665469805487724,-0.04654658889428483,-0.04643897942129908,-0.046331866180758144,-0.04622524574927064,-0.04611911473485133,-0.04601346977656205,-0.04590830754415737,-0.0458036247377351,-0.04569941808739169,-0.04559568435288221,-0.0454924203232849,-0.045389622816670416,-0.04528728867977544,-0.045185414787680594,-0.045083998043492945,-0.044983035378032485,-0.044882523749523014,-0.04478246014328702,-0.04468284157144473,-0.04458366507261706,-0.0444849277116326,-0.04438662657923837,-0.044288758791814514,-0.044191321491092714,-0.0440943118438782,-0.043997727041775604,-0.04390156430091822,-0.043805820861700935,-0.043710493988516556,-0.04361558096949559,-0.043521079116249424,-0.04342698576361683,-0.043333298269413685,-0.043240014014186014,-0.04314713040096614,-0.04305464485503196,-0.04296255482366939,-0.04287085777593776,-0.0427795512024382,-0.042688632615085084,-0.04259809954688024,-0.04250794955169009,-0.04241818020402564,-0.042328789098825155,-0.042239773851239705,-0.04215113209642125,-0.04206286148931349,-0.04197495970444538,-0.04188742443572703,-0.04180025339624834,-0.04171344431808012,-0.041626994952077515,-0.04154090306768608,-0.04145516645275013,-0.041369782913323445,-0.04128475027348241,-0.04120006637514133,-0.04111572907787006,-0.04103173625871392,-0.04094808581201573,-0.040864775649240015,-0.040781803698799475,-0.04069916790588333,-0.040616866232288,-0.04053489665624967,-0.04045325717227888,-0.040371945790997184,-0.04029096053897578,-0.040210299458575904,-0.040129960607791414,-0.04004994206009294,-0.039970241904274215,-0.03989085824429997,-0.03981178919915571,-0.039733032902699444,-0.03965458750351486,-0.03957645116476652,-0.039498622064056556,-0.039421098393283206,-0.039343878358500874,-0.03926696017978194,-0.039190342091080126,-0.039114022340095464,-0.039037999188140854,-0.03896227091001016,-0.038886835793847836,-0.03881169214102007,-0.03873683826598741,-0.038662272496178846,-0.03858799317186741,-0.038513998646047064,-0.03844028728431117,-0.03836685746473225,-0.03829370757774309,-0.03822083602601933,-0.03814824122436322,-0.038075921599588884,-0.03800387559040871,-0.03793210164732113,-0.03786059823249965,-0.03778936381968312,-0.03771839689406721,-0.03764769595219719,-0.037577259501861825,-0.03750708606198846,-0.0374371741625394,-0.03736752234440926,-0.03729812915932359,-0.03722899316973859,-0.03716011294874194,-0.0370914870799547,-0.03702311415743431,-0.03695499278557869,-0.036887121579031366,-0.03681949916258765,-0.036752124171101776,-0.03668499524939523,-0.036618111052165864,-0.0365514702438982,-0.03648507149877452,-0.0364189135005871,-0.03635299494265127,-0.03628731452771952,-0.036221870967896384,-0.03615666298455438,-0.036091689308250886,-0.03602694867864569,-0.03596243984441966,-0.03589816156319416,-0.035834112601451425,-0.03577029173445561,-0.035706697746174874],"x":[-3.0,-3.049800796812749,-3.099601593625498,-3.149402390438247,-3.199203187250996,-3.249003984063745,-3.298804780876494,-3.348605577689243,-3.398406374501992,-3.448207171314741,-3.49800796812749,-3.547808764940239,-3.597609561752988,-3.647410358565737,-3.697211155378486,-3.747011952191235,-3.7968127490039842,-3.846613545816733,-3.896414342629482,-3.946215139442231,-3.99601593625498,-4.0458167330677295,-4.095617529880478,-4.145418326693227,-4.195219123505976,-4.245019920318725,-4.294820717131474,-4.344621513944223,-4.394422310756972,-4.444223107569721,-4.49402390438247,-4.543824701195219,-4.5936254980079685,-4.643426294820717,-4.693227091633466,-4.743027888446215,-4.792828685258964,-4.842629482071713,-4.892430278884462,-4.942231075697211,-4.99203187250996,-5.04183266932271,-5.091633466135458,-5.1414342629482075,-5.191235059760956,-5.241035856573705,-5.290836653386454,-5.340637450199203,-5.390438247011952,-5.440239043824701,-5.49003984063745,-5.539840637450199,-5.589641434262949,-5.639442231075697,-5.6892430278884465,-5.739043824701195,-5.788844621513944,-5.838645418326693,-5.888446215139442,-5.938247011952191,-5.98804780876494,-6.03784860557769,-6.087649402390438,-6.137450199203188,-6.187250996015936,-6.2370517928286855,-6.286852589641434,-6.336653386454183,-6.386454183266932,-6.436254980079681,-6.48605577689243,-6.535856573705179,-6.585657370517929,-6.635458167330677,-6.685258964143427,-6.735059760956175,-6.7848605577689245,-6.834661354581673,-6.884462151394422,-6.934262948207171,-6.98406374501992,-7.03386454183267,-7.083665338645418,-7.133466135458168,-7.183266932270916,-7.233067729083666,-7.282868525896414,-7.3326693227091635,-7.382470119521912,-7.432270916334661,-7.48207171314741,-7.531872509960159,-7.581673306772909,-7.631474103585657,-7.681274900398407,-7.731075697211155,-7.780876494023905,-7.830677290836653,-7.8804780876494025,-7.930278884462151,-7.9800796812749,-8.02988047808765,-8.079681274900398,-8.129482071713147,-8.179282868525897,-8.229083665338646,-8.278884462151394,-8.328685258964143,-8.378486055776893,-8.428286852589641,-8.47808764940239,-8.52788844621514,-8.577689243027889,-8.627490039840637,-8.677290836653386,-8.727091633466136,-8.776892430278885,-8.826693227091633,-8.876494023904382,-8.926294820717132,-8.97609561752988,-9.025896414342629,-9.07569721115538,-9.125498007968128,-9.175298804780876,-9.225099601593625,-9.274900398406375,-9.324701195219124,-9.374501992031872,-9.42430278884462,-9.474103585657371,-9.52390438247012,-9.573705179282868,-9.623505976095618,-9.673306772908367,-9.723107569721115,-9.772908366533864,-9.822709163346614,-9.872509960159363,-9.922310756972111,-9.97211155378486,-10.02191235059761,-10.071713147410359,-10.121513944223107,-10.171314741035857,-10.221115537848606,-10.270916334661354,-10.320717131474103,-10.370517928286853,-10.420318725099602,-10.47011952191235,-10.5199203187251,-10.569721115537849,-10.619521912350598,-10.669322709163346,-10.719123505976096,-10.768924302788845,-10.818725099601593,-10.868525896414342,-10.918326693227092,-10.96812749003984,-11.01792828685259,-11.06772908366534,-11.117529880478088,-11.167330677290837,-11.217131474103585,-11.266932270916335,-11.316733067729084,-11.366533864541832,-11.41633466135458,-11.466135458167331,-11.51593625498008,-11.565737051792828,-11.615537848605578,-11.665338645418327,-11.715139442231076,-11.764940239043824,-11.814741035856574,-11.864541832669323,-11.914342629482071,-11.96414342629482,-12.01394422310757,-12.063745019920319,-12.113545816733067,-12.163346613545817,-12.213147410358566,-12.262948207171315,-12.312749003984063,-12.362549800796813,-12.412350597609562,-12.46215139442231,-12.51195219123506,-12.56175298804781,-12.611553784860558,-12.661354581673306,-12.711155378486056,-12.760956175298805,-12.810756972111554,-12.860557768924302,-12.910358565737052,-12.9601593625498,-13.00996015936255,-13.0597609561753,-13.109561752988048,-13.159362549800797,-13.209163346613545,-13.258964143426295,-13.308764940239044,-13.358565737051793,-13.408366533864541,-13.458167330677291,-13.50796812749004,-13.557768924302788,-13.607569721115539,-13.657370517928287,-13.707171314741036,-13.756972111553784,-13.806772908366534,-13.856573705179283,-13.906374501992032,-13.95617529880478,-14.00597609561753,-14.055776892430279,-14.105577689243027,-14.155378486055778,-14.205179282868526,-14.254980079681275,-14.304780876494023,-14.354581673306773,-14.404382470119522,-14.45418326693227,-14.50398406374502,-14.55378486055777,-14.603585657370518,-14.653386454183266,-14.703187250996017,-14.752988047808765,-14.802788844621514,-14.852589641434262,-14.902390438247012,-14.952191235059761,-15.00199203187251,-15.05179282868526,-15.101593625498008,-15.151394422310757,-15.201195219123505,-15.250996015936256,-15.300796812749004,-15.350597609561753,-15.400398406374501,-15.450199203187251,-15.5,-15.549800796812749,-15.599601593625499,-15.649402390438247,-15.699203187250996,-15.749003984063744,-15.798804780876495,-15.848605577689243,-15.898406374501992,-15.94820717131474,-15.99800796812749,-16.04780876494024,-16.09760956175299,-16.147410358565736,-16.197211155378486,-16.247011952191237,-16.296812749003983,-16.346613545816734,-16.39641434262948,-16.44621513944223,-16.49601593625498,-16.545816733067728,-16.595617529880478,-16.64541832669323,-16.695219123505975,-16.745019920318725,-16.794820717131476,-16.844621513944222,-16.894422310756973,-16.94422310756972,-16.99402390438247,-17.04382470119522,-17.093625498007967,-17.143426294820717,-17.193227091633467,-17.243027888446214,-17.292828685258964,-17.342629482071715,-17.39243027888446,-17.44223107569721,-17.49203187250996,-17.54183266932271,-17.59163346613546,-17.641434262948206,-17.691235059760956,-17.741035856573706,-17.790836653386453,-17.840637450199203,-17.890438247011954,-17.9402390438247,-17.99003984063745,-18.0398406374502,-18.089641434262948,-18.139442231075698,-18.189243027888445,-18.239043824701195,-18.288844621513945,-18.338645418326692,-18.388446215139442,-18.438247011952193,-18.48804780876494,-18.53784860557769,-18.58764940239044,-18.637450199203187,-18.687250996015937,-18.737051792828684,-18.786852589641434,-18.836653386454184,-18.88645418326693,-18.93625498007968,-18.98605577689243,-19.03585657370518,-19.08565737051793,-19.13545816733068,-19.185258964143426,-19.235059760956176,-19.284860557768923,-19.334661354581673,-19.384462151394423,-19.43426294820717,-19.48406374501992,-19.53386454183267,-19.583665338645417,-19.633466135458168,-19.683266932270918,-19.733067729083665,-19.782868525896415,-19.83266932270916,-19.882470119521912,-19.932270916334662,-19.98207171314741,-20.03187250996016,-20.08167330677291,-20.131474103585656,-20.181274900398407,-20.231075697211157,-20.280876494023904,-20.330677290836654,-20.3804780876494,-20.43027888446215,-20.4800796812749,-20.529880478087648,-20.5796812749004,-20.62948207171315,-20.679282868525895,-20.729083665338646,-20.778884462151396,-20.828685258964143,-20.878486055776893,-20.92828685258964,-20.97808764940239,-21.02788844621514,-21.077689243027887,-21.127490039840637,-21.177290836653388,-21.227091633466134,-21.276892430278885,-21.326693227091635,-21.37649402390438,-21.426294820717132,-21.47609561752988,-21.52589641434263,-21.57569721115538,-21.625498007968126,-21.675298804780876,-21.725099601593627,-21.774900398406373,-21.824701195219124,-21.874501992031874,-21.92430278884462,-21.97410358565737,-22.02390438247012,-22.073705179282868,-22.12350597609562,-22.173306772908365,-22.223107569721115,-22.272908366533866,-22.322709163346612,-22.372509960159363,-22.422310756972113,-22.47211155378486,-22.52191235059761,-22.57171314741036,-22.621513944223107,-22.671314741035857,-22.721115537848604,-22.770916334661354,-22.820717131474105,-22.87051792828685,-22.9203187250996,-22.970119521912352,-23.0199203187251,-23.06972111553785,-23.1195219123506,-23.169322709163346,-23.219123505976096,-23.268924302788843,-23.318725099601593,-23.368525896414344,-23.41832669322709,-23.46812749003984,-23.51792828685259,-23.567729083665338,-23.617529880478088,-23.66733067729084,-23.717131474103585,-23.766932270916335,-23.816733067729082,-23.866533864541832,-23.916334661354583,-23.96613545816733,-24.01593625498008,-24.06573705179283,-24.115537848605577,-24.165338645418327,-24.215139442231077,-24.264940239043824,-24.314741035856574,-24.36454183266932,-24.41434262948207,-24.46414342629482,-24.51394422310757,-24.56374501992032,-24.61354581673307,-24.663346613545816,-24.713147410358566,-24.762948207171316,-24.812749003984063,-24.862549800796813,-24.91235059760956,-24.96215139442231,-25.01195219123506,-25.061752988047807,-25.111553784860558,-25.161354581673308,-25.211155378486055,-25.260956175298805,-25.310756972111555,-25.360557768924302,-25.410358565737052,-25.4601593625498,-25.50996015936255,-25.5597609561753,-25.609561752988046,-25.659362549800797,-25.709163346613547,-25.758964143426294,-25.808764940239044,-25.858565737051794,-25.90836653386454,-25.95816733067729,-26.00796812749004,-26.05776892430279,-26.10756972111554,-26.157370517928285,-26.207171314741036,-26.256972111553786,-26.306772908366533,-26.356573705179283,-26.406374501992033,-26.45617529880478,-26.50597609561753,-26.55577689243028,-26.605577689243027,-26.655378486055778,-26.705179282868524,-26.754980079681275,-26.804780876494025,-26.85458167330677,-26.904382470119522,-26.954183266932272,-27.00398406374502,-27.05378486055777,-27.10358565737052,-27.153386454183266,-27.203187250996017,-27.252988047808763,-27.302788844621514,-27.352589641434264,-27.40239043824701,-27.45219123505976,-27.50199203187251,-27.551792828685258,-27.60159362549801,-27.65139442231076,-27.701195219123505,-27.750996015936256,-27.800796812749002,-27.850597609561753,-27.900398406374503,-27.95019920318725,-28.0]}

},{}],85:[function(require,module,exports){
module.exports={"expected":[0.32745015023725843,0.32228220501757976,0.317272386683515,0.3124136500429473,0.30769935672565835,0.3031232466029938,0.2986794115555974,0.29436227136958615,0.2901665515644846,0.28608726297654286,0.2821196829390524,0.2782593379172548,0.2745019874696298,0.27084360941999,0.2672803861360766,0.26380869182040123,0.2604250807280673,0.2571262762343455,0.2539091606819807,0.2507707659446741,0.2477082646489839,0.2447189620021126,0.2418002881777449,0.23894979121633422,0.23616513040005896,0.233444070066118,0.2307844738251565,0.2281842991544351,0.22564159233791684,0.2231544837277625,0.22072118330383614,0.2183399765097308,0.216009220345571,0.21372733969942823,0.21149282390063295,0.20930422347958236,0.2071601471198436,0.2050592587894541,0.20300027503931994,0.20098196245753583,0.1990031352692899,0.19706265307278792,0.19515941870233972,0.19329237621039916,0.19146050896094657,0.18966283782715046,0.18789841948675062,0.1861663448090685,0.1844657373279805,0.18279575179558286,0.18115557281164252,0.17954441352426334,0.1779615143975094,0.17640614204201288,0.1748775881048603,0.17337516821529744,0.17189822098302027,0.17044610704603122,0.16901820816523483,0.16761392636313044,0.16623268310412634,0.16487391851415778,0.1635370906374371,0.16222167472829832,0.16092716257622758,0.15965306186228406,0.15839889554523037,0.15716420127578884,0.15594853083753865,0.15475144961305537,0.1535725360739786,0.1524113812937703,0.15126758848199823,0.15014077253904828,0.14903055963022988,0.1479365867783013,0.14685850147349372,0.1457959613001678,0.1447486335792827,0.1437161950259048,0.1426983314210256,0.14169473729699794,0.1407051156359385,0.13972917758047806,0.13876664215627746,0.13781723600575385,0.13688069313249654,0.13595675465587448,0.13504516857536697,0.1341456895441721,0.13325807865167058,0.13238210321434454,0.13151753657477194,0.13066415790833558,0.1298217520373042,0.12899010925196158,0.12816902513847303,0.12735830041319784,0.1265577407631667,0.12576715669246008,0.12498636337423422,0.1242151805081555,0.12345343218301351,0.12270094674429595,0.12195755666651785,0.1212230984301074,0.12049741240266042,0.11978034272438426,0.11907173719755963,0.11837144717985787,0.11767932748135736,0.11699523626511117,0.11631903495112404,0.11565058812360322,0.11498976344135406,0.11433643155119712,0.11369046600428852,0.11305174317523091,0.1124201421838675,0.11179554481965587,0.11117783546852315,0.11056690104210817,0.1099626309093005,0.1093649168299901,0.10877365289094452,0.10818873544373496,0.10761006304463518,0.1070375363964206,0.10647105829199799,0.10591053355979911,0.10535586901087435,0.10480697338762507,0.10426375731411565,0.10372613324790905,0.10319401543337196,0.10266731985639682,0.1021459642004918,0.10162986780419023,0.10111895161973389,0.10061313817298566,0.10011235152452942,0.09961651723191638,0.09912556231301861,0.09863941521045212,0.09815800575703339,0.09768126514223459,0.09720912587960374,0.09674152177511809,0.09627838789643918,0.09581966054304042,0.09536527721717779,0.0949151765956766,0.09446929850250768,0.09402758388212691,0.09358997477355396,0.09315641428516636,0.09272684657018579,0.09230121680283478,0.09187947115514235,0.09146155677437846,0.091047421761097,0.09063701514776869,0.09023028687798529,0.08982718778621761,0.08942766957810985,0.08903168481129424,0.08863918687670962,0.08825012998040899,0.08786446912584081,0.08748216009659004,0.08710315943956486,0.08672742444861593,0.08635491314857514,0.08598558427970121,0.08561939728252065,0.08525631228305183,0.0848962900784012,0.0845392921227208,0.08418528051351655,0.08383421797829697,0.0834860678615527,0.08314079411205731,0.08279836127047999,0.08245873445730147,0.08212187936102444,0.0817877622266702,0.08145634984455333,0.08112760953932671,0.08080150915928938,0.08047801706594986,0.08015710212383755,0.07983873369055605,0.07952288160707115,0.07920951618822702,0.078898608213485,0.07859012891787814,0.0782840499831764,0.07798034352925604,0.07767898210566845,0.07737993868340264,0.07708318664683629,0.07678869978587041,0.0764964522882428,0.07620641873201538,0.07591857407823109,0.07563289366373571,0.07534935319416045,0.07506792873706089,0.07478859671520864,0.07451133390003126,0.07423611740519705,0.07396292468034087,0.07369173350492719,0.07342252198224719,0.07315526853354644,0.07288995189227947,0.07262655109848881,0.07236504549330461,0.07210541471356222,0.07184763868653482,0.07159169762477803,0.0713375720210839,0.07108524264354162,0.07083469053070202,0.07058589698684384,0.0703388435773388,0.07009351212411324,0.0698498847012042,0.0696079436304073,0.06936767147701454,0.0691290510456396,0.06889206537612866,0.06865669773955489,0.06842293163429422,0.06819075078218083,0.06796013912474037,0.06773108081949887,0.06750356023636608,0.06727756195409082,0.0670530707567874,0.06683007163053074,0.0666085497600192,0.06638849052530324,0.06616987949857848,0.06595270244104161,0.06573694529980796,0.06552259420488896,0.06530963546622849,0.06509805557079655,0.06488784117973906,0.06467897912558251,0.06447145640949227,0.06426526019858322,0.06406037782328189,0.06385679677473835,0.06365450470228749,0.06345348941095806,0.06325373885902857,0.06305524115562922,0.0628579845583885,0.06266195747112376,0.06246714844157484,0.062273546159179474,0.06208113945289,0.06188991728903014,0.061699868769191264,0.06151098312816712,0.06132324973192626,0.06113665807562135,0.06095119778163467,0.060766858597658874,0.06058363039481244,0.06040150316578901,0.060220467023039834,0.06004051219698878,0.05986162903427913,0.05968380799605154,0.05950703965625245,0.05933131469997254,0.05915662392181417,0.05898295822428787,0.058810308616236505,0.058638666211287306,0.05846802222633063,0.05829836798002517,0.05812969489132918,0.05796199447805683,0.05779525835545957,0.05762947823483178,0.05746464592214034,0.057300753316677444,0.057137792409736564,0.056975755283310635,0.05681463410881247,0.05665442114581667,0.05649510874082263,0.05633668932603854,0.0561791554181855,0.05602249961732166,0.055866714605685965,0.055711793146561085,0.055557728083155115,0.05540451233750176,0.05525213890937866,0.05510060087524337,0.05494989138718687,0.05480000367190407,0.054650931029681146,0.0545026668333993,0.05435520452755455,0.05420853762729355,0.05406265971746478,0.053917564451684996,0.05377324555142073,0.05362969680508438,0.05348691206714467,0.05334488525725141,0.05320361035937394,0.053063081420953354,0.05292329255206797,0.052784237924611954,0.052645911771486975,0.05250830838580623,0.052371422120111144,0.05223524738560015,0.05209977865136942,0.05196501044366543,0.051830937345149014,0.05169755399417077,0.05156485508405757,0.051432835362410154,0.051301489630411166,0.05117081274214409,0.0510407996039223,0.05091144517362835,0.050782744460063325,0.05065469252230599,0.050527284469081495,0.050400515458139734,0.05027438069564286,0.05014887543556204,0.05002399497908319,0.04989973467402152,0.049776089914244835,0.04965305613910528,0.0495306288328795,0.04940880352421715,0.04928757578559736,0.04916694123279316,0.04904689552434397,0.04892743436103544,0.04880855348538717,0.04869024868114764,0.04857251577279654,0.0484553506250544,0.048338749142399016,0.048222707268589106,0.04810722098619463,0.04799228631613393,0.047877899317217296,0.04776405608569734,0.047650752754825436,0.04753798549441466,0.04742575051040881,0.047314044044457534,0.04720286237349746,0.047092201809339165,0.046982058698259936,0.04687242942060225,0.04676331039037784,0.04665469805487724,0.04654658889428483,0.04643897942129908,0.046331866180758144,0.04622524574927064,0.04611911473485133,0.04601346977656205,0.04590830754415737,0.0458036247377351,0.04569941808739169,0.04559568435288221,0.0454924203232849,0.045389622816670416,0.04528728867977544,0.045185414787680594,0.045083998043492945,0.044983035378032485,0.044882523749523014,0.04478246014328702,0.04468284157144473,0.04458366507261706,0.0444849277116326,0.04438662657923837,0.044288758791814514,0.044191321491092714,0.0440943118438782,0.043997727041775604,0.04390156430091822,0.043805820861700935,0.043710493988516556,0.04361558096949559,0.043521079116249424,0.04342698576361683,0.043333298269413685,0.043240014014186014,0.04314713040096614,0.04305464485503196,0.04296255482366939,0.04287085777593776,0.0427795512024382,0.042688632615085084,0.04259809954688024,0.04250794955169009,0.04241818020402564,0.042328789098825155,0.042239773851239705,0.04215113209642125,0.04206286148931349,0.04197495970444538,0.04188742443572703,0.04180025339624834,0.04171344431808012,0.041626994952077515,0.04154090306768608,0.04145516645275013,0.041369782913323445,0.04128475027348241,0.04120006637514133,0.04111572907787006,0.04103173625871392,0.04094808581201573,0.040864775649240015,0.040781803698799475,0.04069916790588333,0.040616866232288,0.04053489665624967,0.04045325717227888,0.040371945790997184,0.04029096053897578,0.040210299458575904,0.040129960607791414,0.04004994206009294,0.039970241904274215,0.03989085824429997,0.03981178919915571,0.039733032902699444,0.03965458750351486,0.03957645116476652,0.039498622064056556,0.039421098393283206,0.039343878358500874,0.03926696017978194,0.039190342091080126,0.039114022340095464,0.039037999188140854,0.03896227091001016,0.038886835793847836,0.03881169214102007,0.03873683826598741,0.038662272496178846,0.03858799317186741,0.038513998646047064,0.03844028728431117,0.03836685746473225,0.03829370757774309,0.03822083602601933,0.03814824122436322,0.038075921599588884,0.03800387559040871,0.03793210164732113,0.03786059823249965,0.03778936381968312,0.03771839689406721,0.03764769595219719,0.037577259501861825,0.03750708606198846,0.0374371741625394,0.03736752234440926,0.03729812915932359,0.03722899316973859,0.03716011294874194,0.0370914870799547,0.03702311415743431,0.03695499278557869,0.036887121579031366,0.03681949916258765,0.036752124171101776,0.03668499524939523,0.036618111052165864,0.0365514702438982,0.03648507149877452,0.0364189135005871,0.03635299494265127,0.03628731452771952,0.036221870967896384,0.03615666298455438,0.036091689308250886,0.03602694867864569,0.03596243984441966,0.03589816156319416,0.035834112601451425,0.03577029173445561,0.035706697746174874],"x":[3.0,3.049800796812749,3.099601593625498,3.149402390438247,3.199203187250996,3.249003984063745,3.298804780876494,3.348605577689243,3.398406374501992,3.448207171314741,3.49800796812749,3.547808764940239,3.597609561752988,3.647410358565737,3.697211155378486,3.747011952191235,3.7968127490039842,3.846613545816733,3.896414342629482,3.946215139442231,3.99601593625498,4.0458167330677295,4.095617529880478,4.145418326693227,4.195219123505976,4.245019920318725,4.294820717131474,4.344621513944223,4.394422310756972,4.444223107569721,4.49402390438247,4.543824701195219,4.5936254980079685,4.643426294820717,4.693227091633466,4.743027888446215,4.792828685258964,4.842629482071713,4.892430278884462,4.942231075697211,4.99203187250996,5.04183266932271,5.091633466135458,5.1414342629482075,5.191235059760956,5.241035856573705,5.290836653386454,5.340637450199203,5.390438247011952,5.440239043824701,5.49003984063745,5.539840637450199,5.589641434262949,5.639442231075697,5.6892430278884465,5.739043824701195,5.788844621513944,5.838645418326693,5.888446215139442,5.938247011952191,5.98804780876494,6.03784860557769,6.087649402390438,6.137450199203188,6.187250996015936,6.2370517928286855,6.286852589641434,6.336653386454183,6.386454183266932,6.436254980079681,6.48605577689243,6.535856573705179,6.585657370517929,6.635458167330677,6.685258964143427,6.735059760956175,6.7848605577689245,6.834661354581673,6.884462151394422,6.934262948207171,6.98406374501992,7.03386454183267,7.083665338645418,7.133466135458168,7.183266932270916,7.233067729083666,7.282868525896414,7.3326693227091635,7.382470119521912,7.432270916334661,7.48207171314741,7.531872509960159,7.581673306772909,7.631474103585657,7.681274900398407,7.731075697211155,7.780876494023905,7.830677290836653,7.8804780876494025,7.930278884462151,7.9800796812749,8.02988047808765,8.079681274900398,8.129482071713147,8.179282868525897,8.229083665338646,8.278884462151394,8.328685258964143,8.378486055776893,8.428286852589641,8.47808764940239,8.52788844621514,8.577689243027889,8.627490039840637,8.677290836653386,8.727091633466136,8.776892430278885,8.826693227091633,8.876494023904382,8.926294820717132,8.97609561752988,9.025896414342629,9.07569721115538,9.125498007968128,9.175298804780876,9.225099601593625,9.274900398406375,9.324701195219124,9.374501992031872,9.42430278884462,9.474103585657371,9.52390438247012,9.573705179282868,9.623505976095618,9.673306772908367,9.723107569721115,9.772908366533864,9.822709163346614,9.872509960159363,9.922310756972111,9.97211155378486,10.02191235059761,10.071713147410359,10.121513944223107,10.171314741035857,10.221115537848606,10.270916334661354,10.320717131474103,10.370517928286853,10.420318725099602,10.47011952191235,10.5199203187251,10.569721115537849,10.619521912350598,10.669322709163346,10.719123505976096,10.768924302788845,10.818725099601593,10.868525896414342,10.918326693227092,10.96812749003984,11.01792828685259,11.06772908366534,11.117529880478088,11.167330677290837,11.217131474103585,11.266932270916335,11.316733067729084,11.366533864541832,11.41633466135458,11.466135458167331,11.51593625498008,11.565737051792828,11.615537848605578,11.665338645418327,11.715139442231076,11.764940239043824,11.814741035856574,11.864541832669323,11.914342629482071,11.96414342629482,12.01394422310757,12.063745019920319,12.113545816733067,12.163346613545817,12.213147410358566,12.262948207171315,12.312749003984063,12.362549800796813,12.412350597609562,12.46215139442231,12.51195219123506,12.56175298804781,12.611553784860558,12.661354581673306,12.711155378486056,12.760956175298805,12.810756972111554,12.860557768924302,12.910358565737052,12.9601593625498,13.00996015936255,13.0597609561753,13.109561752988048,13.159362549800797,13.209163346613545,13.258964143426295,13.308764940239044,13.358565737051793,13.408366533864541,13.458167330677291,13.50796812749004,13.557768924302788,13.607569721115539,13.657370517928287,13.707171314741036,13.756972111553784,13.806772908366534,13.856573705179283,13.906374501992032,13.95617529880478,14.00597609561753,14.055776892430279,14.105577689243027,14.155378486055778,14.205179282868526,14.254980079681275,14.304780876494023,14.354581673306773,14.404382470119522,14.45418326693227,14.50398406374502,14.55378486055777,14.603585657370518,14.653386454183266,14.703187250996017,14.752988047808765,14.802788844621514,14.852589641434262,14.902390438247012,14.952191235059761,15.00199203187251,15.05179282868526,15.101593625498008,15.151394422310757,15.201195219123505,15.250996015936256,15.300796812749004,15.350597609561753,15.400398406374501,15.450199203187251,15.5,15.549800796812749,15.599601593625499,15.649402390438247,15.699203187250996,15.749003984063744,15.798804780876495,15.848605577689243,15.898406374501992,15.94820717131474,15.99800796812749,16.04780876494024,16.09760956175299,16.147410358565736,16.197211155378486,16.247011952191237,16.296812749003983,16.346613545816734,16.39641434262948,16.44621513944223,16.49601593625498,16.545816733067728,16.595617529880478,16.64541832669323,16.695219123505975,16.745019920318725,16.794820717131476,16.844621513944222,16.894422310756973,16.94422310756972,16.99402390438247,17.04382470119522,17.093625498007967,17.143426294820717,17.193227091633467,17.243027888446214,17.292828685258964,17.342629482071715,17.39243027888446,17.44223107569721,17.49203187250996,17.54183266932271,17.59163346613546,17.641434262948206,17.691235059760956,17.741035856573706,17.790836653386453,17.840637450199203,17.890438247011954,17.9402390438247,17.99003984063745,18.0398406374502,18.089641434262948,18.139442231075698,18.189243027888445,18.239043824701195,18.288844621513945,18.338645418326692,18.388446215139442,18.438247011952193,18.48804780876494,18.53784860557769,18.58764940239044,18.637450199203187,18.687250996015937,18.737051792828684,18.786852589641434,18.836653386454184,18.88645418326693,18.93625498007968,18.98605577689243,19.03585657370518,19.08565737051793,19.13545816733068,19.185258964143426,19.235059760956176,19.284860557768923,19.334661354581673,19.384462151394423,19.43426294820717,19.48406374501992,19.53386454183267,19.583665338645417,19.633466135458168,19.683266932270918,19.733067729083665,19.782868525896415,19.83266932270916,19.882470119521912,19.932270916334662,19.98207171314741,20.03187250996016,20.08167330677291,20.131474103585656,20.181274900398407,20.231075697211157,20.280876494023904,20.330677290836654,20.3804780876494,20.43027888446215,20.4800796812749,20.529880478087648,20.5796812749004,20.62948207171315,20.679282868525895,20.729083665338646,20.778884462151396,20.828685258964143,20.878486055776893,20.92828685258964,20.97808764940239,21.02788844621514,21.077689243027887,21.127490039840637,21.177290836653388,21.227091633466134,21.276892430278885,21.326693227091635,21.37649402390438,21.426294820717132,21.47609561752988,21.52589641434263,21.57569721115538,21.625498007968126,21.675298804780876,21.725099601593627,21.774900398406373,21.824701195219124,21.874501992031874,21.92430278884462,21.97410358565737,22.02390438247012,22.073705179282868,22.12350597609562,22.173306772908365,22.223107569721115,22.272908366533866,22.322709163346612,22.372509960159363,22.422310756972113,22.47211155378486,22.52191235059761,22.57171314741036,22.621513944223107,22.671314741035857,22.721115537848604,22.770916334661354,22.820717131474105,22.87051792828685,22.9203187250996,22.970119521912352,23.0199203187251,23.06972111553785,23.1195219123506,23.169322709163346,23.219123505976096,23.268924302788843,23.318725099601593,23.368525896414344,23.41832669322709,23.46812749003984,23.51792828685259,23.567729083665338,23.617529880478088,23.66733067729084,23.717131474103585,23.766932270916335,23.816733067729082,23.866533864541832,23.916334661354583,23.96613545816733,24.01593625498008,24.06573705179283,24.115537848605577,24.165338645418327,24.215139442231077,24.264940239043824,24.314741035856574,24.36454183266932,24.41434262948207,24.46414342629482,24.51394422310757,24.56374501992032,24.61354581673307,24.663346613545816,24.713147410358566,24.762948207171316,24.812749003984063,24.862549800796813,24.91235059760956,24.96215139442231,25.01195219123506,25.061752988047807,25.111553784860558,25.161354581673308,25.211155378486055,25.260956175298805,25.310756972111555,25.360557768924302,25.410358565737052,25.4601593625498,25.50996015936255,25.5597609561753,25.609561752988046,25.659362549800797,25.709163346613547,25.758964143426294,25.808764940239044,25.858565737051794,25.90836653386454,25.95816733067729,26.00796812749004,26.05776892430279,26.10756972111554,26.157370517928285,26.207171314741036,26.256972111553786,26.306772908366533,26.356573705179283,26.406374501992033,26.45617529880478,26.50597609561753,26.55577689243028,26.605577689243027,26.655378486055778,26.705179282868524,26.754980079681275,26.804780876494025,26.85458167330677,26.904382470119522,26.954183266932272,27.00398406374502,27.05378486055777,27.10358565737052,27.153386454183266,27.203187250996017,27.252988047808763,27.302788844621514,27.352589641434264,27.40239043824701,27.45219123505976,27.50199203187251,27.551792828685258,27.60159362549801,27.65139442231076,27.701195219123505,27.750996015936256,27.800796812749002,27.850597609561753,27.900398406374503,27.95019920318725,28.0]}

},{}],86:[function(require,module,exports){
module.exports={"expected":[-0.035706697746174874,-0.035524803739635645,-0.03534475313496004,-0.035166518056279794,-0.034990071186844614,-0.034815385755076776,-0.03464243552104107,-0.0344711947633156,-0.034301638266249615,-0.034133741307595264,-0.03396747964650042,-0.03380282951185036,-0.03363976759094665,-0.033478271018511675,-0.0333183173660082,-0.03315988463126334,-0.033002951228386805,-0.03284749597797397,-0.03269349809758416,-0.03254093719248531,-0.03238979324665639,-0.03224004661403908,-0.03209167801003094,-0.03194466850321208,-0.03179899950729802,-0.031654652773311594,-0.03151161038196683,-0.031369854736258286,-0.031229368554249366,-0.03109013486205331,-0.03095213698700103,-0.030815358550989984,-0.03067978346400832,-0.030545395917829336,-0.030412180379870556,-0.03028012158721286,-0.03014920454077452,-0.030019414499635733,-0.02989073697550886,-0.029763157727350303,-0.029636662756109582,-0.02951123829961174,-0.029386870827568943,-0.029263547036717706,-0.02914125384607786,-0.029019978392329924,-0.028899708025307228,-0.028780430303599697,-0.028662132990265887,-0.02854480404865035,-0.028428431638303168,-0.028313004110998876,-0.028198510006851887,-0.028084938050525754,-0.027972277147533545,-0.027860516380626966,-0.027749645006271507,-0.027639652451205476,-0.02753052830908044,-0.027422262337180852,-0.027314844453220848,-0.027208264732215826,-0.027102513403427096,-0.02699758084737732,-0.026893457592935092,-0.026790134314466595,-0.0266876018290527,-0.026585851093769607,-0.026484873203031507,-0.026384659385993468,-0.026285201004013065,-0.026186489548169156,-0.026088516636836354,-0.02599127401331365,-0.02589475354350592,-0.02579894721365682,-0.025703847128131816,-0.02560944550725001,-0.025515734685163625,-0.025422707107783722,-0.02533035533075123,-0.025238672017451943,-0.02514764993707445,-0.025057281962709958,-0.02496756106949287,-0.024878480332781183,-0.024790032926375626,-0.02470221212077672,-0.024615011281478652,-0.024528423867299178,-0.024442443428744624,-0.024357063606409164,-0.02427227812940746,-0.024188080813839954,-0.02410446556128996,-0.024021426357351817,-0.023938957270189302,-0.023857052449123707,-0.023775706123250674,-0.023694912600085338,-0.023614666264234894,-0.023534961576098086,-0.023455793070590904,-0.023377155355897926,-0.023299043112248664,-0.02322145109071835,-0.02314437411205262,-0.02306780706551548,-0.02299174490776006,-0.022916182661721667,-0.022841115415532527,-0.022766538321457818,-0.022692446594852447,-0.02261883551313815,-0.022545700414800387,-0.02247303669840466,-0.022400839821631782,-0.02232910530033165,-0.02225782870759517,-0.022187005672843835,-0.022116631880936707,-0.022046703071294253,-0.021977215037038787,-0.021908163624151097,-0.021839544730642917,-0.02177135430574489,-0.021703588349109723,-0.0216362429100301,-0.02156931408667118,-0.021502798025317262,-0.021436690919632316,-0.021370989009934144,-0.02130568858248185,-0.021240785968776255,-0.021176277544873168,-0.02111215973070901,-0.021048428989438754,-0.020985081826785733,-0.020922114790403207,-0.02085952446924734,-0.02079730749296144,-0.02073546053127113,-0.020673980293390314,-0.020612863527437693,-0.020552107019863517,-0.020491707594886527,-0.020431662113940742,-0.02037196747513197,-0.02031262061270379,-0.020253618496512856,-0.0201949581315133,-0.020136636557250107,-0.020078650847361143,-0.020020998109087904,-0.019963675482794537,-0.01990668014149517,-0.019850009290389256,-0.019793660166404926,-0.019737630037749976,-0.019681916203470543,-0.019626515993017193,-0.01957142676581833,-0.019516645910860737,-0.0194621708462772,-0.019407999018940955,-0.019354127904066917,-0.01930055500481952,-0.019247277851927067,-0.01919429400330243,-0.019141601043669985,-0.019089196584198716,-0.019037078262141287,-0.01898524374047902,-0.018933690707572656,-0.01888241687681881,-0.018831419986311944,-0.018780697798511846,-0.01873024809991646,-0.018680068700739936,-0.018630157434595885,-0.018580512158185684,-0.01853113075099173,-0.018482011114975598,-0.018433151174280973,-0.01838454887494127,-0.01833620218459189,-0.018288109092186984,-0.01824026760772067,-0.018192675761952604,-0.018145331606137842,-0.018098233211760927,-0.01805137867027405,-0.018004766092839342,-0.01795839361007507,-0.01791225937180581,-0.017866361546816412,-0.01782069832260977,-0.01777526790516829,-0.017730068518718948,-0.017685098405502014,-0.017640355825543207,-0.01759583905642933,-0.0175515463930873,-0.01750747614756648,-0.017463626648824313,-0.01741999624251514,-0.0173765832907822,-0.01733338617205271,-0.017290403280836007,-0.01724763302752468,-0.017205073838198644,-0.017162724154432107,-0.017120582433103392,-0.01707864714620755,-0.017036916780671672,-0.016995389838173003,-0.016954064834959592,-0.016912940301673653,-0.016872014783177416,-0.016831286838381535,-0.016790755040075985,-0.01675041797476335,-0.016710274242494563,-0.01667032245670696,-0.01663056124406468,-0.016590989244301312,-0.016551605110064833,-0.016512407506764658,-0.016473395112420988,-0.016434566617516154,-0.016395920724848165,-0.016357456149386242,-0.01631917161812843,-0.016281065869961163,-0.016243137655520854,-0.016205385737057303,-0.016167808888299166,-0.01613040589432112,-0.016093175551413,-0.016056116666950667,-0.01601922805926869,-0.015982508557534757,-0.015945957001625845,-0.01590957224200604,-0.01587335313960605,-0.015837298565704348,-0.015801407401809978,-0.015765678539546853,-0.01573011088053973,-0.015694703336301637,-0.015659454828122865,-0.01562436428696144,-0.015589430653335066,-0.015554652877214494,-0.01552002991791836,-0.01548556074400937,-0.015451244333191894,-0.015417079672210935,-0.015383065756752395,-0.015349201591344688,-0.015315486189261637,-0.015281918572426646,-0.015248497771318153,-0.015215222824876272,-0.01518209278041071,-0.01514910669350983,-0.01511626362795097,-0.01508356265561183,-0.015051002856383087,-0.015018583318082096,-0.014986303136367734,-0.014954161414656305,-0.014922157264038543,-0.014890289803197685,-0.01485855815832859,-0.014826961463057864,-0.014795498858365038,-0.014764169492504715,-0.01473297252092975,-0.014701907106215325,-0.014670972417984067,-0.01464016763283206,-0.014609491934255791,-0.014578944512580017,-0.014548524564886551,-0.014518231294943909,-0.014488063913137866,-0.014458021636402831,-0.014428103688154127,-0.014398309298221073,-0.014368637702780906,-0.014339088144293514,-0.014309659871436975,-0.014280352139043898,-0.01425116420803852,-0.014222095345374596,-0.014193144823974033,-0.014164311922666288,-0.014135595926128489,-0.014106996124826274,-0.014078511814955374,-0.014050142298383883,-0.014021886882595229,-0.013993744880631825,-0.013965715611039412,-0.013937798397812062,-0.013909992570337827,-0.013882297463345053,-0.013854712416849345,-0.013827236776101122,-0.013799869891533832,-0.013772611118712768,-0.013745459818284497,-0.013718415355926864,-0.013691477102299612,-0.013664644432995556,-0.01363791672849237,-0.013611293374104886,-0.013584773759937985,-0.01355835728084004,-0.013532043336356886,-0.013505831330686321,-0.013479720672633151,-0.013453710775564749,-0.013427801057367132,-0.013401990940401518,-0.013376279851461429,-0.01335066722173024,-0.013325152486739256,-0.01329973508632624,-0.01327441446459441,-0.013249190069871944,-0.013224061354671903,-0.013199027775652624,-0.013174088793578563,-0.013149243873281593,-0.013124492483622713,-0.01309983409745421,-0.013075268191582235,-0.01305079424672981,-0.013026411747500233,-0.013002120182340912,-0.01297791904350759,-0.012953807827028976,-0.012929786032671753,-0.012905853163905998,-0.012882008727870977,-0.012858252235341313,-0.01283458320069352,-0.012811001141872926,-0.012787505580360958,-0.012764096041142764,-0.012740772052675209,-0.012717533146855222,-0.012694378858988477,-0.012671308727758424,-0.012648322295195661,-0.01262541910664762,-0.012602598710748602,-0.01257986065939014,-0.012557204507691641,-0.012534629813971408,-0.012512136139717914,-0.012489723049561436,-0.012467390111245941,-0.012445136895601321,-0.012422962976515902,-0.012400867930909236,-0.012378851338705215,-0.012356912782805426,-0.012335051849062844,-0.01231326812625575,-0.012291561206061955,-0.012269930683033298,-0.0122483761545704,-0.012226897220897677,-0.012205493485038648,-0.012184164552791454,-0.012162910032704694,-0.012141729536053443,-0.012120622676815582,-0.01209958907164833,-0.012078628339865062,-0.012057740103412316,-0.012036923986847088,-0.012016179617314325,-0.011995506624524685,-0.01197490464073248,-0.011954373300713894,-0.011933912241745387,-0.011913521103582356,-0.011893199528437969,-0.011872947160962264,-0.011852763648221427,-0.011832648639677293,-0.011812601787167053,-0.011792622744883165,-0.011772711169353498,-0.011752866719421603,-0.011733089056227277,-0.011713377843187246,-0.011693732745976088,-0.011674153432507335,-0.011654639572914741,-0.011635190839533788,-0.011615806906883325,-0.011596487451647423,-0.011577232152657397,-0.011558040690874015,-0.01153891274936987,-0.01151984801331195,-0.011500846169944344,-0.011481906908571166,-0.011463029920539606,-0.01144421489922317,-0.011425461540005072,-0.01140676954026181,-0.011388138599346882,-0.01136956841857466,-0.011351058701204439,-0.011332609152424638,-0.01131421947933713,-0.011295889390941765,-0.011277618598121006,-0.011259406813624742,-0.01124125375205522,-0.011223159129852155,-0.011205122665277949,-0.011187144078403091,-0.011169223091091652,-0.011151359426986968,-0.011133552811497407,-0.011115802971782331,-0.011098109636738138,-0.011080472536984473,-0.011062891404850552,-0.011045365974361628,-0.011027895981225574,-0.0110104811628196,-0.010993121258177092,-0.010975816007974584,-0.010958565154518837,-0.01094136844173406,-0.010924225615149228,-0.01090713642188554,-0.01089010061064398,-0.010873117931693002,-0.010856188136856333,-0.010839310979500876,-0.010822486214524737,-0.010805713598345364,-0.010788992888887789,-0.01077232384557299,-0.010755706229306343,-0.010739139802466192,-0.010722624328892542,-0.010706159573875808,-0.010689745304145723,-0.010673381287860304,-0.010657067294594959,-0.010640803095331648,-0.010624588462448176,-0.010608423169707582,-0.010592306992247615,-0.010576239706570302,-0.010560221090531619,-0.010544250923331258,-0.010528328985502485,-0.010512455058902075,-0.010496628926700367,-0.01048085037337137,-0.010465119184683007,-0.010449435147687402,-0.010433798050711271,-0.01041820768334641,-0.010402663836440252,-0.010387166302086515,-0.010371714873615935,-0.010356309345587077,-0.010340949513777238,-0.010325635175173412,-0.010310366127963348,-0.010295142171526703,-0.01027996310642623,-0.010264828734399087,-0.010249738858348198,-0.010234693282333705,-0.010219691811564482,-0.010204734252389725,-0.01018982041229063,-0.010174950099872125,-0.010160123124854686,-0.01014533929806623,-0.010130598431434051,-0.010115900337976868,-0.010101244831796894,-0.01008663172807203,-0.010072060843048063,-0.010057531994030993,-0.010043044999379382,-0.010028599678496784,-0.010014195851824252,-0.009999833340832886],"x":[-28.0,-28.143426294820717,-28.286852589641434,-28.43027888446215,-28.573705179282868,-28.717131474103585,-28.860557768924302,-29.00398406374502,-29.147410358565736,-29.290836653386453,-29.43426294820717,-29.577689243027887,-29.721115537848604,-29.86454183266932,-30.00796812749004,-30.15139442231076,-30.294820717131476,-30.438247011952193,-30.58167330677291,-30.725099601593627,-30.868525896414344,-31.01195219123506,-31.155378486055778,-31.298804780876495,-31.44223107569721,-31.58565737051793,-31.729083665338646,-31.872509960159363,-32.01593625498008,-32.1593625498008,-32.30278884462152,-32.44621513944223,-32.58964143426295,-32.733067729083665,-32.876494023904385,-33.0199203187251,-33.16334661354582,-33.30677290836653,-33.45019920318725,-33.59362549800797,-33.73705179282869,-33.8804780876494,-34.02390438247012,-34.167330677290835,-34.310756972111555,-34.45418326693227,-34.59760956175299,-34.7410358565737,-34.88446215139442,-35.02788844621514,-35.17131474103586,-35.31474103585657,-35.45816733067729,-35.601593625498005,-35.745019920318725,-35.88844621513944,-36.03187250996016,-36.17529880478088,-36.31872509960159,-36.462151394422314,-36.60557768924303,-36.74900398406375,-36.89243027888446,-37.03585657370518,-37.179282868525895,-37.322709163346616,-37.46613545816733,-37.60956175298805,-37.75298804780876,-37.896414342629484,-38.0398406374502,-38.18326693227092,-38.32669322709163,-38.47011952191235,-38.613545816733065,-38.756972111553786,-38.9003984063745,-39.04382470119522,-39.18725099601593,-39.330677290836654,-39.47410358565737,-39.61752988047809,-39.7609561752988,-39.90438247011952,-40.04780876494024,-40.191235059760956,-40.33466135458168,-40.47808764940239,-40.62151394422311,-40.764940239043824,-40.908366533864545,-41.05179282868526,-41.19521912350598,-41.33864541832669,-41.48207171314741,-41.625498007968126,-41.76892430278885,-41.91235059760956,-42.05577689243028,-42.199203187250994,-42.342629482071715,-42.48605577689243,-42.62948207171315,-42.77290836653386,-42.91633466135458,-43.059760956175296,-43.20318725099602,-43.34661354581673,-43.49003984063745,-43.633466135458164,-43.776892430278885,-43.9203187250996,-44.06374501992032,-44.20717131474104,-44.35059760956175,-44.49402390438247,-44.63745019920319,-44.78087649402391,-44.92430278884462,-45.06772908366534,-45.211155378486055,-45.354581673306775,-45.49800796812749,-45.64143426294821,-45.78486055776892,-45.92828685258964,-46.07171314741036,-46.21513944223108,-46.35856573705179,-46.50199203187251,-46.645418326693225,-46.788844621513945,-46.93227091633466,-47.07569721115538,-47.21912350597609,-47.36254980079681,-47.50597609561753,-47.64940239043825,-47.79282868525896,-47.93625498007968,-48.0796812749004,-48.223107569721115,-48.366533864541836,-48.50996015936255,-48.65338645418327,-48.79681274900398,-48.940239043824704,-49.08366533864542,-49.22709163346614,-49.37051792828685,-49.51394422310757,-49.657370517928285,-49.800796812749006,-49.94422310756972,-50.08764940239044,-50.23107569721115,-50.374501992031874,-50.51792828685259,-50.66135458167331,-50.80478087649402,-50.94820717131474,-51.091633466135455,-51.235059760956176,-51.37848605577689,-51.52191235059761,-51.66533864541832,-51.808764940239044,-51.95219123505976,-52.09561752988048,-52.2390438247012,-52.38247011952191,-52.52589641434263,-52.669322709163346,-52.81274900398407,-52.95617529880478,-53.0996015936255,-53.243027888446214,-53.386454183266935,-53.52988047808765,-53.67330677290837,-53.81673306772908,-53.9601593625498,-54.103585657370516,-54.24701195219124,-54.39043824701195,-54.53386454183267,-54.677290836653384,-54.820717131474105,-54.96414342629482,-55.10756972111554,-55.25099601593625,-55.39442231075697,-55.537848605577686,-55.68127490039841,-55.82470119521912,-55.96812749003984,-56.11155378486056,-56.254980079681275,-56.398406374501995,-56.54183266932271,-56.68525896414343,-56.82868525896414,-56.97211155378486,-57.11553784860558,-57.2589641434263,-57.40239043824701,-57.54581673306773,-57.689243027888445,-57.832669322709165,-57.97609561752988,-58.1195219123506,-58.26294820717131,-58.40637450199203,-58.54980079681275,-58.69322709163347,-58.83665338645418,-58.9800796812749,-59.123505976095615,-59.266932270916335,-59.41035856573705,-59.55378486055777,-59.69721115537848,-59.8406374501992,-59.98406374501992,-60.12749003984064,-60.27091633466136,-60.41434262948207,-60.55776892430279,-60.701195219123505,-60.844621513944226,-60.98804780876494,-61.13147410358566,-61.27490039840637,-61.418326693227094,-61.56175298804781,-61.70517928286853,-61.84860557768924,-61.99203187250996,-62.135458167330675,-62.278884462151396,-62.42231075697211,-62.56573705179283,-62.70916334661354,-62.852589641434264,-62.99601593625498,-63.1394422310757,-63.28286852589641,-63.42629482071713,-63.569721115537845,-63.713147410358566,-63.85657370517928,-64.0,-64.14342629482071,-64.28685258964144,-64.43027888446215,-64.57370517928287,-64.71713147410358,-64.86055776892431,-65.00398406374502,-65.14741035856574,-65.29083665338645,-65.43426294820718,-65.57768924302789,-65.7211155378486,-65.86454183266932,-66.00796812749005,-66.15139442231076,-66.29482071713147,-66.43824701195219,-66.58167330677291,-66.72509960159363,-66.86852589641434,-67.01195219123505,-67.15537848605578,-67.2988047808765,-67.44223107569721,-67.58565737051792,-67.72908366533865,-67.87250996015936,-68.01593625498008,-68.1593625498008,-68.30278884462152,-68.44621513944223,-68.58964143426294,-68.73306772908367,-68.87649402390439,-69.0199203187251,-69.16334661354581,-69.30677290836654,-69.45019920318725,-69.59362549800797,-69.73705179282868,-69.88047808764941,-70.02390438247012,-70.16733067729083,-70.31075697211155,-70.45418326693228,-70.59760956175299,-70.7410358565737,-70.88446215139442,-71.02788844621514,-71.17131474103586,-71.31474103585657,-71.45816733067728,-71.60159362549801,-71.74501992031873,-71.88844621513944,-72.03187250996017,-72.17529880478088,-72.3187250996016,-72.4621513944223,-72.60557768924303,-72.74900398406375,-72.89243027888446,-73.03585657370517,-73.1792828685259,-73.32270916334662,-73.46613545816733,-73.60956175298804,-73.75298804780877,-73.89641434262948,-74.0398406374502,-74.18326693227091,-74.32669322709164,-74.47011952191235,-74.61354581673307,-74.75697211155378,-74.9003984063745,-75.04382470119522,-75.18725099601593,-75.33067729083665,-75.47410358565737,-75.61752988047809,-75.7609561752988,-75.90438247011951,-76.04780876494024,-76.19123505976096,-76.33466135458167,-76.4780876494024,-76.62151394422311,-76.76494023904382,-76.90836653386454,-77.05179282868527,-77.19521912350598,-77.33864541832669,-77.4820717131474,-77.62549800796813,-77.76892430278885,-77.91235059760956,-78.05577689243027,-78.199203187251,-78.34262948207171,-78.48605577689243,-78.62948207171314,-78.77290836653387,-78.91633466135458,-79.0597609561753,-79.20318725099601,-79.34661354581674,-79.49003984063745,-79.63346613545816,-79.77689243027888,-79.9203187250996,-80.06374501992032,-80.20717131474103,-80.35059760956176,-80.49402390438247,-80.63745019920319,-80.7808764940239,-80.92430278884463,-81.06772908366534,-81.21115537848605,-81.35458167330677,-81.4980079681275,-81.64143426294821,-81.78486055776892,-81.92828685258964,-82.07171314741036,-82.21513944223108,-82.35856573705179,-82.5019920318725,-82.64541832669323,-82.78884462151395,-82.93227091633466,-83.07569721115537,-83.2191235059761,-83.36254980079681,-83.50597609561753,-83.64940239043824,-83.79282868525897,-83.93625498007968,-84.0796812749004,-84.22310756972112,-84.36653386454184,-84.50996015936255,-84.65338645418326,-84.79681274900399,-84.9402390438247,-85.08366533864542,-85.22709163346613,-85.37051792828686,-85.51394422310757,-85.65737051792829,-85.800796812749,-85.94422310756973,-86.08764940239044,-86.23107569721115,-86.37450199203187,-86.5179282868526,-86.66135458167331,-86.80478087649402,-86.94820717131473,-87.09163346613546,-87.23505976095618,-87.37848605577689,-87.5219123505976,-87.66533864541833,-87.80876494023904,-87.95219123505976,-88.09561752988049,-88.2390438247012,-88.38247011952191,-88.52589641434263,-88.66932270916335,-88.81274900398407,-88.95617529880478,-89.0996015936255,-89.24302788844622,-89.38645418326693,-89.52988047808765,-89.67330677290836,-89.81673306772909,-89.9601593625498,-90.10358565737052,-90.24701195219123,-90.39043824701196,-90.53386454183267,-90.67729083665338,-90.8207171314741,-90.96414342629483,-91.10756972111554,-91.25099601593625,-91.39442231075697,-91.5378486055777,-91.6812749003984,-91.82470119521912,-91.96812749003983,-92.11155378486056,-92.25498007968127,-92.39840637450199,-92.54183266932272,-92.68525896414343,-92.82868525896414,-92.97211155378486,-93.11553784860558,-93.2589641434263,-93.40239043824701,-93.54581673306772,-93.68924302788845,-93.83266932270917,-93.97609561752988,-94.11952191235059,-94.26294820717132,-94.40637450199203,-94.54980079681275,-94.69322709163346,-94.83665338645419,-94.9800796812749,-95.12350597609561,-95.26693227091633,-95.41035856573706,-95.55378486055777,-95.69721115537848,-95.8406374501992,-95.98406374501992,-96.12749003984064,-96.27091633466135,-96.41434262948208,-96.55776892430279,-96.7011952191235,-96.84462151394422,-96.98804780876495,-97.13147410358566,-97.27490039840637,-97.41832669322709,-97.56175298804781,-97.70517928286853,-97.84860557768924,-97.99203187250995,-98.13545816733068,-98.2788844621514,-98.42231075697211,-98.56573705179282,-98.70916334661355,-98.85258964143426,-98.99601593625498,-99.13944223107569,-99.28286852589642,-99.42629482071713,-99.56972111553785,-99.71314741035856,-99.85657370517929,-100.0]}

},{}],87:[function(require,module,exports){
module.exports={"expected":[0.035706697746174874,0.035524803739635645,0.03534475313496004,0.035166518056279794,0.034990071186844614,0.034815385755076776,0.03464243552104107,0.0344711947633156,0.034301638266249615,0.034133741307595264,0.03396747964650042,0.03380282951185036,0.03363976759094665,0.033478271018511675,0.0333183173660082,0.03315988463126334,0.033002951228386805,0.03284749597797397,0.03269349809758416,0.03254093719248531,0.03238979324665639,0.03224004661403908,0.03209167801003094,0.03194466850321208,0.03179899950729802,0.031654652773311594,0.03151161038196683,0.031369854736258286,0.031229368554249366,0.03109013486205331,0.03095213698700103,0.030815358550989984,0.03067978346400832,0.030545395917829336,0.030412180379870556,0.03028012158721286,0.03014920454077452,0.030019414499635733,0.02989073697550886,0.029763157727350303,0.029636662756109582,0.02951123829961174,0.029386870827568943,0.029263547036717706,0.02914125384607786,0.029019978392329924,0.028899708025307228,0.028780430303599697,0.028662132990265887,0.02854480404865035,0.028428431638303168,0.028313004110998876,0.028198510006851887,0.028084938050525754,0.027972277147533545,0.027860516380626966,0.027749645006271507,0.027639652451205476,0.02753052830908044,0.027422262337180852,0.027314844453220848,0.027208264732215826,0.027102513403427096,0.02699758084737732,0.026893457592935092,0.026790134314466595,0.0266876018290527,0.026585851093769607,0.026484873203031507,0.026384659385993468,0.026285201004013065,0.026186489548169156,0.026088516636836354,0.02599127401331365,0.02589475354350592,0.02579894721365682,0.025703847128131816,0.02560944550725001,0.025515734685163625,0.025422707107783722,0.02533035533075123,0.025238672017451943,0.02514764993707445,0.025057281962709958,0.02496756106949287,0.024878480332781183,0.024790032926375626,0.02470221212077672,0.024615011281478652,0.024528423867299178,0.024442443428744624,0.024357063606409164,0.02427227812940746,0.024188080813839954,0.02410446556128996,0.024021426357351817,0.023938957270189302,0.023857052449123707,0.023775706123250674,0.023694912600085338,0.023614666264234894,0.023534961576098086,0.023455793070590904,0.023377155355897926,0.023299043112248664,0.02322145109071835,0.02314437411205262,0.02306780706551548,0.02299174490776006,0.022916182661721667,0.022841115415532527,0.022766538321457818,0.022692446594852447,0.02261883551313815,0.022545700414800387,0.02247303669840466,0.022400839821631782,0.02232910530033165,0.02225782870759517,0.022187005672843835,0.022116631880936707,0.022046703071294253,0.021977215037038787,0.021908163624151097,0.021839544730642917,0.02177135430574489,0.021703588349109723,0.0216362429100301,0.02156931408667118,0.021502798025317262,0.021436690919632316,0.021370989009934144,0.02130568858248185,0.021240785968776255,0.021176277544873168,0.02111215973070901,0.021048428989438754,0.020985081826785733,0.020922114790403207,0.02085952446924734,0.02079730749296144,0.02073546053127113,0.020673980293390314,0.020612863527437693,0.020552107019863517,0.020491707594886527,0.020431662113940742,0.02037196747513197,0.02031262061270379,0.020253618496512856,0.0201949581315133,0.020136636557250107,0.020078650847361143,0.020020998109087904,0.019963675482794537,0.01990668014149517,0.019850009290389256,0.019793660166404926,0.019737630037749976,0.019681916203470543,0.019626515993017193,0.01957142676581833,0.019516645910860737,0.0194621708462772,0.019407999018940955,0.019354127904066917,0.01930055500481952,0.019247277851927067,0.01919429400330243,0.019141601043669985,0.019089196584198716,0.019037078262141287,0.01898524374047902,0.018933690707572656,0.01888241687681881,0.018831419986311944,0.018780697798511846,0.01873024809991646,0.018680068700739936,0.018630157434595885,0.018580512158185684,0.01853113075099173,0.018482011114975598,0.018433151174280973,0.01838454887494127,0.01833620218459189,0.018288109092186984,0.01824026760772067,0.018192675761952604,0.018145331606137842,0.018098233211760927,0.01805137867027405,0.018004766092839342,0.01795839361007507,0.01791225937180581,0.017866361546816412,0.01782069832260977,0.01777526790516829,0.017730068518718948,0.017685098405502014,0.017640355825543207,0.01759583905642933,0.0175515463930873,0.01750747614756648,0.017463626648824313,0.01741999624251514,0.0173765832907822,0.01733338617205271,0.017290403280836007,0.01724763302752468,0.017205073838198644,0.017162724154432107,0.017120582433103392,0.01707864714620755,0.017036916780671672,0.016995389838173003,0.016954064834959592,0.016912940301673653,0.016872014783177416,0.016831286838381535,0.016790755040075985,0.01675041797476335,0.016710274242494563,0.01667032245670696,0.01663056124406468,0.016590989244301312,0.016551605110064833,0.016512407506764658,0.016473395112420988,0.016434566617516154,0.016395920724848165,0.016357456149386242,0.01631917161812843,0.016281065869961163,0.016243137655520854,0.016205385737057303,0.016167808888299166,0.01613040589432112,0.016093175551413,0.016056116666950667,0.01601922805926869,0.015982508557534757,0.015945957001625845,0.01590957224200604,0.01587335313960605,0.015837298565704348,0.015801407401809978,0.015765678539546853,0.01573011088053973,0.015694703336301637,0.015659454828122865,0.01562436428696144,0.015589430653335066,0.015554652877214494,0.01552002991791836,0.01548556074400937,0.015451244333191894,0.015417079672210935,0.015383065756752395,0.015349201591344688,0.015315486189261637,0.015281918572426646,0.015248497771318153,0.015215222824876272,0.01518209278041071,0.01514910669350983,0.01511626362795097,0.01508356265561183,0.015051002856383087,0.015018583318082096,0.014986303136367734,0.014954161414656305,0.014922157264038543,0.014890289803197685,0.01485855815832859,0.014826961463057864,0.014795498858365038,0.014764169492504715,0.01473297252092975,0.014701907106215325,0.014670972417984067,0.01464016763283206,0.014609491934255791,0.014578944512580017,0.014548524564886551,0.014518231294943909,0.014488063913137866,0.014458021636402831,0.014428103688154127,0.014398309298221073,0.014368637702780906,0.014339088144293514,0.014309659871436975,0.014280352139043898,0.01425116420803852,0.014222095345374596,0.014193144823974033,0.014164311922666288,0.014135595926128489,0.014106996124826274,0.014078511814955374,0.014050142298383883,0.014021886882595229,0.013993744880631825,0.013965715611039412,0.013937798397812062,0.013909992570337827,0.013882297463345053,0.013854712416849345,0.013827236776101122,0.013799869891533832,0.013772611118712768,0.013745459818284497,0.013718415355926864,0.013691477102299612,0.013664644432995556,0.01363791672849237,0.013611293374104886,0.013584773759937985,0.01355835728084004,0.013532043336356886,0.013505831330686321,0.013479720672633151,0.013453710775564749,0.013427801057367132,0.013401990940401518,0.013376279851461429,0.01335066722173024,0.013325152486739256,0.01329973508632624,0.01327441446459441,0.013249190069871944,0.013224061354671903,0.013199027775652624,0.013174088793578563,0.013149243873281593,0.013124492483622713,0.01309983409745421,0.013075268191582235,0.01305079424672981,0.013026411747500233,0.013002120182340912,0.01297791904350759,0.012953807827028976,0.012929786032671753,0.012905853163905998,0.012882008727870977,0.012858252235341313,0.01283458320069352,0.012811001141872926,0.012787505580360958,0.012764096041142764,0.012740772052675209,0.012717533146855222,0.012694378858988477,0.012671308727758424,0.012648322295195661,0.01262541910664762,0.012602598710748602,0.01257986065939014,0.012557204507691641,0.012534629813971408,0.012512136139717914,0.012489723049561436,0.012467390111245941,0.012445136895601321,0.012422962976515902,0.012400867930909236,0.012378851338705215,0.012356912782805426,0.012335051849062844,0.01231326812625575,0.012291561206061955,0.012269930683033298,0.0122483761545704,0.012226897220897677,0.012205493485038648,0.012184164552791454,0.012162910032704694,0.012141729536053443,0.012120622676815582,0.01209958907164833,0.012078628339865062,0.012057740103412316,0.012036923986847088,0.012016179617314325,0.011995506624524685,0.01197490464073248,0.011954373300713894,0.011933912241745387,0.011913521103582356,0.011893199528437969,0.011872947160962264,0.011852763648221427,0.011832648639677293,0.011812601787167053,0.011792622744883165,0.011772711169353498,0.011752866719421603,0.011733089056227277,0.011713377843187246,0.011693732745976088,0.011674153432507335,0.011654639572914741,0.011635190839533788,0.011615806906883325,0.011596487451647423,0.011577232152657397,0.011558040690874015,0.01153891274936987,0.01151984801331195,0.011500846169944344,0.011481906908571166,0.011463029920539606,0.01144421489922317,0.011425461540005072,0.01140676954026181,0.011388138599346882,0.01136956841857466,0.011351058701204439,0.011332609152424638,0.01131421947933713,0.011295889390941765,0.011277618598121006,0.011259406813624742,0.01124125375205522,0.011223159129852155,0.011205122665277949,0.011187144078403091,0.011169223091091652,0.011151359426986968,0.011133552811497407,0.011115802971782331,0.011098109636738138,0.011080472536984473,0.011062891404850552,0.011045365974361628,0.011027895981225574,0.0110104811628196,0.010993121258177092,0.010975816007974584,0.010958565154518837,0.01094136844173406,0.010924225615149228,0.01090713642188554,0.01089010061064398,0.010873117931693002,0.010856188136856333,0.010839310979500876,0.010822486214524737,0.010805713598345364,0.010788992888887789,0.01077232384557299,0.010755706229306343,0.010739139802466192,0.010722624328892542,0.010706159573875808,0.010689745304145723,0.010673381287860304,0.010657067294594959,0.010640803095331648,0.010624588462448176,0.010608423169707582,0.010592306992247615,0.010576239706570302,0.010560221090531619,0.010544250923331258,0.010528328985502485,0.010512455058902075,0.010496628926700367,0.01048085037337137,0.010465119184683007,0.010449435147687402,0.010433798050711271,0.01041820768334641,0.010402663836440252,0.010387166302086515,0.010371714873615935,0.010356309345587077,0.010340949513777238,0.010325635175173412,0.010310366127963348,0.010295142171526703,0.01027996310642623,0.010264828734399087,0.010249738858348198,0.010234693282333705,0.010219691811564482,0.010204734252389725,0.01018982041229063,0.010174950099872125,0.010160123124854686,0.01014533929806623,0.010130598431434051,0.010115900337976868,0.010101244831796894,0.01008663172807203,0.010072060843048063,0.010057531994030993,0.010043044999379382,0.010028599678496784,0.010014195851824252,0.009999833340832886],"x":[28.0,28.143426294820717,28.286852589641434,28.43027888446215,28.573705179282868,28.717131474103585,28.860557768924302,29.00398406374502,29.147410358565736,29.290836653386453,29.43426294820717,29.577689243027887,29.721115537848604,29.86454183266932,30.00796812749004,30.15139442231076,30.294820717131476,30.438247011952193,30.58167330677291,30.725099601593627,30.868525896414344,31.01195219123506,31.155378486055778,31.298804780876495,31.44223107569721,31.58565737051793,31.729083665338646,31.872509960159363,32.01593625498008,32.1593625498008,32.30278884462152,32.44621513944223,32.58964143426295,32.733067729083665,32.876494023904385,33.0199203187251,33.16334661354582,33.30677290836653,33.45019920318725,33.59362549800797,33.73705179282869,33.8804780876494,34.02390438247012,34.167330677290835,34.310756972111555,34.45418326693227,34.59760956175299,34.7410358565737,34.88446215139442,35.02788844621514,35.17131474103586,35.31474103585657,35.45816733067729,35.601593625498005,35.745019920318725,35.88844621513944,36.03187250996016,36.17529880478088,36.31872509960159,36.462151394422314,36.60557768924303,36.74900398406375,36.89243027888446,37.03585657370518,37.179282868525895,37.322709163346616,37.46613545816733,37.60956175298805,37.75298804780876,37.896414342629484,38.0398406374502,38.18326693227092,38.32669322709163,38.47011952191235,38.613545816733065,38.756972111553786,38.9003984063745,39.04382470119522,39.18725099601593,39.330677290836654,39.47410358565737,39.61752988047809,39.7609561752988,39.90438247011952,40.04780876494024,40.191235059760956,40.33466135458168,40.47808764940239,40.62151394422311,40.764940239043824,40.908366533864545,41.05179282868526,41.19521912350598,41.33864541832669,41.48207171314741,41.625498007968126,41.76892430278885,41.91235059760956,42.05577689243028,42.199203187250994,42.342629482071715,42.48605577689243,42.62948207171315,42.77290836653386,42.91633466135458,43.059760956175296,43.20318725099602,43.34661354581673,43.49003984063745,43.633466135458164,43.776892430278885,43.9203187250996,44.06374501992032,44.20717131474104,44.35059760956175,44.49402390438247,44.63745019920319,44.78087649402391,44.92430278884462,45.06772908366534,45.211155378486055,45.354581673306775,45.49800796812749,45.64143426294821,45.78486055776892,45.92828685258964,46.07171314741036,46.21513944223108,46.35856573705179,46.50199203187251,46.645418326693225,46.788844621513945,46.93227091633466,47.07569721115538,47.21912350597609,47.36254980079681,47.50597609561753,47.64940239043825,47.79282868525896,47.93625498007968,48.0796812749004,48.223107569721115,48.366533864541836,48.50996015936255,48.65338645418327,48.79681274900398,48.940239043824704,49.08366533864542,49.22709163346614,49.37051792828685,49.51394422310757,49.657370517928285,49.800796812749006,49.94422310756972,50.08764940239044,50.23107569721115,50.374501992031874,50.51792828685259,50.66135458167331,50.80478087649402,50.94820717131474,51.091633466135455,51.235059760956176,51.37848605577689,51.52191235059761,51.66533864541832,51.808764940239044,51.95219123505976,52.09561752988048,52.2390438247012,52.38247011952191,52.52589641434263,52.669322709163346,52.81274900398407,52.95617529880478,53.0996015936255,53.243027888446214,53.386454183266935,53.52988047808765,53.67330677290837,53.81673306772908,53.9601593625498,54.103585657370516,54.24701195219124,54.39043824701195,54.53386454183267,54.677290836653384,54.820717131474105,54.96414342629482,55.10756972111554,55.25099601593625,55.39442231075697,55.537848605577686,55.68127490039841,55.82470119521912,55.96812749003984,56.11155378486056,56.254980079681275,56.398406374501995,56.54183266932271,56.68525896414343,56.82868525896414,56.97211155378486,57.11553784860558,57.2589641434263,57.40239043824701,57.54581673306773,57.689243027888445,57.832669322709165,57.97609561752988,58.1195219123506,58.26294820717131,58.40637450199203,58.54980079681275,58.69322709163347,58.83665338645418,58.9800796812749,59.123505976095615,59.266932270916335,59.41035856573705,59.55378486055777,59.69721115537848,59.8406374501992,59.98406374501992,60.12749003984064,60.27091633466136,60.41434262948207,60.55776892430279,60.701195219123505,60.844621513944226,60.98804780876494,61.13147410358566,61.27490039840637,61.418326693227094,61.56175298804781,61.70517928286853,61.84860557768924,61.99203187250996,62.135458167330675,62.278884462151396,62.42231075697211,62.56573705179283,62.70916334661354,62.852589641434264,62.99601593625498,63.1394422310757,63.28286852589641,63.42629482071713,63.569721115537845,63.713147410358566,63.85657370517928,64.0,64.14342629482071,64.28685258964144,64.43027888446215,64.57370517928287,64.71713147410358,64.86055776892431,65.00398406374502,65.14741035856574,65.29083665338645,65.43426294820718,65.57768924302789,65.7211155378486,65.86454183266932,66.00796812749005,66.15139442231076,66.29482071713147,66.43824701195219,66.58167330677291,66.72509960159363,66.86852589641434,67.01195219123505,67.15537848605578,67.2988047808765,67.44223107569721,67.58565737051792,67.72908366533865,67.87250996015936,68.01593625498008,68.1593625498008,68.30278884462152,68.44621513944223,68.58964143426294,68.73306772908367,68.87649402390439,69.0199203187251,69.16334661354581,69.30677290836654,69.45019920318725,69.59362549800797,69.73705179282868,69.88047808764941,70.02390438247012,70.16733067729083,70.31075697211155,70.45418326693228,70.59760956175299,70.7410358565737,70.88446215139442,71.02788844621514,71.17131474103586,71.31474103585657,71.45816733067728,71.60159362549801,71.74501992031873,71.88844621513944,72.03187250996017,72.17529880478088,72.3187250996016,72.4621513944223,72.60557768924303,72.74900398406375,72.89243027888446,73.03585657370517,73.1792828685259,73.32270916334662,73.46613545816733,73.60956175298804,73.75298804780877,73.89641434262948,74.0398406374502,74.18326693227091,74.32669322709164,74.47011952191235,74.61354581673307,74.75697211155378,74.9003984063745,75.04382470119522,75.18725099601593,75.33067729083665,75.47410358565737,75.61752988047809,75.7609561752988,75.90438247011951,76.04780876494024,76.19123505976096,76.33466135458167,76.4780876494024,76.62151394422311,76.76494023904382,76.90836653386454,77.05179282868527,77.19521912350598,77.33864541832669,77.4820717131474,77.62549800796813,77.76892430278885,77.91235059760956,78.05577689243027,78.199203187251,78.34262948207171,78.48605577689243,78.62948207171314,78.77290836653387,78.91633466135458,79.0597609561753,79.20318725099601,79.34661354581674,79.49003984063745,79.63346613545816,79.77689243027888,79.9203187250996,80.06374501992032,80.20717131474103,80.35059760956176,80.49402390438247,80.63745019920319,80.7808764940239,80.92430278884463,81.06772908366534,81.21115537848605,81.35458167330677,81.4980079681275,81.64143426294821,81.78486055776892,81.92828685258964,82.07171314741036,82.21513944223108,82.35856573705179,82.5019920318725,82.64541832669323,82.78884462151395,82.93227091633466,83.07569721115537,83.2191235059761,83.36254980079681,83.50597609561753,83.64940239043824,83.79282868525897,83.93625498007968,84.0796812749004,84.22310756972112,84.36653386454184,84.50996015936255,84.65338645418326,84.79681274900399,84.9402390438247,85.08366533864542,85.22709163346613,85.37051792828686,85.51394422310757,85.65737051792829,85.800796812749,85.94422310756973,86.08764940239044,86.23107569721115,86.37450199203187,86.5179282868526,86.66135458167331,86.80478087649402,86.94820717131473,87.09163346613546,87.23505976095618,87.37848605577689,87.5219123505976,87.66533864541833,87.80876494023904,87.95219123505976,88.09561752988049,88.2390438247012,88.38247011952191,88.52589641434263,88.66932270916335,88.81274900398407,88.95617529880478,89.0996015936255,89.24302788844622,89.38645418326693,89.52988047808765,89.67330677290836,89.81673306772909,89.9601593625498,90.10358565737052,90.24701195219123,90.39043824701196,90.53386454183267,90.67729083665338,90.8207171314741,90.96414342629483,91.10756972111554,91.25099601593625,91.39442231075697,91.5378486055777,91.6812749003984,91.82470119521912,91.96812749003983,92.11155378486056,92.25498007968127,92.39840637450199,92.54183266932272,92.68525896414343,92.82868525896414,92.97211155378486,93.11553784860558,93.2589641434263,93.40239043824701,93.54581673306772,93.68924302788845,93.83266932270917,93.97609561752988,94.11952191235059,94.26294820717132,94.40637450199203,94.54980079681275,94.69322709163346,94.83665338645419,94.9800796812749,95.12350597609561,95.26693227091633,95.41035856573706,95.55378486055777,95.69721115537848,95.8406374501992,95.98406374501992,96.12749003984064,96.27091633466135,96.41434262948208,96.55776892430279,96.7011952191235,96.84462151394422,96.98804780876495,97.13147410358566,97.27490039840637,97.41832669322709,97.56175298804781,97.70517928286853,97.84860557768924,97.99203187250995,98.13545816733068,98.2788844621514,98.42231075697211,98.56573705179282,98.70916334661355,98.85258964143426,98.99601593625498,99.13944223107569,99.28286852589642,99.42629482071713,99.56972111553785,99.71314741035856,99.85657370517929,100.0]}

},{}],88:[function(require,module,exports){
module.exports={"expected":[-0.881373587019543,-0.8785648221811828,-0.8757727485921216,-0.872997223399564,-0.8702381053721214,-0.8674952548760734,-0.8647685338520688,-0.8620578057922589,-0.8593629357178508,-0.8566837901570737,-0.8540202371235461,-0.8513721460950371,-0.8487393879926115,-0.8461218351601517,-0.8435193613442457,-0.8409318416744351,-0.8383591526438152,-0.8358011720899767,-0.8332577791762857,-0.830728854373491,-0.8282142794416545,-0.8257139374123945,-0.8232277125714388,-0.8207554904414776,-0.818297157765313,-0.8158526024892955,-0.8134217137470444,-0.8110043818434439,-0.808600498238911,-0.8062099555339275,-0.8038326474538329,-0.80146846883387,-0.7991173156044817,-0.7967790847768498,-0.7944536744286734,-0.7921409836901823,-0.7898409127303782,-0.7875533627435015,-0.7852782359357193,-0.7830154355120266,-0.7807648656633612,-0.7785264315539255,-0.7763000393087106,-0.7740855960012203,-0.7718830096413907,-0.7696921891637005,-0.7675130444154687,-0.7653454861453384,-0.7631894259919384,-0.761044776472724,-0.7589114509729903,-0.7567893637350566,-0.7546784298476171,-0.7525785652352567,-0.7504896866481258,-0.7484117116517751,-0.7463445586171438,-0.7442881467106999,-0.742242395884731,-0.7402072268677793,-0.7381825611552224,-0.7361683209999937,-0.7341644294034417,-0.7321708101063261,-0.7301873875799457,-0.7282140870173991,-0.7262508343249728,-0.7242975561136566,-0.7223541796907823,-0.720420633051785,-0.7184968448720837,-0.7165827444990802,-0.7146782619442725,-0.7127833278754824,-0.7108978736091945,-0.7090218311030053,-0.7071551329481788,-0.7052977123623084,-0.7034495031820842,-0.7016104398561599,-0.6997804574381221,-0.6979594915795581,-0.696147478523219,-0.6943443550962817,-0.6925500587037001,-0.6907645273216532,-0.6889876994910803,-0.6872195143113065,-0.6854599114337566,-0.683708831055755,-0.6819662139144081,-0.6802320012805743,-0.6785061349529113,-0.6767885572520083,-0.6750792110145938,-0.6733780395878244,-0.6716849868236489,-0.6699999970732475,-0.6683230151815468,-0.6666539864818065,-0.6649928567902786,-0.6633395724009379,-0.6616940800802807,-0.6600563270621939,-0.6584262610428896,-0.6568038301759084,-0.6551889830671853,-0.6535816687701826,-0.6519818367810841,-0.6503894370340527,-0.6488044198965491,-0.6472267361647105,-0.6456563370587898,-0.644093174218652,-0.6425371996993297,-0.6409883659666337,-0.6394466258928211,-0.6379119327523178,-0.6363842402174951,-0.6348635023544987,-0.6333496736191336,-0.6318427088527967,-0.630342563278463,-0.6288491924967214,-0.6273625524818596,-0.6258825995779984,-0.6244092904952742,-0.6229425823060674,-0.6214824324412789,-0.6200287986866527,-0.6185816391791422,-0.6171409124033228,-0.6157065771878469,-0.6142785927019441,-0.6128569184519623,-0.6114415142779519,-0.610032340350291,-0.6086293571663518,-0.6072325255472073,-0.6058418066343769,-0.6044571618866126,-0.6030785530767222,-0.6017059422884318,-0.6003392919132852,-0.5989785646475797,-0.5976237234893401,-0.5962747317353265,-0.5949315529780789,-0.5935941511029963,-0.5922624902854505,-0.5909365349879331,-0.5896162499572373,-0.588301600221671,-0.5869925510883044,-0.585689068140248,-0.5843911172339632,-0.5830986644966043,-0.5818116763233905,-0.580530119375009,-0.5792539605750476,-0.5779831671074576,-0.5767177064140449,-0.5754575461919903,-0.5742026543913986,-0.5729529992128755,-0.5717085491051309,-0.5704692727626122,-0.569235139123161,-0.5680061173656998,-0.5667821769079422,-0.5655632874041299,-0.5643494187427962,-0.5631405410445529,-0.5619366246599032,-0.5607376401670785,-0.5595435583698998,-0.5583543502956627,-0.5571699871930462,-0.5559904405300442,-0.5548156819919204,-0.5536456834791864,-0.5524804171056001,-0.5513198551961892,-0.550163970285293,-0.5490127351146292,-0.5478661226313792,-0.5467241059862957,-0.5455866585318304,-0.5444537538202826,-0.5433253656019679,-0.5422014678234057,-0.5410820346255282,-0.5399670403419075,-0.538856459497002,-0.5377502668044223,-0.5366484371652145,-0.5355509456661643,-0.5344577675781161,-0.5333688783543128,-0.5322842536287523,-0.5312038692145611,-0.5301277011023863,-0.5290557254588031,-0.5279879186247411,-0.5269242571139265,-0.5258647176113392,-0.5248092769716893,-0.5237579122179066,-0.522710600539648,-0.5216673192918201,-0.5206280459931163,-0.5195927583245711,-0.5185614341281269,-0.5175340514052191,-0.5165105883153723,-0.515491023174814,-0.5144753344551012,-0.513463500781761,-0.5124555009329473,-0.5114513138381083,-0.5104509185766699,-0.5094542943767325,-0.5084614206137804,-0.5074722768094041,-0.5064868426300376,-0.5055050978857065,-0.50452702252879,-0.5035525966527954,-0.5025818004911444,-0.5016146144159724,-0.5006510189369405,-0.4996909947000577,-0.4987345224865169,-0.4977815832115414,-0.4968321579232438,-0.49588622780149577,-0.4949437741568095,-0.49400477842923035,-0.49306922218724064,-0.49213708712667387,-0.49120835506964045,-0.4902830079634639,-0.48936102787962743,-0.488442397012731,-0.4875270976794594,-0.48661511231755883,-0.4857064234848262,-0.4848010138581056,-0.4838988662322967,-0.48299996351937236,-0.4821042887474049,-0.48121182505960347,-0.48032255571335974,-0.47943646407930335,-0.47855353364036657,-0.4776737479908578,-0.4767970908355445,-0.47592354598874453,-0.475053097373427,-0.47418572902032097,-0.4733214250670334,-0.47246016975717536,-0.47160194743949707,-0.47074674256703003,-0.4698945396962395,-0.46904532348618255,-0.4681990786976768,-0.4673557901924748,-0.466515442932448,-0.4656780219787775,-0.46484351249115274,-0.4640118997269785,-0.463183169040588,-0.4623573058824648,-0.4615342957984718,-0.46071412442908655,-0.4598967775086452,-0.45908224086459243,-0.4582705004167394,-0.4574615421765278,-0.4566553522463012,-0.45585191681858345,-0.4550512221753634,-0.4542532546873867,-0.4534580008134538,-0.4526654470997248,-0.4518755801790307,-0.4510883867701911,-0.4503038536773379,-0.44952196778924586,-0.4487427160786688,-0.4479660856016819,-0.447192063497031,-0.4464206369854866,-0.44565179336920463,-0.44488552003109283,-0.4441218044341831,-0.44336063412100923,-0.4426019967129909,-0.4418458799098227,-0.4410922714888692,-0.44034115930456513,-0.4395925312878215,-0.43884637544543653,-0.43810267985951257,-0.43736143268687755,-0.4366226221585126,-0.4358862365789836,-0.4351522643258793,-0.4344206938492533,-0.43369151367107184,-0.4329647123846659,-0.4322402786541888,-0.4315182012140784,-0.43079846886852385,-0.4300810704909378,-0.4293659950234328,-0.4286532314763019,-0.42794276892750527,-0.4272345965221598,-0.42652870347203464,-0.42582507905505007,-0.4251237126147816,-0.4244245935599676,-0.4237277113640225,-0.4230330555645532,-0.4223406157628802,-0.42165038162356266,-0.4209623428739282,-0.4202764893036064,-0.41959281076406607,-0.4189112971681575,-0.41823193848965756,-0.41755472476281996,-0.4168796460819281,-0.4162066926008534,-0.41553585453261566,-0.4148671221489491,-0.4142004857798705,-0.41353593581325204,-0.412873462694398,-0.412213056925624,-0.41155470906584096,-0.4108984097301425,-0.41024414958939526,-0.40959191936983297,-0.4089417098526549,-0.4082935118736262,-0.4076473163226829,-0.40700311414353985,-0.4063608963333015,-0.40572065394207757,-0.40508237807259945,-0.4044460598798426,-0.4038116905706502,-0.4031792614033609,-0.4025487636874394,-0.4019201887831102,-0.4012935281009946,-0.4006687731017507,-0.4000459152957161,-0.399424946242554,-0.3988058575509024,-0.39818864087802575,-0.3975732879294696,-0.3969597904587188,-0.3963481402668575,-0.395738329202233,-0.3951303491601217,-0.39452419208239803,-0.3939198499572065,-0.3933173148186359,-0.3927165787463964,-0.39211763386549964,-0.3915204723459409,-0.39092508640238455,-0.3903314682938515,-0.38973961032340965,-0.38914950483786637,-0.38856114422746446,-0.38797452092557944,-0.3873896274084201,-0.38680645619473136,-0.3862249998454995,-0.38564525096365965,-0.3850672021938058,-0.38449084622190327,-0.3839161757750034,-0.38334318362096076,-0.3827718625681521,-0.38220220546519845,-0.3816342052006884,-0.38106785470290494,-0.38050314693955306,-0.3799400749174908,-0.3793786316824615,-0.37881881031882914,-0.37826060394931477,-0.37770400573473595,-0.3771490088737478,-0.37659560660258634,-0.3760437921948137,-0.3754935589610655,-0.37494490024880006,-0.3743978094420501,-0.3738522799611758,-0.37330830526262015,-0.3727658788386662,-0.37222499421719635,-0.37168564496145323,-0.37114782466980284,-0.3706115269754993,-0.3700767455464516,-0.3695434740849921,-0.369011706327647,-0.36848143604490835,-0.36795265704100827,-0.3674253631536943,-0.3668995482540072,-0.36637520624606046,-0.36585233106682036,-0.3653309166858898,-0.36481095710529166,-0.3642924463592556,-0.36377537851400543,-0.3632597476675484,-0.36274554794946673,-0.3622327735207094,-0.3617214185733872,-0.36121147733056824,-0.3607029440460752,-0.36019581300428466,-0.3596900785199273,-0.3591857349378902,-0.3586827766330203,-0.3581811980099295,-0.3576809935028014,-0.3571821575751993,-0.3566846847198756,-0.356188569458583,-0.35569380634188696,-0.3552003899489795,-0.35470831488749444,-0.3542175757933242,-0.3537281673304381,-0.35324008419070135,-0.35275332109369645,-0.35226787278654503,-0.3517837340437316,-0.35130089966692835,-0.35081936448482154,-0.3503391233529387,-0.3498601711534779,-0.34938250279513744,-0.3489061132129476,-0.3484309973681031,-0.34795715024779705,-0.34748456686505624,-0.34701324225857744,-0.3465431714925648,-0.34607434965656925,-0.3456067718653281,-0.3451404332586063,-0.3446753290010391,-0.34421145428197525,-0.3437488043153223,-0.34328737433939177,-0.34282715961674715,-0.3423681554340509,-0.34191035710191486,-0.3414537599547501,-0.34099835935061823,-0.34054415067108457,-0.3400911293210716,-0.33963929072871357,-0.33918863034521257,-0.3387391436446951,-0.33829082612407063,-0.3378436733028899,-0.3373976807232054,-0.33695284394943215,-0.3365091585682099,-0.33606662018826605,-0.33562522444028003,-0.3351849669767478,-0.3347458434718485,-0.3343078496213109,-0.33387098114228164,-0.33343523377319423,-0.3330006032736386,-0.33256708542423236,-0.332134676026492,-0.331703370902706,-0.3312731658958082,-0.33084405686925233,-0.3304160397068874,-0.329989110312834,-0.3295632646113615,-0.32913849854676597,-0.32871480808324927,-0.3282921892047988,-0.3278706379150681,-0.32745015023725843],"x":[-1.0,-1.00398406374502,-1.0079681274900398,-1.0119521912350598,-1.0159362549800797,-1.0199203187250996,-1.0239043824701195,-1.0278884462151394,-1.0318725099601593,-1.0358565737051793,-1.0398406374501992,-1.043824701195219,-1.047808764940239,-1.051792828685259,-1.0557768924302788,-1.0597609561752988,-1.0637450199203187,-1.0677290836653386,-1.0717131474103585,-1.0756972111553784,-1.0796812749003983,-1.0836653386454183,-1.0876494023904382,-1.091633466135458,-1.095617529880478,-1.099601593625498,-1.1035856573705178,-1.1075697211155378,-1.1115537848605577,-1.1155378486055776,-1.1195219123505975,-1.1235059760956174,-1.1274900398406376,-1.1314741035856575,-1.1354581673306774,-1.1394422310756973,-1.1434262948207172,-1.1474103585657371,-1.151394422310757,-1.155378486055777,-1.159362549800797,-1.1633466135458168,-1.1673306772908367,-1.1713147410358566,-1.1752988047808766,-1.1792828685258965,-1.1832669322709164,-1.1872509960159363,-1.1912350597609562,-1.1952191235059761,-1.199203187250996,-1.203187250996016,-1.207171314741036,-1.2111553784860558,-1.2151394422310757,-1.2191235059760956,-1.2231075697211156,-1.2270916334661355,-1.2310756972111554,-1.2350597609561753,-1.2390438247011952,-1.2430278884462151,-1.247011952191235,-1.250996015936255,-1.254980079681275,-1.2589641434262948,-1.2629482071713147,-1.2669322709163346,-1.2709163346613546,-1.2749003984063745,-1.2788844621513944,-1.2828685258964143,-1.2868525896414342,-1.2908366533864541,-1.294820717131474,-1.298804780876494,-1.302788844621514,-1.3067729083665338,-1.3107569721115537,-1.3147410358565736,-1.3187250996015936,-1.3227091633466135,-1.3266932270916334,-1.3306772908366533,-1.3346613545816732,-1.3386454183266931,-1.342629482071713,-1.346613545816733,-1.350597609561753,-1.3545816733067728,-1.3585657370517927,-1.3625498007968126,-1.3665338645418326,-1.3705179282868525,-1.3745019920318724,-1.3784860557768925,-1.3824701195219125,-1.3864541832669324,-1.3904382470119523,-1.3944223107569722,-1.3984063745019921,-1.402390438247012,-1.406374501992032,-1.4103585657370519,-1.4143426294820718,-1.4183266932270917,-1.4223107569721116,-1.4262948207171315,-1.4302788844621515,-1.4342629482071714,-1.4382470119521913,-1.4422310756972112,-1.4462151394422311,-1.450199203187251,-1.454183266932271,-1.4581673306772909,-1.4621513944223108,-1.4661354581673307,-1.4701195219123506,-1.4741035856573705,-1.4780876494023905,-1.4820717131474104,-1.4860557768924303,-1.4900398406374502,-1.4940239043824701,-1.49800796812749,-1.50199203187251,-1.5059760956175299,-1.5099601593625498,-1.5139442231075697,-1.5179282868525896,-1.5219123505976095,-1.5258964143426295,-1.5298804780876494,-1.5338645418326693,-1.5378486055776892,-1.5418326693227091,-1.545816733067729,-1.549800796812749,-1.5537848605577689,-1.5577689243027888,-1.5617529880478087,-1.5657370517928286,-1.5697211155378485,-1.5737051792828685,-1.5776892430278884,-1.5816733067729083,-1.5856573705179282,-1.5896414342629481,-1.593625498007968,-1.597609561752988,-1.6015936254980079,-1.6055776892430278,-1.6095617529880477,-1.6135458167330676,-1.6175298804780875,-1.6215139442231075,-1.6254980079681276,-1.6294820717131475,-1.6334661354581674,-1.6374501992031874,-1.6414342629482073,-1.6454183266932272,-1.649402390438247,-1.653386454183267,-1.657370517928287,-1.6613545816733069,-1.6653386454183268,-1.6693227091633467,-1.6733067729083666,-1.6772908366533865,-1.6812749003984064,-1.6852589641434264,-1.6892430278884463,-1.6932270916334662,-1.697211155378486,-1.701195219123506,-1.705179282868526,-1.7091633466135459,-1.7131474103585658,-1.7171314741035857,-1.7211155378486056,-1.7250996015936255,-1.7290836653386454,-1.7330677290836654,-1.7370517928286853,-1.7410358565737052,-1.745019920318725,-1.749003984063745,-1.752988047808765,-1.7569721115537849,-1.7609561752988048,-1.7649402390438247,-1.7689243027888446,-1.7729083665338645,-1.7768924302788844,-1.7808764940239044,-1.7848605577689243,-1.7888446215139442,-1.792828685258964,-1.796812749003984,-1.800796812749004,-1.8047808764940239,-1.8087649402390438,-1.8127490039840637,-1.8167330677290836,-1.8207171314741035,-1.8247011952191234,-1.8286852589641434,-1.8326693227091633,-1.8366533864541832,-1.840637450199203,-1.844621513944223,-1.848605577689243,-1.8525896414342629,-1.8565737051792828,-1.8605577689243027,-1.8645418326693226,-1.8685258964143425,-1.8725099601593624,-1.8764940239043826,-1.8804780876494025,-1.8844621513944224,-1.8884462151394423,-1.8924302788844622,-1.8964143426294822,-1.900398406374502,-1.904382470119522,-1.908366533864542,-1.9123505976095618,-1.9163346613545817,-1.9203187250996017,-1.9243027888446216,-1.9282868525896415,-1.9322709163346614,-1.9362549800796813,-1.9402390438247012,-1.9442231075697212,-1.948207171314741,-1.952191235059761,-1.956175298804781,-1.9601593625498008,-1.9641434262948207,-1.9681274900398407,-1.9721115537848606,-1.9760956175298805,-1.9800796812749004,-1.9840637450199203,-1.9880478087649402,-1.9920318725099602,-1.99601593625498,-2.0,-2.00398406374502,-2.00796812749004,-2.0119521912350598,-2.0159362549800797,-2.0199203187250996,-2.0239043824701195,-2.0278884462151394,-2.0318725099601593,-2.0358565737051793,-2.039840637450199,-2.043824701195219,-2.047808764940239,-2.051792828685259,-2.055776892430279,-2.0597609561752988,-2.0637450199203187,-2.0677290836653386,-2.0717131474103585,-2.0756972111553784,-2.0796812749003983,-2.0836653386454183,-2.087649402390438,-2.091633466135458,-2.095617529880478,-2.099601593625498,-2.103585657370518,-2.1075697211155378,-2.1115537848605577,-2.1155378486055776,-2.1195219123505975,-2.1235059760956174,-2.1274900398406373,-2.1314741035856573,-2.135458167330677,-2.139442231075697,-2.143426294820717,-2.147410358565737,-2.151394422310757,-2.1553784860557768,-2.1593625498007967,-2.1633466135458166,-2.1673306772908365,-2.1713147410358564,-2.1752988047808763,-2.1792828685258963,-2.183266932270916,-2.187250996015936,-2.191235059760956,-2.195219123505976,-2.199203187250996,-2.2031872509960158,-2.2071713147410357,-2.2111553784860556,-2.2151394422310755,-2.2191235059760954,-2.2231075697211153,-2.2270916334661353,-2.231075697211155,-2.235059760956175,-2.239043824701195,-2.243027888446215,-2.247011952191235,-2.250996015936255,-2.254980079681275,-2.258964143426295,-2.262948207171315,-2.266932270916335,-2.270916334661355,-2.2749003984063747,-2.2788844621513946,-2.2828685258964145,-2.2868525896414345,-2.2908366533864544,-2.2948207171314743,-2.298804780876494,-2.302788844621514,-2.306772908366534,-2.310756972111554,-2.314741035856574,-2.318725099601594,-2.3227091633466137,-2.3266932270916336,-2.3306772908366535,-2.3346613545816735,-2.3386454183266934,-2.3426294820717133,-2.346613545816733,-2.350597609561753,-2.354581673306773,-2.358565737051793,-2.362549800796813,-2.366533864541833,-2.3705179282868527,-2.3745019920318726,-2.3784860557768925,-2.3824701195219125,-2.3864541832669324,-2.3904382470119523,-2.394422310756972,-2.398406374501992,-2.402390438247012,-2.406374501992032,-2.410358565737052,-2.414342629482072,-2.4183266932270917,-2.4223107569721116,-2.4262948207171315,-2.4302788844621515,-2.4342629482071714,-2.4382470119521913,-2.442231075697211,-2.446215139442231,-2.450199203187251,-2.454183266932271,-2.458167330677291,-2.462151394422311,-2.4661354581673307,-2.4701195219123506,-2.4741035856573705,-2.4780876494023905,-2.4820717131474104,-2.4860557768924303,-2.49003984063745,-2.49402390438247,-2.49800796812749,-2.50199203187251,-2.50597609561753,-2.50996015936255,-2.5139442231075697,-2.5179282868525896,-2.5219123505976095,-2.5258964143426295,-2.5298804780876494,-2.5338645418326693,-2.537848605577689,-2.541832669322709,-2.545816733067729,-2.549800796812749,-2.553784860557769,-2.557768924302789,-2.5617529880478087,-2.5657370517928286,-2.5697211155378485,-2.5737051792828685,-2.5776892430278884,-2.5816733067729083,-2.585657370517928,-2.589641434262948,-2.593625498007968,-2.597609561752988,-2.601593625498008,-2.605577689243028,-2.6095617529880477,-2.6135458167330676,-2.6175298804780875,-2.6215139442231075,-2.6254980079681274,-2.6294820717131473,-2.633466135458167,-2.637450199203187,-2.641434262948207,-2.645418326693227,-2.649402390438247,-2.653386454183267,-2.6573705179282867,-2.6613545816733066,-2.6653386454183265,-2.6693227091633465,-2.6733067729083664,-2.6772908366533863,-2.681274900398406,-2.685258964143426,-2.689243027888446,-2.693227091633466,-2.697211155378486,-2.701195219123506,-2.7051792828685257,-2.7091633466135456,-2.7131474103585655,-2.7171314741035855,-2.7211155378486054,-2.7250996015936253,-2.729083665338645,-2.733067729083665,-2.737051792828685,-2.741035856573705,-2.745019920318725,-2.749003984063745,-2.752988047808765,-2.756972111553785,-2.760956175298805,-2.764940239043825,-2.768924302788845,-2.7729083665338647,-2.7768924302788847,-2.7808764940239046,-2.7848605577689245,-2.7888446215139444,-2.7928286852589643,-2.7968127490039842,-2.800796812749004,-2.804780876494024,-2.808764940239044,-2.812749003984064,-2.816733067729084,-2.8207171314741037,-2.8247011952191237,-2.8286852589641436,-2.8326693227091635,-2.8366533864541834,-2.8406374501992033,-2.8446215139442232,-2.848605577689243,-2.852589641434263,-2.856573705179283,-2.860557768924303,-2.864541832669323,-2.8685258964143427,-2.8725099601593627,-2.8764940239043826,-2.8804780876494025,-2.8844621513944224,-2.8884462151394423,-2.8924302788844622,-2.896414342629482,-2.900398406374502,-2.904382470119522,-2.908366533864542,-2.912350597609562,-2.9163346613545817,-2.9203187250996017,-2.9243027888446216,-2.9282868525896415,-2.9322709163346614,-2.9362549800796813,-2.9402390438247012,-2.944223107569721,-2.948207171314741,-2.952191235059761,-2.956175298804781,-2.960159362549801,-2.9641434262948207,-2.9681274900398407,-2.9721115537848606,-2.9760956175298805,-2.9800796812749004,-2.9840637450199203,-2.9880478087649402,-2.99203187250996,-2.99601593625498,-3.0]}

},{}],89:[function(require,module,exports){
module.exports={"expected":[0.881373587019543,0.8785648221811828,0.8757727485921216,0.872997223399564,0.8702381053721214,0.8674952548760734,0.8647685338520688,0.8620578057922589,0.8593629357178508,0.8566837901570737,0.8540202371235461,0.8513721460950371,0.8487393879926115,0.8461218351601517,0.8435193613442457,0.8409318416744351,0.8383591526438152,0.8358011720899767,0.8332577791762857,0.830728854373491,0.8282142794416545,0.8257139374123945,0.8232277125714388,0.8207554904414776,0.818297157765313,0.8158526024892955,0.8134217137470444,0.8110043818434439,0.808600498238911,0.8062099555339275,0.8038326474538329,0.80146846883387,0.7991173156044817,0.7967790847768498,0.7944536744286734,0.7921409836901823,0.7898409127303782,0.7875533627435015,0.7852782359357193,0.7830154355120266,0.7807648656633612,0.7785264315539255,0.7763000393087106,0.7740855960012203,0.7718830096413907,0.7696921891637005,0.7675130444154687,0.7653454861453384,0.7631894259919384,0.761044776472724,0.7589114509729903,0.7567893637350566,0.7546784298476171,0.7525785652352567,0.7504896866481258,0.7484117116517751,0.7463445586171438,0.7442881467106999,0.742242395884731,0.7402072268677793,0.7381825611552224,0.7361683209999937,0.7341644294034417,0.7321708101063261,0.7301873875799457,0.7282140870173991,0.7262508343249728,0.7242975561136566,0.7223541796907823,0.720420633051785,0.7184968448720837,0.7165827444990802,0.7146782619442725,0.7127833278754824,0.7108978736091945,0.7090218311030053,0.7071551329481788,0.7052977123623084,0.7034495031820842,0.7016104398561599,0.6997804574381221,0.6979594915795581,0.696147478523219,0.6943443550962817,0.6925500587037001,0.6907645273216532,0.6889876994910803,0.6872195143113065,0.6854599114337566,0.683708831055755,0.6819662139144081,0.6802320012805743,0.6785061349529113,0.6767885572520083,0.6750792110145938,0.6733780395878244,0.6716849868236489,0.6699999970732475,0.6683230151815468,0.6666539864818065,0.6649928567902786,0.6633395724009379,0.6616940800802807,0.6600563270621939,0.6584262610428896,0.6568038301759084,0.6551889830671853,0.6535816687701826,0.6519818367810841,0.6503894370340527,0.6488044198965491,0.6472267361647105,0.6456563370587898,0.644093174218652,0.6425371996993297,0.6409883659666337,0.6394466258928211,0.6379119327523178,0.6363842402174951,0.6348635023544987,0.6333496736191336,0.6318427088527967,0.630342563278463,0.6288491924967214,0.6273625524818596,0.6258825995779984,0.6244092904952742,0.6229425823060674,0.6214824324412789,0.6200287986866527,0.6185816391791422,0.6171409124033228,0.6157065771878469,0.6142785927019441,0.6128569184519623,0.6114415142779519,0.610032340350291,0.6086293571663518,0.6072325255472073,0.6058418066343769,0.6044571618866126,0.6030785530767222,0.6017059422884318,0.6003392919132852,0.5989785646475797,0.5976237234893401,0.5962747317353265,0.5949315529780789,0.5935941511029963,0.5922624902854505,0.5909365349879331,0.5896162499572373,0.588301600221671,0.5869925510883044,0.585689068140248,0.5843911172339632,0.5830986644966043,0.5818116763233905,0.580530119375009,0.5792539605750476,0.5779831671074576,0.5767177064140449,0.5754575461919903,0.5742026543913986,0.5729529992128755,0.5717085491051309,0.5704692727626122,0.569235139123161,0.5680061173656998,0.5667821769079422,0.5655632874041299,0.5643494187427962,0.5631405410445529,0.5619366246599032,0.5607376401670785,0.5595435583698998,0.5583543502956627,0.5571699871930462,0.5559904405300442,0.5548156819919204,0.5536456834791864,0.5524804171056001,0.5513198551961892,0.550163970285293,0.5490127351146292,0.5478661226313792,0.5467241059862957,0.5455866585318304,0.5444537538202826,0.5433253656019679,0.5422014678234057,0.5410820346255282,0.5399670403419075,0.538856459497002,0.5377502668044223,0.5366484371652145,0.5355509456661643,0.5344577675781161,0.5333688783543128,0.5322842536287523,0.5312038692145611,0.5301277011023863,0.5290557254588031,0.5279879186247411,0.5269242571139265,0.5258647176113392,0.5248092769716893,0.5237579122179066,0.522710600539648,0.5216673192918201,0.5206280459931163,0.5195927583245711,0.5185614341281269,0.5175340514052191,0.5165105883153723,0.515491023174814,0.5144753344551012,0.513463500781761,0.5124555009329473,0.5114513138381083,0.5104509185766699,0.5094542943767325,0.5084614206137804,0.5074722768094041,0.5064868426300376,0.5055050978857065,0.50452702252879,0.5035525966527954,0.5025818004911444,0.5016146144159724,0.5006510189369405,0.4996909947000577,0.4987345224865169,0.4977815832115414,0.4968321579232438,0.49588622780149577,0.4949437741568095,0.49400477842923035,0.49306922218724064,0.49213708712667387,0.49120835506964045,0.4902830079634639,0.48936102787962743,0.488442397012731,0.4875270976794594,0.48661511231755883,0.4857064234848262,0.4848010138581056,0.4838988662322967,0.48299996351937236,0.4821042887474049,0.48121182505960347,0.48032255571335974,0.47943646407930335,0.47855353364036657,0.4776737479908578,0.4767970908355445,0.47592354598874453,0.475053097373427,0.47418572902032097,0.4733214250670334,0.47246016975717536,0.47160194743949707,0.47074674256703003,0.4698945396962395,0.46904532348618255,0.4681990786976768,0.4673557901924748,0.466515442932448,0.4656780219787775,0.46484351249115274,0.4640118997269785,0.463183169040588,0.4623573058824648,0.4615342957984718,0.46071412442908655,0.4598967775086452,0.45908224086459243,0.4582705004167394,0.4574615421765278,0.4566553522463012,0.45585191681858345,0.4550512221753634,0.4542532546873867,0.4534580008134538,0.4526654470997248,0.4518755801790307,0.4510883867701911,0.4503038536773379,0.44952196778924586,0.4487427160786688,0.4479660856016819,0.447192063497031,0.4464206369854866,0.44565179336920463,0.44488552003109283,0.4441218044341831,0.44336063412100923,0.4426019967129909,0.4418458799098227,0.4410922714888692,0.44034115930456513,0.4395925312878215,0.43884637544543653,0.43810267985951257,0.43736143268687755,0.4366226221585126,0.4358862365789836,0.4351522643258793,0.4344206938492533,0.43369151367107184,0.4329647123846659,0.4322402786541888,0.4315182012140784,0.43079846886852385,0.4300810704909378,0.4293659950234328,0.4286532314763019,0.42794276892750527,0.4272345965221598,0.42652870347203464,0.42582507905505007,0.4251237126147816,0.4244245935599676,0.4237277113640225,0.4230330555645532,0.4223406157628802,0.42165038162356266,0.4209623428739282,0.4202764893036064,0.41959281076406607,0.4189112971681575,0.41823193848965756,0.41755472476281996,0.4168796460819281,0.4162066926008534,0.41553585453261566,0.4148671221489491,0.4142004857798705,0.41353593581325204,0.412873462694398,0.412213056925624,0.41155470906584096,0.4108984097301425,0.41024414958939526,0.40959191936983297,0.4089417098526549,0.4082935118736262,0.4076473163226829,0.40700311414353985,0.4063608963333015,0.40572065394207757,0.40508237807259945,0.4044460598798426,0.4038116905706502,0.4031792614033609,0.4025487636874394,0.4019201887831102,0.4012935281009946,0.4006687731017507,0.4000459152957161,0.399424946242554,0.3988058575509024,0.39818864087802575,0.3975732879294696,0.3969597904587188,0.3963481402668575,0.395738329202233,0.3951303491601217,0.39452419208239803,0.3939198499572065,0.3933173148186359,0.3927165787463964,0.39211763386549964,0.3915204723459409,0.39092508640238455,0.3903314682938515,0.38973961032340965,0.38914950483786637,0.38856114422746446,0.38797452092557944,0.3873896274084201,0.38680645619473136,0.3862249998454995,0.38564525096365965,0.3850672021938058,0.38449084622190327,0.3839161757750034,0.38334318362096076,0.3827718625681521,0.38220220546519845,0.3816342052006884,0.38106785470290494,0.38050314693955306,0.3799400749174908,0.3793786316824615,0.37881881031882914,0.37826060394931477,0.37770400573473595,0.3771490088737478,0.37659560660258634,0.3760437921948137,0.3754935589610655,0.37494490024880006,0.3743978094420501,0.3738522799611758,0.37330830526262015,0.3727658788386662,0.37222499421719635,0.37168564496145323,0.37114782466980284,0.3706115269754993,0.3700767455464516,0.3695434740849921,0.369011706327647,0.36848143604490835,0.36795265704100827,0.3674253631536943,0.3668995482540072,0.36637520624606046,0.36585233106682036,0.3653309166858898,0.36481095710529166,0.3642924463592556,0.36377537851400543,0.3632597476675484,0.36274554794946673,0.3622327735207094,0.3617214185733872,0.36121147733056824,0.3607029440460752,0.36019581300428466,0.3596900785199273,0.3591857349378902,0.3586827766330203,0.3581811980099295,0.3576809935028014,0.3571821575751993,0.3566846847198756,0.356188569458583,0.35569380634188696,0.3552003899489795,0.35470831488749444,0.3542175757933242,0.3537281673304381,0.35324008419070135,0.35275332109369645,0.35226787278654503,0.3517837340437316,0.35130089966692835,0.35081936448482154,0.3503391233529387,0.3498601711534779,0.34938250279513744,0.3489061132129476,0.3484309973681031,0.34795715024779705,0.34748456686505624,0.34701324225857744,0.3465431714925648,0.34607434965656925,0.3456067718653281,0.3451404332586063,0.3446753290010391,0.34421145428197525,0.3437488043153223,0.34328737433939177,0.34282715961674715,0.3423681554340509,0.34191035710191486,0.3414537599547501,0.34099835935061823,0.34054415067108457,0.3400911293210716,0.33963929072871357,0.33918863034521257,0.3387391436446951,0.33829082612407063,0.3378436733028899,0.3373976807232054,0.33695284394943215,0.3365091585682099,0.33606662018826605,0.33562522444028003,0.3351849669767478,0.3347458434718485,0.3343078496213109,0.33387098114228164,0.33343523377319423,0.3330006032736386,0.33256708542423236,0.332134676026492,0.331703370902706,0.3312731658958082,0.33084405686925233,0.3304160397068874,0.329989110312834,0.3295632646113615,0.32913849854676597,0.32871480808324927,0.3282921892047988,0.3278706379150681,0.32745015023725843],"x":[1.0,1.00398406374502,1.0079681274900398,1.0119521912350598,1.0159362549800797,1.0199203187250996,1.0239043824701195,1.0278884462151394,1.0318725099601593,1.0358565737051793,1.0398406374501992,1.043824701195219,1.047808764940239,1.051792828685259,1.0557768924302788,1.0597609561752988,1.0637450199203187,1.0677290836653386,1.0717131474103585,1.0756972111553784,1.0796812749003983,1.0836653386454183,1.0876494023904382,1.091633466135458,1.095617529880478,1.099601593625498,1.1035856573705178,1.1075697211155378,1.1115537848605577,1.1155378486055776,1.1195219123505975,1.1235059760956174,1.1274900398406376,1.1314741035856575,1.1354581673306774,1.1394422310756973,1.1434262948207172,1.1474103585657371,1.151394422310757,1.155378486055777,1.159362549800797,1.1633466135458168,1.1673306772908367,1.1713147410358566,1.1752988047808766,1.1792828685258965,1.1832669322709164,1.1872509960159363,1.1912350597609562,1.1952191235059761,1.199203187250996,1.203187250996016,1.207171314741036,1.2111553784860558,1.2151394422310757,1.2191235059760956,1.2231075697211156,1.2270916334661355,1.2310756972111554,1.2350597609561753,1.2390438247011952,1.2430278884462151,1.247011952191235,1.250996015936255,1.254980079681275,1.2589641434262948,1.2629482071713147,1.2669322709163346,1.2709163346613546,1.2749003984063745,1.2788844621513944,1.2828685258964143,1.2868525896414342,1.2908366533864541,1.294820717131474,1.298804780876494,1.302788844621514,1.3067729083665338,1.3107569721115537,1.3147410358565736,1.3187250996015936,1.3227091633466135,1.3266932270916334,1.3306772908366533,1.3346613545816732,1.3386454183266931,1.342629482071713,1.346613545816733,1.350597609561753,1.3545816733067728,1.3585657370517927,1.3625498007968126,1.3665338645418326,1.3705179282868525,1.3745019920318724,1.3784860557768925,1.3824701195219125,1.3864541832669324,1.3904382470119523,1.3944223107569722,1.3984063745019921,1.402390438247012,1.406374501992032,1.4103585657370519,1.4143426294820718,1.4183266932270917,1.4223107569721116,1.4262948207171315,1.4302788844621515,1.4342629482071714,1.4382470119521913,1.4422310756972112,1.4462151394422311,1.450199203187251,1.454183266932271,1.4581673306772909,1.4621513944223108,1.4661354581673307,1.4701195219123506,1.4741035856573705,1.4780876494023905,1.4820717131474104,1.4860557768924303,1.4900398406374502,1.4940239043824701,1.49800796812749,1.50199203187251,1.5059760956175299,1.5099601593625498,1.5139442231075697,1.5179282868525896,1.5219123505976095,1.5258964143426295,1.5298804780876494,1.5338645418326693,1.5378486055776892,1.5418326693227091,1.545816733067729,1.549800796812749,1.5537848605577689,1.5577689243027888,1.5617529880478087,1.5657370517928286,1.5697211155378485,1.5737051792828685,1.5776892430278884,1.5816733067729083,1.5856573705179282,1.5896414342629481,1.593625498007968,1.597609561752988,1.6015936254980079,1.6055776892430278,1.6095617529880477,1.6135458167330676,1.6175298804780875,1.6215139442231075,1.6254980079681276,1.6294820717131475,1.6334661354581674,1.6374501992031874,1.6414342629482073,1.6454183266932272,1.649402390438247,1.653386454183267,1.657370517928287,1.6613545816733069,1.6653386454183268,1.6693227091633467,1.6733067729083666,1.6772908366533865,1.6812749003984064,1.6852589641434264,1.6892430278884463,1.6932270916334662,1.697211155378486,1.701195219123506,1.705179282868526,1.7091633466135459,1.7131474103585658,1.7171314741035857,1.7211155378486056,1.7250996015936255,1.7290836653386454,1.7330677290836654,1.7370517928286853,1.7410358565737052,1.745019920318725,1.749003984063745,1.752988047808765,1.7569721115537849,1.7609561752988048,1.7649402390438247,1.7689243027888446,1.7729083665338645,1.7768924302788844,1.7808764940239044,1.7848605577689243,1.7888446215139442,1.792828685258964,1.796812749003984,1.800796812749004,1.8047808764940239,1.8087649402390438,1.8127490039840637,1.8167330677290836,1.8207171314741035,1.8247011952191234,1.8286852589641434,1.8326693227091633,1.8366533864541832,1.840637450199203,1.844621513944223,1.848605577689243,1.8525896414342629,1.8565737051792828,1.8605577689243027,1.8645418326693226,1.8685258964143425,1.8725099601593624,1.8764940239043826,1.8804780876494025,1.8844621513944224,1.8884462151394423,1.8924302788844622,1.8964143426294822,1.900398406374502,1.904382470119522,1.908366533864542,1.9123505976095618,1.9163346613545817,1.9203187250996017,1.9243027888446216,1.9282868525896415,1.9322709163346614,1.9362549800796813,1.9402390438247012,1.9442231075697212,1.948207171314741,1.952191235059761,1.956175298804781,1.9601593625498008,1.9641434262948207,1.9681274900398407,1.9721115537848606,1.9760956175298805,1.9800796812749004,1.9840637450199203,1.9880478087649402,1.9920318725099602,1.99601593625498,2.0,2.00398406374502,2.00796812749004,2.0119521912350598,2.0159362549800797,2.0199203187250996,2.0239043824701195,2.0278884462151394,2.0318725099601593,2.0358565737051793,2.039840637450199,2.043824701195219,2.047808764940239,2.051792828685259,2.055776892430279,2.0597609561752988,2.0637450199203187,2.0677290836653386,2.0717131474103585,2.0756972111553784,2.0796812749003983,2.0836653386454183,2.087649402390438,2.091633466135458,2.095617529880478,2.099601593625498,2.103585657370518,2.1075697211155378,2.1115537848605577,2.1155378486055776,2.1195219123505975,2.1235059760956174,2.1274900398406373,2.1314741035856573,2.135458167330677,2.139442231075697,2.143426294820717,2.147410358565737,2.151394422310757,2.1553784860557768,2.1593625498007967,2.1633466135458166,2.1673306772908365,2.1713147410358564,2.1752988047808763,2.1792828685258963,2.183266932270916,2.187250996015936,2.191235059760956,2.195219123505976,2.199203187250996,2.2031872509960158,2.2071713147410357,2.2111553784860556,2.2151394422310755,2.2191235059760954,2.2231075697211153,2.2270916334661353,2.231075697211155,2.235059760956175,2.239043824701195,2.243027888446215,2.247011952191235,2.250996015936255,2.254980079681275,2.258964143426295,2.262948207171315,2.266932270916335,2.270916334661355,2.2749003984063747,2.2788844621513946,2.2828685258964145,2.2868525896414345,2.2908366533864544,2.2948207171314743,2.298804780876494,2.302788844621514,2.306772908366534,2.310756972111554,2.314741035856574,2.318725099601594,2.3227091633466137,2.3266932270916336,2.3306772908366535,2.3346613545816735,2.3386454183266934,2.3426294820717133,2.346613545816733,2.350597609561753,2.354581673306773,2.358565737051793,2.362549800796813,2.366533864541833,2.3705179282868527,2.3745019920318726,2.3784860557768925,2.3824701195219125,2.3864541832669324,2.3904382470119523,2.394422310756972,2.398406374501992,2.402390438247012,2.406374501992032,2.410358565737052,2.414342629482072,2.4183266932270917,2.4223107569721116,2.4262948207171315,2.4302788844621515,2.4342629482071714,2.4382470119521913,2.442231075697211,2.446215139442231,2.450199203187251,2.454183266932271,2.458167330677291,2.462151394422311,2.4661354581673307,2.4701195219123506,2.4741035856573705,2.4780876494023905,2.4820717131474104,2.4860557768924303,2.49003984063745,2.49402390438247,2.49800796812749,2.50199203187251,2.50597609561753,2.50996015936255,2.5139442231075697,2.5179282868525896,2.5219123505976095,2.5258964143426295,2.5298804780876494,2.5338645418326693,2.537848605577689,2.541832669322709,2.545816733067729,2.549800796812749,2.553784860557769,2.557768924302789,2.5617529880478087,2.5657370517928286,2.5697211155378485,2.5737051792828685,2.5776892430278884,2.5816733067729083,2.585657370517928,2.589641434262948,2.593625498007968,2.597609561752988,2.601593625498008,2.605577689243028,2.6095617529880477,2.6135458167330676,2.6175298804780875,2.6215139442231075,2.6254980079681274,2.6294820717131473,2.633466135458167,2.637450199203187,2.641434262948207,2.645418326693227,2.649402390438247,2.653386454183267,2.6573705179282867,2.6613545816733066,2.6653386454183265,2.6693227091633465,2.6733067729083664,2.6772908366533863,2.681274900398406,2.685258964143426,2.689243027888446,2.693227091633466,2.697211155378486,2.701195219123506,2.7051792828685257,2.7091633466135456,2.7131474103585655,2.7171314741035855,2.7211155378486054,2.7250996015936253,2.729083665338645,2.733067729083665,2.737051792828685,2.741035856573705,2.745019920318725,2.749003984063745,2.752988047808765,2.756972111553785,2.760956175298805,2.764940239043825,2.768924302788845,2.7729083665338647,2.7768924302788847,2.7808764940239046,2.7848605577689245,2.7888446215139444,2.7928286852589643,2.7968127490039842,2.800796812749004,2.804780876494024,2.808764940239044,2.812749003984064,2.816733067729084,2.8207171314741037,2.8247011952191237,2.8286852589641436,2.8326693227091635,2.8366533864541834,2.8406374501992033,2.8446215139442232,2.848605577689243,2.852589641434263,2.856573705179283,2.860557768924303,2.864541832669323,2.8685258964143427,2.8725099601593627,2.8764940239043826,2.8804780876494025,2.8844621513944224,2.8884462151394423,2.8924302788844622,2.896414342629482,2.900398406374502,2.904382470119522,2.908366533864542,2.912350597609562,2.9163346613545817,2.9203187250996017,2.9243027888446216,2.9282868525896415,2.9322709163346614,2.9362549800796813,2.9402390438247012,2.944223107569721,2.948207171314741,2.952191235059761,2.956175298804781,2.960159362549801,2.9641434262948207,2.9681274900398407,2.9721115537848606,2.9760956175298805,2.9800796812749004,2.9840637450199203,2.9880478087649402,2.99203187250996,2.99601593625498,3.0]}

},{}],90:[function(require,module,exports){
module.exports={"expected":[-1.0475930126492587,-1.0472042683349878,-1.0468157929876352,-1.0464275863331858,-1.0460396480980116,-1.045651978008868,-1.045264575792896,-1.0448774411776196,-1.0444905738909456,-1.0441039736611633,-1.0437176402169426,-1.0433315732873356,-1.0429457726017728,-1.0425602378900651,-1.0421749688824014,-1.041789965309348,-1.04140522690185,-1.0410207533912268,-1.0406365445091748,-1.040252599987765,-1.039868919559443,-1.039485502957028,-1.0391023499137115,-1.0387194601630576,-1.0383368334390022,-1.0379544694758516,-1.0375723680082822,-1.0371905287713403,-1.0368089515004404,-1.036427635931365,-1.0360465818002647,-1.035665788843656,-1.0352852567984214,-1.0349049854018093,-1.0345249743914327,-1.0341452235052673,-1.0337657324816538,-1.0333865010592946,-1.0330075289772538,-1.0326288159749573,-1.0322503617921914,-1.031872166169102,-1.0314942288461946,-1.0311165495643335,-1.0307391280647402,-1.030361964088994,-1.0299850573790306,-1.0296084076771415,-1.029232014725974,-1.0288558782685293,-1.0284799980481631,-1.0281043738085842,-1.0277290052938537,-1.0273538922483856,-1.0269790344169443,-1.0266044315446454,-1.0262300833769549,-1.0258559896596873,-1.0254821501390066,-1.0251085645614246,-1.024735232673801,-1.0243621542233419,-1.0239893289575996,-1.0236167566244727,-1.023244436972204,-1.0228723697493805,-1.022500554704934,-1.0221289915881382,-1.0217576801486092,-1.0213866201363064,-1.0210158113015286,-1.0206452533949162,-1.0202749461674492,-1.019904889370447,-1.0195350827555676,-1.0191655260748074,-1.0187962190805,-1.0184271615253155,-1.0180583531622613,-1.0176897937446796,-1.0173214830262474,-1.0169534207609767,-1.0165856067032133,-1.016218040607636,-1.015850722229256,-1.0154836513234171,-1.0151168276457938,-1.0147502509523918,-1.0143839209995469,-1.0140178375439244,-1.013652000342519,-1.013286409152653,-1.0129210637319774,-1.0125559638384702,-1.0121911092304356,-1.011826499666504,-1.0114621349056319,-1.0110980147070994,-1.0107341388305124,-1.0103705070357993,-1.010007119083212,-1.0096439747333252,-1.0092810737470355,-1.0089184158855604,-1.0085560009104388,-1.0081938285835295,-1.007831898667011,-1.0074702109233808,-1.0071087651154558,-1.0067475610063688,-1.0063865983595723,-1.0060258769388344,-1.0056653965082387,-1.0053051568321867,-1.0049451576753927,-1.004585398802887,-1.0042258799800134,-1.003866600972429,-1.0035075615461044,-1.0031487614673211,-1.0027902005026743,-1.002431878419069,-1.0020737949837208,-1.0017159499641568,-1.001358343128212,-1.0010009742440316,-1.0006438430800684,-1.0002869494050834,-0.9999302929881454,-0.9995738735986293,-0.9992176910062168,-0.9988617449808951,-0.9985060352929567,-0.9981505617129987,-0.9977953240119218,-0.9974403219609316,-0.9970855553315355,-0.9967310238955436,-0.9963767274250684,-0.9960226656925236,-0.995668838470624,-0.9953152455323845,-0.9949618866511196,-0.9946087616004441,-0.9942558701542705,-0.9939032120868104,-0.9935507871725725,-0.9931985951863631,-0.9928466359032853,-0.9924949090987379,-0.9921434145484161,-0.9917921520283096,-0.9914411213147029,-0.9910903221841749,-0.9907397544135975,-0.9903894177801363,-0.9900393120612494,-0.9896894370346866,-0.9893397924784894,-0.9889903781709906,-0.9886411938908132,-0.9882922394168704,-0.987943514528365,-0.9875950190047889,-0.9872467526259219,-0.9868987151718327,-0.9865509064228768,-0.9862033261596973,-0.9858559741632233,-0.9855088502146703,-0.9851619540955391,-0.9848152855876158,-0.9844688444729707,-0.9841226305339584,-0.9837766435532168,-0.9834308833136675,-0.9830853495985136,-0.9827400421912414,-0.982394960875618,-0.9820501054356919,-0.9817054756557927,-0.981361071320529,-0.9810168922147902,-0.9806729381237442,-0.980329208832838,-0.9799857041277965,-0.9796424237946224,-0.9792993676195962,-0.9789565353892744,-0.97861392689049,-0.9782715419103523,-0.9779293802362451,-0.9775874416558282,-0.9772457259570353,-0.9769042329280734,-0.976562962357424,-0.9762219140338412,-0.9758810877463514,-0.9755404832842535,-0.9752001004371177,-0.9748599389947856,-0.9745199987473692,-0.9741802794852509,-0.973840780999083,-0.9735015030797869,-0.9731624455185525,-0.972823608106839,-0.9724849906363727,-0.9721465928991478,-0.9718084146874253,-0.9714704557937328,-0.9711327160108643,-0.970795195131879,-0.9704578929501015,-0.9701208092591214,-0.969783943852792,-0.9694472965252313,-0.9691108670708202,-0.9687746552842021,-0.9684386609602842,-0.9681028838942345,-0.9677673238814831,-0.9674319807177219,-0.9670968541989027,-0.9667619441212378,-0.9664272502811997,-0.9660927724755198,-0.9657585105011893,-0.965424464155457,-0.9650906332358307,-0.964757017540075,-0.9644236168662127,-0.964090431012523,-0.9637574597775407,-0.9634247029600583,-0.9630921603591222,-0.9627598317740348,-0.9624277170043529,-0.9620958158498873,-0.9617641281107034,-0.9614326535871189,-0.9611013920797055,-0.9607703433892867,-0.9604395073169384,-0.9601088836639885,-0.9597784722320156,-0.9594482728228496,-0.9591182852385708,-0.9587885092815093,-0.9584589447542449,-0.9581295914596066,-0.9578004492006723,-0.957471517780768,-0.9571427970034679,-0.9568142866725937,-0.9564859865922144,-0.9561578965666448,-0.9558300164004475,-0.9555023458984294,-0.9551748848656442,-0.9548476331073898,-0.9545205904292094,-0.95419375663689,-0.9538671315364626,-0.9535407149342019,-0.9532145066366253,-0.952888506450493,-0.9525627141828074,-0.9522371296408128,-0.951911752631995,-0.9515865829640807,-0.9512616204450374,-0.950936864883073,-0.9506123160866348,-0.95028797386441,-0.9499638380253246,-0.9496399083785434,-0.9493161847334695,-0.9489926668997435,-0.9486693546872444,-0.9483462479060876,-0.9480233463666251,-0.9477006498794458,-0.947378158255374,-0.9470558713054703,-0.9467337888410293,-0.9464119106735815,-0.9460902366148913,-0.9457687664769571,-0.9454475000720111,-0.9451264372125184,-0.9448055777111778,-0.9444849213809196,-0.9441644680349064,-0.943844217486533,-0.9435241695494256,-0.9432043240374407,-0.9428846807646659,-0.9425652395454188,-0.9422460001942472,-0.9419269625259277,-0.9416081263554669,-0.9412894914980993,-0.9409710577692881,-0.9406528249847247,-0.9403347929603276,-0.9400169615122429,-0.9396993304568437,-0.9393818996107294,-0.9390646687907254,-0.9387476378138826,-0.9384308064974785,-0.9381141746590144,-0.9377977421162169,-0.9374815086870366,-0.9371654741896484,-0.9368496384424503,-0.9365340012640642,-0.936218562473334,-0.9359033218893271,-0.935588279331332,-0.9352734346188601,-0.9349587875716433,-0.9346443380096346,-0.9343300857530089,-0.9340160306221599,-0.9337021724377024,-0.9333885110204703,-0.9330750461915167,-0.9327617777721146,-0.9324487055837543,-0.9321358294481452,-0.9318231491872144,-0.9315106646231066,-0.9311983755781834,-0.9308862818750236,-0.9305743833364224,-0.930262679785391,-0.9299511710451563,-0.9296398569391616,-0.9293287372910639,-0.929017811924736,-0.928707080664265,-0.9283965433339515,-0.9280861997583105,-0.9277760497620702,-0.9274660931701718,-0.9271563298077694,-0.9268467595002291,-0.9265373820731296,-0.9262281973522608,-0.9259192051636245,-0.9256104053334328,-0.9253017976881094,-0.9249933820542878,-0.9246851582588115,-0.9243771261287339,-0.924069285491318,-0.9237616361740354,-0.9234541780045665,-0.9231469108108002,-0.9228398344208336,-0.9225329486629711,-0.922226253365725,-0.9219197483578141,-0.9216134334681643,-0.9213073085259078,-0.9210013733603829,-0.920695627801134,-0.92039007167791,-0.920084704820666,-0.919779527059561,-0.9194745382249591,-0.9191697381474281,-0.91886512665774,-0.9185607035868698,-0.9182564687659964,-0.9179524220265008,-0.917648563199967,-0.9173448921181809,-0.9170414086131308,-0.9167381125170061,-0.9164350036621974,-0.9161320818812971,-0.9158293470070973,-0.9155267988725905,-0.9152244373109699,-0.9149222621556277,-0.9146202732401559,-0.9143184703983454,-0.9140168534641858,-0.9137154222718653,-0.9134141766557703,-0.9131131164504848,-0.9128122414907904,-0.912511551611666,-0.9122110466482874,-0.9119107264360269,-0.9116105908104533,-0.9113106396073312,-0.9110108726626207,-0.9107112898124777,-0.9104118908932529,-0.9101126757414922,-0.9098136441939351,-0.9095147960875161,-0.9092161312593633,-0.908917649546798,-0.9086193507873355,-0.9083212348186835,-0.9080233014787423,-0.9077255506056051,-0.9074279820375569,-0.9071305956130741,-0.9068333911708252,-0.9065363685496695,-0.9062395275886571,-0.9059428681270292,-0.9056463900042167,-0.9053500930598408,-0.9050539771337126,-0.9047580420658322,-0.904462287696389,-0.9041667138657611,-0.9038713204145156,-0.9035761071834073,-0.9032810740133793,-0.9029862207455622,-0.9026915472212742,-0.9023970532820201,-0.9021027387694923,-0.9018086035255691,-0.9015146473923151,-0.9012208702119812,-0.9009272718270034,-0.9006338520800037,-0.9003406108137888,-0.9000475478713502,-0.8997546630958643,-0.8994619563306911,-0.8991694274193753,-0.898877076205645,-0.8985849025334114,-0.898292906246769,-0.8980010871899954,-0.8977094452075505,-0.8974179801440767,-0.897126691844398,-0.8968355801535206,-0.8965446449166316,-0.8962538859791002,-0.8959633031864754,-0.8956728963844875,-0.8953826654190472,-0.8950926101362449,-0.894802730382351,-0.8945130260038152,-0.894223496847267,-0.8939341427595145,-0.8936449635875442,-0.893355959178522,-0.8930671293797907,-0.8927784740388721,-0.8924899930034652,-0.8922016861214461,-0.8919135532408686,-0.8916255942099627,-0.8913378088771354,-0.8910501970909699,-0.890762758700225,-0.890475493553836,-0.8901884015009133,-0.8899014823907423,-0.8896147360727839,-0.8893281623966732,-0.88904176121222,-0.8887555323694083,-0.8884694757183959,-0.8881835911095142,-0.8878978783932681,-0.8876123374203357,-0.887326968041568,-0.8870417701079882,-0.8867567434707923,-0.886471887981348,-0.8861872034911955,-0.8859026898520457,-0.8856183469157816,-0.8853341745344567,-0.8850501725602954,-0.8847663408456932,-0.8844826792432148,-0.8841991876055962,-0.8839158657857425,-0.883632713636728,-0.8833497310117971,-0.8830669177643627,-0.8827842737480064,-0.8825017988164786,-0.8822194928236978,-0.881937355623751,-0.8816553870708921,-0.881373587019543],"x":[-0.8,-0.800398406374502,-0.8007968127490039,-0.801195219123506,-0.801593625498008,-0.80199203187251,-0.802390438247012,-0.8027888446215139,-0.803187250996016,-0.8035856573705179,-0.80398406374502,-0.8043824701195219,-0.8047808764940239,-0.8051792828685259,-0.8055776892430279,-0.8059760956175299,-0.8063745019920319,-0.8067729083665338,-0.8071713147410359,-0.8075697211155378,-0.8079681274900399,-0.8083665338645418,-0.8087649402390438,-0.8091633466135458,-0.8095617529880478,-0.8099601593625498,-0.8103585657370518,-0.8107569721115537,-0.8111553784860558,-0.8115537848605577,-0.8119521912350598,-0.8123505976095617,-0.8127490039840638,-0.8131474103585657,-0.8135458167330677,-0.8139442231075698,-0.8143426294820717,-0.8147410358565738,-0.8151394422310757,-0.8155378486055777,-0.8159362549800797,-0.8163346613545817,-0.8167330677290837,-0.8171314741035857,-0.8175298804780876,-0.8179282868525897,-0.8183266932270916,-0.8187250996015937,-0.8191235059760956,-0.8195219123505976,-0.8199203187250996,-0.8203187250996016,-0.8207171314741036,-0.8211155378486056,-0.8215139442231075,-0.8219123505976096,-0.8223107569721115,-0.8227091633466136,-0.8231075697211155,-0.8235059760956175,-0.8239043824701195,-0.8243027888446215,-0.8247011952191236,-0.8250996015936255,-0.8254980079681274,-0.8258964143426295,-0.8262948207171315,-0.8266932270916335,-0.8270916334661355,-0.8274900398406374,-0.8278884462151395,-0.8282868525896414,-0.8286852589641435,-0.8290836653386454,-0.8294820717131474,-0.8298804780876494,-0.8302788844621514,-0.8306772908366534,-0.8310756972111554,-0.8314741035856573,-0.8318725099601594,-0.8322709163346613,-0.8326693227091634,-0.8330677290836653,-0.8334661354581673,-0.8338645418326693,-0.8342629482071713,-0.8346613545816733,-0.8350597609561753,-0.8354581673306772,-0.8358565737051793,-0.8362549800796812,-0.8366533864541833,-0.8370517928286852,-0.8374501992031872,-0.8378486055776893,-0.8382470119521912,-0.8386454183266933,-0.8390438247011952,-0.8394422310756973,-0.8398406374501992,-0.8402390438247012,-0.8406374501992032,-0.8410358565737052,-0.8414342629482072,-0.8418326693227092,-0.8422310756972111,-0.8426294820717132,-0.8430278884462151,-0.8434262948207172,-0.8438247011952191,-0.8442231075697211,-0.8446215139442231,-0.8450199203187251,-0.8454183266932271,-0.8458167330677291,-0.846215139442231,-0.8466135458167331,-0.847011952191235,-0.8474103585657371,-0.847808764940239,-0.848207171314741,-0.848605577689243,-0.849003984063745,-0.8494023904382471,-0.849800796812749,-0.850199203187251,-0.850597609561753,-0.850996015936255,-0.851394422310757,-0.851792828685259,-0.8521912350597609,-0.852589641434263,-0.8529880478087649,-0.853386454183267,-0.8537848605577689,-0.8541832669322709,-0.8545816733067729,-0.8549800796812749,-0.8553784860557769,-0.8557768924302789,-0.8561752988047808,-0.8565737051792829,-0.8569721115537848,-0.8573705179282869,-0.8577689243027888,-0.8581673306772908,-0.8585657370517928,-0.8589641434262948,-0.8593625498007968,-0.8597609561752988,-0.8601593625498007,-0.8605577689243028,-0.8609561752988047,-0.8613545816733068,-0.8617529880478088,-0.8621513944223107,-0.8625498007968128,-0.8629482071713147,-0.8633466135458168,-0.8637450199203187,-0.8641434262948208,-0.8645418326693227,-0.8649402390438247,-0.8653386454183267,-0.8657370517928287,-0.8661354581673307,-0.8665338645418327,-0.8669322709163346,-0.8673306772908367,-0.8677290836653386,-0.8681274900398407,-0.8685258964143426,-0.8689243027888446,-0.8693227091633466,-0.8697211155378486,-0.8701195219123506,-0.8705179282868526,-0.8709163346613545,-0.8713147410358566,-0.8717131474103585,-0.8721115537848606,-0.8725099601593626,-0.8729083665338645,-0.8733067729083666,-0.8737051792828685,-0.8741035856573706,-0.8745019920318725,-0.8749003984063745,-0.8752988047808765,-0.8756972111553785,-0.8760956175298805,-0.8764940239043825,-0.8768924302788844,-0.8772908366533865,-0.8776892430278884,-0.8780876494023905,-0.8784860557768924,-0.8788844621513944,-0.8792828685258964,-0.8796812749003984,-0.8800796812749004,-0.8804780876494024,-0.8808764940239043,-0.8812749003984064,-0.8816733067729083,-0.8820717131474104,-0.8824701195219123,-0.8828685258964143,-0.8832669322709163,-0.8836653386454183,-0.8840637450199204,-0.8844621513944223,-0.8848605577689242,-0.8852589641434263,-0.8856573705179283,-0.8860557768924303,-0.8864541832669323,-0.8868525896414342,-0.8872509960159363,-0.8876494023904382,-0.8880478087649403,-0.8884462151394422,-0.8888446215139443,-0.8892430278884462,-0.8896414342629482,-0.8900398406374502,-0.8904382470119522,-0.8908366533864542,-0.8912350597609562,-0.8916334661354581,-0.8920318725099602,-0.8924302788844621,-0.8928286852589642,-0.8932270916334661,-0.8936254980079681,-0.8940239043824701,-0.8944223107569721,-0.8948207171314742,-0.8952191235059761,-0.895617529880478,-0.8960159362549801,-0.896414342629482,-0.8968127490039841,-0.8972111553784861,-0.897609561752988,-0.8980079681274901,-0.898406374501992,-0.8988047808764941,-0.899203187250996,-0.899601593625498,-0.9,-0.900398406374502,-0.900796812749004,-0.901195219123506,-0.9015936254980079,-0.90199203187251,-0.9023904382470119,-0.902788844621514,-0.9031872509960159,-0.9035856573705179,-0.9039840637450199,-0.9043824701195219,-0.904780876494024,-0.9051792828685259,-0.9055776892430278,-0.9059760956175299,-0.9063745019920318,-0.9067729083665339,-0.9071713147410359,-0.9075697211155378,-0.9079681274900399,-0.9083665338645418,-0.9087649402390439,-0.9091633466135458,-0.9095617529880478,-0.9099601593625498,-0.9103585657370518,-0.9107569721115538,-0.9111553784860558,-0.9115537848605577,-0.9119521912350598,-0.9123505976095617,-0.9127490039840638,-0.9131474103585657,-0.9135458167330678,-0.9139442231075697,-0.9143426294820717,-0.9147410358565737,-0.9151394422310757,-0.9155378486055777,-0.9159362549800797,-0.9163346613545816,-0.9167330677290837,-0.9171314741035856,-0.9175298804780877,-0.9179282868525896,-0.9183266932270916,-0.9187250996015937,-0.9191235059760956,-0.9195219123505977,-0.9199203187250996,-0.9203187250996016,-0.9207171314741036,-0.9211155378486056,-0.9215139442231076,-0.9219123505976096,-0.9223107569721115,-0.9227091633466136,-0.9231075697211155,-0.9235059760956176,-0.9239043824701195,-0.9243027888446215,-0.9247011952191235,-0.9250996015936255,-0.9254980079681275,-0.9258964143426295,-0.9262948207171314,-0.9266932270916335,-0.9270916334661354,-0.9274900398406375,-0.9278884462151394,-0.9282868525896414,-0.9286852589641434,-0.9290836653386454,-0.9294820717131475,-0.9298804780876494,-0.9302788844621513,-0.9306772908366534,-0.9310756972111554,-0.9314741035856574,-0.9318725099601594,-0.9322709163346613,-0.9326693227091634,-0.9330677290836653,-0.9334661354581674,-0.9338645418326693,-0.9342629482071713,-0.9346613545816733,-0.9350597609561753,-0.9354581673306773,-0.9358565737051793,-0.9362549800796812,-0.9366533864541833,-0.9370517928286852,-0.9374501992031873,-0.9378486055776892,-0.9382470119521913,-0.9386454183266932,-0.9390438247011952,-0.9394422310756972,-0.9398406374501992,-0.9402390438247012,-0.9406374501992032,-0.9410358565737051,-0.9414342629482072,-0.9418326693227091,-0.9422310756972112,-0.9426294820717132,-0.9430278884462151,-0.9434262948207172,-0.9438247011952191,-0.9442231075697212,-0.9446215139442231,-0.9450199203187251,-0.9454183266932271,-0.9458167330677291,-0.9462151394422311,-0.9466135458167331,-0.947011952191235,-0.9474103585657371,-0.947808764940239,-0.9482071713147411,-0.948605577689243,-0.949003984063745,-0.949402390438247,-0.949800796812749,-0.950199203187251,-0.950597609561753,-0.9509960159362549,-0.951394422310757,-0.9517928286852589,-0.952191235059761,-0.952589641434263,-0.9529880478087649,-0.953386454183267,-0.9537848605577689,-0.954183266932271,-0.9545816733067729,-0.9549800796812749,-0.9553784860557769,-0.9557768924302789,-0.9561752988047809,-0.9565737051792829,-0.9569721115537848,-0.9573705179282869,-0.9577689243027888,-0.9581673306772909,-0.9585657370517928,-0.9589641434262948,-0.9593625498007968,-0.9597609561752988,-0.9601593625498008,-0.9605577689243028,-0.9609561752988047,-0.9613545816733068,-0.9617529880478087,-0.9621513944223108,-0.9625498007968127,-0.9629482071713148,-0.9633466135458167,-0.9637450199203187,-0.9641434262948207,-0.9645418326693227,-0.9649402390438248,-0.9653386454183267,-0.9657370517928286,-0.9661354581673307,-0.9665338645418327,-0.9669322709163347,-0.9673306772908367,-0.9677290836653386,-0.9681274900398407,-0.9685258964143426,-0.9689243027888447,-0.9693227091633466,-0.9697211155378486,-0.9701195219123506,-0.9705179282868526,-0.9709163346613546,-0.9713147410358566,-0.9717131474103585,-0.9721115537848606,-0.9725099601593625,-0.9729083665338646,-0.9733067729083665,-0.9737051792828685,-0.9741035856573705,-0.9745019920318725,-0.9749003984063745,-0.9752988047808765,-0.9756972111553784,-0.9760956175298805,-0.9764940239043824,-0.9768924302788845,-0.9772908366533865,-0.9776892430278884,-0.9780876494023905,-0.9784860557768924,-0.9788844621513945,-0.9792828685258964,-0.9796812749003984,-0.9800796812749004,-0.9804780876494024,-0.9808764940239044,-0.9812749003984064,-0.9816733067729083,-0.9820717131474104,-0.9824701195219123,-0.9828685258964144,-0.9832669322709163,-0.9836653386454183,-0.9840637450199203,-0.9844621513944223,-0.9848605577689243,-0.9852589641434263,-0.9856573705179282,-0.9860557768924303,-0.9864541832669322,-0.9868525896414343,-0.9872509960159362,-0.9876494023904383,-0.9880478087649402,-0.9884462151394422,-0.9888446215139443,-0.9892430278884462,-0.9896414342629483,-0.9900398406374502,-0.9904382470119522,-0.9908366533864542,-0.9912350597609562,-0.9916334661354582,-0.9920318725099602,-0.9924302788844621,-0.9928286852589642,-0.9932270916334661,-0.9936254980079682,-0.9940239043824701,-0.9944223107569721,-0.9948207171314741,-0.9952191235059761,-0.9956175298804781,-0.9960159362549801,-0.996414342629482,-0.9968127490039841,-0.997211155378486,-0.9976095617529881,-0.99800796812749,-0.998406374501992,-0.998804780876494,-0.999203187250996,-0.999601593625498,-1.0]}

},{}],91:[function(require,module,exports){
module.exports={"expected":[1.0475930126492587,1.0472042683349878,1.0468157929876352,1.0464275863331858,1.0460396480980116,1.045651978008868,1.045264575792896,1.0448774411776196,1.0444905738909456,1.0441039736611633,1.0437176402169426,1.0433315732873356,1.0429457726017728,1.0425602378900651,1.0421749688824014,1.041789965309348,1.04140522690185,1.0410207533912268,1.0406365445091748,1.040252599987765,1.039868919559443,1.039485502957028,1.0391023499137115,1.0387194601630576,1.0383368334390022,1.0379544694758516,1.0375723680082822,1.0371905287713403,1.0368089515004404,1.036427635931365,1.0360465818002647,1.035665788843656,1.0352852567984214,1.0349049854018093,1.0345249743914327,1.0341452235052673,1.0337657324816538,1.0333865010592946,1.0330075289772538,1.0326288159749573,1.0322503617921914,1.031872166169102,1.0314942288461946,1.0311165495643335,1.0307391280647402,1.030361964088994,1.0299850573790306,1.0296084076771415,1.029232014725974,1.0288558782685293,1.0284799980481631,1.0281043738085842,1.0277290052938537,1.0273538922483856,1.0269790344169443,1.0266044315446454,1.0262300833769549,1.0258559896596873,1.0254821501390066,1.0251085645614246,1.024735232673801,1.0243621542233419,1.0239893289575996,1.0236167566244727,1.023244436972204,1.0228723697493805,1.022500554704934,1.0221289915881382,1.0217576801486092,1.0213866201363064,1.0210158113015286,1.0206452533949162,1.0202749461674492,1.019904889370447,1.0195350827555676,1.0191655260748074,1.0187962190805,1.0184271615253155,1.0180583531622613,1.0176897937446796,1.0173214830262474,1.0169534207609767,1.0165856067032133,1.016218040607636,1.015850722229256,1.0154836513234171,1.0151168276457938,1.0147502509523918,1.0143839209995469,1.0140178375439244,1.013652000342519,1.013286409152653,1.0129210637319774,1.0125559638384702,1.0121911092304356,1.011826499666504,1.0114621349056319,1.0110980147070994,1.0107341388305124,1.0103705070357993,1.010007119083212,1.0096439747333252,1.0092810737470355,1.0089184158855604,1.0085560009104388,1.0081938285835295,1.007831898667011,1.0074702109233808,1.0071087651154558,1.0067475610063688,1.0063865983595723,1.0060258769388344,1.0056653965082387,1.0053051568321867,1.0049451576753927,1.004585398802887,1.0042258799800134,1.003866600972429,1.0035075615461044,1.0031487614673211,1.0027902005026743,1.002431878419069,1.0020737949837208,1.0017159499641568,1.001358343128212,1.0010009742440316,1.0006438430800684,1.0002869494050834,0.9999302929881454,0.9995738735986293,0.9992176910062168,0.9988617449808951,0.9985060352929567,0.9981505617129987,0.9977953240119218,0.9974403219609316,0.9970855553315355,0.9967310238955436,0.9963767274250684,0.9960226656925236,0.995668838470624,0.9953152455323845,0.9949618866511196,0.9946087616004441,0.9942558701542705,0.9939032120868104,0.9935507871725725,0.9931985951863631,0.9928466359032853,0.9924949090987379,0.9921434145484161,0.9917921520283096,0.9914411213147029,0.9910903221841749,0.9907397544135975,0.9903894177801363,0.9900393120612494,0.9896894370346866,0.9893397924784894,0.9889903781709906,0.9886411938908132,0.9882922394168704,0.987943514528365,0.9875950190047889,0.9872467526259219,0.9868987151718327,0.9865509064228768,0.9862033261596973,0.9858559741632233,0.9855088502146703,0.9851619540955391,0.9848152855876158,0.9844688444729707,0.9841226305339584,0.9837766435532168,0.9834308833136675,0.9830853495985136,0.9827400421912414,0.982394960875618,0.9820501054356919,0.9817054756557927,0.981361071320529,0.9810168922147902,0.9806729381237442,0.980329208832838,0.9799857041277965,0.9796424237946224,0.9792993676195962,0.9789565353892744,0.97861392689049,0.9782715419103523,0.9779293802362451,0.9775874416558282,0.9772457259570353,0.9769042329280734,0.976562962357424,0.9762219140338412,0.9758810877463514,0.9755404832842535,0.9752001004371177,0.9748599389947856,0.9745199987473692,0.9741802794852509,0.973840780999083,0.9735015030797869,0.9731624455185525,0.972823608106839,0.9724849906363727,0.9721465928991478,0.9718084146874253,0.9714704557937328,0.9711327160108643,0.970795195131879,0.9704578929501015,0.9701208092591214,0.969783943852792,0.9694472965252313,0.9691108670708202,0.9687746552842021,0.9684386609602842,0.9681028838942345,0.9677673238814831,0.9674319807177219,0.9670968541989027,0.9667619441212378,0.9664272502811997,0.9660927724755198,0.9657585105011893,0.965424464155457,0.9650906332358307,0.964757017540075,0.9644236168662127,0.964090431012523,0.9637574597775407,0.9634247029600583,0.9630921603591222,0.9627598317740348,0.9624277170043529,0.9620958158498873,0.9617641281107034,0.9614326535871189,0.9611013920797055,0.9607703433892867,0.9604395073169384,0.9601088836639885,0.9597784722320156,0.9594482728228496,0.9591182852385708,0.9587885092815093,0.9584589447542449,0.9581295914596066,0.9578004492006723,0.957471517780768,0.9571427970034679,0.9568142866725937,0.9564859865922144,0.9561578965666448,0.9558300164004475,0.9555023458984294,0.9551748848656442,0.9548476331073898,0.9545205904292094,0.95419375663689,0.9538671315364626,0.9535407149342019,0.9532145066366253,0.952888506450493,0.9525627141828074,0.9522371296408128,0.951911752631995,0.9515865829640807,0.9512616204450374,0.950936864883073,0.9506123160866348,0.95028797386441,0.9499638380253246,0.9496399083785434,0.9493161847334695,0.9489926668997435,0.9486693546872444,0.9483462479060876,0.9480233463666251,0.9477006498794458,0.947378158255374,0.9470558713054703,0.9467337888410293,0.9464119106735815,0.9460902366148913,0.9457687664769571,0.9454475000720111,0.9451264372125184,0.9448055777111778,0.9444849213809196,0.9441644680349064,0.943844217486533,0.9435241695494256,0.9432043240374407,0.9428846807646659,0.9425652395454188,0.9422460001942472,0.9419269625259277,0.9416081263554669,0.9412894914980993,0.9409710577692881,0.9406528249847247,0.9403347929603276,0.9400169615122429,0.9396993304568437,0.9393818996107294,0.9390646687907254,0.9387476378138826,0.9384308064974785,0.9381141746590144,0.9377977421162169,0.9374815086870366,0.9371654741896484,0.9368496384424503,0.9365340012640642,0.936218562473334,0.9359033218893271,0.935588279331332,0.9352734346188601,0.9349587875716433,0.9346443380096346,0.9343300857530089,0.9340160306221599,0.9337021724377024,0.9333885110204703,0.9330750461915167,0.9327617777721146,0.9324487055837543,0.9321358294481452,0.9318231491872144,0.9315106646231066,0.9311983755781834,0.9308862818750236,0.9305743833364224,0.930262679785391,0.9299511710451563,0.9296398569391616,0.9293287372910639,0.929017811924736,0.928707080664265,0.9283965433339515,0.9280861997583105,0.9277760497620702,0.9274660931701718,0.9271563298077694,0.9268467595002291,0.9265373820731296,0.9262281973522608,0.9259192051636245,0.9256104053334328,0.9253017976881094,0.9249933820542878,0.9246851582588115,0.9243771261287339,0.924069285491318,0.9237616361740354,0.9234541780045665,0.9231469108108002,0.9228398344208336,0.9225329486629711,0.922226253365725,0.9219197483578141,0.9216134334681643,0.9213073085259078,0.9210013733603829,0.920695627801134,0.92039007167791,0.920084704820666,0.919779527059561,0.9194745382249591,0.9191697381474281,0.91886512665774,0.9185607035868698,0.9182564687659964,0.9179524220265008,0.917648563199967,0.9173448921181809,0.9170414086131308,0.9167381125170061,0.9164350036621974,0.9161320818812971,0.9158293470070973,0.9155267988725905,0.9152244373109699,0.9149222621556277,0.9146202732401559,0.9143184703983454,0.9140168534641858,0.9137154222718653,0.9134141766557703,0.9131131164504848,0.9128122414907904,0.912511551611666,0.9122110466482874,0.9119107264360269,0.9116105908104533,0.9113106396073312,0.9110108726626207,0.9107112898124777,0.9104118908932529,0.9101126757414922,0.9098136441939351,0.9095147960875161,0.9092161312593633,0.908917649546798,0.9086193507873355,0.9083212348186835,0.9080233014787423,0.9077255506056051,0.9074279820375569,0.9071305956130741,0.9068333911708252,0.9065363685496695,0.9062395275886571,0.9059428681270292,0.9056463900042167,0.9053500930598408,0.9050539771337126,0.9047580420658322,0.904462287696389,0.9041667138657611,0.9038713204145156,0.9035761071834073,0.9032810740133793,0.9029862207455622,0.9026915472212742,0.9023970532820201,0.9021027387694923,0.9018086035255691,0.9015146473923151,0.9012208702119812,0.9009272718270034,0.9006338520800037,0.9003406108137888,0.9000475478713502,0.8997546630958643,0.8994619563306911,0.8991694274193753,0.898877076205645,0.8985849025334114,0.898292906246769,0.8980010871899954,0.8977094452075505,0.8974179801440767,0.897126691844398,0.8968355801535206,0.8965446449166316,0.8962538859791002,0.8959633031864754,0.8956728963844875,0.8953826654190472,0.8950926101362449,0.894802730382351,0.8945130260038152,0.894223496847267,0.8939341427595145,0.8936449635875442,0.893355959178522,0.8930671293797907,0.8927784740388721,0.8924899930034652,0.8922016861214461,0.8919135532408686,0.8916255942099627,0.8913378088771354,0.8910501970909699,0.890762758700225,0.890475493553836,0.8901884015009133,0.8899014823907423,0.8896147360727839,0.8893281623966732,0.88904176121222,0.8887555323694083,0.8884694757183959,0.8881835911095142,0.8878978783932681,0.8876123374203357,0.887326968041568,0.8870417701079882,0.8867567434707923,0.886471887981348,0.8861872034911955,0.8859026898520457,0.8856183469157816,0.8853341745344567,0.8850501725602954,0.8847663408456932,0.8844826792432148,0.8841991876055962,0.8839158657857425,0.883632713636728,0.8833497310117971,0.8830669177643627,0.8827842737480064,0.8825017988164786,0.8822194928236978,0.881937355623751,0.8816553870708921,0.881373587019543],"x":[0.8,0.800398406374502,0.8007968127490039,0.801195219123506,0.801593625498008,0.80199203187251,0.802390438247012,0.8027888446215139,0.803187250996016,0.8035856573705179,0.80398406374502,0.8043824701195219,0.8047808764940239,0.8051792828685259,0.8055776892430279,0.8059760956175299,0.8063745019920319,0.8067729083665338,0.8071713147410359,0.8075697211155378,0.8079681274900399,0.8083665338645418,0.8087649402390438,0.8091633466135458,0.8095617529880478,0.8099601593625498,0.8103585657370518,0.8107569721115537,0.8111553784860558,0.8115537848605577,0.8119521912350598,0.8123505976095617,0.8127490039840638,0.8131474103585657,0.8135458167330677,0.8139442231075698,0.8143426294820717,0.8147410358565738,0.8151394422310757,0.8155378486055777,0.8159362549800797,0.8163346613545817,0.8167330677290837,0.8171314741035857,0.8175298804780876,0.8179282868525897,0.8183266932270916,0.8187250996015937,0.8191235059760956,0.8195219123505976,0.8199203187250996,0.8203187250996016,0.8207171314741036,0.8211155378486056,0.8215139442231075,0.8219123505976096,0.8223107569721115,0.8227091633466136,0.8231075697211155,0.8235059760956175,0.8239043824701195,0.8243027888446215,0.8247011952191236,0.8250996015936255,0.8254980079681274,0.8258964143426295,0.8262948207171315,0.8266932270916335,0.8270916334661355,0.8274900398406374,0.8278884462151395,0.8282868525896414,0.8286852589641435,0.8290836653386454,0.8294820717131474,0.8298804780876494,0.8302788844621514,0.8306772908366534,0.8310756972111554,0.8314741035856573,0.8318725099601594,0.8322709163346613,0.8326693227091634,0.8330677290836653,0.8334661354581673,0.8338645418326693,0.8342629482071713,0.8346613545816733,0.8350597609561753,0.8354581673306772,0.8358565737051793,0.8362549800796812,0.8366533864541833,0.8370517928286852,0.8374501992031872,0.8378486055776893,0.8382470119521912,0.8386454183266933,0.8390438247011952,0.8394422310756973,0.8398406374501992,0.8402390438247012,0.8406374501992032,0.8410358565737052,0.8414342629482072,0.8418326693227092,0.8422310756972111,0.8426294820717132,0.8430278884462151,0.8434262948207172,0.8438247011952191,0.8442231075697211,0.8446215139442231,0.8450199203187251,0.8454183266932271,0.8458167330677291,0.846215139442231,0.8466135458167331,0.847011952191235,0.8474103585657371,0.847808764940239,0.848207171314741,0.848605577689243,0.849003984063745,0.8494023904382471,0.849800796812749,0.850199203187251,0.850597609561753,0.850996015936255,0.851394422310757,0.851792828685259,0.8521912350597609,0.852589641434263,0.8529880478087649,0.853386454183267,0.8537848605577689,0.8541832669322709,0.8545816733067729,0.8549800796812749,0.8553784860557769,0.8557768924302789,0.8561752988047808,0.8565737051792829,0.8569721115537848,0.8573705179282869,0.8577689243027888,0.8581673306772908,0.8585657370517928,0.8589641434262948,0.8593625498007968,0.8597609561752988,0.8601593625498007,0.8605577689243028,0.8609561752988047,0.8613545816733068,0.8617529880478088,0.8621513944223107,0.8625498007968128,0.8629482071713147,0.8633466135458168,0.8637450199203187,0.8641434262948208,0.8645418326693227,0.8649402390438247,0.8653386454183267,0.8657370517928287,0.8661354581673307,0.8665338645418327,0.8669322709163346,0.8673306772908367,0.8677290836653386,0.8681274900398407,0.8685258964143426,0.8689243027888446,0.8693227091633466,0.8697211155378486,0.8701195219123506,0.8705179282868526,0.8709163346613545,0.8713147410358566,0.8717131474103585,0.8721115537848606,0.8725099601593626,0.8729083665338645,0.8733067729083666,0.8737051792828685,0.8741035856573706,0.8745019920318725,0.8749003984063745,0.8752988047808765,0.8756972111553785,0.8760956175298805,0.8764940239043825,0.8768924302788844,0.8772908366533865,0.8776892430278884,0.8780876494023905,0.8784860557768924,0.8788844621513944,0.8792828685258964,0.8796812749003984,0.8800796812749004,0.8804780876494024,0.8808764940239043,0.8812749003984064,0.8816733067729083,0.8820717131474104,0.8824701195219123,0.8828685258964143,0.8832669322709163,0.8836653386454183,0.8840637450199204,0.8844621513944223,0.8848605577689242,0.8852589641434263,0.8856573705179283,0.8860557768924303,0.8864541832669323,0.8868525896414342,0.8872509960159363,0.8876494023904382,0.8880478087649403,0.8884462151394422,0.8888446215139443,0.8892430278884462,0.8896414342629482,0.8900398406374502,0.8904382470119522,0.8908366533864542,0.8912350597609562,0.8916334661354581,0.8920318725099602,0.8924302788844621,0.8928286852589642,0.8932270916334661,0.8936254980079681,0.8940239043824701,0.8944223107569721,0.8948207171314742,0.8952191235059761,0.895617529880478,0.8960159362549801,0.896414342629482,0.8968127490039841,0.8972111553784861,0.897609561752988,0.8980079681274901,0.898406374501992,0.8988047808764941,0.899203187250996,0.899601593625498,0.9,0.900398406374502,0.900796812749004,0.901195219123506,0.9015936254980079,0.90199203187251,0.9023904382470119,0.902788844621514,0.9031872509960159,0.9035856573705179,0.9039840637450199,0.9043824701195219,0.904780876494024,0.9051792828685259,0.9055776892430278,0.9059760956175299,0.9063745019920318,0.9067729083665339,0.9071713147410359,0.9075697211155378,0.9079681274900399,0.9083665338645418,0.9087649402390439,0.9091633466135458,0.9095617529880478,0.9099601593625498,0.9103585657370518,0.9107569721115538,0.9111553784860558,0.9115537848605577,0.9119521912350598,0.9123505976095617,0.9127490039840638,0.9131474103585657,0.9135458167330678,0.9139442231075697,0.9143426294820717,0.9147410358565737,0.9151394422310757,0.9155378486055777,0.9159362549800797,0.9163346613545816,0.9167330677290837,0.9171314741035856,0.9175298804780877,0.9179282868525896,0.9183266932270916,0.9187250996015937,0.9191235059760956,0.9195219123505977,0.9199203187250996,0.9203187250996016,0.9207171314741036,0.9211155378486056,0.9215139442231076,0.9219123505976096,0.9223107569721115,0.9227091633466136,0.9231075697211155,0.9235059760956176,0.9239043824701195,0.9243027888446215,0.9247011952191235,0.9250996015936255,0.9254980079681275,0.9258964143426295,0.9262948207171314,0.9266932270916335,0.9270916334661354,0.9274900398406375,0.9278884462151394,0.9282868525896414,0.9286852589641434,0.9290836653386454,0.9294820717131475,0.9298804780876494,0.9302788844621513,0.9306772908366534,0.9310756972111554,0.9314741035856574,0.9318725099601594,0.9322709163346613,0.9326693227091634,0.9330677290836653,0.9334661354581674,0.9338645418326693,0.9342629482071713,0.9346613545816733,0.9350597609561753,0.9354581673306773,0.9358565737051793,0.9362549800796812,0.9366533864541833,0.9370517928286852,0.9374501992031873,0.9378486055776892,0.9382470119521913,0.9386454183266932,0.9390438247011952,0.9394422310756972,0.9398406374501992,0.9402390438247012,0.9406374501992032,0.9410358565737051,0.9414342629482072,0.9418326693227091,0.9422310756972112,0.9426294820717132,0.9430278884462151,0.9434262948207172,0.9438247011952191,0.9442231075697212,0.9446215139442231,0.9450199203187251,0.9454183266932271,0.9458167330677291,0.9462151394422311,0.9466135458167331,0.947011952191235,0.9474103585657371,0.947808764940239,0.9482071713147411,0.948605577689243,0.949003984063745,0.949402390438247,0.949800796812749,0.950199203187251,0.950597609561753,0.9509960159362549,0.951394422310757,0.9517928286852589,0.952191235059761,0.952589641434263,0.9529880478087649,0.953386454183267,0.9537848605577689,0.954183266932271,0.9545816733067729,0.9549800796812749,0.9553784860557769,0.9557768924302789,0.9561752988047809,0.9565737051792829,0.9569721115537848,0.9573705179282869,0.9577689243027888,0.9581673306772909,0.9585657370517928,0.9589641434262948,0.9593625498007968,0.9597609561752988,0.9601593625498008,0.9605577689243028,0.9609561752988047,0.9613545816733068,0.9617529880478087,0.9621513944223108,0.9625498007968127,0.9629482071713148,0.9633466135458167,0.9637450199203187,0.9641434262948207,0.9645418326693227,0.9649402390438248,0.9653386454183267,0.9657370517928286,0.9661354581673307,0.9665338645418327,0.9669322709163347,0.9673306772908367,0.9677290836653386,0.9681274900398407,0.9685258964143426,0.9689243027888447,0.9693227091633466,0.9697211155378486,0.9701195219123506,0.9705179282868526,0.9709163346613546,0.9713147410358566,0.9717131474103585,0.9721115537848606,0.9725099601593625,0.9729083665338646,0.9733067729083665,0.9737051792828685,0.9741035856573705,0.9745019920318725,0.9749003984063745,0.9752988047808765,0.9756972111553784,0.9760956175298805,0.9764940239043824,0.9768924302788845,0.9772908366533865,0.9776892430278884,0.9780876494023905,0.9784860557768924,0.9788844621513945,0.9792828685258964,0.9796812749003984,0.9800796812749004,0.9804780876494024,0.9808764940239044,0.9812749003984064,0.9816733067729083,0.9820717131474104,0.9824701195219123,0.9828685258964144,0.9832669322709163,0.9836653386454183,0.9840637450199203,0.9844621513944223,0.9848605577689243,0.9852589641434263,0.9856573705179282,0.9860557768924303,0.9864541832669322,0.9868525896414343,0.9872509960159362,0.9876494023904383,0.9880478087649402,0.9884462151394422,0.9888446215139443,0.9892430278884462,0.9896414342629483,0.9900398406374502,0.9904382470119522,0.9908366533864542,0.9912350597609562,0.9916334661354582,0.9920318725099602,0.9924302788844621,0.9928286852589642,0.9932270916334661,0.9936254980079682,0.9940239043824701,0.9944223107569721,0.9948207171314741,0.9952191235059761,0.9956175298804781,0.9960159362549801,0.996414342629482,0.9968127490039841,0.997211155378486,0.9976095617529881,0.99800796812749,0.998406374501992,0.998804780876494,0.999203187250996,0.999601593625498,1.0]}

},{}],92:[function(require,module,exports){
module.exports={"expected":[-1.0475930126492587,-1.050712682982123,-1.0538497262810698,-1.0570042855481372,-1.0601765054206598,-1.0633665321965549,-1.0665745138601146,-1.069800600108321,-1.0730449423776909,-1.076307693871669,-1.0795890095885794,-1.0828890463501508,-1.086207962830632,-1.0895459195865074,-1.0929030790868344,-1.0962796057442115,-1.0996756659464004,-1.1030914280886135,-1.1065270626064847,-1.1099827420097463,-1.1134586409166232,-1.1169549360889668,-1.1204718064681511,-1.1240094332117447,-1.127567999730982,-1.131147691729059,-1.1347486972402698,-1.1383712066700087,-1.142015412835662,-1.1456815110084138,-1.1493696989559892,-1.1530801769863606,-1.1568131479924475,-1.1605688174978306,-1.1643473937035136,-1.1681490875357614,-1.1719741126950416,-1.1758226857061038,-1.179695025969228,-1.183591355812675,-1.1875119005463703,-1.191456888516865,-1.1954265511636004,-1.1994211230765215,-1.203440842055075,-1.2074859491686345,-1.2115566888183915,-1.2156533088007604,-1.2197760603723382,-1.2239251983164667,-1.2281009810114456,-1.2323036705004458,-1.236533532563175,-1.2407908367893474,-1.2450758566540145,-1.249388869594812,-1.2537301570911854,-1.2581000047456496,-1.262498702367156,-1.2669265440566195,-1.2713838282946874,-1.275870858031811,-1.2803879407806988,-1.2849353887112231,-1.2895135187478657,-1.294122652669777,-1.2987631172135379,-1.3034352441787138,-1.3081393705362876,-1.3128758385400723,-1.3176449958411993,-1.3224471956057846,-1.327282796635882,-1.3321521634938303,-1.337055666630116,-1.3419936825148653,-1.3469665937730917,-1.3519747893238334,-1.3570186645233069,-1.3620986213122275,-1.3672150683674316,-1.3723684212579652,-1.377559102605784,-1.3827875422512423,-1.3880541774235347,-1.3933594529162727,-1.3987038212683809,-1.4040877429505136,-1.4095116865571848,-1.4149761290048337,-1.4204815557360393,-1.4260284609301177,-1.4316173477203453,-1.4372487284180535,-1.4429231247438616,-1.4486410680663229,-1.4544030996482675,-1.4602097709011446,-1.466061643647673,-1.4719592903931373,-1.4779032946056583,-1.4838942510058106,-1.489932765865954,-1.4960194573196761,-1.5021549556817557,-1.5083399037790812,-1.5145749572929765,-1.5208607851134044,-1.5271980697055525,-1.5335875074893164,-1.5400298092322338,-1.5465257004564403,-1.5530759218602537,-1.559681229755021,-1.5663423965178944,-1.573060211061235,-1.5798354793193878,-1.5866690247535986,-1.5935616888758881,-1.6005143317927486,-1.6075278327695617,-1.6146030908166964,-1.62174102529829,-1.6289425765647698,-1.6362087066102415,-1.6435403997559153,-1.6509386633608214,-1.6584045285611297,-1.6659390510394652,-1.6735433118256844,-1.6812184181306762,-1.6889655042148244,-1.6967857322928765,-1.704680293477065,-1.7126504087604317,-1.720697330042429,-1.728822341198995,-1.7370267591994346,-1.7453119352725794,-1.7536792561248595,-1.7621301452130778,-1.7706660640748606,-1.779288513719947,-1.7879990360856772,-1.796799215560272,-1.8056906805777135,-1.8146751052883139,-1.8237542113093035,-1.8329297695600908,-1.8422036021871446,-1.851577584583801,-1.8610536475106614,-1.8706337793226486,-1.8803200283092214,-1.8901145051547088,-1.9000193855262368,-1.9100369127972634,-1.9201694009153352,-1.9304192374233167,-1.9407888866440572,-1.9512808930392047,-1.9618978847537207,-1.972642577358542,-1.983517777804828,-1.9945263886043028,-2.0056714122513735,-2.016955955904001,-2.0283832363416896,-2.0399565852205135,-2.0516794546467865,-2.0635554230928377,-2.0755882016803837,-2.0877816408592564,-2.1001397375117006,-2.1126666425151903,-2.1253666687997366,-2.1382442999389815,-2.151304199318072,-2.164551219925413,-2.17799041481992,-2.1916270483304747,-2.2054666080499064,-2.2195148176920854,-2.233777650887757,-2.248261346002553,-2.26297242206943,-2.277917695937627,-2.2931043007513177,-2.308539705883625,-2.324231738465722,-2.3401886066666675,-2.3564189248976164,-2.3729317411345057,-2.389736566576514,-2.406843407884078,-2.4242628022704427,-2.4420058557552893,-2.4600842849286226,-2.478510462618673,-2.4972974679100637,-2.51645914101918,-2.536010143603957,-2.5559660251669443,-2.57634329630564,-2.597159509675202,-2.618433349658955,-2.6401847318952565,-2.6624349139900443,-2.6852066189583574,-2.7085241731924,-2.732413661057043,-2.756903098576883,-2.7820226291158683,-2.807804744478142,-2.834284535499068,-2.861499976976091,-2.8894922527458418,-2.9183061278925857,-2.9479903765334856,-2.9785982754462124,-3.01018817608706,-3.042824170429464,-3.0765768697167064,-3.1115243199157074,-3.1477530837184227,-3.1853595268280137,-3.224451356635561,-3.2651494751510466,-3.3075902264993444,-3.3519281443061937,-3.398339338633899,-3.4470257098804122,-3.498220244433146,-3.5521937434361215,-3.6092634768305305,-3.6698044640515506,-3.7342644002456393,-3.8031837400156534,-3.8772232370258037,-3.957202529247597,-4.044155553366893,-4.139412445542508,-4.244724741243645,-4.362464626815531,-4.4959579411973225,-4.650075616362258,-4.832369243581718,-5.0554899416852015,-5.343154238334272,-5.748606648860114,-6.441746210638492,null,6.441746210638492,5.748606648860114,5.343154238334272,5.0554899416852015,4.832369243581718,4.650075616362258,4.4959579411973225,4.362464626815531,4.244724741243645,4.139412445542508,4.044155553366893,3.957202529247597,3.8772232370258037,3.8031837400156534,3.7342644002456393,3.6698044640515506,3.6092634768305305,3.5521937434361215,3.498220244433146,3.4470257098804122,3.398339338633899,3.3519281443061937,3.3075902264993444,3.2651494751510466,3.224451356635561,3.1853595268280137,3.1477530837184227,3.1115243199157074,3.0765768697167064,3.042824170429464,3.01018817608706,2.9785982754462124,2.9479903765334856,2.9183061278925857,2.8894922527458418,2.861499976976091,2.834284535499068,2.807804744478142,2.7820226291158683,2.756903098576883,2.732413661057043,2.7085241731924,2.6852066189583574,2.6624349139900443,2.6401847318952565,2.618433349658955,2.597159509675202,2.57634329630564,2.5559660251669443,2.536010143603957,2.51645914101918,2.4972974679100637,2.478510462618673,2.4600842849286226,2.4420058557552893,2.4242628022704427,2.406843407884078,2.389736566576514,2.3729317411345057,2.3564189248976164,2.3401886066666675,2.324231738465722,2.308539705883625,2.2931043007513177,2.277917695937627,2.26297242206943,2.248261346002553,2.233777650887757,2.2195148176920854,2.2054666080499064,2.1916270483304747,2.17799041481992,2.164551219925413,2.151304199318072,2.1382442999389815,2.1253666687997366,2.1126666425151903,2.1001397375117006,2.0877816408592564,2.0755882016803837,2.0635554230928377,2.0516794546467865,2.0399565852205135,2.0283832363416896,2.016955955904001,2.0056714122513735,1.9945263886043028,1.983517777804828,1.972642577358542,1.9618978847537207,1.9512808930392047,1.9407888866440572,1.9304192374233167,1.9201694009153352,1.9100369127972634,1.9000193855262368,1.8901145051547088,1.8803200283092214,1.8706337793226486,1.8610536475106614,1.851577584583801,1.8422036021871446,1.8329297695600908,1.8237542113093035,1.8146751052883139,1.8056906805777135,1.796799215560272,1.7879990360856772,1.779288513719947,1.7706660640748606,1.7621301452130778,1.7536792561248595,1.7453119352725794,1.7370267591994346,1.728822341198995,1.720697330042429,1.7126504087604317,1.704680293477065,1.6967857322928765,1.6889655042148244,1.6812184181306762,1.6735433118256844,1.6659390510394652,1.6584045285611297,1.6509386633608214,1.6435403997559153,1.6362087066102415,1.6289425765647698,1.62174102529829,1.6146030908166964,1.6075278327695617,1.6005143317927486,1.5935616888758881,1.5866690247535986,1.5798354793193878,1.573060211061235,1.5663423965178944,1.559681229755021,1.5530759218602537,1.5465257004564403,1.5400298092322338,1.5335875074893164,1.5271980697055525,1.5208607851134044,1.5145749572929765,1.5083399037790812,1.5021549556817557,1.4960194573196761,1.489932765865954,1.4838942510058106,1.4779032946056583,1.4719592903931373,1.466061643647673,1.4602097709011446,1.4544030996482675,1.4486410680663229,1.4429231247438616,1.4372487284180535,1.4316173477203453,1.4260284609301177,1.4204815557360393,1.4149761290048337,1.4095116865571848,1.4040877429505136,1.3987038212683809,1.3933594529162727,1.3880541774235347,1.3827875422512423,1.377559102605784,1.3723684212579652,1.3672150683674316,1.3620986213122275,1.3570186645233069,1.3519747893238334,1.3469665937730917,1.3419936825148653,1.337055666630116,1.3321521634938303,1.327282796635882,1.3224471956057846,1.3176449958411993,1.3128758385400723,1.3081393705362876,1.3034352441787138,1.2987631172135379,1.294122652669777,1.2895135187478657,1.2849353887112231,1.2803879407806988,1.275870858031811,1.2713838282946874,1.2669265440566195,1.262498702367156,1.2581000047456496,1.2537301570911854,1.249388869594812,1.2450758566540145,1.2407908367893474,1.236533532563175,1.2323036705004458,1.2281009810114456,1.2239251983164667,1.2197760603723382,1.2156533088007604,1.2115566888183915,1.2074859491686345,1.203440842055075,1.1994211230765215,1.1954265511636004,1.191456888516865,1.1875119005463703,1.183591355812675,1.179695025969228,1.1758226857061038,1.1719741126950416,1.1681490875357614,1.1643473937035136,1.1605688174978306,1.1568131479924475,1.1530801769863606,1.1493696989559892,1.1456815110084138,1.142015412835662,1.1383712066700087,1.1347486972402698,1.131147691729059,1.127567999730982,1.1240094332117447,1.1204718064681511,1.1169549360889668,1.1134586409166232,1.1099827420097463,1.1065270626064847,1.1030914280886135,1.0996756659464004,1.0962796057442115,1.0929030790868344,1.0895459195865074,1.086207962830632,1.0828890463501508,1.0795890095885794,1.076307693871669,1.0730449423776909,1.069800600108321,1.0665745138601146,1.0633665321965549,1.0601765054206598,1.0570042855481372,1.0538497262810698,1.050712682982123,1.0475930126492587],"x":[-0.8,-0.796812749003984,-0.7936254980079681,-0.7904382470119522,-0.7872509960159363,-0.7840637450199203,-0.7808764940239044,-0.7776892430278884,-0.7745019920318725,-0.7713147410358566,-0.7681274900398406,-0.7649402390438247,-0.7617529880478088,-0.7585657370517929,-0.7553784860557768,-0.7521912350597609,-0.749003984063745,-0.7458167330677291,-0.7426294820717132,-0.7394422310756972,-0.7362549800796813,-0.7330677290836654,-0.7298804780876494,-0.7266932270916334,-0.7235059760956175,-0.7203187250996016,-0.7171314741035857,-0.7139442231075698,-0.7107569721115538,-0.7075697211155378,-0.7043824701195219,-0.701195219123506,-0.69800796812749,-0.6948207171314741,-0.6916334661354582,-0.6884462151394423,-0.6852589641434262,-0.6820717131474103,-0.6788844621513944,-0.6756972111553785,-0.6725099601593626,-0.6693227091633466,-0.6661354581673307,-0.6629482071713148,-0.6597609561752988,-0.6565737051792828,-0.6533864541832669,-0.650199203187251,-0.6470119521912351,-0.6438247011952192,-0.6406374501992032,-0.6374501992031872,-0.6342629482071713,-0.6310756972111554,-0.6278884462151394,-0.6247011952191235,-0.6215139442231076,-0.6183266932270917,-0.6151394422310758,-0.6119521912350597,-0.6087649402390438,-0.6055776892430279,-0.602390438247012,-0.599203187250996,-0.5960159362549801,-0.5928286852589641,-0.5896414342629482,-0.5864541832669322,-0.5832669322709163,-0.5800796812749004,-0.5768924302788845,-0.5737051792828686,-0.5705179282868525,-0.5673306772908366,-0.5641434262948207,-0.5609561752988048,-0.5577689243027888,-0.5545816733067729,-0.551394422310757,-0.5482071713147411,-0.5450199203187251,-0.5418326693227091,-0.5386454183266932,-0.5354581673306773,-0.5322709163346614,-0.5290836653386454,-0.5258964143426295,-0.5227091633466135,-0.5195219123505976,-0.5163346613545817,-0.5131474103585657,-0.5099601593625498,-0.5067729083665339,-0.503585657370518,-0.500398406374502,-0.49721115537848604,-0.4940239043824701,-0.49083665338645416,-0.48764940239043825,-0.48446215139442234,-0.48127490039840637,-0.47808764940239046,-0.4749003984063745,-0.4717131474103586,-0.4685258964143426,-0.4653386454183267,-0.46215139442231074,-0.4589641434262948,-0.45577689243027886,-0.45258964143426295,-0.44940239043824703,-0.44621513944223107,-0.44302788844621516,-0.4398406374501992,-0.4366533864541833,-0.4334661354581673,-0.4302788844621514,-0.42709163346613543,-0.4239043824701195,-0.4207171314741036,-0.41752988047808764,-0.41434262948207173,-0.41115537848605577,-0.40796812749003986,-0.4047808764940239,-0.401593625498008,-0.398406374501992,-0.3952191235059761,-0.39203187250996013,-0.3888446215139442,-0.3856573705179283,-0.38247011952191234,-0.37928286852589643,-0.37609561752988047,-0.37290836653386455,-0.3697211155378486,-0.3665338645418327,-0.3633466135458167,-0.3601593625498008,-0.3569721115537849,-0.3537848605577689,-0.350597609561753,-0.34741035856573704,-0.34422310756972113,-0.34103585657370517,-0.33784860557768925,-0.3346613545816733,-0.3314741035856574,-0.3282868525896414,-0.3250996015936255,-0.3219123505976096,-0.3187250996015936,-0.3155378486055777,-0.31235059760956174,-0.30916334661354583,-0.30597609561752986,-0.30278884462151395,-0.299601593625498,-0.2964143426294821,-0.2932270916334661,-0.2900398406374502,-0.2868525896414343,-0.2836653386454183,-0.2804780876494024,-0.27729083665338644,-0.27410358565737053,-0.27091633466135456,-0.26772908366533865,-0.2645418326693227,-0.2613545816733068,-0.25816733067729086,-0.2549800796812749,-0.251792828685259,-0.24860557768924302,-0.24541832669322708,-0.24223107569721117,-0.23904382470119523,-0.2358565737051793,-0.23266932270916335,-0.2294820717131474,-0.22629482071713147,-0.22310756972111553,-0.2199203187250996,-0.21673306772908366,-0.21354581673306772,-0.2103585657370518,-0.20717131474103587,-0.20398406374501993,-0.200796812749004,-0.19760956175298805,-0.1944223107569721,-0.19123505976095617,-0.18804780876494023,-0.1848605577689243,-0.18167330677290836,-0.17848605577689244,-0.1752988047808765,-0.17211155378486057,-0.16892430278884463,-0.1657370517928287,-0.16254980079681275,-0.1593625498007968,-0.15617529880478087,-0.15298804780876493,-0.149800796812749,-0.14661354581673305,-0.14342629482071714,-0.1402390438247012,-0.13705179282868526,-0.13386454183266933,-0.1306772908366534,-0.12749003984063745,-0.12430278884462151,-0.12111553784860558,-0.11792828685258964,-0.1147410358565737,-0.11155378486055777,-0.10836653386454183,-0.1051792828685259,-0.10199203187250996,-0.09880478087649402,-0.09561752988047809,-0.09243027888446215,-0.08924302788844622,-0.08605577689243028,-0.08286852589641434,-0.0796812749003984,-0.07649402390438247,-0.07330677290836653,-0.0701195219123506,-0.06693227091633466,-0.06374501992031872,-0.06055776892430279,-0.05737051792828685,-0.054183266932270914,-0.05099601593625498,-0.04780876494023904,-0.04462151394422311,-0.04143426294820717,-0.03824701195219123,-0.0350597609561753,-0.03187250996015936,-0.028685258964143426,-0.02549800796812749,-0.022310756972111555,-0.019123505976095617,-0.01593625498007968,-0.012749003984063745,-0.009561752988047808,-0.006374501992031873,-0.0031872509960159364,0.0,0.0031872509960159364,0.006374501992031873,0.009561752988047808,0.012749003984063745,0.01593625498007968,0.019123505976095617,0.022310756972111555,0.02549800796812749,0.028685258964143426,0.03187250996015936,0.0350597609561753,0.03824701195219123,0.04143426294820717,0.04462151394422311,0.04780876494023904,0.05099601593625498,0.054183266932270914,0.05737051792828685,0.06055776892430279,0.06374501992031872,0.06693227091633466,0.0701195219123506,0.07330677290836653,0.07649402390438247,0.0796812749003984,0.08286852589641434,0.08605577689243028,0.08924302788844622,0.09243027888446215,0.09561752988047809,0.09880478087649402,0.10199203187250996,0.1051792828685259,0.10836653386454183,0.11155378486055777,0.1147410358565737,0.11792828685258964,0.12111553784860558,0.12430278884462151,0.12749003984063745,0.1306772908366534,0.13386454183266933,0.13705179282868526,0.1402390438247012,0.14342629482071714,0.14661354581673305,0.149800796812749,0.15298804780876493,0.15617529880478087,0.1593625498007968,0.16254980079681275,0.1657370517928287,0.16892430278884463,0.17211155378486057,0.1752988047808765,0.17848605577689244,0.18167330677290836,0.1848605577689243,0.18804780876494023,0.19123505976095617,0.1944223107569721,0.19760956175298805,0.200796812749004,0.20398406374501993,0.20717131474103587,0.2103585657370518,0.21354581673306772,0.21673306772908366,0.2199203187250996,0.22310756972111553,0.22629482071713147,0.2294820717131474,0.23266932270916335,0.2358565737051793,0.23904382470119523,0.24223107569721117,0.24541832669322708,0.24860557768924302,0.251792828685259,0.2549800796812749,0.25816733067729086,0.2613545816733068,0.2645418326693227,0.26772908366533865,0.27091633466135456,0.27410358565737053,0.27729083665338644,0.2804780876494024,0.2836653386454183,0.2868525896414343,0.2900398406374502,0.2932270916334661,0.2964143426294821,0.299601593625498,0.30278884462151395,0.30597609561752986,0.30916334661354583,0.31235059760956174,0.3155378486055777,0.3187250996015936,0.3219123505976096,0.3250996015936255,0.3282868525896414,0.3314741035856574,0.3346613545816733,0.33784860557768925,0.34103585657370517,0.34422310756972113,0.34741035856573704,0.350597609561753,0.3537848605577689,0.3569721115537849,0.3601593625498008,0.3633466135458167,0.3665338645418327,0.3697211155378486,0.37290836653386455,0.37609561752988047,0.37928286852589643,0.38247011952191234,0.3856573705179283,0.3888446215139442,0.39203187250996013,0.3952191235059761,0.398406374501992,0.401593625498008,0.4047808764940239,0.40796812749003986,0.41115537848605577,0.41434262948207173,0.41752988047808764,0.4207171314741036,0.4239043824701195,0.42709163346613543,0.4302788844621514,0.4334661354581673,0.4366533864541833,0.4398406374501992,0.44302788844621516,0.44621513944223107,0.44940239043824703,0.45258964143426295,0.45577689243027886,0.4589641434262948,0.46215139442231074,0.4653386454183267,0.4685258964143426,0.4717131474103586,0.4749003984063745,0.47808764940239046,0.48127490039840637,0.48446215139442234,0.48764940239043825,0.49083665338645416,0.4940239043824701,0.49721115537848604,0.500398406374502,0.503585657370518,0.5067729083665339,0.5099601593625498,0.5131474103585657,0.5163346613545817,0.5195219123505976,0.5227091633466135,0.5258964143426295,0.5290836653386454,0.5322709163346614,0.5354581673306773,0.5386454183266932,0.5418326693227091,0.5450199203187251,0.5482071713147411,0.551394422310757,0.5545816733067729,0.5577689243027888,0.5609561752988048,0.5641434262948207,0.5673306772908366,0.5705179282868525,0.5737051792828686,0.5768924302788845,0.5800796812749004,0.5832669322709163,0.5864541832669322,0.5896414342629482,0.5928286852589641,0.5960159362549801,0.599203187250996,0.602390438247012,0.6055776892430279,0.6087649402390438,0.6119521912350597,0.6151394422310758,0.6183266932270917,0.6215139442231076,0.6247011952191235,0.6278884462151394,0.6310756972111554,0.6342629482071713,0.6374501992031872,0.6406374501992032,0.6438247011952192,0.6470119521912351,0.650199203187251,0.6533864541832669,0.6565737051792828,0.6597609561752988,0.6629482071713148,0.6661354581673307,0.6693227091633466,0.6725099601593626,0.6756972111553785,0.6788844621513944,0.6820717131474103,0.6852589641434262,0.6884462151394423,0.6916334661354582,0.6948207171314741,0.69800796812749,0.701195219123506,0.7043824701195219,0.7075697211155378,0.7107569721115538,0.7139442231075698,0.7171314741035857,0.7203187250996016,0.7235059760956175,0.7266932270916334,0.7298804780876494,0.7330677290836654,0.7362549800796813,0.7394422310756972,0.7426294820717132,0.7458167330677291,0.749003984063745,0.7521912350597609,0.7553784860557768,0.7585657370517929,0.7617529880478088,0.7649402390438247,0.7681274900398406,0.7713147410358566,0.7745019920318725,0.7776892430278884,0.7808764940239044,0.7840637450199203,0.7872509960159363,0.7904382470119522,0.7936254980079681,0.796812749003984,0.8]}

},{}],93:[function(require,module,exports){
module.exports={"expected":[-691.4686750787736,-691.4706690973605,-691.4726671000032,-691.4746691026537,-691.4766751213604,-691.4786851722681,-691.4806992716194,-691.4827174357553,-691.4847396811155,-691.4867660242401,-691.4887964817698,-691.4908310704468,-691.4928698071158,-691.4949127087247,-691.4969597923252,-691.4990110750747,-691.5010665742357,-691.5031263071774,-691.5051902913768,-691.5072585444194,-691.5093310839998,-691.511407927923,-691.513489094105,-691.5155746005743,-691.5176644654717,-691.5197587070529,-691.5218573436877,-691.5239603938622,-691.5260678761796,-691.5281798093603,-691.5302962122441,-691.5324171037907,-691.5345425030804,-691.5366724293154,-691.5388069018212,-691.540945940047,-691.5430895635672,-691.5452377920823,-691.5473906454201,-691.5495481435368,-691.5517103065177,-691.5538771545793,-691.5560487080692,-691.558224987468,-691.5604060133904,-691.5625918065864,-691.5647823879422,-691.5669777784814,-691.5691779993667,-691.5713830719006,-691.573593017527,-691.5758078578318,-691.5780276145454,-691.5802523095426,-691.582481964845,-691.5847166026214,-691.5869562451896,-691.5892009150182,-691.5914506347268,-691.5937054270884,-691.5959653150302,-691.5982303216352,-691.600500470144,-691.602775783955,-691.6050562866277,-691.6073420018823,-691.6096329536025,-691.6119291658364,-691.6142306627981,-691.6165374688693,-691.6188496086008,-691.6211671067142,-691.6234899881033,-691.6258182778357,-691.6281520011546,-691.6304911834802,-691.6328358504119,-691.6351860277291,-691.6375417413938,-691.6399030175514,-691.6422698825336,-691.6446423628589,-691.6470204852355,-691.6494042765623,-691.651793763931,-691.6541889746281,-691.6565899361367,-691.6589966761383,-691.6614092225144,-691.6638276033493,-691.6662518469313,-691.668681981755,-691.671118036523,-691.6735600401487,-691.6760080217573,-691.6784620106886,-691.680922036499,-691.6833881289638,-691.6858603180784,-691.6883386340621,-691.6908231073587,-691.69331376864,-691.6958106488073,-691.698313778994,-691.7008231905678,-691.7033389151333,-691.7058609845341,-691.7083894308554,-691.7109242864262,-691.7134655838225,-691.7160133558688,-691.7185676356411,-691.7211284564698,-691.723695851942,-691.7262698559039,-691.728850502464,-691.7314378259953,-691.7340318611385,-691.7366326428047,-691.7392402061777,-691.7418545867174,-691.7444758201627,-691.7471039425344,-691.7497389901375,-691.7523809995653,-691.7550300077016,-691.7576860517244,-691.7603491691083,-691.7630193976283,-691.765696775363,-691.7683813406976,-691.7710731323269,-691.7737721892595,-691.7764785508205,-691.779192256655,-691.7819133467323,-691.7846418613481,-691.7873778411295,-691.7901213270374,-691.7928723603712,-691.7956309827722,-691.7983972362266,-691.8011711630708,-691.8039528059937,-691.8067422080422,-691.8095394126241,-691.8123444635122,-691.8151574048491,-691.8179782811508,-691.820807137311,-691.8236440186058,-691.8264889706975,-691.829342039639,-691.8322032718789,-691.8350727142656,-691.8379504140516,-691.8408364188989,-691.8437307768833,-691.8466335364989,-691.8495447466638,-691.8524644567243,-691.8553927164604,-691.8583295760905,-691.8612750862766,-691.8642292981302,-691.8671922632168,-691.8701640335617,-691.8731446616551,-691.8761342004586,-691.8791327034098,-691.8821402244283,-691.885156817922,-691.8881825387926,-691.8912174424416,-691.8942615847764,-691.8973150222164,-691.9003778116999,-691.9034500106894,-691.9065316771791,-691.9096228697009,-691.9127236473308,-691.9158340696966,-691.918954196984,-691.9220840899438,-691.925223809899,-691.9283734187521,-691.9315329789923,-691.9347025537032,-691.9378822065698,-691.9410720018868,-691.9442720045661,-691.9474822801446,-691.9507028947926,-691.9539339153216,-691.957175409193,-691.9604274445263,-691.9636900901077,-691.9669634153989,-691.970247490546,-691.9735423863883,-691.9768481744679,-691.9801649270387,-691.9834927170758,-691.9868316182854,-691.9901817051143,-691.9935430527603,-691.9969157371818,-692.0002998351085,-692.0036954240518,-692.0071025823152,-692.0105213890052,-692.013951924043,-692.0173942681745,-692.0208485029826,-692.0243147108988,-692.0277929752144,-692.031283380093,-692.0347860105826,-692.0383009526281,-692.0418282930835,-692.0453681197258,-692.0489205212668,-692.0524855873675,-692.0560634086511,-692.0596540767172,-692.0632576841552,-692.0668743245598,-692.0705040925442,-692.0741470837561,-692.077803394892,-692.0814731237134,-692.0851563690617,-692.0888532308744,-692.0925638102018,-692.0962882092231,-692.1000265312636,-692.1037788808114,-692.1075453635357,-692.1113260863038,-692.1151211572001,-692.1189306855439,-692.122754781909,-692.1265935581421,-692.1304471273836,-692.1343156040864,-692.1381991040371,-692.1420977443764,-692.1460116436206,-692.149940921683,-692.1538856998959,-692.1578461010332,-692.1618222493336,-692.1658142705231,-692.16982229184,-692.1738464420584,-692.1778868515134,-692.1819436521265,-692.1860169774308,-692.1901069625984,-692.1942137444663,-692.1983374615648,-692.2024782541448,-692.2066362642066,-692.2108116355296,-692.2150045137014,-692.2192150461487,-692.2234433821685,-692.2276896729595,-692.2319540716546,-692.2362367333545,-692.2405378151611,-692.2448574762119,-692.249195877716,-692.2535531829897,-692.2579295574933,-692.2623251688694,-692.2667401869807,-692.2711747839498,-692.2756291341996,-692.280103414494,-692.2845978039804,-692.2891124842326,-692.2936476392948,-692.2982034557265,-692.3027801226488,-692.3073778317912,-692.3119967775405,-692.3166371569888,-692.3212991699855,-692.3259830191878,-692.3306889101141,-692.3354170511977,-692.3401676538431,-692.3449409324813,-692.3497371046294,-692.3545563909488,-692.3593990153068,-692.3642652048391,-692.3691551900133,-692.3740692046945,-692.3790074862127,-692.3839702754311,-692.3889578168173,-692.3939703585147,-692.3990081524173,-692.4040714542451,-692.4091605236225,-692.414275624158,-692.4194170235257,-692.4245849935501,-692.4297798102917,-692.435001754136,-692.4402511098838,-692.4455281668448,-692.4508332189332,-692.4561665647658,-692.4615285077629,-692.4669193562519,-692.4723394235738,-692.4777890281922,-692.4832684938061,-692.4887781494647,-692.4943183296863,-692.4998893745799,-692.505491629971,-692.5111254475299,-692.5167911849045,-692.5224892058561,-692.5282198804002,-692.5339835849502,-692.5397807024658,-692.545611622606,-692.5514767418856,-692.5573764638381,-692.5633111991812,-692.5692813659887,-692.5752873898679,-692.5813297041406,-692.5874087500314,-692.593524976861,-692.5996788422453,-692.6058708123007,-692.6121013618565,-692.6183709746728,-692.6246801436662,-692.6310293711425,-692.6374191690363,-692.643850059159,-692.6503225734543,-692.6568372542624,-692.6633946545927,-692.6699953384053,-692.6766398809024,-692.6833288688285,-692.6900629007823,-692.6968425875369,-692.7036685523734,-692.7105414314241,-692.7174618740282,-692.7244305431005,-692.731448115512,-692.7385152824843,-692.7456327499989,-692.7528012392195,-692.7600214869314,-692.7672942459949,-692.7746202858175,-692.7820003928417,-692.7894353710517,-692.7969260424992,-692.8044732478487,-692.8120778469436,-692.8197407193943,-692.8274627651889,-692.8352449053269,-692.8430880824792,-692.8509932616726,-692.858961431003,-692.8669936023764,-692.87509081228,-692.8832541225845,-692.891484621381,-692.89978342385,-692.908151673169,-692.9165905414573,-692.9251012307616,-692.9336849740831,-692.9423430364499,-692.9510767160357,-692.9598873453282,-692.9687762923488,-692.9777449619278,-692.9867947970365,-692.9959272801811,-693.0051439348596,-693.0144463270875,-693.0238360669948,-693.0333148104983,-693.0428842610547,-693.0525461714979,-693.0623023459653,-693.0721546419211,-693.0821049722772,-693.0921553076237,-693.1023076785702,-693.1125641782094,-693.1229269647058,-693.1333982640227,-693.143980372791,-693.1546756613336,-693.1654865768511,-693.1764156467837,-693.1874654823573,-693.1986387823287,-693.2099383369417,-693.2213670321096,-693.2329278538397,-693.2446238929161,-693.25645834986,-693.2684345401868,-693.2805558999816,-693.2928259918176,-693.3052485110414,-693.317827292454,-693.3305663174168,-693.3434697214168,-693.3565418021263,-693.3697870279957,-693.3832100474233,-693.3968156985499,-693.4106090197271,-693.4245952607198,-693.4387798947017,-693.4531686311144,-693.4677674294657,-693.482582514149,-693.4976203903783,-693.5128878613389,-693.5283920466682,-693.5441404023912,-693.5601407424525,-693.5764012619969,-693.5929305625766,-693.6097376794748,-693.6268321113672,-693.6442238525606,-693.6619234280873,-693.6799419319601,-693.6982910689381,-693.7169832001962,-693.7360313933455,-693.7554494773096,-693.7752521026372,-693.7954548079057,-693.8160740929741,-693.8371274999467,-693.8586337028459,-693.8806126071395,-693.9030854604562,-693.9260749760276,-693.9496054706582,-693.973703019322,-693.9983956288514,-694.0237134336178,-694.0496889166337,-694.0763571601454,-694.1037561305648,-694.1319270035474,-694.1609145362021,-694.1907674948776,-694.2215391487906,-694.2532878420448,-694.2860776594698,-694.3199792053754,-694.3550705190045,-694.3914381565351,-694.4291784773669,-694.4683991827972,-694.5092211689507,-694.5517807742754,-694.5962325269252,-694.6427525316943,-694.6915426839114,-694.7428359650884,-694.7969031716804,-694.8540615691151,-694.9146861724756,-694.9792246726965,-695.0482175202787,-695.1223254648501,-695.2023681403441,-695.2893794793034,-695.3846896134714,-695.4900500733514,-695.6078330392857,-695.7413643422674,-695.895514902571,-696.0778362920317,-696.3009795923462,-696.5886612464652,-696.9941255179085,-697.6872701884779,-709.889355822726],"x":[-1.0e-300,-9.980079681474104e-301,-9.960159362948208e-301,-9.94023904442231e-301,-9.920318725896415e-301,-9.900398407370519e-301,-9.880478088844623e-301,-9.860557770318725e-301,-9.840637451792829e-301,-9.820717133266933e-301,-9.800796814741037e-301,-9.78087649621514e-301,-9.760956177689243e-301,-9.741035859163347e-301,-9.721115540637451e-301,-9.701195222111553e-301,-9.681274903585657e-301,-9.661354585059761e-301,-9.641434266533865e-301,-9.621513948007968e-301,-9.601593629482072e-301,-9.581673310956176e-301,-9.56175299243028e-301,-9.541832673904382e-301,-9.521912355378486e-301,-9.50199203685259e-301,-9.482071718326694e-301,-9.462151399800796e-301,-9.4422310812749e-301,-9.422310762749004e-301,-9.402390444223108e-301,-9.38247012569721e-301,-9.362549807171315e-301,-9.342629488645419e-301,-9.322709170119523e-301,-9.302788851593625e-301,-9.282868533067729e-301,-9.262948214541833e-301,-9.243027896015937e-301,-9.22310757749004e-301,-9.203187258964143e-301,-9.183266940438247e-301,-9.163346621912351e-301,-9.143426303386454e-301,-9.123505984860558e-301,-9.103585666334662e-301,-9.083665347808766e-301,-9.063745029282868e-301,-9.043824710756972e-301,-9.023904392231076e-301,-9.00398407370518e-301,-8.984063755179284e-301,-8.964143436653386e-301,-8.94422311812749e-301,-8.924302799601594e-301,-8.904382481075698e-301,-8.8844621625498e-301,-8.864541844023905e-301,-8.844621525498009e-301,-8.824701206972113e-301,-8.804780888446215e-301,-8.784860569920319e-301,-8.764940251394423e-301,-8.745019932868527e-301,-8.725099614342629e-301,-8.705179295816733e-301,-8.685258977290837e-301,-8.665338658764941e-301,-8.645418340239043e-301,-8.625498021713147e-301,-8.605577703187251e-301,-8.585657384661355e-301,-8.565737066135458e-301,-8.545816747609562e-301,-8.525896429083666e-301,-8.50597611055777e-301,-8.486055792031872e-301,-8.466135473505976e-301,-8.44621515498008e-301,-8.426294836454184e-301,-8.406374517928286e-301,-8.38645419940239e-301,-8.366533880876494e-301,-8.346613562350598e-301,-8.3266932438247e-301,-8.306772925298805e-301,-8.286852606772909e-301,-8.266932288247013e-301,-8.247011969721115e-301,-8.227091651195219e-301,-8.207171332669323e-301,-8.187251014143427e-301,-8.16733069561753e-301,-8.147410377091633e-301,-8.127490058565737e-301,-8.107569740039841e-301,-8.087649421513944e-301,-8.067729102988048e-301,-8.047808784462152e-301,-8.027888465936256e-301,-8.00796814741036e-301,-7.988047828884462e-301,-7.968127510358566e-301,-7.94820719183267e-301,-7.928286873306774e-301,-7.908366554780876e-301,-7.88844623625498e-301,-7.868525917729084e-301,-7.848605599203188e-301,-7.82868528067729e-301,-7.808764962151395e-301,-7.788844643625499e-301,-7.768924325099603e-301,-7.749004006573705e-301,-7.729083688047809e-301,-7.709163369521913e-301,-7.689243050996017e-301,-7.669322732470119e-301,-7.649402413944223e-301,-7.629482095418327e-301,-7.609561776892431e-301,-7.589641458366533e-301,-7.569721139840637e-301,-7.549800821314741e-301,-7.529880502788845e-301,-7.509960184262948e-301,-7.490039865737052e-301,-7.470119547211156e-301,-7.450199228685259e-301,-7.430278910159363e-301,-7.410358591633466e-301,-7.39043827310757e-301,-7.370517954581673e-301,-7.350597636055777e-301,-7.33067731752988e-301,-7.310756999003984e-301,-7.2908366804780875e-301,-7.2709163619521915e-301,-7.250996043426295e-301,-7.231075724900399e-301,-7.211155406374502e-301,-7.191235087848606e-301,-7.171314769322709e-301,-7.151394450796813e-301,-7.131474132270916e-301,-7.11155381374502e-301,-7.091633495219123e-301,-7.071713176693227e-301,-7.051792858167331e-301,-7.0318725396414344e-301,-7.0119522211155384e-301,-6.9920319025896416e-301,-6.9721115840637456e-301,-6.952191265537849e-301,-6.932270947011953e-301,-6.912350628486056e-301,-6.89243030996016e-301,-6.872509991434263e-301,-6.852589672908367e-301,-6.83266935438247e-301,-6.812749035856574e-301,-6.792828717330677e-301,-6.772908398804781e-301,-6.7529880802788845e-301,-6.7330677617529885e-301,-6.713147443227092e-301,-6.693227124701196e-301,-6.673306806175299e-301,-6.653386487649403e-301,-6.633466169123506e-301,-6.61354585059761e-301,-6.593625532071713e-301,-6.573705213545817e-301,-6.55378489501992e-301,-6.533864576494024e-301,-6.5139442579681274e-301,-6.494023939442231e-301,-6.4741036209163346e-301,-6.4541833023904386e-301,-6.434262983864542e-301,-6.414342665338646e-301,-6.394422346812749e-301,-6.374502028286853e-301,-6.354581709760956e-301,-6.33466139123506e-301,-6.314741072709163e-301,-6.294820754183267e-301,-6.27490043565737e-301,-6.254980117131474e-301,-6.2350597986055775e-301,-6.2151394800796815e-301,-6.195219161553785e-301,-6.175298843027889e-301,-6.155378524501992e-301,-6.135458205976096e-301,-6.115537887450199e-301,-6.095617568924303e-301,-6.075697250398407e-301,-6.05577693187251e-301,-6.035856613346614e-301,-6.015936294820717e-301,-5.996015976294821e-301,-5.976095657768924e-301,-5.956175339243028e-301,-5.9362550207171316e-301,-5.9163347021912356e-301,-5.896414383665339e-301,-5.876494065139443e-301,-5.856573746613546e-301,-5.83665342808765e-301,-5.816733109561753e-301,-5.796812791035857e-301,-5.77689247250996e-301,-5.756972153984064e-301,-5.737051835458167e-301,-5.717131516932271e-301,-5.6972111984063745e-301,-5.6772908798804785e-301,-5.657370561354582e-301,-5.637450242828686e-301,-5.617529924302789e-301,-5.597609605776893e-301,-5.577689287250996e-301,-5.5577689687251e-301,-5.537848650199203e-301,-5.517928331673307e-301,-5.49800801314741e-301,-5.478087694621514e-301,-5.458167376095617e-301,-5.438247057569721e-301,-5.4183267390438246e-301,-5.3984064205179285e-301,-5.378486101992032e-301,-5.358565783466136e-301,-5.338645464940239e-301,-5.318725146414343e-301,-5.298804827888446e-301,-5.27888450936255e-301,-5.258964190836653e-301,-5.239043872310757e-301,-5.21912355378486e-301,-5.199203235258964e-301,-5.1792829167330675e-301,-5.1593625982071715e-301,-5.139442279681275e-301,-5.119521961155379e-301,-5.099601642629482e-301,-5.079681324103586e-301,-5.05976100557769e-301,-5.039840687051793e-301,-5.019920368525897e-301,-5.00000005e-301,-4.980079731474104e-301,-4.960159412948207e-301,-4.940239094422311e-301,-4.920318775896414e-301,-4.900398457370518e-301,-4.8804781388446215e-301,-4.8605578203187255e-301,-4.840637501792829e-301,-4.820717183266933e-301,-4.800796864741036e-301,-4.78087654621514e-301,-4.760956227689243e-301,-4.741035909163347e-301,-4.72111559063745e-301,-4.701195272111554e-301,-4.681274953585657e-301,-4.661354635059761e-301,-4.6414343165338645e-301,-4.6215139980079685e-301,-4.601593679482072e-301,-4.581673360956176e-301,-4.561753042430279e-301,-4.541832723904383e-301,-4.521912405378486e-301,-4.50199208685259e-301,-4.482071768326693e-301,-4.462151449800797e-301,-4.4422311312749e-301,-4.422310812749004e-301,-4.402390494223107e-301,-4.382470175697211e-301,-4.3625498571713145e-301,-4.3426295386454185e-301,-4.322709220119522e-301,-4.302788901593626e-301,-4.282868583067729e-301,-4.262948264541833e-301,-4.243027946015936e-301,-4.22310762749004e-301,-4.203187308964143e-301,-4.183266990438247e-301,-4.16334667191235e-301,-4.143426353386454e-301,-4.1235060348605575e-301,-4.1035857163346615e-301,-4.0836653978087654e-301,-4.063745079282869e-301,-4.043824760756973e-301,-4.023904442231076e-301,-4.00398412370518e-301,-3.984063805179283e-301,-3.964143486653387e-301,-3.94422316812749e-301,-3.924302849601594e-301,-3.904382531075697e-301,-3.884462212549801e-301,-3.864541894023904e-301,-3.844621575498008e-301,-3.8247012569721115e-301,-3.8047809384462155e-301,-3.784860619920319e-301,-3.764940301394423e-301,-3.745019982868526e-301,-3.7250996643426294e-301,-3.705179345816733e-301,-3.6852590272908366e-301,-3.66533870876494e-301,-3.6454183902390437e-301,-3.6254980717131477e-301,-3.6055777531872513e-301,-3.585657434661355e-301,-3.5657371161354584e-301,-3.545816797609562e-301,-3.5258964790836656e-301,-3.505976160557769e-301,-3.4860558420318727e-301,-3.4661355235059763e-301,-3.44621520498008e-301,-3.4262948864541835e-301,-3.406374567928287e-301,-3.3864542494023906e-301,-3.366533930876494e-301,-3.3466136123505978e-301,-3.3266932938247014e-301,-3.306772975298805e-301,-3.2868526567729085e-301,-3.266932338247012e-301,-3.2470120197211157e-301,-3.2270917011952192e-301,-3.207171382669323e-301,-3.1872510641434264e-301,-3.16733074561753e-301,-3.1474104270916335e-301,-3.127490108565737e-301,-3.1075697900398407e-301,-3.0876494715139443e-301,-3.067729152988048e-301,-3.0478088344621514e-301,-3.027888515936255e-301,-3.0079681974103586e-301,-2.988047878884462e-301,-2.9681275603585657e-301,-2.9482072418326693e-301,-2.928286923306773e-301,-2.9083666047808765e-301,-2.88844628625498e-301,-2.8685259677290836e-301,-2.848605649203187e-301,-2.8286853306772908e-301,-2.8087650121513944e-301,-2.788844693625498e-301,-2.7689243750996015e-301,-2.749004056573705e-301,-2.7290837380478087e-301,-2.7091634195219122e-301,-2.689243100996016e-301,-2.6693227824701194e-301,-2.649402463944223e-301,-2.629482145418327e-301,-2.6095618268924305e-301,-2.589641508366534e-301,-2.5697211898406377e-301,-2.5498008713147413e-301,-2.529880552788845e-301,-2.5099602342629484e-301,-2.490039915737052e-301,-2.4701195972111556e-301,-2.450199278685259e-301,-2.4302789601593627e-301,-2.4103586416334663e-301,-2.39043832310757e-301,-2.3705180045816735e-301,-2.350597686055777e-301,-2.3306773675298806e-301,-2.310757049003984e-301,-2.2908367304780878e-301,-2.2709164119521913e-301,-2.250996093426295e-301,-2.2310757749003985e-301,-2.211155456374502e-301,-2.1912351378486056e-301,-2.1713148193227092e-301,-2.151394500796813e-301,-2.1314741822709164e-301,-2.11155386374502e-301,-2.0916335452191235e-301,-2.071713226693227e-301,-2.0517929081673307e-301,-2.0318725896414343e-301,-2.011952271115538e-301,-1.9920319525896414e-301,-1.972111634063745e-301,-1.9521913155378486e-301,-1.932270997011952e-301,-1.9123506784860557e-301,-1.8924303599601593e-301,-1.872510041434263e-301,-1.8525897229083667e-301,-1.8326694043824702e-301,-1.8127490858565738e-301,-1.7928287673306774e-301,-1.772908448804781e-301,-1.7529881302788845e-301,-1.7330678117529881e-301,-1.7131474932270917e-301,-1.6932271747011953e-301,-1.6733068561752988e-301,-1.6533865376494024e-301,-1.633466219123506e-301,-1.6135459005976096e-301,-1.5936255820717132e-301,-1.5737052635458167e-301,-1.5537849450199203e-301,-1.5338646264940239e-301,-1.5139443079681275e-301,-1.494023989442231e-301,-1.4741036709163346e-301,-1.4541833523904382e-301,-1.4342630338645418e-301,-1.4143427153386456e-301,-1.3944223968127491e-301,-1.3745020782868527e-301,-1.3545817597609563e-301,-1.3346614412350599e-301,-1.3147411227091634e-301,-1.294820804183267e-301,-1.2749004856573706e-301,-1.2549801671314742e-301,-1.2350598486055777e-301,-1.2151395300796813e-301,-1.195219211553785e-301,-1.1752988930278885e-301,-1.155378574501992e-301,-1.1354582559760956e-301,-1.1155379374501992e-301,-1.0956176189243028e-301,-1.0756973003984064e-301,-1.05577698187251e-301,-1.0358566633466135e-301,-1.015936344820717e-301,-9.960160262948207e-302,-9.760957077689242e-302,-9.561753892430278e-302,-9.362550707171314e-302,-9.163347521912351e-302,-8.964144336653387e-302,-8.764941151394422e-302,-8.565737966135458e-302,-8.366534780876494e-302,-8.16733159561753e-302,-7.968128410358566e-302,-7.768925225099602e-302,-7.569722039840638e-302,-7.370518854581674e-302,-7.171315669322709e-302,-6.972112484063745e-302,-6.772909298804781e-302,-6.573706113545817e-302,-6.374502928286853e-302,-6.175299743027888e-302,-5.976096557768924e-302,-5.77689337250996e-302,-5.577690187250997e-302,-5.378487001992032e-302,-5.179283816733068e-302,-4.980080631474104e-302,-4.78087744621514e-302,-4.5816742609561755e-302,-4.382471075697211e-302,-4.183267890438247e-302,-3.984064705179283e-302,-3.784861519920319e-302,-3.585658334661355e-302,-3.3864551494023906e-302,-3.1872519641434264e-302,-2.988048778884462e-302,-2.788845593625498e-302,-2.589642408366534e-302,-2.39043922310757e-302,-2.1912360378486057e-302,-1.9920328525896415e-302,-1.7928296673306773e-302,-1.5936264820717133e-302,-1.394423296812749e-302,-1.1952201115537848e-302,-9.960169262948207e-303,-7.968137410358566e-303,-5.976105557768925e-303,-3.984073705179283e-303,-1.9920418525896414e-303,-9.999999999999456e-309]}

},{}],94:[function(require,module,exports){
module.exports={"expected":[691.4686750787736,691.4706690973605,691.4726671000032,691.4746691026537,691.4766751213604,691.4786851722681,691.4806992716194,691.4827174357553,691.4847396811155,691.4867660242401,691.4887964817698,691.4908310704468,691.4928698071158,691.4949127087247,691.4969597923252,691.4990110750747,691.5010665742357,691.5031263071774,691.5051902913768,691.5072585444194,691.5093310839998,691.511407927923,691.513489094105,691.5155746005743,691.5176644654717,691.5197587070529,691.5218573436877,691.5239603938622,691.5260678761796,691.5281798093603,691.5302962122441,691.5324171037907,691.5345425030804,691.5366724293154,691.5388069018212,691.540945940047,691.5430895635672,691.5452377920823,691.5473906454201,691.5495481435368,691.5517103065177,691.5538771545793,691.5560487080692,691.558224987468,691.5604060133904,691.5625918065864,691.5647823879422,691.5669777784814,691.5691779993667,691.5713830719006,691.573593017527,691.5758078578318,691.5780276145454,691.5802523095426,691.582481964845,691.5847166026214,691.5869562451896,691.5892009150182,691.5914506347268,691.5937054270884,691.5959653150302,691.5982303216352,691.600500470144,691.602775783955,691.6050562866277,691.6073420018823,691.6096329536025,691.6119291658364,691.6142306627981,691.6165374688693,691.6188496086008,691.6211671067142,691.6234899881033,691.6258182778357,691.6281520011546,691.6304911834802,691.6328358504119,691.6351860277291,691.6375417413938,691.6399030175514,691.6422698825336,691.6446423628589,691.6470204852355,691.6494042765623,691.651793763931,691.6541889746281,691.6565899361367,691.6589966761383,691.6614092225144,691.6638276033493,691.6662518469313,691.668681981755,691.671118036523,691.6735600401487,691.6760080217573,691.6784620106886,691.680922036499,691.6833881289638,691.6858603180784,691.6883386340621,691.6908231073587,691.69331376864,691.6958106488073,691.698313778994,691.7008231905678,691.7033389151333,691.7058609845341,691.7083894308554,691.7109242864262,691.7134655838225,691.7160133558688,691.7185676356411,691.7211284564698,691.723695851942,691.7262698559039,691.728850502464,691.7314378259953,691.7340318611385,691.7366326428047,691.7392402061777,691.7418545867174,691.7444758201627,691.7471039425344,691.7497389901375,691.7523809995653,691.7550300077016,691.7576860517244,691.7603491691083,691.7630193976283,691.765696775363,691.7683813406976,691.7710731323269,691.7737721892595,691.7764785508205,691.779192256655,691.7819133467323,691.7846418613481,691.7873778411295,691.7901213270374,691.7928723603712,691.7956309827722,691.7983972362266,691.8011711630708,691.8039528059937,691.8067422080422,691.8095394126241,691.8123444635122,691.8151574048491,691.8179782811508,691.820807137311,691.8236440186058,691.8264889706975,691.829342039639,691.8322032718789,691.8350727142656,691.8379504140516,691.8408364188989,691.8437307768833,691.8466335364989,691.8495447466638,691.8524644567243,691.8553927164604,691.8583295760905,691.8612750862766,691.8642292981302,691.8671922632168,691.8701640335617,691.8731446616551,691.8761342004586,691.8791327034098,691.8821402244283,691.885156817922,691.8881825387926,691.8912174424416,691.8942615847764,691.8973150222164,691.9003778116999,691.9034500106894,691.9065316771791,691.9096228697009,691.9127236473308,691.9158340696966,691.918954196984,691.9220840899438,691.925223809899,691.9283734187521,691.9315329789923,691.9347025537032,691.9378822065698,691.9410720018868,691.9442720045661,691.9474822801446,691.9507028947926,691.9539339153216,691.957175409193,691.9604274445263,691.9636900901077,691.9669634153989,691.970247490546,691.9735423863883,691.9768481744679,691.9801649270387,691.9834927170758,691.9868316182854,691.9901817051143,691.9935430527603,691.9969157371818,692.0002998351085,692.0036954240518,692.0071025823152,692.0105213890052,692.013951924043,692.0173942681745,692.0208485029826,692.0243147108988,692.0277929752144,692.031283380093,692.0347860105826,692.0383009526281,692.0418282930835,692.0453681197258,692.0489205212668,692.0524855873675,692.0560634086511,692.0596540767172,692.0632576841552,692.0668743245598,692.0705040925442,692.0741470837561,692.077803394892,692.0814731237134,692.0851563690617,692.0888532308744,692.0925638102018,692.0962882092231,692.1000265312636,692.1037788808114,692.1075453635357,692.1113260863038,692.1151211572001,692.1189306855439,692.122754781909,692.1265935581421,692.1304471273836,692.1343156040864,692.1381991040371,692.1420977443764,692.1460116436206,692.149940921683,692.1538856998959,692.1578461010332,692.1618222493336,692.1658142705231,692.16982229184,692.1738464420584,692.1778868515134,692.1819436521265,692.1860169774308,692.1901069625984,692.1942137444663,692.1983374615648,692.2024782541448,692.2066362642066,692.2108116355296,692.2150045137014,692.2192150461487,692.2234433821685,692.2276896729595,692.2319540716546,692.2362367333545,692.2405378151611,692.2448574762119,692.249195877716,692.2535531829897,692.2579295574933,692.2623251688694,692.2667401869807,692.2711747839498,692.2756291341996,692.280103414494,692.2845978039804,692.2891124842326,692.2936476392948,692.2982034557265,692.3027801226488,692.3073778317912,692.3119967775405,692.3166371569888,692.3212991699855,692.3259830191878,692.3306889101141,692.3354170511977,692.3401676538431,692.3449409324813,692.3497371046294,692.3545563909488,692.3593990153068,692.3642652048391,692.3691551900133,692.3740692046945,692.3790074862127,692.3839702754311,692.3889578168173,692.3939703585147,692.3990081524173,692.4040714542451,692.4091605236225,692.414275624158,692.4194170235257,692.4245849935501,692.4297798102917,692.435001754136,692.4402511098838,692.4455281668448,692.4508332189332,692.4561665647658,692.4615285077629,692.4669193562519,692.4723394235738,692.4777890281922,692.4832684938061,692.4887781494647,692.4943183296863,692.4998893745799,692.505491629971,692.5111254475299,692.5167911849045,692.5224892058561,692.5282198804002,692.5339835849502,692.5397807024658,692.545611622606,692.5514767418856,692.5573764638381,692.5633111991812,692.5692813659887,692.5752873898679,692.5813297041406,692.5874087500314,692.593524976861,692.5996788422453,692.6058708123007,692.6121013618565,692.6183709746728,692.6246801436662,692.6310293711425,692.6374191690363,692.643850059159,692.6503225734543,692.6568372542624,692.6633946545927,692.6699953384053,692.6766398809024,692.6833288688285,692.6900629007823,692.6968425875369,692.7036685523734,692.7105414314241,692.7174618740282,692.7244305431005,692.731448115512,692.7385152824843,692.7456327499989,692.7528012392195,692.7600214869314,692.7672942459949,692.7746202858175,692.7820003928417,692.7894353710517,692.7969260424992,692.8044732478487,692.8120778469436,692.8197407193943,692.8274627651889,692.8352449053269,692.8430880824792,692.8509932616726,692.858961431003,692.8669936023764,692.87509081228,692.8832541225845,692.891484621381,692.89978342385,692.908151673169,692.9165905414573,692.9251012307616,692.9336849740831,692.9423430364499,692.9510767160357,692.9598873453282,692.9687762923488,692.9777449619278,692.9867947970365,692.9959272801811,693.0051439348596,693.0144463270875,693.0238360669948,693.0333148104983,693.0428842610547,693.0525461714979,693.0623023459653,693.0721546419211,693.0821049722772,693.0921553076237,693.1023076785702,693.1125641782094,693.1229269647058,693.1333982640227,693.143980372791,693.1546756613336,693.1654865768511,693.1764156467837,693.1874654823573,693.1986387823287,693.2099383369417,693.2213670321096,693.2329278538397,693.2446238929161,693.25645834986,693.2684345401868,693.2805558999816,693.2928259918176,693.3052485110414,693.317827292454,693.3305663174168,693.3434697214168,693.3565418021263,693.3697870279957,693.3832100474233,693.3968156985499,693.4106090197271,693.4245952607198,693.4387798947017,693.4531686311144,693.4677674294657,693.482582514149,693.4976203903783,693.5128878613389,693.5283920466682,693.5441404023912,693.5601407424525,693.5764012619969,693.5929305625766,693.6097376794748,693.6268321113672,693.6442238525606,693.6619234280873,693.6799419319601,693.6982910689381,693.7169832001962,693.7360313933455,693.7554494773096,693.7752521026372,693.7954548079057,693.8160740929741,693.8371274999467,693.8586337028459,693.8806126071395,693.9030854604562,693.9260749760276,693.9496054706582,693.973703019322,693.9983956288514,694.0237134336178,694.0496889166337,694.0763571601454,694.1037561305648,694.1319270035474,694.1609145362021,694.1907674948776,694.2215391487906,694.2532878420448,694.2860776594698,694.3199792053754,694.3550705190045,694.3914381565351,694.4291784773669,694.4683991827972,694.5092211689507,694.5517807742754,694.5962325269252,694.6427525316943,694.6915426839114,694.7428359650884,694.7969031716804,694.8540615691151,694.9146861724756,694.9792246726965,695.0482175202787,695.1223254648501,695.2023681403441,695.2893794793034,695.3846896134714,695.4900500733514,695.6078330392857,695.7413643422674,695.895514902571,696.0778362920317,696.3009795923462,696.5886612464652,696.9941255179085,697.6872701884779,709.889355822726],"x":[1.0e-300,9.980079681474104e-301,9.960159362948208e-301,9.94023904442231e-301,9.920318725896415e-301,9.900398407370519e-301,9.880478088844623e-301,9.860557770318725e-301,9.840637451792829e-301,9.820717133266933e-301,9.800796814741037e-301,9.78087649621514e-301,9.760956177689243e-301,9.741035859163347e-301,9.721115540637451e-301,9.701195222111553e-301,9.681274903585657e-301,9.661354585059761e-301,9.641434266533865e-301,9.621513948007968e-301,9.601593629482072e-301,9.581673310956176e-301,9.56175299243028e-301,9.541832673904382e-301,9.521912355378486e-301,9.50199203685259e-301,9.482071718326694e-301,9.462151399800796e-301,9.4422310812749e-301,9.422310762749004e-301,9.402390444223108e-301,9.38247012569721e-301,9.362549807171315e-301,9.342629488645419e-301,9.322709170119523e-301,9.302788851593625e-301,9.282868533067729e-301,9.262948214541833e-301,9.243027896015937e-301,9.22310757749004e-301,9.203187258964143e-301,9.183266940438247e-301,9.163346621912351e-301,9.143426303386454e-301,9.123505984860558e-301,9.103585666334662e-301,9.083665347808766e-301,9.063745029282868e-301,9.043824710756972e-301,9.023904392231076e-301,9.00398407370518e-301,8.984063755179284e-301,8.964143436653386e-301,8.94422311812749e-301,8.924302799601594e-301,8.904382481075698e-301,8.8844621625498e-301,8.864541844023905e-301,8.844621525498009e-301,8.824701206972113e-301,8.804780888446215e-301,8.784860569920319e-301,8.764940251394423e-301,8.745019932868527e-301,8.725099614342629e-301,8.705179295816733e-301,8.685258977290837e-301,8.665338658764941e-301,8.645418340239043e-301,8.625498021713147e-301,8.605577703187251e-301,8.585657384661355e-301,8.565737066135458e-301,8.545816747609562e-301,8.525896429083666e-301,8.50597611055777e-301,8.486055792031872e-301,8.466135473505976e-301,8.44621515498008e-301,8.426294836454184e-301,8.406374517928286e-301,8.38645419940239e-301,8.366533880876494e-301,8.346613562350598e-301,8.3266932438247e-301,8.306772925298805e-301,8.286852606772909e-301,8.266932288247013e-301,8.247011969721115e-301,8.227091651195219e-301,8.207171332669323e-301,8.187251014143427e-301,8.16733069561753e-301,8.147410377091633e-301,8.127490058565737e-301,8.107569740039841e-301,8.087649421513944e-301,8.067729102988048e-301,8.047808784462152e-301,8.027888465936256e-301,8.00796814741036e-301,7.988047828884462e-301,7.968127510358566e-301,7.94820719183267e-301,7.928286873306774e-301,7.908366554780876e-301,7.88844623625498e-301,7.868525917729084e-301,7.848605599203188e-301,7.82868528067729e-301,7.808764962151395e-301,7.788844643625499e-301,7.768924325099603e-301,7.749004006573705e-301,7.729083688047809e-301,7.709163369521913e-301,7.689243050996017e-301,7.669322732470119e-301,7.649402413944223e-301,7.629482095418327e-301,7.609561776892431e-301,7.589641458366533e-301,7.569721139840637e-301,7.549800821314741e-301,7.529880502788845e-301,7.509960184262948e-301,7.490039865737052e-301,7.470119547211156e-301,7.450199228685259e-301,7.430278910159363e-301,7.410358591633466e-301,7.39043827310757e-301,7.370517954581673e-301,7.350597636055777e-301,7.33067731752988e-301,7.310756999003984e-301,7.2908366804780875e-301,7.2709163619521915e-301,7.250996043426295e-301,7.231075724900399e-301,7.211155406374502e-301,7.191235087848606e-301,7.171314769322709e-301,7.151394450796813e-301,7.131474132270916e-301,7.11155381374502e-301,7.091633495219123e-301,7.071713176693227e-301,7.051792858167331e-301,7.0318725396414344e-301,7.0119522211155384e-301,6.9920319025896416e-301,6.9721115840637456e-301,6.952191265537849e-301,6.932270947011953e-301,6.912350628486056e-301,6.89243030996016e-301,6.872509991434263e-301,6.852589672908367e-301,6.83266935438247e-301,6.812749035856574e-301,6.792828717330677e-301,6.772908398804781e-301,6.7529880802788845e-301,6.7330677617529885e-301,6.713147443227092e-301,6.693227124701196e-301,6.673306806175299e-301,6.653386487649403e-301,6.633466169123506e-301,6.61354585059761e-301,6.593625532071713e-301,6.573705213545817e-301,6.55378489501992e-301,6.533864576494024e-301,6.5139442579681274e-301,6.494023939442231e-301,6.4741036209163346e-301,6.4541833023904386e-301,6.434262983864542e-301,6.414342665338646e-301,6.394422346812749e-301,6.374502028286853e-301,6.354581709760956e-301,6.33466139123506e-301,6.314741072709163e-301,6.294820754183267e-301,6.27490043565737e-301,6.254980117131474e-301,6.2350597986055775e-301,6.2151394800796815e-301,6.195219161553785e-301,6.175298843027889e-301,6.155378524501992e-301,6.135458205976096e-301,6.115537887450199e-301,6.095617568924303e-301,6.075697250398407e-301,6.05577693187251e-301,6.035856613346614e-301,6.015936294820717e-301,5.996015976294821e-301,5.976095657768924e-301,5.956175339243028e-301,5.9362550207171316e-301,5.9163347021912356e-301,5.896414383665339e-301,5.876494065139443e-301,5.856573746613546e-301,5.83665342808765e-301,5.816733109561753e-301,5.796812791035857e-301,5.77689247250996e-301,5.756972153984064e-301,5.737051835458167e-301,5.717131516932271e-301,5.6972111984063745e-301,5.6772908798804785e-301,5.657370561354582e-301,5.637450242828686e-301,5.617529924302789e-301,5.597609605776893e-301,5.577689287250996e-301,5.5577689687251e-301,5.537848650199203e-301,5.517928331673307e-301,5.49800801314741e-301,5.478087694621514e-301,5.458167376095617e-301,5.438247057569721e-301,5.4183267390438246e-301,5.3984064205179285e-301,5.378486101992032e-301,5.358565783466136e-301,5.338645464940239e-301,5.318725146414343e-301,5.298804827888446e-301,5.27888450936255e-301,5.258964190836653e-301,5.239043872310757e-301,5.21912355378486e-301,5.199203235258964e-301,5.1792829167330675e-301,5.1593625982071715e-301,5.139442279681275e-301,5.119521961155379e-301,5.099601642629482e-301,5.079681324103586e-301,5.05976100557769e-301,5.039840687051793e-301,5.019920368525897e-301,5.00000005e-301,4.980079731474104e-301,4.960159412948207e-301,4.940239094422311e-301,4.920318775896414e-301,4.900398457370518e-301,4.8804781388446215e-301,4.8605578203187255e-301,4.840637501792829e-301,4.820717183266933e-301,4.800796864741036e-301,4.78087654621514e-301,4.760956227689243e-301,4.741035909163347e-301,4.72111559063745e-301,4.701195272111554e-301,4.681274953585657e-301,4.661354635059761e-301,4.6414343165338645e-301,4.6215139980079685e-301,4.601593679482072e-301,4.581673360956176e-301,4.561753042430279e-301,4.541832723904383e-301,4.521912405378486e-301,4.50199208685259e-301,4.482071768326693e-301,4.462151449800797e-301,4.4422311312749e-301,4.422310812749004e-301,4.402390494223107e-301,4.382470175697211e-301,4.3625498571713145e-301,4.3426295386454185e-301,4.322709220119522e-301,4.302788901593626e-301,4.282868583067729e-301,4.262948264541833e-301,4.243027946015936e-301,4.22310762749004e-301,4.203187308964143e-301,4.183266990438247e-301,4.16334667191235e-301,4.143426353386454e-301,4.1235060348605575e-301,4.1035857163346615e-301,4.0836653978087654e-301,4.063745079282869e-301,4.043824760756973e-301,4.023904442231076e-301,4.00398412370518e-301,3.984063805179283e-301,3.964143486653387e-301,3.94422316812749e-301,3.924302849601594e-301,3.904382531075697e-301,3.884462212549801e-301,3.864541894023904e-301,3.844621575498008e-301,3.8247012569721115e-301,3.8047809384462155e-301,3.784860619920319e-301,3.764940301394423e-301,3.745019982868526e-301,3.7250996643426294e-301,3.705179345816733e-301,3.6852590272908366e-301,3.66533870876494e-301,3.6454183902390437e-301,3.6254980717131477e-301,3.6055777531872513e-301,3.585657434661355e-301,3.5657371161354584e-301,3.545816797609562e-301,3.5258964790836656e-301,3.505976160557769e-301,3.4860558420318727e-301,3.4661355235059763e-301,3.44621520498008e-301,3.4262948864541835e-301,3.406374567928287e-301,3.3864542494023906e-301,3.366533930876494e-301,3.3466136123505978e-301,3.3266932938247014e-301,3.306772975298805e-301,3.2868526567729085e-301,3.266932338247012e-301,3.2470120197211157e-301,3.2270917011952192e-301,3.207171382669323e-301,3.1872510641434264e-301,3.16733074561753e-301,3.1474104270916335e-301,3.127490108565737e-301,3.1075697900398407e-301,3.0876494715139443e-301,3.067729152988048e-301,3.0478088344621514e-301,3.027888515936255e-301,3.0079681974103586e-301,2.988047878884462e-301,2.9681275603585657e-301,2.9482072418326693e-301,2.928286923306773e-301,2.9083666047808765e-301,2.88844628625498e-301,2.8685259677290836e-301,2.848605649203187e-301,2.8286853306772908e-301,2.8087650121513944e-301,2.788844693625498e-301,2.7689243750996015e-301,2.749004056573705e-301,2.7290837380478087e-301,2.7091634195219122e-301,2.689243100996016e-301,2.6693227824701194e-301,2.649402463944223e-301,2.629482145418327e-301,2.6095618268924305e-301,2.589641508366534e-301,2.5697211898406377e-301,2.5498008713147413e-301,2.529880552788845e-301,2.5099602342629484e-301,2.490039915737052e-301,2.4701195972111556e-301,2.450199278685259e-301,2.4302789601593627e-301,2.4103586416334663e-301,2.39043832310757e-301,2.3705180045816735e-301,2.350597686055777e-301,2.3306773675298806e-301,2.310757049003984e-301,2.2908367304780878e-301,2.2709164119521913e-301,2.250996093426295e-301,2.2310757749003985e-301,2.211155456374502e-301,2.1912351378486056e-301,2.1713148193227092e-301,2.151394500796813e-301,2.1314741822709164e-301,2.11155386374502e-301,2.0916335452191235e-301,2.071713226693227e-301,2.0517929081673307e-301,2.0318725896414343e-301,2.011952271115538e-301,1.9920319525896414e-301,1.972111634063745e-301,1.9521913155378486e-301,1.932270997011952e-301,1.9123506784860557e-301,1.8924303599601593e-301,1.872510041434263e-301,1.8525897229083667e-301,1.8326694043824702e-301,1.8127490858565738e-301,1.7928287673306774e-301,1.772908448804781e-301,1.7529881302788845e-301,1.7330678117529881e-301,1.7131474932270917e-301,1.6932271747011953e-301,1.6733068561752988e-301,1.6533865376494024e-301,1.633466219123506e-301,1.6135459005976096e-301,1.5936255820717132e-301,1.5737052635458167e-301,1.5537849450199203e-301,1.5338646264940239e-301,1.5139443079681275e-301,1.494023989442231e-301,1.4741036709163346e-301,1.4541833523904382e-301,1.4342630338645418e-301,1.4143427153386456e-301,1.3944223968127491e-301,1.3745020782868527e-301,1.3545817597609563e-301,1.3346614412350599e-301,1.3147411227091634e-301,1.294820804183267e-301,1.2749004856573706e-301,1.2549801671314742e-301,1.2350598486055777e-301,1.2151395300796813e-301,1.195219211553785e-301,1.1752988930278885e-301,1.155378574501992e-301,1.1354582559760956e-301,1.1155379374501992e-301,1.0956176189243028e-301,1.0756973003984064e-301,1.05577698187251e-301,1.0358566633466135e-301,1.015936344820717e-301,9.960160262948207e-302,9.760957077689242e-302,9.561753892430278e-302,9.362550707171314e-302,9.163347521912351e-302,8.964144336653387e-302,8.764941151394422e-302,8.565737966135458e-302,8.366534780876494e-302,8.16733159561753e-302,7.968128410358566e-302,7.768925225099602e-302,7.569722039840638e-302,7.370518854581674e-302,7.171315669322709e-302,6.972112484063745e-302,6.772909298804781e-302,6.573706113545817e-302,6.374502928286853e-302,6.175299743027888e-302,5.976096557768924e-302,5.77689337250996e-302,5.577690187250997e-302,5.378487001992032e-302,5.179283816733068e-302,4.980080631474104e-302,4.78087744621514e-302,4.5816742609561755e-302,4.382471075697211e-302,4.183267890438247e-302,3.984064705179283e-302,3.784861519920319e-302,3.585658334661355e-302,3.3864551494023906e-302,3.1872519641434264e-302,2.988048778884462e-302,2.788845593625498e-302,2.589642408366534e-302,2.39043922310757e-302,2.1912360378486057e-302,1.9920328525896415e-302,1.7928296673306773e-302,1.5936264820717133e-302,1.394423296812749e-302,1.1952201115537848e-302,9.960169262948207e-303,7.968137410358566e-303,5.976105557768925e-303,3.984073705179283e-303,1.9920418525896414e-303,9.999999999999456e-309]}

},{}],95:[function(require,module,exports){
(function (__filename){(function (){
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

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
var isPositiveZero = require( '@stdlib/math/base/assert/is-positive-zero' );
var EPS = require( '@stdlib/constants/float64/eps' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var abs = require( '@stdlib/math/base/special/abs' );
var acsch = require( './../lib' );


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
	t.strictEqual( typeof acsch, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function computes the hyperbolic arccosecant on the interval `[-1e-308,-1e-300]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = tinyNegative.x;
	expected = tinyNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = acsch( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic arccosecant on the interval `[1e-300,1e-308]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = tinyPositive.x;
	expected = tinyPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = acsch( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic arccosecant on the interval `[-0.8,0.8]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = smaller.x;
	expected = smaller.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = acsch( x[i] );
		if ( expected[ i ] === null ) {
			t.equal( y, PINF, 'x: '+x[i]+'. E: +infinity' );
		} else if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic arccosecant on the interval `[-1.0,-0.8]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = smallNegative.x;
	expected = smallNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = acsch( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic arccosecant on the interval `[0.8,1.0]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = smallPositive.x;
	expected = smallPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = acsch( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic arccosecant on the interval `[-3.0,-1.0]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = mediumNegative.x;
	expected = mediumNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = acsch( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic arccosecant on the interval `[1.0,3.0]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = mediumPositive.x;
	expected = mediumPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = acsch( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic arccosecant on the interval `[3.0,28.0]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = largePositive.x;
	expected = largePositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = acsch( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic arccosecant on the interval `[-28.0,-3.0]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = largeNegative.x;
	expected = largeNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = acsch( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic arccosecant on the interval `[28.0,100.0]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = largerPositive.x;
	expected = largerPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = acsch( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic arccosecant on the interval `[-100.0,-28.0]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = largerNegative.x;
	expected = largerNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = acsch( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic arccosecant on the interval `[-1e200,-1e208]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = hugeNegative.x;
	expected = hugeNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = acsch( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic arccosecant on the interval `[1e300,1e308]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = hugePositive.x;
	expected = hugePositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = acsch( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function returns `NaN` if provided `NaN`', function test( t ) {
	var v = acsch( NaN );
	t.equal( isnan( v ), true, 'returns NaN' );
	t.end();
});

tape( 'the function returns `+infinity` if provided `+0`', function test( t ) {
	var v = acsch( +0.0 );
	t.equal( v, PINF, 'returns +infinity' );
	t.end();
});

tape( 'the function returns `-infinity` if provided `-0`', function test( t ) {
	var v = acsch( -0.0 );
	t.equal( v, NINF, 'returns -infinity' );
	t.end();
});

tape( 'the function returns `-0` if provided `-infinity`', function test( t ) {
	var v = acsch( NINF );
	t.equal( isNegativeZero( v ), true, 'returns -0' );
	t.end();
});

tape( 'the function returns `+0` if provided `+infinity`', function test( t ) {
	var v = acsch( PINF );
	t.equal( isPositiveZero( v ), true, 'returns +0' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/acsch/test/test.js")
},{"./../lib":80,"./fixtures/julia/huge_negative.json":82,"./fixtures/julia/huge_positive.json":83,"./fixtures/julia/large_negative.json":84,"./fixtures/julia/large_positive.json":85,"./fixtures/julia/larger_negative.json":86,"./fixtures/julia/larger_positive.json":87,"./fixtures/julia/medium_negative.json":88,"./fixtures/julia/medium_positive.json":89,"./fixtures/julia/small_negative.json":90,"./fixtures/julia/small_positive.json":91,"./fixtures/julia/smaller.json":92,"./fixtures/julia/tiny_negative.json":93,"./fixtures/julia/tiny_positive.json":94,"@stdlib/constants/float64/eps":62,"@stdlib/constants/float64/ninf":65,"@stdlib/constants/float64/pinf":66,"@stdlib/math/base/assert/is-nan":72,"@stdlib/math/base/assert/is-negative-zero":74,"@stdlib/math/base/assert/is-positive-zero":76,"@stdlib/math/base/special/abs":78,"tape":293}],96:[function(require,module,exports){
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
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
var isPositiveZero = require( '@stdlib/math/base/assert/is-positive-zero' );
var EPS = require( '@stdlib/constants/float64/eps' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var abs = require( '@stdlib/math/base/special/abs' );
var tryRequire = require( '@stdlib/utils/try-require' );


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


// VARIABLES //

var acsch = tryRequire( resolve( __dirname, './../lib/native.js' ) );
var opts = {
	'skip': ( acsch instanceof Error )
};


// TESTS //

tape( 'main export is a function', opts, function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof acsch, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function computes the hyperbolic arccosecant on the interval `[-1e-308,-1e-300]`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = tinyNegative.x;
	expected = tinyNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = acsch( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic arccosecant on the interval `[1e-300,1e-308]`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = tinyPositive.x;
	expected = tinyPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = acsch( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic arccosecant on the interval `[-0.8,0.8]`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = smaller.x;
	expected = smaller.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = acsch( x[i] );
		if ( expected[ i ] === null ) {
			t.equal( y, PINF, 'x: '+x[i]+'. E: +infinity' );
		} else if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic arccosecant on the interval `[-1.0,-0.8]`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = smallNegative.x;
	expected = smallNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = acsch( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic arccosecant on the interval `[0.8,1.0]`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = smallPositive.x;
	expected = smallPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = acsch( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic arccosecant on the interval `[-3.0,-1.0]`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = mediumNegative.x;
	expected = mediumNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = acsch( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic arccosecant on the interval `[1.0,3.0]`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = mediumPositive.x;
	expected = mediumPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = acsch( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic arccosecant on the interval `[3.0,28.0]`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = largePositive.x;
	expected = largePositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = acsch( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic arccosecant on the interval `[-28.0,-3.0]`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = largeNegative.x;
	expected = largeNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = acsch( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic arccosecant on the interval `[28.0,100.0]`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = largerPositive.x;
	expected = largerPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = acsch( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic arccosecant on the interval `[-100.0,-28.0]`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = largerNegative.x;
	expected = largerNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = acsch( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic arccosecant on the interval `[-1e200,-1e208]`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = hugeNegative.x;
	expected = hugeNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = acsch( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic arccosecant on the interval `[1e300,1e308]`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = hugePositive.x;
	expected = hugePositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = acsch( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function returns `NaN` if provided `NaN`', opts, function test( t ) {
	var v = acsch( NaN );
	t.equal( isnan( v ), true, 'returns NaN' );
	t.end();
});

tape( 'the function returns `+infinity` if provided `+0`', opts, function test( t ) {
	var v = acsch( +0.0 );
	t.equal( v, PINF, 'returns +infinity' );
	t.end();
});

tape( 'the function returns `-infinity` if provided `-0`', opts, function test( t ) {
	var v = acsch( -0.0 );
	t.equal( v, NINF, 'returns -infinity' );
	t.end();
});

tape( 'the function returns `-0` if provided `-infinity`', opts, function test( t ) {
	var v = acsch( NINF );
	t.equal( isNegativeZero( v ), true, 'returns -0' );
	t.end();
});

tape( 'the function returns `+0` if provided `+infinity`', opts, function test( t ) {
	var v = acsch( PINF );
	t.equal( isPositiveZero( v ), true, 'returns +0' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/acsch/test/test.native.js","/lib/node_modules/@stdlib/math/base/special/acsch/test")
},{"./fixtures/julia/huge_negative.json":82,"./fixtures/julia/huge_positive.json":83,"./fixtures/julia/large_negative.json":84,"./fixtures/julia/large_positive.json":85,"./fixtures/julia/larger_negative.json":86,"./fixtures/julia/larger_positive.json":87,"./fixtures/julia/medium_negative.json":88,"./fixtures/julia/medium_positive.json":89,"./fixtures/julia/small_negative.json":90,"./fixtures/julia/small_positive.json":91,"./fixtures/julia/smaller.json":92,"./fixtures/julia/tiny_negative.json":93,"./fixtures/julia/tiny_positive.json":94,"@stdlib/constants/float64/eps":62,"@stdlib/constants/float64/ninf":65,"@stdlib/constants/float64/pinf":66,"@stdlib/math/base/assert/is-nan":72,"@stdlib/math/base/assert/is-negative-zero":74,"@stdlib/math/base/assert/is-positive-zero":76,"@stdlib/math/base/special/abs":78,"@stdlib/utils/try-require":161,"path":175,"tape":293}],97:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Compute the hyperbolic arcsine of a double-precision floating-point number.
*
* @module @stdlib/math/base/special/asinh
*
* @example
* var asinh = require( '@stdlib/math/base/special/asinh' );
*
* var v = asinh( 0.0 );
* // returns 0.0
*
* v = asinh( 2.0 );
* // returns ~1.444
*
* v = asinh( -2.0 );
* // returns ~-1.444
*
* v = asinh( NaN );
* // returns NaN
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
*
*
* ## Notice
*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/12.2.0/lib/msun/src/s_asinh.c?view=markup}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright (C) 2004 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunPro, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ```
*/

'use strict';

// MODULES //

var isinfinite = require( '@stdlib/math/base/assert/is-infinite' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var LN2 = require( '@stdlib/constants/float64/ln-two' );
var ln = require( '@stdlib/math/base/special/ln' );


// VARIABLES //

var NEAR_ZERO = 1.0 / (1 << 28); // 2**-28
var HUGE = 1 << 28; // 2**28


// MAIN //

/**
* Computes the hyperbolic arcsine of a double-precision floating-point number.
*
* ## Method
*
* Based on
*
* ```tex
* \operatorname{asinh}(x) = \operatorname{sgn}(x) \cdot \log \left( |x| + \sqrt{x^2 + 1} \right)
* ```
*
* we have
*
* ```tex
* \operatorname{asinh}(x) = \begin{cases}
* x  & \text{ if }  1+x^2 =1, \\
* \operatorname{sgn}(x) \cdot \left( \log(x) + \tfrac{\ln}{2} \right) & \text{ if large } |x| \\
* \operatorname{sgn}(x) \cdot \log\left( 2 |x| + 1 / ( |x|+ \sqrt{x^2+1} ) \right) & \text{ if } |x| > 2 \\
* \operatorname{sgn}(x) \cdot \operatorname{log1p}\left( |x| + \tfrac{x^2}{1 + \sqrt{1+x^2}} \right) & \text{otherwise}
* \end{cases}
* ```
*
* @param {number} x - input value
* @returns {number} hyperbolic arcsine
*
* @example
* var v = asinh( 0.0 );
* // returns 0.0
*
* @example
* var v = asinh( 2.0 );
* // returns ~1.444
*
* @example
* var v = asinh( -2.0 );
* // returns ~-1.444
*
* @example
* var v = asinh( NaN );
* // returns NaN
*/
function asinh( x ) {
	var sgn;
	var xx;
	var t;
	if ( isnan( x ) || isinfinite( x ) ) {
		return x;
	}
	if ( x < 0.0 ) {
		x = -x;
		sgn = true;
	}
	// Case: |x| < 2**-28
	if ( x < NEAR_ZERO ) {
		t = x;
	}
	// Case: |x| > 2**28
	else if ( x > HUGE ) {
		t = ln( x ) + LN2;
	}
	// Case: 2**28 > |x| > 2.0
	else if ( x > 2.0 ) {
		t = ln( (2.0*x) + ( 1.0 / (sqrt( (x*x) + 1.0 ) + x) ) );
	}
	// Case: 2.0 > |x| > 2**-28
	else {
		xx = x * x;
		t = log1p( x + ( xx/(1.0 + sqrt(1.0 + xx)) ) );
	}
	return ( sgn ) ? -t : t;
}


// EXPORTS //

module.exports = asinh;

},{"@stdlib/constants/float64/ln-two":64,"@stdlib/math/base/assert/is-infinite":70,"@stdlib/math/base/assert/is-nan":72,"@stdlib/math/base/special/ln":99,"@stdlib/math/base/special/log1p":103,"@stdlib/math/base/special/sqrt":106}],99:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Evaluate the natural logarithm of a double-precision floating-point number.
*
* @module @stdlib/math/base/special/ln
*
* @example
* var ln = require( '@stdlib/math/base/special/ln' );
*
* var v = ln( 4.0 );
* // returns ~1.386
*
* v = ln( 0.0 );
* // returns -Infinity
*
* v = ln( Infinity );
* // returns Infinity
*
* v = ln( NaN );
* // returns NaN
*
* v = ln( -4.0 );
* // returns NaN
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
*
*
* ## Notice
*
* The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_log.c}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunPro, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ```
*/

'use strict';

// MODULES //

var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var BIAS = require( '@stdlib/constants/float64/exponent-bias' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var polyvalP = require( './polyval_p.js' );
var polyvalQ = require( './polyval_q.js' );


// VARIABLES //

var LN2_HI = 6.93147180369123816490e-01; // 3FE62E42 FEE00000
var LN2_LO = 1.90821492927058770002e-10; // 3DEA39EF 35793C76
var TWO54 = 1.80143985094819840000e+16;  // 0x43500000, 0x00000000
var ONE_THIRD = 0.33333333333333333;

// 0x000fffff = 1048575 => 0 00000000000 11111111111111111111
var HIGH_SIGNIFICAND_MASK = 0x000fffff|0; // asm type annotation

// 0x7ff00000 = 2146435072 => 0 11111111111 00000000000000000000 => biased exponent: 2047 = 1023+1023 => 2^1023
var HIGH_MAX_NORMAL_EXP = 0x7ff00000|0; // asm type annotation

// 0x00100000 = 1048576 => 0 00000000001 00000000000000000000 => biased exponent: 1 = -1022+1023 => 2^-1022
var HIGH_MIN_NORMAL_EXP = 0x00100000|0; // asm type annotation

// 0x3ff00000 = 1072693248 => 0 01111111111 00000000000000000000 => biased exponent: 1023 = 0+1023 => 2^0 = 1
var HIGH_BIASED_EXP_0 = 0x3ff00000|0; // asm type annotation


// MAIN //

/**
* Evaluates the natural logarithm of a double-precision floating-point number.
*
* @param {NonNegativeNumber} x - input value
* @returns {number} function value
*
* @example
* var v = ln( 4.0 );
* // returns ~1.386
*
* @example
* var v = ln( 0.0 );
* // returns -Infinity
*
* @example
* var v = ln( Infinity );
* // returns Infinity
*
* @example
* var v = ln( NaN );
* // returns NaN
*
* @example
* var v = ln( -4.0 );
* // returns NaN
*/
function ln( x ) {
	var hfsq;
	var hx;
	var t2;
	var t1;
	var k;
	var R;
	var f;
	var i;
	var j;
	var s;
	var w;
	var z;

	if ( x === 0.0 ) {
		return NINF;
	}
	if ( isnan( x ) || x < 0.0 ) {
		return NaN;
	}
	hx = getHighWord( x );
	k = 0|0; // asm type annotation
	if ( hx < HIGH_MIN_NORMAL_EXP ) {
		// Case: 0 < x < 2**-1022
		k -= 54|0; // asm type annotation

		// Subnormal number, scale up `x`:
		x *= TWO54;
		hx = getHighWord( x );
	}
	if ( hx >= HIGH_MAX_NORMAL_EXP ) {
		return x + x;
	}
	k += ( ( hx>>20 ) - BIAS )|0; // asm type annotation
	hx &= HIGH_SIGNIFICAND_MASK;
	i = ( (hx+0x95f64) & 0x100000 )|0; // asm type annotation

	// Normalize `x` or `x/2`...
	x = setHighWord( x, hx|(i^HIGH_BIASED_EXP_0) );
	k += ( i>>20 )|0; // asm type annotation
	f = x - 1.0;
	if ( (HIGH_SIGNIFICAND_MASK&(2+hx)) < 3 ) {
		// Case: -2**-20 <= f < 2**-20
		if ( f === 0.0 ) {
			if ( k === 0 ) {
				return 0.0;
			}
			return (k * LN2_HI) + (k * LN2_LO);
		}
		R = f * f * ( 0.5 - (ONE_THIRD*f) );
		if ( k === 0 ) {
			return f - R;
		}
		return (k * LN2_HI) - ( (R-(k*LN2_LO)) - f );
	}
	s = f / (2.0 + f);
	z = s * s;
	i = ( hx - 0x6147a )|0; // asm type annotation
	w = z * z;
	j = ( 0x6b851 - hx )|0; // asm type annotation
	t1 = w * polyvalP( w );
	t2 = z * polyvalQ( w );
	i |= j;
	R = t2 + t1;
	if ( i > 0 ) {
		hfsq = 0.5 * f * f;
		if ( k === 0 ) {
			return f - ( hfsq - (s * (hfsq+R)) );
		}
		return (k * LN2_HI) - ( hfsq - ((s*(hfsq+R))+(k*LN2_LO)) - f );
	}
	if ( k === 0 ) {
		return f - (s*(f-R));
	}
	return (k * LN2_HI) - ( ( (s*(f-R)) - (k*LN2_LO) ) - f );
}


// EXPORTS //

module.exports = ln;

},{"./polyval_p.js":101,"./polyval_q.js":102,"@stdlib/constants/float64/exponent-bias":63,"@stdlib/constants/float64/ninf":65,"@stdlib/math/base/assert/is-nan":72,"@stdlib/number/float64/base/get-high-word":111,"@stdlib/number/float64/base/set-high-word":114}],101:[function(require,module,exports){
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

/* This is a generated file. Do not edit directly. */
'use strict';

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
		return 0.3999999999940942;
	}
	return 0.3999999999940942 + (x * (0.22222198432149784 + (x * 0.15313837699209373))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],102:[function(require,module,exports){
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

/* This is a generated file. Do not edit directly. */
'use strict';

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
		return 0.6666666666666735;
	}
	return 0.6666666666666735 + (x * (0.2857142874366239 + (x * (0.1818357216161805 + (x * 0.14798198605116586))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],103:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Evaluate the natural logarithm of \\(1+x\\).
*
* @module @stdlib/math/base/special/log1p
*
* @example
* var log1p = require( '@stdlib/math/base/special/log1p' );
*
* var v = log1p( 4.0 );
* // returns ~1.609
*
* v = log1p( -1.0 );
* // returns -Infinity
*
* v = log1p( 0.0 );
* // returns 0.0
*
* v = log1p( -0.0 );
* // returns -0.0
*
* v = log1p( -2.0 );
* // returns NaN
*
* v = log1p( NaN );
* // returns NaN
*/

// MODULES //

var log1p = require( './main.js' );


// EXPORTS //

module.exports = log1p;

},{"./main.js":104}],104:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The following copyright, license, and long comment were part of the original implementation available as part of [FDLIBM]{@link http://www.netlib.org/fdlibm/s_log1p.c}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunPro, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ```
*/

'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var FLOAT64_EXPONENT_BIAS = require( '@stdlib/constants/float64/exponent-bias' );
var polyval = require( './polyval_lp.js' );


// VARIABLES //

// High and low words of ln(2):
var LN2_HI = 6.93147180369123816490e-01; // 0x3fe62e42 0xfee00000
var LN2_LO = 1.90821492927058770002e-10; // 0x3dea39ef 0x35793c76

// sqrt(2)-1:
var SQRT2M1 = 4.142135623730950488017e-01; // 0x3fda8279 0x99fcef34

// sqrt(2)/2-1:
var SQRT2HALFM1 = -2.928932188134524755992e-01; // 0xbfd2bec3 0x33018866

// 2**-29:
var SMALL = 1.862645149230957e-09; // 0x3e200000 0x00000000

// 2**-54:
var TINY = 5.551115123125783e-17;

// Max integer (unsafe) => 2**53:
var TWO53 = 9007199254740992;

// 2/3:
var TWO_THIRDS = 6.666666666666666666e-01;


// MAIN //

/**
* Evaluates the natural logarithm of \\(1+x\\).
*
* ## Method
*
* 1.  Argument Reduction: find \\(k\\) and \\(f\\) such that
*
*     ```tex
*     1+x = 2^k (1+f)
*     ```
*
*     where
*
*     ```tex
*     \frac{\sqrt{2}}{2} < 1+f < \sqrt{2}
*     ```
*
*     <!-- <note> -->
*
*     If \\(k=0\\), then \\(f=x\\) is exact. However, if \\(k \neq 0\\), then \\(f\\) may not be representable exactly. In that case, a correction term is needed. Let
*
*     ```tex
*     u = \operatorname{round}(1+x)
*     ```
*
*     and
*
*     ```tex
*     c = (1+x) - u
*     ```
*
*     then
*
*     ```tex
*     \ln (1+x) - \ln u \approx \frac{c}{u}
*     ```
*
*     We can thus proceed to compute \\(\ln(u)\\), and add back the correction term \\(c/u\\).
*
*     <!-- </note> -->
*
*     <!-- <note> -->
*
*     When \\(x > 2^{53}\\), one can simply return \\(\ln(x)\\).
*
*     <!-- </note> -->
*
* 2.  Approximation of \\(\operatorname{log1p}(f)\\). Let
*
*     ```tex
*     s = \frac{f}{2+f}
*     ```
*
*     based on
*
*     ```tex
*     \begin{align*}
*     \ln 1+f &= \ln (1+s) - \ln (1-s) \\
*             &= 2s + \frac{2}{3} s^3 + \frac{2}{5} s^5 + ... \\
*             &= 2s + sR \\
*     \end{align*}
*     ```
*
*     We use a special Reme algorithm on \\(\[0,0.1716\]\\) to generate a polynomial of degree \\(14\\) to approximate \\(R\\). The maximum error of this polynomial approximation is bounded by \\(2^{-58.45}\\). In other words,
*
*     ```tex
*     R(z) \approx \mathrm{Lp}_1 s^2 + \mathrm{Lp}_2 s^4 + \mathrm{Lp}_3 s^6 + \mathrm{Lp}_4 s^8 + \mathrm{Lp}_5 s^{10} + \mathrm{Lp}_6 s^{12} + \mathrm{Lp}_7 s^{14}
*     ```
*
*     and
*
*     ```tex
*     | \mathrm{Lp}_1 s^2 + \ldots + \mathrm{Lp}_7 s^14 - R(z) | \leq 2^{-58.45}
*     ```
*
*     <!-- <note> -->
*
*     The values of \\(Lp1\\) to \\(Lp7\\) may be found in the source.
*
*     <!-- </note> -->
*
*     Note that
*
*     ```tex
*     \begin{align*}
*     2s &= f - sf \\
*        &= f - \frac{f^2}{2} + s \frac{f^2}{2} \\
*     \end{align*}
*     ```
*
*     In order to guarantee error in \\(\ln\\) below \\(1\ \mathrm{ulp}\\), we compute the log by
*
*     ```tex
*     \operatorname{log1p}(f) = f - \biggl(\frac{f^2}{2} - s\biggl(\frac{f^2}{2}+R\biggr)\biggr)
*     ```
*
* 3.  Finally,
*
*     ```tex
*     \begin{align*}
*     \operatorname{log1p}(x) &= k \cdot \mathrm{ln2} + \operatorname{log1p}(f) \\
*     &= k \cdot \mathrm{ln2}_{hi}+\biggl(f-\biggl(\frac{f^2}{2}-\biggl(s\biggl(\frac{f^2}{2}+R\biggr)+k \cdot \mathrm{ln2}_{lo}\biggr)\biggr)\biggr) \\
*     \end{align*}
*     ```
*
*     Here \\(\mathrm{ln2}\\) is split into two floating point numbers:
*
*     ```tex
*     \mathrm{ln2}_{hi} + \mathrm{ln2}_{lo}
*     ```
*
*     where \\(n \cdot \mathrm{ln2}_{hi}\\) is always exact for \\(|n| < 2000\\).
*
* ## Special Cases
*
* -   \\(\operatorname{log1p}(x) = \mathrm{NaN}\\) with signal if \\(x < -1\\) (including \\(-\infty\\))
* -   \\(\operatorname{log1p}(+\infty) = +\infty\\)
* -   \\(\operatorname{log1p}(-1) = -\infty\\) with signal
* -   \\(\operatorname{log1p}(\mathrm{NaN})= \mathrm{NaN}\\) with no signal
*
* ## Notes
*
* -   According to an error analysis, the error is always less than \\(1\\) ulp (unit in the last place).
*
* -   The hexadecimal values are the intended ones for the used constants. The decimal values may be used, provided that the compiler will convert from decimal to binary accurately enough to produce the hexadecimal values shown.
*
* -   Assuming \\(\ln(x)\\) is accurate, the following algorithm can be used to evaluate \\(\operatorname{log1p}(x)\\) to within a few ULP:
*
*     ```javascript
*     var u = 1.0 + x;
*     if ( u === 1.0 ) {
*         return x;
*     } else {
*         return ln(u) * (x/(u-1.0));
*     }
*     ```
*
*     See HP-15C Advanced Functions Handbook, p.193.
*
* @param {number} x - input value
* @returns {number} the natural logarithm of `1+x`
*
* @example
* var v = log1p( 4.0 );
* // returns ~1.609
*
* @example
* var v = log1p( -1.0 );
* // returns -Infinity
*
* @example
* var v = log1p( 0.0 );
* // returns 0.0
*
* @example
* var v = log1p( -0.0 );
* // returns -0.0
*
* @example
* var v = log1p( -2.0 );
* // returns NaN
*
* @example
* var v = log1p( NaN );
* // returns NaN
*/
function log1p( x ) {
	var hfsq;
	var hu;
	var y;
	var f;
	var c;
	var s;
	var z;
	var R;
	var u;
	var k;

	if ( x < -1.0 || isnan( x ) ) {
		return NaN;
	}
	if ( x === -1.0 ) {
		return NINF;
	}
	if ( x === PINF ) {
		return x;
	}
	if ( x === 0.0 ) {
		return x; // handle +-0 (IEEE 754-2008 spec)
	}
	// Set y = |x|:
	if ( x < 0.0 ) {
		y = -x;
	} else {
		y = x;
	}
	// Argument reduction...
	k = 1;

	// Check if argument reduction is needed and if we can just return a small value approximation requiring less computation but with equivalent accuracy...
	if ( y < SQRT2M1 ) { // if |x| < sqrt(2)-1 => ~0.41422
		if ( y < SMALL ) { // if |x| < 2**-29
			if ( y < TINY ) { // if |x| < 2**-54
				return x;
			}
			// Use a simple two-term Taylor series...
			return x - ( x*x*0.5 );
		}
		// Check if `f=x` can be represented exactly (no need for correction terms), allowing us to bypass argument reduction...
		if ( x > SQRT2HALFM1 ) { // if x > sqrt(2)/2-1 => ~-0.2929
			// -0.2929 < x < 0.41422
			k = 0;
			f = x; // exact
			hu = 1;
		}
	}
	// Address case where `f` cannot be represented exactly...
	if ( k !== 0 ) {
		if ( y < TWO53 ) {
			u = 1.0 + x;
			hu = getHighWord( u );

			// Bit shift to isolate the exponent and then subtract the bias:
			k = (hu>>20) - FLOAT64_EXPONENT_BIAS;

			// Correction term...
			if ( k > 0 ) { // positive unbiased exponent
				c = 1.0 - (u-x);
			} else { // nonpositive unbiased exponent
				c = x - (u-1.0);
			}
			c /= u;
		} else {
			u = x;
			hu = getHighWord( u );

			// Bit shift to isolate the exponent and then subtract the bias:
			k = (hu>>20) - FLOAT64_EXPONENT_BIAS;

			// Correction term is zero:
			c = 0;
		}
		// Apply a bit mask (0 00000000000 11111111111111111111) to remove the exponent:
		hu &= 0x000fffff; // max value => 1048575

		// Check if u significand is less than sqrt(2) significand => 0x6a09e => 01101010000010011110
		if ( hu < 434334 ) {
			// Normalize u by setting the exponent to 1023 (bias) => 0x3ff00000 => 0 01111111111 00000000000000000000
			u = setHighWord( u, hu|0x3ff00000 );
		} else {
			k += 1;

			// Normalize u/2 by setting the exponent to 1022 (bias-1 => 2**-1 = 1/2) => 0x3fe00000 => 0 01111111110 00000000000000000000
			u = setHighWord( u, hu|0x3fe00000 );

			// Subtract hu significand from next largest hu => 0 00000000001 00000000000000000000 => 0x00100000 => 1048576
			hu = (1048576-hu)>>2;
		}
		f = u - 1.0;
	}
	// Approximation of log1p(f)...
	hfsq = 0.5 * f * f;
	if ( hu === 0 ) { // if |f| < 2**-20
		if ( f === 0.0 ) {
			c += k * LN2_LO;
			return ( k * LN2_HI ) + c;
		}
		R = hfsq * (1.0 - ( TWO_THIRDS*f ) ); // avoid division
		return ( k*LN2_HI ) - ( (R - ( (k*LN2_LO) + c)) - f );
	}
	s = f / (2.0 + f);
	z = s * s;

	R = z * polyval( z );

	if ( k === 0 ) {
		return f - ( hfsq - ( s*(hfsq+R) ) );
	}
	return ( k*LN2_HI ) - ( (hfsq - ( (s*(hfsq+R)) + ((k*LN2_LO) + c))) - f );
}


// EXPORTS //

module.exports = log1p;

},{"./polyval_lp.js":105,"@stdlib/constants/float64/exponent-bias":63,"@stdlib/constants/float64/ninf":65,"@stdlib/constants/float64/pinf":66,"@stdlib/math/base/assert/is-nan":72,"@stdlib/number/float64/base/get-high-word":111,"@stdlib/number/float64/base/set-high-word":114}],105:[function(require,module,exports){
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

/* This is a generated file. Do not edit directly. */
'use strict';

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
		return 0.6666666666666735;
	}
	return 0.6666666666666735 + (x * (0.3999999999940942 + (x * (0.2857142874366239 + (x * (0.22222198432149784 + (x * (0.1818357216161805 + (x * (0.15313837699209373 + (x * 0.14798198605116586))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],106:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Compute the principal square root of a double-precision floating-point number.
*
* @module @stdlib/math/base/special/sqrt
*
* @example
* var sqrt = require( '@stdlib/math/base/special/sqrt' );
*
* var v = sqrt( 4.0 );
* // returns 2.0
*
* v = sqrt( 9.0 );
* // returns 3.0
*
* v = sqrt( 0.0 );
* // returns 0.0
*
* v = sqrt( -4.0 );
* // returns NaN
*
* v = sqrt( NaN );
* // returns NaN
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":107}],107:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Compute the principal square root of a double-precision floating-point number.
*
* @type {Function}
* @param {number} x - input value
* @returns {number} principal square root
*
* @example
* var v = sqrt( 4.0 );
* // returns 2.0
*
* v = sqrt( 9.0 );
* // returns 3.0
*
* v = sqrt( 0.0 );
* // returns 0.0
*
* v = sqrt( -4.0 );
* // returns NaN
*
* v = sqrt( NaN );
* // returns NaN
*/
var sqrt = Math.sqrt; // eslint-disable-line stdlib/no-builtin-math


// EXPORTS //

module.exports = sqrt;

},{}],108:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":109}],109:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],110:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var isLittleEndian = require( '@stdlib/assert/is-little-endian' );


// MAIN //

var HIGH;
if ( isLittleEndian === true ) {
	HIGH = 1; // second index
} else {
	HIGH = 0; // first index
}


// EXPORTS //

module.exports = HIGH;

},{"@stdlib/assert/is-little-endian":48}],111:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Return an unsigned 32-bit integer corresponding to the more significant 32 bits of a double-precision floating-point number.
*
* @module @stdlib/number/float64/base/get-high-word
*
* @example
* var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
*
* var w = getHighWord( 3.14e201 ); // => 01101001110001001000001011000011
* // returns 1774486211
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":112}],112:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var Uint32Array = require( '@stdlib/array/uint32' );
var Float64Array = require( '@stdlib/array/float64' );
var HIGH = require( './high.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );


// MAIN //

/**
* Returns an unsigned 32-bit integer corresponding to the more significant 32 bits of a double-precision floating-point number.
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
* ## References
*
* -   [Open Group][1]
*
* [1]: http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm
*
* @param {number} x - input value
* @returns {uinteger32} higher order word
*
* @example
* var w = getHighWord( 3.14e201 ); // => 01101001110001001000001011000011
* // returns 1774486211
*/
function getHighWord( x ) {
	FLOAT64_VIEW[ 0 ] = x;
	return UINT32_VIEW[ HIGH ];
}


// EXPORTS //

module.exports = getHighWord;

},{"./high.js":110,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],113:[function(require,module,exports){
arguments[4][110][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":48,"dup":110}],114:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Set the more significant 32 bits of a double-precision floating-point number.
*
* @module @stdlib/number/float64/base/set-high-word
*
* @example
* var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
*
* var high = 5 >>> 0; // => 0 00000000000 00000000000000000101
*
* var y = setHighWord( 3.14e201, high ); // => 0 00000000000 0000000000000000010110010011110010110101100010000010
* // returns 1.18350528745e-313
*
* @example
* var PINF = require( '@stdlib/constants/float64/pinf' ); // => 0 11111111111 00000000000000000000 00000000000000000000000000000000
* var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
*
* var high = 1072693248 >>> 0; // => 0 01111111111 00000000000000000000
*
* // Set the higher order bits of `+infinity` to return `1`:
* var y = setHighWord( PINF, high ); // => 0 01111111111 0000000000000000000000000000000000000000000000000000
* // returns 1.0
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":115}],115:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var Uint32Array = require( '@stdlib/array/uint32' );
var Float64Array = require( '@stdlib/array/float64' );
var HIGH = require( './high.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );


// MAIN //

/**
* Sets the more significant 32 bits of a double-precision floating-point number.
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
* ## References
*
* -   [Open Group][1]
*
* [1]: http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm
*
* @param {number} x - double
* @param {uinteger32} high - unsigned 32-bit integer to replace the higher order word of `x`
* @returns {number} double having the same lower order word as `x`
*
* @example
* var high = 5 >>> 0; // => 0 00000000000 00000000000000000101
*
* var y = setHighWord( 3.14e201, high ); // => 0 00000000000 0000000000000000010110010011110010110101100010000010
* // returns 1.18350528745e-313
*
* @example
* var PINF = require( '@stdlib/constants/float64/pinf' ); // => 0 11111111111 00000000000000000000 00000000000000000000000000000000
*
* var high = 1072693248 >>> 0; // => 0 01111111111 00000000000000000000
*
* // Set the higher order bits of `+infinity` to return `1`:
* var y = setHighWord( PINF, high ); // => 0 01111111111 0000000000000000000000000000000000000000000000000000
* // returns 1.0
*/
function setHighWord( x, high ) {
	FLOAT64_VIEW[ 0 ] = x;
	UINT32_VIEW[ HIGH ] = ( high >>> 0 ); // identity bit shift to ensure integer
	return FLOAT64_VIEW[ 0 ];
}


// EXPORTS //

module.exports = setHighWord;

},{"./high.js":113,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],116:[function(require,module,exports){
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

},{"./main.js":117}],117:[function(require,module,exports){
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

},{}],118:[function(require,module,exports){
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

},{"./main.js":119,"./regexp.js":120,"@stdlib/utils/define-nonenumerable-read-only-property":138}],119:[function(require,module,exports){
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

},{}],120:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":119}],121:[function(require,module,exports){
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

},{"./is_number.js":124}],122:[function(require,module,exports){
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

},{"./is_number.js":124,"./zero_pad.js":128}],123:[function(require,module,exports){
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

},{"./main.js":126}],124:[function(require,module,exports){
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

},{}],125:[function(require,module,exports){
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

},{}],126:[function(require,module,exports){
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

},{"./format_double.js":121,"./format_integer.js":122,"./is_string.js":125,"./space_pad.js":127,"./zero_pad.js":128}],127:[function(require,module,exports){
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

},{}],128:[function(require,module,exports){
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

},{}],129:[function(require,module,exports){
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

},{"./main.js":130}],130:[function(require,module,exports){
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

},{}],131:[function(require,module,exports){
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

},{"./main.js":133}],132:[function(require,module,exports){
arguments[4][125][0].apply(exports,arguments)
},{"dup":125}],133:[function(require,module,exports){
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

},{"./is_string.js":132,"@stdlib/string/base/format-interpolate":123,"@stdlib/string/base/format-tokenize":129}],134:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":135}],135:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],136:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":137}],137:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/is-buffer":39,"@stdlib/regexp/function-name":118,"@stdlib/utils/native-class":156}],138:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":139}],139:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/define-property":143}],140:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],141:[function(require,module,exports){
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

},{}],142:[function(require,module,exports){
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

},{"./define_property.js":141}],143:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./builtin.js":140,"./has_define_property_support.js":142,"./polyfill.js":144}],144:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":131}],145:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./native.js":148,"./polyfill.js":149,"@stdlib/assert/is-function":45}],146:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":147}],147:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./detect.js":145,"@stdlib/object/ctor":116}],148:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],149:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./proto.js":150,"@stdlib/utils/native-class":156}],150:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],151:[function(require,module,exports){
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

},{"./codegen.js":152,"./global_this.js":153,"./self.js":154,"./window.js":155,"@stdlib/assert/is-boolean":33,"@stdlib/string/format":131}],152:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],153:[function(require,module,exports){
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

},{}],154:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],155:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],156:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":157,"./polyfill.js":158,"@stdlib/assert/has-tostringtag-support":20}],157:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./tostring.js":159}],158:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./tostring.js":159,"./tostringtag.js":160,"@stdlib/assert/has-own-property":16}],159:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],160:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/symbol/ctor":134}],161:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":162}],162:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/is-error":41}],163:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./fixtures/nodelist.js":164,"./fixtures/re.js":165,"./fixtures/typedarray.js":166}],164:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/global":151}],165:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],166:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],167:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./check.js":163,"./main.js":168,"./polyfill.js":169}],168:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/constructor-name":136}],169:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/constructor-name":136}],170:[function(require,module,exports){
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

},{}],171:[function(require,module,exports){

},{}],172:[function(require,module,exports){
arguments[4][171][0].apply(exports,arguments)
},{"dup":171}],173:[function(require,module,exports){
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
},{"base64-js":170,"buffer":173,"ieee754":276}],174:[function(require,module,exports){
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

},{}],175:[function(require,module,exports){
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
},{"_process":283}],176:[function(require,module,exports){
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

},{"events":174,"inherits":277,"readable-stream/lib/_stream_duplex.js":178,"readable-stream/lib/_stream_passthrough.js":179,"readable-stream/lib/_stream_readable.js":180,"readable-stream/lib/_stream_transform.js":181,"readable-stream/lib/_stream_writable.js":182,"readable-stream/lib/internal/streams/end-of-stream.js":186,"readable-stream/lib/internal/streams/pipeline.js":188}],177:[function(require,module,exports){
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

},{}],178:[function(require,module,exports){
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
},{"./_stream_readable":180,"./_stream_writable":182,"_process":283,"inherits":277}],179:[function(require,module,exports){
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
},{"./_stream_transform":181,"inherits":277}],180:[function(require,module,exports){
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
},{"../errors":177,"./_stream_duplex":178,"./internal/streams/async_iterator":183,"./internal/streams/buffer_list":184,"./internal/streams/destroy":185,"./internal/streams/from":187,"./internal/streams/state":189,"./internal/streams/stream":190,"_process":283,"buffer":173,"events":174,"inherits":277,"string_decoder/":292,"util":171}],181:[function(require,module,exports){
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
},{"../errors":177,"./_stream_duplex":178,"inherits":277}],182:[function(require,module,exports){
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
},{"../errors":177,"./_stream_duplex":178,"./internal/streams/destroy":185,"./internal/streams/state":189,"./internal/streams/stream":190,"_process":283,"buffer":173,"inherits":277,"util-deprecate":301}],183:[function(require,module,exports){
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
},{"./end-of-stream":186,"_process":283}],184:[function(require,module,exports){
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
},{"buffer":173,"util":171}],185:[function(require,module,exports){
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
},{"_process":283}],186:[function(require,module,exports){
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
},{"../../../errors":177}],187:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],188:[function(require,module,exports){
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
},{"../../../errors":177,"./end-of-stream":186}],189:[function(require,module,exports){
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
},{"../../../errors":177}],190:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":174}],191:[function(require,module,exports){
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

},{"./":192,"get-intrinsic":267}],192:[function(require,module,exports){
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

},{"es-define-property":252,"es-errors/type":258,"function-bind":266,"get-intrinsic":267,"set-function-length":287}],193:[function(require,module,exports){
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

},{"./lib/is_arguments.js":194,"./lib/keys.js":195}],194:[function(require,module,exports){
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

},{}],195:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],196:[function(require,module,exports){
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

},{"es-define-property":252,"es-errors/syntax":257,"es-errors/type":258,"gopd":268}],197:[function(require,module,exports){
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

},{"define-data-property":196,"has-property-descriptors":269,"object-keys":281}],198:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],199:[function(require,module,exports){
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

},{"./ToNumber":230,"./ToPrimitive":232,"./Type":237}],200:[function(require,module,exports){
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

},{"../helpers/isFinite":245,"../helpers/isNaN":246,"../helpers/isPrefixOf":247,"./ToNumber":230,"./ToPrimitive":232,"es-errors/type":258,"get-intrinsic":267}],201:[function(require,module,exports){
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

},{"call-bind/callBound":191,"es-errors/type":258}],202:[function(require,module,exports){
'use strict';

var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value) {
	return RequireObjectCoercible(value, arguments.length > 1 ? arguments[1] : void undefined);
};

},{"es-object-atoms/RequireObjectCoercible":260}],203:[function(require,module,exports){
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

},{"./DayWithinYear":206,"./InLeapYear":210,"./MonthFromTime":220,"es-errors/eval":253}],204:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":251,"./floor":241}],205:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":241}],206:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":204,"./DayFromYear":205,"./YearFromTime":239}],207:[function(require,module,exports){
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

},{"./modulo":242}],208:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":249,"./IsAccessorDescriptor":211,"./IsDataDescriptor":213,"es-errors/type":258}],209:[function(require,module,exports){
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

},{"../helpers/timeConstants":251,"./floor":241,"./modulo":242}],210:[function(require,module,exports){
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

},{"./DaysInYear":207,"./YearFromTime":239,"es-errors/eval":253}],211:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":249,"es-errors/type":258,"hasown":275}],212:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":278}],213:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":249,"es-errors/type":258,"hasown":275}],214:[function(require,module,exports){
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

},{"./IsAccessorDescriptor":211,"./IsDataDescriptor":213,"./IsPropertyDescriptor":215,"es-errors/type":258}],215:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor(Desc);
};

},{"../helpers/records/property-descriptor":249}],216:[function(require,module,exports){
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

},{"../helpers/isFinite":245,"../helpers/timeConstants":251}],217:[function(require,module,exports){
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

},{"../helpers/isFinite":245,"./DateFromTime":203,"./Day":204,"./MonthFromTime":220,"./ToInteger":229,"./YearFromTime":239,"./floor":241,"./modulo":242,"get-intrinsic":267}],218:[function(require,module,exports){
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

},{"../helpers/isFinite":245,"../helpers/timeConstants":251,"./ToInteger":229}],219:[function(require,module,exports){
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

},{"../helpers/timeConstants":251,"./floor":241,"./modulo":242}],220:[function(require,module,exports){
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

},{"./DayWithinYear":206,"./InLeapYear":210}],221:[function(require,module,exports){
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

},{"../helpers/isNaN":246}],222:[function(require,module,exports){
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

},{"../helpers/timeConstants":251,"./floor":241,"./modulo":242}],223:[function(require,module,exports){
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

},{"./Type":237}],224:[function(require,module,exports){
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


},{"../helpers/isFinite":245,"./ToNumber":230,"./abs":240,"get-intrinsic":267}],225:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":251,"./DayFromYear":205}],226:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":251,"./modulo":242}],227:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],228:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":230}],229:[function(require,module,exports){
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

},{"../helpers/isFinite":245,"../helpers/isNaN":246,"../helpers/sign":250,"./ToNumber":230,"./abs":240,"./floor":241}],230:[function(require,module,exports){
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

},{"./ToPrimitive":232,"call-bind/callBound":191,"safe-regex-test":286}],231:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = require('es-object-atoms/ToObject');

},{"es-object-atoms/ToObject":261}],232:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":263}],233:[function(require,module,exports){
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

},{"./IsCallable":212,"./ToBoolean":227,"./Type":237,"es-errors/type":258,"hasown":275}],234:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":267}],235:[function(require,module,exports){
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

},{"../helpers/isFinite":245,"../helpers/isNaN":246,"../helpers/sign":250,"./ToNumber":230,"./abs":240,"./floor":241,"./modulo":242}],236:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":230}],237:[function(require,module,exports){
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

},{}],238:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":204,"./modulo":242}],239:[function(require,module,exports){
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

},{"call-bind/callBound":191,"get-intrinsic":267}],240:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":267}],241:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],242:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":248}],243:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":251,"./modulo":242}],244:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":199,"./5/AbstractRelationalComparison":200,"./5/Canonicalize":201,"./5/CheckObjectCoercible":202,"./5/DateFromTime":203,"./5/Day":204,"./5/DayFromYear":205,"./5/DayWithinYear":206,"./5/DaysInYear":207,"./5/FromPropertyDescriptor":208,"./5/HourFromTime":209,"./5/InLeapYear":210,"./5/IsAccessorDescriptor":211,"./5/IsCallable":212,"./5/IsDataDescriptor":213,"./5/IsGenericDescriptor":214,"./5/IsPropertyDescriptor":215,"./5/MakeDate":216,"./5/MakeDay":217,"./5/MakeTime":218,"./5/MinFromTime":219,"./5/MonthFromTime":220,"./5/SameValue":221,"./5/SecFromTime":222,"./5/StrictEqualityComparison":223,"./5/TimeClip":224,"./5/TimeFromYear":225,"./5/TimeWithinDay":226,"./5/ToBoolean":227,"./5/ToInt32":228,"./5/ToInteger":229,"./5/ToNumber":230,"./5/ToObject":231,"./5/ToPrimitive":232,"./5/ToPropertyDescriptor":233,"./5/ToString":234,"./5/ToUint16":235,"./5/ToUint32":236,"./5/Type":237,"./5/WeekDay":238,"./5/YearFromTime":239,"./5/abs":240,"./5/floor":241,"./5/modulo":242,"./5/msFromTime":243}],245:[function(require,module,exports){
'use strict';

var $isNaN = require('./isNaN');

module.exports = function (x) { return (typeof x === 'number' || typeof x === 'bigint') && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{"./isNaN":246}],246:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],247:[function(require,module,exports){
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

},{"call-bind/callBound":191}],248:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],249:[function(require,module,exports){
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

},{"es-errors/type":258,"hasown":275}],250:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],251:[function(require,module,exports){
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

},{}],252:[function(require,module,exports){
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

},{"get-intrinsic":267}],253:[function(require,module,exports){
'use strict';

/** @type {import('./eval')} */
module.exports = EvalError;

},{}],254:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Error;

},{}],255:[function(require,module,exports){
'use strict';

/** @type {import('./range')} */
module.exports = RangeError;

},{}],256:[function(require,module,exports){
'use strict';

/** @type {import('./ref')} */
module.exports = ReferenceError;

},{}],257:[function(require,module,exports){
'use strict';

/** @type {import('./syntax')} */
module.exports = SyntaxError;

},{}],258:[function(require,module,exports){
'use strict';

/** @type {import('./type')} */
module.exports = TypeError;

},{}],259:[function(require,module,exports){
'use strict';

/** @type {import('./uri')} */
module.exports = URIError;

},{}],260:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

/** @type {import('./RequireObjectCoercible')} */
module.exports = function RequireObjectCoercible(value) {
	if (value == null) {
		throw new $TypeError((arguments.length > 0 && arguments[1]) || ('Cannot call method on ' + value));
	}
	return value;
};

},{"es-errors/type":258}],261:[function(require,module,exports){
'use strict';

var $Object = require('./');
var RequireObjectCoercible = require('./RequireObjectCoercible');

/** @type {import('./ToObject')} */
module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

},{"./":262,"./RequireObjectCoercible":260}],262:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Object;

},{}],263:[function(require,module,exports){
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

},{"./helpers/isPrimitive":264,"is-callable":278}],264:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],265:[function(require,module,exports){
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

},{}],266:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":265}],267:[function(require,module,exports){
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

},{"es-errors":254,"es-errors/eval":253,"es-errors/range":255,"es-errors/ref":256,"es-errors/syntax":257,"es-errors/type":258,"es-errors/uri":259,"function-bind":266,"has-proto":270,"has-symbols":271,"hasown":275}],268:[function(require,module,exports){
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

},{"get-intrinsic":267}],269:[function(require,module,exports){
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

},{"es-define-property":252}],270:[function(require,module,exports){
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

},{}],271:[function(require,module,exports){
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

},{"./shams":272}],272:[function(require,module,exports){
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

},{}],273:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":272}],274:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":266}],275:[function(require,module,exports){
'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);

},{"function-bind":266}],276:[function(require,module,exports){
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

},{}],277:[function(require,module,exports){
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

},{}],278:[function(require,module,exports){
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

},{}],279:[function(require,module,exports){
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

},{"call-bind/callBound":191,"has-tostringtag/shams":273}],280:[function(require,module,exports){
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

},{"./isArguments":282}],281:[function(require,module,exports){
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

},{"./implementation":280,"./isArguments":282}],282:[function(require,module,exports){
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

},{}],283:[function(require,module,exports){
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

},{}],284:[function(require,module,exports){
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
},{"_process":283,"through":299,"timers":300}],285:[function(require,module,exports){
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

},{"buffer":173}],286:[function(require,module,exports){
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

},{"call-bind/callBound":191,"es-errors/type":258,"is-regex":279}],287:[function(require,module,exports){
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

},{"define-data-property":196,"es-errors/type":258,"get-intrinsic":267,"gopd":268,"has-property-descriptors":269}],288:[function(require,module,exports){
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

},{"es-abstract/es5":244,"function-bind":266}],289:[function(require,module,exports){
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

},{"./implementation":288,"./polyfill":290,"./shim":291,"define-properties":197,"function-bind":266}],290:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":288}],291:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":290,"define-properties":197}],292:[function(require,module,exports){
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
},{"safe-buffer":285}],293:[function(require,module,exports){
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
},{"./lib/default_stream":294,"./lib/results":296,"./lib/test":297,"_process":283,"defined":198,"through":299,"timers":300}],294:[function(require,module,exports){
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
},{"_process":283,"fs":172,"through":299}],295:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":283,"timers":300}],296:[function(require,module,exports){
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
},{"_process":283,"events":174,"function-bind":266,"has":274,"inherits":277,"object-inspect":298,"resumer":284,"through":299,"timers":300}],297:[function(require,module,exports){
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
},{"./next_tick":295,"deep-equal":193,"defined":198,"events":174,"has":274,"inherits":277,"path":175,"string.prototype.trim":289}],298:[function(require,module,exports){
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

},{}],299:[function(require,module,exports){
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
},{"_process":283,"stream":176}],300:[function(require,module,exports){
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
},{"process/browser.js":283,"timers":300}],301:[function(require,module,exports){
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
},{}]},{},[95,96]);
