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

},{"@stdlib/utils/native-class":195}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":34,"./object.js":35,"./primitive.js":36,"@stdlib/utils/define-nonenumerable-read-only-property":177}],34:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./try2serialize.js":38,"@stdlib/assert/has-tostringtag-support":20,"@stdlib/boolean/ctor":60,"@stdlib/utils/native-class":195}],36:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/get-prototype-of":185,"@stdlib/utils/native-class":195}],43:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":195}],45:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/type-of":206}],47:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":51,"@stdlib/assert/tools/array-function":58,"@stdlib/utils/define-nonenumerable-read-only-property":177}],51:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":195}],54:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":195}],56:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":195}],58:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-array":31,"@stdlib/string/format":168}],60:[function(require,module,exports){
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

},{"@stdlib/number/ctor":118}],73:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":99}],85:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/high-word-abs-mask":64,"@stdlib/constants/float64/high-word-sign-mask":66,"@stdlib/number/float64/base/from-words":122,"@stdlib/number/float64/base/get-high-word":126,"@stdlib/number/float64/base/to-words":138}],95:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_p.js":98,"@stdlib/math/base/special/ldexp":101}],96:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./expmulti.js":95,"@stdlib/constants/float64/ninf":72,"@stdlib/constants/float64/pinf":74,"@stdlib/math/base/assert/is-nan":85,"@stdlib/math/base/special/trunc":116}],98:[function(require,module,exports){
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

},{"@stdlib/constants/float64/exponent-bias":63,"@stdlib/constants/float64/max-base2-exponent":70,"@stdlib/constants/float64/max-base2-exponent-subnormal":69,"@stdlib/constants/float64/min-base2-exponent-subnormal":71,"@stdlib/constants/float64/ninf":72,"@stdlib/constants/float64/pinf":74,"@stdlib/math/base/assert/is-infinite":81,"@stdlib/math/base/assert/is-nan":85,"@stdlib/math/base/special/copysign":93,"@stdlib/number/float64/base/exponent":120,"@stdlib/number/float64/base/from-words":122,"@stdlib/number/float64/base/normalize":129,"@stdlib/number/float64/base/to-words":138}],103:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":106}],104:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_l.js":107,"@stdlib/constants/float64/exponent-bias":63,"@stdlib/constants/float64/num-high-word-significand-bits":73,"@stdlib/number/float64/base/get-high-word":126,"@stdlib/number/float64/base/set-high-word":132,"@stdlib/number/float64/base/set-low-word":134}],105:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_w.js":109,"@stdlib/number/float64/base/set-low-word":134}],106:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./log2ax.js":104,"./logx.js":105,"./pow2.js":110,"./x_is_zero.js":111,"./y_is_huge.js":112,"./y_is_infinite.js":113,"@stdlib/constants/float64/high-word-abs-mask":64,"@stdlib/constants/float64/ninf":72,"@stdlib/constants/float64/pinf":74,"@stdlib/math/base/assert/is-infinite":81,"@stdlib/math/base/assert/is-integer":83,"@stdlib/math/base/assert/is-nan":85,"@stdlib/math/base/assert/is-odd":87,"@stdlib/math/base/special/abs":89,"@stdlib/math/base/special/sqrt":114,"@stdlib/number/float64/base/set-low-word":134,"@stdlib/number/float64/base/to-words":138,"@stdlib/number/uint32/base/to-int32":141}],107:[function(require,module,exports){
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

},{}],108:[function(require,module,exports){
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

},{}],109:[function(require,module,exports){
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

},{"./polyval_p.js":108,"@stdlib/constants/float64/exponent-bias":63,"@stdlib/constants/float64/high-word-abs-mask":64,"@stdlib/constants/float64/high-word-significand-mask":67,"@stdlib/constants/float64/ln-two":68,"@stdlib/constants/float64/num-high-word-significand-bits":73,"@stdlib/math/base/special/ldexp":101,"@stdlib/number/float64/base/get-high-word":126,"@stdlib/number/float64/base/set-high-word":132,"@stdlib/number/float64/base/set-low-word":134,"@stdlib/number/uint32/base/to-int32":141}],111:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/constants/float64/ninf":72,"@stdlib/constants/float64/pinf":74,"@stdlib/math/base/assert/is-odd":87,"@stdlib/math/base/special/copysign":93}],112:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/constants/float64/high-word-abs-mask":64,"@stdlib/number/float64/base/get-high-word":126}],113:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/pinf":74,"@stdlib/math/base/special/abs":89}],114:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],116:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/special/ceil":91,"@stdlib/math/base/special/floor":99}],118:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

// EXPORTS //

module.exports = Number; // eslint-disable-line stdlib/require-globals

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

},{"@stdlib/constants/float64/exponent-bias":63,"@stdlib/constants/float64/high-word-exponent-mask":65,"@stdlib/number/float64/base/get-high-word":126}],122:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":124}],123:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":48}],124:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":123,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],125:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":48}],126:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":125,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],128:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/smallest-normal":75,"@stdlib/math/base/assert/is-infinite":81,"@stdlib/math/base/assert/is-nan":85,"@stdlib/math/base/special/abs":89}],129:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":128,"./main.js":130,"@stdlib/utils/define-nonenumerable-read-only-property":177}],130:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":128}],131:[function(require,module,exports){
arguments[4][125][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":48,"dup":125}],132:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":131,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],134:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":136}],135:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":48}],136:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./low.js":135,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],137:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":139,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],138:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":137,"./main.js":140,"@stdlib/utils/define-nonenumerable-read-only-property":177}],139:[function(require,module,exports){
arguments[4][123][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":48,"dup":123}],140:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":137}],141:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":142}],142:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":144}],144:[function(require,module,exports){
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

},{}],145:[function(require,module,exports){
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

},{"./main.js":146,"./regexp.js":147,"@stdlib/utils/define-nonenumerable-read-only-property":177}],146:[function(require,module,exports){
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

},{"./main.js":146}],148:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );


// MAIN //

/**
* Returns a function for evaluating the moment-generating function (MGF) for a triangular distribution with lower limit `a`, upper limit `b`, and mode `c`.
*
* @param {number} a - lower limit
* @param {number} b - upper limit
* @param {number} c - mode
* @returns {Function} MGF
*
* @example
* var mgf = factory( 0.0, 2.0, 1.0 );
* var y = mgf( -1.0 );
* // returns ~0.3996
*
* y = mgf( 2.0 );
* // returns ~10.205
*/
function factory( a, b, c ) {
	var bmc;
	var bma;
	var cma;

	if (
		isnan( a ) ||
		isnan( b ) ||
		isnan( c ) ||
		a > c ||
		c > b
	) {
		return constantFunction( NaN );
	}
	bmc = b - c;
	bma = b - a;
	cma = c - a;
	return mgf;

	/**
	* Evaluates the moment-generating function (MGF) for a triangular distribution.
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
		var ret;

		if ( isnan( t ) ) {
			return NaN;
		}
		if ( t === 0.0 ) {
			return 1.0;
		}
		ret = ( bmc * exp( a*t ) ) - ( bma * exp( c*t ) );
		ret += cma * exp( b*t );
		ret *= 2.0;
		ret /= bma * cma * bmc * pow( t, 2.0 );
		return ret;
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/assert/is-nan":85,"@stdlib/math/base/special/exp":96,"@stdlib/math/base/special/pow":103,"@stdlib/utils/constant-function":173}],149:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Evaluate the moment-generating function (MGF) for a triangular distribution.
*
* @module @stdlib/stats/base/dists/triangular/mgf
*
* @example
* var mgf = require( '@stdlib/stats/base/dists/triangular/mgf' );
*
* var y = mgf( 0.5, -1.0, 1.0, 0.0 );
* // returns ~1.021
*
* y = mgf( 0.5, -1.0, 1.0, 0.5 );
* // returns ~1.111
*
* y = mgf( -0.3, -20.0, 0.0, -2.0 );
* // returns ~24.334
*
* y = mgf( -2.0, -1.0, 1.0, 0.0 );
* // returns ~1.381
*
* var mymgf = mgf.factory( 0.0, 2.0, 1.0 );
* y = mymgf( -1.0 );
* // returns ~0.3996
*
* y = mymgf( 2.0 );
* // returns ~10.205
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( main, 'factory', factory );


// EXPORTS //

module.exports = main;

},{"./factory.js":148,"./main.js":150,"@stdlib/utils/define-nonenumerable-read-only-property":177}],150:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );


// MAIN //

/**
* Evaluates the moment-generating function (MGF) for a triangular distribution with lower limit `a`, upper limit `b`, and mode `c` at a value `t`.
*
* @param {number} t - input value
* @param {number} a - lower limit
* @param {number} b - upper limit
* @param {number} c - mode
* @returns {number} evaluated MGF
*
* @example
* var y = mgf( 0.5, -1.0, 1.0, 0.0 );
* // returns ~1.021
*
* @example
* var y = mgf( 0.5, -1.0, 1.0, 0.5 );
* // returns ~1.111
*
* @example
* var y = mgf( -0.3, -20.0, 0.0, -2.0 );
* // returns ~24.334
*
* @example
* var y = mgf( -2.0, -1.0, 1.0, 0.0 );
* // returns ~1.381
*
* @example
* var y = mgf( NaN, 0.0, 1.0, 0.5 );
* // returns NaN
*
* @example
* var y = mgf( 0.0, NaN, 1.0, 0.5 );
* // returns NaN
*
* @example
* var y = mgf( 0.0, 0.0, NaN, 0.5 );
* // returns NaN
*
* @example
* var y = mgf( 0.5, 1.0, 0.0, NaN );
* // returns NaN
*
* @example
* var y = mgf( 0.5, 1.0, 0.0, 1.5 );
* // returns NaN
*/
function mgf( t, a, b, c ) {
	var bmc;
	var bma;
	var cma;
	var ret;

	if (
		isnan( t ) ||
		isnan( a ) ||
		isnan( b ) ||
		isnan( c ) ||
		a > c ||
		c > b
	) {
		return NaN;
	}
	if ( t === 0.0 ) {
		return 1.0;
	}
	bmc = b - c;
	bma = b - a;
	cma = c - a;
	ret = ( bmc * exp( a*t ) ) - ( bma * exp( c*t ) );
	ret += cma * exp( b*t );
	ret *= 2.0;
	ret /= bma * cma * bmc * pow( t, 2.0 );
	return ret;
}


// EXPORTS //

module.exports = mgf;

},{"@stdlib/math/base/assert/is-nan":85,"@stdlib/math/base/special/exp":96,"@stdlib/math/base/special/pow":103}],151:[function(require,module,exports){
module.exports={"expected":[1.1189725843656988,1.5238843566681828e15,8.4489371609401245e9,31347.414770800657,1.2618000768712495e12,1.062978052512897e16,1.1464966983638506e29,453.3853311788214,16.76051532227179,1.2594362727415222e24,851052.3466521241,137.43875988712156,2.1768012558401582e18,331296.2905698707,4.516147415817215e6,1.2926866141453392e14,1.062425433179858,2685.191465345485,3.279019331276473e7,2.8871103576226555e18,106119.55905028168,116.44732048706494,11835.864930365104,6770.472224339083,1.1616370170537047,6.16152084577705,2473.367820408584,1.088787291145904e17,1.460224211391112e8,2035.6756623472825,1.5237678340099534e23,8.650380815979229e8,2298.9643867954574,21726.938148616468,2.5770349576676208e17,2.3768037221278748e11,9.53875941386707,36277.57839597283,185189.61916224717,21057.802319686438,4.9960298366131715e7,4.820930117868855e9,2.0739183575210956e11,817734.6488937899,3.577015496525656e21,4.61607385637137e15,1.7841876817974472e8,1.7669534681393313e6,2.3788805704199995e19,2.7389135470967992e13,3.0484713696546453,5421.667993927934,6.4704206040602446e7,1.4321678275731822e7,1.3845604389495256e14,3.690884921289396e10,9.461506726474005e11,8.65059397042696e6,6.437796045867403e20,6.367793833675726e12,151.68381155590336,4.018228533999939e10,9.371681405373284e14,251.41452616552098,45.465242253018154,1.2832543042533582e11,1.0033118957875662e10,1.2362353069886924e28,268514.2779553316,30304.472520235708,1.216814565906832,2.1476214031383543e13,4.092763830526531e19,3.8097203767726177e12,3.865230614767941e16,2.0984117829435345e10,2.2344771251495834e17,119180.04967925655,3.861984231294527e8,4.361157909223643,6.679779650024008e10,810.9984333135353,1.874707583543628e7,5.0796809427957756e10,1.7849878252966993e7,7.176747865825338e19,493437.80707542726,1.3253490218571382e22,1294.8332711762214,482.7799987182065,8.866357742101876,2.2703408174348742e17,2.089112816124126e31,1.4474426289937825e14,852.1296028599181,24701.79128448053,438.9233549817259,3.3822318033277387e19,36388.34025788333,8.628218594303764,4.083896412273987e9,7.912161111810418e25,5777.252887007707,5.955608520443342e8,3.870333082105076,1136.7269564959838,220.14921084190576,10.662208282051687,3.7231767417050774,696804.6381445997,10.119812264872062,768.0690961523568,9.459108443851335,15.428679768771152,1.308162044956805e27,1.1611459435352327e33,5.9260407528767445,55.84806221638522,5.168682020270626e11,59.61055191221299,2.945387095541772e25,1.1961612417068202e9,1.2280814204617492e6,8.265566494482366,8.128263578986973e12,3.12972987366776e23,3.744734450850545e14,3.04995440636615e19,137.52035725323887,5.120383243897444,5.887520187161241e7,348.6134254488623,84915.81843831875,13.803885405125035,2.5745959129220563e11,7.47996761182148e14,1.0009423374479784e20,14.070649641467579,2.4835968899487257e8,1.312562474003966e12,3.642844662411214e27,5.461548888172518e13,61945.906205645115,121.49133735953433,4.6835732259357246e23,1.2545322815757858,4.441401830810533e16,527.7333335137399,1.0987073424715597e24,1.1516645697409467,1.5809290814219757e31,6.531097399380689e34,7.360234091055871e20,1.4163801282077328,9.935922353084916e21,1.5369218476939956e14,50.94844846180597,7.957095281016655e24,2.818024024099771e8,1.116451605256701e8,13.654784458683238,11346.734578366966,3.14607856158776e18,28.719393040206043,4.0926634159617674e18,4.041257581984603e10,1.8015413851292267e8,22.6014263058771,5.96395612127895e15,1.428080864225932e14,33.51547382263835,40809.608577064435,38.761131848126574,16597.708712884225,1.8705259906830845e12,10.52401636963325,1.0679763571610828e6,227.45993719369218,2.0859608852289926e7,1.5449230255842115e28,3851.3559762655445,1.6560708666999683e10,105.39219779843994,2.025822118073019e15,6.968700939591018e9,4.3053474026828877e12,21.89352915177392,158.3023309880819,5.861072365266884e6,9.375609691395743e8,4.080415847418239e10,82.26672188609123,1.8901694213838725,21581.482697620908,1.7995181941249117e24,5.680582630100613e16,109.70000999711276,1.1373651402791326e13,137.0579290237884,2.6513082859924845e17,2.001465586494783e19,2.152888179289887,1.717577419520167e11,756415.3735478995,1871.8675751623969,2640.227039279155,1.8212217053278206e12,73.39812799633971,8.446737972671967e25,1408.5785035164463,2917.0614716405235,1.0559736711516342e19,1.1410817379031575e14,172.41382337532733,49.50845765567269,1.943616774006999e13,6.756385428346744e8,1.0053392931950027,32.3267901927138,3528.60962202604,6.394731657198057e8,1.6891023071286037e10,11215.19275776964,8.67246686546872e14,7.231549568178067e8,4.819924137680151e12,2.019064631578233e9,7.769669938002801e25,7.8908458984705e10,3.8120565061100183e11,2.79596127838364e7,30136.536507742294,1.1137865145305986e12,1.2904489240002986e12,3.6063280899438875e13,285.11295883512076,87.57348278904149,1.182193120175091e25,104474.32108286477,8.997061605044767e20,20944.04863454768,7.305126895584455e9,21.07878906296675,1.2804198051043112e7,2.1672799317413917e9,1.7846932100211659,364.30598589400853,78319.99936990571,2043.5578620232668,5.8546798790713796e23,2.0588277128980745e12,1.913999284138749e8,3.6524740539594234e23,4.857186935427868e13,2133.671471885721,4.564205851355578e8,1.397844266427902e6,1.3828850783495544e26,1.705929966954106e22,9.477137515239476e14,9.627763459529535e14,8.621994607561173e16,1.1568306069887027e14,1.0092676289654797e10,1.3881888244884404,5348.270847399175,2.245130638170523e8,12077.546540384965,15.652074164702011,44702.915968755995,6.789544774155077e7,6.772539737731665e14,1.565291199586745e16,1.5622135225398736e20,1.7326558191394507e11,375.218698981077,9527.57442725861,3.14096261876123e30,4.86239141432917e25,60.71675079225216,5.31559646711668e7,2122.5178435143134,487548.0302546454,15870.563853015614,1.2612513137446102e7,2.4694067793035077,1.2530737929616223e21,1.98139978009681e14,6283.651708057953,4.354290558585756e14,88808.55069619436,5.909787730022862e7,9.095041837337585e6,8.88742521967711e14,1.880186420228686e11,1.407890461258124,308.5615565417241,2.8593774018332803e20,8.855774669010687e9,1.4977726636286666,149.33211481822082,1.872639106348733e14,2.6214819856518625e11,22.755424772298614,23.328795051073584,1011.3165548091926,3.3644804313553045e26,10898.580720946862,8.065303698308234,18981.434889432698,2.4093524164699596,5.855439760573215e18,1.7071465706522927e23,1.813106369994591,4.890566359478945e12,2.9038478883358017,6.385104266559643e12,1.3396318900771418e9,6173.724359447734,2.2145326973603106e9,2971.748940518854,444393.58178492216,3.297414706030445e6,13.152108422188743,1.8478287433501304,5.369497694827904e13,2.206331030996897e7,2.3144553920176606e12,3.1905002342023556e14,90.19033918127366,138.28497958299332,101027.15592477226,226.8520205468612,1547.1417738450098,1.1220909593311025e13,3948.375224620011,1.7040253503140348e16,9.875221674037516e6,1.8013122740337828e15,2344.348168749038,3.11295253656757e10,1.7569829781046188e11,59.4581659791172,3.2263827991987e14,2.1967896874317856e9,5.918183079059273e9,2.270144244068388,1.2242211055725326e19,8.132904131116318e6,33.37093838283192,1.9477625956845945e19,519490.3789684033,1.7665314235130079e9,6.52300763193242,2.980635148041554e14,1.2588689793666406e12,2.175171089578732e10,5.696163285809947e9,4.4694834790436504e16,3.333472783484547e9,2.7874036278915722e17,1402.0050278897052,8.638716630483205e16,12666.76537111229,12.336613249697134,2.1356240811392346e20,16.321938966911013,684.5528584686126,1.4942436482457294e9,2.142719265550933e17,3380.591645364953,14980.736607367924,9204.389151729267,18.7048557695313,1.8441137794914077e12,7.667544682341776e8,290313.1783843276,2.1359142274427593e10,87.61113473118797,5.739748565768027e7,55.51704493343185,2.692689031459243e12,23.358411211872983,3.762229795417929e16,8.654614903390564e13,1.2166619098918461e18,5.00574905282039e14,6.87786928846535e8,1.1962564930104299e7,2.7385726586092063,1.6429970170061682e10,971.7678553091257,88873.21030878613,3.384856741794847e32,18.610301144386924,7.707258712968643e7,679.4663360761501,8.694107452384974e20,2.343645474614309e9,6.204636788524469e15,3.6748085600020786e23,1.2104812172778818e15,1.410624684158296e13,3.3287697154393593e10,1.7269005213226504e27,1.643221088826337e7,6.953374315190535e11,280.75907883845036,11583.153665586124,176.88300084881854,2.4619292090928975e24,1.6036317227967543,6.355630789499023e7,2.586407275645698e6,1.9703263436200008e13,1.076021784583359e12,2.3722719440097113e9,2.4754570138860592e30,3.6692776271596353e12,159.48427217857412,9.113935940751038e6,801473.476808489,2.237781331933621e28,39845.567172522045,102.62258526522548,2.663416847472862,60.611140600178224,3.9293638855953296e11,9.156857581423517e23,2.1931548434912266e18,1.231044243715981,4.16160257471117e7,3.050614744192303e30,1.694829726020589e21,2.6899041836419277e9,3.7406862830811078e31,775232.1197765992,1.080344077764086,2.5169366766159476,3.6125273186486355e15,2.869802201142519e18,692.9746391432244,8.636768556704764e10,1.8831408143003894,186.7626722586152,5.264603998597367e25,22.48151597993543,838225.3867242938,3.7086737644894205e15,3.624373605762994e17,20354.992465566706,1.7625429774427341e12,2.1345698388262444e10,2.66895045760022e15,140987.75543208726,2.6862253256623235e7,2.3251092557142143e10,30382.41527116816,1.377916557707368e25,7.77675357658396e8,19.924937824850655,2.319992379789291e23,32.323678293776204,626.6758815364049,3.463435302920288e24,6.651192708535158e12,3.705758394318642,1.4960690668031106e12,762613.7519017293,22.976499768554216,1.250107236152795,9833.079192814292,6375.247615470287,7.792717969429077,27.46549763142332,3.5173484202241023,4.108568569154759e22,1.0915678249557098e17,4.4577994335178375e13,87.26001366590023,2.8805361842196056e10,3.7732125340581435e8,3.059301536097691,1.3162687717571524e8,2.0895487029345066e13,371047.78515688656,4.873808172383391e12,4904.900753089068,4.629714937321061e12,261.0460452145177,3.3368436133366257e10,921.3445857513566,6.707734495958058,1.7905518189766544e11,4.0017566767514227e6,1.7051378340545327e6,260.26211740623097,4.2757378057547254e27,1.9925733329306465e7,5.631334595740848,1160.3669749857597,2.542893901447516e6,1.0926228270458958e10,1373.234076910012,967.1789231192045,1.7564493475123035,2.596728970879342e18,3971.8475302932875,3.1454720189326717,6.4238812662765115e7,53.53910855626881,7.4868997041083045e25,8.5733445640034e15,505.6733410527391,8.004556456280403e17,5.92057232709485e25,85.03171826095569,470983.55463511555,9.00842686766624e31,2.014993933349821e12,6.006233455812511e10,5.718995685500515e6,2.881809751770272,402661.1286133301,1531.3598999670774,1.3260982592472841e11,7.701432163243031,183.25461503993913,2.647588179594764e9,2.901678704642994e15,1.5495075700787042,6.662437163973711e15,133049.0373166143,6.383950816147473e22,5.545966205720306e9,1.1522702681072132e20,14.266526636122546,2.6281929370687123e7,3.0361457851182826e7,3.1552996269848797e19,3.43023368927558,1.2989867804418322,2.0694469070401786e28,8.873265593899809e18,5.546628686692829,1.026345477391699e8,13306.293983489406,3.2865039919779985e6,2.3986510960446214e19,2.1650477549685293e25,35472.65066078688,7.571066422344035e10,2.0853533041191166e14,7.165244286620135e11,1.6393379475264322e11,3.8844447719340194e14,926186.375293732,10.410357687879916,3.7820636475886185e10,2595.566617727348,1.4889111556067749e10,16919.709789650653,7.99109245910282e23,2.3639734491712344e11,2.06986024942831e21,3.4709576433933437e25,1.471762866696679e12,20.04540482353868,4.134033988439739e21,3.1927223009191537e6,5.469412185928154e10,3.219063345201765e6,18272.98039342669,1.1784987772329132e11,1.0907126297460077e6,1429.6890095080494,5.7890357148507,205.64177648191622,334.0333814559576,2.2213712843508577e20,125810.20709041107,1.6397065790463123e32,492.9874720357207,4.557230262816527e16,8.863310465050018e27,10441.073093918014,5.713815589454073e19,9.592195367432346e12,3.3247351599495093e12,1.1391036337346341e6,3.043734009526069e20,3.6930723326098946e10,2.416928890353111e9,919.957481751907,3.1673624562934344e11,1.68677459924873,350229.6711778073,8.775117050644731,214851.22795895292,8711.657043084224,1.0059980355806373e6,6.25742969504144e28,1.0555482546815662,2.06221251097387,3.324480954448755e13,17.434646892421274,113.6216352931389,571777.7469978076,1.7039048940733098e17,2180.498896315837,1.2603204505133145e12,1.098620645993823e27,3.301531772884158e32,14.979127608543168,9.306666368980012e12,1.2922426086377325e7,32.55196101472696,2.2061042246225655e7,3.81819405221109e29,1.6557123673617297e6,7.200383586765748e12,9.114630766708345e11,147.9881641724226,3.824946292683046e7,1.4755064782190457,49.79350917238442,1.723161086078051,1.4441433254064342e8,1.0957044313409921e18,1.671933677062273e8,8.249036903902896e7,5.789661670821279e7,6.137466943222776e25,5.341412217542364e34,4.302595837988865e6,18366.76375447775,1.4597935465586288e14,3.522251781081439e7,4.0807087002560063e6,7.748287526930714e17,2.2987048821725522e14,4.690829152692961e6,1.8484278222598285,1.1085743561357207e18,2258.0773388875778,3.060292234378654e10,2.443311045410087e6,5.376448472409815e15,1.7954361324776047e21,474042.8486667955,3.126850272888683e9,9.17441908746411e24,7.16419877211319e6,1.9499788473322876e6,1.7070065010152988e9,471.3102751774698,1.3776060394062048e26,8.510296217809273e20,6462.3271338695595,2.5070017627634518e10,38.574080278626376,645.041690589632,6.307707984187888,1.25111704775623e6,1.4918698970901916e7,1.5827909721027156e14,84.23348212216958,4.259039928243583e7,1.6395254628970503e10,2.270821280514961e11,1.5170751545538116e31,4.406572396743645,1.9576353824137216e14,3.012384534708247e15,2.5839234927253907,3.154039152696337e6,1.0163163375601888e15,2.8107824729415167,1021.1872251246468,2.6809499994803154e28,1.7654075006832338e14,3.351655954220246e17,23707.327563568426,6.297990360689559e8,3.845080546281776,4.0978722153297026e12,20081.928420566484,406.6573317439715,8.073866195672496,106.78131485673892,5.417591900594901e12,215167.63069127183,4.1781724807343676e24,98.49596361061867,1.7642883110538684e6,53331.059358981816,1.442835201717437e26,1.0117342661608664e14,1.2944275965587223e35,1.070808129976483e6,3.9907240919083664e13,3.236733417967235e11,1.6999993085620788e15,3.330043117116561e7,10.841033631810236,1.5476055729326227e19,5.264750910110478e6,2.338110609362655e12,4904.165180162864,4.205676558016896e21,25.81130785237713,25096.971734302733,2.6956537710272107e11,3.1439146620777325e26,90.04442594228485,1.0604430024284842e16,216.83897797320338,1.1233351917924695e28,1.9071234224562824e16,184260.94725778262,35.74614627526317,1.6152594851779816e10,2.5038033429044294e6,1.1098241386617926e16,1.9626597896723293e28,12.723384956439244,4.494661238051753,2.2428311415902917,7.074861249239427e10,42027.5913725747,6.818188727339656,7.518488779042584e9,1.503050722480377e17,6.258760431362291e12,3.507272790747713e7,7.025525444699429e14,1680.4909466976803,1.6144658405649015e22,8.85760040393078e12,332.6818535107418,2.363824335611147e20,3127.360577972437,1.3591870003715971,193901.1112214202,2.3903345673514936e7,2.939104439622864e6,8.035383479481654e6,1.3411709461070457e9,307.2173167708473,72.18130240142423,3415.889393646435,14.877559569222308,2.74649064603753e9,9.203170465896563e9,4.2615795436560155,2.7822575477746883,3.2498825983010526,2.06293772188676e23,3.231588905886006e19,10.641702238232384,6.872390591052033e27,1.8288565672774952e22,1.6308894480808218,47101.38275707822,1.808638355162578e6,60.97974522655555,131.41200747218767,257.5503916419784,8659.999012042379,9.609446644820659e14,4.387625617051792e27,3.3330911641756906e6,654.7565147797094,3.7383617839280635e12,5.3808260231347943e11,106.00067943725578,4.839726980036629,2893.2923508930544,90.41716429184268,12.052660280366755,36.13824516292334,6733.095563441348,7.016817709968402e17,1.5343361348873258e17,125.5801372222261,4.108093295900047,5.780959882646038e25,3.6584235106794996,797762.6591615733,11368.721391373409,3.810323623435026e14,77442.7305696381,1.4798149159859894e26,6.356628912339634e11,30044.71534713708,5.476187617502641e15,3.7583662592838403,1.1496357499214143e11,1.487397012476292,7.28598234835235e28,343241.652084314,4.332129690090862,2.773044101304164,2.5653781000664592e17,1.2193366324693028e23,91.22168011134616,1.8763464444231457e8,1.1332341501674385e8,194.24740126371748,9997.406955061533,4.055915265538779,57.60610092380775,238.7441174243531,1.060578634820567,12.10742185224316,6.487374030187728e15,1.1225254353676742e7,166.51140377150026,20867.711117541017,345.9539637360906,2.417190064229587,9.86716752210702,8513.250004750014,1.607666092186686e16,2.0299745996280836e25,3.6038042454341254e6,220687.881923986,7.46400002793025e7,18923.881316301075,12058.376833068143,1.0102881647681976e16,2.897321511923632e14,3.513720044944838e12,5.3184712896061766e13,4.622340788973087e14,3.2306029471685958,3.7842057080688796e19,212.65349361466906,1.7726059860777788e9,1122.2867006200543,4.284383825736321e14,1.2186242134503483e23,3662.5510886643933,1.5122584707663282,13774.268157720247,1.3675134893488486e17,1368.291679523605,2.974319981654898e7,1.2049484920152695e9,89438.58866282913,5.924906074428695e13,68.01123596028506,7.771501358310652e6,15.502884505258628,4.258753102616242e6,8.065839953845983e34,3.0209143321973214e9,9.816351811935328e6,9.123547492218053e13,1.0887703431184722e8,3.323141359433755e7,5.92854083120924e11,97.80838581953522,11.426306179705122,3.452487430759005e14,4.895991021266846e13,117804.3569839177,17754.466573557816,9674.931011995035,21356.19454960386,1.2263150965481732e11,1.7508191321777782,1.8127375375279484e13,8.040948244199418e17,6.388844013840323e12,2.0158572196145437e27,560667.3692101304,441231.1455615395,59508.244498766646,75239.98912328071,1.0507583907745028,1.753094028381501e9,45.44335892631686,233.31952644751027,4.546637159761795e11,2.5106409199164805e23,106.89444297651903,2.7876867975630435,117.94063267646294,1.6565610476361334e8,5.923980640098388e24,5.439537579961216e30,5.072438735284522,8537.601391076114,3319.5941833009874,1.2072252867401314e14,5.214593029615967e6,5.19277417362101,2096.3671977081312,5.183184538220265e13,31360.564003071286,5.08966658050412,2.5721060457154956e16,1.4943366551955084,2.3146575790204854e19,3.835615787063868e15,2.816864025878184e27,8.077219911602492e9,64.7732705421494,394.83653924457553,6.345486185532048e6,9.386051338841083,7.529172977511903e9,922.540702581778,30.86350709879471,4.942809360287545e6,1.2790503971776863,3631.494680058373,7809.367936730156,1.8180379806085285e10,2.8307480865029656e14,1.368250093116476e22,3.5113687353515484e16,4.386201309874189e28,5.435406136591647,9.491837039795936e13,2.44342830883018,121.56497570608941,1.5729453765474432e6,288191.1784358536,2.8748326036966314e22,8.96340322294828e11,4.1837527249187366e6,2.047792434468004e7,1.0021639788152048e19,66.01794435899131,2.5309552497893504e23,7.3949149309731865,1.9113547593055585e33,4.3037282092749546e12,200.29639416703512,39512.18913654525,8.714679703436751e14,1.579099142804994e8,1542.5087606928394,3.803407120915931e12,4.8216542253741554,218.24601936135122,3.50841187284387e16,1498.628726387466,4.7068701958473955,1.6947266097436716e24,8.430609413236987e10,9.171243813839227e30,91.74444185631472,9.382577347650625e6,1.2540162409259558e6,1.6226329001035574e13,3193.446183021297,2.981140960925885e6,1.2513893782775098e16,7.262354731362389e20,34.739106573988714,17371.482752268803,3.040837122316095,86.1197105855723,1.3737536832456657e8,28.901907420882573,266.5160018362655,227.39351578656206,2.825915204936833e24,1.2773410292682997e6,9.179072757867922e7,2.0953248155336541e21,19607.47968902242,112655.12002348987,1.2681948655431546e7,1.513242006089228e23,3.8250356690388145e9,2216.2366298934003,173.87572741480122,18.040214733632844,2.1474482015009455,1.782116671884518,3.314398957057526e6,2.986733320724625e19,2.1055199779264667e21,2.4332761834991555e9,1.1957023593153016e26,1.2212599703875715e17,9.543602836204248e10,4.061190773667765e10,64.7139195173277,1.4249922190463304,1.114101090656291e24,77.16946710683038,8.8543220854822e17,476141.1307660847,9.18995947010445e6,6.114734260291381e6],"c":[26.0662920577686,34.60854964867015,15.654558522870754,9.594294201044669,23.86125443289212,24.97185738554746,36.251648069053175,15.581951292916191,5.3331859163638375,29.488555605136913,14.351962884887397,9.53345752037056,32.630732837772854,14.304929243652287,26.522034106151917,20.782273246790524,17.65922898257888,19.469456424012357,20.14461320296845,34.228016414839814,17.96231477844573,25.240343849947795,28.905760525759916,12.61215810046384,0.552066034316476,22.778654217397417,17.53842685499474,36.87074549945586,27.23567123304528,7.5184292517231395,23.498423503565228,28.008103884802757,9.793601761422998,17.242484414232756,31.736940928295475,17.085470404635398,2.033732756778206,9.760604918510687,14.719782697243001,25.288746231845074,15.464282510238613,27.243947436125413,21.73102658206408,22.809693829930385,36.1019109852313,22.318380408490498,30.726255299032484,14.838318925538662,30.876644204046187,27.983522177081227,24.41402494728108,14.881775105633864,16.33239793720429,18.115036381195,21.691234614655677,30.83405343911783,26.483435282155803,38.37332968630222,29.427776809195823,24.68169290329162,5.568406865707598,28.385202075118258,23.689071282470188,6.673030709003674,26.28335754040807,19.284166320070987,19.341405414618563,36.72427877921049,12.24914934143424,11.232402396431105,33.163900727421115,12.805284992207795,31.92348251516502,17.253767848157818,27.64611616862446,15.626883518990088,33.22833172487126,21.406437329745685,28.531681486672433,15.467580666254932,28.581985827748646,8.678710380935891,14.919839161745271,31.61893164801665,20.62942533488529,16.42945719155223,12.626182762483271,22.7232672151837,25.12754432378498,4.884246993200148,1.6183249263354014,25.038233388216796,39.76850976417657,34.535259070380064,13.041831454647212,13.700700560243419,15.089301881374023,28.28108235829351,10.307921896997334,28.640074020669715,20.537242815368863,29.561432804792723,20.664728306407167,34.594588769780856,2.9373967347040724,22.88633392916634,23.58416958165166,9.193030886109007,11.177183093848463,8.877757334116192,13.720631823962929,8.88899173873663,3.7134900433123184,35.77330842204827,36.043086025859665,37.2845406257513,24.4678913863071,27.001695288351193,13.998848853113252,5.387208103333368,25.23312218418176,15.557284996185214,16.485547971880496,9.971066272686093,17.482835689107418,25.061861283083704,18.594685766381374,41.5516483536267,12.177822035244171,13.247641624994692,18.805825058393047,19.181551811723732,13.928115084052958,19.927218398233787,21.148038848209183,35.24072931146435,25.913654616452668,3.291216015557173,23.33246817202955,22.62963613143632,34.169731942296565,18.20675788913749,21.555077623114922,11.655072542690002,24.238039317597455,5.7858388751578484,37.36449455599081,23.890623730455054,32.92243816175787,10.270188590867813,41.72135092834328,39.0432395591169,25.767894069830525,22.523055391277772,19.470598466319256,23.64304654147808,35.59355019003916,36.03438759769625,19.610297307619334,18.87599413756097,23.96930665587174,23.86577418896461,34.58167362615781,29.80126988959557,23.911781468295736,22.75191536422109,33.883585584687,3.1339472485803377,29.712562747332605,18.06511204106628,13.710977200800173,13.963587448146772,7.777176662721807,17.49754719541482,15.747821985334504,9.537347324643513,24.686391087667182,17.059479698338578,20.684325716491802,26.657134069721952,14.97733124840892,24.940039745108873,12.366945476904249,25.828179541808588,27.484995331701718,33.736885106141884,5.548345801777702,9.306914828700398,20.46844985331122,38.94851231538752,28.226525469042453,13.212523032972113,21.99272155429536,20.771438921013864,25.659805029658013,19.876012909542485,10.735084550547374,33.83211432940936,6.313087824433482,21.126281581462788,31.09086210776161,25.76034136928046,23.815995814021914,15.860199434001002,13.11539551536793,16.070650208945853,21.73433806661965,4.365525185564425,30.698691539858842,15.607386094835814,6.56816108202261,33.4960794593365,29.05712082026236,34.518059651780895,11.300051146960213,27.223709396937505,23.5687221698235,29.160442348217813,20.639075705724665,9.63030490297677,13.88256437635015,27.646618395901584,25.008193571045737,29.49155083253508,28.542740795433623,23.453399909345574,34.460918070153866,22.49267034622809,27.55792033376423,38.54126328526362,24.720187950905146,14.97072624476448,24.466826403722038,20.790033543052232,27.12982401480858,24.592578556212406,5.866647971436419,21.8130764408231,23.702359810727437,30.859036680294043,26.107490773351213,13.558762606595945,13.684403280039266,14.702822374107004,25.123740457272802,12.544464430714909,21.830532808205138,10.632566266905657,24.228738945635723,23.87218088461495,29.475093021350837,36.30941697358477,20.38104096570072,24.05471653486647,18.571638196303482,10.459725640861802,11.697719485626354,39.0212539010677,34.71298974084287,20.012646155228655,26.01070930908633,27.36127513463252,26.354725291153734,23.905581902648464,23.761453731574935,17.73697401120322,31.352762478047975,11.048765914362324,23.655712883767713,27.588979976129988,18.88498700252614,24.718000082934033,22.192206930142312,23.74073298935018,25.326493658265164,8.788945489223646,25.178455982605605,38.538255488496176,27.62607321765703,17.871589549477637,26.396122458352508,18.2812794650618,7.333297463767268,6.936545937350524,16.289029051109363,5.102712969013551,21.191414227722774,29.723433527853032,18.7281054371918,26.502973179350718,16.301875254797046,22.79272162359495,13.433447143856666,30.74986384763841,24.402040421906307,21.685846876328945,20.12494713727343,23.870792534410256,23.595129804129993,33.600136473584556,21.429649820573115,17.682247213764533,14.198142130367508,19.133375657926976,8.471804069952263,26.871814562487565,39.426188225452705,9.59288392472534,1.985626935538209,14.293904024185647,26.720131260652664,33.62156800071604,35.99939634614842,13.42838405503277,22.159026383604488,1.1775513394333872,11.675372245507923,15.528340383386208,19.38055376709426,25.322175910464672,29.359201409443823,26.027460668862048,23.39888893161941,24.473995628578948,14.896232515209975,21.6145464092491,19.717185105412128,26.913691338409564,21.004027054918048,18.12178856064498,23.782770790250687,16.944416045674163,5.203430686288068,14.343300405580337,22.045515874968533,12.20140404079951,27.547506551977207,22.719150834499665,13.301363563739086,26.619373440801144,28.020546011311517,23.10937834483006,15.974574051335404,23.6000114785967,23.102015132865148,17.569555669622353,2.092143433420317,28.431139490766046,12.089230653528395,15.578837960885995,28.178846433700073,21.442373456042212,20.433712159810987,9.832872659299706,26.82522660692738,18.96613698097081,17.230051281788896,18.93368458405515,37.050266882324735,18.576989660649332,31.005700628837495,16.020272757965323,37.42450637491356,23.024545948408722,17.109997135811263,34.54897426288649,20.157458324558885,6.85388310501731,22.883032560313644,17.299840131362288,14.666001590144731,17.118862556199577,5.311056347332999,23.70258950193761,22.72539146492859,27.31210528430602,15.082585157581072,21.8011240260413,20.258409314729825,11.948240724946867,12.714592876129032,30.34805304207545,6.25314441263854,29.949580985822017,22.27662160319932,33.40712034524901,18.70490326516721,11.910831374786016,15.848830229461512,24.895626191483615,20.637285179606536,38.781653712336734,15.123962413908517,33.73001785082438,18.789051394592793,12.19341930473918,6.147964480203534,28.50701558408552,21.74101582050845,32.090279910361446,28.644404584419128,35.628062844543834,22.929049385635874,28.465543021315497,26.44124893890696,41.31740338448449,16.340578611010187,17.14980234742803,12.951671930482275,27.078461019738594,28.661506247586935,23.906494294712502,31.37122513621155,15.353692593860936,20.449622776183645,30.59147041045719,23.990530939150915,37.285843350092506,41.70562922216142,20.007983947939813,28.573607493587488,16.729901442409577,32.752689839968255,29.945857252358834,23.657354293511762,1.2530099936363133,9.913011423179842,27.883470701310674,35.148825169874485,25.919682995953735,17.337785690762104,17.01038856065941,32.37593044777863,28.571754326495302,14.768220565330207,38.93651891732309,25.551356777954446,4.82614567129596,12.62899231537417,28.601052565280906,21.042052767716715,7.279804710688408,30.38012768813288,20.836326759737915,7.283074600154222,34.07932232304014,12.038212573790622,29.041800288313993,19.721862187558546,27.96721519966715,22.526960997541714,25.942151327497932,27.14262001958379,16.770154196686846,12.948174070701256,14.56535052903546,27.972663591129596,18.6867613141839,34.091409343280844,14.770563797912668,16.546683930597446,25.174660794760953,2.516459837420683,22.98233206299301,35.68323782470222,22.276235809919605,10.700717822632331,19.016106898886758,22.98134339324853,21.70019709072109,7.489776670869411,37.92405900848435,12.06555063578887,3.908212555306522,34.05384948660969,17.694706153132987,23.540620334976968,24.389015509333895,27.32077842886207,21.579080104454636,32.193048284597324,18.72287789094536,11.814435697385811,20.468645443350017,23.474934851749218,16.137173692982735,15.693382908954119,14.751717979015693,24.000388118783395,25.02765881761323,21.69235137526931,32.02905370951245,10.55579750748516,30.92621066986465,13.165079158168556,21.832782832201392,22.244793429988746,30.37859984832363,25.76921887158535,19.449118143838778,9.756374271633767,10.285909983633232,19.140753757731016,24.155334138343548,21.98863982858834,8.05209072375952,21.257020740899947,18.15567652495423,9.87201117752256,22.195653596673395,22.284670429876282,34.3631937887569,25.082634052611844,26.5748105617794,21.907432764168146,33.43333500935137,17.896359205463835,20.95293285338908,36.53638961138485,25.64424555333246,15.922540763139764,9.107804592318795,33.59055446247843,11.547558854808292,18.41037247869387,19.08915900568274,31.41989277686576,5.619467232147244,31.71397418899187,31.09224050092518,31.911384352210302,33.832934511482826,17.472515337531586,27.989754250831396,15.707010972556876,17.312029535872227,13.029993887830171,8.936199958260023,19.810190775628516,24.142458002615513,29.895341968543505,3.483816382396431,33.59720124891049,26.30583041415762,4.332488800774504,24.56784638805455,15.802246011088918,24.37321376079872,19.633388338046686,34.55670612442256,12.724566723507987,16.340017238966077,30.189456468367062,21.687494742414998,15.360868491802144,36.17635832178738,19.099588700589724,15.285791859023991,14.03729962489103,22.32433193564145,19.87168411173643,34.60504240833235,30.785689251308163,19.295207724271737,27.59425569643476,31.30400443720837,24.280089478137185,26.317806482639735,26.34170648637136,18.394083895111052,22.146204943074068,21.241729764691407,14.428523813808212,15.714842881135427,17.169477147901965,5.243826257818303,25.562903108626266,9.948727454448727,27.209125257607973,27.432179947139403,19.176999255168575,36.002025144612396,33.26552899779919,23.47762291550555,34.25242366845407,10.959652521788819,30.73002233638821,11.728232081497602,19.855698674001854,20.905917854373595,28.224772671194348,30.12439880954749,16.812557519098544,21.302207650606945,15.396978873972273,11.711510492508257,30.042759807902257,35.859272027559484,22.030838282820795,5.922754798049342,13.403364897601065,32.71152058435845,1.3744555670878045,8.212978369242538,35.718446260900436,27.17299099244918,16.98923890162235,28.163258333005682,25.603512581870795,32.510866356717365,21.532066768310493,33.74244681052403,34.350072229751106,7.413449259840113,14.862874060400081,30.87597541947461,39.99485859237088,23.499496175759226,38.6280582134592,38.50758541155909,22.946353135349014,27.40381442543385,26.647594033160594,22.118062381373733,8.486605374610996,12.374297258900585,6.060212096673986,15.53838441301529,28.790177058360797,26.998847582990717,21.587695930292767,13.566768502731357,25.67640340074318,35.15887503749141,25.053368310636564,31.57379306210241,26.886421767459716,10.668746364404186,12.034716042100806,27.075304860043552,37.48275490377893,13.84004278695986,8.17444461793226,26.707206001813965,15.871536083048772,32.2480032167249,22.372321962869346,25.61549559291349,23.98777389752612,16.253706261971182,20.15326452991402,27.12209530173782,15.58418483068607,24.212739497633553,9.924220438866907,7.005243204700056,27.35514070487355,31.197131187724878,8.761912874931143,29.491575533643697,12.553968402212195,33.474737892591705,29.011575608567064,19.732842811710338,6.935941348724909,20.552448691004294,24.227477616880442,8.425762599428083,22.74803396034701,20.381363921563846,31.262638592676012,3.837244413337501,31.623554799518004,31.92182659483825,12.436018222831851,15.36325674049011,19.834186490694314,1.972381551430716,21.49314947162807,34.22764391745227,24.25652795912807,17.62915231811244,25.939379978848354,11.991320950724774,33.98763659728713,20.669287387906696,31.96044578669877,7.510254157415876,1.7638461084871335,13.50628680396731,27.650466414229744,25.13982393187794,23.924756291054596,18.908947549361397,7.5461267764068305,29.63564125476163,30.062692827521833,34.59555637351152,36.60879640234493,24.597641636838862,27.57799214565417,35.174789664888436,25.320026896448674,21.075814617191533,23.032413558107816,26.796652575295195,22.480688823376287,24.391993630928223,29.62457589527777,33.20628152612137,17.4563203816497,34.44487896611802,27.308290353867,28.272366493197207,20.098845189977805,16.959743577408723,15.195960847755497,21.22505883572386,21.571375486757518,13.55347994454451,26.40269936426956,29.05981629743968,19.974207444478548,19.29155319800698,24.647351237248603,20.459074339697445,22.60174916840364,13.532879777778213,21.15349119046029,11.399229713859,8.903670304947664,10.556919155829302,21.518949403591872,25.413230580102297,30.454826678611106,22.670625119420862,16.503829152364084,33.991264338737814,19.938694309138548,10.220312698742385,33.44008405342375,39.623067133629554,22.443887967351408,11.02267257183427,10.820154358276415,26.949905715798423,31.869930465460218,21.759033604671203,15.610583148380163,4.393097207509969,11.228096123926246,13.513810107036136,30.833760753987598,25.852264684645586,28.579700038443175,18.522438935796313,10.769226969342078,31.012761093718176,29.048170727300274,22.725812451862552,36.0268856540729,37.456496896993215,13.475452500918944,21.67446594125709,28.66489590564608,8.964079290170021,22.94203228550245,7.692702113012967,13.659670258543162,25.518118005733506,28.081165942665415,23.41393799012077,13.61474994902996,28.12095912603884,13.931508056488179,2.7792577900531357,21.472734771121885,20.863768468709644,25.500966564557565,12.693137207096544,16.070905249796255,15.62599681647978,26.97459363111921,25.41998165803465,14.248441160317874,30.75885433024957,37.520251600290706,27.788814327713332,14.499455416026763,16.99151301411053,23.44510871048966,18.8708257979747,28.16575922364162,12.041456182335782,16.80133257499467,13.635544277605787,5.504193572247791,39.44239765467667,29.784144625161915,31.146970752128507,33.08061326774904,27.8427166088335,16.26153295578422,36.353383549534314,23.926200545261395,5.498692893643927,11.695210148851501,18.400073456298575,11.381320847038817,18.47437575211908,13.95415907870153,22.59213544086636,20.76898453013477,2.052643776907413,5.832088759788773,28.011538780059254,21.224118668583067,35.9811215313164,19.389413250415494,16.122314107662266,25.730527111249252,9.942441582655997,25.626426654445766,13.71834989200184,34.59725150588637,12.565224773377771,20.540044021187576,21.223417408315655,25.614927224541827,7.048509512525619,16.86499605405753,16.58458358639626,33.32609461659704,26.59985773606753,27.37651257529243,16.48421652013809,27.90581071879832,15.381961199252483,16.55132390903957,9.58374094815279,21.265994986230645,33.51621414834227,19.38314952246172,36.981724925187365,17.481993263870685,33.91042066387527,18.567315383889436,19.703116530921346,10.666987444531724,28.777811658876416,22.009250243452104,35.03014928549648,29.607746273494165,24.015144840439763,21.059596247733737,40.233583091155836,19.15390886590731,10.735298391724632,32.28654591575704,17.83466060416812,18.63862978384766,29.981760828280635,26.89725359872803,26.57547558931006,21.89275339059654,18.05370715508519,24.612164286208085,22.91461891880335,5.847853172059359,16.735029352262178,22.521529537910727,4.31295661817483,19.794377503133095,37.96543017248022,26.666979498181995,38.17879719459949,24.176225214348662,34.70079424575536,40.65705514900101,13.41921218640065,12.658395178615667,25.934149617161847,14.597196901053382,15.373639474671862,28.41312891681266,22.67416297148851,27.817645470441843,21.00484137566052,23.11536339891014,23.011170947371987,33.84145916790728,27.89209785922621,2.643225843038734,18.701090960403683,26.773856061697778,18.454764514342664,19.25424048312494,13.7435881354529,31.61334191239723,19.184795672288523,14.512243424753002,3.357801647890649,32.64927296963011,22.969037667444013,23.362576203116333,20.849599150344183,29.63088183168169,39.940720200294436,22.61043513506513,8.577904604052355,20.69027153378167,21.138844981987425,12.223872255387446,28.344749442265872,5.669577417740254,7.400757062658331,26.62977323688223,33.206910114905774,11.099866739213644,16.9435358881011,20.321599026838015,33.050847467890065,20.844294028293568,37.057002417716355,6.733692386119234,27.199092473134257,4.485827609491309,21.578129519084577,28.022085540323232,25.86171304300147,30.08306080762538,18.523126881757,21.8036505491112,12.51410871613028,31.150485124157896,28.557767753836885,29.779100086025107,32.085884324078606,36.153140169070284,14.62014319455518,11.965043835348638,17.400453368937473,27.949333113162176,21.6092368664025,14.58907834476879,16.83959492865531,35.88773634495156,6.807008797988766,27.184187475243377,5.497186393829147,13.44317448709887,22.748644992181305,40.94376554508463,39.19685050560401,19.002838035075342,15.702662688390614,13.796788951427803,30.106617397781882,13.865689627948672,11.873255913571816,36.053894030000166,23.79971853475456,16.565497674639865,7.03645520637361,27.862941333758034,24.451223194304863,15.500281676622109,10.758863637972746,11.385267756872373,12.665107353799625,26.260074159817204,21.14753897535804,22.457039545730183,32.18182059357343,19.944992476003474,13.321633804430778,12.346835051663838,36.54615310377334,35.31168798879739,7.636741651079824,6.192269635552496,25.073682109824492,15.188218601199383,11.049344372893671,25.093228302828262,20.17476503979966,26.655298587578358,22.7136452263637,36.04150754141797,24.57786536306637,38.09599670379782,15.793646743562782,19.11058709951022,23.093935768137676,36.12666941324619,4.3373320230647,26.880863047014998,22.516296508146905,14.46663073183117,18.633870979341896],"x":[0.003638988955650291,0.4808606588336215,0.6830781919391138,0.5287522138370093,0.7778758357563649,0.628513273837138,0.9268518551217007,0.23447272447877876,0.5283366072366311,0.8055819552960528,0.623843068472983,0.24164103399943682,0.6480355668720814,0.6370921934135321,0.2816648690553776,0.6329075529567598,0.0023688093818916567,0.2577623712468271,0.5970335830323887,0.6496687790207525,0.5992951581704682,0.102573535056673,0.22034463293640028,0.4285924512358692,0.2319557973873676,0.0553584076808471,0.38944829189439023,0.5501763399035089,0.28575821579233285,0.7692555436532955,0.7743921954801607,0.46781429923595863,0.5090463777387111,0.2902984505449415,0.7362517974774239,0.6350417609225365,0.6775951014904897,0.6878409533606042,0.45155502590294216,0.2689571337436951,0.4653205770150597,0.4751051908144577,0.7343616486158249,0.2952972096871611,0.7071813189916978,0.5473737478022902,0.33203243613481237,0.9368264336371486,0.590723171371786,0.6127870404167566,0.02881556498657445,0.3547899744302634,0.6275916829603463,0.6308095373870273,0.6558725923907767,0.34124741502875766,0.5771502542971396,0.21990240371041714,0.6380482997526828,0.6276614940854139,0.5124083145823928,0.5080452018022363,0.9707459394203997,0.5396836970709811,0.08421696529378009,0.8314896282030364,0.678995139468191,0.7982386100214589,0.5243051336333087,0.7414547332459411,0.0043871384929832224,0.8283967894308313,0.7231092461740154,0.719614023418901,0.8565102193517611,0.6675367073976144,0.6267640793638065,0.30326801588999297,0.4181735851017798,0.08427123284075355,0.3672054980853443,0.6519291270297194,0.7732282911009447,0.3748123465082429,0.5076581607371076,0.9575699979373873,0.9730608363869337,0.8058164105822478,0.1821995475259517,0.7318439417813563,0.9939312712235255,0.7064533272901339,0.8679361929709137,0.4361488194363148,0.49071415022627285,0.4318355841444552,0.2900272142681284,0.9221567176507701,0.5525669931817867,0.05429260258150914,0.6124724000409072,0.903465592058394,0.38195632024308823,0.34788352975946224,0.4144036986396651,0.2267731735484102,0.15082129404411115,0.1966862455532199,0.10974946788076423,0.9433961109027043,0.10185919890235118,0.6041303633715334,0.4673000413868431,0.0568261375065382,0.8595309471613681,0.9312106751632927,0.04618145573823362,0.09592142281648663,0.8510330647966307,0.538093577627206,0.8261252609047678,0.7382713785653385,0.7017148397285697,0.1306986604819007,0.899525193647488,0.8669667229137148,0.683056231552132,0.520314141281621,0.3038905754547274,0.10180833490084495,0.7922662034925556,0.2832564836588196,0.7361231076402266,0.12548488977229444,0.7097663764412807,0.5393190442445843,0.8606355568189947,0.6522254799981242,0.35244472923442527,0.5147119002463079,0.8183000932560984,0.6740901795610512,0.44883763686865574,0.3602286724698325,0.9433074696745047,0.03792893308736689,0.4838132749882347,0.14903396532570157,0.692576455523715,0.011917962112274472,0.8017323701333776,0.9096528826920425,0.6840890779522486,0.010469407079276127,0.856998723520193,0.9121170949213984,0.07196050761202022,0.7817637415832404,0.5003760009482887,0.6420525696892199,0.06252286184103495,0.3384896029729474,0.58099553041761,0.07828497092296938,0.987754558635445,0.5723169278218525,0.307095688796722,0.8043999287236849,0.703388727108013,0.7773101794470156,0.2280014742910892,0.6572726040526289,0.46478812455988106,0.4205231230288611,0.9825281462079023,0.18055543783448313,0.38145322937569937,0.2747383002945656,0.724709915748192,0.9857994483469641,0.3452322181590224,0.45075809612051576,0.2593676298969594,0.6674425291263906,0.4231040921391589,0.4317192655426074,0.42309434175385596,0.5394484221315363,0.7235478620711167,0.27911504429270817,0.36848128037248573,0.16773345781878102,0.018451722279464677,0.355352274524255,0.9488289955979596,0.9712085594489006,0.3364998561089958,0.5070638966158445,0.76386748677076,0.7788933972003813,0.7666977530447225,0.021754854081884156,0.5050979416696944,0.8072155115060624,0.35770003436114295,0.22216109033117482,0.6052673705835483,0.47573049947234036,0.9643175641032906,0.2866479449356998,0.6379649579787221,0.6689264149447951,0.6585583821841405,0.08873085578284123,0.23801220128708067,0.5108618115160133,0.3687850058955613,0.0001365397441068783,0.09749609661175751,0.35604500154442675,0.8401802854128975,0.40130994450266444,0.2042219470751736,0.6335447678856785,0.3438073859061759,0.5555142082474884,0.3406006930228991,0.8619022864096502,0.3879750739922312,0.35591150486076817,0.3394667402993339,0.37636787399857163,0.5716762756128764,0.9400031307954699,0.7065859545351665,0.11144625105656569,0.6087116910392512,0.9221120902136988,0.3171567962920754,0.6659058924845844,0.2910144589159027,0.8340619535274336,0.2023081740025836,0.46491096156699263,0.364795951641119,0.0429333652701398,0.24894564616412684,0.5883812781643063,0.18862629913148887,0.8568995131263659,0.46668364744462987,0.2758609625505428,0.9453222691481431,0.8785160363187798,0.3639759803376945,0.7885554702238968,0.6524443191051472,0.740853571146306,0.7398403816220898,0.9975389045569238,0.7208557274855125,0.7726741490625695,0.613031352339688,0.7500745479684865,0.009374681036198318,0.2750885856879157,0.3413731891824865,0.7838642208096736,0.06239413435345864,0.28750845281501913,0.5233500690049184,0.5857633220712197,0.7124568774814208,0.7979702663313397,0.47556476501792866,0.5116367470237315,0.22835943755868193,0.8832014252438734,0.9914752967432754,0.14476538662036065,0.3539910268796722,0.3422250579097026,0.7851432333228636,0.7886738699496827,0.8716821212791961,0.1605445925626905,0.8295424884340525,0.5466438481277072,0.2231217184624923,0.8276626498045234,0.6908421032261205,0.4613959261458409,0.6588891960597298,0.6343154174477892,0.4641326159607875,0.014916545557650984,0.2584175250112666,0.7782644698380645,0.39016749688596297,0.008903916860077743,0.12557559410233599,0.9063934670520697,0.7166055310484791,0.1332152496316279,0.24735347670449648,0.2020604153996841,0.7470826057711861,0.4558620167314147,0.9553363468580862,0.5972143151109415,0.026900941288332092,0.7084422879685097,0.6589543695708855,0.03352948291964197,0.64021458393385,0.7804353430358533,0.8655186848969976,0.5299926615965473,0.2115399412286283,0.5298962495118269,0.1893948077590335,0.3561749728176653,0.29530108443472525,0.09262647648011968,0.038398992257706155,0.49717872798096363,0.3679722217509831,0.5607221138626142,0.6594093878293805,0.15413566762901776,0.1304493164095375,0.6754412351404233,0.6501032236019859,0.2954294287250514,0.6779260245429974,0.6686930626054872,0.8276375472918602,0.4113551065468819,0.9554385094777811,0.1607947167968109,0.3516843117766755,0.8020886304617505,0.23740218605505947,0.6396629933939331,0.3395302959882136,0.49509501075243967,0.31436205592364974,0.894063293396427,0.7772507045289205,0.14406683060830616,0.930885342183801,0.2774489240359772,0.9173920771007811,0.13179494340053943,0.6071976975965636,0.8543292670941678,0.598061971187253,0.6617215087506803,0.5015545035922921,0.957651791967201,0.7095640785693205,0.32405746214074815,0.4949197577039157,0.24370566895729762,0.13745349955239838,0.6969367250797143,0.07873643731610214,0.5885751391766914,0.7776998901382779,0.8862178401670424,0.3514736924477637,0.4767163824820706,0.8929945492475793,0.07247822323053232,0.7028608536154564,0.4298455311435896,0.3858500854526916,0.9224821319065655,0.1430474088802305,0.6963576179094269,0.18168641724187684,0.4089907833670481,0.2799755750828379,0.5334866638400293,0.5744368419724926,0.6752111908944387,0.6610829450780793,0.6849940523182851,0.9680775393583272,0.03342867759483892,0.4568634312975104,0.11462571821368317,0.5806373996263197,0.9265918201924961,0.13939368655245254,0.6075940588894988,0.7929982715008801,0.8083243904107238,0.48856463156687013,0.5875328048537709,0.9862724847754041,0.5254759114799774,0.5338006522690357,0.42641642211124875,0.9124360610783591,0.2212713257087302,0.6483507296131361,0.18346622237791999,0.538624797269617,0.1381169153094628,0.8116945569903404,0.014544975477971622,0.2644639613072792,0.477316842296563,0.5209807350769851,0.49731195910874537,0.3497156012372884,0.8251894071840697,0.3538984902318554,0.18349616275972847,0.3169221510781499,0.3422375597646703,0.8865600257253456,0.23918899630311796,0.10880606915600666,0.5774586158588288,0.2601038160247775,0.3992134220503323,0.8299043053931794,0.7205931332581537,0.009234017862481236,0.94178974517627,0.9883355595131189,0.7223897538905129,0.8546254275053684,0.8565321373043533,0.3413615208211125,0.012488495724106485,0.05368811834206988,0.7734945638480968,0.7386649590995775,0.41714437281265737,0.460775902605876,0.019786288225606796,0.44448943862418333,0.9025773176522813,0.22205920023448678,0.28303635802070537,0.7059184476286349,0.6542064057933599,0.3283853042843159,0.5454925526104901,0.6131777122235975,0.8483261934339206,0.8876589285878069,0.9191503966285097,0.4134121482901625,0.538116855287202,0.8990078455180692,0.7365736337788797,0.09649289017300378,0.9788441824009213,0.9869446198274903,0.20467776319021924,0.7785719215845734,0.6741886186361914,0.0823770099307648,0.9912606129178154,0.23229564113095758,0.12615313397052375,0.025516679057627778,0.14403585027797527,0.3254385744133921,0.4365291970156422,0.07058450790378634,0.0540906787437716,0.9271161589331693,0.8470696080217806,0.5289829065873697,0.10787676097378807,0.3515398488210839,0.6712396899430195,0.07765270603251695,0.5077503834968409,0.9629055415588303,0.6075232436044373,0.8668703849085511,0.5549857276323056,0.7309066715525323,0.13653233523775188,0.4347751587445423,0.1438841559712436,0.17024381583726123,0.39768469937850903,0.5831117799074665,0.6084143627937508,0.16069001394364357,0.8814745410829425,0.2792828103970506,0.06067054671452121,0.4906128325430399,0.5964500373527142,0.9936137737848041,0.17795486284445672,0.16396924370516563,0.057060080545607184,0.7132811804626207,0.32811113919792745,0.09800027983485693,0.31637024170672223,0.164335721042431,0.7947174858965629,0.6912311957772388,0.15698744645561047,0.644105524439802,0.8236015776404628,0.2283969336281899,0.3691770205674465,0.9382292167201112,0.5488272013679485,0.6457588965867693,0.6875716126002325,0.02234362464916595,0.5812910115559811,0.3129567084668965,0.9713294954429119,0.042182088132256546,0.5500014259109358,0.3637739193282241,0.5337504244331595,0.011010725460531168,0.5843570071378286,0.3677869397246629,0.7078398251095452,0.693302647146141,0.8918079336595961,0.1511830536999137,0.9410867719528284,0.8593669319394914,0.7558407765736519,0.028813959766396335,0.0659210382273765,0.8675247858514346,0.7030890885338477,0.379641563095519,0.31658444455653334,0.4039363492129626,0.41252333935815044,0.8377777941518796,0.881766624552123,0.4271664425182464,0.6322843495718606,0.5671422200740135,0.43788112230733756,0.6021941939158628,0.43829889224337704,0.6635024265238352,0.10321950085394072,0.7360189930734806,0.30693078249441696,0.732277585704648,0.1496246731228763,0.7728931727801889,0.5235773456952362,0.7436485826260963,0.8251441462723244,0.5762727082302688,0.07491966433084318,0.7645960186941541,0.3630733544309177,0.7667224852665591,0.3181128925473724,0.32069466334460706,0.6295845351459082,0.38809876031747037,0.8896484330258523,0.056999348124977756,0.25603439034824205,0.12511027195431534,0.6790382234750474,0.32986873070887235,0.952847456353356,0.10506888117402235,0.5661277579038739,0.8954392444807477,0.504933451678397,0.7121124493512492,0.9220757105262831,0.647876280470062,0.31496469990589304,0.7445707617004635,0.34373152206605107,0.925732018946043,0.23818010523439814,0.7566951737334273,0.029456712026658005,0.2755506816984452,0.04338268824413749,0.21883703797901077,0.9867537999034834,0.8747929116768527,0.9002883136846986,0.028159788907478056,0.07603353946701952,0.3986407158929328,0.07882508927905896,0.2126601342998824,0.20959210830993902,0.8190198206760875,0.13104597660496076,0.5843410984941078,0.925446127476748,0.9618595036823849,0.2477495065690627,0.8757874694177723,0.24824990077630682,0.057940922679088125,0.38774904391000664,0.8063093578720331,0.21233761401293094,0.5877810029400894,0.5074703158343263,0.15356288217847336,0.5952690997070333,0.03211265145614495,0.29770839966591045,0.07689572825882807,0.8969157748269947,0.6077639594816437,0.48850160942934195,0.5953454119543438,0.5099416918797366,0.9817949992456505,0.9986322673710646,0.36120580150717374,0.1908967018833867,0.6986223162257015,0.635674616260893,0.5767131790193398,0.7040981720685815,0.4476662219495766,0.6745126299170521,0.07159620825640634,0.8134865932195314,0.47692285360188436,0.36101792444531244,0.26950327229333904,0.6998209012414889,0.8798824591041272,0.496711309971801,0.986069582907769,0.7732286896738627,0.8422809840179628,0.349027258431563,0.9060943996984694,0.3979124796041862,0.8961571409501385,0.8041694748217278,0.8850381421725901,0.3995056201248297,0.19312856162688896,0.12597669732167516,0.0483776043325852,0.34671961159582754,0.9122182963564982,0.5792386761721087,0.13428534394928593,0.9122107966060067,0.48715393390536676,0.8035730930796383,0.9778507397590357,0.35396114568869574,0.5201865594446884,0.5876568800683837,0.05212407939082242,0.47672118390117535,0.5882421105828508,0.36776804476792524,0.2730153568171203,0.8144498702352203,0.6347219167831859,0.9183248388357637,0.210354232402731,0.7090274601693813,0.027280576440925408,0.6818305706851,0.16222383273687302,0.5810838266616478,0.8601647150122989,0.24215940427818095,0.6183861084280982,0.24199969554121892,0.7868930397938663,0.18722753019575866,0.7545913751877962,0.2610171524723872,0.9275948512722165,0.5189034062408975,0.9537175674476701,0.2815314384499745,0.6719355178581115,0.3679856290800716,0.5235107426824281,0.6541316629822247,0.061988409504860176,0.6786195004969364,0.5902512250352152,0.9129476355433241,0.1526500566889677,0.6974836137529572,0.15329297562383126,0.1583654901407201,0.45988385949855015,0.9165375334710761,0.1324269979821211,0.9363955253511518,0.35211554568793435,0.9606399018239253,0.5841316679707229,0.5437812316980926,0.0955434685235661,0.42284095080596473,0.641921112566439,0.8988287660528971,0.8972440033666922,0.06645553627313783,0.049937872473127864,0.04513338773652564,0.652468975575262,0.6250862131042434,0.12301086876538103,0.946182733998743,0.7748019389088674,0.5235049657432751,0.2672531245028711,0.8192632738017225,0.29258526324844203,0.7721705428573951,0.6765537742019103,0.2690204899326587,0.634197925380408,0.12592834714628687,0.01169494312974062,0.7675566849716042,0.9963223075503473,0.3290134876843014,0.24029082898881726,0.5157210650308615,0.2613169971416127,0.7417599665444157,0.5267955565955142,0.10461752135647728,0.35782660295431445,0.5279733984362598,0.032789755604318405,0.04787962202748397,0.1025597463649619,0.8725879236568976,0.752454637521514,0.060555740994988394,0.8059408588874004,0.6748310175679757,0.033545551209213764,0.25589998050544915,0.28561254756208565,0.28999728758240373,0.13235193533814704,0.3924388149226974,0.47853103745613224,0.6273883650035821,0.9550806084115615,0.3517813142584474,0.3579612634200471,0.5128369496696956,0.9498193087827105,0.8892948579942701,0.0549634413117861,0.20698566667749652,0.14149611576051946,0.16277926974516643,0.15767634986855428,0.33810532284580574,0.5660211298102493,0.9840979412585604,0.2520839683960978,0.034137367676643215,0.7802157764262199,0.03159857660531662,0.5488364934403513,0.4486503283633083,0.81820404822768,0.25121732329850177,0.8070839512852741,0.9873246287324662,0.3363691625880052,0.9089606391426861,0.1886348253262049,0.322736914781506,0.01069677874211461,0.9700302373281979,0.24120806994216526,0.04440860744428554,0.05570205728997979,0.5021399856648121,0.9902772354312914,0.6033870520172271,0.9286804600408247,0.9686484342499155,0.29910048655256394,0.2507924435053226,0.09124015659254714,0.1416905436895599,0.24279037636804746,0.01977575711922719,0.37965854386575604,0.6754382230836211,0.33958120345322573,0.09010863249859513,0.21178191917270195,0.20030239054278143,0.024034605829369893,0.21064251088301122,0.2528812717507569,0.9636467674562801,0.8069461958788446,0.6333108184971759,0.3415801421658873,0.4371280183727537,0.24387151292693598,0.9091327556135371,0.7708923391614233,0.7316879041202036,0.47117238391460825,0.6299608264904388,0.6440071296593908,0.04584688250522495,0.6673142808903418,0.18693739933466502,0.6270199683958646,0.5216960382535856,0.9014837271149441,0.8026027137327856,0.2312460350092913,0.008850609711065882,0.3526330467637364,0.5106181592503729,0.22402910747991456,0.8507408151125517,0.8671636896952855,0.2755517606564861,0.9846080053028405,0.074599831509649,0.3523551897866053,0.07442545366658027,0.6244975562089825,0.9041083528316725,0.5777878230691735,0.8593685321247713,0.4716297681899737,0.8590008234090132,0.43668982585210214,0.4751551038586883,0.12388934044564515,0.07298068607503838,0.8631621653153432,0.7366599150380153,0.328685882940956,0.24423608876012337,0.9975725849693735,0.3040573170942227,0.42271672374364955,0.09694246481380286,0.8723247125242946,0.5654100114983462,0.501737884904293,0.769944106054641,0.24759803049402684,0.2173492816851912,0.1565072221214352,0.39816934080278465,0.002741931342715498,0.5747199828729819,0.14824240387795018,0.2277699373783495,0.49699044008527116,0.7723307194565028,0.10666217030907044,0.030539761383530983,0.14005195135171133,0.47630009901087855,0.9152127160567984,0.9423746419089889,0.4059705070119848,0.45988101614209653,0.24063896820886432,0.5981403606885918,0.35960218778527775,0.09663472561766251,0.13786886507018137,0.5689198430303064,0.35889691300523685,0.38768531803785855,0.6336969031508548,0.011262591174190595,0.8397218125366985,0.6000345055658578,0.8317239557384988,0.293659157718142,0.11824966228396572,0.5147468686124355,0.32927409628797144,0.07313343038345765,0.8168035337516739,0.17471996976839255,0.5069717197419219,0.8895266794126984,0.007801294137869341,0.148306550492336,0.6469754500935856,0.9137110877057599,0.974066711778294,0.8251579946423904,0.8270466155578009,0.8870512813416844,0.20259165512509925,0.6321504232968282,0.17934667021389838,0.16244123983078085,0.30183850447025407,0.25655047783793106,0.9147535962014723,0.5248525010966538,0.4794543769948594,0.7781903311327751,0.707442604371725,0.09348128101665054,0.76791841488639,0.040889383121014866,0.9767081118696566,0.7126793738310104,0.42436929752405317,0.43493954789892997,0.5171887614967918,0.5414976058083341,0.2278773834284218,0.9497651553428277,0.032850525361681315,0.5627325933051532,0.7089176269185686,0.7774885867721635,0.10925665047568378,0.8563350563529768,0.31286998021936907,0.8682999090675312,0.23571259291796753,0.7516624017913598,0.6863286823352484,0.48135519869423127,0.25232549829465545,0.6115475765041394,0.5333819732016947,0.8840988131430003,0.1673605270385934,0.657831323784581,0.026983643090933374,0.15723438406392276,0.6237833528273498,0.2613338450430809,0.48197433877425433,0.4263382845763579,0.9760172434029459,0.4894701596644606,0.3111227977777191,0.7381055170530222,0.34259974214403144,0.6011835984634477,0.6589222433532413,0.7615462170692944,0.35540874356415375,0.9424203953791579,0.544970331712626,0.1007779324483642,0.05021862976132985,0.03856963812863223,0.4402426113563376,0.8349230296529644,0.7713315996547028,0.7948337893319954,0.8689451977433316,0.7891514628333394,0.3374871276312832,0.650815399622062,0.16906646131848202,0.012118418030204303,0.739449037798209,0.9517237095045548,0.8819616672203243,0.24550825323174807,0.6242925203622083,0.40367412798533486],"b":[49.495389478534044,85.22818395846107,41.318401615314464,27.372257366837317,42.18710486540817,68.68160444902917,79.7809736523017,39.20006944913132,5.345415187528211,77.5119398288634,28.228251539326106,33.434623644565846,74.80934026667262,25.57686354646759,71.0819800006083,60.996270956554845,55.99915902963572,43.36014047104682,35.886685545582225,74.95596425954844,22.20271289246052,74.72962229441846,57.73034799887935,28.776125903972122,1.0060532040402181,57.57582974691651,25.060239595355736,82.34997494679217,84.02673038945697,13.405273026915117,78.13782014260231,53.87470990893887,21.536851720208347,48.30806422485634,62.43091102257165,50.27904693584338,6.016980091667166,20.57601524901955,36.10434750017643,49.6722977514232,49.147147455674364,57.37076038225578,42.39877822781355,61.35094873179335,79.34011387995098,77.69833255962124,71.88444305990024,16.682178487689416,86.75430598374584,59.57353848573169,77.16071466190415,34.02569546503779,36.10791579633989,32.5523190299685,58.831416430556104,87.61483560758651,57.10524287420559,93.72278470192708,85.75541098461915,55.87341167849371,15.475299517017561,58.024443117530026,40.94750363524665,15.346169504462965,75.2953790918404,36.76468789930709,41.34967878020516,89.97602512548019,32.08635242322029,17.690230000435236,87.56936423278856,44.5112399139268,71.20645765169796,48.39554819072804,51.18364520292787,43.86009945188406,73.4588241193203,52.05292832241784,58.51081853037486,24.047989633031257,83.22727450520259,13.357582314217469,26.962107983165225,80.30032060963163,41.473497713912366,54.901061307017734,15.27431739571082,71.8972666967303,56.56456529529657,12.746185997063106,3.5998149173321448,65.55390774383305,91.43740510557407,88.40591644660671,15.751009597158543,32.21620209288161,29.953614812713028,55.349396921200636,26.22125703242352,66.17208426261483,44.28494390913747,73.76731117980194,27.081384378847964,71.75456147638343,4.375147295863053,42.93686997682688,53.635706247179954,19.003380484919205,14.822421696313866,18.570539281770717,41.07714790860787,14.712815552569767,7.573704877922909,76.16548972314082,80.70990824163573,89.72183467906757,71.29594551335103,66.80884851021078,38.39551952082455,11.617524129663192,79.76887285985353,35.04635910274533,24.354618275068063,29.43751058971495,39.2593498389916,70.45742320481835,58.25810653900085,98.56072187577395,23.430608440412392,24.318426145687667,26.789679837545357,24.64579648606671,18.22966216589197,24.307015997829403,44.40987546533964,74.11720597798765,61.00976643833889,5.997426266010932,69.67085466723086,65.53408990428224,86.28489820349517,55.99401863882514,29.757416451031467,17.32075803985184,65.1406910100321,6.731869967262032,92.02075921182389,63.53460456752944,90.02579688089568,17.924777883849472,98.68575079602196,96.42474354818367,80.28795778796494,70.3762414039361,67.34856584611964,41.54054277428689,87.02058710229612,82.04521258965778,48.89197147437979,35.714509436709854,75.22884218392393,34.17194112040383,84.26302599081104,68.3433822841924,49.56597505015324,51.872859825973904,77.64390998650676,5.657468261914933,59.807704153827885,49.70478161953732,20.04885352584956,19.790398539832054,8.212362543563128,30.283055197653226,34.30110362480229,21.268012001766166,46.57095187412678,25.734781824721303,26.9986519179972,73.23977104638239,33.69163835488127,64.14223962541539,27.213268644519353,61.787234423597226,65.89265733719097,80.46458583953982,11.174026465434942,9.692210678564411,23.87283860703592,92.03724097924027,81.48032826893996,43.71758217443771,73.23887947651808,36.93479277986997,66.17235547208459,46.00963431792424,20.076821530337195,70.05416598155513,6.892378304018907,59.78659339536569,66.07559878511495,65.253430890181,62.24426444633396,18.79418053714179,30.192920072691734,52.71936489132238,56.06982525187482,15.205567359150361,69.01898093847647,36.573969114065974,18.235241435227,74.87115459525253,57.49995013808719,90.25284165494705,25.581156692681443,71.38755477734846,69.49489277309505,77.74672696519305,60.39016003754141,34.085743786076364,29.889327264106523,72.14759170396502,64.28783982732315,63.40453151437091,74.31372007746577,63.047803874898804,77.62914405221137,77.71033115164673,79.19281840111546,90.27905297235183,64.82878691932638,37.89564444994821,58.2475074120281,34.76012923597978,51.752403594963596,80.31019224883039,10.388264157002315,70.46624180303381,48.24295746608696,82.54033613987353,44.54571873382901,33.54356263916447,19.178855587230675,45.93299829063122,73.69762353262627,17.042529268326398,28.5393977713377,26.02903394999444,58.226669682546735,72.13159568997978,72.87217657731694,86.93339881781085,64.92369621150617,41.700471202776605,26.16133273545923,32.01209127113395,28.468740450365388,90.59271272131538,78.0793080731047,40.2308413570933,55.87536864301663,58.20891073910387,62.3248597738493,36.139318565428184,74.13152541280922,44.38288777549991,70.45266236294461,14.08420198037783,80.07130103383486,48.48878112060987,43.540668372993096,68.78055676486434,61.16225078441272,66.67450610547716,66.12658487027014,16.245350404692175,55.49932018619832,87.63550426965091,66.66496940872159,45.339666769666344,63.83067464343806,29.28394206945851,22.53732427636518,17.08032868377043,22.081177645112984,7.512483199382696,66.89086591461505,70.95879704220728,56.74431792795883,47.14783894936731,17.142366577350504,48.76587235729917,31.245161171168196,63.23422966049144,68.12468315559681,27.73974229552545,27.31073492525192,69.2155935452048,72.93812903458861,86.43174877937034,63.70138829100377,42.750409429586625,44.80372835963343,33.960300174593314,20.91960556510887,46.2838265353396,91.05273863302003,29.213683437932577,2.825266706079046,20.31674664872261,52.37906868365752,69.63263028069392,91.55949161220512,32.21207484353399,54.54480981759389,1.9956460087299321,41.131972130062806,49.92591116869322,59.85606133580938,49.56191617091649,58.38127774895737,46.718134681776945,66.89032384380471,37.52375632685202,20.08465395938455,76.1343413760952,59.56600815375059,60.61212075946965,59.94148704391964,46.098797260666245,58.39195653347794,17.475738973797696,12.696675216245335,36.31553105947537,52.746905338016546,13.009447087944617,51.98769811307692,50.03585262744042,43.41976200558668,70.26522559007792,84.69070904501905,38.017365697559754,20.837635109461857,61.641520060060145,79.69927359376705,56.69035259471023,4.307044076082662,55.91698605129327,26.162117900288052,39.85976607662862,54.17062227797552,63.912757019225715,26.608960115847214,24.888139497859314,64.61327157405744,38.81550273235392,49.04738745644635,41.58239081871177,88.69600734130486,26.84099901253601,65.08003524960122,31.11627958857326,91.33624200255116,53.83138385015249,22.13669306521374,76.32162176636979,63.14736931219764,16.34482423526461,31.6355977834456,52.37775258324462,32.577477997252416,25.21011373972665,14.541566180295739,70.55346318404784,47.837403213731534,58.88686897665963,44.202416404868515,29.69991071821299,48.759525663237326,32.824302866928875,36.42927042319904,84.21992002149997,19.676722581332502,83.42614552797879,66.49989409095673,70.69336348411456,60.70801279019835,37.54593625576529,18.811360222383566,47.19053626062198,63.742062113178875,86.69843946809871,25.055020980862523,88.93919077437091,27.34512293798611,38.40506219098761,11.447793292666613,67.75376274738946,54.80974087972177,72.01827748094047,61.716419066639965,77.13614683888478,67.95652444948091,69.38129720004393,76.72508766215832,95.98702884629577,51.10967009149031,47.56708630763784,22.998145793937805,54.763123506278454,77.83072894624911,61.73818528753836,86.89010838559105,40.6087046422313,70.58971367452263,66.58250098704076,77.4395495682482,93.67898537353588,97.59521702584158,40.492797929593316,64.83320678294803,53.457951125118,81.72968798149128,58.99823624230453,68.66008004712168,3.040308429660792,25.249747420472612,81.29751984496495,74.44450826152581,67.54497563546896,41.73705546958664,21.241719203448163,78.37964716319291,77.00904699676823,31.160737148934167,93.42824696810956,51.433509602550956,11.44374006809484,31.152407469226,53.49382651916822,66.56596631029107,24.186349768087695,66.01311968525377,66.82090702162182,18.06227215271172,73.11049069578593,19.253535207244106,62.876859135298304,59.73779748586216,71.4880841557243,39.67183188769547,61.94668308488522,46.22077762206159,49.26420280879136,14.497632218344378,22.559766958523937,70.76260842163279,20.666797803522613,71.82577297241423,34.5807046577542,55.4007622276104,61.91433647857164,5.504340564956642,44.28527384944341,81.27942991100208,52.16789935531122,29.762197215430724,33.25783255527253,78.81457888444696,33.415908337794576,13.515042310746734,89.05940137166306,39.19386976929906,6.948089815956844,73.29326117176089,39.50201371121063,63.56950427694745,53.451358776336015,70.56340431489657,68.22801856298177,83.99099656793659,36.22299271177482,22.61784282493896,46.236805829791194,36.772746277049265,26.617184315284206,40.349432158500406,16.937538610638654,47.14503831904887,61.96343757366049,68.7895026351531,67.85094420631114,13.35255192955669,79.09454433846317,34.019476442516726,26.9330556996427,52.00601105199286,80.3563893231799,78.09238210216945,50.807747782355385,20.431302696304158,32.836515279297316,27.05036936218221,59.165868636002934,62.9864536856748,16.226730593580882,68.81946638116676,34.40444906170754,17.60187946787948,73.27385805658754,29.807369011653925,83.74806454902121,61.9190271801646,57.734395323797436,74.37125780817212,80.49570457350256,23.820086925580533,46.57808446379386,86.22726259764376,61.857467502177784,47.18020647787202,29.83134529721111,87.43614723791383,29.684547141675488,31.422168229982653,31.043213590131305,86.56072241737346,14.708191776540582,73.6288967286666,78.1033536895098,67.74061229854853,72.39369686906414,43.34974928215128,84.07531942743374,39.98452797279824,59.52918384958098,27.9651269703867,23.30445921096389,20.8018764906575,68.19932638867341,78.51224179058426,5.802887383267139,83.42240211066931,71.37038871501349,5.166548919970775,74.57471228704344,31.894087815959253,46.140962411918004,61.31539424649248,73.78689979502073,34.01713345421558,48.58335279703235,68.3398796852816,75.98784298979528,52.61130672831196,90.26544857379942,23.77774348200976,38.94721961376665,40.68819704886885,32.05160648683194,38.65336151371435,91.22007904956425,80.16657803599038,61.11808348248914,75.10228854006397,79.77402860491758,58.32095577113199,66.63873107098881,74.03217541707691,54.41555991515111,38.34841024924449,62.091964299377,43.368065336875034,49.64270336776089,47.616397307368324,11.702734627548871,46.16121358740169,33.4361748586498,70.78165715542336,78.93121986701023,48.19874975182359,85.5597978505092,89.45889350805274,79.3172392790336,79.7422400104451,25.515251347867647,72.93295086413725,39.02236707224187,53.454323873786926,58.889110079282986,72.23240448135459,87.03930760839145,27.998847842562007,39.71067462844843,42.502942324605804,37.34404340277788,60.45004932238922,83.78239157850597,77.22175507165488,12.676742423256893,19.07367305126431,81.65835091776802,4.0285627978683,14.102339554361162,92.88017002359271,56.69595022312029,32.102495002702966,85.20003514064607,55.84016647835851,85.5044580999323,57.48488233035668,74.747521187393,85.57411079018016,18.241556624648712,40.81781454079741,85.50916574823263,97.04776392611281,55.69816930018886,93.42565576887779,87.86694611334,60.259825693880536,65.19461609747601,44.623588193161154,35.76260883929579,24.613411624816703,15.46932898898287,10.72553557032714,25.407582717721084,78.99925776821814,47.44281393855232,37.58185603198282,45.25555877580291,67.68903142148987,87.63993679845663,54.35044742441093,70.58509456402112,54.655513856521154,35.4411482290265,34.67790460088608,67.50078934559357,86.89519835801161,29.1632102828968,10.124369905945695,58.63958202826144,17.256546833556584,81.8623768184474,72.56618170888359,60.36048908900459,63.262159224223595,34.447989697551876,25.009158864119563,83.63849014051262,22.51049270796325,53.84892107552005,29.398095125580518,24.250575474956605,75.14347522824997,67.89761066125546,12.158138857657068,73.36864349349683,30.311177268967143,74.82747250811008,62.05745840884206,53.67067582715011,23.689650149596893,67.20413835616823,49.06260800778869,24.787951017143538,59.36859698609414,38.79685277378319,80.99813003394294,5.39531728138984,74.50434547679535,70.67234673107134,35.097408104930075,41.15933439313677,69.60958204939679,5.245502780805773,32.82107968892885,89.26595590753138,61.04107833448134,51.00269069597668,66.57351296557523,36.06958561051657,90.60879283579013,50.94320094251657,85.49860711191202,14.736519089793836,4.04641169768678,29.025191432394347,56.10494280912727,68.71556890572802,81.26799324737271,35.305185239485304,25.487801754230052,54.73587452910474,72.46302917448057,72.9800734560703,92.73989774209994,65.36894608339232,54.71124931773882,87.07012229447169,79.0457735274927,31.92190331513606,69.34018726152128,74.84828642833756,31.18580843602709,35.965011140651214,80.05045472747918,80.91809575143272,30.32314046900868,88.9000381291487,69.32431735322109,74.34196507582668,54.341978485530056,46.08103027269015,15.583755076725962,75.07419171013956,75.36032811305245,29.599597904725215,58.62196083014382,67.98173564049311,27.22883644047491,47.92926801679314,80.94759499959092,70.75132858788561,50.834450665658395,31.815186040614236,46.31231924374782,22.717893661985382,29.874339606871494,29.7840510549847,59.29657310829777,67.39911384148698,83.49559479552795,48.761803006126975,36.132834457838776,74.68484231996408,52.68934321575527,34.087454860282065,84.35879593212192,90.61685490935965,40.41047862405373,20.589024839290005,21.42151533717974,58.36740722604812,86.01892852289313,50.50825541339207,31.70876969435133,8.449418439739933,21.023972774321322,47.371150653395006,75.17791091676213,52.8324341974973,83.66410183657312,30.994405996192008,14.098561053472594,69.14079436772249,68.21321355929311,71.29653202154539,88.36867784322476,85.75052024108525,18.74256504364218,58.07861799530413,65.6975913015396,22.625758298159923,57.245969366931305,22.073130268536055,25.445267116265363,64.61233312552473,74.18974068727489,55.435944746938574,25.18171419287264,67.46226483878043,34.2953090982791,8.529502299819454,48.34766801982914,55.92083301106205,44.87115782099055,22.24524681280093,35.58764866700176,36.5969121271702,84.2518626190752,45.95335932688058,27.954231979948986,71.05470139267952,84.81519396192118,76.61290058052572,32.43595485126348,26.628873506702426,47.91741206434924,62.41900986053021,83.63523791239004,33.329717771978785,42.37494755880266,46.97718359275161,11.500009409629119,95.76449506192311,63.43253944699606,75.91407061430004,69.32440789583184,49.03655093157336,25.389831948850986,92.40311026051562,60.56800991247094,11.075963212050844,25.639232811916834,20.817446145793767,26.690747147015777,52.3471485083773,20.091703947977415,41.24915848615254,27.2898215096523,6.524478524517852,8.758305809507583,62.70842168643688,62.25546670044225,86.94516433614186,67.09978138559292,44.937149381112455,69.81416089188231,13.824532373243152,48.16302924394004,45.44720836664374,80.73059185929337,31.034866810033126,48.09139236356976,52.62903109207393,55.085724426093535,14.002509282913142,56.18580947060711,54.06886877527875,72.96899622426199,59.189566260565485,61.464215711935715,50.00572502995268,77.5005952063657,45.178046885128275,42.253580864898524,18.864326117610624,43.63668675841174,74.48455519107236,51.18966271107666,81.42375430581714,36.9328736148524,89.68297624927472,47.25329402464021,21.6078794611725,30.224886908280986,54.20646013282233,37.357237940876345,90.43161027034738,56.83796847504018,62.52926980946645,29.04518680697435,97.22074664357613,46.73815424691986,23.972293748988584,80.65095094471467,25.522935654775658,50.95521471932698,68.52987221442439,54.93585788956943,50.72103165489929,45.33129983817898,50.95470574599239,46.41811102853395,55.59548312027766,12.692288480428079,45.97098173384414,74.1306325242566,10.696756864750142,41.30435452342327,83.79103386624152,70.35306277525328,90.80245772698436,71.95877251090603,78.97046352259704,95.3854026137868,38.938774688164976,38.950685374335094,44.67775878721679,43.02547907329566,36.10600517971941,64.95019866553424,79.06786826282601,68.18237920170031,68.11005885354453,51.685827468611556,49.642470658339434,69.55012438387413,83.10214058701536,7.345276928243885,22.26249060796278,44.37573029380559,64.70614511286566,56.42654637572485,26.56672021589546,80.58331633957084,66.44304549697765,40.22525600059767,6.6054813018739456,68.95433752774534,78.2682038589744,60.88619824471578,70.5136998083909,84.7573148391158,95.46356503986154,55.90315091235955,16.45673356998146,62.38155775233072,52.18879271549435,34.50435352521423,54.64662507427887,9.458416876714786,22.80692839946576,50.03577059431028,78.56957896969737,17.959419039844796,31.055429196590655,39.83839034830677,69.58816447245107,53.60594373295197,82.26373480943047,13.00000223443902,59.925036237326196,6.739886019919461,43.49221364910059,61.37645802487111,65.716743224142,63.6221689897191,63.822532803956136,40.10767641119206,27.478007548875766,70.75558417624661,71.11964072526223,79.17255696218966,87.35547155357077,86.04859789591917,49.31343249529425,14.121804072189459,32.02509396570257,78.43228226139216,43.2914858934197,48.61053988682854,36.25588981419669,80.6308644320449,13.988748739216295,62.298076765549695,13.719500581251571,16.8092101633787,73.53812349515036,97.63673544389025,90.4325569743716,19.80522841487653,26.433856800004722,26.166452410495474,75.2307421268623,47.49817435214807,31.994927838107955,80.70144925313429,61.87748655850696,31.304809405729017,21.043273768296523,78.54201631577328,37.59131613148671,37.91787011781901,18.078529614428106,12.303250470713035,12.970478395474228,64.74406870037092,36.133846396537805,75.8320894223928,75.40656686942172,38.65596887972026,25.326812782439937,32.055413370517265,78.72294512610294,76.11490215689555,9.536017176390459,14.342030785806061,38.808149294146105,15.340463286679832,28.06214606468547,42.55046266316634,61.77477779873537,72.42726390012002,31.68196498937093,76.90226532913809,57.66585595737162,90.91127613239932,46.14601281620787,35.87727555157512,51.332617017960956,84.0405716234645,5.283689184133498,53.6121069072925,72.14549750677607,32.93683549382794,50.46476279790035],"a":[16.851945042705687,14.700532368730066,5.561316271707,2.6024618274496314,16.653945410322578,7.781405267380075,19.132153277921624,6.293264980090485,5.328376309479452,10.601608356246416,8.894606306146375,0.13345227143569005,16.042457221251247,9.871829993952804,8.997210291127864,4.966652051229863,2.5806532422387685,10.073573634200175,13.953469144106595,18.210265585056973,16.29462357366546,5.776880237889999,17.569440275200286,6.255088265164845,0.3735190230042429,9.09339589460501,14.580199675889727,18.984379901180347,4.900516061581284,5.203213245151526,2.009488087746676,17.835117716028698,5.175140441228607,5.024812198421631,19.66541778596762,4.030885870853305,0.4671754741250078,5.507050370255748,6.30952269782509,15.699025333680101,2.217267463313979,15.395479526410023,13.602679498736642,7.6519397481618645,19.09691080854808,0.5381945296344437,14.53929693145913,14.11315390754524,8.90071586238799,15.5595961823302,3.669465556119196,7.3527302494742885,8.554954330044788,12.437048454846643,7.084503620788172,8.502940067962053,14.440292675580038,16.605137918208094,7.274880412518905,12.414411939397997,1.6721600282498583,16.728489598186897,16.90156334827528,3.262002570107674,7.0075926069979655,12.409313698022576,10.685849276414757,15.781087448342465,4.447445770820111,8.692626175516732,11.766968047911245,0.3357619096102793,16.47401990072867,5.006126994141007,18.389124467059183,4.523141693822121,17.406223393000595,9.353587075676648,16.74129251129651,12.093021914326219,7.090733152941242,6.838573355679278,10.18377776866362,12.47320003865453,12.43173369281569,1.2990958216843174,11.58470724104307,3.383798553454489,12.763789325072183,1.792252756638364,0.8390317228449629,9.103966849589856,19.447832317223966,13.348658405423954,11.97634834693698,6.418804326014369,9.24336872270052,17.635480480585386,4.049422498943294,13.879242208358317,11.197593286487265,12.175858954560619,18.141144291797332,19.980074286375036,2.3719488920621057,15.000729389512841,11.765306814593455,5.334753124951996,9.743560072329531,5.06571733944412,2.9616841871813993,6.598560630294363,2.195319778363478,19.887610030878978,18.47622919971927,16.661662361994214,6.051051291378915,11.34608052519357,4.403968371492288,2.9369091076396936,3.784949323403506,7.892495841270555,13.390749091782297,2.3151771078083527,8.918427314689342,7.208400990588437,2.9955990307801805,19.13075108189828,7.752253394614277,8.89365186300585,15.665882996955567,17.032538313662968,12.236374817585581,18.204703261878393,11.999473244142717,19.95113704527458,12.110828694542013,2.2269001396369914,5.10820773140094,5.755894968691546,13.673542180723839,3.3455395057230097,18.329208741432744,9.42683509455049,8.15157982828309,5.413777646629221,15.868925177394138,8.2991824584774,10.464459797751221,7.259742190111256,19.318023200473572,16.475870423810118,4.3258906772039385,3.70304479598345,0.6408416946249806,16.604203429932653,15.367992390873058,17.938952664317096,8.094211044928002,12.253633898993375,3.8096248847850678,19.81249817939546,15.042669940091988,14.643178567536875,13.822334239085666,11.299041919803177,16.673242083673085,2.1414805777960355,17.876550825633228,5.621658087113808,11.218376194933137,11.67198148374374,7.606023943941711,12.469179888696802,8.45106734626202,4.923835625445601,16.07948943297729,13.647600750660702,18.200986655576585,8.336813219494896,7.6172474718713445,9.52234494604049,6.528087448898141,11.68596979023603,12.379781528537519,15.359512643132538,3.335841713381895,9.15538318408126,19.129549818553837,18.069433633351185,7.282525362786854,1.2152960123804757,1.8383010145796552,14.414610541839771,9.726767083821386,9.59801320291788,7.061105792025617,19.58647150645593,6.085260716732295,5.921704027053556,17.331838523267038,10.228243610363332,8.702677703340225,14.706304363505662,6.399036169404737,1.6572065890415377,8.230655522887655,0.10228326670119525,15.627840200807842,7.361512675568589,1.9796562371127235,17.223822221687612,17.870940886913452,12.598323993040456,5.683485562133872,9.854666554765803,5.506580662124758,10.052113990821097,5.00551207839723,0.012311677389673648,7.587321107401421,10.144987701194609,9.560040160173449,16.154034379997704,10.541633934607724,7.881456550151884,17.483438866418606,0.7763114578051988,7.250613554703884,18.193490624305568,8.946018654247997,5.954666093541006,11.181341622742034,15.295783925302144,17.446096614517717,2.6795949617197756,4.088357504053657,2.6784447912355525,14.050874792226278,10.533480861490734,18.855985189525462,5.699011152256279,11.52350952869472,2.4204167368644525,6.0202894584005096,10.775436389828016,19.19202699053284,4.577343844532602,10.85781278582906,4.892406001508585,12.407607230287546,16.399689867174377,2.8630173288450322,17.114879974680356,15.586714024187241,1.9834718464314038,5.101903855569878,18.738896919547074,17.657603496002636,12.061103538689641,14.265342868056742,15.229317426270978,12.208158082453773,19.09421879815943,3.951586056812304,7.257496652418589,15.975300883034244,9.854969979674948,1.4682253788988087,19.369370964629496,9.18824111597965,7.3887927154177735,6.86581595499498,6.855460925589729,9.28036981823932,5.85644232266747,13.25367033888384,19.22897183877827,12.272603550034882,7.068766427531936,11.67361958117635,13.954081131048689,1.3537594319935708,2.947133430657929,14.011055378053783,4.154982942097987,3.218438202282261,13.506122980637315,3.7768434317751165,18.3836268012984,15.971321389657852,12.577832862119669,6.428341013082375,17.974202293617907,7.206516611126879,19.304931718413574,17.298874025453493,6.0372958213821315,4.18919582775517,12.822178176338568,4.804747025499623,7.823278191690846,2.161379166296249,13.302146856871264,3.5762521632307687,19.23733290209372,19.122164468039806,1.8762889496483082,1.6554079742839045,11.925201510259154,16.628818342904484,19.458904443106487,14.148362617565521,6.04101261512878,9.422135945351119,0.855805774988796,0.09049006478910826,2.000241199757742,3.462084282290623,15.789014034718063,17.94521145979651,17.89009852867281,6.2942960287484295,19.341701311904018,12.855696561629205,0.17264871286795547,4.045182163301715,13.660554993812442,5.690450873114514,7.118809573629106,10.171446306866248,16.73545392695207,2.256438997801058,5.701919378219489,9.971074795288306,11.883611643346557,17.935509891833252,11.975861619949807,1.4562049647081299,9.454050327879177,5.73293764915757,17.246268627147533,14.061997935394178,8.638800862970442,0.8430791527817316,2.1838755514426733,1.2210529787240931,17.62132792768805,6.554554508447077,6.029477458933692,17.95663266823872,4.739346233698134,18.005070691081425,3.9118399125621206,11.963699801403425,11.159649996967588,4.716723459422032,10.026254863635016,16.738695937336537,15.326866596304619,17.604725855271877,10.08321752357563,16.22175018947474,10.908633424528599,15.133065639010761,18.12035719230959,3.2501079954898415,3.12122437288358,19.440767082069947,3.504171775432927,7.621660265202204,13.93668294201702,1.6808217207320775,5.276774784755136,12.849177014826768,14.894177937173506,3.630149525350368,18.69463809222452,9.04930588084898,3.7379679419351852,3.3879310613485947,9.160976656547795,0.9738327426746096,8.917971700348195,4.884206883769284,18.74294540929917,2.185648599714267,1.828891473357288,14.683707266887573,16.127339716026658,3.6847596281617756,19.936630198597403,11.218211448797803,12.016997131499005,15.424064221990257,1.8847348065163105,4.063613516039584,13.071800941348183,8.735533681395676,16.387138699901442,15.637628759744068,19.30349502251374,5.220352674057427,12.373930501421126,6.665295519769292,19.816579381671062,2.6663653647218277,5.18709611800797,9.000529690850296,16.190457842980344,9.32391622993531,9.027802097822129,9.536399536180703,5.421238060762814,0.7302034316462747,16.436685050759543,2.969755088581505,15.107183603123993,19.725010536633256,11.951583772716967,14.313197692944776,2.2852564402936615,13.49069913980152,18.51994968029767,5.958391150785514,0.5500897012646444,3.881280664648319,6.876447876221641,19.694364688631335,9.549018599633756,7.7418830139068096,15.346263469627587,14.283291103389054,9.522022485844808,8.32126558713175,17.505659559277028,15.372256262910735,2.223535332453097,5.343983760994724,18.811061373586778,3.1381135193691145,0.6306892886576021,16.36615405740202,2.751213523601672,3.043762047501195,18.728891901803784,9.200523806857923,15.73492943912521,3.984136258600075,10.851046285590066,15.784115250086286,11.78205613606394,19.639438765939587,3.9906845287310144,12.33879314572178,11.421254713422071,11.143957246078585,17.90803975322939,19.250994681671397,6.979503433031873,1.2659006400815453,10.725443443713703,1.3413667739237667,14.604173291581608,17.75087240305099,10.52024897789484,3.204095883195417,13.415028891718022,1.0228873097610114,17.09256637323852,5.120121217793452,17.813220728783257,1.396349772336789,2.7126699588595526,18.62151978817929,9.118187147913591,7.7978018796621384,12.95918912192517,10.314038749538721,3.2326837784821327,11.821616061691959,11.840319512078882,7.5656018464475405,10.334376611891578,18.245085540312118,12.015527311938481,5.9964923405432025,13.892064299202707,14.897910346913514,10.501316781570381,3.169679018934959,17.940788854694,9.45587183394904,11.98225676550189,4.963326870534268,19.826914521181376,10.54010921467202,10.723011457670255,5.191226716195234,7.116193395741992,5.558069356195916,1.4170620351929042,16.030008959232127,10.386164620172442,5.864754347480146,4.837115467523558,2.5513544002899646,11.765254135495514,6.831958565638687,2.107286881238637,19.326094861327718,14.940792306239947,10.595379039547822,14.320167470491235,1.274120220743371,14.924341823345127,15.566637242400718,10.874907438607497,16.993641593657497,11.402075333219388,3.62932376020463,0.9575164268679615,12.413811365884296,4.41452675877863,13.29300926199429,14.387791078445101,9.733750546060826,2.0449948411564467,15.229402271691486,12.603405753919926,17.82023377776516,18.667508411320178,7.29534935142929,5.932060316147245,6.158992016178124,0.7085939511025519,7.156208121894081,3.285357999685057,19.420174201620036,6.815487764902048,10.774973065224565,2.571757135263306,14.001623895232903,8.582549367206664,4.004464240900183,4.900822633199833,9.473542355174578,15.812252738445874,3.240419380398545,19.128001746394226,4.3504883211435885,3.6591496229641107,15.185411200255388,0.33190247164033515,0.7107751395010942,14.903850962226773,17.259733721457042,5.98007246708522,3.555862260183753,18.498726466690727,12.485104509510517,12.3391145104676,11.364853825910695,2.846836560706567,8.909989172525975,12.241399741480103,10.892277345049703,10.460132392474431,7.585690317813363,4.227324754435102,15.774096815339359,5.1758852343047845,3.0469936907562944,2.3714744027011214,5.195115402298205,2.703624986366706,17.4618662967164,0.7114321803879076,10.072638007547635,7.178304339294326,7.763137455108802,16.511623666277192,11.165439043737253,1.516657321265309,16.361894387753736,5.235132443748576,14.132181560758665,0.9938180849181322,6.6418139792604824,5.967642272747704,10.9171665126004,7.7405352494261015,12.413140887697418,14.062406658579821,4.736570198118577,1.6305821123603437,18.083984258758086,17.011757517871647,0.3249974542685452,3.266502847901882,11.173309421205047,13.461394474946076,0.3306311038405063,5.896772299407851,13.237513714954922,15.562010578758505,11.045399762541944,5.731465733923979,13.711845712550588,11.669203738345711,7.392310856773361,17.6157058652217,14.204350935749321,3.154901139788584,4.655147145161913,9.389480861516152,17.556722862195727,10.836193690614607,17.076904517718848,19.095216689887305,8.271469237064215,12.541203445166754,19.57787874894381,16.751846873002954,2.1441506754224138,11.157063155877381,4.225403497275777,11.656962252064682,9.043624954399645,18.958512226433,15.297409166585627,1.1039960442056396,9.153405239712523,14.518783526502116,13.531223490716773,16.23117601235949,15.965213570379678,0.9260958867587687,3.129456348945574,11.176508777026108,18.049509453788456,7.8136483364269615,7.407565385048209,14.148634562251026,15.326830094355387,12.735341371883253,2.6317560580449006,11.95075975783463,8.541689539076165,9.098140759167691,18.243506989523635,4.894961890135501,12.860161656928204,12.557230266704792,2.2654090101265867,0.22288735571340812,8.560635322859774,16.763329175847982,7.426223147563604,12.235318370819686,5.570298413618735,17.211266879343363,16.015077020834248,6.385552272623736,0.34693435848019316,2.2049703526859377,14.460156858576676,1.9907352785272314,8.345662006097307,13.13880132135132,11.702342740290913,3.2244754353800253,14.759120012093781,16.681771327793772,3.523600195485299,5.218008425959431,0.2581968888327557,0.6851072579233497,17.03802778639773,12.581820491475932,9.789661999060968,4.503791224961371,9.958525263375337,2.521665243919542,11.71930194461507,8.762966799177914,10.904611319866024,4.668261932367743,0.8661439458384823,7.40291158758986,16.459705843055502,8.00207302248674,1.3724370619670134,12.460529110315983,0.4899087621947773,19.764059119299667,13.387214227565654,19.49944515538029,14.53319371080652,8.56283924217422,16.906849218443433,14.765057496235624,4.19041766690059,16.81019468210879,4.820192714291971,7.89859512941808,19.057083061785924,19.840482429669883,9.792760023122039,14.441870542001158,12.395974132023056,13.028401656841705,10.783955420538934,10.153816701827157,6.631484181498775,5.506735537174499,15.043446624437378,0.04692346609903808,0.4169081944674158,7.242758858093543,13.73129976299927,13.752352041419416,17.121060016980934,8.028727433971037,2.5052271194384934,0.6798112084659191,11.49820966381216,6.3426960879822225,11.258864521238937,6.9477523269204156,0.6561898059852656,2.995148326954782,6.6615211395775065,8.900750771066601,9.594610230768561,12.40931787560168,8.784006950214325,17.987030711231235,7.058307217206008,0.8336886139687305,13.414443612213693,19.567900357909224,15.377870953750485,7.2603556597647145,6.6507825238760265,14.593827457097582,10.573862176592549,10.452353650206527,9.279384191636524,2.797800949737468,7.375510377558925,0.19817616695933182,13.393806480473224,15.241329062503537,6.9157501145650535,13.617383039231372,9.459844920630918,16.01752148721254,13.645089292591127,3.6236056169676267,15.441566981331754,18.463110943866113,11.403968402985791,7.357205494091916,14.100437866453843,3.5911257816644993,9.450757970725924,2.0370742896069682,9.024554475959189,10.142892151919689,9.94728735414415,10.820115997025459,9.065619415340409,12.64855588520437,5.922700633183231,0.5177644263571768,10.903187147799475,7.0762993135218855,17.882932426088406,8.93642174118764,8.395234129376249,7.378419565598033,4.448218711428216,17.344482041715736,8.858139073135781,14.911042891724154,18.919790679793817,8.586961804447082,7.445272872687823,13.201269527850865,13.82048291673243,1.7439142220908321,6.350363768853069,3.669070933702643,6.74357581815241,0.5227286542209697,3.146120328031601,17.291678794010096,16.550686211461905,13.540676084438022,18.826419226546523,19.507468326652948,12.671496469580624,14.309784398477078,9.515472692381909,3.3052279390331085,6.211214700972745,17.449353485071576,5.36033062295576,5.152672532689846,11.540345723864265,15.254580710528135,18.204427574360835,0.293931675519401,4.681247186455053,14.365724188968496,5.087044650261068,15.937653050197262,0.6255709939790544,4.789829265283272,8.393030405990697,8.415667800207775,16.76308578088252,1.2398191519295443,16.453632938508832,5.301364458430324,9.704471493558655,8.872014470929148,14.024461431140791,4.313595491884485,1.4006521560503815,1.8425213917245697,17.73507779094392,13.782766318865715,13.970280145310161,3.300660776157378,8.400853007509127,3.663563846187121,6.442974005142101,5.933812369237987,12.467904592309065,17.403919926347182,6.874078234068142,19.503276079616544,9.832225196255614,11.975829166326847,7.285508111694283,18.953999042289176,2.9751302078558606,18.77706826893611,15.973094343496701,13.241504273357245,18.898468312153135,8.868060594182161,17.91897152747299,17.82130271407461,8.305398378088785,5.5293672169921715,13.265479798251016,14.810966050712562,5.928954178788337,14.821310184014127,15.870049899243659,17.079355083071302,12.674690201133787,5.114189566583467,16.036180471411747,10.061677207201857,3.156029371900435,5.2369248490563525,2.2243676151970204,1.802294355331786,11.334794575481961,19.94284026960081,9.485834027033908,17.482623516201663,5.383995870340441,17.290132296936612,19.13313657693852,3.3827135394049224,2.317993184752596,18.562541735480206,3.4167381632362126,7.219880556064049,14.043593738735831,0.4952816988783759,11.942741837117019,2.4789966849242706,11.878986444572712,12.537441098030587,19.797724284078573,6.17873505766084,0.7939727709492894,17.30044066549104,19.851277083201367,0.26472231566988746,4.634875524536914,8.70042378783873,12.354113544051826,0.5987654301130663,4.39966348104091,2.0805331817550954,18.37098229394065,1.2206238134480696,8.605043356506803,1.3173803270675588,7.950401601875181,18.104336560443937,9.516860477171708,5.4792677739346285,4.2936527557344295,8.927320650601054,3.461260431475104,18.000577626001473,4.179478122305511,1.3417183245701692,17.424511164181293,15.366386220589225,8.40209763053393,11.393519186701479,12.64590906631943,18.681215047437014,7.959580471334307,19.277806224475647,4.2692375072407485,14.32842157945171,3.599336934545474,12.959616732830877,14.904262133694996,10.187268919543794,16.89258335066448,0.7074834428685328,14.604924834802876,6.629009769851408,15.574335532136532,11.81875898510186,10.353321800296502,10.349103475642835,16.52993174094267,0.9757419199398365,11.116819215610327,11.648780096635733,8.095072257885567,13.081901689381441,1.208897837673777,9.203428856649435,18.290869452056274,3.9825276495277784,13.374369915535915,2.2634614735240444,12.119358198775503,2.7738302890912525,18.647187551469205,19.046540381121886,18.687268755206997,11.482229239564159,8.931967677076331,12.359909680556282,0.6384884403815017,3.959674596026237,18.494614651379464,8.824247571073798,10.768725796732586,1.5277629811156412,7.931546841676691,19.28340243028095,6.683747457298228,7.880138046024379,11.024237576014443,12.545009054842229,11.124839803407106,15.253627034440793,1.4653546046808374,15.182112723021493,12.586218619794565,8.600159344929356,4.595717859991519,19.95859146209295,19.264335932394324,6.88978228456504,2.9870788431083373,19.67210199640676,15.128342826301942,4.358439654230484,18.227534228891567,3.8140428784695946,8.653803934294263,19.186526406790513,19.971524357994646,11.5648063496686,17.324461906161204,3.856471840969511,12.516475388068692,11.988044507768283,17.282779958954222,3.9651425560240705,16.367826516014926,2.9978032487196105,7.202549104620735,6.115211905639426]}

},{}],152:[function(require,module,exports){
module.exports={"expected":[3.5594142996032117e11,2.838726703082709e9,1.1321043023408492,2.0656931052297023,2.677560410788054e7,2210.66840369625,2.8526387841614103e9,7.541961930577596e8,3.9381180329813013e9,4.319925425392253,360.1410016466463,999719.0466050917,2898.17443731974,2123.16744834477,1.2948856976996248,96157.2999228814,1971.984073155882,2.1825710331740242e8,1.0640390125621584e12,42.35064262848008,1.586601458651266e14,30359.629492368396,9696.687578012106,16.318268978112325,271.12461449855687,1.794468240486984e19,2.0144964144996997,2.2697994350217965e15,772.522539974772,474.6677202458562,2.642572699544718e6,206.55960771846424,707.9882305325084,3.56957471574643e6,80.20815582376677,9.401971943499703e8,94207.30586005063,2.172441846262333,1.7069715985278006e17,50.78411832996293,1.1832594747548212e20,132.8897371490557,134070.46150577505,1.18128164412439,1.9317714714130116,2.0245163158125408e7,1.1888791064924767e7,512099.4870086005,1.1194088457606715,3417.809101995998,2.0504472829060405,1.2147246400472093e6,1300.8728802185024,1.0062830854143023e8,2.9947504609089035e10,6.347433027248188e7,27916.784770934144,2.393921648608522,3126.045417231948,371.79272910138445,18.872736704484556,2.1211112115277094e6,7.464352651100925e8,4825.134429845599,18669.631229048846,158.83188413864227,5761.0000866954915,32.1954760189473,457.59330343328503,5.609699515641527e21,1.312200750799747e12,15.770752442367998,114816.11159454988,1952.334739987979,1.176864349229054e6,42.03181359795724,408259.1103693446,5.4297611315653e8,141.6991054122306,25.29460070108453,1.3625291269120918,1.975704888038473e15,5.3715432030994005e9,3.0457771296641547e7,1.4467121719813196,3.1937513910548195e7,1.8620261795855324,32939.37243600471,1.4642899958000671e20,400.9989303637231,420850.9601742605,3.943698819065458e8,3.011131424660754e14,2.7106404633741656e11,4.1725479298281044e7,310823.8544022317,7.791518721618477e12,398306.3524660343,4.7161891666197973e8,360.4885645359687,6.911442448856752e7,487.46101921000786,2.6101180839304365e7,1.9495202918461257e12,3295.0032025937403,42.28518382341391,16.53805044008233,815757.6912177933,7739.3068446945845,3.8534926986761835e15,3485.473878650111,4.425385495891673e6,93.0261699550606,43.94903737526686,1784.840732469822,204.37721221008854,1.1067717923923224e18,46657.39008443045,16.215759676806243,293.7768906265463,2.6895299747229123e9,986.2652070956802,5868.487197275814,526426.9954893243,199.86304845837475,2.6168102784607465,135.14045427950944,1.2667265428393513e12,1.8682823843019235e19,1.1364376156945802e8,9.321269939252877e11,8.37209814480628e10,34.93829475673739,3.030428878830349e7,1.753588872749088e13,1.5341148363987888e14,13.045670362013063,678.286713509158,1.2754083764699015e6,8011.616707648776,3.519805657953371e14,582261.418941522,14.215127137166846,3.8411978475665855e6,2.8165003075407103e7,4.3476302583479614e10,6.051157745774077,2.023543164813486e6,3.8069712028321884e10,2.6207993693662203e13,40.258908770234676,9.465351768628713,2.0462332510623524e10,156710.08625587734,4364.708948351133,3.845436789314886e6,5.1288870070516905,7.333518324175574,107.31453138859075,120190.23182775766,4.593262472325767e7,133.03216286711896,2.401736353268994e11,1773.2160993515504,1.027909527963377,1.5988743395808926e13,358160.04692997626,2.2088191345309883e7,3.2598833930268297e6,440.657794333506,13622.781995980618,19.272959074489247,1.5525517975807293,3.804129771508252e8,1.856323536182023e10,2.1373595072620184e11,1.1044927633739324e12,4.5547842872714944e7,2.874720825472692e11,1.098524080612037e10,1.554176136916086e12,9.640081173011215,682048.6625292829,3.7010433965940606,8.699309120956931e14,3212.5080563201773,7.904666750113953,16.273192108678824,3.8766593298163547,23399.415075111025,2.19377613213147e9,2.0840090408938348e6,1.738303992702067e10,230.47642635023107,1.0565503263471667e14,13990.886128135575,32.949987943031374,302.01873864385703,1.2035933850496876,1177.033913058855,7.708369988346575e9,39.55145240213108,1090.2870722060727,858.9962855585987,3664.6835892447393,2.1749905780850365e6,1.5849347011714959e13,8.733525768635003e15,6.9400340070490385,2.5012434596334536,518584.1582701053,5926.460899677286,1549.1463161903519,1.8959620890753826e8,516.3091478928249,4.402335931540614e9,39.222638902127564,129687.73614219307,69.58308733350282,267813.6260690689,6.093606414209428e16,28.458871433173343,6.486411966869259e9,111078.91508915664,1.34155397542105,943161.3146990628,1.4537669349088491,2.673571633696281,1.2347543945244013,3.088043306124203,6.030224998462421e8,122251.06165111627,1.6382991129222897e8,1.0356426231158349,8.940632170679649e8,153251.84884570702,7.559415705925452e6,50.23227748501592,52.52893348324099,5.936547060059562e6,3.861694747370249e7,4.194716605296328e7,17.13431202177197,1.5742085464889228,1725.1766529630968,2.220306650144709,20.563442453564942,3328.8188562188648,1.363678140547121,1014.8539615094362,4401.563714299017,410.5566503963787,184.05244406376897,1.6373606366953417,3.257082110063886e6,1.8967682478382706,7.268352331182876e14,6.610198296648397e9,12.118384600934244,43.02746307568504,17.427862074635215,1178.6511737959097,7.731022961909661e11,3113.3876537174365,128.56951437361866,26.937182004607756,2.95204255599533e11,204700.4613848523,5.799511254824516,903951.8117446259,166840.43268883927,6.079416754053872,145831.3257642472,2.0906981193290925e17,65.37760743920356,30.190129386107017,1.408157641218487e11,3.948676919107636e9,4.120546330506525,1.7017519958113007e7,10.502271622559231,5.124316464191953e19,3999.3624264459404,3.1464796090428686e9,1.1157493613739903e9,899.3602531254202,1.7750427913142938e11,14.729717274478023,2.2465075132631324e7,6.405930070393026e9,1.6327136889195583e9,9.62879379416289e9,7.087851861318678,1.7351176895159706e7,4220.721203299969,8.513312654002456e6,1.2115695518383867e13,273.5344847934616,985.1678300682004,10.338507598445705,2.681736523599919e8,477986.1723719527,3.6943410265383915e15,495.2042277212747,24030.15970274152,9.304458228031452e9,9.83524538343935,2.3588298544143487e7,6.298023809974942e9,4.817491448356853e8,19.81144182104078,4.745947441763593e12,1.6607666720142156,23139.372573569904,448.3917491789188,10.314292496624818,291.22684890622725,2.9213077714008844e11,8.17426863846869,905.159730891443,6.860585057030886e11,2.983436910201132e7,3575.248283465906,6326.956670833502,2.2081153671914886,1.0032467095244207e10,5.336835976009855,31637.447938464484,9.039354838847382,4.902530393478104e9,16.651936357999542,1.258734433255815e6,30.96550883314683,1.3642753531830347e11,3.5362466770901317,4369.492068023454,1805.906480262865,1.156788374456002e17,392.39230739403735,867.8802260693657,1.3466889020191208e6,1.425426069067685,832207.0416128132,6.322849714899978e6,10357.144960328158,7.48891541893461e16,1144.2881873245885,20647.20926631218,1110.68689318339,4.920633884399962e10,1.4510469607021621e13,4.764285806100141e11,744918.096205425,1.3376186393811452e8,3.0216022969879257e6,91.12790504663448,2.4356748187257637,4164.004056974086,599.9436591341306,530.9059004037923,2.6579165414038717,1.408286188474286e12,195971.60462909724,1.046487035077736,2.5427905876843244e7,12952.16677203746,8.67002138257392e16,2.30304856338541e9,36637.16549637615,37.32970088471525,17178.87526174962,1.462287347761011e20,2.0732140909494526e9,1445.916061431146,1259.6327544366193,97.29030568642759,2.9506667465757725e10,3.936135606371136e7,7.240630743205345,152.48758429742486,14.125787787721649,3.846852237727125e6,4.6078725190000206e8,2.8234323423109286e7,4.493848777618134e15,1753.5863837386519,119092.80725894189,2.9572768671044116e11,4.979694140070052e13,5650.631558548816,2.661279801568156,73392.46528710594,1415.4022352083102,1.1002020878128161e9,3.2715974608312458e10,46.888730563535226,137537.9108253252,21141.002159714382,2408.64926415802,4.601030955498686,4.004538876689962,19.838265040126615,8.621432024625377e10,1464.5207686311553,21555.72726858942,121827.93796201232,1.632440142974292e16,1.953122886544948e6,20447.382562212842,1.1350545306054836e6,482386.3597854416,3.8382771748139985e12,2.1643685360221844e6,6.218078560615219,46477.430562204376,2194.297491764527,1675.4222696980842,7.561014414157376e6,732783.7529510956,5.640024729479072e7,1.477756520175436e8,5.639396995408727e10,101.75253079246595,1.5610000739047784e8,1.3153278206122305e11,82454.61276999391,7.09977510969134,207.5189508559177,4.860216310981252,27225.322034874574,15433.568780424812,8.334053695691976e7,488016.69790388783,878.280631716309,6518.701954353841,4.507367559583422,18.21388631180678,50423.87510085565,21.0762855280126,4.936880926352522e7,3.46735407302104,59.98725466381741,259387.2685275851,5.498457476639699,1.8891184703922335e6,658836.0291374497,2.001910251682842e15,43.78096649688997,31.050504067179393,1.6224196106049416e10,21.143900319032664,7.896513421206428e7,8.50763243509819,3.974023787123222,7.923629286393708e11,2.4963307623037094,89.72645006469419,2.157238763600151,1.35581916267104e12,1192.2069914505894,17826.515459210914,351837.5030260887,16.294673324152512,34075.84053140109,322.2610109473557,5.678006933155131e6,2.7298788446533717e6,136586.75754958173,4.568195850760582,71.77872945676661,6.650866140201948e6,6.876928422871277e11,4.3849691031724055e15,21.00235995445763,6799.651535278976,240.5769668569276,11269.636608409666,1.7479020581582542e10,2023.0615020283806,3.8746711676841117,3.291210426562461e8,2.2960221273344654,3.0822123963471997,1.4461113392922789,2.950049678283818,3.525162717198952e6,20207.125383038154,336183.7493709149,1.8795632749388822,120.07256093916698,1.0900806081484556e9,30.73696086586662,3529.334167411952,1.2260658174658683e8,3.0558477002357414,129732.32775206535,2.5282883218981577e6,5.206935870061684,1.6102506729364127e6,10.677333142447148,10488.568573817816,1.3404934957092568e7,4.180980175399462e9,9.18221756294015,6.746159387001986e12,22.017153321327683,3.203152496083101e21,324878.9693435184,7863.31069711644,1048.0635565260839,4.806875237135923e12,6.719239829674825e11,13143.862449051469,328.8874614247871,1467.1443559497734,30497.309131355898,7772.512216855584,2646.655019948692,1.1155882312986594e7,4737.027168043429,40.69310285699817,8991.481186913712,5.752805011678921e8,81.78677629333957,40746.58889999164,5.447408459008882e7,8.34618263607821e6,1.184691513881971e6,1.7413669644795358e6,1.2339319969170842e16,96.15839971707817,2.935342225110315,7.817987654880203e11,102.67744826798051,9.593094620901316e14,190.12538938591007,3.038565101931988,25.517283349946208,11946.264742385802,4.992702977545695e6,170.9397197527241,10.539532745054544,1.026067061114204e8,4.724801098062168e13,5.3193054770792925,1.3758024832227435e6,733.1517164764216,1.3905983703093685e10,5.824074288666705e16,1.69871030367483e8,11.923141688198706,10.881042715100392,28.616034443221356,1.1446951735678469e8,4.202613932622909e8,9.75824167082488,2.3678978171783254e7,4162.412428452001,279284.8893614764,1.1255305242951762e7,5.988806573771842,3.3611173360453286,3.2604728218379088e7,4.19228619235313,35.795261779935046,9.731867795372184e6,8.156226472448038e8,3.554503423330055,1033.6802504565517,23.174518941324752,3.3211900947258293e13,119.21094597640149,30.989943488370425,5.96629504793424e11,930.6836417948,66081.85423340781,1380.9376458006354,1.2181228170037301e7,3763.8312957319877,1.8400851558538962e7,1.90653298227989,244.586390387328,3040.2268195106008,4212.9438003722535,3.4942040521651692e9,7.45530913878441e14,1.382510101075766e7,29.623207103291726,59230.64611976528,6.315243373954263e7,402.69433233783394,14044.080579830796,9.955933022672113,8511.824890292408,1.9787931054878104e11,1.4251006339674296e6,68.58781667981097,444.72427865456694,2.2073751338838035,2.614962435161124e8,17.396589186656904,13162.820796801094,102.84173654245578,1.2209873571822588e15,5625.783652638307,3.2830461939442217,2.3783309013054543,4.337647667642389e6,7.468858020626724e6,10.056337370971981,28245.053334754648,652025.7066172641,7946.823211395232,11324.610218955195,2.5583952833909,946.1886717384738,316331.33141088055,5.641027717617143e9,137.2512973912216,4904.809472226467,1.5819811948449528e6,5.073075791156843,447687.46589491493,90065.69757744712,464478.24967614963,9137.724175821322,69.72887009929362,4.275665832015504e8,2.4327624786444666,253.8668933578893,13656.950686310913,47737.10489653834,7.675803990026869,2.0456022886263046e7,9.029545071973479e8,6364.008793527277,1.937317634277636e11,7.056589377396161e16,31.37965090953401,4.893388181381049e9,2.1537936383127216,9565.195259415552,34.58841619437768,9085.144007745199,14.875260489987678,1.118014431546856,298.4452001005491,40.072822575417426,24.255804108277218,8.227387122140929,6.642318839665785e9,1.8701677252508495e18,9883.086093493132,1.5437321214958462,566.2450765324146,2.949119824949952,6.592381092986356e12,268.9842094466989,2.328831456906711e14,1.0014770342356643,182.63230536266545,287.5489151906657,17.03724506166128,323.99126915738555,96820.45912297617,13.680090694133076,4.7719841644620344e14,12303.142975131464,1.1152759648609234e6,7.137095919729344,2572.5787504602745,3.071346145026381e6,2.124691858357919e10,2.5508531971850744e6,43078.41157338634,752582.7785676075,652.280946597141,3.6734335752648217,60.30308102624584,3.0619211769675236,2.1090867773522134e12,2.7597880771347978e17,2.375124217574328,1.546406946002506e6,76052.19949832319,9.53685328216369e10,653.778673852082,11.441614361435082,8.857782950436766,5.489785137379026e11,5.487847179488329e13,12781.066105720583,1.2913830669226356,378892.7420796691,642.8100927104468,1.0383508210951176,8.203028632622154e10,10.30322784708555,28.680478302909123,6.674148598141998e12,370.07318818095155,5.3861587276019916e11,5336.965899609676,9.799560944852738e11,38.884309172058686,2.578234803961405e6,308402.3789731767,32998.826173236426,3.971524602207908e11,5.563836957830147e6,69892.78128822694,3.508415851934572e12,5.1003819116588575e8,72.43024509437097,3.527902401935249e13,31.36953205298945,6.379410091890568,1.024269425203335e14,386.0214181014446,3.507693515733132e6,6.096957481525905,275.1532434299725,18575.45777215416,2697.828830109541,261144.9065770555,257.16475790002943,37.954530515939986,1341.1816551955517,41.537483820991945,1.6039291089061506e9,76304.57637230922,2.9782482779838884e8,20270.577318102773,7612.245694858928,108.66537867819791,1.8366326343086399,7.28438471224754e11,11298.39493644127,19764.01788995885,134306.1696832856,3.128970551526714e7,1.81302923042313e7,1020.2622639207848,2287.5001258622615,6.1648364636796575,8.32011048700559e14,3.02930915052408,23.533447721881508,62371.5301213075,13735.209938662343,38911.4352234307,1.1131025443983054e11,4.09312509427449e16,58.14487315617176,415428.2791818183,561.1296974383705,338.3083058016177,4.553381561283358,1.0958122676987632,24.653088280555206,18.234965123272808,220959.44179951397,69.18692905726532,329.2767256644372,1.3376293033825308e11,4.2994125360590765,792452.6609701212,56.742835764309575,1.5346172556189716e9,2.7950525702160347e7,64707.59809554807,356616.6335541964,2.9171017461895024,2.7349701728540173e9,1.4266041280193767e8,1308.261513609364,1.3614115541353614e9,132.05185889702145,8.386979851036237e8,93.83478495304016,21116.728079828088,1.071876853523361e6,5.899775469628286e11,5.673894862837405e6,6.214580696392659e7,205.2059945640133,7.410893550283684e11,9.125079505645448e11,6590.229801055298,7.393061523302362e11,7.408235187296843,9.608518584747962e8,1.571956229468474e7,5515.10937780695,32.812213411534884,4.612010651900297,28268.331782421916,1.6761389974608307e10,1.4801428813819757,5895.10241038943,175.4054708612233,1.3066311808030459e6,1.2183677338322192e11,1.0591940209909968e9,1.5055840583639655,1.585322318217353,67.4574912435158,4.2540189138228625e13,12.921291421521522,2105.767612211914,11494.539696113852,224827.3608748999,4606.766698084711,8.810434487298055,2.979410539159248e9,5.465484920138318e6,176.457111340232,2.4090753938265393e11,497.67897235092244,4.7728127776330456e7,8.8547894954269e7,2.249200250454596e7,71.88345860997556,424113.3301407335,2876.861762791322,5580.139429419082,29.177905500771423,3700.2975384060164,29.602405214375917,4.492459196358571e6,5.659437289132248e10,3.31439910857504e8,60.92576101318129,15633.188905379026,2.3202110488259677,46.56682399252687,201.40899538344868,155.205306719109,425.31679399939713,3.0677221365488625e9,2798.7606433749575,1.648482389098947e11,48355.631170063505,5.578370009113773e12,16550.508520108437,38814.48838121574,2.5618815236675485,5.793190108473289e9,33.65239795238026,85382.36300954287,290.71972354292745,2.982910734030464e7,4.691412683302978e6,3.6116692090380986e12,2.4174131902031063e10,52.13153762201668,19086.58568644337,1.3236224599078796e9,1.0033770944382748e11,98.45361167154127,6.254509800096354e10,2119.0063909400374,209.4391371819141,17.376913788469388,278636.186788661,9.509802212518705,6.674770240598567e11,1.240844081513371e6,2.954843118428944,487377.5185363602,7.969350764307875,1.955800623791087e12,1.2912223810959908e8,7.54517321249061,5.031776201546104e10,1.3322266189011578,136.0466472168352,80.990193469723,992663.7527077959,9.935533772078905e10,38.116347688269435,1.862965469899124e8,212.12411561743107,2.2447488469097987,2.9339859369269212,896407.2981044772,123.69242157956893,183.51853070568563,3.9783374694233376e10,15.429712232524128,1.0386562873939494e7,3.550788652964646,29.677554457426154,1.6046640968974105e6,4.280361840510551,55.56529044905425,4.06172320566982,6.433917003919291e9,2.5892325859649985e11,10.805835073191428,636751.6660968886,4.69992198933099e10,1.9851318674714014,12899.136272644595,230.69169247846307,1.0896323430119634e7,2.1083134239809055e11,1332.6720734530825,8.55342507481406e6,1.8871773319743699,145797.5495409022,7.801551092697462e7,619589.9715897554,35.35221077862464,25009.269007756415,86061.09705952473,1837.0633954963223,1.4589510247938745e11,1.0377545444867832e10,14344.726864114615,5.052869664447647,2737.699136230351,6.129861361622586e7,1.1979634370528482,4.7497899400951886e8,3262.4719494509845,2.2340648976545923e11,9.517558501155959,60.09175474933715,1.0593993047274896e13,3.1854511810517224e16,5.480426485569066e10,607.2528334262157,1924.7616512622694,39.97633686408955,124.87905191049651,63634.2349662254,1.7632179140677493,5.036956824358767e7,1.0592606734723489,2.5006767255052747e6,3.5986447098408374e11,215.87058635775847,8.635156043240512e6,18.18279600590417,2.081420530275958e8,84381.0181274582,1.5028216391704778,47.37867369989684,1.354919778627913e10,16.811304077318486,48.30044884783358,3.9939306023037315,172.2074127272642,5.540548890347298,2.127886663610339e6,3.818960788091468,2.629254771402542,3.8413358515161835e7,2.490292193287351e15,5.15445266730276,73.24218821901096,4.299385607289826e11,81.61276400301293,538.3091757353502,1.6017537088989563e10,29550.526503722962,2.210704206988804,1.7431297038030436,5.6359395468642535e6,9.382524668000817e6,6.468210208526096e6,83119.14920352845,1.077597586956444e7,2.571018720124507e9,4860.968819488726,7.309761647688037,337.58396995419315,2.360189068079146,12684.858697592605,4.084683998950077e14,4.322248568227477e9,49195.71476188815,50451.10135070593,2.579848884838547e17,8.197843052832686e8,1.4880281289211553e8,15.426987247294292,3026.7430821030575,98.17633085538077,4.836314093198902e8,11983.956297243827,1.1329504794002813e10,2712.0491507903407,2.709241063543488e7,363718.7949725209,1.9431605200766378,982.3468567906398,1.8896220514945258e13,1.0158600596714163e9],"c":[26.635268048846562,22.16437864916517,22.99348330959066,2.361373924213666,9.863123859415083,9.29290979571354,13.969397568143188,14.68926813907167,23.970859902034128,14.085314423865633,19.316798367403717,20.235872347996054,10.735485064974117,21.38513120305729,27.01454478806872,19.880929908117214,8.896265323158492,16.40544947430355,21.84194375742748,17.353818559636007,15.160907664431058,7.857995387344185,20.239343747638806,8.271369029296658,10.11388429355541,24.74816198131178,6.671017735820677,20.819910458912137,20.84667359117649,6.77639682070923,9.419620054754802,7.465037095089356,21.015674106581805,9.660879589657938,5.8532013193883445,25.055389950292668,17.834830647466717,0.8593976231810878,22.196605008652668,7.096223809195235,26.73127097037203,8.434203943377963,25.215259706544735,4.020959237251977,1.1474093250436672,21.727914130846695,21.511501287444062,10.826259037698096,0.34970957182760765,8.523135786138356,1.6030178376375561,10.792530501335499,13.772978530265826,16.764564106860913,24.44372442834029,10.771260212305982,10.565140654910513,9.43732239937616,10.972728575602188,6.699834869943899,9.865115196972624,21.642241107323596,20.646066697495776,19.424179677930407,15.030164910591475,10.02116734900002,9.308510763489942,9.73366983958702,14.649597107653515,26.357729904484845,21.627073609204,6.639114772951213,17.746381502600528,5.838587317655788,7.501969428515203,17.223033923041868,12.849422401908237,17.019379229462444,21.135870683221828,23.00899199326848,8.42237819329735,19.827415258468854,23.55017958960512,8.89413988608522,15.091401945248641,19.955123486651857,8.310507830303333,21.175106592714002,25.866235164652082,7.339189309383648,17.161815757000028,22.21783442820488,19.69730124093559,18.591868744827526,18.970212892881065,17.096752111888406,14.684107855303004,7.6318442759004945,21.08908319926303,10.692408545878124,14.522611691791997,14.014053022999008,13.039919104260981,9.038355532547794,5.658106476089564,8.306752666867288,8.586237727542741,23.585994473566192,11.72745070404018,23.630543554179095,17.08579394910995,7.212027180669519,10.19736932675531,18.67925439379512,8.85239467666473,9.434565218828178,25.361171417499605,19.139910732340002,21.022276569920518,22.665815591153873,14.592319982981717,18.73959243995916,21.47353344242547,20.395712443872718,6.594822980607006,11.032115863698335,12.960108386457755,14.624148111933,22.877165821131236,12.282657017884741,8.093420831161833,19.815938427299674,13.2273158471488,10.907804907045819,23.193129640761654,16.11800069127242,9.893131433863488,4.958191489311117,12.728298046328756,12.943412096811313,22.226001114725292,11.932922170714878,17.177129802548663,9.884209959934093,16.380234597830487,17.71628013183156,17.95253479454823,22.38113104455358,15.094374365434069,17.756982407491677,16.754550518759505,16.196520612343665,19.303429645096585,9.418861228469344,17.305878246533933,12.10941634672042,14.462808259532808,2.25402806640144,8.610243186038847,5.738190067549181,18.059540444386773,15.734896176335418,22.199133489885938,4.9129360076104795,5.9750676380686105,21.78805694935185,19.095379347706448,16.505089114626937,14.677857886406152,11.175547491339598,18.956109812338006,20.34368744511331,9.873535897651106,14.812867504672333,12.270620003832835,16.12733462256189,18.53875808216625,17.97397236955546,23.788448550685146,19.93386005297474,17.27804854052208,11.850602468389575,17.31389614122663,5.364041089671052,20.7032059484797,15.140664887804663,4.792855793556467,7.178193606782026,19.738048914082654,21.68798325340993,20.53799110949302,15.969132488563421,20.97772126172741,16.833920084763342,24.310164317395106,10.034388863935645,8.527188613902819,19.337461257687607,9.308242550490265,18.495181962083805,17.73959661987476,11.898491991675671,18.760965305389256,6.156534552364382,11.312641094669747,19.684774288579327,26.079307419630616,24.780594043236814,5.987128165397284,12.379789103722013,7.705296962096761,11.130959260879159,6.510054746726827,15.073081970266697,10.98398708086379,14.44344550766283,3.284070167192289,9.611890685305358,7.686606910092556,11.381306266586478,25.923146704754135,3.061584624473747,8.89645556334683,15.476432886256916,7.251343495977307,16.77561010731611,6.273445912164194,8.504018244646883,9.18447367635676,18.039408443419358,22.30680791965644,10.690996457987378,13.807908497870788,5.505883298230515,23.240641177417338,21.347570747701813,11.261440670418743,8.35996864544002,4.673021448069495,18.240907179370343,17.13602089476499,6.541078325709495,9.276876100465142,19.358923525856778,9.111387695931782,4.106338820175049,14.499257157166701,17.124160623993767,18.055965739175587,14.70910148293527,23.922076274313888,15.382247697694396,5.660228790275826,6.255779473130436,13.374393476759607,1.5677663398872907,15.02093048477897,19.415444658416824,15.400902329197093,4.493001133295059,4.778008819296485,19.323190115627,16.6411236400179,21.83651059559156,12.257566726016186,7.972431450351154,17.032833318908814,17.125066444204144,4.903683960543324,22.143572355710813,10.275254603721656,20.502680582516142,18.212834479429628,21.100799795440928,3.4986554182281258,7.9633638653209955,17.11065184728711,22.04494584262042,1.6368779091272052,20.451052171190103,12.521299950078276,26.64757729358583,10.195175159253964,17.191651757627536,11.520149904319883,9.775915775630583,11.867147268098407,14.86136904206911,19.039968077109307,7.744949233673706,14.608808247580013,9.56315833046325,15.371505376726798,6.4007199057672,12.713644726756318,24.841719510613007,17.02987417061191,6.388113208557075,24.212417493031957,20.307546352396265,20.939329694732038,21.733259397395877,24.335516309415773,20.79553885335031,12.300946984684806,9.499816375550017,21.232825142551206,19.993364746366826,15.068409036068351,8.431216676676126,20.171455760840104,16.978273588950206,14.15611133575961,14.265467409833288,12.58023235408313,14.535207777919524,12.26949541757235,19.884021932365275,6.008397893435055,17.84563956221373,15.67962694665351,22.217976082177707,9.438137233632421,7.094896895702103,16.672081858414597,11.982084863784923,15.064090611696837,19.85769985974673,8.266267387586636,10.468232145570632,4.6715795425701145,25.79920664683746,7.985992010451283,9.758373386679827,6.351466729965594,17.174451514327927,6.406368109154887,27.2822451313678,8.457490575270338,6.042609634320939,16.565950670655695,5.107521817598253,11.5221877235057,14.548774906057798,13.674004939736776,21.694974385055126,5.964296909956982,17.02311220980736,19.49938307674255,20.28485927816186,22.165490130749383,16.25801685588383,20.654974232337345,17.226312864157958,11.248828579355632,4.205818195540926,16.926531207379234,13.847660291029293,14.099204694445778,7.409341340213982,8.791354721902689,13.552572534291492,16.416234665544554,0.07481995865456634,9.623868144414518,14.975828558739028,23.341508652966596,11.035137831585978,10.460959928758793,2.9265233212646216,21.427274250552184,27.290685894088007,20.746061747914695,7.259353254153077,17.902210002647934,22.13311585496094,15.588217717431675,17.82138895108981,18.94910509778997,21.050557607300988,5.226267879851217,12.207882833055546,10.02266752972471,14.260115388300688,18.723455690266636,19.760536698492924,17.837207619913624,22.653955562116764,18.2366473522615,16.051086063182602,4.351143619288672,12.688739412732538,10.908993925132158,13.709041853278862,8.049213775327285,6.833007191519379,10.506398834099322,16.24668275249478,21.170699684907074,5.934889902390619,9.392608166159844,16.445385121815093,22.63388430104035,8.86450817768279,20.984148190363406,12.496313318134675,17.47900267169975,18.19812538817027,17.5944609447372,8.832255338081922,9.645421208900505,19.543681597745554,16.356689992426055,16.986189305195776,14.84587413485888,17.343671810242082,3.718088165533131,8.352666402367882,14.251582148946243,7.739444155456632,24.05616580971996,25.168080619704085,4.390665256663567,12.96298809091502,20.42418487143531,22.680568774887583,16.364930306927704,5.967456789678291,11.009120333971907,10.475045495616133,16.280746130314697,18.819676623305746,15.634283568096205,15.633946143624701,11.329676299548513,9.008709599552375,12.98116170178577,11.113733745386906,20.327829492410075,9.28441721129294,9.041806611662782,13.51220727566955,8.883562345531148,12.975332847718375,16.547797861990983,15.046695209842378,14.089014404786377,11.166099504028239,5.826960169195567,16.86325539616061,7.8633727775092375,17.655743533147973,8.031468202372299,20.922706282295902,10.982295203106553,22.341287860368666,17.61949204891254,12.164027101135089,23.240883749478254,24.79288117268414,10.088175184157995,20.739617549809726,14.242969052520687,19.83137184523538,16.618211265385604,19.13786417311983,21.30052023056121,13.53571305785167,8.317475647584551,13.200881979893513,10.336413488558158,18.11113555280214,21.627612686507234,22.53203092002825,11.34179283802275,9.924508493701227,8.592082908404318,22.055648853982245,6.254026658309293,5.362311493208286,13.48269549788914,20.241356521246125,15.84728507296983,9.12826973490441,11.633850758752274,11.866890457948417,9.570609675328926,17.313070823819064,1.3369264684908575,6.717099562029342,12.704119004079963,14.312049819035906,12.137574686227076,9.053746995968213,8.872342635857644,15.889375800228107,22.5360354992034,18.392506849479517,12.123158391288662,22.25997077009189,17.365325601781777,16.63029114382133,20.681288289857434,14.25855094391623,23.780931679859407,16.090997506413196,28.010920253374543,21.67187195341923,18.35065421725624,21.614319243203834,25.053480960773218,26.121178940572776,15.628269465823987,20.758757180715303,11.232198384295094,16.759657653015726,23.202791831029057,6.653721819820051,15.871009297615466,6.251725786289631,9.394108858925721,11.56309046105277,19.019560643193152,16.144368627327246,11.563502892306364,18.187093404077807,16.345355376523028,11.631998545375499,8.854723349130476,21.462675739677273,3.898718556629338,13.199826255087288,21.137784538421748,7.74398627599452,16.914464791332993,5.767322117722773,1.5518789961001827,8.967545114474454,8.488463505963555,9.505000615186749,7.807632374755817,27.365052567760287,17.56207020729501,19.50836073519867,17.103518480922624,21.945117573124676,3.7776766977379466,15.740006970497728,19.067986291831076,17.24772990496661,17.77037634235001,19.20625356432017,6.44266346810705,27.084660163285932,17.43341295872609,20.24156667888004,18.881956054104055,16.330381611807198,14.705379765880082,23.542889833862606,24.918781271584525,23.4745378054154,21.432335795500173,17.255997658880595,10.090864321947999,19.94515310280307,20.480855872849833,21.13306542061582,6.512191436293394,17.38136417502762,23.196375735075673,10.058138529737139,8.024315146291219,25.12187061668429,12.420660733847935,20.44566327290364,21.068661611538584,14.133566511906121,7.70190204153119,10.139363594538825,10.884483062320118,21.13253235012873,5.641650170032304,4.931136448565294,15.807197534123294,28.121837174063597,20.17814505015004,22.739514282380245,17.529432250920348,12.513120092773264,4.598750681361402,6.682000674789382,11.46480871700216,12.389608735822236,22.521426020432184,11.732636586677087,17.623541979347912,9.849032273355395,7.500493108642033,9.24177965993016,4.066644842179592,16.046015485242854,12.875399426688485,22.169608955742767,12.530902201544627,11.269541376102932,14.294591224855047,16.691299814494236,14.795851885448457,7.38032312873875,8.725256561434517,18.224365987051,17.379564921723446,7.716283712302245,6.626178752924986,7.969465640365865,9.297044188391855,6.7547378673568454,4.196959761925987,10.700755291405065,22.91384661527097,2.554441889046081,11.023043024427881,7.642362452288544,15.839569377901896,5.4124734477605125,19.37211041082712,14.622141612189742,1.255208455921382,9.142580284044271,12.033484152490665,19.610590773141077,6.275290663333143,19.439698500546545,20.288737061749327,6.038371246618399,13.707000445393248,25.030990761585315,4.418901846837265,21.915302601855096,22.719688409326686,18.486644368939942,11.470754091393712,19.357757606546528,8.564863527822796,16.263490780035102,8.827732266077458,7.901473283453504,10.161102055814991,18.029517579413135,19.18455161293317,25.19331539413995,10.02306345392877,7.447225755470808,21.130872951438903,5.625826692896513,9.652518911325064,9.979088561475692,16.21598872891314,10.410707478368039,5.178387147443132,19.465284862564292,19.997782545643076,9.100160042394275,20.18776599828972,7.43048009242758,17.825620012491694,13.823409431340126,18.235143958380757,12.211435478538107,14.126924591893088,25.65584751711677,13.045193125821474,26.64163198431642,6.031690103666026,9.077761345740141,7.533959992698145,5.95961723709097,13.78480409252796,2.193720368093566,21.193652485646368,22.25590213360666,5.7737503183348275,16.404130797325585,13.141469445107045,15.4014916562414,6.755400295420724,14.677733263569316,16.265603584789986,19.60499505238315,23.455644774014527,10.586935390139566,25.860901703027295,5.815606451823958,6.4816431572507796,17.003725531509247,19.0059592688161,3.2301096135804825,12.787781430912172,24.032929454811043,22.986340765581016,25.41627280159374,9.667834300954134,9.606026030176391,10.11156470315618,20.71029094732912,13.74373709742232,18.63294706244404,22.41471964799816,20.280651027016905,21.464900267932215,14.641397971869946,17.044678021540243,7.730264076087723,15.360163259236984,23.71246431993604,21.473361722845134,15.469959015753211,7.886451231079446,6.640325775515939,7.125531003777789,23.129168426309008,12.936488678399705,5.610496651091721,18.607238872331717,16.286517825919034,15.52602358582411,16.946239422586164,5.064712762476763,12.724893801056682,9.280050296562745,20.17931650494497,7.077743595747391,8.093271324631338,17.72670181667653,1.7613342076654726,22.44935547106311,19.44219388198933,10.424971656971298,10.87918830938952,10.003992945592367,8.037101062994914,19.430301808804952,11.663168110932599,4.494644369598357,15.883649790972573,3.9185123587701614,11.377758800273938,16.263379839595355,23.56904976190915,8.158956545405168,12.330500956150484,22.685529422160144,15.215051767794261,19.83489553772885,10.888096551236098,8.198072385802945,18.73230566201415,22.243217663168515,8.914090856239747,24.001123889086095,19.092020780696412,20.22931384827265,9.681271332512011,14.852544710949374,4.64723666462635,7.166976282696231,3.5580528991522913,12.502950815962881,9.66616439861108,13.104313115122583,22.752689721590976,5.946128397228262,11.196762206450629,6.406885470536793,5.994445263021937,7.5830333988098015,11.337982302300059,8.825907225232248,25.68230054030426,13.641076854710626,16.09817789565091,16.128173547546716,8.77126064570541,26.036863951444822,16.638831991965958,22.688759954461112,19.464336143432682,9.308271945654985,16.12295614040751,2.744029014649458,10.864105117978948,13.995603950542929,16.49816824962997,8.85286731278505,15.478443483644,10.463916486891563,9.937389410582547,0.7360858017965001,6.373191161951793,23.30860441779852,8.286527058173448,16.911419357817984,21.325265721788696,8.78298094097163,24.079600344433175,7.232840030411821,23.5524320234971,8.719328057145136,11.802651006648576,22.9509641100142,18.754646292459782,6.180172962370256,10.90506435105084,16.80373977682696,11.54159253325786,20.222716180191014,16.385519209236335,6.331275933060328,12.398470993075492,15.417935113709103,12.383898137815766,22.530042558125317,17.58190116200641,9.318904804951568,13.492213847499857,13.400358436866995,20.879847832588744,13.764055073127505,9.672692088787732,23.055463949429406,11.895309097036797,3.4947133513067437,10.179362647331121,9.85769269811612,16.734015194354264,17.958261248010704,22.5864901985669,14.980901438752907,10.130375446259462,10.117474206334439,10.36467162344438,13.333008798894456,22.417061584860072,6.6250401983458245,17.10887083856164,9.251337492860978,18.151887928548973,3.3860367561681937,17.91326314550043,8.147569038225228,13.148330668990027,13.484874711120867,18.887797298764532,18.269514091676328,13.472212364914089,12.129599939468957,23.82120092694492,13.733499994260544,17.06573527999419,9.796501994045393,15.699715061362317,21.79253795794532,22.125810982742685,7.955280644384263,8.95739297211842,15.209060736969526,22.764684283222174,4.506247318035944,19.92514684640124,9.294766557763676,24.31233359517949,7.737681677620621,4.847095348083883,15.08128027309076,2.5787645584210144,17.924098542952166,3.9273170230066072,16.38564860333726,25.72832005060907,20.753606661569627,7.917246098827534,7.355770671944921,8.546585187905325,7.124517928133322,14.305975384706539,5.757466843611844,11.172568107981478,10.525447994379668,9.403513125912424,23.006825083977528,12.293077723940117,11.507212721499538,11.70821413173406,3.0571712286946413,3.97153577391138,7.093507393827801,11.425408045924168,26.121397421190526,16.997599186084095,19.798509261836028,21.937828649477346,15.349537088747436,11.503753969770681,21.3689418700319,12.245364882597876,12.282798038212007,13.782091309089077,10.766708898791089,11.581984876302698,22.055603593325415,14.26638137015214,22.272652218919514,9.122534344125974,19.737400861132947,11.60890051657236,14.786387228909698,17.866394697854616,12.874449869836145,17.339376100923268,5.619053944184056,25.649707333147738,19.63608965557512,11.681832166832613,21.97953964422809,10.109116310759582,17.382344287324017,22.907204515418343,26.71574700225085,17.787596269569466,25.690350220554027,21.465708701005724,16.752019657719217,18.393796528618893,5.639860264885183,12.050170912474956,17.638297898715823,3.8953215070853915,11.947527699088663,20.063780147301742,13.402987610629879,16.08018885264987,22.816772895585487,23.14487016948045,11.06657917434141,10.700485312763513,9.907926139481054,7.702339041921054,10.336899727727976,12.456037188917167,10.760170645305598,9.860846181077914,15.574662325900483,17.95086734003579,21.30180595525742,24.348996315493686,11.587786527323646,8.837577097654673,12.166397472862972,19.49093952066746,2.147457584250202,6.222890536077852,24.679282012753532,6.654555668154883,15.116683854810638,22.810421172829933,16.61216603457684,1.4323605898442102,2.2967176692673306,10.38399843939619,8.91711433076646,11.462638639291326,12.709631831618982,7.997673319560722,21.724803376291973,21.239902094027382,1.6499342499707275,22.100576785679344,10.460740419319617,22.757331574763306,25.862481149201535,22.40283463022486,17.3572214437392,21.283735038896634,18.650734627913344,20.19367705046072,19.3852244290611,9.77002364607426,7.704195040016762,5.030501082974647,8.890542553453042,19.701467537999545,23.40850938776067,8.117186699304423,13.858421994492653,21.588497598254875,7.649885980770998,9.565747879674941,20.99661227426037,21.038932488661032],"x":[0.5613080676760767,0.7911158837696062,0.004037261330000375,0.17892760855642242,0.8435187651427662,0.5508181300155719,0.8863544647770742,0.9088070551883356,0.564050410030158,0.09019295623505985,0.2636461327760349,0.5367075474281784,0.6620294395664603,0.2480054714060802,0.00746996249099019,0.3955047387093016,0.4858186320239155,0.7612477706882212,0.9479230077740506,0.12697733161898217,0.9755873062988591,0.8019664384372738,0.36368674153309644,0.1465991104729869,0.25388952761151273,0.9969680607658113,0.07174817570805758,0.8364796622239958,0.2644570213884432,0.8752661592450257,0.6832034167836913,0.4271249754718822,0.20702840226186026,0.8772244867037284,0.6899261554503091,0.5327324187998927,0.5984635604404751,0.8206331585743554,0.9250966040518458,0.4695872497732423,0.9993996826912857,0.28798082235500555,0.2997733965014526,0.04039743330746526,0.414117478277658,0.4948319110445245,0.44028791314648985,0.47912273934760874,0.17519481195227193,0.4626728165602987,0.2954681948630917,0.4593055263311909,0.4782198178163428,0.718079191084259,0.6015450696955233,0.9078902412087102,0.5439659947077093,0.06887200362300594,0.6500357881333707,0.5579132547892938,0.28873650352458813,0.5195408003147006,0.854395689717127,0.2659869364073011,0.495661789213965,0.2812446063997156,0.5465430927449357,0.20625741104363948,0.36170447574297104,0.9989928199415201,0.8872658707019452,0.21955229679310118,0.44904406110011874,0.48710585653053107,0.9020584185336715,0.16289671231759972,0.905514281635106,0.7196482472732164,0.16619644241236942,0.11567981811252714,0.019217323700882583,0.9811885938892357,0.6448393726508133,0.7614372070573567,0.019808807977490073,0.6607914426112609,0.045945090476214645,0.311645532069732,0.9603719013809702,0.5005768892780196,0.39709268637678874,0.5533605102256471,0.8069313088943046,0.7576669330131058,0.6063738257441427,0.7170771145991444,0.8234056529709388,0.7393604954403645,0.7135357580008355,0.2624796764944477,0.6976032707930702,0.2276164860541443,0.4990667459393108,0.924214442893301,0.7115550335337746,0.18068562043958236,0.2732525984468088,0.33682431389673484,0.7593280843966681,0.8685284108356055,0.42007049903308413,0.9694417353055242,0.33121437906857265,0.14124558787449293,0.3070205303697533,0.5596737010423551,0.8959479826834902,0.5580116530551602,0.0971874156891459,0.18533441339490553,0.7264089914884813,0.3634711000714381,0.3548699618023483,0.5610469500603485,0.5733018692938254,0.05402089611346694,0.2247798185680001,0.9631359314235433,0.9720256352528291,0.6071424729950625,0.8900697134122724,0.950139056462971,0.2250226784318634,0.8092834096606549,0.721276540998937,0.9076788392843504,0.13318914361319356,0.7406837531458523,0.4995186825798277,0.6824145964778228,0.7439742988233731,0.8392039513748069,0.12390795305510438,0.8646773527482863,0.6664930346055116,0.9887359685829633,0.09599623561028614,0.5484736907105987,0.7631374057872002,0.7473864497990994,0.1977189934742023,0.12612878532176186,0.5791150375180776,0.7243324779097173,0.40600805071040647,0.7826341444753044,0.09326695902473614,0.41635510715400326,0.48657787704947264,0.9391823793037335,0.7859180895875084,0.2671171760508839,0.8885967045296748,0.7854904068616073,0.003810789703534878,0.9701574705893166,0.4949773468025085,0.4839512321301409,0.6023497192597567,0.522300922015007,0.4081042126116208,0.10140882395495465,0.02629146704179508,0.8108087883607205,0.7088353414837605,0.9013940768158324,0.7771281866365356,0.787122217512414,0.8119170602135379,0.9064480641694641,0.7161291606562388,0.1026773555645295,0.4736711540875751,0.15988670296273422,0.919646469720226,0.3304717487293043,0.35696361879463057,0.2529559934628176,0.0648752387791025,0.30574475252371447,0.6259096308335295,0.8986469493102831,0.7954031090142313,0.19825664486153727,0.7913380808948958,0.40340767324732285,0.28730710646455027,0.22006014211159486,0.016649941304440086,0.3732994107264449,0.9141167151254495,0.30236295413688263,0.20474369561966066,0.40007433827158856,0.6948156975267685,0.6917828435209588,0.6479192590236962,0.9759784942755243,0.2651996755910977,0.05569831821270843,0.5027108306627459,0.649997367522853,0.8428352999775892,0.8795563091189935,0.25120414821879433,0.8810127010035911,0.6766718439138857,0.9805956362132453,0.4151139550894041,0.6050500437323858,0.8619457593562934,0.9652190926031003,0.8918728261499909,0.3945189096744839,0.025583148206699713,0.4417892862126711,0.03766813462749896,0.10286143790021707,0.014887915137745678,0.06196647872341887,0.7186734041232237,0.8097975023869863,0.836759543299683,0.004386455736489436,0.46741062840705405,0.3210788145447161,0.4957508998681057,0.30215992597626373,0.5725403359660892,0.7494592839557801,0.713705892132412,0.7636327036374875,0.25863776803746363,0.01878350550033514,0.6723605251429616,0.12181647636063997,0.1558552037797296,0.3059653616765803,0.014279219306591484,0.25666512660745644,0.2381139665353491,0.3065723351128111,0.7837819683054452,0.06193924184551092,0.9145453442296312,0.4056457934593709,0.878818274571314,0.8271036205127809,0.14625950495394902,0.7802664505726666,0.5155162529732493,0.27895329029590177,0.8223191360175885,0.2302029591400223,0.27973322403995304,0.30813549111117733,0.7862472526567241,0.49710317982222296,0.3233381197478902,0.5373928193727304,0.47656458219387043,0.06775622880400456,0.5891570860783439,0.9748336487562432,0.7148374172305141,0.4079761122659895,0.8068941072147333,0.5956356692089877,0.6503344680325955,0.4628960824243442,0.1080429175830917,0.9196645713052529,0.5137319357484134,0.7381202021648547,0.9074169845163131,0.5488350734805882,0.7322308852899497,0.1219838134306721,0.5685788693402272,0.909464846549302,0.791780854627075,0.9215185192206203,0.08405108821386209,0.9552098898261694,0.5300963536335264,0.4303536316336354,0.7616177392987158,0.864148434804332,0.18505240873369178,0.09332595313898406,0.5453049014668565,0.5310873048611162,0.7832866944018133,0.24101830028980786,0.3857094667426464,0.7820247195765915,0.10086482359199422,0.7698372879439714,0.6705954759902233,0.8618635374908898,0.11982966780349447,0.772929057150185,0.034080585982613876,0.5095741422241027,0.3230645822698095,0.12761366330588575,0.4479593611034023,0.994503881874431,0.1969834351128179,0.3788702045033854,0.7749184518744752,0.46123590283270044,0.37543974170005545,0.8662615024006448,0.033147840147520924,0.7472231955421023,0.08162222361678628,0.324498200534316,0.1661228872557612,0.8533272025521019,0.31964331019197356,0.35736374068660726,0.2031129445685107,0.8420416121193592,0.10554958607163245,0.2498017123926568,0.47401658316209927,0.7697140321943192,0.27169880449948813,0.41478489740313074,0.476882613230905,0.03919236221395317,0.6763359399427371,0.8899350224992748,0.42907656436685127,0.9905724394579674,0.9515117361660852,0.5584682988314271,0.21215165165737182,0.7338015652923988,0.7541998699698218,0.905305464681609,0.506107320676096,0.5796235170135031,0.7017339346017544,0.8779199577714432,0.03453196693519378,0.27191220168071406,0.2284843739044431,0.42964995778662485,0.0957602045483048,0.9630047735936058,0.6369433923055956,0.42180384488474965,0.577907025624145,0.4308464089311539,0.8969080932664775,0.8205285979657808,0.40028042599154645,0.8021667488289401,0.37306937347732694,0.9612698014642005,0.9354883595329888,0.47645701904173854,0.2682256718292928,0.1313938485353785,0.8852504011230842,0.8477271895788288,0.09178837539570428,0.21849516068731578,0.3517399282428264,0.5522060406619902,0.8637567387990881,0.809843509239963,0.9644095304289957,0.31365099575167,0.4504769652666021,0.6165627974648276,0.8236138245084401,0.34187382052092863,0.20775358169147284,0.6218363029120397,0.616131156860408,0.91607586557149,0.7950784958669597,0.517791026767064,0.5435733400296083,0.5415272100378912,0.2957736632254062,0.18740884727442797,0.11062052088136398,0.1501303073179332,0.8493861916260845,0.6361733009602637,0.3237582951153479,0.41606089803081336,0.9207497093995567,0.45460719247122383,0.3198056762436279,0.8123903489897553,0.60117283738945,0.8540905174620437,0.8660575824402832,0.08195054006247715,0.4914031726850565,0.23618388590075345,0.8077549397577362,0.8888531363120569,0.929847296795123,0.7862418228769699,0.5234716929394918,0.6335635651629252,0.4486840869956208,0.6430786866099716,0.7114063129951693,0.3079302487231099,0.07729307138706676,0.3592443069164546,0.1018278350034938,0.5288466604821955,0.4992538140955385,0.8887097651324052,0.8082816889284323,0.3684446166791453,0.6918790887121082,0.15024103752497275,0.12050139975838525,0.8763580600501453,0.1260748569321204,0.6672281443662875,0.07522950205802403,0.1790653992607696,0.5994582631388077,0.12021276705608774,0.7820900968823215,0.8605244025416625,0.9500839655750764,0.20017159920330774,0.5220597473904824,0.7158460554777812,0.33310996516431324,0.47563771295760815,0.20840740799332091,0.06200050048317429,0.8231394310038764,0.03412768006456446,0.16481971582120614,0.060322698533165964,0.8566596400410573,0.1900168213277349,0.8424834109106167,0.547339480778843,0.11452048427591999,0.5145242507112109,0.32134034797346,0.4636080183148086,0.45113767863290555,0.748473967237322,0.10458184959358507,0.21156000960898202,0.779625121950515,0.7802517785517551,0.9235548453712743,0.0961994230913994,0.5383514962635729,0.43196217315580987,0.35929410656521843,0.576329426218511,0.5917643015559468,0.251094614928141,0.9231974400222467,0.030284003444298824,0.0679611053006437,0.03875516782835997,0.06810097261306347,0.847689557755593,0.7692654494892952,0.4379892878650853,0.26023917666921914,0.6545197018872233,0.7708547888473898,0.12944066022258593,0.39428075796859763,0.9860467280964975,0.09363196245786987,0.4172753876571669,0.54997563731214,0.06930611067056547,0.5837996505778293,0.07490154026798224,0.32093056742201,0.5370941779202534,0.7338793957245218,0.15435231794955362,0.7480249667879593,0.14842524886867925,0.9434528362413914,0.5016280648476321,0.48017519733063363,0.2831171464026787,0.7616419167714046,0.5820276776962359,0.5956210976135436,0.24475311917334652,0.46260247849603564,0.4156919460342521,0.29812441866335737,0.6364275359627589,0.6973835262410424,0.602932487832448,0.2759033808222151,0.5009572838953733,0.7920938283763894,0.23217060952201862,0.4540009856445746,0.8596988810016772,0.6060040487109855,0.732285743539471,0.9265072450903782,0.96658360447198,0.46903984269455834,0.05162110920785157,0.7485880092473733,0.45735224997093393,0.8831493071483933,0.36883426336596314,0.3906502275024051,0.3172356649520538,0.4815616695560039,0.5282008424305182,0.36467772738128446,0.06388765103148764,0.6384809854767624,0.841571924051369,0.07142267205900965,0.39921373052273856,0.5820260505902333,0.7967865333781528,0.9324541981438932,0.813871539934288,0.11662090552801008,0.08478080781226494,0.3980789190422276,0.40592002474202227,0.8309560751321807,0.095312339478544,0.48307904572332294,0.43034847663334097,0.4958926636019092,0.4973009259077168,0.05819015440371578,0.04209681301783519,0.5613901561869161,0.056690421471983,0.2680992182357991,0.5346759101226546,0.9463240134621276,0.043712491739515746,0.7118336884951353,0.1201283769719006,0.9786729924798556,0.4189072821102837,0.28039717007742304,0.5773908217843178,0.4556973675476099,0.3261071264297002,0.3045313498058253,0.5934125709550346,0.814255584851423,0.6678874412234646,0.04156756082613855,0.22278918824787652,0.9185748680576147,0.5744449289815328,0.5925104707192952,0.6734924945316751,0.48646730857576226,0.12872918461935545,0.4875746674337502,0.6845416779649078,0.9936913122338908,0.9493297736216189,0.1510479910044733,0.40875487391180676,0.8166773165714196,0.8700406183777099,0.1595789295068344,0.5678769716985268,0.0803828103133628,0.8582631572305419,0.6605008452859811,0.42910600627795903,0.2877558432272507,0.7769745587334782,0.3137398545683432,0.08135424468118191,0.04408748316536082,0.44960684386335625,0.4466172634157821,0.2375297669320653,0.5357355618302915,0.4783482457539616,0.35950240644867426,0.9968092490418641,0.13520864059548798,0.48348135490751964,0.739726557543126,0.9312985184549487,0.8392411900426398,0.642421829416348,0.3826844348439793,0.6319139078434268,0.876237926101433,0.5646707543692824,0.6319804332584611,0.5544213805875537,0.19762204784184623,0.6574157059971761,0.386848580209018,0.2788793154171756,0.44398998846937454,0.47998820040534795,0.2302586167957199,0.4471864906228873,0.7520259108616836,0.5714209528618723,0.7045140182899401,0.8693131075023985,0.5960101656508139,0.6220367938613558,0.026414172404302327,0.4102358212149313,0.18696075674181345,0.35582399899050254,0.2938199084187145,0.004744499539120817,0.2464093052707561,0.18448806303057808,0.31292395749237967,0.09971777283681704,0.9010755852130574,0.9072543340890233,0.6378662490309823,0.033833230315422735,0.20809226050227436,0.18647340065113305,0.9937810705405019,0.36064330720813786,0.9996844728066654,8.318574252563771e-5,0.6227572797642087,0.24612068518129915,0.1261175202797271,0.34214960758092294,0.38011800142668917,0.3260161508839401,0.8985112681805605,0.5043829477969606,0.7336819807898514,0.13598128988672942,0.29208806894895334,0.3650513605647705,0.6759912650494875,0.33949066129903294,0.9968448725341363,0.864220583997642,0.5828807421576532,0.15578231622356098,0.18089304995582944,0.2835130944545481,0.7697098705164387,0.9652149373230892,0.10198510211625433,0.4054554313373493,0.402280056736688,0.9090490018707,0.6427142353687185,0.10119955183604845,0.10432024252719097,0.923884782800672,0.7309155917964438,0.5138465615225434,0.007595851226377626,0.7556221890890749,0.9668240937494705,0.0015509325587108602,0.9090582796837048,0.3124481188133863,0.22835790274015455,0.8226487623973349,0.19347272519404757,0.6921045576659368,0.4977678159713894,0.8881953893138785,0.2536263167420887,0.6570352494682092,0.7722879651958978,0.5410301689085937,0.612174190378094,0.6784733021463307,0.3733275097402293,0.7900819716108907,0.6400746365051881,0.2431679275092158,0.8624659193136888,0.10168249564581777,0.07081346659165555,0.876190812401975,0.562526197216741,0.6595285526881982,0.21941271686169306,0.1801010222741044,0.4523682646632088,0.9691893051227667,0.3473900272375474,0.26462685554997867,0.1892928228088242,0.27131441915860965,0.628225884337124,0.9484559975893305,0.7181321972621963,0.5537510344569223,0.6278956330821568,0.5184157043589028,0.19843521692627086,0.3314742303164442,0.6304785227257095,0.29230491753978693,0.41278950883212495,0.4946024110973517,0.6466466909307509,0.6357451449586735,0.3175065637846255,0.5026280550561308,0.22095706671145932,0.9775665310805355,0.2321109568421047,0.21274221554165962,0.6557803952860244,0.2903972295001862,0.5400054056860899,0.9830993217407709,0.9185467109775058,0.14925311836079613,0.39053634465132947,0.23936763312567977,0.5984660745709127,0.07110261670488893,0.0033649549844680937,0.34361920798488543,0.09784939104088153,0.3787445536123675,0.14522346066419378,0.4136208383268811,0.9139063555465186,0.15609898476018547,0.7412439205233878,0.8776564824638606,0.6853977400657401,0.7066722688525919,0.4595369503363125,0.3251249454882028,0.10826040513836532,0.7888976752101262,0.8828164606439144,0.8171259433369331,0.998718567475608,0.1909887053223911,0.9989170760649444,0.12345478383449637,0.4805226648343839,0.8143883009735475,0.8835216009485949,0.8486868595828356,0.4503769607319017,0.23191766258377666,0.738078597137904,0.7070406190925087,0.5715708675570128,0.7948906927763237,0.46622028742787314,0.9727451771786857,0.5293021358267345,0.40860681964005696,0.2912589357269013,0.08806510869750683,0.805957394263366,0.8297356651209635,0.273723283670962,0.4696396890128893,0.18292588083145356,0.5582717625995068,0.8936999748497991,0.6788556406431911,0.03356497387098445,0.01475281303891629,0.5405578556884552,0.7887737342078514,0.2855481806068556,0.40032643504462184,0.3387284263989492,0.3451676391786722,0.7196617025870784,0.13149719073816257,0.9232986326231298,0.8926863862738057,0.16549475178059225,0.9815039234089178,0.9039975306087242,0.9272535258516137,0.7936688172980897,0.6460635968976829,0.15577020051643897,0.5423751819489973,0.8416439900933448,0.5998282761874807,0.25041279146063533,0.2357958634587014,0.18378850104088973,0.5231865160404203,0.7938650428799296,0.938487820954077,0.5624606033552959,0.4091313518778068,0.07538705168519733,0.19314162108495414,0.172983974357366,0.1666828717107136,0.37801312327391945,0.8171484455900133,0.6777811483677196,0.8043864768393119,0.5491027826952581,0.9184496046866051,0.8893995978684255,0.32403920159157007,0.05290461054789719,0.5890509799904824,0.6822121999026656,0.3984128409456065,0.2554777162952009,0.6031529461981155,0.8577687395891311,0.6943647723886983,0.6632957550305925,0.19586045703343458,0.5745173490453785,0.6382675279048104,0.7000072036699923,0.18537879402625257,0.8591279860818748,0.4197162740203131,0.21793776435902434,0.10663143606186543,0.6946756938881034,0.141101177060452,0.9608092533041943,0.5031326658332775,0.14755330620959461,0.4010228863211285,0.1426921212905743,0.6154659810948377,0.71921559208005,0.35196659044612466,0.9175973080086761,0.08828772958665865,0.18373779211560248,0.5830592049382968,0.8113479828199417,0.5670033194696225,0.13751739775573668,0.9907423334730039,0.2865162830212822,0.05414279899863583,0.1035824969273742,0.52398051540437,0.7088612570370665,0.42687470593192467,0.7722991241129855,0.16209561966593222,0.5269529277919851,0.08154186374649619,0.28297728914955766,0.5356596742426634,0.4589762826529187,0.8714854389300521,0.13091173870802786,0.7915180453444481,0.5662961365644092,0.09700325499464313,0.5652604631751272,0.7605909152265657,0.036332059504932124,0.5615410058896682,0.2333420282650729,0.7522889154817718,0.9268403766360518,0.38726078830234356,0.6171199350468799,0.051224256935960444,0.4696647195745034,0.9939712685434472,0.4433194175283164,0.37070571702623956,0.2986969907548154,0.4723861906870004,0.41154193006913564,0.818401385321752,0.810447693522016,0.27915985496435813,0.219556798363592,0.21231520255249348,0.8441219846116914,0.010746758130467438,0.720965706510658,0.48524181172652625,0.7131078485928202,0.08328303886005939,0.10681568609718695,0.8234193242555383,0.8774076367514745,0.7767415064341621,0.25729276471658924,0.32956349045403344,0.5918233770359229,0.3361830380299231,0.41262029278533885,0.1322527216965217,0.5781380966040617,0.002814273018101776,0.46961212078139325,0.8438750408904014,0.17443435440906385,0.41664066392530286,0.22539453266793896,0.8732521186877236,0.8964445186834544,0.03573916986239056,0.18765026806703755,0.7750532724431196,0.13901530594950784,0.38547806201362844,0.0614084163338664,0.20020668918676243,0.05535435814900258,0.38088240040876786,0.11375455013088653,0.08572335836500944,0.7026503819056902,0.9805153314020856,0.7512211345676905,0.36104971629700944,0.7325923679633335,0.3492279324145613,0.21153896070816214,0.6442681845768166,0.504206108220111,0.4288569258508186,0.21946226163319138,0.5776378318180189,0.6102911201209786,0.959182594101476,0.4255412170814581,0.9173180721963909,0.7681767041055991,0.332745650882303,0.6265714587169413,0.19531072786749948,0.06348892455173116,0.24548238897722174,0.7391530400397923,0.5099723735712571,0.5187548213298108,0.4368177100025177,0.9897772982466608,0.9552251560877749,0.682940767878339,0.18829242206620367,0.5160502644080718,0.5113216584281717,0.7093875568822892,0.4246369257304361,0.7400602829197249,0.8746740267900954,0.9513726819694479,0.5363002506973717,0.06759116289198053,0.3817044648814363,0.7113936745406737,0.6029629960693832],"b":[56.63733041068375,32.171777709378226,54.170711130822454,8.30696330438077,25.914890085183753,19.42576396824794,30.04463117146488,27.371967782674417,47.538059186436904,21.980262533635717,28.23850789978735,31.671058254682144,14.531362034027854,42.484978070518274,57.09665529636091,37.76173112852729,22.452063356565922,30.941780180312307,33.8698826701279,47.80287507597251,39.54725275086176,17.373209111985183,32.207585738956276,35.10396175550358,34.74879139176211,50.525316046017714,17.926302801427262,49.30877187453906,32.53298482331675,7.735141553198042,28.494413319841577,18.914540101859288,45.17800315453369,22.136948785593603,7.584192861387873,47.19497612474382,21.711413990273,1.1980932933989141,49.37094811173745,11.086332494556386,52.27645020964666,27.165813417751956,51.69304941189455,4.443062758553924,2.7892401477119444,42.49690611787352,46.941490733239014,37.05477279977274,1.5204784530862403,25.522804888651503,4.584195522942216,40.95929733563833,17.6325752146572,31.621992413580816,48.18613069485855,24.910760258064386,25.748139691805132,21.220867848034437,15.009516695214495,15.576177658251602,11.069997383695975,34.478507001912305,27.546481281101805,44.451860676654576,25.67518667758117,28.022480798437535,22.147798860079767,27.78444459745841,21.363996048668888,56.49027285887043,36.79543343690936,22.190308763575707,33.715492454831754,23.44708404045455,20.439887419360264,33.57276459733183,16.58540321618065,34.325234509668064,43.27922470279404,38.62465679743855,37.40959755968277,41.67979209164271,41.66226187014509,29.23017544024995,29.07492769879206,31.654440013696036,27.1625446990931,44.71915355216195,54.79914506836276,17.676892438487194,43.24097615925018,43.93292955780947,48.553745165954155,41.702463122334294,35.861054294779,18.928640184111604,43.16102068916306,23.48390260445015,33.45721931774722,34.77623311605057,32.47032257205402,41.2660234839703,44.32041963791822,37.17834364224262,16.486803993927595,36.27430909930827,14.134434057674085,52.599005709627754,11.985107039689087,47.80733590134617,23.663394381352532,20.605388736355398,19.642586361454466,40.675135663030346,36.943815078208274,9.718791229964987,53.0325756207364,19.635921521493188,44.007749204157214,42.932261676617046,36.937868122309126,19.628483728474222,29.72240377188522,27.883657272074046,13.257483106619677,34.207295566935464,33.63087752530881,34.60263902862249,52.066965767725456,38.977571124403795,37.813761715320595,30.959325434702045,21.348719737831154,27.080271251857162,49.84637968269415,42.481757962741426,34.803047660110586,13.030709073127023,37.26918942789967,13.802453734006527,52.81024676679399,19.7731187036924,30.853356099168817,22.54336172257478,32.10569954964133,29.235644172077848,21.093985889841548,31.59857290131608,38.931281984049456,49.17817515634188,23.330608824810565,22.157462027515052,50.169778704549934,21.986046198222287,25.972048434636562,24.624110382534564,25.309832249934907,9.269456382509066,11.875478844588013,16.991577982188446,26.77124723375428,23.60362700318423,34.32982932916691,13.935134426173672,11.08605405266584,36.32515471010538,32.607399539544204,44.82120057165778,31.913036885321496,12.90389093498157,29.47311469363515,45.80394246892299,35.35280096129474,29.99907624086934,41.24264289152663,34.688390802276906,42.63896998983601,26.738614322919375,37.952876153864125,29.850244056978518,47.11599183086852,40.19990786705176,36.77980951196233,14.700440255964665,43.53115257352682,34.22701222382173,8.222897130038106,18.05585581313828,24.246816932921114,43.99004961919424,41.92782024763342,16.785093178065573,35.16613551395638,41.17829177185807,47.59557550006999,33.729668995702205,18.629051910877024,36.17955940292353,16.65012402184802,20.163763426311107,29.62684467034467,12.933849321718238,50.144396723949725,26.14753018222349,13.031230607963874,23.665973775947908,55.285136103400134,43.04687761486669,10.525715953308236,27.200891218635114,35.80670122707555,16.82440398169694,11.75489165061185,26.376409375023666,38.45222422038777,30.736058268877308,8.739179948332172,14.93305954532258,14.711597765681855,27.416591578260245,51.487293345584945,4.440551849891885,31.564377107008973,39.75055445240632,23.575431875471423,40.80499643994666,20.164480001256344,12.576878331298236,28.748669278512327,18.678238138715543,33.23761465050052,18.453194809127076,27.970438036548078,15.613451894862195,54.614856306816804,49.481949130139924,42.02283872257876,20.22756606687777,10.586987588599435,24.290706646538617,30.068285372034964,29.940292375465503,14.949757415906246,38.042672805903536,14.264976742359309,12.700549883328396,29.14586235712854,36.78152312863779,32.64388571421003,39.71126624943682,48.0695250215281,26.526922624598722,8.617505381931219,12.839208831177924,19.778461278523718,1.6101062629349583,45.93582144546909,32.558863306013855,21.374700972669647,5.669598880132662,7.3686021544624,34.075675544178964,39.91447762633864,48.89157213982425,25.324462983153268,15.925851081855704,40.41946219062616,31.64519377448419,6.8905136235465525,30.230398863575,34.55379396827051,41.08417541176162,23.5385539089052,47.07475270265005,9.249047485200318,9.423822139691298,38.28588359116235,45.13614708847872,3.4964879148594363,45.590234321853295,38.48193704724363,56.02178644745764,22.430793982872082,36.16437871431778,28.482970579381803,16.465435432529524,43.32160912017638,35.68865488477856,37.18058329448917,31.043377632216213,32.98088151393914,30.91921173850126,39.767612981004916,22.726299957370443,20.23092821397348,46.36969420870902,47.187984957673805,6.7986199397267955,52.95672648191926,35.996989572420574,44.049226281739756,28.988142131795676,53.139537043756775,34.08682522035178,36.571676031938495,36.57796462581805,26.646088829676536,25.11453055394555,41.54895439880246,29.384729436051988,35.25074501201419,45.14638672885367,17.10238256184698,25.8033144157633,27.209316495057546,26.82491381836258,13.746433117731835,30.90423595486125,19.358250896240992,18.33998966652083,42.40562910280018,46.87136964909406,31.955514140380277,13.580470520096162,42.7690589837693,38.17118233491376,33.15300817929864,42.9529136591822,22.902332191551004,32.49085465514164,15.466080388414266,50.1393761699062,29.348928651904178,37.38297166942357,24.040517466116476,48.11726172912657,23.752517652859353,58.73406232416947,34.810386141991216,25.218558212016465,38.483965059135755,19.92540159791565,26.288771930377916,21.041322070762995,29.397375180672135,45.113613477719255,9.686969870392028,19.58421672521404,47.88361463790618,40.247027184712636,47.3917676659896,35.51479880248658,33.1067180981742,40.47187468704746,27.563892559410135,6.953362368658418,47.978112957308575,44.60354844600897,42.36252865933609,22.15701465632507,14.175627911670245,34.84983174127356,23.00810157910968,0.2087742566420614,38.45414877579333,29.431791118886878,50.060630558862655,32.73759692465684,36.90765363004566,7.114578117012256,32.81222784969184,54.63065578460612,25.803789927956082,22.700736921899747,37.292557092647556,53.2880779715469,32.883820131091184,24.03781200309845,28.40526593734264,27.586072318645495,12.017970588627396,35.956832977702376,29.05070601938107,26.233862373626224,43.48006510327102,30.46706164111887,33.66416817726475,51.43031689503002,45.27721589897819,34.84229096558316,5.765948527578613,23.390174794617295,13.692946542290874,27.816807869841,37.84072153320251,8.92732001426143,29.52465256902814,22.04440018150703,34.136027503859225,13.350461704726033,20.243743835005333,27.605235624475174,34.56274085590494,15.24468483107476,40.97114901321999,38.50040333287119,47.24220402701958,41.18683132701051,42.62845471803739,22.535122131297207,29.212746010587814,40.10437675676005,17.98663709075791,34.67646042237047,28.78465374863449,47.20732388504675,13.829381313674851,23.097202227559386,15.227674348745417,29.324865356859547,44.036080869404195,46.58878500847539,17.067620027160682,37.1672852599741,43.17681304019005,48.8404500357237,43.796845869288546,24.007471159282,25.91361363859373,26.544352843651023,23.928918454585457,23.11034432739011,17.515863424035892,23.355534535777288,15.212986990029282,12.826555247519611,41.91091488765895,14.528502594843959,32.91076415552961,34.30690025722447,32.85771565385162,36.42235825196782,28.21058273934364,17.52723953881427,21.415309058056096,16.778867681129007,43.62462704129829,30.495910758337274,8.377768130028445,40.05653319014942,12.186616516150588,48.58077776786799,15.40690808423891,26.129874403132845,40.483129070266756,39.16193391315801,41.627562840825206,14.500048299914518,38.00286321415295,52.45947304316546,14.11515499517873,27.389491996776478,41.63688838015826,21.469588269434617,21.128209161002722,42.91990177122165,41.677975764247705,19.06142769355656,27.522631859416435,30.944121822236156,25.984993289345205,41.83048450890816,45.17469610424219,48.94272662330821,22.092701085724254,17.355099423774348,37.78529446500563,49.74520085564771,18.902706110552895,5.492699940965413,26.06368005802464,46.524362731100624,18.701225398860743,10.71430497183521,26.650800327971996,22.41781998341999,16.764683067922977,38.10419187379958,5.190239467003024,8.743057947923676,33.61893906236051,44.606925194247886,29.26651167250651,23.86565374471661,19.688175692671948,37.71414934901928,32.02721888049958,36.846011079000654,32.12091975515567,50.74913040729959,39.72124229827564,38.96009319977482,36.19685538042128,14.691157819603564,46.45151046848753,30.511375572454202,59.171715553688635,30.35319576642754,19.589943986168755,30.257762569445696,44.87010267968023,55.80010953779526,16.723748691241354,29.615411971282114,21.63835431330206,32.92233440881667,39.05343793226992,17.843405653541634,28.959684319417644,20.393249567287604,20.430440966451183,24.84152843200072,30.455554388819905,24.865348487858796,32.24723437107096,23.942651770446467,33.22267910126366,24.631623566218867,20.073476961015967,44.2614622438787,16.297767626088913,39.09887077629557,43.503480585960425,14.292849172051532,45.88912985595563,23.06159692959526,5.748838598004857,13.17373906207678,27.817245798196907,38.69771716820021,21.884693593580124,57.14999757894376,35.8829937821683,44.07152317133849,37.95718680973431,45.49438218463802,17.760752665200574,35.68395806422461,47.97797261050252,28.074022143228618,29.494347171504103,45.99304321058931,12.32591136575023,56.874144504640746,28.741357044943335,32.848767523468275,44.64791311256404,24.289130463199896,33.340002668853785,40.252638505018055,45.111787050515446,42.83836112193711,37.939113830796146,43.783058001844736,19.529356588645697,37.65378147669165,23.749513310518346,48.32431540263481,13.748957002175931,41.71495330501358,36.609449684665556,14.361465570268294,19.38361609187361,56.171017276235474,19.37595960873829,45.5341468173475,28.948719140121515,35.24879532858302,13.344332267356634,32.4555583995748,28.01511866599279,31.667356560484915,12.135181911996682,21.604385294483347,46.06216596967133,59.20363259251511,42.70784252876834,34.5563590813392,28.534746544231115,33.337144551493665,8.278736814154914,13.531454903784063,23.381769244593556,30.945274415929376,37.41089560025135,20.414446154783196,40.390418033066915,12.732761349740565,16.194261826826644,28.602048454312087,5.029065399139627,29.11461269631732,22.09584814817235,52.23587407414759,39.748576224912156,23.167779976612024,33.6743956671955,44.16252632498449,46.251461549260455,14.835915552399236,26.746916632590917,35.98471877486009,33.536446785827174,11.77599946373971,7.911695479112617,20.79924382403473,22.71078481729967,30.247867373287143,8.489794114975222,16.946055414829367,47.916074534582876,2.6174775432254593,18.681829639215984,28.057531966361022,25.744596440159434,24.055743944959602,26.436247175103716,37.828401209371194,4.770242988979261,31.321055652679743,29.70605407941238,26.963325803160046,14.38896758699395,48.023124520755054,32.77261609017692,22.34431090877858,45.02856720243232,51.302059585662604,8.437556030350128,43.48566352027661,46.37840934506603,28.085404909142817,30.734530323827272,33.48288593390887,10.877717759554342,45.4083581871865,37.03401938636218,35.20130061786531,10.278586666557686,28.901252225940226,29.556141661733534,52.987268021846724,19.299254742123363,27.43975347753567,43.04876539798926,6.3260882437460975,35.79999909485996,22.87468686067284,38.880162092869575,40.506116688823575,12.611243087422537,29.72962760327573,28.683435638894757,25.788715226548696,39.50362371136353,9.621231201638022,44.15247610730438,24.471300493925952,20.61583880886858,20.07583563583288,38.88570878367705,52.095744321397106,43.44853360244892,55.57409883760734,14.538314702937889,20.41235174879941,15.776121169738847,14.121853630783342,35.789092265516736,7.9008174830049605,43.685992186351434,47.77432216865822,15.395769837161865,46.34202975009043,38.32045953592514,33.46770786127263,14.36154013408629,41.40253851808736,31.45041756938919,34.432115055124605,50.86252504815296,25.428602474014724,56.78333898929378,23.216698491968444,7.240232832547524,46.612394969487454,32.69055370011624,14.297297352490856,19.143484320150947,41.87346741168282,42.251739549536964,46.056839361963796,24.316921838710368,37.82872174371987,21.970777266361566,25.471234228165365,19.828411754218926,20.712930630326333,52.39081826456774,26.577402610227583,38.6312728590177,43.938923685195455,38.85084699851334,29.544781577305233,42.99527756064654,52.04222533718283,37.75570630708586,43.616123970246896,14.685654016323983,30.521129817750737,11.139213644806496,43.67364414617138,29.681143190217792,11.179424183466296,47.96618500647821,28.742982044544952,26.7558616688136,37.63681951104855,7.840880304953002,27.424491523938144,20.942397249390275,43.68332161204236,22.2502856583797,24.661069101759992,33.64691099125014,2.055433523808161,51.86553006265832,43.81904745967346,33.85716151467598,32.54501865778382,34.535387521524434,34.447966867874804,26.5819429847633,20.506683046710876,15.4714856719822,41.24678800764262,7.0720594047557395,21.822969289604366,18.215316488797207,43.31604315379782,27.400387607017272,31.370113289886913,47.998394612647694,44.07113742128875,43.3106689284264,41.08465151234797,12.593063949613024,28.32692470005808,42.3502874962999,10.47779772739406,42.09137049847112,42.90602445842004,43.7202804060161,20.095845400739577,33.772759169753876,18.809367664315655,24.618476529163168,6.550201132564597,38.614329390881224,31.34336994524106,32.67835377043856,51.71982330256175,19.11624283408201,34.330326816648174,27.36357485062645,12.246290520054375,26.487341606217,41.63445937091921,25.779463621153425,54.427878553729954,27.7536790123363,18.93269360826368,36.73010060026569,23.78581214653688,49.25974669051885,32.70029352650365,43.8639381654598,46.67124659548968,21.34501968239752,41.353320785814496,7.43604397362827,26.375466814929318,40.41472771364228,27.380752458732577,17.843171531345156,22.514031745129735,15.858760909777061,35.15522955958135,3.3107341620828956,27.23806387430187,37.51550980970843,33.94865622592556,34.17702738870008,36.88750023805407,21.879012843149717,51.704768284372165,9.193955769280864,46.5580864345162,9.67265430871262,27.03469468794542,34.541462131482675,47.727381579618864,16.72462936753339,27.876569445250183,28.240700499626307,21.840680817250405,46.60196855270618,31.770090920237358,8.089649814688883,23.632609430480404,28.35209316734834,33.60388100743451,37.21168054752057,30.133900925593828,9.870545572287922,16.352529950843202,13.688884028786754,48.97813934056331,27.358806712605922,38.82505686663974,36.59921215280445,25.91174012923577,12.194871671925709,33.52536081354413,14.923013093905876,26.612497818504792,46.75781006707678,42.83178528974139,18.475407223709635,33.3825874587794,14.505011375601672,39.376255452594606,25.842201337275455,37.13077309574394,14.903449680200534,44.73643605630105,37.4845802651722,47.01068590731096,8.120201091880297,37.73767303117263,35.72063784396824,36.56081878887656,22.024619153614722,49.82224684985138,43.90300487852327,31.04771117734071,22.642285490596578,39.39085227657742,44.28954406246435,36.76673435883373,35.62167145725697,22.734617494670573,30.386812221003808,37.26829425432484,24.40769504670921,28.68014702052402,33.8728870756054,33.84364743856669,14.010859556394667,42.5173723052567,25.056084172363136,54.7701273317263,33.44790698699734,7.972795617277946,32.38560121650444,5.234855748107905,39.72229929474035,12.21000252788022,18.434400237929943,53.592791310733766,37.74024188171202,24.40018651247181,30.26540869515268,30.57729246037938,18.426042834109015,34.246700487135726,8.887802159548425,14.61810661444157,39.0195143461486,29.40074029318834,37.52255389119204,23.887660864447675,13.309660508762473,35.29630692367703,3.4984672786661397,6.007374502326317,18.9563903748482,35.39560978610949,55.53816445114029,39.7439416472496,28.5378570313734,38.34824112491829,28.791870234843326,22.564958105282322,27.81149135744927,27.406464489137917,34.13342019696435,25.193117595038178,33.71905099385671,14.848769461673736,30.244405071082145,21.90683849644362,37.75968421324306,10.959456714451669,46.24019475226847,32.8565499781424,23.682183612983813,37.66065215872765,35.02189549625389,48.054671865893866,11.588460206507651,51.11831257808109,23.806689758401724,32.039769368279295,32.775420641516895,23.445445094440306,44.29420391992503,37.211702715165,57.61864565025027,43.26294931515949,49.74222854573897,37.7890776384568,35.48559475293007,29.894316457373588,7.678435607605865,18.927206825379358,35.35327825626358,5.459082913695621,39.460711504863674,21.67672488918044,41.36994809414059,37.89689052386214,43.417715791663944,48.57307281084055,17.133228217658214,27.574668485099167,15.926382994237981,21.77154479657704,34.43334015688163,37.12872048072855,35.67601159242526,10.637587154369212,38.86134292142101,37.37452922419727,52.24870282948876,48.77388584728118,12.364692776210426,17.774874007584916,31.65631311786965,42.00382553792676,2.2907316724419458,19.338201653529453,43.03940884771746,20.359500350877234,45.06681434112228,43.858599645888376,25.578303400279985,2.9843059282439377,3.233195064205252,35.36605825870574,34.57688784449866,20.343489168924936,36.41542678363153,22.85156541185619,33.305941308567334,32.190724290715,5.978503455868616,41.550382225169756,21.769009448399977,52.971971370127186,53.016612434211055,53.446932304704234,25.683963478397192,30.090017800166414,46.76733214256949,23.634587131734975,33.53148558596587,23.49182187037776,22.54486407885541,14.186820641036682,35.869911311601086,26.439078369309666,36.883316208503864,10.837542876111366,21.75288161341812,27.684864158193555,15.879258368798288,26.721240143714073,50.9315364103919,42.06598676728619],"a":[18.552728301845107,19.468390630316055,14.594354608793072,0.7596352868832801,5.538786520046717,6.56312423589632,9.638738129662347,11.27255555670294,17.621868867871587,11.958419574833554,16.913294533666708,17.155239307158606,9.712877815276183,15.700843606254411,18.910440112710223,15.063851507665987,5.244340495927031,12.48936966319289,18.60162336998417,9.150858823606942,8.59123918404396,5.294601837824371,17.015105679271837,1.0426827273664063,3.4772533385375803,17.803810297089505,3.638849886509319,13.145026247234878,17.69838752035788,6.518111496383461,4.28088082838054,4.380547035054567,14.506355428589423,6.299833140705897,5.3868731126404334,19.090997133591394,16.790481143325596,0.7681531885933168,14.87585133577456,6.021290637757337,19.849413181543994,3.387918248881263,18.08215715095325,3.9072447716553738,0.7051009689705134,16.13275866400699,14.660675568112445,3.7603112895059754,0.03430505385813465,3.9434339126528384,0.7998901444894235,2.6656194564826707,12.733205222925829,12.761980771788654,18.0475327257763,6.962086371378966,6.474848737162797,6.262841482006767,9.885219989242735,4.308552813088875,9.54052057253664,18.184157858084614,18.787098654894557,12.681735641657358,12.162401671460561,5.171623017728217,5.8496133346288115,4.870800657958796,12.840741580874386,18.24003875479761,17.540725486676422,2.449631329225186,13.444311450247582,1.0948676049736505,4.016501158258365,12.818425118688141,11.842951144658889,12.357190961497269,15.170462811035893,18.80214014644006,0.6132366130212086,13.940396486544469,18.67079419376526,3.415622653481676,11.32424749622655,16.80333379625821,3.2317790593856133,14.832352782660458,18.071724524923056,4.554217548910171,10.136103725025375,16.36779927468155,11.92339049546112,12.36588683130988,14.419829144436047,16.603242433212596,7.012442585240035,3.361308138516028,17.757113864343907,4.204238932717268,9.68750786433214,6.672386580925056,4.612968789305931,1.4574576051418031,2.7408610867355243,0.772307742199505,7.091556567907014,15.769904577227884,11.658038223363585,17.11732847102064,15.313791868309021,3.6038626547037955,7.652832848519138,12.753575602624444,1.284580864171212,9.357994881614724,17.90650974689074,19.006285687837337,14.830002387924717,17.20604572464702,8.572441121774371,18.50012559652892,19.25129213442371,18.37846406383218,4.799905863250493,4.788734697556221,7.391414103015035,9.24195321573646,15.013449139591692,5.091061263348156,0.08677670138355076,16.813915855740895,11.039413930399608,6.550951019386053,16.01275816320914,9.015618413112975,3.1824131650681187,2.7834595177999155,6.116994875694117,12.7119867336739,13.986621496964759,9.82077736753964,13.492761664842746,6.473841164253695,12.143802649246727,14.612969546293249,17.10622952943863,19.897957078895715,8.672724048550222,9.292129684106293,14.982963885939707,14.590646144895235,10.988051518451831,6.033268238197076,14.971216577117637,8.737964386314726,11.540625728153833,0.364075385038265,7.730590424996655,2.706533309705952,15.712611238651544,13.615064249468954,18.93113044071923,2.4823605210356536,4.5981705986533195,17.871770494098268,15.455248247861375,8.876743650513301,10.034709771274786,10.709932680889942,16.122834254567742,13.484708195057046,3.009435352908598,10.72171089562858,4.465572346886306,11.126995895524892,12.046173728942788,15.612782458610873,19.972559238960905,17.26239144217548,9.239722384658688,4.213314573940341,12.06978936506086,2.8488200876832925,14.553369190121842,9.998813000827024,3.868804469963618,4.2477571562144245,18.52338919226881,15.679818359019052,14.775582442197557,15.749313109970275,17.155369959423798,10.27555921597835,18.037086848939463,3.6508929171720217,5.805751979585745,14.800208916831096,7.330343561602595,18.04566699730986,14.53717827637442,11.619567274051494,10.306285464430598,0.7709708930475179,10.84965398790176,18.612241250372954,18.21127260476573,19.85966690105826,4.7644350135522595,8.386992025527519,0.13479350206932583,9.597148261542664,5.09709845622484,12.027971540174098,3.5840585098644073,10.05422423891018,1.8144664746673467,8.17837060615564,5.794078085645924,7.061408876766659,19.03617910796936,2.6900915826010108,2.789729477355829,8.93699736293399,2.853642712292035,10.302106126583531,2.5312086686721003,7.406791889427762,3.913889718979422,17.867308061068176,19.362054362273717,8.599864323784523,9.992530523720351,2.782909659200432,14.788444199888712,13.768184077854567,2.9743362896820447,5.162844171017427,3.0798020947874427,16.611094399667103,13.652075678077926,0.23734242499634295,7.748604871671292,14.32553134242221,7.7230135300129055,1.7910629009964385,10.553469455654817,11.828477552316015,14.125987806249505,7.973531506140059,17.41676634147739,12.379878161302337,4.863540039127319,4.482207082797709,11.649140994913854,1.5563599869909295,6.692475195590877,15.874614619818841,13.79156413123817,4.17602632201862,4.080104343688515,15.348878336480713,10.371294373888965,14.54789131163908,8.737351778973203,5.829784404260527,10.73248785850919,13.213351813952837,4.36843309918348,19.964985567621927,3.7346289278443123,14.95803675090806,16.77808847927238,14.10343060703803,1.9495028339289666,7.569917177920926,11.406055604612071,15.82418842852142,1.135899956212505,13.678569783502589,5.527518033865011,18.734180869048682,6.89890591354879,12.080409140802825,6.950374977718785,7.973762714846053,3.3933318658830602,9.250509241311345,14.152895923161761,1.4683649341417038,9.659381417541336,3.8098488270100583,8.799206879190184,2.002617266403939,10.688492527479646,19.042094502462476,8.905295060311884,6.277522912094278,16.468715840098444,16.080818639321688,14.713535765606117,19.778797822274004,16.575728343809093,17.214873329278994,5.762425404159757,2.2049775451907783,19.774494765642046,18.613725383861173,7.934564107833646,2.7863514112675203,16.109103204564597,9.389798793267449,13.362387424279824,11.157177523106295,8.639164816604218,11.224367464581736,11.871609181572506,16.915182097854906,2.411954548624995,17.712461905331086,8.479656087974368,15.57636488225786,3.3719677932774017,5.347686788308028,9.641570010650046,4.926755843545787,10.190945777282142,13.6358614658343,4.323319263186858,4.535349278383736,1.7635467185814901,19.241977838820624,2.230828167553267,2.3163212063192473,1.5860458086516394,8.838474792835704,1.7333245878948622,18.80914219896404,1.358034434630646,0.8766192201809808,10.661249176015115,1.1155928346411415,7.544077740929818,12.799686130588764,9.438137305156008,15.386005388046842,4.961410781499467,16.33315200666045,11.852686092570632,14.907061792271513,15.369544292478565,11.070249974873123,17.300481014460267,10.963970792171844,6.853558964110844,3.465631247122607,8.561251491798366,5.562040273681514,6.485080152821561,3.4363259416165137,7.340834369662952,7.8151021575355495,14.64038920221383,0.0387327415590244,1.8570057764217474,11.081399883656267,16.143391330069402,5.188506819627867,3.336234620230547,1.7982635722845686,18.360173766824683,19.925312452193587,19.38351244874676,3.0994526533858746,12.678460742582768,13.73998552322961,10.92879156629634,16.146687865675517,16.40162036430904,19.289893397471644,3.396586758885123,5.80992821318155,4.896524015145887,11.034394277456819,12.054038195950575,16.876204536344268,13.57343280882822,14.90161902463932,10.951932474181639,10.988745391866143,3.9699959245871286,9.805778375558202,10.158998561127582,9.90841714304886,0.02339732737481004,6.268800423720671,5.382891327273773,14.684780740669048,17.677847221441713,3.937138777275999,6.469317950780855,13.438927293333304,19.420256648442276,7.145691958584259,15.59966072994214,5.490825208888537,9.460811953638416,12.004980155622773,10.850316250329083,5.140710264670281,4.3739942468228055,14.00464118630702,15.917583105409697,12.220439613878863,11.090774272246096,9.298419721430324,0.9941111342943199,4.380496242166281,13.988623426093572,1.924343089670315,18.673587250153165,19.39735417620333,0.9755003400738671,6.44236322327258,14.294638865403876,15.633110586263278,8.974786749623522,1.107486450963524,6.993857713334313,6.145982587178085,14.220332547498264,17.66377301104108,15.127386949144622,13.553754310914417,10.283514451498661,7.980183999363533,5.187501480174137,10.193796821728402,16.93799354306708,2.543373500755597,2.625813300172468,7.340224708521923,3.6768732639565727,11.749051590393119,15.236492917794413,14.580048861368532,6.132135967312595,5.958658566110602,5.139773852410077,10.614998613933135,6.6986931987483,9.324555651295995,6.0445285954260175,19.519897942042647,3.034786147718802,17.809814701881844,11.151730463586098,11.53470422455213,19.264014282017207,17.33951594197673,9.00330895095034,18.94814488763215,6.863061660773506,19.390037206199917,15.40322021541746,12.730995810768677,15.81084447736108,12.047088454814961,3.143616712241757,8.42086254200536,6.120694359033609,11.721155477479584,15.284040856195658,15.417003453141497,8.445503836939153,7.92271122351027,0.7274471409315808,14.596098176066107,2.8464790975162346,5.327184914280587,10.0933849052596,13.16072853641626,15.078435057214744,8.700992680146197,7.588292479854597,9.024475618963557,7.6325301047574845,11.71195379911277,0.2988459828063794,6.171307443398497,7.069677531900971,6.150626400955508,7.523048113160877,5.063427144559602,5.958562925505735,10.00979333853067,19.979115711482898,13.421142560993623,6.735772046805124,14.585006217678353,11.342653456752597,10.614654269154592,16.50140271418227,14.142006880198243,17.673489733478675,12.206155275239752,19.616218465029142,19.333127905460618,18.016790208359673,19.285780178363815,19.71489354092658,18.125690720213676,15.333147941354625,18.372779060048416,8.428785475698524,12.405441075462482,18.932636146935348,3.63922690771441,12.344927162879738,2.44200675215843,6.420926820825303,7.9858862880891035,15.938709970971958,13.794941261120375,5.9913165613403185,16.636549021451145,11.798613283161362,8.129906433843498,5.832397054148131,15.320694702466856,0.5584212890520401,6.222637346290956,15.112477841388564,5.979726072256892,9.108705333317975,1.108253621807349,0.4212202970467782,7.834398687569588,3.281299769885395,1.640498201419014,4.015279520811781,19.341004120298777,12.626423077114804,12.891057754231333,11.485551252349588,15.600958130361757,0.010643420848350793,10.367117084356256,11.279651253798658,14.331132496659386,14.61194479599544,11.989906587922526,4.857719593226979,19.05938882267487,14.387058797087576,16.845193433071785,11.940620837447868,14.1862988766947,9.68522220247031,19.041292371389083,19.47879618485114,18.25793403590986,16.98541851507624,10.109621619550726,7.54813949265801,15.174457976227526,19.60028128632098,13.807757043486536,4.562610616796845,10.82590812143016,19.582900700608363,8.89882449892298,4.964125473877021,16.75724691316458,10.546906892175919,13.686839062942155,18.945778277210046,8.445135026112393,6.181834320189252,4.127392506079106,6.269498882625744,18.294456274525807,3.892296149969905,0.4393720197239892,7.656525024501288,19.748417912147943,14.108656454243391,19.556062537635434,14.564606395579363,6.9031389071388105,3.607364361714529,4.836761324792689,8.25438584786555,7.390722206531226,18.510210783317792,9.3937616765518,11.490157600635778,9.072157183957717,5.1583964098048884,4.02613347681084,3.8073692526836034,12.525342302107934,10.39141541326353,14.069773020047126,5.198475201638675,8.06416218422951,9.07368214849846,9.290565908536145,6.3217272633584765,5.371790469386304,3.8702308610229297,13.439736330696777,13.026909484931375,6.622598434044198,6.27986122616512,4.513130177020543,5.6833895508685695,0.4257011923758558,3.040472455575056,9.01827473821022,16.17825962514202,2.5374601171185907,8.959769957354737,2.1425265727007314,13.171160321207992,0.3899862270358634,17.46903569926507,8.370387539041836,0.3082600100818311,3.167710738979035,7.272503152474488,17.629767841285165,4.089470387416578,11.739338634363534,16.925586648050725,1.6455597177929926,5.2689869115587795,17.953578702176042,3.3362785332809164,16.10425876834602,16.346041490654688,15.900743351454416,6.28110295347601,15.552455498961306,7.9417818199209655,8.411878900878818,1.2289734202513625,0.5469142249625492,10.129451763760514,15.100678010331352,16.39045073419943,17.70563924273423,7.524062422486666,2.06124935132328,15.22620430788975,5.437176601120219,2.608401566372902,6.505021193786811,10.110272400554297,2.303020139673859,3.175979684780268,16.700076351959563,17.657872191874514,4.604272094120057,14.984084137007713,6.840292901212881,10.733178891824648,10.954873205491769,17.593786023633392,10.092770231761147,7.456921213322976,18.532953289050557,4.854549266733388,18.847240702136368,3.7400099315758517,6.024228680424466,5.31352612681292,3.7607150656070276,7.856860485928339,0.6562314210022624,15.134228055369459,15.381253260256592,3.1815833442981445,8.338876638823866,6.358262819376566,10.534462556907673,4.706310242016105,7.478084849556472,12.174822721089683,15.610576758387587,16.07224571012866,6.588598120173352,17.53041343771645,1.1277614510549494,6.277279499569368,9.027165630324117,15.319336760049165,0.24861508468927873,11.075558430944422,19.226697956281676,17.796252513140548,19.855715076834567,5.721377858952121,2.002846717996789,6.916699105110773,19.427695343184055,12.104528960061476,18.072600588332882,14.339174520252396,18.584309477742885,16.840288562712477,6.748660025695963,11.170107621659824,1.8534445881872719,7.915278069004565,16.08044167151274,17.08690669554344,7.887397049622291,6.054749593475863,0.20684978530416842,6.044247021139677,17.594497523207608,8.42548760089613,4.1102305165261654,10.697954297243495,12.930752947494849,12.500711140183451,11.372208079786382,4.316814693477964,8.764829941871831,6.138220189928112,13.847349948756303,2.9902687813404105,3.6299153580008925,13.437805877384545,1.682104007300551,14.524653579778079,12.875082409043186,4.112352091021396,5.042425061892417,3.3952482093786607,0.9220277708270208,17.50365345497372,9.280729860202559,1.537489122967779,9.0508337574426,3.068948450935638,8.5638246137629,15.737529137715915,18.24922017656921,2.9753251846994377,7.201239454092181,15.86625691531915,7.441237540479064,13.510534591020482,2.7531606007611487,7.014063980853553,16.14752036302185,16.826383674824434,8.49282905142327,19.12762101151727,12.67654077338622,13.900859870390283,6.875590581657609,9.75544893330715,0.8319660566686871,2.4655513377799654,2.7519697461408654,5.468559225295704,3.826336678720015,7.83107690562602,14.948959241292087,2.3981065271107393,4.964592124383702,0.761164425186438,4.310201454291551,2.4902227568890467,3.1761273888621133,4.258628090536365,17.93825701283067,9.839149290633555,15.33456086044887,10.578025285731387,4.726348405164376,19.78063161265483,12.31188274153828,16.98417813351473,12.13480884395025,6.065578465669366,9.325909236817417,1.4800026639906294,6.685352473121098,6.878305968794272,13.566405814123318,6.43088410683796,13.583059723648603,9.01054825003576,3.1437165997067984,0.0424768939956488,0.7522054783739796,19.481271612235695,1.3731630204106526,12.260073677553663,17.132807966288897,5.2549168665500545,16.637394698725206,6.7045164866263285,17.3547208815003,8.462502468716412,7.699146487614397,19.828490067522274,10.949406715473739,3.3395019785760516,6.332949846523022,13.722628601466425,8.767023591652961,13.116159529997443,12.240923719596616,5.857570938485357,9.372000034227653,11.93347976854874,6.667245965512203,18.574817041651617,14.200399058251175,9.170293073721588,12.721646200668086,13.32262979486254,13.310182947653445,10.10163616500385,1.8190604219263617,19.406785340041466,8.119289983332255,1.1508952969500896,3.8899630775248495,8.493098060037351,14.072757195260142,10.199678014016103,17.1324183987451,14.039483426804287,3.8662418167009127,8.935474011335941,2.548966269773736,9.963038938990225,18.453195478645185,4.394841058297536,9.666019367480976,1.6453168086224768,10.377343002239922,2.1106553856894106,12.572577597642569,0.7193988717401467,6.841018740797815,11.18427207076742,10.554072935658443,11.363865218596686,8.737382271849903,9.297488006964002,19.626745080455116,5.501717868291318,11.758296538286004,2.839214986837333,13.804516063115537,19.477245012745662,18.04643399076136,3.5230088979566387,3.6440934531046,10.181035783423642,19.780017463365816,1.9457098033186826,13.838813245658876,5.04867592076943,16.10702005664257,0.8113605647184619,4.005033347202582,10.419505354646578,1.8632149954145705,12.051674778726102,1.6959659246165026,15.833715995551172,18.221646216892445,16.177416109107607,3.4767506610806187,1.1839262940888329,2.6115242898643887,4.079893090259947,8.933954578916033,4.914156163587298,10.244341854985235,2.8491615756560718,4.016270693708255,19.09629541351587,9.169503152537661,11.021634240035594,5.353594397680452,2.9382863060159137,3.4230818962263188,3.897652987162501,4.967848363122829,18.196535927325826,10.869746546355792,17.444133590648704,17.51687219995819,11.72817964220215,8.523871420473323,19.63332244240512,8.160972659815888,6.3962519746496005,10.70796685731208,4.583360066541591,10.701914835193156,19.84954480223169,12.20804625759457,18.100453983093363,8.627668428201506,12.59756219110316,5.884794979016319,12.389864383634603,12.53383219730492,6.907939720928056,9.06469165199466,4.010899051385701,18.78847853793307,18.512532191644823,6.197414642024279,19.071135008169556,6.516316383435572,10.132303522696326,19.053580258992948,18.39052243576482,10.924549620423466,19.21078690891221,17.068201734626687,11.705204426007715,15.295562536759068,5.090669144752198,10.197501071407316,12.865891551098926,3.4740450104459075,4.535490519951355,19.629253686129715,5.868703234289008,10.202780950506959,17.266889765049083,16.29452581431942,9.432227127727177,6.154589282560261,8.2865570429998,3.912102445873087,3.845331408823882,5.809229347303413,4.047856259837821,9.651592573308028,9.30124287829499,12.718143092027162,12.96472828987345,17.768943981894594,11.37848839439567,6.429874032643075,6.915824496691552,13.425979923567644,2.1088596205982713,2.68963265124885,19.73307354502015,2.9624508124080062,7.048134527634633,17.140053014177198,14.196693366019502,1.0142673357369514,2.04443115391157,3.6538447247509254,2.0043849049518903,9.070142199305021,6.323303197837187,3.9960426387858483,18.60485093688274,18.289756380722707,0.48381999314488944,16.86080947767952,7.414298718245482,14.617523579497004,18.54717252943285,14.039571120615575,15.11400153950493,18.91132711630547,11.076138114451037,19.266697692763852,15.574229148363866,6.07337845513094,3.7061266428560113,2.563793432289283,1.6223148660752251,17.88635874024032,19.77840355042469,7.384324182725859,11.731658744635993,19.946139668365632,5.4328974078883085,4.944067328812256,12.932159529787764,15.374255176826468]}

},{}],153:[function(require,module,exports){
module.exports={"expected":[12764.428754949153,145.4963510288716,5.511101021589313e8,4454.0011399296045,9493.15367444336,802.4644673341388,5.542808881322453,7.485609736975457e7,3385.5234955708174,5.153939997276448e7,1053.756313265539,6.133244661746124e6,186.55215311862028,56.43565131191883,7.260923039734465e8,4.299638963658924e7,8.937788368981615e8,17269.841036243502,200183.0838674918,1.337194405049789e7,50905.19377593715,857.7682435377232,1.8283238773638615,5099.967765013186,2.373658540559208,4.016285499526066e6,6.096945863112551,3168.663751122845,6.9811742988525936,661444.5466916002,946.9416742870229,520.246186880142,917.2507589532643,628.3579278005107,1.7002184667685255e6,8.684876715075172,249.30845306611866,3747.6715496286756,439.0814828157913,3.415685712513181e6,244152.77506937005,96.21582377841804,3016.583077514038,35.716597814385956,835.2340806392281,648.8500211782176,1.5924858781337263,18896.46161781836,13.69526797756862,3.788734199322288,165529.2715107643,1.5342952737819836e6,4.746184208028977,28.608986373534233,1.021093661479751,1.759641200953817,21.214400090790996,56.43293309758553,2.0026982855336303e8,5.248976649353219,22807.669813609187,104474.58745024187,30.854811513020906,1.6538402710369573,7.134523397714215,406169.52090270974,1.807022066854646e6,192.0440058731302,2.2718243632714483e8,8.748360672565678,9471.814899013905,465.6270042887569,2.1416455267472063,1.3539283649899808e6,3.7535649119439474,17.178729010285082,2394.9648661718006,39535.294463301136,6.933137437983554,1.8352258163474589e6,339.5852601584444,87.11905926148364,2.4950615112296193,3.9546015367790497e11,7.503549604338232,139776.77175689125,14662.927186486464,47244.41818193965,1.6799620935708008,117150.48070832147,1.0282453923316423e6,22.923080805287476,1.2779252833079757e7,426159.51593807654,9.692202095172876,7.307024707312329e7,2581.643718020855,8.793640506373173,13359.899003905119,20.983432164468528,76.35876736006458,5876.898857207259,911.9345966324095,257057.29564337287,1.9852976680460894,22875.604604082233,191.3861397765058,699626.4580526536,25639.20962350793,1346.5888187955218,420.781201046226,11.871507222063007,187138.77644827456,4.167755886443644,5.399185254908252,1347.3141919217892,113.0233199196722,50936.48908512684,3269.6089023896516,108.96162657248288,35.78811156739173,1708.5108827085962,193997.6283624932,1.0537254195138562e7,2.703806592864421,18.096537801525475,1.336732778252874e9,8732.943825064618,3.8632718732654654,62.57311605152254,2.4640126493174304,26.514267664531605,5.6472636109777605e6,2724.920091432562,4.887601939427026e9,1.4106100599966818e7,5199.851852412142,3.7435191992607812,3966.243748346691,297200.6882270144,2778.113907436192,841.9419270430539,3.375442614016429e8,924.8774785097319,130.70030735914494,1.1899095022443684e13,483217.79999163555,1.1093067946274607e7,40.75968973463052,21068.919350380147,6.483869522815514e8,5.467685682362697e6,40148.64366976958,5.599579643431631e10,2.4097626284666147e9,345.6791303232339,3872.213950083479,1982.3487392717454,1.5734046431055007e12,1588.395472563262,11632.759165303885,98.1378214993819,116854.40619735552,2.652016772179936e8,3819.0156513157467,170493.85851768428,42.00311505943751,387120.9045766955,1.8825216151629713,275865.4175024201,1.3213943309210714,11595.502621602429,1.0775352092385175e9,6.267847737234699e6,50.76689890192606,20.45704654182831,141.27333243864075,3.7957204807484706e14,9.423442422497283,4.7909151896928615,9.207967680854168,3.1735835618037395e9,444.8789206163178,8236.892920733218,2.7756898472868343,8591.26238750646,7578.3022430813335,52797.572491044004,8629.450247344288,2.471716980583151e10,1.657826488532439e6,859.8444427647473,42556.82654403108,1015.1439046408041,7857.518279544234,1.1899066672105773e6,19.53699989795753,1507.1644451053132,3.596947437458826,5.652748977948937e9,1.367645753799229e8,59898.48078445248,684.3157667520616,27.124414994699105,495.98468802428226,24.942393213890405,166468.84577001887,1.409000855990381e7,3394.1418090705347,6.304354301014594e7,1.1663416750164053,126.44230773860002,1.0064019716044124,4.340217000649929,4.031414976078885,10.24575361575068,75.46691513714156,6557.932548689287,1.0040249962069646e8,7.44581409708163,1.2488058315215232e9,11.79788750692608,960.8464850916557,119346.89683990991,70653.37695609177,3.9681205062795377,37.4676003978881,381.65509803472054,5.848579101443977,427.66614211510927,2.312833456760492e10,42.57737187343856,29.6826353163825,1047.1960374538096,4.178207143090364,118.11715503199729,62.40058831256684,417.25961705979785,57.89213307620941,936.5515329527955,12109.20408470389,6.41429901003694e7,1.22870782722838,1378.2087615165597,14.601500566126928,736187.0634331899,6446.785029259869,3.770715147838184,8.599228108362713,78.61344547848063,6.744116377870829,6467.292008121977,250696.96550679483,14454.78753094906,3314.6808067760853,661.4837169700585,39.975534509954365,2.2996808238994003e10,4775.784795508554,365095.3505309163,1283.5724596237987,12.786242579307231,1.5833884483421716,1.3053872089506013,5.308841138159065e6,2.106141798942328e6,1339.1926475441583,2.4258342142185368e7,163.89289528165952,1.6119989140655697,119.41162341061143,9.741390581908362,17.987608428941023,1.0160290441952568e6,11090.349281353752,2.2995401764265783e6,7.589203926583342,6.255477527304221e8,2.229586303628387,874264.619176632,4941.07061018114,2303.8414024689764,699.4701765156357,2.5095834196906343e9,42749.105040429524,2.023617885958987e6,2.249573699431994e6,1.1018062296765195e7,157.4368312166996,27.86646049965117,272.2289637373544,1.0478121683898515e9,4666.241896802202,27974.02329249073,129.57125058228488,7.781408025258279e6,1.1482139801361275e8,34.50881944730957,6.393760814365657e9,6.100869396374091,157.47964930884677,1.4987220681245375,635.3184984545209,21.175777116886124,316.50293041559434,1.004811749122786,2.826955822008977,17.375137556949348,539.885637462808,2.5515896873531947e6,466.59660535356113,1.6631123101186513,152.33481085729164,4.051833654126944,399437.79034091224,142.13126713917688,2.834940997161872e11,7.931346314458931,1039.6536400426878,3.073946616324122e6,400.193125415257,117.73511946892718,1.53722437837621e7,2.1747408759446995e10,8.757926589569226e11,2810.7713067673026,4.054956344156676e7,2.0897921883946877e9,31136.30102053277,94828.09913091263,18449.038738005045,947.5760326501718,1.2995182375726433,1.0905931138009273,2.7914822812748517,15640.585006600439,638.1805469794244,1.887922246679094,49346.73427618427,1.1995466287807692,3.741969245915072e10,9.642970571986153,6822.417274032505,2268.398263438497,2.2253720247660342,1.0233239250523682,3.6916284945984383,1.7599494258261832,1025.692374391018,10.270811144832404,1.280242332419004e9,351.78473913072025,4323.611950981444,45022.51384923783,213.00565260919473,2.6008216049865642,367.3396988224423,32268.85942181104,3765.9681166153246,331.6084198302628,5.616365107380734e6,88.9514966589119,61.816929448136165,1998.1494829169374,978858.2626169878,98.92123716274331,161.68590544238012,2622.1785009316295,1.2339277076906744e8,3.6878495784902856e7,35.28152250032423,1.8375081830057851,2.73643674677471,141502.0570542473,4.007031850973266e9,1.8284563649635165e11,2.615094708329351e6,25.627826361153,3.4765439091125816e7,675.9998602872146,15.82090616491366,387.9376516465852,21477.36018756933,38980.33464077575,442.9043197920752,1.1323024419570549,984.6631238010541,13063.170991163332,1.579523603747967,1.0369200889378143,210.2308072844074,582.2136021977005,182.89155924903946,14.261316830570564,22291.257530976225,165.59097552554056,763.199391499783,8.329152514160292,2.2312176126312172e8,9.33460052669424,110.47616679134516,3120.9515756668434,36504.36559695195,136.8017589737862,4.0968987299543125e14,10.956304011789745,19061.07963738515,27.465015644631517,244.20928939575518,53.83915365048644,39.31826369566731,6.193592640375981e8,2.962062007752337e8,9.295351909356912,654.8859263637139,2.8912240634097115,3.603684938933345,2505.3792412033126,5.393903960360675e6,25288.699662922943,4.219164577715927e6,886.317599186585,2109.050473204775,2.4595551565296464e9,2284.169311863438,3.5997994509941414e10,312424.8136868188,111.73753844473065,3448.6959960127724,2.087046541242775e10,12.36057429101831,3069.175865159991,8.179914142069122e7,8295.467628588498,81.64931187559543,129401.69159165287,52.990972003520916,341.49612641841816,5.411157501460047,1.225629538590391e6,6.897007610544399,1604.1728861696315,8926.705028227134,14.52367233345435,6.107887120713619,3344.642238560714,229.70184672693318,2.226784523340881e11,2.304044236020307e6,31416.76177705047,557256.8041234404,6.228378170613601e7,502.57207428742413,1.4680362263990854,170.110086197873,144.7835958695961,26.4700871671716,4.802362843689871e7,30842.513376904037,2.3910664259588253e7,2.276333452188646e6,8.233810031810913e6,3.6158638932871945e7,389.70149626550784,303051.2969358944,26.478699406513787,2129.8481554211776,1.724134980856648,29.41095829011845,9.206602662307908e7,2.4038502794462162e10,13569.003203624277,212.69837073260888,2.5425101320240296e7,1.4297411772650037e9,74019.61149664517,1.6636296238111747,4470.84794102501,4.139096304324991e8,1.4194625253564587e8,112.68026700049543,13066.44940581197,18362.3346985099,3008.9762289261994,8.514321538038836,1.2287748062068236,818.6207877059504,5536.728592496037,2.4615233234040805,16742.842600263535,1.7437309975637139,1433.8873565134288,556.3703274388062,239717.92843787692,21.94272127708764,5.179056122165351e9,25.70577595442318,33763.91749668784,4.4739384063784495,37.25689324900053,37337.059059178515,305.26280261563505,1158.2016282477105,442.0609187976409,3.779565455545773,3.2006418304286563e8,19.06451852237053,31255.67420289395,3.693501605626052e7,9500.562809062067,8.229056390825471,2.193584217019437,1.4867553650887513e8,2.046529984994279,2.5955139724891586e6,1.0954574535166707e9,18.815482043684185,75580.6954557754,340.4654897316711,4.449738250188796e7,882692.497540013,335160.23209210864,3.439367654308477,296.227288559177,37836.79220670494,759.2410089771251,8.168293684521034,59725.52701071093,5.427093399159024,56112.3223777136,4.201309822794717,1284.7475501376377,2.1798027923630852e8,156.65335857199878,493.2811193432863,15062.67960043377,377882.0719639704,6259.727200487775,6.200618622455727e10,45853.76821464012,11.819472755716093,13971.040693528874,577.0783094225454,91.65689022348374,9922.882250719902,6189.585331077776,338.72990575771155,1.4352767031057256e8,9.304990942482144e10,4500.549786693555,278.8268601798831,218.84321522292154,22205.758854361797,378.4439979454982,24.23203752137612,149572.67377945312,175.34470975671033,9978.056487964317,679.1388356579,110146.41712531516,18362.50164156383,22.69088746741851,1.807090853400641,129189.113944837,108.67147094142592,5.53429287011625e9,21592.964092295664,8.774687493717739e7,3.806199770884309e7,2370.9813461800604,1.4745709734283406e7,22433.302297169317,80.7473877261163,6.160510791266163,29.765867768328846,11.94232905112018,514.5241218847445,7.10732044231021e8,794114.6440252416,3.2739054324406545,503753.43891400285,2.9061334061332995,175.80259252901288,62.20626161775178,4056.7274523648316,849875.4599991963,3623.638336436096,1.53309346416631,2.6566274172904802,3.1469852978257427,73.97210987203789,92.87653357321578,1.685593385230178,3.473896595234999e7,9.406737998476373e6,4.1176004060708075e11,49516.74118648565,1.5111137563204928e6,3576.3929804838394,29.26592459772888,175137.11073220606,43.61789972620843,7079.79505711571,30.26110236765423,56.48516859850794,3.1708002341207806e6,908.1208016615884,2.5001609264152553,1.0769129740921103e6,7234.8002821138025,10.899722225781876,110701.71484655522,13.362086322980003,2.4328460090701785,1.6561532160920822,30333.187282581315,1.5137814624821124,4.059409564369084,1.554516885951464e8,10.981959308338483,4.981676281171201,1.313491299797362,195.72006129425762,1.8219100033855854e10,1.104709486479973e9,7.625898908995184,18.20259401404224,5.806114540486351,8.760267560610848e6,848421.2616531159,3.307890308874999,2.4148671837897346,24.773332951213153,80533.3244603483,84942.45885684573,23490.252619762505,1482.456432989981,40760.55263716178,6.581246587415027,132008.34599483563,48.35419558845393,16645.834655729126,63.01934494592585,35.760313364657215,7.404115960332498e10,55.63933169076708,9.689550828869013,2.0352698000465316e8,32848.76732308603,8735.639913933317,2.4068310927516073e7,4.479960359612154,87956.83085716012,3.507825879350081,8715.746583452317,2.3861867757182904,253403.14729122014,1285.375116438136,4.401799139990442e6,1.6714712699729857,5.364316053809996,8.522908539951981,2.9337463124985694,43620.04848007252,1.3303127714824997e7,294.2875227830342,10.904174937298652,13.06117845035372,22.986362609152003,11159.697392708757,34.00764321149694,16.073521239512836,4761.869571771423,4.593041920046116,1.7490954142938342,411432.34973544226,441612.9043085077,197.3625796493676,212557.47933632674,638724.3087912138,3.138190997695099e6,89165.74149343198,654.1546770538135,1.597973267528358,8.315521162706807,70.02017672917039,266.8859228877511,90181.47997939038,150316.90019476062,3705.547255391618,4.703326314650828e7,26124.448375472555,32.46735810971198,309.8305615465662,4.970420013402737,10290.01976866288,2273.5269314238917,7.699872342258306,1.051680307531303e7,6489.409239713934,36.75772881556705,13238.338213913092,11063.416125481126,3.832999934412315e12,99.88766361794066,282022.87915112596,10403.139945985575,1.9272756145272552,308379.6368333571,1.2110524212222933e6,11.0968051344198,4.305335259435439,54.03565696962212,1.586580356501122e14,2.230579554597953e6,1.0802690458915571e6,1253.7874486346166,16791.96551336811,13.943802255226032,8648.465649613192,5.559393070018782e6,1.8839496752242124,2.529719287412006,24.79610785784311,127393.35862461137,9761.87562358471,2799.858868654764,3674.963813074465,1308.2457444637346,4.709054691194553e9,1.4318291155556437e8,1070.766845454785,18.505358881261486,4.690216870933495,1376.583171056739,1.8121614427675736e9,476940.7988001663,62.55833640294622,1.1341463766831836,1.5556671210000732e6,3.375864198253684e8,24487.50638160717,4666.0802971074345,2.654649599737293,1025.5086090248124,135.21382944815434,2.548709196428662e9,2.955922634487678,7.459516207568329,3.2877463177049838e7,111.89582275323274,6443.707675619035,236.84701152870687,82.84922414353514,9.34530959236025e7,1.2246505881482748,1935.4281098170818,121850.63542015936,92188.65248526465,2.588851172243247,27.369035539448124,1.9334471784118104,245200.54414411803,1.9530399530233153,259057.51621596838,334702.13512417884,565.7253847814485,1.1521708198703305e8,18778.099399566992,7.022661177923506,12628.216989013254,91.76974482902332,3.1751001273814428,238.21215766745155,18.979540444647014,38444.922495741244,18.99772653225847,2660.965433195767,67.94735449038949,135.78485418681987,3.2509815930255152e7,10.489096081088785,4.6268900164493656e8,38172.931148079486,2.590305175087969e6,92847.32157206081,29.90236974731976,1.187407875939481,71.54839684859445,14032.109215873443,785.4266151276422,19454.890336272907,23.328575656041213,634786.7694863328,1.1937591591661976,2.0432053067974582e9,3.7340132125986544e6,726.694299157488,3.360594676598946e9,1.3183330791526826,1.67314183634835,2.3966939198938686e7,974.4450356716671,286.80640130754165,9703.671720594864,9.02780134159391,14803.244817347797,614.0884502414535,2.309264394975251e6,1.2329018044994158,1.468369038010619,26.726363589634616,4.0841313129739225,2434.0923839021157,1.5509173362703663e6,8.7490764728723,5.328847449088462,3.7306163949767994e6,1.6051288335182148,14.876679320219619,1.1931057853307484e8,1.0247077244465854,32.16726736543866,3.2760789987143095,3.1462211372789825e14,6.75590142586915e9,304640.93640054594,36.71195285928363,1.566286763963013,2430.526481867573,764927.6684308943,1.132298754047548e12,657.6067447416074,1.1180281805790409,11764.64314935196,1.6760193717980482e7,1505.45561598372,1.4136803250840628e10,66492.69465415478,52.05172951543634,161608.17935298206,1.594840889092692e8,8.712778142531176,128111.28950293454,609.0947052675327,3.1877009464787483e7,24074.588453304856,3.9183483301334774,462.1796238373704,9.052860524804415e9,3.539600030699889e7,503.5506081430717,25.936678649324566,7.840076660543158e6,315155.1585335335,42136.14056363872,36.20237234816379,54077.143301026976,120.47049163912382,5.827898664722941,187830.60661446722,21922.098447345226,2.7875605494897882e6,29.541428643641034,2.7527055039498577e10,18557.773273594703,51.91898245136689,3.043623435647548e6,38804.6069919769,5.241534284916945e7,1.0592130274714548e6,2325.9113135886837,18867.864690417253,8.143868427715562,29920.501496775698,19900.79829019189,6.883167810826772e10,22.78483935943088,29.232462488052782,3.222891829863453,1.4187023429088732e7,9.46547795043526e7,4.383834675220866,4.1249797204545996e11,847.4996564235295,6.751384894902438,91.3303251187539,55.00765827985388,14225.683040545991,26.088106619565806,466516.8691968607,7.720446531880189e6,2.633265474572776e8,2.4662983068316457e8,10.880272281033768,26.699600805819337,1.8034435735449734,4.85223576211607,4972.240238114795,174.3801090621072,858.125247277345,4.323779617307158,5.084499031840422,2949.108527512659,1.8399727360516172,32.970615889245856,5.969454215244615e6,76442.76387831772,1509.9996768944673,705285.1579285295,230.3383915000256,9.505459190508533,11.49060143033373,408.38296443154786,3.5484918859791654,1.6125830218761715e10,1.34878857509459,2.126963749164791e7,3.6117229540426713e8,1.4841170398344639,304414.29618969257,135500.07064733366,41.98213294980434,2670.0179941441115,141306.98211026206,26.320811200533445,175365.2594445199,1.2268677407914337,26.335513918412722,354419.02789901756,73033.42974320226,143.1510688102592,1.8544516674933633,2.2169047202631535e10,84.0046017827774,9934.920634530525,12.891753553973262,5414.186586925131,2.4477746360812257e6,18105.29248488422,7.483356828399147e8,1.7266623661463228e8,34051.697938363446,15866.746475363307,1.4081248935072238e6,1.470705760290863e9,270.9790165910047,5.069279396849684,3.538839982855776e9,43414.68853393019,8.260166614556653e9,4070.8471863848995,485.49452090574704,1.1583267636628172e6,2931.9333101716584,3.757621019041246e9,1.7515783865331442,8.369013763793367e6,202.8440556155366,58357.99556423615,6.572154166372026,269.43373003138254,24540.742090725704,85.09729000151529,228.09274501670382,7660.356382860898,1.0785946807250004,2.6524478453231797e7,126.83570318138527,10795.869997567226,6.659553994541138e8,396653.9156344675,59739.04996065803,18.482801354515956,1.3533140984772207,608.3651191248358,40.46397774157578,20.9335349915314,219.40826248996115,93032.15379321032,323.2724768209935,6.533720698040323e6,8.323132715726327,1.967647767906536,4.0833754347708225e7,103271.19253005528,171.45620730157447,47.85383646409961,5.513926519634497,2.5832973781986412e10,86.72522020433102,3892.6216633160084,100.06311218012407,2593.4482975674086,1658.3270100343732,7.67545037431382e6,12.263727482768536,56909.39856699974,56.656680158119556,173.37691428035887],"c":[16.02918783540947,16.561373966352587,23.699998949896933,18.039534641944122,13.852995819746212,12.232425054757515,3.890672444160323,22.03887043622857,21.188128527802498,33.03763447909081,7.6262231130283045,18.897965050444025,6.212356602955757,15.256090036310425,21.476651070348527,21.03374656749321,22.83497518638276,20.001741034615492,13.94878294528008,33.11623352961942,22.148267670610185,9.580757589937575,9.45367880526182,12.68835355922229,2.0416007803693916,24.731951014810512,16.356442678527834,29.861660969947852,19.08148055817959,18.383694495717364,8.316530092687168,8.526282269992697,8.032657876505255,8.788905481834998,15.038839512736882,6.177008238210417,7.076164430048992,12.719968881229923,17.300133565026897,18.86917527436271,14.647735224301275,27.013153541620817,13.375803403584332,21.431321725083603,25.99218846787884,14.24353252983123,9.614621796254681,16.24060482695084,15.714465194719812,10.148786984589773,16.95777269415921,21.456980164592405,3.6633880003028962,18.772224290091224,29.63219256425415,22.48616365510162,15.531722813677966,11.857480360975819,29.281007540932286,8.27141350959723,20.72389249600482,21.90474840551201,6.166721613638023,20.868217156333138,15.888898847471541,15.939877293583987,22.599765618742467,11.516557165001892,21.860010331912783,4.2939254493794925,19.33550129215893,17.0750891625031,6.933484345305201,16.873061403604975,4.091720109421962,10.771004711320666,11.610547704889228,31.18972731451114,18.279037902676283,18.192987990171133,21.719574023925745,23.15982091433559,27.939871216354263,26.39909574955135,17.97254822121176,21.978883473238103,15.168468670205085,11.005392446576163,15.00038344172758,18.22539617896969,15.96568277252889,19.21498620809299,16.845145355335042,28.785863068661126,9.273313376378514,27.14059685446056,16.380681235287405,7.975013779411538,24.083702504904355,27.650785130890995,21.297453420329543,10.9146713626888,18.26110112835531,13.403913807296465,16.85239885727261,32.19032055689655,22.77634772214505,15.51544131392255,12.348043933009045,15.778217150823075,10.8152613972983,15.724452476706048,27.21563982387209,6.701901531256843,14.762586043097542,21.381768942709286,7.6751616345224996,13.725826606635147,15.561187579503898,7.54362601203964,10.398082768732717,27.095917867923074,15.013576044273165,18.524678712863746,18.44019282796714,14.639427573109497,21.08740599376476,10.439550622941738,10.139839382033685,19.87043276771054,12.248409685143521,21.669072870138912,25.52184398757675,8.85644214962884,29.24827865930857,22.935773671420076,28.487641193051427,8.760043956977517,13.194087887394124,17.152274818794716,19.448831916170427,15.702287944539085,20.71577694933432,12.640436402341336,8.241358139912919,29.772634671837913,28.976710260919628,18.402287287040764,23.107250826733512,14.07963290861457,21.01835379743632,24.675519011033636,15.318219671190855,23.788700163463673,22.120871213248932,6.725497647734115,11.929447008737736,11.841426393667321,33.1699349126784,13.224204858978311,19.628297807106215,20.65779392508989,20.053574521809075,20.823952519066957,27.06165023692359,21.108228075616204,21.451558958695074,26.603127843098378,28.90949647555138,13.141174379520875,5.2140030367469095,15.090821609280134,28.346657679789086,16.49645337590776,6.787698902924049,23.556308977195386,11.163441072945307,32.1792649165182,11.799736519075822,14.804747820027021,21.508917720226762,29.771783348283762,31.093082737247038,16.38376285173713,13.798956491636865,25.541518969538124,18.418806966372678,16.849386456563277,25.879066949825187,23.74897481727896,18.64562143422164,21.003035779484268,22.7578281000106,17.976491964064753,17.28136651361097,25.462126545347353,19.920188884733093,20.469337507681914,7.613800235430361,22.06057609975398,20.991550869769153,16.02282062438276,10.815257248964524,12.929008379910798,13.767101446568319,21.099039870233476,20.97187540605571,32.932892092720856,21.169838679257097,17.217825760207113,16.17902225303592,13.624818227105703,16.81600096129318,20.825975767343465,15.945249846936818,5.283476051069782,27.03841106290136,25.5520170581678,26.49424673176918,4.590599531919464,22.51333748719026,32.83695565625845,26.11455935377147,15.809894693883567,24.97337654891372,16.226135869591825,10.573646698197082,30.51931188283333,22.760573630113,9.87815549309844,24.867819751785284,19.57780792079701,25.718096839190093,11.583449664906874,8.270026761569106,27.1793049421359,10.199087342259102,9.939741594238715,19.359769396502063,15.926822140203752,24.806310413907553,32.18212274345079,9.224190961209093,10.29669989528693,7.2019503349731515,19.717492561091532,15.873170971088808,11.997973773861734,17.229847949260314,11.914571562305914,19.285577877760513,18.947737982945565,14.35119237495006,16.63483276313962,18.622964857133873,21.691045557379415,13.67007937075536,26.952118451963017,12.343000448718236,19.46582470980105,10.50020042214725,9.52248648351221,21.11357666308811,14.898357683938903,19.877376208741932,18.32000676621684,22.617060996973578,16.395569072774094,11.17163902579758,5.089656252527138,32.48988896327602,26.088675679653697,9.935623327712024,25.663429123685447,10.901204309666236,14.050405533260179,7.071478984637154,25.35576884509339,29.010313436271986,15.285243268967903,28.257583503201914,12.163968865730126,26.55906554931474,23.599164281394298,15.003486972943733,18.464782044431928,18.27607898388463,16.257041987723987,6.067817658637593,7.484831810970457,8.969933250542603,24.024858808896234,19.281724191779695,15.714234080116018,8.122402096109749,16.94822181066059,24.843495408902882,19.63447792842388,26.596197264501708,24.34591952302236,20.120515030547633,6.0077376368866116,18.11244650622603,19.34088347716313,14.112951141316753,10.478302678559292,13.193520379089874,7.927417864633186,7.4091783479654545,20.56588469801761,10.484734270615528,15.116149872119223,24.248654642124343,16.554486072256758,12.729403952515176,17.46917820558084,28.237261893477374,17.069322970816426,23.294567447886017,22.357960973781065,6.330253922559446,17.358919106236847,23.668870953862566,23.034462835973695,27.473356581792938,22.724615780593744,26.499143013269,25.093786946383197,15.107030629179528,15.546119561134667,20.427207680899272,18.509708965543027,27.64156862187709,26.603881802818663,20.099916690776965,15.755280890474046,17.682936163349407,9.619419722765524,16.785819522710035,10.536237239395806,25.593368323949147,4.757649767415427,16.12250897356566,21.36726587352676,10.296349683436633,2.692086259498014,17.329356375107558,8.0208325936436,16.83043247369076,3.342347730750581,20.59724400704636,11.063209269314331,9.214608229107021,24.208836563088003,17.538155349220755,6.405061279626468,9.197846882229761,12.215745158351304,15.386553222430901,14.73833029913207,22.657373102610386,18.230719169667665,15.047817655916518,9.619927394760808,28.69583113409762,25.64885261279992,12.381086666372575,17.394982532641333,26.16366580098201,31.06688760879546,9.51234280191677,7.798340416111917,5.393305657846725,13.370100545394585,26.894786012066564,26.868260202951816,19.172498391264288,21.860264497063234,26.5446308503728,17.712708463733307,18.8774220208334,19.041512921686834,24.31330479269564,28.80324726208993,24.732165649051485,11.433985153857488,10.685461037278994,11.233041515937751,13.530680019022451,12.5757167408598,10.177862012740592,17.44298333978629,9.659496685234384,10.507657718343188,14.975863864156945,9.931476044697874,14.183634940163907,14.87000770033291,22.749547518847905,18.738240347403657,9.152509165638744,13.346326722718514,16.987852833086343,7.4485629354003144,32.23983337853896,15.629325947600517,17.34460803600081,11.334926401687262,28.388367128177016,14.116212689467037,16.257468484514753,23.26932990762983,21.082298155926665,5.916486215127184,8.6067975544511,4.629567261228568,17.712947688633786,13.75060004920338,20.14575167032561,15.305597690418459,21.36292145411577,10.057239572883123,12.450057886446203,22.776179838184763,13.998234682806071,25.80417426769277,15.037295703352953,17.565832042516664,15.146669244246755,23.51860477495966,10.867019171488348,12.660324721734025,23.80415386977083,13.572844466778061,18.149158334988314,29.417460823160376,9.926042120016824,18.52768532710471,12.023303214166695,22.43925007477896,25.985401661531988,20.63362295320902,20.800559267161034,18.261967524286437,3.000694074636442,14.857489726798754,9.586023478199952,27.59403845390355,13.88208519185228,10.000136199839133,28.38027527950681,21.947309230789372,15.835118200839986,25.762923523359053,6.765307523299214,6.075949133555354,12.479676603688468,25.43248429951109,23.85896761478937,17.10196402700205,24.432290659164035,20.540898522782133,20.377162795385924,25.600056863165282,13.677395543974004,6.904737898398437,13.866378412687315,12.84538549429612,11.997417478882138,20.505389175783378,25.762771431119308,20.55823046721474,5.999800115728278,15.914204698764529,22.800095535750067,18.811966164653896,20.35537143758686,17.036706508124386,24.7610945694162,21.4574067200168,15.242316045674055,13.568306608180484,18.686492821512857,16.676539726027414,25.976609469298083,11.382147555654175,23.278769534123267,23.50820126387119,26.440602224295542,14.058934311223657,13.29873810056981,12.68209397187362,17.926387014954308,27.74421596598266,27.11251199486363,22.245332507582432,10.382715325781112,12.54886664509217,21.159859764267487,27.634120340959818,18.964803745632814,7.986474832644934,12.991347112414179,15.904876392643281,9.975602525700033,20.489835723397,14.222621787527846,9.947249591430065,22.419282464355728,12.378878020761917,7.400725180628992,15.010798717351145,21.716122675321916,17.381182237943754,14.250055587729257,22.07740663774022,8.508888028179857,21.351029489129413,21.077488342241452,18.359056209192776,18.28558232042273,18.891614380147175,9.736314975043712,6.970882664724458,16.714136010024113,16.13878977237513,19.88243315824566,19.41596954922662,6.402179555849342,12.679271287479441,2.982149135850793,16.994345350608548,28.63791828824892,5.857851814917722,27.712785681637286,22.546771638317267,22.771297370406877,10.287428484067316,26.219496524253,16.980532445141943,25.39857783341821,11.667038927942219,15.97040499578356,14.759553013419946,27.86872739884646,12.52601506230189,21.064670973200034,28.155814205775926,26.397411277889653,13.789392825625294,18.016850061796895,6.567315773438651,18.360243878889587,23.322067934841694,7.767901572777519,16.81363145484538,10.453006570593558,18.998960106377716,23.298707936779824,16.194313640079613,17.12710673841222,4.958947980961495,0.9019979425422859,21.12366074821205,13.53761220457903,26.803102536471002,17.320064760340426,31.263575436945132,18.783145016427078,20.54203324383881,20.603494451688952,29.339656976120878,7.460965629325721,23.377192534284134,7.097194565565067,13.3710998345209,11.819790943940987,25.99079385059655,13.718847462352784,8.3444344932527,25.085900612923595,24.423315050805314,11.292712150664164,11.320680301167538,16.143367610263653,20.786054422015088,27.54256451481999,17.81801295591805,13.544242098950525,27.255345981082424,10.762939574359816,12.607327704901921,14.827095521811392,17.04128041231852,16.779682589510273,25.640950306373085,24.58139129690504,17.819701004354926,23.049998740669675,13.128038813507636,22.14346790761642,11.221888517845866,20.381822920206613,5.165400088181853,6.647320145575721,27.301824334897255,9.624643632824341,5.150886685165001,19.847453057252654,11.368543252990348,15.15320954456987,21.296584448664685,19.831860884297427,8.144693746375914,12.673895290829721,20.911525752414942,18.899031378483183,9.474910040302603,21.554067533358573,17.898924339833098,15.068868932529615,9.992924798816965,23.572846251239213,29.49481797794288,25.313282996166272,15.189929829269364,26.444754388824748,5.544749200481384,20.390661603108455,17.35133552301734,7.590539908935285,19.092496945730282,22.764984824553764,14.938404851135475,12.453009245012382,18.366516445806543,11.289074114107008,15.488719272776372,16.63274922763857,20.118558276009104,24.37056890576077,12.854757468898697,9.703182318316808,7.858362798090742,24.93652332646738,15.49164894061849,12.93642999956564,25.990951869113395,24.024014634581967,21.082691140370734,23.735814603291153,14.473127293740308,15.502894621055624,10.263165901827836,11.306602853559873,11.180293471140683,12.782872366399852,7.64838874050646,19.5266177226309,8.113517029411264,5.595900848560915,21.905655835425716,25.445284196956145,12.576301112853184,18.95803595896924,13.257233625858403,25.661368499830118,12.443602939156978,10.607644017429102,10.51111915739791,17.806618888949657,9.456768322924763,13.826334242327057,10.5920596438107,11.825101328791352,23.31400395754748,21.72663695576486,13.069842184639086,17.00824047973106,21.410780656663576,18.59944475572143,25.92023624040543,11.791108410417493,1.564518514592824,19.516891520070164,20.752989367408418,27.67286667353377,18.162057085820543,17.62969194017433,16.588388500577185,20.04101732560929,12.603710733435662,15.01609230558008,5.957399926377166,8.33435475214681,9.401984275307033,15.957085607368398,7.366412218151307,25.34986463615316,14.409181137354595,9.961682775981178,12.466345184289496,19.179945122138555,33.40896228918841,5.3524004280778446,22.816686047655224,9.957717208766422,20.33102519297371,18.31708406738113,23.95584102240814,14.723590127984313,12.768157393694073,4.210021945664894,31.832560069121236,26.025994620329968,21.19702089965127,21.651269988886053,20.529854460008536,18.57357700133033,32.965367184225876,24.077338026562806,2.357458182021376,15.34925718509616,4.703857968368766,14.983257400151988,16.37629366356896,13.999164290078284,8.712194506106176,11.092863177776632,25.817731343038933,19.90194573844256,31.849316874638262,19.351004220447667,13.079976765298284,26.212948211579903,28.27686865540058,15.644666870228573,8.993506923147702,4.710523444494918,31.233265731079403,29.1397212744497,19.371391363725106,26.15678986349739,16.72138948101922,13.589795116934363,7.006008314334229,24.915631046427464,3.3684262920678836,7.914694670981322,21.955576041946276,26.205052267440166,13.51828254556439,22.02900293896098,5.826528154841295,19.287337264967608,17.799552805711517,18.152595298465112,19.048974796017667,20.731585445969806,19.57076949170336,12.0508454581955,1.4020437013203522,12.015854666182111,14.137726772769383,23.2614609395646,16.77415016922942,7.10183953947982,19.00381804213715,18.685427124679695,3.296044688712227,12.453101588901902,13.719272285788822,21.19316851027404,13.878496459561884,19.883259081057496,20.98760356025162,7.406712740409656,16.90164086801704,5.203506799270388,21.14154593320447,20.532093979234855,9.794373856274436,26.397803835745854,11.583888593415548,15.95974778048831,15.291578884288581,13.691260830454159,12.52929396393002,17.448030694999943,12.211895631138063,14.700735624133705,21.00890405950857,21.99768186323616,14.317249177916732,4.328632677177566,25.15980951931401,29.375294854560842,25.93810115110123,20.88220300278165,14.286823036044572,24.45323384548781,26.276693664275438,8.623849925629365,7.425087428548937,17.679291666502774,32.054044508639464,10.5819771751676,22.169365983051428,17.080866710293716,8.593873972936736,9.737754291688578,7.999636563167864,30.007276333111207,8.136208949997815,20.167775462985787,7.479392747505259,14.732261430480534,31.31769871383336,11.394432432542176,13.177170204123527,19.265756978572828,4.518254725739772,4.2498243530764235,2.613861591549717,31.961226923112704,24.452424624355167,16.026571197686497,4.184140026951353,15.331473467475774,15.29896246968723,18.2059199694021,28.999802695688153,27.172753420858086,11.139479559774841,18.13887470891229,20.64412643004392,14.433547899919528,23.160795908615775,14.924642933009636,8.187816820191411,25.759497848532604,24.381898460703322,4.862195057344204,28.5612504584833,23.981503378402248,22.471444644715536,12.249743783957953,12.246898239882132,21.22725227494137,24.549027780864368,19.191132085640902,14.385781009042923,3.427266428567649,29.399823217750395,13.457093199156388,20.12118721467914,5.234080258857832,14.113830125778723,18.361728358647497,13.998591273812965,26.401069453565906,11.001840117126736,29.633731634272245,3.6940418796099124,25.35855052106709,13.424350506028487,7.2282838273189,16.58169111411477,27.518543862093352,19.257328542795744,14.158843140364919,22.405401550453757,10.567678131139337,9.890780510904634,11.658337705318175,25.22453751573751,26.712178216462767,21.40996618209939,25.254266604007235,16.97075526717728,18.901482298255765,26.67496129029477,9.365438350059485,25.449557179169837,21.57671997014994,7.231243747161329,24.84381969306169,4.486492069923505,12.516021821667973,16.46602758263874,19.992211206539128,19.33909733350948,22.7340776189953,22.347427511977656,21.087855878678486,9.77926876001353,10.149268559775754,5.67166047457201,9.766457575245026,11.515723066320717,14.381118232828403,8.732727907612492,30.42105240206447,9.750882765665533,5.223179326063512,11.146842085261099,20.75805406273366,21.588893527886505,11.53275789007612,20.248592796269982,6.624749394016366,5.949784068011867,5.147953296933898,13.70633428035452,5.590823183318495,26.852503966688072,12.817754273111309,18.16322261581415,27.632353677451945,29.106500705380718,28.867003860633645,14.13328264765315,11.888316475788557,11.356610167971045,15.807697895124099,13.602635408654178,25.925358432632034,14.10580957520569,15.319878108602307,18.359284845695527,11.123121079704525,17.37689322791369,1.4600108432771826,30.53193521376006,17.45652997413556,12.579480447280279,7.365179147671749,24.049850336758936,17.111379222186535,15.383594167701137,27.144178941889663,31.73709777316803,23.335480549583217,17.799803217415715,14.664968545542044,22.212810337684243,8.318062435846002,22.101512133761837,29.663480894208625,28.31234917775307,28.268516354730302,14.56606998912804,8.354066098906241,17.05087635353882,12.144872279446858,29.29838486921052,12.550156848216456,16.416793745769095,9.586731558999967,22.015754657769385,9.41947501861681,19.103188612236476,16.70582856585166,13.793544468435638,12.031644435590017,9.520242613903452,3.8640596713217095,19.105578167923444,15.873902780727665,19.126385097466336,18.889949329852755,23.135901865170297,18.335091780490615,13.957969496380384,3.8809268265085213,7.0880687531279065,12.609732963789995,3.501067320829338,20.94383119724013,14.139120113679487,23.001363614399885,23.384923780023982,15.647696572424437,18.97629353537708,19.235898542485298,14.659884517196152,9.393769951773477,13.900755630567364,3.7346579105052946,28.177352491374343,19.339866142156964,19.392538709730538,10.432174463730881,12.391092040783725,11.537301462447397,14.274780961503533,25.869864230020532,12.056182005458844,12.854448486948712,16.579285379725064],"x":[0.6021365478327416,0.31181153608473133,0.8315416152983508,0.460283884205426,0.6743472154934078,0.545177921045608,0.45418423500572613,0.7893557789290113,0.39247409483367846,0.5303397247189776,0.9379053317631125,0.8248932172299679,0.8712615385061677,0.279108265275428,0.9606167362809603,0.7996561079449758,0.8956219134565486,0.4958380314454143,0.8122814622152594,0.4914051498879284,0.49827041901235125,0.7272970310882645,0.07255692033707661,0.6873873849453762,0.42912050096385945,0.6116867881309129,0.11564174137994221,0.2762546055066646,0.10710630098185758,0.7341010779237254,0.8476149678087821,0.755841892054204,0.8504818539220367,0.7341006699980674,0.9091267041498778,0.374420489778734,0.7918100929802836,0.647406048438866,0.3647133721229625,0.8087621525020592,0.7758599146769734,0.17605486781380808,0.6016904799334801,0.17452338736629347,0.26745190741863256,0.45672667796180444,0.05709958440119922,0.6126061515241958,0.16819281818737775,0.1382084601089899,0.712488628749705,0.6717914980764139,0.4801623894265825,0.19004437649290096,0.0007708718163166317,0.027448629469027486,0.2095681826885556,0.3553551940676287,0.6471842717648306,0.20836634308162916,0.48255856862781465,0.5248752148046876,0.5642470966144351,0.025476409033988512,0.12824605717707582,0.8082468136500662,0.6258541702045803,0.47367805321611534,0.8901596103694298,0.5100410247375846,0.4769257682550492,0.3677999440010078,0.11786636467664913,0.8356242445225541,0.35346138435946406,0.2748263356322327,0.6479135031569467,0.3450957646524433,0.11553732065985423,0.8017245939640019,0.27730104592315974,0.19800981952948482,0.03557110687341014,0.9762054247677345,0.1198358723064723,0.5285218558211122,0.6382724141298499,0.9484690232010853,0.037336595266007855,0.6513550893094908,0.8130003816466107,0.17477092923665527,0.96298803522217,0.45316305266028545,0.2694770121226451,0.6542629195142138,0.4914253782724096,0.27431950454009657,0.4031091834156506,0.11717451667465184,0.21066491302492585,0.802798401267887,0.383270025781389,0.9326473685623686,0.04381678746820805,0.3165830679873354,0.23885701610444254,0.8737665004589648,0.8384271062240043,0.4562869805095009,0.5781809340774833,0.16747446450858616,0.44681737659948406,0.21518959798670512,0.12176219127840127,0.34361699602741536,0.6371471251917817,0.8040609092260314,0.5343775199292795,0.6464376550631086,0.3659707419825493,0.2826476561462892,0.8216406049186613,0.8192504607147295,0.056788870624771004,0.21322513420992428,0.9875365907684628,0.8605862531107822,0.14724160259637475,0.21933830613192518,0.08390754567068015,0.16162149476885945,0.6141476756484534,0.9051566642541471,0.7396820421786434,0.7063109416353528,0.3067989430639877,0.15795632273226534,0.6442204990870861,0.7273970390026914,0.4179531804947316,0.4416852052856639,0.9170937639622456,0.5559408863956627,0.6188722006868312,0.957893908558372,0.454042152257329,0.8581946158519338,0.17022944988251787,0.7122044417252202,0.917633001963728,0.6331477076467311,0.7055142537178478,0.9765750342213109,0.912816470815881,0.8824691688632913,0.6989918155776926,0.65224776006648,0.8117970045308402,0.5407964265719765,0.48814716978517336,0.23250064281977934,0.5879009782817062,0.9423516393228049,0.313115332787101,0.5777214990696253,0.18233422939241062,0.48326308332427126,0.02388298138149647,0.9300319936733588,0.06141991527381774,0.6314858511744186,0.7081572548091428,0.9590768088593131,0.5971296571068634,0.13343553015175003,0.462581013142608,0.9915387716049764,0.20884983939514967,0.11093123219509282,0.10718904191941947,0.7184173502599907,0.2033527389712304,0.5439078522813776,0.08322767711052581,0.3592416786081567,0.48682612575793627,0.6529654800184062,0.35672628576349696,0.9832977704434829,0.77926919754409,0.3272469587080118,0.4713794004508818,0.3942892393624571,0.5296354551737517,0.5379520637427002,0.1525955084923869,0.36862436474467497,0.17527915591881227,0.9708644238526525,0.8782961456552019,0.6984825972010134,0.6212383481537964,0.2722858356281257,0.46641394128776414,0.1616345796485914,0.5665560479137255,0.4950164200788787,0.38779434549256764,0.9677325880922065,0.010342093185468082,0.3623898703802675,0.00038377819471402397,0.071569576521882,0.0917521322835062,0.47691327539433215,0.16816508743236058,0.3512614485288883,0.7001107338820507,0.4693449278521178,0.9067967881705641,0.07989894380244689,0.27147441602591327,0.7326069924465592,0.44817414642366216,0.08902924642854204,0.3640355748966597,0.20223367092659705,0.08430233922482566,0.6260515028665701,0.9338778792931743,0.19523358914058542,0.13741271357076013,0.6118706365138324,0.18343882801948275,0.18230912726729076,0.4216167578265151,0.6287745112149479,0.21544072150143911,0.43496375354933847,0.38584917121628615,0.5498667234297459,0.023215553080568663,0.7091232204761864,0.3978776406764124,0.6857412080033978,0.5567517497523318,0.11735997554022504,0.13364028315176402,0.3828495261346354,0.10454270845655333,0.47436563043353175,0.8820669433241071,0.5842785858677226,0.4429320835088706,0.3049514572275476,0.28612593963959143,0.8413944384622078,0.7024068054345001,0.6430532887739016,0.7028024866137963,0.2736013737912122,0.022766674043196877,0.019954844704327845,0.7903426887348082,0.8020244474919396,0.32839870337978816,0.9859908766177687,0.4608920900857123,0.09790114342685707,0.15401779884516698,0.09288788506351064,0.31373086283524376,0.5439234173762628,0.8598228703323509,0.9817028782469197,0.31760962578628904,0.8017501999101322,0.029675123999512554,0.8996495989147415,0.30785482362812466,0.6514324112567591,0.2550968803846252,0.8613341299009232,0.7251826035794218,0.7971079256475013,0.7803472044594943,0.9286271691896146,0.8356527231690092,0.4731449979179623,0.64654760150668,0.854000782233548,0.4445557422384081,0.6331975012841689,0.6251132344969874,0.9478428475923293,0.7388469485708029,0.1903501247437991,0.8490590712795429,0.07863934330356015,0.2622926096562841,0.07771917478810364,0.3684748054660787,0.16952142273436843,0.42404482433278967,0.0004790718536473726,0.09088892841774232,0.36999440860122035,0.8759999738864515,0.7283230801865075,0.6047947228871151,0.0386819345154481,0.21587846524112675,0.09315457449516029,0.9619745364724497,0.291213427058018,0.9082915172124262,0.12892478722798284,0.3050631028894266,0.6533820065478362,0.9639274850206536,0.2877141217404988,0.6877179481728595,0.9949549230239618,0.9604752728647903,0.35775356124076696,0.6506432250312777,0.8190105680706332,0.6877868035698089,0.7516328851012553,0.47421505205429804,0.37354190676790844,0.0101006795542673,0.0036114527279702546,0.05460041408831473,0.5909409249520838,0.3780968265172586,0.07351490450217568,0.6572984771990891,0.01922019094251426,0.9184726469916369,0.5093059514521254,0.5612918058926086,0.368084601549284,0.08006534272068788,0.009601590680975658,0.08098640310932281,0.08397879043517897,0.41989701413958924,0.7340008448536173,0.9860587410738411,0.5499609385319224,0.8913775404254942,0.45193196538313174,0.31784896918384553,0.15085168423804696,0.6504320100743806,0.8623773859086852,0.5499035377756738,0.3972440530454566,0.6943211693889051,0.25865230752182367,0.2875172833387065,0.8086826661301594,0.4818413294165198,0.18787211594016773,0.4244950597190551,0.4649752070186022,0.6888505660760393,0.5571036285787969,0.39079175053662585,0.08292600132228589,0.1871945786147191,0.8402866330822067,0.8061105813069249,0.9233803206975983,0.7815612250120489,0.1562883130055337,0.6464440442535813,0.38052554142826533,0.15797644659331023,0.32435471450540665,0.417770298191932,0.37269223176894073,0.25420448417518626,0.011337825895658238,0.650097644191352,0.8187479226895411,0.036874426058592924,0.0033418575078880686,0.5441279699688284,0.377368412454528,0.5499959022095402,0.2681246647519169,0.6827832699913978,0.5162243909738551,0.4743593339646568,0.1572476255062487,0.8362892571874769,0.11936568716751639,0.5349006294815251,0.6195459081536319,0.6131044801716061,0.6871718663688076,0.987863073586716,0.15876654982577953,0.5649393022750515,0.31236986433830216,0.20108801162270007,0.2944793486103061,0.23889721996116786,0.8552213349645725,0.9343898633289924,0.40061112982598623,0.770756294780792,0.2652486521235602,0.08141575287305614,0.5850739486916643,0.7416405014185996,0.6761088646216598,0.713177631454027,0.6942793349997476,0.6299858137937338,0.9328793987501978,0.5346800481055378,0.9244659569702054,0.8399712750723918,0.27076901535288456,0.5464782098440297,0.998785401189433,0.25134485674303875,0.6516714614941901,0.7744086183177448,0.6812823090573676,0.25470443028188017,0.4059341700371877,0.4212544579222923,0.31880102010961275,0.152669054756013,0.6046714668344579,0.08021794427215445,0.3680739873887011,0.4465434738854901,0.15005247975595837,0.6160763515418326,0.559560378512441,0.5845715549931076,0.9341732557793962,0.9537776088017758,0.9713153254122175,0.4699679295669661,0.8183227851817194,0.4026960155669628,0.016136801224636788,0.7919011337133572,0.8214106854823147,0.2785222616703851,0.669396383811732,0.43248064068129355,0.9970914142567011,0.5991679652922204,0.741627740133316,0.8485615100311823,0.2419122508639835,0.870255685567048,0.5072740224361996,0.5484389501236482,0.050042455940261465,0.2987708908672768,0.865167373113158,0.9257962732165912,0.46062276483295483,0.909791088253082,0.9948286358118799,0.9286156927961733,0.6074384419020009,0.0251071764217925,0.49877448845548167,0.7649026199378928,0.879140963918688,0.31596341337801404,0.7051575041611855,0.5366393503932596,0.4783681154654411,0.08716134459199387,0.020789384838458158,0.2960706671000859,0.3763002604146388,0.036992977543222505,0.6921495879415489,0.04556557527268601,0.5899224286169309,0.357476227275181,0.45145191620551817,0.11912842152994285,0.9457560328904144,0.3220751217202942,0.8354548215885562,0.07276967007063662,0.13807428953018097,0.5655046512965984,0.7427005596719947,0.5605533025718521,0.3944936398265364,0.15253695393033784,0.9301663896564192,0.22307388791434923,0.9690746836313557,0.7858158869965723,0.7446605168041935,0.3067752272862987,0.05240567054809109,0.864063624479722,0.04201822932968291,0.9436434890113616,0.9493982660230766,0.36150425993148905,0.5163289319823272,0.28037590149888514,0.9465609619727138,0.7570319688657599,0.6806890880635958,0.1300225748010566,0.8471010336519986,0.6032978565133809,0.4168305584826253,0.10690015204367187,0.5709565410211515,0.2648311516648356,0.8780567101161676,0.5088953084736012,0.4334092327260224,0.6608414216348413,0.873210529434008,0.23184191007722643,0.436759317800522,0.56107382031977,0.8717069173332841,0.9376166977521416,0.6444390805084548,0.10246471482617814,0.8085349544844724,0.40160537947613917,0.3199975152803749,0.33729294445418967,0.7028120160546651,0.28426079279808336,0.6587060979704162,0.9338974030946099,0.6254052729595037,0.32191696195823805,0.8549037968158668,0.540934743108602,0.2642922395211036,0.42653716501820194,0.7172233979218061,0.5160392171451016,0.482665419014668,0.289035320282079,0.7301308280726473,0.5836496690292454,0.6740733834282826,0.7326183919152718,0.5672586767582353,0.3631434849970294,0.8217398321978913,0.5614597912392418,0.5803949755560582,0.9405473306253063,0.3815988122685241,0.7856195154982899,0.3484293062949788,0.6076986704574445,0.08192119771564155,0.5095530423318377,0.18553080954761025,0.5403794747219839,0.7824080242639302,0.9956316770503979,0.14504693183257533,0.5231286170192138,0.04539480793085926,0.46824228848062033,0.38372684808116686,0.5257088990176015,0.6635316383825545,0.3057775384163406,0.025213569588341977,0.08228779697111532,0.04428746755898261,0.4041900631823945,0.373480527391318,0.037211093590848066,0.9291742036556603,0.9399893280048768,0.9987952732105665,0.448761673720262,0.7937612894754855,0.3648445564863594,0.27339736506633816,0.552904209352413,0.35611712857876143,0.4452830700074113,0.6656831778458625,0.627292928279648,0.5492899256399779,0.7204717812072043,0.20710514917619238,0.6849816426464943,0.7820604344919333,0.16367907734542309,0.5553969414603508,0.1351301099429345,0.11289914883169971,0.041436815420799356,0.49217878344779753,0.022439299023438997,0.154079811177946,0.8676893007970004,0.14581899322368175,0.1154843962486849,0.031515860245278304,0.23349721923132405,0.7879758257320797,0.8226160391305464,0.14358826466817276,0.11680234565826741,0.32617894292914595,0.7597614460228737,0.7996927562064888,0.17341669709587748,0.04872759559821693,0.1494971094869202,0.7714276582484387,0.8503374919444233,0.5586552654188686,0.6552372163434554,0.6594729831145965,0.11441467849144948,0.597056983078041,0.16486103641182837,0.749025693206907,0.43187710799657153,0.46207492990360666,0.9663538575378396,0.2735850889786453,0.1798793430705461,0.7305344961354034,0.4308262145238184,0.43380356213540683,0.699083057436011,0.1107166201712555,0.7118875217369929,0.13379365217265238,0.7882496299424684,0.08780022785441766,0.9200446794555783,0.9215377767990995,0.7883716584675162,0.07254679690963872,0.32096875806943825,0.10264131906358953,0.045826397856165046,0.8651024062043453,0.8695855363602296,0.4415025846623213,0.09932083901577138,0.20711519006001677,0.30700877327559883,0.8425896961045551,0.20261517712025978,0.31491977882081823,0.6285931227202424,0.1571334795026691,0.056205618572743976,0.5597738960411112,0.6087195134277865,0.4080145245315583,0.7319548637322937,0.6245981763030672,0.7715667291432737,0.44497630905248053,0.5684195200955426,0.3307519968780612,0.11774038406822007,0.21094994415811064,0.20997524781970278,0.6349501391450234,0.6859255040031076,0.5090213664304504,0.8831331184659896,0.8136650195624897,0.2436843427928015,0.9982619114156865,0.20066278439457985,0.9992963696291381,0.4984267141786889,0.27740972342226966,0.6184215937525319,0.6204530719963965,0.37333807323812396,0.7763806713020798,0.49456458873485487,0.8323346187403742,0.8783131036294105,0.5483246257308989,0.9426994526184724,0.03476413444828741,0.6959419160852136,0.5938723366553871,0.17676904794756187,0.12010769974363988,0.9590964412349272,0.9787314917745793,0.556438508783601,0.6463752811147971,0.33989036979200593,0.473593731089198,0.14708037660887063,0.2805823012501931,0.640841764322877,0.2812294934381778,0.06364657739453272,0.7163356034203305,0.748024080619669,0.5737423100722925,0.5701747508369648,0.9312407908349813,0.6288562222034078,0.821617985221615,0.9544486268116974,0.22600957357565443,0.15352544059415663,0.1283182017177189,0.28413798987855965,0.7471954561297414,0.7847317894931058,0.46536916699833486,0.030294142000542257,0.45515993333980975,0.6557301758944791,0.5325857084907992,0.3292207887701286,0.06500770582474646,0.51310544972899,0.73162537758182,0.8495443845209552,0.35884229978770366,0.28141565307041483,0.7986930359467259,0.18865479943206886,0.6270809254440823,0.2584828525970755,0.7958487664846168,0.9583123921605792,0.01226798463444001,0.41774797467153624,0.6231514807690204,0.5561398533882358,0.05322011327011689,0.2933933253109555,0.4964674365922461,0.973729641539685,0.05444634053641084,0.5428312723883264,0.76628632805294,0.8957077942388463,0.9879282322826635,0.5388267894363328,0.6213004950254903,0.7721861191242805,0.3424539016658581,0.05797509980876314,0.3994654795911108,0.15694495866712188,0.5072915808320508,0.42476764340264617,0.4672811830661434,0.8517069168271132,0.2430614189772784,0.849170440674033,0.245852434860365,0.7281514731590315,0.9302168591244706,0.937108131101644,0.7515431133712263,0.26057613052210904,0.01528944716662295,0.25717380160799364,0.7486296911607588,0.46883483626561895,0.4794510944522823,0.15267608925297194,0.9105287890055451,0.04500175354287661,0.818061637311136,0.5117848108832743,0.26252992246818363,0.9780729302800177,0.02161255920469518,0.022692253381302763,0.648446865261354,0.7850589154809864,0.791868391259837,0.5317541017447711,0.07294526452440553,0.8856472515791476,0.29986951498815584,0.8135324375522259,0.027208698684611177,0.04463352396593989,0.43821633400745297,0.049900632199075146,0.9837981159679086,0.6956789691472183,0.3202228795292881,0.12273438587736174,0.47885990079795815,0.047734568366182284,0.22216773397672496,0.9766515523632444,0.006303652391506542,0.8226285830984532,0.5020375560464982,0.9929280577204462,0.9131170623941562,0.7883616343197428,0.8685178265918649,0.03249890521505394,0.5214198250245408,0.7548588278603865,0.9221016545244858,0.24667041763723985,0.010103951862608707,0.5190086829015705,0.8165014331058882,0.5120180933477188,0.9998476188847061,0.7566476330082328,0.5100969941675855,0.4714824589015145,0.778456478021518,0.47657000972244856,0.41281606213499455,0.27608539985244085,0.7403688661990864,0.7982795812397883,0.1202038095358895,0.298254898888598,0.9243402299511256,0.8969035518852693,0.4303264554106043,0.9520653170972719,0.5390509228426372,0.9472643834733574,0.5298775119820127,0.7275074240281658,0.7552426188039549,0.2718001557343759,0.13703494735427224,0.46611771366706733,0.8752224756551534,0.5011769137645565,0.975788454584176,0.896343999365764,0.7490575508868529,0.561131305086982,0.8509334321295834,0.39124837080995767,0.890649974734818,0.9905583088944405,0.3544203478977266,0.9459630749797019,0.22493621979952017,0.8318325326561429,0.3955079666890735,0.9136881767189176,0.15497040069867918,0.14203987740061108,0.07339333597928133,0.8634555181989934,0.6727270979028024,0.17082582863916596,0.9867267300330325,0.3198374659724321,0.2727986185441267,0.19076669722948614,0.9348135715342913,0.7326445595155986,0.2054966160211642,0.6642397002124933,0.7938111672407657,0.8129285482218118,0.8570346861215348,0.11812045287664619,0.357145026715306,0.058872869945041595,0.30832968805847094,0.8931239257325387,0.46214034073331933,0.478272401259209,0.1781826407557272,0.05752810111875406,0.8373238650548054,0.1181312264570844,0.33178705131515107,0.7625293344571888,0.5254048174385741,0.6318051220719016,0.6762397397140607,0.8425640395153142,0.40322042194712115,0.4876921466087567,0.45307804513681726,0.24043954621449215,0.8619131372618789,0.02687109978335478,0.9066768148698165,0.7069508943363911,0.014407204792580064,0.44354278420687376,0.7936597221815613,0.3333170668575418,0.6822096697577593,0.7626147852456171,0.2547161082947811,0.4648372746297065,0.014810825436738506,0.22309874086962633,0.6841650337836993,0.9346053517305275,0.29861894814007983,0.45696954301702064,0.7512002736426118,0.26636176808420564,0.6936793733460567,0.3780347746142767,0.36241691667573583,0.8389964290680345,0.6516618130014042,0.744981520592952,0.5845128194595872,0.4569517047427629,0.5558167747814231,0.9593522204606835,0.9117922477075131,0.6790229580157672,0.07657490043412163,0.7303673601856115,0.382635588212237,0.778193044025024,0.5837066958824197,0.7674297748077339,0.809543130154192,0.6519855488201407,0.7280928551298254,0.051129042963499405,0.9396277607659236,0.5778551081289998,0.5087624699698596,0.20417219255612085,0.303594856643852,0.6096943351715367,0.3350323622062341,0.46832863489832954,0.9613621078311643,0.023400907909362445,0.9036932425643345,0.30696873243618206,0.4841584236770333,0.9829570713890723,0.5638331818420563,0.5844877051052699,0.22414968037028404,0.09108294897789482,0.9147477488397546,0.308303602414592,0.9293053435136811,0.26744418091675914,0.7783496650260064,0.2601761440736754,0.6717933493491404,0.13911840642217177,0.039066749579476534,0.9031524770079149,0.7946850514177337,0.5605904818158929,0.2937090822299766,0.5033073748846959,0.8173405194736898,0.24253114843340873,0.4253412948575461,0.45366111144785437,0.6496924477142298,0.6569200078967505,0.9837084888639829,0.10276845611234808,0.8379736925082717,0.32025708095629457,0.3246442795056157],"b":[17.150793653305968,21.826778984813863,27.864610451607604,23.897279086421737,14.729687359343455,16.756842672663588,4.180164056590829,27.21778269601085,22.76843270549374,38.7887985607897,8.313416651221477,21.96699431060835,6.893896289650172,19.662585576617015,22.587623183093125,26.197844426859568,26.026670234966396,23.583807199990986,19.3011778506855,38.804868583858095,25.24206163288811,11.505277597370016,12.319102410379967,15.067871323627958,2.1032870354586297,29.046299460593225,18.18341937280139,35.697316867958065,21.523333143977407,18.710008121698458,9.102637788751636,9.360123540741707,10.825533968471929,8.816118372251207,19.4098383063259,7.352781786489095,7.345135742275097,16.409495689321922,20.678556809033342,20.555655449280135,20.62235835847286,30.55866164134816,17.18087817968252,24.284893975175613,29.522180374181517,19.300730791509125,13.314485540097266,19.579445594536054,16.072185741892437,11.410728633305517,17.18228948617322,24.017295842120397,5.132966648094706,23.026989322667617,35.35878907500614,27.04207400890995,18.850708112627554,16.536965456047675,33.71969586587011,9.040866550944795,25.932712454241276,26.83382124097543,6.379931039714224,23.469133643520088,17.29467111794253,19.037948115772647,27.573216566322277,12.943377840314385,23.380236807263895,4.389515491959481,19.67207891857519,22.229979254018883,8.07269708204316,19.825402457720614,5.044252945404435,11.908818599913836,16.398161519109195,36.04550047772276,23.041501196680517,18.805378198413138,27.359869364137722,24.774748989068815,33.54433658939537,30.95410526249075,21.226992208114748,27.726144014814547,18.458947873914227,14.437052735394902,17.613267670914176,19.290168094769243,21.28381192718496,24.905513528521514,19.765658646222622,33.47484949313488,13.22629305741998,32.200915836307004,19.584810709644394,8.088458825108447,25.963901790294365,33.351680043641935,23.386568583218402,11.177113328450629,22.55341920009289,15.829890590103846,19.738581659408077,37.92942229338365,25.311985013506085,15.807860866020974,13.184286910735395,21.09651005343057,13.28469777973553,18.556429080196,32.45470404669524,6.858685041976829,17.190126263402604,22.54862402867285,8.442404554440985,14.57183591662034,17.29904808529991,10.067149757032926,13.412062671493409,31.98804833212609,17.18008758584967,24.084089306600642,20.661985792982044,20.312951563367054,24.057547991153584,13.548460381084631,12.868663010994826,24.0190812608533,16.359653798834685,27.581001212485283,28.6783417661526,11.098520392848052,34.62440263297047,27.340350489917714,33.845045323720115,9.744822111160385,15.356337368968758,20.960656613746927,21.09457472875137,17.268811063744387,24.975208611922408,13.859256733098858,9.939183438395327,35.54183160565453,33.769226479605194,22.460290620274087,28.909791362831257,17.1163431365489,25.998324754807594,27.86380259717425,16.375136600752846,29.333430765912638,27.8680443697341,6.984215149531954,14.997014359563618,14.785850368434822,39.12229468589413,18.784564485754917,22.336574147027,24.261646330153724,20.610364080657362,22.033907930949827,30.20137570114468,24.295383715696516,24.415030416475602,31.651956626537885,34.77158196697188,16.59488464232931,6.813112155585919,17.812431869966968,34.0915984203373,17.04372654038812,7.365104458140275,26.11486700701792,14.199297550960011,37.86897807518515,16.094883415253683,16.501383086744692,23.5273032263583,34.79511777347585,35.85289235547492,21.375407179368455,18.011834550407862,31.064599347498714,23.139064228759377,17.387939743592966,30.736313786241205,27.601448186940495,20.50471428736504,21.95802001916674,27.369792782795127,22.422727996263184,20.38465245292823,31.37348373709446,21.00587022311559,23.33332764065987,8.362062417132625,26.829179492695857,24.62529625030411,16.93409519796873,13.387277327994997,16.159669820723735,15.518082376866872,25.133328001709998,25.932061723847628,38.70334598264496,26.672531926482407,22.449924653314483,19.138814244122667,19.320690053319623,17.23607320896507,21.552516073203353,17.7946355172039,6.639327529478916,32.571371113411665,30.167433355741778,29.284027357930245,5.491759491197916,26.584982021412014,38.5808752401968,30.887709858280445,19.524098809097907,30.15181362900322,18.053034729143814,13.901891457327508,36.1461260417102,28.04867685171874,10.428883551462986,29.054670137795362,20.475475130801186,28.6964746190539,12.192529605831842,9.476629555958343,30.420776532750487,11.40068752417239,11.264660233284296,20.747235324440155,16.423780656640197,29.282734665800582,37.91814106449456,10.020721869773311,13.341034722437037,8.701239979267367,19.756757548068116,16.164191970279816,13.727686092711755,20.51528410535103,15.964371904337948,21.99658405616999,21.900259394972217,15.502635232500637,17.31665759765768,22.841943290523265,22.757751125261816,16.914113823846268,32.74320090674871,13.315602221861536,24.40517972177358,11.798457999966585,10.026145152935761,23.2454237739546,18.491358482529932,21.43183306040104,18.780246557243697,26.06295008538214,20.735174494542523,11.42956648478513,5.577921329385069,38.34072225547627,30.642725628159067,13.582374293886765,29.22722179152204,11.068459701158261,18.43931252923844,9.811377669637647,28.040199107459717,33.838128317904996,17.69662115209973,33.36768730510704,13.057059703269559,30.330951330846705,29.51443154514383,16.168209062628314,20.399480938599503,22.560430301586223,21.390530429900085,6.099229156292352,10.436932417195678,9.969557065653841,27.641144715489233,23.68034115802161,20.72488325275399,10.370817629050455,17.658351389730917,28.861873922436896,23.142975713442866,29.420498059466937,27.89410310142608,25.253352934251232,7.961804114758002,21.70282683920324,25.166862307157594,16.55695056821206,11.504363318493485,18.442514383617706,8.454901754190267,9.16022887806311,22.201154658028194,13.064543150859013,20.013877746037654,27.77270367924386,20.92818389037241,16.817266218182322,18.709251400551597,32.71375486258175,19.85172613911481,29.138303604356977,27.357941803993857,6.632471595759979,20.804638554490737,28.2206254713269,27.418278628530608,32.42361670554742,24.45944197283278,31.33171679084309,30.47096350086404,15.259811963753812,16.836779188290215,26.32591822310062,18.90158740930503,31.536185624578923,32.4685075525437,23.30808629629444,21.347837429708868,20.738496520754516,12.03228205179169,18.328431667190575,12.993416769771372,30.25250544859114,5.668342745752484,17.728469806906524,26.501642804121527,11.001470274364817,3.3449558961345316,20.439098948380835,11.426078132026568,21.377809206450582,3.8030264088383703,24.600391880764942,12.698141476114081,12.417715060878699,26.393753024438006,20.06110144979131,6.561120412239361,12.498562844992783,12.733422768224912,17.47506402973544,20.375436507416833,24.96001644968827,22.265717053184098,17.518619279080227,11.684464265746959,33.47203602672071,30.720715359630933,13.613428103038817,20.33662697110565,31.747314964663307,35.99147794881743,10.668116927053566,8.884156957858318,5.428582897499901,17.98764508717321,31.22039395358508,32.03816813393452,21.041485250862813,25.292965651460932,31.141853022306137,20.193590730981256,24.526258888886403,21.583403757373667,28.262545510677327,33.525044805371685,27.295062670745818,12.503397986788869,14.110887370231492,15.0846848671681,16.211667614421547,16.46724512182937,13.121768496860797,21.09558523074216,13.367882874551903,12.284798425705068,17.032315645434437,10.008333936180009,14.671720624902798,20.344709654935922,26.283981065829373,18.794205418445152,12.133798579926875,15.405942016998301,21.34777491333297,8.457018365948947,38.15861309351696,17.02965689353405,21.9103912285021,14.86898167996543,32.25275724481697,19.959035477199823,19.573991348766878,27.12479268255337,22.77657014988396,6.911857825136405,9.167791574185461,6.535622198300621,23.584040822769087,15.230887138144515,25.203773791767222,17.43110749080111,24.82476496154017,12.306567140934636,13.442415149695517,26.386443008701242,19.758514954620228,29.62272622864856,17.98251137703263,17.915411595373303,18.66042137088006,26.655063946242567,14.213376319550242,14.65893167706215,25.602356059747756,15.426381815060214,21.618281808438642,33.656854023164996,11.786653747969083,19.09811593134098,14.798924444000207,28.27366481266704,31.585935230381516,24.417813187309825,24.361224994240594,19.31287508689611,3.1500757656442113,17.60628111774297,12.568080062675993,31.141758349590432,19.381193500688703,14.027587646556414,32.69181292726797,24.839986612002406,20.296900980050584,30.358252751751376,7.895019094598781,6.119308803107608,14.966292092563016,31.33669802514902,29.557188575103275,19.30633409625191,28.446076593424625,25.940141580132785,23.599137744328015,30.279734247262663,18.34098847190489,8.87594303759025,18.581067297876736,17.92168266216034,14.39459316157923,24.927103610212406,28.533513128606067,26.089679507488803,8.264284657614859,20.875614087803434,25.048206628800138,21.092031161528045,20.53977703403348,21.219288495076878,30.502573708228795,23.825963788231725,15.982981440396472,13.893993718294464,20.123131070781216,21.915152355403276,29.79386929655241,14.80939612493604,25.296780004235394,26.236332051606315,31.661140797770155,17.514270686733767,15.920650695865234,14.043820857435026,18.54278418549257,31.932231120245348,30.483498181598968,27.65419767239379,11.163946573500754,15.203404361986834,22.50855363265635,32.54402943938899,21.706569521329467,9.030964242926348,14.984208565577738,20.08222714548548,14.17988959046873,24.447541885724974,19.750233715766218,14.118792670359674,24.43171580971716,15.347052674700453,8.995313758052905,15.058428558929258,24.689265755541008,18.14982539998531,19.659169955808505,24.029302384335505,9.618519039892686,27.127172975956253,21.78616522836113,21.571896611895767,18.87156303298527,21.676159331867897,10.2850988439744,8.620711290616235,22.585584790747365,21.11828766828274,20.426585733118685,19.808757137880946,6.436931489983606,14.435768184440679,3.388860098647064,20.374946273298296,33.389726195357994,6.0281010863098805,33.12229025117041,24.96854717482518,27.415703887827245,11.676584895453352,29.548339082122126,18.17487116006445,29.000478718280597,15.046456512098452,21.50181579204472,19.400569904659502,32.4568888298084,12.782799891253294,22.785073384778862,32.78236514802455,30.50736906070936,15.05366938561399,23.389964680266758,7.972247040076819,23.232399057736934,27.503505185888084,8.57403909578943,19.412414185996184,12.4849957065892,24.229117152108547,26.07857260880395,18.100990786955915,18.092270891488454,6.902169240297815,1.1343919407898495,22.544006025901577,16.587273900159452,30.98915248770979,22.832715236917775,36.123147400894496,20.294150729543585,26.250785351040392,24.732533374016946,33.61382462696598,8.12974029250399,26.43483249401819,9.591828479137158,13.379087210829521,15.266029730637914,29.248967509488274,13.903251394180703,8.731922499387913,29.729172925220908,26.60415503285861,11.973960604244791,14.972026461427124,17.219002980526877,23.625568900831034,30.85819413990798,19.822638278620545,18.24222578800416,30.58346537573331,11.037322669182531,14.103999299259527,16.677074134386753,22.889061109289507,20.143641739258907,30.439650295059277,27.486773292492682,21.16598376729761,26.159907984066216,16.04620134501047,23.088207285016043,13.727077360414134,23.59699778122801,5.265336932815745,7.253945622340892,31.525524797044636,12.343524080688937,7.260896064720854,24.498305902390307,11.380707264311912,16.584181343473965,22.74575453205934,21.476288185565814,8.7727195627183,13.819532317185175,25.97842671333458,19.854463352436795,10.40105847116726,24.848944605158245,23.43819683776573,18.319767664809348,13.164288902095436,28.09343764140226,33.793080342698396,28.239512641614425,18.208639280273683,31.691061453940698,5.9089020297505135,25.151832910264435,18.900820572622408,9.46212968241824,21.478487620085605,27.11693813711316,16.30329829461028,17.317179417657307,19.561962591423004,11.665044031840768,20.678792678795613,17.009360451709583,21.624319429277705,26.75501614466978,16.429103394439274,9.963247278344562,8.141405518152043,29.534330703911223,18.679660050546175,13.687241941812356,29.849205640857026,29.962101683745967,26.08054295543743,28.638043766915224,16.899125816951504,20.148732113443483,12.641991229905267,14.936302773153955,14.571234057848041,17.118287219277143,10.61045639330412,19.843494203184033,10.68154286763567,6.568656191072222,24.610295898772264,30.443614182126137,14.372297365319158,19.195781586661763,17.185152354299753,30.44800711522477,12.526641653429515,11.683931917723266,14.730131929546129,18.815407165936804,11.68071282611999,15.293163491939561,13.108697843211704,16.75696937095028,26.811341504767753,23.433214327070722,18.584830423276646,19.265140906582474,25.235998800485998,23.585553480235017,30.193533647604063,13.315440283928131,1.9163742803201522,24.373830478146882,22.440355393713467,33.6564118940709,18.686142416837924,20.12781785558071,18.93620568505456,20.126955972184447,12.86646857577249,17.34452104986441,7.388125036958293,9.179940152346742,9.864297392031975,18.45446870865956,7.385100423520998,31.192164081699367,15.194777276345572,10.783664273148943,14.548034044628988,20.279635287664345,39.23498183944844,5.637968873399073,27.424837233771107,10.367022968486857,23.822727350630963,18.729120039643682,26.187005502914978,18.494488087630366,14.291281344294152,4.329873208824764,37.40533722382645,31.0532013561387,25.74478923983264,24.504052393198783,25.65320796960328,20.27343456419329,38.80561303229129,28.29740955087768,2.602252628341115,17.18127699412325,5.3632396939124805,19.96423160345066,17.715139372559076,14.185050821628643,11.601295271687118,15.803392809177872,31.500221129240067,20.7702082180789,37.545654227027,20.17746633789647,15.962131559003168,29.347450812858384,32.20414839077948,21.004228417122913,9.246166676601234,5.979449419616079,36.800857559914206,34.7675674321424,20.83856199341162,31.512813517560478,21.23983313707313,18.026288453986623,8.189667407546075,29.169319831541813,4.319843951646365,10.944030052933822,23.27347182218069,31.486955141870762,18.596123545185197,25.957243454490598,6.932894591413086,21.29697038984601,20.721649601617514,23.80075004995759,19.81386754099188,24.440532768412943,23.905780352447664,15.456031180183976,1.5758848944180937,16.166119538933167,18.93170367007352,26.520209704831174,19.272649263294444,7.161170096178946,19.804891494694914,20.69922751903222,3.7078862672291457,13.145330212569881,18.604571755910655,24.331279868347366,19.303762967132847,23.44146198642579,25.11759549270148,9.07021311281332,16.956880688079867,6.854508709818399,25.785178777525598,20.990546576069118,10.361712733618482,32.00277822812458,12.640074420836388,17.67740156250724,18.258036730422713,15.691955325923477,15.499288995825161,22.750900737827823,16.800627675610293,17.26759293238569,22.411190014226484,26.989535442924534,17.891804332979685,5.2279275033016415,30.42800539621851,34.648467152854565,29.346510106600558,26.408766870562133,17.785614384408134,28.631685331804498,29.751057277410954,12.104684221344574,9.076258163538471,20.141303469334012,37.374918403419485,14.009611658262227,25.80613554960763,22.156283058764586,10.668865821592624,12.445543791195174,11.016384792624454,34.62642336594034,8.895654054815454,24.508304024027137,10.589635292278125,17.808106626983506,37.15598274389842,15.053275345111906,18.04577328461359,20.63705017586652,5.971525110194196,4.32025364179538,3.298670609315426,37.618365868015665,27.96961373628841,16.049052001486537,4.266979969882669,18.976825966289294,16.411127314134824,19.083312529456993,33.97747695416889,32.82981373952552,11.358113305718778,18.327262840684853,22.23468405218732,14.789142762149353,26.158285563444675,17.059807074705,10.054282703888383,29.62237868048742,27.058489285577053,5.796026054254972,34.158901838009115,26.746019769005233,27.751092830264074,16.285562945615908,14.577093617323374,26.470224607573982,27.84357289880159,22.406904339310387,20.204152729183033,3.4446331179650524,34.02036250814879,15.682129273755422,20.177430709758394,7.074678508905832,18.159071932122966,23.998523852305123,17.345214908654523,30.190726787393366,14.825851056689569,34.367908115497485,5.064888453836369,31.027981880190246,14.793936928754304,7.7267624552248115,21.567963627240246,31.414563948262916,23.609006041185555,15.997986193213979,24.164259746618903,11.033935258011152,11.449156797662848,16.283370818057023,30.636565641228717,30.792514881822346,25.539376603837184,30.80952948308265,19.522715937315354,22.17552440873012,31.825484825864677,11.303677004429403,31.12122368861421,23.052159531097175,7.794051559126434,29.896996700685044,5.137809756346581,17.163980781564415,18.082227726841964,21.775256629311137,23.9323816742314,28.150329444210534,25.716840647125345,23.392391516607354,11.892447944982209,10.449294769834044,7.356709691371903,11.365478515309997,15.362034263501421,15.08350974292949,10.05331918122575,36.29216589611996,11.774581899168922,5.362111545041093,15.679984822406979,22.31647416936006,25.510673969388925,15.506635807794318,21.741569849471865,8.844729536556098,7.001537698051816,5.496974660398926,17.113372718969355,6.398679233539517,30.717610571204176,16.816139745726485,21.946629651110552,31.714460132338438,33.03610422112858,32.657232069376946,18.959043650048756,14.811955862783618,15.4813894491534,17.845276320967624,16.179753867486404,31.262695110757484,14.78238449611954,17.215778127986376,22.749391349538648,15.632351497013675,21.481589784460816,1.719503755498062,36.34265391464813,22.474841931321862,17.746628988931175,10.325201061826554,29.498237679806063,21.069267821438466,17.388666085661097,31.156205733505992,37.647979617318796,25.65291508917217,20.136152587249125,17.448543305928737,26.939502951534404,11.639759715741487,24.329209821727055,34.110668643079784,33.038352732903874,33.76216148510535,17.300203004931035,9.64672531359235,20.580683361018973,16.138064536925928,34.8629632497314,16.539650074388376,20.311532757200315,11.390649307759752,24.352933910789535,9.88580243654713,21.467112683242885,17.022688562358663,15.464546218237881,13.591967123299845,11.030716260406566,5.302011697363991,21.002687275760252,16.100401057986083,24.270545222336718,24.762503702214133,26.350301117385023,23.732772133659306,17.478273208806428,5.220599978605329,7.285994019848436,17.86376547653909,4.353989687837858,26.308507026495512,18.63090277475569,25.837322826773363,26.886389427961063,16.654272993104062,23.014797904505606,22.379877305182106,15.006074168995754,9.983149694725316,16.68147494125824,4.796505013339423,33.64366158167673,23.893636354050862,25.1884430532364,14.711494903151685,14.858768501432063,12.301426694204743,20.239166930013724,30.18329985393505,17.17970907925435,13.478532379944227,20.18753590537439],"a":[13.403618178187223,4.235575161755585,13.951050238559773,4.327127102879547,11.800746563918626,1.6412053725570352,3.2130008580380576,9.915542730776652,17.488790817599416,19.574721158139678,6.017570167644162,11.713667346169556,4.616938771641741,4.94091441871944,18.87597387814847,8.945097926291288,15.363528853852237,11.616474050524076,1.4193493128305645,19.79969455389329,14.905998217792579,5.075644246545443,2.746002050520824,7.118134912566361,1.8971992829398188,14.632482744241702,12.079668702860463,16.20096056047513,13.365342183733254,17.619826172779337,6.476328766015533,6.57434130777109,1.494807763350936,8.725202763623257,4.806758311762382,3.4246372154613924,6.446528862208809,4.083147029679628,9.391574767290493,14.921289926304834,0.6617260897921406,18.71346541808893,4.4684950460709105,14.751387834775986,17.728822237476756,2.4051254044824066,0.9536021878611711,8.424704739958472,14.877076337212962,7.1947048559262505,16.43220081565878,15.463531264304823,0.22324793952805067,8.812234969517188,16.226789527041365,11.821222554477187,7.762302439208302,0.9032628622767991,18.890471759226102,6.47019910273154,8.530553789962774,10.366270387180748,5.6676191742540105,14.779725726666438,12.598123283169267,8.687596129494338,10.957402774959672,8.176509341049227,18.3013086542828,4.070158497277463,18.547605946826508,5.0079950063916145,4.266698610981985,9.961919391168577,1.8619337872060138,8.107493543859903,0.40321143706504525,19.822836668746824,7.130576545884235,16.759442333145486,8.51619359673971,19.379432043343506,14.820365242315706,15.73626342940372,10.354212753616663,8.525107958401815,7.465778280115831,2.9722109273193897,8.883876697091608,15.732869134817271,3.516461915382343,5.894017622059753,10.008509027565623,17.809403885956144,0.019774084273733727,15.294884428040291,8.880127126660708,7.7094500091534535,19.68233964240669,14.30554702397453,16.40703889625824,10.300320357111538,8.213203811420309,7.724939136845448,10.096126850146785,18.755644007793126,16.840668513201162,14.830915707049318,10.390480809360824,3.3286129757177285,5.034552049403147,9.09507188555375,14.951502248800686,6.334886647836222,9.079951518186622,18.650275169052595,5.879120906029711,11.745401453179287,11.49302589587399,1.6363034318480585,3.342650232721751,15.643918332049275,9.941984158049557,5.51064157606413,13.23919252956168,1.3582621220602897,14.134593711985733,3.1618965685693157,3.751929827901326,10.158851900106999,2.624388816042429,7.829826119040781,18.132791025939063,3.6079559964857255,16.66329759601101,12.625089594156233,15.946481453579668,6.454774494692619,8.132473067301609,8.23722505318547,15.596308753970792,12.035210346068439,10.744863503756052,9.787297066773228,4.266914965821713,16.26750820559274,17.757897943125904,8.90289788424134,9.524070244670714,6.9709909017516924,9.360728247629613,17.21205857883835,12.844080382517383,10.809027452274979,8.667300258375237,6.119865248477576,4.748571491420015,4.948817490616246,19.23604213140206,0.20794612853768601,13.288487449484535,12.22152748204599,18.750184553743544,17.99156509262739,19.711859624810643,13.647408054966279,14.514361758536861,14.784312848745017,15.18692696964251,5.0563760250746626,1.4706447962509106,8.719797845650277,14.898312592553417,15.21534035746206,5.4360489012055435,17.566974558492955,4.056797611246918,18.860202203638575,1.745217200455822,10.833090394050497,16.78407441349815,18.012648156207383,19.950833376226875,4.698811082448269,3.9370204850716473,12.61252731900524,7.369145806760948,15.588685819440746,14.508726579043056,14.730710982298127,14.293666667861377,18.767510960668524,11.961669290840518,7.568287736948558,10.01687726975459,11.624216802010068,17.378714924821296,13.765016371194406,5.862191560995256,10.897741371135773,12.485307891200259,13.889615864182186,4.794409488087492,5.366345529548231,9.66822613082802,11.655165438160878,9.360563764869823,19.424823215012033,8.28857131028756,4.969993341601997,9.25043832498437,0.29133867509931743,15.832652863654975,19.125215882384726,11.616018647457631,2.109560184542545,14.086292064011396,14.747778355941694,19.963642801689616,2.4810720957810384,12.982015365398297,19.39100099689626,14.941080281152823,7.115305676927619,12.851161192705334,11.94954409740447,2.7825508319413172,17.347489584262693,10.381640549196597,8.588954905556276,15.066811984677075,17.4764566695254,18.74600539513785,10.157653020311642,5.445487485186442,19.59133658706182,7.386258693009533,6.838236483031022,16.1118471918402,14.763490797913832,14.327438513379729,18.754664168701133,7.359589912252273,3.1702094464580766,3.692259733662726,19.625577062123906,15.191919239956185,7.948886199928302,9.538962841022842,2.4343845606111536,12.939377234897215,12.036173770257488,11.655777122486505,15.038747428624713,8.746748469493436,19.193992022587114,6.076111604973806,13.39576011898532,10.066234705014455,7.9032771206617936,7.461106250922245,8.343470737574421,16.12313082301091,6.4874937916240505,16.238544563920698,17.242630373294155,14.550571247797128,6.236976688614586,10.567856039585713,3.9466754030842033,18.79365975658665,15.428089606112438,1.3989355435925876,17.320938612311906,10.509675776289091,3.776402979829805,0.6576438061678092,19.07177982565644,17.708870396618124,9.640443196584542,16.295329676183798,10.07333045536203,17.729449386060992,9.752101441449174,12.276986335217437,13.935840921502965,8.246831059926816,4.240047002126945,5.994286411015399,0.574252663557715,6.629911546201717,15.559486753321515,8.98499154646679,3.9847938251279214,2.859080966777774,15.28587783405765,15.436863838325241,11.421427336324165,19.98478499130531,16.039968365259412,8.105042891967788,1.4334588924019576,9.707716867936664,5.702836138624607,8.391787221572322,8.076394949751604,0.9061381550244452,6.6926296056956325,3.3101401058942104,16.737877460659426,4.44565368693683,3.6510473468766724,15.999200087959284,6.316086718515788,3.1601177056156438,14.566287990945446,17.758229132670323,10.555988948936887,9.614951942665272,10.653494266288416,5.622791871301742,9.292826468091434,13.013658260162444,12.772378292425714,15.885281191222514,18.6635571285981,15.186559863083055,12.506341894208347,14.749384449169094,12.52481145021855,6.61890250877859,17.592359808786124,18.52465065868995,12.875365800360425,12.589905029758048,2.6636523330784545,10.530167844743596,3.9711447075495165,13.174715180360405,4.784219984883804,14.686783436363804,2.6258064648802515,12.363111538720837,9.348191023332348,8.645731258778548,1.1637822147763588,10.04975278186727,0.04948542486953755,6.18546774634622,2.2639439460903166,11.226265876493194,7.235992679229777,1.716448026877142,19.094160557533115,11.632184978196412,6.039742094594702,1.4711932391586657,11.003912442240242,10.49755343574688,1.5424153182618072,17.267109957550378,8.785183277400757,9.263912412842288,4.78704825113816,17.515202037267407,13.776117360187087,9.496295742662205,10.50888025256095,13.09288853965288,19.53890267442642,6.8067884751276075,5.256549958332366,5.31072508582576,2.560879831379932,16.7689603618481,14.766010751644618,14.797382722274573,13.824646413161595,15.782982819004093,11.905205417571288,5.654046711338538,13.09119477634486,15.068518047878499,17.749980455363023,18.73267407422544,8.930594176040874,2.6668725997499543,2.2167206730251543,7.254749946663757,3.46602893944024,3.2864645047444974,8.89259911229352,0.9785268644870504,6.347544919878354,10.161911125761748,9.751559228492312,13.041074030147982,2.054265213102444,14.47578384149213,18.607231582964097,2.1736018698180493,8.524968509408225,6.781701136033345,5.087867282024319,18.384548233376794,12.351287992512363,6.656555584410411,3.0620482144152783,19.342207352590233,0.43873529124122346,8.493812429132408,14.24406816694647,17.11617292062924,3.586418507559501,7.293565354158074,0.16767884381589937,3.9692921710283757,10.285392573736845,8.305415969747504,10.329986875132725,13.259083968508044,4.7917834584476005,10.127046470191274,14.324906419442751,0.5139812512971842,16.865317136927388,8.142833510484465,16.747500457462053,6.921318751690828,16.17646023555181,3.0335239720270346,7.981781070396523,19.594738197865222,9.233894594616379,10.02827916004704,19.49345546106121,5.570532050188395,17.192363004292076,5.525845047749378,8.781455099911181,12.875099657033209,11.775203268434616,12.465388618648943,15.801895576631857,2.651006128125859,8.422837592386522,2.6053203119092894,19.289172732086534,1.009209813461509,0.5722657789560692,18.287386812537644,15.175834048456718,5.390520557630238,15.005706687910351,4.120763089159403,5.974448382661346,6.658752645740198,11.611296712536028,10.519988969326759,11.9417490256517,15.036409868045887,7.9017979429241025,12.834834173965376,14.64538923464099,2.7603800561481906,2.2903392219284946,2.8297522801553843,0.9622696952146859,6.385863370394689,10.154587613687859,19.27673577327554,7.609648595686931,0.6988630061323553,4.300029967263428,17.537487070463285,13.474556731886715,19.92369594970445,7.245690646257477,11.320852753701951,15.912845992463339,13.508490707477412,12.805904897687057,15.323463015945302,4.413459287102852,17.04077709730759,3.359293440880653,18.554804150081235,17.121913583369714,14.219831384697287,5.970329385787334,7.161096832796208,9.494424351133732,16.483461450607543,17.940481590173842,19.2213626217205,9.58370751408081,8.553929288335773,6.334853154593478,18.002699163616718,16.140502759043258,12.546597890227872,5.541427152642697,8.326253120402693,6.126106338822894,0.13377719689513956,11.225232200300121,1.2830222204527386,0.1820747349246643,17.70837258456155,5.430671097822852,3.6679490860030572,14.8993019108703,14.756285151793751,15.581863679421524,1.5878472337205762,17.508209363128124,5.91135022249162,7.8296418208514895,19.418544977931724,10.838110668222761,16.913858713008576,12.373266652493008,8.451665545050822,3.1087950126810338,2.969647958497146,4.482271613244531,18.608625135240366,18.496492173085322,6.320828672734424,8.567483632601176,2.0300785009282496,9.080688819797977,17.51440015132209,5.459314901147274,15.049663904141344,16.877631675060513,11.899195395388897,7.035549022786292,18.427001269545052,14.18470218079169,16.96687970853441,3.7561524770458643,3.021912649754146,3.8953858221804127,17.12828967700615,11.92490686138845,17.03737698276338,17.32551038803845,16.77640158370522,10.829844897754285,5.438913605039297,3.2785089169567483,6.955004534775999,13.533731787909073,5.880812377807154,10.73013493962636,5.696318495204369,6.755673362794479,16.79131628670891,11.73096869029488,14.867751736752076,0.41005683366765133,0.35798629372283397,17.798771197554718,6.398652077102396,17.003968508973042,4.415488490115593,19.88779216973423,15.246028242471233,7.17840221223228,10.93781767382968,19.334248021497054,5.895429471129785,16.219556069769272,1.257500258668296,13.35240216681794,3.7524825852312604,18.363727585203545,13.287175871180148,7.437362922106439,14.216453701305465,19.318181685078915,9.69797606762083,2.7732356165704974,13.625410280392916,14.139028401051297,19.780999445066087,13.125380894452828,2.5467211987490757,19.464543580827204,10.120635552103273,9.103765702752602,10.496476302309258,3.352197032872417,8.904982823526876,14.4076623870607,17.780175853353658,9.986379933191483,15.770004988951762,6.296905383827318,19.93192531064997,5.357486153212312,12.855412640351464,4.9314576970828305,5.227269161817727,17.41455413919905,3.260010094353447,0.21156084089818172,8.960260858748882,11.340068490710756,11.80344434578589,17.904218843561907,15.982417205576628,6.674546658129472,9.992070922059568,9.050405555935615,16.662458457474983,7.306887033144274,13.841082163668892,4.932028518149947,7.4588325596943905,2.569071223246282,12.990583394425524,19.433005651712723,18.463265240764535,8.123425882819276,14.16366202745268,4.69230299891497,9.245224661322272,13.724142381141187,3.2093310728040736,13.507125849179232,12.577487234238811,11.743322627641039,1.066462020414649,15.56809379437954,10.40896526278042,3.339264414244467,15.751139140821572,16.593718504349816,18.788810840821235,4.487562812120145,9.09439565096858,7.195787439053882,14.173505386163544,8.028826348621223,11.178852584765714,16.95915667750875,10.123532906099936,9.383208249365271,12.260174998549793,8.794101731127636,4.6274428734214945,4.694568180976648,2.809829903878458,3.24243279688031,2.634089694664725,0.7144777106844513,18.784840835285564,2.102019396089485,3.318775613967837,15.574357646059806,13.744681956448233,8.372049325176842,18.401496668385473,4.0623595757468856,14.456315077195088,12.249217420563996,8.088159178497417,0.6348223860773894,15.445144074574726,4.250731483809118,10.392630254118904,4.700855453245896,0.28008000463170646,15.127078391962549,17.731706034127765,0.1597934417922664,11.725057042588949,12.45631864298403,6.927451292593649,15.916864441149468,8.22279639672606,0.7408585375565568,8.147271862405674,16.803030327785244,13.665971806384242,16.93522452044106,11.781823198094736,11.09237781490721,19.83984334877164,11.988620291652282,9.56546806446974,2.608212200859854,6.3549219300892235,8.31975442945501,10.11095572057178,7.322664954911695,11.673612330864195,12.57017731582128,8.037504385208102,7.593314909058431,16.605677866316718,19.770819628485903,4.683912592929382,12.029454261670418,8.999572407713465,12.157291523870768,17.352548105464024,18.732902921679262,5.896286359271503,9.202673009542025,3.9294618461082864,18.787233118788336,14.2577947273612,10.551139457586496,14.97318505039277,8.536584361567927,14.59437649484312,19.293922150036682,14.198562819842838,1.7844182955851418,11.060677770420275,3.1603097596395324,3.3232833496299063,13.242186642067173,13.564022077781068,1.9490918315916161,0.06597345207202121,12.515577839496883,17.869428088602678,18.514747571330897,17.416337135279726,6.333133932438169,18.87538381142765,19.083490425629126,3.0984568301167004,8.402055121022629,1.7400916899703356,18.200077122087933,15.96548316746054,15.936888238110928,13.618861684909444,6.144154259956651,3.204397587453993,4.235178001184932,14.958161116030366,1.1412504888792574,0.8233164581605346,18.870510757197522,13.840633593588652,1.6315527871477897,12.833375616709134,3.2366324006628355,14.582982427788638,10.959209647376422,4.930816757206853,17.25843559749591,12.049302067388904,9.422932526088154,4.079638313757865,0.9950984497089133,2.3004900118093152,2.9154951490139025,15.633048406326523,10.92540785236336,6.962952501868442,17.12858334142341,13.971317116735609,2.331963783564568,10.832662000266415,2.2832634397831075,13.847156362981355,1.178477524801922,11.553853657594221,11.319695878790505,3.5126208652870705,16.77232984527344,1.3386726024573692,10.271255051336645,19.458901233337503,8.466288964105555,13.27710629716076,9.111460743437831,11.938888063355396,8.347390840715697,9.007830451564516,5.5768257140155875,5.0345299280784905,1.4701221588097413,8.69197340533117,17.726289619828435,10.312240255322243,5.949564735264583,2.2234713355606495,12.827477587722473,17.031313606611803,17.95934873187167,7.945056842860172,6.0964942639957,14.671887082127215,18.143547834206757,0.4755568597210713,3.5598580302096883,11.915962534205722,19.59839848297878,2.5582196738558505,13.656043680420122,5.199812823370502,3.736520747868899,3.399083579920208,0.9377236447818715,19.194304344084372,6.358422144937603,10.007022099963926,0.1986187698234465,7.53200828504236,17.650846103945582,2.8294385830966995,1.7802459752826483,16.055693556539246,1.116290716388173,4.084956267970519,1.0107905755577695,18.718417262688703,16.219028484949114,15.973945831996033,3.9902198126514676,6.798059358841653,12.69549320908077,16.15202969316134,17.347553493634422,13.930127816770955,10.627679317447448,17.697876494860168,16.92078640797151,13.601135063219253,16.143965432186658,9.926432247781491,3.8186025095292786,16.71687116096139,18.11626079865221,2.6761879135324973,15.457695377648752,17.51004055586312,10.112303977290832,2.8022853597871444,6.792138483122514,8.953966196564185,16.83681948274024,11.663323367952025,0.7655411715837035,3.3866127051287487,18.583592089754617,8.248501098013037,19.989526686764645,0.9254195517248398,4.6443142108349855,5.166540730367646,6.164472254831845,17.529851822377278,2.0502040506948527,18.55148694303864,0.4850239585489913,12.08696551972066,10.218282476534451,6.061394052568891,4.90931423784601,18.398341417566453,9.070476606509267,9.853588907725776,18.288086324799306,9.476215742798523,6.242773851380847,0.8315869781960705,12.555508340253692,17.160508664755667,11.743419760411165,12.249938862066516,10.996864623042452,11.237269537795003,14.618088815111756,4.82821099427329,12.172739909258926,18.122860084193235,5.913765636433852,13.014825930644056,2.9618209890514624,1.635603925828799,12.68266092127769,15.81827604609293,8.586667380345233,10.055161175043645,14.459960498939903,15.693163065582073,4.832522710913234,9.446936509664074,1.7271248596861533,6.023305752645429,2.511884275174432,12.736888319800158,5.641352736169312,16.677349223874725,5.013600776313569,4.897952572833746,0.5351977512211237,17.10994482517893,12.408388607889176,2.230297867325719,16.7536793540702,1.4279927359422873,3.487731559149907,4.330928378719112,5.730790107274575,3.699711084023498,17.804666962972323,3.4579244583328217,9.306636322935189,18.07654122134171,19.907682732760705,19.994449867032134,2.8366475386637635,5.044362262399789,1.7009047939367017,11.037925838182861,7.569852838689237,13.431174639303357,12.522013775607874,10.881761361528476,8.082474361525737,0.5674531505612901,7.768199550497954,0.8525632839651731,16.929610346795542,5.709151889048059,0.4836904568518108,0.43605699217758254,11.295707784675297,7.846348632071769,10.689916670363209,17.752416131862372,17.90030077212012,17.91059266771146,12.33063756561005,8.14889194102908,11.148084648924726,0.5422935788980121,16.886689455724174,19.253048791328666,17.249236508099024,15.408429743454754,8.165731679038824,5.328077148907955,8.787942953218675,2.7971992740101426,16.272250448357518,3.211142913735152,7.299590172064696,5.363936322299945,16.54464633048952,8.327848085774319,13.56947327858039,15.964090266048094,9.88189260158439,8.379081441569918,5.9843713559153855,0.4979544426608218,14.664631062889839,15.343692438828658,7.084408745130166,5.1428731962990915,15.61130720976732,5.69964933847201,5.717282381466013,0.7448828415215836,6.624745037784092,0.31055608415812674,1.504459376174041,8.385649121702482,3.6242956775182655,16.362660124886755,15.18833473390866,13.291399497603372,9.52254930281834,11.87615137411813,13.849488359378391,8.01408954624744,7.391363354861755,1.2489775677987325,15.38125687962661,8.6799349046975,5.8248928062782745,0.41470333439418194,6.61450249788091,9.74855893739289,0.31273603180470566,15.77253278627746,0.06250561017862477,11.39352905619611,8.132723366014702]}

},{}],154:[function(require,module,exports){
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
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var EPS = require( '@stdlib/constants/float64/eps' );
var factory = require( './../lib/factory.js' );


// FIXTURES //

var smallRange = require( './fixtures/julia/small_range.json' );
var mediumRange = require( './fixtures/julia/medium_range.json' );
var largeRange = require( './fixtures/julia/large_range.json' );


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

	mgf = factory( 0.0, 1.0, 0.5 );
	y = mgf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( NaN, 1.0, 0.5 );
	y = mgf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( 0.0, NaN, 0.5 );
	y = mgf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( 0.0, 1.0, NaN );
	y = mgf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( NaN, NaN, NaN );
	y = mgf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( 0.0, NaN, NaN );
	y = mgf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( NaN, 1.0, NaN );
	y = mgf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( NaN, NaN, 0.5 );
	y = mgf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( NaN, NaN, 0.5 );
	y = mgf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided parameters not satisfying `a <= c <= b`, the created function always returns `NaN`', function test( t ) {
	var mgf;
	var y;

	mgf = factory( 2.0, 1.0, 0.5 );

	y = mgf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( 0.0, NINF, 0.5 );
	y = mgf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( PINF, NINF, 0.5 );
	y = mgf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( NINF, NINF, 0.5 );
	y = mgf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( -1.0, -2.0, 0.5 );
	y = mgf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( -10.0, 10.0, 12.0 );
	y = mgf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( -10.0, 10.0, -12.0 );
	y = mgf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the MGF for `x` given a small range `b - a`', function test( t ) {
	var expected;
	var delta;
	var mgf;
	var tol;
	var x;
	var a;
	var b;
	var c;
	var y;
	var i;

	expected = smallRange.expected;
	x = smallRange.x;
	a = smallRange.a;
	b = smallRange.b;
	c = smallRange.c;
	for ( i = 0; i < x.length; i++ ) {
		mgf = factory( a[i], b[i], c[i] );
		y = mgf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the MGF for `x` given a medium range `b - a`', function test( t ) {
	var expected;
	var delta;
	var mgf;
	var tol;
	var x;
	var a;
	var b;
	var c;
	var y;
	var i;

	expected = mediumRange.expected;
	x = mediumRange.x;
	a = mediumRange.a;
	b = mediumRange.b;
	c = mediumRange.c;
	for ( i = 0; i < x.length; i++ ) {
		mgf = factory( a[i], b[i], c[i] );
		y = mgf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the MGF for `x` given a large range `b - a`', function test( t ) {
	var expected;
	var delta;
	var mgf;
	var tol;
	var x;
	var a;
	var b;
	var c;
	var y;
	var i;

	expected = largeRange.expected;
	x = largeRange.x;
	a = largeRange.a;
	b = largeRange.b;
	c = largeRange.c;
	for ( i = 0; i < x.length; i++ ) {
		mgf = factory( a[i], b[i], c[i] );
		y = mgf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/triangular/mgf/test/test.factory.js")
},{"./../lib/factory.js":148,"./fixtures/julia/large_range.json":151,"./fixtures/julia/medium_range.json":152,"./fixtures/julia/small_range.json":153,"@stdlib/constants/float64/eps":62,"@stdlib/constants/float64/ninf":72,"@stdlib/constants/float64/pinf":74,"@stdlib/math/base/assert/is-nan":85,"@stdlib/math/base/special/abs":89,"tape":332}],155:[function(require,module,exports){
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/triangular/mgf/test/test.js")
},{"./../lib":149,"tape":332}],156:[function(require,module,exports){
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
var mgf = require( './../lib' );


// FIXTURES //

var smallRange = require( './fixtures/julia/small_range.json' );
var mediumRange = require( './fixtures/julia/medium_range.json' );
var largeRange = require( './fixtures/julia/large_range.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof mgf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = mgf( NaN, 0.0, 1.0, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = mgf( 0.0, NaN, 1.0, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = mgf( 0.0, 1.0, NaN, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = mgf( 0.0, 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided parameters not satisfying `a <= c <= b`, the function returns `NaN`', function test( t ) {
	var y;

	y = mgf( 2.0, -1.0, -1.1, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 0.0, 3.0, 2.0, 2.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 0.0, 0.0, 1.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 0.0, 0.0, 1.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the MGF for `x` given a small range `b - a`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var a;
	var b;
	var c;
	var y;
	var i;

	expected = smallRange.expected;
	x = smallRange.x;
	a = smallRange.a;
	b = smallRange.b;
	c = smallRange.c;
	for ( i = 0; i < x.length; i++ ) {
		y = mgf( x[i], a[i], b[i], c[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the MGF for `x` given a medium range `b - a`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var a;
	var b;
	var c;
	var y;
	var i;

	expected = mediumRange.expected;
	x = mediumRange.x;
	a = mediumRange.a;
	b = mediumRange.b;
	c = mediumRange.c;
	for ( i = 0; i < x.length; i++ ) {
		y = mgf( x[i], a[i], b[i], c[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the MGF for `x` given a large range `b - a`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var a;
	var b;
	var c;
	var y;
	var i;

	expected = largeRange.expected;
	x = largeRange.x;
	a = largeRange.a;
	b = largeRange.b;
	c = largeRange.c;
	for ( i = 0; i < x.length; i++ ) {
		y = mgf( x[i], a[i], b[i], c[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/triangular/mgf/test/test.mgf.js")
},{"./../lib":149,"./fixtures/julia/large_range.json":151,"./fixtures/julia/medium_range.json":152,"./fixtures/julia/small_range.json":153,"@stdlib/constants/float64/eps":62,"@stdlib/math/base/assert/is-nan":85,"@stdlib/math/base/special/abs":89,"tape":332}],157:[function(require,module,exports){
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
var abs = require( '@stdlib/math/base/special/abs' );
var EPS = require( '@stdlib/constants/float64/eps' );
var tryRequire = require( '@stdlib/utils/try-require' );


// FIXTURES //

var smallRange = require( './fixtures/julia/small_range.json' );
var mediumRange = require( './fixtures/julia/medium_range.json' );
var largeRange = require( './fixtures/julia/large_range.json' );


// VARIABLES //

var mgf = tryRequire( resolve( __dirname, './../lib/native.js' ) );
var opts = {
	'skip': ( mgf instanceof Error )
};


// TESTS //

tape( 'main export is a function', opts, function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof mgf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', opts, function test( t ) {
	var y = mgf( NaN, 0.0, 1.0, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = mgf( 0.0, NaN, 1.0, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = mgf( 0.0, 1.0, NaN, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = mgf( 0.0, 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided parameters not satisfying `a <= c <= b`, the function returns `NaN`', opts, function test( t ) {
	var y;

	y = mgf( 2.0, -1.0, -1.1, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 0.0, 3.0, 2.0, 2.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 0.0, 0.0, 1.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 0.0, 0.0, 1.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the MGF for `x` given a small range `b - a`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var a;
	var b;
	var c;
	var y;
	var i;

	expected = smallRange.expected;
	x = smallRange.x;
	a = smallRange.a;
	b = smallRange.b;
	c = smallRange.c;
	for ( i = 0; i < x.length; i++ ) {
		y = mgf( x[i], a[i], b[i], c[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );

			// FIXME: the tolerance for the C implementation is widely different from the JavaScript implementation, and it is not clear why.
			tol = 1.0e7 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the MGF for `x` given a medium range `b - a`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var a;
	var b;
	var c;
	var y;
	var i;

	expected = mediumRange.expected;
	x = mediumRange.x;
	a = mediumRange.a;
	b = mediumRange.b;
	c = mediumRange.c;
	for ( i = 0; i < x.length; i++ ) {
		y = mgf( x[i], a[i], b[i], c[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );

			// FIXME: the tolerance for the C implementation is widely different from the JavaScript implementation, and it is not clear why.
			tol = 1.0e7 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the MGF for `x` given a large range `b - a`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var a;
	var b;
	var c;
	var y;
	var i;

	expected = largeRange.expected;
	x = largeRange.x;
	a = largeRange.a;
	b = largeRange.b;
	c = largeRange.c;
	for ( i = 0; i < x.length; i++ ) {
		y = mgf( x[i], a[i], b[i], c[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );

			// FIXME: the tolerance for the C implementation is widely different from the JavaScript implementation, and it is not clear why.
			tol = 1.0e7 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/triangular/mgf/test/test.native.js","/lib/node_modules/@stdlib/stats/base/dists/triangular/mgf/test")
},{"./fixtures/julia/large_range.json":151,"./fixtures/julia/medium_range.json":152,"./fixtures/julia/small_range.json":153,"@stdlib/constants/float64/eps":62,"@stdlib/math/base/assert/is-nan":85,"@stdlib/math/base/special/abs":89,"@stdlib/utils/try-require":200,"path":214,"tape":332}],158:[function(require,module,exports){
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

},{"./is_number.js":161}],159:[function(require,module,exports){
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

},{"./is_number.js":161,"./zero_pad.js":165}],160:[function(require,module,exports){
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

},{"./main.js":163}],161:[function(require,module,exports){
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

},{}],162:[function(require,module,exports){
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

},{}],163:[function(require,module,exports){
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

},{"./format_double.js":158,"./format_integer.js":159,"./is_string.js":162,"./space_pad.js":164,"./zero_pad.js":165}],164:[function(require,module,exports){
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

},{}],165:[function(require,module,exports){
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

},{"./main.js":167}],167:[function(require,module,exports){
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

},{}],168:[function(require,module,exports){
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

},{"./main.js":170}],169:[function(require,module,exports){
arguments[4][162][0].apply(exports,arguments)
},{"dup":162}],170:[function(require,module,exports){
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

},{"./is_string.js":169,"@stdlib/string/base/format-interpolate":160,"@stdlib/string/base/format-tokenize":166}],171:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":172}],172:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":174}],174:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-buffer":39,"@stdlib/regexp/function-name":145,"@stdlib/utils/native-class":195}],177:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":178}],178:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":182}],179:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],180:[function(require,module,exports){
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

},{}],181:[function(require,module,exports){
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

},{"./define_property.js":180}],182:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":179,"./has_define_property_support.js":181,"./polyfill.js":183}],183:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":168}],184:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./native.js":187,"./polyfill.js":188,"@stdlib/assert/is-function":45}],185:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":186}],186:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./detect.js":184,"@stdlib/object/ctor":143}],187:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],188:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./proto.js":189,"@stdlib/utils/native-class":195}],189:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],190:[function(require,module,exports){
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

},{"./codegen.js":191,"./global_this.js":192,"./self.js":193,"./window.js":194,"@stdlib/assert/is-boolean":33,"@stdlib/string/format":168}],191:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],192:[function(require,module,exports){
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

},{}],193:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],194:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":196,"./polyfill.js":197,"@stdlib/assert/has-tostringtag-support":20}],196:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":198}],197:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":198,"./tostringtag.js":199,"@stdlib/assert/has-own-property":16}],198:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],199:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/symbol/ctor":171}],200:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":201}],201:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-error":41}],202:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./fixtures/nodelist.js":203,"./fixtures/re.js":204,"./fixtures/typedarray.js":205}],203:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/global":190}],204:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],205:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],206:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./check.js":202,"./main.js":207,"./polyfill.js":208}],207:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/constructor-name":175}],208:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/constructor-name":175}],209:[function(require,module,exports){
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

},{}],210:[function(require,module,exports){

},{}],211:[function(require,module,exports){
arguments[4][210][0].apply(exports,arguments)
},{"dup":210}],212:[function(require,module,exports){
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
},{"base64-js":209,"buffer":212,"ieee754":315}],213:[function(require,module,exports){
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

},{}],214:[function(require,module,exports){
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
},{"_process":322}],215:[function(require,module,exports){
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

},{"events":213,"inherits":316,"readable-stream/lib/_stream_duplex.js":217,"readable-stream/lib/_stream_passthrough.js":218,"readable-stream/lib/_stream_readable.js":219,"readable-stream/lib/_stream_transform.js":220,"readable-stream/lib/_stream_writable.js":221,"readable-stream/lib/internal/streams/end-of-stream.js":225,"readable-stream/lib/internal/streams/pipeline.js":227}],216:[function(require,module,exports){
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

},{}],217:[function(require,module,exports){
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
},{"./_stream_readable":219,"./_stream_writable":221,"_process":322,"inherits":316}],218:[function(require,module,exports){
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
},{"./_stream_transform":220,"inherits":316}],219:[function(require,module,exports){
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
},{"../errors":216,"./_stream_duplex":217,"./internal/streams/async_iterator":222,"./internal/streams/buffer_list":223,"./internal/streams/destroy":224,"./internal/streams/from":226,"./internal/streams/state":228,"./internal/streams/stream":229,"_process":322,"buffer":212,"events":213,"inherits":316,"string_decoder/":331,"util":210}],220:[function(require,module,exports){
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
},{"../errors":216,"./_stream_duplex":217,"inherits":316}],221:[function(require,module,exports){
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
},{"../errors":216,"./_stream_duplex":217,"./internal/streams/destroy":224,"./internal/streams/state":228,"./internal/streams/stream":229,"_process":322,"buffer":212,"inherits":316,"util-deprecate":340}],222:[function(require,module,exports){
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
},{"./end-of-stream":225,"_process":322}],223:[function(require,module,exports){
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
},{"buffer":212,"util":210}],224:[function(require,module,exports){
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
},{"_process":322}],225:[function(require,module,exports){
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
},{"../../../errors":216}],226:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],227:[function(require,module,exports){
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
},{"../../../errors":216,"./end-of-stream":225}],228:[function(require,module,exports){
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
},{"../../../errors":216}],229:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":213}],230:[function(require,module,exports){
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

},{"./":231,"get-intrinsic":306}],231:[function(require,module,exports){
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

},{"es-define-property":291,"es-errors/type":297,"function-bind":305,"get-intrinsic":306,"set-function-length":326}],232:[function(require,module,exports){
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

},{"./lib/is_arguments.js":233,"./lib/keys.js":234}],233:[function(require,module,exports){
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

},{}],234:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],235:[function(require,module,exports){
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

},{"es-define-property":291,"es-errors/syntax":296,"es-errors/type":297,"gopd":307}],236:[function(require,module,exports){
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

},{"define-data-property":235,"has-property-descriptors":308,"object-keys":320}],237:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],238:[function(require,module,exports){
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

},{"./ToNumber":269,"./ToPrimitive":271,"./Type":276}],239:[function(require,module,exports){
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

},{"../helpers/isFinite":284,"../helpers/isNaN":285,"../helpers/isPrefixOf":286,"./ToNumber":269,"./ToPrimitive":271,"es-errors/type":297,"get-intrinsic":306}],240:[function(require,module,exports){
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

},{"call-bind/callBound":230,"es-errors/type":297}],241:[function(require,module,exports){
'use strict';

var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value) {
	return RequireObjectCoercible(value, arguments.length > 1 ? arguments[1] : void undefined);
};

},{"es-object-atoms/RequireObjectCoercible":299}],242:[function(require,module,exports){
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

},{"./DayWithinYear":245,"./InLeapYear":249,"./MonthFromTime":259,"es-errors/eval":292}],243:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":290,"./floor":280}],244:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":280}],245:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":243,"./DayFromYear":244,"./YearFromTime":278}],246:[function(require,module,exports){
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

},{"./modulo":281}],247:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":288,"./IsAccessorDescriptor":250,"./IsDataDescriptor":252,"es-errors/type":297}],248:[function(require,module,exports){
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

},{"../helpers/timeConstants":290,"./floor":280,"./modulo":281}],249:[function(require,module,exports){
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

},{"./DaysInYear":246,"./YearFromTime":278,"es-errors/eval":292}],250:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":288,"es-errors/type":297,"hasown":314}],251:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":317}],252:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":288,"es-errors/type":297,"hasown":314}],253:[function(require,module,exports){
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

},{"./IsAccessorDescriptor":250,"./IsDataDescriptor":252,"./IsPropertyDescriptor":254,"es-errors/type":297}],254:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor(Desc);
};

},{"../helpers/records/property-descriptor":288}],255:[function(require,module,exports){
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

},{"../helpers/isFinite":284,"../helpers/timeConstants":290}],256:[function(require,module,exports){
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

},{"../helpers/isFinite":284,"./DateFromTime":242,"./Day":243,"./MonthFromTime":259,"./ToInteger":268,"./YearFromTime":278,"./floor":280,"./modulo":281,"get-intrinsic":306}],257:[function(require,module,exports){
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

},{"../helpers/isFinite":284,"../helpers/timeConstants":290,"./ToInteger":268}],258:[function(require,module,exports){
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

},{"../helpers/timeConstants":290,"./floor":280,"./modulo":281}],259:[function(require,module,exports){
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

},{"./DayWithinYear":245,"./InLeapYear":249}],260:[function(require,module,exports){
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

},{"../helpers/isNaN":285}],261:[function(require,module,exports){
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

},{"../helpers/timeConstants":290,"./floor":280,"./modulo":281}],262:[function(require,module,exports){
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

},{"./Type":276}],263:[function(require,module,exports){
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


},{"../helpers/isFinite":284,"./ToNumber":269,"./abs":279,"get-intrinsic":306}],264:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":290,"./DayFromYear":244}],265:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":290,"./modulo":281}],266:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],267:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":269}],268:[function(require,module,exports){
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

},{"../helpers/isFinite":284,"../helpers/isNaN":285,"../helpers/sign":289,"./ToNumber":269,"./abs":279,"./floor":280}],269:[function(require,module,exports){
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

},{"./ToPrimitive":271,"call-bind/callBound":230,"safe-regex-test":325}],270:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = require('es-object-atoms/ToObject');

},{"es-object-atoms/ToObject":300}],271:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":302}],272:[function(require,module,exports){
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

},{"./IsCallable":251,"./ToBoolean":266,"./Type":276,"es-errors/type":297,"hasown":314}],273:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":306}],274:[function(require,module,exports){
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

},{"../helpers/isFinite":284,"../helpers/isNaN":285,"../helpers/sign":289,"./ToNumber":269,"./abs":279,"./floor":280,"./modulo":281}],275:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":269}],276:[function(require,module,exports){
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

},{}],277:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":243,"./modulo":281}],278:[function(require,module,exports){
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

},{"call-bind/callBound":230,"get-intrinsic":306}],279:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":306}],280:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],281:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":287}],282:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":290,"./modulo":281}],283:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":238,"./5/AbstractRelationalComparison":239,"./5/Canonicalize":240,"./5/CheckObjectCoercible":241,"./5/DateFromTime":242,"./5/Day":243,"./5/DayFromYear":244,"./5/DayWithinYear":245,"./5/DaysInYear":246,"./5/FromPropertyDescriptor":247,"./5/HourFromTime":248,"./5/InLeapYear":249,"./5/IsAccessorDescriptor":250,"./5/IsCallable":251,"./5/IsDataDescriptor":252,"./5/IsGenericDescriptor":253,"./5/IsPropertyDescriptor":254,"./5/MakeDate":255,"./5/MakeDay":256,"./5/MakeTime":257,"./5/MinFromTime":258,"./5/MonthFromTime":259,"./5/SameValue":260,"./5/SecFromTime":261,"./5/StrictEqualityComparison":262,"./5/TimeClip":263,"./5/TimeFromYear":264,"./5/TimeWithinDay":265,"./5/ToBoolean":266,"./5/ToInt32":267,"./5/ToInteger":268,"./5/ToNumber":269,"./5/ToObject":270,"./5/ToPrimitive":271,"./5/ToPropertyDescriptor":272,"./5/ToString":273,"./5/ToUint16":274,"./5/ToUint32":275,"./5/Type":276,"./5/WeekDay":277,"./5/YearFromTime":278,"./5/abs":279,"./5/floor":280,"./5/modulo":281,"./5/msFromTime":282}],284:[function(require,module,exports){
'use strict';

var $isNaN = require('./isNaN');

module.exports = function (x) { return (typeof x === 'number' || typeof x === 'bigint') && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{"./isNaN":285}],285:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],286:[function(require,module,exports){
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

},{"call-bind/callBound":230}],287:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],288:[function(require,module,exports){
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

},{"es-errors/type":297,"hasown":314}],289:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],290:[function(require,module,exports){
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

},{}],291:[function(require,module,exports){
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

},{"get-intrinsic":306}],292:[function(require,module,exports){
'use strict';

/** @type {import('./eval')} */
module.exports = EvalError;

},{}],293:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Error;

},{}],294:[function(require,module,exports){
'use strict';

/** @type {import('./range')} */
module.exports = RangeError;

},{}],295:[function(require,module,exports){
'use strict';

/** @type {import('./ref')} */
module.exports = ReferenceError;

},{}],296:[function(require,module,exports){
'use strict';

/** @type {import('./syntax')} */
module.exports = SyntaxError;

},{}],297:[function(require,module,exports){
'use strict';

/** @type {import('./type')} */
module.exports = TypeError;

},{}],298:[function(require,module,exports){
'use strict';

/** @type {import('./uri')} */
module.exports = URIError;

},{}],299:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

/** @type {import('./RequireObjectCoercible')} */
module.exports = function RequireObjectCoercible(value) {
	if (value == null) {
		throw new $TypeError((arguments.length > 0 && arguments[1]) || ('Cannot call method on ' + value));
	}
	return value;
};

},{"es-errors/type":297}],300:[function(require,module,exports){
'use strict';

var $Object = require('./');
var RequireObjectCoercible = require('./RequireObjectCoercible');

/** @type {import('./ToObject')} */
module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

},{"./":301,"./RequireObjectCoercible":299}],301:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Object;

},{}],302:[function(require,module,exports){
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

},{"./helpers/isPrimitive":303,"is-callable":317}],303:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],304:[function(require,module,exports){
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

},{}],305:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":304}],306:[function(require,module,exports){
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

},{"es-errors":293,"es-errors/eval":292,"es-errors/range":294,"es-errors/ref":295,"es-errors/syntax":296,"es-errors/type":297,"es-errors/uri":298,"function-bind":305,"has-proto":309,"has-symbols":310,"hasown":314}],307:[function(require,module,exports){
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

},{"get-intrinsic":306}],308:[function(require,module,exports){
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

},{"es-define-property":291}],309:[function(require,module,exports){
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

},{}],310:[function(require,module,exports){
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

},{"./shams":311}],311:[function(require,module,exports){
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

},{}],312:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":311}],313:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":305}],314:[function(require,module,exports){
'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);

},{"function-bind":305}],315:[function(require,module,exports){
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

},{}],316:[function(require,module,exports){
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

},{}],317:[function(require,module,exports){
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

},{}],318:[function(require,module,exports){
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

},{"call-bind/callBound":230,"has-tostringtag/shams":312}],319:[function(require,module,exports){
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

},{"./isArguments":321}],320:[function(require,module,exports){
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

},{"./implementation":319,"./isArguments":321}],321:[function(require,module,exports){
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

},{}],322:[function(require,module,exports){
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

},{}],323:[function(require,module,exports){
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
},{"_process":322,"through":338,"timers":339}],324:[function(require,module,exports){
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

},{"buffer":212}],325:[function(require,module,exports){
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

},{"call-bind/callBound":230,"es-errors/type":297,"is-regex":318}],326:[function(require,module,exports){
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

},{"define-data-property":235,"es-errors/type":297,"get-intrinsic":306,"gopd":307,"has-property-descriptors":308}],327:[function(require,module,exports){
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

},{"es-abstract/es5":283,"function-bind":305}],328:[function(require,module,exports){
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

},{"./implementation":327,"./polyfill":329,"./shim":330,"define-properties":236,"function-bind":305}],329:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":327}],330:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":329,"define-properties":236}],331:[function(require,module,exports){
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
},{"safe-buffer":324}],332:[function(require,module,exports){
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
},{"./lib/default_stream":333,"./lib/results":335,"./lib/test":336,"_process":322,"defined":237,"through":338,"timers":339}],333:[function(require,module,exports){
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
},{"_process":322,"fs":211,"through":338}],334:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":322,"timers":339}],335:[function(require,module,exports){
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
},{"_process":322,"events":213,"function-bind":305,"has":313,"inherits":316,"object-inspect":337,"resumer":323,"through":338,"timers":339}],336:[function(require,module,exports){
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
},{"./next_tick":334,"deep-equal":232,"defined":237,"events":213,"has":313,"inherits":316,"path":214,"string.prototype.trim":328}],337:[function(require,module,exports){
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

},{}],338:[function(require,module,exports){
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
},{"_process":322,"stream":215}],339:[function(require,module,exports){
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
},{"process/browser.js":322,"timers":339}],340:[function(require,module,exports){
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
},{}]},{},[154,155,156,157]);
