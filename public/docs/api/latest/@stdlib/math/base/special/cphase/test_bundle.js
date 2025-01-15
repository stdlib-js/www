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

},{"./uint16array.js":24,"@stdlib/assert/is-uint16array":58,"@stdlib/constants/uint16/max":84}],24:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint32array.js":27,"@stdlib/assert/is-uint32array":60,"@stdlib/constants/uint32/max":85}],27:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint8array.js":30,"@stdlib/assert/is-uint8array":62,"@stdlib/constants/uint8/max":86}],30:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/native-class":164}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":34,"./object.js":35,"./primitive.js":36,"@stdlib/utils/define-nonenumerable-read-only-property":146}],34:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./try2serialize.js":38,"@stdlib/assert/has-tostringtag-support":20,"@stdlib/boolean/ctor":66,"@stdlib/utils/native-class":164}],36:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-object-like":56}],41:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/get-prototype-of":154,"@stdlib/utils/native-class":164}],43:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":164}],45:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/type-of":175}],47:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var main = require( './main.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( main, 'isPrimitive', isPrimitive );
setReadOnly( main, 'isObject', isObject );


// EXPORTS //

module.exports = main;

},{"./main.js":51,"./object.js":52,"./primitive.js":53,"@stdlib/utils/define-nonenumerable-read-only-property":146}],51:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./object.js":52,"./primitive.js":53}],52:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./try2serialize.js":55,"@stdlib/assert/has-tostringtag-support":20,"@stdlib/number/ctor":110,"@stdlib/utils/native-class":164}],53:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],54:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/ctor":110}],55:[function(require,module,exports){
arguments[4][38][0].apply(exports,arguments)
},{"./tostring.js":54,"dup":38}],56:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":57,"@stdlib/assert/tools/array-function":64,"@stdlib/utils/define-nonenumerable-read-only-property":146}],57:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":164}],60:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":61}],61:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":164}],62:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":164}],64:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-array":31,"@stdlib/string/format":139}],66:[function(require,module,exports){
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

},{"./main.js":67}],67:[function(require,module,exports){
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
* 128-bit complex number constructor.
*
* @module @stdlib/complex/float64/ctor
*
* @example
* var Complex128 = require( '@stdlib/complex/float64/ctor' );
*
* var z = new Complex128( 5.0, 3.0 );
* // returns <Complex128>
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":69}],69:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var defineProperty = require( '@stdlib/utils/define-property' );
var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var format = require( '@stdlib/string/format' );
var toStr = require( './tostring.js' );
var toJSON = require( './tojson.js' );


// MAIN //

/**
* 128-bit complex number constructor.
*
* @constructor
* @param {number} real - real component
* @param {number} imag - imaginary component
* @throws {TypeError} must invoke using the `new` keyword
* @throws {TypeError} real component must be a number
* @throws {TypeError} imaginary component must be a number
* @returns {Complex128} 128-bit complex number
*
* @example
* var z = new Complex128( 5.0, 3.0 );
* // returns <Complex128>
*/
function Complex128( real, imag ) {
	if ( !( this instanceof Complex128 ) ) {
		throw new TypeError( 'invalid invocation. Constructor must be called with the `new` keyword.' );
	}
	if ( !isNumber( real ) ) {
		throw new TypeError( format( 'invalid argument. Real component must be a number. Value: `%s`.', real ) );
	}
	if ( !isNumber( imag ) ) {
		throw new TypeError( format( 'invalid argument. Imaginary component must be a number. Value: `%s`.', imag ) );
	}
	defineProperty( this, 're', {
		'configurable': false,
		'enumerable': true,
		'writable': false,
		'value': real
	});
	defineProperty( this, 'im', {
		'configurable': false,
		'enumerable': true,
		'writable': false,
		'value': imag
	});
	return this;
}

/**
* Size (in bytes) of each component.
*
* @name BYTES_PER_ELEMENT
* @memberof Complex128
* @type {integer}
* @returns {integer} size of each component
*
* @example
* var nbytes = Complex128.BYTES_PER_ELEMENT;
* // returns 8
*/
setReadOnly( Complex128, 'BYTES_PER_ELEMENT', 8 );

/**
* Size (in bytes) of each component.
*
* @name BYTES_PER_ELEMENT
* @memberof Complex128.prototype
* @type {integer}
* @returns {integer} size of each component
*
* @example
* var z = new Complex128( 5.0, 3.0 );
*
* var nbytes = z.BYTES_PER_ELEMENT;
* // returns 8
*/
setReadOnly( Complex128.prototype, 'BYTES_PER_ELEMENT', 8 );

/**
* Length (in bytes) of a complex number.
*
* @name byteLength
* @memberof Complex128.prototype
* @type {integer}
* @returns {integer} byte length
*
* @example
* var z = new Complex128( 5.0, 3.0 );
*
* var nbytes = z.byteLength;
* // returns 16
*/
setReadOnly( Complex128.prototype, 'byteLength', 16 );

/**
* Serializes a complex number as a string.
*
* @name toString
* @memberof Complex128.prototype
* @type {Function}
* @returns {string} serialized complex number
*
* @example
* var z = new Complex128( 5.0, 3.0 );
*
* var str = z.toString();
* // returns '5 + 3i'
*/
setReadOnly( Complex128.prototype, 'toString', toStr );

/**
* Serializes a complex number as a JSON object.
*
* ## Notes
*
* -   `JSON.stringify()` implicitly calls this method when stringifying a `Complex128` instance.
*
* @name toJSON
* @memberof Complex128.prototype
* @type {Function}
* @returns {Object} serialized complex number
*
* @example
* var z = new Complex128( 5.0, 3.0 );
*
* var obj = z.toJSON();
* // returns { 'type': 'Complex128', 're': 5.0, 'im': 3.0 }
*/
setReadOnly( Complex128.prototype, 'toJSON', toJSON );


// EXPORTS //

module.exports = Complex128;

},{"./tojson.js":70,"./tostring.js":71,"@stdlib/assert/is-number":50,"@stdlib/string/format":139,"@stdlib/utils/define-nonenumerable-read-only-property":146,"@stdlib/utils/define-property":151}],70:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Serializes a complex number as a JSON object.
*
* @private
* @returns {Object} JSON representation
*/
function toJSON() {
	/* eslint-disable no-invalid-this */
	var out = {};
	out.type = 'Complex128';
	out.re = this.re;
	out.im = this.im;
	return out;
}


// EXPORTS //

module.exports = toJSON;

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
* Serializes a complex number as a string.
*
* @private
* @returns {string} serialized complex number
*/
function toString() { // eslint-disable-line stdlib/no-redeclare
	/* eslint-disable no-invalid-this */
	var str = '' + this.re;
	if ( this.im < 0 ) {
		str += ' - ' + (-this.im);
	} else {
		str += ' + ' + this.im;
	}
	str += 'i';
	return str;
}


// EXPORTS //

module.exports = toString;

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
* Return the imaginary component of a double-precision complex floating-point number.
*
* @module @stdlib/complex/float64/imag
*
* @example
* var Complex128 = require( '@stdlib/complex/float64/ctor' );
* var imag = require( '@stdlib/complex/float64/imag' );
*
* var z = new Complex128( 5.0, 3.0 );
*
* var im = imag( z );
* // returns 3.0
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

/**
* Returns the imaginary component of a double-precision complex floating-point number.
*
* @param {Complex} z - complex number
* @returns {number} imaginary component
*
* @example
* var Complex128 = require( '@stdlib/complex/float64/ctor' );
*
* var z = new Complex128( 5.0, 3.0 );
*
* var im = imag( z );
* // returns 3.0
*/
function imag( z ) {
	return z.im;
}


// EXPORTS //

module.exports = imag;

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
* Return the real component of a double-precision complex floating-point number.
*
* @module @stdlib/complex/float64/real
*
* @example
* var Complex128 = require( '@stdlib/complex/float64/ctor' );
* var real = require( '@stdlib/complex/float64/real' );
*
* var z = new Complex128( 5.0, 3.0 );
*
* var re = real( z );
* // returns 5.0
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

/**
* Returns the real component of a double-precision complex floating-point number.
*
* @param {Complex} z - complex number
* @returns {number} real component
*
* @example
* var Complex128 = require( '@stdlib/complex/float64/ctor' );
*
* var z = new Complex128( 5.0, 3.0 );
*
* var re = real( z );
* // returns 5.0
*/
function real( z ) {
	return z.re;
}


// EXPORTS //

module.exports = real;

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

},{}],79:[function(require,module,exports){
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

},{}],81:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/ctor":110}],82:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],85:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/ninf":81,"@stdlib/constants/float64/pinf":83}],89:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":90}],90:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],91:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":92}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/ninf":81}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":94}],94:[function(require,module,exports){
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

},{}],95:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":96}],96:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_p.js":97,"./polyval_q.js":98,"@stdlib/constants/float64/fourth-pi":77,"@stdlib/constants/float64/half-pi":78,"@stdlib/constants/float64/ninf":81,"@stdlib/constants/float64/pinf":83,"@stdlib/math/base/assert/is-nan":89}],97:[function(require,module,exports){
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

},{}],98:[function(require,module,exports){
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

},{"@stdlib/constants/float64/pi":82,"@stdlib/constants/float64/pinf":83,"@stdlib/math/base/assert/is-infinite":87,"@stdlib/math/base/assert/is-nan":89,"@stdlib/math/base/special/atan":95,"@stdlib/math/base/special/copysign":101,"@stdlib/number/float64/base/signbit":118}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/high-word-abs-mask":79,"@stdlib/constants/float64/high-word-sign-mask":80,"@stdlib/number/float64/base/from-words":112,"@stdlib/number/float64/base/get-high-word":116,"@stdlib/number/float64/base/to-words":121}],103:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Compute the argument of a double-precision complex floating-point number in radians.
*
* @module @stdlib/math/base/special/cphase
*
* @example
* var Complex128 = require( '@stdlib/complex/float64/ctor' );
* var cphase = require( '@stdlib/math/base/special/cphase' );
*
* var phi = cphase( new Complex128( 5.0, 3.0 ) );
* // returns ~0.5404
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

// MODULES //

var atan2 = require( '@stdlib/math/base/special/atan2' );
var real = require( '@stdlib/complex/float64/real' );
var imag = require( '@stdlib/complex/float64/imag' );


// MAIN //

/**
* Computes the argument of a double-precision complex floating-point number in radians.
*
* @param {Complex128} z - complex number
* @returns {number} argument
*
* @example
* var Complex128 = require( '@stdlib/complex/float64/ctor' );
*
* var phi = cphase( new Complex128( 5.0, 3.0 ) );
* // returns ~0.5404
*/
function cphase( z ) {
	return atan2( imag( z ), real( z ) );
}


// EXPORTS //

module.exports = cphase;

},{"@stdlib/complex/float64/imag":72,"@stdlib/complex/float64/real":74,"@stdlib/math/base/special/atan2":99}],105:[function(require,module,exports){
module.exports={"expected":[-2.6336595969889602,-2.983866145183179,-2.880499571493833,-2.2537608173545816,-1.8676254582218708,-2.1235172313355193,-2.3398690591117988,-2.773714139219296,-2.85092384563248,-2.742756216332826,-2.9376623154450385,-2.1870629982620526,-2.0989086287394008,-1.821278655498401,-1.8083509008933583,-2.031470486368761,-2.237676059946674,-1.9843002711831754,-2.9092192043766745,-1.7726032877500169,-1.9411225135618986,-1.8693337561590835,-2.087113161005054,-2.8143918557735486,-2.42149411927959,-2.7704848995295577,-2.504577230328586,-2.283699093831514,-1.9373966627295431,-2.476702850037229,-1.8449563371355995,-2.0360574897275887,-1.5839384656718138,-2.7085524541351336,-2.6504190656939257,-2.2595256032558284,-2.400895669704504,-2.1072058368327875,-3.0907244750736043,-1.9748583786050187,-3.0909172376596143,-3.1386397763706233,-2.7017972223472446,-2.7314679502815538,-2.7695625454810746,-2.2607001905911046,-2.931823445455785,-2.309328633696329,-2.654036303145926,-2.457070813357219,-1.588157952177203,-1.957946711062523,-2.2950309265565636,-2.2223306643559004,-2.607238372850169,-2.9418336855991636,-2.1034966903022276,-2.1343847443824986,-2.3227069807243153,-3.073690637174092,-3.006592078764012,-2.744092616075844,-2.3143397269760335,-1.7807096369519821,-2.069262394361405,-1.9470595442936938,-2.5599115225818947,-3.082515980150259,-1.8854253605923101,-2.680217515653655,-2.9165610690693664,-2.030650822196436,-1.7175889637958048,-2.2542558585129244,-3.0547226072810876,-1.7656695437080294,-2.264847605655506,-1.5819138774589878,-2.376907728654607,-1.8185897080058513,-2.839071914468319,-2.6914218045932388,-2.7759605196791868,-2.110151015550076,-1.7214100837729989,-1.70229598326581,-2.2806609264461715,-2.845870254685731,-2.1521787229775002,-1.7298977627266705,-2.0240146364162657,-1.6519240845303655,-1.9673820372161994,-2.4510519366030556,-2.177016505785638,-1.8394718198609785,-2.4044473948992335,-2.422235614908705,-2.253961590770361,-2.412771887507255,-1.6924859200999092,-2.918472292303089,-1.8065442074368705,-2.1184144416526403,-2.7064546837627645,-2.470433029915328,-2.1271789250681308,-2.0522148521928516,-3.0004431091563415,-2.107635319316176,-2.767642151270171,-1.6134253966685907,-2.900111012486698,-2.9912403962187315,-1.887314254471887,-1.9694257752151596,-2.338345422226697,-2.647360508067509,-2.664476422828627,-2.898348596549203,-2.4271183263704104,-2.5873511019183564,-1.8547281760589103,-2.348275617748789,-2.1822525386267766,-2.794402134609384,-2.6508605201824635,-1.641871680979845,-2.1719900803130807,-2.7699407288127973,-2.244951639194167,-1.5927006438513964,-2.3692052568993764,-2.8385948748628347,-1.9590053335608253,-2.994938961633819,-2.367500907025751,-2.471807690952411,-2.3747560851152825,-2.7152173814420677,-2.0692891914919667,-2.0226898071913046,-1.7137677151927384,-3.018671026968755,-3.0297791116672936,-2.2738524103330455,-2.785806165477399,-2.2312005777164403,-2.5099774518802715,-2.2290875251498394,-2.3905194214725194,-2.0557730810655217,-2.417650419486521,-1.9728418464812416,-1.8336011618006065,-2.8793553886502905,-2.0110511948689824,-1.7288619009599293,-2.147125550843854,-2.611326818570099,-1.758648170645602,-3.0822439059622204,-2.3901130195014093,-1.7448370737218664,-2.2754207190277365,-2.970982354745484,-2.170245413835095,-2.841695086384747,-2.53895160658534,-3.002944935050461,-2.8074749557301675,-1.8398309990739035,-2.647900604170604,-2.4057670769044703,-2.334076205803095,-2.6670497820894328,-2.5155545532191703,-2.5862223079996562,-2.729316340265468,-2.4232805520848597,-2.3000584683095844,-1.888878448319095,-2.900294690873081,-2.8040602799238297,-2.5438726937528777,-2.6409932200553894,-2.5084893330184217,-2.3247710369349583,-2.2985214273859342,-2.578824244177427,-2.249606018930178,-1.6046121731809462,-2.312434500920915,-1.8187056679090536,-2.1462985070424727,-2.295717214077689,-2.6273313943627796,-1.9310361664957905,-3.014311105220233,-2.7291752090134125,-1.850159678358218,-2.641152938285561,-2.6122719166086825,-2.5900764779945864,-2.2937041944829275,-2.4920768096381423,-1.9324453338306251,-2.410550906168127,-2.35465470599054,-2.3961199933532,-2.523179770522998,-2.2467303456959784,-2.506973717162121,-3.1385222250222404,-2.698209240725152,-1.7407360432305583,-2.289897475174958,-1.6503005505115294,-2.2796780741081766,-2.3077694402922013,-2.551270429194949,-1.9458841578104322,-1.7062030776977737,-2.5717851815788153,-2.034234316245203,-3.032585037173303,-2.5416606841242895,-2.299739031492205,-1.844997788407294,-1.9497232837988514,-2.397475463237182,-2.5940838069419367,-2.1284401204294765,-2.1156742926223018,-2.381072265278131,-1.7711336857046045,-2.2699419900081494,-2.320121089346408,-2.8617328752367124,-2.318234096835778,-2.6155229473696275,-2.184227093966601,-2.370631057235605,-1.9050651388753808,-2.06914275962503,-2.9168980910082567,-2.9589262069261446,-2.198933437075918,-3.1408918011746105,-2.508078622088372,-1.6616037283535645,-2.806752497529359,-2.203484353281591,-1.8033292280652709,-2.9665004032247397,-1.577196030940973,-3.0357247316087275,-1.937925636313571,-2.2240734051936824,-2.880709863082301,-2.9798776354075884,-2.401067357894973,-2.446756520082766,-2.053606936181597,-2.3032082570531967,-1.590247827994433,-2.2712072635646816,-2.954822911481214,-1.922638761917659,-2.222214066745626,-2.8418528769506857,-2.2372509820636153,-2.8244954082269755,-3.0519500783553477,-2.8801554778574268,-2.095854277534952,-2.4320926683800397,-2.838711741055458,-2.904490186638347,-1.7195042497869486,-2.968530888621435,-2.310055108203047,-2.3220278477994656,-2.2464838215473915,-2.5306773963604416,-2.231103188285959,-2.5696889493659825,-1.9530298678527434,-1.8466580676445499,-2.6279874734390978,-2.3009820014707185,-1.7100899512003218,-2.5375493099290525,-1.7012905189978176,-2.400096319666533,-2.241933954883085,-2.1021940459720443,-2.030904353572505,-2.41920703845123,-1.6359865787538719,-2.8389496423895455,-2.889633374718353,-1.8017351587388883,-1.7534662965712442,-3.0062823785823687,-2.3685199122884284,-3.0440217212531295,-1.71424498266839,-3.124432044148717,-1.9361553193620304,-1.8100325836008266,-2.011954158410756,-2.912680455789589,-2.370576094142573,-2.2656388203394235,-2.0903733499505828,-1.9964493114623283,-1.6915931157703428,-3.057572750290653,-1.6288340866132078,-2.0848519652442725,-2.87550130628093,-1.639550368555314,-2.524373710296201,-1.9010536279686219,-1.9591134836362614,-2.7359056777309765,-3.0772974652454117,-2.6723863957120226,-2.428948051281885,-1.6165382819745033,-1.9922449288679054,-2.0394686579670473,-2.7169412371187693,-2.697158137695512,-1.8207673698026452,-1.933997284658161,-2.4224769161281836,-1.941298864577784,-3.0333421420478572,-2.124940249951437,-2.5900215936827355,-1.809442413125665,-2.950739626168094,-2.409911653855019,-2.863488257067133,-2.6898688295349396,-2.1806691397800404,-3.0362325031018913,-2.234882115065587,-1.6910917022927452,-2.384576803290913,-1.717684085723766,-1.942939556407851,-2.177116822017345,-2.6981008379495894,-2.2085470648642276,-2.5508716631562143,-1.8716288110057326,-2.7919150318799644,-2.718522200259227,-2.944387349690717,-2.577888561989439,-2.408467640934088,-3.0772833955469365,-2.0775239517582733,-2.46716462632623,-3.068777228300905,-2.66981442959577,-2.456482984322732,-1.9610712365392329,-1.9635696519232582,-2.8506744192251747,-2.569153246208412,-3.125419288325302,-2.4304899659128827,-2.838647291445317,-1.8464848944178185,-3.1145461488832056,-2.5071308948991824,-2.4418163651104043,-3.0202213738088637,-1.7053510337857996,-2.4008296507810694,-2.074040049886773,-2.179268825852108,-2.721764040264215,-2.7185819263815687,-2.9311992812474865,-2.4829698707066172,-2.084531440475277,-2.2560695658901206,-1.9563128302437862,-1.75683507874793,-1.6467144040061996,-2.198097647211518,-2.3556271202806993,-2.1970835331501855,-3.1319198983546976,-2.4786130937007513,-2.52411996028088,-2.401273043003396,-2.595959919924369,-1.7725915066300229,-2.3809894029892384,-2.405191090996741,-2.9304209989747863,-2.072357702517283,-1.820222123275679,-2.8284536375840217,-2.16385366727088,-1.832485138631178,-2.5301337740552476,-2.5672646646136923,-2.376098042569685,-2.324743125777313,-2.0372918743753674,-1.6324647844023858,-2.630814160128666,-2.4120551450435137,-2.661453602013253,-2.9433628823085995,-1.9394845731785848,-2.3087358930506294,-2.5078488970158093,-1.7025094151236642,-2.4273949895452906,-2.5105989679529115,-2.32783686366263,-2.0418410062961923,-1.7806777836637133,-2.917083521247525,-3.0398089588859474,-2.016277607213902,-2.1867246468866175,-2.5321374959544967,-2.3593579704050764,-2.9409946699614826,-2.374259219051614,-2.4413402095780317,-2.001194746195022,-1.6223236956652067,-2.259848020191515,-2.0219934565377553,-2.849520180602714,-2.9311555629844,-1.5889979529419276,-2.5600328416940656,-2.0014248266066086,-2.3326908358692076,-1.8799369118448908,-1.7197980894966192,-1.7193310256052532,-2.3311601975841674,-1.8169930303091262,-2.7569953506585807,-2.356309437247605,-2.215283572411658,-2.1206278382118255,-2.7861490895612304,-2.537990888381608,-2.5415982499336702,-1.7865899924041975,-2.128214834307398,-3.1005983105701986,-2.4296860000479166,-2.3268082048259275,-1.6703338107463537,-2.1226284291385333,-2.072519628638446,-1.7172107646821815,-2.6679148296621085,-2.165953070182164,-1.7886992718903438,-2.612220858326518,-2.9013571934390825,-2.156281426081859,-1.7079702349095538,-2.2102998915978747,-2.8062369722203053,-1.651586567408857,-1.9809730567779746,-2.0733981077013524,-2.6016398811783463,-1.6976500654952267,-2.093476830780192,-2.3457679953081496,-1.7364876091994428,-2.424117047790402,-2.467390892723553,-2.6895900170428466,-2.9514897094291714,-2.349488537458466,-2.2873203801379,-2.8663542838220755,-2.3280377966435286,-1.6880840149572858,-2.265374036673374,-2.9680166685442204,-2.323540868766836,-2.5406275295534897,-2.1937488841567294,-2.227918526575335,-2.9971377230449314,-2.6973139574454725,-2.601605574667315,-1.8411952185670664,-2.7141437563608455,-2.699849428102231,-2.3287406105189823,-2.3751907138473456,-2.997708738855569,-2.639652017406468,-3.1392106707585343,-1.9644336274698533,-2.7836722406855507,-2.013130278265499,-2.922159320477182,-2.4640911700610255,-2.804391606094136,-2.3254701674918863,-2.116705291427346,-2.1729132694284767,-2.7612764847276514,-2.6856660137054185,-2.975737290255293,-2.5862901548655937,-2.23007335747472,-2.8744731141783553,-1.8264211365007172,-2.572181345849182,-2.7045790084335115,-2.189131213558625,-1.6782712714665347,-2.0344147340540273,-1.829460523136366,-2.869977979092672,-2.1354598754562333,-2.2446910503081683,-2.81440310172802,-2.182484099278977,-2.9059167423883214,-2.879674318634969,-3.052901672009579,-2.338165224142893,-2.0039473579903766,-1.6441615032310661,-1.8074210341559476,-1.6539218611815543,-2.5518205465975883,-2.4609690205508836,-2.21461079020022,-2.766743264768213,-2.225920505518839,-2.4333718760067855,-2.3414037370871688,-2.653795856127525,-2.3702885051467244,-1.9819869349852028,-2.2207756765638136,-2.3134885309235997,-2.3377335703792856,-2.058016936109299,-2.4307477459901214,-2.1501473270904237,-1.6064129922631574,-2.2121552498765267,-1.8748502557232685,-1.9293536823300077,-1.978561621235975,-2.5878655371067114,-3.088122153916672,-2.2470498960684333,-1.8132366857879765,-2.228518967956489,-1.7913202007877165,-1.818437125014927,-2.3652021643845464,-2.683788140962698,-2.1719511989064664,-2.2155796513982517,-1.661327521751723,-3.034901965611859,-1.7804198602801764,-1.8941071326661703,-1.7893177828298097,-2.389546660116122,-1.891788242817295,-2.7408823671240734,-1.6948193552720734,-2.2096490362991523,-2.62854493267876,-2.4519649957441105,-1.850155598225035,-2.109880893822347,-2.6851682495609137,-2.4085759137459406,-3.135695881310354,-2.1658391243879387,-2.4625858008269947,-2.2539182983524038,-2.602823325028465,-2.642438533664781,-2.9857426987955384,-1.9002038145078712,-2.4079681374650006,-1.702799794577728,-2.644306889905187,-2.7656324822489573,-2.6758502596696405,-1.9693383310973107,-1.9574698308809102,-2.68866450725864,-2.493745160040259,-2.982865962859938,-2.9234787336312795,-2.752650629972951,-2.7506509340362406,-2.3936871403889213,-2.3238383683014323,-2.577625930513252,-1.930782481495507,-1.7371947258518332,-2.472890443417918,-1.5798780375970254,-2.6675673012822845,-2.3361666181516427,-1.6447430199430502,-2.517750650095496,-1.5747960394901501,-1.887579798123543,-2.623508413550862,-1.6802245144883299,-1.9694504576206682,-2.4759894502653133,-2.4172247763919454,-2.747847581331021,-2.5461546951767504,-2.2794953689809194,-3.0360612978953614,-2.628533046163153,-2.334720487235486,-2.3517344837816605,-1.800517953894731,-2.204055644131515,-1.8574481324223902,-2.824453374330007,-1.5893316959108177,-3.0951452456579847,-2.3156720788957537,-2.450361417588845,-2.6636500990703995,-2.59731976002801,-1.9734423262421796,-2.2263158616928176,-2.6323805632436494,-3.117370481695623,-2.619397649966854,-2.8996722436713704,-2.2078082005562507,-2.7178000817527543,-2.7652120039758654,-1.947343617283213,-2.2833150782745397,-1.6658843925772406,-2.779658617321599,-1.9568530825693191,-2.361572778872076,-3.0051884461748175,-2.5847530428743193,-2.754978157000209,-2.4630457596469717,-2.6324087491190444,-2.44141600577111,-1.969370129469656,-1.950080309473769,-3.0831281263656343,-2.7078438328875603,-3.088258724987663,-2.3177886341910248,-2.3328448559400705,-2.420475051666801,-2.3432490648781426,-1.6532431715402942,-2.204258681712107,-2.3239388610339335,-2.8875374257265816,-2.7983536369496274,-2.3360889956268283,-1.6272575036081627,-1.92197822466299,-2.0837573989198876,-1.835887581009247,-3.1214185247029644,-2.5874051907984015,-2.3936429292938737,-2.1056043377891,-2.3203490777916342,-1.7556788746868095,-2.1122600751740315,-1.996992721290109,-3.0098260666063874,-3.0026478931644975,-1.9129961961507937,-2.5526105514930233,-1.7849033493111115,-1.8783415254494946,-2.414600373072179,-2.8553511762650943,-1.9402518531483366,-2.1862709733837105,-1.7749852259949837,-1.8097592803501916,-3.1214830509029112,-1.9991511765242616,-2.6093624100201795,-3.090507522753237,-2.9305457734960774,-2.1762300124632805,-1.906141309316026,-1.903143769271958,-3.1291418501135637,-2.567076036405159,-1.8965587867482898,-2.4690701435537092,-2.2708690519912333,-2.243883866897929,-2.3565064692243234,-2.2448366558482373,-2.8045031843248838,-3.011901781354279,-2.1183861240280475,-2.394185977590025,-2.6236581989637724,-2.6440271608923736,-2.303683629713299,-2.2015664293682398,-2.6892531043659966,-2.0921124791086054,-2.656927425322652,-3.1398983981500668,-1.647640998139714,-2.4140557895141974,-2.2674899174292875,-2.599211516082142,-2.2264843955426823,-2.7009167916047305,-2.8714691381469972,-1.6615650912424682,-3.047231442350004,-2.398361458528517,-1.8329485327716097,-2.087133622027059,-2.2399275537480614,-2.1059408769121397,-2.3242131844036225,-2.987944579282258,-1.8080703788688453,-2.5854921812342315,-1.587337754708519,-2.04613170707734,-3.0953285329927898,-2.5353099225981186,-2.3604237775710084,-1.98114723180794,-2.3207994485681223,-2.3297869831912195,-2.4601878887072224,-1.8222706472715433,-1.600587180047792,-2.3047355722788048,-1.854124470982276,-2.0884557601507545,-2.28093474137208,-2.2724909599321563,-2.6082612148701916,-2.0053917508874983,-2.027105443938245,-1.6760630648718398,-2.649351213981285,-2.4510906074354595,-2.5585632094464223,-3.0485012096591504,-2.649433525792798,-2.0619067300002722,-1.7634825404613566,-1.8286211317880257,-2.7748526118398833,-1.755882145149389,-2.579126807580224,-2.3440219839568677,-2.7412555609691522,-2.2326542873322635,-2.373242715330207,-2.1682971629067107,-2.148620889222145,-2.6035436773147618,-2.6895046471820647,-1.7402952221851868,-2.2645502676004954,-1.7512263002172823,-2.7427140324869987,-1.6238906391411145,-2.8811508523524387,-2.9944280340472855,-2.810601110814166,-2.1581081335480556,-2.3416154900431065,-2.457669516570466,-3.1299204155215636,-2.619439788090677,-2.016725439226554,-2.824119307851427,-1.876553482993865,-2.2464370560013305,-3.0616576558895985,-3.0308136508632635,-2.1884538175485617,-2.623306727287165,-2.671468715119923,-2.732080112205314,-2.2608231626430038,-1.5914125956694818,-2.9526900964814575,-2.689841979675747,-2.216146800510517,-2.2500899115829704,-2.2032648825186563,-1.9711064894030614,-1.9665889027915513,-1.9535969644082725,-2.479614757625485,-2.328084833014281,-2.5407825270814737,-2.923661012070851,-2.2877188700776245,-2.662466501711444,-2.3901241141359493,-2.9715360715053842,-2.2796271621998736,-1.7936292092471111,-2.8741827712354477,-2.6950150406497335,-2.737009620106636,-2.2347399443689286,-2.6264672750909033,-2.411577885255931,-1.9222101418340778,-2.5918265204106605,-2.9408251798266116,-1.77747039049781,-2.0539547049287465,-3.0324796647112,-2.8064807456752656,-2.525507740882876,-2.376182927554649,-1.6723548465667983,-2.956743321679906,-2.288097710993448,-2.122199847833499,-2.9722912597683004,-2.253918390451217,-2.385270103808802,-2.735421268944571,-3.010065242634358,-1.869474096176202,-2.181536302715951,-2.4308345624868757,-2.3498539735228383,-2.896553597403065,-1.8473721008895676,-2.68419350392516,-2.9450800413691485,-2.918436640582862,-2.840675407786888,-1.8793388714630546,-2.512893257925836,-2.7423331145252905,-3.006896936936685,-1.7304983737878923,-2.9205963282590677,-1.9084313208769768,-2.396570848637386,-2.969922321866884,-2.150547367739395,-2.4331596975398027,-2.45351317862833,-2.9115790430438224,-2.7562100679661348,-2.075036319483773,-2.202510856313392,-2.25828845818529,-2.335705281678314,-2.7358393487341885,-2.22960416495408,-1.743384033205772,-2.9257988272425495,-2.5435790054164746,-2.338681377848812,-3.0111633690713306,-2.9687641922926953,-3.0468862604490616,-1.9630999656551,-1.6821564548072907,-2.4115049129841104,-2.1600450407556204,-2.244488736053742,-2.1625390780419087,-2.4275614468466795,-2.935271845185777,-2.5464373288931337,-3.0177288079083775,-2.9650580456395326,-2.64866537916241,-2.82500806522086,-2.024987013528574,-1.6589228049633071,-2.3952362558649396,-2.420239175280898,-2.5790479520221496,-2.5937137192062716,-2.178775228325163,-2.1887670666933454,-1.5832398914882928,-3.111373204870116,-2.3691352675483595,-2.7504251992531463,-2.295717962134908,-2.1489395695953952,-1.750796592835535,-2.487127295057433,-2.5917256882082604,-2.4192583693080687,-2.3943095875855955,-3.0541691069243675,-2.305518682929538,-2.7237924614801017,-2.7655619118063077,-2.7697261063850904,-1.755719248774221,-2.330383061648599,-2.8372534979596593,-2.6511602796771423,-2.5547888147011357,-3.0813068888639132,-2.4341339030677664,-2.3207624306245327,-2.025595961986757,-2.851352018963061,-3.097147101468359,-1.8652619061246971,-2.273681142947039,-2.7397212627137364,-2.1268471497737735,-2.8875293746695845,-2.895098315876176,-2.356077821725823,-1.6228125656188845,-1.8281517602099704,-2.1962079115767983,-2.291009715568187,-2.3418683968448732,-2.5365767169603055,-2.343227818455132,-2.3182964306368756,-1.7163763710801871,-1.831410497610923,-2.8079431871016802,-2.2834485913950893,-2.4396651937555442,-2.3308976224325697,-2.829251043138156,-1.780060305256521,-1.6379113902549134,-1.991324065012047,-1.675191863520635,-3.1302989585057683,-2.0205392932501427,-1.8592670133774214,-1.7181639478953714,-1.7479870486801832,-2.889904654320296,-2.4209886133980554,-3.068521802945454,-2.1932404361646363,-2.0824667611448024,-2.26483109956847,-1.9331565074618944,-2.0480311645733655,-1.7719830688916078,-2.1881736084348056,-3.041216773259286,-2.3380792533161805,-2.890530588353139,-2.380931396102892,-2.063260955069355,-1.7246632838876559,-2.412454613099772,-2.2028225301181883,-2.1987977790363695,-2.890828877136383],"re":[-147.67611286195003,-82.0847023416602,-386.90740983259167,-57.84797889972304,-118.72901157494509,-186.4016349413201,-262.43045590940994,-459.5542083504971,-336.51565163927796,-245.58595271324256,-161.3214289622238,-257.8047767884424,-274.51576067245986,-67.86362651914291,-70.66436565274859,-184.09036528307743,-321.7037065176133,-193.96877199121286,-422.1969861704421,-65.5111041466061,-155.2987705084281,-103.826091517643,-152.43227255453084,-396.0154599813667,-490.6089243657483,-312.96753580867795,-287.91523306256903,-278.3824493919014,-148.4349388363252,-355.78696581550275,-132.41014106592618,-146.4891478232371,-2.690042702875761,-484.8857607788728,-124.03542917423648,-344.5535137537817,-354.2078829236478,-123.9060689108612,-116.30208423534627,-117.13975716685721,-295.84259061187043,-33.685618061078614,-414.12055995753326,-457.1656066337283,-434.33848601151993,-359.3735049425402,-370.5804465425898,-428.5527308112408,-468.78342760396316,-210.53149689382866,-4.726903762689583,-110.66040484539997,-325.70590619596254,-85.73734323048132,-401.5024758954273,-367.7272984752671,-157.54149170450916,-124.3947305422215,-249.20341451501105,-322.90308452300854,-482.09061678058,-458.56206455806483,-71.51231161438332,-100.45774813105236,-262.7071547301728,-187.81485151837373,-379.59522619680183,-378.8394623742638,-75.40081136168475,-435.07550418556605,-482.4782820520461,-88.15500819938893,-8.419467821472626,-260.75177083203806,-142.98754401878676,-22.06413941626806,-322.52859008969426,-1.1056477586847135,-397.02990054164354,-121.17517455736771,-167.21772483153373,-490.629929648998,-494.4661360764756,-238.5910478608856,-57.514857737914426,-63.81358185421837,-222.01561188293982,-428.3049790925013,-251.12583835904135,-59.502417946073024,-223.45210635737865,-18.86104673173028,-191.98837881624186,-242.49131668338907,-168.28225349419546,-125.53430014028966,-478.0283146563168,-387.70509558864376,-98.03680262098746,-372.09406492304186,-46.63542197617476,-231.24505521657014,-90.23689546067982,-151.484368255003,-473.29391294173394,-341.4119145374671,-115.56574960792388,-191.19859153729922,-283.4245293140255,-282.23638224364925,-223.13893539940244,-15.6524664001495,-390.48268629080775,-305.9920673651284,-61.98359321158031,-160.39140885241298,-392.17591112635074,-301.09643509500125,-461.5115964755038,-371.70765398502704,-443.9907196590044,-386.00048129018495,-106.58520385996195,-214.7943301622376,-274.6687725900757,-421.82079198573143,-432.402179216272,-20.260407675898872,-196.35494844838476,-22.55543237001212,-173.0643213288029,-4.448532814960937,-312.3022759917815,-282.95252327399703,-166.36628184711023,-322.2542362779739,-324.7666550012387,-330.0382858786005,-484.5660459122615,-77.63386490140311,-68.00921194731768,-222.45220472772488,-64.59098133669106,-463.83416993899306,-386.0939818304902,-331.68949281701754,-449.89676090455134,-310.93492146705614,-325.21918140083386,-163.76025953233497,-356.3937999579508,-156.14892216558096,-437.9074308445421,-66.14792372915635,-120.15269200707912,-266.0004027805495,-207.6739542898377,-56.704716788554045,-246.96775344587485,-368.2919696598083,-77.82802590562044,-338.99351801911325,-112.38916727397496,-61.01028768796801,-315.3457472053355,-273.28263205461644,-188.321936291455,-294.6214994544392,-417.45683042116144,-112.86942647545806,-397.3356711428462,-46.51580790192289,-452.82340970262004,-204.9805990310928,-85.49769716946298,-62.106794844134505,-345.28758743997423,-277.71085952277787,-397.789759860687,-436.9181282683593,-327.4670902381552,-137.99240943641743,-442.76866037214637,-437.47355517014086,-427.3639675473109,-374.3126727142718,-450.49130276285877,-236.6065396256215,-274.7460839681368,-369.1397492493885,-351.88218561023155,-13.565030300788262,-346.75016323656524,-57.216969887183275,-317.77994408059175,-336.7657301767254,-402.49342172341153,-130.3402437169947,-329.55300781611527,-442.8858302819828,-142.81295024293573,-458.19053575503466,-474.5889310660435,-125.84749039740373,-294.32051561359117,-260.3599514182605,-155.26936506806067,-156.63770619259142,-395.3019429749647,-445.323688662781,-184.4476676585598,-384.0150577473521,-464.91614166943316,-174.53608705867586,-214.4912209334813,-24.885464046940477,-263.3288852037129,-36.44070899554897,-392.59497245955487,-298.7575613275879,-262.590753521042,-162.50868295272647,-60.10732662409324,-205.02237143233026,-156.52458826791138,-307.52591921940433,-402.6296429648006,-290.77351878245196,-120.8511248242724,-173.670488869913,-273.9543963608705,-212.15577005890097,-59.26301403870882,-203.73597514432228,-404.7508710765514,-75.55657128967319,-405.93330819021946,-358.1055431350825,-472.8894502853118,-313.45720021309444,-234.96000069392642,-211.50875626774902,-293.8373618446665,-141.39827065602896,-143.0588810663691,-401.39568782473356,-359.98299124140607,-199.79401359890736,-390.8844963760052,-290.3272420512315,-15.282344743886679,-431.76674712051874,-249.1978797516481,-42.01988473228469,-241.61506797103138,-0.683380121109689,-337.89952238243313,-59.77078266302416,-240.05551764136678,-218.3772145888917,-489.2698279327258,-275.78724383572506,-354.09213082084835,-237.71593301174798,-171.1282296771479,-8.341548181039048,-182.97595281738054,-237.62407286159203,-180.3357227144966,-223.52816891825123,-390.386415385228,-243.2759500423486,-362.8915199601107,-487.78726460360133,-407.82133645891514,-80.5376406263133,-407.10558903472315,-428.70230704242687,-310.8874614814383,-43.36899463264166,-350.95831470170157,-383.53978411763387,-224.56884455760252,-391.9358374033287,-466.8716139121557,-301.17870198903597,-254.21583011580884,-112.82909798560692,-67.40371133152601,-444.7639890554298,-352.1350764432842,-41.26739004327729,-291.7568035761483,-59.971890323877396,-421.41726754938315,-321.62233775866366,-228.24794986580966,-196.09778639450636,-14.631035734271713,-30.32499183462378,-49.87807499849362,-432.7407303402394,-53.41592296038744,-25.236209378034502,-295.25677008406126,-469.0900012465896,-452.66586824613677,-11.845547289374924,-467.254526961185,-165.56863499022367,-114.48997405599759,-150.60356010668485,-103.8103418804297,-435.9610813409176,-331.85105160773645,-262.03674469529756,-122.10263292739631,-59.49896268997523,-495.3563001604755,-26.08542832087679,-150.63762096468102,-440.72681062769635,-24.96556104902703,-220.15109921476673,-104.14943491039853,-100.58610125750155,-346.75098091711664,-470.7883604597808,-194.75501570232723,-343.9854010811557,-21.74722567327003,-202.59730713884082,-235.3105671979363,-147.6584193538474,-410.0752467378209,-82.60448527097053,-10.514860457628394,-223.49281859966686,-134.91944784972944,-493.94481138917865,-222.4311719306802,-397.54366335068124,-97.58273545241258,-283.83198892905904,-299.395947261497,-401.51760052282214,-327.1315598257707,-37.60715305847317,-149.17174162386092,-242.51547906497782,-45.39784819086845,-460.4749659045129,-42.165839018237115,-151.05683864628682,-255.3446564431261,-350.16226638799196,-218.37631443943417,-236.84074824664015,-23.855002587661044,-392.2034264408353,-168.51945315474404,-285.27323731400975,-406.65492821148894,-359.8783480936031,-460.88820670606935,-53.05394162226595,-214.44765607539918,-100.19370213483624,-138.33591409327317,-320.5279090586971,-111.29402912182351,-184.1219161918034,-363.3669181293726,-260.23758471650416,-376.61156659752714,-406.622966212326,-270.86956368951576,-139.03605893726635,-100.1811007474045,-305.11228411675086,-433.01466569415834,-320.341662627179,-28.767160309298934,-112.80705790719836,-200.26106554918687,-199.5308692374419,-223.98998982589256,-382.81294531045415,-321.5369812957477,-424.38256198735013,-213.66215992258964,-166.73578023548652,-164.96910879521798,-80.29011853155765,-33.622792963572735,-183.03882830397157,-353.674358893589,-291.41843925870546,-469.82737814832245,-460.2667193124781,-379.9579120325517,-373.98070592463006,-409.0227771069197,-71.33520321700092,-285.7850683672678,-426.1323697397549,-454.9579030536768,-251.13903890026367,-95.28585051532146,-270.4843247352433,-148.32826771317775,-118.47259582880609,-377.70342381914736,-487.2859084659511,-491.73065048860065,-422.20668573870176,-243.0984537407116,-16.72554233022683,-417.61437994762775,-289.9979829979722,-327.90826224058003,-414.98688507583313,-151.96196480168146,-425.7929672911509,-373.5550380122188,-46.96787761929433,-486.9675294336876,-114.48911985564824,-436.01400475629424,-213.1904389046405,-99.16752224742042,-463.1609616829029,-408.1914612572062,-122.78962541375415,-323.9710896725905,-412.9652410680169,-309.51653888230976,-392.60592091974013,-461.4792566338618,-396.0389439242518,-228.92319010887275,-18.429406646224944,-345.03734105271246,-157.29976430590818,-472.96730590824933,-353.9553758767511,-8.582360956518432,-381.97074629681606,-166.0576325784231,-294.3736318111956,-69.6263477238872,-49.31943112274695,-72.31899318348822,-183.7940695171283,-45.37711636976183,-327.4693350066268,-297.45648025052816,-180.77817256653537,-258.0522205212459,-326.84759661976847,-495.80718774784293,-391.1182415201978,-18.573767461899426,-172.17766428433524,-350.85554373407126,-448.7275861097999,-419.764296940776,-43.70792767226439,-291.6000863799924,-117.2051883577665,-61.57666178341081,-423.5901505595898,-310.69175301653763,-88.37601454488264,-156.3189005006481,-281.46801464136405,-296.12632862662025,-35.49024400994505,-324.3866464131302,-377.255957239506,-36.19914988954398,-182.80562701045378,-160.66358765387935,-303.6390496893916,-37.284303876167215,-81.22727820273379,-278.2318830992723,-26.557435270781472,-340.0259703598453,-460.7946150283647,-364.86983056273215,-485.4560157933553,-240.83193257697033,-259.1817565399703,-451.1115059211036,-295.4678238302716,-15.83026859759884,-278.10560063853075,-195.6248566621759,-252.35039175650186,-480.29279790225246,-100.53969146088104,-115.57767821343413,-311.10676928012094,-277.0920027055811,-279.43510741337695,-114.19819072492766,-188.71882464348045,-307.8090657169177,-379.37250583394166,-489.79032028192285,-463.18841443834657,-199.09216410419972,-192.0953791761867,-158.0130104270061,-392.79510742839983,-165.7857991234951,-370.99956129693254,-241.13451423080267,-87.3786885077713,-398.3570162781419,-127.26252963701523,-343.37852706761805,-288.93727511245606,-183.1315096952315,-378.33315929986986,-369.1797784013448,-331.1468342090802,-423.7874639949393,-49.24938382428468,-334.38577743418074,-172.86256349260765,-265.47977731550276,-15.575734342954227,-199.49603694986985,-40.52719756458689,-129.17833872760198,-172.21402070348734,-191.30611256419184,-493.15090946069284,-242.42067842751447,-395.589131295174,-279.3179330577825,-215.38692624086065,-264.3934456376115,-197.36399645156422,-14.57150954424391,-59.92607446487885,-24.888625221482606,-401.1093620599738,-226.07747204253326,-335.0970396141293,-392.8155447501591,-302.13186325586486,-232.75161686785296,-66.44940350597051,-327.58115479971985,-492.98918524707193,-213.57362102677214,-176.9844982065135,-387.8334993428225,-327.5728007707712,-81.82350609798705,-46.57520885807398,-304.88500641738017,-12.431531101204873,-224.6695815793519,-127.06142868729043,-168.18693467773215,-158.93875181379101,-171.07459055223518,-408.35149524022506,-223.06780115502235,-87.9772063548545,-368.4484187574304,-33.77583427821407,-115.88016018057267,-468.730210892227,-210.0101754411957,-157.09020309413302,-314.56280596363996,-33.84404023871901,-197.73716659316142,-73.56412819310887,-152.11648147932334,-67.23546383562496,-454.5708651223758,-157.73049971858134,-127.54197242839726,-42.71399795686703,-93.03030800916201,-388.5852730045601,-324.488597567688,-47.769789041003044,-204.02580568163043,-219.89398619877787,-404.42459217739855,-441.2527434806486,-257.93132947265684,-455.09402210294405,-237.3852312567847,-469.157566456344,-476.22975871802345,-461.1747295982792,-19.733766918813235,-463.28132871322623,-63.28673201621149,-419.01947669041385,-441.83763611124436,-492.63557888921036,-113.11175836490995,-177.3086841672532,-413.93715780615804,-451.50855202175745,-89.4454592534648,-438.4354089481222,-336.12732961904914,-197.1169096886427,-226.95088693985034,-258.91105386942104,-423.71577597414336,-140.47052699865702,-43.41846359357105,-441.47926595948337,-3.479466300224998,-208.95880188669702,-435.5120843094377,-34.57543779921713,-451.46265642360595,-1.259968005492218,-30.929885803948064,-423.0892679060495,-24.663475557812674,-201.83892797635073,-259.10826162249214,-479.5635458017071,-312.14551806884816,-230.83570352985305,-233.47331260083192,-289.41123775365395,-450.37077502888246,-470.8223956473094,-450.252203480762,-14.587588508929606,-178.14484639208374,-63.19031753523963,-349.0580694490993,-9.089669996250272,-498.25154675439944,-442.21506885888374,-443.3302483547853,-394.28795982558364,-242.8628181919501,-210.27896783324806,-199.16231356707914,-325.4181803893377,-392.14919317662964,-167.59910586776383,-380.8948567427336,-288.11669499684336,-93.34671516435644,-499.91807605998605,-160.7974936026797,-365.4568139083816,-17.072472293003237,-392.56854931681715,-153.1380727595345,-73.9921777791418,-273.2034824310169,-293.5907139931585,-425.97284869865183,-426.4082802712993,-453.191100123942,-169.97065341195804,-13.420120369553977,-142.16450788272306,-381.5489390247494,-462.80111027946737,-77.02287278054476,-344.5626413301556,-464.3278308509783,-321.3039846205971,-409.53821890158815,-25.15931830209306,-342.3665054295044,-276.6619134430068,-405.9108337219749,-450.44688786000285,-433.60012727017363,-21.18182079968678,-174.05188268038464,-119.19666146880847,-115.06751953857363,-191.60683963834256,-489.8194344960981,-67.18318859539285,-167.3229996256659,-309.97429033968547,-17.880403114817867,-256.6768065461802,-33.57818885103148,-467.0377075485703,-234.9707387570794,-154.12415694813552,-331.8443044802708,-53.636797231293556,-115.86059168880824,-495.03647173408115,-341.54541215800026,-135.98944306513138,-75.0443994367318,-82.74353258396549,-83.42589498150666,-436.0441653512287,-146.80984160286604,-418.7243169902194,-403.80910883640706,-328.7935974535402,-317.28030483042767,-169.62673510425964,-57.58547502198208,-219.38540925236083,-438.25597220335175,-144.62823289221893,-473.5382227796191,-183.31697955512305,-219.69815747427845,-232.12974359772608,-284.4619480877815,-409.97877761865055,-285.82359173428597,-263.75767295860555,-310.8311686746289,-358.9800539511041,-198.47260123788135,-298.4555278791253,-82.86079592456086,-132.73838144549964,-55.69817881087602,-436.0386584662137,-157.78318816723268,-20.564752208712456,-118.68219718459738,-266.14994854806093,-473.0004249527292,-285.8077425322182,-338.7918801206422,-379.9747568274216,-15.225939281601985,-347.17470018067445,-362.78560906729695,-111.47924973089374,-179.2460150757741,-241.04545697197764,-141.15643612588758,-410.19836228753235,-466.70048983656375,-97.29677531747727,-333.8735577053522,-7.1873756046099135,-161.9704745585161,-292.74555804608036,-431.76219301416387,-192.7275429404579,-58.481608809352046,-372.9292953314208,-57.36989035301021,-240.6837958045771,-95.0631392679071,-2.782816285710865,-428.4292925840394,-140.80210667625104,-74.04201496515317,-75.65643539715239,-287.2936133843972,-423.9730651764793,-118.62676198667677,-152.08007602874306,-44.72277112651668,-253.388025155057,-366.5366536609447,-362.0895234345667,-388.2657521728603,-340.82688904540316,-240.72280553540116,-77.41597313622994,-90.03166447220012,-461.9254200206896,-87.08308266511999,-487.8428282541484,-121.86836510798449,-317.2972555963708,-331.8151227856163,-294.0501920153303,-288.79806116162723,-319.4293552248504,-332.2698523541783,-357.49547803126967,-84.09237504182165,-374.4055221585849,-86.12952010171082,-169.91258413704313,-24.27305180467332,-142.19229960146095,-284.4001652446234,-224.10393003408257,-290.03642728479286,-328.3834161617134,-420.9522537568533,-304.5561599442254,-473.80146719218686,-238.22221883556506,-448.4965193335858,-107.54570934657647,-47.196064331983536,-54.59390117822305,-215.5185801415741,-48.28977928540334,-421.4086342250708,-347.69821890275153,-395.0380178350371,-229.29154251060012,-3.530551089937495,-455.42971727593573,-488.12103487505,-143.5946079480498,-134.40463076284414,-133.13360329351764,-173.77700529271723,-121.99374844601529,-191.86188943009387,-292.3814357778134,-385.61978151400155,-311.82779807198244,-410.0926105831728,-381.2078711654732,-486.84508219518705,-307.03758245593514,-257.67277439911686,-169.6290789272461,-69.33272123658985,-357.40056158538624,-337.38980229729333,-434.7675157678182,-333.2846822125741,-479.53255775677906,-401.47143356406303,-179.0060852855363,-365.117240174615,-418.1986982185338,-89.19583169378586,-260.8928217321265,-32.078792353824824,-431.9152897609907,-287.2397036119797,-264.5530153842275,-30.831485692234484,-285.12387056407994,-328.01861832719106,-294.5938470052938,-463.1800417756744,-257.88560927725223,-228.3579783845957,-482.8577762263351,-432.1143229999468,-57.81435450433703,-304.27497248876443,-446.2157424224479,-402.2071398513657,-376.05783846411765,-76.4901573306066,-369.7063858651455,-475.1463877368171,-384.6631898907037,-498.69960061586295,-111.42553222247764,-412.4162877506148,-238.7135700690597,-293.87106798960605,-76.56978938391012,-452.72402812534983,-164.02545388401956,-75.36047445965465,-108.4565847261072,-251.41065261435637,-382.1840981353202,-368.0203602428816,-254.9904019221313,-454.6675562865814,-82.0890639271643,-182.86754191938016,-402.30691251241757,-194.6161688599821,-408.3993593527675,-215.24356269780586,-64.78438901305871,-478.8109493664846,-405.6189762816794,-355.470207921418,-382.7930557164254,-240.8702672994335,-358.9699451089675,-131.07572670371493,-15.717419623539563,-467.36143254901884,-107.60554373859065,-367.7614625206963,-281.6510398340752,-320.09288343257214,-430.061926485769,-366.6650859295432,-131.94946185455169,-213.38661007880089,-496.4779908309864,-249.8351833262754,-89.64225618832522,-44.087016986024686,-255.87283602535604,-211.90281396393806,-382.2017409883605,-342.900987229824,-248.23692628891547,-82.64265004168946,-4.331693680267756,-177.15421417578492,-309.842512357842,-168.44303084945687,-176.51937858690135,-316.0216311121113,-80.70096034379637,-486.1025954436131,-173.71170324661688,-272.00573758018464,-339.01246321653053,-409.89110723457065,-403.3472334705294,-354.107902708203,-113.40249386308766,-358.235987907927,-63.13207640362717,-298.1480884653072,-443.95213973028183,-319.2240485180233,-276.8889035185291,-376.89217314539025,-406.67834112211756,-43.92562716330717,-112.14057572497349,-275.9136344051516,-104.71390154315962,-102.81009877378322,-396.370932890468,-381.8812419327312,-138.99769639155545,-94.05299195918937,-425.6664460758538,-400.5998921165719,-23.18649657241334,-30.22327559981097,-50.100891213991304,-436.3458286494696,-287.1652010101764,-426.16063322846196,-355.4160037921905,-259.2369309872734,-31.796668898385285,-59.38996113839812,-289.84103624029166,-358.09470405723886,-402.21817330122934,-54.32176567405389,-344.15310856452464,-92.53523462299762,-32.82686256496603,-166.44953169881794,-52.055479554195536,-482.6661524659801,-203.39875104047456,-105.54981218385883,-65.71652222327762,-54.58988418871136,-271.5612456082419,-238.61035789132157,-371.2469840567226,-286.6269587362069,-174.0671074464425,-154.92292888576742,-150.07310692087384,-119.95071355084796,-76.95773609296963,-316.61466810130213,-495.2667219555825,-450.7745117310531,-478.0816735571528,-245.68626409946947,-217.44307723977252,-63.79506168384241,-454.70667788829655,-105.47018816322684,-220.31721913199763,-464.81769615368904],"im":[-82.20364129266767,-13.05537583788019,-103.37868821671114,-71.10332869790237,-388.17410633292616,-302.1805529330293,-271.14203071546615,-177.12346351742636,-100.665728663347,-103.49540641132005,-33.362103982394586,-363.9830399809474,-470.5575201809358,-265.24173736462984,-291.8491049784525,-370.9340292249196,-408.67459359503755,-442.0402363879342,-99.9122109582412,-320.2037415883406,-400.00871580071293,-337.3885870479834,-268.5172486134041,-134.4077427435666,-430.38287500470716,-121.78759604832035,-213.03280856929342,-321.9825565544158,-386.59241399144304,-278.9262881868796,-470.8050535804095,-291.8002555842144,-204.67656408996515,-224.16551264874806,-66.34612545530472,-418.5528001225265,-323.87650558343296,-208.39978896999222,-5.92118322573798,-273.9536823293982,-15.004792619940254,-0.09946978329478107,-194.85641340931227,-198.766221495852,-169.47910243881293,-435.512133186683,-78.89701419633089,-470.72923377892084,-248.57398354649217,-171.829006749466,-272.23423566519676,-271.4076209991887,-368.2007117619892,-112.4235042577597,-237.60158096454876,-74.44974209483757,-267.22321719894904,-196.8396476472871,-266.4787851517503,-21.959530408346307,-65.48079376383842,-192.52704572483404,-77.76388233718635,-471.51791104929055,-482.64037666376356,-475.37684177624305,-249.61189419963537,-22.406648070691702,-231.6894386053766,-216.30328199882132,-110.44343265363277,-177.99471478538132,-56.94363483855158,-320.176817077392,-12.452674649396256,-111.78616878169834,-387.57540039609376,-99.44656328101897,-380.91386103287925,-478.9669810393833,-52.18871156765381,-237.10466461529367,-189.30471360963307,-398.6132145284601,-378.9779970447218,-482.4752698459003,-258.3700143392016,-130.4854652494708,-382.1461727520952,-370.82947383069245,-458.8051251342919,-231.97546384331514,-458.45300090207087,-200.35737220461925,-242.7238524026579,-455.9367636742242,-433.986751963264,-339.6029053987827,-120.45165578264272,-332.2041342154243,-381.33907052844995,-52.46906757428016,-375.651173716286,-248.40313513831458,-220.0127684707922,-271.1300158949513,-185.8204355721642,-365.98973567574524,-40.27305506941159,-474.23453709702943,-87.56305801207898,-366.9557858244957,-96.17106103004535,-46.35643373786002,-189.2459062719878,-380.8156564322376,-406.43182891568665,-162.2418039946728,-238.57886063572442,-92.24214550379928,-385.0903187014473,-238.91747099233473,-365.2478147376016,-218.223414122945,-391.7746810531232,-152.6349743805966,-231.04499880605078,-284.5751508621911,-286.27730596581546,-8.791314005602512,-216.59030549699222,-203.0568363932268,-304.2796200891201,-88.45773297782367,-406.80048283548945,-47.60152397948802,-317.50455947746434,-261.3587130624644,-466.90323010937,-35.26449658987107,-124.93720269436027,-458.29343790657595,-448.69315224279194,-57.30415851512627,-43.351349783087855,-391.3619801022349,-167.18161925954323,-400.30096602242935,-237.92759022564945,-211.74879123521816,-332.7303661561346,-296.3242144708135,-387.1394763538345,-155.56659597297173,-446.6192582439207,-71.39944582824975,-440.8353133894991,-355.74904913209883,-379.9886390617375,-215.92006665127428,-409.42047765096976,-20.142495431687113,-105.0123968238762,-347.00515252114405,-370.8970297874085,-47.082544728296426,-275.59508774720155,-91.1040440530102,-287.21906864110224,-15.750140696212277,-137.928002285845,-168.70721009024493,-243.682378024336,-185.60250798181664,-89.36601328449245,-31.903901600040086,-249.66505782731574,-172.32479319538209,-173.96945636268535,-381.90401917258185,-366.46250739859255,-419.09574093910726,-108.96219419268893,-153.53698493655688,-290.9471745876413,-204.77938020699193,-330.6059243904017,-251.96417381554613,-308.41617690042835,-232.85808859955102,-436.2024926911818,-400.9912738109668,-378.50771398382676,-226.05026482726464,-489.82756311013065,-380.17743922267766,-227.3953592221526,-346.0268314496565,-42.17401145364108,-193.7662459301992,-497.83999557692016,-250.57229578040608,-277.6368607433816,-77.42052773647845,-333.61131897643935,-197.72795029912893,-410.4542446111076,-140.4719649721614,-396.5211806749627,-411.1118870524679,-131.23741133426591,-478.846536425343,-342.27734758508666,-0.5359022718534057,-101.86626298880918,-145.0246127692515,-300.7826882399535,-457.3832093466583,-457.79072305927036,-329.18973171302014,-175.9416935942335,-412.7435057911131,-441.1856920091207,-131.35720988393285,-313.2132984137098,-33.6560810913189,-275.41354942131636,-325.60867523515344,-429.63682371082865,-436.1727726168484,-252.22101650288653,-129.34773673579124,-95.02272366032116,-336.15370332940364,-385.09715478406923,-372.08753398033747,-482.77749181929966,-384.9206575357237,-135.90961763123087,-338.20649957859837,-136.4294202699603,-300.4224389002116,-285.47352039768936,-407.1340345227926,-262.8998379575493,-91.74057206645026,-66.49807884473834,-275.0978078248765,-0.27395238819727386,-213.24846474457536,-167.8312051783054,-150.22974652643904,-339.8586252397182,-177.43631185277886,-42.74261228386833,-106.78162238940791,-35.9069692556222,-155.42468863213043,-313.6388775628087,-58.29951582216053,-79.81929996568272,-252.08422581573132,-295.13549382576275,-453.4932474524116,-190.29671836701834,-428.7841863919564,-217.05561651938987,-44.90433679837646,-491.2202728933592,-293.17327397044414,-120.64937011198474,-309.3147498237895,-119.09045850812828,-43.844009966815925,-109.11708964724276,-139.0263961158129,-349.5651296316429,-133.96760946196596,-75.1252756900802,-289.48581541160934,-61.35118886658108,-420.67197074229654,-240.46362821252322,-488.9702635630605,-326.9418266167068,-387.8186604164183,-163.62796625019826,-280.66597881679655,-238.10903492995473,-250.89202320597605,-393.3362799894842,-294.3432949951272,-201.3381926508281,-456.9635407286641,-385.9495958129211,-405.011069062835,-388.31143503899847,-395.69085223771606,-12.894295255213017,-464.5176338386764,-15.573658003682267,-111.4004424869185,-227.1723772972688,-136.61187098209305,-40.19689462939014,-457.66675458659654,-44.30772458238552,-82.00972596552924,-8.019159640339502,-432.82123911700364,-469.3993982001086,-318.94306828502516,-24.187416754197443,-423.59838518228344,-398.13688596811545,-458.10593584466505,-269.3221875596323,-490.1560795834665,-41.718001913200744,-448.9513941391192,-266.75905943950727,-120.12213078357847,-362.54174476994694,-156.24538455130943,-303.80884863126767,-245.87823187113122,-148.93405214318932,-30.311205361487346,-98.7345118186258,-297.25070492030767,-475.101163470312,-451.91224997940435,-464.7680542193049,-66.76570845750906,-195.28162695039418,-323.54446352777586,-27.666190440650105,-195.66899791523096,-347.33538539336604,-53.67961817904154,-359.4432537700674,-244.59625936513117,-401.1092567396107,-54.83763487306237,-268.84240146687233,-114.63451773330058,-158.71864035835415,-53.82218680873307,-15.77517253173788,-309.85559136592946,-375.5643365938257,-435.05103927464484,-284.994102388864,-386.9969058515157,-368.22042121695773,-166.34573679359465,-294.68358927592266,-158.82549199981878,-76.88995340062243,-143.02215809008158,-75.87763627263267,-56.998203681629555,-257.05536905055595,-324.0924392949771,-29.68030598872651,-95.58057950682442,-171.44810203621662,-7.308568486893985,-70.57967228287998,-261.9186005980335,-270.54068493152914,-444.41630040453106,-108.79680240414635,-167.70114977764595,-6.091607581666159,-350.2844705476108,-84.66472510156153,-491.480807723763,-2.7102094966425794,-224.55371500876942,-364.5576576533699,-39.07232421603568,-212.50346066348158,-103.16088713313121,-363.76592548186557,-286.41577716378663,-99.9817389381783,-172.33801112520874,-68.6654191220093,-328.4298765733318,-378.6504887258244,-203.97800419821976,-406.5046077897574,-426.5868365562162,-442.0313812376262,-252.4710002296282,-354.07591514712686,-402.82127802675694,-4.544666968796851,-359.41779691818977,-269.80829608961324,-341.69711494838094,-248.32276253033825,-348.69156489382135,-271.953162881976,-386.2943382607075,-97.52824899401801,-458.00578660765933,-374.06552934907944,-87.58069014472059,-220.07399636572734,-442.34139044246245,-264.8050770631374,-315.3186566957633,-472.53578816371913,-449.63638484004684,-482.7548563506334,-270.87323399656805,-234.02326044361521,-259.28284180634256,-170.7705557644128,-83.35747145318706,-393.3222782941478,-468.2551194841078,-274.5123060542638,-354.5278506437252,-422.12974705398,-83.65007526175904,-461.471384499464,-418.610764706371,-465.53474651673577,-105.76690316638748,-41.691307485170356,-257.1542583548009,-457.7285738538786,-288.2944127687654,-307.56440900197026,-79.82960884102941,-445.1003599659214,-333.7499438118171,-498.6310797811515,-357.3458864451644,-418.8652388676325,-324.64241224028535,-142.20765387729605,-75.60466812100775,-471.46409281463184,-251.10760131537057,-361.48054408949923,-308.5470818529773,-218.00460722007554,-328.54578364653906,-483.29691683686724,-193.2346900844757,-180.57341102616752,-132.5442869817428,-297.3881046168589,-240.5430134845844,-421.053050390791,-121.32900954297388,-341.828037942888,-267.5751721500138,-84.73168456583724,-276.2094123055855,-14.391155032298375,-387.18431969515,-445.18939193779374,-437.659080856261,-473.6621629107387,-213.66666957746105,-417.5545963205318,-217.13289936046476,-458.8903269837066,-399.13558358512546,-91.45803940801545,-68.95017194511077,-446.6215548728296,-257.0996327409705,-436.1369331650452,-131.48122737457768,-447.08812945044906,-420.39615825370726,-292.282704422952,-181.99074890446076,-292.337442906055,-140.9886029941072,-284.095195984548,-158.81316448255654,-296.7105644086083,-368.2284066035918,-177.15429899379586,-93.41464640218278,-244.0838033273327,-297.5896413890533,-127.39658628932216,-312.59334166532346,-134.3501010859447,-333.83569848234293,-34.30095123809495,-269.39326955877885,-329.26693150300645,-139.95417156920476,-149.80827504230888,-45.256135557484534,-131.90081182188374,-167.49677322364187,-411.9887725718694,-85.96839602088235,-145.56655860269464,-400.7965562048592,-471.5267296990617,-67.1091133808448,-109.26675285827837,-0.4575687605531398,-380.46712047546237,-146.91734417753256,-350.0286776444253,-82.74198921430798,-194.00171575021906,-30.634164299921164,-423.6196420528061,-209.4889497973984,-499.64202973260205,-115.51116332018773,-89.80507602098331,-63.33034842334773,-229.048280990203,-427.3153941294584,-115.97346882836091,-188.44791943848315,-214.05314775935514,-80.75056930637913,-373.18026435917386,-144.36589938877964,-399.0212037597149,-153.16880854162173,-35.97581405291006,-271.8602436700096,-239.5479150258363,-167.3693529708008,-345.607224184579,-94.99617128088556,-74.87862518433708,-19.153124331252158,-274.1031969624925,-426.7880063205226,-198.25968389082905,-248.50926406192653,-298.72016327058384,-268.43266853019907,-183.0534241390539,-446.5044962821778,-154.55431275294674,-393.23620279394845,-199.33772320174214,-68.44473490852442,-173.80193045731573,-479.2850304951162,-489.79444195791746,-232.82170506123555,-422.45886448988233,-339.8962942144945,-154.43546578746316,-40.10120125285677,-466.0131112700595,-348.8893144070273,-300.90017352731246,-404.933176048184,-448.7896584225518,-367.9334284017256,-105.7660298198414,-21.855591529972518,-277.97174791429137,-355.74409337397464,-476.9791940724133,-150.67092419001148,-458.33157751578915,-460.36103331503733,-103.47565151803029,-229.05004090697966,-418.29860449015865,-372.81656269458443,-21.17712778146663,-345.7791127861362,-453.9871004277564,-302.770453854337,-425.2171411913982,-474.39083306676645,-54.03069805302141,-342.63611179354035,-125.24913874574328,-218.91606488770356,-267.6090962659987,-166.5260581503464,-341.07422311041313,-107.96867940793776,-364.12976052655,-2.601997104867637,-381.0569389240255,-367.27002028751497,-291.6861011380859,-280.4426812285175,-259.6426869915992,-72.46169200734809,-57.72420068599238,-417.6324164397547,-476.64441470389653,-227.4368199424659,-174.4091935765093,-247.60910081995314,-268.6257356666175,-435.46421844800307,-201.45145798060582,-341.70775831985856,-14.317826071672425,-97.17476238994527,-137.75126987258946,-81.24295252058222,-210.54048585448703,-276.2322612561904,-267.99567206649147,-373.2076566559328,-258.5180657998384,-348.8321816222247,-383.118414174755,-107.20428886859179,-453.3157958727558,-466.7199105064587,-324.92901921719397,-315.01294783403756,-94.34922283137138,-241.1696899279875,-224.4846862806492,-479.1910066842414,-203.43171365717026,-424.3300669194373,-129.67759298762772,-156.38203090258628,-272.34541981021107,-30.655848225773386,-253.73102156489645,-491.49027781991515,-454.28647855084256,-62.380176487707104,-242.66492867965405,-214.3715591551143,-114.56697441543685,-490.3397912842695,-23.15914946123876,-479.5892623028277,-366.81505656881154,-204.24059228024106,-146.99339720603322,-493.71029736336004,-259.00536958216503,-181.68902049874004,-9.50056327456017,-96.44994814598972,-93.98697841770043,-389.394486944586,-42.11142881838681,-197.5786288850664,-406.65532875031005,-423.022691297718,-179.0023401648845,-148.63136450164538,-376.7671443955061,-73.20052529732158,-37.49896339600844,-182.77654211238004,-173.41476540375422,-343.7963041426686,-253.0110473183873,-143.2156401609953,-31.868209602675446,-356.67504541454974,-22.332529079315155,-214.35382305685525,-4.111831849918701,-372.1002332292942,-486.5341460505145,-282.4413538506943,-420.2811841310202,-304.46630015465115,-466.1655604958782,-295.1112142308702,-105.40126248216231,-160.98313452395607,-451.3958061185416,-374.7585323374022,-475.0733329135012,-211.621991683831,-423.8518275082551,-3.8660255776671315,-303.1402347320276,-62.33082252883104,-282.4522646003691,-333.03302976024787,-95.60778388068813,-426.7838625377812,-73.95663271574426,-61.89861693295906,-32.859684814456,-432.6729982030072,-221.69934694435568,-246.67420092027325,-364.77400598372935,-440.3426242474466,-100.52505740785588,-351.17892764031546,-106.12994711434331,-399.5828317132838,-342.4457684864739,-8.76985711641598,-321.50627394263074,-246.59379360553012,-20.64660470010493,-70.4397962167096,-458.40246734454405,-486.72271113414536,-166.84196010886677,-2.731665774171277,-283.7090898141962,-428.15132506466136,-377.11078720014666,-217.60946598102504,-275.5554520531923,-231.9849495403362,-356.0885834197476,-143.68342223739705,-37.277947224032545,-432.53576330780686,-288.06717652676184,-204.55486841153515,-107.79952106028179,-331.5691047446061,-113.46210596627759,-64.50339352719593,-96.98264692047276,-229.59833394698813,-0.2673252806356663,-267.08757950558436,-105.68548433942038,-318.1131164030412,-285.06362669390097,-371.55587572268314,-159.7764346470517,-105.21163467411088,-167.28332750894393,-32.857404353180186,-333.4116689491755,-415.45984138960955,-315.7359805484221,-304.79632998288486,-238.09861019631927,-437.31209812321725,-72.27729636374714,-402.336376437882,-207.5125852009353,-434.46793689121023,-314.69137250354606,-13.553286859431246,-299.383933277793,-191.10419852189807,-134.42550448636192,-400.3095515336421,-60.482810001198594,-195.19152729810463,-370.020802213331,-93.38413264836932,-474.9576855640589,-483.58826683658094,-130.0218801962417,-87.99619786639379,-339.91624664216016,-250.3140788093673,-255.55383403502185,-309.8235675781571,-423.2814418344084,-135.88458210324816,-302.82543029587225,-238.80053657557843,-36.24899150203365,-182.73936532280422,-450.1045531818226,-396.7875661150485,-341.425089086857,-177.43363990800586,-465.1161836932037,-307.53121431226106,-124.87196162266213,-134.27722381215978,-425.9029118811809,-284.191246625692,-424.4070805282262,-489.8745128888117,-198.29222186879358,-173.61156424185563,-491.3631266413897,-450.1869293998251,-472.1656582109942,-71.61339914264875,-456.7389202185542,-37.89348907034085,-42.158430133216626,-77.00953225997264,-435.7064742186441,-338.1007778008639,-343.14792897950963,-3.555013451844835,-272.636733449375,-498.32687323493997,-147.3704022823642,-340.70582163057463,-58.88638248078426,-4.373281848133792,-23.97307947859961,-67.97753513529192,-240.32431505292473,-176.67305360605235,-171.46695705126714,-277.80077418413293,-171.22646682044518,-87.0699839363418,-236.84417283290938,-190.72362747882477,-166.4466662172377,-181.65256469752578,-410.66610375149793,-291.9610975165066,-476.4816045413938,-227.84672721009002,-407.9321307523358,-213.70393727843074,-90.81444858471855,-437.3466718048977,-252.91633998716313,-286.87849679571974,-44.2462990268675,-197.8186813562669,-305.97523703965544,-97.9176105757047,-161.55608429693214,-186.17006512280477,-425.9537501062822,-271.46680482055893,-359.29450104661544,-488.2452107409458,-223.7378139629962,-85.10727009223196,-425.4148957218946,-497.28739603492465,-3.514170148418483,-150.41302665260048,-203.37001186156422,-254.18291364059874,-302.53899711206776,-53.31357346652066,-376.03676828506383,-478.98480552538024,-79.17493887114735,-316.8757945083466,-215.45034161292352,-207.67079789177933,-57.16489957002735,-187.77717236582248,-434.6655682962638,-384.12378923839174,-407.3401567666184,-94.0385907191691,-269.4733060073372,-181.9745299247325,-94.59304391663548,-87.2937734829472,-154.76720763398765,-349.60183049638704,-299.8780278344203,-100.71818951052659,-39.8243092166215,-475.37096102020394,-101.71160696229198,-467.20495078958226,-69.50803109056625,-18.803862840705342,-383.9428573904852,-327.4582278348388,-302.55412492191147,-59.70797091048308,-184.4438514171317,-148.7603903128577,-249.90644317266353,-489.94383955791096,-202.75921550493837,-175.44491876751235,-278.02190013933694,-371.63640240881745,-104.95873074966977,-276.3176701485468,-368.1442449011066,-50.212482698563264,-42.04873443808776,-34.09875709666454,-316.7990729182073,-140.55654517069183,-418.3237920945878,-160.97334115918983,-460.69125098408114,-419.07204039579614,-277.3804877517876,-90.01157621529966,-248.24988344425213,-16.427867332003963,-38.06638512022853,-266.68520324661216,-81.84680237057451,-183.60505855969035,-498.97406676493074,-236.6346967083046,-186.3611901417914,-240.97825268295801,-209.2349691522648,-356.705956209581,-116.25892704618768,-348.08916963998803,-5.355132919393157,-301.92531910483655,-69.46932288867147,-199.27379234221831,-484.31104697482397,-443.4854498852896,-372.97406895538444,-106.47175691370447,-239.69317179341698,-314.10670079858613,-35.9257062549444,-446.4482045897437,-157.20146630434218,-44.77328984599782,-139.71635790384573,-337.49628243733423,-313.9507432785357,-139.4440505122222,-170.44765693339926,-184.11353828227962,-22.748798766868305,-347.75861566899357,-47.154121403453765,-229.33174263021218,-82.40846849551097,-4.657134151428655,-338.99114649691,-467.8423396372002,-162.299863005807,-223.66255523865252,-24.423177113455207,-107.10236694277498,-400.6933777740287,-445.3528649148418,-114.83364773443417,-69.38120153419125,-497.29108480767803,-295.5132784171461,-294.70108898605184,-364.75474487924686,-279.6702509395338,-216.86847908142215,-222.70181763553754,-100.46111265372836,-414.3890680316865,-340.11111738425916,-57.14205277181384,-111.13093811483465,-435.7201168119041,-488.37857375618466,-372.1990562708459,-496.82425136415895,-5.451316122637051,-421.3438990941367,-355.68831414415024,-442.7031183247668,-304.8544124401238,-69.82946351519259,-209.53262284753117,-27.175717030562097,-399.42148938501134,-309.97402431166665,-186.1736720963617,-395.8669943783589,-231.96754876860837,-377.34398491156475,-445.9631811383573,-49.88046635365695,-467.40945140967517,-122.61529917159375,-233.82228619537415,-405.25538613173427,-411.3346767066983,-406.21968695868327,-144.04113911905213,-303.4429239260407,-119.06568112131555]}

},{}],106:[function(require,module,exports){
module.exports={"expected":[2.1416503665895297,2.688098742403232,2.0800386492218568,2.239295806234759,2.0486099605552033,2.039497513170417,2.0976376496104825,1.9837578419882613,2.3995987140809287,2.6651805779538766,2.1894299170377702,2.216728938814414,2.3713810360288368,2.13004946443479,1.7835796692323205,2.4589735883333796,2.967174741437825,3.0655180026767677,2.4019749103291224,2.2424888587884984,2.2845892902010823,2.94863937586757,2.0625833124674955,2.5610411733173697,1.628458653614562,1.7896662599425148,1.9035317193336432,2.22545832397322,2.480038934667985,1.7062576868998793,2.910591079668535,2.240033200445663,2.314789426498126,2.18928795580075,2.0747630439923954,2.4570282774425922,2.955330331247929,1.6772620549777437,1.8650514908163505,1.8439170349689036,1.6521735824159536,2.1289075981555174,2.3591691632734992,2.5358163524445576,2.3135975381675875,2.16092804219749,2.9594309748873666,2.049315273091942,2.4111126914600884,2.564573570883571,2.4100963274933243,1.6263297816245215,3.0446841975071193,2.5931264592874483,2.284224916219774,2.143051980807507,2.621475296435612,1.985566010251747,2.1053935981586083,2.55449618522146,2.3627625485437287,2.46604530956836,1.9372303367556223,2.1809701943552335,2.262686888348825,2.3469386577786855,2.4877103224240513,2.1367007183149602,2.3544078031762936,2.694180541092406,2.4185025834780696,1.7635980222051832,2.8513008923267873,2.369026168603358,2.442267739607494,2.0177626143821925,1.9621752399739671,1.7565167689669419,3.042913807327198,2.516431043034189,2.920085650860845,1.9586801221383907,1.624817858708561,3.0980034486352976,1.66999703555639,2.7310047406290576,1.8500648898802794,2.66526844103083,2.8124726971973155,2.030400868225799,2.580137762112821,3.1372353816306346,1.7735242680808267,3.104237291260435,1.7098749733757448,2.3013261398372236,2.5139310586900043,2.6480205453313643,2.4081617424757122,2.6404576455568773,2.290036193406692,2.9355641227584965,2.084355188540889,2.7291071468810824,3.117873036109003,2.323978107344312,2.871097839202843,2.919937890899431,2.2087852685069844,2.904273792000868,2.181144548316219,2.6408659081162167,2.2598101600310674,2.715122446400885,2.410347653023455,1.578539151746239,2.0109446143261187,2.287778467949008,1.6706284632223327,2.7799365530196165,2.5794284403264904,1.9388737069365185,2.4581750259725075,2.4039958513417625,2.2850845120596057,2.1656297645635414,2.893171861629942,2.795536399051238,1.8012633922340138,2.0966078339022127,1.9064919789257742,2.19073518859272,2.1056665228121387,2.0355622789358727,2.7366864061082623,2.259221455487932,3.1048117161583053,2.414179738979063,2.3472782986643557,3.117980563177419,2.1392173241679187,2.28502610069978,2.1837290891756957,2.9858014024484167,2.1948610506469075,2.325723499727355,2.383547688288129,3.044206224776748,2.0837427121454306,2.0496178445555193,2.9796216155366695,2.403588974984492,1.8015845729671116,2.908085341752544,2.541752908937746,2.3000855632482606,2.9827528692137792,2.5407397805424234,2.3693816312009055,2.113575310628013,1.9523167872210223,2.4393991662472976,1.6306625211675598,1.6769994195494253,2.652876068136732,2.324688481928142,2.7314217457903482,2.1612893674978477,1.8083864566670451,2.3961427505402773,3.027253304847194,1.9041541228139653,2.0951845496024104,2.403773589647665,2.3929418141403125,2.8302231635563864,2.2911179172275506,2.988083205946784,2.584617171382054,2.4736180804152625,2.603172105901181,1.7972961153274893,2.010714123199551,2.8359721640949576,2.24375654325272,2.0588603026422847,2.3665088359566817,1.6187005617855894,2.190146348659821,2.876709743825316,2.852875141567958,2.0900202789131646,2.1332468885685874,2.5186352412569843,1.9034514545472687,2.2576385810629063,2.7277306739687153,2.9780228090915264,2.3622298527812142,2.7833628190378072,2.135458921856915,1.9994050061879596,2.3095592310983197,2.549269066641685,1.8601822066538405,2.338587847759722,2.5579899188538624,1.6896868661259066,2.3099626822599086,1.8314907397475506,1.817934104395284,2.4620246927045164,2.0187662270351665,3.078174469934682,3.019327288641148,1.8867578358970378,2.2069405948001988,3.0560679362679974,2.5909063288264815,2.0435892099105963,2.2063447796435796,2.998694424385118,2.6170224960335813,2.2965586797284967,2.946781621086197,2.028835792733185,2.712019233640012,2.163142158836531,2.258994577055798,3.0043192226715236,2.4780520893021993,2.6801898092483736,2.1791437475380167,2.9085149525141154,2.640762329455745,2.269859889861321,1.683190496022663,2.015412847654659,2.3972987153644216,2.966939022672133,1.936591130309593,2.618181849794649,1.8757068094973837,1.5764990076016165,2.965467017334949,2.3998675965396568,2.642862177854055,1.7139676215430881,2.432191645576234,2.1205869757860025,2.110912213578322,2.8993872865508767,2.340561587327115,2.3141973541635075,2.1227148411454335,2.4340934858858967,1.6222529979893185,2.6581145930353696,2.304239321860633,2.6309915945062334,2.141882926179474,2.567634626810128,2.9242984614155003,2.0602335596297054,2.816419109375979,1.6366062636094882,2.805371063692648,1.8409255070561243,2.3921857147977246,2.2138426395651845,2.3762769528150782,2.015771268467581,2.3445197264865696,2.3198651200139913,2.077675173522926,1.9844588994101366,2.7237851319958355,2.584886729062092,2.6552146055367056,2.417134933519616,2.5657618830910054,2.946346423184039,2.3084953943112105,1.686495960594748,2.261806818727442,2.1787377565448502,2.456388609635711,2.318273224699164,2.507226324002829,1.7448231797787315,2.5904869556497436,2.068752586086001,1.5862144715589515,2.3210066876782127,1.6607008078664367,1.5897084705346705,2.82286872992794,2.671558920366053,2.8777521808506332,2.338663583977343,1.8818670976366956,2.4293576533701606,1.795095457412813,1.7477695672975266,2.1617989086035347,2.9677294658537585,2.2714038977369073,2.5043474230715392,2.490090863117387,2.5929738795556103,1.7428379817869086,2.3030032955459774,2.4103032470956602,2.1716831868826936,2.3296043731695977,2.955788059720185,1.9560195903788256,3.1334174621107294,3.109772020030039,2.9188785220311693,2.259635340130763,2.1751545487128756,2.6184331923780566,3.0310155286571616,2.239450807909552,1.6671963662318237,2.13456188811392,2.1139570146055977,2.5200539937508486,1.8890317314557357,2.155018403881781,2.2543795989600346,2.672986426925939,2.5039889405375595,2.8012962999857316,2.355690587361705,2.3350909065286847,2.4500146338101794,2.140871126012388,2.6981163819609764,2.9807587138427616,1.6246751756981983,2.3346822179166367,2.5510207407195784,2.087838927340024,1.8930915807107895,2.5614569903191104,2.1906891768340158,2.377806306907199,2.6816259253818284,1.6411356798138717,2.260919734410836,2.2176747796356966,2.3407430961630915,1.7788669331054714,1.988552049238941,2.794000033095947,2.0969324335031843,2.5984696264996336,2.29633365147107,2.967212483762149,2.1981994176896062,2.1978497022104606,2.3514912766959792,3.12942648925539,2.8948491736576,2.395208619478662,2.8256053886850694,3.060473906373059,1.6053893982411676,2.2905610902916917,2.5250325554437496,1.8822797880195585,1.9107326866269447,2.970507342071015,2.776633161589392,2.110211313440777,2.1656526509484193,2.282327491876433,2.7706253307822966,2.9196848147025865,2.4228543618496183,1.9738729992092132,2.156720076965147,2.6047808301313697,2.2470266984369642,2.4049054962004845,2.4863092652849286,2.2364803494997147,2.7390683678362038,2.009997418455632,2.991495413207205,2.925857592982354,2.464188498135046,2.041962760308283,1.8518906920785485,2.299545210945486,2.9526942239978515,2.47127636213052,1.7155790037302148,2.18915780605884,2.4763155593040223,2.840213953308059,2.0124103687824806,2.9607565331581105,1.6105063145585998,1.616855201001178,2.692960393309664,2.163546967934906,2.1968365124551013,2.5526730535930304,2.5814847211848293,2.7635464941077763,2.951823924512739,2.291955849226045,2.027965338938648,1.706945111585708,2.2906900570533413,2.715298737545208,2.1250191736929813,1.9570863797867186,2.3034665356406476,2.2574607110017415,1.6946234965907279,1.8046812588431154,2.4169959528309284,2.2938276005913316,2.2761300118931467,2.120117626450289,2.2175291184749177,2.1011365598551355,1.7123716260796673,2.4151020791404565,3.0509000696589506,2.317191421252648,1.9108846379242546,3.1106845617514756,2.016376417234482,1.9007502958767228,3.0579211073626706,2.150811736604312,1.6567980369346473,2.7590005626907472,1.65938685172421,1.9160586517536193,2.224916712261308,2.252839268195251,2.3059480788934272,2.449264983554042,2.379088510755391,2.5002535557568875,2.903516916531804,3.097810951742794,2.6381715573394686,2.3749225807593124,2.1281324280575387,2.7428654525741463,2.6264607478365822,2.9580545933937894,2.291096466833348,2.2392623991472074,2.370247258691178,2.3013102826684486,2.3241282213424865,1.7122329695436578,2.3176661999450547,1.698784236714804,2.373357015042791,2.241513590064188,2.2726060148301253,2.472737736337825,2.294639626013541,2.6932299586934625,2.4416122942839347,2.1132044533716194,2.0556298359970473,2.781528712805817,2.4550435596520646,1.8364365430312954,3.0898882455054837,2.28481247231554,2.3596638239348127,1.8164313124352032,2.7980902506134924,2.5704945523056737,2.315814303310706,2.3733637201205022,2.5482793148110394,2.4544365833180946,2.2538923373587942,1.6156106600036682,2.008463270694742,2.210575861774311,2.0175504440731484,2.835949587107679,2.730012787160846,1.698980418176235,1.6482987879942508,2.35068473805103,1.8170673242911717,1.601618966072335,2.9808207481097173,2.208673692949227,1.724068962117047,2.6734262216739673,1.5745059240331378,2.077726181323302,2.6287683941915247,1.9164575170236697,1.8573908862195678,2.4536944094058852,2.3510267601953143,2.5057809959871067,2.333380846238528,2.773745042178027,2.763458015265212,1.6875103000038723,2.3248794187611894,2.6562626169617354,2.9988322647205106,2.3541671986261585,2.0345685539852765,2.8084183503804123,2.4537838075499514,2.5614216543745703,2.166650024961913,1.6356003708203615,1.6636531727199995,2.8540300534693634,1.9742128668504555,1.5711852086525848,1.7646886160936714,2.0069341172790427,1.7258765749925409,1.773917613957517,1.585600316888122,1.7983241483090022,2.7840841407547448,2.7289991952026496,2.609424536585772,1.6858395013223444,2.4369870738846675,2.246164051123339,2.179424207160829,2.981184964833442,2.4026674611025554,2.453946484206948,2.715673860014444,1.6823175403505877,2.5377065454718686,2.3612844060369493,2.255256285556499,2.6274139926373516,2.0001147054261272,2.0897214385794403,2.5870972544258164,1.802805941548169,1.6900521899992045,2.1690141927625417,2.3083786850313275,2.886368799583628,2.3639732777054703,1.8034123047851363,2.282439906828612,1.8983645737553787,2.672968360000599,1.6539513945259496,2.0126030934976806,1.9766410654047106,2.2722388465876975,1.8573849984707091,1.974475640983926,2.989451828045087,2.120778620620256,2.5457376115955723,2.5761259696668324,1.8892175533794562,2.80022483200446,1.9107055438306988,3.110915921605034,2.0820329866355607,1.6696254738890803,2.1334476965923064,1.6866440740699151,2.2934188469956722,2.4821489233922023,2.90996957151505,2.731399016292944,2.631833470471437,2.4671298955745264,1.839717039345898,2.1950029420443102,2.3643599427548576,3.123855368746191,2.429329823376989,3.053869741819681,2.0291808890284417,2.47024519958159,2.3854088986463786,2.790853641790988,1.6114732189580878,2.2356247526853923,2.2098233849276694,2.789291132542888,2.241418020402545,1.9697854298213195,2.7965437014172476,2.1059027068997667,2.2091077122644065,2.892633810352719,2.6771899384066407,2.069089211502959,2.1659816680506827,1.828749296908989,2.2549908238758407,3.0268026667914554,3.0513051149491814,2.37801771372823,2.371202692637422,1.5995404544694223,2.4118557121542383,2.9526854175582096,2.4706114564193973,2.4567296359279824,2.6747167172969926,1.6169683890596096,2.107527003862085,2.962355624669231,2.6213564251008554,2.364044156662863,2.7818220216877485,2.202561026061506,1.6200551469467979,2.1683666817530556,2.2431996251071906,1.928899715874933,1.740617828989088,2.2961522302858945,2.8801817458332417,2.5571263240090083,2.2161153876954556,2.1505643741837295,2.5540043243752937,1.886489029736074,2.532406695725781,3.1385860048098273,1.8288842613114638,1.9350647727961825,2.2384610492907524,2.2959271454206593,1.850496519086817,2.5710950586204397,1.5768141164980827,3.0076496190507496,2.6862613352735543,2.310364089784152,2.2963850834094366,2.5068093532398152,2.647603808262434,2.4990560043603263,2.30291971666384,2.4775638760001955,2.278355804204262,3.0660649429098665,2.450474471321394,1.8375170986435163,2.6769400437728863,2.101792231629612,2.8330370635529825,2.59510899491666,2.198650639534808,2.307767050860958,2.894255249617106,3.115616873511409,1.8106673467801644,2.694091978964094,2.7664229087867485,2.498228394229061,1.6848164622072361,2.9506558568206076,2.844470222279752,2.916819813398357,1.7566926755868437,2.361162476423586,2.3535795566500646,2.8136540140799022,1.9082975745959174,2.436581292363773,1.7751950565840255,2.4184042568827415,2.7999934139020155,3.105413614438299,2.5750376533867536,1.6617955033471734,2.5026093486419,1.7134135619904207,2.9608462179726454,2.735281234282431,1.7685924846518712,2.9918601026683365,2.222694016179597,2.704066015137176,2.9249825927894015,2.6682040616068994,1.6064498191757397,3.13051202784579,3.0489481677249173,1.9992070361409036,2.4393023235968414,2.2783087713003387,1.9466963871560192,2.7885353877675936,2.9024683880308126,1.884548141220296,1.9655549059417452,2.7604297645892375,2.1711937057293604,2.0488086210761285,1.843217445361763,2.4717232217561453,2.3122625605395712,1.7532950034984578,2.5256951205821294,2.7647276794823914,2.134014025188862,2.0032078746310225,1.7773863433503347,2.410990391273178,3.0004939616491,2.603546415267105,2.8000247182645253,2.9115865667549112,2.507541570775605,3.0203221855496007,1.8422912331736319,2.373364924847538,2.3417391743486258,2.1684601809302917,2.2491167247785864,1.8075165010583112,2.3981521938863946,2.791586543375111,2.2552064479364367,2.4260097540294288,2.5227160306628376,2.076969163243042,2.989095461978702,2.9671313433789672,2.242218725402853,3.119901176301046,2.584190354724252,2.354890509939975,1.6177908696244636,1.8557283167057956,2.925345635712128,2.5851241425551827,3.1164841043066818,1.8213117880344083,2.575557294479508,1.6793800518638264,2.8001732689819434,2.931637807448227,2.1440535428488223,2.7814946343592286,2.7701055274629534,2.071832712712532,2.2408717869836985,2.6237768935664763,2.028213211359951,1.9685714951984996,2.330348545728727,2.593211391526591,1.6417110647697826,1.9605722400090948,1.6620817649398387,2.9017310553646394,2.24686179437388,2.371488729670277,2.126125490118203,3.0800959667509877,2.2532313256904146,3.119395684659596,3.0685549877472855,2.2272811435165027,1.9759922403016617,1.6884044428185747,2.548624462424825,2.896220734584137,2.2279595785412836,2.0041304713705665,1.6595841285926956,2.5931419507120417,1.9548264515079836,2.2237582115452525,2.1193925378197145,2.666955095166927,2.2825131614955536,2.757549007781457,1.928554880178097,2.6376167391262015,2.317410539212087,2.9902312323173588,1.7714615899109227,2.931950660488645,2.983187045325462,2.8056088500430416,2.958627615053924,2.9059010491420993,1.823901845384749,2.7758448307241004,2.2982812440633555,2.661705792163424,2.9395892283051124,1.8297792551222753,1.6473983952800333,2.280674896435194,2.548621784928705,2.181612008465895,2.6314470801031873,2.7445470365805025,2.320957431911466,3.0081534761501243,1.9826833247177937,1.9131083130991273,2.9003904718949247,2.99949553017318,1.8061957820472208,3.0932198091597374,2.589201579943741,2.9484372516460233,2.4789252079224977,2.703962368483181,1.7176138557256615,2.4987064274859105,2.125847682382645,2.328475713345518,2.725946535267626,2.45704203296936,2.63638222712471,2.544316692126855,1.791465682708297,2.510286589686398,2.798543251911384,3.002776705238696,2.3817127442545916,2.6016324159621758,2.32011712560331,1.921979265736666,2.3685797043279573,2.976095509077538,1.7706764037400227,2.8929490343584603,3.0361027684422783,2.6073026174208573,2.3227495894652423,2.361547703966402,2.337379684772322,1.6438586163269535,3.0318858712887735,2.6712475830694977,1.752357252407863,3.071352823107416,2.2480518222154853,1.5775377595703488,2.17436079997129,1.582681073134165,2.2045137702698794,2.3971621546560096,2.543531753598442,2.103627875349342,2.3147196237544048,1.8979548317825599,2.5030501710616253,2.016563630236692,2.3856800398199165,2.3080111586226177,2.586591549755881,3.1151309875615283,1.892538525569799,2.948809166803421,2.0268965712308336,2.1985088997307685,3.1129218503067233,2.2385453687149877,2.474242975597301,2.3066096269137333,2.728765002042548,1.7162249347426874,2.240178904439985,2.611942998845831,2.249270587864605,2.105413966226324,2.9341667282126034,2.443409326597724,1.9859522947366548,3.102380729963095,2.177022711308073,1.7288378480796378,2.0987790166134985,2.6877076920660046,1.9909969591132268,2.844007908243266,2.013271743521152,1.7852357689119218,2.3726957628491645,1.9323917691846682,2.0689745634169534,2.550855360377385,2.9386444525676363,2.189719963437297,2.6960576800717253,2.873983927992893,2.123233974691999,1.9970406409113468,2.2699138939310033,1.7497394945537572,1.8135600168570907,2.8423607896555296,2.963482669888115,2.00896923116186,3.1334082001681294,3.028384464670271,2.2411371389528782,1.6185373470905515,2.9330135585904715,1.9006745078112885,2.260911740866902,1.6583755189195644,2.8088432076327616,2.750582470073409,1.6680641651026658,1.8755830483758997,2.826951583931904,2.765081232957937,2.005025677857514,2.765611682099556,1.9929625249078502,1.6872265708835739,2.2911737951433677,2.9704861053176486,2.027991565891825,2.7319638330947797,2.054279372147045,1.954266203596606,2.1194105387636637,2.0331963346808934,2.061410076187819,2.279019656962143,2.7264840236562016,2.0628797945296693,2.4289945080052746,2.7488016423643846,2.728389011567948,2.7058988383220313,2.8176924932160308,2.69502274310486,2.5680059997843805,2.0656909616197248,2.9716016612366354,2.398722347935903,1.6759648391439534,2.2108707130395926,3.023173002901555,2.0689074107047842,2.4700361669039697,2.3682949349652307,2.8093629928750192,2.65905580095156,2.448268625235248,2.182195210111722,1.588803902280973,2.0677685522435043,2.2352829209152065,2.122084616596461,2.283667762077248,1.8526202067112356,2.2329427526492776,2.4263203160627693,1.9099671742222395,3.079165978193192,1.5879582861637838,2.456028262257967,1.644189202482531,1.9840048308765994,2.4858961009977807,2.401422980073047,1.5989061215804754,3.004669114431774,2.9244177532795983,2.39099179752285,2.339011530688884,2.5621469003007653,2.0002808960536944,2.373292687671055,2.8170265638223047,1.7843597093806354,1.828135019137685,2.3322727928515734,2.3535254869003985,2.7922520293609456,3.07753143775157],"re":[-156.40545042253785,-372.50425136712585,-163.58067700674317,-297.85079812291184,-181.21388565933992,-130.09149463559788,-104.9187448704394,-125.0305560103966,-430.11608594984085,-288.96134152562456,-201.4882402097178,-165.86997009167382,-349.4882774485731,-196.89852690715125,-81.53762994380986,-150.03469723686058,-447.79435413839377,-351.6006215372969,-205.56281895987095,-74.41223939611807,-245.75748124490403,-243.13162977305413,-63.1042658765858,-446.05043257489416,-14.656180958812048,-92.1796018986285,-60.727287049266444,-289.4102925314223,-330.05234717994483,-38.97747179113165,-426.2167830289266,-251.90820402904944,-137.89457805820382,-129.62140783508192,-170.27018974080877,-487.3708949222363,-344.6535596086403,-37.149279178249614,-56.23404943905253,-99.71066415327556,-24.8818358363716,-234.70278733295692,-371.02426924365784,-43.55829172638692,-416.52202033150274,-316.4865436565978,-310.7839617998386,-236.01078913034857,-453.4368446495298,-432.39505804455627,-312.3381289148506,-18.003762584059114,-347.5249149035203,-488.0989544834847,-138.31957246383286,-272.4944118861905,-409.56806169758477,-159.76295984302257,-100.92106751942221,-409.3212683086087,-482.1226123036958,-499.868681586367,-41.612391516023365,-302.4673157091492,-144.82605046672293,-271.89960264914595,-327.5209909867154,-299.18587332858283,-385.68241460973707,-257.17431837922965,-389.49080946947447,-92.16755024444545,-391.19810450415713,-377.61759027284546,-220.29787507810906,-162.8342005548865,-71.7438912054793,-44.411831998923624,-483.3598524055628,-354.83245661755313,-430.63537205149527,-116.3613460873072,-17.378358648291737,-170.2661518486689,-40.979448351863624,-332.47213335303314,-41.889926790220855,-335.63243633027895,-348.3902032630374,-180.315040530169,-256.88250736105454,-498.06618467957617,-81.31083452268695,-224.09621983336913,-45.05793552635362,-444.25146942535287,-221.8673529620334,-480.580211840557,-196.73264840088757,-364.74927168436545,-275.6750993340896,-480.26352935955987,-162.0785380746306,-281.4350983424876,-397.077328452077,-414.9621236772566,-494.8433643736929,-380.00833626331445,-343.61380174762945,-367.7427020925433,-270.83313299213074,-308.3088416764578,-350.219550710572,-158.14372977089997,-464.5672061010062,-1.8391583943383472,-172.66280068301566,-368.95839799694954,-36.76873125489277,-346.91800425896866,-293.29631938730137,-141.9281819159519,-388.2967561012491,-103.78489564906235,-360.4688218690322,-323.98382951967943,-372.107499541844,-488.65684259583344,-79.91587413518953,-233.3241812691841,-148.01583539470153,-147.26068177020002,-209.5096431397697,-236.2813003197346,-440.6060870870364,-201.67965107707374,-367.2754407654344,-189.33165375321093,-316.48103211797974,-244.00117081723116,-212.44092823970163,-367.92881174210015,-276.0305910801405,-274.3408424615481,-33.73108872926866,-356.6254745340404,-31.603729208036,-373.8071375695148,-278.7524810355866,-226.7963317409818,-173.16840088475783,-171.38272874745297,-55.604272894500426,-444.6535877883926,-395.31231880464213,-241.34269825052556,-91.18529722574986,-267.31452621263685,-164.85528678193373,-243.90733425438427,-52.044125270744644,-238.5300867761494,-18.72264899442577,-37.665183912125364,-314.3966555420409,-116.78688952279504,-374.66530982286986,-191.23880559548934,-61.81936090441198,-57.33016319345641,-475.4257126145603,-46.32106633755284,-173.1958591720012,-210.5657137833824,-268.1525678758818,-421.40281001169757,-397.73629645503826,-483.16444879012545,-293.0109950844587,-272.76524206719677,-417.4950470858585,-105.20320823622664,-136.07199010054393,-445.04375259928077,-301.8827248297529,-257.49140800072735,-450.0377421450887,-17.557934305997392,-340.7642325339784,-431.81856577542044,-234.25077921004745,-276.15881600755563,-245.18237927249598,-216.6302210522356,-129.75943193315842,-293.2938950320937,-376.37081219621206,-232.87724928275566,-76.82699793043257,-404.3609126724174,-191.9890403765083,-223.32734803340804,-241.49015298312926,-464.9868027582124,-20.838459902064233,-340.98541671827775,-385.76029911051137,-32.686001838776676,-252.1883538493177,-90.97762749498916,-56.929833208703926,-344.8982130301291,-218.38239571328276,-151.40736004400114,-411.56288838961916,-135.82083138413458,-328.7914969115182,-419.20516147303044,-109.23445992470792,-220.9817741071598,-338.5175844297366,-484.1227216492241,-308.08032500651774,-403.2249842049621,-344.0865132595421,-197.86158128380904,-477.5508630737696,-159.0317398366371,-343.04927128636774,-393.28672644283245,-351.90462479259423,-403.1017279966171,-292.1406012106581,-462.5946105438313,-251.51169749059565,-408.1019274069471,-49.55506143398936,-112.00101485151737,-472.5614571109581,-348.47769339545755,-126.23383888547724,-330.49151676807173,-151.4078305393285,-1.6134959523202985,-366.5453798901255,-423.64535121559175,-323.4396951695786,-60.68304431849592,-335.0505054738092,-165.7193852878861,-221.91215704955903,-332.59443212943785,-225.75862259405187,-454.5696208539972,-233.9841384551079,-349.74059947090973,-23.411774421045696,-101.45002250927749,-411.2132948406657,-430.0907885800612,-298.275512915814,-421.5831119259361,-462.4473915653636,-176.97722755305,-473.3355972663814,-27.91714381868571,-276.32966443613185,-123.91744564580276,-425.5945619813826,-194.8618400738471,-304.03658411799495,-156.90649620522314,-121.6677799649324,-432.3936687170311,-88.08975084946724,-134.73583295772096,-206.9645312023304,-256.0162724346573,-223.54852331017938,-413.2195692847341,-384.2771440184717,-279.2164888772832,-423.5687334469095,-22.27444741910134,-241.2518271248939,-223.08874633674824,-110.57393732265142,-92.16858388526272,-326.9115034381306,-46.72577332950212,-104.63305821065173,-243.52540029301716,-4.9277391955713234,-292.9677015710519,-25.178010998383016,-4.395302276419932,-492.01653806240864,-451.52634978964414,-249.05853307218305,-348.03183833276154,-116.06924964758869,-356.5213716155409,-68.83937327587908,-18.470064683889454,-277.5936990843536,-379.7328704168388,-212.37564772196205,-116.59720565136789,-170.3374073600844,-319.91524990414064,-47.83267241667966,-96.24706694575968,-476.91716773693213,-290.4787310732433,-329.641093823843,-460.84316695735583,-125.70284427921175,-252.03640339605138,-232.3675443144554,-436.7066583852758,-212.23040257033233,-274.416213633788,-466.68204137050617,-411.414599833787,-206.69674384265258,-45.53622604009799,-247.3387092673518,-94.26015378273489,-89.65724817368059,-93.03885912902676,-299.37130634818675,-274.0561102272147,-356.52031010861873,-396.1390754396361,-158.20443994138756,-454.07523588379973,-203.67450050937862,-131.2495525896713,-309.4819563263942,-479.13481340739685,-351.88959119445497,-22.691702373884738,-408.15057603093277,-185.99685384714414,-256.80191638149176,-133.1115713415113,-226.2556711842919,-235.10204513073262,-187.19134198649357,-266.0098197560622,-18.965734644484144,-383.0260817272175,-376.2237084591229,-286.761650293615,-34.66726466647785,-163.58568932564765,-182.32141211063268,-136.74086251944894,-218.81896473006134,-211.55064344984208,-130.6717896752305,-252.2837717370835,-169.42664405314977,-271.03666305965646,-486.97668329768504,-212.76746206507903,-485.5066499352824,-223.72848390235046,-141.98227884702197,-11.744039122494776,-100.18092299850412,-136.00414183902842,-54.671015174596164,-148.3348761276836,-228.4542418173653,-230.39572158267563,-265.13389226760364,-317.1806430953524,-347.61636917356765,-368.9015134704391,-477.5692712891356,-432.4740486525711,-196.1501079799779,-249.60901599427365,-363.56839569247643,-325.3013677607546,-319.0909715275151,-446.51708188630647,-308.8347779301002,-231.49628750699458,-181.67985982715862,-230.61195101494513,-383.7764234067611,-186.0451749802179,-195.67870740186711,-131.6441224464292,-429.9858557035308,-410.8320142954307,-225.1956490863044,-65.90515999590929,-139.60597829741383,-320.34920091535014,-246.18456413712164,-193.88360085875956,-351.79450300986247,-6.391663327447561,-6.7636868243092785,-471.8301244699421,-254.99755439227667,-188.71840054759815,-233.91029849153466,-347.09653231859414,-435.2759836076152,-219.66497355034954,-296.743520327174,-52.17938512390641,-60.06976676492148,-71.71847279453813,-387.70367990395704,-268.1167306831802,-167.54556089233085,-439.7159251344918,-239.4523280178543,-53.07654020947494,-95.3359330550655,-218.4464665235918,-349.87711509454,-296.14835729214616,-299.98750523203876,-369.8809548082632,-231.8979903741104,-20.00979833648564,-350.6610941227573,-498.5317943827057,-403.9241723181226,-144.76678504461492,-461.85113908180233,-101.14780733147855,-118.09395489302233,-429.36279534953826,-279.6428265884564,-27.81199178196303,-499.7455361625037,-27.566888412396963,-131.88297331936937,-310.8065927900362,-397.1306337643976,-98.42703121592533,-499.557592843735,-299.1485748157181,-492.24652821568515,-409.9715945491401,-241.62579108114159,-342.8569895014085,-405.6546126567839,-233.22811155925228,-424.9148535341033,-482.0764456486565,-403.9989985950249,-381.38482507301154,-255.0500497051592,-488.8513840461405,-194.71809225195847,-327.9096145268983,-63.79905574812783,-377.5891959841744,-51.28431665198529,-454.43238344297856,-195.2975842950715,-369.4999361890703,-350.2301011940505,-372.0966266520421,-156.79526932571852,-258.39167648932613,-104.91563833737094,-33.37422737064399,-446.236870576611,-472.35521895320875,-123.92957122576564,-214.20584679662946,-213.18792440472035,-331.8454145841887,-114.54475518197837,-344.1743050906445,-289.7389140444069,-384.52172911048365,-424.4545375444707,-381.23433494641756,-424.22064265668257,-358.6713257489701,-14.574203615686843,-213.57324404781198,-88.37706697640758,-207.2492683517978,-365.4833562643615,-340.5250622477588,-57.46263173896282,-15.38257457849934,-343.32725005300404,-111.53439234430529,-6.305469610454306,-488.90653709356656,-229.26298262262202,-18.985776758286498,-361.0036836488,-1.1443101097798891,-143.97570385060686,-305.14783963642145,-98.71628320171644,-87.83432062590902,-135.7860224216495,-383.25190710871647,-414.5764847804283,-58.465276593252845,-439.6910373550633,-289.7251844851708,-39.36886455502309,-456.7004088805059,-447.30875195422146,-166.77041323662235,-411.44254878679396,-188.9439007384902,-265.29519650402335,-199.10329927217197,-89.21809590701845,-326.92349562115044,-31.473050243289393,-32.796733188610986,-172.78169152747935,-116.42622656589529,-0.08878620322305686,-69.44164036113776,-75.80692320797988,-47.53590441127442,-53.423918711764664,-5.173386332833041,-91.76357108100808,-253.851508850537,-494.1066330269824,-135.5510742636614,-9.100408319164366,-397.8629853838741,-149.73755617941498,-173.4892553332883,-320.96120861080834,-439.94475936400136,-275.92037556253047,-446.90926779181905,-46.0868540539292,-387.8735818671548,-408.4774631838819,-246.8869529058173,-342.4586132269881,-200.16874012955932,-137.75763535580077,-386.1155073854445,-52.780298332192,-37.79111848525374,-275.598486515207,-368.64040112024264,-264.96617817011827,-362.4256810233217,-101.45793138971216,-189.15290600316493,-113.09354067076282,-338.9242166770022,-32.693957798854086,-234.05115027707225,-83.33355155308352,-392.647242605226,-35.571443991946225,-113.779707472061,-270.1502746935087,-46.3315240542429,-376.9317239547659,-424.7998780023241,-70.40599606429521,-292.6594972118184,-123.54047068359897,-348.5665528518246,-271.26708168182677,-45.41708840492598,-295.92630469238844,-57.71599022635476,-437.46416881475426,-250.84066521236804,-436.74215207610814,-416.7110117271814,-200.4230343349188,-420.11404265741305,-118.09560024490229,-265.16294588288946,-275.91050181587906,-243.68010837236642,-243.4200547762395,-432.70602108620295,-184.8263937745467,-251.51400065233364,-496.800989201603,-355.1696386549116,-11.225319205102945,-390.19879298315266,-341.72821477138206,-208.74320682410652,-164.93179292447047,-208.23199663293258,-399.46225959643533,-200.70303214377304,-308.826821000767,-490.814748019075,-343.84600606063856,-227.02818039085292,-315.7115777179841,-85.27338573235255,-403.93931910556336,-413.44488000500843,-476.34919663746365,-297.52721416636155,-487.4340863724952,-13.713995205529073,-275.81679587028884,-419.3165919944998,-420.7637208895143,-398.3510020183626,-303.8743081829728,-21.043852092664572,-229.33963307422545,-406.4263251953136,-96.1600332172775,-494.38089569795187,-215.38737228332195,-337.87686601696356,-10.751264863083755,-89.39433180669276,-293.8890612070626,-149.54202292618092,-70.83261800259099,-284.7364945389788,-405.8149122876159,-462.36635021569197,-160.6190127019217,-259.17122126158375,-497.919830452934,-50.27974885276754,-459.00920703365523,-405.271488404543,-108.63771171400549,-157.27462284075477,-343.97742646864583,-413.09927972925817,-80.44482654268315,-464.62730498474116,-2.3545690034321165,-131.4729020565578,-240.78834230627078,-400.5553164892185,-425.70304493994905,-430.0779277192898,-402.45948454274884,-417.3967683541627,-435.51424023172234,-445.8539243709745,-397.29465373742966,-400.3345696581746,-404.9823256780838,-45.155178304357776,-428.5047096673671,-246.71054555920412,-208.34496867300578,-233.91369729452015,-275.83520814125404,-208.97843538620907,-363.4695535554232,-338.62158712674216,-59.489379095541196,-332.7622080424728,-441.0188657868618,-409.4011340415619,-40.75707016162333,-277.49814332413536,-484.18248155625565,-318.2208330289923,-72.68722294121521,-277.11450080233556,-401.0544468763557,-206.1550574414427,-145.38382374071634,-492.4537203497872,-24.16092098176781,-494.7282101839355,-350.02892985836667,-197.43517923918276,-233.51826418777466,-33.08651704220611,-464.8038651867352,-46.07641618039293,-434.59948427835025,-139.36624919450014,-94.55545532902742,-230.1125993696429,-134.92440259850292,-312.9124682459996,-310.82883321861266,-341.72771670056426,-13.512010886861825,-470.9862432440708,-361.5533781172451,-44.024425007967324,-212.74995418593778,-30.322501572720206,-91.71448824739537,-352.25527594462113,-402.7305010760039,-101.09788032311273,-202.07586613133677,-102.16882453951803,-239.95222742954647,-235.18392094365848,-49.509413828908386,-218.10651603881314,-309.23921478063886,-70.71149682364619,-472.06124622177623,-428.48112328714996,-310.9676650935528,-124.04503339224438,-89.70657190908571,-454.7594094572777,-436.5574515049738,-424.5832502639857,-272.0581747066505,-330.4161612281954,-373.7823506768743,-332.1181300540893,-117.44399687976914,-288.46493755844483,-327.383562481394,-329.5902131021208,-254.48418254981652,-33.3414860679041,-366.32401179815133,-451.23695033131486,-266.929279180789,-42.89272708508185,-227.169494024439,-162.1790324180077,-498.21626229876017,-99.63562172613094,-216.325692114529,-45.82670038649839,-409.1496818786585,-467.36019422498134,-12.023497836737395,-133.7271998215923,-62.882240316441184,-312.42742835404835,-446.4203245822165,-50.81793150507963,-499.70928579531227,-37.90730155998801,-313.41597621253925,-409.00404748807193,-175.06327548666766,-438.33366147355093,-240.35512257453294,-175.00940646079576,-241.46602950754337,-459.5920537645518,-242.08153005186495,-134.37815930470143,-338.1146753809857,-470.0375121377458,-21.235347356241107,-178.8073823344647,-41.490326668808585,-429.9514535701713,-331.6118201630356,-315.72940962198595,-170.23748380049742,-237.23664294561286,-275.88218522567007,-227.56456067389396,-404.7948004415306,-274.8507253416701,-188.01896631690084,-56.47131179716891,-471.85603306209214,-311.13768849811976,-148.68075845056595,-147.65711957882732,-43.67372999885433,-427.3614862716859,-185.76460991708487,-375.3350865622697,-169.40562310573037,-285.8887004445008,-356.65626517651816,-482.02910461947556,-68.71321483519056,-208.9309914688825,-430.7046336566537,-468.08428297467,-49.1199015137902,-479.23351916239653,-452.75470520808415,-347.7051916358594,-363.1685136824655,-357.4274939120045,-128.17934544138055,-377.72158792641375,-235.82446769662414,-96.17555801685907,-325.8954772481486,-62.4177949324094,-26.222253585133302,-217.05479942063644,-402.2279312184296,-334.50792098236826,-215.49657282431323,-377.34204285192317,-462.2858925132276,-277.99557435849806,-205.59898815289236,-113.40030233174592,-491.5495342912277,-489.3514520110733,-96.71681701972679,-451.79363912146033,-424.1330839680928,-57.00180188166093,-243.84972519827963,-329.95820594752325,-69.6382828086145,-453.12256100498007,-102.08217875887382,-427.52791901097686,-470.45457248927823,-397.7443172767972,-480.49099269954354,-291.1022403425803,-82.54168927538763,-445.89231438824686,-405.324399689773,-477.0094216833378,-283.3973433263632,-154.605145464648,-58.365777781020924,-94.59637266093301,-239.29240989691914,-317.0108327581388,-51.23366360802628,-364.4187458334222,-344.66762112300586,-490.1890913731898,-201.21589269484664,-379.271076939245,-302.5318279790089,-20.72113397432762,-443.1764464959238,-199.99837885427385,-77.23811148528704,-242.81295615921672,-313.7505930447841,-3.3673456328112694,-28.109899981080154,-5.696807823593608,-196.4103638230884,-129.4238318796196,-453.84910868431604,-196.29120277948232,-369.5721209082804,-161.5568232145136,-336.083539673418,-174.18336900418353,-360.5811696325334,-431.3463744307745,-442.8998600875296,-279.0352038732116,-164.50428066885237,-310.53711109876303,-210.54058384589592,-241.5038089607472,-316.33850804701393,-246.19414388837114,-140.61891468910724,-401.81833793095115,-458.8871598073797,-20.1047436566264,-251.70227476876283,-94.93959167982979,-382.2163539521114,-275.8089270933755,-122.88708079048594,-426.88424425477854,-166.01471681743308,-255.52764182995557,-229.06678854310857,-46.044035444450905,-128.44868229447616,-306.0020288333293,-140.86380659461906,-389.9130527770899,-140.67449775052154,-71.25001553145394,-197.69993441196576,-142.65339127484756,-163.05532964844517,-438.9013232577147,-270.5728423774674,-266.0462745672363,-172.96296400282807,-472.5520281408049,-182.32977661602555,-63.7251746413654,-302.30502699761206,-12.05411845071669,-61.76205018640746,-435.4753510920557,-213.5153445772324,-40.49242108769702,-424.1955717185112,-385.0903085913512,-372.7651764758034,-20.060041391020466,-146.19641227764723,-75.63472824150085,-371.15987040785245,-6.486514758812789,-381.7874229652265,-440.9887914894438,-20.270727801788844,-86.9266954879685,-209.03833141595572,-487.6671769293384,-158.9531833329122,-376.78289421858767,-194.11992436536474,-29.065323653108766,-406.4082491659499,-271.4321572483278,-145.56290238873893,-471.3487100481107,-233.85523831494737,-169.47157064932816,-247.81282482806876,-239.8192104955159,-127.57795750859114,-424.4314780778897,-366.6052742798308,-196.65315475239498,-240.906818251005,-407.220033972906,-206.79780443148366,-310.2503682088581,-387.8923789107355,-348.7566498953767,-163.02056672647302,-172.70236919499615,-286.8961667111878,-480.5115100718981,-20.626711826875365,-252.7491046059126,-491.59217585254277,-219.8852317783815,-414.3685164793696,-394.78368777978346,-435.3707738642094,-60.75320977334619,-346.4153564230893,-168.3626776888082,-4.54491015438141,-217.53049328180808,-125.14566270903471,-238.645600305321,-409.85165679598947,-142.27916406264796,-358.6075581376563,-266.0895282977056,-172.6655038638212,-278.21168287105803,-1.1184309559710837,-375.8843631412967,-28.15517126731826,-207.4284290062437,-403.2237578967911,-407.50872113913107,-11.693606320509309,-489.9548079340712,-301.76374974406053,-283.85038253428684,-469.54960272787184,-203.58989255880223,-145.48422113111326,-406.8234532219699,-201.14651958568885,-107.85427087241695,-97.93733197807886,-421.1999383909184,-309.45914345268056,-273.4723504228438,-214.5844249737904],"im":[243.55613856201742,181.5479767699718,292.9640183545975,377.11476941940356,349.9451914379326,256.92871584337064,180.37137613671305,285.35579370031417,394.3100224061458,149.12108575356297,283.0494508859492,220.04326334778202,339.031240314138,314.57981945929725,377.39473472378694,121.9785596325339,78.90512406168514,26.799614106845617,187.55321807505388,93.59879950681838,283.7369703480468,47.504053996723414,117.80090948014887,292.58987440078323,253.89078978458102,414.41486709726814,175.72363490105712,377.0391576881261,256.97793393691745,285.97653422875646,100.24622736610789,318.4628629877251,149.81398153153702,182.14608904449358,308.76014690106433,397.810921738281,64.94881933977604,347.61243709638853,185.55859118299588,355.95595788035615,305.0838559250525,375.9325596462334,368.8234576349292,30.170668464464036,453.6094011496694,472.54681938144824,57.24754618979411,454.97825557441274,406.1806786012179,281.4529815731148,280.35965331445,323.8633572765327,33.783926981253096,298.22691592944915,159.81318219864315,423.0258032306236,234.56686629991353,362.83892776548697,170.44332349230274,272.3454238120948,475.83062903895876,400.5564479678522,108.43157652010137,432.6043558720204,174.80102668611653,276.98008614714274,250.99523181812887,471.00650350332376,387.06307040365607,123.40954390069881,343.74506531104896,472.105171510656,116.86282761850109,368.0489123365061,185.30025546973116,339.7199494640207,173.85389125763584,236.37696853076727,47.852815988684625,256.09330163063817,96.9800837914725,284.79222956678416,321.3801886998872,7.426470263310114,411.7403729945113,144.73521202931337,146.07877913904588,173.16878020474647,118.98984164223214,364.30494600216576,161.57348329963583,2.17022355481733,395.57373787293903,8.375091449640326,321.88293970112835,495.88715212259973,160.97348353450093,258.5450936350218,177.27878632563687,199.8013172223002,314.7968093060083,100.37221637953786,287.352700170028,123.15302594869915,9.420289089257295,442.5992100494891,137.215573548477,85.63775769265136,463.4520126015345,88.94844911827494,387.2157352626933,168.72093602394443,425.1890913385474,71.85350268094292,416.79210166175005,237.5259226978874,366.6175046226086,423.2423446330016,367.0811826798446,131.23726598410724,184.76745041634135,368.02047280697656,316.20153832070275,94.30854091752738,415.75963708998285,478.85607402794716,94.38894694694966,176.19287857936462,340.5949823021168,402.07208272012474,424.23416582410044,206.30041186811565,353.6159543594272,471.2443307891593,188.83872222870858,245.14602790813444,13.514830012284262,168.5561507356377,322.1755675846305,5.762448660098229,332.59213998207196,424.4139681673134,392.4829397015279,43.08907217606905,46.84461755302682,379.04914940225063,29.920426942091737,36.5192662474978,494.91471238948213,436.89129743106923,28.2961456937173,155.86153241818013,236.63912546044295,105.75908248582455,270.3547164040586,270.0675275231523,14.606904514701146,183.21459461187283,160.56369204793285,404.3466422991865,129.7286468268548,201.80718328539936,312.3678857772585,353.31803047550545,167.1775051664991,124.38785826572673,162.9173699601909,285.3160942747041,255.27888989154857,52.92338143165409,54.5980027386147,133.7672978160258,299.43785849375536,191.42491598993726,249.13507049100946,135.62351415568853,453.18996485958485,74.75846376003459,182.4708814690511,215.20161060295717,249.36339457838807,456.5036253378533,289.09653852588434,140.41368418762266,378.7340045932309,485.0056998637561,440.84850745985005,366.24113740551445,477.97832508593905,117.13374162148638,69.57637616124113,483.19061397272634,388.95081982496947,155.62350516953848,375.5762840306097,357.65753370121513,165.31352934540678,38.43508653661964,75.90519258918916,151.38594630542147,303.0780954202951,488.74744981519746,265.13383697177716,312.901782481472,69.98781774688013,353.2091147286849,254.72903935352676,273.6285964316334,276.6551806845474,341.0400452998081,225.64761545885216,278.65949749854843,454.43910291820976,9.614873133938495,50.5721361555741,415.46428111029064,445.1744214551736,35.940073311095276,67.07541179654153,432.04008269138825,458.91517849322736,69.65504275326428,178.2695008319366,454.4328227150162,67.89290537653036,401.33433821760525,218.76835237355897,236.3173144068339,417.1767716296704,54.32950942482939,275.11683708486134,200.42104454855536,419.4638937259755,109.81632639517957,137.67275234008403,485.43754031714406,439.04606940720146,235.0826249650203,435.22650733064984,61.48939149136445,329.56370592808105,190.72654437646196,481.0800149435219,282.9333284407798,65.23396168753048,388.16836598139446,176.16311903700822,420.949250350551,287.6367311444906,270.4222140625233,370.1082537101602,82.16925276725185,232.92983895392726,494.44913954483025,379.99983188994435,299.0945101556415,454.57871804338345,53.26528129431296,456.3271019936184,240.9145384346686,464.24013635061834,272.5816980280028,102.09914395949527,332.24834672566607,159.58084359169922,423.5960549821021,96.57482209518919,447.5214578864556,396.01118993682474,260.0621094561624,292.0638106170313,329.0324511047328,124.54235572391504,465.0101342595213,158.64362623839634,306.9205000333637,91.88095085288816,159.33687624683034,118.20009448383418,365.6934186946718,249.48263380807546,55.21943164388854,466.0341998050217,191.65978564036456,291.706439936948,320.5947081100233,90.37262844461813,99.43803419802389,240.54921131869057,265.78148912008015,64.31036267774326,447.9437374198896,319.581168296615,314.34658098191414,279.29795833673245,232.37864004246222,162.3525615132102,229.37914928163016,67.2801791879255,360.4535009236306,361.0145004894423,307.8285192995726,301.74456701678554,103.27457556418673,413.6961463123342,66.69495295502948,251.83056593156817,86.31349646844211,129.89535514586325,195.53424628696504,275.28110069584653,107.07206548816717,427.91024508324836,423.7846093393306,347.65471423524673,86.6259520056053,310.0084662911783,2.060491761129546,7.3965791227842415,98.90139917905117,257.7531862662007,397.3855737272488,269.1657113310406,45.679374024394704,261.6194423110708,470.9031581494149,391.2301759613398,156.12857294700245,64.21560763157285,282.4219023482899,452.75624373087055,336.4281720370064,180.4754755583895,293.4700438110517,56.01550130644151,454.53308622800694,212.45768483324446,108.67364542917979,482.7553676233528,227.60544124736194,57.08889031725306,420.75398987742585,426.09996986654573,124.68936456807678,451.6059721284655,398.6108387473255,148.2794511157972,329.3911708567765,179.27020883581633,131.783214772207,269.1870917918592,463.9683273189249,498.117873768849,295.7631874641016,164.20160297794718,368.53302715166046,66.05554573575279,235.46036354173182,132.0972408011597,238.52476133277423,23.02038126771311,347.908135494829,233.8172757160577,273.5982160611263,5.924930686207364,53.59100610037948,449.0280811964118,73.14621251561881,11.542753773561953,339.35564656992887,114.2767558183877,96.39002572313538,169.8047654845678,419.42165688501433,39.47102677880299,88.02859192820745,442.89764592494265,468.7776807583139,403.1762545062918,143.49399168044462,107.75086030013503,378.3447712442698,459.9877931207861,376.10522841075647,216.3610559635626,405.38745036443925,289.42602988684195,343.1817820387104,393.29329451557993,98.56461794329208,386.71340385382626,34.87652485889014,84.10285734504441,149.65046075072863,384.1098945855328,455.92687340381053,481.68676985812556,78.54194625938493,178.52815674559474,452.01549466158787,196.23062620789221,251.34452816285747,76.52586164619957,410.11537485283225,64.3198088328314,160.87396895891737,146.74486493546613,227.12453071357342,378.58923040665684,260.9970158502866,156.25021458904166,217.6642014576654,172.86939875330486,42.19325323676992,337.5455266945143,106.07122886682951,438.4772619772527,81.78825037057113,176.07291911975287,433.19357316898186,411.93849889142655,488.71564126887347,292.10633132549515,426.4410259838517,400.15916810587373,193.37614812204274,396.4859008839384,347.8176091393578,490.03811588175205,489.86845760142495,395.4778616469069,140.39122799641623,311.6034954721685,45.33750733870878,436.7288566408525,409.13498281207484,14.279484824212595,211.7766949586627,344.8266118202965,36.00952157796144,426.8114967279133,322.59113621680535,201.10832413605573,310.35749150010736,366.67896428728073,405.36828538446457,489.0495148239895,108.85077065688786,414.2615689056063,285.7554304657993,367.5247068524973,99.4911523342289,10.585552802694354,188.8294932623805,390.7379564913011,374.2159398396182,179.01395415857579,272.9110729957407,74.99316848674043,434.5775213610207,322.9460780239373,475.3014751597872,217.35725764404245,349.64367013948316,448.06683115015824,407.86644172852726,398.5062538921207,439.0956799997847,246.1458207689684,437.07802139432783,276.81908772297436,420.97584500247075,75.42437335527008,217.63163141541142,174.07381192571847,63.356361084501046,167.99740660471753,387.1191760442875,455.50612884432104,11.085266528093275,246.02312403721592,329.55080116952587,456.9043358348721,123.10510534388253,186.16272529795364,416.90092635866904,410.1240575989682,257.0911140614459,348.10109168621915,440.7392487251284,324.9952568691752,456.4179322327124,118.75426567292003,432.6182913151493,115.32102659163523,148.64286964903462,445.82412610875946,198.08097508513188,347.1315453758176,443.6997943159109,204.50788206145975,79.28673974282252,309.29250615588376,122.89779509131581,182.54561310336837,308.4714558728087,259.25925168246744,171.82036068525753,274.12105620149816,298.0386275037941,111.59014672639044,387.23360363925974,305.9797878460797,61.19565211838762,169.4521041690027,115.09373093668785,335.77761123721626,486.2382564410967,235.91261576669044,23.971279857789906,413.11416795455534,377.77010157726266,91.81215791618725,163.59502287937545,58.47468883325857,482.14037220675,484.9848597965749,352.18099987403207,51.101957980122734,272.7719001514532,228.31149613196834,353.6460906714214,162.65106828301722,304.0633150413078,259.38770202379504,349.4333868677454,396.3233081584645,94.82903161780587,216.2793992183659,79.8169661118624,78.7549989503441,338.25996848602233,186.93163561710324,248.9519644817013,51.93081570890013,400.8427134967215,226.63728771585247,202.75853595125594,411.54174658382004,267.577313149074,404.3402536800816,302.5335902606996,193.44038127784745,437.24412703289494,241.1995916324996,239.12425291706808,223.3952889670584,315.38737617595444,404.38574567024807,405.69407090366616,69.1333458745853,356.83062619018835,428.26519179576053,219.33555033137742,332.81397740142705,171.57578399434658,392.26191394854317,494.8335902433165,193.93431686537045,464.8047954109251,120.70332500043612,266.37754839581453,41.42096811283491,75.57163778418786,255.585718215254,269.574286376427,213.58569193520526,103.97507135845419,349.34483851019826,10.69623820523724,483.5563185223665,458.0544042975947,469.24073239431505,495.9747938991073,496.1494746971877,194.4551865841736,103.00829162510772,181.21155070327654,112.0450130180689,335.8996114546601,428.5090294569575,368.1393391259078,271.44102951786397,4.322676823382388,210.18613985786527,38.05589953178323,374.5683241042601,199.81522886656956,468.5896464429189,129.9445671091739,275.8108289979057,497.78454362082135,459.9101056974245,76.74211908678186,207.91471159824837,493.9064169341484,143.57784788406036,338.5695523397304,416.252172146782,124.78139217801466,172.2476759794923,417.2637497324798,466.2758619049848,323.2123514265306,495.2528235900955,47.668890013045086,43.125644678407184,284.8165775346283,473.01833954542116,476.97457389280396,246.7026518288119,80.1678365168279,334.0243231680676,325.3477235604484,153.16539809832696,455.44631878954834,385.4484819093621,73.63689183004351,55.087731269858445,486.6797387547541,81.01602363953641,461.69329184774097,218.08414589657932,131.35101061652142,369.1269468993457,399.58955074564517,413.0830447715659,321.1596481108745,108.56882577565119,305.8880336413819,213.3495393789585,395.7797565536733,331.64868252139047,153.94153664241074,320.2543312859317,1.2185126979280536,411.5451400103218,412.48690270893206,436.2648302218731,466.15377637600494,280.07135388249526,298.1377758732539,391.26335363500453,17.715952137379197,117.90139669395028,439.0622917878816,479.9332962128612,316.73801533957493,216.73360117131614,312.41902712661494,484.5783936995013,348.9166596237402,464.51239083796855,30.293978815688405,335.008551169249,165.26379123974755,214.79093513047764,420.1076141069462,66.40696277628922,142.28443302787917,380.0254551368133,230.26659166918918,91.7788411867505,8.79793874311796,243.23075637602443,159.71795770501217,173.6832115484881,306.96331840079205,355.9046368615736,53.63802096174963,148.24995774245352,72.75684126082137,386.494909486959,274.3746875674584,403.1574122351212,70.13875050527119,414.28398666288723,419.02465332158266,116.55409182434539,436.70886190073344,124.4483232329231,7.146133264114285,148.54538026111896,362.5872196998955,345.3328743122288,320.88406829027383,79.41905144537998,59.96272376865441,471.79439838683635,34.715171258465794,176.78701811168784,146.3687159372895,68.40181637078646,175.04531117746592,378.8208149766384,5.219035891916524,33.59208884048381,96.3970565165132,180.03138526239127,35.45609988835796,232.38480355079383,129.8050159849925,98.18115434667175,311.5791962428636,485.02653365143635,40.94535732044014,350.43829525509153,453.94676458514635,177.22032582904092,172.7494503474507,337.6778267382566,383.1518996035497,334.0936538080771,169.58515771566607,492.4729741331113,268.76157443230153,428.0299637408974,407.4656654774692,62.009746645918185,253.38149592006965,96.71722228812341,77.36687241649587,274.85629757714213,40.47473011065439,421.90161017234897,278.7250812048063,336.9879312339237,484.1840139807804,315.78139646631297,138.20692605822327,336.80500844254834,164.7174693322002,327.1266013108427,37.285921133681455,161.79339413501447,292.55984635480246,76.57106652142276,17.561091190656075,272.2543681628291,0.994204766680995,255.03798901581976,468.58064328621884,255.66043551906813,456.55991051356136,13.814099776383593,194.34260332610853,11.211322839092762,198.5920531524251,317.50989535537866,347.73354138726364,111.3675634947342,87.15681551817922,271.17477664185554,165.03909434854936,93.63634602709992,319.56494813454907,304.7362904862799,261.81357870044695,491.8000433311669,319.81615064301604,356.06027883828153,287.1366100233029,298.946865045599,435.27369488924006,453.2488062280593,105.15323454164493,413.3911125199192,306.21647851970005,274.37226606644816,14.607686839277822,339.46514200045,5.052073238119625,29.617951769428608,356.72305407748996,438.3426785133244,477.94921926151744,317.9663522798577,77.91443893413641,192.69912469670192,319.1464046551571,490.5956084892242,261.1074232640387,459.7071874760094,490.7055894292234,277.1800409695061,146.8935881287202,413.5057396882627,194.79232969509997,183.80086010389783,115.22048316932731,465.4796384102421,71.39597082216554,241.49086802513187,101.96565415201341,72.32483185452443,121.42717939804237,67.19867211643971,85.8380265044314,495.56574444239766,144.65955746475612,264.8527722892401,50.05620891502394,66.74229692273937,235.59860311967685,341.6480047520941,252.58974470980002,271.04811222664813,477.77721187208755,120.58107544015772,158.2252021237067,496.0695010014636,37.317254665769184,470.61122325588354,318.23597682015014,120.91688642192433,70.00725514798911,403.24532261292256,21.87160543854294,261.4356002989228,11.149207350325652,190.2973851044707,154.38375658331316,470.9056388692393,339.40678196378525,164.62822582921422,451.9111391250245,207.6400577572023,324.6451360454672,265.75347716719114,197.9918005187412,367.9601594896148,325.99945808398843,144.77035068506171,66.64514724494575,269.29064859324313,92.66654793404771,62.73673378551459,258.19927085366413,233.43725241675693,52.948681788004606,252.8993565274551,92.52504658343929,36.49441967835643,290.0421257195965,215.14627856370683,375.2320219752321,314.13567635637486,283.1043277809975,48.815460014337454,101.6791922315975,420.7267523933745,17.08324428136576,390.1729063402328,499.4924273507,40.775481133534356,479.3152027881176,267.2890260980824,119.23130867074738,309.20462640239,332.85099092509785,401.57363973233197,476.0729574174081,249.46835556989345,364.518308634341,339.9205049509939,475.05357289504013,274.6012098664109,7.385460270591948,493.52658770655745,60.61927571712356,429.14822359990166,332.82540369321725,9.07216508978892,312.19264207071575,110.80058422270955,443.7816968756735,200.9912715246619,137.26878593937496,318.10725764172764,55.58205078900824,474.1308877899716,465.7858598958892,25.861942522624084,358.2359689290091,376.64278741646405,10.024868898474093,330.39275004709003,288.9117116182752,220.24417186047674,149.28479898479995,315.2632977559892,119.58315643642914,296.9018323616802,327.1530895213718,191.28067664264992,377.1649910459578,299.76746776358596,294.33776036834104,55.67881134842845,373.51082900551444,82.60018887505672,129.56686657159932,295.7670179648325,140.33810652426993,359.5526275123284,66.64229119287202,249.39461528175678,134.34188622069988,38.436519423745594,86.42063064404914,3.4718864205112165,43.782576951157615,470.1827949461367,419.86531990706976,30.943557897101016,220.9030687658291,449.6018321240308,73.87510675807096,131.9456536164102,181.791577352176,207.74348909608776,276.3184467240055,68.03203697939043,192.81054173021138,342.7562447022836,148.7388074077217,432.17159267882823,248.50818193271573,463.018799991896,46.90244341664862,295.88339471475456,204.65488645019582,445.3995413142807,420.064534303133,405.4528354839798,481.1381574868322,238.8309735683628,495.574047872694,161.56970659107972,366.8441202079178,208.1570817314077,168.7199210809285,90.66953619866291,144.43102608125213,130.2245873582417,166.99569523388269,105.31787710417329,320.00182432126576,49.245023867248385,441.2857944636444,195.40648207116539,339.41569454226874,58.487825437556374,404.3105231767423,329.33626242236437,385.34334296970076,150.210765654741,31.82493379229534,287.8503029046723,240.17393423344646,252.3615066188216,401.06838210210174,159.7633181864504,388.1178801226541,474.0724206517938,491.4141418613206,460.01869949898946,231.16207661399147,489.40880183493476,17.39042697470805,65.16278968454647,307.4381515657737,382.9336307897726,473.0935920972902,310.17271600762354,372.21875820649484,415.8879958123125,67.50876057427423,66.5856547991327,264.75276156947723,485.9698712360917,133.22445792075854,317.6529911147936,393.1441166656305,67.6786939190419,497.3209458325237,372.13921473696956,441.84948451039486,311.1154630533196,99.62090153207347,13.765374612996538]}

},{}],107:[function(require,module,exports){
module.exports={"expected":[0.6886060732636674,1.5689187419952673,0.25687870930910295,0.8581111082044629,0.2994294523343344,0.4662891329736025,0.8864218809562601,0.4413168265073888,0.7679646304380423,0.9061104076492834,0.07779279971364961,1.1666484274759163,0.4866130509461456,0.7925188352729423,1.0289230319664817,1.5011247118811255,0.84435966514573,1.5055690257548762,1.1233566555391339,1.4311588524097505,0.7732639205283012,0.09362569934072812,0.5007223125773284,0.7166199302668617,0.3694940325263163,1.5068877184638265,0.7002707609883017,1.356110556425115,1.4262387900116367,0.6633710780008113,0.8005814583289336,0.9254386784086219,0.48308389509129895,0.1170587841860446,0.908064694073732,1.1573547443513257,0.8556376667804011,0.3023075817216671,1.3605838597089703,1.2187383552369042,0.34835545704507326,0.9374490804395744,0.6289312337089696,0.9090255017771242,1.496666975134627,0.45959894442128413,1.305529794333513,0.4026143208658615,1.1969968396639852,0.4916938554134709,0.6334120946206454,0.6969015353036734,1.3409002494149598,1.262948014166882,1.1061365765608786,1.3028139317018574,0.17339490908526986,1.295939492781813,0.16831423491032563,0.8430513141171336,0.017478725252206898,1.1455496159661234,0.98155138497481,0.6988681608219278,0.9851820140089493,0.710531824983434,0.97150588633235,0.24110159797706465,1.4866062045056458,0.5811266977322983,0.9131084166176693,0.08360422790244051,0.23804173574645549,0.7091416353620846,0.36691904725578994,0.3424047266705786,0.24366912771423463,0.8134512354807237,0.8911299421955668,1.0561338554700639,0.5692093326258294,0.605923283220776,0.4341055441057983,1.237593846871713,0.9938500716443075,0.9480410066325992,0.6828930732116516,0.5256986057661559,0.9677804400729391,0.7235400560988807,0.09499085788268395,0.4873206318662409,1.3911869466880915,1.1727274641977448,0.09092705492097788,0.872810345011321,1.009611127475777,1.3878614384905459,0.276341079924958,0.7361264650680943,0.07255324976957658,1.1648266375118823,0.7420909025885313,0.8345602511157854,1.4480197536050323,0.01375877325869799,1.0572465102993323,1.118373032524754,0.8035297376816017,0.8735565615193484,1.448731992696542,0.7514022057512205,1.0071015538837556,0.7722928709854258,0.9884507152444516,1.504055548230705,0.7462107569470777,0.611323267158886,0.1686745368018764,0.4449645257925889,0.7718573429736456,0.2197343927217376,0.1299464566441364,0.9219029620282742,0.9061069209335508,0.4733154836452824,0.3604148950232402,1.5348694623062196,1.3687289413808037,0.7918149387051292,0.6089218847623783,0.5909898874520156,0.9991745679826528,1.1504593602224122,0.9179005479179861,1.127174147921574,0.47302887858157755,0.9020877025361388,1.1529856097177131,0.5192801191507168,0.683809719237197,0.7994792420922893,0.8672341437772544,0.330267157665971,0.35405601871061587,1.3126877012265872,1.175147819191261,0.9971709129794204,0.8110719319843046,1.4572627691300306,0.702536956650396,0.640461566724186,1.2250842861739608,0.931812000170469,0.2988964994958104,0.11188026054632097,1.2173916570875416,0.6420347766983878,0.19984265387148775,0.9834845984617858,0.6974845064904016,0.780543583825968,1.266857724610991,1.366788440771685,1.193387118318812,0.9287822976897707,0.951469086941193,1.472975252460115,0.33921748577123345,1.2428580343166837,0.9961851020570577,0.9399852574555577,0.30236948817984005,0.5658005706067389,0.8766587619669677,0.6500995049924614,0.021561648180144156,0.9001407809521986,1.2374469383260673,0.6874686205686084,0.37233058837144917,0.8146897885968285,0.26448277834472556,0.5763775986682171,0.8647305134078009,0.17477707160665604,0.5355650248686626,0.7890562987359794,0.7346812883466496,0.3811287852219835,0.6186774941631185,0.7245390583492016,1.259784013526946,0.37005604099991857,1.061937267053649,0.9724336562432778,0.7473431138619799,0.5064421344059951,1.5376124176970505,0.9686928236266331,0.8284058771366657,0.6067220609550472,0.902741096748151,1.2763251350662672,1.1634988646481654,1.1909576611717707,0.5589216493149467,0.6887762450363644,0.7538397917406626,0.8724702787166317,1.390920133186217,1.3094499245093145,0.9177326658597779,1.0417517950190076,0.7888176309760547,1.029537284244849,0.023570011340510576,1.0128523879508922,0.7699768061088352,0.8301359546079815,0.623876878766115,0.41534293474311484,0.8781168816404609,1.4766184209847364,1.0384925552650321,0.20600746572666553,1.2752830765820056,0.35061196269330686,0.3383064823459122,0.6536019465539926,0.8729522186074624,1.1930607688428223,0.953362676429861,1.2464472588917364,0.7054871300182846,1.2206470305942712,0.10590315094517334,1.040368725656843,0.09277186984021454,1.53379914492487,0.8819076584587839,0.7886737162940918,0.27846020654897413,0.3720845707617814,0.724746194985391,0.7974030025406141,0.5390781132437138,0.3358913025229632,0.7304914444989828,0.7141613023017721,0.9131103890617526,0.25969397752697226,0.5655658076760467,0.9013848090184191,0.8072441745356368,0.018082951450173895,1.2138898374272866,0.2827764620657329,1.1441999700031988,1.0838833737289355,0.3210710697776139,0.6468966935973787,0.9744367153286722,1.046131580367368,1.1025288377559401,0.38933602077341917,1.2949313165446625,0.37109962198083657,1.4472391754026241,0.11425670601085434,0.45419828152122754,0.5632477512907318,0.7897799203537376,0.6067271935456078,1.130411640385443,1.2867195871307315,1.1978276760311997,0.47580538458355154,0.42188506735806897,0.3144220123126183,0.4788627022983697,1.0489937014413306,0.7374075966865568,0.9143499774043574,1.5174787912812133,1.0234382336059755,1.2596680575361834,0.876331733492754,1.2432396610683947,1.2655706179429185,1.3251407693188457,0.2631216312460316,1.0458169439812348,0.8213298105621952,1.2040985173165173,1.2054132005438094,0.9163102392395406,1.2800560997847445,1.017314091382095,0.22445066213745937,0.8743357132475824,0.21083103476321835,0.1762194985294398,0.5647036590436145,1.33287765242802,0.3552756855324346,0.6187617400612397,0.6311040153585975,0.7855837913586126,1.3305984906586221,1.1584146346256547,1.069225639888671,1.463914602572307,0.32324227797616345,0.8063298690637386,0.7875335621807421,0.3550955651508716,0.4799764980970438,0.23320778335238201,0.0508714456447603,0.5169879783352862,0.7054734018447936,0.5227400607065136,0.41738309975603244,1.0163646425303003,1.5037809603948067,0.33133779627181553,0.940648575093181,0.8765835855539468,0.5692637818979442,0.6330446257757708,0.5767952970573523,0.20847986551680808,0.3832195047108212,1.5373781708305656,0.9294583677590493,1.056132528097971,0.023568246582420557,0.7931093853643956,1.037214718995551,0.597962283030521,0.4039177183431112,1.1765062645564308,0.0567018288095772,0.5225891424663931,0.8810867294374162,0.7396225517977042,0.9055873017917668,0.6687407702846604,1.032315763972858,0.9081828026675192,0.7412197087797553,0.7618600653816022,1.2462870865519893,0.4143451066390541,1.1030139537435917,0.7252809014054923,0.3683369849981393,0.2739836543174882,0.560220137917342,1.1654801346748562,0.8221748439902221,0.8911390389069975,0.9554805670984303,0.39459201052358545,0.5637184033906351,0.3876110187327372,1.4400879976364434,1.3996367180515652,0.9047594685699052,1.1801616917224553,1.3925269923152404,1.2484702100256364,0.1630461764974948,0.687250771387637,0.672232729168348,1.3740315473281723,0.6124019814551104,0.8725102806235853,0.7547319496171276,0.8085144492560973,1.0912888212759244,0.3021465200756259,1.169104581829855,0.5201887384165569,1.1441663200543923,1.5149369684838367,1.4153358267620364,0.8732768568041904,1.349854975443228,1.0040570768185346,0.6325265616551863,0.4387990659278108,0.14310900897218679,1.447951187741688,0.9389070098948316,0.34885016800292984,1.0900008177499618,1.0109434938285566,1.298758754546462,0.4515872326237736,1.1443550063574526,1.2684081934412375,0.10220914434826231,1.1917569562017842,1.4788024380232965,0.4070268689096145,1.0753967939125917,1.1607261800892015,1.1847899084097273,0.9363170784762128,0.7321650947610986,0.03836124168253668,0.1875967934681134,0.9137276586782374,1.3160416971177988,0.10775878142451377,1.1203105003570102,1.1180685044382226,0.2017294064830848,0.27656380042715545,0.014975279491134889,1.2021664799846055,0.712434347413385,0.8542977555514076,0.42523516267706624,1.50373324154543,1.4676371141510178,0.4483875527035327,1.5689869469897297,1.4586223273718977,0.20453932637645833,1.3190289905483525,0.6100417192688341,0.7328360138518791,1.235845839943853,1.401976340434554,1.1935454764671425,0.9832371027762261,1.0060142307318591,0.5407371083475438,0.6970402486917494,1.2544927257633496,0.8908995844106286,0.415446835934003,0.3192035161002724,1.0464652000490955,1.0770791301625602,0.6458894583115942,0.155810135476379,0.3421370204419209,1.2495380661223217,1.4249817126756157,0.6799554404005316,0.8751715813544646,0.637060881775196,1.130759387631102,1.0569945734101214,1.136689428643874,0.7885630980563831,0.11507975018055348,0.4182438725351503,0.1287777950121717,0.30289250952427904,0.2889614035454574,0.07758204220690987,0.8916436401666593,1.2155072213026454,0.1945528209881204,0.9538265276258946,0.2541086154110098,0.8763974112158247,0.2484366490830942,0.29714120995755494,0.06818777015112672,0.903521351051242,0.8263179255761953,1.321372903959957,1.3829088528901003,0.9419015269373469,0.9252932662013027,0.14667760272052535,0.8901363816604796,0.38285787745855693,0.726954063203528,0.8996077341083863,1.4640456508761306,1.5204150146760371,0.5540622427880387,1.204024940339278,1.2357869615377408,0.758578795380977,0.7434538743470908,1.0120317388605276,0.080796382700811,0.4739674012793687,1.5096462966570874,0.6673713300258289,0.7748287412791697,0.10214746146275502,0.967106374616361,0.706678701121483,0.39270663284672425,1.4950238892368497,1.401209751712115,1.4200243644743271,0.5401360535495734,0.8613008082608682,0.1113205834150574,0.3597442338666949,1.3502125945431454,0.35190654751723893,0.6600478665095619,0.03246145035061688,1.1268046630477346,0.898108916817657,0.9696065837846787,0.6013232412997824,0.8492715057072302,0.4019221717551648,0.927052932637839,0.4293104126669432,1.0724364046306991,1.5416964691690604,0.7670979240485847,0.24076972664051954,0.33765096340991013,1.027047630087639,1.1415824417068063,1.494415878627159,0.14155387999615412,0.9371288753255742,1.3931709731294515,0.37603705395641385,1.1779746343090345,0.2070059049453815,1.4420902638579451,0.28665317577706456,0.13918246725399402,1.5233416556172026,0.4100237061828072,0.19097889454334863,1.1075216428136367,0.8926250948509533,0.7402628822844346,0.4343011547323806,0.800410524943938,1.355335641494436,1.088643809275962,0.5555483083011994,0.17216959629326203,0.34969931337469196,0.03893403401247115,0.6072829124844411,0.38116216882934517,0.29377220604525933,0.6153980839932985,0.43988144050081335,0.6152352180852928,0.4654759242200348,1.0460292722759577,0.19104332721349968,0.7524159667808051,0.6776401905332717,0.02036036494942801,0.8462250421394185,0.18361919121566098,1.522849715246998,1.5453516862252887,1.3410204643629497,0.9671685516818272,1.1014332102714521,0.3870542195482224,0.12191323241102815,0.14137179621461915,0.8586675463590523,1.1002390404324025,0.02833776029013668,0.05634557721429233,0.6017612851057142,1.2933089772092157,0.7425161042455447,0.5389792396639759,0.9167350552222208,0.574575045413598,0.7492969158547986,0.25576133526796696,1.172434052346544,0.6697928233742912,0.707667984706973,0.08143292912715562,1.3960522014373136,0.6444580102016775,0.4998035748541397,0.6675876329742335,0.7727511133291896,0.6730565273405046,0.5626331330941656,0.6085024543740802,0.9951644722371421,0.6161729883801309,0.88715912658767,0.038182222991682314,0.6385936813528358,1.0856012675950035,0.3194545253540599,1.2871390551491957,1.1365555976340331,1.5161668856707728,1.433111994887594,0.06176179344865431,1.5417667288755912,1.1746537608424477,0.31547639700054914,1.2150270601701034,0.29378141258664087,0.8390388865678505,1.2846857818784179,0.8699218805708789,1.3498644879767585,0.05954846219743186,0.6439360594925183,1.3561187158488426,1.3197577752312815,0.7805976421346831,0.5391877786642401,1.1204896758901044,1.1058430928722969,1.3185758032083794,0.30073663670584344,0.5006266698507612,0.5977285338815035,0.25589347493049946,1.4721933983755844,0.9210222698574416,1.4760380758071638,0.9098770277554858,0.9800741065316999,0.06639541300341953,0.4167830913454002,1.1801717621757115,0.47474580378019504,0.8065728540821637,0.5107876614998128,0.35453111062852755,0.31663929189000184,0.672116951243901,0.7435752387403359,1.1320509499169027,1.129601159842402,0.31819972526950757,0.6052953264243052,1.127817871498986,0.6142813900792907,1.3138594935642556,0.711763237468224,0.7514282479116998,1.5423254327771396,0.5599717138683185,0.7881392253267943,0.7540836478279705,0.876100623738677,1.1471934871211333,1.2663614065977251,0.7272863365643869,0.9471617513566168,0.8672575151672428,0.1640877870590004,0.5360231361439987,0.5212703011494214,1.0863633884323993,0.6802412773551919,1.3844918121521321,0.5299643668262538,0.33466922991734,0.9452386825091065,1.1460739263122612,0.8483162843439412,0.7643476872784872,0.8149429082742774,1.4161166170475787,1.0332504240701705,1.5697509338930804,0.4018128310264021,1.047978904948393,0.9277864901317197,0.3302867824690462,0.8526739868898191,0.0008464387109179044,1.4162288183592118,0.6924908999964813,1.208948845879981,0.7997560423914274,1.4203170716403948,0.9623501992672931,0.2099869018452785,0.23406151989724663,0.5391514567771557,0.709027570219597,0.357167445148329,1.2364989982953005,0.674024265406943,1.0880325920795393,1.2810341353128067,0.43081319136107166,0.12121323431767275,0.8564871377787954,1.0018056118186751,1.463409551339184,0.28275698112263026,0.6257194776117652,0.1231926394918925,0.5521457345715917,0.7367144798891477,1.509003263895286,1.0434320741153809,0.30849838857008316,1.4422608247711994,0.630338479027651,1.4694643417292395,0.3934258028333192,0.2898007261725466,0.05361855523122804,0.17963092881898163,0.9590332594590322,1.347019031092742,1.3003081491976545,1.1442185348878338,0.10458547400442572,1.000105607115522,0.13685471810507943,1.4432056631283656,0.46258365535324625,1.22069389150882,1.1711513611361135,0.47026900774221186,0.5900312475782111,0.4725541454860829,1.1018058688213221,0.9918610139211615,0.3666225378131117,0.9758363007166614,1.3199162819491614,1.1069725643280226,1.3161601628404176,0.5549768546274121,0.36583635863130315,1.3314964739584978,1.0324174780316404,1.0763604245320366,0.11129064586057172,1.3238396921831543,1.2059316406483314,0.10730704253517087,0.2511200581630757,0.4129312166344712,1.4444627286961735,0.48587143804453536,0.11908812817823086,0.7686141821972181,0.4498589394052431,1.5353724202194048,0.923550293395949,1.1091694976411284,0.13803551662584373,1.173103401273511,1.2906562235102492,0.44974570485687043,1.3407965751380666,1.1188830151903453,0.8886835215015977,0.48473788458491646,1.4060668128308667,0.6179274996140719,1.1797091523468202,0.888327364433334,1.1880208360476754,0.0840400146159384,0.09727117628651821,0.31929960714789873,0.3707647647329817,0.19482670662928195,1.0372045600071729,0.15423390371210713,1.2107878184946461,0.19111960533519162,1.061502522201337,0.8361071209120425,1.290375819482872,0.7477175384594911,0.7558167391831886,0.7347894691022496,1.3295175291058439,0.9006075763316427,0.4211681209674914,0.45905687196958195,0.8708763476667639,0.2949044229039764,0.3527595995250974,0.4171138586374016,0.3708065125188178,1.069500356208429,0.6284420092980808,1.0391898375211162,1.145520569786468,0.9915516457201043,0.8492928908978624,0.8128809626675348,1.4197746845541324,0.05872720144068812,0.1564207605842778,0.7593290989623532,0.8244399732052625,1.510013855757104,0.7913670817914344,0.5601733169579297,0.2462912173158034,1.0943793630855754,1.1595609702954732,1.3252244899367427,1.5690525519913807,0.4172285179503502,0.4131745283992532,0.707935676043314,0.2528737288834408,1.2120453205369046,0.13493393115085936,1.028940609647957,0.8558149274252788,0.8378718151665551,1.1448065815544601,1.11182275780592,0.7546533920994192,1.1223465338022658,1.4295306165185497,0.9812120499161123,0.716263601840385,1.5282128982245953,0.4614700980779299,0.30086845137551904,0.8244500476316231,1.0397118974171544,0.5438895468846473,0.5697489743301185,0.9410693903361429,1.0685651172142177,1.3274011878267176,1.0894491076714792,0.7759687793943543,0.7521709190082331,0.7502089426272134,0.5362237186908091,1.4068889547402454,0.8253520657070402,1.124247507636615,0.5963410490529485,0.09617098584467622,0.748744482411995,0.17572431176024245,0.6556789185820604,0.7896229413173569,0.9242548484524449,0.4399330106201812,1.324614098074825,0.14970717627570096,1.5089883253143028,1.1241496705825564,0.21878589320078884,0.3325128525098506,1.422214171388337,0.6691953894982852,1.2351569098322768,1.1315674442997665,0.9404626737547328,0.0018558833331627554,0.4088787001211238,1.0096942692372168,0.5806910181762462,1.3547168284691373,0.0017486202096470389,0.056783396637028624,0.034680115223079976,0.7695203774240835,0.5959890506709893,0.22176361277791362,0.34871865732055946,0.4573639296288383,0.20361217478083624,1.5619211352017681,1.2411443429510318,0.380990265475215,1.5155043355927795,1.373395334520669,0.7487325056393637,0.004668917257941762,0.6575777829083307,0.289621778143998,0.3499104116605818,0.7594697080597825,0.3369601777926395,1.0213709979936634,1.198453090599611,1.5159128210432975,1.4217137632476167,0.569579796178227,0.9551330008227836,0.5556986741051785,1.5307112391762694,1.1041899661942862,1.4125743851194525,0.8508406809951159,0.7815661327217115,0.3909173533610113,1.0331392946618556,0.7250936568629087,0.44377064477957984,0.5358860434219244,0.7647837045021665,1.4870871299781936,0.5502493474706543,0.40080088053503987,1.017208377755982,0.7637184510735527,1.0488302448367415,0.8369437977256668,0.7249953205800066,1.4918886782652947,0.33696092404875577,1.0008348616047582,1.2896889399329028,0.5405474317338256,0.4267828070473354,0.18124011298269252,0.933220005267717,1.2830780310259844,0.6487487943981873,0.18344516923512721,0.6802668287594258,0.6478581876568311,1.085433271496233,1.1859739331507309,0.322955927505479,0.2311840675428035,0.28077497291882547,0.15863334524968462,0.26999804153066354,1.1429819874449438,0.8505184815697415,0.18626618415818402,1.5557159012048,0.8718425323772718,0.46023605016746666,1.3699842699953249,0.5974574611794543,0.6363389891578651,0.43578495482322066,0.7094905524232763,0.15785815608926548,0.48264365975822343,1.3933432770959655,1.1712528262639952,0.9384701982465462,0.5063199481191978,1.2871138876466257,1.006703134117284,0.6637126798279407,0.7494217727508032,0.26819960502568957,0.2666435605868647,1.1615088550146808,1.0606103333541974,1.2565536290429322,1.2965594759426442,1.067844719609913,0.5212290459920866,0.47469290605155723,0.3193902632446453,0.6775893130124832,0.6935900932511013,0.5643489462571828,0.2606054623380803,0.7038170121001203,0.9668728997811663,0.4083451436343953,1.5341078665137067,0.7565165471711005,1.5612037685187183,0.33405854258331813,0.4314270107970116,0.0059065116208780214,0.871387261000887,1.1772169810439164,0.16038749746997072,0.21959852618295764,1.2437116394125876,0.6313810368684516,0.08327631927655416,0.8850530550581217,0.33364960389394627,0.9300527155326614,0.20176500210606932,1.0576086631356414,0.4038966862563162,0.38598522326245377,0.9496377010150284,0.7338754781289031,0.8678547225387082,0.5237189105562094,1.0695409527036637,0.8666504345324979,0.9410517794524358,1.2101265477868621,0.8291469699148626,0.923051188610879,1.0531476667596127,1.4975676834016944,1.1120806427744516,1.4611335216702812,0.551475499309209,0.255210484009796,0.912230231231509,1.4665156244637634,1.2409456795218192,0.7849346811765575,1.556265351679583,0.3476827417298165,1.0323604061964162,1.412763543393273,0.8876005860641719,0.8852906196763799,0.9290369102393199,1.1240522625235116,0.7451719193582246,1.5339800748157304,0.6715610730867556,0.970299911126973,0.8861297591500921,1.0944644579120277,0.508496377601315,0.8702373608928786,0.3055393803747445,0.8514412565001919,1.447756684789062,0.09375463997514867,0.9736349631563221,0.5575681578515179,0.07595176441063047,0.5694252307735066,1.2334107607445386,0.615987907423971,0.2395819196268788,0.8930925922630343,1.465151988973219,0.08656914965117113,0.8369297729639184,0.9133630855475976,1.3446552185178309,1.5187199369045445,0.20832340111845576,1.009631056850225,0.7675965444472838,1.430697408816395,0.41948625763520475,0.24941091517999966,0.81489641189612,0.2343060132448448,0.7004207045354437,1.519100261689538,0.8958855765156133,0.8881428742258368,0.5419648912442839,0.6759100910800195,1.379705751656256,1.0580296795219364,1.4899477467415005,1.0785433732570044,0.22855092542837563,1.4097492127289153,1.0266322156390078,0.24343870560069478,0.9243386134111327,0.9507881164760865,0.7347887271525465,0.7182504856604344,0.682425562385879,0.18080422182392342,0.28706090024088937,0.5065722377478752,0.7110388514895837,0.5886916680660516,1.4312225020395637,0.12932823792623885,0.6600154378344721,0.9811724914908415,0.6945914390977156,0.7188421032939278,0.6551507758337313,0.4370343319172064,0.6920550420486941,1.0114731891039792,1.05873551536898,1.073267506183543,0.8926370074644383,0.7866564460623141,0.44057269646256714,0.8597672517353857,1.4703956737790311,0.9056000172245007,0.08726560148425175,0.7418737764265114,1.413828244696898,0.654735949921447,1.0539862302878333,1.000908316457443,0.5309386322805371,0.558137935822586,0.2127628315439328,0.8604999889980715,0.016512702463378458,0.810847549481227,0.2323689621954769,1.3409813279912057,0.4028926715593001,0.9247156606167394,1.295951166137122,0.21358355237527818,0.7688785639560682,0.7448572069848564,0.5562583944878192,0.26593150782516745,0.822612033591412,0.4967396606039908,0.11712185832795437,1.1421200373996612,0.2561222285821462,0.7854718097778617,0.5346836337601956,1.2502628093702797,0.753984863262664,0.6065884243217844,1.4652550068464285,0.28205131092714136,0.1338277113783462,0.4665758502037868,1.0486816866785516,0.8903626496158351,0.8651906384703772,0.1401643459242615,0.7141006305737212,0.9825767531834293,0.32198274556701867,0.38431085632625855,0.4688659216564181,0.6046076141107408,0.9399908087105051,1.475246944500274,0.83247067012416,1.2018164830456777,0.9098843425679212,0.7104845764736235,0.7392182549592858,0.5907662835654053,0.5890787021018257,1.352779115506014,1.5478386214570055,1.0850302762721846,0.9543911699797352,1.1025155426901818,0.9130578262018585,0.8279396228711245,0.5607770750883827,0.5191792937419052,0.978335342906913,1.5070175236517516,1.54434562157029,0.3152828302604585,1.3401454019733867,0.8164090467447288,1.2572714144844612,0.6454803403091675,1.009915799935477,0.3924104601455461,0.9182272271897942,0.1551964794860903,0.769082969290003,0.8461879094179301,1.0050158844833297,1.0061664065574754,0.7916533158913538,1.351613050511862,0.8419499660568738,0.5989755059331097,0.6136991387638363,1.1254586037585168,0.34076311996544467,0.9530776191398804,0.7458731508185595,0.6929277592210026,0.788152123871818,0.4875479499217776,0.20220354821391612,1.0910918589381704,1.2163185797982434,1.169257811362513,0.8053416992584723,0.3604458864113989,0.1988508519040499,0.9928436625507956,0.5531972004446906,0.5717122274535125,0.3574731709895769,1.386353867920444,0.5989188056516433,0.013797132139052612,1.545500004597095,0.04080883128575595,0.15619420517479846,0.15953463253852546,0.20089536959234677,0.21467793864791593,0.38333441800885965,0.6124056310887247,1.465368380449488,1.230764801289822,0.5647394285103479,0.4990741941023976,1.4100984138700041,0.409583162407594,1.5370078769370936,0.17161366847408302,0.6122147593635895,0.15553730420433212,0.8058981922324108,0.5637601486247769,0.9654083529671983,1.2765502213278488,0.5852956100476159,0.6199541698708679,1.5591374596059633,0.6357406270580919,0.997828632927098,0.6573729771892141,0.9440517702368842,0.7570790210752141,0.873185338793589,0.8447381653384626,1.5551290267891533,1.4111389669523278,1.3964217581412612,0.3630676500335943,0.7142851258336815,0.5177910057391018,1.5522815213893684,0.6921473739458784,0.0652212599396339,0.5896800081843947,0.5773104142467985,0.2426120768159994,0.6198805922900799,0.3093010098417461,0.627009643602219,0.7991358986353165,0.8994893376646065,0.6456793650105859,0.8134511022347958,0.6221823612047458,0.924393020822409,0.5961901806755324,1.0583412374955228,1.036136787880422,0.8891787831893907,0.12411121230156566,0.5463973538586869,1.1930467522028043,0.6531492484830709,1.2629911632122472,1.5098881905371335,0.981611110995894,1.1866507695067954,0.208714944465358,0.5856854339684234,0.8189227797374112,1.2443524589202115,0.45359325312797216,1.4064740420727984,0.30875338564613586,1.4202903419563795,0.13880752289296272,0.4656246143869096,0.34519952111419056,1.3486896994514765,1.271818629843541,0.5298646772945921,1.540166828045721,0.7456244336496224,0.10339879954247798,0.21096297494446611,1.0254875486707495,1.1721256296569682,0.667940566016718,0.6037978922320625,0.47010872531823233,1.5520067129542168,0.6723545029973534,1.0931319420535701,0.8802823835376599,0.18446079807868243,0.2914477045319878,0.9676078873999566,0.9723223062219258,0.5770448966103608,0.8699278573427112,0.66703092450327,1.553973087966508,0.8012809376849123,0.0019485623477627106,1.080718849939069,0.04973885377256224,0.7111832431416811,0.4242850744920971,0.8104913922809982,1.2932313147998808,0.8747000688091705,0.7223645976722799,1.3144295271662458,0.20084610564771416,1.1472861785615687,0.7656689733623189,0.11405213896839707,1.2924862923814457,1.215884225072831,0.251150546270208,0.9818396670788961,0.3089637390738255,0.7575753414146951,1.4027146111649729,0.8357349156167194,0.7454481725424273,1.5294636021923897,0.582100214258502,1.388320145503946,0.7676749513932458,1.1473787688659476,1.1118515377324547,1.424329003159609,1.428814444252025,0.08391580710765933,0.5631697875425037,0.9548456896466624,0.985371240114214,0.3953639078713329,0.8658493028929068,0.9918703099534187,0.9846865835062779,1.1041774085791773,1.239760588027412,0.8045984637257364,1.0860059907902628,0.43073651434734295,0.9881388423752289,0.32185979817174454,0.257560624294438,1.55368090628666,1.251170028669283,0.9959785098682519,0.9556297143494119,0.23431454594564557,0.297849918944193,0.8143391827023737,1.1948652995398064,0.7106673843459487,1.195774209394981,0.06306990000580155,0.3172961837218223,1.5268278527308734,0.30390168327231,0.17536175532822337,1.2366514629406098,0.4774210677958924,0.4402350931145355,0.819792633090536,1.308747333711057,1.1252144527483288,1.0829542196562842,0.8216638013997503,0.6671417581106379,1.4284219334498638,0.3955667356384399,1.0580099374436154,0.7385690269983493,0.799143980666103,0.522431721092643,0.35762107606394117,1.5627905647834566,0.0827946185567754,0.19461709823229587,0.6908138620722165,0.2638255424832703,0.7862497973953699,1.2370158141275476,1.1907361557871052,0.27450802491991866,0.873661881465543,1.4377053938243192,1.182737008150602,0.5588272923530789,1.0581443468308052,0.07667013706778304,1.5308870828083025,0.8066821737078913,1.2826628774577973,0.1526907452435389,0.881880296608727,0.7467529821223446,1.0731505078041035,0.4282139697868818,0.5143861279777507,1.243363972259874,1.5043917467034809,0.830419019195193,0.6462722781183757,1.1516494613933332,0.11368556620271794,1.2066209058696868,0.7688842879134715,1.477764311667811,0.38459343140530516,1.2212567971979897,0.9672100011606077,0.6248919821162666,1.4158785596095411,0.42071134957731243,1.5456097440777588,0.4212845193145952,0.9023155413478389,1.3214046904131542,0.7755641977151577,0.07910473393479636,0.7625948732196592,1.4758676813834022,0.9947070448708905,0.6223227383543789,0.9314894839995778,0.06419406553668203,0.5965960046690161,1.3058916877474247,0.7840141806627453,0.9512275516775331,0.7695995576798402,0.7531991738976265,0.8570589581876717,0.09110835578788157,1.4178575737086347,1.53375282724986,0.6029114730590582,1.525017533394547,0.7962204377197661,0.3866482936849234,0.5088071546539152,0.2912284393401453,0.9330101348525982,1.3996061652023108,0.23338156406113028,0.7997411531840899,1.4868483214599229,0.08626330505739789,1.019953281840851,0.6609787991290146,0.8260026019611759,0.7830068323431268,0.3840226113833783,1.2353369679559434,0.6480496837131576,1.3915973468132083,0.2508840928071757,0.13731886453350423,0.9675496493819941,0.6373072884016522,0.8535147298875739,0.6412831831192887,0.13919749260010097,0.829409496734959,0.6313822228314885,1.3244708874988695,0.22158991452972715,1.5679846412864693,1.0425415549508312,1.1240270107703694,0.9425362052520204,0.9546439008152159,1.297050942533955,0.924999657344037,0.8545301173892356,0.707085128237997,1.0313493304154733,0.8510606649750504,1.0158995179431818,0.37850834491103347,1.1430720003016646,1.1869082766044812,0.48744942392675283,1.1204617456903123,1.3479957036997994,0.5783403488017955,0.9519591617164669,1.3193897033543234,0.816346329494318,0.8846670741622339,0.2765475722984594,0.13680587598329147,0.20457823907213998,1.2615724506255104,0.6775491712361295,1.3188056803984658,0.6352726041134685,0.145004859733961,0.9225819857415201,0.9800384696807148,0.2965046028444417,0.18099686317426508,0.7862011223207197,1.2040023432375042,0.5237925323888041,0.2420114323371094,0.38821855339858363,0.7612457730797603,0.8317981607154838,1.4956906982757492,1.024618816585897,1.1248025438829616,0.8445983967767349,1.138666008693165,0.2801873031527987,0.10967027523479064,1.2934723228581166,0.7284754523417091,1.1800512660047202,0.5121483608336649,0.9479892608108934,0.7276360523160572,0.2289414687962099,0.9559991079853898,0.7747256254318642,0.5923312309507054,0.05890457958905809,0.755288059028137,0.44017338908762765,0.48930234245764337,0.7325587228295245,1.0352631566717814,1.0626113177852017,0.7724809521080326,1.5098138485867332,0.42692388411219934,0.9016115395911382,1.1003827198201441,0.038174798255346816,1.3546593330700518,1.385621181447069,1.4552611296072278,1.2954044339738557,1.0346376752091087,0.40689400719686625,0.06796303906235521,0.03640043083563626,1.1992610830158217,0.38368729603945734,1.201833538494964,1.1445878471743285,0.11538171713231467,1.490118215482514,0.18950721602375048,0.4052139772821896,0.3949370590516278,0.6184418278745147,1.3354987507804468,0.6007141218039772,1.2772207975123866,1.5685359359949465,1.487161004646958,0.8280017560932753,0.902311734310729,1.0106746408180693,0.2150535356596995,0.864101371891233,1.0829784286857438,0.6248800960377208,0.14360888695557916,0.8432464732580598,0.6985659561603046,0.6914764199367991,0.8545062995146924,1.0484965526111083,1.3839801960154172,0.0032715242184669343,1.2619813697013071,0.5298565683378486,1.2738601621902963,1.2010913688764435,0.7599987279197804,1.0743273822178383,1.117438005445546,0.3213216396837685,1.039717549531727,0.722367713141256,0.03341883674684538,0.38191177768239126,0.4697114065241949,0.012779851220537566,0.06380712852568123,0.19221929177211886,1.1944285053360686,0.47635078939250636,0.6771014104168881,1.073011945824114,0.393340513247661,1.347741834938562,1.1231003008715301,0.7599693431455302,1.3296346364926255,1.2745150364724847,0.42075730713662723,0.7021967412328964,1.5385729552886918,1.465535630797908,0.16430324423508125,0.6096401203174906,0.32110891224355936,1.495297686310196,0.5315896446500581,0.6915664818831376,0.9348737234719174,0.20157128182545214,1.2465144707761806,0.7664029437667758,0.4276716035537971,0.7888692646780378,0.2673743832682107,1.282447468563563,0.6609354212276869,0.41890742214544346,0.510981616147102,0.9084526868537136,0.5479670471690253,1.3399281774363314,0.8794167576817487,0.3207622326152864,0.9919828317867235,0.4457322420784943,0.25668758599464975,0.8245687820405888,0.07352870108049223,0.4399432324043891,1.0432077559427808,0.9183340716737637,0.9413370422513303,1.1446194527873912,0.1814839313813279,0.9976783558507426,1.0257070925845813,0.15009477422317016,0.1419119766240482,0.7656419617518299,0.22435660432928423,0.5883070214515937,1.165857119610893,1.368198879290034,0.04826165430720276,0.7309210266587405,0.6307562393928564,0.7027183144636495,0.47550094962421197,1.5406167767824195,0.9277127868268037,0.5220910626897826,0.3319779089225045,0.3739289449339395,1.274140393683391,1.5689821791730754,1.1466473297358106,0.8696886255633717,0.6700954802139473,0.21694249728772388,0.8273151230088864,0.2875765354442245,1.1213828339580827,0.05690981057382556,1.4489850917459852,0.7715099468093035,0.07683714376706346,1.5114898013046671,1.1926312505515826,1.1680380731295519,0.12091446767017279,0.25512190383970657,0.7092388790133717,1.5552730837340862,0.46460274828085363,1.3388056606740202,1.0238621991219123,0.04631442682986501,1.5588315521703133,0.14099862567849838,1.3594108450926146,0.9358634099706382,1.3901889086038814,1.5491003388688613,1.3103749368538984,1.5663450196481636,1.2915331073110587,0.9004613830278,0.15445759750189178,1.0458786675111689,1.4939974328122185,0.9808683226088712,0.1943898593871783,0.6597792387977212,0.30076986676428485,0.8261141923825807,0.7970729031700092,1.2943480075203966,0.20299436722803946,0.6882126408723435,0.8306413405922228,0.7542333916502398,1.4248497815817907,0.6580959037679596,0.6151772237996807,0.26946575149301566,0.8736837146017535,0.684421731551542,0.8291898620926477,0.9581805982151748,0.8657372685974765,0.17567499222767305,1.5495271491261053,0.1929714794654821,0.6210281045627795,0.9003312086783424,1.1048370621065995,0.22830668873409202,1.1465721769239905,0.8995639849734967,0.44634762545579526,1.4402892709475532,1.022833810717775,1.5235132436392833,0.9173674738173951,1.2633098202792976,0.6910408028281358,0.44011292966631643,0.5602678405621723,0.6404214062858171,1.4470785540019298,1.0762627147056891,0.7578460832494073,0.6876713868369152,0.9061144465684751,0.755541466818156,0.22214579854921399,0.835735455952526,1.46087921675878,1.4464512323234349,0.5580496381804676,0.4462647469358927,1.1148300891957987,0.3018486188596399,1.2037195267550977,0.9935336650682984,1.4319153173189323,1.5660089614172803,0.9882253804077135,0.6863059661673269,1.213181730431222,1.0229143717210394,1.2839317585326073,1.311384081214706,0.7365638182875158,1.4034952129374556,0.7258133859046075,0.8025563898579785,0.7942639639256196,1.5270754138499982,0.5123128696711112,1.0661690171816933,1.1722895175640262,1.488250986710874,0.7579326644089853,1.0704477068039968,1.350536985507963,0.3245625608754215,0.5800290698278323,1.3241272553402197,1.059503003547002,0.03194502327786442,0.5642201507054916,0.8747508297685547,0.15628512030654015,1.0990191059098895,0.8455563866951826,0.6736087261453129,1.2470044913908176,0.13686521249625244,0.7754407264258963,0.5172412697431777,1.3710690078872312,0.13826222361978702,0.9218936973275318,1.231907567805821,0.7240099499851944,0.3784115524260889,0.9432859648809852,0.8629059157566106,0.07544317328783377,0.8668494773734551,1.4190318727244169,0.7262344899899247,0.22037778706302963,0.8496513726490674,1.0037492444786489,0.0360093771477439,0.8988746809662742,0.18958673182162722,0.7454444167282774,0.5002457694239255,0.34684310742809565,0.44868465256104867,0.057259337601904055,1.2596403115835146,0.25065568105005565,1.2999850957366164,1.5404045298228344,0.3939644878451437,0.4269898083550505,1.1118468787238298,0.9045505632643185,1.3930778160059814,0.6888944675543344,0.6615398675943139,0.9376537534525914,0.3197161294366295,1.0161318114327218,0.8760477558848474,0.6148086019662441,0.9360347021484782,0.5371468939732286,0.8391479170270886,0.8458217605214543,0.0782280362934201,0.9952645299628264,0.8416953991033895,0.2625951466912383,0.36129956081787756,0.08887891166660164,0.2560746667128453,0.7131589583984083,0.8191627214327434,0.44465252795469495,0.8454371937888606,0.3866748278686185,0.6741962647065316,0.6510810398352194,1.3746742587519813,0.9016250233430535,1.0638642502197606,0.9055953200431318,1.248252932937485,0.8490342352571687,0.9106499171789855,0.8007400253328776,0.6243633328248794,0.6655676318334204,0.3330173315906288,1.4363559784052335,0.41641157399884143,1.486832176872431,0.8118869883075958,0.7720650543139018,0.10604914011448423,1.4022530127937254,0.8046562812852475,0.5170356902414696,0.20105007369069333,0.8885895102262882,0.9579456830999573,1.2194030018596669,0.8578664467999279,0.9719587356256253,0.5116110289160591,1.4239146761591768,0.3694962551134339,0.34982825603570467,0.15832899601522907,0.7522675201770523,0.45764627099837857,1.4339436831810548,1.2971042370655863,0.7091416788069307,0.35554436361630953,0.28551284055036763,1.4832168272369952,1.1397661366244292,1.4745096428320905,1.0709498366335009,0.1018500001603416,0.8880713175418927,0.2826021809020262,1.1410569343450416,1.408272935805764,0.699272357530228,0.7015445163728582,0.8197691974724415,1.3936826747768676,1.2317475317080817,0.6266167466475379,0.7343563997225278,0.005547270225670594,0.7875630656172443,0.6121241655311115,1.41065945058652,1.2858890545703385,1.2020835642759138,0.3125540220607733,0.9832457188552611,0.6232045079823714,1.008645321755453,1.3088631893835068,1.1646243904933622,0.5856536482994603,0.8408187078041378,0.4930847342221942,0.7971679996634548,0.486579212099328,0.7477016787167636,0.20988759257486397,1.0249928804092208,0.5051053802596449,0.5740771577036651,0.8267437165859423,0.770237463129502,1.2455802905450872,0.736137060815635,0.11126916773859817,0.4667157106828989,1.1157105666111173,0.0018504863244250753,0.6336891645531681,0.9256205855710964,0.12811993956361534,0.4291974235537667,0.6918847509599094,1.2486420768637134,0.04039724680777783,0.524937628503503,0.06660234825980739,0.10572067847674924,1.296007281581178,1.2917408130273311,1.4012944528537266,1.0246083228293035,0.41384250645953946,0.12592243407977896,0.5743862077912558,0.9753679044134081,0.6029014553552887,1.1524531996517948,0.012754809084565902,0.7430278075379657,0.10942595985584222,0.16740118669714843,0.8989158750060833,0.9893349137002592,0.12828718810822456,1.2464620332350473,0.31584890378965536,0.2039077625243275,0.5214135082290722,1.5389981834383586,0.2247297023189466,1.155791760927082,0.17956948455051625,0.9342281103916629,0.9364264451066723,0.7482448911130525,0.06785482965310935,0.8122633393210897,1.412147916672731,0.8983052813573822,0.8073843215074109,1.1005723609844273,0.7248605193052504,1.4274851520936496,0.904003961281745,1.1784263328863662,0.7558628214866528,0.5110996777165071,1.1582758878670598,1.2808931723538282,0.11990585835419708,1.2397637366263634,0.3712154293266964,0.7061899806108578,0.30975690511763876,0.6512971308136286,0.8406513114203272,1.4927031661472465,1.3910887908480103,1.2096131401770174,1.2678774567913558,0.7615163130553737,0.6499640490932171,0.6035254357177334,1.4108495327354562,0.3808096671213655,0.45320835885120103,0.7811018427892212,0.06499024925901643,0.22477716235485737,1.334255155941135,0.4095722254648696,0.42937553651734395,0.031938147024342854,0.8350152843729336,0.7770893376176145,0.7805659122798252,0.9097500317632784,0.6931223303722255,0.019568463170744982,1.4089219783585654,1.4034842114557748,1.0635271848307013,0.4911782118260638,0.8540770424506826,0.8760362802170655,0.6270804650125359,0.3119883243380523,0.7960118400953092,1.4662361835193958,0.5706413692322159,0.29140839493760584,0.0971177442622983,0.6946779013422437,0.3857420265780755,0.6007801269940575,0.08767589516700189,0.6316949950645407,0.7511251462435311,1.4388220392352322,0.12664689933814252,0.9916941290286327,0.17162809689982314,0.928733161566786,0.8781587373840933,1.3027618371698948,1.3029077414257657,1.2122747918069736,1.3694319128563022,0.44901077281806495,0.6665069661934636,1.415326217738578,0.7389965668026832,0.5690989356646461,1.5180315067803898,0.6830444879572224,0.17412119241540241,0.10626640480482828,0.4262432407208794,0.4032491770009432,1.5047190478417387,0.9167474317844273,0.031076627993607983,1.4083477954848524,0.11854368812068658,0.9872445332781862,1.0631158496578066,0.9389747262192772,1.4786912879482534,0.4549195000902336,1.0321100066566216,0.4016561288271126,0.5405961392446824,0.9346948133652754,1.0881151362359638,0.16032400962104393,0.7897282830175351,0.7362032870528022,0.7500580173580332,0.3102641043219362,1.3251128792263542,0.5783886661292189,0.30271559653074465,0.9243088073238837,1.112144858210699,0.2101527256825153,1.2896865759366662,1.419060302321719,0.3430672928394256,0.7073300307690594,0.797731363385713,1.5253760406439199,1.336790616573861,0.742197762408648,0.3820415680650262,0.7357609482149987,0.8166990708251474,0.801267848985796,1.0051142313421104,0.8876922816891034,0.5166711614126096,0.44955748757705555,0.31147424384481864,0.2607010310240908,0.6662014264452448,0.49826155753025014,1.3481310650319027,0.9580708110560002,0.3683846412082806,0.9539168106626846,0.013790837468199627,0.13358217855872906,0.36204541621308167,0.7956513822110531,1.3194839076979332,1.0478398870589907,0.5722457517655604,0.7966267690762685,0.2812057447478935,0.5328961509458059,1.4652718111215224,1.2671845636039878,0.6145227213204062,0.33985165156968017,0.9228086727820146,0.4486987341392495,0.1416759757604174,0.1590449561669017,0.748581234042354,0.6203519004812423,0.7686871670834574,0.2348197847789717,0.6064507423863501,0.8580201791383469,1.4651326327469139,0.8100393170688683,0.4443220152588693,0.3664733209145787,1.179418424345126,0.5748182470745,1.0214270286952984,1.2381411295248463,0.2858761651854316,0.5669346355978443,0.8193293177079483,0.10420179257311697,0.5913159805828729,0.5689302470099175,0.6980769026084522,1.2869995968929393,1.0703237315689291,0.26132947316638344,0.43711048730930047,0.7362702274547213,0.9774510812997903,0.6498712520166692,0.40058054297700674,0.4147286177847871,1.3371584161693075,1.1933938498249752,0.5518125132942495,0.8977555540136599,0.7818854251890289,0.8221433881594368,0.40031625034026974,0.6769177570370767,0.5719538725220843,1.1258559130805739,0.4842605273811161,1.0032940315389776,0.9784585264340916,0.9129906705083469,0.9719263565392675,1.3802703308071347,0.8553479409355798,0.1911199440306979,0.17694136722331877,1.2045254046792813,0.7041078454797318,0.9471446059072763,1.51367306318213,0.43132344697809494,1.3257320623168511,0.2735376639739533,1.1988905874423543,0.4956377167127444,0.0685286462609302,0.71923305713382,0.08159822000144572,0.20453457593289495,0.572772891873659,0.36096230923092165,0.13153126803081977,0.6206052122494579,0.5460141169912729,1.3079255610763916,0.5314591771991458,1.1462930620742509,1.3551758159763934,1.5431005354969254,0.8561813884625078,1.404466972660892,0.574247526346293,0.4696958382668122,1.565573276195296,0.8297519938990072,0.40953422273585616,0.2646859193706077,0.9701105329612495,1.0568026831095352,0.7955183795879671,1.2578687563889073,0.7239330123376251,0.2660443567506957,0.2837823031279504,1.5104407850762893,0.9307743143356075,0.773264023217007,0.40152637388044726,0.42705800683869305,0.5862117448357217,0.4599454467970887,0.6814711187239221,1.3148722919806668,0.6492871375924505,0.026582161663267923,0.17379929493708485,0.2891909549552214,1.4029773024229852,0.2930117638356937,1.4231664962194306,1.570769391137472,1.5656683518649803,0.4931416622692773,0.7346993014838328,0.9068620720575926,1.161694898450897,0.7566814826316127,1.0288133033465476,1.4034719469272607,1.511358966701587,0.9377376703674278,0.47627745063318233,0.16110902640183214,0.7017734629381064,0.7533699908956875,0.7210874355371244,0.7614079687462185,1.1101792209422436,1.5600895776952968,0.12296481636309177,0.8471146681722548,0.3783442679837179,0.31060353949557884,0.8913139867943993,0.5713242910713728,0.8237454577251591,1.4108312142053894,0.8584880774494553,0.7526477417931482,0.23280126068635457,0.7656903281398688,1.3502111789010216,1.425879337654453,0.4814234878354994,0.8059098559819972,0.6073777283702716,0.2691277356841086,0.7295519734095244,1.2742191653199366,0.7956892292350559,0.22056574187919176,0.8686600853190518,0.716721600905461,1.1481165371994477,0.8777340224977358,0.40561916929332625,0.600400182152814,0.5445420322904159,0.889131090648529,0.8670774716628518,1.3785430626609998,1.2053992376783074,1.5645139434551065,1.49754473593376,0.52184350423629,1.4848867634156944,0.9055747186589533,0.7391808403025389,0.4647085115023681,0.8386686414196387,0.7852557359738099,0.810166900471508,0.7674818396316773,1.3115789077235687,1.0878804659543635,0.4353245607648561,1.2752222255447743,1.222084501547949,0.6365735713381744,0.02381884662362101,0.6823176209911358,0.6721498150894722,1.0320524498518353,1.1140448801148084,0.015112891975044835,1.4420200893904453,1.53419069243547,1.195399070194333,1.0831982318199562,0.5642551163493059,0.3698290149779623,0.6530940602350305,0.6579442958438502,0.5531010087322386,1.3658077972419578,0.7064391730881195,1.1094839010185056,1.4535229998296082,0.15681431120717185,0.6375777695323239,1.1924599090240857,0.9351257302251836,1.1209769196413666,0.43971818666334206,1.553835846327894,0.7726052351873083,0.2658993342476471,0.8408196107277451,0.6120158137610243,0.6451344985942234,0.12059005523338352,1.0480070226010887,1.4017539138257313,0.0015932895318180897,0.49515836527326595,1.2957971666996153,1.5362648239642391,1.0224009333464257,0.3777640045729839,0.04320290599892365,0.41849516822607047,0.1607696033141238,1.2898892398988808,0.5481281054615791,0.857396316537279,0.1530608523219758,0.3174937506819829,0.9036237300273964,0.17529960388028665,1.1654662631057646,0.9796510585258551,1.4891461718712662,0.7593533799329176,1.072032783436208,0.24069128447985746,0.14214636541197367,0.7987537933755063,1.3029441056429654,0.20264150901097353,0.7216809655556145,1.2073401991058013,0.09804063772754083,1.2610051914675748,1.186183238963265,0.9742778046114356,0.25626559745702093,1.2890324157574806,0.9715155241800933,0.3882570106339876,1.3260019119689626,0.5789969303930947,0.6350967296883283,0.03620054391450584,1.1268944035514314,0.5754506794639109,0.37763714127065456,0.5902375922210387,0.5232420291214878,0.14503863467412098,1.0032324505515282,1.120006054218004,0.026412534699102267,0.12312960615304787,0.25924907904361677,0.30619191455858125,0.7746902323406832,0.279592312002544,0.18739138988824125,1.0155290460019029,0.29409998181376107,0.04212226418498691,0.6129162550951128,0.8298213067220946,1.5186752501671799,1.47548251881809,0.7571431658926553,0.2522882348039916,1.1564389380865956,0.19948309267801578,0.016092677907846624,0.9250517813565422,0.8402375545138894,1.1196466814392059,0.3021275381637663,0.8133572487740331,0.8702028721288612,0.6432197596086611,1.3352819888393086,1.0514920339333083,0.5947785495317559,0.7420719572680443,0.8160923384052909,0.8727762052808592,0.33791319160950456,1.382512684406684,0.705066649115818,0.6515423121037327,1.2717380640691007,1.0410283290909055,0.13732788052985934,1.346351510462155,0.500092820484276,1.523439954493859,0.5877422248430302,0.8645495692694429,1.399622920119519,1.0403963783397792,1.1758379521476587,0.9193362611800362,1.2987249128035843,1.550023298404937,0.5639598006612374,0.18598456931651292,1.0800265354874388,1.3874958571738911,0.2136977797978206,0.47706875675146115,0.6016405348500655,1.0002811312203597,0.8837654211006707,0.4203466705563314,0.8498956902928791,1.5102954227520582,0.8120742767386582,0.5852661310767212,0.45721562900293783,0.9762791185557618,1.1406900398305755,0.6961282443184614,0.9375886395132089,1.074542537352465,1.3563123179749994,1.265595836156785,0.8785394877269647,0.672237166145117,0.8075670012062444,1.2563727007352934,0.39674727160134765,1.0237314676019378,1.4153036777220545,1.4759521009855636,1.1883628431407245,0.39765960317793625,0.5849430387906597,0.735253454001772,1.1044050921092639,0.8286344644589879,0.20260853236819207,1.0865093763874911,0.3045150404551233,0.7135463584518353,0.5864238657375928,0.7041934717875227,0.8755730486173513,0.5584593784116616,0.7369991355899806,0.7133608258448225,0.16726808864733878,0.4928777131410485,0.18579473368372226,0.1981427847913702,0.04341594424009181,1.0270570745754324,0.11615612248422202,0.6794597645938864,0.9364314629788006,0.615111291400846,1.0663114144907415,0.4930769286775167,0.517359203334114,0.47842384824547574,0.17977826076019882,1.2601926610948444,1.1617118941785007,0.799730063701791,0.3542263268627379,0.572315125336349,0.6658435048346805,1.0303567986281887,0.6922436902425684,1.0530360723504586,0.2345681857464642,0.3590122848388151,1.1304448646713658,0.8791450574522512,0.15908902848451223,0.9616164621975881,0.06812422066520986,0.9828831556443303,0.642061807479901,0.784203331215553,1.0412471509074648,0.6210852570244122,0.7943940373903696,1.1517564748885585,0.47250305913725094,0.7970493690953685,1.510032730332047,0.36044400541254057,1.1350020313967257,0.10889846511038681,0.7838337282642174,0.304143281745187,1.0861948968379633,0.743864675665121,0.008627162516596005,1.2796656102506003,0.23388498558391868,1.1692754210132394,1.38504521078596,1.2241917285034791,1.2510925518105507,1.349021940202746,1.1302477056879798,0.718001337674097,0.5173910539157323,0.831367092590103,0.7559484720161552,0.6070817341336016,1.5597863190796655,1.279698569478599,0.652731455515096,1.2366600674086476,0.7045175655637876,1.4688864774142625,1.004569899808954,0.3028472778421562,0.7463215850909455,0.5729864627214472,1.5664793619137258,0.17723935117269046,0.7679490533079131,0.7753866846702866,1.4566658721439891,0.9880042315860795,0.6079785633781889,0.7677226642771502,0.8839720130253209,0.13397807432352501,0.09620256221971667,0.5531244362188272,1.067424355640678,0.8142785204641516,1.2766603290595189,0.375830252614022,0.5771060926583779,0.6170720695070034,1.0661483696136609,0.7713054923932698,1.092364964241202,0.13319076964927198,0.5413494938308625,0.9053332237723828,0.6590744802819587,1.4370714634775716,1.3241493923520178,1.3147040157697876,1.1462165368852082,0.5126270984778898,0.9919159333870922,0.2872595796540713,1.1497691533713856,0.5557085266528118,0.12275485263226102,1.4955884634644026,1.297136126899629,0.26583519398488337,0.5674646057771608,0.18044453129739685,0.9252189099678796,1.2849916751455774,1.505611729216119,0.16471785903225455,0.08863401168753854,0.8910549867579017,0.8586820249584473,0.8308011846356638,0.6570815819383105,0.9581664472389345,1.3396278158900907,0.5393414311085616,1.1524744286993844,0.6959437536179743,0.35824376299208344,0.39768894166433705,1.270102358365306,1.1560400626625424,0.6642811664039674,1.2705532662628043,0.989307021622649,1.526827853482486,0.6647215991748741,1.0665511494360178,1.2512482987546527,0.3390122092257909,0.5663954348806552,0.00011188094040253902,1.3788043864162165,1.119996434975498,0.4635739950344819,0.5128516991933876,0.8748611448613014,0.8630409715142251,0.6804952772130597,0.817848280949985,1.0404423072745406,1.259124256516675,0.6596648572663019,0.39931610970776016,0.9841372963221795,0.042363722173698465,0.030552725498939955,1.0323887265564835,1.0283785357398423,0.9468880420639889,1.2516256512442137,1.2072796195796105,1.1177198483726496,1.3511478964056967,0.2459472490264759,0.3901228696222398,0.877354101588568,0.4345574999118192,0.5330076257245151,0.7478975602277397,1.2839558166506717,0.8712336163545532,0.7471557837518529,0.6957094388094426,0.7986784052695137,1.0376495232967848,0.29347565334594017,0.8390679820896797,0.8232349913420536,1.0214906474097498,1.0509815922851113,0.4675820830527791,0.9631991739634496,0.7642631786654405,0.19116635257008824,0.7760871016875098,0.881629305525468,0.0396372283555038,0.33127629408317505,0.3073437807366011,0.9621338098488474,0.265980639688701,0.9387596871916145,1.3366708819643132,0.600345420879448,0.7710697753018131,0.705794317028558,0.40415310306318014,0.06833419400162558,1.5350052035812078,1.045458726295949,1.2189314399188853,0.009004662502353392,0.44502916102966006,0.2623934634939383,0.5607348464385252,1.4764397827368478,1.002281700434482,0.588329172054799,0.9595351206438227,0.4137743826180361,1.5451407857987194,0.5626059354061143,1.359546986397612,0.18796979609812378,0.04362280313807337,0.14571895326881945,1.4351714719347863,0.04617485538840365,0.103476632164146,1.25580635136321,0.5291215800235864,0.894548967501272,0.9922999114619646,1.082225618505343,1.2721071887310544,1.1619224170383053,0.875975215344146,0.8486584133903656,0.5461708444116529,1.2085976030713135,1.121251313952971,1.2918520474156656,0.16079680869487026,0.5003456469838713,0.940830732822453,0.7318955097229772,0.8176093533606823,0.8160016503373257,1.3264644166980575,1.3373821717396916,1.1415186864121096,0.7127393471487101,1.1110764001785987,0.4325201534856649,0.599625977898621,0.7612347003725108,1.0006982472340584,0.8984068531505478,0.5462995220475437,1.1028989848958064,1.150612619938989,0.8564025472606036,0.11713494878927576,0.9071282246820322,1.3486717472918333,0.08834807077369561,0.21861245222844686,0.8894445209725529,0.34840576940841617,0.059024927923296396,0.034480340165464314,0.35992777801211207,1.2312293904778175,1.0028653350430186,0.750355938804655,0.8817122471656943,0.6572819048175358,1.4932113183559297,0.3352173946363042,0.7693776846325704,0.4589252532673028,0.779331016138292,0.9975059763916367,0.19607190484795722,0.11052168717130487,0.85680233049559,1.5457049752554295,0.7240558743592519,0.5166244318859512,0.5788531256733939,1.0239609579342404,1.5217059103934585,0.45251112596870424,0.7849818237796871,1.3426199415499807,0.35987784098753073,1.1580879627696312,0.5633322350828794,1.0003874316104757,1.262411859393263,0.937960045511915,0.7672798348786637,0.2818899765670564,1.4954211215310547,0.2612165803979154,1.4419197011186373,0.902198958058183,1.5420829721289646,0.7868118074771111,0.06707687887212165,0.42870771894914683,0.12805516343574885,0.6925120957352378,1.1238774444337127,1.5242136291389294,0.5249144637119083,0.7550265002118998,1.252941386180861,0.6603991642474631,0.7834954325950535,0.6076700143608335,0.2693976393404706,0.8334415267922438,0.73374447678853,0.42339203925721314,1.4970285913071406,1.4543504987542293,0.9357317936047649,0.2598078560783225,0.795963957620537,0.09979364507275987,0.07585763336951386,1.240800012806014,1.4352316124666529,1.114862222181539,0.21870819665591318,0.7673659136276189,1.2157462474821286,0.378835243553325,0.43120706326382724,0.11246470428761916,0.9964450905453682,1.1583197484782146,0.8040968314598657,1.4380967748197397,1.104844945886221,0.7365892421500129,0.2921344555005395,0.7042650747012611,0.6577236075722717,0.04968847672545004,1.3910745985831217,1.06695892482601,1.4174077562535736,0.8718599161010688,0.5598006975680163,0.93711512808917,0.10935070812790303,0.2379165052381361,0.6553461297051528,0.7478741237936236,0.85060169592866,0.4827358205813556,1.3076630129080051,0.4050957309239577,0.5412188544045541,0.7912065203495277,0.5693727787021234,0.7191080287859721,0.5658333994885574,0.8479257621126012,0.576567527624097,0.48453370849848393,1.3644667258556467,0.3707309163159272,0.7965891852010596,0.26468417909461284,0.6175821502126269,0.5393934871122712,0.5878834066292965,1.169203032424153,0.4066952798560285,0.8746271567615077,0.008514512008173873,0.9126798898798045,0.7266051490328822,1.0690173261881502,0.9011604216163613,0.9682786160508832,0.606677485167009,0.609920365736285,0.12514290007980994,0.3267465799388402,1.1556123701235674,0.5696774187677571,1.4982177473908405,0.3644609330434368,0.20400538797265577,1.2054834989949403,0.8106148002489953,0.7173168514478058,0.2802072675732021,1.1433178836336004,0.6890446658157588,1.0114913334391518,0.011450023542397518,0.5478663065320779,0.2880188177549275,1.2179011259784347,0.20203564770050905,1.3665747425141033,0.8355500257470995,1.000849653093499,0.9964228271002316,0.6890329209242309,0.1402379523190973,0.017636571455128584,1.333137544995089,1.1470495193391765,0.4259266264106577,0.0629756905625892,0.809033221619152,0.7530781413721543,0.5884908349059405,1.1849204013910313,0.6639492046165476,0.4652131518399025,0.027098443758865887,0.1399247483720394,0.41192416699934364,0.7639454006490212,1.1178922319558757,0.8617812829830602,1.4745314936808724,0.2690872634648502,0.20591891813647217,0.63082252117471,0.6950113939825162,0.040116180545374296,0.3073288377455983,0.31791408377562413,0.7101746178773582,1.2173423216876387,0.44703403505771405,1.4499667312173696,0.8065065255872503,0.6968390399444497,0.691496585885142,0.9511198195994983,0.04102939895741674,0.18393339429738378,0.7440118848630249,0.7825522893954668,0.6310109463155515,0.8257887668215816,0.7320945630373114,1.4882088801711504,1.3689243738075172,1.1637118707099272,0.8775504391517854,1.5176613324998693,0.9079440038186362,0.6490213903039335,0.1691890702075931,1.4967590157180901,0.35864568493351645,1.0336174999021395,0.6548915285818793,1.0059736520250842,0.833407308937755,1.4090484221280946,0.6787286480158562,0.18677029478367674,0.7514610903057654,1.5391510792207546,0.5875546318371229,0.8998338682361221,1.3233355158009448,0.2843822180320301,0.11480374087310675,0.8183783899123009,0.7082363127564458,1.0534506755240285,0.4251425139359059,1.3782937327453302,1.2247704733700289,0.8577927163457197,0.005347150814871943,0.46920626154087297,1.493916080868578,0.7823043706845266,0.799927732878529,0.33792045362777745,0.7495842608176031,0.43196139503679254,0.5050126561539904,1.0714817816597035,1.1269454575043536,0.9716228467790917,0.7553085696671312,1.1170904159312536,1.2105216319804861,0.7806154102263526,0.5034438886627907,0.8019758619568584,0.8981854713138299,0.08373097171763252,0.9374723818753243,1.3314763337952669,0.42886899081746305,1.2794339290687122,1.4046282265153198,0.4391075352325117,1.383794055510552,0.05143162188073111,0.4462491725709844,1.4918697484543342,0.3569817239882379,1.4380090309487081,0.3815433286772855,0.8494351599200372,0.32209941237129586,0.5503222422422732,1.47488712125409,0.38370146606022343,1.1820910424587365,1.1586515256441712,0.6785950419921805,1.4046319627580586,0.41508486535479383,1.0598732509014654,1.2660788467850295,0.15724743225598067,0.21349464943894955,0.3187777243896101,1.178958813637619,0.47526100380063496,1.1388538923903622,0.7813584857554479,1.3038401619145594,1.27030911817401,1.534399002383243,0.569691846385098,0.9171252406421785,0.559255545460774,0.16965298706247228,0.20416945559711044,0.053005443959512434,0.033392415624880524,0.7740251117356955,0.9041923461728721,0.6511376403530351,0.28982458133159306,1.0693886989873789,1.1472593743876731,0.06924343490174839,1.3349300170823495,0.20558541916797177,0.986733485191633,0.40868069604854024,0.8217906179966309,1.5661172141544328,0.006707468028569904,0.8153324246287762,0.9035396671199077,1.2098010964710575,1.3244951347104645,1.1482090873587023,0.39839079222265644,1.3918889829347172,0.5272261379206974,1.4064505887274914,1.242804773557658,0.24787404033273783,0.8066191930713659,0.10089128809048611,0.4748502572003343,0.026662328104479743,0.2679863110093185,0.871638590510641,0.6710938110215888,0.8884976442821662,1.1396505053239576,0.4256485518768643,0.5673265097763263,1.2827777461253687,0.13282042456926038,0.9996278284279884,0.36861015312718126,0.7406090215031339,0.7239573301309572,0.2993281134027761,0.8495985169441791,1.1177003418451068,0.6605082838168048,0.8525814520849817,1.4192396270831644,0.07359886281912774,0.5127645139069507,1.3683965378311314,1.0900712556941854,1.3017735593780122,0.5826646586353706,1.0341724747269636,0.6582724216352458,0.5111477578816854,0.9055011466586109,0.7565054745160866,0.6109464899969473,1.2435337902584678,1.4672579953991218,0.6739237547009971,0.9334156899779787,0.9016184870933145,0.8799858222213757,0.7904448945463948,1.0377723390852536,0.9907125155628026,0.007839446820236618,0.050304065214615425,0.9382968777722988,0.714675530238497,0.8066970169857799,0.39228151044281345,0.007288023324283837,0.6873277313179849,0.6748834076408164,0.9044365974039097,0.7272753959559551,0.6959674243391704,0.04093664474087107,0.7756504314548978,0.7294370129155187,0.46101704040899993,0.7594792372192125,1.404280889951504,1.4769356311539614,1.4647717232250848,0.5943056312218832,1.4707261762213224,0.8412322438409602,0.8513856391579462,0.7676059574071155,0.5867273985597873,0.736335226633494,1.4716729459242597,0.9062464165355807,0.7749744209677101,0.8067176993241661,0.8187281228581615,1.5539532405969907,1.2892613831006632,0.24397490242090475,1.0074106934691838,0.6328571236667202,1.3739403225508748,0.598866223323951,1.565458820661793,1.2033623212259932,0.015306380387053389,0.9410194751411491,0.08307943049041161,0.13169168633312997,0.9586152310761964,1.5047075379432415,1.3527044210965076,0.4441581327560002,0.480429716443667,0.5513050825826886,0.43272792429716517,0.05255431496898184,1.4887121828031578,0.5272831830289005,1.1142904248893535,1.2106165565944296,0.13213091155753232,0.23015600571096995,1.3922101342691398,1.295134461882773,0.4564304106863737,0.0013513826536593145,0.5920474516340728,1.1684168766307723,0.7184263813757086,0.7051956233704828,1.3743957689394959,0.25010201908136226,1.2991718600482463,0.6645185322403885,0.7430006295145064,0.020673184758411713,0.03617737717182732,1.133998858131203,0.39980214377298345,1.5460268916348543,1.0487430295010485,0.20305338096505798,1.4722660333343331,1.3881609124461232,0.682713277102649,1.1967296003171266,0.8011536716608151,0.5899409616777599,0.9275336923536021,0.914469240337035,0.08046348267067062,0.7623255635064149,0.15227754265722343,0.2754917651756752,0.8954108450762543,0.7918857221736152,1.3069087365468868,0.8178955324548294,0.028303285634048107,1.4255164176736528,0.8469078373841066,0.15047528374118901,0.10919632095281526,1.0675630310674105,0.08905204987173679,1.389967548161125,0.2874223116175213,0.3545863852244707,0.5576854397524589,1.4076013766855637,1.4351561372774158,1.3807155783003537,1.1525536497897064,0.051078389487885324,1.3325913185853178,0.787673420467618,1.3633984142700153,1.0843968324817213,0.8502001319521765,1.3924485374240465,0.5019419556211687,0.08236515227871526,1.297436030665265,0.8908114649924114,0.20106118034522594,0.7861365241593754,1.4975537328093818,0.09351224242056051,1.0316667901123884,0.4220416342655553,0.94662219783724,0.6903295579909581,0.2270945425736758,0.8479872507672399,1.4292396322883871,0.6679698699277934,0.8426842055360015,0.6123905388908124,0.23065051539030343,1.424415067499439,0.9071918273461936,1.007691558396793,0.34080027012169384,1.294355709452637,1.4930152840145237,0.3408981043381924,0.5952964356980047,1.4153797659442844,0.8138441370978436,0.19538603562762044,0.6602581090662216,1.2994027437662958,0.28236389451900096,1.28855390645117,1.0612415599597078,0.6132668316175632,0.4475944560435479,0.5828557377772124,0.9586728959281733,1.2884937432073196,1.0979662436946331,0.12084990490764316,0.9400057123089343,1.1176493961697431,0.947640947920006,0.6473318384883137,0.9779707483828877,1.486955023639044,0.15804503290598126,1.3051410895855626,0.9791004669428885,1.0268107199683396,0.38751103816909266,0.5183815931735123,0.9504242812817926,0.9032955587257889,0.0715557188000557,0.9139022096193943,0.7746608950026237,0.2793134944677781,1.3442099651667179,0.7910818402963492,0.25267859162346146,0.908352970285004,0.4521369531516347,0.12186154540003305,1.3358260549595797,0.7785427105872531,0.5321383209968344,0.38261689917588926,0.5277189289011439,0.8290112823344158,0.06939080800281715,0.6692755682033407,0.27463626435147187,0.6880281370191802,0.029983622388670875,0.5091509897300049,1.3182394521517997,0.5991658322130989,0.9877018930665333,0.49909356927658394,1.0819254314169013,1.4328986171908507,0.28651636965425736,0.10576418283815121,0.7482431820494926,0.6684508811899192,0.9888633209945092,0.9255924951691951,0.8664832467143495,1.0801027325344492,1.3128622469350477,1.5652806616033508,0.4155401826791434,0.8510532532407896,0.7032459669475435,1.393088821448856,0.5190219817899875,1.1569558752426088,0.23095220804375208,1.0562455855724566,0.21127328792167907,0.8905835144391786,0.3484350689193759,0.16162263767009383,1.5639674031731348,0.1413304407945065,1.1689315960374826,1.0698179700835189,0.7180875670687785,0.36092695581300616,0.7716884081440932,0.8384873643643739,0.9784840402420159,0.29145762640913525,0.45254338473183825,0.8523232670713303,0.8836648619176912,1.1408276767241852,0.9763043124414251,0.9895329593546227,0.874389543773946,0.4386462536906654,0.45800981722727707,0.5970224958933176,1.25327896845507,0.04821254859899496,1.4234597746323212,1.0739307229246264,0.8911733189708568,0.8460908478285938,1.468201092348899,0.8634769777679384,1.3885665093578212,0.26134936245737195,0.2838540247286243,1.2517117694706612,0.8238105721247635,0.3315318333738013,0.5678479968631311,1.4498801558027155,1.0630977025581727,0.8287811212757773,0.7395638553553475,1.0164690282157705,0.49844127462800575,0.9320824903178836,0.6149677420626323,0.8335705382009451,0.4624252930269547,1.1526426662069895,1.166648159640845,0.7738029357749632,0.5370335546641792,0.71081739601269,0.9907726360152934,1.0479703531020412,1.3576685491584406,0.16472908242364137,0.7871972100470506,0.8390961711862647,1.404493836506924,1.3556352429171112,1.3201647389784177,0.49826771287469673,0.0860755036564162,1.1921860306644834,1.475005407396867,1.3259723312327265,0.746587019168955,0.9563041602075385,0.5503022720820572,1.1593555055907385,1.170647032910823,0.73428684714949,0.481322294633238,0.5937880770884141,1.0950412760238766,1.3610125563291582,0.7222164016241661,1.2595478122638828,0.3011832260059696,0.42826022667839936,0.393084137375208,0.21518910127276422,1.201967351352048,0.608246848723891,0.2095629639825142,1.0294559822946228,0.8346567443740567,1.0260172731802017,0.5187524567149978,1.4133754368301985,0.9688684533640058,1.4749171415669091,0.6058199906775102,0.5115416268285883,0.10361575810529525,0.12920904956855053,1.4285204483772374,1.4289071172415133,0.7786372283764986,0.7025654109069835,0.27754445558353125,0.8935267967913565,1.308922778871366,0.21489077361666595,0.18401613726621607,1.485563793534662,0.5113706036871287,0.6611912270957414,0.7530792811916994,0.554968349925619,1.3953599683770452,0.8209742386208267,0.8376803434299789,1.093768236031854,0.7371137105251816,1.035897909672967,1.5360203876595204,0.11159639284783775,0.571342009999519,0.6889978844727621,1.4301894554309564,1.2438790410645488,0.8766203897573643,0.5668754223463714,0.6711407697161873,1.4401305307339223,0.8076684178745821,1.4213987053823665,0.6411727331836228,0.8334074812263941,1.1784906004488225,1.3935758869864747,0.13716305519734048,1.2501482234817378,0.17962494169535723,0.2878405565718088,0.3301656584067853,1.4068635976300383,0.5503712295195111,1.302986488830801,0.8214040190556646,0.7757828413285583,1.1234552304135885,0.811387775462572,1.3103857090107107,1.1733618092059201,0.4521478017776745,0.48380231184805034,0.9299698411987531,0.2804721888904949,1.0947223908041348,0.28668155111569515,0.8638175150991785,0.3610734944149545,0.8881530803353095,0.6194274100632977,0.4652333090661081,1.2893709493659251,0.7350151458133312,0.9449520465304626,0.30370304750266586,0.9662078255768703,1.29513355004619,0.9142292179634783,1.566619720409645,1.4384069658584746,0.1355458478724066,1.0792011771033962,0.16109737075444525,0.44646558107057327,0.6147665523304278,0.6437816296332621,0.9510961842226389,0.8294247449406909,0.42668591460922844,1.2575182318918108,0.393408379290709,0.4382532740373956,0.19390615635867398,0.4588581156997068,0.18012408433674498,0.6782580917661316,0.44469391753227694,0.7210882566258499,0.5652590540025413,0.5389826385951209,0.7143969321935704,1.105367184256946,0.3408756427207493,0.7815063293044424,0.10683622516964504,1.1754632912986578,1.4869710402322311,1.455596429437028,0.5557521315194383,1.4979687748097743,0.47328255675213254,0.4031771448911624,0.7192960227693076,1.0176287902112613,0.04894070607298422,1.3048339679582888,0.9492844648559715,0.24252213987693566,0.1785024209264193,0.22474167318195196,0.7926896006598525,0.2764389521304408,1.363960794020966,0.13060276194635892,0.6494362278239709,0.1941553581572443,0.9622703784188132,1.0286817777483583,1.179807909635542,0.1428716737856943,0.3923486034588048,1.3946748870049859,0.36474389811948826,1.5531639589557622,0.7099267051580682,0.3245498435526295,1.4682381381569687,1.1097559889459003,0.8060223151967371,0.7960794054571252,0.6405857042777208,0.03920029324238278,1.0209749082909625,0.8306630118661967,0.3262713832470471,0.028736771921972385,1.144132552675925,0.6266719298017718,0.6929053769604487,0.007369948997007277,0.6657698177090268,0.7700778241531628,0.7258831131562823,1.3930569465821572,0.3589279194626041,0.6069670542703162,1.2138313130941292,1.4107570993897358,0.16305818073592782,1.273713580587738,0.3580103661813534,1.238532597073236,0.020562910041682363,0.8124436908768295,0.9628280659051686,0.9468956562255132,0.05945188497751514,1.3532052718688974,0.3148132304573091,0.35486404666280397,1.2681687741975738,1.5069545791159353,0.8711977099094003,0.9002430249281571,1.1349078990050305,0.13910879122624514,0.8609347741317305,0.9564314209378978,1.3737775069164266,0.2624533947210223,0.4061139626079934,0.19332876932016096,0.24421389462760398,1.5349664710505553,0.5816770098555248,0.9521716868010345,0.13105139416462497,1.4918648158756573,0.8574923380158025,0.7796454558175613,1.2213633032058488,0.11918842058521197,0.9997985573932067,0.46220257213178273,0.5860384071720155,0.9690977312460554,0.4709594227429228,0.10729565166848992,0.3194280185783985,0.6454802955312571,0.9214342704466102,0.5786935121098432,0.8282378002943283,1.1057165383832002,1.5392803811843172,1.3950872771923282,0.9349854355691192,0.6091443600313692,0.7595729302710529,1.236236117264385,0.5724418322254925,0.8277921052675222,1.2217363679991045,0.27570692152728593,0.6691514381129245,0.9826833487928981,0.6419391697055423,0.864534246513532,0.3906289904214016,0.43509512677949336,0.0014516338648059,1.1353147428581192,0.062446870843801204,1.1207785038416787,0.9008151163740603,0.9172629411620872,1.424508549740316,1.4902207607027975,1.3001436819995504,0.40774905247402204,0.3199471592573159,1.2152219598183858,0.44791162502766096,0.72415283940694,0.8406203207287646,1.3533036496541189,1.338703049592152,0.04948173748973648,1.3614828800098373,0.1257288565269573,1.1149590845118968,0.5887567558886971,1.5432833652083966,0.9476522954900525,0.7872676078041858,0.3272385132156629,0.8745105609167959,0.4895423450271261,1.013468657209319,0.7430042643593948,0.5290377597041429,0.7776760126983188,0.7879560638434568,0.4573385668557724,0.07044837261485418,1.3205372529348676,0.19633452463058554,1.4513031629050852,1.0630349314755827,0.6394706502885209,0.4187593325734232,1.1163480406937736,1.5023161443132145,1.2743979695777539,0.11362496417367117,1.2744052921112672,0.4442068457680915,0.9060336454774007,1.3542422180137388,0.7084680165048673,0.8804201464460517,0.10647279593109635,0.2766788269531676,0.7496328987515896,0.5689529640595492,0.3336121148519702,0.9961447447229289,0.7023375104123092,0.7188591295805038,0.7755085061131319,0.5505149260189376,1.0199602828244883,1.3548722228802086,0.519024927464542,0.48777308443549305,0.5679150665650933,0.47638187232454976,0.6650068954496177,0.22505235429579656,0.6437389415410082,0.9174227796695109,1.2045806119081273,0.3374700029375093,0.03348489723450271,0.7561584695303506,0.7486376378722635,0.7782458512519828,0.5907337155348378,0.9205474200396648,0.8156886551153363,0.9108216645062708,0.7795829494098236,1.3078390961426467,1.2243431115398502,0.619482387517104,0.4104292808306543,0.47998689056391586,0.013377599462140923,1.1534782042389666,0.8766143603000527,0.7278742266851982,0.7989553127636061,0.7580740700724772,0.2701454507228623,0.8543126504467102,0.5782898854718325,0.012357346481789735,0.36466854227536843,0.33256841814725774,1.0217588032941995,1.0127796577647203,1.0451334000815362,0.8849327442829766,1.1366743595377045,1.5678810344609062,0.10336848405896638,0.5152640470332762,0.1829800258068646,1.522349267201825,0.880636171915551,0.7181233654611139,0.8373370643558734,1.2209624777623709,1.5458292854559244,0.17495205626386612,0.8544495446641235,0.8411313361090732,0.10053840367367431,0.7395215024783178,0.6146049754115908,1.2119226583555283,1.0302650071553998,1.4375688260733777,0.19040088387510853,0.9061332309861945,0.6402276824546219,0.821222972620139,0.8989875115628525,1.1603787115848712,0.45239590558137177,0.785573240590312,1.3975167654755074,0.09317675868529454,0.7518470804999541,0.4212548164742832,1.1758353348790997,1.3647021847519942,0.3516787942085689,0.5523882497866784,0.9765749866943039,0.3009767815385119,1.5016558638703943,0.7807774427881352,0.48077022907995787,0.05948682897566201,0.9743704794693956,0.7869142351238066,0.9183126751517556,0.8880832150064796,0.8775491846434343,1.2943184899629459,0.8249662338119619,0.24301096614924106,0.5682289016898713,0.649960398603113,0.5377180302362518,1.1893447060893505,0.7886474374885278,0.5518381538382484,1.0095596914450797,0.5284925352445212,0.502357464096596,0.13353706058572917,0.8552300953646528,1.2510284088116546,0.49266690032251076,0.3089456774403694,0.0644566548823848,1.4282975661335218,1.410879343870751,1.0606287847678626,1.3256470807130438,0.9708772177184406,0.9967046935871737,0.24992102564694288,0.7114819506154106,0.8516661197399598,1.1390911562733754,1.0676791427131,1.332894531801504,0.3379549174935507,1.1966780324987567,0.6982423352778897,0.6737991092764832,0.7399121462461509,0.5398739514370351,0.44415931775171186,0.8183904722733694,0.8093891228944318,1.3916498658755982,1.5325159111177509,0.38339129475229927,1.047213594849284,1.2044912355958777,1.0282425310637187,0.17886300265267696,1.1793722018064183,1.0961198086435346,1.4416635528065775,0.6444995723701734,1.0277275033111324,1.410562184029722,0.38576852853765164,0.6174705147330984,0.8776444809692422,0.4019290343379216,1.4590146927610854,0.743248330559225,0.7612600378152338,1.4326241593778977,0.9230711132031884,1.3260172368635623,0.8844073131923154,1.1112241920856338,0.18670149223827792,0.9267274618927077,1.2086478009369734,0.031241000086868226,1.2824060516650608,0.482440795657318,0.8547853016173154,0.597638135065887,0.2999695345282408,0.48743064600386465,0.7687208589858144,0.7631349565763734,0.8303109093988716,0.5362110612986783,1.5360766576165488,1.3158557953400851,0.8308675466669507,0.01537902590515391,1.3761970534897674,0.6652873729490655,0.8518129930501056,1.4287674120229499,0.8591034730525478,0.4414854097337486,0.6253215036234778,0.8286393147648115,0.3376875082440996,0.022672317565051864,0.7657671968367266,1.0210705846932018,0.486994277257758,1.3370322141102862,1.265523596895285,0.996018258033889,0.21106166304053253,0.9222286988825498,0.5703307204314341,0.3830719398929311,0.639022152570842,0.19053644210866263,1.4845888047251474,1.4258907272923278,0.642583572242485,0.3495972645684292,0.12484733618631394,0.7761111885029242,0.871801816822526,1.458503727770182,1.1094091572069271,0.8234437887303026,0.8424625728822889,0.7576602159821418,0.8395409046493284,1.0754421102680125,1.1231649810470008,0.1105431332448291,0.16908210848004437,1.2655219033511877,1.0023168136864884,1.2645821233585792,1.4382625651688583,0.022084356441933687,0.6741497191748598,0.7879565643134794,0.46854727953527514,0.6287833494417533,0.11356615896584711,1.125995895478313,0.9442408143786998,0.8299456873921214,0.3999510713154329,0.4616604343557035,0.2567668710434325,0.5221778313714251,0.24898349812518727,0.9829531968975561,0.5077312692692981,0.7844668624114675,0.36035678841526103,0.7736214647234964,1.2105507206624058,0.23857245098366187,1.1164996944844703,1.062684561760514,0.42964757657447855,0.7662263823661624,0.4995375370792963,1.1301227853005378,0.06641179858297538,0.37313983961535724,1.1560673134941182,0.6149245163160266,0.4864861755206739,0.6481481208574016,0.9763922818790743,0.7353355319644128,0.6574344305746224,1.0286918477777642,1.5486786033179754,0.4191487781538608,1.533903613718414,0.5892275386618884,0.8104050545433769,1.565011444691463,1.4105634046272706,1.3553402530375793,0.34684350138680214,0.2692575321054823,0.5145424014868796,1.0840387038753534,0.9103292288991818,0.5716063153185547,1.0937389542578788,0.6120576250758711,0.026556347626885368,0.17357293091612733,1.5117593887114757,0.7798858406463374,1.018966807152458,1.5360860035204211,0.9102778429233126,1.0531136007835777,0.14280412900857492,0.9996347554929818,0.8231388378826837,1.1212441294590176,1.3742798022143097,0.7773205476738819,0.43317251057203277,0.5731150271383384,1.566488002679293,0.9356296271533797,1.1469846924964802,0.2388150557764769,0.5357402641748209,1.0402686422643572,1.4742787466712552,0.2804948535629085,0.6796539353071714,0.8164137823054397,1.355813830769893,1.495804960325898,0.47137102159664573,0.9188448415988458,0.8791936925023119,0.24804735595041918,0.8704066661440714,0.10239790242986573,0.8837232190131602,1.5079649738047443,1.0888172784954417,1.3857834786709147,1.305482876225978,0.530253098588187,0.5649360321027771,0.6859383484081604,0.13407345313723953,1.221856581360597,1.0464690464412258,0.47686861381037216,0.36163545855666346,1.5575691115762074,0.6393870119153817,0.9599880292806373,0.4718575614007117,0.5054487779080397,1.5513730971882072,0.2815619004648723,0.4991305835703038,1.52594115782826,0.21866926341141263,1.2615049241148633,0.41597166165058674,0.7216903138745182,0.24812461130992627,1.3675011045198702,0.41276916270020003,0.18786372129225629,1.2350847249496768,0.977567927004213,0.3085617003667042,0.8949101703340882,0.2859792209063877,0.5118722911330891,1.462139679026553,1.1228585725763993,0.9379725665687598,0.9619869663656432,0.8306146136771767,0.8012499711796897,0.23481508474562607,0.08597402411261773,0.2300878540683694,0.6946237476171929,0.9034916058537319,1.095353699906278,1.1649193101458404,0.8694297864739925,0.5523902826067575,0.5316163201199896,0.5931193819070604,0.011670119109284767,0.7201666330506283,0.8308280794482243,0.9635246376977632,0.38422735466439395,1.3251870804521817,0.05852232614628024,0.2650406887190039,1.2810189054157533,1.3994882789543905,0.4233346872574477,1.024437198458038,1.1981087339950203,0.8262635486638602,1.2106991283501776,0.13187912472373767,1.0694966439258125,0.21315263716617916,0.8119059563410448,0.9789560924638263,0.5762685862443027,1.1639372408911752,0.8285178361183361,0.6237105847265468,0.10037080738089652,0.8453947701803928,0.2427772697129528,1.3896235219377142,0.36285301391019953,0.8001237974639858,1.3036717998869642,0.476721083097285,0.806462913253925,0.2674568352876499,1.0324152261484347,1.3436483258372731,0.7695674629681257,0.9507915192840486,1.0852654527076147,0.76294388630455,0.0549148389744962,0.24869486974238403,0.7546173893278276,0.34885051220069135,0.3973922675670818,0.3546411816520914,1.4373512057023357,1.3569331506175875,0.5795995714372346,0.6618818581433235,0.4351365899682861,1.21888989492174,1.538798473021017,0.619268579225249,0.41542491062171316,0.516447774312056,0.5338452613501773,0.10516456755735297,1.1792739486122943,0.4557055798775151,0.6189517060596406,0.8473824432142958,0.739027499203633,0.9074078728119322,0.3440112958852081,0.5081843726208948,0.8419153494895546,0.009527741396955836,0.15642511937825923,0.6752476235929731,0.5606833064145303,0.7610120672607291,1.0173465112988231,1.1276425351006252,0.22948118129688835,1.084404177097316,0.8540012460777099,0.34656992844675094,0.9310631609978164,0.9000047471578975,1.2222346954773364,1.3948129136135732,0.4171151637905097,0.6004311113562832,0.7358465908174927,0.605634936572744,0.1715176169871585,0.9630583134901513,0.6525232905331946,1.0636063499541688,0.7058698490817548,1.2842886329323013,0.18426766578490783,0.48053241507526295,0.2696453913811797,1.3424589028576397,0.08915349085847236,1.3722365641497665,1.0113172685979634,0.8339919130866837,0.24466163117056433,0.8327597729946868,1.4349001917126978,0.18083884166853462,0.6255328808457011,0.16763027365262267,0.8550949187005702,1.5198302893587736,0.7235983277173107,0.390152740311116,0.4885106325052791,1.4676540030632301,0.5079743787741806,1.5591904606500517,1.2822749465849737,1.476700802702,0.5686125150146691,0.25485579011797915,0.8794123366685455,0.3179898993036613,0.1846166496432497,1.062274244710621,0.5493631127791865,0.85007057915451,0.26575969337025707,1.0829531958772394,0.13618328991509232,0.20943522284517696,0.5936583394672281,1.4090659902883245,0.7854087634379131,0.5566196292598515,0.7784096269803035,0.9452872570200412,0.4984111858770427,0.22078744951791174,0.6254155373734959,1.4143290980944414,0.6143587562827615,0.04053827176662818,0.4920192547347165,1.4628774239761753,1.5419089056433792,0.149459089492987,0.843726961920547,0.5874810774832996,0.8121830996063594,0.8570541084516938,1.1728295711838042,0.18668018218625554,0.43606866354473534,1.3820815366302863,0.04446214246931206,1.0939405046673167,1.1705184015307646,1.0454213884743606,0.27508976781646877,0.4416211730909237,1.2600048641045352,0.7803907331412657,1.2964658305924004,0.18241785916204856,0.37416281752626684,1.1630876265591608,0.9602363303256728,1.5592148468463103,1.053987707368523,0.8168032929649972,0.7080366600723789,0.4533982540838407,0.8227824958705656,1.0621795271434964,1.2917876122956775,0.12448133056428101,1.568943968426122,0.7832798401916443,1.4257910910170877,0.914664537814403,0.7364273295543047,0.7156521556728359,1.0255970835996426,0.864410231593087,0.4513611548628153,0.6477813925544027,0.2682169704525301,1.0496815358726022,0.17502981162424186,0.31150881046798923,0.43692551440124905,0.9028364236212721,0.7042953082132801,0.20004791016929202,0.7892739363369141,0.7823629371915983,1.062035128449104,0.6473028552704903,0.9032738516260961,1.2222596913460158,0.584429131862991,1.2173633311949135,0.9673450424310994,0.6935270258472533,0.5941455546651887,0.8344259188405886,0.7950677184954037,0.8582911480020954,0.4398305760838472,0.7455474520593472,1.4688524652488644,0.8629772894198317,0.5003439195406695,0.10032106412001994,1.245477566649925,0.1899017397134027,0.14488284668134882,0.030672339850877858,1.4030178994556683,0.655629809596914,0.6504128600231791,0.28902623026302,1.3776822127005872,0.5788481821432738,0.7562635381680647,0.19547949434746906,0.3524415744125628,1.5637418076455891,0.1641501203185174,0.6080489168138327,0.8038308278542515,0.7274519382970365,1.560603924188002,0.8856925933576955,0.12378213582389092,0.9232484744525795,0.6638388942399528,0.8644518586388202,1.1382704244555386,0.09862290250203792,0.0650536715298591,0.9910319509063741,0.6771894096412862,0.5616134326190978,0.731335180210335,0.6460465796701628,0.8952730636289083,0.7555631062144288,1.0621946120037355,0.5481773042181625,0.8599032221253832,0.6477643637897968,0.5459592943559112,0.22495159422731223,1.51390312158308,0.15961366338537997,1.4481304817818528,0.4361138629485598,0.44476272452060633,0.3576358676681519,0.6052112121028328,0.8565216311354676,0.6393101299197901,0.9149493357709312,0.30279917933223677,0.2035247070745616,1.4058681570714078,1.0535146614622117,0.3701255778710246,0.6236332611797899,1.081587800587954,1.2986911211864751,1.3030023505827946,0.8620624486968466,1.0303556249503192,1.2218469322583156,0.5070462504955145,0.01551070052559823,1.0130032128401945,1.108194971567083,1.4046438989137808,0.42006718051997965,0.1314796809989938,0.9157725721782605,1.1590420898144511,1.3512296822409282,0.34208671811840285,1.2312093535661985,1.2717449073700708,0.9243547732979286,0.19633981386391697,1.0987605489891592,0.0819931853555256,0.8557435258855897,0.9138342573639704,1.5310258058483033,0.28433154524473636,0.6090985584790192,0.6606010708449824,0.9788200074043906,1.1727916830053122,1.5687243424716193,0.5964063334561759,0.46174987760514213,0.12411499637446292,0.33514557713966125,0.8750473415493165,0.11179292670438971,1.405989189605228,0.10402663494940471,0.6170229624610515,0.8364266592414534,0.5529275664620004,1.4882326043144214,0.7704624927836662,0.5804258994751901,1.5131784900026777,0.7070417088333415,0.37179559155802716,1.170225542133222,0.9109511375696682,0.44287935057026057,0.36329802596166905,0.9798536815721639,0.39519911723249773,0.7942208663130429,0.34601791207004046,0.9079793817237896,0.5984536908516882,0.5317281965639605,0.4992182291303717,0.974853310455675,1.2907047808129102,0.5312185605837605,0.17784206608534253,0.7583474590595434,1.119499800382983,0.5327815000196802,0.5217026736418727,1.4240835936791454,0.5226544405481681,0.7765813991292715,0.16805367399238616,0.2797249814731064,1.2782023355551486,0.8333971597726432,1.0168146671539717,0.5737118195630035,0.5955654188269165,0.766517595948474,1.0071610264389474,1.4495059943453066,1.1043056018671478,0.09625600777203722,0.35773133266179025,0.4003019689288241,0.40186394977634465,1.4741881681540117,0.7042266033836035,0.8659963591721338,1.1210602885116425,1.075735293557775,0.4547166631250435,1.468369776252069,1.1239007176740887,0.272602898568989,0.993162774263117,0.8643095804570265,0.08171799637277341,0.6877894514937244,0.7630169404254655,1.4121449863199473,1.1363914575434177,1.3908459934509414,1.048514918528769,1.2230720133369046,1.1429818971195544,0.6186102086424714,0.949646926077093,1.056089724291115,0.7911803044892808,1.1314546632873717,0.702819252544329,0.0077486728447682856,1.14172812982906,0.14022511007787042,0.07346096523933014,1.4483899644526124,0.8462081907612221,0.7732792338378018,0.7849228144017685,0.275032540718092,0.35281775612414573,1.1473968095406915,0.6246225618940522,1.3105349987749566,1.1455064949235867,0.8033514245018748,0.10141138121938727,0.9244859214981408,0.6871901077921243,0.43483447422388316,1.2641465069830322,1.407369019217898,0.6682109065649382,0.84761542539095,1.151717164754605,0.8620626818897629,0.3640064020943199,1.00123736276903,0.881142274519836,0.7146575924256067,0.7248466586488574,0.6904595510808055,1.4050321679069109,0.6434265684584863,0.445385355620327,1.0552451768195166,0.9187805092478084,0.5991651602880039,0.3705561944770197,0.07427971524249861,0.6691898199857739,0.7646530668768736,0.8662062803755842,1.4447459555551805,1.5690773133378668,0.223074386896512,0.009310980123318758,0.24243906287905875,0.8703410735096586,0.9039152602440379,0.7959735335186681,0.1138068656512919,0.45546228813903,0.6813477167586588,0.5749457498288295,1.4961392268524698,0.18125834669249968,1.2070237247841922,0.4643140346079339,0.8926127385589014,0.9996289226046953,0.21126543924290184,0.7614665443659959,0.4132847521664177,0.6058858700849076,0.8853776596396608,0.6966085683064628,0.926693776150848,1.468937840883323,0.8978225108900071,0.7579285549570215,0.5371770925385108,0.7118242079218485,0.016125083221934004,0.7800600190364534,0.17777140119329846,1.0986560688834583,0.9239866423497036,0.2803984197232614,1.4618785468193287,0.06716230284519076,0.3118281148800581,1.091313466456939,1.3459418457351968,0.8352830252810455,0.7834471001341121,0.6261569822297203,1.565044048107737,0.4250907033327756,0.6662081322312589,0.6802380497924373,0.8441331895585648,0.6975521163809836,0.9711362735789375,0.4819529882417702,0.05552407142903428,0.084086340636595,0.7951764412253252,0.33975759018093676,0.4932725414531207,0.3767567347731842,1.1753606609616798,0.686431692604664,0.5959357494893256,0.4940668424324714,0.186202463069469,0.09672081071189977,0.9846392989785921,0.476010305091548,0.8361506735229615,0.567994432463786,0.6576488704261267,0.8418828970388901,0.8486518432419996,0.04057576573084355,1.1338370138066172,0.8643668683724481,0.5614937482013792,0.47349957655307756,1.485930416209041,1.412222485316985,0.7956045578247297,0.5757267028537478,0.5722674917675508,0.7563550395034163,0.636880014160955,1.5580582907994214,1.3435290419374097,0.6147065306889875,0.4018998817169497,0.9322368981969702,0.9530010679710907,0.147678243865072,1.0445071500884353,0.5560930409027546,0.7109660484661477,1.5493597237218322,0.2458145864245979,0.8650581202648852,0.799212795624051,0.373244468150832,0.8398456719442958,0.9904075636107329,0.724552580759446,0.9582039180718219,0.9618204963889638,0.6126868298499737,1.3085059205596552,0.6181452082729997,1.3436028397826156,0.5946975544600088,0.12210063308021851,0.2985191338782322,1.0841311083832583,0.4597761142707342,0.7896434305729256,1.2171665215210759,0.44370159863219055,1.3653036126099698,1.5585682459436498,1.343275657366227,0.22625273584429947,1.4549559519898443,1.0016815496597655,0.3756846843732767,0.5706138367569635,0.20187639219369174,1.4545689398243353,0.7616875597121725,0.7722055227271397,1.5339593229316701,1.0358723704312067,0.6598641758696839,0.08374880905436316,1.4044774984739457,1.2144740943794237,0.06715556906256955,0.695088967560101,0.4151919914138,1.5592509203674065,1.3855800531267795,0.7061682292420888,0.6931776367309957,0.5067379198921335,0.7146479461575556,0.9874611002286375,0.08013727758745622,1.5306871677384088,1.4712810886271066,0.8216948247779781,1.0237266152430127,1.445957206465475,0.3237990897921815,0.43133840118649036,0.9541366808861251,1.4892366492716171,0.4329411930104255,0.6218966951598611,1.067862124947198,0.6164162371794542,0.8150289240094368,0.8323409878253614,1.2437947299760683,1.211733487936875,0.9403455337573459,0.688828060469064,0.7512123095781416,1.5325624359618177,0.5861918244622256,0.8147830082150166,0.9532766648602445,0.7480967343311846,0.6881161400640813,0.7216331887783229,0.09128182536785123,0.6489768690601854,0.7620682230703052,0.6281112583347483,1.09178223493306,1.0801180426775385,0.5771906581948015,0.04380050169225584,1.0579353335924406,1.418787995367577,0.8171689942290612,1.4793731568137423,1.0762040800241301,1.324968211072452,1.2993432651689585,0.9307436483886815,0.7153255894999522,0.7662088682797474,0.22450372230777327,0.24224517950164426,0.763664341138297,0.7883131632034597,0.026368134152316633,0.2652762476803127,0.9838200598435897,0.2662563837440308,0.7634919383658,1.4633779949995078,0.8167441894683756,0.4369598018450776,0.03645590658818702,0.8015401857672411,1.3964154439897691,0.4859209806777751,1.5454292220474204,1.0525078455321069,1.4977473994032169,0.5633780372644319,1.3651112932974885,0.7806641806192954,0.5279831347925397,0.7071500526511503,0.5365391915335246,0.8712593186659008,0.4373063075035073,1.0334516394529565,1.0126440392844251,0.2840333444034543,1.494970191865553,0.582101465407438,1.218474709284473,0.5128539793518544,0.6546540029914952,0.3790158820857419,0.36580218453203206,1.1484121143787274,0.5402376644347091,0.5075495034213463,0.6415395336031454,0.7324656571760573,1.3233030406090696,0.7161107456116962,1.1996842771310878,0.790857363792047,0.4256218964227796,1.2262294941522023,0.04003965491127665,1.5027297616846043,0.35402343196813263,0.5467219000975213,0.09522154242711844,0.13247215326666584,0.0585476212698812,0.2576798331715443,0.5935035699297664,0.8667288835214959,1.3519240931221903,0.8095905942749819,1.1940160462141347,1.5591738804426283,1.2996265589553493,0.6352830078634792,0.22663610367289508,0.49465654776047874,1.3594588338959077,1.4271105894633231,0.161790687689975,0.5760710096996876,1.3961237135889755,0.4854972717397312,1.2166316555401748,0.9328475485804625,1.3109712459581944,1.2622627079899342,1.5463529141188805,0.1472176058465007,1.4307952539062745,1.2026339707454352,0.6001534173151248,1.1185182094748614,0.14529356212284197,0.2752479730423579,0.7207285476886179,0.8388784979890127,1.2943555877222002,0.9036045729099087,0.16918571950173658,0.9066218312442634,1.1417868710768282,0.02801876753620128,0.9093529404111029,0.705119696455839,0.8755782046343308,0.1289240535720623,0.7772125351158583,0.7804769399836451,1.3420551590597447,1.381250921939582,1.3361222280316687,0.5233118245967431,1.5430635387644245,1.3914221654553054,0.6249304953508122,0.6690549030072971,0.24521807771315973,0.3231282575914289,0.8184263853390414,0.8807952693026511,0.994355528957847,0.9609012493046085,1.144757825390331,0.9516198376273849,0.6318426557242453,0.36157804703589447,0.9347474948365952,0.6320701424908978,0.914199395036474,1.5178564067288807,0.9623773842226682,0.53292876097778,0.3251101711357755,0.23375114315636433,0.2048560032064961,1.3309656581575928,0.5941129066734758,1.1705378080877074,0.2237692070751483,0.4129222994343767,0.7064390062807654,0.12452349718414941,0.8947132224429165,1.396346471651702,1.2407079904568354,0.2170511584387018,0.9832798902448219,1.363312757201977,0.8784654156299678,0.12835073412237077,0.8581913603776541,0.8131022608188198,0.03331920963139708,0.3496354929861418,0.2497341757501636,1.3081619193168172,1.2680503184105054,0.9168391275229599,0.45811465624162234,0.7616282461683519,0.6403003166372232,0.7778061978640934,1.1933400124660594,0.2745027514597835,0.581403231782047,0.8140692701778222,0.4967059766644875,1.3583248133572225,0.22398874566326304,1.010370375141262,1.5497865587776665,0.4770298791388108,0.9710028846201783,1.5169477764726782,0.831670342313439,0.5193002748229801,0.4060749117697981,1.2847774508640604,0.6999641586974296,0.9142399274376914,0.8195053875804987,0.9622609899775239,1.0995603357129995,0.7719836743929331,0.7201241130025217,1.1147557363330807,1.428955099361196,1.0019422777041018,0.66035378835948,0.7118467539281104,0.6323426119417709,1.2637364930792085,0.1941724196962647,0.2492404938170638,0.8730112565748598,0.8819543996050315,1.0621040163088913,1.5337952996206299,0.912334125980408,0.8450597647616718,0.7594007674815327,1.2183582232516017,0.5997210972724978,0.9598866418348644,0.41101579185241266,0.9745110595147296,0.5110103251076155,0.4801949685207093,0.5628876163148581,0.5749716084165728,0.7786148338459049,0.7398936194551051,1.34955677432404,1.5035758104659274,0.9040534873206115,0.41399014234815446,0.8851783319484499,0.7610488983687397,1.5098109771273571,0.9079031016049295,1.4077257781444712,0.7358261535183348,1.245117999338524,1.4775647003937655,1.3510526334386894,0.383778139590382,1.0719458247900957,0.7483413948346543,0.6603138571008162,0.9247612403689545,0.6045692114110883,0.2172188216278294,0.4360356403117305,1.2361214985334092,1.5237598375907504,0.4312389872008564,0.1892318056638159,0.7339634813349973,0.3366130722098491,1.5304610024194363,0.745557393741183,0.7407982798607079,0.8372022890105899,0.559760425309684,0.8768777190399673,0.7713884341723439,0.7646828399525435,0.32733968230348304,0.7574147660040098,0.7461701339433416,0.3160135518483468,1.1310652210384453,0.008609481538867583,0.420003989283,1.3538414059424795,0.6479087653536124,0.7201614713987827,1.4951730458338783,0.9097539378393803,0.7945102823876425,1.5439046218425134,1.4871971779472581,0.013045726685196055,0.6353193234821417,0.6064282209119618,0.4513862914906465,0.4028959200407634,1.4397708594051823,0.7442484162251136,1.1922743446961632,0.223163283983104,0.04665037365854348,0.7131453475244042,1.1304271908140215,0.6801805829179615,0.42705567996285115,1.1485953668578057,1.37621526990588,1.5699655469805172,1.0516123658020828,0.8910959280758002,1.082839329022289,0.7615951553794139,1.1739641590531444,0.21776919916155568,0.730000333818234,0.8486587415125373,0.7880100178386328,1.467326781312906,0.8475566329105653,1.1899055064980943,0.8986295835465758,0.4252543532919064,1.5172784339051615,0.5975794787921923,0.01945322673733735,0.07195414787045411,1.3231896130172858,1.0097160238576395,0.6385665746389,0.396913699448171,0.8932894959840559,1.1455255922092127,1.0450758349814582,1.0976974829029558,1.1825061673855657,1.0643697200903688,1.075983690740276,0.15304512491077166,0.7149640562321872,1.0825432198180236,0.8024718884548495,0.12532143587025155,1.4431423547968476,0.49401970451649213,0.3930417806321066,1.1634561630244746,0.9650703403423115,1.4855403511676417,0.9449857806911338,0.3247568387818656,0.7767225316919535,0.991680970731211,0.734657695134165,0.7174214490526252,0.6209621027175614,0.7963075410785414,0.42922065790253394,1.0636328057327677,1.5344772783921963,0.5273213909011567,0.9040612936290087,0.45854969180399524,0.9274880640924489,0.7522964073074851,1.4716841630431714,1.5432167613564356,0.49864171436335564,1.2137542094256828,0.354541429782355,0.3065988941418366,0.03024588475733693,1.0785638126900308,1.0083147445984084,1.2095969864901392,0.34226157083404357,0.8534444070163679,0.2330508659602299,0.3540743400899341,1.2150056845976562,0.5790257254973082,0.7149597860985322,0.20547469118830858,0.7749990251584975,0.12701640867594816,0.1434920055171533,0.39771968205015906,0.7778915885484953,0.5114877372442397,0.8782746710757787,0.24462149139410613,1.2676440346062712,1.1172802698652546,0.5351144749231901],"re":[252.46709664670274,0.13901110349212598,489.08776702095537,394.27146452232955,235.6593292020097,398.1399698532586,111.57975133605325,493.30083676975744,447.65037285865907,308.5853477769506,76.54519666380588,75.96942524829731,443.4014781370685,73.2231298468543,250.03695517150172,6.661975577162416,376.29366105652616,22.460156475022643,229.77124384545945,42.66200918785257,457.85045523547865,415.12128461224154,486.07034474212975,384.8926734836328,387.0739929732857,9.193772980568781,481.63494413677864,54.126578894568176,25.528063701494965,376.5903975671048,194.37374502237958,285.39089143411434,174.3170192347927,226.28992765423084,170.5456679923759,170.29204167562983,143.4468804238961,433.6337448810933,25.002231440573787,124.99279223114668,414.98565052104044,296.4209964699207,205.81394761115868,125.25985256602468,32.64453637484521,310.17312163881905,69.20455147856342,327.42310104316584,77.58591121214853,371.63732389439195,472.14910242099785,396.1052711617096,86.34084420957377,83.49328208805173,209.1850424548425,33.374623840181414,379.1208104738695,96.9092451947774,339.64588391040394,369.61672725639994,486.9610864166537,42.43017441294805,230.351145335137,459.3738412371742,180.97801886420183,315.2514942347704,90.54368379470279,433.0623120178173,22.628240037567803,399.11608574795287,299.92279822100886,392.72851610531313,284.6628467177015,41.01689073331105,335.7328996447083,456.17063995485006,113.9787382730021,226.43103620325056,312.65531401653976,267.35591976890896,335.6642095157749,419.6373446009025,242.35929756627627,53.42127673931974,283.84792981352547,332.78983349048366,326.9952656088829,259.6717181301062,287.81494661126436,398.22067919942396,418.74242235136296,334.6147329759902,11.906527215435837,207.347995282278,262.9813641574663,389.5835275989222,200.42784549817006,20.128698384612175,299.96353419245304,451.7407607875009,416.9942192951564,135.97014413594454,379.7511557659038,254.80395245489186,55.79405263075754,369.4351143514976,222.99383138906236,135.05963084825757,403.9534509480439,315.9983770635422,57.648789618143795,268.2003221651389,239.8529656625844,271.7378504278223,228.46182534491345,25.14038097539828,133.9398348510017,237.33477519701594,484.2081111280724,449.0818953081002,252.72469226709816,377.69116658368165,446.8952869934695,335.49189927572456,360.1331045380556,225.713023734451,177.8535010202933,10.024185920589513,33.79131944136393,269.93908026948577,36.51455827874639,417.0808256895513,304.3992798819092,107.94980635861806,364.45337048605273,214.28270224063718,484.76615992047135,354.48725929608025,208.17416079105777,162.02147703013813,255.26862866309963,353.6793468581042,300.76002319405495,473.37801722862616,455.43233325953923,59.90343344977944,140.64449579256888,285.634510138977,275.0719786221356,48.509433721813046,267.28735971831964,319.4761669292787,179.40329518493414,77.51565910075165,364.34470087746706,442.6261274650476,174.51743517845276,300.83431849677464,224.4638453346005,128.91980876060614,161.43693376294667,190.43915837818426,111.56879285116739,65.52878868245193,96.52185487119635,210.5650399726159,209.5635342711114,43.11151099616573,336.1167987630126,124.83316999044769,137.63685964821926,141.82072502052756,477.2835461144349,351.9465251244985,75.35092283114697,380.25022273637944,450.95388954365535,365.836193897225,163.2143803442616,438.3932734893421,322.8074135302327,314.35708206625566,334.1464753951484,73.24242848425466,346.2672248024157,228.44435506310325,80.63163201828449,137.41861866616867,486.7782146643491,484.9365967063245,268.7764361918062,389.7248582464159,125.16584535197728,82.36954726170342,127.15286133835579,289.8931627512221,417.1215829816068,323.61359796005553,6.857779939041464,170.87431553306308,369.06421900458344,267.4136068790972,286.20057265380905,80.95480253233423,25.08595247493217,82.54016082076743,191.30467389605656,360.961808824787,396.3806405406316,340.15865611683284,51.93541829807102,47.322983178061826,350.1444927721491,198.33908322828987,204.3607576792502,238.5270461051897,479.0499178512244,231.77817007053903,279.419540849714,215.38635038328414,194.60536618994607,402.4779731548294,89.57102450350396,18.156306692918122,240.62844485545952,440.96743687784345,148.49336141008206,201.3277275706554,485.9639184671602,201.72683596511033,348.1370825013409,170.01808427758834,306.89719887102484,63.47056940181628,351.971084028611,143.4075193380079,365.97009114218713,38.93307306275662,403.5237027028815,11.852742200802012,382.8378180704453,283.296729009901,296.45705006147807,407.8694174661296,256.91514960525154,223.66668415350244,40.03446736657701,293.7346235588061,418.11729768434725,81.67050701087763,194.95532156852013,296.9151950659654,466.9762015980624,350.14160715601184,299.3172683793638,417.77524737813343,26.697323666067586,37.723798136820804,206.82035963864965,183.42482865296063,249.51749646649856,411.0888082890092,151.89543529479388,246.89452822705826,92.14648626851896,297.46250254325224,102.53750896853997,267.32023138655836,56.58856515278221,340.6042215720623,476.9306515267164,339.24383355883106,349.31223556123734,496.27944819796164,82.04707157873415,113.35963158686413,178.0366931123686,395.08684522027403,399.84762237492777,359.80212476255224,250.92893409039795,197.31409712452242,414.5475375684143,309.56112105538614,21.658329677957333,222.15134080365073,150.23157013974665,400.6670993921323,87.09791998970162,51.57641919944756,40.81627944247879,137.33731362487555,171.26717087616095,461.3812716535655,107.3778642679626,110.01285933813931,218.6894058907164,113.98702810132899,285.7798531570061,453.79775184266316,302.6542710357126,494.21923861125873,275.6165343194994,367.9235344061323,97.54457870237887,446.37931406596243,128.97770049783895,285.2822338654759,408.18416246703805,84.58157672135013,132.30734556626632,31.48635111417397,34.812680819361844,441.72879549687883,436.53364482344705,169.7791048100551,387.9099651990775,312.9260610016529,406.62030686332605,424.3804056311955,310.97472849384866,302.9371501105447,494.1614513984388,182.38690087458164,281.1381166949658,28.677797654454995,252.55428580592553,132.06483250769986,254.80510900239673,170.3028770085161,484.9831167353399,466.5963262085163,355.94376255112104,180.78356956771734,13.412150666963107,215.68010469800603,241.42272052894597,126.18047632508755,239.24763234341805,283.03770481478387,318.0918761557604,354.37583985290223,148.672293140241,180.0910699402325,251.50080428903254,270.04635552000354,253.0257147385643,31.72523657685189,377.42190068081084,132.81347279664857,206.6758945705881,332.1312781242627,479.30882733926785,75.36072739295297,228.87314067192665,155.6525652016919,98.579492179933,270.51163657346723,243.32406913273397,424.8747983985374,108.17509640350576,452.71773094661916,331.3632478837838,149.70023528319655,328.9601812398222,83.95347528109941,287.7353479137763,56.93717186876235,62.82419519046811,223.65751114786048,160.47745617336017,84.92370834721208,51.24071462338375,189.2111291313845,299.3465180302025,485.4785471331692,98.24301467590091,99.38275486598324,412.06622763594527,418.05333406467315,51.60589745749722,226.23560153804766,498.1405669154236,167.73720078142475,205.91354093999027,86.66339555961233,13.905447639654401,77.39329857082878,91.63734584289274,40.76212703380677,314.9216743040619,250.35789142352073,423.1407886415461,373.00098472630117,56.41488837662767,113.20356534049935,471.09341874345324,89.48867440784592,306.9923814237884,13.364279334013517,423.973710889043,174.36491045668134,149.07082195837106,403.12990934980843,162.73434590287928,17.37425454516317,410.6632571594918,120.92598188039716,157.50938932383153,141.1080281992979,337.87765453640594,499.5120175558457,342.18824308452935,415.20304533651375,318.9169775182483,59.738086356624585,219.13030360860043,86.37114062035289,199.25732693924834,314.75791450007006,400.89638181519996,169.88830327596472,142.75148093227986,402.25839410886744,296.98146722444494,179.5606738725113,15.738078866275206,28.522830164920855,462.82819460671055,0.5114383747080176,48.77186742748951,212.12457144566255,120.98371246597628,85.3812194262178,297.5347864242996,114.51965314241464,37.2493737276941,97.25914500761401,117.00000159002654,289.44537198122475,376.58854108237983,142.4007448996404,85.06066943971035,141.18902802419407,394.0990609401033,453.507566221356,253.10708223827717,134.89420132904417,300.1468632393995,464.22058922908184,243.52137668771468,164.63545571725257,53.680016054409975,225.24092552972886,337.9331806837814,490.32486523494435,69.3952078413751,107.08714690993403,117.75370343337454,255.7148867694663,356.53308041451226,480.0798834563368,95.55423962616084,461.8626157169616,497.0670419074493,281.8958711125572,396.8753325259591,50.88913195807299,482.5906099443001,215.16013575972082,151.9021979239721,325.6658259709706,320.84692875246077,361.13725911047254,445.8422843711564,376.07059428116463,319.74510896921527,55.77467541311998,15.82221711313303,334.16816580336507,303.2059791020174,251.54039635329784,317.29768342990315,23.923921542885253,392.1709456552228,341.91607547051206,23.6528922024819,12.056300394625463,140.6426352628356,132.66148532786494,111.49462848788971,365.8823902241064,482.8169675461651,107.30072563917103,457.21273086548774,492.629889452038,26.30566273860291,499.67245656531986,344.43092376616613,267.4404959277023,135.61801478005754,147.58338420319095,272.4526755353712,33.82206803173149,71.14623349398197,72.2168985784315,472.5534191019748,278.8149391286224,499.5596119217075,237.84894705598936,54.76801173655011,393.419843712689,310.7262429149403,372.7998523262564,183.59682924990562,393.5342071195657,153.62933909325915,403.4234946144705,112.360089432062,369.94465998352746,280.3665477118514,238.88020690170376,266.5945694526164,11.12839141736699,487.709539446526,356.80783835387064,497.4326518697444,224.08275251727704,108.20031052189327,16.603949991886747,434.73968580537,204.5911440029642,53.88900860983603,301.0687421260314,58.142640139297264,485.99951556951817,28.00637122478644,163.92741578688296,380.4837474954009,7.289385967781503,286.1061718077912,439.7022128877541,192.49464525492942,395.3273039767812,119.53365194650412,411.2880309745566,377.96266907803675,57.2009622454549,158.8290869621898,172.7872669902153,90.40211382047003,73.33538138457851,464.1916011487515,454.6172797087843,384.05117948296254,420.178400745156,134.0458859667425,445.42493656546145,282.60595506917275,262.980276208421,278.321571140641,470.8041491088569,291.3450879394609,357.51475518185606,476.02640338058546,325.3743389711067,236.03673367847955,11.025062890562154,11.919888156864511,68.36174113114868,248.34391408453016,138.94482351112669,482.7642553505599,400.0480499980751,278.5353879952628,321.6617591529929,113.16448514616573,141.63803922972872,436.44923528847465,380.4894269336011,106.00464723719327,85.88152258091031,468.76064316101815,338.4782403203219,358.8338433894356,337.4570558126707,282.39631429735414,170.87601299407095,201.04409068867136,214.42006948792937,188.55526034665726,15.665500500929518,269.4276154115325,471.8635181736037,168.5497149307934,427.0342934897259,403.88891197615004,211.63256282783738,202.13063339722436,319.67486178043504,298.2494872463033,364.762953344251,418.49247200362174,295.35433903057265,147.66925689274424,473.0889434369907,81.58507350510047,138.3174780902038,15.142276899547614,40.24483992990058,185.89476698238371,8.343581002121848,207.74400823076644,228.33775553227875,184.0726474200024,321.2077055439365,383.05332617126686,137.69750321156883,284.7548055459666,93.43601515256472,462.56234327896794,449.8156328703409,92.49935866339254,113.26284531302544,163.86952949753896,323.2245759591514,200.02230116503782,243.58815836254166,31.438449826638237,108.63482591655038,341.0679523214334,492.3352716008914,483.7639926156211,42.6066451005257,272.4336641060244,45.28084075048922,313.81432851728874,330.01371169792395,380.2077427410112,76.83466230413516,201.78929973263905,455.888670253734,405.4855387278578,222.324873665104,289.34905173815804,373.7073675341488,349.79278183962725,347.94044623338493,145.9932309899866,85.01521901687414,270.5534967505543,267.2015125143897,122.76381331298592,233.07455350737106,123.65650058478406,444.67883471342816,471.4594607075804,13.782087724888093,419.3033366398148,312.29881458410256,459.3895677766627,382.5721692777979,75.44964462054892,137.6242086389936,185.01128722915206,172.87648674851496,242.73915370618639,167.20626814501605,427.553697934975,475.76319263733336,262.16021026512846,87.75385360354193,45.56970184723508,236.57489285942535,394.99310893929686,199.18639704867203,224.94501598025397,249.81603270092378,417.3963324561151,462.9120438446498,48.604429279028636,66.56735855362861,0.2714287883093247,450.36821234897803,163.35365660994827,280.79809443711025,470.8843865244743,429.90141802851076,351.36671645095305,74.28411430914483,451.9765305077606,147.0418049636114,261.54697571593675,55.02619129481945,136.72862766319994,354.1027111157877,298.7201647811714,129.27413360676155,366.86571011314027,292.2114059611703,152.08704522474625,499.48604128060515,224.84773174398475,77.68171350200592,102.33193091499282,439.4869957447699,404.20139252876606,196.57539951221403,44.937930787486756,83.96173794862982,482.7052994859261,467.9524858610126,178.31355099653157,224.43436357123227,3.4485211496494417,235.72811398906512,479.0803820729784,56.5705738450949,334.3368915277118,4.656316904850466,69.24079370055037,82.6522407502307,243.98459219337553,227.94468132411782,153.57244440288264,39.680455943328255,137.75667578142293,149.03575101697132,429.74930599772944,231.18705309830767,409.6440353368508,53.7085672252835,233.4534147063889,110.48456014753272,154.29558229168117,481.1820080770947,492.54447449614634,375.20037331345026,234.14684392330832,160.10684599584445,359.58763548813664,308.94836482297296,115.12311806953556,234.4750212127016,72.17473152049725,482.54671469512067,366.7670725544114,72.46499640522053,295.5695682006774,245.7998928880908,390.6882681908824,74.94631993148614,106.19632990068129,143.07278235173115,285.762220126608,286.6651091023256,58.44523032369375,225.80716932716817,338.27034069955266,340.6954274573902,194.3597618657996,7.175211856888075,165.50691826404972,224.69409558001217,13.510239834445992,121.46577647717227,30.923970839515704,420.7539802470781,73.26814031955541,220.85136489604295,40.56479478228381,488.93529823740255,74.11991016151687,172.06460697422588,61.948369496105826,376.12395263734857,64.84702130825859,468.6778781466291,431.8603528408966,11.781576296014062,256.16216182681706,131.7162684681913,244.15939962283585,334.6881943913993,163.67201550575362,360.0911806416439,265.6375424186618,417.19443536192125,90.56065638552491,328.9301514828017,193.69612010554272,390.56802842078463,96.44938122606517,147.85584856474088,197.3436925642369,176.56448546258574,158.42864757755626,418.6074382995534,298.15888283962244,85.48336706287817,468.97461193940205,189.37696338053013,490.2186297149995,265.3228056616751,207.36663298232273,278.1359683165593,210.50805037946364,469.2631369812931,28.479690646473045,130.10313014534313,94.37262499149868,426.72542806691695,247.6061597673116,17.551623489175828,333.3871600755449,474.9355591906219,244.37227035933685,100.98299508417018,124.46117082242748,53.690112873901796,0.663766683032252,378.5524507274738,149.43403493784612,465.3340148190708,474.0514852299698,156.9147112793453,369.600309019135,278.4657432043027,193.63642718521112,290.23495609553805,97.3461345329819,200.98777829335324,289.21377704886163,180.0288037300539,28.868317633714224,233.32147269101156,442.3180133290842,20.606466884092512,361.53347144079305,494.3605937424971,444.9891439224065,274.11618698438957,100.99711553383361,318.4099458061067,331.50328988779177,216.8762554722319,46.89903329157108,198.2305115210603,257.8710111299447,233.84315426194723,495.2249436773724,483.06497444683447,60.49231120430254,425.04387570214084,108.87715620953986,156.81207227754945,463.83425217807064,208.80962669447578,172.57714894541365,410.4123760013485,384.9651430143395,231.12441496717517,306.21456498241105,95.31343641245338,470.39813074430316,28.52143570763166,214.23726598163563,237.03236412562546,461.2241646488134,21.928639035440955,331.5304195152271,69.37711446621941,124.24633468512225,189.90614632068792,280.31180628366434,448.64481343935716,172.33077968085675,122.1426877733347,55.1228971051696,430.08944462681984,454.83925501010935,318.615208289651,289.73121064937123,428.6112985968743,243.34026252585684,273.57348831292074,498.54891404842795,93.47264937612965,4.387532147797191,157.72165041194773,197.29027697279267,22.609895309624093,73.53731104032757,403.6189966064239,460.09813831139235,165.43136566510185,423.532054702358,448.0527336800899,311.79265994434655,336.0039013441695,275.4938809678403,190.42066538176172,9.939053260559326,13.073509265899453,406.01448604033476,338.02930332940485,222.41429477877116,3.199378619778037,153.90884518273808,56.46449448228874,309.68267427727693,389.5972223183939,257.1700365970774,98.88704655506875,299.58096975411866,461.1802364365145,308.40877863555295,336.3256242217877,32.66220909079254,448.85047692698265,176.27518350109384,255.52074240689316,401.8046771231646,258.7703950808986,356.3550351580473,300.9046218823452,19.252484738737863,449.47962033135593,196.2150063285224,85.91780925359626,179.26105066361964,340.5580954635041,160.6241764687305,259.22770902984337,117.79880307139689,420.47897209520636,409.2947418228454,150.35590948046928,434.43780083861594,171.98620757613915,134.1735234029524,420.15089217195964,373.94290185235167,321.7650150925776,450.5389963541635,41.10847510499804,154.47298798877796,270.4913248220619,340.16678041545435,5.173821049872185,164.5858638414025,422.2996439842851,22.70955392543339,446.62999446072337,381.983423006717,113.03604134620105,133.12833670049474,139.2407702519597,406.4750748628302,74.34531175912728,201.9820815841482,167.2280474340626,491.032479319187,57.81146621793809,313.4067213709272,496.78652860899786,218.00212877417525,498.1731733628909,180.3506139415204,191.04883228408187,76.24792033858164,158.90246250256567,108.3252710259247,221.59398726790468,369.5661710293602,408.8222330519432,372.31491482735834,464.63913245283936,383.81876454670873,477.3176054151993,399.87556371398904,299.7528745952248,275.76582299424314,459.60052895479186,8.434787496178874,482.51999634352063,1.8113042252885236,359.8194666962472,270.37750453864186,425.34170235962154,317.5142217743016,104.66658674247154,361.51198039235777,314.1202567575162,158.78674081851253,349.659614667311,342.25686517059137,137.56439146657794,368.5217699391683,241.58064809556234,499.45937396522345,218.3734287579109,189.34619620346737,287.311966339577,69.63467809189527,494.73552319873914,117.24235670270522,442.712672665337,263.7514380730064,315.0084910696336,147.50394748766672,152.32926913677647,294.36875311021413,194.82520111957203,224.47970699401154,28.186810064448565,169.03833116819834,39.99505992001573,426.8726137004931,329.57705041455057,105.61498900623812,51.68868481287425,130.0383782201594,294.8605957454513,3.965232977833466,159.63885876090112,222.4628541442064,68.60917928213527,163.11375836894493,351.0688102590196,355.11951781173303,171.43540820352743,330.3694498332117,14.709373906799605,369.79278026976925,167.61662625360074,321.6683969017081,165.74720865694937,376.3804164982491,222.1569766832242,416.7305014289279,364.6824188677094,13.794218770335265,288.64855373150624,217.76719156422863,172.73294040249743,304.6567714633871,121.72450939817526,83.63568670528853,145.10894406685094,336.95307562661213,388.0358656109717,44.20939898744669,367.4948097379638,192.4500034151515,242.3478920576486,100.32967212766508,12.567337083580043,465.8243766807604,154.27302957321044,214.8363626685722,18.93334609113806,409.9394889584972,451.7965105653704,267.33155665833095,386.5474843481461,437.55553732623486,16.029183858145444,367.47904731373393,240.87378656041204,472.69758636977866,458.7529249919311,43.90174591601581,193.7638248316278,37.071471406272316,120.93819384667847,418.40069504741837,71.5562274563164,239.05669180846033,385.90264433614453,336.67667958624304,306.3598802909895,461.8924348503043,244.7604477414862,228.3053391833878,364.07273547593786,396.72626555546043,376.9995233441792,460.3715112424166,419.41081808922706,46.790381198622775,396.11520098447426,193.00695431895355,308.4087029310404,224.6397938507544,191.73550034640695,245.83563225509798,421.82960601943023,92.09464203609052,192.87599860674854,228.24405669976676,196.77353122855035,368.7685611935039,424.0006966707196,315.7328461643599,383.7240695962747,29.167474372795432,313.1915642421942,84.52945579837912,406.8350586738281,72.86119368912458,367.7681715722521,167.3354506485253,267.5953926919826,482.9792754214417,344.0405095165242,217.37011636659975,413.0375353592638,373.82652382272374,423.23797031486555,61.88434232249706,76.54334543114261,63.80559525470164,171.88880708332167,107.09982734714917,230.18412122582154,335.0933384453203,415.13352453801645,407.0116992255567,253.03972138354703,94.09575328578812,314.2638613604976,388.48805283606447,28.22528074557895,484.261251025645,493.8760890579116,412.5278586455253,95.40006158532499,458.45670863078925,331.91735901454933,40.78688314533308,433.1021506726225,371.7129099159453,476.17196106791795,236.76928080105608,393.01955399023313,205.52732732436263,210.12824724724987,415.35886913291256,317.3873623618859,368.9221894379544,495.67668614044146,290.17338595634925,17.922470514169287,347.465609146259,13.30673397258808,396.1979088657399,161.4056491507161,37.97608297289923,282.87326868526185,326.84522163883213,477.6042500498717,306.2521435167397,38.36392579301007,7.410886966879082,161.52617069538843,247.72560565427602,190.74818373224335,226.7085735438683,386.7685148133728,368.4990986866459,420.3648425984162,285.48183355304434,29.655568021214606,9.87332726621759,289.1561609912479,91.69245989419528,458.22259660241707,123.75782873733976,230.6699338428987,217.43340852155978,42.29569163414282,232.17504777653298,311.0292495942119,186.49610222905855,354.9091004556674,123.47868534428774,263.73290181992513,37.46272781297366,109.75532370115859,372.45540847591406,472.4114571216456,469.797282546184,216.66582050650962,449.6157482782125,63.74171313888577,447.8323412289487,407.9083270381378,379.18434130838284,380.2672389576176,265.7039775250225,167.9321927360291,141.78988445799624,102.98931117195853,327.50203304563706,396.22546509364344,199.96667294125115,246.2845775199869,222.61699916893906,483.3634917520907,497.65452332378976,89.11100203643552,360.5066445452816,498.9368416381248,6.1782805529942975,163.7756135058367,153.4117254663463,440.93418382187764,286.8447718607393,399.3279941463732,475.77199248248326,257.63218862074956,24.213037082677747,176.55813897942207,279.4494339737883,305.24773875158274,70.41786429461317,432.3336296996372,7.240755161574408,479.9852069084072,273.7317622736104,442.8665637751197,168.617791090522,452.2086089995031,215.83268918440845,75.14138285573402,447.44216250039915,260.23801644867683,5.311872224375014,429.33885143125383,280.79748035373063,366.1822280721244,180.14255798581547,420.598677469018,271.3838730359291,116.18309250265946,4.206448167190846,48.059460424942024,66.02767403094556,83.66720084893498,227.38259977238272,210.73779561861272,5.950182462967524,386.3654331123917,125.04727838647011,335.2466507240649,362.1736850675864,495.66024367003746,479.3772261007587,450.40935057528134,177.397152588874,352.865260265122,242.60274306750418,411.45696832292066,326.0991853466334,329.22258338194143,356.9852046281574,452.0740156115024,211.03869729773183,165.52585340306302,140.33735120806145,394.3183836765077,420.2112469154219,69.82199010847634,275.4423383921366,128.30926683561316,22.438106871987884,314.13664561402254,76.16812891874602,13.591548858585822,337.8890617797234,413.43616829544396,120.46139385043774,338.7978516954342,81.45740203896013,397.9524685653143,49.85746431757065,122.85863730954483,363.3826645767637,461.27570199901936,59.32717141511723,50.09995248312571,322.9120493216401,10.707274111640963,412.62964504526076,168.37859715626436,370.3835105293888,104.05134207944921,169.7389277477258,422.0542311934797,278.6020612580966,438.6116615782215,7.045033622806951,450.056725150893,174.47884391755386,394.3005755828719,425.762379699417,343.2810953846057,306.6436984578047,197.57823562354383,309.65618028938025,401.9674737747669,325.1964867368319,6.270768200284493,385.98357977263544,492.1293457902913,228.44026307243948,354.4745086065625,493.12401466888366,433.81570555150194,171.11765973948258,78.2349300429287,271.7582856971066,54.20516806561704,104.55014453347377,388.55329904254666,179.13677982844433,334.37618632143017,385.181853022868,133.4904976476323,133.13777017975448,321.00478522867724,317.05490677384654,371.1697738058335,100.73345214314888,56.43899721293011,222.3282930457372,388.8715880087007,2.5794676547721274,137.56672940192593,85.33490923949083,117.8867022852198,135.809166480348,135.54118978867191,55.86980542398179,43.34490379849398,466.1537425886215,446.42664584795534,124.65633321431946,284.4409546348854,327.39286334823635,200.0662512891891,281.8887171930086,81.31860412135117,230.95389693097724,118.35542982537307,244.4592459864613,120.40694052377022,301.0560180848455,304.7156028525919,488.66340581302205,411.1664765739448,7.960966675183312,96.15975444538472,281.3510555587596,347.14436595882904,467.26567759759484,485.8682664907297,358.805184364566,160.30353738980872,375.5695820110584,192.5363198856933,288.9807087292638,299.1241044192238,15.739064174643547,300.1050890321846,29.19582794009323,163.80815318578934,287.92839806677637,492.2235005596806,293.6833536000413,109.63092279235099,202.9130883872199,54.96939726632466,342.091558865422,206.75070261044993,32.654463152592015,478.4819946383285,164.01570710897616,209.94779797509676,136.57859060255706,450.32308118186523,433.23783293843377,1.836039194596184,439.1985107082995,438.58216808531756,336.66045798225497,455.24676626538695,494.57256132950664,81.61729143641661,198.88063681993017,29.747622926836527,171.46673030683536,57.26855555812671,181.90882867274183,446.8903720732115,131.65239670383377,224.3794561260033,4.533647162425991,350.39435226729785,120.28414414015076,242.60945976989746,312.6813586049921,378.287256150716,156.9586354797472,86.31212193533788,198.69969222013984,115.35649309616103,29.617059780631894,383.3421313660689,396.5781112830624,85.87807665605685,472.9280518140382,132.18756845334912,430.63298082238157,38.37023425117492,290.8645372823503,165.62562432952288,88.05245620168556,93.60684562787813,50.57247831736489,347.873506708868,8.6400935638401,375.20731422496766,360.5384675652405,101.69919256327209,480.7925987260393,199.1501208813109,483.96542273913803,43.64879766905372,67.5602973345948,433.2383115424574,274.366303209728,326.9385520702471,473.9704381732193,68.99295812672823,223.59923387948334,53.16942212090814,152.39044556805382,418.2669032721607,238.91551356002293,211.3480878319627,54.17165203895236,13.473164240758283,185.4148094336795,12.073094068145274,242.00316445418068,487.0734765318019,95.17113758216655,280.949451019325,296.6253630265677,77.0888836685435,190.87337298743546,235.81029768083295,18.062692965944095,336.6956341220769,252.6654457898677,132.17876949670304,370.7880514672871,304.45415606560954,221.55066032606686,77.82590486818219,350.54136960061186,71.33596271792409,180.7503435900786,319.0174291025273,47.201722371140505,373.25306943381895,223.82496724896072,460.34185532730544,499.535888839036,207.6176750222799,390.75420975084353,121.38949439280977,289.5985489096179,0.8134583184018496,243.9921938498122,221.46371202789007,238.90453607231433,310.97154358729773,104.6590495123011,222.90122108965016,406.5718264721758,471.57638857487416,193.96286887326275,260.6635749464008,124.37905768259627,268.79862684229715,196.67656945830458,117.17974853640678,466.8859705214405,29.786223774971532,56.87616018619679,453.7630568535983,289.21176317921726,75.92059721062971,374.539465339626,292.43080665200415,347.88257494668375,331.036093596529,450.63533511401243,62.8585200115993,239.3078724140445,78.21086709293301,428.04194770238166,417.87389519320794,291.8635806871277,322.3825776504378,361.47147208209304,41.53045286675283,430.90074702619387,155.29704592614257,382.2427474049619,434.7898447304672,260.1573170896063,38.36127928054189,250.71135000090038,18.34692372053692,230.6273723400215,144.61065335629553,135.58923146307887,45.62258116363538,251.05621540243007,142.56182708590248,109.97440786917412,346.8271544682199,175.9554771537203,473.8943393651521,181.02227953003512,309.9247877107357,474.60512086054285,320.4319599694367,180.2136551276331,377.196637448157,419.6219245024837,434.9876989709367,455.6704614285042,385.75435055585325,469.22793989601865,29.451376952619455,206.38390624616,464.94280476674743,27.849582753215806,367.5860434081649,377.7857657277818,200.0390840763062,485.6438231252566,70.92993442991957,64.78498050419957,53.02021206598695,70.95248219615735,220.32712943054634,231.4664297504603,384.2450612988195,343.22980672678773,168.1509204590841,104.37983785865113,114.59512835055763,117.6318078676858,404.68216710662387,13.984730129248057,265.9862023818561,491.6118119000636,483.2681097287188,373.2127382872947,109.41922069509558,154.87052372150413,121.32232384364916,0.3643199901198768,33.391405588256376,360.05283051181567,394.3817395105772,231.5380333946656,464.294094117774,201.54720598252916,250.72774188793957,247.7309149444279,416.61489562369536,297.8373136157466,425.9467614036595,193.94987735265602,328.15528042580564,180.19358833726017,91.24372661412339,130.63304509186037,74.26122522533952,434.16824950627154,122.08407596502968,189.24776583930702,332.532072509117,37.71314127460501,164.19514043409845,419.0063586547099,112.95046859498747,205.12429230206897,168.28623773756712,474.9876904220037,346.88793139040075,499.3460027758434,441.6946321275287,363.8400744730833,180.45158187827437,258.6830239016633,252.90658833428037,221.30908981884633,278.32351341118,43.947684645972984,199.71811878394175,465.0129861344453,81.55303949884285,131.5122610606826,258.4352729623124,396.9835852271539,10.959110573854236,30.641530552736995,349.1869410174605,429.1709288911484,481.18832648539245,25.344276560122726,363.52931680124243,473.9787361047756,178.64250120920056,33.418505104434004,88.56226990606042,439.42859810368105,256.97061624904904,241.03610367649574,477.1828630988266,92.10798971738821,451.3078308241255,278.39237107827176,357.51189569093367,351.12636343710824,94.95885777370793,87.61393122267557,92.06535083212131,387.6851397798058,147.69057746250448,498.24959682792024,383.61247338690896,400.6997192782533,304.7164881436798,328.004164039442,188.88462625019542,282.05541840498495,153.2987449228912,209.59314452345689,351.05226758706675,304.010342361966,103.78175595142613,467.3198311354507,450.13898214818585,434.82939615569705,136.97626901669724,439.56609449948957,197.72619394352887,99.96219236555348,493.1692703802276,289.93590292643756,109.58925862184677,419.6716220681581,409.44061765923266,8.702703010942447,138.00410956012632,116.44593047830287,349.27849861808045,407.1179042690201,24.514931934008445,0.7479536202275039,148.82845600547913,172.06524801531452,311.0498656553552,458.63802380921527,311.1341270223624,413.26531146203695,109.93101674372319,401.1513682830007,54.1844199359427,287.1840389791545,246.8853399443439,18.808934113696772,87.12197035057434,161.7154971704634,368.6088297934339,329.3926796718335,264.8308719530208,3.218682125323058,426.9992072712145,117.32323294191715,290.1585777904523,437.85011744043624,1.254110361852856,144.22613024530685,51.11081807948459,166.99033812250607,86.35195530365381,9.77351082860678,123.75193278675044,1.9806545934395459,135.9555040389192,389.42285305783975,333.2537659384659,101.23059659130928,34.11392568629812,186.3872535465695,477.9523340703392,407.846857358401,470.47351478741075,302.59134122396904,484.2211068824713,81.48784678364073,304.87775632199344,447.38192565663,362.09288117470385,488.924084787857,22.869754063639004,324.2541740357477,260.7460664028518,405.71068413996346,240.38272414054674,257.4327076861178,392.4206930088968,70.93018999195489,161.11070205998647,450.924084334701,5.881485030455935,367.7356545364058,345.73218072871003,277.1189792396492,160.07144467504997,275.7868722367019,146.5262024163001,299.3787925895966,495.93437462331025,32.71591534077811,253.05100580107154,22.638312432764817,172.01900383608515,77.07583428349673,279.25290898624445,499.83528830975587,290.21976099991974,287.22144216077595,53.55938005794047,192.93646580739366,225.87496766224058,186.8260415048849,278.19262820172395,470.07561646404736,383.4091175161645,226.41942890818677,51.743124491524185,5.3286039994470125,492.43028203092587,124.82663919342596,117.20744333118893,186.0997700966841,173.41524948933085,140.34950781067778,48.789511253098716,1.6552733346134607,164.45743343230757,325.1004907393353,170.11916150789753,261.9526173930606,120.71182297606641,77.38642834800757,365.7731108073766,75.5700264315825,440.6753435214179,287.15421255964515,436.45576657589834,12.912336803404202,467.83761942022005,205.55082188303197,197.98194796387713,37.892781236943954,303.5498303099338,210.36668988831275,107.72989039785041,373.70722026773973,495.20257220676166,92.29327724154157,119.40904279148124,465.587277593677,385.8317967272221,134.3480042000561,481.84862034518284,206.22158217807151,412.83305887644093,288.5523615386354,68.50909120225779,187.81704434883528,374.56158492887334,433.1783901908008,56.20527545828702,202.90645007703668,228.91496710396052,129.7950507634643,496.31386792664756,312.26023900987934,147.75973520442997,346.65370471353276,251.26292312725562,312.7418770868351,50.9568252091398,145.57289550290065,315.99698171318545,431.0024028676803,273.456480792028,295.26194359884084,329.09262806828474,175.56280820485725,454.1292949884599,347.91551188482515,296.3194015079884,132.96828395301452,416.1566936923473,115.8344474506352,276.95101305760784,134.55737163446446,13.598154795279815,260.029730421093,92.60447833899698,82.55810724491697,388.43993534612173,18.65685326352795,177.20189024594703,436.2574907604926,253.56991033651622,169.10517094480372,206.4914502033097,351.75865641957495,429.11611473893873,310.4774987816491,341.63588684993493,372.65030373418995,132.30654433309664,443.62218706238264,94.982964343567,90.53708700584639,280.53111406683973,374.336413694192,325.64947185755875,495.29558979243893,125.08507691759829,114.87471691397366,426.1898517459214,259.9476460769372,455.29415266170514,264.655672668627,310.82268194974006,75.44825460629423,233.88093817778454,260.8963095349235,319.82154881920565,159.79113395611867,234.61745491204033,338.5861585437373,455.83964298460745,452.53435080742867,147.4129536835864,487.5538203102383,28.60958269942737,463.9323420127051,36.04483112993007,374.08139364922164,348.9970361112318,376.73165551844403,52.22130250735879,415.98701602051403,402.54097608707264,438.97595567467783,181.16856052063125,343.6375610690875,135.13502712612623,354.33743943364925,258.9562236582394,451.69810433104783,47.64414534080386,162.34952371395505,371.751468302661,481.0277837257039,323.3255121522404,350.358287409315,50.21958514319624,87.64308712132329,460.1875621601208,468.6467011641704,310.4928911123007,35.48847828105195,195.95874772516075,5.9125161389849135,110.22561488084204,431.8625592579639,192.26455034971679,326.07898190775285,107.18366510248822,15.739024842106875,370.1916495161508,161.74907909745383,427.8151731057541,29.62854592095887,129.8901479458825,89.0432633691587,300.7674326054411,325.70726581688257,480.375170555441,381.08113973256076,33.42551414565143,126.96852495059218,137.2162432595938,433.65216560556166,328.96956730034265,210.9445265660843,308.71175376307025,68.01518509875525,212.9322457858862,420.60366670158345,374.886729098283,484.98483022047753,200.43055182475888,211.52924280103315,331.1157909594942,459.5581971675633,218.11197916232393,76.64779891709328,416.8552664555827,433.7863445012502,283.8941913389703,104.14129285497464,373.6612074619352,228.1207241473898,345.6060765875518,36.66805323611189,381.19940780993113,371.38051068093426,286.579815360313,471.99567454576186,225.41813524991116,248.96776714143442,108.8447679923319,153.04581501538382,383.131792489719,435.28410703217793,395.99276757980175,34.477960133213244,36.516571962531884,45.26193477115869,147.28528796961916,478.9519671300527,252.78321394521652,259.27273669346187,300.11398735434767,414.74910472269744,190.95477324802823,54.448162406038556,391.9777076694324,461.9432039128442,334.9339503014451,158.37639090664769,296.1634163302793,383.4713426428449,23.431387812603568,374.69512546472805,383.4598286684282,207.69392532373533,14.381071709216542,329.9425430847368,193.17425448177406,426.50413397086805,322.676336875809,264.5337077562001,270.2370050221425,303.4188559035009,186.87568369968332,61.09349396758357,181.75499871951618,95.39633639304745,127.83206338811992,493.5524719042751,69.0442776351321,369.863560388934,98.44717852156481,243.01173430134472,305.75216383113843,181.93708327109047,137.60721744616967,457.3444507295503,168.6899169269015,238.6564172448228,274.58368437071823,200.3541511769087,308.8988454923638,395.98378602565884,26.11360601943069,53.63923453750352,145.99324253617095,66.40799404555086,493.675364773508,48.667364097053635,104.25759759381492,31.428016189281482,478.50960515953244,338.4958059475479,398.7269225459308,481.9147326899047,199.56072941205238,106.9174409936694,495.1661773395536,348.6251369756249,415.3820288563186,290.19401255632727,418.63183672734937,360.96519427652976,388.5164791872362,420.40917698515557,372.1707332252422,76.62832295244404,62.1617530048012,35.83847790467598,358.68685429721756,311.0547341747667,343.586664348174,162.28207353570923,418.9119029966497,484.0133911645643,42.694507537676564,259.61352867847074,369.2388349298814,466.26352685048977,422.7671852625897,253.72745022720656,241.15140899466257,453.8611186454838,436.08053483439204,162.89399719810905,14.403178300262498,314.2254660570798,160.78709867811614,182.94584983214568,59.82668831147186,319.285801631677,83.41272703087598,64.36966279458012,162.824627760193,51.27987173737514,456.28108483367294,236.67819897552167,74.6701355242414,247.23940725756532,344.8649495629674,18.213145196427472,346.9962589564672,232.50491475803182,386.844338112509,329.95294036185,405.78788664214215,28.840880585755734,239.8683753053077,382.8247809037125,40.127621064496296,306.3339560419899,178.533895700168,168.34241724343912,284.40763917963,31.45063743404275,305.6658145651269,171.33684284734753,396.6942690723597,197.6172955340558,360.75196389783014,241.68313447189428,469.45966797373376,470.87562290060015,260.4422021074541,442.8734342606205,443.18096612183945,61.03912320234195,245.46038865464936,304.6032640152366,357.3553692195659,127.95951663205352,464.8513719535263,138.2475081402693,67.10460039381016,257.4016634614561,360.90598871001265,419.03713706150893,20.63697527468189,51.81250133924442,439.0340062230901,481.8666720310102,343.7055725201812,300.3794541138851,445.642836985784,148.37010309536603,311.9298982530336,142.7019941981691,411.6461189778108,376.3760132711275,351.4425357823726,251.91369896132898,496.38060784107796,94.08516346509165,246.27025035855132,428.1788271901581,325.4801899008323,444.0477639088535,353.73861400242447,260.99464235803214,317.96021694250743,95.5382717795179,251.94064424874628,497.77786282445203,294.94452495089973,220.53742031475898,373.784495670064,35.866860341052245,138.62337973362472,420.2854116850573,453.25311187102744,345.7918103238232,250.038482003897,454.71328818862656,313.01839544978105,234.67191375938512,495.28721280744793,421.5428199982434,406.19228257232396,465.69766388297995,217.10253868046092,49.417018338716254,378.85357888551954,177.52824364423435,481.3494858343418,111.11440250732785,150.45865322747932,220.75148627146203,172.27013407872738,299.69368707920864,423.9087025138717,417.1901458326204,422.95850778898915,458.14907850740894,492.93972364803784,412.7584209949677,50.68781669103406,201.03359528116272,402.1078695321276,452.177897472921,499.67939004053073,336.31493296140303,269.21202333891415,275.18332896153186,486.4935633039442,56.38428228472936,37.885511562214646,465.091818383969,151.05968356790876,492.28427878569215,414.8080159582233,468.8317157282845,126.07565481921601,322.48381624724664,100.7919463816569,295.527331185988,292.280700479577,287.1844708782955,340.05331086110044,293.1751357650113,93.79476519090136,256.4910496439553,422.95070496768307,467.3129279638972,71.94918133900762,42.08389744423147,220.78738521075712,18.880997879843765,345.99095117596437,103.3883791817668,434.82589011434925,105.26418125452786,448.78918553036704,350.6181906208763,348.5134251388352,246.5904845289947,382.9258413749856,98.81283915888972,491.73815980560533,284.74068244574556,488.8175230508945,260.6267262249667,49.27007051434285,157.45973010476865,182.03975772754399,81.46742820981345,1.9712987578801577,144.2148319138028,81.737727395924,192.5592220315945,204.9732092444252,1.7780124254259677,236.75384405372125,398.8603346640165,485.4597609371535,154.23828219344392,206.64595630060722,370.65669091433364,157.49452968080945,320.3834991492438,212.9171755822793,474.8028938376817,21.332085016436466,291.72235240896106,383.5895782287547,433.66785979911305,487.5137387238646,462.29676703682145,461.26080535118007,299.82050125470585,126.52130219865842,141.9116802851098,326.34737864721853,454.9807190956534,447.2648826101101,63.892658013648514,305.0028009302297,61.961065054502164,0.009481122693721922,1.8646185843771423,349.4324403948369,288.32151881406344,336.4839676828785,29.742489857663923,209.3691261848154,182.45889924371272,76.46556464021381,27.140381386814628,301.44783855535786,333.8108183776468,344.0406801861219,352.69079396542804,409.3077725651899,162.95733115910315,442.88767514939974,85.32072478016784,2.827897754091313,286.31059623456,358.31478866597746,485.4720225901222,322.7013426027927,235.851445611724,322.5621023872661,185.8958646295802,68.0020214564807,348.0538262623848,337.4345484789726,467.1273912687375,472.94345555146043,86.4313079484228,28.49441560200905,383.80207757165977,448.6649134428804,464.29343226567033,305.7046691444123,434.108366900792,120.71455803160947,434.90584140670774,141.41777610403582,293.07244606108617,354.4198575655625,208.05418023464307,410.535933044063,56.279981922574216,422.6947631407967,308.9367359375091,97.02115727439042,150.98040422625635,79.94309685875001,92.31269662849351,1.7775280134644245,20.19930286008842,402.3154478187504,17.781423483282822,182.29575577348123,484.31585018131574,334.71698140676034,222.68313837930498,459.5302604522592,271.93959918864806,318.9518282622409,67.80921512067329,251.56169139836993,487.75691934306064,64.18758056945705,157.8138563095862,61.40928984223493,425.03235708746723,181.0096608424574,494.35634978409826,165.07553757162842,153.87761801670706,288.72315493427084,47.420925211926644,15.953543490591304,150.51309040336002,62.3758794928112,491.1509348765838,396.3466774431983,498.35523476706146,413.39134294520306,412.24937240094204,75.19073289094335,312.3308432506614,79.77029582511963,48.932918421858204,185.99638042718348,458.0756422490726,122.73454543912965,364.4501757804457,154.5171861179081,252.94331281870052,4.760860928373467,478.3497899610726,267.67370850274875,286.63071371615746,397.8231683847457,301.8404443889612,240.11568536008664,250.33785367561157,50.168566507039934,201.79648752256364,53.05730836854183,117.50573628113048,16.970883136070757,279.4240882801704,330.33608788460833,144.267390027347,167.99054955608406,275.18133945748593,92.65789002161584,232.41045154362183,394.03161651566074,154.74105729780175,410.1661306305354,392.36598563461166,457.33155982203164,157.40969087415124,154.92504137793307,40.662567703692034,427.5196446057564,232.54241516194062,275.1650718069951,393.46897876183084,452.85782061350056,122.16174548664804,106.10351166684362,436.1000636706337,19.79624311577277,292.27575614898916,119.48945856188186,126.71804578023117,287.4296917968514,464.70430301253305,59.853660090086855,212.20883257118217,312.9853434776514,105.13677833198032,371.343024154519,255.3371365540228,466.39962782076685,180.35768452185863,468.67244343352996,443.3321251027281,455.9433125172897,253.6411636580419,230.53286857011724,294.0667584722647,125.35942911405063,274.8849489080645,448.54149122589956,298.5991738201721,305.5938429192208,236.1995066720999,92.60388490452065,441.1998072525559,292.92695498117314,306.06681807622425,447.09266215369183,214.7951767631664,113.95433620664663,21.67215197586647,24.089214884865484,363.8696273094816,390.1003645809451,219.02368994985954,231.34607537472218,380.4377656359603,110.89363420499909,391.0647975028551,94.42073421187047,369.14874377060437,413.3285118081672,266.54845980371897,417.947393032733,89.41833287969914,269.22303039933473,453.22558869182717,137.35039814015127,219.43465042640065,288.1221212556331,329.0616723037182,88.07262663455195,237.88869388756217,383.50263672399177,63.88050840253812,283.6800601042942,403.0266734479784,39.17102860079036,432.9142942320908,22.077133134693838,314.8982827953376,271.40176934244397,26.756745122573754,180.7216463088439,125.25190347660708,127.85259054019382,110.79857874950338,6.176859383936306,281.4859493012029,379.09689957124294,167.3155972213688,58.235823069366035,45.79895072671869,344.8754418746714,282.9871084071932,137.7875743471737,407.0462599285698,151.31525113983002,406.7530609019231,8.15247495782967,303.59178550766666,192.91872042508805,452.4038926774673,284.002265367058,169.5425511973465,398.14113004881125,234.46917669497813,45.51454054371873,107.71867218917231,102.70109686482543,295.67223361936476,124.2078797485553,369.75571608777415,152.0392835763117,35.416770857639946,252.5933459912184,30.036428871853428,47.1021833897155,175.3867577063386,427.72962200328567,320.3446864871059,134.8085672685032,165.63506614586208,390.1113324774361,410.89812441166976,168.48379997071748,243.42344894916556,98.80753496856198,384.59935963504046,345.3477253438202,407.0338007244649,91.47431750896529,193.1074633748031,354.1099108574422,423.77792303992214,259.1897607484105,212.39636102667527,365.38823458706594,392.97657081647617,298.94579711227556,338.3675754401779,261.7480431528888,356.41039632826397,176.2464025380228,105.16726693920597,360.35879229993185,353.0345725673236,171.575116804064,499.3451860790528,95.28892620096042,141.3339429061482,417.89381741545174,113.34391013759004,135.50418525612062,482.64994227113357,131.51097419420245,120.30361312654614,205.22707855045653,303.1707923002844,392.0790568492337,178.09241181188108,70.77647279390953,374.0752361829183,128.23130227005265,62.639863012098004,144.83271082195247,485.54422418324714,492.0465643335146,186.33487493596357,190.53277843443672,435.5512023090918,100.08062173953658,120.47321493551111,148.8232958443968,19.551055684240872,457.8560696755253,9.238392904881042,452.8615966013341,271.13855770021576,405.58826106258164,118.48554054652627,429.84763302679596,498.2030759673942,102.56397539260875,464.00917131328134,138.67339768447184,42.03592898792907,167.19447057761516,87.48833698499215,43.93013007462743,166.78724369418896,414.55484696955125,168.50413031309952,339.6937658031446,337.37085350030105,245.20179322352308,2.532269659486386,103.0892308506064,242.49519856214553,99.76804165967457,269.15742186911297,36.841223956718295,296.7888098005742,43.268453684374705,339.2427543587929,462.7474476198127,0.7206350959328978,261.25974811104635,404.6219172811979,339.01450000400945,39.978141689930744,206.19242815328786,217.94739891599224,430.7936016865633,164.71944677380657,418.04520454983486,479.2553407892651,451.9417524349504,186.57635963413455,337.42416361004456,115.14212063633988,472.0512639027237,354.0830175168286,272.13619508120024,220.1502333326457,96.4693713525706,182.3042629861389,313.4557944985068,415.682042697833,251.4108265515962,366.66156565901844,13.017498074385125,93.76196585073681,47.227080038322434,205.31906478560757,339.7325812559854,281.89097737210267,478.8489509788286,159.7285077707462,437.0056892218469,132.55153263110876,26.624634118268098,131.91684403915204,479.4865322612313,114.98606093897723,78.1882054841746,165.82770132521009,76.7562041149461,26.647266960798998,415.8704011400228,434.96794979073184,313.44146138303677,339.2056956091276,302.35824070930653,361.86012542164946,314.6689076940379,73.80727642948482,467.4028723373506,182.20141881568375,174.29878269465715,407.8368839983638,313.14436818523836,152.90836743337988,146.81003315580543,353.7671523316043,84.3495701736886,249.61704944399298,9.729610117207299,482.6225933977087,221.71333300976036,37.99261414832,373.80252789206736,400.4120334256357,397.8977814331176,84.94513351204137,192.01805968092788,95.90919015086973,223.52700552115158,352.3149883147059,143.42623683769796,409.148808823138,204.95662289620188,143.06624370804656,102.01099641839528,253.57735167709393,498.19353044509154,323.65864406292957,125.09312487146462,381.0129790428577,209.28103531314846,269.61330805105433,356.9217830921716,135.7534468926952,158.30057137619525,127.94805305424018,67.31788639508684,479.6209199138567,490.0089834265482,400.0225498027722,108.7792415712996,383.2524961916838,345.3940417984343,141.9094098059679,241.77380451230812,167.12905647836806,361.76635604578087,424.99199198929625,228.09735222182547,387.8700793015193,441.62478997000034,387.6720369214898,187.52369872592277,284.9638864351006,350.1841320800525,217.90658342250046,494.99806687068036,176.41603579406927,486.96226733436174,118.20662783896074,276.35013600164183,429.54927182873024,172.98204818405395,203.0016560624266,353.41745422355564,338.72339391904626,63.17085807380152,289.0334637213863,494.92759108283093,378.00676496221143,197.9548614445241,371.35948533376586,10.655541471655038,53.674756532714916,95.50293386592857,490.1035408948,465.921466646835,474.85844880975856,334.2540610361754,46.9789421114708,168.84434105163226,176.16559574942337,294.8096883341345,257.56454879551063,6.875657052430317,240.5184535416518,76.10157810072293,467.165403978625,481.8507020872486,304.54801059102243,38.81860604636156,343.5273934602054,206.63824923341488,138.1420151818472,313.8060922383131,71.20938164059065,302.8799045520398,214.21623603151806,93.80866964520074,201.58547892092372,409.168006635959,45.58034421207069,301.3208055991083,114.65623613765908,134.8200379360579,138.31286738015646,268.7378294738426,404.14637875093797,264.0194631928745,288.8730650879219,356.48620472878923,462.7198370384137,29.57829719721683,27.62864267632803,225.37264608101125,128.68316245942947,155.55381039540396,294.67938956669536,344.2167432302474,434.0000932099083,267.8104533628548,341.82980449857615,456.8183118649491,196.19567736812738,128.26927745060658,417.60232557610954,419.141656887115,351.23223671444094,102.89362555684123,428.82346055871847,114.31158969120791,246.08728203851626,375.2131662126593,420.4736169054327,435.650201982417,372.29590142225624,118.93603550643495,211.98022489207258,471.78636660835684,293.1343928475302,297.14568199787107,36.858086882865074,279.47080508365696,356.63163193569346,434.14800389049856,393.8458804050862,321.98049868800103,309.7145319849313,155.93699432023368,286.22149376233654,5.882608369398801,303.55077297850875,314.22112123281175,261.7494836301574,234.46393646794206,20.466364107340596,359.23745487175376,234.42963194573875,80.66686518271015,308.7319460203205,145.68783864399714,272.9557125585269,75.00490058331589,84.19227217356462,354.6714290526671,440.68078885229664,329.0059129556734,29.815185181872984,488.4577946309295,49.40617949132453,326.92966530457636,13.275791826436567,310.51148350996317,304.57742053648883,425.1481976562829,183.91620908813812,468.6887091473211,164.3574619256103,19.198436000597564,399.0789701763532,414.6553486748045,54.95489680258425,433.2576108893239,476.72706273327327,300.295933244055,375.70209993630846,432.0350980575517,154.56243784065916,211.91651103465358,12.159905902174973,50.230789598866174,341.38044555889235,476.9225514333981,265.76681644177336,376.74164915715215,368.28968581818424,87.61226270569634,50.982489918126376,227.21091126860495,423.68462877199187,425.797279406693,67.21852681151674,426.6866100228537,436.83332086745116,297.52945700932264,219.7041321876917,116.44672462221794,319.46583506988657,23.3094445343206,247.06921215746402,426.85455905038947,413.3821636813244,416.1447346609253,154.00352330153288,407.9105036228974,88.78051611559334,195.50688714118613,65.17278535172666,253.02280887340666,499.5659961321768,250.75838036970165,278.6212897132615,495.23392639629327,446.2044217098871,275.49266825662846,168.99639808230472,156.1611507136451,55.80038306992252,497.4038343902415,254.48726408089993,474.6714241422222,275.6094687348878,469.5596104050287,235.69330236644248,318.4332778087271,436.36877369259884,364.346844017368,75.6905323900603,191.46490303810126,202.87034010959349,91.15980677557378,134.1584638175738,215.48093307074257,384.9866161422942,131.9196157598601,447.56979827701093,413.80826179576104,225.38650839412188,157.69860933276635,432.9507156253709,133.15457677994536,323.0474138444841,306.9404382426384,472.6686102428919,183.8638110953198,374.8655978648445,416.2764027983047,85.26586845851702,282.855578397749,30.762936074034684,429.0647498802972,344.706670746305,138.27674125841938,304.898931897544,444.1758197295552,325.826596477397,145.7398980976634,463.95355999229315,296.35333086456137,307.425203819624,414.7694017304978,451.4267606013008,84.36255198572107,326.75789764504236,96.99192834910242,408.6269683206983,281.65932341390345,172.68268291731903,347.4638872628676,387.4080006885897,344.62800451714406,117.52151500318686,192.182165866833,377.2024793119281,336.1281667989001,203.61516062538664,455.37408829089486,410.1777017682596,59.65738385870167,133.88694949396518,444.10004625538915,481.33867225915463,496.4986092670849,400.87997824064183,349.729447853339,106.214674280111,354.39176416007314,44.92637918666797,325.8698275403582,482.1083860900399,234.469460568027,424.22611935654555,148.58773862135365,261.2672266887022,393.496276116834,266.7808975296634,160.7382986594106,132.38325283724396,34.558807329912675,388.0223096012617,381.2594755086829,286.5439450830407,258.5200312779793,195.09528505971895,305.289745652247,359.3555146254481,450.2704021517644,437.54426434371607,313.70533593119956,448.2980624955252,40.17827864184509,96.64124587578004,95.17095865716152,270.0272248214747,26.58265317073849,184.39129780473385,486.2755796463082,303.4006292543778,13.402148918101652,177.7195782264509,254.70206584212917,268.32304183126075,151.64959730797312,234.94402572569385,46.92289244666104,291.3105688014653,455.9779300964265,222.8944019545387,14.91921799090068,344.23282802023704,374.595611443298,42.721281842300726,469.7036646376028,383.13183121722994,264.5260784921932,404.8567716478989,175.1765272123894,371.5345861128726,62.25585805854217,112.49230050790327,312.34672155813126,351.9571434729786,350.27026522615887,33.38973912389098,392.4079933761825,298.76867592993915,192.40343559791694,367.49082149414215,184.41916806294012,129.34771444725357,115.1023683089023,83.37501554266102,148.15873323294105,405.69314132300696,158.64668248574608,48.601352532924416,423.14329097223737,488.42461013662364,193.76534269281277,375.2689345757724,349.39424339908487,291.0905056247199,89.90959049484415,374.2486459717793,141.69363913293142,82.00183829306229,499.5835184631111,55.9710817368152,235.1531174673187,202.97197359770814,36.165302854886065,402.65497883639614,50.33869156641557,342.70632785334953,404.73168505610346,265.7020912710294,374.06454958602006,6.8257018175673645,205.96049711758258,158.9056762597898,217.65491699550344,238.35394510617203,38.1237879973203,228.5393345111254,194.4233209310393,120.9221323425379,401.27528781678734,310.33003033589534,381.2175126256464,74.45058010491945,324.52289838526804,200.51466885953073,270.8214595966325,90.2628169287164,110.34023719485886,16.494739238720246,189.40392398360083,377.7604519357067,373.21081587439085,476.21452697007646,438.27942975138654,440.2546647398937,489.8377383878182,193.93195158381792,186.02139424681386,240.76382466908208,243.40566740480375,235.7445299760992,213.33127902761439,402.82627719376154,105.29260585313638,321.66073045124034,327.0769249932407,357.3667377660317,417.98652978728245,0.6482583233798911,190.59744961963386,131.49731054424308,278.81774048804874,164.97931739255523,90.52980124883281,144.49486654519606,235.43270455058695,38.72386923160109,271.2167227327896,55.90366990588436,27.57097610913617,442.01934968298707,469.7831615211983,350.02496877262854,274.31097711464525,489.04369093546865,250.01507500755648,345.395132252403,480.92352109004577,385.9808621633691,75.51779133706593,171.07893135864504,74.14374093094456,61.00855786050319,483.0695267772439,168.88550261387337,186.18341410496407,344.3140178284767,158.22577255654758,426.1046485574359,50.827605596059925,193.1589842726482,458.5661637782682,325.62044995725125,35.804592271327266,285.91836125168004,305.43323460442053,82.28652002183479,170.9599048008008,42.181386678607716,459.7789285102405,294.8054132155975,471.72225874826313,313.8538086464149,131.29204457569955,452.65901550381204,485.9022432455705,114.24817289874557,34.37950673660628,428.62679119376935,163.8333934788131,84.40514398786026,180.46356054863634,382.20229933073205,219.3492616258863,303.09925835863714,339.92413485050474,463.1815586186715,69.8280306117115,470.2226157390492,140.10613383771098,424.900187825466,407.0617014367358,249.93384190128953,88.23122489441992,376.61092347543547,496.1295178055913,494.09178570358813,428.576639200116,408.86182123126315,280.6786375735729,148.5840502170265,120.99802689711525,83.474695414542,33.89457249048833,17.437603887566098,69.61390043985682,41.31039897796973,368.5255817455375,341.8273510710016,465.1641366799334,375.1391511566563,423.9042534051498,48.91241606097607,314.7190548347679,290.2022921600861,121.04730250621797,401.71745230061083,7.084692715654595,108.02478223594647,136.0942610304956,311.7775563184856,442.3659632297416,88.32567563771143,459.49936559082437,2.3548160720159306,95.76393962530693,447.7224684014013,289.99744800193827,100.53781387144656,495.86099345124177,138.4825195502901,17.37088387045094,90.47404351782961,172.5801692786899,436.1118727209701,390.9397953669561,383.43373195732534,312.99498787948886,38.22644465614855,358.21450009002507,55.91054116627059,154.94906639114302,334.2786172284182,216.48927157556975,78.61287750645319,94.32006035514162,440.512786325583,331.7463487574299,359.6806033297673,207.7311225352635,279.2052679768606,121.57884437997446,90.76533348443161,379.97470819507316,79.92865908811142,431.7885555331474,481.4203579172428,276.1524120398097,369.4158979850384,22.660496759846826,162.9142916179497,8.991691021424831,111.04307227301923,129.6305450865588,37.156315922874384,82.29367109321284,428.9278838032345,160.10794952389597,407.70948845451073,354.82585035054615,304.41160897005335,339.2248927763132,432.04911568267045,366.2440047193839,356.92625487686314,358.5856943048211,309.45412881808977,437.68228190923577,45.8136515936447,407.3658092472778,287.0409406376778,70.53878771053101,394.813039857825,332.62928487591495,280.3256261811089,206.75821191828757,463.6595297116195,40.925717654815564,469.3131512898617,380.2365368214594,14.499808400001978,61.98316986247943,67.64936897877627,93.10900771320496,164.2069951584042,97.36153573672456,86.45464311560546,471.5530812343214,69.7066767941309,250.36570567104044,344.32902432152713,71.56845255020184,398.92501118462917,477.8761608157619,31.641978318122987,279.03713721865375,233.91706239774857,132.05284130897743,30.423054069764753,372.68913746577647,158.34066072309295,452.3549222696378,226.5226601582543,320.0041774898572,453.30601964562777,292.2702869472064,57.01406896792427,484.54037757292224,290.63001041010983,272.9742757682201,144.41453903181102,70.82443761732115,321.2990894604939,152.52545319907097,405.4809097416136,100.35467078094918,26.8159179782711,390.2562246237422,225.05829712695913,18.950355590787726,175.94355528925664,426.41045316196846,286.58172997349885,112.6940974360956,335.3500335109475,136.1079536168316,261.518106140016,294.5173651545636,326.9795054392224,425.13722045037616,139.57255501649757,87.4256170375366,231.8312678957317,357.81097987485754,339.21631964174315,219.45074800218234,283.40054575675333,386.34882349872504,274.12375230609064,27.937494884390457,285.2429037159824,95.33677180030642,247.3577295852415,234.96029727855583,339.57667786846713,369.74134889458065,167.85806996023135,272.713326232083,193.1013938495908,245.805964154583,412.64063849408006,427.3611370333512,62.58456208644703,389.51749683972037,193.93669291178296,356.9820991490318,296.60051019247226,495.0912344427918,68.05215772044082,43.82982079552467,293.26686737514774,208.49886946684114,104.11119513856737,215.04636923813035,239.15567406050874,308.8578626013594,354.3135917564467,117.39766210076452,170.53131285348323,290.1615678167274,99.78446431741861,378.2561215851263,238.59694243219354,227.84763418781816,187.5813764597498,35.146122827167005,332.44414641655726,483.81755249775017,334.8320109716676,277.4814182412706,230.77219420854934,345.05941796648233,420.80306747342775,258.54345411133784,108.16344578476577,2.581619274765412,62.729568203207855,75.21251915809812,374.79820350947904,55.19643100867988,361.13379081987216,197.52044219480092,133.79072134086678,56.33785579793382,464.0750276830916,283.7790416884448,211.24377107288294,360.82957756835043,1.9435318047493766,304.4282478564264,204.69731277450632,151.2498943327394,355.8540631169854,392.1220900284098,485.6829220057139,341.0950443152342,112.57414692836187,438.09104564454924,207.00623956246955,358.29495102507633,330.6742406047104,214.5585716084786,260.71703388474555,145.3434471010694,335.55706104192484,413.8446885209677,272.63710379176445,490.9020075260426,150.15303210257323,382.42314735904057,34.74298729284864,115.70410626632666,231.52316497336733,337.6023354561374,37.72056590192263,376.7446649252243,62.89526268732559,348.7933979753942,191.7969412398305,111.80156475817238,415.617673840362,250.93605178447663,436.6622918861386,39.15859183876014,67.237742885341,383.5206312159454,123.1163696498333,213.2594672665592,487.07740842405457,337.58167044672905,371.8115475419014,187.27594756700162,409.744548558951,126.87321671384255,139.22918922087257,208.22957032515487,337.945003721324,243.83278763497086,82.20552077460108,175.06056510003688,84.80983091854067,145.20877268281453,313.8830420222779,30.39539970407079,46.695501657623154,88.82802202419116,100.91993606024829,223.71889225397967,421.40977452384175,106.86305175218259,22.425788635510703,15.203188203468443,486.1173428146121,288.4788124821367,156.77716500093942,217.82161467327333,190.4779589318464,455.4451265514836,445.87024624618954,326.6680391494604,245.45163906476287,94.16571317958989,271.30739794395873,113.7575094823109,465.1032762394404,434.0304385183693,263.8102928088982,378.2037812796617,112.88354255184096,426.4304013677734,190.48813359767104,228.68593731725016,395.14172191507436,293.8163644582817,487.0830337549391,70.26854324472009,254.09533331569867,17.012441971047345,471.5933519034857,497.4238405456182,439.1711393157509,304.1879093712223,71.26221636352126,31.588141881400244,184.29891926919893,316.84916679151587,189.81107467656443,350.24926063800876,127.73505499053917,370.15403560468576,282.7526969726062,15.54742435391432,373.0218696242802,429.89179869397344,157.81733286682808,149.20273492211922,76.62496752118042,314.8443110658956,110.75403272750373,232.7353508651293,195.1288094689665,74.39163690143657,16.712615191120218,438.46374694622114,442.36673134141,78.61098408931888,53.47666082699831,159.98353795858367,414.99226777846485,372.8123849454512,229.28300954633573,20.19161414176951,234.00432375691227,47.526623063632975,326.0512051087533,328.84178711333925,176.18669220958273,75.98885816348245,487.6147412210301,36.99376909020224,406.26369168738387,171.24681437269606,370.94492721583606,30.925408909421414,401.55519348314493,97.18113101079051,382.38399191813824,282.72628558849186,209.42457702283025,457.98209982323755,29.682418489339945,10.5829770028949,339.03776838133746,478.16023773736447,371.0124174903806,267.89435366166737,139.143418639314,437.76981298225803,307.599774357051,258.5701088243526,155.3687481813304,435.2105075850905,182.4736126329537,5.682248737944429,128.50829701991285,270.1994938172517,446.3275013519139,340.3169624436543,69.78942463056892,236.00336620818408,0.5361888069064236,17.654778710718745,309.96316323534745,29.99509931637945,270.1245288125104,391.89112589179064,247.72385585312463,473.6678137616049,265.4213060956031,320.6511313043874,156.77092275485182,79.02927788684744,258.59224182965045,229.371634835438,480.3171527960771,342.88978219098044,239.19439046663382,433.4045268183615,370.02403771096306,227.41671433161193,489.10776193672024,229.0381096572669,480.02820289835427,235.93494604867115,432.92556202198995,425.326046271024,279.9273133747343,163.42423958109532,37.548144986887635,48.30272182482243,312.6426786559975,14.844035983004101,197.04008561840502,107.27429532491317,399.7894620581164,237.1030297981973,405.13490956472197,100.68540110448521,205.02797045929987,284.6745840316557,222.36887273017913,491.65330121105546,404.43781963970537,485.12752897582146,87.70657448613318,237.62470663241652,444.45537231826984,398.17139577761594,341.2901749283043,252.33522487619442,146.7390873272888,467.977098550042,382.8678597040334,43.55748823986361,194.3418338105338,8.641539708171386,135.77281062000966,424.30385104622803,32.62505419796868,153.64421745879199,416.738868761455,241.64521492763348,425.05005808597895,217.1380535984646,136.0492856723935,389.82638066241526,492.4373477134125,125.7690729877503,219.73559440595992,342.2009618614236,254.4933031911747,282.80593291502987,407.02131753402494,127.79870824549644,332.0759632057949,37.94856786489875,306.04764214470646,457.74335636425957,170.1419395416077,80.61888729520616,487.40339042725776,54.20253544245601,138.32956012401743,61.03122390149751,443.537305225963,427.6157354915273,304.5144655491647,307.73745053216106,416.25560173327494,56.62908499156083,86.04127349735613,398.78804677701265,83.73795951140562,29.829569243140064,155.3730048144123,175.70514268567294,219.7639036423087,360.98571956647794,418.2893793855411,214.48640274656938,86.33536969098022,498.67655269187907,338.4052453977827,452.6585642392092,48.45743993615215,9.714429133037328,161.03082181800045,312.39220774053575,217.31304816037377,28.493473410562963,305.1730181326168,464.9456020837907,120.39454878096478,183.8468335201805,259.7593496506745,276.36355823219395,162.61207916878962,219.96428797292322,299.94146608005013,198.44573265189769,446.94067123130355,487.4540894754065,291.99285881034865,144.5978975254052,193.62669734281766,20.99458765473039,15.294374056181947,71.58646388641965,272.4217543933537,280.67977862672643,211.9359006352618,16.378419085632757,380.1956113798345,373.0587911658645,123.14195304555065,305.03412081715896,253.84126579631427,300.44845134993705,297.08641949498013,254.23295734421148,379.29281526181194,424.1269835891115,219.57130762534592,201.74526458486486,273.1821524370667,115.38563956672942,53.69936667001307,381.05768373265767,53.566598742400885,18.131484857602963,76.51033684854814,152.24628898713243,396.1978159436334,181.54033059418074,131.24368651102515,497.6571932051491,199.34910425805208,84.94879978692815,76.23814665808248,440.28318100983876,71.89567107993811,317.3074255677645,108.16431618883004,227.57208502557492,13.296089959038193,262.34943136525715,497.7637427548085,163.97731488743517,303.0404400452665,445.72338246879104,219.6579876366843,439.9575971727234,305.9265304900469,173.720940572894,220.7686410831856,424.3743373423079,139.3497615053647,114.22538042586649,292.35076899079604,43.221558512819726,63.7412317340621,402.5498710290377,421.65811284991184,195.82865689398855,27.632358179219054,142.19969197838145,332.9609975260588,110.70446254159816,491.65987200735617,360.75011310337743,103.45902814086605,181.3295509813738,152.17860828736485,489.82890027650507,406.2823569603027,466.28204945033025,402.634510834142,144.73600128260767,278.49214855042715,247.51804320867586,443.01806155694834,336.99560010305385,210.01787103788172,273.5200330586208,76.99015771469064,253.85340126403622,433.8153017504779,292.34948269085004,363.7588529218984,335.2684461657771,280.4694811584233,404.7272962665718,275.44302233646414,171.41935601905666,442.63703425839265,67.49820855481315,272.29428316357695,162.22488136644876,276.06132265437464,387.0962288880597,309.5500742306455,337.89925700847914,379.1258443411546,172.66619642989156,38.52853388338773,151.8644399642526,488.0602426098512,239.9661568818565,203.6681756094949,314.89001785367344,149.94226356895012,238.35143049715046,348.0681619281967,385.8739068201243,495.4674735560257,476.384964993791,68.78201242593008,380.7346119798939,218.06375361106979,157.75208537611408,405.0012970783705,73.02353997817067,89.78564383455989,168.57777118692718,182.25519473112195,134.0555698403406,0.23044044491782323,446.9593277128844,401.7678249817761,433.37658837984395,22.618461690952827,211.04653477608127,452.3048156284405,152.83340779743637,147.6511739733689,7.813425171601995,194.0307722426683,296.9010559661668,247.08723080058948,498.19914230502195,447.9173855939348,391.46036061152944,179.51175131033392,143.01616439605215,45.63703192150071,468.16564772939705,368.63010456803914,173.3542137048991,92.39178996025078,346.0991909363155,1.092671376052512,254.25026297101283,465.7395753644805,40.77610290601585,463.0588881020521,65.86903215731365,302.72848983152636,138.38701494815487,83.93615547487498,221.50149281583796,318.35920555020544,130.46702163265266,383.1448777229901,23.2046221648865,279.34453300619754,223.2782219112208,280.8932093948889,192.9779820451738,281.35569813894443,333.7315241379973,362.01907457737195,226.2775628128183,114.54992595628433,337.0657076728142,341.84335152849155,418.567514484264,480.2120601753046,465.79200637742025,124.13491796594623,163.96337104601665,389.550872515126,111.53077978486714,291.70706169131046,272.1816135993178,420.39094759900905,329.5574794647234,88.74527194180249,398.40632114066443,332.8875577001074,309.6617839199043,63.09967944602657,69.85950721830037,122.59262090211709,97.05160380901422,177.77042471357885,287.93637905073643,359.78313681358765,416.85887500610363,434.7086613899508,182.47699554353724,88.19492691776676,59.90961007019602,432.59195666686156,165.21880334970274,370.47217572120906,285.88031901020474,157.55517034252796,412.53958784931734,433.820688061594,456.6951074702601,468.79641250898476,19.341515446321345,12.415623432066702,291.99396241611333,150.70806874196563,122.7033162465465,295.05370218734186,263.71134008433506,193.93780560845764,92.42249509877765,35.83984353701164,346.8724752877779,299.9308392010079,68.52049829159124,439.6984116922503,411.324017944524,167.89173690495184,330.4750377764206,55.779544426868725,433.54297836184486,465.08490229393493,69.09566054480587,318.4335507792685,99.56458030505233,164.2414388041653,152.60011789997586,457.43334113679845,38.00197796338822,83.04813920962451,230.5490059343396,90.25642643070819,443.8232528518775,248.83049833902504,365.2207905110495,471.5065190129866,392.35259753124075,470.91268476818817,457.5758938771175,268.59230682913625,102.15989747415566,14.00939191224293,86.55500303974506,443.2873560262376,251.00752528527815,82.23482638512947,147.52657796063707,393.42097680278664,43.60575414930678,62.12872547061965,475.31095513880206,14.480349301698169,354.5120286336879,467.03254026907683,352.3314743442091,455.81183225340163,256.5552439658211,324.7833344295372,51.39899575800311,66.13080496619206,239.13731276813988,431.94732428620296,145.0995741331099,427.00205734305285,120.77009995086586,467.2306351156621,431.18941465620264,30.39203534496815,62.91738601675123,262.84686098377006,367.85503489205973,404.6146635980957,481.8139164965215,135.1405277059119,38.19585739400344,37.289830286453274,376.6888051839334,354.873156757362,237.09415940716505,286.4147546726894,108.48911688369944,79.53854955304962,292.78499114556746,498.86376311355787,148.3599470478113,214.59031971478214,132.7887641369343,41.18502266521607,416.48092927438694,47.99003207092256,235.11725409810236,377.3490804278945,68.84652319724849,451.27762763056256,61.60135132931577,256.3202401521486,258.67599205056945,332.3752189801361,400.2888265860487,202.54213960104707,353.9939824975944,491.1088405595798,266.52121012895293,304.95501157579787,284.68594272184765,430.19944100591243,470.42584379325956,172.68235972763958,41.23840288701919,49.403422062962775,228.26361190590794,299.18307167049164,293.2693366021406,347.79413114880697,65.16670152105497,342.7710016745592,247.2621507365438,114.92980003044617,417.8412158391306,455.71729352063375,380.45260381583955,300.03965006909027,242.05644354761978,152.1330794494381,256.31031408036023,8.579002504139455,455.1046162342476,5.451648485230387,366.00481557497056,266.98381215397217,2.182542657325648,74.03572065732034,19.61397224304029,473.6919335632247,381.49851637571675,408.9289967492313,83.15645518822734,252.61030690912844,53.52162867430399,98.94529547698127,492.7693120515485,174.45292672171954,424.65902775461694,25.713708757675757,236.9450331473899,170.24176711756013,12.251287881006935,148.12392778937945,17.675059236880063,246.8902249521753,309.29770682270055,324.765905802602,66.83708563452373,51.726911858456795,456.54451705280843,477.16486614280143,147.79744906235405,1.0226349365038967,225.37026534179873,167.7492174980264,333.9182347798869,329.52403219636915,170.24939766198798,23.44786856890646,206.0957583545673,423.6133567392407,461.6205382942933,103.04266132343143,35.64230587412076,228.270361875339,365.17028580421805,286.75850683755345,460.2804397782031,387.42046790478355,266.35755995058116,393.2456271530298,13.495374978081397,156.51767161429896,65.4315147011113,110.39692701958204,332.8122093521654,208.96387488394475,127.5517144766286,355.2443715875079,124.00930941192878,112.31895397844882,341.8704012244563,495.9112114699703,5.655449053296402,203.44903516678238,342.6222483340977,471.7780555710924,328.4555015974986,8.351911732549787,357.54394953295787,399.14774585079783,11.66066290286427,465.05745580180644,152.26962940309318,408.4929520501087,394.7742658907527,426.78933691179685,92.71376920551478,491.61959723688733,451.8654324485122,162.77188684966038,296.8809569276198,182.83366784511225,360.17748957918616,100.75518031971198,53.079099737285304,29.97663479453361,237.7421704640529,339.9603992097313,281.59792062658516,445.4884960942661,304.63831095450746,363.1249075217111,401.6944370271134,146.58145627053653,265.93945456218546,312.8071968973395,153.01891252583656,205.07359950073044,368.1302799813746,109.47444563983466,414.47777252052543,204.5245319615887,302.80956081294875,376.76177410329535,279.87329008792364,156.44274416960235,268.9254151599139,113.50545971208903,436.6625265318323,361.0377132487339,121.37221209817884,85.0584960122206,428.47772113393614,98.77238893155548,72.71694788717508,221.12972452708078,91.27051475365944,357.87404811155153,173.84131701160533,237.4448152926547,199.1295109774279,283.07300227260015,498.52339738162675,121.49924953773916,74.47401054825731,283.60724960862103,489.42499601357656,127.10798981624494,379.38805405046406,77.25027456628875,164.13263646673605,230.5803414651979,131.36315857765547,432.66400616766686,410.0325655180749,482.7144991334574,160.58167461194896,106.80739980029819,345.24968216865716,219.60086012689496,212.657352258221,470.3467535112567,498.3776529544006,199.31753153420206,469.72836705362533,494.4742806386928,247.62133066806047,305.8515812970705,35.04868504605929,7.846148598749991,458.64584382659604,485.8460395040006,371.9720239842382,131.7831495527717,9.913535309675648,194.11316443730243,425.69305074518684,206.5210077988794,496.5562837765234,311.86776142820605,141.540478888149,355.66405845797647,288.8830174566205,432.0669200666971,407.851862896057,165.29241040962916,57.92199109335616,386.06728396533396,267.09678479536916,283.6942689408217,43.255086368587214,399.58067576769565,135.5609227584792,379.02779168361855,298.33947687141506,40.54155808443149,480.2373325546747,257.02730383278083,366.1344156404117,454.617344144599,195.67058531775794,252.719091801051,53.49751920916779,70.83417616664755,390.33837440718264,431.7114211250412,392.84538141008176,358.16928602376606,406.4909899870712,172.4442723893751,360.3989255266848,172.15239575852402,75.36862308786108,116.4126882492652,365.29356432150826,405.21651702275517,276.93914094130355,39.36412177943727,185.16461196414514,96.30261319015487,157.8390775351879,392.9631933670231,425.4363154957873,439.7381591548115,8.538413610473139,303.7550666127132,291.12868039436046,392.92696258330994,245.7415498271529,15.144027611184828,189.08738518481795,301.76331037112425,313.8571045101175,48.89787484973751,490.82490080031937,2.106643161761901,118.33250297269815,35.83230586310449,223.22256865138513,458.72015987451766,307.8562142097907,486.7897110168643,493.0961638024904,235.5533634119452,231.0609967603704,259.6273921728689,462.2394386074252,124.40152666197713,272.2502049369826,448.7336774223827,360.0029164777736,65.86429919786863,240.92465520243255,495.55823416597354,377.50414100059317,220.3673620994374,394.0491022369982,376.0983152749395,441.7415889362811,34.876891977775436,266.1619149168936,32.35869139403103,191.23138320775146,27.874054011255865,11.521384141783386,396.858835393644,425.79075518830757,432.3184976097142,390.24272206363383,358.6636077442233,100.62917631987945,236.0088031176575,481.4486725088496,83.44461298297378,293.1700734289853,236.4613326714621,87.34893574214875,151.7513379337373,381.8027766514491,196.40999939015492,59.92468728813583,282.0379956799418,139.22595099549017,317.94486805008506,419.823774689653,139.62272684841503,190.3877425706001,5.560843722659636,111.12731728372971,374.9313692817415,261.55326808132395,278.0599165870342,365.7280633638433,88.26710022668126,125.23644426092106,420.6659976453095,0.8595799643118518,275.88028665962094,57.086661268668905,119.8326987227879,488.41540438316497,274.2765594618308,233.68990161430924,384.15921421050035,140.75187882959762,223.94278934411872,344.54639905325337,185.23264861727517,179.2921291330336,140.0196695570346,321.8656104574572,362.9514713754659,433.8034383560591,365.5694469151254,366.5002829694697,322.9383667204444,97.02970615213735,395.5351381956591,181.65656130056286,113.87752203341617,483.8676133858165,179.4942090067875,56.1366004334809,426.1479698553841,492.99961336628127,418.1127031973509,247.24402381869126,346.9989330291186,160.43184502708596,341.15825776196453,34.409882728342225,45.064045665019314,451.3128686349014,325.3536272837564,107.37783081305142,182.68148456785426,315.73907971892646,493.93642131290795,60.420538974782055,495.3552472728342,212.88492555985948,366.9671175859803,62.30620602665149,378.2762701843223,77.321881686931,43.04520612613516,391.94868661214645,3.1223926115838685,484.62629564167247,418.33096069986277,363.6744078848153,428.2498288830312,3.0549548730558485,337.9584929097363,116.3277505481568,112.49292362963715,466.9641166886643,324.2400186898806,205.4788675851621,159.0176111417214,292.96872296112053,216.62751725247176,495.01812931165546,358.5452166223879,239.67332500646532,344.93913171331593,352.44842312623024,352.31809546311564,96.90467099555278,282.44092808631837,92.28275499431938,279.6439792517435,298.0131321143258,442.92488751561507,23.892972876120133,417.9578123614661,44.92733387414849,486.5466365003244,246.58976608202587,362.73907002597304,367.41956456687575,205.37184361618864,457.4173144074205,221.7789539756785,225.03779504281673,344.3339401323903,64.41874633915657,233.33705364571412,362.02445113648815,496.12579963790193,209.3125410780604,133.99428218546694,39.22134438063951,181.61390918378862,225.82318046872862,40.29108702075823,201.23859196677708,374.4072395498388,233.9918950024814,182.24690589257887,52.64371858459715,247.3574867538344,326.4206269784552,340.38916618334235,148.9952077549922,81.35134840038872,193.5454827803863,174.36365318239066,111.56967214392688,317.6594061384488,439.8214838523498,251.36926532442027,418.3271394616401,352.9798563406106,238.25551358687912,18.537457319576568,467.8830404883457,485.7366426720856,291.9419693810055,212.2726788385325,206.82039281852926,0.1898916325889788,175.77394535620883,224.11527063622606,408.87103080977937,52.85772579653836,265.24319682626066,170.06690600634843,72.24357790375868,391.04232559094686,365.86098947938814,304.0163746883889,332.2911885014472,36.3869245970192,487.8581909770866,113.46767225133792,27.638869979394688,396.07165814106395,402.76354596035935,209.65141728298053,57.26600792378167,332.2600556222852,140.81712573897843,248.74928396961593,243.26944432714637,408.9335599512217,376.290886891353,300.2165675166435,137.27894756717552,241.83125936155636,431.7814707910679,175.54123605538052,109.72068715764927,394.2264933793195,366.37494699012575,80.41002082950288,123.2402642463457,355.4737361677308,439.85190912219116,61.283356163523315,399.4837528475653,147.24383008093278,342.97337606717934,486.178485148925,94.21050045590795,253.14358304610985,273.88304507158887,325.8895516783221,423.14129370273355,250.96450056728702,228.471036046346,41.836364798435774,195.56771111941984,406.18239975776504,484.95807381015277,355.1571896855011,471.44578812750007,24.455821756065422,473.46456200746854,120.43514995066185,141.3088054132855,48.76921736621309,188.3443448414679,44.128078221447595,174.18795592211856,386.99704635564933,129.07221790225287,329.37250967632536,475.8363757221156,383.70184743671484,431.8148316261944,63.83499251889313,155.72815524275774,61.8975373213092,159.24658999651086,169.34328269814068,143.2528289369398,382.6881326969748,80.81601013391371,196.10506308868858,213.1541458103162,131.43428237350352,462.84790239463456,355.84572036393746,92.17522805243672,278.6725458935041,407.5304658772804,54.90300566376971,422.2769351883423,343.0696821016497,150.88483387025985,387.54425988128503,295.37197051990995,141.70961220867494,241.95610031315306,99.64230234489291,176.92321891217554,471.8274460509554,324.3338588724325,342.39868501742876,458.90915714646474,296.9366998270539,56.78298644172808,48.62879553832644,22.183096489330477,193.3377540581862,191.2692270858105,322.05672492601514,237.88930291222687,179.33654201522776,402.41491827041233,362.4374035358404,465.94061941412957,252.3312787836871,31.538046305635724,355.5825847537657,393.9153322483178,149.41319933987518,168.7908997825164,428.3354959351252,419.0424760773063,280.0681777346086,279.694933473114,208.42282685233027,106.7952393174808,37.32503749088178,0.3199786696318485,406.14619534191786,338.6878945995127,287.10547585767756,309.5688854020362,298.90425059239965,176.1451132417996,374.77065554449916,335.62859626568354,391.26482684709595,339.185267954014,34.914074483703985,127.59359190701925,152.26942769116104,422.60485978809226,333.9560060121699,64.21412682645122,251.78853273652058,122.73119927560172,493.2747874762362,202.29649728409538,305.1746330722781,478.3451546737234,340.2022271699202,20.956524723784177,303.24850523412215,488.5069374768736,127.39039855446255,440.9011867933773,159.43429824281284,205.05157713303913,472.7421994942279,208.09737735081944,158.14367881725434,463.9484209327488,44.56357346642936,332.8310343967462,361.3229475222672,238.83566122442568,45.9759749044738,434.78387911096416,185.3597576065611,177.4588460103006,2.487823719047211,427.7797558237826,387.55264190934656,426.4026113427206,183.07626670421928,147.94235505325327,272.8042023135282,211.42103111675868,490.59264527174105,375.6474717112623,290.35936557430654,479.02745439234565,306.7576135329113,418.357792040966,174.6793508543637,469.7027084624937,281.659044412526,325.48813886316975,56.03273668042563,214.53907074419155,305.94848489024787,306.2308106708879,413.10602778689554,385.8796394110465,225.08163623197808,340.99909075454826,213.61312418191136,377.25892033498167,187.1174318796167,346.6243143492306,446.49538929766084,471.2359402974613,10.326790737011926,66.0458972233191,478.8375845626097,202.91525960383007,82.07170901025917,369.4403423106479,301.5113858892562,4.22382571163793,79.55435024371272,451.91527373999173,370.3284765811573,338.8476905460013,353.3836490947334,153.0970442680667,270.8205506955943,478.3523884881048,193.26261918475728,6.742399536220911,156.73727327624988,191.94788375782778,383.5992057472004,483.59012711246373,348.2286889089873,230.19623069740047,410.9410940865532,335.32084756291835,264.93323467920635,446.4267261706942,93.61469015166013,360.92985018944734,110.6447788166135,294.86982203068055,405.5942943614248,83.07854584781771,195.51315382374733,499.7001621507199,231.9242228902676,159.31965287900596,260.48209629306376,91.57196562040693,5.559813180912032,18.415774214481374,211.2421763330069,37.27145329909054,313.15261636937265,265.83765610138175,382.6102363925973,269.2633300062951,41.7766920161099,438.08774069200615,49.84038428362236,14.465794795855302,287.9394987617231,237.79824631174174,136.42880518393318,42.80000501850889,153.1884485941888,469.1611618806397,491.00829381461807,289.3977542705697,3.2261150477214118,80.52151718409095,184.36474530240977,468.96704993434525,340.37722151803354,472.417208276947,300.4486328852977,472.37587581586035,17.728089921397295,24.381327580223488,460.8255200347039,228.44061795002958,20.207642600761353,142.77060331448487,385.5579557240625,251.88034327723986,40.414303195961956,278.26667546878434,409.2165440284066,197.11450707229127,102.91437599041642,284.0664278063042,231.89828906984678,117.92443235419047,181.2557559078365,121.54722279105489,376.05282251095275,401.87079923418946,11.938440630654302,330.1797218497027,377.2318815708926,336.58068765236317,296.4894570335285,449.19415307115673,486.837669054922,382.9586527878439,125.0296464293159,286.5811353769685,480.69764739518837,161.37985006217704,214.38904627874177,381.23356402062,166.4174253502956,170.66985583578898,40.422976372056056,326.3920764994095,41.60002221221215,82.13595490653469,100.88124592645786,105.73935160547366,217.93387220908855,490.5842464727556,246.43797232210275,442.86674845864894,131.90265717956228,495.02816294349617,302.0396928024562,292.085161471074,151.88669101214126,230.3052701492667,415.5888907091183,222.08935419227493,30.37533660215064,380.62374449697967,441.7566593749211,479.9469176393222,477.585364758639,66.76782358824407,140.2580264935087,7.227144329465918,58.89465815578032,20.130302066520002,433.8533169105419,58.39132915930356,357.1320238486083,382.059214024558,72.70766837329657,472.3646500260215,155.87052395182033,233.82813768604694,155.07972655944158,304.5079747201619,315.36968143743303,32.192020721879324,283.33125430765136,96.73736722702064,225.3009079960394,359.18535802239137,484.47041026873393,286.28556212841795,178.52507494434755,497.9414758792,53.42823951428777,291.37177442438514,402.9881861284017,66.52626698151253,451.5881638452729,57.50347802234146,346.7562886714426,310.9600539751324,133.89972753557555,214.13964163638698,33.28944629599728,229.05724563311892,373.41705063416043,436.0379432889055,123.72908603119714,367.76866928802644,487.96113224143886,314.4904503060627,344.5885616579578,48.04119377870742,232.23354224264358,33.31580015109581,3.553380123020422,67.2201327442955,198.29728815295155,419.36070054806873,418.7680264009107,106.81798176967617,64.33584668691861,39.25655388352567,395.60122330335145,69.25244791659601,357.2369020154489,143.96886110364937,179.9411478931412,82.52470079834407,94.0906796589498,9.412956160744557,168.09008442262163,39.55229961179085,161.46770051670978,427.1839194580963,228.9725372472049,298.08817474609293,428.5464147574403,339.1190581122502,94.25333232767386,140.86100153018322,343.7180316524343,425.6214877719405,354.388830911861,225.50599654098758,429.5166561453878,270.8005315797316,467.8930719131791,386.6464473216228,126.93889898509248,312.5729886220876,402.77038779302865,114.39359684725846,64.39348969924197,35.0182107746122,321.4572154701673,12.397081240624663,49.1977613233564,384.3474573785365,143.69412703759997,358.88956091303135,412.79728756526737,356.8063885819561,412.1347724557403,277.38608721141856,289.56658305225915,129.55707910683535,137.07364400113764,498.1505825889645,384.68869677666584,209.8991170639096,202.67079836727663,252.45710258516806,22.993043289459834,267.8019852533423,490.9080784752564,272.30905880193967,170.15594562577107,476.6937658911238,67.13454756395276,432.9503025292587,186.22825061079473,274.3049865840965,334.7486159333681,363.8705502440517,275.85659652042835,395.6399479952678,51.3278139131218,164.2817794533623,197.31658288108656,235.41452740886814,17.453681219817383,401.390385718011,96.45709073230502,301.3624228055783,409.30196521571884,310.9127813506214,410.8497716027755,493.36418963520856,87.83270603276094,83.9881767627797,304.56748704365845,341.8776717861025,442.6827709197249,487.23679974484367,346.26746647048856,90.38944816365368,494.2105597425439,481.1036273756104,193.4362874940102,459.7297103598442,49.61666289494371,445.20449270004514,290.6901879894278,9.983007396395017,489.2083951459486,229.65341023310026,15.57051563051093,304.508830379992,379.7463168761197,153.25381496432223,111.76476176056049,183.6502180155144,357.06923136384194,359.2522759549116,312.3631244363935,251.46725886677402,370.57975838265924,324.6255778785835,52.34945835326887,59.43645760714744,307.4273684375086,211.70253401321548,495.135949896202,482.9306829833967,18.115379043079916,163.8855442656967,43.487856730827225,391.9456621763451,385.32648906334146,248.53880267316353,16.894827493511343,384.5015071932213,343.07398640461463,474.47288547892106,54.670578885479216,395.8745358212551,341.3117299220226,340.1945227381556,182.85962397806753,264.81553439792225,438.5731330649043,406.3791624803501,499.7123510389713,214.54551635036378,426.1486321847074,104.9861483044403,29.629124409076056,314.11032739980413,474.95087802621185,91.28277366864846,360.84791471191824,13.53153047376654,277.71466670018384,53.77187492606461,385.2240033417883,93.89468763161013,29.28731551810726,76.06436603058219,264.1126317029371,227.9748348447376,288.6757603531458,399.51004994131335,112.55087656381147,468.1399750955429,342.1600153923542,336.23573343081347,52.014826754599454,16.78279328130794,313.304841236125,462.5376951496716,385.22884832715374,492.0111653231606,16.750831115330044,316.6651429694205,145.05625951194557,243.97095675943882,496.7376957824404,258.4482304076062,407.44440590802856,426.1044584917235,237.17088734153512,477.98129573662726,342.976531505076,333.8547173926856,144.70056637291816,216.3385320868072,380.924552193326,92.51305390606113,279.23519547020135,303.1970191100628,32.83573669250339,76.3304991564222,301.25840496375025,8.87178698506974,27.49715518385909,494.09363867813806,264.83662001854714,200.58432609014554,422.0017116448156,353.1236335984628,65.06391650889609,333.2083345103314,89.6005798909466,482.62939026040164,235.99743782367722,360.874668569642,215.81134148269177,235.6003317963493,310.0929204999849,201.76404476420717,29.8329732938295,0.39401431969676715,179.6863902046457,337.00382500425064,54.98099663599598,179.47293122538466,118.11674088656432,484.37796196076124,491.9018019910102,270.355708977292,185.14697337101393,36.415562256497225,142.24465450943535,178.2077207976016,271.0807798458239,424.7759951818988,21.226567414078023,278.2491810345532,219.6339040072892,355.420669805894,41.42239421968874,216.64049778046746,231.6533965864923,477.1394977429436,281.3484451666427,122.11698377214341,239.81967095906697,156.17710372687822,153.97617384168583,162.1518894215206,248.77247792424663,175.70509956110502,422.5596699218641,236.09536394966045,190.69923915418153,342.01483189081216,46.9371745011129,109.5119596501719,313.66531151742885,176.66607539234514,84.83403588612026,39.297917191817746,307.8491505525668,140.0283825832883,439.80941615640455,86.52174274794366,76.50577008644144,232.56706214906785,226.05501952392248,16.348406225273003,177.91715882080894,102.15648712990122,7.930996285856695,257.6630415214777,82.44529958786461,425.34178940175127,298.83178537779264,499.1669386747186,34.91804565458556,4.330280750821203,116.68271538883212,92.65917686511682,454.8932482892849,496.075129883395,409.75254557929827,258.4047857367392,228.18918491511897,126.60837939722059,322.2389209970548,283.2586104566129,169.60734301287096,346.2510311231769,123.67359694198232,351.09341586562647,484.09463379340355,284.096231715407,344.08071508674954,125.77495789031701,283.3224104794102,224.07830636799963,439.4695239177858,355.4532775948012,88.4078535425692,289.1120608149438,75.95113858346514,240.59682035310215,425.22932224370004],"im":[207.77924792493218,74.03710349936543,128.47461502485714,456.222614163177,72.75067833928217,200.38634693285263,136.7529386241172,233.03048416880222,432.30803460530956,393.7841751052329,5.966706289896151,177.6268182868118,234.5795254293005,74.27342214776378,415.3583457849528,95.46488511274408,423.5057589438599,343.8482671987786,478.7886441140471,303.53144644759453,446.8717968621114,38.97998374258505,265.9974972954834,335.28207529520625,149.90647727166538,143.66222439423026,405.89849376766165,248.23465525153608,175.36267616259425,294.31319562715066,200.36768112321712,379.05304475538037,91.43570898469267,26.61088248837129,218.51067985362914,388.14853223565405,165.1589161438084,135.2358174488365,117.18079993186059,340.2437999716018,150.708653796781,403.70363956177624,149.72533959219493,160.80679165476852,439.56567903486877,153.51998985613258,254.738738669551,139.4423861841848,197.80178272078942,199.0362698468926,346.72447606496235,331.5422831249735,368.9247642302848,262.59327609817416,417.31359914034016,121.544717443544,66.40445713710774,343.6570461679246,57.7132686968731,414.896570092525,8.512325910731144,93.68957355061059,344.5983818435191,386.0372882190668,272.8768229000601,271.2593524500558,132.5490564236239,106.48334755792143,268.1401491188663,262.131449592229,388.29642843566126,32.91047787773993,69.07120710027881,35.19402011845152,129.02985383255728,162.59965997293534,28.33614848609656,239.50541496996348,386.89709588278566,472.7812399187954,214.77595648296966,290.753257201959,112.35764963042327,154.34901489270501,436.14387694306987,463.4459992435265,265.9967706214662,150.64944191035667,417.98729814125215,351.7685041110934,39.89677387462876,177.3295441423093,65.57685360928312,493.0767100913207,23.978239257664292,464.42499094211075,318.84706312958133,108.80187606271686,85.06875982761886,409.28232662397915,30.307483685874104,316.32152418146654,348.20561802274887,281.1750480459093,452.1499575815442,5.083294738618904,395.35915648481756,277.87341650390186,418.8742476138751,377.2750825775848,469.9340609752887,250.55784436506423,379.4490010459783,264.70717894740494,346.92905223271777,376.12749749402843,123.83320404860065,166.3456544857107,82.45706417980581,214.14902208244456,245.97152361698528,84.353752472337,58.401554159370875,442.3331940683955,459.5607019328687,115.59755381632053,67.02882323096915,278.89638633416536,164.94571288547576,273.42577833229166,25.46216048260863,279.8571698739736,473.21419572804723,241.51099710510994,476.5443294399514,450.91919770606427,248.094691136867,448.63037227181377,468.914350129786,92.6125045640731,208.039311748894,363.78265350496173,354.5042481617019,162.28505961706276,168.34227391056456,226.90923496090733,336.7332962812378,442.09341812136427,289.5716955803576,425.4321686452829,226.29469388726065,238.09328836072353,498.09793822357653,104.33267073084241,112.26464675359216,49.72878809120329,473.085906401528,224.93724084098244,45.46430542774538,193.66948285579022,135.2837232425045,188.5990726698409,355.7031602005356,316.73859232878345,243.488904116558,281.6249125160093,293.9617644393504,439.31139250011387,118.60106154810657,366.9158408595483,212.56868389241833,194.17981631879312,148.88114740135472,223.50705325995412,90.53163162308265,289.12759969810674,9.724816196013952,461.14479876595914,471.34796361420416,359.96001079005714,126.0713989526393,333.33444742552956,90.4959937723624,47.60782628070348,406.0780736453859,40.3384138103835,47.84818406760427,138.42770635693202,439.7473996903192,194.32484694244823,191.3458009431004,344.95746559008876,389.3860963003395,31.953423644148437,227.92898291922526,425.2280017694886,386.52403734441054,179.50746451168186,206.5839360879711,248.64236194406587,402.25746934943805,185.5986347473908,362.6953399574474,266.9232605021442,58.14714559442169,206.75063956872154,119.65118996031254,297.1729368837243,372.11995849597304,405.225335678297,285.6079735848273,176.93232982965512,457.67537592928676,339.2532730806989,205.763168614444,396.7896203539265,11.293303388262398,371.38641083761127,270.93170479164144,235.57482810532548,140.0726753614816,177.49209747099115,107.93630879504535,192.21701505045152,408.52626134481505,92.14987245112394,487.7799492308982,73.63001019158521,170.97794401142875,154.5033057421049,415.13602396952,428.4844411092613,432.22415832221316,188.77517089633344,299.77799643849454,392.6846252078139,38.902932985588,66.38300737122727,37.543417582478696,320.22259888350936,464.90833329014015,285.15874163271303,84.75349745949879,159.1764545346601,227.49843211895893,229.10236488183432,23.947704776717703,102.54885009800829,374.5507087162515,70.7912040194082,252.40083168896643,78.88855302379527,296.4039455174219,442.4908849367499,312.6892979712177,7.555433058285543,71.59855933237202,10.961131512268185,455.04240120907434,346.45762450722304,82.98416000537124,310.50325663623823,223.76861262991034,426.58307723164444,182.18391614484452,122.04260546438795,362.2174840127904,104.02198713369859,455.6620453977278,39.08655098436953,232.85830776468273,214.2267521309169,352.38693044095106,344.44693518110313,174.1049853247133,388.25333037718934,455.00823129875766,203.58466580752855,179.4657893932916,117.0113234473662,130.27380939568002,343.1800898804831,376.5530015555315,401.80492501889495,405.82900986434055,364.49558048028865,467.17864738428216,481.0681671629221,256.3232794057542,163.69759891858448,162.79670471152386,36.99412255087964,295.69988656521406,495.78877704629855,279.57958699331266,287.5693133990327,285.00888936301817,380.948357235809,462.4967820188991,103.60081441830205,361.9158418258558,105.76854469870189,49.07807452980373,233.0874583800546,402.22602342320533,165.6150883214337,91.83744924373104,208.48625668287235,408.3357313919261,345.33467143746657,302.44046789028243,57.42083178049684,324.4709679069592,147.97544912451443,455.20191764484343,170.50574977900112,143.84238128778526,162.90335325077942,96.58434310553542,21.60748732184803,176.8106711961216,258.008030921276,284.7387354882217,80.87717713681342,454.02019284267647,427.2878759469173,86.8838023307268,181.07417957947092,306.09307495738557,108.98198053989493,355.87493312625827,303.5665069323431,75.30124279710616,72.88301448383861,401.19381610821495,288.87319128894717,426.92071176765364,2.974403323229513,242.9661636651971,479.12535073199246,216.66812629218845,151.46694262288761,357.3176850016324,10.22245075836603,144.86568945494872,327.3892334900845,230.86006313129525,40.44081998800786,298.24128071866386,222.3317852743557,264.8668212893669,304.0092736705585,457.2597130412637,224.02027568480042,100.65999279095206,308.113571744638,87.38625306175652,104.4042901486626,68.38663715702198,266.5053702028505,252.11298559662677,487.304212121202,410.05496522110684,211.78174970414554,136.98987821581377,53.07048783218382,117.47227507285052,433.1212206373763,363.45901376016775,284.6153954532086,389.7004242991439,471.32151421753076,153.42772992557352,31.126463777336966,245.68105426817033,386.38983148139414,492.8313852102849,69.8164052727619,490.92750463788127,393.1684327265674,54.04867385524437,435.080992690513,155.2653008876631,394.87199532926473,117.9498438511456,190.658198062556,248.67778905570358,493.81554879944525,109.34502056474882,181.4811458429668,494.8659556248083,183.5102269056479,198.58600326585062,53.747220956535614,456.92339599742314,154.6470559702473,171.34892419379298,171.55834796540526,489.82059121284607,47.90871052090273,205.63325762368345,383.7924586744858,477.8602628023225,41.34764574869354,408.57304665733807,188.33006246996732,177.03733577723247,223.79445344417027,362.32826678083086,347.2196090991879,459.07432971021103,448.9734770739675,13.133208736389012,78.81753334428466,413.41625449194606,229.39770629920486,23.705039548839068,178.58028632520606,409.63724613035356,64.37149955911548,113.78948820853974,2.5443150218531496,369.5470315518663,347.45888058001486,341.00839835732387,81.3170164270296,234.32381541773017,275.5117965464754,222.6517933790585,282.65918251235945,432.96245385630095,44.003179238038314,470.34134751107894,59.67984695116713,267.7925699349315,329.017439245328,218.5453805008768,245.46227295761514,175.66870966628156,456.80402691085567,226.11582194406355,119.22379925292947,259.8922391212815,174.63286102790045,173.8459245468733,149.88682899733706,437.6538123305203,250.65239360711567,226.23224643695738,72.9213289582381,86.72846434761716,494.71805600139487,365.5259769837108,182.12703723409518,404.78964896937464,362.83323130777933,147.39045593746326,189.74949893663995,253.9978690881487,257.3386731849804,41.21182618104247,213.3800726394206,12.373740912399622,144.33594122665605,147.76911066918308,21.91404170010969,491.63203060497926,137.15490135508767,95.09217462249397,303.3225797385365,39.45250019878222,391.06876533665303,81.39158380303857,110.58263539492663,30.448196204655332,477.3509661363221,347.0452509873028,218.9579082015305,83.21786120498187,459.38608132987804,402.5930037488734,37.16223206359071,391.84479944941717,9.634888424727484,348.8152967358382,430.5214160925316,220.72906354765675,239.09853514468037,87.01678421233471,345.3345965334613,320.2657375790127,346.7650524109145,443.92271842051446,171.61804513885838,37.02172982898455,252.7029305019437,429.6460037417407,393.73413005130374,337.22593637337303,27.413780217597107,196.67110852084778,126.00227239123485,112.85600363170722,445.5091449332541,415.4979619359085,475.3460154294482,283.3499189759009,324.71243898140534,55.84212853088688,89.45757604549254,244.2466206125492,144.46006418330626,241.17999675662094,12.105876367709879,385.9783870762057,493.9939376026545,223.98707954366114,276.781253104038,127.7154013362416,157.24898505023688,373.6334336845779,109.35617128276454,489.9060914337401,382.312869113027,470.1780108670652,87.60798453584273,174.64666234111058,370.6685145099966,236.41561154935465,216.96191664674092,61.953440509576964,278.45117837131573,300.18837584513136,118.86940665879042,140.32008550575335,102.06685555181527,216.39661218588157,48.32113844636976,53.30129197035649,153.49202086858583,124.35873390509356,85.00988442703827,385.3484887812764,490.6989796301717,109.20256219105417,190.77067864120568,389.4847325315708,261.3611756714,303.4854957672205,107.26033191253659,15.720130569294778,26.744517459057594,18.081989092875396,315.90544053131595,153.91270328786078,127.11470490682252,94.76834372618315,209.63287637662876,199.72896340267533,132.09170225062894,480.76909910148436,91.05445074791186,272.73377874410806,287.7156602825521,9.693410785327261,367.57643232439864,43.83462791245041,229.7683364184916,468.3625057787568,292.2604110111803,360.1923510112942,273.96377999832856,196.78221854517486,49.014221963813554,39.641492075367154,372.62278506070345,222.4725517292585,4.014779522197975,24.618042253953586,261.29181971263415,372.16045721256074,78.81467815594844,280.3389910508207,441.51297266127057,232.3241876806772,313.9309159690029,73.84324805853937,406.012350076686,159.21023629687582,183.43248535964273,15.388637870467182,88.733876354802,202.47383797187746,257.65988013325483,132.87366106360543,416.3671840425035,321.9969109214742,133.4605175391893,140.8228181259169,492.60848203346666,211.20454256378918,447.72955237514424,15.986742570456848,219.25930681686035,280.08406214909155,156.49031763451194,279.8627155731045,298.2498687036936,276.90582541803275,290.44852519173236,11.495814922003134,287.3356059871769,496.6938516338285,74.52407871592459,495.3777593006599,97.17676804165565,426.5211869329341,468.06931361712236,337.4734562244439,416.0143432462441,27.57748068126331,337.66752384028507,424.2360592336603,441.6592582683552,162.30371586972913,193.39369828993736,413.7536448715575,485.59028350181586,121.99225707069982,33.692391474733796,186.60389268344935,335.18547955597677,126.56677763762913,430.7019540901802,358.537082111249,476.4253415661883,403.578711782944,492.1155012630174,25.28121051093568,34.01621256103182,490.0353409872705,234.30431497122316,423.03175869110635,124.58936482602145,107.10888802510199,122.45036228911388,278.33209619205013,319.98936905078466,311.1211994071194,180.02491474526173,89.11832388581664,184.88712438158106,258.7637929159798,164.3900054401567,470.63444622119164,383.5796163440506,440.46939330781333,483.9455913320461,262.8655098320444,314.01558544142296,431.48319648131917,459.1263461726117,167.3308907893961,438.01153124763795,164.66788668800004,240.30304625917543,286.1289116114622,27.685428571147863,253.98256070336888,273.2069177865539,498.15877801741794,70.99817752102433,241.76143009902884,138.60193082315618,137.358972919168,275.7543667987218,497.39225159593184,283.40995061623244,400.1833483477852,491.1064818370984,311.71623065609657,111.6717200205446,259.6427515062331,191.37574909293076,283.4480728082083,374.7809001064706,161.44051182941433,492.018051899866,0.2974104615596218,476.7599213647178,374.92917215126545,388.4717049550992,269.16743262755847,362.9086619494455,196.2775899671675,75.46946862403969,71.22434149726442,77.34171122845268,314.7117968289309,109.04523708700798,437.8703863582959,399.0020984150541,428.9933428741881,260.54240601173217,47.03233090633396,53.534083184778815,466.1803819352042,307.3673254682336,416.8581973804918,24.394381929164656,348.7927143838757,57.941714940838885,109.85209921908468,203.58054347570908,55.73652789747974,404.76554479916524,152.66979504001975,437.6898837477189,243.94332095712667,45.79372144937466,28.739445662054774,24.646549421672994,13.094652559353381,41.392078611124596,218.90561046233458,174.35139777077657,496.80755761061255,327.9219153582269,45.110128283991635,360.13615012820554,56.414358387004484,418.6576160629122,116.41639280111227,302.57756825961445,365.3049101807442,244.58691412150813,329.8082247122386,191.79615313964882,462.10470641966674,244.9435975914157,138.07542038866328,456.508764815646,449.2091374607756,468.74359721688097,277.2898365481691,299.166355576461,140.50144063772674,297.01842263862443,494.90230990079954,455.9452103025097,43.660352042452445,297.2849501642503,278.02488549659756,15.411917658777806,73.30811070810384,125.59388847701769,460.162361922988,119.24800273897873,40.475503802223535,329.4467180052165,93.85265589423253,202.46807932975997,218.96274014173179,451.6676935081417,1.8768283442540667,289.151638229169,107.4846151890041,203.11539543812506,312.9203474134564,454.9724382404693,49.94669139840124,257.4966993064424,445.87188858996865,122.30091432994206,150.2411109555466,462.7776566405271,161.05676593089524,39.48068658801207,42.14055526347216,3.8951337566816013,99.5813080265967,25.991539469548353,413.3026880063796,52.03351532391864,434.8208071172146,69.67083923434592,475.68473083326325,461.8058689265521,314.436178121074,305.0307947671876,182.56260349805098,352.9094477365355,391.95512765344466,186.554430288857,88.40491320222866,87.27135458838953,188.12366793465364,127.1569576151681,109.76986445179826,37.87898584695826,182.3332465602495,345.5869571636565,356.2571747096003,451.17014679677646,457.84845718063536,425.2261979410361,239.2867399491565,495.7922397009077,187.14432647889555,7.649388706650884,14.88342273196508,405.03724018158294,267.73629061098245,288.4055713516339,337.3910278900066,297.8753098269612,61.43397848918086,195.67877732423221,285.39547526997524,214.22032439112283,380.64892835404305,167.79430367765536,65.51347125132922,398.300599192769,122.4974030066942,418.4642588149799,50.176516981553895,462.60230504170164,223.02496472010492,322.4123354534205,214.52456600816893,406.7170394647971,271.955323258535,374.16780539848037,202.9935612405157,348.78567219374423,385.028474110509,483.6155871347997,179.78375054344065,153.39418862942767,481.1760368157989,466.6803139557485,61.07589766329902,203.978012768939,454.92636607932116,394.892601862067,188.8666999088304,379.51607753873486,253.05316805699795,218.79761150051112,461.54311747504084,287.0893947747286,365.7530252375626,460.4413010961863,227.39321708214044,106.44069441064296,44.7454304849183,194.03719178048473,30.64205089489458,315.6909133890592,388.2317476005087,306.22180705601767,144.13479561702104,379.31291683697845,70.95284024038418,460.86439133468303,447.32861132686264,52.70294865584613,159.2768287975066,146.4982832389262,262.2224506774049,198.8805072556692,264.4445769326812,260.2787972442736,0.5202266066434147,194.39723021431078,274.199941947511,80.14472229770564,251.1219841105895,0.7520638613521813,25.855112478132327,11.054044095249127,280.6736826755966,290.71188965050555,54.866405308972354,99.46505460974953,245.3707685001405,19.299616794969943,494.34616713455637,460.99100762386126,79.02687334063741,408.5012874039883,367.6761688509017,375.05557999081674,2.1481757475411145,127.7512248605316,126.21294637664072,163.5065276404184,296.0292441898326,117.70900324978395,449.92196781341954,487.55632723610654,180.9117630253847,87.04243853217042,260.0018799986591,477.8594694999587,138.11340175675957,79.77193075452182,305.5541878343407,353.88597060945426,353.12019041017396,386.62270917009187,105.9868892605288,165.8485045602035,265.46479755235333,219.2428198612474,183.14891767113295,322.7374703069007,389.27482444013873,275.34658107352317,74.69441965779811,413.4286824697552,384.7497317305203,449.8982370347273,395.12488706829953,266.5848931975201,243.4809616198824,157.46223307241868,306.1486396121907,297.54708094588847,107.58782184734106,154.86296061212323,29.43454025662151,349.9372698951171,398.0636272617769,318.8206050184772,75.93687285516614,121.65338545482196,328.79569073189316,326.0731944023307,331.28016094261636,140.61323338712273,88.02342599001045,92.7949602506385,72.07611223197851,11.377018262438533,338.77268102224076,308.2312879881045,64.1046610068291,343.055890843893,195.81863947292945,209.35200659293685,111.56437800272923,303.8918382802451,282.2356295697953,52.634266289911636,114.30974512862169,22.164706729610238,212.98304924274248,414.5507843203657,478.3412284848408,228.24049679389014,272.2957489017215,198.29311737229483,495.37443278818307,388.5223881271804,202.8546839917942,136.9083514164111,49.26240044116459,440.4235357669353,136.2536120731457,488.9126929786479,385.0539876137492,402.79475426650777,212.20302570145665,210.08714783263693,123.12932451306047,373.88675085744063,319.10295216180197,302.15374095734046,106.63479882642012,254.44056592604448,399.71153279275626,198.85313229255596,229.799848854076,455.4231477365679,188.81810417701362,124.88107040404417,124.46809883192644,2.512314923508452,377.4185864675856,252.05969533957972,58.48435069814728,70.11098465991338,468.02365258675803,255.68232387214317,28.567961614755276,168.12953550083165,127.73251146680897,323.96480306833973,102.16352767070369,387.4952556615759,80.92543893406545,116.75481557637268,97.30139681896388,446.2124148591944,138.36691536045785,255.6711993473063,481.35652977353584,370.85981133395507,202.41413599719127,403.8767427758616,321.32167218108697,257.4830563558429,394.2086778738876,384.22681938093393,342.2866449482841,363.2462734114071,262.5852198724532,85.9865109537692,136.48700261075464,493.8707299363202,379.8315737377405,294.58739706108327,272.86220347451365,57.85387053304536,372.44398576115975,430.52503286420387,200.39514495715827,429.2800963635092,475.21477156976476,357.8686069742174,304.8049777575164,399.3542699797903,293.91064716663993,244.74374750733173,394.00404995064565,321.2420514709472,209.78928550497068,263.4550417472803,131.44353768268513,416.33858641449183,111.54567015614703,27.14171248158759,320.2564037348714,107.71055620633196,23.183816418927748,77.92291148192886,238.4155094870729,102.71817441111753,82.30875104932444,482.10966523738705,416.9159249556396,31.893425104003057,213.3816954342732,313.92203287812924,436.07079502350444,241.10685073675486,98.4707559487339,245.43335329935312,207.32049324520173,134.25736078283867,182.8151760528266,115.07913253115365,283.58741670490383,92.26504101102229,368.86273470014663,309.78957565817745,459.18894076153003,296.25605457352424,284.6129581746943,367.8827786363251,226.93989058973008,344.1651551922026,457.53015936910634,225.51081578673725,97.32642929291057,440.4706286895709,395.0670093093755,95.84448779350608,446.1480338401277,429.122701205722,417.35613031817263,213.91507872136606,185.53940804960268,66.55267909190931,117.11944732278867,209.18461795593157,396.53484342868427,280.0248500312982,333.05777143283854,51.51641939076568,149.79841986101405,460.9919887157374,187.14394302484172,167.7726603389108,188.89122156211624,197.0630180650558,76.32775151464932,308.1051682762271,406.0794819769079,362.3167263902577,457.7441712112205,425.0690669994489,148.86183018887965,445.50718672818533,289.5340023228565,399.24226511209173,7.395295769606625,372.87711844889446,460.3598323768537,282.3372300515804,294.4315855787415,417.5889224409356,283.59508044635015,214.80464364694862,46.95900961590138,480.2515962792476,6.173447274273713,445.34771628847756,14.64453292746748,327.1807028689875,27.194401034179027,227.957636606967,379.81159649386944,49.925019890046606,324.2010680940846,382.7680961620006,253.05928257882405,68.92369807925091,101.3732720078394,170.35509354725698,45.70964186438064,61.759417897169435,126.81524119878506,493.9488387884611,244.30967866514285,287.3654940255418,430.5217715263215,230.30180024680513,385.0182022883681,125.502854970303,50.04460927543175,239.8314740811206,411.505638339938,485.581665189768,241.25287749144852,29.646891136339228,359.9849105523032,475.85730979665476,123.06924882027914,200.46153737650206,146.9844310143672,12.383036747927957,475.7527120157563,138.84144049645963,435.3708736751857,417.40321582091167,48.83961185123342,243.37612475782,297.970748674472,320.31294520939923,204.64446509259537,173.17054479044214,322.74937008505924,305.9428844157117,349.65003842711275,377.1180584009074,293.4786048594004,421.1597099314849,231.42943952213702,240.22698361250906,424.11364659339614,464.344661788387,373.1856857525817,94.31184813022308,390.46301397471507,487.56160563545524,381.71116756025583,173.71686994575964,346.13407094128524,17.505148898817048,303.78821248888386,48.66196316493365,180.5078304886577,400.9119503423303,194.4449921039556,416.3646172017347,37.934354209735346,492.70215339860937,417.1570819438211,322.48405634310706,330.94366041678126,453.9236492075298,159.43181955355246,89.71759303980764,413.760142780632,338.67410020948483,381.2786315724951,201.6338852653069,54.47068626997697,322.80047585360114,383.1007412326147,242.5515479482273,340.8327594010764,149.34213104398876,40.29607322323636,377.594488858933,137.46886652652657,310.9897328821085,185.8842951698707,477.6460568068065,246.064077345442,6.884334374593126,244.18421828926296,6.687203994756197,24.158807298192862,70.94719618025303,58.41374816604761,87.06860415542938,191.87135182274596,180.9880685918308,228.81277357848995,499.072750085219,177.05122407986852,166.39084392934868,434.4217306445065,187.69146916291024,214.2151975116171,83.19031648019404,192.22008792324652,69.44316294126818,175.6768296270913,285.8863150262896,311.86273139043755,247.95625330440097,296.5483780211974,185.76825900935646,455.58727590188784,316.82810431173203,435.23461272559507,282.6575585606119,248.7674274916999,397.4267054572016,323.76493475271195,130.8598521398914,268.4638694869631,298.45421505777557,374.8086130836913,31.785937939716625,197.14234836463606,120.04306960789701,321.33756815317037,320.2786465143482,8.167325091073764,224.31095235284326,235.89499284243587,122.6694588790358,342.1453113623051,143.93144469233732,128.5321534395979,362.69607082702214,305.3974242387819,309.99542425526414,344.92842134600363,236.1213305517369,473.11346524913114,306.75859450745526,375.12228912370705,279.5131937341947,172.96980087403324,49.19217111449481,255.5553537927653,175.9601829589572,210.76450376869383,403.6035622726132,367.93693606770506,469.99972486423934,188.42880800388218,2.8786815710012403,224.13019446485293,442.1294268831444,355.80900789567437,165.16208969624668,491.24750871391166,126.9283422092039,328.76059174059094,17.16408144588033,182.59023388251893,165.87374920019948,262.70438367536264,162.5479368792897,189.14096935251402,349.4645991103835,381.0455651628766,17.472457070000114,79.31739691085427,171.51253164830416,402.96290722441086,332.961772980519,192.15931637802964,222.85976263147757,374.89884469942314,358.2873190304511,337.0622266805238,477.24562520522204,79.43951613242272,102.98092738148623,445.1674104405926,289.74709339122006,201.57162854610223,476.3923032059562,256.07039192727285,372.70924261128613,398.4435058604535,0.9589459271087675,428.20157975452446,17.64570970577417,424.8698181422814,195.96412682574305,179.92838792393772,274.5857629793045,325.2109428353618,47.76885519157281,398.8408918183437,79.10597805947151,397.384684643863,321.43586668929333,44.122292990319664,467.1983909390043,359.2442453770681,82.35950541091074,474.6006781166309,118.4719328040058,95.27844048347222,332.61499336294565,245.918229569442,358.97905704159393,62.371851757756616,90.54288739848826,462.4474901020079,113.78038738368834,301.34416320622705,274.29979418892145,378.7173311605364,303.2305927472235,39.209747334009506,281.86220615322367,176.11468161443332,429.05342727608087,136.63382911256917,235.1561251626363,431.2634954500529,122.47958664839054,458.49687639413537,344.374293787075,254.03159618311932,228.59988025112466,138.33907957340165,462.40964827964024,162.9471190259235,108.30586581667944,465.088736828264,290.5350470768936,434.3266051378273,491.2624836647772,111.53588534598823,149.15280820659405,380.1986828255551,406.13788303911,323.24889804378086,489.102712468443,18.250189432013396,98.22976479597989,357.7317796209566,94.11789816362592,5.172966581297844,471.8484606741876,148.95610501991786,231.8706202953482,314.6136608541817,408.74005192930787,424.84426775214155,103.59475348560888,367.8493105989831,162.83941875443531,227.8044754584654,199.80318717165346,291.3128113339067,191.15094779367902,140.3859341487137,259.2938882208292,161.8963462357863,229.33481741346685,36.44659108763004,86.4498071432922,278.31897603952507,122.97216748964146,495.4156691679705,235.37491336902184,497.84568830995136,8.377452655458972,204.76044238662737,427.7527997044788,444.99537882827735,279.4481806291531,233.90498007656814,17.236991692777703,113.53860581474306,365.6366655378871,405.842762795371,37.33481828232965,379.6909737741785,350.1236624556313,288.92543328962836,39.39812600686932,112.29143219752214,339.6249344026072,445.35353015693744,419.51174016730806,299.15432843786704,192.7463620349793,53.99792443285456,346.7875520729483,416.63994912881185,411.25060779413235,117.7270645212951,454.38286519898827,127.72060292896103,67.52050938644527,323.8315320475096,155.64766186495294,342.9709617865352,168.13569491534864,456.50240874672477,399.29953312680755,471.428190295316,15.786659721632068,462.38185005793076,458.4243848859071,104.00398902098829,310.81443452183134,369.0363036132858,21.01639143417966,321.8975859189094,254.32362925806606,222.9811739108325,74.54442446875531,147.64983308707025,392.1628618136772,275.86863090247857,19.30903274171436,351.4389114813018,363.5455916236262,127.6431739422903,263.5425300826666,247.29873053152207,198.3081959723414,53.08586036939889,84.21490978180523,400.2455517101986,445.9038423660233,45.37311157405699,242.67365883532554,214.6595630104523,29.1167367375057,411.32920530266125,102.79205497883737,402.19172169935115,303.0015256608337,89.52520852711943,223.22954208726287,265.4059221640357,393.8121541699998,46.32339743631031,44.08455311654325,68.51616175776797,276.34417398739805,256.6006156423576,343.6637194242795,69.98674787819958,226.74699609697635,285.73272091753046,482.7936315910727,65.2434937236418,289.31264622018114,418.09908956562015,462.2719119674399,328.8642768805908,439.15318303674445,372.7245792129583,295.78462030686325,467.06440629852517,402.9492768696954,323.9852061145483,297.3573776879577,200.65570055103387,106.8969481785692,431.4316718439617,290.1005339664886,247.503895066977,61.60953155255922,251.04022175965778,296.2160578192625,406.10790563369403,295.5939969308382,398.4703419823785,357.12405229286213,98.73607340068192,45.57234650374342,93.4982075812939,196.75755209115675,192.55091379522483,303.7746552469243,315.5617412097147,61.02203773124981,385.35410740594614,480.69894224122936,110.43333115161835,7.600055782641557,431.5932944619136,404.2305314426961,220.786713663083,107.32771882034142,106.39757495583646,36.551602228391374,275.1278107158074,243.82211631126194,379.4098679643088,302.454573703291,152.67447414018963,98.92105134874174,72.24321537207778,15.697780717995657,386.33698581721944,309.4307747371562,427.1529846487757,266.4151793973296,252.06566007507237,276.0405025998026,110.59584329505012,453.81593224613613,176.40745824226744,253.82967282425872,24.74628080368946,409.55086697521216,214.6173072084666,205.41123551808715,422.08745282501025,49.63375327612096,370.5421214959339,453.0838015410128,456.1154627368681,167.21604225512442,477.64866168702736,393.4011001326119,18.548366119365944,323.04500966286673,345.8498349524586,456.8658885219051,251.09545273112033,370.7837738179851,99.74894015872215,26.154743882811694,12.499233787131914,431.56517748802816,42.137574729577686,296.3638547935191,259.0780925259436,46.90123942956437,172.96357986574472,51.01851435113469,210.87828790031514,201.44448967154017,265.56299442146405,456.4109830084515,106.11506550973826,401.31641483705516,161.17539039985184,398.31870379664315,392.1173861719835,499.34978121897143,369.2090489400478,101.4163636898543,236.05954990231947,472.5465199714001,178.68883860162876,60.24432182496431,334.4552237420535,357.7270899343861,160.55583234182257,376.9623716800412,313.0428489682445,482.7194069385856,0.42737069544895867,232.77822248955127,254.30291886560053,398.9905075254232,488.35137111055593,316.0547888818894,69.61658217607824,337.0153316584449,139.46912809363477,192.29963380902637,180.76900243405714,5.6260248781502264,190.7698678822125,176.08131692610274,6.381915068064514,28.221576529383064,70.81135594400567,456.599955665016,133.47561384483163,203.30616864253713,407.2455626876922,115.49458520880928,193.74820802713467,415.8917159883239,441.94513870600196,331.5860902104222,430.81150347500176,115.64492307246921,335.868187103005,339.98047641102556,290.02543728204864,57.89445155645456,299.7258183900967,160.0531257901373,335.05376501757956,213.77500438605256,392.4416217538972,241.9891388683064,6.828951411766093,263.4619223743492,423.0437752506713,117.12872016620423,242.71526039963064,130.71635080884337,310.5299335513062,350.9391644029526,123.95774365749013,200.4383902179374,450.2387366029974,57.95448822048177,372.7311955580588,111.23597526284601,128.8027892527075,226.00835985059499,238.064781808206,100.68976814101916,433.3881783147877,22.44587313736035,154.39522706339892,324.1639981478084,369.1356607164925,210.49224799123166,461.6570339365711,64.41914879454302,471.05901740007386,171.1528828160046,70.67378676746239,64.31242295704853,417.9789501586286,31.2577613922318,293.2373859350723,461.30070049525506,486.6337796229515,23.81966119824652,259.9500226796162,80.0301458107705,355.4391502772165,210.8233140423188,288.27668706349885,184.1656414107439,66.99620334644962,120.40898857817417,159.74903125831807,80.19908241907603,412.2888295818407,329.5886234260162,203.8244118570347,246.478898519206,101.08896174344738,338.37555466839063,122.23371867098176,227.91570553175723,22.854126464587065,442.62057365109797,279.31585980301975,19.007385286820664,316.775882424876,219.29248153341462,379.57078425939386,44.78862799847705,85.90724568464181,227.27947004065453,207.32933009752753,214.00965201860146,496.61858486011437,476.53319434607243,20.293289180540853,104.81187955693505,20.471528470319633,238.17749750927618,226.6742727354112,472.90970714851653,450.40480747742316,464.40736692346917,444.95727804881227,474.11432984305355,491.1996726700305,51.88685798382353,174.80370791816614,443.3244902221929,278.4179097140835,94.09731509720021,316.3877049940392,145.93146784900102,328.29263557190916,495.6615011167677,287.2194202641719,62.7527898226562,367.89810949363033,396.4345051244138,459.36141225531946,155.58535299664265,250.66741423394822,184.25702940659028,112.05041478994204,287.0705945488803,210.06532516471444,428.38830827224996,100.92234469578187,189.32513164536357,80.04118655183679,276.48450779947274,71.85664786514056,247.35832109138946,349.45139554178985,318.3012502134072,64.0812652836913,324.42515306505305,376.92701020726605,237.33353678318105,249.2582774784613,414.630170319362,478.4256367979407,224.67671338458084,242.7139452848165,230.9665587625862,235.38168090278845,182.0614490651139,214.03714262179406,430.70480574087225,357.80277381670476,213.75906948455525,153.46428930393284,355.00313527800967,442.8117147077416,86.60200041560584,250.44372361795197,468.84942278135,42.632261249929584,307.3926443530426,59.72411644107645,238.98678296535948,57.94456821080318,451.01026020666467,215.50354196766364,349.0428559670079,345.7560805093707,249.61317511454595,266.30431768462637,455.2512459550292,429.2934457911485,409.1907826432154,291.5925999309679,331.68604835416807,447.47847586179313,391.0579658324965,297.1813586518458,444.2642592357866,295.1472761322328,263.11149351012955,372.15484068990014,470.227684772785,458.0110556441317,287.3172881674059,384.75477566404305,481.1695463417736,125.73780213240981,324.4616760872667,366.5386928966987,212.82836774644386,14.878257775496117,244.17138129330374,160.7897570233624,75.92493500905029,404.1945909127669,465.7509650217878,230.3065799288443,204.13732046398314,25.867338152684493,367.1755401447423,246.43712736395463,277.6581544438713,28.234440700968367,301.80979160698706,368.22640799659246,438.8345549813013,124.14593844710254,203.7198505507031,405.0321331986165,18.992118235016008,368.3398877750982,333.1808051676741,129.2918846264698,70.78842207298896,490.27930616070813,429.415910733428,10.636796572164208,413.7517119541152,33.68897863964504,419.217249689658,190.17815155970553,107.10614870074365,64.01542905479019,23.854932832910958,360.17881490220026,70.910667383691,484.6614124142217,447.29069009631473,108.0935414411045,42.133435616442114,167.07398106862027,494.0967921255587,103.87224054204025,145.92207084103148,339.659287877758,345.4918101959863,55.98639130331762,333.2971702209766,422.10155195157853,302.9991454248598,421.59631816960894,203.46397245106863,415.0286734376396,149.34572966696925,34.77465746914421,146.3977104156652,101.35129994906555,75.40739923335815,141.45696169743195,29.019824572471652,129.67967093745048,108.203144881442,122.90634163595793,203.06954804489308,293.19793213331826,185.38357382598247,211.48823180889366,236.81940292309167,379.75543429583394,295.71260531151876,469.79751484273345,407.6899224592398,478.1095206035393,266.553100350317,436.1315407340839,470.04556052423993,326.058605754987,115.7287438609208,168.6447204442284,211.52139082531417,205.18584305834887,428.27904802959773,394.44347701531393,339.81251892037824,40.10251754577998,306.89964149964356,432.3259470193419,228.89784024159854,89.46483236731828,223.02669355233417,488.6973569233015,368.6087709362,409.8111170907237,379.46101377900186,253.61751669898757,322.03493705376417,62.87533197148487,135.62753016863428,76.8034929561251,302.5812287593114,172.55870219200543,364.66725620525375,312.1891814881856,394.8581049209188,174.019968321245,91.13976906845744,404.17789349975607,426.1191044465037,61.21545264571182,201.8402720619993,44.13792783888126,236.43590200902054,94.68478998942554,233.86940054130346,95.9874391962423,311.34793726709495,136.66698825363034,458.28329263073385,165.53262478056374,368.3081908177717,64.46248243379283,271.5309212770229,1.8068047511118346,482.45961698073813,267.55148997455,206.9436221839992,433.52474682904375,355.13011336921016,140.13292217402895,493.93793044573755,151.61803503053127,490.0574899259988,253.7003922931138,495.09047713334064,278.9775920708659,418.9253215892038,260.6100126117232,205.20503675634018,111.89941794227198,307.04786309510604,97.89735422402457,359.1231204288724,42.38241199612469,269.59525572985063,471.22591311617776,275.4140372064522,308.8520014860692,338.5485622348575,25.488077876575367,174.13052211791657,74.93322572646588,0.7054050962042036,272.883101425702,380.77628961978814,60.80512160517482,103.16260863647186,206.27219778322325,326.0954339947446,6.1859949807315795,221.8857158442159,29.033886598631597,42.021296245683516,122.29658217717476,127.44325051711147,264.46687203819977,242.29634997535766,210.3591724521009,32.000394310986,167.79464638802799,443.00771471666,285.5152553595742,429.5107489766149,0.6945135792526536,360.0931166865986,50.751306443441614,56.598016120340766,199.13555765965484,450.6037034603172,49.46612306830001,69.69341270717099,122.4461488407439,79.29244431021154,119.30774959827173,452.1089239596896,75.42187305415193,438.4403282455499,77.42107454103686,436.5073075671805,359.5042700071017,250.86735946187565,20.620091376259197,197.1963289388835,381.85110884098236,228.24458861794406,99.68614184432856,251.5152891363276,437.14152158867836,478.47594616301325,469.938679169713,237.89391524656332,229.064738541235,171.46683839250076,415.73165346094555,461.29346565361584,55.102610087486845,490.835664834,92.89989760897777,234.19940866919143,64.12524687712573,235.45912640321788,442.35165340751513,333.71039455869675,295.260654940515,386.4767462566675,212.48020401228484,470.64131878725436,36.99438358705898,71.86735121394338,194.8119732967014,191.5722100263524,164.85362682907368,395.31544098552894,31.363928653023287,45.62773907117168,443.541776972337,214.96288584322653,159.62339855376018,13.271044971163493,320.5208148837377,411.73232678530434,357.49339493288977,499.517965203375,349.1913927220318,7.283739018065005,469.2395457494981,368.05839828753074,64.48333893263103,191.86250066166167,357.0088682301418,412.2857464637716,117.59813154196164,135.10799098027005,494.39832677388307,406.83574235828877,166.63912057063078,110.75217138283865,45.425367018342214,352.26274003510747,103.03520467595884,165.2568839016594,39.89495729575631,319.0862379313756,152.0941732634219,108.50189256221499,40.009821727187365,245.8946866541819,31.710619345082126,80.00834195576401,384.7836557651392,303.7130338183136,234.50954660134394,434.52825624682356,251.21071573340382,219.85246677536074,186.16736669729195,476.41021246566726,225.29720381427342,220.60942779631975,344.8555209368008,282.35404760005764,40.89819052551302,41.263999332661115,149.8256554600267,173.12066992196085,435.83654980774986,312.89371501263696,11.900734621385523,244.8407210450324,36.48502047522584,270.40073462482997,302.6013899220946,388.58364091937005,340.4987612367292,149.51245793704103,286.6864957150514,168.4946043274166,118.61785575908512,488.49169495095146,461.2066678015079,75.9172271068812,474.9712787247196,236.0000652085531,412.627319904315,142.0921201634917,243.42721839941683,160.25320441568957,95.13192701148543,473.5211023227922,259.1478418552413,99.15378012253217,478.7689305281171,438.8463910417506,91.94174804135035,308.5373638354182,429.50288145381353,454.0434174609319,217.3592379609255,402.6502711058063,193.60531529362146,311.1725242389922,319.7979105312023,460.01657376523985,233.69291740354882,383.2965808202232,81.07615236558718,198.6231272213591,121.17568387493749,93.75514169680011,198.02681052512872,270.0545567314586,415.53446828491826,350.32151727835503,165.279576580317,458.93436962166567,6.124178791908852,47.53626045454495,98.8490751223855,324.5482274768929,372.120163624837,437.0220394493548,320.6393903545819,301.6436599803577,63.704488612005505,220.46334060073923,338.62870902339904,442.4648490364902,296.58376069910463,160.25669168660662,456.77187088958584,120.38131890570247,64.85646533837708,50.20805518709148,217.99844683929248,353.8531906663737,407.6843182930708,97.17466580621348,323.0306663303459,251.16929294258205,465.9402749927881,398.00002318508456,84.51609241193513,184.747449896013,269.2595327276808,97.46522618605002,360.5649604248038,498.61933942149625,88.0881316990172,269.88244112168394,446.50766158994395,44.2332457642538,307.63027774746234,315.2154004475319,346.30689682202586,173.78510574624016,367.5765372436839,107.54198156456529,211.2825575646565,452.84609474571124,498.6791379319495,204.60147861114152,116.53400439361849,214.18594197686747,236.92467387926442,95.57299710790757,286.3113716456146,189.48412605447217,488.837839458216,446.47012634492745,198.3936652540016,101.31139684010182,207.59206029339717,211.37919378112292,155.45866461221357,458.5152667008794,426.75656935050796,440.1444451555192,429.573757504189,486.322546954881,295.14061986127325,81.83311802300841,83.56086204061286,187.57317661884588,35.743325204010354,306.88940641757057,330.1712045649099,159.23327347203053,413.4031150808114,121.99932434762384,269.8685619921084,242.63864929294664,24.065073024686633,305.19735353930986,20.166121644089486,79.43234414110145,63.723178247235836,185.63208885054604,37.669789061561374,349.41804254838195,158.36576057396246,183.09353136709206,92.56723751885609,402.7563667708998,371.95424429109556,71.15863483220319,166.22557745255483,486.8807641958006,124.58148993630591,104.04098038996746,340.4133701711112,258.7455638578369,173.13631768370152,131.5816209915054,225.1180329676795,365.99531450500234,378.23590463783063,486.75749181540107,283.23519168196464,58.02081283836036,138.4780949671689,353.01109621876725,391.7955373636227,374.3916760063476,184.13259843600505,221.85044881216442,307.00340207679545,228.49975903601882,243.18363113938025,483.52983052043464,107.72234309731965,8.67706264409307,79.88125544857694,133.0755740772145,377.14270647639324,92.0180362734464,416.652049415734,351.9915085770946,363.6137589886038,187.79561900953746,260.4743305059787,430.0508863164423,68.60010860603627,197.67690119384616,303.02324603136043,452.71714511813923,456.0837376239566,410.79828378188387,172.2091561533896,55.91265671401779,298.13819188758475,383.89427035545566,143.23846429882892,422.1317096875637,171.94216078640267,264.1128197520288,35.384652652795,405.5156788311368,192.97227280360795,103.58490509372953,291.96561375767374,207.35533927961546,200.729159810052,421.4731423200041,403.0499001238145,316.0257920055094,110.75597171240825,454.66003169275206,385.4515479934424,195.24740447595568,200.50645363001195,467.4587971519183,322.6945097905758,84.31924382169298,388.1410710772815,395.02150927714297,443.9505294792374,31.70777863092711,346.4431307256721,308.80042492872275,462.5578486296057,494.3253383670633,24.168463533510543,289.4294408729738,187.0984445825923,119.56969665116802,177.90329612563417,410.6860167601002,241.29168435069104,282.93476088678915,275.25902508550803,231.33632064089616,206.4689454741605,232.3701765388576,441.49677676897517,167.8026040540933,247.76802964115384,459.3993796702266,285.75583628893986,307.72291909378237,255.7065210646523,479.7841371818479,226.8466481172131,210.8011934911065,434.06808443827236,45.39568143504569,10.125695491407516,147.07066980735405,393.38867891959194,276.1737733835382,313.135350767012,4.36377408421984,366.2050063545558,435.6273935237094,381.9300817000323,117.62224330487092,310.84602963983764,153.65031617553004,381.29063133253413,319.47553525268677,254.5145283240675,361.6523904405818,266.5293999605558,160.47635499197344,415.34071203372713,29.40834796074543,339.33584389077174,308.77778370899466,493.9446828388855,320.02243717323944,118.99371621702815,280.6762714730778,466.264744749551,72.9004953291138,320.3023014158789,279.2414758671088,227.15162744467588,29.09674191684397,434.4095851826415,293.9486698949058,0.32152050319500525,28.652666739384713,416.4688660500936,491.26553173664377,457.3977219756702,131.08473463556035,6.236651190926534,74.71695868826578,44.62593913965773,321.1303740908069,141.89416347737637,455.28685835755755,23.87150749648004,134.7847843434883,498.139807737098,81.0014698297482,366.84513638774405,230.81262935869273,496.90248834601624,405.8108241829851,426.9198205973529,67.53913196831829,56.30995570564223,465.11870442202576,445.1192708048054,21.800193818956593,383.78826445896,52.04691875930845,28.747065879554,373.2911425150726,313.06057604068803,423.28957062812435,121.76498839609151,206.77334881439978,310.66399549742806,128.0169134821788,420.8766678482321,242.76021296448502,188.17073025160735,16.891299419874663,379.2564211664086,304.0210791128256,175.85898920746746,305.4363367740288,146.3191714994373,33.67261901185259,461.2544761923325,258.99097048778054,7.2620970627065295,55.50954599225177,79.1937683172581,96.60853318771933,231.19449265818216,26.587777239957312,83.65858381247659,472.17647696928975,92.70254847617055,18.843701248591138,151.05869245133508,124.55672236895509,415.4274032266736,251.9700265421656,343.8672017425358,100.56037509726323,497.98303954294965,46.771685817751816,6.122790983952742,147.16917531350026,436.49311862377516,194.89339147483375,115.05218596848022,437.1122554853449,316.076597878337,313.27685047162646,372.6267033262702,470.96734818626595,306.6065256051278,125.93605204905367,233.33645193409237,343.4483916265617,115.62920357263839,462.2250303498274,202.4401283297993,292.4747916506575,207.19926964591895,484.42185971590266,55.6973711132327,171.5836281659977,236.5543353543741,465.842842485201,209.8137750279898,318.16446140408937,154.7840084722445,308.15976443606985,300.4630099221363,167.67315059340726,397.1424795225018,297.3071988177749,178.03410804151378,71.33052356211589,313.10383297486766,314.14068139526705,9.938888923733625,178.2629416016017,194.28420290191906,214.72418300544183,496.18203175253507,67.63616453296872,462.9229200625185,134.58518781511953,320.2370631094197,127.851320536571,222.57624058728197,420.048476652508,369.5753073983422,332.72307451311735,319.4232431872882,84.06075576131667,494.4973591579658,325.9901044594372,356.60223933134773,98.85730078124755,386.5243124860257,467.5082334621438,14.838362749601153,414.7170052964652,191.6101161599889,495.1367725885507,436.02822019000484,179.66234784118106,212.1502795909761,121.92398675289517,329.01032365063065,425.3926977169746,84.40965075106233,320.2676088625963,76.50562445933562,85.53905802207996,255.52345445214308,293.3668013464772,487.9591552437544,57.15364911620702,175.26467575300742,306.44295836151315,71.55308998335674,139.20829866073382,39.92255731867789,73.36163770156622,17.072176934800787,494.5144467667337,39.48118874590967,211.4317592683087,484.3708097490471,124.52765342904526,190.47201657351408,193.63770883555986,200.898063851332,88.98042376840098,90.75122212315678,296.85648750482994,325.9974335162681,430.0472564809865,41.91745587053841,87.2971735818202,379.12681595209574,219.17500707841464,99.74554897805577,360.3056370863552,72.44787033442357,147.13770981293894,377.94704747111155,85.46686065060494,60.018464468062916,183.7917770115356,4.273905499563857,217.29116827457295,363.0674004049682,490.87214087346797,318.35159422776735,136.3354730309585,443.4588795567833,224.687496066179,61.57612920109534,152.3322801915409,321.35996985949413,172.57046167757483,19.83965858981529,49.51180580236525,270.2915247659917,127.30679349688533,225.05508439589218,395.54641369336116,4.298185538189725,342.2854008929372,110.54790524293145,326.60761981872946,223.69368343453922,462.9048184390694,264.2667701514745,194.82655332790222,353.774355798393,362.1293926409861,95.8961656868239,372.4534912090458,318.06294818258397,170.31321518370112,229.98778959552223,344.0795735642941,185.39324666287072,287.3892623116512,228.7947045751092,360.255619730297,466.9005358906023,13.51960647675976,313.71442687290715,298.56005734444267,166.92992394741447,46.79655657587001,390.7421140409013,332.29348979496973,348.762378864393,312.80787349451,151.67269409736383,415.82759093207477,200.87464394559117,56.346437480014,46.24835499092161,279.03443466763935,338.80536913040936,357.4993855685088,380.10398466963767,186.26471764929664,230.52226432299773,193.08009074232325,398.5679905580435,93.78795986281074,351.5188936561674,41.998058176815675,249.93527030831265,320.310998352442,284.02447490094016,96.76443596768547,372.40634128594195,180.3650486985321,454.1683830150822,191.20586915584005,431.30991941056726,141.46671067745388,356.6919994131206,271.3749549929283,16.353569127950497,353.346255507282,469.9521696461507,130.55433537101933,73.2918059749984,14.263781848972922,220.14982587176613,261.2092137191773,408.2178238304003,69.12760532459927,38.65422978742161,387.8104532855614,392.95771782390784,331.14079120770333,279.1530758581008,447.7101884359649,313.57143874679804,279.7568721601399,409.84544218652405,145.60536898587728,152.69376845734993,131.54308821097217,493.0988455360482,333.43356508454156,276.9953300292666,272.4446543470818,379.7617321571093,221.14344049941926,378.2305527958901,401.7801657564797,114.8202071385177,131.812442752804,254.61992395187062,0.04451717815656675,436.9914763738201,396.6971143827022,47.94577008037293,125.86999086582618,421.75054288313044,167.62584157557924,331.19812916683236,218.70946488046272,243.97686428243858,316.6350689787616,196.66648969188316,210.23134933900877,486.904112870267,5.302582922761201,11.64460847954707,350.39772217785867,447.3269294614366,495.84469984106937,410.78994078986454,416.1170925411454,262.8052155486559,301.53547950605065,120.39893837155257,201.4909848616162,481.2940480477382,50.48974456121047,226.1052894381831,320.4141232040344,481.0893346391697,287.2988563103974,154.81128625360685,302.06776161549544,436.4325913921538,386.5061518331159,117.21507210635984,491.76796405414126,418.17738151597507,306.3360372563404,497.91366697503094,176.81770766684969,313.3776282432651,474.50459150378657,34.14172516343106,477.97739494060806,143.46566998691412,10.959493570869006,147.74412714390795,54.90471225058591,291.2798804713416,96.28353060054029,462.58602675789206,264.86820774985085,197.8850328021875,480.94396768563416,322.1533036660306,84.664768748127,25.41612415914973,297.5875075855,92.59520198797145,260.1244002222258,4.413336261185008,222.21609775167016,127.54034191594921,209.90275826656634,496.40901382412414,264.28387829588615,117.5268476830047,420.6772402213609,113.10328467797726,267.9401090216831,151.6675030015484,354.87046782694455,88.86203618059862,21.03302160077436,44.695219019513345,284.46336465239074,15.873610785431591,21.458874514810432,423.95873020000806,183.49423343034522,88.73736147005751,463.8130169198184,403.00024333390814,304.67199392066846,465.2405133962273,490.91891595544,51.745422676479194,183.15755034903913,302.5907766676216,279.42322273299646,482.9163343964523,43.588503668118946,220.96758978266618,362.1358003546027,259.5053379214085,380.2247519314016,491.9450354120671,118.6392398390469,116.20998133474569,492.35197106495787,111.22125196505539,314.18665335249005,136.0460438267358,235.30238969933026,413.517154889439,417.7313311135402,429.3530743050338,277.7570615343499,388.2575687004755,287.0888846816875,481.55386629257293,49.32191849645295,449.1465066466335,455.581273850007,37.98460501968404,25.395798786003066,303.4744079634871,136.28601019592278,24.847287139156073,15.027322926884468,140.10254237356313,336.69111559273404,332.22961276996034,439.82827931512935,355.8330946014817,229.32478337373652,474.11353035112523,97.35781169783687,345.3840424621275,214.51726819855054,389.09560085646046,498.71476948912374,61.51666559020042,17.30493733630034,330.32010498887064,234.3984457008521,268.4206614459814,178.5053390411524,171.06127446759788,385.15040319884275,416.5766466419587,174.64541217988227,234.23450848537908,347.371717145225,116.16452912389441,332.7307921541399,172.3991809623743,116.91281473421333,264.30083999852536,483.5541817177316,424.99448337409416,95.28067000807927,394.80754271390884,130.57680351994082,381.2354936977933,413.84880146498983,462.2289294176264,311.39063233979135,20.460798428812986,194.31732469653883,23.681003290751956,388.80923612351324,342.9396284535592,411.83848129298764,231.1089680713001,390.2029446084204,167.0308474330382,336.5305562238761,474.91633933409173,208.8427106364381,103.73501115017936,475.67828573770254,139.36641189089394,95.49959034698863,164.54132756909223,429.4146724755274,463.2653656987684,126.77355468875228,271.4430768555491,37.721726320882,27.99129542426815,255.7867310047215,373.7682896279123,463.3222681146821,94.16959106457057,410.7115088599647,181.29827148660993,169.8480574110023,200.97948962123303,33.60335723015739,339.50820512601774,266.1160119264191,331.6421054602295,174.6235258633242,491.3055164987179,387.09498177392766,124.32005618786678,353.5589145676408,118.96214488378388,20.28514861731967,488.6586896906325,354.6316567566911,421.54935013803606,301.04852109733895,313.06398613468076,341.2755482973464,30.589457905716543,120.09896029418876,342.98601407917295,255.55621100150694,192.60773567476153,81.84298754197683,207.14420859938122,213.29315758400404,152.96914986746913,480.2178241189508,176.4132106031926,411.09521977930297,149.69017528738715,360.97019554858537,283.7590894503462,191.78745034343592,361.62225156511073,74.42322613941354,207.462576435976,24.70827334656789,95.2880805598254,128.9880673916608,256.5914649350792,310.63840543458866,192.77181643698725,495.1276273947055,1.9191025087632596,203.98448150307792,384.81625667059006,242.71056264343406,408.06244061354613,446.2385872946777,328.0248214171867,128.48409265209327,47.158203000027044,141.07348330747183,193.43067707193717,181.1728264282104,423.1124557519863,163.6900923644533,71.31409533352173,361.5261495201419,320.67720260180175,387.46872713113413,93.76596906404255,319.9048675413669,382.17306062840737,473.4216660141114,3.5201796580227596,253.0812144787653,133.73809029472739,229.05127866951503,66.92988831952596,468.31370981273204,451.81600160039216,439.47926261793015,266.83306137430674,286.21002330146075,54.68828807414505,6.078686695943691,485.15158061332755,426.05451441532915,171.13678366491402,21.19593141348841,213.47494558214376,426.85063344815234,273.7411621646375,146.8517850399177,104.76016023286539,222.91977671558394,13.046722609903139,69.92942097972166,175.1527898074946,335.03706042871653,218.26046046349134,413.1318977064332,465.2531518323992,89.86699156710299,100.70262830941523,171.25069456865717,353.7181354286985,5.963972181923682,82.92223775852614,129.49018515343903,229.38684193193515,435.6669079162341,63.46482777433238,284.6195044437586,404.7591128439215,319.0757533212922,237.2169088774102,362.36685025708573,8.009137014544532,56.79491399313208,330.7771725861422,447.714842390995,319.69794985262035,340.12844743909477,402.8839758552105,485.3871975046247,472.2046826803902,220.72759652084918,325.017719325403,499.8143245035127,236.19153792881676,368.91850611539434,51.8275367197667,180.6879761788459,66.61950707032149,427.6385885648261,206.05912674198112,239.31261730101394,258.6597443773459,287.5646032043198,234.95968609538187,86.167400131831,208.2567730751046,471.2947016955176,229.2658756788535,471.88871479611373,169.10015679081815,137.29668983036558,44.179230825901804,282.57617970595237,346.7463120146642,307.8442817673144,168.21409278437272,319.39798802793683,312.018116950196,361.1926677726931,1.8819858631493602,177.57572933913514,433.452425022145,389.98741643578416,307.5792705536219,67.6103431214018,342.0678847304477,85.01670267984419,71.50717830032738,211.03716131514417,175.34419404969924,216.94757503423978,381.9850685972338,325.3397057879623,129.01307181149625,419.11494699789995,269.01579689936693,200.2986146939293,471.139988011265,29.323679787226943,396.46326682165335,368.48782943918235,171.1262542068499,472.47417262001835,488.93683381706876,234.64974213773394,295.80989474541866,12.104981517388591,97.10937456190916,457.26263959343527,150.17454273906762,376.86194138960684,137.4949313858369,460.19481425267304,88.67036717617871,229.5068081549957,70.9500200933727,83.14853033611014,388.00802583065655,497.8570590253516,192.1943925433749,227.3186983076818,100.71501426179185,346.8307145562446,384.47452147686755,63.62478664683147,67.27911391093733,125.81453057133373,180.1785178034342,167.00019436918134,434.98032117184107,268.6421885042096,330.04800248807777,356.08539227690494,452.9853492313747,121.31963067537377,493.1513074829411,233.59748071169162,81.57536055144743,90.74773554621407,23.35777321303578,16.362947654739777,189.57017403520405,236.44541228696747,183.46228687238764,72.58886575656275,430.08744323503834,473.20554945072956,27.93773997254445,438.0987997765536,67.07643288743125,494.82827290675925,154.76251756667992,449.5730999884144,138.54199335943673,1.2784454721830318,139.61529085495783,353.92007444256467,436.98556673791035,360.09453373789626,321.3286695899927,99.09307125514599,214.13223359295674,157.90154162862459,337.0908882768984,81.02382713361433,111.86562726980087,490.15714162366487,35.43478246278487,141.01855013984687,13.042133954551671,68.65199267767008,410.76922076861365,381.87062715184203,475.0707172195008,164.1660498814842,77.56116168441285,47.244623530361075,205.93175480407078,64.54147786364572,262.80840219686786,71.91615314557842,314.7742637125204,139.88642788295502,131.49598989712575,57.81189849135004,396.7287613809356,356.2690759478193,372.5998920893744,234.4339416852953,21.081344423682037,171.95702567434134,400.98756410751935,327.8027962607408,152.99389653292116,302.9867597745266,495.5965369338278,364.8019041992967,176.03010449637503,167.3310159910506,427.22959128875993,340.2912542169323,336.54955663330423,330.8587922550296,342.32736783873116,221.25285997119104,106.71810162927842,218.29399198334,386.0796446667428,371.787008538774,462.5434104374433,2.6648717699085944,23.319588715229656,95.26985446606628,408.0080686385724,146.2051584162094,175.7915887753766,2.966727700874361,205.15904825610764,70.60559689860435,478.9379026690068,441.56656979556294,412.77326685087047,17.554296600922893,400.9675713588361,250.8998042731718,73.80409008661837,114.88287771542205,496.66118193323194,360.0546385131601,163.850788618074,47.04574080037638,411.4354980091999,412.1597830306534,390.20237944616866,448.8992168805479,249.40236165650452,384.22329773048324,491.83265532049904,401.7238950178771,284.21450257629334,126.32189823378349,429.4298197046363,420.5893545068976,373.5078165057987,33.878457671214,493.57195560324,324.4753767253218,442.87080204211924,313.5962158940875,441.1786424511489,248.79303276049635,6.853545645830406,397.9256152874061,8.37189466226096,65.68090488474354,197.2206858178175,262.45882808022844,408.2454863235787,82.12576617423795,227.2828212623099,240.38978432949364,177.11834175022744,16.464397949531808,464.65188135578586,208.57874156898293,113.8465306276224,411.4331692900476,44.427386158958356,50.72515239597797,435.5060142861876,333.44749628416,216.2965287983264,0.4483165340360973,241.89421735299555,488.089085730228,244.10570730071692,103.48902561518159,456.1865123369273,97.06476518944262,286.988925373546,338.2504865534218,442.23611974150276,5.709763272713775,13.37033182546099,48.53663473391945,68.84106541257363,362.94134333795057,193.02054466784836,26.68974476101793,375.88437201654136,445.5688000548327,348.78649755767776,407.86732579711816,420.763582960623,237.54531297715675,406.08386043904454,440.416616265193,34.83939674429215,349.72187843465287,54.7758983609632,101.36486159188962,386.30696792138406,443.39842497640257,169.56176329076345,434.74172633948535,8.126371794505815,482.116340965053,446.6356466390652,50.433715565716184,30.732775120639655,375.57699227856864,41.39932537355584,223.85078955898373,138.73258406785948,140.7767788645159,9.043963562934909,376.43280545866884,495.6789174443463,483.92556220758644,369.4474749077886,4.977399878456801,356.05142071072595,473.7037873188795,331.26826723251935,473.4850623451142,392.1192350701773,397.0221551385036,218.94069593627975,39.44959204662646,112.85423045080523,345.07123183426813,47.67581994726133,132.2479907081472,414.6307727227816,34.95293886537099,264.6743891955157,203.1180246958496,314.5145897524083,264.2883468614744,104.75026943135313,331.35337047081026,400.07106571607886,382.2806026657906,325.99256893180694,191.75981863600688,33.91281502733457,480.3746800901203,410.9226458277109,241.61179942291545,143.79875272915154,353.7295067301246,344.06607841582803,138.44249160667266,152.42160284011962,120.94934835963444,186.24926251026795,84.39129003077316,222.53603626423657,404.9970750277193,97.2902193209355,469.3640930385466,468.0209802552544,207.2791557029774,156.98012850344978,280.2749698468079,198.7974405870888,301.41675714173124,453.21027419739,43.45316930529663,464.4722519747494,450.67101303957014,394.3329804274477,292.0807887923198,406.919658487833,332.4376196074688,45.46036240144302,350.3918275882481,368.0838832747729,388.45380920928227,138.59766780775706,210.9059573574714,234.94041347640248,345.9975925180421,13.841140337858992,318.7565219603417,403.8731736122673,122.5719611322108,271.46302364809685,393.9706382052396,50.073894666087135,457.6532555445468,144.0569065522881,60.63301872312066,284.27048732315706,43.23295668264859,172.67348573603712,83.91042793330993,60.68193232587704,234.67245500599165,16.621892633821965,244.3299552269127,99.82996754739403,96.50398122189752,5.114679310840309,161.98112662810914,386.66064599815917,258.3159895463573,361.72966468371027,124.20569684968808,352.63721785157577,253.25339366710986,97.94564613728618,51.36222473708152,310.8313553785095,219.13701382130867,350.75243137000024,458.4508621647143,495.2440396344525,483.91057925949923,410.0041166414941,468.04746213470537,27.67841315201336,85.798957784036,317.77356746087503,307.3261891557976,206.30270412277042,449.722877471003,31.46062023357765,99.6515365426609,99.53199939727686,350.7717388534414,76.7355787759607,58.8313844471261,284.5985254220467,43.31375040149421,481.6486523924614,276.21842665285124,310.9061340207601,148.01099518858229,472.54502819975255,379.3804902281658,167.29457194497488,131.42771095665063,100.64556316934437,409.77499385537817,403.0032685450372,467.87284766192784,385.6298090703255,221.23111623481873,401.3050963885461,194.14604688132508,134.40259345766935,333.7027044305456,456.89716785583136,18.451893627148387,234.09820073839361,213.38188651915613,286.5250792734836,381.2873317231411,366.3730288162601,440.69977354828404,341.31359463476906,93.2906940750896,55.95324394491041,338.4093591195115,448.83991357354967,86.38155407692882,278.56285592612085,322.26924627673316,120.85703480044852,418.32908381101083,112.31784259278565,344.4808200534408,265.1066325337899,454.62692099325096,262.6250372500459,206.24758814967092,204.2466097141513,285.51910263920723,325.5364838274558,203.4557711355015,201.21395319672587,209.92806879432135,125.4658593480471,303.7556671317122,391.88606938017256,24.13884514671083,315.0144591854056,33.848488095587385,278.19323359108006,406.45374962307136,394.1957156460119,121.71545624470647,36.36290714312751,268.6336299414704,233.39534178345667,60.852752042140914,449.7760023343027,408.82649952672534,96.18611220042406,499.1955357667788,450.3352824417065,411.1154655786723,232.87476877507163,220.519191270797,476.39493001860944,442.266130211067,239.02097881716932,353.6084995502723,144.47650625085328,198.1422713892127,109.39283047221227,82.66526382266991,292.05355706927094,296.92882282049436,40.51408231582387,380.34890768359577,436.12173007786026,484.8898304115406,278.0788651766081,442.68033653666737,369.87795030179984,176.89219190082383,326.6798163686987,279.2460033994325,45.66860377724091,39.5240267807081,497.4892931173477,221.12938437912578,181.82355131917015,268.27090692501696,54.0767213550718,435.5492792442367,476.5723416662463,80.79010879393256,52.62641521150901,181.96992377755228,209.3247802224375,334.4624523953558,147.93240134560637,92.50004077149687,432.27773034813424,338.08269616025865,122.985596846241,450.3050875098725,177.1400304295989,125.55210585408116,480.3860899427682,49.1351143264066,284.3814451895925,64.74815406664159,377.8178017821094,471.81079069836363,498.5605199214265,237.32083213013266,182.07653786101773,153.64823507589642,244.6662008453605,315.75136765798305,243.35426691353,362.03585844472053,425.82598886669456,424.2832151392582,67.30534562785162,111.39049898609032,73.7702053074164,50.699769422771546,127.12652563088056,186.9540162975415,246.40073318379595,354.15652036175493,410.96142294703753,277.3408933143333,436.5013321282398,482.4285112246595,111.39487153606753,25.21122542997101,164.6729480146648,251.2508878819577,497.4495350897394,77.17115528129403,269.85085160422864,129.05558765461444,360.0652216982198,97.64355447589068,191.09548097386198,310.3246503450078,91.5987791343592,19.655081835160292,116.17021368267855,373.83935840876813,139.8782843241143,492.5746507374893,246.72405640955975,306.2517421261309,128.37831475565565,132.5749523840336,42.27342944834811,56.01965253148522,43.89675148302696,187.59958668448962,174.90235309860736,355.4585191614168,372.0217507991624,350.2057652754639,71.27056173821722,243.9583521824644,107.32736543398802,107.49465380840151,94.32157793112827,169.39694435608567,43.55675435243289,349.2306173703241,176.32663699369434,199.8981857660189,310.24107613496733,136.97568034129247,416.281925513312,469.77572145741044,153.56839232664998,422.0282672151294,30.020682971666048,391.6202722509349,446.883739353511,417.4383679047857,194.16600320392763,203.46397441662555,100.9046932539891,45.757136373016706,350.1448691304945,383.9899821720726,19.843434008782967,369.6015616197824,286.27439557718816,70.42608395175343,40.120410452510804,112.3936788562011,410.37911146326746,137.6320147854604,417.97590784240333,31.212107607741512,337.48171902076405,78.29338156281639,489.84777307812345,418.94742553502283,355.98068581539064,67.31934378611437,158.43187322111507,244.75264206118018,74.20526838194775,490.0444577685564,116.68332030368977,142.7555743452449,316.9965160361765,309.301899455126,434.2931717624411,246.86329097042525,316.85552371354686,8.516238018013379,221.99097665064582,426.81688096334045,166.62311594678425,3.61519236451191,483.37175361282925,247.76367669495536,211.28856565232013,2.0843030388757455,319.67120743285346,123.9416586521257,294.7276101607822,211.25374103258488,114.82276246915235,317.8633474506942,456.2157767820836,499.4364522862766,80.18704325275472,177.04989189411214,51.753656799339524,176.87331021158292,9.121703396957503,451.3948382256476,437.5843290844016,427.5234559310116,24.7763779587572,256.13430476344934,28.018726037980834,147.7711114243493,268.20385941090655,466.6074029640885,184.61567154260084,221.5268227115651,471.8319060438732,50.54273023801548,486.7860337370946,304.0480428489943,432.52412010290584,133.96959446088107,145.52063280936733,88.6187559560957,12.074992609251044,271.0106283395065,105.88870682850937,438.8549818475119,28.643344052717623,360.23984970008706,352.6829411185919,459.6267490377995,330.40378717689566,22.01676844094058,404.3720281567417,137.6829447722705,107.94729700377603,320.35189737233725,152.72223648162563,21.374450661638345,147.8277408795977,367.10025170931834,384.60685542622844,94.46620445691256,210.970087732822,41.83926452434849,485.1293428668777,403.21332879543814,369.10880703867787,195.8151286841533,201.2625805937005,47.11477286722621,245.00527387853188,406.1106586849238,338.3359375432239,86.29780276458065,200.75643856229053,450.5649189049008,222.09061413282961,298.0282035280063,156.18913021759573,197.1352069371629,0.3187373697741691,433.6068167052667,17.081580207858327,238.85556173394107,67.78309458527853,497.59763426943425,363.55697733499295,224.53740827348489,275.7517821592187,65.76394990442935,131.2725244947367,488.85456223379543,63.06022591542138,440.14902534079357,222.6780741168861,384.4042548190705,322.5612224667149,21.803774784391106,338.45233228153415,40.10625263956058,220.61976515092874,151.9627494602823,483.1444577485067,365.0504980438299,499.6283139286153,55.66083723132831,362.5064052826752,237.4816102484495,352.44921277812034,404.15108534141507,178.85234816746208,171.0584492436833,221.90094829279306,208.8509042474398,9.833236670533928,446.8598571060591,58.14761988031392,359.9841726705054,114.55527583553082,299.38493511613086,187.67381900313086,400.83386398808665,402.87787447500955,465.626474948855,37.9963412631843,362.5062698687105,233.9956746559929,460.27858490629467,470.2597853907098,155.3755566578927,184.2425784915308,52.351428773086404,115.36873065992536,434.0670871664356,257.4816858923782,50.160545861344104,430.0699192904869,209.47257127609353,387.6635900066336,330.3951194234229,128.91189327440478,445.28662638442717,351.00255640111277,145.01828030318777,230.15249017357,186.52802234340095,187.70709830048148,262.90377632867677,64.20800949376626,303.6959012307117,359.8016669468226,446.9680123080313,155.31816702038824,2.261015685971146,256.81876893410407,150.7158316326245,272.1403463389166,259.5940130940374,406.98291237926674,359.015609580278,488.5237440773643,170.66960278173448,143.12736399908954,420.6604601988195,348.0493628241852,104.41927513514938,106.02846722878922,4.212723839725596,338.1955411313278,286.34546995884244,310.1623331880823,396.4810598200039,469.1048482574538,131.91801572493,78.98118875251214,248.51576410986664,2.6948265301623975,60.22063605787953,139.8862954310347,119.3620813903702,143.84343919004306,290.59834132402494,222.69542181769418,289.15000959134153,79.04517478344341,46.366769549150646,227.51720729500013,80.1962994131935,466.5043255078465,255.62640134554238,395.2027437581459,169.5950632916815,404.70092756202035,312.8845540939954,34.29671923178101,341.02056963929493,276.28676333605205,50.2575947942625,408.5958291240303,276.29095783014844,478.54807524421506,238.2998711139216,340.52053149625874,90.23217810323847,470.42909490469964,129.13116884348352,99.26064050320882,435.23400464544295,2.511150466294021,123.56905170263688,465.9026846777884,232.95979941135536,43.271625576835724,61.59100455581679,135.64611302203656,331.9699858199876,401.4882981721034,81.27601891681057,196.23534921280051,193.08801350350612,118.9307839102407,335.0806976947632,276.77484245818675,116.4597381665713,16.729184056625044,284.2498899198508,282.21010497359634,436.7465931675626,445.2010874396268,272.35783260827196,403.7076257853226,364.853812156296,84.74650397064087,267.2439080623834,365.0293143294134,277.7666495544959,309.488601631566,165.0323721525635,239.82200132935571,177.4064985487682,170.3259513104849,149.52772816867076,56.47385453189058,379.1268785866594,268.0058421774262,213.8719537898677,106.24618745719161,19.987450762707027,439.80734522930175,433.11831035327873,219.08021351888064,387.92516619930575,259.8914183527795,445.20066045504194,91.83745179163927,359.37768523241385,496.50904657201664,396.09801740139994,160.2504235075073,247.05606942111558,152.02905955679879,420.82317884234334,310.93291795083366,228.2630150717804,143.83659680632087,247.21777056847083,206.44298442993392,487.86979649391736,491.84760693585827,106.80735345914749,324.17511780552843,117.77587569393766,261.0437040720828,319.8576924747145,489.3856124503358,47.67772466267006,469.9009071287157,179.85818943851152,275.9981649861526,260.69591771205916,496.8960475523969,423.9612736897398,178.56901199878706,292.0800350338031,202.12121486333413,140.47467226627163,496.9244443384431,398.4536760131696,443.1573772417025,496.88288736953444,420.862591991607,398.59638826588207,200.4696282870928,308.3353969823174,86.40983708592609,50.60941634920979,219.20664234359344,7.204925669644813,304.24141238768976,232.4378428012913,286.00056726201797,248.59668927041966,145.83831919819625,207.98309613473677,455.4618226205128,437.64217535790584,293.8710814761584,60.71269793689116,403.3380086475874,332.1230326117206,485.55015441499995,3.860555597595572,417.23768042696287,115.75113293336436,449.48488134711505,304.95305105807546,72.03526979707264,224.6302586193001,10.454427213796858,386.5775846313121,163.99247359803394,7.989540086449809,438.2581199412489,418.709892519605,171.98364130795363,215.8557296494218,209.85711023768283,369.1926620066449,92.54583300870145,191.43770135616822,273.8941690530542,48.667828190621435,347.1640495488028,83.16616648939912,351.6712782432524,431.1523950010543,196.75857414234278,134.10970598154148,50.77916670024696,472.9468225584234,160.77229377643732,338.7149056961385,75.00303231673111,406.50010194631193,397.87497054193346,224.29294494217754,319.23856558815277,200.79963934653767,165.65801699838445,32.49785049245235,85.1620469902472,470.79732116239205,335.91384263953483,420.00722548139436,308.92957601768535,9.199208884363541,38.34551623584104,236.32339090769605,190.991342250185,50.06883694017616,51.47133724523001,129.23589230249445,354.10571117319114,282.8139997106478,140.5068193544772,199.15109417617492,53.179985797764616,203.7083961199273,124.86905118263437,399.9199833541592,169.67206157462834,284.15617933954604,162.10355644156883,459.4741850544501,458.42852193078096,10.029352390878987,101.16078731294664,409.89561459316616,137.08405068128482,282.23455009882724,189.7920079605887,138.18109142600565,22.797565007708908,96.79812946149701,261.0467683585429,295.11052032467535,241.0211539121575,288.1115841616914,443.8765300467397,218.95756843839774,117.44706617267298,425.5568873115031,387.81584081933653,202.77275171983555,147.70328457370653,244.65133086204182,280.68208923460236,377.2796527372024,458.08951274463726,89.62163985836702,171.21855990079905,105.27793484062809,231.18293186944584,157.12710884131843,325.17104386434323,34.42709959226431,191.42932663386992,345.91717154375567,4.633921959524723,74.45857000886934,435.0467487522349,234.3470925271448,276.534726502027,352.8162859506042,190.65138089698098,31.036702016518646,35.498579981502296,481.31587938435064,350.2537035536039,138.52162726321382,259.8219928553138,449.2278765914933,220.67273043954583,95.38435973909954,237.36111346082868,305.77002057089373,371.82405283915455,81.29612081698556,195.6232628501733,290.2179197442852,242.18398990697264,59.37416284329622,342.3173647299742,491.1817712216262,471.9002392882098,474.3941675938541,116.34755118728468,478.4172781701261,346.31248172879293,116.57200485999508,459.59820361270243,27.3701841801145,479.31805628057754,214.5045545271721,299.1952399543754,349.6148397848639,406.29061181648484,195.11350407460625,132.45115735313618,104.4049706137734,47.916293756692596,340.84650887659706,194.21524778605394,176.62296879262306,187.58891531633637,427.5366455923382,151.2829653969603,489.3745859752661,240.75068824163247,181.76682431375968,429.94196070108717,103.4182062306409,217.60502701978334,259.78815280243793,103.34625625497162,476.5180920718314,180.4515567726055,347.4261961526698,108.12503501630366,449.7547012572422,215.29371642396777,85.90208177617298,466.50315911274197,440.31842887263673,58.27683316119203,449.16639144058723,29.625970646242617,29.820867605753975,274.79746275306337,494.76623354215934,463.5095338282328,403.9284157444708,487.7133515883623,314.4528470698903,86.86971694130897,34.620629116400735,34.334659086157295,221.56460823375323,397.02567401760405,297.22109901037277,477.2059854153289,435.84947422549516,67.47992036109973,243.7503465692621,137.8664961134811,3.533984076650176,330.55674930369884,306.5319746447953,225.14103614254455,108.73267359723503,452.8081312194923,25.583720373890895,97.9951091111747,407.056537886941,491.6570456842694,193.06273763687943,162.42603410621282,185.9966834001866,239.98380295743436,242.40946456799884,47.47164645191471,317.23374112930924,51.39268214895188,209.97655047001828,421.0991220777544,323.9645938415161,281.96489949106405,81.19037083386604,204.06269201193638,49.28961270676913,143.35430800448955,93.96011891970247,421.71455578041986,62.3151857525881,237.47322524685643,480.01469506895336,223.4494606284031,427.6814113734407,132.27443936921523,268.8769200515647,462.09562486427336,334.48805861477024,307.60030422511073,403.0187748176347,449.6846409541214,27.39587279092348,50.617117555865846,441.66607741490026,179.85334424957122,103.93229888022381,113.2559407668895,261.0840548625371,36.12665552105165,300.22786689214445,378.5346503841015,172.91221613426333,358.89589918334207,309.71301333459564,138.36490825295567,187.77159169890356,117.27391313501823,293.5114582356778,32.91888425022893,342.8494668861365,174.31505335771192,205.77935106380318,489.2471582564314,371.6785873833781,211.49342346623823,20.75093234388281,215.03076232366502,299.1325926685456,2.7030474230449464,6.821914420292341,319.9967098234887,85.11895200609854,360.9783526734426,482.8578733020493,85.41555558987469,112.18160004598121,486.0919417946069,420.16152510196014,164.18333824992294,262.95245224390163,318.4691450989622,147.21414075874907,398.34102549517416,172.96550625435702,295.62298027609114,355.72228774691115,248.01118474032046,70.41219273288912,247.9224777701091,275.41454762378214,309.8075552239292,64.24214661218674,395.1370672049243,68.08413161674687,211.2344065928905,76.53944374325484,169.38795842985033,16.55194832672935,478.6149247040167,252.04888500006007,433.13818435163597,106.21578351235416,483.49677521590195,62.443181245006805,55.53744632078428,210.28079580693083,66.49041562167157,282.62685795950694,296.8822712258973,167.05008575914283,124.09517463578645,166.80769640699256,472.39923046182963,273.24336091171074,181.50722652342023,398.69011251154217,379.68321065649303,142.64207181642485,119.50612848452802,371.9572857213636,160.2317204775169,92.08230303168085,422.5778942360717,141.46230383659753,295.58442605208137,125.82082008404672,234.44524158836967,37.306843762561215,95.37927675985924,242.95411342593133,403.69068932745665,240.92976287876255,308.36130821467844,372.26427183832243,305.1085930338002,214.4577906148204,84.4139105588454,318.98887757341276,221.080209752741,187.75771694104992,1.3124844622829368,102.49709275805242,257.2835485454469,398.726459622124,59.75979608947646,478.6028547360227,287.88677270870755,411.72861154893405,414.13413179981785,239.36611918908014,44.57720439943203,224.348687493933,436.91156633228655,13.043565902905229,457.7075510915092,206.43968053394357,261.76619263566346,107.76212778203143,92.8552867299427,186.56479599501463,279.227474492141,494.71610866058,58.650830358776275,164.84800216154284,323.26827332468713,272.07859667188194,480.12819765196446,195.53241471641502,399.25271725836296,223.9211348497244,135.48557951261265,394.1487938256887,158.31410285951586,437.1538728839786,52.63722621999101,464.0457244463535,274.7139483700079,390.9237327288386,155.64199096442354,442.7776178106031,238.45731862959184,385.2967937827919,450.22301366887706,68.22735366907496,169.45964138211244,94.6949530910538,322.6807752749971,31.70590552394359,45.0852050189553,150.32091113407287,460.05014733301164,368.58443193063187,74.12282993059982,369.3522947582859,320.9839109468624,173.97146938126096,299.0076527850575,230.46151599894503,313.39185978924735,320.08676377785196,486.53461657720254,81.45000242664014,354.24956515013406,333.0589131035212,461.26099974227685,252.072341407536,401.66838963357645,75.49498601033488,314.99618582359244,336.36746132821247,52.66069168878218,246.7549204827113,32.749763881405826,318.34259453008184,35.11465952553583,46.06796682959657,15.154938627862657,356.7355774517587,380.99060641772064,161.97478568626678,109.11863026729162,318.6185748051119,247.21241642972726,72.94273915930883,8.523297446553112,144.15789305676896,442.6015081606266,80.27376242600326,291.16615068075726,377.3347277677318,381.287615444581,299.71825114020635,413.58819553744763,14.473293050481617,148.73281653966552,365.2941368489496,380.0315607859841,445.06602975317287,15.733823023305948,19.08562199569608,330.81401732275583,398.00614725698944,225.5964461211175,215.06484312138375,260.07890172034445,439.8546665846242,331.89839815807045,173.8124412145635,172.4584776959024,107.1705963363352,211.60177359147337,181.06065695457275,101.35203461496955,419.508586389557,67.28413900404828,364.4190306191578,226.75103853156685,117.527630308631,135.55782705201935,254.18619509407958,236.87943353217977,340.07700037927793,288.2223559161238,70.30314511221525,71.06440179512619,387.0387530033248,410.11300174697885,140.468252266019,356.9170211619859,393.1697582694803,480.2216397578144,142.94295766800724,211.83675725684526,376.3538808165886,110.73897595463333,111.78545713327381,5.807784323872189,375.059474290916,365.44919384245554,313.9188922903645,110.48299490449276,43.16670664942368,443.12165107603494,341.16996585757084,364.5354449436156,68.91892280747713,493.56738184454264,361.88998910015937,420.96138923432693,87.48148517960675,492.3696009723223,34.37704684982534,406.49359078282197,308.92182862750263,465.864723856683,136.73877814335077,338.8391579549713,226.85890286709787,315.6838358173167,491.91046638169087,91.64710307560352,119.32837312426958,111.52650042451972,51.00922028425403,18.4095182761409,317.6385041373767,19.091878093992598,434.3762833872391,40.82619103805385,259.5506370566132,336.7417052144509,205.07035042553022,439.7113586535617,473.49861461988553,74.4095275691099,479.1619996921153,338.4027735021894,157.04971835928262,495.0841868208478,73.81001464898229,157.59188303865724,53.534845577485335,370.757522025402,101.47877309628794,416.2137786801593,135.66126979230998,384.5831426205856,93.60628023302031,142.2550261103418,235.4451835733574,258.83500494151235,381.4335945931625,231.6297764304488,65.85260348198285,76.17329831470421,254.2844525554424,209.60846801516774,252.83782738279993,414.7085407947625,230.13933083741557,144.67002771796632,58.18674075735009,139.65797385379696,312.7423663985159,278.69071813401547,442.7487399487443,210.59564568091162,286.74013225571406,241.66232127012287,361.4903109495228,343.2343375745187,388.3710254201954,39.21869437410963,181.28458634890055,150.2844847076966,200.36073204037575,252.35644219457586,402.2268015260306,141.60061006052794,292.72872321660594,90.3289704797332,92.07884801093846,429.31887427696245,363.4731241941813,108.18983472189392,198.02686766301204,385.93597143793323,38.97118152274781,315.2596204895439,412.90579355972744,398.97873283216387,335.64763745267976,340.2492500202813,276.6642494110413,467.21611176747444,314.1658224046724,272.40237406637834,112.92741155280184,346.74843360383346,215.63348401516114,279.66137458126536,392.0873610833838,2.7573872568169566,201.47867716962142,39.33504307415359,29.9915507424916,446.2882533196337,477.03140825379984,334.8535756610893,150.7414561054502,109.35869136496335,108.76334425584433,314.4516848068979,174.42873863225495,374.17117900200367,390.6172756786712,489.0807352582134,33.004364164035074,453.86960121341826,376.59145017452454,137.92276074797937,179.33120571044591,294.9023000085794,17.510143929770905,219.02712401670323,429.3664257515252,375.65120845577013,90.63197295756653,280.06172147214437,487.92075078114783,314.4723827466248,412.67406209663636,208.45313695477185,188.51271017661242,266.645526435222,188.04582352672284,263.6690347467884,221.10701649379837,292.51541888965227,162.7993290454939,20.84172984622057,221.22088065407442,199.94988012512994,125.61702288052201,294.54213704636754,186.14069200185978,92.13417349326747,3.153607388466595,71.00215488979688,367.193731749195,379.71038420724244,179.9106753694274,42.83657333629076,164.3941844260659,317.2738474040426,219.7813571115381,466.7899468174697,23.384057388914027,399.9553171943532,211.6545906659828,414.51153301845676,99.92599962283589,54.000011422075,116.993112879191,216.32174042994222,140.1535531305892,373.2278766219454,400.13925691279996,453.0350586420988,205.0295432301261,380.4368613777942,462.379877033407,75.87357770961245,380.3679068514091,2.571114177045808,202.87399087840384,84.93667592534449,407.5056431223203,209.41119909160653,133.61052897198235,407.5295465716897,22.387370318279864,116.47042352930548,459.34023146507394,201.01226801838567,480.47958128634883,184.6378679158891,128.34624953203212,432.4888300203682,193.6526610815641,304.6554163139249,344.98323695918265,205.95217420407607,123.99232938648541,399.04782218855405,110.59343046809855,27.267728270588208,31.661477422398665,296.09405280701174,169.31903626308852,164.91261728264007,165.52615066589982,418.47051651692425,384.8531356104646,191.0174528705141,175.3155289273206,10.555710094250493,20.81534195526613,460.76293987299147,157.87738142782226,457.3203189277397,246.24625350121,173.8405551231552,381.8738565442927,242.50266591005587,15.315975864713005,400.618630758647,406.19756913615925,280.8600558734097,241.45013950575523,121.39134317597866,413.00240357688523,488.7131317172617,131.70780492023604,52.868320172115176,348.58089716241227,223.0296334093801,331.5736634319155,343.9999684189513,319.0285244583577,157.40238448862542,456.47913429325473,497.31312478209423,22.77490881925037,466.1740010819082,297.30565098341344,166.43966483006457,314.4792441190959,39.32355655911846,225.25252753671165,394.346929215591,189.3741049603158,388.37458082569896,351.0564665864746,363.74651948258673,477.13172261818806,379.88951614516384,313.8048230688819,348.6898372549467,256.6617606478394,478.5985909394954,199.44424274374938,49.77090387321292,25.564466779705807,369.51171011928295,247.43650790418525,233.9017906551719,431.5881381153024,123.80986028353658,439.3312847433931,454.65319813009995,79.53960397717275,48.62670437071759,320.3079143242855,489.5148572198932,104.8510396451735,245.57260991614106,55.10858471050928,357.81932064442725,417.7905460447218,48.54238051459336,392.5197354766914,485.9323807207483,184.5046391573506,11.452537994117385,254.9598974758749,411.5647835559477,31.554234245640302,409.4654338848716,127.57173986801085,279.4160364577687,429.76050394741884,157.24245334837727,389.5673403153148,188.93787271475583,409.88945579151647,455.2626130497899,37.93615993645283,441.7590062198543,244.19164120416116,495.55416189624367,375.05807545577727,161.02769643926374,47.915390985521775,177.44993799537957,355.3224734899401,494.418969397323,128.61086866044812,293.31670759773976,358.31279866247746,72.9161223610304,301.4199123732596,254.76020903162444,347.6770145754604,482.91947476839414,166.54744358205753,309.6297728568025,375.29245522267564,312.0954336183289,219.25724679776758,400.0796363897927,473.94306921306537,275.15635609795584,369.3157136767533,428.3984364451749,35.05458159447272,94.84639501894377,273.5118287136522,349.095077599378,310.7292801831195,401.28244418245373,248.24426690691104,7.293831683689023,303.0785356800068,263.8746862575361,347.81955004464226,453.75868292714785,152.30064453172477,402.0731212944406,379.9157956720066,292.67573022149963,426.23500539287227,237.15698673126883,101.13001917118581,32.592836591598505,473.96492287106383,303.80573711530013,7.703526169700825,41.2644500842162,346.2272948360877,113.34436013895865,212.56616910176717,281.6876366820686,405.2663473898535,206.33208408520687,17.504655439564143,493.25810301168815,378.9960945522921,74.07867651754418,284.84110175411945,103.27115713800328,275.0825229640189,274.0501152457968,279.872362740874,353.76661678653574,222.82111877883415,62.13490477451666,280.93179559439284,185.22999106498716,109.31324671431742,260.276895726974,487.6977062427803,92.06469527339578,423.7364858405621,186.4818612604344,263.11516458044406,126.86956731741749,275.7013878469159,192.9510257328253,109.6592963431523,397.22086690007853,298.641759657283,29.713896337772326,217.63709838126277,362.4345597322874,263.28947833284377,392.9766272471096,147.76950739626082,350.56313295149675,140.96834341004728,373.1008106599387,8.578662206624843,488.31639614348296,84.658358455994,227.263078144888,41.646152195421784,16.48721547741605,21.55661715780688,128.59664759767887,212.16841444125956,405.7489648148489,215.9780301702875,243.75101273290844,84.19796685007508,305.7205011346237,241.78346137789785,146.19221522812532,96.70366584093482,225.87695423104626,497.8905319111656,444.66825138558374,6.407349398150464,256.9696365156428,392.4295884304285,188.4846904162477,389.36253104480056,242.71751584095068,310.43667233604685,295.22218117545293,385.015035548819,24.92615556973865,280.66605624844743,418.58058836481615,292.34846508028346,471.2650376430818,43.61765161973929,121.02851331788067,297.8678379054661,104.91509302575919,496.5057341216585,436.3601655821825,72.7040943364311,452.71045736818274,492.9926017831073,12.037677571286821,347.8847234532503,398.21360514073024,463.52330227113225,16.456756783308602,307.4972110915712,398.82552338034805,491.34785528168436,335.6476591246257,146.47120480415265,185.4704402938825,446.9043225843655,271.3265846731333,277.2600928681577,113.62139225925428,89.81368930257105,138.231288959755,381.1899628989106,499.35278737626896,426.6865886767101,414.39902835713724,285.4717912822381,192.33911230935286,364.6167140256532,145.49139908006637,284.2542521635559,148.41383422133813,327.5828643001518,433.9175215217549,384.459172584132,289.5660512514049,91.78733425642682,40.514752024808146,99.04294960342696,274.53711372556353,292.4704290087785,440.15395609196315,62.42645711842354,146.656705171619,310.51101341176457,34.52928441399128,493.19149254449854,291.2359669447953,479.48183800354195,43.513269566051505,353.4940276116392,82.91019126339205,484.0330537054607,12.448773597779073,348.7715183298601,432.6329823141783,10.363203394336384,149.8021841021674,125.83687056139637,326.70465774597903,268.8933115118236,397.36523049183137,168.5808439007056,422.1225476943071,362.99664018114896,341.04928115647004,227.9877626214607,139.17555360600943,316.16968938798004,204.85898386277267,249.18869461512892,229.99681885563783,101.4226535534749,463.21949974202545,475.09037117301756,252.84321641745234,335.83229175753684,288.87431250209374,334.07877766053406,217.07555983719462,65.8949372845653,380.0459097727229,154.67519299598075,463.3641381634699,384.63401544135434,448.32031357784876,493.5358307791381,360.76850660965863,284.7899650538737,106.72083372880681,416.2211765734799,480.84137615615475,164.42342147703337,427.1760108746081,353.8475798235767,57.13032221566827,32.22810573335466,11.069096912929233,467.4316065370938,467.9750843505665,445.6950879506293,456.39588893451065,497.0007135856759,386.6629939592746,450.42259305153,148.64459175431156,270.670284995131,487.3975582468673,148.2701827018329,269.4273952355373,148.47833728614114,228.43462373793665,256.4169131636529,323.8161921537103,211.6544174014915,389.02873345172986,466.76832696449253,440.1109246075069,399.14079595782215,208.68551668110769,111.59322384624959,343.6895540405813,221.60651433606037,355.7018370053928,326.81802003192706,348.8067865229556,278.03902455518556,313.2242886626122,340.56082050630476,106.64874180156158,418.44766645726395,268.0363599213028,310.2626772187349,149.27827524405245,323.42184645958616,75.51504936484821,156.66787193188313,149.57251750500788,356.5405244593134,144.1582823028006,88.58676776293161,347.50751624984935,172.1698067127838,415.0641205698578,292.3871828263722,132.66184518173608,270.6545556902664,311.2637094357996,310.6552796581058,396.18503835219457,408.80653286531555,80.53259188999873,451.951813334593,317.07088254079196,109.16080519023686,307.5776960326785,1.8626086191944058,170.11226988686778,419.7045439972411,211.35587000400335,266.0110032922545,433.37339831762847,98.13937113744397,306.7992520416244,329.8284103821599,328.1500847978139,6.446176264933712,195.26235754092258,139.12840366681468,204.5720750922293,150.50517366831085,493.7296461896187,306.8550131908575,225.29694973088544,109.52948228845149,11.01736202178516,312.1611377004622,457.97302676100094,190.5912658152812,141.1115698147273,449.14801907344,151.37912224638316,474.2703448351086,314.4235574728317,416.99828448514575,103.58786771478357,171.12604453285107,281.8584062174975,107.18229907324017,440.2118409839422,306.9235200058561,186.1166621513065,350.6878751866872,161.12603575280738,445.02307600466395,340.644904340045,192.37664778324992,396.2468799792838,189.37340043953955,4.273127171159463,25.61821861566804,163.858201895955,344.7189207658782,171.96052259485904,199.99777215660518,349.69833962905074,269.62785191522664,413.3519868272657,305.1105817281781,376.41687787209696,292.3359061828822,461.043283732687,27.102747582828158,366.8651103186944,444.50153259146555,197.32490046225902,43.08759656189709,365.6912580391148,58.97904473566806,130.05037957151765,409.4491575718762,122.4905878806245,459.82299028263316,425.9604827098556,47.1443371732303,432.2436154086042,132.31550186450613,69.11077113248432,202.9185031792,161.71127469141788,16.709056883170483,81.42878661398811,183.85351858087796,218.2741327041966,150.04349410630502,104.76513574430135,209.96731606157704,398.6025009594799,467.1678712358595,351.1540208328041,156.97066683229068,63.538421634241836,248.3962822006226,168.39403502570516,157.0481985429224,12.397108850888738,481.8654223504929,361.9683762820894,335.14430373631046,114.80840427953609,324.69128537625926,40.25864289613246,127.99260306969296,332.80956985270547,229.53675062349865,420.2859666327533,59.2102225665837,336.9978298254774,16.061953227926363,40.93584303401454,94.13705975307917,432.92073811277896,199.52074735447934,106.5688589528777,72.16830842340582,242.81554141260264,493.6342477625654,252.07933995063792]}

},{}],108:[function(require,module,exports){
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
var abs = require( '@stdlib/math/base/special/abs' );
var EPS = require( '@stdlib/constants/float64/eps' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var PI = require( '@stdlib/constants/float64/pi' );
var Complex128 = require( '@stdlib/complex/float64/ctor' );
var cphase = require( './../lib' );


// FIXTURES //

var positivePositive = require( './fixtures/julia/positive_positive.json' );
var negativePositive = require( './fixtures/julia/negative_positive.json' );
var negativeNegative = require( './fixtures/julia/negative_negative.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof cphase, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns `NaN` if provided `NaN` as either of the arguments', function test( t ) {
	t.strictEqual( isnan( cphase( new Complex128( 2.0, NaN ) ) ), true, 'returns expected value' );
	t.strictEqual( isnan( cphase( new Complex128( NaN, 3.0 ) ) ), true, 'returns expected value' );
	t.end();
});

tape( 'the function returns `+0` if provided `im = +0.0` and `re >= 0`', function test( t ) {
	t.strictEqual( cphase( new Complex128( 0.0, +0.0) ), +0.0, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( 2.0, +0.0) ), +0.0, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( 4.0, +0.0) ), +0.0, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( 5.0, +0.0) ), +0.0, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( 10.0, +0.0) ), +0.0, 'returns expected value' );
	t.end();
});

tape( 'the function returns `-0` if provided `im = -0.0` and `re >= 0`', function test( t ) {
	t.strictEqual( isNegativeZero( cphase( new Complex128( 0.0, -0.0 ) ) ), true, 'returns expected value' );
	t.strictEqual( isNegativeZero( cphase( new Complex128( 2.0, -0.0 ) ) ), true, 'returns expected value' );
	t.strictEqual( isNegativeZero( cphase( new Complex128( 4.0, -0.0 ) ) ), true, 'returns expected value' );
	t.strictEqual( isNegativeZero( cphase( new Complex128( 5.0, -0.0 ) ) ), true, 'returns expected value' );
	t.strictEqual( isNegativeZero( cphase( new Complex128( 10.0, -0.0 ) ) ), true, 'returns expected value' );
	t.end();
});

tape( 'the function returns `PI` if provided `im = +0.0` and `re <= -0.0`', function test( t ) {
	t.strictEqual( cphase( new Complex128( -0.0, +0.0 ) ), +PI, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( -2.0, +0.0 ) ), +PI, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( -4.0, +0.0 ) ), +PI, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( -5.0, +0.0 ) ), +PI, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( -10.0, +0.0 ) ), +PI, 'returns expected value' );
	t.end();
});

tape( 'the function returns `-PI` if provided `im = -0.0` and `re <= -0.0`', function test( t ) {
	t.strictEqual( cphase( new Complex128( -0.0, -0.0 ) ), -PI, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( -2.0, -0.0 ) ), -PI, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( -4.0, -0.0 ) ), -PI, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( -5.0, -0.0 ) ), -PI, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( -10.0, -0.0 ) ), -PI, 'returns expected value' );
	t.end();
});

tape( 'the function returns `+PI/4` if provided `re = im = +infinity`', function test( t ) {
	t.strictEqual( cphase( new Complex128( PINF, PINF ) ), +PI/4.0, 'returns expected value' );
	t.end();
});

tape( 'the function returns `-PI/4` if provided `re = -im = +infinity`', function test( t ) {
	t.strictEqual( cphase( new Complex128( PINF, NINF ) ), -PI/4.0, 'returns expected value' );
	t.end();
});

tape( 'the function returns `*3*PI/4` if provided `-re = im = +infinity`', function test( t ) {
	t.strictEqual( cphase( new Complex128( NINF, PINF ) ), +3.0*PI/4.0, 'returns expected value' );
	t.end();
});

tape( 'the function returns `-3*PI/4` if provided `re = im = -infinity`', function test( t ) {
	t.strictEqual( cphase( new Complex128( NINF, NINF ) ), -3.0*PI/4.0, 'returns expected value' );
	t.end();
});

tape( 'the function returns `0.0` when `re = +infinity`', function test( t ) {
	t.strictEqual( cphase( new Complex128( PINF, -2.0 ) ), 0.0, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( PINF, 0.0 ) ), 0.0, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( PINF, 2.0 ) ), 0.0, 'returns expected value' );
	t.end();
});

tape( 'the function returns `+PI` when `im > 0` and `re = -infinity`', function test( t ) {
	t.strictEqual( cphase( new Complex128( NINF, 1.0 ) ), PI, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( NINF, 2.0 ) ), PI, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( NINF, 3.0 ) ), PI, 'returns expected value' );
	t.end();
});

tape( 'the function returns `-PI` when `im < 0` and `re = -infinity`', function test( t ) {
	t.strictEqual( cphase( new Complex128( NINF, -1.0 ) ), -PI, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( NINF, -2.0 ) ), -PI, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( NINF, -3.0 ) ), -PI, 'returns expected value' );
	t.end();
});

tape( 'the function returns `+PI/2` when `im = +infinity`', function test( t ) {
	t.strictEqual( cphase( new Complex128( -1.0, PINF ) ), PI/2.0, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( 0.0, PINF ) ), PI/2.0, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( 2.0, PINF ) ), PI/2.0, 'returns expected value' );
	t.end();
});

tape( 'the function returns `-PI/2` when `im = -infinity`', function test( t ) {
	t.strictEqual( cphase( new Complex128( -1.0, NINF ) ), -PI/2.0, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( 0.0, NINF ) ), -PI/2.0, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( 2.0, NINF ) ), -PI/2.0, 'returns expected value' );
	t.end();
});

tape( 'the function returns `PI/2` if provided a positive `im` and `re=0`', function test( t ) {
	t.strictEqual( cphase( new Complex128( 0.0, 2.0 ) ), PI/2.0, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( 0.0, 1.0 ) ), PI/2.0, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( 0.0, 0.5 ) ), PI/2.0, 'returns expected value' );
	t.end();
});

tape( 'the function returns `-PI/2` if provided a negative `im` and `re=0`', function test( t ) {
	t.strictEqual( cphase( new Complex128( 0.0, -2.0 ) ), -PI/2.0, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( 0.0, -1.0 ) ), -PI/2.0, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( 0.0, -0.5 ) ), -PI/2.0, 'returns expected value' );
	t.end();
});

tape( 'the function computes the argument of a complex number (when `re` and `im` are positive)', function test( t ) {
	var expected;
	var actual;
	var delta;
	var tol;
	var re;
	var im;
	var i;

	re = positivePositive.re;
	im = positivePositive.im;
	expected = positivePositive.expected;
	for ( i = 0; i < re.length; i++ ) {
		actual = cphase( new Complex128( re[i], im[i] ) );
		delta = abs( actual - expected[i] );
		tol = EPS * abs( expected[i] );
		t.strictEqual( delta <= tol, true, 'within tolerance. re: '+re[i]+'. im: '+im[i]+'. Actual: '+actual+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
	}
	t.end();
});

tape( 'the function computes the argument of a complex number (when `re` is negative and `im` is positive)', function test( t ) {
	var expected;
	var actual;
	var delta;
	var tol;
	var re;
	var im;
	var i;

	re = negativePositive.re;
	im = negativePositive.im;
	expected = negativePositive.expected;
	for ( i = 0; i < re.length; i++ ) {
		actual = cphase( new Complex128( re[i], im[i] ) );
		delta = abs( actual - expected[i] );
		tol = 2.0 * EPS * abs( expected[i] );
		t.strictEqual( delta <= tol, true, 'within tolerance. re: '+re[i]+'. im: '+im[i]+'. Actual: '+actual+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
	}
	t.end();
});

tape( 'the function computes the argument of a complex number (when `re` and `im` are negative)', function test( t ) {
	var expected;
	var actual;
	var delta;
	var tol;
	var re;
	var im;
	var i;

	re = negativeNegative.re;
	im = negativeNegative.im;
	expected = negativeNegative.expected;
	for ( i = 0; i < re.length; i++ ) {
		actual = cphase( new Complex128( re[i], im[i] ) );
		delta = abs( actual - expected[i] );
		tol = 2.0 * EPS * abs( expected[i] );
		t.strictEqual( delta <= tol, true, 'within tolerance. re: '+re[i]+'. im: '+im[i]+'. Actual: '+actual+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/cphase/test/test.js")
},{"./../lib":103,"./fixtures/julia/negative_negative.json":105,"./fixtures/julia/negative_positive.json":106,"./fixtures/julia/positive_positive.json":107,"@stdlib/complex/float64/ctor":68,"@stdlib/constants/float64/eps":76,"@stdlib/constants/float64/ninf":81,"@stdlib/constants/float64/pi":82,"@stdlib/constants/float64/pinf":83,"@stdlib/math/base/assert/is-nan":89,"@stdlib/math/base/assert/is-negative-zero":91,"@stdlib/math/base/special/abs":93,"tape":301}],109:[function(require,module,exports){
(function (__filename,__dirname){(function (){
/**
* @license Apache-2.0
*
* Copyright (c) 2023 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var abs = require( '@stdlib/math/base/special/abs' );
var EPS = require( '@stdlib/constants/float64/eps' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var PI = require( '@stdlib/constants/float64/pi' );
var Complex128 = require( '@stdlib/complex/float64/ctor' );
var tryRequire = require( '@stdlib/utils/try-require' );


// VARIABLES //

var cphase = tryRequire( resolve( __dirname, './../lib/native.js' ) );
var opts = {
	'skip': ( cphase instanceof Error )
};


// FIXTURES //

var positivePositive = require( './fixtures/julia/positive_positive.json' );
var negativePositive = require( './fixtures/julia/negative_positive.json' );
var negativeNegative = require( './fixtures/julia/negative_negative.json' );


// TESTS //

tape( 'main export is a function', opts, function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof cphase, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns `NaN` if provided `NaN` as either of the arguments', opts, function test( t ) {
	t.strictEqual( isnan( cphase( new Complex128( 2.0, NaN ) ) ), true, 'returns expected value' );
	t.strictEqual( isnan( cphase( new Complex128( NaN, 3.0 ) ) ), true, 'returns expected value' );
	t.end();
});

tape( 'the function returns `+0` if provided `im = +0.0` and `re >= 0`', opts, function test( t ) {
	t.strictEqual( cphase( new Complex128( 0.0, +0.0) ), +0.0, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( 2.0, +0.0) ), +0.0, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( 4.0, +0.0) ), +0.0, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( 5.0, +0.0) ), +0.0, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( 10.0, +0.0) ), +0.0, 'returns expected value' );
	t.end();
});

tape( 'the function returns `-0` if provided `im = -0.0` and `re >= 0`', opts, function test( t ) {
	t.strictEqual( isNegativeZero( cphase( new Complex128( 0.0, -0.0 ) ) ), true, 'returns expected value' );
	t.strictEqual( isNegativeZero( cphase( new Complex128( 2.0, -0.0 ) ) ), true, 'returns expected value' );
	t.strictEqual( isNegativeZero( cphase( new Complex128( 4.0, -0.0 ) ) ), true, 'returns expected value' );
	t.strictEqual( isNegativeZero( cphase( new Complex128( 5.0, -0.0 ) ) ), true, 'returns expected value' );
	t.strictEqual( isNegativeZero( cphase( new Complex128( 10.0, -0.0 ) ) ), true, 'returns expected value' );
	t.end();
});

tape( 'the function returns `PI` if provided `im = +0.0` and `re <= -0.0`', opts, function test( t ) {
	t.strictEqual( cphase( new Complex128( -0.0, +0.0 ) ), +PI, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( -2.0, +0.0 ) ), +PI, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( -4.0, +0.0 ) ), +PI, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( -5.0, +0.0 ) ), +PI, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( -10.0, +0.0 ) ), +PI, 'returns expected value' );
	t.end();
});

tape( 'the function returns `-PI` if provided `im = -0.0` and `re <= -0.0`', opts, function test( t ) {
	t.strictEqual( cphase( new Complex128( -0.0, -0.0 ) ), -PI, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( -2.0, -0.0 ) ), -PI, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( -4.0, -0.0 ) ), -PI, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( -5.0, -0.0 ) ), -PI, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( -10.0, -0.0 ) ), -PI, 'returns expected value' );
	t.end();
});

tape( 'the function returns `+PI/4` if provided `re = im = +infinity`', opts, function test( t ) {
	t.strictEqual( cphase( new Complex128( PINF, PINF ) ), +PI/4.0, 'returns expected value' );
	t.end();
});

tape( 'the function returns `-PI/4` if provided `re = -im = +infinity`', opts, function test( t ) {
	t.strictEqual( cphase( new Complex128( PINF, NINF ) ), -PI/4.0, 'returns expected value' );
	t.end();
});

tape( 'the function returns `*3*PI/4` if provided `-re = im = +infinity`', opts, function test( t ) {
	t.strictEqual( cphase( new Complex128( NINF, PINF ) ), +3.0*PI/4.0, 'returns expected value' );
	t.end();
});

tape( 'the function returns `-3*PI/4` if provided `re = im = -infinity`', opts, function test( t ) {
	t.strictEqual( cphase( new Complex128( NINF, NINF ) ), -3.0*PI/4.0, 'returns expected value' );
	t.end();
});

tape( 'the function returns `0.0` when `re = +infinity`', opts, function test( t ) {
	t.strictEqual( cphase( new Complex128( PINF, -2.0 ) ), 0.0, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( PINF, 0.0 ) ), 0.0, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( PINF, 2.0 ) ), 0.0, 'returns expected value' );
	t.end();
});

tape( 'the function returns `+PI` when `im > 0` and `re = -infinity`', opts, function test( t ) {
	t.strictEqual( cphase( new Complex128( NINF, 1.0 ) ), PI, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( NINF, 2.0 ) ), PI, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( NINF, 3.0 ) ), PI, 'returns expected value' );
	t.end();
});

tape( 'the function returns `-PI` when `im < 0` and `re = -infinity`', opts, function test( t ) {
	t.strictEqual( cphase( new Complex128( NINF, -1.0 ) ), -PI, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( NINF, -2.0 ) ), -PI, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( NINF, -3.0 ) ), -PI, 'returns expected value' );
	t.end();
});

tape( 'the function returns `+PI/2` when `im = +infinity`', opts, function test( t ) {
	t.strictEqual( cphase( new Complex128( -1.0, PINF ) ), PI/2.0, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( 0.0, PINF ) ), PI/2.0, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( 2.0, PINF ) ), PI/2.0, 'returns expected value' );
	t.end();
});

tape( 'the function returns `-PI/2` when `im = -infinity`', opts, function test( t ) {
	t.strictEqual( cphase( new Complex128( -1.0, NINF ) ), -PI/2.0, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( 0.0, NINF ) ), -PI/2.0, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( 2.0, NINF ) ), -PI/2.0, 'returns expected value' );
	t.end();
});

tape( 'the function returns `PI/2` if provided a positive `im` and `re=0`', opts, function test( t ) {
	t.strictEqual( cphase( new Complex128( 0.0, 2.0 ) ), PI/2.0, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( 0.0, 1.0 ) ), PI/2.0, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( 0.0, 0.5 ) ), PI/2.0, 'returns expected value' );
	t.end();
});

tape( 'the function returns `-PI/2` if provided a negative `im` and `re=0`', opts, function test( t ) {
	t.strictEqual( cphase( new Complex128( 0.0, -2.0 ) ), -PI/2.0, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( 0.0, -1.0 ) ), -PI/2.0, 'returns expected value' );
	t.strictEqual( cphase( new Complex128( 0.0, -0.5 ) ), -PI/2.0, 'returns expected value' );
	t.end();
});

tape( 'the function computes the argument of a complex number (when `re` and `im` are positive)', opts, function test( t ) {
	var expected;
	var actual;
	var delta;
	var tol;
	var re;
	var im;
	var i;

	re = positivePositive.re;
	im = positivePositive.im;
	expected = positivePositive.expected;
	for ( i = 0; i < re.length; i++ ) {
		actual = cphase( new Complex128( re[i], im[i] ) );
		delta = abs( actual - expected[i] );
		tol = EPS * abs( expected[i] );
		t.strictEqual( delta <= tol, true, 'within tolerance. re: '+re[i]+'. im: '+im[i]+'. Actual: '+actual+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
	}
	t.end();
});

tape( 'the function computes the argument of a complex number (when `re` is negative and `im` is positive)', opts, function test( t ) {
	var expected;
	var actual;
	var delta;
	var tol;
	var re;
	var im;
	var i;

	re = negativePositive.re;
	im = negativePositive.im;
	expected = negativePositive.expected;
	for ( i = 0; i < re.length; i++ ) {
		actual = cphase( new Complex128( re[i], im[i] ) );
		delta = abs( actual - expected[i] );
		tol = 2.0 * EPS * abs( expected[i] );
		t.strictEqual( delta <= tol, true, 'within tolerance. re: '+re[i]+'. im: '+im[i]+'. Actual: '+actual+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
	}
	t.end();
});

tape( 'the function computes the argument of a complex number (when `re` and `im` are negative)', opts, function test( t ) {
	var expected;
	var actual;
	var delta;
	var tol;
	var re;
	var im;
	var i;

	re = negativeNegative.re;
	im = negativeNegative.im;
	expected = negativeNegative.expected;
	for ( i = 0; i < re.length; i++ ) {
		actual = cphase( new Complex128( re[i], im[i] ) );
		delta = abs( actual - expected[i] );
		tol = 2.0 * EPS * abs( expected[i] );
		t.strictEqual( delta <= tol, true, 'within tolerance. re: '+re[i]+'. im: '+im[i]+'. Actual: '+actual+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/cphase/test/test.native.js","/lib/node_modules/@stdlib/math/base/special/cphase/test")
},{"./fixtures/julia/negative_negative.json":105,"./fixtures/julia/negative_positive.json":106,"./fixtures/julia/positive_positive.json":107,"@stdlib/complex/float64/ctor":68,"@stdlib/constants/float64/eps":76,"@stdlib/constants/float64/ninf":81,"@stdlib/constants/float64/pi":82,"@stdlib/constants/float64/pinf":83,"@stdlib/math/base/assert/is-nan":89,"@stdlib/math/base/assert/is-negative-zero":91,"@stdlib/math/base/special/abs":93,"@stdlib/utils/try-require":169,"path":183,"tape":301}],110:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

// EXPORTS //

module.exports = Number; // eslint-disable-line stdlib/require-globals

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

},{"./main.js":114}],113:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":48}],114:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":113,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],115:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":48}],116:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":117}],117:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":115,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],118:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":119}],119:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/float64/base/get-high-word":116}],120:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":122,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],121:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":120,"./main.js":123,"@stdlib/utils/define-nonenumerable-read-only-property":146}],122:[function(require,module,exports){
arguments[4][113][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":48,"dup":113}],123:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":120}],124:[function(require,module,exports){
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

},{"./main.js":125}],125:[function(require,module,exports){
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

},{}],126:[function(require,module,exports){
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

},{"./main.js":127,"./regexp.js":128,"@stdlib/utils/define-nonenumerable-read-only-property":146}],127:[function(require,module,exports){
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

},{}],128:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":127}],129:[function(require,module,exports){
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

},{"./is_number.js":132}],130:[function(require,module,exports){
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

},{"./is_number.js":132,"./zero_pad.js":136}],131:[function(require,module,exports){
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

},{"./main.js":134}],132:[function(require,module,exports){
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

},{}],133:[function(require,module,exports){
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

},{}],134:[function(require,module,exports){
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

},{"./format_double.js":129,"./format_integer.js":130,"./is_string.js":133,"./space_pad.js":135,"./zero_pad.js":136}],135:[function(require,module,exports){
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

},{}],136:[function(require,module,exports){
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

},{}],137:[function(require,module,exports){
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

},{"./main.js":138}],138:[function(require,module,exports){
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

},{"./main.js":141}],140:[function(require,module,exports){
arguments[4][133][0].apply(exports,arguments)
},{"dup":133}],141:[function(require,module,exports){
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

},{"./is_string.js":140,"@stdlib/string/base/format-interpolate":131,"@stdlib/string/base/format-tokenize":137}],142:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":143}],143:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],144:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":145}],145:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-buffer":39,"@stdlib/regexp/function-name":126,"@stdlib/utils/native-class":164}],146:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":151}],148:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],149:[function(require,module,exports){
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

},{}],150:[function(require,module,exports){
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

},{"./define_property.js":149}],151:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":148,"./has_define_property_support.js":150,"./polyfill.js":152}],152:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":139}],153:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./native.js":156,"./polyfill.js":157,"@stdlib/assert/is-function":45}],154:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":155}],155:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./detect.js":153,"@stdlib/object/ctor":124}],156:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],157:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./proto.js":158,"@stdlib/utils/native-class":164}],158:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],159:[function(require,module,exports){
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

},{"./codegen.js":160,"./global_this.js":161,"./self.js":162,"./window.js":163,"@stdlib/assert/is-boolean":33,"@stdlib/string/format":139}],160:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],161:[function(require,module,exports){
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

// MAIN //

var obj = ( typeof self === 'object' ) ? self : null;


// EXPORTS //

module.exports = obj;

},{}],163:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],164:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":165,"./polyfill.js":166,"@stdlib/assert/has-tostringtag-support":20}],165:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":167}],166:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":167,"./tostringtag.js":168,"@stdlib/assert/has-own-property":16}],167:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MODULES //

var Symbol = require( '@stdlib/symbol/ctor' );


// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{"@stdlib/symbol/ctor":142}],169:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":170}],170:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-error":41}],171:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./fixtures/nodelist.js":172,"./fixtures/re.js":173,"./fixtures/typedarray.js":174}],172:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/global":159}],173:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],174:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],175:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./check.js":171,"./main.js":176,"./polyfill.js":177}],176:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/constructor-name":144}],177:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/constructor-name":144}],178:[function(require,module,exports){
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

},{}],179:[function(require,module,exports){

},{}],180:[function(require,module,exports){
arguments[4][179][0].apply(exports,arguments)
},{"dup":179}],181:[function(require,module,exports){
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
},{"base64-js":178,"buffer":181,"ieee754":284}],182:[function(require,module,exports){
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

},{}],183:[function(require,module,exports){
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
},{"_process":291}],184:[function(require,module,exports){
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

},{"events":182,"inherits":285,"readable-stream/lib/_stream_duplex.js":186,"readable-stream/lib/_stream_passthrough.js":187,"readable-stream/lib/_stream_readable.js":188,"readable-stream/lib/_stream_transform.js":189,"readable-stream/lib/_stream_writable.js":190,"readable-stream/lib/internal/streams/end-of-stream.js":194,"readable-stream/lib/internal/streams/pipeline.js":196}],185:[function(require,module,exports){
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

},{}],186:[function(require,module,exports){
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
},{"./_stream_readable":188,"./_stream_writable":190,"_process":291,"inherits":285}],187:[function(require,module,exports){
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
},{"./_stream_transform":189,"inherits":285}],188:[function(require,module,exports){
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
},{"../errors":185,"./_stream_duplex":186,"./internal/streams/async_iterator":191,"./internal/streams/buffer_list":192,"./internal/streams/destroy":193,"./internal/streams/from":195,"./internal/streams/state":197,"./internal/streams/stream":198,"_process":291,"buffer":181,"events":182,"inherits":285,"string_decoder/":300,"util":179}],189:[function(require,module,exports){
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
},{"../errors":185,"./_stream_duplex":186,"inherits":285}],190:[function(require,module,exports){
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
},{"../errors":185,"./_stream_duplex":186,"./internal/streams/destroy":193,"./internal/streams/state":197,"./internal/streams/stream":198,"_process":291,"buffer":181,"inherits":285,"util-deprecate":309}],191:[function(require,module,exports){
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
},{"./end-of-stream":194,"_process":291}],192:[function(require,module,exports){
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
},{"buffer":181,"util":179}],193:[function(require,module,exports){
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
},{"_process":291}],194:[function(require,module,exports){
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
},{"../../../errors":185}],195:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],196:[function(require,module,exports){
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
},{"../../../errors":185,"./end-of-stream":194}],197:[function(require,module,exports){
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
},{"../../../errors":185}],198:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":182}],199:[function(require,module,exports){
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

},{"./":200,"get-intrinsic":275}],200:[function(require,module,exports){
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

},{"es-define-property":260,"es-errors/type":266,"function-bind":274,"get-intrinsic":275,"set-function-length":295}],201:[function(require,module,exports){
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

},{"./lib/is_arguments.js":202,"./lib/keys.js":203}],202:[function(require,module,exports){
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

},{}],203:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],204:[function(require,module,exports){
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

},{"es-define-property":260,"es-errors/syntax":265,"es-errors/type":266,"gopd":276}],205:[function(require,module,exports){
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

},{"define-data-property":204,"has-property-descriptors":277,"object-keys":289}],206:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],207:[function(require,module,exports){
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

},{"./ToNumber":238,"./ToPrimitive":240,"./Type":245}],208:[function(require,module,exports){
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

},{"../helpers/isFinite":253,"../helpers/isNaN":254,"../helpers/isPrefixOf":255,"./ToNumber":238,"./ToPrimitive":240,"es-errors/type":266,"get-intrinsic":275}],209:[function(require,module,exports){
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

},{"call-bind/callBound":199,"es-errors/type":266}],210:[function(require,module,exports){
'use strict';

var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value) {
	return RequireObjectCoercible(value, arguments.length > 1 ? arguments[1] : void undefined);
};

},{"es-object-atoms/RequireObjectCoercible":268}],211:[function(require,module,exports){
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

},{"./DayWithinYear":214,"./InLeapYear":218,"./MonthFromTime":228,"es-errors/eval":261}],212:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":259,"./floor":249}],213:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":249}],214:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":212,"./DayFromYear":213,"./YearFromTime":247}],215:[function(require,module,exports){
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

},{"./modulo":250}],216:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":257,"./IsAccessorDescriptor":219,"./IsDataDescriptor":221,"es-errors/type":266}],217:[function(require,module,exports){
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

},{"../helpers/timeConstants":259,"./floor":249,"./modulo":250}],218:[function(require,module,exports){
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

},{"./DaysInYear":215,"./YearFromTime":247,"es-errors/eval":261}],219:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":257,"es-errors/type":266,"hasown":283}],220:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":286}],221:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":257,"es-errors/type":266,"hasown":283}],222:[function(require,module,exports){
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

},{"./IsAccessorDescriptor":219,"./IsDataDescriptor":221,"./IsPropertyDescriptor":223,"es-errors/type":266}],223:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor(Desc);
};

},{"../helpers/records/property-descriptor":257}],224:[function(require,module,exports){
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

},{"../helpers/isFinite":253,"../helpers/timeConstants":259}],225:[function(require,module,exports){
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

},{"../helpers/isFinite":253,"./DateFromTime":211,"./Day":212,"./MonthFromTime":228,"./ToInteger":237,"./YearFromTime":247,"./floor":249,"./modulo":250,"get-intrinsic":275}],226:[function(require,module,exports){
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

},{"../helpers/isFinite":253,"../helpers/timeConstants":259,"./ToInteger":237}],227:[function(require,module,exports){
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

},{"../helpers/timeConstants":259,"./floor":249,"./modulo":250}],228:[function(require,module,exports){
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

},{"./DayWithinYear":214,"./InLeapYear":218}],229:[function(require,module,exports){
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

},{"../helpers/isNaN":254}],230:[function(require,module,exports){
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

},{"../helpers/timeConstants":259,"./floor":249,"./modulo":250}],231:[function(require,module,exports){
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

},{"./Type":245}],232:[function(require,module,exports){
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


},{"../helpers/isFinite":253,"./ToNumber":238,"./abs":248,"get-intrinsic":275}],233:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":259,"./DayFromYear":213}],234:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":259,"./modulo":250}],235:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],236:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":238}],237:[function(require,module,exports){
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

},{"../helpers/isFinite":253,"../helpers/isNaN":254,"../helpers/sign":258,"./ToNumber":238,"./abs":248,"./floor":249}],238:[function(require,module,exports){
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

},{"./ToPrimitive":240,"call-bind/callBound":199,"safe-regex-test":294}],239:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = require('es-object-atoms/ToObject');

},{"es-object-atoms/ToObject":269}],240:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":271}],241:[function(require,module,exports){
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

},{"./IsCallable":220,"./ToBoolean":235,"./Type":245,"es-errors/type":266,"hasown":283}],242:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":275}],243:[function(require,module,exports){
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

},{"../helpers/isFinite":253,"../helpers/isNaN":254,"../helpers/sign":258,"./ToNumber":238,"./abs":248,"./floor":249,"./modulo":250}],244:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":238}],245:[function(require,module,exports){
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

},{}],246:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":212,"./modulo":250}],247:[function(require,module,exports){
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

},{"call-bind/callBound":199,"get-intrinsic":275}],248:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":275}],249:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],250:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":256}],251:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":259,"./modulo":250}],252:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":207,"./5/AbstractRelationalComparison":208,"./5/Canonicalize":209,"./5/CheckObjectCoercible":210,"./5/DateFromTime":211,"./5/Day":212,"./5/DayFromYear":213,"./5/DayWithinYear":214,"./5/DaysInYear":215,"./5/FromPropertyDescriptor":216,"./5/HourFromTime":217,"./5/InLeapYear":218,"./5/IsAccessorDescriptor":219,"./5/IsCallable":220,"./5/IsDataDescriptor":221,"./5/IsGenericDescriptor":222,"./5/IsPropertyDescriptor":223,"./5/MakeDate":224,"./5/MakeDay":225,"./5/MakeTime":226,"./5/MinFromTime":227,"./5/MonthFromTime":228,"./5/SameValue":229,"./5/SecFromTime":230,"./5/StrictEqualityComparison":231,"./5/TimeClip":232,"./5/TimeFromYear":233,"./5/TimeWithinDay":234,"./5/ToBoolean":235,"./5/ToInt32":236,"./5/ToInteger":237,"./5/ToNumber":238,"./5/ToObject":239,"./5/ToPrimitive":240,"./5/ToPropertyDescriptor":241,"./5/ToString":242,"./5/ToUint16":243,"./5/ToUint32":244,"./5/Type":245,"./5/WeekDay":246,"./5/YearFromTime":247,"./5/abs":248,"./5/floor":249,"./5/modulo":250,"./5/msFromTime":251}],253:[function(require,module,exports){
'use strict';

var $isNaN = require('./isNaN');

module.exports = function (x) { return (typeof x === 'number' || typeof x === 'bigint') && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{"./isNaN":254}],254:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],255:[function(require,module,exports){
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

},{"call-bind/callBound":199}],256:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],257:[function(require,module,exports){
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

},{"es-errors/type":266,"hasown":283}],258:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],259:[function(require,module,exports){
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

},{}],260:[function(require,module,exports){
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

},{"get-intrinsic":275}],261:[function(require,module,exports){
'use strict';

/** @type {import('./eval')} */
module.exports = EvalError;

},{}],262:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Error;

},{}],263:[function(require,module,exports){
'use strict';

/** @type {import('./range')} */
module.exports = RangeError;

},{}],264:[function(require,module,exports){
'use strict';

/** @type {import('./ref')} */
module.exports = ReferenceError;

},{}],265:[function(require,module,exports){
'use strict';

/** @type {import('./syntax')} */
module.exports = SyntaxError;

},{}],266:[function(require,module,exports){
'use strict';

/** @type {import('./type')} */
module.exports = TypeError;

},{}],267:[function(require,module,exports){
'use strict';

/** @type {import('./uri')} */
module.exports = URIError;

},{}],268:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

/** @type {import('./RequireObjectCoercible')} */
module.exports = function RequireObjectCoercible(value) {
	if (value == null) {
		throw new $TypeError((arguments.length > 0 && arguments[1]) || ('Cannot call method on ' + value));
	}
	return value;
};

},{"es-errors/type":266}],269:[function(require,module,exports){
'use strict';

var $Object = require('./');
var RequireObjectCoercible = require('./RequireObjectCoercible');

/** @type {import('./ToObject')} */
module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

},{"./":270,"./RequireObjectCoercible":268}],270:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Object;

},{}],271:[function(require,module,exports){
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

},{"./helpers/isPrimitive":272,"is-callable":286}],272:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],273:[function(require,module,exports){
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

},{}],274:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":273}],275:[function(require,module,exports){
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

},{"es-errors":262,"es-errors/eval":261,"es-errors/range":263,"es-errors/ref":264,"es-errors/syntax":265,"es-errors/type":266,"es-errors/uri":267,"function-bind":274,"has-proto":278,"has-symbols":279,"hasown":283}],276:[function(require,module,exports){
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

},{"get-intrinsic":275}],277:[function(require,module,exports){
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

},{"es-define-property":260}],278:[function(require,module,exports){
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

},{}],279:[function(require,module,exports){
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

},{"./shams":280}],280:[function(require,module,exports){
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

},{}],281:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":280}],282:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":274}],283:[function(require,module,exports){
'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);

},{"function-bind":274}],284:[function(require,module,exports){
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

},{}],285:[function(require,module,exports){
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

},{}],286:[function(require,module,exports){
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

},{}],287:[function(require,module,exports){
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

},{"call-bind/callBound":199,"has-tostringtag/shams":281}],288:[function(require,module,exports){
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

},{"./isArguments":290}],289:[function(require,module,exports){
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

},{"./implementation":288,"./isArguments":290}],290:[function(require,module,exports){
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

},{}],291:[function(require,module,exports){
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

},{}],292:[function(require,module,exports){
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
},{"_process":291,"through":307,"timers":308}],293:[function(require,module,exports){
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

},{"buffer":181}],294:[function(require,module,exports){
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

},{"call-bind/callBound":199,"es-errors/type":266,"is-regex":287}],295:[function(require,module,exports){
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

},{"define-data-property":204,"es-errors/type":266,"get-intrinsic":275,"gopd":276,"has-property-descriptors":277}],296:[function(require,module,exports){
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

},{"es-abstract/es5":252,"function-bind":274}],297:[function(require,module,exports){
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

},{"./implementation":296,"./polyfill":298,"./shim":299,"define-properties":205,"function-bind":274}],298:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":296}],299:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":298,"define-properties":205}],300:[function(require,module,exports){
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
},{"safe-buffer":293}],301:[function(require,module,exports){
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
},{"./lib/default_stream":302,"./lib/results":304,"./lib/test":305,"_process":291,"defined":206,"through":307,"timers":308}],302:[function(require,module,exports){
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
},{"_process":291,"fs":180,"through":307}],303:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":291,"timers":308}],304:[function(require,module,exports){
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
},{"_process":291,"events":182,"function-bind":274,"has":282,"inherits":285,"object-inspect":306,"resumer":292,"through":307,"timers":308}],305:[function(require,module,exports){
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
},{"./next_tick":303,"deep-equal":201,"defined":206,"events":182,"has":282,"inherits":285,"path":183,"string.prototype.trim":297}],306:[function(require,module,exports){
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

},{}],307:[function(require,module,exports){
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
},{"_process":291,"stream":184}],308:[function(require,module,exports){
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
},{"process/browser.js":291,"timers":308}],309:[function(require,module,exports){
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
},{}]},{},[108,109]);
