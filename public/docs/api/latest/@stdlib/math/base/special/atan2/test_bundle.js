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

},{"./uint16array.js":24,"@stdlib/assert/is-uint16array":52,"@stdlib/constants/uint16/max":70}],24:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint32array.js":27,"@stdlib/assert/is-uint32array":54,"@stdlib/constants/uint32/max":71}],27:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint8array.js":30,"@stdlib/assert/is-uint8array":56,"@stdlib/constants/uint8/max":72}],30:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/native-class":150}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":34,"./object.js":35,"./primitive.js":36,"@stdlib/utils/define-nonenumerable-read-only-property":132}],34:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./try2serialize.js":38,"@stdlib/assert/has-tostringtag-support":20,"@stdlib/boolean/ctor":60,"@stdlib/utils/native-class":150}],36:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/get-prototype-of":140,"@stdlib/utils/native-class":150}],43:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/native-class":150}],45:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/type-of":161}],47:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":51,"@stdlib/assert/tools/array-function":58,"@stdlib/utils/define-nonenumerable-read-only-property":132}],51:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/native-class":150}],54:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/native-class":150}],56:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/native-class":150}],58:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/is-array":31,"@stdlib/string/format":125}],60:[function(require,module,exports){
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
* One fourth times the mathematical constant `π`.
*
* @module @stdlib/constants/float64/fourth-pi
* @type {number}
*
* @example
* var FOURTH_PI = require( '@stdlib/constants/float64/fourth-pi' );
* // returns 7.85398163397448309616e-1
*/


// MAIN //

/**
* One fourth times the mathematical constant `π`.
*
* @constant
* @type {number}
* @default 7.85398163397448309616e-1
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/Pi}
*/
var FOURTH_PI = 7.85398163397448309616e-1;


// EXPORTS //

module.exports = FOURTH_PI;

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
* One half times the mathematical constant `π`.
*
* @module @stdlib/constants/float64/half-pi
* @type {number}
*
* @example
* var HALF_PI = require( '@stdlib/constants/float64/half-pi' );
* // returns 1.5707963267948966
*/


// MAIN //

/**
* One half times the mathematical constant `π`.
*
* @constant
* @type {number}
* @default 1.5707963267948966
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/Pi}
*/
var HALF_PI = 1.5707963267948966;


// EXPORTS //

module.exports = HALF_PI;

},{}],65:[function(require,module,exports){
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
* High word mask for excluding the sign bit of a double-precision floating-point number.
*
* @module @stdlib/constants/float64/high-word-abs-mask
* @type {uinteger32}
*
* @example
* var FLOAT64_HIGH_WORD_ABS_MASK = require( '@stdlib/constants/float64/high-word-abs-mask' );
* // returns 2147483647
*/


// MAIN //

/**
* High word mask for excluding the sign bit of a double-precision floating-point number.
*
* ## Notes
*
* The high word mask for excluding the sign bit of a double-precision floating-point number is an unsigned 32-bit integer with the value \\( 2147483647 \\), which corresponds to the bit sequence
*
* ```binarystring
* 0 11111111111 11111111111111111111
* ```
*
* @constant
* @type {uinteger32}
* @default 0x7fffffff
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_HIGH_WORD_ABS_MASK = 0x7fffffff>>>0; // eslint-disable-line id-length


// EXPORTS //

module.exports = FLOAT64_HIGH_WORD_ABS_MASK;

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

/**
* High word mask for the sign bit of a double-precision floating-point number.
*
* @module @stdlib/constants/float64/high-word-sign-mask
* @type {uinteger32}
*
* @example
* var FLOAT64_HIGH_WORD_SIGN_MASK = require( '@stdlib/constants/float64/high-word-sign-mask' );
* // returns 2147483648
*/


// MAIN //

/**
* High word mask for the sign bit of a double-precision floating-point number.
*
* ## Notes
*
* The high word mask for the sign bit of a double-precision floating-point number is an unsigned 32-bit integer with the value \\( 2147483648 \\), which corresponds to the bit sequence
*
* ```binarystring
* 1 00000000000 00000000000000000000
* ```
*
* @constant
* @type {uinteger32}
* @default 0x80000000
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_HIGH_WORD_SIGN_MASK = 0x80000000>>>0; // eslint-disable-line id-length


// EXPORTS //

module.exports = FLOAT64_HIGH_WORD_SIGN_MASK;

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

},{"@stdlib/number/ctor":96}],68:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* The mathematical constant `π`.
*
* @module @stdlib/constants/float64/pi
* @type {number}
*
* @example
* var PI = require( '@stdlib/constants/float64/pi' );
* // returns 3.141592653589793
*/


// MAIN //

/**
* The mathematical constant `π`.
*
* @constant
* @type {number}
* @default 3.141592653589793
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/Pi}
*/
var PI = 3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679; // eslint-disable-line max-len


// EXPORTS //

module.exports = PI;

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

},{}],72:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":74}],74:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/constants/float64/ninf":67,"@stdlib/constants/float64/pinf":69}],75:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":76}],76:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],77:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":78}],78:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/constants/float64/ninf":67}],79:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":80}],80:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/constants/float64/pinf":69}],81:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":82}],82:[function(require,module,exports){
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

/**
* Compute the arctangent of a double-precision floating-point number.
*
* @module @stdlib/math/base/special/atan
*
* @example
* var PI = require( '@stdlib/constants/float64/pi' );
* var atan = require( '@stdlib/math/base/special/atan' );
*
* var v = atan( 0.0 );
* // returns ~0.0
*
* v = atan( -PI/4.0 );
* // returns ~-0.666
*
* v = atan( PI/4.0 );
* // returns ~0.666
*
* v = atan( NaN );
* // returns NaN
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":84}],84:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var PIO2 = require( '@stdlib/constants/float64/half-pi' );
var PIO4 = require( '@stdlib/constants/float64/fourth-pi' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var polyvalP = require( './polyval_p.js' );
var polyvalQ = require( './polyval_q.js' );


// VARIABLES //

var MOREBITS = 6.123233995736765886130e-17; // pi/2 = PIO2 + MOREBITS.
var T3P8 = 2.41421356237309504880; // tan( 3*pi/8 )


// MAIN //

/**
* Computes the arctangent of a double-precision floating-point number.
*
* ## Method
*
* -   Range reduction is from three intervals into the interval from 0 to 0.66. The approximant uses a rational function of degree 4/5 of the form
*
*     ```tex
*     x + x^3 \frac{P(x)}{Q(x)}
*     ```
*
* ## Notes
*
* -   Relative error:
*
*     | arithmetic | domain  | # trials | peak    | rms     |
*     |:-----------|:--------|:---------|:--------|:--------|
*     | DEC        | -10, 10 | 50000    | 2.4e-17 | 8.3e-18 |
*     | IEEE       | -10, 10 | 10^6     | 1.8e-16 | 5.0e-17 |
*
* @param {number} x - input value
* @returns {number} arctangent (in radians)
*
* @example
* var v = atan( 0.0 );
* // returns ~0.0
*
* @example
* var PI = require( '@stdlib/constants/float64/pi' );
*
* var v = atan( -PI/4.0 );
* // returns ~-0.666
*
* @example
* var PI = require( '@stdlib/constants/float64/pi' );
*
* var v = atan( PI/4.0 );
* // returns ~0.666
*
* @example
* var v = atan( NaN );
* // returns NaN
*/
function atan( x ) {
	var flg;
	var sgn;
	var y;
	var z;
	if ( isnan( x ) || x === 0.0 ) {
		return x;
	}
	if ( x === PINF ) {
		return PIO2;
	}
	if ( x === NINF ) {
		return -PIO2;
	}
	if ( x < 0.0 ) {
		sgn = true;
		x = -x;
	}
	// Range reduction:
	flg = 0;
	if ( x > T3P8 ) {
		y = PIO2;
		flg = 1;
		x = -( 1.0/x );
	} else if ( x <= 0.66 ) {
		y = 0.0;
	} else {
		y = PIO4;
		flg = 2;
		x = (x-1.0) / (x+1.0);
	}
	z = x * x;
	z = z*polyvalP( z ) / polyvalQ( z );
	z = ( x*z ) + x;
	if ( flg === 2 ) {
		z += 0.5 * MOREBITS;
	} else if ( flg === 1 ) {
		z += MOREBITS;
	}
	y += z;
	return ( sgn ) ? -y : y;
}


// EXPORTS //

module.exports = atan;

},{"./polyval_p.js":85,"./polyval_q.js":86,"@stdlib/constants/float64/fourth-pi":63,"@stdlib/constants/float64/half-pi":64,"@stdlib/constants/float64/ninf":67,"@stdlib/constants/float64/pinf":69,"@stdlib/math/base/assert/is-nan":75}],85:[function(require,module,exports){
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
		return -64.85021904942025;
	}
	return -64.85021904942025 + (x * (-122.88666844901361 + (x * (-75.00855792314705 + (x * (-16.157537187333652 + (x * -0.8750608600031904))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],86:[function(require,module,exports){
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
		return 194.5506571482614;
	}
	return 194.5506571482614 + (x * (485.3903996359137 + (x * (432.88106049129027 + (x * (165.02700983169885 + (x * (24.858464901423062 + (x * 1.0))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

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

/**
* Compute the angle in the plane (in radians) between the positive x-axis and the ray from `(0,0)` to the point `(x,y)`.
*
* @module @stdlib/math/base/special/atan2
*
* @example
* var atan2 = require( '@stdlib/math/base/special/atan2' );
*
* var v = atan2( 2.0, 2.0 ); // => atan(1.0)
* // returns ~0.785
*
* v = atan2( 6.0, 2.0 ); // => atan(3.0)
* // returns ~1.249
*
* v = atan2( -1.0, -1.0 ); // => atan(1.0) - π
* // returns ~-2.356
*
* v = atan2( 3.0, 0.0 ); // => π/2
* // returns ~1.571
*
* v = atan2( -2.0, 0.0 ); // => -π/2
* // returns ~-1.571
*
* v = atan2( 0.0, 0.0 );
* // returns 0.0
*
* v = atan2( 3.0, NaN );
* // returns NaN
*
* v = atan2( NaN, 2.0 );
* // returns NaN
*/

// MODULES //

var atan2 = require( './main.js' );


// EXPORTS //

module.exports = atan2;

},{"./main.js":88}],88:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The original code, copyright and license are from [Go]{@link https://golang.org/src/math/atan2.go}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright (c) 2009 The Go Authors. All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are
* met:
*
*    * Redistributions of source code must retain the above copyright
* notice, this list of conditions and the following disclaimer.
*    * Redistributions in binary form must reproduce the above
* copyright notice, this list of conditions and the following disclaimer
* in the documentation and/or other materials provided with the
* distribution.
*    * Neither the name of Google Inc. nor the names of its
* contributors may be used to endorse or promote products derived from
* this software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
* "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
* LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
* A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
* OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
* SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
* LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
* DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
* THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
* (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
* OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
* ```
*/

'use strict';

// MODULES //

var isinfinite = require( '@stdlib/math/base/assert/is-infinite' );
var copysign = require( '@stdlib/math/base/special/copysign' );
var signbit = require( '@stdlib/number/float64/base/signbit' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var atan = require( '@stdlib/math/base/special/atan' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var PI = require( '@stdlib/constants/float64/pi' );


// MAIN //

/**
* Computes the angle in the plane (in radians) between the positive x-axis and the ray from `(0,0)` to the point `(x,y)`.
*
* ## Special Cases
*
* ```tex
* \begin{align*}
* \operatorname{atan2}(y,\mathrm{NaN}) &= \mathrm{NaN}\\
* \operatorname{atan2}(\mathrm{NaN},x) &= \mathrm{NaN}\\
* \operatorname{atan2}( +0,x \ge 0 ) &= +0 \\
* \operatorname{atan2}( -0, x \ge 0 ) &= -0 \\
* \operatorname{atan2}( +0,x \le -0 ) &= +\Pi \\
* \operatorname{atan2}( -0, x \le -0 ) &= -\Pi \\
* \operatorname{atan2}(+\infty, +\infty) &= +\tfrac{\Pi}{4} \\
* \operatorname{atan2}(-\infty, +\infty) &= -\tfrac{\Pi}{4} \\
* \operatorname{atan2}(+\infty, -\infty) &= +\tfrac{3\Pi}{4} \\
* \operatorname{atan2}(-\infty, -\infty) &= -\tfrac{3\Pi}{4} \\
* \operatorname{atan2}(y, +\infty) &= 0.0 \\
* \operatorname{atan2}(y>0, -\infty) &= +\Pi \\
* \operatorname{atan2}(y<0, -\infty) &= -\Pi \\
* \operatorname{atan2}(+\infty, x ) &= +\tfrac{\Pi}{2} \\
* \operatorname{atan2}(-\infty, x ) &= -\tfrac{\Pi}{2} \\
* \end{align*}
* ```
*
* @param {number} y - `y` coordinate
* @param {number} x - `x` coordinate
* @returns {number} angle (in radians)
*
* @example
* var v = atan2( 2.0, 2.0 ); // => atan(1.0)
* // returns ~0.785
*
* @example
* var v = atan2( 6.0, 2.0 ); // => atan(3.0)
* // returns ~1.249
*
* @example
* var v = atan2( -1.0, -1.0 ); // => atan(1.0) - π
* // returns ~-2.356
*
* @example
* var v = atan2( 3.0, 0.0 ); // => π/2
* // returns ~1.571
*
* @example
* var v = atan2( -2.0, 0.0 ); // => -π/2
* // returns ~-1.571
*
* @example
* var v = atan2( 0.0, 0.0 );
* // returns 0.0
*
* @example
* var v = atan2( 3.0, NaN );
* // returns NaN
*
* @example
* var v = atan2( NaN, 2.0 );
* // returns NaN
*/
function atan2( y, x ) {
	var q;
	if ( isnan( x ) || isnan( y ) ) {
		return NaN;
	}
	if ( isinfinite( x ) ) {
		if ( x === PINF ) {
			if ( isinfinite( y ) ) {
				return copysign( PI / 4.0, y );
			}
			return copysign( 0.0, y );
		}
		// Case: x is -Infinity
		if ( isinfinite( y ) ) {
			return copysign( 3.0*PI/4.0, y );
		}
		return copysign( PI, y );
	}
	if ( isinfinite( y ) ) {
		return copysign( PI / 2.0, y );
	}
	if ( y === 0.0 ) {
		if ( x >= 0.0 && !signbit( x ) ) {
			return copysign( 0.0, y );
		}
		return copysign( PI, y );
	}
	if ( x === 0.0 ) {
		return copysign( PI / 2.0, y );
	}
	q = atan( y / x );
	if ( x < 0.0 ) {
		if ( q <= 0.0 ) {
			return q + PI;
		}
		return q - PI;
	}
	return q;
}


// EXPORTS //

module.exports = atan2;

},{"@stdlib/constants/float64/pi":68,"@stdlib/constants/float64/pinf":69,"@stdlib/math/base/assert/is-infinite":73,"@stdlib/math/base/assert/is-nan":75,"@stdlib/math/base/special/atan":83,"@stdlib/math/base/special/copysign":94,"@stdlib/number/float64/base/signbit":104}],89:[function(require,module,exports){
module.exports={"expected":[-1.8934309043157949,-1.988312417862897,-2.853335728061693,-2.2735614533944353,-2.0206557895792514,-2.189580440409726,-1.6650887712461124,-1.6297445809855846,-1.9479021733665551,-2.0365510986968243,-2.194230612062586,-1.6514217261089466,-2.304486655747154,-2.220373899970681,-2.0042522941312058,-2.747474632636102,-1.6064935733570744,-2.0387364688949594,-2.2594305127994656,-2.9016600370539023,-1.7730371095183783,-2.97672253578897,-2.4455459352355495,-2.941929687071055,-2.3477144848650013,-1.9643097492694712,-3.1072341291915193,-2.402676196037451,-2.4046791582087566,-1.7355468632814026,-1.9046380725503151,-1.6561967129324164,-2.8786834021919345,-2.826934852245648,-2.9860321975251503,-2.44355906958532,-2.342544576695489,-2.6394678546349803,-2.0904554999027587,-2.990705443170538,-1.6207432745297887,-1.7374130300531163,-1.8892327889707297,-2.680421051119752,-2.4445668503696014,-2.6060372470557267,-2.9289893763449304,-2.913566529189129,-2.02396155130804,-2.7999997762520743,-2.3239013675966658,-2.2738381589226306,-3.098368294189845,-2.056581467583757,-2.6268973362887476,-1.95119767473647,-2.417013607360027,-2.829677460411638,-2.981209085701154,-2.6013980944213855,-2.549882263017231,-1.7157961322326973,-1.9185356060544059,-2.7769045158677357,-1.616517075810486,-2.7364186835526425,-2.5745755761179128,-3.0686602987848928,-1.830341154481592,-3.027453771369297,-2.749476136190857,-2.6491367031633484,-2.1943022958465415,-2.597213137542232,-3.0118847933009367,-1.8542317838074918,-1.8570519810622914,-2.1660334464109225,-2.895398989142631,-2.9476004277463037,-2.295633377592749,-1.6619444063424342,-2.53444626884124,-2.4583862881502156,-2.2081493586885284,-2.483985330033059,-2.211598737202339,-2.822594572351008,-2.6802712294825057,-1.7599414206287811,-2.423062181607789,-2.5825832192364224,-1.9506047767092405,-2.5402963635949476,-1.7410957211083948,-1.6847781162629831,-2.724513370534821,-2.3724175907144245,-2.5049062829926467,-1.8115777779859643,-2.023350146286824,-2.745666373010601,-1.9014799351749871,-1.9462294522814998,-2.89652974394892,-1.617836251362498,-1.7102189583195575,-1.9839926375528592,-1.8396282803997774,-2.632918364567079,-3.044555833946629,-2.5715641972749532,-2.5664289989539766,-2.5173646126837825,-1.6582060029127692,-1.7585546068158937,-2.540183044724264,-2.5615532246144563,-1.9649735179547219,-3.083411875144891,-2.5168864188423665,-1.6091897332650251,-1.847695842691697,-2.3162686350954313,-2.9230175367530484,-1.8500625719392063,-1.726756288345891,-2.3330514198249035,-2.7750398616043723,-2.2684185571409228,-2.4830808875418913,-2.367519021186161,-1.8712933356172392,-3.0663037893976894,-2.755082315167934,-1.9381589007101867,-2.7204661735803644,-2.306724924804103,-2.1418748331964355,-2.70845378909773,-2.359539080710079,-1.99694900369474,-2.58233920649798,-2.397776045162387,-2.081377287751324,-3.051855019988156,-2.149030005845513,-2.5441744601420417,-2.26991759101886,-1.9283380704934328,-2.6045267284614475,-2.6150220921201632,-2.958930724692471,-2.503382830545472,-1.6756233073137026,-2.1995485415809672,-2.7156760398564352,-2.8117849988979695,-1.6078877368497,-2.4696618585607606,-2.3088638312625953,-2.7987027488083984,-1.7320881411252873,-2.7876135048413557,-2.058364799166009,-2.824803234899911,-1.8312665366482084,-2.1953089606325946,-3.073746643432806,-2.049503624628017,-1.8327248032704841,-3.0212734266555095,-1.8011819695227207,-2.858075319746747,-2.0249812689306665,-2.067163000825051,-2.880107833425427,-2.2126099342404473,-2.1480576165638277,-2.7783430051167475,-2.0024567651351264,-1.8496890836919084,-2.0430291589517324,-2.6711477063773,-1.6567464675273251,-2.9984438972771623,-2.0800217973212947,-2.3677218474951984,-3.0416181419637054,-1.8288194008314944,-2.910015360861723,-2.093695206155508,-2.6486561749105064,-1.9871422433281687,-2.8996593563371817,-1.5871872386547143,-3.1166535338573076,-2.252483658322336,-2.2614814499465887,-2.458625164689448,-1.8264445524442645,-1.805816560984913,-2.9763367144083506,-2.2395248741880915,-2.4277639265290087,-2.436013794392995,-2.079643737476143,-2.4885802358323117,-2.8874506697203004,-2.1279829528070167,-2.452165000587152,-2.8497031310651093,-2.1546406449667512,-2.6208896776553785,-1.631012555974013,-1.7894615514284316,-1.8823768408834751,-3.0953830303212513,-2.3322628970835253,-3.069303277913864,-2.3699934192762218,-2.418910001540522,-2.275360475531323,-2.8112894388951495,-1.5857320271193693,-2.461281348394004,-2.8985420094838013,-2.343174548794563,-2.6317979534278853,-3.1268561800783448,-2.8899962291328762,-2.0262896882295363,-1.694923973722936,-1.7038355333797377,-1.8846631267797906,-1.8012458723470066,-2.0715117942701013,-2.345957178083194,-2.279176890156548,-2.3291127180559013,-3.1369549295260577,-1.7871761797932981,-3.020723888798322,-2.928748840804728,-1.8000095212024452,-1.953960470359694,-2.0508753314165538,-2.8999952468507635,-1.7508757993500157,-1.647908636572458,-1.902339120575282,-1.8038190152841334,-2.087323101724544,-2.3166364208247163,-2.9396424648706887,-2.212820791546849,-1.8726483861488041,-2.207216125241451,-1.8234811937835809,-2.941320883732786,-2.3043831046434162,-2.8108563214549616,-1.9739958913242364,-2.381784181893586,-2.814589002276342,-2.648488349698179,-1.7405386022057725,-2.149107363220877,-1.6213701132393947,-2.937026616609941,-2.5280931968243974,-1.9773756034620518,-2.534120736704368,-2.1932117073707187,-3.0294487403042623,-2.8163582842186616,-2.5256759988087234,-1.8190411518737737,-2.662396557705566,-1.743655195223239,-1.7571051923112202,-2.1122506866726343,-2.242834019734846,-2.7280677144378918,-2.9495681022741382,-1.8176319419548652,-2.322080202271316,-2.9819051581363025,-2.6433730561702267,-2.166756132723361,-2.282861052928236,-2.3745023888171697,-2.241083439288626,-2.730784298818583,-2.3655490178607788,-2.650864609179801,-2.5864860550468443,-2.7933593425130208,-2.799262177800574,-2.0344194653256813,-2.7928586538132154,-2.0418026535158424,-2.708349500260878,-2.6297279614335207,-2.1100426270344235,-2.9421699347646273,-2.8523975420786356,-1.8748901791645243,-2.3647258490303433,-1.6568394128828328,-2.606057713820512,-1.7841831422098613,-2.745043068175068,-2.2634861877605794,-3.0617138774489026,-1.965533183377833,-2.1503081016940415,-2.624578393097523,-2.0303927458097877,-1.7442904366234546,-3.1292838901394826,-1.770824457191614,-2.266240062185049,-1.793356638546756,-2.6537868987571835,-1.8370540848672576,-3.0985190525105852,-2.240902343832733,-2.0872737747850785,-2.572980761213394,-1.9646168525271654,-2.546549740870931,-2.9531488248357247,-2.1253462093678097,-1.8193942641887957,-1.8994053789516023,-2.3259046806972554,-3.0562022349670523,-2.072769400087303,-2.8431615298452284,-3.0928135048348744,-2.2796520820726953,-3.1192964997674566,-2.2030433329695263,-1.9919605468894432,-2.347714213267241,-2.3529899232239435,-2.8380708588576167,-2.6022461689534495,-2.243132476297573,-2.9365133356965347,-2.26942200885354,-2.7861944038798376,-2.2674434756791073,-3.0468365727930458,-3.0646863835798417,-2.2126677840147,-1.6599958527774161,-2.525780016795082,-1.957574433311543,-2.211208964922415,-2.8750336356686947,-2.4682814792567433,-2.5258886466678074,-2.804884760618742,-2.434242641275907,-2.4494181970801354,-2.1481540748320738,-2.469931395626184,-2.107075365023791,-2.958733123926754,-1.8559123134497237,-2.7058749159679603,-1.831267064770032,-2.2097578737299837,-2.9835667016795426,-1.9242354654054248,-3.0103603219117576,-2.668237160041092,-2.5324563311052852,-2.252819476712996,-2.1876268507495165,-3.0903560294025905,-1.6462919551922128,-1.7234846727341904,-1.9881250078137214,-2.4839542802115755,-2.278414970373926,-2.4014202582257207,-2.7397037335233465,-2.296095452174697,-2.6730594417672133,-2.6419194136152577,-2.619675023071604,-2.2771363236147937,-2.087092454340853,-2.2737425705248087,-2.2267909303419153,-1.771124094970147,-1.9487208561078642,-2.0798360972990633,-2.8210498270692366,-2.7792024979242784,-1.9082524206553386,-2.9147081015735776,-2.4340924327906563,-2.109394228925567,-2.139405791741603,-2.969358939313382,-2.036127942537015,-2.760953525504326,-2.9187384736555027,-2.2352689680969324,-3.0095956370048116,-2.5560993269722587,-2.325109226770035,-2.9412846206144234,-2.69632919504776,-3.0637736561184568,-2.227977375534033,-1.8155227014164945,-2.686868983944521,-2.968876547764189,-1.8072345794720197,-2.9674545215483286,-2.865209277951418,-2.95045397960454,-1.9760784744415458,-2.524797892489363,-2.7643954128827364,-3.105062706154098,-2.3428933862078605,-2.21703473874082,-2.656423213246841,-3.1412548582825943,-1.9117969908254657,-2.1272833434878917,-1.778473647106336,-2.2418497782174978,-2.2654562396894375,-1.8586898530968676,-2.6162153512500286,-1.614007537872648,-2.913948504429955,-2.15492157299575,-2.356516659956559,-2.929586250316446,-2.571074374191449,-2.401317252003013,-1.7970065802628512,-1.715132003576761,-3.096643773464259,-2.850913653035261,-2.2495132300901552,-2.030795303218828,-1.9317349204311631,-2.279917106167657,-2.8693812462234396,-2.9571063178472916,-2.2776874360901527,-2.3455968539329186,-2.8997858182158613,-2.484327068809133,-3.0290699705736155,-3.006656368664408,-2.115401731896138,-2.3022201700356684,-2.1384664012123955,-2.573304384276486,-1.5794152842919695,-3.0890886599212566,-2.32312289491864,-3.0356227846859114,-2.488199083684944,-1.7357523464223135,-1.7536442908474246,-2.530747189081284,-2.5645927392851924,-2.018942332170811,-2.191022666319918,-2.0329214605693076,-1.854713758219012,-1.7830600784315416,-2.353579651449121,-1.841526295810971,-2.0819668621805145,-2.9519046399054916,-2.085001310618167,-1.7589946335633033,-3.0450326962144794,-1.8758224821553349,-1.6210378926691944,-2.0231624630606504,-2.6686287358494485,-1.6056640493995185,-3.0803579454243954,-2.1816152099617607,-2.38128163121232,-2.3995457101058446,-2.458737103562939,-2.894309093868488,-2.661186042300288,-2.520585003996554,-2.925094107453742,-2.7654361098699654,-3.0084401948761963,-2.543069036352016,-1.7912190066185711,-2.2368005151615673,-1.7853992338755829,-2.3120272374324,-1.7466353493939615,-2.3963050522838962,-2.5707107247057244,-2.557308116602628,-2.581104501957003,-2.499282969912866,-2.005615815015677,-1.9097892369621168,-2.29721149645145,-2.4559874389602916,-3.0179287025042023,-2.202383130767689,-1.929309419601013,-1.9355901491683343,-2.2367196124343174,-1.7066770210412892,-2.4525252668385438,-3.0115505697701708,-2.705242270358109,-1.7395859860837892,-2.4075824462749043,-2.1320956064104895,-2.795586173423735,-2.529310148289018,-1.6189807282455773,-2.901437609356306,-1.9533635885695604,-1.7686560917784973,-2.431569873019242,-2.2144236101797525,-2.2410367990066877,-1.7534388642433172,-2.2929934883478573,-2.4720258793392915,-1.6801959627319238,-2.160211379825808,-2.161635658962225,-1.6907602464865972,-2.471670914490595,-2.829284147575368,-2.736489149829974,-2.9267767534601536,-2.159825699837685,-2.9756083666734674,-2.06147342237807,-2.7675445886802734,-2.707148050567775,-1.7496259127888485,-2.993555732072432,-2.2101988058810296,-3.125385871068647,-2.704746206044505,-2.3636530523216592,-2.104742640534446,-2.2822097169541307,-1.9233910004438572,-2.4803908083567547,-2.974478121734969,-2.23744549055753,-3.108168142908352,-1.8528762144539497,-1.8130100927706185,-2.115067564924269,-2.433111553851497,-1.8652013533290284,-2.985700026620686,-1.8466105824886783,-2.321641388954564,-2.2025153735492404,-1.7906480870735113,-1.9364781160639042,-2.0764980164649645,-2.410329748124444,-2.132269295131575,-2.728982019969424,-2.6547539288463877,-2.8688179547250394,-2.350798904286219,-2.6478367935585583,-2.5747856789236603,-2.1064607626627,-3.0368522002578495,-2.8616795406994666,-2.347638849255006,-2.782322517358413,-2.5491374838446736,-2.184331285448268,-2.130627797106891,-1.7856582554136347,-2.7135016859353946,-1.9375151657229317,-2.8278211445879538,-2.4219720597269365,-2.0670199071943056,-1.6195911124793925,-1.8864177804413884,-2.3769635173323187,-2.4521671536954193,-1.9413258297866733,-3.1049671797645395,-2.8854443981898896,-1.791187558221222,-3.033563272571203,-2.60927023861041,-2.488682571863292,-3.1162317891951266,-2.4256952350136327,-2.049245938673738,-1.7014490364372588,-2.0048670305215515,-2.8821072195729784,-2.8668898959677205,-1.5746662764990904,-2.2801509340261967,-2.65339583900893,-2.487421655339425,-2.6505727947083177,-3.0235902586801604,-2.6576512218264816,-2.126257452446284,-2.6874907807583712,-3.0627161869967696,-1.6842268439586043,-2.1466369608838707,-2.0370053256837135,-2.0978604819466375,-2.3126333039571794,-2.5617408264662034,-1.7694399107552568,-3.05595674555519,-2.594638644063126,-2.7458166474045953,-1.9718776616465832,-2.3033710023871503,-2.9427930001968146,-1.5967483589256088,-1.9045363831261126,-3.0419459579364965,-1.6443574244291963,-2.639109932920404,-2.31076663162103,-2.532900729091523,-2.381452700292275,-2.739386157030858,-2.489843744882331,-1.6620969817356708,-2.5354534067939722,-2.1483284146787076,-1.929866610841956,-1.7452348821939996,-2.759630304792146,-2.8376487845073077,-2.6796722629554397,-1.9680614571424668,-1.8885413386054961,-2.350405461570746,-1.7798804601736415,-2.3027937922077824,-1.6129733762886886,-2.127870294847956,-3.0628566074926926,-1.6963260274575735,-1.8494670634194812,-1.8710945166268849,-3.1336627016479306,-1.7956055457814335,-1.7852501779959806,-3.0121373096641557,-2.0129141308133116,-2.414142475847865,-2.7221311527852143,-1.8365148888083576,-1.6013380125664214,-2.0287891717521975,-2.6778800736422927,-2.0684394552369785,-2.2413846870203744,-2.224822646926592,-2.4401322789905056,-2.6111357444051166,-1.8088179569424063,-2.483799185073815,-2.900934478408647,-2.3918452343131826,-1.9214541065178123,-2.7916661988305096,-2.1288081650549593,-2.0659243456728817,-2.1996642205483328,-2.457777454066193,-2.3338689517233053,-2.5300155784530394,-1.992408339477623,-1.8669701571940882,-2.8831562800104016,-3.0612121145567497,-2.054884992589397,-2.5521225751187773,-3.0976048146265938,-2.278077864204261,-1.9170219827271895,-2.336585774467485,-2.658308791439096,-2.156148052848453,-2.3065014996347593,-2.1390962223443095,-2.654493848475512,-2.5936413511140466,-2.2708530010567385,-2.797966361259681,-2.639483884272509,-2.456141598031249,-2.0578108634579886,-2.378142869682403,-2.9774580370066945,-1.6490782919038167,-2.9470221336372613,-2.255028733586613,-1.723695985117568,-2.0057617625148554,-2.333510911427067,-2.659440965266027,-2.3087318377518145,-1.697044426052547,-1.7341493684911267,-2.5199611117179144,-2.1946428499566784,-2.039847651864698,-2.333507008995972,-2.3136645993000045,-1.607238288672551,-2.611839300360518,-2.5400378065156834,-1.6964261965385126,-2.2071279320408492,-2.336830499690169,-2.1905950915687273,-1.8600270106994237,-2.9054194925899126,-2.9546470086615257,-2.294264658945006,-2.5290349881020693,-2.4330433795085784,-2.130077658184348,-2.3771117969775166,-3.0957326042004834,-2.353194181108072,-2.6286689882948977,-1.9423426605282403,-2.279123950669943,-1.7355865823226018,-1.8950402785610534,-1.7032469383660032,-2.900804531361211,-2.5148269346653027,-2.4571454098110914,-2.2101624214746782,-2.4485531231862083,-2.7380994631831372,-2.5482211346615458,-1.63587031928217,-2.52427848226618,-2.1987403700335633,-1.6523794248274242,-3.0883049057684966,-2.6468274449116462,-1.790307290397103,-1.8006751462037796,-1.623686274648081,-1.6351372465623752,-2.256562072998003,-2.9868009851576787,-2.295204716169057,-2.286999389931637,-2.5062316578470742,-2.030212564676507,-2.4829866319637954,-2.2274533083333026,-2.1883077964019146,-2.756270916705179,-2.321499844195739,-2.164486615078495,-1.6295343299788136,-2.9076972420649425,-2.8377246631047073,-2.282961130670338,-1.7821575958817328,-2.0583620317504803,-2.5521642398823774,-2.5098644752857195,-2.2180153340014046,-3.052262399339468,-2.625566057221854,-1.6122530413309744,-2.5839273813740014,-2.796286587273122,-2.688387537447364,-2.6795751273665713,-2.65999318142872,-2.8141026736244417,-2.2427924060144386,-1.6471524011186571,-2.1827460622769594,-2.663604597032197,-3.0384006013921225,-2.0747209331115215,-2.7614745151786906,-2.461062050955195,-2.7170940404368253,-2.7985466695156234,-2.6272567727574536,-2.839382448728562,-2.9193182222220457,-2.3449304589601283,-1.6624278614083734,-2.8345117037003726,-1.7642913718419257,-2.476104022787392,-1.7106000056048845,-3.1007422000942793,-2.296589485891274,-1.8544034058021797,-2.127833830342916,-2.914771864395168,-2.633908710948576,-2.118524205341113,-2.021334535013237,-2.18775940506721,-2.8658032824526654,-2.988656014050994,-2.432684990550899,-1.9919234447260263,-2.6680112261301736,-1.7984623174837824,-2.0482748485472477,-2.162019601178854,-2.739688450668549,-3.007065704017072,-2.8812720312673927,-1.7601582993849672,-2.781774997785466,-2.882468450114807,-3.1141108772246295,-2.0439421437232843,-2.6234866768079694,-1.9040092417469385,-2.271983371884741,-1.7036948222478052,-2.3722421100177247,-2.659268835541435,-1.7326282097641064,-2.0963644569093276,-2.4304487403303234,-2.4793211325477924,-3.0733085887694647,-1.6975790532971549,-2.4214430715567015,-1.9833232827180918,-2.729564688656653,-1.771129840217893,-1.840951865292505,-2.0312992471229707,-3.049267596880973,-2.3527810307926083,-2.1914876005561066,-2.3354096856459066,-2.7624699725371977,-1.8500048830665956,-2.336235263914002,-2.2556279019352083,-1.7776929509400274,-2.451877741144658,-2.9777368259629995,-2.0516856386236784,-2.23048966853539,-2.762140129197169,-2.734096949228,-1.6406355568235327,-1.6856900606882306,-1.582336214049578,-1.588516529930508,-3.1338029958444045,-2.4696843876276358,-2.8332768295745328,-3.0841205920255255,-2.9341842600738097,-2.5646386822543956,-2.631988295715151,-2.3014481505498274,-2.441300886887407,-2.6605078701380123,-2.231742008488047,-2.4931069595717705,-1.873099559954131,-1.6449877555526948,-2.9072130199951873,-2.0884133160529923,-2.7790824534837193,-3.0499548199582636,-2.41104974961146,-1.672692819742318,-2.4313326733123897,-2.6642211440578722,-2.2733324583787184,-1.7430467132904632,-2.373408633487071,-1.6241838279245189,-2.985721691986463,-2.135352493509272,-2.262182974466045,-1.6817049306423735,-2.585687359129227,-1.6921587121645245,-2.4468600800434936,-2.7196800572344526,-2.136905097815013,-2.404918861202361,-2.312991503761495,-2.72381190915555,-1.938187104173067,-1.8292398835047383,-2.587425262762601,-2.214780302832369,-1.7741707079051208,-2.5851791976137406,-2.6038890414670903,-2.2331633629808545,-2.5800373886582806,-2.299778496226848,-1.5852271879894764,-2.509407508442259,-2.7686454788350656,-2.482851327357114,-2.2808473586102207,-2.2940229400166503,-2.4675008015478705,-2.7014678815376882,-3.0895100465594134,-1.7959987680279608,-2.3171390363447757,-2.733402692780053,-3.077782347231016,-2.8380607059071843,-2.4600053332026257,-2.379106190890662,-2.8608187275901584,-2.988104324515113,-2.6738650658818734,-2.647202055481248,-2.3603366507370658,-1.7596535484899831,-2.8331248463525722,-2.0526569258347482,-2.0498383007049443,-2.641718579840683,-2.3720316278942524,-3.00180142348012,-1.9094202737209798,-2.9777604174628274,-3.100956348553025,-1.7104754954711339,-2.8096394005158385,-2.535432862149647,-1.8261780994176473,-2.1486635992458667,-2.6474369733771743,-1.9139344501507503,-2.2860316376600522,-2.472476777608288,-2.9970650719370298,-2.464453305825381,-3.065621976806025,-2.616870107491953,-2.924507236087459,-1.932181154247798,-2.218301961301834,-2.1865061645275445,-2.3218072853337346,-1.6303790636023263,-2.180933314019175,-1.7957663768019085,-2.3259180071903143,-2.2945828626228413,-2.5272245650058296,-3.0902175114513923,-2.152684409142042,-2.8630890689379838,-1.8371521398104023,-1.6375885001929456,-2.8026835390830045],"x":[-135.84088774256077,-141.32529960899208,-353.8099928390933,-202.9143476596441,-167.23121160061638,-100.52439341271469,-18.95063197679525,-17.529269318336205,-173.82873624662076,-94.86039472466234,-249.9153397518168,-29.330932177389137,-268.03386092556025,-243.27408595973398,-171.51739567496992,-342.00652115211926,-13.77209407746971,-223.46259246907218,-411.0237432682532,-436.05319288196574,-82.48840341873243,-393.85655438204594,-447.6398536681939,-352.45677806399203,-340.1804990833421,-123.61831227368059,-479.40187492225317,-317.1549762953959,-390.90643510709845,-55.300637649259635,-100.1898926079079,-20.876424742280463,-200.52415377462674,-281.3481967585104,-445.5216269485076,-454.3452081299271,-143.11684581672878,-479.70131917254713,-154.84942443140991,-104.31018590244912,-21.131693864358535,-50.68406139635218,-80.26233042913677,-423.4379354528068,-491.49722222356775,-190.28456322707854,-455.61506205028456,-347.48552245312493,-126.98526626326534,-295.6279471699975,-279.78317312569413,-201.47628304826026,-71.71139073475896,-262.5628990147838,-398.87576968392835,-178.47586255756175,-376.71430170604293,-457.1902823606768,-485.22380880068994,-123.15837591760481,-429.0019230399422,-61.69587427204415,-94.19740044379455,-288.6181946721399,-11.535703340946558,-304.46323256424535,-341.9795767796876,-115.39336187285265,-122.09402598751407,-186.53085966716677,-290.2713665826345,-192.29631130238621,-231.70017716025237,-491.4646662336457,-499.09962285908784,-96.38296096613286,-125.30589705811357,-328.4487762371665,-324.40948116281174,-468.3823262369181,-305.90503619793765,-43.29191530085041,-467.5236257121862,-397.01785537826726,-212.06823021155984,-224.7251877433849,-159.61157223209833,-186.0378692048742,-342.3460406736596,-64.01104293360271,-15.201370087966847,-179.5700813341704,-154.24660238506092,-358.52272850378375,-49.89516954599627,-55.111288908683335,-470.3414400274686,-328.83043242229957,-144.0969290625983,-119.3027411810732,-177.8309372487713,-51.360471248662606,-143.92771021284466,-185.4158903197739,-73.40625518415045,-1.8798687676466752,-58.25879140314183,-147.1771333190258,-98.67733273079548,-493.4239385937868,-158.28152299094845,-391.0583349306762,-301.4980423476353,-295.5572150829101,-42.17156203318895,-56.22767532562756,-460.13661278162164,-496.4853843305923,-119.94748799007438,-289.34049395427064,-348.2584666829507,-12.065926004394601,-66.8021913601996,-108.38664459981406,-284.0322290186532,-122.58093795120895,-40.57294274774015,-401.495824581627,-472.5700109990935,-395.5256941946064,-460.027075289099,-290.6080575272281,-140.92010389049491,-300.83117740377673,-362.127933199899,-79.04806827723209,-440.3489306864733,-393.5844206094488,-101.84023968310495,-136.58520386322758,-381.83579794301903,-75.12306152331638,-433.3949979598021,-72.28007026889505,-107.52107764363161,-341.5930197831656,-152.57290742794095,-252.16460195007207,-214.5146842050174,-120.27340482731685,-403.453624453057,-391.0898467965553,-173.1656143661119,-456.32554373936983,-8.54459627334203,-302.07057233969124,-354.1987273513391,-355.76709462550593,-17.72241569064581,-477.84385805153386,-424.26371579060975,-247.8399187189122,-23.845907225966023,-303.28953006797553,-253.33835817064752,-347.43786691707015,-119.94491709843003,-261.29082296161033,-473.8503400908789,-128.26403040305945,-85.53446826484013,-305.46261948859467,-26.01714545436962,-290.1677875398849,-136.98319557810345,-172.3404758522331,-359.72753722753646,-235.93632667740337,-127.62424517888427,-57.29362450658937,-145.55048148056636,-136.98324475613921,-246.03123635978318,-491.0548011396326,-30.324105661031496,-131.15787605070196,-102.6531424169751,-485.91930969673524,-61.964359759330904,-117.8737597565045,-493.0494427365855,-283.53235096405524,-448.59192616383206,-193.85715559440885,-102.07395730472035,-5.0127882332591245,-290.66378530257253,-180.02181473148426,-255.1201864931748,-364.84191066444527,-111.63917659136624,-110.83845093814548,-252.33640442119886,-242.19225374851473,-314.3322382650352,-312.39197556110867,-163.18522730635644,-483.64909058710145,-462.256607566594,-185.3088782471487,-484.57695450454196,-341.1381727281624,-311.88156583023965,-350.4132433460404,-22.10623963329139,-66.52517807055203,-160.17576765797094,-208.56629233642977,-198.92486400975307,-322.9346349967642,-322.1702438870462,-283.47040596753624,-195.73178146808968,-157.27700229910747,-5.526147242859825,-342.038068999021,-354.5282808248633,-470.53580746453804,-312.8233140108697,-314.24078068023573,-228.684324546504,-155.18055119931506,-12.616536240181443,-55.68211029415371,-35.069845056827646,-112.94832775453133,-214.74307912215062,-432.922799848917,-390.97140265595533,-188.00936742934394,-214.15163991096776,-92.61006863923393,-170.27569923968312,-475.16901242226936,-87.50818086103173,-21.060795671815512,-66.14063646771729,-407.90366309573955,-86.24868680465237,-25.769613995636487,-170.23649796132435,-56.489393523116995,-79.90470826465157,-372.2040228346093,-150.0568901292234,-301.78770679306746,-139.45801601909946,-65.27691119813994,-124.87521302079452,-216.62294351447142,-368.40536453602846,-355.8648604524034,-192.64997350911796,-355.14652681566605,-192.61670283977506,-319.77521200318915,-78.87702109362904,-154.64513566904913,-21.370894570442612,-295.9531886296134,-449.6675065552997,-116.12610586127614,-383.1006520728063,-214.74373112193246,-389.23237693539727,-393.8701810526243,-245.54578372679603,-68.56367621899784,-477.09100781702307,-24.875660879261186,-51.90105412465507,-220.2949425158982,-323.72551013597086,-493.5747396520923,-405.77139573581576,-120.75417039005254,-139.9737000122675,-469.8632624061172,-433.8686561910786,-271.353971372509,-201.45774982016974,-361.8992839330545,-243.30002747505807,-350.2423067667131,-221.62433824575777,-415.269057454721,-288.9709056039582,-441.0142889210872,-452.6085048272328,-153.79353218668024,-446.1790751332205,-252.3262975711964,-247.8365811949692,-252.47637595673478,-146.5868625912412,-472.1482551599472,-352.7441031351786,-98.53526102402488,-314.0188007748715,-29.388573727109346,-334.12559834666246,-61.09017393919514,-259.0466795042188,-298.36857696604613,-418.92968876423043,-90.65509506166103,-272.2033110742733,-320.89841981095736,-235.7650031943803,-84.27199520840244,-251.9648645596403,-82.9670396416634,-291.8652062729844,-82.69031804417793,-492.87079465902536,-102.3490526073203,-430.7935013295653,-242.61268931958656,-241.10574972911613,-372.3894411191265,-152.07611066999172,-315.1067809498317,-391.0746737058537,-270.63238157523074,-122.66592409128074,-81.62914341119765,-63.90008727084329,-313.54502743461023,-43.5120511060807,-212.06227684909905,-367.0708364369284,-367.7567863277783,-78.13789418837847,-329.0143518005396,-179.6009419838368,-285.80585659892387,-245.6997948971833,-384.00145950345023,-250.5149605416961,-295.111702298643,-366.8965275981413,-205.1484490306651,-317.01188111592006,-317.63947828463654,-328.7694665208806,-227.2832407874349,-137.44576280132125,-41.1678660538316,-357.41694460137154,-140.60347308329435,-349.21061077994034,-375.3993978615824,-163.0501515582985,-262.55048896624345,-487.44759520388993,-370.1134937408698,-409.14675558629386,-217.07640863703216,-330.0171545278762,-268.33224207159856,-362.9209665238794,-74.79411192153984,-309.8045328773517,-42.217977155670994,-233.44091531209298,-495.3565709998663,-144.83364646545115,-284.76560831201004,-354.82298855224906,-499.3433746499103,-80.90178156172756,-335.3122363432559,-234.95704384703564,-21.494822452067687,-75.45500773051283,-174.10767596510834,-411.41964046373715,-408.0538959923744,-270.6190298103399,-345.42786495444875,-95.3139096360811,-317.2006206212792,-498.53462936028126,-446.9839438964415,-387.9392567533175,-263.04153184343426,-147.81003176770946,-64.1063827199505,-83.04502718711882,-106.53178201158254,-93.65093627803634,-497.8096405958979,-393.86660496098125,-151.37595843651786,-245.31327370426283,-137.45393929579197,-261.8331786816054,-301.3046537119036,-366.93778586184953,-234.48128245419852,-342.9551599645402,-207.5927452357109,-334.5637904715494,-232.26472085134176,-463.7823277483039,-174.8006366743271,-129.10250645531963,-106.59225782452575,-124.32177804176247,-321.43263226823046,-116.16033982879026,-410.30578374168624,-321.19664719330865,-79.830205628176,-436.9890883983131,-458.5515906341359,-389.1732283065831,-193.85595604446902,-262.4444116683182,-438.24912634034473,-256.45403877760396,-384.56721751201627,-275.3989747034026,-207.42943105532495,-345.72568897628776,-81.64480315960343,-262.2146548121465,-66.6633455622856,-167.45730916811485,-332.97088666882337,-69.53354242063614,-461.7250655324373,-14.06481801971793,-336.72891164169704,-172.47193380099057,-321.37591730706805,-378.5603413736829,-30.179164275595195,-442.7180963158042,-46.6381495990813,-49.248313546145894,-350.397214214181,-386.8688448418172,-351.9775945116281,-236.5106019739791,-40.582369475563155,-369.3353563968043,-482.1482608120963,-468.7300941833013,-333.22493032995436,-297.14338516818384,-106.64336304052979,-397.6380647326352,-474.86568472882664,-367.3472466282016,-275.8265431586914,-312.14433416501697,-287.3783418499495,-335.1814447844429,-3.803104806932134,-380.06578589983474,-297.2296692767884,-403.242560769003,-480.8150717610948,-50.33626065253516,-56.09162373870347,-274.69382549676516,-382.67748020145285,-200.97085163294037,-326.6979530596338,-116.83526502153885,-89.20514966971726,-74.60703120533208,-216.52787603350575,-64.54706970013302,-186.27179944245242,-464.8533763610366,-202.34782616270186,-73.6329817226603,-215.3884989806446,-100.83847791384993,-11.24267115449118,-20.077299903418556,-200.0896517584635,-16.823142081764164,-311.2648987057013,-181.38656326643354,-159.62790541011563,-422.05683385481404,-397.8053450097618,-330.82083302219934,-317.8344868015127,-461.2333639878381,-146.05929308167498,-229.74635044909442,-327.5510567285909,-238.6829912885241,-100.21520927521831,-57.20329616936548,-107.40708991879511,-260.8137572762349,-33.200769489670215,-257.9500703517689,-492.37947666992244,-369.58384515066814,-268.31587134099567,-351.21877611165576,-153.3177347623882,-173.66081531927068,-209.0642559372752,-495.6058020542097,-452.5961490473838,-151.5847252281225,-178.72042995008852,-56.74789452603102,-382.0561806466185,-57.10937672510086,-464.4018102939734,-343.5538630176159,-358.5638233210739,-83.16147726263657,-238.42399174505303,-206.19501699123333,-389.17019668835206,-424.0176645138702,-15.558653793205423,-334.02855962883416,-143.74494798278704,-71.70447720975103,-450.06737112881115,-344.9286040291206,-153.147414152512,-46.03379561670495,-166.68112740301333,-479.6029181846055,-14.181106224615325,-176.1673730466602,-137.39133264142333,-51.94568256286025,-27.31565758855026,-495.81403395242995,-240.15842141372002,-245.18514113024148,-327.76045089917193,-495.81347557541847,-249.5429029181836,-442.97893996914195,-328.42043230734276,-85.02806480269697,-343.04863545602046,-371.2953710826523,-431.24467612272167,-408.76912081497386,-498.4198708670172,-263.3154192539573,-390.5831036362076,-71.29466279636631,-414.58892016093586,-391.11308096792794,-122.26539504186262,-127.4733558766269,-28.852303130551427,-109.55544777711734,-273.162703188456,-223.48992814812684,-145.07406643660147,-160.09120588677982,-70.2856569316439,-252.21478716371726,-325.1259357043672,-78.17914071205911,-89.02057691031406,-120.92190277089298,-384.4058439655084,-312.91114929169584,-383.28708931299695,-477.6134205145141,-448.6141448070551,-451.50900954441653,-253.89082473413248,-240.34542501329682,-285.6338997615343,-96.24150728816406,-382.01859527908556,-127.11763542201682,-261.3318112081343,-455.9279374863737,-289.3019378475852,-205.08494369317688,-100.1883928513323,-82.35233162516964,-125.37907274066973,-201.14674166345935,-406.67401885691726,-69.65886845753889,-21.966801306550153,-135.2219883427763,-476.45513568722185,-295.3625556097428,-58.033407387000246,-185.62952035060897,-297.9148240069067,-69.32131570999,-401.1060713518727,-258.34768496861824,-398.378426023567,-494.7945065678629,-497.5754473645846,-164.84181430903433,-26.629223849946037,-204.47967272943202,-426.1672330231685,-356.84482230796056,-1.5934273076972927,-288.8452011864796,-494.46861014907506,-111.77487222101546,-176.9066227977779,-405.2367369216978,-451.5918128152735,-198.88145677169655,-464.2013822263864,-474.18536330908603,-34.005740284313916,-279.81551671688356,-244.48826331218666,-271.69048183316545,-79.27779838150184,-329.37883887733165,-57.07978011786885,-485.7779151292311,-381.96429429880317,-424.9834548973932,-198.21672393226032,-58.01070198246472,-426.31177139277077,-12.540509209825634,-73.75420957066736,-395.1781758833152,-26.43155760301108,-420.8760889390459,-156.07167930297416,-406.5967927624988,-405.5263239014823,-104.15325377498341,-421.1450778150815,-43.22164821312613,-390.71217840857275,-236.4811129891813,-167.82371899016724,-39.77693473207567,-397.90263328606943,-331.1399585881555,-164.67044751853544,-174.05198382387388,-144.41418820178865,-182.29654822678242,-62.134363018091385,-215.3631588420034,-11.971713762063075,-77.3486072469013,-290.728601916477,-45.40550010332767,-118.1015193512437,-43.29267762086842,-198.71835116961023,-108.68333350070391,-39.753048758592534,-434.6970390044669,-112.74679186248105,-382.49877483105985,-310.4939745020374,-47.09826535649797,-7.589168095560095,-132.5091435425535,-265.4877972481241,-207.24574033053324,-261.46169351067715,-301.4956277810149,-288.8550062341613,-196.73183639547597,-16.298345223773048,-410.1931037015403,-331.9129460472885,-161.73736533623983,-24.552734929783714,-453.13570288970516,-277.24181296435336,-44.96471905668553,-297.4008931907345,-159.35362361563554,-393.235286248378,-235.2155583230766,-106.90718227988194,-102.81147082596532,-271.8770055506606,-226.02938742887136,-231.2448077907,-387.9612245193751,-431.46619176804046,-180.97359871916052,-135.3204950082597,-257.0595170583028,-293.34910336911145,-157.97532540014646,-419.3650391379462,-245.19706121827488,-249.67515931591498,-183.32507999756476,-251.20326392633453,-439.03989748128356,-336.44370583752834,-277.0318769730613,-155.66449319692845,-331.5685635350709,-259.65302737557204,-25.783149554989613,-351.0296536786998,-137.33683401788244,-64.14810845059449,-181.92104819032627,-394.73108939338255,-362.1052839098786,-80.62647428012949,-38.97805476982763,-77.42752978613554,-393.87577452306846,-230.8365739025735,-223.0074756412671,-171.02179347789314,-302.21790688182983,-15.919136654546362,-457.27233486085237,-115.27064429143219,-44.93564257981686,-247.00758805616928,-311.07740888567105,-335.4280737324963,-49.902609208588025,-82.4819174150705,-394.824503872115,-237.3407260093524,-178.07028602230633,-151.58195973230104,-208.8326181240492,-442.1368533142394,-450.1268062991542,-482.48718035597335,-367.0339506721496,-75.77061770984083,-216.05636001098537,-80.5711177095253,-117.36529541661811,-57.301832880288785,-299.94317589213296,-368.71892087497605,-209.58863539057648,-222.02667300603008,-424.91266594201124,-482.3164514569063,-201.1321899972084,-30.963352531124812,-64.92425364595312,-316.2116581670935,-22.346348867231303,-229.30279087715655,-424.8496574385819,-92.87793632918284,-35.71472070478266,-22.17370576685951,-25.433650953640587,-391.94095965385543,-347.5241470650423,-209.6508400155782,-188.52688777128202,-434.1556244823652,-98.63229440402755,-463.0684764906856,-250.84661635804883,-339.47872509711164,-356.9110707074203,-292.6647461268289,-226.21966594041564,-10.592368298240618,-333.54764340121557,-438.60728071516286,-299.15743817988647,-104.31121817642952,-236.18251273193124,-496.574234801201,-368.99850280450966,-343.26992194202853,-323.2755527411655,-437.64085250776105,-13.978238194833125,-414.70180678735977,-471.93565471020304,-287.4967575726178,-230.5826208369772,-409.70024154256237,-427.50708747962915,-78.35755004509792,-2.1483617580057013,-189.68828340086452,-159.3190608216273,-427.2059344482292,-267.1881243393439,-441.16895882072816,-376.7640535766006,-400.80337466251535,-216.23239340750987,-443.39087741122376,-412.0712900981722,-455.1501235829023,-480.483777712989,-43.59262991699164,-443.2630372932599,-97.59907816253444,-261.9653643813715,-50.80320374156566,-277.1756203120884,-310.5218828868015,-83.06640433085511,-166.2490963535247,-403.93552252151034,-268.144455995991,-192.56599684384545,-215.71869757230277,-254.90126069314468,-239.10617453451033,-411.76332549633656,-458.9900174205026,-109.76630093293238,-408.4145368355786,-82.52017715039817,-222.66879282257867,-77.96128214946785,-398.0126197822509,-358.9920501908659,-353.5588610054996,-12.45102228249706,-320.8299544421714,-263.9029890879758,-488.8743465409796,-214.6305954066674,-444.1570159607283,-155.61185267979482,-367.2333379686481,-38.553491557385854,-491.78433544474956,-238.83538420133078,-55.05552076273346,-287.23172433190535,-289.1398176864716,-237.22142080784215,-498.99034717863555,-35.57811772130104,-397.2546352640941,-146.87937230224202,-434.0169212775986,-101.06937330925203,-113.83766489240799,-92.0186303407775,-315.1082523955239,-299.060287605491,-303.96381925936913,-300.4579476828789,-321.7418382600207,-83.11928289498083,-327.43259122958034,-177.83792657883856,-58.4828892587389,-336.4119209479076,-427.91985846067513,-238.49750685019268,-308.9458641243269,-387.8081216198541,-139.81985095421635,-27.96426873341751,-28.30844215455597,-4.964170844618199,-6.119703174793933,-255.84506562805953,-484.7250733260109,-325.0939822383764,-480.4634064642782,-310.63179672178234,-134.95227346204675,-435.6086635283997,-203.46575715874727,-302.27301813609085,-243.10961856133474,-327.3426258968933,-462.6014620770643,-123.97307352460784,-16.746117352814505,-393.7808087078072,-250.61113356833542,-60.963424917467314,-428.6790209310934,-462.6411039539761,-46.16685390712527,-195.56429609390102,-476.0478287347206,-186.33900495168655,-43.94061990023867,-294.195665516167,-9.05942653548253,-487.17103451087996,-116.12178643649662,-346.33588320958086,-52.289252525973716,-248.2842954801243,-28.689910023128597,-207.08649043732697,-427.164063179539,-305.20738818373627,-260.3307472340415,-404.8351712557743,-477.8466095308005,-99.76144816370436,-116.65645667941504,-415.3259989395219,-347.3113469359996,-96.66710091587049,-215.2425181200718,-475.0148956245036,-282.7123014030145,-425.7061127137145,-242.41474697925014,-5.325756203428789,-250.77340785855483,-483.8382751021975,-452.67814656429505,-316.4237225832196,-317.98585866990095,-307.687338308952,-354.8039560146865,-358.1325153894682,-100.48111302170592,-128.40134548494132,-237.94372852945378,-173.26567039578322,-485.1593928600024,-343.6072109705677,-309.7891663383822,-384.8136503517664,-314.9925867409723,-177.08750613998149,-223.51721222400778,-463.4481967129578,-56.44426530058333,-209.35758518756563,-253.69332028145297,-41.25849094178336,-487.8826738393618,-283.76737550366306,-269.5602960729201,-118.75715177940349,-269.2204688518629,-369.58450014726094,-61.685020025515904,-372.2794497973434,-333.90283033834834,-67.38480664159951,-211.25682064050378,-265.7312204092324,-83.45643746037756,-151.48998914957025,-356.77171682665687,-204.03958914714127,-171.48570639166272,-385.8583099730927,-128.69362342041234,-426.031808813227,-182.74647641211516,-325.66773978658927,-289.7665052268932,-342.6564461763867,-8.739173459607063,-247.65234709218876,-103.77424823545012,-470.478054260611,-144.8065282643277,-444.075802079112,-286.8902170754907,-280.26464079967127,-397.0951839814063,-132.52085174934558,-17.22354323443942,-382.64762944666154],"y":[-406.324974409679,-318.58970060595925,-104.91013842536756,-239.56086645296472,-346.3191820213736,-141.17107222270587,-200.38121824880307,-297.0225449473537,-438.89414960317674,-188.72555071386054,-347.5359722847163,-363.0040913318827,-297.29170174101506,-320.2921596277949,-370.5995783758663,-142.2326226953967,-385.63880999097023,-442.169877487426,-499.39552087762297,-106.67835768437683,-402.2961895026752,-65.53000419563159,-374.0267497859723,-71.322863474086,-345.99944817342544,-297.7549544440059,-16.47802567459433,-288.9613481001897,-354.7263236052416,-332.6204222075635,-288.87901846624874,-243.85894291179366,-53.96888927279419,-91.57066583721107,-69.87005525689571,-381.1649364542303,-147.0782295239186,-263.3870310783581,-270.6640293445688,-15.859614396389166,-422.73090756164646,-301.3753996538353,-243.47368058082597,-210.41004163939093,-411.48974662283865,-112.91562676993105,-98.35157537711203,-80.63826588570899,-260.7688485805756,-105.1046287958466,-298.4630429304883,-237.72967519287567,-3.1016107934216386,-497.291158713038,-225.57996033739624,-446.32559458401056,-333.468288554971,-147.4166698986452,-78.49613179027659,-73.85735403633387,-288.30458835358877,-422.5032076586939,-259.8773722331785,-110.18423893168661,-252.1320066069207,-130.58594963609426,-217.76169964160397,-8.430863194938354,-459.8052460718387,-21.38336314008782,-120.03626957313318,-103.17600248776337,-322.1569742363991,-297.531960194941,-65.10265278353589,-330.8973269017558,-425.7188746904884,-485.0333903376618,-81.5212905636904,-92.01976255471777,-345.39689856972865,-473.6463973150737,-324.77918824364025,-323.16391649887765,-286.4093201123793,-173.5503485097588,-214.0162631756578,-61.4441829033886,-170.17872476586092,-334.3775120772262,-13.293161635567374,-112.33373981988714,-386.3983537895568,-245.96147340413944,-290.1471449961139,-481.4138851392874,-208.39602217009568,-318.33055352628213,-106.54612734606039,-485.8689340111612,-365.7502192419474,-21.468653103698166,-419.2612338461975,-470.4471889430514,-18.358134669371307,-39.93378003123094,-415.1464473447994,-335.68623014041975,-358.1740990117941,-275.14281092740634,-15.407525813238898,-250.67179480819357,-195.4545185818486,-212.89320170881066,-481.22937752907256,-295.94105032307937,-315.74950481876687,-325.30953859251434,-288.37250669376493,-16.853075369987593,-251.1075374101427,-314.1163528593397,-235.0530810326198,-117.40641897644444,-63.09030715508646,-427.4686488581559,-258.03705574448253,-420.5232674365047,-181.4208761515792,-471.85717004476555,-355.93353208115195,-284.09948590626277,-454.75569383824643,-22.692129993784672,-147.37934972366585,-205.4092586744537,-197.24301184216387,-434.5871621549891,-158.50837925055905,-63.16049278164337,-379.2901338764717,-165.47926394306944,-271.2662736349617,-66.50580925802197,-191.9602083402907,-30.736298438145184,-233.77559494876454,-171.5610138687236,-255.1354842125735,-321.9319024462781,-240.23576652451385,-227.34814333873243,-31.987315304405904,-338.4863030737948,-81.212635230543,-415.38552144492814,-160.6957037754899,-121.78262341493651,-477.5846369924814,-380.0778094083429,-466.45345549595964,-88.47680193003882,-146.55897851139167,-112.07895702656867,-477.7545259012619,-113.90056149690098,-450.0323666565722,-362.5294873494078,-32.198273909279095,-247.1516807596158,-319.05423050994074,-36.931413670015175,-110.92357726656465,-84.545135065082,-280.57274756881446,-318.209641699965,-96.26743024780804,-315.69021637875375,-195.9647726580581,-21.778307257228292,-315.97979612604956,-478.3670972375929,-481.6793353829524,-249.71402595849813,-351.94120954776696,-18.90439044053749,-183.85342518615522,-474.8437599324933,-6.2155784511470635,-446.6508473722207,-116.26487639543359,-491.88717391568616,-240.96832616455677,-438.3955945141058,-25.1884587415222,-305.7999062445599,-7.250402158522351,-221.85039172348198,-308.6796297741007,-296.82852831263017,-427.1354352861402,-462.8971397173127,-42.08388578420064,-306.50001683906925,-272.27710871326406,-266.1174411239037,-292.52712769134183,-369.9763920122369,-120.07515550130587,-297.42826767711296,-399.47280769583426,-102.50237857989586,-472.0637292988362,-200.96046610813923,-366.6704880151961,-299.3685619744173,-497.3304896873094,-9.644635597096052,-208.68139378124894,-23.38549295657333,-313.3995053029736,-249.97139904469122,-230.23998249041856,-53.92457360715386,-369.9683443922805,-276.769127456714,-87.90616085034142,-482.95084939633824,-174.89614015448117,-4.631136183712914,-58.781733800400524,-316.7930433943608,-101.11907170541723,-416.0668839389475,-108.04139127168244,-481.41454923433736,-392.41699719502344,-441.87872900362777,-456.3601885193204,-198.47870905855447,-0.9931833343365115,-421.2970562802627,-20.68182705412136,-102.6922259048606,-375.0668220439971,-52.24885044936401,-127.0197915520337,-100.51171935418624,-473.7594755049137,-333.5202354411414,-494.51475901686126,-238.01640693755098,-140.68742815654534,-402.8808886702442,-30.722822600166566,-403.6239214559737,-447.88995665623963,-88.33215924244764,-483.6304060629866,-43.972938649885386,-408.70457360657196,-122.18541560661045,-451.62586594796016,-337.42009112993134,-65.33181029105994,-171.84152621866588,-460.2154372077146,-236.91066539852702,-422.2082781537283,-61.40085586321098,-316.62912669223584,-269.70300128062917,-266.317196024245,-299.2686510438848,-43.833951861147355,-132.81647336723557,-173.7880739272113,-270.496805939764,-247.89146897077242,-142.47115582015934,-275.3446400167701,-366.29848370699733,-406.90696761506115,-216.59464667385154,-78.89011185284312,-479.2327932695384,-149.86518465834132,-75.67562903640412,-236.0215016416638,-400.09612348702973,-233.40502066377945,-348.8848656912186,-306.9173668191149,-152.5629566956369,-217.5162654884627,-221.88809315669278,-179.20631869560322,-160.10039867228664,-161.2920799798593,-307.60588229442544,-162.22824315566731,-495.503097151167,-114.63735108224293,-141.84360020788023,-244.9623968150586,-95.42546048489208,-104.95422217619021,-313.97900119480096,-308.70598328790743,-340.7131704919406,-198.26223039116874,-281.92989142182046,-108.47111785844277,-359.5372550950754,-33.534945754995384,-217.605486460674,-415.91355724991297,-182.46413752836054,-476.3446872017703,-480.8506691363307,-3.10153255047918,-409.2301327037226,-349.73627884346456,-365.38628622707824,-261.50389803543186,-375.2714198089473,-18.567311706108146,-306.16418417831505,-424.5612706280749,-237.9612815722898,-365.9827997520049,-213.2907783358684,-74.58051739639615,-436.9387058824138,-483.22402119759056,-239.4016831975154,-67.89330532257365,-26.839005294771013,-79.2761019253051,-65.23419080990122,-17.919617867402593,-428.8503738026036,-1.742463254639226,-449.12838716128533,-400.9221022531251,-290.6948595173785,-247.27958574424903,-120.2689750569541,-149.9436345970252,-370.7136757993763,-76.31578586163334,-244.24127583598775,-117.66155182675398,-379.69130000144656,-31.246479903362378,-17.514049289845566,-183.8845633480418,-460.3009134766901,-252.910478504194,-345.2140504616513,-468.6224529314835,-102.50547148812927,-130.05823464494426,-185.73957958911413,-170.62475507079023,-316.4216307449981,-339.1819793986501,-333.2466925711335,-262.3510031253963,-451.4467774770395,-67.11326575444443,-255.18156433414475,-144.23249362337575,-158.40117541119025,-314.2161651936913,-78.93737016157387,-392.57672998755754,-37.586473373336204,-181.73835831056584,-348.3589479195862,-99.63113862436279,-472.8468676499401,-12.048951203516012,-284.1749934093699,-490.3302515450245,-392.689562106348,-317.7507858492542,-477.03483197633057,-247.1849670712176,-146.81429461996998,-107.51864889845852,-160.54221475706876,-272.13922857368044,-257.0653444488619,-454.6955582462887,-463.3834681430424,-174.44058911749605,-83.28676007438796,-408.98545988080673,-268.3365184597726,-167.80353059329855,-165.26879471722933,-149.32826269483724,-431.421447528168,-56.63289986612574,-117.54942478981734,-438.19594951053375,-471.51902668426015,-63.83148488261781,-466.9948500367255,-137.23487884282613,-47.04430436986318,-427.1227341574838,-30.837555008592087,-307.5100381181516,-186.02046993892208,-26.21177819779885,-50.86865878579005,-9.694172681107727,-416.5805202425561,-465.14006320939495,-200.59617293706745,-56.034127287818315,-331.32137928388903,-76.87509476657284,-130.06481250770062,-75.30536476972304,-451.8433317882373,-186.09439755714396,-173.61960588178883,-9.372421896185479,-394.9360834661896,-365.11221349436386,-109.35662529864776,-0.11678451975627446,-230.074050356874,-421.5219346454729,-316.36668176770996,-210.91130783682323,-399.62873617380825,-234.81528704548714,-267.6731379913091,-325.2874102675269,-78.00652600308145,-260.89401597070827,-321.1689087847872,-81.48166789146349,-19.365969849247545,-404.4648945020236,-202.6429556563929,-338.83406719394236,-15.760578041520867,-115.73274428220526,-436.4036203647097,-477.3676417803516,-107.51014136291315,-430.4602667441354,-134.58705260394666,-87.46889719178341,-390.1303826348076,-303.5091202524067,-26.30172903876471,-306.87030562285423,-53.65982097523947,-49.87152438640019,-455.3793386834507,-347.79895458035105,-450.65786214788307,-214.0321953206018,-441.23789155859015,-19.973328277628877,-317.5694736685437,-42.89223603287762,-368.0990466015817,-302.3767930553716,-303.34007518995475,-192.3345925976192,-249.08055777942184,-418.01826851293214,-457.3995182339802,-234.5626411493017,-305.7059681620372,-346.18796104516923,-217.66321831656566,-232.56503041815836,-332.096563312084,-89.25014281985789,-358.2059552298216,-386.6219498040284,-20.862784941679703,-320.2726553797813,-223.5839931986261,-41.313300215216174,-102.38592000232293,-482.2891387595879,-19.08407431688486,-259.0724180307191,-151.8131014295574,-386.96285623254244,-323.57296146664595,-83.51584134703816,-165.6323776827744,-329.98079289454773,-32.12511881141988,-90.74129073523108,-43.873823662760934,-162.77502148526025,-447.2629759308069,-72.79895749146037,-492.78525597930366,-284.9336049053491,-186.863412804926,-238.0447627249771,-316.21275538568773,-244.4092637005415,-168.40302877700287,-262.76083600874125,-330.09379826080345,-492.5092438492517,-235.30491753939776,-405.3928270541174,-56.25689547604284,-207.2109337852023,-476.9614596261289,-148.59912419968967,-486.2993177141809,-417.7007100146001,-382.56001003974296,-44.930015901414876,-167.2089450345633,-488.00511894088004,-215.09789285979807,-327.938627089293,-140.29952145969648,-297.79683987203754,-322.6482104021664,-81.79726047184977,-357.2256231539448,-357.65896476248713,-386.86363455960316,-459.7839334124386,-193.21043725058462,-249.2342945763636,-189.20338019062842,-379.6293395433838,-129.10908182840197,-263.44407933767724,-204.82570126024757,-430.9316828598486,-21.637464434562826,-160.08584435710327,-102.98522795803977,-53.49506824148798,-490.54862099233,-83.06145363626615,-467.08296951176777,-173.88144141825913,-152.3908566541874,-470.3904346920831,-51.15811992725361,-499.31097521069177,-6.989700661164444,-190.8680934499778,-491.0397876770989,-445.3685355119319,-453.1183031720129,-193.75040074429583,-322.56364366544886,-65.97600243602109,-155.3929003465382,-4.262321949061398,-99.55677011712017,-443.4288546302703,-451.32171310922877,-191.50652116605028,-478.45055041275697,-25.1611963918964,-248.33473417022932,-270.27564008291426,-444.3122884029253,-349.8515185088025,-232.48821862752632,-218.3773899043937,-344.88678656480675,-497.47133604461027,-167.77952739726442,-252.81716628299478,-125.4987601128742,-456.40780022567105,-136.64969522599523,-152.97334661767215,-481.2285339583101,-10.117404061593893,-109.81516338873176,-129.31160546527587,-98.14833871746987,-306.89300135236897,-410.8272410196795,-327.2380801802305,-459.09423514850675,-37.57839639399363,-326.4287969237428,-65.2703188809669,-356.40783298827836,-128.6621716850851,-449.83012871619724,-414.1092111753384,-457.0640619268026,-243.488244104614,-149.3887348187727,-6.801810784580864,-78.0243155169661,-309.4283690622902,-43.500594763916766,-152.17736997976849,-304.68238665760384,-12.551107345987077,-432.80873788824005,-317.83362566940696,-202.65580229059677,-441.1099301973137,-113.1348866391264,-100.56876877387711,-411.74161806347075,-336.4897683349237,-262.59950809908463,-85.70973604373377,-94.591771625135,-48.04210119505869,-237.37059805526474,-320.4434456117815,-226.587905561492,-37.47982509847869,-298.5067081233429,-430.98945928391765,-485.86132945386487,-466.838130732731,-86.50402250602096,-215.72887534210994,-283.55822518311334,-41.70202345685936,-232.58647739520976,-177.56786857490837,-467.41683616886496,-64.48751003632603,-85.88505442339967,-483.11028757272067,-212.72648948018536,-39.50905397580507,-358.6659994620245,-231.28427052827573,-170.9372207304649,-283.3872244972634,-385.5411258385433,-44.30643675242152,-321.3200903957857,-472.0829838341195,-270.83684331792233,-362.8976355311255,-447.12239758310966,-225.71076041517202,-159.83347396211556,-103.86628792579732,-81.98000290131368,-414.83103744332016,-439.09752460197905,-184.41950165098575,-292.83086503179857,-239.68623887237374,-283.67593803871625,-124.17882073447217,-22.9382410467146,-359.8092996491771,-412.7753918877818,-139.8057798124177,-1.5758600070789885,-475.2750482693693,-182.51829733594172,-56.59033499643673,-238.1788485583579,-340.55245078108743,-138.45758788826012,-173.05728672763965,-248.40829985496782,-268.8077239200062,-132.7654605664461,-381.49509405678884,-329.6238617285919,-393.3011077940577,-244.02121230890094,-115.3893094270031,-67.17618885510046,-316.90507672966373,-81.45621850653639,-150.59766911588025,-67.12540588532478,-165.3696780730176,-444.16727497389843,-83.26904280062664,-408.8646751982563,-129.87177214473144,-411.19766957683936,-164.94935850818015,-238.3621196569612,-336.92231229775916,-71.87013075844206,-18.207594176927632,-439.78041159012804,-259.463978226448,-18.991516026477306,-211.7113719046171,-375.1014049616526,-267.3437089730758,-153.94723716390445,-238.32943774971972,-463.2615314963114,-383.9768061464908,-132.24476770701955,-111.88145329715171,-298.20472152137745,-157.0982158036036,-184.72232262753508,-226.5336932701738,-293.95096077544804,-317.3241329805127,-43.0049322354441,-328.68951414637905,-69.17517069340684,-168.36982046279758,-416.2693163826643,-391.52728668449197,-413.05777513541653,-189.50736146612758,-88.66766207830135,-307.09966834439075,-469.76538092746114,-282.16274400416864,-320.7257378135422,-440.0539707562871,-178.96343949621286,-329.08327726986045,-436.64194383447716,-267.7721586677055,-79.12428584470699,-355.79905617113474,-334.31024224485884,-323.36426722482446,-470.0470920738107,-167.69749891183017,-19.850466421890147,-74.682776695993,-268.7211827442598,-125.13582029200366,-129.90714888713939,-333.62570079346375,-424.01661272616695,-20.657321373952044,-485.3911231360397,-206.7147844317785,-194.46154677413517,-252.21815680217674,-484.49751182943976,-349.1912244698786,-430.0950708454371,-73.65170190085956,-267.0161817725982,-171.03342601471573,-298.59994871974925,-352.8725345618005,-205.90906277446464,-135.65354501731153,-475.1457986314953,-46.08726393633633,-435.57093638964716,-273.3010852586594,-12.230608100392782,-229.21689029393755,-416.29513275224963,-152.61687500102704,-418.85135006748055,-394.7494845147109,-479.00353468126224,-54.227642385685336,-236.92097521799815,-216.60484501372724,-320.12811200198854,-199.36916103055614,-358.35651507183564,-325.4527099499631,-478.0321240435856,-144.76193124641733,-313.7111899105566,-335.18316381170985,-180.1250154596542,-79.46976216154023,-137.53823516634745,-346.5278562704861,-486.14987015923515,-445.4043978429977,-332.0731600071513,-270.02017593465877,-454.1655816435308,-28.955348531792048,-248.2726864854924,-336.98351379321,-258.65028563671746,-169.76383195568735,-140.0150073875629,-114.82185667811518,-214.12799838716546,-145.233890630164,-98.49998087726041,-28.08139353901662,-270.2786135340779,-82.536237539788,-44.24140501752072,-484.55493417934724,-176.26893088638042,-305.0053207291659,-181.15478974037325,-77.23122936122317,-250.5447068474167,-128.46718360693333,-102.86793628837654,-491.4319296274684,-474.40606117069007,-140.56399711087118,-498.0901690434243,-205.6263783435892,-361.01902366866653,-11.329052310257048,-349.93511111516517,-284.99739004294133,-266.92522385982795,-93.22522464983184,-149.1746423427881,-315.69057912037823,-445.9586717969436,-359.3528553999813,-67.66729049563946,-63.46931357023045,-393.6441144507873,-245.05502192668015,-209.30414663602392,-356.17749819246546,-430.3525795129997,-116.12980895506297,-169.17113147520624,-48.587564157603126,-94.17566463559668,-64.96469375809421,-120.69452440986007,-69.95645613226442,-13.438518770943375,-419.2578868012937,-253.19153654537098,-449.59100116767223,-434.9458845595132,-288.38736158966395,-476.2483807754715,-125.04658420683911,-337.22683016418665,-495.2449845026375,-249.09963397527167,-184.9736622740268,-34.126145853276334,-279.1175755570083,-348.5244349985882,-335.61778478520756,-189.6846610990891,-497.73824820441547,-411.0767185174993,-185.493272612107,-29.17533043960696,-301.1089488840241,-425.1521016334102,-313.214854003254,-128.1805968660139,-289.91966779109526,-340.77119304307314,-217.75613532097393,-278.6223378639213,-277.49170587444615,-70.75149481931619,-457.11795692244175,-398.32442404395965,-154.64936476733592,-60.35422687673031,-399.75796586960035,-245.30293269131354,-430.15589106060656,-345.31560243423434,-1.9929858078931995,-385.53331059742345,-103.53317330477374,-27.64366520414807,-65.3676753104262,-87.83012212799413,-243.4352837482654,-227.0589866254783,-254.75184981052678,-126.9008924556153,-420.953764751816,-350.5675784011486,-397.5258305467518,-225.3006951572607,-94.02220609459444,-440.1304760990041,-23.121684189675197,-39.39354759053937,-414.4781794186877,-451.5068183134201,-168.18154317948975,-246.24740112844447,-220.0941750726394,-252.5694319559607,-284.2374513089434,-169.5306499189151,-76.55682617846571,-183.35555436685834,-418.44683373878735,-469.5278476081379,-154.2490804491622,-235.23693256722154,-172.5700743335774,-191.74050506429796,-480.26923137538046,-236.12222773243653,-441.4186264084463,-212.1224855023688,-259.2119132956321,-441.2860497314839,-257.0260890063548,-462.616247628701,-468.74467234136375,-133.8731904303072,-283.2572687074785,-362.49596063606924,-267.81947941057496,-271.4348789927663,-369.02762979166124,-183.6832110482399,-189.30539891570663,-350.41365280059387,-368.09832094030713,-360.2044087416224,-245.8225049913476,-167.08887795362537,-18.66935893897226,-438.61278713747777,-138.84404557748763,-102.9061251266865,-11.071165949072203,-151.95697448770707,-278.7651194360111,-295.9091587635536,-110.97734465513165,-48.73096706630364,-89.44874583510742,-120.48497686061398,-459.62465888313733,-295.31090673171167,-66.70947523584525,-485.09365000378426,-79.43586095893728,-266.45175199863934,-274.91864820406107,-37.92955576774648,-337.1968448450552,-44.505900090184184,-15.02682070508321,-438.74354383244383,-128.32798250434263,-231.46746309894993,-258.09772664686506,-323.95166685674303,-143.15951133830396,-233.59381279160795,-174.39242265563703,-282.14082569536214,-29.69640525689943,-137.86438243654285,-29.370442969709366,-74.49425286010114,-93.96603504772739,-483.4758486865293,-430.6202491350409,-409.5917356132011,-367.07163535857455,-146.4993020624761,-354.2329790970975,-453.471865381495,-499.86562834632673,-163.8472914152963,-313.26912690814424,-14.752006806009966,-426.018060030004,-113.54336028900303,-485.71124152770597,-257.4841065012471,-134.8871017933434]}

},{}],90:[function(require,module,exports){
module.exports={"expected":[1.7291258814588968,2.2407149728634117,2.852537738921469,2.066683897393354,1.6372723960531725,1.7283280607755778,2.2175563949271857,2.8529990536128746,2.7300236811667826,2.669004211734459,2.4345339717823857,2.3685082937859416,2.838304253362082,1.8724819541241768,2.928301088411519,2.7034946666214696,2.414819268625316,2.314199103145652,1.8315254742156497,2.5568709709795576,2.859411753109622,2.96520431033888,2.054119137465129,2.8945736092221135,2.597700861479137,1.8704053764700468,1.9227094617192213,2.0644802249921876,1.844441497543391,1.6135926913588494,2.3239660081669156,1.815970407870575,2.6123759441192638,2.451694861411282,2.8125354501421307,1.7824398062153073,2.018170015183568,2.314833830644764,2.6532010901893224,2.2727990311420534,1.7723691332766576,2.2678214855857624,1.7397552330658035,2.7028399372297214,2.2925507816037003,3.1352123992946233,2.47935928300309,2.514852436395911,2.3349407338952615,2.024801197529807,2.7289463390051742,2.383811989736917,2.330882034539678,2.2940731042934703,2.6059049742577978,2.465877433775553,3.0767748121810037,2.3005626338140757,2.3587533542465935,2.267713854211742,2.4546422359749704,2.5948091880586484,2.9871322332534946,2.8875401477750473,2.0767595277763027,2.6530292993337636,1.6741058098750383,2.44954982457714,2.2874165769736754,1.717192677446324,2.1725987180014554,2.489006778787818,2.28072857838702,2.8203985045884603,2.012742604952786,2.810473004497688,2.6974371650560904,2.8442345723746554,2.74687874894491,2.488302809627582,1.626665841180783,2.384032918727663,1.9622508723064427,1.85726871001968,3.063907208497104,2.2233247929982634,2.139409243477848,1.98151074349551,1.6283341662569426,2.504181397031484,2.4475640158153094,1.8563217839491875,2.189767790275679,2.038926024476005,2.3769383994137847,2.3975353915605515,1.9369593367275664,2.3654021827691447,1.6171969730659737,2.3406952506430025,1.8745969204561255,3.091745645118168,2.425018453951439,2.2303708561719384,2.6560922456847225,2.2008901141037778,2.959996472779825,2.3080683868671503,2.2522965634958196,1.6135773779803972,2.3562210603262765,1.858022726388558,2.525165039100524,2.600301645975721,2.078959913657471,2.216064275035074,2.4210700798555513,1.8173765051331905,2.3319056247873844,1.9816808409448898,2.0811670013762544,2.3724933440030758,1.6608725534932374,1.8381232379908707,2.3386350714397617,2.8105573979693617,2.619610408883626,2.4022112169367396,2.9468257455396616,1.7864466793770992,2.33255652681657,2.7967863056170907,2.3194214633905386,2.5848918156507916,2.4551395239481453,2.819422939067851,2.0291816736818404,2.9461839259743776,1.8294739097365524,1.7560186390016972,2.9742819134067267,2.3957808586541907,3.0606766065104787,2.605981805654214,2.3536809610320857,2.365940414976526,2.5267143277976802,1.844787897774756,2.2943178955044132,1.933290685313602,2.5723071496231866,2.827600176012832,1.656924145468765,1.6605825229672297,3.0174586500349516,2.522838256853248,2.948542717999639,1.7659564800545158,1.6531763318219577,2.367005536462704,2.373549557530451,2.56243434636185,2.3279697127278434,2.363341336863237,3.0231503486864137,2.1278533810760747,1.9440206930314883,1.73331989648464,1.9190896540496214,2.266594546798834,2.681915399862718,1.7973292453266536,1.627764812776817,2.5570887022281323,2.0006111803930127,1.8417832359991102,2.2188093606503805,2.1048187889312375,2.148853192867929,2.3869451427318045,2.4522701253103305,2.216424966880523,2.6212857291735494,2.874058457191206,2.2790559658884963,3.0853556873516164,2.7217709688811254,2.086592222980048,1.899245355843106,2.0180222310858538,2.328745238703806,2.331570823730688,2.6476345640508336,3.1138766941892606,1.5888159987267274,2.8153842739170836,2.2153443690385637,2.8228232990046176,1.9987790499527993,1.615300161332463,2.2363273095666303,2.2905318816205753,2.344360257718731,2.8434640985543465,1.6812975776053374,2.1404420987003494,2.0601757107547916,2.286035115838599,2.2267366329622043,2.528033499146951,1.6234378510289644,2.11351535759721,1.6384844640293326,1.613780111259547,2.088981966500066,3.1367734483761898,2.6521059244768344,2.3138121170781814,2.6834499827106235,1.5998877754937275,2.0990653696235695,2.550796073140267,1.934789899102403,2.9924821680865255,2.573938660681306,2.166457561822207,1.786727491037951,2.2101460538316644,2.441802662576649,2.498042446532308,2.4224763235421682,2.4636146235903,2.4137932948132583,2.476286393411131,2.0416512836642644,2.854861906630102,2.8047021329149437,2.1388700085580146,2.285030973019219,2.1619865110059022,2.9359942123484717,3.060706289752597,1.8145393653453805,2.0290318834630083,2.958058657874024,2.3499904177180153,2.679228578090197,1.9586193146571325,2.6905958460880237,1.7095087041849488,2.9185113962096416,1.9768743599012621,2.8624537316820855,2.9467173704862133,2.352446944704731,3.0443411368520406,3.0899814831643138,1.7675960799985113,1.6342568173342134,2.89568494696695,2.4324779055285366,2.0845124865217537,2.3453496588899547,2.033371576169168,2.325263211596012,2.241069259436474,2.840180221252107,2.162399534917313,1.9218180123185225,2.705554787488821,3.0725441341008595,2.1829591170205704,2.395796661069168,2.280921556998508,1.6675353165372135,2.3772196036773874,3.0358871479661658,2.4503390134451903,2.2540116433059323,2.499769627128415,2.863620058457422,2.315457627284411,1.8188737779820454,2.3669661288136243,2.5019753423089273,2.3971656195694724,1.7139884862010344,2.0277666848685865,2.139290157512084,1.9517394553653695,2.7296286699115297,2.4150834695044296,2.260125437176031,2.46909817612905,2.0272979758996676,2.582220268248097,2.452881348696291,2.736177380063209,2.9819108066339832,2.391633974054331,3.114904668957411,1.6996380249562317,2.4959695259131442,2.6362225912645196,2.158405704040726,2.3334838899479298,2.4285832159149168,2.9478781001459122,2.1597036989865526,2.087111871197413,2.4652295037978518,1.840845193941067,2.4142859744671337,2.4362924164894344,1.619000962594333,2.593005187009916,2.558880852422373,2.7767850048762748,2.3341475259899167,2.891516827326107,2.731960483001148,2.0033158114282554,2.390864893549143,2.1798421392783647,1.9659513042839685,2.588658454696009,1.581838127834803,2.1512792358324235,2.5491208379880765,1.9663242578005578,1.7103986353248533,2.493470275709897,1.6815689365905067,2.844184086946827,2.4060695505972194,2.389911330289915,2.447669672710643,3.0726488440730626,1.5885466669120951,2.4948814073760017,2.178229149782354,1.8376402174081368,1.9419877823721508,2.406346576774046,2.3590552103358133,2.4729675367435986,2.360334240025421,1.6337608071313674,2.952963061516598,3.039869126084951,2.6721949223655566,2.420115928734278,2.4707068959663134,2.355784199533043,2.1982239748165116,1.734578683256371,3.0095624841258632,2.461218189489808,1.6951845209884087,2.648257075436619,2.3597491401968793,1.6767985902623916,2.4233688147527594,2.377275316446114,2.6635003636065675,1.8892093229004532,2.3034167797116947,2.7093068106195566,2.634561392774493,1.8512139629716133,1.8743891428059882,2.1711329459902644,2.5944984422806314,2.885651533161188,1.6168776025503315,2.346854527814736,1.885753169734519,3.134187243792301,2.137585070377721,2.915868845012064,2.4825985812960645,2.51689701558451,1.6336831968029237,1.7974537811109002,1.7353726413790116,2.9929735741184706,2.3244204741862275,2.0913122524038332,2.2712382479862843,2.063883278850255,2.499904853403491,2.523847366614037,2.7686076950291416,1.6881676179376397,2.2187823094496313,2.86634257030934,2.2673169740904635,2.9190888402046435,2.035272728281126,2.504294404134045,2.2717321621681177,1.7095035575945248,2.4086596800409534,2.0345127726614054,2.3143903313365723,2.0090991286440127,2.1866818463273203,2.5743170005855163,2.126909580830164,2.1897162552447433,3.0577186770557216,2.546281081186332,2.0359225821118407,2.549408551395656,2.818107997521373,2.4373103705996977,1.5946481016657623,2.3774068313409003,1.7196772340121227,2.054225676695401,2.8963044606155743,2.2987196004352883,2.712852961624844,2.9713183083869867,2.911847638589614,1.6990582307560498,2.3905026990893092,2.3492416871200437,1.964815988211457,2.1834394679279976,2.1921803433248286,2.3155887555923225,2.662880614783829,2.4760714056181983,2.0138822178400675,2.4082929921576306,2.7183121675884334,2.055525627957821,2.455020281861386,2.0003735061117425,1.640349124336791,1.7475773031117672,2.2879960962884827,3.024518958371047,2.6606654966194268,2.0306222977014308,3.0510840052640384,1.7324737236377084,2.9604625488046885,2.146334026178905,2.761552894279361,1.924395725516683,1.957123643223955,2.136570713917164,2.617608680419222,3.0562686606553076,2.23248358232007,2.6400582636396104,1.7452804527038013,2.5889551469653203,1.7194836336948507,3.117076632680882,2.384280835060834,2.2438657235922816,2.2132029466393663,2.3152012085285003,2.1124445843549315,2.599158872042657,2.3952590089949846,3.112360116830348,2.7516372861762344,3.1238320524818897,1.5858175849253435,2.5391990924354944,2.3124424586088317,2.3988745091645933,2.6244752395266766,2.69230983070576,2.9274034107482496,2.795933286794842,2.4024032738850143,2.5133042770443694,2.3501710083346703,3.112952413294517,2.5395428402209568,2.334854315253378,2.3460887665688555,2.850443135561007,2.922303848550438,1.8532644426784497,2.265186442472869,2.0166417879088376,2.4763071260899503,2.410909097740036,1.8146845947961256,2.0874511496845694,1.9221226221701373,1.8111402420417066,2.861675788130392,3.011878280259057,2.456582936090574,1.704553799427415,2.8613285709759246,2.415908352215685,2.35228046157786,2.6511500493770956,2.6415164745528434,2.638016851821935,1.8179632140846433,2.3682841174076303,1.9133528472749963,3.0286574301740834,2.352204983454097,1.9392507850002563,1.7738520168211687,2.927387140728426,2.2649646073241025,2.627127005584443,2.2972666686145518,2.7578350883496285,2.4036312433435283,2.3417496051301203,2.1676101233552494,2.6009321796149703,2.095865964123081,2.9479545450680447,2.175158314961485,2.466537195652256,3.095603397551253,1.8729004720412605,2.708042503014452,2.3539930786105425,1.9125553062933263,3.0804736995480413,2.7652354751670734,2.55750096502869,2.582139612707257,2.9676492364391653,2.327681719065589,1.9150739001790449,2.821999712695389,2.3034835397691804,2.3208086718911893,1.832731462841411,2.025258776458452,2.6448734890768573,2.9436921976659276,1.934466380906958,2.0657427847718024,2.144717566488322,1.9604411011238092,2.3046401151169693,2.1499194833940125,2.274824111682955,1.9423411779484232,2.391857049881502,2.923730605739227,2.4699264171942175,2.7893664830030396,2.4698448901427343,2.265992825498074,1.8031486371287275,2.267560247691543,2.370228979737462,2.5143537467913424,2.0091525828356955,2.9510850832326954,2.451215509143775,2.6974107811113,2.822396449036348,2.4872298561519477,1.935172793780952,2.0826022228639287,2.225419273171688,2.64138607808797,2.166965083542503,2.288477840568073,2.883622249217312,1.9835127046289989,2.7252316179436034,2.0336061682851914,2.249419265897999,2.2563601714694594,2.028535176260335,2.3878590878155426,2.439234957803393,2.2125748862047887,2.5241321658577545,2.844581382331737,2.277583814095111,2.391843968525846,2.853098565105365,2.5000016943495726,3.008757410859779,1.9698297288717252,2.6126266540566596,2.806415029771586,2.061770617269156,2.8230751028486822,2.6900498775544883,2.0859525591604693,1.978644113010833,2.863841149883583,2.64146962573416,2.3628298379398354,1.9258171051743447,2.1470033996414752,2.406685223745277,3.0453026912361434,2.437492063769563,3.1330799702314085,1.6797663719961213,2.909665024497967,1.593549557973506,3.0390029430169943,2.3052467979873006,2.738736522094273,2.210055878984247,1.712963900558178,1.833518578983426,1.9561976599627873,2.1375885890855573,2.712255528112399,2.8210021078142637,2.112719879496806,1.8710953666091867,2.3937744771258114,2.652107800284671,2.5745882842696655,2.653752576074205,1.6952515484875972,2.6063336967062876,2.32676761903458,2.9610001787485576,3.0389110607692156,2.8795187065943466,2.226968762838463,1.9040076995308612,2.2702117713899588,2.91475945522435,2.2919786871208934,1.7149088883139925,2.0794224860633888,2.3333726774232977,3.004078361095907,2.2743079000327855,2.090415416519607,1.9524757974594282,3.110490797378036,2.0529916143997915,1.91702901415722,2.3854936935723945,2.826570810274289,2.6912353314407333,3.033342774372182,2.7192859908890945,2.8765625265157935,2.738352335245082,2.124934205234881,2.226104242992826,1.7124081170102812,2.8126672014109726,2.157321650947516,2.1189159267865385,2.4491528034884604,2.999134786718201,1.8911155691251993,2.1587246403666924,2.201803109119805,2.541811940692139,2.839677828791443,2.6814917575341313,1.8150701864533862,2.9407850004681695,3.0116672200418115,3.0362842158613796,2.6894382005578183,2.420444087247541,3.130929356207518,2.5230788403633713,1.6543747748027002,2.223883632842602,2.4728803472464183,3.0644307159583604,2.21690533298688,2.8878789116882864,2.544286275448271,2.7723334423143617,2.3609843462322355,2.81440434699984,1.8312751666532463,3.079411449687149,2.0531173915039083,1.7345266809765507,2.5751507629514387,2.76698406816362,2.0456401115618528,3.118911480981241,2.081837294760735,2.228543811361888,2.9187482295054674,2.1817237613370546,1.8918154760975099,3.1067260562328087,2.473593388164033,2.832161255626411,2.5269689420543324,2.9047747667444197,1.6206489564669464,2.2246851510565016,2.368265401921368,2.785786957209195,2.250485942828085,2.97664329257303,1.7821815245748178,2.367623693347318,2.497121625375453,2.1034755577832795,2.1600350763681235,2.761038693671436,1.8172008905211157,2.1750313678813216,2.9297216523327334,2.2866949126715905,2.4315751898737967,3.0871620926797587,2.9381248553840194,2.2919505566557175,2.4881818980027037,2.287815119059427,2.949364793768645,2.2812678705058875,2.266934481994112,2.530603825797429,2.106522856297317,2.4072799643704546,1.8894575183543352,2.9920688472039747,2.73307027259325,2.6472379909565533,2.742518626220327,2.613488456902792,2.5912085627498698,1.9835426009598476,2.9146515782435145,2.532534187834564,1.5774454174774546,2.8580988189272634,3.046223277740439,1.8300566559193887,2.791843629527229,2.5770186942114326,1.9066600065408015,2.7062289228480845,2.3509459775236414,3.0397863265299603,2.233533382955847,1.7684533799656819,3.0409940494600267,2.4648991584873126,2.2863699116432006,1.7189566561202199,2.55391708110813,1.8553533087370953,2.2821415864474064,3.0024497311422405,2.033252024762417,1.8269903417731985,2.75130234271341,2.197020802564765,1.7703791145149006,1.9060751009484316,3.051150598201337,1.7444512759671829,2.2107010915779006,2.3095596795118443,1.79940204118401,2.003240374385068,1.9962254363390723,2.6809051739718504,2.422066630434749,2.792203642764999,1.8611272544467423,2.4424521248428666,2.53878602280595,1.7937137128999125,2.285354163142432,2.7671051299682716,2.4547684806425263,2.7177933199045916,1.681111340333378,2.379285661012399,1.6427524505777134,2.3095348955426043,2.1852850544074025,2.8597345363304396,2.0278120398443646,2.602395313543231,3.015534618657174,2.1572810534637594,1.689324715392709,2.5883098104687567,2.2549909298328195,2.7610426492650535,2.624737434721263,2.0060746643497995,2.044725364177863,3.0431415614166863,2.912534317294858,2.174050910902926,2.4837586444546713,2.0022737067728116,2.8366861381076345,2.242174305346398,2.3142571919089736,2.3061181169202487,2.1897147865794446,2.910492708088219,1.718474390074415,2.582124009628467,2.3694293128061874,1.6242924351256627,2.0119649797124923,2.9852181623155367,1.7466928507303783,2.97046238680194,1.725088670111059,2.623703716756016,1.8733203978052326,2.999915946030387,2.1403142872213925,1.7565856448228085,2.387742182796319,2.4998955649776278,1.8512805195239688,2.4196605610371655,1.817649680699297,2.0455206303768585,1.924459576984747,3.006841461924909,2.553896299883588,2.58022177917267,3.0559862286963515,2.254715649732222,1.8377435947422966,2.705231281531828,1.6140787651491826,2.965578064403989,2.1728569946659984,1.728659531748284,2.363737718408574,2.245784554506213,2.7406490203962557,2.0369100627320647,1.767332485533985,1.976769054195082,2.8184307129934267,1.5732814936425354,2.779416583343003,2.6789334985425883,2.674999934953457,2.753068336192801,2.918998107306408,2.4710163566386383,2.3939644700620533,1.8025924620642424,1.8638470748216116,3.012461694952213,1.761572274096905,3.0032299326524234,2.268774936051459,2.9004271299936373,2.4185345988808353,1.6549533561357255,2.626977943826538,2.248826905697394,2.36046206599675,1.792082952036849,2.2996830415290797,2.869761819250205,2.987811146600024,1.6239654258672052,2.6403908996764875,2.7399204693339536,2.638688843668302,1.8380528611884464,2.278723962139511,2.3430527655837183,1.7379063952461615,2.3615424952172623,2.589210516622843,2.1434196495577944,2.9883855924608715,3.1301389031394744,1.7412073789059552,1.8371992436114164,2.4631521209593976,1.5927148396308983,2.1200737206495894,2.3578884000014257,2.489893457513494,1.697826572148774,2.364103060875645,2.3583246813222605,1.5945527640830313,2.1116405707219963,3.131762199467037,2.2558926842621494,1.746413889234234,2.876089094323692,2.157880448737828,2.353527586690968,2.7579734321931135,1.9166589532966816,2.5634707105611976,2.757484141043848,1.589946961559128,2.4660740024346226,2.3830262657292853,2.4421098617938766,2.935473697272677,2.857270852933464,2.9054651498044595,2.7903849032911645,2.488488601662697,2.108155134026054,2.128435706635682,1.571119723199811,2.307940676914014,2.304737666589361,2.030148911169574,2.9609866248246095,2.369513583237003,2.5364710657371314,2.544576903576323,2.6126322131184487,2.4053173082092623,2.054016693117305,2.924679450828218,2.525023457548139,2.0866291846636353,2.5368027265989834,2.8547238566086555,3.1308759106729758,3.027668627149689,2.1120291322386278,1.7485683149522757,2.923763902701951,2.681927636815732,1.7027872906410477,2.580685510481222,2.8467038914484384,2.271316726618522,2.489132951102705,2.937934238772333,2.9003378978159984,2.1493909688567525,2.6385576799551993,2.8134564248317044,2.1706815963197506,2.2450919417280173,2.1918460231090036,2.0138999785232725,2.101168188854687,2.6372457534124076,3.092677007453557,1.9850172123611896,2.9600535758214988,2.0942994915080773,2.7793375793870405,2.7578049350599114,2.38818391077384,2.1638055251754666,2.66597529717414,2.2301867082030054,1.7508541715635457,2.290862187842371,2.576498917069549,2.5321610703239315,1.8233531848679507,2.172538718105929,2.0569027770334065,2.211512053417458,1.904302293637554,3.0509924787902265,2.162918049647125,2.925072409730203,1.9902062151501545,2.609150136229725,2.973376938525756,1.7265762915654115,3.1170093283334133,2.9332329769760466,2.153931696121256,2.580617119640201,2.11207687457632,2.273867441508504,2.65333348532678,2.913732727185178,2.2564008402009463,3.1001671848527006],"x":[-25.82448448121022,-358.31154315560286,-471.0824661114713,-185.66026851013828,-30.4770535124832,-12.939535211644815,-186.17456952348078,-108.13845010011303,-313.71994413641767,-297.2568429430946,-485.60830412041287,-214.93375197858998,-201.02764569144915,-124.64796508416231,-296.3433963205359,-367.3243652595546,-385.9616209814271,-312.4842808476396,-127.0677544464055,-113.36948796126312,-437.9263523077185,-213.52044475114351,-168.27154236266216,-196.2208569909638,-417.35167522642513,-88.74493146280238,-163.11508215781134,-174.98659360718227,-32.91389061656247,-10.605577608743811,-407.80248762798266,-111.34147380399439,-342.5210823927265,-385.07355421119826,-318.25449654044934,-85.32845749997564,-151.3938832748718,-391.33081697480463,-367.8354208572296,-369.4434178386707,-92.43862809160419,-289.3967813855738,-74.15530221563805,-460.25797588807626,-301.19989948724515,-87.90360722620183,-349.42162663609497,-163.5391254696019,-176.1689887214636,-40.35189415225771,-469.3072335644872,-491.61415363993774,-136.5365179593644,-364.9677888995614,-332.24921127297335,-283.91274787143817,-462.67424010344973,-367.1038926989978,-245.574973994656,-319.34290488771387,-427.81867918108196,-449.3421725033679,-467.39095920495697,-434.9523370685261,-214.0764836759692,-85.27990774395388,-46.212707840579185,-345.8487065988015,-328.5203057208778,-63.588215774776025,-306.7215150476934,-171.71116663421805,-374.2673705129812,-246.76162176300608,-197.86547350211615,-119.30084565588072,-150.61270505581902,-499.79707711557984,-418.66037926493374,-249.00949710466492,-24.625336972156298,-453.60112751233527,-166.12094704414514,-112.54282263801241,-322.98776112777927,-76.61164738122206,-111.13542115531617,-106.48140317702214,-26.929611290384848,-172.4661936837275,-480.3196446366772,-121.45070801576597,-270.21948317210274,-218.17610784276786,-422.52433999840986,-441.63785597701946,-79.00300713108577,-427.4689471769181,-13.434686787580086,-416.1296481899338,-39.54704722626712,-308.4691342201461,-248.49313834321728,-227.1666180199743,-352.94406066849126,-338.93413791284087,-476.85089608056865,-330.27443709750304,-287.303361143094,-16.104226464988436,-209.5354436420471,-139.8521264292033,-340.8905455424619,-354.36956817681886,-151.30399040992393,-49.01339488645906,-77.58303256530597,-122.13519464344868,-435.7092819419714,-149.8805651272471,-200.27033566365392,-446.88112437561614,-44.70650345984906,-98.57912855816431,-387.02679440565623,-414.8315181072106,-471.0852915310125,-369.74061520207914,-433.2490651818434,-90.6873812580834,-92.05739121927836,-209.6751942489029,-439.36625667510145,-443.4597896604917,-248.3005229747769,-469.197165653957,-184.39547797673416,-327.56086647367624,-119.41568594075724,-23.849673080698853,-422.42443159451017,-104.84627504244426,-430.4250680340725,-406.07628176703236,-307.64721690810114,-405.714666875434,-140.57746254939417,-78.77263476781616,-254.49718905057074,-135.28739877150485,-447.9635547963962,-298.44527630944674,-39.676182973962916,-29.757989172857435,-475.458808262061,-411.51359783804355,-495.0395036143034,-78.76403712727887,-26.255336423196884,-387.92763523533256,-45.40895149758983,-320.2708490719478,-465.346743128468,-149.33270177326008,-395.5246365837898,-215.53037139224895,-108.13389418121756,-59.730155900789896,-125.3064666056417,-211.94306757715287,-211.30998262771817,-104.11635962916377,-7.954829252784457,-469.6796251726262,-194.83809891372906,-137.25009489681105,-377.3892314917281,-218.40321314425404,-291.34512549999124,-407.7258727293023,-226.70901971655465,-221.6226271564524,-300.13277339250953,-476.64465249106047,-294.2662431664188,-416.3569095127884,-384.90190706766845,-273.7871079579025,-128.2378206076582,-125.97403152886366,-328.12856814703827,-436.06521099552606,-238.71662990320098,-393.36076337936686,-5.513327680472635,-239.53256956907887,-80.96833513878454,-335.0744012120046,-127.97841713529856,-8.648021161529407,-93.9019972173123,-245.39824946896582,-430.45645453250535,-142.48386837093253,-39.706450302796625,-130.17426462197523,-198.99263434937586,-184.63174109361879,-101.21187498962591,-241.79499727657426,-24.32707224168318,-178.01116246455618,-19.65333874176367,-16.13169809663828,-284.66420792087564,-498.9428062902271,-201.71840416281472,-452.17613127067415,-369.8882155573969,-5.444210740633504,-190.63654462689317,-419.27742033614425,-177.84457886126359,-312.3960104477567,-192.42460039209442,-308.8783415897538,-67.93913922630234,-242.16230273604612,-327.7676917372427,-411.2139887733087,-233.77235857396593,-366.29739483158505,-224.09969323195978,-462.2320007924798,-151.67180419627536,-418.48915009063217,-268.9747925426162,-213.9450490929391,-153.90894885943717,-67.46417374480617,-264.66757096155015,-312.14664272359846,-25.386629796627314,-135.47668239243248,-240.43066476605844,-119.76563986977007,-342.5526528027765,-183.1095336407166,-123.04107307341883,-66.50065519451753,-331.95264957872126,-151.33123022634186,-317.1241811276493,-355.33453256830563,-228.10155161869494,-389.71977549033045,-426.00005169730827,-63.40794140148853,-12.259671082674561,-259.2913907519496,-375.79749094165805,-184.40351595375083,-130.53786730729954,-224.29040342604455,-310.2461250084544,-222.47674458767207,-435.5025031698604,-236.4897577557119,-135.6927131212855,-300.13642524690863,-437.20393245766644,-192.24566923874875,-450.31453025648796,-146.43168779806936,-33.760977930541,-214.31236260752195,-480.0003836330945,-255.61812614029333,-241.3219012212825,-478.1902537545413,-271.491694572954,-294.6261031362358,-122.01955094836492,-136.6058287770402,-185.03635514705286,-232.653735536678,-62.4849402702492,-205.01826316946236,-199.10632011880858,-98.89390353633854,-203.45714274845704,-378.2954863512652,-352.38417399378665,-334.00147545500647,-101.6449464821424,-489.4749811152975,-223.6050429975033,-73.31847704759065,-220.31728429815468,-471.2289131923878,-348.5872077726312,-64.44116948826128,-403.0632750080189,-325.3176729532564,-169.13746177471666,-446.40300937205745,-232.41685402463153,-457.1214340485401,-274.2181194253127,-111.71381780108136,-272.9761471153642,-90.72210422726369,-482.7624347985486,-403.172144154482,-3.08655351906173,-470.70133534585113,-388.94025605735385,-380.6032007914044,-162.77970057111725,-223.34514640503033,-485.49222436110483,-230.4997666339984,-360.3739241797662,-121.66777594604383,-170.05102999634104,-71.19058180905824,-2.202161215290377,-230.69033256978554,-279.63055925770277,-202.96838226729318,-41.79375594798385,-430.27581732192823,-46.40022656577136,-298.1950818582548,-216.53786818989806,-50.15454017109589,-214.5362836068283,-335.0040554897654,-6.130380647776823,-442.3929970210857,-154.71203821085544,-126.52691355646128,-147.92655704179214,-355.5709679745918,-327.2034207523864,-423.26685975575083,-274.7034681180168,-14.045428169624063,-455.35126525592375,-466.8266206463946,-396.4766444627971,-194.87432363763313,-320.3111889626333,-199.1433836471982,-360.3641570241499,-54.61021417937917,-100.78831095285045,-273.8905904804939,-33.803905206673534,-52.13011634485909,-407.3061991912483,-28.41479721387008,-479.59764724648136,-100.72901280008794,-436.65228137381183,-135.77291859454533,-319.4920926881768,-240.35054347673346,-412.86481416490517,-130.6449190616944,-123.59740399829577,-151.38582876745554,-285.3194361483966,-344.3715615773685,-10.493351344710632,-378.57883721295906,-131.24299580456443,-313.4371357396745,-231.02691693950462,-397.3395609755721,-204.42928116527247,-352.1612689610769,-18.702261530132546,-76.00816225119011,-52.23768674507667,-359.53569620875317,-210.63644650393866,-205.0058864228358,-420.925194312098,-144.25480257773538,-431.385955247348,-119.3088051996346,-483.96932403590296,-54.46540294622682,-182.02139011206918,-408.34162760532433,-410.58541919246625,-465.33359430203944,-205.46822044921888,-482.8329426874305,-421.03141678591095,-46.1698688355181,-209.31620057787669,-238.04989161405976,-404.99440994959156,-168.8699766033267,-329.2469699370181,-467.3214129388559,-164.5407598861197,-55.3403176597882,-453.81940038086697,-331.3894099835981,-233.12257277082048,-129.87622500282313,-494.9328239833973,-430.5974588033516,-11.595310196703679,-177.73500049999348,-34.823190109725566,-211.16060172565344,-166.37891073601062,-245.1500828596599,-46.05157673233074,-82.89363959984209,-221.93050210546662,-54.338546599744134,-296.3684167302583,-177.22859824868243,-134.12487909523773,-238.60406747434092,-143.23590477445103,-246.86141131802864,-258.082896206215,-422.1504564624733,-159.53489833184932,-287.96837625733684,-488.54118337338446,-175.94169249201565,-187.08763439845742,-162.77199540830546,-18.862502996377593,-80.48527626529022,-172.6400982834857,-345.3609008678723,-142.26722077888653,-174.8265970570556,-216.55044921471577,-67.87347732332904,-380.46203869216066,-206.2612417451779,-467.8854128022091,-181.34233541160262,-127.63337837642209,-250.3666278900717,-319.98202012720145,-457.2691789009802,-339.68437926747754,-288.2490365858299,-76.51441692673899,-292.73483300762547,-58.45687293549962,-393.63581962490304,-487.55556702503753,-321.0707441784153,-153.91124440497327,-454.7852606642678,-284.020084432539,-384.8199955663163,-478.8415997360901,-455.4592288117123,-373.03972793673245,-334.739278469556,-7.169688206837943,-433.2665553092807,-375.6134306153325,-417.0844983165003,-335.5779024701698,-179.91299803904337,-479.28270070499144,-176.7051011168088,-160.60204398670174,-272.3441145644975,-252.28509335817063,-475.7163095761925,-316.22907787830223,-94.37094100309362,-352.22899895212447,-240.22459101529103,-400.65851029409504,-67.8915805671253,-179.68254072580203,-155.28258233516357,-385.2105077488921,-296.16378162853897,-56.772817742870906,-232.59946562355105,-132.92567871486727,-122.16136517168874,-94.46842448796777,-401.13722174715804,-261.5468662510391,-36.48851326856306,-296.8209881579443,-314.27100212454985,-346.0408065385003,-418.193897332667,-34.639766445662914,-137.27155872447327,-80.18202171018518,-153.87174376935343,-67.58834392313395,-486.66320786205597,-266.1708712748078,-160.64285886371675,-81.43513072589815,-329.10723380676075,-284.2314947261494,-427.9245516248558,-177.65778401221098,-164.71234302552574,-444.2369009873628,-72.15621599701316,-233.46853787255995,-495.7725012208729,-152.69610492493746,-303.9531559928417,-136.9173393016292,-326.8071878601001,-490.48921144868484,-85.51023184190632,-332.125054276694,-448.0241576324984,-147.9150289456036,-326.9634942851716,-432.99910187968305,-423.8577369145831,-320.0725398492145,-323.2837737264771,-368.8003181038233,-121.90063343565028,-384.9241683799727,-350.72132532612466,-307.0879379442393,-93.90251585142828,-216.14380637167451,-326.43531136489435,-157.21422935815332,-163.476153167593,-180.4062796582697,-122.70552983470506,-177.22635113206496,-224.67402748708577,-99.52195709272726,-119.59961126250629,-169.61421226320994,-172.42888496235508,-440.5274990316276,-341.33781031982613,-259.349487994026,-165.52370366897895,-374.16118300509794,-105.48282691506216,-184.03214845484973,-178.3686530816109,-425.6953784793809,-226.90944887701926,-328.0491991714437,-418.5990639741374,-208.6928340615204,-481.4290664710641,-479.33117292675485,-169.32543570899583,-228.02349574752023,-367.294838699853,-493.6080539264741,-233.5919326742405,-303.57588887718924,-382.1777836348217,-169.22751609617194,-417.581626606682,-226.44459637101644,-246.0557148915057,-128.03733880567592,-182.42982668989828,-121.19376322211484,-480.058996520999,-107.53460131132309,-396.90658127064836,-378.04446390201406,-114.99158054156223,-423.6564838028333,-461.384712595011,-434.03961833792494,-428.2936347028632,-165.05066076426834,-486.34700812001796,-334.9514346694692,-239.5488545312311,-395.8433533517295,-365.8107324347114,-225.48372322840626,-140.65234120209226,-434.1544035524658,-253.22669271829358,-378.7599216242384,-171.25278645398822,-256.9745597623009,-210.50397900473718,-298.60347743979077,-280.4844564438954,-231.88793314394073,-9.304912862452275,-164.6848583888032,-9.234242310141028,-461.5753140533494,-203.68630945459643,-499.3366229888268,-242.69838863545067,-53.30609477151293,-114.92175438450813,-60.57403055417399,-224.4178423432499,-432.62239686878934,-177.77815236100923,-175.6883225453816,-56.13849129882742,-394.84491980991453,-423.17106336621436,-432.96388418877694,-87.33522486680778,-60.320688839505145,-32.878933108398954,-376.66132033944444,-400.01629766016055,-384.90070030036327,-398.8454339767736,-322.3749132777718,-126.39101774398209,-239.08933655764199,-478.7599967472776,-433.77709263368814,-60.48291789720894,-226.8994680213935,-362.2875084542043,-252.43057548923676,-417.0628667359861,-190.76039663828837,-114.72715527368204,-385.42508387967035,-138.67000108671456,-139.24651258798738,-150.2729211174283,-417.43045895397546,-290.4636711588048,-213.5448481300194,-370.77844304732554,-45.362249767378685,-161.22600061422887,-46.931638244040116,-190.51949134315095,-65.02554134698258,-198.35588177495578,-85.62114300052703,-156.33032246801838,-217.4473939670092,-234.69548567747867,-90.05082766193428,-241.48411509161005,-261.5092668529849,-245.4563484602028,-318.1187829995956,-483.85706535887084,-111.713396214708,-491.63618577475046,-358.18685910379253,-329.07812891270436,-235.85548504117227,-316.0740629057347,-276.6471664851351,-276.9761405226646,-38.37797167440815,-247.43139754125232,-373.2448799773802,-63.57294867398877,-138.30338096116733,-334.100509246361,-274.1500099334869,-171.4824619503217,-386.73361170764497,-486.8163663576063,-100.73898678587956,-493.3428367436783,-171.01919356236195,-56.94495389559384,-418.514934382175,-247.78746368381266,-211.95539205787105,-459.22658581880825,-224.05025982208326,-198.47922697853625,-325.7025713616066,-271.25688903938385,-162.95436652934947,-79.86504872647882,-283.8688521735646,-363.4315191615949,-425.3264973693434,-234.24674258866872,-9.410234555185193,-228.51529369206537,-340.3974951104954,-341.87356427599036,-239.6005899846988,-440.311051320358,-55.1840121199193,-400.64292138794224,-258.15506765974527,-119.14399126082154,-249.51645084821683,-275.66432527784167,-78.759982601865,-88.18837659313405,-485.4387536255499,-353.3659057879447,-493.04965809860266,-314.54890276221613,-334.4851012176212,-416.8864315657258,-13.040246534553157,-282.11993957869953,-65.33880653357105,-319.06393839110103,-364.38777661508493,-180.6831736353376,-232.36934707617496,-307.0213431802511,-162.83677408931263,-387.368766186973,-377.28116099152163,-441.2137035103756,-174.80620746576713,-395.95902672460323,-214.96634582953766,-172.89860356418575,-85.00828382850123,-206.54234456097066,-2.0365517203865258,-351.7068748766749,-281.59568769983133,-70.91183971619274,-487.62357876978166,-399.07815541810396,-15.068544063563948,-146.01128349253534,-269.265812288649,-494.04364627438946,-379.5949508647674,-17.642205128729714,-117.29164949063109,-430.5610189037683,-320.55426711392397,-68.84601876911678,-406.9632852928626,-93.6612769205477,-383.9339007792011,-314.72904241863677,-235.2816791066078,-84.1249166833835,-296.3610067784651,-137.63027121943205,-74.21874425339826,-92.06476031333999,-484.5564970206392,-85.00459628593926,-341.54332746288617,-443.09839402591655,-63.405378812889325,-152.20809463072206,-80.12635886357155,-442.3675239738456,-422.089985013817,-200.26399316583564,-40.804851789483784,-485.1806139575625,-494.21780733247556,-76.82527960488672,-104.8745642841602,-289.9500780641585,-436.01019769164276,-218.5090062416172,-16.373287966084504,-478.5390179233774,-22.755160881944402,-441.367726431374,-292.8443630290799,-90.59956676566783,-145.113525682277,-368.20323301499235,-393.59122886267784,-238.41819485959616,-32.501290621295695,-488.74237944082563,-175.2096237274282,-264.8949600957393,-350.1185310161351,-110.98399941571724,-198.75535202493833,-330.2163252820266,-295.2635176018148,-132.58652452260677,-187.78626839779332,-120.52408591245178,-459.2958096330835,-372.4270617828206,-438.4024845175281,-136.5539303088973,-138.78907204098024,-287.990993098476,-49.522549649811396,-253.42654558825328,-121.29350337369604,-23.46046373595112,-178.82876854684548,-420.9815571310257,-69.55478977547868,-201.25544452617783,-51.50115030368963,-185.5079304132834,-130.61150008353817,-458.2006522588312,-305.0049837060519,-54.69163919903197,-276.52226001561553,-379.3776707506442,-143.92819117955025,-434.5056683035453,-22.677635185804014,-219.90269357298052,-95.35633814355515,-467.55045688714705,-444.32676858653844,-372.85445287675935,-445.30130866154406,-132.78038836756824,-68.31770917902425,-267.0509773103748,-1.4200665438576232,-409.41215591653156,-133.02087404618135,-66.53884737762283,-385.21711290916716,-251.48630093509462,-498.6069680654217,-124.15414130138458,-95.80670392373646,-210.90239418006541,-293.03571755596414,-0.7873653841483641,-147.425268459792,-253.71635298530714,-224.82675634690497,-484.4850500522705,-227.94108867929032,-465.61591074119826,-417.68220723449525,-109.05286499535028,-139.4163007798177,-331.11187900023367,-36.258355146622904,-240.82723404018247,-391.7799141091578,-396.8540876514239,-465.4246171871168,-17.05643025255943,-135.85270882803525,-304.02800276711815,-224.79219976321298,-79.30571844323919,-291.6653616155033,-180.50530008728492,-258.1211099455142,-13.472920076858408,-306.5518400106214,-247.59747298312286,-402.1318306124253,-132.37009375533137,-371.57916986368076,-278.31818190325976,-79.00192472115897,-270.6738483938539,-282.8485463837674,-269.4221651029627,-437.11670647467514,-234.2029949067198,-77.51513488334727,-98.41691394053298,-444.76067697851715,-6.426922256207557,-152.6055214837375,-479.1182420217281,-281.3296992629928,-62.9958915663894,-438.9373239081958,-378.79852520248534,-9.002125987207288,-270.6712707745654,-341.1620020645616,-370.54105983364695,-33.63796565356003,-497.4127532588087,-286.47365711140003,-490.9381078089121,-376.36743338763523,-87.3447592100841,-415.79480926997536,-407.3990216752229,-5.22564740847864,-341.5764255179146,-463.34962647699075,-44.07009827412367,-467.72331444454653,-314.1243809742924,-494.5265134360206,-216.60544958037676,-495.42426448845436,-266.5946465760889,-222.85133966846416,-0.12699371019841976,-452.0095184521439,-358.9109371156167,-147.2641585452067,-459.3914002240732,-430.6656586168104,-380.4165089448385,-391.51695223384354,-494.38089670207586,-383.3604174671579,-179.27935892893632,-273.4678599048127,-323.4482641281067,-249.33377553611956,-397.73506227309355,-212.64125998421724,-432.5125372139771,-348.34013673127083,-166.59296935431655,-13.06173991957149,-338.2373068675294,-152.48050315463047,-8.716927574070832,-232.9996113050622,-481.0213802143648,-150.02136468246485,-449.06447044555574,-346.4282615198072,-497.2670000754257,-295.28123786242054,-274.3264534941339,-427.6999698762367,-155.38728945925072,-303.47691721107907,-353.70363282637476,-146.84078380222599,-275.20682862965197,-429.4668777324281,-28.396110956142696,-194.4629435298021,-225.58483654937268,-155.12498190905865,-313.26554691004185,-417.1169201553123,-126.83253978101393,-198.87542538762048,-418.9980976335561,-360.5130748906987,-88.13460087199442,-55.483295500008076,-192.42321253381888,-435.90068136635165,-117.08273422390924,-212.50445673420603,-243.37848320811838,-218.29519024231482,-65.49684114074816,-216.9067416865994,-268.1572017931989,-266.1140333019776,-65.04530510336248,-347.20129321787374,-319.5622055503652,-70.40747268779258,-342.8293760831061,-188.46695372193233,-96.37940495678932,-226.13922628079197,-64.95579553917364,-84.29776675673017,-233.4035609188897,-65.82725020572144,-287.4939414576587,-343.16212413707683],"y":[161.74069024518224,452.34401887998445,140.09230853328003,343.1958687577108,457.7910100917663,81.45864000010927,246.55466921595215,32.104336405091914,136.93807706094208,151.96558358343935,414.9169506070495,209.70457472297267,62.91019355015437,400.56015018868294,64.1838227467455,172.07641909288196,343.1675479546318,339.89742016424265,476.2615893946233,75.04355906775817,126.96231393662805,38.058036576206874,320.61396388650076,49.4808201283159,252.38599458728083,287.2860148782076,444.21552789004494,325.1756422991916,117.26211231318784,247.6636069207875,434.97327913790787,444.9962960352397,200.32869625155593,317.7489459772258,108.67493539268025,397.13294625753883,315.522230260978,425.1189888162272,195.4397409289834,436.8401196484438,452.3588714486403,345.66572208524695,434.71112199363625,215.97959742618133,342.203879564536,0.560854977948333,272.4404603437223,118.42421484978394,183.82128657411334,82.68762275406338,205.453813275565,465.1830860761541,143.62972863807033,413.3822673698101,197.21744848520805,227.5841924116877,30.031615104699092,410.4027058927433,244.32139305464574,381.51784688902177,350.90632054342916,273.50931645534104,72.77306708879006,112.9410911255111,386.3702783132419,45.330038865341706,445.73046230033776,286.63120203779056,377.1301432598623,431.2490932484183,446.6041613274919,131.23759539832537,435.4929437948182,82.10134719671025,418.1784739162621,41.01281022717329,71.6716153148339,153.15975827873896,174.40388672378504,190.59398896169367,440.3064899578778,429.0238849108459,402.4674316523981,382.05143055137415,25.14204599727943,100.25054752136053,173.9172174197182,244.51455264069122,467.5164592646246,127.71600274386697,399.6891548412076,413.73619261695416,379.33133515334936,431.50620045838326,405.34855608854036,406.55289593089526,206.02915076453178,419.6685451326756,289.3288082370873,429.2331784341091,126.14469234903247,15.389011475212545,216.4437215320385,292.9581710122523,186.22112423211223,464.76550029996486,87.558905932971,363.6984569891444,354.19452686771393,376.20395174533616,209.524309168287,473.4415772612084,241.53103983527512,213.0419772820631,271.66520871927867,65.11120606961806,68.11735070524539,485.23671843404924,457.40631330774227,344.01271614394636,357.72431301447824,432.54619762433776,494.9755060201684,359.9322941028104,400.86310517719284,142.57012309798156,270.9668005198312,337.18713317511964,85.46601729480041,413.99049204347415,96.5157055717859,75.30566267865358,472.9292538825541,275.99298970817085,203.45510424463896,156.61760659206558,373.6942931938526,64.83560042404545,451.2961494575758,127.28654351709534,71.34308957122393,96.85738607957839,34.904506340398875,240.9977443697493,309.1976778034992,397.8826201868225,99.2765196193931,280.26960076398353,288.11510547793483,356.7204347514887,286.67919235454866,96.91571937616017,459.52665517438305,330.540574685423,59.32564011335872,293.01012229300005,96.77252356990407,398.44974896911015,317.9887629664754,379.62921926097283,43.85953533379949,209.44628635095773,492.3857089294725,147.2132969051405,47.06715081030899,346.0348810649826,276.1495810610367,364.27531875771393,345.1059737630345,253.78423670951565,104.6083439651806,451.7191229719317,139.48451844554,310.7516867602056,425.0423074505726,494.0235994550986,498.4840280471682,369.3403690728556,446.57796643578763,383.39084647372226,186.85307299620436,294.1907916767328,171.96690842829554,130.6508106442169,343.5654609530401,23.43936442429728,171.80430991262608,482.8757427749717,376.2925791752435,262.6438524525696,346.65554019048716,458.0869669511951,128.54487262618719,10.905163446412347,305.92848453706733,81.03240149942692,107.72264039320267,110.58265038523041,280.54263730962293,194.19250271047738,119.61950701196444,279.94320156499106,440.7671991276151,43.78342793393808,357.8665950048007,203.24837546046248,373.63107797674064,212.54309016189998,131.5088421252767,170.27925545648148,461.7000985885794,295.14476861136995,289.9077333609744,375.0661340678476,499.2749735052836,2.404526388225192,107.46124959663427,492.2261229930198,182.4058040673291,187.0884766169252,326.6594378145502,281.21353881791697,466.8215098772313,46.929849197986705,122.70217746144385,455.7165309283947,309.7279932920832,325.691152356109,275.9572705135072,308.44203944962845,204.6690274930707,294.98758004598426,199.66436183988645,362.686909510029,297.9554268188006,123.3939796469009,94.20630774782535,335.20352640732165,177.53560636568733,100.5006797305904,55.19515347126314,25.30361484130983,102.08243004043305,274.6595515988791,44.629439709662044,121.26100583381105,170.7270813297428,448.2350197950682,59.58695382953072,476.3352236291476,75.30578229028873,351.9525145091472,90.89485514480256,70.1360107517225,229.8176326249093,38.020779954752285,22.00590387684076,318.0248927207369,192.92648130432423,65.07885601376073,322.4307028386311,326.81301060886403,133.4003449129757,449.78599196403854,330.0578647597,280.6574512332053,135.3909838509687,351.982096116595,370.5560451108728,139.84833776711326,30.23635213019793,273.7984452481338,415.9890802009241,170.31962144853853,347.9010443263556,205.48477926042906,50.92851055144687,211.51016626203423,296.4667376523876,357.3904485763585,77.47302085630892,319.66421534051705,481.7289668598301,133.69414255308965,137.65764119170586,214.33005092779655,433.38470481745395,416.9740688071233,311.6657754379912,246.92195795145443,88.90429963016,336.1724921413487,427.5423357422932,265.97285683179194,206.9743674498834,306.44832797988886,184.0653831571072,31.467645559406286,35.48276810879414,438.95881867560195,9.305299377571075,497.38707851593813,303.63600715155525,179.99690581089567,253.9224754657352,467.15400524397165,200.98829203409974,89.67559269825497,410.5219339018882,196.79019806406427,219.10809334785907,327.7405422436664,429.69662776006277,343.2565645993504,63.980618657771274,287.67542461789594,256.33153736267155,145.3529853411746,170.1203249033547,57.04741873711616,210.79779169676837,499.2695707658109,336.21328328745903,174.43420938246257,407.7045660239271,43.93524329740717,199.4304832850009,351.737768006811,188.23094249074256,486.11494788512147,297.4298887345155,325.824597875397,417.16346177984576,91.39652802262677,195.94803353991398,46.881549485561116,178.4840614962675,23.13311990085476,345.33066698568814,334.0190830890466,222.5737873380339,462.8527024997566,380.04483219012485,321.58184009091974,325.33668104645517,334.3887583259524,272.4384246197891,222.77420591779708,86.92615401211346,47.6517256211213,201.0963070667353,171.42782115167498,254.22999954170112,199.306864071207,496.9290848298168,330.44486434038356,13.38496371988196,221.6544239456578,270.35831297175605,28.029339667877238,404.42078172192174,267.0536368337342,419.13492273228434,96.56918749081467,226.26818181649233,411.8961045867438,355.1302092009193,110.89547268079136,229.3330113779457,453.61787525249156,394.5304101526348,221.12029406776335,173.79213245661163,90.11518101828564,227.55278870454032,385.7175442437728,402.83090529963926,2.321172867172594,362.99459106675215,91.2439526035197,158.32931969214215,253.91593374335164,297.0031855048212,329.58138672630275,314.5361924543942,53.83078050774448,224.4660547248236,357.62219996784836,499.2920208819063,268.4510012018513,322.3188815305783,84.77017165267009,189.37775861855843,461.91080396435825,240.4410317962743,115.32328154911953,490.9206821564662,105.28168756472922,410.08639713806093,357.4667156327502,498.9177652572203,330.7209725573693,188.4292424279349,476.0178614643673,440.35409352694444,360.2875976640086,465.2249241522421,297.74525017799203,264.72728245333644,77.6946422841852,38.15314687022242,224.4420775752879,464.5266970770413,87.37079241256961,165.93178698479727,365.85078922401806,486.04815746635654,170.35019100444205,232.16890820015823,402.22792108675634,41.64944986155794,275.08341317100513,21.050015056880532,14.252671429053066,51.903866202119396,421.3273079289116,276.699756505264,179.71036455677336,322.60047645990306,339.4757413853019,200.05001297782488,267.7698859309893,133.93854412477623,331.38388104191506,336.1772842440801,259.4242123597124,220.09417209961236,334.0854273414643,153.33513173270552,355.3125225417778,270.75944441695054,450.5297854790341,197.9532237716596,40.61842205716082,74.23359366676152,353.0195604865911,19.653383413350213,416.14381931312994,69.67678881594264,317.9073573755723,186.90095691415064,491.2923500478651,313.77428711550925,394.2639027138275,184.90608375090878,39.11099001824792,436.15708612371105,158.0459338474327,434.05868321113417,180.54129249501628,390.2515376428405,9.652317856435943,460.9096392936497,402.71656463002046,205.68360479304627,493.68808971735524,472.05108795076956,231.947458933358,442.81904439628306,13.318022464460565,153.32035110428177,5.945795991744274,477.2668763582214,297.93853250449064,410.0079095357081,382.9195625348154,190.85676113813622,86.7488026491311,104.25642141975399,63.63455353559389,146.40549326422337,197.8570344626076,255.34281785234592,13.628355902782442,217.2968908687074,98.48719217359314,359.42098180462165,71.9869259766478,89.29587658577431,233.924640730355,215.77175509113445,324.8988366667699,302.2396633151274,265.40696061750555,228.14826321063475,409.41348726500615,362.6575327886249,498.4525251740258,27.156301328149056,52.3270750302286,213.67879069000938,271.16725882023286,85.43703230593135,278.8134828384041,348.76029180597055,223.29747826257073,18.927217171093027,75.63039458227905,317.7712073471626,150.19550497665733,189.52700350686413,55.19628238890428,268.3031703780868,416.08031824652926,395.52109140473345,71.59496933850751,341.47337044484294,241.87849280682028,199.93425097272154,66.50694084652974,403.97048878102436,74.27149456905302,343.6041558853408,297.62600089569634,263.5813146771436,59.60374478922215,198.27012574365753,261.61436175188504,22.57315033261753,274.38500175712056,153.74896229073676,450.0010839937015,415.8219846357978,20.008587190111783,171.11902676921932,280.1836246338766,200.42553434805555,56.80716843597333,390.45464971199317,339.9755813945707,127.38592058526821,389.790603538071,329.62806338080173,350.2587651428524,442.4002459371292,176.94429551662793,31.525406136581392,429.5236876076933,334.23502791684047,189.79540234064984,431.5859831045747,249.12194633238227,152.19380733705256,140.8384507501529,435.30840349165356,160.54900433376795,97.522052190955,271.35326431987903,95.3247729280281,131.60837655802194,448.5753137362292,445.77867354623356,219.93119021882413,173.43100033479263,308.5841540996963,484.04868267674726,63.263052235370985,345.7504155071087,99.31678484226126,159.1111390896306,367.70043392567663,443.9487151272643,405.9293003268112,478.54460320308044,269.7917229276423,344.2632556295474,347.7489657012658,100.83741196960317,386.48371681149916,184.66083236585317,453.83932457232646,305.1337833673127,156.54298919956744,370.31384171943483,113.75181853237449,406.2867799414589,143.89519135053862,281.8362670665558,115.70600784541396,134.65716244102722,394.47805251586,136.92676004980032,324.23612697739725,57.229494217012174,391.4359696181907,284.2838727048873,116.67037648053935,448.05613227470684,130.5273513585359,177.40330100485602,398.27707595764514,325.52774675058447,123.78674427813252,138.3788271637365,373.7665733585003,461.9355233695767,395.490995357373,190.2522888332192,28.841710523333617,238.22175046739335,1.9740362330721295,85.05138592070405,38.894873083050726,405.77308035583104,47.519704362666836,225.57513118578476,212.79928011490102,326.47362955213674,372.423010146317,427.31601670872135,149.31137071044387,352.6075280752051,198.06273932383846,59.03033459586815,291.8181094809784,181.28843897172032,366.23025308276857,225.434490656927,275.6898749104844,46.34154700280357,482.1728504750233,19.49731461926685,399.50815452172475,73.03565106120024,39.66170625352095,106.98768948490378,418.67415938524135,365.1685058390679,284.1938559675958,110.50039766360197,493.3983859513634,416.7827191880434,406.9533854371037,379.2128288563891,34.93328835677878,491.64023005230086,333.4644582046146,285.844994751159,11.991302285929484,264.93858209053064,385.9756203343198,141.71544572988682,136.02956914521812,140.43797731551498,23.206921426302983,166.6063559588118,12.311990510747384,68.7819156363747,75.84138721645905,247.87413935774705,456.10811875138427,67.703760154603,128.8437083841697,256.060536853574,180.36091818531784,33.66224353250236,271.4469505932571,362.2844836448505,357.909333009514,167.8467166464741,99.07349749602845,239.7871934118845,448.19588111629673,100.07304416383411,46.80122433312239,34.783379829360086,114.55855065002885,277.86135625119647,2.95008282099396,197.11498319945986,458.1153355600257,323.40280053685314,294.92331379635175,4.915170692320614,183.40608565241135,86.6327866727159,186.47401831250164,66.36562907798127,383.0464478421228,165.21881091065526,377.9587626366826,30.716249882154045,326.6439362569798,344.68372939427195,266.15876928325565,97.42373306757534,412.3047367281939,10.417583912639694,399.5716047303165,256.9304020645735,73.80680564029052,387.3437081783333,490.0575772799891,2.785751448754259,223.973317813434,116.1893012849482,300.2054633349578,56.53466370166071,188.6046457559948,298.1831501741583,332.27730261163646,127.04767713538901,296.4810228252108,73.29497919097084,257.1590241366788,391.58795942879055,194.00781944528654,202.102812819971,373.2741050414863,110.28094598399984,313.141590090527,127.74034779678823,104.41750080481027,406.2436101278789,423.8052865469529,17.138001393501522,69.01193087713087,474.2130573513476,9.983616381332938,323.6036107949137,12.71696334124195,370.85411926727505,436.02277737239115,126.54900211123399,391.4344287154685,277.1525549553352,493.5880177371256,58.35640051128588,163.3158026144934,237.8118837610347,73.71615378972795,230.99188645234614,131.9106172996566,394.8356604686082,19.630031056895312,144.06706949108317,306.2857472195843,102.46658918182527,26.937322376745733,267.36012052252653,177.85782505994908,252.75205136869673,43.16524301311875,67.91408178486125,272.1072417119571,50.47125990388168,486.348461928922,88.09123597292535,11.83934154396904,345.82971067265487,368.76399835888,461.26735080216287,271.11665817161236,320.2153824851107,445.4658811651283,44.07714212303515,471.9688835473959,321.1483649024954,121.9212346357571,190.26841891195866,366.91870719117384,264.22461254989946,43.94416859502825,484.5724613136827,458.8195224865296,486.48058769027244,272.50840026191037,329.7527690739066,176.84024125415087,219.54934487401866,369.84776643926597,72.9634319230128,136.57466330552882,407.94967059023645,340.1528196401504,338.90809120567235,120.89495876397427,113.96047523718411,357.53311873380466,98.5775711386142,147.82046239502833,456.9340103478683,315.6906336241293,484.60460173198317,415.01630163198865,26.234659594323027,295.1036946587987,220.31038340623644,49.87982444384287,358.80611792565844,272.92149116461593,301.8625405522849,214.81702323921547,105.97138996151956,199.00513097741978,238.66236790469264,387.49878043222674,32.61560288714283,68.84077545577804,192.45412164608499,145.0911975603485,261.77535645539626,144.5497974070602,468.756813225325,476.80638879158556,150.96382364940342,194.85252841998667,67.76540662061537,332.8999226111432,158.69812753336544,118.12466141139433,438.12681361485164,378.7068353143843,66.37266400938391,391.34357010034694,34.781090654185554,331.1364526951712,105.69538492154717,418.4870895002356,65.35421564592303,476.3554204692091,290.97964792963626,259.60312775159986,283.4653140697292,499.61426185029813,382.57878997220274,89.99318874537899,427.8898935213617,258.2884618876395,63.38710502151545,296.0213330582967,234.47358574726363,38.214048716480264,162.8878810679052,249.81396146463652,124.53736362661971,32.78881036465475,72.81604474888681,193.57888628355158,417.9896976501454,379.4489528621031,314.1985663208692,211.36247269856955,246.78489389370094,481.1835047280522,490.64012225822006,98.13832975314585,316.82531253734356,55.85785176721836,126.5448475809573,113.24227547474852,198.31471932690513,51.59339350890879,369.3231053867131,387.2649054651398,462.01251857719484,462.043855746099,42.99604398337698,187.74591225066595,33.53579077933344,467.05031044991864,97.60720664347566,410.73393171829684,202.19516430520125,76.81560584963209,377.4826267144051,222.8817058372934,352.51564787035716,326.6441724956023,50.31227921362036,40.0101483354719,253.15873594504046,167.94869543930514,105.17091619821717,221.20424823627104,483.44346927494894,434.12247339963017,285.731190176056,468.344941965984,267.79409168968596,174.34433409674043,417.9187892689142,67.49831008945884,2.6826199689448105,450.4598300891561,360.64766625473044,358.5150734058129,293.1719437997786,249.31003774251303,477.49781914235456,214.6233468095169,493.2422042942256,432.0489239891352,377.1881267064108,378.8628871172268,450.6847761932867,3.3538854478214475,453.4690459262767,189.56781225019637,135.2581044025082,430.5668082315616,493.5636853127999,151.90769696642437,242.3907758942677,271.3009320265182,164.6643798539571,272.8373564293317,273.6970728656758,439.1287172837289,37.08078446644336,97.7955284587737,91.79950074532795,118.9910719697127,79.36375523796025,379.05599947870473,447.4227578821045,357.3248807591192,392.6874382071415,497.88096481947275,397.8878035334755,297.71825436137146,83.88289168415541,419.34363621985796,263.1272608027169,266.1394089703105,288.9762253097142,347.4328879441706,341.6726195707338,60.2669816303053,229.2414578665728,439.70975075052587,274.9112139652208,62.730430857592445,4.635303123639911,39.85689031830142,277.14378709445396,72.69904040407349,74.86568243972246,75.48267155488708,65.65788631651893,146.3736095424545,146.10770203138244,177.92364033482454,343.1269595337394,71.54492690155267,122.35105869264906,452.07984617076727,150.94807542219957,145.60778532728847,227.18489803844412,379.69265246515414,494.34823288860696,309.41363261205856,469.30255436087833,237.04861421343603,1.3901230266032405,442.30433635032153,41.40835639755491,268.7436865634467,118.72125614447083,168.43655593291984,118.96687567969211,295.1012440224889,215.80622443403075,465.101008922728,484.17812840062203,63.251573478030345,122.00944771559952,304.2905473154319,453.6907529674681,309.45849283026763,460.5975928691093,292.7555416596513,189.05304875645646,19.7057357057705,398.6679696098845,58.53670051218918,145.8856701495863,204.5719574275965,54.268220513591594,448.30549212637607,8.429584239423527,39.847228671007095,146.1049109345216,142.08539028861077,108.04867075541091,99.46029723703953,123.97326191359082,15.26448951887116,351.4711159304943,14.22378911288269]}

},{}],91:[function(require,module,exports){
module.exports={"expected":[1.1286602514334803,0.36507214058107246,1.1685355067806937,0.6246603916900353,0.9929978274104333,1.2396536002036873,0.9370164876028172,0.9109616249109228,0.6917507638353629,0.4800620352249438,0.1817821693220575,1.1374740067834084,0.7396918826776434,0.6928634220324792,1.3565988544398746,0.9124516368255632,1.0672169123264552,1.0197355269579556,1.4276675008939888,1.0555288616616834,0.07063467319082525,0.10769456438174661,1.0851583496103614,1.4808936827982935,0.8816843656901596,0.5643499517458698,0.12567227456393787,0.5627233834694649,1.1115812932492941,0.285205083397064,1.3404132050241913,0.8329867436842959,1.1333497041839125,1.1246359391050755,1.0697852550203306,0.4545647956061404,1.3579181767881179,0.6541080405114031,1.130248934953911,0.8923504990639268,0.1401471118516254,0.13185802875382566,1.1428740670515363,1.3303347279385496,1.4711326408727645,1.3091395785179478,0.8638858693099422,0.6474690309937845,1.2653610289176926,1.487249665765311,0.21134602405102676,1.1099502941538317,1.5386380167601723,0.8160070585426654,0.2837569172809549,1.4741790731070459,0.37123566658188467,1.1327405124058367,0.5476679695466676,0.37816237580253387,0.22403582541470812,0.000751357254215947,0.7510652726496223,0.8939433304909106,0.6851627935820067,0.5899296865039424,0.4628074829114432,0.028697290935187792,0.6416591257041929,1.3427605471422432,1.4860615518105187,0.8624996386038649,1.0476908005705434,1.0559646685110193,0.940132088522153,0.7719990757520131,0.1032873869837488,0.4321416289014937,0.7126859395044576,1.3659222228625025,1.3985763033682779,1.452690050187243,0.7483167920657565,0.7491662806901446,1.173338753229107,0.314972020156628,0.7407469843334832,1.4532851784308458,0.48041951459724097,1.2197866173192495,0.5763438622917312,1.329517649781184,0.6704116745042025,0.5193909896823895,0.801388960247505,0.8359381554209351,0.428009324318374,0.8663651915220331,0.984909445498697,0.32421112859248247,1.0066519427492033,1.0331170285231963,0.29098499480394924,0.11619184560387134,1.0785368293210071,0.6229696061903123,0.45558849103267735,0.1871607282090593,0.4850275664128963,1.470250548109722,0.55628683100838,1.1570586146292112,1.1044451196246157,0.25699468728536307,0.10722100828742252,0.2504332109636741,1.014053322130065,0.4795243473646228,0.2787584122607571,1.4606209197816196,1.4374090039934202,0.8153107651902145,0.7439451815381544,1.544960606232891,0.8548242428962374,0.8979881349540122,1.258822744162654,1.173542113281747,0.7893085036949434,1.534722908720855,1.2073051519075588,0.7761544163582987,0.8777341281648547,0.03412472752215819,0.4882721555562528,1.080503639024472,0.8121708161296667,1.446842452210152,0.42308481903306716,0.1920046761055487,1.4328339418819631,0.8360780619219438,0.3305960319065162,0.8410872551929937,1.1580756241680579,0.6408148184290463,0.7819771112164616,0.6973839803219877,1.023056862573014,0.34769254350246886,1.3955726177698726,0.43680201366467364,0.5232838144045197,1.1898691277105384,0.9580739897308264,1.0702873014207495,1.266490483047343,1.2711812128129607,0.5381587994346093,1.4360581441341345,1.1835833346065376,0.8644866365923884,0.9543021475441148,0.5557270668207309,0.7354031000301842,0.7885298937123548,1.0582303746167958,0.5363005739098708,0.9416408988440494,0.5606602715267393,0.8408450474701947,0.6673573144900581,0.9514640297393111,0.7080645663893147,1.143953589037004,0.9184363606987422,0.35654330048143973,1.356352395472652,1.2697442621926147,1.352185167692115,1.5021968266573924,1.0426271074921725,0.6563168689068725,0.8622669506903242,1.5482595031107502,1.35233520804738,0.8297039191649913,1.132599671677594,1.5355280985836288,0.2432374572793053,1.1982634921809912,0.8985758430587225,1.1945329713902813,0.9570667951722419,0.7955911776217701,0.010474985677080268,0.18434345873692917,1.4757119080938514,0.3619891890364033,0.8286812278237846,0.1485344245121458,0.7786759035813821,0.9275265284683873,1.2408570600870772,0.33240676281323506,1.1684226090622696,0.8846598113703958,0.8673132993219957,0.24813993295915546,0.41391148772286884,0.9045377964220822,0.9388102932850371,0.42991071797411073,0.3678461213825537,0.942975732233509,0.9262277466422504,1.034922966808734,1.5381103891667336,1.1245114894970052,0.7038150117869266,1.5373365329995725,0.7632816702755515,0.2586409621948927,1.0229274212727433,1.2696807695435433,0.8246270678809444,1.0943601671274388,1.1282603008076129,1.2310983026195073,0.947005363333842,0.5986942295655662,0.24034008634498477,0.4571539974128393,0.9298459984696551,1.3052441361122304,0.19252005075928008,0.19953764241500807,0.12265575207257137,1.2060980018389964,0.7776696634178917,0.6009801814127542,0.6798737421923761,0.17510940621560353,0.44875174711294563,0.21477978118424917,0.6148674144472466,1.147161013384757,0.26823645943461055,1.3189174317090335,0.9785920715734907,0.1778209923469056,1.005656715260129,1.2403265275681847,1.1947541742350398,1.0261669437319492,1.524245433319355,0.38351043803598917,0.23366380406178244,1.439061725005586,0.4853204421084434,1.102040034467542,0.6233790463337685,0.07148559276950066,1.22744957938133,0.826593356652902,0.8360009928842747,0.8633789621046741,1.3607056785418337,0.7203903141956407,0.7899162644442386,0.7156788934527654,0.5428312899206731,0.49843926767251884,0.9602245007454594,0.8425100046802596,1.3439403077032293,1.4333873943024111,1.3779400737936183,0.9636079930309505,1.0844670285625095,0.9282062402857632,1.143353510152849,0.6972275406161098,1.1832316138802819,0.017156236366779355,0.6837722242587062,0.8340292822383609,0.3116594129496352,0.8003852736123203,0.9031142699288992,0.4533425885046427,0.8099958725735491,0.591166069044857,1.0496390541221372,0.9736429276441263,0.31770508431235933,1.3163576126439973,0.09902767388033717,1.1098758080863715,1.0924983042730336,0.11541282591839239,0.9105495237926902,0.9001128729398796,0.1765958942507937,0.1757797609159945,0.49906393417200456,1.2181042067382606,1.427550870338271,0.3671941649682903,0.8429408201881058,0.827205665001263,0.7806260358539144,0.7856062368105435,0.6119092854284708,0.5214244209383461,0.40326264969378,1.1055865556464006,1.3860771777953405,1.359153891054557,0.4248032618283019,0.32779391295584354,0.5943874881476302,0.7071739457762037,1.1211098378588171,0.9403134505374987,0.9206626972528911,0.6328799446476214,0.8968724127141545,1.2077948125904063,0.8573780319013916,0.7043055509972531,0.18246566365765582,0.2687366816275171,0.8171584757835532,1.2565420186910825,1.233986927743681,0.6882718350175643,0.7433571661409427,1.0195842778604163,1.5418824856925395,0.9610175253713087,1.289961887213912,0.22201367797742824,1.272406127716495,1.0361362888807681,0.9405566879257512,0.4438820056331593,0.7287164616799701,1.0912287060582373,0.33345239344131394,0.07453243444331485,1.1961657818071678,1.4409646242218703,0.3425366599030124,0.8745226923807025,0.7637225255818918,0.5004679034140002,1.2899342327401153,0.2581287143667924,1.1044566131464917,1.0242241818348967,1.0350202619117375,0.40974398593909267,1.2376021490255802,1.078137648870217,0.5149829570094734,0.6754260954799934,1.3324776575243087,0.9370987174053547,0.22093008696867092,0.32366083784090677,1.0307038374322814,0.38176775446188377,0.5760818100015788,1.4669217341797265,0.6891226983491117,0.20439840442759177,1.2092605763060735,0.4144836740218449,0.8068293289299096,0.9082082832967628,0.5099396719190387,0.609454429450686,0.24473374989165414,0.5794852290627469,0.25113594290907815,0.6811213711969388,0.8372333258687197,1.0414363501813464,1.492100931894461,1.5531721647931387,0.7188778741032914,0.6441841762798278,0.577685932003807,0.07865220733208152,1.4192480514699752,1.2693316109978219,1.1093885646796662,0.5548124044593559,0.905030220162772,0.5978612600809501,0.5910343373758535,0.2572972163299316,0.9394565167488486,1.3431535239720016,1.0792824942018844,1.1674288779232334,1.3737623075262977,0.7530156143029823,0.7401653526109176,0.7889065295240214,1.0502160330756685,0.10150127845422931,0.07967210521545198,0.7775751193465358,0.7507560071000737,0.7464386394983376,1.4059671284202657,1.5093505902685656,0.49251548805477297,0.6004932152034448,1.3604754446479599,1.5516197869236197,0.3489287383467765,0.20670727136345188,0.8002467262139772,0.5579902373374305,1.1993821990315827,0.5393669643282057,0.4337142555974497,0.9311456283405315,1.5511232110806727,0.5674471358492732,0.5052621457479691,1.1360754751574837,0.7576471405193795,1.5155710887756446,0.233756668927095,0.2877237796522499,0.6288683888181679,0.835138065170021,1.1308839196321918,1.2112105894915524,1.2638588052342694,0.9198481367297904,1.2576248352103998,1.5582695280466474,1.1705646050497214,0.8834800638820985,1.2991899859628566,0.2992173459576449,1.3829035007872523,0.6418780257558264,0.6125909605340388,0.5204319181932708,0.39959500015029314,0.1516466808312157,0.06385019685808714,0.5113842579154567,1.2835336783002402,0.7177989124387624,0.5609944530699359,0.6010850293440063,0.037332315779406655,0.6361772161383636,1.4477226606355582,0.6406520024801016,1.4454813152462014,0.8491612191330553,0.7521944685253052,1.0042230223915352,0.6285860358944402,0.24498273371336565,0.23510247483624727,1.1588959516359785,0.7659706912060948,1.2724095078220699,0.49629524977274403,1.0718790379719567,0.38184588505751305,0.7636154482310822,1.1804986714198782,1.0237335501939508,1.496034818584579,0.9075049361191316,0.683129612066115,0.5547054625441004,1.1372956566224206,0.5065996551584999,1.5412814714927607,0.4370909265574395,0.6086449976608526,0.8278598228058494,0.9824200889318688,0.9453502588269427,0.6882127831522277,0.6366101130736636,0.013437270291951397,0.8026216141133125,1.2355245051848378,1.155104815802729,1.2025013043072372,0.6406781546141154,1.3537739137973692,1.3784041069183746,0.6065360278900427,1.3428077987045886,1.277013747696679,0.8263255239387732,1.119281044351988,0.5054698520481149,0.3565151244411355,1.4805479186150492,1.450651651719656,0.11905711298306057,0.25033333453368567,1.0912653753827877,0.7655662949841532,0.4804562142855797,1.4903416579946387,0.8101356394426465,1.3793332446229998,1.3306637653672988,0.6266898971867929,1.3363077427569854,0.6776031226809286,0.6492124531224616,0.8444779653732046,0.5498579165555709,0.4317397224338434,1.157181737996273,1.4998453844521928,0.12291006442295241,0.08185915323516049,0.7258667800377377,0.26095665312289,1.2059439178675833,0.9398893399373325,0.26235586928760324,0.6965390434034624,1.0756918466851553,1.087310440329639,0.1837072575779506,0.10575388589455986,0.4822462945200641,1.029451830052366,0.8767225691799654,0.6853289517040233,0.09308234599678362,0.5882715581246759,0.41826161531654976,0.6993629962143922,1.0826082485573536,0.8640696844639751,1.3256431138015465,0.7420077329803902,0.6339108722873711,1.3005812723861292,0.652188491958461,0.7839041556088336,0.7674494257141894,0.5157618926028734,0.8851519773191788,0.8279357509673693,0.4909007882886398,1.4509205117363289,0.1046359215605515,0.22186723228448146,1.5080629632505707,1.0022733373493917,1.0200461139919874,0.31737623295855305,0.8796844254403231,0.5653856420214471,0.24237983339563055,0.4282938739146934,0.7017036043931287,0.6128727239810596,1.2741983616313068,0.9684416676828718,0.4486972701921367,0.33446938874382237,0.8468590395431195,0.8374789083902642,0.022026343237789608,0.6189495436858699,1.458536921488181,0.0966357889182532,1.534448350523057,0.9622502266180664,0.5334438741155031,0.1904639701385023,1.1929172356851208,1.3823921260677354,1.5520751739313485,1.5289878075699173,0.07194959206216493,0.864961937339797,1.5616077830224462,0.5554952560747748,1.2329415672671207,0.21971649108464208,0.5652525175234236,0.7640634035108183,0.15044981381626654,0.8441633048418904,1.0526397869504385,0.839769418343101,0.4587553799833669,1.3489592384185807,1.0601522586392433,0.31902963885170577,1.1635520587586174,0.3766870080240666,1.2397434458636813,0.6299544955268179,0.30569484317843193,0.7726941389047914,1.558850680125475,0.7911752877342856,0.13111118805485578,1.108704919383857,0.7918600883207945,1.1806637874263501,0.07537277053146355,0.23482369066433656,0.5770917789032907,1.172695174891802,1.2981179841582415,0.7251862539013981,1.1226307021414408,1.054366289584809,1.2091333444076608,1.020812340759522,0.25164044335693087,1.0449244975120415,0.258709691418452,0.8618827866854041,1.5654174531280898,1.4297739180137172,0.552247502313962,0.7163126585827083,0.28966606849312093,1.3941095734763012,0.6690407829027544,0.2236838712859583,1.2778449250370771,0.7075130811670508,0.24563184107300123,0.5346605518049299,1.3529468180626416,0.8846677158760952,1.3084124007297178,1.1400011782202846,0.5707191036252071,1.4495069143276849,0.7326015559932677,0.43544785810201236,1.477349624140813,0.7022608711577211,0.731836294475685,1.5437787156229723,0.8700938601756919,1.1556379545729982,1.4188855796744502,0.35224833749001166,0.9035950029094273,1.1130618479755927,0.6152905688629259,0.5007993903287348,0.7170451061001759,0.5284177487915318,0.9446785822409178,1.2301782125288219,1.3405459689426305,1.3288374341795837,0.7849611719242056,0.8332079798159929,0.26893461413965486,0.7836606913902437,1.1173630938332433,1.222458734677364,0.7400597866569562,0.3812093723345481,0.7174136885355332,0.9910420448468198,0.689522586736939,1.4028363492352924,1.0834771020950291,0.5071251915155816,0.4109034763047428,1.4276402736143385,0.22287452403672148,1.185312428566481,0.9061657313400289,1.1148864541812904,0.8472297159917204,1.4603159902190124,1.1468245282608032,0.8106917348060921,0.3369809478918647,1.072442980284103,0.280193140858254,0.7665342032707357,0.501911789720881,0.8640019818117698,0.790142892941493,0.8865976494594157,1.1128480078395981,1.2227786800263039,0.1085621699472925,0.7118882141533764,0.742331888741592,1.1730960122289729,1.169533354574726,0.5695018689320415,0.1500398338739639,0.7551506393890297,1.044705687990625,0.8565222717035016,0.6616592075004742,0.03079401168333326,1.4038287197220192,0.6848949854781731,1.434572787745518,0.8403823122635727,0.553680468806077,1.4906086826157587,0.3091705569182142,0.020600114945940762,0.7377240267848989,0.6532268241811018,0.05598189553354495,1.1143632055912553,0.9699005767629034,0.2447551417680559,0.8126583646048886,1.2306794022801677,1.0405645769336618,0.5121524119087869,0.4849600048225778,0.6274455930383012,1.486078141772103,0.4406155815353777,1.4713035613238388,1.4707823551711157,1.404486327901122,0.09148524261540047,0.287268389893434,0.640411005036482,0.42992827569003983,0.412964147397103,0.7087512614815944,0.6351090489670511,1.1259446875177526,0.3008158404598201,0.9655882540233875,0.5191646683520938,0.38965192844784713,1.0597236452486807,0.5359097499597357,0.5358532058243445,0.47710184545861944,1.2779561711503178,0.9481092282064953,1.0358301227141358,0.8920681371604996,0.8986222690268104,0.6702406061220129,0.2279765637832147,0.8685468132184332,1.1620312064642861,0.17288499084982198,0.32664973871034675,0.8287509761676004,0.7937857889270205,1.4360649561773187,0.7038176244819861,0.6373618719293229,1.292260246545455,1.3554639926376086,0.8309120385149784,1.2912536046470335,0.6459002600803186,0.860185438197669,0.6211454376221897,1.0346061555271187,0.011155484133940838,0.8477344790869953,1.1084246798477841,0.7290261645049507,0.9420076845900868,0.34270379451416694,0.5200127741166741,1.0950534065583328,0.9362066619247814,0.23085232094188168,0.7971321344640628,0.9592153061074735,1.16952832342899,0.7602811960737725,0.6030314751597805,0.4910376645037359,0.8357820179509272,1.380157848852136,0.8151659746141829,0.10589713600269172,0.40419796754726894,0.6796522982281292,0.7070187921670127,0.6825238475305975,1.0964719708195372,1.2213289244853722,1.5102881007090363,0.6256982773556767,1.142111242472282,0.39999907944619456,0.7413601893186784,0.6295079830094072,0.2612171218991299,0.6807514211751351,0.6816751722357084,0.595123298708814,0.5841263449976987,0.47808288521805375,1.4244244067063638,0.7174465441101314,1.2961067931486803,0.5001281213547342,1.087241178906099,0.4978684154947697,1.1141804243030098,0.43513305209892744,1.048148472578038,0.4775912794557394,0.19523320755376652,0.66582832437668,0.02209804783337439,1.145801529175864,1.4280685502893276,0.025572531063563976,0.8060573694949229,0.8963954659631723,0.6689965455006864,1.1939256325084222,0.5210696322599988,0.8552395745459158,1.4489627860129772,1.3854443090145152,0.7495880215998809,0.28191471240865834,0.7817550936767045,1.5222031800185851,1.2527756898244349,0.7670424539331805,1.0363403283822101,0.609517762445215,0.05781327704317287,1.2456520598424698,0.9360219780974944,0.21488184365863083,0.738950214476462,0.8453457357476734,1.0268016220115412,1.0564531200094203,0.0978238280237678,0.6763691917359653,1.1816264995187415,1.0860147834053235,0.7580494036170566,0.3426575047677854,0.5708033609120823,0.7890521806297107,0.8480972944000327,0.7298226869416071,0.5250634093792429,1.3115996700915713,0.5927690487196225,0.9477968269209998,0.868715303055394,0.825568051265404,0.8529205890604927,0.08628824712750406,1.5057273441932468,0.6817705794530141,0.9175202848150451,1.452355841833827,0.899880655909526,0.2369149998465095,1.5169380753290387,1.1533255445253467,1.4728992601237918,0.9048040338083466,1.5490061938319732,0.43602950773184246,0.41144101419530643,1.2762695904991783,0.6570385674231862,1.0220166199736758,0.624169672063714,0.8174725307270514,0.16069191647919864,0.8940668841689277,0.8862653264047341,1.1344328964866415,0.7494642615066318,0.733255592736922,0.2608500701565989,0.4902855994656939,1.5504405454996166,1.5667214489431798,0.9549579526384613,0.8622736291671149,0.9575219704197178,0.06299407362594497,1.1927370615933623,0.43149887503242623,0.48766914781258136,0.10587814724989905,0.6479276930189506,0.36577906114053993,1.270779565229811,1.4613360025416073,0.5070649373115991,0.9361736658776796,1.2206004960886068,0.6983557642029373,1.5140941278624196,0.9299673166474002,0.832012087377704,0.7492614375377645,1.020611713392192,0.701924968234607,1.412167398869751,0.1239201518553461,0.20139169742937318,1.13307400876571,1.1540431810437695,0.07426140828689723,1.1123256816091192,0.31411815365595025,0.019725017601179205,0.27539661342670774,0.7876086940331737,1.1543451534399585,0.7535393884963072,1.2822028676789856,0.7171169447224384,1.2470852289008914,1.382523160407413,0.48384182091892586,0.3462543620584058,0.21773767024934548,1.5333934507054725,0.5915802349835015,0.9176571863529561,0.022532537463559526,0.49281380574696937,0.9269696640382439,0.015463117294177986,0.589148989149618,0.21777356240851192,1.455298473480773,1.2947639877319168,0.9336886672840091,1.4722356606061469,1.3144916098213573,0.08373255108539064,1.4400846655750312,0.38593966746457453,0.7734394900161738,0.7352842425892794,1.3637477369211135,0.43837415386339995,0.5168639771395624,1.0180547823428732,0.4018425083942888,1.5461298840337343,0.6446287551613828,0.4240613538491147,0.6465706133896524,0.8025165365823574,0.7156817660369835,0.9416815774396567,0.2929649400264718,0.5911416176897579,1.537654347256624,1.4731632971607345,0.6563588362296084,1.2892092743667678,0.12950255365553645,1.0623994887759363,0.45738513016229254,1.2175909087772987,0.5868928806526409,0.6083684276599661,1.450315973826261,0.8319472823705734,0.66623881670672,0.35424009538986967,0.6039222100268379,1.3906480586415653,0.6962019692340666,0.0476520017025511,0.6719425501228742,0.12133758473220842,0.6800723431154367,1.1805712855843418,0.7771885442638379,0.854450844496864,0.836272187718573,0.8405718718930307,1.458757132718435,1.4235645974960507,0.706136785270468,0.2545157274166256,0.793873469804962,1.209625930374403,0.6587633525681151,0.3682885671977166,0.2278288994081317,1.3981598904901804,1.0404873304344069,1.5242831720349306,0.4030308510782076,1.2836105659854802,0.22432595719598053,0.7328105208400264,1.1347713324828683,1.432974950635759,0.13256190954277017,0.13722336495170354,1.4515662761981074,0.621673870860806,1.214172110065385,0.09922203437775888,0.6230966489998241,1.3567330519339424,0.339415961844339,0.2289849176047192,0.15116608593945904,0.883336324904789,0.5578812689739386,1.3408846912828678,0.6856283791202951,1.0701099482360605,0.6993181464837481,0.9147534066890061,1.2746063044983824,0.820719840315448,0.6629405220210423,0.25047722888763757,0.2464184009572545,0.3753977723142175,0.16893302715716127,1.0029857724498092,0.2346334111748524,0.7223475553690096,1.1085169046156513,0.36887214870584584,0.01818315871160473,0.46980335917529215,0.021107198694647323,0.06498393141081078,0.11605882268981584,0.8335158112866471,0.31544829530259505,1.4263424300107979,0.9549759189717414,0.31638586246203027,1.0492369593994038,0.0121333148905128,1.3666147112781684,0.5324860897454575,0.9621937203859204,0.4846231965162437,0.6241202768131731,0.677371006093413,0.60524773957688,0.7568935824606461,0.6856583303581759,0.9324466187277014,0.9476655403577929,0.5490627125110821,1.1092348058390282,0.06387706344095148,0.4565671957530326,0.16412765159672577,0.5347300123746394,1.1394968181016683,0.6475983828585394,0.4347603911901914,0.8121543946470009,1.3977452247931517,0.2662279648619018,0.7725943415026543,1.5653260770926751,0.13895766235225657,0.8664648311379491,0.6060914124212624,0.5629264726277596,1.2839218455196935,0.3469340862022832,0.922959371439151,1.438848870391042,0.969879130290828,1.4439913775580038,0.41342773111475234,0.8420985188625757,0.34001596627058955,0.8524084844249501,1.0584411791293404,0.3746856391868608,0.6503716273372896,1.2129251104702226,0.7670863343387276,0.8806640110413005,0.30303678703808823,0.8666690623710016,1.1647802683237014,1.534717902315727,0.7756770513742243,1.1999537253506054,0.6770043383959844,0.043421861720029035,0.528623629042038,0.4082925723588987,1.5264568677400223,1.0920493753279685,0.360426308111026,0.8162364949667407,1.0106232334890874,0.47208285459788407,0.7537517210317046,0.8655886934722794,0.09359218603850265,0.46573643828256406,0.6475923683815418,0.8877992972455903,0.4537299216747958,1.024449628409349,0.27929762951039677,0.6956207457818752,1.4599921703493828,0.40111281933368165,0.30544562406179343,0.27764945846633315,0.6201512514855627,0.8470415311152452,1.1931662245743544,0.07620774731731514,1.1237381284700736,0.023549350702796762,1.2624339939763234,1.2948141427776807,0.7656975090059495,1.0503133390756962,0.8699515255905721,1.423267180144801,0.7636685199376307,0.5022113201318552,0.4518505496517724,0.6216868723529642,0.9541533945888737,1.5623632657804638,0.08461626857938592,1.3800429876977003,0.014915671842890856,1.4994066482381176,0.29728921482337245,0.9769141864601848,0.26282266840238827,0.9996471250751598,0.7401380721267397,1.195693363935097,1.2351761620418251,1.489869767797701,0.07633387485047417,0.6874452228241585,1.0081932439314911,0.8655960043259118,1.2326906116603873,1.147232159608365,1.0027434780483968,0.0032292478903815924,1.5075280380880371,0.9043175867560959,0.3559217045219,0.14211462753664977,0.9165286554017946,0.6802054649660042,0.17711711607967684,0.8915995158877892,1.0486063711183031,0.7836699388582237,0.3382438191280769,0.2932893679662555,1.36045271283172,0.5340611426442886,0.5771926744497033,0.8771030259630994,1.407268124006964,1.2014893784478933,0.6884237704774904,0.719349731870233,0.9989209249387255,0.9975138769273261,0.4587464699871153,1.0582509030942109,1.2867275116342842,0.8039940731812996,0.13342266471442915,0.8695654510491097,1.127572038634517,0.7035475186711244,1.1857824433861532,0.9113303280793412,0.7734166913538376,0.411390793424969,1.304277492988533,0.8157664646468819,0.49167319499418627,0.4975114051481694,0.8819682314254019,1.3317154279940375,0.9805799130935732,1.5669713914163024,0.7884472781274444,0.9243377627213912,0.7102525863337303,0.292722438600303,0.3399018864069456,1.0325293694823796,0.42345562863943575,0.8684810541922517,0.2882272807365072,0.5086674033527046,0.33576454525192206,0.7511892662060455,1.2899968369750694,0.7779032459541771,0.8375377981840101,0.3457549657361064,0.7115557491219335,0.4576819466154441,0.856353317243339,0.1165392981606071,1.5383000512897365,0.9526305128266772,1.3001504609988819,1.157185651856799,0.730431709081718,1.2584414930128365,1.0617302749874171,1.4120168378348157,0.5569014737382404,0.6060458379105207,0.5795163614631857,1.3697018432460228,0.7147731215584607,0.36207046995756176,0.7420425967376767,0.20141776139167092,0.9237058941153998,0.04632205330028926,0.3762638319815398,0.6661922735129793,1.2278232666039302,1.432492446545542,1.2647682518925032,1.3531618779390342,0.40229728069695375,0.8254253942529101,0.043195949079768994,0.7261879464945012,1.141723198735433,0.795619199992909,0.3417097566701093,1.4781838464195847,1.5627304199432477,0.6187764177447719,0.7524484236139259,0.6782079778558873,0.7183259336897608,1.3361049637853524,0.4334866811990934,0.7732775327131466,0.7710339928388816,0.1055093866757632,0.5740775573135444,1.1258701462236433,1.5633232352971351,1.064354408817348,0.25756279778131225,0.6690293478092917,1.2083136753066481,0.4735922898554955,0.9398451062817554,1.2453767830936113,0.49903943504750625,0.6686236153490455,1.2239797389302423,0.8640090332015172,0.676544655138266,1.271175270630579,1.4846216213372359,0.8892367200005662,0.43316482553956454,0.2675966957206177,0.656036922216091,0.9287815045902256,1.0374221360883142,0.7475555119186101,1.5594872782138005,0.08762407210986259,0.42271616397463624,1.477245359238113,1.2995844665712757,1.0609966185225428,0.6654522786454978,0.7362526057224327,0.9823859858634917,1.2976595307786631,0.7490071651605359,1.2664002151032479,1.4869523751188725,0.5395380678594552,0.7876334233174745,1.4211672617258024,0.7704285259417893,0.6306910446739328,0.6967394696937718,0.8095394786206822,0.3710390117589885,1.1086395515874143,1.0754345095399986,0.9004461361791903,0.9900427130236774,0.13477629657341186,0.31501467086974083,1.4597109689495682,1.2078259712767894,1.3370607144652051,0.3119462057462916,0.15033253652380688,0.6266661735314925,0.8274713857351844,1.366956038638585,0.9890283548495065,0.819700307078068,0.579814855172896,1.3460591745533517,0.04187922418105978,0.241406008741322,1.1283213510328078,0.7237811014737355,1.4319102598717883,0.7244455026503854,0.4997580309502923,0.3792914993811545,0.6964116930141849,0.9477822767160176,0.4709390669330718,1.1250300046265307,0.7564766841400326,0.8061089131705751,0.8788497453513301,0.10736097398001908,0.5164592405287302,0.48884878425976314,0.6199940972659211,1.1180205354545931,0.9105002648616534,0.3764710659697583,0.8021647940953919,0.20672786139568633,1.0819966844229945,0.6546009282596018,1.3777719410386904,0.28311658324387584,1.4761278017633024,0.5733692451321845,0.8557835786770736,0.5979368015046003,1.4847088343202617,1.4686914096694847,1.0804598944058608,0.5502725404618964,0.2808886156664467,0.8866189757552198,0.35677663286769357,0.8731142800018453,1.088384649584636,0.5052270760211233,0.7970915354105055,1.0254813982546152,0.9300787178759093,0.6891076638004892,0.7102438789240666,1.2342661712092264,0.9938809647061068,0.7806822538857267,1.0263278027572047,0.828131210253725,0.9369575842051292,1.0150727013657859,1.3366897082656162,1.0876500391973865,0.7141916045246675,0.8830502173599244,0.1772025393343219,0.12339908202318299,0.8175592683297286,1.1895320587797222,0.833724319406436,1.185103885176874,0.12963342089947982,0.1591135141123859,1.0109051122309725,0.9175252556077763,0.5030393434420989,0.15004750345894927,0.6959689898650507,0.993737919776198,0.9194771069857592,0.010105563532408787,0.8337840588933574,0.7078863708570613,0.7490635562128033,1.1738352680476036,0.33729451715260733,0.7356166393370744,1.4617877732418838,0.8621447478175032,0.24344207230700124,0.7551628078324518,0.0526989493967932,0.9839961585526624,0.4222991792613157,0.6143033772030551,1.0062230497166087,0.730087165673056,1.212098592110044,0.5998271997694256,0.7807691994187074,0.9405003001067389,1.0432362631989802,1.0830315687718084,1.4572791748826117,1.358497506598301,0.2438748756297479,0.613292266456194,1.2148169348444555,1.4645879972486953,0.8881866896152117,0.4853180277685164,1.2101621256035955,0.39902065218060495,0.7472903577026923,1.380715245994731,0.9893732861768874,0.2185240112977339,0.8555806370311831,1.0855866720334715,1.1992654055218912,0.7828476626476163,1.4538881575675386,1.0667452975512663,0.3452096927883911,0.4205415727088962,1.5126710966668278,1.232292815595546,0.7393997096882421,0.5847287809773984,0.5717260074761656,1.5194878971203396,0.4380524938074965,0.3222644245758604,0.677465849387563,0.762217574162418,0.7126303665539714,0.002880699557924164,1.392197625115078,0.38330779175752894,1.533333571040708,0.6041164182880848,0.8266650849391629,1.091891573649511,0.3991883829939848,0.48231100961205337,0.5671975438612296,1.4667512257176902,0.49239786515536865,0.07132268891788449,1.2107269751926781,0.41927209178642894,0.7821226401600889,0.028774868397920268,0.9504603302262651,0.6769572651495795,0.5112395923677593,1.3455881383034494,0.03791786921063477,0.815880019058343,1.375191104848948,1.550023481475523,0.4323070432127168,0.3826727059226309,0.5096472425119045,0.5846877468782536,0.8392929083957129,0.976208293806456,0.7402863685612626,1.3309171444060914,0.47884920854533136,1.3770421658535776,0.8241834942311175,0.8804676225829617,1.1973900015481251,0.2189386891939665,1.18562170984639,1.5023438867836076,0.6847253000881175,1.1120407099039054,0.8164195120592033,1.2627989362423353,1.3340583478424286,0.45336775103266,0.9322258118622849,0.14645755567320312,0.8349619254508247,0.5633965738488309,0.048900282851472784,1.459718128817359,1.2768974137415172,0.9285528761443773,1.0219769086197574,0.17207660629302848,0.3006156690410727,0.7100341798797105,0.5771003467511988,1.0346011755622808,0.8503302156703109,0.8825859766924008,0.7967688727150534,0.9690200581138309,0.2095781643779135,1.093093040458564,0.8663826644296397,1.3508613525776405,0.5449604198133854,0.26728403537161116,1.54499314861676,0.7498830072392578,0.07838102590574285,0.5889795094039968,0.19891787821478601,0.07689581939047699,1.0491321800409565,0.8432862358993828,1.1075295955987474,1.2120510822673007,0.49039823912469455,0.5690374619310824,1.4203281372851482,0.32118133349680933,1.2737480818876783,0.7742408481901373,0.224006494640369,0.9945040519466123,1.2119074440478026,1.5027810176459222,0.6516951675850265,1.0828734729368246,1.173587240562329,0.6461188844157864,0.45610569210933627,0.8440530157891414,0.7821524561416267,0.3113211208532719,0.9251748700147812,0.2925591595686636,1.1204981927310247,0.8978571248916363,1.236239697505126,0.7213503460632154,0.36397792032948223,1.1272913666641657,0.640422702349815,0.701255689325034,0.8307054294810566,0.2697092442515697,1.5126963667452065,1.3159163008948764,0.8881547661497028,0.6966437064852495,0.8374885348635942,0.7235035533837004,0.1806117111591107,1.3691584721719796,0.8440872019997232,1.2272612587650422,0.4879173100828329,0.6772962625040371,1.1722333856007556,0.8276992506632592,0.8488979604528311,0.820087631777804,1.1221112891656915,1.413417313986696,0.8678054258229988,0.8184284893784097,0.9215839491389284,1.3020532177762933,0.522055178615233,0.7615091714863523,0.344543159311006,0.3093857380775279,1.4541021225884665,0.8614542812277779,0.8363220263380587,0.0027403122441559034,0.8515102004890207,0.697560893077817,0.5286023305402914,0.6506115582260341,0.5582816249220877,0.9249627271477529,0.8962340071965891,1.2434069419035974,1.295479178650234,1.5211351766275525,1.0574297563392974,1.1715875216047538,0.7966076230093203,0.6616532075740169,0.7196548104305235,0.159004118628667,0.7690246530661309,0.7951672768193537,0.09786358845772992,1.3149931652205278,1.3733600170188567,1.3933377780416005,1.2116612445500272,0.2202218622056252,0.5804902672778445,1.4217373068012586,0.7392534119773665,1.019610269556404,0.5797952318055639,1.1209749616339701,0.8761860899030429,0.566403801679105,1.4745446532497888,0.5285885620203159,1.0404840642612287,0.18519005056602317,1.083241406502733,0.3484845119738136,0.7198412302475564,0.7332867998654315,0.5675420737698907,0.6524586881323371,0.9558585069893555,0.040997963864794394,1.4707393355617724,0.23541346270112504,0.020033163945802467,1.4073101622657795,0.06683956161598213,0.5242962712190663,1.4989632362456058,0.6707216232299031,1.1239293986355414,1.0615063840526593,0.4760373411279606,1.019439601114889,1.1250845112532502,1.5027511611883293,0.29821785210082574,0.5335437947148014,0.7083442948747649,1.3271396880297568,1.2396314742348638,1.3371137212359745,0.07631337083109173,0.685638539369375,0.08915537332445585,0.9420885817261501,0.9633901553853715,0.7170402948868171,0.4374087483083495,1.1231019435329368,0.19006165267674704,1.565587469278539,0.7931790271611247,0.9505167724325124,0.7475792540069071,0.35926991928582686,0.8058091895896605,0.6276405251586508,0.819207972573658,1.1868903292755995,0.39677016856901715,0.5715594928469676,0.7610220991541249,1.390899668827492,1.0543324554652531,1.3238217298057993,1.3971042451993976,0.05678339055752827,0.7917165182624308,1.139749436734828,1.4084610990823443,1.5077441685607444,0.893241626686213,1.3284795108620768,0.9270214427145549,1.201925766474619,0.32949832396410816,0.5676886270611892,0.7355051288756245,0.8910296068565482,1.2702081377110135,0.6218691662971141,0.5661166329264495,1.5300019458946268,1.210908407615806,0.6882649713386702,1.3420608655358137,0.9674556192423699,0.6772885556787791,1.2420795459101888,0.40593134016842974,0.582689149018029,0.7797779107096225,1.2012825477167373,0.5342296654213574,0.7964298797914298,1.4470915232545773,1.2493476559207428,0.9588957328922896,0.8968690554882146,0.7053199697375883,1.3347437539129527,0.7847655647639215,1.248423162554759,1.1109206487549728,0.20695421772341055,1.0351010695626133,0.1544353466633174,0.302714627601999,0.4805478293280723,0.8198342110329585,0.2332030934137674,0.8922056289659175,0.18205294822860985,1.4722041359000748,0.4421963666566914,0.9891297586139859,0.6306510236384333,0.6751060506973793,1.2594835040052774,0.5816199171109173,0.9332958864888317,0.17925665165096638,0.8838628227552826,1.2524642844578444,0.9572844671593247,0.8753621167444777,1.1795495856404632,0.26815809180543415,1.170257285200659,1.2726348739188742,0.8634772218763647,0.8873598662984654,0.5128042759117946,0.49708234763043213,0.8753078798172609,0.33285658922800454,1.4366725599749322,0.44442261643241077,0.29255325648777253,0.7650939688603562,0.74997949404753,0.7180348197693561,0.847504630930407,0.4153311478560681,0.7872177864201021,0.6448545161762478,0.5891209421660446,0.527707279380491,0.7840517710638875,0.118464475674882,0.8795751193620566,0.919043693886519,1.5137836322125153,0.7933567229560151,0.38478106479659296,0.9241047241868537,1.562170618627839,0.5096182106512687,1.3821632415166207,0.7868981588473308,0.9090773531373013,0.8424639027107073,0.6532512974026081,0.4080120321527978,0.993307763945322,0.7456371558685633,0.11802949259730612,0.11849036145193567,0.11299478104093748,0.08183377630496379,1.4395619034057094,0.4493234974974862,0.20562131165031908,0.9178296518215492,0.7504111722945797,0.9447865900852227,0.3655233283556484,0.19429073247436424,0.028064471590900347,0.9669971952012383,0.047498730361397457,0.9092317161425132,0.11940883066456011,1.335480566114608,0.7432889051015513,0.8004601145260984,0.14311363240508224,1.53683044819665,0.8054937329868637,0.26778517995523404,0.6566587325742579,1.058460027655502,0.8106330129275069,0.6912978524980982,0.8099063396588368,0.15514737708030574,0.3966115666128793,0.39654064606218997,0.15958531005283833,0.4945820393089361,0.7100722845533598,1.313946809074305,1.5062471521316296,0.5152175018933884,1.1715343032865908,0.8497205812570747,0.9700509155496865,0.4291334230417043,1.0379577499949237,0.1486501296365248,0.8274161046997575,0.36239558497249164,0.5876220132072213,1.4330681125700981,0.1952451873613751,1.497782182740967,1.505425128634561,1.5035289546546429,1.0938556937768924,0.6338967143584738,0.25374313387578445,1.3338674911479116,1.2932947551423402,1.2189427939838966,1.563131390484714,0.665928919962944,0.6814702918767652,0.43438777425760006,0.4615758734445966,0.4256585829327361,0.5533028973367262,0.8036944200511146,1.0253542184620112,1.2254778512986535,1.2686276120191058,0.9044433072869896,1.2389451389429276,1.4933502633102813,1.2028669533521854,0.8116848447581632,1.35003653675724,0.06744465813638016,0.6556516461965067,0.5860665578932021,1.1212862337668883,0.07416691298765864,0.2743462928975009,1.075168033650131,1.5525892160158004,1.3615953954200903,0.8499390334155291,1.2537424600801057,1.521755264938598,0.16032295006954853,0.9605553413392385,0.5654453960259188,0.7963298092825529,0.4914381444851217,0.16813337961987074,0.8816099306958513,1.1040997009080746,1.2407727943683375,1.2762756913222677,0.8080581355070607,1.3113166359225472,1.457451287490429,1.4036753808127136,1.0925174824223152,0.8829981951902296,1.1371780077690474,1.3240587504574346,0.35492819888385985,1.3207225196051302,0.8416363248930829,0.8397833063071158,0.9673322301587266,0.24582178908777116,0.006191396989434981,1.2918668412548677,1.0091424685617183,0.7978450043866787,0.6516603911636403,1.4559416053821588,0.9454813590420705,0.42416947800873817,0.9051673347466188,0.007201433462440631,1.3068771448631018,0.3755952653620315,0.773185588769815,1.280462726235002,0.6672234496537116,0.8886997101525744,0.8005883227295015,1.1475384722899513,1.2108851219027998,1.3520517291708414,0.6717139333981788,0.3273286388294415,0.4258546106663646,1.4818256151103393,0.9659602339662502,1.0490716428208064,1.110196053026452,1.1412207737016455,1.2126692125177083,0.72547062984806,0.6311904639307455,1.0413264245782665,0.8424348582799297,0.9838817110187121,1.2462501198490958,0.17037440851870136,1.5229297520244796,1.2103775349783221,1.165733196545087,0.5658661337351297,0.0609495745581411,0.6576860126796784,0.4384145874182134,1.0321590208137894,0.5491079385980544,0.544011570216037,0.09172303363358679,0.7092311092837161,1.09034973227089,0.37719368595208513,1.4958039497499633,0.7797111345584155,0.00024322844674148282,0.9063082169651223,0.904239568103157,0.9366954780079587,1.3744454797202008,1.3108844578921814,0.5329232216098356,1.3221301457709675,1.3086581979517573,1.2664188394667126,0.04719086543811867,0.6843897674533481,0.5164000913497893,0.35764980503915345,1.18898518596523,1.1602084292853836,1.248933891965136,0.7481468122331879,0.6699577567414825,0.457934672844841,0.8424004514179286,0.6425373785064588,0.8644526526752984,1.5600092078769148,1.1981406154101146,0.10925245267723978,0.5598276072384047,0.539317359357892,0.4244668671596133,0.9286884306078024,1.0772207385993076,0.8142659533981287,0.6339396585722062,0.7922437291550456,0.7910307119416538,1.159358001087181,0.5387570317471444,1.0157534749177732,0.42530978359774524,0.07056106525499438,1.1338157664500939,0.6492137817912503,0.5359371444585254,1.278433345836595,0.19671840524880338,0.7829475424721477,0.8748390287859933,0.18169870922799633,0.8832422100706927,0.7230044408343335,1.0545025500733636,0.2818435918481801,0.8578017232469928,0.3506557802112025,1.4225869107330142,0.3102974500768089,0.7278976053042876,0.3351674203649039,1.246413326671784,0.7697472939614605,1.49751988114503,0.6386039470718936,1.3727675605695178,1.1164375054964069,0.7510895632031154,0.2811021506187069,1.0289481299156746,0.9810297828828416,0.44983522926292235,1.5033047190937658,1.3076814962617607,0.1130755788125869,0.8998617443489703,0.45712017073484473,0.43686164885077094,0.7291888986718735,0.8005176184878089,0.916105034415193,0.7932738385350336,1.0942945572845761,0.2699010764300374,1.2778643881822216,1.0977422044380631,0.8923541111112111,1.22715764543854,1.254178286113167,0.8326334001917547,1.1951608891207606,0.8309491023287933,1.19276929687125,0.36855419593363287,1.3435783915438302,0.08252979294257921,0.6808147160059135,0.5068392913887557,0.7281137811581994,0.39782177538467584,1.2628053272826747,0.5380279888496441,0.38763194594958317,0.05378113937843095,1.5449172095678534,1.4582251955420598,1.3418610410554885,0.8640872538370188,0.9885761984393804,0.695955239421522,0.44535012586715406,0.3293512588899027,0.30663960907215493,0.6083979876694641,1.039958031473512,0.8406161675493368,0.5475530063452508,0.9236543772538878,0.7721756828735877,0.721744672937085,1.1820451285374416,0.43260842232479635,0.598649367863829,0.799881608504941,0.8632612500382675,0.6935685104569214,1.0227450715766144,1.1972965082833724,0.5230816508646231,1.0806615947009681,0.8043641126830392,0.6273991295349087,0.4546449754831326,1.2258349769974886,0.04431416101310904,0.8601577246036161,1.0780646811291492,1.0119767562994786,0.25801318706252413,1.1273014491286961,1.4778461886019156,0.746907522912427,0.7260963936355019,0.8032900847585857,0.7062755852236468,0.302017714502881,1.1411964245417872,1.4052600422080308,0.7728019963333529,0.31688581194586307,0.5618113693229367,0.950157852158387,0.9141891408838422,0.18894964578438453,0.36196909659533494,0.725382095233547,1.311646332730888,1.1903828596307329,1.333392825350119,1.3757350994011524,0.9872561283673295,1.0764159826914101,1.4866566536990966,1.1214481165978816,1.3845050699271666,0.8852136958401984,0.4786394393413423,0.46048314506750126,0.8808701121389998,0.7462874044920014,0.9622404973099101,0.06503621855954322,0.9574262888176095,0.879209974425377,0.5376299867433832,0.4833285310295914,0.9076997013880879,0.4426215937718997,0.21442051088317063,0.9293093560412199,0.1463122992354752,1.0321294788628144,0.054988635495226056,1.1322508746021238,0.48873632613224266,0.02706097755603401,0.7684056318180832,0.7248787547105716,0.10558048165867319,0.6325582618130862,1.4135991105802965,0.5933717476719498,1.1337902850637072,0.26062488344000395,0.7105580848498363,0.918125105995652,0.03413077777532058,0.6478019984192137,0.5172509191125159,1.2937640212019987,0.21617019339966154,0.9574413676433798,0.8588712580107137,1.5137384637011242,0.6928106080401564,0.40210619278141463,1.216095615143427,1.2446229162523443,0.24829891440247723,0.6556648239943371,0.3559761476452302,0.9560355300119405,0.7636085022040241,0.3053605798188905,1.1191277371356398,0.6604661217894342,1.295814903117402,0.40352172362774263,1.072180706056465,1.210788350667407,1.0659637788559402,0.9663466946275595,0.7314429552063426,0.8144488566031309,0.7915099461601806,0.3297131479230842,0.8485067648342195,0.22756238309890778,0.4643815300140272,0.5685966021033624,0.42882146154785483,0.5864315814175973,0.6995359608469294,0.3950331650581599,1.46344463735225,0.8001981641296206,1.1952948606582077,0.7128282081450944,1.531983961634729,0.4785932247326192,0.7992518589521739,1.5370466752710277,0.9600922186939206,0.6099071099274647,1.4157572241101055,0.5876126614695976,0.8381210593167981,0.6340122033864541,0.7540643058571777,0.7581490068021071,1.0054454000720954,0.9056142471878642,0.47635466421962125,1.3976202231771513,0.5435222623635351,0.7050152120508796,1.0720623377127219,0.5561427645035731,1.4515397344905776,0.3763908342557198,1.4251693133631853,0.48317318672950366,0.9012640751006886,0.8424681466763781,0.2304201616599516,0.46579023584087065,1.30594536562765,0.7867489812434145,1.458128398971754,0.293907100612002,0.4685940193316475,0.6223197949268805,1.0805645989657522,1.5056297619450008,1.1898093580886162,0.2656116353879603,0.061239844438894325,0.03715957558378805,1.1070307482179615,0.6687233739418718,1.141947614063809,0.7712245789274901,0.8622848617987248,1.29724153761972,1.4971116839614238,0.943665013932531,1.2761305439684951,0.40363391013011957,1.2246459979748638,0.8685352780125647,0.0056956675023180055,0.7065585793156539,1.1066627936902063,0.6788916538332082,0.4710358265030643,1.4769106611969804,0.42166918122989794,0.6752087455218038,0.3257754623742851,0.6846826370645696,0.9730922321813685,0.04482994647740754,0.8090595426295357,0.9777939014081337,0.802672582590248,1.353125058505558,0.7497904009476264,0.686185680546558,1.1432867011251624,0.7675658994221494,1.4041701111417326,0.735812682489791,1.2135492545346067,0.15673392913606815,0.6532883479364202,1.087158014871945,0.18474427771761337,0.465929958358489,1.2250436112875005,1.0993343059981826,0.9812475940276253,1.504931084639457,0.4299762861935995,0.8562488987179766,1.1385554355484793,1.128951203877202,1.2870275320066284,0.6026756598636167,0.6356876097193546,0.059349833078840966,0.7222173126080225,0.7202230590958887,0.3615697216444307,0.5913669783303005,0.13833911010412872,0.4075674554135888,0.19837759436454858,0.47736023003575434,1.2416951815164992,0.9865040230784361,0.8529923439688708,1.303897601098422,1.3909370255307902,1.5243515639624663,0.9986776493383477,0.9262857562377097,1.1514867779410611,0.5534625396837659,0.5232008733567601,1.4808277680093611,0.19042288619609402,1.0092384065239346,1.5681295433457725,1.146779542710577,0.2750172911316051,1.242410499461079,0.8990756445425216,0.028930807391990776,1.0368801171914996,0.5786225970849354,0.27798649611546344,1.356415699744164,0.480431432732161,0.9198310241001306,0.6323767286730291,1.075900332704276,0.7672883346875242,1.0147020702031304,0.17876529126138213,0.08328349935366607,1.4359752509412294,1.1825824021357705,0.9795497540090217,0.4076855573998305,0.2602393934857371,0.8855666197481191,0.7959159609807981,1.0146129569038786,1.1485165507856314,0.5175370815275993,0.868738335098206,0.8321034774715865,0.5815096785352553,1.2976262252572672,1.3442553938472652,0.08650338240109515,1.2369579895416063,1.0904602210395244,0.9610528111514249,0.046173160307767434,0.25578448401110493,0.8489771930407735,0.5491275677835089,0.7491710095105754,0.8022418806105202,0.9404372000051288,1.0782602915571486,0.5735843215684743,0.3532940606818847,0.3513633110599137,1.112232906259061,0.4898819620496603,0.8526363431523127,1.5287653642385495,0.6113755394816937,0.5620219368240491,1.0372595393610995,0.8892391916191575,0.12205707580917263,0.6231280115436157,1.4501182471235445,1.0314116922951055,0.8526440236183591,1.459537686181361,0.6390118169307384,0.6920230823322906,0.5527641463245626,0.5473949257010864,0.4257961698637364,1.2875233703037483,1.1980921329431826,0.637028641967951,0.5491810420574159,0.25938431778338095,1.21136705692299,1.538289469350779,0.868240043037402,0.32204952142369886,0.48563301740648956,0.5591221606482452,0.35468461520499556,1.0466580606267142,0.8355245666837653,0.7144563818842949,1.4476499524014317,0.8131817292705539,0.10197100500319521,0.31970622029375234,0.28490282191074284,1.2234932986679385,1.1938511848101445,0.5665839525521944,1.5075376568787535,0.943035353211626,0.6889770342455912,0.3253291999187776,0.9681192356923729,0.8762726924757044,1.0515062259431018,0.9743935555192885,0.28086909869030324,0.16979263664690808,0.6185193332763537,0.7846605093813093,0.805879089872651,1.1500463678609367,1.250971863889448,1.2729494850779548,0.8225781600023848,0.7153709960097038,0.47763120026369243,0.7259098088307094,0.24615562209344255,0.8479026207069351,0.4501953588123012,0.07626431429141661,1.2000961181458059,1.2705181165094355,1.157981445386084,1.531811849656415,1.3130234344049696,0.7041363965712799,0.09185909121998474,0.11435246436261057,0.8387584872287462,0.29496369849234905,0.7263438262476754,0.4570543532945189,0.7619127034440928,1.4943765693113575,1.1115605875012262,1.3681535581729596,0.42908136263141927,0.3451222766221556,0.9765455172888401,0.10591934474987365,0.23849966286269536,0.733952942242215,0.7576947405275464,1.4543882435437903,0.4595961481761154,0.8072009699973569,1.2207172655423646,0.8567826746632072,0.9934016952429197,0.2900804997481405,0.8080844459953015,1.278945389698722,0.0034851935145885976,0.633626251667154,0.6735864368205565,0.9130208537831483,0.8900291639749228,0.6078389855113775,0.38612331199218014,0.5027153444749546,0.24257585527851058,0.8581930811211006,0.986053412719978,0.7303420115805331,0.5103549137465927,0.47131184445044705,0.784435570360277,1.1766600030218577,1.3525602896242361,0.4383528536755673,1.0983718652773562,1.0698370195089701,0.8793946054513561,0.20879526288549335,0.03941351381479852,0.009790209262724957,0.7271748066016892,0.7902207083932467,0.7853154035535577,0.3412605020775598,1.3695361193208972,0.7164689844924373,0.9746133087297414,0.05827758962559103,0.6430352952252363,0.31111395385057916,0.5202074194855055,1.4082933096621606,0.6384665146209149,0.7568766013788515,0.5362315276229187,1.0261070815366387,1.2894198595460626,1.4636970513672798,0.31683629024723814,1.3271518723915958,0.017138572534474525,0.6072138991186704,0.8417987944688009,1.174022375328665,0.5630453459593457,1.5337537769878538,0.7178088051314434,1.3648462628230489,0.9888463664758671,0.6907232280488448,0.3758887451198905,0.85148272090698,0.1393302126786411,0.19905780282470292,0.7299462077450292,1.1003689178068186,1.004226442941863,1.030380234017888,0.9997892567569056,1.5688812255648656,1.3273188314430167,0.8984002686840326,1.3663193911128675,1.46772556675375,0.9012752571180053,1.3635606529033748,0.11470998388779019,1.1406096554098166,1.0079667109592494,0.7829403046603002,1.5187373442822691,0.5690436824849511,1.3103903558940142,0.31340839900488804,0.4336570071112679,0.6244195727071686,0.3563095411026704,1.0832538844864519,0.9263715500387484,0.8625492731109544,1.1723178629290996,0.7604475002951463,0.27342872851650746,0.7693355803832617,0.35749628919659726,1.3105710430311635,1.0543540861300702,0.6563325480301514,0.9477198825921015,0.7554528120321796,0.5971830158339513,0.6813215623114669,0.3670510704605834,0.5785350026401133,0.2563140249712732,0.6523785637727662,1.1938118328720986,0.7291106940048776,1.373755848971484,0.7071458919859543,0.5824112124266083,0.6756428838708852,1.3329600561793984,0.17489487720836233,0.15159088169567242,1.1103220212985558,1.2607116469555457,1.422790979336282,0.6622444462053774,1.3384852442971669,1.0880957501377058,0.24490718567872446,1.215838918213657,1.106584286472902,1.2972893090755573,0.02075920798769558,1.0517154410107024,0.9909227986445007,0.6390094241268355,1.4241789545725214,0.6472610957560148,0.36744963718141854,0.5469246120317208,0.21237634454673224,0.5633125185119354,0.8737208197843339,0.6783596265976372,0.24019387169863463,0.08970901116071704,0.959912301856187,0.8530862363193874,1.539292294474771,0.8012567005866688,0.34549872599884546,1.5179313468490476,1.404504084546994,0.8630588320326021,0.919056864175047,0.4972405171114639,1.2224666970212121,1.0809870236567052,1.1283666040387432,0.33943471215917126,1.389277418172616,0.20020410380038686,0.911077671220887,0.48428980922482473,0.6896018739195449,1.1669900124965755,1.0895075919418369,0.7492638765435616,1.0874933266873397,0.9653109109252231,0.9082719415205239,0.8419866666398863,0.5505565093104278,0.1531577005992586,0.16971533794960308,0.16912010725728507,0.8344413665548265,0.47717038277464663,0.609498907822805,1.0709951990536823,0.9812373789354523,0.21489530817694671,0.20173691878242264,0.6836061345872751,0.7488400141464507,0.5563886840412222,0.36601919990355203,1.56716762061525,1.382270046954898,0.15943684373963346,1.2760604428934248,0.8417881008333138,1.2509473143104177,1.2643324015113184,0.6096028021494566,0.2242128872660802,1.2403517960260397,0.4497771993455749,1.1237182296585353,1.375280196162458,0.5099078747954057,0.645944197964492,0.3886749859479742,0.7078511672653122,0.11165519370026064,1.211829685272762,1.1179800556776416,1.4054746020415587,0.5434277849392107,0.05159862461362245,0.1676042392410163,0.03749588316902697,0.5499870418829821,0.3537203647195142,0.20914435569900303,1.1671539360555672,0.4985319812974478,0.6980397378584745,0.723385771615368,0.09061353406260222,1.1080508825039415,1.2693885875734872,1.0223355960194656,1.2121041044763987,1.5687892191981059,0.21399781135995205,1.38984374087388,1.1344548507898988,0.9817825390522982,0.02671541455176422,0.37247376142960004,1.188282305295356,0.7440747505868905,0.3063032498230379,1.3930383728488076,0.798803180272308,0.9044679338987724,0.7862081936518134,0.11363667247519005,0.6750566641727864,0.7567981631650001,1.3471668045278797,0.48597602525400674,0.8303676435957199,0.8490926937563732,0.6788991100710243,0.5477845208368968,1.0560167762879413,1.0339083301335603,1.5561394844970449,1.364516715464142,1.4667868749986748,0.6047881874782508,0.6288929935987992,0.30614687775593014,0.04259708828279874,0.6813610807782344,0.6250491911235017,0.8480195429670714,1.2674515417014138,1.398025922568174,1.293620390976973,0.22687159493574416,1.2515437056434338,0.9895623817066052,0.48806427664392965,0.8485262619100663,0.5068935990852398,0.14384412108081557,0.7099315264218353,0.11529588497541958,0.5491455729506617,1.215171173921318,0.7972777787297491,0.04028771106496149,0.5655442783458882,0.8224389197720465,0.13404989153678915,1.155993261410102,1.079048385531447,0.6747082841044783,0.7986407150507241,0.30425223137294455,0.7914095299086825,0.8563651260066235,0.6414108432915876,1.0974679169854407,0.7656125938597018,0.09032256322687339,0.7057627043240181,0.3705504451122152,1.365518767522791,0.47317443315726077,1.202810545426554,1.1922162200544248,0.860864972368741,0.8791306316812042,0.6790719822548954,0.06782817912577882,1.4668843314637772,1.14648245338877,0.3274088577838798,1.411522840576318,1.290091843978917,0.8308690857047372,0.8570391391078173,0.8921818619585885,0.07968225194512167,0.12465540154243117,0.12238614909041612,0.7293666540395629,0.3601982697699408,0.1321279547496754,0.8750802268555596,1.2165554946524242,0.497227717838167,0.37609164181310883,0.8381143922435456,0.7459466300892467,0.06377981061432121,0.7180519200312852,0.8293553283266705,0.23981939516267142,0.7395286609859812,0.8356594304816914,0.9292735508029023,1.3883531622916794,0.6908061002496753,0.0510151352971244,0.4564100735528857,0.7999017697023217,0.30629657867878146,0.1932361341631736,0.2549849686820845,0.4781104165695893,1.4598774694501326,0.6720559642245564,0.4501844606668552,0.24389816193511854,1.4692353001279232,1.0839329442459567,0.5701180366183316,1.0881659235079884,0.8603318537400187,1.459948148174348,0.8793308557477931,0.1879811948313154,0.7453266705213205,0.8997642432947478,0.9525564034445021,0.3066174899792257,0.7700512564508984,0.6263886925838389,1.3617105793151763,0.3077093006123491,0.8949490185578735,0.15562262870721225,0.29051997527956586,0.9547443204699294,0.1875088066778609,1.208213171856428,1.013871720383585,1.4771031808051376,1.0191519860060865,0.4264564253557893,0.18004017553714163,1.0873723706627532,0.9169991705343645,0.3323774516695763,1.3472349051690986,0.43448193456127643,0.8724358269114524,1.4922940619910188,0.28352089851515005,0.5206530733222406,0.9828733214271769,0.8531193850425676,1.3262860274247839,0.9539681889986669,0.3550592960443452,0.7760867757867228,0.2767084891989286,0.7486595019029552,0.7960357594348249,0.9681871240974464,0.6769398727611906,0.5665330158072159,1.1478565457023833,0.28152731736716874,1.4577920733534349,1.065274661617495,0.7477279831960348,1.0996343735277554,0.03308132831162756,0.3098763469356952,0.1275017212348449,0.8712367948837351,0.8371105355761538,0.6180677369654012,0.81752160813805,1.0651254358439133,0.41176432107097694,0.9066137579297767,0.8979371776019922,0.00568979791134007,0.506259706112098,1.1143642071476625,1.2252650040399526,0.5945561960805308,0.7931094221469028,0.12147083787143052,0.16534451549613305,0.015996417831272165,0.8755840095771389,1.5261946513948192,1.1894889063541267,1.0890513233749448,1.1091035505268696,1.255350859865583,1.365637581994856,0.07340325133744205,1.4597121665286605,0.8417436318965629,0.5573102280936474,1.1755069884840983,0.8498667259734562,0.5351114330527136,1.1165411458133039,0.6615664868084548,0.6043081087671729,0.06489753804835006,0.5334566448419764,0.4071961959898275,0.2102593914429505,0.7240663865099345,1.209846239128463,1.2062582286275756,1.199011317142471,1.3877952669214355,1.4125309019624217,0.4378381387627469,0.8130748126892952,1.1309625974734123,1.204763217811051,0.8045929609954545,1.267946478302835,0.41906847603383224,0.5110606909424534,0.7884151100993094,1.4980942366147447,1.042143128546045,0.40079541080519665,0.36918855648572757,1.4594728779719282,1.5419737569559444,1.0587967396619529,1.1172694875817786,0.7451492673470157,0.6443504349626406,0.4634929567185983,0.10008021626137739,0.6172831960215728,0.4126001222389071,0.3123538059443592,0.6819776297097264,0.06214598405236278,0.2666695282540894,0.8526311351532739,1.2812769528242338,1.1025727165124453,0.7672867057126596,0.8825241994441033,1.1799852545323235,0.937652298327763,1.559666396037732,0.7039326755108081,1.3762107400815125,0.3793781866444506,1.2257330520046144,0.8496730501192433,0.2301064384465499,1.502783363512885,0.39785711069806223,1.2172611386920906,0.8366987337985503,0.4880675934273743,1.0723147918456026,0.9348692324290309,1.359005917574194,0.4227003258605154,0.35919076547789336,0.27089832655016677,1.0558100199406675,0.48193335517847513,0.4666816818687677,1.2066263598412568,0.9881045214032302,0.6285703645546936,0.06611024088658074,0.27897185070502245,0.7341490471871499,1.3634529117993914,0.03380964477104733,0.6385263008020852,0.2035082450633368,0.5322596851324581,1.0289766610705897,1.2636766562412483,0.8556761670378954,0.5666270962456156,0.8246746842801801,0.8598861774285929,0.8795206312209807,0.47102486331129506,1.0365333154570295,1.2051980841497798,0.8057310504861875,0.12057407523391261,0.6732657974757739,1.2668405497506745,0.026458746782578434,0.06545118093668356,0.7530582382737854,1.2885424253568294,0.5165172030109996,1.3087013953420554,0.32200395853337094,0.4790893419178604,1.1748576543244211,1.5484987330138353,0.26878814248489835,0.27966110095516455,0.808248320318151,0.8250335363515723,0.11812151299341639,0.7910830959988051,0.5618247822705363,0.1816265968822621,0.9707061122843386,0.7355147845723634,1.3310046222772478,0.37930178523189156,0.7482289147864659,0.5446234894113587,1.1855360555365224,1.2843254386564285,0.2947038322497674,0.8150642755896176,0.8552233161039673,1.0788161235105682,0.9444909861279908,0.49236778595776964,0.7293449712573781,0.9927428689259666,0.8480259473899063,1.4362767585745733,0.3719628414997072,0.3100654824107044,0.6465251039908451,0.19936579369209914,0.41966953251316025,0.5623185146729404,1.3151832615449788,0.24506797216793205,0.44752737497073836,0.11541310817521581,1.386493880663763,1.3529731242819294,0.8279513570964804,0.44913370309086975,0.6539016484353979,0.23014961836915182,0.7609143822157983,0.6568407829086553,0.519737077223836,0.49615063302602086,0.7490303062064523,0.7103061679625221,0.9867061516340927,1.0615327173428277,1.1581740625538113,1.199892086846819,1.0545246216010815,1.510828087770905,0.3756352931284347,0.44903763379755557,0.16184056074881606,1.0292760101925167,1.382379636792014,0.18023235539898455,1.0019475666722581,0.38319218357958806,0.9629062847971757,1.4666094822746136,0.7726055444279031,1.0009047313579116,0.8823768222245909,0.20678450113717584,1.2697733401227616,0.9524434109970716,0.14635267933792634,0.2776724555665236,0.8553511149963464,1.1628140221583152,0.8291585560955468,0.07645274582584584,1.1175237149442796,0.9165119513800175,1.257573182266364,0.6905420424686992,0.3811235477235109,0.6569816272027931,0.09978374135098628,0.1609682039372338,0.8133175773207838,0.07237674483245789,0.714047339272695,0.2862446146858454,0.9726419900553369,0.5524334519000561,1.2593327659394342,1.4155886347422044,0.08466900394286482,0.9588470032518348,0.7324786068376259,0.7976441508424202,0.13756399386846574,0.6484045427231501,1.174321844485229,1.1279010739444102,0.06971206264051161,1.2302660668327825,0.9228167299903669,0.6117300777235654,0.7934548456367443,0.7743575195440059,1.0093265842204817,0.5500457419849097,1.461392739973888,0.19160599133897344,0.012061862453164311,0.7435233692794861,1.1874358659780913,0.44128997241735624,1.555728669733115,0.5216926466628103,0.7941380897666204,0.04720342201430758,0.08091666494905689,0.5820171623313346,0.1345597278219334,1.059747897157424,1.365638150983331,0.8087749199062535,1.146759838832461,0.2757845476900342,0.4627818247823148,0.5083272376440491,0.7976518515013038,0.643155985030204,1.564759986523943,0.17379088256308886,0.07992666519867084,0.2847335849640027,1.1578854246016002,0.8535067354477525,1.1063371075067614,1.0402053536497133,0.3565775767434411,1.0601467081553215,1.1432690589964185,0.7485584593491608,0.6634160182313731,1.4260770452262181,0.20240830871318072,1.4320017817362982,1.5539691407208944,1.2491067661470499,1.5705105946601154,0.8300421100342552,0.673876162369264,0.5715464196645359,0.7579935907587741,0.17450018258164762,1.3954270345652158,1.0596134409041027,0.7453620079259973,1.1946070349934883,0.5560033558355906,0.6195589038793081,0.14010936212091185,0.8447343614428556,0.23146954213984883,0.8223585392442064,1.307442159366388,0.6083890502514512,1.218586960702671,0.5084539394042004,1.328339042766453,0.6119541477098741,1.2920757150478972,0.766443916685909,0.23247894055267093,0.13089828594192715,0.9597097573665542,0.6283052638218122,1.2382214431023026,0.3644327386516166,0.09394625784387325,0.47587618282792143,1.398869469657806,0.6704838340294453,0.6399665386937361,1.1294465671556762,1.0334868486459312,1.56536708504316,1.1694222024165168,0.14512857279035535,0.011337886069080856,0.9312984213030222,0.4693294675374493,0.6023741161297524,0.1604233922152071,0.7325405031034379,0.6223195446584222,1.4075729631640566,0.44169581671404373,1.0702523271042772,0.8876199365331539,1.4945720474974884,0.7295047711677906,0.001514720920851006,1.2201188700960905,0.35662253632606034,0.12300413069951903,0.029171006587482874,1.2553999097258328,0.30380115050987605,0.38729566365082435,1.2738562734669023,0.985623385542279,0.8622402289762626,0.2679003349876733,1.1893418029435385,1.400961438998673,0.8908771435970135,0.1422481176175406,0.4845521300445831,0.032175224346895674,0.6337570660836507,0.5763853869672486,0.9760322325351273,0.44111325037719973,0.17796604945304267,0.7668672602966518,0.7393602598649224,0.2515232160042677,0.7235795575358964,1.0736951764852898,1.1380942873892559,0.48182211588375995,0.3418327968052135,1.4156825723535327,0.7474762289324673,0.9192331213324694,0.13093046423309654,0.8615078231461053,0.23769970735296464,0.828423296958816,1.378029123953021,0.8175796491111075,0.4572062458975963,1.1258228739475638,1.0033063602236256,0.7382319825418525,1.1980528539436082,1.3445038336605017,0.7070314791318301,0.8415080369543824,0.2968102330693385,0.7314778493521805,1.2777706610268595,0.5463185973618865,0.8393609784516429,0.892745794576843,0.6843703991057134,0.8343106580691115,0.7683096111583808,0.9068675305238487,1.179152874303516,1.3602213174132949,0.7561123293674062,1.06957276208572,0.8514463477747728,1.246906588345407,1.2279235496369127,0.933308093410573,0.6503090502656188,1.018420266492158,1.2228526821256753,0.9289058783506257,0.31374113805732623,0.8023148140621524,0.27400865711010547,0.6887906034280887,1.2693785991708835,0.586012302512214,1.0434926210672175,1.117660258980771,1.4083916522634905,0.11288783583672624,1.200475227051141,1.0680886122181512,0.38751080219105616,1.4298762250479724,0.763356064857231,0.16475644425072353,1.0851142133272176,0.32599498055792986,0.8413108503054667,0.3345550853232159,0.8743346455207129,1.1279648763060457,0.8890835500325049,0.5496924583131381,0.8064196724993192,1.3017823868344136,0.2961634408109887,1.0259022293318516,0.6958112806818973,0.8676187861491088,0.9077840994757508,0.5507718487663157,1.2621211624153417,0.18453138566799032,0.5959403753761856,1.350121272874454,1.2157149425135347,1.5537925018799694,1.4998079710200596,0.519618588576857,0.42876121236529263,0.7210641308977032,1.5092958026852945,0.05882138895605374,0.2240835302877113,1.1721243916231052,0.37044454654931686,0.37551204119707354,0.7958974489708279,0.6284177451463426,0.8041728417499079,1.2550967429123843,0.8733574070986352,0.7302205984194307,0.9845470790955327,0.48721676798221725,0.8845872854361733,1.103652484600731,1.340767445445341,1.3415247146832068,1.0017703449524689,1.3526734827231803,0.7605941086392485,0.8375184591362929,1.3150779209587329,0.5453601872740548,0.33405798027274347,1.4888501941197627,1.3730243133404516,0.810306725407225,0.5475276013291329,1.1134993906372104,0.7621055388701135,0.8610145963391856,0.28395282115829434,0.46261998142794103,0.5145119656300635,0.9848671458904494,0.7106855874806725,0.31806029704061245,1.1811663632583604,1.2010255475478406,0.03950490625400084,0.6310253991823316,1.5689435763316275,1.2492253034500977,0.3684184750243265,0.7920305570120038,0.7287192545205156,0.5733761590831485,0.6447047660395637,1.1975975758122137,1.5479227287647155,1.2256581902060428,1.4135849688268383,0.7761709810650174,1.5385313628877908,0.38064103425225093,1.1163314823357406,1.124473173252724,0.6309597302681876,0.16616786154373275,0.9249107192547785,0.7222179639160702,0.7547741375332788,0.7087557084832381,0.7232261689642212,0.550574591119588,0.20439195792317755,0.6784543821376176,0.9095023833809064,0.5987089370886589,1.0116024247672364,1.0001484374971235,1.220267335838004,0.4832464922992719,1.0222234541730097,0.5896753746336767,1.0711145028086826,1.1585462688029942,1.1698595310755178,0.6468812320433404,0.5151845212244796,0.966234320202682,0.7783495094653152,0.3045344207253375,0.8464453401634086,1.0400093469756726,0.5075690127536784,0.07825090649418945,0.6028611031269826,1.3260218096836864,0.2609590404904771,0.9862420932903689,0.3022495224738675,1.473201836269819,1.1450871558417577,0.3034431414606724,1.0956455276174555,1.5017850851200476,0.7251714215675241,0.8995002273736394,0.5540189846962751,1.344472152722195,1.3996032626187418,1.0960915301374468,0.5862658249481991,0.3175855994112396,0.12967249171627904,1.0010343389689227,0.32905508327390376,0.2719497474338315,0.8273820934172041,1.124408228125667,1.1234570457329403,1.2208167073163048,0.9444109383701514,0.6080252895948404,0.7135157203607486,0.4479033498880009,1.4483634457055132,0.38837040138634066,0.22411023331948957,1.3480837672520036,0.7437437171618857,1.0284044878852707,1.1079468859617132,0.767681952157911,0.7183586226235328,1.1129178191093922,0.20811000492795056,1.3661972251410412,1.5604572796034282,0.6877029424483065,1.227683017416075,0.604216125483809,0.7203782490214554,0.8143489099713532,1.0808245815046642,0.6010664664224151,0.5137646939243168,0.33222762162164615,0.4213921086492009,1.409167535617172,0.4509805443309145,0.8580596650968371,0.02268430558112362,0.2000163510789156,0.7896189133084172,0.697918073702548,0.6306139215357468,0.6646812745277945,0.8200550387619632,0.9071964198409163,1.266671105568685,0.9825987445645368,0.22444678601828308,0.7956089723683532,1.076147418872151,0.6790435874428563,1.1492585743964168,1.094649380207774,0.8929291381926698,0.20544359728989547,0.33264641951565094,0.9185501987581027,0.8172462410580315,0.7414764651709262,0.5664952860752707,1.4972898352573465,0.883522430365381,0.11952123187849706,1.2907942662898946,1.1759110165578486,0.49384605237579077,0.7428959947934582,1.3350388068203582,1.3100326209474114,0.011236701692940217,0.5487932126425262,0.5489483886773369,0.5727517912345369,0.5592268164283782,0.4963651212320339,1.0847774760847482,1.265779599640934,1.3726845869251392,1.2971558474349894,1.3931479662549284,1.2038243027365534,1.2882085814651083,0.2406601167591237,1.1824144158454641,0.6432988456436131,0.26739299983201503,0.45511083406271075,1.4526024850748953,0.9446975626623352,0.5904456478122561,1.0384755553350336,0.3865742851036583,0.23849464454124353,0.935464241350339,0.7569990976243868,0.9617642690553658,0.9501752441087054,0.7809362782589202,1.0165794934935377,0.397106953306514,0.19270080068782477,0.2472095904012704,0.9249989099734001,0.5518830263272061,0.875517142021671,1.367615608212447,0.733166540854636,0.15134842669728624,0.08904546286437942,0.4742782613250474,1.358595989937384,1.4777228760932186,1.1914263300145476,0.7210759241268629,0.5954416801014947,1.4068772531677542,1.1921145046940005,0.9630518678016936,1.3675810751326725,0.6582516181220771,0.6173621106097493,0.9406772386368338,0.41981682919349855,1.2298944541235313,0.7217365402885106,1.508192772768152,0.15822204347056257,0.7663486375342975,0.23725585896044296,0.4691018313554692,0.7745896825910148,0.951069069800072,0.3894605994703169,1.1109790018018608,0.200469847298408,1.4901619090554001,0.015454759678993867,1.5389784970497509,1.416219583993744,0.8787886575229558,0.5213063577383941,0.5950209983421091,0.44777599720121186,0.3519152299067276,0.7862903508641478,1.1412514770815656,1.4524315164119794,0.5536858420396502,0.4404069385503097,1.1194135972045272,0.585976713143791,0.6138126726313367,1.2449323141463975,0.5343113874556942,0.22171209793407365,1.1019373542663597,0.9723984456710886,0.7595645909074,0.5747841390007701,0.672535428068938,0.9191428702682799,0.030195092447447478,1.067604657697507,0.6837495424926759,0.7075873877361877,1.4740647556472828,0.22083996309246592,0.3309197645286124,0.9276839314476686,0.07070340068205039,0.41721657684192964,1.5525744507505546,0.17250649120204928,0.7052116562191854,0.04783534179323633,1.559581471335116,0.35816392535148295,0.035726342016373404,1.4736686482167938,1.2759451227516707,1.0513366461456994,0.8317225146827458,1.3811909925678878,0.18978298856506656,1.1881040450738236,0.6210614809027959,0.824147859049808,0.874113222442591,0.27695216301800096,0.6338691314168693,0.47483527267496733,0.8062137053940609,1.4273865242359383,0.7295060270261122,0.8545377912634481,0.8818875521204042,0.368113881632489,1.071504483371274,1.3403249218863327,0.6355752924102523,0.7424088474235557,1.4305052591573233,1.1427749146593555,0.1244395575143852,0.9845227816805753,0.7769725261892054,1.090827261998535,0.8475798013387047,0.5793783338436563,0.14317289488926455,0.5790468362959995,1.414137679357151,0.4219703284488451,0.5765522485383423,0.021843051088298763,1.0742632865062038,1.3409185633770984,0.2655809041484875,0.7361871596614457,0.5696726533276953,1.3150960625888573,1.0161264816678766,0.7670082441625699,0.4352984088713494,1.5206880628423978,0.3043073867558167,1.4518533328216268,0.9013807239883854,1.1853495157007439,0.6853904930903696,0.8761287935251091,0.6302585219504555,0.366519214128498,0.5956334714165415,0.9852383372609288,0.6183734697227553,0.7731336033057685,0.7959029848932448,0.2591188667525528,0.7569167771858757,1.3864199810678135,0.28236559125869465,0.6959285086396488,0.7195266257693652,1.00011261905379,0.36791471446882557,0.7633895533370362,0.25508639331263283,0.170398906338954,0.5031969253324093,0.7946239654575371,0.7998987619930655,0.6038530893963086,0.5444655690507721,1.2830002324914098,0.8268555260758574,0.5783907875342845,1.2340384381782215,0.9500116285372022,0.8249970089737367,0.06933763536956203,0.07226741356926347,0.42699859091634906,1.220208054513542,0.7992333309258137,1.0163391631236567,1.2907645222961013,1.426177981647887,1.1445669194191475,0.8548024832151195,0.44076395652081046,1.403362562844218,0.5989716194201967,0.20469245003340933,0.8384893219802538,0.6125663497084476,1.2064455344319083,0.6088464777148748,0.653213853098469,0.25701037387613807,1.3445971706271658,1.2073974914230337,0.25486420587328174,0.24334968236895527,0.03738814003175611,0.6045899920535439,1.5469188367276137,1.1088600901222694,1.5621126051183258,0.5162531048034723,0.6784631904562477,0.5759969965139133,0.6556233833568351,0.8563393391969829,0.4490867574573212,0.43105858102378247,0.9719138489485369,0.500528176689624,0.5034545477294106,0.7490820346286177,1.383023168417745,0.8029530601246422,0.5921130492434927,0.686718953633516,0.2686710241860035,0.6639013626417555,1.0737343795101826,0.3951361568325004,0.33369131773038296,0.7743250623345493,0.604910045487495,0.7207566712518986,0.7039911448459628,0.6547404684292557,1.3685280558570727,0.4661025716200759,1.0652363899471533,1.3027442142352288,0.7817276405122683,0.6857952668581018,1.156200858801653,0.8601843879644843,1.264457849902922,1.3059725986668944,1.0644882750394746,0.7196726081835617,0.7268864519736876,0.8308429869093925,1.1226645529933934,1.346326107193369,0.5653173198722453,0.8313374978369928,1.5273054291595693,1.4158046795150414,0.8131122503361092,0.5203784647212314,0.7009872278598788,0.6552458902937508,0.8326054756473056,0.25878306495857534,0.6199057924785308,1.1603703239386063,0.7714636739748795,1.016035008582419,0.8530153124850666,0.7191133882124238,0.7576442543776846,0.968884441712572,0.8655336301608824,0.39629372714118416,0.2795096017981921,0.760469615424958,0.4971042985749062,0.8882293025119932,0.5010148662044076,1.2688246449988827,0.6731475786413508,0.2783222627862809,0.08719244073711062,0.7484971622530517,1.1131641351527093,1.5360305033219706,0.3928544535289995,0.7332486521651939,0.8560949919964288,1.202126290850913,0.2896120652963043,0.38603380479221366,1.5399083236212292,1.2379248157384004,1.4412899086159823,0.08761273046894875,0.511626065480097,0.23663174796473016,1.497665116710224,0.22912670626265566,1.1743082875221784,0.4727167702025021,1.2699794212665374,0.877072406034569,1.1433054515648737,1.362799551479783,0.7988402705091169,1.4576690097254483,0.5146056375616135,0.9185798061876124,0.09086941924353731,0.8749122861280398,0.5871957202841542,1.4914243462329408,0.8044960416927135,0.9542819672404681,0.6562962755397941,0.59318625303477,0.49713474836211446,0.7435834173149677,0.4751825248574053,0.7332840376160574,1.2719669690458328,0.11652343772474609,0.9790614731435264,0.6381333646120465,0.808057211810125,0.7384635449111451,0.3770708934462743,0.7797129307637471,1.0709722128730235,0.4451523134897605,0.43221464639618473,0.8664848228543581,0.832283622057367,0.6713350330434783,0.5479353638398939,1.5242328602273674,0.35900115846679687,0.4307416233702133,0.3272038527925182,0.7116827608476246,0.7843038298776758,0.16216292341937108,0.3058117826943631,0.40576289614579497,0.23643352072013035,1.0272371062256926,0.5594367244649671,0.9360456923636226,0.6094006278137586,0.7124735068737231,0.6300121691749129,0.7063657654284616,0.7791201630030723,0.531824097710661,1.5467650736069842,0.7609996885452442,0.446054904811547,0.8430944259650692,0.1716345916360991,1.0481252421034999,1.5316700727906802,1.3381740298972205,0.7482692733551282,0.9785659767605676,0.07609807191464799,0.29767690833756355,0.8168613764273284,0.7305791428474745,0.8976842010456679,1.4120098117096038,1.1082406818140695,0.7610270767595375,0.7412597820357729,1.2421045600882032,0.8533421581444258,0.5027114931591954,1.3385744478424706,1.245160412135577,1.2505570264181616,1.0812041119382845,0.20068217550332204,0.6155168942277454,0.8260230253177623,0.4826649142986247,0.018669664795885426,0.47761303242211806,0.19668612510547648,1.1972108950110232,1.2062557154096747,0.7440835079033659,1.1357994331468824,1.0327870138579338,0.6410396802152234,0.48466783932259744,0.8300848241700298,0.7963386265017894,0.19769347190985162,0.6508671203752681,0.8024445749436058,1.3380118804854617,0.9944228145727735,0.08296230040452814,0.9574905264498629,0.3000163552949363,1.2498389543076664,1.1645025035418555,0.5238313739550344,1.0007544712976932,0.4037276382374269,1.4649178387806507,0.18497920546416804,1.1388690128155206,0.6675097134027994,1.1588254710873214,0.2862085256038107,1.2563930351774582,0.48455792469767084,0.46060243695233477,1.541068729236315,1.2247213699371584,0.1843982937978882,1.5386169929758244,1.038774839502832,0.9793151761808073,0.9168897365785019,0.6091402005254254,1.294888611603465,0.8723468317113071,1.1819432894634083,1.0824665359671928,0.6480019368437506,1.3323569871285799,1.0107746630868795,1.0686349070150931,0.8384300624713986,0.8748393020105437,0.7309195326473799,0.8518630584079613,0.7807344456906817,1.2675114616333185,1.4186449714258713,1.1315327275073637,0.8201291601165258,1.1604271532801802,0.19214042192586642,1.0421090420102725,1.4616707036591048,0.8843869541954217,1.1938020389623296,0.8411254277055782,0.5721313531745507,0.02988095652294756,0.23451647453676744,1.2053637661948207,0.16268691465209878,1.1549591212593722,1.2324089012178285,0.05697561993747906,0.1525693662416886,1.0237804358876026,0.9765846427855478,0.4981463816066203,0.004150449987831435,0.31028883308195016,0.9167907037267553,0.5133327304016105,0.5429058235101106,0.8735466333522837,0.6998528672120272,0.7419019097312932,0.7675373896284509,1.0458952343495667,0.4173593562026421,0.23996607786350113,0.13212426486974863,1.401920282745884,1.3236196025163438,0.6147102439248573,1.2529479174141076,1.3814249473037061,0.8548934276929014,0.2897468354827131,1.299251246745596,0.27229720874568764,0.6851433363666488,0.40326534085196786,1.5024025130377712,1.2763769684365602,1.0664598130747394,0.043916442421542884,0.613038922356167,0.5471250060160586,0.492588186406911,1.4579689719742817,0.9484674792315456,1.4501643324968243,1.1281521791113005,0.2499867222907311,0.678572472378862,0.7172666473039268,0.585775670624353,0.06603383356860501,1.3517915969898708,0.24597310063424593,1.4868665125885425,0.3837960809355261,1.1973940291117395,0.977573095536445,1.0148681718396326,0.7068244823396113,0.4308681339016728,0.8953837685624534,0.8636312185436037,0.7066562105759564,1.274541802290809,0.11164987187293789,0.6396792793813764,1.0600882768305944,0.30026476985346634,0.9552006612849774,0.8833038342736232,1.1723610366381934,0.4288325722551304,1.1045396879057048,0.15227206423518036,1.141342161970809,0.6485390556835913,0.5303723673409745,0.9638650101666064,1.1985308640436472,0.02667182497128429,0.7457652016337505,0.2904076866120373,0.7936164210992295,0.06689314450170443,0.9428090449457927,0.5873368859255113,0.5639353676893298,0.6412808794886706,0.7083729642604568,0.5003154865414214,0.47828297800388747,0.2139752898031178,0.2070478825647642,1.4399584219744255,1.1385377786286144,1.4188842023179762,0.6752919820822494,0.25477522794425433,1.0871094660934169,0.7607863568286035,1.4219053807453548,0.058089914989975025,1.0155617916128499,0.8875081614755223,0.5474679461810555,1.4982562119879925,1.070257490788585,0.48730375067450327,0.9645322940794611,0.7353751433850725,0.2781456434642474,1.0902701844131786,0.5685680866831868,1.2070190330209634,0.09703831056381441,0.5749734416413872,0.8874962236076501,1.1742850741779285,1.2032357788906034,0.5355130831517396,0.5238160898573835,0.5897215666395541,1.4110976100929224,0.4992453173757381,0.5929312046205706,1.2491341942105838,1.2341251217484839,0.6520993141869909,0.7189647756246211,0.5779683192425872,0.7745652826313456,0.8957911768212535,0.4404498239299931,1.3421916456984677,0.8432034270478005,0.5949646277698634,0.4797067808288162,0.5142996156660052,0.6744086063613731,1.0282675110340007,0.9724961197842034,0.6914984343696216,1.0135830280821818,0.5100462967539752,1.134614123042554,1.0701431541305744,1.0116709203429866,0.96108021113566,1.3952551513990508,1.3000453933122904,1.1946522120035055,0.6583488420811017,1.504531842905175,0.713046522517521,0.8770940432540091,0.9246414410230225,0.9630854993528348,0.8092782881788706,0.7863236602317555,0.4180176701402852,1.3801409325156964,0.764895529743286,0.6804843318190325,0.6897355052086549,0.48772941346842963,1.0861559645463839,1.360131579473305,1.2456144685659534,0.687994195981818,0.05377881581909826,0.3963303653717692,1.0406166395238423,1.3056103219941366,0.02929532362085707,0.7817793688638643,0.3992850527055027,1.3510107474430926,0.5036081628673896,0.10582496526425561,0.9099043626942562,0.1525239837262792,0.09344233828165836,0.33116939090876335,0.9496226781467347,0.2388671601423618,0.6618658326205226,1.260687292197118,1.3714239923988316,1.3374842136929868,0.23731552945237933,0.6763743367792477,0.6596156517606387,0.1742695389095686,0.3065897633767032,0.034952747993481845,0.6964669551509445,1.242092952098626,0.2574371610457206,0.8048495089488159,0.810182644701928,0.8011419819513826,1.0318646189350509,1.3902186782066193,1.4538898493133043,1.3364182797620843,0.8268818453339162,0.6708079221065425,0.64713314469225,0.013790713127577039,0.2816013340443997,0.6589195617418435,0.4669257661509022,0.33901424786791123,0.596354563213756,0.6324539199956967,1.1328407179137376,0.8072033374852612,0.1770170648424592,0.6784495249937482,0.07124679870682932,0.21026204366474419,0.6916506749626579,0.5216977423911608,1.384725140541123,0.7858916156622107,1.1321799534232424,1.0647823134638317,0.009943901764759457,1.3836859592567718,0.72855915335693,0.1258008988345332,0.8825797482904904,0.40720855108591175,1.0063470829607866,0.577815650374664,0.5161786177021385,0.5148706003139015,1.1921200875294475,0.8838657468001261,1.4970088001720276,0.02545068791913502,0.35799354220562724,0.8165201102076307,0.5854590546599475,1.108034286426783,1.4721507786726789,0.9210927225609785,0.5164659641661645,0.589017319275422,0.3855615308271463,0.5662830590969656,0.0908067099630096,0.5704827795534251,0.08862723246305008,0.8226618399597624,1.2659502200572414,1.2196179888492082,0.39643180217360896,0.9876060848291766,1.2430345738194446,0.8429382949177278,0.5696848694013811,1.1221531476783855,0.7373288253774704,0.46654746459751695,0.1894986417422806,1.309314516349614,1.39129767179053,0.7177182568665729,0.4122344685586793,0.36549172525903695,1.0702589818237085,0.5115735627949515,1.366180059918966,1.0078239301976584,0.3973002179311331,1.1102398025669282,0.9488055499929535,0.5844579637910731,1.526662164432769,0.6637729358497692,0.4394066406949189,0.5577198994897685,0.5833829738573664,0.6706440995298034,0.1559320816757177,0.8250059725838922,0.9924873026154488,0.25403734414343826,0.02694359993818039,0.016934527340598624,1.124580911219477,0.7036300220373162,1.3589735094324915,0.2807181336424203,1.0768104410259973,1.344974786470027,1.1285751415218281,0.5119087939746148,1.1971993058398236,0.6709495968015424,1.4748074122816024,0.5834537124448514,1.081670834363842,0.6654790765751767,0.36252280060952247,1.1719959468682897,0.9320895405419817,0.0362311322539127,0.11296088809947855,0.11616126488340946,0.7987788107988404,0.6895904231887229,0.9011796407249427,0.012963057743059735,0.49306528206880484,0.7621965546928238,0.5828572305544018,1.115206587641674,1.2953193347164336,0.8724604568983976,0.339640122655235,0.7080013946403079,0.5654463623054773,1.349070128985736,0.7020297219682058,1.0521465832091335,0.7441170482380813,0.03077604179546453,0.3323510690421454,0.6656547052404898,0.2983429649137318,1.0654490772109804,0.4821490090706973,0.6083264407778273,1.3398469022760575,1.0632793745260953,0.3285470582656621,0.6496411007867331,0.9751638251899288,0.5907958637445385,0.668548552392339,0.1421234451765036,1.2100757797322905,0.7039802752448276,0.7492581182507796,0.3797775163902009,0.7957897501366674,0.612210997745668,0.9363026130207951,0.6559627512605033,0.6543861743109625,1.498538152641175,0.6520398689936642,0.8064665624891366,0.35623311210537706,0.32309843998202425,0.4912720481723584,0.9989746515580723,1.1390429965218267,0.7461251244393449,0.2057877357797652,0.20322416169908078,0.595108734241004,1.4393143624798683,0.5912270392826539,1.1478487226404173,1.3629607508374821,0.28188720073435186,1.044031433597948,0.8758077217101831,1.2699486165546259,0.43282860806509327,0.9052956238629288,1.070502711763452,0.7562711082213455,0.6012281797442605,0.637230037511825,0.9797777582365536,1.334271700144315,0.37808555739293903,0.15437538562578063,0.6287080250345028,0.21942888279026138,0.8630009075379089,0.6526074620591283,1.1119275241343525,0.03333414442131956,1.1353136963102142,1.474359027347568,0.49591840136603804,0.24160037158345404,1.1575223704727293,0.38498160324428976,0.6088808441482746,0.5523391263843341,0.5098786312322926,0.5577462751284323,1.011957753188034,1.1797591503760332,0.8954542709705752,0.7491582223767026,1.3869832624781377,0.3182637549162626,0.738286333168649,0.7813382833845974,1.149410745532152,1.4686364110404548,0.8147643988344556,1.2387785015873436,0.3686227153011656,0.17936834724352713,0.013890216147721023,0.822188488972021,1.2271683873364134,1.2384515815618218,0.7807541681082808,0.4032490022010001,1.5133179669066563,0.29971790258864506,0.8377178773523437,0.226976582078109,0.4291713707098878,0.09864886364937085,0.8619295746048692,1.4703192731077708,1.419098779231221,0.2700857686967169,0.5765874452200964,0.25314206389949023,0.7162409068181729,0.8540445267802982,0.6287777045686681,0.1794303741575067,0.17968344189294638,0.4555521837183547,0.7502597379569294,0.3966637138468935,0.5601671160845956,0.46703041760399033,1.262401954592656,0.5304550281073118,0.8861215495590168,0.5219436336637052,1.469227530954755,0.06444484077971338,0.8595554343041557,1.0194956859830113,1.2590468156281016,1.409693904616179,0.0028023576727389866,0.9220254040429332,1.1028279844563837,1.0800497824143496,0.5582100574710894,0.8936664349372099,0.8222322726514628,0.17476477637957855,0.8952459122704892,0.9016665871772882,0.9556504296582016,1.027629512728545,0.051786721510820644,0.7732851217778413,0.3107085702648063,0.9487699129523858,0.5482330024522606,1.106867253838927,0.6102031419115881,0.31739746542303937,0.0008258973298241021,0.6400378931490289,0.6019952581300618,0.2036338828301692,1.3946624638107095,0.05076325575806255,1.4930505504394256,1.1374840920189637,0.6581692325124162,0.698740345541147,0.8010946945539045,1.290624256947683,0.6939132716006157,0.6974389483931431,0.9416644906222166,1.2920629308856402,0.6988012099006817,0.9357471909940638,0.0781560766191576,0.17944337532428833,1.3918266864259168,0.3323023178007504,0.4458420415600931,0.9490985442612246,0.389440393055573,0.25316538127637306,1.3596783555442422,0.33601143229754526,1.253405936699584,0.886509427824057,1.0046681438279768,0.02541130337923048,1.0038043480403225,0.10507410247426106,1.4174180249658606,1.0828616003246148,0.6197751804366771,0.6933320706084771,1.2394130065350077,0.05814312052295476,0.5719959650169737,1.4645707888721526,0.8701608775759915,1.5637991959429378,0.9927215762108108,0.8691855177511241,0.7386750478905755,1.3579359712823935,1.2102418647798643,1.1074672626240056,1.4921507691174585,0.33710330456332643,0.6022478925909722,1.2795286940313022,1.364072778681271,0.719024930842905,1.048362151096558,0.8433786237335087,1.4597812432171797,0.23699670133869266,0.6895313406707125,0.5885582244610561,0.467365772169438,0.31168649797370634,0.6126730762813148,0.9622516743597429,0.45972752572300746,1.2483820022559615,0.335272149579734,0.559666401693334,0.307856817617415,1.0122619343022565,0.014833983636701704,0.3857730913159277,0.538817446823451,0.34973205377409444,0.1653493480700524,1.2355289112211119,0.31820463866672855,1.0125338219505275,1.38662016433456,0.03760069546725736,1.2169498029159218,0.45589994116305216,1.362238186013367,1.1021455655923071,0.9605324058688642,0.5152585450278249,0.42258601897072,1.0293677287984178,0.9022656974460386,1.3218560643879795,0.8958302883389191,0.9720274055543232,1.4161850184674123,0.7363607456554764,0.7991006407673285,1.0296933500561325,0.5471240360688908,1.120523516382053,0.01791027712110064,1.3857073914036664,0.8580552158160091,0.781994926258087,1.0536048560722142,1.5095764059580539,0.8826534357561668,1.4065703944446741,0.5511629567054683,0.37412267254590886,1.3735559347284212,0.4651115829074335,1.23751448435898,1.5161751054908719,0.8557325120918537,0.45678990657051577,1.300328818246594,0.8127532025177283,0.8114708446803305,0.43791192038480237,0.3088801403754055,1.5336833268572128,1.184633522000161,1.0368680100589727,1.5318371322464739,0.021698205258949912,0.7677825948174397,0.7074038312403926,0.8542074671185909,0.7747862632810526,0.8319165980571984,0.2568288244607207,0.7731477190539932,1.5020459954793162,0.4120523262245691,0.32864029613024653,0.4009867684856296,0.051836681574339266,0.7284709862109893,0.45538805850082786,0.47485331748623355,0.4808689503793606,0.31457393181045357,0.9130182712297079,1.55260282231643,0.4001046611278354,0.4937403136402416,0.6149374556409041,0.9109657768975602,0.36327923540524537,0.5950311723061568,0.06920986226878252,0.8228665809644493,1.1417849934480793,0.9230232077165806,0.6920793922129306,0.68705845831455,1.186316741592862,0.5733241637798343,0.32647121281339814,1.110756347419133,0.8799801015408864,1.0430473504210587,1.0686620809904048,0.9900943200681348,0.7787928784184882,1.1284998711762007,1.2749578334769613,0.38871464151846347,1.2376107871326898,0.8583967681433262,0.7082643865729957,1.1344022843795947,0.2698841100514662,1.099291736636334,1.2450429873989997,0.6061102970257185,1.2600852097669903,0.6967938947539829,1.5058078425365655,0.4368982041433868,1.044889523660181,1.1198665367005975,0.7153179916697702,0.3847500405568758,0.795028342109874,1.076835133474611,0.23237169125030022,1.4526377176684773,0.3628854443943943,0.4095014632109688,0.9803244417401258,0.7908695635796226,0.9788251695784566,0.8082602815083723,0.9045523415719263,0.5421486650508747,0.576839659912914,0.9874141145597036,0.9412494175989431,1.3171883671156537,0.025938038613338054,0.14752245996247126,0.8364035943844561,0.769072072615204,0.32594120608244637,0.0221035941462811,0.16394984780005803,0.4955152599882719,0.9451695878733148,0.4052421831779693,0.5489395173411297,1.0075168709615208,1.1550356320581725,0.24141498049446586,1.516054858918246,0.4975997624707117,0.7460799905512806,0.7986495367509976,1.481363343667343,0.7040289463629122,1.1137028281384624,1.1108566410581908,0.60027916967103,0.5915975038348581,0.7445542151681197,0.8739795647381615,0.7577279359421673,0.783899442087543,0.8840921194814421,0.5086487835609536,1.493155255676004,0.559198245772047,0.32755253873521545,0.9237210635625389,0.031828476958203886,1.1844245823405686,1.5315676435025094,0.7354668054229042,0.3152315923712403,0.9467293784149734,0.7154016611055022,0.9315401027206436,0.123018942698695,0.20317203184251287,0.8821617653188413,0.21072812827647466,0.8777940398831052,1.0766031059094547,1.0565171210489517,1.2580253921772733,0.8611610331694572,0.9489392733020302,1.5591490548149232,0.654677240158931,0.4285345024277735,0.9366286790967462,0.8344295091100628,0.0661319586396848,1.0469153594451286,0.21448596012450993,0.43571599870389494,0.7290497174380656,1.2713100526920416,0.7937100781009111,1.2912144964521213,1.513249587392514,0.5750457919822481,0.5650051425874243,0.18598052730943979,1.2955699621969625,0.4553485724671589,0.115435563606402,0.21146754284067137,0.28178276928404267,0.3278851299703453,0.37723491444890583,0.774855733727189,0.5249886229552468,0.8841570440488444,0.6647299472953538,0.47219667850834446,0.3645364983871395,0.3266082387614817,0.049607600155374056,0.805843976095341,0.9771665231200111,0.8524155524777192,1.0769131213402108,1.5217917360147328,0.6655219758987493,0.2459329217626237,0.9796384956181343,0.3844557065708278,0.9942739456332791,1.4093968073341725,0.2681382381371151,0.8234572626874795,1.0988863190412401,1.4100438789041887,0.2580485676749944,1.4653625223036375,0.8933826398791243,1.027216489114451,1.3986391026103502,0.3207091527441768,0.7552872468957635,1.5286553711974393,0.479660786703357,1.1308160531305067,1.2819389290186973,0.2725651679456627,0.08905652546497214,1.3155860160118538,0.08344828922155595,0.6942292013992036,0.8807586692567743,1.2241042046073856,0.5097763217943297,1.4673655675902713,0.8561825713949822,1.3276305861261863,0.06482377760485417,0.543850689043308,0.07348704442040455,0.2929274518795249,1.513645849870932,1.5347050137333103,1.333454068581173,0.40521945995352265,0.46060981561188225,0.6950193491892911,0.5394349943549767,0.27001347141407245,0.7673216074970497,1.0304511281135353,0.11355648679469756,0.9328571113696986,1.2273008500528677,0.5451461685846557,0.562664189117808,1.456621119846805,0.7190229360076263,0.35672903561587804,1.5312186150118867,0.08935135233613944,0.7975684418195751,0.2766739733749396,0.25043218248426086,0.45518643947816995,0.19759506611409106,0.3020958593243806,0.11001811317041602,0.6513349225527005,0.2964236173881549,0.4633608731900277,0.49929243417854896,0.6267911968045632,1.356518607947188,0.3141017567213775,0.13444259303169592,1.0651573124229858,0.9021361667562913,0.8391041322821916,0.6702003209534906,1.1118585481415315,0.6736281361512222,0.5796986656409029,0.983841162857816,0.3311661394673925,1.3817646211321004,0.7692333855219242,1.2596455627586636,1.2972197903784604,1.3962019083949306,0.34115062079705794,0.10265829519331773,0.3357766131074916,0.6898230654077682,0.8916870121382119,1.1188445222242303,1.0606407329234937,1.2549415588848007,0.5670639748078572,0.7876224716581403,1.3854995126708078,0.6931489268986252,1.3407494723031,1.307679026163441,0.7713761770911984,0.6362584786527541,0.6688320015437528,1.552501377711863,1.1236895918599863,0.7268545097924005,0.6428859594679414,0.8282236305416376,0.3564611271622066,0.13054259146832722,0.004356294098382179,0.6225667252735917,0.8542421115413736,0.3896239713890449,0.38134896392253204,0.5138125121647713,0.846064965464182,0.5255532736097329,0.49621596984188515,0.8142674260431473,0.2372807037652362,1.1779809295087356,0.7204705570949547,1.1306432570932274,1.4239091549413894,1.1405418053338492,1.4542171148082854,1.424830017346296,1.0583399571110177,0.6178314189931218,1.4408330796704336,0.17361733955306638,0.8930618335537571,1.0095005711048213,0.5743587866254003,0.4067238869263375,0.5782286394377323,0.10276702838606583,1.1946073273472066,1.3676570442263014,1.258077125699748,1.0893606268461096,1.30019686736138,0.13317409727508756,0.4187211527770517,1.4837472467205541,1.5451358199295742,0.2927493246577555,0.47715524199209114,0.04074528894188603,0.8113156834321262,0.6043596349934836,0.7914986190253656,0.9968643888269098,0.8079351663282114,0.1798159411456299,0.7882415181919157,1.158091920597502,0.16693478928898234,0.4161347829388173,0.7254097949049985,0.4960911745127092,0.6204035862270453,0.5235655604374012,0.7675024037273702,0.9388181756893389,0.9664530113170354,1.3741762301875489,0.2069683900047528,0.6883936702447033,0.5640408041768543,0.456248042792615,1.4061080897075104,1.0879814572891242,0.38366929622180584,0.8962778931263549,0.3265023022421511,0.8474510935105303,0.05286841099340531,1.0031384332238338,0.952579773642312,0.9825560695721901,0.986810278265647,0.45475116962810386,0.9982032005322558,0.7595426414430004,0.23097576779218162,1.2097349271013578,1.4348107767199347,0.823326220672453,1.349949355241588,1.1439766825708517,0.8591929805521665,0.6684006991606322,0.7016551203687379,0.26360696586144194,0.5114845106359825,1.2284747881981757,0.6316720476510878,1.2617948375401062,0.18735276986299831,0.30870601541839054,0.76761263409699,0.30380065019404606,0.014113178978214477,0.93709556029416,0.34441310036141903,0.01077066634921611,1.4917504266307233,0.41696192946659066,1.2278936160120586,0.8068636014664813,0.7636592191440332,0.0026044895642761317,0.07422662589551356,0.06468274870600019,1.2039302397335243,0.38518239066756976,0.37793582701120504,0.31873847653190646,0.44142048925058197,1.2064401198581682,0.9350850150839467,0.17042717154301132,0.37051812926733235,0.6965792298423714,0.9285256062040183,1.3669936649518464,0.8570211694196916,0.5507799837364573,0.722411349542064,0.009699054623821228,1.3767207686134402,1.4771453386248425,0.6547117422686579,0.116024408460141,0.4464292953771958,1.4590504839448535,0.9640493965427229,1.3670850904778116,0.8070889998499883,1.0993069292356292,1.3929607898382852,0.8619443697567054,0.08871984679812754,1.3288331437005836,1.068480306696062,0.21558997955663572,1.3933816034042361,0.41963470328298735,0.3043023869472327,0.4492531666969686,0.8224540336819974,1.137886904060641,1.2478110249108068,1.2554900166869474,0.24796725779970544,0.5329932820904445,0.7162182619889652,1.47504668394845,0.7655111473560007,0.7302449175787762,1.1861172196266696,0.48971949705055184,1.2957454203336618,0.19340819357606698,0.8852765952266229,1.2671275836370783,1.1804582067657325,1.10981494715143,0.6918431981445395,0.7563169299104452,0.4476402735300142,0.7069017561042613,0.6550229671581289,0.640105851857944,0.05805318237117874,1.3271712878034598,0.33433699226160346,1.298227977540512,1.2639592078729796,0.7827206208021428,0.1293176824868905,1.1636296332619842,1.3330663730090495,0.28239636312598276,0.2997052003863856,1.119073375482643,1.3232148466222928,1.325629845825019,0.40401029131753863,0.3390740561682063,0.03948836173043472,0.6281328230706638,0.7098146731077424,1.481967996010617,0.08428468375357488,0.6651535579973651,0.6047525835549011,0.23078564861870315,1.2343911690137832,0.0977845543780144,1.3771735845141455,0.2992852467682185,0.6634874737804903,0.8726974579139544,1.1025023830403111],"x":[164.9797960083834,173.27367802424075,125.18923348674716,363.5655573152564,293.4063956151558,106.63594034874157,208.12903700093688,267.1074739715339,189.58546262720188,194.47912711179472,443.52212520844023,97.85738118097554,232.42451917075624,256.91389593443535,39.381001897134006,325.18354790804574,260.74010184880115,200.68811112769401,53.347140523587136,145.235723420721,491.3334787475282,378.8367647279539,152.77874024070204,29.38604598746364,263.3979942947802,376.5496802874854,349.2318327436402,480.23745721508783,202.72089085522526,367.9415322756532,84.06844853997487,373.5935464039252,191.73330221033535,92.71922992085457,213.9652299439695,434.2360638908147,59.906204465856035,17.097245859523767,160.7790905472134,145.26747190026833,441.5447058657338,448.7816282833639,210.74241517279214,117.55073111711212,25.935871437384407,45.50356298415803,95.92819600022273,296.9174001430504,148.24466678451677,25.792670946164332,492.6822362554843,199.4096302678272,15.23943126842453,405.10120544708184,459.513621833169,41.36289897784895,267.7513002756497,228.27075054113155,402.2965509918425,282.01736970758486,486.54717013866025,266.4972773166517,470.985804374524,309.4740528180239,55.59260947773315,381.0405178147035,103.70037876961091,136.6207839308864,478.7210578243029,56.48996616172231,41.03388457436419,245.8114455962378,158.6021226762162,133.68005596578558,331.60018373427624,266.86744764817286,285.9068516579193,498.9791074219838,341.64799418724357,79.27479871999398,33.871912912222356,54.67585756581927,451.67658900688656,489.4103326558056,79.21271422541909,373.66122165271855,390.47853378464015,55.48135623267303,395.40364737064294,110.07029097038689,488.41712831902026,49.76352712422438,469.53918369824964,201.783794821757,213.37792562835133,262.7800783066727,124.37588842900205,392.8755842533378,305.22139900710056,326.2554901727025,292.41062698785623,252.1298967624167,407.204261266526,338.79729281632245,40.63209164235537,232.63306602115964,344.3040830145875,347.16267375525746,429.60156854464225,32.765689345403246,450.10187840974015,156.67897579784162,142.1429696726494,421.4601331261757,454.62375603847073,211.31317320178778,180.13701536055615,337.17670445524294,440.61607871910127,48.88243822507876,49.03139810338708,126.8107742879805,383.7019019067558,9.779082335664825,345.0348174174901,86.58382650868379,93.98064991426536,183.63800674612085,203.2512879796733,10.746751489339236,70.54992135027327,237.62610107816406,409.04000568107534,416.8058111396955,346.98287794044603,120.91406493660739,365.1603253297393,51.05410996795368,340.67546995581256,340.48920718726305,63.165806290301774,304.0623189126278,29.599214197953195,446.9988062262643,153.0573302576088,194.35468561896053,338.0170486258104,272.91402737545667,224.57939692634088,246.96079187443289,25.54959707762783,421.8103284486786,375.31057898724674,45.32803903869009,288.8941909152831,142.5817526526124,19.949074174245517,147.58410561406487,363.1164307655498,57.72113980706972,163.8808964600772,48.17287330521003,259.2670668515783,295.23142931358007,347.7561511675669,477.44983290187895,249.98449675791468,275.7469331156821,107.55373074059472,250.8434284015263,157.90967238545028,485.97063171319786,323.84131418031257,409.13549870635336,101.5817734297818,324.3811099725363,304.9684542459279,89.55660693886736,52.38605663223228,70.54761943964294,33.170492608465274,272.6011129599913,497.66821178325995,402.05941649935215,10.747124400332432,98.07648123551071,228.68201393001098,135.1057773443013,16.391637836342674,462.8130504545893,185.24411336985537,312.4128414537716,45.07003534244025,193.64288455076561,360.98601270307773,311.5889131186339,475.12404940399676,19.00738207080821,142.11055534667327,305.1631487020608,160.57900371934386,414.0183731104362,233.66727612477945,101.54457981898524,223.4545512520675,197.4432949283368,400.6644418974382,361.511037263333,294.521744999513,423.42991806137866,325.7014862204276,216.0257479206551,263.2476957269352,117.51490805742093,220.09947222064642,343.1382102861288,181.28165415228682,15.155449027481449,118.5188278476046,202.57754340320687,12.096441223436894,294.7605301338057,459.6072193456592,136.3272300406525,61.36167107713841,198.1401952050451,106.07412836207897,212.11855220977037,122.50811759383629,168.94353173617404,63.26000972099077,416.27268139034334,374.6327916369512,221.06699950040763,71.56610697107047,297.13070630614635,383.5057448405458,118.53166619808265,146.64009212525397,307.48528251308994,450.40306328861436,92.37423473779538,309.46267393700265,403.1449018043062,473.3384029737081,478.4126893981393,164.34379930539833,376.4504692498488,95.14657302071849,253.6567680100048,256.95432842431796,298.719503918626,168.20365808650362,89.79057537994328,190.82096396086678,11.376534459348498,254.37729767605876,435.84672862786147,23.084667128917992,324.72322304885813,212.57797291212177,340.74112699176095,289.68456367605046,139.3698317307872,441.69290616694025,264.7262210000141,300.79970230398567,62.9560214633319,298.7494836569533,455.4853724303399,444.330815990662,141.349844499841,487.2062576957693,297.4964892120082,215.3977781933205,110.41120382326896,27.962187731797705,46.517342674533225,182.7384229100565,204.65136206898038,364.9667442282798,71.5365039273863,462.872571457421,69.7434830173369,282.0022259903232,491.2309252651895,422.2015260416818,388.53502486434223,236.98831976096346,356.1752656450381,189.59825494845472,338.50375682454256,487.56423096551936,246.90871202684772,261.5714645163514,343.5652756945344,40.48244798843681,113.68834514296545,125.81833910376939,94.21267661703281,233.44402916042074,330.5830151806799,178.3380629137098,276.80090961504624,206.97813439705826,224.31969638443272,147.93935618700795,42.86200146462782,418.97035179560015,248.55475196017883,109.18811769060433,483.97663334364927,308.79670230536027,394.4805480810096,399.47166920479924,299.18810898073576,225.98045821904944,75.0153151013524,40.909918884802664,152.90731318879202,275.8750725457778,413.48265135622785,268.4806289304973,173.86778550633497,194.06391544744616,339.4349792860446,494.0450176654416,341.8755619504162,113.40748950835899,318.1638852973122,277.83658709775517,385.3920958723671,252.5649369725085,410.6348820589174,61.42303720085296,65.45797480890259,260.1529768258604,328.1739571652098,261.6519397014303,3.2305835630109803,340.7537808002613,115.18124170906052,245.72573102867946,146.8677838917739,233.17252686359114,266.854448475898,174.3440871464219,310.8367205253303,212.7991946130401,362.0099358420263,211.8322332371687,109.92352486070467,40.542591596811285,403.11455723528246,349.5641621259381,403.1638790264784,49.75989758244748,74.38849396689618,497.1406407328949,196.1745973529938,98.97930134466837,296.35531364936287,289.5220431750999,151.19753027125614,92.71537425984621,380.1164403969438,330.61231509915524,58.24012373774801,314.2698577999217,482.9533643391668,85.30631496710429,275.3644073845521,394.092292763368,331.38079949353937,29.326835120289218,254.45773522354287,470.1606179201,151.8112520206293,226.15436815211166,154.69324064678335,337.36918034425867,298.22621035326733,384.45986130895716,194.99524377052114,109.61174161213549,452.86669219896237,324.54814979859924,272.5001782920066,246.75474152014476,19.18200401874559,4.626824158314169,51.67269043718481,268.80737414463454,246.51219506392763,382.1491090047462,57.94451548213531,47.264702503242326,225.9293853766069,472.1667210047317,204.89927387605755,337.0112951053691,156.4777056650417,211.21600176824472,186.56789148625376,52.552269228943295,185.17688115981667,160.5589749178551,79.57717743382308,332.09877003180054,484.4676309550672,203.88504336248903,131.33741748386828,307.8738207772207,361.03979366052374,342.96776128740294,252.176057168361,399.61732891722835,75.53139677733579,22.504929808542016,393.29082855786544,353.18663423807186,78.28588859411501,6.62883579612894,477.7132722738393,474.0620836688574,436.5247989675489,384.34662142462037,150.0174349281672,324.9234713367458,246.1804201747283,192.03451375759317,7.798643758333057,461.62994870133724,169.2086222491821,38.02929587364845,489.8582186371091,14.718855704130561,430.20160060795865,475.2655493961851,422.86832893586734,330.9629978797789,78.3024693521015,146.17417542357992,103.50527031884671,184.3182976385108,105.5250764445661,4.902608516908824,99.22942191858274,384.6241549114516,76.22411407143137,497.6522030045373,77.19967272629947,452.0268360544758,498.6299126142422,477.4783509116728,440.93441228482254,372.5159356582912,394.4176040798457,143.7025563693213,122.7732782612595,322.5497610906598,492.5552400114249,294.9046542804907,206.2480679798767,88.13540998947434,27.971878831355212,289.01545275635544,39.268957233888344,270.6236254950196,443.86514133226365,140.7574882315743,321.95759914062063,348.1035176234489,260.2705464496952,152.43759694970714,260.46112106735706,147.27581028853498,401.7370714045104,181.5601580803534,287.0968726604931,114.1009452738564,194.3463999107594,118.01855515909965,19.56084203795283,317.33115857059954,291.4689132395449,420.15701073566726,146.53849615970717,492.9847871354107,8.11459127060421,189.98939006452065,416.9356379694633,179.72717475124378,289.3781521464979,329.465503322644,333.21636743933414,467.9850581893723,471.95062732618175,442.5779697802429,85.66246314902682,100.41673448459409,169.25389570113168,379.72510965438346,95.04110866876303,75.02803135274738,482.3540407721874,76.05461129080548,100.99877562751203,259.7295277210595,188.94764477717163,173.46878736146132,217.57796370434613,31.527118270584186,53.29125475291341,443.48447421340956,426.58229662409843,242.5537096156455,420.20278626267105,496.19901702014914,27.256082102640523,422.0958858603506,65.99643038901459,64.02887128524004,283.20339183642994,76.80777485360935,458.198746070153,117.79571873843364,350.6174169060585,255.28167881924014,240.57915718949485,170.38270102806118,17.397506308279965,118.78936022710795,448.06220671441133,374.16073251881375,471.19806376280957,177.17997829208088,74.51185403987259,363.21410915580253,473.5803967594778,240.02188873140994,131.30995837678194,282.0039325061996,412.78229493534604,474.90566184859216,144.99735445160334,385.7336816638959,151.69094161894904,214.9865340095971,488.86924493879826,419.6845530930901,419.10232146600225,252.36225736346086,338.62661682269504,107.58882557721915,407.98884618031326,293.9106499646007,68.1079455187017,241.83837585646694,379.754227702361,468.73697972729786,406.14629869637054,209.8461070592561,354.4713616094234,448.5455437467388,2.5141568126193503,430.49583152968904,294.0702284773128,25.36736873492218,112.10311942887851,284.68434113773344,390.45062263471317,272.16202026786,245.64691481194555,439.4763085245578,85.5115217498681,286.21889367455964,466.2649759609042,95.1413807587751,157.28480843936643,347.99254224467336,453.17628042512257,245.02592804038437,221.67881011063463,257.8374848858397,439.6945366212295,44.11576618130542,496.2954703223837,7.820228830109577,301.00257974114453,452.9007676867285,432.0254925833381,85.5622634144283,93.61240186232789,8.740302461727856,17.385941664517347,371.719948565794,317.4000769486566,1.9736009485413764,496.5542926621538,92.44726033286987,192.56832654049282,409.4863984805258,353.86865553407887,433.8321110161836,263.3256919577345,271.9999132264602,206.67254804684643,450.784007351253,80.15739478725614,241.28510276381533,411.4239192338343,206.19449652808518,66.95222061894712,101.09646557937124,444.2407199477083,217.2228755403931,292.87660966985595,5.9564534676378456,342.98986836163306,97.81338087912006,174.69555907315092,353.18794960678144,135.01453516224748,317.92100517473244,235.6229830839218,217.46754268490486,77.74146280905659,65.23423724393129,390.93895249718116,219.79121905484632,269.7515129419298,109.43395663608469,73.33113944911607,454.16864575186554,230.29511209428233,376.9746199072879,174.34617282442045,2.3752611031191417,64.20169563788669,254.98003273125804,467.09218827220957,293.8739818376722,86.20358629856462,383.2165824047883,370.89157211384884,120.85100245594083,496.78524304160743,211.5197109139436,361.17928224172124,57.86435141948476,386.3356476089389,114.6379576085288,133.65626628513073,321.3042881257538,60.15461270705935,343.75641171043026,452.52685633003665,39.33870594747702,271.4406663017578,487.9565719549239,12.303326568855134,370.930536023244,25.61100245768366,30.22116314278167,481.1898423484394,392.8469547369068,25.982786390872814,148.77802181059607,488.91616357628,281.6072614782431,313.507888277651,98.53229726757151,156.4802780738098,59.7630976631921,97.7318231928329,78.65629983466904,375.3077680327883,195.92044638747507,143.20783611838252,231.59127674738545,121.20859946145302,263.79905134409466,301.8592687737953,334.2250187978241,300.49591159642085,346.1778118721641,76.66910435112972,220.57500023010434,436.8304739954699,219.21444265017098,60.95544354072935,262.19796109628624,113.81777762691814,259.22262455419684,133.29500305706864,404.90259796232164,53.8856401251745,177.11391373278062,395.44661068799394,105.2603498129805,218.50986821200303,366.087055086862,244.74714795156194,429.65659371100594,389.07388418227396,300.681150905163,341.5265466460773,235.03098168794668,169.79701089658806,368.5622324248939,336.82877904578424,429.15376602262523,105.87359540861507,202.96032612521708,441.2623475372398,328.315239620229,350.68680645498574,131.51927573983957,56.593180887424936,247.9110950562564,490.8090521726127,71.68515138307463,419.2900510796268,10.856801128906746,311.66487544059385,439.8615447027866,39.067956196905726,192.36117669191444,418.8804718020088,396.82265387879767,221.30130188545283,134.22501993736913,209.2644807912165,94.35551386655938,66.27426361838107,167.0581138604117,82.63052951953887,197.565499335717,224.95308873625518,408.8071155407843,408.5284348727153,13.561596383816156,363.3751592199842,42.68111038374644,47.09505997678498,27.677427973642367,445.81767623636904,468.93372658725895,494.33127296314194,485.96395140399176,400.6285776394075,234.39072264837634,417.54886668998193,138.89013992021148,253.49516992384568,321.87181613725704,300.3058231480362,447.05513352724336,13.509858020035681,360.42712146976805,490.78301021637907,346.8530453512245,126.42864515499275,281.0625068087951,215.4149672458082,399.03804800289345,299.2566927046335,359.282668857834,462.290341928456,242.34749607773344,214.08515239777847,300.5930305002106,442.1504717884093,249.6159481543868,292.66065763356255,47.556827039180625,247.65627045202976,438.69684652400355,77.55178225590453,96.62494921553322,78.47941622511057,131.06398917207608,290.92073700183676,153.57256779571748,257.94119675390783,240.52544979810742,332.34970196083157,285.54362910781094,118.38804072281339,437.38223373687526,151.75183528991286,390.05315569837865,104.2166629800111,47.619116793110926,317.7622507332147,308.88577784895665,402.97705657662084,248.29197814829462,193.24102397711596,305.89406915963934,233.24757647276118,383.00088344595764,287.8499298406112,87.23522431485708,216.4974650400515,276.76100065699274,415.32603994072605,487.85976812231223,370.4234170834444,79.28397127536158,72.13608153764727,100.76483559176252,27.43138354390473,314.75972225581717,158.4776294972845,123.14900053245293,297.83273923839727,377.9855670403548,481.98417082701616,206.36360748358229,121.92010433293044,452.4346127402292,206.1908327353319,295.8940850243212,64.2183805506561,427.93670546132057,114.04313926881515,60.28995150435135,242.24656385734832,173.6482948291841,125.77035120735513,396.5355347305962,161.45037530785146,495.8197857042589,485.4194814609476,484.3090105049601,394.2286842192566,128.40562013704925,70.99903373463034,371.2824247998632,361.8946919012638,241.58134962850696,436.0191859519638,132.67939377913595,431.55633694921346,188.6399777731721,45.84652210231577,57.306832475971014,366.31698652443123,229.9133922308938,345.6526429480927,14.128577497897975,91.7145270650307,490.9538944919389,211.457036648111,314.9771881092288,485.47332326512503,161.37985557374355,319.8240558387959,148.79046084666868,256.02797626497585,270.85268049545664,248.65876944564968,184.07604415323732,405.938999681297,447.90771699456155,82.40347424310923,135.63221899889754,406.51369482471523,258.0655745685394,205.03702784450795,356.6823031823386,422.91996063026016,481.1808645426088,482.2350752781492,88.30941784117807,223.18990177955544,204.75831400849742,356.48753516691687,263.6412885940973,206.09268558399395,416.69414566949246,26.418411009720757,355.2143150413051,318.54791126661286,48.28353691921905,298.7034641468509,182.2174313905849,2.628377182850028,219.01910941270376,28.020091488108136,391.3346131139208,1.3373800924730839,317.4220660924271,252.087269307535,119.93833907863439,380.0790645283739,90.22317713354622,478.4703585544102,343.80683222942645,453.5008508614686,119.20593218407782,399.1958889561754,100.34524404640833,296.4933261075646,371.76779605986997,13.131308814252506,399.78762792417854,3.675354623960403,1.3852308473433217,352.10967787675395,313.357803337202,247.71099867683978,189.76786596048245,152.75414876917193,403.1548530720842,330.12936502721635,118.91303464056458,182.94461779747974,430.10727949251503,67.31486970414846,26.80349957215411,445.551558841204,366.93195813703227,166.2116999762514,94.99564384746529,8.824023775957478,223.07802328456904,247.23048589970819,378.8677425979341,235.72005261830654,380.8401534331973,76.96120803290395,466.1812765657727,309.75760031930133,186.3555908814981,202.0788002333025,421.55868098809515,209.57076224528336,325.0364342267595,317.29672006022014,99.33543513930199,309.4560034841047,140.10716951826396,449.161803742535,79.18187884372263,371.72491321766597,128.17105700736465,61.05154022644421,465.10060800490885,103.20357851757711,495.03812832827566,12.887551090603576,140.82839012668558,183.98220041406566,81.77308734555733,242.60653333303605,341.03441399655367,346.3512107300444,56.224619824652436,126.00667876139893,35.50479026273135,105.218004435506,293.3535842899503,32.65481496378286,106.36744715067792,413.19492080446116,58.04678948425368,126.51957807321168,327.6286245343476,432.39440076845904,26.59860709941708,424.82803400771917,355.55924195922364,147.87209303813532,358.98431555333156,8.56934265384468,497.280024872945,429.29492601477546,383.23295198093723,150.7243510338634,298.58656054747433,194.6848197105182,357.09757272256024,325.49089058437175,8.48000268152993,32.28265011929643,398.0384133335955,28.627713035165314,492.44405704053304,165.0839521560261,366.9731571938347,84.93654554565455,341.32503266087986,389.956809544973,43.92019958965876,355.122925079481,293.42627528697915,469.2416179043215,42.06190454752201,23.978092832809494,463.43951786956336,216.85844627447537,318.39930867300217,101.31446448870851,164.76873124940818,129.34601274143043,325.33266476646094,145.2136964833114,382.17330288141136,422.0763615758404,45.03184557919504,48.73719076685745,410.81313992045733,106.76767414964317,377.11592821728266,166.62720550493714,480.42389101115845,429.66311167869577,438.7137657720639,35.672473022838936,261.54592474303183,19.40108567683252,283.19597606708214,140.24894809970868,367.70940524592464,318.12971290948286,104.54957918151386,35.06652772917596,185.4683437466844,317.40207188155034,59.79394513905567,481.61232667963384,181.5556134495768,155.36215835057988,342.56310850147196,65.24807556055268,454.4156284111096,144.5733374413478,467.59614736238865,214.51514615375388,443.0080792573782,98.22197566218338,318.4799257705816,100.53861942478225,85.07618943842388,332.66245202441434,135.3936680336495,369.73384357693783,381.7769120662644,340.41071404162835,330.40383619040125,446.0752947779938,470.86519652690663,234.54081164688745,225.4143415692501,181.43196862909616,119.69548980537803,102.93381936469248,419.1468295364343,178.63334467906222,476.0058384516889,359.64594901437573,451.7933218411375,396.6771449875531,137.67814431854154,43.63322265367786,265.0767313221175,471.9639288717252,287.22746959387547,450.62576771136753,92.19443664297711,391.06141431219964,133.2895593122547,397.9685127705056,495.01201402979666,177.3598878284719,345.2749519673807,401.2326347993751,193.61714515917973,119.53560213041126,179.2056452964108,266.35003204925056,220.81242851468696,448.1281288090102,211.6108475347146,324.77947272485574,226.21377682275678,217.77176962595567,176.3880209809201,233.0341901941796,435.8088365346566,54.79620342746927,388.88661857881056,378.701902064852,2.4850780961097607,211.24418288933344,208.7225755332155,421.97405116680966,462.35528881266094,140.78421192887825,193.12543993829433,349.73237551105217,39.274792766793794,270.6162711442425,55.027098944812835,478.1426315489637,385.3193206065032,487.86068754696777,421.66912808086585,200.53438594752126,178.72008116943937,371.34432595903286,110.79505650564403,171.08432507960168,379.6085993761924,212.70407035367845,215.57133257505745,120.74426974294516,14.420167011365393,403.20417476526137,117.93752857781459,343.2127266806354,266.0015245973991,341.1319765737734,355.70499441881367,4.091569882044066,168.1260533358816,297.8553563753066,363.37169910588676,218.63993946281934,431.3010199541942,437.8766863832889,315.1165435085931,423.92297681703184,220.15082812350906,366.4374989694439,161.0551844827758,498.25306373987866,187.69684991623348,351.1818780861873,213.39317884652996,19.662012932864403,378.4734877047741,336.0992438568642,395.51253951624096,422.9498469050843,37.083201610135895,169.59118973647514,174.8715491965621,96.53636965482993,355.48879494825314,119.1002855912402,116.79588227414395,461.6761140963491,281.7330855970551,214.00772963621063,67.948190486111,497.5454800281949,370.76057501005977,207.73569729178178,469.5631243731149,212.74202926634766,4.071438267275518,309.01600150254336,68.19590459642922,330.29182800418124,32.528552125460685,456.35970392507465,322.11895813992896,384.3890939415036,138.63704266931686,391.62547305723615,144.95216474795237,55.73463962520076,13.948953695050669,483.5323398725154,248.33347882707545,66.40038314049035,285.8805072178965,20.312184261961352,223.6096685068758,181.38650027896418,312.57717542668337,30.793924812472007,346.27503223093447,422.01914243124605,305.76720029001916,222.56393910108497,251.74233768761044,442.80046228418234,204.3628932165822,276.22356161009407,384.43806563483287,401.37387164960523,412.9986425118093,13.133679775779616,421.4214412257298,455.89449108202706,270.2969700279805,81.07466402972496,132.44181080923778,181.8719453877773,284.1413896255543,212.31069341653975,121.96240005158965,426.04031104813646,239.18266079372353,89.78686343386056,420.5793114184805,361.3587384108875,318.2632642600316,211.4588396462439,236.90721080696187,150.613603553049,253.35329502030535,398.57986854625193,125.89456305538182,114.15040349243188,371.3881470099506,346.22161543595985,188.65950007340138,392.978038029386,20.883612677657702,310.5493504743238,1.8747510345312746,400.23268879417117,262.77010588614826,372.866339648276,471.26611930304693,93.8480197003383,102.81593409515067,312.4306018916776,82.4717040806161,299.17110567866746,109.33381880737947,474.8219433149036,490.6869950894386,115.89531979219902,382.08425255394883,331.7309119738451,244.31723833633012,481.8607129865511,391.835775301692,276.1090085662413,358.3467135275579,8.035526466498188,243.23066388916237,134.71919155826885,193.59626400321773,193.3867793468601,75.24889303648685,264.2178845629073,23.266472673762916,187.10658721011131,186.61914429536876,192.96961433121461,27.68373453338191,409.5415977715102,277.69807384800373,394.5044122945801,464.9300866461057,105.6208241226153,386.49194267164523,393.4505430162174,415.31624832431726,166.09911842664215,49.693183335025815,45.24168261921613,68.6469513789536,354.19085594584254,416.3815202287885,442.5161151774558,48.24657869504212,201.87214736558911,447.4090681020021,240.44171205457087,41.03189082948677,1.9245130509415453,442.9101576895298,229.5035410878965,109.69482652198393,438.91848260616194,99.5705042688788,262.2015040289394,431.56321042667764,496.66644251955296,294.921723277919,438.3358856054036,154.6265525621936,1.3325456188636453,265.36695767481734,486.1210879166321,470.5955538018952,91.83233493224152,458.77573040200235,294.54052290778554,125.75433795966029,158.69240582038069,397.143944213205,100.70405621692314,382.6711640564485,435.7052692061817,128.95270684964154,25.827735683348727,251.04555114761084,446.180737800112,383.96854374803326,186.4507057597724,151.8309911540361,284.05542899556815,303.9934930462741,5.447997529456905,386.2934183051423,454.63955468652296,45.53641140872011,43.02757728476059,204.03484370095603,446.60814751934765,453.74174495227203,255.73508461466676,55.2387193727536,341.10063386933854,55.48231176900287,31.4846170003632,473.68089216917366,418.51010486378493,75.22384647882441,153.47399969056096,344.3170517772668,413.53206617351066,464.62685127718527,153.18281521866373,234.74302109606882,187.60089451191098,394.923930211559,309.8790961255139,315.20878567919664,215.9541414016991,48.0146545999256,174.51749874500433,24.589545516310764,386.90102999418616,433.35649798688894,283.28292413193844,317.96647838839453,67.56946916041507,291.2920254353403,459.0962712668082,245.7472437276965,97.79789062330435,320.6922222077372,188.0042949264422,141.9103849190926,180.19174668781957,57.14139164892074,488.70682128806976,262.1913515513511,453.75950672418486,91.43610129872326,233.13059593628915,283.34492712905666,164.3764327988305,119.50741284264133,285.39604234310247,76.06984761839131,334.3299395399125,409.7026231256179,381.13247867677956,383.9954960658181,232.6820087231306,335.19896025442955,420.8192479957522,298.02211554193406,431.1633969314027,42.354866384064934,441.4857213053721,29.22548867131558,492.96929388198174,35.96363965079041,333.25759857418547,125.4461820141427,163.86314459970518,26.213307096694116,50.61271036843007,227.05841947527904,274.66756986143116,137.84373654133864,343.1893310884142,274.93104459512995,384.4446845631716,75.52016015776964,434.7184447906229,349.85317766087434,159.86543963006093,324.0534880550754,441.047624926474,497.0200722579309,79.46280768574209,53.2923753477822,296.62978463600587,139.44641829409665,176.29054841739878,345.7686918380417,271.56514905785866,54.449010244517424,191.36303140793032,416.9453146209682,347.0152920922893,467.4318731831103,463.57363082445926,400.5096152219056,104.17434778060763,155.6418692357845,196.71484873642254,127.73976238969964,303.9251081658947,177.6207836042645,189.60219619419505,210.421025115748,148.01075335318347,242.43261447321606,290.56930530867106,336.71521008750994,245.79438926700703,84.94554011685607,293.39249747462384,491.70439382644736,163.89514607722532,445.3029959177437,378.74520140451176,43.0578932676906,331.40750742485494,179.8840787049536,236.97819236020823,362.5661665615552,291.15337362919666,379.73070264532794,495.01149832954195,242.1553609377749,72.4431839454036,135.0308530239075,371.88423934983285,470.1183907207137,167.37175451131426,283.6138246893317,232.75620349052218,53.40535732456553,97.45063271890298,495.649604496454,487.3499995933249,183.35862060276776,36.63611723879478,282.3859304870615,310.9580787039303,73.78981781965766,200.9998673710015,112.76714426466671,79.60919221331653,297.32928059656007,107.95045063967335,349.3075082039621,190.73428766995616,187.69267911942723,484.1191424639897,55.42169911238537,229.36236096524289,486.64303193834724,302.2081419936309,26.75980138286127,138.5217765589154,359.03367644993733,426.3577688380931,327.05508828761555,14.285649209895169,486.6059706404127,418.48623777655234,270.0409061347576,335.7983534292115,482.33380609832966,442.9597490433591,30.910304485175068,372.2045086480165,16.574555802718827,480.98735890429924,165.8027570637538,10.567130413393077,277.89880292549964,351.87361417699725,181.45530390794772,24.316757624045504,321.1396831339907,466.7200182479928,114.98293386294223,324.8290703923918,187.4150106576561,102.5389071406444,355.68163103440156,459.1942972985109,399.6120507312757,52.46448518138747,426.15963489275646,443.6289948897445,82.3165727582843,3.98594511466166,155.96891334816365,172.873628673485,247.35703912340702,356.4537584755703,424.92590831924105,319.13799731000836,394.2679132298905,47.83047848085986,96.59260856239338,91.36205178767487,363.19151671187177,296.23117905503113,174.35171959627306,423.34614964940675,160.56338548479766,30.104210437955636,351.4532286289183,38.37445204096712,434.0198335339327,102.39416010626046,70.36608091280117,485.49571479434593,224.2850639406103,369.501453277473,305.21176537535854,446.19615688711855,423.58780795868745,52.48837589303834,92.35880745919034,275.5669434182729,248.86563055282284,454.7059529534084,127.04049415675955,494.31896193820546,207.46964272013446,263.001749831311,379.2375840718729,315.65933677926284,315.0790113925656,145.73421366772465,487.42574660877705,162.99343899239994,130.03468252313576,63.405139460993354,321.79437611589844,482.166949939754,10.362219351286118,475.0905646059076,309.66876163347456,473.08225021353326,344.3848707298507,383.40118216225505,209.49395232725288,331.69982961513745,228.14788548691112,114.52183298900553,237.67078825174903,121.29291122488617,46.2477333865684,351.3031258022128,100.23545452448136,115.28808618487885,454.46714196558634,230.0116250772758,67.004046672407,33.96237049401884,220.55102111961733,261.18265566890983,151.67231252330825,336.40717094333814,179.97313438081753,184.69417661817212,452.2888108324149,408.20613370183736,375.8559520318715,350.759140117239,144.0559844170346,187.57265509581845,62.33410367878278,361.25513666032595,267.9525306813296,237.1062433941804,389.7591772922878,449.55911556630446,405.71044428978007,365.28085911345164,23.91811810582012,107.99556580873781,269.92887857120826,215.3633222566683,238.86579710734534,215.00859255970616,262.94678133350436,40.5637173497736,240.56629614627724,126.22889962632323,373.6462382110367,407.88055617261966,161.1875599345226,289.3410338492561,379.1613164553125,365.62912518141724,204.63713024937812,25.726666535395125,248.97255449344746,19.471952483740896,234.51195005508464,123.65813973224205,388.21148969108054,85.57529735928615,189.92952126485784,324.14943993863363,52.33513523915801,304.9182254852093,182.9770279449864,418.84183354830895,253.57318986091414,242.16661680815488,316.1092900510949,474.03629282182135,324.13021835741563,262.09001584522287,83.34767324087433,166.4940258487023,131.60496591164394,22.852265655474604,268.68687222470123,88.31190205766038,285.4150503028591,372.89315159255233,355.82967495228957,330.64892247816414,280.17386323950154,356.7822272303285,395.07173673799855,85.77930121285627,90.48653813977393,80.05335762801147,102.54231564906202,493.1516281906547,494.20729474761873,57.99458904642884,484.53644889186387,185.18194165225165,303.2548558412891,239.43365846622999,315.06089052980104,385.6964709823253,21.644388669117998,200.9108250058399,211.32282911609877,462.71495298903596,235.4441434847957,317.90455986009493,286.76093817517335,440.08193085437944,427.94194387400177,183.10616897203525,267.69315861430255,416.37078219182786,43.218122648994935,289.2560883190266,498.32189187496203,66.39055706839581,478.3847374930892,282.3196852375035,28.138031418554533,152.02020218248612,223.76963290505293,231.799824390587,399.1664058165265,54.37650532280025,181.40920308877318,26.481155220712594,471.9070633992676,374.3202339691012,383.15404390681186,117.32521912272264,166.5123736008929,68.74148177317252,233.81952778438054,273.18633506426926,491.2885331939629,126.18791224546399,41.36373230653223,409.24383252979146,62.18028332166136,108.19094490605119,209.3275138340206,1.0722649440266796,465.5442299209701,122.28903599260066,486.03082571779964,141.1551066526653,432.45732647727584,491.2311290413558,317.1550336251612,95.44535926986019,496.04002826043046,200.9756879127733,277.29786484041887,39.26575453948777,211.44819440628893,108.57137477831024,87.68414055790952,311.20128727594243,489.0894602342023,204.3637930687352,60.24977331514236,30.972557813426562,393.9615136614819,115.13148883459179,243.91626676511692,44.201510077205405,458.56889328140096,474.4069420564746,441.3080103377434,132.48071119269133,118.72352798697617,149.12262807138865,134.563836640608,14.550425070080975,121.45391213134272,411.7370651308545,63.5175690679447,280.5050283345709,343.2068663862099,87.16323991279818,433.45777233075586,398.82208111074533,184.68551754943374,130.90291798348596,300.92575765699627,462.30088102065747,50.404384967413066,27.159201167555324,241.15780515334296,379.51128927094146,286.2595165510665,64.60559515579345,269.3831555103291,140.32028984704226,223.81815969604878,276.79632103606576,154.46586740550106,433.8882522935392,332.1301076819424,462.09944455980525,442.2540279443263,394.2981181264813,282.6351239783605,458.17166465678383,25.17885574737866,305.49194419213944,175.4538909728429,43.42835779186027,442.3896341902279,126.32515218005602,467.83144787275756,178.78934581355466,75.54673298868065,40.34583255910717,149.18833710084346,254.8121096540754,394.3700855298956,200.31696113935237,361.7045729874506,210.2591827954452,58.60018315135185,270.0047902749796,277.40671806331494,373.9248597010707,437.3862865649644,334.27325833594335,413.95661455215884,36.61421766083161,448.0473342579863,157.172277632896,194.63967144534067,492.3694002381589,390.1256297965772,345.3104737625128,219.08642804145583,191.5818435210337,412.9247023833388,431.5212063231595,302.3455951188343,126.26493409966255,459.0657223103489,311.21457189190306,182.45949943901786,24.401255700114643,268.99962405390664,434.3281111673776,342.25737038212714,1.9569763163787002,496.99671523216415,34.43121154918594,461.97627770733396,39.49028866154969,440.31585249248496,408.9446337688639,130.04119604899822,227.33080697360165,412.56643034708753,217.72369643882416,290.9194125941105,450.9209402839788,331.63495011574196,46.788174653200734,313.3633196558019,164.657672808726,234.62920774171747,289.2888765399728,142.5926801820596,401.50566680260823,220.8347272119644,271.80862505502114,67.48051655225795,314.3287885320156,262.1110481940351,354.9721576760508,101.60955427807062,455.57851508273984,158.93925507069352,487.5624275715216,16.43767577002697,398.09384786160473,138.5146663852429,311.65898784451196,273.98733487060724,383.32273167787775,159.09207322785056,175.25798417560756,220.69742162394857,271.15602979887365,473.0662419679081,456.43286255269356,397.051526601498,238.60172236144217,103.19129781733916,15.486131617001409,374.1303437835042,198.02313699980112,369.50410815030546,183.24415062163624,423.46190069303356,269.220912911983,421.0727876820518,454.51465952957506,457.59757624759635,310.4092835268749,31.576016099445603,384.71406571815294,7.83912265977138,21.192645110788554,33.62173241394384,238.32711425649543,407.5431210945184,466.8390666096216,100.63442636690834,38.63523904277877,146.2081657135198,2.966028717640179,115.09819544626242,476.90202784200306,428.297171122751,204.53221950442523,470.8288657851758,419.4745913114407,323.03500318128266,253.6585652746951,97.79492080488683,111.4095098761797,330.68587254964064,164.1180812750006,25.698335765962142,57.34578696349302,423.1374865547536,45.281263954848214,299.01510146390154,413.39554099372634,263.26555276488637,133.10526950087464,405.1665219655879,141.8260667896597,65.91506208279274,5.831541462642309,41.31044385238714,361.8188726444441,22.632403920841092,14.928814621248176,231.62109653408146,276.86026417885313,225.85799571802335,127.50289610547338,268.74152767013106,423.9467957301837,147.9413046758462,210.76770391026832,81.53165402245244,65.0527417046899,411.67814326700045,83.77723969770435,32.742175140031634,49.276229508597005,37.85862124169314,376.98636508893713,93.10528009583297,91.49710413355628,431.9780132251051,119.83860640992671,152.14039414921922,346.0851724804209,169.5843045797092,474.4110957740381,278.0865794267321,142.96044343467017,255.46735722821168,427.196463360073,487.5876295975018,25.343679624796998,106.26433990101025,479.36458233640036,339.20913566089604,269.803286234636,109.17802001886234,89.72376960740857,482.7106866584071,132.20894447443789,442.7922324421707,94.2844754672747,451.1639997851662,182.06611222641055,185.30382478438023,77.6390763722854,98.21774874371658,222.20571711510095,424.4978587552526,24.909456061395275,334.87075466090556,61.611942099934595,104.41496416692264,144.00958905089723,174.2529364302149,324.40220133983075,377.3729903251507,249.89485396375466,169.46258290359285,289.95120553593233,154.77568843474754,481.41085862999313,23.752887030652037,156.12399280950794,65.13202092379389,498.7222762907212,214.8314405393823,452.6870004441027,411.7366170041621,183.61132643173494,229.7659487667101,295.7898604253043,79.18448971340707,498.20137575858837,135.30908214034932,320.48452242873805,16.826504225293636,379.48600854173566,253.3397987528392,310.52675396465344,64.36729714328537,290.78664814895717,37.39298845065375,130.95715692755195,306.2910287370525,109.20384526942539,133.6825545430581,21.74857693301524,301.18665195306136,470.5588832930909,290.4208432849744,229.06782658202007,176.4789817271809,192.17080044838076,137.23252855613998,431.5507724616583,499.87841373579266,368.9614967788834,303.042191274974,449.69936282350733,96.80862506994981,4.811585440501087,193.85860871281545,210.7130474932507,397.0528835929687,489.5443586451621,448.00599261682106,233.25175143179212,208.9761475812375,366.2500576937252,357.48380594809515,229.77873952615892,103.81390855871243,177.4749625707548,336.77964437189576,291.5920493269374,485.1512104229038,402.49231248756655,111.59955980353186,402.0641366909171,407.39952662044897,86.91939100040757,229.50521915066213,293.5244248749054,313.6285449461308,150.45244391000813,284.81635520945946,473.27236288757337,58.79186220898169,340.48640296751023,347.25970421110776,396.1429536921527,38.89610547914102,436.28914978219757,327.718989897531,227.9036582470958,145.8569215673804,421.002500928799,21.749809786640984,460.0133751573629,45.81198403484499,199.58518647724134,247.74331012000783,353.17857631703174,292.7869433796547,259.3639006171575,163.19018610405888,16.601277720074357,92.62211919231711,487.4815663021735,256.3607058111356,108.83489347507135,369.3095588408523,380.56644168084773,418.61124825389015,329.0860236441008,355.5342390502627,81.76863563610448,348.7240351121247,150.54098764890423,173.062200328435,321.35038339567956,40.41785685857613,154.4731665423783,296.13345115546076,122.60478775211226,258.19344066727245,151.6791076056181,276.1939566157109,92.57998079077434,100.59302593402775,138.16366333350882,140.89166639118932,425.3395555414314,434.83085937312705,121.01853624682457,344.69117575263766,384.434822167947,283.7582451036728,4.271336934492775,49.98952804264556,33.99998879140975,383.9580139959292,289.1047930952081,365.64994967336895,178.0468721366062,188.14709405252083,353.5889433723354,200.64657373847206,104.55277837530019,297.85858496077276,452.6616663013969,171.43930550397968,309.05417434654134,294.27273571612164,173.82087517372835,85.50900157733044,368.34590109955934,365.2082524559083,172.81985391339094,159.34021171804858,255.1382726444795,58.91757314100976,364.2942488142024,224.4410234497539,73.22327117414828,412.7461149351983,402.9047637505423,17.73741640484461,85.8607890299179,343.59485734652975,246.02796277613658,215.92559267674181,231.2892396153824,190.61603009822124,35.65024412832762,445.21678388178185,207.41939638738882,423.2652709904575,466.0719179688033,62.090193244773275,127.67841567102478,70.8968430744209,257.3940358039589,466.6329672547893,400.3714790859609,264.79477702483723,127.61810191758049,442.0074576675536,414.78719928055483,261.5910203029006,63.185451167038444,31.60792510466226,55.52516304660537,85.98230180617416,324.29237012419856,153.68412705292656,37.59335491731808,240.20676825465893,19.7297583979148,199.62541859743342,107.24282413788532,221.51236635207604,118.67686263922606,421.00286862589485,261.8451429678509,483.02794972936215,149.40004397282914,409.50209537696327,359.4867392526939,294.1450245410416,346.2251669336419,406.70194948217164,121.26597563780183,157.06347662524334,164.05416544386432,220.34374594719532,372.6469864939701,54.02221124007711,263.1553415487269,279.2345491230056,494.14336030664407,485.51928831113423,304.9788081536337,484.590170120371,42.975889438969126,408.388872075375,94.18612920293023,430.95046936181035,368.32300604369186,111.13468949051087,349.32966944269805,288.5259330401797,490.7940215629114,91.23488103977495,404.8849751313095,336.76096892644733,281.14733869472974,26.65513322340729,167.08282507235873,348.28436286050754,179.0963445456808,138.5914973469029,301.67716417533984,458.50352738891695,452.5516405325555,219.84553447545184,377.40439828369375,275.56922407871474,216.98329568900698,35.496266789768804,119.94220564757407,397.19619220343117,81.06121246087106,80.57267271143786,160.6854601577652,120.17244380521674,468.6674295224873,426.8436793901366,445.5807848310306,84.33416935794014,323.3860427247122,115.62972344639,367.94086037849047,250.5936952855201,484.67307655626666,443.65247344983584,106.88826280546304,469.4711795610106,19.398946732844813,363.21193087517236,60.512800284107215,111.68813719914306,19.229109650622522,425.0468506935784,196.28755419583877,0.47883668607873187,341.20228735153614,314.56938331464755,9.1387527150798,460.01690928416497,233.64424780487747,166.7784772712212,180.3835517037242,381.5829083138621,312.8836381753295,177.20825997562062,305.77738226232907,56.2748816650489,283.82205267773895,355.12358366535625,160.7873403274469,399.0006106532381,57.528362139842024,385.41934530861613,20.125689900943435,300.14766444651576,311.0711815414643,135.3590446778026,424.88820491744616,352.14231449152965,71.28524570757122,418.41383875829774,33.17006898361063,497.5124391006601,457.1784675372458,364.5573399316655,226.8587738071016,31.009996778485373,124.50678390956837,233.53562746517952,307.17855953674956,381.32656801878005,176.6474363314856,203.67238907828556,190.7036946911035,265.6891331317437,422.2525348897602,116.45691639706035,14.155757466022933,353.68986277138714,128.06876330259098,488.6279704946006,51.77753865755452,221.35991019012636,315.3402944697974,394.0437962289922,108.303404203823,419.7443940537944,455.95482277744617,42.53308835559866,488.0268533447417,329.19978713232234,136.17100619988386,368.37728377438873,200.8867679767642,100.21167269510156,425.87486271169763,180.54034921898898,469.1690294740739,94.1072163627431,136.70516003669098,392.56311955599455,84.14480048157414,85.47524185760247,76.4776748401127,259.98209673279405,114.7569515397665,415.48723812375334,222.9438975782453,201.8406241071926,478.26803740338363,407.827581433052,19.171499484442744,139.82180013631162,278.96395530980334,18.758567855307383,481.71793635887263,300.214832834372,77.46578264763116,212.7094032263559,133.05246523074788,308.37725769901067,496.09762300156837,454.3542056447991,343.7574556191101,239.61051963896307,347.7779759106142,471.52327540509464,302.3005725463328,359.2644350389096,353.9123804096902,260.84943229189196,163.55168236346717,167.81838427572947,430.5455873657173,130.21638644977983,89.31689915228513,22.531789351727618,169.1800404005719,329.5635447466658,192.17166870416992,277.95539218764276,302.02694699010226,32.25249305175271,354.5421696451834,285.86220998582667,0.8135383816262332,225.14571991025824,474.4781000236894,142.85488910879974,230.0714550345634,269.88669497342056,247.7838197349056,417.2117900868525,390.63495371106814,18.148923023068477,444.6221600454495,200.65252932330003,476.49646531951026,68.08830301775637,213.3461022701991,150.85036281336895,470.1545585745095,195.95825071807994,59.5408870488735,130.8020017954371,73.3823387661442,213.01246988056633,187.0743441571626,224.6158189229841,356.7752248558407,274.34589084747563,55.12543846692552,365.80798828277227,414.1216235112212,162.13740889193429,116.8183955545895,101.42023020399648,84.47438459744339,411.0575941361069,140.38993017163125,187.02319463780725,318.9856104706049,166.55870158986664,342.25893990758414,174.5982264224103,467.33382833435235,442.33848430655434,479.95792840532005,330.8143862094928,31.178021288343682,463.0584266106954,335.6533019305096,331.7834051923203,202.43384958817234,491.68598942230324,231.32502292328462,18.592473994179514,155.19323879254566,432.3394146148989,179.9629843849302,216.67172362152064,441.4903727524424,497.8756527890043,23.920265871245185,154.91542487532595,315.15607870529925,43.27687868584273,348.6650149068804,12.265577399970917,229.7211083147005,387.7018910323785,285.0602854397062,22.00238391000886,191.4037311573178,365.5146286656744,362.7097346870246,240.53306500548422,47.06865896177004,14.351851011663697,420.0137515492832,303.7256338772977,451.5640710621006,385.8047887574684,217.75271130629525,246.5019982741753,284.26929178732985,487.60694362652555,37.29338918685998,235.6547876935673,436.6507819518186,312.4764028422813,369.51036288841266,152.94660828709596,177.05161832296966,388.3744687300942,18.639361790052213,322.62305346531275,296.50093012795963,451.1682250523504,250.7825562688992,376.507346998581,186.05567331010752,291.868073083715,467.3819555740829,363.1443150506736,88.72513575523556,384.48343401122565,137.1973354044117,177.53072343785448,100.70048440368818,107.83882867288463,311.0790395331402,281.5406025784578,175.85424275352446,270.7547362898256,467.07324523524727,221.85058144502358,189.88966864376488,431.8767120193703,124.17478419694605,109.41653697281195,167.51740576974194,10.493925774108458,56.88015415886216,212.5395852897154,479.13289489733654,409.48528577211096,384.2297122509523,357.32812211707056,112.76562575552917,203.61938110417998,173.5281673874256,27.985174377449408,47.94277540169023,40.331657845919636,459.10595133929854,242.05775269770092,249.34165076767724,473.1156344941486,322.19915752749154,466.8370025517096,228.30590044106114,6.181208418564954,493.4547665585214,445.8994417129212,133.23589572063875,419.0266578932423,67.01619996352626,365.374352503684,419.2629973766272,98.96466246610225,360.83182668983716,349.159874599133,281.0871027421362,335.87950529090926,368.1441285357713,490.37667279506445,82.57108864765739,367.0247643459322,359.2046412510547,279.1195644525526,291.2054977148846,307.18651964629396,199.34360755159918,458.4065993400932,332.4025267810946,188.00337107263954,41.58538390290079,373.9020853157119,245.73382654975785,159.77354234837614,345.00353612174564,449.6131309831656,277.98569415096483,340.60789897517384,318.96187691638545,330.94731852961155,484.2690532476727,456.5961629818465,34.231371117706246,170.435781724117,328.09068588134795,404.5312816480362,354.28436846749776,377.69851823638425,136.0551101581875,66.6827403181599,375.4926139488591,499.25661268421874,399.5409828741634,135.66058979010387,121.02455836578186,26.594099246709302,444.5123507349322,110.62269919864998,206.31029036114845,323.62641348741016,417.1548742731547,194.39561727614108,302.60121587790167,16.337847960591677,425.68266616097895,43.87642558052829,182.23959988217098,434.66786905627254,438.0096643291349,285.24851594565683,362.93623298863406,220.54004537338335,218.8300286272631,31.352517515250256,237.65633943174734,214.27471693284716,317.16525223947633,0.7404793346187377,99.13669148781712,96.95512823569408,99.61074653003033,22.8942488739472,251.72355661685663,60.45339119270843,343.9169607040395,229.27458537419764,255.3605263847819,359.2730505524514,20.20179174234571,480.4312175113511,124.42353692708019,376.07349482587324,434.78098883908956,358.32187855410933,175.4080216290227,239.43086868298258,87.64426793755919,396.59555933830137,149.1340947359351,421.6164558843163,184.85299473950212,174.57627589792978,427.63971555569225,41.00680383781374,214.9095233003896,460.1595079436331,159.89303025954015,353.38327299248715,228.03034584223136,198.51864343416293,131.9590648286939,409.387431881538,442.92878588428806,110.79502687325649,55.48311702952691,304.82071672366186,68.20588951544937,388.3847906458049,83.19447678310698,382.93531722024323,64.29414856244198,494.21728230627673,459.7811721937081,209.06849806411032,50.59347463930186,57.83052978311509,282.50019982417405,13.975359602604986,96.45202456683677,406.87795384599735,166.3129719583224,164.22243489833554,70.61608406731013,325.29413357261797,43.1294673237328,208.4955856727929,400.5753217628576,63.500837697555546,164.05927708329537,378.5162908013504,413.8343442845733,235.58152606383342,354.1776109197884,113.9104269797443,456.2592513813262,54.65431663040354,290.7043329353324,329.675900050336,322.31757039393216,5.35083304446804,361.85143155893604,370.9098134230651,22.65150614993061,80.25761702433509,246.5413488864928,342.21741196213816,242.93782737677438,91.50639030841279,101.52528836183761,219.5847845163289,430.7581977271663,39.70724482554733,449.17357152096196,376.54809449313296,253.9224381605064,357.9290537228561,138.52764837624898,85.43268250204994,477.4082303070423,92.80481180307999,202.81518121427723,193.1638664036518,321.24712385697916,376.74511791252496,251.41433757100995,402.9454247184542,435.3167631268399,405.2903171585048,392.32132739247504,193.38150799729425,39.81576638674444,165.38930483840187,444.15098091762593,471.82353836342503,268.95602830426657,282.44861096674146,447.86064460527973,324.2901638832548,0.6136609988480757,33.98986870001819,370.2302390015768,88.25323342407631,284.1566532725016,164.1768602877729,125.2726577777593,426.25091880972633,425.6019299117999,43.29938229165664,279.7571356451438,214.39528035550103,17.639771679557658,445.94524116440135,162.4339460535218,492.5926185342173,461.35709287126656,155.3401576624137,135.72787749367242,199.99876858333087,57.90401474285889,384.8771643249119,397.9234383837186,498.0755568867951,312.28226041942133,440.7551214980706,172.58308068152328,375.8326386895995,91.88545879474552,475.4689545293278,111.77630955469931,411.5758077075351,217.21164654742464,199.4515772126816,137.33167189002626,184.92857152440223,168.82425208168726,0.5706595314843854,366.5452121774049,42.05058799669204,82.99494869754031,27.980628919758832,402.0135967492479,467.72160148330676,167.5894427476219,396.0149815608708,377.0555975771052,74.6917255040751,434.94588720851215,364.894044277045,114.72827071128555,102.84399847339809,261.2029451044561,309.3306542610623,76.62210804142767,186.4079661420529,234.80622999245648,218.4427992000767,162.16251014231054,419.4724994464014,72.31163240996096,292.6004356235751,7.110288662946274,18.01656927706641,30.580473783176075,45.463766305084306,255.67539646747605,429.5462217066427,116.87453251866675,281.57697944194905,239.95678393151798,310.4867886759196,38.090090454698355,53.486759046746045,87.21435114446474,477.6885894416646,162.43666680100776,327.21844971560967,347.16365419579887,188.1308735394407,498.7127250014446,132.50477286246598,412.69248105696045,490.9387875786105,437.1349361838477,40.96667625315165,391.26447393971966,291.8522761044936,342.33876396764083,272.5111802547272,481.8223214577092,89.50623071784669,184.3963042690401,352.40404850195904,156.67885013250958,371.99253889785024,287.6329884307296,365.3278051437487,104.0231073086324,157.91715360638193,338.471593594877,346.259780391172,379.15041984978745,443.2506651084501,62.07500233902474,440.66196980522597,145.34780897408783,120.18245842944441,151.6934401891936,390.7570914577436,333.3500979881311,299.14400766909154,29.720519880016006,19.55461956858229,414.7827321806777,62.975666185689285,132.17285909961808,416.850829361573,327.855655329327,354.55767623401346,394.2950614567657,50.139972326806,167.50297724519626,242.56084314977878,395.9969939488974,299.7319031170913,353.2836458433387,100.69771964694874,274.40113564263646,345.94319052086064,438.71500653943417,421.8453615353649,486.9934155372071,96.86991112718924,289.85727658220594,407.17782064331186,486.5885748166758,338.5849960263886,195.1911336265716,75.15730922501362,449.5663567730436,437.7213765172072,285.75016878562377,356.53536765027803,468.2061070740228,318.902345973036,391.2502880306996,410.4834138434347,48.79874419633246,42.7448148781,205.3758613175618,465.0742430165832,49.345895046336686,241.85293985223444,364.9245435952927,178.2676567301251,408.80362237851807,40.921759483281136,412.8826341278995,427.778501318822,262.67538844811446,223.76593032128477,254.12381689386777,464.3190303218334,255.06905187061423,401.4312209267397,13.265489004801845,453.6774106286586,266.582172251563,252.6869408080712,404.9940301353515,78.32709450714826,487.61396982715365,59.67066865546433,266.6044973798879,43.00466445788309,165.21811378954055,398.9534373800625,436.79389093008524,236.88340308746936,156.89334152144986,370.60481122816094,41.056018293509354,189.73524770392604,391.9466096453464,32.97399019744307,277.7268794055314,266.63599925645684,279.95797843176416,387.02392364178985,90.90296186856517,277.7683447991296,282.12231658383746,472.48011014922486,284.02294896473023,458.1372116239909,204.26861000239515,202.87497061241,419.69221012022297,248.48093134887606,77.77613022322016,450.7625319643671,46.79600994691102,216.85288540389058,69.0369174103781,162.44937480113896,431.00174081192324,291.04551022055415,497.2573333266882,377.7228289636302,437.6914660725514,497.3974776233375,463.65801371838313,202.52739433199275,263.83858340475075,389.80441462656336,367.6327548033076,297.87548271387743,227.08100069851767,193.89070921086926,129.3028743053053,390.8634397914267,372.8634064112535,171.9204188869846,176.76436791735105,471.4905242122227,184.42834043290836,21.983752967976834,172.08695297525978,188.5133723047302,99.15930373215743,77.70691483074465,81.25340797989422,159.1956865941504,46.95029520194416,391.6852647322158,404.1536824418016,193.74182088313617,430.458635848997,436.09907533569213,145.1760604384753,72.15577337647538,447.1136457236712,382.93396465249674,186.9197388504009,281.71083225487905,155.71144446744955,322.4308252116745,185.65310740385843,108.09918674378171,92.28822323818642,13.42947502244385,3.0499095416148814,382.34229627723505,222.5712482432064,38.901279486392106,62.21409832064495,170.66148297478634,61.1456129761575,357.47380980395195,318.99428068415835,104.01865898159768,28.358222019042145,275.5753579991181,261.15879403419575,410.14604561608405,44.69623096958142,12.29293039820778,151.957830940574,218.8188258533591,481.3240415507559,211.22072027100026,133.2922739730278,420.5364144928383,435.8340094367803,457.27371896758194,466.8769229060067,461.53583429196374,363.1236467335897,425.06220719337006,334.0477109530299,121.55950475050759,120.16342366801535,466.4076779721911,292.6729780111852,122.75911554554054,366.46208432980677,5.08535188565884,278.7472066028065,77.06166883894205,487.0322799076021,84.40589353980943,230.19763440943152,294.52127530854034,24.120132579285247,401.55374283121716,41.56400910729663,370.49039292626486,303.75814983811057,180.08056513688155,311.55186979390226,66.03006043168602,242.11050231069476,42.24049540992259,315.7104003617238,278.9350883253269,381.1362801003889,240.58297422433407,165.51757806717904,273.347399355933,299.0051167459813,466.67566536214133,402.15657800296157,352.3467135385798,89.93474711632021,445.58299681983596,272.6065828382854,372.5839167013034,380.03943771758065,195.11887380687975,19.759815769539667,270.3361753574399,304.6209334758736,170.844981645186,340.3466752111386,310.5096703971179,128.409133505635,166.79234348142145,126.39059454059154,268.0140326500596,374.8519984194847,464.3341908696196,156.6768972362097,305.93009993954024,210.9507241605456,213.98216700126162,132.27322828872056,442.3315086338734,79.0332812624327,338.7146581650431,488.1617313052337,69.41369256137453,8.868644172644103,339.3209014970385,468.3409011752498,251.75536682038324,340.2355012517906,456.4239151870115,417.79119826279396,411.7975130216127,348.85920386483207,45.95360329912612,420.7405952077061,96.23907021964362,78.71181224245139,161.86315753137427,243.8282839017506,102.99826092413677,141.45162034257942,480.65971152379507,115.73070487776282,203.06744741461756,176.75630842685086,206.0339762681952,293.81343125989434,240.27774288193004,119.64047876772011,177.21256868335945,59.92919526132201,288.4771373707424,494.87330768854684,458.89920313588016,155.656521584414,458.1161417780083,477.09338275090363,68.30535537073924,340.3481676518226,495.42799896770305,323.1776994746818,13.063632704117367,43.66158336820158,351.4726376459065,405.3377521512791,349.26318250939624,420.59744023557664,344.07850340604165,433.7027525451327,398.750933446139,319.093066583185,272.83582287965515,327.2959848980176,275.94672828709446,159.73545599451134,180.11809779350872,139.7455314749485,204.8985879702919,14.086927368990864,435.6008726031314,252.67418588651748,498.1738146101812,215.46570441976797,66.59670929029615,198.5301545553224,127.36437323878258,261.7426252179983,213.90983759132865,50.77721097854082,494.29452318133684,198.9595210253785,228.03263955612275,481.7891300334992,68.81319257149232,335.8447085196854,156.6184969168335,299.8674889562349,69.54178625824825,61.477384471126825,382.4697203360939,220.74242181066583,194.6337768582247,52.825895949863536,43.82255518836431,438.86673852424383,473.7822041676399,474.4384768093448,450.5165789108603,289.4662667705512,387.9172831943224,416.8235952353078,92.47729843218877,445.83712008523736,204.1837970641357,441.48900600167997,90.94228719898057,69.16060938450785,366.7850525287689,340.42351784599157,445.9262619733901,194.06180729615306,265.04284022543635,279.91069025138614,60.73983584805032,27.961124874439914,354.222603655976,74.83548119721118,352.8053177071159,245.36578620611073,325.4225756682239,119.83513406288526,134.43855383744196,182.50432503007684,27.848021314709428,401.8789535538304,469.64513117204973,463.25763175062895,188.22003565381206,320.6098711018427,7.1095500605949935,382.9010654045322,457.2987796303465,367.2363988263586,493.60151573164757,78.34594627385172,279.5421097483162,239.2032075042808,90.33071696201777,280.8611865206577,121.2737298694646,497.7343711875561,368.8164455941854,327.77829120387713,143.19704032617474,103.9818595564832,2.636704129541756,155.6897303418493,409.68494974922453,465.2899752047915,133.85317851767553,264.42587025036954,229.59370628076914,195.65219588067217,216.67410344570848,41.62148010250944,180.2494532716471,324.3225058599111,407.3125886074214,19.392603984437983,414.9730450293124,12.392481670179144,7.407804992284217,147.94586344307336,0.12069094105793265,305.59870972063044,427.0516327838202,276.03914108193936,301.0683403169123,165.8859986486404,54.487017571349774,145.68567304357717,348.69490044860385,160.68231603005566,334.79800448968086,384.6333779234671,212.88777668786375,261.0094181235476,75.11334328877683,360.87178863285254,108.84911866329661,458.3685463560373,170.0900977085731,486.30076119060396,118.60337821131395,134.52845646101352,75.14310215825992,462.94138088875,278.98020244930757,469.3402556402738,312.0967701700481,344.59909477147335,131.65296041950668,418.0756324333569,154.10904160418838,88.24721095597377,83.40782003652004,408.67029226114715,247.7150502062636,172.05347496388902,191.8137037341613,0.32765698276715494,159.01720111154094,218.6094615674855,238.12504156539836,331.9244332351606,302.5212964690137,253.97028636388063,460.4537453735933,451.814016178512,166.7263551506514,40.67476691459204,468.2181402535124,223.18394387618523,301.07948973652464,35.94123493727297,371.9531007786021,224.93606173360058,72.32708611122096,318.62646377846835,183.4747990741371,141.30281627830675,156.6251687277852,452.017837012334,271.9038219881874,63.41116493946697,293.9969539282018,374.4084502474425,135.2340649042336,198.42085168431623,36.14692902318828,260.01860525197105,285.2977502506946,421.25305893669093,481.6012395363529,483.1473164145148,145.9775974736215,291.8229359276623,319.25833216861076,379.07192696653135,451.0213714414205,427.7390666821755,237.30723213306038,255.30666246631318,108.4572367665102,147.87428363301115,437.75602105512036,482.6654537777827,69.4891634187822,486.2239121068573,44.58760361570191,245.96344074616505,302.57276806685405,485.39944939717583,98.87001772371006,41.5218192140957,432.08970131812384,341.02230555959954,179.4942142175664,277.1383631491159,325.57156407455744,185.77725972846372,64.48075510755224,499.83025164421366,248.22940386897864,482.1992469817168,387.55861185712547,29.98401512760529,185.12182809959566,329.9665763967614,333.4697542175038,333.87037979707424,388.73306898895845,240.6916783808255,214.27244565293236,69.0935521281556,47.6203459293586,407.99604641989686,216.61944463624894,376.65128216992747,150.38557660654993,144.14713272055047,315.0586241622666,202.76987325401942,94.10595056021643,68.20741621610449,302.3659809598565,430.03154837968606,454.11598460273484,426.8035812336884,460.725220600683,119.46203100742659,226.91950518624847,45.04235415914815,207.1793011197167,55.26291262768568,480.22045005975076,149.84669830330577,97.59298410472105,406.2138845540323,63.00216715546736,475.0997405601469,474.4335503770898,249.37076245138556,291.4738991535496,437.2268138808781,82.32566710476674,213.67568179589534,131.9275719564943,399.79002565949287,287.02772773935203,267.74159256668196,68.3838584961366,381.6927683644974,227.15923681419602,263.326877086789,393.04356709814846,136.66689144102716,294.66689991830543,89.93412738201701,474.1908508933872,358.6818451026025,47.52029765404275,147.36590581473362,6.381928711656548,34.2194968226216,401.19375219966025,203.64295776069807,449.31870124551523,21.38201884671065,163.0371758535033,452.8694381509798,136.7876521980901,370.38981072911116,475.36176495402884,323.0684228660808,360.28945240603707,199.78579799751805,94.3556932860753,327.9389458193698,453.336416207299,288.85105643246334,56.168553867678824,50.55861478166701,185.2903992666398,92.6478248669318,102.87414450933896,288.0533308318203,53.64491825740858,471.1363281813703,334.96389727214506,123.97967732206416,386.71036193071893,202.65521558675005,37.57168843473979,15.824877297981654,363.6669135146401,437.92192490377914,189.34155774637406,208.01797602352855,239.6701710589555,197.63604410944947,423.11867333499873,392.3530627766183,158.48785431039124,422.0499588247002,379.2610512665129,198.5088896093501,90.84270011336537,361.87086095192035,464.347315934825,0.41020549938852735,131.7145922261883,266.5319951897723,397.31722795534927,175.76450329327463,410.8943003555393,395.3203910740947,78.2880617128917,5.1226158720028,122.8932091131032,24.04734424586796,232.41836576256281,14.863811921768777,317.2895837433209,122.23605243339675,208.66136462627082,101.85156186511458,196.5931470600637,108.43115648220858,427.6709614515454,448.1340837643705,461.582322977207,313.28179379806386,154.43656560191388,223.03633101376397,352.028367021422,84.01504228261558,481.89153209183024,292.213060766938,39.72500327207173,66.80349738492231,487.8014113234831,101.02294452241034,490.99252950533713,263.971118356526,125.39437323972935,95.16623218354125,367.1165155517452,470.8616910706698,175.97705995903647,471.69693984438345,368.62742265399817,375.2614849251422,70.87907696553263,430.00789842257683,151.47478135668646,223.20213074300378,43.85587274430658,369.21623707097797,31.602379757770915,245.1547786581537,32.524598771391354,163.94672240181828,276.1515271233899,80.37301009671138,30.2110433392232,463.6303324252661,386.5056079011181,227.25525409236403,76.83400826712206,52.18599921076405,145.66720511911424,493.2998424645717,83.27825694995705,320.3360156855237,267.5062423660276,394.5654675794724,318.1844847909127,362.9735637657653,210.31361837050633,33.09846343388389,156.58961230684343,119.38230934542993,430.2860379095651,449.6597504013515,467.5713046091796,55.258413513913254,480.89291433833614,465.9163192548357,105.96545785689293,451.75663505103415,211.16695018355992,220.2560702387385,321.712348164363,402.5684042451685,143.42093594474036,206.2525117505646,85.79645965067972,5.1143109079140325,144.71950583734417,121.6290375407626,383.7289503384389,103.27285773526785,212.74857114586575,202.20068057674624,485.3161803403858,498.2161008461412,412.2815999875349,435.52295168751397,18.743318644892646,210.78466939155626,234.84171726229542,260.8838499173549,443.2740937513449,446.00182259116986,496.5570142396426,283.0313798469564,485.83765501400313,340.60982993451194,333.3837122567843,87.1301048985701,314.2668916219297,458.85671583734467,282.11885121529946,150.69989367919544,263.66124899948574,193.09914736559998,204.6918161535758,380.98946153065214,381.48340524776734,333.8903350025851,243.96401705135983,422.97154506124724,426.02182467756046,178.09274258072904,20.54192427622803,293.5342666837728,320.9049042410286,131.43845291709698,196.74144353265766,309.3070812037046,390.69147460585464,99.35349061106902,21.909245658475406,424.95365025531197,321.9327115926576,455.0464800200973,218.74565268598812,494.69309514106266,470.30274218285615,225.91862073388725,132.12417606741244,50.81444413598657,118.33487942272237,86.01406138698309,40.34108263050307,113.81956531610749,453.7062876703413,142.3393910804387,414.71403359247915,472.47647007284957,348.49506627972573,16.54756227432108,340.3968067965948,242.50615613734294,223.21660331068304,425.14367888628124,394.2870484505193,136.92176440149183,440.9519678439591,262.9082421346699,106.95457174229728,488.68012248957984,280.4068437158256,364.444938417643,469.0972073059597,482.0939817409968,320.9053704109188,432.01803525844326,95.91849285387887,84.25186784072913,257.7220358772211,232.7141180494232,468.5768105826955,436.3684769136099,100.73868016481657,39.34872540058976,85.29348032451279,478.26919750029083,272.3248278833813,72.45244725488153,108.25534154705451,236.86745044910717,48.11716917010922,475.08949657635844,141.71536834062493,343.43595500861613,199.54774766784877,29.551434446961068,123.68165715177348,15.400705285412265,230.04488144882984,438.51345213584693,499.34731070918514,464.6511743197228,195.35805287954156,138.81410215275736,419.205346705457,211.28358558232406,241.01081412191138,36.07535403130691,224.49491223203322,6.172514012437125,54.0255385064623,245.02433302000625,386.89897834625873,407.04779263473245,119.47480695042911,203.88458823376797,230.562054093128,121.13477190012489,44.28492096325909,334.81259777847873,186.62174721916423,185.52681449382234,303.7905280432955,332.1912159098368,139.2058691025092,376.06876266205103,458.63468791756577,78.27885554739112,295.58251371206467,254.682389731977,376.2043541985456,473.369230088143,267.9720290021933,359.23205968534853,234.94014302321077,487.65798871651776,459.9685745449182,27.032660613448222,275.14118375546116,226.00900281811286,275.66493321422814,183.22923661493041,346.43021320367194,2.647829788032463,150.90279997729138,495.47428268761485,466.60402829305514,5.593503672089772,489.93488206097913,149.97629999308748,47.44325176977326,70.7002393267825,107.08018569520372,239.33758362360436,90.0865268295148,376.3434523344192,186.68878920648302,466.8576174796194,158.33916971776708,241.2123884479317,408.5753460776236,239.9508025422893,395.5580984000672,444.3350745626584,69.21128890577467,154.52955326076378,412.32194637997964,143.8643206028273,357.9367111362449,239.56355028693278,100.67025310594401,375.0726174353858,292.71866897599705,17.703721112342752,117.05721176027994,374.3757208595889,263.67347845138266,255.90640926562958,245.1192565413436,203.1442754763856,449.2701739677956,76.60392916999137,248.28180001060872,66.33113518709854,240.6622536745736,478.8123462357452,318.262166502149,214.04223766240415,110.82458252029382,473.41935447740855,201.8128694780652,310.33349024959136,103.30243801417028,237.86220371335165,481.5084390023697,267.2132744066823,22.203431578827427,362.08591139464943,33.214783980292204,360.9893941780907,94.4282170439713,164.5238653171227,410.73756280374096,351.6758805849467,469.2701940888635,108.99162603021418,230.41851923240307,82.62931813130604,367.86884882573037,487.8470831878483,331.8532833282235,67.94034969934826,62.606166181529034,378.87404768758626,243.51563696591293,464.85460230931,176.33006840297872,369.3248013549214,449.93920800288987,402.8557357857905,351.96455943556583,140.81453660067834,476.9623466291236,448.96693471178537,343.4332408808447,310.2902065453306,109.89210442792263,335.8716555449811,453.8621275291481,127.36726114205655,299.58113265940045,319.4185878653801,484.5984778682042,96.03071000826714,423.1030254921282,144.56309758062625,277.4718754427603,68.39047020168032,108.33096270642484,33.129817219850196,7.679777675797528,304.66636785593425,340.9509377059897,40.12038356179903,489.8613395132555,317.0475766079357,157.48507536006994,272.95575758495636,182.92023096868058,490.063112437221,409.1998182635419,498.1424811300682,17.366198143784707,77.30388780515507,385.62186134278255,339.72186678605965,485.7159787364823,477.0332408000049,5.117825448626934,244.31193273602014,3.82683933486061,102.74302377024236,443.309921970223,396.617165054249,470.3840131166639,212.1786938809852,354.1458347669917,262.9131460813231,172.02831328109613,166.3184305187928,242.7314951558034,138.68969722640756,56.49558187851622,332.0931252410954,467.30647326876726,373.5177620267608,380.1154265186871,340.07731329614387,254.74264179796347,490.89031410232076,308.94330929241573,457.1535847403565,329.27653445438256,275.12445479961366,420.4182111859409,338.63249684973516,69.47908192174768,367.35472339491304,138.31298599522225,131.09842767031955,98.81948824488308,354.8127832446947,126.58703244268077,213.20922242971685,98.96072300548452,101.88049521177234,109.44571713048413,377.6741233014692,448.9961034248272,350.9856474599522,200.0829206265925,103.46238713433031,284.1358631740957,267.5179214829498,21.302667861299973,46.49448921210997,455.95045931373744,209.94854419363242,397.94566868406787,227.0160227495328,430.3503866007093,197.2091944431399,282.29084009379204,80.54163574046514,414.2761830458377,263.294360298882,275.88730962845784,425.5900214573924,10.152315811655765,93.3131321117776,278.72336467169924,446.1961942670839,336.5352198894587,372.3531013444796,171.22711305194105,272.5615777137342,396.772172822635,132.7996735249949,395.97452299206725,242.36710731651257,420.29488850370353,383.83632383738006,93.85084625216011,14.383147691639397,402.6374634796598,376.08724297118846,341.67524971262276,50.62926405888257,145.38051878918546,284.40372686571936,4.662709229405482,123.36844782461066,58.7075885505659,199.85594988833822,341.49108085333114,352.80681173746865,35.1069451920405,399.5564088893767,39.886210029082214,223.5854490149548,85.42679415515686,216.3987776678843,139.39982001201756,54.29997783550422,247.86876125569802,39.35588289718617,359.7840833753298,367.31549858003143,146.6542170043703,409.1302652053408,446.7213369961685,18.41820998929089,376.2865224952711,191.9998226364986,378.60288188690663,228.91453307027155,261.1027471595101,255.45875696400145,476.07047870450424,40.049568500135855,89.6560263780386,348.99384812783853,275.6286279657316,368.3065512776262,397.6384467205156,306.68529619853336,442.47098710565103,486.4435470020048,20.289327675848234,150.34697598698398,335.62216751280494,391.4107831750403,293.7249327901105,467.7635833073993,406.2130944297484,2.4250584015682586,112.82866068932407,198.2404665333386,280.69592976026104,267.2945193598859,243.67089917929798,123.22281193754137,128.4934061429187,357.6847252421951,438.41493918637906,175.79088368395978,235.19949363715375,160.8671052577959,485.0915154231088,327.30301391321836,456.3786952700033,207.35421609706762,372.25346431560877,488.5056270500349,7.229772985970939,452.2766857447792,474.06063528012,77.75103839395715,460.40810324690926,140.9523112824471,13.09300856592377,69.85719490351016,410.55605608344257,89.31582871515897,381.41717511866693,162.4085474081609,317.5068387912879,430.86537003087557,395.4276130438621,76.36884131761023,35.25657397948956,481.026521722265,204.74425963639098,151.65221305336775,419.1319309747494,316.76284109499466,68.87411372568053,105.29565522868822,38.7734018865572,256.7138800970805,295.18767226730245,347.28838209683175,350.27729217846917,329.52512877621945,247.05146275468047,120.84758309097843,472.59949045835015,90.74390035047043,160.09705674264652,432.83486200473476,231.89398310617372,120.55869653901074,329.3270591290547,286.6640550941707,347.24051420121896,238.9404249218079,344.83178672323123,376.3168941366376,307.5068119471646,57.74162601379229,323.57003848530564,341.33337015039547,313.9360774102823,485.0453627748549,136.00762737772186,147.94291865405495,346.01053555068927,273.9866198722133,247.57532602544651,42.773961644214765,375.8346380347396,194.06644991451316,431.4401516099177,208.43467216411625,453.68455168093516,146.90191632845574,495.94998298478157,386.79358448118074,5.906833634602537,104.50322733835526,217.85008733664714,15.046268125965433,236.4106582935095,318.6022812806879,158.99615770459164,468.85345287221656,115.5188366212191,260.511115682181,88.85491616275864,15.722297493198646,180.04029422381373,50.36173597360016,306.056234269363,187.86708987727195,147.60600381243637,369.6568698045318,474.1276879202574,161.79204535166102,319.94520844615613,129.38712059136571,61.13238454954162,128.03264424313832,122.32481549686536,50.655770025357484,294.11467135323966,291.09621961918697,39.92375354739597,320.72454584655463,160.40736563087287,416.7876409859244,218.97806794689478,303.86009215165166,250.38505084004382,124.5269318047858,423.2933640856874,43.23032708140539,142.7643274731708,475.44517904297777,203.28492020051513,112.9451018820018,234.49761128867397,437.9874718565283,468.44623655560855,334.1670763536895,86.7862291807049,396.0675355643479,378.84908331731026,390.63769842864895,452.9359350251524,410.53663310632794,195.92981054985103,115.03950240255334,378.0772543543298,456.6501698016292,444.0023502692189,76.20520913056971,101.80310814576721,355.36706534841653,95.09736320208295,55.7933013278693,95.38094988785429,416.34104335026313,11.581542060182137,225.50764836490433,141.95145929302865,276.8523439475157,25.448676900314382,96.87782542241341,189.5153061854964,401.6598924155208,112.86429467005743,345.95626851025975,74.18370835348841,38.310702216804216,221.3867998016966,33.105206783786144,174.65372542940682,439.4016988157381,265.5433525912978,215.72501488733175,366.43905672001586,70.4913131311522,57.250761314939005,328.2282653180795,40.34778726524735,329.7858838108877,136.54065564270812,336.1526864814393,172.87017374446302,424.8424087985995,414.49069556253613,298.73654302994026,342.6552921000821,462.42152469895706,87.6146477254125,121.54473349099293,282.00057493137433,200.81683938915552,261.2409842599547,313.2827317455248,256.7109583427316,140.9204065805827,182.02004287896133,219.98644480167272,416.8911586616114,216.69236842264039,295.3082804866813,218.28640755494433,149.98456645131608,132.62341599123982,405.2224600042723,398.7321303424489,499.5854994539017,396.58894895083085,325.6978438253224,74.9842235388205,447.0299988540771,473.7837088952451,98.83755608981659,473.2714991742433,434.7909596232602,499.08614863088087,204.17200417597581,59.973441994474626,41.87767739920412,229.09917201720054,74.0355673971208,302.5809529668593,86.1258087460568,238.1816468040292,207.79491133837112,39.044005504083934,107.90913987948569,193.74075500964506,318.37790295379585,241.62234890128443,25.480989369306318,272.552874792372,342.93394269197995,60.02157755038206,219.38677954623753,439.07084354398785,237.18727186298761,180.62014230407954,81.28159363672438,475.8870815911969,455.3297450474355,369.3318249276538,98.14489659768843,51.1050838463476,417.8074937904416,333.8020567908686,426.7016028775389,77.01995932578609,270.3210691906247,128.80090150362943,162.28027219906937,37.70378848251421,445.131649816079,382.9645491815916,286.753507329729,269.81470243106696,377.5462798137742,417.21689773303217,101.200890139725,242.82168441044405,366.39136679792506,381.4102061167901,360.344071790891,498.1214620549018,132.22321579945262,311.78433381224414,452.95130803885473,290.7740994065474,460.86596687397616,53.19930111977966,253.781521091896,121.7754826011832,323.720224167653,53.825101253476504,102.5956588961322,182.37378634757084,437.0012081034761,12.496346179354578,76.0832737849746,230.76259787673715,342.1470843596441,336.17543130775306,249.77450353716657,70.95167705164084,435.1321256795551,60.07282810176973,366.64193056963524,470.3468632974471,455.80624750321977,378.5566165502647,140.28141974441098,33.3497588695072,147.21800934542927,328.0560966827308,362.0262445792732,254.45435798419146,21.406045273329898,114.43951852147582,344.68740546741674,414.9245343136524,354.7290984658239,102.70247760036978,287.01044948133824,486.9410117457272,300.267281935641,375.72259620572055,348.10451928241235,183.29752334436157,291.18281133517456,433.35613568004015,356.3498629759032,134.33259993695623,37.15583126657152,61.37935530313199,336.0464373160422,94.43012900895131,338.9730271009156,317.60703515986023,457.6834191733825,429.45130740337265,453.6910712210002,149.8046633261658,474.53277012864413,457.40206420237797,395.4450811964409,439.2806721874558,239.03342966375442,76.81154001024981,56.70460953941936,92.41954444221956,272.71237633653743,467.24614809752006,302.17911737489436,378.27549590272713,253.35035371783675,424.7785669473142,497.847994254382,427.4586515357397,449.04588500019713,429.9517705707392,224.6728905403431,168.50644804212888,367.3874854241649,491.345095727328,460.3242961583246,480.9859379345204,355.3888946498501,267.27743345844357,52.85510752953937,355.9616183737835,170.6113109097651,196.11736364964995,480.0324127832123,67.26600690459428,419.147405961803,426.70566568632694,83.2262836592168,175.04165651074223,289.48469293361734,161.68645396151317,236.51037058444402,401.389085724613,162.9407895606071,225.0100674265907,36.210751751793225,374.65920067690996,477.16935342997266,356.0824219252231,321.1898054443719,200.70623994647673,24.20670391167834,296.67131442726435,403.46520974179833,333.7789849606531,331.19841696772534,118.64962402961233,484.36018727067943,393.46631350225925,465.2808463801611,458.46963179238475,74.04149658230985,160.15315896352956,412.83504195522266,275.5555856578962,116.79382390229776,435.84145354825165,55.19551518155985,227.25361509781516,227.5510319646773,424.643876383615,384.2731971900344,121.85668535650707,60.67905999720091,373.9558459968818,360.6911481388405,229.36943481821447,209.9308180793814,121.0164776732906,90.18750882383975,183.46319794387668,324.8244777253102,97.56405072041152,169.9660271842558,448.25555917091384,12.406960942714429,327.99255280178306,442.0022795981563,497.1018129379462,498.4914426300181,251.16086403378813,396.58164840417686,167.5742775472857,215.24467484536635,255.27432181546718,483.1341861514008,132.46108067976715,212.7211138341607,377.75072303580316,48.96832389689132,257.6811763181932,220.6781640283394,33.2128128128022,54.28803164462237,279.917154924443,110.13462139489616,165.09914650795378,41.88484082145172,353.43669338739505,234.7035225290941,353.45700456484565,473.4257571757887,37.90986296534038,188.6917549601128,336.60128715206326,385.15875781539154,69.26330143618542,265.35372370081814,432.7223152080435,178.7093284021637,266.9602683123008,290.40255206779256,371.48610740732266,401.4166680652005,121.3569708792448,137.19523079893514,388.8851950463291,343.3269556786719,409.16240150782744,90.46316058536475,87.98548049384969,233.58478629395373,258.8638017968697,298.6440556599977,456.6100002638429,72.56250228014127,291.2230422961479,400.1186579965369,259.0009488575068,457.3431745326491,488.40187188216197,83.54455902839241,251.6722334769811,451.20799584181736,392.6164577182604,260.79364991331,458.75321295882634,377.5197033871253,328.0645536470256,180.64973580410503,350.0415932270614,279.0301833857086,486.26351466221473,466.22227241271884,142.0351872096012,310.4013369270879,303.4599515074109,265.28623062754133,5.177463973801699,467.88245393712515,191.61679666276487,262.1030051317771,479.2895723246463,287.05098799129667,51.5348940247492,126.06324460163765,123.408673548708,396.8709618487256,289.1290160362726,477.4978261198751,20.125139759812782,415.9983342153899,192.51309648217295,71.30623019592852,424.15198492575524,133.1089559388783,404.38691707412386,73.86163609512198,233.49604619025766,267.0544776417498,267.359317156752,54.39737936499056,449.3499261954337,285.30683698024717,291.6310063732822,45.30231203350532,206.66461042410677,289.82880138362043,365.0902946492124,204.88720234201708,317.592105310429,413.88479249775776,187.2227790741965,131.00281833899896,105.69156337385822,17.30223790109775,83.58737291672414,343.50563088192956,161.00822693897422,488.3265454512137,332.4339030328176,291.13199295933265,386.3703237113572,310.4941561029112,292.5005963238085,181.89915655678124,31.89851721812076,463.2101084022378,76.50658003976152,364.2044045781717,343.93059638955083,205.88634812332273,98.263803564839,43.377017003958464,278.05687163501005,42.991823367180324,240.96930051250231,118.78325333900463,467.69536620972764,141.0182461112446,98.93975785234532,138.17216850717284,470.87999166530625,450.1164906359699,26.308149755251197,490.2730985665838,316.28062208915054,383.8935743852828,259.42092689746363,394.55764371561963,381.40254834667587,42.21320447236021,74.53041086984979,224.8758114522117,291.2511189991114,402.407508354632,263.1371658562859,416.97293219025966,465.5459581164011,366.3530799517443,264.5141685141151,460.48880769712616,368.15350322015826,29.052155235404054,251.4426232933745,153.38905585490548,149.79417194321687,464.07087792461033,43.28907959999828,445.7183642593513,25.099956105443468,416.07469326125,371.6691100540982,261.6658077545381,34.278403699967484,48.98315212978088,427.71043793036955,180.47852335880876,243.91244239374055,163.26974132037608,163.86149521787829,22.52447084923204,450.65672631752295,244.48384433783687,381.0470588395245,361.9967906142947,304.23610948767146,285.100094402939,432.07750399124234,137.43159762316105,418.4631364694609,185.94014548442584,317.72866733523284,79.4358377238602,472.0767153237019,212.60514005719833,265.95009247280075,416.3979329313223,438.0745763941497,465.9657489475351,26.235476796910294,168.96387947304902,31.9969335928445,76.2486084542392,393.51021212579406,256.64352775705567,255.8720161071769,115.67698777168978,297.9247439293112,342.4205948278336,288.06969579397304,93.41607729632229,385.640585506365,253.666379822589,390.40968657097363,373.0728348933707,87.07580055768838,465.4062771103054,492.40548398914996,328.2091483534212,452.7338792130512,401.75341855208546,37.148733095133004,347.8465513913053,154.44919586912053,302.0107432499317,305.7656997390401,396.3880143958033,299.41051075896206,189.75117250460903,59.82596893124526,182.51488446520514,252.06811325237487,269.72508353009925,148.50267779644622,349.8656424353267,285.3680803309665,30.87576444216211,335.45315747915186,2.9951903903685517,35.79441917622128,149.81373838911006,390.9898921704288,94.01155156053586,149.32150706082348,155.41668108512775,39.09653412950054,446.66843941504317,67.9732639121512,114.91679515740849,63.82786907997029,48.18552415059407,85.79046118904765,386.77830862465066,3.301060038396586,228.42073968197042,270.5236648410754,356.3244733546439,157.52415534502774,285.05677836427714,486.2134178221399,284.9356843261273,218.55617384111105,105.38778963552498,425.47788232788406,325.4340782911399,445.472050284886,295.25923673071594,319.8224810316681,458.68988915314645,142.31222417301436,196.92199529116016,222.6643015064388,43.87139002219331,307.6098927187114,303.8277018155983,78.39177922889051,116.76788498538393,145.46171057671532,434.51794690919075,18.493686826746902,199.3689867841454,219.60127379515836,371.31723574226237,437.50706951302254,88.20215526916675,224.41859330423574,109.47658039777863,346.1178890514016,146.6639802245072,41.92414710328285,497.16840405259387,113.0802703431163,278.93892006335375,444.86326366274267,177.59991009631082,337.61849674514974,80.61422918737637,386.38997795011545,410.07199388667937,196.46104991322244,29.995693166093073,290.62379193566767,56.93544843280529,444.19436242127887,420.6120217052401,98.54737550654247,287.66512753280847,70.27861059636864,22.004445647059832,193.02902365226714,440.23328951269457,49.8445794149428,427.51024211369315,111.40384033591322,272.6306957814141,327.9455465168577,13.302319287216925,34.10505922166684,130.22747087669052,12.006029037936905,396.6707808924579,231.23475514526282,83.56412251342992,421.9548001272645,338.5263384504721,82.36823867893528,379.1281870899209,359.3564751579148,27.86344238460181,257.60845960823264,447.2137527731509,471.11355768095444,321.07454780739874,249.30023441226658,241.07036045629093,470.93445323844094,296.8545865644969,445.90268296770074,372.0299791525349,6.554564367119542,482.79631202651586,330.34320186621267,266.98627173037306,225.3708424194911,437.5708421800616,298.58313602860056,316.34967837500005,377.79106128209196,124.92395643585441,329.8743364531109,458.7592407478598,393.36800207152436,146.40475343572191,342.84385393850357,355.15882798394813,217.89817106933663,396.4465274424542,49.080277718991816,198.71993019605415,285.4089252784002,231.26340329365937,33.68191878301108,139.4199204298563,498.6128657373513,150.37321433579055,408.67975495147135,219.34021177757,159.40526586495952,371.5923188224535,178.5214429647657,91.41889159467165,377.64112614277457,92.59487789222686,492.3709543690977,2.0706068702516234,230.51520645503476,196.7891435192878,135.70943104167844,456.0530770905647,411.9131035745988,171.87127621634025,171.10347308496222,423.22985040027174,17.754159246289536,423.54327251036614,217.93484630388804,139.46230887302224,254.05040350914265,283.68714426956086,476.00715869560094,287.95187694352444,188.73873463888035,457.2334373784468,278.23628878474796,218.6784035655377,105.61170879550086,217.84729273019843,148.31363131788999,451.37582216979035,307.5476478251752,131.12804078457984,475.83358088403884,389.3157200838701,411.7852134774643,225.73234924661656,459.25455570318695,487.7926157036432,233.44267245597428,160.0880314567499,452.5591145886998,8.244291423997186,264.1493542122766,410.91289047453785,118.13497997242084,26.101283300317913,223.799657200366,178.54697257307384,132.46458248739845,495.5948092527458,128.11373175764263,213.03860638428796,289.4781056256296,419.34617880481983,140.36680363053455,306.51435204797497,284.0091142753649,35.7140543872001,302.5031891709972,443.2941529356742,81.40025480078073,154.4409372358353,146.44592289145064,8.032402330791054,290.23861272434624,167.25788828613906,300.9942895768195,423.0858861811497,240.24178857162704,328.77235076257006,284.56941646504976,310.1360871457378,416.2881690708143,384.5117255531868,216.39642395221304,222.77815098535737,143.99485738805328,172.5467472728648,273.92488873780843,4.8602111413177385,280.3622801395893,103.51573172157846,130.72056683028853,109.94112495822162,459.3040112316281,175.99410444366026,309.5098959451706,35.56304371104824,187.18755994663726,147.12749975968632,325.30104692047325,126.84071347388448,28.18047897221454,459.86552332746476,37.08221672422574,241.98410827989514,141.04203483369938,308.18503586130964,393.36411027132414,482.9752825456406,366.89548511581893,201.14119316184232,167.98758943355318,421.53000896685677,293.26202258248867,390.5982095912324,279.1530633565734,457.6265417177796,425.80671005321705,234.97869616948876,410.4516140413299,118.8412719166707,173.51455334165254,308.3098963117523,135.5560590820335,10.02123683734979,238.6951811691822,96.40897448564911,264.1460253075737,371.4275172494497,193.94759107096417,77.54393572549422,379.4570354367983,461.0030633175902,244.19066381687216,42.36683799619001,415.2909951288052,31.582442719349622,392.766135665884,264.3481341892058,71.73385627805618,271.895714303779,202.67748896736205,20.531529114383606,302.31794833973237,153.67786786463267,146.2956726556257,497.0330138174026,369.0832159720082,111.22611477793399,254.9326379666852,453.3767333671941,248.45249357591925,62.623914632526144,348.8781641802181,20.729725726164048,173.5236870846921,87.2687173979163,396.3404810846405,424.69949563092126,185.07219441765554,330.4459749656329,18.501160182602728,10.856983433727985,119.43733239751542,85.36948780402199,353.826344601908,361.3309836118933,394.7434174025057,325.5376212127078,325.0415816456738,151.69266388133352,455.3610922469397,277.189834781728,107.52807053689261,378.0270589680079,142.2721721860325,42.22402033259143,248.09602372593875,440.20192698759087,16.308833778327593,367.6293608273505,269.7005185195377,330.4566752476644,313.5785695522144,327.66113926291683,344.4704033304246,344.3714673912074,260.0072071706567,413.70390030940706,493.36222783772956,327.68140214971544,397.20585956429136,423.6676787313538,23.1183050376641,341.4439854959251,294.64408644560734,210.99492092053117,101.57051463072564,255.25044810089315,52.60263945873456,246.2606361311205,351.00653496971046,288.0510301918573,59.20562754081571,72.93447702321187,90.43010085212944,260.2159343892819,64.86860928374894,75.79116209506176,71.2936237258961,367.6449458623615,493.25239032250903,410.65408107390124,251.73096425697173,292.2171910837328,122.44183563008393,100.20357208612573,108.3983384211893,72.46451085028882,416.1164986042847,34.37139850828774,303.2240871091568,73.39287108768266,73.76961684035443,274.9748492728591,159.46432368930675,296.8013665573742,8.273847723428872,202.52385437513976,448.0674197685333,106.49277200242047,62.734467390542,409.6308194266279,499.1697215869552,226.70307269617285,412.43612814983675,341.10833344651417,407.2026028156961,431.89086728124926,382.19123895888885,363.2287524461416,474.33607374374907,435.8402885804261,432.44515130006664,385.9957805907334,35.00063609485471,498.4436792374056,185.34254464809786,33.94565543368255,145.89923345615196,20.074037271901158,58.178755340407726,115.80049318349428,179.19845795643042,61.48470544110507,162.60482531018616,211.74113881820554,235.56896826677809,291.7318370170519,189.19454165761562,186.34067211482252,408.48096250336243,50.2693105826415,100.78724512981485,83.87490398500542,124.58073490284517,53.21010773692092,367.2918176962328,212.12067536679703,31.25807913298373,12.4297716945444,348.20132703199033,497.9995416187506,243.50987372631826,318.61835550735253,463.4625825999219,67.52100168909169,75.31384256778028,455.3372674374674,363.21394875409305,423.46157893844594,144.31376756402625,413.83866336059305,429.92628741291725,313.86364253861075,265.2198155154903,409.0637725244496,149.93003060798048,414.10332623903355,249.32184080091957,273.7752779171857,78.000436241904,499.1772988844161,296.83193399029216,473.79379145953413,259.363205127199,77.98530478141019,130.56107927713734,173.8105880702162,246.25162742007356,348.911932901675,318.1316417738843,338.4667413048272,247.7206350604868,309.8162976711815,115.09571494372528,215.09411162619983,493.7922868816429,229.2463025947241,330.9273384273309,389.9950719541151,151.59709160269387,5.781560014447407,203.71808535580539,73.69539829446936,183.47840016082117,355.9269902225978,205.77716837299099,444.66250027282894,233.0923193002602,422.6242096175706,148.78715270737464,493.2972787743357,134.01588176389623,309.53630324710934,427.6639870573043,264.3046377624695,458.60218350791035,373.14374971866016,340.6191621337653,448.1888552914265,293.9560384063551,15.569919859798386,263.5118188684429,161.43750964755833,225.67317664430885,435.4805590099999,498.3631084421818,226.18334497425252,286.5653659011118,159.23351383238503,318.14272044713954,392.94521488991916,309.9979214238293,468.0147675362979,100.5844701826908,299.0630238905889,422.50100092575013,497.0860386291928,359.75202835981435,88.58608890241526,65.20632961675088,336.18764243933873,432.60900680463857,439.5883064955913,146.27255834841534,36.319061194926114,38.08268668406134,486.34356820541666,318.65354797867127,362.4664494763956,46.59485707773281,272.85145168540316,78.5471708230745,172.22542545604568,188.82627744180303,24.419288499204384,310.13138782294436,461.40560466857494,117.41638145229416,225.25131912981,254.9188048492572,27.73175913855863,499.38030500626684,317.84652663205327,449.4185384711571,398.5822222764802,186.00687200778043,109.82524698336915,102.06421590536951,197.68257216510332,199.30549445522462,202.8654750646961,25.594729553032103,412.32002018939676,424.5885055752193,94.86301941419772,148.5402233375571,114.8410555696403,321.2041733533231,362.4596477956489,15.178195985529165,124.58884581819251,233.31175717459462,444.3853406454115,471.06824084181386,337.55899163485714,424.07723780952057,459.4998982493277,493.75304301925814,103.73617051235273,103.66059219278911,374.71512971734467,121.55039282662517,83.25935318086863,138.54087258372527,330.18819480049234,208.47323294883125,108.74454547450662,312.1385846509288,476.3753894013647,36.40288468642272,97.98888803005512,106.00229984656085,279.4936407747659,343.7140549584131,474.4546607169482,277.50545592287125,369.01157087761646,29.28589758845157,403.137216676973,217.0681917894649,369.69308064304676,186.09562483441078,80.57200185551427,446.2848061166926,96.94275450434098,234.9482146410261,327.79820236064006,341.07455707360225,219.85604218131104],"y":[348.50518310980107,66.22602020826417,294.24392534799017,262.1191979920459,449.9915264418638,310.16657777386536,283.1995865654484,344.281611309882,157.0305514999667,101.26327751982723,81.52438303229137,211.51570970729384,212.0931117057141,213.2800121371582,181.03331053893456,420.4293076990722,473.24748819639495,326.55272800135737,370.17249555706445,256.4666481913341,34.76301280705596,40.9571247875089,289.46436944650753,325.9841004610391,319.71819403959154,238.3657053564596,44.12128048802133,302.9097211079992,409.97487619078964,107.87983286011793,358.4282067420911,410.9574231195029,409.9800361162994,193.84016987413187,390.7212626379507,212.2100795659293,277.1469660787985,13.10857575228519,341.0314793682249,180.211555268729,62.289564479401925,59.52081501834594,462.04432320531197,479.3958180847946,259.37172506190933,169.91855368294662,112.30563564887052,224.5344062324168,470.1676229936019,308.00311292037276,105.70498491420332,401.62831397062814,473.72444536836576,430.69190153342106,134.0062625183206,426.77794231362975,104.23167245666166,487.3335627471064,245.36113011249617,112.04084783833679,110.86508187776423,0.20023470022068057,439.70680358134064,385.17205733336704,45.432291054188,255.08902835796155,51.74133334349351,3.921723001441113,357.6648862152388,243.41526364031463,483.10307099294937,286.9713800564486,275.0201238475913,236.30101234928736,454.1643463188171,259.8100276382841,29.636035208877033,230.13697862961746,295.25553343227995,381.5149737602208,194.72980478018664,460.7832555548441,419.3624544852154,455.1713753047633,188.69176281740485,121.74573627710639,357.0770928929368,469.9617297124952,206.06230906953482,300.5962783431291,317.44934694019497,202.231258750588,372.30910474082566,115.37058117779475,220.31358971861437,290.78089003019903,56.742001294293964,462.26551636844493,459.9375154109946,109.6445372058692,462.1353915291261,422.83849281910324,121.95189846695953,39.54359647632955,75.7645858374708,167.1239803634319,168.6974033555624,65.7446773216811,226.40770967974134,324.7794276391295,279.8683234404815,356.8328713458704,282.3747813323535,110.76229880119415,48.93287779705035,54.05463417128931,289.41320152005187,175.33405178741367,126.10897168177793,441.88163990958,365.40399632644846,134.63358873963205,353.1400966135486,378.4259246890158,396.60698579316966,108.65964355449943,291.4083718035944,437.69151179355293,204.84709968403104,297.7840777590455,185.46543142230044,233.27310396182077,492.52420168286284,14.228908337448832,184.3071613314441,226.53087856442045,385.2557560098987,409.7682885606465,153.39855941627323,66.19091972189072,454.93950328601164,336.5566479537916,10.158182851988663,499.7785501167165,349.5499489070799,144.9518820037664,335.7121767980083,228.6545356487998,368.163400831147,89.50248689655471,144.31593964501144,196.93464466849485,216.52808143403666,113.18194892644229,410.9572103082012,260.678678623501,63.519857510781264,477.7505273105119,216.75494808598805,425.79926538072533,401.86515036835044,56.46589157740478,365.87107593308633,183.34253372123578,314.61332887290394,480.4497257958793,444.23337875296744,163.9072965930466,147.77477866777576,157.49699258536253,176.46894817486591,382.92626483069023,454.258160543778,350.2891056055487,223.35227078256426,424.61877806249623,113.58901476290839,411.20114669119624,168.7209393985365,317.55094029346344,482.7796699010495,467.2144533021252,383.3140518870003,469.161313717779,476.78878669789873,441.7777087821124,249.89982954290736,288.3306164235103,464.57794646438157,114.84741571099755,474.0369512405257,392.5402063196336,114.07640152384602,274.87164540016994,368.4211275575718,3.2640087844028054,88.59181557309958,199.29727251146824,53.81379581470125,332.79310676996755,24.0284796087461,408.4891803493321,311.7065525066378,296.517743216111,77.14013631799143,463.92398633155295,489.2945127416558,426.1795252881307,74.62047612033851,186.00833065813958,414.2824060279573,295.05225879617024,120.7024819988899,45.28875579603409,303.2583680018407,456.5015866248356,305.27326887267424,463.5036511336932,247.69798959867583,171.95410010230106,361.3867658219303,282.00247487740535,121.5968357714221,223.42248216519422,197.58460023402546,214.3292239741118,205.53438792820046,447.6186116053551,346.65847414919836,234.75867775230284,43.15734446555675,102.01893718703015,184.28529481426415,296.3277187365776,263.1343868644549,57.920987015637635,77.55587746365855,14.61194038246061,384.0994422554195,302.7688396382205,308.7858561626334,74.68018788917763,54.75058366507268,194.12090985195672,103.25617098080808,337.8496529918097,364.44719458972776,103.47134201247088,369.72483771068187,377.0430490384541,46.179640937140555,471.0679161737511,490.3183850505559,227.4153866465204,315.021250667481,244.21262036890934,102.63841946601727,103.73647396339636,174.22131256688934,171.2564830502884,419.78085065238923,245.0005688031348,20.743619406158764,389.83818030220294,479.67011949856686,292.9714119925554,351.7927911794504,295.2393754290871,262.2299581142078,459.61993882839425,386.3241424169569,85.27421176897532,265.17549518786643,425.1344538030353,241.52170045791343,478.32373709832723,202.21377617574697,238.2043209769632,263.03065242837374,387.0970475709025,487.54704035494524,157.04029814566678,387.6835648983914,170.85155721980883,4.838571577017725,400.31366096226674,465.4006746402135,125.16973052716918,244.2004894706613,451.71918279250934,92.36929382648485,355.58007315002806,327.2754370825839,430.079992548253,384.68316011024405,112.97951535681494,155.65656269211559,11.295238706039324,253.3616808153707,181.72007047225014,27.062701417592706,425.7344794891814,224.78627812168762,49.39646951197063,36.761979529112644,122.27390274556949,401.91919395966266,297.1712692852017,161.15222130509744,278.94185436801575,118.72202673552657,479.3793408664846,308.9252338188083,276.8324883091745,229.47840185928004,127.64693320437736,450.20132196079464,401.4752399266255,190.40258848177015,69.16703246743128,93.81457713655684,279.48484427818454,229.45069943278784,360.22197581432727,265.89395231308123,446.381063057392,362.3992973208025,428.0609468534231,298.57158031267693,367.61132140504526,236.07089603836386,71.11177357834464,69.55601191462813,437.583628767469,188.9795538910355,186.9420941289277,213.9588834682442,301.6787113813799,425.60663412516465,111.70024883423324,487.773867002141,399.2998969159855,55.46883649916501,477.50500798167883,393.7434676045891,365.81370346332034,82.90612713509593,277.455556334501,409.18090686237383,125.3954956131017,15.817672387974602,279.56139864289077,310.5138069250601,143.7480385468498,418.16983871731696,386.0543900489023,27.214195177316824,257.8565157133669,131.2544876173246,389.7227171394692,162.6882177015776,499.1647324594641,125.7472005627569,436.8637019527386,172.71605441476768,215.11515036368345,264.8615488439534,239.7350087207857,427.69828576297607,108.46950080513818,28.616619735566285,459.2810426692274,158.21384344643764,215.25923546059278,281.3130743270513,209.63812744535338,97.46114241743742,401.450115093008,99.50165934069078,161.47002548443368,432.3803575266968,166.79181018391787,268.3941575938764,48.698072325003004,71.73353679910855,116.18398179724754,263.052030415531,302.32294306956766,421.76145533378264,243.24663288286553,262.5001461236368,45.21797212441636,201.8925739203049,160.6929377462324,30.119003671462806,379.4185917789229,152.00495634695343,454.40039686121213,292.6235484121359,260.88996326119207,229.50524075310054,105.00510298261013,55.57717386523953,255.16391177606502,226.8525172366198,345.9089045071937,376.2204916862579,398.6352717200381,311.25795405477896,442.5092418388503,205.3206927963268,229.0771775203637,31.35734690191283,28.825818267622203,337.6432031099262,235.28267716743912,369.63254768489884,454.0829312663384,365.7959185494486,211.04915850558126,241.8837917786051,366.7165484975723,345.6318636579035,173.79923797422137,99.41201824486767,449.68470361391,239.8912209847025,385.16285386524,194.4892648333102,114.01211066414929,258.11054892489796,396.3600752803551,294.2303467176266,93.59857277219797,81.89839487948203,463.3976016018728,266.2530731871818,102.4350840743038,140.64797021646402,307.5872219779994,365.6405950093963,166.3625956152306,388.8335247984492,326.5623479674876,241.98227812567873,325.8676814936515,391.34915252623983,234.54811023588852,468.57714347303715,273.70671635812073,153.51520995816347,406.0242775877982,337.8751493775384,350.42836659019207,273.6597861371005,186.21361546112857,56.92786030379771,25.217920856314358,80.64264026633661,415.5690850383406,281.64436391488647,309.49006036136785,202.22522283694911,7.703297034922341,65.09846464975944,226.1288354702222,215.47771116187198,311.7199069731699,307.53908991087917,415.3263215152467,221.26649628198035,234.04750135935305,87.02738495446683,62.34313896217569,348.9133326141467,250.53255647382767,478.83736696740385,217.54133303167723,333.2005844104674,115.28508798963344,109.23530574682295,472.3991899433604,193.76809397457762,261.1555762293282,406.1098804502573,237.2121774816095,260.3285400526897,316.5902573219862,273.5586985500834,274.85260461943585,88.7690379248588,290.5640576293107,195.67704798395468,433.71602980776566,456.22046300862195,274.0157797097612,345.97574323504807,6.342109859377221,458.09215133260915,245.85560788590178,227.48841376415163,438.5918277692837,283.1224499383108,431.03519160945825,385.1508338601892,334.6452784425743,327.78965327204855,333.83954930436124,281.9097806989792,389.6427875523296,96.00216444359944,81.03243872983579,348.3881724790575,441.42274669745996,53.05087658855179,109.07582170546948,466.43615512000036,403.85797872995244,258.6143857675035,338.0443670353077,443.51323977989784,340.4730409454262,261.49473805068004,205.05543682310633,321.5287933869645,368.7147126752913,89.40252891317935,394.70204648618125,156.46462687815998,110.84163834980055,388.17262563999697,244.79313039627658,14.674377150911578,36.7601384696632,332.0682097654305,125.83163156162358,463.879096590616,102.00049924248256,97.5395931866635,396.09753979575066,444.51558156727697,250.09057713075634,52.396936340920355,43.81680098367091,248.59854018623395,241.15635393944035,463.5063555911625,124.0093675856806,20.06944717666881,326.10278480920095,186.5452076118793,352.5488888753675,475.2021331492128,396.5865823056237,430.03627159533255,374.03517605893654,216.06012995744072,245.88622384512826,184.68311740843424,378.6212080516613,452.20545034018465,230.26380963131587,256.5231466071559,385.9877158009124,239.76812231538614,20.8724526314229,45.21044679906827,66.33661128528567,403.8374641784658,175.46635481041727,463.5511648511883,128.25522906316266,329.01314642357283,155.85745998325316,108.65635546239926,39.04093983531431,241.9135811153863,327.8791586869101,311.3136904060262,228.74491950993382,167.5407879728159,157.49068030547863,277.16043144412725,246.06110206220578,5.680135562513899,313.2051277226761,391.3283879571553,48.10975488677016,215.0541890881651,432.00513689103616,267.4616970846485,83.29495195965741,215.54621271675944,490.97708606734614,466.813203043938,415.6045436159306,26.791345266977352,372.39921640866334,214.78326205213628,308.2071587835255,263.1388380334423,43.00469652884465,259.7334881156718,339.08246624988647,65.76692540382456,296.2469630388575,477.0952247935054,230.46363978977536,222.64203522246063,355.38767411383907,430.70888767024206,135.8985974050535,478.0115526463742,26.484709613092463,294.140137674436,323.87149190012485,68.5527385120881,285.5281461526391,498.6059193079525,346.97593091749854,12.898421989109288,350.7546707061325,357.7822496042533,328.3348700362484,24.008067912662966,56.369805238986494,141.5756716542741,184.85368572701887,233.27620251985394,346.48359585226086,457.141562295423,475.0558252739664,289.27622111495344,119.61042457302983,116.76224187712103,396.79715011134687,99.76271216457455,203.28565384926588,441.5865370646852,452.2368534546173,157.11916008775805,406.6341478033695,87.58889185159669,482.80174759173866,303.00708081693483,84.37438847975764,400.65995084651485,424.8575217526307,53.02674673508856,213.88846172888222,261.40090505991964,471.80368655880056,426.83651670861633,290.82024898835857,206.2720708555026,493.5248772075368,309.2479280670524,210.52967055634264,419.7487177686934,229.68239883217768,438.2971913778946,455.27092440176875,439.75692646732546,58.104104865738805,197.40759146834242,176.8750457424383,498.7209618520095,52.74297357866897,105.15974398815553,267.6038174234183,245.52026478712386,183.0238809698449,136.24763281562778,441.4953000486228,254.95390541696727,396.0058227094023,78.5875855931436,413.02663446486554,53.997925048425266,142.7110595409523,475.2574504531163,333.77400081163034,240.90107526058503,120.98993531238267,291.612137475317,458.90037611564827,285.4353080335057,452.1719196810939,416.21883246211456,242.69885270962433,95.51299834158833,422.8844832222938,59.424450907915485,280.4875484337589,330.83035510078696,271.8281818789283,458.34677237471533,485.7535936368148,392.41366503722674,415.974732278429,36.87729684632668,401.5497852187504,105.34647344132031,235.68325287522407,235.7901441599264,455.6060316750109,303.54807668657423,418.72760333455636,476.83680902165185,468.03934965184925,40.16985038064425,290.62166851146344,393.6948182309965,252.02893315886388,478.36101467245686,282.5252748519772,49.63337220759889,330.0887492967639,226.4927865158217,65.27563732300811,193.0649688220425,15.118758883347905,425.3385473954836,342.4717504968187,79.20482728184285,347.9709868293912,271.91389062432637,486.1619800272059,61.442698194614564,8.630206687396779,360.6818939126584,169.36378468406022,7.5220306324196295,426.1882909611989,137.65432042261605,16.552827213267452,176.42382056236173,233.50635568131227,337.01115709803463,126.46592471086848,215.4133713524431,296.26876037808216,159.695775045125,171.3432920672442,427.57065217757173,469.3137068557478,164.8835282220259,40.899906589619285,138.54194039328638,368.367192585044,222.8310994730449,175.53935686871748,200.95715933430114,307.72061982752075,291.3446630548611,78.64190360545953,465.26049925262845,171.61071889533665,183.5823364765673,24.09171215926653,214.05162996997984,291.43027141222376,179.29969016231752,419.3203477419962,391.466443068929,363.503532136587,494.7406583196443,376.04560960792975,284.78392577749577,107.25598356179277,286.414985799388,494.23597671833153,52.492050554952655,149.7943098510518,272.25469305010586,297.61175772157225,350.83677155810113,210.2194346256727,324.83364539474826,271.1885014719011,441.76773045387296,85.96928644338652,456.5746114310698,219.28308768469773,178.45003148833572,184.59294800889114,404.7460409501419,3.7076756287698354,323.5623062773221,237.53330747780166,390.6546328937597,208.6621267503348,139.163912838828,59.67225101551943,92.42627919366653,431.6436902404835,72.60131319467634,412.5468294718406,354.0580370713818,455.44703549582,290.9012282385839,160.6134431871824,204.79890966659198,318.422126852252,452.0381112550866,229.78628073862473,29.41824702992757,177.6558870810656,394.23287361241364,316.4742860435311,64.44551590083991,140.50164018929223,276.50359421305126,452.7962471585179,227.42860957917256,346.7550437682305,52.066428689764855,272.69174246034487,275.31010514973184,128.84652402121765,167.1349033750865,98.9303324038312,306.29884360770956,136.3090543198533,153.32537601670793,435.59655046423427,373.40057502076473,404.6759800341748,32.946581080253836,461.3008035862309,94.38443935215591,256.02575243277727,184.32892547707735,280.25537270477474,256.6130686290935,95.99273264003061,380.41814392416194,8.713102638898018,283.7211191051319,494.06126243626846,9.496701568225019,377.16525625699626,302.18730471435,344.7264402562329,335.22783540153375,247.70599568692586,217.0178485599692,374.4408758041874,305.6295761716713,340.9778266834986,66.58947217680155,343.1433002025234,290.52358426611005,278.603185481052,473.253201159047,357.2401463459998,219.9174820392763,28.098115525695853,478.71797545317406,434.2764027016235,32.47373016074573,233.28407668330397,305.4415655954907,411.0926948006713,325.75520652151914,39.83766356168239,359.52379573190984,200.9425216616054,257.5114862556892,384.8650694396358,92.0596643626731,131.6547984526609,359.29852109600756,479.5802033298808,430.4635645632362,279.3610785819999,333.040080707912,150.3348103776889,285.00128672209837,421.45377602761727,285.72098695990746,235.98852989735687,36.045312254762486,405.43304174397156,288.2898058456056,416.1921578114266,405.75272294827937,376.3213805724531,43.9962912475228,48.75455908864734,493.7952583279578,285.30498283743765,498.03859821924567,61.36577601190829,147.89933976118817,109.99714744040945,395.3802646441882,293.1818015811339,147.5615371337784,344.6051895497878,366.60051543638275,73.50771547138646,148.40150282724508,489.1009852580347,215.1735890134091,275.9155827994628,334.88754026068415,3.5051661999474515,213.3886676854546,180.53087323473372,339.9422585561821,497.5796051896482,365.6607450883782,351.96025397327435,11.970088558334368,384.6121563348429,185.6271736458648,175.09991284304894,12.637550200817804,138.47802989672664,164.73760074408273,217.59775482271436,243.89078763956397,247.509072292728,498.4006702448628,455.0622916170891,79.7470881352128,155.45367009082355,299.0990844964925,271.4245586864087,352.4295438134815,384.30993277633905,322.03247929736676,481.08875890387816,58.06678779697039,63.23990398051815,398.19484894823944,456.4856390448092,31.36321603577519,424.62302983430413,105.5959661210869,6.259495216161981,28.06989438772467,310.82716065462046,316.7532842801397,421.4168469676244,266.7119471618966,324.1366568815008,382.01501174744715,320.43052481389043,244.41211171683008,37.234771857377666,109.52478970942003,344.3997384416536,94.61509389527211,240.4463180635904,1.8428670485798326,130.28163242241152,454.4042827257754,5.3560962984559035,37.57625293546152,27.88311182369363,306.03836877924937,371.44926399701905,396.39281505916045,330.2433836935957,405.8763191643421,34.67894904516034,441.55069944302795,51.40698031608459,319.8848531954427,391.0917017158232,126.62452865086415,199.15762152200656,202.10171641271245,239.70823478027003,152.55640819741322,347.33847552366757,373.8369419427613,193.80636283012288,289.2669848338071,155.97505888534025,259.60807128012243,267.51248707791456,107.71656305327637,218.47284532318145,255.77523692273252,329.60167284107024,306.603795446163,98.96421059406957,64.1316799770969,296.2444558753301,180.6228062768068,230.38932076684327,227.00330483640596,271.60220811956924,362.7768716787482,389.8246459464072,230.677178228337,173.54480920638105,29.018941344039817,131.6589936093868,387.3504006457106,10.341567814696194,253.26145713347026,12.353940247073147,133.26182463711368,314.4671790524687,320.0343285175106,166.79289774963357,423.18026352340064,471.42418426004275,400.246209471017,328.62834231591097,350.35522687686625,27.776427985637508,383.56307017498534,441.1165252028284,371.9082808836508,165.80509086650673,101.71771485585668,204.57663154699046,446.0712572260703,416.8088041576527,120.74639342635984,474.8559657866781,83.8988311130795,286.3141038527183,224.38730792951412,252.82159129604466,24.73107136892594,43.8304390655625,499.12196013445686,345.045862579743,487.32740982250743,15.4661375306252,246.1638921669853,300.13740087353415,160.4450223536882,33.69612471219763,71.22805623465823,261.26138172608916,276.43788960243575,419.6620827048294,260.520719701957,183.73485496092147,71.55957840036243,432.1505477869195,443.6713290519134,396.821116018782,298.1018799530377,87.09419256420448,83.10656721641274,175.7920517230772,80.31011368105867,367.6857270198899,53.882172903936706,159.8832728108216,240.21205585323878,39.79073598631422,7.6222533850293095,90.69546129871253,10.048642126038176,23.404161527842305,52.67130167071543,436.8137472402519,44.930630539918745,299.9524655582785,374.6043047204984,154.51303665341177,499.8439761637492,5.46785266094485,445.23921465247554,230.43741696650855,191.27689221503852,209.53094388451677,356.4817312042544,142.65453228834835,238.8848789323076,378.9867819585091,158.39102160681006,161.10313628094764,249.3656575598897,162.95730218929717,443.9376807285573,28.66410537391262,103.93913432009715,53.78915042373467,133.98382710827838,473.2164926827456,133.42373735212044,108.21999044282104,459.7770597364432,313.4803503097908,106.0499242445836,369.1263194363057,454.28516865153523,29.544402990121398,245.6368827624563,292.4773034682686,291.76181902620266,477.2150419406883,69.8260350822556,462.1218360201863,295.9253812892506,394.78122987295427,431.62231945653804,209.76717084004116,431.69397249095584,172.58308057148753,482.33775519606223,356.5342045615584,70.28409399975556,282.5154061010099,296.2637408596287,164.9305895563734,459.8203087649867,66.50549302430197,253.80192691730642,280.864088349054,399.51605407588244,395.44021858457825,303.3116461287756,275.84648980726803,11.557546087783365,199.24482524308996,153.87895518805516,92.21781890099822,323.9303080710827,112.2585970969855,386.5039463028237,348.60201594088437,220.21754285650874,411.0036713826933,370.18971610256676,39.79213237638457,110.65083774981154,277.17783311892987,197.9463899555457,242.9799128439568,308.66630744910395,100.71686658175271,178.1469698471647,176.72152771977966,160.51271691751435,105.97649004056464,112.72547902282149,302.04429154561785,41.961994943711225,427.54008205330575,13.352425455342765,201.3557263265644,8.373078185057059,373.91454268231627,412.4013200732147,443.8346512169572,491.5063642119698,253.64373449394694,457.22838195991113,476.37911430516453,203.6132722760796,100.82233348672376,336.4225826290287,300.12148241122117,482.78338604993087,26.21036550266098,353.1615595897002,4.926889897983844,454.8734993372825,139.81426241949657,477.07696925186826,103.41844136610135,215.7469115744841,357.68828752898554,368.13669210730984,159.78207967024304,171.9891404777054,36.981754209705066,203.89422606509754,105.30020026780463,335.8490486532705,57.76956957376389,495.9687633636418,284.20469621688017,1.0093926929936048,486.07013688792597,440.2517645468058,156.88724422878508,43.74891507746281,290.1896236535685,203.6598676173108,79.25806704982996,253.13307725716928,479.9936486347295,383.1115662053684,141.1881446153912,124.72501436696237,61.51557615879666,249.22248018217408,296.86182808270433,325.0464165569412,491.3567548341693,342.168491337941,149.62416180063576,248.884577562699,329.87084677902465,188.9105242556286,210.41641184323134,425.05846023408446,307.5263662425092,436.5196845002134,48.50159002162502,376.9129173227855,445.433984052478,200.9851802121473,371.6668574035216,326.80221920057284,389.1413570486837,54.926000849195745,418.1120243538039,394.6588470101886,185.41527891250342,102.45636425900362,477.28126566005534,85.67889799271089,463.5970509799946,490.13687980103737,402.6808719461445,348.20991706491657,320.6531036217551,142.0302192458456,33.1871459262727,172.19898335112615,140.81989041126863,97.45502849419051,88.69921424963334,60.965682678750575,165.70266969361745,458.21348768170435,401.82813441972706,376.3993739438222,368.2613627127721,88.00923621674939,415.4783330711795,193.00459302386707,318.3606237308516,41.95156712453563,247.18825822172363,342.0274868934374,485.555759221911,441.06337583766174,173.21562642243381,233.02214365422336,473.3957566877755,145.29975064634272,116.50031480793577,129.33627325553266,126.29425713401477,135.80460633913827,355.4257426532711,105.18328592376702,361.69825909216445,94.93243781658056,139.77970082378755,17.91591645747237,155.44717725727253,326.46975136358355,465.1522505053987,357.0104854764157,143.1909235520854,310.4274098468138,150.70954991118,451.1239171360485,19.12680122739696,42.846618757308995,441.2509079154313,456.6498087612401,85.51591821276405,441.7818459851505,238.593297767831,315.3801204390304,214.8566862190322,88.38131653481173,383.66321078374256,416.44327730197193,121.35940129021961,421.2263568309189,482.5991371975187,31.23299387583367,283.48779119163623,324.2921153761136,178.30917939416457,478.40016014306985,128.0508817985192,372.0883701035459,242.14839984323999,235.1195267002677,403.1639122161993,372.6993127034446,86.49623231631998,313.7501965814301,278.6305139492359,448.1148364920753,349.85493427633895,417.42927071588497,298.97138528188947,309.45746778101733,206.33944907217762,105.27360219314141,143.5249350656922,203.06941215889617,481.0759820295198,281.8143814866503,481.717381613455,33.93549883482638,204.5124891452975,485.3342880139776,154.7402477850135,364.9371877486574,350.5331434018085,411.1994704638935,383.2639475899112,197.18385829111784,317.13616016848067,176.60548930465768,374.6341248655713,283.6410112353827,420.3852571666239,498.9780210273613,148.94653572466098,251.41124627266132,346.0146499240427,487.61980493690936,59.59714714997089,471.24109060634044,347.2192272551974,498.12287160745404,472.1995383102318,42.74178323355648,70.3720415083513,430.4527011820908,459.50101780331755,103.27956031213226,124.76581361349848,65.64283476534993,205.10277913451347,345.9145868354263,326.87851110298703,442.8961553691654,491.7242515560539,160.94081933855696,427.81459667411895,13.438198667598433,46.28805352485244,299.51058651895914,159.24984339013147,408.77759014330184,432.487911978592,143.15342276744602,180.8646486815627,76.45638152980393,324.4824514450676,144.2644562227481,343.9959322513929,112.787234219338,297.4693478621533,91.80372786968482,36.03253599077705,232.65774935751037,202.72829620506528,274.13442132809985,478.2940547527788,431.63513539266694,166.36102452450797,308.1871550572398,90.42532321442653,79.637273342398,338.83578190228,149.5231738017839,143.42036961511394,378.75459092179756,215.19520414999027,144.47621824339075,111.60918836541367,303.74353148877276,493.96937254698304,425.34611103204077,168.5031332279815,39.77021515294255,420.7845764669208,102.47429152006826,458.58194451584313,144.21050190111262,240.4467132105411,358.1322924947986,263.50977747393125,434.5862210004554,363.3513660310441,427.41380689654795,227.14197226919518,81.89143362281904,293.84513769001217,230.2919676324714,192.04002396863308,470.42673933329337,437.29723334147707,228.31754157869756,364.7674923802445,361.426285628463,422.3889332350157,83.70812018396134,57.49669765001586,427.1368202099518,259.8645441167685,171.46185203994224,484.485448515885,16.652729116516607,48.77086747774706,283.37803178809315,247.7233630579261,115.78532431577871,22.376829158985533,202.53326115948244,446.3620358505154,441.7164712251862,2.4839753737437853,93.59093526163342,251.10295223355317,457.2107538060003,390.9566592643061,156.1658733575697,342.7960756754933,393.429746880126,386.62229022477425,44.677448481911355,223.06440083340462,19.124563457028177,437.86991946433017,170.62556744517477,349.1532663505358,382.3472850741927,64.84204782057445,360.16217298902654,254.32536880780322,465.7860916411063,229.41206728941742,486.7702499944311,438.7318745536417,468.43814125560414,452.10875691723174,123.33127617155537,343.011881595518,493.1387709054842,343.64780364927407,347.3438593954469,163.99589422210704,195.66300579695718,84.74944054539047,104.48416371675995,413.7607632643542,452.41535320026816,23.97257117712104,402.13216223467276,361.752644213714,481.7259353077069,481.6559270838202,471.90009663013365,415.8322643426756,175.0013765033902,135.1542144293182,459.8632669436864,393.4673865604316,327.43489435285164,282.2267122310955,210.42932802898562,278.18257508370783,227.92797052895875,139.7343953241489,217.24213602306986,320.5803817485976,416.79076436362305,1.2760374829519083,171.22716689294847,150.09269453743502,442.2205693519876,331.9760268505204,180.08457029806203,20.351950603787138,117.22795559603894,184.22405118273676,115.59098644113574,232.86966815522914,172.2825000387983,33.344285827858535,305.4141350712355,144.7762377564442,186.19125029169402,2.9513581716252846,497.86321460798376,369.0274706599828,224.17727915805452,229.0080771700097,16.166814066900347,471.53348857902887,415.44921478464335,191.8548812341585,71.96659533739225,69.58425021828762,138.2467800825088,235.93285057200342,473.3871939003947,471.9433133408685,360.2089983146869,195.55477239895458,50.14595830418056,465.6205340778352,392.5166125946393,358.68164739484996,445.01645862334084,94.19676337596495,396.0368883526649,439.0957518123483,286.9639309501379,77.69682365686315,461.81887629780726,321.8719219981551,291.6582739445834,236.54100778430043,302.13893470664044,54.506556628133865,337.07185077696255,281.85823101411313,20.730089780139572,470.59031807066543,305.15306839563283,368.38690045644415,406.9876455239377,79.0257953694381,39.38394554433455,424.91069658444405,135.06937198873848,442.5631883494213,431.98615980532685,383.85883950238275,322.32708318907146,212.2092728257403,103.67617989458967,314.8444568236205,153.00690746281475,283.6269948000414,195.06935829427675,132.03482840096592,401.4978093771303,442.4888791010592,24.321983699616023,316.05616191935417,69.42237457174028,29.54019442076494,364.48079412732295,372.5108234154576,456.7305845453322,305.41517419396416,126.89238504500678,77.5803288468696,305.03576160750333,116.87889619187442,327.4544987358886,112.74375744976683,103.5412755295424,353.92828144143874,178.6132322450966,498.56398291729454,168.25455324002482,492.1261335441105,361.54869632221477,253.6840858599837,88.29623129988684,207.738702689801,449.3623049870348,131.35453044862777,498.933769704178,105.6493460825898,297.9916927455044,235.33378999737286,179.31468377644654,317.70938158303375,102.07683660484112,499.09811649436364,290.4489499587055,379.6244372085544,444.24601951007713,100.9801163553733,411.2085329798,414.4960841371171,331.9996275816538,180.16587378139315,265.14360589430873,189.91401235547357,48.01449409038816,198.43732900149692,270.60068635239077,352.87138536732243,198.29999588195423,328.0172654599698,382.77711316132314,314.9170653514023,430.6536292914387,391.91859908183966,425.0572344200871,162.11764107466587,293.8027034559577,20.802722107089664,308.99023075011036,449.0039788310881,223.3357294187813,81.58133414884861,68.1574974178475,103.61448097997727,446.44342962196583,355.2230415232374,202.63065239931655,1.1477602778016127,289.5313406437991,202.9664745016544,184.62080483627886,360.8221255486643,202.43821797614092,347.76049791781037,104.22275000822201,490.2498408473932,465.8730596243418,459.7854897827104,476.5751621824662,209.33890944262302,291.88656044740145,290.39327032156893,311.86953705736784,53.02213614624473,271.1460147429032,363.8221167524115,38.78704179965209,327.986920355923,452.33683991494075,446.3648228641681,273.1433761578089,110.39317042984898,324.1354351412807,386.18549966751823,441.7622606525038,301.237035408132,198.59427358731295,495.89150359502696,378.17151379499614,245.2669064977081,224.17798992964222,117.33646140934417,360.41217056816674,86.68342489575953,444.02351527183924,115.49854864248898,251.4282729945987,396.44962767316105,272.8156668944659,139.90982378573403,379.0108090893892,17.07992485582277,430.4926733019474,69.38122883676378,9.984299852008437,402.4683745193289,32.0227278138725,163.26000774439885,391.0400791540893,120.6172991599016,466.9681844396761,415.09432890794903,205.8040143676132,88.42089403936615,379.6941660989981,388.5694426352451,145.05698455756954,221.10621300584953,328.2303796183338,471.95171147364914,484.2912855781898,288.79186084124433,17.878275900717888,223.47460664844675,43.91743618611177,173.54067978283584,59.510599393163055,356.79718505022294,29.076670418710204,225.29707076907968,40.27121655513777,205.8522896829982,472.84586274118357,171.19376682966336,450.59187914526257,53.0135616625943,450.48151743535936,356.39169031289543,339.3601482013333,236.2807490564115,207.83641674824904,129.26172431049466,264.0981463946355,215.90870508770422,372.34928082120234,430.6307509846108,499.73828392946984,17.69008135053607,495.30932384990933,444.376617370525,367.8782074286735,490.57008079050036,489.62127762781705,465.7918976288776,325.0362615751492,114.3444982855456,156.81424996383797,302.53518532230225,399.3311354164897,163.905366188559,383.00279553963435,106.88134679355055,85.51576434314123,356.47930762466393,322.7797368198141,338.6221881079331,272.8301988630677,407.08811546057956,276.0023725346652,255.54193565258043,186.30122111212532,262.83120792720695,182.62113958636328,337.9850240000829,178.03155008288874,472.6150265751349,405.37642938773865,81.55966697915729,343.65121751622905,475.1812104761963,243.72811439958863,268.5891292349105,269.0425481005343,420.08885027477737,451.88955864351055,58.11625218223138,260.22178557807763,67.5455316265926,103.7285981772692,240.89583850477325,473.8122036492225,93.65550545448309,350.5190492683401,84.34539535881092,254.55585867378417,144.6401911252526,266.8285197371476,31.7075788921799,354.1766778931966,392.5876732061646,307.59270695570495,241.39002139621945,13.689194179756225,49.19061066042762,452.71789828935704,361.86723664931617,472.5749899137589,485.6014994315971,99.38779170311595,496.56329964981205,190.67950995880022,315.8401958094995,340.64345899366833,210.53696884483642,237.2908487356431,400.51660083573813,143.11297146035494,271.34937719504825,213.35774584338196,47.339588614749516,186.89191516207103,458.6707316310543,340.8125745348857,391.1055684055653,96.6136553374537,192.28032873810386,310.5676260505216,288.37839446616096,176.21950883208214,125.9253867798581,54.63881687337035,376.1395507766637,239.1426149993374,427.53305760297764,273.3157644998224,175.88862220609968,453.32274900202043,226.87154994943037,277.75038065416544,180.35996852019198,463.3642853825601,50.70248556272061,493.67252073740895,312.98470646358464,56.21287379516882,348.88901663585125,380.9969140042793,25.817817915508414,34.6333820978022,51.16967357720492,27.19968409544471,354.4745489755784,151.11036677973934,34.34249810691669,306.7464911228729,269.72275726922044,197.2179214444324,153.66502041604647,43.45430582228127,7.6301687518925965,97.83632408768739,14.941456681584086,336.63755312656053,42.589422928092645,423.8011993127041,418.7398410328417,163.80071638106986,70.25714376074576,483.76060577054557,414.4240562247852,38.004979368854166,240.215807977594,487.1492006747947,403.1740741708635,131.65193121532315,184.0661264226855,34.51802936160742,113.56144345539786,198.08297341652127,73.4646946531724,214.1252232042318,205.11501108685192,392.8838216186309,239.57885704702008,211.84337306768097,469.3341125367897,420.381656178049,267.4192693914333,193.76455993718866,456.51056704145475,63.05766897355958,494.4100015083227,173.49368900689078,206.76892073220566,227.81176349191355,76.08281199803734,107.17358282212119,323.72740490420694,499.0681869942852,461.2231312128105,299.58495019955666,121.06674704938447,416.76773610644335,135.63303556831863,398.24584043055887,386.9530693306511,90.42679142304166,386.8133444427869,198.70523251533834,101.73698625775384,213.46291775284098,259.09221507538683,335.0773392718136,417.9911978328995,271.85479589768823,357.40928991685786,420.5406043044494,476.26428708307134,331.1586856121845,148.76348758206393,445.98920667811734,201.77257131189842,20.19760542098148,317.9676317400615,174.77509175728477,275.8938700056995,30.10517058166917,39.91595345333509,121.92053267073055,320.25383576703257,194.57861374773023,411.8196197460193,68.97538453975672,304.17050683842916,37.45564180018501,395.92324087052333,143.32076406973593,130.3214528631902,143.84037325683096,71.95895409640762,179.5471276751427,418.34170180963,238.01307158833907,214.45298743414375,430.771292033844,315.58736955421926,287.6335931998365,292.10354662417404,73.02620487260225,458.82122411141955,201.087976151621,363.27162522474566,160.10118841112808,469.18155224331906,170.2925722382509,385.9355191977161,246.04737686994983,119.02785122308191,1.721766411106107,499.17114227517754,405.9832776333959,437.96555354985657,371.9453313856397,219.687444257622,147.18797306101382,216.47284302921642,432.0232155725554,1.9430040023622475,404.03012293223117,35.37935948708926,471.0620863664303,442.50169600173183,348.8072715558849,116.0945941243059,465.08300840527806,404.1550417265581,492.43448371626255,349.25107359578266,78.08779356488782,75.44835469817713,192.55783759889113,279.23453564312706,484.43529615463655,107.17838442144124,210.43062600897744,314.3577000994827,465.58565329493086,287.6777840384178,275.8368771354455,427.02093834969355,189.98663953963302,435.9537405829831,460.03605219122454,82.82302550310116,495.8521354455917,414.25269750418533,151.9028243676992,316.7643039280653,13.110122974050565,349.65714186880183,193.04072656990644,307.2587677919796,140.58884371155202,178.92204064222017,7.2834786595544765,427.55273837353434,259.621324739845,126.96390135059387,223.95541749799776,375.1940748726832,0.06161944696359001,396.4230851257082,81.82301385723989,395.4051085662903,187.98596424949622,492.45496035417534,180.66592284782024,430.0691092168417,498.23493384747695,69.23230374186306,14.223819041662367,383.9514240949553,164.89851117264587,85.60769767376352,439.5334716854815,441.43672983846307,411.5441008363001,400.5399241890971,395.9963906768618,181.8534078764036,339.7208925380225,336.5978408619271,113.46653690456444,446.03186885883815,495.90156571105905,23.11294999076996,248.83677704841944,292.99331607146775,202.4722637968074,311.90670825189784,388.4388685207784,388.0305216404857,262.8099957277246,232.94640440760062,104.99001925598283,406.73333687963884,201.30710033352884,470.2602726150015,219.75236601537995,28.44751410496926,238.92154236895024,305.1524296980791,241.9628515918043,288.78024206011264,45.7394387560317,292.0893047420697,375.4227552038645,27.641880043406065,346.81577481057843,417.6143788594396,103.57043618006057,98.5883216610226,401.5727832614481,144.89793432084807,260.5157680664794,139.89851882009964,292.04300212703737,79.38085782344406,433.76123673074164,408.02641804603303,296.2871297977927,341.50294706987194,228.30808097113308,408.615636837372,231.30150158549046,101.97960374646998,486.4017333356366,387.56289019558596,78.79668539761997,245.6018415513077,343.8605005408426,55.35840073167664,322.96333880499253,53.53230670434872,172.44993072572868,340.0200916600611,431.46491609973515,428.702071282532,361.178956049061,158.41337987260917,96.47507558060065,499.1269399733221,338.1349119819785,398.65414971507363,112.95073343449835,471.47191417770193,325.51922041089773,310.8950823352118,282.85580121533025,381.94125222954966,106.66632286262978,400.41394807393624,8.320821686843004,111.91391434838427,78.22536202476194,379.2014429975983,182.7280962390777,380.4253151299405,205.69521695747994,156.96067322315844,15.27557231461929,165.01271309969457,442.19320521439965,145.90982565540534,449.6929853029754,439.13794846298396,305.46305539645044,84.98764601721676,64.30870965673574,111.95555022497649,139.7577528526004,178.10051920074554,332.7129158570641,276.00747996029287,226.86026703292228,300.98744085228003,259.0069124103682,424.3716640525437,39.48650683471977,251.26931173350832,375.94343285721385,202.06898950416098,132.4679884717117,417.96679370185205,150.34021087456262,210.07427681021008,420.64717944375553,76.05481123111768,299.2981999131185,196.93857310031294,49.36262122405366,3.8073413718081595,399.231954236826,458.2361867823943,345.3116988667713,61.0361312723835,401.24871898222005,382.43639183201736,412.19803080774784,184.17018150267793,438.68893368453297,397.5935217104385,19.344101649988676,278.69055433970436,424.3666529208724,250.9900067723061,153.02610914530612,252.02414236246585,370.4079673604298,165.59097102540267,84.52546340574474,157.0602508091401,231.9358634057661,238.3353044215689,79.04110871569247,229.47463517529786,435.19163974579067,491.17343280986046,285.1134794686513,445.7421544477378,498.09445654159146,104.68012418110828,244.05975729573038,55.64645108532562,109.8813545700652,143.81377523578897,389.2953226132009,375.79777749338973,31.458677512287924,212.2319540275851,494.5638373846537,214.33052016692832,154.38168828180298,443.26539135783685,192.77148616935236,26.407869141298,210.29907938201475,24.175902360192183,368.70277703244614,20.512027892539365,115.18476855957161,139.9370755510272,7.558204905778632,477.6288999600119,430.0422960751239,32.31999168330502,355.2241309824055,271.1327466682089,275.43788778546576,201.6280345403938,114.93050729710042,316.9417710547914,145.38282103876443,11.927525175550514,218.33967108610963,279.2211868989776,320.8609661419222,88.91335771570408,478.40500054839396,325.82380842537106,466.6526110748128,138.69081508746152,148.11771856287882,483.56746536584984,409.72501789830005,76.48442582515658,352.67254189338615,168.26586211546723,311.38316782379746,361.30560956738157,86.86481775718657,447.28248652429136,27.5753482702058,425.13315732841016,169.58318133493256,148.8710263570021,214.05449808820055,290.78396403218375,173.98921243475885,420.6381459558659,452.39331134320884,451.06093245821677,28.859523192491963,367.0141690900719,26.77678777853698,184.30810357398775,160.12695531740684,221.5902861426713,294.76260789862107,89.94598560487732,195.7463662643476,180.00992071169597,374.12531955601224,153.50558492190402,96.54973952407065,495.18891792753806,220.52454555333378,201.80293143759133,14.182512888566311,487.45451641260894,219.8149841550906,58.47177803434567,306.41890247776547,259.6777377731123,122.62853116694595,169.4192907599219,361.3340361999168,493.1736919208807,225.90359497521905,157.7769243599052,321.70254438873303,171.49312919163663,302.17397373046487,295.20692896452493,248.0144261061519,480.1024138493194,152.33074842916318,137.22191957641294,157.47270180757545,393.018175801367,151.76290228659673,99.67308031205668,177.0153071392234,262.82935127921513,419.54577024081453,293.15881099986365,150.58348486381357,231.42300574801445,261.53961061435126,425.0792459486499,475.18367576946287,310.83366271331437,63.5308791160164,18.835118988764556,14.17645913968446,353.190702124455,160.93751263155943,417.08636060473236,258.2623649859699,492.7424337104673,415.04449859085577,191.7649109687064,488.0297124306452,421.9712205019569,208.68485362661548,143.5585316844461,261.6049822536417,1.796092889552292,336.34096198385186,216.34392769392906,338.66232133919027,232.20396840589407,451.6988299209309,218.91718389494662,263.61248550263497,46.00012989193403,300.7563432621146,295.0868808024422,4.495495895721069,446.5208004324606,267.89866161522025,485.6648713866537,425.4866059796102,127.30053295053168,321.48707083205164,184.68591567628755,82.47990386092674,454.72183395057476,235.39827139652724,307.4424987492356,65.65948313246072,170.6426282537249,384.2796856511167,89.3764234331974,205.07862829543043,53.22124206867718,274.26443517996813,417.04740376231643,284.3902651182334,220.9121470751425,346.0822294212906,167.91617247872892,449.66800342372284,456.2228455660087,212.18575811669916,366.0517277669856,26.997552460342078,302.8498118599108,210.24927529710513,131.52825016402437,316.64544926210544,42.088829972472986,155.1096142099063,71.14400354428507,134.92702937120637,478.89221156032556,253.76254496604355,493.0720188343511,476.246624682786,491.2267530587221,484.78201675589537,262.71753521963313,438.4951853871446,431.12500905875817,171.74293015161513,174.21513967564417,357.51851083138763,68.34098160279667,454.38283103803144,305.0628101566726,498.77311487195317,133.88219639896127,419.2707227126963,289.37669087921205,7.810219140849561,419.1273751003033,272.5233985170975,111.47767992154256,83.35656008495896,231.71898872394826,263.4173225787416,349.15815630061576,126.16103891685826,205.75541572040424,242.71128198207194,84.95421189463003,16.357926643712272,438.94988996007834,319.8338630696625,109.3035891775238,91.99631843646972,49.81376216124423,274.8105831480675,364.36026163081016,441.3221711399621,122.6891624418035,208.2530607586338,489.6139629056101,178.03692045838426,76.78803598429363,361.990079379773,366.4870515213131,35.64682975797595,404.79284581327136,358.9433996614996,456.64802124325655,7.696011604841679,89.50507108581085,198.34136460051488,285.96412913112647,411.3965562965437,496.40506602039727,453.3785021811505,58.09748412568594,299.1529345609506,123.77751978020923,121.62324680121739,410.0666682647412,262.1849338438366,264.72915801726504,442.0913316030948,108.78554190326972,272.27430879013303,304.67196500601335,267.08707384768337,54.15622995403058,357.79427718383226,197.25234700743465,258.79906216426986,360.6712995014383,387.3691383892217,259.061234671336,10.165010961618481,141.7183659855914,236.3146171478654,129.28702547283834,75.58326433058305,489.551852113695,270.4572446623332,221.97073199399165,63.82843071578781,125.26542510430949,441.3467373779454,496.0786534533789,101.34278129525254,238.33178898698648,241.4085963157465,80.64394318413859,426.4225397084367,314.2984974217976,422.9050235800224,301.30549967074506,249.12722750320927,44.68069108455575,103.44949867992581,108.21853197546993,422.5334350021333,447.2414173637512,247.0681326746772,294.25993918986336,444.5735896680282,244.20343374840425,152.18552651755647,364.4702672055945,452.0060539588643,325.4886232637876,429.9329207958881,134.83760193675354,62.258680168286396,63.143554423530034,383.9166205221902,142.93551813209825,396.741197448892,304.0523116809033,351.29100214693074,335.11563192321927,244.63375504598883,91.02280989431155,240.3160609091881,117.35256741173372,251.47406969972963,91.77292349222166,33.000786349164144,319.4872950356649,353.36566826480754,382.4756033463987,269.0457797399638,215.75077706317936,180.5277453547359,44.136926014359254,47.03082981338347,427.58982700632464,108.56577659375056,100.1758683316033,100.1370371226169,165.56299106876503,365.49024051073343,96.95255912206136,196.29656607503478,210.04539579329062,87.02233181753272,368.9961271829826,50.300343805520065,78.33534628717453,421.11573500745556,215.9941192722178,52.85941318458354,244.233405939994,465.77975718549436,364.91178658134595,483.5675711516717,102.87219198466401,109.0644111771476,438.73103237180646,329.41041972030496,1.2575738339785092,256.52198974345487,224.3379658636927,434.7692468336443,454.53764449256494,341.1585158110293,33.56765649400239,201.80249816188876,88.88466562476994,323.03062867409636,439.9084444359614,275.095861718189,111.59748887336607,233.61195059814065,331.7632052744282,452.04158250368374,187.5175311322218,175.27403347934123,480.8695688385844,291.79783833086304,416.82428554512876,95.26551352732848,10.962069836036425,3.3347291507774823,283.82584036115657,334.1548284257665,484.1889038181483,162.16274808339014,167.782446436999,148.42228238449118,483.5188419614678,23.601833532691185,265.4555062837949,121.45130040352781,77.93743925646667,406.7292823081851,278.67671454996525,471.55989870235527,237.45463762912934,223.92820642812183,418.7046112196721,247.3624675588566,145.7475656166728,445.01335486234603,3.536210113863403,224.8491060921536,467.0791811703322,463.9561514699546,191.0018967311916,440.85449570647415,371.7054921805321,210.02333128144713,276.9771410070615,359.27590424184166,172.86199641378596,325.680354731509,50.89776746889984,44.489391002554555,195.81363078707625,61.6564187911407,373.59136898285163,357.12728654269085,493.72672578640163,386.65236998606525,399.0920048977771,121.77820462699907,480.3406906476003,221.33453187066044,318.04362542162033,287.5252077237861,39.62466045833635,499.6754836780092,404.75697784108775,357.5112923449739,387.70520650145124,307.29349517398987,466.95665293659073,121.88156910656068,201.32737016283286,258.20755102468974,65.28605129237164,451.55568396157275,116.63442767150778,463.050078914526,354.2370366428522,401.08524233124234,51.84257854692387,169.05617635837334,159.74357671548046,154.0087706595732,378.46356560262615,354.43559005965596,222.51756090995468,332.82828243537364,155.06275530789682,160.96874091438374,50.73489120169184,267.36135777757517,116.08214194191247,84.64345249134453,140.1370695138051,272.30161091265416,341.6602533648666,331.9051377445907,54.793556549951106,306.9150948457273,265.21296534092,87.32829760754701,70.23747357615329,421.47538375613993,157.8969360671423,387.8754539601135,220.26754086953093,59.07183070187383,184.0518141140567,101.68858875339426,448.6981545837821,327.98193091242956,251.71713142287012,6.753818778057474,75.4879980259453,318.3198467318681,297.6295708138368,429.9979245539186,124.01103301092708,145.70304075753683,251.97617699227825,50.79797546237075,223.6892682078473,136.04471475690127,367.72300999029204,13.38605516346847,26.14898235786334,470.807154120257,369.1964374417084,169.78977902927807,373.51423301982055,133.50371240231772,428.0792465334383,478.1729899938924,288.14947839774874,448.54338706498476,131.84839190731412,251.98882037567182,190.4277957351983,463.5013848197854,152.1011430284852,216.3420768236487,91.1474397908999,485.45871788159087,133.58239461343692,295.1722802397152,324.20267796609403,163.58580556181656,444.0958381814339,176.83293737007298,292.9923523978817,247.59589761780975,359.82941825954697,231.2729681184097,38.809976300516965,69.05025375694728,74.33083313462751,447.1292528542964,202.83780816070472,135.0137966755639,72.91673386735542,247.24934620952243,96.94284982342039,96.49686190342277,219.1031862613694,262.51680360422137,278.53800535763105,124.29735029039335,169.11215044788875,178.1513973705109,59.53364829015007,290.7104897687595,318.1571363577824,495.67038788005016,395.89000450469314,297.6628673454759,97.05731755281188,126.22930679885702,135.0612354781896,447.16321983273565,89.06900659138218,249.38942325358448,122.44666247706436,201.72005688562555,394.82902172993516,17.41697407547671,361.72537382039627,411.0690805827485,347.0537279737108,232.50378597117006,20.55054340608087,84.2701390889684,11.714789769174505,270.2214045924245,63.7263604318794,79.76976021197946,215.14139783313223,258.8442872048917,93.77394467706002,363.45273208373874,19.736361713545314,399.8044718148002,441.75228892132714,302.6707049418794,450.30545090937414,284.31897029319043,79.65960749516566,229.84262356955742,177.97898405567014,41.87912850933873,10.74251570659146,182.74435322326178,416.5464507443899,364.567226638584,119.24618366355,415.7527769777757,446.7659573728139,464.0674196072408,114.91428817235617,11.737416218113971,209.09763696185124,292.1243494041379,336.89887483751846,98.46635113071811,256.9344720780504,248.20603839673706,130.83955571140993,255.90384179699078,127.83799056975198,491.5941728509275,485.0826228412085,86.0981781869049,292.955311309579,31.42406564004507,185.98354922041983,135.7727873319886,4.98152815833941,228.33499451051497,173.14303481604188,352.02874069792966,121.69167345935384,306.49642154760136,306.5539204629266,110.27242991323705,491.39820459189554,498.0998168670503,184.31066495304182,213.52006944186707,276.92891155726886,19.19258766351062,354.67188464209977,56.855374365132775,267.49607944086415,110.29852401402319,400.672827032157,11.764425807372248,217.2824475182713,293.48572717174216,64.97790103692257,203.25991407606602,344.25707633593794,281.90436477513225,160.8844443033871,116.8062289979821,291.1120790554769,421.24218730188136,77.67811815689262,308.33544048053096,325.3360668747703,31.36039843196081,323.1072835599942,172.20135410367033,298.13594632378295,225.60389785816082,376.9904375327372,302.14267326746767,176.508955699615,471.84890467198716,269.05607998811877,20.32156711892752,284.98607490161385,43.28572825010335,140.873607017712,392.0441608802626,458.4286062612708,456.5945935692674,378.55000409625825,439.694731244154,31.484982109729497,6.282794864201802,20.603013728553666,216.79544746381518,149.14404251460388,39.83504427289341,423.0984667353944,272.2723548960568,148.91976404260143,136.60878046222047,487.5916866610268,389.80777760755547,31.10253288203868,84.62818317935006,316.5295013840165,99.56527491290956,443.8785523579191,374.4534188698153,261.33033041352104,407.3683442606931,371.6530037399401,22.34980739624648,140.29920221559365,367.0304168282951,148.0696647459867,62.40209925731788,101.98279888388106,212.71721485037008,438.14422084052586,34.008033905367554,99.25457797905845,115.73478437947915,484.20263293247837,456.87293835737995,233.9659319898848,340.23222040468085,475.1670662842874,367.6561608914808,498.76930689051034,81.37509482590765,242.4244438112476,281.84398833942635,357.2892165002198,147.00430539166774,247.35774909120335,290.47487774788004,62.5179619070454,144.18031671682462,332.47298154236495,39.64436495210932,121.0847723752142,110.63686885410084,92.51876990882346,157.2951200984243,428.1609541900163,457.6509075162084,268.4858359953036,181.26012902108036,79.50130826146984,451.23174845141625,204.7645634318711,127.92663606127996,180.5756054538409,88.04794474286825,466.8867961019676,419.17551299894217,80.92134686962437,152.8969005876446,420.00939976892715,443.3435464738579,364.3369921494715,391.7022456454068,104.60321861496791,463.76214367005133,80.66081482175103,425.6533145148853,208.66135788594798,294.8875166323032,337.26995111309645,158.0557425036061,172.79619989441753,130.36442829724803,412.3441758081624,391.7891563760032,64.02218478912025,318.8855049620597,14.263313604866102,93.19020226846064,63.74697912490801,448.8494406607658,485.4730950942776,353.64759190075523,494.4462129019734,365.77838370981476,115.22633676757788,497.94345715876676,461.3178853343508,1.6948695892141652,125.90696376306443,394.87904909494677,359.20199150948116,264.2919472744479,378.65870272071754,20.98663944672552,29.496307931431097,7.542802804088922,221.10080888087268,492.5638631607282,429.21997362849396,360.56285010141767,199.2916120897771,238.11476278470678,390.47912901216876,11.706513595027278,420.9152651702162,438.51272608999324,251.8721335436198,464.328635082377,489.8734591294236,258.52122370249697,297.3006304461857,56.18178488348025,308.72304479120527,24.886419319654408,110.38914550914636,121.50238862517315,33.230945359472244,285.12175381443404,491.8120291209117,283.28413300006486,236.68615620801725,72.56364684613526,19.109684035294116,178.9905654538737,235.2453129096509,82.66711859316356,162.3090148428581,177.34216302033755,195.69003257040785,159.23875172687428,178.87671440977627,104.64819767659506,389.3731388698873,471.7873298815981,110.66111040985716,158.69778475812103,399.83884724536045,426.3855096828913,270.3939114488687,448.93988705779043,444.05829858831504,158.69602407059136,66.62037153568812,42.22845698171229,309.3617220005203,200.16059840535715,150.76613578444943,374.7382450634711,22.5957730722508,116.11673191898208,382.2813401034918,408.06920344811635,237.60242236051144,449.8117931304989,355.86136860616534,297.95659736084735,499.3071239449649,456.88890718285,236.66570780113372,391.0186600971733,194.17581959347663,234.82349383337453,261.86877293142476,68.99326951223894,354.0932287393602,168.76081551602752,112.62740499103873,410.5957459589777,161.2677890046843,330.82825797099747,422.0242079551835,307.0952664248846,108.90501027268817,15.860429393478759,87.68083213414579,492.88478328926664,199.3612156854484,121.20530906068583,434.2343007099726,414.7770322584745,217.35500202370318,30.897066308525957,115.19432940786423,317.9637856643912,427.5141048310175,15.070745692830512,202.3437881850294,76.88829987064283,223.82668728991672,324.1684412111563,62.3034293693342,311.2783066081313,193.80598193260835,184.82151178270624,395.24067981450384,375.24596305317436,65.39310593451053,281.9067367129835,330.16722928214324,279.14080356368197,45.417742683741544,370.345341350842,499.4865893300562,8.096416475678382,13.826723559293486,200.57087678724216,456.1205831944724,251.2206158555389,294.60791556848676,113.00026266394237,253.5775217387375,166.055867147304,397.67404645574624,93.46726324181864,134.50162432718938,263.5318093361535,368.3346596277531,54.16563688289288,422.5686387637926,259.2242658759518,64.0681624430266,67.15719425113798,380.72746588318796,393.6223581898425,31.3747917061471,150.2565567380635,147.69457386312666,253.98740989975354,480.1913682721891,145.9007632672007,122.80933723461129,233.60802947697135,329.8095868841784,284.7853440626885,157.61134563129932,214.74549202473492,183.38799916516058,200.92553063370067,442.81494516298534,112.54156976271746,158.5572633469431,346.347633147258,31.45037739591128,204.40053446901717,300.6566572862438,261.3762670228004,85.11933856314957,237.8099502589889,37.46543956555459,70.07711743228184,197.26481115873773,382.73436189991685,195.367556224746,267.6680377569048,98.54648025163348,327.62927026479207,334.4087371291106,228.17037489822255,172.72978588561273,253.6791549418641,281.4945667301754,417.44959471908794,286.0631323402952,411.46114063490114,359.3318757002705,360.9772916180476,234.62481352047325,171.78377190584226,121.75577893021273,81.33610094255562,358.2151037777436,349.2618296456447,36.17409777766356,199.21054695622854,105.51339751184786,307.4376465164622,485.6021022578901,481.80694777848566,310.4785753921556,277.1818392791315,101.071244758269,221.65094098760196,472.0729946486163,23.08660398678186,85.47303061814226,80.02126198829195,142.2315679452363,417.49902989621336,16.909322234584078,399.57850015889284,68.87457454787626,135.3027986763825,362.61267017748,189.85215463074888,365.92478767161816,45.10402642781352,47.00151640523054,410.20621516852293,30.221123472864875,80.13997071261514,131.22214387416165,299.6398524528162,272.159608177599,282.4803453009885,442.01655254084847,31.129748699704972,485.0551408558891,401.06212399005716,198.8739340021014,36.69209610951407,212.08551901328997,145.0871957512615,58.94963105108542,24.73366798146248,211.20063387469946,466.0441293268337,172.1234075115099,330.7089331216092,117.21781057889346,213.73417287431428,111.90583959370082,253.52758256756246,77.95878842144543,5.665069710873993,425.99843645071746,466.6830020197413,151.44243240321964,471.8060668680716,220.09595671417702,465.3629808128481,17.34770112935835,40.027987796102835,51.5559642741662,37.84379031267904,426.58793521412366,434.10314943980444,294.3092556554718,268.64777983009725,140.8567400285682,184.00925108646626,182.62646925062575,146.75014048426283,77.930336346271,436.79978036808455,27.333195304976243,32.8146579109454,136.18402118802487,305.5336310942297,303.14199046374335,458.25721919668604,333.47278099523504,80.71122362684014,74.29595874828566,395.6035142013359,301.2655937997039,318.3527100589316,133.06471857890668,85.16016010321903,88.71244422401936,440.18683592334895,443.9278445724675,422.3918946527496,334.179944594723,341.0360635335441,177.53525538790714,285.00327625005895,29.24457690082849,307.50707063538283,259.72965866134035,321.8351042647396,406.7898673280267,208.04208501455656,274.3371829908873,30.02429349168656,293.9790242994367,17.7037646361331,388.5845987477251,403.7186188183168,319.2645459305188,462.78703634784904,271.03033026751086,479.54906779171745,94.41631763554459,262.58235416744867,445.7163944203161,66.05127743961792,61.78914460884033,445.51048038263195,250.35891250261122,381.1560126012403,159.48419279927828,14.520712364271215,45.4808939026865,480.3460289096073,324.09270481384266,184.42182685668794,364.18791509068984,321.95486966720733,60.349820164890765,374.6748046744106,31.9511161297521,2.6999502832192324,446.2767404844492,153.41539692437078,174.63702673772974,74.50782054660809,406.4081078031112,119.61224802810221,246.98000079815364,221.39875137886565,408.00776898425494,369.9090334827018,470.6059593206602,332.5357718334074,0.3407156191387317,197.7249753476551,118.70484767732836,22.682670108350568,4.1231149691336455,480.02122287022706,141.71032713767306,110.9087913717276,207.23506353351374,443.71067729476124,436.87189919068516,37.12160968199929,494.69139663324535,210.78542822776947,321.5951653506638,40.85902811271536,221.75205380280593,15.500977400472626,355.05767523417467,94.88754945163957,431.38593112433097,150.73502030586238,68.18328957508868,434.60798093107644,390.0625716843471,60.97967253309389,225.54326655950018,199.90480191379146,320.1466507178845,228.9153271147979,171.73253855589766,444.38972015352385,450.67774779826544,58.46220986278294,32.389400875710294,352.52882446816545,117.60258903226716,107.76605224427627,212.7241264037333,460.8352778985505,167.77411941781773,376.40027029070876,434.77255479357933,296.22216149501423,475.10604137734845,280.06377290204523,427.04504721116933,277.77442437778643,147.47807952839798,347.8658204420917,99.37996100771274,112.56357987874432,367.64842936994313,414.0207357210255,272.40998668160853,428.7501293640628,232.60297067947843,273.858788022502,167.3059094885021,222.79186270701535,384.77251813673973,395.36867002132345,430.00722022269224,447.96021447517995,403.8046745798132,425.38300441049614,154.24545438441817,152.6754142803739,188.05469572327317,404.51035640434327,139.5269563028174,469.7461282317514,119.96537561793508,379.3173403243746,384.2578011504113,150.62816753924812,77.35238399729383,425.48172298364284,337.2821508418018,54.442509722982365,385.97143386633235,177.49874083255546,165.79542332006037,444.11386941699084,454.6038039659953,78.88101318895202,472.42327856265786,98.53452159412545,489.07275006153674,28.6182426003454,255.5141422682029,278.1849218369995,492.6567457956309,175.85676449525312,279.2417008790228,248.0400538693497,116.46879108058373,374.787220097608,219.9182597423156,463.6397574668152,175.00242439644265,180.97489262224076,282.042448537729,88.5100257207655,243.2557238378452,211.83368027113835,397.42939252226904,375.28695235218026,481.2337999234826,229.50508946132697,93.08978370366971,394.9297377770155,347.23369460946475,9.601148873772502,103.21396917852776,324.734932547932,143.85002164463168,187.39619896698946,329.9246353955798,261.8202283958576,207.432081127654,288.8821463974642,391.37273368927305,405.8788383511229,434.9269175104706,29.75913150212106,61.73343658970032,367.36418526554047,395.63697594220895,440.8101481152422,450.3681702474518,242.02619704768802,448.3252739622395,371.8359060094929,474.21459406339153,234.63240037441946,70.33458899676349,457.4657700396416,78.96978684595535,382.2504868024035,267.0047579261734,384.77277568389144,198.54631367672337,278.9622196265318,57.677883366876735,211.0161050770175,221.7961754265605,238.8031049541989,363.2674570174039,124.86717515028445,483.4341223090822,234.37260522106152,14.303115872449258,339.2922754668226,221.4032802323296,395.3803727029611,102.89329860417496,402.62282303711993,156.88980413607544,265.3317576359302,297.234450218152,199.94514020224497,223.91415846929297,341.81768676095004,151.69962285752348,228.16832774365957,460.5197676834918,126.9653975244085,250.1895947398405,436.04814037360006,74.41129358607456,32.97148986656395,143.85894469816895,376.77798158962264,421.4942352192973,395.74564283507164,276.5626643847615,94.80800080406226,46.23243578147029,283.7729587551773,107.96346118258404,328.76719382604557,466.9229492903912,61.88823081721817,182.7088773496154,255.97098684780718,165.3015533013895,328.51602695899254,483.5615149142669,286.74093814042646,224.50271704185764,277.2812266772743,266.594939220124,254.72356483434788,465.09371733757257,115.86386651443581,424.12232208294387,120.75321655820225,239.15811361714722,11.877291214484442,153.6401332589048,175.5758163944747,98.59872109445922,47.75958684025872,76.43993341192457,332.2039060467157,361.5638159949427,86.46660520209126,156.2270557830816,437.0746971499483,410.8966467970704,486.5586219507043,140.59114829304588,333.670173364648,301.85331659768946,283.45498947517723,327.6304600763498,27.374561960401333,41.77317022343541,417.56563198075537,134.73204584683586,88.7284037023377,394.80687034328776,439.4276249324758,68.98708276472065,429.0062908523804,164.98541968510472,299.47201611022257,389.25260217780675,224.65482219761768,449.0789756262868,196.75793367256534,106.20058583305226,467.90196178474906,415.60620569777507,350.3766531850607,441.39255301892035,310.5105812279293,351.91244420120125,291.0272597269756,43.55380266458453,413.471688613227,494.64216372714185,118.8844169174823,340.4652395870532,264.90505677555586,90.64644327296546,225.43794325551536,379.113110956555,332.7830378311415,281.1492091102916,142.24364367350373,195.2202532783288,114.95363890626376,102.07563492768679,271.71370902450565,5.918984266677918,89.86365314967404,449.78272760361216,416.4800735789918,206.6285979114254,380.7185685930546,365.07650987936034,426.38220334536294,277.6064073046697,471.20125078698516,104.75389110235567,287.939813644852,279.39747642184153,212.79591981038882,430.62286817584084,396.9024351442666,473.19658868217,79.49489841225177,115.35392320751347,319.42720727648685,450.80919445800424,390.1510564395182,113.27322131338991,278.9537782171075,357.6357059248909,38.53863679326608,457.0873099162751,472.0542219978189,166.51193861243564,358.81656203835513,413.5854978858289,82.10646845704117,4.775278384001713,196.8444764286238,278.33338191717525,141.05983168566783,309.6150323291108,254.71226265195824,427.6452164422314,419.65283868479173,253.1293971457298,421.59853680279247,479.07739840600414,104.95002390608587,391.99715962529314,111.34699306087947,347.8780017869808,310.90448043633,129.43656827815343,170.54446936015188,139.35104303679137,470.7097500831282,162.52793436271372,378.9506248510569,173.0572793576597,95.85977042274119,185.70362921215977,416.591971908272,376.9406925756186,149.61881946342982,484.3385959193863,453.0566765063559,152.84353669887173,91.53118286574258,121.66687143028399,425.83313399029265,265.9930995502241,114.97567868005699,408.9427964215646,232.11382236726496,35.492330251858384,41.835269413311394,224.01404735879095,467.58676051562077,421.549193619536,213.93841546711735,420.38584302685956,184.49074526522026,438.0354331725099,272.07692156677984,340.53875451968463,233.5109306266181,367.3901312431204,100.6085796826659,470.91361733127326,89.06870872295414,83.30168854943676,108.85778720322004,245.68222617383185,36.70497707200726,422.116869168643,120.74725802552821,235.50217008190478,191.18000104361488,194.5544785653003,172.0521506495648,426.6448088211903,48.97321332133231,446.4239328798172,3.4697911748428067,193.92997437081993,346.7181135188834,295.667089557914,222.19521150153176,275.511182773849,57.3855476646169,74.86651095220832,230.97383073426093,264.44583686922243,372.3903535489335,206.9771520521727,87.95067762616749,382.71764950168983,201.63923849992239,234.0649765683931,411.9612022528293,222.52861054403218,103.38443350170756,154.53903506544574,433.5405919017638,241.85227128555255,243.68224077640198,376.9862000416423,351.29282284886307,10.850343029706778,426.81161867870463,397.38359918077236,393.43058465913936,278.58839478273103,61.76962315962975,77.64604066160807,367.8510504994169,12.976560492005905,153.55109349351292,145.29440965109296,26.293045205697418,421.76594624001183,22.337203252945635,498.73751706400384,183.38658940038798,5.360385396395384,486.92575301053296,232.79347976766817,187.25399423113663,262.6064629256749,469.41922081143537,72.29362356601932,463.7794404043265,334.0425563813951,171.11168345963046,288.31288523300213,116.1405451887405,176.37764123656208,203.34211385892274,463.22924675149267,479.298910032077,138.15379959588248,473.6774088579149,174.69794768543923,138.05435805745492,439.2571827480339,429.04009262752896,276.6868826196839,268.57419711979526,125.36380947656556,256.57587580577047,46.829118430640634,396.9957693334307,251.62999049452895,470.86566347384274,230.12014358303912,293.9486227263589,11.04316564518193,162.32837718903315,419.94243515433106,108.04240576825596,311.3486145351756,6.95292258776814,395.05085930360053,473.58012681056226,128.77306575436154,182.86708644796013,198.7707152949939,395.1547272933338,383.9280296333513,464.1165118977305,124.26741170649103,442.7382559970704,113.71747318045222,277.931471790832,456.1959283511586,232.72953677513763,134.51734655320425,492.9559799206266,256.55133830735076,180.1359885653765,73.86859581805993,347.46519427467337,58.787151837483734,358.9542364390146,498.2057734667874,87.96709549110638,64.17646196437421,335.6999419346235,109.9179043861409,203.42130344434207,407.3198879579493,274.68584693566424,142.362192867752,430.5575683393247,105.0514967923143,60.56166565045829,77.51288284580504,485.84527115883924,462.18003732258273,236.90309601652692,187.88570788278136,371.2393047970508,364.9422065483251,296.3133798039346,363.8095333116923,418.9393361131969,345.77319111511775,33.65486410318719,6.951997703902535,192.50904222988373,395.3102473106456,285.2578319995624,110.43997644240045,376.6870532755109,227.48518086204461,16.91338064460668,350.1892974031403,160.831377929617,237.3760678583755,334.39314589218696,65.81907434804135,175.162323045293,191.8184888762946,479.62943848633466,341.6735903307928,313.1557146618209,130.92324240456975,75.46003502244803,203.27710517968413,100.46596915848183,84.34271762657919,18.168483562000294,329.5805433223575,214.29609146101458,490.7215909041317,440.6800778191347,58.31665558379584,357.362212376084,257.5878202686426,361.7797697191679,244.64045601540775,170.6732264121248,120.91451362330741,252.05706357619695,90.97426832916355,133.69566625020468,128.9652309397954,297.3269891523048,343.96242999206294,314.319832130709,306.22291723337213,104.65637920638449,266.0680679864819,469.5771532672245,204.7364403012939,107.09658931259602,447.1398429481668,227.6516938029567,241.67139233005196,356.99143577466754,259.9720773602826,338.8023600250375,184.80605205368673,249.8681696779169,477.30790252096534,98.09669962486123,290.340319564955,287.62867258270876,247.74679607926865,312.87477653788187,375.674810776598,197.36962297715377,331.0271499937414,399.3038965915997,384.4294846093992,416.1865441736945,453.1505620058939,180.25060835383678,293.29964663367025,489.5101340694954,297.57467046740237,481.9501759392807,120.31405223226288,335.8571515411075,174.4652561476655,473.0281677150525,52.20500266796479,201.48982800097647,185.09456167563854,402.8886709836067,424.89068401274324,315.96797957835076,372.6042689612278,9.603863773199883,135.83741184381836,327.39954618182765,186.70243111833017,96.59350072163953,354.23652411119497,92.89901416202618,335.2887755148257,217.28076241753834,426.3260352231465,315.74620732831414,69.25367061629417,36.739689142478824,356.5045958614886,190.5588611387854,413.5484506939471,166.85119467524777,338.77375940168776,393.75460171155765,131.0505314857804,43.321992416817004,115.58909453529986,150.90733643414978,356.8280143007938,450.78081038264975,17.554865466244962,191.74570294341552,85.0792445837606,479.19809899914515,93.18549663201881,95.27121771612279,114.33900623722393,275.3646237782915,260.21477899276704,305.9780613816062,257.28598985551645,254.62372594847827,346.4048388738203,203.42948906074443,480.96341077365526,13.363184850834653,489.8140969179703,297.2938516254875,231.5617666159372,390.9407165781967,270.9336653175504,291.59512166973025,154.3296440073777,141.67119606231816,234.94086170759476,244.93965765997282,36.07861903167298,291.03991760892654,40.851018282989536,410.11821590495447,273.15324600151337,416.07968139743537,279.16827405405684,175.22748959427113,480.9436663913922,37.1548960931406,71.72905841621491,154.82391995013535,460.65366812862464,322.6449097444911,371.6051735104271,247.89888189905852,52.04306490703192,42.340413045542924,91.09524914012323,95.26922264052706,230.53052995760893,243.13816748725515,20.159189466697146,40.567385183911455,153.66240367476104,105.6316606322778,290.91056875527113,147.27372201244725,218.44591194296615,338.60701292673343,282.7370248711565,332.76093508146334,176.92066081576328,367.60854927852773,287.4220289714542,300.7908552184648,430.728431636019,226.69515245892336,87.28349384605715,79.80716482679418,244.66044722438517,334.46408333575914,294.8666685732245,381.14746797034695,132.7542541287735,29.08126903949504,49.82575466671524,338.1424828266708,386.0385830734425,495.9383374457599,476.904015635045,70.70606390145862,458.1336355735847,187.42336579668262,444.6447034722963,480.3398525841743,174.16522194737993,291.2369063936041,311.8429669658184,116.9088394279072,481.7620609001414,60.04717691148909,245.5893416854238,379.95938714822876,172.67207670039008,4.612903961791703,62.54837460372631,94.17125786201086,231.49323854998826,419.54629899351835,398.47022419068566,499.0370787318451,202.03329555901973,245.731039705967,150.94534633129663,379.7488843500972,244.22670802639368,69.07320244373905,286.59298943356214,318.1734483514604,243.55089122465156,497.80192033812676,28.38294900851457,446.02638028626683,150.0508056211589,409.10424340431473,343.8677854018315,199.87659889970655,427.4178176554485,105.76272946370491,402.4803073895009,70.32554537742497,421.0088198939096,340.06492035542334,476.99299996375066,133.5140678831447,451.7424868422544,261.0769727991191,191.92670975858084,198.64011899951151,289.81434746555834,40.63277353214367,467.41409669889987,401.6247387117058,474.3202166401983,207.46195968385018,327.0908430326901,408.0080126282635,310.2647617310067,216.8701722004567,29.595210097371872,136.30065902502142,207.19604536693515,488.1437584417313,342.1287229536829,164.15478737060062,442.4905827067127,425.09096498685403,184.8666683911815,316.9747719199729,413.4578096840529,398.6814037631344,272.47873934596856,131.1311343967918,116.43125991049541,57.217169501858514,498.320172820807,364.39793348475536,391.4533436778025,405.13900691616436,466.035977356304,141.01742385079064,9.08233348265519,59.82012344435006,325.46031969152057,69.47833747965804,97.89724221772234,405.6685757752021,27.118133995760907,31.257963476330918,185.45784541963604,347.05797580063836,238.22055276609134,1.9442738409974902,107.14933794030945,113.21750664324671,223.28005759877456,228.59240668204205,466.37865317282814,381.3887686001818,376.29098019694584,189.05298860170194,198.6563398950676,167.64286102873282,111.73350576360886,59.0072440326217,446.9514508718059,403.441500694259,250.872521040717,289.0469011398409,291.0933918118863,109.65280824994727,124.12671066137659,41.59703847909402,62.9691494831287,116.00325985463967,118.11838465998193,371.50997411417006,319.48409446295346,343.3580293272146,17.650822440197224,79.3946027986876,210.741497322969,39.81567838694888,338.1094851795844,308.58285708585254,273.0989219486539,368.4563154562217,112.19145934642394,214.10841791433234,188.16473653509925,243.1157323822276,4.661589178663106,257.2205346659184,82.40395533786804,479.60314992028896,133.17449781482327,348.5113866479167,498.56977946798133,278.2432174955243,362.82481449697093,190.52983895789123,372.90697959379526,400.9486775055241,394.7836647323355,287.03799977776646,13.627124889902253,209.82123919404017,358.41674129497926,80.88709994334242,442.9397241337183,312.63161547507445,334.76754260400986,83.22116580807804,437.11802393767886,63.976110017727514,473.1682023126288,223.81465228865682,128.00693062582536,216.0037535384942,339.64921150756044,10.810586150022171,368.3158208612202,149.30453957944934,403.1616534723266,21.819507841768228,103.27885544870874,297.5903293404891,299.6423030946733,73.7858583227885,405.4533691552398,237.70552331016026,258.741429164682,44.366959661740644,12.597909967487219,318.24449108708365,496.57628329130677,483.60310951855115,242.3383270287296,22.43015261575032,453.41504340703773,197.81022017122862,260.29159847375973,6.275493105308616,312.3185249530498,391.07273135614474,147.2994492379254,350.65121574612965,498.2663730466865,181.7309059903147,86.56470813627392,198.46701854042504,125.37567162086482,455.00954392199947,115.40727627193526,213.493590733297,46.324774501136034,295.0572187859716,453.6498374225879,234.4112042177092,132.72001072318173,247.90474168762734,192.81743941128005,285.5284291573452,478.1759102211142,147.41229061616846,86.78724317943265,486.9843458286579,107.72635868070934,339.8679096160897,335.18512301292327,187.040289802197,264.0313851880588,471.67732310274533,196.64690885477498,434.9508243237763,272.65201013111704,247.96267802432715,198.42416254142537,203.60061584782753,398.2257502499257,219.3220918219496,457.4003154406329,374.97952879408535,466.67649191528204,257.8174084800703,114.13099506981428,463.82363617883203,194.61289256250325,463.4529681655837,303.46779798493907,369.62516913205803,461.76592539877703,338.00408278187734,188.30676224746236,65.79984715034104,277.49917054088314,453.6828271341529,483.34617608935594,261.9980188485249,71.08312985332455,193.28437878785354,311.25888851906615,351.9077060011748,380.72826144587515,375.99071700503674,200.81485698403546,266.42968479619446,155.9584287047754,436.65398125554657,269.652124454165,19.48813395955995,106.48261016627325,36.51921536224412,421.3806712920323,10.100618760699454,411.9322962732653,149.67820070196424,459.7363606184605,158.1418304654969,51.72374337389185,386.17841119909,57.75526777388007,32.62270362225151,63.02355026603823,406.8604280550866,105.52930595473609,277.6318033626631,419.20284205867245,183.8881778219673,258.28737628804976,81.28067094031155,75.79739072731296,262.8699352872298,55.916439343500436,144.88949614536452,15.016619062030667,379.40674058934707,439.2109952920833,124.93460847755533,475.5515565026236,415.54927222604687,453.33501279568344,399.7358892598134,420.7321470425499,482.83076713419126,387.0713108603234,296.3319820216911,370.7925468499501,228.35391320258114,5.217019582194782,73.29143760923861,328.93795989849593,250.96738367045702,150.7339599926083,304.81164617264267,315.10301820400133,479.7776689790192,176.02010027149328,65.7217573078549,396.07338101258284,32.85223844022944,102.65029113437262,294.30286554950135,153.6359690571294,280.7726667100323,356.3130919712636,363.7059482596239,353.91481386519916,4.7735524958254505,355.2938762654516,374.0161620533815,53.9649377160325,101.20638088268986,75.49834624608376,457.20261167234577,105.42780316419442,134.2193393692972,227.09420797619939,409.5238933733757,274.3393288540824,489.852578947523,9.53739372396123,178.51566218066762,378.9659467770631,212.94847587739096,402.3027526733893,244.5942605489597,390.4922168251841,229.1192981913559,223.00887466917607,134.4254588151663,75.42995366924387,44.10444808364811,252.46761584752264,41.34486214749566,493.9777601823401,235.31077231597098,437.1416865535279,172.81006876766426,417.67448608848366,343.4850472878388,489.12283591776975,35.354054507158004,472.0850957036358,206.6625798922237,213.863434973669,73.70359371869384,455.35373192695585,334.4090097792867,326.47803260364736,157.72676229236893,87.77640044061319,383.7854868877166,67.94185022630982,434.595604837548,290.70475831154164,136.30104788339105,196.6453801050012,237.07852516899476,296.5473563489435,280.93666462085133,256.54535047154235,207.7657623391377,310.08104234896115,329.0114848122732,199.24668939099232,62.34593291540702,181.40376585875694,329.7483823189372,66.28120153345607,13.020525163590314,2.243380247298754,444.6549931395295,320.52631584801736,227.70794619498236,74.29772913076415,409.7871733503069,144.56688899729798,114.65341710111954,157.27632931978962,280.9505710430584,131.05586197538764,435.00982825627057,233.3091692558471,440.9520871370368,277.4361191216423,179.56367848168463,89.96600208486628,254.11810735172958,12.200784855101121,43.69388063227464,8.08209721073505,272.5516757694807,356.843490405097,225.7484244919551,3.4608152282028515,156.04257563830083,354.6358853766406,264.6378736099634,247.6835313100375,485.36566766117784,463.2632091008849,121.30840705995382,350.2673469930404,57.404551681843216,390.29610009141015,197.55761134623017,453.5341073767474,274.9519146586609,14.057086858328184,25.04523019954563,228.6699938868967,123.04512314934912,468.1309564320111,239.34843514753734,340.13805663974404,355.289449569533,452.5638346448314,153.8178292457174,298.24647597995005,384.7965837719135,307.68986912835595,298.2007047640861,46.942153710226584,478.8903082202853,297.22570209536957,259.55713472075024,194.09440030173786,476.0139543462929,99.73923953715169,421.72948132968537,233.55978572498915,203.51395771952053,71.52754636340653,357.19462868269767,199.86593159018574,97.53071497853216,160.4813222025151,153.57894001981876,80.08012196446657,273.60749733829573,114.07708790297733,82.84393293174475,59.58049519219932,323.2565310365898,152.18083196711507,279.2739233129279,427.6998111093676,338.1353518407341,122.83385758971144,228.87490867540728,485.0173741245973,238.05959381400254,107.88662352470091,340.21551739471477,489.05659888799636,51.31734955612832,308.2276933736806,211.19758541312007,434.60084062705096,187.94807562404813,82.08605905265753,45.10128449645157,265.47095031105937,45.693907342212015,371.1477593629391,316.3432897262004,378.96226851784286,4.368485022140045,227.16001311420686,178.85783712475302,45.221981972296874,84.64445245636576,367.1550996200925,197.87021242981618,231.79097301271355,179.4328690404291,216.05804684895958,193.69071724136722,467.7519093134864,441.2159559489012,39.824048412769876,430.79714726807805,411.5212616226587,119.99209196448935,312.9603453928911,204.2213509249883,219.22361785755396,423.1210257656085,294.8869118921209,124.69313633360879,93.08150723220598,21.53742734287789,6.496807560560702,151.79583449792722,276.5039396860581,400.3286771866684,466.5266483492607,192.03242193335325,457.2011356858623,151.5077158080691,351.23684677836786,88.66269235731194,118.7158119775722,39.04941653226845,444.7531400516768,418.7130375704573,487.5347788748815,62.25697549154241,189.40116514618532,104.09941986814152,229.04483984684555,478.54363172779637,338.565652526398,66.44952542070325,48.047016864630535,225.60327250705149,343.14915588977016,12.168962455241239,157.7003786706741,77.34423659801092,470.2256935930482,272.19075616654106,53.02288636532049,256.3529195458736,246.27233446674524,26.851049689621153,431.3264687639352,425.54468760884725,106.36956869914505,301.4147583975134,1.1986007650669483,238.0145289019868,482.60059469918235,305.54976177072535,102.32475593168921,28.01811115312858,485.14162214803844,43.16754673215273,475.51922678423585,457.7378554262661,430.55964867735617,472.22132357688605,22.395901875674085,134.14185617631014,134.37226214556685,259.3406389775087,194.02947289636518,158.75994671465477,330.08608487785693,69.84154229294471,0.2196475211807547,310.05103468248643,300.9878734102349,96.22008428796536,147.40840468999127,8.584531744554425,410.7289374923945,164.81337600877032,304.2524793919369,215.61581217524827,264.03339791789114,402.0182573197495,247.85442969392346,286.9209982568307,395.81654778826567,326.4202207673278,324.03109877303893,344.24536799149064,30.575169582752082,67.6733719454391,481.3337389491166,160.61139701257932,235.33886382310877,458.08863506927497,185.80239327965177,103.94020717091945,173.33990898935602,121.48732844394272,470.1711247797857,370.2126829840902,481.1271489140584,10.074904753718306,470.229395054543,20.011635007199047,386.99149381101574,343.88872006496894,179.86815753068842,224.1289707562486,431.60447720038053,20.365234445114623,183.71658889425478,289.568261421702,397.75078188618005,428.05280796242096,54.864052381525475,177.28477249280095,356.0599733979107,434.96766095896334,396.0404482578086,311.0810558829478,496.0978902209261,156.5488222109651,46.72766969757558,383.319419580881,304.3487241641909,42.17892073501539,148.99389178999246,434.4467433485615,29.612982657742926,55.17180343816119,223.0598845778601,237.83572793152752,79.49557031601428,91.84189070058024,341.76192027799067,408.94685804437694,108.20922844967296,315.4652263413897,148.2476735090863,203.879538548439,141.64497884046457,472.48302775292984,4.744589466382787,186.28421246401672,85.07756316747816,71.82235023229633,37.15664181762391,125.91489693164493,101.32610246856599,486.4888225477365,420.8112228196567,4.392623994111222,393.785030914912,213.06700267386825,87.38459749342597,393.7999765417546,314.0248466733737,210.27063696801773,196.7372517065802,146.66791697124427,284.1226104654072,430.64835640474644,432.44777352240527,214.9454870891233,268.99424876211555,450.6524268772886,116.22248278961933,464.1787930022367,270.99074117448663,367.4038149846508,6.047487485444258,430.55821389163617,447.0522149029333,407.2903054141833,345.37223998198976,489.3539551114997,353.4628629875451,343.5673786734088,273.04914653443115,165.1380266461967,493.13476205346296,144.35936755695133,203.00244276031498,402.4545315900735,222.2883655210336,216.35574524083944,179.77460303744408,451.5633341083773,117.3699380954486,127.65445929543206,104.64518705733228,358.26290847833974,83.88351791250503,220.2742279560067,308.0134031671578,8.608395045320737,223.22830182480357,71.44937332156375,484.4204682055563,331.4167029318813,90.41148349887807,99.56998116033755,350.65804663705825,404.64573996641974,112.59380683611364,152.50272727814286,199.7318255556433,16.658362340438938,222.41762258439624,118.05644446261354,242.10111575168236,154.87373145309957,145.0870132459825,481.5605831129024,360.2297272691669,204.1825718452437,177.7914436544944,188.57072526534446,290.4886965492669,166.34313605735252,202.1010738023914,21.929543062656265,407.21787581489775,273.10262945892373,435.9400777065142,380.2370696202898,322.7202133888396,361.83604035803376,221.3634592575663,120.25209638862432,439.75540446141656,479.5477086041363,84.20057309353346,361.91636974665045,434.9603705027753,228.22828560239338,71.12056859752691,457.44089782304366,204.2084783849558,434.49410190524975,473.1679995848769,187.86824534555868,341.79060986462537,102.79483665910372,350.1380481381461,270.6407748036945,261.75996624117306,288.3571609790945,412.0270666684909,31.81626716223085,107.64985919970671,339.0392465802795,280.2742210621938,396.22716001021774,166.7964053258514,175.21387154953806,317.74850238293715,100.15585086243838,149.5570887928793,160.81967456424275,94.59214003282045,208.07838318745507,256.8457487035096,421.89340969359444,498.28543256996124,366.27701344959974,113.68755230561712,297.50390363753667,421.56169362784254,300.2088124086968,407.4703777813865,5.651799023428494,22.039706655739067,499.9402289782101,297.66599694655105,44.320773427195206,10.51934555043843,64.40636119404152,222.56722655542603,312.4591936714244,197.0138879874701,298.3569118958715,369.647698184326,362.60244412879916,111.4277210841611,150.45367017290147,143.4832838452904,379.80719102404817,121.30811556350662,291.074467002296,190.05047889109284,363.0228299710427,267.4033671528281,339.25780100948134,86.07600323466758,196.30989395774034,345.9092874172794,396.7586087512884,139.94669150737016,373.8844868823263,158.35952484660032,459.06453838246773,189.31653877402354,150.62804936860607,107.72934414256463,4.917280411197988,359.97728025418473,204.65335329742595,262.6111116653331,54.54374162171216,418.0089278820652,367.64679331153485,323.1713004575406,40.65049777650431,58.62543923563679,376.8163197400883,89.04560860324962,463.0461924129984,401.6367176185479,394.3043659010911,445.27309774949987,200.89394427499252,382.19432590811095,417.26434916678147,215.20918595249873,47.29100398218555,177.72599564215997,121.28767846218824,30.41903203806262,304.6321714353232,67.42262061787507,16.55664336608409,167.1973587486617,476.49011684784415,330.75424815795327,441.79725523374645,489.1565473129972,298.04368319852915,23.508050080671474,45.53049427288314,499.45298512425774,150.90860793711335,45.61098237218842,103.68375157678067,106.21092288041677,68.42090854983407,66.55837108499074,412.7345081144539,169.8587970597445,476.51260120391447,218.77556998937087,233.72473613461753,162.48399621904642,79.59657940689479,20.378238659860216,123.803023133786,257.125054472243,352.67373065799114,251.78204823564408,204.33215665272553,187.37360782066625,24.20001601612465,393.5231057139331,150.27530006385027,298.28483595248343,476.2680144640831,104.25764269904636,497.50046819864843,478.45709456044983,261.279187591558,109.60903684014379,298.4368206389992,488.276601226012,437.4406836368474,412.55176524540525,90.31739977826491,190.8251806882205,486.9223698488201,157.25968026242765,326.44879252658086,492.2981268958969,138.93153835994687,32.95644148068111,426.31804020034,21.32321105633239,377.42302797721294,301.00880696300135,173.33690844993055,195.04560199438902,199.70607823117172,200.0081658413584,351.7841132548429,25.728335170349116,256.80561844607354,13.624943875803485,99.66373705445453,323.37460861125766,300.6892258409284,493.7434107505225,36.6200392886985,175.5716416577049,301.28128175488376,236.3178292607413,90.09990657770683,313.49773264565187,252.8636910984764,51.932623029755206,373.9009877344578,300.63097049796863,229.25322442195883,89.72638449555303,368.20939215098167,217.16854976219568,164.051389811941,411.8559864780934,32.935876894952365,276.34638954468926,93.83538893550126,80.2141295519817,160.37959137703263,68.9655564824393,107.31791041752537,28.721477406096096,315.3718318880703,150.68365887912938,163.72327041677391,216.62976356387574,306.8250280955401,106.23312653444617,110.92016744968225,39.85311735365427,381.0999844913986,128.55795729144415,284.25288700469144,41.691814828158535,498.37569127871205,280.16520987060045,188.5979130400417,89.010305083426,25.0769404226463,472.6742182083232,251.93638475049585,201.70787093515528,270.0919449265753,404.18089184371576,130.52572169576882,50.81508377446464,143.31502193192858,207.68778494658767,362.0181669127973,252.21579456658205,179.0746892178452,331.70110070844885,46.14786841484519,417.971771092401,183.36589138728831,251.87121679626057,313.3865577653497,273.86771216617,267.36960432681354,117.80336561111493,234.5783904244827,452.1971919919274,422.3720149457075,398.4523630036737,79.76726844603232,68.35172948608836,152.53338941765327,65.53560478466636,0.987591504952201,296.042951867051,391.63298430633097,167.20366710785183,173.17861976896188,215.69911029734,410.2083582309418,275.0955764393854,235.96360194969378,458.1635119663148,93.34785607103801,84.47121881276898,437.5840927547742,393.5357121222559,229.4357483088466,317.91234988346775,171.41147440379078,395.7418583534355,205.8353111892809,127.34563319706693,470.4264347501127,28.51813517091484,263.05821306065724,374.65875413016516,188.78999128532635,81.49398683329079,121.61331501796747,42.1267803699299,127.26393410505732,489.3050092721069,259.4109226194937,238.46076419166795,191.81475749863841,49.20498985258259,94.40208715536546,358.17823753506536,484.2867471075891,104.9511548672789,257.46595859454845,9.92737451145953,335.5772814081482,320.04692631596134,68.34988629485694,116.48933568252528,476.337991128726,66.02480707586733,425.87655510208987,329.59615505262366,69.7330320183146,190.0035434715648,278.2981504125337,143.54701031317418,292.28361790039605,86.55550372500065,399.54098852251974,340.5343554524717,396.4700659453253,391.58095116772165,104.8148262846651,244.18556972696214,299.7186210007039,127.29143303843504,469.2440897753749,249.07019767537852,70.16275383372594,307.95498064338534,118.14907124445106,360.2833995229553,17.910889286982588,388.47830614894474,435.612454241438,172.55470710380715,325.46599809542056,241.42907649288193,355.6228942585169,314.2424194224898,91.71625657761318,401.45927923718614,42.25359480454183,219.78857704459952,328.25154518786036,403.4466747887144,412.75492452914796,162.4928336585908,375.79391835745736,62.90870091577616,237.2229095593783,417.52970224872246,360.93515088525527,419.81388892812265,58.680680536607355,136.38261660186447,255.06637527380582,143.77430760977472,5.26659419896558,463.5546942731055,160.76981727018224,3.166224846975374,196.56273175969054,116.71821967191399,452.19809349597386,235.57560473977745,416.9467691739164,1.2979844500603521,16.81972782914054,18.561729320125675,414.3877084043591,128.98599656043385,156.00758788763957,102.29619143165336,221.14493770083797,263.73511644458483,405.2899732636721,72.71099127069358,193.09772295630424,300.9172906971642,118.41804752643958,315.50631476302846,388.1562215346155,265.69932610247605,387.4281760355757,1.418750021723203,184.78330137585797,405.45527007518456,373.34936776326697,37.13838731327257,173.4977301048025,415.23468657657423,393.10804852068117,380.2324826393716,179.86373174073933,370.36305223072463,135.8632849043483,361.6547371296329,41.0435786680734,475.75816805435767,410.05965742355454,55.82553762953746,154.6668999910179,222.7907681864627,99.82181178107442,216.6800909235259,429.2731733494563,402.4841186167114,328.12468044149267,312.8996730943629,50.048831911735924,117.5792721498129,176.5739379649388,266.4914824014514,396.2380918892728,380.1590091929519,234.3173367942659,79.17608237110917,406.9440136554797,62.90989996658658,443.19590682947853,48.436830409547824,302.8041776785442,469.7505096140062,368.14640373779326,444.43671932637517,162.0782827041728,362.22801628787647,352.96973618400483,367.70202165164824,6.028989257682915,417.04075343270677,130.16776600967083,434.84594989730084,262.7774499125648,137.80095380448842,42.93879547361745,483.39735137824624,448.77895400003,90.56720765959415,147.20631700964182,75.0293657146639,387.66441707072295,423.6709983667125,119.4914746757657,121.22637018424842,18.74518159255578,201.54078780451044,317.0571299694997,328.8233636722895,34.0589816615543,170.26739831777127,255.508425522487,43.727304950508696,230.40496497539152,43.77938677982374,494.406085667892,72.49404117638147,256.24254810449423,406.50393237131544,434.6514508917976]}

},{}],92:[function(require,module,exports){
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
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
var isPositiveZero = require( '@stdlib/math/base/assert/is-positive-zero' );
var abs = require( '@stdlib/math/base/special/abs' );
var EPS = require( '@stdlib/constants/float64/eps' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var PI = require( '@stdlib/constants/float64/pi' );
var atan2 = require( './../lib' );


// FIXTURES //

var positivePositive = require( './fixtures/julia/positive_positive.json' );
var negativePositive = require( './fixtures/julia/negative_positive.json' );
var negativeNegative = require( './fixtures/julia/negative_negative.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof atan2, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function has two parameters: a numerator and a denominator value', function test( t ) {
	t.equal( atan2.length, 2.0, 'arity is 2' );
	t.end();
});

tape( 'the function returns `NaN` if provided `NaN` as either of the arguments', function test( t ) {
	t.equal( isnan( atan2( 2.0, NaN ) ), true, 'returns NaN' );
	t.equal( isnan( atan2( NaN, 3.0 ) ), true, 'returns NaN' );
	t.end();
});

tape( 'the function returns `+0` if provided `y = +0.0` and `x >= 0`', function test( t ) {
	t.equal( isPositiveZero( atan2( +0.0, 0.0 ) ), true, 'returns +0' );
	t.equal( isPositiveZero( atan2( +0.0, 2.0 ) ), true, 'returns +0' );
	t.equal( isPositiveZero( atan2( +0.0, 4.0 ) ), true, 'returns +0' );
	t.equal( isPositiveZero( atan2( +0.0, 5.0 ) ), true, 'returns +0' );
	t.equal( isPositiveZero( atan2( +0.0, 10.0 ) ), true, 'returns +0' );
	t.end();
});

tape( 'the function returns `-0` if provided `y = -0.0` and `x >= 0`', function test( t ) {
	t.equal( isNegativeZero( atan2( -0.0, 0.0 ) ), true, 'returns -0' );
	t.equal( isNegativeZero( atan2( -0.0, 2.0 ) ), true, 'returns -0' );
	t.equal( isNegativeZero( atan2( -0.0, 4.0 ) ), true, 'returns -0' );
	t.equal( isNegativeZero( atan2( -0.0, 5.0 ) ), true, 'returns -0' );
	t.equal( isNegativeZero( atan2( -0.0, 10.0 ) ), true, 'returns -0' );
	t.end();
});

tape( 'the function returns `PI` if provided `y = +0.0` and `x <= -0.0`', function test( t ) {
	t.equal( atan2( +0.0, -0.0 ), +PI, 'returns +PI' );
	t.equal( atan2( +0.0, -2.0 ), +PI, 'returns +PI' );
	t.equal( atan2( +0.0, -4.0 ), +PI, 'returns +PI' );
	t.equal( atan2( +0.0, -5.0 ), +PI, 'returns +PI' );
	t.equal( atan2( +0.0, -10.0 ), +PI, 'returns +PI' );
	t.end();
});

tape( 'the function returns `-PI` if provided `y = -0.0` and `x <= -0.0`', function test( t ) {
	t.equal( atan2( -0.0, -0.0 ), -PI, 'returns -PI' );
	t.equal( atan2( -0.0, -2.0 ), -PI, 'returns -PI' );
	t.equal( atan2( -0.0, -4.0 ), -PI, 'returns -PI' );
	t.equal( atan2( -0.0, -5.0 ), -PI, 'returns -PI' );
	t.equal( atan2( -0.0, -10.0 ), -PI, 'returns -PI' );
	t.end();
});

tape( 'the function returns `+PI/4` if provided `x = y = +infinity`', function test( t ) {
	t.equal( atan2( PINF, PINF ), +PI/4.0, 'returns +PI/4' );
	t.end();
});

tape( 'the function returns `-PI/4` if provided `x = -y = +infinity`', function test( t ) {
	t.equal( atan2( NINF, PINF ), -PI/4.0, 'returns -PI/4' );
	t.end();
});

tape( 'the function returns `*3*PI/4` if provided `-x = y = +infinity`', function test( t ) {
	t.equal( atan2( PINF, NINF ), +3.0*PI/4.0, 'returns +3*PI/4' );
	t.end();
});

tape( 'the function returns `-3*PI/4` if provided `x = y = -infinity`', function test( t ) {
	t.equal( atan2( NINF, NINF ), -3.0*PI/4.0, 'returns -3*PI/4' );
	t.end();
});

tape( 'the function returns `0.0` when `x = +infinity`', function test( t ) {
	t.equal( atan2( -2.0, PINF ), 0.0, 'returns 0.0' );
	t.equal( atan2( 0.0, PINF ), 0.0, 'returns 0.0' );
	t.equal( atan2( 2.0, PINF ), 0.0, 'returns 0.0' );
	t.end();
});

tape( 'the function returns `+PI` when `y > 0` and `x = -infinity`', function test( t ) {
	t.equal( atan2( 1.0, NINF ), PI, 'returns PI' );
	t.equal( atan2( 2.0, NINF ), PI, 'returns PI' );
	t.equal( atan2( 3.0, NINF ), PI, 'returns PI' );
	t.end();
});

tape( 'the function returns `-PI` when `y < 0` and `x = -infinity`', function test( t ) {
	t.equal( atan2( -1.0, NINF ), -PI, 'returns -PI' );
	t.equal( atan2( -2.0, NINF ), -PI, 'returns -PI' );
	t.equal( atan2( -3.0, NINF ), -PI, 'returns -PI' );
	t.end();
});

tape( 'the function returns `+PI/2` when `y = +infinity`', function test( t ) {
	t.equal( atan2( PINF, -1.0 ), PI/2.0, 'returns PI/2' );
	t.equal( atan2( PINF, 0.0 ), PI/2.0, 'returns PI/2' );
	t.equal( atan2( PINF, 2.0 ), PI/2.0, 'returns PI/2' );
	t.end();
});

tape( 'the function returns `-PI/2` when `y = -infinity`', function test( t ) {
	t.equal( atan2( NINF, -1.0 ), -PI/2.0, 'returns -PI/2' );
	t.equal( atan2( NINF, 0.0 ), -PI/2.0, 'returns -PI/2' );
	t.equal( atan2( NINF, 2.0 ), -PI/2.0, 'returns -PI/2' );
	t.end();
});

tape( 'the function returns `PI/2` if provided a positive `y` and `x=0`', function test( t ) {
	t.equal( atan2( 2.0, 0.0 ), PI/2.0, 'returns PI/2' );
	t.equal( atan2( 1.0, 0.0 ), PI/2.0, 'returns PI/2' );
	t.equal( atan2( 0.5, 0.0 ), PI/2.0, 'returns PI/2' );
	t.end();
});

tape( 'the function returns `-PI/2` if provided a negative `y` and `x=0`', function test( t ) {
	t.equal( atan2( -2.0, 0.0 ), -PI/2.0, 'returns PI/2' );
	t.equal( atan2( -1.0, 0.0 ), -PI/2.0, 'returns PI/2' );
	t.equal( atan2( -0.5, 0.0 ), -PI/2.0, 'returns PI/2' );
	t.end();
});

tape( 'the function evaluates the `atan2` function (when x and y are positive)', function test( t ) {
	var expected;
	var actual;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	y = positivePositive.y;
	x = positivePositive.x;
	expected = positivePositive.expected;
	for ( i = 0; i < x.length; i++ ) {
		actual = atan2( y[i], x[i] );
		delta = abs( actual - expected[i] );
		tol = EPS * abs( expected[i] );
		t.equal( delta <= tol, true, 'within tolerance. y: '+y[i]+'. x: '+x[i]+'. Actual: '+actual+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
	}
	t.end();
});

tape( 'the function evaluates the `atan2` function (when x is negative and y is positive)', function test( t ) {
	var expected;
	var actual;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	y = negativePositive.y;
	x = negativePositive.x;
	expected = negativePositive.expected;
	for ( i = 0; i < x.length; i++ ) {
		actual = atan2( y[i], x[i] );
		delta = abs( actual - expected[i] );
		tol = 2.0 * EPS * abs( expected[i] );
		t.equal( delta <= tol, true, 'within tolerance. y: '+y[i]+'. x: '+x[i]+'. Actual: '+actual+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
	}
	t.end();
});

tape( 'the function evaluates the `atan2` function (when x and y are negative)', function test( t ) {
	var expected;
	var actual;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	y = negativeNegative.y;
	x = negativeNegative.x;
	expected = negativeNegative.expected;
	for ( i = 0; i < x.length; i++ ) {
		actual = atan2( y[i], x[i] );
		delta = abs( actual - expected[i] );
		tol = 2.0 * EPS * abs( expected[i] );
		t.equal( delta <= tol, true, 'within tolerance. y: '+y[i]+'. x: '+x[i]+'. Actual: '+actual+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/atan2/test/test.js")
},{"./../lib":87,"./fixtures/julia/negative_negative.json":89,"./fixtures/julia/negative_positive.json":90,"./fixtures/julia/positive_positive.json":91,"@stdlib/constants/float64/eps":62,"@stdlib/constants/float64/ninf":67,"@stdlib/constants/float64/pi":68,"@stdlib/constants/float64/pinf":69,"@stdlib/math/base/assert/is-nan":75,"@stdlib/math/base/assert/is-negative-zero":77,"@stdlib/math/base/assert/is-positive-zero":79,"@stdlib/math/base/special/abs":81,"tape":287}],93:[function(require,module,exports){
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
var abs = require( '@stdlib/math/base/special/abs' );
var tryRequire = require( '@stdlib/utils/try-require' );
var EPS = require( '@stdlib/constants/float64/eps' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var PI = require( '@stdlib/constants/float64/pi' );


// FIXTURES //

var positivePositive = require( './fixtures/julia/positive_positive.json' );
var negativePositive = require( './fixtures/julia/negative_positive.json' );
var negativeNegative = require( './fixtures/julia/negative_negative.json' );


// VARIABLES //

var atan2 = tryRequire( resolve( __dirname, './../lib/native.js' ) );
var opts = {
	'skip': ( atan2 instanceof Error )
};


// TESTS //

tape( 'main export is a function', opts, function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof atan2, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function has two parameters: a numerator and a denominator value', opts, function test( t ) {
	t.equal( atan2.length, 2.0, 'arity is 2' );
	t.end();
});

tape( 'the function returns `NaN` if provided `NaN` as either of the arguments', opts, function test( t ) {
	t.equal( isnan( atan2( 2.0, NaN ) ), true, 'returns NaN' );
	t.equal( isnan( atan2( NaN, 3.0 ) ), true, 'returns NaN' );
	t.end();
});

tape( 'the function returns `+0` if provided `y = +0.0` and `x >= 0`', opts, function test( t ) {
	t.equal( isPositiveZero( atan2( +0.0, 0.0 ) ), true, 'returns +0' );
	t.equal( isPositiveZero( atan2( +0.0, 2.0 ) ), true, 'returns +0' );
	t.equal( isPositiveZero( atan2( +0.0, 4.0 ) ), true, 'returns +0' );
	t.equal( isPositiveZero( atan2( +0.0, 5.0 ) ), true, 'returns +0' );
	t.equal( isPositiveZero( atan2( +0.0, 10.0 ) ), true, 'returns +0' );
	t.end();
});

tape( 'the function returns `-0` if provided `y = -0.0` and `x >= 0`', opts, function test( t ) {
	t.equal( isNegativeZero( atan2( -0.0, 0.0 ) ), true, 'returns -0' );
	t.equal( isNegativeZero( atan2( -0.0, 2.0 ) ), true, 'returns -0' );
	t.equal( isNegativeZero( atan2( -0.0, 4.0 ) ), true, 'returns -0' );
	t.equal( isNegativeZero( atan2( -0.0, 5.0 ) ), true, 'returns -0' );
	t.equal( isNegativeZero( atan2( -0.0, 10.0 ) ), true, 'returns -0' );
	t.end();
});

tape( 'the function returns `PI` if provided `y = +0.0` and `x <= -0.0`', opts, function test( t ) {
	t.equal( atan2( +0.0, -0.0 ), +PI, 'returns +PI' );
	t.equal( atan2( +0.0, -2.0 ), +PI, 'returns +PI' );
	t.equal( atan2( +0.0, -4.0 ), +PI, 'returns +PI' );
	t.equal( atan2( +0.0, -5.0 ), +PI, 'returns +PI' );
	t.equal( atan2( +0.0, -10.0 ), +PI, 'returns +PI' );
	t.end();
});

tape( 'the function returns `-PI` if provided `y = -0.0` and `x <= -0.0`', opts, function test( t ) {
	t.equal( atan2( -0.0, -0.0 ), -PI, 'returns -PI' );
	t.equal( atan2( -0.0, -2.0 ), -PI, 'returns -PI' );
	t.equal( atan2( -0.0, -4.0 ), -PI, 'returns -PI' );
	t.equal( atan2( -0.0, -5.0 ), -PI, 'returns -PI' );
	t.equal( atan2( -0.0, -10.0 ), -PI, 'returns -PI' );
	t.end();
});

tape( 'the function returns `+PI/4` if provided `x = y = +infinity`', opts, function test( t ) {
	t.equal( atan2( PINF, PINF ), +PI/4.0, 'returns +PI/4' );
	t.end();
});

tape( 'the function returns `-PI/4` if provided `x = -y = +infinity`', opts, function test( t ) {
	t.equal( atan2( NINF, PINF ), -PI/4.0, 'returns -PI/4' );
	t.end();
});

tape( 'the function returns `*3*PI/4` if provided `-x = y = +infinity`', opts, function test( t ) {
	t.equal( atan2( PINF, NINF ), +3.0*PI/4.0, 'returns +3*PI/4' );
	t.end();
});

tape( 'the function returns `-3*PI/4` if provided `x = y = -infinity`', opts, function test( t ) {
	t.equal( atan2( NINF, NINF ), -3.0*PI/4.0, 'returns -3*PI/4' );
	t.end();
});

tape( 'the function returns `0.0` when `x = +infinity`', opts, function test( t ) {
	t.equal( atan2( -2.0, PINF ), 0.0, 'returns 0.0' );
	t.equal( atan2( 0.0, PINF ), 0.0, 'returns 0.0' );
	t.equal( atan2( 2.0, PINF ), 0.0, 'returns 0.0' );
	t.end();
});

tape( 'the function returns `+PI` when `y > 0` and `x = -infinity`', opts, function test( t ) {
	t.equal( atan2( 1.0, NINF ), PI, 'returns PI' );
	t.equal( atan2( 2.0, NINF ), PI, 'returns PI' );
	t.equal( atan2( 3.0, NINF ), PI, 'returns PI' );
	t.end();
});

tape( 'the function returns `-PI` when `y < 0` and `x = -infinity`', opts, function test( t ) {
	t.equal( atan2( -1.0, NINF ), -PI, 'returns -PI' );
	t.equal( atan2( -2.0, NINF ), -PI, 'returns -PI' );
	t.equal( atan2( -3.0, NINF ), -PI, 'returns -PI' );
	t.end();
});

tape( 'the function returns `+PI/2` when `y = +infinity`', opts, function test( t ) {
	t.equal( atan2( PINF, -1.0 ), PI/2.0, 'returns PI/2' );
	t.equal( atan2( PINF, 0.0 ), PI/2.0, 'returns PI/2' );
	t.equal( atan2( PINF, 2.0 ), PI/2.0, 'returns PI/2' );
	t.end();
});

tape( 'the function returns `-PI/2` when `y = -infinity`', opts, function test( t ) {
	t.equal( atan2( NINF, -1.0 ), -PI/2.0, 'returns -PI/2' );
	t.equal( atan2( NINF, 0.0 ), -PI/2.0, 'returns -PI/2' );
	t.equal( atan2( NINF, 2.0 ), -PI/2.0, 'returns -PI/2' );
	t.end();
});

tape( 'the function returns `PI/2` if provided a positive `y` and `x=0`', opts, function test( t ) {
	t.equal( atan2( 2.0, 0.0 ), PI/2.0, 'returns PI/2' );
	t.equal( atan2( 1.0, 0.0 ), PI/2.0, 'returns PI/2' );
	t.equal( atan2( 0.5, 0.0 ), PI/2.0, 'returns PI/2' );
	t.end();
});

tape( 'the function returns `-PI/2` if provided a negative `y` and `x=0`', opts, function test( t ) {
	t.equal( atan2( -2.0, 0.0 ), -PI/2.0, 'returns PI/2' );
	t.equal( atan2( -1.0, 0.0 ), -PI/2.0, 'returns PI/2' );
	t.equal( atan2( -0.5, 0.0 ), -PI/2.0, 'returns PI/2' );
	t.end();
});

tape( 'the function evaluates the `atan2` function (when x and y are positive)', opts, function test( t ) {
	var expected;
	var actual;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	y = positivePositive.y;
	x = positivePositive.x;
	expected = positivePositive.expected;
	for ( i = 0; i < x.length; i++ ) {
		actual = atan2( y[i], x[i] );
		delta = abs( actual - expected[i] );
		tol = EPS * abs( expected[i] );
		t.equal( delta <= tol, true, 'within tolerance. y: '+y[i]+'. x: '+x[i]+'. Actual: '+actual+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
	}
	t.end();
});

tape( 'the function evaluates the `atan2` function (when x is negative and y is positive)', opts, function test( t ) {
	var expected;
	var actual;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	y = negativePositive.y;
	x = negativePositive.x;
	expected = negativePositive.expected;
	for ( i = 0; i < x.length; i++ ) {
		actual = atan2( y[i], x[i] );
		delta = abs( actual - expected[i] );
		tol = 2.0 * EPS * abs( expected[i] );
		t.equal( delta <= tol, true, 'within tolerance. y: '+y[i]+'. x: '+x[i]+'. Actual: '+actual+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
	}
	t.end();
});

tape( 'the function evaluates the `atan2` function (when x and y are negative)', opts, function test( t ) {
	var expected;
	var actual;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	y = negativeNegative.y;
	x = negativeNegative.x;
	expected = negativeNegative.expected;
	for ( i = 0; i < x.length; i++ ) {
		actual = atan2( y[i], x[i] );
		delta = abs( actual - expected[i] );
		tol = 2.0 * EPS * abs( expected[i] );
		t.equal( delta <= tol, true, 'within tolerance. y: '+y[i]+'. x: '+x[i]+'. Actual: '+actual+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/atan2/test/test.native.js","/lib/node_modules/@stdlib/math/base/special/atan2/test")
},{"./fixtures/julia/negative_negative.json":89,"./fixtures/julia/negative_positive.json":90,"./fixtures/julia/positive_positive.json":91,"@stdlib/constants/float64/eps":62,"@stdlib/constants/float64/ninf":67,"@stdlib/constants/float64/pi":68,"@stdlib/constants/float64/pinf":69,"@stdlib/math/base/assert/is-nan":75,"@stdlib/math/base/assert/is-negative-zero":77,"@stdlib/math/base/assert/is-positive-zero":79,"@stdlib/math/base/special/abs":81,"@stdlib/utils/try-require":155,"path":169,"tape":287}],94:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Return a double-precision floating-point number with the magnitude of `x` and the sign of `y`.
*
* @module @stdlib/math/base/special/copysign
*
* @example
* var copysign = require( '@stdlib/math/base/special/copysign' );
*
* var z = copysign( -3.14, 10.0 );
* // returns 3.14
*
* z = copysign( 3.14, -1.0 );
* // returns -3.14
*
* z = copysign( 1.0, -0.0 );
* // returns -1.0
*
* z = copysign( -3.14, -0.0 );
* // returns -3.14
*
* z = copysign( -0.0, 1.0 );
* // returns 0.0
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":95}],95:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var SIGN_MASK = require( '@stdlib/constants/float64/high-word-sign-mask' );
var ABS_MASK = require( '@stdlib/constants/float64/high-word-abs-mask' );
var toWords = require( '@stdlib/number/float64/base/to-words' );
var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var fromWords = require( '@stdlib/number/float64/base/from-words' );


// VARIABLES //

// High/low words workspace:
var WORDS = [ 0, 0 ];


// MAIN //

/**
* Returns a double-precision floating-point number with the magnitude of `x` and the sign of `y`.
*
* @param {number} x - number from which to derive a magnitude
* @param {number} y - number from which to derive a sign
* @returns {number} a double-precision floating-point number
*
* @example
* var z = copysign( -3.14, 10.0 );
* // returns 3.14
*
* @example
* var z = copysign( 3.14, -1.0 );
* // returns -3.14
*
* @example
* var z = copysign( 1.0, -0.0 );
* // returns -1.0
*
* @example
* var z = copysign( -3.14, -0.0 );
* // returns -3.14
*
* @example
* var z = copysign( -0.0, 1.0 );
* // returns 0.0
*/
function copysign( x, y ) {
	var hx;
	var hy;

	// Split `x` into higher and lower order words:
	toWords.assign( x, WORDS, 1, 0 );
	hx = WORDS[ 0 ];

	// Turn off the sign bit of `x`:
	hx &= ABS_MASK;

	// Extract the higher order word from `y`:
	hy = getHighWord( y );

	// Leave only the sign bit of `y` turned on:
	hy &= SIGN_MASK;

	// Copy the sign bit of `y` to `x`:
	hx |= hy;

	// Return a new value having the same magnitude as `x`, but with the sign of `y`:
	return fromWords( hx, WORDS[ 1 ] );
}


// EXPORTS //

module.exports = copysign;

},{"@stdlib/constants/float64/high-word-abs-mask":65,"@stdlib/constants/float64/high-word-sign-mask":66,"@stdlib/number/float64/base/from-words":98,"@stdlib/number/float64/base/get-high-word":102,"@stdlib/number/float64/base/to-words":107}],96:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":97}],97:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Create a double-precision floating-point number from a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* @module @stdlib/number/float64/base/from-words
*
* @example
* var fromWords = require( '@stdlib/number/float64/base/from-words' );
*
* var v = fromWords( 1774486211, 2479577218 );
* // returns 3.14e201
*
* v = fromWords( 3221823995, 1413754136 );
* // returns -3.141592653589793
*
* v = fromWords( 0, 0 );
* // returns 0.0
*
* v = fromWords( 2147483648, 0 );
* // returns -0.0
*
* v = fromWords( 2146959360, 0 );
* // returns NaN
*
* v = fromWords( 2146435072, 0 );
* // returns Infinity
*
* v = fromWords( 4293918720, 0 );
* // returns -Infinity
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":100}],99:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var indices;
var HIGH;
var LOW;

if ( isLittleEndian === true ) {
	HIGH = 1; // second index
	LOW = 0; // first index
} else {
	HIGH = 0; // first index
	LOW = 1; // second index
}
indices = {
	'HIGH': HIGH,
	'LOW': LOW
};


// EXPORTS //

module.exports = indices;

},{"@stdlib/assert/is-little-endian":48}],100:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
var indices = require( './indices.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );

var HIGH = indices.HIGH;
var LOW = indices.LOW;


// MAIN //

/**
* Creates a double-precision floating-point number from a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
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
* In which Uint32 should we place the higher order bits? If little endian, the second; if big endian, the first.
*
* ## References
*
* -   [Open Group][1]
*
* [1]: http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm
*
* @param {uinteger32} high - higher order word (unsigned 32-bit integer)
* @param {uinteger32} low - lower order word (unsigned 32-bit integer)
* @returns {number} floating-point number
*
* @example
* var v = fromWords( 1774486211, 2479577218 );
* // returns 3.14e201
*
* @example
* var v = fromWords( 3221823995, 1413754136 );
* // returns -3.141592653589793
*
* @example
* var v = fromWords( 0, 0 );
* // returns 0.0
*
* @example
* var v = fromWords( 2147483648, 0 );
* // returns -0.0
*
* @example
* var v = fromWords( 2146959360, 0 );
* // returns NaN
*
* @example
* var v = fromWords( 2146435072, 0 );
* // returns Infinity
*
* @example
* var v = fromWords( 4293918720, 0 );
* // returns -Infinity
*/
function fromWords( high, low ) {
	UINT32_VIEW[ HIGH ] = high;
	UINT32_VIEW[ LOW ] = low;
	return FLOAT64_VIEW[ 0 ];
}


// EXPORTS //

module.exports = fromWords;

},{"./indices.js":99,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/is-little-endian":48}],102:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":103}],103:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./high.js":101,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],104:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Return a boolean indicating if the sign bit is on (true) or off (false).
*
* @module @stdlib/number/float64/base/signbit
*
* @example
* var signbit = require( '@stdlib/number/float64/base/signbit' );
*
* var bool = signbit( 4.0 );
* // returns false
*
* bool = signbit( -9.14e-307 );
* // returns true
*
* bool = signbit( 0.0 );
* // returns false
*
* bool = signbit( -0.0 );
* // returns true
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":105}],105:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );


// MAIN //

/**
* Returns a boolean indicating if the sign bit is on (true) or off (false).
*
* @param {number} x - input value
* @returns {boolean} boolean indicating if sign bit is on or off
*
* @example
* var bool = signbit( 4.0 );
* // returns false
*
* @example
* var bool = signbit( -9.14e-307 );
* // returns true
*
* @example
* var bool = signbit( 0.0 );
* // returns false
*
* @example
* var bool = signbit( -0.0 );
* // returns true
*/
function signbit( x ) {
	// Extract from the input value a higher order word (unsigned 32-bit integer) containing the exponent and sign:
	var high = getHighWord( x );

	// Shift off all bits which are not the sign bit and check if the sign bit is on:
	return ( high >>> 31 ) ? true : false; // eslint-disable-line no-unneeded-ternary
}


// EXPORTS //

module.exports = signbit;

},{"@stdlib/number/float64/base/get-high-word":102}],106:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
var indices = require( './indices.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );

var HIGH = indices.HIGH;
var LOW = indices.LOW;


// MAIN //

/**
* Splits a double-precision floating-point number into a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
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
* @private
* @param {number} x - input value
* @param {Collection} out - output array
* @param {integer} stride - output array stride
* @param {NonNegativeInteger} offset - output array index offset
* @returns {Collection} output array
*
* @example
* var Uint32Array = require( '@stdlib/array/uint32' );
*
* var out = new Uint32Array( 2 );
*
* var w = toWords( 3.14e201, out, 1, 0 );
* // returns <Uint32Array>[ 1774486211, 2479577218 ]
*
* var bool = ( w === out );
* // returns true
*/
function toWords( x, out, stride, offset ) {
	FLOAT64_VIEW[ 0 ] = x;
	out[ offset ] = UINT32_VIEW[ HIGH ];
	out[ offset + stride ] = UINT32_VIEW[ LOW ];
	return out;
}


// EXPORTS //

module.exports = toWords;

},{"./indices.js":108,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],107:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Split a double-precision floating-point number into a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* @module @stdlib/number/float64/base/to-words
*
* @example
* var toWords = require( '@stdlib/number/float64/base/to-words' );
*
* var w = toWords( 3.14e201 );
* // returns [ 1774486211, 2479577218 ]
*
* @example
* var Uint32Array = require( '@stdlib/array/uint32' );
* var toWords = require( '@stdlib/number/float64/base/to-words' );
*
* var out = new Uint32Array( 2 );
*
* var w = toWords.assign( 3.14e201, out, 1, 0 );
* // returns <Uint32Array>[ 1774486211, 2479577218 ]
*
* var bool = ( w === out );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var assign = require( './assign.js' );


// MAIN //

setReadOnly( main, 'assign', assign );


// EXPORTS //

module.exports = main;

},{"./assign.js":106,"./main.js":109,"@stdlib/utils/define-nonenumerable-read-only-property":132}],108:[function(require,module,exports){
arguments[4][99][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":48,"dup":99}],109:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var fcn = require( './assign.js' );


// MAIN //

/**
* Splits a double-precision floating-point number into a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* @param {number} x - input value
* @returns {Array<number>} output array
*
* @example
* var w = toWords( 3.14e201 );
* // returns [ 1774486211, 2479577218 ]
*/
function toWords( x ) {
	return fcn( x, [ 0>>>0, 0>>>0 ], 1, 0 );
}


// EXPORTS //

module.exports = toWords;

},{"./assign.js":106}],110:[function(require,module,exports){
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

},{"./main.js":111}],111:[function(require,module,exports){
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

},{}],112:[function(require,module,exports){
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

},{"./main.js":113,"./regexp.js":114,"@stdlib/utils/define-nonenumerable-read-only-property":132}],113:[function(require,module,exports){
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

},{}],114:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":113}],115:[function(require,module,exports){
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

},{"./is_number.js":118}],116:[function(require,module,exports){
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

},{"./is_number.js":118,"./zero_pad.js":122}],117:[function(require,module,exports){
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

},{"./main.js":120}],118:[function(require,module,exports){
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

},{}],119:[function(require,module,exports){
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

},{}],120:[function(require,module,exports){
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

},{"./format_double.js":115,"./format_integer.js":116,"./is_string.js":119,"./space_pad.js":121,"./zero_pad.js":122}],121:[function(require,module,exports){
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

},{}],122:[function(require,module,exports){
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

},{}],123:[function(require,module,exports){
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

},{"./main.js":124}],124:[function(require,module,exports){
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

},{"./main.js":127}],126:[function(require,module,exports){
arguments[4][119][0].apply(exports,arguments)
},{"dup":119}],127:[function(require,module,exports){
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

},{"./is_string.js":126,"@stdlib/string/base/format-interpolate":117,"@stdlib/string/base/format-tokenize":123}],128:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":129}],129:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":131}],131:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/is-buffer":39,"@stdlib/regexp/function-name":112,"@stdlib/utils/native-class":150}],132:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":133}],133:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/define-property":137}],134:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],135:[function(require,module,exports){
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

},{}],136:[function(require,module,exports){
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

},{"./define_property.js":135}],137:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./builtin.js":134,"./has_define_property_support.js":136,"./polyfill.js":138}],138:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":125}],139:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./native.js":142,"./polyfill.js":143,"@stdlib/assert/is-function":45}],140:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":141}],141:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./detect.js":139,"@stdlib/object/ctor":110}],142:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],143:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./proto.js":144,"@stdlib/utils/native-class":150}],144:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],145:[function(require,module,exports){
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

},{"./codegen.js":146,"./global_this.js":147,"./self.js":148,"./window.js":149,"@stdlib/assert/is-boolean":33,"@stdlib/string/format":125}],146:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],147:[function(require,module,exports){
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

},{}],148:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MAIN //

var obj = ( typeof window === 'object' ) ? window : null;


// EXPORTS //

module.exports = obj;

},{}],150:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":151,"./polyfill.js":152,"@stdlib/assert/has-tostringtag-support":20}],151:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./tostring.js":153}],152:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./tostring.js":153,"./tostringtag.js":154,"@stdlib/assert/has-own-property":16}],153:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MODULES //

var Symbol = require( '@stdlib/symbol/ctor' );


// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{"@stdlib/symbol/ctor":128}],155:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":156}],156:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/is-error":41}],157:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./fixtures/nodelist.js":158,"./fixtures/re.js":159,"./fixtures/typedarray.js":160}],158:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/global":145}],159:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var typedarray = Int8Array; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = typedarray;

},{}],161:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./check.js":157,"./main.js":162,"./polyfill.js":163}],162:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/constructor-name":130}],163:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/constructor-name":130}],164:[function(require,module,exports){
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

},{}],165:[function(require,module,exports){

},{}],166:[function(require,module,exports){
arguments[4][165][0].apply(exports,arguments)
},{"dup":165}],167:[function(require,module,exports){
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
},{"base64-js":164,"buffer":167,"ieee754":270}],168:[function(require,module,exports){
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

},{}],169:[function(require,module,exports){
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
},{"_process":277}],170:[function(require,module,exports){
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

},{"events":168,"inherits":271,"readable-stream/lib/_stream_duplex.js":172,"readable-stream/lib/_stream_passthrough.js":173,"readable-stream/lib/_stream_readable.js":174,"readable-stream/lib/_stream_transform.js":175,"readable-stream/lib/_stream_writable.js":176,"readable-stream/lib/internal/streams/end-of-stream.js":180,"readable-stream/lib/internal/streams/pipeline.js":182}],171:[function(require,module,exports){
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

},{}],172:[function(require,module,exports){
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
},{"./_stream_readable":174,"./_stream_writable":176,"_process":277,"inherits":271}],173:[function(require,module,exports){
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
},{"./_stream_transform":175,"inherits":271}],174:[function(require,module,exports){
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
},{"../errors":171,"./_stream_duplex":172,"./internal/streams/async_iterator":177,"./internal/streams/buffer_list":178,"./internal/streams/destroy":179,"./internal/streams/from":181,"./internal/streams/state":183,"./internal/streams/stream":184,"_process":277,"buffer":167,"events":168,"inherits":271,"string_decoder/":286,"util":165}],175:[function(require,module,exports){
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
},{"../errors":171,"./_stream_duplex":172,"inherits":271}],176:[function(require,module,exports){
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
},{"../errors":171,"./_stream_duplex":172,"./internal/streams/destroy":179,"./internal/streams/state":183,"./internal/streams/stream":184,"_process":277,"buffer":167,"inherits":271,"util-deprecate":295}],177:[function(require,module,exports){
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
},{"./end-of-stream":180,"_process":277}],178:[function(require,module,exports){
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
},{"buffer":167,"util":165}],179:[function(require,module,exports){
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
},{"_process":277}],180:[function(require,module,exports){
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
},{"../../../errors":171}],181:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],182:[function(require,module,exports){
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
},{"../../../errors":171,"./end-of-stream":180}],183:[function(require,module,exports){
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
},{"../../../errors":171}],184:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":168}],185:[function(require,module,exports){
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

},{"./":186,"get-intrinsic":261}],186:[function(require,module,exports){
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

},{"es-define-property":246,"es-errors/type":252,"function-bind":260,"get-intrinsic":261,"set-function-length":281}],187:[function(require,module,exports){
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

},{"./lib/is_arguments.js":188,"./lib/keys.js":189}],188:[function(require,module,exports){
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

},{}],189:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],190:[function(require,module,exports){
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

},{"es-define-property":246,"es-errors/syntax":251,"es-errors/type":252,"gopd":262}],191:[function(require,module,exports){
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

},{"define-data-property":190,"has-property-descriptors":263,"object-keys":275}],192:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],193:[function(require,module,exports){
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

},{"./ToNumber":224,"./ToPrimitive":226,"./Type":231}],194:[function(require,module,exports){
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

},{"../helpers/isFinite":239,"../helpers/isNaN":240,"../helpers/isPrefixOf":241,"./ToNumber":224,"./ToPrimitive":226,"es-errors/type":252,"get-intrinsic":261}],195:[function(require,module,exports){
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

},{"call-bind/callBound":185,"es-errors/type":252}],196:[function(require,module,exports){
'use strict';

var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value) {
	return RequireObjectCoercible(value, arguments.length > 1 ? arguments[1] : void undefined);
};

},{"es-object-atoms/RequireObjectCoercible":254}],197:[function(require,module,exports){
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

},{"./DayWithinYear":200,"./InLeapYear":204,"./MonthFromTime":214,"es-errors/eval":247}],198:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":245,"./floor":235}],199:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":235}],200:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":198,"./DayFromYear":199,"./YearFromTime":233}],201:[function(require,module,exports){
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

},{"./modulo":236}],202:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":243,"./IsAccessorDescriptor":205,"./IsDataDescriptor":207,"es-errors/type":252}],203:[function(require,module,exports){
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

},{"../helpers/timeConstants":245,"./floor":235,"./modulo":236}],204:[function(require,module,exports){
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

},{"./DaysInYear":201,"./YearFromTime":233,"es-errors/eval":247}],205:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":243,"es-errors/type":252,"hasown":269}],206:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":272}],207:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":243,"es-errors/type":252,"hasown":269}],208:[function(require,module,exports){
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

},{"./IsAccessorDescriptor":205,"./IsDataDescriptor":207,"./IsPropertyDescriptor":209,"es-errors/type":252}],209:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor(Desc);
};

},{"../helpers/records/property-descriptor":243}],210:[function(require,module,exports){
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

},{"../helpers/isFinite":239,"../helpers/timeConstants":245}],211:[function(require,module,exports){
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

},{"../helpers/isFinite":239,"./DateFromTime":197,"./Day":198,"./MonthFromTime":214,"./ToInteger":223,"./YearFromTime":233,"./floor":235,"./modulo":236,"get-intrinsic":261}],212:[function(require,module,exports){
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

},{"../helpers/isFinite":239,"../helpers/timeConstants":245,"./ToInteger":223}],213:[function(require,module,exports){
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

},{"../helpers/timeConstants":245,"./floor":235,"./modulo":236}],214:[function(require,module,exports){
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

},{"./DayWithinYear":200,"./InLeapYear":204}],215:[function(require,module,exports){
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

},{"../helpers/isNaN":240}],216:[function(require,module,exports){
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

},{"../helpers/timeConstants":245,"./floor":235,"./modulo":236}],217:[function(require,module,exports){
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

},{"./Type":231}],218:[function(require,module,exports){
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


},{"../helpers/isFinite":239,"./ToNumber":224,"./abs":234,"get-intrinsic":261}],219:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":245,"./DayFromYear":199}],220:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":245,"./modulo":236}],221:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],222:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":224}],223:[function(require,module,exports){
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

},{"../helpers/isFinite":239,"../helpers/isNaN":240,"../helpers/sign":244,"./ToNumber":224,"./abs":234,"./floor":235}],224:[function(require,module,exports){
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

},{"./ToPrimitive":226,"call-bind/callBound":185,"safe-regex-test":280}],225:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = require('es-object-atoms/ToObject');

},{"es-object-atoms/ToObject":255}],226:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":257}],227:[function(require,module,exports){
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

},{"./IsCallable":206,"./ToBoolean":221,"./Type":231,"es-errors/type":252,"hasown":269}],228:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":261}],229:[function(require,module,exports){
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

},{"../helpers/isFinite":239,"../helpers/isNaN":240,"../helpers/sign":244,"./ToNumber":224,"./abs":234,"./floor":235,"./modulo":236}],230:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":224}],231:[function(require,module,exports){
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

},{}],232:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":198,"./modulo":236}],233:[function(require,module,exports){
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

},{"call-bind/callBound":185,"get-intrinsic":261}],234:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":261}],235:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],236:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":242}],237:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":245,"./modulo":236}],238:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":193,"./5/AbstractRelationalComparison":194,"./5/Canonicalize":195,"./5/CheckObjectCoercible":196,"./5/DateFromTime":197,"./5/Day":198,"./5/DayFromYear":199,"./5/DayWithinYear":200,"./5/DaysInYear":201,"./5/FromPropertyDescriptor":202,"./5/HourFromTime":203,"./5/InLeapYear":204,"./5/IsAccessorDescriptor":205,"./5/IsCallable":206,"./5/IsDataDescriptor":207,"./5/IsGenericDescriptor":208,"./5/IsPropertyDescriptor":209,"./5/MakeDate":210,"./5/MakeDay":211,"./5/MakeTime":212,"./5/MinFromTime":213,"./5/MonthFromTime":214,"./5/SameValue":215,"./5/SecFromTime":216,"./5/StrictEqualityComparison":217,"./5/TimeClip":218,"./5/TimeFromYear":219,"./5/TimeWithinDay":220,"./5/ToBoolean":221,"./5/ToInt32":222,"./5/ToInteger":223,"./5/ToNumber":224,"./5/ToObject":225,"./5/ToPrimitive":226,"./5/ToPropertyDescriptor":227,"./5/ToString":228,"./5/ToUint16":229,"./5/ToUint32":230,"./5/Type":231,"./5/WeekDay":232,"./5/YearFromTime":233,"./5/abs":234,"./5/floor":235,"./5/modulo":236,"./5/msFromTime":237}],239:[function(require,module,exports){
'use strict';

var $isNaN = require('./isNaN');

module.exports = function (x) { return (typeof x === 'number' || typeof x === 'bigint') && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{"./isNaN":240}],240:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],241:[function(require,module,exports){
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

},{"call-bind/callBound":185}],242:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],243:[function(require,module,exports){
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

},{"es-errors/type":252,"hasown":269}],244:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],245:[function(require,module,exports){
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

},{}],246:[function(require,module,exports){
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

},{"get-intrinsic":261}],247:[function(require,module,exports){
'use strict';

/** @type {import('./eval')} */
module.exports = EvalError;

},{}],248:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Error;

},{}],249:[function(require,module,exports){
'use strict';

/** @type {import('./range')} */
module.exports = RangeError;

},{}],250:[function(require,module,exports){
'use strict';

/** @type {import('./ref')} */
module.exports = ReferenceError;

},{}],251:[function(require,module,exports){
'use strict';

/** @type {import('./syntax')} */
module.exports = SyntaxError;

},{}],252:[function(require,module,exports){
'use strict';

/** @type {import('./type')} */
module.exports = TypeError;

},{}],253:[function(require,module,exports){
'use strict';

/** @type {import('./uri')} */
module.exports = URIError;

},{}],254:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

/** @type {import('./RequireObjectCoercible')} */
module.exports = function RequireObjectCoercible(value) {
	if (value == null) {
		throw new $TypeError((arguments.length > 0 && arguments[1]) || ('Cannot call method on ' + value));
	}
	return value;
};

},{"es-errors/type":252}],255:[function(require,module,exports){
'use strict';

var $Object = require('./');
var RequireObjectCoercible = require('./RequireObjectCoercible');

/** @type {import('./ToObject')} */
module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

},{"./":256,"./RequireObjectCoercible":254}],256:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Object;

},{}],257:[function(require,module,exports){
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

},{"./helpers/isPrimitive":258,"is-callable":272}],258:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],259:[function(require,module,exports){
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

},{}],260:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":259}],261:[function(require,module,exports){
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

},{"es-errors":248,"es-errors/eval":247,"es-errors/range":249,"es-errors/ref":250,"es-errors/syntax":251,"es-errors/type":252,"es-errors/uri":253,"function-bind":260,"has-proto":264,"has-symbols":265,"hasown":269}],262:[function(require,module,exports){
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

},{"get-intrinsic":261}],263:[function(require,module,exports){
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

},{"es-define-property":246}],264:[function(require,module,exports){
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

},{}],265:[function(require,module,exports){
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

},{"./shams":266}],266:[function(require,module,exports){
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

},{}],267:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":266}],268:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":260}],269:[function(require,module,exports){
'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);

},{"function-bind":260}],270:[function(require,module,exports){
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

},{}],271:[function(require,module,exports){
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

},{}],272:[function(require,module,exports){
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

},{}],273:[function(require,module,exports){
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

},{"call-bind/callBound":185,"has-tostringtag/shams":267}],274:[function(require,module,exports){
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

},{"./isArguments":276}],275:[function(require,module,exports){
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

},{"./implementation":274,"./isArguments":276}],276:[function(require,module,exports){
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

},{}],277:[function(require,module,exports){
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

},{}],278:[function(require,module,exports){
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
},{"_process":277,"through":293,"timers":294}],279:[function(require,module,exports){
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

},{"buffer":167}],280:[function(require,module,exports){
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

},{"call-bind/callBound":185,"es-errors/type":252,"is-regex":273}],281:[function(require,module,exports){
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

},{"define-data-property":190,"es-errors/type":252,"get-intrinsic":261,"gopd":262,"has-property-descriptors":263}],282:[function(require,module,exports){
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

},{"es-abstract/es5":238,"function-bind":260}],283:[function(require,module,exports){
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

},{"./implementation":282,"./polyfill":284,"./shim":285,"define-properties":191,"function-bind":260}],284:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":282}],285:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":284,"define-properties":191}],286:[function(require,module,exports){
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
},{"safe-buffer":279}],287:[function(require,module,exports){
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
},{"./lib/default_stream":288,"./lib/results":290,"./lib/test":291,"_process":277,"defined":192,"through":293,"timers":294}],288:[function(require,module,exports){
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
},{"_process":277,"fs":166,"through":293}],289:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":277,"timers":294}],290:[function(require,module,exports){
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
},{"_process":277,"events":168,"function-bind":260,"has":268,"inherits":271,"object-inspect":292,"resumer":278,"through":293,"timers":294}],291:[function(require,module,exports){
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
},{"./next_tick":289,"deep-equal":187,"defined":192,"events":168,"has":268,"inherits":271,"path":169,"string.prototype.trim":283}],292:[function(require,module,exports){
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

},{}],293:[function(require,module,exports){
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
},{"_process":277,"stream":170}],294:[function(require,module,exports){
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
},{"process/browser.js":277,"timers":294}],295:[function(require,module,exports){
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
},{}]},{},[92,93]);
