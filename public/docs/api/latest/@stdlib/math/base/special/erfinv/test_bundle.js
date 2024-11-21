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

},{"./uint16array.js":24,"@stdlib/assert/is-uint16array":52,"@stdlib/constants/uint16/max":66}],24:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint32array.js":27,"@stdlib/assert/is-uint32array":54,"@stdlib/constants/uint32/max":67}],27:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint8array.js":30,"@stdlib/assert/is-uint8array":56,"@stdlib/constants/uint8/max":68}],30:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/native-class":146}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":34,"./object.js":35,"./primitive.js":36,"@stdlib/utils/define-nonenumerable-read-only-property":128}],34:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./try2serialize.js":38,"@stdlib/assert/has-tostringtag-support":20,"@stdlib/boolean/ctor":60,"@stdlib/utils/native-class":146}],36:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/get-prototype-of":136,"@stdlib/utils/native-class":146}],43:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":146}],45:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/type-of":157}],47:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":51,"@stdlib/assert/tools/array-function":58,"@stdlib/utils/define-nonenumerable-read-only-property":128}],51:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":146}],54:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":146}],56:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":146}],58:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-array":31,"@stdlib/string/format":121}],60:[function(require,module,exports){
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

},{"@stdlib/number/ctor":98}],65:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":70}],70:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/constants/float64/ninf":64}],73:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/pinf":65}],75:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":76}],76:[function(require,module,exports){
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
* Evaluate the inverse error function.
*
* @module @stdlib/math/base/special/erfinv
*
* @example
* var erfinv = require( '@stdlib/math/base/special/erfinv' );
*
* var y = erfinv( 0.5 );
* // returns ~0.4769
*
* y = erfinv( 0.8 );
* // returns ~0.9062
*
* y = erfinv( 0.0 );
* // returns 0.0
*
* y = erfinv( -0.0 );
* // returns -0.0
*
* y = erfinv( -1.0 );
* // returns -Infinity
*
* y = erfinv( 1.0 );
* // returns Infinity
*
* y = erfinv( NaN );
* // returns NaN
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
*
*
* ## Notice
*
* The original C++ code and copyright notice are from the [Boost library]{@link http://www.boost.org/doc/libs/1_48_0/boost/math/special_functions/detail/erf_inv.hpp}. This implementation follows the original, but has been modified for JavaScript.
*
* ```text
* (C) Copyright John Maddock 2006.
*
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
* ```
*/

'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var ln = require( '@stdlib/math/base/special/ln' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var rationalFcnR1 = require( './rational_p1q1.js' );
var rationalFcnR2 = require( './rational_p2q2.js' );
var rationalFcnR3 = require( './rational_p3q3.js' );
var rationalFcnR4 = require( './rational_p4q4.js' );
var rationalFcnR5 = require( './rational_p5q5.js' );


// VARIABLES //

var Y1 = 8.91314744949340820313e-2;
var Y2 = 2.249481201171875;
var Y3 = 8.07220458984375e-1;
var Y4 = 9.3995571136474609375e-1;
var Y5 = 9.8362827301025390625e-1;


// MAIN //

/**
* Evaluates the inverse error function.
*
* ## Method
*
* 1.  For \\(|x| \leq 0.5\\), we evaluate the inverse error function using the rational approximation
*
*     ```tex
*     \operatorname{erf^{-1}}(x) = x(x+10)(\mathrm{Y} + \operatorname{R}(x))
*     ```
*
*     where \\(Y\\) is a constant and \\(\operatorname{R}(x)\\) is optimized for a low absolute error compared to \\(|Y|\\).
*
*     <!-- <note> -->
*
*     Max error \\(2.001849\mbox{e-}18\\). Maximum deviation found (error term at infinite precision) \\(8.030\mbox{e-}21\\).
*
*     <!-- </note> -->
*
* 2.  For \\(0.5 > 1-|x| \geq 0\\), we evaluate the inverse error function using the rational approximation
*
*     ```tex
*     \operatorname{erf^{-1}} = \frac{\sqrt{-2 \cdot \ln(1-x)}}{\mathrm{Y} + \operatorname{R}(1-x)}
*     ```
*
*     where \\(Y\\) is a constant, and \\(\operatorname{R}(q)\\) is optimized for a low absolute error compared to \\(Y\\).
*
*     <!-- <note> -->
*
*     Max error \\(7.403372\mbox{e-}17\\). Maximum deviation found (error term at infinite precision) \\(4.811\mbox{e-}20\\).
*
*     <!-- </note> -->
*
* 3.  For \\(1-|x| < 0.25\\), we have a series of rational approximations all of the general form
*
*     ```tex
*     p = \sqrt{-\ln(1-x)}
*     ```
*
*     Accordingly, the result is given by
*
*     ```tex
*     \operatorname{erf^{-1}}(x) = p(\mathrm{Y} + \operatorname{R}(p-B))
*     ```
*
*     where \\(Y\\) is a constant, \\(B\\) is the lowest value of \\(p\\) for which the approximation is valid, and \\(\operatorname{R}(x-B)\\) is optimized for a low absolute error compared to \\(Y\\).
*
*     <!-- <note> -->
*
*     Almost all code will only go through the first or maybe second approximation.  After that we are dealing with very small input values.
*
*     -   If \\(p < 3\\), max error \\(1.089051\mbox{e-}20\\).
*     -   If \\(p < 6\\), max error \\(8.389174\mbox{e-}21\\).
*     -   If \\(p < 18\\), max error \\(1.481312\mbox{e-}19\\).
*     -   If \\(p < 44\\), max error \\(5.697761\mbox{e-}20\\).
*     -   If \\(p \geq 44\\), max error \\(1.279746\mbox{e-}20\\).
*
*     <!-- </note> -->
*
*     <!-- <note> -->
*
*     The Boost library can accommodate \\(80\\) and \\(128\\) bit long doubles. JavaScript only supports a \\(64\\) bit double (IEEE 754). Accordingly, the smallest \\(p\\) (in JavaScript at the time of this writing) is \\(\sqrt{-\ln(\sim5\mbox{e-}324)} = 27.284429111150214\\).
*
*     <!-- </note> -->
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var y = erfinv( 0.5 );
* // returns ~0.4769
*
* @example
* var y = erfinv( 0.8 );
* // returns ~0.9062
*
* @example
* var y = erfinv( 0.0 );
* // returns 0.0
*
* @example
* var y = erfinv( -0.0 );
* // returns -0.0
*
* @example
* var y = erfinv( -1.0 );
* // returns -Infinity
*
* @example
* var y = erfinv( 1.0 );
* // returns Infinity
*
* @example
* var y = erfinv( NaN );
* // returns NaN
*/
function erfinv( x ) {
	var sign;
	var ax;
	var qs;
	var q;
	var g;
	var r;

	// Special case: NaN
	if ( isnan( x ) ) {
		return NaN;
	}
	// Special case: 1
	if ( x === 1.0 ) {
		return PINF;
	}
	// Special case: -1
	if ( x === -1.0 ) {
		return NINF;
	}
	// Special case: +-0
	if ( x === 0.0 ) {
		return x;
	}
	// Special case: |x| > 1 (range error)
	if ( x > 1.0 || x < -1.0 ) {
		return NaN;
	}
	// Argument reduction (reduce to interval [0,1]). If `x` is negative, we can safely negate the value, taking advantage of the error function being an odd function; i.e., `erf(-x) = -erf(x)`.
	if ( x < 0.0 ) {
		sign = -1.0;
		ax = -x;
	} else {
		sign = 1.0;
		ax = x;
	}
	q = 1.0 - ax;

	// |x| <= 0.5
	if ( ax <= 0.5 ) {
		g = ax * ( ax + 10.0 );
		r = rationalFcnR1( ax );
		return sign * ( (g*Y1) + (g*r) );
	}
	// 1-|x| >= 0.25
	if ( q >= 0.25 ) {
		g = sqrt( -2.0 * ln(q) );
		q -= 0.25;
		r = rationalFcnR2( q );
		return sign * ( g / (Y2+r) );
	}
	q = sqrt( -ln( q ) );

	// q < 3
	if ( q < 3.0 ) {
		qs = q - 1.125;
		r = rationalFcnR3( qs );
		return sign * ( (Y3*q) + (r*q) );
	}
	// q < 6
	if ( q < 6.0 ) {
		qs = q - 3.0;
		r = rationalFcnR4( qs );
		return sign * ( (Y4*q) + (r*q) );
	}
	// q < 18
	qs = q - 6.0;
	r = rationalFcnR5( qs );
	return sign * ( (Y5*q) + (r*q) );
}


// EXPORTS //

module.exports = erfinv;

},{"./rational_p1q1.js":79,"./rational_p2q2.js":80,"./rational_p3q3.js":81,"./rational_p4q4.js":82,"./rational_p5q5.js":83,"@stdlib/constants/float64/ninf":64,"@stdlib/constants/float64/pinf":65,"@stdlib/math/base/assert/is-nan":69,"@stdlib/math/base/special/ln":92,"@stdlib/math/base/special/sqrt":96}],79:[function(require,module,exports){
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
		return -0.0005087819496582806;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = -0.0005087819496582806 + (x * (-0.008368748197417368 + (x * (0.03348066254097446 + (x * (-0.012692614766297404 + (x * (-0.03656379714117627 + (x * (0.02198786811111689 + (x * (0.008226878746769157 + (x * (-0.005387729650712429 + (x * (0.0 + (x * 0.0))))))))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (-0.9700050433032906 + (x * (-1.5657455823417585 + (x * (1.5622155839842302 + (x * (0.662328840472003 + (x * (-0.7122890234154284 + (x * (-0.05273963823400997 + (x * (0.07952836873415717 + (x * (-0.0023339375937419 + (x * 0.0008862163904564247))))))))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 0.0 + (x * (0.0 + (x * (-0.005387729650712429 + (x * (0.008226878746769157 + (x * (0.02198786811111689 + (x * (-0.03656379714117627 + (x * (-0.012692614766297404 + (x * (0.03348066254097446 + (x * (-0.008368748197417368 + (x * -0.0005087819496582806))))))))))))))))); // eslint-disable-line max-len
		s2 = 0.0008862163904564247 + (x * (-0.0023339375937419 + (x * (0.07952836873415717 + (x * (-0.05273963823400997 + (x * (-0.7122890234154284 + (x * (0.662328840472003 + (x * (1.5622155839842302 + (x * (-1.5657455823417585 + (x * (-0.9700050433032906 + (x * 1.0))))))))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

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
		return -0.20243350835593876;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = -0.20243350835593876 + (x * (0.10526468069939171 + (x * (8.3705032834312 + (x * (17.644729840837403 + (x * (-18.851064805871424 + (x * (-44.6382324441787 + (x * (17.445385985570866 + (x * (21.12946554483405 + (x * -3.6719225470772936))))))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (6.242641248542475 + (x * (3.971343795334387 + (x * (-28.66081804998 + (x * (-20.14326346804852 + (x * (48.560921310873994 + (x * (10.826866735546016 + (x * (-22.643693341313973 + (x * 1.7211476576120028))))))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = -3.6719225470772936 + (x * (21.12946554483405 + (x * (17.445385985570866 + (x * (-44.6382324441787 + (x * (-18.851064805871424 + (x * (17.644729840837403 + (x * (8.3705032834312 + (x * (0.10526468069939171 + (x * -0.20243350835593876))))))))))))))); // eslint-disable-line max-len
		s2 = 1.7211476576120028 + (x * (-22.643693341313973 + (x * (10.826866735546016 + (x * (48.560921310873994 + (x * (-20.14326346804852 + (x * (-28.66081804998 + (x * (3.971343795334387 + (x * (6.242641248542475 + (x * 1.0))))))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

},{}],81:[function(require,module,exports){
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
		return -0.1311027816799519;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = -0.1311027816799519 + (x * (-0.16379404719331705 + (x * (0.11703015634199525 + (x * (0.38707973897260434 + (x * (0.3377855389120359 + (x * (0.14286953440815717 + (x * (0.029015791000532906 + (x * (0.0021455899538880526 + (x * (-6.794655751811263e-7 + (x * (2.8522533178221704e-8 + (x * -6.81149956853777e-10))))))))))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (3.4662540724256723 + (x * (5.381683457070069 + (x * (4.778465929458438 + (x * (2.5930192162362027 + (x * (0.848854343457902 + (x * (0.15226433829533179 + (x * (0.011059242293464892 + (x * (0.0 + (x * (0.0 + (x * 0.0))))))))))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = -6.81149956853777e-10 + (x * (2.8522533178221704e-8 + (x * (-6.794655751811263e-7 + (x * (0.0021455899538880526 + (x * (0.029015791000532906 + (x * (0.14286953440815717 + (x * (0.3377855389120359 + (x * (0.38707973897260434 + (x * (0.11703015634199525 + (x * (-0.16379404719331705 + (x * -0.1311027816799519))))))))))))))))))); // eslint-disable-line max-len
		s2 = 0.0 + (x * (0.0 + (x * (0.0 + (x * (0.011059242293464892 + (x * (0.15226433829533179 + (x * (0.848854343457902 + (x * (2.5930192162362027 + (x * (4.778465929458438 + (x * (5.381683457070069 + (x * (3.4662540724256723 + (x * 1.0))))))))))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

},{}],82:[function(require,module,exports){
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
		return -0.0350353787183178;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = -0.0350353787183178 + (x * (-0.0022242652921344794 + (x * (0.018557330651423107 + (x * (0.009508047013259196 + (x * (0.0018712349281955923 + (x * (0.00015754461742496055 + (x * (0.00000460469890584318 + (x * (-2.304047769118826e-10 + (x * 2.6633922742578204e-12))))))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (1.3653349817554064 + (x * (0.7620591645536234 + (x * (0.22009110576413124 + (x * (0.03415891436709477 + (x * (0.00263861676657016 + (x * (0.00007646752923027944 + (x * (0.0 + (x * 0.0))))))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 2.6633922742578204e-12 + (x * (-2.304047769118826e-10 + (x * (0.00000460469890584318 + (x * (0.00015754461742496055 + (x * (0.0018712349281955923 + (x * (0.009508047013259196 + (x * (0.018557330651423107 + (x * (-0.0022242652921344794 + (x * -0.0350353787183178))))))))))))))); // eslint-disable-line max-len
		s2 = 0.0 + (x * (0.0 + (x * (0.00007646752923027944 + (x * (0.00263861676657016 + (x * (0.03415891436709477 + (x * (0.22009110576413124 + (x * (0.7620591645536234 + (x * (1.3653349817554064 + (x * 1.0))))))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

},{}],83:[function(require,module,exports){
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
		return -0.016743100507663373;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = -0.016743100507663373 + (x * (-0.0011295143874558028 + (x * (0.001056288621524929 + (x * (0.00020938631748758808 + (x * (0.000014962478375834237 + (x * (4.4969678992770644e-7 + (x * (4.625961635228786e-9 + (x * (-2.811287356288318e-14 + (x * 9.905570997331033e-17))))))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (0.5914293448864175 + (x * (0.1381518657490833 + (x * (0.016074608709367652 + (x * (0.0009640118070051656 + (x * (0.000027533547476472603 + (x * (2.82243172016108e-7 + (x * (0.0 + (x * 0.0))))))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 9.905570997331033e-17 + (x * (-2.811287356288318e-14 + (x * (4.625961635228786e-9 + (x * (4.4969678992770644e-7 + (x * (0.000014962478375834237 + (x * (0.00020938631748758808 + (x * (0.001056288621524929 + (x * (-0.0011295143874558028 + (x * -0.016743100507663373))))))))))))))); // eslint-disable-line max-len
		s2 = 0.0 + (x * (0.0 + (x * (2.82243172016108e-7 + (x * (0.000027533547476472603 + (x * (0.0009640118070051656 + (x * (0.016074608709367652 + (x * (0.1381518657490833 + (x * (0.5914293448864175 + (x * 1.0))))))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

},{}],84:[function(require,module,exports){
module.exports={"expected":[-0.4769362762044699,-0.477493831724177,-0.4780516842773505,-0.47860983452822164,-0.4791682831428273,-0.47972703078901724,-0.48028607813646207,-0.48084542585666057,-0.48140507462294574,-0.48196502511049344,-0.4825252779963284,-0.4830858339593334,-0.4836466936802548,-0.4842078578417114,-0.48476932712820087,-0.4853311022261083,-0.48589318382371277,-0.4864555726111959,-0.4870182692806483,-0.4875812745260788,-0.4881445890434209,-0.4887082135305407,-0.4892721486872453,-0.4898363952152903,-0.4904009538183871,-0.49096582520221216,-0.49153101007441313,-0.4920965091446188,-0.4926623231244457,-0.49322845272750615,-0.49379489866941784,-0.49436166166781026,-0.4949287424423337,-0.4954961417146676,-0.49606386020852833,-0.496631898649678,-0.4972002577659326,-0.4977689382871701,-0.49833794094533934,-0.4989072664744685,-0.49947691561067337,-0.5000468890921657,-0.5006171876592624,-0.501187812054394,-0.5017587630221136,-0.5023300413091041,-0.5029016476641893,-0.5034735828383413,-0.5040458475846894,-0.5046184426585297,-0.5051913688173334,-0.505764626820756,-0.5063382174306466,-0.5069121414110569,-0.5074863995282501,-0.5080609925507106,-0.5086359212491527,-0.5092111863965302,-0.5097867887680457,-0.5103627291411602,-0.5109390082956016,-0.5115156270133759,-0.5120925860787751,-0.5126698862783875,-0.5132475284011074,-0.5138255132381446,-0.5144038415830344,-0.5149825142316468,-0.5155615319821969,-0.5161408956352546,-0.516720605993755,-0.5173006638630072,-0.5178810700507055,-0.518461825366939,-0.5190429306242021,-0.5196243866374043,-0.5202061942238805,-0.5207883542034014,-0.5213708673981842,-0.5219537346329027,-0.5225369567346975,-0.5231205345331871,-0.523704468860478,-0.5242887605511759,-0.5248734104423958,-0.525458419373773,-0.5260437881874747,-0.5266295177282089,-0.5272156088432374,-0.5278020623823856,-0.5283888791980544,-0.5289760601452302,-0.529563606081497,-0.530151517867047,-0.5307397963646929,-0.5313284424398776,-0.5319174569606877,-0.5325068407978621,-0.5330965948248074,-0.5336867199176057,-0.5342772169550287,-0.5348680868185481,-0.5354593303923485,-0.5360509485633383,-0.5366429422211625,-0.537235312258213,-0.5378280595696431,-0.5384211850533778,-0.539014689610126,-0.5396085741433941,-0.5402028395594971,-0.5407974867675709,-0.5413925166795855,-0.5419879302103575,-0.5425837282775618,-0.5431799118017452,-0.5437764817063382,-0.544373438917669,-0.5449707843649753,-0.5455685189804176,-0.5461666436990918,-0.5467651594590438,-0.5473640672012808,-0.5479633678697847,-0.5485630624115271,-0.5491631517764809,-0.5497636369176343,-0.5503645187910045,-0.5509657983556512,-0.5515674765736902,-0.5521695544103074,-0.5527720328337717,-0.5533749128154506,-0.5539781953298225,-0.5545818813544916,-0.5551859718702018,-0.5557904678608512,-0.5563953703135062,-0.5570006802184155,-0.5576063985690255,-0.5582125263619936,-0.5588190645972043,-0.5594260142777822,-0.5600333764101083,-0.5606411520038338,-0.5612493420718965,-0.5618579476305334,-0.5624669696992984,-0.5630764093010758,-0.5636862674620969,-0.564296545211954,-0.5649072435836167,-0.5655183636134475,-0.5661299063412176,-0.5667418728101218,-0.5673542640667951,-0.5679670811613285,-0.5685803251472852,-0.5691939970817158,-0.5698080980251755,-0.5704226290417402,-0.5710375911990231,-0.57165298556819,-0.572268813223977,-0.5728850752447076,-0.5735017727123081,-0.5741189067123259,-0.5747364783339443,-0.575354488670003,-0.5759729388170125,-0.5765918298751717,-0.5772111629483863,-0.5778309391442858,-0.5784511595742413,-0.5790718253533824,-0.5796929376006156,-0.5803144974386432,-0.5809365059939787,-0.5815589643969679,-0.5821818737818043,-0.5828052352865505,-0.5834290500531536,-0.5840533192274656,-0.5846780439592615,-0.5853032254022588,-0.5859288647141345,-0.5865549630565464,-0.5871815215951508,-0.587808541499622,-0.5884360239436718,-0.5890639701050686,-0.5896923811656576,-0.5903212583113804,-0.5909506027322937,-0.5915804156225907,-0.5922106981806204,-0.5928414516089077,-0.5934726771141747,-0.594104375907359,-0.5947365492036367,-0.5953691982224414,-0.5960023241874861,-0.5966359283267827,-0.5972700118726644,-0.5979045760618067,-0.5985396221352476,-0.5991751513384108,-0.5998111649211252,-0.6004476641376492,-0.6010846502466894,-0.6017221245114257,-0.6023600881995309,-0.6029985425831946,-0.6036374889391449,-0.6042769285486708,-0.6049168626976448,-0.605557292676547,-0.6061982197804863,-0.6068396453092239,-0.6074815705671974,-0.6081239968635439,-0.6087669255121223,-0.6094103578315391,-0.61005429514517,-0.6106987387811855,-0.6113436900725745,-0.6119891503571683,-0.6126351209776653,-0.6132816032816556,-0.6139285986216461,-0.6145761083550838,-0.6152241338443836,-0.6158726764569507,-0.6165217375652079,-0.61717131854662,-0.6178214207837205,-0.6184720456641367,-0.6191231945806157,-0.619774868931051,-0.6204270701185092,-0.6210797995512551,-0.6217330586427801,-0.6223868488118282,-0.6230411714824227,-0.6236960280838945,-0.6243514200509086,-0.6250073488234918,-0.6256638158470615,-0.6263208225724517,-0.6269783704559423,-0.6276364609592878,-0.6282950955497453,-0.6289542757001025,-0.6296140028887076,-0.6302742785994982,-0.6309351043220295,-0.6315964815515057,-0.6322584117888069,-0.6329208965405219,-0.6335839373189758,-0.6342475356422617,-0.6349116930342702,-0.6355764110247206,-0.6362416911491917,-0.6369075349491525,-0.6375739439719932,-0.6382409197710572,-0.6389084639056731,-0.6395765779411855,-0.6402452634489871,-0.6409145220065523,-0.6415843551974687,-0.6422547646114694,-0.6429257518444668,-0.6435973184985854,-0.6442694661821959,-0.644942196509947,-0.6456155111028014,-0.646289411588068,-0.6469638995994373,-0.6476389767770167,-0.6483146447673618,-0.6489909052235165,-0.6496677598050442,-0.6503452101780641,-0.6510232580152886,-0.6517019049960576,-0.6523811528063753,-0.6530610031389462,-0.6537414576932127,-0.654422518175391,-0.6551041862985096,-0.6557864637824458,-0.6564693523539625,-0.6571528537467491,-0.6578369697014569,-0.658521701965739,-0.6592070522942889,-0.6598930224488795,-0.6605796141984023,-0.6612668293189068,-0.6619546695936411,-0.6626431368130918,-0.6633322327750238,-0.6640219592845217,-0.6647123181540308,-0.6654033112033982,-0.6660949402599141,-0.6667872071583546,-0.6674801137410222,-0.6681736618577909,-0.6688678533661464,-0.6695626901312305,-0.6702581740258841,-0.6709543069306911,-0.671651090734023,-0.6723485273320816,-0.673046618628945,-0.6737453665366124,-0.6744447729750491,-0.675144839872232,-0.6758455691641957,-0.6765469627950793,-0.6772490227171721,-0.677951750890961,-0.6786551492851779,-0.6793592198768468,-0.6800639646513327,-0.6807693856023892,-0.6814754847322068,-0.6821822640514633,-0.6828897255793719,-0.6835978713437315,-0.6843067033809765,-0.6850162237362281,-0.6857264344633439,-0.6864373376249702,-0.687148935292593,-0.68786122954659,-0.6885742224762839,-0.6892879161799933,-0.6900023127650879,-0.6907174143480406,-0.691433223054482,-0.6921497410192546,-0.692866970386468,-0.6935849133095536,-0.69430357195132,-0.695022948484009,-0.6957430450893533,-0.6964638639586312,-0.6971854072927255,-0.6979076773021804,-0.6986306762072604,-0.6993544062380077,-0.7000788696343025,-0.700804068645921,-0.7015300055325971,-0.7022566825640812,-0.7029841020202019,-0.7037122661909265,-0.7044411773764244,-0.7051708378871274,-0.7059012500437933,-0.7066324161775692,-0.7073643386300557,-0.7080970197533691,-0.7088304619102085,-0.7095646674739192,-0.7102996388285598,-0.7110353783689667,-0.7117718885008226,-0.7125091716407224,-0.7132472302162414,-0.7139860666660035,-0.7147256834397505,-0.7154660829984106,-0.7162072678141695,-0.7169492403705391,-0.7176920031624296,-0.718435558696222,-0.7191799094898378,-0.719925058072814,-0.7206710069863748,-0.7214177587835064,-0.7221653160290312,-0.7229136812996829,-0.7236628571841813,-0.7244128462833095,-0.7251636512099912,-0.7259152745893663,-0.726667719058871,-0.727420987268315,-0.7281750818799616,-0.7289300055686082,-0.7296857610216654,-0.7304423509392397,-0.731199778034215,-0.7319580450323349,-0.732717154672286,-0.7334771097057831,-0.7342379128976515,-0.7349995670259144,-0.7357620748818785,-0.7365254392702201,-0.7372896630090731,-0.7380547489301167,-0.738820699878665,-0.7395875187137565,-0.7403552083082439,-0.7411237715488853,-0.741893211336437,-0.7426635305857457,-0.7434347322258413,-0.7442068192000317,-0.7449797944659977,-0.7457536609958892,-0.7465284217764211,-0.747304079808971,-0.7480806381096774,-0.7488580997095391,-0.7496364676545147,-0.7504157450056232,-0.7511959348390461,-0.75197704024623,-0.7527590643339886,-0.7535420102246089,-0.7543258810559543,-0.7551106799815727,-0.7558964101708013,-0.7566830748088761,-0.7574706770970391,-0.7582592202526504,-0.7590487075092959,-0.759839142116901,-0.7606305273418422,-0.7614228664670614,-0.7622161627921795,-0.7630104196336127,-0.7638056403246883,-0.7646018282157634,-0.7653989866743424,-0.7661971190851968,-0.766996228850486,-0.7677963193898801,-0.7685973941406805,-0.7693994565579455,-0.7702025101146155,-0.7710065583016371,-0.7718116046280927,-0.7726176526213273,-0.7734247058270787,-0.7742327678096081,-0.7750418421518316,-0.775851932455453,-0.7766630423410994,-0.7774751754484548,-0.7782883354363975,-0.7791025259831384,-0.7799177507863602,-0.7807340135633561,-0.7815513180511735,-0.7823696680067557,-0.7831890672070869,-0.7840095194493374,-0.78483102855101,-0.7856535983500889,-0.7864772327051899,-0.7873019354957093,-0.7881277106219788,-0.7889545620054172,-0.7897824935886872,-0.7906115093358507,-0.7914416132325277,-0.7922728092860556,-0.7931051015256512,-0.7939384940025708,-0.7947729907902773,-0.7956085959846033,-0.7964453137039207,-0.7972831480893074,-0.7981221033047178,-0.7989621835371563,-0.7998033929968495,-0.8006457359174225,-0.8014892165560745,-0.802333839193758,-0.8031796081353599,-0.8040265277098823,-0.8048746022706266,-0.8057238361953794,-0.8065742338866002,-0.8074257997716089,-0.8082785383027781,-0.8091324539577259,-0.80998755123951,-0.8108438346768245,-0.8117013088241983,-0.8125599782621956,-0.8134198475976185],"x":[-0.5,-0.500501002004008,-0.501002004008016,-0.501503006012024,-0.5020040080160321,-0.5025050100200401,-0.503006012024048,-0.5035070140280561,-0.5040080160320641,-0.5045090180360722,-0.5050100200400801,-0.5055110220440882,-0.5060120240480962,-0.5065130260521042,-0.5070140280561122,-0.5075150300601202,-0.5080160320641283,-0.5085170340681363,-0.5090180360721442,-0.5095190380761523,-0.5100200400801603,-0.5105210420841684,-0.5110220440881763,-0.5115230460921844,-0.5120240480961924,-0.5125250501002004,-0.5130260521042084,-0.5135270541082164,-0.5140280561122245,-0.5145290581162325,-0.5150300601202404,-0.5155310621242485,-0.5160320641282565,-0.5165330661322646,-0.5170340681362725,-0.5175350701402806,-0.5180360721442886,-0.5185370741482966,-0.5190380761523046,-0.5195390781563126,-0.5200400801603207,-0.5205410821643287,-0.5210420841683366,-0.5215430861723447,-0.5220440881763527,-0.5225450901803608,-0.5230460921843687,-0.5235470941883767,-0.5240480961923848,-0.5245490981963928,-0.5250501002004008,-0.5255511022044088,-0.5260521042084169,-0.5265531062124249,-0.5270541082164328,-0.5275551102204409,-0.5280561122244489,-0.5285571142284569,-0.5290581162324649,-0.529559118236473,-0.530060120240481,-0.5305611222444889,-0.531062124248497,-0.531563126252505,-0.5320641282565131,-0.532565130260521,-0.533066132264529,-0.5335671342685371,-0.5340681362725451,-0.5345691382765531,-0.5350701402805611,-0.5355711422845691,-0.5360721442885772,-0.5365731462925851,-0.5370741482965932,-0.5375751503006012,-0.5380761523046093,-0.5385771543086172,-0.5390781563126252,-0.5395791583166333,-0.5400801603206413,-0.5405811623246493,-0.5410821643286573,-0.5415831663326653,-0.5420841683366734,-0.5425851703406813,-0.5430861723446894,-0.5435871743486974,-0.5440881763527055,-0.5445891783567134,-0.5450901803607214,-0.5455911823647295,-0.5460921843687375,-0.5465931863727455,-0.5470941883767535,-0.5475951903807615,-0.5480961923847696,-0.5485971943887775,-0.5490981963927856,-0.5495991983967936,-0.5501002004008017,-0.5506012024048096,-0.5511022044088176,-0.5516032064128257,-0.5521042084168337,-0.5526052104208417,-0.5531062124248497,-0.5536072144288577,-0.5541082164328658,-0.5546092184368737,-0.5551102204408818,-0.5556112224448898,-0.5561122244488977,-0.5566132264529058,-0.5571142284569138,-0.5576152304609219,-0.5581162324649298,-0.5586172344689379,-0.5591182364729459,-0.5596192384769539,-0.5601202404809619,-0.5606212424849699,-0.561122244488978,-0.561623246492986,-0.5621242484969939,-0.562625250501002,-0.56312625250501,-0.5636272545090181,-0.564128256513026,-0.564629258517034,-0.5651302605210421,-0.5656312625250501,-0.5661322645290581,-0.5666332665330661,-0.5671342685370742,-0.5676352705410822,-0.5681362725450901,-0.5686372745490982,-0.5691382765531062,-0.5696392785571143,-0.5701402805611222,-0.5706412825651302,-0.5711422845691383,-0.5716432865731463,-0.5721442885771543,-0.5726452905811623,-0.5731462925851704,-0.5736472945891784,-0.5741482965931863,-0.5746492985971944,-0.5751503006012024,-0.5756513026052105,-0.5761523046092184,-0.5766533066132264,-0.5771543086172345,-0.5776553106212425,-0.5781563126252505,-0.5786573146292585,-0.5791583166332666,-0.5796593186372746,-0.5801603206412825,-0.5806613226452906,-0.5811623246492986,-0.5816633266533067,-0.5821643286573146,-0.5826653306613226,-0.5831663326653307,-0.5836673346693386,-0.5841683366733467,-0.5846693386773547,-0.5851703406813628,-0.5856713426853707,-0.5861723446893787,-0.5866733466933868,-0.5871743486973948,-0.5876753507014028,-0.5881763527054108,-0.5886773547094188,-0.5891783567134269,-0.5896793587174348,-0.5901803607214429,-0.5906813627254509,-0.591182364729459,-0.5916833667334669,-0.5921843687374749,-0.592685370741483,-0.593186372745491,-0.593687374749499,-0.594188376753507,-0.594689378757515,-0.5951903807615231,-0.595691382765531,-0.5961923847695391,-0.5966933867735471,-0.5971943887775552,-0.5976953907815631,-0.5981963927855711,-0.5986973947895792,-0.5991983967935872,-0.5996993987975952,-0.6002004008016032,-0.6007014028056112,-0.6012024048096193,-0.6017034068136272,-0.6022044088176353,-0.6027054108216433,-0.6032064128256514,-0.6037074148296593,-0.6042084168336673,-0.6047094188376754,-0.6052104208416834,-0.6057114228456913,-0.6062124248496994,-0.6067134268537074,-0.6072144288577155,-0.6077154308617234,-0.6082164328657315,-0.6087174348697395,-0.6092184368737475,-0.6097194388777555,-0.6102204408817635,-0.6107214428857716,-0.6112224448897795,-0.6117234468937875,-0.6122244488977956,-0.6127254509018036,-0.6132264529058116,-0.6137274549098196,-0.6142284569138277,-0.6147294589178357,-0.6152304609218436,-0.6157314629258517,-0.6162324649298597,-0.6167334669338678,-0.6172344689378757,-0.6177354709418837,-0.6182364729458918,-0.6187374749498998,-0.6192384769539078,-0.6197394789579158,-0.6202404809619239,-0.6207414829659319,-0.6212424849699398,-0.6217434869739479,-0.6222444889779559,-0.622745490981964,-0.6232464929859719,-0.62374749498998,-0.624248496993988,-0.624749498997996,-0.625250501002004,-0.625751503006012,-0.62625250501002,-0.6267535070140281,-0.627254509018036,-0.6277555110220441,-0.6282565130260521,-0.6287575150300602,-0.6292585170340681,-0.6297595190380761,-0.6302605210420842,-0.6307615230460922,-0.6312625250501002,-0.6317635270541082,-0.6322645290581163,-0.6327655310621243,-0.6332665330661322,-0.6337675350701403,-0.6342685370741483,-0.6347695390781564,-0.6352705410821643,-0.6357715430861723,-0.6362725450901804,-0.6367735470941884,-0.6372745490981964,-0.6377755511022044,-0.6382765531062125,-0.6387775551102205,-0.6392785571142284,-0.6397795591182365,-0.6402805611222445,-0.6407815631262525,-0.6412825651302605,-0.6417835671342685,-0.6422845691382766,-0.6427855711422845,-0.6432865731462926,-0.6437875751503006,-0.6442885771543087,-0.6447895791583166,-0.6452905811623246,-0.6457915831663327,-0.6462925851703407,-0.6467935871743486,-0.6472945891783567,-0.6477955911823647,-0.6482965931863728,-0.6487975951903807,-0.6492985971943888,-0.6497995991983968,-0.6503006012024048,-0.6508016032064128,-0.6513026052104208,-0.6518036072144289,-0.6523046092184369,-0.6528056112224448,-0.6533066132264529,-0.6538076152304609,-0.654308617234469,-0.6548096192384769,-0.655310621242485,-0.655811623246493,-0.656312625250501,-0.656813627254509,-0.657314629258517,-0.6578156312625251,-0.6583166332665331,-0.658817635270541,-0.6593186372745491,-0.6598196392785571,-0.6603206412825652,-0.6608216432865731,-0.6613226452905812,-0.6618236472945892,-0.6623246492985972,-0.6628256513026052,-0.6633266533066132,-0.6638276553106213,-0.6643286573146293,-0.6648296593186372,-0.6653306613226453,-0.6658316633266533,-0.6663326653306614,-0.6668336673346693,-0.6673346693386774,-0.6678356713426854,-0.6683366733466933,-0.6688376753507014,-0.6693386773547094,-0.6698396793587175,-0.6703406813627254,-0.6708416833667334,-0.6713426853707415,-0.6718436873747495,-0.6723446893787575,-0.6728456913827655,-0.6733466933867736,-0.6738476953907816,-0.6743486973947895,-0.6748496993987976,-0.6753507014028056,-0.6758517034068137,-0.6763527054108216,-0.6768537074148296,-0.6773547094188377,-0.6778557114228457,-0.6783567134268537,-0.6788577154308617,-0.6793587174348698,-0.6798597194388778,-0.6803607214428857,-0.6808617234468938,-0.6813627254509018,-0.6818637274549099,-0.6823647294589178,-0.6828657314629258,-0.6833667334669339,-0.6838677354709419,-0.6843687374749499,-0.6848697394789579,-0.685370741482966,-0.685871743486974,-0.6863727454909819,-0.68687374749499,-0.687374749498998,-0.6878757515030061,-0.688376753507014,-0.688877755511022,-0.6893787575150301,-0.6898797595190381,-0.6903807615230461,-0.6908817635270541,-0.6913827655310621,-0.6918837675350702,-0.6923847695390781,-0.6928857715430862,-0.6933867735470942,-0.6938877755511023,-0.6943887775551102,-0.6948897795591182,-0.6953907815631263,-0.6958917835671342,-0.6963927855711423,-0.6968937875751503,-0.6973947895791583,-0.6978957915831663,-0.6983967935871743,-0.6988977955911824,-0.6993987975951904,-0.6998997995991983,-0.7004008016032064,-0.7009018036072144,-0.7014028056112225,-0.7019038076152304,-0.7024048096192385,-0.7029058116232465,-0.7034068136272545,-0.7039078156312625,-0.7044088176352705,-0.7049098196392786,-0.7054108216432866,-0.7059118236472945,-0.7064128256513026,-0.7069138276553106,-0.7074148296593187,-0.7079158316633266,-0.7084168336673347,-0.7089178356713427,-0.7094188376753507,-0.7099198396793587,-0.7104208416833667,-0.7109218436873748,-0.7114228456913828,-0.7119238476953907,-0.7124248496993988,-0.7129258517034068,-0.7134268537074149,-0.7139278557114228,-0.7144288577154309,-0.7149298597194389,-0.7154308617234469,-0.7159318637274549,-0.7164328657314629,-0.716933867735471,-0.717434869739479,-0.7179358717434869,-0.718436873747495,-0.718937875751503,-0.7194388777555111,-0.719939879759519,-0.720440881763527,-0.7209418837675351,-0.7214428857715431,-0.7219438877755511,-0.7224448897795591,-0.7229458917835672,-0.7234468937875751,-0.7239478957915831,-0.7244488977955912,-0.7249498997995992,-0.7254509018036072,-0.7259519038076152,-0.7264529058116233,-0.7269539078156313,-0.7274549098196392,-0.7279559118236473,-0.7284569138276553,-0.7289579158316634,-0.7294589178356713,-0.7299599198396793,-0.7304609218436874,-0.7309619238476954,-0.7314629258517034,-0.7319639278557114,-0.7324649298597194,-0.7329659318637275,-0.7334669338677354,-0.7339679358717435,-0.7344689378757515,-0.7349699398797596,-0.7354709418837675,-0.7359719438877755,-0.7364729458917836,-0.7369739478957916,-0.7374749498997996,-0.7379759519038076,-0.7384769539078156,-0.7389779559118237,-0.7394789579158316,-0.7399799599198397,-0.7404809619238477,-0.7409819639278558,-0.7414829659318637,-0.7419839679358717,-0.7424849699398798,-0.7429859719438878,-0.7434869739478958,-0.7439879759519038,-0.7444889779559118,-0.7449899799599199,-0.7454909819639278,-0.7459919839679359,-0.7464929859719439,-0.746993987975952,-0.7474949899799599,-0.7479959919839679,-0.748496993987976,-0.748997995991984,-0.749498997995992,-0.75]}

},{}],85:[function(require,module,exports){
module.exports={"expected":[-0.4769362762044699,-0.4765653565446719,-0.47619456797159293,-0.47582391029072746,-0.4754533833079204,-0.47508298682936534,-0.4747127206616033,-0.47434258461152307,-0.4739725784863588,-0.47360270209369043,-0.47323295524144177,-0.4728633377378804,-0.4724938493916161,-0.4721244900116003,-0.47175525940712526,-0.471386157387823,-0.4710171837636645,-0.4706483383449587,-0.4702796209423517,-0.4699110313668264,-0.46954256942970035,-0.46917423494262583,-0.46880602771758956,-0.46843794756691004,-0.4680699943032385,-0.46770216773955664,-0.4673344676891771,-0.46696689396574115,-0.46659944638321926,-0.4662321247559092,-0.46586492889843534,-0.4654978586257489,-0.46513091375312554,-0.4647640940961652,-0.4643973994707914,-0.4640308296932509,-0.4636643845801113,-0.4632980639482621,-0.4629318676149119,-0.46256579539758996,-0.4621998471141427,-0.46183402258273515,-0.4614683216218488,-0.4611027440502817,-0.4607372896871463,-0.46037195835187034,-0.4600067498641947,-0.45964166404417356,-0.4592767007121726,-0.4589118596888687,-0.45854714079524983,-0.4581825438526134,-0.45781806868256536,-0.45745371510701976,-0.4570894829481984,-0.45672537202862895,-0.4563613821711456,-0.4559975131988867,-0.4556337649352953,-0.4552701372041176,-0.4549066298294025,-0.4545432426355008,-0.45417997544706434,-0.4538168280890454,-0.4534538003866956,-0.45309089216556575,-0.45272810325150425,-0.4523654334706571,-0.4520028826494671,-0.45164045061467206,-0.45127813719330573,-0.4509159422126956,-0.45055386550046295,-0.4501919068845217,-0.4498300661930782,-0.4494683432546298,-0.4491067378979647,-0.4487452499521609,-0.4483838792465855,-0.44802262561089407,-0.44766148887503004,-0.4473004688692235,-0.44693956542399105,-0.44657877837013493,-0.4462181075387419,-0.44585755276118305,-0.44549711386911267,-0.44513679069446815,-0.44477658306946843,-0.44441649082661416,-0.44405651379868594,-0.44369665181874485,-0.4433369047201309,-0.4429772723364629,-0.4426177545016365,-0.44225835104982575,-0.44189906181548005,-0.4415398866333253,-0.4411808253383618,-0.4408218777658647,-0.44046304375138234,-0.4401043231307365,-0.4397457157400209,-0.4393872214156011,-0.4390288399941137,-0.43867057131246556,-0.43831241520783254,-0.4379543715176606,-0.4375964400796631,-0.43723862073182107,-0.4368809133123831,-0.4365233176598634,-0.4361658336130424,-0.43580846101096493,-0.43545119969294077,-0.4350940494985428,-0.43473701026760725,-0.43438008184023275,-0.43402326405677955,-0.4336665567578691,-0.43330995978438314,-0.43295347297746334,-0.43259709617851066,-0.4322408292291844,-0.4318846719714015,-0.4315286242473371,-0.4311726858994219,-0.4308168567703432,-0.4304611367030436,-0.43010552554072035,-0.429750023126825,-0.4293946293050623,-0.4290393439193903,-0.428684166814019,-0.42832909783341017,-0.4279741368222767,-0.42761928362558194,-0.42726453808853876,-0.4269099000566095,-0.4265553693755051,-0.4262009458911845,-0.4258466294498537,-0.4254924198979662,-0.42513831708222083,-0.42478432084956286,-0.42443043104718187,-0.4240766475225122,-0.42372297012323196,-0.4233693986972625,-0.4230159330927676,-0.4226625731581534,-0.42230931874206706,-0.4219561696933973,-0.4216031258612724,-0.42125018709506074,-0.42089735324436967,-0.4205446241590454,-0.4201919996891717,-0.41983947968506985,-0.4194870639972983,-0.41913475247665133,-0.4187825449741591,-0.41843044134108687,-0.4180784414289344,-0.4177265450894356,-0.41737475217455766,-0.4170230625365007,-0.4166714760276971,-0.4163199925008109,-0.4159686118087376,-0.4156173338046033,-0.4152661583417639,-0.414915085273805,-0.4145641144545412,-0.4142132457380157,-0.41386247897849904,-0.41351181403049,-0.41316125074871335,-0.4128107889881204,-0.41246042860388826,-0.41211016945141926,-0.4117600113863399,-0.41140995426450155,-0.4110599979419787,-0.41071014227506875,-0.4103603871202919,-0.4100107323343902,-0.4096611777743273,-0.40931172329728743,-0.4089623687606754,-0.4086131140221163,-0.4082639589394537,-0.40791490337075087,-0.407565947174289,-0.407217090208567,-0.40686833233230096,-0.40651967340442424,-0.40617111328408595,-0.40582265183065125,-0.4054742889037002,-0.4051260243630281,-0.40477785806864375,-0.4044297898807703,-0.40408181965984363,-0.4037339472665128,-0.4033861725616387,-0.40303849540629383,-0.4026909156617623,-0.4023434331895383,-0.4019960478513271,-0.40164875950904266,-0.40130156802480904,-0.4009544732609584,-0.40060747508003147,-0.4002605733447766,-0.39991376791814937,-0.39956705866331216,-0.39922044544363366,-0.3988739281226882,-0.39852750656425573,-0.3981811806323207,-0.3978349501910721,-0.39748881510490264,-0.39714277523840874,-0.39679683045638925,-0.39645098062384604,-0.39610522560598244,-0.3957595652682035,-0.39541399947611544,-0.3950685280955248,-0.39472315099243827,-0.39437786803306213,-0.3940326790838019,-0.39368758401126197,-0.3933425826822446,-0.39299767496375,-0.3926528607229756,-0.3923081398273158,-0.39196351214436154,-0.3916189775418991,-0.391274535887911,-0.39093018705057414,-0.39058593089826066,-0.390241767299536,-0.3898976961231601,-0.3895537172380854,-0.38920983051345764,-0.3888660358186147,-0.38852233302308614,-0.38817872199659337,-0.38783520260904847,-0.38749177473055424,-0.38714843823140355,-0.3868051929820788,-0.38646203885325187,-0.3861189757157833,-0.3857760034407219,-0.38543312189930473,-0.38509033096295586,-0.3847476305032869,-0.38440502039209595,-0.38406250050136703,-0.3837200707032702,-0.38337773087016086,-0.3830354808745794,-0.3826933205892502,-0.3823512498870824,-0.3820092686411684,-0.381667376724784,-0.38132557401138756,-0.38098386037462,-0.3806422356883041,-0.3803006998264444,-0.3799592526632263,-0.3796178940730162,-0.3792766239303604,-0.3789354421099856,-0.37859434848679757,-0.37825334293588125,-0.37791242533250036,-0.37757159555209663,-0.37723085347029006,-0.3768901989628777,-0.3765496319058337,-0.37620915217530876,-0.3758687596476301,-0.3755284541993006,-0.37518823570699844,-0.3748481040475769,-0.37450805909806406,-0.37416810073566203,-0.37382822883774663,-0.37348844328186753,-0.3731487439457468,-0.37280913070728,-0.3724696034445342,-0.37213016203574856,-0.3717908063593338,-0.37145153629387195,-0.371112351718115,-0.37077325251098614,-0.37043423855157775,-0.3700953097191521,-0.3697564658931407,-0.3694177069531435,-0.369079032778929,-0.3687404432504338,-0.36840193824776213,-0.3680635176511851,-0.36772518134114135,-0.36738692919823523,-0.36704876110323775,-0.36671067693708564,-0.3663726765808805,-0.3660347599158897,-0.36569692682354454,-0.3653591771854407,-0.3650215108833381,-0.36468392779915987,-0.36434642781499244,-0.3640090108130848,-0.3636716766758484,-0.3633344252858568,-0.36299725652584536,-0.36266017027871056,-0.3623231664275097,-0.36198624485546116,-0.361649405445943,-0.36131264808249347,-0.36097597264881026,-0.3606393790287502,-0.36030286710632875,-0.3599664367657202,-0.3596300878912565,-0.3592938203674275,-0.3589576340788807,-0.35862152891042015,-0.35828550474700677,-0.3579495614737578,-0.3576136989759465,-0.3572779171390018,-0.35694221584850766,-0.3566065949902032,-0.35627105444998214,-0.3559355941138921,-0.35560021386813506,-0.35526491359906615,-0.35492969319319395,-0.3545945525371798,-0.3542594915178376,-0.35392451002213343,-0.3535896079371852,-0.3532547851502624,-0.3529200415487854,-0.3525853770203259,-0.35225079145260557,-0.35191628473349656,-0.3515818567510208,-0.3512475073933497,-0.3509132365488038,-0.3505790441058526,-0.3502449299531137,-0.34991089397935343,-0.3495769360734856,-0.34924305612457174,-0.34890925402182016,-0.3485755296545867,-0.34824188291237307,-0.34790831368482766,-0.3475748218617444,-0.347241407333063,-0.3469080699888685,-0.34657480971939053,-0.34624162641500367,-0.3459085199662264,-0.3455754902637217,-0.34524253719829556,-0.34490966066089784,-0.34457686054262093,-0.3442441367347004,-0.34391148912851377,-0.3435789176155809,-0.34324642208756334,-0.34291400243626385,-0.34258165855362666,-0.3422493903317367,-0.34191719766281936,-0.34158508043924,-0.3412530385535044,-0.34092107189825743,-0.3405891803662835,-0.34025736385050576,-0.33992562224398626,-0.3395939554399254,-0.3392623633316613,-0.3389308458126702,-0.33859940277656564,-0.3382680341170982,-0.3379367397281555,-0.33760551950376155,-0.3372743733380766,-0.33694330112539694,-0.3366123027601544,-0.3362813781369164,-0.3359505271503849,-0.33561974969539726,-0.33528904566692475,-0.33495841496007295,-0.33462785747008156,-0.33429737309232355,-0.3339669617223054,-0.3336366232556665,-0.3333063575881787,-0.33297616461574675,-0.3326460442344072,-0.3323159963403282,-0.33198602082981016,-0.33165611759928404,-0.3313262865453121,-0.3309965275645872,-0.3306668405539327,-0.3303372254103021,-0.3300076820307785,-0.3296782103125746,-0.32934881015303263,-0.3290194814496236,-0.3286902240999473,-0.3283610380017318,-0.3280319230528333,-0.32770287915123614,-0.327373906195052,-0.32704500408251996,-0.32671617271200615,-0.32638741198200344,-0.32605872179113093,-0.3257301020381344,-0.3254015526218852,-0.3250730734413804,-0.32474466439574257,-0.32441632538421933,-0.324088056306183,-0.32375985706113075,-0.32343172754868377,-0.3231036676685874,-0.32277567732071066,-0.3224477564050463,-0.32211990482170993,-0.32179212247094047,-0.3214644092530994,-0.32113676506867034,-0.3208091898182595,-0.32048168340259475,-0.32015424572252565,-0.31982687667902304,-0.319499576173179,-0.31917234410620615,-0.31884518037943826,-0.318518084894329,-0.318191057552452,-0.3178640982555008,-0.3175372069052888,-0.3172103834037483,-0.31688362765293077,-0.3165569395550063,-0.31623031901226367,-0.31590376592710995,-0.31557728020206993,-0.31525086173978645,-0.3149245104430196,-0.31459822621464695,-0.3142720089576628,-0.3139458585751783,-0.31361977497042104,-0.3132937580467349,-0.31296780770757987,-0.3126419238565313,-0.3123161063972802,-0.31199035523363294,-0.3116646702695108,-0.3113390514089495,-0.3110134985560999,-0.3106880116152263,-0.3103625904907076,-0.3100372350870361,-0.309711945308818,-0.3093867210607722,-0.3090615622477312,-0.3087364687746396,-0.3084114405465554,-0.30808647746864803,-0.30776157944619953,-0.30743674638460355,-0.3071119781893652,-0.3067872747661011,-0.30646263602053897,-0.3061380618585173,-0.305813552185985,-0.3054891069090017,-0.30516472593373695,-0.3048404091664704,-0.30451615651359093,-0.3041919678815975,-0.30386784317709775,-0.30354378230680834,-0.303219785177555,-0.3028958516962714,-0.3025719817700001,-0.30224817530589115,-0.30192443221120274,-0.3016007523933004,-0.3012771357596573,-0.30095358221785334,-0.3006300916755755,-0.30030666404061745,-0.2999832992208792,-0.2996599971243669,-0.299336757659193,-0.2990135807335751,-0.29869046625583673,-0.29836741413440676,-0.29804442427781885,-0.2977214965947117,-0.2973986309938284,-0.2970758273840167,-0.29675308567422853,-0.29643040577351937,-0.2961077875910488,-0.29578523103607973,-0.2954627360179785,-0.29514030244621436,-0.29481793023035935,-0.2944956192800883,-0.2941733695051784,-0.29385118081550904,-0.2935290531210614,-0.2932069863319185,-0.29288498035826505,-0.29256303511038667,-0.29224115049867067,-0.2919193264336047,-0.2915975628257773,-0.29127585958587754,-0.2909542166246946,-0.29063263385311755,-0.29031111118213576,-0.28998964852283754,-0.28966824578641104,-0.2893469028841434,-0.2890256197274209,-0.28870439622772825,-0.28838323229664903,-0.28806212784586493,-0.28774108278715593,-0.28742009703239985,-0.2870991704935719,-0.28677830308274543,-0.2864574947120906,-0.2861367452938746,-0.28581605474046196,-0.28549542296431346,-0.28517484987798636,-0.2848543353941344,-0.28453387942550706,-0.28421348188495016,-0.2838931426854047,-0.28357286173990726,-0.28325263896158964,-0.28293247426367873,-0.28261236755949626,-0.2822923187624585,-0.2819723277860764,-0.2816523945439546,-0.28133251894979233,-0.28101270091738245,-0.28069294036061126,-0.2803732371934588,-0.28005359132999813,-0.27973400268439536,-0.2794144711709095,-0.2790949967038923,-0.27877557919778767,-0.27845621856713193,-0.27813691472655344,-0.2778176675907725,-0.2774984770746008,-0.27717934309294173,-0.2768602655607899,-0.2765412443932311,-0.27622227950544154,-0.2759033708126888,-0.2755845182303304,-0.2752657216738144,-0.27494698105867893,-0.2746282963005521,-0.27430966731515166,-0.2739910940182849,-0.2736725763258485,-0.27335411415382826,-0.2730357074182991,-0.27271735603542435,-0.27239905992145635,-0.2720808189927356,-0.2717626331656909,-0.27144450235683903,-0.27112642648278473,-0.27080840546022006,-0.270490439205925,-0.2701725276367666,-0.2698546706696988,-0.26953686822176304,-0.2692191202100866,-0.26890142655188426,-0.26858378716445636,-0.26826620196519,-0.26794867087155794,-0.2676311938011189,-0.26731377067151696,-0.26699640140048225,-0.2666790859058294,-0.2663618241054587,-0.266044615917355,-0.26572746125958824,-0.2654103600503125,-0.2650933122077665,-0.26477631765027293,-0.2644593762962387,-0.2641424880641545,-0.26382565287259446,-0.2635088706402166,-0.2631921412857616,-0.26287546472805395,-0.26255884088600073,-0.26224226967859166,-0.26192575102489946,-0.2616092848440788,-0.26129287105536686,-0.2609765095780829,-0.260660200331628,-0.2603439432354849,-0.26002773820921793,-0.2597115851724729,-0.2593954840449766,-0.25907943474653694,-0.2587634371970429,-0.25844749131646383,-0.2581315970248497,-0.2578157542423307,-0.2574999628891178,-0.25718422288550075,-0.2568685341518504,-0.2565528966086165,-0.25623731017632856,-0.25592177477559525,-0.2556062903271047,-0.25529085675162355,-0.25497547396999776,-0.2546601419031516,-0.2543448604720878,-0.2540296295978877,-0.2537144492017106,-0.25339931920479364,-0.2530842395284519,-0.25276921009407843,-0.2524542308231431,-0.2521393016371937,-0.25182442245785486,-0.2515095932068283,-0.25119481380589254,-0.2508800841769026,-0.2505654042417906,-0.250250773922564,-0.24993619314130752,-0.24962166182018108,-0.24930717988142084,-0.24899274724733847,-0.24867836384032127,-0.24836402958283202,-0.2480497443974085,-0.2477355082066635,-0.24742132093328514,-0.24710718250003552,-0.246793092829752,-0.24647905184534602,-0.24616505946980327,-0.24585111562618372,-0.245537220237621,-0.24522337322732282,-0.24490957451857018,-0.24459582403471783,-0.24428212169919372,-0.24396846743549888,-0.24365486116720736,-0.24334130281796632,-0.24302779231149504,-0.2427143295715859,-0.24240091452210324,-0.24208754708698396,-0.2417742271902367,-0.24146095475594226,-0.24114772970825304,-0.24083455197139317,-0.24052142146965816,-0.24020833812741474,-0.2398953018691009,-0.23958231261922555,-0.2392693703023687,-0.23895647484318044,-0.23864362616638218,-0.23833082419676505,-0.2380180688591909,-0.23770536007859142,-0.2373926977799681,-0.23708008188839266,-0.23676751232900614,-0.23645498902701895,-0.23614251190771124,-0.23583008089643206,-0.23551769591859953,-0.23520535689970076,-0.2348930637652915,-0.2345808164409963,-0.23426861485250788,-0.23395645892558753,-0.23364434858606442,-0.23333228375983606,-0.2330202643728677,-0.23270829035119214,-0.23239636162090999,-0.23208447810818927,-0.23177263973926499,-0.2314608464404397,-0.2311490981380829,-0.23083739475863052,-0.2305257362285859,-0.23021412247451825,-0.22990255342306357,-0.2295910290009243,-0.22927954913486853,-0.2289681137517307,-0.22865672277841115,-0.2283453761418758,-0.22803407376915608,-0.2277228155873489,-0.22741160152361667,-0.22710043150518652,-0.22678930545935105,-0.22647822331346748,-0.2261671849949576,-0.22585619043130825,-0.22554523955007033,-0.2252343322788592,-0.22492346854535433,-0.2246126482772994,-0.22430187140250168,-0.2239911378488326,-0.22368044754422667,-0.22336980041668245,-0.22305919639426147,-0.2227486354050886,-0.22243811737735167,-0.22212764223930176,-0.22181720991925252,-0.22150682034558006,-0.22119647344672333,-0.22088616915118367,-0.22057590738752442,-0.22026568808437136,-0.21995551117041198,-0.21964537657439587,-0.21933528422513401,-0.21902523405149935,-0.21871522598242607,-0.2184052599469097,-0.21809533587400692,-0.21778545369283542,-0.21747561333257406,-0.2171658147224623,-0.21685605779180017,-0.21654634246994847,-0.21623666868632796,-0.2159270363704202,-0.21561744545176664,-0.21530789585996846,-0.21499838752468717,-0.21468892037564377,-0.2143794943426188,-0.21407010935545248,-0.2137607653440441,-0.21345146223835257,-0.21314219996839545,-0.21283297846424953,-0.2125237976560504,-0.2122146574739922,-0.2119055578483279,-0.21159649870936864,-0.21128747998748387,-0.21097850161310164,-0.2106695635167076,-0.2103606656288456,-0.21005180788011713,-0.2097429902011816,-0.20943421252275546,-0.20912547477561333,-0.2088167768905865,-0.2085081187985637,-0.20819950043049076,-0.20789092171737036,-0.20758238259026193,-0.2072738829802816,-0.20696542281860203,-0.20665700203645254,-0.2063486205651184,-0.2060402783359413,-0.2057319752803188,-0.20542371132970455,-0.20511548641560795,-0.204807300469594,-0.20449915342328348,-0.20419104520835232,-0.20388297575653205,-0.2035749449996091,-0.20326695286942514,-0.20295899929787692,-0.20265108421691574,-0.2023432075585478,-0.2020353692548337,-0.2017275692378887,-0.2014198074398824,-0.2011120837930385,-0.20080439822963475,-0.20049675068200312,-0.20018914108252908,-0.19988156936365234,-0.19957403545786587,-0.19926653929771615,-0.19895908081580313,-0.1986516599447801,-0.19834427661735335,-0.19803693076628226,-0.1977296223243793,-0.19742235122450924,-0.19711511739959,-0.1968079207825921,-0.19650076130653793,-0.19619363890450273,-0.19588655350961381,-0.19557950505505056,-0.19527249347404427,-0.19496551869987813,-0.19465858066588704,-0.19435167930545766,-0.19404481455202802,-0.19373798633908743,-0.19343119460017677,-0.193124439268888,-0.19281772027886387,-0.19251103756379837,-0.19220439105743609,-0.1918977806935724,-0.19159120640605345,-0.19128466812877556,-0.1909781657956855,-0.19067169934078032,-0.19036526869810727,-0.19005887380176348,-0.18975251458589612,-0.189446190984702,-0.18913990293242772,-0.1888336503633695,-0.18852743321187282,-0.1882212514123327,-0.18791510489919336,-0.18760899360694794,-0.18730291747013886,-0.1869968764233573,-0.18669087040124313,-0.1863848993384852,-0.1860789631698205,-0.18577306183003495,-0.18546719525396232,-0.18516136337648503,-0.18485556613253326,-0.18454980345708555,-0.1842440752851681,-0.18393838155185496,-0.183632722192268,-0.18332709714157636,-0.183021506334997,-0.1827159497077939,-0.18241042719527864,-0.18210493873280956,-0.18179948425579234,-0.18149406369967946,-0.18118867699997016,-0.18088332409221045,-0.18057800491199297,-0.18027271939495673,-0.17996746747678732,-0.17966224909321643,-0.17935706418002198,-0.17905191267302786,-0.17874679450810424,-0.17844170962116662,-0.1781366579481768,-0.17783163942514185,-0.1775266539881144,-0.17722170157319275,-0.1769167821165202,-0.17661189555428544,-0.17630704182272225,-0.1760022208581095,-0.1756974325967708,-0.17539267697507457,-0.1750879539294341,-0.174783263396307,-0.17447860531219567,-0.17417397961364658,-0.1738693862372507,-0.17356482511964316,-0.17326029619750294,-0.17295579940755318,-0.17265133468656077,-0.1723469019713366,-0.17204250119873482,-0.17173813230565355,-0.17143379522903404,-0.17112948990586094,-0.1708252162731623,-0.1705209742680092,-0.17021676382751577,-0.1699125848888391,-0.169608437389179,-0.1693043212657783,-0.16900023645592213,-0.16869618289693844,-0.16839216052619735,-0.16808816928111148,-0.16778420909913572,-0.167480279917767,-0.16717638167454413,-0.1668725143070481,-0.16656867775290168,-0.16626487194976936,-0.1659610968353571,-0.1656573523474126,-0.16535363842372494,-0.1650499550021244,-0.16474630202048277,-0.16444267941671256,-0.16413908712876774,-0.1638355250946429,-0.16353199325237375,-0.1632284915400364,-0.1629250198957479,-0.16262157825766568,-0.16231816656398765,-0.16201478475295214,-0.16171143276283753,-0.1614081105319627,-0.16110481799868617,-0.1608015551014067,-0.16049832177856285,-0.16019511796863287,-0.1598919436101348,-0.1595887986416261,-0.1592856830017038,-0.15898259662900424,-0.15867953946220323,-0.15837651144001547,-0.15807351250119492,-0.15777054258453457,-0.15746760162886622,-0.15716468957306043,-0.15686180635602667,-0.15655895191671282,-0.15625612619410534,-0.1559533291272291,-0.15565056065514726,-0.15534782071696135,-0.15504510925181086,-0.15474242619887357,-0.15443977149736485,-0.15413714508653822,-0.15383454690568474,-0.15353197689413345,-0.1532294349912507,-0.1529269211364403,-0.15262443526914354,-0.1523219773288391,-0.15201954725504271,-0.15171714498730712,-0.15141477046522242,-0.15111242362841526,-0.1508101044165494,-0.15050781276932512,-0.15020554862647947,-0.14990331192778603,-0.14960110261305476,-0.14929892062213218,-0.1489967658949008,-0.14869463837127958,-0.14839253799122334,-0.14809046469472312,-0.1477884184218057,-0.14748639911253375,-0.14718440670700572,-0.14688244114535554,-0.1465805023677528,-0.14627859031440252,-0.1459767049255451,-0.14567484614145618,-0.14537301390244656,-0.1450712081488622,-0.14476942882108407,-0.1444676758595279,-0.14416594920464437,-0.14386424879691895,-0.14356257457687158,-0.1432609264850569,-0.14295930446206392,-0.1426577084485161,-0.14235613838507108,-0.14205459421242086,-0.14175307587129138,-0.14145158330244265,-0.14115011644666867,-0.14084867524479727,-0.14054725963769,-0.14024586956624197,-0.13994450497138203,-0.1396431657940725,-0.139341851975309,-0.13904056345612054,-0.13873930017756936,-0.13843806208075085,-0.1381368491067933,-0.1378356611968582,-0.1375344982921397,-0.13723336033386493,-0.1369322472632935,-0.1366311590217178,-0.13633009555046274,-0.13602905679088567,-0.1357280426843762,-0.13542705317235626,-0.1351260881962799,-0.1348251476976335,-0.13452423161793517,-0.1342233398987351,-0.13392247248161523,-0.13362162930818935,-0.1333208103201028,-0.13302001545903264,-0.1327192446666873,-0.1324184978848066,-0.13211777505516192,-0.1318170761195556,-0.13151640101982123,-0.13121574969782346,-0.1309151220954581,-0.1306145181546516,-0.13031393781736134,-0.13001338102557541,-0.1297128477213126,-0.12941233784662226,-0.12911185134358413,-0.1288113881543084,-0.12851094822093562,-0.1282105314856364,-0.12791013789061176,-0.1276097673780925,-0.12730941989033967,-0.12700909536964394,-0.12670879375832597,-0.12640851499873612,-0.12610825903325423,-0.12580802580429004,-0.1255078152542824,-0.12520762732569976,-0.12490746196103993,-0.12460731910282968,-0.12430719869362523,-0.12400710067601176,-0.12370702499260332,-0.12340697158604302,-0.1231069403990027,-0.1228069313741829,-0.12250694445431298,-0.12220697958215064,-0.1219070367004823,-0.12160711575212253,-0.12130721667991448,-0.12100733942672943,-0.12070748393546683,-0.1204076501490542,-0.12010783801044715,-0.11980804746262905,-0.11950827844861125,-0.11920853091143276,-0.11890880479416042,-0.11860910003988849,-0.1183094165917389,-0.11800975439286081,-0.11771011338643096,-0.11741049351565334,-0.11711089472375895,-0.11681131695400605,-0.11651176014967998,-0.11621222425409293,-0.11591270921058397,-0.11561321496251914,-0.11531374145329092,-0.11501428862631864,-0.11471485642504807,-0.11441544479295157,-0.11411605367352778,-0.11381668301030175,-0.11351733274682473,-0.11321800282667419,-0.1129186931934536,-0.1126194037907924,-0.11232013456234616,-0.11202088545179605,-0.1117216564028492,-0.11142244735923831,-0.11112325826472177,-0.11082408906308344,-0.1105249396981327,-0.11022581011370426,-0.10992670025365811,-0.10962761006187952,-0.10932853948227893,-0.10902948845879167,-0.10873045693537833,-0.10843144485602414,-0.1081324521647394,-0.10783347880555899,-0.1075345247225425,-0.10723558985977424,-0.10693667416136292,-0.10663777757144167,-0.10633890003416815,-0.1060400414937242,-0.10574120189431588,-0.10544238118017334,-0.10514357929555096,-0.10484479618472696,-0.10454603179200347,-0.10424728606170655,-0.10394855893818597,-0.10364985036581512,-0.10335116028899108,-0.10305248865213447,-0.10275383539968919,-0.1024552004761228,-0.10215658382592588,-0.10185798539361243,-0.10155940512371947,-0.10126084296080723,-0.10096229884945879,-0.10066377273428026,-0.10036526455990054,-0.1000667742709713,-0.09976830181216693,-0.09946984712818448,-0.09917141016374345,-0.09887299086358588,-0.0985745891724762,-0.09827620503520111,-0.09797783839656968,-0.09767948920141298,-0.09738115739458425,-0.09708284292095881,-0.09678454572543393,-0.09648626575292861,-0.09618800294838374,-0.09588975725676205,-0.09559152862304769,-0.09529331699224661,-0.09499512230938605,-0.09469694451951481,-0.09439878356770307,-0.09410063939904216,-0.09380251195864475,-0.09350440119164462,-0.09320630704319646,-0.09290822945847618,-0.09261016838268041,-0.09231212376102667,-0.09201409553875332,-0.09171608366111937,-0.09141808807340436,-0.09112010872090852,-0.09082214554895245,-0.09052419850287714,-0.09022626752804407,-0.08992835256983471,-0.0896304535736509,-0.08933257048491458,-0.08903470324906763,-0.08873685181157195,-0.08843901611790936,-0.08814119611358143,-0.08784339174410949,-0.0875456029550346,-0.08724782969191733,-0.08695007190033788,-0.08665232952589584,-0.0863546025142101,-0.08605689081091909,-0.08575919436168025,-0.08546151311217033,-0.0851638470080851,-0.0848661959951394,-0.08456856001906699,-0.08427093902562056,-0.08397333296057151,-0.08367574176971006,-0.0833781653988451,-0.08308060379380405,-0.08278305690043294,-0.08248552466459613,-0.08218800703217652,-0.08189050394907518,-0.08159301536121145,-0.0812955412145229,-0.08099808145496515,-0.08070063602851182,-0.08040320488115452,-0.08010578795890273,-0.07980838520778381,-0.07951099657384272,-0.07921362200314218,-0.07891626144176252,-0.07861891483580158,-0.07832158213137465,-0.07802426327461441,-0.0777269582116709,-0.07742966688871135,-0.07713238925192022,-0.07683512524749898,-0.07653787482166627,-0.07624063792065763,-0.07594341449072552,-0.07564620447813916,-0.07534900782918466,-0.07505182449016463,-0.07475465440739847,-0.07445749752722207,-0.07416035379598777,-0.07386322316006434,-0.07356610556583693,-0.07326900095970687,-0.07297190928809173,-0.07267483049742529,-0.07237776453415726,-0.0720807113447534,-0.07178367087569547,-0.07148664307348093,-0.07118962788462317,-0.0708926252556512,-0.07059563513310965,-0.07029865746355891,-0.07000169219357463,-0.0697047392697481,-0.0694077986386859,-0.06911087024700983,-0.06881395404135711,-0.06851704996837998,-0.0682201579747458,-0.067923278007137,-0.06762641001225095,-0.06732955393679983,-0.06703270972751077,-0.06673587733112561,-0.06643905669440082,-0.06614224776410753,-0.06584545048703144,-0.06554866480997269,-0.06525189067974586,-0.06495512804317982,-0.06465837684711778,-0.0643616370384171,-0.06406490856394935,-0.06376819137060011,-0.06347148540526898,-0.0631747906148695,-0.06287810694632909,-0.06258143434658892,-0.06228477276260398,-0.061988122141342826,-0.061691482429787683,-0.06139485357493428,-0.06109823552379179,-0.060801628223382795,-0.060505031620743215,-0.060208445662922216,-0.05991187029698215,-0.05961530546999854,-0.05931875112905989,-0.05902220722126772,-0.058725673693736526,-0.058429150493593575,-0.058132637567979,-0.0578361348640456,-0.05753964232895884,-0.057243159909896826,-0.05694668755405009,-0.056650225208621674,-0.05635377282082702,-0.05605733033789384,-0.05576089770706214,-0.0554644748755841,-0.05516806179072401,-0.05487165839975822,-0.05457526464997508,-0.054278880488674824,-0.05398250586316956,-0.0536861407207832,-0.053389785008851345,-0.05309343867472124,-0.052797101665751765,-0.05250077392931331,-0.05220445541278764,-0.05190814606356804,-0.051611845829058985,-0.05131555465667631,-0.05101927249384699,-0.05072299928800908,-0.050426734986611786,-0.05013047953711525,-0.04983423288699054,-0.049537994983719594,-0.04924176577479513,-0.04894554520772059,-0.04864933323001012,-0.04835312978918838,-0.048056934832790645,-0.04776074830836259,-0.04746457016346034,-0.047168400345650265,-0.04687223880250909,-0.04657608548162374,-0.0462799403305912,-0.045983803297018566,-0.045687674328522956,-0.04539155337273141,-0.045095440377280825,-0.0447993352898179,-0.04450323805799912,-0.04420714862949059,-0.04391106695196808,-0.04361499297311688,-0.04331892664063173,-0.04302286790221681,-0.042726816705585674,-0.042430772998461125,-0.04213473672857519,-0.04183870784366907,-0.041542686291493,-0.041246672019806335,-0.040950664976377296,-0.04065466510898303,-0.04035867236540951,-0.04006268669345149,-0.039766708040912396,-0.03947073635560429,-0.03917477158534782,-0.03887881367797213,-0.038582862581314784,-0.03828691824322174,-0.03799098061154726,-0.037695049634153835,-0.03739912525891217,-0.03710320743370104,-0.036807296106407296,-0.03651139122492579,-0.036215492737159224,-0.035919600591018244,-0.03562371473442125,-0.03532783511529434,-0.0350319616815713,-0.03473609438119353,-0.03444023316210992,-0.03414437797227688,-0.033848528759658186,-0.033552685472224945,-0.03325684805795557,-0.03296101646483568,-0.032665190640858,-0.0323693705340224,-0.03207355609233572,-0.03177774726381177,-0.031481943996471244,-0.03118614623834166,-0.03089035393745731,-0.030594567041859144,-0.030298785499594794,-0.030003009258718436,-0.02970723826729073,-0.02941147247337881,-0.029115711825056165,-0.028819956270402576,-0.028524205757504136,-0.028228460234453055,-0.027932719649347678,-0.02763698395029243,-0.02734125308539768,-0.027045527002779787,-0.02674980565056093,-0.026454088976869072,-0.026158376929837957,-0.02586266945760697,-0.02556696650832111,-0.02527126803013092,-0.024975573971192423,-0.024679884279667053,-0.024384198903721607,-0.024088517791528145,-0.023792840891263996,-0.02349716815111159,-0.02320149951925852,-0.022905834943897342,-0.022610174373225635,-0.022314517755445865,-0.022018865038765333,-0.021723216171396133,-0.021427571101555052,-0.021131929777463563,-0.020836292147347682,-0.02054065815943798,-0.02024502776196948,-0.019949400903181598,-0.01965377753131808,-0.01935815759462696,-0.01906254104136045,-0.018766927819774917,-0.01847131787813082,-0.018175711164692604,-0.017880107627728698,-0.017584507215511396,-0.017288909876316826,-0.016993315558424874,-0.01669772421011912,-0.016402135779686796,-0.016106550215418677,-0.015810967465609078,-0.015515387478555721,-0.015219810202559747,-0.014924235585925589,-0.01462866357696094,-0.014333094123976684,-0.014037527175286835,-0.013741962679208465,-0.013446400584061659,-0.01315084083816942,-0.012855283389857645,-0.01255972818745503,-0.012264175179293018,-0.011968624313705744,-0.011673075539029956,-0.011377528803604965,-0.011081984055772567,-0.010786441243877,-0.01049090031626487,-0.010195361221285079,-0.009899823907288776,-0.009604288322629289,-0.009308754415662054,-0.009013222134744566,-0.00871769142823631,-0.008422162244498693,-0.008126634531894975,-0.007831108238790229,-0.007535583313551264,-0.00724005970454655,-0.006944537360146174,-0.0066490162287217705,-0.006353496258646451,-0.006057977398294753,-0.00576245959604257,-0.005466942800267087,-0.00517142695934672,-0.004875912021661055,-0.004580397935590777,-0.004284884649517621,-0.003989372111824291,-0.00369386027089441,-0.0033983490751124546,-0.0031028384728636863,-0.002807328412534096,-0.002511818842510334,-0.0022163097111796526,-0.0019208009669298383,-0.0016252925581491525,-0.0013297844332262655,-0.0010342765405501955,-0.000738768828510244,-0.00044326124549593415,-0.00014775373989694577,0.00014775373989694577,0.00044326124549593415,0.000738768828510244,0.0010342765405501955,0.0013297844332262655,0.0016252925581491525,0.0019208009669298383,0.0022163097111796526,0.002511818842510334,0.002807328412534096,0.0031028384728636863,0.0033983490751124546,0.00369386027089441,0.003989372111824291,0.004284884649517621,0.004580397935590777,0.004875912021661055,0.00517142695934672,0.005466942800267087,0.00576245959604257,0.006057977398294753,0.006353496258646451,0.0066490162287217705,0.006944537360146174,0.00724005970454655,0.007535583313551264,0.007831108238790229,0.008126634531894975,0.008422162244498693,0.00871769142823631,0.009013222134744566,0.009308754415662054,0.009604288322629289,0.009899823907288776,0.010195361221285079,0.01049090031626487,0.010786441243877,0.011081984055772567,0.011377528803604965,0.011673075539029956,0.011968624313705744,0.012264175179293018,0.01255972818745503,0.012855283389857645,0.01315084083816942,0.013446400584061659,0.013741962679208465,0.014037527175286835,0.014333094123976684,0.01462866357696094,0.014924235585925589,0.015219810202559747,0.015515387478555721,0.015810967465609078,0.016106550215418677,0.016402135779686796,0.01669772421011912,0.016993315558424874,0.017288909876316826,0.017584507215511396,0.017880107627728698,0.018175711164692604,0.01847131787813082,0.018766927819774917,0.01906254104136045,0.01935815759462696,0.01965377753131808,0.019949400903181598,0.02024502776196948,0.02054065815943798,0.020836292147347682,0.021131929777463563,0.021427571101555052,0.021723216171396133,0.022018865038765333,0.022314517755445865,0.022610174373225635,0.022905834943897342,0.02320149951925852,0.02349716815111159,0.023792840891263996,0.024088517791528145,0.024384198903721607,0.024679884279667053,0.024975573971192423,0.02527126803013092,0.02556696650832111,0.02586266945760697,0.026158376929837957,0.026454088976869072,0.02674980565056093,0.027045527002779787,0.02734125308539768,0.02763698395029243,0.027932719649347678,0.028228460234453055,0.028524205757504136,0.028819956270402576,0.029115711825056165,0.02941147247337881,0.02970723826729073,0.030003009258718436,0.030298785499594794,0.030594567041859144,0.03089035393745731,0.03118614623834166,0.031481943996471244,0.03177774726381177,0.03207355609233572,0.0323693705340224,0.032665190640858,0.03296101646483568,0.03325684805795557,0.033552685472224945,0.033848528759658186,0.03414437797227688,0.03444023316210992,0.03473609438119353,0.0350319616815713,0.03532783511529434,0.03562371473442125,0.035919600591018244,0.036215492737159224,0.03651139122492579,0.036807296106407296,0.03710320743370104,0.03739912525891217,0.037695049634153835,0.03799098061154726,0.03828691824322174,0.038582862581314784,0.03887881367797213,0.03917477158534782,0.03947073635560429,0.039766708040912396,0.04006268669345149,0.04035867236540951,0.04065466510898303,0.040950664976377296,0.041246672019806335,0.041542686291493,0.04183870784366907,0.04213473672857519,0.042430772998461125,0.042726816705585674,0.04302286790221681,0.04331892664063173,0.04361499297311688,0.04391106695196808,0.04420714862949059,0.04450323805799912,0.0447993352898179,0.045095440377280825,0.04539155337273141,0.045687674328522956,0.045983803297018566,0.0462799403305912,0.04657608548162374,0.04687223880250909,0.047168400345650265,0.04746457016346034,0.04776074830836259,0.048056934832790645,0.04835312978918838,0.04864933323001012,0.04894554520772059,0.04924176577479513,0.049537994983719594,0.04983423288699054,0.05013047953711525,0.050426734986611786,0.05072299928800908,0.05101927249384699,0.05131555465667631,0.051611845829058985,0.05190814606356804,0.05220445541278764,0.05250077392931331,0.052797101665751765,0.05309343867472124,0.053389785008851345,0.0536861407207832,0.05398250586316956,0.054278880488674824,0.05457526464997508,0.05487165839975822,0.05516806179072401,0.0554644748755841,0.05576089770706214,0.05605733033789384,0.05635377282082702,0.056650225208621674,0.05694668755405009,0.057243159909896826,0.05753964232895884,0.0578361348640456,0.058132637567979,0.058429150493593575,0.058725673693736526,0.05902220722126772,0.05931875112905989,0.05961530546999854,0.05991187029698215,0.060208445662922216,0.060505031620743215,0.060801628223382795,0.06109823552379179,0.06139485357493428,0.061691482429787683,0.061988122141342826,0.06228477276260398,0.06258143434658892,0.06287810694632909,0.0631747906148695,0.06347148540526898,0.06376819137060011,0.06406490856394935,0.0643616370384171,0.06465837684711778,0.06495512804317982,0.06525189067974586,0.06554866480997269,0.06584545048703144,0.06614224776410753,0.06643905669440082,0.06673587733112561,0.06703270972751077,0.06732955393679983,0.06762641001225095,0.067923278007137,0.0682201579747458,0.06851704996837998,0.06881395404135711,0.06911087024700983,0.0694077986386859,0.0697047392697481,0.07000169219357463,0.07029865746355891,0.07059563513310965,0.0708926252556512,0.07118962788462317,0.07148664307348093,0.07178367087569547,0.0720807113447534,0.07237776453415726,0.07267483049742529,0.07297190928809173,0.07326900095970687,0.07356610556583693,0.07386322316006434,0.07416035379598777,0.07445749752722207,0.07475465440739847,0.07505182449016463,0.07534900782918466,0.07564620447813916,0.07594341449072552,0.07624063792065763,0.07653787482166627,0.07683512524749898,0.07713238925192022,0.07742966688871135,0.0777269582116709,0.07802426327461441,0.07832158213137465,0.07861891483580158,0.07891626144176252,0.07921362200314218,0.07951099657384272,0.07980838520778381,0.08010578795890273,0.08040320488115452,0.08070063602851182,0.08099808145496515,0.0812955412145229,0.08159301536121145,0.08189050394907518,0.08218800703217652,0.08248552466459613,0.08278305690043294,0.08308060379380405,0.0833781653988451,0.08367574176971006,0.08397333296057151,0.08427093902562056,0.08456856001906699,0.0848661959951394,0.0851638470080851,0.08546151311217033,0.08575919436168025,0.08605689081091909,0.0863546025142101,0.08665232952589584,0.08695007190033788,0.08724782969191733,0.0875456029550346,0.08784339174410949,0.08814119611358143,0.08843901611790936,0.08873685181157195,0.08903470324906763,0.08933257048491458,0.0896304535736509,0.08992835256983471,0.09022626752804407,0.09052419850287714,0.09082214554895245,0.09112010872090852,0.09141808807340436,0.09171608366111937,0.09201409553875332,0.09231212376102667,0.09261016838268041,0.09290822945847618,0.09320630704319646,0.09350440119164462,0.09380251195864475,0.09410063939904216,0.09439878356770307,0.09469694451951481,0.09499512230938605,0.09529331699224661,0.09559152862304769,0.09588975725676205,0.09618800294838374,0.09648626575292861,0.09678454572543393,0.09708284292095881,0.09738115739458425,0.09767948920141298,0.09797783839656968,0.09827620503520111,0.0985745891724762,0.09887299086358588,0.09917141016374345,0.09946984712818448,0.09976830181216693,0.1000667742709713,0.10036526455990054,0.10066377273428026,0.10096229884945879,0.10126084296080723,0.10155940512371947,0.10185798539361243,0.10215658382592588,0.1024552004761228,0.10275383539968919,0.10305248865213447,0.10335116028899108,0.10364985036581512,0.10394855893818597,0.10424728606170655,0.10454603179200347,0.10484479618472696,0.10514357929555096,0.10544238118017334,0.10574120189431588,0.1060400414937242,0.10633890003416815,0.10663777757144167,0.10693667416136292,0.10723558985977424,0.1075345247225425,0.10783347880555899,0.1081324521647394,0.10843144485602414,0.10873045693537833,0.10902948845879167,0.10932853948227893,0.10962761006187952,0.10992670025365811,0.11022581011370426,0.1105249396981327,0.11082408906308344,0.11112325826472177,0.11142244735923831,0.1117216564028492,0.11202088545179605,0.11232013456234616,0.1126194037907924,0.1129186931934536,0.11321800282667419,0.11351733274682473,0.11381668301030175,0.11411605367352778,0.11441544479295157,0.11471485642504807,0.11501428862631864,0.11531374145329092,0.11561321496251914,0.11591270921058397,0.11621222425409293,0.11651176014967998,0.11681131695400605,0.11711089472375895,0.11741049351565334,0.11771011338643096,0.11800975439286081,0.1183094165917389,0.11860910003988849,0.11890880479416042,0.11920853091143276,0.11950827844861125,0.11980804746262905,0.12010783801044715,0.1204076501490542,0.12070748393546683,0.12100733942672943,0.12130721667991448,0.12160711575212253,0.1219070367004823,0.12220697958215064,0.12250694445431298,0.1228069313741829,0.1231069403990027,0.12340697158604302,0.12370702499260332,0.12400710067601176,0.12430719869362523,0.12460731910282968,0.12490746196103993,0.12520762732569976,0.1255078152542824,0.12580802580429004,0.12610825903325423,0.12640851499873612,0.12670879375832597,0.12700909536964394,0.12730941989033967,0.1276097673780925,0.12791013789061176,0.1282105314856364,0.12851094822093562,0.1288113881543084,0.12911185134358413,0.12941233784662226,0.1297128477213126,0.13001338102557541,0.13031393781736134,0.1306145181546516,0.1309151220954581,0.13121574969782346,0.13151640101982123,0.1318170761195556,0.13211777505516192,0.1324184978848066,0.1327192446666873,0.13302001545903264,0.1333208103201028,0.13362162930818935,0.13392247248161523,0.1342233398987351,0.13452423161793517,0.1348251476976335,0.1351260881962799,0.13542705317235626,0.1357280426843762,0.13602905679088567,0.13633009555046274,0.1366311590217178,0.1369322472632935,0.13723336033386493,0.1375344982921397,0.1378356611968582,0.1381368491067933,0.13843806208075085,0.13873930017756936,0.13904056345612054,0.139341851975309,0.1396431657940725,0.13994450497138203,0.14024586956624197,0.14054725963769,0.14084867524479727,0.14115011644666867,0.14145158330244265,0.14175307587129138,0.14205459421242086,0.14235613838507108,0.1426577084485161,0.14295930446206392,0.1432609264850569,0.14356257457687158,0.14386424879691895,0.14416594920464437,0.1444676758595279,0.14476942882108407,0.1450712081488622,0.14537301390244656,0.14567484614145618,0.1459767049255451,0.14627859031440252,0.1465805023677528,0.14688244114535554,0.14718440670700572,0.14748639911253375,0.1477884184218057,0.14809046469472312,0.14839253799122334,0.14869463837127958,0.1489967658949008,0.14929892062213218,0.14960110261305476,0.14990331192778603,0.15020554862647947,0.15050781276932512,0.1508101044165494,0.15111242362841526,0.15141477046522242,0.15171714498730712,0.15201954725504271,0.1523219773288391,0.15262443526914354,0.1529269211364403,0.1532294349912507,0.15353197689413345,0.15383454690568474,0.15413714508653822,0.15443977149736485,0.15474242619887357,0.15504510925181086,0.15534782071696135,0.15565056065514726,0.1559533291272291,0.15625612619410534,0.15655895191671282,0.15686180635602667,0.15716468957306043,0.15746760162886622,0.15777054258453457,0.15807351250119492,0.15837651144001547,0.15867953946220323,0.15898259662900424,0.1592856830017038,0.1595887986416261,0.1598919436101348,0.16019511796863287,0.16049832177856285,0.1608015551014067,0.16110481799868617,0.1614081105319627,0.16171143276283753,0.16201478475295214,0.16231816656398765,0.16262157825766568,0.1629250198957479,0.1632284915400364,0.16353199325237375,0.1638355250946429,0.16413908712876774,0.16444267941671256,0.16474630202048277,0.1650499550021244,0.16535363842372494,0.1656573523474126,0.1659610968353571,0.16626487194976936,0.16656867775290168,0.1668725143070481,0.16717638167454413,0.167480279917767,0.16778420909913572,0.16808816928111148,0.16839216052619735,0.16869618289693844,0.16900023645592213,0.1693043212657783,0.169608437389179,0.1699125848888391,0.17021676382751577,0.1705209742680092,0.1708252162731623,0.17112948990586094,0.17143379522903404,0.17173813230565355,0.17204250119873482,0.1723469019713366,0.17265133468656077,0.17295579940755318,0.17326029619750294,0.17356482511964316,0.1738693862372507,0.17417397961364658,0.17447860531219567,0.174783263396307,0.1750879539294341,0.17539267697507457,0.1756974325967708,0.1760022208581095,0.17630704182272225,0.17661189555428544,0.1769167821165202,0.17722170157319275,0.1775266539881144,0.17783163942514185,0.1781366579481768,0.17844170962116662,0.17874679450810424,0.17905191267302786,0.17935706418002198,0.17966224909321643,0.17996746747678732,0.18027271939495673,0.18057800491199297,0.18088332409221045,0.18118867699997016,0.18149406369967946,0.18179948425579234,0.18210493873280956,0.18241042719527864,0.1827159497077939,0.183021506334997,0.18332709714157636,0.183632722192268,0.18393838155185496,0.1842440752851681,0.18454980345708555,0.18485556613253326,0.18516136337648503,0.18546719525396232,0.18577306183003495,0.1860789631698205,0.1863848993384852,0.18669087040124313,0.1869968764233573,0.18730291747013886,0.18760899360694794,0.18791510489919336,0.1882212514123327,0.18852743321187282,0.1888336503633695,0.18913990293242772,0.189446190984702,0.18975251458589612,0.19005887380176348,0.19036526869810727,0.19067169934078032,0.1909781657956855,0.19128466812877556,0.19159120640605345,0.1918977806935724,0.19220439105743609,0.19251103756379837,0.19281772027886387,0.193124439268888,0.19343119460017677,0.19373798633908743,0.19404481455202802,0.19435167930545766,0.19465858066588704,0.19496551869987813,0.19527249347404427,0.19557950505505056,0.19588655350961381,0.19619363890450273,0.19650076130653793,0.1968079207825921,0.19711511739959,0.19742235122450924,0.1977296223243793,0.19803693076628226,0.19834427661735335,0.1986516599447801,0.19895908081580313,0.19926653929771615,0.19957403545786587,0.19988156936365234,0.20018914108252908,0.20049675068200312,0.20080439822963475,0.2011120837930385,0.2014198074398824,0.2017275692378887,0.2020353692548337,0.2023432075585478,0.20265108421691574,0.20295899929787692,0.20326695286942514,0.2035749449996091,0.20388297575653205,0.20419104520835232,0.20449915342328348,0.204807300469594,0.20511548641560795,0.20542371132970455,0.2057319752803188,0.2060402783359413,0.2063486205651184,0.20665700203645254,0.20696542281860203,0.2072738829802816,0.20758238259026193,0.20789092171737036,0.20819950043049076,0.2085081187985637,0.2088167768905865,0.20912547477561333,0.20943421252275546,0.2097429902011816,0.21005180788011713,0.2103606656288456,0.2106695635167076,0.21097850161310164,0.21128747998748387,0.21159649870936864,0.2119055578483279,0.2122146574739922,0.2125237976560504,0.21283297846424953,0.21314219996839545,0.21345146223835257,0.2137607653440441,0.21407010935545248,0.2143794943426188,0.21468892037564377,0.21499838752468717,0.21530789585996846,0.21561744545176664,0.2159270363704202,0.21623666868632796,0.21654634246994847,0.21685605779180017,0.2171658147224623,0.21747561333257406,0.21778545369283542,0.21809533587400692,0.2184052599469097,0.21871522598242607,0.21902523405149935,0.21933528422513401,0.21964537657439587,0.21995551117041198,0.22026568808437136,0.22057590738752442,0.22088616915118367,0.22119647344672333,0.22150682034558006,0.22181720991925252,0.22212764223930176,0.22243811737735167,0.2227486354050886,0.22305919639426147,0.22336980041668245,0.22368044754422667,0.2239911378488326,0.22430187140250168,0.2246126482772994,0.22492346854535433,0.2252343322788592,0.22554523955007033,0.22585619043130825,0.2261671849949576,0.22647822331346748,0.22678930545935105,0.22710043150518652,0.22741160152361667,0.2277228155873489,0.22803407376915608,0.2283453761418758,0.22865672277841115,0.2289681137517307,0.22927954913486853,0.2295910290009243,0.22990255342306357,0.23021412247451825,0.2305257362285859,0.23083739475863052,0.2311490981380829,0.2314608464404397,0.23177263973926499,0.23208447810818927,0.23239636162090999,0.23270829035119214,0.2330202643728677,0.23333228375983606,0.23364434858606442,0.23395645892558753,0.23426861485250788,0.2345808164409963,0.2348930637652915,0.23520535689970076,0.23551769591859953,0.23583008089643206,0.23614251190771124,0.23645498902701895,0.23676751232900614,0.23708008188839266,0.2373926977799681,0.23770536007859142,0.2380180688591909,0.23833082419676505,0.23864362616638218,0.23895647484318044,0.2392693703023687,0.23958231261922555,0.2398953018691009,0.24020833812741474,0.24052142146965816,0.24083455197139317,0.24114772970825304,0.24146095475594226,0.2417742271902367,0.24208754708698396,0.24240091452210324,0.2427143295715859,0.24302779231149504,0.24334130281796632,0.24365486116720736,0.24396846743549888,0.24428212169919372,0.24459582403471783,0.24490957451857018,0.24522337322732282,0.245537220237621,0.24585111562618372,0.24616505946980327,0.24647905184534602,0.246793092829752,0.24710718250003552,0.24742132093328514,0.2477355082066635,0.2480497443974085,0.24836402958283202,0.24867836384032127,0.24899274724733847,0.24930717988142084,0.24962166182018108,0.24993619314130752,0.250250773922564,0.2505654042417906,0.2508800841769026,0.25119481380589254,0.2515095932068283,0.25182442245785486,0.2521393016371937,0.2524542308231431,0.25276921009407843,0.2530842395284519,0.25339931920479364,0.2537144492017106,0.2540296295978877,0.2543448604720878,0.2546601419031516,0.25497547396999776,0.25529085675162355,0.2556062903271047,0.25592177477559525,0.25623731017632856,0.2565528966086165,0.2568685341518504,0.25718422288550075,0.2574999628891178,0.2578157542423307,0.2581315970248497,0.25844749131646383,0.2587634371970429,0.25907943474653694,0.2593954840449766,0.2597115851724729,0.26002773820921793,0.2603439432354849,0.260660200331628,0.2609765095780829,0.26129287105536686,0.2616092848440788,0.26192575102489946,0.26224226967859166,0.26255884088600073,0.26287546472805395,0.2631921412857616,0.2635088706402166,0.26382565287259446,0.2641424880641545,0.2644593762962387,0.26477631765027293,0.2650933122077665,0.2654103600503125,0.26572746125958824,0.266044615917355,0.2663618241054587,0.2666790859058294,0.26699640140048225,0.26731377067151696,0.2676311938011189,0.26794867087155794,0.26826620196519,0.26858378716445636,0.26890142655188426,0.2692191202100866,0.26953686822176304,0.2698546706696988,0.2701725276367666,0.270490439205925,0.27080840546022006,0.27112642648278473,0.27144450235683903,0.2717626331656909,0.2720808189927356,0.27239905992145635,0.27271735603542435,0.2730357074182991,0.27335411415382826,0.2736725763258485,0.2739910940182849,0.27430966731515166,0.2746282963005521,0.27494698105867893,0.2752657216738144,0.2755845182303304,0.2759033708126888,0.27622227950544154,0.2765412443932311,0.2768602655607899,0.27717934309294173,0.2774984770746008,0.2778176675907725,0.27813691472655344,0.27845621856713193,0.27877557919778767,0.2790949967038923,0.2794144711709095,0.27973400268439536,0.28005359132999813,0.2803732371934588,0.28069294036061126,0.28101270091738245,0.28133251894979233,0.2816523945439546,0.2819723277860764,0.2822923187624585,0.28261236755949626,0.28293247426367873,0.28325263896158964,0.28357286173990726,0.2838931426854047,0.28421348188495016,0.28453387942550706,0.2848543353941344,0.28517484987798636,0.28549542296431346,0.28581605474046196,0.2861367452938746,0.2864574947120906,0.28677830308274543,0.2870991704935719,0.28742009703239985,0.28774108278715593,0.28806212784586493,0.28838323229664903,0.28870439622772825,0.2890256197274209,0.2893469028841434,0.28966824578641104,0.28998964852283754,0.29031111118213576,0.29063263385311755,0.2909542166246946,0.29127585958587754,0.2915975628257773,0.2919193264336047,0.29224115049867067,0.29256303511038667,0.29288498035826505,0.2932069863319185,0.2935290531210614,0.29385118081550904,0.2941733695051784,0.2944956192800883,0.29481793023035935,0.29514030244621436,0.2954627360179785,0.29578523103607973,0.2961077875910488,0.29643040577351937,0.29675308567422853,0.2970758273840167,0.2973986309938284,0.2977214965947117,0.29804442427781885,0.29836741413440676,0.29869046625583673,0.2990135807335751,0.299336757659193,0.2996599971243669,0.2999832992208792,0.30030666404061745,0.3006300916755755,0.30095358221785334,0.3012771357596573,0.3016007523933004,0.30192443221120274,0.30224817530589115,0.3025719817700001,0.3028958516962714,0.303219785177555,0.30354378230680834,0.30386784317709775,0.3041919678815975,0.30451615651359093,0.3048404091664704,0.30516472593373695,0.3054891069090017,0.305813552185985,0.3061380618585173,0.30646263602053897,0.3067872747661011,0.3071119781893652,0.30743674638460355,0.30776157944619953,0.30808647746864803,0.3084114405465554,0.3087364687746396,0.3090615622477312,0.3093867210607722,0.309711945308818,0.3100372350870361,0.3103625904907076,0.3106880116152263,0.3110134985560999,0.3113390514089495,0.3116646702695108,0.31199035523363294,0.3123161063972802,0.3126419238565313,0.31296780770757987,0.3132937580467349,0.31361977497042104,0.3139458585751783,0.3142720089576628,0.31459822621464695,0.3149245104430196,0.31525086173978645,0.31557728020206993,0.31590376592710995,0.31623031901226367,0.3165569395550063,0.31688362765293077,0.3172103834037483,0.3175372069052888,0.3178640982555008,0.318191057552452,0.318518084894329,0.31884518037943826,0.31917234410620615,0.319499576173179,0.31982687667902304,0.32015424572252565,0.32048168340259475,0.3208091898182595,0.32113676506867034,0.3214644092530994,0.32179212247094047,0.32211990482170993,0.3224477564050463,0.32277567732071066,0.3231036676685874,0.32343172754868377,0.32375985706113075,0.324088056306183,0.32441632538421933,0.32474466439574257,0.3250730734413804,0.3254015526218852,0.3257301020381344,0.32605872179113093,0.32638741198200344,0.32671617271200615,0.32704500408251996,0.327373906195052,0.32770287915123614,0.3280319230528333,0.3283610380017318,0.3286902240999473,0.3290194814496236,0.32934881015303263,0.3296782103125746,0.3300076820307785,0.3303372254103021,0.3306668405539327,0.3309965275645872,0.3313262865453121,0.33165611759928404,0.33198602082981016,0.3323159963403282,0.3326460442344072,0.33297616461574675,0.3333063575881787,0.3336366232556665,0.3339669617223054,0.33429737309232355,0.33462785747008156,0.33495841496007295,0.33528904566692475,0.33561974969539726,0.3359505271503849,0.3362813781369164,0.3366123027601544,0.33694330112539694,0.3372743733380766,0.33760551950376155,0.3379367397281555,0.3382680341170982,0.33859940277656564,0.3389308458126702,0.3392623633316613,0.3395939554399254,0.33992562224398626,0.34025736385050576,0.3405891803662835,0.34092107189825743,0.3412530385535044,0.34158508043924,0.34191719766281936,0.3422493903317367,0.34258165855362666,0.34291400243626385,0.34324642208756334,0.3435789176155809,0.34391148912851377,0.3442441367347004,0.34457686054262093,0.34490966066089784,0.34524253719829556,0.3455754902637217,0.3459085199662264,0.34624162641500367,0.34657480971939053,0.3469080699888685,0.347241407333063,0.3475748218617444,0.34790831368482766,0.34824188291237307,0.3485755296545867,0.34890925402182016,0.34924305612457174,0.3495769360734856,0.34991089397935343,0.3502449299531137,0.3505790441058526,0.3509132365488038,0.3512475073933497,0.3515818567510208,0.35191628473349656,0.35225079145260557,0.3525853770203259,0.3529200415487854,0.3532547851502624,0.3535896079371852,0.35392451002213343,0.3542594915178376,0.3545945525371798,0.35492969319319395,0.35526491359906615,0.35560021386813506,0.3559355941138921,0.35627105444998214,0.3566065949902032,0.35694221584850766,0.3572779171390018,0.3576136989759465,0.3579495614737578,0.35828550474700677,0.35862152891042015,0.3589576340788807,0.3592938203674275,0.3596300878912565,0.3599664367657202,0.36030286710632875,0.3606393790287502,0.36097597264881026,0.36131264808249347,0.361649405445943,0.36198624485546116,0.3623231664275097,0.36266017027871056,0.36299725652584536,0.3633344252858568,0.3636716766758484,0.3640090108130848,0.36434642781499244,0.36468392779915987,0.3650215108833381,0.3653591771854407,0.36569692682354454,0.3660347599158897,0.3663726765808805,0.36671067693708564,0.36704876110323775,0.36738692919823523,0.36772518134114135,0.3680635176511851,0.36840193824776213,0.3687404432504338,0.369079032778929,0.3694177069531435,0.3697564658931407,0.3700953097191521,0.37043423855157775,0.37077325251098614,0.371112351718115,0.37145153629387195,0.3717908063593338,0.37213016203574856,0.3724696034445342,0.37280913070728,0.3731487439457468,0.37348844328186753,0.37382822883774663,0.37416810073566203,0.37450805909806406,0.3748481040475769,0.37518823570699844,0.3755284541993006,0.3758687596476301,0.37620915217530876,0.3765496319058337,0.3768901989628777,0.37723085347029006,0.37757159555209663,0.37791242533250036,0.37825334293588125,0.37859434848679757,0.3789354421099856,0.3792766239303604,0.3796178940730162,0.3799592526632263,0.3803006998264444,0.3806422356883041,0.38098386037462,0.38132557401138756,0.381667376724784,0.3820092686411684,0.3823512498870824,0.3826933205892502,0.3830354808745794,0.38337773087016086,0.3837200707032702,0.38406250050136703,0.38440502039209595,0.3847476305032869,0.38509033096295586,0.38543312189930473,0.3857760034407219,0.3861189757157833,0.38646203885325187,0.3868051929820788,0.38714843823140355,0.38749177473055424,0.38783520260904847,0.38817872199659337,0.38852233302308614,0.3888660358186147,0.38920983051345764,0.3895537172380854,0.3898976961231601,0.390241767299536,0.39058593089826066,0.39093018705057414,0.391274535887911,0.3916189775418991,0.39196351214436154,0.3923081398273158,0.3926528607229756,0.39299767496375,0.3933425826822446,0.39368758401126197,0.3940326790838019,0.39437786803306213,0.39472315099243827,0.3950685280955248,0.39541399947611544,0.3957595652682035,0.39610522560598244,0.39645098062384604,0.39679683045638925,0.39714277523840874,0.39748881510490264,0.3978349501910721,0.3981811806323207,0.39852750656425573,0.3988739281226882,0.39922044544363366,0.39956705866331216,0.39991376791814937,0.4002605733447766,0.40060747508003147,0.4009544732609584,0.40130156802480904,0.40164875950904266,0.4019960478513271,0.4023434331895383,0.4026909156617623,0.40303849540629383,0.4033861725616387,0.4037339472665128,0.40408181965984363,0.4044297898807703,0.40477785806864375,0.4051260243630281,0.4054742889037002,0.40582265183065125,0.40617111328408595,0.40651967340442424,0.40686833233230096,0.407217090208567,0.407565947174289,0.40791490337075087,0.4082639589394537,0.4086131140221163,0.4089623687606754,0.40931172329728743,0.4096611777743273,0.4100107323343902,0.4103603871202919,0.41071014227506875,0.4110599979419787,0.41140995426450155,0.4117600113863399,0.41211016945141926,0.41246042860388826,0.4128107889881204,0.41316125074871335,0.41351181403049,0.41386247897849904,0.4142132457380157,0.4145641144545412,0.414915085273805,0.4152661583417639,0.4156173338046033,0.4159686118087376,0.4163199925008109,0.4166714760276971,0.4170230625365007,0.41737475217455766,0.4177265450894356,0.4180784414289344,0.41843044134108687,0.4187825449741591,0.41913475247665133,0.4194870639972983,0.41983947968506985,0.4201919996891717,0.4205446241590454,0.42089735324436967,0.42125018709506074,0.4216031258612724,0.4219561696933973,0.42230931874206706,0.4226625731581534,0.4230159330927676,0.4233693986972625,0.42372297012323196,0.4240766475225122,0.42443043104718187,0.42478432084956286,0.42513831708222083,0.4254924198979662,0.4258466294498537,0.4262009458911845,0.4265553693755051,0.4269099000566095,0.42726453808853876,0.42761928362558194,0.4279741368222767,0.42832909783341017,0.428684166814019,0.4290393439193903,0.4293946293050623,0.429750023126825,0.43010552554072035,0.4304611367030436,0.4308168567703432,0.4311726858994219,0.4315286242473371,0.4318846719714015,0.4322408292291844,0.43259709617851066,0.43295347297746334,0.43330995978438314,0.4336665567578691,0.43402326405677955,0.43438008184023275,0.43473701026760725,0.4350940494985428,0.43545119969294077,0.43580846101096493,0.4361658336130424,0.4365233176598634,0.4368809133123831,0.43723862073182107,0.4375964400796631,0.4379543715176606,0.43831241520783254,0.43867057131246556,0.4390288399941137,0.4393872214156011,0.4397457157400209,0.4401043231307365,0.44046304375138234,0.4408218777658647,0.4411808253383618,0.4415398866333253,0.44189906181548005,0.44225835104982575,0.4426177545016365,0.4429772723364629,0.4433369047201309,0.44369665181874485,0.44405651379868594,0.44441649082661416,0.44477658306946843,0.44513679069446815,0.44549711386911267,0.44585755276118305,0.4462181075387419,0.44657877837013493,0.44693956542399105,0.4473004688692235,0.44766148887503004,0.44802262561089407,0.4483838792465855,0.4487452499521609,0.4491067378979647,0.4494683432546298,0.4498300661930782,0.4501919068845217,0.45055386550046295,0.4509159422126956,0.45127813719330573,0.45164045061467206,0.4520028826494671,0.4523654334706571,0.45272810325150425,0.45309089216556575,0.4534538003866956,0.4538168280890454,0.45417997544706434,0.4545432426355008,0.4549066298294025,0.4552701372041176,0.4556337649352953,0.4559975131988867,0.4563613821711456,0.45672537202862895,0.4570894829481984,0.45745371510701976,0.45781806868256536,0.4581825438526134,0.45854714079524983,0.4589118596888687,0.4592767007121726,0.45964166404417356,0.4600067498641947,0.46037195835187034,0.4607372896871463,0.4611027440502817,0.4614683216218488,0.46183402258273515,0.4621998471141427,0.46256579539758996,0.4629318676149119,0.4632980639482621,0.4636643845801113,0.4640308296932509,0.4643973994707914,0.4647640940961652,0.46513091375312554,0.4654978586257489,0.46586492889843534,0.4662321247559092,0.46659944638321926,0.46696689396574115,0.4673344676891771,0.46770216773955664,0.4680699943032385,0.46843794756691004,0.46880602771758956,0.46917423494262583,0.46954256942970035,0.4699110313668264,0.4702796209423517,0.4706483383449587,0.4710171837636645,0.471386157387823,0.47175525940712526,0.4721244900116003,0.4724938493916161,0.4728633377378804,0.47323295524144177,0.47360270209369043,0.4739725784863588,0.47434258461152307,0.4747127206616033,0.47508298682936534,0.4754533833079204,0.47582391029072746,0.47619456797159293,0.4765653565446719,0.4769362762044699],"x":[-0.5,-0.4996665555185062,-0.49933311103701233,-0.49899966655551853,-0.49866622207402467,-0.49833277759253086,-0.497999333111037,-0.4976658886295432,-0.49733244414804934,-0.49699899966655553,-0.49666555518506167,-0.49633211070356786,-0.495998666222074,-0.4956652217405802,-0.49533177725908634,-0.49499833277759253,-0.4946648882960987,-0.49433144381460487,-0.49399799933311106,-0.4936645548516172,-0.4933311103701234,-0.49299766588862953,-0.4926642214071357,-0.49233077692564187,-0.49199733244414806,-0.4916638879626542,-0.4913304434811604,-0.49099699899966653,-0.49066355451817273,-0.49033011003667887,-0.48999666555518506,-0.48966322107369126,-0.4893297765921974,-0.4889963321107036,-0.48866288762920973,-0.4883294431477159,-0.48799599866622206,-0.48766255418472826,-0.4873291097032344,-0.4869956652217406,-0.48666222074024673,-0.4863287762587529,-0.48599533177725907,-0.48566188729576526,-0.4853284428142714,-0.4849949983327776,-0.4846615538512838,-0.4843281093697899,-0.4839946648882961,-0.48366122040680226,-0.48332777592530846,-0.4829943314438146,-0.4826608869623208,-0.48232744248082693,-0.4819939979993331,-0.48166055351783926,-0.48132710903634546,-0.4809936645548516,-0.4806602200733578,-0.48032677559186393,-0.4799933311103701,-0.4796598866288763,-0.47932644214738246,-0.47899299766588865,-0.4786595531843948,-0.478326108702901,-0.4779926642214071,-0.4776592197399133,-0.47732577525841946,-0.47699233077692565,-0.4766588862954318,-0.476325441813938,-0.47599199733244413,-0.4756585528509503,-0.47532510836945646,-0.47499166388796266,-0.4746582194064688,-0.474324774924975,-0.4739913304434812,-0.4736578859619873,-0.4733244414804935,-0.47299099699899966,-0.47265755251750585,-0.472324108036012,-0.4719906635545182,-0.4716572190730243,-0.4713237745915305,-0.47099033011003666,-0.47065688562854285,-0.470323441147049,-0.4699899966655552,-0.4696565521840613,-0.4693231077025675,-0.4689896632210737,-0.46865621873957986,-0.46832277425808605,-0.4679893297765922,-0.4676558852950984,-0.4673224408136045,-0.4669889963321107,-0.46665555185061686,-0.46632210736912305,-0.4659886628876292,-0.4656552184061354,-0.4653217739246415,-0.4649883294431477,-0.46465488496165386,-0.46432144048016005,-0.46398799599866625,-0.4636545515171724,-0.4633211070356786,-0.4629876625541847,-0.4626542180726909,-0.46232077359119705,-0.46198732910970325,-0.4616538846282094,-0.4613204401467156,-0.4609869956652217,-0.4606535511837279,-0.46032010670223406,-0.45998666222074025,-0.4596532177392464,-0.4593197732577526,-0.4589863287762588,-0.4586528842947649,-0.4583194398132711,-0.45798599533177725,-0.45765255085028345,-0.4573191063687896,-0.4569856618872958,-0.4566522174058019,-0.4563187729243081,-0.45598532844281425,-0.45565188396132045,-0.4553184394798266,-0.4549849949983328,-0.4546515505168389,-0.4543181060353451,-0.4539846615538513,-0.45365121707235745,-0.45331777259086364,-0.4529843281093698,-0.452650883627876,-0.4523174391463821,-0.4519839946648883,-0.45165055018339445,-0.45131710570190064,-0.4509836612204068,-0.450650216738913,-0.4503167722574191,-0.4499833277759253,-0.44964988329443145,-0.44931643881293765,-0.44898299433144384,-0.44864954984995,-0.4483161053684562,-0.4479826608869623,-0.4476492164054685,-0.44731577192397465,-0.44698232744248084,-0.446648882960987,-0.4463154384794932,-0.4459819939979993,-0.4456485495165055,-0.44531510503501165,-0.44498166055351784,-0.444648216072024,-0.4443147715905302,-0.44398132710903637,-0.4436478826275425,-0.4433144381460487,-0.44298099366455485,-0.44264754918306104,-0.4423141047015672,-0.4419806602200734,-0.4416472157385795,-0.4413137712570857,-0.44098032677559185,-0.44064688229409804,-0.4403134378126042,-0.4399799933311104,-0.4396465488496165,-0.4393131043681227,-0.4389796598866289,-0.43864621540513504,-0.43831277092364124,-0.4379793264421474,-0.43764588196065357,-0.4373124374791597,-0.4369789929976659,-0.43664554851617204,-0.43631210403467824,-0.4359786595531844,-0.4356452150716906,-0.4353117705901967,-0.4349783261087029,-0.43464488162720905,-0.43431143714571524,-0.43397799266422143,-0.4336445481827276,-0.43331110370123377,-0.4329776592197399,-0.4326442147382461,-0.43231077025675224,-0.43197732577525844,-0.4316438812937646,-0.43131043681227077,-0.4309769923307769,-0.4306435478492831,-0.43031010336778924,-0.42997665888629544,-0.4296432144048016,-0.42930976992330777,-0.4289763254418139,-0.4286428809603201,-0.4283094364788263,-0.42797599199733244,-0.42764254751583863,-0.4273091030343448,-0.42697565855285097,-0.4266422140713571,-0.4263087695898633,-0.42597532510836944,-0.42564188062687563,-0.4253084361453818,-0.42497499166388797,-0.4246415471823941,-0.4243081027009003,-0.42397465821940644,-0.42364121373791264,-0.42330776925641883,-0.42297432477492497,-0.42264088029343116,-0.4223074358119373,-0.4219739913304435,-0.42164054684894964,-0.42130710236745583,-0.42097365788596197,-0.42064021340446817,-0.4203067689229743,-0.4199733244414805,-0.41963987995998664,-0.41930643547849283,-0.418972990996999,-0.41863954651550517,-0.41830610203401136,-0.4179726575525175,-0.4176392130710237,-0.41730576858952984,-0.41697232410803603,-0.41663887962654217,-0.41630543514504836,-0.4159719906635545,-0.4156385461820607,-0.41530510170056684,-0.41497165721907303,-0.41463821273757917,-0.41430476825608537,-0.4139713237745915,-0.4136378792930977,-0.4133044348116039,-0.41297099033011003,-0.4126375458486162,-0.41230410136712237,-0.41197065688562856,-0.4116372124041347,-0.4113037679226409,-0.41097032344114703,-0.41063687895965323,-0.41030343447815937,-0.40996998999666556,-0.4096365455151717,-0.4093031010336779,-0.40896965655218404,-0.40863621207069023,-0.4083027675891964,-0.40796932310770256,-0.40763587862620876,-0.4073024341447149,-0.4069689896632211,-0.40663554518172723,-0.4063021007002334,-0.40596865621873957,-0.40563521173724576,-0.4053017672557519,-0.4049683227742581,-0.40463487829276423,-0.4043014338112704,-0.40396798932977657,-0.40363454484828276,-0.40330110036678896,-0.4029676558852951,-0.4026342114038013,-0.40230076692230743,-0.4019673224408136,-0.40163387795931976,-0.40130043347782596,-0.4009669889963321,-0.4006335445148383,-0.40030010003334443,-0.3999666555518506,-0.39963321107035676,-0.39929976658886296,-0.3989663221073691,-0.3986328776258753,-0.3982994331443815,-0.3979659886628876,-0.3976325441813938,-0.39729909969989996,-0.39696565521840615,-0.3966322107369123,-0.3962987662554185,-0.39596532177392463,-0.3956318772924308,-0.39529843281093696,-0.39496498832944316,-0.3946315438479493,-0.3942980993664555,-0.39396465488496163,-0.3936312104034678,-0.393297765921974,-0.39296432144048016,-0.39263087695898635,-0.3922974324774925,-0.3919639879959987,-0.3916305435145048,-0.391297099033011,-0.39096365455151716,-0.39063021007002335,-0.3902967655885295,-0.3899633211070357,-0.3896298766255418,-0.389296432144048,-0.38896298766255416,-0.38862954318106036,-0.38829609869956655,-0.3879626542180727,-0.3876292097365789,-0.387295765255085,-0.3869623207735912,-0.38662887629209736,-0.38629543181060355,-0.3859619873291097,-0.3856285428476159,-0.385295098366122,-0.3849616538846282,-0.38462820940313436,-0.38429476492164055,-0.3839613204401467,-0.3836278759586529,-0.383294431477159,-0.3829609869956652,-0.3826275425141714,-0.38229409803267755,-0.38196065355118375,-0.3816272090696899,-0.3812937645881961,-0.3809603201067022,-0.3806268756252084,-0.38029343114371456,-0.37995998666222075,-0.3796265421807269,-0.3792930976992331,-0.3789596532177392,-0.3786262087362454,-0.37829276425475156,-0.37795931977325775,-0.37762587529176395,-0.3772924308102701,-0.3769589863287763,-0.3766255418472824,-0.3762920973657886,-0.37595865288429475,-0.37562520840280095,-0.3752917639213071,-0.3749583194398133,-0.3746248749583194,-0.3742914304768256,-0.37395798599533175,-0.37362454151383795,-0.3732910970323441,-0.3729576525508503,-0.3726242080693565,-0.3722907635878626,-0.3719573191063688,-0.37162387462487495,-0.37129043014338114,-0.3709569856618873,-0.3706235411803935,-0.3702900966988996,-0.3699566522174058,-0.36962320773591195,-0.36928976325441815,-0.3689563187729243,-0.3686228742914305,-0.3682894298099366,-0.3679559853284428,-0.367622540846949,-0.36728909636545515,-0.36695565188396134,-0.3666222074024675,-0.3662887629209737,-0.3659553184394798,-0.365621873957986,-0.36528842947649215,-0.36495498499499834,-0.3646215405135045,-0.3642880960320107,-0.3639546515505168,-0.363621207069023,-0.36328776258752915,-0.36295431810603535,-0.36262087362454154,-0.3622874291430477,-0.3619539846615539,-0.36162054018006,-0.3612870956985662,-0.36095365121707235,-0.36062020673557854,-0.3602867622540847,-0.3599533177725909,-0.359619873291097,-0.3592864288096032,-0.35895298432810935,-0.35861953984661554,-0.3582860953651217,-0.3579526508836279,-0.35761920640213407,-0.3572857619206402,-0.3569523174391464,-0.35661887295765254,-0.35628542847615874,-0.3559519839946649,-0.3556185395131711,-0.3552850950316772,-0.3549516505501834,-0.35461820606868955,-0.35428476158719574,-0.3539513171057019,-0.3536178726242081,-0.3532844281427142,-0.3529509836612204,-0.3526175391797266,-0.35228409469823274,-0.35195065021673894,-0.3516172057352451,-0.35128376125375127,-0.3509503167722574,-0.3506168722907636,-0.35028342780926974,-0.34994998332777594,-0.3496165388462821,-0.34928309436478827,-0.3489496498832944,-0.3486162054018006,-0.34828276092030674,-0.34794931643881294,-0.34761587195731913,-0.3472824274758253,-0.34694898299433147,-0.3466155385128376,-0.3462820940313438,-0.34594864954984994,-0.34561520506835613,-0.3452817605868623,-0.34494831610536847,-0.3446148716238746,-0.3442814271423808,-0.34394798266088694,-0.34361453817939314,-0.3432810936978993,-0.34294764921640547,-0.34261420473491166,-0.3422807602534178,-0.341947315771924,-0.34161387129043014,-0.34128042680893633,-0.34094698232744247,-0.34061353784594867,-0.3402800933644548,-0.339946648882961,-0.33961320440146714,-0.33927975991997333,-0.3389463154384795,-0.33861287095698567,-0.3382794264754918,-0.337945981993998,-0.33761253751250414,-0.33727909303101034,-0.33694564854951653,-0.33661220406802267,-0.33627875958652886,-0.335945315105035,-0.3356118706235412,-0.33527842614204734,-0.33494498166055353,-0.33461153717905967,-0.33427809269756587,-0.333944648216072,-0.3336112037345782,-0.33327775925308434,-0.33294431477159053,-0.33261087029009667,-0.33227742580860287,-0.33194398132710906,-0.3316105368456152,-0.3312770923641214,-0.33094364788262753,-0.33061020340113373,-0.33027675891963987,-0.32994331443814606,-0.3296098699566522,-0.3292764254751584,-0.32894298099366454,-0.32860953651217073,-0.32827609203067687,-0.32794264754918306,-0.3276092030676892,-0.3272757585861954,-0.3269423141047016,-0.32660886962320773,-0.3262754251417139,-0.32594198066022007,-0.32560853617872626,-0.3252750916972324,-0.3249416472157386,-0.32460820273424473,-0.3242747582527509,-0.32394131377125707,-0.32360786928976326,-0.3232744248082694,-0.3229409803267756,-0.32260753584528173,-0.32227409136378793,-0.3219406468822941,-0.32160720240080026,-0.32127375791930646,-0.3209403134378126,-0.3206068689563188,-0.32027342447482493,-0.3199399799933311,-0.31960653551183726,-0.31927309103034346,-0.3189396465488496,-0.3186062020673558,-0.31827275758586193,-0.3179393131043681,-0.31760586862287427,-0.31727242414138046,-0.31693897965988665,-0.3166055351783928,-0.316272090696899,-0.31593864621540513,-0.3156052017339113,-0.31527175725241746,-0.31493831277092366,-0.3146048682894298,-0.314271423807936,-0.31393797932644213,-0.3136045348449483,-0.31327109036345446,-0.31293764588196066,-0.3126042014004668,-0.312270756918973,-0.3119373124374792,-0.3116038679559853,-0.3112704234744915,-0.31093697899299766,-0.31060353451150385,-0.31027009003001,-0.3099366455485162,-0.3096032010670223,-0.3092697565855285,-0.30893631210403466,-0.30860286762254086,-0.308269423141047,-0.3079359786595532,-0.30760253417805933,-0.3072690896965655,-0.3069356452150717,-0.30660220073357786,-0.30626875625208405,-0.3059353117705902,-0.3056018672890964,-0.3052684228076025,-0.3049349783261087,-0.30460153384461486,-0.30426808936312105,-0.3039346448816272,-0.3036012004001334,-0.3032677559186395,-0.3029343114371457,-0.30260086695565186,-0.30226742247415805,-0.30193397799266425,-0.3016005335111704,-0.3012670890296766,-0.3009336445481827,-0.3006002000666889,-0.30026675558519506,-0.29993331110370125,-0.2995998666222074,-0.2992664221407136,-0.2989329776592197,-0.2985995331777259,-0.29826608869623206,-0.29793264421473825,-0.2975991997332444,-0.2972657552517506,-0.2969323107702568,-0.2965988662887629,-0.2962654218072691,-0.29593197732577525,-0.29559853284428145,-0.2952650883627876,-0.2949316438812938,-0.2945981993997999,-0.2942647549183061,-0.29393131043681225,-0.29359786595531845,-0.2932644214738246,-0.2929309769923308,-0.2925975325108369,-0.2922640880293431,-0.29193064354784926,-0.29159719906635545,-0.29126375458486164,-0.2909303101033678,-0.290596865621874,-0.2902634211403801,-0.2899299766588863,-0.28959653217739245,-0.28926308769589865,-0.2889296432144048,-0.288596198732911,-0.2882627542514171,-0.2879293097699233,-0.28759586528842945,-0.28726242080693565,-0.2869289763254418,-0.286595531843948,-0.2862620873624542,-0.2859286428809603,-0.2855951983994665,-0.28526175391797265,-0.28492830943647884,-0.284594864954985,-0.2842614204734912,-0.2839279759919973,-0.2835945315105035,-0.28326108702900965,-0.28292764254751585,-0.282594198066022,-0.2822607535845282,-0.2819273091030343,-0.2815938646215405,-0.2812604201400467,-0.28092697565855285,-0.28059353117705904,-0.2802600866955652,-0.2799266422140714,-0.2795931977325775,-0.2792597532510837,-0.27892630876958985,-0.27859286428809604,-0.2782594198066022,-0.2779259753251084,-0.2775925308436145,-0.2772590863621207,-0.27692564188062685,-0.27659219739913304,-0.27625875291763924,-0.2759253084361454,-0.2755918639546516,-0.2752584194731577,-0.2749249749916639,-0.27459153051017005,-0.27425808602867624,-0.2739246415471824,-0.2735911970656886,-0.2732577525841947,-0.2729243081027009,-0.27259086362120705,-0.27225741913971324,-0.2719239746582194,-0.2715905301767256,-0.27125708569523177,-0.2709236412137379,-0.2705901967322441,-0.27025675225075024,-0.26992330776925644,-0.2695898632877626,-0.26925641880626877,-0.2689229743247749,-0.2685895298432811,-0.26825608536178724,-0.26792264088029344,-0.2675891963987996,-0.2672557519173058,-0.2669223074358119,-0.2665888629543181,-0.2662554184728243,-0.26592197399133044,-0.26558852950983663,-0.2652550850283428,-0.26492164054684897,-0.2645881960653551,-0.2642547515838613,-0.26392130710236744,-0.26358786262087364,-0.2632544181393798,-0.26292097365788597,-0.2625875291763921,-0.2622540846948983,-0.26192064021340444,-0.26158719573191064,-0.26125375125041683,-0.26092030676892297,-0.26058686228742917,-0.2602534178059353,-0.2599199733244415,-0.25958652884294764,-0.25925308436145383,-0.25891963987996,-0.25858619539846617,-0.2582527509169723,-0.2579193064354785,-0.25758586195398464,-0.25725241747249084,-0.256918972990997,-0.25658552850950317,-0.25625208402800936,-0.2559186395465155,-0.2555851950650217,-0.25525175058352784,-0.25491830610203403,-0.25458486162054017,-0.25425141713904637,-0.2539179726575525,-0.2535845281760587,-0.25325108369456484,-0.25291763921307103,-0.25258419473157717,-0.25225075025008337,-0.2519173057685895,-0.2515838612870957,-0.2512504168056019,-0.25091697232410803,-0.25058352784261423,-0.25025008336112037,-0.24991663887962653,-0.2495831943981327,-0.24924974991663887,-0.24891630543514504,-0.24858286095365123,-0.2482494164721574,-0.24791597199066356,-0.24758252750916973,-0.2472490830276759,-0.24691563854618206,-0.24658219406468823,-0.2462487495831944,-0.24591530510170057,-0.24558186062020673,-0.2452484161387129,-0.24491497165721907,-0.24458152717572523,-0.2442480826942314,-0.24391463821273757,-0.24358119373124376,-0.24324774924974993,-0.2429143047682561,-0.24258086028676226,-0.24224741580526843,-0.2419139713237746,-0.24158052684228076,-0.24124708236078693,-0.2409136378792931,-0.24058019339779926,-0.24024674891630543,-0.2399133044348116,-0.23957985995331776,-0.23924641547182393,-0.2389129709903301,-0.23857952650883626,-0.23824608202734246,-0.23791263754584863,-0.2375791930643548,-0.23724574858286096,-0.23691230410136713,-0.2365788596198733,-0.23624541513837946,-0.23591197065688563,-0.2355785261753918,-0.23524508169389796,-0.23491163721240413,-0.2345781927309103,-0.23424474824941646,-0.23391130376792263,-0.2335778592864288,-0.233244414804935,-0.23291097032344116,-0.23257752584194732,-0.2322440813604535,-0.23191063687895966,-0.23157719239746583,-0.231243747915972,-0.23091030343447816,-0.23057685895298433,-0.2302434144714905,-0.22990996998999666,-0.22957652550850283,-0.229243081027009,-0.22890963654551516,-0.22857619206402133,-0.22824274758252752,-0.2279093031010337,-0.22757585861953986,-0.22724241413804602,-0.2269089696565522,-0.22657552517505836,-0.22624208069356452,-0.2259086362120707,-0.22557519173057686,-0.22524174724908302,-0.2249083027675892,-0.22457485828609536,-0.22424141380460152,-0.2239079693231077,-0.22357452484161386,-0.22324108036012005,-0.22290763587862622,-0.2225741913971324,-0.22224074691563855,-0.22190730243414472,-0.2215738579526509,-0.22124041347115705,-0.22090696898966322,-0.2205735245081694,-0.22024008002667556,-0.21990663554518172,-0.2195731910636879,-0.21923974658219406,-0.21890630210070022,-0.2185728576192064,-0.21823941313771258,-0.21790596865621875,-0.21757252417472492,-0.21723907969323109,-0.21690563521173725,-0.21657219073024342,-0.21623874624874959,-0.21590530176725575,-0.21557185728576192,-0.2152384128042681,-0.21490496832277425,-0.21457152384128042,-0.2142380793597866,-0.21390463487829275,-0.21357119039679892,-0.2132377459153051,-0.21290430143381128,-0.21257085695231745,-0.21223741247082362,-0.21190396798932978,-0.21157052350783595,-0.21123707902634212,-0.21090363454484828,-0.21057019006335445,-0.21023674558186062,-0.20990330110036678,-0.20956985661887295,-0.20923641213737912,-0.20890296765588529,-0.20856952317439145,-0.20823607869289762,-0.20790263421140381,-0.20756918972990998,-0.20723574524841615,-0.20690230076692231,-0.20656885628542848,-0.20623541180393465,-0.20590196732244082,-0.20556852284094698,-0.20523507835945315,-0.20490163387795932,-0.20456818939646548,-0.20423474491497165,-0.20390130043347782,-0.20356785595198398,-0.20323441147049015,-0.20290096698899635,-0.2025675225075025,-0.20223407802600868,-0.20190063354451485,-0.201567189063021,-0.20123374458152718,-0.20090030010003335,-0.2005668556185395,-0.20023341113704568,-0.19989996665555185,-0.19956652217405801,-0.19923307769256418,-0.19889963321107035,-0.19856618872957651,-0.19823274424808268,-0.19789929976658888,-0.19756585528509504,-0.1972324108036012,-0.19689896632210738,-0.19656552184061354,-0.1962320773591197,-0.19589863287762588,-0.19556518839613204,-0.1952317439146382,-0.19489829943314438,-0.19456485495165055,-0.1942314104701567,-0.19389796598866288,-0.19356452150716905,-0.1932310770256752,-0.19289763254418138,-0.19256418806268757,-0.19223074358119374,-0.1918972990996999,-0.19156385461820608,-0.19123041013671224,-0.1908969656552184,-0.19056352117372458,-0.19023007669223074,-0.1898966322107369,-0.18956318772924308,-0.18922974324774924,-0.1888962987662554,-0.18856285428476158,-0.18822940980326774,-0.1878959653217739,-0.1875625208402801,-0.18722907635878627,-0.18689563187729244,-0.1865621873957986,-0.18622874291430477,-0.18589529843281094,-0.1855618539513171,-0.18522840946982327,-0.18489496498832944,-0.1845615205068356,-0.18422807602534177,-0.18389463154384794,-0.1835611870623541,-0.18322774258086028,-0.18289429809936644,-0.18256085361787264,-0.1822274091363788,-0.18189396465488497,-0.18156052017339114,-0.1812270756918973,-0.18089363121040347,-0.18056018672890964,-0.1802267422474158,-0.17989329776592197,-0.17955985328442814,-0.1792264088029343,-0.17889296432144047,-0.17855951983994664,-0.1782260753584528,-0.17789263087695897,-0.17755918639546517,-0.17722574191397134,-0.1768922974324775,-0.17655885295098367,-0.17622540846948984,-0.175891963987996,-0.17555851950650217,-0.17522507502500834,-0.1748916305435145,-0.17455818606202067,-0.17422474158052684,-0.173891297099033,-0.17355785261753917,-0.17322440813604534,-0.1728909636545515,-0.1725575191730577,-0.17222407469156387,-0.17189063021007003,-0.1715571857285762,-0.17122374124708237,-0.17089029676558853,-0.1705568522840947,-0.17022340780260087,-0.16988996332110703,-0.1695565188396132,-0.16922307435811937,-0.16888962987662554,-0.1685561853951317,-0.16822274091363787,-0.16788929643214404,-0.1675558519506502,-0.1672224074691564,-0.16688896298766256,-0.16655551850616873,-0.1662220740246749,-0.16588862954318107,-0.16555518506168723,-0.1652217405801934,-0.16488829609869957,-0.16455485161720573,-0.1642214071357119,-0.16388796265421807,-0.16355451817272423,-0.1632210736912304,-0.16288762920973657,-0.16255418472824273,-0.16222074024674893,-0.1618872957652551,-0.16155385128376126,-0.16122040680226743,-0.1608869623207736,-0.16055351783927976,-0.16022007335778593,-0.1598866288762921,-0.15955318439479826,-0.15921973991330443,-0.1588862954318106,-0.15855285095031676,-0.15821940646882293,-0.1578859619873291,-0.15755251750583527,-0.15721907302434146,-0.15688562854284763,-0.1565521840613538,-0.15621873957985996,-0.15588529509836613,-0.1555518506168723,-0.15521840613537846,-0.15488496165388463,-0.1545515171723908,-0.15421807269089696,-0.15388462820940313,-0.1535511837279093,-0.15321773924641546,-0.15288429476492163,-0.1525508502834278,-0.152217405801934,-0.15188396132044016,-0.15155051683894633,-0.1512170723574525,-0.15088362787595866,-0.15055018339446483,-0.150216738912971,-0.14988329443147716,-0.14954984994998333,-0.1492164054684895,-0.14888296098699566,-0.14854951650550183,-0.148216072024008,-0.14788262754251416,-0.14754918306102033,-0.1472157385795265,-0.1468822940980327,-0.14654884961653886,-0.14621540513504502,-0.1458819606535512,-0.14554851617205736,-0.14521507169056352,-0.1448816272090697,-0.14454818272757586,-0.14421473824608202,-0.1438812937645882,-0.14354784928309436,-0.14321440480160053,-0.1428809603201067,-0.14254751583861286,-0.14221407135711903,-0.14188062687562522,-0.1415471823941314,-0.14121373791263755,-0.14088029343114372,-0.1405468489496499,-0.14021340446815606,-0.13987995998666222,-0.1395465155051684,-0.13921307102367456,-0.13887962654218072,-0.1385461820606869,-0.13821273757919306,-0.13787929309769922,-0.1375458486162054,-0.13721240413471156,-0.13687895965321775,-0.13654551517172392,-0.13621207069023009,-0.13587862620873625,-0.13554518172724242,-0.1352117372457486,-0.13487829276425475,-0.13454484828276092,-0.1342114038012671,-0.13387795931977325,-0.13354451483827942,-0.1332110703567856,-0.13287762587529175,-0.13254418139379792,-0.1322107369123041,-0.13187729243081028,-0.13154384794931645,-0.13121040346782262,-0.13087695898632878,-0.13054351450483495,-0.13021007002334112,-0.12987662554184728,-0.12954318106035345,-0.12920973657885962,-0.12887629209736579,-0.12854284761587195,-0.12820940313437812,-0.1278759586528843,-0.12754251417139045,-0.12720906968989662,-0.12687562520840281,-0.12654218072690898,-0.12620873624541515,-0.12587529176392132,-0.12554184728242748,-0.12520840280093365,-0.12487495831943982,-0.12454151383794598,-0.12420806935645215,-0.12387462487495832,-0.12354118039346448,-0.12320773591197065,-0.12287429143047683,-0.122540846948983,-0.12220740246748917,-0.12187395798599533,-0.1215405135045015,-0.12120706902300767,-0.12087362454151383,-0.12054018006002001,-0.12020673557852618,-0.11987329109703235,-0.11953984661553851,-0.11920640213404468,-0.11887295765255085,-0.11853951317105701,-0.11820606868956318,-0.11787262420806936,-0.11753917972657553,-0.1172057352450817,-0.11687229076358786,-0.11653884628209403,-0.1162054018006002,-0.11587195731910636,-0.11553851283761253,-0.11520506835611871,-0.11487162387462488,-0.11453817939313105,-0.11420473491163721,-0.11387129043014338,-0.11353784594864955,-0.11320440146715571,-0.1128709569856619,-0.11253751250416806,-0.11220406802267423,-0.1118706235411804,-0.11153717905968656,-0.11120373457819273,-0.1108702900966989,-0.11053684561520506,-0.11020340113371124,-0.10986995665221741,-0.10953651217072358,-0.10920306768922974,-0.10886962320773591,-0.10853617872624208,-0.10820273424474824,-0.10786928976325441,-0.10753584528176059,-0.10720240080026676,-0.10686895631877293,-0.10653551183727909,-0.10620206735578526,-0.10586862287429143,-0.1055351783927976,-0.10520173391130377,-0.10486828942980994,-0.10453484494831611,-0.10420140046682227,-0.10386795598532844,-0.10353451150383461,-0.10320106702234078,-0.10286762254084694,-0.10253417805935312,-0.10220073357785929,-0.10186728909636546,-0.10153384461487162,-0.10120040013337779,-0.10086695565188396,-0.10053351117039012,-0.1002000666888963,-0.09986662220740247,-0.09953317772590864,-0.0991997332444148,-0.09886628876292097,-0.09853284428142714,-0.0981993997999333,-0.09786595531843947,-0.09753251083694565,-0.09719906635545182,-0.09686562187395799,-0.09653217739246416,-0.09619873291097032,-0.09586528842947649,-0.09553184394798266,-0.09519839946648882,-0.094864954984995,-0.09453151050350117,-0.09419806602200734,-0.0938646215405135,-0.09353117705901967,-0.09319773257752584,-0.092864288096032,-0.09253084361453819,-0.09219739913304435,-0.09186395465155052,-0.09153051017005669,-0.09119706568856285,-0.09086362120706902,-0.09053017672557519,-0.09019673224408135,-0.08986328776258753,-0.0895298432810937,-0.08919639879959987,-0.08886295431810604,-0.0885295098366122,-0.08819606535511837,-0.08786262087362454,-0.08752917639213072,-0.08719573191063688,-0.08686228742914305,-0.08652884294764922,-0.08619539846615538,-0.08586195398466155,-0.08552850950316772,-0.08519506502167389,-0.08486162054018007,-0.08452817605868623,-0.0841947315771924,-0.08386128709569857,-0.08352784261420473,-0.0831943981327109,-0.08286095365121707,-0.08252750916972323,-0.08219406468822942,-0.08186062020673558,-0.08152717572524175,-0.08119373124374792,-0.08086028676225408,-0.08052684228076025,-0.08019339779926642,-0.0798599533177726,-0.07952650883627876,-0.07919306435478493,-0.0788596198732911,-0.07852617539179726,-0.07819273091030343,-0.0778592864288096,-0.07752584194731577,-0.07719239746582195,-0.07685895298432811,-0.07652550850283428,-0.07619206402134045,-0.07585861953984661,-0.07552517505835278,-0.07519173057685895,-0.07485828609536513,-0.0745248416138713,-0.07419139713237746,-0.07385795265088363,-0.0735245081693898,-0.07319106368789596,-0.07285761920640213,-0.0725241747249083,-0.07219073024341448,-0.07185728576192064,-0.07152384128042681,-0.07119039679893298,-0.07085695231743915,-0.07052350783594531,-0.07019006335445148,-0.06985661887295765,-0.06952317439146383,-0.06918972990997,-0.06885628542847616,-0.06852284094698233,-0.0681893964654885,-0.06785595198399466,-0.06752250750250083,-0.06718906302100701,-0.06685561853951318,-0.06652217405801934,-0.06618872957652551,-0.06585528509503168,-0.06552184061353784,-0.06518839613204401,-0.06485495165055018,-0.06452150716905636,-0.06418806268756252,-0.06385461820606869,-0.06352117372457486,-0.06318772924308103,-0.06285428476158719,-0.06252084028009336,-0.06218739579859953,-0.0618539513171057,-0.061520506835611874,-0.06118706235411804,-0.06085361787262421,-0.060520173391130375,-0.06018672890963655,-0.059853284428142715,-0.05951983994664888,-0.05918639546515505,-0.05885295098366122,-0.05851950650216739,-0.05818606202067356,-0.057852617539179724,-0.0575191730576859,-0.057185728576192064,-0.05685228409469823,-0.0565188396132044,-0.05618539513171057,-0.05585195065021674,-0.055518506168722906,-0.05518506168722908,-0.05485161720573525,-0.054518172724241414,-0.05418472824274758,-0.053851283761253754,-0.05351783927975992,-0.05318439479826609,-0.052850950316772255,-0.05251750583527843,-0.052184061353784596,-0.05185061687229076,-0.05151717239079693,-0.0511837279093031,-0.05085028342780927,-0.05051683894631544,-0.050183394464821604,-0.04984994998332778,-0.049516505501833945,-0.04918306102034011,-0.048849616538846286,-0.04851617205735245,-0.04818272757585862,-0.047849283094364786,-0.04751583861287096,-0.04718239413137713,-0.046848949649883294,-0.04651550516838946,-0.046182060686895635,-0.0458486162054018,-0.04551517172390797,-0.045181727242414135,-0.04484828276092031,-0.044514838279426476,-0.04418139379793264,-0.04384794931643881,-0.043514504834944984,-0.04318106035345115,-0.04284761587195732,-0.042514171390463484,-0.04218072690896966,-0.041847282427475825,-0.04151383794598199,-0.041180393464488166,-0.04084694898299433,-0.0405135045015005,-0.04018006002000667,-0.03984661553851284,-0.03951317105701901,-0.039179726575525174,-0.03884628209403134,-0.038512837612537515,-0.03817939313104368,-0.03784594864954985,-0.037512504168056016,-0.03717905968656219,-0.036845615205068356,-0.03651217072357452,-0.03617872624208069,-0.035845281760586864,-0.03551183727909303,-0.0351783927975992,-0.03484494831610537,-0.03451150383461154,-0.034178059353117705,-0.03384461487162387,-0.033511170390130046,-0.03317772590863621,-0.03284428142714238,-0.03251083694564855,-0.03217739246415472,-0.03184394798266089,-0.031510503501167055,-0.031177059019673225,-0.030843614538179392,-0.030510170056685562,-0.03017672557519173,-0.0298432810936979,-0.029509836612204066,-0.029176392130710237,-0.028842947649216407,-0.028509503167722574,-0.028176058686228744,-0.02784261420473491,-0.02750916972324108,-0.02717572524174725,-0.02684228076025342,-0.026508836278759586,-0.026175391797265756,-0.025841947315771923,-0.025508502834278093,-0.02517505835278426,-0.02484161387129043,-0.024508169389796598,-0.024174724908302768,-0.023841280426808935,-0.023507835945315105,-0.023174391463821272,-0.022840946982327442,-0.022507502500833613,-0.02217405801933978,-0.02184061353784595,-0.021507169056352117,-0.021173724574858287,-0.020840280093364454,-0.020506835611870625,-0.02017339113037679,-0.019839946648882962,-0.01950650216738913,-0.0191730576858953,-0.018839613204401466,-0.018506168722907636,-0.018172724241413803,-0.017839279759919974,-0.01750583527842614,-0.01717239079693231,-0.016838946315438478,-0.016505501833944648,-0.01617205735245082,-0.015838612870956986,-0.015505168389463154,-0.015171723907969323,-0.014838279426475491,-0.01450483494498166,-0.014171390463487829,-0.013837945981993997,-0.013504501500500166,-0.013171057019006335,-0.012837612537512505,-0.012504168056018674,-0.012170723574524842,-0.011837279093031011,-0.01150383461153718,-0.011170390130043348,-0.010836945648549517,-0.010503501167055685,-0.010170056685561854,-0.009836612204068023,-0.009503167722574191,-0.00916972324108036,-0.008836278759586529,-0.008502834278092697,-0.008169389796598866,-0.007835945315105034,-0.007502500833611204,-0.007169056352117373,-0.006835611870623541,-0.00650216738912971,-0.0061687229076358785,-0.005835278426142047,-0.005501833944648216,-0.005168389463154384,-0.004834944981660554,-0.004501500500166723,-0.004168056018672891,-0.00383461153717906,-0.0035011670556852285,-0.003167722574191397,-0.0028342780926975657,-0.0025008336112037344,-0.0021673891297099034,-0.001833944648216072,-0.0015005001667222407,-0.0011670556852284096,-0.0008336112037345782,-0.0005001667222407469,-0.00016672224074691563,0.00016672224074691563,0.0005001667222407469,0.0008336112037345782,0.0011670556852284096,0.0015005001667222407,0.001833944648216072,0.0021673891297099034,0.0025008336112037344,0.0028342780926975657,0.003167722574191397,0.0035011670556852285,0.00383461153717906,0.004168056018672891,0.004501500500166723,0.004834944981660554,0.005168389463154384,0.005501833944648216,0.005835278426142047,0.0061687229076358785,0.00650216738912971,0.006835611870623541,0.007169056352117373,0.007502500833611204,0.007835945315105034,0.008169389796598866,0.008502834278092697,0.008836278759586529,0.00916972324108036,0.009503167722574191,0.009836612204068023,0.010170056685561854,0.010503501167055685,0.010836945648549517,0.011170390130043348,0.01150383461153718,0.011837279093031011,0.012170723574524842,0.012504168056018674,0.012837612537512505,0.013171057019006335,0.013504501500500166,0.013837945981993997,0.014171390463487829,0.01450483494498166,0.014838279426475491,0.015171723907969323,0.015505168389463154,0.015838612870956986,0.01617205735245082,0.016505501833944648,0.016838946315438478,0.01717239079693231,0.01750583527842614,0.017839279759919974,0.018172724241413803,0.018506168722907636,0.018839613204401466,0.0191730576858953,0.01950650216738913,0.019839946648882962,0.02017339113037679,0.020506835611870625,0.020840280093364454,0.021173724574858287,0.021507169056352117,0.02184061353784595,0.02217405801933978,0.022507502500833613,0.022840946982327442,0.023174391463821272,0.023507835945315105,0.023841280426808935,0.024174724908302768,0.024508169389796598,0.02484161387129043,0.02517505835278426,0.025508502834278093,0.025841947315771923,0.026175391797265756,0.026508836278759586,0.02684228076025342,0.02717572524174725,0.02750916972324108,0.02784261420473491,0.028176058686228744,0.028509503167722574,0.028842947649216407,0.029176392130710237,0.029509836612204066,0.0298432810936979,0.03017672557519173,0.030510170056685562,0.030843614538179392,0.031177059019673225,0.031510503501167055,0.03184394798266089,0.03217739246415472,0.03251083694564855,0.03284428142714238,0.03317772590863621,0.033511170390130046,0.03384461487162387,0.034178059353117705,0.03451150383461154,0.03484494831610537,0.0351783927975992,0.03551183727909303,0.035845281760586864,0.03617872624208069,0.03651217072357452,0.036845615205068356,0.03717905968656219,0.037512504168056016,0.03784594864954985,0.03817939313104368,0.038512837612537515,0.03884628209403134,0.039179726575525174,0.03951317105701901,0.03984661553851284,0.04018006002000667,0.0405135045015005,0.04084694898299433,0.041180393464488166,0.04151383794598199,0.041847282427475825,0.04218072690896966,0.042514171390463484,0.04284761587195732,0.04318106035345115,0.043514504834944984,0.04384794931643881,0.04418139379793264,0.044514838279426476,0.04484828276092031,0.045181727242414135,0.04551517172390797,0.0458486162054018,0.046182060686895635,0.04651550516838946,0.046848949649883294,0.04718239413137713,0.04751583861287096,0.047849283094364786,0.04818272757585862,0.04851617205735245,0.048849616538846286,0.04918306102034011,0.049516505501833945,0.04984994998332778,0.050183394464821604,0.05051683894631544,0.05085028342780927,0.0511837279093031,0.05151717239079693,0.05185061687229076,0.052184061353784596,0.05251750583527843,0.052850950316772255,0.05318439479826609,0.05351783927975992,0.053851283761253754,0.05418472824274758,0.054518172724241414,0.05485161720573525,0.05518506168722908,0.055518506168722906,0.05585195065021674,0.05618539513171057,0.0565188396132044,0.05685228409469823,0.057185728576192064,0.0575191730576859,0.057852617539179724,0.05818606202067356,0.05851950650216739,0.05885295098366122,0.05918639546515505,0.05951983994664888,0.059853284428142715,0.06018672890963655,0.060520173391130375,0.06085361787262421,0.06118706235411804,0.061520506835611874,0.0618539513171057,0.06218739579859953,0.06252084028009336,0.06285428476158719,0.06318772924308103,0.06352117372457486,0.06385461820606869,0.06418806268756252,0.06452150716905636,0.06485495165055018,0.06518839613204401,0.06552184061353784,0.06585528509503168,0.06618872957652551,0.06652217405801934,0.06685561853951318,0.06718906302100701,0.06752250750250083,0.06785595198399466,0.0681893964654885,0.06852284094698233,0.06885628542847616,0.06918972990997,0.06952317439146383,0.06985661887295765,0.07019006335445148,0.07052350783594531,0.07085695231743915,0.07119039679893298,0.07152384128042681,0.07185728576192064,0.07219073024341448,0.0725241747249083,0.07285761920640213,0.07319106368789596,0.0735245081693898,0.07385795265088363,0.07419139713237746,0.0745248416138713,0.07485828609536513,0.07519173057685895,0.07552517505835278,0.07585861953984661,0.07619206402134045,0.07652550850283428,0.07685895298432811,0.07719239746582195,0.07752584194731577,0.0778592864288096,0.07819273091030343,0.07852617539179726,0.0788596198732911,0.07919306435478493,0.07952650883627876,0.0798599533177726,0.08019339779926642,0.08052684228076025,0.08086028676225408,0.08119373124374792,0.08152717572524175,0.08186062020673558,0.08219406468822942,0.08252750916972323,0.08286095365121707,0.0831943981327109,0.08352784261420473,0.08386128709569857,0.0841947315771924,0.08452817605868623,0.08486162054018007,0.08519506502167389,0.08552850950316772,0.08586195398466155,0.08619539846615538,0.08652884294764922,0.08686228742914305,0.08719573191063688,0.08752917639213072,0.08786262087362454,0.08819606535511837,0.0885295098366122,0.08886295431810604,0.08919639879959987,0.0895298432810937,0.08986328776258753,0.09019673224408135,0.09053017672557519,0.09086362120706902,0.09119706568856285,0.09153051017005669,0.09186395465155052,0.09219739913304435,0.09253084361453819,0.092864288096032,0.09319773257752584,0.09353117705901967,0.0938646215405135,0.09419806602200734,0.09453151050350117,0.094864954984995,0.09519839946648882,0.09553184394798266,0.09586528842947649,0.09619873291097032,0.09653217739246416,0.09686562187395799,0.09719906635545182,0.09753251083694565,0.09786595531843947,0.0981993997999333,0.09853284428142714,0.09886628876292097,0.0991997332444148,0.09953317772590864,0.09986662220740247,0.1002000666888963,0.10053351117039012,0.10086695565188396,0.10120040013337779,0.10153384461487162,0.10186728909636546,0.10220073357785929,0.10253417805935312,0.10286762254084694,0.10320106702234078,0.10353451150383461,0.10386795598532844,0.10420140046682227,0.10453484494831611,0.10486828942980994,0.10520173391130377,0.1055351783927976,0.10586862287429143,0.10620206735578526,0.10653551183727909,0.10686895631877293,0.10720240080026676,0.10753584528176059,0.10786928976325441,0.10820273424474824,0.10853617872624208,0.10886962320773591,0.10920306768922974,0.10953651217072358,0.10986995665221741,0.11020340113371124,0.11053684561520506,0.1108702900966989,0.11120373457819273,0.11153717905968656,0.1118706235411804,0.11220406802267423,0.11253751250416806,0.1128709569856619,0.11320440146715571,0.11353784594864955,0.11387129043014338,0.11420473491163721,0.11453817939313105,0.11487162387462488,0.11520506835611871,0.11553851283761253,0.11587195731910636,0.1162054018006002,0.11653884628209403,0.11687229076358786,0.1172057352450817,0.11753917972657553,0.11787262420806936,0.11820606868956318,0.11853951317105701,0.11887295765255085,0.11920640213404468,0.11953984661553851,0.11987329109703235,0.12020673557852618,0.12054018006002001,0.12087362454151383,0.12120706902300767,0.1215405135045015,0.12187395798599533,0.12220740246748917,0.122540846948983,0.12287429143047683,0.12320773591197065,0.12354118039346448,0.12387462487495832,0.12420806935645215,0.12454151383794598,0.12487495831943982,0.12520840280093365,0.12554184728242748,0.12587529176392132,0.12620873624541515,0.12654218072690898,0.12687562520840281,0.12720906968989662,0.12754251417139045,0.1278759586528843,0.12820940313437812,0.12854284761587195,0.12887629209736579,0.12920973657885962,0.12954318106035345,0.12987662554184728,0.13021007002334112,0.13054351450483495,0.13087695898632878,0.13121040346782262,0.13154384794931645,0.13187729243081028,0.1322107369123041,0.13254418139379792,0.13287762587529175,0.1332110703567856,0.13354451483827942,0.13387795931977325,0.1342114038012671,0.13454484828276092,0.13487829276425475,0.1352117372457486,0.13554518172724242,0.13587862620873625,0.13621207069023009,0.13654551517172392,0.13687895965321775,0.13721240413471156,0.1375458486162054,0.13787929309769922,0.13821273757919306,0.1385461820606869,0.13887962654218072,0.13921307102367456,0.1395465155051684,0.13987995998666222,0.14021340446815606,0.1405468489496499,0.14088029343114372,0.14121373791263755,0.1415471823941314,0.14188062687562522,0.14221407135711903,0.14254751583861286,0.1428809603201067,0.14321440480160053,0.14354784928309436,0.1438812937645882,0.14421473824608202,0.14454818272757586,0.1448816272090697,0.14521507169056352,0.14554851617205736,0.1458819606535512,0.14621540513504502,0.14654884961653886,0.1468822940980327,0.1472157385795265,0.14754918306102033,0.14788262754251416,0.148216072024008,0.14854951650550183,0.14888296098699566,0.1492164054684895,0.14954984994998333,0.14988329443147716,0.150216738912971,0.15055018339446483,0.15088362787595866,0.1512170723574525,0.15155051683894633,0.15188396132044016,0.152217405801934,0.1525508502834278,0.15288429476492163,0.15321773924641546,0.1535511837279093,0.15388462820940313,0.15421807269089696,0.1545515171723908,0.15488496165388463,0.15521840613537846,0.1555518506168723,0.15588529509836613,0.15621873957985996,0.1565521840613538,0.15688562854284763,0.15721907302434146,0.15755251750583527,0.1578859619873291,0.15821940646882293,0.15855285095031676,0.1588862954318106,0.15921973991330443,0.15955318439479826,0.1598866288762921,0.16022007335778593,0.16055351783927976,0.1608869623207736,0.16122040680226743,0.16155385128376126,0.1618872957652551,0.16222074024674893,0.16255418472824273,0.16288762920973657,0.1632210736912304,0.16355451817272423,0.16388796265421807,0.1642214071357119,0.16455485161720573,0.16488829609869957,0.1652217405801934,0.16555518506168723,0.16588862954318107,0.1662220740246749,0.16655551850616873,0.16688896298766256,0.1672224074691564,0.1675558519506502,0.16788929643214404,0.16822274091363787,0.1685561853951317,0.16888962987662554,0.16922307435811937,0.1695565188396132,0.16988996332110703,0.17022340780260087,0.1705568522840947,0.17089029676558853,0.17122374124708237,0.1715571857285762,0.17189063021007003,0.17222407469156387,0.1725575191730577,0.1728909636545515,0.17322440813604534,0.17355785261753917,0.173891297099033,0.17422474158052684,0.17455818606202067,0.1748916305435145,0.17522507502500834,0.17555851950650217,0.175891963987996,0.17622540846948984,0.17655885295098367,0.1768922974324775,0.17722574191397134,0.17755918639546517,0.17789263087695897,0.1782260753584528,0.17855951983994664,0.17889296432144047,0.1792264088029343,0.17955985328442814,0.17989329776592197,0.1802267422474158,0.18056018672890964,0.18089363121040347,0.1812270756918973,0.18156052017339114,0.18189396465488497,0.1822274091363788,0.18256085361787264,0.18289429809936644,0.18322774258086028,0.1835611870623541,0.18389463154384794,0.18422807602534177,0.1845615205068356,0.18489496498832944,0.18522840946982327,0.1855618539513171,0.18589529843281094,0.18622874291430477,0.1865621873957986,0.18689563187729244,0.18722907635878627,0.1875625208402801,0.1878959653217739,0.18822940980326774,0.18856285428476158,0.1888962987662554,0.18922974324774924,0.18956318772924308,0.1898966322107369,0.19023007669223074,0.19056352117372458,0.1908969656552184,0.19123041013671224,0.19156385461820608,0.1918972990996999,0.19223074358119374,0.19256418806268757,0.19289763254418138,0.1932310770256752,0.19356452150716905,0.19389796598866288,0.1942314104701567,0.19456485495165055,0.19489829943314438,0.1952317439146382,0.19556518839613204,0.19589863287762588,0.1962320773591197,0.19656552184061354,0.19689896632210738,0.1972324108036012,0.19756585528509504,0.19789929976658888,0.19823274424808268,0.19856618872957651,0.19889963321107035,0.19923307769256418,0.19956652217405801,0.19989996665555185,0.20023341113704568,0.2005668556185395,0.20090030010003335,0.20123374458152718,0.201567189063021,0.20190063354451485,0.20223407802600868,0.2025675225075025,0.20290096698899635,0.20323441147049015,0.20356785595198398,0.20390130043347782,0.20423474491497165,0.20456818939646548,0.20490163387795932,0.20523507835945315,0.20556852284094698,0.20590196732244082,0.20623541180393465,0.20656885628542848,0.20690230076692231,0.20723574524841615,0.20756918972990998,0.20790263421140381,0.20823607869289762,0.20856952317439145,0.20890296765588529,0.20923641213737912,0.20956985661887295,0.20990330110036678,0.21023674558186062,0.21057019006335445,0.21090363454484828,0.21123707902634212,0.21157052350783595,0.21190396798932978,0.21223741247082362,0.21257085695231745,0.21290430143381128,0.2132377459153051,0.21357119039679892,0.21390463487829275,0.2142380793597866,0.21457152384128042,0.21490496832277425,0.2152384128042681,0.21557185728576192,0.21590530176725575,0.21623874624874959,0.21657219073024342,0.21690563521173725,0.21723907969323109,0.21757252417472492,0.21790596865621875,0.21823941313771258,0.2185728576192064,0.21890630210070022,0.21923974658219406,0.2195731910636879,0.21990663554518172,0.22024008002667556,0.2205735245081694,0.22090696898966322,0.22124041347115705,0.2215738579526509,0.22190730243414472,0.22224074691563855,0.2225741913971324,0.22290763587862622,0.22324108036012005,0.22357452484161386,0.2239079693231077,0.22424141380460152,0.22457485828609536,0.2249083027675892,0.22524174724908302,0.22557519173057686,0.2259086362120707,0.22624208069356452,0.22657552517505836,0.2269089696565522,0.22724241413804602,0.22757585861953986,0.2279093031010337,0.22824274758252752,0.22857619206402133,0.22890963654551516,0.229243081027009,0.22957652550850283,0.22990996998999666,0.2302434144714905,0.23057685895298433,0.23091030343447816,0.231243747915972,0.23157719239746583,0.23191063687895966,0.2322440813604535,0.23257752584194732,0.23291097032344116,0.233244414804935,0.2335778592864288,0.23391130376792263,0.23424474824941646,0.2345781927309103,0.23491163721240413,0.23524508169389796,0.2355785261753918,0.23591197065688563,0.23624541513837946,0.2365788596198733,0.23691230410136713,0.23724574858286096,0.2375791930643548,0.23791263754584863,0.23824608202734246,0.23857952650883626,0.2389129709903301,0.23924641547182393,0.23957985995331776,0.2399133044348116,0.24024674891630543,0.24058019339779926,0.2409136378792931,0.24124708236078693,0.24158052684228076,0.2419139713237746,0.24224741580526843,0.24258086028676226,0.2429143047682561,0.24324774924974993,0.24358119373124376,0.24391463821273757,0.2442480826942314,0.24458152717572523,0.24491497165721907,0.2452484161387129,0.24558186062020673,0.24591530510170057,0.2462487495831944,0.24658219406468823,0.24691563854618206,0.2472490830276759,0.24758252750916973,0.24791597199066356,0.2482494164721574,0.24858286095365123,0.24891630543514504,0.24924974991663887,0.2495831943981327,0.24991663887962653,0.25025008336112037,0.25058352784261423,0.25091697232410803,0.2512504168056019,0.2515838612870957,0.2519173057685895,0.25225075025008337,0.25258419473157717,0.25291763921307103,0.25325108369456484,0.2535845281760587,0.2539179726575525,0.25425141713904637,0.25458486162054017,0.25491830610203403,0.25525175058352784,0.2555851950650217,0.2559186395465155,0.25625208402800936,0.25658552850950317,0.256918972990997,0.25725241747249084,0.25758586195398464,0.2579193064354785,0.2582527509169723,0.25858619539846617,0.25891963987996,0.25925308436145383,0.25958652884294764,0.2599199733244415,0.2602534178059353,0.26058686228742917,0.26092030676892297,0.26125375125041683,0.26158719573191064,0.26192064021340444,0.2622540846948983,0.2625875291763921,0.26292097365788597,0.2632544181393798,0.26358786262087364,0.26392130710236744,0.2642547515838613,0.2645881960653551,0.26492164054684897,0.2652550850283428,0.26558852950983663,0.26592197399133044,0.2662554184728243,0.2665888629543181,0.2669223074358119,0.2672557519173058,0.2675891963987996,0.26792264088029344,0.26825608536178724,0.2685895298432811,0.2689229743247749,0.26925641880626877,0.2695898632877626,0.26992330776925644,0.27025675225075024,0.2705901967322441,0.2709236412137379,0.27125708569523177,0.2715905301767256,0.2719239746582194,0.27225741913971324,0.27259086362120705,0.2729243081027009,0.2732577525841947,0.2735911970656886,0.2739246415471824,0.27425808602867624,0.27459153051017005,0.2749249749916639,0.2752584194731577,0.2755918639546516,0.2759253084361454,0.27625875291763924,0.27659219739913304,0.27692564188062685,0.2772590863621207,0.2775925308436145,0.2779259753251084,0.2782594198066022,0.27859286428809604,0.27892630876958985,0.2792597532510837,0.2795931977325775,0.2799266422140714,0.2802600866955652,0.28059353117705904,0.28092697565855285,0.2812604201400467,0.2815938646215405,0.2819273091030343,0.2822607535845282,0.282594198066022,0.28292764254751585,0.28326108702900965,0.2835945315105035,0.2839279759919973,0.2842614204734912,0.284594864954985,0.28492830943647884,0.28526175391797265,0.2855951983994665,0.2859286428809603,0.2862620873624542,0.286595531843948,0.2869289763254418,0.28726242080693565,0.28759586528842945,0.2879293097699233,0.2882627542514171,0.288596198732911,0.2889296432144048,0.28926308769589865,0.28959653217739245,0.2899299766588863,0.2902634211403801,0.290596865621874,0.2909303101033678,0.29126375458486164,0.29159719906635545,0.29193064354784926,0.2922640880293431,0.2925975325108369,0.2929309769923308,0.2932644214738246,0.29359786595531845,0.29393131043681225,0.2942647549183061,0.2945981993997999,0.2949316438812938,0.2952650883627876,0.29559853284428145,0.29593197732577525,0.2962654218072691,0.2965988662887629,0.2969323107702568,0.2972657552517506,0.2975991997332444,0.29793264421473825,0.29826608869623206,0.2985995331777259,0.2989329776592197,0.2992664221407136,0.2995998666222074,0.29993331110370125,0.30026675558519506,0.3006002000666889,0.3009336445481827,0.3012670890296766,0.3016005335111704,0.30193397799266425,0.30226742247415805,0.30260086695565186,0.3029343114371457,0.3032677559186395,0.3036012004001334,0.3039346448816272,0.30426808936312105,0.30460153384461486,0.3049349783261087,0.3052684228076025,0.3056018672890964,0.3059353117705902,0.30626875625208405,0.30660220073357786,0.3069356452150717,0.3072690896965655,0.30760253417805933,0.3079359786595532,0.308269423141047,0.30860286762254086,0.30893631210403466,0.3092697565855285,0.3096032010670223,0.3099366455485162,0.31027009003001,0.31060353451150385,0.31093697899299766,0.3112704234744915,0.3116038679559853,0.3119373124374792,0.312270756918973,0.3126042014004668,0.31293764588196066,0.31327109036345446,0.3136045348449483,0.31393797932644213,0.314271423807936,0.3146048682894298,0.31493831277092366,0.31527175725241746,0.3156052017339113,0.31593864621540513,0.316272090696899,0.3166055351783928,0.31693897965988665,0.31727242414138046,0.31760586862287427,0.3179393131043681,0.31827275758586193,0.3186062020673558,0.3189396465488496,0.31927309103034346,0.31960653551183726,0.3199399799933311,0.32027342447482493,0.3206068689563188,0.3209403134378126,0.32127375791930646,0.32160720240080026,0.3219406468822941,0.32227409136378793,0.32260753584528173,0.3229409803267756,0.3232744248082694,0.32360786928976326,0.32394131377125707,0.3242747582527509,0.32460820273424473,0.3249416472157386,0.3252750916972324,0.32560853617872626,0.32594198066022007,0.3262754251417139,0.32660886962320773,0.3269423141047016,0.3272757585861954,0.3276092030676892,0.32794264754918306,0.32827609203067687,0.32860953651217073,0.32894298099366454,0.3292764254751584,0.3296098699566522,0.32994331443814606,0.33027675891963987,0.33061020340113373,0.33094364788262753,0.3312770923641214,0.3316105368456152,0.33194398132710906,0.33227742580860287,0.33261087029009667,0.33294431477159053,0.33327775925308434,0.3336112037345782,0.333944648216072,0.33427809269756587,0.33461153717905967,0.33494498166055353,0.33527842614204734,0.3356118706235412,0.335945315105035,0.33627875958652886,0.33661220406802267,0.33694564854951653,0.33727909303101034,0.33761253751250414,0.337945981993998,0.3382794264754918,0.33861287095698567,0.3389463154384795,0.33927975991997333,0.33961320440146714,0.339946648882961,0.3402800933644548,0.34061353784594867,0.34094698232744247,0.34128042680893633,0.34161387129043014,0.341947315771924,0.3422807602534178,0.34261420473491166,0.34294764921640547,0.3432810936978993,0.34361453817939314,0.34394798266088694,0.3442814271423808,0.3446148716238746,0.34494831610536847,0.3452817605868623,0.34561520506835613,0.34594864954984994,0.3462820940313438,0.3466155385128376,0.34694898299433147,0.3472824274758253,0.34761587195731913,0.34794931643881294,0.34828276092030674,0.3486162054018006,0.3489496498832944,0.34928309436478827,0.3496165388462821,0.34994998332777594,0.35028342780926974,0.3506168722907636,0.3509503167722574,0.35128376125375127,0.3516172057352451,0.35195065021673894,0.35228409469823274,0.3526175391797266,0.3529509836612204,0.3532844281427142,0.3536178726242081,0.3539513171057019,0.35428476158719574,0.35461820606868955,0.3549516505501834,0.3552850950316772,0.3556185395131711,0.3559519839946649,0.35628542847615874,0.35661887295765254,0.3569523174391464,0.3572857619206402,0.35761920640213407,0.3579526508836279,0.3582860953651217,0.35861953984661554,0.35895298432810935,0.3592864288096032,0.359619873291097,0.3599533177725909,0.3602867622540847,0.36062020673557854,0.36095365121707235,0.3612870956985662,0.36162054018006,0.3619539846615539,0.3622874291430477,0.36262087362454154,0.36295431810603535,0.36328776258752915,0.363621207069023,0.3639546515505168,0.3642880960320107,0.3646215405135045,0.36495498499499834,0.36528842947649215,0.365621873957986,0.3659553184394798,0.3662887629209737,0.3666222074024675,0.36695565188396134,0.36728909636545515,0.367622540846949,0.3679559853284428,0.3682894298099366,0.3686228742914305,0.3689563187729243,0.36928976325441815,0.36962320773591195,0.3699566522174058,0.3702900966988996,0.3706235411803935,0.3709569856618873,0.37129043014338114,0.37162387462487495,0.3719573191063688,0.3722907635878626,0.3726242080693565,0.3729576525508503,0.3732910970323441,0.37362454151383795,0.37395798599533175,0.3742914304768256,0.3746248749583194,0.3749583194398133,0.3752917639213071,0.37562520840280095,0.37595865288429475,0.3762920973657886,0.3766255418472824,0.3769589863287763,0.3772924308102701,0.37762587529176395,0.37795931977325775,0.37829276425475156,0.3786262087362454,0.3789596532177392,0.3792930976992331,0.3796265421807269,0.37995998666222075,0.38029343114371456,0.3806268756252084,0.3809603201067022,0.3812937645881961,0.3816272090696899,0.38196065355118375,0.38229409803267755,0.3826275425141714,0.3829609869956652,0.383294431477159,0.3836278759586529,0.3839613204401467,0.38429476492164055,0.38462820940313436,0.3849616538846282,0.385295098366122,0.3856285428476159,0.3859619873291097,0.38629543181060355,0.38662887629209736,0.3869623207735912,0.387295765255085,0.3876292097365789,0.3879626542180727,0.38829609869956655,0.38862954318106036,0.38896298766255416,0.389296432144048,0.3896298766255418,0.3899633211070357,0.3902967655885295,0.39063021007002335,0.39096365455151716,0.391297099033011,0.3916305435145048,0.3919639879959987,0.3922974324774925,0.39263087695898635,0.39296432144048016,0.393297765921974,0.3936312104034678,0.39396465488496163,0.3942980993664555,0.3946315438479493,0.39496498832944316,0.39529843281093696,0.3956318772924308,0.39596532177392463,0.3962987662554185,0.3966322107369123,0.39696565521840615,0.39729909969989996,0.3976325441813938,0.3979659886628876,0.3982994331443815,0.3986328776258753,0.3989663221073691,0.39929976658886296,0.39963321107035676,0.3999666555518506,0.40030010003334443,0.4006335445148383,0.4009669889963321,0.40130043347782596,0.40163387795931976,0.4019673224408136,0.40230076692230743,0.4026342114038013,0.4029676558852951,0.40330110036678896,0.40363454484828276,0.40396798932977657,0.4043014338112704,0.40463487829276423,0.4049683227742581,0.4053017672557519,0.40563521173724576,0.40596865621873957,0.4063021007002334,0.40663554518172723,0.4069689896632211,0.4073024341447149,0.40763587862620876,0.40796932310770256,0.4083027675891964,0.40863621207069023,0.40896965655218404,0.4093031010336779,0.4096365455151717,0.40996998999666556,0.41030343447815937,0.41063687895965323,0.41097032344114703,0.4113037679226409,0.4116372124041347,0.41197065688562856,0.41230410136712237,0.4126375458486162,0.41297099033011003,0.4133044348116039,0.4136378792930977,0.4139713237745915,0.41430476825608537,0.41463821273757917,0.41497165721907303,0.41530510170056684,0.4156385461820607,0.4159719906635545,0.41630543514504836,0.41663887962654217,0.41697232410803603,0.41730576858952984,0.4176392130710237,0.4179726575525175,0.41830610203401136,0.41863954651550517,0.418972990996999,0.41930643547849283,0.41963987995998664,0.4199733244414805,0.4203067689229743,0.42064021340446817,0.42097365788596197,0.42130710236745583,0.42164054684894964,0.4219739913304435,0.4223074358119373,0.42264088029343116,0.42297432477492497,0.42330776925641883,0.42364121373791264,0.42397465821940644,0.4243081027009003,0.4246415471823941,0.42497499166388797,0.4253084361453818,0.42564188062687563,0.42597532510836944,0.4263087695898633,0.4266422140713571,0.42697565855285097,0.4273091030343448,0.42764254751583863,0.42797599199733244,0.4283094364788263,0.4286428809603201,0.4289763254418139,0.42930976992330777,0.4296432144048016,0.42997665888629544,0.43031010336778924,0.4306435478492831,0.4309769923307769,0.43131043681227077,0.4316438812937646,0.43197732577525844,0.43231077025675224,0.4326442147382461,0.4329776592197399,0.43331110370123377,0.4336445481827276,0.43397799266422143,0.43431143714571524,0.43464488162720905,0.4349783261087029,0.4353117705901967,0.4356452150716906,0.4359786595531844,0.43631210403467824,0.43664554851617204,0.4369789929976659,0.4373124374791597,0.43764588196065357,0.4379793264421474,0.43831277092364124,0.43864621540513504,0.4389796598866289,0.4393131043681227,0.4396465488496165,0.4399799933311104,0.4403134378126042,0.44064688229409804,0.44098032677559185,0.4413137712570857,0.4416472157385795,0.4419806602200734,0.4423141047015672,0.44264754918306104,0.44298099366455485,0.4433144381460487,0.4436478826275425,0.44398132710903637,0.4443147715905302,0.444648216072024,0.44498166055351784,0.44531510503501165,0.4456485495165055,0.4459819939979993,0.4463154384794932,0.446648882960987,0.44698232744248084,0.44731577192397465,0.4476492164054685,0.4479826608869623,0.4483161053684562,0.44864954984995,0.44898299433144384,0.44931643881293765,0.44964988329443145,0.4499833277759253,0.4503167722574191,0.450650216738913,0.4509836612204068,0.45131710570190064,0.45165055018339445,0.4519839946648883,0.4523174391463821,0.452650883627876,0.4529843281093698,0.45331777259086364,0.45365121707235745,0.4539846615538513,0.4543181060353451,0.4546515505168389,0.4549849949983328,0.4553184394798266,0.45565188396132045,0.45598532844281425,0.4563187729243081,0.4566522174058019,0.4569856618872958,0.4573191063687896,0.45765255085028345,0.45798599533177725,0.4583194398132711,0.4586528842947649,0.4589863287762588,0.4593197732577526,0.4596532177392464,0.45998666222074025,0.46032010670223406,0.4606535511837279,0.4609869956652217,0.4613204401467156,0.4616538846282094,0.46198732910970325,0.46232077359119705,0.4626542180726909,0.4629876625541847,0.4633211070356786,0.4636545515171724,0.46398799599866625,0.46432144048016005,0.46465488496165386,0.4649883294431477,0.4653217739246415,0.4656552184061354,0.4659886628876292,0.46632210736912305,0.46665555185061686,0.4669889963321107,0.4673224408136045,0.4676558852950984,0.4679893297765922,0.46832277425808605,0.46865621873957986,0.4689896632210737,0.4693231077025675,0.4696565521840613,0.4699899966655552,0.470323441147049,0.47065688562854285,0.47099033011003666,0.4713237745915305,0.4716572190730243,0.4719906635545182,0.472324108036012,0.47265755251750585,0.47299099699899966,0.4733244414804935,0.4736578859619873,0.4739913304434812,0.474324774924975,0.4746582194064688,0.47499166388796266,0.47532510836945646,0.4756585528509503,0.47599199733244413,0.476325441813938,0.4766588862954318,0.47699233077692565,0.47732577525841946,0.4776592197399133,0.4779926642214071,0.478326108702901,0.4786595531843948,0.47899299766588865,0.47932644214738246,0.4796598866288763,0.4799933311103701,0.48032677559186393,0.4806602200733578,0.4809936645548516,0.48132710903634546,0.48166055351783926,0.4819939979993331,0.48232744248082693,0.4826608869623208,0.4829943314438146,0.48332777592530846,0.48366122040680226,0.4839946648882961,0.4843281093697899,0.4846615538512838,0.4849949983327776,0.4853284428142714,0.48566188729576526,0.48599533177725907,0.4863287762587529,0.48666222074024673,0.4869956652217406,0.4873291097032344,0.48766255418472826,0.48799599866622206,0.4883294431477159,0.48866288762920973,0.4889963321107036,0.4893297765921974,0.48966322107369126,0.48999666555518506,0.49033011003667887,0.49066355451817273,0.49099699899966653,0.4913304434811604,0.4916638879626542,0.49199733244414806,0.49233077692564187,0.4926642214071357,0.49299766588862953,0.4933311103701234,0.4936645548516172,0.49399799933311106,0.49433144381460487,0.4946648882960987,0.49499833277759253,0.49533177725908634,0.4956652217405802,0.495998666222074,0.49633211070356786,0.49666555518506167,0.49699899966655553,0.49733244414804934,0.4976658886295432,0.497999333111037,0.49833277759253086,0.49866622207402467,0.49899966655551853,0.49933311103701233,0.4996665555185062,0.5]}

},{}],86:[function(require,module,exports){
module.exports={"expected":[0.4769362762044699,0.477493831724177,0.4780516842773505,0.47860983452822164,0.4791682831428273,0.47972703078901724,0.48028607813646207,0.48084542585666057,0.48140507462294574,0.48196502511049344,0.4825252779963284,0.4830858339593334,0.4836466936802548,0.4842078578417114,0.48476932712820087,0.4853311022261083,0.48589318382371277,0.4864555726111959,0.4870182692806483,0.4875812745260788,0.4881445890434209,0.4887082135305407,0.4892721486872453,0.4898363952152903,0.4904009538183871,0.49096582520221216,0.49153101007441313,0.4920965091446188,0.4926623231244457,0.49322845272750615,0.49379489866941784,0.49436166166781026,0.4949287424423337,0.4954961417146676,0.49606386020852833,0.496631898649678,0.4972002577659326,0.4977689382871701,0.49833794094533934,0.4989072664744685,0.49947691561067337,0.5000468890921657,0.5006171876592624,0.501187812054394,0.5017587630221136,0.5023300413091041,0.5029016476641893,0.5034735828383413,0.5040458475846894,0.5046184426585297,0.5051913688173334,0.505764626820756,0.5063382174306466,0.5069121414110569,0.5074863995282501,0.5080609925507106,0.5086359212491527,0.5092111863965302,0.5097867887680457,0.5103627291411602,0.5109390082956016,0.5115156270133759,0.5120925860787751,0.5126698862783875,0.5132475284011074,0.5138255132381446,0.5144038415830344,0.5149825142316468,0.5155615319821969,0.5161408956352546,0.516720605993755,0.5173006638630072,0.5178810700507055,0.518461825366939,0.5190429306242021,0.5196243866374043,0.5202061942238805,0.5207883542034014,0.5213708673981842,0.5219537346329027,0.5225369567346975,0.5231205345331871,0.523704468860478,0.5242887605511759,0.5248734104423958,0.525458419373773,0.5260437881874747,0.5266295177282089,0.5272156088432374,0.5278020623823856,0.5283888791980544,0.5289760601452302,0.529563606081497,0.530151517867047,0.5307397963646929,0.5313284424398776,0.5319174569606877,0.5325068407978621,0.5330965948248074,0.5336867199176057,0.5342772169550287,0.5348680868185481,0.5354593303923485,0.5360509485633383,0.5366429422211625,0.537235312258213,0.5378280595696431,0.5384211850533778,0.539014689610126,0.5396085741433941,0.5402028395594971,0.5407974867675709,0.5413925166795855,0.5419879302103575,0.5425837282775618,0.5431799118017452,0.5437764817063382,0.544373438917669,0.5449707843649753,0.5455685189804176,0.5461666436990918,0.5467651594590438,0.5473640672012808,0.5479633678697847,0.5485630624115271,0.5491631517764809,0.5497636369176343,0.5503645187910045,0.5509657983556512,0.5515674765736902,0.5521695544103074,0.5527720328337717,0.5533749128154506,0.5539781953298225,0.5545818813544916,0.5551859718702018,0.5557904678608512,0.5563953703135062,0.5570006802184155,0.5576063985690255,0.5582125263619936,0.5588190645972043,0.5594260142777822,0.5600333764101083,0.5606411520038338,0.5612493420718965,0.5618579476305334,0.5624669696992984,0.5630764093010758,0.5636862674620969,0.564296545211954,0.5649072435836167,0.5655183636134475,0.5661299063412176,0.5667418728101218,0.5673542640667951,0.5679670811613285,0.5685803251472852,0.5691939970817158,0.5698080980251755,0.5704226290417402,0.5710375911990231,0.57165298556819,0.572268813223977,0.5728850752447076,0.5735017727123081,0.5741189067123259,0.5747364783339443,0.575354488670003,0.5759729388170125,0.5765918298751717,0.5772111629483863,0.5778309391442858,0.5784511595742413,0.5790718253533824,0.5796929376006156,0.5803144974386432,0.5809365059939787,0.5815589643969679,0.5821818737818043,0.5828052352865505,0.5834290500531536,0.5840533192274656,0.5846780439592615,0.5853032254022588,0.5859288647141345,0.5865549630565464,0.5871815215951508,0.587808541499622,0.5884360239436718,0.5890639701050686,0.5896923811656576,0.5903212583113804,0.5909506027322937,0.5915804156225907,0.5922106981806204,0.5928414516089077,0.5934726771141747,0.594104375907359,0.5947365492036367,0.5953691982224414,0.5960023241874861,0.5966359283267827,0.5972700118726644,0.5979045760618067,0.5985396221352476,0.5991751513384108,0.5998111649211252,0.6004476641376492,0.6010846502466894,0.6017221245114257,0.6023600881995309,0.6029985425831946,0.6036374889391449,0.6042769285486708,0.6049168626976448,0.605557292676547,0.6061982197804863,0.6068396453092239,0.6074815705671974,0.6081239968635439,0.6087669255121223,0.6094103578315391,0.61005429514517,0.6106987387811855,0.6113436900725745,0.6119891503571683,0.6126351209776653,0.6132816032816556,0.6139285986216461,0.6145761083550838,0.6152241338443836,0.6158726764569507,0.6165217375652079,0.61717131854662,0.6178214207837205,0.6184720456641367,0.6191231945806157,0.619774868931051,0.6204270701185092,0.6210797995512551,0.6217330586427801,0.6223868488118282,0.6230411714824227,0.6236960280838945,0.6243514200509086,0.6250073488234918,0.6256638158470615,0.6263208225724517,0.6269783704559423,0.6276364609592878,0.6282950955497453,0.6289542757001025,0.6296140028887076,0.6302742785994982,0.6309351043220295,0.6315964815515057,0.6322584117888069,0.6329208965405219,0.6335839373189758,0.6342475356422617,0.6349116930342702,0.6355764110247206,0.6362416911491917,0.6369075349491525,0.6375739439719932,0.6382409197710572,0.6389084639056731,0.6395765779411855,0.6402452634489871,0.6409145220065523,0.6415843551974687,0.6422547646114694,0.6429257518444668,0.6435973184985854,0.6442694661821959,0.644942196509947,0.6456155111028014,0.646289411588068,0.6469638995994373,0.6476389767770167,0.6483146447673618,0.6489909052235165,0.6496677598050442,0.6503452101780641,0.6510232580152886,0.6517019049960576,0.6523811528063753,0.6530610031389462,0.6537414576932127,0.654422518175391,0.6551041862985096,0.6557864637824458,0.6564693523539625,0.6571528537467491,0.6578369697014569,0.658521701965739,0.6592070522942889,0.6598930224488795,0.6605796141984023,0.6612668293189068,0.6619546695936411,0.6626431368130918,0.6633322327750238,0.6640219592845217,0.6647123181540308,0.6654033112033982,0.6660949402599141,0.6667872071583546,0.6674801137410222,0.6681736618577909,0.6688678533661464,0.6695626901312305,0.6702581740258841,0.6709543069306911,0.671651090734023,0.6723485273320816,0.673046618628945,0.6737453665366124,0.6744447729750491,0.675144839872232,0.6758455691641957,0.6765469627950793,0.6772490227171721,0.677951750890961,0.6786551492851779,0.6793592198768468,0.6800639646513327,0.6807693856023892,0.6814754847322068,0.6821822640514633,0.6828897255793719,0.6835978713437315,0.6843067033809765,0.6850162237362281,0.6857264344633439,0.6864373376249702,0.687148935292593,0.68786122954659,0.6885742224762839,0.6892879161799933,0.6900023127650879,0.6907174143480406,0.691433223054482,0.6921497410192546,0.692866970386468,0.6935849133095536,0.69430357195132,0.695022948484009,0.6957430450893533,0.6964638639586312,0.6971854072927255,0.6979076773021804,0.6986306762072604,0.6993544062380077,0.7000788696343025,0.700804068645921,0.7015300055325971,0.7022566825640812,0.7029841020202019,0.7037122661909265,0.7044411773764244,0.7051708378871274,0.7059012500437933,0.7066324161775692,0.7073643386300557,0.7080970197533691,0.7088304619102085,0.7095646674739192,0.7102996388285598,0.7110353783689667,0.7117718885008226,0.7125091716407224,0.7132472302162414,0.7139860666660035,0.7147256834397505,0.7154660829984106,0.7162072678141695,0.7169492403705391,0.7176920031624296,0.718435558696222,0.7191799094898378,0.719925058072814,0.7206710069863748,0.7214177587835064,0.7221653160290312,0.7229136812996829,0.7236628571841813,0.7244128462833095,0.7251636512099912,0.7259152745893663,0.726667719058871,0.727420987268315,0.7281750818799616,0.7289300055686082,0.7296857610216654,0.7304423509392397,0.731199778034215,0.7319580450323349,0.732717154672286,0.7334771097057831,0.7342379128976515,0.7349995670259144,0.7357620748818785,0.7365254392702201,0.7372896630090731,0.7380547489301167,0.738820699878665,0.7395875187137565,0.7403552083082439,0.7411237715488853,0.741893211336437,0.7426635305857457,0.7434347322258413,0.7442068192000317,0.7449797944659977,0.7457536609958892,0.7465284217764211,0.747304079808971,0.7480806381096774,0.7488580997095391,0.7496364676545147,0.7504157450056232,0.7511959348390461,0.75197704024623,0.7527590643339886,0.7535420102246089,0.7543258810559543,0.7551106799815727,0.7558964101708013,0.7566830748088761,0.7574706770970391,0.7582592202526504,0.7590487075092959,0.759839142116901,0.7606305273418422,0.7614228664670614,0.7622161627921795,0.7630104196336127,0.7638056403246883,0.7646018282157634,0.7653989866743424,0.7661971190851968,0.766996228850486,0.7677963193898801,0.7685973941406805,0.7693994565579455,0.7702025101146155,0.7710065583016371,0.7718116046280927,0.7726176526213273,0.7734247058270787,0.7742327678096081,0.7750418421518316,0.775851932455453,0.7766630423410994,0.7774751754484548,0.7782883354363975,0.7791025259831384,0.7799177507863602,0.7807340135633561,0.7815513180511735,0.7823696680067557,0.7831890672070869,0.7840095194493374,0.78483102855101,0.7856535983500889,0.7864772327051899,0.7873019354957093,0.7881277106219788,0.7889545620054172,0.7897824935886872,0.7906115093358507,0.7914416132325277,0.7922728092860556,0.7931051015256512,0.7939384940025708,0.7947729907902773,0.7956085959846033,0.7964453137039207,0.7972831480893074,0.7981221033047178,0.7989621835371563,0.7998033929968495,0.8006457359174225,0.8014892165560745,0.802333839193758,0.8031796081353599,0.8040265277098823,0.8048746022706266,0.8057238361953794,0.8065742338866002,0.8074257997716089,0.8082785383027781,0.8091324539577259,0.80998755123951,0.8108438346768245,0.8117013088241983,0.8125599782621956,0.8134198475976185],"x":[0.5,0.500501002004008,0.501002004008016,0.501503006012024,0.5020040080160321,0.5025050100200401,0.503006012024048,0.5035070140280561,0.5040080160320641,0.5045090180360722,0.5050100200400801,0.5055110220440882,0.5060120240480962,0.5065130260521042,0.5070140280561122,0.5075150300601202,0.5080160320641283,0.5085170340681363,0.5090180360721442,0.5095190380761523,0.5100200400801603,0.5105210420841684,0.5110220440881763,0.5115230460921844,0.5120240480961924,0.5125250501002004,0.5130260521042084,0.5135270541082164,0.5140280561122245,0.5145290581162325,0.5150300601202404,0.5155310621242485,0.5160320641282565,0.5165330661322646,0.5170340681362725,0.5175350701402806,0.5180360721442886,0.5185370741482966,0.5190380761523046,0.5195390781563126,0.5200400801603207,0.5205410821643287,0.5210420841683366,0.5215430861723447,0.5220440881763527,0.5225450901803608,0.5230460921843687,0.5235470941883767,0.5240480961923848,0.5245490981963928,0.5250501002004008,0.5255511022044088,0.5260521042084169,0.5265531062124249,0.5270541082164328,0.5275551102204409,0.5280561122244489,0.5285571142284569,0.5290581162324649,0.529559118236473,0.530060120240481,0.5305611222444889,0.531062124248497,0.531563126252505,0.5320641282565131,0.532565130260521,0.533066132264529,0.5335671342685371,0.5340681362725451,0.5345691382765531,0.5350701402805611,0.5355711422845691,0.5360721442885772,0.5365731462925851,0.5370741482965932,0.5375751503006012,0.5380761523046093,0.5385771543086172,0.5390781563126252,0.5395791583166333,0.5400801603206413,0.5405811623246493,0.5410821643286573,0.5415831663326653,0.5420841683366734,0.5425851703406813,0.5430861723446894,0.5435871743486974,0.5440881763527055,0.5445891783567134,0.5450901803607214,0.5455911823647295,0.5460921843687375,0.5465931863727455,0.5470941883767535,0.5475951903807615,0.5480961923847696,0.5485971943887775,0.5490981963927856,0.5495991983967936,0.5501002004008017,0.5506012024048096,0.5511022044088176,0.5516032064128257,0.5521042084168337,0.5526052104208417,0.5531062124248497,0.5536072144288577,0.5541082164328658,0.5546092184368737,0.5551102204408818,0.5556112224448898,0.5561122244488977,0.5566132264529058,0.5571142284569138,0.5576152304609219,0.5581162324649298,0.5586172344689379,0.5591182364729459,0.5596192384769539,0.5601202404809619,0.5606212424849699,0.561122244488978,0.561623246492986,0.5621242484969939,0.562625250501002,0.56312625250501,0.5636272545090181,0.564128256513026,0.564629258517034,0.5651302605210421,0.5656312625250501,0.5661322645290581,0.5666332665330661,0.5671342685370742,0.5676352705410822,0.5681362725450901,0.5686372745490982,0.5691382765531062,0.5696392785571143,0.5701402805611222,0.5706412825651302,0.5711422845691383,0.5716432865731463,0.5721442885771543,0.5726452905811623,0.5731462925851704,0.5736472945891784,0.5741482965931863,0.5746492985971944,0.5751503006012024,0.5756513026052105,0.5761523046092184,0.5766533066132264,0.5771543086172345,0.5776553106212425,0.5781563126252505,0.5786573146292585,0.5791583166332666,0.5796593186372746,0.5801603206412825,0.5806613226452906,0.5811623246492986,0.5816633266533067,0.5821643286573146,0.5826653306613226,0.5831663326653307,0.5836673346693386,0.5841683366733467,0.5846693386773547,0.5851703406813628,0.5856713426853707,0.5861723446893787,0.5866733466933868,0.5871743486973948,0.5876753507014028,0.5881763527054108,0.5886773547094188,0.5891783567134269,0.5896793587174348,0.5901803607214429,0.5906813627254509,0.591182364729459,0.5916833667334669,0.5921843687374749,0.592685370741483,0.593186372745491,0.593687374749499,0.594188376753507,0.594689378757515,0.5951903807615231,0.595691382765531,0.5961923847695391,0.5966933867735471,0.5971943887775552,0.5976953907815631,0.5981963927855711,0.5986973947895792,0.5991983967935872,0.5996993987975952,0.6002004008016032,0.6007014028056112,0.6012024048096193,0.6017034068136272,0.6022044088176353,0.6027054108216433,0.6032064128256514,0.6037074148296593,0.6042084168336673,0.6047094188376754,0.6052104208416834,0.6057114228456913,0.6062124248496994,0.6067134268537074,0.6072144288577155,0.6077154308617234,0.6082164328657315,0.6087174348697395,0.6092184368737475,0.6097194388777555,0.6102204408817635,0.6107214428857716,0.6112224448897795,0.6117234468937875,0.6122244488977956,0.6127254509018036,0.6132264529058116,0.6137274549098196,0.6142284569138277,0.6147294589178357,0.6152304609218436,0.6157314629258517,0.6162324649298597,0.6167334669338678,0.6172344689378757,0.6177354709418837,0.6182364729458918,0.6187374749498998,0.6192384769539078,0.6197394789579158,0.6202404809619239,0.6207414829659319,0.6212424849699398,0.6217434869739479,0.6222444889779559,0.622745490981964,0.6232464929859719,0.62374749498998,0.624248496993988,0.624749498997996,0.625250501002004,0.625751503006012,0.62625250501002,0.6267535070140281,0.627254509018036,0.6277555110220441,0.6282565130260521,0.6287575150300602,0.6292585170340681,0.6297595190380761,0.6302605210420842,0.6307615230460922,0.6312625250501002,0.6317635270541082,0.6322645290581163,0.6327655310621243,0.6332665330661322,0.6337675350701403,0.6342685370741483,0.6347695390781564,0.6352705410821643,0.6357715430861723,0.6362725450901804,0.6367735470941884,0.6372745490981964,0.6377755511022044,0.6382765531062125,0.6387775551102205,0.6392785571142284,0.6397795591182365,0.6402805611222445,0.6407815631262525,0.6412825651302605,0.6417835671342685,0.6422845691382766,0.6427855711422845,0.6432865731462926,0.6437875751503006,0.6442885771543087,0.6447895791583166,0.6452905811623246,0.6457915831663327,0.6462925851703407,0.6467935871743486,0.6472945891783567,0.6477955911823647,0.6482965931863728,0.6487975951903807,0.6492985971943888,0.6497995991983968,0.6503006012024048,0.6508016032064128,0.6513026052104208,0.6518036072144289,0.6523046092184369,0.6528056112224448,0.6533066132264529,0.6538076152304609,0.654308617234469,0.6548096192384769,0.655310621242485,0.655811623246493,0.656312625250501,0.656813627254509,0.657314629258517,0.6578156312625251,0.6583166332665331,0.658817635270541,0.6593186372745491,0.6598196392785571,0.6603206412825652,0.6608216432865731,0.6613226452905812,0.6618236472945892,0.6623246492985972,0.6628256513026052,0.6633266533066132,0.6638276553106213,0.6643286573146293,0.6648296593186372,0.6653306613226453,0.6658316633266533,0.6663326653306614,0.6668336673346693,0.6673346693386774,0.6678356713426854,0.6683366733466933,0.6688376753507014,0.6693386773547094,0.6698396793587175,0.6703406813627254,0.6708416833667334,0.6713426853707415,0.6718436873747495,0.6723446893787575,0.6728456913827655,0.6733466933867736,0.6738476953907816,0.6743486973947895,0.6748496993987976,0.6753507014028056,0.6758517034068137,0.6763527054108216,0.6768537074148296,0.6773547094188377,0.6778557114228457,0.6783567134268537,0.6788577154308617,0.6793587174348698,0.6798597194388778,0.6803607214428857,0.6808617234468938,0.6813627254509018,0.6818637274549099,0.6823647294589178,0.6828657314629258,0.6833667334669339,0.6838677354709419,0.6843687374749499,0.6848697394789579,0.685370741482966,0.685871743486974,0.6863727454909819,0.68687374749499,0.687374749498998,0.6878757515030061,0.688376753507014,0.688877755511022,0.6893787575150301,0.6898797595190381,0.6903807615230461,0.6908817635270541,0.6913827655310621,0.6918837675350702,0.6923847695390781,0.6928857715430862,0.6933867735470942,0.6938877755511023,0.6943887775551102,0.6948897795591182,0.6953907815631263,0.6958917835671342,0.6963927855711423,0.6968937875751503,0.6973947895791583,0.6978957915831663,0.6983967935871743,0.6988977955911824,0.6993987975951904,0.6998997995991983,0.7004008016032064,0.7009018036072144,0.7014028056112225,0.7019038076152304,0.7024048096192385,0.7029058116232465,0.7034068136272545,0.7039078156312625,0.7044088176352705,0.7049098196392786,0.7054108216432866,0.7059118236472945,0.7064128256513026,0.7069138276553106,0.7074148296593187,0.7079158316633266,0.7084168336673347,0.7089178356713427,0.7094188376753507,0.7099198396793587,0.7104208416833667,0.7109218436873748,0.7114228456913828,0.7119238476953907,0.7124248496993988,0.7129258517034068,0.7134268537074149,0.7139278557114228,0.7144288577154309,0.7149298597194389,0.7154308617234469,0.7159318637274549,0.7164328657314629,0.716933867735471,0.717434869739479,0.7179358717434869,0.718436873747495,0.718937875751503,0.7194388777555111,0.719939879759519,0.720440881763527,0.7209418837675351,0.7214428857715431,0.7219438877755511,0.7224448897795591,0.7229458917835672,0.7234468937875751,0.7239478957915831,0.7244488977955912,0.7249498997995992,0.7254509018036072,0.7259519038076152,0.7264529058116233,0.7269539078156313,0.7274549098196392,0.7279559118236473,0.7284569138276553,0.7289579158316634,0.7294589178356713,0.7299599198396793,0.7304609218436874,0.7309619238476954,0.7314629258517034,0.7319639278557114,0.7324649298597194,0.7329659318637275,0.7334669338677354,0.7339679358717435,0.7344689378757515,0.7349699398797596,0.7354709418837675,0.7359719438877755,0.7364729458917836,0.7369739478957916,0.7374749498997996,0.7379759519038076,0.7384769539078156,0.7389779559118237,0.7394789579158316,0.7399799599198397,0.7404809619238477,0.7409819639278558,0.7414829659318637,0.7419839679358717,0.7424849699398798,0.7429859719438878,0.7434869739478958,0.7439879759519038,0.7444889779559118,0.7449899799599199,0.7454909819639278,0.7459919839679359,0.7464929859719439,0.746993987975952,0.7474949899799599,0.7479959919839679,0.748496993987976,0.748997995991984,0.749498997995992,0.75]}

},{}],87:[function(require,module,exports){
module.exports={"expected":[0.8134198475976185,0.8142802321219516,0.8151418238991791,0.8160046276047781,0.8168686479412066,0.8177338896381142,0.8186003574525569,0.8194680561692114,0.8203369906005947,0.821207165587283,0.822078585998136,0.8229512567305188,0.8238251827105312,0.8247003688932352,0.8255768202628878,0.8264545418331734,0.8273335386474409,0.8282138157789413,0.8290953783310703,0.8299782314376102,0.8308623802629754,0.8317478300024626,0.8326345858825003,0.8335226531609019,0.8344120371271241,0.835302743102522,0.8361947764406146,0.8370881425273448,0.8379828467813495,0.8388788946542278,0.8397762916308126,0.8406750432294476,0.8415751550022638,0.8424766325354619,0.8433794814495946,0.8442837073998553,0.8451893160763672,0.8460963132044749,0.8470047045450446,0.8479144958947585,0.8488256930864198,0.8497383019892594,0.8506523285092414,0.8515677785893798,0.8524846582100492,0.8534029733893074,0.8543227301832165,0.855243934686169,0.856166593031216,0.857090711390403,0.8580162959751024,0.8589433530363584,0.8598718888652269,0.8608019097931253,0.8617334221921837,0.8626664324756009,0.8636009470980008,0.8645369725558008,0.865474515387573,0.8664135821744214,0.8673541795403534,0.8682963141526603,0.8692399927223023,0.8701852220042962,0.8711320087981068,0.872080359948045,0.8730302823436692,0.8739817829201914,0.8749348686588866,0.8758895465875086,0.8768458237807114,0.8778037073604711,0.8787632044965178,0.8797243224067687,0.8806870683577683,0.8816514496651331,0.8826174736939995,0.8835851478594814,0.8845544796271272,0.8855254765133889,0.8864981460860897,0.8874724959649012,0.8884485338218262,0.8894262673816863,0.8904057044226141,0.8913868527765527,0.8923697203297616,0.8933543150233262,0.8943406448536761,0.8953287178731082,0.896318542190315,0.8973101259709214,0.8983034774380271,0.8992986048727541,0.9002955166148037,0.9012942210630168,0.9022947266759439,0.90329704197242,0.9043011755321483,0.9053071359962888,0.9063149320680568,0.907324572513325,0.9083360661612383,0.9093494219048307,0.9103646487016531,0.9113817555744081,0.9124007516115927,0.9134216459681485,0.91444444786612,0.9154691665953227,0.9164958115140188,0.9175243920495976,0.918554917699272,0.9195873980307783,0.920621842683085,0.9216582613671126,0.9226966638664633,0.9237370600381561,0.9247794598133755,0.9258238731982261,0.9268703102745027,0.9279187812004625,0.9289692962116121,0.9300218656215056,0.9310764998225508,0.9321332092868245,0.9331920045669045,0.9342528962967033,0.9353158951923228,0.9363810120529119,0.9374482577615411,0.9385176432860849,0.939589179680119,0.9406628780838273,0.9417387497249217,0.9428168059195737,0.9438970580733617,0.9449795176822239,0.9460641963334329,0.9471511057065767,0.9482402575745573,0.9493316638045989,0.9504253363592743,0.9515212872975427,0.9526195287758006,0.9537200730489506,0.9548229324714833,0.9559281194985733,0.9570356466871911,0.9581455266972309,0.9592577722926546,0.9603723963426495,0.961489411822806,0.9626088318163075,0.9637306695151415,0.9648549382213242,0.9659816513481456,0.9671108224214293,0.9682424650808124,0.9693765930810444,0.9705132202933026,0.9716523607065267,0.972794028428776,0.9739382376886012,0.9750850028364404,0.9762343383460338,0.9773862588158584,0.9785407789705851,0.9796979136625579,0.9808576778732916,0.9820200867149956,0.9831851554321187,0.9843528994029158,0.985523334141041,0.9866964752971609,0.9878723386605952,0.9890509401609808,0.9902322958699625,0.991416422002905,0.9926033349206376,0.9937930511312201,0.9949855872917388,0.9961809602101297,0.9973791868470271,0.9985802843176459,0.9997842698936878,1.0009911610052822,1.0022009752429524,1.0034137303596173,1.0046294442726214,1.0058481350657986,1.0070698209915676,1.0082945204730607,1.0095222521062872,1.0107530346623326,1.0119868870895885,1.0132238285160244,1.0144638782514916,1.0157070557900656,1.0169533808124294,1.0182028731882917,1.0194555529788467,1.020711440439273,1.0219705560212768,1.023232920375673,1.024498554355013,1.0257674790162519,1.0270397156234656,1.0283152856506081,1.0295942107843197,1.0308765129267776,1.032162214198603,1.0334513369418068,1.0347439037227943,1.0360399373354177,1.03733946080408,1.0386424973868966,1.0399490705789056,1.041259204115341,1.0425729219749547,1.0438902483834045,1.0452112078166955,1.0465358250046872,1.0478641249346574,1.0491961328549326,1.0505318742785839,1.051871374987185,1.0532146610346422,1.0545617587510887,1.0559126947468547,1.0572674959165027,1.0586261894429438,1.059988802801623,1.0613553637647855,1.0627259004058163,1.064100441103668,1.0654790145473632,1.0668616497405843,1.068248376006348,1.0696392229917695,1.0710342206729129,1.0724333993597372,1.0738367897011327,1.0752444226900557,1.0766563296687606,1.078072542334133,1.079493092743124,1.0809180133182923,1.0823473368534517,1.0837810965194299,1.0852193258699394,1.0866620588475662,1.088109329789873,1.089561173435625,1.0910176249311432,1.0924787198367782,1.093944494133519,1.0954149842297327,1.096890226968042,1.0983702596323408,1.0998551199549542,1.1013448461239457,1.1028394767905731,1.1043390510769002,1.105843608583565,1.1073531893977115,1.108867834101086,1.1103875837783037,1.1119124800252933,1.1134425649579132,1.1149778812207611,1.1165184719961618,1.1180643810133573,1.119615652557888,1.121172331481183,1.1227344632103544,1.1243020937582093,1.12587526973348,1.1274540383512817,1.1290384474437989,1.1306285454712133,1.132224381532874,1.1338260053787197,1.1354334674209592,1.1370468187460143,1.1386661111267387,1.1402913970349147,1.1419227296540368,1.1435601628923922,1.1452037513964433,1.1468535505645263,1.148509616560864,1.1501720063299192,1.1518407776110746,1.1535159889536764,1.1551976997324247,1.1568859701631427,1.1585808613189208,1.1602824351466579,1.161990754484,1.163705883076699,1.165427885596396,1.1671568276588453,1.1688927758425942,1.1706357977081268,1.1723859618174892,1.1741433377544153,1.175907996144956,1.1776800086786432,1.1794594481301899,1.1812463883817554,1.183040904445786,1.1848430724884493,1.186652969853688,1.188470675087902,1.1902962679652893,1.1921298295138576,1.193971442042138,1.1958211891666142,1.1976791558398963,1.1995454283796607,1.201420094498387,1.2033032433339081,1.205194965480811,1.2070953530227104,1.2090044995654272,1.210922500271102,1.212849451893277,1.2147854528129753,1.2167306030758156,1.2186850044302007,1.2206487603666099,1.2226219761580412,1.2246047589016413,1.2265972175615618,1.2285994630130948,1.230611608088125,1.2326337676219496,1.234666058501517,1.2367085997151355,1.2387615124037026,1.2408249199135186,1.2428989478507393,1.2449837241375272,1.2470793790699721,1.249186045377842,1.251303858286238,1.2534329555792283,1.2555734776655332,1.2577255676463455,1.2598893713853692,1.2620650375811635,1.2642527178418874,1.2664525667625364,1.2686647420047763,1.2708894043794776,1.2731267179320644,1.2753768500307894,1.2776399714580595,1.279916256504944,1.2822058830689886,1.2845090327554889,1.2868258909823613,1.2891566470887728,1.2915014944476901,1.2938606305825213,1.2962342572880268,1.2986225807556968,1.3010258117037876,1.30344416551223,1.3058778623626333,1.3083271273836148,1.3107921908017064,1.3132732880980866,1.3157706601714283,1.3182845535071375,1.32081522035328,1.323362918903562,1.3259279134876414,1.328510474769175,1.3311108799519724,1.333729412994645,1.3363663648342008,1.3390220336190073,1.3416967249516254,1.3443907521420153,1.3471044364716394,1.3498381074690484,1.3525921031975525,1.3553667705556167,1.3581624655906692,1.3609795538270513,1.3638184106088787,1.3666794214586413,1.3695629824524251,1.3724695006126775,1.3753993943195326,1.3783530937417505,1.381331041288408,1.3843336920825662,1.3873615144581972,1.3904149904817862,1.3934946165000697,1.3966009037155258,1.399734378791314,1.4028955844875104,1.4060850803305955,1.4093034433183158,1.4125512686622046,1.415829170570191,1.4191377830719478,1.422477760889818,1.4258497803583803,1.4292545403959656,1.4326927635317048,1.4361651969919627,1.4396726138503504,1.4432158142458562,1.4467956266740003,1.4504129093563545,1.4540685516942309,1.4577634758128415,1.4614986382027961,1.465275031466425,1.4690936861770942,1.4729556728604258,1.4768621041071894,1.4808141368285386,1.4848129746652912,1.4888598705641334,1.4929561295348222,1.4971031116039675,1.5013022349824905,1.5055549794656478,1.509862890086513,1.5142275810459904,1.5186507399449722,1.5231341323470466,1.527679606703345,1.532289099674697,1.5369646418903355,1.5417083641869906,1.546522504377456,1.5514094146036697,1.5563715693361826,1.5614115740896468,1.566532174932942,1.5717362688827932,1.5770269152816108,1.5824073482739487,1.5878809905118625,1.5934514682378633,1.5991226279156474,1.6048985546038823,1.610783592297787,1.6167823664978525,1.6228998093059321,1.6291411873973858,1.6355121332754983,1.6420186802831778,1.648667301929281,1.655464956186108,1.662419135534455,1.6695379236782921,1.6768300600288477,1.684305013276031,1.691973065634228,1.6998454096833946,1.7079342601432528,1.7162529834421405,1.724816248604631,1.7336402038263379,1.7427426841883673,1.7521434573674641,1.7618645160308983,1.7719304280217885,1.782368758658774,1.793210583806316,1.8044911182729035,1.8162504922343428,1.828534719763203,1.8413969197069877,1.8548988724815862,1.8691130306211254,1.884125152307242,1.9000378058568077,1.9169751168928721,1.9350893298670502,1.9545700890679383,1.975657920974131,1.998664440077225,2.0240037715256145,2.052243645178586,2.084193163999863,2.121064406952077,2.164798289877086,2.2188091258695577,2.290032098532596,2.3966279587764197,2.6297417762102957],"x":[0.75,0.7505006012024048,0.7510012024048096,0.7515018036072144,0.7520024048096192,0.752503006012024,0.7530036072144288,0.7535042084168336,0.7540048096192384,0.7545054108216432,0.755006012024048,0.755506613226453,0.7560072144288578,0.7565078156312626,0.7570084168336674,0.7575090180360722,0.758009619238477,0.7585102204408818,0.7590108216432866,0.7595114228456914,0.7600120240480962,0.760512625250501,0.7610132264529058,0.7615138276553106,0.7620144288577154,0.7625150300601202,0.763015631262525,0.7635162324649298,0.7640168336673346,0.7645174348697394,0.7650180360721442,0.765518637274549,0.7660192384769539,0.7665198396793588,0.7670204408817636,0.7675210420841684,0.7680216432865732,0.768522244488978,0.7690228456913828,0.7695234468937876,0.7700240480961924,0.7705246492985972,0.771025250501002,0.7715258517034068,0.7720264529058116,0.7725270541082164,0.7730276553106212,0.773528256513026,0.7740288577154308,0.7745294589178356,0.7750300601202404,0.7755306613226453,0.7760312625250501,0.7765318637274549,0.7770324649298597,0.7775330661322646,0.7780336673346694,0.7785342685370742,0.779034869739479,0.7795354709418838,0.7800360721442886,0.7805366733466934,0.7810372745490982,0.781537875751503,0.7820384769539078,0.7825390781563126,0.7830396793587174,0.7835402805611222,0.784040881763527,0.7845414829659318,0.7850420841683367,0.7855426853707415,0.7860432865731463,0.7865438877755511,0.7870444889779559,0.7875450901803607,0.7880456913827655,0.7885462925851704,0.7890468937875752,0.78954749498998,0.7900480961923848,0.7905486973947896,0.7910492985971944,0.7915498997995992,0.792050501002004,0.7925511022044088,0.7930517034068136,0.7935523046092184,0.7940529058116232,0.794553507014028,0.7950541082164329,0.7955547094188377,0.7960553106212425,0.7965559118236473,0.7970565130260521,0.7975571142284569,0.7980577154308617,0.7985583166332665,0.7990589178356713,0.7995595190380762,0.800060120240481,0.8005607214428858,0.8010613226452906,0.8015619238476954,0.8020625250501002,0.802563126252505,0.8030637274549098,0.8035643286573146,0.8040649298597194,0.8045655310621243,0.805066132264529,0.8055667334669339,0.8060673346693387,0.8065679358717435,0.8070685370741483,0.8075691382765531,0.8080697394789579,0.8085703406813627,0.8090709418837675,0.8095715430861723,0.8100721442885771,0.810572745490982,0.8110733466933868,0.8115739478957916,0.8120745490981964,0.8125751503006012,0.813075751503006,0.8135763527054108,0.8140769539078156,0.8145775551102205,0.8150781563126253,0.8155787575150301,0.8160793587174349,0.8165799599198397,0.8170805611222445,0.8175811623246493,0.8180817635270541,0.8185823647294589,0.8190829659318637,0.8195835671342685,0.8200841683366733,0.8205847695390781,0.8210853707414829,0.8215859719438878,0.8220865731462926,0.8225871743486974,0.8230877755511022,0.823588376753507,0.8240889779559118,0.8245895791583167,0.8250901803607215,0.8255907815631263,0.8260913827655311,0.8265919839679359,0.8270925851703407,0.8275931863727455,0.8280937875751503,0.8285943887775551,0.8290949899799599,0.8295955911823647,0.8300961923847695,0.8305967935871743,0.8310973947895791,0.8315979959919839,0.8320985971943887,0.8325991983967936,0.8330997995991984,0.8336004008016032,0.834101002004008,0.8346016032064129,0.8351022044088177,0.8356028056112225,0.8361034068136273,0.8366040080160321,0.8371046092184369,0.8376052104208417,0.8381058116232465,0.8386064128256513,0.8391070140280561,0.8396076152304609,0.8401082164328657,0.8406088176352705,0.8411094188376753,0.8416100200400801,0.8421106212424849,0.8426112224448897,0.8431118236472945,0.8436124248496994,0.8441130260521043,0.8446136272545091,0.8451142284569139,0.8456148296593187,0.8461154308617235,0.8466160320641283,0.8471166332665331,0.8476172344689379,0.8481178356713427,0.8486184368737475,0.8491190380761523,0.8496196392785571,0.8501202404809619,0.8506208416833667,0.8511214428857715,0.8516220440881763,0.8521226452905811,0.8526232464929859,0.8531238476953907,0.8536244488977955,0.8541250501002005,0.8546256513026053,0.8551262525050101,0.8556268537074149,0.8561274549098197,0.8566280561122245,0.8571286573146293,0.8576292585170341,0.8581298597194389,0.8586304609218437,0.8591310621242485,0.8596316633266533,0.8601322645290581,0.8606328657314629,0.8611334669338677,0.8616340681362725,0.8621346693386773,0.8626352705410821,0.8631358717434869,0.8636364729458917,0.8641370741482965,0.8646376753507014,0.8651382765531063,0.8656388777555111,0.8661394789579159,0.8666400801603207,0.8671406813627255,0.8676412825651303,0.8681418837675351,0.8686424849699399,0.8691430861723447,0.8696436873747495,0.8701442885771543,0.8706448897795591,0.8711454909819639,0.8716460921843687,0.8721466933867735,0.8726472945891783,0.8731478957915831,0.8736484969939879,0.8741490981963927,0.8746496993987976,0.8751503006012024,0.8756509018036072,0.8761515030060121,0.8766521042084169,0.8771527054108217,0.8776533066132265,0.8781539078156313,0.8786545090180361,0.8791551102204409,0.8796557114228457,0.8801563126252505,0.8806569138276553,0.8811575150300601,0.8816581162324649,0.8821587174348697,0.8826593186372745,0.8831599198396793,0.8836605210420841,0.884161122244489,0.8846617234468938,0.8851623246492986,0.8856629258517034,0.8861635270541082,0.886664128256513,0.8871647294589179,0.8876653306613227,0.8881659318637275,0.8886665330661323,0.8891671342685371,0.8896677354709419,0.8901683366733467,0.8906689378757515,0.8911695390781563,0.8916701402805611,0.8921707414829659,0.8926713426853707,0.8931719438877755,0.8936725450901803,0.8941731462925852,0.89467374749499,0.8951743486973948,0.8956749498997996,0.8961755511022044,0.8966761523046092,0.897176753507014,0.8976773547094188,0.8981779559118237,0.8986785571142285,0.8991791583166333,0.8996797595190381,0.9001803607214429,0.9006809619238477,0.9011815631262525,0.9016821643286573,0.9021827655310621,0.9026833667334669,0.9031839679358717,0.9036845691382765,0.9041851703406814,0.9046857715430862,0.905186372745491,0.9056869739478958,0.9061875751503006,0.9066881763527054,0.9071887775551102,0.907689378757515,0.9081899799599198,0.9086905811623246,0.9091911823647295,0.9096917835671343,0.9101923847695391,0.9106929859719439,0.9111935871743487,0.9116941883767535,0.9121947895791583,0.9126953907815631,0.913195991983968,0.9136965931863728,0.9141971943887776,0.9146977955911824,0.9151983967935872,0.915698997995992,0.9161995991983968,0.9167002004008016,0.9172008016032064,0.9177014028056112,0.918202004008016,0.9187026052104208,0.9192032064128256,0.9197038076152304,0.9202044088176353,0.9207050100200401,0.9212056112224449,0.9217062124248497,0.9222068136272545,0.9227074148296593,0.9232080160320641,0.923708617234469,0.9242092184368738,0.9247098196392786,0.9252104208416834,0.9257110220440882,0.926211623246493,0.9267122244488978,0.9272128256513026,0.9277134268537074,0.9282140280561122,0.928714629258517,0.9292152304609218,0.9297158316633266,0.9302164328657314,0.9307170340681362,0.9312176352705411,0.9317182364729459,0.9322188376753507,0.9327194388777555,0.9332200400801604,0.9337206412825652,0.93422124248497,0.9347218436873748,0.9352224448897796,0.9357230460921844,0.9362236472945892,0.936724248496994,0.9372248496993988,0.9377254509018036,0.9382260521042084,0.9387266533066132,0.939227254509018,0.9397278557114228,0.9402284569138276,0.9407290581162324,0.9412296593186372,0.9417302605210421,0.9422308617234469,0.9427314629258517,0.9432320641282566,0.9437326653306614,0.9442332665330662,0.944733867735471,0.9452344689378758,0.9457350701402806,0.9462356713426854,0.9467362725450902,0.947236873747495,0.9477374749498998,0.9482380761523046,0.9487386773547094,0.9492392785571142,0.949739879759519,0.9502404809619238,0.9507410821643286,0.9512416833667334,0.9517422845691382,0.952242885771543,0.952743486973948,0.9532440881763528,0.9537446893787576,0.9542452905811624,0.9547458917835672,0.955246492985972,0.9557470941883768,0.9562476953907816,0.9567482965931864,0.9572488977955912,0.957749498997996,0.9582501002004008,0.9587507014028056,0.9592513026052104,0.9597519038076152,0.96025250501002,0.9607531062124248,0.9612537074148296,0.9617543086172344,0.9622549098196392,0.962755511022044,0.9632561122244488,0.9637567134268538,0.9642573146292586,0.9647579158316634,0.9652585170340682,0.965759118236473,0.9662597194388778,0.9667603206412826,0.9672609218436874,0.9677615230460922,0.968262124248497,0.9687627254509018,0.9692633266533066,0.9697639278557114,0.9702645290581162,0.970765130260521,0.9712657314629258,0.9717663326653306,0.9722669338677354,0.9727675350701402,0.973268136272545,0.9737687374749499,0.9742693386773547,0.9747699398797596,0.9752705410821644,0.9757711422845692,0.976271743486974,0.9767723446893788,0.9772729458917836,0.9777735470941884,0.9782741482965932,0.978774749498998,0.9792753507014028,0.9797759519038076,0.9802765531062124,0.9807771543086172,0.981277755511022,0.9817783567134268,0.9822789579158316,0.9827795591182364,0.9832801603206412,0.983780761523046,0.9842813627254509,0.9847819639278557,0.9852825651302605,0.9857831663326654,0.9862837675350702,0.986784368737475,0.9872849699398798,0.9877855711422846,0.9882861723446894,0.9887867735470942,0.989287374749499,0.9897879759519038,0.9902885771543086,0.9907891783567134,0.9912897795591182,0.991790380761523,0.9922909819639278,0.9927915831663326,0.9932921843687375,0.9937927855711423,0.9942933867735471,0.9947939879759519,0.9952945891783567,0.9957951903807615,0.9962957915831663,0.9967963927855712,0.997296993987976,0.9977975951903808,0.9982981963927856,0.9987987975951904,0.9992993987975952,0.9998]}

},{}],88:[function(require,module,exports){
module.exports={"expected":[2.6297417762102957,2.6301000913987465,2.6304590832187755,2.630818754323463,2.631179107381778,2.63154014507861,2.6319018701147954,2.632264285207647,2.6326273930904827,2.6329911965130575,2.6333556982419974,2.633720901060329,2.6340868077679196,2.634453421181915,2.6348207441362717,2.635188779482299,2.635557530088704,2.6359269988415246,2.6362971886450937,2.6366681024209573,2.6370397431088364,2.6374121136665756,2.6377852170701925,2.638159056314427,2.6385336344122954,2.638908954395644,2.6392850193150994,2.6396618322406527,2.6400393962610753,2.6404177144849275,2.640796790039984,2.641176626073815,2.641557225753855,2.641938592267458,2.6423207288223876,2.642703638646781,2.643087324989104,2.643471791118652,2.6438570403256105,2.64424307592114,2.6446299012379773,2.645017519629976,2.6454059344727296,2.645795149163529,2.6461851671218874,2.646575991789508,2.6469676266302673,2.647360075130734,2.6477533408002523,2.648147427171149,2.6485423377988213,2.6489380762622727,2.6493346461641,2.6497320511304783,2.650130294811712,2.650529380882211,2.6509293130411646,2.6513300950120926,2.6517317305435,2.652134223408999,2.65253757740742,2.652941796363371,2.653346884127256,2.6537528445752687,2.6541596816099795,2.654567399160455,2.6549760011823826,2.655385491658777,2.655795874599541,2.656207154042058,2.656619334051784,2.657032418721711,2.6574464121735297,2.6578613185571025,2.658277142051177,2.6586938868635426,2.659111557231301,2.6595301574209103,2.659949691729384,2.660370164483192,2.6607915800394593,2.661213942786028,2.6616372571416322,2.662061527556656,2.662486758512732,2.66291295452351,2.6633401201347238,2.6637682599249795,2.6641973785052335,2.6646274805200583,2.6650585706471306,2.665490653598033,2.6659237341184596,2.6663578169884294,2.6667929070229826,2.667229009072277,2.6676661280216964,2.668104268792435,2.668543436342335,2.6689836356647927,2.6694248717914206,2.6698671497897415,2.670310474765998,2.670754851863442,2.6712002862643174,2.6716467831899924,2.6720943478998747,2.6725429856940246,2.6729927019114483,2.6734435019325,2.6738953911771546,2.6743483751076846,2.6748024592275814,2.6752576490817157,2.67571395025841,2.676171368387734,2.676629909144472,2.6770895782457806,2.6775503814541866,2.6780123245758785,2.678475413462833,2.6789396540130346,2.679405052169401,2.6798716139225993,2.680339345309328,2.6808082524148946,2.6812783413715073,2.681749618361387,2.6822220896144224,2.682695761411034,2.6831706400818,2.6836467320070665,2.684124043619869,2.6846025814035754,2.6850823518950957,2.6855633616831946,2.6860456174111915,2.6865291257752784,2.6870138935275207,2.6874999274748474,2.687987234479387,2.6884758214608366,2.688965695394786,2.6894568633160665,2.689949332316405,2.690443109547517,2.690938202220821,2.691434617607285,2.6919323630398826,2.692431445912638,2.6929318736827,2.6934336538693886,2.693936794057,2.694441301893165,2.694947185092094,2.6954544514336654,2.695963108763889,2.6964731649975078,2.696984628116533,2.697497506173148,2.698011807288822,2.698527539656542,2.6990447115399343,2.6995633312759653,2.7000834072747897,2.7006049480203305,2.7011279620723143,2.701652458065426,2.7021784447123864,2.7027059308025527,2.7032349252050327,2.7037654368678807,2.7042974748202306,2.704831048172979,2.705366166118749,2.7059028379348065,2.706441072982312,2.706980880708844,2.707522270647662,2.708065252421017,2.7086098357386907,2.7091560304018016,2.7097038463021277,2.710253293422924,2.710804381842065,2.711357121730777,2.7119115233571174,2.7124675970853582,2.713025353378436,2.713584802798902,2.7141459560091037,2.714708823774494,2.7152734169630772,2.7158397465481428,2.716407823608529,2.7169776593306247,2.717549265009606,2.718122652050548,2.7186978319711352,2.719274816401228,2.7198536170856236,2.7204342458852575,2.7210167147785853,2.721601035863798,2.7221872213594445,2.7227752836065466,2.7233652350707254,2.723957088342914,2.7245508561415406,2.725146551314765,2.7257441868412524,2.7263437758326328,2.726945331535151,2.727548867331369,2.728154396742549,2.72876193343025,2.7293714911979405,2.729983083993498,2.7305967259110595,2.7312124311929247,2.73183021423232,2.7324500895745283,2.7330720719195565,2.733696176124879,2.7343224172064704,2.7349508103424953,2.735581370874417,2.736214114310075,2.736849056325932,2.7374862127695296,2.7381255996618368,2.7387672332003206,2.73941112976121,2.740057305901781,2.7407057783635973,2.741356564074903,2.742009680154144,2.7426651439117493,2.743322972853756,2.743983184684418,2.744645797309771,2.7453108288403567,2.745978297593986,2.7466482220994983,2.7473206210998335,2.747995513555362,2.748672918647085,2.7493528557806592,2.7500353445897385,2.7507204049382383,2.7514080569264685,2.7520983208925944,2.7527912174181677,2.75348676733068,2.7541849917081027,2.754885911883718,2.755589549448116,2.756295926256131,2.7570050644288147,2.7577169863595796,2.758431714717319,2.759149272451757,2.75986968279774,2.760592969280591,2.761319155720793,2.7620482662375516,2.762780325256688,2.763515357512599,2.76425338805639,2.764994442259873,2.765738545820877,2.766485724769524,2.7672360054735754,2.7679894146451707,2.7687459793453937,2.7695057269921097,2.7702686853647847,2.771034882611775,2.771804347256689,2.772577108204911,2.7733531947513304,2.7741326365858843,2.774915463802693,2.775701706904823,2.7764913968146394,2.777284564879995,2.778081242881893,2.778881463043209,2.779685258036511,2.7804926609936196,2.781303705511589,2.7821184256658102,2.7829368560141456,2.7837590316104937,2.784584988011586,2.7854147612876323,2.786248388032993,2.7870859053747883,2.787927350985451,2.788772763090678,2.7896221804836823,2.79047564253367,2.791333189199505,2.792194861039912,2.7930606992265656,2.7939307455563145,2.7948050424634663,2.7956836330350896,2.796566561020321,2.79745387084879,2.798345607640611,2.799241817224357,2.800142546150247,2.8010478417052016,2.8019577519293075,2.8028723256314505,2.8037916124071613,2.804715662652588,2.80564452758658,2.806578259264307,2.8075169105980384,2.808460535375595,2.809409188279346,2.8103629249086235,2.811321801795877,2.8122858764328935,2.8132552072881,2.814229853833006,2.8152098765620828,2.8161953370189474,2.8171862978189206,2.818182822675011,2.819184976424947,2.820192825054543,2.8212064357304705,2.8222258768224413,2.823251217937706,2.8242825299477414,2.8253198850206585,2.826363356652573,2.8274130197014107,2.8284689504205973,2.8295312264920485,2.8305999270664186,2.831675132795384,2.8327569258757856,2.833845390084306,2.8349406108211803,2.836042675151974,2.8371516718507386,2.838267691447997,2.8393908262722483,2.840521170503804,2.8416588202210247,2.842803873453497,2.8439564302348113,2.8451165926590893,2.846284464936244,2.847460153452099,2.848643766830967,2.8498354159951655,2.8510352142366275,2.8522432772793924,2.8534597233531183,2.8546846732655546,2.8559182504780236,2.8571605811854295,2.8584117943954515,2.859672022016297,2.860941398940405,2.862220063140577,2.863508155760521,2.864805821216474,2.8661132072970146,2.867430465270816,2.8687577499968735,2.870095220039137,2.8714430377872855,2.8728013695805483,2.8741703858366128,2.8755502611877946,2.876941174621366,2.8783433096257927,2.879756854344779,2.8811820017355374,2.8826189497359107,2.884067901436787,2.8855290652641186,2.8870026551694643,2.8884888908253714,2.8899879978337335,2.8915002079416054,2.8930257592673603,2.8945648965365485,2.896117871333134,2.8976849423539544,2.8992663756841455,2.9008624450814513,2.9024734322748866,2.904099627280361,2.9057413287270526,2.907398844207529,2.909072490635944,2.910762594636822,2.912469492941709,2.914193532816683,2.9159350725047983,2.9176944816976107,2.919472142029793,2.9212684476003323,2.9230838055281634,2.924918636525678,2.926773375522732,2.928648472310837,2.93054439223362,2.932461616914096,2.934400645028335,2.936361993120202,2.938346196470587,2.9403538100207607,2.942385409344275,2.94444159169737,2.9465229771163908,2.9486302096014994,2.9507639583716263,2.9529249192041584,2.9551138158643684,2.95733140163509,2.9595784609493467,2.961855811137805,2.9641643043041026,2.966504829332682,2.9688783140480717,2.9712857275285054,2.973728082600761,2.9762064385275298,2.9787219038934385,2.981275639741328,2.983868862936237,2.986502849824089,2.9891789401871542,2.991898541536319,2.9946631337727645,2.9974742742619327,3.0003336033576984,3.00324285042434,3.0062038404331566,3.009218501161329,3.012288871101883,3.015417108136568,3.018605499087405,3.021856470240445,3.0251725989683274,3.0285566265962514,3.032011472665605,3.035540250787322,3.0391462863078247,3.0428331360325744,3.0466046103069266,3.050464797806609,3.054418093430243,3.0584692297955516,3.062623312901805,3.0668858626281845,3.071262858902029,3.075760794505534,3.080386735690605,3.0851483920593297,3.090054197443348,3.0951134039391532,3.1003361917641237,3.1057337982296884,3.1113186699843514,3.1171046437709062,3.1231071623510243,3.129343534164232,3.1358332478296305,3.1425983559998794,3.1496639478454598,3.157058735941727,3.1648157925379166,3.172973483443877,3.1815766668495686,3.1906782529746467,3.2003412634716826,3.210641596390356,3.2216718088423764,3.2335464038082504,3.2464094028297206,3.2604455065606373,3.2758971034412427,3.2930912480180643,3.3124845828698093,3.3347427961347758,3.360892469182823,3.3926427767954177,3.4331737619927463,3.4895555036521424,3.584024911001,5.805018683193453],"x":[0.9998,0.9998004008016032,0.9998008016032064,0.9998012024048096,0.9998016032064129,0.9998020040080161,0.9998024048096192,0.9998028056112225,0.9998032064128257,0.9998036072144288,0.9998040080160321,0.9998044088176353,0.9998048096192385,0.9998052104208417,0.9998056112224449,0.9998060120240482,0.9998064128256514,0.9998068136272544,0.9998072144288577,0.9998076152304609,0.9998080160320642,0.9998084168336674,0.9998088176352705,0.9998092184368738,0.999809619238477,0.9998100200400802,0.9998104208416834,0.9998108216432866,0.9998112224448897,0.999811623246493,0.9998120240480962,0.9998124248496995,0.9998128256513027,0.9998132264529058,0.999813627254509,0.9998140280561122,0.9998144288577154,0.9998148296593187,0.9998152304609219,0.999815631262525,0.9998160320641283,0.9998164328657315,0.9998168336673348,0.9998172344689379,0.999817635270541,0.9998180360721443,0.9998184368737475,0.9998188376753507,0.999819238476954,0.9998196392785572,0.9998200400801603,0.9998204408817635,0.9998208416833667,0.99982124248497,0.9998216432865732,0.9998220440881763,0.9998224448897796,0.9998228456913828,0.999823246492986,0.9998236472945893,0.9998240480961924,0.9998244488977955,0.9998248496993988,0.999825250501002,0.9998256513026053,0.9998260521042085,0.9998264529058116,0.9998268537074149,0.9998272545090181,0.9998276553106212,0.9998280561122245,0.9998284569138276,0.9998288577154308,0.9998292585170341,0.9998296593186373,0.9998300601202406,0.9998304609218438,0.9998308617234468,0.9998312625250501,0.9998316633266533,0.9998320641282565,0.9998324649298598,0.9998328657314629,0.9998332665330661,0.9998336673346694,0.9998340681362726,0.9998344689378758,0.999834869739479,0.9998352705410821,0.9998356713426854,0.9998360721442886,0.9998364729458918,0.9998368737474951,0.9998372745490982,0.9998376753507013,0.9998380761523046,0.9998384769539078,0.999838877755511,0.9998392785571143,0.9998396793587173,0.9998400801603207,0.9998404809619238,0.9998408817635271,0.9998412825651303,0.9998416833667333,0.9998420841683366,0.9998424849699398,0.9998428857715431,0.9998432865731463,0.9998436873747496,0.9998440881763526,0.9998444889779557,0.9998448897795591,0.9998452905811622,0.9998456913827656,0.9998460921843686,0.999846492985972,0.9998468937875751,0.9998472945891784,0.9998476953907816,0.9998480961923846,0.9998484969939879,0.999848897795591,0.9998492985971944,0.9998496993987975,0.9998501002004009,0.9998505010020039,0.9998509018036073,0.9998513026052104,0.9998517034068135,0.9998521042084169,0.9998525050100199,0.9998529058116232,0.9998533066132264,0.9998537074148297,0.9998541082164328,0.9998545090180362,0.9998549098196392,0.9998553106212423,0.9998557114228457,0.9998561122244488,0.9998565130260522,0.9998569138276552,0.9998573146292585,0.9998577154308617,0.9998581162324648,0.9998585170340681,0.9998589178356713,0.9998593186372745,0.9998597194388776,0.999860120240481,0.9998605210420841,0.9998609218436875,0.9998613226452905,0.9998617234468936,0.999862124248497,0.9998625250501001,0.9998629258517034,0.9998633266533066,0.9998637274549098,0.9998641282565129,0.9998645290581163,0.9998649298597194,0.9998653306613225,0.9998657314629258,0.9998661322645289,0.9998665330661323,0.9998669338677354,0.9998673346693387,0.9998677354709419,0.9998681362725451,0.9998685370741482,0.9998689378757514,0.9998693386773547,0.9998697394789579,0.9998701402805611,0.9998705410821642,0.9998709418837676,0.9998713426853707,0.999871743486974,0.9998721442885771,0.9998725450901802,0.9998729458917835,0.9998733466933867,0.99987374749499,0.9998741482965932,0.9998745490981964,0.9998749498997995,0.9998753507014027,0.999875751503006,0.9998761523046091,0.9998765531062124,0.9998769539078155,0.9998773547094187,0.999877755511022,0.9998781563126252,0.9998785571142285,0.9998789579158315,0.9998793587174347,0.999879759519038,0.9998801603206412,0.9998805611222444,0.9998809619238476,0.9998813627254508,0.999881763527054,0.9998821643286572,0.9998825651302604,0.9998829659318637,0.9998833667334668,0.99988376753507,0.9998841683366733,0.9998845691382765,0.9998849699398797,0.9998853707414829,0.999885771543086,0.9998861723446892,0.9998865731462925,0.9998869739478957,0.999887374749499,0.9998877755511021,0.9998881763527053,0.9998885771543086,0.9998889779559117,0.9998893787575149,0.9998897795591181,0.9998901803607213,0.9998905811623245,0.9998909819639278,0.999891382765531,0.9998917835671343,0.9998921843687374,0.9998925851703405,0.9998929859719438,0.999893386773547,0.9998937875751502,0.9998941883767534,0.9998945891783566,0.9998949899799598,0.9998953907815631,0.9998957915831662,0.9998961923847693,0.9998965931863726,0.9998969939879758,0.9998973947895791,0.9998977955911823,0.9998981963927855,0.9998985971943887,0.9998989979959918,0.9998993987975952,0.9998997995991983,0.9999002004008015,0.9999006012024046,0.9999010020040079,0.9999014028056111,0.9999018036072143,0.9999022044088176,0.9999026052104207,0.999903006012024,0.9999034068136271,0.9999038076152303,0.9999042084168336,0.9999046092184368,0.99990501002004,0.9999054108216431,0.9999058116232464,0.9999062124248496,0.9999066132264529,0.999907014028056,0.9999074148296592,0.9999078156312624,0.9999082164328656,0.9999086172344689,0.999909018036072,0.9999094188376753,0.9999098196392784,0.9999102204408816,0.9999106212424849,0.9999110220440881,0.9999114228456913,0.9999118236472945,0.9999122244488977,0.9999126252505008,0.9999130260521042,0.9999134268537073,0.9999138276553104,0.9999142284569137,0.9999146292585169,0.9999150300601202,0.9999154308617233,0.9999158316633266,0.9999162324649297,0.999916633266533,0.9999170340681361,0.9999174348697394,0.9999178356713426,0.9999182364729458,0.999918637274549,0.9999190380761521,0.9999194388777555,0.9999198396793586,0.9999202404809618,0.999920641282565,0.9999210420841682,0.9999214428857714,0.9999218436873747,0.9999222444889779,0.999922645290581,0.9999230460921843,0.9999234468937874,0.9999238476953908,0.9999242484969939,0.999924649298597,0.9999250501002003,0.9999254509018035,0.9999258517034068,0.9999262525050099,0.9999266533066132,0.9999270541082163,0.9999274549098195,0.9999278557114227,0.999928256513026,0.9999286573146292,0.9999290581162322,0.9999294589178356,0.9999298597194387,0.9999302605210421,0.9999306613226452,0.9999310621242484,0.9999314629258516,0.9999318637274548,0.999932264529058,0.9999326653306612,0.9999330661322645,0.9999334669338675,0.9999338677354709,0.999934268537074,0.9999346693386773,0.9999350701402805,0.9999354709418837,0.9999358717434869,0.99993627254509,0.9999366733466933,0.9999370741482965,0.9999374749498998,0.9999378757515028,0.9999382765531061,0.9999386773547093,0.9999390781563126,0.9999394789579158,0.9999398797595188,0.9999402805611222,0.9999406813627253,0.9999410821643285,0.9999414829659318,0.999941883767535,0.9999422845691381,0.9999426853707414,0.9999430861723446,0.9999434869739477,0.9999438877755511,0.9999442885771541,0.9999446893787574,0.9999450901803606,0.9999454909819638,0.9999458917835671,0.9999462925851702,0.9999466933867734,0.9999470941883766,0.9999474949899799,0.999947895791583,0.9999482965931863,0.9999486973947894,0.9999490981963927,0.9999494989979959,0.9999498997995991,0.9999503006012024,0.9999507014028055,0.9999511022044086,0.9999515030060119,0.9999519038076151,0.9999523046092184,0.9999527054108216,0.9999531062124247,0.9999535070140279,0.999953907815631,0.9999543086172342,0.9999547094188375,0.9999551102204406,0.9999555110220438,0.9999559118236471,0.9999563126252503,0.9999567134268535,0.9999571142284568,0.9999575150300598,0.999957915831663,0.9999583166332663,0.9999587174348695,0.9999591182364728,0.9999595190380759,0.9999599198396791,0.9999603206412823,0.9999607214428856,0.9999611222444887,0.999961523046092,0.9999619238476951,0.9999623246492984,0.9999627254509016,0.9999631262525048,0.9999635270541081,0.9999639278557111,0.9999643286573144,0.9999647294589176,0.9999651302605208,0.999965531062124,0.9999659318637273,0.9999663326653304,0.9999667334669337,0.9999671342685369,0.99996753507014,0.9999679358717434,0.9999683366733464,0.9999687374749496,0.9999691382765529,0.9999695390781561,0.9999699398797594,0.9999703406813626,0.9999707414829657,0.9999711422845688,0.9999715430861721,0.9999719438877753,0.9999723446893786,0.9999727454909817,0.9999731462925849,0.9999735470941882,0.9999739478957913,0.9999743486973947,0.9999747494989977,0.9999751503006009,0.9999755511022042,0.9999759519038074,0.9999763527054106,0.9999767535070139,0.999977154308617,0.9999775551102201,0.9999779559118235,0.9999783567134266,0.9999787575150298,0.999979158316633,0.9999795591182362,0.9999799599198395,0.9999803607214427,0.9999807615230459,0.9999811623246491,0.9999815631262522,0.9999819639278554,0.9999823647294587,0.9999827655310619,0.9999831663326652,0.9999835671342683,0.9999839679358715,0.9999843687374748,0.9999847695390779,0.9999851703406811,0.9999855711422844,0.9999859719438875,0.9999863727454907,0.999986773547094,0.9999871743486972,0.9999875751503005,0.9999879759519036,0.9999883767535067,0.99998877755511,0.9999891783567132,0.9999895791583164,0.9999899799599197,0.9999903807615228,0.999990781563126,0.9999911823647293,0.9999915831663324,0.9999919839679356,0.9999923847695388,0.999992785571142,0.9999931863727453,0.9999935871743485,0.9999939879759517,0.999994388777555,0.9999947895791581,0.9999951903807612,0.9999955911823645,0.9999959919839677,0.999996392785571,0.9999967935871741,0.9999971943887773,0.9999975951903806,0.9999979959919838,0.9999983967935869,0.9999987975951901,0.9999991983967933,0.9999995991983965,0.9999999999999998]}

},{}],89:[function(require,module,exports){
module.exports={"expected":[5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.805018683193453,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,5.863584748755168,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],"x":[0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999998,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,0.9999999999999999,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0]}

},{}],90:[function(require,module,exports){
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
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var EPS = require( '@stdlib/constants/float64/eps' );
var abs = require( '@stdlib/math/base/special/abs' );
var erfinv = require( './../lib' );


// FIXTURES //

var x1 = require( './fixtures/julia/x_-0.5_0.5.json' );
var x2 = require( './fixtures/julia/x_-0.5_-0.75.json' );
var x3 = require( './fixtures/julia/x_0.5_0.75.json' );
var x4 = require( './fixtures/julia/x_0.75_0.9998.json' );
var x5 = require( './fixtures/julia/x_0.9998_0.9999..8.json' );
var x6 = require( './fixtures/julia/x_0.9999..8_1.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof erfinv, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN`, the function returns `NaN`', function test( t ) {
	var y = erfinv( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `1`, the function returns `+infinity`', function test( t ) {
	var y = erfinv( 1.0 );
	t.equal( y, PINF, 'returns +infinity' );
	t.end();
});

tape( 'if provided `-1`, the function returns `-infinity`', function test( t ) {
	var y = erfinv( -1.0 );
	t.equal( y, NINF, 'returns `-infinity`' );
	t.end();
});

tape( 'if provided `-0`, the function returns `-0`', function test( t ) {
	var y = erfinv( -0.0 );
	t.equal( isNegativeZero( y ), true, 'returns `-0`' );
	t.end();
});

tape( 'if provided `0`, the function returns `0`', function test( t ) {
	var y = erfinv( 0.0 );
	t.equal( isPositiveZero( y ), true, 'returns `+0`' );
	t.end();
});

tape( 'if provided a value which is either less than `-1` or greater than `1`, the function returns `NaN`', function test( t ) {
	var values;
	var i;
	var v;

	values = [
		3.14,
		-3.14,
		-1.00000001,
		1.00000001,
		PINF,
		NINF
	];

	for ( i = 0; i < values.length; i++ ) {
		v = erfinv( values[i] );
		t.equal( isnan( v ), true, 'returns NaN when provided '+values[i] );
	}
	t.end();
});

tape( 'the function evaluates the inverse error function for `x` on the interval `[-0.5,0.5]', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = x1.expected;
	x = x1.x;
	for ( i = 0; i < x.length; i++ ) {
		y = erfinv( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 3.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the inverse error function for `x` on the interval `[-0.5,-0.75]', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = x2.expected;
	x = x2.x;
	for ( i = 0; i < x.length; i++ ) {
		y = erfinv( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 2.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the inverse error function for `x` on the interval `[0.5,0.75]', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = x3.expected;
	x = x3.x;
	for ( i = 0; i < x.length; i++ ) {
		y = erfinv( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 2.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the inverse error function for `x` on the interval `[0.75,0.9998]', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = x4.expected;
	x = x4.x;
	for ( i = 0; i < x.length; i++ ) {
		y = erfinv( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 14.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the inverse error function for `x` on the interval `[0.9998,0.9999..8]', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = x5.expected;
	x = x5.x;
	for ( i = 0; i < x.length; i++ ) {
		y = erfinv( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 9.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the inverse error function for `x` on the interval `[0.9999..8,1]', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = x6.expected;
	x = x6.x;
	for ( i = 0; i < x.length; i++ ) {
		y = erfinv( x[i] );
		if ( expected[ i ] === null ) {
			expected[ i ] = PINF;
		}
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/erfinv/test/test.js")
},{"./../lib":77,"./fixtures/julia/x_-0.5_-0.75.json":84,"./fixtures/julia/x_-0.5_0.5.json":85,"./fixtures/julia/x_0.5_0.75.json":86,"./fixtures/julia/x_0.75_0.9998.json":87,"./fixtures/julia/x_0.9998_0.9999..8.json":88,"./fixtures/julia/x_0.9999..8_1.json":89,"@stdlib/constants/float64/eps":62,"@stdlib/constants/float64/ninf":64,"@stdlib/constants/float64/pinf":65,"@stdlib/math/base/assert/is-nan":69,"@stdlib/math/base/assert/is-negative-zero":71,"@stdlib/math/base/assert/is-positive-zero":73,"@stdlib/math/base/special/abs":75,"tape":283}],91:[function(require,module,exports){
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
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var tryRequire = require( '@stdlib/utils/try-require' );
var EPS = require( '@stdlib/constants/float64/eps' );
var abs = require( '@stdlib/math/base/special/abs' );


// FIXTURES //

var x1 = require( './fixtures/julia/x_-0.5_0.5.json' );
var x2 = require( './fixtures/julia/x_-0.5_-0.75.json' );
var x3 = require( './fixtures/julia/x_0.5_0.75.json' );
var x4 = require( './fixtures/julia/x_0.75_0.9998.json' );
var x5 = require( './fixtures/julia/x_0.9998_0.9999..8.json' );
var x6 = require( './fixtures/julia/x_0.9999..8_1.json' );


// VARIABLES //

var erfinv = tryRequire( resolve( __dirname, './../lib/native.js' ) );
var opts = {
	'skip': ( erfinv instanceof Error )
};


// TESTS //

tape( 'main export is a function', opts, function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof erfinv, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN`, the function returns `NaN`', opts, function test( t ) {
	var y = erfinv( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `1`, the function returns `+infinity`', opts, function test( t ) {
	var y = erfinv( 1.0 );
	t.equal( y, PINF, 'returns +infinity' );
	t.end();
});

tape( 'if provided `-1`, the function returns `-infinity`', opts, function test( t ) {
	var y = erfinv( -1.0 );
	t.equal( y, NINF, 'returns `-infinity`' );
	t.end();
});

tape( 'if provided `-0`, the function returns `-0`', opts, function test( t ) {
	var y = erfinv( -0.0 );
	t.equal( isNegativeZero( y ), true, 'returns `-0`' );
	t.end();
});

tape( 'if provided `0`, the function returns `0`', opts, function test( t ) {
	var y = erfinv( 0.0 );
	t.equal( isPositiveZero( y ), true, 'returns `+0`' );
	t.end();
});

tape( 'if provided a value which is either less than `-1` or greater than `1`, the function returns `NaN`', opts, function test( t ) {
	var values;
	var i;
	var v;

	values = [
		3.14,
		-3.14,
		-1.00000001,
		1.00000001,
		PINF,
		NINF
	];

	for ( i = 0; i < values.length; i++ ) {
		v = erfinv( values[i] );
		t.equal( isnan( v ), true, 'returns NaN when provided '+values[i] );
	}
	t.end();
});

tape( 'the function evaluates the inverse error function for `x` on the interval `[-0.5,0.5]', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = x1.expected;
	x = x1.x;
	for ( i = 0; i < x.length; i++ ) {
		y = erfinv( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 3.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the inverse error function for `x` on the interval `[-0.5,-0.75]', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = x2.expected;
	x = x2.x;
	for ( i = 0; i < x.length; i++ ) {
		y = erfinv( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 2.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the inverse error function for `x` on the interval `[0.5,0.75]', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = x3.expected;
	x = x3.x;
	for ( i = 0; i < x.length; i++ ) {
		y = erfinv( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 2.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the inverse error function for `x` on the interval `[0.75,0.9998]', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = x4.expected;
	x = x4.x;
	for ( i = 0; i < x.length; i++ ) {
		y = erfinv( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 14.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the inverse error function for `x` on the interval `[0.9998,0.9999..8]', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = x5.expected;
	x = x5.x;
	for ( i = 0; i < x.length; i++ ) {
		y = erfinv( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 9.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the inverse error function for `x` on the interval `[0.9999..8,1]', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = x6.expected;
	x = x6.x;
	for ( i = 0; i < x.length; i++ ) {
		y = erfinv( x[i] );
		if ( expected[ i ] === null ) {
			expected[ i ] = PINF;
		}
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/erfinv/test/test.native.js","/lib/node_modules/@stdlib/math/base/special/erfinv/test")
},{"./fixtures/julia/x_-0.5_-0.75.json":84,"./fixtures/julia/x_-0.5_0.5.json":85,"./fixtures/julia/x_0.5_0.75.json":86,"./fixtures/julia/x_0.75_0.9998.json":87,"./fixtures/julia/x_0.9998_0.9999..8.json":88,"./fixtures/julia/x_0.9999..8_1.json":89,"@stdlib/constants/float64/eps":62,"@stdlib/constants/float64/ninf":64,"@stdlib/constants/float64/pinf":65,"@stdlib/math/base/assert/is-nan":69,"@stdlib/math/base/assert/is-negative-zero":71,"@stdlib/math/base/assert/is-positive-zero":73,"@stdlib/math/base/special/abs":75,"@stdlib/utils/try-require":151,"path":165,"tape":283}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":93}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_p.js":94,"./polyval_q.js":95,"@stdlib/constants/float64/exponent-bias":63,"@stdlib/constants/float64/ninf":64,"@stdlib/math/base/assert/is-nan":69,"@stdlib/number/float64/base/get-high-word":101,"@stdlib/number/float64/base/set-high-word":104}],94:[function(require,module,exports){
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

},{}],95:[function(require,module,exports){
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

},{"./main.js":99}],99:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],100:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":48}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":100,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],103:[function(require,module,exports){
arguments[4][100][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":48,"dup":100}],104:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":103,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],106:[function(require,module,exports){
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

},{"./main.js":107}],107:[function(require,module,exports){
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

},{}],108:[function(require,module,exports){
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

},{"./main.js":109,"./regexp.js":110,"@stdlib/utils/define-nonenumerable-read-only-property":128}],109:[function(require,module,exports){
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

},{"./main.js":109}],111:[function(require,module,exports){
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

},{"./is_number.js":114}],112:[function(require,module,exports){
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

},{"./is_number.js":114,"./zero_pad.js":118}],113:[function(require,module,exports){
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

},{"./main.js":116}],114:[function(require,module,exports){
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

},{}],115:[function(require,module,exports){
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

},{"./format_double.js":111,"./format_integer.js":112,"./is_string.js":115,"./space_pad.js":117,"./zero_pad.js":118}],117:[function(require,module,exports){
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

},{}],118:[function(require,module,exports){
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

},{"./main.js":120}],120:[function(require,module,exports){
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

},{}],121:[function(require,module,exports){
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

},{"./main.js":123}],122:[function(require,module,exports){
arguments[4][115][0].apply(exports,arguments)
},{"dup":115}],123:[function(require,module,exports){
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

},{"./is_string.js":122,"@stdlib/string/base/format-interpolate":113,"@stdlib/string/base/format-tokenize":119}],124:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

// MAIN //

var Sym = ( typeof Symbol === 'function' ) ? Symbol : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = Sym;

},{}],126:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":127}],127:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-buffer":39,"@stdlib/regexp/function-name":108,"@stdlib/utils/native-class":146}],128:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":133}],130:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MAIN //

var main = ( typeof Object.defineProperty === 'function' ) ? Object.defineProperty : null;


// EXPORTS //

module.exports = main;

},{}],132:[function(require,module,exports){
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

},{"./define_property.js":131}],133:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":130,"./has_define_property_support.js":132,"./polyfill.js":134}],134:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":121}],135:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./native.js":138,"./polyfill.js":139,"@stdlib/assert/is-function":45}],136:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./detect.js":135,"@stdlib/object/ctor":106}],138:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],139:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./proto.js":140,"@stdlib/utils/native-class":146}],140:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./codegen.js":142,"./global_this.js":143,"./self.js":144,"./window.js":145,"@stdlib/assert/is-boolean":33,"@stdlib/string/format":121}],142:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],143:[function(require,module,exports){
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

// MAIN //

var obj = ( typeof self === 'object' ) ? self : null;


// EXPORTS //

module.exports = obj;

},{}],145:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],146:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":147,"./polyfill.js":148,"@stdlib/assert/has-tostringtag-support":20}],147:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":149}],148:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":149,"./tostringtag.js":150,"@stdlib/assert/has-own-property":16}],149:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MODULES //

var Symbol = require( '@stdlib/symbol/ctor' );


// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{"@stdlib/symbol/ctor":124}],151:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-error":41}],153:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./fixtures/nodelist.js":154,"./fixtures/re.js":155,"./fixtures/typedarray.js":156}],154:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/global":141}],155:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var typedarray = Int8Array; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = typedarray;

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

},{"./check.js":153,"./main.js":158,"./polyfill.js":159}],158:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/constructor-name":126}],159:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/constructor-name":126}],160:[function(require,module,exports){
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

},{}],161:[function(require,module,exports){

},{}],162:[function(require,module,exports){
arguments[4][161][0].apply(exports,arguments)
},{"dup":161}],163:[function(require,module,exports){
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
},{"base64-js":160,"buffer":163,"ieee754":266}],164:[function(require,module,exports){
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

},{}],165:[function(require,module,exports){
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
},{"_process":273}],166:[function(require,module,exports){
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

},{"events":164,"inherits":267,"readable-stream/lib/_stream_duplex.js":168,"readable-stream/lib/_stream_passthrough.js":169,"readable-stream/lib/_stream_readable.js":170,"readable-stream/lib/_stream_transform.js":171,"readable-stream/lib/_stream_writable.js":172,"readable-stream/lib/internal/streams/end-of-stream.js":176,"readable-stream/lib/internal/streams/pipeline.js":178}],167:[function(require,module,exports){
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

},{}],168:[function(require,module,exports){
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
},{"./_stream_readable":170,"./_stream_writable":172,"_process":273,"inherits":267}],169:[function(require,module,exports){
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
},{"./_stream_transform":171,"inherits":267}],170:[function(require,module,exports){
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
},{"../errors":167,"./_stream_duplex":168,"./internal/streams/async_iterator":173,"./internal/streams/buffer_list":174,"./internal/streams/destroy":175,"./internal/streams/from":177,"./internal/streams/state":179,"./internal/streams/stream":180,"_process":273,"buffer":163,"events":164,"inherits":267,"string_decoder/":282,"util":161}],171:[function(require,module,exports){
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
},{"../errors":167,"./_stream_duplex":168,"inherits":267}],172:[function(require,module,exports){
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
},{"../errors":167,"./_stream_duplex":168,"./internal/streams/destroy":175,"./internal/streams/state":179,"./internal/streams/stream":180,"_process":273,"buffer":163,"inherits":267,"util-deprecate":291}],173:[function(require,module,exports){
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
},{"./end-of-stream":176,"_process":273}],174:[function(require,module,exports){
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
},{"buffer":163,"util":161}],175:[function(require,module,exports){
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
},{"_process":273}],176:[function(require,module,exports){
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
},{"../../../errors":167}],177:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],178:[function(require,module,exports){
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
},{"../../../errors":167,"./end-of-stream":176}],179:[function(require,module,exports){
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
},{"../../../errors":167}],180:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":164}],181:[function(require,module,exports){
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

},{"./":182,"get-intrinsic":257}],182:[function(require,module,exports){
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

},{"es-define-property":242,"es-errors/type":248,"function-bind":256,"get-intrinsic":257,"set-function-length":277}],183:[function(require,module,exports){
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

},{"./lib/is_arguments.js":184,"./lib/keys.js":185}],184:[function(require,module,exports){
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

},{}],185:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],186:[function(require,module,exports){
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

},{"es-define-property":242,"es-errors/syntax":247,"es-errors/type":248,"gopd":258}],187:[function(require,module,exports){
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

},{"define-data-property":186,"has-property-descriptors":259,"object-keys":271}],188:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],189:[function(require,module,exports){
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

},{"./ToNumber":220,"./ToPrimitive":222,"./Type":227}],190:[function(require,module,exports){
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

},{"../helpers/isFinite":235,"../helpers/isNaN":236,"../helpers/isPrefixOf":237,"./ToNumber":220,"./ToPrimitive":222,"es-errors/type":248,"get-intrinsic":257}],191:[function(require,module,exports){
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

},{"call-bind/callBound":181,"es-errors/type":248}],192:[function(require,module,exports){
'use strict';

var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value) {
	return RequireObjectCoercible(value, arguments.length > 1 ? arguments[1] : void undefined);
};

},{"es-object-atoms/RequireObjectCoercible":250}],193:[function(require,module,exports){
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

},{"./DayWithinYear":196,"./InLeapYear":200,"./MonthFromTime":210,"es-errors/eval":243}],194:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":241,"./floor":231}],195:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":231}],196:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":194,"./DayFromYear":195,"./YearFromTime":229}],197:[function(require,module,exports){
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

},{"./modulo":232}],198:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":239,"./IsAccessorDescriptor":201,"./IsDataDescriptor":203,"es-errors/type":248}],199:[function(require,module,exports){
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

},{"../helpers/timeConstants":241,"./floor":231,"./modulo":232}],200:[function(require,module,exports){
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

},{"./DaysInYear":197,"./YearFromTime":229,"es-errors/eval":243}],201:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":239,"es-errors/type":248,"hasown":265}],202:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":268}],203:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":239,"es-errors/type":248,"hasown":265}],204:[function(require,module,exports){
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

},{"./IsAccessorDescriptor":201,"./IsDataDescriptor":203,"./IsPropertyDescriptor":205,"es-errors/type":248}],205:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor(Desc);
};

},{"../helpers/records/property-descriptor":239}],206:[function(require,module,exports){
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

},{"../helpers/isFinite":235,"../helpers/timeConstants":241}],207:[function(require,module,exports){
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

},{"../helpers/isFinite":235,"./DateFromTime":193,"./Day":194,"./MonthFromTime":210,"./ToInteger":219,"./YearFromTime":229,"./floor":231,"./modulo":232,"get-intrinsic":257}],208:[function(require,module,exports){
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

},{"../helpers/isFinite":235,"../helpers/timeConstants":241,"./ToInteger":219}],209:[function(require,module,exports){
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

},{"../helpers/timeConstants":241,"./floor":231,"./modulo":232}],210:[function(require,module,exports){
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

},{"./DayWithinYear":196,"./InLeapYear":200}],211:[function(require,module,exports){
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

},{"../helpers/isNaN":236}],212:[function(require,module,exports){
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

},{"../helpers/timeConstants":241,"./floor":231,"./modulo":232}],213:[function(require,module,exports){
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

},{"./Type":227}],214:[function(require,module,exports){
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


},{"../helpers/isFinite":235,"./ToNumber":220,"./abs":230,"get-intrinsic":257}],215:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":241,"./DayFromYear":195}],216:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":241,"./modulo":232}],217:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],218:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":220}],219:[function(require,module,exports){
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

},{"../helpers/isFinite":235,"../helpers/isNaN":236,"../helpers/sign":240,"./ToNumber":220,"./abs":230,"./floor":231}],220:[function(require,module,exports){
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

},{"./ToPrimitive":222,"call-bind/callBound":181,"safe-regex-test":276}],221:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = require('es-object-atoms/ToObject');

},{"es-object-atoms/ToObject":251}],222:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":253}],223:[function(require,module,exports){
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

},{"./IsCallable":202,"./ToBoolean":217,"./Type":227,"es-errors/type":248,"hasown":265}],224:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":257}],225:[function(require,module,exports){
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

},{"../helpers/isFinite":235,"../helpers/isNaN":236,"../helpers/sign":240,"./ToNumber":220,"./abs":230,"./floor":231,"./modulo":232}],226:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":220}],227:[function(require,module,exports){
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

},{}],228:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":194,"./modulo":232}],229:[function(require,module,exports){
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

},{"call-bind/callBound":181,"get-intrinsic":257}],230:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":257}],231:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],232:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":238}],233:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":241,"./modulo":232}],234:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":189,"./5/AbstractRelationalComparison":190,"./5/Canonicalize":191,"./5/CheckObjectCoercible":192,"./5/DateFromTime":193,"./5/Day":194,"./5/DayFromYear":195,"./5/DayWithinYear":196,"./5/DaysInYear":197,"./5/FromPropertyDescriptor":198,"./5/HourFromTime":199,"./5/InLeapYear":200,"./5/IsAccessorDescriptor":201,"./5/IsCallable":202,"./5/IsDataDescriptor":203,"./5/IsGenericDescriptor":204,"./5/IsPropertyDescriptor":205,"./5/MakeDate":206,"./5/MakeDay":207,"./5/MakeTime":208,"./5/MinFromTime":209,"./5/MonthFromTime":210,"./5/SameValue":211,"./5/SecFromTime":212,"./5/StrictEqualityComparison":213,"./5/TimeClip":214,"./5/TimeFromYear":215,"./5/TimeWithinDay":216,"./5/ToBoolean":217,"./5/ToInt32":218,"./5/ToInteger":219,"./5/ToNumber":220,"./5/ToObject":221,"./5/ToPrimitive":222,"./5/ToPropertyDescriptor":223,"./5/ToString":224,"./5/ToUint16":225,"./5/ToUint32":226,"./5/Type":227,"./5/WeekDay":228,"./5/YearFromTime":229,"./5/abs":230,"./5/floor":231,"./5/modulo":232,"./5/msFromTime":233}],235:[function(require,module,exports){
'use strict';

var $isNaN = require('./isNaN');

module.exports = function (x) { return (typeof x === 'number' || typeof x === 'bigint') && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{"./isNaN":236}],236:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],237:[function(require,module,exports){
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

},{"call-bind/callBound":181}],238:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],239:[function(require,module,exports){
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

},{"es-errors/type":248,"hasown":265}],240:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],241:[function(require,module,exports){
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

},{}],242:[function(require,module,exports){
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

},{"get-intrinsic":257}],243:[function(require,module,exports){
'use strict';

/** @type {import('./eval')} */
module.exports = EvalError;

},{}],244:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Error;

},{}],245:[function(require,module,exports){
'use strict';

/** @type {import('./range')} */
module.exports = RangeError;

},{}],246:[function(require,module,exports){
'use strict';

/** @type {import('./ref')} */
module.exports = ReferenceError;

},{}],247:[function(require,module,exports){
'use strict';

/** @type {import('./syntax')} */
module.exports = SyntaxError;

},{}],248:[function(require,module,exports){
'use strict';

/** @type {import('./type')} */
module.exports = TypeError;

},{}],249:[function(require,module,exports){
'use strict';

/** @type {import('./uri')} */
module.exports = URIError;

},{}],250:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

/** @type {import('./RequireObjectCoercible')} */
module.exports = function RequireObjectCoercible(value) {
	if (value == null) {
		throw new $TypeError((arguments.length > 0 && arguments[1]) || ('Cannot call method on ' + value));
	}
	return value;
};

},{"es-errors/type":248}],251:[function(require,module,exports){
'use strict';

var $Object = require('./');
var RequireObjectCoercible = require('./RequireObjectCoercible');

/** @type {import('./ToObject')} */
module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

},{"./":252,"./RequireObjectCoercible":250}],252:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Object;

},{}],253:[function(require,module,exports){
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

},{"./helpers/isPrimitive":254,"is-callable":268}],254:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],255:[function(require,module,exports){
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

},{}],256:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":255}],257:[function(require,module,exports){
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

},{"es-errors":244,"es-errors/eval":243,"es-errors/range":245,"es-errors/ref":246,"es-errors/syntax":247,"es-errors/type":248,"es-errors/uri":249,"function-bind":256,"has-proto":260,"has-symbols":261,"hasown":265}],258:[function(require,module,exports){
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

},{"get-intrinsic":257}],259:[function(require,module,exports){
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

},{"es-define-property":242}],260:[function(require,module,exports){
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

},{}],261:[function(require,module,exports){
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

},{"./shams":262}],262:[function(require,module,exports){
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

},{}],263:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":262}],264:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":256}],265:[function(require,module,exports){
'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);

},{"function-bind":256}],266:[function(require,module,exports){
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

},{}],267:[function(require,module,exports){
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

},{}],268:[function(require,module,exports){
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

},{}],269:[function(require,module,exports){
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

},{"call-bind/callBound":181,"has-tostringtag/shams":263}],270:[function(require,module,exports){
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

},{"./isArguments":272}],271:[function(require,module,exports){
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

},{"./implementation":270,"./isArguments":272}],272:[function(require,module,exports){
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

},{}],273:[function(require,module,exports){
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

},{}],274:[function(require,module,exports){
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
},{"_process":273,"through":289,"timers":290}],275:[function(require,module,exports){
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

},{"buffer":163}],276:[function(require,module,exports){
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

},{"call-bind/callBound":181,"es-errors/type":248,"is-regex":269}],277:[function(require,module,exports){
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

},{"define-data-property":186,"es-errors/type":248,"get-intrinsic":257,"gopd":258,"has-property-descriptors":259}],278:[function(require,module,exports){
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

},{"es-abstract/es5":234,"function-bind":256}],279:[function(require,module,exports){
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

},{"./implementation":278,"./polyfill":280,"./shim":281,"define-properties":187,"function-bind":256}],280:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":278}],281:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":280,"define-properties":187}],282:[function(require,module,exports){
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
},{"safe-buffer":275}],283:[function(require,module,exports){
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
},{"./lib/default_stream":284,"./lib/results":286,"./lib/test":287,"_process":273,"defined":188,"through":289,"timers":290}],284:[function(require,module,exports){
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
},{"_process":273,"fs":162,"through":289}],285:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":273,"timers":290}],286:[function(require,module,exports){
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
},{"_process":273,"events":164,"function-bind":256,"has":264,"inherits":267,"object-inspect":288,"resumer":274,"through":289,"timers":290}],287:[function(require,module,exports){
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
},{"./next_tick":285,"deep-equal":183,"defined":188,"events":164,"has":264,"inherits":267,"path":165,"string.prototype.trim":279}],288:[function(require,module,exports){
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

},{}],289:[function(require,module,exports){
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
},{"_process":273,"stream":166}],290:[function(require,module,exports){
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
},{"process/browser.js":273,"timers":290}],291:[function(require,module,exports){
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
},{}]},{},[90,91]);
