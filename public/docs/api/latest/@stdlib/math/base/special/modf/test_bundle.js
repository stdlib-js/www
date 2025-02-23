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

},{"@stdlib/utils/native-class":137}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":34,"./object.js":35,"./primitive.js":36,"@stdlib/utils/define-nonenumerable-read-only-property":119}],34:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./try2serialize.js":38,"@stdlib/assert/has-tostringtag-support":20,"@stdlib/boolean/ctor":60,"@stdlib/utils/native-class":137}],36:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/get-prototype-of":127,"@stdlib/utils/native-class":137}],43:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":137}],45:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/type-of":148}],47:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":51,"@stdlib/assert/tools/array-function":58,"@stdlib/utils/define-nonenumerable-read-only-property":119}],51:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":137}],54:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":137}],56:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":137}],58:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-array":31,"@stdlib/string/format":112}],60:[function(require,module,exports){
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
* High word mask for the significand of a double-precision floating-point number.
*
* @module @stdlib/constants/float64/high-word-significand-mask
* @type {uinteger32}
*
* @example
* var FLOAT64_HIGH_WORD_SIGNIFICAND_MASK = require( '@stdlib/constants/float64/high-word-significand-mask' );
* // returns 1048575
*/


// MAIN //

/**
* High word mask for the significand of a double-precision floating-point number.
*
* ## Notes
*
* The high word mask for the significand of a double-precision floating-point number is an unsigned 32-bit integer with the value \\( 1048575 \\), which corresponds to the bit sequence
*
* ```binarystring
* 0 00000000000 11111111111111111111
* ```
*
* @constant
* @type {uinteger32}
* @default 0x000fffff
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_HIGH_WORD_SIGNIFICAND_MASK = 0x000fffff;


// EXPORTS //

module.exports = FLOAT64_HIGH_WORD_SIGNIFICAND_MASK;

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

},{"@stdlib/number/ctor":88}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/ninf":65}],74:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/pinf":66}],76:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var toWords = require( '@stdlib/number/float64/base/to-words' );
var fromWords = require( '@stdlib/number/float64/base/from-words' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var FLOAT64_EXPONENT_BIAS = require( '@stdlib/constants/float64/exponent-bias' );
var FLOAT64_HIGH_WORD_EXPONENT_MASK = require( '@stdlib/constants/float64/high-word-exponent-mask' ); // eslint-disable-line id-length
var FLOAT64_HIGH_WORD_SIGNIFICAND_MASK = require( '@stdlib/constants/float64/high-word-significand-mask' ); // eslint-disable-line id-length


// VARIABLES //

// 4294967295 => 0xffffffff => 11111111111111111111111111111111
var ALL_ONES = 4294967295>>>0; // asm type annotation

// High/low words workspace:
var WORDS = [ 0|0, 0|0 ];


// MAIN //

/**
* Decomposes a double-precision floating-point number into integral and fractional parts, each having the same type and sign as the input value, and assigns results to a provided output array.
*
* @private
* @param {number} x - input value
* @param {Collection} out - output array
* @param {integer} stride - output array stride
* @param {NonNegativeInteger} offset - output array index offset
* @returns {Collection} output array
*
* @example
* var parts = modf( 3.14, [ 0.0, 0.0 ], 1, 0 );
* // returns [ 3.0, 0.14000000000000012 ]
*/
function modf( x, out, stride, offset ) {
	var high;
	var low;
	var exp;
	var i;

	// Special cases...
	if ( x < 1.0 ) {
		if ( x < 0.0 ) {
			modf( -x, out, stride, offset );
			out[ offset ] *= -1.0;
			out[ offset + stride ] *= -1.0;
			return out;
		}
		if ( x === 0.0 ) { // [ +-0, +-0 ]
			out[ offset ] = x;
			out[ offset + stride ] = x;
			return out;
		}
		out[ offset ] = 0.0;
		out[ offset + stride ] = x;
		return out;
	}
	if ( isnan( x ) ) {
		out[ offset ] = NaN;
		out[ offset + stride ] = NaN;
		return out;
	}
	if ( x === PINF ) {
		out[ offset ] = PINF;
		out[ offset + stride ] = 0.0;
		return out;
	}
	// Decompose |x|...

	// Extract the high and low words:
	toWords.assign( x, WORDS, 1, 0 );
	high = WORDS[ 0 ];
	low = WORDS[ 1 ];

	// Extract the unbiased exponent from the high word:
	exp = ((high & FLOAT64_HIGH_WORD_EXPONENT_MASK) >> 20)|0; // asm type annotation
	exp -= FLOAT64_EXPONENT_BIAS|0; // asm type annotation

	// Handle smaller values (x < 2**20 = 1048576)...
	if ( exp < 20 ) {
		i = (FLOAT64_HIGH_WORD_SIGNIFICAND_MASK >> exp)|0; // asm type annotation

		// Determine if `x` is integral by checking for significand bits which cannot be exponentiated away...
		if ( ((high&i)|low) === 0 ) {
			out[ offset ] = x;
			out[ offset + stride ] = 0.0;
			return out;
		}
		// Turn off all the bits which cannot be exponentiated away:
		high &= (~i);

		// Generate the integral part:
		i = fromWords( high, 0 );

		// The fractional part is whatever is leftover:
		out[ offset ] = i;
		out[ offset + stride ] = x - i;
		return out;
	}
	// Check if `x` can even have a fractional part...
	if ( exp > 51 ) {
		// `x` is integral:
		out[ offset ] = x;
		out[ offset + stride ] = 0.0;
		return out;
	}
	i = ALL_ONES >>> (exp-20);

	// Determine if `x` is integral by checking for less significant significand bits which cannot be exponentiated away...
	if ( (low&i) === 0 ) {
		out[ offset ] = x;
		out[ offset + stride ] = 0.0;
		return out;
	}
	// Turn off all the bits which cannot be exponentiated away:
	low &= (~i);

	// Generate the integral part:
	i = fromWords( high, low );

	// The fractional part is whatever is leftover:
	out[ offset ] = i;
	out[ offset + stride ] = x - i;
	return out;
}


// EXPORTS //

module.exports = modf;

},{"@stdlib/constants/float64/exponent-bias":62,"@stdlib/constants/float64/high-word-exponent-mask":63,"@stdlib/constants/float64/high-word-significand-mask":64,"@stdlib/constants/float64/pinf":66,"@stdlib/math/base/assert/is-nan":70,"@stdlib/number/float64/base/from-words":90,"@stdlib/number/float64/base/to-words":94}],77:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Decompose a double-precision floating-point number into integral and fractional parts.
*
* @module @stdlib/math/base/special/modf
*
* @example
* var modf = require( '@stdlib/math/base/special/modf' );
*
* var parts = modf( 3.14 );
* // returns [ 3.0, 0.14000000000000012 ]
*
* @example
* var Float64Array = require( '@stdlib/array/float64' );
* var modf = require( '@stdlib/math/base/special/modf' );
*
* var out = new Float64Array( 2 );
*
* var parts = modf.assign( 3.14, out, 1, 0 );
* // returns [ 3.0, 0.14000000000000012 ]
*
* var bool = ( parts === out );
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

},{"./assign.js":76,"./main.js":78,"@stdlib/utils/define-nonenumerable-read-only-property":119}],78:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Decomposes a double-precision floating-point number into integral and fractional parts, each having the same type and sign as the input value.
*
* @param {number} x - input value
* @returns {Array<number>} output array
*
* @example
* var parts = modf( 3.14 );
* // returns [ 3.0, 0.14000000000000012 ]
*
*/
function modf( x ) {
	return fcn( x, [ 0.0, 0.0 ], 1, 0 );
}


// EXPORTS //

module.exports = modf;

},{"./assign.js":76}],79:[function(require,module,exports){
module.exports={"frac":[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0],"integral":[1.0e299,1.098802395209581e299,1.1976047904191617e299,1.2964071856287425e299,1.3952095808383234e299,1.4940119760479043e299,1.592814371257485e299,1.691616766467066e299,1.7904191616766467e299,1.8892215568862276e299,1.9880239520958086e299,2.0868263473053895e299,2.18562874251497e299,2.2844311377245513e299,2.383233532934132e299,2.482035928143713e299,2.5808383233532934e299,2.6796407185628743e299,2.7784431137724556e299,2.8772455089820358e299,2.976047904191617e299,3.0748502994011976e299,3.1736526946107786e299,3.2724550898203595e299,3.37125748502994e299,3.470059880239521e299,3.568862275449102e299,3.667664670658683e299,3.7664670658682645e299,3.865269461077844e299,3.964071856287425e299,4.062874251497006e299,4.1616766467065875e299,4.260479041916168e299,4.3592814371257486e299,4.45808383233533e299,4.5568862275449104e299,4.655688622754492e299,4.754491017964072e299,4.8532934131736536e299,4.952095808383233e299,5.050898203592815e299,5.149700598802395e299,5.2485029940119765e299,5.347305389221557e299,5.446107784431138e299,5.544910179640718e299,5.6437125748502995e299,5.74251497005988e299,5.841317365269461e299,5.940119760479043e299,6.038922155688623e299,6.137724550898203e299,6.236526946107784e299,6.3353293413173656e299,6.434131736526947e299,6.532934131736528e299,6.631736526946108e299,6.730538922155689e299,6.82934131736527e299,6.928143712574851e299,7.026946107784431e299,7.125748502994012e299,7.224550898203594e299,7.323353293413175e299,7.422155688622755e299,7.520958083832334e299,7.619760479041917e299,7.718562874251497e299,7.81736526946108e299,7.91616766467066e299,8.01497005988024e299,8.113772455089821e299,8.212574850299402e299,8.311377245508983e299,8.410179640718563e299,8.508982035928146e299,8.607784431137726e299,8.706586826347306e299,8.805389221556887e299,8.904191616766467e299,9.00299401197605e299,9.10179640718563e299,9.200598802395209e299,9.299401197604792e299,9.398203592814372e299,9.497005988023953e299,9.595808383233533e299,9.694610778443114e299,9.793413173652695e299,9.892215568862275e299,9.991017964071857e299,1.0089820359281438e300,1.0188622754491019e300,1.0287425149700599e300,1.0386227544910179e300,1.0485029940119762e300,1.0583832335329341e300,1.0682634730538923e300,1.0781437125748502e300,1.0880239520958084e300,1.0979041916167665e300,1.1077844311377245e300,1.1176646706586826e300,1.1275449101796407e300,1.1374251497005987e300,1.1473053892215569e300,1.157185628742515e300,1.1670658682634733e300,1.1769461077844312e300,1.1868263473053894e300,1.1967065868263475e300,1.2065868263473055e300,1.2164670658682636e300,1.2263473053892216e300,1.2362275449101799e300,1.2461077844311379e300,1.2559880239520958e300,1.265868263473054e300,1.2757485029940121e300,1.2856287425149702e300,1.2955089820359282e300,1.3053892215568862e300,1.3152694610778445e300,1.3251497005988024e300,1.3350299401197606e300,1.3449101796407187e300,1.3547904191616768e300,1.3646706586826347e300,1.3745508982035928e300,1.384431137724551e300,1.394311377245509e300,1.404191616766467e300,1.4140718562874253e300,1.4239520958083834e300,1.4338323353293413e300,1.4437125748502994e300,1.4535928143712575e300,1.463473053892216e300,1.4733532934131738e300,1.483233532934132e300,1.49311377245509e300,1.502994011976048e300,1.512874251497006e300,1.5227544910179644e300,1.5326347305389223e300,1.5425149700598804e300,1.5523952095808385e300,1.5622754491017967e300,1.5721556886227545e300,1.5820359281437126e300,1.5919161676646708e300,1.601796407185629e300,1.611676646706587e300,1.621556886227545e300,1.6314371257485033e300,1.641317365269461e300,1.6511976047904192e300,1.6610778443113774e300,1.6709580838323355e300,1.6808383233532936e300,1.6907185628742518e300,1.7005988023952096e300,1.7104790419161677e300,1.7203592814371259e300,1.730239520958084e300,1.7401197604790418e300,1.7500000000000002e300,1.7598802395209584e300,1.7697604790419162e300,1.7796407185628743e300,1.7895209580838325e300,1.7994011976047906e300,1.8092814371257484e300,1.8191616766467066e300,1.829041916167665e300,1.8389221556886228e300,1.848802395209581e300,1.858682634730539e300,1.868562874251497e300,1.878443113772455e300,1.8883233532934132e300,1.8982035928143716e300,1.9080838323353294e300,1.9179640718562876e300,1.9278443113772457e300,1.9377245508982035e300,1.9476047904191616e300,1.9574850299401198e300,1.967365269461078e300,1.977245508982036e300,1.9871257485029942e300,1.9970059880239523e300,2.00688622754491e300,2.0167664670658683e300,2.0266467065868264e300,2.0365269461077842e300,2.0464071856287423e300,2.0562874251497008e300,2.066167664670659e300,2.0760479041916167e300,2.085928143712575e300,2.095808383233533e300,2.1056886227544908e300,2.115568862275449e300,2.125449101796407e300,2.1353293413173655e300,2.1452095808383233e300,2.1550898203592815e300,2.1649700598802396e300,2.1748502994011974e300,2.1847305389221556e300,2.1946107784431137e300,2.2044910179640718e300,2.2143712574850303e300,2.2242514970059884e300,2.2341317365269465e300,2.2440119760479043e300,2.2538922155688625e300,2.2637724550898206e300,2.2736526946107784e300,2.283532934131737e300,2.293413173652695e300,2.303293413173653e300,2.313173652694611e300,2.323053892215569e300,2.3329341317365272e300,2.342814371257485e300,2.3526946107784432e300,2.3625748502994016e300,2.3724550898203594e300,2.3823353293413176e300,2.3922155688622757e300,2.4020958083832338e300,2.4119760479041917e300,2.4218562874251498e300,2.4317365269461082e300,2.441616766467066e300,2.4514970059880242e300,2.4613772455089823e300,2.4712574850299404e300,2.4811377245508983e300,2.4910179640718564e300,2.5008982035928145e300,2.5107784431137727e300,2.5206586826347308e300,2.530538922155689e300,2.5404191616766468e300,2.550299401197605e300,2.560179640718563e300,2.570059880239521e300,2.579940119760479e300,2.5898203592814374e300,2.5997005988023955e300,2.6095808383233534e300,2.6194610778443115e300,2.6293413173652696e300,2.6392215568862278e300,2.6491017964071856e300,2.658982035928144e300,2.668862275449102e300,2.67874251497006e300,2.6886227544910184e300,2.698502994011976e300,2.708383233532934e300,2.7182634730538925e300,2.7281437125748503e300,2.738023952095808e300,2.7479041916167666e300,2.7577844311377244e300,2.767664670658683e300,2.777544910179641e300,2.787425149700599e300,2.797305389221557e300,2.807185628742515e300,2.817065868263473e300,2.8269461077844316e300,2.8368263473053895e300,2.846706586826348e300,2.856586826347306e300,2.8664670658682636e300,2.8763473053892214e300,2.88622754491018e300,2.8961077844311376e300,2.905988023952096e300,2.915868263473054e300,2.925748502994012e300,2.93562874251497e300,2.9455089820359286e300,2.9553892215568864e300,2.965269461077845e300,2.9751497005988027e300,2.985029940119761e300,2.9949101796407183e300,3.004790419161677e300,3.0146706586826346e300,3.024550898203593e300,3.034431137724551e300,3.044311377245509e300,3.054191616766467e300,3.064071856287425e300,3.073952095808383e300,3.083832335329342e300,3.0937125748502996e300,3.103592814371258e300,3.113473053892216e300,3.1233532934131743e300,3.1332335329341316e300,3.14311377245509e300,3.152994011976048e300,3.162874251497006e300,3.172754491017964e300,3.1826347305389225e300,3.1925149700598803e300,3.202395209580838e300,3.212275449101796e300,3.2221556886227544e300,3.232035928143713e300,3.241916167664671e300,3.251796407185629e300,3.261676646706587e300,3.271556886227545e300,3.281437125748503e300,3.291317365269461e300,3.3011976047904195e300,3.3110778443113773e300,3.320958083832336e300,3.330838323353293e300,3.3407185628742514e300,3.350598802395209e300,3.3604790419161677e300,3.3703592814371255e300,3.380239520958084e300,3.3901197604790423e300,3.4e300,3.409880239520958e300,3.4197604790419164e300,3.429640718562874e300,3.4395209580838327e300,3.4494011976047905e300,3.459281437125749e300,3.469161676646706e300,3.4790419161676646e300,3.488922155688623e300,3.498802395209581e300,3.5086826347305393e300,3.518562874251497e300,3.5284431137724556e300,3.5383233532934134e300,3.548203592814372e300,3.5580838323353297e300,3.567964071856288e300,3.577844311377246e300,3.5877245508982043e300,3.5976047904191616e300,3.60748502994012e300,3.617365269461078e300,3.627245508982036e300,3.637125748502994e300,3.6470059880239525e300,3.6568862275449104e300,3.666766467065868e300,3.676646706586826e300,3.686526946107785e300,3.696407185628743e300,3.7062874251497013e300,3.716167664670659e300,3.7260479041916176e300,3.735928143712575e300,3.745808383233533e300,3.755688622754491e300,3.7655688622754495e300,3.7754491017964073e300,3.785329341317366e300,3.7952095808383236e300,3.8050898203592814e300,3.814970059880239e300,3.8248502994011977e300,3.8347305389221555e300,3.8446107784431145e300,3.8544910179640724e300,3.864371257485031e300,3.874251497005988e300,3.8841317365269465e300,3.894011976047904e300,3.903892215568863e300,3.9137724550898205e300,3.923652694610779e300,3.933532934131736e300,3.9434131736526946e300,3.9532934131736525e300,3.963173652694611e300,3.973053892215569e300,3.982934131736527e300,3.9928143712574856e300,4.0026946107784434e300,4.012574850299401e300,4.0224550898203597e300,4.0323353293413175e300,4.042215568862276e300,4.052095808383234e300,4.061976047904192e300,4.0718562874251494e300,4.081736526946108e300,4.0916167664670657e300,4.101497005988024e300,4.111377245508982e300,4.1212574850299404e300,4.131137724550898e300,4.141017964071856e300,4.1508982035928145e300,4.160778443113773e300,4.170658682634731e300,4.180538922155689e300,4.190419161676647e300,4.2002994011976054e300,4.2101796407185627e300,4.220059880239521e300,4.229940119760479e300,4.2398203592814373e300,4.249700598802395e300,4.2595808383233536e300,4.269461077844311e300,4.279341317365269e300,4.289221556886227e300,4.299101796407186e300,4.308982035928144e300,4.3188622754491024e300,4.328742514970061e300,4.338622754491018e300,4.3485029940119765e300,4.3583832335329343e300,4.368263473053893e300,4.3781437125748506e300,4.388023952095809e300,4.397904191616767e300,4.4077844311377247e300,4.4176646706586825e300,4.427544910179641e300,4.437425149700599e300,4.447305389221557e300,4.4571856287425156e300,4.467065868263474e300,4.476946107784431e300,4.4868263473053897e300,4.4967065868263475e300,4.506586826347306e300,4.516467065868264e300,4.526347305389222e300,4.5362275449101795e300,4.546107784431138e300,4.555988023952096e300,4.565868263473054e300,4.575748502994012e300,4.5856287425149704e300,4.595508982035928e300,4.6053892215568867e300,4.6152694610778445e300,4.625149700598803e300,4.635029940119761e300,4.644910179640719e300,4.654790419161677e300,4.6646706586826354e300,4.6745508982035927e300,4.684431137724551e300,4.694311377245509e300,4.7041916167664674e300,4.714071856287425e300,4.7239520958083836e300,4.7338323353293415e300,4.743712574850299e300,4.753592814371258e300,4.763473053892216e300,4.773353293413174e300,4.7832335329341324e300,4.79311377245509e300,4.8029940119760487e300,4.812874251497006e300,4.8227544910179643e300,4.832634730538922e300,4.8425149700598806e300,4.8523952095808384e300,4.862275449101797e300,4.872155688622754e300,4.8820359281437125e300,4.8919161676646703e300,4.901796407185629e300,4.911676646706587e300,4.9215568862275456e300,4.9314371257485035e300,4.941317365269461e300,4.951197604790419e300,4.9610778443113775e300,4.9709580838323354e300,4.980838323353294e300,4.9907185628742516e300,5.00059880239521e300,5.0104790419161673e300,5.020359281437126e300,5.0302395209580836e300,5.040119760479042e300,5.05e300,5.059880239520959e300,5.0697604790419167e300,5.0796407185628745e300,5.0895209580838323e300,5.099401197604791e300,5.1092814371257486e300,5.119161676646707e300,5.129041916167665e300,5.138922155688623e300,5.1488023952095805e300,5.158682634730539e300,5.1685628742514974e300,5.178443113772455e300,5.1883233532934136e300,5.1982035928143715e300,5.2080838323353305e300,5.217964071856288e300,5.227844311377246e300,5.237724550898204e300,5.2476047904191624e300,5.25748502994012e300,5.2673652694610787e300,5.277245508982036e300,5.2871257485029943e300,5.297005988023952e300,5.3068862275449106e300,5.3167664670658684e300,5.326646706586827e300,5.3365269461077847e300,5.3464071856287425e300,5.3562874251497004e300,5.366167664670659e300,5.376047904191617e300,5.385928143712575e300,5.395808383233533e300,5.405688622754492e300,5.41556886227545e300,5.425449101796408e300,5.435329341317365e300,5.445209580838323e300,5.455089820359281e300,5.46497005988024e300,5.474850299401198e300,5.484730538922157e300,5.494610778443114e300,5.504491017964073e300,5.51437125748503e300,5.524251497005987e300,5.534131736526946e300,5.544011976047904e300,5.553892215568863e300,5.56377245508982e300,5.573652694610779e300,5.583532934131736e300,5.593413173652695e300,5.603293413173653e300,5.613173652694611e300,5.62305389221557e300,5.632934131736528e300,5.642814371257486e300,5.652694610778444e300,5.662574850299401e300,5.67245508982036e300,5.682335329341317e300,5.692215568862276e300,5.702095808383234e300,5.711976047904193e300,5.72185628742515e300,5.731736526946108e300,5.741616766467067e300,5.751497005988024e300,5.761377245508982e300,5.77125748502994e300,5.781137724550898e300,5.791017964071857e300,5.800898203592814e300,5.810778443113773e300,5.82065868263473e300,5.830538922155689e300,5.840419161676646e300,5.850299401197604e300,5.860179640718563e300,5.870059880239521e300,5.879940119760479e300,5.889820359281436e300,5.899700598802397e300,5.909580838323354e300,5.919461077844311e300,5.92934131736527e300,5.939221556886228e300,5.949101796407187e300,5.958982035928144e300,5.968862275449103e300,5.97874251497006e300,5.988622754491018e300,5.998502994011976e300,6.008383233532934e300,6.018263473053893e300,6.028143712574851e300,6.03802395209581e300,6.047904191616766e300,6.057784431137724e300,6.067664670658683e300,6.077544910179641e300,6.087425149700599e300,6.097305389221557e300,6.107185628742516e300,6.117065868263474e300,6.12694610778443e300,6.136826347305389e300,6.146706586826347e300,6.156586826347306e300,6.166467065868263e300,6.176347305389222e300,6.18622754491018e300,6.196107784431138e300,6.205988023952097e300,6.215868263473054e300,6.225748502994013e300,6.235628742514971e300,6.245508982035929e300,6.255389221556887e300,6.265269461077845e300,6.275149700598804e300,6.28502994011976e300,6.29491017964072e300,6.304790419161677e300,6.314670658682636e300,6.324550898203593e300,6.334431137724551e300,6.34431137724551e300,6.354191616766468e300,6.364071856287425e300,6.373952095808383e300,6.383832335329341e300,6.3937125748503e300,6.403592814371257e300,6.413473053892216e300,6.423353293413174e300,6.433233532934133e300,6.443113772455089e300,6.452994011976047e300,6.462874251497006e300,6.472754491017964e300,6.482634730538922e300,6.49251497005988e300,6.50239520958084e300,6.512275449101798e300,6.522155688622754e300,6.532035928143713e300,6.541916167664671e300,6.55179640718563e300,6.561676646706587e300,6.571556886227546e300,6.581437125748504e300,6.591317365269462e300,6.601197604790419e300,6.611077844311377e300,6.620958083832336e300,6.630838323353294e300,6.640718562874252e300,6.65059880239521e300,6.660479041916168e300,6.670359281437127e300,6.680239520958083e300,6.690119760479042e300,6.7e300,6.709880239520959e300,6.719760479041916e300,6.729640718562874e300,6.739520958083833e300,6.74940119760479e300,6.759281437125748e300,6.769161676646706e300,6.779041916167665e300,6.788922155688623e300,6.79880239520958e300,6.80868263473054e300,6.818562874251498e300,6.828443113772457e300,6.838323353293413e300,6.848203592814372e300,6.85808383233533e300,6.867964071856288e300,6.877844311377247e300,6.887724550898204e300,6.897604790419163e300,6.90748502994012e300,6.91736526946108e300,6.927245508982036e300,6.937125748502994e300,6.947005988023953e300,6.956886227544911e300,6.966766467065869e300,6.976646706586826e300,6.986526946107786e300,6.996407185628743e300,7.0062874251497e300,7.016167664670659e300,7.026047904191617e300,7.035928143712576e300,7.045808383233533e300,7.05568862275449e300,7.065568862275449e300,7.075449101796407e300,7.085329341317365e300,7.095209580838323e300,7.105089820359282e300,7.114970059880241e300,7.124850299401198e300,7.134730538922157e300,7.144610778443114e300,7.154491017964073e300,7.16437125748503e300,7.174251497005989e300,7.184131736526947e300,7.194011976047905e300,7.203892215568863e300,7.21377245508982e300,7.22365269461078e300,7.233532934131737e300,7.243413173652695e300,7.253293413173653e300,7.263173652694611e300,7.27305389221557e300,7.282934131736526e300,7.292814371257485e300,7.302694610778443e300,7.312574850299402e300,7.322455089820359e300,7.332335329341317e300,7.342215568862276e300,7.352095808383234e300,7.361976047904191e300,7.371856287425149e300,7.381736526946108e300,7.391616766467066e300,7.401497005988023e300,7.411377245508982e300,7.421257485029941e300,7.4311377245509e300,7.441017964071857e300,7.450898203592816e300,7.460778443113773e300,7.470658682634731e300,7.480538922155689e300,7.490419161676647e300,7.500299401197606e300,7.510179640718564e300,7.520059880239522e300,7.529940119760479e300,7.539820359281437e300,7.549700598802396e300,7.559580838323353e300,7.569461077844312e300,7.57934131736527e300,7.589221556886229e300,7.599101796407185e300,7.608982035928143e300,7.618862275449102e300,7.62874251497006e300,7.638622754491018e300,7.648502994011976e300,7.658383233532934e300,7.668263473053893e300,7.678143712574849e300,7.688023952095808e300,7.697904191616766e300,7.707784431137725e300,7.717664670658684e300,7.727544910179641e300,7.7374251497006e300,7.747305389221558e300,7.757185628742517e300,7.767065868263473e300,7.776946107784432e300,7.78682634730539e300,7.796706586826348e300,7.806586826347306e300,7.816467065868264e300,7.826347305389223e300,7.83622754491018e300,7.846107784431138e300,7.855988023952096e300,7.865868263473054e300,7.875748502994013e300,7.88562874251497e300,7.895508982035929e300,7.905389221556887e300,7.915269461077846e300,7.925149700598802e300,7.93502994011976e300,7.944910179640719e300,7.954790419161677e300,7.964670658682635e300,7.974550898203593e300,7.984431137724552e300,7.994311377245509e300,8.004191616766466e300,8.014071856287425e300,8.023952095808384e300,8.033832335329343e300,8.0437125748503e300,8.053592814371259e300,8.063473053892217e300,8.073353293413174e300,8.083233532934132e300,8.09311377245509e300,8.102994011976049e300,8.112874251497007e300,8.122754491017965e300,8.132634730538923e300,8.14251497005988e300,8.15239520958084e300,8.162275449101796e300,8.172155688622755e300,8.182035928143713e300,8.191916167664672e300,8.201796407185629e300,8.211676646706586e300,8.221556886227545e300,8.231437125748503e300,8.241317365269461e300,8.251197604790419e300,8.261077844311378e300,8.270958083832336e300,8.280838323353292e300,8.290718562874252e300,8.300598802395209e300,8.310479041916168e300,8.320359281437125e300,8.330239520958085e300,8.340119760479043e300,8.350000000000001e300,8.359880239520959e300,8.369760479041917e300,8.379640718562876e300,8.389520958083833e300,8.39940119760479e300,8.409281437125749e300,8.419161676646707e300,8.429041916167666e300,8.438922155688623e300,8.448802395209582e300,8.45868263473054e300,8.468562874251497e300,8.478443113772455e300,8.488323353293413e300,8.498203592814372e300,8.50808383233533e300,8.517964071856288e300,8.527844311377245e300,8.537724550898203e300,8.547604790419162e300,8.55748502994012e300,8.567365269461078e300,8.577245508982036e300,8.587125748502995e300,8.597005988023953e300,8.606886227544909e300,8.616766467065868e300,8.626646706586826e300,8.636526946107786e300,8.646407185628743e300,8.656287425149702e300,8.66616766467066e300,8.676047904191618e300,8.685928143712576e300,8.695808383233533e300,8.705688622754492e300,8.71556886227545e300,8.725449101796408e300,8.735329341317366e300,8.745209580838324e300,8.755089820359283e300,8.764970059880239e300,8.774850299401198e300,8.784730538922156e300,8.794610778443115e300,8.804491017964072e300,8.81437125748503e300,8.824251497005989e300,8.834131736526947e300,8.844011976047904e300,8.853892215568862e300,8.863772455089821e300,8.873652694610779e300,8.883532934131736e300,8.893413173652695e300,8.903293413173653e300,8.913173652694612e300,8.923053892215568e300,8.932934131736526e300,8.942814371257486e300,8.952694610778444e300,8.962574850299402e300,8.97245508982036e300,8.982335329341319e300,8.992215568862277e300,9.002095808383233e300,9.011976047904192e300,9.02185628742515e300,9.031736526946109e300,9.041616766467066e300,9.051497005988025e300,9.061377245508983e300,9.07125748502994e300,9.081137724550898e300,9.091017964071856e300,9.100898203592815e300,9.110778443113773e300,9.120658682634731e300,9.130538922155689e300,9.140419161676647e300,9.150299401197606e300,9.160179640718562e300,9.170059880239521e300,9.179940119760479e300,9.189820359281438e300,9.199700598802395e300,9.209580838323353e300,9.219461077844312e300,9.229341317365269e300,9.239221556886228e300,9.249101796407186e300,9.258982035928145e300,9.268862275449103e300,9.27874251497006e300,9.288622754491019e300,9.298502994011977e300,9.308383233532936e300,9.318263473053892e300,9.328143712574851e300,9.338023952095809e300,9.347904191616767e300,9.357784431137725e300,9.367664670658683e300,9.377544910179642e300,9.3874251497006e300,9.397305389221558e300,9.407185628742515e300,9.417065868263473e300,9.426946107784432e300,9.43682634730539e300,9.446706586826348e300,9.456586826347305e300,9.466467065868264e300,9.476347305389222e300,9.486227544910179e300,9.496107784431138e300,9.505988023952096e300,9.515868263473055e300,9.525748502994011e300,9.53562874251497e300,9.54550898203593e300,9.555389221556887e300,9.565269461077845e300,9.575149700598803e300,9.585029940119762e300,9.59491017964072e300,9.604790419161678e300,9.614670658682636e300,9.624550898203593e300,9.634431137724552e300,9.644311377245509e300,9.654191616766468e300,9.664071856287426e300,9.673952095808385e300,9.683832335329342e300,9.693712574850299e300,9.703592814371258e300,9.713473053892216e300,9.723353293413174e300,9.733233532934132e300,9.74311377245509e300,9.752994011976049e300,9.762874251497005e300,9.772754491017964e300,9.782634730538922e300,9.792514970059881e300,9.802395209580838e300,9.812275449101796e300,9.822155688622755e300,9.832035928143713e300,9.84191616766467e300,9.85179640718563e300,9.861676646706588e300,9.871556886227546e300,9.881437125748503e300,9.891317365269462e300,9.90119760479042e300,9.911077844311379e300,9.920958083832335e300,9.930838323353295e300,9.940718562874252e300,9.95059880239521e300,9.960479041916168e300,9.970359281437126e300,9.980239520958085e300,9.990119760479043e300,1.0e301],"x":[1.0e299,1.098802395209581e299,1.1976047904191617e299,1.2964071856287425e299,1.3952095808383234e299,1.4940119760479043e299,1.592814371257485e299,1.691616766467066e299,1.7904191616766467e299,1.8892215568862276e299,1.9880239520958086e299,2.0868263473053895e299,2.18562874251497e299,2.2844311377245513e299,2.383233532934132e299,2.482035928143713e299,2.5808383233532934e299,2.6796407185628743e299,2.7784431137724556e299,2.8772455089820358e299,2.976047904191617e299,3.0748502994011976e299,3.1736526946107786e299,3.2724550898203595e299,3.37125748502994e299,3.470059880239521e299,3.568862275449102e299,3.667664670658683e299,3.7664670658682645e299,3.865269461077844e299,3.964071856287425e299,4.062874251497006e299,4.1616766467065875e299,4.260479041916168e299,4.3592814371257486e299,4.45808383233533e299,4.5568862275449104e299,4.655688622754492e299,4.754491017964072e299,4.8532934131736536e299,4.952095808383233e299,5.050898203592815e299,5.149700598802395e299,5.2485029940119765e299,5.347305389221557e299,5.446107784431138e299,5.544910179640718e299,5.6437125748502995e299,5.74251497005988e299,5.841317365269461e299,5.940119760479043e299,6.038922155688623e299,6.137724550898203e299,6.236526946107784e299,6.3353293413173656e299,6.434131736526947e299,6.532934131736528e299,6.631736526946108e299,6.730538922155689e299,6.82934131736527e299,6.928143712574851e299,7.026946107784431e299,7.125748502994012e299,7.224550898203594e299,7.323353293413175e299,7.422155688622755e299,7.520958083832334e299,7.619760479041917e299,7.718562874251497e299,7.81736526946108e299,7.91616766467066e299,8.01497005988024e299,8.113772455089821e299,8.212574850299402e299,8.311377245508983e299,8.410179640718563e299,8.508982035928146e299,8.607784431137726e299,8.706586826347306e299,8.805389221556887e299,8.904191616766467e299,9.00299401197605e299,9.10179640718563e299,9.200598802395209e299,9.299401197604792e299,9.398203592814372e299,9.497005988023953e299,9.595808383233533e299,9.694610778443114e299,9.793413173652695e299,9.892215568862275e299,9.991017964071857e299,1.0089820359281438e300,1.0188622754491019e300,1.0287425149700599e300,1.0386227544910179e300,1.0485029940119762e300,1.0583832335329341e300,1.0682634730538923e300,1.0781437125748502e300,1.0880239520958084e300,1.0979041916167665e300,1.1077844311377245e300,1.1176646706586826e300,1.1275449101796407e300,1.1374251497005987e300,1.1473053892215569e300,1.157185628742515e300,1.1670658682634733e300,1.1769461077844312e300,1.1868263473053894e300,1.1967065868263475e300,1.2065868263473055e300,1.2164670658682636e300,1.2263473053892216e300,1.2362275449101799e300,1.2461077844311379e300,1.2559880239520958e300,1.265868263473054e300,1.2757485029940121e300,1.2856287425149702e300,1.2955089820359282e300,1.3053892215568862e300,1.3152694610778445e300,1.3251497005988024e300,1.3350299401197606e300,1.3449101796407187e300,1.3547904191616768e300,1.3646706586826347e300,1.3745508982035928e300,1.384431137724551e300,1.394311377245509e300,1.404191616766467e300,1.4140718562874253e300,1.4239520958083834e300,1.4338323353293413e300,1.4437125748502994e300,1.4535928143712575e300,1.463473053892216e300,1.4733532934131738e300,1.483233532934132e300,1.49311377245509e300,1.502994011976048e300,1.512874251497006e300,1.5227544910179644e300,1.5326347305389223e300,1.5425149700598804e300,1.5523952095808385e300,1.5622754491017967e300,1.5721556886227545e300,1.5820359281437126e300,1.5919161676646708e300,1.601796407185629e300,1.611676646706587e300,1.621556886227545e300,1.6314371257485033e300,1.641317365269461e300,1.6511976047904192e300,1.6610778443113774e300,1.6709580838323355e300,1.6808383233532936e300,1.6907185628742518e300,1.7005988023952096e300,1.7104790419161677e300,1.7203592814371259e300,1.730239520958084e300,1.7401197604790418e300,1.7500000000000002e300,1.7598802395209584e300,1.7697604790419162e300,1.7796407185628743e300,1.7895209580838325e300,1.7994011976047906e300,1.8092814371257484e300,1.8191616766467066e300,1.829041916167665e300,1.8389221556886228e300,1.848802395209581e300,1.858682634730539e300,1.868562874251497e300,1.878443113772455e300,1.8883233532934132e300,1.8982035928143716e300,1.9080838323353294e300,1.9179640718562876e300,1.9278443113772457e300,1.9377245508982035e300,1.9476047904191616e300,1.9574850299401198e300,1.967365269461078e300,1.977245508982036e300,1.9871257485029942e300,1.9970059880239523e300,2.00688622754491e300,2.0167664670658683e300,2.0266467065868264e300,2.0365269461077842e300,2.0464071856287423e300,2.0562874251497008e300,2.066167664670659e300,2.0760479041916167e300,2.085928143712575e300,2.095808383233533e300,2.1056886227544908e300,2.115568862275449e300,2.125449101796407e300,2.1353293413173655e300,2.1452095808383233e300,2.1550898203592815e300,2.1649700598802396e300,2.1748502994011974e300,2.1847305389221556e300,2.1946107784431137e300,2.2044910179640718e300,2.2143712574850303e300,2.2242514970059884e300,2.2341317365269465e300,2.2440119760479043e300,2.2538922155688625e300,2.2637724550898206e300,2.2736526946107784e300,2.283532934131737e300,2.293413173652695e300,2.303293413173653e300,2.313173652694611e300,2.323053892215569e300,2.3329341317365272e300,2.342814371257485e300,2.3526946107784432e300,2.3625748502994016e300,2.3724550898203594e300,2.3823353293413176e300,2.3922155688622757e300,2.4020958083832338e300,2.4119760479041917e300,2.4218562874251498e300,2.4317365269461082e300,2.441616766467066e300,2.4514970059880242e300,2.4613772455089823e300,2.4712574850299404e300,2.4811377245508983e300,2.4910179640718564e300,2.5008982035928145e300,2.5107784431137727e300,2.5206586826347308e300,2.530538922155689e300,2.5404191616766468e300,2.550299401197605e300,2.560179640718563e300,2.570059880239521e300,2.579940119760479e300,2.5898203592814374e300,2.5997005988023955e300,2.6095808383233534e300,2.6194610778443115e300,2.6293413173652696e300,2.6392215568862278e300,2.6491017964071856e300,2.658982035928144e300,2.668862275449102e300,2.67874251497006e300,2.6886227544910184e300,2.698502994011976e300,2.708383233532934e300,2.7182634730538925e300,2.7281437125748503e300,2.738023952095808e300,2.7479041916167666e300,2.7577844311377244e300,2.767664670658683e300,2.777544910179641e300,2.787425149700599e300,2.797305389221557e300,2.807185628742515e300,2.817065868263473e300,2.8269461077844316e300,2.8368263473053895e300,2.846706586826348e300,2.856586826347306e300,2.8664670658682636e300,2.8763473053892214e300,2.88622754491018e300,2.8961077844311376e300,2.905988023952096e300,2.915868263473054e300,2.925748502994012e300,2.93562874251497e300,2.9455089820359286e300,2.9553892215568864e300,2.965269461077845e300,2.9751497005988027e300,2.985029940119761e300,2.9949101796407183e300,3.004790419161677e300,3.0146706586826346e300,3.024550898203593e300,3.034431137724551e300,3.044311377245509e300,3.054191616766467e300,3.064071856287425e300,3.073952095808383e300,3.083832335329342e300,3.0937125748502996e300,3.103592814371258e300,3.113473053892216e300,3.1233532934131743e300,3.1332335329341316e300,3.14311377245509e300,3.152994011976048e300,3.162874251497006e300,3.172754491017964e300,3.1826347305389225e300,3.1925149700598803e300,3.202395209580838e300,3.212275449101796e300,3.2221556886227544e300,3.232035928143713e300,3.241916167664671e300,3.251796407185629e300,3.261676646706587e300,3.271556886227545e300,3.281437125748503e300,3.291317365269461e300,3.3011976047904195e300,3.3110778443113773e300,3.320958083832336e300,3.330838323353293e300,3.3407185628742514e300,3.350598802395209e300,3.3604790419161677e300,3.3703592814371255e300,3.380239520958084e300,3.3901197604790423e300,3.4e300,3.409880239520958e300,3.4197604790419164e300,3.429640718562874e300,3.4395209580838327e300,3.4494011976047905e300,3.459281437125749e300,3.469161676646706e300,3.4790419161676646e300,3.488922155688623e300,3.498802395209581e300,3.5086826347305393e300,3.518562874251497e300,3.5284431137724556e300,3.5383233532934134e300,3.548203592814372e300,3.5580838323353297e300,3.567964071856288e300,3.577844311377246e300,3.5877245508982043e300,3.5976047904191616e300,3.60748502994012e300,3.617365269461078e300,3.627245508982036e300,3.637125748502994e300,3.6470059880239525e300,3.6568862275449104e300,3.666766467065868e300,3.676646706586826e300,3.686526946107785e300,3.696407185628743e300,3.7062874251497013e300,3.716167664670659e300,3.7260479041916176e300,3.735928143712575e300,3.745808383233533e300,3.755688622754491e300,3.7655688622754495e300,3.7754491017964073e300,3.785329341317366e300,3.7952095808383236e300,3.8050898203592814e300,3.814970059880239e300,3.8248502994011977e300,3.8347305389221555e300,3.8446107784431145e300,3.8544910179640724e300,3.864371257485031e300,3.874251497005988e300,3.8841317365269465e300,3.894011976047904e300,3.903892215568863e300,3.9137724550898205e300,3.923652694610779e300,3.933532934131736e300,3.9434131736526946e300,3.9532934131736525e300,3.963173652694611e300,3.973053892215569e300,3.982934131736527e300,3.9928143712574856e300,4.0026946107784434e300,4.012574850299401e300,4.0224550898203597e300,4.0323353293413175e300,4.042215568862276e300,4.052095808383234e300,4.061976047904192e300,4.0718562874251494e300,4.081736526946108e300,4.0916167664670657e300,4.101497005988024e300,4.111377245508982e300,4.1212574850299404e300,4.131137724550898e300,4.141017964071856e300,4.1508982035928145e300,4.160778443113773e300,4.170658682634731e300,4.180538922155689e300,4.190419161676647e300,4.2002994011976054e300,4.2101796407185627e300,4.220059880239521e300,4.229940119760479e300,4.2398203592814373e300,4.249700598802395e300,4.2595808383233536e300,4.269461077844311e300,4.279341317365269e300,4.289221556886227e300,4.299101796407186e300,4.308982035928144e300,4.3188622754491024e300,4.328742514970061e300,4.338622754491018e300,4.3485029940119765e300,4.3583832335329343e300,4.368263473053893e300,4.3781437125748506e300,4.388023952095809e300,4.397904191616767e300,4.4077844311377247e300,4.4176646706586825e300,4.427544910179641e300,4.437425149700599e300,4.447305389221557e300,4.4571856287425156e300,4.467065868263474e300,4.476946107784431e300,4.4868263473053897e300,4.4967065868263475e300,4.506586826347306e300,4.516467065868264e300,4.526347305389222e300,4.5362275449101795e300,4.546107784431138e300,4.555988023952096e300,4.565868263473054e300,4.575748502994012e300,4.5856287425149704e300,4.595508982035928e300,4.6053892215568867e300,4.6152694610778445e300,4.625149700598803e300,4.635029940119761e300,4.644910179640719e300,4.654790419161677e300,4.6646706586826354e300,4.6745508982035927e300,4.684431137724551e300,4.694311377245509e300,4.7041916167664674e300,4.714071856287425e300,4.7239520958083836e300,4.7338323353293415e300,4.743712574850299e300,4.753592814371258e300,4.763473053892216e300,4.773353293413174e300,4.7832335329341324e300,4.79311377245509e300,4.8029940119760487e300,4.812874251497006e300,4.8227544910179643e300,4.832634730538922e300,4.8425149700598806e300,4.8523952095808384e300,4.862275449101797e300,4.872155688622754e300,4.8820359281437125e300,4.8919161676646703e300,4.901796407185629e300,4.911676646706587e300,4.9215568862275456e300,4.9314371257485035e300,4.941317365269461e300,4.951197604790419e300,4.9610778443113775e300,4.9709580838323354e300,4.980838323353294e300,4.9907185628742516e300,5.00059880239521e300,5.0104790419161673e300,5.020359281437126e300,5.0302395209580836e300,5.040119760479042e300,5.05e300,5.059880239520959e300,5.0697604790419167e300,5.0796407185628745e300,5.0895209580838323e300,5.099401197604791e300,5.1092814371257486e300,5.119161676646707e300,5.129041916167665e300,5.138922155688623e300,5.1488023952095805e300,5.158682634730539e300,5.1685628742514974e300,5.178443113772455e300,5.1883233532934136e300,5.1982035928143715e300,5.2080838323353305e300,5.217964071856288e300,5.227844311377246e300,5.237724550898204e300,5.2476047904191624e300,5.25748502994012e300,5.2673652694610787e300,5.277245508982036e300,5.2871257485029943e300,5.297005988023952e300,5.3068862275449106e300,5.3167664670658684e300,5.326646706586827e300,5.3365269461077847e300,5.3464071856287425e300,5.3562874251497004e300,5.366167664670659e300,5.376047904191617e300,5.385928143712575e300,5.395808383233533e300,5.405688622754492e300,5.41556886227545e300,5.425449101796408e300,5.435329341317365e300,5.445209580838323e300,5.455089820359281e300,5.46497005988024e300,5.474850299401198e300,5.484730538922157e300,5.494610778443114e300,5.504491017964073e300,5.51437125748503e300,5.524251497005987e300,5.534131736526946e300,5.544011976047904e300,5.553892215568863e300,5.56377245508982e300,5.573652694610779e300,5.583532934131736e300,5.593413173652695e300,5.603293413173653e300,5.613173652694611e300,5.62305389221557e300,5.632934131736528e300,5.642814371257486e300,5.652694610778444e300,5.662574850299401e300,5.67245508982036e300,5.682335329341317e300,5.692215568862276e300,5.702095808383234e300,5.711976047904193e300,5.72185628742515e300,5.731736526946108e300,5.741616766467067e300,5.751497005988024e300,5.761377245508982e300,5.77125748502994e300,5.781137724550898e300,5.791017964071857e300,5.800898203592814e300,5.810778443113773e300,5.82065868263473e300,5.830538922155689e300,5.840419161676646e300,5.850299401197604e300,5.860179640718563e300,5.870059880239521e300,5.879940119760479e300,5.889820359281436e300,5.899700598802397e300,5.909580838323354e300,5.919461077844311e300,5.92934131736527e300,5.939221556886228e300,5.949101796407187e300,5.958982035928144e300,5.968862275449103e300,5.97874251497006e300,5.988622754491018e300,5.998502994011976e300,6.008383233532934e300,6.018263473053893e300,6.028143712574851e300,6.03802395209581e300,6.047904191616766e300,6.057784431137724e300,6.067664670658683e300,6.077544910179641e300,6.087425149700599e300,6.097305389221557e300,6.107185628742516e300,6.117065868263474e300,6.12694610778443e300,6.136826347305389e300,6.146706586826347e300,6.156586826347306e300,6.166467065868263e300,6.176347305389222e300,6.18622754491018e300,6.196107784431138e300,6.205988023952097e300,6.215868263473054e300,6.225748502994013e300,6.235628742514971e300,6.245508982035929e300,6.255389221556887e300,6.265269461077845e300,6.275149700598804e300,6.28502994011976e300,6.29491017964072e300,6.304790419161677e300,6.314670658682636e300,6.324550898203593e300,6.334431137724551e300,6.34431137724551e300,6.354191616766468e300,6.364071856287425e300,6.373952095808383e300,6.383832335329341e300,6.3937125748503e300,6.403592814371257e300,6.413473053892216e300,6.423353293413174e300,6.433233532934133e300,6.443113772455089e300,6.452994011976047e300,6.462874251497006e300,6.472754491017964e300,6.482634730538922e300,6.49251497005988e300,6.50239520958084e300,6.512275449101798e300,6.522155688622754e300,6.532035928143713e300,6.541916167664671e300,6.55179640718563e300,6.561676646706587e300,6.571556886227546e300,6.581437125748504e300,6.591317365269462e300,6.601197604790419e300,6.611077844311377e300,6.620958083832336e300,6.630838323353294e300,6.640718562874252e300,6.65059880239521e300,6.660479041916168e300,6.670359281437127e300,6.680239520958083e300,6.690119760479042e300,6.7e300,6.709880239520959e300,6.719760479041916e300,6.729640718562874e300,6.739520958083833e300,6.74940119760479e300,6.759281437125748e300,6.769161676646706e300,6.779041916167665e300,6.788922155688623e300,6.79880239520958e300,6.80868263473054e300,6.818562874251498e300,6.828443113772457e300,6.838323353293413e300,6.848203592814372e300,6.85808383233533e300,6.867964071856288e300,6.877844311377247e300,6.887724550898204e300,6.897604790419163e300,6.90748502994012e300,6.91736526946108e300,6.927245508982036e300,6.937125748502994e300,6.947005988023953e300,6.956886227544911e300,6.966766467065869e300,6.976646706586826e300,6.986526946107786e300,6.996407185628743e300,7.0062874251497e300,7.016167664670659e300,7.026047904191617e300,7.035928143712576e300,7.045808383233533e300,7.05568862275449e300,7.065568862275449e300,7.075449101796407e300,7.085329341317365e300,7.095209580838323e300,7.105089820359282e300,7.114970059880241e300,7.124850299401198e300,7.134730538922157e300,7.144610778443114e300,7.154491017964073e300,7.16437125748503e300,7.174251497005989e300,7.184131736526947e300,7.194011976047905e300,7.203892215568863e300,7.21377245508982e300,7.22365269461078e300,7.233532934131737e300,7.243413173652695e300,7.253293413173653e300,7.263173652694611e300,7.27305389221557e300,7.282934131736526e300,7.292814371257485e300,7.302694610778443e300,7.312574850299402e300,7.322455089820359e300,7.332335329341317e300,7.342215568862276e300,7.352095808383234e300,7.361976047904191e300,7.371856287425149e300,7.381736526946108e300,7.391616766467066e300,7.401497005988023e300,7.411377245508982e300,7.421257485029941e300,7.4311377245509e300,7.441017964071857e300,7.450898203592816e300,7.460778443113773e300,7.470658682634731e300,7.480538922155689e300,7.490419161676647e300,7.500299401197606e300,7.510179640718564e300,7.520059880239522e300,7.529940119760479e300,7.539820359281437e300,7.549700598802396e300,7.559580838323353e300,7.569461077844312e300,7.57934131736527e300,7.589221556886229e300,7.599101796407185e300,7.608982035928143e300,7.618862275449102e300,7.62874251497006e300,7.638622754491018e300,7.648502994011976e300,7.658383233532934e300,7.668263473053893e300,7.678143712574849e300,7.688023952095808e300,7.697904191616766e300,7.707784431137725e300,7.717664670658684e300,7.727544910179641e300,7.7374251497006e300,7.747305389221558e300,7.757185628742517e300,7.767065868263473e300,7.776946107784432e300,7.78682634730539e300,7.796706586826348e300,7.806586826347306e300,7.816467065868264e300,7.826347305389223e300,7.83622754491018e300,7.846107784431138e300,7.855988023952096e300,7.865868263473054e300,7.875748502994013e300,7.88562874251497e300,7.895508982035929e300,7.905389221556887e300,7.915269461077846e300,7.925149700598802e300,7.93502994011976e300,7.944910179640719e300,7.954790419161677e300,7.964670658682635e300,7.974550898203593e300,7.984431137724552e300,7.994311377245509e300,8.004191616766466e300,8.014071856287425e300,8.023952095808384e300,8.033832335329343e300,8.0437125748503e300,8.053592814371259e300,8.063473053892217e300,8.073353293413174e300,8.083233532934132e300,8.09311377245509e300,8.102994011976049e300,8.112874251497007e300,8.122754491017965e300,8.132634730538923e300,8.14251497005988e300,8.15239520958084e300,8.162275449101796e300,8.172155688622755e300,8.182035928143713e300,8.191916167664672e300,8.201796407185629e300,8.211676646706586e300,8.221556886227545e300,8.231437125748503e300,8.241317365269461e300,8.251197604790419e300,8.261077844311378e300,8.270958083832336e300,8.280838323353292e300,8.290718562874252e300,8.300598802395209e300,8.310479041916168e300,8.320359281437125e300,8.330239520958085e300,8.340119760479043e300,8.350000000000001e300,8.359880239520959e300,8.369760479041917e300,8.379640718562876e300,8.389520958083833e300,8.39940119760479e300,8.409281437125749e300,8.419161676646707e300,8.429041916167666e300,8.438922155688623e300,8.448802395209582e300,8.45868263473054e300,8.468562874251497e300,8.478443113772455e300,8.488323353293413e300,8.498203592814372e300,8.50808383233533e300,8.517964071856288e300,8.527844311377245e300,8.537724550898203e300,8.547604790419162e300,8.55748502994012e300,8.567365269461078e300,8.577245508982036e300,8.587125748502995e300,8.597005988023953e300,8.606886227544909e300,8.616766467065868e300,8.626646706586826e300,8.636526946107786e300,8.646407185628743e300,8.656287425149702e300,8.66616766467066e300,8.676047904191618e300,8.685928143712576e300,8.695808383233533e300,8.705688622754492e300,8.71556886227545e300,8.725449101796408e300,8.735329341317366e300,8.745209580838324e300,8.755089820359283e300,8.764970059880239e300,8.774850299401198e300,8.784730538922156e300,8.794610778443115e300,8.804491017964072e300,8.81437125748503e300,8.824251497005989e300,8.834131736526947e300,8.844011976047904e300,8.853892215568862e300,8.863772455089821e300,8.873652694610779e300,8.883532934131736e300,8.893413173652695e300,8.903293413173653e300,8.913173652694612e300,8.923053892215568e300,8.932934131736526e300,8.942814371257486e300,8.952694610778444e300,8.962574850299402e300,8.97245508982036e300,8.982335329341319e300,8.992215568862277e300,9.002095808383233e300,9.011976047904192e300,9.02185628742515e300,9.031736526946109e300,9.041616766467066e300,9.051497005988025e300,9.061377245508983e300,9.07125748502994e300,9.081137724550898e300,9.091017964071856e300,9.100898203592815e300,9.110778443113773e300,9.120658682634731e300,9.130538922155689e300,9.140419161676647e300,9.150299401197606e300,9.160179640718562e300,9.170059880239521e300,9.179940119760479e300,9.189820359281438e300,9.199700598802395e300,9.209580838323353e300,9.219461077844312e300,9.229341317365269e300,9.239221556886228e300,9.249101796407186e300,9.258982035928145e300,9.268862275449103e300,9.27874251497006e300,9.288622754491019e300,9.298502994011977e300,9.308383233532936e300,9.318263473053892e300,9.328143712574851e300,9.338023952095809e300,9.347904191616767e300,9.357784431137725e300,9.367664670658683e300,9.377544910179642e300,9.3874251497006e300,9.397305389221558e300,9.407185628742515e300,9.417065868263473e300,9.426946107784432e300,9.43682634730539e300,9.446706586826348e300,9.456586826347305e300,9.466467065868264e300,9.476347305389222e300,9.486227544910179e300,9.496107784431138e300,9.505988023952096e300,9.515868263473055e300,9.525748502994011e300,9.53562874251497e300,9.54550898203593e300,9.555389221556887e300,9.565269461077845e300,9.575149700598803e300,9.585029940119762e300,9.59491017964072e300,9.604790419161678e300,9.614670658682636e300,9.624550898203593e300,9.634431137724552e300,9.644311377245509e300,9.654191616766468e300,9.664071856287426e300,9.673952095808385e300,9.683832335329342e300,9.693712574850299e300,9.703592814371258e300,9.713473053892216e300,9.723353293413174e300,9.733233532934132e300,9.74311377245509e300,9.752994011976049e300,9.762874251497005e300,9.772754491017964e300,9.782634730538922e300,9.792514970059881e300,9.802395209580838e300,9.812275449101796e300,9.822155688622755e300,9.832035928143713e300,9.84191616766467e300,9.85179640718563e300,9.861676646706588e300,9.871556886227546e300,9.881437125748503e300,9.891317365269462e300,9.90119760479042e300,9.911077844311379e300,9.920958083832335e300,9.930838323353295e300,9.940718562874252e300,9.95059880239521e300,9.960479041916168e300,9.970359281437126e300,9.980239520958085e300,9.990119760479043e300,1.0e301]}

},{}],80:[function(require,module,exports){
module.exports={"frac":[0.0,0.724609375,0.44921875,0.173828125,0.8984375,0.623046875,0.34765625,0.072265625,0.796875,0.51953125,0.24609375,0.96875,0.6953125,0.41796875,0.14453125,0.8671875,0.59375,0.3203125,0.0390625,0.765625,0.4921875,0.21875,0.9375,0.6640625,0.390625,0.1171875,0.8359375,0.5625,0.2890625,0.015625,0.734375,0.4609375,0.1875,0.90625,0.640625,0.359375,0.078125,0.8125,0.53125,0.25,0.984375,0.703125,0.4375,0.15625,0.875,0.609375,0.328125,0.046875,0.78125,0.5,0.234375,0.953125,0.671875,0.40625,0.125,0.84375,0.578125,0.296875,0.03125,0.75,0.46875,0.203125,0.921875,0.65625,0.375,0.09375,0.8125,0.53125,0.28125,0.0,0.71875,0.4375,0.15625,0.90625,0.625,0.34375,0.0625,0.78125,0.5,0.25,0.96875,0.6875,0.40625,0.125,0.875,0.59375,0.3125,0.03125,0.75,0.5,0.21875,0.9375,0.65625,0.375,0.09375,0.84375,0.5625,0.28125,0.0,0.71875,0.46875,0.1875,0.90625,0.625,0.34375,0.0625,0.8125,0.53125,0.25,0.96875,0.6875,0.4375,0.15625,0.875,0.59375,0.3125,0.0625,0.78125,0.5,0.21875,0.9375,0.65625,0.40625,0.125,0.84375,0.5625,0.3125,0.0,0.75,0.4375,0.1875,0.9375,0.625,0.375,0.0625,0.8125,0.5625,0.25,0.0,0.6875,0.4375,0.1875,0.875,0.625,0.3125,0.0625,0.8125,0.5,0.25,0.9375,0.6875,0.4375,0.125,0.875,0.5625,0.3125,0.0,0.75,0.5,0.1875,0.9375,0.625,0.375,0.125,0.8125,0.5625,0.25,0.0,0.75,0.4375,0.1875,0.875,0.625,0.375,0.0625,0.8125,0.5,0.25,0.0,0.6875,0.4375,0.125,0.875,0.5625,0.3125,0.0625,0.75,0.5,0.1875,0.9375,0.6875,0.375,0.125,0.8125,0.5625,0.3125,0.0,0.75,0.4375,0.1875,0.9375,0.625,0.375,0.0625,0.8125,0.5625,0.25,0.0,0.6875,0.4375,0.125,0.875,0.625,0.3125,0.0625,0.75,0.5,0.25,0.9375,0.6875,0.375,0.125,0.875,0.5625,0.3125,0.0,0.75,0.5,0.1875,0.9375,0.625,0.375,0.125,0.8125,0.5625,0.25,0.0,0.6875,0.4375,0.1875,0.875,0.625,0.3125,0.0625,0.8125,0.5,0.25,0.9375,0.6875,0.4375,0.125,0.875,0.625,0.25,0.0,0.75,0.5,0.25,0.875,0.625,0.375,0.125,0.875,0.5,0.25,0.0,0.75,0.5,0.125,0.875,0.625,0.375,0.125,0.75,0.5,0.25,0.0,0.75,0.375,0.125,0.875,0.625,0.375,0.0,0.75,0.5,0.25,0.0,0.625,0.375,0.125,0.875,0.625,0.25,0.0,0.75,0.5,0.25,0.875,0.625,0.375,0.125,0.875,0.5,0.25,0.0,0.75,0.375,0.125,0.875,0.625,0.375,0.0,0.75,0.5,0.25,0.0,0.625,0.375,0.125,0.875,0.625,0.25,0.0,0.75,0.5,0.25,0.875,0.625,0.375,0.125,0.875,0.5,0.25,0.0,0.75,0.5,0.125,0.875,0.625,0.375,0.125,0.75,0.5,0.25,0.0,0.75,0.375,0.125,0.875,0.625,0.375,0.0,0.75,0.5,0.25,0.0,0.625,0.375,0.125,0.875,0.625,0.25,0.0,0.75,0.5,0.125,0.875,0.625,0.375,0.125,0.75,0.5,0.25,0.0,0.75,0.375,0.125,0.875,0.625,0.375,0.0,0.75,0.5,0.25,0.0,0.625,0.375,0.125,0.875,0.625,0.25,0.0,0.75,0.5,0.25,0.875,0.625,0.375,0.125,0.875,0.5,0.25,0.0,0.75,0.5,0.125,0.875,0.625,0.375,0.125,0.75,0.5,0.25,0.0,0.75,0.375,0.125,0.875,0.625,0.25,0.0,0.75,0.5,0.25,0.875,0.625,0.375,0.125,0.875,0.5,0.25,0.0,0.75,0.5,0.125,0.875,0.625,0.375,0.125,0.75,0.5,0.25,0.0,0.75,0.375,0.125,0.875,0.625,0.375,0.0,0.75,0.5,0.25,0.0,0.625,0.375,0.125,0.875,0.625,0.25,0.0,0.75,0.5,0.25,0.875,0.625,0.375,0.125,0.875,0.5,0.25,0.0,0.75,0.375,0.125,0.875,0.625,0.375,0.0,0.75,0.5,0.25,0.0,0.625,0.375,0.125,0.875,0.625,0.25,0.0,0.75,0.5,0.25,0.875,0.625,0.375,0.125,0.875,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.5,0.0,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.5,0.0,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.5,0.0,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.5,0.0,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.5,0.0,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.5,0.0,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.5,0.0,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.5,0.0,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.5,0.0,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.5,0.0,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.5,0.0,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.75,0.5,0.25,0.0,0.75,0.5,0.25,0.0,0.75,0.5,0.0,0.75,0.5,0.25,0.0],"integral":[2.097152e6,2.247307298337e12,4.494612499523e12,6.741917700709e12,8.989222901894e12,1.123652810308e13,1.3483833304266e13,1.5731138505452e13,1.7978443706637e13,2.0225748907823e13,2.2473054109009e13,2.4720359310194e13,2.696766451138e13,2.9214969712566e13,3.1462274913752e13,3.3709580114937e13,3.5956885316123e13,3.8204190517309e13,4.0451495718495e13,4.269880091968e13,4.4946106120866e13,4.7193411322052e13,4.9440716523237e13,5.1688021724423e13,5.3935326925609e13,5.6182632126795e13,5.842993732798e13,6.0677242529166e13,6.2924547730352e13,6.5171852931538e13,6.7419158132723e13,6.9666463333909e13,7.1913768535095e13,7.416107373628e13,7.6408378937466e13,7.8655684138652e13,8.0902989339838e13,8.3150294541023e13,8.5397599742209e13,8.7644904943395e13,8.989221014458e13,9.2139515345766e13,9.4386820546952e13,9.6634125748138e13,9.8881430949323e13,1.01128736150509e14,1.03376041351695e14,1.05623346552881e14,1.07870651754066e14,1.10117956955252e14,1.12365262156438e14,1.14612567357623e14,1.16859872558809e14,1.19107177759995e14,1.21354482961181e14,1.23601788162366e14,1.25849093363552e14,1.28096398564738e14,1.30343703765924e14,1.32591008967109e14,1.34838314168295e14,1.37085619369481e14,1.39332924570666e14,1.41580229771852e14,1.43827534973038e14,1.46074840174224e14,1.48322145375409e14,1.50569450576595e14,1.52816755777781e14,1.55064060978967e14,1.57311366180152e14,1.59558671381338e14,1.61805976582524e14,1.64053281783709e14,1.66300586984895e14,1.68547892186081e14,1.70795197387267e14,1.73042502588452e14,1.75289807789638e14,1.77537112990824e14,1.79784418192009e14,1.82031723393195e14,1.84279028594381e14,1.86526333795567e14,1.88773638996752e14,1.91020944197938e14,1.93268249399124e14,1.9551555460031e14,1.97762859801495e14,2.00010165002681e14,2.02257470203867e14,2.04504775405052e14,2.06752080606238e14,2.08999385807424e14,2.1124669100861e14,2.13493996209795e14,2.15741301410981e14,2.17988606612167e14,2.20235911813353e14,2.22483217014538e14,2.24730522215724e14,2.2697782741691e14,2.29225132618095e14,2.31472437819281e14,2.33719743020467e14,2.35967048221653e14,2.38214353422838e14,2.40461658624024e14,2.4270896382521e14,2.44956269026395e14,2.47203574227581e14,2.49450879428767e14,2.51698184629953e14,2.53945489831138e14,2.56192795032324e14,2.5844010023351e14,2.60687405434696e14,2.62934710635881e14,2.65182015837067e14,2.67429321038253e14,2.69676626239438e14,2.71923931440624e14,2.7417123664181e14,2.76418541842996e14,2.78665847044181e14,2.80913152245367e14,2.83160457446553e14,2.85407762647739e14,2.87655067848924e14,2.8990237305011e14,2.92149678251296e14,2.94396983452481e14,2.96644288653667e14,2.98891593854853e14,3.01138899056039e14,3.03386204257224e14,3.0563350945841e14,3.07880814659596e14,3.10128119860782e14,3.12375425061967e14,3.14622730263153e14,3.16870035464339e14,3.19117340665524e14,3.2136464586671e14,3.23611951067896e14,3.25859256269082e14,3.28106561470267e14,3.30353866671453e14,3.32601171872639e14,3.34848477073824e14,3.3709578227501e14,3.39343087476196e14,3.41590392677382e14,3.43837697878567e14,3.46085003079753e14,3.48332308280939e14,3.50579613482125e14,3.5282691868331e14,3.55074223884496e14,3.57321529085682e14,3.59568834286867e14,3.61816139488053e14,3.64063444689239e14,3.66310749890425e14,3.6855805509161e14,3.70805360292796e14,3.73052665493982e14,3.75299970695168e14,3.77547275896353e14,3.79794581097539e14,3.82041886298725e14,3.8428919149991e14,3.86536496701096e14,3.88783801902282e14,3.91031107103468e14,3.93278412304653e14,3.95525717505839e14,3.97773022707025e14,4.00020327908211e14,4.02267633109396e14,4.04514938310582e14,4.06762243511768e14,4.09009548712953e14,4.11256853914139e14,4.13504159115325e14,4.15751464316511e14,4.17998769517696e14,4.20246074718882e14,4.22493379920068e14,4.24740685121253e14,4.26987990322439e14,4.29235295523625e14,4.31482600724811e14,4.33729905925996e14,4.35977211127182e14,4.38224516328368e14,4.40471821529554e14,4.42719126730739e14,4.44966431931925e14,4.47213737133111e14,4.49461042334296e14,4.51708347535482e14,4.53955652736668e14,4.56202957937854e14,4.58450263139039e14,4.60697568340225e14,4.62944873541411e14,4.65192178742597e14,4.67439483943782e14,4.69686789144968e14,4.71934094346154e14,4.74181399547339e14,4.76428704748525e14,4.78676009949711e14,4.80923315150897e14,4.83170620352082e14,4.85417925553268e14,4.87665230754454e14,4.89912535955639e14,4.92159841156825e14,4.94407146358011e14,4.96654451559197e14,4.98901756760382e14,5.01149061961568e14,5.03396367162754e14,5.0564367236394e14,5.07890977565125e14,5.10138282766311e14,5.12385587967497e14,5.14632893168682e14,5.16880198369868e14,5.19127503571054e14,5.2137480877224e14,5.23622113973425e14,5.25869419174611e14,5.28116724375797e14,5.30364029576983e14,5.32611334778168e14,5.34858639979354e14,5.3710594518054e14,5.39353250381725e14,5.41600555582911e14,5.43847860784097e14,5.46095165985283e14,5.48342471186468e14,5.50589776387654e14,5.5283708158884e14,5.55084386790025e14,5.57331691991211e14,5.59578997192397e14,5.61826302393583e14,5.64073607594768e14,5.66320912795954e14,5.6856821799714e14,5.70815523198326e14,5.73062828399511e14,5.75310133600697e14,5.77557438801883e14,5.79804744003068e14,5.82052049204254e14,5.8429935440544e14,5.86546659606626e14,5.88793964807811e14,5.91041270008997e14,5.93288575210183e14,5.95535880411369e14,5.97783185612554e14,6.0003049081374e14,6.02277796014926e14,6.04525101216111e14,6.06772406417297e14,6.09019711618483e14,6.11267016819669e14,6.13514322020854e14,6.1576162722204e14,6.18008932423226e14,6.20256237624412e14,6.22503542825597e14,6.24750848026783e14,6.26998153227969e14,6.29245458429154e14,6.3149276363034e14,6.33740068831526e14,6.35987374032712e14,6.38234679233897e14,6.40481984435083e14,6.42729289636269e14,6.44976594837455e14,6.4722390003864e14,6.49471205239826e14,6.51718510441012e14,6.53965815642197e14,6.56213120843383e14,6.58460426044569e14,6.60707731245755e14,6.6295503644694e14,6.65202341648126e14,6.67449646849312e14,6.69696952050497e14,6.71944257251683e14,6.74191562452869e14,6.76438867654055e14,6.7868617285524e14,6.80933478056426e14,6.83180783257612e14,6.85428088458798e14,6.87675393659983e14,6.89922698861169e14,6.92170004062355e14,6.9441730926354e14,6.96664614464726e14,6.98911919665912e14,7.01159224867098e14,7.03406530068283e14,7.05653835269469e14,7.07901140470655e14,7.10148445671841e14,7.12395750873026e14,7.14643056074212e14,7.16890361275398e14,7.19137666476583e14,7.21384971677769e14,7.23632276878955e14,7.25879582080141e14,7.28126887281326e14,7.30374192482512e14,7.32621497683698e14,7.34868802884883e14,7.37116108086069e14,7.39363413287255e14,7.41610718488441e14,7.43858023689626e14,7.46105328890812e14,7.48352634091998e14,7.50599939293184e14,7.52847244494369e14,7.55094549695555e14,7.57341854896741e14,7.59589160097926e14,7.61836465299112e14,7.64083770500298e14,7.66331075701484e14,7.68578380902669e14,7.70825686103855e14,7.73072991305041e14,7.75320296506227e14,7.77567601707412e14,7.79814906908598e14,7.82062212109784e14,7.84309517310969e14,7.86556822512155e14,7.88804127713341e14,7.91051432914527e14,7.93298738115712e14,7.95546043316898e14,7.97793348518084e14,8.0004065371927e14,8.02287958920455e14,8.04535264121641e14,8.06782569322827e14,8.09029874524012e14,8.11277179725198e14,8.13524484926384e14,8.1577179012757e14,8.18019095328755e14,8.20266400529941e14,8.22513705731127e14,8.24761010932312e14,8.27008316133498e14,8.29255621334684e14,8.3150292653587e14,8.33750231737055e14,8.35997536938241e14,8.38244842139427e14,8.40492147340613e14,8.42739452541798e14,8.44986757742984e14,8.4723406294417e14,8.49481368145355e14,8.51728673346541e14,8.53975978547727e14,8.56223283748913e14,8.58470588950098e14,8.60717894151284e14,8.6296519935247e14,8.65212504553656e14,8.67459809754841e14,8.69707114956027e14,8.71954420157213e14,8.74201725358398e14,8.76449030559584e14,8.7869633576077e14,8.80943640961956e14,8.83190946163141e14,8.85438251364327e14,8.87685556565513e14,8.89932861766698e14,8.92180166967884e14,8.9442747216907e14,8.96674777370256e14,8.98922082571441e14,9.01169387772627e14,9.03416692973813e14,9.05663998174999e14,9.07911303376184e14,9.1015860857737e14,9.12405913778556e14,9.14653218979741e14,9.16900524180927e14,9.19147829382113e14,9.21395134583299e14,9.23642439784484e14,9.2588974498567e14,9.28137050186856e14,9.30384355388042e14,9.32631660589227e14,9.34878965790413e14,9.37126270991599e14,9.39373576192784e14,9.4162088139397e14,9.43868186595156e14,9.46115491796342e14,9.48362796997527e14,9.50610102198713e14,9.52857407399899e14,9.55104712601084e14,9.5735201780227e14,9.59599323003456e14,9.61846628204642e14,9.64093933405827e14,9.66341238607013e14,9.68588543808199e14,9.70835849009385e14,9.7308315421057e14,9.75330459411756e14,9.77577764612942e14,9.79825069814127e14,9.82072375015313e14,9.84319680216499e14,9.86566985417685e14,9.8881429061887e14,9.91061595820056e14,9.93308901021242e14,9.95556206222428e14,9.97803511423613e14,1.000050816624799e15,1.002298121825985e15,1.00454542702717e15,1.006792732228356e15,1.009040037429542e15,1.011287342630728e15,1.013534647831913e15,1.015781953033099e15,1.018029258234285e15,1.020276563435471e15,1.022523868636656e15,1.024771173837842e15,1.027018479039028e15,1.029265784240213e15,1.031513089441399e15,1.033760394642585e15,1.036007699843771e15,1.038255005044956e15,1.040502310246142e15,1.042749615447328e15,1.044996920648513e15,1.047244225849699e15,1.049491531050885e15,1.051738836252071e15,1.053986141453256e15,1.056233446654442e15,1.058480751855628e15,1.060728057056814e15,1.062975362257999e15,1.065222667459185e15,1.067469972660371e15,1.069717277861556e15,1.071964583062742e15,1.074211888263928e15,1.076459193465114e15,1.078706498666299e15,1.080953803867485e15,1.083201109068671e15,1.085448414269857e15,1.087695719471042e15,1.089943024672228e15,1.092190329873414e15,1.094437635074599e15,1.096684940275785e15,1.098932245476971e15,1.101179550678157e15,1.103426855879342e15,1.105674161080528e15,1.107921466281714e15,1.110168771482899e15,1.112416076684085e15,1.114663381885271e15,1.116910687086457e15,1.119157992287642e15,1.121405297488828e15,1.123652602690014e15,1.1258999078912e15,1.128147213092385e15,1.130394518293571e15,1.132641823494757e15,1.134889128695943e15,1.137136433897128e15,1.139383739098314e15,1.1416310442995e15,1.143878349500685e15,1.146125654701871e15,1.148372959903057e15,1.150620265104243e15,1.152867570305428e15,1.155114875506614e15,1.1573621807078e15,1.159609485908985e15,1.161856791110171e15,1.164104096311357e15,1.166351401512543e15,1.168598706713728e15,1.170846011914914e15,1.1730933171161e15,1.175340622317286e15,1.177587927518471e15,1.179835232719657e15,1.182082537920843e15,1.184329843122028e15,1.186577148323214e15,1.1888244535244e15,1.191071758725586e15,1.193319063926771e15,1.195566369127957e15,1.197813674329143e15,1.200060979530329e15,1.202308284731514e15,1.2045555899327e15,1.206802895133886e15,1.209050200335071e15,1.211297505536257e15,1.213544810737443e15,1.215792115938629e15,1.218039421139814e15,1.220286726341e15,1.222534031542186e15,1.224781336743372e15,1.227028641944557e15,1.229275947145743e15,1.231523252346929e15,1.233770557548114e15,1.2360178627493e15,1.238265167950486e15,1.240512473151672e15,1.242759778352857e15,1.245007083554043e15,1.247254388755229e15,1.249501693956414e15,1.2517489991576e15,1.253996304358786e15,1.256243609559972e15,1.258490914761157e15,1.260738219962343e15,1.262985525163529e15,1.265232830364715e15,1.2674801355659e15,1.269727440767086e15,1.271974745968272e15,1.274222051169457e15,1.276469356370643e15,1.278716661571829e15,1.280963966773015e15,1.2832112719742e15,1.285458577175386e15,1.287705882376572e15,1.289953187577758e15,1.292200492778943e15,1.294447797980129e15,1.296695103181315e15,1.2989424083825e15,1.301189713583686e15,1.303437018784872e15,1.305684323986058e15,1.307931629187243e15,1.310178934388429e15,1.312426239589615e15,1.3146735447908e15,1.316920849991986e15,1.319168155193172e15,1.321415460394358e15,1.323662765595543e15,1.325910070796729e15,1.328157375997915e15,1.330404681199101e15,1.332651986400286e15,1.334899291601472e15,1.337146596802658e15,1.339393902003843e15,1.341641207205029e15,1.343888512406215e15,1.346135817607401e15,1.348383122808586e15,1.350630428009772e15,1.352877733210958e15,1.355125038412144e15,1.357372343613329e15,1.359619648814515e15,1.361866954015701e15,1.364114259216886e15,1.366361564418072e15,1.368608869619258e15,1.370856174820444e15,1.373103480021629e15,1.375350785222815e15,1.377598090424001e15,1.379845395625186e15,1.382092700826372e15,1.384340006027558e15,1.386587311228744e15,1.388834616429929e15,1.391081921631115e15,1.393329226832301e15,1.395576532033487e15,1.397823837234672e15,1.400071142435858e15,1.402318447637044e15,1.404565752838229e15,1.406813058039415e15,1.409060363240601e15,1.411307668441787e15,1.413554973642972e15,1.415802278844158e15,1.418049584045344e15,1.42029688924653e15,1.422544194447715e15,1.424791499648901e15,1.427038804850087e15,1.429286110051272e15,1.431533415252458e15,1.433780720453644e15,1.43602802565483e15,1.438275330856015e15,1.440522636057201e15,1.442769941258387e15,1.445017246459573e15,1.447264551660758e15,1.449511856861944e15,1.45175916206313e15,1.454006467264315e15,1.456253772465501e15,1.458501077666687e15,1.460748382867873e15,1.462995688069058e15,1.465242993270244e15,1.46749029847143e15,1.469737603672615e15,1.471984908873801e15,1.474232214074987e15,1.476479519276173e15,1.478726824477358e15,1.480974129678544e15,1.48322143487973e15,1.485468740080916e15,1.487716045282101e15,1.489963350483287e15,1.492210655684473e15,1.494457960885658e15,1.496705266086844e15,1.49895257128803e15,1.501199876489216e15,1.503447181690401e15,1.505694486891587e15,1.507941792092773e15,1.510189097293959e15,1.512436402495144e15,1.51468370769633e15,1.516931012897516e15,1.519178318098701e15,1.521425623299887e15,1.523672928501073e15,1.525920233702259e15,1.528167538903444e15,1.53041484410463e15,1.532662149305816e15,1.534909454507001e15,1.537156759708187e15,1.539404064909373e15,1.541651370110559e15,1.543898675311744e15,1.54614598051293e15,1.548393285714116e15,1.550640590915302e15,1.552887896116487e15,1.555135201317673e15,1.557382506518859e15,1.559629811720044e15,1.56187711692123e15,1.564124422122416e15,1.566371727323602e15,1.568619032524787e15,1.570866337725973e15,1.573113642927159e15,1.575360948128345e15,1.57760825332953e15,1.579855558530716e15,1.582102863731902e15,1.584350168933087e15,1.586597474134273e15,1.588844779335459e15,1.591092084536645e15,1.59333938973783e15,1.595586694939016e15,1.597834000140202e15,1.600081305341388e15,1.602328610542573e15,1.604575915743759e15,1.606823220944945e15,1.60907052614613e15,1.611317831347316e15,1.613565136548502e15,1.615812441749688e15,1.618059746950873e15,1.620307052152059e15,1.622554357353245e15,1.62480166255443e15,1.627048967755616e15,1.629296272956802e15,1.631543578157988e15,1.633790883359173e15,1.636038188560359e15,1.638285493761545e15,1.640532798962731e15,1.642780104163916e15,1.645027409365102e15,1.647274714566288e15,1.649522019767473e15,1.651769324968659e15,1.654016630169845e15,1.656263935371031e15,1.658511240572216e15,1.660758545773402e15,1.663005850974588e15,1.665253156175774e15,1.667500461376959e15,1.669747766578145e15,1.671995071779331e15,1.674242376980516e15,1.676489682181702e15,1.678736987382888e15,1.680984292584074e15,1.683231597785259e15,1.685478902986445e15,1.687726208187631e15,1.689973513388816e15,1.692220818590002e15,1.694468123791188e15,1.696715428992374e15,1.698962734193559e15,1.701210039394745e15,1.703457344595931e15,1.705704649797117e15,1.707951954998302e15,1.710199260199488e15,1.712446565400674e15,1.714693870601859e15,1.716941175803045e15,1.719188481004231e15,1.721435786205417e15,1.723683091406602e15,1.725930396607788e15,1.728177701808974e15,1.73042500701016e15,1.732672312211345e15,1.734919617412531e15,1.737166922613717e15,1.739414227814902e15,1.741661533016088e15,1.743908838217274e15,1.74615614341846e15,1.748403448619645e15,1.750650753820831e15,1.752898059022017e15,1.755145364223202e15,1.757392669424388e15,1.759639974625574e15,1.76188727982676e15,1.764134585027945e15,1.766381890229131e15,1.768629195430317e15,1.770876500631503e15,1.773123805832688e15,1.775371111033874e15,1.77761841623506e15,1.779865721436245e15,1.782113026637431e15,1.784360331838617e15,1.786607637039803e15,1.788854942240988e15,1.791102247442174e15,1.79334955264336e15,1.795596857844546e15,1.797844163045731e15,1.800091468246917e15,1.802338773448103e15,1.804586078649288e15,1.806833383850474e15,1.80908068905166e15,1.811327994252846e15,1.813575299454031e15,1.815822604655217e15,1.818069909856403e15,1.820317215057589e15,1.822564520258774e15,1.82481182545996e15,1.827059130661146e15,1.829306435862331e15,1.831553741063517e15,1.833801046264703e15,1.836048351465889e15,1.838295656667074e15,1.84054296186826e15,1.842790267069446e15,1.845037572270631e15,1.847284877471817e15,1.849532182673003e15,1.851779487874189e15,1.854026793075374e15,1.85627409827656e15,1.858521403477746e15,1.860768708678932e15,1.863016013880117e15,1.865263319081303e15,1.867510624282489e15,1.869757929483674e15,1.87200523468486e15,1.874252539886046e15,1.876499845087232e15,1.878747150288417e15,1.880994455489603e15,1.883241760690789e15,1.885489065891975e15,1.88773637109316e15,1.889983676294346e15,1.892230981495532e15,1.894478286696717e15,1.896725591897903e15,1.898972897099089e15,1.901220202300275e15,1.90346750750146e15,1.905714812702646e15,1.907962117903832e15,1.910209423105017e15,1.912456728306203e15,1.914704033507389e15,1.916951338708575e15,1.91919864390976e15,1.921445949110946e15,1.923693254312132e15,1.925940559513318e15,1.928187864714503e15,1.930435169915689e15,1.932682475116875e15,1.93492978031806e15,1.937177085519246e15,1.939424390720432e15,1.941671695921618e15,1.943919001122803e15,1.946166306323989e15,1.948413611525175e15,1.950660916726361e15,1.952908221927546e15,1.955155527128732e15,1.957402832329918e15,1.959650137531103e15,1.961897442732289e15,1.964144747933475e15,1.966392053134661e15,1.968639358335846e15,1.970886663537032e15,1.973133968738218e15,1.975381273939404e15,1.977628579140589e15,1.979875884341775e15,1.982123189542961e15,1.984370494744146e15,1.986617799945332e15,1.988865105146518e15,1.991112410347704e15,1.993359715548889e15,1.995607020750075e15,1.997854325951261e15,2.000101631152446e15,2.002348936353632e15,2.004596241554818e15,2.006843546756004e15,2.009090851957189e15,2.011338157158375e15,2.013585462359561e15,2.015832767560747e15,2.018080072761932e15,2.020327377963118e15,2.022574683164304e15,2.024821988365489e15,2.027069293566675e15,2.029316598767861e15,2.031563903969047e15,2.033811209170232e15,2.036058514371418e15,2.038305819572604e15,2.04055312477379e15,2.042800429974975e15,2.045047735176161e15,2.047295040377347e15,2.049542345578532e15,2.051789650779718e15,2.054036955980904e15,2.05628426118209e15,2.058531566383275e15,2.060778871584461e15,2.063026176785647e15,2.065273481986832e15,2.067520787188018e15,2.069768092389204e15,2.07201539759039e15,2.074262702791575e15,2.076510007992761e15,2.078757313193947e15,2.081004618395133e15,2.083251923596318e15,2.085499228797504e15,2.08774653399869e15,2.089993839199875e15,2.092241144401061e15,2.094488449602247e15,2.096735754803433e15,2.098983060004618e15,2.101230365205804e15,2.10347767040699e15,2.105724975608176e15,2.107972280809361e15,2.110219586010547e15,2.112466891211733e15,2.114714196412918e15,2.116961501614104e15,2.11920880681529e15,2.121456112016476e15,2.123703417217661e15,2.125950722418847e15,2.128198027620033e15,2.130445332821218e15,2.132692638022404e15,2.13493994322359e15,2.137187248424776e15,2.139434553625961e15,2.141681858827147e15,2.143929164028333e15,2.146176469229519e15,2.148423774430704e15,2.15067107963189e15,2.152918384833076e15,2.155165690034261e15,2.157412995235447e15,2.159660300436633e15,2.161907605637819e15,2.164154910839004e15,2.16640221604019e15,2.168649521241376e15,2.170896826442562e15,2.173144131643747e15,2.175391436844933e15,2.177638742046119e15,2.179886047247304e15,2.18213335244849e15,2.184380657649676e15,2.186627962850862e15,2.188875268052047e15,2.191122573253233e15,2.193369878454419e15,2.195617183655605e15,2.19786448885679e15,2.200111794057976e15,2.202359099259162e15,2.204606404460347e15,2.206853709661533e15,2.209101014862719e15,2.211348320063905e15,2.21359562526509e15,2.215842930466276e15,2.218090235667462e15,2.220337540868647e15,2.222584846069833e15,2.224832151271019e15,2.227079456472205e15,2.22932676167339e15,2.231574066874576e15,2.233821372075762e15,2.236068677276948e15,2.238315982478133e15,2.240563287679319e15,2.242810592880505e15,2.24505789808169e15,2.247305203282876e15,2.249552508484062e15,2.251799813685248e15],"x":[2.097152e6,2.2473072983377246e12,4.494612499523449e12,6.741917700709174e12,8.989222901894898e12,1.1236528103080623e13,1.3483833304266348e13,1.5731138505452072e13,1.7978443706637797e13,2.022574890782352e13,2.2473054109009246e13,2.472035931019497e13,2.6967664511380695e13,2.9214969712566418e13,3.1462274913752145e13,3.3709580114937867e13,3.595688531612359e13,3.820419051730932e13,4.045149571849504e13,4.2698800919680766e13,4.494610612086649e13,4.719341132205222e13,4.944071652323794e13,5.1688021724423664e13,5.393532692560939e13,5.618263212679512e13,5.8429937327980836e13,6.067724252916656e13,6.292454773035229e13,6.5171852931538016e13,6.7419158132723734e13,6.966646333390946e13,7.191376853509519e13,7.41610737362809e13,7.640837893746664e13,7.865568413865236e13,8.090298933983808e13,8.315029454102381e13,8.539759974220953e13,8.764490494339525e13,8.989221014458098e13,9.21395153457667e13,9.438682054695244e13,9.663412574813816e13,9.888143094932388e13,1.0112873615050961e14,1.0337604135169533e14,1.0562334655288105e14,1.0787065175406678e14,1.101179569552525e14,1.1236526215643823e14,1.1461256735762395e14,1.1685987255880967e14,1.191071777599954e14,1.2135448296118112e14,1.2360178816236684e14,1.2584909336355258e14,1.280963985647383e14,1.3034370376592403e14,1.3259100896710975e14,1.3483831416829547e14,1.370856193694812e14,1.3933292457066692e14,1.4158022977185266e14,1.4382753497303838e14,1.460748401742241e14,1.483221453754098e14,1.5056945057659553e14,1.5281675577778128e14,1.55064060978967e14,1.5731136618015272e14,1.5955867138133844e14,1.6180597658252416e14,1.640532817837099e14,1.6630058698489562e14,1.6854789218608134e14,1.7079519738726706e14,1.7304250258845278e14,1.752898077896385e14,1.7753711299082425e14,1.7978441819200997e14,1.820317233931957e14,1.842790285943814e14,1.8652633379556712e14,1.8877363899675288e14,1.910209441979386e14,1.932682493991243e14,1.9551555460031003e14,1.9776285980149575e14,2.000101650026815e14,2.0225747020386722e14,2.0450477540505294e14,2.0675208060623866e14,2.0899938580742438e14,2.112466910086101e14,2.1349399620979584e14,2.1574130141098156e14,2.1798860661216728e14,2.20235911813353e14,2.2248321701453872e14,2.2473052221572447e14,2.269778274169102e14,2.292251326180959e14,2.3147243781928162e14,2.3371974302046734e14,2.3596704822165306e14,2.382143534228388e14,2.4046165862402453e14,2.4270896382521025e14,2.4495626902639597e14,2.472035742275817e14,2.4945087942876744e14,2.5169818462995316e14,2.5394548983113888e14,2.561927950323246e14,2.584401002335103e14,2.6068740543469606e14,2.6293471063588178e14,2.651820158370675e14,2.6742932103825322e14,2.6967662623943894e14,2.7192393144062466e14,2.741712366418104e14,2.7641854184299612e14,2.7866584704418184e14,2.8091315224536756e14,2.831604574465533e14,2.85407762647739e14,2.8765506784892475e14,2.8990237305011044e14,2.921496782512962e14,2.9439698345248194e14,2.966442886536676e14,2.988915938548534e14,3.0113889905603906e14,3.033862042572248e14,3.0563350945841056e14,3.0788081465959625e14,3.10128119860782e14,3.123754250619677e14,3.1462273026315344e14,3.168700354643392e14,3.191173406655249e14,3.213646458667106e14,3.236119510678963e14,3.2585925626908206e14,3.281065614702678e14,3.303538666714535e14,3.3260117187263925e14,3.3484847707382494e14,3.370957822750107e14,3.3934308747619644e14,3.415903926773821e14,3.438376978785679e14,3.4608500307975356e14,3.483323082809393e14,3.50579613482125e14,3.5282691868331075e14,3.550742238844965e14,3.573215290856822e14,3.5956883428686794e14,3.618161394880536e14,3.640634446892394e14,3.663107498904251e14,3.685580550916108e14,3.7080536029279656e14,3.7305266549398225e14,3.75299970695168e14,3.7754727589635375e14,3.7979458109753944e14,3.820418862987252e14,3.842891914999109e14,3.865364967010966e14,3.887838019022824e14,3.9103110710346806e14,3.932784123046538e14,3.955257175058395e14,3.9777302270702525e14,4.00020327908211e14,4.022676331093967e14,4.0451493831058244e14,4.067622435117681e14,4.090095487129539e14,4.1125685391413956e14,4.135041591153253e14,4.1575146431651106e14,4.1799876951769675e14,4.202460747188825e14,4.224933799200682e14,4.2474068512125394e14,4.269879903224397e14,4.292352955236254e14,4.314826007248111e14,4.337299059259968e14,4.3597721112718256e14,4.382245163283683e14,4.40471821529554e14,4.4271912673073975e14,4.4496643193192544e14,4.472137371331112e14,4.4946104233429694e14,4.517083475354826e14,4.539556527366684e14,4.5620295793785406e14,4.584502631390398e14,4.6069756834022556e14,4.6294487354141125e14,4.65192178742597e14,4.674394839437827e14,4.6968678914496844e14,4.719340943461541e14,4.741813995473399e14,4.764287047485256e14,4.786760099497113e14,4.8092331515089706e14,4.8317062035208275e14,4.854179255532685e14,4.8766523075445425e14,4.8991253595563994e14,4.921598411568257e14,4.944071463580114e14,4.966544515591971e14,4.989017567603829e14,5.0114906196156856e14,5.033963671627543e14,5.0564367236394e14,5.0789097756512575e14,5.101382827663115e14,5.123855879674972e14,5.1463289316868294e14,5.168801983698686e14,5.191275035710544e14,5.213748087722401e14,5.236221139734258e14,5.2586941917461156e14,5.2811672437579725e14,5.30364029576983e14,5.326113347781687e14,5.3485863997935444e14,5.371059451805402e14,5.393532503817259e14,5.416005555829116e14,5.438478607840973e14,5.4609516598528306e14,5.483424711864688e14,5.505897763876545e14,5.5283708158884025e14,5.5508438679002594e14,5.573316919912117e14,5.5957899719239744e14,5.618263023935831e14,5.640736075947689e14,5.663209127959546e14,5.685682179971402e14,5.70815523198326e14,5.730628283995118e14,5.753101336006975e14,5.775574388018832e14,5.798047440030689e14,5.820520492042546e14,5.842993544054404e14,5.865466596066261e14,5.887939648078119e14,5.910412700089975e14,5.932885752101832e14,5.95535880411369e14,5.977831856125548e14,6.000304908137405e14,6.022777960149261e14,6.045251012161119e14,6.067724064172976e14,6.090197116184834e14,6.112670168196691e14,6.135143220208548e14,6.157616272220405e14,6.180089324232262e14,6.20256237624412e14,6.225035428255978e14,6.247508480267834e14,6.269981532279691e14,6.292454584291549e14,6.314927636303406e14,6.337400688315264e14,6.35987374032712e14,6.382346792338978e14,6.404819844350835e14,6.427292896362692e14,6.44976594837455e14,6.472239000386406e14,6.494712052398264e14,6.517185104410121e14,6.539658156421979e14,6.562131208433836e14,6.584604260445692e14,6.60707731245755e14,6.629550364469408e14,6.652023416481265e14,6.674496468493122e14,6.696969520504979e14,6.719442572516836e14,6.741915624528694e14,6.764388676540551e14,6.786861728552409e14,6.809334780564265e14,6.831807832576122e14,6.85428088458798e14,6.876753936599838e14,6.899226988611694e14,6.921700040623551e14,6.944173092635409e14,6.966646144647266e14,6.989119196659124e14,7.01159224867098e14,7.034065300682838e14,7.056538352694695e14,7.079011404706552e14,7.10148445671841e14,7.123957508730266e14,7.146430560742124e14,7.168903612753981e14,7.191376664765839e14,7.213849716777696e14,7.236322768789552e14,7.25879582080141e14,7.281268872813268e14,7.303741924825125e14,7.326214976836982e14,7.348688028848839e14,7.371161080860696e14,7.393634132872554e14,7.416107184884411e14,7.438580236896269e14,7.461053288908125e14,7.483526340919982e14,7.50599939293184e14,7.528472444943698e14,7.550945496955555e14,7.573418548967411e14,7.595891600979269e14,7.618364652991126e14,7.640837705002984e14,7.663310757014841e14,7.685783809026698e14,7.708256861038555e14,7.730729913050412e14,7.75320296506227e14,7.775676017074128e14,7.798149069085984e14,7.820622121097841e14,7.843095173109699e14,7.865568225121556e14,7.888041277133414e14,7.91051432914527e14,7.932987381157128e14,7.955460433168985e14,7.977933485180842e14,8.0004065371927e14,8.022879589204556e14,8.045352641216414e14,8.067825693228271e14,8.090298745240129e14,8.112771797251986e14,8.135244849263842e14,8.1577179012757e14,8.180190953287558e14,8.202664005299415e14,8.225137057311271e14,8.247610109323129e14,8.270083161334986e14,8.292556213346844e14,8.315029265358701e14,8.337502317370558e14,8.359975369382415e14,8.382448421394272e14,8.40492147340613e14,8.427394525417988e14,8.449867577429844e14,8.472340629441701e14,8.494813681453559e14,8.517286733465416e14,8.539759785477274e14,8.56223283748913e14,8.584705889500988e14,8.607178941512845e14,8.629651993524702e14,8.65212504553656e14,8.674598097548416e14,8.697071149560274e14,8.719544201572131e14,8.742017253583989e14,8.764490305595846e14,8.786963357607702e14,8.80943640961956e14,8.831909461631418e14,8.854382513643275e14,8.876855565655132e14,8.899328617666989e14,8.921801669678846e14,8.944274721690704e14,8.966747773702561e14,8.989220825714419e14,9.011693877726275e14,9.034166929738132e14,9.05663998174999e14,9.079113033761848e14,9.101586085773705e14,9.124059137785561e14,9.146532189797419e14,9.169005241809276e14,9.191478293821134e14,9.213951345832991e14,9.236424397844848e14,9.258897449856705e14,9.281370501868562e14,9.30384355388042e14,9.326316605892278e14,9.348789657904134e14,9.371262709915991e14,9.393735761927849e14,9.416208813939706e14,9.438681865951562e14,9.46115491796342e14,9.483627969975278e14,9.506101021987135e14,9.528574073998992e14,9.551047126010849e14,9.573520178022706e14,9.595993230034564e14,9.618466282046421e14,9.640939334058279e14,9.663412386070135e14,9.685885438081992e14,9.70835849009385e14,9.730831542105708e14,9.753304594117565e14,9.775777646129421e14,9.798250698141279e14,9.820723750153136e14,9.843196802164994e14,9.865669854176851e14,9.888142906188708e14,9.910615958200565e14,9.933089010212422e14,9.95556206222428e14,9.978035114236138e14,1.0000508166247994e15,1.0022981218259851e15,1.0045454270271709e15,1.0067927322283566e15,1.0090400374295424e15,1.011287342630728e15,1.0135346478319138e15,1.0157819530330995e15,1.0180292582342852e15,1.020276563435471e15,1.0225238686366566e15,1.0247711738378424e15,1.0270184790390281e15,1.0292657842402139e15,1.0315130894413996e15,1.0337603946425852e15,1.036007699843771e15,1.0382550050449568e15,1.0405023102461425e15,1.0427496154473282e15,1.0449969206485139e15,1.0472442258496996e15,1.0494915310508854e15,1.0517388362520711e15,1.0539861414532569e15,1.0562334466544425e15,1.0584807518556282e15,1.060728057056814e15,1.0629753622579998e15,1.0652226674591854e15,1.0674699726603711e15,1.0697172778615569e15,1.0719645830627426e15,1.0742118882639284e15,1.076459193465114e15,1.0787064986662998e15,1.0809538038674855e15,1.0832011090686712e15,1.085448414269857e15,1.0876957194710426e15,1.0899430246722284e15,1.0921903298734141e15,1.0944376350745999e15,1.0966849402757856e15,1.0989322454769712e15,1.101179550678157e15,1.1034268558793428e15,1.1056741610805285e15,1.1079214662817142e15,1.1101687714828999e15,1.1124160766840856e15,1.1146633818852714e15,1.1169106870864571e15,1.1191579922876429e15,1.1214052974888285e15,1.1236526026900142e15,1.1258999078912e15,1.1281472130923858e15,1.1303945182935715e15,1.1326418234947572e15,1.134889128695943e15,1.1371364338971285e15,1.1393837390983142e15,1.1416310442995e15,1.1438783495006858e15,1.1461256547018715e15,1.1483729599030572e15,1.150620265104243e15,1.1528675703054288e15,1.1551148755066145e15,1.1573621807078002e15,1.1596094859089858e15,1.1618567911101715e15,1.1641040963113572e15,1.166351401512543e15,1.1685987067137288e15,1.1708460119149145e15,1.1730933171161002e15,1.175340622317286e15,1.1775879275184718e15,1.1798352327196575e15,1.182082537920843e15,1.1843298431220288e15,1.1865771483232145e15,1.1888244535244002e15,1.191071758725586e15,1.1933190639267718e15,1.1955663691279575e15,1.1978136743291432e15,1.200060979530329e15,1.2023082847315148e15,1.2045555899327002e15,1.206802895133886e15,1.2090502003350718e15,1.2112975055362575e15,1.2135448107374432e15,1.215792115938629e15,1.2180394211398148e15,1.2202867263410005e15,1.2225340315421862e15,1.224781336743372e15,1.2270286419445575e15,1.2292759471457432e15,1.231523252346929e15,1.2337705575481148e15,1.2360178627493005e15,1.2382651679504862e15,1.240512473151672e15,1.2427597783528578e15,1.2450070835540435e15,1.2472543887552292e15,1.2495016939564148e15,1.2517489991576005e15,1.2539963043587862e15,1.256243609559972e15,1.2584909147611578e15,1.2607382199623435e15,1.2629855251635292e15,1.265232830364715e15,1.2674801355659008e15,1.2697274407670862e15,1.271974745968272e15,1.2742220511694578e15,1.2764693563706435e15,1.2787166615718292e15,1.280963966773015e15,1.2832112719742008e15,1.2854585771753865e15,1.2877058823765722e15,1.289953187577758e15,1.2922004927789435e15,1.2944477979801292e15,1.296695103181315e15,1.2989424083825008e15,1.3011897135836865e15,1.3034370187848722e15,1.305684323986058e15,1.3079316291872438e15,1.3101789343884295e15,1.3124262395896152e15,1.3146735447908008e15,1.3169208499919865e15,1.3191681551931722e15,1.321415460394358e15,1.3236627655955438e15,1.3259100707967295e15,1.3281573759979152e15,1.330404681199101e15,1.3326519864002868e15,1.3348992916014725e15,1.337146596802658e15,1.3393939020038438e15,1.3416412072050295e15,1.3438885124062152e15,1.346135817607401e15,1.3483831228085868e15,1.3506304280097725e15,1.3528777332109582e15,1.355125038412144e15,1.3573723436133298e15,1.3596196488145152e15,1.361866954015701e15,1.3641142592168868e15,1.3663615644180725e15,1.3686088696192582e15,1.370856174820444e15,1.3731034800216298e15,1.3753507852228155e15,1.3775980904240012e15,1.3798453956251868e15,1.3820927008263725e15,1.3843400060275582e15,1.386587311228744e15,1.3888346164299298e15,1.3910819216311155e15,1.3933292268323012e15,1.395576532033487e15,1.3978238372346728e15,1.4000711424358585e15,1.402318447637044e15,1.4045657528382298e15,1.4068130580394155e15,1.4090603632406012e15,1.411307668441787e15,1.4135549736429728e15,1.4158022788441585e15,1.4180495840453442e15,1.42029688924653e15,1.4225441944477158e15,1.4247914996489012e15,1.427038804850087e15,1.4292861100512728e15,1.4315334152524585e15,1.4337807204536442e15,1.43602802565483e15,1.4382753308560158e15,1.4405226360572015e15,1.4427699412583872e15,1.445017246459573e15,1.4472645516607585e15,1.4495118568619442e15,1.45175916206313e15,1.4540064672643158e15,1.4562537724655015e15,1.4585010776666872e15,1.460748382867873e15,1.4629956880690588e15,1.4652429932702445e15,1.4674902984714302e15,1.4697376036726158e15,1.4719849088738015e15,1.4742322140749872e15,1.476479519276173e15,1.4787268244773588e15,1.4809741296785445e15,1.4832214348797302e15,1.485468740080916e15,1.4877160452821018e15,1.4899633504832875e15,1.492210655684473e15,1.4944579608856588e15,1.4967052660868445e15,1.4989525712880302e15,1.501199876489216e15,1.5034471816904018e15,1.5056944868915875e15,1.5079417920927732e15,1.510189097293959e15,1.5124364024951445e15,1.5146837076963302e15,1.516931012897516e15,1.5191783180987018e15,1.5214256232998875e15,1.5236729285010732e15,1.525920233702259e15,1.5281675389034448e15,1.5304148441046305e15,1.5326621493058162e15,1.5349094545070018e15,1.5371567597081875e15,1.5394040649093732e15,1.541651370110559e15,1.5438986753117448e15,1.5461459805129305e15,1.5483932857141162e15,1.550640590915302e15,1.5528878961164878e15,1.5551352013176735e15,1.557382506518859e15,1.5596298117200448e15,1.5618771169212305e15,1.5641244221224162e15,1.566371727323602e15,1.5686190325247878e15,1.5708663377259735e15,1.5731136429271592e15,1.575360948128345e15,1.5776082533295308e15,1.5798555585307162e15,1.582102863731902e15,1.5843501689330878e15,1.5865974741342735e15,1.5888447793354592e15,1.591092084536645e15,1.5933393897378308e15,1.5955866949390165e15,1.5978340001402022e15,1.600081305341388e15,1.6023286105425735e15,1.6045759157437592e15,1.606823220944945e15,1.6090705261461308e15,1.6113178313473165e15,1.6135651365485022e15,1.615812441749688e15,1.6180597469508738e15,1.6203070521520595e15,1.6225543573532452e15,1.6248016625544308e15,1.6270489677556165e15,1.6292962729568022e15,1.631543578157988e15,1.6337908833591738e15,1.6360381885603595e15,1.6382854937615452e15,1.640532798962731e15,1.6427801041639168e15,1.6450274093651022e15,1.647274714566288e15,1.6495220197674738e15,1.6517693249686595e15,1.6540166301698452e15,1.656263935371031e15,1.6585112405722168e15,1.6607585457734025e15,1.6630058509745882e15,1.665253156175774e15,1.6675004613769595e15,1.6697477665781452e15,1.671995071779331e15,1.6742423769805168e15,1.6764896821817025e15,1.6787369873828882e15,1.680984292584074e15,1.6832315977852598e15,1.6854789029864455e15,1.6877262081876312e15,1.6899735133888168e15,1.6922208185900025e15,1.6944681237911882e15,1.696715428992374e15,1.6989627341935598e15,1.7012100393947455e15,1.7034573445959312e15,1.705704649797117e15,1.7079519549983028e15,1.7101992601994885e15,1.712446565400674e15,1.7146938706018598e15,1.7169411758030455e15,1.7191884810042312e15,1.721435786205417e15,1.7236830914066028e15,1.7259303966077885e15,1.7281777018089742e15,1.73042500701016e15,1.7326723122113458e15,1.7349196174125312e15,1.737166922613717e15,1.7394142278149028e15,1.7416615330160885e15,1.7439088382172742e15,1.74615614341846e15,1.7484034486196458e15,1.7506507538208315e15,1.7528980590220172e15,1.7551453642232028e15,1.7573926694243885e15,1.7596399746255742e15,1.76188727982676e15,1.7641345850279458e15,1.7663818902291315e15,1.7686291954303172e15,1.770876500631503e15,1.7731238058326888e15,1.7753711110338745e15,1.77761841623506e15,1.7798657214362458e15,1.7821130266374315e15,1.7843603318386172e15,1.786607637039803e15,1.7888549422409888e15,1.7911022474421745e15,1.7933495526433602e15,1.795596857844546e15,1.7978441630457318e15,1.8000914682469172e15,1.802338773448103e15,1.8045860786492888e15,1.8068333838504745e15,1.8090806890516602e15,1.811327994252846e15,1.8135752994540318e15,1.8158226046552175e15,1.8180699098564032e15,1.820317215057589e15,1.8225645202587745e15,1.8248118254599602e15,1.827059130661146e15,1.8293064358623318e15,1.8315537410635175e15,1.8338010462647032e15,1.836048351465889e15,1.8382956566670748e15,1.8405429618682605e15,1.8427902670694462e15,1.8450375722706318e15,1.8472848774718175e15,1.8495321826730032e15,1.851779487874189e15,1.8540267930753748e15,1.8562740982765605e15,1.8585214034777462e15,1.860768708678932e15,1.8630160138801178e15,1.8652633190813035e15,1.867510624282489e15,1.8697579294836748e15,1.8720052346848605e15,1.8742525398860462e15,1.876499845087232e15,1.8787471502884178e15,1.8809944554896035e15,1.8832417606907892e15,1.885489065891975e15,1.8877363710931605e15,1.8899836762943462e15,1.892230981495532e15,1.8944782866967178e15,1.8967255918979035e15,1.8989728970990892e15,1.901220202300275e15,1.9034675075014608e15,1.9057148127026465e15,1.9079621179038322e15,1.9102094231050178e15,1.9124567283062035e15,1.9147040335073892e15,1.916951338708575e15,1.9191986439097608e15,1.9214459491109465e15,1.9236932543121322e15,1.925940559513318e15,1.9281878647145038e15,1.9304351699156895e15,1.932682475116875e15,1.9349297803180608e15,1.9371770855192465e15,1.9394243907204322e15,1.941671695921618e15,1.9439190011228038e15,1.9461663063239895e15,1.9484136115251752e15,1.950660916726361e15,1.9529082219275468e15,1.9551555271287322e15,1.957402832329918e15,1.9596501375311038e15,1.9618974427322895e15,1.9641447479334752e15,1.966392053134661e15,1.9686393583358468e15,1.9708866635370325e15,1.9731339687382182e15,1.975381273939404e15,1.9776285791405895e15,1.9798758843417752e15,1.982123189542961e15,1.9843704947441468e15,1.9866177999453325e15,1.9888651051465182e15,1.991112410347704e15,1.9933597155488898e15,1.9956070207500755e15,1.9978543259512612e15,2.0001016311524468e15,2.0023489363536325e15,2.0045962415548182e15,2.006843546756004e15,2.0090908519571898e15,2.0113381571583755e15,2.0135854623595612e15,2.015832767560747e15,2.0180800727619328e15,2.0203273779631182e15,2.022574683164304e15,2.0248219883654898e15,2.0270692935666755e15,2.0293165987678612e15,2.031563903969047e15,2.0338112091702328e15,2.0360585143714185e15,2.0383058195726042e15,2.04055312477379e15,2.0428004299749755e15,2.0450477351761612e15,2.047295040377347e15,2.0495423455785328e15,2.0517896507797185e15,2.0540369559809042e15,2.05628426118209e15,2.0585315663832758e15,2.0607788715844615e15,2.0630261767856472e15,2.0652734819868328e15,2.0675207871880185e15,2.0697680923892042e15,2.07201539759039e15,2.0742627027915758e15,2.0765100079927615e15,2.0787573131939472e15,2.081004618395133e15,2.0832519235963188e15,2.0854992287975045e15,2.08774653399869e15,2.0899938391998758e15,2.0922411444010615e15,2.0944884496022472e15,2.096735754803433e15,2.0989830600046188e15,2.1012303652058045e15,2.1034776704069902e15,2.105724975608176e15,2.1079722808093618e15,2.1102195860105472e15,2.112466891211733e15,2.1147141964129188e15,2.1169615016141045e15,2.1192088068152902e15,2.121456112016476e15,2.1237034172176618e15,2.1259507224188475e15,2.1281980276200332e15,2.1304453328212188e15,2.1326926380224045e15,2.1349399432235902e15,2.137187248424776e15,2.1394345536259618e15,2.1416818588271475e15,2.1439291640283332e15,2.146176469229519e15,2.1484237744307048e15,2.1506710796318905e15,2.152918384833076e15,2.1551656900342618e15,2.1574129952354475e15,2.1596603004366332e15,2.161907605637819e15,2.1641549108390048e15,2.1664022160401905e15,2.1686495212413762e15,2.170896826442562e15,2.1731441316437478e15,2.1753914368449332e15,2.177638742046119e15,2.1798860472473048e15,2.1821333524484905e15,2.1843806576496762e15,2.186627962850862e15,2.1888752680520478e15,2.1911225732532335e15,2.1933698784544192e15,2.195617183655605e15,2.1978644888567905e15,2.2001117940579762e15,2.202359099259162e15,2.2046064044603478e15,2.2068537096615335e15,2.2091010148627192e15,2.211348320063905e15,2.2135956252650908e15,2.2158429304662765e15,2.2180902356674622e15,2.2203375408686478e15,2.2225848460698335e15,2.2248321512710192e15,2.227079456472205e15,2.2293267616733908e15,2.2315740668745765e15,2.2338213720757622e15,2.236068677276948e15,2.2383159824781338e15,2.2405632876793195e15,2.242810592880505e15,2.2450578980816908e15,2.2473052032828765e15,2.2495525084840622e15,2.251799813685248e15]}

},{}],81:[function(require,module,exports){
module.exports={"frac":[-0.0,-0.0039920159680377765,-0.007984031936075553,-0.011976047904227016,-0.015968063872264793,-0.01996007984030257,-0.023952095808340346,-0.02794411177649181,-0.031936127744529585,-0.03592814371256736,-0.03992015968060514,-0.0439121756487566,-0.04790419161679438,-0.051896207584832155,-0.05588822355286993,-0.05988023952090771,-0.06387225548905917,-0.06786427145709695,-0.07185628742513472,-0.0758483033931725,-0.07984031936132396,-0.08383233532936174,-0.08782435129739952,-0.0918163672654373,-0.09580838323358876,-0.09980039920162653,-0.10379241516966431,-0.10778443113770209,-0.11177644710573986,-0.11576846307389133,-0.1197604790419291,-0.12375249500996688,-0.12774451097800466,-0.13173652694615612,-0.1357285429141939,-0.13972055888223167,-0.14371257485026945,-0.14770459081830722,-0.1516966067864587,-0.15568862275449646,-0.15968063872253424,-0.16367265469057202,-0.16766467065872348,-0.17165668662676126,-0.17564870259479903,-0.1796407185628368,-0.18363273453098827,-0.18762475049902605,-0.19161676646706383,-0.1956087824351016,-0.19960079840313938,-0.20359281437129084,-0.20758483033932862,-0.2115768463073664,-0.21556886227540417,-0.21956087824355563,-0.2235528942115934,-0.2275449101796312,-0.23153692614766896,-0.23552894211582043,-0.2395209580838582,-0.24351297405189598,-0.24750499001993376,-0.25149700598797153,-0.255489021956123,-0.2594810379241608,-0.26347305389219855,-0.2674650698602363,-0.2714570858283878,-0.27544910179642557,-0.27944111776446334,-0.2834331337325011,-0.2874251497006526,-0.29141716566869036,-0.29540918163672814,-0.2994011976047659,-0.3033932135728037,-0.30738522954095515,-0.31137724550899293,-0.3153692614770307,-0.3193612774450685,-0.32335329341321994,-0.3273453093812577,-0.3313373253492955,-0.3353293413173333,-0.33932135728548474,-0.3433133732535225,-0.3473053892215603,-0.35129740518959807,-0.35528942115763584,-0.3592814371257873,-0.3632734530938251,-0.36726546906186286,-0.37125748502990064,-0.3752495009980521,-0.3792415169660899,-0.38323353293412765,-0.38722554890216543,-0.3912175648702032,-0.39520958083835467,-0.39920159680639244,-0.4031936127744302,-0.407185628742468,-0.41117764471061946,-0.41516966067865724,-0.419161676646695,-0.4231536926147328,-0.42714570858288425,-0.43113772455092203,-0.4351297405189598,-0.4391217564869976,-0.44311377245503536,-0.4471057884231868,-0.4510978043912246,-0.4550898203592624,-0.45908183632730015,-0.4630738522954516,-0.4670658682634894,-0.47105788423152717,-0.47504990019956495,-0.4790419161677164,-0.4830339321357542,-0.48702594810379196,-0.49101796407182974,-0.4950099800398675,-0.499001996008019,-0.5029940119760568,-0.5069860279440945,-0.5109780439121323,-0.5149700598802838,-0.5189620758483215,-0.5229540918163593,-0.5269461077843971,-0.5309381237525486,-0.5349301397205863,-0.5389221556886241,-0.5429141716566619,-0.5469061876246997,-0.5508982035928511,-0.5548902195608889,-0.5588822355289267,-0.5628742514969645,-0.5668662674651159,-0.5708582834331537,-0.5748502994011915,-0.5788423153692293,-0.5828343313373807,-0.5868263473054185,-0.5908183632734563,-0.594810379241494,-0.5988023952095318,-0.6027944111776833,-0.6067864271457211,-0.6107784431137588,-0.6147704590817966,-0.6187624750499481,-0.6227544910179859,-0.6267465069860236,-0.6307385229540614,-0.6347305389220992,-0.6387225548902506,-0.6427145708582884,-0.6467065868263262,-0.650698602794364,-0.6546906187625154,-0.6586826347305532,-0.662674650698591,-0.6666666666666288,-0.6706586826347802,-0.674650698602818,-0.6786427145708558,-0.6826347305388936,-0.6866267465069313,-0.6906187624750828,-0.6946107784431206,-0.6986027944111584,-0.7025948103791961,-0.7065868263473476,-0.7105788423153854,-0.7145708582834231,-0.7185628742514609,-0.7225548902196124,-0.7265469061876502,-0.7305389221556879,-0.7345309381237257,-0.7385229540917635,-0.742514970059915,-0.7465069860279527,-0.7504990019959905,-0.7544910179640283,-0.7584830339321798,-0.7624750499002175,-0.7664670658682553,-0.7704590818362931,-0.7744510978044445,-0.7784431137724823,-0.7824351297405201,-0.7864271457085579,-0.7904191616765956,-0.7944111776447471,-0.7984031936127849,-0.8023952095808227,-0.8063872255488604,-0.8103792415170119,-0.8143712574850497,-0.8183632734530875,-0.8223552894211252,-0.8263473053892767,-0.8303393213573145,-0.8343313373253523,-0.83832335329339,-0.8423153692614278,-0.8463073852295793,-0.850299401197617,-0.8542914171656548,-0.8582834331336926,-0.8622754491018441,-0.8662674650698818,-0.8702594810379196,-0.8742514970059574,-0.8782435129739952,-0.8822355289421466,-0.8862275449101844,-0.8902195608782222,-0.89421157684626,-0.8982035928144114,-0.9021956087824492,-0.906187624750487,-0.9101796407185248,-0.9141716566866762,-0.918163672654714,-0.9221556886227518,-0.9261477045907895,-0.9301397205588273,-0.9341317365269788,-0.9381237524950166,-0.9421157684630543,-0.9461077844310921,-0.9500998003992436,-0.9540918163672814,-0.9580838323353191,-0.9620758483033569,-0.9660678642715084,-0.9700598802395461,-0.9740518962075839,-0.9780439121756217,-0.9820359281437163,-0.9860279441117541,-0.9900199600798487,-0.9940119760478865,-0.9980039920159811,-0.0019960079840188882,-0.005988023952113508,-0.009980039920151285,-0.013972055888245904,-0.01796407185628368,-0.0219560878243783,-0.025948103792416077,-0.029940119760453854,-0.033932135728548474,-0.03792415169658625,-0.04191616766468087,-0.04590818363271865,-0.049900199600813266,-0.05389221556885104,-0.05788423153694566,-0.06187624750498344,-0.06586826347307806,-0.06986027944111584,-0.07385229540915361,-0.07784431137724823,-0.08183632734528601,-0.08582834331338063,-0.0898203592814184,-0.09381237524951302,-0.0978043912175508,-0.10179640718564542,-0.1057884231536832,-0.10978043912177782,-0.1137724550898156,-0.11776447105791021,-0.12175648702594799,-0.12574850299398577,-0.1297405189620804,-0.13373253493011816,-0.13772455089821278,-0.14171656686625056,-0.14570858283434518,-0.14970059880238296,-0.15369261477047758,-0.15768463073851535,-0.16167664670660997,-0.16566866267464775,-0.16966067864274237,-0.17365269461078015,-0.17764471057881792,-0.18163672654691254,-0.18562874251495032,-0.18962075848304494,-0.19361277445108271,-0.19760479041917733,-0.2015968063872151,-0.20558882235530973,-0.2095808383233475,-0.21357285429144213,-0.2175648702594799,-0.22155688622751768,-0.2255489021956123,-0.22954091816365008,-0.2335329341317447,-0.23752495009978247,-0.2415169660678771,-0.24550898203591487,-0.2495009980040095,-0.25349301397204727,-0.2574850299401419,-0.26147704590817966,-0.2654690618762743,-0.26946107784431206,-0.27345309381234983,-0.27744510978044445,-0.28143712574848223,-0.28542914171657685,-0.2894211576846146,-0.29341317365270925,-0.297405189620747,-0.30139720558884164,-0.3053892215568794,-0.30938123752497404,-0.3133732534930118,-0.3173652694610496,-0.3213572854291442,-0.325349301397182,-0.3293413173652766,-0.3333333333333144,-0.337325349301409,-0.3413173652694468,-0.3453093812375414,-0.3493013972055792,-0.3532934131736738,-0.3572854291417116,-0.3612774451098062,-0.36526946107784397,-0.36926147704588175,-0.37325349301397637,-0.37724550898201414,-0.38123752495010876,-0.38522954091814654,-0.38922155688624116,-0.39321357285427894,-0.39720558882237356,-0.40119760479041133,-0.40518962075850595,-0.40918163672654373,-0.41317365269463835,-0.4171656686626761,-0.4211576846307139,-0.4251497005988085,-0.4291417165668463,-0.4331337325349409,-0.4371257485029787,-0.4411177644710733,-0.4451097804391111,-0.4491017964072057,-0.4530938123752435,-0.4570858283433381,-0.4610778443113759,-0.46506986027941366,-0.4690618762475083,-0.47305389221554606,-0.4770459081836407,-0.48103792415167845,-0.4850299401197731,-0.48902195608781085,-0.49301397205587705,-0.49700598802394325,-0.5009980039920094,-0.5049900199600756,-0.5089820359281418,-0.512974051896208,-0.5169660678642742,-0.5209580838323404,-0.5249500998004066,-0.5289421157684728,-0.532934131736539,-0.5369261477045768,-0.540918163672643,-0.5449101796407092,-0.5489021956087754,-0.5528942115768416,-0.5568862275449078,-0.560878243512974,-0.5648702594810402,-0.5688622754491064,-0.5728542914171726,-0.5768463073852388,-0.580838323353305,-0.5848303393213712,-0.588822355289409,-0.5928143712574752,-0.5968063872255414,-0.6007984031936076,-0.6047904191616738,-0.60878243512974,-0.6127744510978061,-0.6167664670658723,-0.6207584830339385,-0.6247504990020047,-0.6287425149700709,-0.6327345309381371,-0.6367265469061749,-0.6407185628742411,-0.6447105788423073,-0.6487025948103735,-0.6526946107784397,-0.6566866267465059,-0.6606786427145721,-0.6646706586826383,-0.6686626746507045,-0.6726546906187707,-0.6766467065868369,-0.6806387225549031,-0.6846307385229409,-0.6886227544910071,-0.6926147704590733,-0.6966067864271395,-0.7005988023952057,-0.7045908183632719,-0.7085828343313381,-0.7125748502994043,-0.7165668662674705,-0.7205588822355367,-0.7245508982036029,-0.728542914171669,-0.7325349301397068,-0.736526946107773,-0.7405189620758392,-0.7445109780439054,-0.7485029940119716,-0.7524950099800378,-0.756487025948104,-0.7604790419161702,-0.7644710578842364,-0.7684630738522884,-0.7724550898203546,-0.7764471057884208,-0.780439121756487,-0.7844311377245532,-0.7884231536926194,-0.7924151696606856,-0.7964071856287376,-0.8003992015968038,-0.80439121756487,-0.8083832335329362,-0.8123752495010024,-0.8163672654690686,-0.8203592814371206,-0.8243512974051868,-0.828343313373253,-0.8323353293413192,-0.8363273453093854,-0.8403193612774515,-0.8443113772455035,-0.8483033932135697,-0.8522954091816359,-0.8562874251497021,-0.8602794411177683,-0.8642714570858345,-0.8682634730538865,-0.8722554890219527,-0.8762475049900189,-0.8802395209580851,-0.8842315369261442,-0.8882235528942104,-0.8922155688622766,-0.8962075848303428,-0.9001996007984019,-0.9041916167664681,-0.9081836327345343,-0.9121756487025934,-0.9161676646706596,-0.9201596806387258,-0.9241516966067849,-0.9281437125748511,-0.9321357285429173,-0.9361277445109764,-0.9401197604790426,-0.9441117764471052,-0.9481037924151714,-0.952095808383234,-0.9560878243512967,-0.9600798403193629,-0.9640718562874255,-0.9680638722554882,-0.9720558882235526,-0.976047904191617,-0.9800399201596814,-0.9840319361277441,-0.9880239520958085,-0.992015968063872,-0.996007984031936,0.0,0.996007984031936,0.992015968063872,0.9880239520958085,0.9840319361277441,0.9800399201596814,0.976047904191617,0.9720558882235526,0.9680638722554882,0.9640718562874255,0.9600798403193629,0.9560878243512967,0.952095808383234,0.9481037924151714,0.9441117764471052,0.9401197604790426,0.9361277445109764,0.9321357285429173,0.9281437125748511,0.9241516966067849,0.9201596806387258,0.9161676646706596,0.9121756487025934,0.9081836327345343,0.9041916167664681,0.9001996007984019,0.8962075848303428,0.8922155688622766,0.8882235528942104,0.8842315369261442,0.8802395209580851,0.8762475049900189,0.8722554890219527,0.8682634730538865,0.8642714570858345,0.8602794411177683,0.8562874251497021,0.8522954091816359,0.8483033932135697,0.8443113772455035,0.8403193612774515,0.8363273453093854,0.8323353293413192,0.828343313373253,0.8243512974051868,0.8203592814371206,0.8163672654690686,0.8123752495010024,0.8083832335329362,0.80439121756487,0.8003992015968038,0.7964071856287376,0.7924151696606856,0.7884231536926194,0.7844311377245532,0.780439121756487,0.7764471057884208,0.7724550898203546,0.7684630738522884,0.7644710578842364,0.7604790419161702,0.756487025948104,0.7524950099800378,0.7485029940119716,0.7445109780439054,0.7405189620758392,0.736526946107773,0.7325349301397068,0.728542914171669,0.7245508982036029,0.7205588822355367,0.7165668662674705,0.7125748502994043,0.7085828343313381,0.7045908183632719,0.7005988023952057,0.6966067864271395,0.6926147704590733,0.6886227544910071,0.6846307385229409,0.6806387225549031,0.6766467065868369,0.6726546906187707,0.6686626746507045,0.6646706586826383,0.6606786427145721,0.6566866267465059,0.6526946107784397,0.6487025948103735,0.6447105788423073,0.6407185628742411,0.6367265469061749,0.6327345309381371,0.6287425149700709,0.6247504990020047,0.6207584830339385,0.6167664670658723,0.6127744510978061,0.60878243512974,0.6047904191616738,0.6007984031936076,0.5968063872255414,0.5928143712574752,0.588822355289409,0.5848303393213712,0.580838323353305,0.5768463073852388,0.5728542914171726,0.5688622754491064,0.5648702594810402,0.560878243512974,0.5568862275449078,0.5528942115768416,0.5489021956087754,0.5449101796407092,0.540918163672643,0.5369261477045768,0.532934131736539,0.5289421157684728,0.5249500998004066,0.5209580838323404,0.5169660678642742,0.512974051896208,0.5089820359281418,0.5049900199600756,0.5009980039920094,0.49700598802394325,0.49301397205587705,0.48902195608781085,0.4850299401197731,0.48103792415167845,0.4770459081836407,0.47305389221554606,0.4690618762475083,0.46506986027941366,0.4610778443113759,0.4570858283433381,0.4530938123752435,0.4491017964072057,0.4451097804391111,0.4411177644710733,0.4371257485029787,0.4331337325349409,0.4291417165668463,0.4251497005988085,0.4211576846307139,0.4171656686626761,0.41317365269463835,0.40918163672654373,0.40518962075850595,0.40119760479041133,0.39720558882237356,0.39321357285427894,0.38922155688624116,0.38522954091814654,0.38123752495010876,0.37724550898201414,0.37325349301397637,0.36926147704588175,0.36526946107784397,0.3612774451098062,0.3572854291417116,0.3532934131736738,0.3493013972055792,0.3453093812375414,0.3413173652694468,0.337325349301409,0.3333333333333144,0.3293413173652766,0.325349301397182,0.3213572854291442,0.3173652694610496,0.3133732534930118,0.30938123752497404,0.3053892215568794,0.30139720558884164,0.297405189620747,0.29341317365270925,0.2894211576846146,0.28542914171657685,0.28143712574848223,0.27744510978044445,0.27345309381234983,0.26946107784431206,0.2654690618762743,0.26147704590817966,0.2574850299401419,0.25349301397204727,0.2495009980040095,0.24550898203591487,0.2415169660678771,0.23752495009978247,0.2335329341317447,0.22954091816365008,0.2255489021956123,0.22155688622751768,0.2175648702594799,0.21357285429144213,0.2095808383233475,0.20558882235530973,0.2015968063872151,0.19760479041917733,0.19361277445108271,0.18962075848304494,0.18562874251495032,0.18163672654691254,0.17764471057881792,0.17365269461078015,0.16966067864274237,0.16566866267464775,0.16167664670660997,0.15768463073851535,0.15369261477047758,0.14970059880238296,0.14570858283434518,0.14171656686625056,0.13772455089821278,0.13373253493011816,0.1297405189620804,0.12574850299398577,0.12175648702594799,0.11776447105791021,0.1137724550898156,0.10978043912177782,0.1057884231536832,0.10179640718564542,0.0978043912175508,0.09381237524951302,0.0898203592814184,0.08582834331338063,0.08183632734528601,0.07784431137724823,0.07385229540915361,0.06986027944111584,0.06586826347307806,0.06187624750498344,0.05788423153694566,0.05389221556885104,0.049900199600813266,0.04590818363271865,0.04191616766468087,0.03792415169658625,0.033932135728548474,0.029940119760453854,0.025948103792416077,0.0219560878243783,0.01796407185628368,0.013972055888245904,0.009980039920151285,0.005988023952113508,0.0019960079840188882,0.9980039920159811,0.9940119760478865,0.9900199600798487,0.9860279441117541,0.9820359281437163,0.9780439121756217,0.9740518962075839,0.9700598802395461,0.9660678642715084,0.9620758483033569,0.9580838323353191,0.9540918163672814,0.9500998003992436,0.9461077844310921,0.9421157684630543,0.9381237524950166,0.9341317365269788,0.9301397205588273,0.9261477045907895,0.9221556886227518,0.918163672654714,0.9141716566866762,0.9101796407185248,0.906187624750487,0.9021956087824492,0.8982035928144114,0.89421157684626,0.8902195608782222,0.8862275449101844,0.8822355289421466,0.8782435129739952,0.8742514970059574,0.8702594810379196,0.8662674650698818,0.8622754491018441,0.8582834331336926,0.8542914171656548,0.850299401197617,0.8463073852295793,0.8423153692614278,0.83832335329339,0.8343313373253523,0.8303393213573145,0.8263473053892767,0.8223552894211252,0.8183632734530875,0.8143712574850497,0.8103792415170119,0.8063872255488604,0.8023952095808227,0.7984031936127849,0.7944111776447471,0.7904191616765956,0.7864271457085579,0.7824351297405201,0.7784431137724823,0.7744510978044445,0.7704590818362931,0.7664670658682553,0.7624750499002175,0.7584830339321798,0.7544910179640283,0.7504990019959905,0.7465069860279527,0.742514970059915,0.7385229540917635,0.7345309381237257,0.7305389221556879,0.7265469061876502,0.7225548902196124,0.7185628742514609,0.7145708582834231,0.7105788423153854,0.7065868263473476,0.7025948103791961,0.6986027944111584,0.6946107784431206,0.6906187624750828,0.6866267465069313,0.6826347305388936,0.6786427145708558,0.674650698602818,0.6706586826347802,0.6666666666666288,0.662674650698591,0.6586826347305532,0.6546906187625154,0.650698602794364,0.6467065868263262,0.6427145708582884,0.6387225548902506,0.6347305389220992,0.6307385229540614,0.6267465069860236,0.6227544910179859,0.6187624750499481,0.6147704590817966,0.6107784431137588,0.6067864271457211,0.6027944111776833,0.5988023952095318,0.594810379241494,0.5908183632734563,0.5868263473054185,0.5828343313373807,0.5788423153692293,0.5748502994011915,0.5708582834331537,0.5668662674651159,0.5628742514969645,0.5588822355289267,0.5548902195608889,0.5508982035928511,0.5469061876246997,0.5429141716566619,0.5389221556886241,0.5349301397205863,0.5309381237525486,0.5269461077843971,0.5229540918163593,0.5189620758483215,0.5149700598802838,0.5109780439121323,0.5069860279440945,0.5029940119760568,0.499001996008019,0.4950099800398675,0.49101796407182974,0.48702594810379196,0.4830339321357542,0.4790419161677164,0.47504990019956495,0.47105788423152717,0.4670658682634894,0.4630738522954516,0.45908183632730015,0.4550898203592624,0.4510978043912246,0.4471057884231868,0.44311377245503536,0.4391217564869976,0.4351297405189598,0.43113772455092203,0.42714570858288425,0.4231536926147328,0.419161676646695,0.41516966067865724,0.41117764471061946,0.407185628742468,0.4031936127744302,0.39920159680639244,0.39520958083835467,0.3912175648702032,0.38722554890216543,0.38323353293412765,0.3792415169660899,0.3752495009980521,0.37125748502990064,0.36726546906186286,0.3632734530938251,0.3592814371257873,0.35528942115763584,0.35129740518959807,0.3473053892215603,0.3433133732535225,0.33932135728548474,0.3353293413173333,0.3313373253492955,0.3273453093812577,0.32335329341321994,0.3193612774450685,0.3153692614770307,0.31137724550899293,0.30738522954095515,0.3033932135728037,0.2994011976047659,0.29540918163672814,0.29141716566869036,0.2874251497006526,0.2834331337325011,0.27944111776446334,0.27544910179642557,0.2714570858283878,0.2674650698602363,0.26347305389219855,0.2594810379241608,0.255489021956123,0.25149700598797153,0.24750499001993376,0.24351297405189598,0.2395209580838582,0.23552894211582043,0.23153692614766896,0.2275449101796312,0.2235528942115934,0.21956087824355563,0.21556886227540417,0.2115768463073664,0.20758483033932862,0.20359281437129084,0.19960079840313938,0.1956087824351016,0.19161676646706383,0.18762475049902605,0.18363273453098827,0.1796407185628368,0.17564870259479903,0.17165668662676126,0.16766467065872348,0.16367265469057202,0.15968063872253424,0.15568862275449646,0.1516966067864587,0.14770459081830722,0.14371257485026945,0.13972055888223167,0.1357285429141939,0.13173652694615612,0.12774451097800466,0.12375249500996688,0.1197604790419291,0.11576846307389133,0.11177644710573986,0.10778443113770209,0.10379241516966431,0.09980039920162653,0.09580838323358876,0.0918163672654373,0.08782435129739952,0.08383233532936174,0.07984031936132396,0.0758483033931725,0.07185628742513472,0.06786427145709695,0.06387225548905917,0.05988023952090771,0.05588822355286993,0.051896207584832155,0.04790419161679438,0.0439121756487566,0.03992015968060514,0.03592814371256736,0.031936127744529585,0.02794411177649181,0.023952095808340346,0.01996007984030257,0.015968063872264793,0.011976047904227016,0.007984031936075553,0.0039920159680377765,0.0],"integral":[-1000.0,-998.0,-996.0,-994.0,-992.0,-990.0,-988.0,-986.0,-984.0,-982.0,-980.0,-978.0,-976.0,-974.0,-972.0,-970.0,-968.0,-966.0,-964.0,-962.0,-960.0,-958.0,-956.0,-954.0,-952.0,-950.0,-948.0,-946.0,-944.0,-942.0,-940.0,-938.0,-936.0,-934.0,-932.0,-930.0,-928.0,-926.0,-924.0,-922.0,-920.0,-918.0,-916.0,-914.0,-912.0,-910.0,-908.0,-906.0,-904.0,-902.0,-900.0,-898.0,-896.0,-894.0,-892.0,-890.0,-888.0,-886.0,-884.0,-882.0,-880.0,-878.0,-876.0,-874.0,-872.0,-870.0,-868.0,-866.0,-864.0,-862.0,-860.0,-858.0,-856.0,-854.0,-852.0,-850.0,-848.0,-846.0,-844.0,-842.0,-840.0,-838.0,-836.0,-834.0,-832.0,-830.0,-828.0,-826.0,-824.0,-822.0,-820.0,-818.0,-816.0,-814.0,-812.0,-810.0,-808.0,-806.0,-804.0,-802.0,-800.0,-798.0,-796.0,-794.0,-792.0,-790.0,-788.0,-786.0,-784.0,-782.0,-780.0,-778.0,-776.0,-774.0,-772.0,-770.0,-768.0,-766.0,-764.0,-762.0,-760.0,-758.0,-756.0,-754.0,-752.0,-750.0,-748.0,-746.0,-744.0,-742.0,-740.0,-738.0,-736.0,-734.0,-732.0,-730.0,-728.0,-726.0,-724.0,-722.0,-720.0,-718.0,-716.0,-714.0,-712.0,-710.0,-708.0,-706.0,-704.0,-702.0,-700.0,-698.0,-696.0,-694.0,-692.0,-690.0,-688.0,-686.0,-684.0,-682.0,-680.0,-678.0,-676.0,-674.0,-672.0,-670.0,-668.0,-666.0,-664.0,-662.0,-660.0,-658.0,-656.0,-654.0,-652.0,-650.0,-648.0,-646.0,-644.0,-642.0,-640.0,-638.0,-636.0,-634.0,-632.0,-630.0,-628.0,-626.0,-624.0,-622.0,-620.0,-618.0,-616.0,-614.0,-612.0,-610.0,-608.0,-606.0,-604.0,-602.0,-600.0,-598.0,-596.0,-594.0,-592.0,-590.0,-588.0,-586.0,-584.0,-582.0,-580.0,-578.0,-576.0,-574.0,-572.0,-570.0,-568.0,-566.0,-564.0,-562.0,-560.0,-558.0,-556.0,-554.0,-552.0,-550.0,-548.0,-546.0,-544.0,-542.0,-540.0,-538.0,-536.0,-534.0,-532.0,-530.0,-528.0,-526.0,-524.0,-522.0,-520.0,-518.0,-516.0,-514.0,-512.0,-510.0,-508.0,-506.0,-504.0,-502.0,-500.0,-499.0,-497.0,-495.0,-493.0,-491.0,-489.0,-487.0,-485.0,-483.0,-481.0,-479.0,-477.0,-475.0,-473.0,-471.0,-469.0,-467.0,-465.0,-463.0,-461.0,-459.0,-457.0,-455.0,-453.0,-451.0,-449.0,-447.0,-445.0,-443.0,-441.0,-439.0,-437.0,-435.0,-433.0,-431.0,-429.0,-427.0,-425.0,-423.0,-421.0,-419.0,-417.0,-415.0,-413.0,-411.0,-409.0,-407.0,-405.0,-403.0,-401.0,-399.0,-397.0,-395.0,-393.0,-391.0,-389.0,-387.0,-385.0,-383.0,-381.0,-379.0,-377.0,-375.0,-373.0,-371.0,-369.0,-367.0,-365.0,-363.0,-361.0,-359.0,-357.0,-355.0,-353.0,-351.0,-349.0,-347.0,-345.0,-343.0,-341.0,-339.0,-337.0,-335.0,-333.0,-331.0,-329.0,-327.0,-325.0,-323.0,-321.0,-319.0,-317.0,-315.0,-313.0,-311.0,-309.0,-307.0,-305.0,-303.0,-301.0,-299.0,-297.0,-295.0,-293.0,-291.0,-289.0,-287.0,-285.0,-283.0,-281.0,-279.0,-277.0,-275.0,-273.0,-271.0,-269.0,-267.0,-265.0,-263.0,-261.0,-259.0,-257.0,-255.0,-253.0,-251.0,-249.0,-247.0,-245.0,-243.0,-241.0,-239.0,-237.0,-235.0,-233.0,-231.0,-229.0,-227.0,-225.0,-223.0,-221.0,-219.0,-217.0,-215.0,-213.0,-211.0,-209.0,-207.0,-205.0,-203.0,-201.0,-199.0,-197.0,-195.0,-193.0,-191.0,-189.0,-187.0,-185.0,-183.0,-181.0,-179.0,-177.0,-175.0,-173.0,-171.0,-169.0,-167.0,-165.0,-163.0,-161.0,-159.0,-157.0,-155.0,-153.0,-151.0,-149.0,-147.0,-145.0,-143.0,-141.0,-139.0,-137.0,-135.0,-133.0,-131.0,-129.0,-127.0,-125.0,-123.0,-121.0,-119.0,-117.0,-115.0,-113.0,-111.0,-109.0,-107.0,-105.0,-103.0,-101.0,-99.0,-97.0,-95.0,-93.0,-91.0,-89.0,-87.0,-85.0,-83.0,-81.0,-79.0,-77.0,-75.0,-73.0,-71.0,-69.0,-67.0,-65.0,-63.0,-61.0,-59.0,-57.0,-55.0,-53.0,-51.0,-49.0,-47.0,-45.0,-43.0,-41.0,-39.0,-37.0,-35.0,-33.0,-31.0,-29.0,-27.0,-25.0,-23.0,-21.0,-19.0,-17.0,-15.0,-13.0,-11.0,-9.0,-7.0,-5.0,-3.0,-1.0,0.0,1.0,3.0,5.0,7.0,9.0,11.0,13.0,15.0,17.0,19.0,21.0,23.0,25.0,27.0,29.0,31.0,33.0,35.0,37.0,39.0,41.0,43.0,45.0,47.0,49.0,51.0,53.0,55.0,57.0,59.0,61.0,63.0,65.0,67.0,69.0,71.0,73.0,75.0,77.0,79.0,81.0,83.0,85.0,87.0,89.0,91.0,93.0,95.0,97.0,99.0,101.0,103.0,105.0,107.0,109.0,111.0,113.0,115.0,117.0,119.0,121.0,123.0,125.0,127.0,129.0,131.0,133.0,135.0,137.0,139.0,141.0,143.0,145.0,147.0,149.0,151.0,153.0,155.0,157.0,159.0,161.0,163.0,165.0,167.0,169.0,171.0,173.0,175.0,177.0,179.0,181.0,183.0,185.0,187.0,189.0,191.0,193.0,195.0,197.0,199.0,201.0,203.0,205.0,207.0,209.0,211.0,213.0,215.0,217.0,219.0,221.0,223.0,225.0,227.0,229.0,231.0,233.0,235.0,237.0,239.0,241.0,243.0,245.0,247.0,249.0,251.0,253.0,255.0,257.0,259.0,261.0,263.0,265.0,267.0,269.0,271.0,273.0,275.0,277.0,279.0,281.0,283.0,285.0,287.0,289.0,291.0,293.0,295.0,297.0,299.0,301.0,303.0,305.0,307.0,309.0,311.0,313.0,315.0,317.0,319.0,321.0,323.0,325.0,327.0,329.0,331.0,333.0,335.0,337.0,339.0,341.0,343.0,345.0,347.0,349.0,351.0,353.0,355.0,357.0,359.0,361.0,363.0,365.0,367.0,369.0,371.0,373.0,375.0,377.0,379.0,381.0,383.0,385.0,387.0,389.0,391.0,393.0,395.0,397.0,399.0,401.0,403.0,405.0,407.0,409.0,411.0,413.0,415.0,417.0,419.0,421.0,423.0,425.0,427.0,429.0,431.0,433.0,435.0,437.0,439.0,441.0,443.0,445.0,447.0,449.0,451.0,453.0,455.0,457.0,459.0,461.0,463.0,465.0,467.0,469.0,471.0,473.0,475.0,477.0,479.0,481.0,483.0,485.0,487.0,489.0,491.0,493.0,495.0,497.0,499.0,500.0,502.0,504.0,506.0,508.0,510.0,512.0,514.0,516.0,518.0,520.0,522.0,524.0,526.0,528.0,530.0,532.0,534.0,536.0,538.0,540.0,542.0,544.0,546.0,548.0,550.0,552.0,554.0,556.0,558.0,560.0,562.0,564.0,566.0,568.0,570.0,572.0,574.0,576.0,578.0,580.0,582.0,584.0,586.0,588.0,590.0,592.0,594.0,596.0,598.0,600.0,602.0,604.0,606.0,608.0,610.0,612.0,614.0,616.0,618.0,620.0,622.0,624.0,626.0,628.0,630.0,632.0,634.0,636.0,638.0,640.0,642.0,644.0,646.0,648.0,650.0,652.0,654.0,656.0,658.0,660.0,662.0,664.0,666.0,668.0,670.0,672.0,674.0,676.0,678.0,680.0,682.0,684.0,686.0,688.0,690.0,692.0,694.0,696.0,698.0,700.0,702.0,704.0,706.0,708.0,710.0,712.0,714.0,716.0,718.0,720.0,722.0,724.0,726.0,728.0,730.0,732.0,734.0,736.0,738.0,740.0,742.0,744.0,746.0,748.0,750.0,752.0,754.0,756.0,758.0,760.0,762.0,764.0,766.0,768.0,770.0,772.0,774.0,776.0,778.0,780.0,782.0,784.0,786.0,788.0,790.0,792.0,794.0,796.0,798.0,800.0,802.0,804.0,806.0,808.0,810.0,812.0,814.0,816.0,818.0,820.0,822.0,824.0,826.0,828.0,830.0,832.0,834.0,836.0,838.0,840.0,842.0,844.0,846.0,848.0,850.0,852.0,854.0,856.0,858.0,860.0,862.0,864.0,866.0,868.0,870.0,872.0,874.0,876.0,878.0,880.0,882.0,884.0,886.0,888.0,890.0,892.0,894.0,896.0,898.0,900.0,902.0,904.0,906.0,908.0,910.0,912.0,914.0,916.0,918.0,920.0,922.0,924.0,926.0,928.0,930.0,932.0,934.0,936.0,938.0,940.0,942.0,944.0,946.0,948.0,950.0,952.0,954.0,956.0,958.0,960.0,962.0,964.0,966.0,968.0,970.0,972.0,974.0,976.0,978.0,980.0,982.0,984.0,986.0,988.0,990.0,992.0,994.0,996.0,998.0,1000.0],"x":[-1000.0,-998.003992015968,-996.0079840319361,-994.0119760479042,-992.0159680638723,-990.0199600798403,-988.0239520958083,-986.0279441117765,-984.0319361277445,-982.0359281437126,-980.0399201596806,-978.0439121756488,-976.0479041916168,-974.0518962075848,-972.0558882235529,-970.0598802395209,-968.0638722554891,-966.0678642714571,-964.0718562874251,-962.0758483033932,-960.0798403193613,-958.0838323353294,-956.0878243512974,-954.0918163672654,-952.0958083832336,-950.0998003992016,-948.1037924151697,-946.1077844311377,-944.1117764471057,-942.1157684630739,-940.1197604790419,-938.12375249501,-936.127744510978,-934.1317365269462,-932.1357285429142,-930.1397205588822,-928.1437125748503,-926.1477045908183,-924.1516966067865,-922.1556886227545,-920.1596806387225,-918.1636726546906,-916.1676646706587,-914.1716566866268,-912.1756487025948,-910.1796407185628,-908.183632734531,-906.187624750499,-904.1916167664671,-902.1956087824351,-900.1996007984031,-898.2035928143713,-896.2075848303393,-894.2115768463074,-892.2155688622754,-890.2195608782436,-888.2235528942116,-886.2275449101796,-884.2315369261477,-882.2355289421158,-880.2395209580839,-878.2435129740519,-876.2475049900199,-874.251497005988,-872.2554890219561,-870.2594810379242,-868.2634730538922,-866.2674650698602,-864.2714570858284,-862.2754491017964,-860.2794411177645,-858.2834331337325,-856.2874251497007,-854.2914171656687,-852.2954091816367,-850.2994011976048,-848.3033932135728,-846.307385229541,-844.311377245509,-842.315369261477,-840.3193612774451,-838.3233532934132,-836.3273453093813,-834.3313373253493,-832.3353293413173,-830.3393213572855,-828.3433133732535,-826.3473053892216,-824.3512974051896,-822.3552894211576,-820.3592814371258,-818.3632734530938,-816.3672654690619,-814.3712574850299,-812.375249500998,-810.3792415169661,-808.3832335329341,-806.3872255489022,-804.3912175648702,-802.3952095808384,-800.3992015968064,-798.4031936127744,-796.4071856287425,-794.4111776447106,-792.4151696606787,-790.4191616766467,-788.4231536926147,-786.4271457085829,-784.4311377245509,-782.435129740519,-780.439121756487,-778.443113772455,-776.4471057884232,-774.4510978043912,-772.4550898203593,-770.4590818363273,-768.4630738522955,-766.4670658682635,-764.4710578842315,-762.4750499001996,-760.4790419161677,-758.4830339321358,-756.4870259481038,-754.4910179640718,-752.4950099800399,-750.499001996008,-748.502994011976,-746.5069860279441,-744.5109780439121,-742.5149700598803,-740.5189620758483,-738.5229540918164,-736.5269461077844,-734.5309381237525,-732.5349301397206,-730.5389221556886,-728.5429141716567,-726.5469061876247,-724.5508982035929,-722.5548902195609,-720.5588822355289,-718.562874251497,-716.5668662674651,-714.5708582834332,-712.5748502994012,-710.5788423153692,-708.5828343313374,-706.5868263473054,-704.5908183632735,-702.5948103792415,-700.5988023952095,-698.6027944111777,-696.6067864271457,-694.6107784431138,-692.6147704590818,-690.61876247505,-688.622754491018,-686.626746506986,-684.6307385229541,-682.6347305389221,-680.6387225548903,-678.6427145708583,-676.6467065868263,-674.6506986027944,-672.6546906187625,-670.6586826347306,-668.6626746506986,-666.6666666666666,-664.6706586826348,-662.6746506986028,-660.6786427145709,-658.6826347305389,-656.6866267465069,-654.6906187624751,-652.6946107784431,-650.6986027944112,-648.7025948103792,-646.7065868263473,-644.7105788423154,-642.7145708582834,-640.7185628742515,-638.7225548902196,-636.7265469061877,-634.7305389221557,-632.7345309381237,-630.7385229540918,-628.7425149700599,-626.746506986028,-624.750499001996,-622.754491017964,-620.7584830339322,-618.7624750499002,-616.7664670658683,-614.7704590818363,-612.7744510978044,-610.7784431137725,-608.7824351297405,-606.7864271457086,-604.7904191616766,-602.7944111776447,-600.7984031936128,-598.8023952095808,-596.8063872255489,-594.810379241517,-592.814371257485,-590.8183632734531,-588.8223552894211,-586.8263473053893,-584.8303393213573,-582.8343313373254,-580.8383233532934,-578.8423153692614,-576.8463073852296,-574.8502994011976,-572.8542914171657,-570.8582834331337,-568.8622754491018,-566.8662674650699,-564.8702594810379,-562.874251497006,-560.878243512974,-558.8822355289421,-556.8862275449102,-554.8902195608782,-552.8942115768463,-550.8982035928144,-548.9021956087824,-546.9061876247505,-544.9101796407185,-542.9141716566867,-540.9181636726547,-538.9221556886228,-536.9261477045908,-534.9301397205588,-532.934131736527,-530.938123752495,-528.942115768463,-526.9461077844311,-524.9500998003992,-522.9540918163673,-520.9580838323353,-518.9620758483034,-516.9660678642715,-514.9700598802395,-512.9740518962076,-510.9780439121756,-508.9820359281437,-506.98602794411175,-504.99001996007985,-502.9940119760479,-500.998003992016,-499.001996007984,-497.0059880239521,-495.00998003992015,-493.01397205588825,-491.0179640718563,-489.0219560878244,-487.0259481037924,-485.02994011976045,-483.03393213572855,-481.0379241516966,-479.0419161676647,-477.0459081836327,-475.0499001996008,-473.05389221556885,-471.05788423153695,-469.061876247505,-467.0658682634731,-465.0698602794411,-463.07385229540915,-461.07784431137725,-459.0818363273453,-457.0858283433134,-455.0898203592814,-453.0938123752495,-451.09780439121755,-449.10179640718565,-447.1057884231537,-445.1097804391218,-443.1137724550898,-441.1177644710579,-439.12175648702595,-437.125748502994,-435.1297405189621,-433.1337325349301,-431.1377245508982,-429.14171656686625,-427.14570858283435,-425.1497005988024,-423.1536926147705,-421.1576846307385,-419.1616766467066,-417.16566866267465,-415.16966067864274,-413.1736526946108,-411.1776447105788,-409.1816367265469,-407.18562874251495,-405.18962075848304,-403.1936127744511,-401.1976047904192,-399.2015968063872,-397.2055888223553,-395.20958083832335,-393.21357285429144,-391.2175648702595,-389.2215568862275,-387.2255489021956,-385.22954091816365,-383.23353293413174,-381.2375249500998,-379.2415169660679,-377.2455089820359,-375.249500998004,-373.25349301397205,-371.25748502994014,-369.2614770459082,-367.2654690618763,-365.2694610778443,-363.27345309381235,-361.27744510978044,-359.2814371257485,-357.2854291417166,-355.2894211576846,-353.2934131736527,-351.29740518962075,-349.30139720558884,-347.3053892215569,-345.309381237525,-343.313373253493,-341.31736526946105,-339.32135728542914,-337.3253493013972,-335.3293413173653,-333.3333333333333,-331.3373253493014,-329.34131736526945,-327.34530938123754,-325.3493013972056,-323.3532934131737,-321.3572854291417,-319.3612774451098,-317.36526946107784,-315.3692614770459,-313.373253493014,-311.377245508982,-309.3812375249501,-307.38522954091815,-305.38922155688624,-303.3932135728543,-301.3972055888224,-299.4011976047904,-297.4051896207585,-295.40918163672654,-293.41317365269464,-291.4171656686627,-289.4211576846307,-287.4251497005988,-285.42914171656685,-283.43313373253494,-281.437125748503,-279.4411177644711,-277.4451097804391,-275.4491017964072,-273.45309381237524,-271.45708582834334,-269.4610778443114,-267.4650698602794,-265.4690618762475,-263.47305389221555,-261.47704590818364,-259.4810379241517,-257.4850299401198,-255.4890219560878,-253.49301397205588,-251.49700598802394,-249.500998003992,-247.50499001996008,-245.50898203592814,-243.5129740518962,-241.51696606786427,-239.52095808383234,-237.5249500998004,-235.52894211576847,-233.53293413173654,-231.53692614770458,-229.54091816367264,-227.5449101796407,-225.54890219560878,-223.55289421157684,-221.5568862275449,-219.56087824351297,-217.56487025948104,-215.5688622754491,-213.57285429141717,-211.57684630738524,-209.5808383233533,-207.58483033932137,-205.5888223552894,-203.59281437125748,-201.59680638722554,-199.6007984031936,-197.60479041916167,-195.60878243512974,-193.6127744510978,-191.61676646706587,-189.62075848303394,-187.624750499002,-185.62874251497007,-183.63273453093814,-181.63672654690617,-179.64071856287424,-177.6447105788423,-175.64870259481037,-173.65269461077844,-171.6566866267465,-169.66067864271457,-167.66467065868264,-165.6686626746507,-163.67265469061877,-161.67664670658684,-159.6806387225549,-157.68463073852294,-155.688622754491,-153.69261477045907,-151.69660678642714,-149.7005988023952,-147.70459081836327,-145.70858283433134,-143.7125748502994,-141.71656686626747,-139.72055888223554,-137.7245508982036,-135.72854291417167,-133.7325349301397,-131.73652694610777,-129.74051896207584,-127.7445109780439,-125.74850299401197,-123.75249500998004,-121.7564870259481,-119.76047904191617,-117.76447105788424,-115.76846307385229,-113.77245508982035,-111.77644710578842,-109.78043912175649,-107.78443113772455,-105.78842315369262,-103.79241516966069,-101.79640718562874,-99.8003992015968,-97.80439121756487,-95.80838323353294,-93.812375249501,-91.81636726546907,-89.82035928143712,-87.82435129740519,-85.82834331337325,-83.83233532934132,-81.83632734530939,-79.84031936127745,-77.8443113772455,-75.84830339321357,-73.85229540918164,-71.8562874251497,-69.86027944111777,-67.86427145708583,-65.86826347305389,-63.87225548902195,-61.87624750499002,-59.880239520958085,-57.884231536926144,-55.88822355289421,-53.89221556886228,-51.89620758483034,-49.9001996007984,-47.90419161676647,-45.908183632734534,-43.91217564870259,-41.91616766467066,-39.920159680638726,-37.924151696606785,-35.92814371257485,-33.93213572854292,-31.936127744510976,-29.940119760479043,-27.944111776447105,-25.94810379241517,-23.952095808383234,-21.956087824351297,-19.960079840319363,-17.964071856287426,-15.968063872255488,-13.972055888223553,-11.976047904191617,-9.980039920159681,-7.984031936127744,-5.9880239520958085,-3.992015968063872,-1.996007984031936,0.0,1.996007984031936,3.992015968063872,5.9880239520958085,7.984031936127744,9.980039920159681,11.976047904191617,13.972055888223553,15.968063872255488,17.964071856287426,19.960079840319363,21.956087824351297,23.952095808383234,25.94810379241517,27.944111776447105,29.940119760479043,31.936127744510976,33.93213572854292,35.92814371257485,37.924151696606785,39.920159680638726,41.91616766467066,43.91217564870259,45.908183632734534,47.90419161676647,49.9001996007984,51.89620758483034,53.89221556886228,55.88822355289421,57.884231536926144,59.880239520958085,61.87624750499002,63.87225548902195,65.86826347305389,67.86427145708583,69.86027944111777,71.8562874251497,73.85229540918164,75.84830339321357,77.8443113772455,79.84031936127745,81.83632734530939,83.83233532934132,85.82834331337325,87.82435129740519,89.82035928143712,91.81636726546907,93.812375249501,95.80838323353294,97.80439121756487,99.8003992015968,101.79640718562874,103.79241516966069,105.78842315369262,107.78443113772455,109.78043912175649,111.77644710578842,113.77245508982035,115.76846307385229,117.76447105788424,119.76047904191617,121.7564870259481,123.75249500998004,125.74850299401197,127.7445109780439,129.74051896207584,131.73652694610777,133.7325349301397,135.72854291417167,137.7245508982036,139.72055888223554,141.71656686626747,143.7125748502994,145.70858283433134,147.70459081836327,149.7005988023952,151.69660678642714,153.69261477045907,155.688622754491,157.68463073852294,159.6806387225549,161.67664670658684,163.67265469061877,165.6686626746507,167.66467065868264,169.66067864271457,171.6566866267465,173.65269461077844,175.64870259481037,177.6447105788423,179.64071856287424,181.63672654690617,183.63273453093814,185.62874251497007,187.624750499002,189.62075848303394,191.61676646706587,193.6127744510978,195.60878243512974,197.60479041916167,199.6007984031936,201.59680638722554,203.59281437125748,205.5888223552894,207.58483033932137,209.5808383233533,211.57684630738524,213.57285429141717,215.5688622754491,217.56487025948104,219.56087824351297,221.5568862275449,223.55289421157684,225.54890219560878,227.5449101796407,229.54091816367264,231.53692614770458,233.53293413173654,235.52894211576847,237.5249500998004,239.52095808383234,241.51696606786427,243.5129740518962,245.50898203592814,247.50499001996008,249.500998003992,251.49700598802394,253.49301397205588,255.4890219560878,257.4850299401198,259.4810379241517,261.47704590818364,263.47305389221555,265.4690618762475,267.4650698602794,269.4610778443114,271.45708582834334,273.45309381237524,275.4491017964072,277.4451097804391,279.4411177644711,281.437125748503,283.43313373253494,285.42914171656685,287.4251497005988,289.4211576846307,291.4171656686627,293.41317365269464,295.40918163672654,297.4051896207585,299.4011976047904,301.3972055888224,303.3932135728543,305.38922155688624,307.38522954091815,309.3812375249501,311.377245508982,313.373253493014,315.3692614770459,317.36526946107784,319.3612774451098,321.3572854291417,323.3532934131737,325.3493013972056,327.34530938123754,329.34131736526945,331.3373253493014,333.3333333333333,335.3293413173653,337.3253493013972,339.32135728542914,341.31736526946105,343.313373253493,345.309381237525,347.3053892215569,349.30139720558884,351.29740518962075,353.2934131736527,355.2894211576846,357.2854291417166,359.2814371257485,361.27744510978044,363.27345309381235,365.2694610778443,367.2654690618763,369.2614770459082,371.25748502994014,373.25349301397205,375.249500998004,377.2455089820359,379.2415169660679,381.2375249500998,383.23353293413174,385.22954091816365,387.2255489021956,389.2215568862275,391.2175648702595,393.21357285429144,395.20958083832335,397.2055888223553,399.2015968063872,401.1976047904192,403.1936127744511,405.18962075848304,407.18562874251495,409.1816367265469,411.1776447105788,413.1736526946108,415.16966067864274,417.16566866267465,419.1616766467066,421.1576846307385,423.1536926147705,425.1497005988024,427.14570858283435,429.14171656686625,431.1377245508982,433.1337325349301,435.1297405189621,437.125748502994,439.12175648702595,441.1177644710579,443.1137724550898,445.1097804391218,447.1057884231537,449.10179640718565,451.09780439121755,453.0938123752495,455.0898203592814,457.0858283433134,459.0818363273453,461.07784431137725,463.07385229540915,465.0698602794411,467.0658682634731,469.061876247505,471.05788423153695,473.05389221556885,475.0499001996008,477.0459081836327,479.0419161676647,481.0379241516966,483.03393213572855,485.02994011976045,487.0259481037924,489.0219560878244,491.0179640718563,493.01397205588825,495.00998003992015,497.0059880239521,499.001996007984,500.998003992016,502.9940119760479,504.99001996007985,506.98602794411175,508.9820359281437,510.9780439121756,512.9740518962076,514.9700598802395,516.9660678642715,518.9620758483034,520.9580838323353,522.9540918163673,524.9500998003992,526.9461077844311,528.942115768463,530.938123752495,532.934131736527,534.9301397205588,536.9261477045908,538.9221556886228,540.9181636726547,542.9141716566867,544.9101796407185,546.9061876247505,548.9021956087824,550.8982035928144,552.8942115768463,554.8902195608782,556.8862275449102,558.8822355289421,560.878243512974,562.874251497006,564.8702594810379,566.8662674650699,568.8622754491018,570.8582834331337,572.8542914171657,574.8502994011976,576.8463073852296,578.8423153692614,580.8383233532934,582.8343313373254,584.8303393213573,586.8263473053893,588.8223552894211,590.8183632734531,592.814371257485,594.810379241517,596.8063872255489,598.8023952095808,600.7984031936128,602.7944111776447,604.7904191616766,606.7864271457086,608.7824351297405,610.7784431137725,612.7744510978044,614.7704590818363,616.7664670658683,618.7624750499002,620.7584830339322,622.754491017964,624.750499001996,626.746506986028,628.7425149700599,630.7385229540918,632.7345309381237,634.7305389221557,636.7265469061877,638.7225548902196,640.7185628742515,642.7145708582834,644.7105788423154,646.7065868263473,648.7025948103792,650.6986027944112,652.6946107784431,654.6906187624751,656.6866267465069,658.6826347305389,660.6786427145709,662.6746506986028,664.6706586826348,666.6666666666666,668.6626746506986,670.6586826347306,672.6546906187625,674.6506986027944,676.6467065868263,678.6427145708583,680.6387225548903,682.6347305389221,684.6307385229541,686.626746506986,688.622754491018,690.61876247505,692.6147704590818,694.6107784431138,696.6067864271457,698.6027944111777,700.5988023952095,702.5948103792415,704.5908183632735,706.5868263473054,708.5828343313374,710.5788423153692,712.5748502994012,714.5708582834332,716.5668662674651,718.562874251497,720.5588822355289,722.5548902195609,724.5508982035929,726.5469061876247,728.5429141716567,730.5389221556886,732.5349301397206,734.5309381237525,736.5269461077844,738.5229540918164,740.5189620758483,742.5149700598803,744.5109780439121,746.5069860279441,748.502994011976,750.499001996008,752.4950099800399,754.4910179640718,756.4870259481038,758.4830339321358,760.4790419161677,762.4750499001996,764.4710578842315,766.4670658682635,768.4630738522955,770.4590818363273,772.4550898203593,774.4510978043912,776.4471057884232,778.443113772455,780.439121756487,782.435129740519,784.4311377245509,786.4271457085829,788.4231536926147,790.4191616766467,792.4151696606787,794.4111776447106,796.4071856287425,798.4031936127744,800.3992015968064,802.3952095808384,804.3912175648702,806.3872255489022,808.3832335329341,810.3792415169661,812.375249500998,814.3712574850299,816.3672654690619,818.3632734530938,820.3592814371258,822.3552894211576,824.3512974051896,826.3473053892216,828.3433133732535,830.3393213572855,832.3353293413173,834.3313373253493,836.3273453093813,838.3233532934132,840.3193612774451,842.315369261477,844.311377245509,846.307385229541,848.3033932135728,850.2994011976048,852.2954091816367,854.2914171656687,856.2874251497007,858.2834331337325,860.2794411177645,862.2754491017964,864.2714570858284,866.2674650698602,868.2634730538922,870.2594810379242,872.2554890219561,874.251497005988,876.2475049900199,878.2435129740519,880.2395209580839,882.2355289421158,884.2315369261477,886.2275449101796,888.2235528942116,890.2195608782436,892.2155688622754,894.2115768463074,896.2075848303393,898.2035928143713,900.1996007984031,902.1956087824351,904.1916167664671,906.187624750499,908.183632734531,910.1796407185628,912.1756487025948,914.1716566866268,916.1676646706587,918.1636726546906,920.1596806387225,922.1556886227545,924.1516966067865,926.1477045908183,928.1437125748503,930.1397205588822,932.1357285429142,934.1317365269462,936.127744510978,938.12375249501,940.1197604790419,942.1157684630739,944.1117764471057,946.1077844311377,948.1037924151697,950.0998003992016,952.0958083832336,954.0918163672654,956.0878243512974,958.0838323353294,960.0798403193613,962.0758483033932,964.0718562874251,966.0678642714571,968.0638722554891,970.0598802395209,972.0558882235529,974.0518962075848,976.0479041916168,978.0439121756488,980.0399201596806,982.0359281437126,984.0319361277445,986.0279441117765,988.0239520958083,990.0199600798403,992.0159680638723,994.0119760479042,996.0079840319361,998.003992015968,1000.0]}

},{}],82:[function(require,module,exports){
module.exports={"frac":[-0.0,-0.998003992015968,-0.9960079840319361,-0.9940119760479041,-0.9920159680638723,-0.9900199600798403,-0.9880239520958084,-0.9860279441117764,-0.9840319361277445,-0.9820359281437125,-0.9800399201596807,-0.9780439121756487,-0.9760479041916168,-0.9740518962075848,-0.9720558882235529,-0.9700598802395209,-0.9680638722554891,-0.9660678642714571,-0.9640718562874252,-0.9620758483033932,-0.9600798403193613,-0.9580838323353293,-0.9560878243512974,-0.9540918163672655,-0.9520958083832335,-0.9500998003992016,-0.9481037924151696,-0.9461077844311377,-0.9441117764471058,-0.9421157684630739,-0.9401197604790419,-0.93812375249501,-0.936127744510978,-0.9341317365269461,-0.9321357285429142,-0.9301397205588823,-0.9281437125748503,-0.9261477045908184,-0.9241516966067864,-0.9221556886227545,-0.9201596806387226,-0.9181636726546906,-0.9161676646706587,-0.9141716566866267,-0.9121756487025948,-0.9101796407185628,-0.908183632734531,-0.906187624750499,-0.9041916167664671,-0.9021956087824351,-0.9001996007984032,-0.8982035928143712,-0.8962075848303394,-0.8942115768463074,-0.8922155688622755,-0.8902195608782435,-0.8882235528942116,-0.8862275449101796,-0.8842315369261478,-0.8822355289421158,-0.8802395209580839,-0.8782435129740519,-0.8762475049900199,-0.874251497005988,-0.872255489021956,-0.8702594810379242,-0.8682634730538922,-0.8662674650698603,-0.8642714570858283,-0.8622754491017964,-0.8602794411177644,-0.8582834331337326,-0.8562874251497006,-0.8542914171656687,-0.8522954091816367,-0.8502994011976048,-0.8483033932135728,-0.846307385229541,-0.844311377245509,-0.8423153692614771,-0.8403193612774451,-0.8383233532934131,-0.8363273453093812,-0.8343313373253493,-0.8323353293413174,-0.8303393213572854,-0.8283433133732535,-0.8263473053892215,-0.8243512974051896,-0.8223552894211577,-0.8203592814371258,-0.8183632734530938,-0.8163672654690619,-0.8143712574850299,-0.812375249500998,-0.810379241516966,-0.8083832335329342,-0.8063872255489022,-0.8043912175648703,-0.8023952095808383,-0.8003992015968064,-0.7984031936127745,-0.7964071856287425,-0.7944111776447106,-0.7924151696606786,-0.7904191616766467,-0.7884231536926147,-0.7864271457085829,-0.7844311377245509,-0.782435129740519,-0.780439121756487,-0.7784431137724551,-0.7764471057884231,-0.7744510978043913,-0.7724550898203593,-0.7704590818363274,-0.7684630738522954,-0.7664670658682635,-0.7644710578842315,-0.7624750499001997,-0.7604790419161677,-0.7584830339321357,-0.7564870259481038,-0.7544910179640718,-0.7524950099800399,-0.7504990019960079,-0.7485029940119761,-0.7465069860279441,-0.7445109780439122,-0.7425149700598802,-0.7405189620758483,-0.7385229540918163,-0.7365269461077845,-0.7345309381237525,-0.7325349301397206,-0.7305389221556886,-0.7285429141716567,-0.7265469061876247,-0.7245508982035929,-0.7225548902195609,-0.720558882235529,-0.718562874251497,-0.716566866267465,-0.7145708582834331,-0.7125748502994012,-0.7105788423153693,-0.7085828343313373,-0.7065868263473054,-0.7045908183632734,-0.7025948103792415,-0.7005988023952096,-0.6986027944111777,-0.6966067864271457,-0.6946107784431138,-0.6926147704590818,-0.6906187624750499,-0.688622754491018,-0.6866267465069861,-0.6846307385229541,-0.6826347305389222,-0.6806387225548902,-0.6786427145708582,-0.6766467065868264,-0.6746506986027944,-0.6726546906187625,-0.6706586826347305,-0.6686626746506986,-0.6666666666666666,-0.6646706586826348,-0.6626746506986028,-0.6606786427145709,-0.6586826347305389,-0.656686626746507,-0.654690618762475,-0.6526946107784432,-0.6506986027944112,-0.6487025948103793,-0.6467065868263473,-0.6447105788423154,-0.6427145708582834,-0.6407185628742516,-0.6387225548902196,-0.6367265469061876,-0.6347305389221557,-0.6327345309381237,-0.6307385229540918,-0.6287425149700598,-0.626746506986028,-0.624750499001996,-0.6227544910179641,-0.6207584830339321,-0.6187624750499002,-0.6167664670658682,-0.6147704590818364,-0.6127744510978044,-0.6107784431137725,-0.6087824351297405,-0.6067864271457086,-0.6047904191616766,-0.6027944111776448,-0.6007984031936128,-0.5988023952095808,-0.5968063872255489,-0.5948103792415169,-0.592814371257485,-0.590818363273453,-0.5888223552894212,-0.5868263473053892,-0.5848303393213573,-0.5828343313373253,-0.5808383233532934,-0.5788423153692615,-0.5768463073852296,-0.5748502994011976,-0.5728542914171657,-0.5708582834331337,-0.5688622754491018,-0.5668662674650699,-0.564870259481038,-0.562874251497006,-0.5608782435129741,-0.5588822355289421,-0.5568862275449101,-0.5548902195608783,-0.5528942115768463,-0.5508982035928144,-0.5489021956087824,-0.5469061876247505,-0.5449101796407185,-0.5429141716566867,-0.5409181636726547,-0.5389221556886228,-0.5369261477045908,-0.5349301397205589,-0.5329341317365269,-0.530938123752495,-0.5289421157684631,-0.5269461077844312,-0.5249500998003992,-0.5229540918163673,-0.5209580838323353,-0.5189620758483033,-0.5169660678642715,-0.5149700598802395,-0.5129740518962076,-0.5109780439121756,-0.5089820359281437,-0.5069860279441117,-0.5049900199600799,-0.5029940119760479,-0.500998003992016,-0.499001996007984,-0.49700598802395207,-0.49500998003992014,-0.4930139720558882,-0.49101796407185627,-0.48902195608782434,-0.4870259481037924,-0.48502994011976047,-0.48303393213572854,-0.4810379241516966,-0.47904191616766467,-0.47704590818363274,-0.4750499001996008,-0.47305389221556887,-0.47105788423153694,-0.469061876247505,-0.46706586826347307,-0.46506986027944114,-0.4630738522954092,-0.46107784431137727,-0.4590818363273453,-0.45708582834331335,-0.4550898203592814,-0.4530938123752495,-0.45109780439121755,-0.4491017964071856,-0.4471057884231537,-0.44510978043912175,-0.4431137724550898,-0.4411177644710579,-0.43912175648702595,-0.437125748502994,-0.4351297405189621,-0.43313373253493015,-0.4311377245508982,-0.4291417165668663,-0.42714570858283435,-0.4251497005988024,-0.4231536926147705,-0.42115768463073855,-0.41916167664670656,-0.4171656686626746,-0.4151696606786427,-0.41317365269461076,-0.4111776447105788,-0.4091816367265469,-0.40718562874251496,-0.405189620758483,-0.4031936127744511,-0.40119760479041916,-0.3992015968063872,-0.3972055888223553,-0.39520958083832336,-0.3932135728542914,-0.3912175648702595,-0.38922155688622756,-0.3872255489021956,-0.3852295409181637,-0.38323353293413176,-0.3812375249500998,-0.37924151696606784,-0.3772455089820359,-0.37524950099800397,-0.37325349301397204,-0.3712574850299401,-0.36926147704590817,-0.36726546906187624,-0.3652694610778443,-0.36327345309381237,-0.36127744510978044,-0.3592814371257485,-0.35728542914171657,-0.35528942115768464,-0.3532934131736527,-0.35129740518962077,-0.34930139720558884,-0.3473053892215569,-0.34530938123752497,-0.34331337325349304,-0.3413173652694611,-0.3393213572854291,-0.3373253493013972,-0.33532934131736525,-0.3333333333333333,-0.3313373253493014,-0.32934131736526945,-0.3273453093812375,-0.3253493013972056,-0.32335329341317365,-0.3213572854291417,-0.3193612774451098,-0.31736526946107785,-0.3153692614770459,-0.313373253493014,-0.31137724550898205,-0.3093812375249501,-0.3073852295409182,-0.30538922155688625,-0.3033932135728543,-0.3013972055888224,-0.2994011976047904,-0.29740518962075846,-0.2954091816367265,-0.2934131736526946,-0.29141716566866266,-0.2894211576846307,-0.2874251497005988,-0.28542914171656686,-0.2834331337325349,-0.281437125748503,-0.27944111776447106,-0.2774451097804391,-0.2754491017964072,-0.27345309381237526,-0.2714570858283433,-0.2694610778443114,-0.26746506986027946,-0.2654690618762475,-0.2634730538922156,-0.26147704590818366,-0.25948103792415167,-0.25748502994011974,-0.2554890219560878,-0.25349301397205587,-0.25149700598802394,-0.249500998003992,-0.24750499001996007,-0.24550898203592814,-0.2435129740518962,-0.24151696606786427,-0.23952095808383234,-0.2375249500998004,-0.23552894211576847,-0.23353293413173654,-0.2315369261477046,-0.22954091816367264,-0.2275449101796407,-0.22554890219560877,-0.22355289421157684,-0.2215568862275449,-0.21956087824351297,-0.21756487025948104,-0.2155688622754491,-0.21357285429141717,-0.21157684630738524,-0.20958083832335328,-0.20758483033932135,-0.2055888223552894,-0.20359281437125748,-0.20159680638722555,-0.1996007984031936,-0.19760479041916168,-0.19560878243512975,-0.1936127744510978,-0.19161676646706588,-0.18962075848303392,-0.18762475049900199,-0.18562874251497005,-0.18363273453093812,-0.18163672654690619,-0.17964071856287425,-0.17764471057884232,-0.17564870259481039,-0.17365269461077845,-0.17165668662674652,-0.16966067864271456,-0.16766467065868262,-0.1656686626746507,-0.16367265469061876,-0.16167664670658682,-0.1596806387225549,-0.15768463073852296,-0.15568862275449102,-0.1536926147704591,-0.15169660678642716,-0.1497005988023952,-0.14770459081836326,-0.14570858283433133,-0.1437125748502994,-0.14171656686626746,-0.13972055888223553,-0.1377245508982036,-0.13572854291417166,-0.13373253493013973,-0.1317365269461078,-0.12974051896207583,-0.1277445109780439,-0.12574850299401197,-0.12375249500998003,-0.1217564870259481,-0.11976047904191617,-0.11776447105788423,-0.1157684630738523,-0.11377245508982035,-0.11177644710578842,-0.10978043912175649,-0.10778443113772455,-0.10578842315369262,-0.10379241516966067,-0.10179640718562874,-0.0998003992015968,-0.09780439121756487,-0.09580838323353294,-0.09381237524950099,-0.09181636726546906,-0.08982035928143713,-0.08782435129740519,-0.08582834331337326,-0.08383233532934131,-0.08183632734530938,-0.07984031936127745,-0.07784431137724551,-0.07584830339321358,-0.07385229540918163,-0.0718562874251497,-0.06986027944111776,-0.06786427145708583,-0.0658682634730539,-0.06387225548902195,-0.06187624750499002,-0.059880239520958084,-0.05788423153692615,-0.05588822355289421,-0.05389221556886228,-0.05189620758483034,-0.0499001996007984,-0.04790419161676647,-0.04590818363273453,-0.043912175648702596,-0.041916167664670656,-0.03992015968063872,-0.03792415169660679,-0.03592814371257485,-0.033932135728542916,-0.031936127744510975,-0.029940119760479042,-0.027944111776447105,-0.02594810379241517,-0.023952095808383235,-0.021956087824351298,-0.01996007984031936,-0.017964071856287425,-0.015968063872255488,-0.013972055888223553,-0.011976047904191617,-0.00998003992015968,-0.007984031936127744,-0.005988023952095809,-0.003992015968063872,-0.001996007984031936,0.0,0.001996007984031936,0.003992015968063872,0.005988023952095809,0.007984031936127744,0.00998003992015968,0.011976047904191617,0.013972055888223553,0.015968063872255488,0.017964071856287425,0.01996007984031936,0.021956087824351298,0.023952095808383235,0.02594810379241517,0.027944111776447105,0.029940119760479042,0.031936127744510975,0.033932135728542916,0.03592814371257485,0.03792415169660679,0.03992015968063872,0.041916167664670656,0.043912175648702596,0.04590818363273453,0.04790419161676647,0.0499001996007984,0.05189620758483034,0.05389221556886228,0.05588822355289421,0.05788423153692615,0.059880239520958084,0.06187624750499002,0.06387225548902195,0.0658682634730539,0.06786427145708583,0.06986027944111776,0.0718562874251497,0.07385229540918163,0.07584830339321358,0.07784431137724551,0.07984031936127745,0.08183632734530938,0.08383233532934131,0.08582834331337326,0.08782435129740519,0.08982035928143713,0.09181636726546906,0.09381237524950099,0.09580838323353294,0.09780439121756487,0.0998003992015968,0.10179640718562874,0.10379241516966067,0.10578842315369262,0.10778443113772455,0.10978043912175649,0.11177644710578842,0.11377245508982035,0.1157684630738523,0.11776447105788423,0.11976047904191617,0.1217564870259481,0.12375249500998003,0.12574850299401197,0.1277445109780439,0.12974051896207583,0.1317365269461078,0.13373253493013973,0.13572854291417166,0.1377245508982036,0.13972055888223553,0.14171656686626746,0.1437125748502994,0.14570858283433133,0.14770459081836326,0.1497005988023952,0.15169660678642716,0.1536926147704591,0.15568862275449102,0.15768463073852296,0.1596806387225549,0.16167664670658682,0.16367265469061876,0.1656686626746507,0.16766467065868262,0.16966067864271456,0.17165668662674652,0.17365269461077845,0.17564870259481039,0.17764471057884232,0.17964071856287425,0.18163672654690619,0.18363273453093812,0.18562874251497005,0.18762475049900199,0.18962075848303392,0.19161676646706588,0.1936127744510978,0.19560878243512975,0.19760479041916168,0.1996007984031936,0.20159680638722555,0.20359281437125748,0.2055888223552894,0.20758483033932135,0.20958083832335328,0.21157684630738524,0.21357285429141717,0.2155688622754491,0.21756487025948104,0.21956087824351297,0.2215568862275449,0.22355289421157684,0.22554890219560877,0.2275449101796407,0.22954091816367264,0.2315369261477046,0.23353293413173654,0.23552894211576847,0.2375249500998004,0.23952095808383234,0.24151696606786427,0.2435129740518962,0.24550898203592814,0.24750499001996007,0.249500998003992,0.25149700598802394,0.25349301397205587,0.2554890219560878,0.25748502994011974,0.25948103792415167,0.26147704590818366,0.2634730538922156,0.2654690618762475,0.26746506986027946,0.2694610778443114,0.2714570858283433,0.27345309381237526,0.2754491017964072,0.2774451097804391,0.27944111776447106,0.281437125748503,0.2834331337325349,0.28542914171656686,0.2874251497005988,0.2894211576846307,0.29141716566866266,0.2934131736526946,0.2954091816367265,0.29740518962075846,0.2994011976047904,0.3013972055888224,0.3033932135728543,0.30538922155688625,0.3073852295409182,0.3093812375249501,0.31137724550898205,0.313373253493014,0.3153692614770459,0.31736526946107785,0.3193612774451098,0.3213572854291417,0.32335329341317365,0.3253493013972056,0.3273453093812375,0.32934131736526945,0.3313373253493014,0.3333333333333333,0.33532934131736525,0.3373253493013972,0.3393213572854291,0.3413173652694611,0.34331337325349304,0.34530938123752497,0.3473053892215569,0.34930139720558884,0.35129740518962077,0.3532934131736527,0.35528942115768464,0.35728542914171657,0.3592814371257485,0.36127744510978044,0.36327345309381237,0.3652694610778443,0.36726546906187624,0.36926147704590817,0.3712574850299401,0.37325349301397204,0.37524950099800397,0.3772455089820359,0.37924151696606784,0.3812375249500998,0.38323353293413176,0.3852295409181637,0.3872255489021956,0.38922155688622756,0.3912175648702595,0.3932135728542914,0.39520958083832336,0.3972055888223553,0.3992015968063872,0.40119760479041916,0.4031936127744511,0.405189620758483,0.40718562874251496,0.4091816367265469,0.4111776447105788,0.41317365269461076,0.4151696606786427,0.4171656686626746,0.41916167664670656,0.42115768463073855,0.4231536926147705,0.4251497005988024,0.42714570858283435,0.4291417165668663,0.4311377245508982,0.43313373253493015,0.4351297405189621,0.437125748502994,0.43912175648702595,0.4411177644710579,0.4431137724550898,0.44510978043912175,0.4471057884231537,0.4491017964071856,0.45109780439121755,0.4530938123752495,0.4550898203592814,0.45708582834331335,0.4590818363273453,0.46107784431137727,0.4630738522954092,0.46506986027944114,0.46706586826347307,0.469061876247505,0.47105788423153694,0.47305389221556887,0.4750499001996008,0.47704590818363274,0.47904191616766467,0.4810379241516966,0.48303393213572854,0.48502994011976047,0.4870259481037924,0.48902195608782434,0.49101796407185627,0.4930139720558882,0.49500998003992014,0.49700598802395207,0.499001996007984,0.500998003992016,0.5029940119760479,0.5049900199600799,0.5069860279441117,0.5089820359281437,0.5109780439121756,0.5129740518962076,0.5149700598802395,0.5169660678642715,0.5189620758483033,0.5209580838323353,0.5229540918163673,0.5249500998003992,0.5269461077844312,0.5289421157684631,0.530938123752495,0.5329341317365269,0.5349301397205589,0.5369261477045908,0.5389221556886228,0.5409181636726547,0.5429141716566867,0.5449101796407185,0.5469061876247505,0.5489021956087824,0.5508982035928144,0.5528942115768463,0.5548902195608783,0.5568862275449101,0.5588822355289421,0.5608782435129741,0.562874251497006,0.564870259481038,0.5668662674650699,0.5688622754491018,0.5708582834331337,0.5728542914171657,0.5748502994011976,0.5768463073852296,0.5788423153692615,0.5808383233532934,0.5828343313373253,0.5848303393213573,0.5868263473053892,0.5888223552894212,0.590818363273453,0.592814371257485,0.5948103792415169,0.5968063872255489,0.5988023952095808,0.6007984031936128,0.6027944111776448,0.6047904191616766,0.6067864271457086,0.6087824351297405,0.6107784431137725,0.6127744510978044,0.6147704590818364,0.6167664670658682,0.6187624750499002,0.6207584830339321,0.6227544910179641,0.624750499001996,0.626746506986028,0.6287425149700598,0.6307385229540918,0.6327345309381237,0.6347305389221557,0.6367265469061876,0.6387225548902196,0.6407185628742516,0.6427145708582834,0.6447105788423154,0.6467065868263473,0.6487025948103793,0.6506986027944112,0.6526946107784432,0.654690618762475,0.656686626746507,0.6586826347305389,0.6606786427145709,0.6626746506986028,0.6646706586826348,0.6666666666666666,0.6686626746506986,0.6706586826347305,0.6726546906187625,0.6746506986027944,0.6766467065868264,0.6786427145708582,0.6806387225548902,0.6826347305389222,0.6846307385229541,0.6866267465069861,0.688622754491018,0.6906187624750499,0.6926147704590818,0.6946107784431138,0.6966067864271457,0.6986027944111777,0.7005988023952096,0.7025948103792415,0.7045908183632734,0.7065868263473054,0.7085828343313373,0.7105788423153693,0.7125748502994012,0.7145708582834331,0.716566866267465,0.718562874251497,0.720558882235529,0.7225548902195609,0.7245508982035929,0.7265469061876247,0.7285429141716567,0.7305389221556886,0.7325349301397206,0.7345309381237525,0.7365269461077845,0.7385229540918163,0.7405189620758483,0.7425149700598802,0.7445109780439122,0.7465069860279441,0.7485029940119761,0.7504990019960079,0.7524950099800399,0.7544910179640718,0.7564870259481038,0.7584830339321357,0.7604790419161677,0.7624750499001997,0.7644710578842315,0.7664670658682635,0.7684630738522954,0.7704590818363274,0.7724550898203593,0.7744510978043913,0.7764471057884231,0.7784431137724551,0.780439121756487,0.782435129740519,0.7844311377245509,0.7864271457085829,0.7884231536926147,0.7904191616766467,0.7924151696606786,0.7944111776447106,0.7964071856287425,0.7984031936127745,0.8003992015968064,0.8023952095808383,0.8043912175648703,0.8063872255489022,0.8083832335329342,0.810379241516966,0.812375249500998,0.8143712574850299,0.8163672654690619,0.8183632734530938,0.8203592814371258,0.8223552894211577,0.8243512974051896,0.8263473053892215,0.8283433133732535,0.8303393213572854,0.8323353293413174,0.8343313373253493,0.8363273453093812,0.8383233532934131,0.8403193612774451,0.8423153692614771,0.844311377245509,0.846307385229541,0.8483033932135728,0.8502994011976048,0.8522954091816367,0.8542914171656687,0.8562874251497006,0.8582834331337326,0.8602794411177644,0.8622754491017964,0.8642714570858283,0.8662674650698603,0.8682634730538922,0.8702594810379242,0.872255489021956,0.874251497005988,0.8762475049900199,0.8782435129740519,0.8802395209580839,0.8822355289421158,0.8842315369261478,0.8862275449101796,0.8882235528942116,0.8902195608782435,0.8922155688622755,0.8942115768463074,0.8962075848303394,0.8982035928143712,0.9001996007984032,0.9021956087824351,0.9041916167664671,0.906187624750499,0.908183632734531,0.9101796407185628,0.9121756487025948,0.9141716566866267,0.9161676646706587,0.9181636726546906,0.9201596806387226,0.9221556886227545,0.9241516966067864,0.9261477045908184,0.9281437125748503,0.9301397205588823,0.9321357285429142,0.9341317365269461,0.936127744510978,0.93812375249501,0.9401197604790419,0.9421157684630739,0.9441117764471058,0.9461077844311377,0.9481037924151696,0.9500998003992016,0.9520958083832335,0.9540918163672655,0.9560878243512974,0.9580838323353293,0.9600798403193613,0.9620758483033932,0.9640718562874252,0.9660678642714571,0.9680638722554891,0.9700598802395209,0.9720558882235529,0.9740518962075848,0.9760479041916168,0.9780439121756487,0.9800399201596807,0.9820359281437125,0.9840319361277445,0.9860279441117764,0.9880239520958084,0.9900199600798403,0.9920159680638723,0.9940119760479041,0.9960079840319361,0.998003992015968,0.0],"integral":[-1.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,1.0],"x":[-1.0,-0.998003992015968,-0.9960079840319361,-0.9940119760479041,-0.9920159680638723,-0.9900199600798403,-0.9880239520958084,-0.9860279441117764,-0.9840319361277445,-0.9820359281437125,-0.9800399201596807,-0.9780439121756487,-0.9760479041916168,-0.9740518962075848,-0.9720558882235529,-0.9700598802395209,-0.9680638722554891,-0.9660678642714571,-0.9640718562874252,-0.9620758483033932,-0.9600798403193613,-0.9580838323353293,-0.9560878243512974,-0.9540918163672655,-0.9520958083832335,-0.9500998003992016,-0.9481037924151696,-0.9461077844311377,-0.9441117764471058,-0.9421157684630739,-0.9401197604790419,-0.93812375249501,-0.936127744510978,-0.9341317365269461,-0.9321357285429142,-0.9301397205588823,-0.9281437125748503,-0.9261477045908184,-0.9241516966067864,-0.9221556886227545,-0.9201596806387226,-0.9181636726546906,-0.9161676646706587,-0.9141716566866267,-0.9121756487025948,-0.9101796407185628,-0.908183632734531,-0.906187624750499,-0.9041916167664671,-0.9021956087824351,-0.9001996007984032,-0.8982035928143712,-0.8962075848303394,-0.8942115768463074,-0.8922155688622755,-0.8902195608782435,-0.8882235528942116,-0.8862275449101796,-0.8842315369261478,-0.8822355289421158,-0.8802395209580839,-0.8782435129740519,-0.8762475049900199,-0.874251497005988,-0.872255489021956,-0.8702594810379242,-0.8682634730538922,-0.8662674650698603,-0.8642714570858283,-0.8622754491017964,-0.8602794411177644,-0.8582834331337326,-0.8562874251497006,-0.8542914171656687,-0.8522954091816367,-0.8502994011976048,-0.8483033932135728,-0.846307385229541,-0.844311377245509,-0.8423153692614771,-0.8403193612774451,-0.8383233532934131,-0.8363273453093812,-0.8343313373253493,-0.8323353293413174,-0.8303393213572854,-0.8283433133732535,-0.8263473053892215,-0.8243512974051896,-0.8223552894211577,-0.8203592814371258,-0.8183632734530938,-0.8163672654690619,-0.8143712574850299,-0.812375249500998,-0.810379241516966,-0.8083832335329342,-0.8063872255489022,-0.8043912175648703,-0.8023952095808383,-0.8003992015968064,-0.7984031936127745,-0.7964071856287425,-0.7944111776447106,-0.7924151696606786,-0.7904191616766467,-0.7884231536926147,-0.7864271457085829,-0.7844311377245509,-0.782435129740519,-0.780439121756487,-0.7784431137724551,-0.7764471057884231,-0.7744510978043913,-0.7724550898203593,-0.7704590818363274,-0.7684630738522954,-0.7664670658682635,-0.7644710578842315,-0.7624750499001997,-0.7604790419161677,-0.7584830339321357,-0.7564870259481038,-0.7544910179640718,-0.7524950099800399,-0.7504990019960079,-0.7485029940119761,-0.7465069860279441,-0.7445109780439122,-0.7425149700598802,-0.7405189620758483,-0.7385229540918163,-0.7365269461077845,-0.7345309381237525,-0.7325349301397206,-0.7305389221556886,-0.7285429141716567,-0.7265469061876247,-0.7245508982035929,-0.7225548902195609,-0.720558882235529,-0.718562874251497,-0.716566866267465,-0.7145708582834331,-0.7125748502994012,-0.7105788423153693,-0.7085828343313373,-0.7065868263473054,-0.7045908183632734,-0.7025948103792415,-0.7005988023952096,-0.6986027944111777,-0.6966067864271457,-0.6946107784431138,-0.6926147704590818,-0.6906187624750499,-0.688622754491018,-0.6866267465069861,-0.6846307385229541,-0.6826347305389222,-0.6806387225548902,-0.6786427145708582,-0.6766467065868264,-0.6746506986027944,-0.6726546906187625,-0.6706586826347305,-0.6686626746506986,-0.6666666666666666,-0.6646706586826348,-0.6626746506986028,-0.6606786427145709,-0.6586826347305389,-0.656686626746507,-0.654690618762475,-0.6526946107784432,-0.6506986027944112,-0.6487025948103793,-0.6467065868263473,-0.6447105788423154,-0.6427145708582834,-0.6407185628742516,-0.6387225548902196,-0.6367265469061876,-0.6347305389221557,-0.6327345309381237,-0.6307385229540918,-0.6287425149700598,-0.626746506986028,-0.624750499001996,-0.6227544910179641,-0.6207584830339321,-0.6187624750499002,-0.6167664670658682,-0.6147704590818364,-0.6127744510978044,-0.6107784431137725,-0.6087824351297405,-0.6067864271457086,-0.6047904191616766,-0.6027944111776448,-0.6007984031936128,-0.5988023952095808,-0.5968063872255489,-0.5948103792415169,-0.592814371257485,-0.590818363273453,-0.5888223552894212,-0.5868263473053892,-0.5848303393213573,-0.5828343313373253,-0.5808383233532934,-0.5788423153692615,-0.5768463073852296,-0.5748502994011976,-0.5728542914171657,-0.5708582834331337,-0.5688622754491018,-0.5668662674650699,-0.564870259481038,-0.562874251497006,-0.5608782435129741,-0.5588822355289421,-0.5568862275449101,-0.5548902195608783,-0.5528942115768463,-0.5508982035928144,-0.5489021956087824,-0.5469061876247505,-0.5449101796407185,-0.5429141716566867,-0.5409181636726547,-0.5389221556886228,-0.5369261477045908,-0.5349301397205589,-0.5329341317365269,-0.530938123752495,-0.5289421157684631,-0.5269461077844312,-0.5249500998003992,-0.5229540918163673,-0.5209580838323353,-0.5189620758483033,-0.5169660678642715,-0.5149700598802395,-0.5129740518962076,-0.5109780439121756,-0.5089820359281437,-0.5069860279441117,-0.5049900199600799,-0.5029940119760479,-0.500998003992016,-0.499001996007984,-0.49700598802395207,-0.49500998003992014,-0.4930139720558882,-0.49101796407185627,-0.48902195608782434,-0.4870259481037924,-0.48502994011976047,-0.48303393213572854,-0.4810379241516966,-0.47904191616766467,-0.47704590818363274,-0.4750499001996008,-0.47305389221556887,-0.47105788423153694,-0.469061876247505,-0.46706586826347307,-0.46506986027944114,-0.4630738522954092,-0.46107784431137727,-0.4590818363273453,-0.45708582834331335,-0.4550898203592814,-0.4530938123752495,-0.45109780439121755,-0.4491017964071856,-0.4471057884231537,-0.44510978043912175,-0.4431137724550898,-0.4411177644710579,-0.43912175648702595,-0.437125748502994,-0.4351297405189621,-0.43313373253493015,-0.4311377245508982,-0.4291417165668663,-0.42714570858283435,-0.4251497005988024,-0.4231536926147705,-0.42115768463073855,-0.41916167664670656,-0.4171656686626746,-0.4151696606786427,-0.41317365269461076,-0.4111776447105788,-0.4091816367265469,-0.40718562874251496,-0.405189620758483,-0.4031936127744511,-0.40119760479041916,-0.3992015968063872,-0.3972055888223553,-0.39520958083832336,-0.3932135728542914,-0.3912175648702595,-0.38922155688622756,-0.3872255489021956,-0.3852295409181637,-0.38323353293413176,-0.3812375249500998,-0.37924151696606784,-0.3772455089820359,-0.37524950099800397,-0.37325349301397204,-0.3712574850299401,-0.36926147704590817,-0.36726546906187624,-0.3652694610778443,-0.36327345309381237,-0.36127744510978044,-0.3592814371257485,-0.35728542914171657,-0.35528942115768464,-0.3532934131736527,-0.35129740518962077,-0.34930139720558884,-0.3473053892215569,-0.34530938123752497,-0.34331337325349304,-0.3413173652694611,-0.3393213572854291,-0.3373253493013972,-0.33532934131736525,-0.3333333333333333,-0.3313373253493014,-0.32934131736526945,-0.3273453093812375,-0.3253493013972056,-0.32335329341317365,-0.3213572854291417,-0.3193612774451098,-0.31736526946107785,-0.3153692614770459,-0.313373253493014,-0.31137724550898205,-0.3093812375249501,-0.3073852295409182,-0.30538922155688625,-0.3033932135728543,-0.3013972055888224,-0.2994011976047904,-0.29740518962075846,-0.2954091816367265,-0.2934131736526946,-0.29141716566866266,-0.2894211576846307,-0.2874251497005988,-0.28542914171656686,-0.2834331337325349,-0.281437125748503,-0.27944111776447106,-0.2774451097804391,-0.2754491017964072,-0.27345309381237526,-0.2714570858283433,-0.2694610778443114,-0.26746506986027946,-0.2654690618762475,-0.2634730538922156,-0.26147704590818366,-0.25948103792415167,-0.25748502994011974,-0.2554890219560878,-0.25349301397205587,-0.25149700598802394,-0.249500998003992,-0.24750499001996007,-0.24550898203592814,-0.2435129740518962,-0.24151696606786427,-0.23952095808383234,-0.2375249500998004,-0.23552894211576847,-0.23353293413173654,-0.2315369261477046,-0.22954091816367264,-0.2275449101796407,-0.22554890219560877,-0.22355289421157684,-0.2215568862275449,-0.21956087824351297,-0.21756487025948104,-0.2155688622754491,-0.21357285429141717,-0.21157684630738524,-0.20958083832335328,-0.20758483033932135,-0.2055888223552894,-0.20359281437125748,-0.20159680638722555,-0.1996007984031936,-0.19760479041916168,-0.19560878243512975,-0.1936127744510978,-0.19161676646706588,-0.18962075848303392,-0.18762475049900199,-0.18562874251497005,-0.18363273453093812,-0.18163672654690619,-0.17964071856287425,-0.17764471057884232,-0.17564870259481039,-0.17365269461077845,-0.17165668662674652,-0.16966067864271456,-0.16766467065868262,-0.1656686626746507,-0.16367265469061876,-0.16167664670658682,-0.1596806387225549,-0.15768463073852296,-0.15568862275449102,-0.1536926147704591,-0.15169660678642716,-0.1497005988023952,-0.14770459081836326,-0.14570858283433133,-0.1437125748502994,-0.14171656686626746,-0.13972055888223553,-0.1377245508982036,-0.13572854291417166,-0.13373253493013973,-0.1317365269461078,-0.12974051896207583,-0.1277445109780439,-0.12574850299401197,-0.12375249500998003,-0.1217564870259481,-0.11976047904191617,-0.11776447105788423,-0.1157684630738523,-0.11377245508982035,-0.11177644710578842,-0.10978043912175649,-0.10778443113772455,-0.10578842315369262,-0.10379241516966067,-0.10179640718562874,-0.0998003992015968,-0.09780439121756487,-0.09580838323353294,-0.09381237524950099,-0.09181636726546906,-0.08982035928143713,-0.08782435129740519,-0.08582834331337326,-0.08383233532934131,-0.08183632734530938,-0.07984031936127745,-0.07784431137724551,-0.07584830339321358,-0.07385229540918163,-0.0718562874251497,-0.06986027944111776,-0.06786427145708583,-0.0658682634730539,-0.06387225548902195,-0.06187624750499002,-0.059880239520958084,-0.05788423153692615,-0.05588822355289421,-0.05389221556886228,-0.05189620758483034,-0.0499001996007984,-0.04790419161676647,-0.04590818363273453,-0.043912175648702596,-0.041916167664670656,-0.03992015968063872,-0.03792415169660679,-0.03592814371257485,-0.033932135728542916,-0.031936127744510975,-0.029940119760479042,-0.027944111776447105,-0.02594810379241517,-0.023952095808383235,-0.021956087824351298,-0.01996007984031936,-0.017964071856287425,-0.015968063872255488,-0.013972055888223553,-0.011976047904191617,-0.00998003992015968,-0.007984031936127744,-0.005988023952095809,-0.003992015968063872,-0.001996007984031936,0.0,0.001996007984031936,0.003992015968063872,0.005988023952095809,0.007984031936127744,0.00998003992015968,0.011976047904191617,0.013972055888223553,0.015968063872255488,0.017964071856287425,0.01996007984031936,0.021956087824351298,0.023952095808383235,0.02594810379241517,0.027944111776447105,0.029940119760479042,0.031936127744510975,0.033932135728542916,0.03592814371257485,0.03792415169660679,0.03992015968063872,0.041916167664670656,0.043912175648702596,0.04590818363273453,0.04790419161676647,0.0499001996007984,0.05189620758483034,0.05389221556886228,0.05588822355289421,0.05788423153692615,0.059880239520958084,0.06187624750499002,0.06387225548902195,0.0658682634730539,0.06786427145708583,0.06986027944111776,0.0718562874251497,0.07385229540918163,0.07584830339321358,0.07784431137724551,0.07984031936127745,0.08183632734530938,0.08383233532934131,0.08582834331337326,0.08782435129740519,0.08982035928143713,0.09181636726546906,0.09381237524950099,0.09580838323353294,0.09780439121756487,0.0998003992015968,0.10179640718562874,0.10379241516966067,0.10578842315369262,0.10778443113772455,0.10978043912175649,0.11177644710578842,0.11377245508982035,0.1157684630738523,0.11776447105788423,0.11976047904191617,0.1217564870259481,0.12375249500998003,0.12574850299401197,0.1277445109780439,0.12974051896207583,0.1317365269461078,0.13373253493013973,0.13572854291417166,0.1377245508982036,0.13972055888223553,0.14171656686626746,0.1437125748502994,0.14570858283433133,0.14770459081836326,0.1497005988023952,0.15169660678642716,0.1536926147704591,0.15568862275449102,0.15768463073852296,0.1596806387225549,0.16167664670658682,0.16367265469061876,0.1656686626746507,0.16766467065868262,0.16966067864271456,0.17165668662674652,0.17365269461077845,0.17564870259481039,0.17764471057884232,0.17964071856287425,0.18163672654690619,0.18363273453093812,0.18562874251497005,0.18762475049900199,0.18962075848303392,0.19161676646706588,0.1936127744510978,0.19560878243512975,0.19760479041916168,0.1996007984031936,0.20159680638722555,0.20359281437125748,0.2055888223552894,0.20758483033932135,0.20958083832335328,0.21157684630738524,0.21357285429141717,0.2155688622754491,0.21756487025948104,0.21956087824351297,0.2215568862275449,0.22355289421157684,0.22554890219560877,0.2275449101796407,0.22954091816367264,0.2315369261477046,0.23353293413173654,0.23552894211576847,0.2375249500998004,0.23952095808383234,0.24151696606786427,0.2435129740518962,0.24550898203592814,0.24750499001996007,0.249500998003992,0.25149700598802394,0.25349301397205587,0.2554890219560878,0.25748502994011974,0.25948103792415167,0.26147704590818366,0.2634730538922156,0.2654690618762475,0.26746506986027946,0.2694610778443114,0.2714570858283433,0.27345309381237526,0.2754491017964072,0.2774451097804391,0.27944111776447106,0.281437125748503,0.2834331337325349,0.28542914171656686,0.2874251497005988,0.2894211576846307,0.29141716566866266,0.2934131736526946,0.2954091816367265,0.29740518962075846,0.2994011976047904,0.3013972055888224,0.3033932135728543,0.30538922155688625,0.3073852295409182,0.3093812375249501,0.31137724550898205,0.313373253493014,0.3153692614770459,0.31736526946107785,0.3193612774451098,0.3213572854291417,0.32335329341317365,0.3253493013972056,0.3273453093812375,0.32934131736526945,0.3313373253493014,0.3333333333333333,0.33532934131736525,0.3373253493013972,0.3393213572854291,0.3413173652694611,0.34331337325349304,0.34530938123752497,0.3473053892215569,0.34930139720558884,0.35129740518962077,0.3532934131736527,0.35528942115768464,0.35728542914171657,0.3592814371257485,0.36127744510978044,0.36327345309381237,0.3652694610778443,0.36726546906187624,0.36926147704590817,0.3712574850299401,0.37325349301397204,0.37524950099800397,0.3772455089820359,0.37924151696606784,0.3812375249500998,0.38323353293413176,0.3852295409181637,0.3872255489021956,0.38922155688622756,0.3912175648702595,0.3932135728542914,0.39520958083832336,0.3972055888223553,0.3992015968063872,0.40119760479041916,0.4031936127744511,0.405189620758483,0.40718562874251496,0.4091816367265469,0.4111776447105788,0.41317365269461076,0.4151696606786427,0.4171656686626746,0.41916167664670656,0.42115768463073855,0.4231536926147705,0.4251497005988024,0.42714570858283435,0.4291417165668663,0.4311377245508982,0.43313373253493015,0.4351297405189621,0.437125748502994,0.43912175648702595,0.4411177644710579,0.4431137724550898,0.44510978043912175,0.4471057884231537,0.4491017964071856,0.45109780439121755,0.4530938123752495,0.4550898203592814,0.45708582834331335,0.4590818363273453,0.46107784431137727,0.4630738522954092,0.46506986027944114,0.46706586826347307,0.469061876247505,0.47105788423153694,0.47305389221556887,0.4750499001996008,0.47704590818363274,0.47904191616766467,0.4810379241516966,0.48303393213572854,0.48502994011976047,0.4870259481037924,0.48902195608782434,0.49101796407185627,0.4930139720558882,0.49500998003992014,0.49700598802395207,0.499001996007984,0.500998003992016,0.5029940119760479,0.5049900199600799,0.5069860279441117,0.5089820359281437,0.5109780439121756,0.5129740518962076,0.5149700598802395,0.5169660678642715,0.5189620758483033,0.5209580838323353,0.5229540918163673,0.5249500998003992,0.5269461077844312,0.5289421157684631,0.530938123752495,0.5329341317365269,0.5349301397205589,0.5369261477045908,0.5389221556886228,0.5409181636726547,0.5429141716566867,0.5449101796407185,0.5469061876247505,0.5489021956087824,0.5508982035928144,0.5528942115768463,0.5548902195608783,0.5568862275449101,0.5588822355289421,0.5608782435129741,0.562874251497006,0.564870259481038,0.5668662674650699,0.5688622754491018,0.5708582834331337,0.5728542914171657,0.5748502994011976,0.5768463073852296,0.5788423153692615,0.5808383233532934,0.5828343313373253,0.5848303393213573,0.5868263473053892,0.5888223552894212,0.590818363273453,0.592814371257485,0.5948103792415169,0.5968063872255489,0.5988023952095808,0.6007984031936128,0.6027944111776448,0.6047904191616766,0.6067864271457086,0.6087824351297405,0.6107784431137725,0.6127744510978044,0.6147704590818364,0.6167664670658682,0.6187624750499002,0.6207584830339321,0.6227544910179641,0.624750499001996,0.626746506986028,0.6287425149700598,0.6307385229540918,0.6327345309381237,0.6347305389221557,0.6367265469061876,0.6387225548902196,0.6407185628742516,0.6427145708582834,0.6447105788423154,0.6467065868263473,0.6487025948103793,0.6506986027944112,0.6526946107784432,0.654690618762475,0.656686626746507,0.6586826347305389,0.6606786427145709,0.6626746506986028,0.6646706586826348,0.6666666666666666,0.6686626746506986,0.6706586826347305,0.6726546906187625,0.6746506986027944,0.6766467065868264,0.6786427145708582,0.6806387225548902,0.6826347305389222,0.6846307385229541,0.6866267465069861,0.688622754491018,0.6906187624750499,0.6926147704590818,0.6946107784431138,0.6966067864271457,0.6986027944111777,0.7005988023952096,0.7025948103792415,0.7045908183632734,0.7065868263473054,0.7085828343313373,0.7105788423153693,0.7125748502994012,0.7145708582834331,0.716566866267465,0.718562874251497,0.720558882235529,0.7225548902195609,0.7245508982035929,0.7265469061876247,0.7285429141716567,0.7305389221556886,0.7325349301397206,0.7345309381237525,0.7365269461077845,0.7385229540918163,0.7405189620758483,0.7425149700598802,0.7445109780439122,0.7465069860279441,0.7485029940119761,0.7504990019960079,0.7524950099800399,0.7544910179640718,0.7564870259481038,0.7584830339321357,0.7604790419161677,0.7624750499001997,0.7644710578842315,0.7664670658682635,0.7684630738522954,0.7704590818363274,0.7724550898203593,0.7744510978043913,0.7764471057884231,0.7784431137724551,0.780439121756487,0.782435129740519,0.7844311377245509,0.7864271457085829,0.7884231536926147,0.7904191616766467,0.7924151696606786,0.7944111776447106,0.7964071856287425,0.7984031936127745,0.8003992015968064,0.8023952095808383,0.8043912175648703,0.8063872255489022,0.8083832335329342,0.810379241516966,0.812375249500998,0.8143712574850299,0.8163672654690619,0.8183632734530938,0.8203592814371258,0.8223552894211577,0.8243512974051896,0.8263473053892215,0.8283433133732535,0.8303393213572854,0.8323353293413174,0.8343313373253493,0.8363273453093812,0.8383233532934131,0.8403193612774451,0.8423153692614771,0.844311377245509,0.846307385229541,0.8483033932135728,0.8502994011976048,0.8522954091816367,0.8542914171656687,0.8562874251497006,0.8582834331337326,0.8602794411177644,0.8622754491017964,0.8642714570858283,0.8662674650698603,0.8682634730538922,0.8702594810379242,0.872255489021956,0.874251497005988,0.8762475049900199,0.8782435129740519,0.8802395209580839,0.8822355289421158,0.8842315369261478,0.8862275449101796,0.8882235528942116,0.8902195608782435,0.8922155688622755,0.8942115768463074,0.8962075848303394,0.8982035928143712,0.9001996007984032,0.9021956087824351,0.9041916167664671,0.906187624750499,0.908183632734531,0.9101796407185628,0.9121756487025948,0.9141716566866267,0.9161676646706587,0.9181636726546906,0.9201596806387226,0.9221556886227545,0.9241516966067864,0.9261477045908184,0.9281437125748503,0.9301397205588823,0.9321357285429142,0.9341317365269461,0.936127744510978,0.93812375249501,0.9401197604790419,0.9421157684630739,0.9441117764471058,0.9461077844311377,0.9481037924151696,0.9500998003992016,0.9520958083832335,0.9540918163672655,0.9560878243512974,0.9580838323353293,0.9600798403193613,0.9620758483033932,0.9640718562874252,0.9660678642714571,0.9680638722554891,0.9700598802395209,0.9720558882235529,0.9740518962075848,0.9760479041916168,0.9780439121756487,0.9800399201596807,0.9820359281437125,0.9840319361277445,0.9860279441117764,0.9880239520958084,0.9900199600798403,0.9920159680638723,0.9940119760479041,0.9960079840319361,0.998003992015968,1.0]}

},{}],83:[function(require,module,exports){
module.exports={"frac":[1.0e-314,9.991017965e-315,9.982035926e-315,9.97305389e-315,9.964071857e-315,9.95508982e-315,9.946107783e-315,9.93712575e-315,9.928143715e-315,9.919161675e-315,9.91017964e-315,9.901197607e-315,9.892215567e-315,9.883233533e-315,9.8742515e-315,9.86526946e-315,9.856287425e-315,9.84730539e-315,9.83832335e-315,9.829341317e-315,9.82035928e-315,9.811377243e-315,9.80239521e-315,9.793413174e-315,9.78443114e-315,9.7754491e-315,9.766467066e-315,9.75748503e-315,9.74850299e-315,9.73952096e-315,9.730538923e-315,9.721556884e-315,9.71257485e-315,9.703592815e-315,9.694610776e-315,9.68562874e-315,9.676646707e-315,9.66766467e-315,9.658682633e-315,9.6497006e-315,9.640718565e-315,9.631736525e-315,9.62275449e-315,9.613772457e-315,9.604790417e-315,9.595808383e-315,9.58682635e-315,9.57784431e-315,9.568862275e-315,9.55988024e-315,9.5508982e-315,9.541916167e-315,9.53293413e-315,9.523952093e-315,9.51497006e-315,9.505988024e-315,9.49700599e-315,9.48802395e-315,9.479041916e-315,9.47005988e-315,9.46107784e-315,9.45209581e-315,9.443113774e-315,9.434131734e-315,9.4251497e-315,9.416167665e-315,9.407185626e-315,9.39820359e-315,9.389221557e-315,9.380239523e-315,9.371257484e-315,9.36227545e-315,9.353293415e-315,9.344311375e-315,9.33532934e-315,9.326347307e-315,9.317365267e-315,9.308383233e-315,9.2994012e-315,9.29041916e-315,9.281437125e-315,9.27245509e-315,9.26347305e-315,9.254491017e-315,9.24550898e-315,9.23652695e-315,9.22754491e-315,9.218562874e-315,9.20958084e-315,9.2005988e-315,9.191616766e-315,9.18263473e-315,9.17365269e-315,9.16467066e-315,9.155688624e-315,9.146706584e-315,9.13772455e-315,9.128742516e-315,9.119760476e-315,9.11077844e-315,9.101796407e-315,9.092814373e-315,9.083832334e-315,9.0748503e-315,9.065868265e-315,9.056886226e-315,9.04790419e-315,9.038922157e-315,9.029940117e-315,9.020958083e-315,9.01197605e-315,9.00299401e-315,8.994011975e-315,8.98502994e-315,8.976047906e-315,8.967065867e-315,8.95808383e-315,8.9491018e-315,8.94011976e-315,8.931137724e-315,8.92215569e-315,8.91317365e-315,8.904191616e-315,8.89520958e-315,8.886227542e-315,8.87724551e-315,8.868263474e-315,8.859281434e-315,8.8502994e-315,8.841317366e-315,8.83233533e-315,8.82335329e-315,8.814371257e-315,8.805389223e-315,8.796407184e-315,8.78742515e-315,8.778443115e-315,8.769461076e-315,8.76047904e-315,8.751497007e-315,8.742514968e-315,8.733532933e-315,8.7245509e-315,8.71556886e-315,8.706586825e-315,8.69760479e-315,8.688622756e-315,8.679640717e-315,8.670658683e-315,8.66167665e-315,8.65269461e-315,8.643712574e-315,8.63473054e-315,8.6257485e-315,8.616766466e-315,8.60778443e-315,8.598802393e-315,8.58982036e-315,8.580838324e-315,8.571856284e-315,8.56287425e-315,8.553892216e-315,8.54491018e-315,8.53592814e-315,8.52694611e-315,8.517964073e-315,8.508982034e-315,8.5e-315,8.491017965e-315,8.482035926e-315,8.47305389e-315,8.464071857e-315,8.45508982e-315,8.446107783e-315,8.43712575e-315,8.428143714e-315,8.419161675e-315,8.41017964e-315,8.401197606e-315,8.392215567e-315,8.383233533e-315,8.3742515e-315,8.36526946e-315,8.356287424e-315,8.34730539e-315,8.33832335e-315,8.329341316e-315,8.32035928e-315,8.311377243e-315,8.30239521e-315,8.293413174e-315,8.28443114e-315,8.2754491e-315,8.266467066e-315,8.25748503e-315,8.24850299e-315,8.23952096e-315,8.230538923e-315,8.221556884e-315,8.21257485e-315,8.203592815e-315,8.194610776e-315,8.18562874e-315,8.176646707e-315,8.16766467e-315,8.158682633e-315,8.1497006e-315,8.140718565e-315,8.131736525e-315,8.12275449e-315,8.113772456e-315,8.104790417e-315,8.095808383e-315,8.08682635e-315,8.07784431e-315,8.068862275e-315,8.05988024e-315,8.0508982e-315,8.041916166e-315,8.03293413e-315,8.023952093e-315,8.01497006e-315,8.005988024e-315,7.99700599e-315,7.98802395e-315,7.979041916e-315,7.97005988e-315,7.96107784e-315,7.95209581e-315,7.943113773e-315,7.934131734e-315,7.9251497e-315,7.916167665e-315,7.907185626e-315,7.89820359e-315,7.889221557e-315,7.880239523e-315,7.871257483e-315,7.86227545e-315,7.853293415e-315,7.844311375e-315,7.83532934e-315,7.826347306e-315,7.817365267e-315,7.808383233e-315,7.7994012e-315,7.79041916e-315,7.781437125e-315,7.77245509e-315,7.76347305e-315,7.754491017e-315,7.74550898e-315,7.73652695e-315,7.72754491e-315,7.718562874e-315,7.70958084e-315,7.7005988e-315,7.691616766e-315,7.68263473e-315,7.67365269e-315,7.66467066e-315,7.655688623e-315,7.646706584e-315,7.63772455e-315,7.628742515e-315,7.619760476e-315,7.61077844e-315,7.601796407e-315,7.592814373e-315,7.583832333e-315,7.5748503e-315,7.565868265e-315,7.556886225e-315,7.54790419e-315,7.538922157e-315,7.529940117e-315,7.520958083e-315,7.51197605e-315,7.50299401e-315,7.494011975e-315,7.48502994e-315,7.476047906e-315,7.467065867e-315,7.45808383e-315,7.4491018e-315,7.44011976e-315,7.431137724e-315,7.42215569e-315,7.41317365e-315,7.404191616e-315,7.39520958e-315,7.38622754e-315,7.37724551e-315,7.368263474e-315,7.359281434e-315,7.3502994e-315,7.341317365e-315,7.33233533e-315,7.32335329e-315,7.314371257e-315,7.305389223e-315,7.296407184e-315,7.28742515e-315,7.278443115e-315,7.269461075e-315,7.26047904e-315,7.251497007e-315,7.242514967e-315,7.233532933e-315,7.2245509e-315,7.21556886e-315,7.206586825e-315,7.19760479e-315,7.188622756e-315,7.179640717e-315,7.17065868e-315,7.16167665e-315,7.15269461e-315,7.143712574e-315,7.13473054e-315,7.1257485e-315,7.116766466e-315,7.10778443e-315,7.09880239e-315,7.08982036e-315,7.080838324e-315,7.071856284e-315,7.06287425e-315,7.053892215e-315,7.04491018e-315,7.03592814e-315,7.026946107e-315,7.017964073e-315,7.008982034e-315,7.0e-315,6.991017965e-315,6.982035926e-315,6.97305389e-315,6.964071857e-315,6.955089817e-315,6.946107783e-315,6.93712575e-315,6.928143714e-315,6.919161675e-315,6.91017964e-315,6.901197606e-315,6.892215567e-315,6.88323353e-315,6.8742515e-315,6.86526946e-315,6.856287424e-315,6.84730539e-315,6.83832335e-315,6.829341316e-315,6.82035928e-315,6.81137724e-315,6.80239521e-315,6.793413174e-315,6.78443114e-315,6.7754491e-315,6.766467066e-315,6.75748503e-315,6.74850299e-315,6.739520957e-315,6.730538923e-315,6.721556884e-315,6.71257485e-315,6.703592815e-315,6.694610776e-315,6.68562874e-315,6.676646707e-315,6.667664668e-315,6.658682633e-315,6.6497006e-315,6.640718564e-315,6.631736525e-315,6.62275449e-315,6.613772456e-315,6.604790417e-315,6.595808382e-315,6.58682635e-315,6.57784431e-315,6.568862274e-315,6.55988024e-315,6.5508982e-315,6.541916166e-315,6.53293413e-315,6.523952093e-315,6.51497006e-315,6.505988024e-315,6.49700599e-315,6.48802395e-315,6.479041916e-315,6.47005988e-315,6.46107784e-315,6.45209581e-315,6.443113773e-315,6.434131734e-315,6.4251497e-315,6.416167665e-315,6.407185626e-315,6.39820359e-315,6.389221557e-315,6.380239523e-315,6.371257483e-315,6.36227545e-315,6.353293414e-315,6.344311375e-315,6.33532934e-315,6.326347306e-315,6.317365267e-315,6.308383233e-315,6.2994012e-315,6.29041916e-315,6.281437124e-315,6.27245509e-315,6.26347305e-315,6.254491016e-315,6.24550898e-315,6.23652695e-315,6.22754491e-315,6.218562874e-315,6.20958084e-315,6.2005988e-315,6.191616766e-315,6.18263473e-315,6.17365269e-315,6.16467066e-315,6.155688623e-315,6.146706584e-315,6.13772455e-315,6.128742515e-315,6.119760476e-315,6.11077844e-315,6.101796407e-315,6.092814373e-315,6.083832333e-315,6.0748503e-315,6.065868264e-315,6.056886225e-315,6.04790419e-315,6.038922156e-315,6.029940117e-315,6.020958083e-315,6.01197605e-315,6.00299401e-315,5.994011975e-315,5.98502994e-315,5.976047906e-315,5.967065866e-315,5.95808383e-315,5.9491018e-315,5.94011976e-315,5.931137724e-315,5.92215569e-315,5.91317365e-315,5.904191616e-315,5.89520958e-315,5.88622754e-315,5.87724551e-315,5.868263473e-315,5.859281434e-315,5.8502994e-315,5.841317365e-315,5.83233533e-315,5.82335329e-315,5.814371257e-315,5.805389223e-315,5.796407183e-315,5.78742515e-315,5.778443115e-315,5.769461075e-315,5.76047904e-315,5.751497006e-315,5.742514967e-315,5.733532933e-315,5.7245509e-315,5.71556886e-315,5.706586825e-315,5.69760479e-315,5.688622756e-315,5.679640717e-315,5.67065868e-315,5.66167665e-315,5.65269461e-315,5.643712574e-315,5.63473054e-315,5.6257485e-315,5.616766466e-315,5.60778443e-315,5.59880239e-315,5.58982036e-315,5.580838323e-315,5.571856284e-315,5.56287425e-315,5.553892215e-315,5.54491018e-315,5.53592814e-315,5.526946107e-315,5.517964073e-315,5.508982033e-315,5.5e-315,5.491017965e-315,5.482035925e-315,5.47305389e-315,5.464071857e-315,5.455089817e-315,5.446107783e-315,5.43712575e-315,5.428143714e-315,5.419161675e-315,5.41017964e-315,5.401197606e-315,5.392215567e-315,5.38323353e-315,5.3742515e-315,5.36526946e-315,5.356287424e-315,5.34730539e-315,5.33832335e-315,5.329341316e-315,5.32035928e-315,5.31137724e-315,5.30239521e-315,5.293413173e-315,5.28443114e-315,5.2754491e-315,5.266467065e-315,5.25748503e-315,5.24850299e-315,5.239520957e-315,5.230538923e-315,5.221556884e-315,5.21257485e-315,5.203592815e-315,5.194610775e-315,5.18562874e-315,5.176646707e-315,5.167664667e-315,5.158682633e-315,5.1497006e-315,5.140718564e-315,5.131736525e-315,5.12275449e-315,5.113772456e-315,5.104790417e-315,5.09580838e-315,5.08682635e-315,5.07784431e-315,5.068862274e-315,5.05988024e-315,5.0508982e-315,5.041916166e-315,5.03293413e-315,5.02395209e-315,5.01497006e-315,5.005988024e-315,4.99700599e-315,4.98802395e-315,4.979041915e-315,4.97005988e-315,4.96107784e-315,4.952095807e-315,4.943113773e-315,4.934131734e-315,4.9251497e-315,4.916167665e-315,4.907185626e-315,4.89820359e-315,4.889221557e-315,4.88023952e-315,4.871257483e-315,4.86227545e-315,4.853293414e-315,4.844311375e-315,4.83532934e-315,4.826347306e-315,4.817365267e-315,4.80838323e-315,4.7994012e-315,4.79041916e-315,4.781437124e-315,4.77245509e-315,4.76347305e-315,4.754491016e-315,4.74550898e-315,4.736526947e-315,4.72754491e-315,4.718562874e-315,4.70958084e-315,4.7005988e-315,4.691616766e-315,4.68263473e-315,4.67365269e-315,4.664670657e-315,4.655688623e-315,4.646706584e-315,4.63772455e-315,4.628742515e-315,4.619760476e-315,4.61077844e-315,4.601796407e-315,4.59281437e-315,4.583832333e-315,4.5748503e-315,4.565868264e-315,4.556886225e-315,4.54790419e-315,4.538922156e-315,4.529940117e-315,4.520958082e-315,4.51197605e-315,4.50299401e-315,4.494011974e-315,4.48502994e-315,4.476047906e-315,4.467065866e-315,4.45808383e-315,4.449101797e-315,4.44011976e-315,4.431137724e-315,4.42215569e-315,4.41317365e-315,4.404191616e-315,4.39520958e-315,4.38622754e-315,4.377245508e-315,4.368263473e-315,4.359281434e-315,4.3502994e-315,4.341317365e-315,4.33233533e-315,4.32335329e-315,4.314371257e-315,4.305389223e-315,4.296407183e-315,4.28742515e-315,4.278443114e-315,4.269461075e-315,4.26047904e-315,4.251497006e-315,4.242514967e-315,4.233532933e-315,4.2245509e-315,4.21556886e-315,4.206586824e-315,4.19760479e-315,4.188622756e-315,4.179640716e-315,4.17065868e-315,4.16167665e-315,4.15269461e-315,4.143712574e-315,4.13473054e-315,4.1257485e-315,4.116766466e-315,4.10778443e-315,4.09880239e-315,4.08982036e-315,4.080838323e-315,4.071856284e-315,4.06287425e-315,4.053892215e-315,4.04491018e-315,4.03592814e-315,4.026946107e-315,4.017964073e-315,4.008982033e-315,4.0e-315,3.991017964e-315,3.982035925e-315,3.97305389e-315,3.964071856e-315,3.955089817e-315,3.946107783e-315,3.93712575e-315,3.928143714e-315,3.919161675e-315,3.91017964e-315,3.901197606e-315,3.892215566e-315,3.88323353e-315,3.8742515e-315,3.86526946e-315,3.856287424e-315,3.84730539e-315,3.83832335e-315,3.829341316e-315,3.82035928e-315,3.81137724e-315,3.80239521e-315,3.793413173e-315,3.78443114e-315,3.7754491e-315,3.766467065e-315,3.75748503e-315,3.74850299e-315,3.739520957e-315,3.730538923e-315,3.721556883e-315,3.71257485e-315,3.703592815e-315,3.694610775e-315,3.68562874e-315,3.676646706e-315,3.667664667e-315,3.658682633e-315,3.6497006e-315,3.640718564e-315,3.631736525e-315,3.62275449e-315,3.613772456e-315,3.604790416e-315,3.59580838e-315,3.58682635e-315,3.57784431e-315,3.568862274e-315,3.55988024e-315,3.5508982e-315,3.541916166e-315,3.53293413e-315,3.52395209e-315,3.51497006e-315,3.505988023e-315,3.49700599e-315,3.48802395e-315,3.479041915e-315,3.47005988e-315,3.46107784e-315,3.452095807e-315,3.443113773e-315,3.434131733e-315,3.4251497e-315,3.416167665e-315,3.407185625e-315,3.39820359e-315,3.389221557e-315,3.38023952e-315,3.371257483e-315,3.36227545e-315,3.353293414e-315,3.344311375e-315,3.33532934e-315,3.326347306e-315,3.317365267e-315,3.30838323e-315,3.2994012e-315,3.29041916e-315,3.281437124e-315,3.27245509e-315,3.26347305e-315,3.254491016e-315,3.24550898e-315,3.236526947e-315,3.22754491e-315,3.218562873e-315,3.20958084e-315,3.2005988e-315,3.191616765e-315,3.18263473e-315,3.17365269e-315,3.164670657e-315,3.155688623e-315,3.146706584e-315,3.13772455e-315,3.128742515e-315,3.119760475e-315,3.11077844e-315,3.101796407e-315,3.09281437e-315,3.083832333e-315,3.0748503e-315,3.065868264e-315,3.056886225e-315,3.04790419e-315,3.038922156e-315,3.029940117e-315,3.02095808e-315,3.01197605e-315,3.00299401e-315,2.994011974e-315,2.98502994e-315,2.976047905e-315,2.967065866e-315,2.95808383e-315,2.949101797e-315,2.94011976e-315,2.931137724e-315,2.92215569e-315,2.91317365e-315,2.904191615e-315,2.89520958e-315,2.88622754e-315,2.877245507e-315,2.868263473e-315,2.859281434e-315,2.8502994e-315,2.841317365e-315,2.83233533e-315,2.82335329e-315,2.814371257e-315,2.80538922e-315,2.796407183e-315,2.78742515e-315,2.778443114e-315,2.769461075e-315,2.76047904e-315,2.751497006e-315,2.742514967e-315,2.73353293e-315,2.7245509e-315,2.71556886e-315,2.706586824e-315,2.69760479e-315,2.688622755e-315,2.679640716e-315,2.67065868e-315,2.661676647e-315,2.65269461e-315,2.643712574e-315,2.63473054e-315,2.6257485e-315,2.616766466e-315,2.60778443e-315,2.59880239e-315,2.589820357e-315,2.580838323e-315,2.571856284e-315,2.56287425e-315,2.553892215e-315,2.54491018e-315,2.53592814e-315,2.526946107e-315,2.51796407e-315,2.508982033e-315,2.5e-315,2.491017964e-315,2.482035925e-315,2.47305389e-315,2.464071856e-315,2.455089817e-315,2.44610778e-315,2.43712575e-315,2.428143714e-315,2.419161674e-315,2.41017964e-315,2.401197606e-315,2.392215566e-315,2.38323353e-315,2.374251497e-315,2.36526946e-315,2.356287424e-315,2.34730539e-315,2.33832335e-315,2.329341316e-315,2.32035928e-315,2.31137724e-315,2.302395207e-315,2.293413173e-315,2.28443114e-315,2.2754491e-315,2.266467065e-315,2.25748503e-315,2.24850299e-315,2.239520957e-315,2.230538922e-315,2.221556883e-315,2.21257485e-315,2.203592814e-315,2.194610775e-315,2.18562874e-315,2.176646706e-315,2.167664667e-315,2.158682633e-315,2.1497006e-315,2.140718564e-315,2.131736524e-315,2.12275449e-315,2.113772456e-315,2.104790416e-315,2.09580838e-315,2.086826348e-315,2.07784431e-315,2.068862274e-315,2.05988024e-315,2.0508982e-315,2.041916166e-315,2.03293413e-315,2.02395209e-315,2.01497006e-315,2.005988023e-315,1.99700599e-315,1.98802395e-315,1.979041915e-315,1.97005988e-315,1.96107784e-315,1.952095807e-315,1.943113773e-315,1.934131733e-315,1.9251497e-315,1.916167664e-315,1.907185625e-315,1.89820359e-315,1.889221556e-315,1.88023952e-315,1.871257483e-315,1.86227545e-315,1.853293414e-315,1.844311375e-315,1.83532934e-315,1.826347306e-315,1.817365266e-315,1.80838323e-315,1.7994012e-315,1.79041916e-315,1.781437124e-315,1.77245509e-315,1.76347305e-315,1.754491016e-315,1.74550898e-315,1.736526947e-315,1.72754491e-315,1.718562873e-315,1.70958084e-315,1.7005988e-315,1.691616765e-315,1.68263473e-315,1.67365269e-315,1.664670657e-315,1.655688623e-315,1.646706583e-315,1.63772455e-315,1.628742515e-315,1.619760475e-315,1.61077844e-315,1.601796406e-315,1.59281437e-315,1.583832333e-315,1.5748503e-315,1.565868264e-315,1.556886225e-315,1.54790419e-315,1.538922156e-315,1.529940116e-315,1.52095808e-315,1.51197605e-315,1.50299401e-315,1.494011974e-315,1.48502994e-315,1.476047905e-315,1.467065866e-315,1.45808383e-315,1.449101797e-315,1.44011976e-315,1.431137723e-315,1.42215569e-315,1.41317365e-315,1.404191615e-315,1.39520958e-315,1.38622754e-315,1.377245507e-315,1.368263473e-315,1.359281433e-315,1.3502994e-315,1.341317365e-315,1.33233533e-315,1.32335329e-315,1.314371257e-315,1.30538922e-315,1.296407183e-315,1.28742515e-315,1.278443114e-315,1.269461075e-315,1.26047904e-315,1.251497006e-315,1.242514967e-315,1.23353293e-315,1.2245509e-315,1.21556886e-315,1.206586824e-315,1.19760479e-315,1.188622755e-315,1.179640716e-315,1.17065868e-315,1.161676647e-315,1.15269461e-315,1.143712573e-315,1.13473054e-315,1.1257485e-315,1.116766465e-315,1.10778443e-315,1.09880239e-315,1.089820357e-315,1.080838323e-315,1.071856283e-315,1.06287425e-315,1.053892215e-315,1.04491018e-315,1.03592814e-315,1.026946107e-315,1.01796407e-315,1.008982033e-315,1.0e-315],"integral":[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0],"x":[1.0e-314,9.991017965e-315,9.982035926e-315,9.97305389e-315,9.964071857e-315,9.95508982e-315,9.946107783e-315,9.93712575e-315,9.928143715e-315,9.919161675e-315,9.91017964e-315,9.901197607e-315,9.892215567e-315,9.883233533e-315,9.8742515e-315,9.86526946e-315,9.856287425e-315,9.84730539e-315,9.83832335e-315,9.829341317e-315,9.82035928e-315,9.811377243e-315,9.80239521e-315,9.793413174e-315,9.78443114e-315,9.7754491e-315,9.766467066e-315,9.75748503e-315,9.74850299e-315,9.73952096e-315,9.730538923e-315,9.721556884e-315,9.71257485e-315,9.703592815e-315,9.694610776e-315,9.68562874e-315,9.676646707e-315,9.66766467e-315,9.658682633e-315,9.6497006e-315,9.640718565e-315,9.631736525e-315,9.62275449e-315,9.613772457e-315,9.604790417e-315,9.595808383e-315,9.58682635e-315,9.57784431e-315,9.568862275e-315,9.55988024e-315,9.5508982e-315,9.541916167e-315,9.53293413e-315,9.523952093e-315,9.51497006e-315,9.505988024e-315,9.49700599e-315,9.48802395e-315,9.479041916e-315,9.47005988e-315,9.46107784e-315,9.45209581e-315,9.443113774e-315,9.434131734e-315,9.4251497e-315,9.416167665e-315,9.407185626e-315,9.39820359e-315,9.389221557e-315,9.380239523e-315,9.371257484e-315,9.36227545e-315,9.353293415e-315,9.344311375e-315,9.33532934e-315,9.326347307e-315,9.317365267e-315,9.308383233e-315,9.2994012e-315,9.29041916e-315,9.281437125e-315,9.27245509e-315,9.26347305e-315,9.254491017e-315,9.24550898e-315,9.23652695e-315,9.22754491e-315,9.218562874e-315,9.20958084e-315,9.2005988e-315,9.191616766e-315,9.18263473e-315,9.17365269e-315,9.16467066e-315,9.155688624e-315,9.146706584e-315,9.13772455e-315,9.128742516e-315,9.119760476e-315,9.11077844e-315,9.101796407e-315,9.092814373e-315,9.083832334e-315,9.0748503e-315,9.065868265e-315,9.056886226e-315,9.04790419e-315,9.038922157e-315,9.029940117e-315,9.020958083e-315,9.01197605e-315,9.00299401e-315,8.994011975e-315,8.98502994e-315,8.976047906e-315,8.967065867e-315,8.95808383e-315,8.9491018e-315,8.94011976e-315,8.931137724e-315,8.92215569e-315,8.91317365e-315,8.904191616e-315,8.89520958e-315,8.886227542e-315,8.87724551e-315,8.868263474e-315,8.859281434e-315,8.8502994e-315,8.841317366e-315,8.83233533e-315,8.82335329e-315,8.814371257e-315,8.805389223e-315,8.796407184e-315,8.78742515e-315,8.778443115e-315,8.769461076e-315,8.76047904e-315,8.751497007e-315,8.742514968e-315,8.733532933e-315,8.7245509e-315,8.71556886e-315,8.706586825e-315,8.69760479e-315,8.688622756e-315,8.679640717e-315,8.670658683e-315,8.66167665e-315,8.65269461e-315,8.643712574e-315,8.63473054e-315,8.6257485e-315,8.616766466e-315,8.60778443e-315,8.598802393e-315,8.58982036e-315,8.580838324e-315,8.571856284e-315,8.56287425e-315,8.553892216e-315,8.54491018e-315,8.53592814e-315,8.52694611e-315,8.517964073e-315,8.508982034e-315,8.5e-315,8.491017965e-315,8.482035926e-315,8.47305389e-315,8.464071857e-315,8.45508982e-315,8.446107783e-315,8.43712575e-315,8.428143714e-315,8.419161675e-315,8.41017964e-315,8.401197606e-315,8.392215567e-315,8.383233533e-315,8.3742515e-315,8.36526946e-315,8.356287424e-315,8.34730539e-315,8.33832335e-315,8.329341316e-315,8.32035928e-315,8.311377243e-315,8.30239521e-315,8.293413174e-315,8.28443114e-315,8.2754491e-315,8.266467066e-315,8.25748503e-315,8.24850299e-315,8.23952096e-315,8.230538923e-315,8.221556884e-315,8.21257485e-315,8.203592815e-315,8.194610776e-315,8.18562874e-315,8.176646707e-315,8.16766467e-315,8.158682633e-315,8.1497006e-315,8.140718565e-315,8.131736525e-315,8.12275449e-315,8.113772456e-315,8.104790417e-315,8.095808383e-315,8.08682635e-315,8.07784431e-315,8.068862275e-315,8.05988024e-315,8.0508982e-315,8.041916166e-315,8.03293413e-315,8.023952093e-315,8.01497006e-315,8.005988024e-315,7.99700599e-315,7.98802395e-315,7.979041916e-315,7.97005988e-315,7.96107784e-315,7.95209581e-315,7.943113773e-315,7.934131734e-315,7.9251497e-315,7.916167665e-315,7.907185626e-315,7.89820359e-315,7.889221557e-315,7.880239523e-315,7.871257483e-315,7.86227545e-315,7.853293415e-315,7.844311375e-315,7.83532934e-315,7.826347306e-315,7.817365267e-315,7.808383233e-315,7.7994012e-315,7.79041916e-315,7.781437125e-315,7.77245509e-315,7.76347305e-315,7.754491017e-315,7.74550898e-315,7.73652695e-315,7.72754491e-315,7.718562874e-315,7.70958084e-315,7.7005988e-315,7.691616766e-315,7.68263473e-315,7.67365269e-315,7.66467066e-315,7.655688623e-315,7.646706584e-315,7.63772455e-315,7.628742515e-315,7.619760476e-315,7.61077844e-315,7.601796407e-315,7.592814373e-315,7.583832333e-315,7.5748503e-315,7.565868265e-315,7.556886225e-315,7.54790419e-315,7.538922157e-315,7.529940117e-315,7.520958083e-315,7.51197605e-315,7.50299401e-315,7.494011975e-315,7.48502994e-315,7.476047906e-315,7.467065867e-315,7.45808383e-315,7.4491018e-315,7.44011976e-315,7.431137724e-315,7.42215569e-315,7.41317365e-315,7.404191616e-315,7.39520958e-315,7.38622754e-315,7.37724551e-315,7.368263474e-315,7.359281434e-315,7.3502994e-315,7.341317365e-315,7.33233533e-315,7.32335329e-315,7.314371257e-315,7.305389223e-315,7.296407184e-315,7.28742515e-315,7.278443115e-315,7.269461075e-315,7.26047904e-315,7.251497007e-315,7.242514967e-315,7.233532933e-315,7.2245509e-315,7.21556886e-315,7.206586825e-315,7.19760479e-315,7.188622756e-315,7.179640717e-315,7.17065868e-315,7.16167665e-315,7.15269461e-315,7.143712574e-315,7.13473054e-315,7.1257485e-315,7.116766466e-315,7.10778443e-315,7.09880239e-315,7.08982036e-315,7.080838324e-315,7.071856284e-315,7.06287425e-315,7.053892215e-315,7.04491018e-315,7.03592814e-315,7.026946107e-315,7.017964073e-315,7.008982034e-315,7.0e-315,6.991017965e-315,6.982035926e-315,6.97305389e-315,6.964071857e-315,6.955089817e-315,6.946107783e-315,6.93712575e-315,6.928143714e-315,6.919161675e-315,6.91017964e-315,6.901197606e-315,6.892215567e-315,6.88323353e-315,6.8742515e-315,6.86526946e-315,6.856287424e-315,6.84730539e-315,6.83832335e-315,6.829341316e-315,6.82035928e-315,6.81137724e-315,6.80239521e-315,6.793413174e-315,6.78443114e-315,6.7754491e-315,6.766467066e-315,6.75748503e-315,6.74850299e-315,6.739520957e-315,6.730538923e-315,6.721556884e-315,6.71257485e-315,6.703592815e-315,6.694610776e-315,6.68562874e-315,6.676646707e-315,6.667664668e-315,6.658682633e-315,6.6497006e-315,6.640718564e-315,6.631736525e-315,6.62275449e-315,6.613772456e-315,6.604790417e-315,6.595808382e-315,6.58682635e-315,6.57784431e-315,6.568862274e-315,6.55988024e-315,6.5508982e-315,6.541916166e-315,6.53293413e-315,6.523952093e-315,6.51497006e-315,6.505988024e-315,6.49700599e-315,6.48802395e-315,6.479041916e-315,6.47005988e-315,6.46107784e-315,6.45209581e-315,6.443113773e-315,6.434131734e-315,6.4251497e-315,6.416167665e-315,6.407185626e-315,6.39820359e-315,6.389221557e-315,6.380239523e-315,6.371257483e-315,6.36227545e-315,6.353293414e-315,6.344311375e-315,6.33532934e-315,6.326347306e-315,6.317365267e-315,6.308383233e-315,6.2994012e-315,6.29041916e-315,6.281437124e-315,6.27245509e-315,6.26347305e-315,6.254491016e-315,6.24550898e-315,6.23652695e-315,6.22754491e-315,6.218562874e-315,6.20958084e-315,6.2005988e-315,6.191616766e-315,6.18263473e-315,6.17365269e-315,6.16467066e-315,6.155688623e-315,6.146706584e-315,6.13772455e-315,6.128742515e-315,6.119760476e-315,6.11077844e-315,6.101796407e-315,6.092814373e-315,6.083832333e-315,6.0748503e-315,6.065868264e-315,6.056886225e-315,6.04790419e-315,6.038922156e-315,6.029940117e-315,6.020958083e-315,6.01197605e-315,6.00299401e-315,5.994011975e-315,5.98502994e-315,5.976047906e-315,5.967065866e-315,5.95808383e-315,5.9491018e-315,5.94011976e-315,5.931137724e-315,5.92215569e-315,5.91317365e-315,5.904191616e-315,5.89520958e-315,5.88622754e-315,5.87724551e-315,5.868263473e-315,5.859281434e-315,5.8502994e-315,5.841317365e-315,5.83233533e-315,5.82335329e-315,5.814371257e-315,5.805389223e-315,5.796407183e-315,5.78742515e-315,5.778443115e-315,5.769461075e-315,5.76047904e-315,5.751497006e-315,5.742514967e-315,5.733532933e-315,5.7245509e-315,5.71556886e-315,5.706586825e-315,5.69760479e-315,5.688622756e-315,5.679640717e-315,5.67065868e-315,5.66167665e-315,5.65269461e-315,5.643712574e-315,5.63473054e-315,5.6257485e-315,5.616766466e-315,5.60778443e-315,5.59880239e-315,5.58982036e-315,5.580838323e-315,5.571856284e-315,5.56287425e-315,5.553892215e-315,5.54491018e-315,5.53592814e-315,5.526946107e-315,5.517964073e-315,5.508982033e-315,5.5e-315,5.491017965e-315,5.482035925e-315,5.47305389e-315,5.464071857e-315,5.455089817e-315,5.446107783e-315,5.43712575e-315,5.428143714e-315,5.419161675e-315,5.41017964e-315,5.401197606e-315,5.392215567e-315,5.38323353e-315,5.3742515e-315,5.36526946e-315,5.356287424e-315,5.34730539e-315,5.33832335e-315,5.329341316e-315,5.32035928e-315,5.31137724e-315,5.30239521e-315,5.293413173e-315,5.28443114e-315,5.2754491e-315,5.266467065e-315,5.25748503e-315,5.24850299e-315,5.239520957e-315,5.230538923e-315,5.221556884e-315,5.21257485e-315,5.203592815e-315,5.194610775e-315,5.18562874e-315,5.176646707e-315,5.167664667e-315,5.158682633e-315,5.1497006e-315,5.140718564e-315,5.131736525e-315,5.12275449e-315,5.113772456e-315,5.104790417e-315,5.09580838e-315,5.08682635e-315,5.07784431e-315,5.068862274e-315,5.05988024e-315,5.0508982e-315,5.041916166e-315,5.03293413e-315,5.02395209e-315,5.01497006e-315,5.005988024e-315,4.99700599e-315,4.98802395e-315,4.979041915e-315,4.97005988e-315,4.96107784e-315,4.952095807e-315,4.943113773e-315,4.934131734e-315,4.9251497e-315,4.916167665e-315,4.907185626e-315,4.89820359e-315,4.889221557e-315,4.88023952e-315,4.871257483e-315,4.86227545e-315,4.853293414e-315,4.844311375e-315,4.83532934e-315,4.826347306e-315,4.817365267e-315,4.80838323e-315,4.7994012e-315,4.79041916e-315,4.781437124e-315,4.77245509e-315,4.76347305e-315,4.754491016e-315,4.74550898e-315,4.736526947e-315,4.72754491e-315,4.718562874e-315,4.70958084e-315,4.7005988e-315,4.691616766e-315,4.68263473e-315,4.67365269e-315,4.664670657e-315,4.655688623e-315,4.646706584e-315,4.63772455e-315,4.628742515e-315,4.619760476e-315,4.61077844e-315,4.601796407e-315,4.59281437e-315,4.583832333e-315,4.5748503e-315,4.565868264e-315,4.556886225e-315,4.54790419e-315,4.538922156e-315,4.529940117e-315,4.520958082e-315,4.51197605e-315,4.50299401e-315,4.494011974e-315,4.48502994e-315,4.476047906e-315,4.467065866e-315,4.45808383e-315,4.449101797e-315,4.44011976e-315,4.431137724e-315,4.42215569e-315,4.41317365e-315,4.404191616e-315,4.39520958e-315,4.38622754e-315,4.377245508e-315,4.368263473e-315,4.359281434e-315,4.3502994e-315,4.341317365e-315,4.33233533e-315,4.32335329e-315,4.314371257e-315,4.305389223e-315,4.296407183e-315,4.28742515e-315,4.278443114e-315,4.269461075e-315,4.26047904e-315,4.251497006e-315,4.242514967e-315,4.233532933e-315,4.2245509e-315,4.21556886e-315,4.206586824e-315,4.19760479e-315,4.188622756e-315,4.179640716e-315,4.17065868e-315,4.16167665e-315,4.15269461e-315,4.143712574e-315,4.13473054e-315,4.1257485e-315,4.116766466e-315,4.10778443e-315,4.09880239e-315,4.08982036e-315,4.080838323e-315,4.071856284e-315,4.06287425e-315,4.053892215e-315,4.04491018e-315,4.03592814e-315,4.026946107e-315,4.017964073e-315,4.008982033e-315,4.0e-315,3.991017964e-315,3.982035925e-315,3.97305389e-315,3.964071856e-315,3.955089817e-315,3.946107783e-315,3.93712575e-315,3.928143714e-315,3.919161675e-315,3.91017964e-315,3.901197606e-315,3.892215566e-315,3.88323353e-315,3.8742515e-315,3.86526946e-315,3.856287424e-315,3.84730539e-315,3.83832335e-315,3.829341316e-315,3.82035928e-315,3.81137724e-315,3.80239521e-315,3.793413173e-315,3.78443114e-315,3.7754491e-315,3.766467065e-315,3.75748503e-315,3.74850299e-315,3.739520957e-315,3.730538923e-315,3.721556883e-315,3.71257485e-315,3.703592815e-315,3.694610775e-315,3.68562874e-315,3.676646706e-315,3.667664667e-315,3.658682633e-315,3.6497006e-315,3.640718564e-315,3.631736525e-315,3.62275449e-315,3.613772456e-315,3.604790416e-315,3.59580838e-315,3.58682635e-315,3.57784431e-315,3.568862274e-315,3.55988024e-315,3.5508982e-315,3.541916166e-315,3.53293413e-315,3.52395209e-315,3.51497006e-315,3.505988023e-315,3.49700599e-315,3.48802395e-315,3.479041915e-315,3.47005988e-315,3.46107784e-315,3.452095807e-315,3.443113773e-315,3.434131733e-315,3.4251497e-315,3.416167665e-315,3.407185625e-315,3.39820359e-315,3.389221557e-315,3.38023952e-315,3.371257483e-315,3.36227545e-315,3.353293414e-315,3.344311375e-315,3.33532934e-315,3.326347306e-315,3.317365267e-315,3.30838323e-315,3.2994012e-315,3.29041916e-315,3.281437124e-315,3.27245509e-315,3.26347305e-315,3.254491016e-315,3.24550898e-315,3.236526947e-315,3.22754491e-315,3.218562873e-315,3.20958084e-315,3.2005988e-315,3.191616765e-315,3.18263473e-315,3.17365269e-315,3.164670657e-315,3.155688623e-315,3.146706584e-315,3.13772455e-315,3.128742515e-315,3.119760475e-315,3.11077844e-315,3.101796407e-315,3.09281437e-315,3.083832333e-315,3.0748503e-315,3.065868264e-315,3.056886225e-315,3.04790419e-315,3.038922156e-315,3.029940117e-315,3.02095808e-315,3.01197605e-315,3.00299401e-315,2.994011974e-315,2.98502994e-315,2.976047905e-315,2.967065866e-315,2.95808383e-315,2.949101797e-315,2.94011976e-315,2.931137724e-315,2.92215569e-315,2.91317365e-315,2.904191615e-315,2.89520958e-315,2.88622754e-315,2.877245507e-315,2.868263473e-315,2.859281434e-315,2.8502994e-315,2.841317365e-315,2.83233533e-315,2.82335329e-315,2.814371257e-315,2.80538922e-315,2.796407183e-315,2.78742515e-315,2.778443114e-315,2.769461075e-315,2.76047904e-315,2.751497006e-315,2.742514967e-315,2.73353293e-315,2.7245509e-315,2.71556886e-315,2.706586824e-315,2.69760479e-315,2.688622755e-315,2.679640716e-315,2.67065868e-315,2.661676647e-315,2.65269461e-315,2.643712574e-315,2.63473054e-315,2.6257485e-315,2.616766466e-315,2.60778443e-315,2.59880239e-315,2.589820357e-315,2.580838323e-315,2.571856284e-315,2.56287425e-315,2.553892215e-315,2.54491018e-315,2.53592814e-315,2.526946107e-315,2.51796407e-315,2.508982033e-315,2.5e-315,2.491017964e-315,2.482035925e-315,2.47305389e-315,2.464071856e-315,2.455089817e-315,2.44610778e-315,2.43712575e-315,2.428143714e-315,2.419161674e-315,2.41017964e-315,2.401197606e-315,2.392215566e-315,2.38323353e-315,2.374251497e-315,2.36526946e-315,2.356287424e-315,2.34730539e-315,2.33832335e-315,2.329341316e-315,2.32035928e-315,2.31137724e-315,2.302395207e-315,2.293413173e-315,2.28443114e-315,2.2754491e-315,2.266467065e-315,2.25748503e-315,2.24850299e-315,2.239520957e-315,2.230538922e-315,2.221556883e-315,2.21257485e-315,2.203592814e-315,2.194610775e-315,2.18562874e-315,2.176646706e-315,2.167664667e-315,2.158682633e-315,2.1497006e-315,2.140718564e-315,2.131736524e-315,2.12275449e-315,2.113772456e-315,2.104790416e-315,2.09580838e-315,2.086826348e-315,2.07784431e-315,2.068862274e-315,2.05988024e-315,2.0508982e-315,2.041916166e-315,2.03293413e-315,2.02395209e-315,2.01497006e-315,2.005988023e-315,1.99700599e-315,1.98802395e-315,1.979041915e-315,1.97005988e-315,1.96107784e-315,1.952095807e-315,1.943113773e-315,1.934131733e-315,1.9251497e-315,1.916167664e-315,1.907185625e-315,1.89820359e-315,1.889221556e-315,1.88023952e-315,1.871257483e-315,1.86227545e-315,1.853293414e-315,1.844311375e-315,1.83532934e-315,1.826347306e-315,1.817365266e-315,1.80838323e-315,1.7994012e-315,1.79041916e-315,1.781437124e-315,1.77245509e-315,1.76347305e-315,1.754491016e-315,1.74550898e-315,1.736526947e-315,1.72754491e-315,1.718562873e-315,1.70958084e-315,1.7005988e-315,1.691616765e-315,1.68263473e-315,1.67365269e-315,1.664670657e-315,1.655688623e-315,1.646706583e-315,1.63772455e-315,1.628742515e-315,1.619760475e-315,1.61077844e-315,1.601796406e-315,1.59281437e-315,1.583832333e-315,1.5748503e-315,1.565868264e-315,1.556886225e-315,1.54790419e-315,1.538922156e-315,1.529940116e-315,1.52095808e-315,1.51197605e-315,1.50299401e-315,1.494011974e-315,1.48502994e-315,1.476047905e-315,1.467065866e-315,1.45808383e-315,1.449101797e-315,1.44011976e-315,1.431137723e-315,1.42215569e-315,1.41317365e-315,1.404191615e-315,1.39520958e-315,1.38622754e-315,1.377245507e-315,1.368263473e-315,1.359281433e-315,1.3502994e-315,1.341317365e-315,1.33233533e-315,1.32335329e-315,1.314371257e-315,1.30538922e-315,1.296407183e-315,1.28742515e-315,1.278443114e-315,1.269461075e-315,1.26047904e-315,1.251497006e-315,1.242514967e-315,1.23353293e-315,1.2245509e-315,1.21556886e-315,1.206586824e-315,1.19760479e-315,1.188622755e-315,1.179640716e-315,1.17065868e-315,1.161676647e-315,1.15269461e-315,1.143712573e-315,1.13473054e-315,1.1257485e-315,1.116766465e-315,1.10778443e-315,1.09880239e-315,1.089820357e-315,1.080838323e-315,1.071856283e-315,1.06287425e-315,1.053892215e-315,1.04491018e-315,1.03592814e-315,1.026946107e-315,1.01796407e-315,1.008982033e-315,1.0e-315]}

},{}],84:[function(require,module,exports){
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
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
var isPositiveZero = require( '@stdlib/math/base/assert/is-positive-zero' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var Float64Array = require( '@stdlib/array/float64' );
var modf = require( './../lib/assign.js' );


// FIXTURES //

var subnormal = require( './fixtures/julia/subnormal.json' );
var small = require( './fixtures/julia/small.json' );
var medium = require( './fixtures/julia/medium.json' );
var large = require( './fixtures/julia/large.json' );
var huge = require( './fixtures/julia/huge.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof modf, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function decomposes a number into integral and fractional parts (small values)', function test( t ) {
	var integral;
	var parts;
	var frac;
	var out;
	var x;
	var i;

	integral = small.integral;
	frac = small.frac;
	x = small.x;
	for ( i = 0; i < x.length; i++ ) {
		out = [ 0.0, 0.0 ];
		parts = modf( x[ i ], out, 1, 0 );
		t.equal( parts, out, 'returns output array' );
		t.strictEqual( parts[0], integral[i], 'returns integral part' );
		t.strictEqual( parts[1], frac[i], 'returns fractional part' );
	}
	t.end();
});

tape( 'the function decomposes a number into integral and fractional parts (medium values)', function test( t ) {
	var integral;
	var parts;
	var frac;
	var out;
	var x;
	var i;

	integral = medium.integral;
	frac = medium.frac;
	x = medium.x;
	for ( i = 0; i < x.length; i++ ) {
		out = [ 0.0, 0.0 ];
		parts = modf( x[ i ], out, 1, 0 );
		t.equal( parts, out, 'returns output array' );
		t.strictEqual( parts[0], integral[i], 'returns integral part' );
		t.strictEqual( parts[1], frac[i], 'returns fractional part' );
	}
	t.end();
});

tape( 'the function decomposes a number into integral and fractional parts (large values)', function test( t ) {
	var integral;
	var parts;
	var frac;
	var out;
	var x;
	var i;

	integral = large.integral;
	frac = large.frac;
	x = large.x;
	for ( i = 0; i < x.length; i++ ) {
		out = [ 0.0, 0.0 ];
		parts = modf( x[ i ], out, 1, 0 );
		t.equal( parts, out, 'returns output array' );
		t.strictEqual( parts[0], integral[i], 'returns integral part' );
		t.strictEqual( parts[1], frac[i], 'returns fractional part' );
	}
	t.end();
});

tape( 'the function decomposes a number into integral and fractional parts (huge values)', function test( t ) {
	var integral;
	var parts;
	var frac;
	var out;
	var x;
	var i;

	integral = huge.integral;
	frac = huge.frac;
	x = huge.x;
	for ( i = 0; i < x.length; i++ ) {
		out = [ 0.0, 0.0 ];
		parts = modf( x[ i ], out, 1, 0 );
		t.equal( parts, out, 'returns output array' );
		t.strictEqual( parts[0], integral[i], 'returns integral part' );
		t.strictEqual( parts[1], frac[i], 'returns fractional part' );
	}
	t.end();
});

tape( 'the function decomposes a number into integral and fractional parts (subnormal values)', function test( t ) {
	var integral;
	var parts;
	var frac;
	var out;
	var x;
	var i;

	integral = subnormal.integral;
	frac = subnormal.frac;
	x = subnormal.x;
	for ( i = 0; i < x.length; i++ ) {
		out = [ 0.0, 0.0 ];
		parts = modf( x[ i ], out, 1, 0 );
		t.equal( parts, out, 'returns output array' );
		t.strictEqual( parts[0], integral[i], 'returns integral part' );
		t.strictEqual( parts[1], frac[i], 'returns fractional part' );
	}
	t.end();
});

tape( 'if provided `+0`, the function returns `[+0,+0]`', function test( t ) {
	var parts;
	var out;

	out = [ 0.0, 0.0 ];
	parts = modf( +0.0, out, 1, 0 );
	t.equal( parts, out, 'returns output array' );
	t.strictEqual( isPositiveZero( parts[0] ), true, 'returns +0' );
	t.strictEqual( isPositiveZero( parts[1] ), true, 'returns +0' );
	t.end();
});

tape( 'if provided `-0`, the function returns `[-0,-0]`', function test( t ) {
	var parts;
	var out;

	out = [ 0.0, 0.0 ];
	parts = modf( -0.0, out, 1, 0 );
	t.equal( parts, out, 'returns output array' );
	t.strictEqual( isNegativeZero( parts[0] ), true, 'returns -0' );
	t.strictEqual( isNegativeZero( parts[1] ), true, 'returns -0' );
	t.end();
});

tape( 'if provided `+infinity`, the function returns `[+infinity,+0]`', function test( t ) {
	var parts;
	var out;

	out = [ 0.0, 0.0 ];
	parts = modf( PINF, out, 1, 0 );
	t.equal( parts, out, 'returns output array' );
	t.strictEqual( parts[0], PINF, 'returns +infinity' );
	t.strictEqual( isPositiveZero( parts[1] ), true, 'returns +0' );
	t.end();
});

tape( 'if provided `-infinity`, the function returns `[-infinity,-0]`', function test( t ) {
	var parts;
	var out;

	out = [ 0.0, 0.0 ];
	parts = modf( NINF, out, 1, 0 );
	t.equal( parts, out, 'returns output array' );
	t.strictEqual( parts[0], NINF, 'returns -infinity' );
	t.strictEqual( isNegativeZero( parts[1] ), true, 'returns -0' );
	t.end();
});

tape( 'if provided `NaN`, the function returns `[NaN,NaN]`', function test( t ) {
	var parts;
	var out;

	out = [ 0.0, 0.0 ];
	parts = modf( NaN, out, 1, 0 );
	t.equal( parts, out, 'returns output array' );
	t.strictEqual( isnan( parts[0] ), true, 'returns NaN' );
	t.strictEqual( isnan( parts[1] ), true, 'returns NaN' );
	t.end();
});

tape( 'the function supports providing an output array', function test( t ) {
	var parts;
	var out;

	out = [ 0.0, 0.0 ];
	parts = modf( 3.14, out, 1, 0 );

	t.strictEqual( parts, out, 'returns output array' );
	t.strictEqual( parts[ 0 ], 3.0, 'has expected first element' );
	t.strictEqual( parts[ 1 ], 0.14000000000000012, 'has expected second element' );

	t.end();
});

tape( 'the function supports providing an output typed array', function test( t ) {
	var parts;
	var out;

	out = new Float64Array( 2 );
	parts = modf( 3.14, out, 1, 0 );

	t.strictEqual( parts, out, 'returns output typed array' );
	t.strictEqual( parts[ 0 ], 3.0, 'has expected first element' );
	t.strictEqual( parts[ 1 ], 0.14000000000000012, 'has expected second element' );

	t.end();
});

tape( 'the function supports specifying a stride', function test( t ) {
	var out;
	var val;

	out = new Float64Array( 4 );
	val = modf( 3.14, out, 2, 0 );

	t.strictEqual( val, out, 'returns output array' );
	t.strictEqual( val[ 0 ], 3.0, 'returns expected value' );
	t.strictEqual( val[ 1 ], 0, 'returns expected value' );
	t.strictEqual( val[ 2 ], 0.14000000000000012, 'returns expected value' );
	t.strictEqual( val[ 3 ], 0, 'returns expected value' );

	t.end();
});

tape( 'the function supports specifying an offset', function test( t ) {
	var out;
	var val;

	out = new Float64Array( 4 );
	val = modf( 3.14, out, 2, 1 );

	t.strictEqual( val, out, 'returns output array' );
	t.strictEqual( val[ 0 ], 0, 'returns expected value' );
	t.strictEqual( val[ 1 ], 3.0, 'returns expected value' );
	t.strictEqual( val[ 2 ], 0, 'returns expected value' );
	t.strictEqual( val[ 3 ], 0.14000000000000012, 'returns expected value' );

	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/modf/test/test.assign.js")
},{"./../lib/assign.js":76,"./fixtures/julia/huge.json":79,"./fixtures/julia/large.json":80,"./fixtures/julia/medium.json":81,"./fixtures/julia/small.json":82,"./fixtures/julia/subnormal.json":83,"@stdlib/array/float64":1,"@stdlib/constants/float64/ninf":65,"@stdlib/constants/float64/pinf":66,"@stdlib/math/base/assert/is-nan":70,"@stdlib/math/base/assert/is-negative-zero":72,"@stdlib/math/base/assert/is-positive-zero":74,"tape":274}],85:[function(require,module,exports){
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
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var modf = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof modf, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is an `assign` method', function test( t ) {
	t.strictEqual( hasOwnProp( modf, 'assign' ), true, 'has property' );
	t.strictEqual( typeof modf.assign, 'function', 'has method' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/modf/test/test.js")
},{"./../lib":77,"@stdlib/assert/has-own-property":16,"tape":274}],86:[function(require,module,exports){
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
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
var isPositiveZero = require( '@stdlib/math/base/assert/is-positive-zero' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var modf = require( './../lib/main.js' );


// FIXTURES //

var subnormal = require( './fixtures/julia/subnormal.json' );
var small = require( './fixtures/julia/small.json' );
var medium = require( './fixtures/julia/medium.json' );
var large = require( './fixtures/julia/large.json' );
var huge = require( './fixtures/julia/huge.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof modf, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function decomposes a number into integral and fractional parts (small values)', function test( t ) {
	var integral;
	var parts;
	var frac;
	var x;
	var i;

	integral = small.integral;
	frac = small.frac;
	x = small.x;
	for ( i = 0; i < x.length; i++ ) {
		parts = modf( x[ i ] );
		t.strictEqual( parts[0], integral[i], 'returns integral part' );
		t.strictEqual( parts[1], frac[i], 'returns fractional part' );
	}
	t.end();
});

tape( 'the function decomposes a number into integral and fractional parts (medium values)', function test( t ) {
	var integral;
	var parts;
	var frac;
	var x;
	var i;

	integral = medium.integral;
	frac = medium.frac;
	x = medium.x;
	for ( i = 0; i < x.length; i++ ) {
		parts = modf( x[ i ] );
		t.strictEqual( parts[0], integral[i], 'returns integral part' );
		t.strictEqual( parts[1], frac[i], 'returns fractional part' );
	}
	t.end();
});

tape( 'the function decomposes a number into integral and fractional parts (large values)', function test( t ) {
	var integral;
	var parts;
	var frac;
	var x;
	var i;

	integral = large.integral;
	frac = large.frac;
	x = large.x;
	for ( i = 0; i < x.length; i++ ) {
		parts = modf( x[ i ] );
		t.strictEqual( parts[0], integral[i], 'returns integral part' );
		t.strictEqual( parts[1], frac[i], 'returns fractional part' );
	}
	t.end();
});

tape( 'the function decomposes a number into integral and fractional parts (huge values)', function test( t ) {
	var integral;
	var parts;
	var frac;
	var x;
	var i;

	integral = huge.integral;
	frac = huge.frac;
	x = huge.x;
	for ( i = 0; i < x.length; i++ ) {
		parts = modf( x[ i ] );
		t.strictEqual( parts[0], integral[i], 'returns integral part' );
		t.strictEqual( parts[1], frac[i], 'returns fractional part' );
	}
	t.end();
});

tape( 'the function decomposes a number into integral and fractional parts (subnormal values)', function test( t ) {
	var integral;
	var parts;
	var frac;
	var x;
	var i;

	integral = subnormal.integral;
	frac = subnormal.frac;
	x = subnormal.x;
	for ( i = 0; i < x.length; i++ ) {
		parts = modf( x[ i ] );
		t.strictEqual( parts[0], integral[i], 'returns integral part' );
		t.strictEqual( parts[1], frac[i], 'returns fractional part' );
	}
	t.end();
});

tape( 'if provided `+0`, the function returns `[+0,+0]`', function test( t ) {
	var parts = modf( +0.0 );
	t.strictEqual( isPositiveZero( parts[0] ), true, 'returns +0' );
	t.strictEqual( isPositiveZero( parts[1] ), true, 'returns +0' );
	t.end();
});

tape( 'if provided `-0`, the function returns `[-0,-0]`', function test( t ) {
	var parts = modf( -0.0 );
	t.strictEqual( isNegativeZero( parts[0] ), true, 'returns -0' );
	t.strictEqual( isNegativeZero( parts[1] ), true, 'returns -0' );
	t.end();
});

tape( 'if provided `+infinity`, the function returns `[+infinity,+0]`', function test( t ) {
	var parts = modf( PINF );
	t.strictEqual( parts[0], PINF, 'returns +infinity' );
	t.strictEqual( isPositiveZero( parts[1] ), true, 'returns +0' );
	t.end();
});

tape( 'if provided `-infinity`, the function returns `[-infinity,-0]`', function test( t ) {
	var parts = modf( NINF );
	t.strictEqual( parts[0], NINF, 'returns -infinity' );
	t.strictEqual( isNegativeZero( parts[1] ), true, 'returns -0' );
	t.end();
});

tape( 'if provided `NaN`, the function returns `[NaN,NaN]`', function test( t ) {
	var parts = modf( NaN );
	t.strictEqual( isnan( parts[0] ), true, 'returns NaN' );
	t.strictEqual( isnan( parts[1] ), true, 'returns NaN' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/modf/test/test.main.js")
},{"./../lib/main.js":78,"./fixtures/julia/huge.json":79,"./fixtures/julia/large.json":80,"./fixtures/julia/medium.json":81,"./fixtures/julia/small.json":82,"./fixtures/julia/subnormal.json":83,"@stdlib/constants/float64/ninf":65,"@stdlib/constants/float64/pinf":66,"@stdlib/math/base/assert/is-nan":70,"@stdlib/math/base/assert/is-negative-zero":72,"@stdlib/math/base/assert/is-positive-zero":74,"tape":274}],87:[function(require,module,exports){
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
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
var isPositiveZero = require( '@stdlib/math/base/assert/is-positive-zero' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var tryRequire = require( '@stdlib/utils/try-require' );


// VARIABLES //

var modf = tryRequire( resolve( __dirname, './../lib/native.js' ) );
var opts = {
	'skip': ( modf instanceof Error )
};


// FIXTURES //

var subnormal = require( './fixtures/julia/subnormal.json' );
var small = require( './fixtures/julia/small.json' );
var medium = require( './fixtures/julia/medium.json' );
var large = require( './fixtures/julia/large.json' );
var huge = require( './fixtures/julia/huge.json' );


// TESTS //

tape( 'main export is a function', opts, function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof modf, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function decomposes a number into integral and fractional parts (small values)', opts, function test( t ) {
	var integral;
	var parts;
	var frac;
	var x;
	var i;

	integral = small.integral;
	frac = small.frac;
	x = small.x;
	for ( i = 0; i < x.length; i++ ) {
		parts = modf( x[ i ] );
		t.strictEqual( parts[0], integral[i], 'returns integral part' );
		t.strictEqual( parts[1], frac[i], 'returns fractional part' );
	}
	t.end();
});

tape( 'the function decomposes a number into integral and fractional parts (medium values)', opts, function test( t ) {
	var integral;
	var parts;
	var frac;
	var x;
	var i;

	integral = medium.integral;
	frac = medium.frac;
	x = medium.x;
	for ( i = 0; i < x.length; i++ ) {
		parts = modf( x[ i ] );
		t.strictEqual( parts[0], integral[i], 'returns integral part' );
		t.strictEqual( parts[1], frac[i], 'returns fractional part' );
	}
	t.end();
});

tape( 'the function decomposes a number into integral and fractional parts (large values)', opts, function test( t ) {
	var integral;
	var parts;
	var frac;
	var x;
	var i;

	integral = large.integral;
	frac = large.frac;
	x = large.x;
	for ( i = 0; i < x.length; i++ ) {
		parts = modf( x[ i ] );
		t.strictEqual( parts[0], integral[i], 'returns integral part' );
		t.strictEqual( parts[1], frac[i], 'returns fractional part' );
	}
	t.end();
});

tape( 'the function decomposes a number into integral and fractional parts (huge values)', opts, function test( t ) {
	var integral;
	var parts;
	var frac;
	var x;
	var i;

	integral = huge.integral;
	frac = huge.frac;
	x = huge.x;
	for ( i = 0; i < x.length; i++ ) {
		parts = modf( x[ i ] );
		t.strictEqual( parts[0], integral[i], 'returns integral part' );
		t.strictEqual( parts[1], frac[i], 'returns fractional part' );
	}
	t.end();
});

tape( 'the function decomposes a number into integral and fractional parts (subnormal values)', opts, function test( t ) {
	var integral;
	var parts;
	var frac;
	var x;
	var i;

	integral = subnormal.integral;
	frac = subnormal.frac;
	x = subnormal.x;
	for ( i = 0; i < x.length; i++ ) {
		parts = modf( x[ i ] );
		t.strictEqual( parts[0], integral[i], 'returns integral part' );
		t.strictEqual( parts[1], frac[i], 'returns fractional part' );
	}
	t.end();
});

tape( 'if provided `+0`, the function returns `[+0,+0]`', opts, function test( t ) {
	var parts = modf( +0.0 );
	t.strictEqual( isPositiveZero( parts[0] ), true, 'returns +0' );
	t.strictEqual( isPositiveZero( parts[1] ), true, 'returns +0' );
	t.end();
});

tape( 'if provided `-0`, the function returns `[-0,-0]`', opts, function test( t ) {
	var parts = modf( -0.0 );
	t.strictEqual( isNegativeZero( parts[0] ), true, 'returns -0' );
	t.strictEqual( isNegativeZero( parts[1] ), true, 'returns -0' );
	t.end();
});

tape( 'if provided `+infinity`, the function returns `[+infinity,+0]`', opts, function test( t ) {
	var parts = modf( PINF );
	t.strictEqual( parts[0], PINF, 'returns +infinity' );
	t.strictEqual( isPositiveZero( parts[1] ), true, 'returns +0' );
	t.end();
});

tape( 'if provided `-infinity`, the function returns `[-infinity,-0]`', opts, function test( t ) {
	var parts = modf( NINF );
	t.strictEqual( parts[0], NINF, 'returns -infinity' );
	t.strictEqual( isNegativeZero( parts[1] ), true, 'returns -0' );
	t.end();
});

tape( 'if provided `NaN`, the function returns `[NaN,NaN]`', opts, function test( t ) {
	var parts = modf( NaN );
	t.strictEqual( isnan( parts[0] ), true, 'returns NaN' );
	t.strictEqual( isnan( parts[1] ), true, 'returns NaN' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/modf/test/test.native.js","/lib/node_modules/@stdlib/math/base/special/modf/test")
},{"./fixtures/julia/huge.json":79,"./fixtures/julia/large.json":80,"./fixtures/julia/medium.json":81,"./fixtures/julia/small.json":82,"./fixtures/julia/subnormal.json":83,"@stdlib/constants/float64/ninf":65,"@stdlib/constants/float64/pinf":66,"@stdlib/math/base/assert/is-nan":70,"@stdlib/math/base/assert/is-negative-zero":72,"@stdlib/math/base/assert/is-positive-zero":74,"@stdlib/utils/try-require":142,"path":156,"tape":274}],88:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

// EXPORTS //

module.exports = Number; // eslint-disable-line stdlib/require-globals

},{}],90:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":92}],91:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":48}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":91,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":95,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],94:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":93,"./main.js":96,"@stdlib/utils/define-nonenumerable-read-only-property":119}],95:[function(require,module,exports){
arguments[4][91][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":48,"dup":91}],96:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":93}],97:[function(require,module,exports){
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

},{"./main.js":98}],98:[function(require,module,exports){
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

},{}],99:[function(require,module,exports){
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

},{"./main.js":100,"./regexp.js":101,"@stdlib/utils/define-nonenumerable-read-only-property":119}],100:[function(require,module,exports){
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

},{}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":100}],102:[function(require,module,exports){
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

},{"./is_number.js":105}],103:[function(require,module,exports){
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

},{"./is_number.js":105,"./zero_pad.js":109}],104:[function(require,module,exports){
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

},{"./main.js":107}],105:[function(require,module,exports){
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

},{}],107:[function(require,module,exports){
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

},{"./format_double.js":102,"./format_integer.js":103,"./is_string.js":106,"./space_pad.js":108,"./zero_pad.js":109}],108:[function(require,module,exports){
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

},{}],109:[function(require,module,exports){
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

},{}],110:[function(require,module,exports){
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

},{}],112:[function(require,module,exports){
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

},{"./main.js":114}],113:[function(require,module,exports){
arguments[4][106][0].apply(exports,arguments)
},{"dup":106}],114:[function(require,module,exports){
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

},{"./is_string.js":113,"@stdlib/string/base/format-interpolate":104,"@stdlib/string/base/format-tokenize":110}],115:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":116}],116:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":118}],118:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-buffer":39,"@stdlib/regexp/function-name":99,"@stdlib/utils/native-class":137}],119:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":120}],120:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":124}],121:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],122:[function(require,module,exports){
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

},{}],123:[function(require,module,exports){
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

},{"./define_property.js":122}],124:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":121,"./has_define_property_support.js":123,"./polyfill.js":125}],125:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":112}],126:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./native.js":129,"./polyfill.js":130,"@stdlib/assert/is-function":45}],127:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":128}],128:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./detect.js":126,"@stdlib/object/ctor":97}],129:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./proto.js":131,"@stdlib/utils/native-class":137}],131:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],132:[function(require,module,exports){
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

},{"./codegen.js":133,"./global_this.js":134,"./self.js":135,"./window.js":136,"@stdlib/assert/is-boolean":33,"@stdlib/string/format":112}],133:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MAIN //

var obj = ( typeof globalThis === 'object' ) ? globalThis : null; // eslint-disable-line no-undef


// EXPORTS //

module.exports = obj;

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

// MAIN //

var obj = ( typeof self === 'object' ) ? self : null;


// EXPORTS //

module.exports = obj;

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

// MAIN //

var obj = ( typeof window === 'object' ) ? window : null;


// EXPORTS //

module.exports = obj;

},{}],137:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":138,"./polyfill.js":139,"@stdlib/assert/has-tostringtag-support":20}],138:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":140}],139:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":140,"./tostringtag.js":141,"@stdlib/assert/has-own-property":16}],140:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MODULES //

var Symbol = require( '@stdlib/symbol/ctor' );


// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{"@stdlib/symbol/ctor":115}],142:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-error":41}],144:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./fixtures/nodelist.js":145,"./fixtures/re.js":146,"./fixtures/typedarray.js":147}],145:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/global":132}],146:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],147:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./check.js":144,"./main.js":149,"./polyfill.js":150}],149:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/constructor-name":117}],150:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/constructor-name":117}],151:[function(require,module,exports){
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

},{}],152:[function(require,module,exports){

},{}],153:[function(require,module,exports){
arguments[4][152][0].apply(exports,arguments)
},{"dup":152}],154:[function(require,module,exports){
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
},{"base64-js":151,"buffer":154,"ieee754":257}],155:[function(require,module,exports){
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

},{}],156:[function(require,module,exports){
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
},{"_process":264}],157:[function(require,module,exports){
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

},{"events":155,"inherits":258,"readable-stream/lib/_stream_duplex.js":159,"readable-stream/lib/_stream_passthrough.js":160,"readable-stream/lib/_stream_readable.js":161,"readable-stream/lib/_stream_transform.js":162,"readable-stream/lib/_stream_writable.js":163,"readable-stream/lib/internal/streams/end-of-stream.js":167,"readable-stream/lib/internal/streams/pipeline.js":169}],158:[function(require,module,exports){
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

},{}],159:[function(require,module,exports){
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
},{"./_stream_readable":161,"./_stream_writable":163,"_process":264,"inherits":258}],160:[function(require,module,exports){
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
},{"./_stream_transform":162,"inherits":258}],161:[function(require,module,exports){
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
},{"../errors":158,"./_stream_duplex":159,"./internal/streams/async_iterator":164,"./internal/streams/buffer_list":165,"./internal/streams/destroy":166,"./internal/streams/from":168,"./internal/streams/state":170,"./internal/streams/stream":171,"_process":264,"buffer":154,"events":155,"inherits":258,"string_decoder/":273,"util":152}],162:[function(require,module,exports){
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
},{"../errors":158,"./_stream_duplex":159,"inherits":258}],163:[function(require,module,exports){
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
},{"../errors":158,"./_stream_duplex":159,"./internal/streams/destroy":166,"./internal/streams/state":170,"./internal/streams/stream":171,"_process":264,"buffer":154,"inherits":258,"util-deprecate":282}],164:[function(require,module,exports){
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
},{"./end-of-stream":167,"_process":264}],165:[function(require,module,exports){
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
},{"buffer":154,"util":152}],166:[function(require,module,exports){
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
},{"_process":264}],167:[function(require,module,exports){
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
},{"../../../errors":158}],168:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],169:[function(require,module,exports){
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
},{"../../../errors":158,"./end-of-stream":167}],170:[function(require,module,exports){
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
},{"../../../errors":158}],171:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":155}],172:[function(require,module,exports){
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

},{"./":173,"get-intrinsic":248}],173:[function(require,module,exports){
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

},{"es-define-property":233,"es-errors/type":239,"function-bind":247,"get-intrinsic":248,"set-function-length":268}],174:[function(require,module,exports){
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

},{"./lib/is_arguments.js":175,"./lib/keys.js":176}],175:[function(require,module,exports){
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

},{}],176:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],177:[function(require,module,exports){
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

},{"es-define-property":233,"es-errors/syntax":238,"es-errors/type":239,"gopd":249}],178:[function(require,module,exports){
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

},{"define-data-property":177,"has-property-descriptors":250,"object-keys":262}],179:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],180:[function(require,module,exports){
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

},{"./ToNumber":211,"./ToPrimitive":213,"./Type":218}],181:[function(require,module,exports){
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

},{"../helpers/isFinite":226,"../helpers/isNaN":227,"../helpers/isPrefixOf":228,"./ToNumber":211,"./ToPrimitive":213,"es-errors/type":239,"get-intrinsic":248}],182:[function(require,module,exports){
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

},{"call-bind/callBound":172,"es-errors/type":239}],183:[function(require,module,exports){
'use strict';

var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value) {
	return RequireObjectCoercible(value, arguments.length > 1 ? arguments[1] : void undefined);
};

},{"es-object-atoms/RequireObjectCoercible":241}],184:[function(require,module,exports){
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

},{"./DayWithinYear":187,"./InLeapYear":191,"./MonthFromTime":201,"es-errors/eval":234}],185:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":232,"./floor":222}],186:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":222}],187:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":185,"./DayFromYear":186,"./YearFromTime":220}],188:[function(require,module,exports){
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

},{"./modulo":223}],189:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":230,"./IsAccessorDescriptor":192,"./IsDataDescriptor":194,"es-errors/type":239}],190:[function(require,module,exports){
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

},{"../helpers/timeConstants":232,"./floor":222,"./modulo":223}],191:[function(require,module,exports){
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

},{"./DaysInYear":188,"./YearFromTime":220,"es-errors/eval":234}],192:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":230,"es-errors/type":239,"hasown":256}],193:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":259}],194:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":230,"es-errors/type":239,"hasown":256}],195:[function(require,module,exports){
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

},{"./IsAccessorDescriptor":192,"./IsDataDescriptor":194,"./IsPropertyDescriptor":196,"es-errors/type":239}],196:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor(Desc);
};

},{"../helpers/records/property-descriptor":230}],197:[function(require,module,exports){
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

},{"../helpers/isFinite":226,"../helpers/timeConstants":232}],198:[function(require,module,exports){
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

},{"../helpers/isFinite":226,"./DateFromTime":184,"./Day":185,"./MonthFromTime":201,"./ToInteger":210,"./YearFromTime":220,"./floor":222,"./modulo":223,"get-intrinsic":248}],199:[function(require,module,exports){
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

},{"../helpers/isFinite":226,"../helpers/timeConstants":232,"./ToInteger":210}],200:[function(require,module,exports){
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

},{"../helpers/timeConstants":232,"./floor":222,"./modulo":223}],201:[function(require,module,exports){
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

},{"./DayWithinYear":187,"./InLeapYear":191}],202:[function(require,module,exports){
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

},{"../helpers/isNaN":227}],203:[function(require,module,exports){
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

},{"../helpers/timeConstants":232,"./floor":222,"./modulo":223}],204:[function(require,module,exports){
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

},{"./Type":218}],205:[function(require,module,exports){
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


},{"../helpers/isFinite":226,"./ToNumber":211,"./abs":221,"get-intrinsic":248}],206:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":232,"./DayFromYear":186}],207:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":232,"./modulo":223}],208:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],209:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":211}],210:[function(require,module,exports){
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

},{"../helpers/isFinite":226,"../helpers/isNaN":227,"../helpers/sign":231,"./ToNumber":211,"./abs":221,"./floor":222}],211:[function(require,module,exports){
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

},{"./ToPrimitive":213,"call-bind/callBound":172,"safe-regex-test":267}],212:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = require('es-object-atoms/ToObject');

},{"es-object-atoms/ToObject":242}],213:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":244}],214:[function(require,module,exports){
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

},{"./IsCallable":193,"./ToBoolean":208,"./Type":218,"es-errors/type":239,"hasown":256}],215:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":248}],216:[function(require,module,exports){
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

},{"../helpers/isFinite":226,"../helpers/isNaN":227,"../helpers/sign":231,"./ToNumber":211,"./abs":221,"./floor":222,"./modulo":223}],217:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":211}],218:[function(require,module,exports){
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

},{}],219:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":185,"./modulo":223}],220:[function(require,module,exports){
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

},{"call-bind/callBound":172,"get-intrinsic":248}],221:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":248}],222:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],223:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":229}],224:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":232,"./modulo":223}],225:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":180,"./5/AbstractRelationalComparison":181,"./5/Canonicalize":182,"./5/CheckObjectCoercible":183,"./5/DateFromTime":184,"./5/Day":185,"./5/DayFromYear":186,"./5/DayWithinYear":187,"./5/DaysInYear":188,"./5/FromPropertyDescriptor":189,"./5/HourFromTime":190,"./5/InLeapYear":191,"./5/IsAccessorDescriptor":192,"./5/IsCallable":193,"./5/IsDataDescriptor":194,"./5/IsGenericDescriptor":195,"./5/IsPropertyDescriptor":196,"./5/MakeDate":197,"./5/MakeDay":198,"./5/MakeTime":199,"./5/MinFromTime":200,"./5/MonthFromTime":201,"./5/SameValue":202,"./5/SecFromTime":203,"./5/StrictEqualityComparison":204,"./5/TimeClip":205,"./5/TimeFromYear":206,"./5/TimeWithinDay":207,"./5/ToBoolean":208,"./5/ToInt32":209,"./5/ToInteger":210,"./5/ToNumber":211,"./5/ToObject":212,"./5/ToPrimitive":213,"./5/ToPropertyDescriptor":214,"./5/ToString":215,"./5/ToUint16":216,"./5/ToUint32":217,"./5/Type":218,"./5/WeekDay":219,"./5/YearFromTime":220,"./5/abs":221,"./5/floor":222,"./5/modulo":223,"./5/msFromTime":224}],226:[function(require,module,exports){
'use strict';

var $isNaN = require('./isNaN');

module.exports = function (x) { return (typeof x === 'number' || typeof x === 'bigint') && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{"./isNaN":227}],227:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],228:[function(require,module,exports){
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

},{"call-bind/callBound":172}],229:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],230:[function(require,module,exports){
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

},{"es-errors/type":239,"hasown":256}],231:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],232:[function(require,module,exports){
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

},{}],233:[function(require,module,exports){
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

},{"get-intrinsic":248}],234:[function(require,module,exports){
'use strict';

/** @type {import('./eval')} */
module.exports = EvalError;

},{}],235:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Error;

},{}],236:[function(require,module,exports){
'use strict';

/** @type {import('./range')} */
module.exports = RangeError;

},{}],237:[function(require,module,exports){
'use strict';

/** @type {import('./ref')} */
module.exports = ReferenceError;

},{}],238:[function(require,module,exports){
'use strict';

/** @type {import('./syntax')} */
module.exports = SyntaxError;

},{}],239:[function(require,module,exports){
'use strict';

/** @type {import('./type')} */
module.exports = TypeError;

},{}],240:[function(require,module,exports){
'use strict';

/** @type {import('./uri')} */
module.exports = URIError;

},{}],241:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

/** @type {import('./RequireObjectCoercible')} */
module.exports = function RequireObjectCoercible(value) {
	if (value == null) {
		throw new $TypeError((arguments.length > 0 && arguments[1]) || ('Cannot call method on ' + value));
	}
	return value;
};

},{"es-errors/type":239}],242:[function(require,module,exports){
'use strict';

var $Object = require('./');
var RequireObjectCoercible = require('./RequireObjectCoercible');

/** @type {import('./ToObject')} */
module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

},{"./":243,"./RequireObjectCoercible":241}],243:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Object;

},{}],244:[function(require,module,exports){
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

},{"./helpers/isPrimitive":245,"is-callable":259}],245:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],246:[function(require,module,exports){
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

},{}],247:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":246}],248:[function(require,module,exports){
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

},{"es-errors":235,"es-errors/eval":234,"es-errors/range":236,"es-errors/ref":237,"es-errors/syntax":238,"es-errors/type":239,"es-errors/uri":240,"function-bind":247,"has-proto":251,"has-symbols":252,"hasown":256}],249:[function(require,module,exports){
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

},{"get-intrinsic":248}],250:[function(require,module,exports){
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

},{"es-define-property":233}],251:[function(require,module,exports){
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

},{}],252:[function(require,module,exports){
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

},{"./shams":253}],253:[function(require,module,exports){
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

},{}],254:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":253}],255:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":247}],256:[function(require,module,exports){
'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);

},{"function-bind":247}],257:[function(require,module,exports){
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

},{}],258:[function(require,module,exports){
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

},{}],259:[function(require,module,exports){
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

},{}],260:[function(require,module,exports){
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

},{"call-bind/callBound":172,"has-tostringtag/shams":254}],261:[function(require,module,exports){
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

},{"./isArguments":263}],262:[function(require,module,exports){
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

},{"./implementation":261,"./isArguments":263}],263:[function(require,module,exports){
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

},{}],264:[function(require,module,exports){
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

},{}],265:[function(require,module,exports){
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
},{"_process":264,"through":280,"timers":281}],266:[function(require,module,exports){
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

},{"buffer":154}],267:[function(require,module,exports){
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

},{"call-bind/callBound":172,"es-errors/type":239,"is-regex":260}],268:[function(require,module,exports){
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

},{"define-data-property":177,"es-errors/type":239,"get-intrinsic":248,"gopd":249,"has-property-descriptors":250}],269:[function(require,module,exports){
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

},{"es-abstract/es5":225,"function-bind":247}],270:[function(require,module,exports){
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

},{"./implementation":269,"./polyfill":271,"./shim":272,"define-properties":178,"function-bind":247}],271:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":269}],272:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":271,"define-properties":178}],273:[function(require,module,exports){
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
},{"safe-buffer":266}],274:[function(require,module,exports){
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
},{"./lib/default_stream":275,"./lib/results":277,"./lib/test":278,"_process":264,"defined":179,"through":280,"timers":281}],275:[function(require,module,exports){
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
},{"_process":264,"fs":153,"through":280}],276:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":264,"timers":281}],277:[function(require,module,exports){
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
},{"_process":264,"events":155,"function-bind":247,"has":255,"inherits":258,"object-inspect":279,"resumer":265,"through":280,"timers":281}],278:[function(require,module,exports){
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
},{"./next_tick":276,"deep-equal":174,"defined":179,"events":155,"has":255,"inherits":258,"path":156,"string.prototype.trim":270}],279:[function(require,module,exports){
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

},{}],280:[function(require,module,exports){
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
},{"_process":264,"stream":157}],281:[function(require,module,exports){
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
},{"process/browser.js":264,"timers":281}],282:[function(require,module,exports){
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
},{}]},{},[84,85,86,87]);
