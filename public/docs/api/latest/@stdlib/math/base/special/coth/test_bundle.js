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

},{"./uint16array.js":24,"@stdlib/assert/is-uint16array":52,"@stdlib/constants/uint16/max":73}],24:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint32array.js":27,"@stdlib/assert/is-uint32array":54,"@stdlib/constants/uint32/max":74}],27:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint8array.js":30,"@stdlib/assert/is-uint8array":56,"@stdlib/constants/uint8/max":75}],30:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/native-class":169}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":34,"./object.js":35,"./primitive.js":36,"@stdlib/utils/define-nonenumerable-read-only-property":151}],34:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./try2serialize.js":38,"@stdlib/assert/has-tostringtag-support":20,"@stdlib/boolean/ctor":60,"@stdlib/utils/native-class":169}],36:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/get-prototype-of":159,"@stdlib/utils/native-class":169}],43:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":169}],45:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/type-of":180}],47:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":51,"@stdlib/assert/tools/array-function":58,"@stdlib/utils/define-nonenumerable-read-only-property":151}],51:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":169}],54:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":169}],56:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":169}],58:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-array":31,"@stdlib/string/format":144}],60:[function(require,module,exports){
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
* High word mask for the exponent of a double-precision floating-point number.
*
* @module @stdlib/constants/float64/high-word-exponent-mask
* @type {uinteger32}
*
* @example
* var FLOAT64_HIGH_WORD_EXPONENT_MASK = require( '@stdlib/constants/float64/high-word-exponent-mask' );
* // returns 2146435072
*/


// MAIN //

/**
* High word mask for the exponent of a double-precision floating-point number.
*
* ## Notes
*
* The high word mask for the exponent of a double-precision floating-point number is an unsigned 32-bit integer with the value \\( 2146435072 \\), which corresponds to the bit sequence
*
* ```binarystring
* 0 11111111111 00000000000000000000
* ```
*
* @constant
* @type {uinteger32}
* @default 0x7ff00000
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_HIGH_WORD_EXPONENT_MASK = 0x7ff00000;


// EXPORTS //

module.exports = FLOAT64_HIGH_WORD_EXPONENT_MASK;

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
* The maximum biased base 2 exponent for a subnormal double-precision floating-point number.
*
* @module @stdlib/constants/float64/max-base2-exponent-subnormal
* @type {integer32}
*
* @example
* var FLOAT64_MAX_BASE2_EXPONENT_SUBNORMAL = require( '@stdlib/constants/float64/max-base2-exponent-subnormal' );
* // returns -1023
*/


// MAIN //

/**
* The maximum biased base 2 exponent for a subnormal double-precision floating-point number.
*
* ```text
* 00000000000 => 0 - BIAS = -1023
* ```
*
* where `BIAS = 1023`.
*
* @constant
* @type {integer32}
* @default -1023
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MAX_BASE2_EXPONENT_SUBNORMAL = -1023|0; // asm type annotation


// EXPORTS //

module.exports = FLOAT64_MAX_BASE2_EXPONENT_SUBNORMAL;

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
* The maximum biased base 2 exponent for a double-precision floating-point number.
*
* @module @stdlib/constants/float64/max-base2-exponent
* @type {integer32}
*
* @example
* var FLOAT64_MAX_BASE2_EXPONENT = require( '@stdlib/constants/float64/max-base2-exponent' );
* // returns 1023
*/


// MAIN //

/**
* The maximum biased base 2 exponent for a double-precision floating-point number.
*
* ```text
* 11111111110 => 2046 - BIAS = 1023
* ```
*
* where `BIAS = 1023`.
*
* @constant
* @type {integer32}
* @default 1023
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MAX_BASE2_EXPONENT = 1023|0; // asm type annotation


// EXPORTS //

module.exports = FLOAT64_MAX_BASE2_EXPONENT;

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
* The minimum biased base 2 exponent for a subnormal double-precision floating-point number.
*
* @module @stdlib/constants/float64/min-base2-exponent-subnormal
* @type {integer32}
*
* @example
* var FLOAT64_MIN_BASE2_EXPONENT_SUBNORMAL = require( '@stdlib/constants/float64/min-base2-exponent-subnormal' );
* // returns -1074
*/


// MAIN //

/**
* The minimum biased base 2 exponent for a subnormal double-precision floating-point number.
*
* ```text
* -(BIAS+(52-1)) = -(1023+51) = -1074
* ```
*
* where `BIAS = 1023` and `52` is the number of digits in the significand.
*
* @constant
* @type {integer32}
* @default -1074
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MIN_BASE2_EXPONENT_SUBNORMAL = -1074|0; // asm type annotation


// EXPORTS //

module.exports = FLOAT64_MIN_BASE2_EXPONENT_SUBNORMAL;

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

},{"@stdlib/number/ctor":112}],71:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Smallest positive double-precision floating-point normal number.
*
* @module @stdlib/constants/float64/smallest-normal
* @type {number}
*
* @example
* var FLOAT64_SMALLEST_NORMAL = require( '@stdlib/constants/float64/smallest-normal' );
* // returns 2.2250738585072014e-308
*/


// MAIN //

/**
* The smallest positive double-precision floating-point normal number.
*
* ## Notes
*
* The number has the value
*
* ```tex
* \frac{1}{2^{1023-1}}
* ```
*
* which corresponds to the bit sequence
*
* ```binarystring
* 0 00000000001 00000000000000000000 00000000000000000000000000000000
* ```
*
* @constant
* @type {number}
* @default 2.2250738585072014e-308
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_SMALLEST_NORMAL = 2.2250738585072014e-308;


// EXPORTS //

module.exports = FLOAT64_SMALLEST_NORMAL;

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

},{}],76:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/ninf":70,"@stdlib/constants/float64/pinf":71}],78:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":79}],79:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":81}],81:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/ninf":70}],82:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":83}],83:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/pinf":71}],84:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":85}],85:[function(require,module,exports){
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

/**
* Round a double-precision floating-point number toward positive infinity.
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":87}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Rounds a double-precision floating-point number toward positive infinity.
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

},{"./main.js":89}],89:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/high-word-abs-mask":64,"@stdlib/constants/float64/high-word-sign-mask":66,"@stdlib/number/float64/base/from-words":116,"@stdlib/number/float64/base/get-high-word":120,"@stdlib/number/float64/base/to-words":126}],90:[function(require,module,exports){
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
* Compute the hyperbolic cotangent of a number.
*
* @module @stdlib/math/base/special/coth
*
* @example
* var coth = require( '@stdlib/math/base/special/coth' );
*
* var v = coth( 0.0 );
* // returns Infinity
*
* v = coth( 2.0 );
* // returns ~1.0373
*
* v = coth( -2.0 );
* // returns ~-1.0373
*
* v = coth( NaN );
* // returns NaN
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":91}],91:[function(require,module,exports){
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

var tanh = require( '@stdlib/math/base/special/tanh' );


// MAIN //

/**
* Computes the hyperbolic cotangent of a number.
*
* @param {number} x - input value
* @returns {number} hyperbolic cotangent
*
* @example
* var v = coth( 0.0 );
* // returns Infinity
*
* @example
* var v = coth( 2.0 );
* // returns ~1.0373
*
* @example
* var v = coth( -2.0 );
* // returns ~-1.0373
*
* @example
* var v = coth( NaN );
* // returns NaN
*/
function coth( x ) {
	return 1.0 / tanh( x );
}


// EXPORTS //

module.exports = coth;

},{"@stdlib/math/base/special/tanh":107}],92:[function(require,module,exports){
module.exports={"expected":[-1.0000908039820193,-1.0000917070889408,-1.0000926191782862,-1.0000935403394045,-1.0000944706625332,-1.000095410238808,-1.0000963591602707,-1.0000973175198795,-1.0000982854115168,-1.0000992629299994,-1.0001002501710876,-1.000101247231494,-1.0001022542088938,-1.0001032712019335,-1.000104298310242,-1.0001053356344385,-1.0001063832761437,-1.0001074413379891,-1.000108509923628,-1.0001095891377443,-1.0001106790860634,-1.0001117798753636,-1.0001128916134843,-1.0001140144093388,-1.000115148372924,-1.0001162936153307,-1.000117450248755,-1.0001186183865105,-1.000119798143037,-1.0001209896339134,-1.0001221929758684,-1.000123408286793,-1.0001246356857498,-1.0001258752929876,-1.0001271272299506,-1.000128391619292,-1.0001296685848853,-1.0001309582518363,-1.0001322607464957,-1.0001335761964723,-1.0001349047306431,-1.0001362464791692,-1.0001376015735055,-1.0001389701464158,-1.000140352331985,-1.0001417482656312,-1.0001431580841216,-1.000144581925583,-1.0001460199295176,-1.0001474722368153,-1.0001489389897682,-1.0001504203320841,-1.0001519164089012,-1.000153427366802,-1.0001549533538274,-1.0001564945194918,-1.000158051014797,-1.0001596229922483,-1.000161210605868,-1.0001628140112109,-1.0001644333653812,-1.0001660688270448,-1.0001677205564479,-1.000169388715431,-1.0001710734674452,-1.0001727749775682,-1.0001744934125205,-1.0001762289406824,-1.0001779817321093,-1.0001797519585491,-1.0001815397934595,-1.000183345412024,-1.0001851689911698,-1.000187010709585,-1.000188870747736,-1.0001907492878856,-1.0001926465141102,-1.0001945626123188,-1.00019649777027,-1.000198452177592,-1.0002004260258,-1.000202419508315,-1.000204432820484,-1.0002064661595975,-1.0002085197249104,-1.0002105937176604,-1.0002126883410885,-1.0002148038004586,-1.0002169403030776,-1.0002190980583163,-1.0002212772776289,-1.000223478174575,-1.0002257009648396,-1.000227945866255,-1.000230213098822,-1.0002325028847305,-1.000234815448383,-1.0002371510164154,-1.00023950981772,-1.0002418920834673,-1.0002442980471293,-1.0002467279445022,-1.0002491820137291,-1.0002516604953247,-1.000254163632197,-1.0002566916696736,-1.0002592448555225,-1.0002618234399803,-1.0002644276757735,-1.0002670578181456,-1.0002697141248804,-1.000272396856329,-1.0002751062754338,-1.0002778426477554,-1.0002806062414988,-1.0002833973275385,-1.0002862161794466,-1.0002890630735188,-1.0002919382888016,-1.0002948421071205,-1.0002977748131063,-1.0003007366942245,-1.0003037280408025,-1.0003067491460589,-1.000309800306132,-1.0003128818201084,-1.0003159939900534,-1.00031913712104,-1.000322311521179,-1.0003255175016497,-1.0003287553767295,-1.000332025463826,-1.0003353280835074,-1.0003386635595346,-1.0003420322188925,-1.0003454343918219,-1.0003488704118533,-1.000352340615838,-1.000355845343983,-1.0003593849398824,-1.0003629597505534,-1.0003665701264688,-1.0003702164215917,-1.000373898993411,-1.0003776182029767,-1.0003813744149337,-1.0003851679975602,-1.0003889993228015,-1.0003928687663082,-1.000396776707473,-1.0004007235294674,-1.0004047096192792,-1.0004087353677518,-1.0004128011696216,-1.0004169074235574,-1.0004210545321992,-1.000425242902198,-1.0004294729442562,-1.0004337450731677,-1.0004380597078582,-1.0004424172714272,-1.00044681819119,-1.0004512628987188,-1.0004557518298849,-1.0004602854249036,-1.000464864128375,-1.00046948838933,-1.000474158661273,-1.0004788754022276,-1.0004836390747802,-1.000488450146128,-1.0004933090881225,-1.0004982163773173,-1.0005031724950153,-1.000508177927315,-1.0005132331651598,-1.0005183387043848,-1.0005234950457667,-1.0005287026950733,-1.0005339621631126,-1.0005392739657835,-1.0005446386241268,-1.000550056664376,-1.0005555286180101,-1.0005610550218054,-1.0005666364178876,-1.0005722733537874,-1.0005779663824923,-1.0005837160625024,-1.000589522957885,-1.0005953876383304,-1.000601310679208,-1.0006072926616227,-1.0006133341724734,-1.000619435804509,-1.000625598156389,-1.0006318218327408,-1.0006381074442205,-1.0006444556075722,-1.00065086694569,-1.0006573420876785,-1.000663881668915,-1.0006704863311133,-1.000677156722385,-1.000683893497306,-1.0006906973169787,-1.0006975688490987,-1.0007045087680209,-1.000711517754825,-1.0007185964973835,-1.0007257456904295,-1.000732966035626,-1.000740258241633,-1.0007476230241803,-1.0007550611061369,-1.0007625732175818,-1.0007701600958774,-1.0007778224857415,-1.0007855611393213,-1.0007933768162676,-1.0008012702838098,-1.000809242316832,-1.0008172936979498,-1.000825425217587,-1.0008336376740543,-1.000841931873628,-1.0008503086306295,-1.0008587687675068,-1.0008673131149153,-1.0008759425117997,-1.0008846578054764,-1.00089345985172,-1.0009023495148448,-1.000911327667792,-1.000920395192216,-1.000929552978572,-1.0009388019262029,-1.0009481429434295,-1.00095757694764,-1.0009671048653814,-1.0009767276324502,-1.0009864461939861,-1.0009962615045656,-1.0010061745282952,-1.0010161862389095,-1.0010262976198652,-1.0010365096644398,-1.0010468233758296,-1.0010572397672506,-1.0010677598620363,-1.0010783846937417,-1.0010891153062442,-1.0010999527538482,-1.0011108981013892,-1.0011219524243389,-1.0011331168089133,-1.001144392352179,-1.0011557801621636,-1.0011672813579642,-1.0011788970698599,-1.0011906284394223,-1.001202476619631,-1.0012144427749863,-1.0012265280816262,-1.0012387337274424,-1.0012510609121985,-1.0012635108476493,-1.0012760847576618,-1.0012887838783358,-1.0013016094581277,-1.001314562757974,-1.0013276450514175,-1.0013408576247327,-1.0013542017770556,-1.001367678820511,-1.0013812900803447,-1.0013950368950542,-1.0014089206165224,-1.001422942610153,-1.001437104255005,-1.001451406943931,-1.0014658520837159,-1.0014804410952165,-1.0014951754135037,-1.0015100564880055,-1.001525085782651,-1.0015402647760165,-1.0015555949614734,-1.0015710778473366,-1.0015867149570152,-1.0016025078291648,-1.00161845801784,-1.001634567092651,-1.0016508366389187,-1.0016672682578343,-1.0016838635666188,-1.0017006241986837,-1.001717551803796,-1.0017346480482408,-1.0017519146149898,-1.001769353203868,-1.0017869655317255,-1.0018047533326067,-1.001822718357926,-1.0018408623766417,-1.0018591871754337,-1.0018776945588819,-1.001896386349647,-1.0019152643886533,-1.001934330535272,-1.0019535866675089,-1.001973034682192,-1.001992676495161,-1.0020125140414602,-1.0020325492755322,-1.0020527841714133,-1.0020732207229328,-1.0020938609439118,-1.0021147068683665,-1.0021357605507106,-1.002157024065964,-1.002178499509959,-1.0022001889995518,-1.0022220946728353,-1.0022442186893539,-1.0022665632303205,-1.002289130498836,-1.00231192272011,-1.0023349421416865,-1.0023581910336683,-1.0023816716889464,-1.002405386423431,-1.002429337576284,-1.0024535275101556,-1.0024779586114216,-1.0025026332904245,-1.002527553981716,-1.0025527231443034,-1.0025781432618968,-1.0026038168431601,-1.0026297464219642,-1.0026559345576431,-1.0026823838352523,-1.0027090968658297,-1.00273607628666,-1.0027633247615406,-1.002790844981052,-1.0028186396628296,-1.0028467115518374,-1.0028750634206482,-1.0029036980697235,-1.002932618327695,-1.0029618270516554,-1.0029913271274438,-1.0030211214699418,-1.0030512130233662,-1.0030816047615703,-1.0031122996883437,-1.0031433008377186,-1.0031746112742774,-1.0032062340934644,-1.0032381724219,-1.003270429417699,-1.003303008270792,-1.0033359122032497,-1.0033691444696107,-1.0034027083572128,-1.0034366071865293,-1.0034708443115052,-1.0035054231199017,-1.0035403470336386,-1.0035756195091468,-1.0036112440377185,-1.003647224145865,-1.0036835633956764,-1.0037202653851867,-1.0037573337487395,-1.0037947721573626,-1.0038325843191411,-1.0038707739795985,-1.0039093449220797,-1.003948300968139,-1.003987645977931,-1.0040273838506084,-1.0040675185247192,-1.0041080539786134,-1.0041489942308504,-1.0041903433406119,-1.0042321054081198,-1.0042742845750572,-1.004316885024994,-1.0043599109838193,-1.0044033667201744,-1.0044472565458944,-1.004491584816452,-1.0045363559314062,-1.004581574334857,-1.0046272445159037,-1.0046733710091091,-1.0047199583949682,-1.0047670113003806,-1.0048145343991306,-1.0048625324123703,-1.0049110101091085,-1.0049599723067058,-1.0050094238713718,-1.0050593697186727,-1.0051098148140396,-1.0051607641732847,-1.0052122228631226,-1.005264196001697,-1.0053166887591132,-1.005369706357976,-1.0054232540739338,-1.005477337236229,-1.0055319612282518,-1.0055871314881049,-1.0056428535091682,-1.005699132840675,-1.0057559750882905,-1.0058133859146992,-1.0058713710401967,-1.00592993624329,-1.0059890873613018,-1.006048830290983,-1.006109170989132,-1.0061701154732205,-1.0062316698220244,-1.0062938401762636,-1.0063566327392492,-1.0064200537775352,-1.0064841096215795,-1.0065488066664112,-1.006614151372306,-1.0066801502654668,-1.0067468099387153,-1.0068141370521877,-1.0068821383340405,-1.0069508205811617,-1.0070201906598926,-1.0070902555067553,-1.0071610221291893,-1.0072324976062952,-1.0073046890895883,-1.0073776038037585,-1.0074512490474399,-1.0075256321939892,-1.007600760692271,-1.0076766420674534,-1.007753283921812,-1.0078306939355421,-1.0079088798675813,-1.0079878495564394,-1.0080676109210398,-1.0081481719615677,-1.0082295407603301,-1.008311725482624,-1.008394734377614,-1.0084785757792218,-1.008563258107023,-1.0086487898671548,-1.0087351796532362,-1.0088224361472942,-1.0089105681207042,-1.0089995844351394,-1.00908949404353,-1.0091803059910356,-1.0092720294160262,-1.009364673551076,-1.0094582477239662,-1.0095527613587034,-1.0096482239765439,-1.0097446451970342,-1.009842034739061,-1.009940402421914,-1.0100397581663607,-1.0101401119957332,-1.0102414740370267,-1.0103438545220131,-1.010447263788364,-1.010551712280789,-1.0106572105521858,-1.0107637692648044,-1.0108713991914235,-1.010980111216542,-1.0110899163375824,-1.01120082566611,-1.011312850429064,-1.011426001970006,-1.0115402917503786,-1.0116557313507826,-1.0117723324722678,-1.011890106937637,-1.0120090666927672,-1.0121292238079465,-1.0122505904792243,-1.01237317902978,-1.0124970019113055,-1.0126220717054055,-1.0127484011250127,-1.012876003015822,-1.013004890357738,-1.0131350762663436,-1.0132665739943827,-1.0133993969332624,-1.0135335586145717,-1.0136690727116193,-1.0138059530409889,-1.0139442135641128,-1.0140838683888656,-1.0142249317711745,-1.014367418116652,-1.014511341982245,-1.0146567180779058,-1.0148035612682822,-1.0149518865744274,-1.0151017091755328,-1.0152530444106778,-1.0154059077806048,-1.0155603149495136,-1.0157162817468763,-1.0158738241692775,-1.0160329583822734,-1.016193700722276,-1.01635606769846,-1.0165200759946902,-1.0166857424714764,-1.0168530841679504,-1.0170221183038661,-1.0171928622816264,-1.0173653336883337,-1.0175395502978657,-1.0177155300729777,-1.0178932911674292,-1.0180728519281395,-1.0182542308973672,-1.018437446814919,-1.0186225186203843,-1.018809465455399,-1.0189983066659374,-1.019189061804632,-1.019381750633123,-1.0195763931244373,-1.0197730094653974,-1.0199716200590607,-1.02017224552719,-1.0203749067127532,-1.0205796246824592,-1.0207864207293207,-1.020995316375253,-1.0212063333737058,-1.0214194937123267,-1.0216348196156608,-1.0218523335478842,-1.022072058215572,-1.0222940165705032,-1.0225182318125008,-1.0227447273923087,-1.0229735270145073,-1.0232046546404638,-1.023438134491325,-1.0236739910510457,-1.0239122490694579,-1.024152933565381,-1.0243960698297712,-1.024641683428913,-1.0248898002076539,-1.0251404462926792,-1.0253936480958326,-1.0256494323174792,-1.0259078259499144,-1.0261688562808162,-1.0264325508967465,-1.026698937686696,-1.026968044845679,-1.0272399008783755,-1.0275145346028214,-1.0277919751541504,-1.0280722519883854,-1.0283553948862805,-1.0286414339572163,-1.0289303996431478,-1.0292223227226058,-1.0295172343147543,-1.0298151658835004,-1.0301161492416644,-1.0304202165552045,-1.030727400347501,-1.0310377335036998,-1.0313512492751145,-1.0316679812836917,-1.0319879635265374,-1.0323112303805064,-1.032637816606856,-1.0329677573559648,-1.0333010881721196,-1.0336378449983652,-1.033978064181428,-1.0343217824767055,-1.034669037053329,-1.0350198654992953,-1.0353743058266751,-1.0357323964768936,-1.0360941763260865,-1.0364596846905345,-1.0368289613321746,-1.0372020464641918,-1.0375789807566909,-1.0379598053424515,-1.0383445618227656,-1.038733292273361,-1.0391260392504118,-1.0395228457966352,-1.0399237554474796,-1.0403288122374024,-1.0407380607062424,-1.0411515459056837,-1.041569313405819,-1.0419914093018068,-1.0424178802206314,-1.0428487733279619,-1.043284136335114,-1.043724017506118,-1.0441684656648922,-1.0446175302025245,-1.0450712610846657,-1.0455297088590343,-1.0459929246630348,-1.0464609602314947,-1.0469338679045177,-1.0474117006354593,-1.0478945119990248,-1.0483823561994912,-1.0488752880790588,-1.0493733631263304,-1.0498766374849244,-1.050385167962221,-1.0508990120382453,-1.0514182278746929,-1.0519428743240933,-1.0524730109391218,-1.0530086979820563,-1.053549996434387,-1.0540969680065768,-1.054649675147979,-1.055208181056914,-1.0557725496909076,-1.0563428457770947,-1.0569191348227902,-1.0575014831262333,-1.0580899577875051,-1.0586846267196244,-1.0592855586598258,-1.0598928231810216,-1.0605064907034536,-1.0611266325065372,-1.0617533207409005,-1.062386628440624,-1.0630266295356854,-1.0636733988646094,-1.0643270121873323,-1.064987546198282,-1.0656550785396774,-1.0663296878150548,-1.0670114536030215,-1.0677004564712451,-1.0683967779906813,-1.069100500750045,-1.0698117083705292,-1.0705304855207798,-1.0712569179321263,-1.0719910924140785,-1.0727330968700934,-1.0734830203136134,-1.0742409528843901,-1.0750069858650917,-1.0757812116982033,-1.0765637240032262,-1.0773546175941824,-1.0781539884974294,-1.0789619339697942,-1.0797785525170307,-1.0806039439126087,-1.081438209216842,-1.0822814507963612,-1.0831337723439414,-1.0839952788986882,-1.084866076866594,-1.0857462740414696,-1.0866359796262615,-1.0875353042547606,-1.0884443600137146,-1.0893632604653476,-1.0902921206703027,-1.0912310572110093,-1.0921801882154927,-1.0931396333816266,-1.0941095140018482,-1.0950899529883373,-1.0960810748986758,-1.0970830059619963,-1.0980958741056304,-1.0991198089822682,-1.100154941997642,-1.101201406338744,-1.1022593370025926,-1.1033288708255558,-1.104410146513251,-1.105503304671028,-1.106608487835053,-1.1077258405040042,-1.108855509171397,-1.1099976423585516,-1.1111523906482168,-1.1123199067188676,-1.113500345379692,-1.1146938636062824,-1.1159006205770499,-1.1171207777103773,-1.1183544987025291,-1.119601949566338,-1.1208632986706835,-1.1221387167807846,-1.1234283770993276,-1.1247324553084428,-1.1260511296125597,-1.1273845807821559,-1.1287329921984246,-1.1300965498988813,-1.1314754426239366,-1.1328698618644553,-1.1342800019103296,-1.1357060599000885,-1.1371482358715737,-1.1386067328137053,-1.1400817567193668,-1.1415735166394392,-1.1430822247380081,-1.1446080963487828,-1.1461513500327491,-1.1477122076370954,-1.1492908943554403,-1.1508876387893996,-1.152502673011521,-1.154136232629633,-1.1557885568526327,-1.157459888557764,-1.1591504743594123,-1.160860564679467,-1.1625904138192877,-1.1643402800333196,-1.1661104256044024,-1.1679011169208158,-1.1697126245551144,-1.1715452233447954,-1.1733991924748515,-1.175274815562262,-1.1771723807424743,-1.1790921807579298,-1.1810345130486934,-1.1829996798452453,-1.1849879882634937,-1.1869997504020726,-1.1890352834419884,-1.1910949097486847,-1.193178956976589,-1.1952877581762187,-1.197421651903914,-1.1995809823342782,-1.2017660993754018,-1.203977358786952,-1.2062151223012083,-1.2084797577471384,-1.2107716391775958,-1.213091146999734,-1.2154386681087384,-1.217814596024964,-1.2202193310345932,-1.2226532803339116,-1.2251168581773113,-1.2276104860291412,-1.2301345927195169,-1.2326896146042077,-1.2352759957287394,-1.237894187996825,-1.2405446513432763,-1.2432278539115196,-1.2459442722358736,-1.248694391428729,-1.2514787053727912,-1.2542977169185425,-1.257151938087096,-1.2600418902786057,-1.2629681044864214,-1.2659311215171642,-1.2689314922169255,-1.2719697777037786,-1.2750465496068193,-1.2781623903119435,-1.2813178932145912,-1.284513662979683,-1.2877503158089911,-1.2910284797162008,-1.2943487948099075,-1.2977119135848363,-1.3011185012215496,-1.304569235894942,-1.3080648090918194,-1.3116059259378827,-1.3151933055344351,-1.3188276813051607,-1.3225098013533192,-1.3262404288297345,-1.330020342311949,-1.33385033619495,-1.3377312210938779,-1.3416638242591483,-1.3456489900044393,-1.349687580148012,-1.3537804744678434,-1.3579285711710973,-1.3621327873784386,-1.366394059623768,-1.3707133443699326,-1.3750916185410225,-1.379529880071877,-1.3840291484754534,-1.3885904654287409,-1.393214895377929,-1.397903526163574,-1.4026574696665415,-1.4074778624755317,-1.4123658665770367,-1.417322670068613,-1.422349487896397,-1.4274475626178231,-1.432618165190567,-1.437862595788763,-1.4431821846476045,-1.4485782929374904,-1.4540523136689263,-1.4596056726294497,-1.4652398293539166,-1.4709562781295364,-1.4767565490371193,-1.48264220903007,-1.48861486305273,-1.4946761551997563,-1.5008277699183041,-1.5070714332548674,-1.5134089141487281,-1.519842025774055,-1.5263726269328082,-1.5330026235006977,-1.5397339699285832,-1.5465686708017918,-1.5535087824600007,-1.560556414680424,-1.5677137324272319,-1.5749829576702417,-1.5823663712761202,-1.5898663149754828,-1.5974851934094683,-1.6052254762595686,-1.6130897004646776,-1.621080472529573,-1.6292004709292465,-1.637452448613764,-1.6458392356185942,-1.6543637417856252,-1.663028959600378,-1.671837967151255,-1.6807939312169857,-1.6899001104888005,-1.6991598589342423,-1.7085766293099267,-1.7181539768310117,-1.7278955630055906,-1.737805159642716,-1.7478866530433115,-1.7581440483837638,-1.7685814743026267,-1.7792031877014913,-1.7900135787717855,-1.801017176260005,-1.812218652984673,-1.8236228316191838,-1.8352346907556025,-1.8470593712654706,-1.8591021829747356,-1.8713686116710504,-1.8838643264629094,-1.8965951875114073,-1.9095672541568278,-1.9227867934637635,-1.9362602892101657,-1.9499944513474312,-1.9639962259606032,-1.9782728057597896,-1.9928316411361529,-2.007680451818242,-2.0228272391670337,-2.0382802991509044,-2.054048236044793,-2.070139976901172,-2.0865647868440154,-2.10333228524091,-2.120452462812703,-2.1379356997446934,-2.1557927848684617,-2.1740349359889035,-2.1926738214370216,-2.2117215829356094,-2.2311908598720622,-2.251094815080412,-2.271447162243184,-2.292262195033081,-2.313554818124744,-2.335340580218115,-2.3576357092272784,-2.3804571498022997,-2.403822603366511,-2.427750570868223,-2.4522603984640017,-2.4773723263707637,-2.503107541146105,-2.529488231680886,-2.556537649215252,-2.5842801717194974,-2.612741373014647,-2.641948097044921,-2.6719285377557047,-2.7027123250768628,-2.7343306175628794,-2.7668162022989096,-2.8002036027464374,-2.8345291952745186,-2.8698313352038225,-2.9061504932819373,-2.943529403611207,-2.9820132241661903,-3.02164971116881,-3.062489408737262,-3.1045858553926675,-3.1479958091979405,-3.192779493520119,-3.2390008656543507,-3.2867279108297374,-3.336032964439774,-3.386993065709975,-3.439690346440021,-3.4942124589468597,-3.5506530478994502,-3.609112271388522,-3.6696973773312105,-3.732523342189791,-3.797713580008127,-3.8654007309662903,-3.9357275400557885,-4.00884783812478,-4.084927639483198,-4.164146372550993,-4.246698262751592,-4.33279389008672,-4.422661947688698,-4.516551232269835,-4.614732902947094,-4.7175030516288885,-4.825185636280085,-4.938135838273627,-5.056743917127669,-5.181439650772505,-5.3126974678072605,-5.451042400917746,-5.597057018938472,-5.751389530530877,-5.914763297197025,-6.087988050116786,-6.271973177785825,-6.46774354463242,-6.676458421493439,-6.899434266356781,-7.1381723010497184,-7.394392104659415,-7.670072813011069,-7.967504012141087,-8.289349095478142,-8.638724797325974,-9.019301935275115,-9.435434266776236,-9.892325059832729,-10.396244916214318,-10.954820240037467,-11.577420609859335,-12.275687013351614,-13.0642645599129,-13.961838384707209,-14.992629954497684,-16.188611600280844,-17.592876458252153,-19.264934091323745,-21.289350713706458,-23.790488397550302,-26.959035644897877,-31.103027718364757,-36.75452551438109,-44.9185329340896,-57.748629747213045,-80.84412332920515,-134.7358073470086,-404.20082467391717,404.20082467391717,134.7358073470086,80.84412332920515,57.748629747213045,44.9185329340896,36.75452551438109,31.103027718364757,26.959035644897877,23.790488397550302,21.289350713706458,19.264934091323745,17.592876458252153,16.188611600280844,14.992629954497684,13.961838384707209,13.0642645599129,12.275687013351614,11.577420609859335,10.954820240037467,10.396244916214318,9.892325059832729,9.435434266776236,9.019301935275115,8.638724797325974,8.289349095478142,7.967504012141087,7.670072813011069,7.394392104659415,7.1381723010497184,6.899434266356781,6.676458421493439,6.46774354463242,6.271973177785825,6.087988050116786,5.914763297197025,5.751389530530877,5.597057018938472,5.451042400917746,5.3126974678072605,5.181439650772505,5.056743917127669,4.938135838273627,4.825185636280085,4.7175030516288885,4.614732902947094,4.516551232269835,4.422661947688698,4.33279389008672,4.246698262751592,4.164146372550993,4.084927639483198,4.00884783812478,3.9357275400557885,3.8654007309662903,3.797713580008127,3.732523342189791,3.6696973773312105,3.609112271388522,3.5506530478994502,3.4942124589468597,3.439690346440021,3.386993065709975,3.336032964439774,3.2867279108297374,3.2390008656543507,3.192779493520119,3.1479958091979405,3.1045858553926675,3.062489408737262,3.02164971116881,2.9820132241661903,2.943529403611207,2.9061504932819373,2.8698313352038225,2.8345291952745186,2.8002036027464374,2.7668162022989096,2.7343306175628794,2.7027123250768628,2.6719285377557047,2.641948097044921,2.612741373014647,2.5842801717194974,2.556537649215252,2.529488231680886,2.503107541146105,2.4773723263707637,2.4522603984640017,2.427750570868223,2.403822603366511,2.3804571498022997,2.3576357092272784,2.335340580218115,2.313554818124744,2.292262195033081,2.271447162243184,2.251094815080412,2.2311908598720622,2.2117215829356094,2.1926738214370216,2.1740349359889035,2.1557927848684617,2.1379356997446934,2.120452462812703,2.10333228524091,2.0865647868440154,2.070139976901172,2.054048236044793,2.0382802991509044,2.0228272391670337,2.007680451818242,1.9928316411361529,1.9782728057597896,1.9639962259606032,1.9499944513474312,1.9362602892101657,1.9227867934637635,1.9095672541568278,1.8965951875114073,1.8838643264629094,1.8713686116710504,1.8591021829747356,1.8470593712654706,1.8352346907556025,1.8236228316191838,1.812218652984673,1.801017176260005,1.7900135787717855,1.7792031877014913,1.7685814743026267,1.7581440483837638,1.7478866530433115,1.737805159642716,1.7278955630055906,1.7181539768310117,1.7085766293099267,1.6991598589342423,1.6899001104888005,1.6807939312169857,1.671837967151255,1.663028959600378,1.6543637417856252,1.6458392356185942,1.637452448613764,1.6292004709292465,1.621080472529573,1.6130897004646776,1.6052254762595686,1.5974851934094683,1.5898663149754828,1.5823663712761202,1.5749829576702417,1.5677137324272319,1.560556414680424,1.5535087824600007,1.5465686708017918,1.5397339699285832,1.5330026235006977,1.5263726269328082,1.519842025774055,1.5134089141487281,1.5070714332548674,1.5008277699183041,1.4946761551997563,1.48861486305273,1.48264220903007,1.4767565490371193,1.4709562781295364,1.4652398293539166,1.4596056726294497,1.4540523136689263,1.4485782929374904,1.4431821846476045,1.437862595788763,1.432618165190567,1.4274475626178231,1.422349487896397,1.417322670068613,1.4123658665770367,1.4074778624755317,1.4026574696665415,1.397903526163574,1.393214895377929,1.3885904654287409,1.3840291484754534,1.379529880071877,1.3750916185410225,1.3707133443699326,1.366394059623768,1.3621327873784386,1.3579285711710973,1.3537804744678434,1.349687580148012,1.3456489900044393,1.3416638242591483,1.3377312210938779,1.33385033619495,1.330020342311949,1.3262404288297345,1.3225098013533192,1.3188276813051607,1.3151933055344351,1.3116059259378827,1.3080648090918194,1.304569235894942,1.3011185012215496,1.2977119135848363,1.2943487948099075,1.2910284797162008,1.2877503158089911,1.284513662979683,1.2813178932145912,1.2781623903119435,1.2750465496068193,1.2719697777037786,1.2689314922169255,1.2659311215171642,1.2629681044864214,1.2600418902786057,1.257151938087096,1.2542977169185425,1.2514787053727912,1.248694391428729,1.2459442722358736,1.2432278539115196,1.2405446513432763,1.237894187996825,1.2352759957287394,1.2326896146042077,1.2301345927195169,1.2276104860291412,1.2251168581773113,1.2226532803339116,1.2202193310345932,1.217814596024964,1.2154386681087384,1.213091146999734,1.2107716391775958,1.2084797577471384,1.2062151223012083,1.203977358786952,1.2017660993754018,1.1995809823342782,1.197421651903914,1.1952877581762187,1.193178956976589,1.1910949097486847,1.1890352834419884,1.1869997504020726,1.1849879882634937,1.1829996798452453,1.1810345130486934,1.1790921807579298,1.1771723807424743,1.175274815562262,1.1733991924748515,1.1715452233447954,1.1697126245551144,1.1679011169208158,1.1661104256044024,1.1643402800333196,1.1625904138192877,1.160860564679467,1.1591504743594123,1.157459888557764,1.1557885568526327,1.154136232629633,1.152502673011521,1.1508876387893996,1.1492908943554403,1.1477122076370954,1.1461513500327491,1.1446080963487828,1.1430822247380081,1.1415735166394392,1.1400817567193668,1.1386067328137053,1.1371482358715737,1.1357060599000885,1.1342800019103296,1.1328698618644553,1.1314754426239366,1.1300965498988813,1.1287329921984246,1.1273845807821559,1.1260511296125597,1.1247324553084428,1.1234283770993276,1.1221387167807846,1.1208632986706835,1.119601949566338,1.1183544987025291,1.1171207777103773,1.1159006205770499,1.1146938636062824,1.113500345379692,1.1123199067188676,1.1111523906482168,1.1099976423585516,1.108855509171397,1.1077258405040042,1.106608487835053,1.105503304671028,1.104410146513251,1.1033288708255558,1.1022593370025926,1.101201406338744,1.100154941997642,1.0991198089822682,1.0980958741056304,1.0970830059619963,1.0960810748986758,1.0950899529883373,1.0941095140018482,1.0931396333816266,1.0921801882154927,1.0912310572110093,1.0902921206703027,1.0893632604653476,1.0884443600137146,1.0875353042547606,1.0866359796262615,1.0857462740414696,1.084866076866594,1.0839952788986882,1.0831337723439414,1.0822814507963612,1.081438209216842,1.0806039439126087,1.0797785525170307,1.0789619339697942,1.0781539884974294,1.0773546175941824,1.0765637240032262,1.0757812116982033,1.0750069858650917,1.0742409528843901,1.0734830203136134,1.0727330968700934,1.0719910924140785,1.0712569179321263,1.0705304855207798,1.0698117083705292,1.069100500750045,1.0683967779906813,1.0677004564712451,1.0670114536030215,1.0663296878150548,1.0656550785396774,1.064987546198282,1.0643270121873323,1.0636733988646094,1.0630266295356854,1.062386628440624,1.0617533207409005,1.0611266325065372,1.0605064907034536,1.0598928231810216,1.0592855586598258,1.0586846267196244,1.0580899577875051,1.0575014831262333,1.0569191348227902,1.0563428457770947,1.0557725496909076,1.055208181056914,1.054649675147979,1.0540969680065768,1.053549996434387,1.0530086979820563,1.0524730109391218,1.0519428743240933,1.0514182278746929,1.0508990120382453,1.050385167962221,1.0498766374849244,1.0493733631263304,1.0488752880790588,1.0483823561994912,1.0478945119990248,1.0474117006354593,1.0469338679045177,1.0464609602314947,1.0459929246630348,1.0455297088590343,1.0450712610846657,1.0446175302025245,1.0441684656648922,1.043724017506118,1.043284136335114,1.0428487733279619,1.0424178802206314,1.0419914093018068,1.041569313405819,1.0411515459056837,1.0407380607062424,1.0403288122374024,1.0399237554474796,1.0395228457966352,1.0391260392504118,1.038733292273361,1.0383445618227656,1.0379598053424515,1.0375789807566909,1.0372020464641918,1.0368289613321746,1.0364596846905345,1.0360941763260865,1.0357323964768936,1.0353743058266751,1.0350198654992953,1.034669037053329,1.0343217824767055,1.033978064181428,1.0336378449983652,1.0333010881721196,1.0329677573559648,1.032637816606856,1.0323112303805064,1.0319879635265374,1.0316679812836917,1.0313512492751145,1.0310377335036998,1.030727400347501,1.0304202165552045,1.0301161492416644,1.0298151658835004,1.0295172343147543,1.0292223227226058,1.0289303996431478,1.0286414339572163,1.0283553948862805,1.0280722519883854,1.0277919751541504,1.0275145346028214,1.0272399008783755,1.026968044845679,1.026698937686696,1.0264325508967465,1.0261688562808162,1.0259078259499144,1.0256494323174792,1.0253936480958326,1.0251404462926792,1.0248898002076539,1.024641683428913,1.0243960698297712,1.024152933565381,1.0239122490694579,1.0236739910510457,1.023438134491325,1.0232046546404638,1.0229735270145073,1.0227447273923087,1.0225182318125008,1.0222940165705032,1.022072058215572,1.0218523335478842,1.0216348196156608,1.0214194937123267,1.0212063333737058,1.020995316375253,1.0207864207293207,1.0205796246824592,1.0203749067127532,1.02017224552719,1.0199716200590607,1.0197730094653974,1.0195763931244373,1.019381750633123,1.019189061804632,1.0189983066659374,1.018809465455399,1.0186225186203843,1.018437446814919,1.0182542308973672,1.0180728519281395,1.0178932911674292,1.0177155300729777,1.0175395502978657,1.0173653336883337,1.0171928622816264,1.0170221183038661,1.0168530841679504,1.0166857424714764,1.0165200759946902,1.01635606769846,1.016193700722276,1.0160329583822734,1.0158738241692775,1.0157162817468763,1.0155603149495136,1.0154059077806048,1.0152530444106778,1.0151017091755328,1.0149518865744274,1.0148035612682822,1.0146567180779058,1.014511341982245,1.014367418116652,1.0142249317711745,1.0140838683888656,1.0139442135641128,1.0138059530409889,1.0136690727116193,1.0135335586145717,1.0133993969332624,1.0132665739943827,1.0131350762663436,1.013004890357738,1.012876003015822,1.0127484011250127,1.0126220717054055,1.0124970019113055,1.01237317902978,1.0122505904792243,1.0121292238079465,1.0120090666927672,1.011890106937637,1.0117723324722678,1.0116557313507826,1.0115402917503786,1.011426001970006,1.011312850429064,1.01120082566611,1.0110899163375824,1.010980111216542,1.0108713991914235,1.0107637692648044,1.0106572105521858,1.010551712280789,1.010447263788364,1.0103438545220131,1.0102414740370267,1.0101401119957332,1.0100397581663607,1.009940402421914,1.009842034739061,1.0097446451970342,1.0096482239765439,1.0095527613587034,1.0094582477239662,1.009364673551076,1.0092720294160262,1.0091803059910356,1.00908949404353,1.0089995844351394,1.0089105681207042,1.0088224361472942,1.0087351796532362,1.0086487898671548,1.008563258107023,1.0084785757792218,1.008394734377614,1.008311725482624,1.0082295407603301,1.0081481719615677,1.0080676109210398,1.0079878495564394,1.0079088798675813,1.0078306939355421,1.007753283921812,1.0076766420674534,1.007600760692271,1.0075256321939892,1.0074512490474399,1.0073776038037585,1.0073046890895883,1.0072324976062952,1.0071610221291893,1.0070902555067553,1.0070201906598926,1.0069508205811617,1.0068821383340405,1.0068141370521877,1.0067468099387153,1.0066801502654668,1.006614151372306,1.0065488066664112,1.0064841096215795,1.0064200537775352,1.0063566327392492,1.0062938401762636,1.0062316698220244,1.0061701154732205,1.006109170989132,1.006048830290983,1.0059890873613018,1.00592993624329,1.0058713710401967,1.0058133859146992,1.0057559750882905,1.005699132840675,1.0056428535091682,1.0055871314881049,1.0055319612282518,1.005477337236229,1.0054232540739338,1.005369706357976,1.0053166887591132,1.005264196001697,1.0052122228631226,1.0051607641732847,1.0051098148140396,1.0050593697186727,1.0050094238713718,1.0049599723067058,1.0049110101091085,1.0048625324123703,1.0048145343991306,1.0047670113003806,1.0047199583949682,1.0046733710091091,1.0046272445159037,1.004581574334857,1.0045363559314062,1.004491584816452,1.0044472565458944,1.0044033667201744,1.0043599109838193,1.004316885024994,1.0042742845750572,1.0042321054081198,1.0041903433406119,1.0041489942308504,1.0041080539786134,1.0040675185247192,1.0040273838506084,1.003987645977931,1.003948300968139,1.0039093449220797,1.0038707739795985,1.0038325843191411,1.0037947721573626,1.0037573337487395,1.0037202653851867,1.0036835633956764,1.003647224145865,1.0036112440377185,1.0035756195091468,1.0035403470336386,1.0035054231199017,1.0034708443115052,1.0034366071865293,1.0034027083572128,1.0033691444696107,1.0033359122032497,1.003303008270792,1.003270429417699,1.0032381724219,1.0032062340934644,1.0031746112742774,1.0031433008377186,1.0031122996883437,1.0030816047615703,1.0030512130233662,1.0030211214699418,1.0029913271274438,1.0029618270516554,1.002932618327695,1.0029036980697235,1.0028750634206482,1.0028467115518374,1.0028186396628296,1.002790844981052,1.0027633247615406,1.00273607628666,1.0027090968658297,1.0026823838352523,1.0026559345576431,1.0026297464219642,1.0026038168431601,1.0025781432618968,1.0025527231443034,1.002527553981716,1.0025026332904245,1.0024779586114216,1.0024535275101556,1.002429337576284,1.002405386423431,1.0023816716889464,1.0023581910336683,1.0023349421416865,1.00231192272011,1.002289130498836,1.0022665632303205,1.0022442186893539,1.0022220946728353,1.0022001889995518,1.002178499509959,1.002157024065964,1.0021357605507106,1.0021147068683665,1.0020938609439118,1.0020732207229328,1.0020527841714133,1.0020325492755322,1.0020125140414602,1.001992676495161,1.001973034682192,1.0019535866675089,1.001934330535272,1.0019152643886533,1.001896386349647,1.0018776945588819,1.0018591871754337,1.0018408623766417,1.001822718357926,1.0018047533326067,1.0017869655317255,1.001769353203868,1.0017519146149898,1.0017346480482408,1.001717551803796,1.0017006241986837,1.0016838635666188,1.0016672682578343,1.0016508366389187,1.001634567092651,1.00161845801784,1.0016025078291648,1.0015867149570152,1.0015710778473366,1.0015555949614734,1.0015402647760165,1.001525085782651,1.0015100564880055,1.0014951754135037,1.0014804410952165,1.0014658520837159,1.001451406943931,1.001437104255005,1.001422942610153,1.0014089206165224,1.0013950368950542,1.0013812900803447,1.001367678820511,1.0013542017770556,1.0013408576247327,1.0013276450514175,1.001314562757974,1.0013016094581277,1.0012887838783358,1.0012760847576618,1.0012635108476493,1.0012510609121985,1.0012387337274424,1.0012265280816262,1.0012144427749863,1.001202476619631,1.0011906284394223,1.0011788970698599,1.0011672813579642,1.0011557801621636,1.001144392352179,1.0011331168089133,1.0011219524243389,1.0011108981013892,1.0010999527538482,1.0010891153062442,1.0010783846937417,1.0010677598620363,1.0010572397672506,1.0010468233758296,1.0010365096644398,1.0010262976198652,1.0010161862389095,1.0010061745282952,1.0009962615045656,1.0009864461939861,1.0009767276324502,1.0009671048653814,1.00095757694764,1.0009481429434295,1.0009388019262029,1.000929552978572,1.000920395192216,1.000911327667792,1.0009023495148448,1.00089345985172,1.0008846578054764,1.0008759425117997,1.0008673131149153,1.0008587687675068,1.0008503086306295,1.000841931873628,1.0008336376740543,1.000825425217587,1.0008172936979498,1.000809242316832,1.0008012702838098,1.0007933768162676,1.0007855611393213,1.0007778224857415,1.0007701600958774,1.0007625732175818,1.0007550611061369,1.0007476230241803,1.000740258241633,1.000732966035626,1.0007257456904295,1.0007185964973835,1.000711517754825,1.0007045087680209,1.0006975688490987,1.0006906973169787,1.000683893497306,1.000677156722385,1.0006704863311133,1.000663881668915,1.0006573420876785,1.00065086694569,1.0006444556075722,1.0006381074442205,1.0006318218327408,1.000625598156389,1.000619435804509,1.0006133341724734,1.0006072926616227,1.000601310679208,1.0005953876383304,1.000589522957885,1.0005837160625024,1.0005779663824923,1.0005722733537874,1.0005666364178876,1.0005610550218054,1.0005555286180101,1.000550056664376,1.0005446386241268,1.0005392739657835,1.0005339621631126,1.0005287026950733,1.0005234950457667,1.0005183387043848,1.0005132331651598,1.000508177927315,1.0005031724950153,1.0004982163773173,1.0004933090881225,1.000488450146128,1.0004836390747802,1.0004788754022276,1.000474158661273,1.00046948838933,1.000464864128375,1.0004602854249036,1.0004557518298849,1.0004512628987188,1.00044681819119,1.0004424172714272,1.0004380597078582,1.0004337450731677,1.0004294729442562,1.000425242902198,1.0004210545321992,1.0004169074235574,1.0004128011696216,1.0004087353677518,1.0004047096192792,1.0004007235294674,1.000396776707473,1.0003928687663082,1.0003889993228015,1.0003851679975602,1.0003813744149337,1.0003776182029767,1.000373898993411,1.0003702164215917,1.0003665701264688,1.0003629597505534,1.0003593849398824,1.000355845343983,1.000352340615838,1.0003488704118533,1.0003454343918219,1.0003420322188925,1.0003386635595346,1.0003353280835074,1.000332025463826,1.0003287553767295,1.0003255175016497,1.000322311521179,1.00031913712104,1.0003159939900534,1.0003128818201084,1.000309800306132,1.0003067491460589,1.0003037280408025,1.0003007366942245,1.0002977748131063,1.0002948421071205,1.0002919382888016,1.0002890630735188,1.0002862161794466,1.0002833973275385,1.0002806062414988,1.0002778426477554,1.0002751062754338,1.000272396856329,1.0002697141248804,1.0002670578181456,1.0002644276757735,1.0002618234399803,1.0002592448555225,1.0002566916696736,1.000254163632197,1.0002516604953247,1.0002491820137291,1.0002467279445022,1.0002442980471293,1.0002418920834673,1.00023950981772,1.0002371510164154,1.000234815448383,1.0002325028847305,1.000230213098822,1.000227945866255,1.0002257009648396,1.000223478174575,1.0002212772776289,1.0002190980583163,1.0002169403030776,1.0002148038004586,1.0002126883410885,1.0002105937176604,1.0002085197249104,1.0002064661595975,1.000204432820484,1.000202419508315,1.0002004260258,1.000198452177592,1.00019649777027,1.0001945626123188,1.0001926465141102,1.0001907492878856,1.000188870747736,1.000187010709585,1.0001851689911698,1.000183345412024,1.0001815397934595,1.0001797519585491,1.0001779817321093,1.0001762289406824,1.0001744934125205,1.0001727749775682,1.0001710734674452,1.000169388715431,1.0001677205564479,1.0001660688270448,1.0001644333653812,1.0001628140112109,1.000161210605868,1.0001596229922483,1.000158051014797,1.0001564945194918,1.0001549533538274,1.000153427366802,1.0001519164089012,1.0001504203320841,1.0001489389897682,1.0001474722368153,1.0001460199295176,1.000144581925583,1.0001431580841216,1.0001417482656312,1.000140352331985,1.0001389701464158,1.0001376015735055,1.0001362464791692,1.0001349047306431,1.0001335761964723,1.0001322607464957,1.0001309582518363,1.0001296685848853,1.000128391619292,1.0001271272299506,1.0001258752929876,1.0001246356857498,1.000123408286793,1.0001221929758684,1.0001209896339134,1.000119798143037,1.0001186183865105,1.000117450248755,1.0001162936153307,1.000115148372924,1.0001140144093388,1.0001128916134843,1.0001117798753636,1.0001106790860634,1.0001095891377443,1.000108509923628,1.0001074413379891,1.0001063832761437,1.0001053356344385,1.000104298310242,1.0001032712019335,1.0001022542088938,1.000101247231494,1.0001002501710876,1.0000992629299994,1.0000982854115168,1.0000973175198795,1.0000963591602707,1.000095410238808,1.0000944706625332,1.0000935403394045,1.0000926191782862,1.0000917070889408,1.0000908039820193],"x":[-5.0,-4.995051954477981,-4.9901039089559625,-4.985155863433944,-4.980207817911925,-4.975259772389906,-4.970311726867887,-4.965363681345869,-4.96041563582385,-4.955467590301831,-4.950519544779812,-4.9455714992577935,-4.940623453735775,-4.935675408213756,-4.930727362691737,-4.925779317169718,-4.920831271647699,-4.91588322612568,-4.910935180603661,-4.905987135081642,-4.901039089559624,-4.896091044037605,-4.891142998515586,-4.886194952993567,-4.8812469074715485,-4.87629886194953,-4.871350816427511,-4.866402770905492,-4.8614547253834735,-4.856506679861455,-4.851558634339436,-4.846610588817417,-4.841662543295398,-4.83671449777338,-4.831766452251361,-4.826818406729342,-4.821870361207323,-4.8169223156853045,-4.811974270163286,-4.807026224641267,-4.802078179119248,-4.797130133597229,-4.792182088075211,-4.787234042553192,-4.782285997031173,-4.777337951509154,-4.772389905987135,-4.767441860465116,-4.762493814943097,-4.757545769421078,-4.7525977238990595,-4.747649678377041,-4.742701632855022,-4.737753587333003,-4.7328055418109845,-4.727857496288966,-4.722909450766947,-4.717961405244928,-4.713013359722909,-4.708065314200891,-4.703117268678872,-4.698169223156853,-4.693221177634834,-4.6882731321128155,-4.683325086590797,-4.678377041068778,-4.673428995546759,-4.66848095002474,-4.663532904502722,-4.658584858980703,-4.653636813458684,-4.648688767936665,-4.6437407224146465,-4.638792676892628,-4.633844631370609,-4.62889658584859,-4.623948540326571,-4.619000494804552,-4.614052449282533,-4.609104403760514,-4.6041563582384955,-4.599208312716477,-4.594260267194458,-4.589312221672439,-4.58436417615042,-4.579416130628402,-4.574468085106383,-4.569520039584364,-4.564571994062345,-4.5596239485403265,-4.554675903018308,-4.549727857496289,-4.54477981197427,-4.539831766452251,-4.534883720930233,-4.529935675408214,-4.524987629886195,-4.520039584364176,-4.5150915388421575,-4.510143493320139,-4.50519544779812,-4.500247402276101,-4.495299356754082,-4.490351311232064,-4.485403265710045,-4.480455220188026,-4.475507174666007,-4.470559129143989,-4.465611083621969,-4.46066303809995,-4.455714992577931,-4.450766947055913,-4.445818901533894,-4.440870856011875,-4.435922810489856,-4.4309747649678375,-4.426026719445819,-4.4210786739238,-4.416130628401781,-4.411182582879762,-4.406234537357744,-4.401286491835725,-4.396338446313706,-4.391390400791687,-4.3864423552696685,-4.38149430974765,-4.376546264225631,-4.371598218703612,-4.366650173181593,-4.361702127659575,-4.356754082137556,-4.351806036615537,-4.346857991093518,-4.3419099455715,-4.336961900049481,-4.332013854527462,-4.327065809005443,-4.3221177634834245,-4.317169717961405,-4.312221672439386,-4.307273626917367,-4.3023255813953485,-4.29737753587333,-4.292429490351311,-4.287481444829292,-4.282533399307273,-4.277585353785255,-4.272637308263236,-4.267689262741217,-4.262741217219198,-4.2577931716971795,-4.252845126175161,-4.247897080653142,-4.242949035131123,-4.238000989609104,-4.233052944087086,-4.228104898565067,-4.223156853043048,-4.218208807521029,-4.213260761999011,-4.208312716476992,-4.203364670954973,-4.198416625432954,-4.1934685799109355,-4.188520534388917,-4.183572488866898,-4.178624443344879,-4.17367639782286,-4.168728352300842,-4.163780306778822,-4.158832261256803,-4.153884215734784,-4.148936170212766,-4.143988124690747,-4.139040079168728,-4.134092033646709,-4.1291439881246905,-4.124195942602672,-4.119247897080653,-4.114299851558634,-4.109351806036615,-4.104403760514597,-4.099455714992578,-4.094507669470559,-4.08955962394854,-4.084611578426522,-4.079663532904503,-4.074715487382484,-4.069767441860465,-4.0648193963384465,-4.059871350816428,-4.054923305294409,-4.04997525977239,-4.045027214250371,-4.040079168728353,-4.035131123206334,-4.030183077684315,-4.025235032162296,-4.0202869866402775,-4.015338941118259,-4.010390895596239,-4.00544285007422,-4.0004948045522015,-3.995546759030183,-3.9905987135081644,-3.9856506679861456,-3.980702622464127,-3.9757545769421077,-3.970806531420089,-3.96585848589807,-3.9609104403760513,-3.9559623948540326,-3.951014349332014,-3.946066303809995,-3.9411182582879762,-3.9361702127659575,-3.9312221672439387,-3.92627412172192,-3.921326076199901,-3.9163780306778824,-3.9114299851558636,-3.906481939633845,-3.901533894111826,-3.896585848589807,-3.891637803067788,-3.8866897575457693,-3.8817417120237505,-3.8767936665017317,-3.871845620979713,-3.866897575457694,-3.8619495299356754,-3.8570014844136566,-3.852053438891638,-3.847105393369619,-3.8421573478476003,-3.8372093023255816,-3.8322612568035628,-3.827313211281544,-3.822365165759525,-3.817417120237506,-3.8124690747154872,-3.8075210291934685,-3.8025729836714497,-3.797624938149431,-3.792676892627412,-3.7877288471053934,-3.7827808015833746,-3.777832756061356,-3.772884710539337,-3.7679366650173183,-3.7629886194952995,-3.7580405739732807,-3.753092528451262,-3.7481444829292427,-3.743196437407224,-3.738248391885205,-3.7333003463631864,-3.7283523008411676,-3.723404255319149,-3.71845620979713,-3.7135081642751113,-3.7085601187530925,-3.7036120732310738,-3.698664027709055,-3.6937159821870362,-3.6887679366650175,-3.6838198911429987,-3.67887184562098,-3.6739238000989607,-3.668975754576942,-3.664027709054923,-3.6590796635329044,-3.6541316180108856,-3.649183572488867,-3.644235526966848,-3.6392874814448293,-3.6343394359228105,-3.6293913904007917,-3.624443344878773,-3.619495299356754,-3.6145472538347354,-3.6095992083127166,-3.604651162790698,-3.599703117268679,-3.59475507174666,-3.589807026224641,-3.5848589807026223,-3.5799109351806035,-3.5749628896585848,-3.570014844136566,-3.5650667986145472,-3.5601187530925285,-3.5551707075705097,-3.550222662048491,-3.545274616526472,-3.5403265710044534,-3.5353785254824346,-3.530430479960416,-3.525482434438397,-3.520534388916378,-3.515586343394359,-3.5106382978723403,-3.5056902523503215,-3.5007422068283027,-3.495794161306284,-3.490846115784265,-3.4858980702622464,-3.4809500247402276,-3.476001979218209,-3.47105393369619,-3.4661058881741713,-3.4611578426521525,-3.4562097971301338,-3.451261751608115,-3.4463137060860958,-3.441365660564077,-3.4364176150420582,-3.4314695695200395,-3.4265215239980207,-3.421573478476002,-3.416625432953983,-3.4116773874319644,-3.4067293419099456,-3.401781296387927,-3.396833250865908,-3.3918852053438893,-3.3869371598218705,-3.3819891142998517,-3.377041068777833,-3.372093023255814,-3.367144977733795,-3.362196932211776,-3.3572488866897574,-3.3523008411677386,-3.34735279564572,-3.342404750123701,-3.3374567046016823,-3.3325086590796635,-3.3275606135576448,-3.322612568035626,-3.317664522513607,-3.3127164769915884,-3.3077684314695697,-3.302820385947551,-3.297872340425532,-3.292924294903513,-3.287976249381494,-3.2830282038594754,-3.2780801583374566,-3.273132112815438,-3.268184067293419,-3.2632360217714003,-3.2582879762493815,-3.2533399307273627,-3.248391885205344,-3.243443839683325,-3.2384957941613064,-3.2335477486392876,-3.228599703117269,-3.22365165759525,-3.218703612073231,-3.213755566551212,-3.2088075210291933,-3.2038594755071745,-3.1989114299851558,-3.193963384463137,-3.189015338941118,-3.1840672934190994,-3.1791192478970807,-3.174171202375062,-3.169223156853043,-3.1642751113310243,-3.1593270658090056,-3.154379020286987,-3.149430974764968,-3.1444829292429493,-3.13953488372093,-3.1345868381989113,-3.1296387926768925,-3.1246907471548737,-3.119742701632855,-3.114794656110836,-3.1098466105888174,-3.1048985650667986,-3.09995051954478,-3.095002474022761,-3.0900544285007423,-3.0851063829787235,-3.0801583374567048,-3.075210291934686,-3.070262246412667,-3.065314200890648,-3.060366155368629,-3.0554181098466104,-3.0504700643245917,-3.045522018802573,-3.040573973280554,-3.0356259277585353,-3.0306778822365166,-3.025729836714498,-3.020781791192479,-3.0158337456704603,-3.0108857001484415,-3.0059376546264227,-3.000989609104404,-2.996041563582385,-2.991093518060366,-2.986145472538347,-2.9811974270163284,-2.9762493814943096,-2.971301335972291,-2.966353290450272,-2.9614052449282533,-2.9564571994062345,-2.9515091538842158,-2.946561108362197,-2.941613062840178,-2.9366650173181594,-2.9317169717961407,-2.926768926274122,-2.921820880752103,-2.9168728352300843,-2.911924789708065,-2.9069767441860463,-2.9020286986640276,-2.897080653142009,-2.89213260761999,-2.8871845620979713,-2.8822365165759525,-2.8772884710539337,-2.872340425531915,-2.867392380009896,-2.8624443344878774,-2.8574962889658586,-2.85254824344384,-2.847600197921821,-2.8426521523998023,-2.837704106877783,-2.8327560613557643,-2.8278080158337455,-2.8228599703117268,-2.817911924789708,-2.812963879267689,-2.8080158337456704,-2.8030677882236517,-2.798119742701633,-2.793171697179614,-2.7882236516575953,-2.7832756061355766,-2.778327560613558,-2.773379515091539,-2.7684314695695202,-2.763483424047501,-2.7585353785254823,-2.7535873330034635,-2.7486392874814447,-2.743691241959426,-2.738743196437407,-2.7337951509153884,-2.7288471053933696,-2.723899059871351,-2.718951014349332,-2.7140029688273133,-2.7090549233052945,-2.7041068777832757,-2.699158832261257,-2.694210786739238,-2.689262741217219,-2.6843146956952,-2.6793666501731814,-2.6744186046511627,-2.669470559129144,-2.664522513607125,-2.6595744680851063,-2.6546264225630876,-2.649678377041069,-2.64473033151905,-2.6397822859970312,-2.6348342404750125,-2.6298861949529937,-2.624938149430975,-2.619990103908956,-2.6150420583869374,-2.610094012864918,-2.6051459673428994,-2.6001979218208806,-2.595249876298862,-2.590301830776843,-2.5853537852548243,-2.5804057397328055,-2.5754576942107867,-2.570509648688768,-2.565561603166749,-2.5606135576447304,-2.5556655121227116,-2.550717466600693,-2.545769421078674,-2.5408213755566553,-2.535873330034636,-2.5309252845126173,-2.5259772389905986,-2.52102919346858,-2.516081147946561,-2.5111331024245422,-2.5061850569025235,-2.5012370113805047,-2.496288965858486,-2.491340920336467,-2.4863928748144484,-2.4814448292924296,-2.476496783770411,-2.471548738248392,-2.4666006927263733,-2.461652647204354,-2.4567046016823353,-2.4517565561603165,-2.4468085106382977,-2.441860465116279,-2.43691241959426,-2.4319643740722414,-2.4270163285502226,-2.422068283028204,-2.417120237506185,-2.4121721919841663,-2.4072241464621476,-2.4022761009401288,-2.39732805541811,-2.3923800098960912,-2.3874319643740725,-2.3824839188520532,-2.3775358733300345,-2.3725878278080157,-2.367639782285997,-2.362691736763978,-2.3577436912419594,-2.3527956457199406,-2.347847600197922,-2.342899554675903,-2.3379515091538843,-2.3330034636318655,-2.3280554181098467,-2.323107372587828,-2.318159327065809,-2.3132112815437904,-2.308263236021771,-2.3033151904997524,-2.2983671449777336,-2.293419099455715,-2.288471053933696,-2.2835230084116773,-2.2785749628896586,-2.2736269173676398,-2.268678871845621,-2.2637308263236022,-2.2587827808015835,-2.2538347352795647,-2.248886689757546,-2.243938644235527,-2.2389905987135084,-2.234042553191489,-2.2290945076694704,-2.2241464621474516,-2.219198416625433,-2.214250371103414,-2.2093023255813953,-2.2043542800593765,-2.1994062345373577,-2.194458189015339,-2.18951014349332,-2.1845620979713014,-2.1796140524492826,-2.174666006927264,-2.169717961405245,-2.1647699158832263,-2.1598218703612075,-2.1548738248391883,-2.1499257793171695,-2.1449777337951508,-2.140029688273132,-2.1350816427511132,-2.1301335972290945,-2.1251855517070757,-2.120237506185057,-2.115289460663038,-2.1103414151410194,-2.1053933696190006,-2.100445324096982,-2.095497278574963,-2.0905492330529443,-2.0856011875309255,-2.0806531420089063,-2.0757050964868875,-2.0707570509648687,-2.06580900544285,-2.060860959920831,-2.0559129143988124,-2.0509648688767936,-2.046016823354775,-2.041068777832756,-2.0361207323107373,-2.0311726867887185,-2.0262246412666998,-2.021276595744681,-2.016328550222662,-2.0113805047006434,-2.0064324591786242,-2.0014844136566055,-1.996536368134587,-1.9915883226125681,-1.9866402770905491,-1.9816922315685304,-1.9767441860465116,-1.9717961405244928,-1.966848095002474,-1.9619000494804553,-1.9569520039584365,-1.9520039584364177,-1.9470559129143987,-1.94210786739238,-1.9371598218703612,-1.9322117763483424,-1.9272637308263236,-1.9223156853043049,-1.917367639782286,-1.912419594260267,-1.9074715487382483,-1.9025235032162295,-1.8975754576942108,-1.892627412172192,-1.8876793666501732,-1.8827313211281544,-1.8777832756061357,-1.8728352300841167,-1.867887184562098,-1.8629391390400791,-1.8579910935180604,-1.8530430479960416,-1.8480950024740228,-1.843146956952004,-1.8381989114299853,-1.8332508659079663,-1.8283028203859475,-1.8233547748639287,-1.81840672934191,-1.8134586838198912,-1.8085106382978724,-1.8035625927758536,-1.7986145472538346,-1.7936665017318159,-1.788718456209797,-1.7837704106877783,-1.7788223651657595,-1.7738743196437408,-1.768926274121722,-1.7639782285997032,-1.7590301830776842,-1.7540821375556654,-1.7491340920336467,-1.744186046511628,-1.7392380009896091,-1.7342899554675903,-1.7293419099455716,-1.7243938644235528,-1.7194458189015338,-1.714497773379515,-1.7095497278574963,-1.7046016823354775,-1.6996536368134587,-1.69470559129144,-1.6897575457694212,-1.6848095002474022,-1.6798614547253834,-1.6749134092033646,-1.6699653636813458,-1.665017318159327,-1.6600692726373083,-1.6551212271152895,-1.6501731815932708,-1.6452251360712518,-1.640277090549233,-1.6353290450272142,-1.6303809995051954,-1.6254329539831767,-1.620484908461158,-1.6155368629391391,-1.6105888174171203,-1.6056407718951013,-1.6006927263730826,-1.5957446808510638,-1.590796635329045,-1.5858485898070263,-1.5809005442850075,-1.5759524987629887,-1.5710044532409697,-1.566056407718951,-1.5611083621969322,-1.5561603166749134,-1.5512122711528946,-1.5462642256308758,-1.541316180108857,-1.5363681345868383,-1.5314200890648193,-1.5264720435428005,-1.5215239980207818,-1.516575952498763,-1.5116279069767442,-1.5066798614547254,-1.5017318159327067,-1.4967837704106879,-1.491835724888669,-1.4868876793666501,-1.4819396338446313,-1.4769915883226126,-1.4720435428005938,-1.467095497278575,-1.4621474517565562,-1.4571994062345373,-1.4522513607125185,-1.4473033151904997,-1.442355269668481,-1.4374072241464622,-1.4324591786244434,-1.4275111331024246,-1.4225630875804058,-1.4176150420583868,-1.412666996536368,-1.4077189510143493,-1.4027709054923305,-1.3978228599703117,-1.392874814448293,-1.3879267689262742,-1.3829787234042554,-1.3780306778822364,-1.3730826323602177,-1.3681345868381989,-1.3631865413161801,-1.3582384957941613,-1.3532904502721426,-1.3483424047501238,-1.3433943592281048,-1.338446313706086,-1.3334982681840672,-1.3285502226620485,-1.3236021771400297,-1.318654131618011,-1.3137060860959922,-1.3087580405739734,-1.3038099950519544,-1.2988619495299356,-1.2939139040079168,-1.288965858485898,-1.2840178129638793,-1.2790697674418605,-1.2741217219198417,-1.269173676397823,-1.264225630875804,-1.2592775853537852,-1.2543295398317664,-1.2493814943097477,-1.2444334487877289,-1.23948540326571,-1.2345373577436913,-1.2295893122216723,-1.2246412666996536,-1.2196932211776348,-1.214745175655616,-1.2097971301335972,-1.2048490846115785,-1.1999010390895597,-1.194952993567541,-1.190004948045522,-1.1850569025235032,-1.1801088570014844,-1.1751608114794656,-1.1702127659574468,-1.165264720435428,-1.1603166749134093,-1.1553686293913905,-1.1504205838693715,-1.1454725383473527,-1.140524492825334,-1.1355764473033152,-1.1306284017812964,-1.1256803562592776,-1.1207323107372589,-1.1157842652152399,-1.110836219693221,-1.1058881741712023,-1.1009401286491836,-1.0959920831271648,-1.091044037605146,-1.0860959920831272,-1.0811479465611085,-1.0761999010390895,-1.0712518555170707,-1.066303809995052,-1.0613557644730331,-1.0564077189510144,-1.0514596734289956,-1.0465116279069768,-1.0415635823849578,-1.036615536862939,-1.0316674913409203,-1.0267194458189015,-1.0217714002968827,-1.016823354774864,-1.0118753092528452,-1.0069272637308264,-1.0019792182088074,-0.9970311726867888,-0.9920831271647699,-0.9871350816427511,-0.9821870361207323,-0.9772389905987136,-0.9722909450766947,-0.9673428995546759,-0.9623948540326571,-0.9574468085106383,-0.9524987629886195,-0.9475507174666007,-0.9426026719445819,-0.9376546264225631,-0.9327065809005443,-0.9277585353785255,-0.9228104898565067,-0.9178624443344878,-0.912914398812469,-0.9079663532904503,-0.9030183077684315,-0.8980702622464126,-0.8931222167243938,-0.8881741712023751,-0.8832261256803563,-0.8782780801583374,-0.8733300346363186,-0.8683819891142999,-0.8634339435922811,-0.8584858980702622,-0.8535378525482434,-0.8485898070262247,-0.8436417615042059,-0.838693715982187,-0.8337456704601682,-0.8287976249381495,-0.8238495794161306,-0.8189015338941118,-0.813953488372093,-0.8090054428500743,-0.8040573973280554,-0.7991093518060366,-0.7941613062840178,-0.789213260761999,-0.7842652152399802,-0.7793171697179614,-0.7743691241959426,-0.7694210786739238,-0.764473033151905,-0.7595249876298862,-0.7545769421078674,-0.7496288965858486,-0.7446808510638298,-0.739732805541811,-0.7347847600197922,-0.7298367144977734,-0.7248886689757545,-0.7199406234537358,-0.714992577931717,-0.7100445324096981,-0.7050964868876793,-0.7001484413656606,-0.6952003958436418,-0.6902523503216229,-0.6853043047996041,-0.6803562592775854,-0.6754082137555666,-0.6704601682335477,-0.6655121227115289,-0.6605640771895102,-0.6556160316674914,-0.6506679861454725,-0.6457199406234537,-0.640771895101435,-0.6358238495794162,-0.6308758040573973,-0.6259277585353785,-0.6209797130133597,-0.616031667491341,-0.6110836219693221,-0.6061355764473033,-0.6011875309252845,-0.5962394854032657,-0.5912914398812469,-0.5863433943592281,-0.5813953488372093,-0.5764473033151905,-0.5714992577931717,-0.5665512122711529,-0.5616031667491341,-0.5566551212271152,-0.5517070757050965,-0.5467590301830777,-0.5418109846610589,-0.53686293913904,-0.5319148936170213,-0.5269668480950025,-0.5220188025729837,-0.5170707570509648,-0.5121227115289461,-0.5071746660069273,-0.5022266204849085,-0.4972785749628897,-0.49233052944087086,-0.487382483918852,-0.48243443839683325,-0.4774863928748144,-0.47253834735279565,-0.4675903018307768,-0.46264225630875805,-0.4576942107867392,-0.45274616526472045,-0.4477981197427016,-0.44285007422068284,-0.437902028698664,-0.43295398317664524,-0.4280059376546264,-0.42305789213260764,-0.4181098466105888,-0.41316180108857004,-0.4082137555665512,-0.40326571004453243,-0.3983176645225136,-0.39336961900049483,-0.388421573478476,-0.38347352795645717,-0.3785254824344384,-0.37357743691241957,-0.3686293913904008,-0.36368134586838197,-0.3587333003463632,-0.35378525482434436,-0.3488372093023256,-0.34388916378030676,-0.338941118258288,-0.33399307273626916,-0.3290450272142504,-0.32409698169223156,-0.3191489361702128,-0.31420089064819395,-0.3092528451261752,-0.30430479960415635,-0.2993567540821376,-0.29440870856011875,-0.2894606630381,-0.28451261751608115,-0.27956457199406237,-0.27461652647204354,-0.2696684809500247,-0.26472043542800594,-0.2597723899059871,-0.25482434438396834,-0.24987629886194954,-0.24492825333993073,-0.23998020781791193,-0.23503216229589313,-0.23008411677387433,-0.22513607125185553,-0.22018802572983673,-0.2152399802078179,-0.2102919346857991,-0.2053438891637803,-0.2003958436417615,-0.1954477981197427,-0.1904997525977239,-0.1855517070757051,-0.1806036615536863,-0.1756556160316675,-0.1707075705096487,-0.16575952498762989,-0.16081147946561108,-0.15586343394359228,-0.15091538842157348,-0.14596734289955468,-0.14101929737753588,-0.13607125185551708,-0.13112320633349828,-0.12617516081147948,-0.12122711528946066,-0.11627906976744186,-0.11133102424542306,-0.10638297872340426,-0.10143493320138545,-0.09648688767936665,-0.09153884215734785,-0.08659079663532905,-0.08164275111331024,-0.07669470559129143,-0.07174666006927263,-0.06679861454725383,-0.06185056902523503,-0.05690252350321623,-0.05195447798119743,-0.047006432459178626,-0.042058386937159825,-0.03711034141514102,-0.032162295893122216,-0.027214250371103414,-0.022266204849084613,-0.017318159327065808,-0.012370113805047007,-0.007422068283028204,-0.002474022761009401,0.002474022761009401,0.007422068283028204,0.012370113805047007,0.017318159327065808,0.022266204849084613,0.027214250371103414,0.032162295893122216,0.03711034141514102,0.042058386937159825,0.047006432459178626,0.05195447798119743,0.05690252350321623,0.06185056902523503,0.06679861454725383,0.07174666006927263,0.07669470559129143,0.08164275111331024,0.08659079663532905,0.09153884215734785,0.09648688767936665,0.10143493320138545,0.10638297872340426,0.11133102424542306,0.11627906976744186,0.12122711528946066,0.12617516081147948,0.13112320633349828,0.13607125185551708,0.14101929737753588,0.14596734289955468,0.15091538842157348,0.15586343394359228,0.16081147946561108,0.16575952498762989,0.1707075705096487,0.1756556160316675,0.1806036615536863,0.1855517070757051,0.1904997525977239,0.1954477981197427,0.2003958436417615,0.2053438891637803,0.2102919346857991,0.2152399802078179,0.22018802572983673,0.22513607125185553,0.23008411677387433,0.23503216229589313,0.23998020781791193,0.24492825333993073,0.24987629886194954,0.25482434438396834,0.2597723899059871,0.26472043542800594,0.2696684809500247,0.27461652647204354,0.27956457199406237,0.28451261751608115,0.2894606630381,0.29440870856011875,0.2993567540821376,0.30430479960415635,0.3092528451261752,0.31420089064819395,0.3191489361702128,0.32409698169223156,0.3290450272142504,0.33399307273626916,0.338941118258288,0.34388916378030676,0.3488372093023256,0.35378525482434436,0.3587333003463632,0.36368134586838197,0.3686293913904008,0.37357743691241957,0.3785254824344384,0.38347352795645717,0.388421573478476,0.39336961900049483,0.3983176645225136,0.40326571004453243,0.4082137555665512,0.41316180108857004,0.4181098466105888,0.42305789213260764,0.4280059376546264,0.43295398317664524,0.437902028698664,0.44285007422068284,0.4477981197427016,0.45274616526472045,0.4576942107867392,0.46264225630875805,0.4675903018307768,0.47253834735279565,0.4774863928748144,0.48243443839683325,0.487382483918852,0.49233052944087086,0.4972785749628897,0.5022266204849085,0.5071746660069273,0.5121227115289461,0.5170707570509648,0.5220188025729837,0.5269668480950025,0.5319148936170213,0.53686293913904,0.5418109846610589,0.5467590301830777,0.5517070757050965,0.5566551212271152,0.5616031667491341,0.5665512122711529,0.5714992577931717,0.5764473033151905,0.5813953488372093,0.5863433943592281,0.5912914398812469,0.5962394854032657,0.6011875309252845,0.6061355764473033,0.6110836219693221,0.616031667491341,0.6209797130133597,0.6259277585353785,0.6308758040573973,0.6358238495794162,0.640771895101435,0.6457199406234537,0.6506679861454725,0.6556160316674914,0.6605640771895102,0.6655121227115289,0.6704601682335477,0.6754082137555666,0.6803562592775854,0.6853043047996041,0.6902523503216229,0.6952003958436418,0.7001484413656606,0.7050964868876793,0.7100445324096981,0.714992577931717,0.7199406234537358,0.7248886689757545,0.7298367144977734,0.7347847600197922,0.739732805541811,0.7446808510638298,0.7496288965858486,0.7545769421078674,0.7595249876298862,0.764473033151905,0.7694210786739238,0.7743691241959426,0.7793171697179614,0.7842652152399802,0.789213260761999,0.7941613062840178,0.7991093518060366,0.8040573973280554,0.8090054428500743,0.813953488372093,0.8189015338941118,0.8238495794161306,0.8287976249381495,0.8337456704601682,0.838693715982187,0.8436417615042059,0.8485898070262247,0.8535378525482434,0.8584858980702622,0.8634339435922811,0.8683819891142999,0.8733300346363186,0.8782780801583374,0.8832261256803563,0.8881741712023751,0.8931222167243938,0.8980702622464126,0.9030183077684315,0.9079663532904503,0.912914398812469,0.9178624443344878,0.9228104898565067,0.9277585353785255,0.9327065809005443,0.9376546264225631,0.9426026719445819,0.9475507174666007,0.9524987629886195,0.9574468085106383,0.9623948540326571,0.9673428995546759,0.9722909450766947,0.9772389905987136,0.9821870361207323,0.9871350816427511,0.9920831271647699,0.9970311726867888,1.0019792182088074,1.0069272637308264,1.0118753092528452,1.016823354774864,1.0217714002968827,1.0267194458189015,1.0316674913409203,1.036615536862939,1.0415635823849578,1.0465116279069768,1.0514596734289956,1.0564077189510144,1.0613557644730331,1.066303809995052,1.0712518555170707,1.0761999010390895,1.0811479465611085,1.0860959920831272,1.091044037605146,1.0959920831271648,1.1009401286491836,1.1058881741712023,1.110836219693221,1.1157842652152399,1.1207323107372589,1.1256803562592776,1.1306284017812964,1.1355764473033152,1.140524492825334,1.1454725383473527,1.1504205838693715,1.1553686293913905,1.1603166749134093,1.165264720435428,1.1702127659574468,1.1751608114794656,1.1801088570014844,1.1850569025235032,1.190004948045522,1.194952993567541,1.1999010390895597,1.2048490846115785,1.2097971301335972,1.214745175655616,1.2196932211776348,1.2246412666996536,1.2295893122216723,1.2345373577436913,1.23948540326571,1.2444334487877289,1.2493814943097477,1.2543295398317664,1.2592775853537852,1.264225630875804,1.269173676397823,1.2741217219198417,1.2790697674418605,1.2840178129638793,1.288965858485898,1.2939139040079168,1.2988619495299356,1.3038099950519544,1.3087580405739734,1.3137060860959922,1.318654131618011,1.3236021771400297,1.3285502226620485,1.3334982681840672,1.338446313706086,1.3433943592281048,1.3483424047501238,1.3532904502721426,1.3582384957941613,1.3631865413161801,1.3681345868381989,1.3730826323602177,1.3780306778822364,1.3829787234042554,1.3879267689262742,1.392874814448293,1.3978228599703117,1.4027709054923305,1.4077189510143493,1.412666996536368,1.4176150420583868,1.4225630875804058,1.4275111331024246,1.4324591786244434,1.4374072241464622,1.442355269668481,1.4473033151904997,1.4522513607125185,1.4571994062345373,1.4621474517565562,1.467095497278575,1.4720435428005938,1.4769915883226126,1.4819396338446313,1.4868876793666501,1.491835724888669,1.4967837704106879,1.5017318159327067,1.5066798614547254,1.5116279069767442,1.516575952498763,1.5215239980207818,1.5264720435428005,1.5314200890648193,1.5363681345868383,1.541316180108857,1.5462642256308758,1.5512122711528946,1.5561603166749134,1.5611083621969322,1.566056407718951,1.5710044532409697,1.5759524987629887,1.5809005442850075,1.5858485898070263,1.590796635329045,1.5957446808510638,1.6006927263730826,1.6056407718951013,1.6105888174171203,1.6155368629391391,1.620484908461158,1.6254329539831767,1.6303809995051954,1.6353290450272142,1.640277090549233,1.6452251360712518,1.6501731815932708,1.6551212271152895,1.6600692726373083,1.665017318159327,1.6699653636813458,1.6749134092033646,1.6798614547253834,1.6848095002474022,1.6897575457694212,1.69470559129144,1.6996536368134587,1.7046016823354775,1.7095497278574963,1.714497773379515,1.7194458189015338,1.7243938644235528,1.7293419099455716,1.7342899554675903,1.7392380009896091,1.744186046511628,1.7491340920336467,1.7540821375556654,1.7590301830776842,1.7639782285997032,1.768926274121722,1.7738743196437408,1.7788223651657595,1.7837704106877783,1.788718456209797,1.7936665017318159,1.7986145472538346,1.8035625927758536,1.8085106382978724,1.8134586838198912,1.81840672934191,1.8233547748639287,1.8283028203859475,1.8332508659079663,1.8381989114299853,1.843146956952004,1.8480950024740228,1.8530430479960416,1.8579910935180604,1.8629391390400791,1.867887184562098,1.8728352300841167,1.8777832756061357,1.8827313211281544,1.8876793666501732,1.892627412172192,1.8975754576942108,1.9025235032162295,1.9074715487382483,1.912419594260267,1.917367639782286,1.9223156853043049,1.9272637308263236,1.9322117763483424,1.9371598218703612,1.94210786739238,1.9470559129143987,1.9520039584364177,1.9569520039584365,1.9619000494804553,1.966848095002474,1.9717961405244928,1.9767441860465116,1.9816922315685304,1.9866402770905491,1.9915883226125681,1.996536368134587,2.0014844136566055,2.0064324591786242,2.0113805047006434,2.016328550222662,2.021276595744681,2.0262246412666998,2.0311726867887185,2.0361207323107373,2.041068777832756,2.046016823354775,2.0509648688767936,2.0559129143988124,2.060860959920831,2.06580900544285,2.0707570509648687,2.0757050964868875,2.0806531420089063,2.0856011875309255,2.0905492330529443,2.095497278574963,2.100445324096982,2.1053933696190006,2.1103414151410194,2.115289460663038,2.120237506185057,2.1251855517070757,2.1301335972290945,2.1350816427511132,2.140029688273132,2.1449777337951508,2.1499257793171695,2.1548738248391883,2.1598218703612075,2.1647699158832263,2.169717961405245,2.174666006927264,2.1796140524492826,2.1845620979713014,2.18951014349332,2.194458189015339,2.1994062345373577,2.2043542800593765,2.2093023255813953,2.214250371103414,2.219198416625433,2.2241464621474516,2.2290945076694704,2.234042553191489,2.2389905987135084,2.243938644235527,2.248886689757546,2.2538347352795647,2.2587827808015835,2.2637308263236022,2.268678871845621,2.2736269173676398,2.2785749628896586,2.2835230084116773,2.288471053933696,2.293419099455715,2.2983671449777336,2.3033151904997524,2.308263236021771,2.3132112815437904,2.318159327065809,2.323107372587828,2.3280554181098467,2.3330034636318655,2.3379515091538843,2.342899554675903,2.347847600197922,2.3527956457199406,2.3577436912419594,2.362691736763978,2.367639782285997,2.3725878278080157,2.3775358733300345,2.3824839188520532,2.3874319643740725,2.3923800098960912,2.39732805541811,2.4022761009401288,2.4072241464621476,2.4121721919841663,2.417120237506185,2.422068283028204,2.4270163285502226,2.4319643740722414,2.43691241959426,2.441860465116279,2.4468085106382977,2.4517565561603165,2.4567046016823353,2.461652647204354,2.4666006927263733,2.471548738248392,2.476496783770411,2.4814448292924296,2.4863928748144484,2.491340920336467,2.496288965858486,2.5012370113805047,2.5061850569025235,2.5111331024245422,2.516081147946561,2.52102919346858,2.5259772389905986,2.5309252845126173,2.535873330034636,2.5408213755566553,2.545769421078674,2.550717466600693,2.5556655121227116,2.5606135576447304,2.565561603166749,2.570509648688768,2.5754576942107867,2.5804057397328055,2.5853537852548243,2.590301830776843,2.595249876298862,2.6001979218208806,2.6051459673428994,2.610094012864918,2.6150420583869374,2.619990103908956,2.624938149430975,2.6298861949529937,2.6348342404750125,2.6397822859970312,2.64473033151905,2.649678377041069,2.6546264225630876,2.6595744680851063,2.664522513607125,2.669470559129144,2.6744186046511627,2.6793666501731814,2.6843146956952,2.689262741217219,2.694210786739238,2.699158832261257,2.7041068777832757,2.7090549233052945,2.7140029688273133,2.718951014349332,2.723899059871351,2.7288471053933696,2.7337951509153884,2.738743196437407,2.743691241959426,2.7486392874814447,2.7535873330034635,2.7585353785254823,2.763483424047501,2.7684314695695202,2.773379515091539,2.778327560613558,2.7832756061355766,2.7882236516575953,2.793171697179614,2.798119742701633,2.8030677882236517,2.8080158337456704,2.812963879267689,2.817911924789708,2.8228599703117268,2.8278080158337455,2.8327560613557643,2.837704106877783,2.8426521523998023,2.847600197921821,2.85254824344384,2.8574962889658586,2.8624443344878774,2.867392380009896,2.872340425531915,2.8772884710539337,2.8822365165759525,2.8871845620979713,2.89213260761999,2.897080653142009,2.9020286986640276,2.9069767441860463,2.911924789708065,2.9168728352300843,2.921820880752103,2.926768926274122,2.9317169717961407,2.9366650173181594,2.941613062840178,2.946561108362197,2.9515091538842158,2.9564571994062345,2.9614052449282533,2.966353290450272,2.971301335972291,2.9762493814943096,2.9811974270163284,2.986145472538347,2.991093518060366,2.996041563582385,3.000989609104404,3.0059376546264227,3.0108857001484415,3.0158337456704603,3.020781791192479,3.025729836714498,3.0306778822365166,3.0356259277585353,3.040573973280554,3.045522018802573,3.0504700643245917,3.0554181098466104,3.060366155368629,3.065314200890648,3.070262246412667,3.075210291934686,3.0801583374567048,3.0851063829787235,3.0900544285007423,3.095002474022761,3.09995051954478,3.1048985650667986,3.1098466105888174,3.114794656110836,3.119742701632855,3.1246907471548737,3.1296387926768925,3.1345868381989113,3.13953488372093,3.1444829292429493,3.149430974764968,3.154379020286987,3.1593270658090056,3.1642751113310243,3.169223156853043,3.174171202375062,3.1791192478970807,3.1840672934190994,3.189015338941118,3.193963384463137,3.1989114299851558,3.2038594755071745,3.2088075210291933,3.213755566551212,3.218703612073231,3.22365165759525,3.228599703117269,3.2335477486392876,3.2384957941613064,3.243443839683325,3.248391885205344,3.2533399307273627,3.2582879762493815,3.2632360217714003,3.268184067293419,3.273132112815438,3.2780801583374566,3.2830282038594754,3.287976249381494,3.292924294903513,3.297872340425532,3.302820385947551,3.3077684314695697,3.3127164769915884,3.317664522513607,3.322612568035626,3.3275606135576448,3.3325086590796635,3.3374567046016823,3.342404750123701,3.34735279564572,3.3523008411677386,3.3572488866897574,3.362196932211776,3.367144977733795,3.372093023255814,3.377041068777833,3.3819891142998517,3.3869371598218705,3.3918852053438893,3.396833250865908,3.401781296387927,3.4067293419099456,3.4116773874319644,3.416625432953983,3.421573478476002,3.4265215239980207,3.4314695695200395,3.4364176150420582,3.441365660564077,3.4463137060860958,3.451261751608115,3.4562097971301338,3.4611578426521525,3.4661058881741713,3.47105393369619,3.476001979218209,3.4809500247402276,3.4858980702622464,3.490846115784265,3.495794161306284,3.5007422068283027,3.5056902523503215,3.5106382978723403,3.515586343394359,3.520534388916378,3.525482434438397,3.530430479960416,3.5353785254824346,3.5403265710044534,3.545274616526472,3.550222662048491,3.5551707075705097,3.5601187530925285,3.5650667986145472,3.570014844136566,3.5749628896585848,3.5799109351806035,3.5848589807026223,3.589807026224641,3.59475507174666,3.599703117268679,3.604651162790698,3.6095992083127166,3.6145472538347354,3.619495299356754,3.624443344878773,3.6293913904007917,3.6343394359228105,3.6392874814448293,3.644235526966848,3.649183572488867,3.6541316180108856,3.6590796635329044,3.664027709054923,3.668975754576942,3.6739238000989607,3.67887184562098,3.6838198911429987,3.6887679366650175,3.6937159821870362,3.698664027709055,3.7036120732310738,3.7085601187530925,3.7135081642751113,3.71845620979713,3.723404255319149,3.7283523008411676,3.7333003463631864,3.738248391885205,3.743196437407224,3.7481444829292427,3.753092528451262,3.7580405739732807,3.7629886194952995,3.7679366650173183,3.772884710539337,3.777832756061356,3.7827808015833746,3.7877288471053934,3.792676892627412,3.797624938149431,3.8025729836714497,3.8075210291934685,3.8124690747154872,3.817417120237506,3.822365165759525,3.827313211281544,3.8322612568035628,3.8372093023255816,3.8421573478476003,3.847105393369619,3.852053438891638,3.8570014844136566,3.8619495299356754,3.866897575457694,3.871845620979713,3.8767936665017317,3.8817417120237505,3.8866897575457693,3.891637803067788,3.896585848589807,3.901533894111826,3.906481939633845,3.9114299851558636,3.9163780306778824,3.921326076199901,3.92627412172192,3.9312221672439387,3.9361702127659575,3.9411182582879762,3.946066303809995,3.951014349332014,3.9559623948540326,3.9609104403760513,3.96585848589807,3.970806531420089,3.9757545769421077,3.980702622464127,3.9856506679861456,3.9905987135081644,3.995546759030183,4.0004948045522015,4.00544285007422,4.010390895596239,4.015338941118259,4.0202869866402775,4.025235032162296,4.030183077684315,4.035131123206334,4.040079168728353,4.045027214250371,4.04997525977239,4.054923305294409,4.059871350816428,4.0648193963384465,4.069767441860465,4.074715487382484,4.079663532904503,4.084611578426522,4.08955962394854,4.094507669470559,4.099455714992578,4.104403760514597,4.109351806036615,4.114299851558634,4.119247897080653,4.124195942602672,4.1291439881246905,4.134092033646709,4.139040079168728,4.143988124690747,4.148936170212766,4.153884215734784,4.158832261256803,4.163780306778822,4.168728352300842,4.17367639782286,4.178624443344879,4.183572488866898,4.188520534388917,4.1934685799109355,4.198416625432954,4.203364670954973,4.208312716476992,4.213260761999011,4.218208807521029,4.223156853043048,4.228104898565067,4.233052944087086,4.238000989609104,4.242949035131123,4.247897080653142,4.252845126175161,4.2577931716971795,4.262741217219198,4.267689262741217,4.272637308263236,4.277585353785255,4.282533399307273,4.287481444829292,4.292429490351311,4.29737753587333,4.3023255813953485,4.307273626917367,4.312221672439386,4.317169717961405,4.3221177634834245,4.327065809005443,4.332013854527462,4.336961900049481,4.3419099455715,4.346857991093518,4.351806036615537,4.356754082137556,4.361702127659575,4.366650173181593,4.371598218703612,4.376546264225631,4.38149430974765,4.3864423552696685,4.391390400791687,4.396338446313706,4.401286491835725,4.406234537357744,4.411182582879762,4.416130628401781,4.4210786739238,4.426026719445819,4.4309747649678375,4.435922810489856,4.440870856011875,4.445818901533894,4.450766947055913,4.455714992577931,4.46066303809995,4.465611083621969,4.470559129143989,4.475507174666007,4.480455220188026,4.485403265710045,4.490351311232064,4.495299356754082,4.500247402276101,4.50519544779812,4.510143493320139,4.5150915388421575,4.520039584364176,4.524987629886195,4.529935675408214,4.534883720930233,4.539831766452251,4.54477981197427,4.549727857496289,4.554675903018308,4.5596239485403265,4.564571994062345,4.569520039584364,4.574468085106383,4.579416130628402,4.58436417615042,4.589312221672439,4.594260267194458,4.599208312716477,4.6041563582384955,4.609104403760514,4.614052449282533,4.619000494804552,4.623948540326571,4.62889658584859,4.633844631370609,4.638792676892628,4.6437407224146465,4.648688767936665,4.653636813458684,4.658584858980703,4.663532904502722,4.66848095002474,4.673428995546759,4.678377041068778,4.683325086590797,4.6882731321128155,4.693221177634834,4.698169223156853,4.703117268678872,4.708065314200891,4.713013359722909,4.717961405244928,4.722909450766947,4.727857496288966,4.7328055418109845,4.737753587333003,4.742701632855022,4.747649678377041,4.7525977238990595,4.757545769421078,4.762493814943097,4.767441860465116,4.772389905987135,4.777337951509154,4.782285997031173,4.787234042553192,4.792182088075211,4.797130133597229,4.802078179119248,4.807026224641267,4.811974270163286,4.8169223156853045,4.821870361207323,4.826818406729342,4.831766452251361,4.83671449777338,4.841662543295398,4.846610588817417,4.851558634339436,4.856506679861455,4.8614547253834735,4.866402770905492,4.871350816427511,4.87629886194953,4.8812469074715485,4.886194952993567,4.891142998515586,4.896091044037605,4.901039089559624,4.905987135081642,4.910935180603661,4.91588322612568,4.920831271647699,4.925779317169718,4.930727362691737,4.935675408213756,4.940623453735775,4.9455714992577935,4.950519544779812,4.955467590301831,4.96041563582385,4.965363681345869,4.970311726867887,4.975259772389906,4.980207817911925,4.985155863433944,4.9901039089559625,4.995051954477981,5.0]}

},{}],93:[function(require,module,exports){
module.exports={"expected":[-1.0000908039820193,-1.0000006476276162,-1.0000000046191841,-1.0000000000329463,-1.0000000000002351,-1.0000000000000018,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0],"x":[-5.0,-7.471548738248392,-9.943097476496783,-12.414646214745176,-14.886194952993568,-17.35774369124196,-19.82929242949035,-22.300841167738742,-24.772389905987136,-27.243938644235527,-29.715487382483918,-32.18703612073231,-34.6585848589807,-37.1301335972291,-39.601682335477484,-42.07323107372588,-44.54477981197427,-47.01632855022266,-49.487877288471054,-51.95942602671945,-54.430974764967836,-56.90252350321623,-59.374072241464624,-61.84562097971301,-64.3171697179614,-66.78871845620979,-69.2602671944582,-71.73181593270658,-74.20336467095497,-76.67491340920337,-79.14646214745176,-81.61801088570014,-84.08955962394855,-86.56110836219693,-89.03265710044532,-91.50420583869372,-93.97575457694211,-96.4473033151905,-98.9188520534389,-101.39040079168728,-103.86194952993567,-106.33349826818407,-108.80504700643246,-111.27659574468085,-113.74814448292925,-116.21969322117764,-118.69124195942602,-121.16279069767442,-123.63433943592281,-126.1058881741712,-128.57743691241959,-131.048985650668,-133.5205343889164,-135.99208312716476,-138.46363186541316,-140.93518060366156,-143.40672934190994,-145.87827808015834,-148.34982681840674,-150.8213755566551,-153.29292429490351,-155.76447303315192,-158.2360217714003,-160.7075705096487,-163.1791192478971,-165.65066798614546,-168.12221672439387,-170.59376546264227,-173.06531420089064,-175.53686293913904,-178.00841167738744,-180.47996041563582,-182.95150915388422,-185.42305789213262,-187.894606630381,-190.3661553686294,-192.8377041068778,-195.30925284512617,-197.78080158337457,-200.25235032162297,-202.72389905987134,-205.19544779811974,-207.66699653636815,-210.13854527461652,-212.61009401286492,-215.08164275111332,-217.5531914893617,-220.0247402276101,-222.4962889658585,-224.96783770410687,-227.43938644235527,-229.91093518060367,-232.38248391885205,-234.85403265710045,-237.32558139534885,-239.79713013359722,-242.26867887184562,-244.74022761009402,-247.2117763483424,-249.6833250865908,-252.1548738248392,-254.62642256308757,-257.097971301336,-259.56952003958435,-262.0410687778328,-264.51261751608115,-266.9841662543295,-269.45571499257795,-271.9272637308263,-274.3988124690747,-276.8703612073231,-279.3419099455715,-281.8134586838199,-284.2850074220683,-286.7565561603167,-289.22810489856505,-291.6996536368135,-294.17120237506185,-296.6427511133102,-299.11429985155866,-301.58584858980703,-304.0573973280554,-306.52894606630383,-309.0004948045522,-311.4720435428006,-313.943592281049,-316.4151410192974,-318.88668975754575,-321.3582384957942,-323.82978723404256,-326.30133597229093,-328.77288471053936,-331.24443344878773,-333.7159821870361,-336.18753092528453,-338.6590796635329,-341.1306284017813,-343.6021771400297,-346.0737258782781,-348.54527461652646,-351.0168233547749,-353.48837209302326,-355.95992083127163,-358.43146956952006,-360.90301830776843,-363.3745670460168,-365.84611578426524,-368.3176645225136,-370.789213260762,-373.2607619990104,-375.7323107372588,-378.20385947550716,-380.6754082137556,-383.14695695200396,-385.61850569025233,-388.09005442850076,-390.56160316674914,-393.0331519049975,-395.50470064324594,-397.9762493814943,-400.4477981197427,-402.9193468579911,-405.3908955962395,-407.86244433448786,-410.3339930727363,-412.80554181098466,-415.27709054923304,-417.74863928748147,-420.22018802572984,-422.6917367639782,-425.16328550222664,-427.634834240475,-430.1063829787234,-432.5779317169718,-435.0494804552202,-437.52102919346856,-439.992577931717,-442.46412666996537,-444.93567540821374,-447.40722414646217,-449.87877288471054,-452.3503216229589,-454.82187036120735,-457.2934190994557,-459.7649678377041,-462.2365165759525,-464.7080653142009,-467.17961405244927,-469.6511627906977,-472.12271152894607,-474.59426026719444,-477.0658090054429,-479.53735774369125,-482.0089064819396,-484.48045522018805,-486.9520039584364,-489.4235526966848,-491.8951014349332,-494.3666501731816,-496.83819891142997,-499.3097476496784,-501.7812963879268,-504.25284512617515,-506.7243938644236,-509.19594260267195,-511.6674913409203,-514.1390400791687,-516.6105888174171,-519.0821375556656,-521.5536862939139,-524.0252350321623,-526.4967837704107,-528.968332508659,-531.4398812469075,-533.9114299851559,-536.3829787234042,-538.8545274616527,-541.3260761999011,-543.7976249381494,-546.2691736763978,-548.7407224146463,-551.2122711528946,-553.683819891143,-556.1553686293914,-558.6269173676397,-561.0984661058882,-563.5700148441366,-566.0415635823849,-568.5131123206334,-570.9846610588818,-573.4562097971301,-575.9277585353785,-578.399307273627,-580.8708560118753,-583.3424047501237,-585.8139534883721,-588.2855022266205,-590.7570509648689,-593.2285997031173,-595.7001484413656,-598.1716971796141,-600.6432459178625,-603.1147946561108,-605.5863433943592,-608.0578921326077,-610.529440870856,-613.0009896091044,-615.4725383473528,-617.9440870856012,-620.4156358238496,-622.887184562098,-625.3587333003463,-627.8302820385948,-630.3018307768432,-632.7733795150915,-635.2449282533399,-637.7164769915884,-640.1880257298367,-642.6595744680851,-645.1311232063335,-647.6026719445819,-650.0742206828303,-652.5457694210787,-655.017318159327,-657.4888668975755,-659.9604156358239,-662.4319643740722,-664.9035131123206,-667.3750618505691,-669.8466105888174,-672.3181593270658,-674.7897080653142,-677.2612568035626,-679.732805541811,-682.2043542800594,-684.6759030183077,-687.1474517565562,-689.6190004948046,-692.0905492330529,-694.5620979713013,-697.0336467095498,-699.5051954477981,-701.9767441860465,-704.448292924295,-706.9198416625433,-709.3913904007917,-711.8629391390401,-714.3344878772884,-716.8060366155369,-719.2775853537853,-721.7491340920336,-724.220682830282,-726.6922315685305,-729.1637803067788,-731.6353290450272,-734.1068777832756,-736.578426521524,-739.0499752597724,-741.5215239980208,-743.9930727362691,-746.4646214745176,-748.936170212766,-751.4077189510143,-753.8792676892627,-756.3508164275112,-758.8223651657595,-761.2939139040079,-763.7654626422564,-766.2370113805047,-768.7085601187531,-771.1801088570015,-773.6516575952498,-776.1232063334983,-778.5947550717467,-781.066303809995,-783.5378525482434,-786.0094012864919,-788.4809500247402,-790.9524987629886,-793.424047501237,-795.8955962394854,-798.3671449777338,-800.8386937159822,-803.3102424542305,-805.781791192479,-808.2533399307274,-810.7248886689757,-813.1964374072242,-815.6679861454726,-818.1395348837209,-820.6110836219693,-823.0826323602178,-825.5541810984661,-828.0257298367145,-830.4972785749629,-832.9688273132112,-835.4403760514597,-837.9119247897081,-840.3834735279564,-842.8550222662049,-845.3265710044533,-847.7981197427016,-850.26966848095,-852.7412172191985,-855.2127659574468,-857.6843146956952,-860.1558634339436,-862.627412172192,-865.0989609104404,-867.5705096486888,-870.0420583869371,-872.5136071251856,-874.985155863434,-877.4567046016823,-879.9282533399307,-882.3998020781792,-884.8713508164275,-887.3428995546759,-889.8144482929243,-892.2859970311727,-894.7575457694211,-897.2290945076695,-899.7006432459178,-902.1721919841663,-904.6437407224147,-907.115289460663,-909.5868381989114,-912.0583869371599,-914.5299356754082,-917.0014844136566,-919.473033151905,-921.9445818901534,-924.4161306284018,-926.8876793666502,-929.3592281048985,-931.830776843147,-934.3023255813954,-936.7738743196437,-939.2454230578921,-941.7169717961406,-944.1885205343889,-946.6600692726373,-949.1316180108857,-951.6031667491341,-954.0747154873825,-956.5462642256309,-959.0178129638792,-961.4893617021277,-963.9609104403761,-966.4324591786244,-968.9040079168728,-971.3755566551213,-973.8471053933696,-976.318654131618,-978.7902028698664,-981.2617516081148,-983.7333003463632,-986.2048490846116,-988.6763978228599,-991.1479465611084,-993.6194952993568,-996.0910440376051,-998.5625927758535,-1001.034141514102,-1003.5056902523503,-1005.9772389905987,-1008.4487877288472,-1010.9203364670955,-1013.3918852053439,-1015.8634339435923,-1018.3349826818406,-1020.8065314200891,-1023.2780801583375,-1025.7496288965858,-1028.2211776348342,-1030.6927263730827,-1033.164275111331,-1035.6358238495793,-1038.1073725878277,-1040.5789213260762,-1043.0504700643246,-1045.522018802573,-1047.9935675408215,-1050.4651162790697,-1052.936665017318,-1055.4082137555665,-1057.879762493815,-1060.3513112320634,-1062.8228599703118,-1065.29440870856,-1067.7659574468084,-1070.2375061850569,-1072.7090549233053,-1075.1806036615537,-1077.6521523998022,-1080.1237011380504,-1082.5952498762988,-1085.0667986145472,-1087.5383473527957,-1090.009896091044,-1092.4814448292925,-1094.9529935675407,-1097.4245423057891,-1099.8960910440376,-1102.367639782286,-1104.8391885205344,-1107.3107372587829,-1109.782285997031,-1112.2538347352795,-1114.725383473528,-1117.1969322117764,-1119.6684809500248,-1122.1400296882732,-1124.6115784265214,-1127.0831271647698,-1129.5546759030183,-1132.0262246412667,-1134.4977733795151,-1136.9693221177636,-1139.4408708560118,-1141.9124195942602,-1144.3839683325086,-1146.855517070757,-1149.3270658090055,-1151.798614547254,-1154.2701632855021,-1156.7417120237506,-1159.213260761999,-1161.6848095002474,-1164.1563582384958,-1166.6279069767443,-1169.0994557149925,-1171.571004453241,-1174.0425531914893,-1176.5141019297378,-1178.9856506679862,-1181.4571994062346,-1183.9287481444828,-1186.4002968827313,-1188.8718456209797,-1191.3433943592281,-1193.8149430974765,-1196.286491835725,-1198.7580405739732,-1201.2295893122216,-1203.70113805047,-1206.1726867887185,-1208.644235526967,-1211.1157842652153,-1213.5873330034635,-1216.058881741712,-1218.5304304799604,-1221.0019792182088,-1223.4735279564572,-1225.9450766947057,-1228.4166254329539,-1230.8881741712023,-1233.3597229094507,-1235.8312716476992,-1238.3028203859476,-1240.774369124196,-1243.2459178624442,-1245.7174666006927,-1248.189015338941,-1250.6605640771895,-1253.132112815438,-1255.6036615536864,-1258.0752102919346,-1260.546759030183,-1263.0183077684314,-1265.4898565066799,-1267.9614052449283,-1270.4329539831767,-1272.904502721425,-1275.3760514596734,-1277.8476001979218,-1280.3191489361702,-1282.7906976744187,-1285.262246412667,-1287.7337951509153,-1290.2053438891637,-1292.6768926274121,-1295.1484413656606,-1297.619990103909,-1300.0915388421574,-1302.5630875804056,-1305.034636318654,-1307.5061850569025,-1309.977733795151,-1312.4492825333994,-1314.9208312716478,-1317.392380009896,-1319.8639287481444,-1322.3354774863928,-1324.8070262246413,-1327.2785749628897,-1329.7501237011381,-1332.2216724393863,-1334.6932211776348,-1337.1647699158832,-1339.6363186541316,-1342.10786739238,-1344.5794161306285,-1347.0509648688767,-1349.5225136071251,-1351.9940623453735,-1354.465611083622,-1356.9371598218704,-1359.4087085601188,-1361.880257298367,-1364.3518060366155,-1366.823354774864,-1369.2949035131123,-1371.7664522513608,-1374.2380009896092,-1376.7095497278574,-1379.1810984661058,-1381.6526472043543,-1384.1241959426027,-1386.595744680851,-1389.0672934190995,-1391.5388421573477,-1394.0103908955962,-1396.4819396338446,-1398.953488372093,-1401.4250371103415,-1403.89658584859,-1406.368134586838,-1408.8396833250865,-1411.311232063335,-1413.7827808015834,-1416.2543295398318,-1418.7258782780802,-1421.1974270163284,-1423.6689757545769,-1426.1405244928253,-1428.6120732310737,-1431.0836219693222,-1433.5551707075706,-1436.0267194458188,-1438.4982681840672,-1440.9698169223157,-1443.441365660564,-1445.9129143988125,-1448.384463137061,-1450.8560118753092,-1453.3275606135576,-1455.799109351806,-1458.2706580900544,-1460.7422068283029,-1463.2137555665513,-1465.6853043047995,-1468.156853043048,-1470.6284017812964,-1473.0999505195448,-1475.5714992577932,-1478.0430479960417,-1480.5145967342899,-1482.9861454725383,-1485.4576942107867,-1487.9292429490351,-1490.4007916872836,-1492.872340425532,-1495.3438891637802,-1497.8154379020286,-1500.286986640277,-1502.7585353785255,-1505.230084116774,-1507.7016328550224,-1510.1731815932706,-1512.644730331519,-1515.1162790697674,-1517.5878278080158,-1520.0593765462643,-1522.5309252845127,-1525.002474022761,-1527.4740227610093,-1529.9455714992578,-1532.4171202375062,-1534.8886689757546,-1537.360217714003,-1539.8317664522513,-1542.3033151904997,-1544.7748639287481,-1547.2464126669965,-1549.717961405245,-1552.1895101434934,-1554.6610588817416,-1557.13260761999,-1559.6041563582385,-1562.075705096487,-1564.5472538347353,-1567.0188025729838,-1569.490351311232,-1571.9619000494804,-1574.4334487877288,-1576.9049975259773,-1579.3765462642257,-1581.848095002474,-1584.3196437407223,-1586.7911924789707,-1589.2627412172192,-1591.7342899554676,-1594.205838693716,-1596.6773874319645,-1599.1489361702127,-1601.620484908461,-1604.0920336467095,-1606.563582384958,-1609.0351311232064,-1611.5066798614548,-1613.978228599703,-1616.4497773379514,-1618.9213260761999,-1621.3928748144483,-1623.8644235526967,-1626.3359722909452,-1628.8075210291934,-1631.2790697674418,-1633.7506185056902,-1636.2221672439387,-1638.693715982187,-1641.1652647204355,-1643.6368134586837,-1646.1083621969321,-1648.5799109351806,-1651.051459673429,-1653.5230084116774,-1655.9945571499259,-1658.466105888174,-1660.9376546264225,-1663.409203364671,-1665.8807521029194,-1668.3523008411678,-1670.8238495794162,-1673.2953983176644,-1675.7669470559129,-1678.2384957941613,-1680.7100445324097,-1683.1815932706581,-1685.6531420089066,-1688.1246907471548,-1690.5962394854032,-1693.0677882236516,-1695.5393369619,-1698.0108857001485,-1700.482434438397,-1702.9539831766451,-1705.4255319148936,-1707.897080653142,-1710.3686293913904,-1712.8401781296388,-1715.3117268678873,-1717.7832756061355,-1720.254824344384,-1722.7263730826323,-1725.1979218208808,-1727.6694705591292,-1730.1410192973776,-1732.6125680356258,-1735.0841167738743,-1737.5556655121227,-1740.0272142503711,-1742.4987629886195,-1744.970311726868,-1747.4418604651162,-1749.9134092033646,-1752.384957941613,-1754.8565066798615,-1757.32805541811,-1759.7996041563583,-1762.2711528946065,-1764.742701632855,-1767.2142503711034,-1769.6857991093518,-1772.1573478476002,-1774.6288965858487,-1777.1004453240969,-1779.5719940623453,-1782.0435428005937,-1784.5150915388422,-1786.9866402770906,-1789.458189015339,-1791.9297377535872,-1794.4012864918357,-1796.872835230084,-1799.3443839683325,-1801.815932706581,-1804.2874814448294,-1806.7590301830776,-1809.230578921326,-1811.7021276595744,-1814.1736763978229,-1816.6452251360713,-1819.1167738743197,-1821.588322612568,-1824.0598713508164,-1826.5314200890648,-1829.0029688273132,-1831.4745175655617,-1833.94606630381,-1836.4176150420583,-1838.8891637803067,-1841.3607125185551,-1843.8322612568036,-1846.303809995052,-1848.7753587333004,-1851.2469074715486,-1853.718456209797,-1856.1900049480455,-1858.661553686294,-1861.1331024245424,-1863.6046511627908,-1866.076199901039,-1868.5477486392874,-1871.0192973775358,-1873.4908461157843,-1875.9623948540327,-1878.4339435922811,-1880.9054923305293,-1883.3770410687778,-1885.8485898070262,-1888.3201385452746,-1890.791687283523,-1893.2632360217715,-1895.7347847600197,-1898.2063334982681,-1900.6778822365166,-1903.149430974765,-1905.6209797130134,-1908.0925284512618,-1910.56407718951,-1913.0356259277585,-1915.507174666007,-1917.9787234042553,-1920.4502721425038,-1922.9218208807522,-1925.3933696190004,-1927.8649183572488,-1930.3364670954973,-1932.8080158337457,-1935.2795645719941,-1937.7511133102425,-1940.2226620484907,-1942.6942107867392,-1945.1657595249876,-1947.637308263236,-1950.1088570014845,-1952.580405739733,-1955.051954477981,-1957.5235032162295,-1959.995051954478,-1962.4666006927264,-1964.9381494309748,-1967.4096981692232,-1969.8812469074714,-1972.3527956457199,-1974.8243443839683,-1977.2958931222167,-1979.7674418604652,-1982.2389905987136,-1984.7105393369618,-1987.1820880752102,-1989.6536368134587,-1992.125185551707,-1994.5967342899555,-1997.068283028204,-1999.5398317664522,-2002.0113805047006,-2004.482929242949,-2006.9544779811974,-2009.4260267194459,-2011.8975754576943,-2014.3691241959425,-2016.840672934191,-2019.3122216724394,-2021.7837704106878,-2024.2553191489362,-2026.7268678871847,-2029.1984166254329,-2031.6699653636813,-2034.1415141019297,-2036.6130628401781,-2039.0846115784266,-2041.556160316675,-2044.0277090549232,-2046.4992577931716,-2048.9708065314203,-2051.4423552696685,-2053.9139040079167,-2056.3854527461654,-2058.8570014844136,-2061.328550222662,-2063.8000989609104,-2066.2716476991586,-2068.7431964374073,-2071.2147451756555,-2073.686293913904,-2076.1578426521523,-2078.629391390401,-2081.100940128649,-2083.5724888668974,-2086.044037605146,-2088.5155863433943,-2090.987135081643,-2093.458683819891,-2095.9302325581393,-2098.401781296388,-2100.873330034636,-2103.344878772885,-2105.816427511133,-2108.2879762493817,-2110.75952498763,-2113.231073725878,-2115.7026224641268,-2118.174171202375,-2120.6457199406236,-2123.117268678872,-2125.58881741712,-2128.0603661553687,-2130.531914893617,-2133.0034636318655,-2135.4750123701137,-2137.9465611083624,-2140.4181098466106,-2142.889658584859,-2145.3612073231075,-2147.8327560613557,-2150.3043047996043,-2152.7758535378525,-2155.2474022761007,-2157.7189510143494,-2160.1904997525976,-2162.6620484908462,-2165.1335972290944,-2167.605145967343,-2170.0766947055913,-2172.5482434438395,-2175.019792182088,-2177.4913409203364,-2179.962889658585,-2182.4344383968332,-2184.9059871350814,-2187.37753587333,-2189.8490846115783,-2192.320633349827,-2194.792182088075,-2197.263730826324,-2199.735279564572,-2202.20682830282,-2204.678377041069,-2207.149925779317,-2209.6214745175657,-2212.093023255814,-2214.564571994062,-2217.036120732311,-2219.507669470559,-2221.9792182088077,-2224.450766947056,-2226.9223156853045,-2229.3938644235527,-2231.865413161801,-2234.3369619000496,-2236.808510638298,-2239.2800593765464,-2241.7516081147946,-2244.223156853043,-2246.6947055912915,-2249.1662543295397,-2251.6378030677884,-2254.1093518060366,-2256.580900544285,-2259.0524492825334,-2261.5239980207816,-2263.9955467590303,-2266.4670954972785,-2268.938644235527,-2271.4101929737753,-2273.8817417120235,-2276.353290450272,-2278.8248391885204,-2281.296387926769,-2283.7679366650173,-2286.239485403266,-2288.711034141514,-2291.1825828797623,-2293.654131618011,-2296.125680356259,-2298.597229094508,-2301.068777832756,-2303.5403265710042,-2306.011875309253,-2308.483424047501,-2310.9549727857498,-2313.426521523998,-2315.8980702622466,-2318.369619000495,-2320.841167738743,-2323.3127164769917,-2325.78426521524,-2328.2558139534885,-2330.7273626917367,-2333.198911429985,-2335.6704601682336,-2338.142008906482,-2340.6135576447305,-2343.0851063829787,-2345.5566551212273,-2348.0282038594755,-2350.4997525977237,-2352.9713013359724,-2355.4428500742206,-2357.9143988124692,-2360.3859475507174,-2362.8574962889656,-2365.3290450272143,-2367.8005937654625,-2370.272142503711,-2372.7436912419594,-2375.215239980208,-2377.6867887184562,-2380.1583374567044,-2382.629886194953,-2385.1014349332013,-2387.57298367145,-2390.044532409698,-2392.5160811479464,-2394.987629886195,-2397.459178624443,-2399.930727362692,-2402.40227610094,-2404.8738248391887,-2407.345373577437,-2409.816922315685,-2412.288471053934,-2414.760019792182,-2417.2315685304306,-2419.703117268679,-2422.174666006927,-2424.6462147451757,-2427.117763483424,-2429.5893122216726,-2432.060860959921,-2434.5324096981694,-2437.0039584364176,-2439.475507174666,-2441.9470559129145,-2444.4186046511627,-2446.8901533894114,-2449.3617021276596,-2451.8332508659078,-2454.3047996041564,-2456.7763483424046,-2459.2478970806533,-2461.7194458189015,-2464.19099455715,-2466.6625432953983,-2469.1340920336465,-2471.605640771895,-2474.0771895101434,-2476.548738248392,-2479.0202869866403,-2481.4918357248885,-2483.963384463137,-2486.4349332013853,-2488.906481939634,-2491.378030677882,-2493.849579416131,-2496.321128154379,-2498.7926768926272,-2501.264225630876,-2503.735774369124,-2506.2073231073728,-2508.678871845621,-2511.150420583869,-2513.621969322118,-2516.093518060366,-2518.5650667986147,-2521.036615536863,-2523.5081642751115,-2525.9797130133597,-2528.451261751608,-2530.9228104898566,-2533.394359228105,-2535.8659079663535,-2538.3374567046017,-2540.80900544285,-2543.2805541810985,-2545.7521029193467,-2548.2236516575954,-2550.6952003958436,-2553.1667491340922,-2555.6382978723404,-2558.1098466105886,-2560.5813953488373,-2563.0529440870855,-2565.524492825334,-2567.9960415635824,-2570.4675903018306,-2572.939139040079,-2575.4106877783274,-2577.882236516576,-2580.3537852548243,-2582.825333993073,-2585.296882731321,-2587.7684314695694,-2590.239980207818,-2592.711528946066,-2595.183077684315,-2597.654626422563,-2600.1261751608113,-2602.59772389906,-2605.069272637308,-2607.540821375557,-2610.012370113805,-2612.4839188520536,-2614.955467590302,-2617.42701632855,-2619.8985650667987,-2622.370113805047,-2624.8416625432956,-2627.3132112815438,-2629.784760019792,-2632.2563087580406,-2634.727857496289,-2637.1994062345375,-2639.6709549727857,-2642.1425037110344,-2644.6140524492826,-2647.0856011875308,-2649.5571499257794,-2652.0286986640276,-2654.5002474022763,-2656.9717961405245,-2659.4433448787727,-2661.9148936170213,-2664.3864423552695,-2666.857991093518,-2669.3295398317664,-2671.801088570015,-2674.2726373082633,-2676.7441860465115,-2679.21573478476,-2681.6872835230083,-2684.158832261257,-2686.630380999505,-2689.1019297377534,-2691.573478476002,-2694.0450272142502,-2696.516575952499,-2698.988124690747,-2701.4596734289958,-2703.931222167244,-2706.402770905492,-2708.874319643741,-2711.345868381989,-2713.8174171202377,-2716.288965858486,-2718.760514596734,-2721.2320633349827,-2723.703612073231,-2726.1751608114796,-2728.646709549728,-2731.1182582879765,-2733.5898070262247,-2736.061355764473,-2738.5329045027215,-2741.0044532409697,-2743.4760019792184,-2745.9475507174666,-2748.419099455715,-2750.8906481939634,-2753.3621969322116,-2755.8337456704603,-2758.3052944087085,-2760.776843146957,-2763.2483918852054,-2765.7199406234536,-2768.191489361702,-2770.6630380999504,-2773.134586838199,-2775.6061355764473,-2778.0776843146955,-2780.549233052944,-2783.0207817911923,-2785.492330529441,-2787.963879267689,-2790.435428005938,-2792.906976744186,-2795.3785254824343,-2797.850074220683,-2800.321622958931,-2802.79317169718,-2805.264720435428,-2807.736269173676,-2810.207817911925,-2812.679366650173,-2815.1509153884217,-2817.62246412667,-2820.0940128649186,-2822.5655616031668,-2825.037110341415,-2827.5086590796636,-2829.980207817912,-2832.4517565561605,-2834.9233052944087,-2837.394854032657,-2839.8664027709056,-2842.3379515091538,-2844.8095002474024,-2847.2810489856506,-2849.7525977238993,-2852.2241464621475,-2854.6956952003957,-2857.1672439386443,-2859.6387926768925,-2862.110341415141,-2864.5818901533894,-2867.0534388916376,-2869.5249876298863,-2871.9965363681345,-2874.468085106383,-2876.9396338446313,-2879.41118258288,-2881.882731321128,-2884.3542800593764,-2886.825828797625,-2889.2973775358732,-2891.768926274122,-2894.24047501237,-2896.7120237506183,-2899.183572488867,-2901.655121227115,-2904.126669965364,-2906.598218703612,-2909.0697674418607,-2911.541316180109,-2914.012864918357,-2916.4844136566057,-2918.955962394854,-2921.4275111331026,-2923.899059871351,-2926.370608609599,-2928.8421573478477,-2931.313706086096,-2933.7852548243445,-2936.2568035625927,-2938.7283523008414,-2941.1999010390896,-2943.671449777338,-2946.1429985155864,-2948.6145472538346,-2951.0860959920833,-2953.5576447303315,-2956.0291934685797,-2958.5007422068284,-2960.9722909450766,-2963.443839683325,-2965.9153884215734,-2968.386937159822,-2970.8584858980703,-2973.3300346363185,-2975.801583374567,-2978.2731321128153,-2980.744680851064,-2983.216229589312,-2985.6877783275604,-2988.159327065809,-2990.6308758040573,-2993.102424542306,-2995.573973280554,-2998.045522018803,-3000.517070757051,-3002.988619495299,-3005.460168233548,-3007.931716971796,-3010.4032657100447,-3012.874814448293,-3015.346363186541,-3017.8179119247898,-3020.289460663038,-3022.7610094012866,-3025.232558139535,-3027.7041068777835,-3030.1756556160317,-3032.64720435428,-3035.1187530925286,-3037.5903018307768,-3040.0618505690254,-3042.5333993072736,-3045.004948045522,-3047.4764967837705,-3049.9480455220187,-3052.4195942602673,-3054.8911429985155,-3057.362691736764,-3059.8342404750124,-3062.3057892132606,-3064.7773379515093,-3067.2488866897575,-3069.720435428006,-3072.1919841662543,-3074.6635329045025,-3077.135081642751,-3079.6066303809994,-3082.078179119248,-3084.5497278574962,-3087.021276595745,-3089.492825333993,-3091.9643740722413,-3094.43592281049,-3096.907471548738,-3099.379020286987,-3101.850569025235,-3104.322117763483,-3106.793666501732,-3109.26521523998,-3111.7367639782287,-3114.208312716477,-3116.6798614547256,-3119.151410192974,-3121.622958931222,-3124.0945076694707,-3126.566056407719,-3129.0376051459675,-3131.5091538842157,-3133.980702622464,-3136.4522513607126,-3138.923800098961,-3141.3953488372094,-3143.8668975754576,-3146.3384463137063,-3148.8099950519545,-3151.2815437902027,-3153.7530925284514,-3156.2246412666996,-3158.696190004948,-3161.1677387431964,-3163.6392874814446,-3166.1108362196933,-3168.5823849579415,-3171.05393369619,-3173.5254824344383,-3175.997031172687,-3178.468579910935,-3180.9401286491834,-3183.411677387432,-3185.8832261256803,-3188.354774863929,-3190.826323602177,-3193.2978723404253,-3195.769421078674,-3198.240969816922,-3200.712518555171,-3203.184067293419,-3205.6556160316677,-3208.127164769916,-3210.598713508164,-3213.0702622464128,-3215.541810984661,-3218.0133597229096,-3220.484908461158,-3222.956457199406,-3225.4280059376547,-3227.899554675903,-3230.3711034141515,-3232.8426521523998,-3235.3142008906484,-3237.7857496288966,-3240.257298367145,-3242.7288471053935,-3245.2003958436417,-3247.6719445818903,-3250.1434933201385,-3252.6150420583867,-3255.0865907966354,-3257.5581395348836,-3260.0296882731323,-3262.5012370113805,-3264.972785749629,-3267.4443344878773,-3269.9158832261255,-3272.387431964374,-3274.8589807026224,-3277.330529440871,-3279.8020781791192,-3282.2736269173674,-3284.745175655616,-3287.2167243938643,-3289.688273132113,-3292.159821870361,-3294.63137060861,-3297.102919346858,-3299.574468085106,-3302.046016823355,-3304.517565561603,-3306.9891142998517,-3309.4606630381,-3311.932211776348,-3314.403760514597,-3316.875309252845,-3319.3468579910937,-3321.818406729342,-3324.2899554675905,-3326.7615042058387,-3329.233052944087,-3331.7046016823356,-3334.176150420584,-3336.6476991588324,-3339.1192478970806,-3341.590796635329,-3344.0623453735775,-3346.5338941118257,-3349.0054428500744,-3351.4769915883226,-3353.948540326571,-3356.4200890648194,-3358.8916378030676,-3361.3631865413163,-3363.8347352795645,-3366.306284017813,-3368.7778327560613,-3371.2493814943095,-3373.720930232558,-3376.1924789708064,-3378.664027709055,-3381.1355764473033,-3383.607125185552,-3386.0786739238,-3388.5502226620483,-3391.021771400297,-3393.493320138545,-3395.964868876794,-3398.436417615042,-3400.9079663532902,-3403.379515091539,-3405.851063829787,-3408.3226125680358,-3410.794161306284,-3413.2657100445326,-3415.737258782781,-3418.208807521029,-3420.6803562592777,-3423.151904997526,-3425.6234537357745,-3428.0950024740227,-3430.566551212271,-3433.0380999505196,-3435.509648688768,-3437.9811974270165,-3440.4527461652647,-3442.9242949035133,-3445.3958436417615,-3447.8673923800097,-3450.3389411182584,-3452.8104898565066,-3455.2820385947552,-3457.7535873330035,-3460.2251360712517,-3462.6966848095003,-3465.1682335477485,-3467.639782285997,-3470.1113310242454,-3472.582879762494,-3475.0544285007422,-3477.5259772389904,-3479.997525977239,-3482.4690747154873,-3484.940623453736,-3487.412172191984,-3489.8837209302324,-3492.355269668481,-3494.826818406729,-3497.298367144978,-3499.769915883226,-3502.2414646214747,-3504.713013359723,-3507.184562097971,-3509.65611083622,-3512.127659574468,-3514.5992083127167,-3517.070757050965,-3519.542305789213,-3522.0138545274617,-3524.48540326571,-3526.9569520039586,-3529.428500742207,-3531.9000494804554,-3534.3715982187036,-3536.843146956952,-3539.3146956952005,-3541.7862444334487,-3544.2577931716974,-3546.7293419099456,-3549.2008906481938,-3551.6724393864424,-3554.1439881246906,-3556.6155368629393,-3559.0870856011875,-3561.558634339436,-3564.0301830776843,-3566.5017318159325,-3568.973280554181,-3571.4448292924294,-3573.916378030678,-3576.3879267689263,-3578.8594755071745,-3581.331024245423,-3583.8025729836713,-3586.27412172192,-3588.745670460168,-3591.217219198417,-3593.688767936665,-3596.1603166749132,-3598.631865413162,-3601.10341415141,-3603.5749628896588,-3606.046511627907,-3608.518060366155,-3610.989609104404,-3613.461157842652,-3615.9327065809007,-3618.404255319149,-3620.8758040573975,-3623.3473527956457,-3625.818901533894,-3628.2904502721426,-3630.761999010391,-3633.2335477486395,-3635.7050964868877,-3638.176645225136,-3640.6481939633845,-3643.1197427016327,-3645.5912914398814,-3648.0628401781296,-3650.5343889163782,-3653.0059376546265,-3655.4774863928747,-3657.9490351311233,-3660.4205838693715,-3662.89213260762,-3665.3636813458684,-3667.8352300841166,-3670.3067788223652,-3672.7783275606134,-3675.249876298862,-3677.7214250371103,-3680.192973775359,-3682.664522513607,-3685.1360712518554,-3687.607619990104,-3690.079168728352,-3692.550717466601,-3695.022266204849,-3697.4938149430973,-3699.965363681346,-3702.436912419594,-3704.908461157843,-3707.380009896091,-3709.8515586343397,-3712.323107372588,-3714.794656110836,-3717.2662048490847,-3719.737753587333,-3722.2093023255816,-3724.68085106383,-3727.152399802078,-3729.6239485403266,-3732.095497278575,-3734.5670460168235,-3737.0385947550717,-3739.5101434933204,-3741.9816922315686,-3744.4532409698168,-3746.9247897080654,-3749.3963384463136,-3751.8678871845623,-3754.3394359228105,-3756.8109846610587,-3759.2825333993073,-3761.7540821375555,-3764.225630875804,-3766.6971796140524,-3769.168728352301,-3771.6402770905493,-3774.1118258287975,-3776.583374567046,-3779.0549233052943,-3781.526472043543,-3783.998020781791,-3786.4695695200394,-3788.941118258288,-3791.4126669965362,-3793.884215734785,-3796.355764473033,-3798.8273132112818,-3801.29886194953,-3803.770410687778,-3806.241959426027,-3808.713508164275,-3811.1850569025237,-3813.656605640772,-3816.12815437902,-3818.5997031172687,-3821.071251855517,-3823.5428005937656,-3826.014349332014,-3828.4858980702625,-3830.9574468085107,-3833.428995546759,-3835.9005442850075,-3838.3720930232557,-3840.8436417615044,-3843.3151904997526,-3845.786739238001,-3848.2582879762494,-3850.7298367144977,-3853.2013854527463,-3855.6729341909945,-3858.144482929243,-3860.6160316674914,-3863.0875804057396,-3865.5591291439882,-3868.0306778822364,-3870.502226620485,-3872.9737753587333,-3875.4453240969815,-3877.91687283523,-3880.3884215734784,-3882.859970311727,-3885.331519049975,-3887.803067788224,-3890.274616526472,-3892.7461652647203,-3895.217714002969,-3897.689262741217,-3900.160811479466,-3902.632360217714,-3905.103908955962,-3907.575457694211,-3910.047006432459,-3912.5185551707077,-3914.990103908956,-3917.4616526472046,-3919.933201385453,-3922.404750123701,-3924.8762988619496,-3927.347847600198,-3929.8193963384465,-3932.2909450766947,-3934.762493814943,-3937.2340425531916,-3939.7055912914398,-3942.1771400296884,-3944.6486887679366,-3947.1202375061853,-3949.5917862444335,-3952.0633349826817,-3954.5348837209303,-3957.0064324591785,-3959.477981197427,-3961.9495299356754,-3964.4210786739236,-3966.8926274121723,-3969.3641761504205,-3971.835724888669,-3974.3072736269173,-3976.778822365166,-3979.250371103414,-3981.7219198416624,-3984.193468579911,-3986.6650173181592,-3989.136566056408,-3991.608114794656,-3994.0796635329043,-3996.551212271153,-3999.022761009401,-4001.49430974765,-4003.965858485898,-4006.4374072241467,-4008.908955962395,-4011.380504700643,-4013.8520534388917,-4016.32360217714,-4018.7951509153886,-4021.266699653637,-4023.738248391885,-4026.2097971301337,-4028.681345868382,-4031.1528946066305,-4033.6244433448787,-4036.0959920831274,-4038.5675408213756,-4041.039089559624,-4043.5106382978724,-4045.9821870361206,-4048.4537357743693,-4050.9252845126175,-4053.3968332508657,-4055.8683819891144,-4058.3399307273626,-4060.8114794656112,-4063.2830282038594,-4065.754576942108,-4068.2261256803563,-4070.6976744186045,-4073.169223156853,-4075.6407718951014,-4078.11232063335,-4080.583869371598,-4083.0554181098464,-4085.526966848095,-4087.9985155863433,-4090.470064324592,-4092.94161306284,-4095.413161801089,-4097.884710539337,-4100.356259277585,-4102.827808015833,-4105.2993567540825,-4107.770905492331,-4110.242454230579,-4112.714002968827,-4115.185551707075,-4117.657100445324,-4120.128649183573,-4122.600197921821,-4125.071746660069,-4127.543295398317,-4130.014844136566,-4132.486392874815,-4134.957941613063,-4137.429490351311,-4139.90103908956,-4142.372587827808,-4144.8441365660565,-4147.315685304305,-4149.787234042553,-4152.258782780802,-4154.73033151905,-4157.201880257298,-4159.673428995547,-4162.144977733795,-4164.616526472044,-4167.088075210292,-4169.55962394854,-4172.0311726867885,-4174.502721425037,-4176.974270163286,-4179.445818901534,-4181.917367639782,-4184.38891637803,-4186.860465116279,-4189.332013854528,-4191.803562592776,-4194.275111331024,-4196.746660069272,-4199.2182088075215,-4201.68975754577,-4204.161306284018,-4206.632855022266,-4209.104403760514,-4211.575952498763,-4214.047501237012,-4216.51904997526,-4218.990598713508,-4221.462147451756,-4223.933696190005,-4226.4052449282535,-4228.876793666502,-4231.34834240475,-4233.819891142998,-4236.291439881247,-4238.762988619495,-4241.234537357744,-4243.706086095992,-4246.17763483424,-4248.649183572489,-4251.120732310737,-4253.592281048986,-4256.063829787234,-4258.535378525483,-4261.006927263731,-4263.478476001979,-4265.9500247402275,-4268.421573478476,-4270.893122216725,-4273.364670954973,-4275.836219693221,-4278.307768431469,-4280.779317169718,-4283.250865907967,-4285.722414646215,-4288.193963384463,-4290.665512122711,-4293.1370608609595,-4295.608609599209,-4298.080158337457,-4300.551707075705,-4303.023255813953,-4305.4948045522015,-4307.966353290451,-4310.437902028699,-4312.909450766947,-4315.380999505195,-4317.852548243444,-4320.3240969816925,-4322.795645719941,-4325.267194458189,-4327.738743196437,-4330.210291934686,-4332.681840672934,-4335.153389411183,-4337.624938149431,-4340.096486887679,-4342.568035625928,-4345.039584364176,-4347.5111331024245,-4349.982681840673,-4352.454230578921,-4354.92577931717,-4357.397328055418,-4359.8688767936665,-4362.340425531915,-4364.811974270163,-4367.283523008412,-4369.75507174666,-4372.226620484908,-4374.698169223157,-4377.169717961406,-4379.641266699654,-4382.112815437902,-4384.58436417615,-4387.0559129143985,-4389.527461652648,-4391.999010390896,-4394.470559129144,-4396.942107867392,-4399.41365660564,-4401.8852053438895,-4404.356754082138,-4406.828302820386,-4409.299851558634,-4411.771400296882,-4414.2429490351315,-4416.71449777338,-4419.186046511628,-4421.657595249876,-4424.129143988124,-4426.600692726373,-4429.072241464622,-4431.54379020287,-4434.015338941118,-4436.486887679367,-4438.958436417615,-4441.4299851558635,-4443.901533894112,-4446.37308263236,-4448.844631370609,-4451.316180108857,-4453.787728847105,-4456.259277585354,-4458.730826323602,-4461.202375061851,-4463.673923800099,-4466.145472538347,-4468.617021276596,-4471.088570014844,-4473.560118753093,-4476.031667491341,-4478.503216229589,-4480.9747649678375,-4483.446313706086,-4485.917862444335,-4488.389411182583,-4490.860959920831,-4493.332508659079,-4495.8040573973285,-4498.275606135577,-4500.747154873825,-4503.218703612073,-4505.690252350321,-4508.16180108857,-4510.633349826819,-4513.104898565067,-4515.576447303315,-4518.047996041563,-4520.519544779812,-4522.991093518061,-4525.462642256309,-4527.934190994557,-4530.405739732805,-4532.877288471054,-4535.3488372093025,-4537.820385947551,-4540.291934685799,-4542.763483424047,-4545.235032162296,-4547.706580900544,-4550.178129638793,-4552.649678377041,-4555.12122711529,-4557.592775853538,-4560.064324591786,-4562.5358733300345,-4565.007422068283,-4567.478970806532,-4569.95051954478,-4572.422068283028,-4574.893617021276,-4577.365165759525,-4579.836714497774,-4582.308263236022,-4584.77981197427,-4587.251360712518,-4589.722909450767,-4592.194458189016,-4594.666006927264,-4597.137555665512,-4599.60910440376,-4602.0806531420085,-4604.552201880258,-4607.023750618506,-4609.495299356754,-4611.966848095002,-4614.438396833251,-4616.9099455714995,-4619.381494309748,-4621.853043047996,-4624.324591786244,-4626.796140524493,-4629.267689262741,-4631.73923800099,-4634.210786739238,-4636.682335477486,-4639.153884215735,-4641.625432953983,-4644.096981692232,-4646.56853043048,-4649.040079168728,-4651.511627906977,-4653.983176645225,-4656.4547253834735,-4658.926274121722,-4661.39782285997,-4663.869371598219,-4666.340920336467,-4668.812469074715,-4671.284017812964,-4673.755566551213,-4676.227115289461,-4678.698664027709,-4681.170212765957,-4683.6417615042055,-4686.113310242455,-4688.584858980703,-4691.056407718951,-4693.527956457199,-4695.9995051954475,-4698.471053933697,-4700.942602671945,-4703.414151410193,-4705.885700148441,-4708.357248886689,-4710.8287976249385,-4713.300346363187,-4715.771895101435,-4718.243443839683,-4720.714992577931,-4723.18654131618,-4725.658090054429,-4728.129638792677,-4730.601187530925,-4733.072736269174,-4735.544285007422,-4738.0158337456705,-4740.487382483919,-4742.958931222167,-4745.430479960416,-4747.902028698664,-4750.3735774369125,-4752.845126175161,-4755.316674913409,-4757.788223651658,-4760.259772389906,-4762.731321128154,-4765.202869866403,-4767.674418604651,-4770.1459673429,-4772.617516081148,-4775.089064819396,-4777.5606135576445,-4780.032162295893,-4782.503711034142,-4784.97525977239,-4787.446808510638,-4789.918357248886,-4792.3899059871355,-4794.861454725384,-4797.333003463632,-4799.80455220188,-4802.276100940128,-4804.7476496783775,-4807.219198416626,-4809.690747154874,-4812.162295893122,-4814.63384463137,-4817.105393369619,-4819.576942107868,-4822.048490846116,-4824.520039584364,-4826.991588322612,-4829.463137060861,-4831.9346857991095,-4834.406234537358,-4836.877783275606,-4839.349332013854,-4841.820880752103,-4844.292429490351,-4846.7639782286,-4849.235526966848,-4851.707075705097,-4854.178624443345,-4856.650173181593,-4859.121721919842,-4861.59327065809,-4864.064819396339,-4866.536368134587,-4869.007916872835,-4871.4794656110835,-4873.951014349332,-4876.422563087581,-4878.894111825829,-4881.365660564077,-4883.837209302325,-4886.308758040574,-4888.780306778823,-4891.251855517071,-4893.723404255319,-4896.194952993567,-4898.6665017318155,-4901.138050470065,-4903.609599208313,-4906.081147946561,-4908.552696684809,-4911.024245423058,-4913.495794161307,-4915.967342899555,-4918.438891637803,-4920.910440376051,-4923.3819891143,-4925.8535378525485,-4928.325086590797,-4930.796635329045,-4933.268184067293,-4935.739732805542,-4938.21128154379,-4940.682830282039,-4943.154379020287,-4945.625927758535,-4948.097476496784,-4950.569025235032,-4953.0405739732805,-4955.512122711529,-4957.983671449777,-4960.455220188026,-4962.926768926274,-4965.398317664522,-4967.869866402771,-4970.34141514102,-4972.812963879268,-4975.284512617516,-4977.756061355764,-4980.227610094013,-4982.699158832262,-4985.17070757051,-4987.642256308758,-4990.113805047006,-4992.5853537852545,-4995.056902523504,-4997.528451261752,-5000.0]}

},{}],94:[function(require,module,exports){
module.exports={"expected":[1.0000908039820193,1.0000006476276162,1.0000000046191841,1.0000000000329463,1.0000000000002351,1.0000000000000018,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0],"x":[5.0,7.471548738248392,9.943097476496783,12.414646214745176,14.886194952993568,17.35774369124196,19.82929242949035,22.300841167738742,24.772389905987136,27.243938644235527,29.715487382483918,32.18703612073231,34.6585848589807,37.1301335972291,39.601682335477484,42.07323107372588,44.54477981197427,47.01632855022266,49.487877288471054,51.95942602671945,54.430974764967836,56.90252350321623,59.374072241464624,61.84562097971301,64.3171697179614,66.78871845620979,69.2602671944582,71.73181593270658,74.20336467095497,76.67491340920337,79.14646214745176,81.61801088570014,84.08955962394855,86.56110836219693,89.03265710044532,91.50420583869372,93.97575457694211,96.4473033151905,98.9188520534389,101.39040079168728,103.86194952993567,106.33349826818407,108.80504700643246,111.27659574468085,113.74814448292925,116.21969322117764,118.69124195942602,121.16279069767442,123.63433943592281,126.1058881741712,128.57743691241959,131.048985650668,133.5205343889164,135.99208312716476,138.46363186541316,140.93518060366156,143.40672934190994,145.87827808015834,148.34982681840674,150.8213755566551,153.29292429490351,155.76447303315192,158.2360217714003,160.7075705096487,163.1791192478971,165.65066798614546,168.12221672439387,170.59376546264227,173.06531420089064,175.53686293913904,178.00841167738744,180.47996041563582,182.95150915388422,185.42305789213262,187.894606630381,190.3661553686294,192.8377041068778,195.30925284512617,197.78080158337457,200.25235032162297,202.72389905987134,205.19544779811974,207.66699653636815,210.13854527461652,212.61009401286492,215.08164275111332,217.5531914893617,220.0247402276101,222.4962889658585,224.96783770410687,227.43938644235527,229.91093518060367,232.38248391885205,234.85403265710045,237.32558139534885,239.79713013359722,242.26867887184562,244.74022761009402,247.2117763483424,249.6833250865908,252.1548738248392,254.62642256308757,257.097971301336,259.56952003958435,262.0410687778328,264.51261751608115,266.9841662543295,269.45571499257795,271.9272637308263,274.3988124690747,276.8703612073231,279.3419099455715,281.8134586838199,284.2850074220683,286.7565561603167,289.22810489856505,291.6996536368135,294.17120237506185,296.6427511133102,299.11429985155866,301.58584858980703,304.0573973280554,306.52894606630383,309.0004948045522,311.4720435428006,313.943592281049,316.4151410192974,318.88668975754575,321.3582384957942,323.82978723404256,326.30133597229093,328.77288471053936,331.24443344878773,333.7159821870361,336.18753092528453,338.6590796635329,341.1306284017813,343.6021771400297,346.0737258782781,348.54527461652646,351.0168233547749,353.48837209302326,355.95992083127163,358.43146956952006,360.90301830776843,363.3745670460168,365.84611578426524,368.3176645225136,370.789213260762,373.2607619990104,375.7323107372588,378.20385947550716,380.6754082137556,383.14695695200396,385.61850569025233,388.09005442850076,390.56160316674914,393.0331519049975,395.50470064324594,397.9762493814943,400.4477981197427,402.9193468579911,405.3908955962395,407.86244433448786,410.3339930727363,412.80554181098466,415.27709054923304,417.74863928748147,420.22018802572984,422.6917367639782,425.16328550222664,427.634834240475,430.1063829787234,432.5779317169718,435.0494804552202,437.52102919346856,439.992577931717,442.46412666996537,444.93567540821374,447.40722414646217,449.87877288471054,452.3503216229589,454.82187036120735,457.2934190994557,459.7649678377041,462.2365165759525,464.7080653142009,467.17961405244927,469.6511627906977,472.12271152894607,474.59426026719444,477.0658090054429,479.53735774369125,482.0089064819396,484.48045522018805,486.9520039584364,489.4235526966848,491.8951014349332,494.3666501731816,496.83819891142997,499.3097476496784,501.7812963879268,504.25284512617515,506.7243938644236,509.19594260267195,511.6674913409203,514.1390400791687,516.6105888174171,519.0821375556656,521.5536862939139,524.0252350321623,526.4967837704107,528.968332508659,531.4398812469075,533.9114299851559,536.3829787234042,538.8545274616527,541.3260761999011,543.7976249381494,546.2691736763978,548.7407224146463,551.2122711528946,553.683819891143,556.1553686293914,558.6269173676397,561.0984661058882,563.5700148441366,566.0415635823849,568.5131123206334,570.9846610588818,573.4562097971301,575.9277585353785,578.399307273627,580.8708560118753,583.3424047501237,585.8139534883721,588.2855022266205,590.7570509648689,593.2285997031173,595.7001484413656,598.1716971796141,600.6432459178625,603.1147946561108,605.5863433943592,608.0578921326077,610.529440870856,613.0009896091044,615.4725383473528,617.9440870856012,620.4156358238496,622.887184562098,625.3587333003463,627.8302820385948,630.3018307768432,632.7733795150915,635.2449282533399,637.7164769915884,640.1880257298367,642.6595744680851,645.1311232063335,647.6026719445819,650.0742206828303,652.5457694210787,655.017318159327,657.4888668975755,659.9604156358239,662.4319643740722,664.9035131123206,667.3750618505691,669.8466105888174,672.3181593270658,674.7897080653142,677.2612568035626,679.732805541811,682.2043542800594,684.6759030183077,687.1474517565562,689.6190004948046,692.0905492330529,694.5620979713013,697.0336467095498,699.5051954477981,701.9767441860465,704.448292924295,706.9198416625433,709.3913904007917,711.8629391390401,714.3344878772884,716.8060366155369,719.2775853537853,721.7491340920336,724.220682830282,726.6922315685305,729.1637803067788,731.6353290450272,734.1068777832756,736.578426521524,739.0499752597724,741.5215239980208,743.9930727362691,746.4646214745176,748.936170212766,751.4077189510143,753.8792676892627,756.3508164275112,758.8223651657595,761.2939139040079,763.7654626422564,766.2370113805047,768.7085601187531,771.1801088570015,773.6516575952498,776.1232063334983,778.5947550717467,781.066303809995,783.5378525482434,786.0094012864919,788.4809500247402,790.9524987629886,793.424047501237,795.8955962394854,798.3671449777338,800.8386937159822,803.3102424542305,805.781791192479,808.2533399307274,810.7248886689757,813.1964374072242,815.6679861454726,818.1395348837209,820.6110836219693,823.0826323602178,825.5541810984661,828.0257298367145,830.4972785749629,832.9688273132112,835.4403760514597,837.9119247897081,840.3834735279564,842.8550222662049,845.3265710044533,847.7981197427016,850.26966848095,852.7412172191985,855.2127659574468,857.6843146956952,860.1558634339436,862.627412172192,865.0989609104404,867.5705096486888,870.0420583869371,872.5136071251856,874.985155863434,877.4567046016823,879.9282533399307,882.3998020781792,884.8713508164275,887.3428995546759,889.8144482929243,892.2859970311727,894.7575457694211,897.2290945076695,899.7006432459178,902.1721919841663,904.6437407224147,907.115289460663,909.5868381989114,912.0583869371599,914.5299356754082,917.0014844136566,919.473033151905,921.9445818901534,924.4161306284018,926.8876793666502,929.3592281048985,931.830776843147,934.3023255813954,936.7738743196437,939.2454230578921,941.7169717961406,944.1885205343889,946.6600692726373,949.1316180108857,951.6031667491341,954.0747154873825,956.5462642256309,959.0178129638792,961.4893617021277,963.9609104403761,966.4324591786244,968.9040079168728,971.3755566551213,973.8471053933696,976.318654131618,978.7902028698664,981.2617516081148,983.7333003463632,986.2048490846116,988.6763978228599,991.1479465611084,993.6194952993568,996.0910440376051,998.5625927758535,1001.034141514102,1003.5056902523503,1005.9772389905987,1008.4487877288472,1010.9203364670955,1013.3918852053439,1015.8634339435923,1018.3349826818406,1020.8065314200891,1023.2780801583375,1025.7496288965858,1028.2211776348342,1030.6927263730827,1033.164275111331,1035.6358238495793,1038.1073725878277,1040.5789213260762,1043.0504700643246,1045.522018802573,1047.9935675408215,1050.4651162790697,1052.936665017318,1055.4082137555665,1057.879762493815,1060.3513112320634,1062.8228599703118,1065.29440870856,1067.7659574468084,1070.2375061850569,1072.7090549233053,1075.1806036615537,1077.6521523998022,1080.1237011380504,1082.5952498762988,1085.0667986145472,1087.5383473527957,1090.009896091044,1092.4814448292925,1094.9529935675407,1097.4245423057891,1099.8960910440376,1102.367639782286,1104.8391885205344,1107.3107372587829,1109.782285997031,1112.2538347352795,1114.725383473528,1117.1969322117764,1119.6684809500248,1122.1400296882732,1124.6115784265214,1127.0831271647698,1129.5546759030183,1132.0262246412667,1134.4977733795151,1136.9693221177636,1139.4408708560118,1141.9124195942602,1144.3839683325086,1146.855517070757,1149.3270658090055,1151.798614547254,1154.2701632855021,1156.7417120237506,1159.213260761999,1161.6848095002474,1164.1563582384958,1166.6279069767443,1169.0994557149925,1171.571004453241,1174.0425531914893,1176.5141019297378,1178.9856506679862,1181.4571994062346,1183.9287481444828,1186.4002968827313,1188.8718456209797,1191.3433943592281,1193.8149430974765,1196.286491835725,1198.7580405739732,1201.2295893122216,1203.70113805047,1206.1726867887185,1208.644235526967,1211.1157842652153,1213.5873330034635,1216.058881741712,1218.5304304799604,1221.0019792182088,1223.4735279564572,1225.9450766947057,1228.4166254329539,1230.8881741712023,1233.3597229094507,1235.8312716476992,1238.3028203859476,1240.774369124196,1243.2459178624442,1245.7174666006927,1248.189015338941,1250.6605640771895,1253.132112815438,1255.6036615536864,1258.0752102919346,1260.546759030183,1263.0183077684314,1265.4898565066799,1267.9614052449283,1270.4329539831767,1272.904502721425,1275.3760514596734,1277.8476001979218,1280.3191489361702,1282.7906976744187,1285.262246412667,1287.7337951509153,1290.2053438891637,1292.6768926274121,1295.1484413656606,1297.619990103909,1300.0915388421574,1302.5630875804056,1305.034636318654,1307.5061850569025,1309.977733795151,1312.4492825333994,1314.9208312716478,1317.392380009896,1319.8639287481444,1322.3354774863928,1324.8070262246413,1327.2785749628897,1329.7501237011381,1332.2216724393863,1334.6932211776348,1337.1647699158832,1339.6363186541316,1342.10786739238,1344.5794161306285,1347.0509648688767,1349.5225136071251,1351.9940623453735,1354.465611083622,1356.9371598218704,1359.4087085601188,1361.880257298367,1364.3518060366155,1366.823354774864,1369.2949035131123,1371.7664522513608,1374.2380009896092,1376.7095497278574,1379.1810984661058,1381.6526472043543,1384.1241959426027,1386.595744680851,1389.0672934190995,1391.5388421573477,1394.0103908955962,1396.4819396338446,1398.953488372093,1401.4250371103415,1403.89658584859,1406.368134586838,1408.8396833250865,1411.311232063335,1413.7827808015834,1416.2543295398318,1418.7258782780802,1421.1974270163284,1423.6689757545769,1426.1405244928253,1428.6120732310737,1431.0836219693222,1433.5551707075706,1436.0267194458188,1438.4982681840672,1440.9698169223157,1443.441365660564,1445.9129143988125,1448.384463137061,1450.8560118753092,1453.3275606135576,1455.799109351806,1458.2706580900544,1460.7422068283029,1463.2137555665513,1465.6853043047995,1468.156853043048,1470.6284017812964,1473.0999505195448,1475.5714992577932,1478.0430479960417,1480.5145967342899,1482.9861454725383,1485.4576942107867,1487.9292429490351,1490.4007916872836,1492.872340425532,1495.3438891637802,1497.8154379020286,1500.286986640277,1502.7585353785255,1505.230084116774,1507.7016328550224,1510.1731815932706,1512.644730331519,1515.1162790697674,1517.5878278080158,1520.0593765462643,1522.5309252845127,1525.002474022761,1527.4740227610093,1529.9455714992578,1532.4171202375062,1534.8886689757546,1537.360217714003,1539.8317664522513,1542.3033151904997,1544.7748639287481,1547.2464126669965,1549.717961405245,1552.1895101434934,1554.6610588817416,1557.13260761999,1559.6041563582385,1562.075705096487,1564.5472538347353,1567.0188025729838,1569.490351311232,1571.9619000494804,1574.4334487877288,1576.9049975259773,1579.3765462642257,1581.848095002474,1584.3196437407223,1586.7911924789707,1589.2627412172192,1591.7342899554676,1594.205838693716,1596.6773874319645,1599.1489361702127,1601.620484908461,1604.0920336467095,1606.563582384958,1609.0351311232064,1611.5066798614548,1613.978228599703,1616.4497773379514,1618.9213260761999,1621.3928748144483,1623.8644235526967,1626.3359722909452,1628.8075210291934,1631.2790697674418,1633.7506185056902,1636.2221672439387,1638.693715982187,1641.1652647204355,1643.6368134586837,1646.1083621969321,1648.5799109351806,1651.051459673429,1653.5230084116774,1655.9945571499259,1658.466105888174,1660.9376546264225,1663.409203364671,1665.8807521029194,1668.3523008411678,1670.8238495794162,1673.2953983176644,1675.7669470559129,1678.2384957941613,1680.7100445324097,1683.1815932706581,1685.6531420089066,1688.1246907471548,1690.5962394854032,1693.0677882236516,1695.5393369619,1698.0108857001485,1700.482434438397,1702.9539831766451,1705.4255319148936,1707.897080653142,1710.3686293913904,1712.8401781296388,1715.3117268678873,1717.7832756061355,1720.254824344384,1722.7263730826323,1725.1979218208808,1727.6694705591292,1730.1410192973776,1732.6125680356258,1735.0841167738743,1737.5556655121227,1740.0272142503711,1742.4987629886195,1744.970311726868,1747.4418604651162,1749.9134092033646,1752.384957941613,1754.8565066798615,1757.32805541811,1759.7996041563583,1762.2711528946065,1764.742701632855,1767.2142503711034,1769.6857991093518,1772.1573478476002,1774.6288965858487,1777.1004453240969,1779.5719940623453,1782.0435428005937,1784.5150915388422,1786.9866402770906,1789.458189015339,1791.9297377535872,1794.4012864918357,1796.872835230084,1799.3443839683325,1801.815932706581,1804.2874814448294,1806.7590301830776,1809.230578921326,1811.7021276595744,1814.1736763978229,1816.6452251360713,1819.1167738743197,1821.588322612568,1824.0598713508164,1826.5314200890648,1829.0029688273132,1831.4745175655617,1833.94606630381,1836.4176150420583,1838.8891637803067,1841.3607125185551,1843.8322612568036,1846.303809995052,1848.7753587333004,1851.2469074715486,1853.718456209797,1856.1900049480455,1858.661553686294,1861.1331024245424,1863.6046511627908,1866.076199901039,1868.5477486392874,1871.0192973775358,1873.4908461157843,1875.9623948540327,1878.4339435922811,1880.9054923305293,1883.3770410687778,1885.8485898070262,1888.3201385452746,1890.791687283523,1893.2632360217715,1895.7347847600197,1898.2063334982681,1900.6778822365166,1903.149430974765,1905.6209797130134,1908.0925284512618,1910.56407718951,1913.0356259277585,1915.507174666007,1917.9787234042553,1920.4502721425038,1922.9218208807522,1925.3933696190004,1927.8649183572488,1930.3364670954973,1932.8080158337457,1935.2795645719941,1937.7511133102425,1940.2226620484907,1942.6942107867392,1945.1657595249876,1947.637308263236,1950.1088570014845,1952.580405739733,1955.051954477981,1957.5235032162295,1959.995051954478,1962.4666006927264,1964.9381494309748,1967.4096981692232,1969.8812469074714,1972.3527956457199,1974.8243443839683,1977.2958931222167,1979.7674418604652,1982.2389905987136,1984.7105393369618,1987.1820880752102,1989.6536368134587,1992.125185551707,1994.5967342899555,1997.068283028204,1999.5398317664522,2002.0113805047006,2004.482929242949,2006.9544779811974,2009.4260267194459,2011.8975754576943,2014.3691241959425,2016.840672934191,2019.3122216724394,2021.7837704106878,2024.2553191489362,2026.7268678871847,2029.1984166254329,2031.6699653636813,2034.1415141019297,2036.6130628401781,2039.0846115784266,2041.556160316675,2044.0277090549232,2046.4992577931716,2048.9708065314203,2051.4423552696685,2053.9139040079167,2056.3854527461654,2058.8570014844136,2061.328550222662,2063.8000989609104,2066.2716476991586,2068.7431964374073,2071.2147451756555,2073.686293913904,2076.1578426521523,2078.629391390401,2081.100940128649,2083.5724888668974,2086.044037605146,2088.5155863433943,2090.987135081643,2093.458683819891,2095.9302325581393,2098.401781296388,2100.873330034636,2103.344878772885,2105.816427511133,2108.2879762493817,2110.75952498763,2113.231073725878,2115.7026224641268,2118.174171202375,2120.6457199406236,2123.117268678872,2125.58881741712,2128.0603661553687,2130.531914893617,2133.0034636318655,2135.4750123701137,2137.9465611083624,2140.4181098466106,2142.889658584859,2145.3612073231075,2147.8327560613557,2150.3043047996043,2152.7758535378525,2155.2474022761007,2157.7189510143494,2160.1904997525976,2162.6620484908462,2165.1335972290944,2167.605145967343,2170.0766947055913,2172.5482434438395,2175.019792182088,2177.4913409203364,2179.962889658585,2182.4344383968332,2184.9059871350814,2187.37753587333,2189.8490846115783,2192.320633349827,2194.792182088075,2197.263730826324,2199.735279564572,2202.20682830282,2204.678377041069,2207.149925779317,2209.6214745175657,2212.093023255814,2214.564571994062,2217.036120732311,2219.507669470559,2221.9792182088077,2224.450766947056,2226.9223156853045,2229.3938644235527,2231.865413161801,2234.3369619000496,2236.808510638298,2239.2800593765464,2241.7516081147946,2244.223156853043,2246.6947055912915,2249.1662543295397,2251.6378030677884,2254.1093518060366,2256.580900544285,2259.0524492825334,2261.5239980207816,2263.9955467590303,2266.4670954972785,2268.938644235527,2271.4101929737753,2273.8817417120235,2276.353290450272,2278.8248391885204,2281.296387926769,2283.7679366650173,2286.239485403266,2288.711034141514,2291.1825828797623,2293.654131618011,2296.125680356259,2298.597229094508,2301.068777832756,2303.5403265710042,2306.011875309253,2308.483424047501,2310.9549727857498,2313.426521523998,2315.8980702622466,2318.369619000495,2320.841167738743,2323.3127164769917,2325.78426521524,2328.2558139534885,2330.7273626917367,2333.198911429985,2335.6704601682336,2338.142008906482,2340.6135576447305,2343.0851063829787,2345.5566551212273,2348.0282038594755,2350.4997525977237,2352.9713013359724,2355.4428500742206,2357.9143988124692,2360.3859475507174,2362.8574962889656,2365.3290450272143,2367.8005937654625,2370.272142503711,2372.7436912419594,2375.215239980208,2377.6867887184562,2380.1583374567044,2382.629886194953,2385.1014349332013,2387.57298367145,2390.044532409698,2392.5160811479464,2394.987629886195,2397.459178624443,2399.930727362692,2402.40227610094,2404.8738248391887,2407.345373577437,2409.816922315685,2412.288471053934,2414.760019792182,2417.2315685304306,2419.703117268679,2422.174666006927,2424.6462147451757,2427.117763483424,2429.5893122216726,2432.060860959921,2434.5324096981694,2437.0039584364176,2439.475507174666,2441.9470559129145,2444.4186046511627,2446.8901533894114,2449.3617021276596,2451.8332508659078,2454.3047996041564,2456.7763483424046,2459.2478970806533,2461.7194458189015,2464.19099455715,2466.6625432953983,2469.1340920336465,2471.605640771895,2474.0771895101434,2476.548738248392,2479.0202869866403,2481.4918357248885,2483.963384463137,2486.4349332013853,2488.906481939634,2491.378030677882,2493.849579416131,2496.321128154379,2498.7926768926272,2501.264225630876,2503.735774369124,2506.2073231073728,2508.678871845621,2511.150420583869,2513.621969322118,2516.093518060366,2518.5650667986147,2521.036615536863,2523.5081642751115,2525.9797130133597,2528.451261751608,2530.9228104898566,2533.394359228105,2535.8659079663535,2538.3374567046017,2540.80900544285,2543.2805541810985,2545.7521029193467,2548.2236516575954,2550.6952003958436,2553.1667491340922,2555.6382978723404,2558.1098466105886,2560.5813953488373,2563.0529440870855,2565.524492825334,2567.9960415635824,2570.4675903018306,2572.939139040079,2575.4106877783274,2577.882236516576,2580.3537852548243,2582.825333993073,2585.296882731321,2587.7684314695694,2590.239980207818,2592.711528946066,2595.183077684315,2597.654626422563,2600.1261751608113,2602.59772389906,2605.069272637308,2607.540821375557,2610.012370113805,2612.4839188520536,2614.955467590302,2617.42701632855,2619.8985650667987,2622.370113805047,2624.8416625432956,2627.3132112815438,2629.784760019792,2632.2563087580406,2634.727857496289,2637.1994062345375,2639.6709549727857,2642.1425037110344,2644.6140524492826,2647.0856011875308,2649.5571499257794,2652.0286986640276,2654.5002474022763,2656.9717961405245,2659.4433448787727,2661.9148936170213,2664.3864423552695,2666.857991093518,2669.3295398317664,2671.801088570015,2674.2726373082633,2676.7441860465115,2679.21573478476,2681.6872835230083,2684.158832261257,2686.630380999505,2689.1019297377534,2691.573478476002,2694.0450272142502,2696.516575952499,2698.988124690747,2701.4596734289958,2703.931222167244,2706.402770905492,2708.874319643741,2711.345868381989,2713.8174171202377,2716.288965858486,2718.760514596734,2721.2320633349827,2723.703612073231,2726.1751608114796,2728.646709549728,2731.1182582879765,2733.5898070262247,2736.061355764473,2738.5329045027215,2741.0044532409697,2743.4760019792184,2745.9475507174666,2748.419099455715,2750.8906481939634,2753.3621969322116,2755.8337456704603,2758.3052944087085,2760.776843146957,2763.2483918852054,2765.7199406234536,2768.191489361702,2770.6630380999504,2773.134586838199,2775.6061355764473,2778.0776843146955,2780.549233052944,2783.0207817911923,2785.492330529441,2787.963879267689,2790.435428005938,2792.906976744186,2795.3785254824343,2797.850074220683,2800.321622958931,2802.79317169718,2805.264720435428,2807.736269173676,2810.207817911925,2812.679366650173,2815.1509153884217,2817.62246412667,2820.0940128649186,2822.5655616031668,2825.037110341415,2827.5086590796636,2829.980207817912,2832.4517565561605,2834.9233052944087,2837.394854032657,2839.8664027709056,2842.3379515091538,2844.8095002474024,2847.2810489856506,2849.7525977238993,2852.2241464621475,2854.6956952003957,2857.1672439386443,2859.6387926768925,2862.110341415141,2864.5818901533894,2867.0534388916376,2869.5249876298863,2871.9965363681345,2874.468085106383,2876.9396338446313,2879.41118258288,2881.882731321128,2884.3542800593764,2886.825828797625,2889.2973775358732,2891.768926274122,2894.24047501237,2896.7120237506183,2899.183572488867,2901.655121227115,2904.126669965364,2906.598218703612,2909.0697674418607,2911.541316180109,2914.012864918357,2916.4844136566057,2918.955962394854,2921.4275111331026,2923.899059871351,2926.370608609599,2928.8421573478477,2931.313706086096,2933.7852548243445,2936.2568035625927,2938.7283523008414,2941.1999010390896,2943.671449777338,2946.1429985155864,2948.6145472538346,2951.0860959920833,2953.5576447303315,2956.0291934685797,2958.5007422068284,2960.9722909450766,2963.443839683325,2965.9153884215734,2968.386937159822,2970.8584858980703,2973.3300346363185,2975.801583374567,2978.2731321128153,2980.744680851064,2983.216229589312,2985.6877783275604,2988.159327065809,2990.6308758040573,2993.102424542306,2995.573973280554,2998.045522018803,3000.517070757051,3002.988619495299,3005.460168233548,3007.931716971796,3010.4032657100447,3012.874814448293,3015.346363186541,3017.8179119247898,3020.289460663038,3022.7610094012866,3025.232558139535,3027.7041068777835,3030.1756556160317,3032.64720435428,3035.1187530925286,3037.5903018307768,3040.0618505690254,3042.5333993072736,3045.004948045522,3047.4764967837705,3049.9480455220187,3052.4195942602673,3054.8911429985155,3057.362691736764,3059.8342404750124,3062.3057892132606,3064.7773379515093,3067.2488866897575,3069.720435428006,3072.1919841662543,3074.6635329045025,3077.135081642751,3079.6066303809994,3082.078179119248,3084.5497278574962,3087.021276595745,3089.492825333993,3091.9643740722413,3094.43592281049,3096.907471548738,3099.379020286987,3101.850569025235,3104.322117763483,3106.793666501732,3109.26521523998,3111.7367639782287,3114.208312716477,3116.6798614547256,3119.151410192974,3121.622958931222,3124.0945076694707,3126.566056407719,3129.0376051459675,3131.5091538842157,3133.980702622464,3136.4522513607126,3138.923800098961,3141.3953488372094,3143.8668975754576,3146.3384463137063,3148.8099950519545,3151.2815437902027,3153.7530925284514,3156.2246412666996,3158.696190004948,3161.1677387431964,3163.6392874814446,3166.1108362196933,3168.5823849579415,3171.05393369619,3173.5254824344383,3175.997031172687,3178.468579910935,3180.9401286491834,3183.411677387432,3185.8832261256803,3188.354774863929,3190.826323602177,3193.2978723404253,3195.769421078674,3198.240969816922,3200.712518555171,3203.184067293419,3205.6556160316677,3208.127164769916,3210.598713508164,3213.0702622464128,3215.541810984661,3218.0133597229096,3220.484908461158,3222.956457199406,3225.4280059376547,3227.899554675903,3230.3711034141515,3232.8426521523998,3235.3142008906484,3237.7857496288966,3240.257298367145,3242.7288471053935,3245.2003958436417,3247.6719445818903,3250.1434933201385,3252.6150420583867,3255.0865907966354,3257.5581395348836,3260.0296882731323,3262.5012370113805,3264.972785749629,3267.4443344878773,3269.9158832261255,3272.387431964374,3274.8589807026224,3277.330529440871,3279.8020781791192,3282.2736269173674,3284.745175655616,3287.2167243938643,3289.688273132113,3292.159821870361,3294.63137060861,3297.102919346858,3299.574468085106,3302.046016823355,3304.517565561603,3306.9891142998517,3309.4606630381,3311.932211776348,3314.403760514597,3316.875309252845,3319.3468579910937,3321.818406729342,3324.2899554675905,3326.7615042058387,3329.233052944087,3331.7046016823356,3334.176150420584,3336.6476991588324,3339.1192478970806,3341.590796635329,3344.0623453735775,3346.5338941118257,3349.0054428500744,3351.4769915883226,3353.948540326571,3356.4200890648194,3358.8916378030676,3361.3631865413163,3363.8347352795645,3366.306284017813,3368.7778327560613,3371.2493814943095,3373.720930232558,3376.1924789708064,3378.664027709055,3381.1355764473033,3383.607125185552,3386.0786739238,3388.5502226620483,3391.021771400297,3393.493320138545,3395.964868876794,3398.436417615042,3400.9079663532902,3403.379515091539,3405.851063829787,3408.3226125680358,3410.794161306284,3413.2657100445326,3415.737258782781,3418.208807521029,3420.6803562592777,3423.151904997526,3425.6234537357745,3428.0950024740227,3430.566551212271,3433.0380999505196,3435.509648688768,3437.9811974270165,3440.4527461652647,3442.9242949035133,3445.3958436417615,3447.8673923800097,3450.3389411182584,3452.8104898565066,3455.2820385947552,3457.7535873330035,3460.2251360712517,3462.6966848095003,3465.1682335477485,3467.639782285997,3470.1113310242454,3472.582879762494,3475.0544285007422,3477.5259772389904,3479.997525977239,3482.4690747154873,3484.940623453736,3487.412172191984,3489.8837209302324,3492.355269668481,3494.826818406729,3497.298367144978,3499.769915883226,3502.2414646214747,3504.713013359723,3507.184562097971,3509.65611083622,3512.127659574468,3514.5992083127167,3517.070757050965,3519.542305789213,3522.0138545274617,3524.48540326571,3526.9569520039586,3529.428500742207,3531.9000494804554,3534.3715982187036,3536.843146956952,3539.3146956952005,3541.7862444334487,3544.2577931716974,3546.7293419099456,3549.2008906481938,3551.6724393864424,3554.1439881246906,3556.6155368629393,3559.0870856011875,3561.558634339436,3564.0301830776843,3566.5017318159325,3568.973280554181,3571.4448292924294,3573.916378030678,3576.3879267689263,3578.8594755071745,3581.331024245423,3583.8025729836713,3586.27412172192,3588.745670460168,3591.217219198417,3593.688767936665,3596.1603166749132,3598.631865413162,3601.10341415141,3603.5749628896588,3606.046511627907,3608.518060366155,3610.989609104404,3613.461157842652,3615.9327065809007,3618.404255319149,3620.8758040573975,3623.3473527956457,3625.818901533894,3628.2904502721426,3630.761999010391,3633.2335477486395,3635.7050964868877,3638.176645225136,3640.6481939633845,3643.1197427016327,3645.5912914398814,3648.0628401781296,3650.5343889163782,3653.0059376546265,3655.4774863928747,3657.9490351311233,3660.4205838693715,3662.89213260762,3665.3636813458684,3667.8352300841166,3670.3067788223652,3672.7783275606134,3675.249876298862,3677.7214250371103,3680.192973775359,3682.664522513607,3685.1360712518554,3687.607619990104,3690.079168728352,3692.550717466601,3695.022266204849,3697.4938149430973,3699.965363681346,3702.436912419594,3704.908461157843,3707.380009896091,3709.8515586343397,3712.323107372588,3714.794656110836,3717.2662048490847,3719.737753587333,3722.2093023255816,3724.68085106383,3727.152399802078,3729.6239485403266,3732.095497278575,3734.5670460168235,3737.0385947550717,3739.5101434933204,3741.9816922315686,3744.4532409698168,3746.9247897080654,3749.3963384463136,3751.8678871845623,3754.3394359228105,3756.8109846610587,3759.2825333993073,3761.7540821375555,3764.225630875804,3766.6971796140524,3769.168728352301,3771.6402770905493,3774.1118258287975,3776.583374567046,3779.0549233052943,3781.526472043543,3783.998020781791,3786.4695695200394,3788.941118258288,3791.4126669965362,3793.884215734785,3796.355764473033,3798.8273132112818,3801.29886194953,3803.770410687778,3806.241959426027,3808.713508164275,3811.1850569025237,3813.656605640772,3816.12815437902,3818.5997031172687,3821.071251855517,3823.5428005937656,3826.014349332014,3828.4858980702625,3830.9574468085107,3833.428995546759,3835.9005442850075,3838.3720930232557,3840.8436417615044,3843.3151904997526,3845.786739238001,3848.2582879762494,3850.7298367144977,3853.2013854527463,3855.6729341909945,3858.144482929243,3860.6160316674914,3863.0875804057396,3865.5591291439882,3868.0306778822364,3870.502226620485,3872.9737753587333,3875.4453240969815,3877.91687283523,3880.3884215734784,3882.859970311727,3885.331519049975,3887.803067788224,3890.274616526472,3892.7461652647203,3895.217714002969,3897.689262741217,3900.160811479466,3902.632360217714,3905.103908955962,3907.575457694211,3910.047006432459,3912.5185551707077,3914.990103908956,3917.4616526472046,3919.933201385453,3922.404750123701,3924.8762988619496,3927.347847600198,3929.8193963384465,3932.2909450766947,3934.762493814943,3937.2340425531916,3939.7055912914398,3942.1771400296884,3944.6486887679366,3947.1202375061853,3949.5917862444335,3952.0633349826817,3954.5348837209303,3957.0064324591785,3959.477981197427,3961.9495299356754,3964.4210786739236,3966.8926274121723,3969.3641761504205,3971.835724888669,3974.3072736269173,3976.778822365166,3979.250371103414,3981.7219198416624,3984.193468579911,3986.6650173181592,3989.136566056408,3991.608114794656,3994.0796635329043,3996.551212271153,3999.022761009401,4001.49430974765,4003.965858485898,4006.4374072241467,4008.908955962395,4011.380504700643,4013.8520534388917,4016.32360217714,4018.7951509153886,4021.266699653637,4023.738248391885,4026.2097971301337,4028.681345868382,4031.1528946066305,4033.6244433448787,4036.0959920831274,4038.5675408213756,4041.039089559624,4043.5106382978724,4045.9821870361206,4048.4537357743693,4050.9252845126175,4053.3968332508657,4055.8683819891144,4058.3399307273626,4060.8114794656112,4063.2830282038594,4065.754576942108,4068.2261256803563,4070.6976744186045,4073.169223156853,4075.6407718951014,4078.11232063335,4080.583869371598,4083.0554181098464,4085.526966848095,4087.9985155863433,4090.470064324592,4092.94161306284,4095.413161801089,4097.884710539337,4100.356259277585,4102.827808015833,4105.2993567540825,4107.770905492331,4110.242454230579,4112.714002968827,4115.185551707075,4117.657100445324,4120.128649183573,4122.600197921821,4125.071746660069,4127.543295398317,4130.014844136566,4132.486392874815,4134.957941613063,4137.429490351311,4139.90103908956,4142.372587827808,4144.8441365660565,4147.315685304305,4149.787234042553,4152.258782780802,4154.73033151905,4157.201880257298,4159.673428995547,4162.144977733795,4164.616526472044,4167.088075210292,4169.55962394854,4172.0311726867885,4174.502721425037,4176.974270163286,4179.445818901534,4181.917367639782,4184.38891637803,4186.860465116279,4189.332013854528,4191.803562592776,4194.275111331024,4196.746660069272,4199.2182088075215,4201.68975754577,4204.161306284018,4206.632855022266,4209.104403760514,4211.575952498763,4214.047501237012,4216.51904997526,4218.990598713508,4221.462147451756,4223.933696190005,4226.4052449282535,4228.876793666502,4231.34834240475,4233.819891142998,4236.291439881247,4238.762988619495,4241.234537357744,4243.706086095992,4246.17763483424,4248.649183572489,4251.120732310737,4253.592281048986,4256.063829787234,4258.535378525483,4261.006927263731,4263.478476001979,4265.9500247402275,4268.421573478476,4270.893122216725,4273.364670954973,4275.836219693221,4278.307768431469,4280.779317169718,4283.250865907967,4285.722414646215,4288.193963384463,4290.665512122711,4293.1370608609595,4295.608609599209,4298.080158337457,4300.551707075705,4303.023255813953,4305.4948045522015,4307.966353290451,4310.437902028699,4312.909450766947,4315.380999505195,4317.852548243444,4320.3240969816925,4322.795645719941,4325.267194458189,4327.738743196437,4330.210291934686,4332.681840672934,4335.153389411183,4337.624938149431,4340.096486887679,4342.568035625928,4345.039584364176,4347.5111331024245,4349.982681840673,4352.454230578921,4354.92577931717,4357.397328055418,4359.8688767936665,4362.340425531915,4364.811974270163,4367.283523008412,4369.75507174666,4372.226620484908,4374.698169223157,4377.169717961406,4379.641266699654,4382.112815437902,4384.58436417615,4387.0559129143985,4389.527461652648,4391.999010390896,4394.470559129144,4396.942107867392,4399.41365660564,4401.8852053438895,4404.356754082138,4406.828302820386,4409.299851558634,4411.771400296882,4414.2429490351315,4416.71449777338,4419.186046511628,4421.657595249876,4424.129143988124,4426.600692726373,4429.072241464622,4431.54379020287,4434.015338941118,4436.486887679367,4438.958436417615,4441.4299851558635,4443.901533894112,4446.37308263236,4448.844631370609,4451.316180108857,4453.787728847105,4456.259277585354,4458.730826323602,4461.202375061851,4463.673923800099,4466.145472538347,4468.617021276596,4471.088570014844,4473.560118753093,4476.031667491341,4478.503216229589,4480.9747649678375,4483.446313706086,4485.917862444335,4488.389411182583,4490.860959920831,4493.332508659079,4495.8040573973285,4498.275606135577,4500.747154873825,4503.218703612073,4505.690252350321,4508.16180108857,4510.633349826819,4513.104898565067,4515.576447303315,4518.047996041563,4520.519544779812,4522.991093518061,4525.462642256309,4527.934190994557,4530.405739732805,4532.877288471054,4535.3488372093025,4537.820385947551,4540.291934685799,4542.763483424047,4545.235032162296,4547.706580900544,4550.178129638793,4552.649678377041,4555.12122711529,4557.592775853538,4560.064324591786,4562.5358733300345,4565.007422068283,4567.478970806532,4569.95051954478,4572.422068283028,4574.893617021276,4577.365165759525,4579.836714497774,4582.308263236022,4584.77981197427,4587.251360712518,4589.722909450767,4592.194458189016,4594.666006927264,4597.137555665512,4599.60910440376,4602.0806531420085,4604.552201880258,4607.023750618506,4609.495299356754,4611.966848095002,4614.438396833251,4616.9099455714995,4619.381494309748,4621.853043047996,4624.324591786244,4626.796140524493,4629.267689262741,4631.73923800099,4634.210786739238,4636.682335477486,4639.153884215735,4641.625432953983,4644.096981692232,4646.56853043048,4649.040079168728,4651.511627906977,4653.983176645225,4656.4547253834735,4658.926274121722,4661.39782285997,4663.869371598219,4666.340920336467,4668.812469074715,4671.284017812964,4673.755566551213,4676.227115289461,4678.698664027709,4681.170212765957,4683.6417615042055,4686.113310242455,4688.584858980703,4691.056407718951,4693.527956457199,4695.9995051954475,4698.471053933697,4700.942602671945,4703.414151410193,4705.885700148441,4708.357248886689,4710.8287976249385,4713.300346363187,4715.771895101435,4718.243443839683,4720.714992577931,4723.18654131618,4725.658090054429,4728.129638792677,4730.601187530925,4733.072736269174,4735.544285007422,4738.0158337456705,4740.487382483919,4742.958931222167,4745.430479960416,4747.902028698664,4750.3735774369125,4752.845126175161,4755.316674913409,4757.788223651658,4760.259772389906,4762.731321128154,4765.202869866403,4767.674418604651,4770.1459673429,4772.617516081148,4775.089064819396,4777.5606135576445,4780.032162295893,4782.503711034142,4784.97525977239,4787.446808510638,4789.918357248886,4792.3899059871355,4794.861454725384,4797.333003463632,4799.80455220188,4802.276100940128,4804.7476496783775,4807.219198416626,4809.690747154874,4812.162295893122,4814.63384463137,4817.105393369619,4819.576942107868,4822.048490846116,4824.520039584364,4826.991588322612,4829.463137060861,4831.9346857991095,4834.406234537358,4836.877783275606,4839.349332013854,4841.820880752103,4844.292429490351,4846.7639782286,4849.235526966848,4851.707075705097,4854.178624443345,4856.650173181593,4859.121721919842,4861.59327065809,4864.064819396339,4866.536368134587,4869.007916872835,4871.4794656110835,4873.951014349332,4876.422563087581,4878.894111825829,4881.365660564077,4883.837209302325,4886.308758040574,4888.780306778823,4891.251855517071,4893.723404255319,4896.194952993567,4898.6665017318155,4901.138050470065,4903.609599208313,4906.081147946561,4908.552696684809,4911.024245423058,4913.495794161307,4915.967342899555,4918.438891637803,4920.910440376051,4923.3819891143,4925.8535378525485,4928.325086590797,4930.796635329045,4933.268184067293,4935.739732805542,4938.21128154379,4940.682830282039,4943.154379020287,4945.625927758535,4948.097476496784,4950.569025235032,4953.0405739732805,4955.512122711529,4957.983671449777,4960.455220188026,4962.926768926274,4965.398317664522,4967.869866402771,4970.34141514102,4972.812963879268,4975.284512617516,4977.756061355764,4980.227610094013,4982.699158832262,4985.17070757051,4987.642256308758,4990.113805047006,4992.5853537852545,4995.056902523504,4997.528451261752,5000.0]}

},{}],95:[function(require,module,exports){
module.exports={"expected":[-1.0e200,-1.0004950494999975e200,-1.0009905893907777e200,-1.0014866204013655e200,-1.0019831432622314e200,-1.0024801587052957e200,-1.0029776674639312e200,-1.0034756702729675e200,-1.0039741678686945e200,-1.0044731609888655e200,-1.0049726503727015e200,-1.0054726367608944e200,-1.0059731208956114e200,-1.0064741035204972e200,-1.0069755853806794e200,-1.0074775672227709e200,-1.0079800497948744e200,-1.0084830338465858e200,-1.0089865201289977e200,-1.0094905093947038e200,-1.0099950023978016e200,-1.0104999998938975e200,-1.0110055026401096e200,-1.0115115113950714e200,-1.0120180269189362e200,-1.0125250499733812e200,-1.0130325813216097e200,-1.0135406217283571e200,-1.0140491719598928e200,-1.0145582327840252e200,-1.0150678049701053e200,-1.0155778892890305e200,-1.0160884865132487e200,-1.0165995974167617e200,-1.0171112227751294e200,-1.0176233633654742e200,-1.0181360199664842e200,-1.0186491933584172e200,-1.0191628843231055e200,-1.0196770936439586e200,-1.0201918221059682e200,-1.0207070704957122e200,-1.0212228396013575e200,-1.0217391302126655e200,-1.0222559431209951e200,-1.0227732791193077e200,-1.0232911390021703e200,-1.0238095235657597e200,-1.0243284336078674e200,-1.0248478699279028e200,-1.025367833326898e200,-1.0258883246075112e200,-1.0264093445740311e200,-1.0269308940323814e200,-1.0274529737901247e200,-1.0279755846564667e200,-1.02849872744226e200,-1.0290224029600088e200,-1.029546612023873e200,-1.0300713554496727e200,-1.0305966340548914e200,-1.0311224486586813e200,-1.0316488000818672e200,-1.0321756891469506e200,-1.0327031166781144e200,-1.033231083501227e200,-1.0337595904438458e200,-1.0342886383352234e200,-1.03481822800631e200,-1.035348360289759e200,-1.0358790360199308e200,-1.0364102560328969e200,-1.0369420211664452e200,-1.037474332260084e200,-1.0380071901550461e200,-1.0385405956942933e200,-1.039074549722521e200,-1.0396090530861631e200,-1.0401441066333955e200,-1.0406797112141418e200,-1.0412158676800759e200,-1.0417525768846292e200,-1.0422898396829924e200,-1.0428276569321223e200,-1.0433660294907448e200,-1.0439049582193599e200,-1.0444444439802469e200,-1.0449844876374681e200,-1.0455250900568742e200,-1.0460662521061082e200,-1.0466079746546105e200,-1.0471502585736235e200,-1.0476931047361962e200,-1.0482365140171887e200,-1.0487804872932779e200,-1.0493250254429602e200,-1.0498701293465582e200,-1.0504157998862248e200,-1.0509620379459476e200,-1.0515088444115539e200,-1.0520562201707152e200,-1.052604166112953e200,-1.0531526831296426e200,-1.0537017721140183e200,-1.0542514339611781e200,-1.054801669568089e200,-1.0553524798335907e200,-1.0559038656584028e200,-1.056455827945127e200,-1.0570083675982536e200,-1.0575614855241667e200,-1.0581151826311477e200,-1.0586694598293819e200,-1.0592243180309625e200,-1.0597797581498958e200,-1.0603357811021059e200,-1.0608923878054409e200,-1.0614495791796765e200,-1.0620073561465221e200,-1.062565719629625e200,-1.0631246705545767e200,-1.0636842098489168e200,-1.0642443384421391e200,-1.0648050572656954e200,-1.0653663672530024e200,-1.065928269339446e200,-1.066490764462386e200,-1.0670538535611626e200,-1.0676175375770996e200,-1.0681818174535124e200,-1.0687466941357109e200,-1.0693121685710057e200,-1.069878241708714e200,-1.0704449145001634e200,-1.0710121878986983e200,-1.0715800628596855e200,-1.0721485403405188e200,-1.0727176213006248e200,-1.0732873067014677e200,-1.0738575975065558e200,-1.0744284946814461e200,-1.0749999991937501e200,-1.0755721120131387e200,-1.0761448341113488e200,-1.0767181664621875e200,-1.0772921100415386e200,-1.0778666658273679e200,-1.0784418347997281e200,-1.0790176179407656e200,-1.0795940162347248e200,-1.0801710306679547e200,-1.0807486622289143e200,-1.0813269119081772e200,-1.0819057806984391e200,-1.082485269594522e200,-1.0830653795933808e200,-1.0836461116941084e200,-1.0842274668979414e200,-1.0848094462082667e200,-1.0853920506306265e200,-1.0859752811727242e200,-1.08655913884443e200,-1.0871436246577877e200,-1.0877287396270194e200,-1.0883144847685322e200,-1.0889008611009233e200,-1.0894878696449866e200,-1.0900755114237184e200,-1.0906637874623232e200,-1.0912526987882196e200,-1.0918422464310472e200,-1.0924324314226706e200,-1.0930232547971877e200,-1.0936147175909342e200,-1.0942068208424905e200,-1.0947995655926874e200,-1.0953929528846116e200,-1.0959869837636133e200,-1.0965816592773113e200,-1.097176980475599e200,-1.0977729484106512e200,-1.09836956413693e200,-1.0989668287111911e200,-1.09956474319249e200,-1.1001633086421883e200,-1.1007625261239594e200,-1.1013623967037962e200,-1.101962921450016e200,-1.1025641014332675e200,-1.1031659377265374e200,-1.1037684314051558e200,-1.1043715835468034e200,-1.1049753952315185e200,-1.1055798675417017e200,-1.1061850015621244e200,-1.1067907983799333e200,-1.1073972590846583e200,-1.108004384768219e200,-1.1086121765249303e200,-1.1092206354515098e200,-1.1098297626470843e200,-1.110439559213196e200,-1.1110500262538092e200,-1.111661164875318e200,-1.112272976186551e200,-1.1128854612987801e200,-1.1134986213257261e200,-1.114112457383565e200,-1.1147269705909367e200,-1.1153421620689486e200,-1.1159580329411862e200,-1.1165745843337169e200,-1.1171918173750985e200,-1.1178097331963857e200,-1.1184283329311364e200,-1.1190476177154196e200,-1.1196675886878215e200,-1.1202882469894537e200,-1.1209095937639586e200,-1.1215316301575171e200,-1.1221543573188564e200,-1.122777776399256e200,-1.123401888552556e200,-1.1240266949351616e200,-1.1246521967060541e200,-1.125278395026795e200,-1.1259052910615343e200,-1.126532885977018e200,-1.1271611809425948e200,-1.1277901771302235e200,-1.1284198757144803e200,-1.1290502778725663e200,-1.129681384784315e200,-1.1303131976321982e200,-1.1309457176013358e200,-1.1315789458795014e200,-1.1322128836571303e200,-1.132847532127327e200,-1.1334828924858726e200,-1.1341189659312322e200,-1.1347557536645627e200,-1.1353932568897205e200,-1.1360314768132681e200,-1.1366704146444831e200,-1.1373100715953648e200,-1.1379504488806426e200,-1.1385915477177831e200,-1.1392333693269975e200,-1.1398759149312509e200,-1.1405191857562682e200,-1.1411631830305431e200,-1.141807907985346e200,-1.1424533618547301e200,-1.143099545875542e200,-1.1437464612874273e200,-1.1443941093328397e200,-1.145042491257049e200,-1.1456916083081477e200,-1.1463414617370613e200,-1.1469920527975542e200,-1.1476433827462392e200,-1.1482954528425847e200,-1.148948264348923e200,-1.1496018185304591e200,-1.1502561166552781e200,-1.150911159994354e200,-1.1515669498215566e200,-1.1522234874136622e200,-1.1528807740503592e200,-1.1535388110142583e200,-1.1541975995909004e200,-1.1548571410687642e200,-1.1555174367392754e200,-1.1561784878968151e200,-1.1568402958387278e200,-1.1575028618653306e200,-1.1581661872799206e200,-1.1588302733887845e200,-1.1594951215012068e200,-1.1601607329294784e200,-1.1608271089889054e200,-1.1614942509978168e200,-1.1621621602775749e200,-1.1628308381525827e200,-1.1635002859502933e200,-1.1641705050012179e200,-1.1648414966389356e200,-1.165513262200102e200,-1.1661858030244574e200,-1.1668591204548369e200,-1.1675332158371772e200,-1.1682080905205286e200,-1.1688837458570615e200,-1.1695601832020767e200,-1.170237403914014e200,-1.170915409354461e200,-1.171594200888163e200,-1.1722737798830319e200,-1.1729541477101546e200,-1.1736353057438041e200,-1.1743172553614458e200,-1.17499999794375e200,-1.175683534874599e200,-1.1763678675410975e200,-1.1770529973335812e200,-1.1777389256456272e200,-1.1784256538740628e200,-1.1791131834189747e200,-1.1798015156837196e200,-1.1804906520749322e200,-1.1811805940025367e200,-1.1818713428797545e200,-1.182562900123115e200,-1.1832552671524655e200,-1.1839484453909796e200,-1.1846424362651678e200,-1.185337241204888e200,-1.1860328616433542e200,-1.1867292990171468e200,-1.1874265547662217e200,-1.188124630333922e200,-1.1888235271669861e200,-1.1895232467155594e200,-1.1902237904332022e200,-1.1909251597769019e200,-1.1916273562070821e200,-1.1923303811876123e200,-1.1930342361858196e200,-1.1937389226724964e200,-1.1944444421219135e200,-1.1951507960118286e200,-1.195857985823497e200,-1.1965660130416821e200,-1.1972748791546652e200,-1.197984585654257e200,-1.1986951340358073e200,-1.199406525798216e200,-1.2001187624439429e200,-1.2008318454790187e200,-1.2015457764130557e200,-1.2022605567592587e200,-1.202976188034435e200,-1.2036926717590061e200,-1.2044100094570166e200,-1.2051282026561473e200,-1.2058472528877249e200,-1.206567161686733e200,-1.2072879305918226e200,-1.2080095611453239e200,-1.2087320548932566e200,-1.2094554133853416e200,-1.2101796381750118e200,-1.210904730819422e200,-1.2116306928794627e200,-1.2123575259197687e200,-1.2130852315087319e200,-1.2138138112185124e200,-1.2145432666250485e200,-1.21527359930807e200,-1.2160048108511087e200,-1.2167369028415093e200,-1.2174698768704422e200,-1.218203734532913e200,-1.2189384774277763e200,-1.2196741071577466e200,-1.2204106253294091e200,-1.2211480335532317e200,-1.2218863334435776e200,-1.2226255266187163e200,-1.2233656147008358e200,-1.2241065993160543e200,-1.2248484820944317e200,-1.2255912646699822e200,-1.226334948680686e200,-1.2270795357685017e200,-1.2278250275793781e200,-1.2285714257632654e200,-1.2293187319741293e200,-1.2300669478699615e200,-1.2308160751127935e200,-1.2315661153687075e200,-1.2323170703078488e200,-1.2330689416044397e200,-1.2338217309367904e200,-1.2345754399873124e200,-1.2353300704425302e200,-1.2360856239930946e200,-1.236842102333795e200,-1.2375995071635725e200,-1.238357840185532e200,-1.239117103106955e200,-1.2398772976393127e200,-1.2406384254982795e200,-1.2414004884037445e200,-1.2421634880798255e200,-1.2429274262548811e200,-1.2436923046615252e200,-1.2444581250366386e200,-1.2452248891213831e200,-1.2459925986612143e200,-1.2467612554058945e200,-1.247530861109507e200,-1.2483014175304684e200,-1.2490729264315426e200,-1.2498453895798545e200,-1.2506188087469022e200,-1.251393185708572e200,-1.2521685222451512e200,-1.2529448201413424e200,-1.2537220811862759e200,-1.254500307173525e200,-1.2552794999011187e200,-1.2560596611715562e200,-1.2568407927918208e200,-1.2576228965733922e200,-1.2584059743322636e200,-1.2591900278889529e200,-1.2599750590685186e200,-1.2607610697005732e200,-1.261548061619297e200,-1.2623360366634532e200,-1.2631249966764023e200,-1.2639149435061157e200,-1.2647058790051905e200,-1.2654978050308638e200,-1.2662907234450279e200,-1.2670846361142442e200,-1.2678795449097582e200,-1.2686754517075136e200,-1.269472358388168e200,-1.2702702668371073e200,-1.2710691789444602e200,-1.2718690966051137e200,-1.2726700217187272e200,-1.273471956189749e200,-1.2742749019274302e200,-1.2750788608458398e200,-1.2758838348638812e200,-1.2766898259053055e200,-1.2774968358987288e200,-1.2783048667776461e200,-1.2791139204804478e200,-1.2799239989504345e200,-1.2807351041358323e200,-1.28154723798981e200,-1.2823604024704924e200,-1.2831745995409788e200,-1.2839898311693556e200,-1.284806099328715e200,-1.2856234059971697e200,-1.286441753157869e200,-1.2872611427990143e200,-1.288081576913876e200,-1.2889030575008095e200,-1.2897255865632711e200,-1.2905491661098347e200,-1.2913737981542081e200,-1.2921994847152484e200,-1.2930262278169802e200,-1.2938540294886107e200,-1.2946828917645475e200,-1.295512816684414e200,-1.2963438062930671e200,-1.2971758626406134e200,-1.2980089877824265e200,-1.2988431837791639e200,-1.2996784526967836e200,-1.300514796606561e200,-1.3013522175851072e200,-1.302190717714385e200,-1.3030302990817265e200,-1.3038709637798503e200,-1.3047127139068793e200,-1.305555551566358e200,-1.3063994788672697e200,-1.307244497924055e200,-1.3080906108566271e200,-1.3089378197903929e200,-1.3097861268562685e200,-1.3106355341906976e200,-1.3114860439356699e200,-1.3123376582387377e200,-1.313190379253036e200,-1.3140442091372994e200,-1.3148991500558803e200,-1.3157552041787678e200,-1.3166123736816051e200,-1.3174706607457091e200,-1.3183300675580882e200,-1.319190596311461e200,-1.3200522492042744e200,-1.3209150284407236e200,-1.3217789362307702e200,-1.3226439747901605e200,-1.3235101463404453e200,-1.3243774531089986e200,-1.3252458973290363e200,-1.3261154812396366e200,-1.3269862070857574e200,-1.3278580771182577e200,-1.328731093593915e200,-1.3296052587754458e200,-1.3304805749315257e200,-1.3313570443368077e200,-1.3322346692719429e200,-1.3331134520235998e200,-1.3339933948844841e200,-1.3348745001533594e200,-1.3357567701350667e200,-1.3366402071405433e200,-1.3375248134868456e200,-1.3384105914971669e200,-1.3392975435008591e200,-1.3401856718334534e200,-1.3410749788366787e200,-1.3419654668584846e200,-1.3428571382530612e200,-1.3437499953808592e200,-1.3446440406086122e200,-1.3455392763093551e200,-1.346435704862448e200,-1.3473333286535955e200,-1.3482321500748686e200,-1.3491321715247255e200,-1.3500333954080329e200,-1.3509358241360875e200,-1.3518394601266384e200,-1.3527443058039073e200,-1.353650363598611e200,-1.3545576359479827e200,-1.3554661252957944e200,-1.3563758340923787e200,-1.3572867647946505e200,-1.3581989198661289e200,-1.3591123017769605e200,-1.3600269130039408e200,-1.3609427560305365e200,-1.361859833346909e200,-1.362778147449935e200,-1.3636977008432317e200,-1.3646184960371777e200,-1.3655405355489362e200,-1.3664638219024788e200,-1.3673883576286072e200,-1.368314145264977e200,-1.3692411873561216e200,-1.3701694864534741e200,-1.3710990451153924e200,-1.3720298659071801e200,-1.3729619514011134e200,-1.373895304176462e200,-1.3748299268195153e200,-1.375765821923603e200,-1.376702992089123e200,-1.3776414399235626e200,-1.3785811680415241e200,-1.3795221790647487e200,-1.38046447562214e200,-1.3814080603497901e200,-1.3823529358910035e200,-1.3832991048963209e200,-1.3842465700235459e200,-1.3851953339377671e200,-1.3861453993113865e200,-1.3870967688241415e200,-1.3880494451631323e200,-1.3890034310228459e200,-1.3899587291051816e200,-1.3909153421194775e200,-1.3918732727825352e200,-1.3928325238186456e200,-1.3937930979596149e200,-1.3947549979447906e200,-1.3957182265210874e200,-1.3966827864430137e200,-1.3976486804726973e200,-1.3986159113799118e200,-1.3995844819421036e200,-1.4005543949444183e200,-1.401525653179727e200,-1.402498259448654e200,-1.4034722165596018e200,-1.4044475273287807e200,-1.4054241945802343e200,-1.406402221145867e200,-1.407381609865472e200,-1.4083623635867572e200,-1.4093444851653751e200,-1.4103279774649487e200,-1.4113128433571e200,-1.4122990857214783e200,-1.4132867074457872e200,-1.4142757114258137e200,-1.4152661005654566e200,-1.4162578777767543e200,-1.4172510459799134e200,-1.4182456081033376e200,-1.4192415670836572e200,-1.4202389258657562e200,-1.4212376874028034e200,-1.4222378546562794e200,-1.4232394305960078e200,-1.4242424182001837e200,-1.425246820455403e200,-1.4262526403566932e200,-1.4272598809075408e200,-1.4282685451199241e200,-1.4292786360143413e200,-1.4302901566198413e200,-1.431303109974054e200,-1.43231749912322e200,-1.4333333271222222e200,-1.4343505970346162e200,-1.4353693119326608e200,-1.4363894748973482e200,-1.4374110890184367e200,-1.4384341573944808e200,-1.439458683132863e200,-1.4404846693498254e200,-1.4415121191704994e200,-1.4425410357289406e200,-1.4435714221681581e200,-1.4446032816401484e200,-1.4456366173059257e200,-1.446671432335555e200,-1.4477077299081854e200,-1.448745513212081e200,-1.4497847854446552e200,-1.4508255498125023e200,-1.4518678095314308e200,-1.4529115678264968e200,-1.4539568279320376e200,-1.4550035930917044e200,-1.4560518665584955e200,-1.4571016515947914e200,-1.4581529514723872e200,-1.459205769472528e200,-1.4602601088859417e200,-1.4613159730128736e200,-1.4623733651631218e200,-1.4634322886560704e200,-1.4644927468207256e200,-1.4655547429957496e200,-1.4666182805294954e200,-1.467683362780043e200,-1.4687499931152344e200,-1.4698181749127087e200,-1.4708879115599384e200,-1.471959206454264e200,-1.4730320630029314e200,-1.4741064846231275e200,-1.475182474742016e200,-1.4762600367967748e200,-1.4773391742346311e200,-1.4784198905128998e200,-1.4795021890990195e200,-1.4805860734705902e200,-1.4816715471154091e200,-1.4827586135315102e200,-1.4838472762272e200,-1.4849375387210964e200,-1.486029404542166e200,-1.487122877229762e200,-1.4882179603336635e200,-1.4893146574141125e200,-1.4904129720418536e200,-1.4915129077981729e200,-1.4926144682749348e200,-1.4937176570746239e200,-1.4948224778103827e200,-1.4959289341060518e200,-1.4970370295962086e200,-1.4981467679262075e200,-1.49925815275222e200,-1.5003711877412755e200,-1.5014858765713005e200,-1.5026022229311593e200,-1.503720230520695e200,-1.504839903050771e200,-1.5059612442433108e200,-1.5070842578313402e200,-1.5082089475590278e200,-1.5093353171817275e200,-1.5104633704660202e200,-1.5115931111897555e200,-1.5127245431420937e200,-1.513857670123548e200,-1.5149924959460281e200,-1.5161290244328824e200,-1.5172672594189403e200,-1.5184072047505564e200,-1.5195488642856522e200,-1.520692241893762e200,-1.5218373414560746e200,-1.5229841668654787e200,-1.5241327220266046e200,-1.525283010855872e200,-1.5264350372815315e200,-1.5275888052437113e200,-1.528744318694461e200,-1.5299015815977963e200,-1.5310605979297463e200,-1.532221371678397e200,-1.5333839068439387e200,-1.5345482074387096e200,-1.535714277487245e200,-1.5368821210263212e200,-1.5380517421050032e200,-1.5392231447846916e200,-1.540396333139169e200,-1.5415713112546482e200,-1.5427480832298177e200,-1.5439266531758917e200,-1.5451070252166568e200,-1.5462892034885194e200,-1.5474731921405563e200,-1.5486589953345605e200,-1.549846617245092e200,-1.551036062059525e200,-1.5522273339780995e200,-1.5534204372139684e200,-1.5546153759932486e200,-1.5558121545550702e200,-1.557010777151627e200,-1.5582112480482272e200,-1.5594135715233423e200,-1.5606177518686602e200,-1.5618237933891354e200,-1.563031700403039e200,-1.5642414772420123e200,-1.565453128251117e200,-1.566666657788889e200,-1.567882070227388e200,-1.569099369952253e200,-1.570318561362752e200,-1.571539648871838e200,-1.5727626369062e200,-1.5739875299063177e200,-1.5752143323265146e200,-1.5764430486350126e200,-1.577673683313985e200,-1.578906240859613e200,-1.580140725782139e200,-1.5813771426059218e200,-1.5826154958694916e200,-1.583855790125607e200,-1.585098029941309e200,-1.5863422198979778e200,-1.5875883645913897e200,-1.5888364686317726e200,-1.5900865366438637e200,-1.5913385732669663e200,-1.592592583155007e200,-1.5938485709765933e200,-1.5951065414150723e200,-1.5963664991685884e200,-1.5976284489501413e200,-1.598892395487646e200,-1.6001583435239905e200,-1.6014262978170955e200,-1.602696263139975e200,-1.603968244280795e200,-1.6052422460429344e200,-1.6065182732450442e200,-1.6077963307211107e200,-1.609076423320514e200,-1.6103585559080903e200,-1.6116427333641948e200,-1.6129289605847612e200,-1.614217242481365e200,-1.6155075839812883e200,-1.6167999900275775e200,-1.618094465579112e200,-1.619391015610663e200,-1.620689645112961e200,-1.6219903590927566e200,-1.6232931625728877e200,-1.6245980605923418e200,-1.6259050582063223e200,-1.627214160486314e200,-1.6285253725201467e200,-1.6298386994120643e200,-1.631154146282788e200,-1.632471718269585e200,-1.6337914205263343e200,-1.635113258223593e200,-1.6364372365486668e200,-1.6377633607056744e200,-1.6390916359156187e200,-1.6404220674164528e200,-1.6417546604631503e200,-1.6430894203277745e200,-1.644426352299547e200,-1.6457654616849185e200,-1.6471067538076384e200,-1.648450234008826e200,-1.6497959076470405e200,-1.651143780098353e200,-1.652493856756418e200,-1.6538461430325446e200,-1.6552006443557697e200,-1.6565573661729307e200,-1.6579163139487376e200,-1.659277493165847e200,-1.660640909324936e200,-1.6620065679447758e200,-1.663374474562306e200,-1.6647446347327108e200,-1.6661170540294923e200,-1.6674917380445476e200,-1.668868692388244e200,-1.6702479226894953e200,-1.6716294345958385e200,-1.673013233773512e200,-1.6743993259075305e200,-1.6757877167017662e200,-1.677178411879024e200,-1.6785714171811227e200,-1.679966738368971e200,-1.6813643812226504e200,-1.6827643515414924e200,-1.68416665514416e200,-1.6855712978687272e200,-1.686978285572762e200,-1.6883876241334053e200,-1.6897993194474545e200,-1.6912133774314456e200,-1.692629804021735e200,-1.694048605174583e200,-1.6954697868662378e200,-1.6968933550930186e200,-1.6983193158714003e200,-1.6997476752380986e200,-1.7011784392501547e200,-1.7026116139850204e200,-1.7040472055406457e200,-1.705485220035564e200,-1.7069256636089798e200,-1.7083685424208552e200,-1.7098138626519983e200,-1.711261630504151e200,-1.712711852200079e200,-1.7141645339836595e200,-1.715619682119971e200,-1.7170773028953845e200,-1.7185374026176523e200,-1.7199999876160002e200,-1.7214650642412187e200,-1.7229326388657558e200,-1.7244027178838062e200,-1.725875307711409e200,-1.727350414786537e200,-1.7288280455691916e200,-1.730308206541499e200,-1.7317909042078027e200,-1.733276145094759e200,-1.734763935751434e200,-1.7362542827493992e200,-1.737747192682828e200,-1.7392426721685933e200,-1.740740727846365e200,-1.7422413663787086e200,-1.7437445944511834e200,-1.745250418772443e200,-1.7467588460743332e200,-1.7482698831119946e200,-1.7497835366639606e200,-1.7512998135322625e200,-1.752818720542527e200,-1.7543402645440826e200,-1.7558644524100603e200,-1.7573912910374973e200,-1.758920787347442e200,-1.7604529482850573e200,-1.7619877808197267e200,-1.7635252919451605e200,-1.765065488679499e200,-1.7666083780654236e200,-1.7681539671702608e200,-1.769702263086092e200,-1.7712532729298607e200,-1.7728070038434826e200,-1.7743634629939548e200,-1.7759226575734648e200,-1.7774845947995043e200,-1.779049281914977e200,-1.7806167261883137e200,-1.782186934913582e200,-1.7837599154106018e200,-1.7853356750250583e200,-1.786914221128615e200,-1.7884955611190308e200,-1.7900797024202736e200,-1.7916666524826388e200,-1.793256418782864e200,-1.7948490088242464e200,-1.7964444301367627e200,-1.798042690277186e200,-1.7996437968292066e200,-1.8012477574035495e200,-1.8028545796380987e200,-1.804464271198015e200,-1.8060768397758597e200,-1.807692293091716e200,-1.8093106388933142e200,-1.8109318849561528e200,-1.8125560390836254e200,-1.8141831091071445e200,-1.8158131028862687e200,-1.817446028308827e200,-1.8190818932910486e200,-1.8207207057776888e200,-1.8223624737421588e200,-1.8240072051866555e200,-1.825654908142289e200,-1.827305590669217e200,-1.828959260856772e200,-1.830615926823598e200,-1.832275596717779e200,-1.8339382787169758e200,-1.835603981028559e200,-1.837272711889744e200,-1.838944479567727e200,-1.8406192923598215e200,-1.8422971585935954e200,-1.8439780866270098e200,-1.8456620848485562e200,-1.847349161677398e200,-1.8490393255635087e200,-1.8507325849878155e200,-1.8524289484623382e200,-1.854128424530334e200,-1.8558310217664415e200,-1.857536748776822e200,-1.8592456141993064e200,-1.8609576267035416e200,-1.862672794991136e200,-1.8643911277958073e200,-1.8661126338835304e200,-1.8678373220526873e200,-1.8695652011342156e200,-1.8712962799917613e200,-1.8730305675218277e200,-1.8747680726539303e200,-1.876508804350749e200,-1.8782527716082818e200,-1.8799999834560003e200,-1.881750448957005e200,-1.8835041772081832e200,-1.885261177340365e200,-1.887021458518484e200,-1.8887850299417332e200,-1.8905519008437286e200,-1.8923220804926693e200,-1.894095578191498e200,-1.895872403278066e200,-1.8976525651252972e200,-1.8994360731413505e200,-1.9012229367697877e200,-1.90301316548974e200,-1.9048067688160747e200,-1.906603756299564e200,-1.908404137527056e200,-1.9102079221216426e200,-1.912015119742833e200,-1.913825740086725e200,-1.9156397928861798e200,-1.917457287910994e200,-1.9192782349680787e200,-1.9211026439016307e200,-1.922930524593315e200,-1.92476188696244e200,-1.926596740966139e200,-1.9284350965995482e200,-1.9302769638959906e200,-1.932122352927158e200,-1.9339712738032923e200,-1.9358237366733736e200,-1.937679751725304e200,-1.9395393291860943e200,-1.9414024793220515e200,-1.9432692124389703e200,-1.9451395388823195e200,-1.947013469037435e200,-1.948891013329713e200,-1.9507721822248013e200,-1.952656986228794e200,-1.95454543588843e200,-1.9564375417912846e200,-1.9583333145659724e200,-1.960232764882343e200,-1.962135903451683e200,-1.9640427410269154e200,-1.9659532884028054e200,-1.9678675564161604e200,-1.9697855559460367e200,-1.9717072979139467e200,-1.9736327932840637e200,-1.9755620530634317e200,-1.9774950883021762e200,-1.9794319100937128e200,-1.9813725295749618e200,-1.9833169579265596e200,-1.9852652063730747e200,-1.9872172861832236e200,-1.989173208670088e200,-1.9911329851913322e200,-1.993096627149425e200,-1.9950641459918595e200,-1.9970355532113747e200,-1.9990108603461824e200,-2.0009900789801884e200,-2.0029732207432218e200,-2.004960297311262e200,-2.0069513204066668e200,-2.008946301798405e200,-2.010945253302285e200,-2.012948186781192e200,-2.014955114145321e200,-2.0169660473524113e200,-2.018980998407986e200,-2.02099997936559e200,-2.0230230023270323e200,-2.025050079442623e200,-2.0270812229114224e200,-2.0291164449814824e200,-2.0311557579500922e200,-2.0331991741640288e200,-2.0352467060198024e200,-2.037298365963911e200,-2.03935416649309e200,-2.0414141201545662e200,-2.043478239546314e200,-2.045546537317312e200,-2.047619026167801e200,-2.0496957188495428e200,-2.0517766281660852e200,-2.053861766973022e200,-2.0559511481782575e200,-2.0580447847422758e200,-2.0601426896784056e200,-2.062244876053093e200,-2.0643513569861684e200,-2.0664621456511245e200,-2.0685772552753876e200,-2.0706966991405938e200,-2.0728204905828695e200,-2.0749486429931087e200,-2.077081169817255e200,-2.0792180845565868e200,-2.0813594007679983e200,-2.0835051320642898e200,-2.0856552921144545e200,-2.087809894643969e200,-2.0899689534350852e200,-2.0921324823271243e200,-2.094300495216774e200,-2.096473006058382e200,-2.0986500288642604e200,-2.100831577704983e200,-2.1030176667096905e200,-2.1052083100663957e200,-2.1074035220222885e200,-2.1096033168840468e200,-2.1118077090181464e200,-2.114016712851174e200,-2.1162303428701408e200,-2.118448613622802e200,-2.1206715397179727e200,-2.122899135825849e200,-2.1251314166783322e200,-2.1273683970693522e200,-2.1296100918551948e200,-2.131856515954831e200,-2.1341076843502465e200,-2.1363636120867773e200,-2.1386243142734418e200,-2.1408898060832806e200,-2.1431601027536948e200,-2.1454352195867875e200,-2.147715171949709e200,-2.1499999752750004e200,-2.152289645060944e200,-2.1545841968719115e200,-2.1568836463387208e200,-2.159188009158985e200,-2.161497301097475e200,-2.163811537986476e200,-2.1661307357261497e200,-2.1684549102848993e200,-2.1707840776997353e200,-2.173118254076645e200,-2.175457455590963e200,-2.177801698487745e200,-2.1801509990821448e200,-2.1825053737597908e200,-2.184864838977169e200,-2.187229411262006e200,-2.189599107213653e200,-2.191973943503478e200,-2.1943539368752516e200,-2.1967391041455462e200,-2.1991294622041276e200,-2.201525028014356e200,-2.2039258186135866e200,-2.206331851113573e200,-2.2087431427008755e200,-2.211159710637267e200,-2.2135815722601495e200,-2.216008744982964e200,-2.2184412462956113e200,-2.2208790937648716e200,-2.223322305034825e200,-2.2257708978272796e200,-2.2282248899421993e200,-2.230684299258135e200,-2.233149143732658e200,-2.2356194414027996e200,-2.238095210385488e200,-2.2405764688779925e200,-2.2430632351583707e200,-2.245555527585914e200,-2.248053364601603e200,-2.250556764728561e200,-2.2530657465725094e200,-2.2555803288222337e200,-2.2581005302500423e200,-2.260626369712238e200,-2.263157866149585e200,-2.2656950385877835e200,-2.2682379061379482e200,-2.270786487997084e200,-2.273340803448574e200,-2.275900871862661e200,-2.2784667126969418e200,-2.2810383454968566e200,-2.283615789896186e200,-2.286199065617553e200,-2.2887881924729223e200,-2.2913831903641106e200,-2.2939840792832933e200,-2.2965908793135204e200,-2.299203610629232e200,-2.3018222934967782e200,-2.3044469482749454e200,-2.3070775954154812e200,-2.3097142554636285e200,-2.3123569490586564e200,-2.3150056969344038e200,-2.3176605199198174e200,-2.3203214389394988e200,-2.322988475014256e200,-2.3256616492616547e200,-2.3283409828965764e200,-2.331026497231781e200,-2.3337182136784695e200,-2.3364161537468547e200,-2.3391203390467335e200,-2.3418307912880645e200,-2.3445475322815476e200,-2.3472705839392115e200,-2.3499999682750004e200,-2.352735707405368e200,-2.3554778235498755e200,-2.3582263390317917e200,-2.360981276278701e200,-2.363742657823112e200,-2.3665105063030705e200,-2.369284844462782e200,-2.37206569515323e200,-2.3748530813328075e200,-2.3776470260679453e200,-2.380447552533751e200,-2.3832546840146495e200,-2.3860684439050253e200,-2.388888855709877e200,-2.391715943045468e200,-2.394549729639988e200,-2.3973902393342146e200,-2.400237496082185e200,-2.403091523951867e200,-2.4059523471258366e200,-2.4088199899019643e200,-2.4116944766940983e200,-2.4145758320327622e200,-2.4174640805658503e200,-2.4203592470593286e200,-2.423261356397947e200,-2.4261704335859487e200,-2.4290865037477903e200,-2.432009592128864e200,-2.434939724096226e200,-2.437876925139333e200,-2.4408212208707762e200,-2.4437726370270313e200,-2.4467311994692035e200,-2.4496969341837873e200,-2.4526698672834245e200,-2.4556500250076704e200,-2.458637433723768e200,-2.4616321199274233e200,-2.4646341102435908e200,-2.4676434314272602e200,-2.470660110364253e200,-2.473684174072023e200,-2.4767156497004614e200,-2.4797545645327116e200,-2.482800945985986e200,-2.485854821612391e200,-2.4889162190997574e200,-2.4919851662724776e200,-2.4950616910923496e200,-2.4981458216594223e200,-2.5012375862128566e200,-2.5043370131317827e200,-2.507444130936171e200,-2.5105589682877056e200,-2.513681553990666e200,-2.5168119169928156e200,-2.5199500863862947e200,-2.5230960914085243e200,-2.52624996144311e200,-2.5294117260207616e200,-2.5325814148202122e200,-2.5357590576691456e200,-2.5389446845451355e200,-2.542138325576584e200,-2.545340011043675e200,-2.54854977137933e200,-2.5517676371701712e200,-2.554993639157495e200,-2.5582278082382478e200,-2.561470175466017e200,-2.5647207720520216e200,-2.5679796293661133e200,-2.5712467789377894e200,-2.5745222524572036e200,-2.5778060817761977e200,-2.581098298909327e200,-2.584398936034907e200,-2.587708025496057e200,-2.5910255998017592e200,-2.5943516916279232e200,-2.597686333818456e200,-2.601029559386348e200,-2.604381401514757e200,-2.6077418935581107e200,-2.6111110690432108e200,-2.614488961670346e200,-2.617875605314422e200,-2.6212710340260856e200,-2.6246752820328734e200,-2.6280883837403555e200,-2.6315103737333005e200,-2.63494128677684e200,-2.6383811578176454e200,-2.641830021985118e200,-2.6452879145925797e200,-2.6487548711384845e200,-2.6522309273076283e200,-2.655716118972374e200,-2.6592104821938894e200,-2.6627140532233843e200,-2.6662268685033706e200,-2.669748964668921e200,-2.673280378548946e200,-2.676821147167476e200,-2.6803713077449543e200,-2.6839308976995436e200,-2.6874999546484382e200,-2.6910785164091918e200,-2.6946666210010497e200,-2.698264306646299e200,-2.7018716117716236e200,-2.705488575009472e200,-2.709115235199438e200,-2.71275163138965e200,-2.716397802838172e200,-2.720053789014418e200,-2.723719629600574e200,-2.727395364493036e200,-2.7310810338038538e200,-2.7347766778621966e200,-2.738482337215815e200,-2.742198052632533e200,-2.745923865101737e200,-2.749659815835884e200,-2.753405946272024e200,-2.7571622980733283e200,-2.7609289131306368e200,-2.7647058335640148e200,-2.7684931017243203e200,-2.7722907601947924e200,-2.77609885179264e200,-2.7799174195706587e200,-2.7837465068188468e200,-2.787586157066046e200,-2.791436414081588e200,-2.7952973218769582e200,-2.7991689247074735e200,-2.8030512670739715e200,-2.806944393724519e200,-2.810848349656126e200,-2.8147631801164843e200,-2.8186889306057133e200,-2.822625646878122e200,-2.8265733749439888e200,-2.830532161071351e200,-2.8345020517878164e200,-2.8384830938823826e200,-2.8424753344072756e200,-2.8464788206798067e200,-2.8504936002842368e200,-2.854519721073667e200,-2.858557231171935e200,-2.8626061789755362e200,-2.866666613155557e200,-2.8707385826596204e200,-2.8748221367138612e200,-2.878917324824901e200,-2.883024196781855e200,-2.8871428026583482e200,-2.8912731928145468e200,-2.895415417899218e200,-2.8995695288517924e200,-2.9037355769044597e200,-2.907913613584267e200,-2.9121036907152505e200,-2.9163058604205747e200,-2.9205201751246918e200,-2.924746687555527e200,-2.928985450746672e200,-2.933236518039608e200,-2.9374999430859387e200,-2.941775779849652e200,-2.9460640826093944e200,-2.9503649059607662e200,-2.9546783048186424e200,-2.959004334419505e200,-2.963343050323807e200,-2.9676945084183462e200,-2.9720587649186646e200,-2.976435876371474e200,-2.9808258996570915e200,-2.9852288919919113e200,-2.9896449109308817e200,-2.9940740143700202e200,-2.9985162605489406e200,-3.0029717080534046e200,-3.0074404158179004e200,-3.011922443128237e200,-3.0164178496241713e200,-3.0209266953020496e200,-3.0254490405174767e200,-3.029984945988012e200,-3.0345344727958827e200,-3.0390976823907303e200,-3.0436746365923724e200,-3.0482653975935985e200,-3.0528700279629857e200,-3.0574885906477385e200,-3.0621211489765624e200,-3.066767766662554e200,-3.0714285078061235e200,-3.076103436897944e200,-3.080792618821922e200,-3.0854961188582034e200,-3.0902140026862e200,-3.094946336387648e200,-3.0996931864496936e200,-3.104454619768006e200,-3.1092307036499186e200,-3.114021505817604e200,-3.1188270944112716e200,-3.1236475379924e200,-3.128482905546997e200,-3.1333332664888906e200,-3.13819869066305e200,-3.1430792483489394e200,-3.147975010263901e200,-3.152886047566572e200,-3.157812431860328e200,-3.162754235196771e200,-3.1677115300792317e200,-3.1726843894663236e200,-3.1776728867755195e200,-3.182677095886765e200,-3.187697091146122e200,-3.192732947369458e200,-3.197784739846155e200,-3.202852544342868e200,-3.207936437107309e200,-3.2130364948720696e200,-3.21815279485849e200,-3.2232854147805445e200,-3.228434432848785e200,-3.233599927774312e200,-3.2387819787727817e200,-3.243980665568459e200,-3.249196068398307e200,-3.25442826801611e200,-3.259677345696646e200,-3.264943383239893e200,-3.27022646297528e200,-3.275526667765973e200,-3.280844081013215e200,-3.286178786660693e200,-3.2915308691989585e200,-3.29690041366989e200,-3.3022875056711915e200,-3.307692231360948e200,-3.3131146774622164e200,-3.3185549312676594e200,-3.324013080644236e200,-3.329489214037929e200,-3.3349834204785225e200,-3.340495789584429e200,-3.346026411567559e200,-3.351575377238244e200,-3.357142778010206e200,-3.362728705905578e200,-3.3683332535599743e200,-3.3739565142276105e200,-3.3795985817864754e200,-3.3852595507435574e200,-3.390939516240121e200,-3.396638574057032e200,-3.402356820620149e200,-3.408094353005755e200,-3.413851268946056e200,-3.419627666834728e200,-3.425423645732521e200,-3.4312393053729254e200,-3.437074746167889e200,-3.4429300692135996e200,-3.448805376296319e200,-3.4547007698982855e200,-3.4606163532036696e200,-3.466552230104595e200,-3.472508505207221e200,-3.4784852838378864e200,-3.484482672049318e200,-3.490500776626906e200,-3.4965397050950385e200,-3.5025995657235046e200,-3.508680467533971e200,-3.514782520306513e200,-3.520905834586224e200,-3.5270505216898925e200,-3.533216693712745e200,-3.539404463535263e200,-3.545613944830073e200,-3.5518452520689054e200,-3.5580985005296286e200,-3.564373806303359e200,-3.570671286301648e200,-3.576991058263735e200,-3.583333240763892e200,-3.589697953218835e200,-3.596085315895223e200,-3.6024954499172304e200,-3.608928477274205e200,-3.615384520828405e200,-3.621863704322821e200,-3.628366152389084e200,-3.634891990555454e200,-3.6414413452549e200,-3.6480143438332666e200,-3.6546111145575206e200,-3.6612317866241035e200,-3.6678764901673606e200,-3.674545356268069e200,-3.681238516962056e200,-3.687956105248917e200,-3.694698255100819e200,-3.70146510147141e200,-3.7082567803048254e200,-3.7150734285447896e200,-3.7219151841438186e200,-3.72878218607253e200,-3.735674574329051e200,-3.742592489948528e200,-3.749536075012756e200,-3.7565054726598956e200,-3.763500827094316e200,-3.7705222835965374e200,-3.7775699885332894e200,-3.784644089367682e200,-3.79174473466949e200,-3.7988720741255545e200,-3.806026258550299e200,-3.8132074398963714e200,-3.8204157712654e200,-3.8276514069188724e200,-3.834914502289141e200,-3.842205213990555e200,-3.849523699830715e200,-3.856870118821859e200,-3.864244631192381e200,-3.871647398398478e200,-3.8790785831359335e200,-3.886538349352037e200,-3.894026862257643e200,-3.901544288339362e200,-3.909090795371904e200,-3.916666552430559e200,-3.924271729903821e200,-3.9319064995061654e200,-3.9395710342909723e200,-3.9472655086636e200,-3.954990098394617e200,-3.962744980633183e200,-3.970530333920592e200,-3.9783463382039767e200,-3.986193174850169e200,-3.9940710266597314e200,-4.001980077881152e200,-4.00992051422521e200,-4.017892522879506e200,-4.025896292523178e200,-4.033932013341784e200,-4.041999877042364e200,-4.0501000768686906e200,-4.0582328076166955e200,-4.0663982656500815e200,-4.0745966489161315e200,-4.082828156961702e200,-4.0910929909494134e200,-4.099391353674037e200,-4.107723449579082e200,-4.116089484773586e200,-4.1244896670491085e200,-4.132924205896935e200,-4.141393312525493e200,-4.149897199877981e200,-4.158436082650218e200,-4.167010177308709e200,-4.1756197021089366e200,-4.184264877113885e200,-4.192945924212785e200,-4.201663067140101e200,-4.210416531494752e200,-4.219206544759572e200,-4.228033336321016e200,-4.236897137489116e200,-4.2457981815176854e200,-4.2547367036247804e200,-4.263712941013419e200,-4.2727271328925666e200,-4.28177952049838e200,-4.290870347115732e200,-4.299999858100005e200,-4.309168300899164e200,-4.3183759250761146e200,-4.3276229823313464e200,-4.3369097265258666e200,-4.346236413704433e200,-4.355603302119088e200,-4.36501065225299e200,-4.3744587268445635e200,-4.383947790911962e200,-4.393478111777841e200,-4.4030499590944656e200,-4.412663604869144e200,-4.422319323489991e200,-4.432017391752035e200,-4.4417580888836666e200,-4.4515416965734396e200,-4.461368498997223e200,-4.471238782845716e200,-4.481152837352329e200,-4.491110954321437e200,-4.5011134281570085e200,-4.511160555891617e200,-4.521252637215847e200,-4.5313899745080894e200,-4.5415728728647454e200,-4.551801640130829e200,-4.5620765869309964e200,-4.572398026700984e200,-4.5827662757194847e200,-4.5931816531404506e200,-4.603644481025842e200,-4.614155084378825e200,-4.6247137911774224e200,-4.635320932408631e200,-4.6459768421030055e200,-4.656681857369721e200,-4.667436318432128e200,-4.6782405686637907e200,-4.689094954625035e200,-4.6999998261000065e200,-4.710955536134238e200,-4.7219624410727535e200,-4.7330209005987046e200,-4.74413127777255e200,-4.755293939071785e200,-4.7665092544312434e200,-4.777777597283957e200,-4.78909934460261e200,-4.800474876941573e200,-4.811904578479543e200,-4.823388837062794e200,-4.834928044249051e200,-4.846522595351984e200,-4.858172889486358e200,-4.869879329613827e200,-4.881642322589391e200,-4.893462279208538e200,-4.905339614255062e200,-4.917274746549578e200,-4.929268098998758e200,-4.9413200986452814e200,-4.9534311767185175e200,-4.965601768685965e200,-4.9778323143054384e200,-4.990123257678045e200,-5.002475047301927e200,-5.014888136126824e200,-5.0273629816094364e200,-5.0399000457696245e200,-5.0524997952474454e200,-5.065162701361055e200,-5.077889240165471e200,-5.090679892512238e200,-5.1035351441099846e200,-5.1164554855859086e200,-5.129441412548193e200,-5.1424934256493816e200,-5.155612030650714e200,-5.16879773848746e200,-5.1820510653352495e200,-5.1953725326774306e200,-5.2087626673734676e200,-5.2222220017284045e200,-5.2357510735633935e200,-5.249350426287343e200,-5.263020608969669e200,-5.276762176414193e200,-5.2905756892342e200,-5.304461713928682e200,-5.3184208229597743e200,-5.33245359483143e200,-5.3465606141693366e200,-5.3607424718021056e200,-5.374999764843761e200,-5.389333096777539e200,-5.4037430775410464e200,-5.418230323612773e200,-5.432795458100008e200,-5.44743911082818e200,-5.46216191843164e200,-5.476964524445924e200,-5.49184757940152e200,-5.5068117409191655e200,-5.521857673806709e200,-5.536986050157565e200,-5.552197549450788e200,-5.567492858652805e200,-5.582872672320835e200,-5.5983376927080175e200,-5.6138886298703055e200,-5.629526201775138e200,-5.645251134411938e200,-5.66106416190446e200,-5.676966026625044e200,-5.692957479310784e200,-5.709039279181682e200,-5.7252121940607953e200,-5.741477000496446e200,-5.757834483886507e200,-5.7742854386048295e200,-5.790830668129831e200,-5.807470985175317e200,-5.824207211823549e200,-5.8410401796606274e200,-5.857970729914234e200,-5.874999713593763e200,-5.892127991632922e200,-5.909356435034811e200,-5.926685925019579e200,-5.944117353174669e200,-5.961651621607728e200,-5.9792896431022345e200,-5.997032341275891e200,-6.0148806507418485e200,-6.032835517272816e200,-6.0508978979681214e200,-6.0690687614237826e200,-6.087349087905644e200,-6.105739869525668e200,-6.124242110421412e200,-6.142856826938792e200,-6.161585047818187e200,-6.180427814383953e200,-6.199386180737436e200,-6.218461213953532e200,-6.237653994280901e200,-6.256965615345895e200,-6.276397184360286e200,-6.295949822332875e200,-6.315624664285077e200,-6.335422859470543e200,-6.355345571598946e200,-6.375393979063995e200,-6.395569275175772e200,-6.4158726683975e200,-6.436305382586838e200,-6.4568686572418e200,-6.477563747751396e200,-6.498391925651119e200,-6.51935447888337e200,-6.540452712062943e200,-6.56168794674768e200,-6.583061521714415e200,-6.604574793240333e200,-6.626229135389863e200,-6.64802594030722e200,-6.669966618514763e200,-6.692052599217271e200,-6.714285330612267e200,-6.736666280206578e200,-6.759196935139226e200,-6.781878802510834e200,-6.804713409719666e200,-6.82770230480451e200,-6.850847056794509e200,-6.874149256066131e200,-6.897610514707475e200,-6.921232466890037e200,-6.945016769248145e200,-6.968965101266255e200,-6.993079165674286e200,-7.017360688851179e200,-7.041811421236898e200,-7.066433137753094e200,-7.091227638232591e200,-7.116196747857967e200,-7.141342317609436e200,-7.16666622472225e200,-7.192170373153863e200,-7.217856694061125e200,-7.243727146287717e200,-7.269783716862121e200,-7.296028421506369e200,-7.322463305155853e200,-7.349090442490476e200,-7.37591193847744e200,-7.402929928925952e200,-7.430146581054178e200,-7.457564094068739e200,-7.485184699757097e200,-7.513010663093135e200,-7.54104428285632e200,-7.569287892264758e200,-7.59774385962254e200,-7.626414588981736e200,-7.65530252081945e200,-7.684410132730304e200,-7.713739940134788e200,-7.743294497003897e200,-7.77307639660048e200,-7.803088272237778e200,-7.833332798055592e200,-7.86381268981457e200,-7.894530705709113e200,-7.925489647199422e200,-7.956692359863173e200,-7.988141734267407e200,-8.019840706861182e200,-8.05179226088955e200,-8.08399942732948e200,-8.116465285848334e200,-8.149192965785519e200,-8.182185647158002e200,-8.21544656169034e200,-8.248978993869931e200,-8.282786282028228e200,-8.316871819448637e200,-8.35123905550189e200,-8.385891496809673e200,-8.420832708437372e200,-8.456066315116729e200,-8.491596002499342e200,-8.527425518441894e200,-8.563558674324058e200,-8.59999934640005e200,-8.636751477184834e200,-8.67381907687603e200,-8.71120622481259e200,-8.748917070971361e200,-8.7869558375027e200,-8.825326820306304e200,-8.864034390648524e200,-8.903082996822427e200,-8.942477165851924e200,-8.982221505241341e200,-9.022320704771862e200,-9.062779538346296e200,-9.103602865883714e200,-9.144795635265515e200,-9.186362884334566e200,-9.228309742949124e200,-9.27064143509328e200,-9.313363281045744e200,-9.356480699608904e200,-9.399999210400067e200,-9.443924436206942e200,-9.488262105409488e200,-9.533018054470299e200,-9.578198230495792e200,-9.623808693870593e200,-9.669855620967542e200,-9.716345306935864e200,-9.763284168570171e200,-9.810678747263013e200,-9.858535712043861e200,-9.906861862707452e200,-9.955664133034611e200,-1.0004949594108747e201,-1.0054725457731328e201,-1.0104999079939833e201,-1.0155777964631787e201,-1.0207069767298578e201,-1.025888229887303e201,-1.0311223529694748e201,-1.0364101593597462e201,-1.0417524792122793e201,-1.047150159886503e201,-1.0526040663951649e201,-1.0581150818664607e201,-1.0636841080207579e201,-1.0693120656624497e201,-1.0749998951875102e201,-1.080748557107334e201,-1.0865590325894718e201,-1.0924323240159055e201,-1.0983694555595278e201,-1.1043714737795208e201,-1.1104394482363656e201,-1.1165744721272359e201,-1.1227776629425735e201,-1.1290501631446703e201,-1.1353931408691259e201,-1.1418077906500811e201,-1.1482953341701765e201,-1.154857021036225e201,-1.161494129581629e201,-1.1682079676966288e201,-1.1749998736875136e201,-1.1818712171659795e201,-1.1888233999698758e201,-1.1958578571166419e201,-1.2029760577907955e201,-1.210179506366898e201,-1.2174697434694955e201,-1.224848347071604e201,-1.2323169336333812e201,-1.239877159282714e201,-1.2475307210395302e201,-1.2552793580857387e201,-1.2631248530827906e201,-1.2710690335389597e201,-1.279113773228547e201,-1.287260993665319e201,-1.2955126656326206e201,-1.303870810772714e201,-1.3123375032380443e201,-1.320914871407256e201,-1.329605099668952e201,-1.3384104302763244e201,-1.3473331652759765e201,-1.3563756685144128e201,-1.3655403677258712e201,-1.3748297567053767e201,-1.3842463975710962e201,-1.3937929231203087e201,-1.4034720392835403e201,-1.4132865276816715e201,-1.4232392482910882e201,-1.4333331422222478e201,-1.4435712346173222e201,-1.4539566376729214e201,-1.4644925537942407e201,-1.475182278887342e201,-1.4860292057966872e201,-1.4970368278954477e201,-1.5082087428365747e201,-1.519548656473093e201,-1.5310603869565856e201,-1.5427478690233992e201,-1.554615158478672e201,-1.5666664368889226e201,-1.5789060164946024e201,-1.591338345354738e201,-1.603968012736557e201,-1.6167997547638133e201,-1.6298384603384226e201,-1.6430891773509547e201,-1.6565571191965598e201,-1.670247671614002e201,-1.6841663998666395e201,-1.6983190562854753e201,-1.71271158819575e201,-1.7273501462500276e201,-1.7422410931923033e201,-1.757391013079368e201,-1.7728067209875074e201,-1.7884952732346033e201,-1.8044639781498453e201,-1.8207204074255875e201,-1.8372724080884024e201,-1.8541281151290867e201,-1.871295964834335e201,-1.8887847088659876e201,-1.906603429137211e201,-1.9247615535387488e201,-1.943268872572459e201,-1.9621355569537867e201,-1.9813721762496857e201,-2.0009897186237368e201,-2.0209996117659745e201,-2.04141374509119e201,-2.0622444932963103e201,-2.0835047413749358e201,-2.1052079111952885e201,-2.1273679897567634e201,-2.1499995592500903e201,-2.1731178290568627e201,-2.19673866983599e201,-2.220878649857605e201,-2.245555073759239e201,-2.2707860239147643e201,-2.2965904046239485e201,-2.322987989349567e201,-2.349999471250119e201,-2.3776465172795697e201,-2.405951826151347e201,-2.434939190492512e201,-2.464633563545795e201,-2.4950611308125194e201,-2.5262493870687426e201,-2.558227219230727e201,-2.591024995594671e201,-2.6246746620301894e201,-2.6592098457680067e201,-2.6946659674906704e201,-2.731080362511694e201,-2.768492411914628e201,-2.8069436846203835e201,-2.8464780914602424e201,-2.887142052455122e201,-2.9289846786408564e201,-2.9720579699368805e201,-3.0164170307344956e201,-3.0621203050840615e201,-3.109229833591761e201,-3.157811534400442e201,-3.207935510930519e201,-3.259676389402251e201,-3.313113689556913e201,-3.368332232450082e201,-3.425422589715403e201,-3.484481579303907e201,-3.545612813406392e201,-3.608927305081758e201,-3.674544141062949e201,-3.7425912293190834e201,-3.8132061312472326e201,-3.8865369898862824e201,-3.962743567332387e201,-4.0419984066442277e201,-4.1244881360223255e201,-4.210414936010694e201,-4.299998194000758e201,-4.393476374540035e201,-4.4911091390151873e201,-4.593179754382643e201,-4.6999978380009944e201,-4.811902494582134e201,-4.929265912208169e201,-5.052497497750614e201,-5.182048648507584e201,-5.318418277256989e201,-5.462159233263806e201,-5.613885793454639e201,-5.77428243779288e201,-5.94411417324857e201,-6.124238734852544e201,-6.315621074446775e201,-6.519350653707161e201,-6.736662195768523e201,-6.968960730286284e201,-7.217852005293198e201,-7.485179657241394e201,-7.773070958739785e201,-8.083993545739553e201,-8.420826326504094e201,-8.786948888554835e201,-9.18635528930717e201,-9.623800358285374e201,-1.0104989889957616e202,-1.063683089740239e202,-1.1227765283770075e202,-1.188822128000268e202,-1.263123417148468e202,-1.3473315315019654e202,-1.44356935911164e202,-1.5546129833362533e202,-1.6841638470956927e202,-1.8372693700805147e202,-2.020995935777173e202,-2.2455505355025805e202,-2.526243643339433e202,-2.8871345504443077e202,-3.3683220213852114e202,-4.0419837027217105e202,-5.052474522897219e202,-6.736621351660375e202,-1.010489799105478e203,-2.020959176624632e203,-9.999999999999999e207],"x":[-1.0e-200,-9.995051954527462e-201,-9.990103909054924e-201,-9.985155863582384e-201,-9.980207818109846e-201,-9.975259772637308e-201,-9.97031172716477e-201,-9.965363681692232e-201,-9.960415636219693e-201,-9.955467590747155e-201,-9.950519545274616e-201,-9.945571499802078e-201,-9.940623454329539e-201,-9.935675408857001e-201,-9.930727363384463e-201,-9.925779317911925e-201,-9.920831272439387e-201,-9.915883226966847e-201,-9.910935181494309e-201,-9.905987136021771e-201,-9.901039090549233e-201,-9.896091045076695e-201,-9.891142999604156e-201,-9.886194954131618e-201,-9.88124690865908e-201,-9.876298863186541e-201,-9.871350817714003e-201,-9.866402772241464e-201,-9.861454726768926e-201,-9.856506681296388e-201,-9.85155863582385e-201,-9.846610590351312e-201,-9.841662544878772e-201,-9.836714499406234e-201,-9.831766453933696e-201,-9.826818408461158e-201,-9.821870362988619e-201,-9.81692231751608e-201,-9.811974272043543e-201,-9.807026226571005e-201,-9.802078181098466e-201,-9.797130135625927e-201,-9.792182090153389e-201,-9.787234044680851e-201,-9.782285999208313e-201,-9.777337953735775e-201,-9.772389908263235e-201,-9.767441862790697e-201,-9.762493817318159e-201,-9.757545771845621e-201,-9.752597726373083e-201,-9.747649680900544e-201,-9.742701635428006e-201,-9.737753589955468e-201,-9.73280554448293e-201,-9.72785749901039e-201,-9.722909453537852e-201,-9.717961408065314e-201,-9.713013362592776e-201,-9.708065317120238e-201,-9.703117271647698e-201,-9.69816922617516e-201,-9.693221180702622e-201,-9.688273135230084e-201,-9.683325089757546e-201,-9.678377044285007e-201,-9.673428998812469e-201,-9.66848095333993e-201,-9.663532907867393e-201,-9.658584862394855e-201,-9.653636816922315e-201,-9.648688771449777e-201,-9.643740725977239e-201,-9.638792680504701e-201,-9.633844635032161e-201,-9.628896589559623e-201,-9.623948544087085e-201,-9.619000498614547e-201,-9.614052453142009e-201,-9.60910440766947e-201,-9.604156362196932e-201,-9.599208316724394e-201,-9.594260271251856e-201,-9.589312225779318e-201,-9.584364180306778e-201,-9.57941613483424e-201,-9.574468089361702e-201,-9.569520043889164e-201,-9.564571998416626e-201,-9.559623952944086e-201,-9.554675907471548e-201,-9.54972786199901e-201,-9.544779816526472e-201,-9.539831771053934e-201,-9.534883725581395e-201,-9.529935680108857e-201,-9.524987634636319e-201,-9.52003958916378e-201,-9.515091543691241e-201,-9.510143498218703e-201,-9.505195452746165e-201,-9.500247407273627e-201,-9.495299361801089e-201,-9.49035131632855e-201,-9.485403270856011e-201,-9.480455225383473e-201,-9.475507179910935e-201,-9.470559134438397e-201,-9.465611088965858e-201,-9.46066304349332e-201,-9.455714998020782e-201,-9.450766952548244e-201,-9.445818907075706e-201,-9.440870861603166e-201,-9.435922816130628e-201,-9.43097477065809e-201,-9.426026725185552e-201,-9.421078679713013e-201,-9.416130634240474e-201,-9.411182588767936e-201,-9.406234543295398e-201,-9.40128649782286e-201,-9.396338452350321e-201,-9.391390406877783e-201,-9.386442361405245e-201,-9.381494315932707e-201,-9.376546270460169e-201,-9.371598224987629e-201,-9.366650179515091e-201,-9.361702134042553e-201,-9.356754088570015e-201,-9.351806043097477e-201,-9.346857997624938e-201,-9.3419099521524e-201,-9.336961906679861e-201,-9.332013861207323e-201,-9.327065815734784e-201,-9.322117770262246e-201,-9.317169724789708e-201,-9.31222167931717e-201,-9.307273633844632e-201,-9.302325588372092e-201,-9.297377542899554e-201,-9.292429497427016e-201,-9.287481451954478e-201,-9.28253340648194e-201,-9.2775853610094e-201,-9.272637315536863e-201,-9.267689270064324e-201,-9.262741224591786e-201,-9.257793179119248e-201,-9.252845133646709e-201,-9.247897088174171e-201,-9.242949042701633e-201,-9.238000997229095e-201,-9.233052951756557e-201,-9.228104906284017e-201,-9.223156860811479e-201,-9.218208815338941e-201,-9.213260769866403e-201,-9.208312724393864e-201,-9.203364678921326e-201,-9.198416633448788e-201,-9.19346858797625e-201,-9.188520542503711e-201,-9.183572497031172e-201,-9.178624451558634e-201,-9.173676406086096e-201,-9.168728360613558e-201,-9.16378031514102e-201,-9.15883226966848e-201,-9.153884224195942e-201,-9.148936178723404e-201,-9.143988133250866e-201,-9.139040087778328e-201,-9.134092042305789e-201,-9.12914399683325e-201,-9.124195951360713e-201,-9.119247905888174e-201,-9.114299860415635e-201,-9.109351814943097e-201,-9.104403769470559e-201,-9.099455723998021e-201,-9.094507678525483e-201,-9.089559633052943e-201,-9.084611587580405e-201,-9.079663542107867e-201,-9.074715496635329e-201,-9.069767451162791e-201,-9.064819405690252e-201,-9.059871360217714e-201,-9.054923314745176e-201,-9.049975269272638e-201,-9.0450272238001e-201,-9.04007917832756e-201,-9.035131132855022e-201,-9.030183087382484e-201,-9.025235041909946e-201,-9.020286996437406e-201,-9.015338950964868e-201,-9.01039090549233e-201,-9.005442860019792e-201,-9.000494814547254e-201,-8.995546769074715e-201,-8.990598723602177e-201,-8.985650678129639e-201,-8.9807026326571e-201,-8.975754587184563e-201,-8.970806541712023e-201,-8.965858496239485e-201,-8.960910450766947e-201,-8.955962405294409e-201,-8.951014359821871e-201,-8.946066314349331e-201,-8.941118268876793e-201,-8.936170223404255e-201,-8.931222177931717e-201,-8.926274132459179e-201,-8.92132608698664e-201,-8.916378041514102e-201,-8.911429996041564e-201,-8.906481950569026e-201,-8.901533905096486e-201,-8.896585859623948e-201,-8.89163781415141e-201,-8.886689768678872e-201,-8.881741723206334e-201,-8.876793677733794e-201,-8.871845632261256e-201,-8.866897586788718e-201,-8.86194954131618e-201,-8.857001495843642e-201,-8.852053450371103e-201,-8.847105404898565e-201,-8.842157359426027e-201,-8.837209313953489e-201,-8.83226126848095e-201,-8.827313223008411e-201,-8.822365177535873e-201,-8.817417132063335e-201,-8.812469086590797e-201,-8.807521041118257e-201,-8.80257299564572e-201,-8.797624950173181e-201,-8.792676904700643e-201,-8.787728859228105e-201,-8.782780813755566e-201,-8.777832768283028e-201,-8.77288472281049e-201,-8.767936677337952e-201,-8.762988631865414e-201,-8.758040586392874e-201,-8.753092540920336e-201,-8.748144495447798e-201,-8.74319644997526e-201,-8.738248404502722e-201,-8.733300359030182e-201,-8.728352313557644e-201,-8.723404268085106e-201,-8.718456222612568e-201,-8.713508177140029e-201,-8.708560131667491e-201,-8.703612086194953e-201,-8.698664040722415e-201,-8.693715995249877e-201,-8.688767949777337e-201,-8.683819904304799e-201,-8.678871858832261e-201,-8.673923813359723e-201,-8.668975767887185e-201,-8.664027722414645e-201,-8.659079676942107e-201,-8.65413163146957e-201,-8.649183585997031e-201,-8.644235540524493e-201,-8.639287495051954e-201,-8.634339449579416e-201,-8.629391404106878e-201,-8.62444335863434e-201,-8.619495313161802e-201,-8.614547267689262e-201,-8.609599222216724e-201,-8.604651176744186e-201,-8.599703131271648e-201,-8.594755085799109e-201,-8.58980704032657e-201,-8.584858994854032e-201,-8.579910949381494e-201,-8.574962903908956e-201,-8.570014858436417e-201,-8.565066812963879e-201,-8.560118767491341e-201,-8.555170722018803e-201,-8.550222676546265e-201,-8.545274631073725e-201,-8.540326585601187e-201,-8.535378540128649e-201,-8.530430494656111e-201,-8.525482449183573e-201,-8.520534403711034e-201,-8.515586358238495e-201,-8.510638312765957e-201,-8.50569026729342e-201,-8.50074222182088e-201,-8.495794176348342e-201,-8.490846130875804e-201,-8.485898085403266e-201,-8.480950039930728e-201,-8.476001994458188e-201,-8.47105394898565e-201,-8.466105903513112e-201,-8.461157858040574e-201,-8.456209812568036e-201,-8.451261767095497e-201,-8.446313721622959e-201,-8.44136567615042e-201,-8.436417630677882e-201,-8.431469585205344e-201,-8.426521539732805e-201,-8.421573494260267e-201,-8.416625448787729e-201,-8.411677403315191e-201,-8.406729357842651e-201,-8.401781312370113e-201,-8.396833266897575e-201,-8.391885221425037e-201,-8.386937175952499e-201,-8.38198913047996e-201,-8.377041085007422e-201,-8.372093039534884e-201,-8.367144994062345e-201,-8.362196948589807e-201,-8.357248903117268e-201,-8.35230085764473e-201,-8.347352812172192e-201,-8.342404766699654e-201,-8.337456721227116e-201,-8.332508675754576e-201,-8.327560630282038e-201,-8.3226125848095e-201,-8.317664539336962e-201,-8.312716493864424e-201,-8.307768448391885e-201,-8.302820402919347e-201,-8.297872357446809e-201,-8.29292431197427e-201,-8.287976266501731e-201,-8.283028221029193e-201,-8.278080175556655e-201,-8.273132130084117e-201,-8.268184084611579e-201,-8.26323603913904e-201,-8.258287993666501e-201,-8.253339948193963e-201,-8.248391902721425e-201,-8.243443857248887e-201,-8.238495811776348e-201,-8.23354776630381e-201,-8.228599720831272e-201,-8.223651675358734e-201,-8.218703629886195e-201,-8.213755584413656e-201,-8.208807538941118e-201,-8.20385949346858e-201,-8.198911447996042e-201,-8.193963402523502e-201,-8.189015357050964e-201,-8.184067311578426e-201,-8.179119266105888e-201,-8.17417122063335e-201,-8.16922317516081e-201,-8.164275129688273e-201,-8.159327084215735e-201,-8.154379038743197e-201,-8.149430993270659e-201,-8.144482947798119e-201,-8.139534902325581e-201,-8.134586856853043e-201,-8.129638811380505e-201,-8.124690765907967e-201,-8.119742720435427e-201,-8.11479467496289e-201,-8.109846629490351e-201,-8.104898584017813e-201,-8.099950538545274e-201,-8.095002493072736e-201,-8.090054447600198e-201,-8.08510640212766e-201,-8.080158356655122e-201,-8.075210311182582e-201,-8.070262265710044e-201,-8.065314220237506e-201,-8.060366174764968e-201,-8.05541812929243e-201,-8.05047008381989e-201,-8.045522038347352e-201,-8.040573992874814e-201,-8.035625947402276e-201,-8.030677901929738e-201,-8.025729856457199e-201,-8.02078181098466e-201,-8.015833765512123e-201,-8.010885720039585e-201,-8.005937674567047e-201,-8.000989629094507e-201,-7.996041583621969e-201,-7.991093538149431e-201,-7.986145492676893e-201,-7.981197447204353e-201,-7.976249401731815e-201,-7.971301356259277e-201,-7.96635331078674e-201,-7.961405265314201e-201,-7.956457219841662e-201,-7.951509174369124e-201,-7.946561128896586e-201,-7.941613083424048e-201,-7.93666503795151e-201,-7.93171699247897e-201,-7.926768947006432e-201,-7.921820901533894e-201,-7.916872856061356e-201,-7.911924810588818e-201,-7.906976765116278e-201,-7.90202871964374e-201,-7.897080674171202e-201,-7.892132628698664e-201,-7.887184583226125e-201,-7.882236537753587e-201,-7.877288492281049e-201,-7.87234044680851e-201,-7.867392401335973e-201,-7.862444355863433e-201,-7.857496310390895e-201,-7.852548264918357e-201,-7.847600219445819e-201,-7.842652173973281e-201,-7.837704128500742e-201,-7.832756083028203e-201,-7.827808037555665e-201,-7.822859992083127e-201,-7.81791194661059e-201,-7.81296390113805e-201,-7.808015855665512e-201,-7.803067810192974e-201,-7.798119764720436e-201,-7.793171719247896e-201,-7.788223673775358e-201,-7.78327562830282e-201,-7.778327582830282e-201,-7.773379537357744e-201,-7.768431491885205e-201,-7.763483446412667e-201,-7.758535400940128e-201,-7.75358735546759e-201,-7.748639309995052e-201,-7.743691264522513e-201,-7.738743219049975e-201,-7.733795173577437e-201,-7.728847128104899e-201,-7.72389908263236e-201,-7.718951037159821e-201,-7.714002991687283e-201,-7.709054946214745e-201,-7.704106900742207e-201,-7.699158855269669e-201,-7.69421080979713e-201,-7.689262764324592e-201,-7.684314718852053e-201,-7.679366673379515e-201,-7.674418627906976e-201,-7.669470582434438e-201,-7.6645225369619e-201,-7.659574491489362e-201,-7.654626446016824e-201,-7.649678400544284e-201,-7.644730355071746e-201,-7.639782309599208e-201,-7.63483426412667e-201,-7.629886218654132e-201,-7.624938173181593e-201,-7.619990127709055e-201,-7.615042082236517e-201,-7.610094036763978e-201,-7.60514599129144e-201,-7.600197945818901e-201,-7.595249900346363e-201,-7.590301854873825e-201,-7.585353809401287e-201,-7.580405763928747e-201,-7.575457718456209e-201,-7.570509672983671e-201,-7.565561627511133e-201,-7.560613582038595e-201,-7.555665536566056e-201,-7.550717491093518e-201,-7.54576944562098e-201,-7.540821400148442e-201,-7.535873354675903e-201,-7.530925309203364e-201,-7.525977263730826e-201,-7.521029218258288e-201,-7.51608117278575e-201,-7.511133127313212e-201,-7.506185081840672e-201,-7.501237036368134e-201,-7.496288990895596e-201,-7.491340945423058e-201,-7.486392899950519e-201,-7.48144485447798e-201,-7.476496809005443e-201,-7.471548763532905e-201,-7.466600718060367e-201,-7.461652672587827e-201,-7.456704627115289e-201,-7.451756581642751e-201,-7.446808536170213e-201,-7.441860490697675e-201,-7.436912445225135e-201,-7.431964399752597e-201,-7.427016354280059e-201,-7.422068308807521e-201,-7.417120263334983e-201,-7.412172217862444e-201,-7.407224172389906e-201,-7.402276126917368e-201,-7.39732808144483e-201,-7.392380035972292e-201,-7.387431990499752e-201,-7.382483945027214e-201,-7.377535899554676e-201,-7.372587854082138e-201,-7.367639808609598e-201,-7.36269176313706e-201,-7.357743717664522e-201,-7.352795672191984e-201,-7.347847626719446e-201,-7.342899581246907e-201,-7.337951535774369e-201,-7.33300349030183e-201,-7.328055444829293e-201,-7.323107399356755e-201,-7.318159353884215e-201,-7.313211308411677e-201,-7.308263262939139e-201,-7.303315217466601e-201,-7.298367171994063e-201,-7.293419126521523e-201,-7.288471081048985e-201,-7.283523035576447e-201,-7.27857499010391e-201,-7.27362694463137e-201,-7.268678899158832e-201,-7.263730853686294e-201,-7.258782808213756e-201,-7.253834762741218e-201,-7.248886717268678e-201,-7.24393867179614e-201,-7.238990626323602e-201,-7.234042580851064e-201,-7.229094535378526e-201,-7.224146489905986e-201,-7.219198444433448e-201,-7.21425039896091e-201,-7.209302353488372e-201,-7.204354308015834e-201,-7.199406262543295e-201,-7.194458217070757e-201,-7.189510171598219e-201,-7.18456212612568e-201,-7.179614080653141e-201,-7.174666035180603e-201,-7.169717989708065e-201,-7.164769944235527e-201,-7.159821898762989e-201,-7.15487385329045e-201,-7.149925807817911e-201,-7.144977762345373e-201,-7.140029716872835e-201,-7.135081671400297e-201,-7.130133625927758e-201,-7.12518558045522e-201,-7.120237534982682e-201,-7.115289489510144e-201,-7.110341444037606e-201,-7.105393398565066e-201,-7.100445353092528e-201,-7.09549730761999e-201,-7.090549262147452e-201,-7.085601216674914e-201,-7.080653171202374e-201,-7.075705125729836e-201,-7.070757080257298e-201,-7.06580903478476e-201,-7.060860989312221e-201,-7.055912943839683e-201,-7.050964898367145e-201,-7.046016852894607e-201,-7.041068807422069e-201,-7.036120761949529e-201,-7.031172716476991e-201,-7.026224671004453e-201,-7.021276625531915e-201,-7.016328580059377e-201,-7.011380534586838e-201,-7.0064324891143e-201,-7.001484443641761e-201,-6.996536398169223e-201,-6.991588352696685e-201,-6.986640307224146e-201,-6.981692261751608e-201,-6.97674421627907e-201,-6.971796170806532e-201,-6.966848125333992e-201,-6.961900079861454e-201,-6.956952034388916e-201,-6.952003988916378e-201,-6.94705594344384e-201,-6.9421078979713e-201,-6.937159852498763e-201,-6.932211807026224e-201,-6.927263761553686e-201,-6.922315716081148e-201,-6.917367670608609e-201,-6.912419625136071e-201,-6.907471579663533e-201,-6.902523534190995e-201,-6.897575488718457e-201,-6.892627443245917e-201,-6.887679397773379e-201,-6.882731352300841e-201,-6.877783306828303e-201,-6.872835261355764e-201,-6.867887215883226e-201,-6.862939170410688e-201,-6.85799112493815e-201,-6.853043079465611e-201,-6.848095033993072e-201,-6.843146988520534e-201,-6.838198943047996e-201,-6.833250897575458e-201,-6.82830285210292e-201,-6.82335480663038e-201,-6.818406761157842e-201,-6.813458715685304e-201,-6.808510670212766e-201,-6.803562624740228e-201,-6.798614579267689e-201,-6.79366653379515e-201,-6.788718488322613e-201,-6.783770442850074e-201,-6.778822397377536e-201,-6.773874351904997e-201,-6.768926306432459e-201,-6.763978260959921e-201,-6.759030215487383e-201,-6.754082170014843e-201,-6.749134124542305e-201,-6.744186079069767e-201,-6.739238033597229e-201,-6.734289988124691e-201,-6.729341942652152e-201,-6.724393897179614e-201,-6.719445851707076e-201,-6.714497806234538e-201,-6.709549760762e-201,-6.70460171528946e-201,-6.699653669816922e-201,-6.694705624344384e-201,-6.689757578871846e-201,-6.684809533399308e-201,-6.679861487926768e-201,-6.67491344245423e-201,-6.669965396981692e-201,-6.665017351509154e-201,-6.660069306036615e-201,-6.655121260564077e-201,-6.650173215091539e-201,-6.645225169619e-201,-6.640277124146463e-201,-6.635329078673923e-201,-6.630381033201385e-201,-6.625432987728847e-201,-6.620484942256309e-201,-6.615536896783771e-201,-6.610588851311231e-201,-6.605640805838693e-201,-6.600692760366155e-201,-6.595744714893617e-201,-6.590796669421079e-201,-6.58584862394854e-201,-6.580900578476002e-201,-6.575952533003464e-201,-6.571004487530926e-201,-6.566056442058386e-201,-6.561108396585848e-201,-6.55616035111331e-201,-6.551212305640772e-201,-6.546264260168234e-201,-6.541316214695694e-201,-6.536368169223156e-201,-6.531420123750618e-201,-6.52647207827808e-201,-6.5215240328055415e-201,-6.5165759873330035e-201,-6.511627941860465e-201,-6.506679896387927e-201,-6.5017318509153886e-201,-6.49678380544285e-201,-6.491835759970312e-201,-6.486887714497773e-201,-6.481939669025235e-201,-6.476991623552696e-201,-6.472043578080158e-201,-6.46709553260762e-201,-6.4621474871350814e-201,-6.457199441662543e-201,-6.4522513961900046e-201,-6.4473033507174665e-201,-6.4423553052449285e-201,-6.43740725977239e-201,-6.432459214299852e-201,-6.427511168827313e-201,-6.422563123354775e-201,-6.417615077882236e-201,-6.412667032409698e-201,-6.40771898693716e-201,-6.402770941464621e-201,-6.397822895992083e-201,-6.3928748505195444e-201,-6.3879268050470064e-201,-6.3829787595744676e-201,-6.3780307141019296e-201,-6.3730826686293915e-201,-6.368134623156853e-201,-6.363186577684315e-201,-6.358238532211776e-201,-6.353290486739238e-201,-6.3483424412667e-201,-6.343394395794161e-201,-6.338446350321623e-201,-6.333498304849084e-201,-6.328550259376546e-201,-6.3236022139040075e-201,-6.3186541684314694e-201,-6.3137061229589314e-201,-6.3087580774863926e-201,-6.3038100320138546e-201,-6.298861986541316e-201,-6.293913941068778e-201,-6.28896589559624e-201,-6.284017850123701e-201,-6.279069804651163e-201,-6.274121759178624e-201,-6.269173713706086e-201,-6.264225668233547e-201,-6.259277622761009e-201,-6.254329577288471e-201,-6.2493815318159325e-201,-6.2444334863433944e-201,-6.239485440870856e-201,-6.2345373953983176e-201,-6.229589349925779e-201,-6.224641304453241e-201,-6.219693258980703e-201,-6.214745213508164e-201,-6.209797168035626e-201,-6.204849122563087e-201,-6.199901077090549e-201,-6.194953031618011e-201,-6.190004986145472e-201,-6.185056940672934e-201,-6.1801088952003955e-201,-6.1751608497278575e-201,-6.170212804255319e-201,-6.165264758782781e-201,-6.1603167133102426e-201,-6.155368667837704e-201,-6.150420622365166e-201,-6.145472576892627e-201,-6.140524531420089e-201,-6.135576485947551e-201,-6.130628440475012e-201,-6.125680395002474e-201,-6.1207323495299354e-201,-6.115784304057397e-201,-6.1108362585848586e-201,-6.1058882131123205e-201,-6.1009401676397825e-201,-6.095992122167244e-201,-6.091044076694706e-201,-6.086096031222167e-201,-6.081147985749629e-201,-6.07619994027709e-201,-6.071251894804552e-201,-6.066303849332014e-201,-6.061355803859475e-201,-6.056407758386937e-201,-6.0514597129143984e-201,-6.0465116674418604e-201,-6.041563621969322e-201,-6.0366155764967836e-201,-6.0316675310242455e-201,-6.026719485551707e-201,-6.021771440079169e-201,-6.01682339460663e-201,-6.011875349134092e-201,-6.006927303661554e-201,-6.001979258189015e-201,-5.997031212716477e-201,-5.992083167243938e-201,-5.9871351217714e-201,-5.982187076298862e-201,-5.9772390308263234e-201,-5.9722909853537854e-201,-5.9673429398812466e-201,-5.9623948944087086e-201,-5.95744684893617e-201,-5.952498803463632e-201,-5.947550757991094e-201,-5.942602712518555e-201,-5.937654667046017e-201,-5.932706621573478e-201,-5.92775857610094e-201,-5.922810530628401e-201,-5.917862485155863e-201,-5.912914439683325e-201,-5.9079663942107865e-201,-5.9030183487382484e-201,-5.89807030326571e-201,-5.8931222577931716e-201,-5.8881742123206336e-201,-5.883226166848095e-201,-5.878278121375557e-201,-5.873330075903018e-201,-5.86838203043048e-201,-5.863433984957941e-201,-5.858485939485403e-201,-5.853537894012865e-201,-5.848589848540326e-201,-5.843641803067788e-201,-5.8386937575952495e-201,-5.8337457121227115e-201,-5.8287976666501734e-201,-5.823849621177635e-201,-5.8189015757050966e-201,-5.813953530232558e-201,-5.80900548476002e-201,-5.804057439287481e-201,-5.799109393814943e-201,-5.794161348342405e-201,-5.789213302869866e-201,-5.784265257397328e-201,-5.7793172119247894e-201,-5.774369166452251e-201,-5.7694211209797126e-201,-5.7644730755071745e-201,-5.7595250300346365e-201,-5.754576984562098e-201,-5.74962893908956e-201,-5.744680893617021e-201,-5.739732848144483e-201,-5.734784802671945e-201,-5.729836757199406e-201,-5.724888711726868e-201,-5.719940666254329e-201,-5.714992620781791e-201,-5.7100445753092524e-201,-5.7050965298367144e-201,-5.700148484364176e-201,-5.6952004388916376e-201,-5.6902523934190995e-201,-5.685304347946561e-201,-5.680356302474023e-201,-5.675408257001485e-201,-5.670460211528946e-201,-5.665512166056408e-201,-5.660564120583869e-201,-5.655616075111331e-201,-5.650668029638792e-201,-5.645719984166254e-201,-5.640771938693716e-201,-5.6358238932211774e-201,-5.6308758477486394e-201,-5.6259278022761006e-201,-5.6209797568035626e-201,-5.616031711331024e-201,-5.611083665858486e-201,-5.606135620385948e-201,-5.601187574913409e-201,-5.596239529440871e-201,-5.591291483968332e-201,-5.586343438495794e-201,-5.581395393023256e-201,-5.576447347550717e-201,-5.571499302078179e-201,-5.5665512566056405e-201,-5.5616032111331024e-201,-5.556655165660564e-201,-5.5517071201880256e-201,-5.5467590747154876e-201,-5.541811029242949e-201,-5.536862983770411e-201,-5.531914938297872e-201,-5.526966892825334e-201,-5.522018847352796e-201,-5.517070801880257e-201,-5.512122756407719e-201,-5.50717471093518e-201,-5.502226665462642e-201,-5.4972786199901035e-201,-5.4923305745175655e-201,-5.4873825290450274e-201,-5.482434483572489e-201,-5.4774864380999506e-201,-5.472538392627412e-201,-5.467590347154874e-201,-5.462642301682335e-201,-5.457694256209797e-201,-5.452746210737259e-201,-5.44779816526472e-201,-5.442850119792182e-201,-5.437902074319643e-201,-5.432954028847105e-201,-5.428005983374567e-201,-5.4230579379020285e-201,-5.4181098924294905e-201,-5.413161846956952e-201,-5.408213801484414e-201,-5.403265756011875e-201,-5.398317710539337e-201,-5.393369665066799e-201,-5.38842161959426e-201,-5.383473574121722e-201,-5.378525528649183e-201,-5.373577483176645e-201,-5.368629437704107e-201,-5.363681392231568e-201,-5.35873334675903e-201,-5.3537853012864915e-201,-5.3488372558139535e-201,-5.343889210341415e-201,-5.338941164868877e-201,-5.333993119396339e-201,-5.3290450739238e-201,-5.324097028451262e-201,-5.319148982978723e-201,-5.314200937506185e-201,-5.309252892033646e-201,-5.304304846561108e-201,-5.29935680108857e-201,-5.2944087556160314e-201,-5.289460710143493e-201,-5.2845126646709546e-201,-5.2795646191984165e-201,-5.2746165737258785e-201,-5.26966852825334e-201,-5.264720482780802e-201,-5.259772437308263e-201,-5.254824391835725e-201,-5.249876346363186e-201,-5.244928300890648e-201,-5.23998025541811e-201,-5.235032209945571e-201,-5.230084164473033e-201,-5.2251361190004944e-201,-5.2201880735279564e-201,-5.215240028055418e-201,-5.2102919825828796e-201,-5.2053439371103415e-201,-5.200395891637803e-201,-5.195447846165265e-201,-5.190499800692726e-201,-5.185551755220188e-201,-5.18060370974765e-201,-5.175655664275111e-201,-5.170707618802573e-201,-5.165759573330034e-201,-5.160811527857496e-201,-5.1558634823849575e-201,-5.1509154369124194e-201,-5.1459673914398814e-201,-5.1410193459673426e-201,-5.1360713004948046e-201,-5.131123255022266e-201,-5.126175209549728e-201,-5.12122716407719e-201,-5.116279118604651e-201,-5.111331073132113e-201,-5.106383027659574e-201,-5.101434982187036e-201,-5.096486936714497e-201,-5.091538891241959e-201,-5.086590845769421e-201,-5.0816428002968825e-201,-5.0766947548243444e-201,-5.071746709351806e-201,-5.0667986638792676e-201,-5.0618506184067296e-201,-5.056902572934191e-201,-5.051954527461653e-201,-5.047006481989114e-201,-5.042058436516576e-201,-5.037110391044037e-201,-5.032162345571499e-201,-5.027214300098961e-201,-5.022266254626422e-201,-5.017318209153884e-201,-5.0123701636813455e-201,-5.0074221182088075e-201,-5.002474072736269e-201,-4.997526027263731e-201,-4.9925779817911926e-201,-4.987629936318654e-201,-4.982681890846116e-201,-4.977733845373577e-201,-4.972785799901039e-201,-4.967837754428501e-201,-4.962889708955962e-201,-4.957941663483424e-201,-4.9529936180108854e-201,-4.948045572538347e-201,-4.9430975270658086e-201,-4.9381494815932705e-201,-4.9332014361207325e-201,-4.928253390648194e-201,-4.923305345175656e-201,-4.918357299703117e-201,-4.913409254230579e-201,-4.908461208758041e-201,-4.903513163285502e-201,-4.898565117812964e-201,-4.893617072340425e-201,-4.888669026867887e-201,-4.8837209813953484e-201,-4.8787729359228104e-201,-4.873824890450272e-201,-4.8688768449777336e-201,-4.8639287995051955e-201,-4.858980754032657e-201,-4.854032708560119e-201,-4.84908466308758e-201,-4.844136617615042e-201,-4.839188572142504e-201,-4.834240526669965e-201,-4.829292481197427e-201,-4.824344435724888e-201,-4.81939639025235e-201,-4.814448344779812e-201,-4.8095002993072734e-201,-4.8045522538347354e-201,-4.7996042083621966e-201,-4.7946561628896586e-201,-4.78970811741712e-201,-4.784760071944582e-201,-4.779812026472044e-201,-4.774863980999505e-201,-4.769915935526967e-201,-4.764967890054428e-201,-4.76001984458189e-201,-4.755071799109352e-201,-4.750123753636813e-201,-4.745175708164275e-201,-4.7402276626917365e-201,-4.7352796172191984e-201,-4.73033157174666e-201,-4.7253835262741216e-201,-4.7204354808015836e-201,-4.715487435329045e-201,-4.710539389856507e-201,-4.705591344383968e-201,-4.70064329891143e-201,-4.695695253438892e-201,-4.690747207966353e-201,-4.685799162493815e-201,-4.680851117021276e-201,-4.675903071548738e-201,-4.6709550260761995e-201,-4.6660069806036615e-201,-4.6610589351311234e-201,-4.656110889658585e-201,-4.6511628441860466e-201,-4.646214798713508e-201,-4.64126675324097e-201,-4.636318707768431e-201,-4.631370662295893e-201,-4.626422616823355e-201,-4.621474571350816e-201,-4.616526525878278e-201,-4.6115784804057394e-201,-4.606630434933201e-201,-4.601682389460663e-201,-4.5967343439881245e-201,-4.5917862985155865e-201,-4.586838253043048e-201,-4.58189020757051e-201,-4.576942162097971e-201,-4.571994116625433e-201,-4.567046071152895e-201,-4.562098025680356e-201,-4.557149980207818e-201,-4.552201934735279e-201,-4.547253889262741e-201,-4.542305843790203e-201,-4.5373577983176644e-201,-4.532409752845126e-201,-4.5274617073725876e-201,-4.5225136619000495e-201,-4.517565616427511e-201,-4.512617570954973e-201,-4.507669525482435e-201,-4.502721480009896e-201,-4.497773434537358e-201,-4.492825389064819e-201,-4.487877343592281e-201,-4.482929298119742e-201,-4.477981252647204e-201,-4.473033207174666e-201,-4.4680851617021274e-201,-4.4631371162295894e-201,-4.4581890707570506e-201,-4.4532410252845126e-201,-4.4482929798119745e-201,-4.443344934339436e-201,-4.438396888866898e-201,-4.433448843394359e-201,-4.428500797921821e-201,-4.423552752449282e-201,-4.418604706976744e-201,-4.413656661504206e-201,-4.408708616031667e-201,-4.403760570559129e-201,-4.3988125250865905e-201,-4.3938644796140524e-201,-4.3889164341415144e-201,-4.3839683886689756e-201,-4.3790203431964376e-201,-4.374072297723899e-201,-4.369124252251361e-201,-4.364176206778822e-201,-4.359228161306284e-201,-4.354280115833746e-201,-4.349332070361207e-201,-4.344384024888669e-201,-4.33943597941613e-201,-4.334487933943592e-201,-4.3295398884710535e-201,-4.3245918429985155e-201,-4.3196437975259774e-201,-4.314695752053439e-201,-4.3097477065809006e-201,-4.304799661108362e-201,-4.299851615635824e-201,-4.294903570163286e-201,-4.289955524690747e-201,-4.285007479218209e-201,-4.28005943374567e-201,-4.275111388273132e-201,-4.2701633428005934e-201,-4.265215297328055e-201,-4.260267251855517e-201,-4.2553192063829785e-201,-4.2503711609104405e-201,-4.245423115437902e-201,-4.240475069965364e-201,-4.2355270244928256e-201,-4.230578979020287e-201,-4.225630933547749e-201,-4.22068288807521e-201,-4.215734842602672e-201,-4.210786797130133e-201,-4.205838751657595e-201,-4.200890706185057e-201,-4.1959426607125184e-201,-4.19099461523998e-201,-4.1860465697674416e-201,-4.1810985242949035e-201,-4.176150478822365e-201,-4.171202433349827e-201,-4.166254387877289e-201,-4.16130634240475e-201,-4.156358296932212e-201,-4.151410251459673e-201,-4.146462205987135e-201,-4.141514160514597e-201,-4.136566115042058e-201,-4.13161806956952e-201,-4.1266700240969814e-201,-4.1217219786244434e-201,-4.1167739331519046e-201,-4.1118258876793666e-201,-4.1068778422068285e-201,-4.10192979673429e-201,-4.096981751261752e-201,-4.092033705789213e-201,-4.087085660316675e-201,-4.082137614844137e-201,-4.077189569371598e-201,-4.07224152389906e-201,-4.067293478426521e-201,-4.062345432953983e-201,-4.0573973874814445e-201,-4.0524493420089064e-201,-4.0475012965363684e-201,-4.0425532510638296e-201,-4.0376052055912916e-201,-4.032657160118753e-201,-4.027709114646215e-201,-4.022761069173676e-201,-4.017813023701138e-201,-4.0128649782286e-201,-4.007916932756061e-201,-4.002968887283523e-201,-3.998020841810984e-201,-3.993072796338446e-201,-3.988124750865908e-201,-3.9831767053933695e-201,-3.9782286599208314e-201,-3.973280614448293e-201,-3.9683325689757546e-201,-3.963384523503216e-201,-3.958436478030678e-201,-3.95348843255814e-201,-3.948540387085601e-201,-3.943592341613063e-201,-3.938644296140524e-201,-3.933696250667986e-201,-3.928748205195448e-201,-3.923800159722909e-201,-3.918852114250371e-201,-3.9139040687778325e-201,-3.9089560233052945e-201,-3.904007977832756e-201,-3.899059932360218e-201,-3.8941118868876796e-201,-3.889163841415141e-201,-3.884215795942603e-201,-3.879267750470064e-201,-3.874319704997526e-201,-3.869371659524987e-201,-3.864423614052449e-201,-3.859475568579911e-201,-3.854527523107372e-201,-3.849579477634834e-201,-3.8446314321622955e-201,-3.8396833866897575e-201,-3.8347353412172195e-201,-3.829787295744681e-201,-3.824839250272143e-201,-3.819891204799604e-201,-3.814943159327066e-201,-3.809995113854527e-201,-3.805047068381989e-201,-3.800099022909451e-201,-3.795150977436912e-201,-3.790202931964374e-201,-3.7852548864918354e-201,-3.780306841019297e-201,-3.775358795546759e-201,-3.7704107500742205e-201,-3.7654627046016825e-201,-3.760514659129144e-201,-3.755566613656606e-201,-3.750618568184067e-201,-3.745670522711529e-201,-3.740722477238991e-201,-3.735774431766452e-201,-3.730826386293914e-201,-3.725878340821375e-201,-3.720930295348837e-201,-3.7159822498762984e-201,-3.7110342044037604e-201,-3.706086158931222e-201,-3.7011381134586836e-201,-3.6961900679861456e-201,-3.691242022513607e-201,-3.686293977041069e-201,-3.681345931568531e-201,-3.676397886095992e-201,-3.671449840623454e-201,-3.666501795150915e-201,-3.661553749678377e-201,-3.656605704205838e-201,-3.6516576587333e-201,-3.646709613260762e-201,-3.6417615677882234e-201,-3.6368135223156854e-201,-3.631865476843147e-201,-3.6269174313706086e-201,-3.6219693858980706e-201,-3.617021340425532e-201,-3.612073294952994e-201,-3.607125249480455e-201,-3.602177204007917e-201,-3.597229158535378e-201,-3.59228111306284e-201,-3.587333067590302e-201,-3.582385022117763e-201,-3.577436976645225e-201,-3.5724889311726865e-201,-3.5675408857001485e-201,-3.56259284022761e-201,-3.557644794755072e-201,-3.5526967492825336e-201,-3.547748703809995e-201,-3.542800658337457e-201,-3.537852612864918e-201,-3.53290456739238e-201,-3.527956521919842e-201,-3.523008476447303e-201,-3.518060430974765e-201,-3.513112385502226e-201,-3.508164340029688e-201,-3.5032162945571495e-201,-3.4982682490846115e-201,-3.4933202036120735e-201,-3.488372158139535e-201,-3.483424112666997e-201,-3.478476067194458e-201,-3.47352802172192e-201,-3.468579976249382e-201,-3.463631930776843e-201,-3.458683885304305e-201,-3.453735839831766e-201,-3.448787794359228e-201,-3.4438397488866894e-201,-3.438891703414151e-201,-3.433943657941613e-201,-3.4289956124690745e-201,-3.4240475669965365e-201,-3.419099521523998e-201,-3.41415147605146e-201,-3.409203430578921e-201,-3.404255385106383e-201,-3.399307339633845e-201,-3.394359294161306e-201,-3.389411248688768e-201,-3.384463203216229e-201,-3.379515157743691e-201,-3.374567112271153e-201,-3.3696190667986144e-201,-3.364671021326076e-201,-3.3597229758535376e-201,-3.3547749303809995e-201,-3.349826884908461e-201,-3.344878839435923e-201,-3.339930793963385e-201,-3.334982748490846e-201,-3.330034703018308e-201,-3.325086657545769e-201,-3.320138612073231e-201,-3.315190566600693e-201,-3.310242521128154e-201,-3.305294475655616e-201,-3.3003464301830774e-201,-3.2953983847105394e-201,-3.2904503392380006e-201,-3.2855022937654626e-201,-3.2805542482929245e-201,-3.275606202820386e-201,-3.270658157347848e-201,-3.2657101118753093e-201,-3.260762066402771e-201,-3.2558140209302325e-201,-3.250865975457694e-201,-3.2459179299851557e-201,-3.2409698845126173e-201,-3.2360218390400793e-201,-3.231073793567541e-201,-3.2261257480950024e-201,-3.221177702622464e-201,-3.2162296571499256e-201,-3.2112816116773872e-201,-3.206333566204849e-201,-3.2013855207323108e-201,-3.1964374752597724e-201,-3.191489429787234e-201,-3.1865413843146956e-201,-3.181593338842157e-201,-3.176645293369619e-201,-3.1716972478970807e-201,-3.1667492024245423e-201,-3.161801156952004e-201,-3.1568531114794655e-201,-3.151905066006927e-201,-3.146957020534389e-201,-3.1420089750618506e-201,-3.1370609295893122e-201,-3.1321128841167738e-201,-3.1271648386442354e-201,-3.122216793171697e-201,-3.1172687476991586e-201,-3.1123207022266206e-201,-3.107372656754082e-201,-3.1024246112815437e-201,-3.0974765658090053e-201,-3.092528520336467e-201,-3.0875804748639285e-201,-3.0826324293913905e-201,-3.077684383918852e-201,-3.0727363384463137e-201,-3.0677882929737753e-201,-3.062840247501237e-201,-3.0578922020286985e-201,-3.0529441565561604e-201,-3.047996111083622e-201,-3.0430480656110836e-201,-3.0381000201385452e-201,-3.0331519746660068e-201,-3.0282039291934684e-201,-3.0232558837209303e-201,-3.018307838248392e-201,-3.0133597927758535e-201,-3.008411747303315e-201,-3.0034637018307767e-201,-2.9985156563582383e-201,-2.9935676108857003e-201,-2.988619565413162e-201,-2.9836715199406235e-201,-2.978723474468085e-201,-2.9737754289955466e-201,-2.9688273835230082e-201,-2.96387933805047e-201,-2.9589312925779318e-201,-2.9539832471053934e-201,-2.949035201632855e-201,-2.9440871561603166e-201,-2.939139110687778e-201,-2.9341910652152398e-201,-2.9292430197427017e-201,-2.9242949742701633e-201,-2.919346928797625e-201,-2.9143988833250865e-201,-2.909450837852548e-201,-2.9045027923800097e-201,-2.8995547469074716e-201,-2.8946067014349332e-201,-2.889658655962395e-201,-2.8847106104898564e-201,-2.879762565017318e-201,-2.8748145195447796e-201,-2.8698664740722416e-201,-2.864918428599703e-201,-2.8599703831271648e-201,-2.8550223376546264e-201,-2.850074292182088e-201,-2.8451262467095495e-201,-2.8401782012370115e-201,-2.835230155764473e-201,-2.8302821102919347e-201,-2.8253340648193963e-201,-2.820386019346858e-201,-2.8154379738743195e-201,-2.810489928401781e-201,-2.805541882929243e-201,-2.8005938374567046e-201,-2.7956457919841662e-201,-2.7906977465116278e-201,-2.7857497010390894e-201,-2.780801655566551e-201,-2.775853610094013e-201,-2.7709055646214745e-201,-2.765957519148936e-201,-2.7610094736763977e-201,-2.7560614282038593e-201,-2.751113382731321e-201,-2.746165337258783e-201,-2.7412172917862445e-201,-2.736269246313706e-201,-2.7313212008411677e-201,-2.7263731553686293e-201,-2.721425109896091e-201,-2.7164770644235528e-201,-2.7115290189510144e-201,-2.706580973478476e-201,-2.7016329280059376e-201,-2.6966848825333992e-201,-2.6917368370608608e-201,-2.6867887915883227e-201,-2.6818407461157843e-201,-2.676892700643246e-201,-2.6719446551707075e-201,-2.666996609698169e-201,-2.6620485642256307e-201,-2.6571005187530923e-201,-2.6521524732805543e-201,-2.647204427808016e-201,-2.6422563823354774e-201,-2.637308336862939e-201,-2.6323602913904006e-201,-2.6274122459178622e-201,-2.6224642004453242e-201,-2.6175161549727858e-201,-2.6125681095002474e-201,-2.607620064027709e-201,-2.6026720185551706e-201,-2.597723973082632e-201,-2.592775927610094e-201,-2.5878278821375557e-201,-2.5828798366650173e-201,-2.577931791192479e-201,-2.5729837457199405e-201,-2.568035700247402e-201,-2.563087654774864e-201,-2.5581396093023256e-201,-2.5531915638297872e-201,-2.548243518357249e-201,-2.5432954728847104e-201,-2.538347427412172e-201,-2.533399381939634e-201,-2.5284513364670956e-201,-2.523503290994557e-201,-2.5185552455220188e-201,-2.5136072000494803e-201,-2.508659154576942e-201,-2.5037111091044035e-201,-2.4987630636318655e-201,-2.493815018159327e-201,-2.4888669726867887e-201,-2.4839189272142503e-201,-2.478970881741712e-201,-2.4740228362691735e-201,-2.4690747907966354e-201,-2.464126745324097e-201,-2.4591786998515586e-201,-2.4542306543790202e-201,-2.4492826089064818e-201,-2.4443345634339434e-201,-2.4393865179614053e-201,-2.434438472488867e-201,-2.4294904270163285e-201,-2.42454238154379e-201,-2.4195943360712517e-201,-2.4146462905987133e-201,-2.4096982451261753e-201,-2.404750199653637e-201,-2.3998021541810985e-201,-2.39485410870856e-201,-2.3899060632360217e-201,-2.3849580177634832e-201,-2.3800099722909452e-201,-2.3750619268184068e-201,-2.3701138813458684e-201,-2.36516583587333e-201,-2.3602177904007916e-201,-2.355269744928253e-201,-2.3503216994557148e-201,-2.3453736539831767e-201,-2.3404256085106383e-201,-2.3354775630381e-201,-2.3305295175655615e-201,-2.325581472093023e-201,-2.3206334266204847e-201,-2.3156853811479467e-201,-2.3107373356754082e-201,-2.30578929020287e-201,-2.3008412447303314e-201,-2.295893199257793e-201,-2.2909451537852546e-201,-2.2859971083127166e-201,-2.281049062840178e-201,-2.2761010173676398e-201,-2.2711529718951014e-201,-2.266204926422563e-201,-2.2612568809500246e-201,-2.2563088354774865e-201,-2.251360790004948e-201,-2.2464127445324097e-201,-2.2414646990598713e-201,-2.236516653587333e-201,-2.2315686081147945e-201,-2.2266205626422564e-201,-2.221672517169718e-201,-2.2167244716971796e-201,-2.2117764262246412e-201,-2.2068283807521028e-201,-2.2018803352795644e-201,-2.1969322898070264e-201,-2.191984244334488e-201,-2.1870361988619496e-201,-2.182088153389411e-201,-2.1771401079168727e-201,-2.1721920624443343e-201,-2.167244016971796e-201,-2.162295971499258e-201,-2.1573479260267195e-201,-2.152399880554181e-201,-2.1474518350816427e-201,-2.1425037896091043e-201,-2.137555744136566e-201,-2.1326076986640278e-201,-2.1276596531914894e-201,-2.122711607718951e-201,-2.1177635622464126e-201,-2.1128155167738742e-201,-2.1078674713013358e-201,-2.1029194258287977e-201,-2.0979713803562593e-201,-2.093023334883721e-201,-2.0880752894111825e-201,-2.083127243938644e-201,-2.0781791984661057e-201,-2.0732311529935677e-201,-2.0682831075210293e-201,-2.063335062048491e-201,-2.0583870165759525e-201,-2.053438971103414e-201,-2.0484909256308756e-201,-2.0435428801583376e-201,-2.0385948346857992e-201,-2.0336467892132608e-201,-2.0286987437407224e-201,-2.023750698268184e-201,-2.0188026527956456e-201,-2.013854607323107e-201,-2.008906561850569e-201,-2.0039585163780307e-201,-1.9990104709054923e-201,-1.994062425432954e-201,-1.9891143799604155e-201,-1.984166334487877e-201,-1.979218289015339e-201,-1.9742702435428006e-201,-1.9693221980702622e-201,-1.964374152597724e-201,-1.9594261071251854e-201,-1.954478061652647e-201,-1.949530016180109e-201,-1.9445819707075706e-201,-1.939633925235032e-201,-1.9346858797624938e-201,-1.9297378342899554e-201,-1.924789788817417e-201,-1.919841743344879e-201,-1.9148936978723405e-201,-1.909945652399802e-201,-1.9049976069272637e-201,-1.9000495614547253e-201,-1.895101515982187e-201,-1.890153470509649e-201,-1.8852054250371104e-201,-1.880257379564572e-201,-1.8753093340920336e-201,-1.8703612886194952e-201,-1.8654132431469568e-201,-1.8604651976744184e-201,-1.8555171522018804e-201,-1.850569106729342e-201,-1.8456210612568035e-201,-1.840673015784265e-201,-1.8357249703117267e-201,-1.8307769248391883e-201,-1.8258288793666503e-201,-1.820880833894112e-201,-1.8159327884215735e-201,-1.810984742949035e-201,-1.8060366974764967e-201,-1.8010886520039583e-201,-1.7961406065314202e-201,-1.7911925610588818e-201,-1.7862445155863434e-201,-1.781296470113805e-201,-1.7763484246412666e-201,-1.7714003791687282e-201,-1.76645233369619e-201,-1.7615042882236517e-201,-1.7565562427511133e-201,-1.751608197278575e-201,-1.7466601518060365e-201,-1.741712106333498e-201,-1.73676406086096e-201,-1.7318160153884217e-201,-1.7268679699158833e-201,-1.721919924443345e-201,-1.7169718789708064e-201,-1.712023833498268e-201,-1.7070757880257296e-201,-1.7021277425531916e-201,-1.6971796970806532e-201,-1.6922316516081148e-201,-1.6872836061355764e-201,-1.682335560663038e-201,-1.6773875151904996e-201,-1.6724394697179615e-201,-1.667491424245423e-201,-1.6625433787728847e-201,-1.6575953333003463e-201,-1.652647287827808e-201,-1.6476992423552695e-201,-1.6427511968827314e-201,-1.637803151410193e-201,-1.6328551059376546e-201,-1.6279070604651162e-201,-1.6229590149925778e-201,-1.6180109695200396e-201,-1.6130629240475012e-201,-1.6081148785749628e-201,-1.6031668331024246e-201,-1.5982187876298862e-201,-1.5932707421573478e-201,-1.5883226966848095e-201,-1.5833746512122711e-201,-1.5784266057397327e-201,-1.5734785602671945e-201,-1.568530514794656e-201,-1.5635824693221177e-201,-1.5586344238495795e-201,-1.553686378377041e-201,-1.5487383329045026e-201,-1.5437902874319644e-201,-1.538842241959426e-201,-1.5338941964868876e-201,-1.5289461510143494e-201,-1.523998105541811e-201,-1.5190500600692726e-201,-1.5141020145967343e-201,-1.509153969124196e-201,-1.5042059236516575e-201,-1.4992578781791193e-201,-1.4943098327065809e-201,-1.4893617872340425e-201,-1.4844137417615041e-201,-1.4794656962889659e-201,-1.4745176508164275e-201,-1.469569605343889e-201,-1.4646215598713508e-201,-1.4596735143988124e-201,-1.454725468926274e-201,-1.4497774234537358e-201,-1.4448293779811974e-201,-1.439881332508659e-201,-1.4349332870361208e-201,-1.4299852415635824e-201,-1.425037196091044e-201,-1.4200891506185057e-201,-1.4151411051459673e-201,-1.410193059673429e-201,-1.4052450142008907e-201,-1.4002969687283523e-201,-1.3953489232558139e-201,-1.3904008777832757e-201,-1.3854528323107372e-201,-1.3805047868381988e-201,-1.3755567413656606e-201,-1.3706086958931222e-201,-1.3656606504205838e-201,-1.3607126049480456e-201,-1.3557645594755072e-201,-1.3508165140029688e-201,-1.3458684685304305e-201,-1.3409204230578921e-201,-1.3359723775853537e-201,-1.3310243321128153e-201,-1.3260762866402771e-201,-1.3211282411677387e-201,-1.3161801956952003e-201,-1.311232150222662e-201,-1.3062841047501237e-201,-1.3013360592775853e-201,-1.296388013805047e-201,-1.2914399683325086e-201,-1.2864919228599702e-201,-1.281543877387432e-201,-1.2765958319148936e-201,-1.2716477864423552e-201,-1.266699740969817e-201,-1.2617516954972786e-201,-1.2568036500247401e-201,-1.251855604552202e-201,-1.2469075590796635e-201,-1.2419595136071251e-201,-1.2370114681345869e-201,-1.2320634226620485e-201,-1.22711537718951e-201,-1.2221673317169718e-201,-1.2172192862444334e-201,-1.212271240771895e-201,-1.2073231952993568e-201,-1.2023751498268184e-201,-1.19742710435428e-201,-1.1924790588817418e-201,-1.1875310134092034e-201,-1.182582967936665e-201,-1.1776349224641266e-201,-1.1726868769915883e-201,-1.16773883151905e-201,-1.1627907860465115e-201,-1.1578427405739733e-201,-1.1528946951014349e-201,-1.1479466496288965e-201,-1.1429986041563583e-201,-1.1380505586838199e-201,-1.1331025132112815e-201,-1.1281544677387432e-201,-1.1232064222662048e-201,-1.1182583767936664e-201,-1.1133103313211282e-201,-1.1083622858485898e-201,-1.1034142403760514e-201,-1.0984661949035132e-201,-1.0935181494309747e-201,-1.0885701039584363e-201,-1.0836220584858981e-201,-1.0786740130133597e-201,-1.0737259675408213e-201,-1.068777922068283e-201,-1.0638298765957447e-201,-1.0588818311232063e-201,-1.053933785650668e-201,-1.0489857401781296e-201,-1.0440376947055912e-201,-1.039089649233053e-201,-1.0341416037605146e-201,-1.0291935582879762e-201,-1.0242455128154378e-201,-1.0192974673428996e-201,-1.0143494218703612e-201,-1.0094013763978228e-201,-1.0044533309252845e-201,-9.995052854527461e-202,-9.945572399802077e-202,-9.896091945076695e-202,-9.846611490351311e-202,-9.797131035625927e-202,-9.747650580900545e-202,-9.69817012617516e-202,-9.648689671449776e-202,-9.599209216724394e-202,-9.54972876199901e-202,-9.500248307273626e-202,-9.450767852548244e-202,-9.40128739782286e-202,-9.351806943097476e-202,-9.302326488372094e-202,-9.25284603364671e-202,-9.203365578921325e-202,-9.153885124195943e-202,-9.10440466947056e-202,-9.054924214745175e-202,-9.005443760019793e-202,-8.955963305294409e-202,-8.906482850569025e-202,-8.857002395843642e-202,-8.807521941118258e-202,-8.758041486392874e-202,-8.708561031667492e-202,-8.659080576942108e-202,-8.609600122216724e-202,-8.56011966749134e-202,-8.510639212765958e-202,-8.461158758040574e-202,-8.41167830331519e-202,-8.362197848589807e-202,-8.312717393864423e-202,-8.26323693913904e-202,-8.213756484413657e-202,-8.164276029688273e-202,-8.11479557496289e-202,-8.065315120237506e-202,-8.0158346655121225e-202,-7.966354210786739e-202,-7.916873756061355e-202,-7.867393301335972e-202,-7.817912846610589e-202,-7.768432391885205e-202,-7.718951937159822e-202,-7.669471482434439e-202,-7.619991027709055e-202,-7.570510572983671e-202,-7.521030118258287e-202,-7.471549663532904e-202,-7.422069208807521e-202,-7.372588754082137e-202,-7.323108299356754e-202,-7.273627844631371e-202,-7.224147389905987e-202,-7.1746669351806035e-202,-7.12518648045522e-202,-7.075706025729836e-202,-7.026225571004453e-202,-6.97674511627907e-202,-6.927264661553686e-202,-6.877784206828303e-202,-6.82830375210292e-202,-6.778823297377536e-202,-6.729342842652152e-202,-6.679862387926768e-202,-6.630381933201385e-202,-6.580901478476002e-202,-6.531421023750618e-202,-6.481940569025235e-202,-6.432460114299852e-202,-6.382979659574468e-202,-6.3334992048490845e-202,-6.284018750123701e-202,-6.234538295398317e-202,-6.185057840672934e-202,-6.135577385947551e-202,-6.086096931222167e-202,-6.036616476496784e-202,-5.987136021771401e-202,-5.937655567046017e-202,-5.888175112320633e-202,-5.838694657595249e-202,-5.789214202869866e-202,-5.739733748144483e-202,-5.690253293419099e-202,-5.640772838693716e-202,-5.591292383968333e-202,-5.541811929242949e-202,-5.4923314745175655e-202,-5.442851019792182e-202,-5.393370565066798e-202,-5.343890110341415e-202,-5.294409655616032e-202,-5.244929200890648e-202,-5.195448746165265e-202,-5.145968291439881e-202,-5.096487836714498e-202,-5.047007381989114e-202,-4.99752692726373e-202,-4.948046472538347e-202,-4.898566017812964e-202,-4.84908556308758e-202,-4.799605108362197e-202,-4.750124653636814e-202,-4.70064419891143e-202,-4.6511637441860465e-202,-4.601683289460663e-202,-4.552202834735279e-202,-4.502722380009896e-202,-4.453241925284513e-202,-4.403761470559129e-202,-4.354281015833746e-202,-4.304800561108362e-202,-4.255320106382979e-202,-4.205839651657595e-202,-4.156359196932211e-202,-4.106878742206828e-202,-4.0573982874814446e-202,-4.0079178327560614e-202,-3.958437378030678e-202,-3.9089569233052942e-202,-3.859476468579911e-202,-3.8099960138545275e-202,-3.760515559129144e-202,-3.7110351044037603e-202,-3.661554649678377e-202,-3.6120741949529935e-202,-3.56259374022761e-202,-3.5131132855022268e-202,-3.463632830776843e-202,-3.4141523760514595e-202,-3.364671921326076e-202,-3.315191466600693e-202,-3.265711011875309e-202,-3.2162305571499256e-202,-3.1667501024245424e-202,-3.117269647699159e-202,-3.067789192973775e-202,-3.0183087382483916e-202,-2.9688282835230085e-202,-2.919347828797625e-202,-2.8698673740722413e-202,-2.820386919346858e-202,-2.7709064646214745e-202,-2.721426009896091e-202,-2.6719455551707077e-202,-2.622465100445324e-202,-2.5729846457199405e-202,-2.523504190994557e-202,-2.474023736269174e-202,-2.42454328154379e-202,-2.3750628268184066e-202,-2.3255823720930234e-202,-2.27610191736764e-202,-2.226621462642256e-202,-2.1771410079168726e-202,-2.1276605531914894e-202,-2.078180098466106e-202,-2.0286996437407225e-202,-1.9792191890153389e-202,-1.9297387342899555e-202,-1.8802582795645719e-202,-1.8307778248391885e-202,-1.7812973701138051e-202,-1.7318169153884215e-202,-1.6823364606630381e-202,-1.6328560059376545e-202,-1.5833755512122712e-202,-1.5338950964868876e-202,-1.4844146417615042e-202,-1.4349341870361208e-202,-1.3854537323107372e-202,-1.3359732775853538e-202,-1.2864928228599702e-202,-1.2370123681345868e-202,-1.1875319134092035e-202,-1.1380514586838198e-202,-1.0885710039584365e-202,-1.0390905492330529e-202,-9.896100945076695e-203,-9.40129639782286e-203,-8.906491850569025e-203,-8.41168730331519e-203,-7.916882756061355e-203,-7.42207820880752e-203,-6.927273661553687e-203,-6.432469114299852e-203,-5.937664567046017e-203,-5.442860019792182e-203,-4.9480554725383475e-203,-4.4532509252845126e-203,-3.9584463780306776e-203,-3.4636418307768433e-203,-2.9688372835230084e-203,-2.4740327362691738e-203,-1.9792281890153388e-203,-1.4844236417615042e-203,-9.896190945076694e-204,-4.9481454725383474e-204,-1.0e-208]}

},{}],96:[function(require,module,exports){
module.exports={"expected":[9.999999999999999e299,1.0004950494999974e300,1.0009905893907776e300,1.0014866204013653e300,1.0019831432622313e300,1.0024801587052957e300,1.0029776674639311e300,1.0034756702729676e300,1.0039741678686944e300,1.0044731609888654e300,1.0049726503727016e300,1.0054726367608945e300,1.0059731208956114e300,1.0064741035204971e300,1.0069755853806793e300,1.0074775672227708e300,1.0079800497948744e300,1.0084830338465857e300,1.0089865201289977e300,1.0094905093947037e300,1.0099950023978015e300,1.0104999998938973e300,1.0110055026401095e300,1.0115115113950713e300,1.0120180269189362e300,1.0125250499733812e300,1.0130325813216097e300,1.013540621728357e300,1.0140491719598928e300,1.0145582327840252e300,1.0150678049701053e300,1.0155778892890306e300,1.0160884865132487e300,1.0165995974167615e300,1.0171112227751295e300,1.0176233633654743e300,1.0181360199664841e300,1.0186491933584171e300,1.0191628843231055e300,1.0196770936439585e300,1.0201918221059683e300,1.0207070704957122e300,1.0212228396013574e300,1.0217391302126654e300,1.0222559431209951e300,1.0227732791193077e300,1.0232911390021702e300,1.0238095235657596e300,1.0243284336078673e300,1.0248478699279029e300,1.025367833326898e300,1.025888324607511e300,1.026409344574031e300,1.0269308940323815e300,1.0274529737901248e300,1.0279755846564666e300,1.0284987274422599e300,1.0290224029600088e300,1.0295466120238731e300,1.0300713554496728e300,1.0305966340548914e300,1.0311224486586812e300,1.0316488000818671e300,1.0321756891469506e300,1.0327031166781144e300,1.033231083501227e300,1.0337595904438458e300,1.0342886383352234e300,1.0348182280063101e300,1.0353483602897589e300,1.0358790360199306e300,1.0364102560328969e300,1.0369420211664452e300,1.037474332260084e300,1.038007190155046e300,1.0385405956942931e300,1.039074549722521e300,1.0396090530861632e300,1.0401441066333956e300,1.0406797112141416e300,1.0412158676800759e300,1.041752576884629e300,1.0422898396829924e300,1.0428276569321223e300,1.0433660294907447e300,1.0439049582193599e300,1.0444444439802469e300,1.0449844876374681e300,1.0455250900568741e300,1.0460662521061082e300,1.0466079746546105e300,1.0471502585736234e300,1.047693104736196e300,1.0482365140171888e300,1.0487804872932777e300,1.0493250254429602e300,1.0498701293465582e300,1.0504157998862249e300,1.0509620379459475e300,1.0515088444115537e300,1.052056220170715e300,1.0526041661129529e300,1.0531526831296427e300,1.0537017721140183e300,1.0542514339611781e300,1.0548016695680889e300,1.0553524798335907e300,1.0559038656584027e300,1.0564558279451269e300,1.0570083675982536e300,1.0575614855241666e300,1.0581151826311476e300,1.0586694598293819e300,1.0592243180309624e300,1.0597797581498958e300,1.060335781102106e300,1.0608923878054408e300,1.0614495791796765e300,1.062007356146522e300,1.062565719629625e300,1.0631246705545768e300,1.063684209848917e300,1.064244338442139e300,1.0648050572656953e300,1.0653663672530024e300,1.0659282693394459e300,1.0664907644623862e300,1.0670538535611625e300,1.0676175375770996e300,1.0681818174535124e300,1.0687466941357108e300,1.0693121685710058e300,1.0698782417087141e300,1.0704449145001632e300,1.0710121878986983e300,1.0715800628596855e300,1.0721485403405188e300,1.0727176213006246e300,1.0732873067014677e300,1.0738575975065558e300,1.074428494681446e300,1.07499999919375e300,1.0755721120131387e300,1.0761448341113487e300,1.0767181664621875e300,1.0772921100415386e300,1.0778666658273679e300,1.078441834799728e300,1.0790176179407655e300,1.0795940162347248e300,1.0801710306679547e300,1.0807486622289143e300,1.0813269119081771e300,1.0819057806984391e300,1.0824852695945221e300,1.0830653795933808e300,1.0836461116941082e300,1.0842274668979416e300,1.0848094462082668e300,1.0853920506306266e300,1.085975281172724e300,1.0865591388444299e300,1.0871436246577876e300,1.0877287396270195e300,1.0883144847685322e300,1.0889008611009232e300,1.0894878696449866e300,1.0900755114237183e300,1.0906637874623231e300,1.0912526987882198e300,1.0918422464310471e300,1.0924324314226705e300,1.0930232547971876e300,1.0936147175909341e300,1.0942068208424905e300,1.0947995655926874e300,1.0953929528846117e300,1.0959869837636134e300,1.0965816592773113e300,1.0971769804755989e300,1.097772948410651e300,1.09836956413693e300,1.0989668287111911e300,1.09956474319249e300,1.100163308642188e300,1.1007625261239592e300,1.101362396703796e300,1.101962921450016e300,1.1025641014332676e300,1.1031659377265374e300,1.1037684314051556e300,1.1043715835468033e300,1.1049753952315184e300,1.1055798675417019e300,1.1061850015621244e300,1.1067907983799332e300,1.1073972590846582e300,1.1080043847682189e300,1.1086121765249302e300,1.1092206354515097e300,1.1098297626470843e300,1.1104395592131958e300,1.1110500262538092e300,1.1116611648753179e300,1.1122729761865509e300,1.11288546129878e300,1.1134986213257261e300,1.1141124573835652e300,1.1147269705909365e300,1.1153421620689486e300,1.115958032941186e300,1.1165745843337167e300,1.1171918173750987e300,1.1178097331963857e300,1.1184283329311363e300,1.1190476177154195e300,1.1196675886878215e300,1.1202882469894535e300,1.1209095937639585e300,1.1215316301575171e300,1.1221543573188564e300,1.1227777763992561e300,1.1234018885525557e300,1.1240266949351614e300,1.1246521967060541e300,1.125278395026795e300,1.1259052910615343e300,1.126532885977018e300,1.1271611809425948e300,1.1277901771302235e300,1.1284198757144804e300,1.1290502778725664e300,1.1296813847843149e300,1.130313197632198e300,1.1309457176013358e300,1.1315789458795013e300,1.1322128836571304e300,1.132847532127327e300,1.1334828924858725e300,1.134118965931232e300,1.1347557536645626e300,1.1353932568897202e300,1.1360314768132681e300,1.1366704146444831e300,1.1373100715953649e300,1.1379504488806427e300,1.138591547717783e300,1.1392333693269975e300,1.1398759149312507e300,1.1405191857562683e300,1.1411631830305432e300,1.1418079079853459e300,1.14245336185473e300,1.1430995458755419e300,1.1437464612874271e300,1.1443941093328398e300,1.1450424912570488e300,1.1456916083081477e300,1.1463414617370612e300,1.1469920527975541e300,1.147643382746239e300,1.1482954528425847e300,1.148948264348923e300,1.1496018185304591e300,1.1502561166552782e300,1.1509111599943538e300,1.1515669498215566e300,1.1522234874136621e300,1.1528807740503591e300,1.1535388110142583e300,1.1541975995909003e300,1.154857141068764e300,1.1555174367392752e300,1.156178487896815e300,1.156840295838728e300,1.1575028618653306e300,1.1581661872799204e300,1.1588302733887845e300,1.1594951215012068e300,1.1601607329294786e300,1.1608271089889054e300,1.1614942509978167e300,1.1621621602775749e300,1.1628308381525827e300,1.163500285950293e300,1.1641705050012178e300,1.1648414966389357e300,1.165513262200102e300,1.1661858030244574e300,1.1668591204548366e300,1.1675332158371771e300,1.1682080905205287e300,1.1688837458570616e300,1.1695601832020768e300,1.1702374039140139e300,1.1709154093544608e300,1.171594200888163e300,1.1722737798830317e300,1.1729541477101548e300,1.173635305743804e300,1.1743172553614459e300,1.1749999979437499e300,1.175683534874599e300,1.1763678675410972e300,1.1770529973335813e300,1.1777389256456272e300,1.1784256538740627e300,1.1791131834189745e300,1.1798015156837193e300,1.180490652074932e300,1.1811805940025367e300,1.1818713428797545e300,1.1825629001231151e300,1.1832552671524654e300,1.1839484453909793e300,1.1846424362651677e300,1.1853372412048882e300,1.1860328616433543e300,1.1867292990171467e300,1.1874265547662216e300,1.1881246303339218e300,1.188823527166986e300,1.1895232467155593e300,1.1902237904332022e300,1.1909251597769018e300,1.191627356207082e300,1.1923303811876123e300,1.1930342361858193e300,1.1937389226724964e300,1.1944444421219137e300,1.1951507960118287e300,1.195857985823497e300,1.1965660130416819e300,1.197274879154665e300,1.197984585654257e300,1.1986951340358074e300,1.199406525798216e300,1.2001187624439428e300,1.2008318454790186e300,1.2015457764130556e300,1.2022605567592589e300,1.2029761880344352e300,1.203692671759006e300,1.2044100094570165e300,1.2051282026561471e300,1.2058472528877248e300,1.2065671616867327e300,1.2072879305918226e300,1.2080095611453239e300,1.2087320548932566e300,1.2094554133853417e300,1.2101796381750116e300,1.2109047308194218e300,1.2116306928794627e300,1.2123575259197687e300,1.213085231508732e300,1.2138138112185122e300,1.2145432666250483e300,1.2152735993080699e300,1.2160048108511089e300,1.2167369028415095e300,1.217469876870442e300,1.2182037345329129e300,1.2189384774277763e300,1.2196741071577466e300,1.2204106253294091e300,1.2211480335532316e300,1.2218863334435775e300,1.2226255266187162e300,1.2233656147008358e300,1.2241065993160541e300,1.2248484820944316e300,1.2255912646699821e300,1.2263349486806861e300,1.2270795357685018e300,1.2278250275793779e300,1.2285714257632652e300,1.2293187319741293e300,1.2300669478699617e300,1.2308160751127936e300,1.2315661153687073e300,1.2323170703078486e300,1.2330689416044396e300,1.2338217309367905e300,1.2345754399873124e300,1.2353300704425301e300,1.2360856239930944e300,1.2368421023337949e300,1.2375995071635724e300,1.238357840185532e300,1.2391171031069548e300,1.2398772976393128e300,1.2406384254982796e300,1.2414004884037445e300,1.2421634880798253e300,1.2429274262548809e300,1.2436923046615252e300,1.2444581250366387e300,1.2452248891213832e300,1.2459925986612142e300,1.2467612554058944e300,1.2475308611095068e300,1.2483014175304684e300,1.2490729264315427e300,1.2498453895798545e300,1.2506188087469021e300,1.2513931857085718e300,1.252168522245151e300,1.2529448201413424e300,1.2537220811862758e300,1.254500307173525e300,1.2552794999011188e300,1.2560596611715563e300,1.2568407927918204e300,1.2576228965733923e300,1.2584059743322636e300,1.2591900278889529e300,1.2599750590685187e300,1.2607610697005731e300,1.2615480616192968e300,1.2623360366634534e300,1.2631249966764024e300,1.2639149435061156e300,1.2647058790051902e300,1.2654978050308636e300,1.2662907234450277e300,1.2670846361142442e300,1.2678795449097581e300,1.2686754517075136e300,1.269472358388168e300,1.2702702668371073e300,1.2710691789444602e300,1.2718690966051137e300,1.2726700217187273e300,1.273471956189749e300,1.2742749019274301e300,1.2750788608458397e300,1.275883834863881e300,1.2766898259053055e300,1.2774968358987288e300,1.2783048667776461e300,1.2791139204804478e300,1.2799239989504344e300,1.2807351041358323e300,1.2815472379898098e300,1.2823604024704926e300,1.2831745995409787e300,1.2839898311693553e300,1.2848060993287149e300,1.2856234059971697e300,1.2864417531578688e300,1.2872611427990143e300,1.288081576913876e300,1.2889030575008094e300,1.289725586563271e300,1.2905491661098347e300,1.2913737981542078e300,1.2921994847152483e300,1.29302622781698e300,1.2938540294886108e300,1.2946828917645474e300,1.2955128166844139e300,1.296343806293067e300,1.2971758626406136e300,1.2980089877824267e300,1.298843183779164e300,1.2996784526967836e300,1.300514796606561e300,1.3013522175851072e300,1.302190717714385e300,1.3030302990817264e300,1.3038709637798502e300,1.3047127139068792e300,1.305555551566358e300,1.3063994788672697e300,1.3072444979240549e300,1.308090610856627e300,1.3089378197903929e300,1.3097861268562685e300,1.3106355341906976e300,1.3114860439356696e300,1.3123376582387376e300,1.313190379253036e300,1.3140442091372994e300,1.3148991500558803e300,1.3157552041787676e300,1.316612373681605e300,1.3174706607457092e300,1.3183300675580883e300,1.3191905963114609e300,1.3200522492042743e300,1.3209150284407236e300,1.3217789362307701e300,1.3226439747901603e300,1.3235101463404453e300,1.3243774531089985e300,1.3252458973290362e300,1.3261154812396364e300,1.3269862070857573e300,1.3278580771182575e300,1.328731093593915e300,1.3296052587754458e300,1.3304805749315257e300,1.3313570443368077e300,1.3322346692719428e300,1.3331134520235995e300,1.3339933948844842e300,1.3348745001533596e300,1.3357567701350665e300,1.3366402071405432e300,1.3375248134868453e300,1.3384105914971667e300,1.3392975435008593e300,1.3401856718334534e300,1.3410749788366786e300,1.3419654668584844e300,1.342857138253061e300,1.3437499953808593e300,1.344644040608612e300,1.3455392763093547e300,1.346435704862448e300,1.3473333286535955e300,1.3482321500748687e300,1.3491321715247256e300,1.3500333954080326e300,1.3509358241360874e300,1.3518394601266385e300,1.3527443058039074e300,1.3536503635986108e300,1.3545576359479825e300,1.3554661252957943e300,1.3563758340923787e300,1.3572867647946504e300,1.3581989198661287e300,1.3591123017769605e300,1.3600269130039407e300,1.3609427560305365e300,1.3618598333469088e300,1.362778147449935e300,1.3636977008432315e300,1.3646184960371775e300,1.3655405355489363e300,1.3664638219024787e300,1.3673883576286068e300,1.368314145264977e300,1.3692411873561215e300,1.3701694864534743e300,1.3710990451153923e300,1.37202986590718e300,1.3729619514011132e300,1.373895304176462e300,1.374829926819515e300,1.375765821923603e300,1.376702992089123e300,1.3776414399235626e300,1.3785811680415243e300,1.3795221790647486e300,1.38046447562214e300,1.38140806034979e300,1.3823529358910036e300,1.383299104896321e300,1.3842465700235457e300,1.3851953339377672e300,1.3861453993113864e300,1.3870967688241413e300,1.3880494451631322e300,1.3890034310228457e300,1.3899587291051816e300,1.3909153421194775e300,1.391873272782535e300,1.3928325238186453e300,1.3937930979596145e300,1.3947549979447904e300,1.3957182265210873e300,1.3966827864430136e300,1.3976486804726973e300,1.3986159113799117e300,1.3995844819421035e300,1.4005543949444184e300,1.401525653179727e300,1.4024982594486537e300,1.4034722165596016e300,1.4044475273287807e300,1.405424194580234e300,1.406402221145867e300,1.4073816098654717e300,1.408362363586757e300,1.4093444851653752e300,1.4103279774649485e300,1.4113128433571e300,1.4122990857214782e300,1.413286707445787e300,1.4142757114258137e300,1.4152661005654567e300,1.4162578777767542e300,1.417251045979913e300,1.4182456081033376e300,1.419241567083657e300,1.4202389258657563e300,1.4212376874028034e300,1.422237854656279e300,1.4232394305960077e300,1.4242424182001838e300,1.425246820455403e300,1.426252640356693e300,1.427259880907541e300,1.428268545119924e300,1.4292786360143412e300,1.4302901566198413e300,1.4313031099740538e300,1.43231749912322e300,1.4333333271222223e300,1.4343505970346162e300,1.4353693119326605e300,1.436389474897348e300,1.4374110890184366e300,1.4384341573944808e300,1.4394586831328632e300,1.440484669349825e300,1.4415121191704993e300,1.4425410357289402e300,1.443571422168158e300,1.4446032816401485e300,1.4456366173059253e300,1.446671432335555e300,1.4477077299081853e300,1.448745513212081e300,1.449784785444655e300,1.450825549812502e300,1.4518678095314305e300,1.4529115678264967e300,1.4539568279320377e300,1.4550035930917043e300,1.4560518665584956e300,1.4571016515947913e300,1.4581529514723872e300,1.459205769472528e300,1.4602601088859415e300,1.4613159730128736e300,1.4623733651631218e300,1.4634322886560705e300,1.4644927468207256e300,1.4655547429957495e300,1.4666182805294952e300,1.467683362780043e300,1.4687499931152345e300,1.4698181749127088e300,1.4708879115599383e300,1.471959206454264e300,1.4730320630029314e300,1.4741064846231274e300,1.475182474742016e300,1.4762600367967747e300,1.4773391742346308e300,1.4784198905128996e300,1.4795021890990195e300,1.4805860734705898e300,1.4816715471154092e300,1.4827586135315102e300,1.4838472762272e300,1.4849375387210965e300,1.486029404542166e300,1.487122877229762e300,1.4882179603336633e300,1.4893146574141124e300,1.4904129720418537e300,1.4915129077981727e300,1.4926144682749346e300,1.4937176570746238e300,1.4948224778103826e300,1.495928934106052e300,1.4970370295962085e300,1.4981467679262074e300,1.49925815275222e300,1.5003711877412754e300,1.5014858765713e300,1.502602222931159e300,1.503720230520695e300,1.504839903050771e300,1.5059612442433108e300,1.50708425783134e300,1.5082089475590276e300,1.5093353171817275e300,1.5104633704660203e300,1.5115931111897555e300,1.5127245431420936e300,1.5138576701235478e300,1.5149924959460282e300,1.5161290244328824e300,1.5172672594189403e300,1.518407204750556e300,1.5195488642856522e300,1.520692241893762e300,1.5218373414560747e300,1.5229841668654786e300,1.5241327220266044e300,1.5252830108558718e300,1.5264350372815317e300,1.5275888052437113e300,1.5287443186944608e300,1.5299015815977962e300,1.5310605979297464e300,1.532221371678397e300,1.5333839068439387e300,1.5345482074387098e300,1.535714277487245e300,1.5368821210263212e300,1.538051742105003e300,1.5392231447846916e300,1.5403963331391692e300,1.541571311254648e300,1.5427480832298175e300,1.5439266531758915e300,1.5451070252166567e300,1.5462892034885195e300,1.5474731921405563e300,1.5486589953345606e300,1.549846617245092e300,1.551036062059525e300,1.5522273339780995e300,1.5534204372139682e300,1.5546153759932486e300,1.5558121545550704e300,1.557010777151627e300,1.558211248048227e300,1.5594135715233422e300,1.5606177518686604e300,1.5618237933891352e300,1.563031700403039e300,1.564241477242012e300,1.565453128251117e300,1.566666657788889e300,1.567882070227388e300,1.5690993699522526e300,1.570318561362752e300,1.571539648871838e300,1.5727626369061998e300,1.5739875299063178e300,1.5752143323265146e300,1.5764430486350124e300,1.577673683313985e300,1.5789062408596132e300,1.580140725782139e300,1.5813771426059217e300,1.5826154958694915e300,1.583855790125607e300,1.5850980299413087e300,1.5863422198979777e300,1.5875883645913894e300,1.588836468631773e300,1.590086536643864e300,1.5913385732669663e300,1.592592583155007e300,1.5938485709765932e300,1.5951065414150722e300,1.5963664991685885e300,1.5976284489501414e300,1.598892395487646e300,1.6001583435239902e300,1.6014262978170954e300,1.602696263139975e300,1.603968244280795e300,1.6052422460429342e300,1.606518273245044e300,1.6077963307211103e300,1.609076423320514e300,1.6103585559080902e300,1.6116427333641947e300,1.6129289605847612e300,1.6142172424813654e300,1.6155075839812882e300,1.6167999900275776e300,1.6180944655791118e300,1.619391015610663e300,1.620689645112961e300,1.6219903590927566e300,1.6232931625728873e300,1.6245980605923417e300,1.6259050582063222e300,1.6272141604863138e300,1.6285253725201468e300,1.6298386994120642e300,1.631154146282788e300,1.6324717182695852e300,1.6337914205263342e300,1.6351132582235928e300,1.6364372365486667e300,1.6377633607056746e300,1.6390916359156185e300,1.6404220674164528e300,1.6417546604631504e300,1.6430894203277744e300,1.644426352299547e300,1.6457654616849183e300,1.6471067538076382e300,1.648450234008826e300,1.6497959076470406e300,1.651143780098353e300,1.652493856756418e300,1.6538461430325446e300,1.6552006443557698e300,1.656557366172931e300,1.6579163139487375e300,1.659277493165847e300,1.660640909324936e300,1.6620065679447756e300,1.663374474562306e300,1.664744634732711e300,1.6661170540294924e300,1.6674917380445477e300,1.6688686923882438e300,1.6702479226894953e300,1.6716294345958386e300,1.673013233773512e300,1.6743993259075305e300,1.6757877167017661e300,1.677178411879024e300,1.6785714171811224e300,1.6799667383689708e300,1.6813643812226503e300,1.6827643515414924e300,1.6841666551441598e300,1.6855712978687272e300,1.6869782855727618e300,1.688387624133405e300,1.6897993194474545e300,1.6912133774314457e300,1.6926298040217348e300,1.694048605174583e300,1.6954697868662378e300,1.6968933550930184e300,1.6983193158714003e300,1.6997476752380986e300,1.7011784392501544e300,1.7026116139850203e300,1.7040472055406458e300,1.7054852200355642e300,1.7069256636089797e300,1.7083685424208552e300,1.709813862651998e300,1.711261630504151e300,1.7127118522000792e300,1.7141645339836594e300,1.715619682119971e300,1.7170773028953847e300,1.718537402617652e300,1.719999987616e300,1.7214650642412188e300,1.7229326388657555e300,1.724402717883806e300,1.725875307711409e300,1.7273504147865366e300,1.7288280455691916e300,1.730308206541499e300,1.7317909042078026e300,1.733276145094759e300,1.7347639357514343e300,1.7362542827493994e300,1.737747192682828e300,1.7392426721685932e300,1.740740727846365e300,1.7422413663787084e300,1.7437445944511832e300,1.745250418772443e300,1.746758846074333e300,1.7482698831119943e300,1.7497835366639607e300,1.751299813532262e300,1.752818720542527e300,1.7543402645440824e300,1.7558644524100602e300,1.757391291037497e300,1.7589207873474418e300,1.760452948285057e300,1.7619877808197268e300,1.7635252919451604e300,1.7650654886794988e300,1.7666083780654233e300,1.768153967170261e300,1.769702263086092e300,1.7712532729298608e300,1.7728070038434827e300,1.7743634629939546e300,1.7759226575734646e300,1.777484594799504e300,1.779049281914977e300,1.7806167261883135e300,1.782186934913582e300,1.7837599154106018e300,1.785335675025058e300,1.7869142211286148e300,1.7884955611190306e300,1.7900797024202735e300,1.7916666524826392e300,1.793256418782864e300,1.794849008824246e300,1.7964444301367626e300,1.798042690277186e300,1.799643796829206e300,1.8012477574035497e300,1.8028545796380987e300,1.804464271198015e300,1.8060768397758596e300,1.8076922930917162e300,1.809310638893314e300,1.810931884956153e300,1.8125560390836253e300,1.8141831091071445e300,1.8158131028862686e300,1.817446028308827e300,1.8190818932910484e300,1.8207207057776883e300,1.822362473742159e300,1.8240072051866553e300,1.825654908142289e300,1.8273055906692168e300,1.828959260856772e300,1.8306159268235976e300,1.8322755967177787e300,1.8339382787169757e300,1.8356039810285588e300,1.837272711889744e300,1.8389444795677268e300,1.8406192923598213e300,1.8422971585935955e300,1.8439780866270097e300,1.845662084848556e300,1.847349161677398e300,1.8490393255635087e300,1.850732584987815e300,1.852428948462338e300,1.8541284245303343e300,1.8558310217664415e300,1.857536748776822e300,1.8592456141993064e300,1.8609576267035416e300,1.862672794991136e300,1.8643911277958073e300,1.8661126338835302e300,1.8678373220526873e300,1.8695652011342156e300,1.871296279991761e300,1.873030567521828e300,1.8747680726539304e300,1.876508804350749e300,1.878252771608282e300,1.879999983456e300,1.881750448957005e300,1.8835041772081832e300,1.885261177340365e300,1.8870214585184837e300,1.888785029941733e300,1.8905519008437287e300,1.892322080492669e300,1.8940955781914978e300,1.8958724032780662e300,1.897652565125297e300,1.8994360731413502e300,1.9012229367697875e300,1.9030131654897398e300,1.9048067688160742e300,1.9066037562995642e300,1.9084041375270557e300,1.9102079221216422e300,1.9120151197428328e300,1.913825740086725e300,1.9156397928861796e300,1.9174572879109943e300,1.9192782349680786e300,1.9211026439016305e300,1.922930524593315e300,1.92476188696244e300,1.9265967409661387e300,1.9284350965995482e300,1.9302769638959907e300,1.9321223529271575e300,1.9339712738032923e300,1.9358237366733736e300,1.937679751725304e300,1.939539329186094e300,1.9414024793220514e300,1.9432692124389702e300,1.9451395388823193e300,1.947013469037435e300,1.9488910133297128e300,1.9507721822248012e300,1.9526569862287944e300,1.95454543588843e300,1.956437541791285e300,1.9583333145659724e300,1.9602327648823427e300,1.9621359034516828e300,1.9640427410269153e300,1.965953288402805e300,1.96786755641616e300,1.9697855559460367e300,1.9717072979139465e300,1.9736327932840636e300,1.975562053063432e300,1.977495088302176e300,1.979431910093713e300,1.9813725295749618e300,1.9833169579265593e300,1.9852652063730746e300,1.9872172861832236e300,1.9891732086700877e300,1.991132985191332e300,1.993096627149425e300,1.995064145991859e300,1.9970355532113746e300,1.9990108603461822e300,2.0009900789801884e300,2.0029732207432217e300,2.0049602973112622e300,2.0069513204066668e300,2.0089463017984045e300,2.0109452533022847e300,2.012948186781192e300,2.0149551141453207e300,2.016966047352411e300,2.0189809984079858e300,2.02099997936559e300,2.023023002327032e300,2.0250500794426228e300,2.0270812229114225e300,2.0291164449814825e300,2.0311557579500925e300,2.0331991741640284e300,2.0352467060198027e300,2.037298365963911e300,2.0393541664930898e300,2.041414120154566e300,2.043478239546314e300,2.045546537317312e300,2.0476190261678008e300,2.0496957188495428e300,2.0517766281660853e300,2.053861766973022e300,2.0559511481782575e300,2.0580447847422754e300,2.060142689678406e300,2.0622448760530926e300,2.0643513569861683e300,2.0664621456511246e300,2.0685772552753872e300,2.0706966991405937e300,2.0728204905828694e300,2.0749486429931084e300,2.0770811698172552e300,2.0792180845565868e300,2.0813594007679983e300,2.0835051320642896e300,2.0856552921144546e300,2.087809894643969e300,2.089968953435085e300,2.0921324823271244e300,2.0943004952167738e300,2.096473006058382e300,2.0986500288642602e300,2.100831577704983e300,2.1030176667096905e300,2.1052083100663955e300,2.1074035220222885e300,2.1096033168840466e300,2.111807709018146e300,2.1140167128511737e300,2.116230342870141e300,2.118448613622802e300,2.1206715397179728e300,2.122899135825849e300,2.125131416678332e300,2.1273683970693522e300,2.1296100918551947e300,2.1318565159548305e300,2.1341076843502465e300,2.136363612086777e300,2.1386243142734414e300,2.1408898060832805e300,2.1431601027536947e300,2.1454352195867875e300,2.147715171949709e300,2.1499999752750002e300,2.1522896450609434e300,2.1545841968719117e300,2.1568836463387206e300,2.159188009158985e300,2.1614973010974752e300,2.163811537986476e300,2.1661307357261494e300,2.1684549102848994e300,2.1707840776997352e300,2.173118254076645e300,2.175457455590963e300,2.177801698487745e300,2.1801509990821444e300,2.182505373759791e300,2.184864838977169e300,2.1872294112620057e300,2.1895991072136532e300,2.1919739435034777e300,2.1943539368752514e300,2.196739104145546e300,2.1991294622041277e300,2.201525028014356e300,2.2039258186135865e300,2.2063318511135733e300,2.2087431427008752e300,2.2111597106372666e300,2.2135815722601493e300,2.2160087449829636e300,2.2184412462956113e300,2.2208790937648717e300,2.223322305034825e300,2.2257708978272793e300,2.2282248899421993e300,2.2306842992581346e300,2.2331491437326578e300,2.2356194414027995e300,2.2380952103854878e300,2.2405764688779924e300,2.2430632351583704e300,2.245555527585914e300,2.248053364601603e300,2.250556764728561e300,2.2530657465725095e300,2.2555803288222333e300,2.2581005302500426e300,2.260626369712238e300,2.2631578661495845e300,2.2656950385877836e300,2.268237906137948e300,2.270786487997084e300,2.273340803448574e300,2.275900871862661e300,2.2784667126969418e300,2.2810383454968566e300,2.283615789896186e300,2.2861990656175526e300,2.2887881924729224e300,2.2913831903641104e300,2.2939840792832933e300,2.2965908793135207e300,2.299203610629232e300,2.301822293496778e300,2.3044469482749454e300,2.3070775954154812e300,2.309714255463628e300,2.3123569490586566e300,2.315005696934404e300,2.3176605199198172e300,2.3203214389394984e300,2.3229884750142558e300,2.3256616492616543e300,2.3283409828965763e300,2.3310264972317812e300,2.3337182136784694e300,2.3364161537468544e300,2.3391203390467335e300,2.3418307912880643e300,2.3445475322815474e300,2.3472705839392118e300,2.3499999682750004e300,2.3527357074053677e300,2.3554778235498752e300,2.3582263390317916e300,2.3609812762787008e300,2.3637426578231118e300,2.3665105063030706e300,2.369284844462782e300,2.3720656951532302e300,2.374853081332807e300,2.3776470260679448e300,2.3804475525337513e300,2.3832546840146492e300,2.386068443905025e300,2.3888888557098772e300,2.391715943045468e300,2.3945497296399876e300,2.3973902393342148e300,2.400237496082185e300,2.4030915239518667e300,2.405952347125837e300,2.4088199899019638e300,2.4116944766940982e300,2.4145758320327627e300,2.41746408056585e300,2.4203592470593283e300,2.423261356397947e300,2.4261704335859486e300,2.4290865037477902e300,2.432009592128864e300,2.4349397240962263e300,2.437876925139333e300,2.4408212208707765e300,2.443772637027031e300,2.4467311994692034e300,2.4496969341837876e300,2.4526698672834244e300,2.4556500250076703e300,2.4586374337237676e300,2.4616321199274235e300,2.4646341102435905e300,2.4676434314272596e300,2.470660110364253e300,2.4736841740720227e300,2.476715649700461e300,2.4797545645327118e300,2.482800945985986e300,2.4858548216123907e300,2.4889162190997574e300,2.4919851662724777e300,2.495061691092349e300,2.4981458216594223e300,2.5012375862128564e300,2.5043370131317826e300,2.507444130936171e300,2.5105589682877054e300,2.5136815539906658e300,2.5168119169928155e300,2.519950086386295e300,2.5230960914085238e300,2.52624996144311e300,2.5294117260207618e300,2.5325814148202118e300,2.535759057669146e300,2.538944684545135e300,2.5421383255765837e300,2.5453400110436752e300,2.5485497713793302e300,2.5517676371701713e300,2.5549936391574948e300,2.5582278082382477e300,2.5614701754660168e300,2.5647207720520216e300,2.5679796293661135e300,2.571246778937789e300,2.574522252457204e300,2.5778060817761975e300,2.581098298909327e300,2.584398936034907e300,2.587708025496057e300,2.5910255998017592e300,2.5943516916279232e300,2.5976863338184562e300,2.6010295593863477e300,2.6043814015147573e300,2.607741893558111e300,2.6111110690432105e300,2.614488961670346e300,2.617875605314422e300,2.6212710340260854e300,2.6246752820328726e300,2.6280883837403557e300,2.6315103737333006e300,2.6349412867768395e300,2.6383811578176455e300,2.6418300219851173e300,2.6452879145925794e300,2.6487548711384847e300,2.652230927307628e300,2.655716118972374e300,2.6592104821938893e300,2.6627140532233842e300,2.66622686850337e300,2.669748964668921e300,2.673280378548946e300,2.6768211471674756e300,2.6803713077449543e300,2.6839308976995433e300,2.687499954648438e300,2.6910785164091916e300,2.69466662100105e300,2.6982643066462993e300,2.7018716117716235e300,2.705488575009472e300,2.709115235199438e300,2.71275163138965e300,2.716397802838172e300,2.7200537890144183e300,2.723719629600574e300,2.7273953644930356e300,2.731081033803854e300,2.734776677862196e300,2.738482337215815e300,2.742198052632533e300,2.745923865101737e300,2.749659815835884e300,2.7534059462720234e300,2.757162298073328e300,2.760928913130637e300,2.7647058335640143e300,2.76849310172432e300,2.772290760194792e300,2.7760988517926396e300,2.7799174195706583e300,2.7837465068188466e300,2.7875861570660456e300,2.791436414081588e300,2.7952973218769583e300,2.799168924707473e300,2.8030512670739715e300,2.806944393724519e300,2.8108483496561255e300,2.814763180116484e300,2.8186889306057134e300,2.8226256468781216e300,2.8265733749439884e300,2.830532161071351e300,2.834502051787816e300,2.8384830938823826e300,2.8424753344072755e300,2.8464788206798065e300,2.850493600284237e300,2.8545197210736665e300,2.8585572311719346e300,2.8626061789755366e300,2.866666613155556e300,2.8707385826596203e300,2.874822136713861e300,2.878917324824901e300,2.8830241967818553e300,2.887142802658348e300,2.891273192814547e300,2.895415417899218e300,2.8995695288517925e300,2.903735576904459e300,2.907913613584267e300,2.9121036907152506e300,2.9163058604205746e300,2.920520175124692e300,2.924746687555527e300,2.9289854507466717e300,2.933236518039607e300,2.9374999430859385e300,2.941775779849652e300,2.9460640826093943e300,2.950364905960766e300,2.9546783048186415e300,2.9590043344195053e300,2.963343050323807e300,2.967694508418346e300,2.9720587649186647e300,2.9764358763714734e300,2.980825899657092e300,2.985228891991911e300,2.9896449109308817e300,2.9940740143700205e300,2.9985162605489405e300,3.0029717080534044e300,3.0074404158179e300,3.011922443128237e300,3.0164178496241713e300,3.0209266953020494e300,3.025449040517477e300,3.0299849459880115e300,3.034534472795883e300,3.0390976823907303e300,3.043674636592372e300,3.048265397593599e300,3.052870027962985e300,3.0574885906477387e300,3.0621211489765627e300,3.0667677666625535e300,3.071428507806124e300,3.0761034368979437e300,3.080792618821922e300,3.085496118858203e300,3.0902140026862e300,3.094946336387648e300,3.0996931864496936e300,3.104454619768006e300,3.109230703649918e300,3.1140215058176036e300,3.1188270944112714e300,3.1236475379924e300,3.128482905546997e300,3.1333332664888905e300,3.1381986906630496e300,3.143079248348939e300,3.1479750102639016e300,3.1528860475665714e300,3.1578124318603286e300,3.162754235196771e300,3.167711530079231e300,3.1726843894663233e300,3.1776728867755197e300,3.182677095886764e300,3.187697091146122e300,3.192732947369457e300,3.197784739846155e300,3.202852544342868e300,3.207936437107308e300,3.21303649487207e300,3.21815279485849e300,3.223285414780544e300,3.2284344328487856e300,3.233599927774312e300,3.2387819787727816e300,3.2439806655684595e300,3.2491960683983074e300,3.2544282680161094e300,3.2596773456966455e300,3.264943383239893e300,3.270226462975279e300,3.2755266677659734e300,3.280844081013215e300,3.286178786660693e300,3.2915308691989587e300,3.296900413669889e300,3.302287505671191e300,3.3076922313609484e300,3.313114677462216e300,3.318554931267659e300,3.3240130806442357e300,3.329489214037928e300,3.334983420478522e300,3.3404957895844294e300,3.346026411567559e300,3.351575377238244e300,3.3571427780102063e300,3.362728705905578e300,3.368333253559974e300,3.37395651422761e300,3.379598581786475e300,3.3852595507435576e300,3.390939516240121e300,3.3966385740570315e300,3.4023568206201486e300,3.408094353005755e300,3.413851268946056e300,3.419627666834728e300,3.425423645732522e300,3.431239305372925e300,3.4370747461678894e300,3.442930069213599e300,3.448805376296319e300,3.454700769898285e300,3.4606163532036694e300,3.466552230104595e300,3.472508505207221e300,3.478485283837886e300,3.484482672049318e300,3.4905007766269064e300,3.496539705095038e300,3.5025995657235046e300,3.508680467533971e300,3.5147825203065124e300,3.520905834586224e300,3.527050521689893e300,3.533216693712745e300,3.539404463535263e300,3.545613944830073e300,3.551845252068905e300,3.558098500529628e300,3.56437380630336e300,3.570671286301648e300,3.5769910582637346e300,3.583333240763891e300,3.5896979532188345e300,3.596085315895223e300,3.6024954499172306e300,3.608928477274205e300,3.6153845208284046e300,3.6218637043228206e300,3.628366152389083e300,3.634891990555454e300,3.6414413452549005e300,3.6480143438332665e300,3.654611114557521e300,3.661231786624103e300,3.6678764901673604e300,3.674545356268069e300,3.6812385169620564e300,3.687956105248917e300,3.694698255100819e300,3.70146510147141e300,3.7082567803048253e300,3.7150734285447896e300,3.7219151841438186e300,3.72878218607253e300,3.7356745743290507e300,3.7425924899485283e300,3.749536075012756e300,3.756505472659895e300,3.7635008270943156e300,3.7705222835965374e300,3.777569988533289e300,3.784644089367682e300,3.7917447346694905e300,3.798872074125554e300,3.806026258550299e300,3.813207439896372e300,3.8204157712654e300,3.827651406918872e300,3.834914502289141e300,3.842205213990555e300,3.849523699830715e300,3.8568701188218594e300,3.864244631192381e300,3.871647398398478e300,3.8790785831359336e300,3.886538349352037e300,3.8940268622576427e300,3.901544288339362e300,3.909090795371904e300,3.9166665524305586e300,3.9242717299038206e300,3.9319064995061654e300,3.9395710342909725e300,3.9472655086636e300,3.954990098394617e300,3.962744980633183e300,3.9705303339205916e300,3.978346338203976e300,3.986193174850168e300,3.994071026659731e300,4.0019800778811526e300,4.00992051422521e300,4.017892522879506e300,4.025896292523178e300,4.033932013341783e300,4.041999877042363e300,4.050100076868691e300,4.0582328076166955e300,4.066398265650081e300,4.0745966489161314e300,4.082828156961702e300,4.091092990949413e300,4.0993913536740366e300,4.1077234495790826e300,4.116089484773586e300,4.124489667049109e300,4.1329242058969344e300,4.141393312525493e300,4.1498971998779813e300,4.158436082650218e300,4.1670101773087087e300,4.1756197021089365e300,4.184264877113884e300,4.192945924212785e300,4.2016630671401014e300,4.210416531494752e300,4.219206544759572e300,4.228033336321016e300,4.236897137489115e300,4.245798181517685e300,4.2547367036247805e300,4.263712941013419e300,4.2727271328925667e300,4.28177952049838e300,4.2908703471157314e300,4.299999858100005e300,4.3091683008991646e300,4.318375925076115e300,4.3276229823313467e300,4.336909726525866e300,4.346236413704433e300,4.3556033021190874e300,4.365010652252989e300,4.374458726844564e300,4.383947790911962e300,4.39347811177784e300,4.403049959094465e300,4.412663604869144e300,4.4223193234899905e300,4.4320173917520347e300,4.4417580888836667e300,4.4515416965734396e300,4.461368498997223e300,4.471238782845716e300,4.481152837352329e300,4.4911109543214376e300,4.501113428157009e300,4.5111605558916166e300,4.521252637215847e300,4.53138997450809e300,4.5415728728647446e300,4.5518016401308294e300,4.562076586930997e300,4.5723980267009845e300,4.582766275719485e300,4.5931816531404496e300,4.603644481025841e300,4.614155084378824e300,4.6247137911774216e300,4.635320932408631e300,4.6459768421030056e300,4.656681857369721e300,4.6674363184321276e300,4.6782405686637904e300,4.689094954625035e300,4.6999998261000064e300,4.7109555361342376e300,4.7219624410727527e300,4.733020900598705e300,4.74413127777255e300,4.755293939071785e300,4.7665092544312435e300,4.777777597283958e300,4.78909934460261e300,4.8004748769415724e300,4.8119045784795423e300,4.823388837062794e300,4.834928044249051e300,4.846522595351984e300,4.858172889486358e300,4.8698793296138266e300,4.8816423225893905e300,4.893462279208539e300,4.9053396142550624e300,4.917274746549577e300,4.9292680989987584e300,4.9413200986452814e300,4.953431176718517e300,4.9656017686859643e300,4.977832314305439e300,4.990123257678044e300,5.002475047301927e300,5.014888136126824e300,5.027362981609436e300,5.039900045769624e300,5.0524997952474463e300,5.065162701361055e300,5.077889240165471e300,5.0906798925122384e300,5.1035351441099844e300,5.1164554855859083e300,5.1294414125481926e300,5.1424934256493816e300,5.1556120306507145e300,5.168797738487459e300,5.1820510653352485e300,5.19537253267743e300,5.2087626673734677e300,5.222222001728404e300,5.235751073563394e300,5.249350426287342e300,5.263020608969668e300,5.2767621764141923e300,5.2905756892341996e300,5.304461713928682e300,5.318420822959775e300,5.3324535948314295e300,5.346560614169336e300,5.360742471802106e300,5.37499976484376e300,5.38933309677754e300,5.403743077541046e300,5.418230323612772e300,5.432795458100008e300,5.44743911082818e300,5.462161918431639e300,5.476964524445924e300,5.49184757940152e300,5.506811740919165e300,5.52185767380671e300,5.536986050157565e300,5.552197549450788e300,5.567492858652805e300,5.582872672320835e300,5.598337692708018e300,5.613888629870304e300,5.629526201775138e300,5.645251134411938e300,5.66106416190446e300,5.676966026625044e300,5.692957479310784e300,5.709039279181681e300,5.725212194060795e300,5.741477000496446e300,5.757834483886507e300,5.77428543860483e300,5.790830668129831e300,5.807470985175317e300,5.824207211823548e300,5.841040179660627e300,5.857970729914233e300,5.874999713593763e300,5.892127991632923e300,5.909356435034811e300,5.926685925019579e300,5.944117353174668e300,5.961651621607728e300,5.979289643102235e300,5.997032341275891e300,6.014880650741848e300,6.032835517272815e300,6.050897897968121e300,6.069068761423782e300,6.087349087905645e300,6.105739869525668e300,6.124242110421412e300,6.142856826938792e300,6.161585047818186e300,6.180427814383953e300,6.199386180737436e300,6.218461213953532e300,6.237653994280899e300,6.256965615345894e300,6.276397184360285e300,6.295949822332874e300,6.315624664285077e300,6.335422859470543e300,6.355345571598946e300,6.375393979063996e300,6.395569275175772e300,6.415872668397499e300,6.436305382586838e300,6.4568686572418e300,6.477563747751396e300,6.498391925651119e300,6.51935447888337e300,6.540452712062944e300,6.56168794674768e300,6.583061521714416e300,6.604574793240335e300,6.626229135389862e300,6.648025940307219e300,6.669966618514764e300,6.69205259921727e300,6.714285330612267e300,6.736666280206577e300,6.759196935139226e300,6.781878802510832e300,6.804713409719666e300,6.827702304804511e300,6.850847056794507e300,6.874149256066131e300,6.897610514707475e300,6.921232466890036e300,6.945016769248144e300,6.968965101266256e300,6.993079165674286e300,7.017360688851177e300,7.041811421236899e300,7.066433137753094e300,7.09122763823259e300,7.116196747857967e300,7.141342317609436e300,7.166666224722249e300,7.192170373153863e300,7.217856694061125e300,7.243727146287717e300,7.269783716862122e300,7.29602842150637e300,7.322463305155852e300,7.349090442490475e300,7.375911938477439e300,7.402929928925952e300,7.430146581054177e300,7.45756409406874e300,7.485184699757095e300,7.513010663093134e300,7.54104428285632e300,7.569287892264758e300,7.597743859622538e300,7.626414588981735e300,7.655302520819449e300,7.684410132730303e300,7.713739940134788e300,7.743294497003896e300,7.773076396600479e300,7.803088272237778e300,7.833332798055593e300,7.863812689814569e300,7.894530705709113e300,7.925489647199423e300,7.956692359863173e300,7.988141734267407e300,8.019840706861181e300,8.05179226088955e300,8.083999427329481e300,8.116465285848333e300,8.14919296578552e300,8.182185647158002e300,8.215446561690339e300,8.248978993869932e300,8.282786282028228e300,8.316871819448637e300,8.351239055501889e300,8.385891496809673e300,8.420832708437373e300,8.456066315116728e300,8.491596002499342e300,8.527425518441893e300,8.563558674324057e300,8.59999934640005e300,8.636751477184833e300,8.673819076876029e300,8.711206224812589e300,8.748917070971361e300,8.786955837502699e300,8.825326820306303e300,8.864034390648524e300,8.903082996822427e300,8.942477165851924e300,8.982221505241342e300,9.022320704771861e300,9.062779538346294e300,9.103602865883714e300,9.144795635265514e300,9.186362884334565e300,9.228309742949125e300,9.27064143509328e300,9.313363281045744e300,9.356480699608903e300,9.399999210400066e300,9.44392443620694e300,9.488262105409488e300,9.533018054470299e300,9.578198230495791e300,9.623808693870592e300,9.669855620967542e300,9.716345306935864e300,9.763284168570169e300,9.810678747263014e300,9.858535712043861e300,9.90686186270745e300,9.95566413303461e300,1.0004949594108747e301,1.0054725457731326e301,1.0104999079939833e301,1.0155777964631787e301,1.0207069767298576e301,1.025888229887303e301,1.0311223529694748e301,1.0364101593597461e301,1.0417524792122793e301,1.047150159886503e301,1.0526040663951647e301,1.0581150818664607e301,1.0636841080207576e301,1.0693120656624495e301,1.0749998951875103e301,1.080748557107334e301,1.0865590325894717e301,1.0924323240159055e301,1.0983694555595279e301,1.1043714737795208e301,1.1104394482363656e301,1.116574472127236e301,1.1227776629425735e301,1.1290501631446704e301,1.1353931408691258e301,1.141807790650081e301,1.1482953341701764e301,1.154857021036225e301,1.161494129581629e301,1.1682079676966286e301,1.1749998736875135e301,1.1818712171659796e301,1.1888233999698757e301,1.195857857116642e301,1.2029760577907954e301,1.210179506366898e301,1.2174697434694955e301,1.224848347071604e301,1.2323169336333814e301,1.2398771592827138e301,1.24753072103953e301,1.2552793580857388e301,1.2631248530827904e301,1.2710690335389596e301,1.2791137732285468e301,1.287260993665319e301,1.2955126656326205e301,1.303870810772714e301,1.3123375032380441e301,1.3209148714072562e301,1.3296050996689518e301,1.3384104302763243e301,1.3473331652759763e301,1.3563756685144126e301,1.365540367725871e301,1.3748297567053764e301,1.3842463975710962e301,1.3937929231203086e301,1.4034720392835405e301,1.4132865276816715e301,1.423239248291088e301,1.4333331422222478e301,1.443571234617322e301,1.4539566376729213e301,1.4644925537942408e301,1.475182278887342e301,1.4860292057966873e301,1.4970368278954477e301,1.5082087428365747e301,1.519548656473093e301,1.5310603869565855e301,1.542747869023399e301,1.554615158478672e301,1.5666664368889224e301,1.5789060164946024e301,1.591338345354738e301,1.6039680127365568e301,1.6167997547638131e301,1.6298384603384225e301,1.6430891773509545e301,1.65655711919656e301,1.6702476716140018e301,1.6841663998666394e301,1.698319056285475e301,1.7127115881957498e301,1.7273501462500275e301,1.742241093192303e301,1.7573910130793677e301,1.772806720987507e301,1.7884952732346033e301,1.8044639781498452e301,1.8207204074255874e301,1.8372724080884025e301,1.8541281151290865e301,1.8712959648343351e301,1.8887847088659877e301,1.9066034291372105e301,1.9247615535387488e301,1.943268872572459e301,1.9621355569537864e301,1.9813721762496856e301,2.0009897186237366e301,2.0209996117659746e301,2.0414137450911902e301,2.06224449329631e301,2.083504741374936e301,2.1052079111952883e301,2.1273679897567633e301,2.14999955925009e301,2.173117829056863e301,2.1967386698359896e301,2.220878649857605e301,2.245555073759239e301,2.270786023914764e301,2.296590404623949e301,2.3229879893495665e301,2.3499994712501187e301,2.3776465172795694e301,2.405951826151347e301,2.434939190492512e301,2.4646335635457953e301,2.495061130812519e301,2.5262493870687423e301,2.5582272192307266e301,2.591024995594671e301,2.624674662030189e301,2.6592098457680065e301,2.6946659674906703e301,2.7310803625116936e301,2.7684924119146277e301,2.806943684620383e301,2.846478091460242e301,2.887142052455122e301,2.928984678640856e301,2.97205796993688e301,3.0164170307344955e301,3.0621203050840613e301,3.109229833591761e301,3.1578115344004415e301,3.207935510930519e301,3.2596763894022504e301,3.313113689556913e301,3.368332232450082e301,3.425422589715403e301,3.484481579303907e301,3.545612813406392e301,3.608927305081758e301,3.6745441410629487e301,3.7425912293190836e301,3.8132061312472323e301,3.886536989886282e301,3.9627435673323868e301,4.041998406644228e301,4.1244881360223254e301,4.210414936010694e301,4.2999981940007585e301,4.393476374540034e301,4.491109139015187e301,4.593179754382642e301,4.699997838000994e301,4.811902494582134e301,4.929265912208169e301,5.052497497750614e301,5.182048648507584e301,5.318418277256988e301,5.462159233263806e301,5.613885793454639e301,5.77428243779288e301,5.94411417324857e301,6.1242387348525435e301,6.315621074446776e301,6.519350653707161e301,6.736662195768522e301,6.968960730286284e301,7.217852005293197e301,7.485179657241394e301,7.7730709587397835e301,8.083993545739554e301,8.420826326504094e301,8.786948888554836e301,9.18635528930717e301,9.623800358285373e301,1.0104989889957616e302,1.063683089740239e302,1.1227765283770075e302,1.1888221280002679e302,1.2631234171484679e302,1.3473315315019652e302,1.4435693591116401e302,1.5546129833362535e302,1.6841638470956926e302,1.8372693700805145e302,2.020995935777173e302,2.2455505355025808e302,2.5262436433394326e302,2.8871345504443074e302,3.3683220213852113e302,4.041983702721711e302,5.052474522897218e302,6.736621351660374e302,1.010489799105478e303,2.020959176624632e303,9.999999999998982e307],"x":[1.0e-300,9.995051954527462e-301,9.990103909054924e-301,9.985155863582386e-301,9.980207818109846e-301,9.975259772637308e-301,9.97031172716477e-301,9.965363681692232e-301,9.960415636219694e-301,9.955467590747156e-301,9.950519545274616e-301,9.945571499802078e-301,9.94062345432954e-301,9.935675408857002e-301,9.930727363384464e-301,9.925779317911926e-301,9.920831272439386e-301,9.915883226966848e-301,9.91093518149431e-301,9.905987136021772e-301,9.901039090549234e-301,9.896091045076696e-301,9.891142999604156e-301,9.886194954131618e-301,9.88124690865908e-301,9.876298863186542e-301,9.871350817714004e-301,9.866402772241466e-301,9.861454726768926e-301,9.856506681296388e-301,9.85155863582385e-301,9.846610590351312e-301,9.841662544878774e-301,9.836714499406235e-301,9.831766453933696e-301,9.826818408461158e-301,9.82187036298862e-301,9.816922317516081e-301,9.811974272043543e-301,9.807026226571005e-301,9.802078181098466e-301,9.797130135625927e-301,9.79218209015339e-301,9.787234044680851e-301,9.782285999208313e-301,9.777337953735775e-301,9.772389908263235e-301,9.767441862790697e-301,9.76249381731816e-301,9.757545771845621e-301,9.752597726373083e-301,9.747649680900545e-301,9.742701635428007e-301,9.737753589955467e-301,9.73280554448293e-301,9.727857499010391e-301,9.722909453537853e-301,9.717961408065315e-301,9.713013362592777e-301,9.708065317120237e-301,9.703117271647699e-301,9.698169226175161e-301,9.693221180702623e-301,9.688273135230085e-301,9.683325089757547e-301,9.678377044285007e-301,9.673428998812469e-301,9.668480953339931e-301,9.663532907867393e-301,9.658584862394855e-301,9.653636816922317e-301,9.648688771449777e-301,9.643740725977239e-301,9.6387926805047e-301,9.633844635032163e-301,9.628896589559625e-301,9.623948544087087e-301,9.619000498614547e-301,9.614052453142009e-301,9.60910440766947e-301,9.604156362196933e-301,9.599208316724394e-301,9.594260271251856e-301,9.589312225779317e-301,9.584364180306779e-301,9.57941613483424e-301,9.574468089361702e-301,9.569520043889164e-301,9.564571998416626e-301,9.559623952944087e-301,9.554675907471548e-301,9.54972786199901e-301,9.544779816526472e-301,9.539831771053934e-301,9.534883725581396e-301,9.529935680108856e-301,9.524987634636318e-301,9.52003958916378e-301,9.515091543691242e-301,9.510143498218704e-301,9.505195452746166e-301,9.500247407273628e-301,9.495299361801088e-301,9.49035131632855e-301,9.485403270856012e-301,9.480455225383474e-301,9.475507179910936e-301,9.470559134438398e-301,9.465611088965858e-301,9.46066304349332e-301,9.455714998020782e-301,9.450766952548244e-301,9.445818907075706e-301,9.440870861603168e-301,9.435922816130628e-301,9.43097477065809e-301,9.426026725185552e-301,9.421078679713014e-301,9.416130634240476e-301,9.411182588767938e-301,9.406234543295398e-301,9.40128649782286e-301,9.396338452350322e-301,9.391390406877784e-301,9.386442361405246e-301,9.381494315932707e-301,9.376546270460168e-301,9.37159822498763e-301,9.366650179515092e-301,9.361702134042554e-301,9.356754088570015e-301,9.351806043097477e-301,9.346857997624938e-301,9.3419099521524e-301,9.336961906679861e-301,9.332013861207323e-301,9.327065815734785e-301,9.322117770262247e-301,9.317169724789708e-301,9.31222167931717e-301,9.307273633844631e-301,9.302325588372093e-301,9.297377542899555e-301,9.292429497427017e-301,9.287481451954477e-301,9.28253340648194e-301,9.277585361009401e-301,9.272637315536863e-301,9.267689270064325e-301,9.262741224591787e-301,9.257793179119249e-301,9.25284513364671e-301,9.247897088174171e-301,9.242949042701633e-301,9.238000997229095e-301,9.233052951756557e-301,9.228104906284019e-301,9.223156860811479e-301,9.218208815338941e-301,9.213260769866403e-301,9.208312724393865e-301,9.203364678921327e-301,9.198416633448789e-301,9.193468587976249e-301,9.188520542503711e-301,9.183572497031173e-301,9.178624451558635e-301,9.173676406086097e-301,9.168728360613559e-301,9.163780315141019e-301,9.15883226966848e-301,9.153884224195943e-301,9.148936178723405e-301,9.143988133250867e-301,9.139040087778328e-301,9.134092042305789e-301,9.12914399683325e-301,9.124195951360713e-301,9.119247905888174e-301,9.114299860415636e-301,9.109351814943098e-301,9.104403769470559e-301,9.09945572399802e-301,9.094507678525482e-301,9.089559633052944e-301,9.084611587580406e-301,9.079663542107868e-301,9.074715496635328e-301,9.06976745116279e-301,9.064819405690252e-301,9.059871360217714e-301,9.054923314745176e-301,9.049975269272638e-301,9.045027223800098e-301,9.04007917832756e-301,9.035131132855022e-301,9.030183087382484e-301,9.025235041909946e-301,9.020286996437408e-301,9.01533895096487e-301,9.01039090549233e-301,9.005442860019792e-301,9.000494814547254e-301,8.995546769074716e-301,8.990598723602178e-301,8.98565067812964e-301,8.9807026326571e-301,8.975754587184562e-301,8.970806541712024e-301,8.965858496239486e-301,8.960910450766948e-301,8.95596240529441e-301,8.95101435982187e-301,8.946066314349332e-301,8.941118268876794e-301,8.936170223404256e-301,8.931222177931718e-301,8.92627413245918e-301,8.92132608698664e-301,8.916378041514102e-301,8.911429996041564e-301,8.906481950569026e-301,8.901533905096488e-301,8.89658585962395e-301,8.89163781415141e-301,8.886689768678872e-301,8.881741723206334e-301,8.876793677733795e-301,8.871845632261257e-301,8.86689758678872e-301,8.86194954131618e-301,8.857001495843642e-301,8.852053450371103e-301,8.847105404898565e-301,8.842157359426027e-301,8.83720931395349e-301,8.83226126848095e-301,8.827313223008411e-301,8.822365177535873e-301,8.817417132063335e-301,8.812469086590797e-301,8.807521041118259e-301,8.80257299564572e-301,8.797624950173181e-301,8.792676904700643e-301,8.787728859228105e-301,8.782780813755567e-301,8.777832768283029e-301,8.772884722810491e-301,8.767936677337951e-301,8.762988631865413e-301,8.758040586392875e-301,8.753092540920337e-301,8.748144495447799e-301,8.74319644997526e-301,8.738248404502721e-301,8.733300359030183e-301,8.728352313557645e-301,8.723404268085107e-301,8.718456222612569e-301,8.71350817714003e-301,8.708560131667491e-301,8.703612086194953e-301,8.698664040722415e-301,8.693715995249877e-301,8.688767949777339e-301,8.6838199043048e-301,8.67887185883226e-301,8.673923813359723e-301,8.668975767887185e-301,8.664027722414647e-301,8.659079676942108e-301,8.65413163146957e-301,8.64918358599703e-301,8.644235540524493e-301,8.639287495051955e-301,8.634339449579416e-301,8.629391404106878e-301,8.62444335863434e-301,8.6194953131618e-301,8.614547267689262e-301,8.609599222216724e-301,8.604651176744186e-301,8.599703131271648e-301,8.59475508579911e-301,8.58980704032657e-301,8.584858994854032e-301,8.579910949381494e-301,8.574962903908956e-301,8.570014858436418e-301,8.56506681296388e-301,8.56011876749134e-301,8.555170722018802e-301,8.550222676546264e-301,8.545274631073726e-301,8.540326585601188e-301,8.53537854012865e-301,8.530430494656112e-301,8.525482449183572e-301,8.520534403711034e-301,8.515586358238496e-301,8.510638312765958e-301,8.50569026729342e-301,8.500742221820882e-301,8.495794176348342e-301,8.490846130875804e-301,8.485898085403266e-301,8.480950039930728e-301,8.47600199445819e-301,8.471053948985652e-301,8.466105903513112e-301,8.461157858040574e-301,8.456209812568036e-301,8.451261767095498e-301,8.44631372162296e-301,8.441365676150422e-301,8.436417630677882e-301,8.431469585205344e-301,8.426521539732806e-301,8.421573494260268e-301,8.41662544878773e-301,8.411677403315191e-301,8.406729357842652e-301,8.401781312370114e-301,8.396833266897575e-301,8.391885221425037e-301,8.3869371759525e-301,8.381989130479961e-301,8.377041085007422e-301,8.372093039534883e-301,8.367144994062345e-301,8.362196948589807e-301,8.35724890311727e-301,8.352300857644731e-301,8.347352812172191e-301,8.342404766699653e-301,8.337456721227115e-301,8.332508675754577e-301,8.327560630282039e-301,8.322612584809501e-301,8.317664539336961e-301,8.312716493864423e-301,8.307768448391885e-301,8.302820402919347e-301,8.297872357446809e-301,8.292924311974271e-301,8.287976266501733e-301,8.283028221029193e-301,8.278080175556655e-301,8.273132130084117e-301,8.268184084611579e-301,8.26323603913904e-301,8.258287993666503e-301,8.253339948193963e-301,8.248391902721425e-301,8.243443857248887e-301,8.238495811776349e-301,8.23354776630381e-301,8.228599720831273e-301,8.223651675358733e-301,8.218703629886195e-301,8.213755584413657e-301,8.208807538941119e-301,8.20385949346858e-301,8.198911447996042e-301,8.193963402523503e-301,8.189015357050965e-301,8.184067311578427e-301,8.179119266105889e-301,8.17417122063335e-301,8.169223175160812e-301,8.164275129688273e-301,8.159327084215735e-301,8.154379038743196e-301,8.149430993270658e-301,8.14448294779812e-301,8.139534902325582e-301,8.134586856853043e-301,8.129638811380504e-301,8.124690765907966e-301,8.119742720435428e-301,8.11479467496289e-301,8.109846629490352e-301,8.104898584017812e-301,8.099950538545274e-301,8.095002493072736e-301,8.090054447600198e-301,8.08510640212766e-301,8.080158356655122e-301,8.075210311182582e-301,8.070262265710044e-301,8.065314220237506e-301,8.060366174764968e-301,8.05541812929243e-301,8.050470083819892e-301,8.045522038347354e-301,8.040573992874814e-301,8.035625947402276e-301,8.030677901929738e-301,8.0257298564572e-301,8.020781810984662e-301,8.015833765512124e-301,8.010885720039584e-301,8.005937674567046e-301,8.000989629094508e-301,7.99604158362197e-301,7.991093538149432e-301,7.986145492676894e-301,7.981197447204354e-301,7.976249401731816e-301,7.971301356259278e-301,7.96635331078674e-301,7.961405265314202e-301,7.956457219841663e-301,7.951509174369124e-301,7.946561128896586e-301,7.941613083424048e-301,7.93666503795151e-301,7.931716992478971e-301,7.926768947006433e-301,7.921820901533894e-301,7.916872856061356e-301,7.911924810588817e-301,7.90697676511628e-301,7.902028719643741e-301,7.897080674171203e-301,7.892132628698663e-301,7.887184583226125e-301,7.882236537753587e-301,7.87728849228105e-301,7.872340446808511e-301,7.867392401335973e-301,7.862444355863433e-301,7.857496310390895e-301,7.852548264918357e-301,7.847600219445819e-301,7.842652173973281e-301,7.837704128500743e-301,7.832756083028203e-301,7.827808037555665e-301,7.822859992083127e-301,7.817911946610589e-301,7.812963901138051e-301,7.808015855665513e-301,7.803067810192975e-301,7.798119764720435e-301,7.793171719247897e-301,7.788223673775359e-301,7.78327562830282e-301,7.778327582830283e-301,7.773379537357745e-301,7.768431491885205e-301,7.763483446412667e-301,7.758535400940129e-301,7.75358735546759e-301,7.748639309995053e-301,7.743691264522515e-301,7.738743219049975e-301,7.733795173577437e-301,7.728847128104899e-301,7.72389908263236e-301,7.718951037159822e-301,7.714002991687284e-301,7.709054946214745e-301,7.704106900742207e-301,7.699158855269669e-301,7.69421080979713e-301,7.689262764324592e-301,7.684314718852054e-301,7.679366673379515e-301,7.674418627906976e-301,7.669470582434438e-301,7.6645225369619e-301,7.659574491489362e-301,7.654626446016824e-301,7.649678400544284e-301,7.644730355071746e-301,7.639782309599208e-301,7.63483426412667e-301,7.629886218654132e-301,7.624938173181594e-301,7.619990127709054e-301,7.615042082236516e-301,7.610094036763978e-301,7.60514599129144e-301,7.600197945818902e-301,7.595249900346364e-301,7.590301854873824e-301,7.585353809401286e-301,7.580405763928748e-301,7.57545771845621e-301,7.570509672983672e-301,7.565561627511134e-301,7.560613582038596e-301,7.555665536566056e-301,7.550717491093518e-301,7.54576944562098e-301,7.540821400148442e-301,7.535873354675904e-301,7.530925309203366e-301,7.525977263730826e-301,7.521029218258288e-301,7.51608117278575e-301,7.511133127313212e-301,7.506185081840674e-301,7.501237036368136e-301,7.496288990895596e-301,7.491340945423058e-301,7.48639289995052e-301,7.481444854477982e-301,7.476496809005443e-301,7.471548763532905e-301,7.466600718060366e-301,7.4616526725878276e-301,7.4567046271152895e-301,7.4517565816427514e-301,7.446808536170213e-301,7.4418604906976744e-301,7.436912445225136e-301,7.431964399752598e-301,7.427016354280059e-301,7.422068308807521e-301,7.417120263334983e-301,7.412172217862444e-301,7.407224172389906e-301,7.402276126917368e-301,7.397328081444829e-301,7.392380035972291e-301,7.387431990499753e-301,7.382483945027214e-301,7.377535899554676e-301,7.372587854082138e-301,7.367639808609599e-301,7.362691763137061e-301,7.357743717664523e-301,7.352795672191984e-301,7.347847626719446e-301,7.342899581246908e-301,7.337951535774369e-301,7.333003490301831e-301,7.328055444829293e-301,7.323107399356754e-301,7.318159353884216e-301,7.313211308411678e-301,7.308263262939139e-301,7.303315217466601e-301,7.298367171994063e-301,7.293419126521524e-301,7.288471081048986e-301,7.283523035576448e-301,7.278574990103909e-301,7.273626944631371e-301,7.268678899158833e-301,7.263730853686294e-301,7.258782808213756e-301,7.2538347627412176e-301,7.248886717268679e-301,7.243938671796141e-301,7.2389906263236025e-301,7.234042580851064e-301,7.2290945353785255e-301,7.2241464899059875e-301,7.2191984444334486e-301,7.2142503989609105e-301,7.209302353488372e-301,7.204354308015834e-301,7.1994062625432954e-301,7.194458217070757e-301,7.189510171598219e-301,7.18456212612568e-301,7.179614080653142e-301,7.174666035180604e-301,7.169717989708065e-301,7.164769944235527e-301,7.159821898762989e-301,7.15487385329045e-301,7.149925807817912e-301,7.144977762345374e-301,7.140029716872835e-301,7.135081671400297e-301,7.130133625927759e-301,7.12518558045522e-301,7.120237534982682e-301,7.115289489510144e-301,7.110341444037605e-301,7.105393398565067e-301,7.100445353092529e-301,7.09549730761999e-301,7.090549262147452e-301,7.085601216674914e-301,7.080653171202375e-301,7.075705125729837e-301,7.070757080257299e-301,7.06580903478476e-301,7.060860989312222e-301,7.055912943839684e-301,7.050964898367145e-301,7.046016852894607e-301,7.041068807422069e-301,7.03612076194953e-301,7.031172716476992e-301,7.026224671004454e-301,7.021276625531915e-301,7.016328580059377e-301,7.0113805345868386e-301,7.0064324891143e-301,7.0014844436417616e-301,6.9965363981692235e-301,6.991588352696685e-301,6.9866403072241465e-301,6.9816922617516084e-301,6.9767442162790695e-301,6.9717961708065315e-301,6.966848125333993e-301,6.961900079861455e-301,6.956952034388916e-301,6.952003988916378e-301,6.94705594344384e-301,6.942107897971301e-301,6.937159852498763e-301,6.932211807026225e-301,6.927263761553686e-301,6.922315716081148e-301,6.91736767060861e-301,6.912419625136071e-301,6.907471579663533e-301,6.902523534190995e-301,6.897575488718456e-301,6.892627443245918e-301,6.88767939777338e-301,6.882731352300841e-301,6.877783306828303e-301,6.872835261355765e-301,6.867887215883226e-301,6.862939170410688e-301,6.85799112493815e-301,6.853043079465611e-301,6.848095033993073e-301,6.843146988520535e-301,6.838198943047996e-301,6.833250897575458e-301,6.82830285210292e-301,6.823354806630381e-301,6.818406761157843e-301,6.813458715685305e-301,6.808510670212766e-301,6.803562624740228e-301,6.79861457926769e-301,6.793666533795151e-301,6.788718488322613e-301,6.783770442850075e-301,6.778822397377536e-301,6.773874351904998e-301,6.7689263064324595e-301,6.763978260959921e-301,6.7590302154873825e-301,6.7540821700148445e-301,6.7491341245423056e-301,6.7441860790697675e-301,6.739238033597229e-301,6.7342899881246905e-301,6.7293419426521524e-301,6.724393897179614e-301,6.719445851707076e-301,6.714497806234537e-301,6.709549760761999e-301,6.704601715289461e-301,6.699653669816922e-301,6.694705624344384e-301,6.689757578871846e-301,6.684809533399307e-301,6.679861487926769e-301,6.674913442454231e-301,6.669965396981692e-301,6.665017351509154e-301,6.660069306036616e-301,6.655121260564077e-301,6.650173215091539e-301,6.645225169619001e-301,6.640277124146462e-301,6.635329078673924e-301,6.630381033201386e-301,6.625432987728847e-301,6.620484942256309e-301,6.615536896783771e-301,6.610588851311232e-301,6.605640805838694e-301,6.600692760366156e-301,6.595744714893617e-301,6.590796669421079e-301,6.585848623948541e-301,6.580900578476002e-301,6.575952533003464e-301,6.571004487530926e-301,6.566056442058387e-301,6.561108396585849e-301,6.556160351113311e-301,6.551212305640772e-301,6.546264260168234e-301,6.5413162146956956e-301,6.536368169223157e-301,6.5314201237506186e-301,6.5264720782780805e-301,6.521524032805542e-301,6.5165759873330035e-301,6.5116279418604654e-301,6.5066798963879265e-301,6.5017318509153885e-301,6.49678380544285e-301,6.4918357599703115e-301,6.486887714497773e-301,6.481939669025235e-301,6.476991623552697e-301,6.472043578080158e-301,6.46709553260762e-301,6.462147487135082e-301,6.457199441662543e-301,6.452251396190005e-301,6.447303350717467e-301,6.442355305244928e-301,6.43740725977239e-301,6.432459214299852e-301,6.427511168827313e-301,6.422563123354775e-301,6.417615077882237e-301,6.412667032409698e-301,6.40771898693716e-301,6.402770941464622e-301,6.397822895992083e-301,6.392874850519545e-301,6.387926805047007e-301,6.382978759574468e-301,6.37803071410193e-301,6.373082668629392e-301,6.368134623156853e-301,6.363186577684315e-301,6.358238532211777e-301,6.353290486739238e-301,6.3483424412667e-301,6.343394395794162e-301,6.338446350321623e-301,6.333498304849085e-301,6.328550259376547e-301,6.323602213904008e-301,6.31865416843147e-301,6.313706122958932e-301,6.308758077486393e-301,6.303810032013855e-301,6.2988619865413165e-301,6.293913941068778e-301,6.2889658955962396e-301,6.2840178501237015e-301,6.2790698046511626e-301,6.2741217591786245e-301,6.2691737137060864e-301,6.2642256682335475e-301,6.2592776227610094e-301,6.254329577288471e-301,6.2493815318159325e-301,6.244433486343394e-301,6.239485440870856e-301,6.234537395398318e-301,6.229589349925779e-301,6.224641304453241e-301,6.219693258980703e-301,6.214745213508164e-301,6.209797168035626e-301,6.204849122563088e-301,6.199901077090549e-301,6.194953031618011e-301,6.190004986145473e-301,6.185056940672934e-301,6.180108895200396e-301,6.175160849727858e-301,6.170212804255319e-301,6.165264758782781e-301,6.160316713310243e-301,6.155368667837704e-301,6.150420622365166e-301,6.145472576892628e-301,6.140524531420089e-301,6.135576485947551e-301,6.130628440475013e-301,6.125680395002474e-301,6.120732349529936e-301,6.115784304057398e-301,6.110836258584859e-301,6.105888213112321e-301,6.100940167639783e-301,6.095992122167244e-301,6.091044076694706e-301,6.086096031222168e-301,6.081147985749629e-301,6.076199940277091e-301,6.0712518948045526e-301,6.066303849332014e-301,6.0613558038594756e-301,6.0564077583869375e-301,6.051459712914399e-301,6.0465116674418605e-301,6.0415636219693224e-301,6.0366155764967835e-301,6.0316675310242455e-301,6.026719485551707e-301,6.0217714400791685e-301,6.01682339460663e-301,6.011875349134092e-301,6.0069273036615534e-301,6.001979258189015e-301,5.997031212716477e-301,5.992083167243939e-301,5.9871351217714e-301,5.982187076298862e-301,5.977239030826324e-301,5.972290985353785e-301,5.967342939881247e-301,5.962394894408709e-301,5.95744684893617e-301,5.952498803463632e-301,5.947550757991094e-301,5.942602712518555e-301,5.937654667046017e-301,5.932706621573479e-301,5.92775857610094e-301,5.922810530628402e-301,5.917862485155864e-301,5.912914439683325e-301,5.907966394210787e-301,5.903018348738249e-301,5.89807030326571e-301,5.893122257793172e-301,5.888174212320634e-301,5.883226166848095e-301,5.878278121375557e-301,5.873330075903019e-301,5.86838203043048e-301,5.863433984957942e-301,5.858485939485404e-301,5.853537894012865e-301,5.848589848540327e-301,5.843641803067789e-301,5.83869375759525e-301,5.833745712122712e-301,5.8287976666501735e-301,5.823849621177635e-301,5.8189015757050966e-301,5.8139535302325585e-301,5.8090054847600196e-301,5.8040574392874815e-301,5.7991093938149434e-301,5.7941613483424045e-301,5.7892133028698664e-301,5.784265257397328e-301,5.7793172119247895e-301,5.774369166452251e-301,5.769421120979713e-301,5.764473075507174e-301,5.759525030034636e-301,5.754576984562098e-301,5.74962893908956e-301,5.744680893617021e-301,5.739732848144483e-301,5.734784802671945e-301,5.729836757199406e-301,5.724888711726868e-301,5.71994066625433e-301,5.714992620781791e-301,5.710044575309253e-301,5.705096529836715e-301,5.700148484364176e-301,5.695200438891638e-301,5.6902523934191e-301,5.685304347946561e-301,5.680356302474023e-301,5.675408257001485e-301,5.670460211528946e-301,5.665512166056408e-301,5.66056412058387e-301,5.655616075111331e-301,5.650668029638793e-301,5.645719984166255e-301,5.640771938693716e-301,5.635823893221178e-301,5.63087584774864e-301,5.625927802276101e-301,5.620979756803563e-301,5.616031711331025e-301,5.611083665858486e-301,5.606135620385948e-301,5.6011875749134096e-301,5.596239529440871e-301,5.591291483968333e-301,5.5863434384957945e-301,5.581395393023256e-301,5.5764473475507175e-301,5.5714993020781795e-301,5.5665512566056405e-301,5.5616032111331025e-301,5.556655165660564e-301,5.5517071201880255e-301,5.546759074715487e-301,5.541811029242949e-301,5.5368629837704104e-301,5.531914938297872e-301,5.526966892825334e-301,5.522018847352795e-301,5.517070801880257e-301,5.512122756407719e-301,5.507174710935181e-301,5.502226665462642e-301,5.497278619990104e-301,5.492330574517566e-301,5.487382529045027e-301,5.482434483572489e-301,5.477486438099951e-301,5.472538392627412e-301,5.467590347154874e-301,5.462642301682336e-301,5.457694256209797e-301,5.452746210737259e-301,5.447798165264721e-301,5.442850119792182e-301,5.437902074319644e-301,5.432954028847106e-301,5.428005983374567e-301,5.423057937902029e-301,5.418109892429491e-301,5.413161846956952e-301,5.408213801484414e-301,5.403265756011876e-301,5.398317710539337e-301,5.393369665066799e-301,5.388421619594261e-301,5.383473574121722e-301,5.378525528649184e-301,5.373577483176646e-301,5.368629437704107e-301,5.363681392231569e-301,5.3587333467590305e-301,5.353785301286492e-301,5.3488372558139536e-301,5.3438892103414155e-301,5.3389411648688766e-301,5.3339931193963385e-301,5.3290450739238004e-301,5.3240970284512615e-301,5.3191489829787234e-301,5.314200937506185e-301,5.3092528920336465e-301,5.304304846561108e-301,5.29935680108857e-301,5.294408755616031e-301,5.289460710143493e-301,5.284512664670955e-301,5.279564619198416e-301,5.274616573725878e-301,5.26966852825334e-301,5.264720482780802e-301,5.259772437308263e-301,5.254824391835725e-301,5.249876346363187e-301,5.244928300890648e-301,5.23998025541811e-301,5.235032209945572e-301,5.230084164473033e-301,5.225136119000495e-301,5.220188073527957e-301,5.215240028055418e-301,5.21029198258288e-301,5.205343937110342e-301,5.200395891637803e-301,5.195447846165265e-301,5.190499800692727e-301,5.185551755220188e-301,5.18060370974765e-301,5.175655664275112e-301,5.170707618802573e-301,5.165759573330035e-301,5.160811527857497e-301,5.155863482384958e-301,5.15091543691242e-301,5.145967391439882e-301,5.141019345967343e-301,5.136071300494805e-301,5.1311232550222666e-301,5.126175209549728e-301,5.12122716407719e-301,5.1162791186046515e-301,5.111331073132113e-301,5.1063830276595745e-301,5.1014349821870365e-301,5.0964869367144976e-301,5.0915388912419595e-301,5.086590845769421e-301,5.0816428002968825e-301,5.0766947548243444e-301,5.071746709351806e-301,5.0667986638792674e-301,5.061850618406729e-301,5.056902572934191e-301,5.051954527461652e-301,5.047006481989114e-301,5.042058436516576e-301,5.037110391044037e-301,5.032162345571499e-301,5.027214300098961e-301,5.022266254626423e-301,5.017318209153884e-301,5.012370163681346e-301,5.007422118208808e-301,5.002474072736269e-301,4.997526027263731e-301,4.992577981791193e-301,4.987629936318654e-301,4.982681890846116e-301,4.977733845373578e-301,4.972785799901039e-301,4.967837754428501e-301,4.962889708955963e-301,4.957941663483424e-301,4.952993618010886e-301,4.948045572538348e-301,4.943097527065809e-301,4.938149481593271e-301,4.933201436120733e-301,4.928253390648194e-301,4.923305345175656e-301,4.918357299703118e-301,4.913409254230579e-301,4.908461208758041e-301,4.903513163285503e-301,4.898565117812964e-301,4.893617072340426e-301,4.8886690268678876e-301,4.883720981395349e-301,4.8787729359228106e-301,4.8738248904502725e-301,4.868876844977734e-301,4.8639287995051955e-301,4.8589807540326574e-301,4.8540327085601185e-301,4.8490846630875805e-301,4.844136617615042e-301,4.8391885721425035e-301,4.834240526669965e-301,4.829292481197427e-301,4.824344435724888e-301,4.81939639025235e-301,4.814448344779812e-301,4.809500299307273e-301,4.804552253834735e-301,4.799604208362197e-301,4.794656162889658e-301,4.78970811741712e-301,4.784760071944582e-301,4.779812026472044e-301,4.774863980999505e-301,4.769915935526967e-301,4.764967890054429e-301,4.76001984458189e-301,4.755071799109352e-301,4.750123753636814e-301,4.745175708164275e-301,4.740227662691737e-301,4.735279617219199e-301,4.73033157174666e-301,4.725383526274122e-301,4.720435480801584e-301,4.715487435329045e-301,4.710539389856507e-301,4.705591344383969e-301,4.70064329891143e-301,4.695695253438892e-301,4.690747207966354e-301,4.685799162493815e-301,4.680851117021277e-301,4.675903071548739e-301,4.6709550260762e-301,4.666006980603662e-301,4.6610589351311236e-301,4.656110889658585e-301,4.651162844186047e-301,4.6462147987135085e-301,4.64126675324097e-301,4.6363187077684315e-301,4.6313706622958935e-301,4.6264226168233546e-301,4.6214745713508165e-301,4.616526525878278e-301,4.6115784804057395e-301,4.6066304349332014e-301,4.601682389460663e-301,4.5967343439881244e-301,4.591786298515586e-301,4.586838253043048e-301,4.581890207570509e-301,4.576942162097971e-301,4.571994116625433e-301,4.567046071152894e-301,4.562098025680356e-301,4.557149980207818e-301,4.55220193473528e-301,4.547253889262741e-301,4.542305843790203e-301,4.537357798317665e-301,4.532409752845126e-301,4.527461707372588e-301,4.52251366190005e-301,4.517565616427511e-301,4.512617570954973e-301,4.507669525482435e-301,4.502721480009896e-301,4.497773434537358e-301,4.49282538906482e-301,4.487877343592281e-301,4.482929298119743e-301,4.477981252647205e-301,4.473033207174666e-301,4.468085161702128e-301,4.46313711622959e-301,4.458189070757051e-301,4.453241025284513e-301,4.448292979811975e-301,4.443344934339436e-301,4.438396888866898e-301,4.43344884339436e-301,4.428500797921821e-301,4.423552752449283e-301,4.4186047069767446e-301,4.413656661504206e-301,4.4087086160316676e-301,4.4037605705591295e-301,4.398812525086591e-301,4.3938644796140525e-301,4.3889164341415144e-301,4.3839683886689755e-301,4.3790203431964375e-301,4.374072297723899e-301,4.3691242522513605e-301,4.364176206778822e-301,4.359228161306284e-301,4.3542801158337454e-301,4.349332070361207e-301,4.344384024888669e-301,4.33943597941613e-301,4.334487933943592e-301,4.329539888471054e-301,4.324591842998515e-301,4.319643797525977e-301,4.314695752053439e-301,4.309747706580901e-301,4.304799661108362e-301,4.299851615635824e-301,4.294903570163286e-301,4.289955524690747e-301,4.285007479218209e-301,4.280059433745671e-301,4.275111388273132e-301,4.270163342800594e-301,4.265215297328056e-301,4.260267251855517e-301,4.255319206382979e-301,4.250371160910441e-301,4.245423115437902e-301,4.240475069965364e-301,4.235527024492826e-301,4.230578979020287e-301,4.225630933547749e-301,4.220682888075211e-301,4.215734842602672e-301,4.210786797130134e-301,4.205838751657596e-301,4.200890706185057e-301,4.195942660712519e-301,4.190994615239981e-301,4.186046569767442e-301,4.181098524294904e-301,4.1761504788223655e-301,4.171202433349827e-301,4.1662543878772885e-301,4.1613063424047505e-301,4.1563582969322116e-301,4.1514102514596735e-301,4.146462205987135e-301,4.1415141605145965e-301,4.1365661150420584e-301,4.13161806956952e-301,4.1266700240969814e-301,4.121721978624443e-301,4.116773933151905e-301,4.111825887679366e-301,4.106877842206828e-301,4.10192979673429e-301,4.096981751261751e-301,4.092033705789213e-301,4.087085660316675e-301,4.082137614844136e-301,4.077189569371598e-301,4.07224152389906e-301,4.067293478426522e-301,4.062345432953983e-301,4.057397387481445e-301,4.052449342008907e-301,4.047501296536368e-301,4.04255325106383e-301,4.037605205591292e-301,4.032657160118753e-301,4.027709114646215e-301,4.022761069173677e-301,4.017813023701138e-301,4.0128649782286e-301,4.007916932756062e-301,4.002968887283523e-301,3.998020841810985e-301,3.993072796338447e-301,3.988124750865908e-301,3.98317670539337e-301,3.978228659920832e-301,3.973280614448293e-301,3.968332568975755e-301,3.963384523503217e-301,3.958436478030678e-301,3.95348843255814e-301,3.9485403870856016e-301,3.943592341613063e-301,3.9386442961405246e-301,3.9336962506679865e-301,3.928748205195448e-301,3.9238001597229095e-301,3.9188521142503714e-301,3.9139040687778325e-301,3.9089560233052945e-301,3.904007977832756e-301,3.8990599323602175e-301,3.894111886887679e-301,3.889163841415141e-301,3.8842157959426024e-301,3.879267750470064e-301,3.874319704997526e-301,3.869371659524987e-301,3.864423614052449e-301,3.859475568579911e-301,3.854527523107372e-301,3.849579477634834e-301,3.844631432162296e-301,3.839683386689757e-301,3.834735341217219e-301,3.829787295744681e-301,3.824839250272143e-301,3.819891204799604e-301,3.814943159327066e-301,3.809995113854528e-301,3.805047068381989e-301,3.800099022909451e-301,3.795150977436913e-301,3.790202931964374e-301,3.785254886491836e-301,3.780306841019298e-301,3.775358795546759e-301,3.770410750074221e-301,3.765462704601683e-301,3.760514659129144e-301,3.755566613656606e-301,3.750618568184068e-301,3.745670522711529e-301,3.740722477238991e-301,3.735774431766453e-301,3.730826386293914e-301,3.7258783408213757e-301,3.720930295348837e-301,3.715982249876299e-301,3.7110342044037606e-301,3.706086158931222e-301,3.701138113458684e-301,3.6961900679861456e-301,3.691242022513607e-301,3.686293977041069e-301,3.6813459315685305e-301,3.676397886095992e-301,3.671449840623454e-301,3.6665017951509154e-301,3.661553749678377e-301,3.656605704205839e-301,3.6516576587333004e-301,3.646709613260762e-301,3.641761567788224e-301,3.6368135223156853e-301,3.6318654768431472e-301,3.6269174313706087e-301,3.6219693858980703e-301,3.617021340425532e-301,3.6120732949529937e-301,3.607125249480455e-301,3.602177204007917e-301,3.5972291585353786e-301,3.59228111306284e-301,3.587333067590302e-301,3.5823850221177636e-301,3.577436976645225e-301,3.572488931172687e-301,3.5675408857001485e-301,3.56259284022761e-301,3.557644794755072e-301,3.5526967492825335e-301,3.547748703809995e-301,3.542800658337457e-301,3.5378526128649184e-301,3.53290456739238e-301,3.527956521919842e-301,3.5230084764473033e-301,3.5180604309747653e-301,3.5131123855022268e-301,3.5081643400296883e-301,3.50321629455715e-301,3.4982682490846117e-301,3.4933202036120732e-301,3.488372158139535e-301,3.4834241126669966e-301,3.478476067194458e-301,3.47352802172192e-301,3.4685799762493816e-301,3.463631930776843e-301,3.458683885304305e-301,3.4537358398317665e-301,3.448787794359228e-301,3.44383974888669e-301,3.4388917034141515e-301,3.433943657941613e-301,3.428995612469075e-301,3.4240475669965364e-301,3.419099521523998e-301,3.41415147605146e-301,3.4092034305789214e-301,3.404255385106383e-301,3.3993073396338448e-301,3.3943592941613063e-301,3.3894112486887682e-301,3.3844632032162297e-301,3.3795151577436912e-301,3.374567112271153e-301,3.3696190667986147e-301,3.364671021326076e-301,3.359722975853538e-301,3.3547749303809996e-301,3.349826884908461e-301,3.344878839435923e-301,3.3399307939633845e-301,3.334982748490846e-301,3.330034703018308e-301,3.3250866575457695e-301,3.320138612073231e-301,3.315190566600693e-301,3.3102425211281544e-301,3.305294475655616e-301,3.300346430183078e-301,3.2953983847105394e-301,3.290450339238001e-301,3.285502293765463e-301,3.2805542482929243e-301,3.2756062028203862e-301,3.2706581573478477e-301,3.2657101118753092e-301,3.260762066402771e-301,3.2558140209302327e-301,3.250865975457694e-301,3.245917929985156e-301,3.2409698845126176e-301,3.236021839040079e-301,3.231073793567541e-301,3.2261257480950026e-301,3.221177702622464e-301,3.216229657149926e-301,3.2112816116773875e-301,3.206333566204849e-301,3.201385520732311e-301,3.1964374752597724e-301,3.191489429787234e-301,3.186541384314696e-301,3.1815933388421574e-301,3.176645293369619e-301,3.171697247897081e-301,3.1667492024245423e-301,3.161801156952004e-301,3.1568531114794658e-301,3.1519050660069273e-301,3.146957020534389e-301,3.1420089750618507e-301,3.137060929589312e-301,3.132112884116774e-301,3.1271648386442356e-301,3.122216793171697e-301,3.117268747699159e-301,3.1123207022266206e-301,3.107372656754082e-301,3.102424611281544e-301,3.0974765658090055e-301,3.092528520336467e-301,3.087580474863929e-301,3.0826324293913905e-301,3.077684383918852e-301,3.072736338446314e-301,3.0677882929737754e-301,3.062840247501237e-301,3.057892202028699e-301,3.0529441565561603e-301,3.047996111083622e-301,3.0430480656110838e-301,3.0381000201385453e-301,3.033151974666007e-301,3.0282039291934687e-301,3.0232558837209302e-301,3.018307838248392e-301,3.0133597927758537e-301,3.008411747303315e-301,3.003463701830777e-301,2.9985156563582386e-301,2.9935676108857e-301,2.988619565413162e-301,2.9836715199406235e-301,2.978723474468085e-301,2.973775428995547e-301,2.9688273835230085e-301,2.96387933805047e-301,2.958931292577932e-301,2.9539832471053934e-301,2.949035201632855e-301,2.944087156160317e-301,2.9391391106877784e-301,2.93419106521524e-301,2.9292430197427018e-301,2.9242949742701633e-301,2.919346928797625e-301,2.9143988833250867e-301,2.9094508378525482e-301,2.90450279238001e-301,2.8995547469074717e-301,2.894606701434933e-301,2.889658655962395e-301,2.8847106104898566e-301,2.879762565017318e-301,2.87481451954478e-301,2.8698664740722416e-301,2.864918428599703e-301,2.859970383127165e-301,2.8550223376546265e-301,2.850074292182088e-301,2.84512624670955e-301,2.8401782012370114e-301,2.835230155764473e-301,2.830282110291935e-301,2.8253340648193964e-301,2.820386019346858e-301,2.81543797387432e-301,2.8104899284017813e-301,2.805541882929243e-301,2.8005938374567047e-301,2.7956457919841663e-301,2.790697746511628e-301,2.7857497010390897e-301,2.780801655566551e-301,2.775853610094013e-301,2.7709055646214746e-301,2.765957519148936e-301,2.761009473676398e-301,2.7560614282038596e-301,2.751113382731321e-301,2.746165337258783e-301,2.7412172917862445e-301,2.736269246313706e-301,2.731321200841168e-301,2.7263731553686294e-301,2.721425109896091e-301,2.716477064423553e-301,2.7115290189510144e-301,2.706580973478476e-301,2.701632928005938e-301,2.6966848825333993e-301,2.691736837060861e-301,2.6867887915883228e-301,2.6818407461157843e-301,2.6768927006432458e-301,2.6719446551707077e-301,2.6669966096981692e-301,2.662048564225631e-301,2.6571005187530926e-301,2.652152473280554e-301,2.647204427808016e-301,2.6422563823354776e-301,2.637308336862939e-301,2.632360291390401e-301,2.6274122459178625e-301,2.622464200445324e-301,2.617516154972786e-301,2.6125681095002475e-301,2.607620064027709e-301,2.602672018555171e-301,2.5977239730826324e-301,2.592775927610094e-301,2.587827882137556e-301,2.5828798366650173e-301,2.577931791192479e-301,2.5729837457199408e-301,2.5680357002474023e-301,2.563087654774864e-301,2.5581396093023257e-301,2.5531915638297872e-301,2.548243518357249e-301,2.5432954728847107e-301,2.538347427412172e-301,2.533399381939634e-301,2.5284513364670956e-301,2.523503290994557e-301,2.518555245522019e-301,2.5136072000494805e-301,2.508659154576942e-301,2.503711109104404e-301,2.4987630636318655e-301,2.493815018159327e-301,2.488866972686789e-301,2.4839189272142504e-301,2.478970881741712e-301,2.474022836269174e-301,2.4690747907966354e-301,2.464126745324097e-301,2.459178699851559e-301,2.4542306543790203e-301,2.449282608906482e-301,2.4443345634339437e-301,2.4393865179614052e-301,2.4344384724888668e-301,2.4294904270163287e-301,2.42454238154379e-301,2.419594336071252e-301,2.4146462905987136e-301,2.409698245126175e-301,2.404750199653637e-301,2.3998021541810986e-301,2.39485410870856e-301,2.389906063236022e-301,2.3849580177634835e-301,2.380009972290945e-301,2.375061926818407e-301,2.3701138813458684e-301,2.36516583587333e-301,2.360217790400792e-301,2.3552697449282534e-301,2.350321699455715e-301,2.345373653983177e-301,2.3404256085106383e-301,2.3354775630381e-301,2.3305295175655618e-301,2.3255814720930233e-301,2.3206334266204848e-301,2.3156853811479467e-301,2.310737335675408e-301,2.30578929020287e-301,2.3008412447303316e-301,2.295893199257793e-301,2.290945153785255e-301,2.2859971083127166e-301,2.281049062840178e-301,2.27610101736764e-301,2.2711529718951015e-301,2.266204926422563e-301,2.261256880950025e-301,2.2563088354774865e-301,2.251360790004948e-301,2.24641274453241e-301,2.2414646990598714e-301,2.236516653587333e-301,2.231568608114795e-301,2.2266205626422563e-301,2.221672517169718e-301,2.2167244716971798e-301,2.2117764262246413e-301,2.2068283807521028e-301,2.2018803352795647e-301,2.1969322898070262e-301,2.1919842443344877e-301,2.1870361988619496e-301,2.182088153389411e-301,2.177140107916873e-301,2.1721920624443346e-301,2.167244016971796e-301,2.162295971499258e-301,2.1573479260267195e-301,2.152399880554181e-301,2.147451835081643e-301,2.1425037896091045e-301,2.137555744136566e-301,2.132607698664028e-301,2.1276596531914894e-301,2.122711607718951e-301,2.117763562246413e-301,2.1128155167738744e-301,2.107867471301336e-301,2.1029194258287978e-301,2.0979713803562593e-301,2.093023334883721e-301,2.0880752894111827e-301,2.0831272439386442e-301,2.0781791984661057e-301,2.0732311529935677e-301,2.068283107521029e-301,2.063335062048491e-301,2.0583870165759526e-301,2.053438971103414e-301,2.048490925630876e-301,2.0435428801583375e-301,2.038594834685799e-301,2.033646789213261e-301,2.0286987437407225e-301,2.023750698268184e-301,2.018802652795646e-301,2.0138546073231074e-301,2.008906561850569e-301,2.003958516378031e-301,1.9990104709054924e-301,1.994062425432954e-301,1.989114379960416e-301,1.9841663344878773e-301,1.979218289015339e-301,1.9742702435428007e-301,1.9693221980702622e-301,1.9643741525977238e-301,1.9594261071251857e-301,1.954478061652647e-301,1.949530016180109e-301,1.9445819707075706e-301,1.939633925235032e-301,1.934685879762494e-301,1.9297378342899556e-301,1.924789788817417e-301,1.919841743344879e-301,1.9148936978723405e-301,1.909945652399802e-301,1.904997606927264e-301,1.9000495614547254e-301,1.895101515982187e-301,1.890153470509649e-301,1.8852054250371104e-301,1.880257379564572e-301,1.875309334092034e-301,1.8703612886194953e-301,1.865413243146957e-301,1.8604651976744185e-301,1.8555171522018803e-301,1.850569106729342e-301,1.8456210612568037e-301,1.8406730157842652e-301,1.835724970311727e-301,1.8307769248391886e-301,1.8258288793666501e-301,1.8208808338941119e-301,1.8159327884215736e-301,1.810984742949035e-301,1.8060366974764968e-301,1.8010886520039585e-301,1.7961406065314202e-301,1.7911925610588817e-301,1.7862445155863435e-301,1.7812964701138052e-301,1.7763484246412667e-301,1.7714003791687284e-301,1.7664523336961901e-301,1.7615042882236516e-301,1.7565562427511133e-301,1.751608197278575e-301,1.7466601518060366e-301,1.7417121063334983e-301,1.73676406086096e-301,1.7318160153884217e-301,1.7268679699158832e-301,1.721919924443345e-301,1.7169718789708067e-301,1.7120238334982682e-301,1.7070757880257299e-301,1.7021277425531916e-301,1.697179697080653e-301,1.6922316516081148e-301,1.6872836061355765e-301,1.682335560663038e-301,1.6773875151904998e-301,1.6724394697179615e-301,1.6674914242454232e-301,1.6625433787728847e-301,1.6575953333003464e-301,1.6526472878278081e-301,1.6476992423552696e-301,1.6427511968827314e-301,1.637803151410193e-301,1.6328551059376546e-301,1.6279070604651163e-301,1.622959014992578e-301,1.6180109695200395e-301,1.6130629240475012e-301,1.608114878574963e-301,1.6031668331024247e-301,1.5982187876298862e-301,1.5932707421573479e-301,1.5883226966848096e-301,1.5833746512122711e-301,1.5784266057397328e-301,1.5734785602671946e-301,1.568530514794656e-301,1.5635824693221178e-301,1.5586344238495795e-301,1.5536863783770412e-301,1.5487383329045027e-301,1.5437902874319644e-301,1.5388422419594261e-301,1.5338941964868877e-301,1.5289461510143494e-301,1.523998105541811e-301,1.5190500600692726e-301,1.5141020145967343e-301,1.509153969124196e-301,1.5042059236516575e-301,1.4992578781791193e-301,1.494309832706581e-301,1.4893617872340427e-301,1.4844137417615042e-301,1.479465696288966e-301,1.4745176508164276e-301,1.4695696053438891e-301,1.4646215598713509e-301,1.4596735143988126e-301,1.454725468926274e-301,1.4497774234537358e-301,1.4448293779811975e-301,1.439881332508659e-301,1.4349332870361207e-301,1.4299852415635824e-301,1.4250371960910442e-301,1.4200891506185057e-301,1.4151411051459674e-301,1.4101930596734291e-301,1.4052450142008906e-301,1.4002969687283523e-301,1.395348923255814e-301,1.3904008777832756e-301,1.3854528323107373e-301,1.380504786838199e-301,1.3755567413656605e-301,1.3706086958931222e-301,1.365660650420584e-301,1.3607126049480456e-301,1.3557645594755072e-301,1.3508165140029689e-301,1.3458684685304306e-301,1.340920423057892e-301,1.3359723775853538e-301,1.3310243321128155e-301,1.326076286640277e-301,1.3211282411677387e-301,1.3161801956952005e-301,1.3112321502226622e-301,1.3062841047501237e-301,1.3013360592775854e-301,1.2963880138050471e-301,1.2914399683325086e-301,1.2864919228599703e-301,1.281543877387432e-301,1.2765958319148936e-301,1.2716477864423553e-301,1.266699740969817e-301,1.2617516954972785e-301,1.2568036500247402e-301,1.251855604552202e-301,1.2469075590796637e-301,1.2419595136071252e-301,1.2370114681345869e-301,1.2320634226620486e-301,1.2271153771895101e-301,1.2221673317169718e-301,1.2172192862444335e-301,1.212271240771895e-301,1.2073231952993568e-301,1.2023751498268185e-301,1.19742710435428e-301,1.1924790588817417e-301,1.1875310134092034e-301,1.1825829679366651e-301,1.1776349224641266e-301,1.1726868769915884e-301,1.16773883151905e-301,1.1627907860465116e-301,1.1578427405739733e-301,1.152894695101435e-301,1.1479466496288965e-301,1.1429986041563582e-301,1.13805055868382e-301,1.1331025132112815e-301,1.1281544677387432e-301,1.123206422266205e-301,1.1182583767936666e-301,1.1133103313211281e-301,1.1083622858485898e-301,1.1034142403760516e-301,1.098466194903513e-301,1.0935181494309748e-301,1.0885701039584365e-301,1.083622058485898e-301,1.0786740130133597e-301,1.0737259675408214e-301,1.0687779220682832e-301,1.0638298765957447e-301,1.0588818311232064e-301,1.053933785650668e-301,1.0489857401781296e-301,1.0440376947055913e-301,1.039089649233053e-301,1.0341416037605145e-301,1.0291935582879763e-301,1.024245512815438e-301,1.0192974673428995e-301,1.0143494218703612e-301,1.009401376397823e-301,1.0044533309252846e-301,9.995052854527461e-302,9.945572399802079e-302,9.896091945076696e-302,9.84661149035131e-302,9.797131035625928e-302,9.747650580900545e-302,9.69817012617516e-302,9.648689671449777e-302,9.599209216724395e-302,9.54972876199901e-302,9.500248307273627e-302,9.450767852548244e-302,9.401287397822861e-302,9.351806943097476e-302,9.302326488372093e-302,9.25284603364671e-302,9.203365578921327e-302,9.153885124195943e-302,9.104404669470559e-302,9.054924214745176e-302,9.005443760019792e-302,8.955963305294409e-302,8.906482850569025e-302,8.857002395843642e-302,8.807521941118259e-302,8.758041486392875e-302,8.708561031667492e-302,8.659080576942108e-302,8.609600122216724e-302,8.560119667491341e-302,8.510639212765958e-302,8.461158758040574e-302,8.411678303315191e-302,8.362197848589807e-302,8.312717393864424e-302,8.26323693913904e-302,8.213756484413656e-302,8.164276029688274e-302,8.11479557496289e-302,8.065315120237507e-302,8.015834665512123e-302,7.966354210786739e-302,7.916873756061356e-302,7.867393301335972e-302,7.81791284661059e-302,7.768432391885206e-302,7.718951937159822e-302,7.669471482434439e-302,7.619991027709055e-302,7.570510572983671e-302,7.521030118258288e-302,7.471549663532904e-302,7.422069208807522e-302,7.372588754082138e-302,7.323108299356754e-302,7.273627844631371e-302,7.224147389905987e-302,7.174666935180604e-302,7.12518648045522e-302,7.075706025729837e-302,7.026225571004454e-302,6.97674511627907e-302,6.927264661553687e-302,6.877784206828303e-302,6.828303752102919e-302,6.778823297377536e-302,6.729342842652153e-302,6.679862387926769e-302,6.630381933201386e-302,6.580901478476002e-302,6.531421023750619e-302,6.481940569025235e-302,6.432460114299851e-302,6.382979659574468e-302,6.333499204849085e-302,6.284018750123702e-302,6.234538295398318e-302,6.185057840672934e-302,6.135577385947551e-302,6.086096931222167e-302,6.036616476496783e-302,5.987136021771401e-302,5.937655567046017e-302,5.888175112320634e-302,5.83869465759525e-302,5.789214202869866e-302,5.739733748144483e-302,5.690253293419099e-302,5.640772838693717e-302,5.591292383968333e-302,5.541811929242949e-302,5.492331474517566e-302,5.442851019792182e-302,5.393370565066799e-302,5.343890110341415e-302,5.294409655616031e-302,5.244929200890649e-302,5.195448746165265e-302,5.145968291439881e-302,5.096487836714498e-302,5.047007381989114e-302,4.997526927263731e-302,4.948046472538347e-302,4.898566017812964e-302,4.849085563087581e-302,4.799605108362197e-302,4.750124653636814e-302,4.70064419891143e-302,4.651163744186047e-302,4.601683289460663e-302,4.5522028347352795e-302,4.502722380009896e-302,4.453241925284513e-302,4.4037614705591295e-302,4.3542810158337456e-302,4.304800561108362e-302,4.255320106382979e-302,4.2058396516575955e-302,4.1563591969322116e-302,4.1068787422068283e-302,4.057398287481445e-302,4.0079178327560616e-302,3.958437378030678e-302,3.9089569233052943e-302,3.859476468579911e-302,3.8099960138545276e-302,3.760515559129144e-302,3.7110351044037604e-302,3.661554649678377e-302,3.6120741949529937e-302,3.5625937402276103e-302,3.513113285502227e-302,3.463632830776843e-302,3.4141523760514597e-302,3.3646719213260763e-302,3.315191466600693e-302,3.265711011875309e-302,3.216230557149926e-302,3.1667501024245424e-302,3.117269647699159e-302,3.0677891929737757e-302,3.018308738248392e-302,2.9688282835230084e-302,2.919347828797625e-302,2.8698673740722417e-302,2.820386919346858e-302,2.7709064646214745e-302,2.721426009896091e-302,2.671945555170708e-302,2.6224651004453244e-302,2.5729846457199405e-302,2.523504190994557e-302,2.474023736269174e-302,2.4245432815437905e-302,2.3750628268184066e-302,2.3255823720930232e-302,2.27610191736764e-302,2.2266214626422563e-302,2.177141007916873e-302,2.1276605531914895e-302,2.078180098466106e-302,2.0286996437407226e-302,1.979219189015339e-302,1.9297387342899556e-302,1.880258279564572e-302,1.8307778248391886e-302,1.781297370113805e-302,1.7318169153884216e-302,1.682336460663038e-302,1.6328560059376547e-302,1.5833755512122713e-302,1.5338950964868877e-302,1.4844146417615043e-302,1.4349341870361207e-302,1.3854537323107373e-302,1.3359732775853537e-302,1.2864928228599704e-302,1.2370123681345868e-302,1.1875319134092034e-302,1.1380514586838199e-302,1.0885710039584364e-302,1.0390905492330529e-302,9.896100945076694e-303,9.401296397822861e-303,8.906491850569026e-303,8.411687303315191e-303,7.916882756061356e-303,7.422078208807521e-303,6.927273661553686e-303,6.432469114299852e-303,5.937664567046017e-303,5.4428600197921824e-303,4.9480554725383475e-303,4.4532509252845127e-303,3.958446378030678e-303,3.4636418307768435e-303,2.9688372835230087e-303,2.4740327362691738e-303,1.979228189015339e-303,1.4844236417615043e-303,9.896190945076695e-304,4.9481454725383475e-304,1.0000000000001017e-308]}

},{}],97:[function(require,module,exports){
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
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var EPS = require( '@stdlib/constants/float64/eps' );
var abs = require( '@stdlib/math/base/special/abs' );
var coth = require( './../lib' );


// FIXTURES //

var data = require( './fixtures/julia/data.json' );
var tinyNegative = require( './fixtures/julia/tiny_negative.json' );
var tinyPositive = require( './fixtures/julia/tiny_positive.json' );
var largeNegative = require( './fixtures/julia/large_negative.json' );
var largePositive = require( './fixtures/julia/large_positive.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof coth, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function computes the hyperbolic cotangent', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = data.x;
	expected = data.expected;

	for ( i = 0; i < x.length; i++ ) {
		if ( isNegativeZero( x[ i ] ) || isPositiveZero( x[ i ] ) ) {
			continue;
		}
		y = coth( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. Expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.75 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. Value: '+y+'. Expected: '+expected[i]+'. Tolerance: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic cotangent (tiny negative)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = tinyNegative.x;
	expected = tinyNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = coth( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. Expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. Value: '+y+'. Expected: '+expected[i]+'. Tolerance: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic cotangent (tiny positive)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = tinyPositive.x;
	expected = tinyPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = coth( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. Expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. Value: '+y+'. Expected: '+expected[i]+'. Tolerance: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic cotangent (large negative)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = largeNegative.x;
	expected = largeNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = coth( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. Expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. Value: '+y+'. Expected: '+expected[i]+'. Tolerance: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic cotangent (large positive)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = largePositive.x;
	expected = largePositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = coth( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. Expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. Value: '+y+'. Expected: '+expected[i]+'. Tolerance: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function returns `NaN` if provided a `NaN`', function test( t ) {
	var v = coth( NaN );
	t.equal( isnan( v ), true, 'returns NaN' );
	t.end();
});

tape( 'the function returns `-Infinity` if provided `-0`', function test( t ) {
	var v = coth( -0.0 );
	t.equal( v, NINF, 'returns -Infinity' );
	t.end();
});

tape( 'the function returns `+Infinity` if provided `+0`', function test( t ) {
	var v = coth( +0.0 );
	t.equal( v, PINF, 'returns +Infinity' );
	t.end();
});

tape( 'the function returns `1.0` if provided `+Infinity`', function test( t ) {
	var v = coth( PINF );
	t.equal( v, 1.0, 'returns 1.0' );
	t.end();
});

tape( 'the function returns `-1.0` if provided `-Infinity`', function test( t ) {
	var v = coth( NINF );
	t.equal( v, -1.0, 'returns -1.0' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/coth/test/test.js")
},{"./../lib":90,"./fixtures/julia/data.json":92,"./fixtures/julia/large_negative.json":93,"./fixtures/julia/large_positive.json":94,"./fixtures/julia/tiny_negative.json":95,"./fixtures/julia/tiny_positive.json":96,"@stdlib/constants/float64/eps":62,"@stdlib/constants/float64/ninf":70,"@stdlib/constants/float64/pinf":71,"@stdlib/math/base/assert/is-nan":78,"@stdlib/math/base/assert/is-negative-zero":80,"@stdlib/math/base/assert/is-positive-zero":82,"@stdlib/math/base/special/abs":84,"tape":306}],98:[function(require,module,exports){
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
var tryRequire = require( '@stdlib/utils/try-require' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var EPS = require( '@stdlib/constants/float64/eps' );
var abs = require( '@stdlib/math/base/special/abs' );


// VARIABLES //

var coth = tryRequire( resolve( __dirname, './../lib/native.js' ) );
var opts = {
	'skip': ( coth instanceof Error )
};


// FIXTURES //

var data = require( './fixtures/julia/data.json' );
var tinyNegative = require( './fixtures/julia/tiny_negative.json' );
var tinyPositive = require( './fixtures/julia/tiny_positive.json' );
var largeNegative = require( './fixtures/julia/large_negative.json' );
var largePositive = require( './fixtures/julia/large_positive.json' );


// TESTS //

tape( 'main export is a function', opts, function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof coth, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function computes the hyperbolic cotangent', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = data.x;
	expected = data.expected;

	for ( i = 0; i < x.length; i++ ) {
		if ( isNegativeZero( x[ i ] ) || isPositiveZero( x[ i ] ) ) {
			continue;
		}
		y = coth( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. Expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.75 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. Value: '+y+'. Expected: '+expected[i]+'. Tolerance: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic cotangent (tiny negative)', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = tinyNegative.x;
	expected = tinyNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = coth( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. Expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. Value: '+y+'. Expected: '+expected[i]+'. Tolerance: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic cotangent (tiny positive)', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = tinyPositive.x;
	expected = tinyPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = coth( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. Expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. Value: '+y+'. Expected: '+expected[i]+'. Tolerance: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic cotangent (large negative)', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = largeNegative.x;
	expected = largeNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = coth( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. Expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. Value: '+y+'. Expected: '+expected[i]+'. Tolerance: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic cotangent (large positive)', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = largePositive.x;
	expected = largePositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = coth( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. Expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. Value: '+y+'. Expected: '+expected[i]+'. Tolerance: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function returns `NaN` if provided a `NaN`', opts, function test( t ) {
	var v = coth( NaN );
	t.equal( isnan( v ), true, 'returns NaN' );
	t.end();
});

tape( 'the function returns `-Infinity` if provided `-0`', opts, function test( t ) {
	var v = coth( -0.0 );
	t.equal( v, NINF, 'returns -Infinity' );
	t.end();
});

tape( 'the function returns `+Infinity` if provided `+0`', opts, function test( t ) {
	var v = coth( +0.0 );
	t.equal( v, PINF, 'returns +Infinity' );
	t.end();
});

tape( 'the function returns `1.0` if provided `+Infinity`', opts, function test( t ) {
	var v = coth( PINF );
	t.equal( v, 1.0, 'returns 1.0' );
	t.end();
});

tape( 'the function returns `-1.0` if provided `-Infinity`', opts, function test( t ) {
	var v = coth( NINF );
	t.equal( v, -1.0, 'returns -1.0' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/coth/test/test.native.js","/lib/node_modules/@stdlib/math/base/special/coth/test")
},{"./fixtures/julia/data.json":92,"./fixtures/julia/large_negative.json":93,"./fixtures/julia/large_positive.json":94,"./fixtures/julia/tiny_negative.json":95,"./fixtures/julia/tiny_positive.json":96,"@stdlib/constants/float64/eps":62,"@stdlib/constants/float64/ninf":70,"@stdlib/constants/float64/pinf":71,"@stdlib/math/base/assert/is-nan":78,"@stdlib/math/base/assert/is-negative-zero":80,"@stdlib/math/base/assert/is-positive-zero":82,"@stdlib/math/base/special/abs":84,"@stdlib/utils/try-require":174,"path":188,"tape":306}],99:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The following copyrights, licenses, and long comment were part of the original implementation available as part of [Go]{@link https://github.com/golang/go/blob/cb07765045aed5104a3df31507564ac99e6ddce8/src/math/exp.go}, which in turn was based on an implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_exp.c}. The implementation follows the original, but has been modified for JavaScript.
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

var ldexp = require( '@stdlib/math/base/special/ldexp' );
var polyvalP = require( './polyval_p.js' );


// MAIN //

/**
* Computes \\(e^{r} 2^k\\) where \\(r = \mathrm{hi} - \mathrm{lo}\\) and \\(|r| \leq \ln(2)/2\\).
*
* @private
* @param {number} hi - upper bound
* @param {number} lo - lower bound
* @param {integer} k - power of 2
* @returns {number} function value
*/
function expmulti( hi, lo, k ) {
	var r;
	var t;
	var c;
	var y;

	r = hi - lo;
	t = r * r;
	c = r - ( t*polyvalP( t ) );
	y = 1.0 - ( lo - ( (r*c)/(2.0-c) ) - hi );

	return ldexp( y, k );
}


// EXPORTS //

module.exports = expmulti;

},{"./polyval_p.js":102,"@stdlib/math/base/special/ldexp":105}],100:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Evaluate the natural exponential function.
*
* @module @stdlib/math/base/special/exp
*
* @example
* var exp = require( '@stdlib/math/base/special/exp' );
*
* var v = exp( 4.0 );
* // returns ~54.5982
*
* v = exp( -9.0 );
* // returns ~1.234e-4
*
* v = exp( 0.0 );
* // returns 1.0
*
* v = exp( NaN );
* // returns NaN
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":101}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The following copyrights, licenses, and long comment were part of the original implementation available as part of [Go]{@link https://github.com/golang/go/blob/cb07765045aed5104a3df31507564ac99e6ddce8/src/math/exp.go}, which in turn was based on an implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_exp.c}. The implementation follows the original, but has been modified for JavaScript.
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

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var trunc = require( '@stdlib/math/base/special/trunc' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var expmulti = require( './expmulti.js' );


// VARIABLES //

var LN2_HI = 6.93147180369123816490e-01;
var LN2_LO = 1.90821492927058770002e-10;
var LOG2_E = 1.44269504088896338700e+00;
var OVERFLOW = 7.09782712893383973096e+02;
var UNDERFLOW = -7.45133219101941108420e+02;
var NEARZERO = 1.0 / (1 << 28); // 2^-28
var NEG_NEARZERO = -NEARZERO;


// MAIN //

/**
* Evaluates the natural exponential function.
*
* ## Method
*
* 1.  We reduce \\( x \\) to an \\( r \\) so that \\( |r| \leq 0.5 \cdot \ln(2) \approx 0.34658 \\). Given \\( x \\), we find an \\( r \\) and integer \\( k \\) such that
*
*     ```tex
*     \begin{align*}
*     x &= k \cdot \ln(2) + r \\
*     |r| &\leq 0.5 \cdot \ln(2)
*     \end{align*}
*     ```
*
*     <!-- <note> -->
*
*     \\( r \\) can be represented as \\( r = \mathrm{hi} - \mathrm{lo} \\) for better accuracy.
*
*     <!-- </note> -->
*
* 2.  We approximate of \\( e^{r} \\) by a special rational function on the interval \\(\[0,0.34658]\\):
*
*     ```tex
*     \begin{align*}
*     R\left(r^2\right) &= r \cdot \frac{ e^{r}+1 }{ e^{r}-1 } \\
*     &= 2 + \frac{r^2}{6} - \frac{r^4}{360} + \ldots
*     \end{align*}
*     ```
*
*     We use a special Remes algorithm on \\(\[0,0.34658]\\) to generate a polynomial of degree \\(5\\) to approximate \\(R\\). The maximum error of this polynomial approximation is bounded by \\(2^{-59}\\). In other words,
*
*     ```tex
*     R(z) \sim 2 + P_1 z + P_2 z^2 + P_3 z^3 + P_4 z^4 + P_5 z^5
*     ```
*
*     where \\( z = r^2 \\) and
*
*     ```tex
*     \left|  2 + P_1 z + \ldots + P_5 z^5  - R(z) \right| \leq 2^{-59}
*     ```
*
*     <!-- <note> -->
*
*     The values of \\( P_1 \\) to \\( P_5 \\) are listed in the source code.
*
*     <!-- </note> -->
*
*     The computation of \\( e^{r} \\) thus becomes
*
*     ```tex
*     \begin{align*}
*     e^{r} &= 1 + \frac{2r}{R-r} \\
*           &= 1 + r + \frac{r \cdot R_1(r)}{2 - R_1(r)}\ \text{for better accuracy}
*     \end{align*}
*     ```
*
*     where
*
*     ```tex
*     R_1(r) = r - P_1\ r^2 + P_2\ r^4 + \ldots + P_5\ r^{10}
*     ```
*
* 3.  We scale back to obtain \\( e^{x} \\). From step 1, we have
*
*     ```tex
*     e^{x} = 2^k e^{r}
*     ```
*
* ## Special Cases
*
* ```tex
* \begin{align*}
* e^\infty &= \infty \\
* e^{-\infty} &= 0 \\
* e^{\mathrm{NaN}} &= \mathrm{NaN} \\
* e^0 &= 1\ \mathrm{is\ exact\ for\ finite\ argument\ only}
* \end{align*}
* ```
*
* ## Notes
*
* -   According to an error analysis, the error is always less than \\(1\\) ulp (unit in the last place).
*
* -   For an IEEE double,
*
*     -   if \\(x > 7.09782712893383973096\mbox{e+}02\\), then \\(e^{x}\\) overflows
*     -   if \\(x < -7.45133219101941108420\mbox{e+}02\\), then \\(e^{x}\\) underflows
*
* -   The hexadecimal values included in the source code are the intended ones for the used constants. Decimal values may be used, provided that the compiler will convert from decimal to binary accurately enough to produce the intended hexadecimal values.
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = exp( 4.0 );
* // returns ~54.5982
*
* @example
* var v = exp( -9.0 );
* // returns ~1.234e-4
*
* @example
* var v = exp( 0.0 );
* // returns 1.0
*
* @example
* var v = exp( NaN );
* // returns NaN
*/
function exp( x ) {
	var hi;
	var lo;
	var k;

	if ( isnan( x ) || x === PINF ) {
		return x;
	}
	if ( x === NINF ) {
		return 0.0;
	}
	if ( x > OVERFLOW ) {
		return PINF;
	}
	if ( x < UNDERFLOW ) {
		return 0.0;
	}
	if (
		x > NEG_NEARZERO &&
		x < NEARZERO
	) {
		return 1.0 + x;
	}
	// Reduce and compute `r = hi - lo` for extra precision...
	if ( x < 0.0 ) {
		k = trunc( (LOG2_E*x) - 0.5 );
	} else {
		k = trunc( (LOG2_E*x) + 0.5 );
	}
	hi = x - (k*LN2_HI);
	lo = k * LN2_LO;

	return expmulti( hi, lo, k );
}


// EXPORTS //

module.exports = exp;

},{"./expmulti.js":99,"@stdlib/constants/float64/ninf":70,"@stdlib/constants/float64/pinf":71,"@stdlib/math/base/assert/is-nan":78,"@stdlib/math/base/special/trunc":110}],102:[function(require,module,exports){
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
		return 0.16666666666666602;
	}
	return 0.16666666666666602 + (x * (-0.0027777777777015593 + (x * (0.00006613756321437934 + (x * (-0.0000016533902205465252 + (x * 4.1381367970572385e-8))))))); // eslint-disable-line max-len
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
* Round a double-precision floating-point number toward negative infinity.
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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
*/

'use strict';

// TODO: implementation (?)

/**
* Rounds a double-precision floating-point number toward negative infinity.
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

},{}],105:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Multiply a double-precision floating-point number by an integer power of two.
*
* @module @stdlib/math/base/special/ldexp
*
* @example
* var ldexp = require( '@stdlib/math/base/special/ldexp' );
*
* var x = ldexp( 0.5, 3 ); // => 0.5 * 2^3 = 0.5 * 8
* // returns 4.0
*
* x = ldexp( 4.0, -2 ); // => 4 * 2^(-2) = 4 * (1/4)
* // returns 1.0
*
* x = ldexp( 0.0, 20 );
* // returns 0.0
*
* x = ldexp( -0.0, 39 );
* // returns -0.0
*
* x = ldexp( NaN, -101 );
* // returns NaN
*
* x = ldexp( Infinity, 11 );
* // returns Infinity
*
* x = ldexp( -Infinity, -118 );
* // returns -Infinity
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":106}],106:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// NOTES //

/*
* => ldexp: load exponent (see [The Open Group]{@link http://pubs.opengroup.org/onlinepubs/9699919799/functions/ldexp.html} and [cppreference]{@link http://en.cppreference.com/w/c/numeric/math/ldexp}).
*/


// MODULES //

var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var BIAS = require( '@stdlib/constants/float64/exponent-bias' );
var MAX_EXPONENT = require( '@stdlib/constants/float64/max-base2-exponent' );
var MAX_SUBNORMAL_EXPONENT = require( '@stdlib/constants/float64/max-base2-exponent-subnormal' );
var MIN_SUBNORMAL_EXPONENT = require( '@stdlib/constants/float64/min-base2-exponent-subnormal' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
var copysign = require( '@stdlib/math/base/special/copysign' );
var normalize = require( '@stdlib/number/float64/base/normalize' ).assign;
var floatExp = require( '@stdlib/number/float64/base/exponent' );
var toWords = require( '@stdlib/number/float64/base/to-words' );
var fromWords = require( '@stdlib/number/float64/base/from-words' );


// VARIABLES //

// 1/(1<<52) = 1/(2**52) = 1/4503599627370496
var TWO52_INV = 2.220446049250313e-16;

// Exponent all 0s: 1 00000000000 11111111111111111111 => 2148532223
var CLEAR_EXP_MASK = 0x800fffff>>>0; // asm type annotation

// Normalization workspace:
var FRAC = [ 0.0, 0.0 ];

// High/low words workspace:
var WORDS = [ 0, 0 ];


// MAIN //

/**
* Multiplies a double-precision floating-point number by an integer power of two.
*
* @param {number} frac - fraction
* @param {integer} exp - exponent
* @returns {number} double-precision floating-point number
*
* @example
* var x = ldexp( 0.5, 3 ); // => 0.5 * 2^3 = 0.5 * 8
* // returns 4.0
*
* @example
* var x = ldexp( 4.0, -2 ); // => 4 * 2^(-2) = 4 * (1/4)
* // returns 1.0
*
* @example
* var x = ldexp( 0.0, 20 );
* // returns 0.0
*
* @example
* var x = ldexp( -0.0, 39 );
* // returns -0.0
*
* @example
* var x = ldexp( NaN, -101 );
* // returns NaN
*
* @example
* var x = ldexp( Infinity, 11 );
* // returns Infinity
*
* @example
* var x = ldexp( -Infinity, -118 );
* // returns -Infinity
*/
function ldexp( frac, exp ) {
	var high;
	var m;
	if (
		exp === 0 ||
		frac === 0.0 || // handles +-0
		isnan( frac ) ||
		isInfinite( frac )
	) {
		return frac;
	}
	// Normalize the input fraction:
	normalize( frac, FRAC, 1, 0 );
	frac = FRAC[ 0 ];
	exp += FRAC[ 1 ];

	// Extract the exponent from `frac` and add it to `exp`:
	exp += floatExp( frac );

	// Check for underflow/overflow...
	if ( exp < MIN_SUBNORMAL_EXPONENT ) {
		return copysign( 0.0, frac );
	}
	if ( exp > MAX_EXPONENT ) {
		if ( frac < 0.0 ) {
			return NINF;
		}
		return PINF;
	}
	// Check for a subnormal and scale accordingly to retain precision...
	if ( exp <= MAX_SUBNORMAL_EXPONENT ) {
		exp += 52;
		m = TWO52_INV;
	} else {
		m = 1.0;
	}
	// Split the fraction into higher and lower order words:
	toWords.assign( frac, WORDS, 1, 0 );
	high = WORDS[ 0 ];

	// Clear the exponent bits within the higher order word:
	high &= CLEAR_EXP_MASK;

	// Set the exponent bits to the new exponent:
	high |= ((exp+BIAS) << 20);

	// Create a new floating-point number:
	return m * fromWords( high, WORDS[ 1 ] );
}


// EXPORTS //

module.exports = ldexp;

},{"@stdlib/constants/float64/exponent-bias":63,"@stdlib/constants/float64/max-base2-exponent":68,"@stdlib/constants/float64/max-base2-exponent-subnormal":67,"@stdlib/constants/float64/min-base2-exponent-subnormal":69,"@stdlib/constants/float64/ninf":70,"@stdlib/constants/float64/pinf":71,"@stdlib/math/base/assert/is-infinite":76,"@stdlib/math/base/assert/is-nan":78,"@stdlib/math/base/special/copysign":88,"@stdlib/number/float64/base/exponent":114,"@stdlib/number/float64/base/from-words":116,"@stdlib/number/float64/base/normalize":123,"@stdlib/number/float64/base/to-words":126}],107:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Compute the hyperbolic tangent of a double-precision floating-point number.
*
* @module @stdlib/math/base/special/tanh
*
* @example
* var tanh = require( '@stdlib/math/base/special/tanh' );
*
* var v = tanh( 0.0 );
* // returns 0.0
*
* var v = tanh( -0.0 );
* // returns -0.0
*
* v = tanh( 2.0 );
* // returns ~0.964
*
* v = tanh( -2.0 );
* // returns ~-0.964
*
* v = tanh( NaN );
* // returns NaN
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":108}],108:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );
var ratval = require( './rational_pq.js' );


// VARIABLES //

// log(2**127)
var MAXLOG = 8.8029691931113054295988e+01;


// MAIN //

/**
* Computes the hyperbolic tangent of a double-precision floating-point number.
*
* ## Method
*
* For \\( |x| < 0.625 \\), we use a rational function of the form (Cody and Waite)
*
* ```tex
* x + x^3 \frac{\mathrm{P}(x)}{\mathrm{Q}(x)}
* ```
*
* Otherwise,
*
* ```tex
* \begin{align*}
* \operatorname{tanh}(x) &= \frac{\operatorname{sinh}(x)}{\operatorname{cosh(x)}} \\
* &= 1 - \frac{2}{e^{2x} + 1}
* \end{align*}
* ```
*
* ## Notes
*
* -   Relative error:
*
*     | arithmetic | domain | # trials | peak    | rms     |
*     |:----------:|:------:|:--------:|:-------:|:-------:|
*     | DEC        | -2,2   | 50000    | 3.3e-17 | 6.4e-18 |
*     | IEEE       | -2,2   | 30000    | 2.5e-16 | 5.8e-17 |
*
* @param {number} x - input value
* @returns {number} hyperbolic tangent
*
* @example
* var v = tanh( 0.0 );
* // returns 0.0
*
* @example
* var v = tanh( 2.0 );
* // returns ~0.964
*
* @example
* var v = tanh( -2.0 );
* // returns ~-0.964
*
* @example
* var v = tanh( NaN );
* // returns NaN
*/
function tanh( x ) {
	var s;
	var z;
	z = abs( x );
	if ( z > 0.5*MAXLOG ) {
		return ( x < 0.0 ) ? -1.0 : 1.0;
	}
	if ( z >= 0.625 ) {
		s = exp( 2.0 * z );
		z = 1.0 - ( 2.0/(s+1.0) );
		if ( x < 0.0 ) {
			z = -z;
		}
	} else {
		if ( x === 0.0 ) {
			return x; // Handle `+-0`
		}
		s = x * x;
		z = x + ( x*s*ratval( s ) );
	}
	return z;
}


// EXPORTS //

module.exports = tanh;

},{"./rational_pq.js":109,"@stdlib/math/base/special/abs":84,"@stdlib/math/base/special/exp":100}],109:[function(require,module,exports){
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
* Evaluates a rational function (i.e., the ratio of two polynomials described by the coefficients stored in \\(P\\) and \\(Q\\)).
*
* ## Notes
*
* -   Coefficients should be sorted in ascending degree.
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
* @private
* @param {number} x - value at which to evaluate the rational function
* @returns {number} evaluated rational function
*/
function evalrational( x ) {
	var ax;
	var s1;
	var s2;
	if ( x === 0.0 ) {
		return -0.3333333333333332;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = -1614.6876844170845 + (x * (-99.28772310019185 + (x * (-0.9643991794250523 + (x * 0.0))))); // eslint-disable-line max-len
		s2 = 4844.063053251255 + (x * (2235.4883906010045 + (x * (112.81167849163293 + (x * 1.0))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 0.0 + (x * (-0.9643991794250523 + (x * (-99.28772310019185 + (x * -1614.6876844170845))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (112.81167849163293 + (x * (2235.4883906010045 + (x * 4844.063053251255))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

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

/**
* Round a double-precision floating-point number toward zero.
*
* @module @stdlib/math/base/special/trunc
*
* @example
* var trunc = require( '@stdlib/math/base/special/trunc' );
*
* var v = trunc( -4.2 );
* // returns -4.0
*
* v = trunc( 9.99999 );
* // returns 9.0
*
* v = trunc( 0.0 );
* // returns 0.0
*
* v = trunc( -0.0 );
* // returns -0.0
*
* v = trunc( NaN );
* // returns NaN
*
* v = trunc( Infinity );
* // returns Infinity
*
* v = trunc( -Infinity );
* // returns -Infinity
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":111}],111:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var ceil = require( '@stdlib/math/base/special/ceil' );


// MAIN //

/**
* Rounds a double-precision floating-point number toward zero.
*
* @param {number} x - input value
* @returns {number} rounded value
*
* @example
* var v = trunc( -4.2 );
* // returns -4.0
*
* @example
* var v = trunc( 9.99999 );
* // returns 9.0
*
* @example
* var v = trunc( 0.0 );
* // returns 0.0
*
* @example
* var v = trunc( -0.0 );
* // returns -0.0
*
* @example
* var v = trunc( NaN );
* // returns NaN
*
* @example
* var v = trunc( Infinity );
* // returns Infinity
*
* @example
* var v = trunc( -Infinity );
* // returns -Infinity
*/
function trunc( x ) {
	if ( x < 0.0 ) {
		return ceil( x );
	}
	return floor( x );
}


// EXPORTS //

module.exports = trunc;

},{"@stdlib/math/base/special/ceil":86,"@stdlib/math/base/special/floor":103}],112:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":113}],113:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

/**
* Return an integer corresponding to the unbiased exponent of a double-precision floating-point number.
*
* @module @stdlib/number/float64/base/exponent
*
* @example
* var exponent = require( '@stdlib/number/float64/base/exponent' );
*
* var exp = exponent( 3.14e-307 ); // => 2**-1019 ~ 1e-307
* // returns -1019
*
* exp = exponent( -3.14 );
* // returns 1
*
* exp = exponent( 0.0 );
* // returns -1023
*
* exp = exponent( NaN );
* // returns 1024
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

var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var EXP_MASK = require( '@stdlib/constants/float64/high-word-exponent-mask' );
var BIAS = require( '@stdlib/constants/float64/exponent-bias' );


// MAIN //

/**
* Returns an integer corresponding to the unbiased exponent of a double-precision floating-point number.
*
* @param {number} x - input value
* @returns {integer32} unbiased exponent
*
* @example
* var exp = exponent( 3.14e-307 ); // => 2**-1019 ~ 1e-307
* // returns -1019
*
* @example
* var exp = exponent( -3.14 );
* // returns 1
*
* @example
* var exp = exponent( 0.0 );
* // returns -1023
*
* @example
* var exp = exponent( NaN );
* // returns 1024
*/
function exponent( x ) {
	// Extract from the input value a higher order word (unsigned 32-bit integer) which contains the exponent:
	var high = getHighWord( x );

	// Apply a mask to isolate only the exponent bits and then shift off all bits which are part of the fraction:
	high = ( high & EXP_MASK ) >>> 20;

	// Remove the bias and return:
	return (high - BIAS)|0; // asm type annotation
}


// EXPORTS //

module.exports = exponent;

},{"@stdlib/constants/float64/exponent-bias":63,"@stdlib/constants/float64/high-word-exponent-mask":65,"@stdlib/number/float64/base/get-high-word":120}],116:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":118}],117:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":48}],118:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":117,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],119:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":48}],120:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":121}],121:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":119,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],122:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var FLOAT64_SMALLEST_NORMAL = require( '@stdlib/constants/float64/smallest-normal' );
var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );


// VARIABLES //

// (1<<52)
var SCALAR = 4503599627370496;


// MAIN //

/**
* Returns a normal number `y` and exponent `exp` satisfying \\(x = y \cdot 2^\mathrm{exp}\\) and assigns results to a provided output array.
*
* @param {number} x - input value
* @param {Collection} out - output array
* @param {integer} stride - output array stride
* @param {NonNegativeInteger} offset - output array index offset
* @returns {Collection} output array
*
* @example
* var pow = require( '@stdlib/math/base/special/pow' );
*
* var out = normalize( 3.14e-319, [ 0.0, 0 ], 1, 0 );
* // returns [ 1.4141234400356668e-303, -52 ]
*
* var y = out[ 0 ];
* var exp = out[ 1 ];
*
* var bool = ( y*pow(2.0,exp) === 3.14e-319 );
* // returns true
*
* @example
* var out = normalize( 0.0, [ 0.0, 0 ], 1, 0 );
* // returns [ 0.0, 0 ];
*
* @example
* var PINF = require( '@stdlib/constants/float64/pinf' );
*
* var out = normalize( PINF, [ 0.0, 0 ], 1, 0 );
* // returns [ Infinity, 0 ]
*
* @example
* var NINF = require( '@stdlib/constants/float64/ninf' );
*
* var out = normalize( NINF, [ 0.0, 0 ], 1, 0 );
* // returns [ -Infinity, 0 ]
*
* @example
* var out = normalize( NaN, [ 0.0, 0 ], 1, 0 );
* // returns [ NaN, 0 ]
*/
function normalize( x, out, stride, offset ) {
	if ( isnan( x ) || isInfinite( x ) ) {
		out[ offset ] = x;
		out[ offset + stride ] = 0;
		return out;
	}
	if ( x !== 0.0 && abs( x ) < FLOAT64_SMALLEST_NORMAL ) {
		out[ offset ] = x * SCALAR;
		out[ offset + stride ] = -52;
		return out;
	}
	out[ offset ] = x;
	out[ offset + stride ] = 0;
	return out;
}


// EXPORTS //

module.exports = normalize;

},{"@stdlib/constants/float64/smallest-normal":72,"@stdlib/math/base/assert/is-infinite":76,"@stdlib/math/base/assert/is-nan":78,"@stdlib/math/base/special/abs":84}],123:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Return a normal number `y` and exponent `exp` satisfying \\(x = y \cdot 2^\mathrm{exp}\\).
*
* @module @stdlib/number/float64/base/normalize
*
* @example
* var normalize = require( '@stdlib/number/float64/base/normalize' );
* var pow = require( '@stdlib/math/base/special/pow' );
*
* var out = normalize( 3.14e-319 );
* // returns [ 1.4141234400356668e-303, -52 ]
*
* var y = out[ 0 ];
* var exp = out[ 1 ];
*
* var bool = ( y*pow(2.0, exp) === 3.14e-319 );
* // returns true
*
* @example
* var Float64Array = require( '@stdlib/array/float64' );
* var normalize = require( '@stdlib/number/float64/base/normalize' );
*
* var out = new Float64Array( 2 );
*
* var v = normalize.assign( 3.14e-319, out, 1, 0 );
* // returns <Float64Array>[ 1.4141234400356668e-303, -52 ]
*
* var bool = ( v === out );
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

},{"./assign.js":122,"./main.js":124,"@stdlib/utils/define-nonenumerable-read-only-property":151}],124:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Returns a normal number `y` and exponent `exp` satisfying \\(x = y \cdot 2^\mathrm{exp}\\).
*
* @param {number} x - input value
* @returns {NumberArray} output array
*
* @example
* var pow = require( '@stdlib/math/base/special/pow' );
*
* var out = normalize( 3.14e-319 );
* // returns [ 1.4141234400356668e-303, -52 ]
*
* var y = out[ 0 ];
* var exp = out[ 1 ];
*
* var bool = ( y*pow(2.0,exp) === 3.14e-319 );
* // returns true
*
* @example
* var out = normalize( 0.0 );
* // returns [ 0.0, 0 ]
*
* @example
* var PINF = require( '@stdlib/constants/float64/pinf' );
*
* var out = normalize( PINF );
* // returns [ Infinity, 0 ]
*
* @example
* var NINF = require( '@stdlib/constants/float64/ninf' );
*
* var out = normalize( NINF );
* // returns [ -Infinity, 0 ]
*
* @example
* var out = normalize( NaN );
* // returns [ NaN, 0 ]
*/
function normalize( x ) {
	return fcn( x, [ 0.0, 0 ], 1, 0 );
}


// EXPORTS //

module.exports = normalize;

},{"./assign.js":122}],125:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":127,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],126:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":125,"./main.js":128,"@stdlib/utils/define-nonenumerable-read-only-property":151}],127:[function(require,module,exports){
arguments[4][117][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":48,"dup":117}],128:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":125}],129:[function(require,module,exports){
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

},{}],131:[function(require,module,exports){
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

},{"./main.js":132,"./regexp.js":133,"@stdlib/utils/define-nonenumerable-read-only-property":151}],132:[function(require,module,exports){
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

},{}],133:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":132}],134:[function(require,module,exports){
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

},{"./is_number.js":137}],135:[function(require,module,exports){
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

},{"./is_number.js":137,"./zero_pad.js":141}],136:[function(require,module,exports){
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

},{"./main.js":139}],137:[function(require,module,exports){
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

},{}],138:[function(require,module,exports){
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

},{}],139:[function(require,module,exports){
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

},{"./format_double.js":134,"./format_integer.js":135,"./is_string.js":138,"./space_pad.js":140,"./zero_pad.js":141}],140:[function(require,module,exports){
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

},{}],141:[function(require,module,exports){
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

},{}],142:[function(require,module,exports){
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

},{"./main.js":143}],143:[function(require,module,exports){
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

},{}],144:[function(require,module,exports){
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

},{"./main.js":146}],145:[function(require,module,exports){
arguments[4][138][0].apply(exports,arguments)
},{"dup":138}],146:[function(require,module,exports){
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

},{"./is_string.js":145,"@stdlib/string/base/format-interpolate":136,"@stdlib/string/base/format-tokenize":142}],147:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":148}],148:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":150}],150:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-buffer":39,"@stdlib/regexp/function-name":131,"@stdlib/utils/native-class":169}],151:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":152}],152:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":156}],153:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],154:[function(require,module,exports){
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

},{}],155:[function(require,module,exports){
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

},{"./define_property.js":154}],156:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":153,"./has_define_property_support.js":155,"./polyfill.js":157}],157:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":144}],158:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./native.js":161,"./polyfill.js":162,"@stdlib/assert/is-function":45}],159:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":160}],160:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./detect.js":158,"@stdlib/object/ctor":129}],161:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],162:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./proto.js":163,"@stdlib/utils/native-class":169}],163:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],164:[function(require,module,exports){
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

},{"./codegen.js":165,"./global_this.js":166,"./self.js":167,"./window.js":168,"@stdlib/assert/is-boolean":33,"@stdlib/string/format":144}],165:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],166:[function(require,module,exports){
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

// MAIN //

var obj = ( typeof self === 'object' ) ? self : null;


// EXPORTS //

module.exports = obj;

},{}],168:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],169:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":170,"./polyfill.js":171,"@stdlib/assert/has-tostringtag-support":20}],170:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":172}],171:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":172,"./tostringtag.js":173,"@stdlib/assert/has-own-property":16}],172:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],173:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/symbol/ctor":147}],174:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":175}],175:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-error":41}],176:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./fixtures/nodelist.js":177,"./fixtures/re.js":178,"./fixtures/typedarray.js":179}],177:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/global":164}],178:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],179:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],180:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./check.js":176,"./main.js":181,"./polyfill.js":182}],181:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/constructor-name":149}],182:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/constructor-name":149}],183:[function(require,module,exports){
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

},{}],184:[function(require,module,exports){

},{}],185:[function(require,module,exports){
arguments[4][184][0].apply(exports,arguments)
},{"dup":184}],186:[function(require,module,exports){
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
},{"base64-js":183,"buffer":186,"ieee754":289}],187:[function(require,module,exports){
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

},{}],188:[function(require,module,exports){
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
},{"_process":296}],189:[function(require,module,exports){
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

},{"events":187,"inherits":290,"readable-stream/lib/_stream_duplex.js":191,"readable-stream/lib/_stream_passthrough.js":192,"readable-stream/lib/_stream_readable.js":193,"readable-stream/lib/_stream_transform.js":194,"readable-stream/lib/_stream_writable.js":195,"readable-stream/lib/internal/streams/end-of-stream.js":199,"readable-stream/lib/internal/streams/pipeline.js":201}],190:[function(require,module,exports){
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

},{}],191:[function(require,module,exports){
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
},{"./_stream_readable":193,"./_stream_writable":195,"_process":296,"inherits":290}],192:[function(require,module,exports){
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
},{"./_stream_transform":194,"inherits":290}],193:[function(require,module,exports){
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
},{"../errors":190,"./_stream_duplex":191,"./internal/streams/async_iterator":196,"./internal/streams/buffer_list":197,"./internal/streams/destroy":198,"./internal/streams/from":200,"./internal/streams/state":202,"./internal/streams/stream":203,"_process":296,"buffer":186,"events":187,"inherits":290,"string_decoder/":305,"util":184}],194:[function(require,module,exports){
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
},{"../errors":190,"./_stream_duplex":191,"inherits":290}],195:[function(require,module,exports){
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
},{"../errors":190,"./_stream_duplex":191,"./internal/streams/destroy":198,"./internal/streams/state":202,"./internal/streams/stream":203,"_process":296,"buffer":186,"inherits":290,"util-deprecate":314}],196:[function(require,module,exports){
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
},{"./end-of-stream":199,"_process":296}],197:[function(require,module,exports){
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
},{"buffer":186,"util":184}],198:[function(require,module,exports){
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
},{"_process":296}],199:[function(require,module,exports){
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
},{"../../../errors":190}],200:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],201:[function(require,module,exports){
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
},{"../../../errors":190,"./end-of-stream":199}],202:[function(require,module,exports){
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
},{"../../../errors":190}],203:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":187}],204:[function(require,module,exports){
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

},{"./":205,"get-intrinsic":280}],205:[function(require,module,exports){
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

},{"es-define-property":265,"es-errors/type":271,"function-bind":279,"get-intrinsic":280,"set-function-length":300}],206:[function(require,module,exports){
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

},{"./lib/is_arguments.js":207,"./lib/keys.js":208}],207:[function(require,module,exports){
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

},{}],208:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],209:[function(require,module,exports){
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

},{"es-define-property":265,"es-errors/syntax":270,"es-errors/type":271,"gopd":281}],210:[function(require,module,exports){
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

},{"define-data-property":209,"has-property-descriptors":282,"object-keys":294}],211:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],212:[function(require,module,exports){
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

},{"./ToNumber":243,"./ToPrimitive":245,"./Type":250}],213:[function(require,module,exports){
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

},{"../helpers/isFinite":258,"../helpers/isNaN":259,"../helpers/isPrefixOf":260,"./ToNumber":243,"./ToPrimitive":245,"es-errors/type":271,"get-intrinsic":280}],214:[function(require,module,exports){
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

},{"call-bind/callBound":204,"es-errors/type":271}],215:[function(require,module,exports){
'use strict';

var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value) {
	return RequireObjectCoercible(value, arguments.length > 1 ? arguments[1] : void undefined);
};

},{"es-object-atoms/RequireObjectCoercible":273}],216:[function(require,module,exports){
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

},{"./DayWithinYear":219,"./InLeapYear":223,"./MonthFromTime":233,"es-errors/eval":266}],217:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":264,"./floor":254}],218:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":254}],219:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":217,"./DayFromYear":218,"./YearFromTime":252}],220:[function(require,module,exports){
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

},{"./modulo":255}],221:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":262,"./IsAccessorDescriptor":224,"./IsDataDescriptor":226,"es-errors/type":271}],222:[function(require,module,exports){
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

},{"../helpers/timeConstants":264,"./floor":254,"./modulo":255}],223:[function(require,module,exports){
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

},{"./DaysInYear":220,"./YearFromTime":252,"es-errors/eval":266}],224:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":262,"es-errors/type":271,"hasown":288}],225:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":291}],226:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":262,"es-errors/type":271,"hasown":288}],227:[function(require,module,exports){
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

},{"./IsAccessorDescriptor":224,"./IsDataDescriptor":226,"./IsPropertyDescriptor":228,"es-errors/type":271}],228:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor(Desc);
};

},{"../helpers/records/property-descriptor":262}],229:[function(require,module,exports){
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

},{"../helpers/isFinite":258,"../helpers/timeConstants":264}],230:[function(require,module,exports){
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

},{"../helpers/isFinite":258,"./DateFromTime":216,"./Day":217,"./MonthFromTime":233,"./ToInteger":242,"./YearFromTime":252,"./floor":254,"./modulo":255,"get-intrinsic":280}],231:[function(require,module,exports){
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

},{"../helpers/isFinite":258,"../helpers/timeConstants":264,"./ToInteger":242}],232:[function(require,module,exports){
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

},{"../helpers/timeConstants":264,"./floor":254,"./modulo":255}],233:[function(require,module,exports){
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

},{"./DayWithinYear":219,"./InLeapYear":223}],234:[function(require,module,exports){
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

},{"../helpers/isNaN":259}],235:[function(require,module,exports){
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

},{"../helpers/timeConstants":264,"./floor":254,"./modulo":255}],236:[function(require,module,exports){
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

},{"./Type":250}],237:[function(require,module,exports){
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


},{"../helpers/isFinite":258,"./ToNumber":243,"./abs":253,"get-intrinsic":280}],238:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":264,"./DayFromYear":218}],239:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":264,"./modulo":255}],240:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],241:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":243}],242:[function(require,module,exports){
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

},{"../helpers/isFinite":258,"../helpers/isNaN":259,"../helpers/sign":263,"./ToNumber":243,"./abs":253,"./floor":254}],243:[function(require,module,exports){
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

},{"./ToPrimitive":245,"call-bind/callBound":204,"safe-regex-test":299}],244:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = require('es-object-atoms/ToObject');

},{"es-object-atoms/ToObject":274}],245:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":276}],246:[function(require,module,exports){
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

},{"./IsCallable":225,"./ToBoolean":240,"./Type":250,"es-errors/type":271,"hasown":288}],247:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":280}],248:[function(require,module,exports){
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

},{"../helpers/isFinite":258,"../helpers/isNaN":259,"../helpers/sign":263,"./ToNumber":243,"./abs":253,"./floor":254,"./modulo":255}],249:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":243}],250:[function(require,module,exports){
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

},{}],251:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":217,"./modulo":255}],252:[function(require,module,exports){
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

},{"call-bind/callBound":204,"get-intrinsic":280}],253:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":280}],254:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],255:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":261}],256:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":264,"./modulo":255}],257:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":212,"./5/AbstractRelationalComparison":213,"./5/Canonicalize":214,"./5/CheckObjectCoercible":215,"./5/DateFromTime":216,"./5/Day":217,"./5/DayFromYear":218,"./5/DayWithinYear":219,"./5/DaysInYear":220,"./5/FromPropertyDescriptor":221,"./5/HourFromTime":222,"./5/InLeapYear":223,"./5/IsAccessorDescriptor":224,"./5/IsCallable":225,"./5/IsDataDescriptor":226,"./5/IsGenericDescriptor":227,"./5/IsPropertyDescriptor":228,"./5/MakeDate":229,"./5/MakeDay":230,"./5/MakeTime":231,"./5/MinFromTime":232,"./5/MonthFromTime":233,"./5/SameValue":234,"./5/SecFromTime":235,"./5/StrictEqualityComparison":236,"./5/TimeClip":237,"./5/TimeFromYear":238,"./5/TimeWithinDay":239,"./5/ToBoolean":240,"./5/ToInt32":241,"./5/ToInteger":242,"./5/ToNumber":243,"./5/ToObject":244,"./5/ToPrimitive":245,"./5/ToPropertyDescriptor":246,"./5/ToString":247,"./5/ToUint16":248,"./5/ToUint32":249,"./5/Type":250,"./5/WeekDay":251,"./5/YearFromTime":252,"./5/abs":253,"./5/floor":254,"./5/modulo":255,"./5/msFromTime":256}],258:[function(require,module,exports){
'use strict';

var $isNaN = require('./isNaN');

module.exports = function (x) { return (typeof x === 'number' || typeof x === 'bigint') && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{"./isNaN":259}],259:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],260:[function(require,module,exports){
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

},{"call-bind/callBound":204}],261:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],262:[function(require,module,exports){
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

},{"es-errors/type":271,"hasown":288}],263:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],264:[function(require,module,exports){
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

},{}],265:[function(require,module,exports){
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

},{"get-intrinsic":280}],266:[function(require,module,exports){
'use strict';

/** @type {import('./eval')} */
module.exports = EvalError;

},{}],267:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Error;

},{}],268:[function(require,module,exports){
'use strict';

/** @type {import('./range')} */
module.exports = RangeError;

},{}],269:[function(require,module,exports){
'use strict';

/** @type {import('./ref')} */
module.exports = ReferenceError;

},{}],270:[function(require,module,exports){
'use strict';

/** @type {import('./syntax')} */
module.exports = SyntaxError;

},{}],271:[function(require,module,exports){
'use strict';

/** @type {import('./type')} */
module.exports = TypeError;

},{}],272:[function(require,module,exports){
'use strict';

/** @type {import('./uri')} */
module.exports = URIError;

},{}],273:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

/** @type {import('./RequireObjectCoercible')} */
module.exports = function RequireObjectCoercible(value) {
	if (value == null) {
		throw new $TypeError((arguments.length > 0 && arguments[1]) || ('Cannot call method on ' + value));
	}
	return value;
};

},{"es-errors/type":271}],274:[function(require,module,exports){
'use strict';

var $Object = require('./');
var RequireObjectCoercible = require('./RequireObjectCoercible');

/** @type {import('./ToObject')} */
module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

},{"./":275,"./RequireObjectCoercible":273}],275:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Object;

},{}],276:[function(require,module,exports){
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

},{"./helpers/isPrimitive":277,"is-callable":291}],277:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],278:[function(require,module,exports){
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

},{}],279:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":278}],280:[function(require,module,exports){
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

},{"es-errors":267,"es-errors/eval":266,"es-errors/range":268,"es-errors/ref":269,"es-errors/syntax":270,"es-errors/type":271,"es-errors/uri":272,"function-bind":279,"has-proto":283,"has-symbols":284,"hasown":288}],281:[function(require,module,exports){
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

},{"get-intrinsic":280}],282:[function(require,module,exports){
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

},{"es-define-property":265}],283:[function(require,module,exports){
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

},{}],284:[function(require,module,exports){
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

},{"./shams":285}],285:[function(require,module,exports){
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

},{}],286:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":285}],287:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":279}],288:[function(require,module,exports){
'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);

},{"function-bind":279}],289:[function(require,module,exports){
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

},{}],290:[function(require,module,exports){
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

},{}],291:[function(require,module,exports){
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

},{}],292:[function(require,module,exports){
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

},{"call-bind/callBound":204,"has-tostringtag/shams":286}],293:[function(require,module,exports){
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

},{"./isArguments":295}],294:[function(require,module,exports){
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

},{"./implementation":293,"./isArguments":295}],295:[function(require,module,exports){
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

},{}],296:[function(require,module,exports){
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

},{}],297:[function(require,module,exports){
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
},{"_process":296,"through":312,"timers":313}],298:[function(require,module,exports){
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

},{"buffer":186}],299:[function(require,module,exports){
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

},{"call-bind/callBound":204,"es-errors/type":271,"is-regex":292}],300:[function(require,module,exports){
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

},{"define-data-property":209,"es-errors/type":271,"get-intrinsic":280,"gopd":281,"has-property-descriptors":282}],301:[function(require,module,exports){
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

},{"es-abstract/es5":257,"function-bind":279}],302:[function(require,module,exports){
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

},{"./implementation":301,"./polyfill":303,"./shim":304,"define-properties":210,"function-bind":279}],303:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":301}],304:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":303,"define-properties":210}],305:[function(require,module,exports){
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
},{"safe-buffer":298}],306:[function(require,module,exports){
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
},{"./lib/default_stream":307,"./lib/results":309,"./lib/test":310,"_process":296,"defined":211,"through":312,"timers":313}],307:[function(require,module,exports){
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
},{"_process":296,"fs":185,"through":312}],308:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":296,"timers":313}],309:[function(require,module,exports){
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
},{"_process":296,"events":187,"function-bind":279,"has":287,"inherits":290,"object-inspect":311,"resumer":297,"through":312,"timers":313}],310:[function(require,module,exports){
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
},{"./next_tick":308,"deep-equal":206,"defined":211,"events":187,"has":287,"inherits":290,"path":188,"string.prototype.trim":302}],311:[function(require,module,exports){
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

},{}],312:[function(require,module,exports){
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
},{"_process":296,"stream":189}],313:[function(require,module,exports){
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
},{"process/browser.js":296,"timers":313}],314:[function(require,module,exports){
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
},{}]},{},[97,98]);
