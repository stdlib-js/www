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

},{"./uint16array.js":24,"@stdlib/assert/is-uint16array":52,"@stdlib/constants/uint16/max":65}],24:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint32array.js":27,"@stdlib/assert/is-uint32array":54,"@stdlib/constants/uint32/max":66}],27:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint8array.js":30,"@stdlib/assert/is-uint8array":56,"@stdlib/constants/uint8/max":67}],30:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/native-class":131}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":34,"./object.js":35,"./primitive.js":36,"@stdlib/utils/define-nonenumerable-read-only-property":113}],34:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./try2serialize.js":38,"@stdlib/assert/has-tostringtag-support":20,"@stdlib/boolean/ctor":60,"@stdlib/utils/native-class":131}],36:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/get-prototype-of":121,"@stdlib/utils/native-class":131}],43:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":131}],45:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/type-of":142}],47:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":51,"@stdlib/assert/tools/array-function":58,"@stdlib/utils/define-nonenumerable-read-only-property":113}],51:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":131}],54:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":131}],56:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":131}],58:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-array":31,"@stdlib/string/format":106}],60:[function(require,module,exports){
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

},{"@stdlib/number/ctor":79}],64:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/ninf":63}],72:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/pinf":64}],74:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Return a double-precision floating-point number with the magnitude of `x` and the sign of `x*y`.
*
* @module @stdlib/math/base/special/flipsign
*
* @example
* var flipsign = require( '@stdlib/math/base/special/flipsign' );
*
* var z = flipsign( -3.0, 10.0 );
* // returns -3.0
*
* z = flipsign( -3.0, -1.0 );
* // returns 3.0
*
* z = flipsign( 1.0, -0.0 );
* // returns -1.0
*
* z = flipsign( -3.0, -0.0 );
* // returns 3.0
*
* z = flipsign( -0.0, 1.0 );
* // returns -0.0
*
* z = flipsign( 0.0, -1.0 );
* // returns -0.0
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

var SIGN_MASK = require( '@stdlib/constants/float64/high-word-sign-mask' );
var toWords = require( '@stdlib/number/float64/base/to-words' );
var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var fromWords = require( '@stdlib/number/float64/base/from-words' );


// VARIABLES //

// High/low words workspace:
var WORDS = [ 0>>>0, 0>>>0 ]; // asm type annotation


// MAIN //

/**
* Returns a double-precision floating-point number with the magnitude of `x` and the sign of `x*y`.
*
* @param {number} x - number from which to derive a magnitude
* @param {number} y - number from which to derive a sign
* @returns {number} a double-precision floating-point number
*
* @example
* var z = flipsign( -3.0, 10.0 );
* // returns -3.0
*
* @example
* var z = flipsign( -3.0, -1.0 );
* // returns 3.0
*
* @example
* var z = flipsign( 1.0, -0.0 );
* // returns -1.0
*
* @example
* var z = flipsign( -3.0, -0.0 );
* // returns 3.0
*
* @example
* var z = flipsign( -0.0, 1.0 );
* // returns -0.0
*
* @example
* var z = flipsign( 0.0, -1.0 );
* // returns -0.0
*/
function flipsign( x, y ) {
	var hx;
	var hy;

	// Split `x` into higher and lower order words:
	toWords.assign( x, WORDS, 1, 0 );
	hx = WORDS[ 0 ];

	// Extract the higher order word from `y`:
	hy = getHighWord( y );

	// Leave only the sign bit of `y` turned on (if on):
	hy &= SIGN_MASK;

	// Flip the sign bit of `x` only when the sign bit of `y` is on:
	hx ^= hy; // 1^1=0 (flipped), 0^1=1 (flipped), 1^0=1 (unchanged), 0^0=0 (unchanged)

	// Return a new value having the same magnitude as `x`, but with the sign of `x*y`:
	return fromWords( hx, WORDS[ 1 ] );
}


// EXPORTS //

module.exports = flipsign;

},{"@stdlib/constants/float64/high-word-sign-mask":62,"@stdlib/number/float64/base/from-words":81,"@stdlib/number/float64/base/get-high-word":85,"@stdlib/number/float64/base/to-words":88}],76:[function(require,module,exports){
module.exports={"expected":[-0.29687281941651933,-0.3719112180251198,-0.20074509588756603,-0.4278441849525588,0.3909767254001207,0.22638148312213704,0.9777328257346785,0.8320787442619315,-0.5772198470653408,-0.20338527285348942,1.1079743672694407,-0.7752842229805124,1.726205312486667,1.5880230338704675,-0.471411994075143,-1.4388419552412628,-2.6170422795355726,4.483849165933191,-4.811775465982656,-4.489570355705129,4.41243570591512,-6.631075776439774,-10.945507996514966,4.503581889139265,4.145328449175907,-11.353201427552566,4.05602741867751,-21.787691241845923,5.23983138741237,13.994765156771892,-22.67411883941929,34.03951713523708,-18.96189698883642,-18.412834465934065,33.66786547185526,30.97214244617078,-0.7131477772270823,-31.750062464316382,-43.75493700667522,112.74696827913182,-24.845897694907812,113.71036307743724,121.65338119273395,-61.936101048673834,6.817644897228639,-89.77219187047788,-298.27479744959356,143.20924529930446,-412.27712299516145,102.57371058038908,452.8417774872916,-448.5734903892334,163.48046854805955,-391.7309906829562,493.7678863666252,1142.419224200148,-683.1538877192096,170.08619151434922,995.0206571693088,923.1916417059856,1780.460770114224,-2856.364385057521,-1525.2033604678584,-1793.7242415442095,3804.2273493521775,131.7691100189674,2930.3460566691615,5608.679680092377,6694.833202629879,2652.453199949115,-7919.184241139325,-1930.3306328909969,5877.876566872212,286.7832144706004,-6130.710446147636,6461.90576908936,23130.97383957136,-24412.14541687986,4551.088602046307,7689.076482466305,8514.603293050981,41951.357617378926,-25289.993595211934,-63894.16061764399,-22295.04632447857,81252.93660884025,-74820.78927805804,52490.22042597498,-94939.83413012189,-9236.854860233409,-117954.3703523836,135577.58064371085,-12829.536405147559,64214.896186141,-91531.03211534824,49848.12526475043,138759.05789809994,342987.01156647614,178764.19253723708,-125754.63747224786,243024.5671025292,540948.2750649686,-584100.834922629,-181781.54991613585,1.1172064673818056e6,75423.76624573527,-1.6432890013134028e6,-266618.30733749864,-1.2347904122320472e6,936722.0158695794,-145887.79955369668,1.1916003386162692e6,-843412.3849244599,4.475838040175209e6,2.740049677604018e6,3.3673896892998423e6,771398.484890837,7.415307879859116e6,-5.1478374548443975e6,-8.926463017680258e6,-3.7145904661443955e6,6.036830919600249e6,1.0826038373424256e7,-1.3462615819491373e7,-2.9996700310665043e6,-1.2912563827856181e7,-2.808989985655428e6,1.4972015559946917e7,1.9539377874079306e7,-2.14090376889797e7,3.2485471462412678e7,5.808411835855657e7,-5.13237706722867e6,7.149655948497376e7,-1.9025572515584614e7,-4.324636435005067e7,-3.202562647887947e7,-1.0593280469091089e8,7.576265263370168e7,1.0335941076910542e8,-1.3806056751491407e8,1.7895230659511608e8,-1.7571777392983344e8,-2.248681356223159e8,-3.1097409040404224e8,-1.6616800473052844e8,6.014472161352726e7,-2.329612634052467e8,-2.9721922114373606e8,4.3597821766357934e8,6.147134300125825e8,4.491267509467228e8,5.351243218339019e8,-1.2060012659348855e9,4.3052427689534193e8,-9.560944480014372e8,1.7624065019431465e9,1.78670824868283e9,-2.311028634174676e9,3.688008124233156e7,3.3283215577921367e9,4.612514313618403e8,3.3346847798275123e9,-3.854002358989489e9,3.467899877880679e8,-3.2538849790158944e9,2.8015888449683404e8,5.553546123525297e9,-5.025442050511453e9,-5.144355862447561e9,-7.418192444162984e9,-1.5269200107907764e10,1.040960985413325e10,8.204446319704369e8,3.4183863813690925e9,2.3615575577221466e10,-3.4516901879627396e10,-3.2564238063125084e10,4.347404113240841e10,-3.3593997734360466e10,-3.287242804199878e10,-4.793565030010073e10,7.429605685931519e9,1.1826620753784388e10,8.419960308845792e10,-1.0704785210930952e11,-4.539072377092293e10,-5.165897342029408e10,9.770193596540001e10,-1.9777369600607077e11,4.4639350966773224e10,-2.2307663490115353e11,-2.7200127694247867e11,-3.635567397065083e11,-4.721702239249358e10,-1.3078751093230571e11,4.713213888028077e11,-5.1579619138287006e11,5.004471789446946e11,-2.5008688151048767e11,3.317181316068029e11,5.3594258949175183e11,-1.0872312112160568e12,-2.274970646539067e11,-7.571343079382651e11,1.2111384205237322e12,1.983618320064565e12,-1.6939678535941506e12,-1.3735347984975522e12,-9.644181246514742e11,-1.683220120912985e12,-8.469255122454966e11,1.0725008262555471e12,6.008782628381823e10,6.18229926099178e12,-1.4448616049290664e12,-7.274239175721663e12,9.499910869181562e12,-3.557601358644862e12,2.0959372850092449e12,-1.5116013916391273e13,-1.1145793645953775e13,3.662348435187559e12,-4.907474192222595e12,2.8210400657602383e13,-3.3267697308481945e13,-3.4092664862791703e13,4.731698719677558e13,-1.0203904729998006e13,-5.741761753570648e13,5.101115663169261e13,-6.700063161418863e13,2.4594325394775883e13,8.745448284260903e13,5.219694007386306e13,-4.7483048815969805e13,7.702112350270039e13,-1.6360648517422125e14,-1.940880212679318e14,-5.221439942564483e13,1.0041776333902552e14,1.1580459432309025e13,1.5718553396569172e14,1.9115860609402246e13,-3.223164527847944e14,3.9463560516766525e14,1.989127759906204e14,-7.642144382707178e14,-6.5752086108627055e13,6.099379649234698e14,5.1567837886946194e14,1.312521054861317e15,-1.56662561866027e15,7.335316731319899e14,-1.6609635793116445e15,2.3327012975925753e14,2.6484787247213385e15,-1.237498611957419e15,2.59535523615229e15,-3.660709086890531e15,-3.6947063652533645e15,-7.44231498254965e14,-3.05531048580574e14,2.3671836636193324e13,6.7488062466228e15,7.75392404600823e15,-6.20035192813969e15,1.2825610081980574e16,-1.126818418765951e16,-1.2617738947077844e16,-1.745409747270185e15,1.5821780320872552e16,2.4345017725788772e16,2.20781226639426e16,2.828929054941896e16,2.1398596087719395e15,-3.696841610260804e16,-4.6894009139544296e16,1.1809907965959016e16,-4.744190063789879e16,1.5978891155008614e16,-2.1516075802049924e16,3.103001980580207e16,9.784281416791406e16,8.463078835025648e16,-1.480406182762393e17,1.129102399290093e17,1.276831689862708e17,-2.526418899850334e17,-6.741222807329392e15,-2.5234168343763972e16,-2.997859681222045e17,-4.101880411310816e17,2.748503537120135e17,-3.73944850510963e17,5.20364731237723e17,4.0813501786199123e17,-2.7571330800554576e17,5.197849471990531e17,4.650270864772198e17,-7.164513742504511e17,2.3157547173424637e17,1.21912894418552e18,-9.433586878557813e16,2.673919687875127e17,-2.604520819631876e18,-1.663047355066575e18,-3.559299575714727e18,3.0152836863612273e18,-5.081114245727473e18,-1.577810981744146e18,-1.9328116944469908e18,2.2782610722959375e18,6.361657719853561e18,-2.318891707582188e18,-1.9386853848131592e18,6.215707330059606e18,-7.675153219211539e18,1.5576195191529435e19,-7.133260705508959e18,-2.3005999512426696e18,7.806608523062458e18,3.721895100278702e18,3.692486509509604e19,1.434986114254741e19,9.3878085392416e18,5.446896311235247e19,1.0546484275902906e19,6.327846902230333e19,-8.736394886148805e19,1.0092590272824007e20,-1.7309020892001681e19,-1.0553190781054943e20,1.093791239501274e20,-2.343662748557548e19,-7.251454855804201e18,-8.197062152029987e19,-1.374272041001158e20,6.823367947275504e19,-1.4844742479456256e20,3.180624584863883e20,-3.391365106821515e20,5.2973518496095594e20,7.706444502205193e19,-1.4457183479682718e20,-4.808222131157164e20,2.3420014876917845e20,-1.0287624253459064e20,9.126197887658109e20,1.5237503166489024e21,7.191460712017345e20,1.3662749635733008e21,1.3711511328439007e21,1.7801190330042045e21,1.5288318700837764e21,-8.395118277021148e20,-3.1769070204942056e21,-2.4521811031931266e21,-6.172626299854839e20,-1.012465640471772e21,4.835386613541512e21,7.64462950100978e20,7.217489389803932e21,-2.121849745764465e21,-5.143771920142259e21,7.024875728046861e21,1.0164266365380924e22,-9.132605027648552e21,2.0043580958553774e22,-7.987290558997094e21,3.2020856582362675e21,-2.421979933392731e22,1.085279947851574e22,3.129772199798926e22,-5.569487055668861e20,2.7816129733731746e22,1.2407629783346736e22,4.3059338249272755e22,-6.164201239814291e22,-2.4176222825884473e22,5.8128032435980904e22,4.291067938674374e22,-6.7610702331682365e22,7.996845218779518e22,1.3678812659754956e23,-1.910379743885002e23,1.334878618522281e23,1.590593341584638e23,3.396483537521705e23,1.0237455769698807e23,-1.8699484113395985e23,-1.0181714518370678e23,5.83834474847607e23,7.671849678995732e23,-4.034959768516296e23,4.446581673629542e23,4.951866243739917e22,1.224935099720393e24,-4.2571873227912956e23,5.44305579059956e23,-1.8103165799654876e24,-1.1913079822678469e24,-1.9420703852185568e24,1.4653305905912152e24,-2.5690930760180107e24,-2.984970086514549e24,2.43353034974817e24,-5.610636161468355e24,5.183803083951965e24,-1.830530263874011e24,-3.533158380734515e23,8.355977332916244e24,-1.00132679590501e25,-4.457657168242088e24,-4.27707130221269e24,-3.991264055207231e23,-1.9228991934570353e25,-7.139307569636857e24,8.959739910025723e23,2.4096163076160005e24,1.7141912183849757e25,-3.3329381497863633e25,4.658182611840346e25,4.651431397315731e25,-6.2010631036273545e25,1.0666311492983908e25,-5.6698097145585e25,5.69045060584093e24,9.548542073409161e24,8.503680973297715e25,-6.5399727812539564e25,8.55828694047309e25,3.8397616469906857e25,-6.419342858890062e25,2.3817135606480915e26,-9.458275243700326e25,3.386752354550615e26,6.1654682594175465e25,-2.4320644757183905e26,4.177905509374636e26,2.5091383799443676e26,3.257758002964635e26,1.397276424025318e26,-1.816256206163508e26,-5.466490601586533e26,-1.24496854491646e27,-7.093761283969022e26,7.809425714472186e26,1.647406571761609e26,-3.9605837936234645e26,-2.152010880768707e26,-6.337019501939958e26,2.8224852925980213e27,1.2067117296699297e27,3.160364006059039e27,3.3625649408067256e27,-8.848026870082797e26,-4.725325484561365e27,2.859073733691327e27,-7.182075735650816e27,4.865836046360166e27,-1.2082240949161115e28,-1.0511219163997968e28,1.6700375476689243e27,1.1602666791523577e28,1.4950809669086768e28,1.8322965492174627e28,-1.2445168360645268e27,-1.9561673309443702e28,-2.0721736832272808e28,3.8783913343583914e28,-2.444908850453772e28,-2.0361610458253637e28,-6.556899350959646e27,2.525604778582787e28,3.065914544843358e27,2.4355331028728697e28,4.603303664762201e28,-4.958404935365402e28,5.757210941255577e28,1.5742051771219797e29,-7.184406573213427e28,-1.2222275496895792e29,2.6186902265804056e29,1.5572635777341665e29,2.2294240256386903e29,-2.7857175671758878e29,1.3344187346919812e29,5.587707951769491e28,-2.618223681522609e29,-4.1630864133109865e29,5.6034818647088396e29,4.1822093311851826e29,3.157996609085493e28,-3.702408447705683e29,-1.0305792264994877e30,-1.3695930540179212e30,3.416363631481674e29,1.3419980045625428e30,1.0375467908074105e30,7.527938765895545e28,-3.35561139402043e30,2.564105778317207e30,-4.400002069277675e30,-2.5565930836125187e30,1.4203028919959846e29,1.031939037945823e30,8.160069392826107e30,-4.8766773088318696e30,-7.056111863433833e30,7.946515962109849e30,-8.431966219443818e30,1.380341593362712e31,-1.1358383532661233e30,-3.6059779796278425e30,-1.8933992081775655e31,5.234220596998978e30,-2.0752404154177183e31,-7.94059825196115e29,-7.020832332034627e28,-5.257182479283719e31,-3.6025908023827554e29,3.068295698270542e31,-6.205624864546891e31,-1.8796379434043031e31,-6.541403816913027e31,3.2618745664412557e31,-4.9411344136071495e30,6.908749300208044e31,1.4887789759076148e32,-9.579152384257612e31,1.3086342261191816e32,-2.308522345088372e30,2.7490320697765978e32,-3.6107217058702945e32,-1.4688931584141966e32,-4.379576021945032e31,1.1716116008514473e32,1.3336368922490008e32,-3.2224763089818676e32,5.891659553948573e32,-7.278170789209023e32,-1.4324502280024346e32,1.3657623997889808e33,-6.329729597412197e32,-1.1433057851260489e33,1.711027344885701e33,-6.4532131783825946e32,-1.99900016844086e32,-2.6280872239667546e33,-2.3375082760099266e32,3.343639748846137e33,-3.1627376886112897e33,-1.2707079795740544e33,-6.611422166483574e33,-5.350869172968454e33,-4.105611998170525e33,5.156296873308934e32,-6.372068683215145e33,-5.909697413956277e33,5.99799064809134e33,1.6558384982888854e34,-1.3087456726010125e34,-5.984882886062001e33,-1.5496452053927772e34,-2.5613049994113008e33,2.5736716808014433e34,-2.940975463982327e34,2.2631994684780475e34,-1.3509382987753383e34,4.420358801314885e34,2.876358217809297e33,6.881800500001505e34,9.228145209621654e34,-1.26215758602019e34,-1.0126635832692533e35,4.1351797621692944e34,-1.3858621458704187e35,2.2089327281970353e34,1.6740423455899365e35,-3.746314806519457e34,1.6590652768441145e35,-1.5369233768002402e35,2.0048290205340126e35,1.312631690559359e35,2.273234731835296e34,5.436932402844193e35,2.45095052903643e35,-4.6896644266422436e35,-6.789249629679382e35,6.703034409158763e35,1.1753062336383984e36,3.1112306040415535e34,4.464069366215831e35,-1.5987391461617308e36,7.048383766701775e35,7.990821922907708e35,1.2176450082884746e36,-3.0919002635282836e36,-6.341591180962933e35,1.6577533121783367e36,1.3443351167946253e36,4.3489649558963304e36,-5.256163222484528e36,1.6935415827404333e36,5.366523974487861e36,-2.1591233170112782e36,6.500513252816928e36,-5.748079831583194e36,-8.252434440216494e36,-1.027882073823109e37,9.388079623182029e36,-1.46752857124338e37,1.5173396083206299e37,8.623167012002834e36,-3.5676017587829217e37,-1.1282244473714843e37,9.463294467517035e36,4.645291723472199e37,5.69100134299671e37,-5.215711290968063e37,8.74013187879031e37,8.496811860039559e37,-1.0397105530135257e38,-2.861408812480199e37,8.7246223375951e37,-1.4802263018555604e38,-2.0020417291903747e38,7.846255462729736e37,-2.5378623822005888e38,2.8107168068213796e38,-3.4143489907987326e38,-9.163550720135016e37,-2.8441452127807268e38,-3.650859071429093e38,-4.7944295741840375e38,-4.2778641547715386e38,-8.883957819243891e37,-6.6903374107774234e38,2.851777641912269e38,-9.687714689579908e38,-1.112037407909224e39,-1.501495659340542e39,-1.551200572986901e39,1.4329416173792262e39,-1.267738544945726e39,2.515813418449694e39,-1.5865527894322079e38,-3.2054581638824274e38,3.5363224122110315e39,4.84272125042056e39,-1.7926399439602037e39,6.969905975192727e39,-6.081418676851649e39,-2.4751888832460093e39,1.0905089910806238e40,1.000992587016684e40,-6.965351922757865e39,-4.8372552394547963e39,-3.9172615719036575e39,4.400792457961251e38,-5.305322024844569e39,-1.3472658292933755e40,8.47610805740512e39,-3.1544675881302805e40,-1.8416339488623324e40,4.572914821173696e40,5.749477036306411e39,-8.677861075466182e39,-3.8216592839095245e40,-4.997505877748111e40,4.413683211148461e39,-5.9972218382464515e40,-7.725579234967062e40,1.0807067405436429e41,1.6644935592916012e41,7.070680017599826e40,-4.045539902082849e40,4.689270037358098e40,1.9313102677614528e41,3.5308282698707655e41,-2.5980550617771783e41,3.276965481599401e41,3.840875845478511e41,-6.539367250185417e41,2.7325276094027646e40,2.072965714415395e41,8.306304937717486e40,-1.1398748036745819e42,-5.039581472006376e41,5.670867833935086e41,-3.4461398094097397e41,1.8067018676432838e42,4.2828293351499445e41,-1.925480101393545e42,-2.372725954158644e42,2.205484348471649e42,6.8498615641966094e41,-7.389789040187127e41,-3.3153104788643225e41,-3.749991801740514e42,1.8981640451663186e42,4.5799303738969137e42,-2.1317445178910742e42,5.866016437103083e42,1.417730875117788e42,-8.356170041119752e42,-6.62913393331543e42,-1.2012413882783956e43,-2.266595758058078e43,2.5160864800326683e43,-2.433263383219379e43,2.1095832793250636e43,1.9925435919399003e43,1.1188004053946371e43,-4.280806557471509e43,5.203221287654794e43,-3.2873503934873116e43,-7.841506931173392e43,-6.375242135627657e43,9.583259762481195e43,9.716477505030654e43,-6.714635477874561e43,4.485059216780914e43,-8.897792886894066e43,-1.3313372940468098e44,1.8261872361908987e44,-2.125150055946571e44,2.653884058553413e44,-1.7810566374036002e44,3.6135103143393476e44,4.629886334452001e44,-3.6747860425815675e44,-4.753763401100489e43,-3.5210647234058165e43,-6.315235135953801e44,-9.666000793949706e44,-1.583071310470827e44,7.059282040427912e43,1.6579710168666326e45,1.0465556083266739e45,-1.5273192611570333e45,3.932588163834285e44,-1.1599981931901033e45,-1.9680945325778816e45,-3.5552248074834826e45,5.26338576486968e44,-1.3175170426619201e45,6.748209716411674e44,5.4190802624656824e45,6.159659261494404e45,4.3101886538358856e45,8.180690995211494e45,-1.7218835916171313e45,7.491391895890858e45,-1.534537394451365e46,4.862839903095966e45,-2.305195602168938e45,2.3396177608195727e46,1.9134240745338846e46,-1.6755966617117603e45,-8.621883882021205e45,-3.042448197064317e46,-1.1449254444201374e46,2.956537264672683e46,-3.103612881946284e46,-2.7366019488743845e46,-5.407708477643015e45,8.802051332615005e45,-1.5975447899291688e45,-4.2747037052584215e46,-4.85930588877011e46,-1.4546658487445589e47,-9.980203668975257e46,5.736028389403609e46,-1.4988059968526688e47,-1.6044098090965001e47,-7.643147607708388e46,-3.8641563941242475e47,2.6189572996310646e47,4.512715180489663e47,-5.3021535130387504e47,-1.1901686782182281e47,-3.2324146333573055e47,5.628849768857727e47,-8.376911142426436e47,-4.031745852298949e47,-1.3121963249855299e48,9.002563815112531e47,9.437554589303944e47,1.7111848044180782e48,2.429202231867296e48,1.927005202675253e48,3.102069575102596e47,1.0663106712927007e48,-4.2222098810348895e47,-2.6093782189498482e48,2.627154666222278e48,-6.983689529587247e48,-8.233799641629707e48,1.4679366466547097e48,4.053438814196925e48,3.25226920658591e48,6.603790829383835e48,-4.559908789220368e48,-1.890400156626097e49,-1.520243213012041e49,-1.0010637371949338e49,-1.8655078871130486e49,2.403330822244164e49,-2.3009455122371148e49,-3.19705730341735e49,1.4268430753766003e48,2.2181044548150405e49,5.888926739853398e49,6.393864091258324e49,-2.0449687002478172e49,7.529390760666576e47,-7.052139227363931e48,1.890358164950312e49,7.417104998979482e49,-8.693634567227515e48,-1.2219496972109439e50,2.155413486766368e50,3.8772577838445606e49,-2.1560563688396313e50,-2.9018534705872346e50,2.925086115832133e50,1.180880112503248e49,-4.989183118327345e50,-4.958410529458215e50,6.038925587694237e49,-6.060926940011407e50,8.310933057356418e50,6.927321866756907e50,6.944193322093095e50,1.5310499488423607e51,-4.823858239729643e50,-1.5619553229415922e51,-1.5183481545921726e51,-1.5662148046362217e51,2.3058295998031506e51,-3.605400500892466e51,2.27719001900625e51,2.950371808329043e51,2.1591805171859517e51,5.9032927321058463e51,5.5853746175555435e51,-4.600439903474451e51,-9.54608612065557e51,1.3514325494240698e51,-4.2820710816981445e51,3.835911009212234e51,1.2898092343713703e52,4.5661465193798185e51,-1.1960312486517493e51,-1.3993469023976786e52,1.9849229204013203e52,2.1586732930054127e52,2.0481378111619908e52,-3.736934885892899e52,-4.549690338474469e52,4.5130518066667995e52,-3.2709217988405974e52,6.67619602521427e52,2.934205241444052e52,-6.23390601456843e49,6.148402986927775e51,-2.1386995203633388e52,-6.909155593678805e52,2.8546100590503475e52,9.114506848171686e52,-1.507684889008363e53,-2.440495540308555e53,-2.427160038007267e52,3.861433000109306e53,-1.6096751754260684e53,2.1128377900291685e53,5.399634455699955e53,-1.5652825728242826e53,3.1819422583822156e53,-4.05526669779661e53,-7.5882307287218205e53,6.367311063627382e53,1.1499430280610215e54,1.2581486277003947e54,7.4479484799693065e53,-3.1838299323581763e53,3.173658129827104e53,-2.2618984635794576e54,-1.895503701409463e54,-1.113903131067192e54,3.702210872427029e54,-2.1997718032980128e51,5.777672919957725e54,-6.38500229975015e54,-6.980457773835203e54,-2.3872611298190855e53,8.92963216208967e53,-6.518290115267288e54,-1.0340199498785607e54,-4.412600226898467e54,1.3318562493148305e55,-6.82809392148352e54,2.3854523987022255e55,-6.885599200628666e54,2.653317540159699e55,-8.484505885562182e54,6.136972878450143e53,-4.92798481979332e55,-1.7242174990548182e55,-3.8537968590084096e55,-2.714622601961018e55,1.3893483947605215e55,4.419534415791757e55,-2.508500337347082e55,-1.1453366160726769e55,-1.2994335919649776e56,-1.586996664745393e56,-1.8313805454864937e56,1.4877944213504327e56,2.189414033217304e56,6.87249907903239e55,-3.538894249037542e56,2.3798655377770108e56,4.711014421593191e56,-5.477975357053157e55,9.95235944481006e55,-2.7357269881890403e56,-1.4306226126650538e56,8.290180981020816e56,-9.864052728383311e56,2.9585785463685766e56,6.631475434294788e56,-5.181727559297276e56,1.70200462960086e57,-8.835914226153189e56,-9.010644827233055e56,1.4817138418572605e57,8.406183458847986e56,-3.319509932122928e57,-2.7459489509675233e57,-1.7976463271508395e57,1.9906431106610303e57,5.984795322925642e56,6.491661174411079e57,2.8359303067579443e57,-5.153842687505274e57,9.745116130804268e57,5.860620844117119e57,-2.4290045112048998e57,1.0555561052602027e58,-1.893656360783531e58,-1.7231933422182844e58,2.5408479126605514e58,2.4922816902316506e58,2.43199012940722e58,1.4539890780103804e58,-3.135732936192957e58,4.750949536902902e58,2.0864812889177836e57,1.9272460420620912e58,9.045255190947022e58,-5.778103590175579e58,-1.2599260434823935e58,-6.786790478767668e58,-6.786220765753791e58,1.3348602667970137e59,-7.821228868658768e58,-2.087950079987462e59,-1.7571506095316507e59,-6.187708046239251e58,-2.059823112190605e59,1.222212538667129e59,7.131364377666441e58,1.0286472684014165e59,3.865221960409999e59,6.94095031198336e58,-6.581054720697701e59,8.846813947336275e59,-5.1374089681423166e59,-1.2093252788956545e60,-3.428028169254153e59,-1.5848693397706086e60,-1.5847823638006538e60,1.769084890719848e60,-1.3557279602458099e60,-1.2487391686493611e60,-1.156050451742151e60,-1.3135187506958476e60,2.9694806709761825e60,5.1812584483379044e60,-4.761835810080515e59,-5.741274490455314e60,-3.275722930115745e60,9.306616564777832e60,7.767165141209072e60,6.575775010959535e60,-1.8501428172296234e60,7.921312617975688e60,7.223883826817869e60,2.142611309996476e61,3.1664203398239724e60,-7.509614617328686e60,-1.79459936780805e61,6.492756441757618e60,-4.5905591090921045e61,-6.040384125430554e60,-2.7737095807173794e61,-6.58915848895027e61,-7.744261271324722e61,8.505816943135753e61,-9.256055752680539e61,6.85578911832421e61,4.971808035637409e61,5.153983953796979e61,1.7605510588982703e61,-1.8551801368649527e62,8.967213830360202e61,7.145187073935151e61,2.333702957105009e62,3.328873812463624e62,-1.9754138077179217e62,-7.130240262313244e61,5.25388596020803e62,3.1390826737452e62,-2.411916640317604e62,9.515871711030721e61,8.40476427357122e62,1.0979338100264168e62,1.3868548879111793e63,-5.813936166131923e62,2.6321562036840462e62,5.139070336893395e62,-7.390260564571483e62,8.399479506610283e62,-2.165280590063891e63,3.354845469448757e63,-1.0335475502480848e63,1.2282340295272465e63,2.343613355285463e63,-1.8583125264539907e63,-7.471952309434077e63,-1.5580535799737013e62,-4.273642269619834e63,9.955792506602497e63,3.708994544907249e63,1.5611640608828485e64,-3.79450280835317e62,1.1098592275269113e63,1.9347979010407713e64,-1.5668154118668277e64,-1.8712800628122334e64,1.6365646980824236e64,-3.755140649718459e64,4.718687337874066e64,3.281795151395348e64,-1.810336864342528e64,-5.357632751236446e64,-5.556186309255649e64,2.296104853095242e64,1.5889239432499932e64,7.758855631227203e63,-1.2178632987686218e65,-8.6465048181942e64,1.1926087493290435e65,-8.350077666058806e64,2.0594446569661603e65,-2.0100922675994767e65,2.7393317199931977e63,5.553143455769424e64,1.623771434697983e65,-3.554052831685009e65,6.143970934899108e65,6.905087732166363e65,1.1858270191144e64,-3.42842401663196e65,-1.077793218390688e66,-6.238124128458051e65,-3.6981191229999215e65,8.268680784579501e65,1.084254008039246e66,1.7094729830088085e66,7.464355540468203e65,-2.3206186924415446e66,-1.6216194996135387e66,-2.791820612987066e66,-1.3500617835373678e66,-5.225515162975814e66,-3.0135929564315786e66,3.630930318847552e66,7.616373875470436e66,6.989170184456162e66,5.241171134579801e66,7.648064293136429e66,8.401760518457376e66,1.2326291288879422e67,7.035008562858594e66,-1.0244718642523266e67,-1.0237129612190226e67,1.7521544763551847e67,1.4768148284160924e67,1.856253487932e67,-1.478009095751137e67,-1.392250605008752e67,4.8761090406031124e66,-2.1151271232958062e67,5.354875180879936e67,5.16413650056103e66,8.997540218013691e67,-2.897424571383555e67,1.7201159490610066e67,3.076533940865922e67,7.501379099009492e67,-1.1599669763777303e68,1.4166774603567634e67,-2.5412550646264145e68,6.822219739860327e67,-3.0912633456886903e68,-2.5968089628631343e68,3.015463049085565e68,-3.3246154985095314e68,2.2586644385461505e68,-7.179792998667896e68,-6.31219049938554e68,3.994027442175829e68,4.792817174909682e68,-6.676850575255825e68,3.576581445592233e68,4.0796921296255895e68,2.3932865316777535e68,-1.1259391576196683e69,1.3548166085496333e69,-2.7746320790399824e69,-9.331441991312302e68,1.0446166605028163e69,1.1118229358381874e69,3.3105875061395805e69,2.6603948996762495e69,2.8690348641586694e69,6.980100650046584e69,-2.7230174050661873e69,7.678750258243794e69,2.117489492646272e69,-7.199062135603698e69,5.495841665533401e69,-1.6544561110678146e70,-9.189392433652313e69,1.6665074406673517e70,-3.993124227690041e69,3.1196788638183098e69,-1.3414658701240353e70,2.056676629407744e69,5.068072485856893e70,5.595592237083421e70,-5.398740252425969e70,3.4746200083554426e69,2.922168365331784e70,9.964766592911878e70,-4.092996343056195e70,-3.036572888155732e69,-1.3174174500554064e71,-3.26165764329936e70,-1.4255224459819965e71,-2.0066527845186336e71,2.7226981786837504e71,1.1459911856909581e71,3.2148051377285825e71,2.433761105852591e71,-4.777540163161444e70,5.193264311570936e71,4.106187672936125e71,6.729594910376343e71,2.0799867596545284e71,-3.4085030575063243e69,9.842503200621493e71,-2.739263515877846e71,-1.2739751822449741e72,4.742843053045316e71,-1.773021361844161e72,1.163819337007929e72,-2.687848329651661e72,3.019990784152384e72,2.636971889606863e71,-3.2461587491728962e72,-4.649914863870596e71,1.897412795160467e72,-3.1275155785534608e72,3.570447296038862e72,-1.3109125663497255e72,5.952087383638138e72,4.1687570251121844e72,-4.729005312186297e72,-5.640746806663596e72,1.187429206145611e73,-1.5821315701581568e73,5.367950360081176e72,2.2475964324072045e73,-1.468547304843082e73,-3.187428293084394e73,2.279647685944023e73,-5.9976608506630804e72,1.8272576978305752e73,-2.482601917381848e73,-6.8390557674880004e72,-8.373593765371964e73,-5.83923496510065e73,9.329632444601564e72,4.572535606578178e73,1.226993270757526e74,8.504743629905278e73,1.9488618014661375e74,8.011696535318052e73,-1.9467191771206666e74,5.1366053838911294e73,-1.678380715872867e74,-2.5076522244136337e74,1.8977046671449888e74,-2.880409022086828e74,1.3394648333499106e74,9.608220988568824e73,5.403858463474295e74,7.699185951845748e74,7.647528263451302e74,2.273281899626552e74,-2.744942348026229e74,7.791579622485946e74,-6.56190970527156e74,-2.0343942961546157e75,-1.8435702128986903e75,-2.280004980151538e75,-9.892089059304253e73,-3.494210787255566e75,2.632832325149513e74,4.139013636346918e74,-1.1386455191255904e75,-6.856442951833079e75,-6.123722029033605e75,7.92264808781027e75,2.2987835137122674e75,-9.978776992197754e74,-6.0075808270137076e75,-1.243934733484642e75,5.494550723483345e75,3.1685221872184084e74,-1.9161167421699813e76,-1.3313495921889647e76,-1.1107151734308042e76,-2.4273206693546166e76,2.7629340672521563e76,2.7991350958025405e75,2.4591025321244822e76,-1.2351557216921473e76,1.2111625988864609e76,4.481058797537274e76,-9.727937692361482e76,-4.690254900188431e76,-1.5171119720916947e76,1.5375464732222444e77,-2.9762365496226325e76,1.4500253207639497e77,-1.106154775123702e77,1.497883293087332e77,3.0527994735685056e77,-1.969203474470456e77,3.483441720522948e76,-4.0137585063043365e77,7.596679499141182e75,3.119820216473361e76,6.687589745701905e77,3.6087370227460616e76,-3.597905046197639e77,5.142643434936651e77,-2.353116534452282e77,-1.366775732434422e77,-1.0462999962631306e78,1.4650760506451692e77,1.9008533378978244e78,2.4789678767198187e78,2.5722907700312526e78,-3.9838543307483017e77,2.3224017282089717e78,-1.9337389528946574e78,1.318826915918275e78,3.912168549850267e78,-1.5323101958920705e78,2.4119393288605617e77,-8.47609683295818e78,-1.3121519586452358e78,-8.843907993913869e78,1.224965625730463e79,1.3097000607572247e79,-1.5763238136657296e79,1.289607991852558e79,3.746653674251121e78,-1.804081004945641e79,-3.3203476818219906e79,-8.160440672516131e78,-3.1707562447769547e77,3.1864537494456083e79,5.032272227945601e79,1.5871443547889414e79,-7.287684555353187e79,4.825596096985109e79,8.46737509476759e79,-3.736334298346894e79,8.447629018913341e79,1.2013530022436972e80,4.185832103228933e79,4.7148085790175796e79,1.2246820604018342e80,1.3864874268390295e80,2.074952138727928e80,3.0764019093747136e80,1.748550357768245e80,-2.12081682868605e80,-4.3866596464840077e80,-2.6704790643807205e80,4.1317850223519526e80,5.508282230871565e80,-5.221148591329684e80,2.0068329019541283e80,6.889851817209877e80,-6.82459764137389e79,3.5014335340194806e80,5.254611021104842e80,1.9438355559481593e81,1.2036388229061327e81,-1.3413825403655732e81,-1.369048822753516e81,-3.4970004719738172e81,-8.795020767252775e80,-4.223349437150117e81,5.554832212084941e80,-3.643070298399954e81,7.3501139386290925e81,2.8224773584360847e81,1.423882991710394e81,-1.637860340423246e81,5.536100971183778e81,-1.4380630497365943e82,-2.2388057326798363e81,-8.852484794287787e81,1.10146531036071e82,2.8587601453750093e82,3.225861096099687e82,8.13982913314439e81,4.492102947660882e82,1.1769443736589941e82,9.556711818047502e81,-7.114156477304459e81,-7.44031528227105e82,-6.111826818234046e82,-4.7351052739077417e82,5.287573527850671e82,-6.727939265033436e82,-1.515233507923482e83,1.364872588174381e83,-1.3023853989542157e83,5.1696624561035664e82,2.385393748036619e83,-2.3546188686714745e83,-2.1892718256687407e83,-1.7607900682727258e83,-1.919184440037986e83,3.498632193701902e83,5.227998487243745e83,7.238918599036213e83,-6.749325569453193e82,6.773066577056664e83,1.1544108837043246e84,-9.896784951223608e83,1.5666042490333819e84,-1.0276473484276872e84,7.178145162290347e83,2.4950480010161535e84,-1.0236505288268976e84,2.383408926816663e84,2.6832599905890865e84,-3.2939441767394055e84,-3.798412149143508e84,4.475652345900057e84,-4.328757113640776e84,-4.784070150775065e84,7.7321268800046995e84,4.950990505583298e84,5.049512718003105e84,-1.6609892414429547e83,1.3514706675947603e85,1.4478503563720326e85,1.4401313736975314e85,2.2006171514717605e85,1.133934682213242e85,2.805925050033463e85,2.5041673293356616e85,3.994331210849534e85,1.8450493287439337e85,2.1245846306862937e85,2.3452993276537338e85,2.8258662058813247e85,-7.86884922695916e85,4.830911497084076e85,-3.243274577063438e85,6.0427503366344466e85,6.107305559146188e84,-5.339848229663716e85,1.5086079037179359e86,-6.816924409792467e85,-1.184534288709384e86,1.0472319573633791e86,1.1001676035080162e86,1.4760975904842155e86,-2.957369834641693e86,1.77715378292066e86,2.937581187815173e86,4.078978782537154e86,-9.852939494128679e85,-6.906632718982613e86,2.676824899950669e86,-1.2652194293482945e87,3.916104557841647e86,-7.155163467653579e84,-1.7299940515051983e87,2.2588488637752533e87,-2.2163672515074543e87,-1.5905466478824052e87,2.8788009330533566e87,3.3218934128898513e87,2.6550143880199027e87,1.4430411856962785e87,-4.546304363778722e87,-1.7245361304681984e87,-1.2450433668788825e86,-2.4150184860898983e87,5.690675634055498e87,-8.471209707110294e87,5.478211085008173e87,5.698233504818744e87,-5.9335928288247215e87,3.2723336111213687e86,-1.4515286907629194e88,-4.79215954664119e87,2.366053969789713e88,3.472529659158393e88,-1.5782113899164653e88,4.804644451872227e88,-1.5198356064655019e88,3.892511227409542e88,-4.669500645709571e88,-5.55994222002492e88,8.21714673267399e88,9.173538938410049e88,8.552097698777036e88,1.0513032572158397e89,-9.961508200457994e88,1.8823665091155263e89,2.2004651246884103e89,-8.287400331350266e88,7.885982728392558e88,2.9194942543665574e89,-2.9686036983989555e89,-2.96836538167694e89,6.879031060662217e88,-2.1820947245572416e89,3.2950228069779736e89,4.596935101477192e89,-2.074541320346962e89,-1.023020047008829e90,-6.369539464483967e89,-2.6952586523913057e89,1.0176941894930946e90,-1.5825028808810273e90,2.0523568652360006e90,-9.904867438377946e89,-1.979703101265054e90,-2.5080410102860655e89,-2.3937580676326932e89,1.2088966642867388e90,-3.004206075488669e90,3.0028732079378138e90,-3.6399594480504993e90,-5.013706610348178e90,-6.454172801585524e90,4.976545129086558e90,-1.228200915694566e91,1.7912677825388848e90,-7.145038204189416e90,-1.1177137940637645e91,1.488122384622555e90,2.086816336761077e91,-2.4698123544687874e91,1.7900915010917855e91,2.641737386763653e91,4.406364909025267e91,-5.140569456238565e91,7.662981023012489e90,-3.7024926659211574e91,2.812050422676121e91,6.327258680549459e90,-6.82823657345368e91,3.0945828585443375e91,-1.4136021842659057e92,1.421274648829522e92,1.4651908460655914e92,-2.065797297961683e92,-6.898780227594922e91,1.3995233119085953e92,-2.8358298578674557e91,5.107659345048736e91,2.993770029059924e92,3.1628053610479113e91,5.429258963816892e92,-5.600887681540656e92,-3.3594015784938e92,6.646848213060121e92,9.636474971642816e92,-4.7650003990117104e92,-2.0259546610014036e92,6.399374946394819e92,-1.138735601944943e93,-1.1345702631929212e93,-2.2941497152184288e92,2.3050769121161723e93,2.0822266110605766e93,-3.160357362628927e93,-3.227630607735621e93,1.6614687614656427e93,-2.3270061802537094e93,-1.7247834671657084e93,6.981963535471605e93,3.9935431233920306e93,-2.8123152885292276e93,6.758000761970626e93,1.2109297119011096e93,3.2955690487363906e93,-1.7591242661144865e94,1.0665486758308397e93,-1.7991807172744876e94,5.278050040853764e93,-1.7063642249468967e94,-2.6116609197909687e94,-1.4862701453928081e94,-1.691242081959096e93,4.2251431624800044e94,1.7585518369249713e94,7.143470125308054e94,-5.754292335768898e94,1.3698586531568671e94,-8.45440682902313e94,4.605559874802362e94,7.569263211747083e94,2.375936275471541e94,-2.366488951011948e94,-1.9132307128774145e95,8.807187406160799e94,-2.6869802000251635e95,3.0530889902813535e94,-3.7014021545471016e95,7.374904889551526e94,2.4310761636572258e95,-4.2029145387818973e95,1.1758300106220074e94,5.76983422794456e95,-7.00966214259301e95,3.116814549460053e95,-1.1843354439795054e96,2.3817759513118122e95,1.1232875070719748e96,9.764800969854392e95,-1.8417867554229228e96,-1.303055185750754e96,-1.0605092627545517e95,3.0090860495025146e96,-1.316909369136664e96,-1.5721403329456318e96,-7.997050340200063e95,-7.826165437627915e95,-1.9338501600490831e96,2.7782434427250675e96,-2.4156221902454552e96,-9.863001600926304e96,-1.8567167542891737e96,-5.848579809007946e96,-1.0567088270991773e97,-1.3188619742182685e97,-1.2542716625178852e97,2.4421444588783477e97,2.1838853958563135e96,2.416113207155637e97,-1.1663459963431679e97,2.5252204352935423e97,4.0463276311238395e97,4.1954565909506655e97,1.071489610907326e97,-5.966762566057268e97,1.9629091347343843e97,7.941015643174137e96,7.470230062025205e97,-1.9733444508341957e97,1.1665696390786174e98,-8.451405151798834e97,1.525555144597191e98,-8.4194158070154e97,2.4961877717453873e98,-5.809796001545825e96,-1.7018521703386552e98,1.464295460107492e98,1.8006137822839314e98,-4.797815433480186e98,6.467402112364043e98,5.672290736049815e98,-6.658267690861224e98,-5.841910843699793e98,2.636429551356759e98,-9.165531836168471e97,1.2567248966863365e99,-1.5674501660393455e99,7.773452173553134e98,-1.2468413433231647e99,8.938846150995651e98,-2.4463515318417216e99,2.0912355247852133e98,-1.0745038885938564e99,-4.6933973181559555e97,-3.3478445425254177e99,2.0733817843401785e98,-6.897977204160892e99,-3.742955003958699e99,4.2326395182560977e99,-3.987500118238373e99,7.407319495129692e99,8.046405803805401e99,1.661255461616748e100,1.679966306230745e100,7.767841794704134e99,-7.044387613469951e99,-2.567874389438308e100,-2.4370446192239064e100,-3.75557611354547e100,-6.067040868432696e99,-2.034564154126445e100,4.20100405578313e100,8.290409918093365e98,6.168496735101248e100,2.5500722664970384e100,-8.223010233887551e100,2.8871769237302063e99,-6.946604609893566e100,-4.399581326103594e100,-5.538591043982594e100,-1.5679631555804936e101,1.8183392640913037e101,-2.1913885051818676e101,-9.876083703910216e100,-3.701541621073664e101,-3.248977171051052e101,2.892934186718883e101,1.6359518996840377e101,-4.574587553566434e101,4.985328119462994e101,6.539382490363765e101,-8.380304767719519e101,7.227969352245722e101,-9.354148959972456e101,9.255240302546984e101,1.8097529242331153e102,-1.865841653688501e101,-2.314346977364977e102,-2.6019004789435655e102,8.602303502716382e101,3.634190548103589e102,-2.4578787734096997e102,4.0909214072236054e102,1.91702970599215e102,-7.893567958973752e101,5.341620589588745e102,1.8157575955202372e102,6.415974089903985e101,1.0184953048745586e103,-1.8084872591840007e102,-8.963595352939108e102,-7.163339166954042e101,-4.304830494585601e102,-2.306379155310789e103,2.3642874940559057e103,-2.1814079793481673e103,1.600104384882549e103,-2.078920083687731e103,-2.46017736156621e102,5.4936708514536326e103,1.9501520552387126e103,2.7576336288511187e103,5.793389096612461e103,-2.464784403863264e103,3.2222349828261534e103,5.1230331947688566e103,-2.155998484570157e103,1.2900685051586654e104,-1.8218554503943736e104,1.1721469648515851e104,-1.4908209891511808e104,1.5200749335399985e104,-2.2018893890135156e104,-1.4463698784335014e104,-1.5368800475600986e104,-1.4829931755411183e103,5.792395302061609e104,-2.7016285592772385e104,-1.8847111126216367e104,8.64865008882618e104,9.84089628741849e104,-1.1776788047127992e105,3.4741760982482114e104,8.142236693299865e104,-6.854689368139354e104,-1.4372939729910582e104,-2.40601133362846e105,1.3930429938410964e105,-1.476451387877571e105,1.0570799352123249e105,-3.0057650536578455e105,1.1260174183958492e105,-3.275221951836148e105,-4.470741003103508e105,2.4025642331015616e105,1.0107622765171041e105,5.879374465735557e105,9.933502764075675e105,4.956847779236765e103,-1.4292000346861033e106,-4.5840782891991293e105,-1.5787532192640193e106,-4.146228544485225e105,-2.040914841517358e106,-1.9550844190728973e106,8.147366978301987e105,-2.8434313479838854e106,1.0452598899406588e106,-1.4113433486686892e106,3.3046844507867836e106,-3.7291787656708975e105,5.152293834183383e106,-9.316470468058987e106,-8.099889131482237e106,-7.580089436090319e106,1.7543141124124918e106,-6.626984039888365e105,1.7351559553336958e107,3.4160047937902573e106,8.56340775063401e106,-1.6732289125310766e107,5.059993598480055e106,3.375671678061761e107,-1.3582119383198897e107,2.3049680531303314e107,3.795131680147631e107,1.8186990639315278e107,1.7982498324452686e107,-8.999892967346508e107,2.0329855863975257e107,-8.88256452980721e107,-7.584161014793346e107,-1.4201014583583243e108,8.031948451699548e107,-1.9398600064649106e106,-1.30433983855504e108,-7.41530878555262e107,-8.828793276373866e107,2.1729726658181627e108,-4.437138874264949e108,1.1559621285723584e108,-5.729969881432696e108,-4.5722809441647063e108,-3.778233437462682e108,5.994444635876797e108,-8.686422442104481e108,4.3284349747419097e108,9.1117149089042e108,4.291999576282364e108,4.198240243252774e108,4.840252259334788e108,-1.2314961732577639e109,2.3247741703768684e109,-1.8226279880941953e109,2.3345442093450805e109,-3.607244403741382e108,1.305625612158956e109,9.582311798450519e108,3.2079202437539425e109,-3.3744082360355503e109,1.8492955038999624e109,-7.55409276851968e109,-4.837751444632551e109,-9.513491677947436e109,1.3745199837941547e110,-5.719389692295684e109,-3.3968940479092894e109,2.9448497139644225e109,2.262267415351864e109,-9.11552049730837e108,-1.5280174744640827e110,-3.9798852328210856e110,3.613159128521392e110,-1.9053222759782314e108,5.168738035831696e110,2.8795262783773353e110,2.242614645203021e110,-7.393928453417908e110,3.4551156976967955e110,1.8718774969245574e110,6.969858663048447e110,1.3090190835253924e111,-1.0760061066642583e111,2.5582561635606953e110,-1.7074022339080928e111,-9.055127529216851e109,-3.21387778972956e111,-1.4099363735231109e110,-3.214991158130689e111,-1.998510045547642e111,2.16634805552748e111,2.6496410003146734e111,-6.271759431234891e111,-3.097205388473889e111,-1.11389385343864e112,1.001307555582968e112,3.460503407261425e111,9.9976496957541e111,-1.970729572981208e112,-1.7722218801744227e112,2.3001250425513795e112,-3.0341568154232734e112,-2.2897928860555134e112,9.054703507809568e111,3.167175960921594e112,-3.3232070035605126e112,-5.636532209196946e112,3.459162504785572e112,3.881211598507038e112,1.0751004547670386e112,-3.4035335185695516e112,4.198197238171181e112,5.934575386969215e112,5.9064852066288145e112,-2.857827313459705e112,-1.9883760567485915e113,4.150132129978857e112,-1.2677880123112042e113,-3.342288997228303e113,2.117658101532946e113,1.2755831773900641e113,-2.445033104326183e113,-1.1639655573420387e113,2.6665791769126708e113,6.697480509244058e113,-3.872204103459255e113,7.83891755376065e113,-8.971533176416842e113,-7.501128926648073e113,6.445801484788612e113,1.6132415999521485e114,-5.5359528267608825e113,-1.723773357756187e114,7.496336048039628e113,-1.980024142021484e114,6.100936716823011e113,4.3058433254371023e114,-2.828351700001782e114,9.461442897127682e113,-3.906417303767744e114,-7.430912601793697e114,-8.462261616673875e114,4.519785727255668e113,2.478070838195127e114,-8.240152360987899e114,-7.486543785058128e114,-6.010997722923879e114,-1.5093704200969193e115,7.592517566274209e114,-2.456763738775561e115,-1.3467925291164366e115,-3.324151638059578e113,1.6022210681135146e115,1.159341233531608e115,-2.7307077809727557e115,-2.3026562754234787e114,3.2012967306756633e115,5.5855756507536195e115,-9.891207526040563e115,-6.885396754822023e115,1.8310463349272161e115,9.573303578658934e115,1.6819105920606124e116,-3.3199860942834613e115,-1.7156392163880866e116,-1.982281677691596e116,-1.1965230711306241e116,-3.1402387904446e116,-1.235127620130353e116,-3.0307198293952434e116,2.1471629003693683e116,-6.207305676073414e115,6.323909186212171e116,-2.903443550910331e116,-1.791553373118196e116,-4.3754852488046994e116,-1.1036948936971151e117,7.503535692144884e116,1.4017145438502958e117,9.747811286708515e116,-1.3728424547219062e117,-9.004183266132625e116,1.327607728046009e117,9.160546174790638e116,1.1315077318931111e117,-2.5357338814872093e116,-1.8044431471746062e117,-6.105006925752114e116,-1.6499333662666597e117,1.9085243760755485e117,6.832697516538249e117,2.639410413705161e117,5.649882040486082e115,4.441859394301796e117,-4.879876705585044e117,-6.233898595508804e117,-1.92352983480078e118,-1.8904072704855296e118,-2.2700152669338034e118,2.1558237716268716e118,3.476973073067806e118,2.08269038000064e118,9.81189937895459e117,-1.7623230915855275e118,3.8867836963970845e118,7.23403174446744e118,8.635246823268915e118,-4.169048217005252e117,-6.195275562771356e118,1.2932897365692111e119,1.4661903430884057e119,5.280667208981046e118,1.2400790611884625e119,6.829048373758039e118,-2.071668857477875e119,-1.504016096644599e119,-9.759943370657027e117,-6.901924412034509e118,6.2645165065661206e116,2.5442188457394417e119,8.053764328516511e118,-7.158186038001174e119,1.774273707171201e119,1.2942074501491036e119,-2.299764560553253e119,9.478339337077588e119,4.4827980245482645e118,1.6997517221502177e120,-1.9365293870452173e120,-1.4069516021152962e120,-2.4448625923911876e120,-1.465248632302906e120,-2.5156580936589276e120,1.9895614142945674e120,2.5811705484129758e120,1.1040631319566735e119,4.861485309232886e120,-7.095145959512149e120,-6.686990664292912e119,-5.818240344323094e120,9.913472748266697e120,9.891022454618947e120,2.726140011124992e120,2.5178026851996711e120,-5.3459796612211e120,-7.154614357738839e120,7.435659509148984e119,1.9303745932464605e121,-2.4362202254954476e121,-3.672612510018445e121,-3.3023548307892446e121,4.094980210862499e121,-2.918252820495004e121,-2.702298270935369e121,-5.386311964860865e121,-3.012152687790216e120,-3.296428903737803e121,8.750025276754832e121,1.1651369060326974e122,-4.162330810703744e121,-9.488405455970594e121,9.630575907598968e121,5.865279556229499e121,1.9251155433716033e122,-3.2397040237546242e121,-2.6072343022021967e122,1.3719838678625715e122,-7.250909376734411e121,-2.7778019249494938e122,2.6495848074160726e122,6.333193261902361e122,-4.948844741527628e122,5.5862220588039976e122,1.0817706582924678e123,1.1364562123294996e123,-1.923495715969384e122,-1.0522506422955652e123,-8.184497279222763e121,5.5031773266665056e122,-2.779962356858697e123,2.5087426464736785e123,4.765436402070598e122,4.686255546958861e121,-1.8360343560027054e123,3.1089798493309274e123,-4.85716473478464e123,-5.983416754538128e123,7.954621521243961e123,-5.402068203615448e123,9.766407785537682e123,-1.0170723163178985e124,-1.103025297411482e124,1.4492182508944952e124,-9.872789975918207e123,-1.27739520949275e124,-2.710907470010809e124,2.903017507833506e124,-6.214923118929749e123,-2.6969055283332513e124,4.0119353380901995e124,-2.1314139893763957e124,3.2901840026950157e124,6.970834484100663e124,1.2852874711675864e124,-2.904190914682831e124,-8.50266171840566e124,-5.367178860453486e124,4.182593350497369e124,-2.8961597926426466e123,-7.764911054303775e124,2.211228949628294e125,-2.27545421504843e125,2.5152909117249574e125,1.3387875420587292e125,2.9816187265769815e125,-4.088615185682686e125,-3.0211568971762987e124,-2.558808736884694e124,6.1543965173157005e124,6.882827082779352e125,8.403996834598058e125,1.3270066548024853e125,-9.256509348773178e124,-6.1834261653220975e125,-4.218575629221059e125,-1.006667225751686e126,-6.357842030532972e125,4.2326013418770395e125,-1.766191945761381e126,6.029914450246233e125,-2.8377751693768113e125,-2.2098917951360578e126,-9.13251636715955e125,-2.4690995344685255e126,-1.0023684966773599e126,-4.33331424474337e126,-4.3119279245196206e126,-8.767195155347513e125,7.395658760991045e126,1.255082077649479e127,1.988728670798131e126,1.0566612881321492e127,-1.9706424100939158e127,2.1324229060425902e127,-2.6719822354388385e125,1.039637663930726e127,4.895451496736317e126,-3.6619000562691824e127,1.707117076320404e127,3.5368789028554537e127,3.0503119369134913e127,1.1791672068562945e127,2.1214232586744695e127,2.0556625696204737e127,-3.0955623215148993e127,-9.768464450230693e127,1.110483628644277e128,-1.0820510104596917e128,-7.973921340214815e126,2.2378565526358077e128,1.2124016802764868e128,-3.0334120691373238e128,9.66438449278208e127,3.2318264183537113e128,-5.034494173071823e127,-3.567126546221945e128,6.068758744163166e128,2.0373158283062132e128,4.1074455182181305e128,-3.8664379613314855e128,-9.922399470745041e127,6.96338787920988e128,-4.801319988718531e128,1.700683879670055e129,-4.6187201113160475e128,-8.006031636284183e128,-2.4685880198422215e129,-2.199036525292769e129,-4.6961185848530935e128,-1.2965120212947532e129,-1.5277728062784608e129,-2.0571075404861627e129,-4.808664260950004e129,3.2951194615393835e129,2.2450732005392498e129,2.5631395742473155e129,4.183047180672216e129,-6.456180024948724e129,1.2375922451541038e129,-1.2147365874965937e130,-1.8816507443309517e130,-8.046462605018224e129,-1.9638762015821837e130,2.639260401006163e130,-1.2550046805922381e130,-3.434300538178464e130,-1.4750650276718238e130,-8.209700144735819e129,-1.2797021345901274e130,9.785686553605237e129,2.3714359873576274e130,-1.2402483432224148e128,-8.22842939654573e130,-1.0038127513510513e131,-4.510663212137987e129,1.4603958311626543e131,-1.5880554642212821e131,1.9108762934979104e130,-6.334226183608837e130,8.212058434402486e130,-2.1468518239394605e131,-6.94744607193217e130,3.2303606566377593e131,-2.789440286851622e131,-2.2424438130219183e130,4.161924811068431e131,-3.0082034431645397e131,4.875678282007784e131,-6.975539304196029e131,1.0389101807230502e132,-3.1620432936240298e131,-1.071410783816827e132,8.543329971849898e131,-1.5935419012716773e132,-1.1982687503969205e132,-1.9817308581892083e132,-4.316629248485165e131,-3.6013425212155245e132,3.950697096608155e132,-1.423125572231934e132,-2.8275778832043687e132,-9.730604894633756e131,-5.61877309282811e132,3.854111304031222e132,-5.261316379457659e132,-5.6382652400171364e132,-2.671270830319831e132,-8.057305632876732e132,2.437668172645279e132,9.429289944510739e132,2.1460020888958638e133,-9.688720055368056e132,-9.690293511062997e132,3.391072139521339e133,3.1092311868354946e133,2.321748265834208e133,-3.4368514757096686e133,1.7342572716898004e133,3.362718511246062e132,-9.67523648437767e132,-2.9732020389856415e133,5.695647114014144e133,-1.173794335574719e134,-1.182393605167061e134,1.1055120551087316e134,1.9210678881407392e134,2.2223890426074065e134,2.4445106335573508e134,5.908803298816295e133,2.188106888004409e134,9.247774973957716e133,1.7750483773608707e134,3.2889529749534353e134,-2.7566408448602348e134,-6.865120418515407e134,3.2017889806626904e134,-2.101542265901555e134,-3.203377515183813e133,8.74133669179236e134,-4.547278506770591e134,-1.6010139997544887e135,6.8258894659554e133,1.7357946708195698e135,6.207608426324707e134,1.2741149131299996e135,9.601166271838318e134,2.2129328366673538e135,-7.502482331335124e133,9.1751586657146e134,-3.5077746872347025e135,-4.3657920233620446e135,7.425453801896192e135,-3.7982184077020305e135,4.80285754229247e135,-9.813833220928916e135,-1.0588449152963294e136,1.3728716658301233e135,1.7523280878534592e136,1.8584587615513954e136,6.200477052493863e135,-9.829547802618657e134,-2.4250804292665918e135,-1.9749826542355677e136,-2.3536495678321184e136,-1.704507664509132e136,4.517522636637708e136,-5.055302019119035e136,2.883632400934096e136,-5.359825162124562e136,-1.2349333680105054e136,-6.026938210373507e136,7.381193078746282e135,-9.698147515811814e136,-9.260974725903415e136,7.204475614643655e136,5.804286897198795e136,1.4961886673610798e137,-1.2698138990040442e137,1.8733953900612304e137,3.957975739818149e137,2.690883722949153e137,4.944014292868006e137,5.628920120258884e137,7.349328617718533e137,2.9062194259796888e137,6.20578738445496e137,-1.6959096544479648e137,-2.372699590962209e136,-6.792125127941746e137,-4.801449139942258e137,-1.3456505017694833e138,-6.896605574581009e137,-2.8816993534526433e137,2.183464394614701e138,2.673176737914269e138,-1.49161330763984e138,1.91795306989895e138,-5.3315659895853835e138,-2.339907295055209e138,1.5624246140716044e138,-3.522454122968978e138,6.477298848177071e138,-1.0827890121470393e139,-1.1654563682299508e139,6.544880956145608e138,-1.588118107450825e139,-1.4978794362302685e139,-8.91033252200055e138,-3.178923932557519e138,-2.9159819421677423e139,-8.473401129668169e138,-1.7203065126222067e139,3.2319167996005204e139,4.4530903620301953e139,4.12952007839251e139,5.775491938517738e139,7.668837352069e139,6.111298902523239e139,-9.146312283591663e139,-4.409941655352707e137,-1.0272128895090283e140,-1.552360791431333e140,7.482999690149085e139,8.60502505211358e139,2.4098573713664784e139,2.215774214115987e140,2.176083363205228e140,-1.2342212264778238e140,3.671639874037073e140,-1.1341254784615434e140,-2.72408501955663e140,-2.2902481469106468e140,-3.292194293004693e140,-8.504531788740367e139,-7.959167065062602e139,3.2845277129134374e140,-7.164154171663819e140,1.328144386292512e141,-1.8611031813344534e140,2.057821380703746e141,5.683276275990399e140,-7.147013403366331e140,-2.3972633347265592e141,-9.224150932290822e140,6.720475267365793e140,-8.858723725229637e140,2.6038957277388637e141,8.70648688133151e140,1.424766296216021e141,-4.287463443131354e141,-3.3740453301892376e141,-1.75312106084084e141,3.967267748643668e141,1.4733916088274727e142,1.0034303012794065e142,9.155830894115088e141,7.22159829549925e140,1.5827247720979525e142,2.524058291740238e142,-1.3737291976698108e142,2.6283016794160116e142,-3.4288258832233174e142,-1.2846273649191624e142,-5.036085923495221e142,-1.4962939754099648e141,3.6184592827622366e142,-1.7557734045981993e142,-3.5885293028547506e142,-1.1487724200012277e143,-7.338212253662918e142,-1.5646026001175668e143,-4.332549728451582e142,-2.0799319129587395e143,-1.7610257796513726e143,1.7545652051010885e143,-3.298240820211047e143,-1.3127536410754838e143,2.6111983766233947e143,-7.998631020543103e142,-3.2664052181172303e142,-4.519957270994801e143,6.101520948865088e143,4.913878838517018e143,9.641648087550995e143,2.913012198708978e143,-2.753727870535778e143,-1.490528787729215e144,1.3467636205020769e144,-1.0730262212985346e144,2.0049593322872298e144,1.6483654740377184e144,-1.4824369235755277e143,1.3870024079497952e144,2.1752013853982895e144,1.2099454783803444e144,-5.3012981429859085e144,-5.030684048678617e144,7.709890815667847e144,6.744118738489669e144,-6.827546113206392e144,7.249686459883485e144,-6.575605941587566e144,1.1427006661945372e145,-8.235540598498997e144,-8.10980321937011e144,1.9764203906369031e145,-2.5176911436743064e145,-2.9183408871638564e145,3.512901126458115e145,-6.113808974779491e144,-2.332976449329982e145,-8.379697870481742e144,1.776197619725374e145,3.50258274404452e145,-2.0877213808624712e145,2.3747546912707518e145,5.154223902502204e145,-6.807274015528553e143,-1.0065682399653075e146,-6.670841271660048e144,1.2116277490509714e146,-1.2812159885950094e146,-9.956535706149573e145,-1.5623552637201658e146,1.8784339443565403e146,-2.5304912195916267e146,4.206132648748585e146,-3.7259389190277053e146,-4.240146573856252e146,-1.9213693266999336e146,-1.707337685931316e146,-7.92362973819048e146,-5.938431355012184e146,8.438825952851836e146,9.613914398970408e146,4.099537864130467e146,-3.9712985460312785e146,-5.6039559404025965e146,1.1104932783682748e147,-3.1082882494823377e146,-4.373885457771225e146,-8.681026631803509e146,-4.585197771496957e147,4.9166062453779135e147,8.96196882427886e146,4.38928080649617e147,-6.61181997351512e147,1.5229083332421895e147,-2.7916675905957803e147,-4.6730625997676656e147,-3.3322413422808934e147,-5.512224884607771e147,-2.2074446615811362e147,7.137892023816708e147,1.5933384311640402e148,4.7421576601995945e147,-6.757405603051148e147,-2.150984357516566e148,-2.8561395531949963e147,-1.5760885161050499e148,3.09224185442565e148,2.4873328534982693e148,-2.9651537468479546e148,4.0713256963422675e147,-1.306932311415518e148,-6.469924762368313e148,4.086792465392071e148,-4.713930516776474e148,4.215586122277785e148,-6.121630552108121e148,-3.115312826378849e148,2.3572909097948917e149,9.078037591298323e148,2.576329162497515e149,-1.726332317249415e149,1.757570623421192e149,-4.252955901960596e149,-1.0709235632014858e149,-5.908808556398022e149,5.3048987684122655e149,-8.065757860318025e149,1.6584478861220924e149,1.1029633040535837e150,7.356818606030164e149,-1.4267687702921764e150,1.54365194276815e150,7.1174196016847035e149,8.45415719542726e149,-1.177915086023913e150,2.093517355728863e150,1.8674670147812517e150,6.845126864320026e149,5.5163594820402884e150,-2.7991200928432135e150,5.6305853450358676e150,-8.269751380843582e149,5.024666447232048e150,2.396530527377528e150,9.798057735578854e150,-7.474964665629996e150,-8.92978032722505e150,-1.3045223617843098e151,7.972131382524055e150,-7.154420746251577e150,-4.8773573332160986e150,-2.7141093686642154e151,-1.948469472419176e151,-3.317151406021504e151,-1.476585531043629e151,4.143804737292362e151,4.5848086224563074e151,-5.288540247437579e151,6.14389548256406e151,4.4596503035149977e151,1.677006291505559e151,-1.043692671583693e152,5.310852066440268e151,1.6673387314369367e152,-2.205372075846733e152,-2.186449493314431e152,2.8736476132426726e152,-1.7412535815318626e152,3.649705382097864e152,2.249025950760459e152,5.138856365492995e152,-5.172026555800557e152,4.106836279565075e152,2.5603663448387688e150,-2.0335292544093955e152,1.9257126413828577e152,-5.775975979802986e152,-9.580996437341833e152,-1.0816008582472035e153,1.0231402266824047e151,4.957035585332717e152,4.193492785825779e152,2.809135691447025e153,-1.9098308208833984e153,1.9074779291552553e153,-3.950421498485544e153,-1.6458683644601814e153,-2.0975073140545832e153,6.1823575349103025e153,-7.09117314870499e153,3.876134719410579e153,-2.2898548905910036e152,-3.6069879626406376e153,-1.3527906989663586e153,-1.3577719377465016e154,7.365457288209955e153,-7.387867377339249e153,4.020121555786872e153,-2.5254288949262008e153,2.6219649217307498e154,-2.8022357497586054e153,3.217093612150332e154,2.6684483409786204e154,4.034552104787214e154,-4.392373602799992e154,-8.217662935122232e153,7.198207067035295e154,-2.4903437180484496e154,3.424844505657782e154,-5.799109741445982e154,-9.447019084926411e154,-5.301902974683427e154,-1.898614067186334e155,1.1541893770771218e155,-1.0272111666704277e155,2.4723523294522693e155,2.0213661379225045e155,1.9549557474825244e155,3.3058161651289e155,3.0788786913784676e155,2.964322115840458e155,1.9774226239745222e153,3.137234486015066e155,1.9251802323932856e155,6.973011251815152e155,-3.8973100489938234e155,9.135612802871859e155,8.785901380986892e155,4.619554113789973e155,-2.18877879572605e156,-2.014035560923057e156,-9.353046090567517e155,-1.538148006580345e156,-1.4421593461509567e156,-1.6004941045778598e156,-2.7890093307788676e155,3.447802660056651e156,-5.4943615881024246e156,-2.590652112621233e156,-2.799778741190191e156,2.183183729045363e156,4.768923085174987e156,2.726644499202521e156,5.452751724799447e156,-1.1908923555087792e157,7.720122049091381e156,1.8987523631145083e157,-2.79791665412028e157,-3.050072339648069e157,-1.81704877634712e157,2.587080470442334e157,-2.292366987124935e157,-1.038752672784261e157,-4.932812195339429e157,-5.826504788164151e157,1.3819452997253292e156,5.0616488908890156e157,-7.176948279227152e157,-1.348538564138152e158,6.258263977636802e157,-1.1537791684441002e157,-1.3514015512126643e158,1.0916477896044434e158,2.310714980201183e158,-2.801082938923402e158,2.609652502715317e158,-2.0749709530629288e158,-2.1158491571914083e158,-5.542309319836641e158,-1.4784392248645395e157,3.80709418008817e158,2.309486836806291e158,-9.269765001031306e158,7.870952813674933e158,-1.7642630804564814e158,-7.783626142270723e158,-1.5478021491327916e158,-1.0229382733480938e159,1.4836836446725246e158,1.3648956963904337e159,1.5818180919202023e159,-1.5083514313120135e159,-2.0045955807251923e159,-2.98931016182983e158,-9.594403402396823e158,-1.1226615199341706e159,8.823203227817385e158,-1.345835151200964e159,5.278560564369333e159,-8.053320010959644e159,-5.875152104877637e158,-5.418792446275305e159,3.8901246897904e159,-1.5905327906306604e160,1.9959309843665205e160,-2.003722125111088e160,5.124266441215727e159,1.4130502447602355e160,3.2387810495700236e160,1.4255905164952225e160,5.1409849468274747e160,-3.052622105845867e160,-7.544742480894698e159,6.751884445642365e160,-6.65042861421549e160,-4.968012211844612e160,1.0901063329355694e161,8.267539694541705e160,7.726776159524958e160,7.831216592470269e160,-4.169865970250672e160,-2.1899568342421346e161,5.844321131832229e159,-2.5640169017287383e161,-8.373498341981637e160,-9.826829831391276e160,1.5959872150048686e161,-1.4192182179952383e161,2.0625250847798686e161,-7.620505333088975e160,6.594166834063635e161,6.064269387629189e161,-6.258797452001966e161,-1.0124990950707842e162,1.5258791988137154e162,-1.621292628728481e162,-1.8890919182067124e162,-2.0698075158820196e162,-5.845750752349301e161,-2.308751666284571e162,-1.15468711639069e162,1.5746685867881828e162,4.604756830023807e162,7.140103118830618e161,-4.392332313576648e162,5.5197281105232375e162,-3.1311658182173334e162,7.667290265917837e162,7.326102701011564e162,-1.1330378390425671e163,5.294892711212477e162,-2.480728934912579e161,-1.2610422599417511e163,-1.8411704989106323e163,-2.475180204484426e163,-4.369766611115922e162,5.8988741794759244e162,2.1381162694370212e163,-4.7213284203721105e163,2.6497586915640122e163,-1.5654892624230352e162,6.330646360396015e163,-6.477875601335431e163,-8.03831821120078e163,8.804292737472633e161,1.8813482047597396e163,-7.782663646203723e163,-2.3888290096310825e163,5.0635273723622917e163,-9.200028261630663e163,-8.627029762046044e163,1.9064879118863226e164,3.2826657921157363e164,-1.8731488459459239e164,2.4690275547894054e164,4.0573510807012774e164,4.108267134406557e164,-4.322311354688075e164,7.994779304510545e164,-8.538075702986008e164,-5.617019282894467e164,-7.508366768357629e164,1.1212013693155273e165,-9.156394939693001e164,1.547091214728189e163,3.221033225251067e164,-6.192984393904495e164,-2.7612136783437634e165,-2.5176816213706176e163,1.6256212704300055e164,2.3401481205906657e165,-4.227581511060282e165,-1.2607128179583462e165,5.270923764848948e165,6.629493841351559e165,6.95802282722848e165,1.0257655602876061e166,-7.73042028866231e165,-1.2290673366682927e166,1.4328271900027475e166,-1.2573321247008283e166,-1.4396586655461e166,1.7872244001920996e166,-4.245388509558791e165,2.5911292682175716e166,1.7931965930475988e166,-3.018573117179051e166,3.6188985417253706e166,1.6639652141163636e166,5.311736199153642e165,-5.361311847849327e165,-1.73372294925552e166,2.6113441863334887e166,1.4348967890647923e166,-2.555933305373183e166,-1.7835320134608693e166,-1.0726655194245786e167,-1.628257253325351e167,1.1704995388021403e167,4.9377590475215586e166,1.4758808913453567e167,2.4365554645687956e167,-1.8168296195792107e167,-4.1430068146065656e167,-3.9430253149104204e167,-4.882830444841287e167,6.916616988808308e167,7.884086534522142e167,7.023235496312665e167,-8.77684175599994e166,3.041851551207774e167,2.190044406701421e167,-1.6011641135027697e168,-1.0696658376760464e168,1.6583809169991724e168,-2.4826143172395765e168,2.077658459351975e168,-2.312759821143772e168,-2.6341901225101782e168,2.92596704374541e168,4.268442438161744e168,9.467496333585494e167,-2.1653870985247923e168,1.4330377211624347e168,7.987045981826211e168,-4.2044669487739125e168,-6.661378747122219e167,-9.443780881743406e168,-9.255135443694099e167,1.7363617868907642e169,-5.255092807485724e168,8.096601532830097e168,2.7670284087939395e169,4.587280440730848e168,-2.630351602816908e169,-1.5494503938673745e169,-4.754034285187334e168,-5.9052344184409094e169,3.473558496588348e169,-2.394464403870929e169,-4.1243653881225025e169,9.97825603395837e169,5.4629613925511656e169,-1.2135623358457334e170,1.7799644394348004e169,-3.431547852278937e169,1.2896959051581574e170,2.887065322597838e169,2.819399993724996e170,1.1146405901298497e170,3.5478607131134913e170,2.6703005791599107e170,-8.412905962521379e169,-5.369276570722077e170,-4.456446451358117e170,-7.459933732407858e170,3.777973554320408e169,-1.009682383118528e171,-1.4239076908318103e170,3.7143612393435864e169,-1.4574208775388116e171,3.2090540352383836e170,-1.440035092589472e170,-9.375240755469732e170,1.5472582557771674e171,2.4749515564990818e171,3.638599491612322e169,-3.737181853076628e171,-3.834929290181227e171,3.25422361610233e171,-3.2995849303571144e171,-5.734977381170144e171,-6.339051006905684e171,7.660380552841245e171,6.038916481801089e171,-7.198370189684149e171,1.1574547495301035e171,1.210575408183494e172,-1.1994203721251398e172,2.2805699782318487e172,2.323608924340546e172,2.3708254173409543e172,4.568380611500522e171,-1.6882318162548768e172,-4.196918882686804e172,2.9061688816987744e170,-1.52837442072128e172,7.157086172131064e172,3.502919540406427e172,6.112385495817323e172,9.894746442791438e172,-8.831235413384517e172,-3.3583172246882726e172,-1.309099600223524e173,-6.1332436331109375e172,4.9521292670650395e172,9.47652011285431e172,1.3224040956352113e173,-1.5999808492947005e173,1.9393688506643466e173,2.856715148298828e173,5.22575575389453e173,-1.516040132549317e173,-3.6953856028707005e173,-4.177933979158669e173,-3.424000077355864e173,1.7395802488294708e173,-5.000697992438319e172,-5.708247230733282e173,-1.9214545245621475e173,1.684496602932355e174,6.909751373897258e173,2.2327849976215215e174,-2.2072148941414577e174,-1.3540690190041813e174,2.832108030033608e174,1.9066915265095754e174,-4.415896488020231e174,-4.589943541147019e174,-3.953024337197635e174,-2.4752384228420755e173,-9.493358021461793e173,4.982199543719383e173,7.067750446357545e174,5.495571693764169e174,4.518823014672093e174,-1.3628728896360082e175,1.6108202400253032e175,2.0994174374075824e175,-1.8511985333462624e175,-1.0568223042840488e175,-5.58362777780895e174,3.687654046082686e175,-3.6768197927490997e174,-1.8397862787839544e175,5.568876462542714e175,7.5907034336886815e174,-3.3776272356011135e175,-9.686221237397377e175,2.88166619090168e175,1.2785571165747108e176,1.611644351246175e175,1.3066432462080363e176,-1.147850796896949e176,-5.439556671265338e175,-1.790356286045273e176,2.5537918130905535e176,2.380153483786735e176,-8.79304097432325e175,1.167698937289594e176,-4.4300409312271447e176,-2.977102997193913e176,6.69748936762188e176,7.727325945985227e176,6.304755140620246e176,8.654506266066186e176,7.547513473473466e176,1.1390307179355625e177,-1.061016900000086e177,-5.861665327697451e176,3.786223261228722e175,-1.1908930526655255e177,-3.800594885044385e176,4.0835448283425385e176,-3.8436208137362383e177,-2.552632405183778e177,-4.333341033638161e177,-5.170702145457873e177,4.848840484654952e177,4.477989597262881e175,-6.416842635609648e177,7.9702552789991185e177,-2.933775594195868e177,9.610148662931008e177,1.4257899945399881e177,8.73790486521229e177,-5.5534489799223105e177,1.1097543560919e178,2.819601983306281e177,-2.0922509181990133e178,8.074612413952857e177,1.2493455681316037e178,-1.8405336980839423e178,-3.9546835806530955e178,-7.853506726482412e177,-7.601195239088822e178,-2.6424427559157688e178,1.4876526970991913e178,1.0538807383676656e179,4.56917514875443e178,4.978610876085976e177,-1.487009693397843e179,-1.244833872278685e179,1.0300502072719925e179,4.414337435813169e178,2.0480732521690323e179,3.706258673058087e179,3.314494177485554e179,2.0302718901644883e179,4.512924004198576e178,5.369985356990512e179,4.27450545787931e179,-7.532075391162487e178,9.29659137565487e179,6.506659047481466e179,-9.717312341933262e179,-1.3501441390304572e180,-6.75589921238139e179,-1.4338063326032739e180,-2.2114052776057553e180,1.8393824872418816e180,-1.429783074075e180,-1.100635292736368e180,1.4272649049172465e180,-1.3094313130378163e180,-4.242612627948791e180,3.9835111913460015e180,-4.4514658266185475e180,5.230826985625133e180,6.549790901777804e180,6.717038732198407e180,1.1760533764584065e180,8.956068125846361e180,5.095375166982682e180,-9.581201861867872e180,-1.709778037644045e181,2.110244034091437e181,-2.965029445544159e180,-4.914778378825038e179,3.3450340955353995e180,2.120651640616513e181,-2.7006318766426525e181,-3.626808695506667e181,-4.0999581662472354e181,4.357326200106687e181,1.6841491119656805e181,7.20156272453426e181,-5.505863629351402e181,-1.336497488516412e181,1.2044695367151316e182,1.7030434126840774e182,2.7988695223044718e181,-2.0986390008438303e182,-1.652926623156951e182,-6.355429627303064e181,2.8846600403399703e182,2.5469161759819435e182,-6.104233466166563e181,-3.230599791972879e182,-4.7278851696025734e182,-3.259446316584954e182,-6.590327233063298e182,-6.292877737237596e182,-5.99134731824936e182,6.827734949740293e182,-1.6106572526674426e182,-8.383958754935237e180,-2.0262207333460026e183,-2.4236825734438174e183,-9.131138422875025e180,3.3301997711231434e182,-2.2080363237843956e183,-3.620232392076313e182,3.6858299490543876e183,5.600471841306874e183,5.460936696068929e183,-3.6675442069103007e183,7.685362944184916e183,2.7219005517399365e183,-7.616681816373103e182,-4.097601199165846e183,-1.0611981277457724e184,1.022697108286844e184,-1.2081366754217713e184,2.3371785887291542e184,-9.891578551046807e183,-3.762923700738501e183,7.87971657962616e183,2.443003204257873e184,1.4371293171069772e184,-2.1592048374380436e184,5.246057439703279e184,-6.043647312713751e184,4.10035263121543e184,4.500860489689511e184,1.1276144535278604e185,-1.9682058512472813e184,-1.0632387562764278e185,-1.6354520183321162e185,7.25046719703256e184,-1.5592799349496766e185,-2.3734876799308104e185,3.006252593416797e185,-8.234099175873731e184,-3.347233244010931e185,3.7326342711651344e185,2.923533043955047e185,-3.530769780149595e185,-4.710600706239992e185,-5.250883312514988e184,9.230372181493999e185,4.213278147743933e185,-1.934592553803354e185,3.8609445310460384e185,1.4670164722969233e186,1.3259242969496081e186,1.6073424130816617e186,-5.546774568654726e185,-3.623635549780338e185,6.817579149959702e184,7.848902012667075e185,2.6908490973662334e186,2.6712629063382555e186,3.502469185381725e185,3.1830940788358963e186,-5.473976579519683e186,3.3109763731450297e186,-6.180202827106766e186,6.055531254975313e186,-9.188651187239894e185,-4.70031397139237e186,2.961073364033544e186,-4.2844845261052523e186,-1.602989911324249e187,2.5284524231178956e187,1.4526913140346672e187,2.9444651920973114e187,-3.9785133167797625e187,-9.090076340917847e186,-5.122038539433274e187,-5.5992601787045184e187,7.66786312842617e187,-7.950728828456996e187,-8.424758220245798e187,-6.451043097613711e185,-9.501955009645281e187,2.1800182648890734e187,-1.2928053927636222e188,-7.549389399900012e187,-2.1206605912251845e188,-1.384294146111566e187,-1.134076427490844e188,-2.1424677663101796e188,-7.108826330438148e187,2.6531107498054507e188,-1.2010954518026148e188,2.785377972373239e188,1.250461918831002e188,-5.118214024234988e188,-7.591765055484773e188,6.778618442007823e188,-7.713391197042238e188,-6.159571930856856e188,1.677583300175821e188,4.913771463303688e188,-1.040646335330045e189,1.320800721271482e189,1.772902655735502e189,2.5331238704491574e189,-1.160796310627112e189,3.504176293610242e189,-4.329133778901212e189,-1.4007771193307063e189,6.017964847933434e189,-4.2876454627714083e189,-5.146961463197629e189,1.4688227359967565e189,-1.1604933425741166e190,4.471650830300934e189,-1.4564516841566745e190,-1.5334560831629145e190,-6.589258579966975e188,4.607985088477078e188,-2.1089169111743e190,2.1838147157726755e190,1.4180996422838825e190,-4.448171951149335e190,4.717828321599602e189,2.1889059552189826e190,6.13028596070156e190,3.555632985620105e190,-7.525907316776743e190,3.0864876943078643e190,7.508511951025266e190,1.2084904480262658e191,-1.782902816319995e190,-1.0985077266334918e190,1.1855528688899777e191,8.6177110569939685e189,1.3949297667142505e191,-7.499678548968035e190,1.524764908315336e191,3.389428654976894e191,2.3580622546108193e191,-5.5720947293289814e191,4.641974503314436e191,5.726292164206553e191,-1.514568495845777e191,-7.960214697901129e191,3.0940422629051985e191,7.171191970347956e191,-1.3254496472353176e191,-1.0669781296764995e192,-1.5246604836305286e192,2.3220704264185037e192,-1.1348620946517508e192,7.447874334373148e191,-1.0035753057369262e192,2.7334571018570987e192,-1.6710923367862937e192,4.768399685804073e192,4.6406526589678e191,6.214934195183637e192,-4.827272804618419e192,2.060173728640364e192,-1.1101165469532354e193,1.291926502539718e193,7.689942620236884e192,5.320608661642157e192,1.4884567805399227e193,1.7117622475191262e193,-2.688826194655837e193,2.8045644632014327e193,2.6289768222413716e193,-1.0991687643166604e193,-1.3075735875933102e193,5.478517097923095e193,6.344278617935177e192,1.7976073093049492e193,-1.8430474765800633e192,6.399474594769214e193,9.023292028589522e193,-1.0741220937756184e194,-1.3228793096089416e194,-1.1049362800068453e194,-6.654267843072994e193,-1.2482128119143762e194,1.0675386441806428e194,1.2986414119079357e194,1.3952733910090143e194,2.418326282390002e194,-1.1430826408103395e194,3.8303303013570074e194,-5.1393821822479744e194,-5.7967218737910853e194,7.572539144593126e194,6.356704164123085e194,2.9197787618898616e194,7.304262809765547e194,-1.1865045319421117e195,1.3635785488868408e195,1.0080930076972109e195,-3.860669522799412e194,-1.2959228895671478e195,-3.034123833857828e194,-1.3548089171928784e193,1.1667499597452679e195,1.9152758566716573e195,-1.5535521171637222e195,-1.1267679937528404e195,2.477662311161239e195,-3.1052417045506303e195,-4.882342511884534e195,7.061407891475531e195,-9.039101672193754e195,-1.3092847855898119e196,-4.42025112398991e194,2.35908239307915e195,1.4939861265141036e196,-2.0989326446818945e196,-1.169887912830074e196,1.2715806995178556e196,4.0164549653066195e195,-7.446944654198063e195,4.227176216505767e196,7.761150070025826e195,3.149787796457886e196,4.451020189214526e196,3.939246466476374e196,-1.4775732116763496e195,5.919165562029837e196,-6.8928509979661025e196,-4.223475396676966e196,5.6039970389627705e196,1.2211709064571488e197,1.9319436610085672e197,-1.6231238493006774e197,-1.4079401946168412e197,-3.330589537128152e197,-2.1477802952530478e197,-2.7890617010277498e197,-3.723820085624937e197,1.749302832673238e197,-4.7946626900732634e197,-5.904843843643036e197,-6.965880755129874e197,4.0363141389222156e197,-3.370436300359419e196,5.5336884478240913e197,3.1127286297093664e197,1.8642070392148073e198,-9.144635165792478e197,3.221955218251229e197,2.537037795083307e197,-2.0953367759580574e198,4.1225846018105285e197,2.3114283783622848e198,-3.8206137904308817e198,2.059926940463351e198,-2.2545417393493313e198,8.153698692692306e198,4.311775013734004e198,3.0249355175039017e198,6.145987389535541e198,4.848516765228319e198,-1.5470639434965666e199,-1.497883794981799e199,7.173235647584596e197,-2.4545621080400096e199,-1.4151419971740244e199,2.760907674961552e199,-2.2166608695457843e199,3.4814452845307226e199,-4.318762134199863e199,-7.267881485371285e198,6.173046253398804e198,-1.7432617396153125e199,2.995306747091787e199,9.737566160529787e199,5.4762481326174325e199,-1.8002066471595727e199,-1.4763960651350176e200,8.30817281108435e199,-1.5085493549980639e200,-1.4407924526422286e200,1.710207840606127e200,-6.2643900224998535e199,3.1687249575419624e200,3.391754282627438e200,-3.44562397401958e200,2.2251593355416342e200,-2.8023338442672933e200,2.6035584742860198e200,7.138380934256719e200,1.6381363694086176e200,-6.47095055080855e200,-1.6665619604088317e200,2.3865242909578797e200,-1.2077012488921277e201,7.266848234702836e200,-1.3984742913324185e201,6.652615233023943e200,1.4416554608011098e201,-3.4353010716309313e201,1.985004556987083e201,-4.2701147530025677e201,2.5959397005160106e201,2.579334037113217e201,-7.05493427680722e201,5.031276612680068e201,8.361764876970012e201,1.0520099721431101e202,-1.1591987198225257e202,3.1482071874514727e201,-7.035045115347819e201,-1.6161097030171446e202,2.302468086301008e201,2.2108709701385975e202,3.0296938664161857e202,-1.9064069464394556e201,1.141673680143328e202,1.5447066260050942e202,-3.1709587799773917e202,5.239355942677474e202,3.4790443430263725e202,-6.467192941205588e202,4.3147449305283344e201,5.598441728509435e202,1.0685767677777263e203,-1.5860444936236272e202,3.3527995924769564e201,-1.1437286114222327e203,1.2119454046228418e203,1.3393517980905165e203,7.396594721946123e202,1.1950209807849825e203,-8.52531212560759e201,6.760460419602425e202,-1.9748303224584993e203,2.1820734079266208e203,6.698567012884417e203,-3.338097903005042e203,6.934502146933437e203,-3.974074682388431e203,8.81688406065401e203,-6.388382315218248e203,-2.433236387804415e203,2.8176938262064716e203,-1.2639815687756413e204,-2.847453566504734e203,-1.3647386609357236e203,1.4555447963314642e204,-3.670028299631512e204,4.187237702725885e204,4.394767629107724e204,-9.871441381789247e203,2.911700296162898e204,7.572861518268332e204,6.874122055347796e204,1.0272175483912648e205,5.7912341806523164e203,7.412429119266709e204,-1.3914745208852914e205,1.7250701702389157e205,-5.230519051494811e204,1.6035948519620601e205,-7.427223287707685e204,-2.538595498784614e205,2.8133529711301163e205,-1.1274458361618224e205,-1.2195182683544797e205,-2.6637443376489038e205,4.275522843967605e203,4.055031965078114e205,-6.517049205278639e205,4.664035136301025e204,8.722844893328677e205,-2.445038413000444e205,1.447805926162803e206,4.323484949677903e205,-7.35728734271923e204,-1.6384580568785082e205,7.104798839078432e205,3.0306982735084033e206,1.6447836312614293e206,1.4166821261199874e206,2.6361002017141136e206,-2.1474768921619335e206,3.793532483594772e204,-1.5150007950867048e206,-5.319904722520759e206,3.5445873469217954e206,-7.414638782043031e206,1.0495958627775342e207,8.182371845347104e206,1.4759578842607794e207,-9.855610424947022e204,6.488713540668989e206,2.477275514109193e207,9.386682584300867e206,1.192451367358613e207,-2.0345015379795282e207,-4.32944871008615e207,3.905972217007251e207,-2.467806156220706e207,6.416593841578263e207,6.298258220345958e207,1.2448592765619002e207,-2.5647440806684803e207,1.1346716649524592e208,-6.861555129508492e207,1.4341755546217355e208,5.364987267880262e207,-1.6266093396725755e208,-8.299362507516086e207,-1.7042118714882587e208,1.3068536850548238e208,-3.718897568896078e208,-1.370293340225239e208,4.011701703041793e206,-2.3326720846660825e207,-5.259927812071739e208,-4.084888430948138e208,-5.8773846575437945e208,3.968421963175561e208,-2.3361548473926226e207,-1.099448493494116e209,-7.30767542426012e208,9.383809099051025e208,-1.7439307043467687e209,1.86511702396685e209,2.7437679078197596e209,1.311410762057863e208,3.4697480513808096e209,2.466556180114675e209,-1.2736933202662432e209,5.110309610964631e209,-4.795288141516258e208,-4.212555512927833e209,2.4953639699683694e209,-9.120911738586885e209,2.1840367647414605e209,4.0732828022500857e208,4.107672634230138e209,-4.93987559004747e209,1.6092523998570426e210,-1.8224395052959238e210,1.1401229906474845e210,-8.549363811043957e209,-1.4242012716192956e210,3.7611843772290856e210,-1.1313107024862401e210,3.868866542498376e210,1.0485373643920716e210,-1.8384156747818225e210,-2.8086110600672343e209,-1.9247134532495586e210,1.0152624220044193e211,-4.546513773310498e210,4.1005869278820826e210,-9.72886370790509e210,2.58006291711568e210,9.856356122358613e210,-1.724041419050165e211,2.794194227276598e211,-1.2711902912646283e211,2.089421091463833e211,-1.9108113700912348e211,1.274433577153523e210,1.8888743801530327e211,-2.7960112354432164e211,-5.438387136873419e211,5.359630458338303e211,-1.8558761310274303e211,-3.7982134866626346e211,6.837305484916638e211,2.718659211372529e210,7.0838242561530265e211,-1.5249542478073397e212,-1.7490685438262657e212,-1.421699716970935e212,-1.2794518087127139e211,-1.7098808199831903e210,-1.9308162623788472e212,-2.5207055865691965e212,5.7451447211022344e212,-3.580590060105824e212,4.7993716154732036e212,-3.687110986150513e211,4.784746697459031e211,5.501695102146416e212,3.1681237932136208e212,5.369967673961709e212,5.416700180130714e211,-1.0472716503370345e213,1.769843331117364e213,-1.7310612388329727e213,1.861359642791027e213,-5.396798890617202e212,-2.0341034430821888e213,2.0024130606372917e213,2.9911562672286046e213,3.337216932014258e213,1.7575835849989513e213,6.265823755437927e213,9.012243183256287e212,7.918710128792092e213,-4.9927440287198164e213,1.1932511515377943e214,1.2426250778896927e214,-2.0048145851184015e213,1.8944968710761257e214,-9.145483534875837e212,-2.156074356957439e214,-1.7852330090242172e214,-4.0548134244222525e214,-4.567681518134519e214,7.093665077911774e213,5.49613119069467e214,-1.7526054736095923e213,-6.341225980194207e214,-6.882212663184214e214,-4.810895427706285e214,-2.968244473372099e214,-9.827477640047164e214,-1.2961607475082917e215,1.571068723937039e215,1.4450869089745116e215,2.359606808892334e215,1.889095032680557e215,-2.3139834169627084e214,2.402630439266049e215,1.2621404928541601e215,1.9779202727174505e215,-2.033463564038788e215,1.3772619719524368e215,-1.2081627459733073e215,4.919094954539703e215,-1.0889643416213444e216,9.244032595295993e214,-4.679412053372336e215,6.30865723955994e215,-1.8737924821486358e216,-1.743772687840973e216,1.4014214730499808e216,8.201832757964909e215,3.060524341064755e216,-2.3625799781763676e216,-2.2449587174580095e216,9.395152601667355e215,1.0608373809416866e216,6.508374637231417e216,3.823898220066317e215,2.502586811212789e216,-3.208688416690508e216,-3.59649408881417e216,-7.401856319208588e216,1.1620019829903607e217,-7.463513403479607e216,-1.6150310125800075e217,4.282286627730519e216,-1.524095472009982e217,2.525872281409598e217,-1.5189139796511932e217,-6.220521809221657e216,-3.33612248355013e217,4.587484769663477e217,-5.848324795254543e217,-4.500946674211442e217,7.357102416491764e217,8.577991438132346e217,1.5310864516297642e217,-1.2128081768408703e218,1.9354457494478324e217,-6.774482848509087e217,1.7882539267151747e217,1.495777646022631e218,1.5897293498708252e218,-2.297675329239546e218,1.1940996264472433e218,1.2150060401339501e218,-3.649044628259216e218,-5.384065906688673e218,-1.5237576924348678e218,-6.667725034298602e217,7.289855585018183e218,-4.29783726439491e218,-5.664249513388276e218,-1.2721699999698219e219,1.246315981744089e219,1.1399175371816077e219,9.530802023487751e218,-8.139736831359181e218,1.438635826735572e219,1.5302661290882965e219,2.976179659169666e219,4.015607474030722e219,1.4416931772440626e219,-5.161722650081619e219,4.87730451252234e219,5.70385045134775e219,7.770100964489419e219,5.457933162398081e219,6.859366387844798e218,-9.055743812965517e219,1.0311085040160848e220,-3.7265560135160586e219,-6.111208894266068e219,3.8943569026723316e219,1.581004656686559e220,-2.8476668310632384e220,-1.738129574340734e220,9.312919539297915e219,3.723914189765607e220,-1.1652754208427005e220,-2.5447970305990363e219,-4.2499564568209425e220,3.210271844208398e219,-8.887118229935967e220,-9.293470771380715e220,-3.3830835737582766e220,-2.746665646854582e220,-9.29816912548279e220,-1.4863573852625365e221,-1.9325378942112713e221,1.3172537122800042e221,1.2923826629915634e221,3.1932347275695697e221,1.1940956037051764e221,1.1542986711476692e221,-2.320079878227599e221,-9.628963729153124e220,-1.7378476489597002e221,1.8430696536963927e221,-8.588306111668962e221,-6.062187513808722e220,-1.1684431941768462e222,2.0860743107959746e221,6.991347985138409e221,1.7515070743812998e222,3.545341110406308e221,-3.897085309111359e221,1.6715661596067092e222,-1.0678669771564534e222,-6.56492439063591e221,-3.617498245440309e222,4.1314557170200806e222,5.355804701745824e222,-1.0873878100777087e222,-5.432941166626086e222,6.84228064541954e222,9.404834595928637e222,4.337483845681266e222,6.865743263479831e222,-6.79141356325783e222,1.439827029916305e223,1.563560265768175e223,1.369106205864831e222,-1.366451802254656e223,2.4143660014050734e223,-1.73673203189358e223,-2.601385275888836e223,-6.831826669368264e222,-2.910830225016233e223,3.22621393375325e223,5.505510274201481e223,-2.0502876834792882e223,2.621490329088042e223,6.605181042537962e223,-1.2624128942481693e224,2.31756358758678e223,5.259780503440664e223,-9.093216793745504e223,1.62264651901141e223,-1.3917504252255725e224,1.3685101042575468e224,2.5141713032306757e224,1.9319402415462033e224,3.354368366482755e224,3.4681304531700357e224,4.2604432894434805e224,-4.285325071974015e224,-7.55320270793459e224,2.6694396344853943e224,1.1072400774231988e224,7.368122499180548e224,-4.781903443159858e223,-6.644551259056845e224,-1.2419976321952876e225,1.4902229206643425e225,2.4128125848856027e225,2.7463755186759635e225,-1.6215741273978822e225,3.350001829329801e225,-3.4795243093046415e225,-4.6620349985876684e225,4.201843001103637e225,1.8339672664639117e225,4.17144082037019e225,-1.8352879560657823e225,4.2202840054941904e225,5.800189013040518e225,1.3160264355405444e225,-1.0493912679386699e226,1.0895692590490527e224,-1.4018957129684798e226,1.7341560694372137e225,-2.0325626258572188e226,-2.3015117617151773e226,3.6603648604979663e226,2.894936211626971e226,-3.998416908026242e226,1.8986831634239574e226,-5.200498918028712e226,-4.263181326412998e226,-7.948480645453061e226,5.170705830871135e226,4.397678023922046e226,7.653248345833023e226,-1.086493243134121e227,8.895580019559042e226,7.15381478375571e226,-2.0802531873176823e227,-4.234108971182457e226,-1.8726228349713248e227,1.200448112957946e227,3.3796933816378088e227,5.726029073686789e226,2.177697317922315e227,-1.3083418895606305e227,5.768873992229141e227,-3.5679190603980854e227,-1.302978973141292e227,-9.449414931729493e227,3.795799593468957e227,-5.831654189343748e227,-1.2207480010484818e228,-8.115527682174847e226,-3.571183444663414e226,1.2169907520127728e228,-3.677779310633932e227,1.0376988607458088e228,1.8703409937955026e228,-3.738507274830435e228,-3.717711326380621e228,-3.659860493328165e228,-6.207025394685762e228,6.910252130389632e228,-2.139815024916535e228,-6.877358955231414e228,-9.468711548273995e228,-2.3662347633626515e227,-1.4858614021159616e229,6.33182218000265e228,-1.819014989830359e228,-2.468186029683352e229,2.381711323329784e229,9.198612855055716e228,7.463483542911857e228,4.181164388377901e229,-3.7609448118059324e229,2.55442867624479e229,-1.9363456743840204e229,-2.491573734900816e229,-5.295989864634149e229,5.858152215620129e229,5.721710587443729e227,-1.1340387487146574e230,-9.250846123509739e229,4.426621173196711e229,7.967494909910106e229,-2.452241827453925e229,-1.593172825978786e229,8.749152816246553e228,3.0689090169165867e230,-3.5904461110894733e230,-4.929807599335328e230,1.3674320102818955e230,1.0453423272063794e230,3.782746941720649e230,-8.48528677230125e230,9.071346005924843e230,1.7976846133053403e230,-1.1580798165446955e231,-1.2400840234373073e231,1.2334691544396926e230,-1.2230707353463631e231,1.997739219237027e231,1.3230312049392117e231,-5.158921227405354e230,-3.2134604605450065e231,-3.288455402456906e231,3.354180377597295e231,-2.52152998567165e229,3.90549574548129e231,-2.142140116369781e231,5.8280686041750877e231,4.81310969476183e231,7.939025304513711e231,-1.184879066571462e231,2.2993546178205755e231,2.426532732584153e231,7.905869585046758e231,-2.1195412446325707e232,2.4321251512829503e231,1.5117145290804344e231,8.111856676001927e231,3.149745597465103e232,1.1684846948402998e231,-3.031370442170631e232,-4.992229050426725e232,-1.9506597649109737e232,3.106510128515595e232,6.575476770362115e232,9.06299889340061e232,6.438187302653644e232,-4.8453685086877655e232,1.176335004712933e233,-9.876009755665585e232,1.8090191242765523e233,2.495351356095239e233,-1.076232871380374e233,-5.871130626119764e232,2.631074742589844e233,2.901054067677889e233,-1.3999791943899541e233,4.662095224779363e233,4.535417846964043e233,1.8143220959084718e233,-8.418634832856282e233,9.7245102462801e233,5.183608531204951e230,-4.837412821529406e233,3.480079645716408e233,1.2994149987507722e234,2.909232338582119e233,-2.5526864663333503e233,1.9778063130430837e234,1.3707286611015972e234,3.461196228792889e234,-1.7921402366357335e234,-2.80107048962049e233,2.0036862752600628e234,-2.0123771308006845e234,-7.206628489075531e234,2.3576540485837246e234,-9.015118880771839e234,-3.273941910788495e234,-9.034209879903816e234,-6.951753712340325e234,-4.97760247054179e234,6.720811644950427e234,-2.0658685006185893e235,-1.9191720553544035e235,1.923036355495702e234,-1.1930418358909082e235,-2.7249310899273165e235,-8.61176226517227e234,2.996874865582742e235,5.965415592306156e234,-5.242739313405656e235,-3.257035496206216e235,-2.699747400055791e235,1.0206031116161766e236,-7.980885287483213e235,-1.2466702349895933e236,-6.348887572538348e235,2.007971033951172e236,-2.0491260887709904e236,1.8201688689332556e236,-2.0997061563302965e236,4.159337538485924e235,-3.3236643454065724e236,2.4821700474613844e236,-3.3399809249169247e236,-3.9712113686615747e236,-5.241403267274567e235,7.94100121795838e235,-3.1206088361919624e236,7.410952069877202e236,7.188809943843763e236,1.70578016351331e235,-4.554417618197292e236,1.2602027535622152e237,1.1212269508824331e237,-1.9076765307805154e237,2.0543079063162043e237,-5.556316990238124e236,-1.0273179983719724e237,4.3185187980667196e237,3.650651502620969e237,9.053805636130879e236,2.0185961061027363e237,7.499384043370041e237,-1.9401058066158792e237,4.202581831542191e237,1.61332860145038e237,6.4914529525824335e237,-8.528679903847237e237,-1.1252281743565397e238,-2.157827121159485e238,-1.1210271932822402e238,-2.787727055083126e238,1.9047626504301472e237,3.278085081529674e238,3.649332556562946e238,-2.5057692112341998e238,-5.598186973868641e238,3.9687478513608235e238,-1.7445260079412374e238,-3.3660970992173885e238,7.402942660032239e238,3.561261855103813e238,-2.8861202297547195e238,-9.763369687375382e238,-1.9862977254683843e238,-1.169367843362472e238,-1.8455040898260834e239,-1.0790103658945993e239,1.9134006248211314e239,3.134928008006171e239,1.8923076340008126e239,-4.38205363500149e239,3.5847938193250045e239,-5.467812289009792e239,-2.343142378572298e239,-8.662104138014499e239,9.96801641252496e239,-4.616135033799914e239,1.2005214671648235e240,-5.897377390652458e239,-8.027494590669912e238,1.465720512496832e240,1.7398485697873976e240,2.6037680014107322e240,-2.4671447661103864e240,2.2404997821938975e240,-1.7858253291407757e240,7.494913161534676e239,3.826271862531484e240,4.854027985133373e240,-2.7277161716478494e240,6.4329303429027314e240,8.060406094295725e240,-7.732007697076718e240,1.87589601926319e240,-3.98988523753131e240,7.488852539508769e240,1.8799914778107805e240,-6.662797164233226e240,1.725942761859505e240,8.60815639920778e240,1.4622867209564953e240,-1.7412337295640654e241,4.4578065318384774e241,-3.0272811141721005e240,-1.9720792548578135e241,6.913779846095262e241,7.966896078712385e241,1.767644727640314e241,1.9348144796737008e241,-8.349559470963922e241,8.68803588491356e241,1.4049058046704996e242,1.4189542832487604e242,-6.12784332835577e241,2.1997012639165354e242,1.3642413617998284e241,7.813457965215887e241,-3.56617930893136e242,-5.528255565941277e241,1.5653258869883253e241,-6.859966116805472e241,2.083690321311217e242,-1.891297562313222e242,-1.581404783068123e242,6.848304926449517e242,-2.0520120411534206e242,-1.3080491000426047e242,-4.377414140671509e242,3.021840570402565e242,-3.3779129573293004e242,-2.2658042834228522e243,2.4085735432544e242,-2.3939422472360488e243,-3.6289566902285036e243,-4.265781673235086e243,-1.3390049185511162e243,-2.389689746623654e243,3.3137061307065e243,1.831682114671095e243,6.799338737393679e243,-4.280474339134015e242,4.6052927452583416e243,8.728694964888171e243,1.477388154671605e244,3.7552413705224684e243,6.831280681383504e242,1.0784738944486629e244,2.431978654961402e244,2.448585916135813e244,-2.275815054516457e244,3.7087923030421704e244,-4.223108145760487e244,5.533644338595003e244,-3.6083590920976856e244,-1.804008002833081e244,8.47595444957196e243,-4.4418063003544505e244,7.646343174141455e244,6.415282904650863e244,-8.964848898432352e244,2.7291409406414835e244,-5.011124501225702e244,-2.1476492851582427e245,-1.2391085458318054e245,1.280973814881651e245,-1.0287796808802555e245,-8.43706364836154e244,-7.141419118410166e244,-3.9997008168803757e245,-4.000042734084282e245,-4.327861934671296e245,-2.3857149749977936e245,6.228478754985793e245,-1.066372345775054e246,3.7254009420591134e245,4.599317974780965e245,6.542914531136782e245,-7.235007879159177e245,-9.776881079745476e245,-1.6442787985752938e246,1.302748333792182e246,-1.8944342493722365e246,-1.6721102271471002e246,-2.7954819747149772e246,-5.169706206497599e246,5.420905105552368e246,-6.307357610921791e246,-1.0403294951299716e246,2.873845512259314e245,9.27561366045084e246,-5.813998234814912e246,1.301938860737258e247,7.799124564303552e246,-1.0428569665473669e247,-9.899175393362347e246,-2.2041305791605976e246,-2.0121621501668106e247,-2.4473900288916363e247,2.647714823051871e247,-5.226214218385197e246,1.1482788632917181e247,-5.376358345392066e247,4.016915759182223e247,-4.342340385259917e247,1.972987831079787e247,4.027712429379906e247,9.237428287056538e247,1.2710667976267132e248,5.547152272485154e247,-3.7118660708502305e247,6.728707860812377e247,6.774700822347278e247,2.9111266387147627e247,-2.0855235996051574e248,1.9744924087367722e247,1.780875021846104e248,-3.317547791432228e248,-3.668023746754489e248,9.288999145498216e247,-1.232290749284795e248,-1.7344034685030157e248,-6.045331818051815e248,7.335089591940368e248,-6.591884802018957e248,6.250712303618525e247,-1.1508515867630514e247,1.2021793948576804e249,1.810624377549964e249,-2.314059082392906e248,1.9197060777546264e249,1.2817132190689857e249,2.741939971084925e249,1.2834988760625138e249,-4.009514170718571e249,3.8932851915845795e249,-5.804764074690558e248,-4.015582768924502e248,7.30953709303124e249,-4.810703691723476e249,9.51913962881941e248,-5.930424476566288e249,1.5284619164958137e250,-1.906697149555205e250,1.244485271665836e250,2.2463668387752123e250,-1.646193699297495e250,6.87170547919641e249,-9.339905411753408e249,1.2436610085211984e250,-7.691455955349541e249,-5.972287107553777e250,-2.3026642500333048e250,1.5576740210384997e250,2.948478893139531e250,9.691554422708008e250,2.7606863843800165e250,-6.613877412579226e250,-7.22135335181328e250,-4.227183751107243e250,-2.076177450855964e250,-2.6363468531713434e250,9.687831503421213e250,-1.5996768073330842e251,-2.8451092637129232e250,3.501833291449555e251,4.1736062367443186e251,4.988281276078688e250,1.1288890385647035e251,-1.768936046713123e251,7.442530661629836e251,-6.938304868086648e251,8.426151384306179e251,2.0381612287270675e251,1.0758818690502102e252,1.2542417226663575e252,1.589618915545842e252,2.1553993910606173e252,1.406833406318402e252,-2.473851573467249e252,-8.107740539312094e251,2.908152017641192e252,4.886176452432976e252,2.0990540223048086e252,-1.4137497462469045e252,-2.624947963860381e252,5.752971158712694e252,-3.9450324230590683e251,-1.1102424424536234e253,1.1694361763000651e253,8.289588104399944e251,-1.640695121486577e253,-2.344945596389768e252,3.5225323504635015e252,6.594112628253463e252,-9.171157255024364e252,-8.798104332926585e252,3.284765333176607e253,-4.714003670700643e253,1.5921695574182482e253,-6.131943917962399e253,6.305002858056545e253,-3.803937571374222e253,-9.994347676882347e252,1.2374815296022479e253,1.1496910103062891e254,1.694868753726568e253,-5.445572992376414e252,-1.81106758206811e254,-1.4554602258972868e253,2.169340543149852e254,-1.1491280732631658e254,-1.4244335149597816e254,1.7172835304815515e254,1.3446070212085874e254,-4.203013854475073e254,1.0697478782024528e254,-4.95662163651659e254,4.382836306385565e254,-2.4026038152886945e254,-1.06845999907345e255,-1.1683825757119287e255,1.3985572408474896e255,-1.3001121202209777e254,-4.701200144428998e254,-1.121957486879854e255,-1.022901919827726e255,-2.808188274394655e255,2.2291938684994975e255,1.813533740509879e255,-3.060308786031268e255,-2.826185530529314e255,-1.3641329066588794e255,3.3252303169539853e254,-1.9956500790319603e255,-4.4969979562866006e255,9.931781146444358e255,-5.23188974027999e255,-1.3070890137213273e256,2.7946891395819845e255,-1.2601505890857025e256,7.235032926530698e255,5.419834321058053e255,2.5695505523327044e256,4.9979831985752e255,2.075378150172783e256,-3.473640465878695e256,1.4029049440504898e256,3.315170874390497e256,4.206469026402078e255,5.269002885717514e256,6.685786490933974e255,4.7541135050625515e256,-1.1319072112677183e257,-5.334105813960499e256,2.6928713001967226e255,-1.7014582923116544e257,-1.4182117652594238e257,1.870145312134481e257,1.3563445003767613e257,1.4662805895740715e257,-3.543566977082339e257,-2.6738843160128383e257,-3.2636897409399195e257,7.148162940264445e256,5.780202407603961e257,-3.508822551085059e257,6.618272401807841e257,-9.011999231038142e257,-6.762443267046659e257,-7.55149186750961e257,-6.837555385964195e257,-5.356472959017946e257,2.4837078086809825e257,1.5333549894190247e258,-1.9761166725783694e258,-2.2700459676377354e258,1.648723751153656e258,2.1635013145015157e258,2.484197054156904e258,3.4252352246193744e258,-2.3919560700552524e258,4.188294469025352e258,6.017333412129081e258,4.92459967697048e258,-5.370262248828792e258,6.072180312952748e258,8.888729316647052e258,-7.596103255743277e258,1.86094601827106e259,-2.1464971578741055e259,1.128955361531433e259,2.621764237363329e259,2.412408997114506e259,-1.7249162354866322e259,-3.630883260050232e259,3.8162777089846176e259,-1.9209239689685873e259,-2.206904465239993e259,-3.6753441559416704e259,8.414924382604026e259,3.424152771330994e259,-4.793463161597469e259,7.628322192064733e259,-1.3925562782158647e260,-1.719909013267883e260,-2.3386988582146785e259,-2.4094841046752199e260,-2.588293829224407e260,1.8219791688063165e260,1.760757973887376e260,-3.27310613109017e259,4.0706469805430305e260,-4.2243998254522246e260,3.360818855298595e260,-6.232281206182226e260,6.996106641315923e260,-5.917712382714023e260,1.9259305928266904e260,8.118159200168995e259,-4.920969451064379e260,4.1158473823945257e260,-4.1269603458433924e260,-3.6337588176286235e260,8.736125797254262e260,1.538122182144507e261,4.044153104008024e259,-4.0367334764890555e261,1.8882928187820764e261,-3.9499144651099534e260,5.755034707206758e261,-6.2675226157503346e261,-6.5477668143992e261,-5.1679112953522685e261,9.730761276044195e261,6.473246106150023e261,-1.282646257187183e262,1.4730757300783488e262,-2.2544865572152628e261,-3.6706059540502143e261,-2.463593887332914e261,1.0824580296601658e262,-1.2160080502460759e262,-9.399732825579414e261,-2.5494377785699018e262,-4.5250661514661976e262,2.3051015613659202e262,-2.2233839953875805e262,-6.496670000667623e262,8.155748525067869e262,-4.905946080906727e262,-6.681656535550627e262,-2.535211140466698e262,1.6294981937782876e263,1.404848434279099e263,1.6723727020970254e263,9.432976849414782e262,-5.309006187246771e262,1.7342712573221678e263,-2.613010783246344e263,-5.509449045092401e262,5.122388708150536e263,-3.071216199881844e263,-5.296889446207174e263,-6.806819627733467e263,3.5573082795500016e263,-2.0039616204498846e263,1.0256040709699101e264,-1.0586170631921917e264,1.2932572099051664e264,-1.7462611221100683e264,-2.803130790727433e262,1.8883372015047422e263,1.6368813355990953e264,2.7758958445445572e264,-5.954842859336162e263,1.3688557814761304e264,-3.7426968357922823e264,4.6385614025897715e264,9.615518809639424e262,1.9985595473865744e264,3.7107486754845303e264,-6.744838600114735e264,-4.354181916881159e264,7.283958933366572e264,-4.467516913396758e264,7.307269865699727e264,1.2919269340085013e265,-2.1504537959672102e265,-1.6001285866144312e265,-2.0742797546147034e265,3.32165762087886e265,-4.009130473570274e265,-8.356756333894605e264,1.368155078786043e265,-2.1628115332523124e265,1.986457336615766e265,5.420444946632694e265,7.164614295145764e265,-9.170860033544092e265,4.376648819605357e265,-1.0919665560422758e265,1.4313864337125235e266,-3.381017563986133e265,2.631954172605708e265,2.2101619158149398e266,2.5272854040780347e266,-8.684327467366576e265,-2.135719159812217e266,1.7755103031957066e266,-1.3950631368326276e266,-3.317194312960269e266,3.154711854378678e266,-5.333127445512458e266,-7.99673788474413e265,-9.633361574903155e266,1.1876636098660386e267,-9.164540094390463e266,-5.51075823989325e266,-1.669871387285636e267,-1.4774029046310041e267,1.8130020346908733e267,1.857100950056599e267,3.431352403331092e266,-1.1421427563622077e267,-1.4200679186055863e267,2.5301074119229906e267,-5.085115314980987e267,-2.577310522828485e267,-7.389408798643157e267,1.3830054046662112e267,-6.579749519449963e267,8.489351925864786e267,-1.8135036891041418e267,-9.988001028590055e267,7.160101007030702e267,-4.14412445929078e266,-2.2087804183517365e268,-2.605422538961999e268,-2.1551581576215458e268,1.523069714316813e268,1.0421353115343162e268,1.5693971574089391e268,-3.3085418022792886e268,-5.103586635817969e268,1.2832903369853376e268,7.33062994124652e268,-7.583989515779868e268,-8.840118935054826e268,2.5502801216303782e268,1.5633663262154934e269,-1.517288977478795e269,2.0516769478981995e268,-1.3539104099908455e269,-2.5083291837551308e269,-1.0514156424412844e269,-2.2949254600276924e269,2.5509158154504496e269,3.245175430468176e269,2.315946817929735e269,-5.1156217791595184e269,-6.229212092789982e269,-6.879540447204205e269,5.714425049828589e269,-2.3891254565265766e269,2.2230380863932946e268,8.567182223361181e269,-7.663349377727946e269,5.1117185859444397e269,-2.771267414876326e269,1.1659254275357712e270,-2.54172035040957e270,2.5774016299002483e270,5.2110129355574104e269,-4.473315513372992e270,1.6259208832881148e270,2.6095110943855325e270,5.233660531135746e268,7.859114371920856e270,-4.657513848890658e270,-9.22476275983753e270,-1.232525188362621e271,-9.339223849763357e270,-1.1232060508845594e271,-3.8935295344164015e270,-4.688110889556731e270,-8.89393270415524e270,1.3123534228554303e270,-1.049038614437988e270,1.7634925388245952e271,-1.3514979796726453e270,-4.571949253942925e271,4.0008220504894905e270,2.7189723570804398e271,3.0445712230812895e271,2.2919208097595214e271,9.978993441696766e271,8.568225584934217e270,5.224826597931905e271,-1.557528733453032e272,7.613896786614482e271,3.974103325374723e271,2.476374375915944e272,3.8706303672291566e271,1.2718257912760166e272,-3.550021598127733e272,-4.297776150019897e272,4.033490473165258e272,7.447258923404979e271,6.025206807032806e272,6.488290275638362e272,5.127265018653651e272,-7.458516058483824e272,-7.110322387079436e272,-6.658265686594619e272,-1.210007369227612e273,-1.694054686254298e273,9.212123026226303e271,-1.4017701817149378e273,-2.5672282618450246e272,-1.4546372942667905e273,1.908397218133472e273,3.5776103986329595e273,-1.55991791731542e273,-1.4330149572264351e273,-1.8784891637305375e273,-1.3812192884920647e273,-7.430312942331446e273,-2.1250952240298144e272,1.4497568578069828e273,2.046507692462029e273,-1.3563186904423726e274,-1.630382859891263e274,-5.584494203476266e273,-6.867278446365551e272,-2.9302644816627766e273,-2.714085667569463e274,1.5741497003091258e274,8.727380185223041e273,-1.2154501749187397e274,1.7153363037869527e274,3.749090457225445e274,2.963520752975355e274,-2.2694769993445494e274,-5.729177918331888e273,9.294290688732692e274,2.2794253557810936e274,-5.813997796353272e274,-2.963446469402413e274,-7.756909146466758e274,-6.6516988712729835e274,2.1271353536160903e275,-9.342829000990026e274,-1.0372976938936818e275,-1.5608141395878106e275,4.023683566261939e273,-4.9668589372284263e275,-3.1889523375514344e275,1.2647652976308855e275,3.8136644730245855e275,-9.006333730974137e275,3.8085551877469015e275,1.770164607280585e274,4.170036801447662e275,-5.3190138060915494e275,4.7852765730556245e275,-8.868425919653053e275,1.5731037504976655e274,-2.234173024531708e276,8.93683875856174e275,2.979322168633911e276,-4.3191546251995234e276,2.3573232132596944e276,4.369980124648403e276,-3.286009909555841e276,-4.989910686778281e276,-6.906457454209145e276,6.32856087630515e275,6.448792351373306e276,-1.8209742954212487e276,-1.54066827473316e277,5.01003124946849e276,1.4155353210008488e277,8.483868980606638e275,-8.375508494002229e276,2.133554217435905e277,8.410087888073859e276,1.2829137681984335e277,-1.2685767942940901e277,8.45140430348503e276,-4.823154574712719e277,-5.107781125162329e277,6.344442559874223e277,-5.316082975722371e277,-1.2683015803545128e277,6.059727214646928e277,7.013037267712673e277,-2.9129192251248154e277,-1.12328367377571e278,3.052214183387936e277,1.3074180077531295e278,1.092341039975774e278,-3.605606823666211e278,1.3319283691540492e278,-2.7624683028954422e278,2.077431114612577e278,-5.574216750495956e278,-5.986407243513062e278,-3.744707767491529e278,1.8820165876315705e278,8.871117856127575e278,6.42154977203268e278,-8.112690615661786e278,1.1086506897939789e279,1.7305796012279037e279,1.6975757205924883e279,-8.70942092171751e278,1.6227204249750125e279,-3.0653525411282443e279,-2.3525830293733773e279,4.278469205525256e278,8.823835981258618e277,-3.311355989854134e278,3.564927440499929e278,5.278685693081669e279,5.013345220757493e279,-6.693227115469575e279,-9.514029523414078e279,6.641679952617056e279,-1.295431997902753e280,1.7604522756262308e280,-5.061752969552255e279,2.208128026315202e280,1.4901681744740465e280,-1.1888677938566493e280,-5.091516250315237e278,-2.8502337697153857e280,3.9130173864016296e280,2.252385282045363e280,2.654006200956028e280,3.1405051936434033e280,-5.098863042139548e279,-3.6736100905796275e280,2.7189687309646703e280,7.634615939159648e280,-1.610013378045444e281,1.6608477273007884e281,-1.490871427688681e281,-2.3050044339583718e281,-1.5800403048485745e281,1.6115925465742555e281,2.96504385691212e281,2.912915032206976e281,4.5605945609491776e280,5.426425828875754e281,2.2496672403231985e281,5.5991625574606117e281,-1.415380869699208e281,2.99382760624549e281,-7.803063165796132e281,3.750465359525995e281,-2.4636662327693095e281,-1.4176036806743189e282,-1.7499216487356698e282,-6.344348829608903e281,-2.2131072291885362e282,-1.199045036996053e282,3.676808614958407e282,-1.221223221549099e282,-9.45883789195257e281,-3.6643847749311274e282,4.3235400466141076e282,9.999113062108319e281,-3.808143261860786e282,-4.173778141371257e282,3.111990435014121e282,8.175664801804376e282,-1.4988243912861846e282,1.0705592656304147e283,1.0073996674991345e282,1.1218509628902441e282,-1.3827605496155806e283,-5.032443868256818e282,-3.00602810479135e283,1.23951469106687e283,-2.2856662532190153e283,-4.859036264529992e283,-4.44622987925024e283,8.350429315191574e282,4.8237079005801355e283,1.7550737463418776e283,-6.989457812874767e283,-1.0724982814356604e284,1.2161322701886546e284,1.0292155076029915e284,1.2482779558231032e284,1.797465306406413e284,7.079485415910478e283,2.5691144596736264e284,6.996727125073133e283,3.103001587672831e284,2.199255899616033e284,-4.839659413444095e284,3.173489999734295e284,4.34809668746587e284,-5.758217773860596e284,-4.6553711656203584e284,-3.38630917729941e284,4.902155870671331e284,5.4172442848226185e284,-5.77720306894301e284,-1.166462361755695e285,7.549081149134034e284,-2.2011448798566786e285,-1.7047473627381675e285,2.6582357375784386e285,1.1385622005057867e285,-1.6018747342518464e285,-4.3075547341597655e285,2.4640404026040832e284,6.724935697074059e285,-6.497940535386264e285,-2.1605273206722083e285,-2.2740545739646752e285,-1.2243037706326054e285,3.81602545628868e285,1.9520744520413375e285,4.221772323075157e285,7.516783960480753e285,1.3497283413984818e286,2.205223866278458e286,-3.023008536363764e286,3.0457072186585306e286,2.2482675775151717e286,-2.5129240436718278e286,-4.032122566046194e286,-4.2729844071238885e286,5.615132741820542e286,7.265337179994755e285,-6.729931895798326e286,5.295500747205737e286,5.616066649585612e285,-1.408315022133549e287,1.7595683670795162e287,1.4368981047805716e287,-1.214222538889348e287,5.090954762325293e286,-2.0602217254529983e287,-3.2515180160650815e287,3.18179421135409e287,-1.853229301690292e287,-2.289121760911379e287,-8.070722657262037e285,6.68494447703288e287,-6.599715166966482e287,7.435904626314088e287,-1.8086070308215365e287,-1.2806110256445278e288,6.437083350241213e287,3.523542779298959e287,1.491632683912845e287,-5.644104547757405e287,-1.6239827841349949e288,1.9855254258419792e288,-2.6964442041432246e287,6.568351835564046e287,-7.590943631534569e287,1.300985326500433e288,-3.502956192546566e288,2.6803203410749776e288,-3.9406732316937206e288,-2.524133852749808e288,7.084294625588816e288,-3.9771157957642357e288,-1.6411880256203662e288,1.6483682434329383e289,5.86530270265459e288,-2.456216243443228e288,1.9149737768717166e289,1.489801997924499e289,-1.4742692333536194e289,-1.0021487086515783e289,-2.4876055959234613e289,-2.7291774095515805e289,8.813689623763622e288,-6.46152317104349e289,3.0106857037277498e289,-3.0213153337168875e289,4.744445672823422e289,4.493055692248934e289,9.404793703205846e289,8.763917247505026e289,7.479167517189287e289,-9.401921915377925e289,2.2413293962481898e290,-4.296330095357909e289,3.3205163642431406e289,-2.492244428798592e290,-1.927682536857715e290,-4.254755738980468e290,-3.2086143354848557e289,-4.7655215836978156e290,-1.672727577807678e290,3.309090222142117e290,1.695783749641019e290,1.047744524121651e291,-3.5950185181651196e290,9.015091899908449e290,-4.5182234179352025e290,1.7613218746628943e291,-1.3059924123550183e289,1.8219543559678796e291,-1.3753860349714272e290,3.6256203978905215e291,1.490207435893698e291,3.1878533348415287e291,4.693107065055108e291,-9.580787531323365e290,-5.441013883349797e291,4.7088002968853785e291,7.705600566920915e291,-9.97396650718359e291,2.54427211136799e291,4.604253631076001e291,-1.0286442364979102e292,1.4997438546778684e292,5.22303038194859e291,6.2186089380593956e290,-1.2291785998185632e292,2.362235017636391e292,-3.281831899144275e292,-2.948995849353119e292,4.948528968668242e292,-5.056341999203847e292,1.0767248779398345e292,-3.4820257250195096e292,3.985378322020009e292,-1.1157906546470355e292,-7.400251476409995e291,-6.238204690738773e291,3.2901833662332444e292,-1.8875482761516944e293,1.4320627344931292e292,-2.3376445401451405e293,-2.933108310328621e293,-1.6492692154006042e293,-2.4022170723698743e293,-4.18805345549422e293,-1.4130362071970352e292,1.92420915159642e293,4.9295671820038556e293,-1.9530750194057104e293,1.9937502908359705e293,6.384107121028628e293,7.866365840020495e293,-7.646145058364715e293,1.0458665205892679e293,1.6630370239585436e294,-1.466405787386069e294,-4.018487829214926e293,-2.504898054442877e294,-2.1066848946664325e294,1.1961337048818715e294,2.4725287720375317e293,3.751201713809887e293,-5.138879799816226e294,1.419867665351349e294,-7.618735613264084e294,-6.563255887093333e294,9.32121961361352e294,-3.082693572723462e294,-4.237148848004132e294,8.440825506082595e294,-1.413302095791458e295,-8.989253852375738e294,2.1547184085055325e295,-2.258046808444794e295,8.77462750976935e294,-3.3250914567339354e295,-1.143702318825059e295,1.3515065337807161e295,-1.2056014341406387e295,-6.278440336853205e295,3.537908781347368e295,-7.2552164968224695e295,-1.4333609838311294e295,-4.314027529917815e295,-1.0005727404093443e296,-1.091272065322271e296,8.567293935444133e295,2.8642825287446316e295,-1.4035825239160913e295,-2.0858202704952884e294,1.2913254045847595e296,-3.447320670843509e296,-2.548310711578194e296,3.851895511300053e296,5.325510853351668e295,-4.955682182929786e296,6.719143394289508e296,6.598545543251783e296,6.091260971777681e296,4.153067870291777e296,4.285062615960654e296,1.1383218259245975e297,6.446309122263883e296,-4.3976467950082154e296,5.46858633893182e296,-7.7660989889752445e295,-9.962318417072597e296,2.566620986266498e297,-1.5942526111286868e297,-3.224442187332137e297,1.9308379615656925e296,-3.683201259568776e297,3.7818180480653256e297,-7.769231698327179e297,-2.348464110829313e297,5.362498603831236e297,-7.023872588273689e297,1.1096520529135271e298,1.1734173925184925e298,-8.720164208536355e297,1.7684742110582027e298,-2.427848290619792e298,-7.70039312109723e297,-1.0313525362417093e298,-3.771494107319173e298,4.0671110884580676e298,5.017488141572884e298,1.7118926099709578e298,-3.550462488555345e298,-4.126376128050048e298,-5.350555987109947e298,2.8012288062967413e298,6.15812640278052e298,-9.13433717165394e298,1.5213735411326958e299,-1.0735448279832506e298,-2.0714388549850756e299,5.988256403910269e298,-1.235942768064724e299,-2.0495026917459415e299,-1.8274051444616757e298,-1.7610306389846172e297,-9.242408196325138e298,3.52696118612005e299,-1.977314412437023e298,-1.5532310325485512e299,5.301203913339484e299,1.7493002037868926e299,-5.743954133038576e299,7.408852029709973e299,4.622511372523246e299,6.92944484756142e299,4.310315740034355e299,-2.1260627974956902e299,2.4249455376747042e300,1.2628265695530775e300,-1.5509726560130296e300,-2.0267550390777456e300,-4.283169516267836e300,-4.086897074871464e299,-4.058556613983234e300,-4.218364620846225e300,-1.9462923666925436e300,-4.773150905475053e300,9.618319155409013e300,-2.1549716444613167e300,-6.085265505346325e300,-4.3520854955189124e300,-5.913291274749843e300,-1.9619238716344062e301,-1.0378785838172982e301,-6.693030015362856e300,3.1345470285340335e301,1.9596430808826348e301,1.0309952798127299e301,-2.654244792050463e301,-1.807944091081136e301,4.412112342638006e300,-6.64010644864383e301,-6.439993301479818e301,1.7978752416741657e301,-4.34002543600365e301,5.316966094184479e301,5.3519343121667595e301,4.928666087970966e301,-9.570631900617931e301,-7.032927038716523e301,-9.964677223983334e300,-1.717667372141198e302,-4.572367028549846e301,1.2985219797064316e302,3.924848424408328e302,2.697658489469516e302,2.363730947888865e302,-4.833781464667968e302,-1.2126850594507916e301,6.62517848620199e302,5.068728686311992e302,8.22072327658518e302,-8.84745526149176e302,4.722272938924989e302,7.270340595757547e302,1.4041209380513525e303,2.7537092853568774e303,-1.5814049265489233e303,2.640754071001965e303,8.926652405883128e302,-4.8545719761369094e303,3.9902783438741136e301,5.168171874344561e303,4.148095481178046e303,8.159708574577629e303,-1.7302513987987893e303,-2.2434835713546777e303,1.3222214223900585e304,-5.726241240188733e303,-1.4971434144497821e304,-1.8464392095690005e303,-8.418808053327455e303,2.999773237709884e303,-2.409129945446495e304,1.9553563501244824e304,-2.80409817356976e304,-4.769907575021844e302,-1.9263052304890333e304,-1.4610599250610494e304,3.3012034024308117e304,3.0034050018296487e304,9.143989187912013e304,5.806432619785221e304,-1.113938345225293e305,1.1404221977688212e305,6.173262091176403e304,5.1780810630005315e303,4.113724271759224e304,-1.308033200864385e305,-4.814637147586448e304,-2.0704956879272093e305,1.308026656847344e305,-1.975533399544189e305,-2.6760204357107966e305,3.7181792725339094e305,-3.4381205127245833e305,-4.597423943060112e305,4.378546699781376e305,3.766380072193049e305,-7.000158499677055e305,2.2699400753189824e305,-1.3281663954312572e306,-5.9229864710475306e305,-1.6806320305244217e305,1.6924175885227208e306,1.523654600478325e306,2.475810852590925e306,2.009575672678028e306,-2.3507493897402105e306,1.9720980983351293e306,-3.402228327022121e306,9.289953587605723e305,-1.6683018932793426e306,7.434936369973076e306,-5.415306785968498e306,7.826456462846513e306,-1.1605774826640502e307,-1.4227287730597095e307,1.665146397857088e307,2.1096954088047507e307,-1.7564729688672737e307,-8.933872938550309e306,2.329219224628727e307,3.3480305991710616e307,3.7602131184033044e307,-1.3582337789240296e307],"x":[0.29687281941651933,-0.3719112180251198,0.20074509588756603,0.4278441849525588,-0.3909767254001207,-0.22638148312213704,0.9777328257346785,-0.8320787442619315,0.5772198470653408,0.20338527285348942,-1.1079743672694407,-0.7752842229805124,-1.726205312486667,1.5880230338704675,0.471411994075143,1.4388419552412628,-2.6170422795355726,4.483849165933191,4.811775465982656,-4.489570355705129,-4.41243570591512,-6.631075776439774,10.945507996514966,-4.503581889139265,-4.145328449175907,11.353201427552566,4.05602741867751,-21.787691241845923,-5.23983138741237,-13.994765156771892,22.67411883941929,34.03951713523708,18.96189698883642,18.412834465934065,33.66786547185526,-30.97214244617078,-0.7131477772270823,-31.750062464316382,-43.75493700667522,112.74696827913182,-24.845897694907812,113.71036307743724,121.65338119273395,61.936101048673834,6.817644897228639,-89.77219187047788,298.27479744959356,-143.20924529930446,412.27712299516145,-102.57371058038908,-452.8417774872916,-448.5734903892334,163.48046854805955,-391.7309906829562,-493.7678863666252,-1142.419224200148,-683.1538877192096,170.08619151434922,995.0206571693088,-923.1916417059856,-1780.460770114224,2856.364385057521,1525.2033604678584,1793.7242415442095,-3804.2273493521775,-131.7691100189674,2930.3460566691615,-5608.679680092377,6694.833202629879,-2652.453199949115,-7919.184241139325,1930.3306328909969,5877.876566872212,286.7832144706004,6130.710446147636,-6461.90576908936,-23130.97383957136,-24412.14541687986,4551.088602046307,7689.076482466305,8514.603293050981,41951.357617378926,25289.993595211934,63894.16061764399,-22295.04632447857,81252.93660884025,-74820.78927805804,-52490.22042597498,-94939.83413012189,-9236.854860233409,-117954.3703523836,135577.58064371085,12829.536405147559,-64214.896186141,-91531.03211534824,-49848.12526475043,138759.05789809994,-342987.01156647614,178764.19253723708,125754.63747224786,-243024.5671025292,-540948.2750649686,584100.834922629,181781.54991613585,-1.1172064673818056e6,75423.76624573527,1.6432890013134028e6,266618.30733749864,-1.2347904122320472e6,936722.0158695794,145887.79955369668,-1.1916003386162692e6,843412.3849244599,-4.475838040175209e6,2.740049677604018e6,-3.3673896892998423e6,-771398.484890837,-7.415307879859116e6,5.1478374548443975e6,-8.926463017680258e6,3.7145904661443955e6,-6.036830919600249e6,1.0826038373424256e7,-1.3462615819491373e7,-2.9996700310665043e6,-1.2912563827856181e7,-2.808989985655428e6,1.4972015559946917e7,1.9539377874079306e7,2.14090376889797e7,3.2485471462412678e7,5.808411835855657e7,-5.13237706722867e6,-7.149655948497376e7,-1.9025572515584614e7,4.324636435005067e7,3.202562647887947e7,-1.0593280469091089e8,-7.576265263370168e7,1.0335941076910542e8,1.3806056751491407e8,-1.7895230659511608e8,1.7571777392983344e8,-2.248681356223159e8,-3.1097409040404224e8,-1.6616800473052844e8,-6.014472161352726e7,2.329612634052467e8,-2.9721922114373606e8,4.3597821766357934e8,-6.147134300125825e8,4.491267509467228e8,-5.351243218339019e8,-1.2060012659348855e9,4.3052427689534193e8,-9.560944480014372e8,1.7624065019431465e9,1.78670824868283e9,-2.311028634174676e9,-3.688008124233156e7,-3.3283215577921367e9,4.612514313618403e8,-3.3346847798275123e9,-3.854002358989489e9,-3.467899877880679e8,3.2538849790158944e9,2.8015888449683404e8,5.553546123525297e9,5.025442050511453e9,5.144355862447561e9,7.418192444162984e9,1.5269200107907764e10,1.040960985413325e10,8.204446319704369e8,-3.4183863813690925e9,-2.3615575577221466e10,-3.4516901879627396e10,3.2564238063125084e10,-4.347404113240841e10,3.3593997734360466e10,3.287242804199878e10,4.793565030010073e10,7.429605685931519e9,1.1826620753784388e10,8.419960308845792e10,-1.0704785210930952e11,-4.539072377092293e10,-5.165897342029408e10,9.770193596540001e10,-1.9777369600607077e11,-4.4639350966773224e10,-2.2307663490115353e11,2.7200127694247867e11,3.635567397065083e11,-4.721702239249358e10,1.3078751093230571e11,4.713213888028077e11,5.1579619138287006e11,-5.004471789446946e11,-2.5008688151048767e11,3.317181316068029e11,-5.3594258949175183e11,1.0872312112160568e12,-2.274970646539067e11,-7.571343079382651e11,-1.2111384205237322e12,1.983618320064565e12,-1.6939678535941506e12,-1.3735347984975522e12,9.644181246514742e11,-1.683220120912985e12,-8.469255122454966e11,-1.0725008262555471e12,6.008782628381823e10,6.18229926099178e12,1.4448616049290664e12,-7.274239175721663e12,9.499910869181562e12,-3.557601358644862e12,-2.0959372850092449e12,-1.5116013916391273e13,-1.1145793645953775e13,3.662348435187559e12,-4.907474192222595e12,-2.8210400657602383e13,3.3267697308481945e13,3.4092664862791703e13,4.731698719677558e13,-1.0203904729998006e13,-5.741761753570648e13,5.101115663169261e13,6.700063161418863e13,2.4594325394775883e13,8.745448284260903e13,-5.219694007386306e13,-4.7483048815969805e13,-7.702112350270039e13,-1.6360648517422125e14,1.940880212679318e14,5.221439942564483e13,1.0041776333902552e14,1.1580459432309025e13,1.5718553396569172e14,1.9115860609402246e13,-3.223164527847944e14,-3.9463560516766525e14,1.989127759906204e14,7.642144382707178e14,6.5752086108627055e13,6.099379649234698e14,5.1567837886946194e14,1.312521054861317e15,-1.56662561866027e15,7.335316731319899e14,-1.6609635793116445e15,2.3327012975925753e14,2.6484787247213385e15,-1.237498611957419e15,-2.59535523615229e15,-3.660709086890531e15,3.6947063652533645e15,7.44231498254965e14,3.05531048580574e14,-2.3671836636193324e13,6.7488062466228e15,-7.75392404600823e15,6.20035192813969e15,-1.2825610081980574e16,1.126818418765951e16,-1.2617738947077844e16,1.745409747270185e15,1.5821780320872552e16,2.4345017725788772e16,-2.20781226639426e16,2.828929054941896e16,-2.1398596087719395e15,-3.696841610260804e16,4.6894009139544296e16,1.1809907965959016e16,-4.744190063789879e16,-1.5978891155008614e16,2.1516075802049924e16,-3.103001980580207e16,9.784281416791406e16,-8.463078835025648e16,1.480406182762393e17,1.129102399290093e17,1.276831689862708e17,-2.526418899850334e17,6.741222807329392e15,2.5234168343763972e16,2.997859681222045e17,4.101880411310816e17,2.748503537120135e17,-3.73944850510963e17,-5.20364731237723e17,4.0813501786199123e17,2.7571330800554576e17,5.197849471990531e17,-4.650270864772198e17,-7.164513742504511e17,-2.3157547173424637e17,1.21912894418552e18,9.433586878557813e16,2.673919687875127e17,-2.604520819631876e18,-1.663047355066575e18,-3.559299575714727e18,3.0152836863612273e18,5.081114245727473e18,1.577810981744146e18,-1.9328116944469908e18,-2.2782610722959375e18,6.361657719853561e18,2.318891707582188e18,-1.9386853848131592e18,6.215707330059606e18,7.675153219211539e18,-1.5576195191529435e19,7.133260705508959e18,2.3005999512426696e18,7.806608523062458e18,-3.721895100278702e18,3.692486509509604e19,-1.434986114254741e19,9.3878085392416e18,5.446896311235247e19,1.0546484275902906e19,-6.327846902230333e19,8.736394886148805e19,1.0092590272824007e20,1.7309020892001681e19,1.0553190781054943e20,1.093791239501274e20,2.343662748557548e19,7.251454855804201e18,8.197062152029987e19,1.374272041001158e20,-6.823367947275504e19,1.4844742479456256e20,-3.180624584863883e20,3.391365106821515e20,5.2973518496095594e20,7.706444502205193e19,-1.4457183479682718e20,-4.808222131157164e20,2.3420014876917845e20,1.0287624253459064e20,9.126197887658109e20,1.5237503166489024e21,7.191460712017345e20,1.3662749635733008e21,1.3711511328439007e21,1.7801190330042045e21,1.5288318700837764e21,8.395118277021148e20,3.1769070204942056e21,-2.4521811031931266e21,6.172626299854839e20,1.012465640471772e21,4.835386613541512e21,7.64462950100978e20,7.217489389803932e21,2.121849745764465e21,-5.143771920142259e21,-7.024875728046861e21,1.0164266365380924e22,-9.132605027648552e21,2.0043580958553774e22,7.987290558997094e21,3.2020856582362675e21,2.421979933392731e22,-1.085279947851574e22,3.129772199798926e22,-5.569487055668861e20,2.7816129733731746e22,1.2407629783346736e22,4.3059338249272755e22,6.164201239814291e22,2.4176222825884473e22,5.8128032435980904e22,-4.291067938674374e22,-6.7610702331682365e22,-7.996845218779518e22,1.3678812659754956e23,1.910379743885002e23,-1.334878618522281e23,-1.590593341584638e23,3.396483537521705e23,1.0237455769698807e23,1.8699484113395985e23,-1.0181714518370678e23,-5.83834474847607e23,-7.671849678995732e23,4.034959768516296e23,-4.446581673629542e23,-4.951866243739917e22,1.224935099720393e24,4.2571873227912956e23,-5.44305579059956e23,1.8103165799654876e24,-1.1913079822678469e24,-1.9420703852185568e24,1.4653305905912152e24,-2.5690930760180107e24,2.984970086514549e24,2.43353034974817e24,-5.610636161468355e24,5.183803083951965e24,1.830530263874011e24,-3.533158380734515e23,-8.355977332916244e24,-1.00132679590501e25,-4.457657168242088e24,4.27707130221269e24,-3.991264055207231e23,-1.9228991934570353e25,-7.139307569636857e24,8.959739910025723e23,2.4096163076160005e24,-1.7141912183849757e25,-3.3329381497863633e25,4.658182611840346e25,-4.651431397315731e25,6.2010631036273545e25,1.0666311492983908e25,5.6698097145585e25,-5.69045060584093e24,9.548542073409161e24,8.503680973297715e25,6.5399727812539564e25,-8.55828694047309e25,3.8397616469906857e25,-6.419342858890062e25,-2.3817135606480915e26,-9.458275243700326e25,3.386752354550615e26,6.1654682594175465e25,2.4320644757183905e26,4.177905509374636e26,-2.5091383799443676e26,3.257758002964635e26,1.397276424025318e26,1.816256206163508e26,5.466490601586533e26,1.24496854491646e27,7.093761283969022e26,7.809425714472186e26,1.647406571761609e26,3.9605837936234645e26,-2.152010880768707e26,-6.337019501939958e26,-2.8224852925980213e27,-1.2067117296699297e27,3.160364006059039e27,3.3625649408067256e27,-8.848026870082797e26,-4.725325484561365e27,-2.859073733691327e27,7.182075735650816e27,4.865836046360166e27,-1.2082240949161115e28,1.0511219163997968e28,1.6700375476689243e27,1.1602666791523577e28,1.4950809669086768e28,-1.8322965492174627e28,-1.2445168360645268e27,1.9561673309443702e28,-2.0721736832272808e28,-3.8783913343583914e28,-2.444908850453772e28,-2.0361610458253637e28,-6.556899350959646e27,-2.525604778582787e28,-3.065914544843358e27,-2.4355331028728697e28,4.603303664762201e28,4.958404935365402e28,-5.757210941255577e28,1.5742051771219797e29,-7.184406573213427e28,-1.2222275496895792e29,-2.6186902265804056e29,1.5572635777341665e29,-2.2294240256386903e29,-2.7857175671758878e29,1.3344187346919812e29,-5.587707951769491e28,2.618223681522609e29,4.1630864133109865e29,5.6034818647088396e29,4.1822093311851826e29,3.157996609085493e28,3.702408447705683e29,-1.0305792264994877e30,1.3695930540179212e30,3.416363631481674e29,1.3419980045625428e30,-1.0375467908074105e30,-7.527938765895545e28,-3.35561139402043e30,-2.564105778317207e30,4.400002069277675e30,-2.5565930836125187e30,1.4203028919959846e29,1.031939037945823e30,8.160069392826107e30,-4.8766773088318696e30,-7.056111863433833e30,7.946515962109849e30,-8.431966219443818e30,1.380341593362712e31,-1.1358383532661233e30,3.6059779796278425e30,-1.8933992081775655e31,-5.234220596998978e30,2.0752404154177183e31,7.94059825196115e29,-7.020832332034627e28,-5.257182479283719e31,3.6025908023827554e29,-3.068295698270542e31,-6.205624864546891e31,1.8796379434043031e31,6.541403816913027e31,3.2618745664412557e31,-4.9411344136071495e30,6.908749300208044e31,-1.4887789759076148e32,-9.579152384257612e31,-1.3086342261191816e32,2.308522345088372e30,2.7490320697765978e32,-3.6107217058702945e32,-1.4688931584141966e32,4.379576021945032e31,1.1716116008514473e32,-1.3336368922490008e32,3.2224763089818676e32,-5.891659553948573e32,7.278170789209023e32,1.4324502280024346e32,1.3657623997889808e33,6.329729597412197e32,1.1433057851260489e33,-1.711027344885701e33,6.4532131783825946e32,1.99900016844086e32,-2.6280872239667546e33,-2.3375082760099266e32,-3.343639748846137e33,3.1627376886112897e33,1.2707079795740544e33,6.611422166483574e33,5.350869172968454e33,4.105611998170525e33,5.156296873308934e32,-6.372068683215145e33,-5.909697413956277e33,-5.99799064809134e33,1.6558384982888854e34,-1.3087456726010125e34,-5.984882886062001e33,-1.5496452053927772e34,-2.5613049994113008e33,2.5736716808014433e34,-2.940975463982327e34,2.2631994684780475e34,1.3509382987753383e34,4.420358801314885e34,-2.876358217809297e33,6.881800500001505e34,-9.228145209621654e34,-1.26215758602019e34,1.0126635832692533e35,4.1351797621692944e34,-1.3858621458704187e35,-2.2089327281970353e34,-1.6740423455899365e35,-3.746314806519457e34,-1.6590652768441145e35,-1.5369233768002402e35,-2.0048290205340126e35,1.312631690559359e35,2.273234731835296e34,5.436932402844193e35,2.45095052903643e35,-4.6896644266422436e35,-6.789249629679382e35,-6.703034409158763e35,-1.1753062336383984e36,3.1112306040415535e34,4.464069366215831e35,1.5987391461617308e36,-7.048383766701775e35,7.990821922907708e35,1.2176450082884746e36,-3.0919002635282836e36,6.341591180962933e35,1.6577533121783367e36,1.3443351167946253e36,-4.3489649558963304e36,-5.256163222484528e36,-1.6935415827404333e36,5.366523974487861e36,-2.1591233170112782e36,-6.500513252816928e36,-5.748079831583194e36,8.252434440216494e36,-1.027882073823109e37,9.388079623182029e36,1.46752857124338e37,-1.5173396083206299e37,-8.623167012002834e36,3.5676017587829217e37,1.1282244473714843e37,-9.463294467517035e36,-4.645291723472199e37,-5.69100134299671e37,5.215711290968063e37,8.74013187879031e37,8.496811860039559e37,1.0397105530135257e38,-2.861408812480199e37,8.7246223375951e37,-1.4802263018555604e38,2.0020417291903747e38,7.846255462729736e37,-2.5378623822005888e38,2.8107168068213796e38,-3.4143489907987326e38,-9.163550720135016e37,-2.8441452127807268e38,-3.650859071429093e38,-4.7944295741840375e38,4.2778641547715386e38,8.883957819243891e37,6.6903374107774234e38,2.851777641912269e38,-9.687714689579908e38,-1.112037407909224e39,1.501495659340542e39,-1.551200572986901e39,-1.4329416173792262e39,1.267738544945726e39,-2.515813418449694e39,-1.5865527894322079e38,-3.2054581638824274e38,3.5363224122110315e39,4.84272125042056e39,-1.7926399439602037e39,-6.969905975192727e39,6.081418676851649e39,-2.4751888832460093e39,-1.0905089910806238e40,1.000992587016684e40,6.965351922757865e39,4.8372552394547963e39,-3.9172615719036575e39,4.400792457961251e38,5.305322024844569e39,-1.3472658292933755e40,8.47610805740512e39,-3.1544675881302805e40,-1.8416339488623324e40,4.572914821173696e40,5.749477036306411e39,-8.677861075466182e39,-3.8216592839095245e40,4.997505877748111e40,-4.413683211148461e39,-5.9972218382464515e40,7.725579234967062e40,-1.0807067405436429e41,1.6644935592916012e41,-7.070680017599826e40,-4.045539902082849e40,4.689270037358098e40,-1.9313102677614528e41,-3.5308282698707655e41,-2.5980550617771783e41,3.276965481599401e41,3.840875845478511e41,6.539367250185417e41,-2.7325276094027646e40,2.072965714415395e41,8.306304937717486e40,-1.1398748036745819e42,-5.039581472006376e41,5.670867833935086e41,-3.4461398094097397e41,-1.8067018676432838e42,-4.2828293351499445e41,1.925480101393545e42,-2.372725954158644e42,2.205484348471649e42,-6.8498615641966094e41,7.389789040187127e41,3.3153104788643225e41,3.749991801740514e42,-1.8981640451663186e42,4.5799303738969137e42,2.1317445178910742e42,5.866016437103083e42,1.417730875117788e42,8.356170041119752e42,6.62913393331543e42,1.2012413882783956e43,-2.266595758058078e43,-2.5160864800326683e43,2.433263383219379e43,-2.1095832793250636e43,1.9925435919399003e43,-1.1188004053946371e43,4.280806557471509e43,-5.203221287654794e43,-3.2873503934873116e43,7.841506931173392e43,-6.375242135627657e43,-9.583259762481195e43,-9.716477505030654e43,6.714635477874561e43,4.485059216780914e43,8.897792886894066e43,1.3313372940468098e44,1.8261872361908987e44,2.125150055946571e44,-2.653884058553413e44,1.7810566374036002e44,-3.6135103143393476e44,4.629886334452001e44,3.6747860425815675e44,-4.753763401100489e43,-3.5210647234058165e43,6.315235135953801e44,-9.666000793949706e44,1.583071310470827e44,7.059282040427912e43,1.6579710168666326e45,1.0465556083266739e45,1.5273192611570333e45,3.932588163834285e44,-1.1599981931901033e45,-1.9680945325778816e45,3.5552248074834826e45,-5.26338576486968e44,1.3175170426619201e45,-6.748209716411674e44,-5.4190802624656824e45,6.159659261494404e45,4.3101886538358856e45,-8.180690995211494e45,-1.7218835916171313e45,7.491391895890858e45,1.534537394451365e46,4.862839903095966e45,2.305195602168938e45,2.3396177608195727e46,1.9134240745338846e46,-1.6755966617117603e45,-8.621883882021205e45,3.042448197064317e46,-1.1449254444201374e46,2.956537264672683e46,-3.103612881946284e46,2.7366019488743845e46,-5.407708477643015e45,-8.802051332615005e45,-1.5975447899291688e45,-4.2747037052584215e46,-4.85930588877011e46,-1.4546658487445589e47,-9.980203668975257e46,5.736028389403609e46,1.4988059968526688e47,-1.6044098090965001e47,-7.643147607708388e46,3.8641563941242475e47,2.6189572996310646e47,4.512715180489663e47,-5.3021535130387504e47,-1.1901686782182281e47,-3.2324146333573055e47,5.628849768857727e47,8.376911142426436e47,-4.031745852298949e47,-1.3121963249855299e48,9.002563815112531e47,-9.437554589303944e47,-1.7111848044180782e48,-2.429202231867296e48,-1.927005202675253e48,3.102069575102596e47,-1.0663106712927007e48,-4.2222098810348895e47,-2.6093782189498482e48,2.627154666222278e48,-6.983689529587247e48,8.233799641629707e48,-1.4679366466547097e48,-4.053438814196925e48,3.25226920658591e48,6.603790829383835e48,4.559908789220368e48,-1.890400156626097e49,-1.520243213012041e49,1.0010637371949338e49,1.8655078871130486e49,-2.403330822244164e49,-2.3009455122371148e49,3.19705730341735e49,-1.4268430753766003e48,2.2181044548150405e49,-5.888926739853398e49,-6.393864091258324e49,2.0449687002478172e49,-7.529390760666576e47,-7.052139227363931e48,-1.890358164950312e49,7.417104998979482e49,-8.693634567227515e48,-1.2219496972109439e50,2.155413486766368e50,3.8772577838445606e49,2.1560563688396313e50,2.9018534705872346e50,-2.925086115832133e50,-1.180880112503248e49,-4.989183118327345e50,4.958410529458215e50,-6.038925587694237e49,-6.060926940011407e50,8.310933057356418e50,6.927321866756907e50,6.944193322093095e50,-1.5310499488423607e51,4.823858239729643e50,1.5619553229415922e51,-1.5183481545921726e51,-1.5662148046362217e51,-2.3058295998031506e51,3.605400500892466e51,2.27719001900625e51,2.950371808329043e51,2.1591805171859517e51,-5.9032927321058463e51,5.5853746175555435e51,4.600439903474451e51,-9.54608612065557e51,1.3514325494240698e51,-4.2820710816981445e51,-3.835911009212234e51,1.2898092343713703e52,4.5661465193798185e51,-1.1960312486517493e51,1.3993469023976786e52,-1.9849229204013203e52,-2.1586732930054127e52,-2.0481378111619908e52,3.736934885892899e52,-4.549690338474469e52,-4.5130518066667995e52,-3.2709217988405974e52,-6.67619602521427e52,-2.934205241444052e52,6.23390601456843e49,6.148402986927775e51,2.1386995203633388e52,-6.909155593678805e52,2.8546100590503475e52,-9.114506848171686e52,1.507684889008363e53,2.440495540308555e53,2.427160038007267e52,-3.861433000109306e53,1.6096751754260684e53,2.1128377900291685e53,5.399634455699955e53,-1.5652825728242826e53,-3.1819422583822156e53,-4.05526669779661e53,-7.5882307287218205e53,6.367311063627382e53,-1.1499430280610215e54,1.2581486277003947e54,7.4479484799693065e53,-3.1838299323581763e53,3.173658129827104e53,-2.2618984635794576e54,1.895503701409463e54,-1.113903131067192e54,-3.702210872427029e54,2.1997718032980128e51,5.777672919957725e54,-6.38500229975015e54,-6.980457773835203e54,2.3872611298190855e53,8.92963216208967e53,6.518290115267288e54,1.0340199498785607e54,4.412600226898467e54,-1.3318562493148305e55,6.82809392148352e54,2.3854523987022255e55,6.885599200628666e54,2.653317540159699e55,8.484505885562182e54,6.136972878450143e53,4.92798481979332e55,1.7242174990548182e55,-3.8537968590084096e55,-2.714622601961018e55,1.3893483947605215e55,-4.419534415791757e55,2.508500337347082e55,-1.1453366160726769e55,1.2994335919649776e56,1.586996664745393e56,-1.8313805454864937e56,1.4877944213504327e56,-2.189414033217304e56,6.87249907903239e55,3.538894249037542e56,2.3798655377770108e56,-4.711014421593191e56,-5.477975357053157e55,9.95235944481006e55,-2.7357269881890403e56,-1.4306226126650538e56,-8.290180981020816e56,-9.864052728383311e56,-2.9585785463685766e56,-6.631475434294788e56,5.181727559297276e56,-1.70200462960086e57,-8.835914226153189e56,-9.010644827233055e56,1.4817138418572605e57,-8.406183458847986e56,3.319509932122928e57,-2.7459489509675233e57,-1.7976463271508395e57,1.9906431106610303e57,-5.984795322925642e56,6.491661174411079e57,-2.8359303067579443e57,5.153842687505274e57,9.745116130804268e57,5.860620844117119e57,-2.4290045112048998e57,1.0555561052602027e58,-1.893656360783531e58,-1.7231933422182844e58,-2.5408479126605514e58,2.4922816902316506e58,-2.43199012940722e58,1.4539890780103804e58,-3.135732936192957e58,-4.750949536902902e58,-2.0864812889177836e57,1.9272460420620912e58,9.045255190947022e58,-5.778103590175579e58,-1.2599260434823935e58,6.786790478767668e58,6.786220765753791e58,-1.3348602667970137e59,7.821228868658768e58,-2.087950079987462e59,-1.7571506095316507e59,6.187708046239251e58,-2.059823112190605e59,-1.222212538667129e59,-7.131364377666441e58,1.0286472684014165e59,3.865221960409999e59,6.94095031198336e58,-6.581054720697701e59,-8.846813947336275e59,5.1374089681423166e59,1.2093252788956545e60,3.428028169254153e59,1.5848693397706086e60,1.5847823638006538e60,-1.769084890719848e60,1.3557279602458099e60,-1.2487391686493611e60,1.156050451742151e60,1.3135187506958476e60,-2.9694806709761825e60,-5.1812584483379044e60,-4.761835810080515e59,5.741274490455314e60,3.275722930115745e60,9.306616564777832e60,7.767165141209072e60,-6.575775010959535e60,1.8501428172296234e60,7.921312617975688e60,-7.223883826817869e60,2.142611309996476e61,3.1664203398239724e60,-7.509614617328686e60,-1.79459936780805e61,-6.492756441757618e60,4.5905591090921045e61,6.040384125430554e60,-2.7737095807173794e61,6.58915848895027e61,-7.744261271324722e61,8.505816943135753e61,9.256055752680539e61,-6.85578911832421e61,4.971808035637409e61,5.153983953796979e61,1.7605510588982703e61,-1.8551801368649527e62,-8.967213830360202e61,-7.145187073935151e61,-2.333702957105009e62,-3.328873812463624e62,-1.9754138077179217e62,-7.130240262313244e61,-5.25388596020803e62,3.1390826737452e62,-2.411916640317604e62,-9.515871711030721e61,-8.40476427357122e62,-1.0979338100264168e62,-1.3868548879111793e63,-5.813936166131923e62,2.6321562036840462e62,5.139070336893395e62,-7.390260564571483e62,8.399479506610283e62,2.165280590063891e63,3.354845469448757e63,-1.0335475502480848e63,1.2282340295272465e63,2.343613355285463e63,-1.8583125264539907e63,7.471952309434077e63,-1.5580535799737013e62,4.273642269619834e63,9.955792506602497e63,3.708994544907249e63,1.5611640608828485e64,3.79450280835317e62,1.1098592275269113e63,1.9347979010407713e64,-1.5668154118668277e64,-1.8712800628122334e64,-1.6365646980824236e64,3.755140649718459e64,-4.718687337874066e64,-3.281795151395348e64,-1.810336864342528e64,-5.357632751236446e64,-5.556186309255649e64,2.296104853095242e64,-1.5889239432499932e64,7.758855631227203e63,-1.2178632987686218e65,8.6465048181942e64,-1.1926087493290435e65,8.350077666058806e64,-2.0594446569661603e65,2.0100922675994767e65,-2.7393317199931977e63,5.553143455769424e64,1.623771434697983e65,-3.554052831685009e65,-6.143970934899108e65,-6.905087732166363e65,1.1858270191144e64,3.42842401663196e65,1.077793218390688e66,-6.238124128458051e65,-3.6981191229999215e65,8.268680784579501e65,-1.084254008039246e66,-1.7094729830088085e66,7.464355540468203e65,-2.3206186924415446e66,1.6216194996135387e66,-2.791820612987066e66,1.3500617835373678e66,-5.225515162975814e66,3.0135929564315786e66,3.630930318847552e66,-7.616373875470436e66,6.989170184456162e66,-5.241171134579801e66,-7.648064293136429e66,-8.401760518457376e66,-1.2326291288879422e67,7.035008562858594e66,-1.0244718642523266e67,-1.0237129612190226e67,-1.7521544763551847e67,1.4768148284160924e67,1.856253487932e67,-1.478009095751137e67,-1.392250605008752e67,4.8761090406031124e66,2.1151271232958062e67,-5.354875180879936e67,5.16413650056103e66,8.997540218013691e67,2.897424571383555e67,-1.7201159490610066e67,3.076533940865922e67,-7.501379099009492e67,1.1599669763777303e68,-1.4166774603567634e67,-2.5412550646264145e68,6.822219739860327e67,3.0912633456886903e68,2.5968089628631343e68,3.015463049085565e68,3.3246154985095314e68,2.2586644385461505e68,-7.179792998667896e68,-6.31219049938554e68,-3.994027442175829e68,-4.792817174909682e68,6.676850575255825e68,3.576581445592233e68,-4.0796921296255895e68,2.3932865316777535e68,1.1259391576196683e69,1.3548166085496333e69,-2.7746320790399824e69,9.331441991312302e68,1.0446166605028163e69,-1.1118229358381874e69,3.3105875061395805e69,2.6603948996762495e69,-2.8690348641586694e69,-6.980100650046584e69,-2.7230174050661873e69,7.678750258243794e69,-2.117489492646272e69,7.199062135603698e69,-5.495841665533401e69,1.6544561110678146e70,9.189392433652313e69,1.6665074406673517e70,3.993124227690041e69,3.1196788638183098e69,-1.3414658701240353e70,2.056676629407744e69,-5.068072485856893e70,5.595592237083421e70,-5.398740252425969e70,-3.4746200083554426e69,-2.922168365331784e70,-9.964766592911878e70,4.092996343056195e70,-3.036572888155732e69,-1.3174174500554064e71,-3.26165764329936e70,1.4255224459819965e71,-2.0066527845186336e71,2.7226981786837504e71,1.1459911856909581e71,3.2148051377285825e71,-2.433761105852591e71,-4.777540163161444e70,-5.193264311570936e71,4.106187672936125e71,-6.729594910376343e71,2.0799867596545284e71,-3.4085030575063243e69,9.842503200621493e71,2.739263515877846e71,-1.2739751822449741e72,-4.742843053045316e71,-1.773021361844161e72,-1.163819337007929e72,2.687848329651661e72,-3.019990784152384e72,2.636971889606863e71,3.2461587491728962e72,4.649914863870596e71,-1.897412795160467e72,3.1275155785534608e72,3.570447296038862e72,1.3109125663497255e72,5.952087383638138e72,4.1687570251121844e72,4.729005312186297e72,5.640746806663596e72,-1.187429206145611e73,-1.5821315701581568e73,-5.367950360081176e72,-2.2475964324072045e73,-1.468547304843082e73,3.187428293084394e73,2.279647685944023e73,5.9976608506630804e72,-1.8272576978305752e73,-2.482601917381848e73,6.8390557674880004e72,8.373593765371964e73,-5.83923496510065e73,-9.329632444601564e72,-4.572535606578178e73,1.226993270757526e74,-8.504743629905278e73,1.9488618014661375e74,8.011696535318052e73,-1.9467191771206666e74,5.1366053838911294e73,1.678380715872867e74,-2.5076522244136337e74,1.8977046671449888e74,-2.880409022086828e74,1.3394648333499106e74,9.608220988568824e73,-5.403858463474295e74,7.699185951845748e74,-7.647528263451302e74,2.273281899626552e74,2.744942348026229e74,7.791579622485946e74,-6.56190970527156e74,-2.0343942961546157e75,-1.8435702128986903e75,-2.280004980151538e75,9.892089059304253e73,-3.494210787255566e75,2.632832325149513e74,4.139013636346918e74,-1.1386455191255904e75,-6.856442951833079e75,-6.123722029033605e75,-7.92264808781027e75,2.2987835137122674e75,-9.978776992197754e74,6.0075808270137076e75,-1.243934733484642e75,5.494550723483345e75,-3.1685221872184084e74,1.9161167421699813e76,1.3313495921889647e76,-1.1107151734308042e76,2.4273206693546166e76,2.7629340672521563e76,2.7991350958025405e75,2.4591025321244822e76,-1.2351557216921473e76,1.2111625988864609e76,4.481058797537274e76,9.727937692361482e76,-4.690254900188431e76,1.5171119720916947e76,-1.5375464732222444e77,2.9762365496226325e76,-1.4500253207639497e77,1.106154775123702e77,1.497883293087332e77,3.0527994735685056e77,-1.969203474470456e77,3.483441720522948e76,4.0137585063043365e77,7.596679499141182e75,3.119820216473361e76,-6.687589745701905e77,-3.6087370227460616e76,-3.597905046197639e77,5.142643434936651e77,2.353116534452282e77,-1.366775732434422e77,1.0462999962631306e78,-1.4650760506451692e77,-1.9008533378978244e78,-2.4789678767198187e78,-2.5722907700312526e78,3.9838543307483017e77,-2.3224017282089717e78,1.9337389528946574e78,-1.318826915918275e78,3.912168549850267e78,-1.5323101958920705e78,2.4119393288605617e77,-8.47609683295818e78,-1.3121519586452358e78,8.843907993913869e78,1.224965625730463e79,1.3097000607572247e79,1.5763238136657296e79,-1.289607991852558e79,3.746653674251121e78,1.804081004945641e79,-3.3203476818219906e79,8.160440672516131e78,3.1707562447769547e77,3.1864537494456083e79,5.032272227945601e79,1.5871443547889414e79,7.287684555353187e79,-4.825596096985109e79,8.46737509476759e79,3.736334298346894e79,8.447629018913341e79,1.2013530022436972e80,-4.185832103228933e79,-4.7148085790175796e79,-1.2246820604018342e80,1.3864874268390295e80,2.074952138727928e80,-3.0764019093747136e80,-1.748550357768245e80,-2.12081682868605e80,4.3866596464840077e80,-2.6704790643807205e80,-4.1317850223519526e80,5.508282230871565e80,5.221148591329684e80,2.0068329019541283e80,6.889851817209877e80,-6.82459764137389e79,-3.5014335340194806e80,-5.254611021104842e80,-1.9438355559481593e81,-1.2036388229061327e81,1.3413825403655732e81,1.369048822753516e81,-3.4970004719738172e81,8.795020767252775e80,-4.223349437150117e81,-5.554832212084941e80,-3.643070298399954e81,-7.3501139386290925e81,2.8224773584360847e81,-1.423882991710394e81,-1.637860340423246e81,5.536100971183778e81,1.4380630497365943e82,-2.2388057326798363e81,8.852484794287787e81,1.10146531036071e82,-2.8587601453750093e82,3.225861096099687e82,-8.13982913314439e81,4.492102947660882e82,-1.1769443736589941e82,-9.556711818047502e81,-7.114156477304459e81,-7.44031528227105e82,6.111826818234046e82,4.7351052739077417e82,5.287573527850671e82,-6.727939265033436e82,-1.515233507923482e83,-1.364872588174381e83,1.3023853989542157e83,-5.1696624561035664e82,2.385393748036619e83,2.3546188686714745e83,-2.1892718256687407e83,1.7607900682727258e83,-1.919184440037986e83,3.498632193701902e83,5.227998487243745e83,7.238918599036213e83,6.749325569453193e82,6.773066577056664e83,1.1544108837043246e84,9.896784951223608e83,-1.5666042490333819e84,1.0276473484276872e84,-7.178145162290347e83,-2.4950480010161535e84,-1.0236505288268976e84,2.383408926816663e84,2.6832599905890865e84,3.2939441767394055e84,3.798412149143508e84,4.475652345900057e84,4.328757113640776e84,4.784070150775065e84,-7.7321268800046995e84,-4.950990505583298e84,5.049512718003105e84,1.6609892414429547e83,-1.3514706675947603e85,-1.4478503563720326e85,-1.4401313736975314e85,2.2006171514717605e85,1.133934682213242e85,2.805925050033463e85,-2.5041673293356616e85,-3.994331210849534e85,-1.8450493287439337e85,-2.1245846306862937e85,2.3452993276537338e85,2.8258662058813247e85,-7.86884922695916e85,-4.830911497084076e85,3.243274577063438e85,6.0427503366344466e85,-6.107305559146188e84,5.339848229663716e85,-1.5086079037179359e86,-6.816924409792467e85,-1.184534288709384e86,-1.0472319573633791e86,-1.1001676035080162e86,-1.4760975904842155e86,-2.957369834641693e86,1.77715378292066e86,2.937581187815173e86,4.078978782537154e86,-9.852939494128679e85,6.906632718982613e86,-2.676824899950669e86,-1.2652194293482945e87,3.916104557841647e86,7.155163467653579e84,1.7299940515051983e87,2.2588488637752533e87,2.2163672515074543e87,-1.5905466478824052e87,2.8788009330533566e87,-3.3218934128898513e87,-2.6550143880199027e87,-1.4430411856962785e87,-4.546304363778722e87,1.7245361304681984e87,-1.2450433668788825e86,2.4150184860898983e87,-5.690675634055498e87,8.471209707110294e87,-5.478211085008173e87,5.698233504818744e87,-5.9335928288247215e87,-3.2723336111213687e86,-1.4515286907629194e88,-4.79215954664119e87,2.366053969789713e88,-3.472529659158393e88,1.5782113899164653e88,4.804644451872227e88,1.5198356064655019e88,3.892511227409542e88,4.669500645709571e88,5.55994222002492e88,8.21714673267399e88,9.173538938410049e88,8.552097698777036e88,-1.0513032572158397e89,-9.961508200457994e88,1.8823665091155263e89,2.2004651246884103e89,8.287400331350266e88,-7.885982728392558e88,2.9194942543665574e89,-2.9686036983989555e89,2.96836538167694e89,-6.879031060662217e88,2.1820947245572416e89,3.2950228069779736e89,-4.596935101477192e89,-2.074541320346962e89,-1.023020047008829e90,-6.369539464483967e89,2.6952586523913057e89,1.0176941894930946e90,1.5825028808810273e90,2.0523568652360006e90,9.904867438377946e89,1.979703101265054e90,2.5080410102860655e89,-2.3937580676326932e89,-1.2088966642867388e90,3.004206075488669e90,3.0028732079378138e90,-3.6399594480504993e90,5.013706610348178e90,6.454172801585524e90,-4.976545129086558e90,1.228200915694566e91,-1.7912677825388848e90,-7.145038204189416e90,-1.1177137940637645e91,1.488122384622555e90,-2.086816336761077e91,2.4698123544687874e91,1.7900915010917855e91,2.641737386763653e91,4.406364909025267e91,5.140569456238565e91,7.662981023012489e90,3.7024926659211574e91,-2.812050422676121e91,-6.327258680549459e90,-6.82823657345368e91,-3.0945828585443375e91,1.4136021842659057e92,-1.421274648829522e92,-1.4651908460655914e92,-2.065797297961683e92,-6.898780227594922e91,1.3995233119085953e92,-2.8358298578674557e91,-5.107659345048736e91,2.993770029059924e92,-3.1628053610479113e91,-5.429258963816892e92,-5.600887681540656e92,-3.3594015784938e92,6.646848213060121e92,9.636474971642816e92,4.7650003990117104e92,2.0259546610014036e92,6.399374946394819e92,1.138735601944943e93,1.1345702631929212e93,-2.2941497152184288e92,-2.3050769121161723e93,2.0822266110605766e93,-3.160357362628927e93,3.227630607735621e93,1.6614687614656427e93,2.3270061802537094e93,1.7247834671657084e93,-6.981963535471605e93,-3.9935431233920306e93,2.8123152885292276e93,-6.758000761970626e93,-1.2109297119011096e93,3.2955690487363906e93,-1.7591242661144865e94,1.0665486758308397e93,-1.7991807172744876e94,5.278050040853764e93,-1.7063642249468967e94,-2.6116609197909687e94,1.4862701453928081e94,1.691242081959096e93,-4.2251431624800044e94,-1.7585518369249713e94,7.143470125308054e94,-5.754292335768898e94,-1.3698586531568671e94,8.45440682902313e94,4.605559874802362e94,7.569263211747083e94,-2.375936275471541e94,2.366488951011948e94,-1.9132307128774145e95,-8.807187406160799e94,2.6869802000251635e95,3.0530889902813535e94,3.7014021545471016e95,7.374904889551526e94,2.4310761636572258e95,4.2029145387818973e95,1.1758300106220074e94,-5.76983422794456e95,7.00966214259301e95,-3.116814549460053e95,-1.1843354439795054e96,2.3817759513118122e95,-1.1232875070719748e96,-9.764800969854392e95,-1.8417867554229228e96,1.303055185750754e96,1.0605092627545517e95,3.0090860495025146e96,-1.316909369136664e96,-1.5721403329456318e96,-7.997050340200063e95,-7.826165437627915e95,-1.9338501600490831e96,-2.7782434427250675e96,2.4156221902454552e96,-9.863001600926304e96,-1.8567167542891737e96,-5.848579809007946e96,-1.0567088270991773e97,1.3188619742182685e97,-1.2542716625178852e97,-2.4421444588783477e97,2.1838853958563135e96,2.416113207155637e97,-1.1663459963431679e97,-2.5252204352935423e97,-4.0463276311238395e97,4.1954565909506655e97,1.071489610907326e97,-5.966762566057268e97,-1.9629091347343843e97,7.941015643174137e96,7.470230062025205e97,-1.9733444508341957e97,1.1665696390786174e98,-8.451405151798834e97,-1.525555144597191e98,8.4194158070154e97,2.4961877717453873e98,-5.809796001545825e96,-1.7018521703386552e98,-1.464295460107492e98,1.8006137822839314e98,-4.797815433480186e98,-6.467402112364043e98,-5.672290736049815e98,6.658267690861224e98,5.841910843699793e98,2.636429551356759e98,-9.165531836168471e97,1.2567248966863365e99,-1.5674501660393455e99,-7.773452173553134e98,-1.2468413433231647e99,-8.938846150995651e98,2.4463515318417216e99,-2.0912355247852133e98,1.0745038885938564e99,-4.6933973181559555e97,-3.3478445425254177e99,-2.0733817843401785e98,6.897977204160892e99,-3.742955003958699e99,4.2326395182560977e99,3.987500118238373e99,7.407319495129692e99,-8.046405803805401e99,1.661255461616748e100,1.679966306230745e100,7.767841794704134e99,-7.044387613469951e99,2.567874389438308e100,-2.4370446192239064e100,-3.75557611354547e100,-6.067040868432696e99,2.034564154126445e100,4.20100405578313e100,8.290409918093365e98,-6.168496735101248e100,2.5500722664970384e100,8.223010233887551e100,-2.8871769237302063e99,6.946604609893566e100,4.399581326103594e100,5.538591043982594e100,-1.5679631555804936e101,1.8183392640913037e101,-2.1913885051818676e101,9.876083703910216e100,-3.701541621073664e101,-3.248977171051052e101,-2.892934186718883e101,1.6359518996840377e101,-4.574587553566434e101,4.985328119462994e101,6.539382490363765e101,8.380304767719519e101,7.227969352245722e101,-9.354148959972456e101,9.255240302546984e101,1.8097529242331153e102,1.865841653688501e101,2.314346977364977e102,-2.6019004789435655e102,8.602303502716382e101,3.634190548103589e102,-2.4578787734096997e102,4.0909214072236054e102,-1.91702970599215e102,-7.893567958973752e101,-5.341620589588745e102,1.8157575955202372e102,6.415974089903985e101,1.0184953048745586e103,-1.8084872591840007e102,8.963595352939108e102,7.163339166954042e101,4.304830494585601e102,2.306379155310789e103,-2.3642874940559057e103,2.1814079793481673e103,-1.600104384882549e103,2.078920083687731e103,2.46017736156621e102,-5.4936708514536326e103,1.9501520552387126e103,-2.7576336288511187e103,-5.793389096612461e103,-2.464784403863264e103,-3.2222349828261534e103,5.1230331947688566e103,2.155998484570157e103,-1.2900685051586654e104,-1.8218554503943736e104,1.1721469648515851e104,1.4908209891511808e104,1.5200749335399985e104,-2.2018893890135156e104,1.4463698784335014e104,1.5368800475600986e104,1.4829931755411183e103,5.792395302061609e104,-2.7016285592772385e104,-1.8847111126216367e104,-8.64865008882618e104,-9.84089628741849e104,-1.1776788047127992e105,-3.4741760982482114e104,-8.142236693299865e104,-6.854689368139354e104,-1.4372939729910582e104,2.40601133362846e105,1.3930429938410964e105,-1.476451387877571e105,-1.0570799352123249e105,3.0057650536578455e105,1.1260174183958492e105,3.275221951836148e105,4.470741003103508e105,2.4025642331015616e105,1.0107622765171041e105,-5.879374465735557e105,-9.933502764075675e105,-4.956847779236765e103,-1.4292000346861033e106,-4.5840782891991293e105,-1.5787532192640193e106,-4.146228544485225e105,2.040914841517358e106,-1.9550844190728973e106,-8.147366978301987e105,-2.8434313479838854e106,1.0452598899406588e106,1.4113433486686892e106,-3.3046844507867836e106,-3.7291787656708975e105,-5.152293834183383e106,-9.316470468058987e106,-8.099889131482237e106,7.580089436090319e106,1.7543141124124918e106,6.626984039888365e105,-1.7351559553336958e107,-3.4160047937902573e106,-8.56340775063401e106,1.6732289125310766e107,5.059993598480055e106,3.375671678061761e107,1.3582119383198897e107,2.3049680531303314e107,3.795131680147631e107,-1.8186990639315278e107,-1.7982498324452686e107,8.999892967346508e107,2.0329855863975257e107,8.88256452980721e107,-7.584161014793346e107,-1.4201014583583243e108,-8.031948451699548e107,1.9398600064649106e106,-1.30433983855504e108,-7.41530878555262e107,-8.828793276373866e107,2.1729726658181627e108,4.437138874264949e108,-1.1559621285723584e108,-5.729969881432696e108,-4.5722809441647063e108,3.778233437462682e108,-5.994444635876797e108,-8.686422442104481e108,4.3284349747419097e108,9.1117149089042e108,4.291999576282364e108,-4.198240243252774e108,4.840252259334788e108,-1.2314961732577639e109,-2.3247741703768684e109,1.8226279880941953e109,-2.3345442093450805e109,-3.607244403741382e108,-1.305625612158956e109,-9.582311798450519e108,-3.2079202437539425e109,3.3744082360355503e109,1.8492955038999624e109,-7.55409276851968e109,4.837751444632551e109,9.513491677947436e109,1.3745199837941547e110,5.719389692295684e109,-3.3968940479092894e109,2.9448497139644225e109,-2.262267415351864e109,-9.11552049730837e108,1.5280174744640827e110,3.9798852328210856e110,3.613159128521392e110,-1.9053222759782314e108,5.168738035831696e110,-2.8795262783773353e110,2.242614645203021e110,-7.393928453417908e110,-3.4551156976967955e110,1.8718774969245574e110,-6.969858663048447e110,1.3090190835253924e111,1.0760061066642583e111,-2.5582561635606953e110,1.7074022339080928e111,9.055127529216851e109,-3.21387778972956e111,-1.4099363735231109e110,3.214991158130689e111,1.998510045547642e111,2.16634805552748e111,-2.6496410003146734e111,6.271759431234891e111,-3.097205388473889e111,1.11389385343864e112,-1.001307555582968e112,3.460503407261425e111,9.9976496957541e111,1.970729572981208e112,1.7722218801744227e112,2.3001250425513795e112,3.0341568154232734e112,2.2897928860555134e112,9.054703507809568e111,-3.167175960921594e112,3.3232070035605126e112,-5.636532209196946e112,3.459162504785572e112,3.881211598507038e112,-1.0751004547670386e112,3.4035335185695516e112,4.198197238171181e112,-5.934575386969215e112,-5.9064852066288145e112,2.857827313459705e112,-1.9883760567485915e113,4.150132129978857e112,1.2677880123112042e113,3.342288997228303e113,2.117658101532946e113,-1.2755831773900641e113,2.445033104326183e113,1.1639655573420387e113,2.6665791769126708e113,-6.697480509244058e113,-3.872204103459255e113,-7.83891755376065e113,-8.971533176416842e113,-7.501128926648073e113,6.445801484788612e113,1.6132415999521485e114,5.5359528267608825e113,-1.723773357756187e114,-7.496336048039628e113,-1.980024142021484e114,-6.100936716823011e113,4.3058433254371023e114,2.828351700001782e114,9.461442897127682e113,3.906417303767744e114,-7.430912601793697e114,8.462261616673875e114,4.519785727255668e113,-2.478070838195127e114,-8.240152360987899e114,-7.486543785058128e114,-6.010997722923879e114,-1.5093704200969193e115,7.592517566274209e114,-2.456763738775561e115,1.3467925291164366e115,-3.324151638059578e113,1.6022210681135146e115,-1.159341233531608e115,2.7307077809727557e115,2.3026562754234787e114,-3.2012967306756633e115,5.5855756507536195e115,-9.891207526040563e115,-6.885396754822023e115,-1.8310463349272161e115,-9.573303578658934e115,1.6819105920606124e116,-3.3199860942834613e115,-1.7156392163880866e116,1.982281677691596e116,1.1965230711306241e116,3.1402387904446e116,-1.235127620130353e116,3.0307198293952434e116,-2.1471629003693683e116,-6.207305676073414e115,6.323909186212171e116,2.903443550910331e116,1.791553373118196e116,4.3754852488046994e116,1.1036948936971151e117,7.503535692144884e116,-1.4017145438502958e117,9.747811286708515e116,-1.3728424547219062e117,9.004183266132625e116,-1.327607728046009e117,9.160546174790638e116,1.1315077318931111e117,-2.5357338814872093e116,-1.8044431471746062e117,6.105006925752114e116,1.6499333662666597e117,1.9085243760755485e117,6.832697516538249e117,-2.639410413705161e117,5.649882040486082e115,4.441859394301796e117,4.879876705585044e117,6.233898595508804e117,1.92352983480078e118,1.8904072704855296e118,2.2700152669338034e118,-2.1558237716268716e118,3.476973073067806e118,-2.08269038000064e118,-9.81189937895459e117,1.7623230915855275e118,3.8867836963970845e118,7.23403174446744e118,8.635246823268915e118,4.169048217005252e117,6.195275562771356e118,1.2932897365692111e119,-1.4661903430884057e119,5.280667208981046e118,-1.2400790611884625e119,-6.829048373758039e118,-2.071668857477875e119,1.504016096644599e119,9.759943370657027e117,-6.901924412034509e118,-6.2645165065661206e116,2.5442188457394417e119,-8.053764328516511e118,-7.158186038001174e119,1.774273707171201e119,-1.2942074501491036e119,-2.299764560553253e119,-9.478339337077588e119,4.4827980245482645e118,1.6997517221502177e120,-1.9365293870452173e120,-1.4069516021152962e120,2.4448625923911876e120,-1.465248632302906e120,2.5156580936589276e120,-1.9895614142945674e120,2.5811705484129758e120,1.1040631319566735e119,4.861485309232886e120,7.095145959512149e120,6.686990664292912e119,5.818240344323094e120,-9.913472748266697e120,9.891022454618947e120,-2.726140011124992e120,-2.5178026851996711e120,5.3459796612211e120,-7.154614357738839e120,-7.435659509148984e119,1.9303745932464605e121,-2.4362202254954476e121,-3.672612510018445e121,-3.3023548307892446e121,4.094980210862499e121,2.918252820495004e121,2.702298270935369e121,5.386311964860865e121,3.012152687790216e120,3.296428903737803e121,-8.750025276754832e121,1.1651369060326974e122,-4.162330810703744e121,-9.488405455970594e121,-9.630575907598968e121,-5.865279556229499e121,-1.9251155433716033e122,-3.2397040237546242e121,2.6072343022021967e122,-1.3719838678625715e122,-7.250909376734411e121,2.7778019249494938e122,2.6495848074160726e122,6.333193261902361e122,4.948844741527628e122,-5.5862220588039976e122,1.0817706582924678e123,1.1364562123294996e123,1.923495715969384e122,-1.0522506422955652e123,-8.184497279222763e121,-5.5031773266665056e122,2.779962356858697e123,-2.5087426464736785e123,4.765436402070598e122,-4.686255546958861e121,1.8360343560027054e123,3.1089798493309274e123,-4.85716473478464e123,5.983416754538128e123,-7.954621521243961e123,-5.402068203615448e123,-9.766407785537682e123,1.0170723163178985e124,1.103025297411482e124,1.4492182508944952e124,-9.872789975918207e123,1.27739520949275e124,-2.710907470010809e124,-2.903017507833506e124,6.214923118929749e123,2.6969055283332513e124,4.0119353380901995e124,2.1314139893763957e124,3.2901840026950157e124,6.970834484100663e124,-1.2852874711675864e124,-2.904190914682831e124,-8.50266171840566e124,-5.367178860453486e124,4.182593350497369e124,2.8961597926426466e123,7.764911054303775e124,-2.211228949628294e125,2.27545421504843e125,2.5152909117249574e125,-1.3387875420587292e125,-2.9816187265769815e125,4.088615185682686e125,-3.0211568971762987e124,2.558808736884694e124,6.1543965173157005e124,-6.882827082779352e125,-8.403996834598058e125,1.3270066548024853e125,9.256509348773178e124,-6.1834261653220975e125,4.218575629221059e125,1.006667225751686e126,6.357842030532972e125,-4.2326013418770395e125,1.766191945761381e126,-6.029914450246233e125,-2.8377751693768113e125,-2.2098917951360578e126,9.13251636715955e125,2.4690995344685255e126,1.0023684966773599e126,-4.33331424474337e126,4.3119279245196206e126,-8.767195155347513e125,7.395658760991045e126,1.255082077649479e127,1.988728670798131e126,1.0566612881321492e127,-1.9706424100939158e127,2.1324229060425902e127,-2.6719822354388385e125,1.039637663930726e127,4.895451496736317e126,-3.6619000562691824e127,1.707117076320404e127,-3.5368789028554537e127,-3.0503119369134913e127,1.1791672068562945e127,-2.1214232586744695e127,2.0556625696204737e127,3.0955623215148993e127,-9.768464450230693e127,1.110483628644277e128,-1.0820510104596917e128,7.973921340214815e126,2.2378565526358077e128,-1.2124016802764868e128,3.0334120691373238e128,-9.66438449278208e127,-3.2318264183537113e128,-5.034494173071823e127,3.567126546221945e128,6.068758744163166e128,-2.0373158283062132e128,4.1074455182181305e128,3.8664379613314855e128,-9.922399470745041e127,6.96338787920988e128,4.801319988718531e128,-1.700683879670055e129,-4.6187201113160475e128,8.006031636284183e128,2.4685880198422215e129,2.199036525292769e129,4.6961185848530935e128,1.2965120212947532e129,-1.5277728062784608e129,2.0571075404861627e129,4.808664260950004e129,-3.2951194615393835e129,2.2450732005392498e129,-2.5631395742473155e129,-4.183047180672216e129,-6.456180024948724e129,1.2375922451541038e129,1.2147365874965937e130,-1.8816507443309517e130,8.046462605018224e129,-1.9638762015821837e130,2.639260401006163e130,1.2550046805922381e130,-3.434300538178464e130,-1.4750650276718238e130,8.209700144735819e129,-1.2797021345901274e130,-9.785686553605237e129,-2.3714359873576274e130,-1.2402483432224148e128,8.22842939654573e130,-1.0038127513510513e131,4.510663212137987e129,1.4603958311626543e131,-1.5880554642212821e131,1.9108762934979104e130,-6.334226183608837e130,8.212058434402486e130,2.1468518239394605e131,6.94744607193217e130,3.2303606566377593e131,2.789440286851622e131,-2.2424438130219183e130,4.161924811068431e131,-3.0082034431645397e131,4.875678282007784e131,-6.975539304196029e131,1.0389101807230502e132,3.1620432936240298e131,1.071410783816827e132,-8.543329971849898e131,1.5935419012716773e132,-1.1982687503969205e132,1.9817308581892083e132,4.316629248485165e131,3.6013425212155245e132,3.950697096608155e132,1.423125572231934e132,-2.8275778832043687e132,-9.730604894633756e131,-5.61877309282811e132,-3.854111304031222e132,-5.261316379457659e132,5.6382652400171364e132,-2.671270830319831e132,8.057305632876732e132,-2.437668172645279e132,-9.429289944510739e132,2.1460020888958638e133,9.688720055368056e132,9.690293511062997e132,3.391072139521339e133,3.1092311868354946e133,2.321748265834208e133,-3.4368514757096686e133,1.7342572716898004e133,3.362718511246062e132,9.67523648437767e132,2.9732020389856415e133,5.695647114014144e133,1.173794335574719e134,1.182393605167061e134,1.1055120551087316e134,-1.9210678881407392e134,2.2223890426074065e134,-2.4445106335573508e134,5.908803298816295e133,2.188106888004409e134,-9.247774973957716e133,-1.7750483773608707e134,-3.2889529749534353e134,-2.7566408448602348e134,-6.865120418515407e134,-3.2017889806626904e134,2.101542265901555e134,-3.203377515183813e133,8.74133669179236e134,4.547278506770591e134,1.6010139997544887e135,-6.8258894659554e133,1.7357946708195698e135,-6.207608426324707e134,-1.2741149131299996e135,9.601166271838318e134,2.2129328366673538e135,-7.502482331335124e133,9.1751586657146e134,-3.5077746872347025e135,-4.3657920233620446e135,7.425453801896192e135,3.7982184077020305e135,-4.80285754229247e135,9.813833220928916e135,1.0588449152963294e136,-1.3728716658301233e135,1.7523280878534592e136,-1.8584587615513954e136,-6.200477052493863e135,-9.829547802618657e134,-2.4250804292665918e135,-1.9749826542355677e136,2.3536495678321184e136,-1.704507664509132e136,4.517522636637708e136,5.055302019119035e136,-2.883632400934096e136,-5.359825162124562e136,-1.2349333680105054e136,6.026938210373507e136,7.381193078746282e135,9.698147515811814e136,9.260974725903415e136,-7.204475614643655e136,5.804286897198795e136,1.4961886673610798e137,-1.2698138990040442e137,-1.8733953900612304e137,-3.957975739818149e137,-2.690883722949153e137,4.944014292868006e137,5.628920120258884e137,7.349328617718533e137,-2.9062194259796888e137,-6.20578738445496e137,-1.6959096544479648e137,-2.372699590962209e136,6.792125127941746e137,-4.801449139942258e137,1.3456505017694833e138,-6.896605574581009e137,2.8816993534526433e137,-2.183464394614701e138,2.673176737914269e138,-1.49161330763984e138,-1.91795306989895e138,-5.3315659895853835e138,2.339907295055209e138,-1.5624246140716044e138,-3.522454122968978e138,-6.477298848177071e138,1.0827890121470393e139,1.1654563682299508e139,-6.544880956145608e138,-1.588118107450825e139,-1.4978794362302685e139,8.91033252200055e138,-3.178923932557519e138,-2.9159819421677423e139,8.473401129668169e138,-1.7203065126222067e139,3.2319167996005204e139,4.4530903620301953e139,-4.12952007839251e139,5.775491938517738e139,-7.668837352069e139,6.111298902523239e139,-9.146312283591663e139,-4.409941655352707e137,1.0272128895090283e140,1.552360791431333e140,-7.482999690149085e139,-8.60502505211358e139,2.4098573713664784e139,-2.215774214115987e140,-2.176083363205228e140,1.2342212264778238e140,3.671639874037073e140,-1.1341254784615434e140,2.72408501955663e140,-2.2902481469106468e140,3.292194293004693e140,-8.504531788740367e139,7.959167065062602e139,3.2845277129134374e140,7.164154171663819e140,-1.328144386292512e141,1.8611031813344534e140,-2.057821380703746e141,5.683276275990399e140,7.147013403366331e140,-2.3972633347265592e141,9.224150932290822e140,-6.720475267365793e140,-8.858723725229637e140,2.6038957277388637e141,8.70648688133151e140,-1.424766296216021e141,-4.287463443131354e141,-3.3740453301892376e141,1.75312106084084e141,-3.967267748643668e141,-1.4733916088274727e142,-1.0034303012794065e142,-9.155830894115088e141,7.22159829549925e140,1.5827247720979525e142,-2.524058291740238e142,1.3737291976698108e142,2.6283016794160116e142,-3.4288258832233174e142,1.2846273649191624e142,-5.036085923495221e142,-1.4962939754099648e141,-3.6184592827622366e142,-1.7557734045981993e142,3.5885293028547506e142,1.1487724200012277e143,7.338212253662918e142,-1.5646026001175668e143,-4.332549728451582e142,2.0799319129587395e143,-1.7610257796513726e143,-1.7545652051010885e143,3.298240820211047e143,1.3127536410754838e143,-2.6111983766233947e143,-7.998631020543103e142,3.2664052181172303e142,-4.519957270994801e143,-6.101520948865088e143,-4.913878838517018e143,9.641648087550995e143,-2.913012198708978e143,2.753727870535778e143,1.490528787729215e144,1.3467636205020769e144,1.0730262212985346e144,-2.0049593322872298e144,-1.6483654740377184e144,-1.4824369235755277e143,1.3870024079497952e144,2.1752013853982895e144,1.2099454783803444e144,-5.3012981429859085e144,-5.030684048678617e144,7.709890815667847e144,6.744118738489669e144,-6.827546113206392e144,7.249686459883485e144,6.575605941587566e144,1.1427006661945372e145,-8.235540598498997e144,-8.10980321937011e144,-1.9764203906369031e145,-2.5176911436743064e145,2.9183408871638564e145,3.512901126458115e145,-6.113808974779491e144,-2.332976449329982e145,8.379697870481742e144,1.776197619725374e145,-3.50258274404452e145,-2.0877213808624712e145,-2.3747546912707518e145,5.154223902502204e145,-6.807274015528553e143,-1.0065682399653075e146,-6.670841271660048e144,1.2116277490509714e146,-1.2812159885950094e146,9.956535706149573e145,-1.5623552637201658e146,-1.8784339443565403e146,-2.5304912195916267e146,-4.206132648748585e146,-3.7259389190277053e146,-4.240146573856252e146,-1.9213693266999336e146,1.707337685931316e146,-7.92362973819048e146,-5.938431355012184e146,-8.438825952851836e146,-9.613914398970408e146,4.099537864130467e146,-3.9712985460312785e146,5.6039559404025965e146,1.1104932783682748e147,3.1082882494823377e146,4.373885457771225e146,8.681026631803509e146,4.585197771496957e147,4.9166062453779135e147,8.96196882427886e146,4.38928080649617e147,6.61181997351512e147,1.5229083332421895e147,2.7916675905957803e147,-4.6730625997676656e147,-3.3322413422808934e147,-5.512224884607771e147,-2.2074446615811362e147,7.137892023816708e147,-1.5933384311640402e148,-4.7421576601995945e147,-6.757405603051148e147,-2.150984357516566e148,2.8561395531949963e147,1.5760885161050499e148,-3.09224185442565e148,-2.4873328534982693e148,-2.9651537468479546e148,-4.0713256963422675e147,-1.306932311415518e148,-6.469924762368313e148,4.086792465392071e148,4.713930516776474e148,-4.215586122277785e148,6.121630552108121e148,-3.115312826378849e148,2.3572909097948917e149,-9.078037591298323e148,-2.576329162497515e149,-1.726332317249415e149,1.757570623421192e149,-4.252955901960596e149,1.0709235632014858e149,5.908808556398022e149,5.3048987684122655e149,8.065757860318025e149,-1.6584478861220924e149,-1.1029633040535837e150,-7.356818606030164e149,-1.4267687702921764e150,1.54365194276815e150,7.1174196016847035e149,-8.45415719542726e149,-1.177915086023913e150,-2.093517355728863e150,-1.8674670147812517e150,6.845126864320026e149,-5.5163594820402884e150,-2.7991200928432135e150,5.6305853450358676e150,-8.269751380843582e149,5.024666447232048e150,-2.396530527377528e150,-9.798057735578854e150,7.474964665629996e150,-8.92978032722505e150,-1.3045223617843098e151,-7.972131382524055e150,7.154420746251577e150,4.8773573332160986e150,2.7141093686642154e151,-1.948469472419176e151,-3.317151406021504e151,1.476585531043629e151,4.143804737292362e151,4.5848086224563074e151,-5.288540247437579e151,-6.14389548256406e151,-4.4596503035149977e151,1.677006291505559e151,1.043692671583693e152,5.310852066440268e151,-1.6673387314369367e152,2.205372075846733e152,2.186449493314431e152,-2.8736476132426726e152,1.7412535815318626e152,-3.649705382097864e152,2.249025950760459e152,5.138856365492995e152,-5.172026555800557e152,-4.106836279565075e152,-2.5603663448387688e150,-2.0335292544093955e152,1.9257126413828577e152,-5.775975979802986e152,9.580996437341833e152,-1.0816008582472035e153,1.0231402266824047e151,-4.957035585332717e152,4.193492785825779e152,2.809135691447025e153,-1.9098308208833984e153,-1.9074779291552553e153,-3.950421498485544e153,1.6458683644601814e153,2.0975073140545832e153,6.1823575349103025e153,7.09117314870499e153,3.876134719410579e153,2.2898548905910036e152,3.6069879626406376e153,1.3527906989663586e153,1.3577719377465016e154,-7.365457288209955e153,7.387867377339249e153,4.020121555786872e153,-2.5254288949262008e153,2.6219649217307498e154,-2.8022357497586054e153,3.217093612150332e154,2.6684483409786204e154,-4.034552104787214e154,-4.392373602799992e154,8.217662935122232e153,-7.198207067035295e154,-2.4903437180484496e154,3.424844505657782e154,5.799109741445982e154,9.447019084926411e154,5.301902974683427e154,-1.898614067186334e155,-1.1541893770771218e155,-1.0272111666704277e155,-2.4723523294522693e155,2.0213661379225045e155,-1.9549557474825244e155,3.3058161651289e155,-3.0788786913784676e155,2.964322115840458e155,-1.9774226239745222e153,-3.137234486015066e155,-1.9251802323932856e155,-6.973011251815152e155,-3.8973100489938234e155,-9.135612802871859e155,-8.785901380986892e155,-4.619554113789973e155,2.18877879572605e156,-2.014035560923057e156,9.353046090567517e155,-1.538148006580345e156,-1.4421593461509567e156,1.6004941045778598e156,2.7890093307788676e155,3.447802660056651e156,-5.4943615881024246e156,-2.590652112621233e156,-2.799778741190191e156,2.183183729045363e156,4.768923085174987e156,2.726644499202521e156,5.452751724799447e156,-1.1908923555087792e157,7.720122049091381e156,-1.8987523631145083e157,2.79791665412028e157,-3.050072339648069e157,-1.81704877634712e157,2.587080470442334e157,2.292366987124935e157,1.038752672784261e157,-4.932812195339429e157,5.826504788164151e157,-1.3819452997253292e156,-5.0616488908890156e157,-7.176948279227152e157,1.348538564138152e158,6.258263977636802e157,1.1537791684441002e157,-1.3514015512126643e158,1.0916477896044434e158,2.310714980201183e158,2.801082938923402e158,-2.609652502715317e158,2.0749709530629288e158,-2.1158491571914083e158,-5.542309319836641e158,-1.4784392248645395e157,3.80709418008817e158,-2.309486836806291e158,9.269765001031306e158,-7.870952813674933e158,-1.7642630804564814e158,-7.783626142270723e158,1.5478021491327916e158,1.0229382733480938e159,-1.4836836446725246e158,-1.3648956963904337e159,1.5818180919202023e159,-1.5083514313120135e159,2.0045955807251923e159,2.98931016182983e158,-9.594403402396823e158,1.1226615199341706e159,-8.823203227817385e158,1.345835151200964e159,-5.278560564369333e159,-8.053320010959644e159,-5.875152104877637e158,-5.418792446275305e159,3.8901246897904e159,1.5905327906306604e160,1.9959309843665205e160,2.003722125111088e160,-5.124266441215727e159,-1.4130502447602355e160,-3.2387810495700236e160,-1.4255905164952225e160,5.1409849468274747e160,-3.052622105845867e160,7.544742480894698e159,-6.751884445642365e160,-6.65042861421549e160,4.968012211844612e160,-1.0901063329355694e161,8.267539694541705e160,-7.726776159524958e160,-7.831216592470269e160,-4.169865970250672e160,2.1899568342421346e161,5.844321131832229e159,2.5640169017287383e161,8.373498341981637e160,9.826829831391276e160,1.5959872150048686e161,1.4192182179952383e161,2.0625250847798686e161,7.620505333088975e160,6.594166834063635e161,6.064269387629189e161,-6.258797452001966e161,1.0124990950707842e162,-1.5258791988137154e162,-1.621292628728481e162,-1.8890919182067124e162,-2.0698075158820196e162,-5.845750752349301e161,2.308751666284571e162,1.15468711639069e162,1.5746685867881828e162,4.604756830023807e162,-7.140103118830618e161,4.392332313576648e162,-5.5197281105232375e162,-3.1311658182173334e162,-7.667290265917837e162,-7.326102701011564e162,1.1330378390425671e163,5.294892711212477e162,2.480728934912579e161,-1.2610422599417511e163,-1.8411704989106323e163,-2.475180204484426e163,4.369766611115922e162,-5.8988741794759244e162,2.1381162694370212e163,4.7213284203721105e163,-2.6497586915640122e163,1.5654892624230352e162,6.330646360396015e163,-6.477875601335431e163,8.03831821120078e163,-8.804292737472633e161,-1.8813482047597396e163,-7.782663646203723e163,-2.3888290096310825e163,5.0635273723622917e163,-9.200028261630663e163,8.627029762046044e163,1.9064879118863226e164,-3.2826657921157363e164,1.8731488459459239e164,-2.4690275547894054e164,-4.0573510807012774e164,-4.108267134406557e164,-4.322311354688075e164,-7.994779304510545e164,8.538075702986008e164,5.617019282894467e164,-7.508366768357629e164,1.1212013693155273e165,9.156394939693001e164,-1.547091214728189e163,3.221033225251067e164,6.192984393904495e164,-2.7612136783437634e165,-2.5176816213706176e163,-1.6256212704300055e164,-2.3401481205906657e165,4.227581511060282e165,-1.2607128179583462e165,-5.270923764848948e165,6.629493841351559e165,-6.95802282722848e165,1.0257655602876061e166,-7.73042028866231e165,-1.2290673366682927e166,-1.4328271900027475e166,1.2573321247008283e166,1.4396586655461e166,-1.7872244001920996e166,-4.245388509558791e165,-2.5911292682175716e166,1.7931965930475988e166,3.018573117179051e166,3.6188985417253706e166,-1.6639652141163636e166,5.311736199153642e165,-5.361311847849327e165,1.73372294925552e166,2.6113441863334887e166,-1.4348967890647923e166,2.555933305373183e166,-1.7835320134608693e166,1.0726655194245786e167,1.628257253325351e167,-1.1704995388021403e167,4.9377590475215586e166,1.4758808913453567e167,-2.4365554645687956e167,1.8168296195792107e167,-4.1430068146065656e167,3.9430253149104204e167,4.882830444841287e167,6.916616988808308e167,-7.884086534522142e167,7.023235496312665e167,8.77684175599994e166,3.041851551207774e167,2.190044406701421e167,-1.6011641135027697e168,-1.0696658376760464e168,-1.6583809169991724e168,2.4826143172395765e168,-2.077658459351975e168,2.312759821143772e168,-2.6341901225101782e168,2.92596704374541e168,-4.268442438161744e168,-9.467496333585494e167,2.1653870985247923e168,-1.4330377211624347e168,-7.987045981826211e168,-4.2044669487739125e168,6.661378747122219e167,-9.443780881743406e168,-9.255135443694099e167,1.7363617868907642e169,5.255092807485724e168,-8.096601532830097e168,2.7670284087939395e169,-4.587280440730848e168,2.630351602816908e169,-1.5494503938673745e169,4.754034285187334e168,-5.9052344184409094e169,3.473558496588348e169,2.394464403870929e169,-4.1243653881225025e169,-9.97825603395837e169,-5.4629613925511656e169,1.2135623358457334e170,-1.7799644394348004e169,-3.431547852278937e169,-1.2896959051581574e170,2.887065322597838e169,-2.819399993724996e170,1.1146405901298497e170,3.5478607131134913e170,-2.6703005791599107e170,8.412905962521379e169,5.369276570722077e170,4.456446451358117e170,-7.459933732407858e170,3.777973554320408e169,-1.009682383118528e171,1.4239076908318103e170,3.7143612393435864e169,-1.4574208775388116e171,3.2090540352383836e170,1.440035092589472e170,9.375240755469732e170,1.5472582557771674e171,-2.4749515564990818e171,-3.638599491612322e169,-3.737181853076628e171,-3.834929290181227e171,-3.25422361610233e171,3.2995849303571144e171,5.734977381170144e171,6.339051006905684e171,-7.660380552841245e171,-6.038916481801089e171,7.198370189684149e171,1.1574547495301035e171,-1.210575408183494e172,1.1994203721251398e172,2.2805699782318487e172,-2.323608924340546e172,2.3708254173409543e172,4.568380611500522e171,1.6882318162548768e172,4.196918882686804e172,-2.9061688816987744e170,-1.52837442072128e172,-7.157086172131064e172,3.502919540406427e172,6.112385495817323e172,9.894746442791438e172,8.831235413384517e172,-3.3583172246882726e172,1.309099600223524e173,6.1332436331109375e172,4.9521292670650395e172,9.47652011285431e172,1.3224040956352113e173,1.5999808492947005e173,-1.9393688506643466e173,2.856715148298828e173,-5.22575575389453e173,1.516040132549317e173,-3.6953856028707005e173,4.177933979158669e173,-3.424000077355864e173,1.7395802488294708e173,5.000697992438319e172,-5.708247230733282e173,-1.9214545245621475e173,-1.684496602932355e174,6.909751373897258e173,-2.2327849976215215e174,-2.2072148941414577e174,-1.3540690190041813e174,2.832108030033608e174,-1.9066915265095754e174,-4.415896488020231e174,-4.589943541147019e174,-3.953024337197635e174,2.4752384228420755e173,9.493358021461793e173,4.982199543719383e173,7.067750446357545e174,5.495571693764169e174,-4.518823014672093e174,-1.3628728896360082e175,-1.6108202400253032e175,-2.0994174374075824e175,1.8511985333462624e175,-1.0568223042840488e175,5.58362777780895e174,3.687654046082686e175,3.6768197927490997e174,1.8397862787839544e175,5.568876462542714e175,7.5907034336886815e174,3.3776272356011135e175,-9.686221237397377e175,2.88166619090168e175,1.2785571165747108e176,1.611644351246175e175,-1.3066432462080363e176,1.147850796896949e176,-5.439556671265338e175,1.790356286045273e176,2.5537918130905535e176,-2.380153483786735e176,-8.79304097432325e175,1.167698937289594e176,-4.4300409312271447e176,2.977102997193913e176,6.69748936762188e176,-7.727325945985227e176,-6.304755140620246e176,-8.654506266066186e176,7.547513473473466e176,1.1390307179355625e177,-1.061016900000086e177,5.861665327697451e176,-3.786223261228722e175,-1.1908930526655255e177,-3.800594885044385e176,-4.0835448283425385e176,3.8436208137362383e177,2.552632405183778e177,4.333341033638161e177,5.170702145457873e177,-4.848840484654952e177,-4.477989597262881e175,-6.416842635609648e177,-7.9702552789991185e177,2.933775594195868e177,-9.610148662931008e177,1.4257899945399881e177,8.73790486521229e177,5.5534489799223105e177,-1.1097543560919e178,-2.819601983306281e177,2.0922509181990133e178,-8.074612413952857e177,-1.2493455681316037e178,-1.8405336980839423e178,3.9546835806530955e178,7.853506726482412e177,7.601195239088822e178,-2.6424427559157688e178,1.4876526970991913e178,1.0538807383676656e179,4.56917514875443e178,4.978610876085976e177,-1.487009693397843e179,-1.244833872278685e179,1.0300502072719925e179,-4.414337435813169e178,-2.0480732521690323e179,-3.706258673058087e179,-3.314494177485554e179,2.0302718901644883e179,-4.512924004198576e178,5.369985356990512e179,-4.27450545787931e179,7.532075391162487e178,9.29659137565487e179,6.506659047481466e179,-9.717312341933262e179,-1.3501441390304572e180,-6.75589921238139e179,-1.4338063326032739e180,2.2114052776057553e180,1.8393824872418816e180,-1.429783074075e180,-1.100635292736368e180,-1.4272649049172465e180,1.3094313130378163e180,4.242612627948791e180,-3.9835111913460015e180,4.4514658266185475e180,5.230826985625133e180,-6.549790901777804e180,-6.717038732198407e180,-1.1760533764584065e180,-8.956068125846361e180,-5.095375166982682e180,-9.581201861867872e180,-1.709778037644045e181,-2.110244034091437e181,2.965029445544159e180,-4.914778378825038e179,3.3450340955353995e180,-2.120651640616513e181,2.7006318766426525e181,-3.626808695506667e181,-4.0999581662472354e181,4.357326200106687e181,-1.6841491119656805e181,-7.20156272453426e181,-5.505863629351402e181,1.336497488516412e181,1.2044695367151316e182,1.7030434126840774e182,2.7988695223044718e181,2.0986390008438303e182,-1.652926623156951e182,-6.355429627303064e181,2.8846600403399703e182,2.5469161759819435e182,-6.104233466166563e181,3.230599791972879e182,-4.7278851696025734e182,3.259446316584954e182,-6.590327233063298e182,-6.292877737237596e182,-5.99134731824936e182,-6.827734949740293e182,1.6106572526674426e182,8.383958754935237e180,2.0262207333460026e183,-2.4236825734438174e183,-9.131138422875025e180,-3.3301997711231434e182,2.2080363237843956e183,3.620232392076313e182,-3.6858299490543876e183,5.600471841306874e183,5.460936696068929e183,-3.6675442069103007e183,7.685362944184916e183,-2.7219005517399365e183,7.616681816373103e182,-4.097601199165846e183,-1.0611981277457724e184,-1.022697108286844e184,-1.2081366754217713e184,2.3371785887291542e184,-9.891578551046807e183,3.762923700738501e183,-7.87971657962616e183,-2.443003204257873e184,1.4371293171069772e184,2.1592048374380436e184,5.246057439703279e184,-6.043647312713751e184,4.10035263121543e184,-4.500860489689511e184,1.1276144535278604e185,-1.9682058512472813e184,1.0632387562764278e185,-1.6354520183321162e185,-7.25046719703256e184,-1.5592799349496766e185,2.3734876799308104e185,-3.006252593416797e185,-8.234099175873731e184,3.347233244010931e185,3.7326342711651344e185,2.923533043955047e185,3.530769780149595e185,4.710600706239992e185,5.250883312514988e184,9.230372181493999e185,-4.213278147743933e185,1.934592553803354e185,3.8609445310460384e185,1.4670164722969233e186,1.3259242969496081e186,1.6073424130816617e186,-5.546774568654726e185,3.623635549780338e185,6.817579149959702e184,-7.848902012667075e185,-2.6908490973662334e186,2.6712629063382555e186,3.502469185381725e185,3.1830940788358963e186,5.473976579519683e186,3.3109763731450297e186,6.180202827106766e186,6.055531254975313e186,9.188651187239894e185,-4.70031397139237e186,2.961073364033544e186,-4.2844845261052523e186,-1.602989911324249e187,-2.5284524231178956e187,1.4526913140346672e187,2.9444651920973114e187,3.9785133167797625e187,9.090076340917847e186,5.122038539433274e187,-5.5992601787045184e187,-7.66786312842617e187,7.950728828456996e187,-8.424758220245798e187,6.451043097613711e185,9.501955009645281e187,-2.1800182648890734e187,-1.2928053927636222e188,-7.549389399900012e187,2.1206605912251845e188,-1.384294146111566e187,-1.134076427490844e188,2.1424677663101796e188,7.108826330438148e187,-2.6531107498054507e188,-1.2010954518026148e188,2.785377972373239e188,-1.250461918831002e188,5.118214024234988e188,7.591765055484773e188,6.778618442007823e188,7.713391197042238e188,6.159571930856856e188,-1.677583300175821e188,-4.913771463303688e188,1.040646335330045e189,1.320800721271482e189,1.772902655735502e189,-2.5331238704491574e189,-1.160796310627112e189,3.504176293610242e189,-4.329133778901212e189,-1.4007771193307063e189,6.017964847933434e189,-4.2876454627714083e189,5.146961463197629e189,1.4688227359967565e189,-1.1604933425741166e190,4.471650830300934e189,-1.4564516841566745e190,-1.5334560831629145e190,6.589258579966975e188,4.607985088477078e188,2.1089169111743e190,2.1838147157726755e190,1.4180996422838825e190,4.448171951149335e190,4.717828321599602e189,2.1889059552189826e190,-6.13028596070156e190,-3.555632985620105e190,-7.525907316776743e190,3.0864876943078643e190,7.508511951025266e190,-1.2084904480262658e191,1.782902816319995e190,1.0985077266334918e190,1.1855528688899777e191,8.6177110569939685e189,-1.3949297667142505e191,-7.499678548968035e190,-1.524764908315336e191,-3.389428654976894e191,2.3580622546108193e191,-5.5720947293289814e191,4.641974503314436e191,5.726292164206553e191,-1.514568495845777e191,7.960214697901129e191,3.0940422629051985e191,7.171191970347956e191,1.3254496472353176e191,-1.0669781296764995e192,1.5246604836305286e192,-2.3220704264185037e192,-1.1348620946517508e192,-7.447874334373148e191,1.0035753057369262e192,-2.7334571018570987e192,1.6710923367862937e192,4.768399685804073e192,-4.6406526589678e191,-6.214934195183637e192,-4.827272804618419e192,-2.060173728640364e192,-1.1101165469532354e193,-1.291926502539718e193,7.689942620236884e192,-5.320608661642157e192,-1.4884567805399227e193,-1.7117622475191262e193,2.688826194655837e193,-2.8045644632014327e193,2.6289768222413716e193,1.0991687643166604e193,1.3075735875933102e193,5.478517097923095e193,-6.344278617935177e192,-1.7976073093049492e193,1.8430474765800633e192,-6.399474594769214e193,-9.023292028589522e193,1.0741220937756184e194,1.3228793096089416e194,-1.1049362800068453e194,-6.654267843072994e193,1.2482128119143762e194,-1.0675386441806428e194,1.2986414119079357e194,1.3952733910090143e194,-2.418326282390002e194,1.1430826408103395e194,3.8303303013570074e194,5.1393821822479744e194,-5.7967218737910853e194,7.572539144593126e194,-6.356704164123085e194,-2.9197787618898616e194,-7.304262809765547e194,-1.1865045319421117e195,1.3635785488868408e195,1.0080930076972109e195,3.860669522799412e194,1.2959228895671478e195,-3.034123833857828e194,-1.3548089171928784e193,1.1667499597452679e195,1.9152758566716573e195,-1.5535521171637222e195,-1.1267679937528404e195,2.477662311161239e195,3.1052417045506303e195,-4.882342511884534e195,-7.061407891475531e195,-9.039101672193754e195,-1.3092847855898119e196,-4.42025112398991e194,2.35908239307915e195,1.4939861265141036e196,-2.0989326446818945e196,1.169887912830074e196,1.2715806995178556e196,-4.0164549653066195e195,-7.446944654198063e195,4.227176216505767e196,-7.761150070025826e195,3.149787796457886e196,-4.451020189214526e196,3.939246466476374e196,1.4775732116763496e195,-5.919165562029837e196,6.8928509979661025e196,-4.223475396676966e196,5.6039970389627705e196,1.2211709064571488e197,-1.9319436610085672e197,1.6231238493006774e197,1.4079401946168412e197,3.330589537128152e197,2.1477802952530478e197,-2.7890617010277498e197,-3.723820085624937e197,1.749302832673238e197,4.7946626900732634e197,-5.904843843643036e197,-6.965880755129874e197,-4.0363141389222156e197,3.370436300359419e196,-5.5336884478240913e197,-3.1127286297093664e197,-1.8642070392148073e198,-9.144635165792478e197,-3.221955218251229e197,-2.537037795083307e197,2.0953367759580574e198,-4.1225846018105285e197,-2.3114283783622848e198,3.8206137904308817e198,-2.059926940463351e198,2.2545417393493313e198,-8.153698692692306e198,-4.311775013734004e198,-3.0249355175039017e198,-6.145987389535541e198,4.848516765228319e198,1.5470639434965666e199,1.497883794981799e199,-7.173235647584596e197,2.4545621080400096e199,-1.4151419971740244e199,2.760907674961552e199,-2.2166608695457843e199,-3.4814452845307226e199,-4.318762134199863e199,7.267881485371285e198,6.173046253398804e198,-1.7432617396153125e199,-2.995306747091787e199,-9.737566160529787e199,5.4762481326174325e199,1.8002066471595727e199,-1.4763960651350176e200,-8.30817281108435e199,-1.5085493549980639e200,-1.4407924526422286e200,1.710207840606127e200,6.2643900224998535e199,3.1687249575419624e200,3.391754282627438e200,3.44562397401958e200,-2.2251593355416342e200,-2.8023338442672933e200,2.6035584742860198e200,-7.138380934256719e200,-1.6381363694086176e200,6.47095055080855e200,-1.6665619604088317e200,-2.3865242909578797e200,-1.2077012488921277e201,-7.266848234702836e200,1.3984742913324185e201,6.652615233023943e200,1.4416554608011098e201,-3.4353010716309313e201,-1.985004556987083e201,4.2701147530025677e201,-2.5959397005160106e201,-2.579334037113217e201,-7.05493427680722e201,-5.031276612680068e201,8.361764876970012e201,-1.0520099721431101e202,1.1591987198225257e202,-3.1482071874514727e201,7.035045115347819e201,-1.6161097030171446e202,-2.302468086301008e201,-2.2108709701385975e202,-3.0296938664161857e202,1.9064069464394556e201,1.141673680143328e202,-1.5447066260050942e202,-3.1709587799773917e202,-5.239355942677474e202,3.4790443430263725e202,-6.467192941205588e202,4.3147449305283344e201,5.598441728509435e202,1.0685767677777263e203,1.5860444936236272e202,-3.3527995924769564e201,-1.1437286114222327e203,1.2119454046228418e203,-1.3393517980905165e203,-7.396594721946123e202,1.1950209807849825e203,-8.52531212560759e201,6.760460419602425e202,1.9748303224584993e203,2.1820734079266208e203,6.698567012884417e203,3.338097903005042e203,6.934502146933437e203,-3.974074682388431e203,8.81688406065401e203,-6.388382315218248e203,2.433236387804415e203,2.8176938262064716e203,1.2639815687756413e204,-2.847453566504734e203,1.3647386609357236e203,1.4555447963314642e204,3.670028299631512e204,-4.187237702725885e204,-4.394767629107724e204,-9.871441381789247e203,-2.911700296162898e204,7.572861518268332e204,6.874122055347796e204,1.0272175483912648e205,5.7912341806523164e203,-7.412429119266709e204,-1.3914745208852914e205,-1.7250701702389157e205,-5.230519051494811e204,-1.6035948519620601e205,7.427223287707685e204,-2.538595498784614e205,-2.8133529711301163e205,-1.1274458361618224e205,1.2195182683544797e205,2.6637443376489038e205,-4.275522843967605e203,-4.055031965078114e205,-6.517049205278639e205,-4.664035136301025e204,-8.722844893328677e205,2.445038413000444e205,-1.447805926162803e206,-4.323484949677903e205,-7.35728734271923e204,1.6384580568785082e205,7.104798839078432e205,-3.0306982735084033e206,-1.6447836312614293e206,1.4166821261199874e206,2.6361002017141136e206,2.1474768921619335e206,3.793532483594772e204,1.5150007950867048e206,5.319904722520759e206,-3.5445873469217954e206,7.414638782043031e206,-1.0495958627775342e207,-8.182371845347104e206,1.4759578842607794e207,9.855610424947022e204,-6.488713540668989e206,2.477275514109193e207,-9.386682584300867e206,1.192451367358613e207,-2.0345015379795282e207,4.32944871008615e207,3.905972217007251e207,2.467806156220706e207,6.416593841578263e207,6.298258220345958e207,-1.2448592765619002e207,2.5647440806684803e207,1.1346716649524592e208,6.861555129508492e207,-1.4341755546217355e208,-5.364987267880262e207,1.6266093396725755e208,8.299362507516086e207,1.7042118714882587e208,1.3068536850548238e208,-3.718897568896078e208,-1.370293340225239e208,-4.011701703041793e206,2.3326720846660825e207,-5.259927812071739e208,4.084888430948138e208,-5.8773846575437945e208,-3.968421963175561e208,2.3361548473926226e207,-1.099448493494116e209,7.30767542426012e208,-9.383809099051025e208,1.7439307043467687e209,-1.86511702396685e209,2.7437679078197596e209,-1.311410762057863e208,-3.4697480513808096e209,-2.466556180114675e209,-1.2736933202662432e209,5.110309610964631e209,4.795288141516258e208,4.212555512927833e209,-2.4953639699683694e209,9.120911738586885e209,2.1840367647414605e209,-4.0732828022500857e208,4.107672634230138e209,4.93987559004747e209,1.6092523998570426e210,-1.8224395052959238e210,1.1401229906474845e210,8.549363811043957e209,-1.4242012716192956e210,-3.7611843772290856e210,1.1313107024862401e210,-3.868866542498376e210,-1.0485373643920716e210,1.8384156747818225e210,2.8086110600672343e209,-1.9247134532495586e210,1.0152624220044193e211,4.546513773310498e210,4.1005869278820826e210,9.72886370790509e210,-2.58006291711568e210,-9.856356122358613e210,1.724041419050165e211,-2.794194227276598e211,1.2711902912646283e211,2.089421091463833e211,-1.9108113700912348e211,1.274433577153523e210,-1.8888743801530327e211,2.7960112354432164e211,-5.438387136873419e211,5.359630458338303e211,-1.8558761310274303e211,-3.7982134866626346e211,6.837305484916638e211,-2.718659211372529e210,7.0838242561530265e211,-1.5249542478073397e212,1.7490685438262657e212,-1.421699716970935e212,-1.2794518087127139e211,1.7098808199831903e210,-1.9308162623788472e212,2.5207055865691965e212,-5.7451447211022344e212,-3.580590060105824e212,-4.7993716154732036e212,3.687110986150513e211,4.784746697459031e211,5.501695102146416e212,-3.1681237932136208e212,-5.369967673961709e212,5.416700180130714e211,-1.0472716503370345e213,-1.769843331117364e213,1.7310612388329727e213,-1.861359642791027e213,-5.396798890617202e212,-2.0341034430821888e213,2.0024130606372917e213,2.9911562672286046e213,-3.337216932014258e213,-1.7575835849989513e213,-6.265823755437927e213,-9.012243183256287e212,-7.918710128792092e213,4.9927440287198164e213,1.1932511515377943e214,-1.2426250778896927e214,-2.0048145851184015e213,1.8944968710761257e214,9.145483534875837e212,2.156074356957439e214,1.7852330090242172e214,4.0548134244222525e214,4.567681518134519e214,-7.093665077911774e213,5.49613119069467e214,1.7526054736095923e213,6.341225980194207e214,6.882212663184214e214,4.810895427706285e214,-2.968244473372099e214,9.827477640047164e214,-1.2961607475082917e215,-1.571068723937039e215,1.4450869089745116e215,-2.359606808892334e215,1.889095032680557e215,-2.3139834169627084e214,2.402630439266049e215,1.2621404928541601e215,-1.9779202727174505e215,-2.033463564038788e215,1.3772619719524368e215,-1.2081627459733073e215,4.919094954539703e215,-1.0889643416213444e216,9.244032595295993e214,-4.679412053372336e215,-6.30865723955994e215,1.8737924821486358e216,1.743772687840973e216,-1.4014214730499808e216,-8.201832757964909e215,-3.060524341064755e216,2.3625799781763676e216,-2.2449587174580095e216,-9.395152601667355e215,-1.0608373809416866e216,-6.508374637231417e216,3.823898220066317e215,-2.502586811212789e216,-3.208688416690508e216,3.59649408881417e216,-7.401856319208588e216,-1.1620019829903607e217,-7.463513403479607e216,-1.6150310125800075e217,4.282286627730519e216,1.524095472009982e217,-2.525872281409598e217,-1.5189139796511932e217,6.220521809221657e216,3.33612248355013e217,-4.587484769663477e217,-5.848324795254543e217,4.500946674211442e217,-7.357102416491764e217,-8.577991438132346e217,-1.5310864516297642e217,-1.2128081768408703e218,-1.9354457494478324e217,-6.774482848509087e217,1.7882539267151747e217,1.495777646022631e218,1.5897293498708252e218,-2.297675329239546e218,1.1940996264472433e218,1.2150060401339501e218,-3.649044628259216e218,5.384065906688673e218,-1.5237576924348678e218,6.667725034298602e217,7.289855585018183e218,-4.29783726439491e218,-5.664249513388276e218,-1.2721699999698219e219,-1.246315981744089e219,1.1399175371816077e219,9.530802023487751e218,8.139736831359181e218,-1.438635826735572e219,1.5302661290882965e219,-2.976179659169666e219,4.015607474030722e219,1.4416931772440626e219,5.161722650081619e219,-4.87730451252234e219,5.70385045134775e219,-7.770100964489419e219,5.457933162398081e219,-6.859366387844798e218,-9.055743812965517e219,-1.0311085040160848e220,-3.7265560135160586e219,6.111208894266068e219,-3.8943569026723316e219,-1.581004656686559e220,-2.8476668310632384e220,1.738129574340734e220,9.312919539297915e219,3.723914189765607e220,1.1652754208427005e220,-2.5447970305990363e219,-4.2499564568209425e220,3.210271844208398e219,-8.887118229935967e220,9.293470771380715e220,-3.3830835737582766e220,2.746665646854582e220,9.29816912548279e220,1.4863573852625365e221,1.9325378942112713e221,-1.3172537122800042e221,-1.2923826629915634e221,-3.1932347275695697e221,-1.1940956037051764e221,1.1542986711476692e221,2.320079878227599e221,9.628963729153124e220,-1.7378476489597002e221,1.8430696536963927e221,8.588306111668962e221,6.062187513808722e220,1.1684431941768462e222,2.0860743107959746e221,-6.991347985138409e221,-1.7515070743812998e222,-3.545341110406308e221,-3.897085309111359e221,1.6715661596067092e222,-1.0678669771564534e222,-6.56492439063591e221,3.617498245440309e222,-4.1314557170200806e222,5.355804701745824e222,-1.0873878100777087e222,5.432941166626086e222,-6.84228064541954e222,9.404834595928637e222,4.337483845681266e222,6.865743263479831e222,6.79141356325783e222,1.439827029916305e223,-1.563560265768175e223,1.369106205864831e222,-1.366451802254656e223,2.4143660014050734e223,1.73673203189358e223,2.601385275888836e223,-6.831826669368264e222,-2.910830225016233e223,3.22621393375325e223,5.505510274201481e223,-2.0502876834792882e223,-2.621490329088042e223,-6.605181042537962e223,1.2624128942481693e224,2.31756358758678e223,-5.259780503440664e223,9.093216793745504e223,1.62264651901141e223,-1.3917504252255725e224,-1.3685101042575468e224,-2.5141713032306757e224,1.9319402415462033e224,-3.354368366482755e224,3.4681304531700357e224,4.2604432894434805e224,4.285325071974015e224,-7.55320270793459e224,-2.6694396344853943e224,-1.1072400774231988e224,-7.368122499180548e224,4.781903443159858e223,6.644551259056845e224,-1.2419976321952876e225,1.4902229206643425e225,-2.4128125848856027e225,2.7463755186759635e225,1.6215741273978822e225,-3.350001829329801e225,3.4795243093046415e225,-4.6620349985876684e225,4.201843001103637e225,1.8339672664639117e225,-4.17144082037019e225,-1.8352879560657823e225,-4.2202840054941904e225,-5.800189013040518e225,1.3160264355405444e225,-1.0493912679386699e226,1.0895692590490527e224,1.4018957129684798e226,-1.7341560694372137e225,2.0325626258572188e226,-2.3015117617151773e226,-3.6603648604979663e226,2.894936211626971e226,3.998416908026242e226,-1.8986831634239574e226,-5.200498918028712e226,-4.263181326412998e226,-7.948480645453061e226,5.170705830871135e226,4.397678023922046e226,-7.653248345833023e226,1.086493243134121e227,8.895580019559042e226,7.15381478375571e226,-2.0802531873176823e227,4.234108971182457e226,-1.8726228349713248e227,1.200448112957946e227,-3.3796933816378088e227,-5.726029073686789e226,2.177697317922315e227,1.3083418895606305e227,-5.768873992229141e227,3.5679190603980854e227,1.302978973141292e227,9.449414931729493e227,-3.795799593468957e227,5.831654189343748e227,-1.2207480010484818e228,8.115527682174847e226,3.571183444663414e226,1.2169907520127728e228,-3.677779310633932e227,-1.0376988607458088e228,1.8703409937955026e228,-3.738507274830435e228,-3.717711326380621e228,-3.659860493328165e228,-6.207025394685762e228,-6.910252130389632e228,2.139815024916535e228,6.877358955231414e228,9.468711548273995e228,2.3662347633626515e227,1.4858614021159616e229,-6.33182218000265e228,1.819014989830359e228,2.468186029683352e229,-2.381711323329784e229,-9.198612855055716e228,-7.463483542911857e228,4.181164388377901e229,3.7609448118059324e229,2.55442867624479e229,1.9363456743840204e229,-2.491573734900816e229,5.295989864634149e229,5.858152215620129e229,-5.721710587443729e227,1.1340387487146574e230,9.250846123509739e229,-4.426621173196711e229,7.967494909910106e229,-2.452241827453925e229,-1.593172825978786e229,-8.749152816246553e228,-3.0689090169165867e230,3.5904461110894733e230,-4.929807599335328e230,-1.3674320102818955e230,1.0453423272063794e230,-3.782746941720649e230,-8.48528677230125e230,-9.071346005924843e230,1.7976846133053403e230,1.1580798165446955e231,1.2400840234373073e231,-1.2334691544396926e230,1.2230707353463631e231,-1.997739219237027e231,1.3230312049392117e231,5.158921227405354e230,3.2134604605450065e231,3.288455402456906e231,3.354180377597295e231,2.52152998567165e229,-3.90549574548129e231,-2.142140116369781e231,5.8280686041750877e231,-4.81310969476183e231,7.939025304513711e231,1.184879066571462e231,-2.2993546178205755e231,-2.426532732584153e231,-7.905869585046758e231,2.1195412446325707e232,2.4321251512829503e231,-1.5117145290804344e231,-8.111856676001927e231,3.149745597465103e232,1.1684846948402998e231,3.031370442170631e232,4.992229050426725e232,1.9506597649109737e232,-3.106510128515595e232,-6.575476770362115e232,-9.06299889340061e232,-6.438187302653644e232,-4.8453685086877655e232,1.176335004712933e233,-9.876009755665585e232,1.8090191242765523e233,2.495351356095239e233,1.076232871380374e233,5.871130626119764e232,-2.631074742589844e233,2.901054067677889e233,-1.3999791943899541e233,4.662095224779363e233,-4.535417846964043e233,-1.8143220959084718e233,-8.418634832856282e233,9.7245102462801e233,5.183608531204951e230,-4.837412821529406e233,3.480079645716408e233,1.2994149987507722e234,2.909232338582119e233,2.5526864663333503e233,-1.9778063130430837e234,-1.3707286611015972e234,3.461196228792889e234,-1.7921402366357335e234,2.80107048962049e233,2.0036862752600628e234,-2.0123771308006845e234,7.206628489075531e234,-2.3576540485837246e234,-9.015118880771839e234,3.273941910788495e234,-9.034209879903816e234,-6.951753712340325e234,-4.97760247054179e234,-6.720811644950427e234,2.0658685006185893e235,1.9191720553544035e235,-1.923036355495702e234,-1.1930418358909082e235,-2.7249310899273165e235,-8.61176226517227e234,2.996874865582742e235,-5.965415592306156e234,5.242739313405656e235,3.257035496206216e235,-2.699747400055791e235,1.0206031116161766e236,7.980885287483213e235,-1.2466702349895933e236,-6.348887572538348e235,2.007971033951172e236,-2.0491260887709904e236,-1.8201688689332556e236,-2.0997061563302965e236,4.159337538485924e235,3.3236643454065724e236,2.4821700474613844e236,3.3399809249169247e236,-3.9712113686615747e236,5.241403267274567e235,7.94100121795838e235,3.1206088361919624e236,7.410952069877202e236,7.188809943843763e236,1.70578016351331e235,4.554417618197292e236,1.2602027535622152e237,-1.1212269508824331e237,1.9076765307805154e237,-2.0543079063162043e237,-5.556316990238124e236,1.0273179983719724e237,-4.3185187980667196e237,3.650651502620969e237,9.053805636130879e236,2.0185961061027363e237,-7.499384043370041e237,-1.9401058066158792e237,4.202581831542191e237,-1.61332860145038e237,6.4914529525824335e237,8.528679903847237e237,-1.1252281743565397e238,2.157827121159485e238,1.1210271932822402e238,-2.787727055083126e238,-1.9047626504301472e237,-3.278085081529674e238,3.649332556562946e238,-2.5057692112341998e238,-5.598186973868641e238,-3.9687478513608235e238,-1.7445260079412374e238,3.3660970992173885e238,7.402942660032239e238,3.561261855103813e238,2.8861202297547195e238,9.763369687375382e238,-1.9862977254683843e238,1.169367843362472e238,-1.8455040898260834e239,-1.0790103658945993e239,1.9134006248211314e239,-3.134928008006171e239,1.8923076340008126e239,-4.38205363500149e239,-3.5847938193250045e239,-5.467812289009792e239,-2.343142378572298e239,-8.662104138014499e239,9.96801641252496e239,-4.616135033799914e239,1.2005214671648235e240,-5.897377390652458e239,-8.027494590669912e238,-1.465720512496832e240,1.7398485697873976e240,-2.6037680014107322e240,2.4671447661103864e240,-2.2404997821938975e240,1.7858253291407757e240,-7.494913161534676e239,3.826271862531484e240,-4.854027985133373e240,-2.7277161716478494e240,-6.4329303429027314e240,-8.060406094295725e240,7.732007697076718e240,-1.87589601926319e240,3.98988523753131e240,7.488852539508769e240,1.8799914778107805e240,-6.662797164233226e240,-1.725942761859505e240,8.60815639920778e240,-1.4622867209564953e240,-1.7412337295640654e241,-4.4578065318384774e241,3.0272811141721005e240,-1.9720792548578135e241,-6.913779846095262e241,7.966896078712385e241,-1.767644727640314e241,1.9348144796737008e241,8.349559470963922e241,8.68803588491356e241,-1.4049058046704996e242,1.4189542832487604e242,-6.12784332835577e241,2.1997012639165354e242,-1.3642413617998284e241,-7.813457965215887e241,-3.56617930893136e242,-5.528255565941277e241,1.5653258869883253e241,-6.859966116805472e241,-2.083690321311217e242,-1.891297562313222e242,1.581404783068123e242,6.848304926449517e242,2.0520120411534206e242,1.3080491000426047e242,-4.377414140671509e242,3.021840570402565e242,-3.3779129573293004e242,2.2658042834228522e243,2.4085735432544e242,2.3939422472360488e243,3.6289566902285036e243,-4.265781673235086e243,-1.3390049185511162e243,2.389689746623654e243,-3.3137061307065e243,-1.831682114671095e243,6.799338737393679e243,-4.280474339134015e242,4.6052927452583416e243,8.728694964888171e243,1.477388154671605e244,-3.7552413705224684e243,-6.831280681383504e242,1.0784738944486629e244,2.431978654961402e244,2.448585916135813e244,-2.275815054516457e244,3.7087923030421704e244,4.223108145760487e244,-5.533644338595003e244,-3.6083590920976856e244,1.804008002833081e244,8.47595444957196e243,4.4418063003544505e244,7.646343174141455e244,-6.415282904650863e244,8.964848898432352e244,2.7291409406414835e244,5.011124501225702e244,2.1476492851582427e245,-1.2391085458318054e245,-1.280973814881651e245,-1.0287796808802555e245,8.43706364836154e244,-7.141419118410166e244,3.9997008168803757e245,4.000042734084282e245,-4.327861934671296e245,2.3857149749977936e245,-6.228478754985793e245,1.066372345775054e246,-3.7254009420591134e245,4.599317974780965e245,-6.542914531136782e245,-7.235007879159177e245,-9.776881079745476e245,1.6442787985752938e246,1.302748333792182e246,1.8944342493722365e246,-1.6721102271471002e246,-2.7954819747149772e246,5.169706206497599e246,5.420905105552368e246,6.307357610921791e246,1.0403294951299716e246,2.873845512259314e245,9.27561366045084e246,5.813998234814912e246,-1.301938860737258e247,7.799124564303552e246,-1.0428569665473669e247,-9.899175393362347e246,-2.2041305791605976e246,2.0121621501668106e247,2.4473900288916363e247,2.647714823051871e247,5.226214218385197e246,1.1482788632917181e247,5.376358345392066e247,4.016915759182223e247,4.342340385259917e247,-1.972987831079787e247,4.027712429379906e247,-9.237428287056538e247,-1.2710667976267132e248,-5.547152272485154e247,-3.7118660708502305e247,-6.728707860812377e247,6.774700822347278e247,2.9111266387147627e247,2.0855235996051574e248,1.9744924087367722e247,1.780875021846104e248,3.317547791432228e248,3.668023746754489e248,-9.288999145498216e247,1.232290749284795e248,1.7344034685030157e248,-6.045331818051815e248,-7.335089591940368e248,6.591884802018957e248,6.250712303618525e247,-1.1508515867630514e247,-1.2021793948576804e249,-1.810624377549964e249,2.314059082392906e248,-1.9197060777546264e249,1.2817132190689857e249,2.741939971084925e249,-1.2834988760625138e249,4.009514170718571e249,-3.8932851915845795e249,5.804764074690558e248,-4.015582768924502e248,7.30953709303124e249,4.810703691723476e249,-9.51913962881941e248,-5.930424476566288e249,1.5284619164958137e250,-1.906697149555205e250,-1.244485271665836e250,-2.2463668387752123e250,-1.646193699297495e250,-6.87170547919641e249,9.339905411753408e249,1.2436610085211984e250,-7.691455955349541e249,5.972287107553777e250,2.3026642500333048e250,1.5576740210384997e250,-2.948478893139531e250,9.691554422708008e250,2.7606863843800165e250,6.613877412579226e250,-7.22135335181328e250,4.227183751107243e250,2.076177450855964e250,-2.6363468531713434e250,9.687831503421213e250,-1.5996768073330842e251,-2.8451092637129232e250,-3.501833291449555e251,-4.1736062367443186e251,-4.988281276078688e250,-1.1288890385647035e251,-1.768936046713123e251,-7.442530661629836e251,-6.938304868086648e251,8.426151384306179e251,2.0381612287270675e251,-1.0758818690502102e252,-1.2542417226663575e252,1.589618915545842e252,-2.1553993910606173e252,-1.406833406318402e252,2.473851573467249e252,8.107740539312094e251,2.908152017641192e252,4.886176452432976e252,2.0990540223048086e252,-1.4137497462469045e252,-2.624947963860381e252,-5.752971158712694e252,-3.9450324230590683e251,-1.1102424424536234e253,-1.1694361763000651e253,8.289588104399944e251,-1.640695121486577e253,-2.344945596389768e252,-3.5225323504635015e252,-6.594112628253463e252,-9.171157255024364e252,8.798104332926585e252,3.284765333176607e253,-4.714003670700643e253,-1.5921695574182482e253,-6.131943917962399e253,6.305002858056545e253,3.803937571374222e253,-9.994347676882347e252,1.2374815296022479e253,-1.1496910103062891e254,-1.694868753726568e253,-5.445572992376414e252,-1.81106758206811e254,1.4554602258972868e253,-2.169340543149852e254,1.1491280732631658e254,-1.4244335149597816e254,-1.7172835304815515e254,1.3446070212085874e254,4.203013854475073e254,1.0697478782024528e254,-4.95662163651659e254,4.382836306385565e254,-2.4026038152886945e254,1.06845999907345e255,1.1683825757119287e255,1.3985572408474896e255,-1.3001121202209777e254,4.701200144428998e254,1.121957486879854e255,-1.022901919827726e255,2.808188274394655e255,-2.2291938684994975e255,-1.813533740509879e255,3.060308786031268e255,-2.826185530529314e255,-1.3641329066588794e255,-3.3252303169539853e254,1.9956500790319603e255,4.4969979562866006e255,9.931781146444358e255,-5.23188974027999e255,-1.3070890137213273e256,-2.7946891395819845e255,-1.2601505890857025e256,7.235032926530698e255,-5.419834321058053e255,-2.5695505523327044e256,-4.9979831985752e255,2.075378150172783e256,3.473640465878695e256,1.4029049440504898e256,3.315170874390497e256,-4.206469026402078e255,5.269002885717514e256,6.685786490933974e255,-4.7541135050625515e256,1.1319072112677183e257,-5.334105813960499e256,-2.6928713001967226e255,-1.7014582923116544e257,-1.4182117652594238e257,-1.870145312134481e257,1.3563445003767613e257,1.4662805895740715e257,-3.543566977082339e257,2.6738843160128383e257,3.2636897409399195e257,7.148162940264445e256,5.780202407603961e257,3.508822551085059e257,-6.618272401807841e257,9.011999231038142e257,6.762443267046659e257,7.55149186750961e257,-6.837555385964195e257,-5.356472959017946e257,-2.4837078086809825e257,1.5333549894190247e258,-1.9761166725783694e258,2.2700459676377354e258,-1.648723751153656e258,2.1635013145015157e258,-2.484197054156904e258,-3.4252352246193744e258,-2.3919560700552524e258,-4.188294469025352e258,6.017333412129081e258,-4.92459967697048e258,-5.370262248828792e258,-6.072180312952748e258,8.888729316647052e258,7.596103255743277e258,-1.86094601827106e259,2.1464971578741055e259,1.128955361531433e259,2.621764237363329e259,-2.412408997114506e259,1.7249162354866322e259,-3.630883260050232e259,3.8162777089846176e259,1.9209239689685873e259,-2.206904465239993e259,3.6753441559416704e259,-8.414924382604026e259,-3.424152771330994e259,4.793463161597469e259,-7.628322192064733e259,-1.3925562782158647e260,1.719909013267883e260,2.3386988582146785e259,-2.4094841046752199e260,-2.588293829224407e260,1.8219791688063165e260,-1.760757973887376e260,-3.27310613109017e259,-4.0706469805430305e260,-4.2243998254522246e260,3.360818855298595e260,-6.232281206182226e260,-6.996106641315923e260,5.917712382714023e260,1.9259305928266904e260,8.118159200168995e259,-4.920969451064379e260,-4.1158473823945257e260,-4.1269603458433924e260,-3.6337588176286235e260,-8.736125797254262e260,-1.538122182144507e261,-4.044153104008024e259,-4.0367334764890555e261,-1.8882928187820764e261,-3.9499144651099534e260,5.755034707206758e261,6.2675226157503346e261,6.5477668143992e261,-5.1679112953522685e261,9.730761276044195e261,6.473246106150023e261,-1.282646257187183e262,1.4730757300783488e262,2.2544865572152628e261,3.6706059540502143e261,2.463593887332914e261,-1.0824580296601658e262,1.2160080502460759e262,9.399732825579414e261,2.5494377785699018e262,-4.5250661514661976e262,-2.3051015613659202e262,-2.2233839953875805e262,-6.496670000667623e262,-8.155748525067869e262,4.905946080906727e262,-6.681656535550627e262,2.535211140466698e262,-1.6294981937782876e263,-1.404848434279099e263,-1.6723727020970254e263,-9.432976849414782e262,5.309006187246771e262,-1.7342712573221678e263,-2.613010783246344e263,-5.509449045092401e262,5.122388708150536e263,-3.071216199881844e263,5.296889446207174e263,6.806819627733467e263,-3.5573082795500016e263,-2.0039616204498846e263,1.0256040709699101e264,-1.0586170631921917e264,1.2932572099051664e264,1.7462611221100683e264,-2.803130790727433e262,1.8883372015047422e263,1.6368813355990953e264,2.7758958445445572e264,5.954842859336162e263,1.3688557814761304e264,-3.7426968357922823e264,4.6385614025897715e264,9.615518809639424e262,1.9985595473865744e264,3.7107486754845303e264,6.744838600114735e264,-4.354181916881159e264,-7.283958933366572e264,-4.467516913396758e264,7.307269865699727e264,-1.2919269340085013e265,2.1504537959672102e265,-1.6001285866144312e265,-2.0742797546147034e265,-3.32165762087886e265,4.009130473570274e265,-8.356756333894605e264,-1.368155078786043e265,2.1628115332523124e265,-1.986457336615766e265,-5.420444946632694e265,7.164614295145764e265,9.170860033544092e265,-4.376648819605357e265,1.0919665560422758e265,1.4313864337125235e266,3.381017563986133e265,2.631954172605708e265,2.2101619158149398e266,-2.5272854040780347e266,-8.684327467366576e265,2.135719159812217e266,-1.7755103031957066e266,-1.3950631368326276e266,-3.317194312960269e266,-3.154711854378678e266,5.333127445512458e266,-7.99673788474413e265,-9.633361574903155e266,-1.1876636098660386e267,-9.164540094390463e266,5.51075823989325e266,1.669871387285636e267,-1.4774029046310041e267,1.8130020346908733e267,1.857100950056599e267,-3.431352403331092e266,-1.1421427563622077e267,1.4200679186055863e267,2.5301074119229906e267,5.085115314980987e267,2.577310522828485e267,-7.389408798643157e267,1.3830054046662112e267,-6.579749519449963e267,8.489351925864786e267,1.8135036891041418e267,9.988001028590055e267,7.160101007030702e267,-4.14412445929078e266,-2.2087804183517365e268,2.605422538961999e268,-2.1551581576215458e268,-1.523069714316813e268,-1.0421353115343162e268,1.5693971574089391e268,-3.3085418022792886e268,5.103586635817969e268,1.2832903369853376e268,-7.33062994124652e268,7.583989515779868e268,8.840118935054826e268,-2.5502801216303782e268,1.5633663262154934e269,-1.517288977478795e269,2.0516769478981995e268,1.3539104099908455e269,-2.5083291837551308e269,-1.0514156424412844e269,-2.2949254600276924e269,2.5509158154504496e269,3.245175430468176e269,2.315946817929735e269,-5.1156217791595184e269,6.229212092789982e269,6.879540447204205e269,-5.714425049828589e269,-2.3891254565265766e269,-2.2230380863932946e268,-8.567182223361181e269,7.663349377727946e269,-5.1117185859444397e269,2.771267414876326e269,-1.1659254275357712e270,2.54172035040957e270,-2.5774016299002483e270,-5.2110129355574104e269,4.473315513372992e270,-1.6259208832881148e270,-2.6095110943855325e270,-5.233660531135746e268,7.859114371920856e270,-4.657513848890658e270,-9.22476275983753e270,-1.232525188362621e271,-9.339223849763357e270,-1.1232060508845594e271,3.8935295344164015e270,4.688110889556731e270,8.89393270415524e270,-1.3123534228554303e270,-1.049038614437988e270,-1.7634925388245952e271,1.3514979796726453e270,4.571949253942925e271,-4.0008220504894905e270,-2.7189723570804398e271,3.0445712230812895e271,-2.2919208097595214e271,9.978993441696766e271,-8.568225584934217e270,-5.224826597931905e271,1.557528733453032e272,-7.613896786614482e271,3.974103325374723e271,2.476374375915944e272,3.8706303672291566e271,-1.2718257912760166e272,3.550021598127733e272,4.297776150019897e272,4.033490473165258e272,7.447258923404979e271,6.025206807032806e272,6.488290275638362e272,-5.127265018653651e272,7.458516058483824e272,-7.110322387079436e272,6.658265686594619e272,-1.210007369227612e273,-1.694054686254298e273,9.212123026226303e271,1.4017701817149378e273,2.5672282618450246e272,1.4546372942667905e273,1.908397218133472e273,-3.5776103986329595e273,-1.55991791731542e273,-1.4330149572264351e273,1.8784891637305375e273,1.3812192884920647e273,-7.430312942331446e273,-2.1250952240298144e272,-1.4497568578069828e273,-2.046507692462029e273,1.3563186904423726e274,1.630382859891263e274,5.584494203476266e273,-6.867278446365551e272,2.9302644816627766e273,-2.714085667569463e274,1.5741497003091258e274,-8.727380185223041e273,1.2154501749187397e274,1.7153363037869527e274,3.749090457225445e274,2.963520752975355e274,2.2694769993445494e274,5.729177918331888e273,-9.294290688732692e274,-2.2794253557810936e274,-5.813997796353272e274,-2.963446469402413e274,7.756909146466758e274,-6.6516988712729835e274,2.1271353536160903e275,9.342829000990026e274,-1.0372976938936818e275,1.5608141395878106e275,-4.023683566261939e273,-4.9668589372284263e275,3.1889523375514344e275,-1.2647652976308855e275,-3.8136644730245855e275,9.006333730974137e275,-3.8085551877469015e275,-1.770164607280585e274,-4.170036801447662e275,-5.3190138060915494e275,-4.7852765730556245e275,8.868425919653053e275,1.5731037504976655e274,2.234173024531708e276,-8.93683875856174e275,2.979322168633911e276,4.3191546251995234e276,-2.3573232132596944e276,-4.369980124648403e276,3.286009909555841e276,4.989910686778281e276,-6.906457454209145e276,6.32856087630515e275,-6.448792351373306e276,-1.8209742954212487e276,-1.54066827473316e277,-5.01003124946849e276,-1.4155353210008488e277,-8.483868980606638e275,8.375508494002229e276,-2.133554217435905e277,8.410087888073859e276,1.2829137681984335e277,1.2685767942940901e277,-8.45140430348503e276,4.823154574712719e277,-5.107781125162329e277,6.344442559874223e277,-5.316082975722371e277,-1.2683015803545128e277,6.059727214646928e277,7.013037267712673e277,2.9129192251248154e277,1.12328367377571e278,3.052214183387936e277,1.3074180077531295e278,1.092341039975774e278,3.605606823666211e278,-1.3319283691540492e278,-2.7624683028954422e278,-2.077431114612577e278,-5.574216750495956e278,-5.986407243513062e278,-3.744707767491529e278,-1.8820165876315705e278,-8.871117856127575e278,6.42154977203268e278,8.112690615661786e278,1.1086506897939789e279,1.7305796012279037e279,-1.6975757205924883e279,8.70942092171751e278,-1.6227204249750125e279,3.0653525411282443e279,2.3525830293733773e279,-4.278469205525256e278,-8.823835981258618e277,3.311355989854134e278,3.564927440499929e278,-5.278685693081669e279,-5.013345220757493e279,6.693227115469575e279,9.514029523414078e279,6.641679952617056e279,-1.295431997902753e280,-1.7604522756262308e280,5.061752969552255e279,2.208128026315202e280,1.4901681744740465e280,1.1888677938566493e280,-5.091516250315237e278,2.8502337697153857e280,-3.9130173864016296e280,-2.252385282045363e280,2.654006200956028e280,3.1405051936434033e280,-5.098863042139548e279,3.6736100905796275e280,2.7189687309646703e280,-7.634615939159648e280,-1.610013378045444e281,-1.6608477273007884e281,1.490871427688681e281,-2.3050044339583718e281,-1.5800403048485745e281,-1.6115925465742555e281,2.96504385691212e281,-2.912915032206976e281,-4.5605945609491776e280,5.426425828875754e281,-2.2496672403231985e281,5.5991625574606117e281,1.415380869699208e281,-2.99382760624549e281,-7.803063165796132e281,3.750465359525995e281,2.4636662327693095e281,-1.4176036806743189e282,-1.7499216487356698e282,6.344348829608903e281,-2.2131072291885362e282,-1.199045036996053e282,3.676808614958407e282,-1.221223221549099e282,9.45883789195257e281,-3.6643847749311274e282,-4.3235400466141076e282,-9.999113062108319e281,3.808143261860786e282,4.173778141371257e282,3.111990435014121e282,-8.175664801804376e282,-1.4988243912861846e282,1.0705592656304147e283,-1.0073996674991345e282,1.1218509628902441e282,-1.3827605496155806e283,5.032443868256818e282,-3.00602810479135e283,-1.23951469106687e283,2.2856662532190153e283,4.859036264529992e283,-4.44622987925024e283,8.350429315191574e282,4.8237079005801355e283,-1.7550737463418776e283,6.989457812874767e283,-1.0724982814356604e284,1.2161322701886546e284,-1.0292155076029915e284,1.2482779558231032e284,-1.797465306406413e284,-7.079485415910478e283,2.5691144596736264e284,6.996727125073133e283,-3.103001587672831e284,-2.199255899616033e284,-4.839659413444095e284,3.173489999734295e284,4.34809668746587e284,-5.758217773860596e284,4.6553711656203584e284,3.38630917729941e284,-4.902155870671331e284,5.4172442848226185e284,5.77720306894301e284,1.166462361755695e285,7.549081149134034e284,-2.2011448798566786e285,1.7047473627381675e285,-2.6582357375784386e285,-1.1385622005057867e285,-1.6018747342518464e285,4.3075547341597655e285,-2.4640404026040832e284,-6.724935697074059e285,6.497940535386264e285,-2.1605273206722083e285,-2.2740545739646752e285,1.2243037706326054e285,-3.81602545628868e285,-1.9520744520413375e285,-4.221772323075157e285,-7.516783960480753e285,-1.3497283413984818e286,2.205223866278458e286,-3.023008536363764e286,3.0457072186585306e286,2.2482675775151717e286,2.5129240436718278e286,4.032122566046194e286,-4.2729844071238885e286,5.615132741820542e286,-7.265337179994755e285,-6.729931895798326e286,5.295500747205737e286,5.616066649585612e285,-1.408315022133549e287,1.7595683670795162e287,-1.4368981047805716e287,1.214222538889348e287,5.090954762325293e286,-2.0602217254529983e287,-3.2515180160650815e287,3.18179421135409e287,1.853229301690292e287,-2.289121760911379e287,8.070722657262037e285,-6.68494447703288e287,-6.599715166966482e287,-7.435904626314088e287,-1.8086070308215365e287,-1.2806110256445278e288,-6.437083350241213e287,3.523542779298959e287,1.491632683912845e287,-5.644104547757405e287,1.6239827841349949e288,-1.9855254258419792e288,2.6964442041432246e287,6.568351835564046e287,-7.590943631534569e287,1.300985326500433e288,3.502956192546566e288,2.6803203410749776e288,3.9406732316937206e288,2.524133852749808e288,-7.084294625588816e288,3.9771157957642357e288,1.6411880256203662e288,1.6483682434329383e289,-5.86530270265459e288,-2.456216243443228e288,-1.9149737768717166e289,-1.489801997924499e289,1.4742692333536194e289,-1.0021487086515783e289,2.4876055959234613e289,2.7291774095515805e289,8.813689623763622e288,-6.46152317104349e289,-3.0106857037277498e289,-3.0213153337168875e289,-4.744445672823422e289,-4.493055692248934e289,-9.404793703205846e289,8.763917247505026e289,-7.479167517189287e289,-9.401921915377925e289,-2.2413293962481898e290,-4.296330095357909e289,-3.3205163642431406e289,2.492244428798592e290,1.927682536857715e290,-4.254755738980468e290,3.2086143354848557e289,4.7655215836978156e290,1.672727577807678e290,3.309090222142117e290,1.695783749641019e290,-1.047744524121651e291,-3.5950185181651196e290,9.015091899908449e290,4.5182234179352025e290,1.7613218746628943e291,1.3059924123550183e289,1.8219543559678796e291,-1.3753860349714272e290,3.6256203978905215e291,-1.490207435893698e291,3.1878533348415287e291,4.693107065055108e291,-9.580787531323365e290,5.441013883349797e291,4.7088002968853785e291,7.705600566920915e291,9.97396650718359e291,-2.54427211136799e291,4.604253631076001e291,1.0286442364979102e292,1.4997438546778684e292,5.22303038194859e291,6.2186089380593956e290,-1.2291785998185632e292,2.362235017636391e292,3.281831899144275e292,2.948995849353119e292,4.948528968668242e292,5.056341999203847e292,1.0767248779398345e292,-3.4820257250195096e292,-3.985378322020009e292,-1.1157906546470355e292,-7.400251476409995e291,-6.238204690738773e291,3.2901833662332444e292,1.8875482761516944e293,1.4320627344931292e292,2.3376445401451405e293,-2.933108310328621e293,-1.6492692154006042e293,2.4022170723698743e293,4.18805345549422e293,1.4130362071970352e292,1.92420915159642e293,4.9295671820038556e293,1.9530750194057104e293,1.9937502908359705e293,6.384107121028628e293,-7.866365840020495e293,7.646145058364715e293,-1.0458665205892679e293,-1.6630370239585436e294,-1.466405787386069e294,4.018487829214926e293,2.504898054442877e294,2.1066848946664325e294,-1.1961337048818715e294,2.4725287720375317e293,3.751201713809887e293,5.138879799816226e294,-1.419867665351349e294,7.618735613264084e294,6.563255887093333e294,9.32121961361352e294,-3.082693572723462e294,4.237148848004132e294,8.440825506082595e294,1.413302095791458e295,-8.989253852375738e294,2.1547184085055325e295,2.258046808444794e295,-8.77462750976935e294,3.3250914567339354e295,1.143702318825059e295,-1.3515065337807161e295,-1.2056014341406387e295,-6.278440336853205e295,-3.537908781347368e295,-7.2552164968224695e295,-1.4333609838311294e295,4.314027529917815e295,1.0005727404093443e296,-1.091272065322271e296,8.567293935444133e295,2.8642825287446316e295,-1.4035825239160913e295,2.0858202704952884e294,-1.2913254045847595e296,-3.447320670843509e296,2.548310711578194e296,-3.851895511300053e296,5.325510853351668e295,4.955682182929786e296,6.719143394289508e296,6.598545543251783e296,-6.091260971777681e296,-4.153067870291777e296,4.285062615960654e296,-1.1383218259245975e297,6.446309122263883e296,4.3976467950082154e296,5.46858633893182e296,7.7660989889752445e295,-9.962318417072597e296,2.566620986266498e297,1.5942526111286868e297,-3.224442187332137e297,1.9308379615656925e296,3.683201259568776e297,-3.7818180480653256e297,7.769231698327179e297,-2.348464110829313e297,-5.362498603831236e297,-7.023872588273689e297,1.1096520529135271e298,-1.1734173925184925e298,8.720164208536355e297,1.7684742110582027e298,2.427848290619792e298,7.70039312109723e297,1.0313525362417093e298,3.771494107319173e298,4.0671110884580676e298,-5.017488141572884e298,-1.7118926099709578e298,-3.550462488555345e298,-4.126376128050048e298,-5.350555987109947e298,-2.8012288062967413e298,6.15812640278052e298,9.13433717165394e298,1.5213735411326958e299,1.0735448279832506e298,2.0714388549850756e299,-5.988256403910269e298,-1.235942768064724e299,-2.0495026917459415e299,-1.8274051444616757e298,-1.7610306389846172e297,-9.242408196325138e298,-3.52696118612005e299,1.977314412437023e298,1.5532310325485512e299,-5.301203913339484e299,-1.7493002037868926e299,5.743954133038576e299,7.408852029709973e299,4.622511372523246e299,6.92944484756142e299,4.310315740034355e299,-2.1260627974956902e299,-2.4249455376747042e300,1.2628265695530775e300,1.5509726560130296e300,2.0267550390777456e300,4.283169516267836e300,4.086897074871464e299,4.058556613983234e300,4.218364620846225e300,-1.9462923666925436e300,4.773150905475053e300,-9.618319155409013e300,2.1549716444613167e300,6.085265505346325e300,4.3520854955189124e300,5.913291274749843e300,1.9619238716344062e301,-1.0378785838172982e301,6.693030015362856e300,-3.1345470285340335e301,1.9596430808826348e301,1.0309952798127299e301,2.654244792050463e301,1.807944091081136e301,-4.412112342638006e300,6.64010644864383e301,6.439993301479818e301,-1.7978752416741657e301,-4.34002543600365e301,-5.316966094184479e301,5.3519343121667595e301,4.928666087970966e301,9.570631900617931e301,7.032927038716523e301,9.964677223983334e300,-1.717667372141198e302,-4.572367028549846e301,1.2985219797064316e302,-3.924848424408328e302,-2.697658489469516e302,-2.363730947888865e302,4.833781464667968e302,1.2126850594507916e301,-6.62517848620199e302,-5.068728686311992e302,-8.22072327658518e302,-8.84745526149176e302,4.722272938924989e302,-7.270340595757547e302,1.4041209380513525e303,-2.7537092853568774e303,-1.5814049265489233e303,2.640754071001965e303,-8.926652405883128e302,-4.8545719761369094e303,-3.9902783438741136e301,5.168171874344561e303,-4.148095481178046e303,8.159708574577629e303,1.7302513987987893e303,2.2434835713546777e303,-1.3222214223900585e304,-5.726241240188733e303,-1.4971434144497821e304,-1.8464392095690005e303,8.418808053327455e303,-2.999773237709884e303,2.409129945446495e304,-1.9553563501244824e304,-2.80409817356976e304,4.769907575021844e302,1.9263052304890333e304,-1.4610599250610494e304,-3.3012034024308117e304,3.0034050018296487e304,9.143989187912013e304,-5.806432619785221e304,1.113938345225293e305,1.1404221977688212e305,-6.173262091176403e304,5.1780810630005315e303,4.113724271759224e304,-1.308033200864385e305,4.814637147586448e304,2.0704956879272093e305,-1.308026656847344e305,-1.975533399544189e305,2.6760204357107966e305,3.7181792725339094e305,-3.4381205127245833e305,-4.597423943060112e305,-4.378546699781376e305,-3.766380072193049e305,-7.000158499677055e305,2.2699400753189824e305,-1.3281663954312572e306,-5.9229864710475306e305,-1.6806320305244217e305,-1.6924175885227208e306,1.523654600478325e306,2.475810852590925e306,2.009575672678028e306,2.3507493897402105e306,-1.9720980983351293e306,3.402228327022121e306,-9.289953587605723e305,-1.6683018932793426e306,-7.434936369973076e306,-5.415306785968498e306,-7.826456462846513e306,-1.1605774826640502e307,-1.4227287730597095e307,1.665146397857088e307,-2.1096954088047507e307,-1.7564729688672737e307,-8.933872938550309e306,-2.329219224628727e307,3.3480305991710616e307,3.7602131184033044e307,-1.3582337789240296e307],"y":[-0.08513656797940672,0.33110004849796537,-0.1996556489683199,-0.2694413498506927,-0.2483886578479957,-0.18691516315860768,0.41362219883975637,-0.37283195309163175,-0.13700033504838416,-0.15943115244136874,-0.15452246376469425,0.3503262108827452,-0.1398173652846999,0.3083739140513908,-0.3324405649540101,-0.36600765948061476,0.24435506733278123,0.1285229220111801,-0.1643177414670407,0.07674769114852809,-0.02103205109611639,0.24252013102585335,-0.13890888218800423,-0.2764969200771965,-0.23575322065035387,-0.26476376275009295,0.16027028508499952,0.1279918713594408,-0.06434865459949357,-0.02162680303248532,-0.13054397202935641,0.2955310793541117,-0.08137284133061096,-0.052411110608964195,0.20503707409499183,-0.3940549198757024,0.24232182510334033,0.09240469885633584,0.23409354608889732,0.0988107472618509,0.07402080865491589,0.167861982754129,0.18593919344097465,-0.1069423885607812,0.4008364265030473,0.20412480862105453,-0.3513085662413433,-0.1299363112780676,-0.07320513352090119,-0.15752857315157298,-0.4461854272250445,0.22362914720049587,0.40494428738516297,0.18941563035008047,-0.01896774437134341,-0.3475697117108054,0.43111188340883455,0.20328949697541687,0.47235619719089184,-0.2662752172586018,-0.013282748583393733,-0.1527449199707136,-0.09221924632277823,-0.35166867311149685,-0.3919663311728685,-0.32176983055717856,0.24092585760513874,-0.21014781407645922,0.03882156802177672,-0.3457023694903463,0.02551871337376377,-0.1540667825068327,0.39689059316150566,0.3661217533130092,-0.1699099942007396,-0.3582297949426736,-0.3420218755011939,0.3593581131612129,0.45432144648135386,0.40736322043264894,0.14559630881794905,0.4946040747475111,-0.30157204038456853,-0.46375510106432616,0.4559841649206746,0.006834713533078629,0.010521453805846015,-0.44258717977411255,0.3667889806905933,0.005479599778050792,0.023154616516964932,0.4752551996547487,-0.30476303732837007,-0.2948569155134202,0.34907550459398773,-0.45674554470603135,0.16383499252274136,-0.11409948213216814,0.09853484365437759,-0.35076992660283435,-0.06225251115315622,-0.07265974300355382,-0.3469953291618324,-0.1492936056329517,-0.3978068531754535,0.47812969602952293,-0.24438871957626618,-0.3185486182612538,0.32745940968116405,0.4737961831209303,-0.0855070147914112,-0.30541006408272064,-0.07826204099990686,-0.4714943651251562,0.2662645712137106,-0.21924335845030818,-0.11408748745704922,-0.1985868368246433,-0.2844289506686424,0.1682221260255541,-0.437932642123237,-0.20353081503586812,0.06017434336602179,0.16839147353237682,0.49864611773796286,0.0779127000030504,0.35401280665865276,0.21732071501215078,0.20470613350822453,-0.41269838670001624,0.30011970513962183,0.1942818903873047,0.29594704825635687,-0.1818542002342478,0.0620013176985883,-0.3214224628293847,-0.13614561723077112,0.056180313281094296,-0.27613190339692917,0.22045536284852663,-0.4066304336423314,-0.14504996626711342,-0.12854240505289272,0.18257447921377667,0.41778846729289354,0.4649540391875453,-0.2194114064471624,-0.3489290792939841,0.3082503310651876,0.30735636496775,-0.21612002277487874,0.21479959171996965,-0.3085156703148191,0.0014407277331349722,0.1963638970846504,0.1281589539511776,0.48144143959878005,0.12167710310071489,0.028987262336179542,-0.3906134649086974,-0.14477101368284728,0.10960742265066448,-0.17896707153471225,0.449034079348015,-0.2772098086610877,-0.26832950383879917,0.29465493928293296,0.030671156503946584,-0.3459378550958916,-0.02170379150009749,-0.454434207900678,-0.15469048375212102,0.2671666759842759,0.3080841592124779,-0.2116043117909312,-0.040991746462353706,0.03257981047337766,-0.013652251659673098,-0.4081520304946409,-0.14163593288300103,-0.31974537662716607,-0.04125353626208583,0.3698782034927266,0.43214018563452883,0.20109471846093774,0.4831532899476816,0.15873907347943517,0.10132814374515675,0.3089300747607522,0.15726297559934088,-0.12877402304744834,0.3228647247640435,-0.3023888932147418,-0.3632765114451406,0.4692297648392918,-0.09900251684449013,0.1368410013007837,-0.4415495818410544,-0.3526572602025908,0.11536648994520204,0.2665822963964244,-0.2947026661622709,-0.05548084500145123,0.08930693158633551,0.44723024595909777,-0.49011054961843903,0.3563473766647314,0.4670227212945137,0.3388478890570452,-0.24915448229330495,0.07884743061442134,0.07797409865546712,-0.19267019200422397,0.25704409701756825,0.3897878739129539,-0.32337501129349056,0.18194357790561178,0.2630996309250442,0.22542792696737735,-0.19306912279854926,0.20935023318386836,0.2946592285967591,0.018674097265945155,0.207594912653011,-0.27121661592693336,-0.48680533858014985,-0.26436333386613287,0.41394564279504853,0.21967643742552823,0.4324466804425511,0.3153446145916077,-0.4802343014006265,0.029240440093175835,0.08680320595831437,-0.20694571857599064,0.12193340629113125,-0.17811562095712286,0.24208904331596437,-0.00147453333167058,-0.09338639167178897,0.02008469810775737,0.41619373165091056,0.15626168336077417,0.44580949412408843,0.4366143736173038,-0.1412467760370506,0.08574185800510326,-0.10888858009616409,-0.4009003162685705,0.3536843190105048,0.05088781368172279,0.35995826033850964,0.00643303232872916,0.18620716463426334,0.3520552727872879,0.4628716388291787,0.2456375193990581,0.28857981680136113,-0.43406507159262,0.048911997526046136,-0.27244820663351854,-0.16845509637003242,-0.1499849983502708,-0.2693509730797192,0.061051997334486297,-0.21830143297776372,-0.3614938606531828,-0.3630650447372825,-0.2207692527034355,0.1832373114317185,-0.11239117787330688,0.4865489260196716,0.22457097964791095,-0.2004325445529027,0.17486685706736127,-0.21044473448019163,0.4536131249835771,-0.034621132617699724,0.05543354208258022,0.29254751041097204,-0.09407916102705194,-0.39781123529554563,-0.39659259804302627,0.2723890263862192,-0.15648649725026398,-0.0006920801650547315,0.08495533728468807,0.1549618761666407,0.02659780055984262,-0.0697534540209237,-0.214300923731096,-0.07041270236460107,-0.2632620695446104,0.050170591830525524,0.4500383221770732,-0.2751163362818527,0.3355923032982664,-0.37161479139660725,0.33840434864273994,-0.1794992529177395,0.18091742605027616,-0.3972765761361372,0.375497053183242,-0.4562759435498682,0.25781665255374286,0.4956154291642332,0.09241389077385542,0.23547288652975373,0.28290019617658624,-0.32121261207031804,-0.1274738763752561,0.19804852638509574,-0.31218004323087833,0.01261100559755679,-0.2000933758519401,0.13570456940787068,0.22272115662978975,-0.061495754222322896,-0.012982720433830641,-0.40883923436069725,-0.30057296399774147,0.2993975198370926,-0.46444320573638276,0.42894847027806704,-0.42477257084829345,0.44411802850745596,0.44493467956479726,0.3407786331717646,-0.03210859321380233,-0.35683377149272877,0.038329504191294106,-0.17520279517976545,-0.4011951613001614,0.16180810733216044,-0.3114677129269581,-0.2638696166889132,-0.022844370710963124,-0.16735857933034337,-0.0241483247003631,-0.13087831251167903,-0.0020303025074244196,-0.23354027902276742,0.15766353159474344,0.21333592881916186,0.20598934776408262,0.0943931814250647,0.3781998881653057,-0.37105418231878695,0.3587906425581593,0.4164760853328957,0.038001936370780864,0.17405504772284308,0.2586156609087822,0.030623671822607834,0.34263817969221244,-0.1982203448266293,-0.16490744276875957,0.2009152598390831,-0.2779398057434308,-0.3013212810742667,0.44462726443969847,0.16159876941210238,0.13358620421399037,-0.21607356572111613,0.1815628814007073,-0.10408448235307932,0.1757125464282776,0.04765622236045397,0.1769293230148803,-0.1185277425352751,0.40628756833668556,-0.3738048771217448,-0.44370134757402635,0.2416005574511757,0.4934495656799256,0.31415490710257954,0.05716871297201287,0.4535643943302323,-0.20082332925271773,-0.14935101695792907,0.39248202811854904,-0.36432823434150197,0.4515156095530648,-0.24611765230834615,0.24353813160324234,-0.10287797646399932,-0.3665806389231765,-0.3627590853801319,0.4119382519294965,0.2443947213076716,-0.16275298325458798,0.3023294937328995,-0.15960196131004767,-0.20402224524321433,-0.09017540112413269,-0.2719524531603712,-0.3377229059905913,0.026491338367523598,-0.1978137149998842,-0.28332416856675535,-0.28257699663760394,0.10883112539225048,0.35178015393526296,0.4384055807951024,0.4942794519576672,-0.030839660028578297,0.21503188819148544,0.26922166461595864,0.19607217109713426,-0.29753531070879524,0.008513713267305212,-0.09664592825051721,0.019830568919509073,0.44220229967834435,-0.17633797516782135,0.33833159595038476,0.04527292827975904,0.06829223790602823,0.1432424490398594,0.26618247897154146,-0.11416869040934485,0.4267876087786111,0.13143109037693956,-0.02782893020572863,-0.12042399591977748,0.24174411607980262,-0.4968707939750463,-0.1849841733706541,0.3454339845374803,0.23760164414373186,-0.40070941899309775,-0.12195984094305512,0.35380206182537277,0.4208394511034479,-0.16605742647062383,0.06608372799608664,0.30471209745227235,0.13746169713666867,-0.15906998312004372,0.13587047527740492,-0.009135539555411798,0.41448015648208325,0.01018760793484108,-0.40446815846604234,-0.45672768391397867,-0.1890972996353235,-0.31331909253085466,0.4461299744266045,0.07883821196619811,-0.15933450086448553,0.49379838728515835,0.04398537477238196,-0.38533231938340173,-0.2454514011594282,0.006930079134296996,0.46350937683548854,0.4728838925359642,0.44928495335025986,-0.04285894122539724,-0.4088174532977913,0.24075684272616638,0.47401903879424045,-0.28969837552946953,0.09994818960328655,0.3367136681038869,0.038927477255279674,-0.4152228589750526,0.10553021182921984,-0.4885792569864307,0.04792111683332534,-0.32109062253064247,0.24351163556808686,0.24089713309588978,0.3086571177913726,-0.35183534834664054,-0.02557544664645728,-0.39552014525422385,0.19119887163597982,-0.13049979430005765,-0.24954658323471413,0.4845959890346183,0.1707143137046594,0.4017141990402888,-0.32172972620577656,0.4371033636796382,-0.24746714443796347,0.35655135723021836,0.10393919524278572,-0.44904604566713435,-0.011024412136475537,-0.4504241324480154,0.42561385252497486,0.01975388633203856,0.25844136457378086,-0.07826936249883976,0.19360660527158347,-0.43169517040723293,0.00514351605141572,0.12756807977859919,-0.2829020054038389,-0.4995617335532705,0.09391967540495005,-0.42550970010363387,-0.32007910825314534,0.07443698765885176,0.3625332780440744,0.1310122546994128,0.11367255180562053,0.12366792589541098,0.4286827514092837,0.139243231330066,0.2646199062905372,0.4315639603429291,0.41107891369905825,-0.47007105564784113,0.4003787627551141,-0.21698424214723278,-0.4429150061138014,-0.050317059849769974,0.3864529935633392,0.4039752441310145,-0.408039059858625,-0.25826099747383835,0.22609961704644976,-0.2915042928800333,-0.16129692279532715,0.06985175286838907,0.03859234777386167,0.22390445983852736,-0.1945394501583797,0.1397951755687199,-0.27362448987092947,-0.44894751019634227,0.09411815755633035,0.47800768688978557,0.3337270944172446,-0.20923361038372823,0.16362190626568562,-0.07637928094803259,-0.3881225605594456,-0.10288167925294567,-0.14008249029921838,-0.478064507349248,0.22441365861210616,-0.21489132284900836,-0.23809135957791172,-0.4722077684762094,-0.49018529229751095,-0.15761486983958917,0.10781176390625302,0.4417845526061994,-0.48158140856209175,-0.4787712776565838,-0.28871129602532397,-0.016007373724617358,-0.15617615264616758,-0.39184597565320134,0.03356877554974447,0.4564856477833201,0.02775441192989825,-0.372033419200549,0.11631493602568632,0.03006927165479345,0.34837581709003484,0.3756224135853474,0.43792697788557344,0.44784800909360634,0.3137208320106326,0.25467330743809735,-0.49650392150856804,0.10477818152115126,-0.04609430373825929,0.05091054896174585,-0.29623626745438036,0.3403210569311348,-0.40793295003267027,0.30737407890245505,0.3042024800766916,-0.26117027489787237,-0.2594474724542275,0.32117077447502274,-0.2521712853710989,0.0576095377892778,-0.21988735052153996,0.1423923347281275,0.37611597201055,0.1503460801842249,0.2563169614176435,0.33894778600781605,0.3506017054437274,-0.0828170532673349,-0.4623493877262863,0.0011461631758280522,0.005185347488490866,-0.29592630767987593,-0.187557897493992,0.12312827506827939,0.07182153870358077,0.26896680106669635,-0.16913711929638486,0.3959496306776642,0.3045346354482037,-0.46467170951217573,0.033841024804247555,-0.38031746183160786,0.2725667771080089,0.14153745120811534,-0.4642249605125126,0.4598483460880829,-0.4693858221856888,0.08470590334503059,0.3187098814157383,-0.040406178600657316,-0.4555478861025133,-0.41105565536816946,-0.30768051482283565,-0.20201820946039306,-0.2512263213558876,-0.29929571982866765,-0.36964743316966975,-0.16243561030963138,0.14137569753539814,0.29042812472340795,-0.39392834236684093,0.4442496906235023,0.4967297462822571,0.0973989641802897,-0.41211711985882493,0.4628472237411241,0.05473594297658657,0.48892449714960784,0.4702397087234116,0.3036224771852911,0.15968798377702442,0.14060365657669505,0.13278934075167226,-0.14928175652817943,-0.2237293060812422,-0.1399280791558235,0.3392883578201331,0.359419573153795,0.04832527880743687,-0.00207583718653237,0.2248949933437272,-0.44784619714047125,-0.4382534795551223,-0.25886627956303676,0.4621159936929322,0.388254056666663,0.04826093189725511,0.14937044243651632,0.44888376062880053,-0.31452423594600143,-0.03769760393350752,0.22003985028490813,-0.16423212694992806,0.17845869487885846,-0.3270370190672456,-0.3115268992715927,0.4053537357167649,0.11257707684810359,-0.17698947890348538,0.4541947582954058,0.062020143745931566,0.2947990627298325,0.1512360567733988,0.3030548892894436,0.17353200840595973,0.3446001226131572,0.0770427404942795,-0.08850010452100965,-0.047901349376628266,0.2759728429903958,-0.1244977798169058,-0.1516389979812789,0.18537331309166283,-0.2034212725498099,0.08868642590399611,0.44017042778055737,-0.25352466970203325,-0.15063612965006778,0.308528356459256,0.4691263451107963,0.3054350915303625,-0.2195859627758716,-0.36506736853616584,0.0009262237185072575,0.031428633013194984,0.0780714057427081,0.4007912269219518,0.140582288947523,0.15540716339460592,-0.43952554586593395,-0.4302848315696324,-0.2321549603319366,0.06065944513342969,0.19100908936345418,-0.4696968584520058,-0.0683829998389005,-0.03161858450797572,-0.05396959735609497,-0.4705538618799936,0.450326740834897,-0.19783201895637492,0.1845337586861293,0.26194399590075257,-0.39658475351338907,-0.23885435213112882,-0.30163183571346264,0.15892852739464725,-0.1882672555501399,-0.003601688827475691,-0.4324022898482802,0.4389254524681494,-0.3030791044485175,-0.095660477457719,-0.012112798465522268,0.2691388799453116,-0.06345112237342643,0.40975964778229335,-0.18339315310062143,-0.38943866881129985,-0.20918642446986335,0.3858195963648847,-0.4038572823353588,-0.004745643218378337,0.27560036158289036,-0.12531878969150867,-0.06015385074386037,-0.35354581155931,-0.0466048669032344,0.3856301302175802,-0.07829151446659233,0.469373106763316,0.18798520384559514,-0.3474462382973149,0.37686736875838656,-0.4673011374872098,0.49914269577291526,0.3582098970501435,0.11124363188322817,-0.32254242770478525,0.39059502127821855,0.4901201085806304,0.04023905010601947,-0.026906583886562307,-0.2531304402858836,-0.4226453230731475,-0.05021065013328352,-0.11224694950276826,0.34202120661356084,0.48913322421437866,-0.26135992824812826,0.09136954249204554,0.07623365397654269,-0.16753207215550803,0.49997696963666516,-0.31648560595672004,0.4210706703617111,0.3098779526876556,0.29886357719100953,0.06708265279517711,-0.22140525054031657,0.438617069371829,0.41034322433410253,0.021109084862797722,-0.13894521336557175,0.43692998309931874,-0.10300964857938233,0.32142732342398683,0.4230075309990615,0.2420610291280305,0.17029663335026046,0.12003652075282445,0.3679231773433165,-0.1606921239141168,0.2996428229275092,0.27375759365017416,-0.027308897386069342,0.010703175470126114,0.016549175498436153,0.41602732310388135,0.020023578272069464,0.35594085169084067,0.29783127898048267,-0.15196674108885988,0.27853258790905366,0.2659815276594102,0.4511126519150921,-0.015016629124906311,-0.4138482313052425,-0.27408319422120697,-0.42466508308792106,0.28452335097180637,-0.0500280814393983,0.09228886487049093,0.3621657015067723,0.21607687069514658,0.4607575057749873,-0.4839928378390881,-0.22269678672133542,-0.2979796127755514,0.23594353794871692,0.14557072326777232,-0.2920474612652306,0.48766878893378807,0.3028005048870388,-0.27313436337194075,-0.1536977532461019,-0.47578066081760895,0.06258077138274332,-0.46360038204268483,-0.24983335432541587,0.00033184137711694817,-0.4033458085445478,-0.2892403443015614,-0.15372013310369237,-0.30895138565420366,0.47196396744196467,-0.08592697094284762,0.4788058622555902,0.08695311125136929,0.02245156202072862,0.2027803142831739,0.3380711860299841,-0.2233119490816553,-0.4832779787595862,-0.14547388647839155,-0.024424559006961388,0.24538131907197447,-0.42590657225851136,-0.06421640999392242,0.4971672248497425,0.34448264601338385,0.06522983274660143,0.30940143093934647,-0.44172550182255366,-0.08463095638480644,-0.03398992159593983,0.24024755369699569,0.06201209038304034,-0.38401024712712895,-0.48268073659895006,0.14776270194179597,0.03968130074733334,0.381378844345063,-0.016316293417642846,0.07248766902698534,-0.3861263728766211,0.39873690011152996,0.11820111222108443,0.3203641278979674,-0.4157503997957137,0.22548719597297384,0.18395999518760187,0.1911568674976758,-0.29396286151030115,-0.45068124153505296,-0.18457656478979878,-0.39834137114194323,-0.47702228519834877,0.11822018134384615,-0.2549279701980214,0.10000170683341891,-0.4715456760727912,-0.04404332951767165,-0.35020994536290617,0.19893676751994382,-0.20940331814222968,0.44244892318612705,0.4279268771775311,-0.013668301706621477,-0.45189174390063447,-0.4224669836552386,-0.26181523991517985,-0.18217575019582855,-0.4391008761302173,0.2751852956027858,0.4746699750868477,0.4468377408532125,-0.0998048095202233,0.2535515226698417,0.438933628034496,0.4742215385176387,-0.15734412057598468,0.28479741820911686,0.3347231664982535,0.012287187190911597,0.10945763886404758,0.4283634573833768,-0.0092930146358432,0.18855753948438236,-0.07539206234862372,-0.4105972160112876,0.03898748468984081,0.45169614226590626,0.21187935702319005,-0.25496545378587787,0.0906199172197133,-0.1633706883356716,-0.39038863231156484,-0.0071282317869822975,-0.4283096534758153,-0.2405972395115934,0.030686483341553217,-0.35233399996180226,0.3660176696835946,-0.07725936958288226,0.3713102168688034,-0.28944586584412857,-0.4420086300259052,0.406575289658764,0.3310329698431185,0.117431464954461,-0.07089494448160938,-0.33462620420370803,0.045203533529524886,-0.01985355215885809,-0.43197568288493504,0.1062525135791712,0.3213404859642621,-0.08679606132252271,0.07190314746946025,-0.06887908052692326,0.08447848881960551,-0.47480287063445514,0.05745059295905075,0.29190337003116906,0.028622888792811052,0.3901573467440753,-0.36928273146954993,0.42139808707733084,-0.024586159093957782,-0.0774678858228075,-0.03385091944789065,-0.04496830875852775,0.2561663166619934,0.0825323119581498,0.24929544280191163,-0.20193448928988977,-0.04958970894769377,0.3243152708731527,0.4825089219058345,0.35798089960609625,-0.08407415392156481,0.10276959208235925,-0.47452420159366104,-0.30177261620990037,0.3733859691759702,0.3972239381710325,0.3056497449413331,0.362020245443478,0.10808814421765489,0.43791270289017703,-0.053944428599851824,0.20227162283037625,-0.2368242907915994,0.327400917956995,0.17133371755243365,-0.3086981319616984,-0.040777024475688206,0.0832675797928355,0.3868523579974341,0.2505476911187363,0.17770386908849245,-0.4101847691951843,-0.16840441890380498,-0.3599807510804651,-0.21016175581576935,0.3559168671426336,0.1469556718599041,-0.06815176311509474,0.22660181736470086,-0.4383225393446899,-0.012807727012107195,0.19349447578789336,0.22145731956644532,0.0875535022550542,0.19114115888918493,-0.14558146061414212,-0.1468019813710877,-0.11561012695208572,-0.04133759898643041,-0.17927077533871905,-0.3340735520787306,-0.35351886554438083,-0.49160340505868994,0.2531374731043272,-0.13573482357062416,-0.3218911521822301,-0.03278928553823324,-0.3771680482044937,0.07167447417471906,-0.10247800335837298,-0.15945633549817284,0.06125898142143704,0.3841669589542833,-0.4734036473934846,-0.10847507790679711,0.22661361583079298,-0.11698884332154735,0.12197003903387293,0.20647049764689007,0.2825329047448193,0.030908234570769633,-0.14088754734777909,-0.372864122876577,-0.42989156194440636,0.2901521776902356,-0.12437829658957544,0.19568859526845284,0.09065944503589285,-0.2527031717859993,-0.08883044950247365,0.2734727227016238,0.27592389515633764,0.45760824158760105,0.2698368475928492,-0.24389830351518382,-0.00010664133101534468,-0.07865512759428306,-0.18805974207853104,0.45568181760435356,0.4774938277331904,-0.09861152179418387,0.45594067898559776,0.06967811202388074,-0.3826150782635911,-0.46841595107611145,-0.28752608799660284,-0.37622203108512453,0.30559395525555066,0.25010871577105553,0.21380036828945914,0.16055049244668185,0.06910737573355608,-0.16071657078156343,0.3383209204265225,0.047965106243213596,0.19332373097173283,0.023187580115187734,0.17827466149026705,-0.17015363538444928,0.2725298671561056,-0.48578653352335355,0.4750207282156842,0.293062564420431,0.3816609386840215,-0.11835058009290189,0.41711786731946066,0.08157800755847289,0.29290114021301883,0.4544586502365071,-0.46332587659723723,-0.023523947049659766,-0.3416238850867461,-0.2865516724199999,0.10196348875355143,0.4568033279455579,0.1621068575284419,0.4977336731499482,-0.31181930438035743,0.3675341408130437,0.1487674228612712,-0.3448720497954765,-0.38540314437706,-0.21618181179205442,-0.06347622772847816,-0.11731135947048688,-0.4090889030675955,0.18213328351502245,0.4625087741857643,0.40114217933205754,-0.2771255140296527,-0.285398813092268,0.4433381920063162,-0.02507268945934249,-0.15254257281796013,0.3737945811539187,0.35631543738436666,0.3132115414981125,-0.11346482754534759,-0.3909321108275505,0.1614220906581949,0.20285504108770236,-0.3286426609071791,0.35159231511330136,-0.4580196683532405,0.2976828689627462,-0.26745794856323735,0.33548996827423294,-0.3840308830143426,0.012460403389194408,-0.45066250065396063,-0.26999885523680045,-0.4724315659615719,-0.1617776535586395,0.057610819138777636,0.24214897235136745,0.41833020953095024,-0.3011425208660039,0.4869178992615677,0.35052561953805617,0.23815902714565151,0.1909447767834216,0.21050754826051565,-0.21885987532550355,-0.011412791108223796,0.1534575128083604,0.3139929105159578,-0.021420368706213555,-0.1400971619944973,0.06740203983737958,-0.45382220550127816,-0.3456433887700001,-0.22593986934856725,0.2276805355456637,0.21323034546587882,-0.42998191327264723,-0.16554085418811382,0.03386716804959522,-0.2944473075218421,0.2606974763708789,0.2272910221148683,0.2682544690416677,-0.4768484325008202,-0.06422364163249594,-0.04070607955084493,0.12756391915321275,-0.26295093848925455,0.2823740565021695,-0.14841078512422534,0.0762754045749019,0.48573600450490106,-0.12914701706841525,0.4975143500544139,-0.1401630768836466,0.3455798047170595,0.12959820696026103,-0.4193010036985596,-0.3011331175195213,0.13165998728822914,0.0630419600032095,-0.4112476723833496,-0.1379774940913958,-0.2728742165735578,-0.32145607890233596,-0.4957948565869683,0.47912918248322867,-0.36555192125314484,0.05846661794005681,0.031029405681486155,0.050441026310579895,-0.20593412825228619,0.2217298032950692,0.1388106936610909,-0.25431119868091434,-0.4860786633794134,-0.33716468718825765,-0.25363169866672464,0.126437335651562,0.36071186353321427,0.21565670059129194,-0.2728711949280138,0.2904726592982976,0.07623700726558691,0.31687128527774333,0.49418974749521793,-0.3207610586271248,0.4326644047775585,-0.0005238218362975111,0.442826585591684,-0.1580669318568313,0.44512793246610527,0.11454297629584609,0.24372226749177006,-0.2633982273209625,0.4410383813679142,-0.12167308710908986,0.43435016641311397,-0.3167158784518278,-0.026770176458209782,-0.3723416397868742,0.27780172614843446,-0.44309257931444335,-0.3613372505694865,-0.15862037685918184,-0.051463083454191594,0.197992331427159,-0.146134610245106,0.4597866285128569,0.4068998432102482,-0.14085356097451984,-0.2081047494248951,-0.14699359167172954,0.29063314730815315,-0.09766096209007236,-0.07711109521756287,0.10334713323738876,-0.34487578361699534,0.25051073894284315,-0.31620869133555995,-0.01616014911289132,0.35372854223743944,-0.4667513542690449,-0.3697660293326581,0.14097619705807474,-0.4369538322988009,-0.33750572201939955,0.16601340746718263,-0.01924470395575173,0.3580062234077066,0.31549995985929513,0.16785638439679884,0.16182865819728032,-0.44631270158657066,0.061565543155550406,0.33166585022327943,0.07975799754891022,0.2474095358477293,0.26516180935065314,-0.13221918718924042,0.10745414823509725,-0.4064046173801257,0.21709993290757956,-0.22313511594732072,0.1969239552518347,0.14468591398314823,0.23251459532716856,0.005052217217698329,0.20562692176638664,-0.3541313510506976,0.06196143702631085,0.12544769300307368,0.4123378849481065,0.09520847878611849,0.35487028020747347,0.3375152559417771,-0.40561244016892517,0.05906879094254047,0.043839307483237944,-0.24672422259853377,0.012346675784268735,0.11942099923858596,-0.32718806114848187,-0.01307678033736348,-0.2103282263407904,0.43955929889717993,-0.24995335205904134,0.42757121354207883,0.38991281470723926,0.4631044463074183,0.12580785248218973,0.4827193595461521,0.3151336365575528,-0.06292921960867948,0.05916978818515872,-0.37848239052751786,-0.353728799067061,-0.4095445900350718,-0.013445757733148156,-0.09637765155932687,0.028103834938569383,0.40714502037475553,0.20299925446076061,0.2458581118445584,-0.4304760029235637,0.03169203752814287,0.1551206809479777,-0.18948472687671503,-0.32742103405194833,0.1509363978230409,0.12144105918845138,-0.1761912404871826,0.0869215809060786,-0.038980802589406505,-0.30022304241554476,-0.09658335007563923,-0.16369722106622864,-0.21195267492738412,-0.06460495255444054,-0.27428895979503665,-0.3371497579741878,-0.3541365588460055,0.2780463656455836,0.033223830436597934,0.050682572286478544,0.06853377156687879,0.052029676148868775,-0.3293149111319207,0.39439394192527266,0.10000137877532844,-0.3534749634411327,-0.26224028535619603,0.3947489499222512,-0.36339320662548946,0.3193264279356065,-0.2884828835677853,-0.08761451688085686,0.4627912546306703,0.022188401956884096,0.4035981076618613,-0.17568123069032215,-0.1365165526142318,0.03172885127418068,-0.204341185155692,0.3462083587665863,0.38225982701498107,-0.3949022272811802,-0.341870144091748,-0.4967916203971301,0.08836431977688997,0.23891540214787055,-0.008748573472945775,-0.26367032820705094,0.36281391692189335,-0.2449627889265089,0.06979161226007857,-0.4948623959600904,0.1341402576627193,-0.30924493350636695,0.23601959408241502,0.43488464120076076,0.03834113672325734,-0.2255029174393457,-0.04108318578180059,-0.28804308614446206,-0.12874989598973596,-0.45756090064134525,-0.20758301664406353,0.0018551569662570433,-0.16864299921111092,0.23642193179931836,-0.17674919467517647,0.04074393238334806,-0.0004744757682964007,0.37157532790471315,-0.2514542760997369,0.04078867562969424,0.21108317244075492,-0.34393777656337554,0.22462622118813313,-0.0028825304285668985,0.13568295917441753,-0.11195309619580418,0.255344348756406,-0.21962864490187406,0.12682121367090704,-0.22752378536722384,-0.20166791284987928,0.3229669898310952,0.2765240971625522,-0.05012375826530069,-0.45958065618088906,0.03132150854331606,0.3885067057842715,0.17793670959889063,-0.35158755702321387,-0.4448417673599807,-0.3671790822308947,0.44687950765405837,-0.22969161230074864,0.37581518299327565,-0.10330780437944842,0.07173988490891925,0.0050374426698656105,0.36371102319168824,0.08450776648441227,-0.189369668425464,0.15531884111824334,0.29373036287550836,-0.04360045178576688,-0.4743007659634133,-0.2570919410314976,-0.20324761888814713,-0.17878198594712202,0.29447010455324163,0.3286356117636453,0.4246954477032596,-0.4530505457004319,-0.23786086953889307,0.1414569610604537,-0.4528636088666207,-0.08925911419035182,-0.007931714046565785,-0.35156210353542017,0.01858214151235571,-0.3136297986470995,-0.2762791982445152,-0.3368779110614315,-0.39371494108973515,0.23377287115486456,0.1821655089963663,0.4934013007253648,-0.2950960652895722,-0.2655405743947825,-0.16149008868195747,-0.36977299869137603,0.33333226911453506,0.11213251588519801,0.32507535593836057,-0.365313696045344,-0.4624692998914317,0.3644294094166307,-0.29314278956002204,-0.1769573213084652,-0.23482036680276797,0.04836692694864331,0.0901872238835193,-0.47310496296755655,-0.4169088187928798,-0.3229566209783927,0.15742059412518317,0.024450046281629945,0.46060138239271997,0.13861917956543302,0.024743928125281256,-0.11297424189931049,-0.42568562418212075,0.37502838605133815,0.4123713253903749,-0.005132481438137715,-0.4967823494310297,0.016570911427962853,-0.16063908716683728,0.43352331626463125,0.43008163888045603,-0.01982600018249281,-0.28294108447005484,-0.21149107685246515,0.13766805820921668,-0.3128556139975156,0.27986686918459047,-0.30415880895653236,-0.45435458535435336,-0.2987202804454405,-0.05757024239124919,0.440342452208921,0.47043488058582406,-0.4937821122560173,0.3793371252030975,0.43623954077471727,0.34931230097224875,-0.47167330915803407,-0.37516661763691106,0.32995899438303566,-0.059583589313349394,0.4695485070687153,-0.31250030041413357,-0.32633137960735903,0.3193425887544963,0.15819419114846678,0.3113650709825171,-0.46145604466362755,0.014063006731813488,0.259558888957115,0.2738327514299419,-0.4801140235595014,-0.2249680046391802,0.3061448385239942,0.210653445238147,-0.2780213966046976,-0.4080608645326629,-0.16817278124202684,0.38401210913738115,-0.01278396630418066,0.47362977198159073,0.2846981371905817,0.3372041044932561,-0.24939093809896118,0.2074474816400289,-0.24920746158279972,0.03481352597735721,-0.2879510312107929,-0.12198084907637008,-0.07832231897384956,0.46076934693226734,-0.1943724029956586,-0.11550411600545951,0.30216526114666387,0.40905070108910024,-0.47546698421644584,-0.25314087208477143,-0.19296287111057375,-0.4301698380176835,-0.23495111729209706,0.4368143010671248,0.4651111528730516,0.4077564845862556,-0.27273428140920464,-0.3927035258895293,0.37258464446621664,0.14197468602066987,0.12159133898991548,-0.10244121268120976,0.16460024447030963,-0.34278741852434713,-0.13479290179424464,-0.15094725829730193,0.28952706250612703,-0.12177005319984469,-0.06643821960919172,-0.36676878328287765,-0.3436480237885984,0.07416314263666024,0.46195036843478143,0.49767019426181425,0.37836290011278306,-0.03532479236089947,0.03561374618691526,-0.3847453201233555,-0.15701176346730383,0.10549016193353,0.29623334953620906,0.184675949494028,0.07797879660936369,-0.4249447228726819,-0.21742613986064874,0.24755818529043117,-0.47194738379304635,-0.42987703354413886,0.26042087078118326,-0.20469843859031522,0.4602222703191916,0.25233185186325957,-0.1784260684740515,0.31097819116262415,-0.21189905699961176,-0.10987107859800194,-0.26313369268202536,-0.030582774159870985,-0.107896527924908,-0.37484599377186445,-0.23358278455728199,0.10851972673016275,0.057649096068945305,0.4916157328923345,0.06741411839778211,0.10393403334615336,0.30480620876703113,0.13928852675075576,-0.47432253333813756,-0.2864397452373919,-0.36869002382477545,-0.4810741437568169,0.17882024508648775,0.29365830321539366,-0.029951777569309668,-0.3762638480511076,0.44120441850287184,0.0365827987631786,-0.4074034194435816,-0.40459995649399527,0.05382996541464258,-0.11627311108643523,-0.26047675836206485,0.26321126066299105,-0.007473446693873953,0.020188025929074316,0.38087114304950154,-0.08549848906639523,0.17841626801007116,-0.2191031561156267,-0.2073983333387721,-0.14397644007416655,0.42503870789298914,0.4431921448156664,-0.3521899288122128,-0.49566453391162146,0.19760678052285363,-0.03871363861139265,-0.29738989885842404,0.04288180778770867,0.06151422594817535,0.1390794714223964,0.4258990003691663,0.01875299608112546,0.17544061815556233,-0.19413552268177625,-0.38904441267468415,0.43147994245112,0.12497470966287705,0.03211644063513597,0.3762634353411143,-0.13242236334781032,0.3013327533582788,-0.05224056812611089,0.035556047112308864,0.047523369690907646,0.3586490543520098,-0.32909089056765994,-0.476885156377447,0.26715012568722174,0.07003867756393412,0.1294183241438689,-0.4109250182727746,0.29996532016713373,0.08251965195731104,0.03894672066621663,0.3355740796690696,0.0005306068417076926,-0.3811501316637609,-0.16939449015810948,0.22151943773255178,0.23382505209805604,0.3227114725212781,-0.3383514567501331,0.4174721524362599,0.49974570330302037,-0.21605505883127396,-0.32469757765558915,-0.4802200204984233,-0.21424972097747497,0.2740102875979651,0.04622636142775316,0.4442286048732804,0.4031714557946706,-0.1951906242372592,0.30006889315174967,-0.279515550215121,-0.46273268060451156,-0.04019838308643875,-0.36731029473612864,0.06311809148565128,0.38427254320150506,-0.3218676545663244,-0.0980033606825721,0.14744009482475784,0.22214287435594038,-0.1180152256425464,0.4385342265857153,-0.22086912704459372,0.3242457515189332,0.41730821591106504,0.2618355367492273,0.36046908106156095,-0.3869215058463793,0.33464750743078553,0.31589792390049554,0.4233926883642749,-0.3951881050554469,0.12572119337073873,0.3429505347144155,-0.12506894552974024,0.3760256916082467,-0.17954255738217362,-0.0760172250680482,-0.14065894972974524,-0.3701803591454811,-0.04157425767330758,0.20311663220512122,0.414401304109868,0.16331307022859387,-0.40585842534842875,0.04843917122091912,0.4299071531941281,-0.23749210828932177,0.19246985459412214,0.3610212346417343,0.21223246820763486,0.39179708557299553,-0.49372788503847453,0.3248909937110671,0.256099717663943,0.403036446675479,0.3354631749769046,-0.4754615786062,-0.3779036073783062,0.08054843540359946,0.12485117217518349,0.1574340909562455,0.14046722523447586,0.13384998816292248,-0.3409410931350818,0.49776988356357066,-0.2447068478039458,0.0530377219994882,0.3385378054973882,0.048409055432829584,0.40259041291440645,-0.4769666716325176,-0.4744889830351633,-0.17098907358797177,-0.4849703599857229,-0.04664769727997076,-0.2442841940888203,-0.49425002793721373,-0.33480769376138175,-0.4663354443800709,-0.054958710572669656,0.4352055406725779,-0.050084363390654696,-0.030306968062232098,0.12027327022265344,-0.17143945766581847,0.2592096648954274,-0.22117444475607484,-0.31213050622947347,0.05517678597253495,0.32681262023984514,-0.23619457389138154,0.03744982660188789,0.07713400730621256,-0.22267230608805821,-0.1522830821790926,-0.4812023232475835,0.05407419985889583,0.191438670604122,0.3604239172900139,-0.31030216048729287,-0.3938750908548099,0.22829512297559362,-0.429709177130851,-0.18297769172642253,0.17561405981462275,0.23942674099184558,-0.4918265417072627,0.015124097605816678,0.296584121387226,-0.1194700865043603,-0.43764804121127243,0.3516129937562118,-0.40153986271307085,-0.21756150029580756,0.013167497678067352,0.2931076366654639,-0.04601547927468541,-0.22640987295718618,-0.39169419974975295,0.17255806428725484,0.25461478715019203,0.22569722255546076,0.15022985119593635,-0.2537140614325235,0.05656164934951602,-0.28489203411039665,0.10467385845071298,0.04881094043192169,-0.4268798195580459,-0.32790625049452493,0.16135762542276244,-0.29391675167190345,0.02472818265867094,0.41097568175527477,-0.39811515716922674,0.07080830246148118,-0.46301317291537525,-0.010777983537551883,-0.14813608674679424,-0.26609366744482554,-0.003607709593794084,0.31829252092090665,0.056790329928597894,-0.2770938278910302,0.01215544927741341,0.10445981847883368,-0.13073753442766556,-0.13316690513060592,-0.3798484658108128,0.43619407906822527,-0.49361359330290866,0.13349738098543784,0.3569302953866049,-0.38684108436078635,-0.22145576248987453,0.4753417584971267,0.4077635733163367,0.32161369118944405,0.38048388834359304,-0.1137515652750567,-0.31187598294681873,0.06972723888638677,0.37608048058614885,-0.3502201422275344,-0.4997832788164127,0.47224663613694773,0.20390129339491736,0.3743309753421531,0.4907022634269107,-0.1263164481111556,0.37323565390343005,0.18058649043778985,-0.4204004412337856,-0.3198529488901576,-0.020268662982704688,0.20897968631509678,-0.04548403764259357,-0.08291193669048669,-0.4450820715937809,-0.4462225098374566,0.007474375064791872,0.4560107467897998,-0.2446687410910131,-0.2534976469043768,0.2765281688516834,-0.08935316824706341,0.2789358335042573,0.31469012138588415,-0.43875737510459945,0.009113515887980483,-0.4815660740752299,-0.28040650183192706,0.27597461817008484,0.3592258573562901,0.3393870909104548,-0.28383798855121367,0.4579651526911437,0.35755680797293077,-0.05710499090793064,0.4119081909227942,-0.2607946820837219,0.09584323957375784,-0.22042180024574165,-0.23194756383740667,-0.47197512343580694,-0.48424541074067906,0.23454355099651392,0.41478347789048375,-0.07837367829041009,-0.07949617604741643,0.191684542808932,-0.002370220442588833,-0.2000232386155516,0.4351831425137145,-0.22275810811861518,-0.2300957154359231,0.28096220639520464,0.28301326918797565,-0.29189715148934114,-0.3227795731051102,0.44046612362790927,-0.0058209592462286075,-0.07603118218441551,0.4722848867432494,-0.3728637468632463,-0.311524084495743,0.33135410514403696,0.0557430954440552,0.37308409975450507,-0.27025404787930407,-0.4161280905775355,0.23915997451820048,-0.09438374988539544,-0.04951701651999407,-0.3607762868031703,0.26878469738364585,0.4589430933027068,-0.23115619951007127,-0.045839553156493906,0.16314825080255901,-0.19995835714035204,-0.2555943793888973,-0.0062080377515052465,0.013095783583472631,-0.25034310921813385,0.05050541856456214,-0.4431812912958193,0.21862179201272403,0.4191278246464638,0.3805971570852025,0.04212763386197094,-0.3063727355551287,0.3933644466929651,-0.002100863229340222,0.46920887107065745,-0.2561731938936209,0.16402292022610698,-0.36534605889695904,0.17099921064988655,-0.0029882007309789405,0.45817157536712183,-0.45731086010046074,0.2771205451350127,-0.3904546934830633,0.4949954081035286,0.21705838614340212,0.19314051140073984,0.43182749607853466,0.18882120614789333,0.4252307312712291,-0.20702192624936266,0.07067853283647496,0.4932163251663231,-0.3716338022093615,-0.049261946000693335,-0.24529344681218168,-0.29796355908910854,0.1646913345587513,0.15953527321008276,0.2667080355520399,-0.4360933173037753,-0.000645255186286775,0.21678410939754578,0.24945401777945064,0.2550971007129843,-0.41819479955339567,-0.08588565919646962,-0.10870054084174519,0.3015361926901845,-0.026021283432004605,-0.24657910635027225,0.241037727390788,0.39933431631715566,-0.1890704995710406,-0.3705846218921045,-0.38812545316657143,-0.4505997046245769,0.33583655575122817,-0.33053742870850766,0.10641003548799177,0.06574058410867956,-0.374367767960053,-0.1879739814521646,0.3377110896798692,0.07271399970542292,0.4105971322409052,0.020261704291490767,-0.4495241806190611,-0.19658112592342292,0.4771822047548524,0.48452010939674595,-0.28991293233829407,0.2945801529895451,0.37284304426594206,-0.016628888744554704,-0.4392870178787478,-0.45557352582076627,-0.3619535757573258,-0.33544651874709586,-0.16035395067899416,0.3703437808000798,-0.15619824830409068,-0.2038661198118088,-0.3524912627978636,0.38499612247456905,0.1933343120717883,0.008502520797386337,-0.03682370521035638,-0.26434996352446527,0.26639863658477414,-0.12191093692213495,0.0005785648543490396,-0.04100747183954678,-0.08995357706520823,0.21404395393148556,-0.2185397891558596,-0.07875972795810626,0.021625019367532472,-0.21742018731867296,0.07803515789581716,-0.4268597027009484,0.41772428364158753,0.30870576521948534,-0.35822858728839857,0.2635027355422703,-0.08258541764138538,0.21720193624152406,0.005817850949976666,0.14262372833602632,0.07312610415343612,-0.1279922097956745,0.44862331468383587,-0.2142878896152105,-0.2763940499790929,0.15497200845869363,0.38668260800934107,0.3777465556542625,-0.2516548076632594,-0.006196454580088551,-0.24713225199278788,-0.03872938531501191,0.3898761371291899,-0.43162152357490413,-0.07660283297402959,-0.41337688017830376,0.029729351915859903,-0.3738258536400567,0.3422013465437719,0.1459256818439003,0.31316056700070294,0.3109448606508427,0.21810803495098496,-0.41669016478989973,-0.007323751153167413,-0.009497804637698337,-0.46241304822234697,-0.42071705461596065,-0.19160254161871837,0.21947216035574946,0.08389804162448344,0.003952095312007797,-0.4040072055068582,-0.10579045107145535,-0.45055649751401683,0.3115670636063901,-0.08561513370974971,-0.08193149149283907,0.04434628117547468,-0.24060695953966627,0.14094010878470709,0.025040415421700546,-0.36672366625369257,-0.13494926849515942,0.08795517194191693,0.18029729080280377,-0.31096705334465446,0.01958854046893288,0.03593230522656321,-0.3335014493547366,-0.3907674814177913,-0.34741390232755376,0.43550242707788067,-0.11549394540533964,-0.2584387251781992,0.36980106601534457,0.408099692504055,-0.38069556168885255,-0.4625437965198911,0.34224347936920463,-0.4454553783346473,-0.1525638178638602,-0.34717559831075073,0.45879965790200616,0.11442497097714655,-0.4169283451609329,0.2165583439905765,-0.4126256519935374,-0.48411795759730647,-0.052693335929088425,0.37579755633284595,-0.4807082955366022,0.29584977502378185,0.36602708996823563,-0.34990865169144403,0.4376600124468317,0.03310159058782447,0.17238837098345727,0.1488398297821838,-0.05797899831930198,-0.1500636351880955,-0.10015642586062401,-0.03019904690009456,0.21212334842655545,-0.4957270374655409,-0.16074747718263538,-0.1323185914094127,0.06618617222098999,-0.10417157981897351,0.0890013104010825,-0.3653182937166586,-0.2512559135465229,0.45623794302008847,-0.22412681868715656,0.08046892653413495,-0.35194216328099515,-0.2169538806924982,-0.2656597878829019,-0.18975189692830674,-0.4200767163742205,-0.3282317377647932,0.30960259104037324,0.47607698173075663,-0.450197856245681,-0.3696392098198584,-0.16837985190352156,0.23756509892969624,-0.3928032290969725,0.21118492473511163,0.042869879748726136,0.1296371648374166,0.1473301957426265,0.37495082826354986,0.06550125239802185,0.04208103101584548,0.02026676524924076,0.42842939213668485,0.03590424305618578,0.15068400881419564,0.035787258129008626,-0.2441406993362223,-0.31259889889463865,0.22857439377174282,-0.04632619359917878,0.03756428521595301,-0.060870249388350395,0.2967932142261569,0.44986779348907047,0.1421801974050172,-0.03475661577497546,0.19262942707201614,-0.11909810277617638,-0.015202509739371095,-0.07151690010982636,-0.08378906954268861,0.38037969478518874,-0.023723068779015533,0.0781428930849164,-0.11984162093957385,0.2489433139696735,-0.05084151968325212,0.26878254629518605,0.08229122921063725,-0.1780939969744333,-0.2661424292904506,0.03982660121647452,-0.019734436548233925,-0.31633846576821,-0.418737761307014,-0.11075230713465567,-0.1187883014654949,0.2240528675032023,-0.36682853470987564,-0.1403814490069386,-0.164840811328133,0.14953268112074358,-0.41505311981116577,-0.15286677405018345,0.1042611771542794,0.05319477044341392,-0.04571982076204839,0.26359190260348186,-0.13653905961133872,0.019581993545658483,0.07956583968321751,-0.18681162152382513,0.4886740041430129,0.24373098642438173,-0.1529417694855686,0.10886856657270583,-0.4513267848419069,-0.3518766539229181,0.037477873895885194,-0.11004568882606325,0.08003651099145337,-0.1567531611343893,0.42722083900153573,0.28512698441573825,0.3073265151268507,0.4686391512214996,0.4017460464076308,-0.1616343185253517,-0.489916171288612,0.4610043359169438,-0.3776877264627718,0.09279760510073021,0.48379834377207676,0.29910612118789026,0.38359671704129084,0.1754440888893214,0.2760759046152388,-0.12157346627657639,-0.2696344912105928,-0.1490490332713601,-0.47827697371491285,0.05003878950944052,-0.2518686124166609,-0.19291842124961311,-0.3680015651477839,0.43544173753778637,-0.17667320524457653,0.11677575979620358,0.4522720543109098,0.38715438117119927,-0.4712164151396854,0.40462572062493196,-0.07048677127948255,0.08772776938877702,-0.33143681579979734,-0.31967671234750283,-0.0319749682403665,0.39965217984167256,-0.1853200195402882,-0.11009518171697974,0.11484293889549035,0.3390225433618146,0.32077075227541463,0.24893120902288968,0.3893771574935745,0.15088606012329642,-0.30046667706359,-0.25953336466734545,0.10062697223802552,-0.047180187425547526,-0.32779537437941086,0.44153081284468865,-0.061429950083312646,0.06953288341183494,-0.4171508514456006,0.2715704020157723,0.013052751537113716,-0.07444435873704003,-0.15949108417875224,-0.2918498076670193,0.05829096356940133,0.07413352925432726,-0.25731161590073537,-0.25625965689563834,0.3669933293175738,0.32244546301843524,-0.25492231798675435,-0.09500522717848225,-0.10739036679905123,0.23703154929842585,-0.15122529815720265,-0.3952062888147738,0.24693817462634615,0.07737177982965004,0.1543211868982559,0.20015838114802365,0.4533592501363064,0.14540369906800743,0.4835879730310395,-0.4583906755698297,-0.3717435473064765,-0.2751599865241059,-0.41343013965264297,-0.033810811995549805,0.1433268209985532,-0.10701483604929485,-0.23867481029807647,0.4101649259796365,0.41553618472154263,0.41697886946431284,-0.18041592650103677,0.003129585775144772,0.4251771015002819,-0.41459010076319736,-0.30996765498469214,0.4709085465450342,0.2693375859464777,-0.4442154224735695,0.449166957443887,-0.44572070258615226,-0.36861123485040714,-0.0643817020695201,0.47156746768020597,0.4400161143169372,0.3215597507608585,-0.046985028584934696,-0.17648881183512577,-0.3695463538796433,0.47969417879247356,0.36072255227375427,0.26928049356545025,-0.300273257715975,-0.17196983177007663,0.40259820177073835,0.4787377422187149,-0.3826441219699255,0.45161833966752596,-0.4171892478603947,0.2370686132968498,-0.07503524802808115,-0.4447787657394855,0.33428571320012357,0.4849338993829162,-0.37378528005388434,0.4193152646694851,-0.15067674427962907,-0.23236309818159895,0.004011723288530389,-0.22220417602395015,-0.24714940996589618,-0.2700850383556397,-0.4438298993787091,0.48443174103538866,0.20836761758456812,-0.15052880925602685,0.048122767650489395,0.013926706759042506,-0.2059395399918169,0.05612293729596107,0.04303472331171343,0.3206848054432565,-0.34401958910181873,0.07443279360309751,-0.2083032482587437,0.10933169815633281,0.36194220804747945,0.0694348413862218,-0.10513101736690533,-0.2854680752215768,-0.09469983221748013,-0.3039925034354596,0.3197145545874911,-0.4997851530469739,-0.3088545339829829,-0.3205713033692368,0.3980879519278122,0.28090567573541403,-0.46535786941678947,0.3710622592300996,-0.2410217931072811,0.45544612543946106,-0.2867195001934588,0.3202797805505875,-0.2500750994450145,-0.3946298089554414,-0.03787018218760907,-0.22866222507652734,0.24900615605724896,-0.02118265078400272,0.23362378534432926,-0.43625997957560547,-0.21801076428797161,0.34458221311545434,0.2988684229317571,0.12617891187649244,-0.3047461319667557,0.1932115807279251,0.3138831738298724,-0.011134424637477158,-0.36009726719474644,-0.3907283749215338,-0.039650004226795765,-0.46075461751050706,0.04556906282850437,0.18827621144787243,-0.017400638479670993,-0.47333458597436784,0.3049788256457959,0.4176642620976012,-0.008167707956464376,0.2633569390993469,0.40709545461727714,-0.2847037032908375,0.1843180491372789,-0.41991947926689743,-0.3055757781906585,-0.20973287939193264,0.38739264646521465,0.053138098365340225,-0.2065218848669761,0.21926617416842809,-0.27802824019234595,-0.14798180288165597,-0.04694232606880622,-0.027308560443644714,0.44949545127390356,-0.13273631260648688,0.16779956137868446,-0.027104118812154798,-0.0920743259238872,0.48765237731748234,-0.016820150890626717,-0.26141959139147786,-0.4478615499538581,0.24477330649068807,-0.469361006531422,-0.35250990479157185,-0.12576080312171456,0.14641713162333825,0.4937516336773997,0.15003976031320665,0.4936235975578822,0.09383072842025864,0.4929850722123368,0.2841361587434623,0.20446083639505463,0.4634552815393973,0.1686126666332779,-0.37809770197267745,0.3275802127475631,0.3249221423696407,0.3063995338612795,-0.4999995044535104,0.30861488467111586,-0.4984381351688596,0.02021940124676025,0.4955826290442995,0.3465401380068689,-0.07035837374062237,0.4673135964291757,-0.2581289076550015,0.040012706845248935,-0.20618506862694064,0.22396744971396187,0.12713515496828154,0.41643436806214584,0.011702704188768065,0.006157346289045185,0.25803577556620105,-0.3873358489472123,0.14006510557050733,-0.29169765090769384,0.04151543692742954,-0.35285799916001426,0.3841947571050386,0.2998253680325802,0.2613990328774951,-0.26360733846955475,0.31751588094912764,0.09413828896303555,-0.38955182010862477,-0.26004328505927155,0.03456835918225787,0.45557721715843735,-0.10753230241350442,0.3016237076392856,-0.0968161793883957,-0.08155472989282186,-0.49204174866133554,-0.22372796151040353,0.47917567824073526,0.28324073168527475,0.4195305295850029,-0.4768807928039551,0.39742919165656665,-0.45209731741958636,0.14198313802276585,0.4152783827055453,0.4756607060165139,0.05127299504924765,0.16232539278784297,-0.16079902743678565,-0.21908526986999743,0.47130802565659313,0.49818833412529906,-0.14350994030102937,-0.22992072668645025,-0.14430355660896232,-0.23025462317458878,0.41432338039448124,-0.49971702896572645,0.04482638627521873,0.3465070315185157,0.4249407055846164,-0.33509895443524806,-0.09441309478669146,-0.006192811025867329,0.025376653051464748,0.13866055737998528,-0.34599536193508196,-0.3113245397503035,0.1024114269642824,0.13101608518664043,0.4397346557382811,-0.2636046480114205,-0.3435907610046993,0.04697245031113839,-0.11586814956222025,-0.011546622076167301,-0.38707497088753096,-0.3017165653042695,0.046410117046362886,0.019093701651286654,0.4955915819590997,-0.05603538721358259,0.08558930942559284,-0.3411768779502895,-0.4235125019320438,0.19440791363527676,-0.20812709555953712,0.24400770984944753,0.13603979705287927,0.15305778176551854,0.3990908678968963,-0.030310118134146524,-0.3406138552235012,-0.2979640849866445,0.3722667816281586,0.351656393974056,-0.33808551863559977,-0.2620273644290372,-0.2219036870672022,-0.4692919050425155,0.33055635407417294,0.2077312031558194,-0.36839077679762,0.20557015400674006,0.4294885942136146,0.15290129045869527,-0.059392308650749515,-0.30200735329684125,0.4519162574184066,-0.14389268475909645,0.4495935941014799,-0.05016148568480494,-0.06182258444014299,-0.49303330494748554,-0.26388299867088105,-0.032358810420031636,-0.38203776588380167,0.029859098767891057,0.2236112620236137,0.024566387001731416,-0.21028061375704543,-0.4224896445491091,0.160877149918081,0.21873283459779103,0.11216328810655485,-0.20146087138071067,0.42067414657288715,0.2673304057642807,-0.14059214121116925,0.06173844125037897,0.13288969176852095,0.06878634852087506,-0.3807987036225351,0.24093942774724564,-0.36964347442234713,-0.2885198417518522,0.48546119713695335,-0.2787222886143743,0.3908155124555306,-0.35863685879491936,-0.4333639020798399,-0.21766601038177957,-0.4780725105319903,-0.35419851452202367,-0.15392027159234067,0.011520653918373203,0.18040261558288262,0.39484035212576307,0.3339285487598431,0.11679407304087697,0.009404775550598599,-0.29813174822671273,0.2542610055923167,-0.1538754821835795,-0.29092951073257023,0.27484827818472635,0.4136231830270727,-0.4925474662675282,-0.03282188775677586,-0.4423339442906091,0.3440553704944058,-0.06579030084747184,0.0033026436783993862,-0.09841160629862444,0.11415674080681648,-0.14238988708811418,0.3831610836549155,-0.24907304045972478,0.189241324703596,-0.3647041583799595,-0.277641203257605,-0.05700114524863187,-0.09934644711275831,0.11704556187034254,-0.4197177481668277,-0.4584680950835336,-0.301191287043747,-0.0467928566707394,0.3844188051588229,-0.4204294376312987,0.050279892844096175,0.3258317026711661,-0.3714072230972907,-0.0023830289879813726,0.10633861541762646,0.030602734662005693,0.14845529773121058,0.1050302013117328,0.0833307736842479,0.1867047926190868,0.39871641053796236,0.16586387171034844,0.24809681863838873,0.3002864501281268,-0.24388269436891807,-0.2640347700500456,0.1866805892500456,0.02248242347508933,0.2337649593493587,-0.3765747441447549,-0.39150729512210125,0.053269540779695035,-0.17646230830380105,-0.30035455713848425,-0.12114205880600193,0.41443345596140113,-0.035785740993190984,0.38550219812179387,-0.07052496567124078,0.19731099159621235,0.08103140261241193,0.18087484076189586,-0.4038801298468011,-0.44409517700736645,-0.3628493072609049,0.19878019070654185,0.4612304541757506,0.15238014004195288,0.2651070755207361,-0.18160246132202107,-0.46494085922227124,-0.28040768662277005,0.24589758255238903,0.34232426577897623,-0.09948710142834849,-0.4207429186971128,-0.47084618900989494,-0.4644217035444784,0.23829067742879184,0.13547239632066788,-0.33202472002403094,-0.24499271942879286,0.35747355815334214,-0.23132859631589797,-0.004602261819837583,-0.15844388280458177,-0.28754485014583153,0.3907096758552788,0.31609448339598467,0.09333739577261246,0.10514313693223465,-0.4170395436462351,0.047805613488000054,-0.3670279643044383,-0.4138393034269463,-0.1968059928110386,-0.26796356744239036,-0.22463886238246977,0.49208291113636293,0.2482738490254397,-0.10597830109112594,-0.016859030807993447,0.09852608580883215,-0.4155093356683852,-0.3526637054228283,0.319972045200382,-0.3611282448732387,-0.046615459743132304,0.28573292851281407,-0.15996193025083172,0.17968995121190168,-0.004142403429292951,-0.11052359714192184,-0.11975491763754809,0.4209138560434911,-0.21721223191697314,0.1880967377601097,-0.10178625844886424,0.32863364178818544,0.48496439718497486,0.14725316148094758,-0.42181698532609846,-0.20724406872626489,0.24726426878695618,0.2140711593183764,0.3464763478241777,0.1275996544312359,-0.27102099423447634,-0.32388766269135627,0.30835798893980915,0.357582215782122,-0.43301041794061934,-0.0702797284022143,-0.36420757764084355,0.21768367834450553,-0.2942644362167084,-0.07421637572841067,-0.2999146790225722,0.302631589562971,-0.26872120646502395,0.2996022289380562,0.410443735319862,0.22944034120381906,-0.42674131550646255,-0.2543604723640043,0.23791103477840947,-0.45787315692306074,-0.2947466434582593,-0.26701764820697993,0.09999408123494424,0.07434981535516472,-0.4566553425287343,-0.17452594363114593,-0.48255362797864465,0.2757552802605052,0.41431128491054214,0.23904237603404788,0.4427959884698278,-0.24036270795639014,0.1232352351775774,-0.33518766194007044,-0.05048537953503507,-0.37178121893394667,-0.3317651290564543,-0.001992242163589175,0.11665143680996137,-0.4621100713972677,-0.4231118679528958,-0.08488388906414568,0.1267698574364191,0.18145472326260204,-0.3246191764962014,-0.49927562163326833,0.05644880125624541,-0.1896438877876503,0.4185854987616018,0.13751361864936484,-0.43297440073907967,-0.2728800636755939,-0.24462951137517264,0.3544468231186497,-0.12473274325947492,0.1892438283202802,-0.39018823672077896,0.011672221492654566,0.02087807074102299,0.14661361207381884,-0.4631796520967226,-0.07663370911931855,-0.3777474740120612,-0.3016485299176983,0.46536525005223206,-0.4338664133753256,0.39507005983226806,-0.27498802322486937,0.39556046438031234,-0.22361922011808244,0.030481041865956238,0.07303981862765774,-0.40773716948083827,0.024715816508301902,-0.07824946671595545,-0.39044758918237465,0.26601411121409324,-0.06636403781528966,-0.10871955916118803,-0.4853713709731693,0.3070555726404425,0.28938033474333746,-0.08371020339600399,-0.10066370136001201,0.32099882998602514,-0.22877437882767726,-0.42576344005278166,0.2740544954872941,-0.37943853606037514,0.0398304421626654,-0.16104859628550372,0.19687837674778907,0.11970903455055404,0.2138100372441889,0.21858551388613878,-0.38825030524502413,-0.3801813692174991,-0.46707153462932416,-0.22266792995333584,0.06404628465074991,0.06157487310947052,-0.3050837337596062,-0.384125036160496,-0.12507015764526686,-0.13604892617692532,-0.2684195476128479,0.2612885582678748,-0.269624478586735,0.06793797097594978,0.002802651599671524,0.08153307731134252,-0.2662101707906048,-0.041264765870511644,0.48285628602698205,-0.1349777616861021,-0.35761789013108625,0.05016572427445132,-0.21798700103668667,0.11540405993477298,0.4306522246886786,-0.42564627534917676,0.11493293031137197,-0.04792764444801656,-0.43965685482433847,-0.3564656469161076,-0.3296710934313425,0.04372737636121804,-0.18271587967378666,0.1390714168100493,-0.47497246377997926,0.2219792776366314,0.20253855389446107,-0.4987729523884872,-0.0033743929082992175,-0.2567140793596656,-0.3918855555780354,0.27208167607220024,0.08241694143115397,0.17675412926878664,-0.11027852251681858,0.21966025024320301,0.1880911146474844,0.1020408055134232,-0.346606070738245,-0.49012087335090393,0.2712777183789157,-0.0885735758230477,-0.09653355510457517,0.25295366690202603,0.17703060350610378,-0.4336532547551981,-0.15183672890641975,-0.4745481780382994,-0.3539587990417914,-0.05075312470288784,-0.17560034657653967,-0.4393374208739025,0.42219453256780093,-0.209729953246524,-0.45388906403432894,0.1606614755630038,-0.171099434815281,0.35500510647555483,0.19584677212205048,-0.44927794140447475,-0.2192193848660875,-0.15713864017064116,0.2565924331530811,-0.4420845252198513,0.006181950859098118,0.4487061838969424,0.11572890608781261,-0.16241934872070818,0.36444945464647516,-0.2320273941998816,-0.21792350181862474,0.34447266784421426,0.08316828988726765,0.18321451422155577,-0.18315083296984191,-0.49406330570937196,0.4338308687322592,-0.07473798898872208,-0.009796435702106754,0.23288052948787974,-0.15006410130852066,0.19362689934850974,0.28737393678262313,-0.11579056157378731,0.38246385446972986,0.10406763473953995,-0.11103953886032225,0.3707248661184781,-0.12444315951842522,0.48062617265562735,0.32232897144319517,0.08311856261193684,-0.22147176458534124,0.09784759747537541,0.19742673017001366,0.26412112879875815,-0.2814754861100066,-0.30647563016768165,0.09850631518836073,0.08508779771525488,0.21064984878407533,-0.11395508054108072,0.4567220659501323,-0.05635360324490368,-0.11148314717641772,-0.22711977353774326,0.32549683664847007,-0.04825701140824701,0.07604432130465688,-0.30229790609597496,-0.469410379756231,0.47958113193123997,0.489523223895054,-0.04964568822491633,0.3823775485427745,0.2583245751961667,0.17041237010353982,0.3054333715983166,-0.45683991178669836,-0.15204600542099755,0.25389396402300757,-0.33338872153542587,0.321300822632822,-0.03611037723952326,0.13592484342194378,0.1435959041778052,0.08353358420113177,-0.4482402616800143,0.13820235175060547,-0.052906205380390814,-0.4354015576227126,-0.29077615298662485,0.23569844861821654,0.34402918625687007,0.1477455944680861,-0.4061157798899988,-0.2726874236192576,0.18195348375592602,0.19128980385214867,-0.20863209365399293,-0.21332306253928834,-0.381702409033599,-0.41540223113679176,-0.1206712464282973,-0.3915814629282539,-0.2120153777093141,0.405069623915026,-0.17859617392836524,-0.4038839001279326,-0.049506835982482844,0.16226913855501923,0.373344573265892,-0.13729610512992818,-0.48192599865728214,-0.4837717200936458,-0.2879749489172012,-0.40328506290322497,-0.1842857481151905,0.2429237393306185,-0.08995510002586404,-0.23324112244152717,-0.42399178682135075,0.027369694644980846,0.08407390409874593,0.29265737000833836,0.06742611529166842,0.3347158226053806,0.27973938745983506,0.2954815628480951,0.33466601267234997,-0.04645656198156578,-0.4791741628415711,-0.4480946044969336,-0.4276381403789249,0.40488544371866486,-0.1928211150362682,0.24423288475473948,-0.4329717235205579,-0.48652292165915156,0.2921022898951866,0.17027187218861783,0.4539018308579863,0.21358784670838715,0.2562328878059821,0.37609457174434335,-0.19446344026057982,0.18778324708191674,0.09997732886054322,0.26494327975290544,-0.18074789133618907,-0.1851150079292716,-0.05316928706745205,-0.30286398530678627,-0.20611279294040918,0.27509697818305767,-0.2501035301423735,-0.4667476959687258,-0.20130857196018348,-0.0802524049197344,-0.03588554026398616,0.2950508370487219,0.09323716796071624,-0.3796360688231639,-0.3925466721565849,0.33101962315126876,0.13280555021147955,-0.2599195879215579,-0.3658494367635745,0.47194211087594473,0.3678368914914072,0.017640607906680206,-0.4645284921920576,-0.3065501854373145,0.49811541433663864,-0.321810553257202,0.0011544242172758512,0.4591024157796244,0.47607448474742364,-0.4724114833505848,0.1488427780433068,0.08704834675426909,0.1335837083605247,0.09636903421059584,0.3277508748778124,-0.15192205015079296,0.09953708624733149,-0.3474799255545611,0.20631768868043943,0.356956164580462,0.05100244727850156,-0.09440087742926262,-0.014789126298067723,-0.11800740508191576,-0.4926493959064342,0.29987260947647565,0.25383290802122493,-0.4838534890666526,-0.42699742062483526,-0.04312494397139566,-0.028108650157734782,0.4994061817653086,0.15516363636585417,0.09916540056165313,0.37616426600393993,-0.387274481338175,-0.21943710176297815,0.10296815478046462,0.1945963782235045,-0.1459473103483948,0.27079165159403007,0.1162592275621459,0.23540688730698633,-0.22245046840726102,-0.2149591364724417,-0.41925944851449715,0.024099144860855848,-0.2577296414489654,0.30091057142766453,0.1746096554662293,0.16785742700306705,-0.1958388110337761,0.41815712333034116,0.12445863440227067,-0.16740449674149183,0.21384920581960665,-0.43550235343778065,0.2374761561969565,-0.302436752359835,-0.43355722887108294,0.13429373927579302,-0.388027861560454,0.3894427822694877,0.46589699834254383,-0.18674208461929576,-0.3458460632992302,-0.003220104066974816,0.4661527542882091,-0.31980872748502764,-0.3774771044449232,0.0024982383678873177,0.31016391835541546,0.4469995189637068,0.07453413944338738,0.39297512297378123,-0.3262012733707984,0.46589410959657185,-0.1722000425695438,-0.3480264776752666,0.2694059732486236,0.07090869874693584,0.40063508590319796,-0.3870635787690906,0.10577959113534297,-0.31816844320242677,0.26174487103562716,-0.38799717073610807,0.39283434342269574,0.3186560300365422,0.3344379812780771,0.45633200009643304,-0.3996497125996128,0.4649695864646253,0.11785196330878378,-0.2850864344916908,-0.2267045758301287,-0.4970470967814562,0.2696731814793074,-0.4543504774227123,-0.13132025319257257,0.3407178659618346,-0.12892982515030216,-0.16543499156530017,-0.39963720154101723,0.4793940022726446,0.1918094352111268,-0.44656539202417966,0.007996360165181127,0.42495837070483744,-0.035009733362260986,-0.37961916843680843,-0.30356855160209606,0.3324113047853061,0.3255845201792913,-0.049815987252642246,-0.3194596160651939,-0.31549643442055775,0.32416754573866857,-0.20232474884383667,-0.23211499369916444,-0.4445953571170398,-0.43209214639937543,-0.09771853131155739,0.41460568260560593,0.1991812458993245,-0.2917277620023344,0.04786129791365146,0.2411056078896472,0.43326952807179286,0.09260242097265015,0.2290144075946905,0.2551002175726871,-0.0775920650027353,0.36261166716389237,0.22591656364488832,0.4013438916038994,0.031759700834048,0.3798794697395105,-0.09994868502735987,0.2831714364571196,-0.3835725524797773,0.3501907971804925,0.48132313582448005,-0.017817974053788932,0.061059601060353685,0.4546600264815799,-0.18751484955652487,-0.051833481958608374,0.0834416084127243,0.31846252176926115,0.30160862008486267,-0.4002693118248779,-0.47696317967310264,-0.16244246702848297,0.1531792299197159,0.34891508694586704,-0.25032208683097656,0.23401864724894206,-0.027148916982205673,-0.23633122755759106,0.2382035736642425,0.39549433642679444,0.07895727554162213,0.2478472915365264,0.1556509903069132,-0.1661554028258272,0.06466185657465617,0.33897986034180305,-0.2672941575966752,0.24942085880860643,-0.02267185598284449,-0.41459958551201237,0.16011482313747116,-0.3491770056673913,-0.2201863421479242,-0.48281788707864526,-0.12522398366649634,0.0633101356727348,-0.27217139074642427,-0.3324907196702429,0.4535814103108802,-0.1772366023666827,0.1302068957423792,-0.16309423480684404,0.37329457579582837,-0.05562750425336205,-0.3980671101131328,-0.3039796203027756,-0.18959878785671358,-0.24790931074877998,0.41886455550446033,-0.2651782598398347,-0.23392529851432298,0.1816530336851574,-0.0985219924779539,-0.14735462209500283,-0.22301052885725836,-0.347140350262799,-0.30825323462821275,-0.18046435013695517,-0.2470764481911143,0.13469455528121532,0.1338535587759151,-0.2490708095071188,-0.37473297498748814,0.4237261487673101,0.42771711193199935,-0.4366887091395657,-0.012083224505668566,0.337286106795484,-0.07560219737584495,0.1848057482601333,0.18685214404819273,-0.36366799844088793,-0.3997451187419023,-0.13018011200196633,0.16405699440130217,0.17679464909104348,0.10916524780435166,-0.3029678181758917,-0.39202079200233664,0.3256056171350723,0.1421258417856328,0.4567261444272699,0.1704163126645768,0.022267854955930755,0.17189356561302227,0.424283848073177,-0.17901877542634703,0.2629925421141608,-0.35869511374155216,0.4876287838102691,0.4629222750453572,0.0688345409771447,0.28899886700714084,0.12850678952512884,0.40240492754316626,-0.31684857563691415,0.0405467730742719,-0.14440802265219976,0.30498010653459007,0.11615907889617638,-0.09999105294392008,0.06137885551486377,-0.3263913752348504,0.3848399367820625,-0.06078546307119681,-0.20389064725189954,-0.3149175811092031,0.28135053766709817,0.07808423564888245,0.29108162924135095,-0.45644876591735284,-0.06321920840223716,-0.44590674087232673,-0.2152623634261317,-0.48249374576684967,0.3549346530423767,0.19779369545608505,0.1080493829681417,-0.4406036601271053,0.45313089213136104,0.004902085350690699,-0.3267163253111116,-0.39036954977874605,-0.1359724884002509,-0.12333718311571595,-0.3789998441594018,0.0056962661207899945,-0.2694718226476218,-0.10077291494576346,-0.0076711657284536106,-0.004106264307087715,-0.3439398381887224,-0.29904642034560824,-0.4658925293471545,-0.19660262386575833,-0.3527579136688952,-0.09419233331351418,-0.30096045811165495,-0.3191364686641518,0.4115164973320182,-0.05732075065479947,-0.16972459303175635,-0.1996437656582979,-0.10861533543289337,0.2579206958319702,0.07336287884117842,0.19860737267179895,-0.1159910318259465,0.4541757615561879,-0.2997185158581994,0.22756586882302665,0.400768395721393,-0.00748498054775637,-0.16709495165204435,0.22802715626090952,-0.3022272327605786,0.10252787053889412,-0.3996977036151852,0.4626824975547761,0.21596673258730337,0.3308969322679647,-0.4371368955486512,0.4845872542524414,0.09761387918700226,-0.420180472919508,-0.07270529910276369,0.46752708099492835,0.42286154038409296,-0.44560227328493784,-0.47280145687330544,-0.4888288450484135,0.02260189751071562,-0.2947241539535672,0.15683763781439786,-0.3747579300972692,-0.344169097005671,0.08529397982215015,0.4878073296589871,0.36036413569922066,-0.2676831766613854,-0.02651884582537334,-0.056762498600950506,-0.002875967228880949,0.3628384150435895,-0.20841345368685338,0.22906014408982678,-0.313715990020474,-0.45504330136968285,-0.18774794152689012,-0.2876681081922001,0.42885561816525497,-0.2053717752859232,-0.1754718852773145,-0.27402233421301303,-0.0017176455222458475,0.45961530425054553,-0.40520675595339894,0.19418643835404947,-0.42825356105418444,0.38949824258617394,0.0026646761931390373,0.1470076285548927,0.1712137252050654,0.4426523956869388,-0.16405161532836954,-0.38640546072883164,0.029207806428315886,0.29601437749555104,-0.18989338083027318,-0.17909878552583058,0.3248534870419195,0.08346685541724796,0.14867336655174013,-0.16643712216185658,0.19259959022122053,0.3310943667405528,-0.2852712934868822,0.271162723362822,0.4925253421759055,0.4641991095662745,0.4321754872234129,-0.4297340128925924,0.06459543708011739,-0.12997115170254658,0.17377721379502975,-0.2336524093269321,0.14244978875820524,-0.2185984421927194,-0.055430521522029874,-0.49617699272818494,0.1620147302993329,-0.15273884221670264,0.056330618882974415,0.048934191483074096,0.35690043088300727,0.3998335711027694,-0.46819982654727177,0.11618974443568097,-0.2769777815683556,0.3014420091657679,-0.030619544440574797,-0.00631407091454661,0.2597353996065943,-0.13527905552193187,0.03099019566717942,-0.28129262518884834,-0.1812987236008088,-0.4107681690594054,-0.4761757738390844,0.1833284090517049,-0.324413035236232,-0.39491333957243535,-0.3194576074825346,-0.4952856926381093,-0.1407263082315262,0.016162897288348743,-0.3419327553820577,0.4940709592073518,-0.2224945706201431,-0.12180983275877888,0.2814496717201862,0.23106525101182385,-0.11229151380572855,0.38773985986980897,-0.2287132633460851,-0.36390235756203526,-0.4906306060173564,-0.350082105004081,-0.07996466750665077,-0.21687618096392058,0.21034486387598528,-0.2247488746835673,-0.31075294420452604,0.10412306406711358,-0.1231097003456656,0.2427155534203831,0.08610474090577269,-0.38847261775047914,0.17129888380522185,-0.39132918327145205,0.1320618963445399,0.010894732888561354,-0.42371677851410516,-0.2847419283333563,0.14518208026382395,-0.26494043907932374,-0.18010962222152016,-0.3754375656953297,-0.40036491627175375,-0.08600773817795404,-0.10180745393519341,0.07377574888327776,0.2905525578494734,0.27856326247632657,-0.00986285818240118,-0.4167444960916409,0.03183630106954527,-0.43800249663944113,0.30603106828554183,-0.16440129210870436,-0.0956168878111574,0.17884549873794486,-0.09906359529788555,-0.4753726640617866,-0.4839236187310956,-0.15229782386974855,0.2609026561576777,-0.3969167972589396,-0.1354979556992182,-0.2816321494000411,0.2835025609969619,0.2075468867446868,-0.3210858445361289,-0.10183372015347048,-0.44714463047289565,-0.06280504004665644,0.2505621059472882,-0.4416425241264712,0.0007259524720188981,-0.020568719442690675,0.059396053287086525,0.1737831201998119,0.11409034844287347,-0.3197253884862643,0.09226006319428337,-0.09522150122880446,-0.16120596265913223,-0.34615229276729753,-0.06107533906617335,-0.3442076296813479,-0.34738617919519,0.18487813675351106,0.13457401269726477,-0.13615669165713795,0.13328145259786828,-0.02661504342581944,-0.3481421928749384,-0.3776555665937298,-0.11620178779500856,-0.10711271705480852,-0.3021288108174234,0.3768018035960712,0.32118679307717035,0.036329796788371116,-0.4963718975649811,-0.10102498638460178,0.40372887742277674,0.3633283563072338,0.03242259293408223,0.20166728667363576,0.19729970600438507,-0.17500674781403203,0.21750530735580198,0.37888522517332635,-0.44447926564804785,0.24091784334652244,0.04993752219030201,-0.21822941874274515,0.11111297649464613,-0.25204699352793836,-0.1440053957256353,0.17475142688750966,-0.16460804114627248,-0.45316589721552925,0.12913297757890496,0.2560293514742462,-0.27314019524763666,-0.41387396485554007,0.44337029295574837,0.17932786193956884,-0.21910810376521406,-0.40537388561554644,-0.16098108583151594,0.22422015052919875,0.0729109686839926,0.3500814040578739,0.31688100856164314,-0.025121347901407853,-0.12427547366059688,-0.33228358940013103,-0.06462006496508965,-0.3466363776048875,-0.20123547543114273,0.360385084639387,-0.07369567453723569,0.34011286192980683,0.3365614629547322,-0.43139630687887887,-0.042353159289604037,-0.010664925058834873,-0.38476774937013714,-0.4993899632102756,-0.4585774242873599,0.36729919587207016,-0.20538060709940043,-0.31487251849383613,-0.06724770508512634,-0.18728753865866699,0.38209825271667563,-0.3117192389965373,0.014062256241718751,-0.3905008747552645,0.3338326626797252,-0.11911952971352613,0.278791246583751,0.44048686150139527,0.360930799808717,0.2410616767370486,-0.13926478498388972,0.11473428567663824,0.09753997141022075,0.1845197532883862,0.345770490391748,0.028702545299976068,0.27785119555727,0.24441267530926747,-0.34852005563690547,-0.48551061564346876,-0.07888989428559467,-0.49811025168754797,-0.04652404318210901,-0.20386082956236273,-0.232659025401859,0.2678833664384077,-0.16503604219049128,-0.02718476022638794,-0.395081150773535,0.16196974758281435,-0.1775005020578706,0.24492641784002922,-0.39066790584050914,0.4194495342032263,-0.0757684500401632,0.07253786609336488,0.15648994055100296,0.35594212938114356,-0.3456285490643187,-0.45411131473048094,0.13622575684555982,-0.45951761049810447,-0.3742004408738435,-0.3827028899441953,0.47664273366184595,-0.4527051753953859,-0.394205616723168,-0.07629211441565276,-0.10801254519739567,0.47231107455591426,-0.03210567984321444,0.0729371148449478,0.23670385059350552,0.4359893971254698,0.31374159467209983,0.13176314204763773,0.1983160449291803,0.40192503441068816,0.3445313763176894,-0.19951934075643596,0.4458875193318079,-0.0026829319937324847,0.07954513161428367,0.4513752880150801,0.11472756690009933,0.12525824594650126,-0.01549079758359051,0.49124144010184456,0.27697914741481133,-0.03098340999878868,-0.4634971393660623,0.19740336115486423,-0.4999744544980165,0.10318323285596676,0.21603468880996024,-0.44965872862110423,-0.06624169056849905,0.2338109151047585,-0.1430969153351307,0.03553367959168807,-0.4530975402375921,0.26172693617015264,-0.3404802639820792,0.1350990213647305,-0.42009443149870074,-0.136353156875354,-0.11252975307711521,0.22812321453747875,-0.10509648546492412,0.2317322461279534,0.15226720204226107,-0.04567113108344012,0.2331849878165484,0.2588340710681323,0.10411217475322965,0.4722356011621205,-0.431788879782264,0.3234933951799972,-0.1919865783745347,-0.47601573529174845,-0.0563829977354986,-0.15839928519568058,-0.163672576902951,-0.25286748089110533,-0.101505755600515,-0.46346226268934054,0.07019905206822985,-0.3896174513168409,-0.1574821428321569,0.4183899689301809,0.16520400383580114,-0.4073316360396575,-0.1911874495976431,-0.0860554470943038,0.1490185991558488,-0.43324038590447644,-0.4758514555118023,-0.1395077984402695,0.27745854655111435,0.015513971856746744,0.31492233934551783,0.010567551368117822,-0.15767691500433978,-0.051307162194291545,0.1163781741076575,0.026902292937305283,-0.10060318008446245,-0.37960430094756603,0.40567179527826913,0.04944481465551176,0.021251711732298117,-0.47036396858319107,0.47406038810034445,-0.3009808432198877,0.37499899329972086,0.23059121837151575,0.42378795733969676,-0.21490234013155396,-0.016397593661082954,0.3142108935062622,0.09554612304327126,0.3301604109211498,0.40049146383728806,0.1008198355981278,-0.2177085592151995,-0.46523667915881917,-0.30616373416780496,0.3964177440064256,-0.29298055323423,-0.30112649147566484,0.4812136554076194,0.34305806529596783,-0.25764177793649945,-0.34594666267303653,0.31201687526405375,-0.27094786404462456,0.16526762003407303,0.31878963330498045,-0.4488052333466095,0.13527882043207518,-0.3255773598142131,-0.07341558986399677,-0.4797712877426794,-0.4520729839310247,-0.24643513759827496,0.1717319240230304,0.48874490796080305,-0.3918392242488231,0.10518972368114943,-0.3630894018268547,-0.42464871880270505,-0.33502437100676197,0.30307706356388153,0.42320258996015037,0.2898173938320525,-0.021061790582102446,0.055411835817095856,-0.14067925184714336,-0.24289293236815435,0.19752137469975972,0.3242141489775374,0.489092439439359,-0.23415677165744309,-0.32562418709917806,-0.13806962387571264,0.05836676314489253,-0.2093239607926809,0.10372082038760566,-0.026853282965071168,-0.23974553334942406,0.41726644644727906,0.37798368592534715,0.36299227181434635,0.41681942212256207,0.18087496194990882,-0.21307372849730344,-0.12382971006015486,0.4660374224869481,0.37360271276431845,0.2860525831895522,-0.1693873627571887,0.2296275286342655,0.04956079157901039,-0.43062497421290624,-0.14234518407959817,0.4093827958546017,-0.3202066136907449,-0.2771705620201479,-0.4630279088648015,-0.08151916575386009,-0.29273834381659114,-0.3387632317540028,-0.38396173360166963,0.14998675993424526,-0.11192094020770171,-0.39448838282448784,0.255049254386724,0.10989493474566614,-0.3911485239465884,0.2522677726899216,0.49717841917800953,0.05350365880796826,0.33652139898770095,0.16343956732733989,-0.4733819640105503,-0.3898338530777199,-0.2959296041961694,-0.2849080361659977,-0.21762967093927799,-0.010628904297638408,-0.2992933252236767,-0.4415952381982866,-0.04750256103572048,-0.2521976942940092,-0.1778301522470953,-0.2809520487310342,0.4457507212853442,-0.21170569808430595,0.37610208933181455,-0.018556280750094745,0.4885688257008145,-0.19253514172667074,0.41707420043511156,-0.47492395670082255,-0.4625398162641563,-0.22397284069459844,-0.24894240201354556,0.14541589772727503,0.01488795781920249,0.2246323739484002,-0.07899022027609215,-0.21220620051566708,-0.11076771367876082,0.4890983067390495,-0.06401341223154389,0.488342436616962,-0.4089939023121645,0.23374028337443087,-0.34078428801175376,0.26189907669594237,-0.024054464489082328,-0.11982079080940777,-0.23144861705563513,-0.4305489995082765,-0.24358661477310584,0.22280877525549747,-0.11869748630660171,-0.0069587183717896295,-0.09312213664047109,0.3965518787630846,-0.196006167310804,-0.44843149024068785,0.19485900891659957,0.08046381161850458,-0.42070505715150097,0.3198449732275308,-0.36763584974179175,-0.38354205563912624,-0.4887640690854753,-0.11803995739514317,-0.06898275908847484,0.43844215866704306,-0.2087031007741571,-0.1692830252616755,0.21792521176339874,0.4167208134775724,-0.4180831532563407,-0.1573743714976159,-0.10375273180445,-0.1508681534676941,-0.38145246572332714,-0.3321670607719738,-0.07215736351523105,0.15041578398916688,0.3350353811387887,0.15184784959452124,0.06761425893443862,0.23917149481864808,-0.09157152202378405,-0.48773264801083815,-0.2130174155561071,0.053477601402712294,0.12492089152759656,0.1341365787728841,-0.0679626914106497,-0.4942196645469672,0.17503714998110853,0.28202297699060175,0.44610230567936315,0.30354567181281733,0.19250399437039611,0.22854421631271227,0.31547944164559016,-0.37111236634151545,-0.41887383100987585,-0.3210003558966261,0.14412948052223995,0.0441201655247736,-0.3229358045040114,0.08811068441304504,0.17029098650607044,-0.28910555461819776,-0.09672131157910302,0.32696029552265826,-0.3255483192233053,0.06848402821735355,0.3072531797191509,0.14450080005681398,-0.21097923521918682,-0.0718755110425735,-0.07905479024427486,-0.27629434164524325,0.36606799296305925,0.31908202613574477,0.26837319611351385,0.008402727006736832,-0.1444074584698234,-0.28603724800769226,-0.3540530475915653,0.25141351481327656,0.49859665684905585,-0.3346410676012912,0.31818551905396486,0.0518333734966856,0.1243437032353043,0.48308917936747653,-0.3849469647969763,0.4512754900182283,0.08552444843176055,-0.49931599072678745,0.03738538938061886,-0.27301508859740187,0.4860449267650355,-0.030485232736905177,0.05267951885307465,-0.14510442369125376,0.1256916053475381,0.23700183558828747,0.034293143109068946,-0.3750963069883362,0.26774530956447906,-0.22133359103987482,-0.4656978400314751,-0.3914943558145203,0.4861072201583576,-0.23504749122438384,-0.24831923619490315,0.344525677632713,0.22187910547192713,0.13045478592678283,-0.09436582295989004,0.07340940964517206,0.13080378061224684,-0.46185794647467104,0.22572682717977943,-0.2752311581380291,0.2280197472906793,-0.29662265423458023,-0.11253289938232824,0.2296174585343549,-0.2402619122292693,-0.3752981095186245,0.20934424294099263,0.33918606486684655,0.4394191147776194,-0.11669422488704062,0.3792692035369767,-0.17558091690411315,0.4160361843696967,0.33898834179861637,-0.3868208964626234,-0.1041128864325831,0.3334253735657384,-0.21288046397087657,0.3577629086625418,0.04251118108888963,0.03469315340045598,-0.45184853274488845,0.1435831186877652,0.1510984428605655,-0.02448592373775038,0.4064605462504238,0.10411439720810889,0.22304912432479784,0.39884705945906496,0.48141851361969623,0.07139521878763011,0.21092454777241043,0.318728736868487,-0.13435033723682355,0.3451575987073885,-0.2934786046408979,-0.20924155196573868,-0.25720233427861827,-0.46630428404200575,-0.006318782668899292,0.16346490962783178,-0.13786288241140698,0.24293380574512002,-0.4508335583396994,-0.1849627080593006,-0.251934249986812,-0.08803759148412316,-0.17543020017706357,0.477428073183906,8.623821712849811e-5,0.18153385259931887,-0.09526195087997102,0.19256686181118488,-0.27357127752754096,0.4559139574632769,-0.3988489665149533,-0.26490118610992064,0.30854106010411475,-0.3708016735362629,0.08477611522716555,-0.35573097597501335,0.05699862186603788,-0.34959890362420043,0.1876573699946713,-0.4831127554332,0.11122793196489056,0.2063798778074062,0.45889098459553246,-0.3666115128911578,-0.12730507186231277,0.23617927965433982,0.07600551054806637,0.31647827399227113,0.4353242557118935,-0.25544274174238857,0.1771392980248756,-0.3340259874776448,0.09673089095527887,-0.018412642130941403,-0.4482572499335964,0.33297457378513196,0.05923065721475873,0.41229936933047373,-0.44775481062344924,0.01661799964222954,-0.3261195950143829,-0.3188268889395476,0.47117887030412864,0.018789728041874953,-0.4813631626635433,-0.0785660535953312,-0.2389713709832202,0.28132503562068534,0.3017694312247763,0.4240775378011443,0.32780539693633126,0.4784546810725947,-0.1071958492414149,-0.23517564962069826,0.21802671213151248,0.3794732373858658,0.016316246213444296,0.17778726471899864,0.2298912843922516,-0.11234068822757615,-0.05709897303973821,0.047483922013499935,-0.2729764417602425,0.4463706999327375,-0.3096868450651642,0.4273814749147582,-0.4513142963892991,-0.49764932198301404,0.01966572652874299,-0.03994087490922471,-0.33468242261219827,0.22867248598245782,-0.27926193669293276,0.05607922051809,-0.319226692136767,0.2557352946401381,-0.05657074763891479,-0.27807393166186656,0.030938538822876227,-0.09232661884603965,-0.32248478642259304,-0.08336207498231141,-0.3716834366016739,0.38126501391217893,-0.06952796563849994,0.2000584016759397,0.45945600767188055,-0.21816330562646113,0.08662130010016744,-0.14195420717172458,0.08415283483819946,0.4136095218569733,-0.2521601330164298,0.11203280581691133,-0.252918685903178,-0.25508248494320385,0.21624900666738767,0.12689201654026272,-0.32726723224278853,-0.2773642986267473,0.007041115721474478,0.19123993771395198,0.02123701227566155,0.08626978582398204,-0.08684898883214487,-0.17909018043376213,0.30954732009323527,-0.07699326592970679,0.18231966533011312,-0.18960739459206977,0.10197475688207214,-0.33576889092421913,-0.17449823158304056,0.06479250193417552,-0.017383841486313223,-0.08610772320764615,-0.47051799669553196,0.019371882102860782,-0.4554894104924405,0.14746437420938552,0.15224223017844163,-0.30285505419563297,0.18226860092871155,0.22056315081529299,-0.17498967354547967,-0.2670596170857156,-0.2988237840267023,-0.23719430970656208,-0.22847615056005965,0.44402425341919227,-0.4861972918030286,-0.21785564878285157,0.014225802827260159,0.42829833706149656,-0.34636602954256035,-0.2724805442911846,-0.4357862847375873,-0.11761378255790023,0.3714748060988706,0.2283646460348705,-0.21261948808802722,-0.12268373920725861,-0.2392854202646737,-0.4492917629353068,0.3434696495573628,0.3717274048058634,-0.30598534343345274,-0.0021388335887968513,0.4682860269137079,0.11797431898360622,0.34250573194016387,-0.2978361142840247,-0.24327243728448522,0.2635028632404952,-0.23985846971682712,-0.2933036301846699,0.3403212878336548,0.1399503162744291,-0.37391895886063287,-0.05321086586881263,0.32241356534040344,-0.2686697614490403,0.3633083824319112,0.2476042663734379,-0.13353486347859334,0.4504034332788369,-0.3761133334705953,-0.48179766538431856,0.17653859780599523,0.14464495251190512,0.31375217819884527,0.3460921364602867,-0.37404342284083825,-0.23978507445224295,-0.2447891964990676,-0.4588392035808433,0.05496793959480217,-0.02558310023219068,0.4307412356369955,0.10869460691015709,0.4448479151606739,-0.41272152869826706,-0.239852502079259,0.2835535458890204,-0.025160520818809706,-0.23606284919011533,-0.38284389628914184,-0.1387102030612788,0.04388459305264836,0.2585936694454256,0.28487945253293256,0.0948326533693793,0.46337814727191584,-0.005035122536351411,0.20247590704573692,0.22397277462587883,-0.2796739600841691,0.4463183307057388,0.2791201534297656,0.37355007068146295,-0.21703308961264023,-0.28673999453350163,0.12591891454696524,-0.1661118943512876,0.05671178279731848,0.14503965392678353,-0.2652712009341458,0.2887482761520146,0.19774575333871547,-0.33990829945985923,0.17353928984387257,0.15679031214534955,-0.2548018332237856,-0.022899501122591204,0.25932171989046493,0.025829076517237315,-0.33974697946129373,-0.03317713902259323,-0.06699139728541592,0.40604772626966557,-0.044213875149841986,0.4763802279943383,-0.45020399893893903,0.31516675371964165,0.026641069280561425,0.44443780585301806,0.3240877527753274,-0.3168235075601271,-0.21422031605419778,0.28264955021558147,0.19992321988380968,-0.09246199921206699,-0.24217018886878905,0.10046726313914767,-0.3473004546382843,-0.04831558816674808,-0.17547054075076973,-0.2354037626224208,0.20658784512309514,0.14438691060392506,-0.41086713953774123,-0.36877876631374673,-0.14368389491645828,0.03076060623492216,0.22363963473609738,0.1599878760775415,-0.20454618856219242,0.08956683385945596,0.2870328647259732,-0.45905362751005896,-0.13964127060940656,-0.21962125169957192,0.1883838196611478,-0.1576738075186932,0.35319546298206017,0.26776328053851683,-0.3880059082092311,0.05438681196364814,0.1921065939131008,-0.048452588290779364,-0.47677692887410283,0.03837615112074899,-0.3898855945256172,0.3413154176773805,0.23018656581008146,-0.35949100852101545,0.4320576524038642,0.08379252278114468,0.018056489391448105,-0.2219016146213657,-0.39978126605965425,0.07145580853385058,0.13683895719730477,-0.12554548467138993,-0.19447619252930082,-0.20319706544101557,-0.4865421309262843,-0.4256168222387915,0.17989574879039605,0.19617280675378934,-0.2504496098424389,0.04580288673391153,0.20303319276146592,-0.23287202957536346,-0.14469465541554172,0.4442604502256038,-0.29460171150432424,-0.05841830809440651,0.4047874063437076,-0.28969013429396817,0.4629411020725025,-0.1651942830690296,0.15011757042683715,-0.2796771395692772,0.46673844432720024,-0.3781787156323342,-0.22876408750998278,-0.19949743013466747,0.1672307944070992,0.18266371531239,-0.3599586521821563,-0.0713012912287112,0.45466777032958694,0.16900920603114877,-0.438326478673863,0.36539712820455383,-0.2854200407587515,-0.39132753600883574,-0.19213432493168559,-0.32791895368004376,-0.2669065008193996,0.06999357686353269,-0.1209387076876558,-0.4259226149454809,0.114858544335533,0.20512131075342266,0.16442939894116293,-0.2435364113062617,0.2752979195658092,-0.2562700242540299,0.1814261620713311,0.10696400806627882,0.26611467888187446,-0.05399828157872699,-0.4068145905599678,0.12095279639812428,0.4312511444185039,0.31298135615440503,-0.18348097583078582,0.462070972218799,0.15991770289543705,-0.4216884575387876,-0.13189703704416478,-0.07641839936177397,0.43847729544832026,-0.30169374149855344,0.47287463248646544,0.43546385013448186,-0.4677564218692509,-0.17834454145491074,0.4387121275648358,0.43985879548795825,0.3560362386121598,0.08349326544533286,0.3533981392015988,-0.054494078447441696,-0.3757892552885045,-0.20935912616913166,-0.10884694309079435,-0.2214716627080835,-0.49904117511411017,-0.22144403405691748,0.09624427930236168,-0.2146236268690418,0.12882682275684187,0.015406040093018492,-0.009639318674969477,-0.4829151601681283,0.12229352304408736,-0.2467080938591002,-0.3286020585082827,-0.17756988301426935,-0.40987443058032436,-0.2387580784336214,-0.39009103385314914,-0.08173881719297871,0.1649654795139761,0.008505721493551555,0.2840139261175456,0.16053665681897433,-0.4830241684158061,-0.2873893392848319,-0.1016707685524123,0.23498328784147016,0.44873522360609286,0.4282598194662097,0.347708917513714,-0.37249273157312324,0.12497076483155434,0.12127171823626792,0.49985854820575115,0.24028728946477873,-0.3731817979960572,0.2298439427344352,0.13522718801978995,0.3824818637264855,0.49994282481874563,0.11619666826097785,0.4367834085263669,-0.17593802470837083,0.05774122236075674,-0.23085860949986214,0.1364984465123491,0.05946203518164794,-0.1329582001574341,-0.12687619668645844,0.03316846705599463,0.41723660403530727,-0.05166332763878412,-0.24236629570107504,0.014646352929458262,-0.28984340595207936,-0.34985739420270434,-0.037332499909317196,-0.43577712182100115,0.4197968677447086,-0.08796288204675351,-0.41353378818714437,-0.1910571525223681,0.26395125155092747,-0.2726873617059662,0.3329727109145926,0.34036414086487654,-0.3478736090576309,0.18898967731622984,-0.09065121180915048,-0.39486468438502476,0.316857728328948,0.2150994465567797,-0.057130529767893456,-0.015074352232682386,0.16997027577401047,0.3935892198080848,-0.4314237574980022,0.10082850767429075,-0.48823163534962744,-0.022193511239015473,0.15614762828641138,0.1085996125882307,0.4946573487440342,-0.07870416981970974,0.008893786682012239,-0.36873025551477356,0.11111691177516092,-0.12357828893061318,-0.3843831098112189,0.34242800378274385,0.04607496244698406,0.16739253401192822,0.02231720226063172,-0.4137522388992889,-0.4131323610695017,0.48591006525737224,0.12993804039274792,0.28905521825901204,-0.1655688138352296,0.4511107369209435,-0.4214940385692254,-0.2438124330815128,0.4523269108779575,0.3009889114328175,-0.2644104486840464,0.27051810409346544,-0.01906315873380393,-0.10207073206475292,-0.04205900054789291,-0.05113850851213564,0.11930819629249778,0.20358848629559967,0.3075406453896601,-0.06581574743846796,0.161518281015554,0.26952301521144273,0.15973888373588507,0.49471561971729505,0.4703394555615925,0.4042343011564369,0.26668895327987285,-0.21731632044076132,-0.09007230953778445,-0.25523341608251204,0.4134007409250593,-0.20885581563762123,-0.2549362644728457,-0.41189391496873395,-0.06254547261524701,-0.31372608727270324,-0.11950793602726728,-0.4672764361699058,-0.010569748150400349,-0.17845191333647925,-0.2860323956765374,-0.4259630445553755,-0.2982588274145974,-0.11514146677467973,0.43279462369971533,0.1952840262736384,0.48817669771315897,0.46032734924931895,0.36094761909804807,0.2145945791592616,-0.0985587097137195,-0.2776249890750526,-0.1032204504158758,-0.3338120082972804,0.30442457632400277,-0.2261634281233842,-0.15681861830797184,-0.043999874630743285,-0.4602135791712636,-0.31224607236242274,0.07637145098051534,-0.055094554112548044,0.1727432091509311,-0.43670228932786537,-0.07124376387236109,-0.4914649719478006,-0.12299313547765367,0.08004744182912615,0.46051505093165535,0.1736285823158259,-0.1824399408876014,-0.14128108543216356,-0.2694517268695944,0.4802336404628411,0.39112231296477606,0.05945274813842505,0.3388399206959525,-0.34507581551250777,-0.15053079655684365,0.3926108221982614,-0.06556470802906489,0.3019066112526081,0.016230222697187546,0.2185655374087181,-0.26662782392512696,-0.2793733438659889,-0.11409826338935103,0.030204542839014747,-0.14579087813848024,0.3057435503168562,0.3020687570841025,-0.1703247683376612,-0.24182875025312067,0.03429119171456185,0.07274015070500783,-0.20036303909173547,-0.0703463238761941,-0.3510991378040351,-0.15714910834758022,-0.4870792456068791,0.27459689254881003,-0.4470110217144294,0.20346748679403293,0.19164683326019416,-0.4466285623402495,-0.0928931350654485,0.38628909908522147,0.24066892768171488,0.2354587797248613,-0.4135849511938665,-0.14531751019558325,-0.2040195788156418,-0.2694327800234211,0.15514930633367063,0.38412525125580377,-0.2968968484452772,0.003061383319806321,0.4035845647209846,-0.4721493334401299,0.33416279051705766,-0.08204482340850316,-0.206781190376349,0.195429479911035,-0.015889486488747995,-0.011321138907438355,-0.11235055398272076,-0.20415009416391872,-0.43693651416266976,-0.45619632080375094,-0.026911443106617305,0.1954864948410917,-0.4734397332589293,-0.4165209930169975,0.3888470682362297,-0.06121127269611004,-0.05168477427098872,0.38007837780001896,-0.04314819264065162,-0.48298239257407616,-0.3793984745143888,-0.3635279157388598,-0.3070397316168274,0.11548281525367399,0.08982763378036518,-0.4390920497301851,0.2740177237601491,0.20009140090284272,-0.203862171495937,-0.3145474187338242,-0.12106115701959075,-0.49235127122080113,-0.28938305051297153,0.3711442348005576,0.3562242318447377,-0.3589133847261572,-0.010245163961972947,-0.14036940287447375,0.2585336962928715,0.43045492152439424,0.48146134988431766,0.095343282898114,0.10480962516527659,0.1562457924151408,-0.49229007183260176,-0.16807335375836985,0.023985473115285094,0.3491439198983948,0.41109055702828146,-0.34686015845218043,-0.46502806918411177,0.13691545978114528,-0.46430073450036047,0.016644982500758854,0.18916091668222124,0.16683339463934987,-0.08469564120432249,-0.3384552899947191,0.19459006218163566,-0.050930215300565074,0.24334236320332137,0.1859105374035288,-0.1251298797791982,-0.29999111721369687,-0.2426974807608695,-0.07907815622311021,-0.17130354930172986,-0.27671684474865854,-0.26938339181451143,-0.05772812063329047,0.13357525843131945,-0.49205998416970065,-0.40179791653331476,-0.3461160399414833,-0.22055395001594058,0.16710669252929145,0.49640815109231173,-0.16452199646733034,-0.24870103509482533,0.041052572141322186,0.29243736167140777,-0.1512227758118092,0.20137575559281395,-0.4701575513795824,-0.19802337084938526,-0.40186921324352554,0.28434413922723256,0.2834303005965446,0.10694275623508442,-0.4888864455565811,0.46634882127916133,-0.04561556981961279,0.14648245506578905,-0.43826532937424245,-0.4749044211250504,0.1515576364924116,0.082578980110392,-0.2718162283487946,0.02107717605624604,-0.404089820211015,-0.2922113036096321,0.46712769983613844,-0.46528581732626506,0.1751574632651378,-0.029736639868160886,-0.22726796289329232,0.3106832883045607,0.04132117206478969,-0.4657591650488566,0.39115341185823893,0.1954215657550573,-0.09836432960831965,0.24755762191560948,0.34438067699015185,0.33849769424033105,0.09355530726876204,-0.34911632980026797,0.11223294065473288,-0.1349272521987981,-0.47855638371845144,-0.048921413894737364,-0.4808623803730576,0.01009874635273511,-0.08458284783269576,0.053777240408338534,0.012134810865776613,-0.2390227853480429,0.41504015381892256,0.38484151095804875,-0.1870231443428747,0.06821798774510923,-0.2411361970802015,-0.06049915228924507,-0.26836242341630423,0.39959035051064684,0.28904144080950145,0.38233666221481677,-0.22393666795510825,-0.23393812909893996,0.4350460748248952,0.2738822268491248,-0.04628693868998757,0.35920595227279994,-0.06013170130633361,-0.115514737045467,0.20612297168653404,0.13562370680204472,-0.3594977972775968,-0.26049809247240585,0.0652496410267378,0.24850898140272037,0.06266835350176847,0.3084977328543701,-0.3730217593964198,-0.1278644845461816,-0.07549902430631272,0.16150598845126773,-0.4590581766121473,-0.3745577352310019,0.35793141524195615,0.0471493719914835,-0.1598459675516326,-0.14479959982425705,-0.08164973645551932,0.043080522007264754,-0.4061116989633511,-0.055363015401767246,-0.26040121386706483,-0.3150771541938604,0.27584657941073853,0.39507170124751423,-0.44088357580294146,-0.2581513844060237,-0.416785691234804,-0.4679380644222597,-0.36510801275595495,-0.1866983731214229,0.12290156407392594,0.1902148569827864,0.3481077183209722,0.11484601280580642,-0.13078653239141524,-0.1672766678547466,0.37060559043883723,0.41172228746262607,-0.3076696678788948,0.33807694788393894,0.4903763780813595,0.3447813125303767,0.32651986746995876,0.32486893396874117,-0.3735442778593283,-0.3943481291270794,0.45892226181837925,0.17124543549795934,0.44914319735919395,0.031924602319054696,-0.2122055351461547,0.4815517117662591,-0.0005913721899117874,-0.031502451237395146,0.05797717491516097,-0.43699556989595667,0.055230011201896634,0.40367969548753346,-0.20385891297989578,0.4557244063349768,0.4614283367140741,0.19015162009267628,-0.03448350747716522,-0.07735265325427476,-0.4619721645162058,0.2490031206578065,0.46687022666666134,0.1811752066498562,-0.16167610866633542,0.3778451141069281,-0.15863188359482971,-0.424953321277743,-0.4757791734374821,-0.31437661965702546,-0.07883079959425832,0.31558893539819444,-0.23600403651579804,0.06086990081159671,-0.040417138152281096,-0.3093390091786725,-0.026091069919738086,0.29309478913300446,-0.4388408034906768,-0.47834514014015994,0.4025212448456381,0.31700202860570337,-0.31403741809877195,0.2260991898466691,-0.04792402496387971,-0.10970199109870182,-0.3216491158632846,0.014595750245947947,-0.4133576534360699,0.13378155248812584,-0.4694128015901222,0.27613224280603066,-0.04356514545823642,-0.20782865447057852,-0.0004961180517082386,0.48633186503270154,-0.10897756442387974,-0.3260166874576358,-0.09810302888723443,0.18639004039799123,0.20667354286776107,-0.4530389884873467,0.12289535208125035,0.31691779950546994,-0.11878705513184284,0.08385639653920274,-0.09627414568427661,0.27494348263040136,0.022721099601023198,0.04044427509510551,-0.23742074473372687,0.4261427010562975,0.4844578172534544,0.16876107884048386,-0.09405272989167224,0.2512551414722397,0.02588973281257867,-0.2030948036951905,-0.36443501280117196,0.08571446556695039,-0.4731738047264389,0.017111997515694588,0.033853345962666426,0.08602011516844987,0.4117316461739522,0.09481171269291133,-0.4875625145698983,-0.21881692747550185,0.31651236753702494,-0.29293659703730324,0.2196351627737776,0.23326154878598526,-0.015038194970566021,0.1575070434123249,0.30594625894869387,0.1201407462382329,0.29655903207002643,-0.09591585887662535,0.49617223024219737,-0.3608220300693714,0.38413510503843074,0.4105907980281287,-0.024972990073713675,-0.035869963538763594,-0.4969041422427607,0.3188695838801363,0.39849193383956627,-0.06145200555814667,0.17494766105672266,0.11635976929037706,-0.2820480207357283,-0.42536737001216407,-0.022787520167241393,-0.03474375619089343,0.38169739261095637,-0.23909771277176683,-0.1582272615811655,-0.4390850794543404,-0.4170890027439049,0.12154181691460075,0.4134978274678902,-0.49981643879448345,-0.25391305478300974,-0.39762312704105507,-0.17330524972802874,0.2468090093918518,0.007839762397045646,-0.15291656555777822,0.0038986845842390316,-0.42328029499357145,0.4899279523817448,0.40209601671197537,-0.053588040168176754,-0.30862476510453263,-0.09825614124442161,-0.006025191872562008,-0.43741753951741713,0.04563858722916714,0.15597658551039695,-0.12000567349698166,0.1659804178684361,0.21228365381188374,-0.3690871382138661,-0.4783700511668061,0.37882854161040225,0.45980422969077606,0.47249792142478797,0.4169423552007874,-0.44720147594373616,-0.13587774811565279,0.1419634966737191,-0.08586212140623384,-0.3693595149475095,0.1508751883906596,-0.17325793575081594,0.43076927338919435,0.19994040585085981,-0.26863907472643334,-0.033423099852280425,0.21333770000924557,-0.44680212733597346,0.0654426301593587,-0.307171639353532,0.12171308151119442,-0.21867127603329473,0.32422571832725744,0.00034578081451819287,-0.009728349972030648,0.162310461529946,0.3489898551390267,-0.3505949747649497,-0.23211062408357575,-0.13002051327821973,0.23129392041401453,-0.15849495972869665,0.4948384035879678,0.34472417747926776,-0.025290199267032687,-0.05803431400173942,0.08664953110851137,-0.2879700364756499,-0.043759896098646944,-0.06936767618077089,-0.28561851156969453,0.24553474727628455,-0.1136870523225999,-0.3422518600404665,0.35414231216474334,0.3100178578325512,0.3995784307221495,-0.47595944620939745,0.4135405251588926,-0.25887128027652184,0.32891384771956345,-0.40582127750194363,-0.45990180091888755,-0.12316598668561851,0.1406822933361236,0.1371517380947742,0.14562089364931108,0.06557017816777755,0.06255326172153874,-0.3512754395915991,-0.31509500020735537,-0.21468589381035907,-0.03881109445014852,-0.16327219999528375,-0.028827841698769507,0.37991125715853147,0.0901470386037686,0.3406676622027649,0.2497005393712981,0.24374897749516444,-0.2184350492212188,0.39924300737661733,-0.46162030457484504,-0.1489740690158594,-0.48908270766830886,-0.35410007709944713,-0.49110373827215903,-0.17130607274489873,0.036745466160340357,-0.35790891507650713,-0.3524697712962923,-0.28268783646596396,-0.30903203090243947,-0.2456759715396304,-0.24884499170011698,-0.09562335615145279,0.4379529598478482,-0.4319476066283485,-0.4301760704513786,0.4153909249117158,0.028598093802435276,-0.22299577997605735,-0.4032774690060974,-0.41078105742741067,-0.024427964592134144,-0.3316533456125623,-0.02902120419489629,0.48718838912947793,-0.3157336665706887,0.2627676983721947,0.17306808624946357,-0.10065525091071303,-0.17307374864839464,-0.3277986670281521,0.07727094439713289,0.23740197220006132,0.16025001525209492,-0.13431475654048275,-0.4078794596803299,-0.06124780730940671,-0.018242984185546485,-0.046826925161279176,-0.21574584568425448,-0.18919831087677075,-0.26221630461650447,0.3066972124849894,0.05856285290860552,-0.24670858305978083,0.4149798858967615,-0.43645967132396235,0.4962257185692103,0.0876362686462755,-0.41756165886155827,0.21904023664419636,-0.2580139496221989,0.4138577876535283,-0.4814933312655638,0.035927312607723305,-0.08551182452939599,-0.41198772830406916,-0.43958187936142634,0.3518641199460144,0.13626175313926492,0.13477867564841128,-0.39237385957565407,-0.1190638532803241,-0.029600102963041497,-0.45166802835357034,0.42555982554359684,-0.45494392699719666,-0.17880608214857285,0.14886042898694085,-0.2008332902739598,0.17017199688211937,0.1767679955426158,-0.24837435619796566,-0.24125307357442716,0.447661695601165,-0.1783516960598266,0.22828768160332213,0.26232312479730036,0.19510696156336427,-0.007454209964464331,-0.45719626094903076,-0.4250489145236447,0.3253098917447397,-0.44821201980528147,0.14311650109159646,0.26901905008244564,0.18717862749252556,-0.16140990490814744,-0.3317222421474284,0.26609691457490947,0.38153384426002357,0.12245997815109533,0.20237904413486474,0.48067749507167257,-0.3269563766394685,0.34356978601679855,0.16394376262782706,0.09075189240213777,-0.33980107059188946,-0.16241997891769877,-0.49844488822673383,-0.24335778660401286,0.2808025476864153,-0.38581558470582644,0.11631509490527692,-0.35822804895326543,0.45416137312100746,0.26897948640516955,0.3397232082215118,-0.3972422052418514,0.068859328057572,0.3169727853853579,-0.05867734752885734,0.07768986543495271,0.29396436306369766,0.1562163914516388]}

},{}],77:[function(require,module,exports){
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
var NINF = require( '@stdlib/constants/float64/ninf' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isPositiveZero = require( '@stdlib/math/base/assert/is-positive-zero' );
var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
var flipsign = require( './../lib' );


// FIXTURES //

var data = require( './fixtures/julia/data.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof flipsign, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a double-precision floating-point number with the magnitude of `x` and the sign of `x*y`', function test( t ) {
	var expected;
	var actual;
	var x;
	var y;
	var i;

	x = data.x;
	y = data.y;
	expected = data.expected;
	for ( i = 0; i < x.length; i++ ) {
		actual = flipsign( x[i], y[i] );
		t.equal( actual, expected[i], 'returns '+expected[i] );
	}
	t.end();
});

tape( 'if `x` is `NaN`, the function returns `NaN`', function test( t ) {
	var z;

	z = flipsign( NaN, -1.0 );
	t.equal( isnan( z ), true, 'returns NaN' );

	z = flipsign( NaN, 1.0 );
	t.equal( isnan( z ), true, 'returns NaN' );

	t.end();
});

tape( 'if `y` is `NaN`, the function could (theoretically) return either a positive or negative number', function test( t ) {
	var z;

	z = flipsign( -1.0, NaN );
	t.equal( isnan( z ), false, 'does not return NaN' );

	z = flipsign( 1.0, NaN );
	t.equal( isnan( z ), false, 'does not return NaN' );

	t.end();
});

tape( 'if `x` is `+infinity`, the function returns an infinite number', function test( t ) {
	var z;

	z = flipsign( PINF, -1.0 );
	t.equal( z, NINF, 'returns -infinity' );

	z = flipsign( PINF, 1.0 );
	t.equal( z, PINF, 'returns +infinity' );

	t.end();
});

tape( 'if `y` is `+infinity`, the function returns `x`', function test( t ) {
	var z;

	z = flipsign( -1.0, PINF );
	t.equal( z, -1.0, 'returns -1' );

	z = flipsign( 1.0, PINF );
	t.equal( z, 1.0, 'returns +1' );

	t.end();
});

tape( 'if `x` is `-infinity`, the function returns an infinite number', function test( t ) {
	var z;

	z = flipsign( NINF, -1.0 );
	t.equal( z, PINF, 'returns +infinity' );

	z = flipsign( NINF, 1.0 );
	t.equal( z, NINF, 'returns -infinity' );

	t.end();
});

tape( 'if `y` is `-infinity`, the function returns `-x`', function test( t ) {
	var z;

	z = flipsign( -1.0, NINF );
	t.equal( z, +1.0, 'returns +1' );

	z = flipsign( 1.0, NINF );
	t.equal( z, -1.0, 'returns -1' );

	t.end();
});

tape( 'the function supports using `+-0` to flip a sign', function test( t ) {
	var x;
	var z;

	x = 3.14;

	z = flipsign( x, 0.0 );
	t.equal( z, 3.14, 'returns +3.14' );

	z = flipsign( x, -0.0 );
	t.equal( z, -3.14, 'returns -3.14' );

	t.end();
});

tape( 'the function supports `x` being `+-0`', function test( t ) {
	var z;

	z = flipsign( -0.0, 1.0 );
	t.equal( isNegativeZero( z ), true, 'returns -0' );

	z = flipsign( -0.0, -1.0 );
	t.equal( isPositiveZero( z ), true, 'returns +0' );

	z = flipsign( 0.0, 1.0 );
	t.equal( isPositiveZero( z ), true, 'returns +0' );

	z = flipsign( 0.0, -1.0 );
	t.equal( isNegativeZero( z ), true, 'returns -0' );

	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/flipsign/test/test.js")
},{"./../lib":74,"./fixtures/julia/data.json":76,"@stdlib/constants/float64/ninf":63,"@stdlib/constants/float64/pinf":64,"@stdlib/math/base/assert/is-nan":68,"@stdlib/math/base/assert/is-negative-zero":70,"@stdlib/math/base/assert/is-positive-zero":72,"tape":268}],78:[function(require,module,exports){
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
var tape = require( 'tape' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isPositiveZero = require( '@stdlib/math/base/assert/is-positive-zero' );
var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
var tryRequire = require( '@stdlib/utils/try-require' );


// VARIABLES //

var flipsign = tryRequire( resolve( __dirname, './../lib/native.js' ) );
var opts = {
	'skip': ( flipsign instanceof Error )
};


// FIXTURES //

var data = require( './fixtures/julia/data.json' );


// TESTS //

tape( 'main export is a function', opts, function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof flipsign, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a double-precision floating-point number with the magnitude of `x` and the sign of `x*y`', opts, function test( t ) {
	var expected;
	var actual;
	var x;
	var y;
	var i;

	x = data.x;
	y = data.y;
	expected = data.expected;
	for ( i = 0; i < x.length; i++ ) {
		actual = flipsign( x[i], y[i] );
		t.equal( actual, expected[i], 'returns '+expected[i] );
	}
	t.end();
});

tape( 'if `x` is `NaN`, the function returns `NaN`', opts, function test( t ) {
	var z;

	z = flipsign( NaN, -1.0 );
	t.equal( isnan( z ), true, 'returns NaN' );

	z = flipsign( NaN, 1.0 );
	t.equal( isnan( z ), true, 'returns NaN' );

	t.end();
});

tape( 'if `y` is `NaN`, the function could (theoretically) return either a positive or negative number', opts, function test( t ) {
	var z;

	z = flipsign( -1.0, NaN );
	t.equal( isnan( z ), false, 'does not return NaN' );

	z = flipsign( 1.0, NaN );
	t.equal( isnan( z ), false, 'does not return NaN' );

	t.end();
});

tape( 'if `x` is `+infinity`, the function returns an infinite number', opts, function test( t ) {
	var z;

	z = flipsign( PINF, -1.0 );
	t.equal( z, NINF, 'returns -infinity' );

	z = flipsign( PINF, 1.0 );
	t.equal( z, PINF, 'returns +infinity' );

	t.end();
});

tape( 'if `y` is `+infinity`, the function returns `x`', opts, function test( t ) {
	var z;

	z = flipsign( -1.0, PINF );
	t.equal( z, -1.0, 'returns -1' );

	z = flipsign( 1.0, PINF );
	t.equal( z, 1.0, 'returns +1' );

	t.end();
});

tape( 'if `x` is `-infinity`, the function returns an infinite number', opts, function test( t ) {
	var z;

	z = flipsign( NINF, -1.0 );
	t.equal( z, PINF, 'returns +infinity' );

	z = flipsign( NINF, 1.0 );
	t.equal( z, NINF, 'returns -infinity' );

	t.end();
});

tape( 'if `y` is `-infinity`, the function returns `-x`', opts, function test( t ) {
	var z;

	z = flipsign( -1.0, NINF );
	t.equal( z, +1.0, 'returns +1' );

	z = flipsign( 1.0, NINF );
	t.equal( z, -1.0, 'returns -1' );

	t.end();
});

tape( 'the function supports using `+-0` to flip a sign', opts, function test( t ) {
	var x;
	var z;

	x = 3.14;

	z = flipsign( x, 0.0 );
	t.equal( z, 3.14, 'returns +3.14' );

	z = flipsign( x, -0.0 );
	t.equal( z, -3.14, 'returns -3.14' );

	t.end();
});

tape( 'the function supports `x` being `+-0`', opts, function test( t ) {
	var z;

	z = flipsign( -0.0, 1.0 );
	t.equal( isNegativeZero( z ), true, 'returns -0' );

	z = flipsign( -0.0, -1.0 );
	t.equal( isPositiveZero( z ), true, 'returns +0' );

	z = flipsign( 0.0, 1.0 );
	t.equal( isPositiveZero( z ), true, 'returns +0' );

	z = flipsign( 0.0, -1.0 );
	t.equal( isNegativeZero( z ), true, 'returns -0' );

	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/flipsign/test/test.native.js","/lib/node_modules/@stdlib/math/base/special/flipsign/test")
},{"./fixtures/julia/data.json":76,"@stdlib/constants/float64/ninf":63,"@stdlib/constants/float64/pinf":64,"@stdlib/math/base/assert/is-nan":68,"@stdlib/math/base/assert/is-negative-zero":70,"@stdlib/math/base/assert/is-positive-zero":72,"@stdlib/utils/try-require":136,"path":150,"tape":268}],79:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

// EXPORTS //

module.exports = Number; // eslint-disable-line stdlib/require-globals

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

},{"./main.js":83}],82:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":48}],83:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":82,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],84:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":48}],85:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":86}],86:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":84,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":89,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],88:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":87,"./main.js":90,"@stdlib/utils/define-nonenumerable-read-only-property":113}],89:[function(require,module,exports){
arguments[4][82][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":48,"dup":82}],90:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":87}],91:[function(require,module,exports){
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

},{"./main.js":92}],92:[function(require,module,exports){
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

},{}],93:[function(require,module,exports){
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

},{"./main.js":94,"./regexp.js":95,"@stdlib/utils/define-nonenumerable-read-only-property":113}],94:[function(require,module,exports){
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

},{"./main.js":94}],96:[function(require,module,exports){
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

},{"./is_number.js":99}],97:[function(require,module,exports){
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

},{"./is_number.js":99,"./zero_pad.js":103}],98:[function(require,module,exports){
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

},{"./main.js":101}],99:[function(require,module,exports){
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

},{}],100:[function(require,module,exports){
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

},{}],101:[function(require,module,exports){
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

},{"./format_double.js":96,"./format_integer.js":97,"./is_string.js":100,"./space_pad.js":102,"./zero_pad.js":103}],102:[function(require,module,exports){
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

},{}],103:[function(require,module,exports){
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

},{}],104:[function(require,module,exports){
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

},{"./main.js":105}],105:[function(require,module,exports){
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

},{}],106:[function(require,module,exports){
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

},{"./main.js":108}],107:[function(require,module,exports){
arguments[4][100][0].apply(exports,arguments)
},{"dup":100}],108:[function(require,module,exports){
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

},{"./is_string.js":107,"@stdlib/string/base/format-interpolate":98,"@stdlib/string/base/format-tokenize":104}],109:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

// MAIN //

var Sym = ( typeof Symbol === 'function' ) ? Symbol : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = Sym;

},{}],111:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-buffer":39,"@stdlib/regexp/function-name":93,"@stdlib/utils/native-class":131}],113:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":114}],114:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":118}],115:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],116:[function(require,module,exports){
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

},{}],117:[function(require,module,exports){
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

},{"./define_property.js":116}],118:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":115,"./has_define_property_support.js":117,"./polyfill.js":119}],119:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":106}],120:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./native.js":123,"./polyfill.js":124,"@stdlib/assert/is-function":45}],121:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":122}],122:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./detect.js":120,"@stdlib/object/ctor":91}],123:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],124:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./proto.js":125,"@stdlib/utils/native-class":131}],125:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./codegen.js":127,"./global_this.js":128,"./self.js":129,"./window.js":130,"@stdlib/assert/is-boolean":33,"@stdlib/string/format":106}],127:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MAIN //

var obj = ( typeof globalThis === 'object' ) ? globalThis : null; // eslint-disable-line no-undef


// EXPORTS //

module.exports = obj;

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

// MAIN //

var obj = ( typeof self === 'object' ) ? self : null;


// EXPORTS //

module.exports = obj;

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

// MAIN //

var obj = ( typeof window === 'object' ) ? window : null;


// EXPORTS //

module.exports = obj;

},{}],131:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":132,"./polyfill.js":133,"@stdlib/assert/has-tostringtag-support":20}],132:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":134}],133:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":134,"./tostringtag.js":135,"@stdlib/assert/has-own-property":16}],134:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],135:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/symbol/ctor":109}],136:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-error":41}],138:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./fixtures/nodelist.js":139,"./fixtures/re.js":140,"./fixtures/typedarray.js":141}],139:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/global":126}],140:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],141:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],142:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./check.js":138,"./main.js":143,"./polyfill.js":144}],143:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/constructor-name":111}],144:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/constructor-name":111}],145:[function(require,module,exports){
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

},{}],146:[function(require,module,exports){

},{}],147:[function(require,module,exports){
arguments[4][146][0].apply(exports,arguments)
},{"dup":146}],148:[function(require,module,exports){
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
},{"base64-js":145,"buffer":148,"ieee754":251}],149:[function(require,module,exports){
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

},{}],150:[function(require,module,exports){
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
},{"_process":258}],151:[function(require,module,exports){
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

},{"events":149,"inherits":252,"readable-stream/lib/_stream_duplex.js":153,"readable-stream/lib/_stream_passthrough.js":154,"readable-stream/lib/_stream_readable.js":155,"readable-stream/lib/_stream_transform.js":156,"readable-stream/lib/_stream_writable.js":157,"readable-stream/lib/internal/streams/end-of-stream.js":161,"readable-stream/lib/internal/streams/pipeline.js":163}],152:[function(require,module,exports){
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

},{}],153:[function(require,module,exports){
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
},{"./_stream_readable":155,"./_stream_writable":157,"_process":258,"inherits":252}],154:[function(require,module,exports){
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
},{"./_stream_transform":156,"inherits":252}],155:[function(require,module,exports){
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
},{"../errors":152,"./_stream_duplex":153,"./internal/streams/async_iterator":158,"./internal/streams/buffer_list":159,"./internal/streams/destroy":160,"./internal/streams/from":162,"./internal/streams/state":164,"./internal/streams/stream":165,"_process":258,"buffer":148,"events":149,"inherits":252,"string_decoder/":267,"util":146}],156:[function(require,module,exports){
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
},{"../errors":152,"./_stream_duplex":153,"inherits":252}],157:[function(require,module,exports){
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
},{"../errors":152,"./_stream_duplex":153,"./internal/streams/destroy":160,"./internal/streams/state":164,"./internal/streams/stream":165,"_process":258,"buffer":148,"inherits":252,"util-deprecate":276}],158:[function(require,module,exports){
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
},{"./end-of-stream":161,"_process":258}],159:[function(require,module,exports){
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
},{"buffer":148,"util":146}],160:[function(require,module,exports){
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
},{"_process":258}],161:[function(require,module,exports){
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
},{"../../../errors":152}],162:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],163:[function(require,module,exports){
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
},{"../../../errors":152,"./end-of-stream":161}],164:[function(require,module,exports){
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
},{"../../../errors":152}],165:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":149}],166:[function(require,module,exports){
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

},{"./":167,"get-intrinsic":242}],167:[function(require,module,exports){
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

},{"es-define-property":227,"es-errors/type":233,"function-bind":241,"get-intrinsic":242,"set-function-length":262}],168:[function(require,module,exports){
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

},{"./lib/is_arguments.js":169,"./lib/keys.js":170}],169:[function(require,module,exports){
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

},{}],170:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],171:[function(require,module,exports){
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

},{"es-define-property":227,"es-errors/syntax":232,"es-errors/type":233,"gopd":243}],172:[function(require,module,exports){
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

},{"define-data-property":171,"has-property-descriptors":244,"object-keys":256}],173:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],174:[function(require,module,exports){
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

},{"./ToNumber":205,"./ToPrimitive":207,"./Type":212}],175:[function(require,module,exports){
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

},{"../helpers/isFinite":220,"../helpers/isNaN":221,"../helpers/isPrefixOf":222,"./ToNumber":205,"./ToPrimitive":207,"es-errors/type":233,"get-intrinsic":242}],176:[function(require,module,exports){
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

},{"call-bind/callBound":166,"es-errors/type":233}],177:[function(require,module,exports){
'use strict';

var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value) {
	return RequireObjectCoercible(value, arguments.length > 1 ? arguments[1] : void undefined);
};

},{"es-object-atoms/RequireObjectCoercible":235}],178:[function(require,module,exports){
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

},{"./DayWithinYear":181,"./InLeapYear":185,"./MonthFromTime":195,"es-errors/eval":228}],179:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":226,"./floor":216}],180:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":216}],181:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":179,"./DayFromYear":180,"./YearFromTime":214}],182:[function(require,module,exports){
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

},{"./modulo":217}],183:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":224,"./IsAccessorDescriptor":186,"./IsDataDescriptor":188,"es-errors/type":233}],184:[function(require,module,exports){
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

},{"../helpers/timeConstants":226,"./floor":216,"./modulo":217}],185:[function(require,module,exports){
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

},{"./DaysInYear":182,"./YearFromTime":214,"es-errors/eval":228}],186:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":224,"es-errors/type":233,"hasown":250}],187:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":253}],188:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":224,"es-errors/type":233,"hasown":250}],189:[function(require,module,exports){
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

},{"./IsAccessorDescriptor":186,"./IsDataDescriptor":188,"./IsPropertyDescriptor":190,"es-errors/type":233}],190:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor(Desc);
};

},{"../helpers/records/property-descriptor":224}],191:[function(require,module,exports){
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

},{"../helpers/isFinite":220,"../helpers/timeConstants":226}],192:[function(require,module,exports){
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

},{"../helpers/isFinite":220,"./DateFromTime":178,"./Day":179,"./MonthFromTime":195,"./ToInteger":204,"./YearFromTime":214,"./floor":216,"./modulo":217,"get-intrinsic":242}],193:[function(require,module,exports){
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

},{"../helpers/isFinite":220,"../helpers/timeConstants":226,"./ToInteger":204}],194:[function(require,module,exports){
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

},{"../helpers/timeConstants":226,"./floor":216,"./modulo":217}],195:[function(require,module,exports){
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

},{"./DayWithinYear":181,"./InLeapYear":185}],196:[function(require,module,exports){
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

},{"../helpers/isNaN":221}],197:[function(require,module,exports){
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

},{"../helpers/timeConstants":226,"./floor":216,"./modulo":217}],198:[function(require,module,exports){
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

},{"./Type":212}],199:[function(require,module,exports){
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


},{"../helpers/isFinite":220,"./ToNumber":205,"./abs":215,"get-intrinsic":242}],200:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":226,"./DayFromYear":180}],201:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":226,"./modulo":217}],202:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],203:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":205}],204:[function(require,module,exports){
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

},{"../helpers/isFinite":220,"../helpers/isNaN":221,"../helpers/sign":225,"./ToNumber":205,"./abs":215,"./floor":216}],205:[function(require,module,exports){
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

},{"./ToPrimitive":207,"call-bind/callBound":166,"safe-regex-test":261}],206:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = require('es-object-atoms/ToObject');

},{"es-object-atoms/ToObject":236}],207:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":238}],208:[function(require,module,exports){
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

},{"./IsCallable":187,"./ToBoolean":202,"./Type":212,"es-errors/type":233,"hasown":250}],209:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":242}],210:[function(require,module,exports){
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

},{"../helpers/isFinite":220,"../helpers/isNaN":221,"../helpers/sign":225,"./ToNumber":205,"./abs":215,"./floor":216,"./modulo":217}],211:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":205}],212:[function(require,module,exports){
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

},{}],213:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":179,"./modulo":217}],214:[function(require,module,exports){
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

},{"call-bind/callBound":166,"get-intrinsic":242}],215:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":242}],216:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],217:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":223}],218:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":226,"./modulo":217}],219:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":174,"./5/AbstractRelationalComparison":175,"./5/Canonicalize":176,"./5/CheckObjectCoercible":177,"./5/DateFromTime":178,"./5/Day":179,"./5/DayFromYear":180,"./5/DayWithinYear":181,"./5/DaysInYear":182,"./5/FromPropertyDescriptor":183,"./5/HourFromTime":184,"./5/InLeapYear":185,"./5/IsAccessorDescriptor":186,"./5/IsCallable":187,"./5/IsDataDescriptor":188,"./5/IsGenericDescriptor":189,"./5/IsPropertyDescriptor":190,"./5/MakeDate":191,"./5/MakeDay":192,"./5/MakeTime":193,"./5/MinFromTime":194,"./5/MonthFromTime":195,"./5/SameValue":196,"./5/SecFromTime":197,"./5/StrictEqualityComparison":198,"./5/TimeClip":199,"./5/TimeFromYear":200,"./5/TimeWithinDay":201,"./5/ToBoolean":202,"./5/ToInt32":203,"./5/ToInteger":204,"./5/ToNumber":205,"./5/ToObject":206,"./5/ToPrimitive":207,"./5/ToPropertyDescriptor":208,"./5/ToString":209,"./5/ToUint16":210,"./5/ToUint32":211,"./5/Type":212,"./5/WeekDay":213,"./5/YearFromTime":214,"./5/abs":215,"./5/floor":216,"./5/modulo":217,"./5/msFromTime":218}],220:[function(require,module,exports){
'use strict';

var $isNaN = require('./isNaN');

module.exports = function (x) { return (typeof x === 'number' || typeof x === 'bigint') && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{"./isNaN":221}],221:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],222:[function(require,module,exports){
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

},{"call-bind/callBound":166}],223:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],224:[function(require,module,exports){
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

},{"es-errors/type":233,"hasown":250}],225:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],226:[function(require,module,exports){
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

},{}],227:[function(require,module,exports){
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

},{"get-intrinsic":242}],228:[function(require,module,exports){
'use strict';

/** @type {import('./eval')} */
module.exports = EvalError;

},{}],229:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Error;

},{}],230:[function(require,module,exports){
'use strict';

/** @type {import('./range')} */
module.exports = RangeError;

},{}],231:[function(require,module,exports){
'use strict';

/** @type {import('./ref')} */
module.exports = ReferenceError;

},{}],232:[function(require,module,exports){
'use strict';

/** @type {import('./syntax')} */
module.exports = SyntaxError;

},{}],233:[function(require,module,exports){
'use strict';

/** @type {import('./type')} */
module.exports = TypeError;

},{}],234:[function(require,module,exports){
'use strict';

/** @type {import('./uri')} */
module.exports = URIError;

},{}],235:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

/** @type {import('./RequireObjectCoercible')} */
module.exports = function RequireObjectCoercible(value) {
	if (value == null) {
		throw new $TypeError((arguments.length > 0 && arguments[1]) || ('Cannot call method on ' + value));
	}
	return value;
};

},{"es-errors/type":233}],236:[function(require,module,exports){
'use strict';

var $Object = require('./');
var RequireObjectCoercible = require('./RequireObjectCoercible');

/** @type {import('./ToObject')} */
module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

},{"./":237,"./RequireObjectCoercible":235}],237:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Object;

},{}],238:[function(require,module,exports){
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

},{"./helpers/isPrimitive":239,"is-callable":253}],239:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],240:[function(require,module,exports){
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

},{}],241:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":240}],242:[function(require,module,exports){
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

},{"es-errors":229,"es-errors/eval":228,"es-errors/range":230,"es-errors/ref":231,"es-errors/syntax":232,"es-errors/type":233,"es-errors/uri":234,"function-bind":241,"has-proto":245,"has-symbols":246,"hasown":250}],243:[function(require,module,exports){
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

},{"get-intrinsic":242}],244:[function(require,module,exports){
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

},{"es-define-property":227}],245:[function(require,module,exports){
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

},{}],246:[function(require,module,exports){
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

},{"./shams":247}],247:[function(require,module,exports){
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

},{}],248:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":247}],249:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":241}],250:[function(require,module,exports){
'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);

},{"function-bind":241}],251:[function(require,module,exports){
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

},{}],252:[function(require,module,exports){
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

},{}],253:[function(require,module,exports){
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

},{}],254:[function(require,module,exports){
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

},{"call-bind/callBound":166,"has-tostringtag/shams":248}],255:[function(require,module,exports){
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

},{"./isArguments":257}],256:[function(require,module,exports){
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

},{"./implementation":255,"./isArguments":257}],257:[function(require,module,exports){
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

},{}],258:[function(require,module,exports){
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

},{}],259:[function(require,module,exports){
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
},{"_process":258,"through":274,"timers":275}],260:[function(require,module,exports){
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

},{"buffer":148}],261:[function(require,module,exports){
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

},{"call-bind/callBound":166,"es-errors/type":233,"is-regex":254}],262:[function(require,module,exports){
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

},{"define-data-property":171,"es-errors/type":233,"get-intrinsic":242,"gopd":243,"has-property-descriptors":244}],263:[function(require,module,exports){
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

},{"es-abstract/es5":219,"function-bind":241}],264:[function(require,module,exports){
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

},{"./implementation":263,"./polyfill":265,"./shim":266,"define-properties":172,"function-bind":241}],265:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":263}],266:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":265,"define-properties":172}],267:[function(require,module,exports){
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
},{"safe-buffer":260}],268:[function(require,module,exports){
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
},{"./lib/default_stream":269,"./lib/results":271,"./lib/test":272,"_process":258,"defined":173,"through":274,"timers":275}],269:[function(require,module,exports){
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
},{"_process":258,"fs":147,"through":274}],270:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":258,"timers":275}],271:[function(require,module,exports){
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
},{"_process":258,"events":149,"function-bind":241,"has":249,"inherits":252,"object-inspect":273,"resumer":259,"through":274,"timers":275}],272:[function(require,module,exports){
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
},{"./next_tick":270,"deep-equal":168,"defined":173,"events":149,"has":249,"inherits":252,"path":150,"string.prototype.trim":264}],273:[function(require,module,exports){
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

},{}],274:[function(require,module,exports){
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
},{"_process":258,"stream":151}],275:[function(require,module,exports){
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
},{"process/browser.js":258,"timers":275}],276:[function(require,module,exports){
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
},{}]},{},[77,78]);
