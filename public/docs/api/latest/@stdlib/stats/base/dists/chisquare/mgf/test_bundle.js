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

},{"./uint16array.js":24,"@stdlib/assert/is-uint16array":52,"@stdlib/constants/uint16/max":76}],24:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint32array.js":27,"@stdlib/assert/is-uint32array":54,"@stdlib/constants/uint32/max":77}],27:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint8array.js":30,"@stdlib/assert/is-uint8array":56,"@stdlib/constants/uint8/max":78}],30:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/native-class":185}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":34,"./object.js":35,"./primitive.js":36,"@stdlib/utils/define-nonenumerable-read-only-property":167}],34:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./try2serialize.js":38,"@stdlib/assert/has-tostringtag-support":20,"@stdlib/boolean/ctor":60,"@stdlib/utils/native-class":185}],36:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/get-prototype-of":175,"@stdlib/utils/native-class":185}],43:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":185}],45:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/type-of":196}],47:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":51,"@stdlib/assert/tools/array-function":58,"@stdlib/utils/define-nonenumerable-read-only-property":167}],51:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":185}],54:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":185}],56:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":185}],58:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-array":31,"@stdlib/string/format":158}],60:[function(require,module,exports){
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

},{"@stdlib/number/ctor":110}],73:[function(require,module,exports){
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
* Number of significand bits in the high word of a double-precision floating-point number.
*
* @module @stdlib/constants/float64/num-high-word-significand-bits
* @type {integer32}
*
* @example
* var FLOAT64_NUM_HIGH_WORD_SIGNIFICAND_BITS = require( '@stdlib/constants/float64/num-high-word-significand-bits' );
* // returns 20
*/


// MAIN //

/**
* Number of significand bits in the high word of a double-precision floating-point number.
*
* @constant
* @type {integer32}
* @default 20
*/
var FLOAT64_NUM_HIGH_WORD_SIGNIFICAND_BITS = 20|0; // eslint-disable-line id-length


// EXPORTS //

module.exports = FLOAT64_NUM_HIGH_WORD_SIGNIFICAND_BITS;

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

},{}],79:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a finite numeric value is an even number.
*
* @module @stdlib/math/base/assert/is-even
*
* @example
* var isEven = require( '@stdlib/math/base/assert/is-even' );
*
* var bool = isEven( 5.0 );
* // returns false
*
* bool = isEven( -2.0 );
* // returns true
*
* bool = isEven( 0.0 );
* // returns true
*
* bool = isEven( NaN );
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

var isInteger = require( '@stdlib/math/base/assert/is-integer' );


// MAIN //

/**
* Tests if a finite numeric value is an even number.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is an even number
*
* @example
* var bool = isEven( 5.0 );
* // returns false
*
* @example
* var bool = isEven( -2.0 );
* // returns true
*
* @example
* var bool = isEven( 0.0 );
* // returns true
*
* @example
* var bool = isEven( NaN );
* // returns false
*/
function isEven( x ) {
	return isInteger( x/2.0 );
}


// EXPORTS //

module.exports = isEven;

},{"@stdlib/math/base/assert/is-integer":83}],81:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":82}],82:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/ninf":72,"@stdlib/constants/float64/pinf":74}],83:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a finite double-precision floating-point number is an integer.
*
* @module @stdlib/math/base/assert/is-integer
*
* @example
* var isInteger = require( '@stdlib/math/base/assert/is-integer' );
*
* var bool = isInteger( 1.0 );
* // returns true
*
* bool = isInteger( 3.14 );
* // returns false
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
*/

'use strict';

// MODULES //

var floor = require( '@stdlib/math/base/special/floor' );


// MAIN //

/**
* Tests if a finite double-precision floating-point number is an integer.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is an integer
*
* @example
* var bool = isInteger( 1.0 );
* // returns true
*
* @example
* var bool = isInteger( 3.14 );
* // returns false
*/
function isInteger( x ) {
	return (floor(x) === x);
}


// EXPORTS //

module.exports = isInteger;

},{"@stdlib/math/base/special/floor":93}],85:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Test if a finite double-precision floating-point number is an odd number.
*
* @module @stdlib/math/base/assert/is-odd
*
* @example
* var isOdd = require( '@stdlib/math/base/assert/is-odd' );
*
* var bool = isOdd( 5.0 );
* // returns true
*
* bool = isOdd( -2.0 );
* // returns false
*
* bool = isOdd( 0.0 );
* // returns false
*
* bool = isOdd( NaN );
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

var isEven = require( '@stdlib/math/base/assert/is-even' );


// MAIN //

/**
* Tests if a finite double-precision floating-point number is an odd number.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is an odd number
*
* @example
* var bool = isOdd( 5.0 );
* // returns true
*
* @example
* var bool = isOdd( -2.0 );
* // returns false
*
* @example
* var bool = isOdd( 0.0 );
* // returns false
*
* @example
* var bool = isOdd( NaN );
* // returns false
*/
function isOdd( x ) {
	// Check sign to prevent overflow...
	if ( x > 0.0 ) {
		return isEven( x-1.0 );
	}
	return isEven( x+1.0 );
}


// EXPORTS //

module.exports = isOdd;

},{"@stdlib/math/base/assert/is-even":79}],89:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":90}],90:[function(require,module,exports){
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

},{"@stdlib/constants/float64/high-word-abs-mask":64,"@stdlib/constants/float64/high-word-sign-mask":66,"@stdlib/number/float64/base/from-words":114,"@stdlib/number/float64/base/get-high-word":118,"@stdlib/number/float64/base/to-words":130}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":94}],94:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/constants/float64/exponent-bias":63,"@stdlib/constants/float64/max-base2-exponent":70,"@stdlib/constants/float64/max-base2-exponent-subnormal":69,"@stdlib/constants/float64/min-base2-exponent-subnormal":71,"@stdlib/constants/float64/ninf":72,"@stdlib/constants/float64/pinf":74,"@stdlib/math/base/assert/is-infinite":81,"@stdlib/math/base/assert/is-nan":85,"@stdlib/math/base/special/copysign":91,"@stdlib/number/float64/base/exponent":112,"@stdlib/number/float64/base/from-words":114,"@stdlib/number/float64/base/normalize":121,"@stdlib/number/float64/base/to-words":130}],97:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Evaluate the exponential function.
*
* @module @stdlib/math/base/special/pow
*
* @example
* var pow = require( '@stdlib/math/base/special/pow' );
*
* var v = pow( 2.0, 3.0 );
* // returns 8.0
*
* v = pow( 4.0, 0.5 );
* // returns 2.0
*
* v = pow( 100.0, 0.0 );
* // returns 1.0
*
* v = pow( 3.141592653589793, 5.0 );
* // returns ~306.0197
*
* v = pow( 3.141592653589793, -0.2 );
* // returns ~0.7954
*
* v = pow( NaN, 3.0 );
* // returns NaN
*
* v = pow( 5.0, NaN );
* // returns NaN
*
* v = pow( NaN, NaN );
* // returns NaN
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":100}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_pow.c}. The implementation follows the original, but has been modified for JavaScript.
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

var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var setLowWord = require( '@stdlib/number/float64/base/set-low-word' );
var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
var BIAS = require( '@stdlib/constants/float64/exponent-bias' );
var HIGH_NUM_SIGNIFICAND_BITS = require( '@stdlib/constants/float64/num-high-word-significand-bits' );
var polyvalL = require( './polyval_l.js' );


// VARIABLES //

// 0x000fffff = 1048575 => 0 00000000000 11111111111111111111
var HIGH_SIGNIFICAND_MASK = 0x000fffff|0; // asm type annotation

// 0x00100000 = 1048576 => 0 00000000001 00000000000000000000 => biased exponent: 1 = -1022+1023 => 2^-1022
var HIGH_MIN_NORMAL_EXP = 0x00100000|0; // asm type annotation

// 0x3ff00000 = 1072693248 => 0 01111111111 00000000000000000000 => biased exponent: 1023 = 0+1023 => 2^0 = 1
var HIGH_BIASED_EXP_0 = 0x3ff00000|0; // asm type annotation

// 0x20000000 = 536870912 => 0 01000000000 00000000000000000000 => biased exponent: 512 = -511+1023
var HIGH_BIASED_EXP_NEG_512 = 0x20000000|0; // asm type annotation

// 0x00080000 = 524288 => 0 00000000000 10000000000000000000
var HIGH_SIGNIFICAND_HALF = 0x00080000|0; // asm type annotation

var TWO53 = 9007199254740992.0;	// 0x43400000, 0x00000000

// 2/(3*LN2)
var CP = 9.61796693925975554329e-01; // 0x3FEEC709, 0xDC3A03FD

// (float)CP
var CP_HI = 9.61796700954437255859e-01; // 0x3FEEC709, 0xE0000000

// Low: CP_HI
var CP_LO = -7.02846165095275826516e-09; // 0xBE3E2FE0, 0x145B01F5

var BP = [
	1.0,
	1.5
];
var DP_HI = [
	0.0,
	5.84962487220764160156e-01 // 0x3FE2B803, 0x40000000
];
var DP_LO = [
	0.0,
	1.35003920212974897128e-08 // 0x3E4CFDEB, 0x43CFD006
];


// MAIN //

/**
* Computes \\(\operatorname{log2}(ax)\\).
*
* @private
* @param {Array} out - output array
* @param {number} ax - absolute value of `x`
* @param {number} ahx - high word of `ax`
* @returns {Array} output array containing a tuple comprised of high and low parts
*
* @example
* var t = log2ax( [ 0.0, 0.0 ], 9.0, 1075970048 ); // => [ t1, t2 ]
* // returns [ 3.169923782348633, 0.0000012190936795504075 ]
*/
function log2ax( out, ax, ahx ) {
	var tmp;
	var ss; // `hs + ls`
	var s2; // `ss` squared
	var hs;
	var ls;
	var ht;
	var lt;
	var bp; // `BP` constant
	var dp; // `DP` constant
	var hp;
	var lp;
	var hz;
	var lz;
	var t1;
	var t2;
	var t;
	var r;
	var u;
	var v;
	var n;
	var j;
	var k;

	n = 0|0; // asm type annotation

	// Check if `x` is subnormal...
	if ( ahx < HIGH_MIN_NORMAL_EXP ) {
		ax *= TWO53;
		n -= 53|0; // asm type annotation
		ahx = getHighWord( ax );
	}
	// Extract the unbiased exponent of `x`:
	n += ((ahx >> HIGH_NUM_SIGNIFICAND_BITS) - BIAS)|0; // asm type annotation

	// Isolate the significand bits of `x`:
	j = (ahx & HIGH_SIGNIFICAND_MASK)|0; // asm type annotation

	// Normalize `ahx` by setting the (biased) exponent to `1023`:
	ahx = (j | HIGH_BIASED_EXP_0)|0; // asm type annotation

	// Determine the interval of `|x|` by comparing significand bits...

	// |x| < sqrt(3/2)
	if ( j <= 0x3988E ) { // 0 00000000000 00111001100010001110
		k = 0;
	}
	// |x| < sqrt(3)
	else if ( j < 0xBB67A ) { // 0 00000000000 10111011011001111010
		k = 1;
	}
	// |x| >= sqrt(3)
	else {
		k = 0;
		n += 1|0; // asm type annotation
		ahx -= HIGH_MIN_NORMAL_EXP;
	}
	// Load the normalized high word into `|x|`:
	ax = setHighWord( ax, ahx );

	// Compute `ss = hs + ls = (x-1)/(x+1)` or `(x-1.5)/(x+1.5)`:
	bp = BP[ k ]; // BP[0] = 1.0, BP[1] = 1.5
	u = ax - bp; // (x-1) || (x-1.5)
	v = 1.0 / (ax + bp); // 1/(x+1) || 1/(x+1.5)
	ss = u * v;
	hs = setLowWord( ss, 0 ); // set all low word (less significant significand) bits to 0s

	// Compute `ht = ax + bp` (via manipulation, i.e., bit flipping, of the high word):
	tmp = ((ahx>>1) | HIGH_BIASED_EXP_NEG_512) + HIGH_SIGNIFICAND_HALF;
	tmp += (k << 18); // `(k<<18)` can be considered the word equivalent of `1.0` or `1.5`
	ht = setHighWord( 0.0, tmp );
	lt = ax - (ht - bp);
	ls = v * ( ( u - (hs*ht) ) - ( hs*lt ) );

	// Compute `log(ax)`...

	s2 = ss * ss;
	r = s2 * s2 * polyvalL( s2 );
	r += ls * (hs + ss);
	s2 = hs * hs;
	ht = 3.0 + s2 + r;
	ht = setLowWord( ht, 0 );
	lt = r - ((ht-3.0) - s2);

	// u+v = ss*(1+...):
	u = hs * ht;
	v = ( ls*ht ) + ( lt*ss );

	// 2/(3LN2) * (ss+...):
	hp = u + v;
	hp = setLowWord( hp, 0 );
	lp = v - (hp - u);
	hz = CP_HI * hp; // CP_HI+CP_LO = 2/(3*LN2)
	lz = ( CP_LO*hp ) + ( lp*CP ) + DP_LO[ k ];

	// log2(ax) = (ss+...)*2/(3*LN2) = n + dp + hz + lz
	dp = DP_HI[ k ];
	t = n;
	t1 = ((hz+lz) + dp) + t; // log2(ax)
	t1 = setLowWord( t1, 0 );
	t2 = lz - (((t1-t) - dp) - hz);

	out[ 0 ] = t1;
	out[ 1 ] = t2;
	return out;
}


// EXPORTS //

module.exports = log2ax;

},{"./polyval_l.js":101,"@stdlib/constants/float64/exponent-bias":63,"@stdlib/constants/float64/num-high-word-significand-bits":73,"@stdlib/number/float64/base/get-high-word":118,"@stdlib/number/float64/base/set-high-word":124,"@stdlib/number/float64/base/set-low-word":126}],99:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_pow.c}. The implementation follows the original, but has been modified for JavaScript.
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

var setLowWord = require( '@stdlib/number/float64/base/set-low-word' );
var polyvalW = require( './polyval_w.js' );


// VARIABLES //

// 1/LN2
var INV_LN2 = 1.44269504088896338700e+00; // 0x3FF71547, 0x652B82FE

// High (24 bits): 1/LN2
var INV_LN2_HI = 1.44269502162933349609e+00; // 0x3FF71547, 0x60000000

// Low: 1/LN2
var INV_LN2_LO = 1.92596299112661746887e-08; // 0x3E54AE0B, 0xF85DDF44


// MAIN //

/**
* Computes \\(\operatorname{log}(x)\\) assuming \\(|1-x|\\) is small and using the approximation \\(x - x^2/2 + x^3/3 - x^4/4\\).
*
* @private
* @param {Array} out - output array
* @param {number} ax - absolute value of `x`
* @returns {Array} output array containing a tuple comprised of high and low parts
*
* @example
* var t = logx( [ 0.0, 0.0 ], 9.0 ); // => [ t1, t2 ]
* // returns [ -1265.7236328125, -0.0008163940840404393 ]
*/
function logx( out, ax ) {
	var t2;
	var t1;
	var t;
	var w;
	var u;
	var v;

	t = ax - 1.0; // `t` has `20` trailing zeros
	w = t * t * polyvalW( t );
	u = INV_LN2_HI * t; // `INV_LN2_HI` has `21` significant bits
	v = ( t*INV_LN2_LO ) - ( w*INV_LN2 );
	t1 = u + v;
	t1 = setLowWord( t1, 0 );
	t2 = v - (t1 - u);

	out[ 0 ] = t1;
	out[ 1 ] = t2;
	return out;
}


// EXPORTS //

module.exports = logx;

},{"./polyval_w.js":103,"@stdlib/number/float64/base/set-low-word":126}],100:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_pow.c}. The implementation follows the original, but has been modified for JavaScript.
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
var isOdd = require( '@stdlib/math/base/assert/is-odd' );
var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
var isInteger = require( '@stdlib/math/base/assert/is-integer' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var abs = require( '@stdlib/math/base/special/abs' );
var toWords = require( '@stdlib/number/float64/base/to-words' );
var setLowWord = require( '@stdlib/number/float64/base/set-low-word' );
var uint32ToInt32 = require( '@stdlib/number/uint32/base/to-int32' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var ABS_MASK = require( '@stdlib/constants/float64/high-word-abs-mask' );
var xIsZero = require( './x_is_zero.js' );
var yIsHuge = require( './y_is_huge.js' );
var yIsInfinite = require( './y_is_infinite.js' );
var log2ax = require( './log2ax.js' );
var logx = require( './logx.js' );
var pow2 = require( './pow2.js' );


// VARIABLES //

// 0x3fefffff = 1072693247 => 0 01111111110 11111111111111111111 => biased exponent: 1022 = -1+1023 => 2^-1
var HIGH_MAX_NEAR_UNITY = 0x3fefffff|0; // asm type annotation

// 0x41e00000 = 1105199104 => 0 10000011110 00000000000000000000 => biased exponent: 1054 = 31+1023 => 2^31
var HIGH_BIASED_EXP_31 = 0x41e00000|0; // asm type annotation

// 0x43f00000 = 1139802112 => 0 10000111111 00000000000000000000 => biased exponent: 1087 = 64+1023 => 2^64
var HIGH_BIASED_EXP_64 = 0x43f00000|0; // asm type annotation

// 0x40900000 = 1083179008 => 0 10000001001 00000000000000000000 => biased exponent: 1033 = 10+1023 => 2^10 = 1024
var HIGH_BIASED_EXP_10 = 0x40900000|0; // asm type annotation

// 0x3ff00000 = 1072693248 => 0 01111111111 00000000000000000000 => biased exponent: 1023 = 0+1023 => 2^0 = 1
var HIGH_BIASED_EXP_0 = 0x3ff00000|0; // asm type annotation

// 0x4090cc00 = 1083231232 => 0 10000001001 00001100110000000000
var HIGH_1075 = 0x4090cc00|0; // asm type annotation

// 0xc090cc00 = 3230714880 => 1 10000001001 00001100110000000000
var HIGH_NEG_1075 = 0xc090cc00>>>0; // asm type annotation

var HIGH_NUM_NONSIGN_BITS = 31|0; // asm type annotation

var HUGE = 1.0e300;
var TINY = 1.0e-300;

// -(1024-log2(ovfl+.5ulp))
var OVT = 8.0085662595372944372e-17;

// High/low words workspace:
var WORDS = [ 0|0, 0|0 ];

// Log workspace:
var LOG_WORKSPACE = [ 0.0, 0.0 ];


// MAIN //

/**
* Evaluates the exponential function.
*
* ## Method
*
* 1.  Let \\(x = 2^n (1+f)\\).
*
* 2.  Compute \\(\operatorname{log2}(x)\\) as
*
*     ```tex
*     \operatorname{log2}(x) = w_1 + w_2
*     ```
*
*     where \\(w_1\\) has \\(53 - 24 = 29\\) bit trailing zeros.
*
* 3.  Compute
*
*     ```tex
*     y \cdot \operatorname{log2}(x) = n + y^\prime
*     ```
*
*     by simulating multi-precision arithmetic, where \\(|y^\prime| \leq 0.5\\).
*
* 4.  Return
*
*     ```tex
*     x^y = 2^n e^{y^\prime \cdot \mathrm{log2}}
*     ```
*
* ## Special Cases
*
* ```tex
* \begin{align*}
* x^{\mathrm{NaN}} &= \mathrm{NaN} & \\
* (\mathrm{NaN})^y &= \mathrm{NaN} & \\
* 1^y &= 1 & \\
* x^0 &= 1 & \\
* x^1 &= x & \\
* (\pm 0)^\infty &= +0 & \\
* (\pm 0)^{-\infty} &= +\infty & \\
* (+0)^y &= +0 & \mathrm{if}\ y > 0 \\
* (+0)^y &= +\infty & \mathrm{if}\ y < 0 \\
* (-0)^y &= -\infty & \mathrm{if}\ y\ \mathrm{is\ an\ odd\ integer\ and}\ y < 0 \\
* (-0)^y &= +\infty & \mathrm{if}\ y\ \mathrm{is\ not\ an\ odd\ integer\ and}\ y < 0 \\
* (-0)^y &= -0 & \mathrm{if}\ y\ \mathrm{is\ an\ odd\ integer\ and}\ y > 0 \\
* (-0)^y &= +0 & \mathrm{if}\ y\ \mathrm{is\ not\ an\ odd\ integer\ and}\ y > 0 \\
* (-1)^{\pm\infty} &= \mathrm{NaN} & \\
* x^{\infty} &= +\infty & |x| > 1 \\
* x^{\infty} &= +0 & |x| < 1 \\
* x^{-\infty} &= +0 & |x| > 1 \\
* x^{-\infty} &= +\infty & |x| < 1 \\
* (-\infty)^y &= (-0)^y & \\
* \infty^y &= +0 & y < 0 \\
* \infty^y &= +\infty & y > 0 \\
* x^y &= \mathrm{NaN} & \mathrm{if}\ y\ \mathrm{is\ not\ a\ finite\ integer\ and}\ x < 0
* \end{align*}
* ```
*
* ## Notes
*
* -   \\(\operatorname{pow}(x,y)\\) returns \\(x^y\\) nearly rounded. In particular, \\(\operatorname{pow}(<\mathrm{integer}>,<\mathrm{integer}>)\\) **always** returns the correct integer, provided the value is representable.
* -   The hexadecimal values shown in the source code are the intended values for used constants. Decimal values may be used, provided the compiler will accurately convert decimal to binary in order to produce the hexadecimal values.
*
* @param {number} x - base
* @param {number} y - exponent
* @returns {number} function value
*
* @example
* var v = pow( 2.0, 3.0 );
* // returns 8.0
*
* @example
* var v = pow( 4.0, 0.5 );
* // returns 2.0
*
* @example
* var v = pow( 100.0, 0.0 );
* // returns 1.0
*
* @example
* var v = pow( 3.141592653589793, 5.0 );
* // returns ~306.0197
*
* @example
* var v = pow( 3.141592653589793, -0.2 );
* // returns ~0.7954
*
* @example
* var v = pow( NaN, 3.0 );
* // returns NaN
*
* @example
* var v = pow( 5.0, NaN );
* // returns NaN
*
* @example
* var v = pow( NaN, NaN );
* // returns NaN
*/
function pow( x, y ) {
	var ahx; // absolute value high word `x`
	var ahy; // absolute value high word `y`
	var ax;  // absolute value `x`
	var hx;  // high word `x`
	var lx;  // low word `x`
	var hy;  // high word `y`
	var ly;  // low word `y`
	var sx;  // sign `x`
	var sy;  // sign `y`
	var y1;
	var hp;
	var lp;
	var t;
	var z;   // y prime
	var j;
	var i;
	if ( isnan( x ) || isnan( y ) ) {
		return NaN;
	}
	// Split `y` into high and low words:
	toWords.assign( y, WORDS, 1, 0 );
	hy = WORDS[ 0 ];
	ly = WORDS[ 1 ];

	// Special cases `y`...
	if ( ly === 0 ) {
		if ( y === 0.0 ) {
			return 1.0;
		}
		if ( y === 1.0 ) {
			return x;
		}
		if ( y === -1.0 ) {
			return 1.0 / x;
		}
		if ( y === 0.5 ) {
			return sqrt( x );
		}
		if ( y === -0.5 ) {
			return 1.0 / sqrt( x );
		}
		if ( y === 2.0 ) {
			return x * x;
		}
		if ( y === 3.0 ) {
			return x * x * x;
		}
		if ( y === 4.0 ) {
			x *= x;
			return x * x;
		}
		if ( isInfinite( y ) ) {
			return yIsInfinite( x, y );
		}
	}
	// Split `x` into high and low words:
	toWords.assign( x, WORDS, 1, 0 );
	hx = WORDS[ 0 ];
	lx = WORDS[ 1 ];

	// Special cases `x`...
	if ( lx === 0 ) {
		if ( hx === 0 ) {
			return xIsZero( x, y );
		}
		if ( x === 1.0 ) {
			return 1.0;
		}
		if (
			x === -1.0 &&
			isOdd( y )
		) {
			return -1.0;
		}
		if ( isInfinite( x ) ) {
			if ( x === NINF ) {
				// `pow( 1/x, -y )`
				return pow( -0.0, -y );
			}
			if ( y < 0.0 ) {
				return 0.0;
			}
			return PINF;
		}
	}
	if (
		x < 0.0 &&
		isInteger( y ) === false
	) {
		// Signal NaN...
		return (x-x)/(x-x);
	}
	ax = abs( x );

	// Remove the sign bits (i.e., get absolute values):
	ahx = (hx & ABS_MASK)|0; // asm type annotation
	ahy = (hy & ABS_MASK)|0; // asm type annotation

	// Extract the sign bits:
	sx = (hx >>> HIGH_NUM_NONSIGN_BITS)|0; // asm type annotation
	sy = (hy >>> HIGH_NUM_NONSIGN_BITS)|0; // asm type annotation

	// Determine the sign of the result...
	if ( sx && isOdd( y ) ) {
		sx = -1.0;
	} else {
		sx = 1.0;
	}
	// Case 1: `|y|` is huge...

	// |y| > 2^31
	if ( ahy > HIGH_BIASED_EXP_31 ) {
		// `|y| > 2^64`, then must over- or underflow...
		if ( ahy > HIGH_BIASED_EXP_64 ) {
			return yIsHuge( x, y );
		}
		// Over- or underflow if `x` is not close to unity...

		if ( ahx < HIGH_MAX_NEAR_UNITY ) {
			// y < 0
			if ( sy === 1 ) {
				// Signal overflow...
				return sx * HUGE * HUGE;
			}
			// Signal underflow...
			return sx * TINY * TINY;
		}
		if ( ahx > HIGH_BIASED_EXP_0 ) {
			// y > 0
			if ( sy === 0 ) {
				// Signal overflow...
				return sx * HUGE * HUGE;
			}
			// Signal underflow...
			return sx * TINY * TINY;
		}
		// At this point, `|1-x|` is tiny (`<= 2^-20`). Suffice to compute `log(x)` by `x - x^2/2 + x^3/3 - x^4/4`.
		t = logx( LOG_WORKSPACE, ax );
	}
	// Case 2: `|y|` is not huge...
	else {
		t = log2ax( LOG_WORKSPACE, ax, ahx );
	}
	// Split `y` into `y1 + y2` and compute `(y1+y2) * (t1+t2)`...
	y1 = setLowWord( y, 0 );
	lp = ( (y-y1)*t[0] ) + ( y*t[1] );
	hp = y1 * t[0];
	z = lp + hp;

	// Note: *can* be more performant to use `getHighWord` and `getLowWord` directly, but using `toWords` looks cleaner.
	toWords.assign( z, WORDS, 1, 0 );
	j = uint32ToInt32( WORDS[0] );
	i = uint32ToInt32( WORDS[1] );

	// z >= 1024
	if ( j >= HIGH_BIASED_EXP_10 ) {
		// z > 1024
		if ( ((j-HIGH_BIASED_EXP_10)|i) !== 0 ) {
			// Signal overflow...
			return sx * HUGE * HUGE;
		}
		if ( (lp+OVT) > (z-hp) ) {
			// Signal overflow...
			return sx * HUGE * HUGE;
		}
	}
	// z <= -1075
	else if ( (j&ABS_MASK) >= HIGH_1075 ) {
		// z < -1075
		if ( ((j-HIGH_NEG_1075)|i) !== 0 ) {
			// Signal underflow...
			return sx * TINY * TINY;
		}
		if ( lp <= (z-hp) ) {
			// Signal underflow...
			return sx * TINY * TINY;
		}
	}
	// Compute `2^(hp+lp)`...
	z = pow2( j, hp, lp );

	return sx * z;
}


// EXPORTS //

module.exports = pow;

},{"./log2ax.js":98,"./logx.js":99,"./pow2.js":104,"./x_is_zero.js":105,"./y_is_huge.js":106,"./y_is_infinite.js":107,"@stdlib/constants/float64/high-word-abs-mask":64,"@stdlib/constants/float64/ninf":72,"@stdlib/constants/float64/pinf":74,"@stdlib/math/base/assert/is-infinite":81,"@stdlib/math/base/assert/is-integer":83,"@stdlib/math/base/assert/is-nan":85,"@stdlib/math/base/assert/is-odd":87,"@stdlib/math/base/special/abs":89,"@stdlib/math/base/special/sqrt":108,"@stdlib/number/float64/base/set-low-word":126,"@stdlib/number/float64/base/to-words":130,"@stdlib/number/uint32/base/to-int32":133}],101:[function(require,module,exports){
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
		return 0.5999999999999946;
	}
	return 0.5999999999999946 + (x * (0.4285714285785502 + (x * (0.33333332981837743 + (x * (0.272728123808534 + (x * (0.23066074577556175 + (x * 0.20697501780033842))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],102:[function(require,module,exports){
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
		return 0.5;
	}
	return 0.5 + (x * (-0.3333333333333333 + (x * 0.25)));
}


// EXPORTS //

module.exports = evalpoly;

},{}],104:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_pow.c}. The implementation follows the original, but has been modified for JavaScript.
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

var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
var setLowWord = require( '@stdlib/number/float64/base/set-low-word' );
var uint32ToInt32 = require( '@stdlib/number/uint32/base/to-int32' );
var ldexp = require( '@stdlib/math/base/special/ldexp' );
var LN2 = require( '@stdlib/constants/float64/ln-two' );
var BIAS = require( '@stdlib/constants/float64/exponent-bias' );
var ABS_MASK = require( '@stdlib/constants/float64/high-word-abs-mask' );
var HIGH_SIGNIFICAND_MASK = require( '@stdlib/constants/float64/high-word-significand-mask' );
var HIGH_NUM_SIGNIFICAND_BITS = require( '@stdlib/constants/float64/num-high-word-significand-bits' );
var polyvalP = require( './polyval_p.js' );


// VARIABLES //

// 0x00100000 = 1048576 => 0 00000000001 00000000000000000000 => biased exponent: 1 = -1022+1023 => 2^-1022
var HIGH_MIN_NORMAL_EXP = 0x00100000|0; // asm type annotation

// 0x3fe00000 = 1071644672 => 0 01111111110 00000000000000000000 => biased exponent: 1022 = -1+1023 => 2^-1
var HIGH_BIASED_EXP_NEG_1 = 0x3fe00000|0; // asm type annotation

// High: LN2
var LN2_HI = 6.93147182464599609375e-01; // 0x3FE62E43, 0x00000000

// Low: LN2
var LN2_LO = -1.90465429995776804525e-09; // 0xBE205C61, 0x0CA86C39


// MAIN //

/**
* Computes \\(2^{\mathrm{hp} + \mathrm{lp}\\).
*
* @private
* @param {number} j - high word of `hp + lp`
* @param {number} hp - first power summand
* @param {number} lp - second power summand
* @returns {number} function value
*
* @example
* var z = pow2( 1065961648, -0.3398475646972656, -0.000002438187359100815 );
* // returns ~0.79
*/
function pow2( j, hp, lp ) {
	var tmp;
	var t1;
	var t;
	var r;
	var u;
	var v;
	var w;
	var z;
	var n;
	var i;
	var k;

	i = (j & ABS_MASK)|0; // asm type annotation
	k = ((i>>HIGH_NUM_SIGNIFICAND_BITS) - BIAS)|0; // asm type annotation
	n = 0;

	// `|z| > 0.5`, set `n = z+0.5`
	if ( i > HIGH_BIASED_EXP_NEG_1 ) {
		n = (j + (HIGH_MIN_NORMAL_EXP>>(k+1)))>>>0; // asm type annotation
		k = (((n & ABS_MASK)>>HIGH_NUM_SIGNIFICAND_BITS) - BIAS)|0; // new k for n
		tmp = ((n & ~(HIGH_SIGNIFICAND_MASK >> k)))>>>0; // asm type annotation
		t = setHighWord( 0.0, tmp );
		n = (((n & HIGH_SIGNIFICAND_MASK)|HIGH_MIN_NORMAL_EXP) >> (HIGH_NUM_SIGNIFICAND_BITS-k))>>>0; // eslint-disable-line max-len
		if ( j < 0 ) {
			n = -n;
		}
		hp -= t;
	}
	t = lp + hp;
	t = setLowWord( t, 0 );
	u = t * LN2_HI;
	v = ( (lp - (t-hp))*LN2 ) + ( t*LN2_LO );
	z = u + v;
	w = v - (z - u);
	t = z * z;
	t1 = z - ( t*polyvalP( t ) );
	r = ( (z*t1) / (t1-2.0) ) - ( w + (z*w) );
	z = 1.0 - (r - z);
	j = getHighWord( z );
	j = uint32ToInt32( j );
	j += (n << HIGH_NUM_SIGNIFICAND_BITS)>>>0; // asm type annotation

	// Check for subnormal output...
	if ( (j>>HIGH_NUM_SIGNIFICAND_BITS) <= 0 ) {
		z = ldexp( z, n );
	} else {
		z = setHighWord( z, j );
	}
	return z;
}


// EXPORTS //

module.exports = pow2;

},{"./polyval_p.js":102,"@stdlib/constants/float64/exponent-bias":63,"@stdlib/constants/float64/high-word-abs-mask":64,"@stdlib/constants/float64/high-word-significand-mask":67,"@stdlib/constants/float64/ln-two":68,"@stdlib/constants/float64/num-high-word-significand-bits":73,"@stdlib/math/base/special/ldexp":95,"@stdlib/number/float64/base/get-high-word":118,"@stdlib/number/float64/base/set-high-word":124,"@stdlib/number/float64/base/set-low-word":126,"@stdlib/number/uint32/base/to-int32":133}],105:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_pow.c}. The implementation follows the original, but has been modified for JavaScript.
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

var isOdd = require( '@stdlib/math/base/assert/is-odd' );
var copysign = require( '@stdlib/math/base/special/copysign' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var PINF = require( '@stdlib/constants/float64/pinf' );


// MAIN //

/**
* Evaluates the exponential function when \\(|x| = 0\\).
*
* @private
* @param {number} x - base
* @param {number} y - exponent
* @returns {number} function value
*
* @example
* var v = pow( 0.0, 2 );
* // returns 0.0
*
* @example
* var v = pow( -0.0, -9 );
* // returns -Infinity
*
* @example
* var v = pow( 0.0, -9 );
* // returns Infinity
*
* @example
* var v = pow( -0.0, 9 );
* // returns 0.0
*
* @example
* var v = pow( 0.0, -Infinity  );
* // returns Infinity
*
* @example
* var v = pow( 0.0, Infinity );
* // returns 0.0
*/
function pow( x, y ) {
	if ( y === NINF ) {
		return PINF;
	}
	if ( y === PINF ) {
		return 0.0;
	}
	if ( y > 0.0 ) {
		if ( isOdd( y ) ) {
			return x; // handles +-0
		}
		return 0.0;
	}
	// y < 0.0
	if ( isOdd( y ) ) {
		return copysign( PINF, x ); // handles +-0
	}
	return PINF;
}


// EXPORTS //

module.exports = pow;

},{"@stdlib/constants/float64/ninf":72,"@stdlib/constants/float64/pinf":74,"@stdlib/math/base/assert/is-odd":87,"@stdlib/math/base/special/copysign":91}],106:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_pow.c}. The implementation follows the original, but has been modified for JavaScript.
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

var ABS_MASK = require( '@stdlib/constants/float64/high-word-abs-mask' );
var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );


// VARIABLES //

// 0x3fefffff = 1072693247 => 0 01111111110 11111111111111111111 => biased exponent: 1022 = -1+1023 => 2^-1
var HIGH_MAX_NEAR_UNITY = 0x3fefffff|0; // asm type annotation

var HUGE = 1.0e300;
var TINY = 1.0e-300;


// MAIN //

/**
* Evaluates the exponential function when \\(|y| > 2^64\\).
*
* @private
* @param {number} x - base
* @param {number} y - exponent
* @returns {number} overflow or underflow result
*
* @example
* var v = pow( 9.0, 3.6893488147419103e19 );
* // returns Infinity
*
* @example
* var v = pow( -3.14, -3.6893488147419103e19 );
* // returns 0.0
*/
function pow( x, y ) {
	var ahx;
	var hx;

	hx = getHighWord( x );
	ahx = (hx & ABS_MASK);

	if ( ahx <= HIGH_MAX_NEAR_UNITY ) {
		if ( y < 0 ) {
			// Signal overflow...
			return HUGE * HUGE;
		}
		// Signal underflow...
		return TINY * TINY;
	}
	// `x` has a biased exponent greater than or equal to `0`...

	if ( y > 0 ) {
		// Signal overflow...
		return HUGE * HUGE;
	}
	// Signal underflow...
	return TINY * TINY;
}


// EXPORTS //

module.exports = pow;

},{"@stdlib/constants/float64/high-word-abs-mask":64,"@stdlib/number/float64/base/get-high-word":118}],107:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var abs = require( '@stdlib/math/base/special/abs' );
var PINF = require( '@stdlib/constants/float64/pinf' );


// MAIN //

/**
* Evaluates the exponential function when \\( y = \pm \infty\\).
*
* @private
* @param {number} x - base
* @param {number} y - exponent
* @returns {number} function value
*
* @example
* var v = pow( -1.0, Infinity );
* // returns NaN
*
* @example
* var v = pow( -1.0, -Infinity  );
* // returns NaN
*
* @example
* var v = pow( 1.0, Infinity );
* // returns 1.0
*
* @example
* var v = pow( 1.0, -Infinity  );
* // returns 1.0
*
* @example
* var v = pow( 0.5, Infinity );
* // returns 0.0
*
* @example
* var v = pow( 0.5, -Infinity  );
* // returns Infinity
*
* @example
* var v = pow( 1.5, -Infinity  );
* // returns 0.0
*
* @example
* var v = pow( 1.5, Infinity );
* // returns Infinity
*/
function pow( x, y ) {
	if ( x === -1.0 ) {
		// Julia (0.4.2) and Python (2.7.9) return `1.0` (WTF???). JavaScript (`Math.pow`), R, and libm return `NaN`. We choose `NaN`, as the value is indeterminate; i.e., we cannot determine whether `y` is odd, even, or somewhere in between.
		return (x-x)/(x-x); // signal NaN
	}
	if ( x === 1.0 ) {
		return 1.0;
	}
	// (|x| > 1 && y === NINF) || (|x| < 1 && y === PINF)
	if ( (abs(x) < 1.0) === (y === PINF) ) {
		return 0.0;
	}
	// (|x| > 1 && y === PINF) || (|x| < 1 && y === NINF)
	return PINF;
}


// EXPORTS //

module.exports = pow;

},{"@stdlib/constants/float64/pinf":74,"@stdlib/math/base/special/abs":89}],108:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/exponent-bias":63,"@stdlib/constants/float64/high-word-exponent-mask":65,"@stdlib/number/float64/base/get-high-word":118}],114:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":116}],115:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":115,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],117:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":117,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],120:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/smallest-normal":75,"@stdlib/math/base/assert/is-infinite":81,"@stdlib/math/base/assert/is-nan":85,"@stdlib/math/base/special/abs":89}],121:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":120,"./main.js":122,"@stdlib/utils/define-nonenumerable-read-only-property":167}],122:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":120}],123:[function(require,module,exports){
arguments[4][117][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":48,"dup":117}],124:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":123,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],126:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Set the less significant 32 bits of a double-precision floating-point number.
*
* @module @stdlib/number/float64/base/set-low-word
*
* @example
* var setLowWord = require( '@stdlib/number/float64/base/set-low-word' );
*
* var low = 5 >>> 0; // => 00000000000000000000000000000101
*
* var x = 3.14e201; // => 0 11010011100 01001000001011000011 10010011110010110101100010000010
*
* var y = setLowWord( x, low ); // => 0 11010011100 01001000001011000011 00000000000000000000000000000101
* // returns 3.139998651394392e+201
*
* @example
* var setLowWord = require( '@stdlib/number/float64/base/set-low-word' );
* var PINF = require( '@stdlib/constants/float64/pinf' );
* var NINF = require( '@stdlib/constants/float64/ninf' );
*
* var low = 12345678;
*
* var y = setLowWord( PINF, low );
* // returns NaN
*
* y = setLowWord( NINF, low );
* // returns NaN
*
* y = setLowWord( NaN, low );
* // returns NaN
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":128}],127:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var LOW;
if ( isLittleEndian === true ) {
	LOW = 0; // first index
} else {
	LOW = 1; // second index
}


// EXPORTS //

module.exports = LOW;

},{"@stdlib/assert/is-little-endian":48}],128:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var LOW = require( './low.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );


// MAIN //

/**
* Sets the less significant 32 bits of a double-precision floating-point number.
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
* In which Uint32 can we find the lower order bits? If little endian, the first; if big endian, the second.
*
* ## References
*
* -   [Open Group][1]
*
* [1]: http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm
*
* @param {number} x - double
* @param {uinteger32} low - unsigned 32-bit integer to replace the lower order word of `x`
* @returns {number} double having the same higher order word as `x`
*
* @example
* var low = 5 >>> 0; // => 00000000000000000000000000000101
*
* var x = 3.14e201; // => 0 11010011100 01001000001011000011 10010011110010110101100010000010
*
* var y = setLowWord( x, low ); // => 0 11010011100 01001000001011000011 00000000000000000000000000000101
* // returns 3.139998651394392e+201
*
* @example
* var PINF = require( '@stdlib/constants/float64/pinf' );
* var NINF = require( '@stdlib/constants/float64/ninf' );
*
* var low = 12345678;
*
* var y = setLowWord( PINF, low );
* // returns NaN
*
* y = setLowWord( NINF, low );
* // returns NaN
*
* y = setLowWord( NaN, low );
* // returns NaN
*/
function setLowWord( x, low ) {
	FLOAT64_VIEW[ 0 ] = x;
	UINT32_VIEW[ LOW ] = ( low >>> 0 ); // identity bit shift to ensure integer
	return FLOAT64_VIEW[ 0 ];
}


// EXPORTS //

module.exports = setLowWord;

},{"./low.js":127,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],129:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":131,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],130:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":129,"./main.js":132,"@stdlib/utils/define-nonenumerable-read-only-property":167}],131:[function(require,module,exports){
arguments[4][115][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":48,"dup":115}],132:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":129}],133:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Convert an unsigned 32-bit integer to a signed 32-bit integer.
*
* @module @stdlib/number/uint32/base/to-int32
*
* @example
* var float64ToUint32 = require( '@stdlib/number/float64/base/to-uint32' );
* var uint32ToInt32 = require( '@stdlib/number/uint32/base/to-int32' );
*
* var y = uint32ToInt32( float64ToUint32( 4294967295 ) );
* // returns -1
*
* y = uint32ToInt32( float64ToUint32( 3 ) );
* // returns 3
*/

// MODULES //

var uint32ToInt32 = require( './main.js' );


// EXPORTS //

module.exports = uint32ToInt32;

},{"./main.js":134}],134:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Converts an unsigned 32-bit integer to a signed 32-bit integer.
*
* @param {uinteger32} x - unsigned 32-bit integer
* @returns {integer32} signed 32-bit integer
*
* @example
* var float64ToUint32 = require( '@stdlib/number/float64/base/to-uint32' );
* var y = uint32ToInt32( float64ToUint32( 4294967295 ) );
* // returns -1
*
* @example
* var float64ToUint32 = require( '@stdlib/number/float64/base/to-uint32' );
* var y = uint32ToInt32( float64ToUint32( 3 ) );
* // returns 3
*/
function uint32ToInt32( x ) {
	// NOTE: we could also use typed-arrays to achieve the same end.
	return x|0; // asm type annotation
}


// EXPORTS //

module.exports = uint32ToInt32;

},{}],135:[function(require,module,exports){
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

},{"./main.js":136}],136:[function(require,module,exports){
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

},{}],137:[function(require,module,exports){
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

},{"./main.js":138,"./regexp.js":139,"@stdlib/utils/define-nonenumerable-read-only-property":167}],138:[function(require,module,exports){
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

},{"./main.js":138}],140:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var constantFunction = require( '@stdlib/utils/constant-function' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var pow = require( '@stdlib/math/base/special/pow' );


// MAIN //

/**
* Returns a function for evaluating the moment-generating function (MGF) of a chi-squared distribution with degrees of freedom `k`.
*
* @param {NonNegativeNumber} k - degrees of freedom
* @returns {Function} MGF
*
* @example
* var mgf = factory( 1.0 );
*
* var y = mgf( 0.2 );
* // returns ~1.291
*
* y = mgf( 0.4 );
* // returns ~2.236
*/
function factory( k ) {
	if ( isnan( k ) || k < 0.0 ) {
		return constantFunction( NaN );
	}
	return mgf;

	/**
	* Evaluates the moment-generating function (MGF) for a chi-squared distribution.
	*
	* @private
	* @param {number} t - input value
	* @returns {number} evaluated MGF
	*
	* @example
	* var y = mgf( 0.5 );
	* // returns <number>
	*/
	function mgf( t ) {
		if ( isnan( t ) || t >= 0.5 ) {
			return NaN;
		}
		return pow( 1-(2*t), -k/2 );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/assert/is-nan":85,"@stdlib/math/base/special/pow":97,"@stdlib/utils/constant-function":163}],141:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Moment-generating function (MGF) for a chi-squared distribution.
*
* @module @stdlib/stats/base/dists/chisquare/mgf
*
* @example
* var mgf = require( '@stdlib/stats/base/dists/chisquare/mgf' );
*
* var y = mgf( 0.4, 2 );
* // returns ~5.0
*
* y = mgf( -1.0, 5.0 );
* // returns ~0.0642
*
* y = mgf( 0.0, 10.0 );
* // returns 1.0
*
* @example
* var factory = require( '@stdlib/stats/base/dists/chisquare/mgf' ).factory;
*
* var mgf = factory( 1.0 );
*
* var y = mgf( 0.2 );
* // returns ~1.291
*
* y = mgf( 0.4 );
* // returns ~2.236
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( main, 'factory', factory );


// EXPORTS //

module.exports = main;

},{"./factory.js":140,"./main.js":142,"@stdlib/utils/define-nonenumerable-read-only-property":167}],142:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var pow = require( '@stdlib/math/base/special/pow' );


// MAIN //

/**
* Evaluates the moment-generating function (MGF) for a chi-squared distribution with degrees of freedom `k` at a value `t`.
*
* @param {number} t - input value
* @param {NonNegativeNumber} k - degrees of freedom
* @returns {number} evaluated MGF
*
* @example
* var y = mgf( 0.4, 2 );
* // returns ~5.0
*
* @example
* var y = mgf( -1.0, 5.0 );
* // returns ~0.0642
*
* @example
* var y = mgf( 0.0, 10.0 );
* // returns 1.0
*/
function mgf( t, k ) {
	if (
		isnan( t ) ||
		isnan( k ) ||
		k < 0.0 ||
		t >= 0.5
	) {
		return NaN;
	}
	return pow( 1-(2*t), -k/2 );
}


// EXPORTS //

module.exports = mgf;

},{"@stdlib/math/base/assert/is-nan":85,"@stdlib/math/base/special/pow":97}],143:[function(require,module,exports){
module.exports={"expected":[0.8478406898706115,0.4731834254395613,0.026336146911889097,0.14415679150096572,0.3952010482251956,0.5128356944469874,0.05836724881522913,0.07617894309387054,0.07712200418915548,0.39028955771932794,0.29389653335261,0.06973057983068175,0.3246780561790371,0.025256949304213044,0.10768557292323933,0.13939148190328582,0.02192393078752044,0.2640277006284933,0.9461293910340511,0.8213590791372702,0.5947733177032158,0.41830744963715843,0.361653260618933,0.5899254232355108,0.1408712656797631,0.016441366831513978,0.39133333466524123,0.9832742723330384,0.981949876963067,0.9104579252558641,0.1174819383826794,0.046136731215675936,0.8406912435405718,0.5919318134817123,0.9992864405897902,0.07934454417766267,0.4275183594579944,0.03805402144247331,0.20705917362664591,0.03411242752268226,0.4103146171864861,0.1074403318601178,0.901585812450254,0.1304956739447985,0.16918884411169854,0.1888044656367478,0.04295791280211447,0.031114606063896214,0.9765257358143686,0.0259878498774423,0.010960887188144109,0.3101982214524828,0.5687619627811114,0.14529248034386855,0.02279854809102065,0.3846472867109168,0.53449189037108,0.5340223767243542,0.5311163347253829,0.9360617058145249,0.010416245256071963,0.29864513583829455,0.04180461406371924,0.6421054205612575,0.6294625103338293,0.0557872935936015,0.1324684408490552,0.45117724535054726,0.028351801227923624,0.9503502779472415,0.5092832480565845,0.9935805016723127,0.12111924832891544,0.053153702444625556,0.022959144188276444,0.1455969219420522,0.830868352169464,0.016523679998355866,0.08159979033853672,0.5115416786253263,0.27560055154076535,0.09488753322424932,0.01999223423024411,0.008135699960967963,0.023775406527984738,0.36863521086874534,0.951749612178736,0.7900495262457468,0.00477365552938216,0.09711031585129383,0.46400164764679513,0.6851744023957105,0.23618025735727077,0.7323132866400932,0.2868147402645608,0.1966017900227716,0.9512732535177144,0.7919626651431145,0.6561784862626492,0.41943778221180583,0.09730687707566778,0.5768680346764403,0.017521474652545353,0.30990327442257687,0.011592941984812918,0.00909792482040445,0.034744453802025635,0.7396896416019666,0.12430158265082948,0.002465531158510884,0.19765753533754968,0.810138340544216,0.29184741885544874,0.20118898738677515,0.6412512716636941,0.5351755859512034,0.013048381034195363,0.06964712001055906,0.18710171898823008,0.002940088136950339,0.7426291239504004,0.4084099822512118,0.01966919754775891,0.5149210864680892,0.7096273015442212,0.030488862778521038,0.9042828994719166,0.1783905064459113,0.47920029806596165,0.014364896870036628,0.004902916499968214,0.15288641909336873,0.2671471652623541,0.4166510055224696,0.53352326000935,0.12130906616558292,0.1378181209725528,0.22850142805004,0.02571265258039384,0.03243490233533383,0.14336494382731074,0.1424254590977199,0.22127791869285812,0.01801872586232201,0.26054002999694825,0.6781119077863902,0.15303354494483717,0.45322268180324754,0.2657912281554058,0.05354824553454554,0.7767416080551979,0.5160044842146232,0.35565136324553914,0.40806855880884657,0.3760526810778038,0.5880288765975605,0.005553679203238631,0.02372403530270566,0.20932448025122566,0.40774733234753957,0.4236253287534752,0.24237610672128412,0.005971170613325168,0.022584734817390716,0.6512676703530499,0.022903887812297,0.7274317022361672,0.05976758723814104,0.8437818371400468,0.37387024723974827,0.16128615984792108,0.045916743187598294,0.3789700381108652,0.11315088845682869,0.28796144567726684,0.0610306452569576,0.7781163475301139,0.3329370753782709,0.14943997449470395,0.8833526776519169,0.7011963615028733,0.19826944155795956,0.5421290800522315,0.6000890945726326,0.9420056444685007,0.9501571945697274,0.1540753193069729,0.33745957358258094,0.08806025999245984,0.08075428805329914,0.2960287511964597,0.6774758965933598,0.9831674500615185,0.014243126338360338,0.5076745726000579,0.017237120202566104,0.2495867654352741,0.15836716413124693,0.2343225441703316,0.9926856659464726,0.4332398490493612,0.03081096976707095,0.3186761593791171,0.15173302311771591,0.16145976259960979,0.6480632601010559,0.3642544716154945,0.3587068138095823,0.12013959404181795,0.327648818723811,0.24228723071697975,0.5504451375486769,0.5930995185850543,0.08188052213650272,0.005913791334823863,0.06770517077317348,0.9976783270906205,0.5801105943493625,0.9263687654629527,0.5070567665360041,0.4234980074011357,0.7261529049226756,0.05790180535367764,0.0042525967184075635,0.3412743287655982,0.11104969164796756,0.38645863363359395,0.453812202422065,0.8281026615976383,0.007791503445203387,0.10030111401464444,0.04871776563895676,0.054324945998040476,0.02618243520359269,0.035380036726318384,0.3099911999305569,0.09418658282663489,0.0871886926906281,0.09848384157369655,0.20947659916300876,0.11065273894628462,0.0742984548749825,0.07119756908227709,0.20290773498926434,0.03961534297911816,0.2235731422371363,0.9145632504888856,0.003383761602701292,0.16559152409714706,0.01942693959241041,0.20807071012161482,0.01036263537601717,0.04107023645590022,0.7651747049523272,0.3696405393928027,0.5433301493227235,0.8179718379432408,0.1419535238808811,0.011599355623836436,0.17533303444868387,0.18818294584925443,0.009050188159249756,0.0019072285182193042,0.9437749463245411,0.10456204950326303,0.27231462528213113,0.974940586653447,0.13379291679037364,0.25425387436134705,0.9848271017123424,0.5223597535492289,0.3021329060530911,0.012534699666986053,0.5932838335807143,0.8497122987876536,0.014120027709159221,0.00437447863622383,0.2084272361652622,0.09452824465971574,0.5145577616108326,0.583013327223296,0.3683409818920679,0.01668907395862524,0.15269367497713854,0.10278668165721064,0.11758379552577716,0.06593960879709353,0.03616581425192655,0.16432755535069501,0.739175174003678,0.6937481993903691,0.8832483153903993,0.40712604018913945,0.17621746278425987,0.012837296017217283,0.21109379259899466,0.42468377067477436,0.3754709939301093,0.9401924167396455,0.20290222699115001,0.009319985285697666,0.330062374727975,0.3478009040643283,0.028541259071407726,0.7622081568468532,0.07704840481321314,0.27329489529649026,0.8892746134785781,0.5624644614568305,0.05567324935472168,0.03973085765477731,0.23388483460550719,0.4357912864967028,0.6977833002376652,0.2774425937955328,0.03383133591704244,0.12036435591014502,0.07832668248493453,0.36281365432720625,0.44744758234642834,0.5126279680088192,0.5780113304441865,0.3262865349641945,0.09021897003732557,0.5082684126587645,0.15680920676589177,0.0021674820998752965,0.3884215865977608,0.6759392112950037,0.011278704712902552,0.4541870793542838,0.20945921622349495,0.5180186022294383,0.8192482428451526,0.06411274558847095,0.1752951619131472,0.013149944485868587,0.0018493321954655805,0.04794172047578714,0.9271848549690014,0.33145929569472765,0.18872849061435734,0.4010280099742622,0.023957276218093605,0.3074469519733362,0.8203530353086748,0.36283185698423726,0.6372390275254294,0.3410237352715331,0.31982048583605227,0.7851927426043508,0.4727933480655502,0.3415003894386076,0.38716560255517934,0.5884467085546552,0.5631223415963164,0.1790534875114642,0.004256461608859054,0.2673744149382545,0.07788855960783517,0.4522917199434451,0.171156870428034,0.9617261676917802,0.0974837394011346,0.7132545136681046,0.005929721947017758,0.02906013823110439,0.6625451179180517,0.07580197305817188,0.7671238219825588,0.4829357928942874,0.7966966148450694,0.007145068347191332,0.009127914032489852,0.10403373133080497,0.6427166587416557,0.4442212733789767,0.011535975187868686,0.9371221071878657,0.7265049737699085,0.8860736302550231,0.2507401420431972,0.15321873710785405,0.052877429496771225,0.011783607373916823,0.43635269105106533,0.038356599447992995,0.2858800551325738,0.0031224806077841784,0.12425274892893294,0.9824648778698405,0.0012516420002815025,0.08290997674545883,0.0013353483314933608,0.0025970858780910554,0.008498369023995776,0.04361816825122192,0.2974133875782759,0.3460214117923773,0.0061121057079745,0.763142329483744,0.13436179076472557,0.99612373368504,0.014436786897175643,0.035588469162343934,0.8693932892013129,0.7624598627528054,0.15219345804704648,0.9379421509948105,0.5680767580727994,0.4985841910712885,0.6774582349850835,0.13540292785275568,0.010524663241655921,0.2101031518007658,0.49788677188206926,0.9796918666124306,0.03024058890030576,0.9538724960477094,0.14840854136880122,0.7529022395798182,0.9735671928281603,0.16686149876784961,0.7315872521099639,0.38083795808218535,0.37799346423981867,0.4441234683038561,0.030084161183677592,0.9718722269645069,0.0012548666119739117,0.18315766228542285,0.01858815299672484,0.12596423042775648,0.18262151216480416,0.11136168758121895,0.06625000924858718,0.8945834250958649,0.17594665709887886,0.9473418491252059,0.38947779314303077,0.9860696058347267,0.6448162170488553,0.26104420391584154,0.11608156871271876,0.1762941992430131,0.42960299572794136,0.06243375033841261,0.01259783179202173,0.20313959842478801,0.050588438608535735,0.6530485885788903,0.36012789779086274,0.40554084812870406,0.624877966308196,0.4463774923575271,0.5036193358293685,0.2517310767385882,0.09694252444603883,0.8735397399971501,0.5695195614345689,0.07928501875292958,0.8213222009586436,0.5305627725394745,0.7127296115630495,0.3646146914449319,0.3078885291166398,0.9603842187794718,0.1083282493861851,0.9314607440644684,0.02243572649958656,0.8112129557119583,0.4932395867467477,0.6168581796326781,0.02051145267215205,0.004697129973948835,0.18562634979756468,0.287935445760384,0.8938192528211977,0.15051532758373448,0.7890058174321499,0.16056544865512185,0.6104542647644866,0.11212510562387633,0.19695508109477666,0.12024405061401716,0.1496535558950644,0.7455587767066558,0.9061721354916922,0.29688747659989845,0.01923270669325254,0.9637730265138532,0.16724986272539172,0.40055769444534844,0.22025732021903355,0.10573112539459104,0.3000302044777428,0.01583296863594388,0.19828497662621253,0.16385656340881605,0.09719520826424265,0.9987881300976104,0.007926904055628518,0.29842739998555856,0.004609285997425768,0.10597555674871521,0.011279193614207508,0.5858092554418367,0.17087944120404447,0.1713717952724646,0.2933987167753928,0.17058581088495656,0.05544068210873428,0.18106141105130366,0.014752747819984004,0.13114932656540537,0.6262795723763523,0.0931447409378994,0.48950893364487275,0.15920958221261355,0.0860983037525661,0.0609573160116262,0.4584097556809109,0.017483742589352466,0.9506383512841977,0.7878718758368279,0.06056803426696683,0.36847972629270587,0.012914036983451633,0.7990453398351207,0.014042128621832593,0.009059341809840016,0.7409848650077006,0.06945385409233502,0.5681513527257762,0.7635561660557646,0.15169121374617367,0.07741421713979287,0.6471044522511884,0.7051771734431942,0.0033569376795682393,0.7472743408267258,0.3300103050632258,0.1123216434225989,0.0700393851498793,0.22444143663527166,0.9797721635704373,0.003967644569202997,0.542963821058408,0.009184018153526475,0.7596026040480747,0.09246837412756741,0.4828181215905891,0.026586298286406584,0.02217608819820649,0.05960556730004791,0.7672095102648087,0.6763647668960037,0.7267053847248013,0.07737488525481535,0.006694450698574328,0.5444131893717988,0.954468393407302,0.715676014318388,0.9981043353754848,0.008260010011303592,0.0839351401573813,0.12176818917292041,0.025826879524122992,0.025737759146820225,0.18420182952137754,0.046905609438513386,0.6543780438528882,0.5742491193124291,0.3205565817236881,0.014556170005067379,0.9711973013618702,0.07731873294254538,0.05906879161305438,0.7938079453163618,0.036085429430248665,0.3005066447137905,0.8419064997829016,0.11989471129563459,0.14882003809916539,0.007664998578253566,0.0175047859837679,0.3489452716042297,0.8794376604635352,0.6131445741011928,0.9974284296973043,0.04415117554641091,0.0748767003076578,0.9998628392025667,0.43686116291993854,0.02706953726233082,0.07516529523233101,0.008528890105413451,0.044512190155586454,0.16395902750027697,0.4076147988886445,0.014369115628325218,0.025346184764151295,0.6652465911255406,0.19773392602638337,0.7491792036041607,0.8729072009577947,0.19831863048072895,0.04431767324181454,0.30648807898499175,0.1984538543596268,0.05684101719113337,0.2133360362537352,0.3313327542466407,0.02224178695200873,0.3197521726574556,0.04793865800188517,0.10885218739620958,0.280133313253663,0.5511578740485703,0.580429746956151,0.31176585296960746,0.1711447354925573,0.004534677464631578,0.10202278240112449,0.5956307009914303,0.2705022699253228,0.08158826014856095,0.26040852601142067,0.32430702672342343,0.25735669332212135,0.6877752860219977,0.036382703381613604,0.21884636576168756,0.320294275193531,0.3444593084616776,0.015305234968254994,0.5826365432329657,0.44723385375141955,0.5585299032959024,0.09754982136267559,0.059511669782196276,0.6492560997794121,0.5205251652908806,0.02955981819428911,0.015966023077293647,0.4534041318554781,0.19221407155538656,0.04788569633438233,0.2277791733081342,0.06364404315508482,0.002026568675720088,0.010439380279137704,0.5715029385100184,0.00552030577543468,0.5707508149061606,0.09035239113626789,0.3883751003932617,0.5244584492276527,0.5493904909041974,0.005493465558769738,0.08622367457259765,0.07508832648541786,0.4807422539953165,0.08588185824730166,0.08618976398353226,0.058291841024053624,0.13013616801677763,0.005188765516546252,0.8222123240941055,0.00996130496928103,0.2688761563888873,0.20783957834737615,0.13764446625335444,0.10951522656765311,0.8047283566546055,0.587328538494893,0.389954739313076,0.8029269267152257,0.39021664347166085,0.7815896568817521,0.2644066890902561,0.07643854235371944,0.1506662636896911,0.6982007833390629,0.7939659331856224,0.8110422233623158,0.015414761030958565,0.019315121313582272,0.32015868347083465,0.009681021155871451,0.14582180561335853,0.1130742911124019,0.9189679154288228,0.7448597956357917,0.6939971270167841,0.6392545334985759,0.015639409589550228,0.8605672110984851,0.09444487647930398,0.27898518688673546,0.021311354605776135,0.04114313406441946,0.012594348026778081,0.20841940954115157,0.11746853551939361,0.6956399552262723,0.006825844635759766,0.12985677618489105,0.18005173751116585,0.07528664968217892,0.11141822527522889,0.9496000544789659,0.16135860714237288,0.6344377136073693,0.034055081373446906,0.007973708040027052,0.022265757429586357,0.9289418684961355,0.8057495957285697,0.25095322040527146,0.346132863132676,0.35960910218442677,0.772628238998458,0.7513800275987976,0.26963073784366,0.3381604553912649,0.0024414581955165496,0.8122775719662695,0.4506789991727848,0.011502151905043943,0.8114076461944351,0.21136254613284333,0.886657448547776,0.7838926383319289,0.3092849242011301,0.0310617393355292,0.7979579498233016,0.10419549203560859,0.21495387846584696,0.46882482608114145,0.024132615750896987,0.21212184099943188,0.5892548255604886,0.1465872367370002,0.04476413492050868,0.4929336240860181,0.4824790657967313,0.24541169746667266,0.7213037992265969,0.4163500094251589,0.06869700889126808,0.0474997050304053,0.017165052996453167,0.27620477626492035,0.5189341572293208,0.5030408088125381,0.8267448759687567,0.18415278970089127,0.5333685386886379,0.5387019739972215,0.2359176229120935,0.009260013243075634,0.01411902712521071,0.5955877497125226,0.2889415079771781,0.7187492412342066,0.007189410132933212,0.0973920893334623,0.6937667997096244,0.3076007818378907,0.1953842724207728,0.02061880922057601,0.3774146128508097,0.3580990081973463,0.06819192385978307,0.06352457262779866,0.02927335358987407,0.07867978898441065,0.3665428996676653,0.34204911688288014,0.34824856447948094,0.11907140532740444,0.021193229478448143,0.02956610063727315,0.4470840505403302,0.6033665999814145,0.3093999958931025,0.12470423872525943,0.0027023986643711,0.5559963644181111,0.653585629119885,0.375638030441831,0.22354783643931508,0.4376233443660474,0.011643459134157968,0.5321249786031554,0.1289559056669554,0.16447168077810034,0.8687521664932971,0.23999408688229484,0.3555218930651324,0.23604048689719442,0.07603736253584498,0.08340951971915786,0.8417921183923925,0.4073112392828435,0.4112965466164267,0.07294096611933527,0.7863214864797585,0.004789952344366288,0.21423590365424866,0.39128367401769365,0.0538874798915823,0.23582608491533197,0.007132849640032081,0.5377583007832503,0.5515194901533151,0.02528219128018775,0.399906928746554,0.7036649665468366,0.32677956591161483,0.970906448562859,0.6212691658952358,0.11011280076754791,0.39892262744279355,0.004022432693336426,0.47110469154196577,0.0466301276234151,0.009866037932989503,0.418551445719727,0.1586155536546365,0.0796069425500324,0.9816521186153483,0.627759793087378,0.019366809150247362,0.0029876301404631895,0.29619523848022383,0.01836872007902622,0.4299927590695619,0.02128648754003684,0.013529616699972349,0.9679168098578818,0.2661166614041934,0.5667176412260923,0.175227229863949,0.4996653117914509,0.8819369531639993,0.010728395870516157,0.5830566396806312,0.14825994054290148,0.8143865330271133,0.09708930712212946,0.6186327470182779,0.4161813141950652,0.29581621748554504,0.6221991497362025,0.004701338428389562,0.04350413432056239,0.16979371789318443,0.8138092263174034,0.7520591833636692,0.017630076861387955,0.00877453860075851,0.11850528173009187,0.9819999246159543,0.4364913760414565,0.258547253325648,0.1260201537231098,0.3754215774385443,0.05787339365551886,0.6627371921921916,0.9487211501780243,0.6692458226695174,0.03892291956063317,0.11745967526448066,0.6141078611973358,0.19876267440253959,0.00727174681261002,0.21831758962512632,0.7468985502480601,0.5728949853466833,0.6879714847055891,0.5279921417504679,0.572047140179795,0.024153029625137986,0.9837486850405648,0.09502381174707239,0.03331559039623905,0.6477533761246409,0.021041030849722794,0.9465362550911146,0.21787181747469414,0.5182975734797607,0.04661530472670812,0.04307447761387284,0.016715200161840513,0.21679139988310775,0.7412519671526945,0.010093504798491248,0.2567911887607822,0.0820732789445554,0.11295792871429199,0.2927485086712564,0.9215919748166668,0.01174939737479255,0.3169682080849839,0.385666897329963,0.19524448564062552,0.02970783018893423,0.9008518185220952,0.5938907917975559,0.005410352925176832,0.46162731331488194,0.2078707704199244,0.06955262768038056,0.9221353156491557,0.9632814855410787,0.093440990504641,0.19299097525004408,0.25862665736451196,0.9175071689937964,0.17755273274050812,0.9295534018627091,0.05466182625229195,0.06954118768916429,0.6097131592923098,0.32321136746507506,0.027776297305621808,0.026458478321042242,0.042821106943966354,0.2977119533648834,0.5137379387059439,0.7578907298117823,0.978379065272702,0.011389625526854004,0.013996206502749117,0.21166104309048367,0.5421678914712864,0.05918119249685771,0.08432928302442469,0.005591875472955124,0.6503855075687227,0.9896884510842692,0.8911251861640468,0.4321777585880247,0.6161129898912817,0.18852874036352,0.11247835277100383,0.7098246728611118,0.7401521793379777,0.5754313376048502,0.31235322656802905,0.04844692859774787,0.051923427712065616,0.12426625477520842,0.005686121932465965,0.4388081287062019,0.05464002808480996,0.6749804021127502,0.042252879360653584,0.23074477892747036,0.49911552176971347,0.7643280741228604,0.2064562135123699,0.47057688003884246,0.4824755133166859,0.7709719586207446,0.9719188232339508,0.8020679162162628,0.17409187044560614,0.8585916767220175,0.500479687380775,0.316504402554307,0.07788106973240469,0.2888936480580947,0.17896489820688033,0.014573240418014895,0.10871521678630894,0.12727354191462928,0.002824313406594978,0.4087924467812807,0.04347797077772928,0.4177302964169506,0.4144736671081881,0.08326605035749371,0.06468064418136689,0.026129424780698803,0.8043182320283677,0.6627494343300588,0.8426269600645456,0.1009039848690631,0.4395632016396134,0.04507160260683153,0.3098485469734954,0.8108615806631007,0.9955693336793826,0.0059432918997974,0.05444243791971863,0.004513011085930983,0.8899222825994044,0.015263102016865778,0.3198678142322087,0.21571036085896045,0.20486940194606942,0.754397183642488,0.14789683534594017,0.7309128780173262,0.48461156247226617,0.9130481831907216,0.10027097026504138,0.010893029974877164,0.01796983181721229,0.16551302776807092,0.6713884077976897,0.02172471818039106,0.01605292502048084,0.43809396766610187,0.5960221857586987,0.7524784445899201,0.8472485496085138,0.08137886951975004,0.042283193849423355,0.76488432547392,0.013523869323173985,0.12682259838380244,0.5043141788493132,0.10564126763272627,0.020281558570731436,0.1285740363235581,0.16911867925066693,0.39187497747286726,0.013757712951545462,0.21321531438390692,0.535585672857191,0.14367415795077013,0.12883694921428937,0.020922064936585417,0.11454846138743474,0.25416760908272606,0.06630701281390228,0.014987237445326864,0.26439830718436796,0.32027227415109727,0.19108512782537232,0.34824674251322707,0.2524982743812865,0.9490755777509152,0.9126309022095858,0.016037675788724757,0.51770237629333,0.8065435237620269,0.5798922376780391,0.6210127725731686,0.0545222675305089,0.04718462909581564,0.5957547727691604,0.2665217809207063,0.00397019453139288,0.08394337907755309,0.5170076547294579,0.8788828017361199,0.0848036088818561,0.018180714391864902,0.13914907734910895,0.025348820723342765,0.06749843903288902,0.44561618399664116,0.6719074711090793,0.20297765267697448,0.4975548909689477,0.952751557594678,0.9072175848673902,0.07213060556178962,0.27040887128598196,0.23041891379368226,0.44070391068920517,0.11786680572160656,0.07430833554894486,0.10270911519790824,0.09687279911099983,0.012710272123233363,0.14235636278741962,0.9769883983369626,0.9030479941490369,0.08679313813813125,0.8429131822622233,0.8344926978574788,0.3397294976964965,0.9929877731042619,0.27017251036494366,0.5436990727766299,0.49552225724609217,0.8384882720058561,0.1078226585057191,0.6323358387880642,0.10383102654871125,0.12664509099648327,0.47156859702314247,0.16154752410748766,0.061666822545564166,0.03904582948078365,0.04696971030192617,0.08404463102028983,0.239027179672803,0.02389432323988349,0.07495318061765356,0.08307992779638496,0.007112397666430475,0.01262600667285969,0.6422641879264129,0.7629663240428872,0.48114459222190215,0.2561415879892231,0.9514640596147831,0.6400692590603605,0.25886364266138073,0.6966968908602793,0.9965222379381116,0.0789757003917129,0.5084800364008681,0.2897381555471745,0.005990910800428203,0.9612303531539983,0.012117574295349185,0.1794512770759102,0.6104349062693212,0.05649730945335679,0.08219837622706203,0.8004348503075978,0.7645127113779643,0.4686808362422543,0.7354913802100448,0.03119960203305657,0.05780375550947183,0.0024620195117454773,0.8659413444101188,0.1763766233191436,0.7568607157807119,0.44299511426290394,0.01564758227105715,0.6271861334907105,0.9096914329155313,0.5432139805819478,0.7608330770980688,0.7847353837330309,0.024560783766909528,0.08872151331966491,0.0025675798987130453,0.062426173190199157,0.1111054637177642,0.1948520397962292,0.8983427946463788,0.05573937732238651,0.6412914877328092,0.20662725065550597,0.8269992769561421,0.7520125842543992,0.4517759778320584,0.3210899011399998,0.04108813133944784,0.23211953707589708,0.12695299545619723,0.2991388273261238,0.38993992323523124,0.6012810760812268,0.19463343314383041,0.22355754712228076,0.2826788994572685,0.5653258864828505,0.8142677924600721,0.5360628171384114,0.19270793515517287,0.032756242295821796,0.8242408398508263,0.2837495276761437,0.9952574910703441,0.1270096229629834,0.020487241180360584,0.5919428673478245,0.39751376149804607,0.8644062805888372,0.4619079386279882,0.004022642230773674,0.8119073252355619,0.011429866619806557,0.0928644761319502,0.038203822851220946,0.07379472123062134,0.7080779222819598,0.8387269486675417,0.21699869243478717,0.8885806129361689,0.35921176061707943,0.99226245698783,0.008054286791757383,0.12485615580098776,0.7877361483710527,0.9720401981212853,0.06627002158136865,0.7973708603186203,0.3214564988453602,0.09441411149349313,0.08050195613735747,0.42043448116357823,0.10355515717112906,0.5896925211930281,0.09155482225830419,0.5633535943022866,0.7251496912572111,0.3296332909529896,0.2886690590136488,0.8898559860150363,0.987642694744105,0.3983336527407582,0.11550694733372141,0.009879587813669438,0.11655205990539871,0.0036206092170113727,0.3737797806706854,0.014077256220876438,0.9968758437439255,0.68377589301209,0.3937473271546363,0.7901383357907782,0.9624963959546607,0.0055210703339713205,0.6210443281035894,0.20230985777114857,0.0055154326011113055,0.6462284353842267,0.067791417064926,0.6980408324303852,0.21867275845651368,0.2724013145999265,0.1427450504560997,0.5635890584300325,0.34782621503065003,0.17150901888971773,0.8868582276736698,0.3612106858634464,0.31657387758578204,0.5736655125341843,0.6450561362645757,0.09019592853603678,0.6962765958562023,0.024271585255196494,0.029188037919166455,0.2563282744680143,0.9104104863965183,0.09144763889094946,0.05532747007596471,0.5043358866921137,0.4351448148725347,0.0046086224275506205,0.09570972065831268,0.14252010341743387,0.9551128818414616,0.010348805009099116,0.005827911193530948,0.022386432253786108,0.06923367310050883,0.40772206400010635,0.023469339500858825,0.7772392517731356,0.32527127913666254,0.021296193516428454,0.2914799942063445,0.1683302244923487,0.014137608404699764,0.03666754565280496,0.5750494712870052,0.54081709893777,0.23066140611503194,0.007940881760960706,0.028024674921941613,0.0016904939750798111,0.9787728897742799,0.34310901324612797,0.9361317356223122,0.12914551062884966,0.35765465816544717,0.645225993963618,0.23434731702604258,0.1367158573818743,0.5174267850839959,0.9426035782489743,0.5277241334449382,0.054040373299891864,0.7333265226325785,0.036066700773014285,0.12687907128195625,0.0029196550437478102,0.1315776612675091,0.16731775500784068,0.013782249991442619,0.2946373471392362,0.012318296103934699,0.502168952633027,0.26095938309559896,0.12020027918836737,0.01839906321894474,0.4033072943303586,0.170683662819034,0.4245933425349672,0.5662358241770408,0.03924459384408518,0.00387930425483361,0.059935443457041625,0.3257158504638946,0.05678734281604032,0.30055529372984835,0.26294135143504743,0.7475848836236041,0.6781235812326459,0.7211637074296451,0.012680841749319344,0.33998375071723164,0.23444651759082605,0.3402581397881352,0.00424813842468397,0.17157093695583123,0.23056562546875548,0.8796747690043923,0.8384751834156541,0.328513975026156,0.3191932646778915,0.17411484820404316,0.012767271538732456,0.0019781808149449635,0.18047185078995404,0.04859840844923626,0.2438084167599525,0.964265146923428,0.07134549700973632,0.1289221686352932,0.005698235700905,0.053159961856972436,0.23999911376484862,0.004770796691625416,0.015883050071798376,0.9674224517901306,0.058562008152258774,0.024316079587422594,0.10104849145929815,0.039540807869575346,0.03838209790779332,0.35360920823603514,0.7255796536703363,0.3437078276534732,0.01784710398856127,0.1398059985131313,0.5159085884503949,0.6203470348296238,0.5337582059017656,0.845986531289967,0.22801910612294038,0.13406095070161364,0.3853202211500363,0.004392728780782055,0.4879295208144592,0.3916213960708151,0.9809133502798375,0.004570589737677133,0.8410260573009617,0.014721218347946074,0.3428281026269715,0.4772385461356955,0.01700330583378605,0.646623865624725,0.0016977316042085025,0.41243071922258395,0.6543075413595255,0.024969256551338415,0.28939507782074125,0.06198445042261627,0.04005559114027549,0.5201418572603006,0.025099296627258683,0.6219974780389876,0.5977485097594769,0.27301645623004267,0.04961755920580565,0.9055047552122475,0.013913548526791952,0.8815770841695532,0.2989177234981545,0.0030380658796661836,0.07555315095772161,0.174668777116645,0.005848331046015355,0.03729572004115589,0.620090770286312,0.005525587310875322,0.11034397227532419,0.7841491963843271,0.16151488021286264,0.3591891358315896,0.57278500012744,0.0032593193282068173,0.22374221711846792,0.7359651459733509,0.4609657534845035,0.6085279185760343,0.05043247950635129,0.39361220327998764,0.00981744241826438,0.0031113454675365127,0.4272060977997414,0.03769063213187854,0.5741829108997665,0.006881378937599482,0.5304385406813479,0.8558053089091824,0.8734585076372229,0.938434258328845,0.5635435407291465,0.04280496829525924,0.6346530184866411,0.006893917675537052,0.49946110868189064,0.025927313814611334,0.08069820936283913,0.03489241331333807,0.44491735007592736,0.6027804946826689,0.256746983482347,0.20437632260069744,0.1508344765910051,0.31135320894651985,0.7003372930637747,0.00961577845180964,0.4897448765232993,0.7482336126806318,0.019558050654243382,0.086932617325612,0.20833647504191524,0.013490467867113677,0.8762597619849611,0.9810279711006733,0.4416716134556195,0.6621061455221326,0.3315443413393768,0.03370118915902469,0.3072317029157631,0.9273565682197727,0.2754127684396822,0.07657836512605976,0.007780534315437739,0.46450448332349853,0.07105017214134737,0.3652406512635851,0.8699951363861369,0.773356760122748,0.0872238074653868,0.7963577778943356,0.011353092670661957,0.0196018441767327,0.3263020082928928,0.020782271798874083,0.0034346207327955037,0.01213335656080487,0.05304275135489444,0.09371548813393711,0.07170797250551968,0.05028683457029284,0.06991745182856686,0.034068629156217826,0.7023432803235797,0.10294147518120168,0.3734932183013211,0.004832139416594299,0.006908056433537999,0.9966125100099404,0.4462990707573368,0.4726584774167728,0.39023156110800855,0.01840754765773233,0.881361005485227,0.711621936121286,0.06671452170652965,0.180931636401278,0.9237508852509584,0.8183592585020966,0.11354974115801912,0.06096203496277441,0.7236468433198808,0.002842752330864507,0.011763282732103347,0.30713111123833875,0.5956055622851915,0.5622812905758444,0.023665227852782186,0.04967897421080921,0.8902209427150141,0.04805733611221667,0.5082818718837121,0.1866459325404297,0.00536999215201954,0.7958769842182731,0.6312732892403677,0.22825018025882488,0.3445212867984475,0.028519093076711848,0.5154506183290659,0.2797308288805134,0.7348867952664975,0.10714840547750776,0.8612754113452922,0.007483395115660998,0.7841912380449589,0.6819610254846248,0.83288663964565,0.026948214298939226,0.00990377024531023,0.6237599573346934,0.5968318001326617,0.048261374342867244,0.06167831642156276,0.6967096841607487,0.2476744465398809,0.8647346502102013,0.6684198191614859,0.2020220839499759,0.20320182129506725,0.3146756984954662,0.16821820223365785,0.4997271283958348,0.34639568430137174,0.12441159765123383,0.20252490885747895,0.06199722532926872,0.06888116127337635,0.07697820254047684,0.23701285284579915,0.01641696948747178,0.26784364478597,0.470002477690329,0.0036427689935543957,0.2897570005864582,0.11827361211343541,0.5738939522958281,0.7401711675696836,0.2209998862508837,0.8709680893137292,0.46358192879464477,0.015515603805467721,0.4362641490858463,0.9992148057869952,0.01144358031015606,0.5753363275159709,0.03324561751252035,0.7386734934993129,0.9995433782610245,0.02234264525295375,0.07934794404919852,0.03154367740861529,0.6192000314051642,0.23346925787005604,0.8805708506533707,0.1432359819243039,0.3221490952290117,0.03678261133552797,0.023546434677617724,0.4010775020322685,0.002599359068479172,0.6489304949254989,0.006931216475796299,0.011452971260263487,0.651203719447232,0.037455368440040125,0.5772517899889407,0.006995079615438377,0.18009534421052342,0.2225053662398353,0.40200577527493153,0.04445111143160611,0.018139548351266258,0.0743525601971681,0.01016225707306206,0.4595681479956721,0.3178487109402989,0.03991607184409658,0.37322395014351306,0.03622719197054665,0.8827094704189096,0.13388166793717646,0.4441792710579603,0.8649797401469445,0.20278189365276822,0.08524439893205814,0.612490263887282,0.044375041629916956,0.35632168037157486,0.022538040162446857,0.18126969311860408,0.25803223280585014,0.2115587155303459,0.2544959039216958,0.10551869572376736,0.2664326976135886,0.024052646585938323,0.13516637377052101,0.6614413617065201,0.06401274101295526,0.7430698778154724,0.7407367397303917,0.6435468503693789,0.7948912758505547,0.20446277390231193,0.6430814723195585,0.6645461895476297,0.8319613215518162,0.12421412231156014,0.036527065864218645,0.02315044370964261,0.11247586335352319,0.4237265493423849,0.2508127336135785,0.13784826457130342,0.035644597949445835,0.7729974328661735,0.6616505398406793,0.1417361205056709,0.007815535582946401,0.4992093360124211,0.1664858845155482,0.016266275551052176,0.1290067404404805,0.6871833142932253,0.37326671122834776,0.002104451755237804,0.7610554606543487,0.3215663780359075,0.6878244709814368,0.4013878078555724,0.4051370490125258,0.744729569160626,0.012202536178532675,0.9788058286974078,0.251327988369773,0.9205444610735705,0.7824339735666985,0.9148226365041863,0.7407727292770537,0.9218227797925024,0.004830286320757774,0.06176924379318698,0.14376896655274884,0.7357331531740221,0.2166155796112796,0.04254752160235906,0.5896062513168153,0.004798562429493411,0.006676244291570497,0.10355846846699959,0.45923726295780926,0.032329332129217736,0.219414106172771,0.4747639722817921,0.6381710710893117,0.06708430668167562,0.7544941278501609,0.062165933078496466,0.9931429136021073,0.40750348787495133,0.5318240724096688,0.37812124149208537,0.06189503857887224,0.4057665677875597,0.08946190381280172,0.37886066481947916,0.0030580349551187626,0.02877854108231804,0.07538287290598025,0.07338439319616265,0.3502462838693166,0.5851249805859295,0.06456356479701242,0.11002616418639118,0.4236338781560328,0.1427919353515321,0.7987036551644207,0.2626797754817505,0.013294247899066036,0.025629152795310972,0.26184058568720864,0.9850559961628934,0.18094706441458075,0.8858636202980428,0.9983296552264381,0.05876733149655494,0.02972107647302973,0.042838175947574594,0.5489987774181574,0.032176848900096325,0.8489708046234355,0.35115763934896,0.1603420323973857,0.2853747040574256,0.006695342242013055,0.013747996184513044,0.9740933753964147,0.6352004236829398,0.03413590945333417,0.04824059000872949,0.7274950012689565,0.9120474351066036,0.8088232251801829,0.7100991171687294,0.7487472875482478,0.2487064531719413,0.07559592535653849,0.02310070174293699,0.11592596978872555,0.11744503946569697,0.30087745233316954,0.04580345712799246,0.5532688626904536,0.014413990112403009,0.019371573059759,0.027511023370546676,0.307829508078688,0.01534613826982316,0.10045106862900033,0.5245068323278426,0.43120305141701193,0.12354350293370199,0.7870547289790135,0.23662646739263862,0.03900570146033298,0.012258177822049887,0.007316009293972632,0.24824643110107839,0.2947572339540902,0.10715890964519034,0.9087739287745128,0.7688891668152746,0.192754982008911,0.1395480028711847,0.01684789910150737,0.1793121554153405,0.1421217195691089,0.043960942818038445,0.1189445795003715,0.004022014653951069,0.6395009187296516,0.09234823275322929,0.07353077562991864,0.017155921999952244,0.08071757218428639,0.0647271045318433,0.7094217880730147,0.26161853536870233,0.9507057074848407,0.024124856490486575,0.1446156787975921,0.2954365187228764,0.32529535531014503,0.7379963758221838,0.05277107871241389,0.009293781928751453,0.00646900393841764,0.06360597878830493,0.9088925535134729,0.037288373450336434,0.5409422912071994,0.6151182126903015,0.8448736715573669,0.6138055847555466,0.0044859066157340345,0.8263566492396113,0.08125306536094065,0.16011429669397534,0.02783086400043887,0.024270041752994055,0.07306244750474711,0.4871328557393569,0.8007614682311933,0.06834342475255935,0.0773377736855621,0.02468925016460064,0.03094999325258287,0.7352229074733071,0.5760963680039977,0.4092230476679542,0.756199809586801,0.3190673581233965,0.4882368686152185,0.1517323391732054,0.1401853147610687,0.004154344493929091,0.6370712006553212,0.26088042128305,0.017932384686656623,0.007601228064227122,0.7410493072526091,0.007106839311894593,0.1795034792818041,0.5612475573535394,0.9124150342680736,0.1853863602275407,0.12480538528562776,0.412797235875758,0.787186743419291,0.8135667297160218,0.11809427929800699,0.043753317481107806,0.49444185713243677,0.36801941171516706,0.12476125898127825,0.49698283329986065,0.14013515428376325,0.029819615995346476,0.6521710835029602,0.8301237056958104,0.41372311997607614,0.07557570176028656,0.8183915787898093,0.2601474351626087,0.002796457513401289,0.006516870804721745,0.1771572302537966,0.1572770347472846,0.05183887094001073,0.6224380325121851,0.3925662353876482,0.1537358130328029,0.0087250312013222,0.02374149738753556,0.09512972363728692,0.9662112738533513,0.7197555587601966,0.05604293627107422,0.18774715825033478,0.6155061459163519,0.837064444529986,0.03788985764274557,0.2218198086659003,0.6240059018581776,0.3398348265415301,0.07480680929992818,0.2673689892857873,0.9015590519132762,0.00410007638408669,0.5327136094281307,0.014994463372399531,0.06364026853279145,0.006965304907530371,0.035126357027998226,0.3727989020256064,0.08885801280376829,0.04234125281033987,0.8470508256245961,0.64077970171634,0.8034924603436756,0.25161521740202714,0.47474800494571706,0.17726500504966342,0.01084584629899976,0.129612207005565,0.6076009366113755,0.030769581991434855,0.06185741978516761,0.02628901835348347,0.7413015458077497,0.7607726821098776,0.024636139353962087,0.3640499008035317,0.2199040966707465,0.1119588589349458,0.8175915219823102,0.024883096036132046,0.9820354636949149,0.03672266277255664,0.01562750631604832,0.2363158485804154,0.1759716667734133,0.7140557971598496,0.5688566661006725,0.49639009094307057,0.4610906529790344,0.01861750675039771,0.46249079726020836,0.5645269525161267,0.006560673244133864,0.0689525107361935,0.23133048508347429,0.4999454703429601,0.019945960160893478,0.1780199662768395,0.013325691322087083,0.0012562760618886662,0.003969757969394451,0.17471681226942906,0.3065096099774701,0.38153376380596465,0.0216718705936056,0.030892574868440284,0.2576328610363259,0.7326564703228501,0.44576464540522176,0.7263563694927135,0.9345221940661199,0.08743426659324287,0.5356953465132288,0.14641402038833237,0.3768418503106714,0.06451343844735206,0.38296579987086576,0.17102569320393496,0.16959503108515048,0.6210967668094197,0.00438284002800775,0.07793737712707072,0.0074385310872798725,0.3568847138505261,0.041594247953673655,0.4486219462248948,0.04730576827865367,0.7048496708077422,0.3763635815009056,0.40752336921475646,0.2948617698795424,0.18919817616244744,0.038443084938104125,0.2857925831633661,0.8984839187496887,0.09306287668187288,0.22242716645948082,0.11478354378459424,0.09406125464209239,0.8616426971146268,0.0022429050911172265,0.9382566965335393,0.5074714318208928,0.8573210895019236,0.3572036475200091,0.02172725987463628,0.28082169875486734,0.01826673511098829,0.00598719746022546,0.018460072091137987,0.4802649316039198,0.25576814366858674,0.10959978332235847,0.7523821496955745,0.03519109776227784,0.5924361035385436,0.3812560439865579,0.6134248878157116,0.18471797764473918,0.5845682792041113,0.1930647564135573,0.20160241831817294,0.6297406748884478,0.22118345359191427,0.004070754698995424,0.5749112587928535,0.009274444165572857,0.06594528668842396,0.005072517939995608,0.886792661079881,0.5103590405510101,0.6267254015626899,0.749465668266901,0.5712328760381669,0.17790352169105872,0.08921251837806816,0.1922990719852716,0.7882934479387672,0.05833348525766059,0.9567060806498726,0.14105691154931468,0.4366878154835673,0.052030610523488674,0.009740410879144144,0.07774145359325546,0.238518923195756,0.26768179162648315,0.29737260786002423,0.5799279239671549,0.23806864494803973,0.5833145039973554,0.023679561334413114,0.6502068405058953,0.4083716964348033,0.5671242529017104,0.5973339879341157,0.167050721641719,0.9214891950860116,0.6128600572635804,0.016172810698643333,0.9791576127890732,0.19183361550135397,0.02820751137588342,0.21497980501045405,0.0061865724169497096,0.01493052410682782,0.1041468775800082,0.694643792637399,0.08971644456396106,0.38418241033936146,0.11092603490371031,0.24142941718665376,0.7265039923304593,0.02080835208666777,0.07446352626866033,0.10907857553516857,0.5145237069209223,0.11909695402704909,0.3445384645784197,0.010496723949024653,0.15566764956026202,0.04131458708422102,0.01974885774864267,0.05287247736719149,0.2615358775907386,0.7445119705970945,0.032853522249943375,0.5822068559022752,0.19949002769982788,0.014079998896579099,0.18209014210431496,0.005243736117342673,0.004167822807066936,0.0390390805022128,0.8647656583405542,0.5207902598212583,0.00560434229498211,0.648769042521856,0.004807738039899211,0.5427992323297242,0.2449913074485124,0.2933805371169264,0.1746284739050017,0.06120624477635368,0.4777413864470962,0.5392674230122245,0.7379748749710688,0.036325581237688934,0.17466652037842195,0.10564009807668023,0.22919597972299804,0.18802240776426732,0.15732360124054995,0.5050849156188778,0.38624556887053485,0.15258742764057864,0.31992437101830573,0.8826949013497779,0.4616402555677203,0.15817272026453139,0.8440221210525011,0.29081785304256763,0.4384043645703884,0.9656122552995392,0.5344215466333828,0.03724593497639304,0.5400049376982977,0.9849850701122874,0.23251451125447398,0.22627541788218197,0.8395048758510795,0.49379152077544913,0.00528697759302561,0.9686242023777171,0.40163725733427597,0.17676844707107847,0.02114851099081331,0.12179273447300965,0.04191973337463904,0.029392794445855748,0.009571163697469309,0.13123049549989194,0.3963707347469614,0.005596899578159951,0.44913628040902087,0.9478464996281535,0.9916776228516174,0.184897421597491,0.028758472083559857,0.4034625053368536,0.93695698269227,0.6072209248958822,0.03484271773716354,0.3221220904326652,0.02359561933146518,0.19687542652303858,0.766588261408897,0.6427459475905493,0.013252234864165997,0.10355324663559563,0.07851481746150232,0.9956956650152978,0.08368539537847866,0.8259595085511282,0.5742474601494589,0.060997164345868826,0.6777563073541927,0.7714823462091858,0.24862372629514456,0.3382952765910079,0.38852324996899323,0.5904907645682609,0.00428337863359818,0.08903619867644916,0.5445210439976734,0.988613917789028,0.5151281301663526,0.12558667817506008,0.03300971337512076,0.0504033664248701,0.019929096064701314,0.2685538794169524,0.4651296731365631,0.0747566003112585,0.006581017934231443,0.24545344480199943,0.002295275678534936,0.5476316453575241,0.006805756702369176,0.3181001952953233,0.027639159196648593,0.003514884603241471,0.2977954529409626,0.78421111915145,0.28469585967747324,0.06770265566115959,0.1320707046873526,0.6131624776159099,0.03140142374416954,0.5299027546683567,0.3277621438224214,0.22428406073155963,0.6768900786921361,0.24537520718867697,0.1365865483363308,0.8931935073844839,0.7384523573012227,0.0062205351207862926,0.016423134216111513,0.7437987244343427,0.0388321976386839,0.010588220794168398,0.08507311689232636,0.36178762279423665,0.661469478278345,0.7222214241121233,0.16586862855069484,0.7626232146490595,0.20074419344353778,0.4961228083082245,0.21888325243433035,0.4585542496566593,0.03637940986864009,0.015665087443142465,0.05619025539047578,0.3492363430775912,0.5603108327676202,0.05134842328437426,0.7596113615627055,0.6216231901948432,0.12897934189689864,0.5977463415503473,0.015593262795874148,0.7492456204614808,0.4494667484314105,0.16503092040445497,0.9529329441724316,0.8248388763119182,0.4647828436364576,0.4814628901786347,0.0038647231221895567,0.05897734498619235,0.5923704831941619,0.19612152828689042,0.07318814332123288,0.7529439403142801,0.29807939009083934,0.07422058456195157,0.6861967384197876,0.099451445275042,0.007198164063854401,0.05634699861640483,0.02527532365068117,0.13128273710150934,0.7584009022073717,0.030428389964031903,0.052799082114785276,0.9653006345544888,0.8685377994323145,0.22855147637389228,0.008592392299983183,0.34923955235888865,0.22546107916385486,0.12158633144202062,0.5966689222393973,0.7178825363389807,0.6060153109076949,0.8112949883369736,0.09997342892375602,0.3225012973495786,0.3717163834212386,0.3120591001734944,0.09927085458779965,0.0058042328164212035,0.420166299800473,0.7274386577862665,0.013667616438220929,0.8840359897779502,0.6120462119152736,0.15551727747648814,0.408504657015338,0.4344406488006934,0.7293299169655838,0.047967241932700966,0.18484533070229703,0.03125659281524885,0.9373770561632886,0.021172585671091104,0.4443909290534918,0.6069355304577321,0.01565726570511837,0.6114110247049382,0.9952979500679839,0.20325083516611428,0.6456272486333264,0.022204666717847,0.45482274049115534,0.2588824068278093,0.1828870295845433,0.004648824326174047,0.14002264602653258,0.0066387150176706435,0.14213838200894474,0.14696257574196106,0.8428230334278874,0.4813839143168735,0.15817567274785224,0.1096861838002893,0.06816294161687951,0.05011582909658574,0.21943715989325627,0.7182255073526136,0.31375240099569757,0.03570887908470522,0.41436726982432665,0.34551730697616134,0.43631803434703187,0.14431689211706789,0.9180787807693279,0.590471968119137,0.026113096317062517,0.008555688968297748,0.20818267804310542,0.4662581739381822,0.7042505412821533,0.2092014860167061,0.019909553788291477,0.09385826951845608,0.37486914393099946,0.03673496271808717,0.20918323325048688,0.09410550834020484,0.9725970853939853,0.37891859396763566,0.9091080291129416,0.0041416456567105984,0.20710804573084796,0.11797158730040956,0.2208427239404128,0.05970133030011481,0.12750747858604045,0.3900591144607162,0.0030128732057049822,0.5751202288805245,0.1137722549713864,0.23285709452263367,0.01239637180324727,0.5710762073557573,0.008322106322345034,0.014363021868992503,0.18207292593047752,0.004365306042600505,0.4530224083075415,0.6381208724826443,0.00980769818106338,0.31578453340762697,0.6427507614944077,0.3578541261624821,0.009477257708393905,0.12607106704351936,0.11765287176071994,0.9429856193365068,0.631387825564719,0.5105005525152488,0.2010641156667212,0.5904084660534833,0.05730733309062778,0.7941877670584274,0.053292384332227036,0.9378273989547415,0.020215483065246613,0.7569451028226906,0.3931562654473928,0.5324254386807051,0.02611131425717811,0.0278713756725838,0.0971771309048774,0.1495785077487747,0.38398790838612895,0.5614395164319779,0.21764961376902067,0.004922484409027913,0.1565166166007317,0.6298274864835198,0.5846580001763824,0.8364007746845135,0.9826296919586557,0.016722691535994202,0.10187747531595298,0.9183662849513042,0.8157709605638445,0.003159682554899828,0.10517235840493787,0.505209093356116,0.8313176708598926,0.05506099016362955,0.04579424636835873,0.4132630813810415,0.04486752036514937,0.04644247709978065,0.3368742691204793,0.29057595757588794,0.009113914052166295,0.3665681892691736,0.20860236879233895,0.22968900710494514,0.8295172203386105,0.10975577295481849,0.12744067947685622,0.036777124309686056,0.044425464991576055,0.5287061321883486,0.9643396715129056,0.892405648673406,0.014599993018096478,0.15369490164308333,0.587166010207022,0.8766365511933983,0.8464371896011507,0.9174234864808692,0.011181954453173784,0.0486311585591552,0.37533279412725434,0.00971276970328432,0.017205522658993173,0.08974437434430554,0.02248845548384302,0.08280190190149807,0.4998862438284903,0.016438059584123976,0.31220971351716265,0.859105439456459,0.04375871552393137,0.04642577153305877,0.7018506510577758,0.04655355831708212,0.6099510926549713,0.8316453101985639,0.03578056154032463,0.005890318324859744,0.4113489491530585,0.05461678413580712,0.07006371564808578,0.8563942767003223,0.6464919554993456,0.6254874166146542,0.7040839579261765,0.11090818602464549,0.8328206546507808,0.05279170780495425,0.11806150512478059,0.7575826308437794,0.5084296842621554,0.7896053601417344,0.8997416366248384,0.27173572535881574,0.06736862581332613,0.030258287523438798,0.4870567480222212,0.03170358571384791,0.14586733669034563,0.13083819077075698,0.013730594263879563,0.8738851541521677,0.8501003883228169,0.5069696375351587,0.841995233352546,0.00580513495877227,0.07518079186171578,0.021251405776354804,0.4578146354713477,0.3529323977501292,0.00955594360903871,0.8735924712538179,0.33196520424586673,0.1356891794822308,0.028266362917076206,0.4361734635529037,0.4916710964960764,0.3650972589721563,0.09804607955003652,0.034551617476592696,0.024874735410803282,0.10688203768736163,0.09753896073363257,0.0015290308460743894,0.02729086134136696,0.06355179273454589,0.5686668560476389,0.6360997286415213,0.18026969675669324,0.2195545604408239,0.46267602445496203,0.11532326561835775,0.05902348980661094,0.009598410120905135,0.44201759250669836,0.02228153901900619,0.5109539165478298,0.9628600380216626,0.9479633490006967,0.18153513966641616,0.21419218524390216,0.8443596932717682,0.9727508045119505,0.41281335367034344,0.9127426531037062,0.022256951937953393,0.30131119609869267,0.9008451474562909,0.0999794333916462,0.21456670466004685,0.25384965121682584,0.08078446485900444,0.27561233802860674,0.011997832839274039,0.056148895187656936,0.11650804008553059,0.37183327491461726,0.06729745945372448,0.7950930194676529,0.18224932775634844,0.9913830012650223,0.0018166538367132292,0.03916996850309758,0.9279845301473242,0.35375761770452985,0.07134431767280028,0.3574336303380461,0.5095583789391239,0.4964191818180597,0.02345534761290248,0.006765704438969724,0.3246517448053314,0.6343576816466991,0.9154224719191402,0.3210544488138114,0.9083841018867733,0.607178954547959,0.703147564759801,0.026118281635305086,0.03662514764722645,0.04538835660050988,0.08130148306912668,0.006584579468714525,0.6351574686242458,0.5577180147522165,0.26117413184332205,0.04968612132567767,0.04682811080644308,0.054811329620832724,0.08326711087180365,0.1633875443525211,0.15860885636051328,0.04869204973660921,0.8302111811031752,0.09187380233037176,0.04487075014974959,0.9842447241214315,0.07549572187158557,0.8686564264911915,0.4662508429468814,0.10439987102397352,0.01466490404455317,0.023108780594371423,0.1657722960098316,0.059942497108000814,0.009910878334179016,0.3950479800290414,0.967315138159648,0.5281904097433947,0.6665981456778056,0.04828566437834769,0.06956006372638412,0.036869463588781716,0.008102921230792596,0.07035236421322857,0.005859537093754707,0.18253373126090827,0.06756518002098072,0.24769177485209617,0.9011001618992319,0.07838361250320525,0.3502165902254045,0.2545133017855951,0.33848659842926454,0.5534464073298755,0.0032987142340751984,0.3279720907978536,0.017403916008577748,0.8294543562691226,0.26533530606978545,0.6042959067181431,0.030338737908330964,0.03167993508884602,0.0657114546620743,0.9283034678904686,0.037104752659096976,0.08384246736501319,0.02914342629784228,0.06337776316159766,0.13199761572846483,0.547757383373079,0.043908685180139684,0.007999311526984233,0.010692601013011598,0.009297398085584352,0.47409230348480597,0.16184270447541338,0.168822018535203,0.5618077766882764,0.6274982590724216,0.05096649439686829,0.09851570773157818,0.8899820143390277,0.9023564989253096,0.4512371282172193,0.06722272790266999,0.22237643363208442,0.001922522431326853,0.493164984457486,0.06528959069221266,0.03717292716867857,0.310055654530136,0.6039482060968068,0.28754736249322976,0.11760037893856032,0.13141315937535297,0.04383203507259558,0.04504220427451473,0.00172167789953016,0.1950375801363974,0.6397951091180467,0.20344103177454115,0.35100831915254355,0.013871374937566988,0.8383357791632007,0.011618255945386687,0.17638025865732732,0.5072564715855413,0.7758222326212003,0.4250631992010013,0.01261379498143118,0.5067697238075007,0.2050768212283069,0.532432349127317,0.42564512356313583,0.8570705345638869,0.011569305091067458,0.0035538465272136784,0.5496069415023791,0.054254932968580284,0.798621731911317,0.2663567438442938,0.37980407279226414,0.09635796075715561,0.025986005930628577,0.038067170057024445,0.07897121194672033,0.19149281641151858,0.5380871582193534,0.004053169246123775,0.004978553151628734,0.17105526748434596,0.7331697802446089,0.9935238454603151,0.873316064959977,0.36861144093097503,0.009248526986412866,0.9186786809491168,0.23356005976639715,0.02920531581878133,0.020757662905444545,0.004221220207056982,0.035094283238960675,0.08422027400706976,0.5806700846876138,0.6314434292960824,0.02296218412163534,0.008744048681216652,0.22212002788278637,0.39422628241419955,0.601276580848346,0.3924451557277362,0.008065522185593385,0.8075709177337017,0.16092903110003373,0.0641850984619976,0.09656053286402674,0.06299880117990275,0.8591272487270482,0.2526358250638307,0.46799358319430834,0.17183918539209825,0.720826603385011,0.2350253535660612,0.05866154973062307,0.01064435873164233,0.7834229437792171,0.7903414809090212,0.5955714080154467,0.08622496611956941,0.1548562733652869,0.8688906066877786,0.8633634125075277,0.7745222898796333,0.9784210941950109,0.49260644011771965,0.06117238934366534,0.6230929954707858,0.09272115444652698,0.9104314783088209,0.7619041655568072,0.09486956826991987,0.3203229026238802,0.1784489806221522,0.29240302928453865,0.028960095795871242,0.9573668001751146,0.1729809825318863,0.7739347338504181,0.11786466369940461,0.58815457488715,0.43832590675808203,0.1709447157962889,0.38832933799799907,0.04285870042190741,0.24222691219025347,0.8673512854952872,0.027456451729492945,0.9947421764774815,0.003526371056110318,0.3346733630385661,0.0487188393657339,0.011267271422335811,0.3707259110934673,0.6874333280358927,0.6047397019253176,0.439875656234316,0.17009953835630945,0.8853318380632133,0.18358966264249205,0.2420310757611294,0.07018554241703788,0.05025797041169835,0.6056171506087769,0.017490787838620573,0.07681059170753081,0.3641331024775278,0.005202858464101628,0.0034936629828280236,0.4974752787407072,0.42767884956967006,0.4128794656555418,0.055411053046296385,0.002492829898967545,0.04206724744557605,0.020901270974776433,0.646969015763323,0.13436383688940945,0.10976494117044583,0.369078193609543,0.7031686567258186,0.4105090734388852,0.1172607074528869,0.33033332986148456,0.4200187073398268,0.18662792601619865,0.4408045648617327,0.12663416406831154,0.17444968495676305,0.8792492597346051,0.029485314084745723,0.09759721539663321,0.5593440003470134,0.167832054900144,0.03238246520928054,0.008626094712924583,0.012629546194494329,0.4308658380932371,0.25150328233062835,0.8081510433151716,0.8026830574894157,0.00940559081549638,0.14160053808485762,0.1569179984244631,0.11793700278128587,0.06874160592829029,0.0033360159823345734,0.13326203367317524,0.20611071561616084,0.2604963738965161,0.1061255989925615,0.05557172578410133,0.9098066529900748,0.15243586786402186,0.5552030080416364,0.008083473469778548,0.794134145597318,0.17403209014326904,0.08504906883698163,0.5690076943434222,0.004130543058094601,0.01639725520260672,0.8179433695701785,0.0053196297836326555,0.6529932877860668,0.04060070493433629,0.07311748997586887,0.08401617332273878,0.9723822098770741,0.8370233267228201,0.31937885096577745,0.04552335895084064,0.05318669672167872,0.004257125434129864,0.9795794583025197,0.7991708362621688,0.976649067970226,0.48991362668922406,0.016401400065625966,0.4120521301534624,0.007775374804897068,0.5710525120213353,0.5794505517727652,0.7216716741149884,0.2357037103093594,0.797675413560912,0.019239465397250053,0.5616690596478732,0.2074396043771267,0.6293324924325758,0.04111269567312539,0.014166296602282781,0.2829200065240303,0.08783029870131916,0.45793488257764986,0.8436587604616183,0.9107357896480694,0.06389430543582507,0.0027816936577063998,0.4212291316976834,0.07806705894966998,0.06817013945201286,0.9172788949692398,0.204157468208768,0.12668828525914447,0.18566648125075272,0.0708770601755902,0.011636389719412159,0.48734776382397155,0.44010345479118446,0.05000693272915067,0.7682828065324515,0.6449502046553729,0.18274011483909225,0.13609264977337354,0.37185106899011,0.011715616409734623,0.03452533918800827,0.08877404095792864,0.006155868990142005,0.05077875360645434,0.40913309332806796,0.006755952508405314,0.06303308289794264,0.7175557922421145,0.7915728869501283,0.004896280963102825,0.20428032450112435,0.21392864335209527,0.14178718868505158,0.2812920715997328,0.25018702331235515,0.5421335411005883,0.4088213883480889,0.04735120707360417,0.08290201186957658,0.0017932973759250362,0.092443986903995,0.03062782187552885,0.01712065102094023,0.04331521917008479,0.5175771783362001,0.6550213675806982,0.04172593120196395,0.9787194630614308,0.03425652846394351,0.1696689680276711,0.6243316545142316,0.13865413536928858,0.6095507852933683,0.10567447432085983,0.19061596252123275,0.36833267924801294,0.7873174191316538,0.0941928430926484,0.035288976223590195,0.5206691676840901,0.0032849052214447842,0.0069588182170082155,0.041393274635644906,0.7377021088595646,0.5485976288159226,0.45520387707955284,0.6043179828155214,0.7450365752770662,0.26809615042966506,0.11255037921727094,0.0281043050177692,0.004970715363277726,0.6951083417107426,0.01455849409035548,0.7394959285974924,0.053945778510242424,0.06107495238309721,0.0747163631610193,0.7419359754671906,0.08960337887329506,0.018021333243044335,0.02896771893329787,0.0371204283422364,0.014259770510499122,0.12961904798734403,0.3948214738029361,0.1575319869682976,0.2746101430759303,0.2563924740454957,0.013745073751601382,0.12515645025423006,0.00273640104443767,0.16890261386722627,0.15595997149115792,0.14590786030717592,0.2816631941103146,0.18718370405693063,0.051847486551850855,0.0029092914341087807,0.8001905072262592,0.18277888324861427,0.05069473510099388,0.75633984713257,0.6953489739022363,0.003994255331989489,0.5861491823581568,0.28261216603973227,0.7877828917474807,0.6569861475839864,0.37469255085376885,0.8286850655053816,0.009061738029559594,0.2459288997877583,0.41041526345025237,0.8777271453327047,0.8113582468839307,0.7250938655819393,0.9801374028868599,0.8716398144403419,0.03412947553249604,0.5988800208014139,0.00828938488685001,0.37596824834327386,0.03105985794316323,0.2049512634059949,0.9411704684029744,0.6182593269942075,0.5869411124064828,0.5379255261118522,0.07570003154838534,0.010552701532065806,0.586608121629737,0.1169467454075668,0.9843817631337457,0.2758845134482748,0.0053833805592552455,0.7010885598922961,0.19566406799556327,0.2923655282918997,0.03627435722758614,0.23719868584249998,0.003185529447860537,0.053997919123841887,0.069915253457869,0.019696204901893083,0.12639885557440364,0.4835830806706617,0.005623880731984799,0.4309518447684515,0.1521156359147141,0.6680328145515924,0.5757553117523336,0.6044946018971229,0.03407074115755285,0.665729242790827,0.5652356575073015,0.2863776187415346,0.3104264813827039,0.027619666586629673,0.024116184512814824,0.5989028494894957,0.02700886840122267,0.4075620497720794,0.014701662787394007,0.1162225282069157,0.17002719290385987,0.962207520914876,0.28176108067597616,0.027446761213681885,0.06298284067342999,0.5876483752677715,0.18534448434149609,0.739830206575711,0.040408990813776094,0.09927688953591995,0.539540639214288,0.26382330883781746,0.06620135202077727,0.006320162493417722,0.05393364995238731,0.0016192437813578112,0.09195274829179328,0.10124843474141829,0.5289681997958069,0.5548808022416291,0.4982997543142723,0.22045403474318975,0.599968623075723,0.7877856075615393,0.0974635242529073,0.002277474344331065,0.016082987215664996,0.0041055595872295765,0.010594619019236423,0.24009971501898691,0.0020534366988677138,0.032978939478312604,0.014550049559590326,0.6397189963855544,0.5268733863603243,0.016370560137453586,0.7537196818974888,0.03541164499554694,0.3891508529539304,0.005842924910680227,0.223837926670836,0.05650262590945924,0.06455507176375083,0.037332336970507224,0.2660846375306572,0.490908827923798,0.04558323092603501,0.5170558732672808,0.442587484253258,0.012155344452603488,0.003370721979826086,0.06247703780423126,0.04453043243447573,0.0024842479982790035,0.20560584884496208,0.49298928912386036,0.079305562406611,0.3372914769812077,0.14792408890846623,0.048866356708360176,0.035187938190908985,0.04045963581292778,0.011518695984838886,0.013277049984810161,0.40426769346652297,0.0365441986891188,0.12827304874535259,0.009492296117391535,0.7548753655095822,0.8172529548938803,0.9368474144797154,0.9212966970467493,0.018573360793109287,0.07929710455182848,0.010840732870820465,0.004215191281475039,0.004570583681906488,0.45226080673001356,0.5329140166678399,0.08544780796553351,0.5651907738154662,0.9485100021008132,0.01623092932430787,0.2878079250808565,0.605120766361073,0.3542766984167586,0.06867845400591323,0.15307420582363432,0.205257466437415,0.611988880755361,0.0948568324274347,0.7431272868959513,0.030264432951744826,0.04152685487525262,0.1982898044548897,0.3146053544642028,0.020448866778813454,0.18097909559960457,0.03033744351694212,0.08260058797129474,0.45264981695173245,0.7576874813154999,0.2761125343012692,0.7376837358494938,0.04360406419460705,0.008444558461603318,0.5482909471815407,0.12498848024144668,0.2459618042145908,0.02787518475814571,0.7469909924099544,0.014389935337697949,0.9684614143493737,0.43962301390362724,0.09276425525904283,0.14985545365388436,0.4305019701952512,0.17950045247176688,0.4383092683895841,0.022136205679072242,0.006797760564449558,0.026872868406281145,0.32574598846846425,0.7791012723957362,0.1451031012963169,0.04554570718467596,0.2918727918454488,0.7096349057669102,0.24196148782642024,0.05188711861265829,0.22188867476871996,0.9225966187176763,0.979293680428285,0.304655056679528,0.21395010809216386,0.00579525120946038,0.3000348091599417,0.7954203045255073,0.78688641042918,0.13837587018357833,0.050800998526789994,0.039220331428388336,0.8767846712694854,0.06754812590432539,0.43445868162796164,0.26511372502855196,0.2725375215420553,0.7580608130933811,0.6490040453943189,0.5030489692842404,0.19256602704018716,0.6201783855977488,0.0327464295637697,0.015257112842156768,0.48026964100415886,0.12945209960881676,0.22066675683037495,0.003570947645819593,0.005270764636364151,0.06097190931289716,0.5571261048372395,0.008177037761403685,0.8565463168526541,0.18117863616755708,0.9590548636110678,0.019513438575360403,0.34189292899629115,0.017325813446636498,0.7100368512424362,0.16881903048743196,0.29012916770328706,0.4662773224643761,0.33727101907553825,0.13037017219916128,0.13000147882511856,0.24146174661038947,0.5752404318232446,0.15439518912647543,0.07618791853527362,0.1959626646605317,0.062187997176503064,0.39175838981137645,0.560396733848785,0.03920042021787211,0.9323062386201161,0.16155383145277336,0.02565237236554465,0.532017012136758,0.36924487013592366,0.4796072771546046,0.0677470630408179,0.11929232505890869,0.07614063574183932,0.9430160834165549,0.7363487947147463,0.01525807297472253,0.019972267213477793,0.4573843628835422,0.2182610434873683,0.3981563521210083,0.011308842830553684,0.1757504241578784,0.990862702188363,0.5909653594580007,0.19654142190882912,0.28493171751753055,0.9345226231119121,0.2805893904231627,0.6399240289659515,0.0060055995578730485,0.035746505918140534,0.0256597383078477,0.5318424226725308,0.5794327624374168,0.045089730665501274,0.3702385667772169,0.9093759164918419,0.0033896642177738295,0.46963543994701373,0.07187397799892059,0.7861673963692561,0.17161955550257416,0.9124594719698711,0.8575138276292257,0.9582513561428592,0.18791781237234076,0.12871307369755963,0.5430400972916063,0.015808629347918688,0.019909733647663016,0.11185324464909527,0.8884440901991006,0.023909035890534724,0.3815680777763191,0.024282179788267824,0.1936459564351702,0.02200952929747892,0.03993868731657947,0.002489472699155352,0.6438311650738764,0.3026974173649777,0.004712842404883356,0.007192919651903797,0.02106362179558484,0.0038895284177279388,0.36928805520305463,0.35869827635260676,0.8041456310088941,0.0010540672189041454,0.326845615491169,0.007658114085900258,0.2480706759667144,0.1543867960929229,0.002102326839713713,0.035751575253295996,0.2511897738742663,0.035627349805608104,0.031988092717822374,0.5465337384038688,0.5420930892808409,0.09440675359347575,0.31518504340946735,0.02107147317970589,0.027717215877747427,0.04067360883245191,0.3425022843414943,0.41574231933208616,0.5785009687597995,0.1579225926036445,0.2838782965556318,0.013225999313192552,0.06552374390809708,0.5734306144816925,0.030839828346777447,0.15124030412814954,0.7027567675280518,0.11806693081143632,0.020691863964610816,0.032350417391668336,0.31757298946824847,0.8298161474875756,0.7454894133354879,0.6871913235742249,0.7172638892925828,0.920996691104557,0.8755026861399423,0.03543701998218319,0.448604334188014,0.6838192313749056,0.24150593194203063,0.5510617564506894,0.3182133552739771,0.04769935797036593,0.23537894287485406,0.4385635376694156,0.37425805825585473,0.45243826485038463,0.06494692470134832,0.36563531382808034,0.2813631751383564,0.06500623714441583,0.026927767076872597,0.31419725248225344,0.5740922927034954,0.42277158588817954,0.6751713072603099,0.9313955803087139,0.09779597661568686,0.5234116785879244,0.566247315389705,0.033973205198974996,0.33902307041023383,0.4395464145175759,0.27947163120679114,0.0934382394120177,0.8709541856172406,0.06805675660009898,0.004404881266699657,0.12792521071866442,0.6398427508531043,0.07040335987134244,0.002090424615205428,0.02554636484356296,0.3549387637260679,0.1484792580369346,0.03806764419955259,0.828935592483862,0.4076646019942253,0.28119665266857136,0.31968883338847187,0.42938120771528565,0.315857203633237,0.0889590849975131,0.0028512346331196507,0.08573767459445825,0.19481524354704904,0.013313104801323224,0.128579147401423,0.04201217727788124,0.5351275850735072,0.928178113770994,0.1275562812472488,0.2210174103616261,0.8065602759877532,0.8310928653377114,0.5739834271442968,0.16637212182705774,0.6325361556857252,0.4518810141926892,0.7401861313835316,0.5503355657163627,0.25433636756340006,0.20264907908974616,0.9444226921620057,0.07590850077599647,0.9841974921061567,0.0034227202276695783,0.007029266829391368,0.09055386006978813,0.005664747968219525,0.46938047926392623,0.7676109516890482,0.42015593551229186,0.15760032211786879,0.9531129790932347,0.004219836838155621,0.776451950901436,0.9059089776816526,0.7585355884088296,0.02484364209066206,0.979059292725375,0.09431361890309606,0.02838885804295084,0.5504355921943636,0.7995423608987011,0.23343593330138815,0.38747421502743423,0.8131735561918616,0.13816566074782777,0.14879850743981657,0.1815463230140944,0.019940008749607885,0.3586434614267951,0.01114490497942628,0.5364425349343228,0.9856041269397737,0.19534944748591868,0.17181990961347007,0.42459919284121794,0.00525360019307284,0.002390926800430522,0.10373594868988699,0.4878538940946025,0.3250731849891306,0.6582853104633009,0.2489506859552173,0.12868414605902037,0.2546203430714122,0.00721117065678423,0.018817390869048684,0.9573568954638298,0.1093332037397812,0.4249234939410955,0.5303504281254051,0.5999525976727927,0.04812808162188591,0.20388868048353778,0.8069518858786455,0.6784794051007035,0.02673777455191199,0.10910473193030217,0.9409219295395432,0.21262566739150127,0.23046996372880457,0.22568204131848235,0.028647684441051185,0.042744855551846594,0.3541305862805063,0.5795820064754361,0.03442816130878455,0.20816158586835765,0.6121478311763278,0.5142153906950048,0.10395023957571936,0.6811050489278487,0.007446106853002149,0.17610976660869673,0.08626859474869075,0.4616440736760658,0.6476825167732363,0.16302696661169397,0.30906888261083926,0.04789350904838359,0.2787444107578868,0.1505153946378458,0.005999738774401447,0.17166417966331718,0.5209552846311263,0.9500743599908029,0.9245925479576643,0.01930126144294686,0.36716299338849645,0.16558280537952902,0.9349225874543293,0.49128604545245874,0.07656015816060635,0.09865771470917602,0.30472439775830595,0.7848347367035781,0.5138312437747565,0.038251859741706244,0.5046971598592299,0.34155676507751004,0.2093903110192766,0.42591170223330943,0.06933815782846571,0.9224261343775191,0.01801102185491453,0.10838266604235829,0.7658391031274905,0.017135264045180416,0.0507584404911766,0.07600994883181977,0.8709909080291498,0.0885083142854323,0.9998956737889272,0.2623042297031463,0.14161137040936977,0.04026835271335695,0.8890523316602483,0.05419078943290665,0.487514563705205,0.01171726847243591,0.9139455033149033,0.6354119385506518,0.13959485476021724,0.05150544460795585,0.7904946089382487,0.018545690142747956,0.41865337458635243,0.46703621826910835,0.35121985848771337,0.0018609472293628939,0.018770623592734702,0.692067601983243,0.02795535927325877,0.12812424918706486,0.01983798492435948,0.13457508858345935,0.03997150847663812,0.7055333221746172,0.014225123516012359,0.07914920707640885,0.13779130024845845,0.0287577753531503,0.008541663056506301,0.027212792579624424,0.002476350921714894,0.13954536071919604,0.7827890958683593,0.12766962702800858,0.09610942846056833,0.09341343743513078,0.007923889683948393,0.15942173333288506,0.30370335641610324,0.15233588491598685,0.016505790083735795,0.0076903537326494555,0.033083379066710654,0.002991735395271897,0.037479903084468295,0.47573382029319444,0.48132990377083673,0.21943889850662712,0.1968810056266937,0.06400302602026695,0.22686196748792054,0.37081973698016607,0.1661001585363246,0.67667875359626,0.5467644271371789,0.406534590631109,0.040959477773586356,0.06656469384445872,0.034058928513868984,0.19893944208798972,0.8625900749436426,0.5042237892899966,0.2731111803363309,0.06619025002420811,0.2167421186245939,0.012500015330217544,0.16882327131265257,0.7179809549240672,0.29662442598731775,0.17612650807761,0.5399478534821112,0.43446145514818985,0.16951099340153894,0.11052046988178482,0.969874682567476,0.005411904698543751,0.8682113079954623,0.2709842697664712,0.14299064933378455,0.5706509871044584,0.2659842654918648,0.15999613011611746,0.3155515989848934,0.009423048371746508,0.0160413331814364,0.07947812636787258,0.0741233703964349,0.10645061443473673,0.7126425776436076,0.0983088179709287,0.6534962888690964,0.2671698471876112,0.1750474529152039,0.7122237176750541,0.9276298170527754,0.5678775593761372,0.0031588106138925823,0.04074043390012667,0.019418047119742467,0.0038900388085358925,0.0037720269280910575,0.14662145015714778,0.9169486852817915,0.014283430504780599,0.003517188920343682,0.43082629351395113,0.37802926996200514,0.0420142150652284,0.8263035099750041,0.39018784714280597,0.47374477669143683,0.052957388935693725,0.0229603465768086,0.4639886723105939,0.06081607959126182,0.013254378696909985,0.07760359305462672,0.07962333930363448,0.2556433568112302,0.14520246991250485,0.019818109651695576,0.04035512126481045,0.9489136084586458,0.9695074028670804,0.24746002559896396,0.8009007140881358,0.026190329807066953,0.00507743191196279,0.05404528868213983,0.5840205544148775,0.0030620648248260223,0.013778886792066854,0.7069321527747261,0.21726493518872714,0.7557173416175559,0.004668667921913883,0.16077422542275102,0.025781295281652915,0.09205274247335535,0.43759616430476644,0.9551459024183534,0.008936868729079558,0.023804767507219063,0.44255153850783263,0.005199812949819088,0.721524791957467,0.4446704669279074,0.03520598357040297,0.1969422352137062,0.009105767133620431,0.7280512070140679,0.7905089209662682,0.8624566276389515,0.04008473835625973,0.3747065955258135,0.07792671097342437,0.38017044294784086,0.12814481968114363,0.5779612812174569,0.082263342741681,0.0237836254228352,0.8492917244070778,0.0061592361078274165,0.49893875072313876,0.798004608341245,0.7944371311161201,0.07145778483100776,0.06350129726948503,0.40705242481186843,0.30150303319528204,0.0018528810640683463,0.6726536185286668,0.8576035064165758,0.8639640922132469,0.09673166140640262,0.03249276254293309,0.2997336221236395,0.020027134811602027,0.22977910505101498,0.036623890533423686,0.08716497360292948,0.018206704324078345,0.528316924218495,0.9701488439804448,0.6044749214962716,0.9081275218847494,0.3327000275959793,0.06167939024650802,0.27247484301260955,0.5659710481618976,0.36990686327455025,0.030944479287762252,0.34941377790937256,0.004214549803081391,0.03670294064441314,0.09602711295976343,0.006662052683406387,0.5450223097326724,0.07901712246241689,0.026849474901766847,0.46744570779886624,0.5928072881455094,0.5918331816040158,0.002388717623205824,0.003446175570901677,0.21034972370868385,0.0362282283702286,0.02389988255406542,0.1885005463554198,0.014825462961613817,0.7923676202244727,0.14006692580274066,0.05964210445237789,0.058890281587976205,0.1296567210041853,0.20513939985499238,0.4114360687976508,0.04165835253189759,0.12941949216967674,0.012520890267128798,0.41849409379534397,0.3386789919651438,0.12232721854432514,0.8963240056259096,0.6085885842329686,0.8473432436700061,0.24587225474757315,0.04845263076347053,0.479232635745683,0.9294285225995134,0.042211498447594246,0.08943264022182137,0.8373952282980313,0.2138853154671809,0.009357745975152163,0.6743198049539194,0.2915682574236953,0.4812055513122745,0.051399072654182,0.09022812231836572,0.012513583922544001,0.5936784621784478,0.09581012940425646,0.264440582044159,0.7410053788211283,0.567807914493902,0.4863375929321025,0.5735136319420024,0.06283201530728122,0.4330303069336126,0.37041898049158434,0.6532229102958689,0.1855050464153441,0.012131250184461762,0.9683717580881834,0.01692106200829459,0.025863924318229474,0.9459103196084684,0.31030700755309937,0.43963587666154325,0.005819423511679668,0.005759871195837847,0.022802972697147664,0.41457303436881776,0.08791864380725906,0.2060536064296492,0.31707623064155577,0.6352181407804277,0.38022023653285447,0.016836043429547067,0.35780062365345233,0.5948772937397458,0.41403684077710023,0.01172004856436972,0.04968930971719554,0.035127290151982335,0.1636644673396022,0.41306444157288974,0.13668688939676935,0.031688678538260996,0.4938600106436467,0.36688409648561404,0.1681491883680876,0.2535044032162329,0.009195398690378387,0.048343821740895396,0.5121950612508737,0.46695879616419866,0.39933747799309527,0.278290290732681,0.0332754181545941,0.16932705029086945,0.0646776133569531,0.12714138956373824,0.2783891173931038,0.4268782490465636,0.30506912937385283,0.91239340864191,0.00930745830944877,0.6574220580271222,0.023738476995244333,0.23790317679830314,0.04655523305083797,0.9785402696866691,0.9643742904732991,0.2185743925132942,0.4153821481487577,0.9583836768386287,0.8815320585012042,0.4370590292834956,0.8601550720782559,0.11148944492910626,0.5919564769425718,0.007310600902193543,0.9077611330360903,0.3607570374609672,0.7028457792260627,0.31535127556871717,0.5298008016117272,0.40481208305933536,0.26590780902485106,0.053682811121713525,0.2005989436889496,0.004866032429812736,0.9597302930806871,0.6493736431688666,0.7092465183233314,0.12923949750469738,0.04171343972317962,0.483156799371992,0.5205563456325526,0.8392120906925942,0.9468132989073687,0.0028670069590431293,0.25188265023011114,0.11257267755014647,0.9398142800787408,0.543995868544793,0.06199330151489263,0.0025964515534266886,0.0385941868985585,0.22126453724862719,0.12103251729558766,0.2527881673999391,0.48240440688453917,0.9972446098663669,0.48694669886587716,0.23588723957538105,0.7481369135106397,0.012367142849927818,0.004006439692096955,0.47566317185860724,0.37031121347707613,0.9756695624116277,0.007291987288441551,0.6423383041835122,0.007382370036321053,0.6159845639412793,0.1898726906143444,0.40487254439608567,0.5250896887224971,0.22513683636955403,0.17856456452429753,0.9047523971985411,0.9071771135852625,0.9963784975110659,0.06353648253700565,0.20272794099155123,0.2603539495841854,0.6060893998223063,0.022575773535550556,0.9805238421753074,0.03003700913048507,0.023973631174223457,0.047880804343354594,0.15980101932550492,0.004571192512871725,0.013680248648930046,0.7634387168211655,0.7699329758717932,0.4255698079650162,0.012446995881453825,0.38036851905797747,0.4523906504863861,0.28628360568228883,0.37817522249081015,0.012428804293862446,0.8593404283749166,0.6203621640869973,0.061574028222448715,0.026434146092286365,0.818699375434296,0.196805213694975,0.8127210015683627,0.11769986692039269,0.7436855998061204,0.04403967435837643,0.09363396225047035,0.8922781877467401,0.6007793762931282,0.006328019787363196,0.9300704907797765,0.8050466314302296,0.4331765347139157,0.8571738703635972,0.26491802537211157,0.044901593339164714,0.25713508201994845,0.036254856272294536,0.7159245316481244,0.9548690873173732,0.009196245568720854,0.9267966078892983,0.6656559496572414,0.5347583463134339,0.39934157067539167,0.004396036316548727,0.09532070593652775,0.15799149140703583,0.9216037441887468,0.06119838370197459,0.3659231805276632,0.14102506939141765,0.012963708087187265,0.02347468698100897,0.5326962799314844,0.014863695102813459,0.34163051774213715,0.003553439247476131,0.23687842229806977,0.7499012293982866,0.00339376273651809,0.21722059039773872,0.05689877629468207,0.03344722287035956,0.06365752275362772,0.03169487628386585,0.24788110813519185,0.34882815056938793,0.030790781546446485,0.054300508900308686,0.6326939160902117,0.14224163171325857,0.037467498627282825,0.6810168017170664,0.4629283898861994,0.03412389233398377,0.2648856702174571,0.18016475832036577,0.8321306849240986,0.10811952070381561,0.02685776442649259,0.15487712903414094,0.03541637544173912,0.46288531063502236,0.6589535718161211,0.022392555779979367,0.6315070178158,0.02716049268107283,0.5381531571559386,0.12428448910324515,0.00751204903167915,0.6689476324396506,0.7934253691743388,0.017458648855720807,0.012312923701660913,0.044150870427048156,0.6781009055938023,0.8788855532972827,0.18897654877290976,0.8324478146525175,0.7890476217722592,0.09035198880416806,0.16009245333944022,0.14071286118530427,0.06469033866668161,0.029052316113359643,0.06461110447946965,0.039930492574971804,0.09740504598233728,0.20879139048539655,0.41980929587659116,0.009042041531464401,0.0033139983853966593,0.007480065561068652,0.7062424893508255,0.9239144547831039,0.25752338675872044,0.06439289118715485,0.17427206201560613,0.007028779465876275,0.09474165442930477,0.529698883240772,0.04587597446226898,0.8006490798455661,0.34458026940824243,0.890793895099036,0.8103298417801383,0.016799056092221248,0.1979821001095628,0.8778308699262509,0.2923668108355174,0.49757246088780777,0.07213570500803289,0.4687957164154933,0.0014054193584964066,0.8388152868612586,0.19251208110080606,0.1585379832236673,0.07967008584565946,0.27316797767376405,0.011234014509623354,0.14950995980353868,0.037204090219885334,0.010790014866513015,0.7571780218965907,0.11517470669742873,0.3660075623234684,0.7640866695899529,0.13501698487000993,0.013005447202950488,0.32315579249637294,0.7230943251364021,0.17894582585751242,0.8983060456286718,0.5718561301400346,0.040824934186525996,0.004690599748539782,0.5412027074619054,0.057670431762740046,0.3792589510894627,0.9727521107897943,0.2734607589525469,0.1703676882992458,0.0030204253505574106,0.006401583822839712,0.782568490491186,0.1988740183223927,0.9339437513753279,0.31178396333777497,0.13908803175999745,0.07669941443113808,0.001710374953933384,0.5645822601770762,0.09519102625988818,0.5404487172524022,0.06011983071896881,0.19103008096331375,0.3000339206280178,0.08144665868634202,0.07976156675090881,0.40915596535294413,0.024408578530294208,0.46573496896916544,0.7932216686563918,0.06939926981128931,0.013201176495305477,0.04815550235317295,0.567069902510634,0.5857356888753971,0.013465420076290386,0.6406506908143057,0.14405493291180088,0.7531640379682629,0.6477407344072912,0.07848415465575176,0.06265556110600916,0.3704088559423079,0.060993236939683886,0.3360968733171174,0.5167407589552017,0.013919639721679174,0.011384892919713164,0.02647422516019383,0.9317469512538912,0.4052994498625901,0.5084146939170723,0.022624760191383,0.06943374323293787,0.6197963542473973,0.20650605394362762,0.2939586301264702,0.995060033307021,0.352792208312791,0.021600623869664843,0.7002195458662384,0.08975043544050988,0.4346362780933508,0.8925781248208083,0.13304826718611248,0.02206625517877535,0.9675139776495206,0.3299456629502478,0.10854903309319697,0.4018681491148388,0.7238586743239973,0.0032084749076733625,0.7268802273835753,0.020221153287910507,0.008086533511061878,0.14742927303412232,0.06473659234778745,0.021890505532279687,0.006111349157685962,0.04724827449100422,0.486718115285902,0.3525830009690164,0.5500175878520227,0.033484406244754544,0.1708050417139717,0.051572738539003085,0.22226445635070302,0.4840065539801944,0.9632402192168174,0.29239371133058395,0.32018265165533255,0.42083841119492527,0.5274753221617855,0.5837245845602979,0.03063024759128452,0.14839801171912922,0.36633223400421366,0.5938054128437226,0.03836821048775472,0.11779120542603075,0.10825833884124508,0.14420185710873568,0.010039068017834513,0.4339459575407004,0.950012528372837,0.6003904569886674,0.011164428152467678,0.13511736809857225,0.005921016828005296,0.29740582014577777,0.034231466793347765,0.25864459249174104,0.9643389724385285,0.08852998592506194,0.8834714898739017,0.06008291287869906,0.0662944792652914,0.25946498234869764,0.2365151041629839,0.20873255670909405,0.16466528231279307,0.6642957689458632,0.02542460290479364,0.05494373801486247,0.01183247005940593,0.12302495193156832,0.022247411651064877,0.39233127536903195,0.3546793408201527,0.27740489539960994,0.04808050242373661,0.45280263334592014,0.12657887241288762,0.7026291223678884,0.1921389414772972,0.11564495110825877,0.009885943790159304,0.12106134844873619,0.006354528498272318,0.3056558814059023,0.24897052996886357,0.009269716545441875,0.30580301858179815,0.9383261112757597,0.8717294731654842,0.07712669698829819,0.027291038066914873,0.9326622033831079,0.3968510710215737,0.00618959099207138,0.02259230747712076,0.810319259507378,0.0432056235922086,0.0023087284870318995,0.14806784684134902,0.9752127666636163,0.8674455136940042,0.17170482618295763,0.24991467002743073,0.06716698899027916,0.20656473760098723,0.010512670394924376,0.07647184748792425,0.09937327634825419,0.14721749586315558,0.9898624181070939,0.02354020524243851,0.015663492264828327,0.2520382620650379,0.008929065895496082,0.12926678770165473,0.5455728075456698,0.5265648663576036,0.16736382662058788,0.007661131147964783,0.3605090195238958,0.06151457401837137,0.7018080424004951,0.24879029517910786,0.30607572807812167,0.41465896202949026,0.7633008625421163,0.4106731618692012,0.19389902106056012,0.05104748702564574,0.04854239575719785,0.06927430127664896,0.7266924463620481,0.9218798584536183,0.026302682767491696,0.07621805430005935,0.0034079488559399036,0.32156916823050496,0.17869840317989943,0.17083788635481822,0.459938358025074,0.3864331783250844,0.7506771377263759,0.8965696874874443,0.012393631416791239,0.5280868639547859,0.003603649374491059,0.2714623205797295,0.6175810790444134,0.6088713695027144,0.05622169288727479,0.2106100503196018,0.07265971543214567,0.0045277178610245794,0.7112943818582482,0.027148329998181394,0.029849918619239364,0.584815954863203,0.0024598328573902243,0.5002902158885358,0.23754946154814438,0.011024738600446893,0.5536776421068631,0.1296914442802182,0.003663194433340784,0.08300087105691045,0.7800231773257587,0.007048932344587262,0.2149541458365902,0.6390871357160641,0.3593686185573392,0.0027676996254144713,0.050677778055234865,0.028277675276931737,0.01915210430206623,0.009235296390806306,0.10588583685364984,0.004345629753275769,0.02810280644143458,0.005012459855622867,0.021081968469209733,0.010078459888875957,0.16607907579629672,0.06885718903218842,0.1475116947098703,0.011988922147938497,0.1727956970153508,0.021665110064851056,0.9368318008550157,0.012824285772111962,0.7073269825137667,0.08495046294998095,0.5879841389317627,0.11358481755422546,0.057203785424570316,0.42164307319023425,0.32704709480371025,0.08049085905749795,0.6429443089968085,0.052419760335493684,0.06620472312230384,0.6646806121701694,0.255369508441254,0.8951288523069526,0.8547930828271102,0.00993779847463701,0.4438667914191538,0.40905246117210503,0.020773874901081523,0.08427702753304786,0.9954441926020743,0.025930106445293047,0.16195369980979638,0.3920803873762617,0.2478264599482416,0.32863952317178413,0.013763571752778165,0.3718398384207773,0.007595587201709964,0.6034814080527261,0.7513323551321913,0.31270266469553354,0.07892850928250655,0.4370969137210049,0.8737856635254748,0.3374370069631372,0.09361094908521671,0.0972182225215033,0.12003401515541215,0.030301513163799886,0.06171264767638823,0.05923006812749477,0.0025475282670889563,0.10093279980257179,0.8256286960326275,0.05524510580888365,0.004853095027950828,0.18266745532777656,0.3028181719943385,0.6756988000038759,0.7439810488213179,0.11366333478305224,0.8179312319617537,0.04926591370285914,0.5729820933172721,0.7006206667732734,0.019781727390022312,0.18988977388158795,0.19405420877018267,0.06783508771598319,0.2160806815859886,0.03327901148398932,0.27249050803181574,0.9062593650128515,0.3555761406455745,0.6851498913111823,0.1415352024533762,0.08947389835366276,0.08006462768053371,0.9293172659425748,0.14628860293386084,0.5733552879471616,0.17118975804239303,0.013937991085231152,0.013637739168887239,0.12793526836248306,0.0020534100093336414,0.4376350286936362,0.017496524409324296,0.5656923883027382,0.010858053908043234,0.22107445073881205,0.7820458482715387,0.19592322262987474,0.7754974652708837,0.6843685418895168,0.9203829724411271,0.01698727220043402,0.36683235439875006,0.46264134609524676,0.0012509899757945394,0.43465501590073763,0.11618366248109492,0.14733384781316605,0.034598548703094596,0.0330968243481425,0.4871324841350425,0.23390720960702932,0.13462678704619108,0.4723875667715909,0.004409237519778684,0.19443683192796174,0.7270622199736312,0.991025990322986,0.7064067268529366,0.2301758649610924,0.0026986594981136002,0.0017826369377822325,0.017137973413502813,0.005363789680916086,0.8360860280182731,0.7461668437240923,0.21731208196181456,0.1923696497057455,0.736126045664552,0.6719823550890339,0.2697172415041462,0.09142461442937236,0.10156710042456257,0.5706585433911204,0.33061613693635705,0.6741890294368337,0.0016262392169350433,0.7075136325747647,0.7544593113153911,0.018252327376316428,0.10565088293006437,0.62091418079697,0.8441404340187308,0.2572368593735396,0.03528574678383765,0.9439439312947473,0.1446430432668682,0.5919178466168546,0.3370826473715137,0.27136710098730227,0.06315166924059942,0.04006398404220594,0.6276228309752893,0.4752509833871603,0.033953977802426615,0.08583812822619005,0.13625539853175392,0.08816042992681644,0.0254231949546806,0.079012581188835,0.22487635213208035,0.032031553728528124,0.30836835015485564,0.7359573723514918,0.8596209490017424,0.09789509039571442,0.040798666240816066,0.17285836026287918,0.5747602045819126,0.9287042514953706,0.005521699974039335,0.03282528128839147,0.0056778680350375995,0.010001887768202202,0.5897792260718877,0.9128790193914507,0.4332864473290813,0.06783865080345498,0.02048542486165353,0.713522561818483,0.8310475468855761,0.00908543450690566,0.018439680583411795,0.34634290004094426,0.010838054696485125,0.3607691547207184,0.01511378840951406,0.07175389801239596,0.47372952546659125,0.030739246863562605,0.568960725220605,0.3626762852033775,0.4743801264643889,0.0015020990274723454,0.39824625219966536,0.02085895652912581,0.06435015491857186,0.5283424419397533,0.34168379875031324,0.08104966878273068,0.9021744829033022,0.2713077463010741,0.5529807677591702,0.07307617234259624,0.43544531388569196,0.0031534303519132156,0.9383614730111417,0.17603579225978622,0.8062976851251464,0.9589430195009151,0.16064668853430414,0.004359166675981223,0.09233473927617178,0.048068016382768586,0.022321147517657465,0.20246722229539998,0.10325026066928386,0.6630215731066686,0.41113485451261433,0.01123586752524098,0.048223169543367216,0.17257101392242447,0.07155617821366865,0.19651657426002594,0.10920885192205623,0.5187092902254453,0.303687257890969,0.19271451987101987,0.8754644647246896,0.5899136845136572,0.6792335939666108,0.3680707161497868,0.0566253580320187,0.31379129855893834,0.054538534332500235,0.04750234462748949,0.8659905322714404,0.016192066876471036,0.014330400798782478,0.3728273284067869,0.008083217509347145,0.24725315017325322,0.15293252320112075,0.24544165643493207,0.635811286382057,0.016884690955493723,0.005304786082938981,0.03406374996695577,0.5180320936626488,0.9933169804888812,0.11117103171712867,0.8148838919192082,0.9073431046405287,0.5651195515725083,0.0362937727156085,0.07242542667285715,0.16889547629222623,0.005123464331746633,0.2194133207730664,0.09106410357630995,0.24104953850421026,0.008895812445180385,0.03733439607962163,0.28641840124001844,0.665263458734648,0.054146494742178676,0.024268047708377857,0.04521283636316041,0.28119036519094387,0.36601386020861176,0.03291934451633577,0.07399518246885249,0.47829096658910775,0.022760196329473188,0.0088570522559588,0.21076342640231613,0.5520170392718481,0.12349292278124017,0.8767318643123303,0.028581841680988623,0.33903141429211886,0.5885363177983021,0.9362499452984526,0.8583196480705643,0.6014155147743898,0.6661657624126891,0.19517571409220064,0.20395376067169985,0.05784791147537971,0.4431885718257882,0.2628658073147868,0.8045957869946464,0.09340527505305851,0.043116392395508255,0.09935598161510002,0.9264362176145868,0.1161535962420076,0.09406241667944745,0.12078049844507217,0.13286390728324482,0.14647106056367676,0.45470903869955304,0.6897615705274944,0.5060223882360428,0.3078093947358488,0.4524686504007701,0.03844663145613995,0.7919328449853844,0.27606125446894275,0.008886661504362233,0.06650491701497133,0.37746891135297306,0.5527649111088281,0.45890442749269345,0.12853565924838187,0.15742740471764138,0.5157213067777362,0.05668900766215264,0.39595709621864245,0.7398123076813848,0.33553707836449204,0.09082659159837478,0.2713731223201707,0.027028130351780606,0.42344544499922254,0.40674992478930494,0.9184220183191226,0.09331547154349888,0.9585385150863501,0.0013198691937037087,0.8316571448819366,0.028171167806531935,0.26372387285263327,0.022507847464247006,0.9799536248226294,0.03890018032071173,0.6897808010668239,0.20337227192400212,0.42622317308559077,0.003886798283971547,0.08163499442825196,0.01580850777568226,0.1135847564909622,0.004466492146699367,0.8104799216431704,0.35128694059721954,0.3103384094046914,0.46607477549597953,0.9102731516543809,0.7984727526954412,0.3550806347006574,0.6907906867642256,0.3324246078719382,0.7943230364601522,0.6356156491121545,0.11001878027577304,0.3412816682639472,0.34185083498129276,0.03544929370956908,0.8173770828906279,0.09685340296482513,0.18631780563771125,0.010084805110498613,0.80713554899487,0.7858168490487107,0.49187758191580433,0.03526301676403141,0.6594663158094518,0.9031213874596503,0.00895186626990392,0.08138595813177686,0.46445154677569966,0.03006191027113219,0.4115686181552711,0.7764125045686442,0.9403862136888821,0.32674794970736354,0.12431942884461421,0.6536299164014024,0.6161490589394556,0.16110919272011073,0.0608715199270944,0.7143133163751241,0.3363297952762024,0.3079773591027738,0.05510285499977048,0.0249376496996045,0.8325749142937406,0.5921765006572436,0.3879647085748943,0.5788172477127064,0.05554793205082163,0.10153772355874471,0.29828358914586783,0.0053642708518948715,0.7349027945705553,0.034647985474846085,0.4289907049733168,0.708644181893396,0.47582555647064045,0.44125233723829743,0.202036539435665,0.44027367335436784,0.03321946846980977,0.41895988795138667,0.03947081818220621,0.005213069907319338,0.8686302972260462,0.49363045537870925,0.19547479198497203,0.0077233966818445075,0.09020119977284921,0.27062599192896236,0.011990081891715293,0.7187408621322309,0.004092255249385567,0.011307260710461408,0.347507695938238,0.9074439575810396,0.030488419874197904,0.1917914549178315,0.01793252442602107,0.6465275544585567,0.10846562656994593,0.026112456762127565,0.08314689421187176,0.8448259240602816,0.568720092943299,0.8401515272531602,0.001774175707712305,0.016210372970732443,0.011818566193303478,0.8133992677135137,0.8180525580689454,0.008365456328867127,0.01668287119005878,0.03194826525502172,0.42791782512727483,0.6738868251924806,0.7507524140658735,0.9162370802857116,0.019421870155677753,0.969912852836032,0.06379123889081155,0.4756739438267056,0.037239360425207216,0.028976340553085653,0.08738904602193104,0.051154993389425286,0.003862439404468026,0.913404730595562,0.7830716797860332,0.1556322375422317,0.5496064537907368,0.7676577644699809,0.2568697737285921,0.11272937198166764,0.9818311241956964,0.13787588204980986,0.7275772401892886,0.6780894253375314,0.4675372796781651,0.8186693416774082,0.03659885591160774,0.08950425654162888,0.01608199604468551,0.14628413967089338,0.038027277206921194,0.006393789346778819,0.116769261654641,0.16345318099870676,0.7224162920217587,0.12442652234583065,0.04549066350237378,0.49485316807840857,0.1436870365202318,0.697272226552766,0.3161667616045607,0.35747686718519167,0.02318679853278567,0.6186445390164217,0.09049831230619616,0.019924849245834896,0.5343350655253936,0.047246344722237044,0.037393297485816414,0.2931957766892379,0.8280287787589984,0.007843263204213087,0.5456297101977834,0.8098344642245812,0.0199948171791499,0.5019636954923549,0.23754116055830304,0.08529499181787792,0.17492672961387395,0.9831984065466922,0.014992555867072033,0.13022178517356495,0.8834805689037025,0.13387688159821073,0.2920123861804231,0.6697275248546821,0.012539113614150678,0.12792356137343452,0.005320556561366963,0.2870918354189568,0.03407898319185849,0.3314393199595789,0.190567916996614,0.11275589074787126,0.14705375315605798,0.08109680408737338,0.10533912318518049,0.16204203426450822,0.15454943379966746,0.3868326792737278,0.010425544233285353,0.1424421438544366,0.05540382996554121,0.16762005681293013,0.0015423188878720823,0.9558573955594459,0.18371002064681285,0.9166184306030561,0.3473871891441652,0.1885723371886856,0.6305558061573389,0.10109736981410386,0.07756440616359009,0.6704427130097776,0.20363986344703208,0.7057919159160781,0.42996154114589136,0.08306068694715454,0.053802720064738664,0.04912061687088169,0.7608212403515817,0.2664604288003193,0.1500846345249707,0.5306302416563007,0.12755968056063788,0.4714349294935974,0.5295199128453276,0.014877714918637886,0.5209581691110058,0.8379144807869989,0.003983052708041521,0.1612767900061441,0.04115957844014909,0.5987778655912194,0.2719541333912788,0.12822487144509565,0.011019210911447442,0.6074351366611124,0.00811108345532069,0.06775518136281601,0.6362117584436056,0.6052318570204847,0.15443745919964116,0.05909937662605372,0.5220490041048423,0.07226556918749197,0.21226122078156678,0.0727895774907489,0.9282434198782614,0.11580561006029343,0.8841706966945853,0.5318484984361598,0.003606446440184153,0.0680097294906467,0.001232127734632668,0.3224629337586532,0.31843499029411704,0.03274207066951119,0.335568952118507,0.059557127963990215,0.5993132618257712,0.5714407488338575,0.31018682795568286,0.08203711666756705,0.6219777063415116,0.06200750185471337,0.0841781753034405,0.3661002197077939,0.1518874138911487,0.04025205714978586,0.48819737014302605,0.9615526465265581,0.005511409456801818,0.703899571618988,0.08450021041467914,0.008619424448472251,0.0379090808671841,0.0287248536246398,0.1968351381127254,0.27191487031042366,0.6446947739462188,0.8722234229285346,0.0037462740139320673,0.7049048846828009,0.008397505342532297,0.5949984832236352,0.43203816964875913,0.48048593342953516,0.2408809146080975,0.7739008885684134,0.6436206715970552,0.6422004302334012,0.060633945145675716,0.009826092968670534,0.022257564258467217,0.14300328349516167,0.06409825024545894,0.2643964112353209,0.18266591193949305,0.5041513554438194,0.4453782098476174,0.11291251174079814,0.7598043657822009,0.3376057987549704,0.0978612139466999,0.007426977179802987,0.018504919528047097,0.008714747821074105,0.04887441539065097,0.2852405701206252,0.39975742308465234,0.20099868982196442,0.4749367355420642,0.002035393068194942,0.21352997581851674,0.5973178958125556,0.28755393466718027,0.024656834916807594,0.15265975962741798,0.22579649017102274,0.01039707347581984,0.43874548862721574,0.25996108847506244,0.02083799135109673,0.06315762920799144,0.38315461407568707,0.7012131086213045,0.10154151877856742,0.007724440804137667,0.010503279817961415,0.1882695822172747,0.14700135444877305,0.969200585620851,0.3313607078952416,0.05710666028488442,0.07703345120010192,0.08723463710318816,0.45586478130244645,0.015047180402881588,0.9041064068083124,0.01824123951155536,0.3926469243818279,0.4568991286081694,0.23661587706452544,0.5520375492361977,0.49072917153820217,0.20686771384645838,0.035882681996673216,0.5397315090728704,0.021654971653739568,0.6679079134758157,0.9474967464453408,0.10529705288321592,0.41699334034892194,0.09726959075649794,0.1876599206469243,0.27328623179182787,0.12517453493478098,0.05598426198978866,0.7678114423243545,0.291592132129622,0.024559058054034553,0.04055252214733895,0.35672172914243633,0.44988026427298444,0.0019515428076517236,0.474151937378861,0.5559560743457426,0.010338340813249188,0.07640433107270883,0.06469244096257852,0.6139989904599816,0.3343441664289969,0.2915444074618534,0.17290491012216008,0.004973886315839008,0.33570396573050865,0.7556531923454621,0.7282102895967456,0.46692166945637414,0.17168126336594297,0.2767311217733986,0.29729269801064123,0.010081991660928019,0.798092699699698,0.3430747787320485,0.004840841504621042,0.7461722656250879,0.8661590806438667,0.92065737292149,0.0317538266533506,0.2660558880812655,0.2152934037880256,0.01757165645604197,0.6551065606463004,0.5991078531650847,0.03311955182525333,0.043289105163354734,0.2512408932556907,0.18035443095887163,0.07970814143964028,0.0902986599038127,0.03891628994216387,0.8866342916181071,0.26202303178303454,0.057434722044284126,0.95153115038484,0.03806617377181007,0.26326921863042413,0.5008306844595701,0.021277534860648595,0.9197218349056411,0.07457111874993909,0.17896965049664296,0.8301707305597305,0.6701383613783258,0.050618864017994716,0.43464170373103733,0.7912474235438562,0.15297272577608362,0.06327056145220417,0.08594428476697015,0.142865621054926,0.10812181519230019,0.8287718148444517,0.11877827955619806,0.05165638148873538,0.07855682371410418,0.899837659328175,0.32280312187622595,0.08080024778003571,0.0037510508135672744,0.031207185387203455,0.4974226437530794,0.05354419438660782,0.014155271705212023,0.20527397778294595,0.43291068615093814,0.01722088909365398,0.04342966448740498,0.07536845548958858,0.2981763037922008,0.19600330436523583,0.03994150625647104,0.4585182728838896,0.8796788918804243,0.26187659370485467,0.04898186581414864,0.7924178027014135,0.6931838878678624,0.818139779363015,0.9147450190985297,0.015304594928382893,0.43656933908044643,0.9983452816159767,0.10763727779851587,0.30992712926782784,0.051219792779435586,0.3769423006254007,0.25262809020006066,0.4589902080398325,0.10754744602007328,0.10340201669787683,0.020761756024943116,0.40712432244043834,0.0544646610815489,0.7176546559335809,0.010395536197694216,0.06615897074679994,0.33330073109488195,0.027973853055861034,0.8056093886699647,0.10716812158753569,0.845201005862846,0.881793092201808,0.0702154119953201,0.02734186963680448,0.018135285230915555,0.05331302653230825,0.12378924161355745,0.0742091503679897,0.4632994383379684,0.16763812214594323,0.11602595853721975,0.0043092795620815385,0.07475298377140818,0.3363800016925636,0.011668519782140932,0.09669249948336595,0.433427500556937,0.3016456329283743,0.7992608561229313,0.8890015120421586,0.0012883340127134105,0.20578375533737606,0.9798466789724766,0.8479092834448909,0.14613407202489187,0.36664191009258595,0.18877197543394914,0.5219369238893883,0.6805707170491015,0.0179435953898754,0.23538615454565104,0.11496647887254892,0.4308554627317729,0.15830928252196902,0.13717189370640284,0.9306758306836151,0.004128751790581387,0.17264116100775684,0.5649787077699575,0.8458508959606845,0.19808654406769413,0.8246866187839341,0.37395214232847307,0.18811962563729487,0.05148676883516581,0.0680654625842347,0.9178027137317256,0.2890475792324641,0.38850816900982366,0.020088672058554358,0.04739358210040663],"k":[1.1666856995411568,5.79191615494044,18.809926948297928,19.046400367747975,18.029413717937935,13.522233703840474,19.017726354296563,12.160952885406925,16.204252712781006,7.886264627736299,7.90490415570936,13.08062034590765,3.307173150381595,13.155011666916003,8.910806995954829,9.455818165482937,14.79045442130099,9.372623733079317,0.20369744262648481,1.7862581270818856,16.216752041363,7.324413743828915,19.4775580476758,2.4210439419018392,15.278204708084214,18.822609512605354,7.292510728096415,3.5990007711639205,4.219724244412779,0.5723421149821784,12.222660960543283,10.038354103452892,14.454062942482032,2.238781196086075,18.299649015477545,12.206826109926872,3.440376519982866,12.312182982149675,18.81318453231856,17.82464308255531,5.749089390771949,11.385015494061514,3.1380442803453823,10.951909559235276,8.761436553968402,5.562360524200942,11.197858256790013,19.360802207903077,2.627991122819715,13.314255471743923,19.024781814800555,19.620680285228232,16.02508904536257,7.4494397974649695,18.2266585685862,8.097958383649173,9.843308942087678,15.02000203528446,2.5979060452771074,3.6725403023842773,18.424005594932584,7.440729140692541,19.105231730546034,12.047932657366097,1.9018030954694964,17.143025580425203,16.001076937054567,2.698368580013888,19.198794773893443,2.2995181792204455,16.65361263701739,0.028906549713889618,7.2045287791946855,18.60606962570545,15.712480825636028,13.756456355999912,1.0340263710525122,12.240532048996918,8.33776731250651,3.0190720244706304,9.167324391256063,16.038497223774254,18.829687994319755,19.659746369929373,13.37370641104242,6.688070678886127,1.0480339573232644,1.5815068402410581,15.867030543216675,10.752032369426171,2.504683181841041,5.834124899834827,6.055499439354688,2.0539235931476885,3.9771847105784186,6.0489476809267195,0.3816923635023306,5.441047871885707,5.019856013047175,4.386521388273015,9.564457808756245,5.232044612984326,17.44502311044508,8.235650928392113,15.74322343265299,18.29447603923185,14.616576828098268,4.342828665257241,8.170597538101458,17.36209951027902,11.36690467182948,1.6134712074171231,9.65474681331569,5.507838054826637,1.4281524302555049,2.059010143367326,19.895134540792007,7.942157557378158,8.448412108374189,19.725555073469675,1.6181127459194045,9.598175614257354,14.361272392420128,2.462333061743247,4.35572569054937,12.892838831399684,3.310546992949792,5.361351705494197,2.778264613846635,12.529354156859753,17.954636249647812,12.307183567459008,13.734549641854127,4.935812932318395,7.078057939570339,16.695926104775516,8.319818426058463,4.7561109494844445,19.611588239515388,13.234035275167075,13.653190842943065,5.899613502894021,6.939129048274992,15.931463628468606,6.0994917695715944,1.527633085167226,14.168042616260976,8.033449121899698,18.409541987957528,10.70334326080857,2.9386609226028915,3.5269372586587844,14.986338820290834,17.71208592075798,11.278468689319844,1.93588093672326,17.007609689317032,14.207575118709318,5.345934019698526,14.027425240904332,11.563184182708351,11.273655785590284,19.85776236530075,19.237557108271016,2.5099752417398014,14.473796202354832,1.7359183425333358,10.215431454329934,0.5477944276538738,10.21978781202833,16.384664581711487,16.744117626536685,8.252941744440037,9.301240088764398,14.296952724823457,15.795017118280166,2.0955712205153265,3.231051736323356,11.098585996832856,0.48142556567885464,1.3912410263186281,15.330550110756565,13.127499601224493,2.5599810077284646,4.241880950172652,15.594785941451423,16.595474936811346,13.388572314691402,10.341418826248976,7.74574669512861,12.258532240075608,6.9677142316913665,5.507232665677146,19.165478864046417,2.771202639872068,13.254187918147583,4.044079768807749,6.080538019346102,4.604144509941008,0.03712215084515691,5.157020905437317,11.639702221289063,4.765942736033559,12.615287937880506,10.505388543429763,3.095493114265042,3.6707353428115708,16.049545968586457,12.741932558827905,15.219667965854189,13.706827602213467,8.788628892372357,1.8591667040205628,15.350199088867175,18.3467203532176,18.887869659238344,0.3820266508538417,11.712991282587865,0.26433752676723543,2.2582032638024385,18.142487847820043,1.3153362108582378,17.870004414059963,16.907677917506916,8.853224038146394,19.726523514274717,5.512472006484996,2.87035910612353,1.883237513362439,19.172647957548353,17.973307802601205,14.808730496099173,13.161456640939733,14.672549347313858,15.619656483661029,12.349701873349028,14.647454467718259,7.219604559725283,12.295987671966362,6.325204310686985,8.612444052832235,8.455498598792111,10.64584456304377,16.50642265694613,13.874709009968512,14.856457333422114,0.41972045421767135,19.365564456085124,5.912840760632245,12.856319562855179,4.729527918949463,16.342996520251845,9.290579551252861,1.4443353344158671,11.912458246696666,3.5650987718528704,6.396060376691297,10.17377689462586,17.167227542364362,9.658530056550529,7.2407822143062806,15.282866126388086,18.424338020827136,0.3661793088813692,19.426739865399707,4.867533343299049,1.0905272547321898,5.981529028339763,18.303071327349084,0.04797285201871837,2.1207879555954134,19.454330655436216,18.6409663552132,3.9409906511666737,17.212734100663564,18.419691519985562,16.25512071633587,10.456612134534415,11.34804122431901,10.845667362213035,10.664495671237848,3.104141145864263,18.24998088328851,9.020942202861173,7.377551401739839,16.962034261601037,8.225013219657162,18.06495692414063,16.632550260168667,1.976079027282731,14.92140252226044,0.6135240173214029,3.5711262842240643,18.4027246972231,14.45746182286272,8.411378128021546,3.107874523969323,6.937695215422397,2.4674250480941406,4.965616663031236,19.272308024355127,8.413237789978925,9.801344664096764,19.618464086265185,0.9034611917346869,10.53619701811662,15.282171048340608,1.1280574190018777,14.635385757893946,10.317378428459914,15.455794596398063,8.506552905049002,3.7767048795309632,3.2386771447554397,6.390001832323362,14.177988515279543,6.284714326455512,10.385425263227486,12.444335853389266,7.4691937044047,4.973359036279197,10.375243687494251,12.797805868126574,11.291885651158623,2.214335768084319,17.62528275224655,19.838821093569045,13.260148280058841,14.643543192823136,15.18191313666648,19.684467181022974,10.631137180410622,4.28062770864484,18.257110313194378,10.838792083248476,9.40613621497163,16.094120267255924,18.515936000849123,13.035564140093765,0.7056887298993741,11.95400848364268,7.637146549781586,17.35861331131659,15.284243037548695,6.068174151813532,6.591391860515214,4.964504447206566,1.9715360219548916,3.347488477897591,16.30422545845458,15.460209285997673,5.772710458646344,8.789327204391565,5.110304924971758,1.8045459482571236,3.571306663231102,5.212921846927263,17.935488194312992,5.442658142264887,11.562408650770974,6.762932531091841,9.853838608160084,1.6274377164412268,8.289679177892197,3.7110293241207293,17.946979858773695,13.992527757042076,1.3269497641781491,19.436407390402614,6.474788059083019,2.2220506810529006,12.65576267009346,18.980726101441697,13.669939609257078,10.344218601349864,4.294644904538325,2.7069972509714235,14.708700682801666,10.770023188836078,7.116263037370265,19.04896612415368,11.339309982143666,17.833585690789803,8.522685942537858,19.740678588227887,3.1725228828160246,18.173872429372334,10.951259824066476,17.300994789537572,9.525368054616985,0.8783687097215687,19.488878242922173,9.230893179871359,19.224646254701085,17.63886719660161,14.853484985732454,17.893936538427873,14.77247511182878,4.343027934462809,15.650549910247191,0.8433025827307716,6.3796150749220315,3.702331319749912,13.19884850818076,10.368157314349755,0.7446741815580715,1.7144002267092473,12.484199207090727,8.745242689002826,1.8603884752193034,6.144846874743273,1.5634899036343342,15.637542847725715,19.40272584383998,7.798514880493972,14.068664352280678,0.2889130519009342,15.835127611040622,0.35110811361169336,17.63379796619333,3.9797519965220918,2.0773565615659706,17.50490532468819,13.742777915468189,19.582472250511476,3.1366629013510705,9.354053220830707,15.982180548703653,0.45841412482831245,19.43057878475917,7.1514518948533645,14.543028126722039,17.49597918358767,17.14710696164305,13.157296495550362,11.664524455366552,0.3683569466776726,6.55629103529388,0.3120775207873594,3.0251218474701336,0.09254607300142048,15.465198269907251,6.8755515958501645,6.408480547056086,8.935825324929079,8.153616366927139,11.371939300410148,12.899695383378088,9.800862287394132,12.256433425469734,2.7410602412876806,11.206305797937786,4.696757946373853,2.7716195115891074,15.279226651427557,3.732772021910149,13.353012713284578,11.193192693924829,0.40418696623768735,14.391292870856581,10.842948421782364,1.1317807756021026,2.566319089848048,4.3669239263917214,9.131629983395456,7.690279649559466,0.5492252159620747,13.0656759198264,0.29902906285332875,18.631341300933375,6.223676684916204,4.1071959170674965,7.974632852792465,11.642373197325885,17.897669691637784,6.781001974242686,3.861361559866916,3.3331318143438304,12.626550912350991,1.7391337778570293,5.40545377995306,8.496799952369681,17.166519604568762,19.551722628548415,10.702972573489792,8.20895988910297,8.906468968188626,0.39935796552530434,3.8803902837939352,17.47360149792459,13.507020589226478,15.999667047800594,3.0174528436141745,7.8908138513964055,8.918183327341303,11.330287047497908,12.296708139190816,6.3031142442736465,13.48838563533818,8.107257480231711,12.925105150189516,15.995861229489886,8.168469776809042,17.36397243596539,9.305135129424,16.373108754317776,9.150439870619959,9.022945451353852,5.31709592582748,3.8900667308530945,5.289592458141543,12.471016966477917,9.299273335719507,19.630658581802656,17.18023064697283,5.398050151067464,8.400274960282918,5.34111300673032,8.818588951349632,13.039651312018394,10.433236270699581,10.714465664508284,15.322149879179495,8.94179737466855,1.3850246167402647,8.266110528014913,2.9255541646200722,13.302507329441298,3.151277838062261,18.914702982354363,14.392995684945067,7.522248320033902,11.069361665949927,8.175599601620714,0.7793640724924522,6.114217966365207,8.036716673996956,1.4047998307321485,7.68057478278624,18.794855233374715,4.497261493884581,10.753944941452321,7.638432623205813,15.35819981100229,4.405944099127406,0.6231234762247961,19.97646406846804,4.089317573621862,14.024187022198404,1.1443362829722226,14.683921744101983,3.7745779990029193,11.567948058784907,15.532793682528387,18.820787537697573,3.9702399803049238,17.52829546118071,10.081565457655849,7.7233367908616435,19.37691973753289,8.799542817711789,16.51223464944527,1.2315966514684007,0.0060931183715107196,14.282311964486789,7.900117184285338,12.234449961645613,10.812929909819529,12.941419203919677,10.48248251674027,13.103078151444318,10.185893777332137,4.290845614359342,16.496324952690465,15.58328640340973,0.35379595066361347,19.22433972005818,19.453999651240522,3.2136218601697575,15.734519900886106,6.080322163814049,1.0025539975487963,6.895586462699033,9.82558287708423,14.574520335326246,16.915203280549616,8.007969560729386,0.46280263288928314,4.615883774386433,9.20624235648718,12.377212931236308,8.520457969503997,0.177387215262228,2.4258510040709824,10.669641525482923,7.759509946497203,19.984501067819515,11.645863793116945,16.34551231500266,4.529278341797376,18.174354251289863,17.651908019516085,12.900341577463742,14.251788759683755,5.179159854609661,7.0990043160906025,16.987532183073085,11.065993955490523,6.575751817393285,17.301136074555426,10.620558246875941,5.5857174218559,3.8940898607383545,12.114243027850616,3.988234128403061,10.836877092509972,19.935359946031028,15.389214250522212,14.164321306560016,9.93276542918801,18.522440355772076,11.868708646660512,18.835672550494547,8.482445999624698,4.795996165688887,19.059157872192163,8.300330412964264,7.5784128838745035,9.843196310438396,9.987954020766399,4.777444621266791,14.374331655821088,15.433187834261282,4.6473897604115155,4.694654262571922,12.919687336712773,1.9968692212448236,8.518643857124042,2.9382497644130945,17.161560092648585,19.384613133882823,2.948964894929005,1.963822881238615,12.422680262160561,14.239804984749792,18.92674136530055,12.968479865346199,15.19765826504496,10.726201088538328,14.800868113352191,17.97593905404903,15.420810767052316,1.7144809246413084,15.759177252405077,15.166011753893791,9.062139963975756,5.940354094035509,11.512138253240591,2.286089381410603,15.452113491814385,17.64367414774382,10.802117667519653,2.4783415356336613,7.782549554179541,8.70036805028601,15.370954701655194,8.613064409733946,18.124750253612266,0.8406702312398107,17.93537029789696,12.874548420719613,6.814249192755608,14.56488180266903,12.895254885202366,0.758226635379371,6.770824719859756,3.6279720135692273,6.893171667152891,9.43672992960844,1.2187194978524785,6.90565462376866,8.876152196048324,8.099920824957817,3.9648833335283173,9.777944090368834,1.713874616725164,12.4365033282798,15.465446778022809,4.435586318483757,17.43847408073841,9.323763009429529,8.849746772550988,1.033359468976136,14.756285236030365,5.21251446706239,1.791450973451476,13.76853878575293,4.1499552870048495,12.562829122825372,3.70169180199043,16.492134286086785,13.847584498222716,18.916014938626432,6.314063702923356,8.65751477766025,8.43047360290496,14.999293531111304,6.5355171691847636,15.403380426984711,18.345943185509846,6.76566183881218,1.9229614934514316,16.139817477177466,2.2337742390012982,14.671839755933425,15.38045590631786,11.984206318122684,5.88676710416137,3.881341758406265,10.135045400629732,11.647342712435474,15.44363096104549,2.5389646518219466,2.088783252050015,4.960736306289273,9.958303454918894,18.974993418667463,17.049997737898657,3.342982465348814,15.446616308048768,2.8328724982635034,7.498209716172206,9.981849968597366,1.884016721751185,4.749607692238467,11.341485755943342,1.2877708475895666,11.996438630056616,4.617001421052804,3.182344121711931,13.249865600935408,16.285082723042787,6.140036837102074,18.466644466183496,19.747493227706485,17.51972548131864,14.526910869309667,11.817791176886367,3.4812640619242075,6.414593164360367,9.129774490812736,10.49285017502199,17.546752920706773,5.925588890845939,8.486010638883293,2.8862953961741056,2.4550814021741507,5.159355550703428,7.233881498730872,8.931609654133993,6.174247443703695,15.944737425716283,17.85187070945074,6.056920157911994,4.612751904400922,4.353835666802235,19.59296005978019,15.1389238960361,3.939385007256604,4.282933169768204,19.856680703498167,19.4502336125716,6.393351609371445,13.243945899050109,11.709982069909884,12.387567778329762,16.332295431779286,12.443717457432392,3.5750503075442275,3.654681194559517,12.262675284266674,15.852514932551971,12.400156192863712,14.773835331894238,5.126057768453811,7.8686391538048905,15.36320165336669,9.871295561383029,17.22188728987942,13.81295176576332,14.222801828212791,12.585599611386758,4.798939714800792,8.63881451587119,17.25335961608467,3.9358862214196133,13.22031804849928,8.863482335637611,15.969021517277632,6.230593376199773,3.4774945696782744,12.489409780974224,9.113993698428008,11.142857110977694,1.8238543559710507,5.221653279313663,3.152978108511717,12.304821104148873,0.8839618473451427,18.914372074589632,12.421709580247967,3.0250926003672918,14.058333255261402,5.503497999038758,15.231655146854788,12.246627892646448,9.487613992237435,16.766051233657258,4.105364213821372,15.52667331858833,8.561414523876131,0.38165474302884306,3.8944498882389045,11.664351446824774,11.394863871766518,17.286281409623378,2.253097367484038,10.455021554952149,14.999256510487914,8.630368566422892,15.675510473652956,7.872638495117008,4.8812487277628325,16.11866305564306,14.57915651305623,18.203226409741447,18.32154229107794,15.310358865180254,4.7281557434904675,17.950258917834205,18.364862377533576,0.14577909149807056,13.372990517050942,12.935199802304655,13.168932888096112,13.76312033648722,15.12099898314775,13.514344239460456,4.391905611942395,6.209357935353377,1.3039828395129893,7.488351169713439,5.073218895980931,5.104376285967476,17.394911855456805,12.993374340046046,19.85838603857454,15.87246574802547,7.4778270365868815,1.217196877944251,3.5671564685709667,18.924253211334133,19.081823180956405,11.620023436396082,6.930828274206857,14.881736427809402,19.419795699946754,6.321948194046474,4.110844954763837,8.382215691327058,8.5646984530281,2.568350388513423,1.206038620849581,14.04880562736215,10.107467261142382,12.345433134937075,5.712417060267541,17.099952636124932,11.141217248575298,0.9237731135938398,16.07338096776173,1.407831646725679,2.9773003412450594,10.243817418427659,10.904703772407785,6.6418484115889065,10.92583349844376,10.923429255161313,3.3143717651648164,13.515813121722786,5.530377764777996,5.521692429032279,19.795304673873908,11.44589223311581,10.05031324752995,13.16067192573033,9.3198789086094,1.2338867782555463,17.444825689543745,6.290177399377628,8.921168471615303,12.484542629229347,6.431513186574405,1.1242436874745554,17.57943463373721,7.06994257903462,6.2205822077646555,11.38064663382588,18.100261018646336,17.110507445190514,2.466032304502823,16.525909345620065,15.171297110375189,7.140993295308302,10.309818534582838,0.5715785149966512,0.10918550534845917,7.772584113573022,7.144076387278666,5.783663961691561,1.6546395751121246,15.259732059336045,0.8741169522813319,10.635291042070625,13.115801786813016,1.7349382021316284,4.239683206816269,11.34305436081451,11.594578329848897,14.096976759086273,3.7682035030697447,2.0135060465403676,1.546867646000214,2.6062964757329743,15.577426506955279,17.32958815000623,12.61873584131882,4.874580784348388,14.725004246391107,11.763496762887948,17.577432703778367,8.259677340268308,8.223567234930073,0.47283091558145696,18.951872290113503,8.458166473880064,5.939518560693995,10.293089264667913,8.661086977922952,1.6891246583761976,1.8357312550011562,5.613413415060875,15.068905710685844,16.676835447713213,8.473307114141782,16.197033213139008,14.246466729516495,9.51088801950981,4.177871712240533,10.962474333397454,7.583807070536803,6.091596843559484,4.5609140689617345,5.722154182875956,18.2062695973195,17.115050570199607,18.59274640847812,11.708892763192114,0.6687310472116792,5.223231569999602,1.418665556467551,5.2817573063068535,11.066147767425981,7.717501321465412,6.759343218510923,8.3040850894153,15.177944411962159,7.164247182348147,9.709262075040712,19.152397328198006,9.632464986858182,15.868874609545994,13.290830622938973,9.849111596132643,7.739914341088308,14.19840994524316,14.410261772231623,12.811037577780805,11.059292938706239,4.441256811158576,15.647994695000577,4.450140589121387,17.689914753810186,9.32282055898737,12.548277275373106,0.14867457174649434,15.50952504398282,11.373463597861821,16.167006705723082,7.1475550329590565,18.565046610634205,4.061515963783564,8.039981488323082,18.510706662140194,5.196741541819816,15.6642294824025,2.1380091887142427,2.4143045050994294,12.875191745644038,14.413889546636888,18.625964063243607,13.018027387690472,15.365092735193219,15.5881250996047,17.142776216824473,16.73191486210188,2.4211418357057646,4.465888053216274,1.3708853854761704,16.203720667071142,17.759786606660192,12.722786237516388,1.0296383913274898,13.86756027803887,9.883579136166762,18.7677254093391,12.828316703115554,11.322108911628561,11.233265078496991,9.387197546987082,4.413219770394745,13.005050755547991,7.360323156316935,2.951082552105664,6.835382859877717,8.139383410726047,16.045130890445208,8.527694669297956,4.117919219563797,12.29001980166717,13.796536656574393,13.709083070160082,7.054913985754179,12.629175345286372,11.362256645034815,4.1162481504491,13.37504757294727,8.311478916584566,19.006543961221162,6.819991819133833,0.6714858725541362,2.9843453681639653,1.3999839410436365,14.54679815103141,13.102401288586826,2.8818207774785876,9.205714926969403,18.829373345734012,16.36522554794262,10.905632880175954,4.378639884330449,16.507419925673364,12.11259872068557,15.23254671518913,12.319165782291734,18.337111309128943,8.162882813327904,18.793101520059224,10.082519251494176,2.487250467337536,12.077758902013302,1.2690700673969957,8.844379190688025,5.299577662839767,17.075578913234768,12.092030768790082,9.21124063424867,13.94404035032187,14.904407449921656,14.82426822766806,12.683000418899567,17.66172183288829,2.66337254420542,0.5267274812171152,18.589210213971256,2.0836608620867203,0.5844155807911422,4.842785815498996,0.4694661945999412,11.442294331373336,17.06443233995315,4.285423555794274,0.8918417103338294,7.892361260235705,16.769803160261453,14.91565617212773,12.441756081817541,2.9859894253945374,12.44423324835175,8.793670939508203,14.444634003853928,18.715211830072697,10.410628263283378,15.648017353872849,11.870004103947176,18.093390472990905,9.717137155328249,14.569785847486237,15.507707149744308,12.29398246752028,2.8818886341678684,2.847719441618768,9.501480146400173,1.5350039007796124,16.59632971118327,15.983001226323656,2.5716132736755704,0.043087645166153266,10.758720441546124,7.587526202519483,4.7753634479822615,19.815717428156496,1.070106754597293,12.827774965978161,5.757781641387449,11.132181647217877,10.292554769475476,16.632040249367726,1.8886700355079444,6.943566575187701,16.18367892804876,13.31462863641435,16.951543037109133,8.558112119012922,19.560550878627936,1.3518242123975943,7.00876840249578,7.133406215979261,2.448096817545631,19.551029137572197,4.555930101111936,4.631696029640064,2.3873668826085437,1.9826476889694655,1.3774085987785956,19.334221448208563,14.065455351210403,19.444030338957745,15.67669646502885,10.454134065117469,5.255258385801107,3.7689089375924167,13.963132855300948,1.5132617038211693,8.752873554796121,1.6865351041416643,1.315247913567319,9.004791189252277,19.5652950311868,16.634818631978085,4.4971126821623075,6.408140630521171,10.805293821899408,3.976711367527268,3.353536216271955,4.785052631711992,9.642738640390892,9.669491909427347,2.678881835093656,5.927667918093,1.916699534547841,16.616165980302327,19.326607462229255,11.019197104867207,13.440708535328167,0.02084901533407013,9.096244894753651,11.386969543395358,10.646941767810866,12.947547957559555,3.9398619278772795,4.9194329875868,18.503303481860286,10.197217519474787,14.613537626018896,10.996867282148521,11.625359271443273,12.75037949582992,1.3535608286586909,1.9377108010010158,17.249518078693043,2.069605043961955,12.794715291764653,3.9793374924920633,15.567295824055819,6.449622838083058,7.645740907460015,8.121969462173361,14.588031983479217,0.6660760791902565,7.982521896176147,15.367569780344645,12.713985695434955,5.932322699886812,8.932690687041017,5.928759009930471,12.77916500180304,13.99047624008135,0.9928300297315662,13.440344425754596,11.210175110829823,5.646693702013548,1.9131354637465536,6.730254564476179,17.609848442192636,16.945024235257012,8.717109589941238,16.22378747315302,8.329662339643043,12.513690533393289,0.012888535651658373,7.8990471538999785,3.7419734894864076,6.514514640681046,0.25150748905456766,15.533893273660846,7.043897644792061,16.376055175257488,15.98126982772932,10.683643299016122,8.812091508132,9.079581987121287,6.589424857029229,8.121772977205781,12.785454499203714,5.5269806383227005,9.495695538578502,7.691322858280416,1.5993970770872368,4.800207202304896,7.650629818961003,3.392641693150704,7.837545678197655,11.01889227988714,1.4201381280641412,16.13489898702147,19.39984160029151,5.9572557597466735,0.31683284387224564,9.02760072121728,10.246494944993643,10.7955489935593,7.102949012637376,18.888846227069457,11.037657313620691,13.67795067862109,3.34720557096138,15.42501845191731,18.629238295449106,16.605207677362216,19.16465870362635,4.013690492907851,10.963273121652275,2.113502295149652,3.547696555993074,13.485886886908647,16.094739450686887,7.670507785568015,16.187275478944272,13.742183558604278,2.052761983733169,3.5498260046954178,4.743788779306417,15.564211684371951,16.86546177453401,18.58281981438571,6.662366031341853,3.141768785659993,12.373147470107376,13.33878952514111,14.615663803718736,2.0496480565261166,4.315853670218415,15.045144518232533,3.786926103815693,0.2772613420837322,3.0772812082446466,10.417609072823662,6.334224511410298,12.942033898356705,19.57062608795092,18.96531166115964,6.232942034653632,6.9986616355008735,12.451735548572218,16.20326671078699,12.773992243867784,2.5152830060134956,17.133636856057667,10.816778475564867,16.481027970773905,9.009741115877784,17.07772616261358,3.0046905833547966,13.245988437486233,18.192606090910818,16.311310055678092,10.28996036720606,19.64230132095805,15.655536592517016,10.20421708917782,3.9364714328770622,1.325742004394841,4.181089420824433,1.4161778082749255,13.049503088948642,11.218257775216882,12.335899128530073,3.5200423981383944,17.07220146966291,12.217490635539683,13.579784319662366,4.159714509380699,11.44407531126927,4.153283104153576,4.689280679775374,13.329992676332715,14.422966473604184,19.203610888876604,8.811486339111783,18.336634963804762,4.667013748799671,0.17177769056059056,16.65190043760862,6.566995443932173,17.475051885069576,12.734616418969402,5.839945765438763,17.46467544479403,17.05383555169201,0.42661490089789034,16.98141309929699,15.016857821595742,10.269858057157721,16.918002920177866,12.241231160692232,4.08252932370385,3.3428921080712204,8.217349260894625,14.594735339251788,6.931276528493777,2.704582493297396,9.610436079479886,9.563734266716079,0.9131901649232876,5.531038179153147,8.267914680356947,7.2376775481394695,16.32110234412369,2.558175156045981,4.846174887644161,15.76729190545497,17.964836484117498,0.8343603736016147,14.736533257759765,4.797266849120203,6.373001854762621,15.65878374110806,14.641088560519524,18.794941517627734,2.8538004511923454,9.316945511088758,11.118203362394938,6.002326547397057,18.169166022896725,13.006851607752195,1.9058994774726123,15.6562034722838,1.4500611506486827,2.9176322272665667,4.381716031061811,11.50870233396386,14.577455778379598,18.999370188578357,13.81149401835858,12.430509254459125,19.313480288119862,13.30429141816615,14.255974978926282,18.660816883238084,13.453156046014225,3.481166295699172,15.85404370332669,7.135869546348119,19.22956021020521,10.731191712668684,4.3214873106285046,10.052713447440924,17.854579440771424,6.2034779058959755,1.338503511970952,6.87153055762312,8.747877385575888,15.635398028597042,2.767476904933206,13.896720392712027,19.14635591820456,10.372898263948036,18.09510281487187,3.4538424680104773,15.105770334187403,16.240883047427154,3.6133807674229024,2.7708495500736596,0.7287779579291342,5.421537439273019,18.773228150061072,1.3622026396957532,14.651028874865645,5.363650410349279,12.54814945292782,10.52060046931549,12.631405371755825,3.5158368635948456,1.641184414879926,9.22986951104705,6.7528061313247,6.323228726980572,4.17230497453871,7.9862624521319425,16.910703560281846,2.5527863844323484,4.094245433772605,15.846754982468472,12.590920109027062,8.465188235854178,14.450838834137976,6.6282539585345335,3.6074247317365904,4.0946464114635495,8.987333107602296,12.436306831233113,9.949950543051425,6.881967565455613,0.23975372781534166,8.867949770777358,7.505892513172969,17.8488301479554,6.205574555265918,19.387580127149818,7.340302080025158,9.873544845182888,14.852045659982958,13.840812624495445,2.159888305144686,18.112492105696703,16.846967229725212,3.3867262583376334,19.663810616413294,18.24610907168197,14.929019002823335,9.741016808203927,8.263041979295412,15.108632978118104,11.193592290614479,15.522162493697804,16.150022059889622,7.219399817847547,12.939589444635914,8.698977228086303,17.986772215039338,16.90573437731588,0.041439196072623474,4.82772682868811,2.439645211027366,5.443151757730713,12.780328639203171,5.689268526272513,13.738188572820036,12.099961118379262,7.874113145312509,11.176246985732842,4.439845730756522,14.149214623749288,17.949948829571674,3.19281087512973,18.655291460832878,17.381360936469008,4.07020362021536,4.6436129024640715,2.643280368194678,13.50385936254828,10.496450933971438,0.9516574594654648,14.889412953467186,2.497633639019865,5.677035278113496,15.156583556952574,10.18310248450681,1.6284183039121247,17.392980031457242,11.38073076308277,19.435697976619753,12.091150579422143,5.319864337364324,5.987521233603381,11.078795384898218,0.6023646621863765,17.07569484201684,3.0106394997473718,10.786479441024227,1.0617767587631866,18.549047435308612,14.020750864344356,1.900954932347041,18.91248945235442,15.14097864415939,9.039450546765035,3.0276883861136517,15.749188240371002,1.1146220618959912,8.6679617427022,14.668251212020266,9.90078826234483,13.898060491041285,13.678556969329424,8.629689842565703,4.008827585080521,9.413246290025285,17.518889098137237,15.13859962718374,11.41186886407787,17.5928677033089,4.510297491042259,18.322954109693796,10.681508778089652,2.564098306775362,19.64373052775605,10.351338142771048,6.517557893069594,3.102622102772621,1.596629540697494,4.709211954799359,10.582657335645997,2.442541899891437,19.86676177195513,5.329114998390181,0.01307500156340069,19.40250342273567,2.311018268745837,10.296962558437537,3.2329538684291848,1.573548736182202,12.486962224116231,10.56431558156027,15.94234139389723,9.752891120013887,5.074567065824387,7.548508795150002,14.807063140144558,6.57033886471448,16.229058731366493,11.06976938677465,8.072867236272682,19.391640882304102,1.7564560620154168,16.198260811319642,13.924447905564122,7.015904583932615,19.438199475323415,2.037715273045637,14.895581087095842,18.47925628772888,6.656893834759301,5.018752719082582,12.958415278026475,12.999409459190412,10.982541747728316,16.877562931545455,2.8908375591139857,3.7964213589963025,12.68468560499068,10.153425891827395,13.106750885355591,4.1522573133812735,17.22691456944398,7.106723728918101,0.44366742056821007,14.570634357989638,19.559533934318182,1.7644719791171593,10.002683238190961,17.08112383292148,12.733782107088443,11.618229556224113,4.2433667778086415,6.34742289837015,12.673285840940554,8.98937049485296,15.753979929689805,13.367940629375106,14.558018496972549,4.332793840497131,16.900461764615248,17.832257817874485,6.791843732967662,3.2641933733592854,2.667720602994108,10.131054927457889,9.537489572451623,12.710304307627084,1.0908023242694354,12.64207072331014,12.436979224242904,17.54493867538895,15.904252465064083,2.6729532467606987,4.447637131266218,6.7398099954208845,16.66232420204348,5.456111593987876,1.4606339052649053,15.267859792338365,19.281957818316904,17.136255354239815,18.801285448522606,17.74982610492273,19.102834286677087,13.153257095734832,8.793788761155309,18.9351298079913,1.0893801154007798,13.911955939636794,19.121863914805846,3.192472043561345,7.2358098929199155,1.8907109604729433,17.02300654174156,0.7594182715069531,4.084685868749274,0.472786682252333,3.6631062266842873,1.270332154981082,7.257236467616317,0.6366508295248963,16.632307425926886,9.64382466129213,10.935469708566913,1.6948028862837106,5.284143666036347,11.507938081372933,9.328774276046929,19.809988947697793,19.014930971330912,11.609748376722688,9.227249669910695,19.753813828622544,11.726097196730327,4.227964355673719,9.624196723599052,10.864642095565756,2.111103153179754,16.494721578082448,0.6865436488075582,3.275666874578058,5.246359094096245,4.986898094230967,12.06899505497731,9.049492878666161,8.10286363306954,7.219363416253928,17.643900099055834,17.50274048295275,16.79207745093744,10.676731184192029,8.477623321941152,10.876793846985592,13.338224285615357,6.500966282050453,2.815062492927334,10.490543264193487,0.9288103396527836,15.097305264779157,13.403381912766257,18.156126844953327,9.71141131074733,0.38152531859732886,5.640442773290251,1.167879591437,0.0099543020288273,9.543445940873415,10.450351422301495,18.14806485693634,4.3245456344407485,17.95216338302712,13.814160806268504,8.392282920234893,6.426244390547002,16.012911124254718,16.348561275259527,13.464244599344465,0.3077894192719466,5.221042593865959,13.578502935919108,15.196016876813697,2.950742917819573,8.714512082495244,4.459091396285304,1.665249271277478,19.54728171939529,15.03065433351265,8.384484647965621,14.580772930808049,7.632062749891468,9.841118174936906,7.419988239973354,13.293666056591285,4.424261377490102,14.696862369555163,17.914335105981536,11.032419799558184,7.313859453298943,16.756880817859997,6.676605998347416,11.791502785917585,4.203499590995583,8.186626869153265,0.7740637642413617,4.981199698848475,11.256627788570878,19.56744587607588,17.723148884632263,10.066369201666285,9.443876572941905,10.001862041128945,0.38124682492346906,0.7610872523329215,7.58001039750567,13.761176357058279,13.54138690929644,17.10733734404934,8.349500624596327,10.196444083192349,12.8794499244965,16.256803736917092,10.792560256567363,8.142810242729418,14.817859338942597,12.775876388809642,10.625409701545587,9.849619701615184,0.9980712504078149,6.3257828804214356,1.0637181095762083,10.929810988182478,12.897418047313858,4.242904529530054,16.0840396864292,8.320445363950082,14.497296388648323,19.78628221680956,15.13685593674223,16.775633081884877,0.6841274510103679,10.494862498835008,2.0426224083889943,3.3148497512104624,11.954224178703381,4.431369344948379,17.867440619692818,1.2702600924135687,10.933224223262243,15.533660051917426,17.996792147091604,11.079068241822183,9.301659850804711,15.147420304261487,2.089825495214659,8.021089778099855,11.01197899791105,11.011085905808336,18.792971923392837,0.9768726885696122,3.36350068443259,6.224639071800007,13.277277720128193,3.4131813448783532,5.297738690459957,11.015844151832411,17.039912016223614,19.90362697315338,1.4641598116234267,7.288854130910192,13.120298120709135,17.083172143955228,13.389017325410414,15.474777950228376,7.8647680918803875,2.017962519686969,1.021189837616987,7.661738671575948,6.387225873702769,8.105512552222915,2.1998472393011337,4.985399329406066,14.206027938962848,11.886254863913749,4.197963566592251,4.801217971744474,6.831195406437263,2.1497633733811705,12.63995779141515,10.865032586082727,6.268894127471567,1.9489321076556276,5.337566356696777,18.81280069736757,0.7850105345399916,16.070977257122088,19.88674800118349,14.745150884830815,8.880819093528327,10.93577845308793,8.853647125490687,1.4090166207599886,4.393043765626481,15.552348340569658,18.59662502388668,13.531445749324673,7.159516837052644,0.1160351378759028,2.7225487840231066,11.58553002434859,9.822687055433303,7.42532300078393,0.6255101864374746,19.724124025157682,15.182965206836482,3.6031715240994977,18.68896914549469,7.518770848947782,7.721323515428895,0.37365781592062053,16.219615258615722,2.138956956706086,14.42645690637461,15.932292866816976,16.68980958997463,13.22699087288881,7.820635628456247,10.800664462871229,16.54157239835111,2.0475653255137027,1.409172210102052,7.206520893191715,7.876950090681638,2.631773421087704,11.133421144391221,14.165450697454641,15.523672978890017,18.476418094817006,10.157847488704213,17.674097289140917,11.891353250214225,1.5668252898254442,0.9211276414533032,11.702161889851066,5.966673246077789,7.958695910331737,8.738213288727845,1.135724680931287,16.631832064204126,3.4361365192609172,11.870128627049269,16.47605531186056,9.287173449242365,6.36325111285057,8.627047711501392,10.866182749581439,9.743586326876038,17.025483208945673,15.745172046949083,6.454814078049491,6.695957789760034,15.277300163085922,9.9746267219468,4.274645117371079,7.831171811482451,11.413129781181649,6.1376943852491195,18.68441195608087,19.76373351589526,18.14985121234468,6.267555895351258,8.8995386150434,15.510640870030574,11.131959731462997,10.393728371560451,15.790875679204381,5.110678436497884,4.670098854425575,2.898966725417398,8.024330779772416,12.234651403060028,4.189740703646159,6.491386484972903,3.1386746351142403,15.063450683263362,5.5731559638893735,14.340497471864108,12.209575323682582,10.798777498017191,18.490297424713738,7.727612040370779,17.59931241844438,3.6814396956603535,18.81107933269458,5.169145168084923,18.246634473818958,17.987714874798016,17.292856997466366,3.135292841026187,4.988290410095848,11.22813346025637,12.303935820536317,10.409181793084251,3.415437895705824,11.21543272396464,12.027094660334203,15.189816048322298,16.549852955995718,1.2799958138229606,18.820067596505417,0.7762755073043826,5.888018166555549,2.7427112200480552,9.194137511766712,18.526785276424896,6.733047223428015,11.735675169824287,19.011433533492234,17.723767606140242,10.441513613449853,3.946202875648992,9.629128416805335,3.7020003158893466,17.58932178715171,1.9368654486271097,18.651619986578115,4.201622696639515,11.842983207965156,3.125245177066893,6.236348741781925,7.892479642717292,2.2183707756316906,18.873205062468017,18.837117406410975,2.6936967787997546,13.807322511460697,14.203239741412744,18.713157555368525,9.421463988607265,3.1589634808076683,10.179487807140205,2.112621149968983,19.105012720795127,7.960601780384047,7.589304155406618,5.955812810572292,10.851246112694476,13.350503760602614,1.7490467636106732,6.732805580596324,9.307449171901574,17.98698760345235,15.800570364220906,7.443217281129435,14.844439922044712,4.085219437849172,17.01740021741565,9.890653554810157,5.614177028575429,1.632821710167609,19.15790205431326,2.76363857896174,16.964925640891437,3.8205168060676753,1.5373725870048016,5.6812566279062215,0.30997099666391303,4.819147079421704,12.07557104890495,12.718450935884045,12.213313046991953,17.817676870137245,9.233582606672229,16.86530924701994,16.8519080158473,7.955537991781463,3.3428766066934656,11.876232282897853,14.122608668042238,16.88548107515522,12.197690497178634,7.668209676005162,18.56057092872538,8.153788237211504,10.99479576921295,5.753791361062057,12.365011659622951,19.77124751484828,15.136642674782909,9.181036654909022,9.355602090148825,15.876702771270988,11.515487650995894,4.837393667799996,11.769685415934434,11.295146159678385,3.4451517042549407,4.656734233235897,15.873915296872173,4.9586940233758625,16.54359614783467,18.543983466751296,12.452474478528597,4.824945278442869,5.344580482448507,18.946251712107887,2.104604327946893,15.931257502858806,8.921902043456175,5.1932472221187265,4.206403482345751,8.62062583575562,16.985732572833196,6.318043987234807,2.816974541991657,7.9632650123602655,11.982200975243021,9.544109607347231,12.114213679352307,9.808020806471859,7.159852789887395,9.937554538807486,14.316704075785793,5.508617396739552,7.585868343605413,13.062612422844339,9.378126006667756,7.717547680726318,6.343498096282594,0.8019709397202313,7.668231625331976,10.127420297370886,0.627450822532647,13.75134643162891,16.361051644752173,12.748967740014766,0.22470407562525274,15.266953521752292,14.349913709070616,4.237972208566476,3.1651255452393556,16.39723834311386,10.15220219998902,3.39738584975938,5.385952464284847,18.156257991570097,6.171866469349019,17.95271194774237,11.064465786841634,19.339040079402686,7.829588881189022,2.879738642663443,18.939267690623268,3.432508008817119,1.579030930416634,10.589599139715759,6.84924169365575,17.107090180955623,16.605132173709542,0.22119579407518852,2.7718883970970642,9.964412946511851,4.612267869816251,18.078973020651297,9.635876288344157,4.408194904203624,14.702628943070817,14.07731816684581,9.168046457868545,17.003477736609106,1.068327732109835,13.631608591596812,5.931383465293121,3.6068947939380136,8.186146617578416,2.6082516373789177,19.653325090792045,4.714845831827965,6.732542829256194,3.4915890736222632,1.664663983363659,18.910182303285538,8.22445835968443,12.620846166037087,2.1245971863891944,4.273340280747475,7.835973747133029,17.447093507902693,9.996997709346829,12.529352047041172,14.264079439816344,6.669451323172333,18.76604113520708,18.16696968246974,13.517661429038132,18.973567409861715,5.043493550030536,15.557193822829705,5.206594021093434,15.790439885027432,17.93328678126843,4.4777095031072145,4.578505204502341,10.120234327194186,9.350582376386992,7.275798069531141,1.4404240934776524,12.0848575923293,9.087721990755213,3.5066797012896433,19.279629395337317,3.3013044330750496,4.699594900644,16.345100190193264,1.4658573233700078,2.9631276269489204,19.13281801641126,12.470136961223371,1.5569759025229502,13.839508699600467,17.592229354223626,17.916515645889717,2.946426525678696,8.68920581946563,1.00108173508612,14.407601704448044,0.8919898539860727,14.45011500244239,4.391763831924695,10.364784170098279,2.310838318972901,16.73347309488912,17.262194372930473,10.45395405592647,3.8105579085202868,2.222497559618324,9.539498337736765,6.042401677545199,3.0124286780868825,10.246058151896683,1.6102114516021615,18.645391451754122,1.2839909239735592,10.017245711223289,13.755598701727338,0.7239307537463091,3.834445513859861,3.6539238612421077,2.9416786194869093,18.829181906936924,16.24759009236149,1.6682008309284724,10.13755456093913,13.538100270826865,5.777822421396572,9.972256333057729,9.65218043996176,18.50959811732409,19.454438071969527,17.769397354643317,10.3817450067928,18.4265120815844,17.960938171183525,16.809149818174454,11.24655508211129,10.310869339075461,13.1728606988977,5.058952659479399,12.478937541462777,17.02848089292646,8.030823287735886,14.146823820074514,14.335853717855693,19.809070093354553,1.7224838622084038,6.430930758377276,1.1052915748503267,12.74501183651819,7.353329523759831,2.9374860038449224,5.283044603255624,13.287788650677573,19.372978501158578,6.793434087702468,1.1522107717558905,14.058308456601111,15.17436105912882,7.4085282588110735,18.259519778244773,10.0868276570736,2.572284901498416,13.907847697275905,9.76837785975258,13.095546095166224,16.816706304442903,3.6542055642940463,11.805309938318288,4.8498611418834825,2.8801079642402128,18.334455340814422,5.314297407126509,0.7725403609676329,14.945224814036902,1.4601279363903341,17.009926924238652,6.207699740035442,17.47529604648523,14.36409682269051,16.165941730577526,8.311756912557954,15.20898059916901,8.44190039007724,9.454858451088644,2.9400479827549963,17.541868315890582,15.929592881466172,9.952440142379428,19.53783776061055,17.681243074592892,4.582075913517989,3.3980813099957885,12.853668117704299,11.024493632945788,6.035698217028438,4.511316662717215,8.290690162124577,13.359248145680782,0.2594149279429736,14.071442497378111,14.36662946919116,14.360127311021934,6.218224069290814,2.6924595268622786,3.6431437870092775,12.04506838136664,12.253599419171248,11.843837209244597,2.9348813301694365,11.203300287172961,12.909985142403869,7.508072076849395,2.5003817701808817,9.443298269144309,0.7559890753053633,16.311232542472833,18.551027375933103,6.355078583957368,17.078457052329803,9.030020342773287,12.20027737040894,8.005195117573042,19.82596890228549,10.381685640262903,15.805316858579662,18.326116114018383,15.686924964462152,11.984215398641744,15.107955966242779,17.579216282124325,5.579163490641301,17.591882935951265,3.445571611980278,1.7989526980166604,16.45041955896708,4.140693189295126,8.919883282620606,7.33265164748611,19.50552264785069,10.544243611492327,7.227268734879009,15.09633544796337,5.21896003247817,19.002740032773925,9.196797740144827,7.40517443705238,13.863097691183475,4.53857229924302,16.057655844315835,1.488328993691428,16.45393057239962,5.3283355819483535,16.311125178835397,11.017533611033494,14.545034463432284,13.651548691778729,8.881645300680216,8.449908030598902,13.382791565712054,1.7500212913263224,4.88579468802588,19.13260735813749,11.825999906094143,1.4571308397874683,1.9828838268146942,1.5691269378583916,2.610774737310675,12.641170651920106,10.002432737667926,0.3169414160898709,0.9042486536223393,18.221187424112834,11.15212652017808,4.699837827482898,2.023845914853304,13.417927528717254,18.416052257427786,7.498563263910567,15.16574827481496,10.634249503855,4.142276415358719,12.35974745389877,15.163624819369534,4.130781276534172,15.5024324933513,18.181175454353422,4.878685819567807,16.478824256527886,8.601715676051672,16.32324175723212,18.234972795137416,15.690873561634131,1.1802529657393501,0.6821703221120501,14.884538887942735,9.135947360161563,1.702131447701296,0.457546301356313,4.514091216880267,7.113083418555171,17.532916478467936,12.178671238130342,12.49772996566422,16.277058333197537,18.824211626817103,9.145277390517164,13.377461223837855,9.552636594326579,4.107707173306223,15.61041845213766,5.4284545150249475,0.6687936121717053,13.838908113722344,12.897381473108398,5.747022331295781,19.140032542921173,10.526973624237513,4.140888007315819,13.425220814503644,17.94838247321337,5.518705110823987,13.687965685712253,9.037749621191939,13.244748324705725,7.762939077527826,10.593070739477518,1.0821720323412087,15.14019540656665,7.851455834637959,19.224283225753478,15.738330905305787,4.47834807196152,3.387495422961253,6.640394172173467,1.3047211131499292,5.520018427221021,12.810591779023092,14.530632726617476,3.506960277284903,10.260381760099659,7.232335000313763,8.34782014372172,13.889202521065712,3.8647952037966826,0.5801909470464128,2.8174557384682553,1.0472249500298991,17.371572152751863,13.483593523504052,13.134286260966164,3.250771712374445,6.267373871152846,16.559828338176988,11.440784525191914,9.914966408565359,6.139423986478372,11.23663290680502,3.583585897906043,6.326971657542861,12.372615766392903,11.34274263566513,14.367448351946269,11.69881655271145,16.24124177793525,13.749455728334944,18.95427220302689,11.343399055833054,8.137906238900584,18.088746694263655,3.06785539906973,17.617859130864694,8.765576488843255,2.8580094158941494,7.9574567257424755,8.876689223073559,15.561044305815201,3.1616109519583935,17.532840453659674,4.038872312166726,0.2086384070812919,11.597961714804278,7.631726740582261,12.760147608785047,12.18646828493911,0.1481072220597346,3.3421178520946926,0.8437946207273717,14.631807363439115,19.852286041797168,1.0269541310125296,8.463308386988109,15.604375012310658,7.54932674550147,9.125214220513582,15.745642137159699,13.35617038098591,19.291535972231372,6.732934407765638,11.955845632730298,17.230400997989538,0.72814822422961,5.50171764934559,1.83780030293907,18.414770829146,9.472419030656614,3.045485949322795,17.0787960101092,8.06263302053634,11.0839666220898,8.254917522815187,16.61623509711893,12.230445981556905,14.560485810597541,4.068354170049249,18.962305478376983,7.853809240825047,9.466000579253503,9.510397904190807,4.274262207012662,1.1871651737336153,10.77622205625401,15.580373789751798,12.838232927691697,10.751219779481014,16.401725754626394,10.929907729011262,9.305374986623033,5.048917195624192,13.512238427201751,10.698561887619512,9.177241561699008,15.262129719697942,6.92721979541751,7.135370315286065,17.330538920669262,13.386412232626936,8.150145279806264,10.388064119874599,1.9350971324325927,16.906480076269474,1.8328711320155744,11.669769774320464,16.125209403895052,16.842038345112428,19.572885517832276,15.160964458793345,8.796268446050309,14.062784209455517,6.7357021517741344,0.32931114898429925,8.224063744380699,3.5328005628646775,13.530074617987617,9.46377072411666,17.40921358906708,18.425492128473437,10.958975266702758,16.54931779764844,6.3493015755213555,10.695240484537432,4.600297646084925,1.769368628918384,16.793670164783947,8.187382058910192,4.476354734329031,8.81970682868591,3.373704542546827,19.628652846830374,5.830184905395779,16.0555134167293,10.786375997752895,4.805121233104499,1.7059178110434159,11.33571714419006,17.901353613075997,9.160317465104866,0.26942423947777794,13.717251213600763,7.9806907377522585,14.663014590794457,17.015665052155065,8.438872963621979,8.160924724974027,11.15715216173928,16.94141765794243,15.682162583561778,14.504695640664117,8.792428876729574,5.591238261195701,18.612830515728717,5.015950955123785,1.478330218687316,18.000560920230342,15.872195892426578,1.1448824443731231,1.4842557406914114,3.445265995641922,8.309722342864605,10.967033537617494,18.83866441829655,8.10506918710395,9.724945188337069,18.690873971094398,7.089526771362236,6.830832343264719,8.37553647915055,7.053207117496938,7.377608936465427,18.764157447502484,11.806526415840999,19.63135008912672,13.760638364565917,16.795620740608605,14.36822935783657,4.821886468786034,15.797262239692795,19.888375575302327,15.947292008813605,14.14735817465878,9.402904942870558,1.9935041941076381,15.003968118966284,13.998840135076755,2.206344233411439,6.349301071158391,15.696910500508432,4.621252822626096,1.4319542390192375,19.819500588414535,18.888820631653303,2.369578334933551,18.259203836359077,1.3845300813372274,16.244473879581744,4.230281452716378,10.571806682476366,13.098377190742742,19.33445699107562,7.886028677187151,8.279984194174222,2.933037334449131,19.811647278512407,18.505964953703877,9.628244345597174,1.337201194763753,0.039939088315605886,0.45277484405637836,6.45593551913024,14.604298275570775,0.42523477449758484,14.039942338645233,19.589677132902665,18.8551858490839,17.819369968746386,16.524956533832786,14.951157310820161,9.073897938662343,2.4446805231798763,13.119574751154524,15.001776641494459,13.257220319377394,4.758497649370614,2.6884764548978746,7.799382160773547,18.50556319701383,2.9164852658752682,12.690399101961777,15.675226741765709,13.797707634646525,9.87946065472871,0.5810713214882668,18.691311350117243,3.194662847209897,5.581473649214965,2.2771931403872347,6.8058532012343065,12.424293067785985,18.287013213547326,17.407454221177762,1.79757606188085,19.93876879617593,10.572975271315963,12.810284470538233,6.693585230225976,2.1241307366311757,1.0590718567546897,0.3045375272894679,16.378033489262297,17.652813545719695,2.132924792184001,9.032125505473086,2.634425356091299,0.9543269514315655,9.138184294592886,12.613743374522294,6.9523324151409716,14.26864551724195,10.726872886895924,0.18196996948961264,9.582244967597116,10.557250942142865,7.166117196769384,7.093869255515384,4.5487344322527745,9.29276722126701,8.578092927192813,9.73305578381451,7.159880152332558,14.186110247623462,11.62293198453681,5.035242090954579,19.654435856032997,5.185813556959822,15.001858842200267,13.695881277767953,4.158489650069894,2.24209041650957,1.4590327791310065,3.3410923752647204,10.025528772152711,1.7053418178178825,5.885336551616551,8.36890263682566,10.839118391959914,17.440707762075128,4.077188694298837,12.305331609197992,14.397110823392772,3.037465352465931,17.747497209154925,16.442326006953355,3.1581347133500026,18.61274670980137,2.703684538043447,15.013372253770187,17.525249876303775,13.889100922282566,12.135368793562765,12.257814749796454,8.79241885513724,10.173976772515001,11.56333736596094,4.059025315941045,2.7212377160250822,12.215121332021512,12.25812487596059,3.954076653469376,9.926144950598935,2.6256567693389954,9.130803829692793,6.450504066890788,0.3761736958574291,11.910685950081259,13.848934159641866,3.8846141041071824,19.180626586019894,14.132777642783974,15.916651620731589,15.768886795853895,9.302885947848868,15.610226477216656,1.0916656238351008,0.9922708446717854,19.00710060127363,9.53525400631543,13.8143783081291,10.144233424962255,15.08298748195859,19.476656608416754,6.274271666844418,5.101074295229875,4.098435228093016,9.716781597865584,19.227659133876124,0.27649279330985266,9.403038955510228,3.0588287849081253,18.54041064901419,4.754762211152701,6.015225225425906,14.721876585832675,16.402762693733955,18.920156235902944,13.109443698125025,0.8444590920696848,17.74959084410736,1.3289643314634692,13.629083901781334,10.218310138223213,14.178141366609234,13.850156055661786,8.04294369718209,7.3969061855595974,16.50399767535772,11.158041901844458,16.04479142950634,0.23441750864115374,0.7172130319736336,0.16503829360010602,2.6014736169855324,16.26759622283297,5.320496307710578,18.45163537718865,11.338477071110198,2.98332191863536,1.5511357702906636,6.600160648182762,7.5059589362968815,12.110060390941575,8.274688679869545,10.719332703692398,7.05230965742496,19.170401905720254,13.373448594838191,9.953390892929752,9.514109930477485,9.971535292841969,1.0927126303915502,1.735636659750508,9.486634491908724,18.548961574901902,13.28923558444636,13.946611115136168,8.935480999972786,0.7035463986838986,8.405183547793378,6.061409590582034,10.49172461306416,19.69859314836841,16.234661244503737,11.463781659609928,5.169361655649558,10.251427558506464,1.5427730166439524,4.825440634552427,11.697400982946782,9.874574778022911,4.677395653177316,17.29569708481971,14.103256476007573,19.442747945515503,17.0587746603302,12.854271704591618,4.495901870902559,14.459979608984108,19.58602410949738,1.7844819990258864,19.89685387554134,19.649254812992325,11.244705767659898,5.158531216420967,7.398372096104899,5.3202661633387915,16.1941204385555,3.9122704292935806,6.978138035851296,19.768767151544427,9.2571276278461,19.180615518615703,8.513620099667389,17.324010061116255,11.839269583640064,19.32413638159414,6.608298965626003,7.407117874789186,18.005415683991632,0.1816537009787078,10.126064088814601,13.52254175338173,11.88490322796894,9.837793228374586,13.371697685987103,9.827174275636201,5.8157542846954335,6.955938757026976,4.594816521577871,11.56330874171755,12.896789259684738,1.9150116541892226,17.147801581580975,14.806775226261358,16.50826038386934,0.9525995834440426,4.30819046507537,4.455353646302593,1.904310854726523,2.1604447445591113,5.530264490699914,7.500578052093094,18.240237992922342,16.939152135550014,5.318656161394526,12.493504094187156,1.7472758601419036,9.95599921641363,18.71209677219952,14.985997548101286,12.649256218847778,17.773578199349362,15.693407085903303,12.560224543908163,13.248268709858086,17.79563090006755,7.550395621826005,2.878996462549428,8.069426309350911,6.896976601199092,9.196302136972697,18.086706740509552,18.189064752787868,18.662006813879685,5.293788020585963,6.074533749948663,7.397201617101383,8.741686921244195,9.533207633473362,12.005264978585398,18.160996018031092,0.6780072002608328,7.488285047118968,19.40315975059046,4.20064663564343,1.2861449977055095,18.839011735102964,4.537843944125686,9.449239554916296,3.1638856159725304,2.214369172938273,4.6989414863580725,0.5941010887326037,13.985350759909219,8.406894197315404,3.85722356065326,6.672722503166928,4.2431382949942575,3.0849566388728755,3.4207220283352235,1.893436307907126,11.843215599704209,14.90887970907021,17.428746810545018,3.942120466897916,18.598462531206977,14.816167799723608,3.9390450414679012,4.94559571006155,2.554801943816547,3.22150341082728,10.45003757032819,17.540185496170672,1.8574753165015645,10.2900052241906,13.5840856095848,10.43537338469073,18.848386595735423,1.2827527492563329,12.06521272096795,6.282666663204002,18.132116522878295,6.679210355757039,18.573043494941167,12.701399287400225,8.861070417298492,16.884293382820353,6.133589079201873,5.507944852550071,16.585192072695868,5.373660212101856,5.733838460750746,8.856861694199697,1.693375606090477,3.433422662876442,18.888191697947796,1.2774712767984653,19.58709438604111,7.360535662325014,6.323076457378027,16.02694875212428,10.929915114470564,3.819573307411548,13.029725462129136,17.942066693113446,12.384792168543912,6.295962197860976,6.887407576304216,12.61591157253632,8.367672388399775,11.475223937875425,8.60947432045251,9.74763539580711,10.846348260186808,1.397721630148423,17.030835765887762,17.07833785862715,3.5775662987144052,11.464815079299546,15.041977724001674,17.820994907915487,18.75364508066797,19.255730187651938,11.329504265241868,8.153658158859777,8.380354596561457,8.626586121840916,10.017761915025698,6.295876044146853,7.415055721319486,16.768120121825234,12.425317286012056,18.18008591093651,12.332166215925927,16.783593061114676,15.333181738493455,4.165998543195961,18.848640781920352,11.341067812126798,14.720910031780988,9.752600499480163,8.473877378501422,15.183109047681715,9.732855976079687,10.228400170067907,15.646152794875574,15.209196821207387,5.898201829497345,14.781774933780198,9.373324447188898,12.518042248801699,19.964417598208662,13.363445697608416,19.94439939632382,19.32923870715344,4.845486037375006,17.386610051536657,17.568469334920987,13.561577349642263,10.032091304884467,19.529139606238267,5.444455798214625,2.746027560516331,18.249912058882476,3.5212670071821073,6.877980873107163,9.747339120310755,13.54396051363086,15.77865833997497,16.697422175196376,16.945261842493085,6.235381249572116,12.001875715830286,7.066317373744613,14.337178073641903,6.84875245927838,0.5837392691963483,0.47370615753431267,17.33701922792131,12.778191200364638,8.31192954968731,18.012923923034833,16.335212358499376,15.790314095798257,3.7995951676963102,11.758797760808779,16.22717961389614,3.929556671164063,4.51891882843916,12.580033253142124,8.335372294670984,17.820634764408258,4.187133859368708,11.610657355517722,9.943279861780002,12.827266673204601,1.4209626225065053,7.764143458618422,4.10446866004194,12.729791428139823,12.914711740181954,7.759255551388695,3.5857256166305307,15.557084791134809,10.805855589862361,19.24885570923227,9.467469076731527,10.291304003032549,1.7739562643651219,5.42948000117089,8.757782946288057,17.164141727638246,14.852048328689751,4.09655757944134,7.960924989180147,5.708148915964255,19.850522937297082,2.750844245371704,14.120949385338829,0.26768976850454873,4.410825573840738,10.502173738133527,14.499786114437292,5.439237182852841,12.106769271152412,7.232197518563668,12.684590536107695,18.394342252022668,11.19851376447019,5.545622562006218,1.6320856341793055,8.730115637024557,14.959340149248032,8.666425266856033,11.982225821044143,11.506902463319765,17.46481690491029,18.181031055207868,0.8281008891065555,0.10265365261175052,5.688284093361156,7.4155821344865425,18.12486882252157,6.539145311190682,1.8640325400026603,0.7369463277648158,5.725605979230037,15.058460399537177,12.114133987514313,2.518020521323865,18.797903803916704,4.217414774276382,6.458242628112503,7.470364063687769,3.356342904309839,3.8438807495685134,5.4849503549149725,13.788348739867654,4.148552084057049,13.1505200429216,13.253431435069821,7.489190710456675,10.015394886072695,4.642795568140601,18.22233594687143,17.44753453783566,9.692880453051224,3.5061638783784366,16.887319057386275,2.391886973826649,9.773786902030617,0.506950615643107,15.29242565504314,12.85288703312975,19.111404339269313,4.283563792387559,7.165818971299998,6.961890317223851,18.478704511586493,5.243385737216681,5.959577008573178,8.742780727820456,4.555788892476649,9.09272576489852,7.94223915528697,12.59909780277538,7.330888364189541,16.2031241956671,13.813958758519128,2.6413148304333323,12.018944829021013,5.049160698641515,10.270661672319772,15.341477922472638,3.05103185991634,19.464637003564263,3.16362494183275,8.149006951211586,6.586915178366288,13.359864472307393,0.8616410598018254,4.264584313576378,13.991887619277431,12.224595703500366,4.577482002300859,13.888701157487176,5.142462271219004,14.008527310060913,5.653459226905979,0.2628373340473811,15.134963375026608,5.553447729766678,6.075711327908362,0.23529957016906966,5.3979501022800225,1.7694188766012076,17.937427993205617,17.983266174378798,11.051948949934385,5.3699415408224604,18.36483820169244,10.156397781888064,4.671080698866548,0.4041645642991032,17.25122686327736,2.3867743225403304,15.703459282738965,1.1224178588064149,6.795632595729,9.98531335313908,3.6605456705709782,0.6432236206132069,17.430931417853266,6.348605455675385,8.883568346482233,12.548933055662035,15.226298210190476,8.113127184201364,2.820674752475636,12.277751017573078,3.54708665528086,12.80621190974549,6.030482536566795,15.134415791376341,19.464686067131606,17.6980897199562,2.0920720726928455,4.021429864260617,16.15046092134967,18.563291566206054,13.46872392320131,17.17494275899464,4.840203046638458,10.04543838860966,5.028025566664147,19.9237724639068,15.90162844263416,15.301322474967192,4.4020223549536475,13.314991868358304,17.959887286725507,12.526973196212921,6.219622342785636,12.124540334955721,10.05601895197302,2.658484325995083,1.9110432716028036,10.306231025421893,3.9357717977821016,16.303333550146988,12.206542781871654,10.814223014496388,10.667475864859322,8.713680187442282,5.1870458466487745,10.103188475792777,6.968011268822658,16.520414841384145,12.692142903147609,2.0935124602071253,15.362642258598864,7.2715187583459295,2.696111412961222,6.60217566894413,16.261523276759547,19.664609664605823,3.536384192093629,5.591380784258146,6.95763835819081,1.4417460265732451,1.5472279874849004,2.644876112004213,1.670233969680095,15.73637128573321,15.191266187120647,2.278633714596956,5.7138551879572175,5.413962527072118,4.63251588210686,19.93316058028968,4.9271489713056615,2.5185361151796215,13.502999081503194,9.068200088936349,14.087071220796972,3.1175902441297065,4.010996787303069,14.73918998204855,18.389888469658494,10.432442357405417,1.8710005096670512,16.397738160390503,9.184498564393673,0.40759190095019715,17.499729252049953,4.429801381575693,3.079549290261241,9.885166237872998,5.619927390775614,4.9600395520417795,3.845282860589947,12.644942067090877,6.128919904139356,18.714971844303605,18.994607532078533,6.118762679111396,3.220100104487056,14.250127779498364,17.87522056008688,16.526949285801763,16.265267998545813,8.55950640566106,15.325645674937928,1.2026739706843026,15.444315700572538,7.937266602190114,8.550999260128886,3.964799632657856,4.4066097428633055,15.874917639550358,17.680973757552998,15.354212505812193,5.063508936288237,18.608001202655036,19.579449503581007,13.889466794345386,5.3330300333806235,11.357618912968114,14.781419188326353,16.808361074748262,1.079817149488198,2.7367621726825853,4.334375610681742,7.771220107875845,1.5545724657973103,4.450429821166266,10.485005885319637,11.38606764810902,12.456118340978524,10.61943142099938,16.984609093165805,13.8007292778159,0.6003523234917774,16.50212440086712,18.916048202326877,10.799461256434117,14.949828478025736,2.2783969507220903,18.957461157834455,11.089894536062985,11.00823512290214,0.31859607412289215,19.147127630932026,2.417766703473214,0.782823722743542,4.172550271665494,16.731558481813078,9.721982303702003,10.939854438926044,18.01986079296195,17.476434782756357,9.225064957180699,8.290531535537777,4.460492017884876,8.64128655022984,5.953732080124947,12.34776164727203,15.12711310192493,14.168931624126206,3.3466482002465314,14.873780915543765,18.936775305920044,1.3920809936259282,4.79645325617001,6.093127538426897,15.003278301851509,19.766773372856086,17.863561568569004,9.85824593469049,18.479771204192417,5.994396511212612,4.816216027974938,5.044337489201958,10.30733578345464,5.512560304907943,15.31621741707312,18.528710165892285,0.1396226448729898,11.171616532287407,3.698983670631235,6.69895762064372,2.608203126625326,10.750288239501167,10.825814001785306,1.3974104084795957,9.603121175832694,13.34017646331433,6.7253320804986005,3.318519344083324,7.63606095025275,9.490737384529538,16.843260913267017,19.0137516908648,10.741404952650493,3.1000762324455033,14.789247528673947,10.496058218049832,17.237500561766712,5.209477020612714,2.593436894802048,12.101830702495292,4.879748009928253,17.412821159542425,8.18753454709805,10.639426240066685,2.8481930134996025,12.189023181714802,14.661880086377423,4.344002354137899,9.517704402637314,11.398829051967422,8.248489697775042,19.91878821404629,5.872023254184002,2.8861085243447926,1.0494858022250675,5.401523244280888,12.03164907695848,3.8260267831530603,18.814237111433684,1.3408074358605715,8.120894506242102,8.373112158225172,12.846000397066444,3.761029491562886,1.550633207210237,1.9601848354969942,17.44837467653602,5.06606160563146,3.9629786271880763,6.652612940010205,2.767005504537985,16.41550248953108,1.89422932314808,11.638429669880317,18.587994010234365,0.9870779914807226,11.873229612591153,10.103219226694398,8.912838696036683,0.8157915814115757,7.97132105412957,0.02801340400961916,15.346387625998407,5.821350118172961,13.201627853350516,0.4286845865419364,8.767166151777804,2.9888966451343135,12.843439772509605,6.237888383194901,1.800557432276917,16.34505302384302,12.10275569092984,1.8701017710519574,11.512527230783736,3.293055964182816,2.545828621023438,5.278479698647502,19.241648601533097,14.40064345543346,1.6196362307411238,15.952451724941605,15.54890837190245,13.231314060151057,6.830113686529544,14.179255653520793,8.70493174020754,12.632346192524535,11.658639587528835,11.237682687284485,14.533116985393143,14.849719000004601,13.957668006822118,19.776196801897818,9.931825915203753,1.0972921684343806,6.7686566410547755,10.532978764014281,7.070875226296125,15.604041072894299,18.56685742735028,3.9640298553940623,9.571252754088109,12.50154905597074,16.026419369759918,13.752173320902038,18.236364677655995,18.626600832686183,14.74343590827325,2.7646363832596688,6.894601877736317,5.046804396792686,10.35185867064496,5.386700650628473,4.277270364858681,9.254717429876766,2.097172153675584,4.004791676927142,4.734310351826392,18.243659610262352,18.910025706896086,12.301444701489302,11.954443799086846,16.249537473112067,9.315713648847712,17.4722914497165,8.822838349467004,6.904282802369481,16.22805556624488,7.470902870293705,18.937608062169346,6.931232905109543,18.295324932028795,2.858079733330108,3.7584568388954853,13.788641541470806,6.665343178987837,0.3962287542400045,15.319899225874458,1.4614631991220728,4.56949720791791,6.166950838644429,7.424914985439659,4.759596434411675,5.870592649123689,13.934841481995877,18.986935858207467,16.5976019104898,15.43240171992065,16.0776236157024,11.653325659091971,4.563455525529978,8.965784680673327,1.4170754545523678,4.135999100774956,17.813529375202855,12.650977240292601,0.3155672468330728,15.761620539064317,16.822733961108437,15.639087858537222,18.775940692298043,17.724662234784425,18.62361367816284,8.586934561266588,0.9775279074542542,15.015381308032705,18.737098878970603,12.415735674131616,16.65335357470895,17.790634320413968,1.5093679872075372,4.059566188781623,2.2255774479060486,16.0437615322207,14.535197179808797,3.66596357021991,9.157617418685291,15.923271229807284,9.24697102746709,14.326300801450671,4.141905249512887,8.035866852113273,19.578474399449796,16.16630833770957,0.4816897252395025,0.10324749117256005,7.555337339367756,5.600933353929585,16.62984163090784,17.319247142769633,18.81346195005706,8.791352708843965,18.05342104977495,12.465415426838074,4.20314530759097,6.4082577852750555,17.209683861145898,16.454687187898294,17.17422965385193,12.176582345761378,15.16642991129261,5.424492240104022,0.8586945449803229,19.05610252860283,13.175675914343508,4.937339428120975,18.060767214198975,6.284271537539601,5.912184953402626,10.965388728832242,15.773788672735819,14.175906206960178,1.1727978038248743,11.35320224920823,0.44445718368161913,14.378355452720744,5.5745800850946114,9.258710439341296,6.692229701938479,10.083704968110002,13.768100656120872,9.003375500520319,19.198764408957516,0.6103463035973666,16.261746956344986,2.481158670757071,2.564889188296511,3.405611095036951,13.097759987840591,11.580056032727457,2.684497292030641,7.961703419616755,19.83508800746854,12.657845569868185,7.575193896756018,4.056988215239521,13.6114559762611,13.331779121716437,10.032626531780974,16.563794628473136,15.532378574166842,14.369410468807157,8.784675249319802,12.946525083433563,2.5539883932692176,7.718836570653522,2.800133592617544,2.9840751558667566,14.458444920344157,9.257642049811373,6.454759366663527,1.864285676855788,10.020360526742525,11.436016179617852,8.137007848085126,19.50233152572676,15.16971491150603,7.278628651550836,19.530689951047556,2.4451556070321034,12.957907129324887,13.36835277261827,2.595245859033204,2.125090709277111,15.154132988183937,18.686841721929184,18.04281767438416,9.830335660514663,12.219856641510077,12.395415323673408,5.591360382494326,12.209418043286675,0.9439746478594868,16.46154884879021,9.783780308510899,13.244040117399196,14.538630293123362,5.905337522709346,7.225805254404443,13.34753746002801,6.651072084763823,16.33115701055345,11.981259022113901,4.540996980661256,18.711449703937554,5.634446646575539,2.6893227398202812,10.54719694546681,4.213010539392039,10.79967557295574,9.488718319219451,8.841293681201453,10.168616753633719,13.624316526306766,11.434273685377425,15.761345168725764,17.52134158182413,1.3813224339779628,6.3408344758812385,4.547177359431425,19.60031224123508,14.1464589155962,14.33814933343502,5.937958277465012,11.88486853351462,15.742542285928396,13.542255629141637,4.236355082493755,2.094441683060966,2.806388443775427,9.315568879617903,16.312341805973535,17.81434205775813,12.767024746746136,8.675180449584614,13.551506393314895,8.676195732307823,17.228094189650687,10.958355497830908,6.5409495220451985,5.68053933098819,3.121871497801858,17.332947569819765,17.16602714343064,13.723685373914174,3.917268786890711,9.26685156760942,4.8616924317927745,3.904160069008822,4.656330700903579,19.203282392563814,13.304257263409678,4.262117024911665,14.01559964404781,2.545692536091013,16.23644302756833,14.910177867830914,16.931982103831867,15.841288297608486,18.61888032686595,9.243191812197328,19.540675562877126,19.267419008926666,3.66762281924788,8.61847294456593,17.77118808133281,15.7739189499258,11.519765784528548,3.4668997732936946,7.217366738753044,4.810026733717367,17.353387815201838,15.347597119034774,7.728316296752835,8.423053019674862,11.07647823564307,13.481235137284777,2.9554852075889393,11.659035319844318,1.1032601369164041,16.013720039572522,1.2702190433338734,11.903153985496061,5.7050694179074934,11.491607323494932,4.834884985374797,0.5105542242002281,11.022735831515549,10.803622705767374,0.5916993853568631,9.054984629610914,16.320647983014858,3.6756089071796127,9.042131295129817,4.3842612387552915,15.202192556969072,19.68323619070506,2.975698173667931,1.450551271527103,17.42802369904423,3.591723116463892,2.621413818274365,17.57196902420031,17.856312083392233,5.409742600247096,17.31121635752085,0.8039669900432456,8.149282334093769,1.7263223194274335,11.4729238776054,19.627185494023614,6.994032539904733,18.680755754432408,0.8636212860743475,0.36510062287033573,18.876130316847643,4.04728142368501,7.187555260872132,0.33297258688071985,14.507090284917652,12.798845491386821,18.374761214143696,14.945266321872698,13.195504859023286,17.01275731958298,4.930393145795713,2.6411402532303185,0.02752170051688374,12.7682179321324,14.169752647150137,6.693160441391477,18.393583174884746,18.43047938184204,4.310450982207419,3.381829711993838,8.132641388178659,17.049920252249184,4.602333185640597,14.844274494791264,4.924294988696913,4.855071541337672,2.6849458517022518,12.322580427586551,8.859598327434819,6.355351041292745,4.981986100468974,0.3456327629979583,1.3667002472488265,13.35301511791986,7.184556521130063,6.35030292092666,6.502794950117616,16.704847638468046,0.21512444579933288,16.358687746781232,16.94058392631525,14.583201306300682,12.691145790155742,15.682068375836668,13.999199808065486,2.413476934540224,19.478754333144362,2.795537435366149,13.967856406599562,3.6230665270141893,3.2127216106929968,3.862133948833053,3.0311450863408007,12.760514057515229,3.720781027227167,8.63600902433459,12.339100875290532,15.217077487997749,3.018116369920878,14.300994893780356,2.397072388943049,7.84132491478736,9.47935578408362,14.79076754427723,9.22978986763329,17.78025645070587,1.5546602318098124,16.119843466227984,0.3162939716915014,2.8828191509279666,3.178223405452747,8.234464085587522,17.181453345652756,13.820732484433513,7.292879081405861,13.104695458825116,7.2264404550957995,0.21883491873015082,15.603714568590586,0.47553477308076797,1.4740324706006724,6.650046014160997,7.898766856805386,18.749935564909354,19.94872247241947,7.524891837482022,0.9649166455977509,11.982930751360827,16.700974532026738,10.670804576449612,12.816325106338828,18.165135830107722,8.419572666914776,13.5893878554519,17.20184671867276,19.342078270412948,12.915071615576018,2.0763122356274,19.754124976861295,7.785386904074509,13.26840495665679,9.89567324673125,8.54617844700373,19.91273826408658,15.00477272945079,4.670737168396664,11.564365778656738,16.63085904435741,1.8146184590604175,5.630087752213422,14.318259064986467,3.093918340157451,2.7336200089012275,16.311731364006107,15.61800273043826,10.037496523106512,19.05776304342584,15.427764458361995,15.008259693691436,6.2230728559870085,17.982712937377524,17.010219686768693,12.101514648310276,10.979029790222397,2.9260218617041023,18.653754839490865,2.1152657933154995,6.8385890034754615,15.769429324575217,1.9325995393970086,10.272137303792427,12.302742250296017,13.270617139547163,17.553407079357104,7.3195331824860554,3.789219324620965,5.704812610969046,0.6422330472043303,1.2165422679110183,10.759336340360907,17.67677035602301,17.25012504788883,8.243511224131899,18.76576806651492,10.09815288950235,12.753198944373679,11.025992834204853,4.791561558476385,7.160796538953713,18.557714877395274,17.020905213407076,16.4744153966728,1.0754105741580222,0.38176331995094515,18.24405863589495,11.952691443610144,13.019563093180029,17.522747287449047,9.164644673416941,13.357132325327497,9.80520667835541,2.0192864605895577,9.58374682124234,0.9445387973915587,1.0269540029765878,17.16500013615026,6.990089558067214,3.69773130556454,4.585657890096808,9.971441020610232,10.040502114331801,19.08013299495562,19.502650548164038,3.4159048400118364,11.993237731679729,16.809472106222824,11.250000204651847,18.83635364067858,18.362098675129964,5.576026078628358,9.923620553682383,19.15144433373171,11.192616120253064,12.845613142349537,3.343431632039029,15.757638684994069,9.929976273038093,15.676040012778856,19.929865613055767,7.585341910523273,16.155467846097,0.31586863824102807,3.613875862698901,10.034926039012992,15.848002693360126,7.241615348667136,15.85324728290769,6.873929353722503,0.60382298701946,12.456174164020828,5.94177418708925,19.62384919366039,18.410206960501696,0.9409461591928103,5.75349866506881,3.508229254701063,14.270094724154463,8.17058787857083,9.240161691046183,18.485720310751496,16.967953646409168,9.414670208165417,2.3348197592154074,13.150850020218282,13.077790051503575,6.255408888596974,11.165204739425398,7.862043418241678,17.044485066115204,11.596781984593125,3.894695867079876,1.3894674074945979,13.154419981420133,16.39382835406206,11.804063462724287,2.156091023260651,17.319757709388227,14.199798795579227,1.4402955568212628,6.7040822635794095,6.750299337699928,2.037094384168543,7.679608127517992,8.279192957213839,11.340114483975828,18.02858385716792,14.280177724978277,4.044842704657832,19.595381947496676,13.492685532292853,17.081356932442464,8.284260730161401,6.0279111720306355,6.076794077872587,17.007735397139857,15.589886197324727,9.986399986780725,5.147431264868416,4.2899041076741495,0.07189236621275796,15.358743390237567,15.313701752527962,1.2928481641031642,10.765627383597764,19.746537477417803,6.668766507193582,12.449923722630615,18.42382995374086,1.9174688066778156,4.015003537481547,13.15111942016375,17.460706675653732,3.422091652376311,18.65099244097172,1.5909215609711813,14.663997608939177,17.045647642057418,6.202015447142153,11.667292026582533,17.995810052464776,16.891154200739397,17.934245785300064,5.896627210378709,3.083956161957162,4.79783795888129,10.330146582522444,9.086458826298891,11.810209553384574,4.739060537283208,9.348100269248372,0.1875358775911673,3.749606453750687,15.809164758739334,4.882273824916332,14.78794736223152,2.0823791743675946,19.517703913538167,8.567003486616898,3.482644076755097,2.330457967908308,12.752944629258867,10.733427481902979,7.83501212703527,6.537100041614372,14.87726728691818,4.799432238687653,1.9844746094484567,1.628759101891042,15.988304802583047,6.656266861978812,15.988762047902378,16.594428174908238,15.359206077206679,5.297042313074516,2.580853676362569,19.485721386003526,7.289686224924599,9.460606398918632,14.962215265790867,8.43407151894889,17.26430604820748,4.762267398396323,11.493158214954438,5.005569640841903,15.170799682854149,11.272143809171453,13.400537915908322,13.70229092854335,17.187985967869306,8.762843607097096,4.964861997762471,6.198630298560324,15.760728788570141,7.26769677366883,16.693180834293955,10.654438511673128,6.870676296112079,9.66159888159864,17.388259435419474,11.813567162429862,19.70315634725701,10.917430209323467,5.955262115638162,15.342188039007919,7.096706303584166,1.6327096064917868,1.1143193789886485,8.673312597315391,16.17324070345795,0.4162840053318684,18.285685558048645,17.52947307288305,19.72512243202118,5.137264236756893,15.87271891790536,18.120787533736934,16.40817956303998,0.7199024662209963,9.256571934954941,12.768844281761469,10.88853523469461,8.541987025327739,11.360329085335135,13.24525410795134,13.351937429976326,14.199193703210442,14.432198846736469,2.6032228577448535,12.339505210939432,14.10261421738686,4.091908813335445,16.09953099889411,12.958383238711981,3.4349556872473253,2.0491543946879975,6.96255685179298,16.107132146971562,3.9630294031085223,9.444200124982798,2.0154063984378956,4.889651809456481,5.27292242218016,10.976928547056088,5.756195252611387,3.0379490444416257,8.361167327205266,11.416725208899145,15.14998632922583,8.16935613505288,5.167103904189396,1.5151675654586771,16.68206837141721,17.379633824741223,18.21820810862567,6.355260684354391,7.503972490859536,10.849018063287833,3.6266144396723066,7.833602050907191,0.9260036329203958,3.688633051396293,16.02629236801338,13.760010342186892,17.132190928773646,10.764819300258331,4.581544028835478,6.700450186801921,12.81449274139877,13.894968187528791,10.289850624077616,18.21674563760031,4.706345863943344,11.115295755070878,12.475582826162848,1.6549507213824377,17.787716159546548,3.08998542758264,4.215727270136664,13.538597726712993,17.8578342004854,11.840430189605161,17.486827091008177,19.818308242735434,2.4058221146542014,15.167316991380773,7.0912435061451795,1.422739473161898,5.364048782332969,17.727744018548897,14.064308862440251,12.932366308009389,18.56088564379956,16.631689828201655,17.378845369927948,17.136435344383525,13.108504622830237,18.353367467742192,11.848616733656371,15.937438603623626,11.169582020613763,9.692563649464084,15.357782475328872,17.391672274538298,5.073628970577411,12.384519178263776,1.24287993435384,14.253980725223286,7.261107079222069,18.760854905182825,6.879918645602694,8.523519787254706,8.509120324798015,3.1714817500805825,9.46140478709777,11.808937219924672,2.522166941908277,8.929505775184792,9.94060754838439,12.37592692278184,4.811870725898975,1.0674711342842436,7.56069662436285,15.051927428724374,3.545834993679855,19.903977831317732,11.435897536928184,12.444776384658178,0.015947748099249814,11.525767878720451,5.467491845881982,12.920587040996772,12.692358599023938,4.134297314029833,12.856528291392543,2.908608610064114,14.91797201150884,3.5071214271484275,4.10419861206802,12.636932954701452,7.642742454358227,16.489487653821968,15.664613850183834,19.189857735501235,7.623722222626621,8.10317039273925,11.429660494546932,18.021738669822152,8.635563093039531,9.440759190723341,18.979952439324958,18.996792147821008,7.614042823116458,9.081762242370516,15.523813657474793,8.557678045008084,7.200102865704614,1.2620477068790192,1.9767829675739534,8.810585600474088,2.1143656901142283,18.720360894088962,3.3571913869543923,12.3537643487203,13.526701123631938,5.864582140771661,4.773338538213507,12.910187272951092,15.105720961827842,12.91199405611739,6.307282746454099,0.3835161263347553,12.284715763225051,3.097386543073455,10.797120772537934,7.550524100159857,15.3650372975309,1.3239258187172354,6.089768727346203,3.2083731120474868,8.122812826984585,14.802969279591935,19.798914663703155,13.743794283931017,19.114130022863904,18.77625498515045,16.28301636007422,3.3265137853964033,18.856742243373688,7.123519372885907,5.488614829261471,7.934161946075249,18.189853737996078,5.347946234760688,0.5668849643040419,18.215098680727422,7.236804190501336,4.681993776035074,19.50261561655381,3.1042565278456236,9.460527453214155,9.845212470487406,11.629932349034174,13.868000422294129,5.809694001030006,4.545440352154153,11.487256833685118,3.513705265516589,16.251498021169176,17.193979134421827,1.1636803607497193,7.7066554635453555,3.2699472733741564,14.93988132250497,17.161921457716875,18.526172052131482,19.634465824168537,16.79621494856388,3.0505410981110748,9.315363624533358,12.318400022774863,6.749237347163182,17.29509766313264,7.807635025668609,11.627760431891026,17.895837146790047,9.784829722143611,2.817656283037415,17.10220180049278,3.59341037064719,19.527487970065142,6.49010896943321,3.7883598686788966,18.055771454387482,16.727125057498057,3.2128900458924425,3.082582715244846,4.223989371744228,12.153789914426039,2.3445965186978324,19.710936294626187,9.627201372881554,10.49124919070476,18.127984152945,13.439721811155078,14.974370880935947,18.872113719969747,15.66409008309703,12.543676305576419,11.390805705777769,8.738838510756315,15.715463713826022,13.630905702874166,8.592559323865686,14.644589335150338,10.714384644629042,14.003211844465255,12.982407570090956,0.565756002623603,7.697887379814534,11.693911997732855,18.232479396159317,5.2491564956618175,0.5649685909450275,19.475064568557613,13.307637106190079,18.006699219308402,14.37255352719185,1.5423474514658508,17.618819116463055,12.491797331897745,13.609841720038332,11.64275753532042,2.138156802919684,0.9229743218915853,17.648828230569773,12.46355892708392,5.5305850772989995,16.042068126725386,6.417640645357996,17.271950341673108,15.349267983161514,19.011681558537813,19.903352892572563,5.265861183593992,6.850530155261714,11.608055352430714,19.78824168571417,4.033820032890283,19.809286809229842,8.312107024500905,1.9269376194494692,6.531063779750745,19.71718285039991,3.5592833530785795,9.760622287734954,2.712844244310033,12.26418069918942,13.518142522582131,18.892554082122878,10.237454168147767,7.860853211679486,9.99381235008077,2.083770782429073,5.585449278742387,18.71020728169959,9.213161826716899,11.436169212349832,11.628650198002859,9.388426246805889,17.792170233433993,6.48532072452205,3.041936268943388,18.87983967382192,11.392478925750208,9.4078510945786,14.428500141267397,6.2287677488035165,14.328472275934644,2.4734795794829756,4.502058659950077,5.008250458869621,4.5847601665278415,1.5370839863527053,8.82629749479447,10.952063814728202,9.220862406558101,5.102368361884926,9.900679420027556,12.5775257671524,2.6623856886472375,17.031786173777434,15.428023576049137,6.14928848315587,18.846133050804234,11.760225926136645,6.545060793842974,8.833147099201536,19.438104734188215,19.01310353540197,18.381234833961866,19.358491992235308,6.632109773580677,7.064982638801864,19.781106386923447,11.740585538729675,17.910075451058862,4.1595633839588375,14.123854589616641,19.1578753362969,6.272158232603333,19.988026383995315,8.531053291480454,7.725166201422198,9.612409565555854,16.526975755177034,17.926661473804486,16.390609861722048,4.100991211755991,18.151481356493303,16.708698378446016,9.531200965586443,17.35233720396044,8.896052111186625,11.585256729495086,7.657458821831122,2.4365831622714484,15.86171435200422,17.856260732684582,8.188223093013063,4.127283053838284,12.971935347275894,6.842046763181253,13.409332675125087,3.2432977459607937,9.745423811916059,0.3689370872617115,10.950083345539108,5.79796349268122,2.25659673694095,4.721549863435901,5.353739398495425,12.078488261205163,14.30795591962144,13.823696737748875,13.622075487859888,14.34699053788307,19.897885321226273,7.378946472457697,0.819274919923112,7.814467211158789,12.077440190200296,9.901352828418748,7.61846902171095,15.395694321760264,3.999391115105584,1.6559222812493957,13.477924013912649,4.362154964729128,6.143367215142188,12.69497621508673,3.8990718899477894,6.888652411013441,16.03221288765267,8.738288767744669,3.1910567325824513,4.987601455793342,7.470420739957833,9.046944709074767,11.791217062029492,12.619150817076147,9.771823685411626,9.900362744627014,1.0915067897892827,8.042137386505583,8.720424988321604,7.835526763439291,18.12122229009478,7.1176563544942395,4.838169666082166,4.362239857511621,10.904772331813595,3.102507631957727,19.134336759635243,5.759080102980776,13.96833200755767,9.253112104567203,15.897932003810759,8.564755305084635,13.344807332608116,1.5159382713051217,7.72878457874326,8.500016912266286,18.690167803862977,10.088584409443534,14.327422202113862,14.670219334579295,16.64973642399572,0.8139990377410022,7.043625049278712,5.198526607551739,7.593724104314474,0.9175523185245993,0.6506063374068738,3.4223564115058203,2.271974848967222,15.290699034902499,15.326715334969677,10.832513431320944,9.660573178396138,4.048224770407294,6.645968305884593,9.855517963995446,8.249942261160754,8.376927190042181,5.387089818486102,18.263144124815014,1.1555889331033686,10.087049503892459,2.8644175724911625,18.382649957394207,7.446202699899751,9.336881959161879,15.106729057914263,12.998356391981382,5.426217341982462,15.930476205078094,17.863241707502468,10.695970728179546,10.060299252405605,14.702566983970208,7.076346922920607,3.5413847206765814,6.23672904476698,18.969620998702005,15.657758093431111,1.589425370512303,6.343094351975118,5.282281026574038,14.567971092059757,14.34954870980687,0.9358016493837074,17.822431782119423,9.211877034334538,3.6655500933086183,19.436683527672237,8.837846496255185,12.004992278423142,17.418065811663737,3.2627759679110513,14.413090209629114,5.5801919004000045,1.444124867713672,7.206847040150239,9.55243527008211,18.393047710440676,18.135224897206427,10.291377880496903,3.7463003978270892,9.554265298646488,15.171097018787991,0.9096665147120708,18.90569105739428,5.134422195939261,19.39384625754068,11.047786693142708,3.9113410585614794,14.053364973728865,1.4889386573750674,18.91936810186526,14.18924777898814,4.7322928994779145,1.52597706242235,16.49343281651946,15.537870721419207,16.586573852517358,2.3006320358992793,10.106775054564308,17.316642722872615,8.20222198533438,10.544004588344361,2.8115527908898175,15.551246289467278,19.13027651855412,14.446248792892984,12.968714463616223,1.797122904898285,4.0115902747224474,18.24280884516165,18.471104901745154,12.672495897896505,2.8394421358137123,11.650859292222947,1.4408970002328392,18.920453887883756,13.920562220775064,2.2819623530165156,14.290561018187011,9.718084647798978,16.52187299713542,16.241598103490492,9.191521686062426,8.854352477758214,18.124534802761055,0.36591442297797094,2.404409897252129,13.921662156408793,10.111272818217408,12.937073416421798,4.1887707887728975,6.847753932166256,11.943565575494688,14.273774523253078,5.573260918954022,11.441954496159617,2.6229400774218936,2.8965661101233176,15.159562491791787,18.142609543163015,12.964195032834827,10.135917487659775,15.999567814105244,19.44396471221055,15.30644876467349,6.709749927052586,1.6536341079342476,6.726606792604857,12.067766455129746,6.913966212862417,10.963023919766663,6.16546108081113,15.130473127717678,5.0298572308882195,17.479953063689496,18.752065471933918,14.91483397358607,14.219584482394465,17.047532704974728,14.468825589237158,13.502511595811093,4.515986914988606,0.6399422954782974,15.809628279562515,8.296645144150862,1.199699027388852,11.839723359646687,16.90552771645598,5.0042539988236046,8.893904567650575,9.316732589752522,0.18223642967132747,14.22489679705269,10.292480840102138,5.03955630294016,11.59072350312655,8.2891835221161,5.11961325003246,13.797073413500943,6.66317714617779,17.898782058457407,7.178625191025714,14.980432710974751,11.858462713296616,6.794005641500918,8.74275026656916,12.659426842484294,10.35279692592383,7.387629154452728,5.893787937851607,5.880068983938189,14.462904132463983,16.4564208461968,11.819520197621936,18.84656948234397,8.012895610959898,19.01127653712859,0.3123061644490477,8.99745945285494,0.27877600966922156,12.363538617858826,9.300946554843037,2.4967424411061367,11.991285698664754,11.165368210562416,5.686162042454392,4.628641497040329,2.1363233724894526,4.620151569160349,17.01062377336523,14.18874916939699,15.175920213588675,3.2687936302691822,4.407784042480722,10.429948508142633,4.227894100500222,13.934488156398523,8.822128786266319,2.8727774271425366,14.372672096638283,3.5708249986615215,18.441948435961784,19.03511853593205,6.165971576095255,15.124945862699759,1.8339365983221123,7.630995484006564,5.960912301319041,15.657945704819154,1.8834714124659335,19.234968995417763,8.66555259312047,6.99009868555776,2.186343956473409,8.138589532882872,10.692096644556536,2.3197182917601067,12.453971158278065,13.730191564156007,10.509622475445184,12.71430854399279,11.804237880442479,0.41412853867855315,12.563855302944686,17.028308897397885,13.058569759905234,19.869879360701724,3.98011968916268,19.59815157862449,12.477985948103601,16.044109176788275,9.245728926072129,6.852855952110035,2.4247947040314166,4.028532276972925,11.413658993358444,3.7564991587300867,11.96353325739711,12.24159968888127,6.704948239941131,6.026126731831418,9.739984867097542,9.130175418584754,0.16576171326846634,19.332361414345737,1.3858198306893232,9.425496021339548,16.893022123096394,13.213135674992591,16.786046332452216,4.69754136615816,7.943905579775055,19.408086225244713,1.0030606988032487,17.04135704317004,2.2321653990037627,13.944287411378093,3.134220278528357,5.1599141647824,14.451250340921774,12.542079449967702,8.95106347280803,2.2304695025921273,6.56599248379822,14.861839562277828,13.659805555529708,17.354879231407303,13.4056556879009,19.612512270777167,4.152249525489138,16.106311337069243,2.112707655919994,12.306655499014823,7.478028824097027,1.4365982437526048,7.18505054079813,7.560717643129573,16.547213755873752,14.213415499760377,19.20024869398935,13.008798232126546,4.552301006516344,6.679718571674398,5.475979744553414,9.520393337465109,19.925737713505086,8.385259845247264,2.3414153015886274,16.472823806385584,13.14395912322249,18.90804718025192,5.775404639379005,14.963318027325293,17.513749690557518,3.928857415547906,14.414589722056155,9.676122423894533,3.9561388030422195,2.797363556485797,9.833603440755724,15.187104112505715,14.06069650352844,7.613767377005809,15.405309518963936,9.924953511119345,11.986609985796388,16.98121095594162,12.192121689555329,13.56125467305835,7.7306725567201795,15.902156457455447,0.9495916385767433,11.953531711204732,4.8428804863412145,4.038400757531386,5.562587601086069,12.808014677468918,11.125106055577941,4.915669898828807,18.772928483100234,13.460871396631466,11.58469079370625,5.56783673703642,2.430993956048737,9.058597360313403,4.705981102662,9.47894256276895,19.379776036339308,17.086110477286848,13.69465519684467,15.287382782485812,12.488519895392432,4.931647427833097,13.418003003826398,12.018721934323079,10.590126145282387,15.252800909177067,19.516797785034914,12.058265713251352,2.4292360115320655,14.585749451227837,10.650997404667958,8.794192632069784,6.398968248990018,8.839630175861002,5.829117613902959,10.820689552256045,17.272467480305174,4.125651995141597,1.8754177714886966,1.0235764377430412,2.5682078171214417,6.60155678155339,4.620756759587006,7.863500475268959,13.415802656971652,1.3819939520281688,16.414402109032615,15.530346485118486,13.421118613590712,2.9264285490315345,0.8856226313074211,18.328319499077676,10.752468251210324,5.3995425835149735,12.792661958438325,2.876513074566991,5.075432127434443,16.286323811546968,11.415271344923536,10.567438794829904,8.77716813285816,10.958816822283154,10.372380385422986,12.046999503919412,6.680355163231884,4.3295139437978225,10.351492041516114,6.680446838565808,11.721169293809673,16.426944595831756,7.767389226796473,12.51990290381421,1.389649412634113,9.506045759606888,19.01163199529514,1.0439783620200638,1.3847259649944377,8.709890166723042,18.432795417362623,2.1526459012755295,9.46674846544334,13.768278128163129,10.59728081840114,6.45216170557557,15.216186306765236,1.4439322734588922,10.079290388053458,18.686966871003943,16.27034728530466,6.91399014780711,17.32857161030425,16.826514065917216,18.90808432856155,19.74823895410981,6.917262575484853,12.596655218173026,17.057374182153666,19.539249782743507,4.245460304326367,11.765534813650289,12.303472556096278,9.777985603622469,5.078625302170576,5.918536344473884,17.95498093867327,3.884616686753102,3.461444885495677,8.60834202674846,10.25277522546073,3.4670100832038653,2.7995660804007994,1.2532370404691173,1.0657176113994948,17.29097371083249,2.472377830771766,19.08821583921509,8.367846330020852,3.728049381000589,12.175188948865646,6.789386753377866,4.933838471667036,19.53845092411288,14.34144543982561,13.537715939058138,13.696286716093727,16.334581423295322,9.939522875488782,3.1990329411315255,17.548199644735462,10.466871352044711,10.027508552753801,17.824684691808635,7.966428150859768,11.349079054373327,5.047693956218109,0.8904497172479164,15.800751475763501,11.908388362986827,13.898100628747443,11.456766162684175,11.607357639900604,7.644570131517416,2.4678154780622075,13.001944833357534,7.306568738861681,19.26179295301091,17.155697875241536,4.059234294916774,13.171804548700305,18.21446165949485,3.774421995993098,12.317458938521861,1.0355064754690524,1.8770591581219653,19.758011313004676,9.634748411884285,1.2161992852356374,19.574733421247696,9.801609746756196,14.069714656396282,5.37647941984563,1.9454001636092366,5.967518956210833,18.39630068570596,4.818683916218771,17.81654398461951,3.648767094347467,6.917278589279765,16.352791404562804,3.4159954902492373,19.03091599419016,5.69846548321622,3.8447904224209983,1.5447847647354784,8.038553094025062,17.022652366479093,7.743529348363665,10.865909378990125,19.699252134187766,11.378481656440256,1.5636076546388367,6.707436678765832,6.382401401877904,13.68836427743426,17.915738645754963],"x":[-0.16352585027616284,-0.147418627829924,-0.23605062565708645,-0.11277066930993063,-0.054236227370006884,-0.05190654428265473,-0.1741023954404598,-0.26359718806611165,-0.1859924604240334,-0.13474095575453904,-0.18158620366385858,-0.25129104313319994,-0.4872267752829539,-0.37470443674894505,-0.3245156843279542,-0.25852969831974515,-0.3381368077314728,-0.1643282593434433,-0.36119062521337275,-0.12325221568181055,-0.033088199772148275,-0.1343430526539573,-0.05504161705352095,-0.2732362384374398,-0.14623990844146262,-0.2736345635877876,-0.14671904276340064,-0.004708662494523397,-0.004335323117043877,-0.19395742426745466,-0.20982466839671454,-0.42286838772113233,-0.012150974267532977,-0.2987475758446406,-3.900850550486723e-5,-0.2573143004324847,-0.31942215645634076,-0.3502972507643912,-0.09111900535222328,-0.23043804345289487,-0.18164667836013793,-0.23988522503533827,-0.03412853812634975,-0.22523172778662992,-0.25008755194494114,-0.41051421307255853,-0.3772353521971432,-0.2155649489636503,-0.009121105920072647,-0.3651574877501589,-0.30358767199338776,-0.06336371272543762,-0.03648270505400475,-0.33924369672784926,-0.25710451356830744,-0.13306673730859853,-0.06786870564201064,-0.0435594318110929,-0.3138286235248975,-0.018318934146362875,-0.320645205405127,-0.19190014967964797,-0.1971157526956011,-0.03815582080209734,-0.31354211560767187,-0.20017422061277912,-0.14372231666107715,-0.40191149900286716,-0.22471898474831897,-0.022643548552412684,-0.042203655942901985,-0.2807032650065492,-0.3984065962359705,-0.18543252090459927,-0.30835030322874857,-0.16166199930148595,-0.21550012802816365,-0.4774991138128579,-0.4120648780535555,-0.279512865300401,-0.16234147654227693,-0.1706747931914414,-0.25760780677465756,-0.3157310938772666,-0.3746120975323999,-0.1738680258982902,-0.04948504095342565,-0.17359377772925066,-0.4807201345972284,-0.27152523475873735,-0.4231144742917323,-0.06919243795805385,-0.3053302995491788,-0.17720608382256353,-0.43696855670666745,-0.35612155982707616,-0.14960063561246284,-0.044758164922803156,-0.09138690257722348,-0.2430392822646391,-0.3138732880377788,-0.1170222831541311,-0.29494556298054986,-0.16454441286420596,-0.3808308001859858,-0.3358026986583974,-0.2918118915571535,-0.07448214337021342,-0.3329599755341748,-0.4986304653010819,-0.16504896192938212,-0.14910760704496018,-0.1453035170441319,-0.3950441685076007,-0.4315576362203498,-0.4176827289682796,-0.2734061379109276,-0.47802732163889883,-0.24351831305082594,-0.40293457172518643,-0.22226546658012036,-0.10256929645138457,-0.3641380381939612,-0.3572453223730522,-0.08529091004283451,-0.35924577589683626,-0.03133431735631198,-0.45112693553987226,-0.34909718147038604,-0.48426232509050104,-0.4041376022971056,-0.17844638925133982,-0.10596220591054817,-0.2129168449800405,-0.0971266779052693,-0.1437394981086525,-0.30514117652469475,-0.43017502480045866,-0.22627994957393438,-0.3394482889093777,-0.16456768315598602,-0.46807331559553655,-0.27227566560728067,-0.32783249198213493,-0.2771458514980917,-0.33144354068307935,-0.151700077214025,-0.10888368706221652,-0.07741427126523748,-0.3639995054034292,-0.09380767427779557,-0.22763560670827543,-0.07396839269621092,-0.053254490526015164,-0.09469015042132778,-0.36538464950731897,-0.4208623534802599,-0.34663198275165574,-0.3975572738550929,-0.06822402998437616,-0.08008045543127262,-0.1429310967661298,-0.33744641066230385,-0.24150287044575147,-0.2036719786986102,-0.3425563934186312,-0.22144469210446505,-0.3679931128922893,-0.4296168486575651,-0.10616101524607036,-0.1247337238832158,-0.22242169339280327,-0.13254289911331907,-0.29883537054787435,-0.09511883520653264,-0.2124372315093802,-0.13526716838819697,-0.4876992388991952,-0.2042610639129364,-0.33704061186818535,-0.33288604994956394,-0.11751702341328008,-0.048883243429583056,-0.24514406605576744,-0.014284564747751638,-0.0032892936776293125,-0.12641215087696256,-0.0880913204415027,-0.299919819472657,-0.4575173438417308,-0.10984962662731268,-0.059126306559291075,-0.0030919816627938967,-0.2792004871437235,-0.31555163355228555,-0.4227411767828141,-0.4932855959603438,-0.41667366741528367,-0.43911168485163776,-0.24257567131432312,-0.19159889445487577,-0.4091787253742689,-0.3079536573486614,-0.17421709842009658,-0.2075180511944822,-0.16173501728993556,-0.366839176486502,-0.06814047842820836,-0.19730754075147205,-0.07896142939855899,-0.11489928709000452,-0.07276289572623573,-0.3770577537080919,-0.19274484205058662,-0.374705401673986,-0.1649564408801365,-0.00612148897705822,-0.04871985086832664,-0.39183762309862513,-0.41240898178572916,-0.04967417865410961,-0.31335495398029445,-0.187778743913667,-0.4538392858846546,-0.13744818073994736,-0.12480069669318039,-0.20595116653128853,-0.367063237407967,-0.1108923423853414,-0.32967137561476234,-0.1458041436805093,-0.2519777652260433,-0.2783914791794574,-0.321503498170984,-0.2669949298348885,-0.10442798684179178,-0.1903416911946847,-0.4828504014937689,-0.2289603492899639,-0.31964119425209714,-0.333648810047257,-0.42474065093461355,-0.32139796121925845,-0.1065982313078373,-0.2963133935474206,-0.11171928481005133,-0.26522555233565537,-0.39975437208394116,-0.4186031647184525,-0.4230713260343526,-0.4711396280037543,-0.3746412776591793,-0.4941193594596772,-0.22431756606183928,-0.0909301092654885,-0.204040581725204,-0.03242208994512252,-0.2339126165757518,-0.3403602231175662,-0.21704065195432243,-0.293123008193623,-0.42549278871391305,-0.4867063266017594,-0.18585713726930575,-0.1308502896432706,-0.35327944448766024,-0.023822083677765615,-0.4796211562430426,-0.0807071537402353,-0.4457875433662236,-0.4224385898974151,-0.0654681916051002,-0.2998792932551667,-0.15168277655469098,-0.00955153848735546,-0.29407193216403515,-0.47549729817955944,-0.17488725232974556,-0.25773778525778834,-0.06517522810916798,-0.053240841044902565,-0.4515582139385005,-0.28301873749779805,-0.25844142491608335,-0.4264599898188489,-0.14355503437157868,-0.46851690279314984,-0.22207629756094827,-0.12126631035138391,-0.17890886685901686,-0.02511523227923218,-0.24943204430700328,-0.32706631052059276,-0.10382219482441368,-0.41335129728461417,-0.22375505768902515,-0.3676002159672974,-0.16314911896660544,-0.02562919984915002,-0.45054765724386736,-0.31226109026297433,-0.15074321857439665,-0.12024481240937024,-0.21849947663805047,-0.41206277858676943,-0.31336699243951804,-0.09251433031784917,-0.11564065850773275,-0.04090473521865978,-0.37523267401676896,-0.25900507170134723,-0.20359984545137022,-0.276237177407904,-0.12442199225953565,-0.24687971269096198,-0.3061757621822947,-0.4808111765961476,-0.3165413537037135,-0.08848548283047031,-0.12013973439741354,-0.15414027688278353,-0.05572599752287133,-0.09563905613882384,-0.265607022675844,-0.4213577260334932,-0.11698398993420656,-0.42798046489479713,-0.07665293463173173,-0.027473982492510873,-0.40272818950948286,-0.04174631195595724,-0.17094863190929377,-0.17988257257318874,-0.011040146796572503,-0.3300714932770653,-0.22404415848318704,-0.35650404972582306,-0.4866737172561969,-0.29686251446323875,-0.11947568328019675,-0.1014587089069019,-0.27377051614593984,-0.05550868864614622,-0.3147542556163775,-0.23755603903536204,-0.030963179390956608,-0.25222378072555396,-0.28975614805324945,-0.4508540130031191,-0.07504516551323481,-0.015889074552792648,-0.14816058553687483,-0.13847843096631718,-0.2248584919601797,-0.39992508113115843,-0.18966347682123375,-0.46732435001797645,-0.419086938161523,-0.3118669156849815,-0.27752903141593166,-0.13222686603969713,-0.2154270226930851,-0.024564061902825896,-0.3768072450272879,-0.09987604895229818,-0.3854043262985848,-0.3291176108960868,-0.4299014774182477,-0.15200438347297718,-0.042667681253519274,-0.46270119869403215,-0.018285134593940544,-0.3415762135138932,-0.49398711188283095,-0.27445142557851543,-0.11429159854720772,-0.410610746640649,-0.4172339412611805,-0.006066361682696142,-0.04697615804681998,-0.006390190306807653,-0.13816567612127517,-0.11707166336744235,-0.4967295914158143,-0.28410788947886645,-0.34337566207575976,-0.21583956871149212,-0.1284717013841553,-0.4741067610207038,-0.2747019042973221,-0.020551521365219427,-0.49273706257150807,-0.35756830138885465,-0.49541316415773606,-0.48204405783971704,-0.45012760268454555,-0.20960060075674602,-0.08920999546593655,-0.31511121158841404,-0.459124467529203,-0.44926175145004865,-0.4381110939730217,-0.0010501155032295317,-0.45030372674829044,-0.451524526984572,-0.22814716336341778,-0.18607933995626158,-0.17600859317974138,-0.0073798587132672955,-0.4183184987030544,-0.12711741043907088,-0.32281711229745613,-0.1457024863828822,-0.2995348904444335,-0.24599914366230125,-0.0521103536166696,-0.07630568579290586,-0.27781031824805147,-0.1543321443040011,-0.12078604336302667,-0.07665262292841934,-0.013063175072725808,-0.11350581527403736,-0.023267170473659338,-0.05181043178496425,-0.42976802318916396,-0.09475432070258727,-0.2751572968011845,-0.06627781124927479,-0.4945186431020693,-0.3037683710859752,-0.36494745890361513,-0.1336107295049762,-0.10967856476958826,-0.19802784980272614,-0.29632349020336657,-0.41547269725507396,-0.3495069139103093,-0.20718090587993554,-0.4326406443448355,-0.17706846541253185,-0.029193190140430314,-0.23899172519197143,-0.4791398448437777,-0.23735329394487448,-0.115141320931887,-0.3143693028054412,-0.4851553984143311,-0.19218787240965662,-0.31365895584223713,-0.18232932670001134,-0.09997006897264293,-0.23430912142239635,-0.201979020156127,-0.05567749847224157,-0.22207449365436516,-0.11474788942675729,-0.25868178024947963,-0.476147416195173,-0.04068918389452281,-0.29802416756215244,-0.20800344168115859,-0.319388529362841,-0.08388688674241207,-0.12364382308343513,-0.17923924535849622,-0.07929044646315475,-0.20262697816362152,-0.3039093969939385,-0.2516055660406211,-0.034773434611580445,-0.2054001026227018,-0.0644045762784865,-0.4748681072690124,-0.41019472036561255,-0.3216344678649936,-0.4528601852740024,-0.03483762267136026,-0.17489815777827677,-0.15664031137121026,-0.4837304127687866,-0.06159541834299753,-0.1451863671110858,-0.09040651880649275,-0.242801850945368,-0.294234382668778,-0.03407831735328104,-0.31895575812592625,-0.4349804230528612,-0.2859156690395255,-0.0027393495109035992,-0.12524654892582487,-0.4169123821021866,-0.23368629163172094,-0.3275670107664136,-0.11838623638953127,-0.4813015042074388,-0.3354921687030433,-0.15380153877825165,-0.38860852210510766,-9.382659308765362e-5,-0.4154824061400454,-0.17228364568545074,-0.4291269458108823,-0.31000462296624254,-0.3647432613990509,-0.06199341887499554,-0.2396900236521462,-0.4707782246615635,-0.4392165001605407,-0.47582767671456083,-0.29510509245960515,-0.2220874710071311,-0.26829479359029673,-0.13339319182987708,-0.09465929701452214,-0.37983343388487967,-0.15334160441594713,-0.2585047831929679,-0.2283141697511104,-0.35481978732801045,-0.07836440491717134,-0.3479278698022399,-0.005693400802360027,-0.20548851642975163,-0.4853904279915997,-0.489425687120721,-0.4615398505429864,-0.07650666750580037,-0.2849761448894903,-0.4612683891442141,-0.04148300633344271,-0.3095636955959228,-0.07416346902068238,-0.49913194681524364,-0.42658040959016685,-0.4451390015024861,-0.4291459735315306,-0.047611693164301694,-0.4167260522256838,-0.06916125055303757,-0.1144880241114401,-0.38632048619477655,-0.20686044270673853,-0.4852019074743926,-0.03389422180614876,-0.3697604694512633,-0.17404366787598047,-0.47603065633413355,-0.30848806207825397,-0.19152078544089557,-0.2353949143743398,-0.4361237903733213,-0.31649511671258157,-0.17470625478324897,-0.07140540600320522,-0.022813222867844596,-0.032689321903340285,-0.47000297136733304,-0.33828191350572534,-0.07410237180108503,-0.002830175007048852,-0.36078986378291433,-0.43209054602517105,-0.4787284081705132,-0.4362358125056216,-0.2054404562016071,-0.4832843436753065,-0.38024682176630775,-0.19047487339276026,-0.2976066985333652,-0.04341551146765377,-0.14752330877350728,-0.07394950582399706,-0.36045739788581665,-0.0898214850635537,-0.1525699342455501,-0.16877884948904276,-0.0772742361828137,-0.26268672988668973,-0.24253927604489756,-0.20479286718841294,-0.42502909483037,-0.23684305318067578,-0.4755948427925587,-0.3066656667955201,-0.15037960284886498,-0.3711393847823936,-0.11803935511859165,-0.00027976699606402367,-0.32780887495349853,-0.41874220240743576,-0.0007738795069375248,-0.48966888375903694,-0.4835533044363097,-0.47425926603201773,-0.3054548883527304,-0.3532438935908029,-0.12381127026950478,-0.2431431887937462,-0.2975096350959765,-0.25824615618797386,-0.03261553170327325,-0.12770158735865622,-0.0589852699596638,-0.019518536141828413,-0.10491421466882445,-0.3781716251012348,-0.2164339320432651,-0.1027817593834115,-0.3579947632631403,-0.3693659550851799,-0.38178288015373096,-0.4372250689674948,-0.38571436513243507,-0.3759030552901669,-0.12459512774990444,-0.08991727834025887,-0.04387837491608748,-0.057878861776770374,-0.0670546897575498,-0.1732186920498091,-0.38675046900550725,-0.35644686725658925,-0.12059436755014508,-0.07352976513931897,-0.4145721173172807,-0.21315343758915717,-0.12854567342683898,-0.15615296492391728,-0.08481751759738654,-0.2928711634884873,-0.10881018780409857,-0.3161246046230517,-0.2873301232048202,-0.45490754365196207,-0.35889505775836394,-0.10397251949790631,-0.24327540916752644,-0.15579041809424243,-0.16895970297545382,-0.17017806750775033,-0.47219173014631677,-0.3814154900067771,-0.39399165952524007,-0.04358740855527643,-0.14479952864311074,-0.245854119865194,-0.158821092735156,-0.22546235170615903,-0.49682585271266433,-0.40351990154892337,-0.46032046012954564,-0.4672480576458763,-0.038379272135082854,-0.34994823642861805,-0.18748141109737004,-0.05932535285442375,-0.3443775224166008,-0.48063299939351467,-0.16011885667641268,-0.3075259952997885,-0.40295063388738195,-0.439596846444434,-0.3783800864168386,-0.22374172292233274,-0.30280775825207973,-0.3935201328696598,-0.2965769112969182,-0.33595087813369273,-0.11317769535515831,-0.29290024234904954,-0.15649696225856924,-0.2046013707596388,-0.386833353457653,-0.08511207049323177,-0.34029637820800585,-0.032877659287997685,-0.11036239124805336,-0.2492019988607871,-0.2350047539132979,-0.3924527847368877,-0.2978679058798489,-0.09933655276609621,-0.024161028717640254,-0.13842725028899683,-0.4780935706550168,-0.3329878770026735,-0.33560329227611374,-0.3510646620617607,-0.2556745960259035,-0.318286137315813,-0.08884337161998324,-0.020365436217985144,-0.07522770251047939,-0.32398323071590696,-0.41469267739836513,-0.03752585359101723,-0.2279832839561997,-0.49659546217019357,-0.2973687804535414,-0.2926954615245898,-0.2940345628946418,-0.32167208697804517,-0.32003120969750465,-0.044956515575962586,-0.4722159744478751,-0.4338297439667588,-0.12466968366027498,-0.16286583551942158,-0.45653232719754355,-0.027629472273037248,-0.1268132033908096,-0.2514501181790231,-0.29260433320052937,-0.4371906194485923,-0.44346695423523175,-0.01267925005079451,-0.058860938435248644,-0.1568276289581182,-0.09991261326836987,-0.07080972521762274,-0.1126580153266149,-0.1574062070318374,-0.34813386383776834,-0.12164116207024356,-0.4425766630221266,-0.012344239610764696,-0.30547148159556214,-0.39136756406954887,-0.07949133552827026,-0.25684248751434624,-0.012197943135063505,-0.14747523670779983,-0.31954634472685606,-0.42226674449470547,-0.2099079641006707,-0.22897132373962958,-0.47316332299559627,-0.30487634604160363,-0.37721826531999525,-0.10488560827401694,-0.09400401028271321,-0.11558015182954762,-0.18486032889565696,-0.042051269954002546,-0.05277357001994687,-0.13419368296020706,-0.10322821869924281,-0.15708061951787833,-0.3989891067588085,-0.39371825925616866,-0.2946708331034432,-0.27190740273177116,-0.08359682242357569,-0.30489275294060403,-0.08382437490544103,-0.46343005800520554,-0.09489535962809093,-0.07428497617302665,-0.29826906159665123,-0.39954830347384196,-0.30584788072955105,-0.09331195597841468,-0.35654934398715543,-0.08190667172261423,-0.3274720942829692,-0.18013625290047763,-0.10198388474271913,-0.36709035643496357,-0.08937655754581197,-0.24526105724457492,-0.1781904604152097,-0.08387658868057812,-0.29097353017581107,-0.2802570208736619,-0.2704790203888495,-0.2523690653772822,-0.3766229422357734,-0.3993670895937964,-0.09386300580992335,-0.1539866096620669,-0.43096811493295883,-0.3053514333806744,-0.18450297976696728,-0.06851305817509334,-0.08249832610600194,-0.2623447028274507,-0.49362900254257236,-0.04435404650444452,-0.03081358922584576,-0.08417656413798724,-0.4335241074588201,-0.10542450789127533,-0.3378161299919751,-0.18896115688903115,-0.1816234011718535,-0.2513721254033209,-0.008888731001890582,-0.2905395348684836,-0.40631415204781485,-0.13005321326764896,-0.38007670659158665,-0.28090458085013603,-0.10393301769891228,-0.2053037180126016,-0.37845500756413475,-0.2652093134822783,-0.3613486358822484,-0.37953086503925526,-0.14076973969699036,-0.42979822733180884,-0.2575897492019372,-0.34522710488261144,-0.4568599053731778,-0.053309200366749576,-0.06682536050661259,-0.27534701186595945,-0.2814166773859893,-0.02315561329144067,-0.14929655839362843,-0.0836666014277686,-0.1384566904960879,-0.22989263702205043,-0.08751789128930265,-0.44651499346589885,-0.4752879289904076,-0.3987693907963592,-0.42561607965987136,-0.11182308008182162,-0.132405923880637,-0.45099295774195547,-0.0038081901687523345,-0.029736308407611767,-0.35892463011428555,-0.4470162741281989,-0.07102238226358548,-0.342818898011934,-0.21452129269472064,-0.26780510207047803,-0.29887674562182764,-0.2821022611017816,-0.1094715740271931,-0.04588814925259954,-0.15139765721575937,-0.053040202275572046,-0.008378042024253851,-0.47821189172532896,-0.13923624713919525,-0.424652752375862,-0.18506962668484428,-0.4321327717468332,-0.10421679076152279,-0.20492505979001718,-0.07516157026374981,-0.037884881737018206,-0.35784304848033255,-0.24220026146591023,-0.3034024429401593,-0.20144246673232802,-0.08661324910787127,-0.2661498654211214,-0.32138041534109607,-0.2217639832406616,-0.0026276418327925155,-0.058926531287846085,-0.07473965522657622,-0.4628378703691578,-0.30533032091323264,-0.486831535356289,-0.050414392791290785,-0.020921662038327238,-0.4732066588767858,-0.29372410470451793,-0.2638610592619208,-0.04109690913337849,-0.38030495959143273,-0.38934737626498994,-0.15707140122279417,-0.44050884987201155,-0.035886192208181455,-0.35059221785550143,-0.2678826742559439,-0.05760793722447355,-0.48979322567629224,-0.0024730016814600297,-0.26927252901181287,-0.43209985157173536,-0.14978779532815578,-0.38534769207344277,-0.010034675093396062,-0.36831786369877895,-0.03432713413430577,-0.3543285249073207,-0.43488575857693945,-0.4311079819803122,-0.19414804107059014,-0.3123470311423632,-0.34683919965329457,-0.2703668420450057,-0.37577114568387415,-0.20907299506117794,-0.2326111347837232,-0.07816893572223194,-0.32897795671467234,-0.1920325759617375,-0.17921651704030905,-0.16625659101526036,-0.23741355127414931,-0.006139752060966064,-0.26295398359038324,-0.4403721707987811,-0.053637815054629834,-0.2763145073468217,-0.3385894795053679,-0.16398212545753232,-0.49213256560188456,-0.42016526672233867,-0.29247487610023026,-0.29812055506234714,-0.054836191238353704,-0.12712785070801902,-0.09096130467487595,-0.3636792401198382,-0.25078222166612196,-0.3844487986879095,-0.35184685736539245,-0.44054663682505824,-0.43555377299420794,-0.2818126777701736,-0.45116587843493394,-0.46892039980282363,-0.21553503703054322,-0.008457379013136479,-0.3881708790649926,-0.31834817781882974,-0.13951714994800912,-0.1427657097209577,-0.2340678021050916,-0.26132912102598305,-0.4021068927795257,-0.05489249699262366,-0.0012620017826745489,-0.3141816474266794,-0.046284302648522346,-0.06066889860106239,-0.37694104627295066,-0.2644554328319374,-0.04118017848095723,-0.2140026522800712,-0.4129631694595344,-0.2568717685005216,-0.24725056470969797,-0.21290622048243368,-0.3179648859034916,-0.4466816622214631,-0.061292864061585295,-0.42140997273196235,-0.10351835407691379,-0.3905730613969629,-0.23607951193596222,-0.12814075199717334,-0.06253922378288856,-0.36786157217848536,-0.04316562450626438,-0.04444985301687654,-0.014187046953765159,-0.002438522058885728,-0.46705119826889585,-0.47651630769188336,-0.11989185726723339,-0.14983168850561068,-0.1155552695697859,-0.4688505600208771,-0.2219888310629371,-0.2567237523529823,-0.3728879278135756,-0.42897293716768303,-0.2645114466811054,-0.4229111183549835,-0.10205216223752933,-0.242322891036706,-0.07018719325379397,-0.09791934547131798,-0.4504339427076417,-0.2353351634958284,-0.3291947183742221,-0.01729009371322343,-0.03861418920641746,-0.040080024802851666,-0.17032031128708214,-0.22344378211298266,-0.209836088115965,-0.14288362216043804,-0.016990399980941984,-0.030777406074148028,-0.4683133599424757,-0.3341665363683989,-0.47528828225186204,-0.016585367656877792,-0.2845939312234327,-0.37646758741745356,-0.23227484550811506,-0.09341956250994665,-0.05728380590136617,-0.13818881293107776,-0.17037355152794853,-0.4111471475656874,-0.0071154176323899865,-0.18795810165027393,-0.3123348277580812,-0.4271069389099299,-0.13190363067872724,-0.026222900740066613,-0.28161509103289106,-0.3193392936801772,-0.48867987819994774,-0.13040015782285097,-0.257101652706193,-0.010335188758733849,-0.16322609852295789,-0.3221178038638177,-0.341544398173084,-0.4300480359678881,-0.2593524595139669,-0.037838550682767536,-0.20983812944327762,-0.49543521017765246,-0.22040827556274434,-0.23014400102892252,-0.2644498123699661,-0.4665766181962554,-0.2609362999520545,-0.2633915407809727,-0.3820982027079528,-0.32727491056844304,-0.3096624006632458,-0.33112285993123847,-0.4725065231250851,-0.2775744023501927,-0.4192307615208294,-0.10709397514933927,-0.19047903435602087,-0.14982648341323168,-0.10201549836495438,-0.47588872622596534,-0.00392309819960357,-0.011121582450372647,-0.2723914111961925,-0.10648151119896931,-0.4485848906833183,-0.22038732294451058,-0.48751582185187825,-0.2458904490537862,-0.29690416387832574,-0.2162661326925468,-0.1663972848371773,-0.3995329377774891,-0.1768150401549331,-0.06430281195017462,-0.03037159380168597,-0.17421869711116822,-0.46903263648142135,-0.14778242312265266,-0.40799888647379734,-0.17089893583335358,-0.109506863219611,-0.0216126088299764,-0.18603573238294047,-0.37647672527861376,-0.004023560115126057,-0.08292801852241061,-0.40612074869569115,-0.3190658284707768,-0.09379415850292194,-0.0725685140610205,-0.29541736360932325,-0.22593477354877667,-0.1785794547091254,-0.18508660726460624,-0.4952414759539008,-0.12350647037623141,-0.008817837899090741,-0.2364398802367197,-0.15039562538704354,-0.08912475599952707,-0.428708740912639,-0.28091747165000613,-0.01521615007562327,-0.1285119140113038,-0.037015387363036445,-0.19387863290084695,-0.24221863800653198,-0.37920581899212735,-0.02809172831702922,-0.1774356333684226,-0.1969923941404389,-0.32723314605266796,-0.1702080107560775,-0.44222842233737647,-0.28339389986769215,-0.19327590668690608,-0.3046070998667233,-0.10035996709994544,-0.43802468629566194,-0.16580647200132304,-0.3343752415659774,-0.4858811753131178,-0.3787112301490507,-0.03734272333359312,-0.10326763440629705,-0.3358205551346134,-0.16601055298322565,-0.033486179653857584,-0.027620080193024643,-0.09212602680026893,-0.16227479129848243,-0.0877588813151915,-0.3015326873868279,-0.0975763742609701,-0.34002224029612527,-0.33808411717364184,-0.038350322377210255,-0.49491938311960115,-0.4080633452604028,-0.04636376316638102,-0.3739166187378128,-0.17523899470198268,-0.13291091125217136,-0.04020606252220227,-0.049089863735529926,-0.023614279235915414,-0.2527232976219249,-0.47341137781568554,-0.42406304775109493,-0.11866379108003888,-0.32035761181816114,-0.040617892879600936,-0.47240758344200184,-0.26501783635515375,-0.11363566438933703,-0.020858587183930744,-0.33367399934474773,-0.15874841776391135,-0.2109385662471306,-0.2336501686083946,-0.20558969619625234,-0.4234739357771734,-0.21228629512520913,-0.2612584950335388,-0.43172520186371355,-0.02926882221106175,-0.25607109644896187,-0.3994454687410308,-0.21688115741777703,-0.12632196005320795,-0.27123247163906816,-0.09650343785517623,-0.06156951610912287,-0.2339095331814991,-0.4573195140315862,-0.45219465607469556,-0.12514828862666594,-0.30291350741396295,-0.17721245070944802,-0.49095637208725107,-0.18220222849407053,-0.14932532186548886,-0.2654181374465443,-0.035891914801641556,-0.4583468192187985,-0.10959705026729216,-0.21221927599812362,-0.017852765260744863,-0.10307895421913071,-0.2888914283934134,-0.2870644485994991,-0.48978292833393466,-0.05175546867150638,-0.07657769237196221,-0.038386320331214585,-0.18445563590166159,-0.4076021343147902,-0.020857206606627487,-0.4220305836984114,-0.27034837623927965,-0.3768010814365138,-0.2525396355846987,-0.33269865025724266,-0.09952138833931934,-0.0969042373100596,-0.060464023884740814,-0.08677983113675258,-0.0019558067727355466,-0.4289493889369995,-0.45316776647057155,-0.03220026729089809,-0.0035037515942331066,-0.22538050278914867,-0.486848547935264,-0.16444531948750318,-0.1797715754267084,-0.2431806649415098,-0.1696299566704732,-0.33074896182048796,-0.09751232100129592,-0.22689523657015653,-0.04274639135740543,-0.4552797782806973,-0.08977958276663867,-0.12407910886149309,-0.02109922656438412,-0.0065418570756372585,-0.15729879593033214,-0.13889904255667973,-0.3622803130038613,-0.3187322992644982,-0.4997999067985923,-0.1332678149576194,-0.48828686951533484,-0.3125383577797264,-0.05051483199150364,-0.32284306034486676,-0.037496738616689895,-0.1776119985025698,-0.47653123949483067,-0.07241297883737974,-0.10775119268571809,-0.4585249401191297,-0.04258292588199153,-0.42097451884216575,-0.041201598129087635,-0.29314628521099884,-0.18873264935411616,-0.17798505960728905,-0.11530012122685196,-0.12455268025367916,-0.2908259030068481,-0.08100092881876308,-0.2642377240007079,-0.17538903397122962,-0.1938144800463949,-0.05918727273519164,-0.27376719448199704,-0.3324967659273317,-0.2927660139444268,-0.21977638693750157,-0.2896812483595236,-0.4042404111796356,-0.3494049056682009,-0.3796982938168577,-0.06760286351724143,-0.13200575621792343,-0.38380641481816924,-0.2649245474059967,-0.16479976703560262,-0.013910612013276369,-0.404395358387018,-0.36868102633004984,-0.29014111332030346,-0.16068286617031835,-0.2818498972740209,-0.4913684298424108,-0.13465498271580256,-0.4417585362876484,-0.38488767699229964,-0.08277373725229964,-0.2956822508643857,-0.34624897062769666,-0.308947837313038,-0.3572125432308475,-0.2069220184097207,-0.42798782027134563,-0.4307578558840156,-0.2639575943872249,-0.4938220319946002,-0.003230817696378785,-0.4878852877090033,-0.0053626102313644175,-0.17960030595979704,-0.07553770285181127,-0.2667412915073677,-0.4794488595090952,-0.15140098399261137,-0.20810195115107522,-0.2658520343734625,-0.25750322192299213,-0.37552000076421255,-0.05144434200682124,-0.3355027341595458,-0.11744480623591669,-0.42526303429552903,-0.4585242297630384,-0.33340780378270096,-0.49502213100417847,-0.08140240002711041,-0.4952424882613199,-0.36464133740995597,-0.0848885595411758,-0.23976466183468692,-0.31196987055884773,-0.11166225472769009,-0.11502000218862107,-0.38430220239591395,-0.04483464489496192,-0.2137769134478288,-0.4876959752131287,-0.36406127136698296,-0.06049696597678644,-0.22129809122394883,-0.13284225179412978,-0.485648010331064,-0.27546890132359814,-0.1020914278720394,-0.29334478529277086,-0.47653170652829435,-0.10604101864476068,-0.13256304790183948,-0.422538893368848,-0.448037167516421,-0.16725427557508254,-0.12060630593486987,-0.031789851961320115,-0.01563344402111566,-0.3546177905969998,-0.31375449001403855,-0.14993985833348855,-0.41536242209979335,-0.45621600174185506,-0.2374754235979225,-0.19537936833274339,-0.4154695104485735,-0.26378267832165847,-0.1865750714453135,-0.4330881002870891,-0.40328123045103814,-0.2927199438726249,-0.31513388826609956,-0.42216898510702305,-0.3127494551219654,-0.08398598584488304,-0.1984174083717113,-0.32024312482105455,-0.28132640534158504,-0.2325266694174576,-0.3517227630874451,-0.33204127040216,-0.10578697285267602,-0.1484189459830043,-0.3680958262841645,-0.38211678712710107,-0.3156772159424349,-0.05223533756366483,-0.07014932973012311,-0.22119562332449894,-0.35334547028937,-0.31297029179087477,-0.15075960223610696,-0.4723689504419649,-0.37622310589215924,-0.2361946560365008,-0.001223718330213286,-0.4109237103278822,-0.2571905581209448,-0.3863625944210376,-0.28126529357317587,-0.13065299608629033,-0.3413429864745009,-0.030683190130993965,-0.4856985152040123,-0.4301214380382433,-0.04766468855253936,-0.471075467243816,-0.2557938973908155,-0.17906510036631007,-0.32003362907616384,-0.49280555847678986,-0.30058060467514214,-0.4624706483105375,-0.21148171850211572,-0.40430973030288875,-0.34264469728597147,-0.0068559111859078925,-0.2841588916183666,-0.009209729479175421,-0.10722666264950731,-0.41129435780998214,-0.23722391710678425,-0.1386768558383128,-0.36754413925963003,-0.3152914583806088,-0.1579738360787165,-0.4633203333930016,-0.4273909500134174,-0.012806155783607664,-0.2023239596555756,-0.3030970740140314,-0.05862179123878253,-0.4495979737305478,-0.31023525351767156,-0.29051971657288533,-0.12641370184923284,-0.060130576808274494,-0.23267715908465192,-0.4808573045524883,-0.472656040446341,-0.41380371827173335,-0.08909705529951906,-0.2183479476199699,-0.18943862976207027,-0.46663207105773763,-0.04060504898486894,-0.045004813399104004,-0.051291560383479706,-0.09525446732227694,-0.11780671048393032,-0.19946074263889757,-0.4747386277839517,-0.48636859136263977,-0.14772821224300103,-0.3949420818638619,-0.30682378853329095,-0.3505648513787676,-0.2925887822504354,-0.4265632485810106,-0.17130979414228575,-0.30020629847320934,-0.409505687205989,-0.37474142592822923,-0.04665045586790961,-0.36600218018175423,-0.37471274458090664,-0.0761049790586995,-0.3215230660194289,-0.23701295728914085,-0.22430200749074525,-0.40734984894152604,-0.02033121639644997,-0.005337982857420931,-0.24527843670462435,-0.04804971079529863,-0.09714009978339111,-0.4883759832453769,-0.20456301349539263,-0.4379811261378015,-0.16876126363921995,-0.4915351267883148,-0.36156283634276243,-0.14017117422518877,-0.1568121780611249,-0.15789010300606632,-0.014305971327479905,-0.017607959086047398,-0.21129284181077002,-0.11736385178573494,-0.31983469940195586,-0.29744588128228666,-0.46871803070129126,-0.24144154775713345,-0.43125425599568823,-0.4029295257648292,-0.41374799539837204,-0.38681787292690484,-0.20870233440482056,-0.35307242813129447,-0.2044381539442638,-0.2598388607766601,-0.05141759632131537,-0.21053976480199854,-0.12705751386289577,-0.40464269074662884,-0.40070132543450376,-0.08897144977028093,-0.19842652756281676,-0.42421536179073693,-0.20653247117520168,-0.43428990350825813,-0.022697681422155447,-0.025387200454868752,-0.28219379815885703,-0.2718963472444973,-0.007147154925809862,-0.04725001386159222,-0.1800173769740615,-0.1828727934776061,-0.11229895850435045,-0.4374541381988639,-0.33365461678411246,-0.39307253227014194,-0.12502167053434554,-0.2729723956423915,-0.3705097786719248,-0.38593538547638384,-0.1384181673862127,-0.251693557055759,-0.359625058052612,-0.4032077773682483,-0.4965825552365205,-0.022930818254463414,-0.3797111791119818,-0.09257812580636271,-0.10297268100257695,-0.2210109156190011,-0.05792678063505352,-0.3071749299642901,-0.05418673672381791,-0.24831056034454158,-0.32094579094766107,-0.3870893135055524,-0.0876335834078742,-0.036776952578106537,-0.20559777225433118,-0.23823356861846756,-0.4657405393363365,-0.3215474930127721,-0.028048374853005598,-0.2462008986062768,-0.4260961375099558,-0.1348121634495053,-0.09695478536933178,-0.14896756305508596,-0.04870283788071805,-0.12183922211401155,-0.18987670406548662,-0.09051371061647795,-0.14887106448502607,-0.08720679260602782,-0.348548810345501,-0.27854155227301347,-0.09999019305146728,-0.22195954934425344,-0.2990979634466199,-0.16922233345180826,-0.44670513567055126,-0.2830249519437338,-0.13987213139679744,-0.40101560767036937,-0.385624377981691,-0.13520127411989724,-0.4626464004273688,-0.21520574497922718,-0.22886919716748466,-0.4493063327737352,-0.013226280902126852,-0.4383222401805309,-0.26051277468770095,-0.18260720466679148,-0.06383488495537892,-0.2926700249661107,-0.3067488116418202,-0.4684931211860839,-0.10304418398088078,-0.0002903364880433301,-0.4191454884380078,-0.30780425442043124,-0.2714087954099791,-0.051643729085015466,-0.387084031472511,-0.017136113336060688,-0.1500737238621952,-0.20585686717049367,-0.2511628475111125,-0.484278340787882,-0.1270000778591459,-0.4238331011359635,-0.31811009513232924,-0.42377319933891566,-0.4501058347607617,-0.06503207295533697,-0.20103775775591093,-0.3574087667583351,-0.4735211707508654,-0.10193080688761047,-0.2853356342111918,-0.2189282813190888,-0.30845455227540375,-0.42658612960003084,-0.30262955981026096,-0.3612767162290045,-0.356190054822793,-0.4145473573378694,-0.3308596172929008,-0.10713117115015203,-0.3295668676723854,-0.03096723121414202,-0.13147391136169784,-0.12828317693330726,-0.46147890561350746,-0.1224275848021007,-0.14314882348869196,-0.371544517407837,-0.432115367545837,-0.06421423640258994,-0.4071208657114006,-0.17087920129763967,-0.4468084014818563,-0.3156784108436135,-0.12052726227758115,-0.32464028942498047,-0.09141569304575015,-0.3733069979493838,-0.1582220500025867,-0.10510461738987154,-0.19220764284924807,-0.016933693806231997,-0.04619810713974781,-0.155020087827605,-0.09389499783714705,-0.18401178013162744,-0.0484996972800088,-0.03320736299096683,-0.2005867594149694,-0.19546280079675016,-0.35136737434618115,-0.2680664158198798,-0.1581148561774961,-0.4506003016170591,-0.4312551039743515,-0.4002180919397754,-0.24606392834712776,-0.049489776054552626,-0.3801921989285637,-0.14583424872854978,-0.32702865174495266,-0.042230468231972074,-0.10505733568846964,-0.2952743564178607,-0.11956343380629908,-0.029350953899012655,-0.12561486165719893,-0.45876061772512144,-0.32542681696675146,-0.08857984689399478,-0.019958396647853927,-0.38578158966963827,-0.14184479465445798,-0.1829207211778615,-0.33905275508534616,-0.029019316408104068,-0.4831783684517853,-0.20969079718082828,-0.07167069706536533,-0.07522910525834137,-0.043104157866209025,-0.1456957703644336,-0.44943972073592897,-0.3907331753879837,-0.21289496100926775,-0.218208344079713,-0.3920832296114791,-0.36549022657691166,-0.05996295994037126,-0.35720183708905007,-0.34681160140834677,-0.2389635461643641,-0.09186577238484916,-0.20773028189655662,-0.14762521170498455,-0.2112286675385674,-0.048916057256199186,-0.32218506633232247,-0.1529432132507451,-0.20024959567199574,-0.010123358345885625,-0.36498638293830865,-0.13608014780915634,-0.23851861135964336,-0.2928835433606116,-0.11030037601206943,-0.4072632169546846,-0.15425187666688067,-0.4638383744326823,-0.24997857421733538,-0.1802852870056716,-0.3155842046732523,-0.14041161771847677,-0.051782334964923904,-0.2540609047561285,-0.4859399941632486,-0.4204063818711202,-0.22464277950273448,-0.31126393425807264,-0.09687152992061965,-0.4526854354634593,-0.2486122360080134,-0.1589028513549392,-0.041063984080484395,-0.41670358987632805,-0.11532494869322729,-0.19958778807421895,-0.40556494814180644,-0.47993355631511025,-0.2075359442271344,-0.15979964623109855,-0.23323026306859085,-0.011993960551215932,-0.14162797731145604,-0.3838491602866536,-0.08477417259483955,-0.4224735567920983,-0.44518939891008646,-0.0929837500623868,-0.09493296890028091,-0.32227236547118787,-0.24516182020158417,-0.12032743170727411,-0.010676760027937493,-0.04992020123192609,-0.25429130051814486,-0.015024061907278119,-0.10170100190117393,-0.4257384914087805,-0.3383522445339957,-0.37943479339909014,-0.2726921769396423,-0.19113997143254813,-0.29512357823269353,-0.15339591738214298,-0.3902849525100327,-0.2765958896716335,-0.45909647534305587,-0.1900702826458408,-0.3231484891572951,-0.4952631049465953,-0.05783278985477658,-0.24608139460009926,-0.33337253354542895,-0.4282585803558391,-0.39184555740520544,-0.3897923125892726,-0.28406686510373946,-0.3709229686298583,-0.1594706544028558,-0.14762776570678027,-0.28149864854361883,-0.32586354274781293,-0.497469213721233,-0.27200945349755934,-0.16569118188367937,-0.41390481593737083,-0.11126519778195954,-0.2978802643919892,-0.4228435617175853,-0.1959149383189288,-0.4855628273078568,-0.04318795139456011,-0.39758735720098626,-0.21115657249916553,-0.44485184263696476,-0.30298836750890623,-0.37173231671973583,-0.4948032748709512,-0.2639829300631029,-0.04985435272728578,-0.4884528489051828,-0.17483132658193323,-0.3883417273113341,-0.07493232330893573,-0.03788079734191652,-0.25028128443865194,-0.3023158556976532,-0.4732385803538154,-0.19441264973656536,-0.1610826388778992,-0.4358030247863972,-0.4125377900410593,-0.17034891706961708,-0.01430186253520993,-0.1232145333147514,-0.4158222801961997,-0.17513113385511658,-0.29139181024872685,-0.13299713009629277,-0.24444253359266366,-0.4783585295218429,-0.3775931668138982,-0.0498088048735178,-0.11847077412623097,-0.47617985159808096,-0.2959041176382472,-0.4793705442413442,-0.22376583436219977,-0.4385490240372766,-0.19403927217962758,-0.1662675959004154,-0.021496475721015207,-0.47651039104838055,-0.15541753331843366,-0.2041265645249325,-0.12968421677639796,-0.3675067660298017,-0.42564311669713806,-0.2229254776108931,-0.422948923888691,-0.3852460594252709,-0.022891694888877878,-0.44759954849931927,-0.27385265148475724,-0.386303951067854,-0.09831943935058729,-0.2762990335872523,-0.4593165346003327,-0.12199269469172513,-0.12151457514514707,-0.04314739932418299,-0.17543964621546515,-0.3465169139522748,-0.19935885568198397,-0.25824807094642255,-0.41963359461460237,-0.4582398421359545,-0.1823551469247563,-0.45450613824563846,-0.07305363324600467,-0.10526545832643974,-0.19596891531855742,-0.15797570654837212,-0.33314780713507586,-0.09121402280457358,-0.4031570980984651,-0.48962112146344783,-0.23831710606733092,-0.2012754165571643,-0.4757165554180114,-0.4800225739910261,-0.2653274918830346,-0.13613466154948883,-0.33259364813580095,-0.369112882107244,-0.4646633752933439,-0.40421069867675574,-0.13662355678222593,-0.3222649137334045,-0.20287472864724876,-0.06982297252695291,-0.38295778283167514,-0.19679638416748935,-0.10970413608448237,-0.14961180472123436,-0.06121771465410497,-0.4965582869229138,-0.20365761929934278,-0.3706893832373567,-0.4847605235705965,-0.4009650211725502,-0.39505211156266884,-0.2065436105230406,-0.4066888144606601,-0.329619520325526,-0.1435145627435621,-0.28278742903570975,-0.2328322245134241,-0.08801155130415472,-0.4403792827628238,-0.03130030390121663,-0.2097838740983845,-0.38072402157076757,-0.1822551813967178,-0.44704013970597756,-0.1505680082961296,-0.027706523006545303,-0.49230899826368013,-0.18507173584090653,-0.42203469292909546,-0.23268475036063196,-0.40530618901712123,-0.4415948100653285,-0.20156310485134876,-0.23158550932823163,-0.325317886817138,-0.21284085188253632,-0.279587090640829,-0.005303581781180289,-0.3724981044277531,-0.32834380289310117,-0.18216401315444952,-0.36323874951692015,-0.04060385279958878,-0.05470682852042197,-0.07730635278359166,-0.047602410371178516,-0.32933477108323994,-0.13494565794587787,-0.09311475353970566,-0.46551769619381544,-0.35477317132387864,-0.4918125806527297,-0.0968456565449054,-0.4928826737792672,-0.37742239768638197,-0.2937893641619531,-0.48294543101580123,-0.41954117022371074,-0.37245647951956606,-0.15220152302950996,-0.06614634279134746,-0.4952854566729419,-0.47624295397464267,-0.09370388102689176,-0.06472829098802002,-0.20671252579312782,-0.1233944466023803,-0.0085109454753447,-0.24468642018802067,-0.1735546241456516,-0.40376283160868065,-0.4312072320862097,-0.219473455909573,-0.20559988275182572,-0.13963355203075023,-0.168646616259172,-0.046107548789449004,-0.39959932827338873,-0.4678313294442451,-0.37268178379379646,-0.37511722708444606,-0.20112399450766905,-0.18180678878737733,-0.198572816290442,-0.01982803540286704,-0.05982588622023022,-0.3864480770581744,-0.31586936742749727,-0.17261794134338337,-0.349194656027209,-0.13603837451919387,-0.032345114687897025,-0.26359604732484065,-0.14198801927397708,-0.16489487797921099,-0.1653194630758228,-0.1309886783247829,-0.45608856084882166,-0.08922420831671518,-0.12955501905607258,-0.05939956458640461,-0.1254954807626727,-0.2559504478815422,-0.22913751320830977,-0.489050968150073,-0.3566546079111099,-0.2845364493115078,-0.07541363432307469,-0.4978909495598841,-0.2914154510198014,-0.08307433339325754,-0.2315573376583152,-0.3584984620648194,-0.054467170389870034,-0.13095295063338175,-0.16502699253873654,-0.2049912723621795,-0.34731596742986437,-0.250265209066732,-0.25864439272533446,-0.08668744146337448,-0.39693060275722736,-0.2541542201068888,-0.484939891821655,-0.23323673539988843,-0.3794842563984624,-0.012916175547292408,-0.26545452796070024,-0.048073679277837233,-0.1569637936097784,-0.03018557802419508,-0.27152784642134575,-0.4452855169735571,-0.36979126107823834,-0.02241004542548941,-0.2653220706500228,-0.025955942144109123,-0.39463306673472565,-0.09743496506522686,-0.19456211505167353,-0.3986100775862713,-0.4932366941370947,-0.10650825056110647,-0.4532142588534601,-0.07659548663439197,-0.058236726515622284,-0.33370850433741606,-0.46763035794773955,-0.2390574250450732,-0.18274974841705038,-0.05567744402559227,-0.17284780786183418,-0.4774480230026714,-0.4387596671236603,-0.3473964088804906,-0.11265705450896679,-0.4900051744839994,-0.0016588164433496422,-0.15523213993339513,-0.24630024080898427,-0.1975464045509121,-0.41384906010028044,-0.32351679864620564,-0.38293958592299726,-0.1217870397411348,-0.25042984211515085,-0.07254090106678523,-0.14875537213270595,-0.13120597140408674,-0.043452388213546245,-0.2589074512493986,-0.44550765488497546,-0.24818548706419452,-0.1299188348589584,-0.2054074410960125,-0.05690567941427194,-0.4129512087495101,-0.24979367684973863,-0.4881284602996643,-0.31975078750220676,-0.33314075569403845,-0.37054102275057854,-0.02570559893626434,-0.4154501490102399,-0.1844610219702052,-0.49917998817189835,-0.35552529872429584,-0.49384843758366903,-0.44329771132095863,-0.40295648209198087,-0.341763654685038,-0.031038967041913446,-0.13826030970443448,-0.3642507061830379,-0.25429334222858635,-0.47718702543951574,-0.07339678261563842,-0.359443927420694,-0.39575260829498893,-0.24955000674344152,-0.1947360035838963,-0.1317171676607315,-0.2751470329973241,-0.039649517638402965,-0.3695429380049675,-0.22072152972709014,-0.22465501645220032,-0.17520123452940395,-0.2974600186001526,-0.22547201377726767,-0.05005877251105151,-0.2062629772878669,-0.3207932160748924,-0.09532151720272275,-0.013483570502186515,-0.11089363419161846,-0.3942739212127737,-0.2631904820131791,-0.19002748187148388,-0.08842872457119866,-0.058999204807974714,-0.0477049221259922,-0.2475556177329986,-0.05074457719017755,-0.07207115412456755,-0.10529383875577458,-0.11505868528451857,-0.043031789950288335,-0.28093635063495803,-0.44770766599732903,-0.003149944447851105,-0.35543722706561487,-0.451559585851135,-0.2646251324758009,-0.48918013009056227,-0.2119308154996018,-0.44590823488370646,-0.30867512884311044,-0.33996329548597404,-0.4508050027781769,-0.3645464504624931,-0.2971074455411161,-0.03509837442959163,-0.000789812745064844,-0.31851847764966945,-0.2571058509076013,-0.05776199404429894,-0.4008950778056479,-0.21662472699145618,-0.4808191674954263,-0.31715639034461973,-0.2567923924202563,-0.20059328000884735,-0.06408454619322812,-0.030985216797788317,-0.42414711355833523,-0.3199946826510621,-0.1744489847969526,-0.004054083248153262,-0.21950945285535417,-0.03329883667830558,-0.18006122865602747,-0.49023281461115487,-0.17375548856264578,-0.013376702896121362,-0.4023520824666472,-0.18992123054046905,-0.35931823936396945,-0.44155255221278966,-0.39010178409753293,-0.40034997831244645,-0.05055818886908714,-0.0054190716553447205,-0.18202270611489446,-0.3490816285727787,-0.23923320857318908,-0.40898356473239816,-0.43414564164272085,-0.10121089933756466,-0.12900797485582194,-0.15919112931073587,-0.36926844860987096,-0.11549831580546066,-0.44877641862468665,-0.13485202878171476,-0.44966588600462176,-0.276335174042869,-0.28770713702645556,-0.43898991939945087,-0.35891097071890155,-0.056012023777485154,-0.14091040104943753,-0.38939000066826857,-0.3722604359257564,-0.4860911694122959,-0.38658305128449477,-0.07500037108285318,-0.4446398107725681,-0.08386959787009307,-0.13335279578661807,-0.4091570378633641,-0.13791410684538186,-0.08330991583749747,-0.113546368966422,-0.35032814811438473,-0.46645315361474426,-0.23129200723552668,-0.29956032288841394,-0.3385347785432343,-0.15831848810439952,-0.49698008996541954,-0.049899563555783066,-0.4579080825773816,-0.14162149426303094,-0.4180194483543853,-0.12443787520188054,-0.18801521834755985,-0.17032174782984388,-0.4818199561308728,-0.24298124758211093,-0.30929212287014696,-0.3673189229862257,-0.36849477369291084,-0.3420848182587821,-0.4317812482768353,-0.0476379587129403,-0.18556813287174234,-0.2457509538933258,-0.4474412128572538,-0.28127660436961943,-0.2839001950680804,-0.08655792562144582,-0.1497291671701516,-0.0712344261461767,-0.05282904213520501,-0.2605064896919074,-0.32184599021085136,-0.4021146057355586,-0.20842312059017698,-0.43671386832263837,-0.18951708612777063,-0.2357453989257985,-0.05160571871348496,-0.13737658536942277,-0.3570483770858007,-0.02076532943186371,-0.13389875590169054,-0.37125693631737366,-0.3701809113283874,-0.24531544479824186,-0.12684478546983602,-0.01672560043967919,-0.43044753746400954,-0.3845904580303401,-0.0026881432486528523,-0.028651164765880255,-0.13344026868532866,-0.37419617193084065,-0.1497566925805901,-0.11720463592173835,-0.17086951015246532,-0.02676004013921407,-0.23469725889465165,-0.08427452008006031,-0.2299765605670686,-0.21764928015856877,-0.18020901840454007,-0.4808288186342863,-0.2770277859726321,-0.20788467139328426,-0.3508114688242914,-0.1454097460357373,-0.3686862734343106,-0.42086289522149023,-0.00818908536368157,-0.07085992594906876,-0.11305018760225705,-0.09711947630944251,-0.45606165872945725,-0.023217229242576742,-0.4311858977515505,-0.14706172503282666,-0.25503245799234797,-0.01801425018617908,-0.46074803268001574,-0.19859525738569916,-0.20722857883879864,-0.28686102368895305,-0.10170280950121513,-0.00613820450624436,-0.11882878449630485,-0.41042889030724417,-0.28233442963438227,-0.14447577221293084,-0.0836316282376367,-0.1334330753893077,-0.47176007519561414,-0.3024432856447006,-0.46687133104845,-0.29378722080196695,-0.2501221232552081,-0.06167958405716423,-0.043463115117245876,-0.13026038121051065,-0.27957335455623267,-0.15822501277879164,-0.2014897440068747,-0.46934230856512704,-0.10753346030633515,-0.09882490386862353,-0.41520206073722854,-0.16950505959299988,-0.30090310791122077,-0.11074776505446571,-0.16807898455477865,-0.46639092416181427,-0.038877276741893785,-0.33054185025832894,-0.4704076725816021,-0.3282896657969867,-0.3812909794075189,-0.10612777484549485,-0.14831416281613619,-0.4475293493720387,-0.2455599973400261,-0.47578319282612436,-0.4018416884025864,-0.13713754429810765,-0.4383792500480751,-0.011236860700623463,-0.11408704691484639,-0.14336052199479687,-0.4798059773962774,-0.0925040391849784,-0.47969285595925126,-0.09673594863962054,-0.4334031904192692,-0.20080980496586476,-0.13258816263204998,-0.39801761048725914,-0.0562266169829837,-0.1582924530770402,-0.08619482523410005,-0.37511446682060556,-0.04900260300329695,-0.44252034880651525,-0.31025452329210934,-0.42077768766123513,-0.42741452477592323,-0.29173004433014327,-0.32389279374360647,-0.37730407823334033,-0.37250853643226756,-0.052090587939366606,-0.16175595379653585,-0.30617805647878993,-0.24056388564164288,-0.40398640354912607,-0.0039038029682618713,-0.0963484788093133,-0.03666443168381661,-0.20871519585675857,-0.07647096829125288,-0.2553016128110267,-0.053440034437169937,-0.2203861649707245,-0.04504319263335543,-0.3033719175114181,-0.05508999247567281,-0.06063818635007456,-0.06061140006635646,-0.325395963776398,-0.34481142445329227,-0.3451890715018071,-0.28391569853775855,-0.07688857616787048,-0.4671134031687527,-0.433380664754381,-0.3713933539806814,-0.1842031169671624,-0.44308417974155423,-0.35917216990969214,-0.12785610544333703,-0.0067570287970382115,-0.45513863105366625,-0.28941635460354687,-0.3557582728156484,-0.2844435357967967,-0.4406216414779467,-0.24882477923668833,-0.1685853312673461,-0.10014701308298746,-0.2702871219707009,-0.19888731026358686,-0.13289138426145208,-0.2529185013517281,-0.39060539699123575,-0.3455143040152552,-0.11069303070007852,-0.4291244220999889,-0.31281769231484013,-0.1120487269643674,-0.08782366402486397,-0.039817851095222956,-0.15377950483317382,-0.3072283247522076,-0.2494145689489502,-0.20355305339983942,-0.04231277040497172,-0.03173228806769213,-0.19809152869574576,-0.38231073266361393,-0.2533951357962341,-0.4347066524257105,-0.38902460710290554,-0.03833134485343137,-0.012264563275906415,-0.3347911541069729,-0.3214987226945143,-0.08489206650843573,-0.3836287503399721,-0.26988081846747314,-0.3471085407099811,-0.38178073800042545,-0.3423564014562728,-0.20078774643258845,-0.34635868136747106,-0.2677690504452602,-0.28741076421748524,-0.2858930560623011,-0.30485191528537214,-0.06555886666988087,-0.18890548754698344,-0.04923904396103351,-0.04656137314125475,-0.321179351489039,-0.3860228053889253,-0.1898928515612599,-0.264652335910319,-0.40044143180473335,-0.011842667076270796,-0.05946826417680651,-0.04631670495693008,-0.45627013225354585,-0.16854256406071777,-0.023851160458847498,-0.178997215264191,-0.15597136611496076,-0.0659991095298178,-0.245440956917384,-0.03686951731313104,-0.087898773951676,-0.30165705195351156,-0.26185468420021873,-0.3092206871568347,-0.253601312535888,-0.47980744387552055,-0.35146261733050654,-0.3139277218078488,-0.42712156856662886,-0.036126031500520184,-0.3751774505212252,-0.3098257991077543,-0.19440744061643433,-0.4045314981356193,-0.23396488492747836,-0.39880206752745584,-0.3085870669111339,-0.19711990544615177,-0.3768006129417544,-0.011952874256014323,-0.12455823768776464,-0.45841825258633073,-0.4432511136681557,-0.2944677161175021,-0.12579745884966365,-0.08844446138000372,-0.25301783043096504,-0.2987675488492826,-0.44021476420948713,-0.158497112039781,-0.20146250365437846,-0.4909740024877033,-0.44345687109249277,-0.4842772715574488,-0.032199397973617705,-0.17151556983077554,-0.10734928924467857,-0.2066545126801691,-0.3574426169907726,-0.36048756620958267,-0.4459527400525811,-0.4084687962588286,-0.33803278077760757,-0.27165401327722827,-0.1972295601136117,-0.21867562881869917,-0.0046289536855056435,-0.28193318575009707,-0.13658808466046501,-0.014076855594332693,-0.22609455757838337,-0.3490080020036246,-0.12080347625417875,-0.3411093546580918,-0.06422993533695287,-0.11275822786003997,-0.36159926501900685,-0.10903621022988041,-0.21897225488059013,-0.3678689842863644,-0.08892889326319087,-0.46964311128729785,-0.17395176170630278,-0.4469051230815434,-0.08998787749864268,-0.18392547431898676,-0.43862345054158436,-0.42839933350287795,-0.004731320318755894,-0.49228458986752077,-0.49095261354420094,-0.025153562334623847,-0.06470090496433056,-0.4625056613125835,-0.10199348265796515,-0.08872300204963757,-0.04397501472003207,-0.4235882024382115,-0.49310229617485535,-0.3692740063766631,-0.024587927343029392,-0.011379372565314183,-0.1356547224814646,-0.010206235827589616,-0.1314802931377549,-0.4050000279374881,-0.483502054237676,-0.2644213312546613,-0.30946389279284836,-0.2974792226548012,-0.42251869998740366,-0.043299849052706896,-0.06685630690490474,-0.3510170797939126,-0.2797321090601059,-0.38614918157466116,-0.44147438071897294,-0.19252384384168197,-0.3435801951556482,-0.3377477304771993,-0.20866595815496325,-0.01409532365105548,-0.3982494416966671,-0.40887820597089186,-0.008274392521117946,-0.17874924982239415,-0.08303960871980409,-0.06985316135557795,-0.1617288301705272,-0.32551546091124883,-0.2347893028518696,-0.13376786552718545,-0.4481463680902811,-0.463743869315554,-0.15877156792534253,-0.11181444715256439,-0.08396153391241878,-0.12904918651604325,-0.28257591173914154,-0.3782470124728171,-0.23052276204338973,-0.343290218015016,-0.3115967070132676,-0.43052005827397644,-0.35436495975092386,-0.3275814049917689,-0.41721184901422537,-0.06246061609133591,-0.17711037755805137,-0.1460686528346551,-0.4214968897839475,-0.13922461060380154,-0.2100353635185075,-0.3950153543725521,-0.2329231313693958,-0.3281876335463936,-0.017639520612985238,-0.36855939789022507,-0.4024654788660611,-0.4263955560102789,-0.23530492358409616,-0.40597878203370286,-0.36859034041206806,-0.3082575328148798,-0.43058309905138437,-0.30984700474485405,-0.1914946790621903,-0.3079686280964903,-0.07947439943497792,-0.3755937046007902,-0.38414352155581855,-0.3919238261032232,-0.45302720080588477,-0.09251719844930428,-0.4591342146282662,-0.10531980100139704,-0.12924007873151722,-0.4392376810031441,-0.195986081944988,-0.16956827071620717,-0.11290921126956721,-0.0742445815343663,-0.29357927734356315,-0.45755930962285085,-0.15771535289681715,-0.47124056723258223,-0.09528779782951158,-0.37640585628979395,-0.2111506178935807,-0.1957257367597297,-0.07955028353083748,-0.1733256426066504,-0.41741097377890757,-0.3667596265505997,-0.19780850036827058,-0.3453643351472837,-0.4562365029464498,-0.13408239794454846,-0.027310466964734825,-0.12406897040700382,-0.2719002260083563,-0.35938052379716123,-0.008945391477723885,-0.374232119978289,-0.13899686996942995,-0.07765450011172481,-0.14501080769462937,-0.06039781720900739,-0.4338996890675232,-0.4258748998430455,-0.323593762890218,-0.04181077848301318,-0.2236222251429668,-0.1201907406549082,-0.2841570556329388,-0.4084661073664523,-0.3286559719090897,-0.1880051446985257,-0.19189710974488916,-0.08844546457124602,-0.29021734347008743,-0.27839602555994003,-0.3730205937708009,-0.20113405905646697,-0.4518890565256901,-0.24535548972123955,-0.26295354645143176,-0.37189631257310196,-0.38685287712174654,-0.2215469242709328,-0.29538670176677884,-0.19226189067833266,-0.40955269125017124,-0.18115148677227477,-0.4495289232522305,-0.24511255850695635,-0.11509484376427048,-0.21719629519055506,-0.2541706067977092,-0.42360165203696043,-0.2499610044262195,-0.19617086919000126,-0.06364140673517193,-0.22831113978878392,-0.3888401258692067,-0.44053687513409734,-0.12740006146782923,-0.2393982722103445,-0.22999539795944768,-0.13553210306171115,-0.34180591190462783,-0.07892393206624726,-0.16681289873445349,-0.20978907002795233,-0.20165711544782539,-0.3750511054025414,-0.34321577334025644,-0.07930062247948266,-0.30429318392018034,-0.43982581317014635,-0.16655123877692213,-0.2652039253057904,-0.2892857052195341,-0.3217476704911919,-0.014220186642519672,-0.14962427226417108,-0.02667867861165152,-0.29489043369871815,-0.1690244840127959,-0.02144299463010302,-0.07417942292900959,-0.310071683725913,-0.07701911861064703,-0.04515536393528252,-0.1861971163957118,-0.2791365562685243,-0.34658287065487114,-0.03691880948956361,-0.38404332592135015,-0.33721674682301817,-0.0989114206388495,-0.3208983399642016,-0.09404860045300756,-0.4677512612932221,-0.3071131030117231,-0.22113154907816712,-0.024872980901353037,-0.4081103629448537,-0.08070838664738789,-0.21856426898828607,-0.23126650770760415,-0.1233741967640909,-0.4551375013305593,-0.2429811604817972,-0.010133040801101778,-0.4281926285089126,-0.0010480563850606694,-0.3882791934741353,-0.2626200177308251,-0.24803525376168833,-0.4626347915437583,-0.3058075638002843,-0.1984966728983878,-0.4962988339909913,-0.3174761092570474,-0.21193049077881188,-0.07677073839666437,-0.38947699719398954,-0.20179853209236354,-0.31631307656569985,-0.20454436690738476,-0.13945387952283084,-0.4650909899410336,-0.21417343744456108,-0.4724236167475244,-0.40433874224874256,-0.4949440249485133,-0.27803677603319343,-0.047781796500680485,-0.46196115425829876,-0.23509128699102988,-0.49097382956441327,-0.2890763544801199,-0.44584107792285144,-0.036817278461660385,-0.2893297388699919,-0.2719614742489437,-0.09407517107198315,-0.09474149656786701,-0.46197145282570296,-0.21019735349173296,-0.09904070292250733,-0.2753957204679973,-0.2012284562640384,-0.43315289599790796,-0.2862237343466798,-0.3591968102323839,-0.49108128249624994,-0.4035420300036904,-0.19969834846521128,-0.17433840897156005,-0.10227350012696634,-0.31242540353930304,-0.4085406820851202,-0.37051219590883366,-0.09921368805119268,-0.09672335220367612,-0.2386683414984565,-0.27869770133963834,-0.3169925401792999,-0.25341177280663474,-0.15375924263556295,-0.2620791531030615,-0.21310643651419225,-0.39805378928550916,-0.4505619303406555,-0.42873866168988706,-0.4639479766705298,-0.29338671664205807,-0.17534597308324706,-0.4906267535288753,-0.2459763712359856,-0.2346135220130101,-0.3407804148692234,-0.05090629873923258,-0.39423749189086454,-0.19883846028917473,-0.03558525982368821,-0.39325534543654916,-0.4361117264553852,-0.30477512368401427,-0.40201679835863025,-0.4495539979618818,-0.3001303672675385,-0.33427994265407324,-0.20909064320215898,-0.002026189419523705,-0.022615735893649513,-0.1807652025584312,-0.22705769641468743,-0.34598135325517343,-0.487422716022355,-0.09623522004894813,-0.43425706350994964,-0.16576732733912303,-0.3653754676126947,-0.32878010388568,-0.1977684472828335,-0.3464432248479592,-0.0519376827655218,-0.2208457002024491,-0.26141898321374835,-0.27474247969286725,-0.031042034360926674,-0.4601495079297657,-0.07480535017594947,-0.17053819487641853,-0.07017292891688953,-0.19754209355153707,-0.4450389872477388,-0.1443930019486146,-0.33374040375088154,-0.08479400619176547,-0.1825074842878347,-0.056881439136498124,-0.392906456137623,-0.4430432205137471,-0.06948086880943183,-0.22076645089237057,-0.4121008710922228,-0.1390999714975637,-0.2297307811983742,-0.48861619632676057,-0.1892372243445477,-0.15415138959371422,-0.36546210774980503,-0.0668007242139349,-0.18687366603738054,-0.3969792930568965,-0.20368234034390142,-0.09967462398447491,-0.16862141279841314,-0.24886485330495933,-0.2632647578268903,-0.3361605898582203,-0.30589496763539137,-0.14143956093318788,-0.40814983950510364,-0.29497473291409815,-0.24410095976846935,-0.49804951756396953,-0.16305631585951452,-0.22530911211900762,-0.011886334995779402,-0.3592252482554551,-0.1632146826885127,-0.40913755727947343,-0.3478279999182705,-0.3054587321208003,-0.09331492706457445,-0.18375118796820755,-0.14611247461501575,-0.1807479590109191,-0.3562759331943607,-0.4668008129781954,-0.3747891804032941,-0.24772675620839446,-0.4939859802224905,-0.19194936681937502,-0.11028874661980892,-0.060509486519974676,-0.2115609662982305,-0.1336108062169521,-0.4735830446582461,-0.14999905082812437,-0.04124968234604076,-0.2471589839288395,-0.03842596709138901,-0.28996705104468945,-0.3841349156208469,-0.16632542282336105,-0.054846915343988556,-0.25235838458092985,-0.33984337625925787,-0.4885238388153872,-0.47414916338196456,-0.47810584963612623,-0.23541247549852184,-0.4470135094555914,-0.1607188287007698,-0.21187004623915118,-0.348585506517863,-0.1565982489504527,-0.30487165537246286,-0.3952094365436756,-0.23970487564305387,-0.43530455900678333,-0.07327600789367816,-0.4840659014628391,-0.20630325342868494,-0.39887507994756666,-0.1741247429301328,-0.20684077408288004,-0.024163330909281466,-0.15593583799140298,-0.33417294183883794,-0.37878721759192124,-0.3220641215014729,-0.30616513298107095,-0.35903785724220494,-0.45355324282220233,-0.290499195474044,-0.22733112083723284,-0.17223408288819764,-0.3032501499201439,-0.1283629859797899,-0.44107980188635176,-0.47897136349838987,-0.42186023162600184,-0.3413566874400594,-0.16813710446532582,-0.21062921592889194,-0.31863085410582315,-0.4512031342726166,-0.4650108098935062,-0.28722276502683164,-0.17991910800569888,-0.07110364530612634,-0.3797313837479107,-0.3986860673463539,-0.13272880890204253,-0.1533252384083914,-0.0813731361712774,-0.2307212387709674,-0.25932157427859737,-0.44125226976285303,-0.47972144091837343,-0.19806586049809116,-0.29344455475459397,-0.01993221137237644,-0.05177567442395814,-0.11585354781081814,-0.0058995258475935675,-0.07808381406701237,-0.38447362687683095,-0.03559865205330648,-0.3666139924167777,-0.3213217167563125,-0.22629406744379388,-0.11928232853429865,-0.01563168238680379,-0.10732425887561747,-0.25879307257414375,-0.2347596041577822,-0.3194006475396093,-0.34014403654146286,-0.38796666113180034,-0.25878539302481063,-0.0011601621619780067,-0.1399674207967222,-0.37041721634465763,-0.3698267167370777,-0.15525939784941112,-0.2395797640249374,-0.22085571007045535,-0.26927966994241825,-0.4286129959576921,-0.2917237581147123,-0.4115016798743443,-0.29617033551622396,-0.4814487726239869,-0.15094198694086314,-0.43388203971645367,-0.18395957371489968,-0.46434639417236967,-0.04768777641291966,-0.4597242194809499,-0.17036434689472302,-0.2151063452225409,-0.4453964759554768,-0.02999205782379133,-0.2023121290162183,-0.2238762450799051,-0.282510314488829,-0.48851146087744846,-0.1539587679433686,-0.3704146797110274,-0.05261371745390564,-0.48836878923499405,-0.4905890913242159,-0.33640368977113155,-0.0030630380519802713,-0.17679438608471398,-0.43567086468330174,-0.4504151335490081,-0.0576246938670989,-0.18226023219490883,-0.2695360185613017,-0.22881438256557662,-0.15530958912321957,-0.2059582489574595,-0.13084120984202896,-0.21737957608035297,-0.38264907644767343,-0.18267185683495113,-0.4745975340453048,-0.26195998455504443,-0.3768735802729245,-0.08206900695223329,-0.07315899167616835,-0.07459864479701406,-0.3083082612093777,-0.07386998325210858,-0.014429454439539136,-0.2273236027837413,-0.47651252318269544,-0.47691546030985776,-0.46243207557770016,-0.40483650782208724,-0.49181280832048635,-0.4641363069560981,-0.4125975876932759,-0.38831169333241855,-0.04796960567303665,-0.08163796105863141,-0.3594548527674407,-0.029909973232433718,-0.46086255825011024,-0.06411022554883195,-0.48323366854282335,-0.3306128616823545,-0.23759387375859398,-0.3972157919509812,-0.34548729809445533,-0.07091374954752128,-0.056180087503216236,-0.1814961230782951,-0.03531613802346523,-0.19998017032144688,-0.3303883261800937,-0.4559051308649039,-0.25261297360365376,-0.4297668741446782,-0.4241253117043077,-0.3939717542363603,-0.336920268084548,-0.16007736921209814,-0.4269413969669724,-0.3715826823570617,-0.4288903464615116,-0.31963424541110697,-0.25081826687907094,-0.3534402376222723,-0.33271208588518797,-0.16854555125455517,-0.36788629168843,-0.3941224222354667,-0.45746208293134616,-0.04279190223003704,-0.49828154398196,-0.15854403505736236,-0.004750641281035861,-0.43307705123593354,-0.42008621094495513,-0.3263046115480228,-0.47673162326190666,-0.4893679052804909,-0.25921287479850763,-0.05649547540232114,-0.1770767058962346,-0.1684879976890713,-0.011836059843843838,-0.4627052852863457,-0.17414542230949537,-0.028997658596920828,-0.32078268550110667,-0.29311124989792214,-0.2293223544169063,-0.14002196645762244,-0.4979935849552666,-0.41721556552257055,-0.07782659054532137,-0.3662303062025801,-0.3183489639333469,-0.25874445248699496,-0.4530146477645983,-0.3244196267990904,-0.18607520963874025,-0.21894530124425515,-0.34675348180691623,-0.083268801913986,-0.18365293971218244,-0.30325083463889557,-0.035974663358397385,-0.2202695135060122,-0.45099971686663265,-0.1704843688402713,-0.3430643541567111,-0.3173263979329397,-0.2171648580728257,-0.11812457169650603,-0.4116972493089254,-0.13526311718658457,-0.22578501630002223,-0.2863550700507016,-0.14963889515779505,-0.18164277939048368,-0.16404271582764474,-0.1281051919584999,-0.4118014418647469,-0.3603098203362921,-0.4538648979504991,-0.2492860339499553,-0.178912226332949,-0.27807811564713336,-0.25566596249290696,-0.16433984490401343,-0.029461441848873005,-0.13985310397198736,-0.20164296134281434,-0.09006282373909302,-0.10739627875551061,-0.2516451565653173,-0.25938656908907953,-0.25785531466806766,-0.38268388104194895,-0.22256554658995464,-0.13918131780594456,-0.4581963174053111,-0.4977103887161137,-0.2427633923157062,-0.3534463836110959,-0.055045633802510485,-0.16602895723561617,-0.2424437986719784,-0.25426253562272494,-0.20814183875555115,-0.08972937279039261,-0.12612218057062696,-0.14235200024415173,-0.13495321124105852,-0.12950167588839745,-0.3409915865012526,-0.4399221081345962,-0.1081768618461113,-0.2520993705758581,-0.45867565557707546,-0.4280369387497801,-0.4122423072747813,-0.39051798225966006,-0.19804628246063505,-0.38345729602836187,-0.06911632834612469,-0.20922300062858856,-0.08965833885080787,-0.3366936519427107,-0.09088095726824785,-0.26434589148630916,-0.08668785530338585,-0.3214834896207027,-0.21343733780861585,-0.043042131879548085,-0.2568579014997222,-0.49062921719068153,-0.2973763362959416,-0.43304106724568325,-0.06466722381141177,-0.30036253642353117,-0.25242134735898847,-0.27997022327063836,-0.2044763276925331,-0.0726552642574364,-0.27519113526646666,-0.3571404623168235,-0.014076808682517483,-0.21307288981984596,-0.3060555018680493,-0.2561887174244637,-0.05389651480378044,-0.29562719190253683,-0.46806163638029274,-0.45354291795284507,-0.23518118274033983,-0.07294779267935458,-0.07717166044510093,-0.4091185197945266,-0.4484793771403073,-0.20372078788539927,-0.12252774828200252,-0.21534680115264437,-0.4481648419797356,-0.42491062744930297,-0.03617245527704649,-0.03599013149305785,-0.398303459668194,-0.25588928805916533,-0.3891002803138893,-0.3006923704732274,-0.32814404824919874,-0.3844190594670567,-0.22422149390221235,-0.4701466341600615,-0.13255801296673797,-0.030615417261037337,-0.4204693248967666,-0.2651237412388179,-0.3000685484022656,-0.4667368763943336,-0.44192934552579577,-0.19919381121836022,-0.2676237220943407,-0.3399280954174332,-0.009259326489612807,-0.043807035658842586,-0.07089558915652061,-0.10572273931613296,-0.4538177766085838,-0.07367848212903083,-0.4683296239126489,-0.33635495028310014,-0.3580083471892098,-0.043743201859895886,-0.418536072892265,-0.3607909376020525,-0.3936067142398044,-0.36185167590011946,-0.32792798841359483,-0.19610867290461298,-0.48452538463175576,-0.2616966866439474,-0.4059053321859788,-0.4707337282539992,-0.3508754518281655,-0.386976706430738,-0.4541648321212278,-0.25463542846843246,-0.11322708575183749,-0.045286895587854814,-0.49499800962835916,-0.07550979757597176,-0.4452169061957856,-0.44196889677429696,-0.16198193062158028,-0.49337256409436503,-0.3510290124234423,-0.2796633780307223,-0.3666827047343759,-0.49153188880421383,-0.28770381318773963,-0.4490184807626265,-0.29045691921014294,-0.39903930668354426,-0.3028040521513664,-0.3997464029094593,-0.4039948887758631,-0.11124312124083768,-0.11158812774337579,-0.11747563364678937,-0.22051631695562457,-0.21768728593522935,-0.34410069444776903,-0.26820883344248825,-0.35055228680716,-0.2864414274357293,-0.34061846060758283,-0.14954825950396822,-0.4551038537221166,-0.3055811917684015,-0.20879964977142096,-0.4565376911824012,-0.034502388840448206,-0.04404796868863892,-0.3413505521528125,-0.2682884869389691,-0.03210495651448986,-0.08629073661700604,-0.26440838418231605,-0.05565314767307172,-0.1979834812977309,-0.32216985020680466,-0.1231241097508744,-0.3197129739039236,-0.17851877470800348,-0.3994530259407082,-0.4621356569440227,-0.0783488308742254,-0.09557535221140523,-0.2371502074946492,-0.4534191193412229,-0.4409822155168497,-0.22450819570055502,-0.24078848283330123,-0.12425375822117712,-0.4049107058874615,-0.05535814861991484,-0.044648750691279826,-0.20863821716442232,-0.15217429397989968,-0.1697437877887762,-0.2234009765054844,-0.4911865300949344,-0.2347682235001346,-0.19649588896276438,-0.47037499593133736,-0.2274413945182311,-0.023059194742783506,-0.16634132555284376,-0.3852120921031731,-0.47920454082344754,-0.15980811840667108,-0.22562098363812466,-0.4972411839121337,-0.27930278289996646,-0.06791555582345976,-0.28075935300905375,-0.26596292013131595,-0.1830724398344339,-0.06160993811309701,-0.1883450216376661,-0.1528444102944454,-0.2659110549968231,-0.3435929566206415,-0.17819746835279526,-0.4701666655354271,-0.18854495223711887,-0.45401867313822275,-0.29537817969303937,-0.11654726943569438,-0.28921572342629387,-0.13212693122631414,-0.006605510788450397,-0.16065240490051036,-0.09837804181323362,-0.24455030022352775,-0.07238646139411387,-0.14598207541248098,-0.2932911177002051,-0.40132026641726615,-0.21449695248423062,-0.029533004750173064,-0.055302485919124345,-0.12293079332379375,-0.17535724085873783,-0.003378022364476707,-0.22650428585552018,-0.02724883037057768,-0.49493704762670676,-0.3445335660576614,-0.2800905500647112,-0.49896736383286955,-0.4712000066121559,-0.014147274665938903,-0.08463632862211234,-0.1994546605609645,-0.1759148632055373,-0.38515251380197413,-0.11640802187137378,-0.14359499958313848,-0.07082147872972944,-0.27767348427671334,-0.0021815724735994024,-0.26990305607683296,-0.24242574963432806,-0.035357022765961754,-0.024848589229926166,-0.21021956128248098,-0.2648814317133704,-0.024514892863035098,-0.4721426995273016,-0.18074808374437012,-0.12652938743258113,-0.3689012222236796,-0.4228033694301697,-0.41531270956184063,-0.0339939092238557,-0.01052567823914441,-0.4878327728480223,-0.39135038396320254,-0.06048235393951307,-0.3503817231074625,-0.4827998573837353,-0.29179760750733463,-0.04038750022082316,-0.22743638562923696,-0.09480693337524193,-0.36776377216166267,-0.24431145569322454,-0.3213280126620123,-0.45207853812438825,-0.26774162695826265,-0.4334133900200342,-0.24311757121082544,-0.29421542673882173,-0.10423074658262521,-0.23979684517158228,-0.37922207788227147,-0.17074155886534403,-0.1796595267505975,-0.04206969042053299,-0.3605580862104305,-0.46627122470801086,-0.018690966807762166,-0.25002827756524426,-0.18122004955562054,-0.0966737994068666,-0.22654776175715985,-0.3992762180994017,-0.4768438568748412,-0.038275705690154815,-0.4500746789719774,-0.0998647295288535,-0.1036694675392279,-0.33508062213680123,-0.22686474298101633,-0.08523246680000351,-0.3778003130183101,-0.264197007729957,-0.2925167955985408,-0.3603859492037622,-0.03693546067402287,-0.1403600635665031,-0.35852126102738247,-0.44686852105413455,-0.12562234829550445,-0.2913722764726404,-0.33572358347179054,-0.41124814055453773,-0.2856337109881578,-0.05126096663132973,-0.014727551552384144,-0.46372715980989,-0.34417736101943364,-0.10532779904367129,-0.0527925311741142,-0.09564518163510405,-0.42371262831258294,-0.21709092479686265,-0.44061585300813866,-0.1834151549123566,-0.48633238693281444,-0.2268283102695392,-0.15495078225661763,-0.3598401248474181,-0.30004308532836454,-0.4266141871281698,-0.19211994167376956,-0.04449834954481424,-0.49711700925271174,-0.13504541998841124,-0.3584766374018499,-0.4918918610945603,-0.40203486361388197,-0.3914511078241676,-0.2015086067519397,-0.4186944932282797,-0.0037382528488146827,-0.09526935324278274,-0.47863603813130395,-0.31341664013742554,-0.36545848403258907,-0.47228109769064475,-0.30863213859177363,-0.4992986511457199,-0.014635557162136048,-0.32742687751916766,-0.13621630278807395,-0.31627850674336877,-0.14292910409360615,-0.4995796695834578,-0.3484618206554225,-0.409343189537829,-0.24327362700890576,-0.46107463683026384,-0.3684681875004192,-0.2877017964927818,-0.2829619964254969,-0.15125664442116693,-0.40430394986815565,-0.3995542248958919,-0.28739865339018766,-0.04171870485651086,-0.4803587641880539,-0.27256984362673475,-0.21148372326600928,-0.3148375945683658,-0.44963217161425606,-0.33801542032574694,-0.41735652689523084,-0.243363261339816,-0.2813045422940913,-0.41855019030796925,-0.28004957286846166,-0.4776651782815152,-0.42953792563556725,-0.10935537304332577,-0.4122069354657384,-0.24085102515099832,-0.4640795202915534,-0.4178909556512356,-0.3208531130250222,-0.44577533713299633,-0.21138712509436075,-0.05301477188346748,-0.34859013187772814,-0.27632411654565137,-0.45207297262020896,-0.3503828187425533,-0.36729308957085227,-0.2951045886620892,-0.2369749357668266,-0.2256517791371403,-0.17594758307934233,-0.23131753527088939,-0.20973072123869718,-0.16592977726631786,-0.3661709311319373,-0.15508139141931876,-0.009179862156636576,-0.07918072800237186,-0.0800834937790944,-0.4252894882998821,-0.2786294133845232,-0.3580510597289245,-0.30498991360809724,-0.017804609743039768,-0.21000948059774616,-0.10452545647223832,-0.2695951402938094,-0.2791627741895967,-0.14680367694315433,-0.4682648547234901,-0.08347746065229245,-0.4882782629210707,-0.1066812490067428,-0.385445481842672,-0.43953218060805055,-0.08156042311582168,-0.3722634198126048,-0.4335011729340509,-0.09001899670865088,-0.31725904642677927,-0.3226921176038642,-0.19421679263900082,-0.19110433958768935,-0.2344048409111792,-0.08003081709839877,-0.33886615378461926,-0.4114398133601971,-0.4465687282043356,-0.10805671944893935,-0.027557685496423123,-0.3049009035820941,-0.037220712868556105,-0.49138762507274947,-0.2528811986339813,-0.2608676954262259,-0.43521762588445756,-0.4103805195102167,-0.28193850531725506,-0.09705070746937716,-0.3805222126843891,-0.41388036446090326,-0.07263615478590402,-0.061962688283941025,-0.2140457017146632,-0.14382055265784532,-0.2949402847186997,-0.4784525874839092,-0.22118070860104977,-0.3404163782096067,-0.2601686562789929,-0.4215889136136757,-0.3606093211631407,-0.3691088621330515,-0.21184998398786936,-0.46606260627484397,-0.30824197913838436,-0.24632882557257108,-0.243772253017007,-0.12162145708396799,-0.4109344819499694,-0.22363142921202828,-0.04125316783772415,-0.2748424961068624,-0.42027726037281843,-0.1818463730571387,-0.06507583359401625,-0.44945674064580077,-0.4943099056874446,-0.08971370266053114,-0.3051814341314093,-0.016542788349924398,-0.45999743867301135,-0.11859858026785375,-0.41182758321914537,-0.18482984351456888,-0.17811838910146327,-0.056403642027404,-0.3203511080205158,-0.38182841383952293,-0.19563546366402296,-0.3951488987666981,-0.054730738177139915,-0.1577080614920161,-0.42056750242545127,-0.11438786482696539,-0.47023897834168316,-0.3590699963349566,-0.021140620422110845,-0.47306987603840134,-0.28215491136358717,-0.21107820513995834,-0.36772067202220937,-0.16756749044692187,-0.25153359024468547,-0.04144878426858445,-0.37085305610759756,-0.23810575602839534,-0.3539616794606679,-0.435043276742357,-0.3757226490471407,-0.09618679258485419,-0.07234995549405243,-0.2480905914689978,-0.3049006961769468,-0.4767596188047005,-0.1757300732388445,-0.4428808253067652,-0.03232856566458686,-0.020695310351342755,-0.037373366225334714,-0.20473449322309245,-0.33604187983424894,-0.13574444809135922,-0.301754697649266,-0.10424039342489799,-0.2922674368658511,-0.37140790322866035,-0.4283938670384352,-0.3240778318402895,-0.003941665359982971,-0.21634283305541935,-0.033360703811392445,-0.08221477535488719,-0.41273646250891916,-0.2480549255828829,-0.42081337164145793,-0.10978397430302023,-0.4182183971048231,-0.14745968415372857,-0.3761049667198807,-0.27304039409279957,-0.4518856922408153,-0.3352931682135799,-0.3214257709019337,-0.23977939365254042,-0.3590378627792603,-0.3984384633873599,-0.3178794939846371,-0.03583922353954461,-0.45406427638687574,-0.43745370270708395,-0.18662358911129007,-0.36061308205889686,-0.41330495325775196,-0.4082111826686935,-0.4967205903349132,-0.3186797731762768,-0.13487200167644597,-0.3897570177182077,-0.2668445599470244,-0.1622438716262996,-0.35499372097631254,-0.13933078689258172,-0.3049971795779013,-0.42468692704551536,-0.35495582215887556,-0.07825634545044069,-0.30550133123055,-0.1258948810731464,-0.01980803832664646,-0.22337656933413164,-0.01595480671819749,-0.47322291626444357,-0.375864785481166,-0.08385278775628735,-0.008346576651992565,-0.4318053696411981,-0.2126668562222107,-0.015763309538848747,-0.10808622419992531,-0.35222393287365517,-0.3846122930263042,-0.2375635428751619,-0.18974977981171437,-0.17686659957222328,-0.2025250540761332,-0.4212180828245147,-0.09599357291754451,-0.24195799168163745,-0.09205208681973254,-0.022631463794798634,-0.15314931611788274,-0.4952122113728562,-0.2430981003323991,-0.40571957657777713,-0.05403250252748937,-0.05897504986367719,-0.03449210535087821,-0.23730179341534208,-0.4588638236173802,-0.003718054158793116,-0.30284345285503667,-0.47424407903593446,-0.008574129599719038,-0.2549177557113119,-0.3464850830285412,-0.4054703000984998,-0.41180613280433975,-0.36749218451502774,-0.28380411410432205,-0.3450096107672873,-0.4576005646136754,-0.4005563996917134,-0.10760187720317893,-0.052979278193436063,-0.423879804773453,-0.30988636513034706,-0.038466632013502755,-0.49963122516007097,-0.3646466806685009,-0.2479090843317887,-0.24260516696626622,-0.12836229118726772,-0.04981494881722526,-0.269090618341288,-0.21187440152095494,-0.03799047907075015,-0.36384888765177903,-0.2562319473436514,-0.0835075745895495,-0.4060915834954737,-0.3460337196117036,-0.23551606657944313,-0.11747021928022372,-0.23237253174584493,-0.07941843602747656,-0.27903567787596806,-0.29171125478245763,-0.4579632632404085,-0.22560867469313228,-0.10444705133372756,-0.38950043872511364,-0.11293825552181846,-0.09040793298528382,-0.3967029259684054,-0.4677873733873684,-0.43741261292742506,-0.32714663911990916,-0.3527011376139796,-0.004507028567769744,-0.07634801948719505,-0.15886311706599898,-0.08830714206755697,-0.07725613087936145,-0.014121087227655371,-0.0533752281870854,-0.042710961414952675,-0.3122866441604072,-0.13510599984991312,-0.4549668016280938,-0.004940821870003775,-0.4921352451638856,-0.31305000781361103,-0.07080423497508204,-0.21218689530411683,-0.4968155909972022,-0.08136081015471053,-0.19380124528133302,-0.40552709053009295,-0.4250716594198969,-0.05383040526825911,-0.0558884332974936,-0.24443406561830294,-0.21429017021729524,-0.19113543864812754,-0.11561268582684958,-0.03619844318362564,-0.2503607752945518,-0.17451640920962563,-0.4297483049501969,-0.48826450249596187,-0.4181572214824849,-0.2259270937085327,-0.0437781491697774,-0.27211707336519275,-0.4558762353199196,-0.2729011574801504,-0.1284338969420249,-0.1408892290360777,-0.37345400142991625,-0.3683731934706216,-0.11101314370408188,-0.05965782391776919,-0.11307003453996234,-0.045288114647004885,-0.30612867405060795,-0.41014126182127686,-0.20582873677202163,-0.39974152321180223,-0.0030378893496640913,-0.39056113799020475,-0.10605017343639134,-0.4687069599034336,-0.1087459925480797,-0.49128933104957184,-0.48056461796167294,-0.05510755105683418,-0.20008572636177302,-0.3598577681599666,-0.020500294257949192,-0.3785859735754634,-0.0026616840516817675,-0.25553029823423057,-0.2796646421740059,-0.26389822468665836,-0.08324769791058417,-0.28719319917267394,-0.100320302160259,-0.26752136377165825,-0.2767086092436243,-0.25853927893676065,-0.167541161924735,-0.49402260763071437,-0.42311862063714323,-0.1253349367953841,-0.013604193323194846,-0.4213272408860308,-0.436979069097293,-0.35252059486935483,-0.319259411025702,-0.45558009543302147,-0.44976278394483415,-0.4945732112952731,-0.04244736597327525,-0.05845856844253716,-0.2855831351049818,-0.306021902564543,-0.07087284111599101,-0.12762361409798406,-0.09444328846820615,-0.36293264245094015,-0.03223679120470058,-0.26269115451585445,-0.33531397571985533,-0.006451599303884725,-0.4630373209857206,-0.43706174436526934,-0.29077235094121867,-0.08117657905639342,-0.3464676553097942,-0.01907048224647112,-0.08360965959404076,-0.2834321356067797,-0.22565038210855903,-0.3295361010133696,-0.048450142329358514,-0.2625520792290691,-0.4119760282096332,-0.1883773579518756,-0.3685375062712579,-0.10356849153704384,-0.13082834347044137,-0.39202631427484935,-0.13286878553563397,-0.31650864456570116,-0.09218828590243933,-0.29701785942272363,-0.06396945808353571,-0.22179702973672466,-0.4851002783735182,-0.2557334213138135,-0.08068753393535189,-0.42893387837578045,-0.06650243298472192,-0.39585267435332494,-0.12492749034847783,-0.1597385641573461,-0.38915067043621576,-0.2401411108290853,-0.27022629853415137,-0.4935950668549124,-0.45256880172827363,-0.20717678579385168,-0.10215993554516989,-0.2849153161823451,-0.41283058630749925,-0.20977455330172023,-0.32810692209582426,-0.49964067758243624,-0.29105096273104725,-0.1409463849020377,-0.3783959534722131,-0.2565425661666195,-0.09272276391595335,-0.2035256320351282,-0.009736147779415338,-0.16713113106328537,-0.3096775223172452,-0.4105329025439515,-0.22497747117219358,-0.04739702156190939,-0.03568268584788381,-0.498904862918763,-0.1845668862822103,-0.2360012346010577,-0.3982568606701147,-0.4200575830393495,-0.4297851767963493,-0.25799689761772227,-0.0230417008543925,-0.46551320691905784,-0.4699951281526862,-0.2134489553524873,-0.055990525569738825,-0.035258118562643714,-0.396701259845466,-0.3850930950137661,-0.23812973374168356,-0.2817098710730871,-0.11516234644114665,-0.12764373259882156,-0.4715793437916358,-0.22905391878538872,-0.3601928645948098,-0.3285489281126135,-0.2628352796118074,-0.4614402150984406,-0.13716368479198127,-0.3302846823713934,-0.4779912454180604,-0.4058966607751404,-0.4547261638467891,-0.25686771441731493,-0.08017507513167588,-0.29119363263902265,-0.15392627783822366,-0.38048392646669493,-0.3362178315454384,-0.04991034439573239,-0.4374990091548583,-0.12316859661991164,-0.12449838341208397,-0.1387243561594974,-0.2530983819589172,-0.3049205314984781,-0.2947287951920232,-0.03650960543340975,-0.3548726765148166,-0.07513842346977395,-0.34414826611300975,-0.0413247108025121,-0.480534710397148,-0.054195620862941496,-0.1581035720574171,-0.12249887300557394,-0.2839624896274212,-0.07386345956286366,-0.31527806309532025,-0.48854851229969953,-0.4706266751437591,-0.3023854020869361,-0.025479794332009975,-0.20002278101153015,-0.4121891960488757,-0.017370715569047124,-0.24837415412569963,-0.37011371262867354,-0.06001730942487005,-0.044622485649547294,-0.1187011217125461,-0.48599648328108014,-0.18122871564478238,-0.44584067244767667,-0.48369020536909524,-0.09239453503973027,-0.21661282816904148,-0.1629495422171,-0.04791037654020858,-0.11572076285744137,-0.40716212240446337,-0.40321971845413584,-0.36553537534672476,-0.3419579011112187,-0.3765859361256376,-0.01986407934985146,-0.08871898007523216,-0.3103560958452003,-0.37167137213389045,-0.4961536528559375,-0.03485213064024595,-0.32404583411594756,-0.347016268380016,-0.26675872038224413,-0.14403854180536402,-0.23473516393870386,-0.2835433324010751,-0.45134751363465353,-0.05527863662349808,-0.44854309235354994,-0.24026460352380663,-0.19788121021414462,-0.25011971529239385,-0.347714999606209,-0.33593689674823823,-0.3462483507936679,-0.03185673752298224,-0.41719967438814265,-0.4278898398752965,-0.3912564448636259,-0.04380794672602362,-0.2658337705435636,-0.47006733844157433,-0.476310125387452,-0.09571638168408303,-0.18190632210141355,-0.08249296074388435,-0.1930175928652592,-0.2734644567161393,-0.4706828824793241,-0.26495599169876904,-0.008606770286059717,-0.174692617961815,-0.12468312298042994,-0.28065710456898374,-0.20401667475980778,-0.0502712035173688,-0.42288649095231834,-0.3848318763449007,-0.07385422483581383,-0.07265310992023999,-0.3250723420920689,-0.3677374249339327,-0.28247622569298725,-0.04402881251485169,-0.01733453445394728,-0.19134094112183453,-0.25642634241737017,-0.017523521558946875,-0.3686584202736404,-0.2008585526943123,-0.05503378430478423,-0.10393979912071372,-0.4255008696037532,-0.24667157943776397,-0.3512135331966485,-0.3799468403923757,-0.4270040838600443,-0.29939599124221417,-0.26459061852507604,-0.4143296845324438,-0.20274939522203883,-0.1383197217363452,-0.4830576708796678,-0.14149780971953674,-0.4651002270604253,-0.23773867411906047,-0.32606688668337136,-0.44320676350254806,-0.08397627386996864,-0.24547713687737172,-0.46342286586286063,-0.0774861642564052,-0.2127698730937444,-0.045181175031589804,-0.33851952359901527,-0.21465392185759202,-0.2805546471142505,-0.3900741416919681,-0.2820394964613365,-0.33375956173949173,-0.24482294185825926,-0.3819372517718366,-0.4042313453380958,-0.42813027031212947,-0.20803765621383985,-0.026520038807893997,-0.43548648513593313,-0.3773420419493946,-0.4123555249021502,-0.4497650424874723,-0.07868627371428327,-0.27590737577345126,-0.333134478017552,-0.014269756754078378,-0.14126843865287653,-0.017288271511651576,-0.4060363813089979,-0.21862641885895817,-0.18851197452720514,-0.09088901942568939,-0.4654290494611849,-0.18437515001899296,-0.08877091410033111,-0.3113511669575669,-0.33665127229791525,-0.4695252944498364,-0.17888388628600405,-0.2785403664671857,-0.11903214611340607,-0.25911929892539354,-0.2562237372805839,-0.2348946531026943,-0.12181406549946128,-0.14049474186413402,-0.03424668447786183,-0.30817227281531057,-0.2814614102296701,-0.3503217639079309,-0.21484898709896239,-0.3355481848656454,-0.12125788115699576,-0.2975650870302132,-0.42041186810094977,-0.1982054861404876,-0.04054944303964114,-0.13969642453589992,-0.40275965075504505,-0.2805009095841433,-0.19891856998709212,-0.053184731100513916,-0.39315566152620485,-0.23429026059629754,-0.042664337144385334,-0.2428397680984522,-0.4771827785397674,-0.13107778960436034,-0.036109634470421925,-0.015600774103232462,-0.15891132963960208,-0.14503499270317344,-0.44097235615348496,-0.16001713535816908,-0.4946867891640947,-0.23487151530405892,-0.1921618468831885,-0.15203870053331692,-0.003929476700426648,-0.4180550302505366,-0.40150203578020094,-0.4806519643107394,-0.3985364044271178,-0.18565132897264802,-0.21152028242900311,-0.435053395019511,-0.3355526651032831,-0.41553380962750897,-0.33671715528793755,-0.4024608109654174,-0.21051967485491474,-0.3832639186723197,-0.2834173886517124,-0.08698475216557444,-0.04919625597703925,-0.39829794567269183,-0.2402572416093377,-0.3419942011756677,-0.24545169488056273,-0.4612094681098906,-0.06576513460401989,-0.056672028370919225,-0.2733835862365397,-0.17238757833366258,-0.4329397721935738,-0.21454684875767605,-0.29122302002423417,-0.1925353447152588,-0.26733307134450923,-0.1373737875265747,-0.42889909535712534,-0.030492476784997335,-0.3648268219518498,-0.04862352578663831,-0.4642600513687928,-0.13706145299083405,-0.11707678681949751,-0.07981095036243868,-0.28356785008281493,-0.1256715283506783,-0.33233108536676337,-0.40433405604815953,-0.07788686822986124,-0.4567315685891121,-0.37792349947185044,-0.4561503037391945,-0.4824922353091585,-0.2827971457011067,-0.48882859481627583,-0.47311168409709636,-0.03422487805073726,-0.20600962167901216,-0.4497203410256867,-0.14276572569990753,-0.11469945878440557,-0.460996469886246,-0.2713897068803661,-0.4382136331206854,-0.23229834641371583,-0.4717259117405065,-0.2640997142697159,-0.367871404964775,-0.2657149962682751,-0.37827262909989934,-0.14743182731829896,-0.44326514110154547,-0.3622802895552836,-0.3904297483333602,-0.4591515261077105,-0.39027755915673945,-0.18957045376592907,-0.36846418677348447,-0.14152170318082158,-0.3315830223451982,-0.4989202979073605,-0.42839159817798855,-0.05535559513684263,-0.4213720818276956,-0.050035377016803495,-0.15031869054672842,-0.08346616652403693,-0.33297934391792317,-0.47955150341681874,-0.36196023016618006,-0.1332484795236718,-0.2661191604468435,-0.20971269041308238,-0.4677721149833748,-0.36337840888465944,-0.034117074253044,-0.3818069785369572,-0.1153420580583876,-0.02118815161876053,-0.42273451043646737,-0.29055909019602577,-0.04699000621974758,-0.4845002211343039,-0.24407939143057333,-0.3864771121429744,-0.4423525115826116,-0.47313611655294396,-0.07797915074615003,-0.12292715140063915,-0.3565658217887986,-0.4739004224937159,-0.48718668775813156,-0.4618684586604638,-0.1668841893557862,-0.0747483758668055,-0.10099884305488371,-0.4717367804415019,-0.05279500889849109,-0.008687666814001127,-0.0599413913184319,-0.43074602052163735,-0.38881435516840135,-0.2245634015858735,-0.23704272856356123,-0.45305913174792556,-0.4099210321457619,-0.4382066497608217,-0.13654104212649154,-0.025809414900194283,-0.44611525397251606,-0.4933223398146275,-0.24391939514665695,-0.19676138696773615,-0.43060341673384395,-0.1743985357273472,-0.3191130795263274,-0.1046890139872908,-0.1896877463863862,-0.19671330562864198,-0.02964561925292719,-0.39305266130544003,-0.3810951332592205,-0.49386165737706744,-0.2585721729898768,-0.11244482007344392,-0.34698952167600805,-0.25512101813006194,-0.33539928358754456,-0.0916705318337202,-0.1382696221962474,-0.21822291489268875,-0.4476480150744494,-0.19455134250514095,-0.058551630867678006,-0.4400075059544232,-0.20723065861366985,-0.2721527146091002,-0.3906425911753735,-0.2715964008481546,-0.17440530316850567,-0.45538436254937276,-0.04600655141236154,-0.3218330590279276,-0.20424883648407732,-0.3077998428381914,-0.2638312533057321,-0.04685877898688462,-0.254079443006223,-0.014174810353494327,-0.0761923234461368,-0.17002462962179432,-0.2821691722853755,-0.15968398902729497,-0.19497153204712492,-0.4923106021591631,-0.3552733267191305,-0.2881388485300189,-0.23777631047048597,-0.39167848423088636,-0.31741354259377264,-0.1404691027501661,-0.44752719533850327,-0.20891377133482225,-0.26623013027717923,-0.4746928334005984,-0.10492165810384602,-0.3647386267752577,-0.0011710749545572607,-0.11843306324351344,-0.10865469921303406,-0.496176913588782,-0.4902219791043845,-0.25659225189228463,-0.4318197268672921,-0.06226873377963116,-0.03244163638791164,-0.14061962154194274,-0.31489501262730624,-0.018030838971775376,-0.053597255900727614,-0.12640460239102602,-0.15324987895296027,-0.29797214494814084,-0.2445544672909623,-0.06909160108563805,-0.12268116144793229,-0.46516093517038215,-0.056257539233850684,-0.08018979449719632,-0.2790406893092543,-0.15415679355641332,-0.17267656399095932,-0.05810078095997673,-0.4509747875053014,-0.36690948553855707,-0.025220331087434156,-0.10837545623528211,-0.057546999415136524,-0.11517688467547937,-0.07738267575560465,-0.2542023146886898,-0.26840168869438363,-0.02530215022258686,-0.04982015735897882,-0.3574504705334116,-0.26947523421572894,-0.2890140312787933,-0.1810795414111781,-0.35696530803994964,-0.40269637459973673,-0.11301983864578569,-0.45044327248388394,-0.09148439600653047,-0.024181837099532477,-0.3534948241237723,-0.4144963351427837,-0.3641518502758073,-0.10616528758289479,-0.11746002412132361,-0.14965760263849148,-0.35280314525844314,-0.33554241753818825,-0.3879983003622842,-0.4490013529445811,-0.49156828047468937,-0.0052004124415753195,-0.07164202506519046,-0.24248439095676522,-0.4750592748180772,-0.18563068660967208,-0.24667791671467443,-0.3517934444974208,-0.4489880822248804,-0.23366233439330242,-0.3789353932963807,-0.18699801276935257,-0.3124354962895943,-0.20477845433846098,-0.040883467885897806,-0.20947162557017351,-0.11942817678224193,-0.17230694321941764,-0.06855373279695598,-0.4645426248092812,-0.28925613689424157,-0.23902450872979963,-0.4674940788870797,-0.46952838704139443,-0.1946845838162018,-0.1451491556695914,-0.029776556582838842,-0.1532154008374399,-0.2738429387598751,-0.26605773601297933,-0.06544390840015502,-0.41992694835887623,-0.0062532191523225755,-0.2778721227732881,-0.022014420445814142,-0.02052937725948656,-0.46233455662711564,-0.39392788908842435,-0.3386279056199395,-0.35014287011254064,-0.4615516350547948,-0.20264513310212817,-0.14538298256955628,-0.06755619395860712,-0.39694549663518874,-0.30440598835322674,-0.3513933891184765,-0.22640995475927062,-0.22066357492612532,-0.34304939908993437,-0.18110193158594357,-0.35011177152922024,-0.34897998673469477,-0.46501268959281405,-0.02986736104668064,-0.4936010478245464,-0.04580023810785361,-0.10011851357861123,-0.4320543617030702,-0.28754269273192157,-0.39983713626163053,-0.31169067335672707,-0.05707093910194316,-0.31142269847546944,-0.3669260243838651,-0.18918085512035687,-0.33372443752227476,-0.1341254635397282,-0.3874943466216917,-0.18722323691362397,-0.02384849203245787,-0.26810587785783724,-0.3841810403233312,-0.20893186224390314,-0.10969061711823758,-0.0009500121187515642,-0.12434771491231522,-0.0177436486859488,-0.005458627044170772,-0.15787868247476444,-0.2996576902274287,-0.15764645963727186,-0.3815745941315414,-0.34752172355365785,-0.21351441943645622,-0.42979857583974057,-0.17225133086794775,-0.38541692893638657,-0.22156192084294002,-0.08240801324114466,-0.10994922851184252,-0.18946161500420633,-0.2803300268837724,-0.4575159985210536,-0.07873167036994921,-0.126763904301594,-0.4013784251997342,-0.486995394598272,-0.4159791140045026,-0.3055886021922113,-0.348955586874923,-0.23136673564130994,-0.1668294065427257,-0.19027114675637036,-0.01960177213971892,-0.3496575541090722,-0.47420533996445224,-0.057465732954802395,-0.2145858483028078,-0.01414877606657683,-0.09585890021148158,-0.21668333984683574,-0.4989375834660561,-0.40554221523289125,-0.3015210076430612,-0.060235589412070634,-0.10662786112178724,-0.016217978902229868,-0.1958287184829013,-0.18581417235616082,-0.4349146041863239,-0.10253097873597561,-0.3674838313882943,-0.23955460333091572,-0.2663018143848255,-0.3493626069244651,-0.14171800297157655,-0.24153092011676336,-0.28304572923074334,-0.053182580734660534,-0.3581972720087391,-0.1472837029994063,-0.33543979231650023,-0.06355597776260402,-0.2265480035426619,-0.40128570899813176,-0.42980655881461705,-0.4207896052808908,-0.13417602912169535,-0.1159345737809393,-0.2869322721863421,-0.18416279133279356,-0.055327434552500665,-0.39968711702246984,-0.10290686929867388,-0.3685252213682856,-0.15601481163328612,-0.3667629282726619,-0.19751050768499878,-0.2448126952951578,-0.1365561161052743,-0.22521370385878814,-0.01989348948002012,-0.27247889100872147,-0.01383680589073033,-0.4998711148459035,-0.03305442693344762,-0.3335439896018044,-0.16693696219251064,-0.3058432144569885,-0.0023699432058646996,-0.31338358967456803,-0.31613284397615504,-0.25503199710427393,-0.11110248902894804,-0.40553088793082637,-0.32164429203348277,-0.3920542026468259,-0.17260300172010135,-0.4577689873548738,-0.3378972400734028,-0.17294081528319138,-0.28428385031822634,-0.11135101581608331,-0.11371095506067219,-0.49868351405842193,-0.41570506545410146,-0.1924555930468006,-0.07747316208108457,-0.015251761967499222,-0.0436333138709144,-0.28960938770723965,-0.350418327181669,-0.19064450359144258,-0.4846934333597155,-0.025050495204568368,-0.37304397713784343,-0.4330262982429903,-0.3271584538714104,-0.22446853743814166,-0.02447533045253414,-0.3205825433070224,-0.21948060800092684,-0.059156853137768195,-0.011033502776376714,-0.43350982934959736,-0.23552759361811215,-0.16332963766219388,-0.2763332955866419,-0.052252548523078146,-0.02422918715249811,-0.006147101665932797,-0.08217285500853155,-0.4013261873282442,-0.1357135334112647,-0.08400122566099055,-0.10612846834656209,-0.21489040543818005,-0.2635266320951509,-0.20498935470340962,-0.28096077889983595,-0.24437372730577123,-0.33639572047874955,-0.23967626463166958,-0.030279830789945783,-0.1141122261620392,-0.17380200127443113,-0.17319585689313532,-0.33901494079914296,-0.11163927529571571,-0.41132882103224555,-0.10390375225588877,-0.29727528070221076,-0.17718071896114762,-0.30559212820313886,-0.11444458754869347,-0.09341993236393553,-0.09497030231749382,-0.04734504928387606,-0.46898880893197936,-0.295567493961827,-0.4835860297318165,-0.4998266328163705,-0.18147184311273967,-0.03877132884860779,-0.4442996657628393,-0.3256401711453566,-0.2728758416985033,-0.47548036793338233,-0.43838659752324427,-0.27916168909522254,-0.39415676480894035,-0.44048696327343617,-0.2815762261148994,-0.06787514751890666,-0.2634566577284708,-0.1184187096866599,-0.3119793136115844,-0.23051927313216425,-0.27602052566930313,-0.26175881252448074,-0.4169609106785157,-0.016250978130198712,-0.2470042497969659,-0.011326319769195181,-0.46956578573626273,-0.38473632559143034,-0.4913199330268919,-0.12920480192807504,-0.0526541106793581,-0.34475762282479594,-0.2788567553442822,-0.3609962998525468,-0.40913081156467235,-0.035050734176465315,-0.2443609028537752,-0.004645017901849791,-0.3808364259062209,-0.013568012756577486,-0.23493123751266698,-0.08261322838739504,-0.2446506026669869,-0.27331222017338785,-0.34976787812737,-0.4785956777563958,-0.42311151993364693,-0.32030462200152265,-0.11278260023707076,-0.1531813780013228,-0.06284330246058634,-0.020861732328554594,-0.45678110687867757,-0.4458848732783768,-0.0015375756159534681,-0.15999768803638648,-0.06044830851075356,-0.03513117299585744,-0.39276292857901207,-0.07407178163785189,-0.2735557764307862,-0.152403633833054,-0.4455398264510054,-0.23062024164304396,-0.2524244420223414,-0.34075411640271935,-0.1619672103306672,-0.35790016720757023,-0.24090149033500008,-0.42913019312892786,-0.3344370028470445,-0.11284224703009704,-0.21233372894904123,-0.06204146480093653,-0.08220089187907509,-0.25267945020478033,-0.269155047887475,-0.026276318210534444,-0.19004747815253387,-0.36728520581930435,-0.03814912675445181,-0.26244711566574186,-0.31352075177625127,-0.3608955132297149,-0.4017810923858208,-0.4232665134593342,-0.07862035845999904,-0.2106916518027555,-0.4682419612706047,-0.042477609022708473,-0.38810064781758347,-0.36971419196607114,-0.22694943098463993,-0.10218703020736308,-0.4024834716015222,-0.2430220096607938,-0.02519705246177706,-0.20738934132934572,-0.17291013480512574,-0.08476810618136255,-0.44328291471737835,-0.4268834964749766,-0.3975740813193708,-0.20789369125943724,-0.2850440638995744,-0.10236080705426731,-0.31452964336020384,-0.32376540211755167,-0.17685605786651593,-0.3123320384365129,-0.41955414009054837,-0.42720382276592805,-0.44361356849351674,-0.07017646591083937,-0.37063601462124973,-0.195319154066117,-0.17968189018592573,-0.28086583974735313,-0.48804359774679973,-0.16762411795702137,-0.2286889976208616,-0.433764488428507,-0.09326771127206623,-0.2157565545223059,-0.22343618143493404,-0.23276925742738552,-0.2904229728450908,-0.0754982436266548,-0.4945005224738849,-0.1928465508758057,-0.22053200865150013,-0.16991630153172466,-0.25486922053279626,-0.24378149517685133,-0.09102631049491572,-0.41113973238108725,-0.21930331647942192,-0.1747716139844876,-0.17193282910822505,-0.09293373244289027,-0.2783958150932381,-0.39798072347421487,-0.22042240903912613,-0.009681505926800948,-0.39353752159099,-0.4036550791504163,-0.2623968920811196,-0.3747277566919358,-0.20336778305475212,-0.49600691838900934,-0.3892982676706197,-0.34891605958580496,-0.3248563508857367,-0.43065172296768395,-0.06906685447412331,-0.2915187961148459,-0.2912764165096081,-0.34869257026249134,-0.37569306283703396,-0.26245767954721133,-0.1266441366176475,-0.32322827040983304,-0.005890927065429485,-0.22044848268191153,-0.40608609331027146,-0.05286735471889681,-0.4680429409242206,-0.2546905363431968,-0.4813177516231507,-0.3829937950056985,-0.06193612498376222,-0.36491249868116926,-0.07290724600322818,-0.42038928805479236,-0.08057926619156963,-0.2932737673279633,-0.3940422179540759,-0.27493717025585607,-0.14382298688171047,-0.2958711622776534,-0.24914873465940734,-0.17474942966881246,-0.4345729717499276,-0.4670782219352778,-0.08503839701046634,-0.30243279253599087,-0.3563360616209629,-0.3299289048395695,-0.3446572325084869,-0.377794839281559,-0.32053640806487826,-0.2632438449464497,-0.49887025422767173,-0.19400112815976545,-0.02313770997154385,-0.15667756908846742,-0.46324355607504175,-0.18398044307598171,-0.49244121078857317,-0.19639448440103768,-0.19221794140988102,-0.053380982432730595,-0.12740758840244293,-0.02947057826400734,-0.24227729732521153,-0.07220744427651826,-0.2290937848754646,-0.48381965818887107,-0.27519138918645303,-0.1683201842103298,-0.1616719454060601,-0.4489650518843453,-0.11752369651244776,-0.4561839225167238,-0.07023826476310047,-0.3960129551154108,-0.2329161914807809,-0.17645640360435144,-0.4246532304351517,-0.40430931520572644,-0.37656417408167975,-0.3194529337025078,-0.2952677295907138,-0.3675939708426027,-0.15795716573799656,-0.3983917388838314,-0.08465660573223777,-0.4313399432201589,-0.2226089007592731,-0.27648257072357774,-0.08168521431548836,-0.37832385400265633,-0.10997437967808199,-0.3370958917784448,-0.4205132643331605,-0.04932312714189846,-0.49268889606232336,-0.3555116300301886,-0.38494286161080293,-0.312068216985913,-0.14443764446995289,-0.29616491140413226,-0.44867666771380743,-0.4559114514498286,-0.27530437866497304,-0.141317099188216,-0.003161979571806972,-0.1011863987611702,-0.20049331382413693,-0.2613765924460677,-0.21646687429936484,-0.11267820417949803,-0.3475978441607094,-0.11827119858660295,-0.47705935222528195,-0.2355935358153326,-0.23695754893177512,-0.33951668822737924,-0.04860805359446052,-0.06826180068721233,-0.44926776680028147,-0.2127337892350405,-0.04797747533272301,-0.46899617797591153,-0.07800666434555048,-0.02268461017914536,-0.32187463842422526,-0.22512310078233366,-0.31752447937318495,-0.09423513883257717,-0.0819909479704991,-0.17728415439281786,-0.22904876823185016,-0.02161028766718187,-0.32418928487469933,-0.3687894661726332,-0.35232580444814776,-0.1074560718530081,-0.05520981242585288,-0.4476342571202615,-0.06587792744991106,-0.31073556727695206,-0.435898565318119,-0.3103888665194202,-0.4319852394898276,-0.08234222974807304,-0.14065317213333417,-0.26318978398458237,-0.19158715420221972,-0.4240008918849365,-0.348736673568392,-0.17410943041886584,-0.4292038404039219,-0.40478890722570837,-0.35274163612236176,-0.3718941811044143,-0.18070688378710664,-0.49219531246008774,-0.19297390196361142,-0.06961339549481371,-0.49335890786824677,-0.022299221141809156,-0.05159134160305512,-0.10262528020364758,-0.22854292212040161,-0.1396276616518468,-0.38311363182138414,-0.4405358016493697,-0.17094323970325953,-0.1118504625179334,-0.25981387017949165,-0.36672591712395197,-0.14939550713593208,-0.23870641282584726,-0.2933180971733971,-0.2949417286188024,-0.3570997503449225,-0.018339761549651667,-0.428251242629624,-0.3683773414275804,-0.0074926406503753595,-0.37332248296103154,-0.08821620098186023,-0.09744181886712988,-0.42486277068108347,-0.06399597803090595,-0.3633215765984952,-0.09920672871816894,-0.21420831950452512,-0.3913447370269497,-0.49195278681788335,-0.04731023105819432,-0.12150830618992392,-0.24341815471902517,-0.24663643888200726,-0.2945344539075069,-0.41394513276660916,-0.16980972776258207,-0.14855416790463416,-0.2630743435067212,-0.1865936700192813,-0.18356106657853677,-0.015500238445115944,-0.06970050683740825,-0.1742717534780025,-0.4027419828812293,-0.21033652851184825,-0.11186592255673034,-0.29582077137809015,-0.32371566298947885,-0.08797408231387094,-0.24175357667148045,-0.49728532928225,-0.33254098506146623,-0.34845904414645035,-0.3052418769802744,-0.36722010748217626,-0.2157426899806798,-0.24700064820872958,-0.038442250360489094,-0.1825983234776214,-0.40054139598312044,-0.07182069628770538,-0.14963183002511005,-0.1887882514787016,-0.0910129858237596,-0.3108242623154298,-0.47756257916126155,-8.676728337297934e-5,-0.35180604806106885,-0.43733706744565437,-0.3146455987991469,-0.1664841962291802,-0.3733380395344563,-0.04148766840466722,-0.18236876497634125,-0.19913165140357592,-0.38042321130162615,-0.05815507455968871,-0.3980180533471036,-0.11524775167745616,-0.3413826352679614,-0.34009965446673684,-0.1225022845124979,-0.24687948437419005,-0.02788312174656038,-0.2411351665954019,-0.034453530325964765,-0.16325338804024836,-0.199816646321062,-0.41517235329359414,-0.3903818092785156,-0.33411485611895086,-0.21664624023840484,-0.4873815239121321,-0.4327532505029009,-0.1580811011123041,-0.40162481165162434,-0.3802289886870387,-0.1765215743806151,-0.35526866241182986,-0.4828185208372585,-0.14621461960967108,-0.27868462677526096,-0.10741382065288296,-0.2707605761221521,-0.06677960360878876,-0.4806334098948706,-0.19421417824434606,-0.017023375808428054,-0.008499731891289275,-0.24028830717805316,-0.07665051078177776,-0.4296392822642492,-0.4756124851555106,-0.06882953797174274,-0.2741063301873311,-0.41140838377178157,-0.1374201440783448,-0.2932388056548142,-0.35195677817610715,-0.13750751232250735,-0.021480319944917836,-0.3902843733111524,-0.4262127041481504,-0.1729131999814657,-0.12101366748721509,-0.24801995794725007,-0.011452443728281914,-0.14461907057945467,-0.18001586704473482,-0.1757208050671164,-0.30187541696226683,-0.057977999405078195,-0.2239295118808311,-0.17241324572517547,-0.3849626553571207,-0.20275560517187097]}

},{}],144:[function(require,module,exports){
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
var abs = require( '@stdlib/math/base/special/abs' );
var EPS = require( '@stdlib/constants/float64/eps' );
var factory = require( './../lib/factory.js' );


// FIXTURES //

var decimalDecimal = require( './fixtures/julia/decimal_decimal.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof factory, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a function', function test( t ) {
	var mgf = factory( 0.0, 1.0 );
	t.equal( typeof mgf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var mgf;
	var y;

	mgf = factory( 1.0 );
	y = mgf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( NaN );
	y = mgf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a negative `k`, the created function always returns `NaN`', function test( t ) {
	var mgf;
	var y;

	mgf = factory( -1.0 );

	y = mgf( 0.4 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a `t >= 0.5`, the created function always returns `NaN`', function test( t ) {
	var mgf;
	var y;

	mgf = factory( 1.0 );

	y = mgf( 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the MGF for `x` given degrees of freedom `k`', function test( t ) {
	var expected;
	var delta;
	var mgf;
	var tol;
	var x;
	var k;
	var y;
	var i;

	expected = decimalDecimal.expected;
	x = decimalDecimal.x;
	k = decimalDecimal.k;
	for ( i = 0; i < x.length; i++ ) {
		mgf = factory( k[i] );
		y = mgf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', k: '+k[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. k: '+k[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/chisquare/mgf/test/test.factory.js")
},{"./../lib/factory.js":140,"./fixtures/julia/decimal_decimal.json":143,"@stdlib/constants/float64/eps":62,"@stdlib/math/base/assert/is-nan":85,"@stdlib/math/base/special/abs":89,"tape":322}],145:[function(require,module,exports){
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
var mgf = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof mgf, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `mgf` functions', function test( t ) {
	t.equal( typeof mgf.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/chisquare/mgf/test/test.js")
},{"./../lib":141,"tape":322}],146:[function(require,module,exports){
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
var abs = require( '@stdlib/math/base/special/abs' );
var EPS = require( '@stdlib/constants/float64/eps' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var mgf = require( './../lib' );


// FIXTURES //

var decimalDecimal = require( './fixtures/julia/decimal_decimal.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof mgf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = mgf( NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = mgf( 0.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided a negative `k`, the function always returns `NaN`', function test( t ) {
	var y;

	y = mgf( 0.4, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 0.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 0.4, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided `t >= 0.5`, the function always returns `NaN`', function test( t ) {
	var y;

	y = mgf( 0.5, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 10.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the MGF for `x` given degrees of freedom `k`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var k;
	var y;
	var i;

	expected = decimalDecimal.expected;
	x = decimalDecimal.x;
	k = decimalDecimal.k;
	for ( i = 0; i < x.length; i++ ) {
		y = mgf( x[i], k[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', k: '+k[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. k: '+k[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/chisquare/mgf/test/test.mgf.js")
},{"./../lib":141,"./fixtures/julia/decimal_decimal.json":143,"@stdlib/constants/float64/eps":62,"@stdlib/constants/float64/ninf":72,"@stdlib/math/base/assert/is-nan":85,"@stdlib/math/base/special/abs":89,"tape":322}],147:[function(require,module,exports){
(function (__filename,__dirname){(function (){
/**
* @license Apache-2.0
*
* Copyright (c) 2025 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var tryRequire = require( '@stdlib/utils/try-require' );
var abs = require( '@stdlib/math/base/special/abs' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var EPS = require( '@stdlib/constants/float64/eps' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );


// VARIABLES //

var mgf = tryRequire( resolve( __dirname, './../lib/native.js' ) );
var opts = {
	'skip': ( mgf instanceof Error )
};


// FIXTURES //

var decimalDecimal = require( './fixtures/julia/decimal_decimal.json' );


// TESTS //

tape( 'main export is a function', opts, function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof mgf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', opts, function test( t ) {
	var y = mgf( NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = mgf( 0.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided a negative `k`, the function always returns `NaN`', opts, function test( t ) {
	var y;

	y = mgf( 0.4, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 0.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 0.4, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided `t >= 0.5`, the function always returns `NaN`', opts, function test( t ) {
	var y;

	y = mgf( 0.5, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 10.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the MGF for `x` given degrees of freedom `k`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var k;
	var y;
	var i;

	expected = decimalDecimal.expected;
	x = decimalDecimal.x;
	k = decimalDecimal.k;
	for ( i = 0; i < x.length; i++ ) {
		y = mgf( x[i], k[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', k: '+k[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. k: '+k[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/chisquare/mgf/test/test.native.js","/lib/node_modules/@stdlib/stats/base/dists/chisquare/mgf/test")
},{"./fixtures/julia/decimal_decimal.json":143,"@stdlib/constants/float64/eps":62,"@stdlib/constants/float64/ninf":72,"@stdlib/math/base/assert/is-nan":85,"@stdlib/math/base/special/abs":89,"@stdlib/utils/try-require":190,"path":204,"tape":322}],148:[function(require,module,exports){
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

},{"./is_number.js":151}],149:[function(require,module,exports){
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

},{"./is_number.js":151,"./zero_pad.js":155}],150:[function(require,module,exports){
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

},{"./main.js":153}],151:[function(require,module,exports){
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

},{}],152:[function(require,module,exports){
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

},{"./format_double.js":148,"./format_integer.js":149,"./is_string.js":152,"./space_pad.js":154,"./zero_pad.js":155}],154:[function(require,module,exports){
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

},{}],155:[function(require,module,exports){
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

},{}],156:[function(require,module,exports){
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

},{"./main.js":157}],157:[function(require,module,exports){
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

},{}],158:[function(require,module,exports){
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

},{"./main.js":160}],159:[function(require,module,exports){
arguments[4][152][0].apply(exports,arguments)
},{"dup":152}],160:[function(require,module,exports){
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

},{"./is_string.js":159,"@stdlib/string/base/format-interpolate":150,"@stdlib/string/base/format-tokenize":156}],161:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

// MAIN //

var Sym = ( typeof Symbol === 'function' ) ? Symbol : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = Sym;

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

/**
* Create a constant function.
*
* @module @stdlib/utils/constant-function
*
* @example
* var constantFunction = require( '@stdlib/utils/constant-function' );
*
* var fcn = constantFunction( 3.14 );
*
* var v = fcn();
* // returns 3.14
*
* v = fcn();
* // returns 3.14
*
* v = fcn();
* // returns 3.14
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":164}],164:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Creates a function which always returns the same value.
*
* @param {*} [value] - value to always return
* @returns {Function} constant function
*
* @example
* var fcn = wrap( 3.14 );
*
* var v = fcn();
* // returns 3.14
*
* v = fcn();
* // returns 3.14
*
* v = fcn();
* // returns 3.14
*/
function wrap( value ) {
	return constantFunction;

	/**
	* Constant function.
	*
	* @private
	* @returns {*} constant value
	*/
	function constantFunction() {
		return value;
	}
}


// EXPORTS //

module.exports = wrap;

},{}],165:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":166}],166:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-buffer":39,"@stdlib/regexp/function-name":137,"@stdlib/utils/native-class":185}],167:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":168}],168:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":172}],169:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],170:[function(require,module,exports){
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

},{}],171:[function(require,module,exports){
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

},{"./define_property.js":170}],172:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":169,"./has_define_property_support.js":171,"./polyfill.js":173}],173:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":158}],174:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./native.js":177,"./polyfill.js":178,"@stdlib/assert/is-function":45}],175:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":176}],176:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./detect.js":174,"@stdlib/object/ctor":135}],177:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],178:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./proto.js":179,"@stdlib/utils/native-class":185}],179:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],180:[function(require,module,exports){
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

},{"./codegen.js":181,"./global_this.js":182,"./self.js":183,"./window.js":184,"@stdlib/assert/is-boolean":33,"@stdlib/string/format":158}],181:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],182:[function(require,module,exports){
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

},{}],183:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],184:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],185:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":186,"./polyfill.js":187,"@stdlib/assert/has-tostringtag-support":20}],186:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":188}],187:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":188,"./tostringtag.js":189,"@stdlib/assert/has-own-property":16}],188:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],189:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/symbol/ctor":161}],190:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":191}],191:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-error":41}],192:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./fixtures/nodelist.js":193,"./fixtures/re.js":194,"./fixtures/typedarray.js":195}],193:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/global":180}],194:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],195:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],196:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./check.js":192,"./main.js":197,"./polyfill.js":198}],197:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/constructor-name":165}],198:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/constructor-name":165}],199:[function(require,module,exports){
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

},{}],200:[function(require,module,exports){

},{}],201:[function(require,module,exports){
arguments[4][200][0].apply(exports,arguments)
},{"dup":200}],202:[function(require,module,exports){
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
},{"base64-js":199,"buffer":202,"ieee754":305}],203:[function(require,module,exports){
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

},{}],204:[function(require,module,exports){
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
},{"_process":312}],205:[function(require,module,exports){
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

},{"events":203,"inherits":306,"readable-stream/lib/_stream_duplex.js":207,"readable-stream/lib/_stream_passthrough.js":208,"readable-stream/lib/_stream_readable.js":209,"readable-stream/lib/_stream_transform.js":210,"readable-stream/lib/_stream_writable.js":211,"readable-stream/lib/internal/streams/end-of-stream.js":215,"readable-stream/lib/internal/streams/pipeline.js":217}],206:[function(require,module,exports){
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

},{}],207:[function(require,module,exports){
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
},{"./_stream_readable":209,"./_stream_writable":211,"_process":312,"inherits":306}],208:[function(require,module,exports){
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
},{"./_stream_transform":210,"inherits":306}],209:[function(require,module,exports){
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
},{"../errors":206,"./_stream_duplex":207,"./internal/streams/async_iterator":212,"./internal/streams/buffer_list":213,"./internal/streams/destroy":214,"./internal/streams/from":216,"./internal/streams/state":218,"./internal/streams/stream":219,"_process":312,"buffer":202,"events":203,"inherits":306,"string_decoder/":321,"util":200}],210:[function(require,module,exports){
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
},{"../errors":206,"./_stream_duplex":207,"inherits":306}],211:[function(require,module,exports){
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
},{"../errors":206,"./_stream_duplex":207,"./internal/streams/destroy":214,"./internal/streams/state":218,"./internal/streams/stream":219,"_process":312,"buffer":202,"inherits":306,"util-deprecate":330}],212:[function(require,module,exports){
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
},{"./end-of-stream":215,"_process":312}],213:[function(require,module,exports){
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
},{"buffer":202,"util":200}],214:[function(require,module,exports){
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
},{"_process":312}],215:[function(require,module,exports){
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
},{"../../../errors":206}],216:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],217:[function(require,module,exports){
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
},{"../../../errors":206,"./end-of-stream":215}],218:[function(require,module,exports){
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
},{"../../../errors":206}],219:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":203}],220:[function(require,module,exports){
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

},{"./":221,"get-intrinsic":296}],221:[function(require,module,exports){
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

},{"es-define-property":281,"es-errors/type":287,"function-bind":295,"get-intrinsic":296,"set-function-length":316}],222:[function(require,module,exports){
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

},{"./lib/is_arguments.js":223,"./lib/keys.js":224}],223:[function(require,module,exports){
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

},{}],224:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],225:[function(require,module,exports){
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

},{"es-define-property":281,"es-errors/syntax":286,"es-errors/type":287,"gopd":297}],226:[function(require,module,exports){
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

},{"define-data-property":225,"has-property-descriptors":298,"object-keys":310}],227:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],228:[function(require,module,exports){
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

},{"./ToNumber":259,"./ToPrimitive":261,"./Type":266}],229:[function(require,module,exports){
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

},{"../helpers/isFinite":274,"../helpers/isNaN":275,"../helpers/isPrefixOf":276,"./ToNumber":259,"./ToPrimitive":261,"es-errors/type":287,"get-intrinsic":296}],230:[function(require,module,exports){
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

},{"call-bind/callBound":220,"es-errors/type":287}],231:[function(require,module,exports){
'use strict';

var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value) {
	return RequireObjectCoercible(value, arguments.length > 1 ? arguments[1] : void undefined);
};

},{"es-object-atoms/RequireObjectCoercible":289}],232:[function(require,module,exports){
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

},{"./DayWithinYear":235,"./InLeapYear":239,"./MonthFromTime":249,"es-errors/eval":282}],233:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":280,"./floor":270}],234:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":270}],235:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":233,"./DayFromYear":234,"./YearFromTime":268}],236:[function(require,module,exports){
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

},{"./modulo":271}],237:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":278,"./IsAccessorDescriptor":240,"./IsDataDescriptor":242,"es-errors/type":287}],238:[function(require,module,exports){
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

},{"../helpers/timeConstants":280,"./floor":270,"./modulo":271}],239:[function(require,module,exports){
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

},{"./DaysInYear":236,"./YearFromTime":268,"es-errors/eval":282}],240:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":278,"es-errors/type":287,"hasown":304}],241:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":307}],242:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":278,"es-errors/type":287,"hasown":304}],243:[function(require,module,exports){
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

},{"./IsAccessorDescriptor":240,"./IsDataDescriptor":242,"./IsPropertyDescriptor":244,"es-errors/type":287}],244:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor(Desc);
};

},{"../helpers/records/property-descriptor":278}],245:[function(require,module,exports){
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

},{"../helpers/isFinite":274,"../helpers/timeConstants":280}],246:[function(require,module,exports){
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

},{"../helpers/isFinite":274,"./DateFromTime":232,"./Day":233,"./MonthFromTime":249,"./ToInteger":258,"./YearFromTime":268,"./floor":270,"./modulo":271,"get-intrinsic":296}],247:[function(require,module,exports){
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

},{"../helpers/isFinite":274,"../helpers/timeConstants":280,"./ToInteger":258}],248:[function(require,module,exports){
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

},{"../helpers/timeConstants":280,"./floor":270,"./modulo":271}],249:[function(require,module,exports){
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

},{"./DayWithinYear":235,"./InLeapYear":239}],250:[function(require,module,exports){
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

},{"../helpers/isNaN":275}],251:[function(require,module,exports){
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

},{"../helpers/timeConstants":280,"./floor":270,"./modulo":271}],252:[function(require,module,exports){
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

},{"./Type":266}],253:[function(require,module,exports){
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


},{"../helpers/isFinite":274,"./ToNumber":259,"./abs":269,"get-intrinsic":296}],254:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":280,"./DayFromYear":234}],255:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":280,"./modulo":271}],256:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],257:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":259}],258:[function(require,module,exports){
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

},{"../helpers/isFinite":274,"../helpers/isNaN":275,"../helpers/sign":279,"./ToNumber":259,"./abs":269,"./floor":270}],259:[function(require,module,exports){
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

},{"./ToPrimitive":261,"call-bind/callBound":220,"safe-regex-test":315}],260:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = require('es-object-atoms/ToObject');

},{"es-object-atoms/ToObject":290}],261:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":292}],262:[function(require,module,exports){
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

},{"./IsCallable":241,"./ToBoolean":256,"./Type":266,"es-errors/type":287,"hasown":304}],263:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":296}],264:[function(require,module,exports){
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

},{"../helpers/isFinite":274,"../helpers/isNaN":275,"../helpers/sign":279,"./ToNumber":259,"./abs":269,"./floor":270,"./modulo":271}],265:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":259}],266:[function(require,module,exports){
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

},{}],267:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":233,"./modulo":271}],268:[function(require,module,exports){
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

},{"call-bind/callBound":220,"get-intrinsic":296}],269:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":296}],270:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],271:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":277}],272:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":280,"./modulo":271}],273:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":228,"./5/AbstractRelationalComparison":229,"./5/Canonicalize":230,"./5/CheckObjectCoercible":231,"./5/DateFromTime":232,"./5/Day":233,"./5/DayFromYear":234,"./5/DayWithinYear":235,"./5/DaysInYear":236,"./5/FromPropertyDescriptor":237,"./5/HourFromTime":238,"./5/InLeapYear":239,"./5/IsAccessorDescriptor":240,"./5/IsCallable":241,"./5/IsDataDescriptor":242,"./5/IsGenericDescriptor":243,"./5/IsPropertyDescriptor":244,"./5/MakeDate":245,"./5/MakeDay":246,"./5/MakeTime":247,"./5/MinFromTime":248,"./5/MonthFromTime":249,"./5/SameValue":250,"./5/SecFromTime":251,"./5/StrictEqualityComparison":252,"./5/TimeClip":253,"./5/TimeFromYear":254,"./5/TimeWithinDay":255,"./5/ToBoolean":256,"./5/ToInt32":257,"./5/ToInteger":258,"./5/ToNumber":259,"./5/ToObject":260,"./5/ToPrimitive":261,"./5/ToPropertyDescriptor":262,"./5/ToString":263,"./5/ToUint16":264,"./5/ToUint32":265,"./5/Type":266,"./5/WeekDay":267,"./5/YearFromTime":268,"./5/abs":269,"./5/floor":270,"./5/modulo":271,"./5/msFromTime":272}],274:[function(require,module,exports){
'use strict';

var $isNaN = require('./isNaN');

module.exports = function (x) { return (typeof x === 'number' || typeof x === 'bigint') && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{"./isNaN":275}],275:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],276:[function(require,module,exports){
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

},{"call-bind/callBound":220}],277:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],278:[function(require,module,exports){
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

},{"es-errors/type":287,"hasown":304}],279:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],280:[function(require,module,exports){
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

},{}],281:[function(require,module,exports){
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

},{"get-intrinsic":296}],282:[function(require,module,exports){
'use strict';

/** @type {import('./eval')} */
module.exports = EvalError;

},{}],283:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Error;

},{}],284:[function(require,module,exports){
'use strict';

/** @type {import('./range')} */
module.exports = RangeError;

},{}],285:[function(require,module,exports){
'use strict';

/** @type {import('./ref')} */
module.exports = ReferenceError;

},{}],286:[function(require,module,exports){
'use strict';

/** @type {import('./syntax')} */
module.exports = SyntaxError;

},{}],287:[function(require,module,exports){
'use strict';

/** @type {import('./type')} */
module.exports = TypeError;

},{}],288:[function(require,module,exports){
'use strict';

/** @type {import('./uri')} */
module.exports = URIError;

},{}],289:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

/** @type {import('./RequireObjectCoercible')} */
module.exports = function RequireObjectCoercible(value) {
	if (value == null) {
		throw new $TypeError((arguments.length > 0 && arguments[1]) || ('Cannot call method on ' + value));
	}
	return value;
};

},{"es-errors/type":287}],290:[function(require,module,exports){
'use strict';

var $Object = require('./');
var RequireObjectCoercible = require('./RequireObjectCoercible');

/** @type {import('./ToObject')} */
module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

},{"./":291,"./RequireObjectCoercible":289}],291:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Object;

},{}],292:[function(require,module,exports){
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

},{"./helpers/isPrimitive":293,"is-callable":307}],293:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],294:[function(require,module,exports){
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

},{}],295:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":294}],296:[function(require,module,exports){
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

},{"es-errors":283,"es-errors/eval":282,"es-errors/range":284,"es-errors/ref":285,"es-errors/syntax":286,"es-errors/type":287,"es-errors/uri":288,"function-bind":295,"has-proto":299,"has-symbols":300,"hasown":304}],297:[function(require,module,exports){
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

},{"get-intrinsic":296}],298:[function(require,module,exports){
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

},{"es-define-property":281}],299:[function(require,module,exports){
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

},{}],300:[function(require,module,exports){
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

},{"./shams":301}],301:[function(require,module,exports){
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

},{}],302:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":301}],303:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":295}],304:[function(require,module,exports){
'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);

},{"function-bind":295}],305:[function(require,module,exports){
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

},{}],306:[function(require,module,exports){
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

},{}],307:[function(require,module,exports){
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

},{}],308:[function(require,module,exports){
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

},{"call-bind/callBound":220,"has-tostringtag/shams":302}],309:[function(require,module,exports){
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

},{"./isArguments":311}],310:[function(require,module,exports){
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

},{"./implementation":309,"./isArguments":311}],311:[function(require,module,exports){
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

},{}],312:[function(require,module,exports){
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

},{}],313:[function(require,module,exports){
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
},{"_process":312,"through":328,"timers":329}],314:[function(require,module,exports){
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

},{"buffer":202}],315:[function(require,module,exports){
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

},{"call-bind/callBound":220,"es-errors/type":287,"is-regex":308}],316:[function(require,module,exports){
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

},{"define-data-property":225,"es-errors/type":287,"get-intrinsic":296,"gopd":297,"has-property-descriptors":298}],317:[function(require,module,exports){
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

},{"es-abstract/es5":273,"function-bind":295}],318:[function(require,module,exports){
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

},{"./implementation":317,"./polyfill":319,"./shim":320,"define-properties":226,"function-bind":295}],319:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":317}],320:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":319,"define-properties":226}],321:[function(require,module,exports){
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
},{"safe-buffer":314}],322:[function(require,module,exports){
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
},{"./lib/default_stream":323,"./lib/results":325,"./lib/test":326,"_process":312,"defined":227,"through":328,"timers":329}],323:[function(require,module,exports){
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
},{"_process":312,"fs":201,"through":328}],324:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":312,"timers":329}],325:[function(require,module,exports){
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
},{"_process":312,"events":203,"function-bind":295,"has":303,"inherits":306,"object-inspect":327,"resumer":313,"through":328,"timers":329}],326:[function(require,module,exports){
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
},{"./next_tick":324,"deep-equal":222,"defined":227,"events":203,"has":303,"inherits":306,"path":204,"string.prototype.trim":318}],327:[function(require,module,exports){
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

},{}],328:[function(require,module,exports){
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
},{"_process":312,"stream":205}],329:[function(require,module,exports){
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
},{"process/browser.js":312,"timers":329}],330:[function(require,module,exports){
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
},{}]},{},[144,145,146,147]);
