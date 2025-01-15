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

},{"./uint16array.js":24,"@stdlib/assert/is-uint16array":52,"@stdlib/constants/uint16/max":77}],24:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint32array.js":27,"@stdlib/assert/is-uint32array":54,"@stdlib/constants/uint32/max":78}],27:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint8array.js":30,"@stdlib/assert/is-uint8array":56,"@stdlib/constants/uint8/max":79}],30:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/native-class":191}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":34,"./object.js":35,"./primitive.js":36,"@stdlib/utils/define-nonenumerable-read-only-property":173}],34:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./try2serialize.js":38,"@stdlib/assert/has-tostringtag-support":20,"@stdlib/boolean/ctor":60,"@stdlib/utils/native-class":191}],36:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/get-prototype-of":181,"@stdlib/utils/native-class":191}],43:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":191}],45:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/type-of":202}],47:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":51,"@stdlib/assert/tools/array-function":58,"@stdlib/utils/define-nonenumerable-read-only-property":173}],51:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":191}],54:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":191}],56:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":191}],58:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-array":31,"@stdlib/string/format":164}],60:[function(require,module,exports){
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
* One half times the natural logarithm of 2.
*
* @module @stdlib/constants/float64/half-ln-two
* @type {number}
*
* @example
* var HALF_LN2 = require( '@stdlib/constants/float64/half-ln-two' );
* // returns 3.46573590279972654709e-01
*/

// MAIN //

/**
* One half times the natural logarithm of 2.
*
* ```tex
* \frac{\ln 2}{2}
* ```
*
* @constant
* @type {number}
* @default 3.46573590279972654709e-01
*/
var HALF_LN2 = 3.46573590279972654709e-01; // 0x3FD62E42 0xFEFA39EF


// EXPORTS //

module.exports = HALF_LN2;

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
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],67:[function(require,module,exports){
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

},{"@stdlib/number/ctor":114}],74:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-integer":84}],82:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/ninf":73,"@stdlib/constants/float64/pinf":75}],84:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":85}],85:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/special/floor":97}],86:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/assert/is-even":80}],90:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":91}],91:[function(require,module,exports){
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

},{}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/high-word-abs-mask":65,"@stdlib/constants/float64/high-word-sign-mask":67,"@stdlib/number/float64/base/from-words":118,"@stdlib/number/float64/base/get-high-word":122,"@stdlib/number/float64/base/to-words":134}],94:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Compute `exp(x) - 1`.
*
* @module @stdlib/math/base/special/expm1
*
* @example
* var expm1 = require( '@stdlib/math/base/special/expm1' );
*
* var v = expm1( 0.2 );
* // returns ~0.221
*
* v = expm1( -9.0 );
* // returns ~-0.999
*
* v = expm1( 0.0 );
* // returns 0.0
*
* v = expm1( NaN );
* // returns NaN
*/

// MODULES //

var expm1 = require( './main.js' );


// EXPORTS //

module.exports = expm1;

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
*
*
* ## Notice
*
* The following copyright, license, and long comment were part of the original implementation available as part of [FDLIBM]{@link http://www.netlib.org/fdlibm/s_expm1.c} and [FreeBSD]{@link https://svnweb.freebsd.org/base/release/12.2.0/lib/msun/src/s_expm1.c}. The implementation follows the original, but has been modified for JavaScript.
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
var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
var fromWords = require( '@stdlib/number/float64/base/from-words' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var FLOAT64_EXPONENT_BIAS = require( '@stdlib/constants/float64/exponent-bias' );
var HALF_LN2 = require( '@stdlib/constants/float64/half-ln-two' );
var polyval = require( './polyval_q.js' );


// VARIABLES //

var OVERFLOW_THRESHOLD = 7.09782712893383973096e+02; // 0x40862E42 0xFEFA39EF

// High and low words of ln(2):
var LN2_HI = 6.93147180369123816490e-01; // 0x3FE62E42 0xFEE00000
var LN2_LO = 1.90821492927058770002e-10; // 0x3DEA39EF 0x35793C76

// 1 / ln(2):
var LN2_INV = 1.44269504088896338700e+00; // 0x3FF71547 0x652B82FE

// ln(2) * 56:
var LN2x56 = 3.88162421113569373274e+01; // 0x4043687A 0x9F1AF2B1

// ln(2) * 1.5:
var LN2_HALFX3 = 1.03972077083991796413e+00; // 0x3FF0A2B2 0x3F3BAB73


// MAIN //

/**
* Computes `exp(x) - 1`.
*
* ## Method
*
* 1.  Given \\(x\\), we use argument reduction to find \\(r\\) and an integer \\(k\\) such that
*
*     ```tex
*     x = k \cdot \ln(2) + r
*     ```
*
*     where
*
*     ```tex
*     |r| \leq \frac{\ln(2)}{2} \approx 0.34658
*     ```
*
*     <!-- <note> -->
*
*     A correction term \\(c\\) will need to be computed to compensate for the error in \\(r\\) when rounded to a floating-point number.
*
*     <!-- </note> -->
*
* 2.  To approximate \\(\operatorname{expm1}(r)\\), we use a special rational function on the interval \\(\[0,0.34658]\\). Since
*
*     ```tex
*     r \frac{e^r + 1}{e^r - 1} = 2 + \frac{r^2}{6} - \frac{r^4}{360} + \ldots
*     ```
*
*     we define \\(\operatorname{R1}(r^2)\\) by
*
*     ```tex
*     r \frac{e^r + 1}{e^r - 1} = 2 + \frac{r^2}{6} \operatorname{R1}(r^2)
*     ```
*
*     That is,
*
*     ```tex
*     \begin{align*}
*     \operatorname{R1}(r^2) &= \frac{6}{r} \biggl(\frac{e^r+1}{e^r-1} - \frac{2}{r}\biggr) \\
*     &= \frac{6}{r} \biggl( 1 + 2 \biggl(\frac{1}{e^r-1} - \frac{1}{r}\biggr)\biggr) \\
*     &= 1 - \frac{r^2}{60} + \frac{r^4}{2520} - \frac{r^6}{100800} + \ldots
*     \end{align*}
*     ```
*
*     We use a special Remes algorithm on \\(\[0,0.347]\\) to generate a polynomial of degree \\(5\\) in \\(r^2\\) to approximate \\(\mathrm{R1}\\). The maximum error of this polynomial approximation is bounded by \\(2^{-61}\\). In other words,
*
*     ```tex
*     \operatorname{R1}(z) \approx 1 + \mathrm{Q1} \cdot z + \mathrm{Q2} \cdot z^2 + \mathrm{Q3} \cdot z^3 + \mathrm{Q4} \cdot z^4 + \mathrm{Q5} \cdot z^5
*     ```
*
*     where
*
*     ```tex
*     \begin{align*}
*     \mathrm{Q1} &= -1.6666666666666567384\mbox{e-}2 \\
*     \mathrm{Q2} &= 3.9682539681370365873\mbox{e-}4 \\
*     \mathrm{Q3} &= -9.9206344733435987357\mbox{e-}6 \\
*     \mathrm{Q4} &= 2.5051361420808517002\mbox{e-}7 \\
*     \mathrm{Q5} &= -6.2843505682382617102\mbox{e-}9
*     \end{align*}
*     ```
*
*     where \\(z = r^2\\) and the values of \\(\mathrm{Q1}\\) to \\(\mathrm{Q5}\\) are listed in the source. The error is bounded by
*
*     ```tex
*     \biggl| 1 + \mathrm{Q1} \cdot z + \ldots + \mathrm{Q5} \cdot z - \operatorname{R1}(z) \biggr| \leq 2^{-61}
*     ```
*
*     \\(\operatorname{expm1}(r) = e^r - 1\\) is then computed by the following specific way which minimizes the accumulated rounding error
*
*     ```tex
*     \operatorname{expm1}(r) = r + \frac{r^2}{2} + \frac{r^3}{2} \biggl( \frac{3 - (\mathrm{R1} + \mathrm{R1} \cdot \frac{r}{2})}{6 - r ( 3 - \mathrm{R1} \cdot \frac{r}{2})} \biggr)
*     ```
*
*     To compensate for the error in the argument reduction, we use
*
*     ```tex
*     \begin{align*}
*     \operatorname{expm1}(r+c) &= \operatorname{expm1}(r) + c + \operatorname{expm1}(r) \cdot c \\
*     &\approx \operatorname{expm1}(r) + c + rc
*     \end{align*}
*     ```
*
*     Thus, \\(c + rc\\) will be added in as the correction terms for \\(\operatorname{expm1}(r+c)\\). Now, we can rearrange the term to avoid optimization screw up.
*
*     ```tex
*     \begin{align*}
*     \operatorname{expm1}(r+c) &\approx r - \biggl( \biggl( r + \biggl( \frac{r^2}{2} \biggl( \frac{\mathrm{R1} - (3 - \mathrm{R1} \cdot \frac{r}{2})}{6 - r (3 - \mathrm{R1} \cdot \frac{r}{2})} \biggr) - c \biggr) - c \biggr) - \frac{r^2}{2} \biggr) \\
*     &= r - \mathrm{E}
*     \end{align*}
*     ```
*
* 3.  To scale back to obtain \\(\operatorname{expm1}(x)\\), we have (from step 1)
*
*     ```tex
*     \operatorname{expm1}(x) = \begin{cases}
*     2^k  (\operatorname{expm1}(r) + 1) - 1 \\
*     2^k (\operatorname{expm1}(r) + (1-2^{-k}))
*     \end{cases}
*     ```
*
* ## Special Cases
*
* ```tex
* \begin{align*}
* \operatorname{expm1}(\infty) &= \infty \\
* \operatorname{expm1}(-\infty) &= -1 \\
* \operatorname{expm1}(\mathrm{NaN}) &= \mathrm{NaN}
* \end{align*}
* ```
*
* ## Notes
*
* -   For finite arguments, only \\(\operatorname{expm1}(0) = 0\\) is exact.
*
* -   To save one multiplication, we scale the coefficient \\(\mathrm{Qi}\\) to \\(\mathrm{Qi} \cdot {2^i}\\) and replace \\(z\\) by \\(\frac{x^2}{2}\\).
*
* -   To achieve maximum accuracy, we compute \\(\operatorname{expm1}(x)\\) by
*
*     -   if \\(x < -56 \cdot \ln(2)\\), return \\(-1.0\\) (raise inexact if \\(x\\) does not equal \\(\infty\\))
*
*     -   if \\(k = 0\\), return \\(r-\mathrm{E}\\)
*
*     -   if \\(k = -1\\), return \\(\frac{(r-\mathrm{E})-1}{2}\\)
*
*     -   if \\(k = 1\\),
*
*         -   if \\(r < -0.25\\), return \\(2((r+0.5)- \mathrm{E})\\)
*         -   else return \\(1+2(r-\mathrm{E})\\)
*
*     -   if \\(k < -2\\) or \\(k > 56\\), return \\(2^k(1-(\mathrm{E}-r)) - 1\\) (or \\(e^x-1\\))
*
*     -   if \\(k \leq 20\\), return \\(2^k((1-2^{-k})-(\mathrm{E}-r))\\)
*
*     -   else return \\(2^k(1-((\mathrm{E}+2^{-k})-r))\\)
*
* -   For IEEE 754 double, if \\(x > 7.09782712893383973096\mbox{e+}02\\), then \\(\operatorname{expm1}(x)\\) will overflow.
*
* -   The hexadecimal values listed in the source are the intended ones for the implementation constants. Decimal values may be used, provided that the compiler will convert from decimal to binary accurately enough to produce the intended hexadecimal values.
*
* -   According to an error analysis, the error is always less than \\(1\\) ulp (unit in the last place).
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = expm1( 0.2 );
* // returns ~0.221
*
* @example
* var v = expm1( -9.0 );
* // returns ~-0.9999
*
* @example
* var v = expm1( 0.0 );
* // returns 0.0
*
* @example
* var v = expm1( NaN );
* // returns NaN
*/
function expm1( x ) {
	var halfX;
	var twopk;
	var sign;
	var hi;
	var lo;
	var hx;
	var r1;
	var y;
	var z;
	var c;
	var t;
	var e;
	var k;

	if ( x === PINF || isnan( x ) ) {
		return x;
	}
	if ( x === NINF ) {
		return -1.0;
	}
	if ( x === 0.0 ) {
		return x; // handles +-0 (IEEE 754-2008)
	}
	// Set y = |x|:
	if ( x < 0.0 ) {
		sign = true;
		y = -x;
	} else {
		sign = false;
		y = x;
	}
	// Filter out huge and non-finite arguments...
	if ( y >= LN2x56 ) { // if |x| >= 56*ln(2)
		if ( sign ) { // if x <= -56*ln(2)
			return -1.0;
		}
		if ( y >= OVERFLOW_THRESHOLD ) { // if |x| >= 709.78...
			return PINF;
		}
	}
	// Extract the more significant bits from |x|:
	hx = getHighWord( y )|0; // asm type annotation

	// Argument reduction...
	if ( y > HALF_LN2 ) { // if |x| > 0.5*ln(2)
		if ( y < LN2_HALFX3 ) { // if |x| < 1.5*ln(2)
			if ( sign ) {
				hi = x + LN2_HI;
				lo = -LN2_LO;
				k = -1;
			} else {
				hi = x - LN2_HI;
				lo = LN2_LO;
				k = 1;
			}
		} else {
			if ( sign ) {
				k = (LN2_INV*x) - 0.5;
			} else {
				k = (LN2_INV*x) + 0.5;
			}
			k |= 0; // use a bitwise OR to cast `k` to an integer (see also asm.js type annotations: http://asmjs.org/spec/latest/#annotations)
			t = k;
			hi = x - (t*LN2_HI); // t*ln2_hi is exact here
			lo = t * LN2_LO;
		}
		x = hi - lo;
		c = (hi-x) - lo;
	}
	// If |x| < 2**-54 => high word: 0 01111001001 00000000000000000000 => 0x3c900000 = 1016070144  => exponent = 01111001001 = 969 = 1023-54
	else if ( hx < 1016070144 ) {
		return x;
	} else {
		k = 0;
	}
	// x is now in primary range...
	halfX = 0.5 * x;
	z = x * halfX;

	r1 = 1.0 + ( z * polyval( z ) );

	t = 3.0 - (r1*halfX);
	e = z * ( (r1-t) / (6.0 - (x*t)) );
	if ( k === 0 ) {
		return x - ( (x*e) - z );	// c is 0
	}
	twopk = fromWords( (FLOAT64_EXPONENT_BIAS+k)<<20, 0 ); // 2^k
	e = ( x * (e-c) ) - c;
	e -= z;
	if ( k === -1 ) {
		return ( 0.5*(x-e) ) - 0.5;
	}
	if ( k === 1 ) {
		if ( x < -0.25 ) {
			return -2.0 * ( e - (x+0.5) );
		}
		return 1.0 + ( 2.0 * (x-e) );
	}
	if ( k <= -2 || k > 56 ) { // suffice to return exp(x)-1
		y = 1.0 - (e-x);
		if ( k === 1024 ) {
			// Add k to y's exponent:
			hi = (getHighWord( y ) + (k<<20))|0; // asm type annotation
			y = setHighWord( y, hi );
		} else {
			y *= twopk;
		}
		return y - 1.0;
	}
	t = 1.0;
	if ( k < 20 ) {
		// 0x3ff00000 - (0x200000>>k) = 1072693248 - (0x200000>>k) => 0x3ff00000 = 00111111111100000000000000000000 and 0x200000 = 0 00000000010 00000000000000000000
		hi = (1072693248 - (0x200000>>k))|0; // asm type annotation
		t = setHighWord( t, hi ); // t=1-2^-k
		y = t - (e-x);
	} else {
		hi = ( (FLOAT64_EXPONENT_BIAS-k)<<20 )|0; // asm type annotation
		t = setHighWord( t, hi ); // t=2^-k
		y = x - (e+t);
		y += 1.0;
	}
	y *= twopk;
	return y;
}


// EXPORTS //

module.exports = expm1;

},{"./polyval_q.js":96,"@stdlib/constants/float64/exponent-bias":63,"@stdlib/constants/float64/half-ln-two":64,"@stdlib/constants/float64/ninf":73,"@stdlib/constants/float64/pinf":75,"@stdlib/math/base/assert/is-nan":86,"@stdlib/number/float64/base/from-words":118,"@stdlib/number/float64/base/get-high-word":122,"@stdlib/number/float64/base/set-high-word":128}],96:[function(require,module,exports){
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
		return -0.03333333333333313;
	}
	return -0.03333333333333313 + (x * (0.0015873015872548146 + (x * (-0.0000793650757867488 + (x * (0.000004008217827329362 + (x * -2.0109921818362437e-7))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],97:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/exponent-bias":63,"@stdlib/constants/float64/max-base2-exponent":71,"@stdlib/constants/float64/max-base2-exponent-subnormal":70,"@stdlib/constants/float64/min-base2-exponent-subnormal":72,"@stdlib/constants/float64/ninf":73,"@stdlib/constants/float64/pinf":75,"@stdlib/math/base/assert/is-infinite":82,"@stdlib/math/base/assert/is-nan":86,"@stdlib/math/base/special/copysign":92,"@stdlib/number/float64/base/exponent":116,"@stdlib/number/float64/base/from-words":118,"@stdlib/number/float64/base/normalize":125,"@stdlib/number/float64/base/to-words":134}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":104}],102:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_l.js":105,"@stdlib/constants/float64/exponent-bias":63,"@stdlib/constants/float64/num-high-word-significand-bits":74,"@stdlib/number/float64/base/get-high-word":122,"@stdlib/number/float64/base/set-high-word":128,"@stdlib/number/float64/base/set-low-word":130}],103:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_w.js":107,"@stdlib/number/float64/base/set-low-word":130}],104:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./log2ax.js":102,"./logx.js":103,"./pow2.js":108,"./x_is_zero.js":109,"./y_is_huge.js":110,"./y_is_infinite.js":111,"@stdlib/constants/float64/high-word-abs-mask":65,"@stdlib/constants/float64/ninf":73,"@stdlib/constants/float64/pinf":75,"@stdlib/math/base/assert/is-infinite":82,"@stdlib/math/base/assert/is-integer":84,"@stdlib/math/base/assert/is-nan":86,"@stdlib/math/base/assert/is-odd":88,"@stdlib/math/base/special/abs":90,"@stdlib/math/base/special/sqrt":112,"@stdlib/number/float64/base/set-low-word":130,"@stdlib/number/float64/base/to-words":134,"@stdlib/number/uint32/base/to-int32":137}],105:[function(require,module,exports){
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

},{}],106:[function(require,module,exports){
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

},{}],107:[function(require,module,exports){
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

},{"./polyval_p.js":106,"@stdlib/constants/float64/exponent-bias":63,"@stdlib/constants/float64/high-word-abs-mask":65,"@stdlib/constants/float64/high-word-significand-mask":68,"@stdlib/constants/float64/ln-two":69,"@stdlib/constants/float64/num-high-word-significand-bits":74,"@stdlib/math/base/special/ldexp":99,"@stdlib/number/float64/base/get-high-word":122,"@stdlib/number/float64/base/set-high-word":128,"@stdlib/number/float64/base/set-low-word":130,"@stdlib/number/uint32/base/to-int32":137}],109:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/constants/float64/ninf":73,"@stdlib/constants/float64/pinf":75,"@stdlib/math/base/assert/is-odd":88,"@stdlib/math/base/special/copysign":92}],110:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/constants/float64/high-word-abs-mask":65,"@stdlib/number/float64/base/get-high-word":122}],111:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/pinf":75,"@stdlib/math/base/special/abs":90}],112:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

// EXPORTS //

module.exports = Number; // eslint-disable-line stdlib/require-globals

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

},{"@stdlib/constants/float64/exponent-bias":63,"@stdlib/constants/float64/high-word-exponent-mask":66,"@stdlib/number/float64/base/get-high-word":122}],118:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":120}],119:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":119,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],121:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":48}],122:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":123}],123:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":121,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],124:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/smallest-normal":76,"@stdlib/math/base/assert/is-infinite":82,"@stdlib/math/base/assert/is-nan":86,"@stdlib/math/base/special/abs":90}],125:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":124,"./main.js":126,"@stdlib/utils/define-nonenumerable-read-only-property":173}],126:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":124}],127:[function(require,module,exports){
arguments[4][121][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":48,"dup":121}],128:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":127,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],130:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":132}],131:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":48}],132:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./low.js":131,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],133:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":135,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],134:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":133,"./main.js":136,"@stdlib/utils/define-nonenumerable-read-only-property":173}],135:[function(require,module,exports){
arguments[4][119][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":48,"dup":119}],136:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":133}],137:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":138}],138:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":140}],140:[function(require,module,exports){
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

},{"./main.js":142,"./regexp.js":143,"@stdlib/utils/define-nonenumerable-read-only-property":173}],142:[function(require,module,exports){
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

},{"./main.js":142}],144:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var expm1 = require( '@stdlib/math/base/special/expm1' );
var pow = require( '@stdlib/math/base/special/pow' );


// MAIN //

/**
* Returns a function for evaluating the cumulative distribution function (CDF) for a Weibull distribution.
*
* @param {PositiveNumber} k - shape parameter
* @param {PositiveNumber} lambda - scale parameter
* @returns {Function} CDF
*
* @example
* var cdf = factory( 2.0, 10.0 );
* var y = cdf( 12.0 );
* // returns ~0.763
*
* y = cdf( 8.0 );
* // returns ~0.473
*/
function factory( k, lambda ) {
	if (
		isnan( k ) ||
		isnan( lambda ) ||
		k <= 0.0 ||
		lambda <= 0.0
	) {
		return constantFunction( NaN );
	}
	return cdf;

	/**
	* Evaluates the cumulative distribution function (CDF) for a Weibull distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {Probability} evaluated CDF
	*
	* @example
	* var y = cdf( 2.0 );
	* // returns <number>
	*/
	function cdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x < 0.0 ) {
			return 0.0;
		}
		return -expm1( -pow( x / lambda, k ) );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/assert/is-nan":86,"@stdlib/math/base/special/expm1":94,"@stdlib/math/base/special/pow":101,"@stdlib/utils/constant-function":169}],145:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Weibull distribution cumulative distribution function (CDF).
*
* @module @stdlib/stats/base/dists/weibull/cdf
*
* @example
* var cdf = require( '@stdlib/stats/base/dists/weibull/cdf' );
*
* var y = cdf( 2.0, 1.0, 1.0 );
* // returns ~0.865
*
* var myCDF = cdf.factory( 2.0, 10.0 );
* y = myCDF( 12.0 );
* // returns ~0.763
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( main, 'factory', factory );


// EXPORTS //

module.exports = main;

},{"./factory.js":144,"./main.js":146,"@stdlib/utils/define-nonenumerable-read-only-property":173}],146:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var expm1 = require( '@stdlib/math/base/special/expm1' );
var pow = require( '@stdlib/math/base/special/pow' );


// MAIN //

/**
* Evaluates the cumulative distribution function (CDF) for a Weibull distribution with shape parameter `k` and scale parameter `lambda` at a value `x`.
*
* @param {number} x - input value
* @param {PositiveNumber} k - shape parameter
* @param {PositiveNumber} lambda - scale parameter
* @returns {Probability} evaluated CDF
*
* @example
* var y = cdf( 2.0, 1.0, 1.0 );
* // returns ~0.865
*
* @example
* var y = cdf( -1.0, 2.0, 2.0 );
* // returns 0.0
*
* @example
* var y = cdf( +Infinity, 4.0, 2.0 );
* // returns 1.0
*
* @example
* var y = cdf( -Infinity, 4.0, 2.0 );
* // returns 0.0
*
* @example
* var y = cdf( NaN, 0.0, 1.0 );
* // returns NaN
*
* @example
* var y = cdf( 0.0, NaN, 1.0 );
* // returns NaN
*
* @example
* var y = cdf( 0.0, 0.0, NaN );
* // returns NaN
*
* @example
* var y = cdf( 2.0, 0.0, -1.0 );
* // returns NaN
*/
function cdf( x, k, lambda ) {
	if (
		isnan( x ) ||
		isnan( k ) ||
		isnan( lambda ) ||
		k <= 0.0 ||
		lambda <= 0.0
	) {
		return NaN;
	}
	if ( x < 0.0 ) {
		return 0.0;
	}
	return -expm1( -pow( x / lambda, k ) );
}


// EXPORTS //

module.exports = cdf;

},{"@stdlib/math/base/assert/is-nan":86,"@stdlib/math/base/special/expm1":94,"@stdlib/math/base/special/pow":101}],147:[function(require,module,exports){
module.exports={"expected":[7.667847191312397e-14,1.379326656521449e-15,1.3181293722388148e-15,3.738903228525071e-26,5.463485829770344e-22,8.709841050947368e-42,9.276844886752263e-22,3.940941431873948e-19,7.642824636716377e-11,3.169018150217922e-16,2.8093839610675762e-14,4.865938662133705e-27,1.5488781084797618e-21,2.3845692913282346e-21,2.554514502908653e-13,1.2447282049489277e-19,1.764008735520277e-16,6.138809000202009e-9,2.6148605306959622e-27,1.9607941342503608e-17,1.2470607207621376e-38,6.618392799062004e-55,2.298741575238472e-14,1.985122195092724e-20,5.159667890651455e-24,5.481609610939562e-20,1.4245287938080124e-39,9.421827820896617e-14,2.8106630490624164e-26,3.097618547146016e-10,3.8431107759387135e-26,5.662211104534484e-22,1.7698108108899702e-17,2.7299460179784594e-16,1.3887429508268733e-11,4.9227020519216334e-12,1.3442754708776387e-33,2.2759708696917618e-38,3.761574597399251e-31,4.987048291739758e-22,7.188830628498215e-46,1.152439291830108e-25,8.086224550702972e-18,1.1639282098258646e-11,1.1004130258123246e-37,1.2297196430399436e-6,1.6323311875585338e-11,2.84960672405484e-26,8.419588949229605e-26,6.913570175462649e-26,1.0040513972422122e-27,7.386427347254242e-17,4.580204591233504e-11,3.261545500271904e-31,3.3561514823267482e-19,7.517848898732923e-17,1.3445687608933632e-32,6.129959422309255e-10,3.84005987636242e-18,3.0588957290609247e-21,1.1021317272901323e-11,6.31579963330134e-20,1.4159761723998564e-15,1.2682658837956516e-19,7.650353148977611e-9,6.256055917757371e-21,9.399403314631026e-27,6.262977300842003e-22,3.04937200533435e-36,1.7694666365689887e-14,4.294983611601292e-36,7.352242988501055e-72,5.6798280450909473e-11,1.1181163609814874e-43,1.130931771785354e-9,8.849308266233302e-18,1.902178965644087e-27,8.697747251851064e-10,2.5090676594897847e-40,7.517730187520738e-9,1.905271861742327e-20,1.0391409438416592e-30,5.943595366262589e-21,1.414257347227888e-16,1.1908399267711972e-23,1.0523425687812646e-27,1.8316402885615055e-7,6.20517557794475e-28,3.339510212730708e-12,1.5550952350710564e-11,7.4031359350433475e-9,5.632705460864176e-17,2.0107453475757e-25,5.867190383872272e-47,1.9807338257745305e-14,1.1131942678905372e-44,1.9355061369509764e-14,2.697268996414498e-23,6.88323739650765e-17,3.116812637796187e-29,3.020358108357981e-18,1.3423908438088987e-19,1.4745127615144855e-7,6.894183467120597e-33,3.115775173893174e-13,3.3241401409048064e-8,5.021503063368595e-12,4.5756067419491e-23,2.0871042089007235e-14,3.931541109263434e-9,1.6814410115148002e-9,2.572562899118397e-15,1.4534274555690387e-17,1.3836380828890875e-11,3.284607606504136e-25,1.2187398090100143e-18,6.807931166407861e-11,2.7670083493421012e-11,9.238448628846148e-13,6.414143502946382e-10,9.029520261842738e-10,1.6801581285144513e-16,1.5455546838596196e-13,7.13000724560453e-35,1.0967311490384162e-29,1.2454717212120317e-15,4.57125079863743e-44,1.1337394980589791e-17,1.1516571030499593e-17,2.2648080030010777e-17,2.1606359903348296e-28,4.773468551031866e-34,5.176252878746358e-33,4.036102499354761e-42,2.488409384486444e-32,8.119929307776326e-14,1.8863990120141314e-11,1.644999659729931e-47,2.147821544810158e-28,8.23707260519766e-36,9.613143870367507e-12,1.769479335813765e-20,9.146109477889558e-87,1.4701856407626976e-9,3.585585535489665e-15,5.9694648112622685e-22,1.6837955741125852e-14,3.1535761102453077e-25,4.2465157496789856e-16,1.3029107471268117e-11,5.1030457199594465e-40,9.1071048999212e-44,1.3587148975742851e-15,1.070704697825227e-19,4.926817655739677e-25,8.753541642338935e-37,1.7657150622570072e-11,3.3509866655721177e-54,1.5654581711043422e-9,1.0249107925331212e-29,1.0571229455666314e-25,1.0389135050302243e-20,1.793471086882729e-12,3.3611327789268555e-16,8.769678826543942e-25,5.6598549456836866e-15,2.6806066615256364e-11,3.034806603318255e-20,3.923407094557354e-8,3.0500915379571516e-22,4.262596591695065e-7,8.382737635408595e-10,1.5693903798451704e-13,1.9432766644959873e-26,2.7685034826441423e-30,8.93615109890968e-14,5.986751180853658e-21,1.207427922762061e-19,4.5166574296475344e-14,5.0708366918337765e-9,1.7998772800708218e-51,3.2881519052610057e-25,1.0409641921830104e-10,6.28232649181857e-16,2.607888592929201e-18,1.5149937149659002e-12,4.3920644303147807e-26,1.5491828964529502e-11,1.0675190247117942e-14,1.525090265737244e-10,9.841181523349992e-12,1.5141477849301298e-17,2.1681528453061878e-17,3.9297781456813294e-13,1.2117596660567842e-12,4.345741303580059e-20,1.1493046513201078e-19,3.1732268159406306e-11,8.439192336610458e-31,4.53623778773106e-40,3.479940771637602e-45,5.461441269111667e-25,5.855314451714719e-6,2.5884844950561145e-28,9.453629521604396e-22,2.189386176637057e-21,1.3582091532383275e-23,2.1045495772023674e-15,1.8467344077673646e-29,5.529028286761443e-11,1.2299467074633358e-9,2.683262506677602e-27,3.795020779761474e-21,4.876349893648314e-13,7.735755111679409e-22,1.1414183051086303e-13,4.0668844941535384e-20,2.155607558612257e-10,2.4812958139506088e-20,1.7624849960424175e-8,9.47042415894241e-25,9.770772986367166e-27,5.0968011008052313e-23,1.4490218607437776e-22,1.3761691140073928e-13,2.2166708612840262e-35,8.331799049177816e-15,5.04101276496414e-20,2.1041505096937237e-24,1.1114146532635137e-35,1.0242665588923107e-18,1.732071262808559e-22,7.514806812025647e-27,1.4008729140144712e-25,9.58768598391304e-23,5.427928621331972e-16,5.190099903142158e-22,7.04291007192644e-21,1.541275175150536e-26,5.0792100027536324e-30,1.1904913501263624e-17,5.878030770115701e-64,2.6152764827099844e-17,9.039328196231218e-11,1.8634466887613546e-18,1.0497234436591349e-10,2.136988517785373e-24,2.9421244365559544e-16,5.191646890945689e-22,5.567116878334455e-16,2.7154643553490177e-25,8.113491982062338e-17,1.58527826420298e-21,3.006080334159467e-31,2.15464794571856e-34,2.0134808541738303e-12,4.1287716081110683e-22,3.447165725174286e-11,3.3560970271490755e-24,6.515611687636314e-15,2.2576879511644371e-69,2.1252515046343318e-24,6.368503166128447e-19,1.3100785983615913e-34,3.88754796277048e-16,8.940483790630379e-27,8.516513920761659e-12,4.525731607706905e-36,6.341357237431711e-16,4.901173131197001e-12,2.18059257748288e-20,7.2253426943930535e-12,5.350558192271528e-13,6.182490959268669e-41,1.1822447061494573e-17,7.095370305647549e-14,4.851603323062919e-11,8.170309428597093e-34,4.88657357105164e-10,1.437079687255366e-14,3.707601424438536e-20,1.179386734661504e-18,4.734404538773354e-15,4.335909086876019e-9,3.639054371458075e-13,1.492444462310212e-20,1.5876350263079184e-15,5.094038852381553e-11,2.3494104029995837e-18,1.5246201673223902e-21,3.628273270517096e-11,2.4424368242808473e-24,1.6582850659476239e-16,2.9094390261097117e-32,7.139108614297963e-12,3.349720033748285e-8,1.0277153333694276e-19,2.0527773998194458e-12,1.43084632619875e-17,2.4328252547522708e-31,8.779977130107974e-22,9.883447153662553e-44,8.679356831729682e-22,7.570774492607971e-22,1.6096502314594893e-15,1.080255617122082e-15,3.8758698904518045e-47,1.0354321064424875e-18,3.506542935709517e-19,1.0583465518292972e-19,1.6485865831539666e-16,4.1034637167915927e-13,7.058455189546832e-27,7.689116094304502e-18,1.748249156150086e-24,2.8686458913039203e-28,1.2507824726574473e-19,1.4923459165051887e-37,1.702582940239326e-9,4.184564501736871e-43,2.8223060581496465e-20,1.6622356439889313e-16,1.5127782291469085e-13,1.6387780178000155e-23,5.107235119517802e-6,4.2345384674494295e-64,7.649385427246534e-31,8.721252901956287e-14,7.370589539477877e-14,1.1702055004440504e-40,3.4838766658813793e-10,1.7806512253620733e-16,4.396714580905074e-16,1.831297451017479e-33,3.662227992990111e-12,2.5401575446752976e-12,4.416534564893299e-11,9.726768040728497e-17,1.8986212991246867e-13,3.903731364547009e-22,5.034049199293562e-49,1.9600850004425822e-11,5.060295223138953e-41,2.9498807164783946e-27,1.582876124874466e-6,6.049795337746818e-18,1.4824099928501821e-18,2.5676722631225025e-30,6.4669730704869815e-31,2.024634832470368e-19,6.511859709717859e-18,2.1735159557975633e-14,3.233843037346483e-22,1.3510219909115101e-22,3.8035182191395804e-17,2.0526517764850214e-12,1.0852914986818967e-19,1.9233806652814904e-15,9.674951858809307e-21,2.7903346547723422e-22,1.0169868696943543e-29,1.432878341584998e-29,3.1841987089576323e-12,9.49867446516734e-15,6.05620911930401e-18,7.312466412747527e-15,4.230042432586992e-32,1.1661289142728683e-10,1.156593524438169e-22,1.0178907888806928e-45,3.995078120916993e-27,4.722311464635275e-10,2.43914252176062e-31,1.6732356303577615e-9,5.057208974365594e-20,4.1873702489496e-36,5.325625035574342e-25,4.519849813772588e-56,3.7726623723617684e-19,3.390448231310705e-15,8.854902443525629e-26,2.3633643700931107e-8,1.5789741766866974e-31,1.2010814355060928e-12,2.0412669214474794e-14,4.2910421885165474e-8,2.6688850010859985e-25,1.0886074319523384e-16,2.971192865776906e-19,4.798003729697599e-19,2.691694600431221e-9,2.040920097621206e-9,9.196027880064071e-10,5.037675673382088e-15,7.290237622242403e-19,2.1190259678253997e-28,1.9501382316973093e-14,8.894723273254953e-13,1.3900167317561668e-30,1.764262153044841e-49,2.149823061756379e-26,1.6726755062395483e-18,9.977320779137538e-13,2.316909874021434e-20,2.9948157401744426e-51,5.1930511781889074e-45,3.4273525182903747e-12,4.935897592600753e-14,1.4875045285379086e-27,3.2140217988794565e-22,1.9233187662646743e-15,1.0667937777378418e-27,5.598612171740118e-13,2.3472739020578995e-14,1.1569434258052215e-26,1.6432949518885033e-25,2.7015296836707063e-27,1.0895872565318317e-18,7.357262741962843e-24,1.2801638014979998e-7,2.1761917697686914e-6,3.125228871132936e-28,2.604718892020115e-60,1.1826885669250379e-8,6.589680783657098e-37,1.2948693249303196e-30,5.033844076394719e-10,1.0895571223690336e-18,1.2270119187607178e-29,1.858787313246729e-21,1.0920518307667751e-35,1.009764733051508e-9,3.946256416995658e-45,6.627568129386545e-14,3.38818111211685e-14,6.854983632555675e-12,4.256702995836385e-34,4.416700192538431e-23,1.7188526006658415e-28,2.7778766237378604e-18,6.091539902504819e-7,7.331633716704551e-19,2.6793004225374012e-8,1.3322508559859002e-9,1.2101752614649541e-18,3.2370080282788893e-9,5.572402861577534e-31,6.331696183173251e-19,5.3762682172665496e-14,2.3275835557824518e-45,7.15664675548174e-29,1.6997239222738675e-21,4.783535615048351e-7,4.851780550228416e-24,2.9483652644751037e-15,3.2046603389720964e-9,1.2871709295102761e-15,7.87650223503197e-9,3.807900954669604e-20,8.132243759587926e-22,6.825620877649966e-12,4.96632898878062e-19,2.083420239913165e-19,3.4823701925612328e-15,1.64907077106838e-19,1.9201524048779887e-20,1.7737128776647058e-11,3.4570191254901345e-13,4.78132282348128e-10,2.8998401973703085e-17,2.5713299942912324e-25,2.3368310935703993e-24,2.0742018776793267e-15,7.423827762561488e-31,1.1326625604257623e-18,5.778577578889253e-14,4.6964189076201073e-26,4.747935581684848e-27,4.764217441466741e-26,1.467061563780465e-16,9.840334623994584e-31,4.451901740404303e-11,2.7717582636668055e-22,3.1093140511077996e-13,6.776579924768563e-25,1.2892796316911949e-21,1.1292879943199278e-35,1.3572855541886694e-15,3.4131690736742965e-21,9.330799518994636e-10,1.8553228361712838e-24,1.4645260632110485e-32,6.946423245602172e-13,2.613217556375891e-17,2.273508152448354e-15,4.123215041334479e-24,1.0234344369637475e-7,9.287167049676705e-11,8.027001989395336e-18,8.102643434964637e-8,5.588679726607306e-29,7.325499600580147e-9,1.2072504764926435e-34,7.548278370846728e-7,7.062789587045476e-24,3.4168561805629975e-14,6.3774051552072966e-15,2.3566941683770426e-32,6.114013828524903e-24,0.00010706845410383578,1.266822977676281e-7,6.571873823316922e-27,3.8011987007691155e-22,6.743667778388075e-17,6.7581515287117164e-18,5.54282177507765e-20,8.093733324481558e-10,1.8067859727215436e-19,1.9189725656772545e-27,1.5643906247161933e-30,5.965165882367557e-29,9.282206224750955e-16,6.457596195159391e-35,3.6117793482968436e-25,9.877490527169765e-12,1.8297728829031598e-11,1.669048718035779e-37,8.3281264776578e-26,2.2946350365570306e-12,1.9509860358841747e-11,1.0315242901233935e-18,7.61192156413012e-10,1.0731453089761796e-29,1.3560692390341743e-6,1.0965091788718465e-24,5.225911853439233e-15,1.6954330722565949e-9,8.514561786105027e-15,2.65255640191012e-20,2.5023304916754513e-16,3.9331785588355985e-7,6.5364998928090035e-24,7.39229968249502e-38,6.788719433080396e-25,3.571188880506924e-28,2.982948336044348e-45,7.647842110895859e-11,6.0355596407205445e-9,5.979525528610406e-24,2.585721582509432e-30,5.1102550552683435e-14,5.450480888689667e-23,2.6245899065365154e-24,8.276426828019778e-14,1.0890915028086909e-21,6.068429586544407e-7,1.7102010734586156e-19,6.569299203648403e-14,2.294601746633655e-13,1.0420648505319674e-27,7.545851246942366e-41,4.916202441693004e-17,1.416796457572317e-20,2.335265229822114e-14,1.698678340085547e-20,4.61517858676052e-21,2.5451283966715705e-21,1.7860044587684103e-22,4.1970679286494756e-10,3.842979612606969e-10,9.479340183264234e-18,2.1657756159464724e-15,2.788196758406526e-17,1.9694203295370316e-12,2.726347452263906e-13,6.048598348929603e-22,3.0217065696756367e-13,5.012317664937408e-25,8.37032617210973e-29,6.405780193753159e-28,6.8839867459243e-20,5.755045908804613e-18,3.443185810525213e-61,6.269810594227466e-12,1.4029484512348984e-19,1.611532460147616e-57,1.6350349282739873e-19,2.7197970466292313e-13,1.8914097352235497e-23,2.3239658758374012e-15,2.701270720618976e-36,2.1660365785042494e-17,2.0098229007946227e-23,4.860677753694827e-30,6.987798063211348e-26,1.0248911205546902e-26,1.1067213820186926e-20,2.6218399267824244e-22,1.319689754508224e-23,1.106382322409087e-12,4.531966320974319e-16,2.3894154496125527e-17,1.0973662339350854e-10,1.9578580258021896e-11,1.6483420896115487e-30,1.7752040524321239e-13,2.7984408053557848e-39,2.6562314706555017e-14,4.443896372423943e-34,9.154555604535808e-36,3.5163044209871244e-25,4.797374718199853e-15,1.5881958319483102e-18,9.96729161897471e-8,4.9395159447046527e-20,2.2529688579903665e-20,1.4196758013711519e-15,5.652536163325458e-29,8.566600040412698e-25,9.447446235509056e-26,2.1374634885332986e-21,4.367086446541716e-12,4.968936794676015e-21,2.95729968738468e-13,5.3931720591478355e-49,1.1010821823310049e-13,3.556132787972499e-15,5.534728333395647e-41,8.963740113907816e-22,3.785413774530851e-8,5.542642688380766e-13,6.237480516419009e-11,4.958289938020802e-13,2.188684848359386e-18,1.4198216751951048e-7,1.5140232855601513e-17,3.240810774891631e-50,8.013370978670917e-26,2.630535499155556e-15,6.757291613016907e-21,1.6875463829150377e-13,8.647998626348451e-18,6.722316427398395e-11,1.78248313053926e-14,1.711166313121648e-21,4.520835654889629e-12,4.3529547179851004e-38,1.008799092964363e-39,3.375599835869888e-35,9.31876137412034e-16,1.5261246063579458e-33,5.7698058758146504e-8,1.434643493889678e-16,6.922654324371514e-21,1.2999253872516394e-24,3.183837500788077e-8,1.3501827540424298e-28,6.479507655319173e-9,1.338624326277294e-22,7.291582043224958e-27,8.313858745236139e-26,5.7854629672681436e-9,9.565439986768428e-35,1.3455658926211761e-13,1.6239376727599653e-12,3.1982837389010332e-15,4.38664517313816e-25,8.774339866277884e-27,2.4322798338418474e-10,2.103657700773965e-21,1.2693928515082169e-27,1.0874818534155756e-19,1.9677870746036396e-7,3.40149029805544e-30,2.1719155083604163e-20,5.004488228181187e-21,5.0908880214003177e-26,2.2050470282309406e-21,1.1961657844306935e-20,4.788823515054316e-12,1.9431907376331223e-22,5.555361788240941e-21,2.151434649898103e-12,3.863181871832431e-24,1.721620226783982e-19,1.5031643240378877e-15,6.329809979766382e-27,2.5384282917652e-32,7.839911981309284e-13,1.0171311427875933e-18,2.7451001649383774e-13,1.0562785410567995e-19,4.543682608809032e-15,1.6940477491473442e-18,1.3753906028874972e-7,6.726115410418946e-10,4.313821918663216e-19,1.361391985279466e-34,1.855542524061398e-21,6.977725723029152e-11,1.147969409533481e-12,1.2829776122865137e-17,2.267523762008987e-14,3.199593996788546e-27,8.384370236562996e-21,5.014485807074455e-25,5.9067344004436344e-9,1.553006316152589e-14,9.045339378820899e-27,2.2059102582029916e-52,1.1266181403595923e-25,1.532302306049367e-16,1.044432007505058e-28,2.1726127621889347e-27,6.525140670089288e-16,6.004806674853339e-23,1.3583406021532857e-13,1.1872924085504055e-31,3.190659415346397e-26,1.5828512391175373e-16,3.1187309793872494e-15,1.3889464686774438e-14,2.6704705179207485e-15,8.723540247113001e-18,3.0724025141445625e-17,1.7730207398882976e-20,7.201966292047907e-14,5.318346131787024e-28,3.79561485250484e-7,1.0489528156312846e-20,3.7061987581382085e-14,1.6466577209069744e-22,3.5280113176967583e-28,3.5514333511303224e-12,2.1434808243814403e-12,7.772504614237147e-21,4.8256625910379775e-22,7.983598938410019e-27,1.949957290564641e-17,1.767988950646441e-32,2.4859471900782563e-16,1.2739316062770803e-20,1.4353745256606222e-22,1.5240772467681674e-6,1.4681035333599275e-25,1.724445224285977e-15,3.41205387247373e-13,1.1792529727200661e-14,3.111929859113993e-24,6.844829436638411e-25,7.445306584196775e-63,1.6915505815122851e-21,7.104094396705522e-54,2.4984949991986125e-19,5.451897463005272e-16,2.6679516840330024e-39,1.6707581995918361e-21,5.992922207317519e-18,1.6228382735853324e-10,2.6836645890085156e-20,5.917932075216994e-12,4.623757794177173e-32,1.2598215782285594e-10,1.5154465586928093e-21,3.1505107465620883e-14,6.36678523725448e-25,2.371262648293833e-23,1.281512583897163e-10,2.614348735732229e-28,1.000093563828458e-15,6.604030941291662e-31,1.760076663700726e-13,8.703878768087323e-27,1.9197775836425776e-18,4.009288896892458e-12,6.936066840812231e-22,8.374506219487258e-13,2.5375867215243226e-11,1.3487392418334839e-30,6.88132102122326e-19,2.9683371089314827e-19,3.670895468860036e-23,3.92168475798135e-12,2.5414894089854813e-10,1.5772802662913328e-41,1.1200449877331408e-15,5.306659843858931e-17,2.581153452473819e-15,4.95069148167456e-7,7.174148779236882e-21,4.8590311524137944e-11,4.6416150455097784e-11,8.764374909267264e-29,9.74881568129141e-21,3.4425564639303856e-5,7.447179236228663e-15,5.903095728685428e-16,6.709628287766993e-15,3.733757968407284e-7,3.29628649979089e-17,1.9763455291951458e-11,2.0410291130302198e-14,4.4295684409194545e-16,4.21663081818836e-12,1.7278354181093236e-60,7.60848349551439e-15,1.7974833424708275e-23,6.852306423882877e-15,3.0698860301009946e-19,2.8855432261873363e-8,5.699963865911375e-17,1.1742715563384459e-7,2.2075556391265613e-11,4.285707393918274e-11,9.120220602177432e-30,2.2168478694523376e-17,5.547980060565702e-12,5.0515350065861944e-21,3.070777350363929e-17,2.8442490390540795e-9,7.159447057593743e-34,9.700734706109047e-26,3.4868538089233466e-37,6.940777677746251e-12,1.286944920133767e-11,1.1641415935922842e-40,8.295003702184708e-12,5.210564582992452e-7,8.307127759610012e-20,2.2018174502431793e-11,2.549658471180217e-9,8.248903079572883e-21,2.4990486829006893e-21,2.8606234703788856e-18,1.0465967416601308e-19,3.467960613384251e-30,2.536932580530964e-26,2.3382538029043e-33,2.2564269507247345e-20,1.2021131803484436e-5,6.089976583278444e-9,2.636464101960582e-15,6.763610149434999e-25,9.448974516271529e-20,9.056225132296317e-39,1.1650048931705954e-15,1.3998408583970668e-36,8.552768827748449e-37,5.626823178788356e-39,8.210581745819327e-10,5.953889308496936e-22,3.459350485480922e-26,4.114531631684669e-15,1.0240696354952005e-8,3.274307167581528e-14,7.33612601795503e-27,4.953970680361052e-22,1.1461208892068376e-66,1.2040866361927922e-13,5.819696740814018e-22,6.650629994940356e-13,7.799516868995759e-75,6.25782500477668e-14,9.28113803057561e-25,6.003287724570786e-18,1.0314746781803407e-44,2.749492173984615e-19,3.435208491849231e-24,7.969890524988559e-16,1.328689900235294e-23,9.970793067619713e-26,7.066982748222622e-24,5.357238996883489e-25,5.52924334721633e-20,8.000717930263397e-14,1.4347701212389635e-18,1.0069774420290737e-12,1.225629761027465e-22,5.56639563430585e-12,6.192162098258778e-27,1.559963481903483e-9,4.430965349580429e-9,9.781954028240687e-18,1.8671065061084227e-10,1.5386208751214956e-23,2.3400363546720272e-14,2.289229219732652e-16,3.471201031543631e-40,1.5806064605139785e-27,2.4548572181624658e-9,7.733949655390504e-13,3.0855534733169126e-30,5.058656432579247e-19,1.6457773479946953e-18,4.456408496199035e-12,2.0436022669554028e-12,1.2464363023908751e-19,6.742495188878626e-17,5.3204415776957866e-8,5.614806337292346e-13,9.209966184084672e-11,7.324988369045048e-7,5.328514580561207e-20,7.796389726186187e-11,1.200394822423426e-10,6.890411412700581e-21,6.861249421003658e-17,2.5709312771936684e-35,8.279794352356942e-20,3.814987491326831e-8,2.6028578761433638e-9,3.0688094143209917e-7,5.891207899477276e-20,1.2550721423795825e-18,1.5525880413479942e-16,1.567250440824476e-23,3.0870867237882837e-14,3.891276132617715e-13,2.0582343926964953e-33,8.712047677517583e-9,4.02129703895634e-10,3.017176072943912e-44,2.5843237787343306e-18,5.128495888558112e-19,3.1804594213389085e-13,9.53322912102537e-21,1.408895411892993e-19,5.422927435451971e-27,2.509233143201606e-53,3.8027265120071785e-15,7.812004813020493e-19,6.302397211272944e-10,3.2011616821447348e-12,1.3948603001279734e-12,6.451634119509944e-11,8.69367342536417e-37,1.3334404215730527e-27,1.4160237944439832e-14,1.386053249216198e-39,9.990766290509897e-19,1.5179069624118207e-12,3.494108046619426e-75,5.46477121985757e-19,1.3707660083605969e-14,1.4512658895526848e-11,4.856795294157954e-7,1.4137865238343863e-15,4.5970062290141285e-21,1.4136204451060717e-10,1.01382546251832e-24,2.837092105250759e-13,1.0266914676862204e-20,3.7180266780437644e-11,3.322180911966594e-46,3.4303820794785667e-16,2.143924527160033e-24,1.0419098827064658e-11,6.380847125086559e-26,1.0622914832442755e-23,2.5945797646830323e-17,9.0757137434081e-23,3.1540649489667657e-21,4.656994081867312e-38,2.563092105356641e-15,4.827660720311821e-26,2.8041612819138345e-8,2.2889541832944454e-17,1.5130295095278855e-14,3.392696147920171e-35,9.403205953112931e-17,1.3257606448666794e-14,5.2314138066527005e-17,2.949676080245834e-9,1.2625477645043114e-17,4.040385665483775e-24,2.995399120087912e-21,4.015572879189342e-17,2.4226157606978e-15,4.5336202004456506e-17,3.725575563636506e-18,3.418359082728216e-24,1.4034170913657033e-28,1.8839398727872238e-14,7.072505361795395e-12,1.1022206297030194e-25,2.0201328144373783e-7,3.6780638722567275e-63,1.812956972362248e-23,2.790477719045376e-19,1.643180476931247e-16,6.230144381589951e-22,1.6402196715285394e-39,1.0297966709636084e-10,5.986397042068738e-35,6.117198355115457e-23,1.2127162777267084e-39,1.9225990148336875e-12,7.568466725849371e-28,1.3872105715338583e-19,1.943974848433265e-17],"k":[11.882656270401665,27.223676728255096,16.535238027068132,28.551459765544354,17.423876506362326,29.819872043286225,14.514615031066707,11.966638844295524,11.3641235507884,27.849268858939638,11.908475890375932,28.988165116010173,18.84993304677756,17.124764354048576,24.496508621053806,16.755929549600598,18.872610326827655,11.52913080268053,22.099955349146533,16.15185261931391,26.83536370542145,29.397637353136965,17.025413792209175,22.187367280530754,20.62621521398892,24.56347734983249,29.018995343782436,15.387045155929426,29.482422597821234,13.696472405936305,28.202246751805617,15.903535637085913,15.827970152449517,29.34561532293008,13.049743785184074,14.035170286789626,29.090222315335502,18.412765926166262,28.62936100106276,28.235651123164192,29.43041188227619,27.987248064355384,18.5413768811234,18.368689476843624,28.096056334026063,10.263533230483723,15.285142974264039,23.9471775261896,23.56415677721086,17.374811663769382,29.252569140412618,17.85585656933702,20.111195527629356,23.5277489266775,23.068282542440272,26.03310151556476,29.147199499148154,28.44780659304801,19.839634643993644,25.922116280898187,17.80494257791913,22.76680345869417,10.878563844196766,13.83316074475541,14.646070055521658,23.019343212132902,25.54038603283192,29.499190191964644,14.178780440722264,14.358181947418295,16.675525362802247,28.957441848408806,12.216099643864098,27.018727209408546,13.005769864410798,15.952761161746807,10.376818525355006,13.327246954041762,28.548240011014933,12.036862951153001,17.890831807430523,26.322711945233117,14.918007943783596,16.225453928790294,16.432688297455442,23.961798547800658,11.20930997487319,15.675341423435674,14.315498107675877,20.369551944535832,12.67953940817019,11.184883797274882,19.079293032978416,18.10721993012862,10.923791963025668,29.192521367470967,14.73163331826477,23.724026854505222,16.844015910004142,28.463646695892272,23.254858409432856,25.31214091398351,20.94245461251942,29.55112838467999,20.599420444085403,10.006133175553487,15.009768129706247,29.309069381714373,28.624889776106833,19.706359426843377,12.310606569694977,19.599119597072303,14.715180868253345,17.608121531933403,22.82562274762475,20.26712630475099,20.0723444814361,14.517678322037334,11.800005879622471,22.339665055429894,18.69541142094831,21.94033841312985,10.186714584705484,22.527736524034054,18.598754428187583,13.16305474525619,29.020712723448746,24.632028924615575,18.209387892426317,24.21613282785359,18.481313175187637,29.33246474954139,16.27259615229162,28.33138845068167,21.95750556727875,14.452736465631215,11.802303195014176,27.232730616926013,21.049107494617665,29.13703079020731,24.025131301280247,25.3171711063283,22.07984171517054,13.405108067051517,16.575296453979238,25.190644050465355,25.52984275094406,17.695369468753963,15.367888821612636,13.95628331428866,23.770594000840205,26.249127320670183,16.968120174781095,27.061367000066205,20.262484645616365,29.84278081249056,10.61287035425934,24.746084157109127,11.233298270324514,25.88460071042878,23.548583879691776,21.611765708888736,11.357719638876382,21.587603163611575,18.21451258760821,18.61228595270482,13.165789425798625,14.243300273551181,10.199440323417681,14.176815106178653,15.898302949005188,13.470032195406194,15.99965121591589,29.27414506655087,29.65596948479654,15.194876509691264,25.987862036000525,25.34875913249579,20.631823221563256,10.982066313816063,29.299029489964727,19.945565578071633,18.375922610751108,18.915772128918668,19.65369723922847,22.233135198168597,22.663158110452105,21.498904633051417,27.816115867689287,19.067765515693406,11.723007834993503,20.37150817292219,22.033579886431184,12.270666007802848,13.395117220356973,21.057213279296697,25.329688969257575,11.44084847800379,26.387860255513537,28.065676936200354,29.607409310266874,27.336685855283246,13.511625699082227,25.363058959901068,23.343587559175653,26.05065804502513,23.63059630562415,18.217945374896438,20.693979061427985,16.092675315205426,19.774580397572947,27.21142833554267,24.747564903295277,18.803159704735016,13.98016293215338,15.86895250068304,28.082547113085337,14.744023498310877,27.379167783378872,11.85217852607674,27.424808951013958,19.14635748935377,22.10396998549273,27.032195023420602,17.959475779728173,22.151115416091653,18.617322296198676,14.600021774012411,25.699098374946292,29.961389556405283,25.31996050124214,24.693101155407483,29.797602391957184,28.613557782150018,29.94444280029694,28.032026460856375,26.833887603809387,14.54697722749164,19.800995228868217,26.666524399265157,14.869580630553209,28.1576888891848,22.066600891033193,13.832707330660465,20.103663094670658,19.219436443321953,25.917583516646985,18.615511606868523,20.82720050048236,10.569175293862969,19.690745439627793,12.176511991349201,24.362443565666027,28.520648278574107,22.9409797758945,12.646237583983515,29.43136893092262,14.08422739036762,29.15194323463194,20.994822886611605,27.676968241036462,17.491485916749554,29.82459604571899,16.612019551821696,19.617897501276115,24.892631486952776,16.88581363810167,19.971136328234586,18.106712431271426,14.104367261592209,28.353406423077274,11.9213930193091,12.846319994190507,20.416493828647887,10.317710020389175,10.336995191929766,12.46980062363233,19.356277218517523,11.739147462669957,20.155660595551037,25.1018851285166,27.363077746177296,12.05885080513292,10.780882579646649,16.40393363504478,20.781497678132233,18.23581500950941,10.101674157028855,25.98071819960792,20.356012858174402,27.051061513207447,25.684882393055343,27.89193916139768,28.75686677820989,12.62591534122421,14.65327498713104,16.437695390502384,11.129075475721484,11.114385485235676,28.66432641651318,22.264457748851466,27.741826861472685,17.09420696557669,23.627066370400204,15.360993575828573,22.50132351609803,29.16510320151945,20.52285362964524,23.80269809055637,24.388298884856265,14.738418011045965,18.94225757156951,17.975575182332314,23.008315825050833,14.346826142902307,23.719117363488454,23.01582708162854,16.787441850939892,10.431547070788554,27.246090996221945,26.817744013997455,18.458707398138124,11.411016640033926,19.348577879310227,11.76430379159902,21.149875527468538,29.205438922144378,22.362752684039066,23.614193560954778,25.911413359729476,12.202942524311506,12.705505573461288,17.520314793920193,29.92113539855962,12.2232653439529,18.092914329464186,13.759298196002021,26.731305425232478,10.593411300387023,26.23794029948285,24.57288231415761,11.921895310574664,29.746144017904427,20.697188760784844,12.093576579198064,23.475057341986783,16.59723839054677,23.553080595333455,16.018945416250318,13.789945463392005,15.517177309264284,15.575928181288191,24.546320778698025,23.742258143242296,10.695657058063768,13.96667147068985,12.381336488939446,13.70843733082442,23.86985615724974,15.960820018237474,11.319363328583192,21.294282963903388,24.392510798582194,21.21231806405037,26.20540233426091,12.143909381715696,28.792739663120347,12.58176269267052,29.11134202588292,20.392583222855983,27.71804828121047,13.258332741521626,25.43906122876766,14.58233429866889,21.923506373772295,24.254047040927095,26.068312104918434,26.39173207813553,26.075127978964836,23.427617336057143,27.885047491559632,10.039197444207911,25.94367047570416,15.262905607664067,14.134643378081936,13.495104358478681,21.04853535370863,17.45296775916252,20.695047427820317,20.80734518541024,12.791727689527699,10.273592448028662,10.955519796607227,25.58753646103191,25.846186008297654,21.451663658861587,10.743814995629117,10.815098095652242,28.067833126400494,18.280198771766358,25.608564205962963,21.0295900604337,28.748843547463828,26.664616690182346,26.610181743344647,26.46053966842799,10.874708540496446,18.616293967951968,24.22022440736658,29.8981866786796,17.694842541347757,20.563213427491466,18.349783977532603,24.670473873254984,25.72705179661483,29.027050525939554,25.038465079673983,17.45711723208176,25.335952086618327,12.238668344462686,10.129457359414943,27.69004785112329,29.932490974047987,13.153273012806231,28.796622600572313,20.845973183211107,11.644343326383284,13.721233131369338,27.92672230799578,19.904061742354244,24.05342078155424,23.863760567594213,29.775092851829438,17.773841243122774,14.99795617970439,19.605576467888106,27.956017371608695,22.312058812890093,17.730461531349384,15.117605465810007,10.765816155929224,23.435450702518715,12.6011936693839,14.552121062051562,25.592746974835272,19.60056966268032,27.57690843428799,12.469594020576768,12.919966106080945,26.837826060828846,23.249378548508286,14.522376636848108,10.297706462101255,22.507512466896703,20.57741387765187,10.767275230385849,21.32706251167386,11.57482131961026,25.491284766683325,27.67321423663799,15.245903330774349,25.55953754065497,27.824100496590297,15.662286017159728,26.159657544838247,17.01182808397137,12.642563545409779,17.05983462463571,16.864657845562835,20.52254318296315,22.26332823377982,21.877150793030044,12.26457515247633,28.905727849925405,24.742969499591005,18.05538134219638,23.074192873703264,23.780250895755675,15.234355054807862,20.793448743378825,28.165129804825128,16.20315705460035,29.147119798308797,16.488920795373502,21.93540866962548,18.708666332362554,28.079808833657246,26.820589708054612,20.69134548876839,14.19065575624411,18.64051355997617,18.6354957332669,23.51025465513763,16.95697516512803,17.347082395605256,22.89058545432845,14.773278288610104,10.603430596464136,16.805822961216506,14.707954083848978,25.27357320858036,10.297058983036944,21.153322891758236,15.456848313227587,17.887298825945592,19.64510457320959,13.570691326811396,25.07539842356492,29.971303298973258,11.001831548038759,11.42204488957657,15.908465561404572,24.1383837887065,25.178565066697974,25.292015996722583,26.208390951314207,19.457756178413238,12.999371110205708,20.61830927704701,17.819600642299534,27.21223984462184,17.75582178293692,28.998971659944957,27.741359952593456,18.580438057598144,10.545369914372174,24.86082307479707,24.038844996644457,11.748457080466634,11.857042279594392,25.91388661858874,12.65220263332898,29.61204112116214,11.800150591321717,24.921516729588692,27.321677554260443,11.285509685076995,17.626358731230898,25.72124700759933,25.04185659912647,13.961880890594692,25.80027659446864,23.64494822405735,10.37066351085632,24.783809471838097,29.524402656950546,11.812938796868288,11.811776375833475,13.139203526967304,29.04702709677435,16.057736912524533,22.04634279915915,17.010766131259686,14.217326923063114,28.00447710466098,11.440095457830042,13.758642572380161,22.23026383872368,16.03679208668018,28.05069688010319,20.217041734193263,13.064112745918939,20.26576582886499,14.026177652102847,24.90845124992312,22.02571658192625,18.785547550529067,19.94690908803957,13.069938376020378,10.375909487716989,19.089209805377664,15.513207207360246,11.66289680560373,13.054110321532706,12.694282660108055,18.699311292651903,13.420117427126241,27.709508867301857,16.126814105130304,26.883088001922488,22.706743491786803,15.999685347729216,22.38302895243645,10.615630025659964,18.33418556569294,29.807138270804018,24.279905876788945,26.44157119410325,22.20088477854491,20.8872926341653,26.759396641909994,25.781502359344245,19.55946753260834,24.784157955780092,23.55562970176619,20.9003622182095,11.949347431411121,24.300629473030064,24.523996515087248,27.4359442575912,28.039664680160303,27.55078498048585,10.35584471735223,10.50549394797159,19.088615673120884,14.341980427496992,18.320827725443177,16.352809985318387,25.81968591095269,29.027291500969113,13.691648537587975,20.605887637526585,24.776946003997764,10.017409129577807,29.4831133197661,29.82611666274547,15.080980570680364,29.45787234099233,24.016545843534416,26.576651377701985,21.892602498767552,18.822804691215577,18.922255410748416,18.917547607031576,29.181146142345014,15.311704528566645,12.019744279456091,14.521466617027667,23.79935100995736,10.879047298618417,15.289061688513538,13.550999277020178,27.23378215162522,18.303054585126116,11.185857750708745,21.95180503746564,29.804440097339402,26.911237696108273,25.87318553506161,23.95662599677064,10.355677961938232,19.30432875761022,16.865923125373822,12.621547249401956,28.2073112806231,19.667345445402503,29.61441056321396,25.306681843603933,20.41609193902733,10.775400358867868,26.305044506641945,11.793979295949137,24.003614034203355,19.09403023960181,29.898880865281395,11.089038733501706,25.074133869450627,18.061710945761057,16.683329433691764,24.14568898386428,12.727143649945724,11.197242406060042,14.053209384407266,14.75243653654739,17.60163450571234,18.77058220782888,23.70626966689827,20.283758889114964,10.91206492433745,24.38204886052185,25.399882444657553,24.30537123942878,10.207174783295244,29.7107812748555,25.943488712618304,21.655431954412187,10.521881412603932,12.879198935176884,25.604274127685155,19.416487121489865,22.23519194946291,16.602629747102846,17.405413971472363,15.842510099057732,10.793427462677062,13.419275741874571,29.463713071851743,24.329685087933093,12.426485720663978,17.649782743456687,25.036375265100887,11.188802933629187,10.29448002307024,11.352815916997251,13.707421580692781,10.689509722419036,26.065010919614032,18.561301878042947,22.63130300203194,11.092134045165206,16.462594436832315,26.469983391328867,18.63015106417818,29.29099165992892,15.876540548551139,29.97795054996873,10.346711995181636,12.309003912626103,24.912626436457423,29.45392001860011,15.856857178138597,27.880827459559928,25.91894705453095,19.277284454417245,16.405768917093283,25.66170204246619,18.223094140440605,21.09905409326856,25.68872850554534,29.49143088570546,17.691786948237265,27.472164485839382,14.973862081895843,24.90378361775374,21.588650554017295,28.869307713027695,15.459386609726256,24.444125511096008,10.828055112933743,15.919412579577962,11.26382214215226,20.900781476470417,29.84449431192025,13.67304497151521,27.302597075808134,10.116404115632145,29.126313178900624,25.872970097928064,17.443761348130884,18.18894466452158,15.306315964549611,25.663491572178483,29.18767891471386,11.065371995520415,22.19262025873032,23.142504738721414,18.956642411266166,17.736228868414557,27.464576053565803,29.390809861655363,27.46274969673367,25.255378922038375,26.49685912329394,24.94834555943678,19.398302446632552,27.92758440891841,21.92359416783452,23.297582461478537,16.67440414241225,21.08545621280891,12.20544385656742,23.549822973810915,23.575769919832243,24.903247815970666,12.94214820546792,25.25610282447278,24.770419306219384,10.603529812255857,19.15424987366889,22.789430022780582,29.197702566731433,11.201655997687237,29.376523582165493,14.565540980951717,26.609915122582585,17.853242412440583,10.821536302054767,15.130871175912448,22.705929205547427,20.39513254663155,14.097982705026247,21.483645141578805,29.633151401028673,11.617052266173037,28.48237534857374,17.421527999941873,22.404783312858065,12.507678642329815,10.919756328008091,23.758362731860572,15.336228465955903,19.093059316560602,22.21332176504327,25.43175774342729,12.47077816607539,29.716420744822713,24.48811591521595,27.49182767407058,11.393847590759002,24.102236249671876,22.763714480307485,16.1976807595436,26.76018099659553,13.889172823031917,27.740066907815958,21.08537661729418,14.785540914453993,14.050344118699346,19.647415093356734,11.915671532840356,19.802957939137183,16.011466177237583,13.955977972783344,11.365837469504587,17.941940188309164,28.919358133096846,12.67303818574312,22.29814147550739,27.325270826462802,17.842423375830254,29.668680742388997,27.097084503872033,26.334315589455606,20.690087234213333,13.509746787008062,26.50322221260221,12.579183335991164,14.405363653015414,29.240334978426887,13.451992981162118,12.376698355419645,23.946486906995453,16.823418017172575,15.051275941263146,22.427982809222232,23.431578321478213,25.64778463407462,28.75055258949958,22.98991479820601,13.679789474531066,14.463794842903823,28.95346942598784,24.002127418756274,21.17975847203466,20.04328758965414,20.14226303090673,27.841317024819325,27.676110501272394,24.078654829153994,15.299241306092274,16.596643968130262,16.6514020191619,10.378089471356233,16.874931997328915,16.50084035732192,28.602309362066734,23.68674908716082,23.202474778172686,13.696656573041066,28.19280670333832,12.263110406506424,27.839255808076942,14.067390823151547,27.81948623684666,25.815916346858327,29.91181241599431,25.87510550183858,19.98433167183404,24.645735516813808,23.96018457571222,23.05241295998281,20.642264370458953,22.326094707387757,16.42265103687089,24.073397828511677,19.35161305400858,14.389401901860165,24.61592115771252,25.46205490871727,22.756803068462336,12.77970479277483,11.452276922192524,21.84347789337791,10.69270267040309,29.32504651307838,15.882564789251873,14.432929783499112,19.88847909641013,23.106244430771007,10.215109296741574,12.425171592787056,23.770505882598613,19.639560188869048,17.91139473455167,18.396809190792954,10.452747101699176,23.507714536694017,15.445631237335927,20.7243650841813,17.834656324438996,12.195545794186025,18.25069666947008,11.351713794610294,13.038902747042114,21.346700290883057,27.074880799941393,27.543607235279172,26.233235964031994,25.902513720667546,15.529629567940994,12.163713139000535,11.865696569142337,18.93315042385979,15.774353712473719,28.618354436766268,20.737855096740997,22.341198054841254,17.430436671054824,23.13176360834385,10.464874539327994,13.52396689777371,22.959990299348917,17.04309321478498,26.5209745573752,20.997051356685418,16.77261875486827,18.86431719750071,23.309443258091775,26.920973926017254,13.749389332497376,24.798009862472274,13.657595356942274,24.984388567009432,14.344220647526477,19.050144107065723,19.30577696182185,29.444487464085366,10.872807672545797,22.9551046026059,21.328232522865385,17.633634324139148,27.078903097108373,28.85573046440076,16.21543933900403,16.089364364897,11.800813929338663,14.730515231249788,14.284264796039952,21.936133415475602,28.41958395245961,17.719278288787024,10.93017748940123,12.735625667044875,18.33974139927157,16.930602926561363,24.934362229935925,12.058507500582873,20.488561881521306,24.683738313081328,27.205539308930398,17.98339701998646,29.604168268349376,19.530867142029233,26.859278118302928,29.971643396747023,12.644663642643783,21.552560683908297,15.311961329672705,27.889089797252705,26.34742578550119,15.432488240942174,19.38840833308589,12.66433776242891,19.73455561137242,15.549106162993889,26.510711870275525,14.32781746919392,15.743228764234903,21.713382568428216,14.368344649622568,27.31832491478352,18.462682911974092,29.646284568360205,11.569293627169364,22.660488660547415,12.821626137219075,23.223323213305594,25.05041722976101,24.329109702846665,18.788544649785514,12.757855838135498,28.22821532775942,12.932763620521524,23.991812844096806,21.503438671818348,21.9469794885717,10.621823304790968,27.74630674245408,22.828240338675446,27.92909770371196],"x":[1.6508305079253804,3.1123603315213035,1.9865518129704485,2.316921494798269,0.8638472368333105,0.9205437200508937,1.0197901144695098,0.8671565408184034,3.8504142129772445,4.843131735928987,1.0931167153576382,3.605117532325748,0.8010050351023013,1.3998349503714635,3.922558540670056,2.1117637426574563,2.5509802582472996,1.9483074028100056,0.6531122116812238,2.146052765042903,0.8587348831140795,0.16743144147561284,3.325860967437002,3.411433739668536,1.0246966795956247,2.5911598092239005,0.6689847156390105,3.8375008023530843,2.9599792496019917,2.1545205698689305,2.363622668827716,1.1422329323482316,2.389621034124283,4.297328341767697,2.4832119647589512,3.4269173905271932,1.3701820850939295,0.21242644784674858,1.663275170342683,2.234355679666394,0.5524041743910157,1.8003621457131647,3.2634310625583476,2.7749732070701816,0.9975303474970676,3.1158193653997346,4.837426166227997,1.8421790689705708,2.4323226493267436,0.8434972624672088,2.5147441527521117,3.326505496122402,3.6680196186786675,1.2305908664833498,3.9308022277310792,3.0828429988176853,2.0740824661685133,4.9575548761437185,3.695839764403436,4.3540590974999835,4.534048510582935,1.9905819176271378,0.7149695790295263,0.4810194711373228,4.972909644543936,2.764900301342333,1.7291549076001411,4.616875522001157,0.046150298302540804,1.9705624312721715,0.09273412102573375,0.09398424395373195,1.6485122964670784,0.6820251091971674,3.661573910212359,1.7380220521088163,0.04827401569626799,4.972832348167163,1.1898513151344514,3.56272056832879,2.209830571404634,1.705025138032229,1.1998947729820753,2.88733216393126,0.910353654467897,1.9847179310417595,4.032349350247301,0.5053472936645687,2.9516217837588696,4.011261147712551,3.0915216226667983,0.7167840791475788,0.5436076608972273,0.07475191689685579,1.113580402374661,0.893855393713231,1.4125585540072283,1.6258014529889075,2.7945673269939575,1.2396426681393846,4.869199579099552,4.522780697584251,4.930206215170461,1.8801014844652664,3.883402969937091,1.9865768547310203,3.8394094946050163,2.333628633462715,3.713003603771583,3.9258832734985805,4.231635412956259,2.9462959147835663,1.1548083153320732,3.407639219605997,1.3852444199202485,3.4085855726340277,3.996898266709289,4.351862966470962,1.0230521528106784,4.951676066305916,4.01986399748805,3.0179814413827377,1.3842212898174244,0.6516242158175289,0.5816321813845493,0.8528525612602333,0.624842074518186,4.402453593858646,3.0339513570013974,4.879306639477765,0.3437492804207587,0.746337707896555,0.229395351575733,0.9815114117979895,0.4033860614608753,3.522089022175754,2.804120832252245,0.4539338800619541,0.8936639826175674,1.7728030653710936,4.502137851085229,3.5459393605142453,0.0037413263240215766,4.426140510342986,3.678667704872398,3.3081526039140865,3.8464529532071747,1.0197884993756035,2.5363226329823063,2.4518478893834397,0.6574836633406833,0.33714470260006957,3.5150783543467847,3.5515675360011056,1.8210742099199395,1.60999427361742,1.7097694643988393,0.10127385961051227,1.9673839721763076,1.4101229667310977,2.394705609920955,3.5584812155382783,2.367572966182289,3.714424134403891,0.9217840317721526,3.045332111608384,3.3818824693436,1.0979646944730403,4.781992029765717,0.613765445994302,4.792875570291324,3.1682892279806407,3.9913869841467386,3.319779926119689,2.899344284520078,3.3071101043368243,3.217927027939292,2.539238857365329,4.749998518695998,1.8940898684203733,0.28178313768987606,0.6163846419840235,4.227556041086977,4.211596010939145,2.184561883207908,4.426505110521025,1.603370270061042,4.070413686781814,4.95976773693929,4.816961415106178,1.9002367207181936,2.5342583028742394,2.7782114091631627,2.417605151575506,3.6219702175136517,2.450722504395324,3.5632587548773254,3.5703220403971194,2.03099020728867,0.9410372816085799,0.885393593751953,3.6017913156665546,4.920784573434331,2.3149179343035575,3.5873366355891245,2.962181629759053,2.9935172031831647,3.630132612074042,1.1811804823765903,4.8388778602397275,4.446963362701291,2.1217301302152105,4.258319263964565,3.5491636833167837,0.40341086858643127,4.346231671937937,3.267023717615458,2.759145294189506,4.8936302962795875,3.3698960604683004,3.763069566784579,1.1695663996438121,1.702206304584576,3.5709170332023255,2.2762605229451225,0.7425157121934944,3.6449291256279093,1.2226676528575464,3.4903051208572244,0.9923954382374023,3.705355706814487,2.017545190991057,2.920510170912322,3.583270243642943,3.369119030309209,4.972359725400288,3.2158107105669878,0.6469438432930597,1.484451733281812,1.358708243415746,2.0430170474821363,0.07277013487985262,1.987880755596545,4.665924819894437,3.8164816811596145,4.097381414483772,3.24161864009504,3.3630560828274714,2.380454449043695,0.5554000011365479,1.132733114290121,0.9202267771015216,1.6043392580432836,2.4944567652008454,0.8262648227896996,3.547913199634051,2.956558349486426,1.859500663932978,2.177487243005256,2.753846016465559,0.09226168630811382,1.2290359957292885,4.108251042039792,0.2028683492441341,4.545714716649568,1.8513363948498829,4.197272652521425,0.31784377670012187,2.424677147470189,4.050708616590036,3.933900158840389,2.9908660312733826,3.291630743319931,0.28869863358642056,0.3170262596630502,1.594394526558065,2.300558057445353,0.5652973014083107,2.8292647253603995,4.027542034826494,4.622155028991269,3.966344656960125,1.6360753745335954,4.160186964746194,3.5377759852277824,1.2752601761999827,3.3448128249064246,2.8098831841906433,4.53593079400237,1.80320865328494,4.147884088467566,1.7971226874984947,4.184799001202042,2.218012535693364,1.9521259608578312,3.832460894892197,1.165055131048257,2.260849816017587,0.5360214188002543,2.524895347716428,1.635358826141604,0.3953446201776667,1.5636278115610847,1.5194512211946742,2.6399911880734117,2.5011798126267237,0.6385721264914934,3.910919342111673,4.852167927721092,2.9865338185387316,2.323501724205185,4.986249806263042,0.9547424459735387,2.4571262291316334,0.3651634545466309,1.8166685524799941,4.479398689192925,0.11860691573699511,2.8500466985937756,0.4356042133801208,4.608898936930165,1.8032593601367264,1.5531309726360398,1.1553782819802638,4.704310424432544,0.02761140206569146,2.490051250874515,4.366934979949638,4.861890328852596,0.7462419349688998,4.039468797986743,0.6404156655724191,3.4355867239588154,2.390725830849111,1.3966110093938267,3.9943831020099307,3.7140274530664987,4.190079477863207,1.5814079560085625,4.550419152229023,0.25409187322774196,3.2636184676438185,1.3144948036754456,1.1296823081602636,3.610626184642304,3.208532947212055,1.198025379758897,0.6250531601133336,0.36178464638482954,0.9092912616208393,1.1196954816972948,2.0672403777280355,2.275443527443224,3.546330133952642,0.6749277143679522,3.113562845424328,0.3772879313236466,2.2703660811578183,3.417629699253645,0.9037261496336013,0.04584164804390278,1.0077141811221957,3.582097486594148,4.775362879152034,3.1299104172121694,1.6384757411271578,1.1329813388207288,2.7050072118919477,4.499051232236635,0.14316020386984096,2.7116865798145886,4.977644787213946,1.3040956578724472,4.346909083656262,1.8439492818931957,0.8714264421177775,1.801334556391816,0.12981787021353441,2.6232350756541356,3.432522390140088,2.927249767031068,4.802192901416874,1.6161620520986186,3.491739119152167,2.4449487659916125,3.262587800592277,1.9651465777088195,1.8814722700118303,3.191329654326317,2.3783278790434537,3.6112221367803943,4.199415469544137,2.212425839149942,4.886523212831483,4.101959006780207,1.2077576545343138,1.4159228169802462,2.214605178581942,1.2010162497305166,0.05061505669851418,2.851208200039308,3.2051179808735886,4.859845503854146,4.641242007686387,0.14099035444238295,0.5260678870794744,1.3670938848313452,4.1533195534792675,1.9259050274080447,3.252508248047109,4.24196816693244,1.1707747195991614,4.983626071192355,4.572299762077394,2.6511382584452203,3.4896670975511856,1.88499076920714,2.647562537175495,2.7651051769933677,3.544897932507456,2.8186412262954716,1.7056278650590495,0.1448848124057911,2.955268798504518,1.0650646173699074,1.0085911182433993,3.2425969238387453,1.2713099160457397,2.2906081862445293,1.398680068677568,0.5706995703388817,4.896460001711347,0.7883615138321731,4.464386826109844,2.4375867871417487,4.270957685729067,1.8699520471217523,1.792303730302478,0.7251558674472647,1.2637132503696213,4.962177446391526,2.6492945912470836,4.972783634614215,3.9059536503281143,2.1241338129545397,4.514399114008586,1.4120046157203159,0.44256083632755017,1.193642023355087,0.36997810798003683,0.8956387281025013,1.0336349900492103,3.993030154264022,2.2690169248790992,2.973047231773278,3.23655741044702,2.577314286918555,3.6819793864105286,1.9483998822770532,3.977392828092272,4.456201394903846,4.527602884465397,3.502084585306781,1.4991555880939589,3.433111354610908,2.0656419295398756,2.141326452022436,3.3112679316461224,2.965875481208916,4.511854435844026,1.2521312946420882,2.279350052232092,1.3139222718519084,2.157018023483841,4.944806822033647,4.843216532219432,2.321252105701462,2.0986866914304922,0.5718951060434796,2.1250273018631405,1.927488915334753,4.442125884696766,3.663921444100425,4.610492981127895,1.1618475865611677,1.1123308278653443,1.573568392289486,4.382185409932735,2.328483383065051,4.559221517324309,1.5380038905135607,0.5459946609054644,4.776232465233644,2.067354434231301,2.5915419088644374,1.8928259150803817,4.911704634880822,2.8576707012889377,2.8263227242956113,4.988720501705658,1.593714900543859,2.9752071895304355,0.47403952837766217,4.846252405966226,1.0123924570237997,4.781517523899991,2.0387884129873033,1.5294670995809,4.34680787460044,4.4494733559873465,2.827712253425856,0.5489224836017703,1.8803292846784103,2.4957799077764165,2.960313610767662,3.039318493223057,4.403584832804448,0.8600625739659185,0.5564073254667445,0.48338821094229045,2.1947774341977677,2.6996104884455683,1.3396266067771723,2.3854227830492345,3.1875304933490556,2.151136131076722,0.9024464548942579,2.0049795631756675,1.5884368159607842,2.1882147521750506,3.9994647092802174,2.380594056706485,1.733570508938117,3.4885624995609787,1.8493376784309634,3.4892696908213896,4.681892676237452,2.1070634420302348,3.8862022795463225,3.5707088567417378,3.8748872195126127,1.9175363216361163,0.4895294280777962,0.13738810478363228,0.9891863197134176,0.3190068701578941,2.3648101209328134,4.162691402127608,0.5078462338652401,2.480059138577059,4.181028917963923,1.7910194768675936,1.1105643882998428,2.083147458269674,3.6505287774482085,3.356057974573873,1.0809150103383058,4.031912354864904,4.193920806401358,2.2442021379729624,0.2554001197442335,1.425326484073589,3.0717284081510243,1.7938679204417451,2.097585113220497,1.8189061613338464,1.5760627239389258,1.969686464567495,4.87673545344416,2.6533246950204714,3.3793390915177457,1.9686622641719798,1.1327155213207385,2.296008262779768,2.28227894002086,1.6181929035631293,3.1696975304921304,2.101935615477072,0.35777028478175543,1.9662446499640995,1.8336783592874661,2.2480513134082445,0.0349372079839505,2.4576250629992913,2.766564210748844,0.33613426654688805,4.3096313544322085,3.5681877825904404,1.266308978423164,4.994227319634702,1.2478305333041295,3.4829873616642804,1.0456828378087624,1.5716493222009476,1.7601471434217342,1.2797190592629304,0.5378248332062774,1.8641911853096194,2.461988241531108,4.560575888343795,3.727143257868798,4.781293067437394,3.1475505704426987,2.501224407299625,0.703752901989223,2.3235295608723963,0.22730091200794833,4.087415977666632,1.0093905303416106,1.852552767580713,0.4721086074730174,2.1209288914586244,4.378681308423466,4.0830241495837525,4.2161263805102855,2.320032929656074,2.3109711254623475,2.696756799322796,2.699190287152663,2.4690513790212343,1.2978379371658533,2.915714957386566,2.446712647911038,4.150573554930669,0.44763396993501403,3.4339230896604844,1.189031434496639,0.05005507044586244,2.852906550887414,4.14282884317884,4.114266605667867,4.791684456690254,4.705158708769273,2.0575743663009427,2.499360060920507,3.1508164155135243,0.639911085376963,1.9176940274591547,3.8462106680948605,3.730441252000738,1.098593669891622,1.8852868003155776,3.825292148790843,0.9012992115892671,4.673955622994751,3.008268563166556,1.4029583290002168,0.8071965266390257,0.5477305979544123,0.48526629907629903,1.2833268274094467,4.265700464951131,3.405847911870885,1.5993760114528077,2.544158249264854,4.393716038599258,1.6273397112831134,4.575608942145615,1.1549441162224916,1.924352817724575,0.2709611244530419,3.630659832783408,0.06373732498789919,2.249420357187434,3.4870447745309177,2.2827462840291677,2.1816761123197645,1.3067218982638495,3.271509098594114,3.443901934004651,1.6928820939712808,3.1568206645490515,2.2932441935410885,2.2141263231303068,4.176287834076079,2.758922596676432,0.08106051903348899,0.5751331385200542,4.908067627908036,4.130631907557849,3.0193243653024737,1.7726066428502985,4.8789975344171355,0.7507541066417001,0.2242083584382304,1.947386771595434,3.627595481742334,0.5616100218976594,2.9739817568457427,2.511075153220964,4.979501963258919,0.5307544270131803,0.6945974408050903,0.5471708152245003,3.8383553762384546,4.0240254754168685,2.471201379361764,0.41607290533249075,2.0339974968152372,2.485215410462086,4.083425584878682,4.63082907947733,1.89123394296275,2.9797164932930222,1.422379672459868,1.665536354742102,1.6247409692802617,1.7382857015915432,1.7589033897714257,0.35389714181404575,0.6473366831205818,3.8393529316699393,1.8943213853349816,0.9775883597391122,2.9772277933859237,2.102920602335303,4.5684919757775235,0.8923400221874689,2.864719714565125,4.383144987413607,2.878925912115593,4.6621259509265585,1.175217261216085,4.916100689300959,4.266171552523201,4.474010354518101,4.072608196392723,1.2380008823291633,3.342483082668908,1.6244785439665033,0.9564359997625194,1.9959967402217271,2.652751305463851,1.9496929153953835,4.657314107479809,0.2148396540269626,4.897503037712471,1.4435617000308087,3.016553927869441,0.47130399287844904,2.8618780395131704,2.7671880471176733,2.721230540881454,3.21198665172997,2.0669183152304926,4.992600501557838,3.5879821065337847,3.105260050374902,4.1198910674557165,2.962213214248448,0.07237019467055905,2.5606129160984947,0.2620683696718096,4.928705636152323,4.178149586490441,0.5624580636515364,2.02044425903944,3.718918942169772,3.8492338569987816,2.1029356581303693,2.99764843362433,1.3130769456799163,4.941092922765831,3.2777794859295817,2.582775193437523,3.156540736178938,1.8099883031202235,1.2246296696432923,1.0588133922295007,3.7723234267541814,0.993512223993448,1.8740533433220574,1.568540986377659,1.773204017694796,3.813268545253411,1.1087146988944674,1.7954585675225632,4.611373629217233,1.1156713410646613,1.7595861027651638,1.3050584378088126,1.6375759684790592,4.619570264920027,4.2153162513495115,1.0239583095255989,1.730130797188254,4.612752870752707,1.013103021534184,4.153725296884877,1.8968939094501003,4.382831408451162,3.6161721528267554,1.0898407524224507,4.724664316081882,4.55674319919998,4.722567367445986,2.512532213246831,3.7650242666444522,4.805331932930158,4.648231533538852,3.556462952307272,4.12899541641411,3.350875001784238,3.9840803172187558,0.179155941321687,2.9882389773624585,0.8576162376344898,1.1519340514177379,1.9536609219926016,3.105078923270155,3.9710465048784584,4.433730736942211,4.395041238555394,3.435708180255128,0.6205119772270062,4.706162588584894,1.623825035292008,1.4616712391035924,4.310292814031658,4.320266930407102,1.7222077654867174,3.2088968119798524,0.5208366981640489,3.3854761530622843,3.177847373834981,0.7829812257506696,3.810504663235376,3.8878963141002334,3.284576369785399,3.9305912941111742,4.372149737914963,4.207829893616603,0.7038437248973095,1.6853165427069838,1.7084443217248813,0.8093700801894932,2.3072075486914114,1.3986405569238491,3.925231492472392,4.768349167414452,4.99443026587273,3.8082720630959876,2.5737058108942765,2.278853029751724,0.28520418793374636,3.492803624785328,0.963824503885593,0.7460830382508365,0.6000989147843816,4.1236175122063035,1.4745280239727543,0.5099476003858461,1.047037171432148,3.705985816614983,2.2902936829078033,2.1835453541875562,3.3639552397557084,0.03035877462410408,2.31991351780927,3.941501879488386,1.9347965755261298,0.045173355725265374,1.8141443190577078,3.0191131015302464,4.005525353660907,0.890811287515324,4.181589023842257,1.1910841326591692,3.6622115927425645,2.926649189388426,2.1500641167452472,1.7058063772630172,1.9948452234842973,1.3673800753124,4.946525108903432,2.128771913520099,2.0182284131237638,1.3766162131031323,4.084631785920093,1.877556853511827,4.956705435456481,4.638081395980435,4.9564346030255315,2.1158013894122805,3.1401204859271212,2.1295391408720157,2.234743875224776,0.26150971212262397,1.5299676601169432,2.8187938924008904,2.6499111073377724,0.8150681319695308,2.111736681633144,1.9659231795143117,2.534447446974667,1.975577249507633,2.696101243802728,1.6444765078113488,4.650050289910954,3.0513798446209552,2.5688865720455736,4.940176410054428,0.27575276407356686,4.730707969688741,3.747864690513578,2.771136905455628,3.926688527253165,0.9505023888066177,3.080848471677516,4.410600724213384,4.7440722425831385,4.448834073625648,2.166341952236478,2.1343907437776566,3.1477970182409907,2.3764347799520626,4.670332424642628,4.352647554594981,0.8476256612193322,4.838206770025395,3.640195537473716,0.22087587483279214,1.3975528355415912,2.930676504382151,4.672158782542346,1.5694910589673605,1.8451341582210412,1.688931081561147,0.31694741257371817,0.9323113951023376,4.304833421625157,2.681056328684197,4.621463411813367,4.100412755224104,4.151048104869947,0.21428821207582271,3.2649513998544233,1.4376847384397862,0.4856145402143941,3.7429340074151485,4.849794927116077,0.025813120462667705,3.7753972741390243,2.0470675193082055,3.9478749073007604,4.619328631372387,2.3248442308355175,0.845364163932012,4.5402087677616665,4.093508124582681,4.010654159722689,0.3657860128308843,3.1060085420054664,0.08628830790934239,2.872757360936551,2.9860289646478777,3.3345881673734237,1.6908419871382274,1.843176387069475,4.976453239247212,1.7039407349653124,4.3755768040932015,0.33073796324999627,3.8678973771174343,2.5438460182390066,2.716408736856104,4.172085689093504,2.968009374786371,1.7264724940044518,3.521204608763806,3.714787481917403,4.145852235557119,3.226394276540651,3.743855237112909,0.5734945886019926,4.4944943175844045,0.7524923616974755,1.814426695506819,4.304870347869732,1.0505316504710505,4.068520679325647,0.7808671868567518,4.813464330999327,1.8264913393301885,1.0400367836483115,4.888802814160575,0.04689454486144107,2.5858446889605324,2.7832730275384243,4.123934498300289,0.3489587704634145,1.0974067785127994,4.301991895300407,0.7227004171669038,1.7948529492453424,0.3744067564471443,2.1355740165581127,2.8292087717337733,2.336308502827531,4.087761672103101],"lambda":[20.96232336157665,10.938316474905886,15.776067780863588,18.008921372515168,14.346531500822156,21.92694973405477,28.67968361871285,29.927692055845718,29.904940484259544,17.44458536649827,15.01855632733156,29.149354733969204,10.176935744337406,22.40434433420688,12.812388633120587,28.372538309689226,17.435534132309737,10.04460465411765,10.418869961413858,23.229832062900652,22.198715557947025,11.663171677647185,21.0364201479818,26.359022806116204,13.791573361066153,15.762662944459223,14.590424947859457,26.95231005573889,21.774447042915067,10.65650914705627,18.82602915585788,24.75983701466713,27.334630583431792,14.573441744743496,16.866039988957112,21.906822666840213,18.48260478467452,23.528614150263305,19.21637136480313,12.69387281094033,18.88678653439634,14.009485435792417,27.25952541371501,10.927350126448939,20.623285650879094,11.733193488804684,24.566588867598526,21.48145102537171,28.191942329799797,23.66868105708714,21.058606660134842,26.633055456964204,11.981995134330932,24.315587324324216,24.85008708561694,12.83255466663828,25.72113593433178,10.449793199195527,27.89554454110455,26.932811126487934,18.703381496957228,13.876961611723724,16.56763017234109,11.174103491141327,17.814520676385236,20.862341392811416,18.066860893099197,24.161343990413023,14.758069407576562,17.880621246814336,12.24995708824855,26.886983218345932,11.37087787584774,26.51517690738946,17.84677274647903,20.37180538112757,18.1449559575572,23.793517376314995,29.015867978005726,16.853932078457774,27.964168942230923,23.485376186265764,27.223935685237603,27.373124298401716,22.60702387938153,26.51964189482269,16.091282766704897,27.495499123084333,18.69526110678406,13.610959145999782,13.533460250254908,20.331899735512813,10.707962693559256,26.71986484262472,20.005775043843514,28.63566710933629,12.046875412823614,14.533986315759591,25.458732627629487,12.439263253397908,27.595992515593508,25.175689964137028,10.448679202388655,23.04177592681707,15.715853808906349,11.103989966270916,21.72961161385384,13.497018385420443,11.159559873571329,10.482663133491945,21.840010538999,16.356067062837646,16.096952259937428,14.097963689804146,16.374174810002856,26.089936394659112,12.830398660312095,23.223397761337562,10.709316477686137,12.771920801532119,12.245721067767406,15.801411976365172,25.050458048805094,21.368257908537423,20.976670745904627,11.566035905836362,19.46189706226442,21.46050876004224,25.83600255014137,23.75245550017813,10.793986639028347,10.207464083375314,22.11339963176943,28.376686729130945,11.093026572609102,28.34928717412463,22.72291156501155,23.70932920342093,18.43420325627049,28.364279910354103,12.941537615240657,21.3756514979423,29.494202539117687,20.180194824460322,27.364954204467043,23.020943987353295,13.322156909204672,24.724114190821858,25.37872993400239,14.771856500322311,29.570510838174762,14.706641489698665,26.4301684284527,17.841510004419145,28.837335470677964,26.006600675120346,17.62579773605852,14.670277857765255,11.96055646358413,18.586661876780212,27.53357450388906,29.91709163120212,25.616320759251803,19.349478975844498,19.292570480031436,17.746276753741576,21.48478514062459,25.75773410450644,25.454239448889048,20.214808121829925,12.058362476652103,14.950730663422114,25.20043836923149,25.08469006911316,28.77318855527893,23.889940090102137,19.308112084103996,14.15851649488227,21.062923868148886,10.782405688644875,15.201111399544205,10.40746861637695,14.768313321152737,26.798364828694247,17.14120527262137,15.055022617844811,21.08204857013789,12.955377973833286,15.76690958298229,15.76179295225122,16.50921915092848,16.963114402306232,15.851171721789532,24.79616091568196,28.090942944164144,20.360385438557962,19.932846710746993,29.535224999183317,28.01477686428177,23.73759398236967,28.10181868881443,27.801560648711696,12.002995431439114,28.32814014371898,28.537905939170834,18.393716437645722,27.788767633630158,23.203204216431,28.894589859939597,20.996030727175174,12.550116647212782,20.098666847584706,28.470930513520607,16.028930727402457,13.057240492387173,28.425141325735087,16.019280531087926,12.48508273709836,25.45061391959447,15.199581847294308,28.282900122192313,26.700016800622194,17.360034553732866,22.943808365994776,11.840020564231759,27.236733940495725,20.793821890949012,25.64789976411856,29.11902135283308,14.565443186933958,19.024805801326615,15.349673527153126,21.98752335689871,26.477369980681658,18.315591281316642,17.423335504671012,19.975486164762863,15.710449201117388,29.86365591219261,17.047657625719808,28.083611977390625,12.809974878072401,11.216686481835016,24.833220324410377,29.078784011721773,13.543049680828387,26.54905953945823,22.9644762119832,25.03952411883594,15.413257148330555,20.03210909833664,19.29107361137243,11.456844604374204,29.31892133794046,24.246627462146627,29.842636793513513,15.753035417972816,10.286112591463649,13.905628921633939,13.050650934911197,27.87986972861613,27.72952665934179,16.740028341553263,22.22614344348004,27.741243070092047,20.602744902685004,18.990288954131223,18.706105322078294,16.749470648918287,25.66782208072052,19.42069287620494,25.724519469006218,29.6942989871959,26.907528015733977,13.858008259496017,29.828492363637743,15.451145195026426,28.952375848179635,17.57240949903263,19.58036595330644,27.474265459231688,17.930502790194613,25.21769829094072,24.82163584256135,20.277983088547632,11.471637360847788,21.673067080876216,29.350946847166416,21.637629268795727,18.996967539362647,10.087289797583164,14.923827806042095,15.397197392163404,27.70850218079407,14.90470946894102,12.405150028065757,16.65344089368282,25.378327937677177,17.568397598670884,29.529557190214856,14.433058588939968,14.033481803294103,26.68198770801809,11.901815615378396,24.24619529586854,11.568642165935671,24.920179966514272,29.41799380745841,28.92498696899156,17.91512073715832,27.353328821149763,22.47505728260077,27.20882542144974,13.62231324171923,16.535649954279357,26.330698170269823,29.68357589647463,18.525988013596493,19.745346087146608,15.648906288737008,24.692758576602223,12.909272532409869,20.639704877752525,17.39221632545822,13.253038330588183,27.382594880625373,26.754624767640337,16.75551018517615,17.495745833417075,25.93979144842499,24.064568491228478,11.11825114400462,25.853475935640095,29.692542212332462,12.041737897061765,17.470930316248637,21.009763578982614,16.642612201330046,25.11526072920355,29.784404946158602,23.46897522285275,25.814020936788587,29.745134597873193,21.616350276299666,10.894860458176545,17.369082860405488,14.212902590649437,11.27840660884142,27.736380306473407,20.62069275603838,14.343849830510326,15.579998624030033,17.083039047328057,29.572880932224205,23.144215754711496,21.383776991963323,12.834227189574495,26.889986554938304,23.56150817093151,20.25304146458501,16.695349064770646,22.79657016936163,10.604021200391678,21.880300102923847,14.209026889316174,23.90424667110453,13.927093119623342,16.659600993714847,25.5076130939701,23.021270806322597,24.30146615220558,25.143106363445035,20.829830075290246,17.379409416290507,13.992786747789152,25.05395649194876,15.372659462582966,16.232598643285037,13.34707420485719,14.231461680839255,23.168167310566936,27.61269674732617,24.873390608050684,21.088623178896366,22.74150234100215,11.468226846457483,28.898242936305625,15.45733942173252,25.073407212326867,18.05839159139632,16.88948545946992,29.448538423609747,14.780697134703885,17.692069800911042,20.640946287323132,23.55247540047437,26.73723689632454,28.811088905768855,13.90889276798994,23.51190162321945,28.663824740714094,22.44693952993543,12.707638645941323,25.293371893899597,11.164704453640484,24.811329619413456,15.491135785397535,21.536722097689683,24.67659795946537,17.02510512015211,28.78851519672136,23.995627999418375,23.18637483516596,16.315265188244172,27.013499302321172,24.924018297569898,21.697626128666265,28.301523541669745,22.634619978132264,12.965727977188832,10.210181255634318,16.795994406788513,14.178936684260215,11.837787175505866,19.222626690722247,27.381574901207408,20.389232365320602,25.904314891220057,24.842839660144303,15.39051144746352,16.214818952076193,11.66396639967282,24.436148787390245,24.61641621268361,19.279008124527582,15.847281310297054,29.209514783106165,18.002457448297434,26.691131847254912,18.32156428123165,18.74941891458644,15.737992980535754,19.83779136884519,15.908611047205037,10.648022527872122,12.238925542747277,17.65679464473353,12.746806752839511,12.703674406903707,17.031100955201136,14.545054331404558,27.83221827811981,16.408007551195798,24.64189222492547,15.112494501973348,19.905604927835054,12.863478141276431,18.458352956036546,11.25849134174915,22.998508937629786,24.062954660634908,23.550429526773126,16.433535893806965,12.559254839202719,17.93464271435283,29.788760152349,15.17306928451303,17.800857530354797,10.5880187126263,28.85243012079224,15.92757640624031,27.415498286178057,20.690435979549022,23.77858546469573,26.268919131590156,26.201877729907398,29.06758475847252,26.846974899447865,26.271275609032752,12.269667525014597,22.40716686175997,19.339490591699988,20.116265048645978,26.440947917512947,14.688400807542873,14.548232872338108,27.634545942404518,15.704204763441073,22.710308671054207,19.73470511315358,28.845350375159637,27.890099067951986,15.712006574051284,19.64944238209523,18.100668924698937,19.89295950630202,14.600904500779608,25.24248382294275,29.407308744343894,15.14030522716508,20.906697734661115,18.34697324328587,19.022174528974457,12.063859002818482,19.935197785993537,23.176515665862997,22.667445482973125,27.915409131916455,25.864283172365585,10.213774607011072,11.357752833360433,24.28404123629366,14.508434580494761,10.951233841128953,14.132366293165358,16.501104110853625,12.914196577611769,23.78900115505751,10.994603032900216,22.7472660324792,23.910281623382076,18.963404843346026,20.229662862367608,18.140219098914624,12.467028573184704,22.43349932154888,27.211862303464997,22.151265354473377,15.548109862202747,17.511735140048525,19.77379271668312,12.513832706736764,16.490640088812064,10.962368223390285,16.921308193207793,11.626893950577823,28.027727786333877,13.24051079103267,22.419260938973164,14.989168747761283,11.143625265977533,15.183223812708206,18.203072805646904,29.402850005286826,12.669005404044773,10.277478497764427,16.989650677717314,20.664700469226563,29.731466599559994,25.886065491924448,28.12021131046922,18.32117394476823,27.02588157230332,17.33308648459809,20.460316957972374,11.729035299116468,24.992142789784815,15.794581986654507,25.749196282187764,20.557341951935356,24.648975573170205,25.24921642192972,29.2956153814921,16.813707750689883,13.044325980700705,15.243549727118083,19.672395013010508,24.249189363280745,25.443757112306777,21.439404827957482,26.339269394372536,17.356222753140095,29.75444076501599,18.099916716547966,22.291465256599118,22.066982575733924,27.159813002597453,15.833367517622904,19.707597094505417,20.19210581164357,12.800309757904422,26.87350793517564,17.56214773399716,27.914016804348407,29.528142833897533,27.03047833290752,25.596809148781787,10.657710556323483,13.368020684468824,25.06540205222177,26.628683694625884,15.428359402872527,15.128707460211777,23.938625349580498,20.58138331523508,22.418230477825386,25.158630885512675,14.407566981570419,21.097475650251557,12.439468843219736,13.139857809064033,19.18036954504513,28.821360950356585,26.148675179206702,25.566251567187464,17.996961172435245,28.902278205230886,27.645617030793556,19.76040920838979,29.843793213928066,28.846151285628352,10.50568588505917,22.893733153390627,20.413029420011274,19.043196081285,10.573538717967864,22.301462247457753,24.533654652336207,27.123284834390585,21.584117182629047,11.412469500302533,11.701946593031805,28.94617851892221,19.072551473409295,20.184132078456965,24.10366236235117,18.93653915959751,29.62661890507022,21.860538337142987,19.930373027628434,26.057322926345925,27.13741808833661,13.316516401179124,18.976311438989203,10.233154242399563,18.392512812271086,29.281178302693135,16.418497250847718,14.078265077029455,25.924354663785444,18.803644209959913,14.430348364134215,15.339200428056742,11.071197402733777,25.462543639884935,11.35402854675382,25.623226385100764,28.049421433262896,26.73140787868746,12.04712615568727,22.69186712970422,17.5292944324222,15.569028949765059,18.187109553568636,16.01178050229808,20.84056274338574,21.036164726469607,12.995977170299726,23.640173794799168,23.268197756686764,25.322927214486725,19.75478110161192,16.793569242517496,16.770388000663626,16.302317021468955,13.510799683564784,23.242165232511912,25.164970463712887,24.87654350714433,24.27133909950186,19.38854208282862,19.031438122476942,10.409773770584746,21.729115106919924,23.91734941590697,23.887914301713806,20.54360521083186,23.101493057000596,29.443667560816206,15.813004442238533,28.599384461390148,29.41827155419967,22.837833014296557,22.56110789740021,12.27786871129414,24.777461082990765,28.10613036368995,11.170486536937997,28.023522378268627,26.259371645666473,15.809333499674256,26.35692113170712,17.17767971883739,20.11258944989563,12.15398851936051,29.021526438070513,12.516929926680906,27.77915836265898,16.7650901110737,20.46414593085824,21.692492498162853,20.12830845866056,10.212463570353911,23.917513145197766,26.1550829595944,10.768180763382865,10.140880744786308,23.012763835837255,19.52713785787592,20.07619358939413,24.23650203771119,14.173638681696987,22.751814015468682,23.620410125764437,25.08569335347481,15.444118920077617,23.219585257438297,26.076953520353715,28.156867465599618,15.050594870920904,19.017797470582146,14.893504957727433,11.050321223044556,23.802875263040235,24.826117862091166,21.620169012439725,28.84074996500813,16.16215236499229,13.093018044270298,29.223883568720176,14.89580177304115,21.998275691202586,22.057025075767825,13.407590687274542,12.460239433294479,20.889087871283177,26.41415708843395,14.727368745508409,27.38074466108507,26.242518001560832,29.931794998330155,16.49144645733161,15.245098986748653,10.776236184656227,27.183780313691987,21.689976758616037,16.312032888729288,18.9411108660599,29.565632437845153,19.669791762508982,13.238183023611668,17.01417530027928,26.56169533352353,27.438878256826165,25.57577063346523,13.530032161149519,17.91229617871725,20.40095759569318,14.875967374295733,17.824370078302163,24.927811747813948,28.110827866224287,12.993692121529206,22.46950754938542,28.53088198421328,28.657640659549784,14.827380687547196,10.493679690635606,29.163953665280772,17.171451717259135,10.735511048510013,25.787272997718134,12.095075172981002,29.181358177337525,10.223364814647837,16.98151096468608,23.45278646839658,23.125580424313558,23.07038641223768,13.675184914099097,26.90445109088728,18.13405033909094,11.207948384017467,28.233426045686535,27.72174021252342,12.48120467357281,24.56832499563779,14.859083835199517,15.698646039744046,13.363572689368217,20.617885122174574,12.573548272273158,19.973146695138407,28.921691733672095,10.388195544186733,14.112560464076594,10.519664132986533,12.339960529380987,17.614676722157327,22.445210294474368,10.501379210238877,28.909224255571388,12.557629260527667,26.261154855365568,25.562650963573788,13.964075315453567,29.623943956235692,11.736224862263205,17.10426135317451,13.330107689829202,26.253845759918267,12.011537406506964,25.49840717241359,28.068654563985305,25.78124721692124,17.723655287929784,12.552013504616731,11.887374625104282,17.330459858340536,13.016169841205429,22.555941071931972,26.881357721290367,12.621601925507955,11.720346102215785,20.335286397602154,25.148455302365534,28.966556606265065,10.614013876156022,14.757794129204544,24.36120480727476,21.628451793511974,29.02318231342509,11.80571101590585,24.675521495383062,11.991538725625809,14.635974450742184,22.96442366830498,19.084438020404537,28.082713477001274,10.915069633779403,18.47066029961106,12.141134440691017,26.154446546559097,18.028577740175077,22.55279899443511,19.256795614442982,18.697924919530188,14.996886889871654,23.26782546231229,16.18600211950227,28.0245110637896,17.2419472873065,25.47539088548934,11.024721233750313,15.03540196144845,17.901247809164822,26.68702809297966,21.098696809596223,20.357276461625617,22.329118873388317,19.038143382813644,20.743229241409452,15.749486526489015,22.06727132593865,18.61025154175849,26.322464002236586,21.81031799707933,17.785439870707854,15.009511692718993,26.37213545978389,26.121113508488648,22.565882990144168,24.379533631018333,20.3468595806782,17.31168631262758,17.790263468087808,13.76282406476248,10.689413597732948,11.302139815789012,26.622917058935812,24.228342571451318,24.874638499929496,29.776389879866997,17.19221952400452,18.831178665642263,15.364141973085701,27.09457564357792,25.207334587198645,22.11020564687763,19.630431920389437,25.003130973468526,14.21269404041162,18.0396065877206,19.338969529644785,10.492845487714941,25.943130834000282,17.175594337860176,18.32322859543015,10.433932126306416,14.838790531687852,17.086266253069088,10.712839010353296,13.751810607461357,28.193754218601363,10.927589948793951,15.393040531243386,15.165720663759142,19.792749097175445,16.80176250606314,13.24945231914647,24.093618724384317,15.744973153406994,22.459239334736665,29.11465380223914,11.2308461316906,29.89503108501208,18.796648104945103,22.424419281886294,21.941246597444312,28.50155160969965,18.02454047629791,17.363483546261612,15.042505325872861,14.342045339975048,18.395885498095844,24.514114748411,18.42164588181802,22.6173302082951,28.50172627563081,10.43104760225081,23.128394736506234,12.646197910084002,13.33074778926662,27.499547559468667,14.225881713115927,15.807902237478979,26.706202183567115,27.001333517753892,23.9377759325148,26.132608972519908,22.69669814455792,14.503052038872703,16.212502292831985,14.657516318579527,18.620519696511188,15.834233648762828,23.68531580579706,22.429264841105976,12.767076834213974,28.600518974221348,20.479586060417315,24.659082198629942,20.471073665241832,26.045627877472487,23.534956757155108,26.566716811787284,27.15079785487593,28.695875373255895,15.714162800417185,20.256887619052698,28.651491038465814,21.554776018517433,26.97208408818033,13.512087424879272,17.789537781292232,10.746293385695145,24.685168115993473,23.715790080819033,29.72400426793847,14.288133801256325,29.456119860622557,28.66566461485803,15.215287021870484,26.891912739842926,18.3242375392015,26.720298840192044,10.492212345852284,15.38581444253056,24.358755334806908,17.15574012798892,29.405397522691807,25.187073193202636,13.977001627993078,16.803995718800042,13.134854850800842,16.26812653555596,22.885305446616044,20.91395255619679,16.113672982175117,28.537430413072705,16.02974490733346,25.962768014660618,25.46323288087755,19.292848107403948,19.36632677522379,22.20941661284867,27.073053410466663,26.86136852892481,15.653304035400009,16.211873081796526]}

},{}],148:[function(require,module,exports){
module.exports={"expected":[0.00026583330112763486,0.21914108962049753,7.1980382172208556e-9,8.543968497981631e-5,1.0304769110877417e-13,3.19202557976475e-11,8.501011472685347e-5,4.385034430768499e-6,3.086719631252454e-5,0.02053020765538213,0.0008860755914586476,2.5586344385350604e-8,0.0021572425491996144,0.009431246088869074,2.55860198826262e-5,0.00526531020725278,1.197175383540581e-5,0.0007521714150597193,0.1881112522730666,0.0001113068540152154,1.9921420371374457e-8,4.503719184672744e-5,0.1740443629481414,0.00024458406779900036,3.510891515950366e-5,2.0635763895352773e-8,0.0007911285078412274,0.2421294249097805,1.0909338729373996e-7,0.017572171683504466,9.556991115494536e-5,0.08068443547746545,9.232659405203632e-5,0.0011440999305566395,0.0012527136174436588,1.2170814408933277e-10,6.430521620082367e-6,5.319972373044535e-7,1.4807794045346385e-18,1.1548024853173531e-6,8.265900805943742e-5,0.21448085055237842,3.55885530601601e-12,0.05139136992991573,0.280249903920041,3.3231544466766376e-7,0.1811045670786619,0.004469136232170905,0.004998191953953133,1.828583019148041e-6,0.31320170054913266,0.0001289329848356117,0.0008420188065494644,0.05657347691987824,4.7594184672939297e-7,0.26552880752832686,1.968451086869291e-7,0.03446595719578797,1.5963051573366136e-8,5.694695884123049e-5,0.000447176242635715,0.3196266253709425,0.4628142983482169,2.2787022457478084e-5,2.708547182714748e-6,0.023496110422324426,0.00012248009184530098,2.260980499761501e-6,0.004433279397238787,6.7711927200931825e-9,1.9111988174472085e-11,6.184804438367514e-6,9.991318221934481e-13,3.3232654826755265e-7,3.2204426141330407e-17,0.46725074041928544,0.06956365515335743,0.0001373746880617198,0.000580378976418404,6.117073050752325e-11,1.454837906065944e-6,0.0449479894382802,7.208872191178592e-5,0.0020806162671938863,0.0007737313739300619,5.0675652439385426e-18,4.485960730867861e-14,0.0003420029773862869,1.2932028140154418e-6,1.6330058224803025e-5,9.816562774392746e-6,0.0025685661838025457,2.279335337528294e-6,0.11074207058239026,2.657196159891113e-5,4.047853848781664e-6,0.0010772068946543895,0.03735478437126984,0.0010324649855884185,0.002690108995922306,0.00824007540536404,1.3315020250578184e-8,0.0064069030950442,1.343493939803412e-9,2.4927085845259347e-7,1.229609570826048e-13,0.15173937041921287,6.604219438384661e-6,5.137562741858392e-8,0.00809418958173236,0.00041882875611736457,5.470164865752213e-5,1.1167615818557338e-5,1.7542640705389428e-11,0.20189061223352175,0.6135097783679443,4.936391835750604e-5,0.0006474248203226618,3.8532274376522085e-8,0.46744154518408243,6.59808338842642e-6,0.0002820298720936827,0.059698476976681694,0.10523300345098488,1.058436629406722e-8,3.8953558673788585e-5,0.16668024632172368,1.951511573081218e-6,8.539377309207033e-6,0.04758301419052986,0.2287289093355434,1.5246544125763192e-5,0.00028514020703274487,0.030404207044506477,2.1236999837511836e-19,0.023470473090100932,3.9052476920181364e-5,0.0013083793475007737,0.01120988364808067,0.00011526447761625273,9.285384530985618e-5,1.5143730482468946e-7,0.00011472048708111084,4.11398045672418e-5,0.47638142914899373,0.0020028164087651373,0.03396469391189432,2.6516039743820422e-5,0.0009548707427433341,0.0007145913803052877,9.226843890058476e-5,3.5276512126682228e-6,2.914350307891905e-8,1.2850061703381328e-8,0.39647869800560664,0.04806306866144539,0.02275476117935854,3.7484186296342016e-5,2.7071088898418036e-6,0.0002705219901209864,0.00010414343959665631,0.27245130773023024,5.546717309451151e-6,0.0007944040019350077,8.289850382913094e-6,0.00015640839631300465,6.664208715009206e-19,4.252692022990934e-7,0.12835819659414294,0.16514989957693516,2.6922206214024945e-10,0.056651042876721715,3.157174618153965e-5,0.05004779812926276,7.723351775121064e-9,0.0003372433278322393,0.006934148284776233,0.0006280461255130329,8.791701302970387e-10,0.2264522782953082,9.369374221182027e-10,4.0428117222512755e-10,5.263656020679439e-5,0.0015237851077111707,0.23820222013712486,0.25362478686654094,1.2017170049527835e-6,0.4515608195432183,2.7959834069976844e-7,0.13187749051215503,1.2557315153051538e-14,6.957568172636203e-8,7.726940529201975e-5,8.478257695410391e-6,7.733893034859406e-7,7.725317393099944e-6,9.790871217608895e-7,2.673349507884303e-8,0.2213231142141356,5.394448989174712e-10,0.001737256174371246,2.248871094956373e-5,0.001877890714872871,1.6236696442776799e-7,0.010626273742535924,7.716130968113973e-5,0.23394831017194465,1.399176156769509e-7,3.665821861386911e-5,0.05726417299563018,1.3947151916307627e-6,1.101625835762267e-7,0.0060618445467669245,0.000212016552392004,0.0036337925166978415,2.253473780526436e-7,0.0065872967203531915,6.222740573617014e-5,1.660030435881121e-7,9.171130067231166e-12,0.0001367440816116112,0.0006155592782062323,1.2500925260139672e-5,0.0016961333724500047,5.771744225661878e-13,8.342655867041295e-9,0.10317840878877652,0.0015376748342659048,2.819742945011946e-10,0.039329382977395674,0.27019725049290616,0.4351169827542514,0.044051887382065544,1.2856378423836666e-7,6.728097817689309e-11,0.0005381721471319659,1.6775592987105566e-16,0.024511393952487043,0.11255803520013634,2.647599513628262e-5,3.157424042386613e-13,9.448417848729821e-7,3.9539988276315095e-11,0.0001234575517761636,1.6812197261948673e-5,0.07276169175345666,0.0005987150155376413,0.004085822806898199,3.151985456044158e-6,0.4440208178879818,0.009687496307680265,0.05978603256302962,1.980108180170855e-13,0.013919329514928833,0.004573404497421624,0.007539805154426128,9.700244060012015e-5,5.008666888091157e-22,5.922241072513969e-7,0.0006825253941578445,1.8980093328633754e-7,0.0003187981468042241,4.919032610782007e-7,1.7648112301791799e-9,0.02561222480792486,0.005021924368343871,1.303707338377291e-7,7.704928456881548e-5,6.605693021770483e-5,0.535286017449507,3.17549612950257e-8,0.00030399439582124446,1.749538861938153e-7,0.2794747300113735,0.009360573806420561,0.0016129982490360134,0.0002586156626683969,0.0001267391796383568,3.1580797868494157e-6,0.4972981835661132,0.023172505361259272,1.2851401753546339e-5,1.6042295399462023e-12,1.7141676922555685e-5,3.522318242578838e-6,0.4690905910233731,0.001344839223192307,1.3647343967006233e-5,0.005031526547605559,2.2984376689343537e-6,5.324074780518753e-9,4.3035130405591375e-12,4.103341583173482e-6,4.263658942623793e-7,8.669463177746169e-6,0.016244842066890624,8.948252828064979e-9,0.03796746041501652,0.0005566638502681324,1.7535932906830544e-10,3.3094995557756234e-6,0.20964539637732604,0.0009300359336784222,0.0013646476593487905,0.6144877064277868,0.010156032471101563,9.118534487864329e-6,5.783053082381545e-5,3.4537422852896965e-8,1.2757492791058046e-13,0.00011130553323444414,4.638410512641155e-8,1.9039463975976764e-5,0.011359939752616554,2.4324723224588764e-5,1.7351281595402277e-8,1.9905452301507374e-5,1.5995230389054756e-5,0.4788012537690001,0.00018352695647951746,0.00027881262850665734,0.6003038951519495,4.6966342511468913e-7,0.00174271710639904,1.1739465341526849e-7,7.993849219519723e-5,3.6829664619923105e-5,0.10221523539498209,8.449479235154819e-14,0.024710954900310268,1.7573086071244505e-10,6.652037593223382e-5,0.16310952957489847,4.078987900652913e-6,6.124550319889038e-7,0.026570359841369545,0.10165452818517617,6.916208823660668e-6,0.01598526229991877,0.2634434595994749,1.8741762063333301e-10,2.9104669808440675e-9,0.015401799385633273,0.016893925244891826,3.1776035090397843e-15,1.911258321515069e-9,0.002119349992124398,7.031468810458628e-10,8.554678242708252e-15,9.061641591538269e-12,8.049675885325852e-5,2.027514420954329e-6,6.326254133465228e-8,8.311174993121694e-5,0.0018223426155073554,0.0048415300290929565,9.158674021144802e-5,1.7813999051658967e-5,0.6237496777007694,1.89327323617427e-9,0.006449063192061734,0.03657625979084939,0.005552400595051002,3.297485423935247e-7,4.643495062895484e-8,5.149229673974106e-8,1.4532482463282613e-6,0.0019909642740514977,0.5677365843367683,0.03001373553451318,0.00015430650014673178,0.0011055168117960993,8.652666641354675e-8,0.0020962857070686717,0.010135971313194174,0.30849922038182576,0.4445222501002605,2.5804027835485304e-6,0.09832228910242556,0.00040269954169700075,0.0014048112410285612,1.4980125405635415e-6,0.09975945128381715,2.5373327492148558e-6,0.01128074670146597,0.0056932766499076,0.18695940086435425,1.1368428602532473e-6,0.3431678718718602,2.431209352792023e-10,1.0338532131917674e-6,1.918357362760717e-6,1.256334698069636e-10,0.13663563844285326,5.747693169327528e-5,9.452435084482204e-12,2.733545015697639e-7,2.395582392945168e-8,0.001078894150412279,5.199987784848471e-8,0.026591652763365503,0.06312475277154897,2.1408477861667513e-12,0.15450293688163697,0.00039787166008946535,6.393205704530257e-5,1.5847195308157087e-5,0.5409563057101029,4.224024353219893e-9,0.00775300318300943,0.0030388257494866704,0.0010328470790810884,3.014919276217486e-12,0.004848186537519304,1.3847639758065566e-6,0.00020276463422148541,0.00012853666300602858,0.00034843689423992775,2.93491019828753e-7,0.00018290141728395868,3.2021768632018117e-10,6.105153301056394e-6,2.5611888255088285e-6,7.34287310948212e-7,1.0814696369508258e-10,0.00031421196678307423,3.67133883937863e-5,0.0020030949717682123,1.9984476046869263e-5,4.052065275773257e-9,0.006679183437855836,0.0010293714587041596,0.030107140658113787,0.003426319609586805,2.547967256167412e-10,4.087526229201211e-8,0.04688794775946538,1.816678863640609e-8,0.05175772462666182,0.0009240660661401209,5.0436421076063096e-8,0.42641004239947555,1.8659936779074699e-6,0.011924266169095327,0.0006492261068265038,0.001605251752404004,0.03497501356680557,0.00019956745053464257,1.827063838562874e-6,7.974688491380835e-7,0.0007578082421287008,2.915782257461809e-11,0.0001574215450695149,1.6722995462406153e-13,1.6131116776895864e-8,6.631583035961869e-8,0.14905805812883852,9.94262680946345e-7,0.0005569059606833092,0.13078061759840062,0.0003706359013700881,3.157267052505793e-5,1.5445389809571559e-6,1.1025464440820957e-8,1.3984429860631094e-6,2.2857580486573578e-6,2.3167357505641817e-16,0.0008534804117063331,0.3905100496278454,1.3822385315216203e-11,2.292448272667302e-6,3.993712546359531e-10,0.00013997767514225824,2.3148644750974083e-14,0.001784046696317859,0.07714050896008458,6.751267105190478e-7,2.3914328024333896e-7,4.295344629436492e-5,8.948099260181102e-7,4.0990207615434105e-9,0.1338190386119143,0.49191635900964215,0.5263546340310657,0.08823555481154734,1.4783591260421088e-5,0.0006593722041885194,0.00030013137051546133,0.03209437868296506,0.0007303977886959112,1.034765855354704e-15,4.2362429400616e-6,0.09169905872386531,0.14976536072476188,0.2269476072600343,3.846835740979568e-8,0.2850648436100616,0.262157083521542,0.1150756475693059,0.0012647502777640611,4.144022884242879e-6,1.6488263610979621e-6,0.001043080384848922,0.012028749022115199,2.2127998896175676e-6,0.0001509148216973785,0.0012175278789266627,0.3351919227781975,3.0260699773319004e-5,7.113403508559894e-7,1.7242270690597669e-9,2.1239937886249937e-5,3.9116818178106755e-6,1.606612394470512e-8,2.4811610841189093e-5,0.08275040573125055,9.732023130844574e-5,1.2815212971545481e-5,1.2380565244410802e-9,4.758533896742758e-6,2.3493804982068136e-9,9.419347251118464e-12,3.964854492125526e-20,0.21081197775223265,6.789121587597023e-19,2.988680218036952e-7,2.532113568588278e-7,4.187496432763216e-6,0.29698519379170607,0.46082626397443643,0.003456101436777596,7.056409768164768e-11,0.5935692917554705,0.0027368948776001394,0.1752834852624863,0.024880930909382037,3.1191541215633367e-6,3.4922005788065274e-5,3.112806880430213e-5,2.6078102346626583e-5,4.554096467068576e-9,0.574836320250285,2.8997921209365283e-8,0.0006277113321491237,4.733987128802449e-10,0.00012067728269846424,8.042158756920081e-10,0.00021020724387090935,0.014914710786754638,0.0006579201472141809,1.6909283105414895e-5,0.0031911640232615925,0.0006309216950219859,0.022157972008558454,0.011186429247512284,5.559681071364636e-6,0.002964263205237366,0.017957437059785766,0.2251140955227225,0.0010729931995785594,0.005059414653494719,5.739730818165067e-5,0.5037840261548528,0.016477187346463314,5.761033428003268e-6,8.714873268408042e-6,0.4252862539993717,3.89861340966647e-12,0.015604339255516438,1.5767526064670843e-13,0.03296468239599496,0.31108541297706416,2.040362594799e-13,1.2037951713580444e-7,1.1045999556041481e-9,7.074251137621324e-10,0.0011461669346063943,7.012247889738628e-13,0.004519435929261817,3.105587790083921e-13,4.703207135405987e-9,3.318478736046746e-7,0.0009926091560212432,0.00022626580749364895,0.020962519621899177,2.5594821464114744e-5,8.985954951712909e-5,1.075778767855972e-5,1.6546274595885017e-6,3.758912861662716e-5,0.00782667049486822,6.0653894774667205e-5,1.2334233615482864e-5,0.4008261135822795,4.716518328027563e-14,0.04178305468080924,0.015548920249363047,0.000838489163002233,0.556263412552826,3.0590621774799904e-8,0.001249694309458077,6.033080298227029e-5,0.0003963096177122474,1.368649023505488e-7,0.0019720698864227576,6.685385060591249e-5,0.07861737385610441,0.0006565971930847554,0.0005161612805879199,0.002163144578757096,0.06940283043191145,4.545627174688008e-5,1.032388057227354e-5,0.0013208534253813227,6.343543503571666e-12,0.0003277817387221135,0.3154662333816094,6.880158452287749e-10,0.0028751837524772987,8.806294496072625e-9,4.2811317871730197e-10,9.583847741931149e-7,0.00020939147710257835,9.781948480532577e-5,0.06822109174859461,7.228602766507223e-8,4.917043083671013e-7,0.00017703363847388164,0.0803269972460968,6.419973532725131e-9,0.2787443097401334,7.682186014317182e-5,9.417880677271772e-15,0.001142569550361954,0.00013425451390456993,0.014612251822731835,0.0001638857074209694,1.6480670279242598e-6,0.06108243351363306,2.6639094656586206e-5,1.8786747699488145e-9,6.877867986693586e-8,0.153592038120197,0.08075010014685288,0.0010717951907829606,0.010720363096328001,0.008246176652047667,0.012584127654422378,0.02208170157633484,0.00010829167771454675,4.146384237982102e-17,0.037375055156456005,2.3706989729608123e-7,0.5159937789423505,1.1705946758529e-7,0.004375218157423931,2.412827503540913e-19,0.16884838597937163,2.6971129126018833e-13,0.0023204849427135117,4.1599340592848425e-5,0.5030156497565426,0.0002558800801860766,1.445660486218194e-18,0.2680008787314998,9.114195433801788e-6,0.33160343439209305,0.0730965677265799,0.001177625380746423,8.400612537140764e-9,1.8186429761566174e-9,0.022470033114401225,0.0423335598163846,0.002006637215041744,8.990732098317111e-7,2.308194204903675e-12,0.0001435160175721046,5.7559753945776344e-5,0.574736507371488,2.7406075662589087e-5,0.21104572018080406,0.000461123988120108,0.0008276509428596036,2.4103559628242694e-7,0.0008076679299124181,4.606921722770446e-5,1.6146223054577702e-6,0.01946040295004294,0.0006838555922834461,0.00010306224275513927,3.394349208872398e-5,4.2559837988559356e-9,1.3352589099207767e-10,4.169058629064813e-6,0.2923778913944214,1.0354357961876532e-9,2.2266809132840668e-5,0.0008504978231118382,3.363118581996141e-5,8.850436251764858e-5,0.0012432008723196912,0.006736648697655776,0.0002954267609438578,5.034068521841681e-5,2.220999889929714e-10,1.8038680452713156e-5,0.00022464361550525054,0.000285644808595102,3.558162825463055e-20,0.06503607122967314,6.872625541492492e-5,0.00026074055388953436,5.214558003905861e-5,6.660656604458566e-10,4.1524183557890646e-5,0.10871741819934987,3.8090433519422776e-15,0.025302272843317965,1.0814766562112606e-5,6.21192878996461e-7,4.320913696715951e-5,0.4753332782690121,3.064684326154715e-5,0.21783194349560536,1.9685521150673792e-5,0.003820164109297108,1.2968712520435745e-6,0.07067020782852998,7.628149441556062e-9,9.746883340511591e-5,0.005424473197445781,4.4611263867224705e-5,0.21406082691070116,5.549614516009786e-5,1.0188006271454348e-8,0.0014073130988245391,1.12114766611092e-6,3.0746416129340683e-8,0.034043689948637476,3.2729247471983024e-6,0.007252127224487377,0.005927073172303648,0.00019559434737477713,1.1437337116956137e-13,6.631278561358486e-11,0.0006401181381610579,0.21377839052623082,5.792564707978254e-7,0.00017550195517017218,4.736565759742649e-13,8.937212395614385e-8,0.22980474412134452,0.27557091354438784,1.9398719202189136e-5,6.374207856130058e-11,0.0003979989776972356,1.7177414358102895e-5,0.0011645103343494506,1.8482999387522084e-9,0.09377082746469159,0.14772082371418116,5.3998792753886606e-8,0.029091140148704876,3.883764086980587e-8,0.26556884977711387,0.0014171170839292957,1.0254570514034358e-10,0.00019325187651505894,1.2494185106542102e-6,0.27978485928170593,1.1474963460321795e-11,6.42254397784371e-10,2.2881707234470815e-6,0.000204419006593456,6.162911107715284e-6,9.525472624204745e-11,0.0011363626595715663,0.00014954497265476764,7.357547671328563e-7,5.268832029870993e-8,2.490534144805396e-8,0.5837564184641953,4.166967712050217e-10,0.01967658113896475,0.001962504543993747,0.28093349127157313,0.0010362883670012677,0.00026006106304346765,3.290850752102453e-5,1.1600959195314512e-9,2.8193249512070405e-6,0.0034636737090120192,0.006861189284600813,6.247743435439074e-5,2.0481155028380099e-7,2.0998609003543184e-10,6.428184244530048e-5,0.0016374720751404928,4.756479248080107e-7,0.1620756196504361,7.492890172623212e-11,2.772297120122722e-6,3.915315662145561e-11,9.838741518844252e-5,0.2765285234184987,0.07955227806238827,0.0006728135627001011,6.03128311745847e-10,1.665716662094823e-8,0.10435298447240457,2.4793675595366322e-8,0.2545268369336109,7.0007117699555865e-6,4.2427212355468005e-8,0.03842929846413749,0.00041493813589956087,0.043914697324565974,0.0003938518701895743,0.0806485895698604,0.35092588098079336,1.6293694445899876e-6,1.3279853350819986e-7,9.837959272698046e-14,0.6041700806139982,1.0036482512832023e-6,0.036608650267042284,0.02732426866422049,0.004623468803005705,0.00047355440021154966,0.00012686501186775085,0.008689928625555971,3.4840967215431877e-16,8.574398264165834e-11,0.013875789205835213,1.2823985937551193e-5,8.421060902716185e-5,8.983297883722536e-8,2.3152551387123288e-8,8.302500911710933e-5,2.630931795903707e-12,5.015729858299121e-6,3.6978643780823464e-6,9.511120050921941e-6,0.23934947420264663,2.209653931553913e-11,4.5444580965142433e-7,1.389436298209368e-8,0.12152092670998192,0.005744601653603826,0.0022543923449685516,0.0021623917440749506,0.0008284078301199996,0.00013708283353138715,3.6836671634749517e-7,0.4890218606667877,0.002133992318212884,0.038720880280040906,0.0033581582296939782,5.79146785839777e-9,0.008475881105481297,0.00039405166708152904,1.2221167087383758e-5,0.0014509259806783897,3.4902379398799176e-7,1.0508993113365592e-8,4.963767300980931e-13,1.3538971660453435e-5,0.00028666016059253867,0.3959400012889811,0.000285859798389747,0.0012500993749875308,2.2435260129863475e-6,0.002348442152035303,2.5301240022960685e-5,3.301428988348898e-5,1.1862442503428983e-15,0.08195712191285631,3.1762778975444514e-7,4.5027423834895526e-10,2.6967386915208247e-6,1.7007448382977515e-12,0.0002857518850070052,0.002532888044987872,0.023972208267480217,5.993995133088675e-12,9.935444323961804e-18,0.011450646187177399,0.030249074957664605,0.009653564603410221,0.0027100685736284433,0.0003275494858606337,0.0006516573906170782,0.01824895366346081,7.890246166527718e-6,0.016750083877441806,1.9270591482030492e-5,0.0693011047272375,0.0160414642072509,0.0011818143655212008,0.43724604416726576,0.5957289225748501,0.052958961922837056,2.0807460651882307e-8,0.13624172541082233,0.0969653506679053,0.0017393864049677714,8.747527681648018e-7,6.102587075092739e-9,4.9323007213083595e-8,0.0003257864206227265,2.8293187098000395e-7,4.138794523761004e-10,0.018680968017215548,0.00012654959811802743,0.0011438258257290236,0.0007982566252611255,0.0028352116638599026,6.269329821694518e-8,0.002022438736333171,1.5965994337826493e-5,1.3616943638308011e-5,3.4391587962172975e-11,1.3013306005438898e-8,0.00012147991212746512,0.003211886975374112,0.0006492458529067001,3.0188531497469296e-5,4.482139536580015e-6,0.0004864146449069355,0.02467171114508695,0.007110194718891315,0.49438186053498184,2.3008937006489225e-5,1.0980927705736971e-5,0.1844538683901381,0.0015093253671149803,5.1944348689316776e-5,1.1887892464866818e-7,0.0001268024785632706,0.014590956382477272,0.089551007200101,6.477491525865636e-6,0.0005158594370047713,0.41515934542695276,2.8692017239502227e-6,6.419364748960261e-6,1.198003622234312e-10,0.009022575398613985,1.2905709419774183e-6,0.024299192596568854,0.058657273212798615,0.0006666659853791875,0.0002244266320348226,0.005549790973129229,7.531583840539403e-9,0.1627734656175099,0.014900690262643785,1.7963196115799406e-16,0.11959586572487756,0.000200117505402249,0.1086705576285313,0.006106060009416508,6.712713990274693e-7,1.5418406638071713e-5,0.5483508167125967,0.008356285020310833,0.26132022280735046,0.4861760711493106,5.205829189224129e-7,8.729467707670625e-8,0.29433548078499877,0.08159584203354725,0.000652762339409579,4.011716974995814e-6,9.178970798563504e-7,9.077116673006222e-6,4.9572002870693995e-8,0.0032913854021448604,0.1066011406040374,3.928710419310624e-6,0.0004097517313779293,4.212868409488261e-5,0.0003834395887903633,3.8501037766821023e-7,1.9589516282945524e-6,0.000880236360426087,0.27663126885897954,1.8615968990581249e-6,1.376736050952991e-14,6.67105633799562e-5,4.466397720663206e-8,0.00038802699686774024,0.001629786526780737,0.019812958650951288,5.523979579774078e-7,0.0005468036430953223,6.7803409944564105e-6,0.002664819579077764,0.0029488362096061487,4.159930783225881e-5],"k":[8.2140537304964,0.8355391147867142,4.8510940115067,5.802841903028726,7.627237017756652,9.476854510603305,7.1987607439409596,4.414017362629887,7.064965469741892,3.203016041008484,4.257842797818676,6.484502676533452,4.1849214834372255,3.18470474373183,5.15595868762772,3.8018576587376374,4.196255247594376,3.6000782035085788,2.102441968622517,8.501914229219008,4.930915661833712,6.7877085656945795,1.5261446106259036,4.684738309837579,9.06963948366937,8.700779761865512,4.390330373601554,0.884384896755257,9.148142443036155,1.1734683096042242,7.949877863419134,1.1783893913630261,7.9609641591942655,5.672836033960236,4.773304018789557,6.948260401731565,7.02953251043377,6.3795336040865,9.036632546321721,7.778419346717991,5.539231838500244,0.7014487452564033,8.147398401511829,2.7840323583115123,0.7662179106448486,9.131339067146094,0.701223074110191,2.948123551940496,3.5483552171126775,6.582204603216628,0.8518367435787288,5.136005013436574,5.027132367324345,1.4768191658769658,7.337580934870203,0.2318307113808804,4.950359555280017,2.450398123156361,6.6445912952183495,6.596891514488668,5.051251235485883,0.49413323689228905,0.17603718206081087,9.2596720736112,8.000987294306206,2.6470147687451773,5.326150939923906,8.849575831695,2.7616401187314366,4.379758239097367,8.52679661205447,7.181218782844947,8.622434732328975,9.896381409197598,7.037055479454992,0.3818369022708201,3.02248720435768,7.689002609667133,6.298238112385512,7.299735211848968,6.920767565307637,2.8493968050375362,5.319251275837438,4.383211200286974,5.468384592418953,9.772912851388236,8.982398229309883,5.300355632357303,6.804523895592791,4.5949924345106545,4.401011328790318,3.234310383658765,2.721006469066829,1.5371684801640684,8.359493150223534,7.948316031967848,2.734334300160919,1.2909773651472278,7.955964858226832,4.741785475892928,2.3140111580971623,6.575707836161719,2.1612953783077726,9.597730289870206,7.433418157630558,7.657639812829375,1.3311594764077328,5.523675423906063,6.94856017670933,4.69385671144817,2.8574075073667204,6.19669769030867,5.621405207881763,9.002115957248222,0.8045252744354592,0.012699809578948784,3.5636536800643004,4.664279651213555,8.657133774978231,0.3635234425398193,7.674914352849349,2.9621483185291098,1.4894299731999228,1.6657764592776458,4.648045818861926,4.55402810964856,0.6284632466800644,9.777097898342667,5.409603743905718,2.1801288761530135,0.8343719701706931,7.54085031091114,5.6154684485609785,3.156221715415166,8.706436950413623,4.353737382227017,7.250711771982257,5.239005344723697,3.1026869582236216,5.2596473229331675,7.888709304698298,9.470897093136347,4.232330513472116,8.293934322175126,0.4122714075791989,4.695971957117755,2.6111784271096417,5.844974086252222,5.414733075407183,5.3359092450766425,3.8487908859971443,9.655039427774488,8.444274516252552,9.342569772272205,0.48120500606622096,2.691227950728745,1.9524856810526758,8.357387294622377,8.618844285224132,5.771291640148368,5.840303588244664,0.4719451852920953,7.73620298057833,3.8401507361167475,6.2763451130747505,8.491761737001248,8.120728253709395,8.678516675787192,0.9037471132809727,0.5113254726207073,8.02104403573367,0.8790475515958907,1.453188823874354,2.3955144611521106,8.990564253743052,2.8255535404537913,2.8995954738099217,5.367736412875297,9.012766644669181,0.7156656706501408,6.006208184378988,9.390702506955025,6.321072814015487,3.7381407639226905,1.16575165895761,0.9541097642616525,7.828411845216294,0.32986498800104513,9.146229739353174,1.1524805527909687,5.460267657363323,8.51287251437957,4.991010315586761,6.400553842145604,6.107069236464611,6.913227617911815,6.838319388964109,6.157945212139886,0.7949050594012652,6.307587131268941,4.001676560538973,3.2555478618817535,5.961592977632457,8.273744861804982,3.7610100507990185,4.9562267445486485,1.040498728342476,7.800139074089314,5.1763559819332965,2.3856600897682223,6.903841570781166,9.235067078566455,3.6227430897912627,4.436623007487459,3.458375122197934,5.7047082229023705,3.710366551443709,5.727691257721739,9.038465893373314,6.757210226128376,4.168564482278095,5.920545625526725,9.510298406721247,4.66274624141608,8.430226141853723,7.112404944001735,0.9922152932358275,5.643140690624325,8.494685785195454,3.9850123470290177,0.7005986472875736,0.47099157733619723,1.5032697632089875,7.966666586597741,9.596784925390336,5.5767868874042215,6.634895883170087,2.058551153483845,2.474644246831237,5.320176383278765,4.8648048268393085,6.679477178837359,8.32278049196978,6.292859002124967,5.110963992387216,3.45003472150871,4.210482690430215,4.613132850220419,7.268550433360723,0.3568560930375475,2.264457175606598,1.035322290475107,5.592280204597091,3.540912364793529,6.107193455898905,2.361520885679105,6.329951998039904,8.930826306034465,7.811411578308036,4.855621215227703,9.53261135719887,3.4511992128599545,7.34848577878746,8.604233171679452,3.0867324744683033,3.0953158205320674,8.421442968145614,7.310511008310742,4.232555589730238,0.1274730164841409,9.947362655092103,4.004014500936755,6.622618182815572,0.5687748580404484,4.898434760762703,6.666570607174758,6.7259650503030555,2.0589820211374565,8.691851905556023,0.33875715971648956,2.344219692034555,8.067120479876015,8.027855816083065,7.383324866968484,6.688893065393369,0.26539653063630597,4.56646080366184,8.04860898042323,1.716703923820171,7.640872141346414,8.870645672351829,7.955081782720217,5.1250944549079875,9.759791454945763,7.810054590876783,2.790086780567158,5.877777996975812,0.9250204264289796,8.51353661203486,9.570994548032294,2.182738968111957,0.8194520645459491,4.907798314223646,3.041773759103643,0.04188137805092973,2.8511533564150726,9.799908631175931,7.110715048263945,9.360115373721918,7.95403148276455,1.947885543761687,8.706071160424697,4.152073522812046,2.60652049789863,5.434325045889534,8.15266795612489,7.889871709171736,8.599069949712671,0.12941926276595295,2.906138178250066,3.3848946572247285,0.023672887773735773,6.807750912420969,1.797250348483297,9.327712119691377,6.653389076757401,5.608137892308925,1.4453492749395136,9.817485781480306,1.7015762217547925,5.829086930256708,5.140115637886005,0.6950255093293656,3.694623462963955,9.85677089821274,2.154417060038585,1.76153376951796,9.923801690423563,3.3430264768255125,0.5075571179723282,5.367759159881889,8.521426506826499,2.8569215273479376,2.2736744158629163,8.903522087414686,7.628733069026508,4.942916686073637,9.099789260584403,7.461675524822651,5.280000771160647,6.912225860352579,3.502559246417274,9.82478104263187,8.791282905150497,7.515170964223243,1.78431976819462,8.846784982762756,7.272093276260887,0.006321289319397572,5.933581046947731,2.47893520211248,1.7508768432338973,3.569074526854814,7.266592605781652,7.096456370510291,7.079791966755897,4.416816064273512,4.4189901447111986,0.17616360843952572,1.8082842462668136,3.7060623731008513,1.9617774892207462,8.884077423061104,3.736469636542925,2.6186160952069293,0.6893996051112072,0.5732985689285663,4.933080516861454,1.463170216736016,3.7188608799660616,4.749180787770035,9.075850564583154,0.7364315399839305,8.892721343972498,2.5764809783873077,1.8131290028221847,0.7760294988060457,8.752695957048873,0.714752630173725,9.600120539956842,8.185954111545762,9.1730841106857,8.613043881257784,1.151076564592164,6.986343455507202,8.223862020144864,7.922418484122183,9.362617242986273,2.7008460022531677,5.631643690636087,1.2004250607365519,1.896151982609371,9.897241153183282,1.280434811119322,6.052805046960641,5.20224641338136,9.462938640975974,0.33490082277557454,8.391119412658202,2.9109654205160607,2.27758444732844,2.8897024412500216,7.9746299354057815,2.508207822308788,3.37692653769768,4.888361309375577,5.178876495541105,3.3282192104212305,6.706871931074696,7.273669141483601,8.400704236486922,6.879900177636182,9.583589049917933,7.127709800536735,4.674131097999819,4.5152614992341285,7.724966686026066,4.834079463812653,8.894960014409266,6.876142791349491,3.9114386694047054,4.223287991272642,3.576578466833522,1.7368487213465267,9.88674751396676,7.690774907886501,0.8973569912213231,2.360034516504499,0.9857476510998864,2.876123721831474,8.987950094581795,0.33762571350866244,8.61542881771587,2.899818962994465,6.418832940674073,4.578254635864065,2.624298208881035,5.145373680015766,8.62498381994759,4.060101144820758,5.743366215019012,9.887486113380508,3.0832585915709076,9.06695163608344,8.37780329919428,9.934043320708959,0.7993664155794122,8.558839903951132,3.0239116112789555,1.8016174149377218,5.089825829419499,8.152879676909137,6.593799848326527,8.17919055656295,9.667552309588135,9.098987630799195,9.856050902743881,3.7174814268995804,0.5071989747304761,9.602922081984715,7.6451512678688776,8.421047396300027,8.361951759958286,8.701805997389684,4.991687418701332,1.697913362943666,9.033677531130289,8.834711933058248,9.660356559348502,7.3523802846894215,4.922445019740276,2.24108478370852,0.22999354291791452,0.2213065610086251,2.460683880534069,7.38257032864947,2.781540042627022,7.67415667347162,1.4138388952054148,5.43886980939122,7.807586996740596,1.9627998717610895,1.432652621161934,1.4884370456780927,0.8693668335959392,8.32273169807541,0.7853095262339993,0.7917692754952643,1.7677831461138394,2.927390708332658,4.831744933135393,5.611704038640488,4.778450064855533,2.854958363462765,7.830631788416693,7.495258707790602,3.157013666009083,0.4031379924323675,8.246059465123725,6.838288233218792,7.623514018401614,6.072128519714177,5.997995249913428,9.503226299270636,4.205074777408453,0.9861582399038449,5.6190685606055135,7.175149934998095,8.325731684234018,7.56865566736074,9.447079782151178,9.77722221697885,9.857057226873316,0.6686534463802185,9.003973460150235,9.550634813602784,7.359605441286774,7.29967635297303,0.26161316366800635,0.24011784224710953,2.45077027410455,6.515615625847202,0.07124520665665823,3.872849199999502,1.138965925817621,1.7499648407995472,4.404669775856329,9.632075808707818,6.956240339398501,8.635731819067438,9.495458613736847,0.170644964036597,6.005197289631825,6.551149767515049,9.000721874620623,5.702230703078783,8.237268720316756,7.257358427526506,2.2164537855818622,1.7950019203167722,7.090564191507019,4.382523061611718,2.432487806081609,2.949729438830242,3.100532950004111,5.130283612981568,4.434870367834529,1.453561902840168,0.9533295681971055,6.403846598892661,2.2145826682300074,8.338485120577817,0.16882554918532078,1.4647920790445856,3.6431973726049627,5.772793453474147,0.3264590589203653,5.122442769004678,3.6721947046609205,9.701701148076975,2.6089621109808614,0.9547584610351367,8.574091746494801,7.266199865513146,4.336444907664694,6.763816754072347,6.100034650791111,4.032156380435035,2.356823671885091,7.779849767700135,8.033015780941096,8.903980763895357,4.777402369700772,5.768547063219187,2.308833251761422,8.551218741097678,5.363427642631602,7.146799341195238,4.88378145223418,9.475650641551905,2.197956304536337,6.371060264919288,6.4427040928174595,0.388183880775288,7.296787606278546,1.271903447162066,2.2626618659352293,5.4054409433053845,0.07444626859628878,8.127697348225556,3.462178938887781,9.837614016451948,4.700847670906887,7.534628942957644,4.076634922565365,3.0825591031988675,2.089173496484056,2.593328947994986,2.7067608993905234,6.414563681752787,0.6243013584713686,4.712238291310172,5.834078849123299,3.701557302168834,9.949606822099673,7.422876582939038,0.7730109384605899,9.866814781995494,2.1425214083557287,9.79327298026451,6.98090140727937,9.567439242189801,6.902123110866121,7.57289793056557,2.3204741374527726,8.428453809531478,8.006035367374068,5.562579644992322,1.77890796676907,9.603038610972927,1.0535806412806559,2.6742537436229874,5.214397090779275,6.8221344475181,2.79374227985689,3.4230854912460185,5.139893206910921,4.2392481886706435,3.169697740683537,7.003683494411312,8.054418426218907,9.707810915095756,1.263895378037554,1.9099087732310749,3.217495234733052,3.1880779580148144,1.7319382853543508,2.777436437667853,4.679345606344398,2.9453982550647084,9.634513625950436,3.3844471387964603,9.985501174034992,0.31313828817939315,5.50908767835792,4.75733403149863,9.375533974497184,1.4358447603398794,5.434760112988998,6.052096589538632,7.843642232202967,0.06641601964182398,7.858487516699146,6.274758837184045,0.9755664071191839,3.716141239640527,0.4360929900189925,1.1856291527944052,3.3800051822493438,8.737812513467492,6.444178303159509,1.6829299750945936,3.0100095046149566,3.9574926765597684,7.947663787650736,2.9799612405557907,8.05505214334168,6.615680988175381,0.06792942580253758,4.74832365941841,0.9029651653369997,8.28381938426678,5.0934266030446,8.713699268498429,4.152564954608227,8.097885997362154,8.21916377852858,3.2068297152159753,3.1176124216315393,7.647457285489714,2.3480029630044563,9.651534528400457,6.314990890911059,8.714355329888928,0.4146807482587622,5.770512875471853,9.914607429715542,1.8195365932885021,3.768147624790452,9.686413997239466,4.849021920406216,1.5687192439979603,4.574798063956971,3.6670293835532974,5.059331652080996,7.706341536679522,3.18450434506655,4.844748187009602,8.418270608395115,2.1456139652993533,5.828752366747809,7.278125866811182,5.08203999375832,8.610690336726073,6.776321946215374,1.196780630775789,9.728117520249365,2.51435010267822,8.370620099457756,9.46972383001327,6.803511920544844,0.4867426665058905,6.794241413534847,0.9892779050540734,6.692620237179028,2.1576799352460463,6.969233214196984,1.5212420665452275,7.859775623214784,4.336607942607231,2.236099162218299,4.428402191151745,1.3707723195116372,5.907900488142134,8.232422425913233,5.016268230230258,7.826591770367857,8.032847032617179,2.2022767971988455,8.790153250941646,1.3859993426028683,3.5286093016118936,5.27210087964572,9.510100092747201,6.878717196505431,4.116998025216625,0.7195577679774234,4.9695525958844495,4.180913926217227,5.158578704033554,4.533400362992552,0.5217987568415317,1.01469254142174,5.650010285430536,8.312203330051261,5.333873719708972,8.465980381788079,5.504980465943787,9.115525426681806,3.044596994754989,1.141754572512641,8.98607863944794,1.3040365854056168,7.486925954932038,1.1781142386052434,3.27717998097542,7.082284224352593,6.235974573017593,7.469762494447572,0.8782129356096613,8.934471311143799,6.5982086696259,9.272547453808926,3.314625301393954,5.648004138511475,4.343964285778665,4.764352391538365,7.82270846499001,6.470872539105943,3.4872053007352966,5.9089147780722335,0.05556483953231384,9.759546390527753,3.162471128814577,5.978428793198445,0.7216694574641935,5.065141787168446,6.239728691543451,2.6009429258487016,9.210462100344134,6.2384955453136515,3.4625215116405927,2.8246184169219046,2.8028597754228546,5.042380834850606,6.15643550816368,7.89339363343691,5.036077111370478,9.458360656519183,1.4215145455452816,7.914098495052071,6.4495500854225885,8.298705842091067,4.158196869148405,0.705119675813064,1.7143960787675394,3.648147522708294,8.46801725261921,9.367131945266753,0.6275803469076835,6.91594724909298,0.8268037276170004,5.885264307358462,4.035176072433386,3.047526491268584,5.618161726667497,3.179865107957811,7.336577863017282,1.327041096437449,0.7955375173865797,7.4172479431999765,5.065965180492404,7.619760447886312,0.06634889493777552,5.88540402877663,0.9474623495591072,3.192317559118505,2.2166330879190355,4.989962125226186,8.234124029119915,2.8289810690587847,9.264755109215221,9.418294388524844,3.026169723206873,8.951392266006371,5.980655747171952,8.902009622834218,8.403652868612532,5.584908390819554,9.642502969202093,6.785201794104642,6.4176411101460795,7.4042236856812345,0.6203130892862752,9.237001331389896,5.898158829833598,8.69077108298664,0.5244723493551118,3.325930526973915,1.5085000906020762,3.0746520656082232,6.049051672727172,5.779795955223504,7.442456975687923,0.14216816692256717,6.196581834099078,1.3552936715159225,3.1295438443743007,7.205893076245056,2.451491987720531,5.087116258395767,7.6528480167671376,3.773618282829465,7.6841125726989805,5.399790047607422,8.749337549029581,5.1358919489272274,2.2582721286685437,0.5940234717378634,9.93287479456052,3.9486835814272725,7.38260009217589,4.544020761134058,7.7469104164534315,5.292961336282764,7.9467944890497,1.253610501571858,4.529981316729015,9.991786199948994,7.491361644297578,9.09680302375537,5.577048065076702,2.5376426378885197,4.281758580804203,8.148810741652664,9.237715676942704,1.7398968053982,2.2121725742431697,0.8806989192252623,3.638908186129448,4.533208692321702,5.651394115384731,0.5747000872571761,7.033994421434906,2.231525633421234,8.570760475453806,2.5471310627056365,2.7503193280762916,4.643695973847814,0.2739352944309936,0.06094290076998243,1.76039023589327,5.151827673662122,0.9777537752612964,1.6400578692298695,4.026481517340919,8.005140552265509,7.157307085030784,8.031992307575223,9.239933240775118,5.559752143288357,9.096919203840983,4.163095512679645,6.191561643562422,3.4994115849406615,5.326513221955153,4.617469711054428,9.299545643956284,5.304210131287446,6.632186502600959,3.7628555449832413,9.878729861631175,7.167040244870546,3.6070764960365365,4.552638392326873,8.223564632799345,5.031338976585465,9.0352123863359,3.166861083063195,2.1728630279068972,3.1861151964053613,0.13067077203416044,6.105655113327475,8.838091581534382,1.219690402536231,5.797883868624618,7.159784867933188,8.833421059495585,5.082972222243121,2.241045249579734,1.811803592773853,9.186547807349266,6.258819663508978,0.46521612108748167,5.70242599483054,6.356261613009215,8.722362683433317,3.8216013434024254,8.290413406437786,2.148292427406089,3.3415591152371737,1.904376447040974,1.37230777191365,2.3025370517789345,9.61209920550598,1.440707254090452,3.0574326052610656,9.114986173955986,1.4780628135519769,8.107864545660075,1.5307719711093104,3.62474820217747,4.792486748304343,6.504627681551261,0.20135412558807797,4.399399674668166,0.3406193212137598,0.5344564305216504,7.42437006353585,7.589836712891318,0.4526488068757395,1.8543770577850016,5.246841904546007,8.996677146089665,8.67943444050864,8.293726524044354,7.3916274449754855,5.379771740798766,1.083053613143059,8.219305282867587,6.146272277735081,5.572173788019881,2.963390115488289,6.0503429976253535,6.2752902288625805,4.987454410809333,0.7651487556872549,7.2664403096451835,9.767261037395265,8.045902781258093,6.930914948409237,5.796013512881675,2.5221453284631656,1.1590442199826345,9.299181605622021,6.306694649863303,9.765650819444105,3.4449569044530937,4.983022067037918,6.693150278803277],"x":[4.679595064194606,2.4492628053647336,0.27290824363669586,3.4824664134868746,0.34470421784685734,1.1294699156234045,4.592254936882377,0.8337464177960396,3.360785903133844,3.8978025895968993,3.2774732888185087,0.9580673359580627,4.533462533926263,2.3950325427356125,2.2659911228947607,2.864643183339326,0.9594976081070483,1.37338243760454,4.77474493477552,3.7846344946972597,0.4016420271186161,2.930076377792327,4.289785651888884,2.8782282215861654,4.339229312100605,2.3523687353981226,3.4634975838815416,4.199619766256052,2.491375195115845,0.6018939104824883,3.4411142260752547,2.4111864558130436,4.626595885863369,3.688512452667516,4.654233340268487,0.6702093383772545,3.4836340511915633,1.405539240052126,0.11027661231436503,2.7504058955137767,2.411028828659303,2.232699868755894,0.4179700879186776,4.710825092746033,4.337381788791559,2.793485374848327,1.8560225727191326,3.085777075065251,4.3450976239602035,2.445139061710794,4.833706812517571,2.9926199069647152,4.782495715687851,2.2844773535733442,2.313855671413505,0.06325405068608125,0.4771861144345546,2.6900143726799506,1.2051635463617905,4.405679288512622,2.3183438948347113,2.2670296186010095,1.255583451275385,4.41212665888426,3.7062465330141956,3.309231803170963,2.700304490241253,2.6387248043594456,2.397153843287092,0.2645612869701419,0.7751608007284405,2.9902678619091247,0.44960239403427305,3.61528504454389,0.06751951735547101,4.895900390917712,4.470207866597744,4.690207548129843,4.815937951034034,0.42195790467969285,1.5104685018401331,3.624330873000574,2.589122703271304,4.453417994252536,4.11390634742295,0.19012027926268882,0.4604167496873013,2.445732187079095,2.715948594615012,1.679993398235169,1.3252718246155915,2.580005440076245,0.09784889570443878,3.234459184140662,4.149817071844298,4.154758444052048,0.8370505062225131,1.1399084830890616,4.783763774150653,4.309601881098758,1.65448883469004,1.1802623273228963,1.4405449384845626,2.281753739445956,2.569080541664844,0.2650699157323211,3.038804721490078,1.3147147650688906,1.1905720667597164,4.241297025804731,0.7455872886890536,3.8887873758332026,1.6785934566142358,1.189335018761265,2.1647172851189076,0.3427008712404733,0.9442684249348632,3.285663671117124,2.5901773437491524,4.093887200035866,3.9384614555609785,1.1034304633095937,2.2717776102837828,2.7994668256239716,0.2641387061853939,2.0120445304117696,1.086884983135492,3.9125920279286994,1.3221661743566437,4.139631811732883,3.7820458494613263,4.030089310987496,2.8730296594858062,4.244091832370083,0.09077089963346552,4.242801863871012,4.4761901076903285,2.8505180602089606,2.7315590014449254,3.549924511718199,4.693067398012742,3.6858912894646787,1.6166057384509847,4.003367831507206,4.188840507098113,3.916721886098915,3.8915868252225394,3.133572824339119,3.9068553301997246,3.8760385697689035,1.6619355497940536,4.228378230609007,2.134614985238116,1.9375468208915703,4.4392579024605965,4.426426218319558,1.7155219879215289,4.795669350964419,2.762491810867518,4.329056561873608,3.84429108287067,1.3994024067643296,2.9131329599208575,2.0400336284510443,2.926545937442062,4.79341634729881,0.10391403591701986,3.2262215343487375,2.163048826355211,0.61965477042915,0.8875895161934388,0.6478771057350319,0.011808749513503303,3.7312614611442307,2.4253417408805458,0.942206256065532,2.8786244399667185,3.389539226002989,1.9361539290784047,2.0405209853566175,0.45308617292846964,1.3987689583355345,3.795997099365289,2.1949064322971603,3.763528349556501,3.8438781319938187,3.335747031941704,2.6931840097174478,2.4973859384332773,3.170191454890766,0.05583851568651266,1.4719523538301504,2.8117432889695637,1.8055881217337333,1.022554253084369,2.48465738303615,2.1315559651023905,0.7708559723457198,1.9832769408629203,0.46588322113530367,3.4738650424869357,0.6597827553255453,4.162517715989262,2.8309656310229157,3.0759242811737164,2.1596877754565136,4.30839485428514,2.6357613190021247,2.1890246993734417,3.4356194962134765,1.5656365480720658,2.0259166750658664,2.7467397137501735,2.344266308326779,3.818668880563215,1.1511354616438418,4.19637046611536,2.9964022563977877,2.8728585907741055,0.25727466623120754,1.9290304547307668,2.985165992507477,4.493515051657672,3.8806237714252987,0.44981352186017953,0.8873596029993092,1.7987259483611273,3.4160520211158407,1.3859598532354878,4.973915268920419,3.4268437958446096,4.7827081258787505,1.3931946031648168,2.6375313174218107,1.1716549656509634,3.3800152257673077,0.08030049651407856,3.1065624329330745,4.379345299698066,1.6679327294273683,0.040304409430320653,2.1724388593034636,0.8640562408039787,4.266442063942977,2.142472704988514,4.967570177051029,3.2100144393387198,3.8766074400538555,3.2063438312321955,3.6344672346427687,2.0653651548774943,1.12430134956934,0.10489462841755781,4.0426050762164945,4.55459096748336,2.4251177892155917,3.4908840028601276,0.04742700237772568,2.324565168435906,4.426672718202454,3.763836417319327,1.8088926768771862,2.739050835536536,1.3934295270591757,3.561121982703285,3.3501783609083113,2.1254923278781135,4.008884235126492,1.631742108263593,2.1221906159904202,3.477660404895513,2.3991642986165482,1.0542979303183786,2.1916934796929954,4.972176025980859,4.412372679047719,3.1481779627357787,0.1564211633502377,3.2294005591401485,3.7409488174943215,2.740004730119394,4.18113741300087,0.5554546603842281,4.155189656882239,2.74539952277701,3.3696407707312446,4.034947276984864,4.039493456345122,0.8697681301305715,2.9068953928816175,2.2308767941083776,0.5983962360318762,1.4211791072609137,3.810597477961706,3.456723274690848,3.2967515705186976,0.832367831232681,0.3633870006307449,4.776029283322988,1.885022591740284,0.0541133350421219,2.3759000843764158,4.382061835500361,1.4339313327157932,4.732105832097904,3.3090166807975816,4.86324815059114,4.778424117693435,2.4702352962401264,0.3660174659447768,0.1469461078924783,2.648947581546419,1.003229235678793,3.4287438175353024,2.130524116935597,1.6289126257834163,4.950377052357808,3.595695893132854,0.3820987711740065,0.6879538061856039,1.1755556439799641,0.40485502134798734,1.262572104495585,0.2959846112839415,3.5224778247105846,3.7604961665783,2.6781032764617194,3.237650854963113,0.5173118559765844,2.0490688840875446,0.307672732604789,2.8270424797443363,1.448667665047062,0.4935854686413732,2.6618709186646203,3.5596952397850345,3.3008197636413694,4.219204800775747,4.790813460492405,0.9922440266018295,0.2475623041671393,1.1532932440816246,4.029933734979166,2.7867915829870715,0.23805688938004388,1.0719439700544364,4.98286520483267,1.5245241601608095,0.17492079608705247,0.1601839471073696,4.706563902495437,0.33940553395259476,2.7828846217659953,3.5283893112785227,4.44422754173512,0.5135247615949312,4.776514521002957,3.5167419260387,0.4290984252660235,0.36211785893725645,1.6633476559958293,1.6848012185128047,4.068995338290655,2.533478346312017,1.5478647756840125,1.2712338075846485,0.624154615997986,3.5073610423242796,4.239525002325422,2.701342073784705,1.5428983845971034,0.33036386102815785,2.909647131838322,3.312628928835395,2.9258078746383074,2.4559503510144784,3.995625136591381,1.0194909995734858,4.210586954920722,1.3111911634656581,3.990665180188725,4.006619555782166,0.6497263871596648,4.23625842505499,2.4173341733106213,0.8228905167111,2.3823691715270434,2.9280497364658054,3.94129143145592,1.3934473474256048,3.407094027920987,2.3882345776939484,1.4115360581551961,3.106866492541136,4.406243467678141,0.6873119058846988,2.417614350551809,2.855076099494396,1.5444601546595016,0.7931639654837541,0.6958905513724123,3.7748614090820833,1.3193312271568702,3.4647031111424176,3.5856067733319485,2.570203730305123,3.4663525440107543,4.878904462614867,1.4192410871402728,3.677037481476736,1.2804047799096263,1.4836022730414467,0.6418435691706303,2.377267664322419,0.26229458610623646,2.5604794966561926,3.2194178127425364,1.7959366249435427,1.9396848659667287,4.750319565286275,0.9436312582923689,3.1694379146257656,3.5505421263545847,1.9472451701047921,0.10873812711029718,2.1019458797014234,4.8283370108970125,4.952557116993251,3.1204381304976936,0.8465511020996608,4.0888148683950885,3.122148712361753,3.883250517392378,0.6856837631902002,1.289106029949565,2.084945175975308,0.6221032800036419,0.010053567519143769,0.7593791912412429,1.1013744870743114,1.9093659480861669,2.071965677036588,3.7933780548382066,2.927488878525897,4.65628624752428,2.707335340944571,2.929047865327586,3.491305669186009,4.173568736650253,0.6105389922495918,3.0298182516755876,1.3864508381698692,0.9201302564171732,0.47829433554618217,1.337723661866267,3.0298436431399933,1.3433180991441374,3.3375360580678217,1.560103322086659,3.6995063299362196,3.7327835930768205,3.8353159982498775,2.6171788261010076,2.03155549536735,3.9208671336396628,3.102261019165372,0.36384195363192817,1.7915970932409941,3.980841523961897,1.1273474949467088,3.0220904318925204,1.1488570557886157,4.550446654553206,0.2717183787620536,3.1583012514188926,4.392896702520728,3.90011836105959,1.883057010842335,4.336151555254466,2.430926618553082,0.39199786413813276,4.508649653960003,1.843890983465717,4.692716397885475,4.987992611990826,4.165856962237537,0.7243273670624018,3.642652946800007,1.587737648860441,4.550754129895615,0.18595775285672356,0.033333273747190306,3.1685070235474977,3.810657536279698,3.736301245409112,2.3555484710099392,3.9212656260129872,3.173833104372786,3.11806163313999,1.1791957068410408,1.1310258449103083,1.1063895420070846,2.7140454539369916,3.580808554402143,3.598305550700859,3.5422766446553187,2.1322867602285633,1.8263542289803736,3.2522059193938233,1.426480405714814,0.993315569610953,3.09216165588532,2.2796967007779667,2.141282242736282,1.5540871487938135,1.302927701838602,2.5973502038046306,3.5674058518391205,1.4748098500694307,2.4933279425691977,2.0003613874245274,0.9783571581436601,0.10868167102146442,2.156233504679573,0.1809949520316767,3.7752316366745466,2.5342957684944567,1.8892313804425342,0.3605252269949677,2.1482119319934103,1.4473773423776637,0.519225385016443,4.487842065702205,4.124289322591242,3.7002036224341026,2.113103319095977,0.6328074680967333,4.980019140333315,3.7192731799991363,4.872882797697623,2.448570929879166,4.711481624703429,0.8469225026270788,4.803583006891248,1.3328635563223357,3.6976665963674016,1.4991157424443924,4.047499992389369,2.563099827735471,0.2391669303748578,4.067485998372052,3.2830331858295736,0.7908125715962955,4.5289067425463365,3.1694940156171993,1.4537949771565295,2.718114635906854,0.7353607930026529,2.8154980774387806,3.9613397018323715,1.664201963584,3.5310266831442947,2.331460444417056,0.9200677445435845,0.633728805414232,2.0026272299533856,2.204788836880226,0.08588093311648115,4.150545259782133,0.8886975664222074,4.877699436297372,3.810021254191266,0.4775763764445906,1.7687395357624347,0.1063054170359401,0.49062255149377343,4.759494011786728,0.019242632886672384,1.199633463926496,0.27151186534982497,1.6639096021779987,2.5272415864508266,4.140920356738285,3.282796314321738,3.5632307370796132,3.5934198760981326,2.1327142385893327,3.1009070830905094,0.7484202535610496,4.9621812350640475,1.9830679225883452,4.208962313078702,2.368082930147817,3.2021751206811033,0.23257198931713963,1.3624367049241248,2.122565382105291,2.78935291741531,0.8524184728912021,2.0962821046073077,1.732298047236056,4.921730064458684,2.665596437812636,1.7785293673458824,3.336489846009678,0.8225376011579222,4.910943164626026,0.7304255635133627,1.022890304409868,4.608807401656282,0.22738668101128012,1.6383344228127905,2.7399507362473807,2.0264021697787236,1.30654525074133,4.7191276679177285,3.0313611858977585,2.16810885860491,0.926374226710619,2.286146532917636,0.7992067599937869,2.411760638241481,3.672127748366486,4.730259786496726,3.3267428765160565,2.4891663066170477,3.008769829217793,2.7933595143543153,3.5956811936240785,2.244476346143951,4.2706161897494965,0.48738941536127567,0.03349094968305155,4.217013261585182,0.696840387749772,3.5482143840632974,2.256422429088205,0.629981738653419,4.927206989282538,3.7352749185221166,1.174921029008943,3.30095513281322,2.962227685622063,3.2240219894210256,1.6877431043108548,3.6159267380856566,0.7809771483788996,2.8113508487484706,4.653022506636638,0.6969153550375784,0.36496374612804083,4.598586784619165,2.183394510533243,4.264178003524597,1.0591134048134032,3.901057258733424,0.1646817752055174,4.153039739468705,0.07482216185703217,4.161726020952415,3.01863072074094,0.06617946958966558,4.805875121674642,0.02652340156972466,4.1729589208748,0.8658811643374753,1.613863737609782,2.2348890537241175,1.4402200791915465,2.1405248536966335,0.6460822822898438,1.4978137233918654,4.462358262834578,2.797184979235414,3.404941646685132,0.0018484526360640352,3.6678552250650567,4.43066508247171,1.0733082952146633,1.246358999732492,2.1043346207238844,4.267465731959018,4.689190578457961,3.4186784388962286,2.245166318112065,3.303250952889538,3.654071148152207,3.8287222812734223,1.4047501254471884,3.9336545635080213,0.15776871174353224,2.2343853583858397,0.49410573192092744,4.058019365175397,0.8396463545764254,0.4657662830253151,3.537937593497471,0.3920009883232667,0.9398029265821817,4.590423973898624,4.849642164774647,0.5291868165314961,1.8532751175240825,0.7971209708458904,0.14321447124366338,3.382393978826955,1.0817206637307542,1.9413693327591053,0.061664773589177324,3.932595560634915,2.7568614187264306,4.245174278536144,1.8673579591011025,1.4217753172283187,3.6028212073477017,2.731690321782052,0.3941345673620178,2.7872800591020597,4.769930639769595,3.134898122396911,4.490430963506375,4.764394289932474,3.275127551636338,2.4823227006597035,2.1096307332901354,1.2516444577851205,1.8704463117054482,2.168584798336491,1.747356822452678,2.057541476824405,1.729677363914458,1.906702108076841,3.55368329149621,2.530384370464432,2.050248942767332,4.129068952154503,2.459245663456665,1.7249299761967873,3.630122087870805,3.4463781638520996,0.3315290826793471,3.7576523645862703,2.9863979736435775,0.5792081736979027,0.4243644282330128,2.8873245826859484,2.289353925459098,0.7815492044360217,2.4119280225569364,0.053399205871389466,0.41309550657087746,0.8965628719524132,4.3549466800688155,2.1650329785962805,1.0903632292183818,4.435793080050595,4.241061648352122,3.1449501627714316,2.0402524375872555,4.676123216992333,2.569726147832583,2.177778228872025,1.0767254503508927,1.7017364548010316,4.5222696989305184,2.6895195778358305,0.6061951537408838,4.596181582104507,2.4233332860934285,4.927156473893589,0.6644722467651232,0.7666240020473525,4.721256631786819,1.008214548779961,1.537988342794363,0.06142895276176508,3.5181423784870844,3.7156856796297144,1.4970637590353564,0.16043693420604965,0.8103848051473939,0.9802379725822796,1.303282631652174,4.211195139433126,4.211762840650585,2.6907442406495696,4.133834579813445,4.32494484070682,0.36558227079439565,1.4112893820177375,2.20009320789742,3.3476191313039627,3.1170149374624767,0.5074007670909031,0.5601825142597505,0.4461838470390045,4.381094516345916,3.228608348744565,2.954616152517059,2.982231096544287,0.6279632521914236,2.1902267560592614,1.077223069931913,1.7255517807203935,3.803167605444815,3.9833045916498024,2.101560792280827,1.1119618083843907,1.9883072878521757,0.3698726785972173,1.4526211662774746,4.49990569487168,2.4120544684050227,0.25040226011666333,4.624004325693591,2.6748284720940987,4.6540588036793595,3.9557442409380283,2.54333302219052,4.484224066443217,2.2764551832967705,0.5497671510080515,0.24849100090300058,4.050375401041892,1.8918990953273984,0.5907287560709418,3.6895042841095806,1.5848335982442074,3.4965000540587843,3.3898039693418958,2.804844876381063,0.2868489646448491,1.1564380050090728,4.577730750866419,4.202019203713341,2.8598277673481887,2.921430694855399,2.1866631196719553,2.8658221337630154,1.000218977918319,2.4293051159273418,1.4619412385437391,2.2677118541327,1.9994169783250404,0.8133644245495975,1.4517682679936006,1.59758943024081,0.21434644630730526,4.017710229352822,0.31882053514325936,2.100304568847098,3.176081569332585,2.7964797137773134,1.949578182823719,1.001499628086121,4.569040984650132,1.4968619508065661,3.127034346658327,0.9135476964049283,1.6219694726156053,2.4985613272327054,3.4633168413021886,2.4733432508533193,2.6393662923171144,0.6618553638565672,0.6166036328826308,1.2548649208844487,0.4494679235745669,3.47392244817752,4.577894813653512,3.0710819363615394,3.108521293002976,4.167881357791203,4.080099816592649,2.7465480728853855,0.26015852283230334,1.6982829200383287,0.61485981015166,1.5418818279639235,2.4678371841187308,0.516652347313532,3.1097717301894026,1.5686651464702306,4.5040339121744015,0.6876652540235184,0.2878481915761266,0.9846900898883038,2.518566706497115,0.07784998662200948,3.451057825106373,2.9656307442773864,3.795375419529574,0.015248962362930385,3.66132394586016,2.272708068560514,3.877018769799343,4.089563211752997,2.643407616476008,3.8841969946403667,1.7975694276495569,3.6529325828150094,2.082362970333956,0.6072182392366554,2.641507551596388,4.815189873020259,3.1540481165986014,3.4490603639982775,1.2462844428699926,2.2857061589519647,4.217375415223419,1.3047386195758837,1.3030768120252512,4.998235269999489,3.4298327362305194,2.3732607201919595,4.517465245540389,4.346888528331263,2.6171872290145703,4.622296185551827,2.9279098237612455,0.7870205342546255,1.7291459779662854,1.54395641105602,1.2861633575896125,3.105892736428321,4.523185637237574,1.5917201456105268,4.832850089317919,1.7002498322405135,2.0777528820086086,3.2248796781881173,0.9863048851251666,2.0560011903742605,4.502854705969178,4.6643251024667185,4.409415472840558,4.565633908373784,2.9001174448014133,2.833409132765412,1.528112544169048,3.5795438651518174,3.8827142580150174,4.950266296666117,4.998775737826514,1.0809883312136082,2.5778349007806223,1.0849801771405687,4.7286953296601535,2.645932220500132,2.401601015203095,4.378553695303749,0.3704121503125435,0.023553728623662007,1.5807421877709948,1.552883585172854,3.608477526353411,3.6111718908251724,0.18835393457744654,4.786317497976401,3.5593688126069045,4.431395709410241,2.726104481821606,0.5255936241827641,2.68661765864622,3.707804083310048,4.17863891208719,0.5191050723406987,4.942446841058654,2.0025257089637902,2.2148612331946858,1.5494385729448668,3.896540314365775,3.5308355700895033,4.917870561586437,2.639826305599758,3.78540130337623,1.546379430396272,4.228975969557629,2.079044690330666,3.5658647564216817,3.40858760823593,3.038398473562859,1.2509909037789924,1.392382603431127,2.045008879007606,4.814085626361971,4.175909708696129,3.0003682763013027,0.5059210062666775,4.279952029745414,1.6126111742615656,3.0926290758051778,0.9839014968884541,0.5769750074008073,2.3677925961865975,4.852348374593086,3.204958164166305,1.8166939535133686,4.467917603466967,3.6130939674732874],"lambda":[12.7490693422316,13.035162453790301,13.018559831038012,17.49758887329539,17.384217793540635,14.467988192424887,16.883872153307493,13.642692193640917,14.617472713141076,13.070627453467289,17.07706175360412,14.19665953119765,19.65129267114549,10.34315057068978,17.614755151630767,11.378929939673734,14.287500244480928,10.125512835875004,10.067365997445116,11.041585712242481,14.640404775966607,12.800167215053637,12.682841129190795,16.983873437581813,13.445129073334988,17.980558542315663,17.61863380507866,17.913666898877647,14.371099047769313,18.705079224198975,11.023619733683674,19.703928537942193,14.861619989037703,12.171315056527867,18.870647849206886,17.91184620888192,19.080752394911052,13.530524606293863,10.363567223021818,15.948713585404493,13.159900025598194,16.935039961632647,10.625294106843528,13.553046964313582,18.51813914734222,14.30937263607538,18.44987029861203,19.323069458063863,19.32925918422722,18.198285741929475,15.253474352368064,17.114855794733735,19.553969147338442,15.664260743898977,16.826310892571787,10.082025286102464,10.79721352702835,10.557037746351586,17.966527435915495,19.383159361218794,10.672492870442207,15.635798527551152,18.731787407558247,13.995706490041348,18.39739392735105,13.589150663361353,14.65158409033522,11.464554516447842,17.04025663788488,19.39876968071011,14.010437814286696,15.886522814303861,11.081298107503697,16.321842497979034,14.89481748263471,16.439070576188428,10.670393547891134,14.909947742686594,15.721758864445714,10.578485253128173,10.532754823612763,10.679964517523972,15.554485504490074,18.214894515909045,15.247729862462243,11.187583757736776,14.098879485769624,11.023198628055614,19.91944243856885,18.496763200698624,18.206814394103024,16.30544079907196,11.591074198579069,13.034765828748963,14.63454406919324,19.81645130129815,10.186215017521436,14.333663707122762,11.35201848488121,15.009018308968201,13.137669451331597,18.606656471341257,14.883786796990833,19.17032294667028,19.86587649476927,12.861418878050358,11.787042858526604,11.393180660229273,13.328612314325422,11.824287063311925,11.34081814897879,18.94950652517755,12.760587068687904,18.626182581674968,13.784689310059724,18.43507057760822,15.26049357468491,15.858394712433398,18.61029655586148,14.58821120338576,18.634955877908094,17.421244314945696,14.76567242569377,10.464951704327714,13.730266714174437,18.702043209890682,16.30285861749021,15.012203552510105,11.435209436386163,16.54867103248583,19.030711348056812,17.541990778229028,12.291662199512016,12.773942583449154,12.666917242215776,10.017091535390998,18.1508151993483,10.120819232674943,11.594136959290513,19.906350999888467,15.226140324549311,19.347224448171325,13.791523486218317,13.527358531061314,12.04412498438595,14.704200313984172,14.119913070515782,19.011557609321574,14.110318361205383,15.063934239093918,18.57703307653883,15.520518612672138,16.66074464521631,13.548486323940113,18.363353391596217,13.548914157920835,11.838473311318046,16.235205219790828,12.225553898999234,17.97134038907039,18.47946049862955,15.85001783310258,13.92382500733393,13.087044593694603,18.878820790828193,13.45270538472868,17.985730385984983,17.49220371387085,19.452216270797923,17.629658763270413,13.845539539476302,16.424821681154157,14.767944010265598,12.887215553185422,19.367512156517463,15.956068123840977,15.968098579090096,13.385786150178618,19.5762134733949,13.639236649597805,14.432461108651854,13.996657766872767,18.039339520023255,12.44316964974076,11.495537848458426,13.940551466926008,19.02997141456425,12.62761333808436,13.001894149601359,17.30514801174968,19.62450275068789,10.201975427337013,18.743559760496346,11.194428376005652,10.243031808259524,13.637362120044983,16.123061582109806,13.08451191636594,11.335335870189136,13.72862464602504,17.000572150882398,17.665544582065742,11.928979069128218,18.73021343176736,10.282934937783848,14.593926190084218,15.355225947230357,19.935389115570807,15.74669947205178,11.254433113553862,11.036820608622342,11.482869195482417,11.233873882161841,15.77685906896214,19.369258981972063,16.83953860102668,16.232248842703907,16.25280190781971,16.159529211745507,11.06238616274136,16.303907531199695,10.405165233632935,14.727817233275465,15.2408366160113,12.729044553132365,12.132758906777244,16.807344301347804,10.763922431878825,18.44838143429207,11.147085962311795,17.82454811771401,15.709366993001115,10.954329951709346,19.32688296508555,13.450835790308691,13.034418337846152,19.157878730790067,18.710188593714815,10.336475658400468,12.092470491906624,14.961179795432106,17.33446638390721,15.363157230196636,17.830339964551065,18.410196420617368,10.502653711542099,18.702266686417673,12.7663839799336,18.318476727499238,16.170520659314654,15.972285167921518,16.58366445520179,19.603477043945354,13.49177857225529,11.00023449847053,19.18146482579487,15.029221242385889,11.509447205440356,14.573858880552432,19.86324543881276,19.087881777931923,18.642934124314117,19.770815682926468,14.501403461697993,11.624555843275598,18.51364892949808,13.963490873654486,14.644260548392626,15.858073503645189,17.120040775705498,19.727576837599365,18.131992091211487,11.047556425394426,15.576787254276256,12.890866570466141,11.573922312879112,10.750003690686771,12.218229877827538,13.866432849502212,11.294479057418293,13.584872077926224,16.88839727167715,16.36343556176641,18.369264526244102,17.94168032452031,18.856464259628044,17.161709131879,16.246987030628738,18.947517771674377,15.899280200146642,19.106774646815175,16.061397306836007,15.98543126369654,17.12747081957264,15.374614889275461,14.391761011710777,19.479810227350853,12.219393956369395,11.516364955127123,19.70851014109953,17.539611976611944,13.890402691281349,18.168865535093587,12.540324486701618,14.868601820372172,16.520922951857813,15.893677116853794,18.84789129329741,15.485304257515294,15.296640351018967,15.731632195090883,18.4260229418193,13.748767079216089,19.065377163416187,15.049572018609435,14.581944107976936,19.519489358233816,12.987285565985838,10.456553268148127,13.280171403221804,13.194327153391844,15.699806328764147,10.735350339876259,10.14039756683,19.490968744190294,15.525858560162932,16.535883192781693,15.11703988568807,11.101289129506771,17.90001886214255,14.508383548027375,18.363944445871166,17.34777067686109,14.193492851540446,11.363381378100181,19.05638543785473,11.726445959614368,13.97030119649979,16.46969362414559,10.244874804032577,16.06332380087185,11.57855453163426,17.318840136006123,16.7091082302664,10.116118750016646,14.895191009417992,17.310957453446093,15.45171608384286,13.433264851104905,19.77228110425827,18.408456587362416,14.325573340743523,15.03901008282432,10.27327540830797,10.286214743044042,10.171708811933335,13.663588576137133,15.820390636850563,15.703562350315881,10.688608244261628,12.707598138851932,11.029593815849681,17.422501779759163,19.75692990657138,16.714273329930343,13.604125055349524,13.091270335797272,14.324973165920383,11.505569297810679,18.620328692610098,16.474398392014447,10.614228794307826,18.148522534123558,17.25509099735607,16.862580741897844,10.433984823633569,10.091422441681106,13.842272124300678,19.841958967111808,10.729056322389294,15.906919554694499,17.560399855468823,13.846289163243572,18.03925623046758,13.75055816698115,14.211822184918956,18.135383052551504,13.986778374520064,13.251723797153751,13.981534100838767,18.347656754397832,10.030464138046217,19.91660357501672,16.440937527685378,17.825326626082884,15.055624268061045,16.286592252217986,18.60182584388949,19.375032476400072,15.587205171050798,14.122902603987658,15.93050870447847,19.92558677270344,13.964642898541232,13.071152258664814,16.451637939584845,11.146009374822716,10.299984398196795,14.126956162381896,19.495992710910937,16.304390053896135,16.01591524678615,17.869037523132583,19.879081017489256,14.245824084389634,14.580814263274295,18.158835427691496,19.643778839577067,18.26913711349821,15.509434671889327,12.735373714518035,18.15039131002184,13.606486870561445,14.126168752453435,14.741435440404748,12.542104277028516,18.110555620034866,17.902839474740897,10.532375026629307,14.06539434071038,14.701366920130972,15.91368619742534,10.29682474752623,17.989993373857544,12.040899748206863,19.04566749060677,18.33309903494978,19.153101329957067,14.908091395942527,12.498575194934938,12.381760271941225,11.797889604997478,17.53905984062544,13.45670392959931,14.608966960798472,11.036767278376074,10.439907158930929,18.28330015270677,19.311352391181956,19.396210913529224,10.585224467164906,16.12194616262477,15.748990322642465,12.269991114972374,11.388937375755726,15.996484615576684,13.153639601589669,16.77828203694056,18.589818575313032,11.010735748885063,17.62451518189281,13.672155765473104,19.913439852316692,19.086973869356694,15.810644310391215,12.931057290740899,14.036552570700724,11.986636724186644,15.917155974522592,15.23711919264029,16.51926407537301,15.009049654173863,13.150447898759294,10.025121507914548,11.220444973322438,19.404252898813287,18.799470761551135,10.576265902282003,12.278841708448098,16.158430921840214,19.823336600899204,10.716471562905529,10.04667553787207,17.50095281329854,13.131608218551316,18.792190621065004,10.079697882109727,10.48194725036761,17.872130224668876,17.168232271875695,15.442637821194403,18.209724190660616,16.243103859675088,12.931432718730134,17.79837377107657,18.323694124712144,15.75059310938153,14.278015731026198,10.237731088069658,11.51994724025856,14.705345755449803,11.868657429951428,11.417076651474012,16.807322963631744,18.978824870990145,11.457841607503722,17.86286332924967,16.853110427882328,11.48712240337514,11.306023093121222,14.015556692610176,18.18938688305483,18.17401633030996,14.152259786691728,19.349133366365336,15.611973512006845,13.442744287236394,17.146991917080626,17.321403751405406,12.589603614005702,16.387675322887475,13.128601476916781,10.103438263903024,18.598167961782945,18.85658284765273,18.200949948281462,19.960490684754102,10.304721494401853,19.4298520468317,15.97196139625022,14.608913614636423,18.765894876965415,19.587382549014613,18.9197555918619,15.705836921713072,17.31677074039169,11.25382184682236,14.452557011792372,16.5326582665746,16.54135690879958,18.509537330696915,11.776270873124119,15.241531229183886,14.803018851860305,14.480664056123274,17.992369029027394,19.05101166927294,12.99832200901102,17.03363935437655,14.165277541968113,19.156448039732226,12.180454418744834,16.35132397979273,16.4148024718725,13.475626880711197,15.374572500814523,10.096460549403472,11.609583764417584,11.803137537225286,11.521160252289127,18.08955138716871,11.389852141503072,19.161171958536876,15.089596990498768,17.380521160751897,15.068844393359065,13.468555669951542,14.493456489865615,12.858368022623779,18.549865152894682,17.924874843923867,10.714082286679698,14.425042904272363,15.846836808647245,12.360184709075966,11.055572787954615,14.441348151456506,19.886937437253323,11.846194583295455,11.003059370432256,18.105150777974615,13.499126401061039,17.60688090979213,14.066186193012998,18.917773260184024,12.373398673765879,12.116539874763198,15.36963443716601,11.426697793222964,14.542919239035852,17.985274195675334,19.323882917930117,13.68756604720749,17.945267339200107,15.59166127596651,16.265114417889457,13.321417173499801,10.342344493320201,13.860456968055564,17.619495336843976,11.942360242689823,13.213791873006908,14.108082501359418,14.488253516553982,15.372383136530184,18.59962472831932,16.269774536049074,12.324963269249725,16.758436874637198,11.993964732641496,15.408751254360155,13.6746790442789,19.606628426211103,12.146974855157817,17.440651511241306,13.908102908999991,10.634139828532227,18.39453965716606,14.211391423612326,15.192475558363528,17.565860181554008,10.265750557347689,12.52972469964307,16.00832516591725,10.422321873818126,17.510420427162074,18.46424312878191,13.201311800421763,14.496224983929878,16.003941619678184,12.346828456557141,16.84362608998791,16.398223228629295,11.38227612501629,16.947394613134335,12.16818821432409,12.299838034336245,14.57104778691495,11.785115796194374,16.80642212160768,14.23664377485974,18.048965631182696,12.22125391579606,11.778665164752438,14.134404517982386,14.974337339945059,12.437443749845208,13.55419526715073,10.485510309311108,15.469533805911908,18.30751205554342,12.076645982807603,10.06019798261766,11.873683677563156,19.193458199362286,12.213728819007967,15.936623071399001,13.453660870214023,15.372849854703238,11.336547914673616,10.922935098657671,14.47202571013909,13.767217701447796,18.482291244897553,13.771872208919188,19.66885592786627,12.979257186326462,19.66390439959946,10.590531818587621,17.978086887054097,14.675399378232978,14.19093523117743,12.667899212010894,13.434988629146407,19.627370910777927,14.852558887050469,11.003036858244556,19.379857363182502,10.762567857988092,11.387654226200866,10.36244733464959,10.78680295384684,18.888010461626266,19.64910008322563,12.473577959346125,11.336042795215244,18.512406764197554,13.038472690571691,14.546644000412938,13.06562014004323,12.631095273860273,16.46195081315345,18.091298318254935,16.814415211101363,10.866270899322767,16.79579921246163,10.422954758033939,19.08130263004041,14.459679917950075,12.03027517914364,19.268081596699318,12.7926314123662,10.950811412144287,11.847021679074217,11.588725061306963,13.957062341890715,15.12884816762444,10.46272894058866,12.599181141432112,13.837617942867395,14.276092455586113,13.191480736382285,13.000329263214205,16.54013806805348,15.968364428560008,16.633865039773674,11.963598401679459,11.969135097732222,18.697141743358653,14.179366998239677,19.669008016528267,11.729331764250109,15.120168425301731,10.258543099334506,10.649921730746783,16.50843990116435,13.081957483816943,12.08485948397811,18.844394085279216,17.309762763000208,17.809392501649896,18.31056292641628,10.03853272538598,13.290191894509448,19.16864547998081,15.284928990873407,14.160340769941996,14.857898793193689,16.71406604644676,14.499859671790654,11.56267870717504,16.05916794318749,15.086435989952992,13.294422404762836,12.806600702008737,17.22688088640532,16.5867765735185,14.061279374064226,19.083409058216926,13.081842782717317,14.822087438271554,11.75449816485787,13.28946315279816,14.7735450248649,18.371734676590908,19.24919702936241,15.499583510321155,10.727874629365328,18.524423530499547,10.012580684375841,12.803603605098502,14.02095334774418,16.042258712550705,16.623305698258577,12.265744378196972,19.8976570261542,15.59713293446325,18.11119568148942,14.952193668026332,17.520631489415763,11.14231845727921,18.955366495600835,19.158425505627825,13.080679542512456,12.865908615801285,12.453121775378747,14.597731393869369,11.45579066633389,13.275997139908075,19.608498713388315,15.685953150889489,10.513845595772736,11.917009345413945,14.53819793660291,11.945897703131582,12.514638249257768,16.052247997294828,16.236920332182176,19.34058330903743,13.175390630696402,17.062995842471064,17.183717844267875,18.16308795556296,16.045072890810268,11.879964346473615,16.653151760784457,14.881499344464213,11.537681576133219,13.771458657087365,10.089539849706448,11.949257752732098,15.926645673963062,19.336804451598994,15.869974669963845,18.830927088151512,17.023982055834786,15.56012691159803,13.640936321940869,13.454770619949915,12.42237920782868,18.275956432078402,19.801434503043602,18.12504825483664,16.813582264081944,13.386186081519773,10.696929240397306,12.349432165593816,11.515532092908963,16.4316443710537,12.871384735388087,13.727762417946261,12.52077486186456,12.657040641390008,12.743358595689763,19.774268512135205,19.007887257279254,11.3459854199821,17.90373950925067,16.213490688653472,10.07869045013039,14.988719190859182,13.36956339810749,13.551205101637095,18.773319329215852,14.789800386652669,13.72899982607253,18.078634950381065,17.715894922417753,15.414442838961794,15.886079197540983,14.67385706052574,10.264891111243767,10.809804055889776,16.15735912374795,11.58433765802428,17.267755444736864,12.80991412288451,10.551840145238707,18.93742368496887,18.110274643004956,15.449538289788197,10.26414742646671,13.030832015349949,14.269292059812049,16.501418857115745,12.324325976442445,16.24637173836295,19.292901047688478,12.701433338757408,11.334788295642609,11.665474471659483,15.186593637614752,13.975205543542133,18.27358483949935,19.87509546403784,15.714679553752365,11.130542530638774,16.64972559902182,11.006277014760766,10.409722241793247,16.68854179850817,18.102588620628076,15.791157087852241,15.997408163139607,19.294706595729963,19.654307556802365,12.076220309267722,16.72003131657977,13.288370114331888,13.66870875459675,10.162236370961281,13.43324569020216,16.53717354971296,10.734726754975696,16.388732016673853,19.94113080753964,12.809869944077397,12.159942465558807,15.037612015330243,17.507620582698934,17.410507577134382,13.898917473354258,15.914905058350502,19.458164577673436,14.150203616855656,13.760552566306028,11.500443445425226,11.842729998068728,16.582878164011166,13.559948515263297,18.565879207958474,10.882999718335093,18.8115069088764,18.84116077510948,19.369518855087815,15.280517293173137,19.700571445064398,17.51150269606648,18.56740264583616,10.056006309856958,19.64857552084145,14.009801408118705,12.973425108751817,14.614801428510514,16.439339441332066,17.236705628460818,15.478739331888145,15.572738248370271,14.883217574968377,15.481694876108236,15.457204379692701,19.816701399831558,19.448928722286297,15.660033931070181,10.956712530448511,11.041903395134536,12.596967862576081,18.887156115675776,18.907041709601167,11.351370725801193,15.21387786251032,18.45688600495965,11.821242654609254,16.391643058485798,17.178636187448156,13.51819596917694,18.10948059692913,17.6342985655721,16.556028098691407,10.04514158299595,13.214833232505514,14.254062079901331,16.590689299064252,19.06823028998008,10.13280900152439,16.91091572937048,14.890356694293995,16.190349722038306,13.581367843434794,13.474226472730052,10.13949144620299,17.23434696636322,10.73975691168641,15.066247410709115,10.870048348541415,11.972517156868216,14.258568529610189,10.055817977961985,19.296058698966778,10.175509742654006,18.199202091228507,11.118411217977338,10.203029075756048,14.756395370227866,11.596826658084503,12.386685456430763,17.302570727796542,10.577554876585474,14.057687113179682,18.854180741750373,15.89391325649504,14.712333472660166,14.286602772338664,19.571694766879475,13.096380882330346,15.347842949855542,15.050966884365423,12.234198639477194,15.601207467492166,16.21265594075637,12.125612213891618,18.52977862394724,17.785338366636793,15.993774124540787,16.606982015051692,19.728439770642687,18.227378204299956,18.439405717973173,13.280873877268435,14.139525807181792,18.535395661924497,11.990714402741725,12.536246602575535,16.85667162455025,11.15010572421532,15.965702212430315,10.84178167400999,10.148204198342496,14.380388638984464,16.308529970283512]}

},{}],149:[function(require,module,exports){
module.exports={"expected":[4.92239112548224e-14,1.0,1.0,1.0,1.0,8.896705367451552e-5,1.0722207120400216e-18,0.0030909765303151564,1.622242628948867e-6,0.8962091565451266,1.991859917193336e-15,0.0004349699529511484,2.020141623368889e-5,0.38469784047224553,1.0,3.186638788296369e-16,0.8738640965063824,4.438708917845259e-19,7.63445327083428e-16,2.1489482102633992e-18,0.3479790096209309,1.0773540267486979e-22,3.2063450391792174e-16,6.17629906078677e-5,3.2192970921851808e-40,4.148671090679749e-11,2.364966582974089e-18,3.0651669018790093e-19,2.286545914693316e-8,1.0,1.0,0.8117505986618453,1.4307157914855578e-5,3.2369116307017765e-6,1.0,1.0,5.636860864197466e-30,1.0,1.0,0.0005890643766675113,6.749997494623916e-12,5.714680109585212e-9,1.982660518480505e-18,0.02683492128711326,0.05925759605730969,2.0934840887775612e-5,0.9999999999999994,0.014806179214304105,1.8504587384042187e-5,3.4730832315906803e-10,1.5018062172386074e-12,1.4288746127975976e-6,0.5245044380758003,1.0574037379953287e-5,7.046635973603565e-27,1.0,1.0,0.05871501180221986,2.0199850935146305e-9,3.6129243595152766e-7,0.9989672739086504,0.8897006084969559,1.0,1.0,2.374841098034537e-6,2.3516824673946427e-6,2.7597977016357887e-11,3.0578852147835016e-9,0.8709661924478995,0.9369235633804008,6.431277817998343e-14,1.0,3.646964678755193e-14,1.4574851917145017e-18,0.22749042562638602,1.265804626850156e-10,9.75579181448143e-18,5.3274341431373595e-9,2.054813905390073e-6,0.00022882894196187182,0.0009922661949855764,6.421333576053201e-6,1.0,4.2365623523279224e-9,5.6837112032477954e-8,3.322551282819915e-9,4.912661348110434e-14,0.34809268699598794,8.632525172667237e-14,0.00017251663470311827,3.23152096987074e-14,1.396268873578299e-16,4.802401982045932e-9,0.6951598854265726,8.141025812720589e-23,0.0008286561557559603,1.9313203313333618e-12,0.7640985636718526,0.0017429418274908983,4.959865276536701e-13,3.601097889344324e-7,1.2799292503041382e-6,4.254354957972413e-22,9.735307327853004e-11,1.0,0.9999999955394367,1.0,0.0007371638149979993,2.348072921191561e-19,6.651504279645857e-16,1.224888977584746e-5,1.0,1.0,2.288037030759603e-5,1.0,1.3724675109024561e-5,1.0,1.0,0.32917613796879513,2.9291608119803396e-5,0.8799386420289452,5.0865613286460674e-11,1.0,2.403377323180616e-6,4.134718777288202e-16,1.9115267344748357e-6,1.0,1.2331828285755288e-12,4.802852269017635e-9,0.5836557161364626,1.0,3.858110819451876e-7,1.949388982743635e-37,1.0,6.467732208007674e-12,0.025349782930277624,2.575837028767152e-9,6.532953293111246e-10,0.0002145010041706497,1.0,1.0,2.3679618590003863e-18,0.0008087636244526531,1.1481836041476663e-6,1.0,1.4907607237773917e-6,6.803744198748724e-9,0.35161274324856606,5.1789285822397995e-15,3.2382062201787904e-20,0.05008285768366929,2.024544892389503e-18,1.0,0.0001339839030724897,1.0,1.5636126731405143e-14,1.2450325473800224e-11,8.499497779506752e-7,5.876271737514151e-15,1.5294624840453043e-17,0.004373552174634831,1.0,1.0,2.8395579796171856e-16,1.831844783884936e-20,5.743325680940589e-10,1.0,1.0,1.2763528235518975e-5,1.0,1.0,0.008815601115157527,6.409226264417558e-6,0.00010320751263330865,1.0,1.0,0.0003457030316307806,0.9998167866154257,3.742842746809168e-6,1.0,0.002540839157716088,1.4207440880798996e-10,0.06562169042955834,0.999991851652841,0.9999793177422909,0.8748568351416042,1.0,2.6706529317430065e-22,1.0,1.0,1.0,0.0014662988376415915,1.0962989805963183e-9,4.901899507801241e-7,1.0,1.0,1.9559168001797685e-27,2.586152385898129e-12,1.0,1.5068836803530543e-10,0.576990112634665,1.526831338807702e-5,3.109481350047183e-8,5.481415348582754e-15,1.0,0.975141529248602,1.0,0.04032951649929803,1.0,7.308233544483404e-5,0.004103037661979565,1.544950402524602e-18,1.0,1.5220962613908897e-6,3.8618201093313095e-11,0.24915549572867524,0.9995598657747812,1.755268921618797e-19,9.028478968490663e-15,6.088658095044196e-7,6.791919250094075e-17,3.0615695214051445e-13,2.8794867222833124e-8,6.561294978436549e-12,9.29385693942603e-5,2.8389155224976704e-25,3.434034414951447e-14,0.9999999998919384,4.421255375995028e-8,1.0,1.0347785236318598e-6,1.0,4.701840277862921e-14,0.014505477884479772,0.630197274494815,0.022912322045746593,3.3926083048752424e-7,1.2156964060929983e-17,1.0,0.6087501181423822,9.993906114008304e-13,0.001836811225858656,1.1485202762243738e-7,1.0,6.748412061972555e-23,0.9999933159487799,1.1269151308176094e-6,1.0800641563542607e-5,1.0,4.789395696809775e-35,0.016800702845043793,1.0,2.8873527463269526e-6,0.0019506709944970974,1.0,0.002337025170336227,0.015280155466251815,8.622030835586598e-11,1.0,0.9999999999949888,0.00011122959953889036,2.0068430393849657e-11,0.9999998922166534,7.895268433422843e-8,0.00029785430835420877,6.914943701618183e-6,2.1215847631612296e-10,7.644701510268082e-5,3.673772418579859e-10,0.296070120842837,1.0,0.21034427055416063,6.88751945500136e-18,1.0,0.05621365948009844,0.9901294697103464,1.0,1.8931436112970904e-19,0.03859844753464933,0.00016726139324663738,9.088336952301378e-9,0.19505665811180117,0.0014524924692848214,0.28677629286635814,9.871466333550758e-12,1.0,2.6547841060037665e-6,0.0017303364923674247,1.1987337268202565e-28,0.006096787234165471,1.1252900521624512e-7,6.586541963644547e-5,6.357523528714066e-9,6.523063922006473e-6,1.0,1.6013906885463357e-15,0.49608140998682565,9.070899666867898e-7,0.2100013163236725,1.973339152036427e-33,0.3305835825696836,0.00010804513577401623,1.0,3.454222071833543e-12,1.1054633695942556e-11,0.002850765404689795,8.730090531724204e-15,1.0,3.544761618609238e-24,0.19709529970349118,7.094261603289114e-14,0.0001352375823504972,0.07221709471226097,0.9985117021208216,1.0,3.313310188567468e-5,0.25375207280466733,3.24210155133272e-8,0.9995743652674907,2.5482964747719394e-21,1.0,9.205904211542012e-9,0.9972943004560315,4.715470960317283e-8,4.518977890577422e-10,0.21165548259934927,3.923844867459993e-5,0.00013804092446093223,1.8557911862459352e-12,4.95295497744293e-14,3.8328806646413015e-9,8.955989885891598e-20,2.7643726216313227e-6,1.1749571133171568e-6,0.9999999928920521,1.0,7.409227248790279e-5,1.0,8.53802007307883e-24,0.000276909828389708,0.00029244223984673624,2.5193585329008393e-8,7.791774171149917e-11,4.961006689801454e-12,0.9999999999999694,1.0,8.015698474924457e-8,5.87358986218621e-10,1.2655825552111693e-5,6.403062857983442e-12,1.0,0.9788804846805398,1.2672387395983571e-6,2.656166548174987e-5,5.497207626219048e-9,1.0741911611389113e-17,8.289804943549631e-12,0.00040945466188817856,7.993661197892445e-8,1.0,3.0205509812479576e-27,1.0,0.0005262977964184534,0.18005081599450262,1.0,0.14125677400051878,4.4966395732174076e-13,1.0,0.2506703731149273,1.0,3.521005682556169e-5,0.01376687895233932,4.170884302888865e-7,2.687998079337598e-35,6.577714161869957e-28,3.3592020491410663e-7,0.0008926478310877093,0.9656613416044164,2.393927190038292e-9,6.332854850521118e-15,0.589510941099356,0.840216756005369,1.7588790729749383e-5,5.843684925665035e-8,2.6860251292179745e-9,0.003665431287422949,0.0009619016122816679,1.0,3.835008742664122e-23,0.0002467790099924212,9.839604474823425e-10,1.0,1.0,1.0,9.510973256323814e-7,1.217259491742529e-15,3.677463666790449e-7,0.4741566014562808,0.6317170415492888,2.0989851913174805e-24,2.108965260060623e-8,6.906958385939392e-13,0.6833534064369128,0.0003145289382210858,0.004204867344555127,9.768423859711138e-13,1.0,1.0,1.0,0.006926028183414136,0.004274422029629827,0.00044287653777790265,1.0373070247193818e-8,0.8053114098665681,1.0,5.4623962614216804e-8,1.0,3.025608943633791e-8,0.00023834718979224328,0.0071329075260903076,0.49163942397088795,3.097243328570816e-13,1.0,3.9967778093629366e-14,1.0,2.4872726624550038e-8,1.0,0.0025979044444947607,2.6540237420752616e-7,3.421645908847623e-8,8.012567719609255e-7,0.01056813867286572,1.0,0.9512530681930185,0.0006891367564942277,1.2851672143190602e-7,0.0004434378442197777,7.89996404345933e-8,3.291662214220676e-9,1.001095199411283e-9,1.0,0.043919874418085786,0.0010954826637180404,0.015884390457813532,4.0641060641720784e-19,1.0,1.728918487270869e-10,1.0,0.12769387790643555,2.44501642255994e-5,2.9904857058242376e-16,5.230597999952433e-5,1.0,9.249956807256763e-5,8.73319355096686e-5,3.659963921617994e-6,0.002197647274821606,9.86439469481056e-12,4.364570779412137e-5,0.6876250212439439,0.9994682057119432,0.009768994049451097,8.613720156329388e-17,5.365391092016019e-15,2.124827647987501e-18,1.0,1.2349715349446875e-7,0.04149099482098366,6.11392202309492e-5,5.509319761624818e-15,1.0,7.238970569600003e-9,5.2052188088868864e-5,1.2168285553308136e-8,0.0012928051414961123,0.0004905734535293148,6.516937917928638e-21,0.9993517953566686,8.462661514217293e-6,2.777044175794899e-37,1.0,4.403293770330103e-19,0.06605049607007796,8.638086773304108e-8,1.933826192661809e-6,6.2336645145616035e-9,1.0,4.020553933968984e-11,2.5814372298473084e-8,7.562716964969597e-5,1.0,1.0,7.213944795132898e-14,6.58584893371094e-6,3.4656968129549835e-6,0.00499483096872262,4.424192295621296e-23,1.0,1.0,8.410627820524725e-52,0.04763470304796992,3.0339695166679496e-10,1.8768995019440757e-9,0.9677730759860395,0.01280562483902942,1.2606779339710602e-5,7.187449718230283e-7,0.09726708030178254,1.0,0.25041377473175475,3.338905788835685e-14,6.745504250835825e-5,1.1758807726714822e-20,1.0,8.862817266234016e-8,0.0007553838839373258,8.562326467915455e-43,2.048358748677352e-8,0.0024456147797541888,1.0,1.5999552172993495e-19,8.065910119796869e-16,1.0,1.0,1.8009154610553434e-8,0.13960948654750202,1.6035503486648464e-7,3.7773955934738307e-7,4.0224038368187504e-10,1.0,1.1195933612113739e-6,1.0952031613773146e-5,3.572033893157424e-6,2.7116382612578485e-8,0.00013641810452502573,0.00016787204926718396,1.0285423139531764e-7,1.0,0.0002275903482188802,0.9999999972202803,1.8584783852954936e-12,3.360680343774603e-5,0.9035394762523522,0.9932514069570181,2.567564055728968e-12,1.1751985016717979e-23,1.5105976304883836e-15,0.9574280972158923,1.0,2.577804420921402e-20,2.6898919227980913e-5,3.8651627870724376e-9,0.0012095435445650133,4.99085787300997e-13,1.5634700895083886e-20,6.863327064522383e-34,1.297937153336525e-6,0.6132430475597948,0.9459264053228679,3.0051623316677783e-9,3.040819214191602e-39,1.0,4.775644164254989e-19,1.0,1.0,1.0,4.268954379578691e-5,4.9011371977686896e-8,0.44199809131708057,1.1341907201173309e-17,1.6962425373660962e-12,3.0513198038900028e-5,9.98908742454228e-6,7.456230387092714e-15,0.33728348244015727,1.0,0.9999907380949096,1.0,0.00019806953367953306,1.0,2.6145712848027553e-36,1.0,0.0026680786281981683,6.247658282707286e-9,9.968407305840627e-11,0.009562126977559279,4.272342649609935e-9,0.004849454434018699,0.007909012268679462,1.170465076489185e-9,1.0,4.835565096694985e-6,4.809925674181348e-9,2.663607237560765e-6,2.3012067999465345e-10,1.154894873945002e-6,1.0,0.0003238526617491186,1.0,2.002571988153472e-9,0.0016816739827982695,1.6484212025967457e-11,1.0,1.0,0.9463202683324865,1.0,8.167948528361436e-7,2.0751932663605086e-13,0.005156943148479787,9.074334399209724e-7,5.444102132573612e-9,2.9447358303378725e-10,0.0013847326188756851,1.0,0.0005476312732334877,2.7800895744081307e-9,1.0,7.700114916946441e-22,1.0,1.969233651395445e-25,1.0,1.9479880915459602e-7,1.0,5.844264531675002e-5,9.399508369994236e-5,2.9753498639436004e-5,1.792452095649838e-7,2.8541171315450174e-9,7.681363843094744e-11,0.22882481016936465,4.551344470654606e-11,1.0,1.1504486678602874e-6,0.00015181579079049084,0.0027356066017752913,1.0,1.0,1.0,3.986045890726479e-10,1.0,5.735402049575793e-14,0.9217430029166886,0.013086437758177489,0.0008434350635075866,5.36390613075027e-10,2.3486385397202554e-14,2.3199600357670773e-8,5.4524652801230215e-6,2.029709063484113e-12,6.815873956606242e-22,1.9705028751638646e-14,0.9151241426831824,0.3011169809131576,1.780605373501401e-10,7.211115019032073e-7,0.004415266408429796,0.0008456827294227588,3.6048706379492287e-12,0.19542589067825103,8.464981966373399e-13,1.5783966336615303e-12,0.8082597499662618,2.0387969190665775e-7,0.8536991342319178,0.24103231472047681,1.3410943861042903e-5,6.002422237890046e-6,1.0,3.1411245224663114e-5,1.0,0.008870992310610283,1.1297660124306535e-15,1.0,1.0,1.728570458500305e-25,9.155121188688389e-14,2.1744274991595075e-6,4.290790890238283e-6,0.005955298394069861,4.868359990502612e-7,1.0454818202213119e-10,3.3559621886090525e-9,1.0,5.500746445546512e-6,1.3235203168169884e-7,1.0,2.503184425085217e-6,5.948742604845132e-15,0.4082089016456619,2.9878661976422897e-6,7.955626702773834e-13,3.2781045424416334e-16,0.00017041814445976626,1.0759032805030946e-10,2.2157336987557194e-18,0.5820861879014415,6.507956729721499e-11,3.652317970114066e-8,1.099331756994302e-6,8.477649447066028e-6,9.750687365052367e-5,0.0017145479009361636,0.0012911669273037967,1.0,3.8768956615467346e-13,4.5633092234638064e-8,0.0011217800714848228,0.19202533359302879,2.8527512650628907e-6,3.831451024940986e-7,5.357553489085689e-15,0.011192751508719538,1.6799759540561992e-8,1.0,0.730640451676938,0.0005086234303528526,0.000283024467573687,1.0,5.495842427379921e-9,2.8762633052991394e-9,0.005852505158817876,8.618584245584097e-8,1.0,4.060719499702838e-6,1.5685730648837776e-12,0.003767524364231066,0.0006024239471282671,5.303747378742132e-7,4.008882905129902e-6,1.0,1.0,4.636962125475536e-8,1.5937597052896042e-12,0.1648449836415738,0.007404664425429834,0.0020380677593886676,0.8420665288173668,1.7383784293034137e-16,0.00012159548104568418,0.019864191604228074,1.618203346347023e-8,2.917786863838262e-23,0.33198925399497903,0.0003751457455042845,1.5746119148527699e-24,0.029340794282792487,0.020846728181239088,1.0,0.0495554336036942,1.0,4.278913002900845e-12,1.5860180330572322e-9,5.455662452219037e-21,7.597002314792322e-30,0.00038207623917488386,2.972742379731732e-7,1.0,0.9999999947860644,4.258639328190402e-15,1.256019112666526e-5,1.0,2.2850828111609302e-9,5.450772191099766e-14,1.8623253533703591e-6,0.0008847301747752356,1.0,8.558075310573446e-7,4.190413758376155e-46,9.448039261156504e-26,0.0010287403992312973,7.241168028404815e-8,5.442569464011111e-6,0.46084220705899326,4.781883155512489e-7,9.756264262601252e-17,3.0996557679558423e-6,1.9266487446684087e-8,7.678682631685184e-5,7.697333661431162e-10,1.5029189780925039e-22,0.0003139963052110175,0.03400307599172165,1.0,0.0013540367826954593,8.117829812481662e-10,1.0,1.919153755949813e-6,0.0010313833204942187,7.27054229773216e-6,2.6641997867109534e-6,3.695410711869342e-11,1.0,0.22600487048421009,0.04884186453954432,4.318137120930599e-12,4.9445372290554e-5,0.00043484683091470994,1.555412805634039e-9,0.0012766642873124733,0.9936153756697274,0.00041892382986005695,2.2120993751907386e-8,4.352204706935422e-35,5.611101339027246e-6,1.6470615346249144e-7,1.0,0.19122840272640504,5.902899593541514e-10,3.301429840311243e-10,1.0,5.17573176829838e-5,1.0,0.9300652221481629,1.0,2.7351101711387534e-21,4.871249723096853e-7,2.5698526306618076e-18,1.0526079448429163e-6,1.0,0.0012822530111765312,1.0,0.00028918558349680823,3.373957308155158e-8,2.3770284182089527e-22,1.0,8.738052866051026e-6,4.3525710615016457e-29,5.606107570639509e-6,6.34462136584868e-6,1.9027051860509134e-6,2.075481238130098e-26,0.09069977938910104,5.277375687459526e-29,1.9322337707828337e-8,4.1565993139160533e-10,4.300465112952114e-9,0.06473993374369666,1.8221081043093545e-15,0.0020009388814438106,1.3735021822262236e-6,1.0,1.1910202317685191e-7,0.17512464827464141,1.3755719340378103e-28,1.0,5.269724587664624e-5,0.0011887771377190773,0.00015393393275187986,1.0,1.4872162685882303e-8,1.7830423081316305e-12,0.01260761472183654,2.354405908658884e-11,4.2557604038550975e-9,5.2472407182557e-6,1.2010391414534167e-15,2.3351221692945996e-12,1.0664068212259538e-64,1.7129630609463662e-10,3.082613503849006e-6,0.01825097810362359,0.002856869686062559,3.243175914660533e-5,1.0,3.850069451273652e-6,0.0007392086928812425,5.230895080577832e-11,1.2438528484102234e-27,1.160980253884253e-6,0.00011750003976822472,3.91274425117243e-12,0.3899516016996695,1.0,2.0262555187052724e-5,8.007367312450549e-8,0.04947374640435098,1.0379406743006756e-12,1.0,1.473988723253369e-7,6.2500959897608166e-12,0.018944202249382387,9.221492749120052e-14,0.00015987996037911603,1.0,0.4077006890107771,0.9999999913764005,3.1213720922196375e-36,9.849950868378709e-7,1.0,2.881976471863084e-10,2.2373397406988516e-7,0.999885274573264,0.049006624681861385,0.970472651397329,0.002045538108026829,4.421545105919568e-8,1.0,0.09929155868116252,5.769320541610261e-19,2.767228315189024e-11,1.0416973671251802e-6,1.0175176581654936e-5,2.03566838133474e-5,7.537872452822344e-15,0.10578363301586619,0.9999975751247049,1.7235912484972087e-26,1.0403769056311897e-24,4.5705121068646384e-5,1.0,0.00027429532419235463,1.0,5.722552710751156e-8,3.6494785984846553e-6,1.6332023772329266e-10,3.3814091261068195e-14,0.7341105344813312,1.8414059085265165e-13,2.5135897430172978e-17,1.0,1.0136892613305389e-5,0.6807042022491323,6.478361506410911e-13,4.489305545735325e-17,2.8454713912464833e-9,1.0,4.232530892600474e-8,1.3742360837312273e-6,0.0036335009156322653,3.474202514212559e-7,0.002814358595663438,4.246611904489207e-6,0.17149486136294814,1.0,0.0024035827795849283,0.06601580842859389,0.0035110935932509187,2.0020369817937963e-5,0.99999999460485,4.406981849656706e-6,1.0,1.0,0.04224317005202823,1.0600611379555952e-11,1.6470968198066587e-9,1.0,1.3751254507307052e-6,0.039826385832381204,2.974447069776766e-8,1.0,1.2269261138124713e-16,0.00019756716678096098,6.702541577925369e-13,0.0045457682002947855,3.325791729221585e-13,1.9163011995553227e-9,1.592671677184025e-5,5.113590442060264e-11,0.05277921541703856,0.006398347954459635,0.9839749432523215,1.0,1.0,1.0,1.0,1.1074626223633486e-14,4.7173949700095163e-7,1.7480279337674338e-5,2.8512610356713995e-10,1.0,0.012765272413296759,7.221677464424226e-20,1.0,1.9470648603952405e-5,8.592155489140785e-25,4.71620878029604e-6,1.0,2.4887065685367512e-18,0.906097131043444,0.95384189666943,1.0,7.608684096549372e-11,0.0002844753880666276,1.0,0.9999998439232408,1.0,0.00011551860869430884,1.0,8.466855720410309e-15,0.000580451660877849,6.194471008648289e-13,0.0346079135618996,1.0,9.068276132400493e-13,0.0012289237531300681,6.856697277305775e-20,1.0,1.0,1.6463444806315616e-8,0.001397759408082671],"k":[12.884396055745029,14.00002224655853,17.86379902449103,17.061716017105187,14.544765642380424,16.334061010135283,13.930992721071105,10.193846447146473,13.59291153376663,15.242994710545204,11.138095691323421,13.746264785401914,14.166309585870485,14.081364437030219,15.544172266072625,15.565745979425365,12.586284790812137,18.2785546356569,18.42065051074427,11.31237319660164,15.022353988797107,16.066913745627964,17.591253982464025,10.588208202248426,18.859426025614624,14.467868148909886,11.462245371043714,19.715785490069823,16.496629859505273,17.084861455270705,19.24486924627518,13.067019193645903,15.86517190658456,17.46809927413633,14.446973796266,18.28417403179786,11.686755359044119,16.78220315626646,13.0976581608138,12.617262867482859,13.19562930189676,17.281864447289223,17.30631324404807,15.222422724807714,13.740394228526666,10.460319398234617,17.989361823258136,10.102069418169215,12.098909023692565,15.741300898551705,14.499919936481177,17.243207985519952,18.205419773141614,17.37330577674116,16.571043339271576,16.64451104559529,13.980454936615946,10.221876809299022,11.943927817853579,19.519142035200172,14.42671845745172,19.0539313978138,18.985012208247767,11.166219146789588,10.057535581379069,14.01904407467223,19.429351584422456,19.20662097369716,12.37156566630019,19.284286923196767,13.994195675747225,15.665875422880688,10.47991462296174,12.6293806769437,12.213632999635696,12.373342293806175,16.76944400345058,11.25328699776263,15.574385966363431,15.684859624320058,18.88433973726422,18.67231270055207,13.962678272398394,19.84988578390263,11.863349166474276,17.07746431193209,16.249450670319234,11.817985603468058,15.378498521319095,12.810613824807675,13.872509580185849,12.015021888308501,15.709825590171562,11.095532935790358,17.120077443284245,11.377077215648699,12.073963690400236,16.916764560191933,14.841212587127522,18.211837537617264,18.432796448683693,16.33306911645319,14.019951514683155,13.715316204470295,11.075206184710481,10.557566707707108,10.292271550181116,13.364458574739654,14.927231007366279,15.866698732170853,14.80199613782209,18.154592624181134,19.544717958264716,19.567031279130045,13.216785900038172,15.826132905364894,14.60541857619024,15.247705419918772,14.933053893268367,17.33502015540585,10.750371073883816,13.054445960849435,16.045169650371392,14.06631403657726,13.925305300597369,18.296346989425324,12.908956651242967,18.508953421839628,15.395444766782635,15.281968956007033,12.929290249049426,19.93319645186213,17.846627475733044,14.378540071129892,19.195646208467267,12.832381224646738,15.302307944247941,12.860987659955384,15.381702595448939,10.929737943188165,15.032169098450757,16.26731125642378,13.008347485995778,13.6269893430749,16.88957111065812,18.755427467671097,12.113976928519863,11.650458694123722,14.34699627299571,16.522122988239467,18.83094471836437,19.502787286027054,17.540846864330245,15.497543858686935,11.96634386042212,10.966743994736138,18.174168533030212,15.856119880690118,16.695063274013844,16.286558482022663,17.844382691010132,18.892100921875993,18.56603290998926,17.289036036162923,11.80039867735629,14.002010050459004,17.444633881324055,19.193400424403013,12.423010809069744,10.508919043139368,15.92508321211344,13.98222991754184,16.832033779792553,12.471986529884733,13.60617273611005,18.14052197406671,14.911248464261984,18.872975821154995,10.471722209436255,11.097364436422577,13.206683727185698,19.114435599722608,11.38331474263223,16.877991838088228,12.438830207026708,16.08104276800325,19.45850361124296,16.672778340336443,12.638658710720584,19.51906931247691,13.596271310214998,12.655616783516567,16.91310245943292,10.125506983009407,11.448835819218097,19.571255877928632,15.72702376352127,10.188529568900664,13.54329147915096,12.667777530724887,15.433283226833488,15.205652450192737,17.925199677052515,18.01980137704232,19.96813320771249,11.082929330120269,19.227828023417295,11.523215012486332,10.099851499358932,12.825779146450241,12.929133543344484,15.698848190540371,19.20321429295383,17.367946883115586,18.801072225717228,12.162907181502145,19.065425170120996,16.242241741607515,15.728339525354045,18.026279746570644,16.9784395161209,14.980849593803487,12.196584038127089,14.696529634021873,13.13780270855855,19.957721270291266,13.850356937950604,13.100994247436349,13.885960234394252,11.051700216782214,12.875521208670719,10.78281540860029,12.13173315562618,10.195191112606336,10.097981305482634,13.492751955270641,13.69632192974481,13.26568194666024,18.78362398479839,12.181443420886243,18.583386179732067,18.60994689544413,18.988383287576944,16.35772485688633,19.305442396543064,11.363574022742743,19.64662206856438,12.272443436494447,19.813251654972813,16.230997021038846,16.047702889825263,15.284762974260602,15.526589496184611,10.413272867145997,12.175871663673908,11.610837477389868,12.771479729678655,17.595733398346706,19.376554786046068,10.703795350515147,12.599939548383986,17.89790907205525,19.06256998068739,13.784420114069142,17.2332886834451,15.960953403260907,14.504658232755714,15.805505563226554,13.310496917196469,10.287588755241856,16.370224083644622,10.665848953462966,18.880764789377302,13.809727194722798,16.487154490138312,14.403273953315654,18.14289237258811,19.69658923719111,14.638196195220036,18.096200431397975,14.612584439055862,13.829295541113044,14.505460880658019,11.147660107430488,12.793975921226593,12.619151667990664,15.962024899737742,11.914232271931285,19.119553755787255,15.12796838513913,11.914915136946211,12.046857886572912,18.431940285009606,12.514566474497027,19.546408162862754,18.6359812301708,18.766049254397824,12.62476570454089,12.372396497075389,16.71022443408262,16.087349564931667,10.199120724232458,15.683223707285798,19.8997471383493,18.812800332610017,15.799167796714073,14.675460031797229,16.51918796930272,15.431075628436313,15.644212151101494,11.909432713314427,13.307453843033185,11.613565810499768,17.45680413276834,19.580853341918598,13.436488852924757,13.34581978508552,14.77899203184898,10.761917840058269,19.543476371054446,12.891464250496846,12.313440516314005,18.347680803221266,17.3370749723832,18.637642877193557,10.133286581411518,16.085146501111957,15.112222808899269,19.537896313602474,14.923905552263205,15.546268337377809,19.87232635400968,13.38934191207394,19.664290785696373,15.101476816692227,19.081572647059915,11.129612276878706,17.7905523080909,16.842771417286045,19.672646542468396,17.98422842371936,17.7936299009034,16.482702281321096,19.32041199622733,15.167077192829092,16.472783427814136,11.30796100994094,14.26173576947167,10.66694582153665,13.932765853615246,11.867276392664973,18.931640981594953,17.839464169179863,10.29408362917739,14.814805451154225,19.49267205508788,15.72703098295391,13.647336015327834,18.47657114733875,18.12102968595281,17.57343699331184,14.044416800880484,13.205666654538152,10.879681466799017,10.651994991960034,19.508019074695717,15.491393584566136,14.088811348371504,18.4787763126037,16.996655578705933,13.501941485374637,16.650416802101915,13.352857021448273,18.688708115118004,14.664475464413666,18.457459562357368,10.099681008907018,10.672082371844848,14.157092881614053,19.89356767960601,15.60922612275358,18.488489615660697,11.396250523352878,14.36973511159627,16.432198247555174,13.592414188548773,10.648125693731807,17.194812324054766,16.806886087911163,13.685189871416464,13.413579363469356,16.2631870358784,17.084261157473378,11.97153846995233,14.39573972653687,19.81654085377268,13.058029573920624,14.199264708694448,11.652751856338025,16.632305206888947,14.42187630592785,16.676502301691187,10.207656947540524,12.945185077019454,10.03067864427932,17.08324750680493,12.758413696727235,19.46186938000879,16.65357248932608,11.65142761005174,13.853715483077902,13.8846765580134,15.800774050648482,13.416611688730507,15.675972336948698,17.678705770440764,14.081132676430709,17.764265847328065,17.33659667780891,10.110133686776683,16.51285927015966,17.103986547755476,15.984370315208768,12.120618654514644,19.14533548249255,19.562967909080488,10.4313736617837,19.466914871424805,15.645637665460125,10.942903107870563,13.120581156208324,12.070848129984642,19.57532604152494,16.764283138543007,14.90045640183328,18.685553202913127,15.309724502297213,10.393860114225387,12.069095140265881,19.527050132691638,11.08580949119565,10.193561691639125,12.084449246185319,10.769384174296405,16.069060851376186,18.80652682868383,18.038279698643542,15.94879161938655,10.317354622440632,12.318487392840812,15.317848823285345,12.831110203656234,18.71905366310806,11.1389778196584,11.641618365565101,16.45145663557118,16.03471956202148,17.522932818931487,14.580372601274815,10.17676299365354,19.589970130291775,16.376413762371698,18.98929941858998,17.38607993646746,11.988447537670627,14.929047154850396,14.411754981245526,10.25458568262829,13.950180098724893,15.215666005596656,14.464348164822312,11.837196782587965,12.328110050288824,14.323578626394093,17.024017145440894,14.116003707407838,17.437958337518698,13.002469718752154,16.713770027800606,19.333958350634624,10.012537557068203,16.401756063680715,10.38983451164927,19.11208886730287,14.013066173773472,14.741564418640207,11.744196857611511,15.683725776647046,15.865406818160398,18.65578376458395,16.265711528489913,14.413983498207607,11.65365907111089,10.82030051259788,15.016171496644063,14.937044199385168,16.94818355129411,16.003399061788574,16.373527339362234,15.011177415295586,10.297365924836924,15.103318996196169,10.294279685543835,13.549466470648007,10.687475262641367,13.068261934809671,18.320620251829155,18.5649195373976,13.115978311255592,14.473924246378889,14.776093852682271,10.587925149960196,14.81796825747163,14.104934004757174,19.35552661481043,13.299698670425034,18.67594809715935,13.310177895028783,16.39557611096,15.81535244138376,14.978502170047223,19.127663828557917,16.09937198008306,18.743036687786397,18.28625288441968,12.149970414361992,19.13229798401985,14.933409174985988,18.010217631090377,19.85061458767731,19.110247529758546,13.369762121924103,16.86398303812033,17.320450793342737,12.197631145083932,17.594654499476682,19.396343278108688,10.863146620838332,14.10215855715068,18.68108895052289,15.42505900376758,18.407879925853557,12.97511887729974,14.95157063278106,12.419467817527698,17.113100740696616,12.331871593118928,11.285370506073713,16.38059115869217,18.160211335760557,12.236200520352243,14.459593036172034,11.469863526871944,18.819756711395925,15.046399081940505,15.824530360450522,13.505307689211998,12.19945537163115,16.17164823919002,11.193262355980323,18.483048551373948,16.28949922839591,15.89673128175342,16.96992111472,12.6861502162812,19.873307581278432,15.623271515501047,13.52027019718632,13.169235913655902,19.52433902823757,16.612867920776246,15.521326641245185,15.524679995872134,11.90647978718802,14.379588845996373,13.367607262340655,14.646105255171186,17.892399503202192,11.613304770681781,14.189760086372218,16.82309226937263,16.946887364158606,15.25060026217208,19.90594816894517,10.39797597722462,11.89305505275618,14.664601926479266,16.946772282838328,16.0722347028911,15.85417048401974,11.56476022803734,13.948312136353282,10.49286016906498,16.10740704031361,17.328072129595853,14.055948272634753,11.005635307691595,14.486950164386121,10.768773944759067,10.3622231410064,10.66734469258019,14.667699481499293,12.445784801110463,10.18564526598416,11.387397338272304,14.387907845864543,15.230518317252493,10.449889133020871,17.62081523140821,11.295403629452236,17.210724547155994,19.277636619793434,10.185448396257254,12.888842903032192,17.15396592864822,13.435391718557623,15.112349581754586,11.396240167010845,10.397306057884485,19.283116661139758,15.733358157876804,11.333232226256651,16.258127116204626,14.985791252242404,16.169701365344316,15.686727059376475,17.51274468956134,14.162027035391313,12.579920933004585,14.880298220464512,17.739823527469603,12.586266431518405,17.344717321608957,15.817893316119605,14.989841050259823,12.277716212735843,19.844492326002452,11.849406844440741,18.59956032525776,16.235704422566904,15.512930499062046,16.287516362362847,10.849166030472643,11.531622321757208,16.892648995311994,18.954506280877858,16.708266517683896,14.550083685008104,13.789157460420181,17.403963051147485,17.300307528692628,19.901870559928295,15.669154564291137,16.256964219049838,17.775838431580162,13.797573646788774,17.43388529529387,11.217966903993005,10.698458925707177,12.381256899026418,18.055968381607663,19.436852011869306,16.923752889303195,19.161646157455046,12.067236712373731,16.25442608197187,11.590312439777604,12.800099805566571,13.38134478711536,18.24663391495588,13.174991499917365,14.640768488272354,12.19790485933596,14.97809881407855,17.741023436763335,13.31330102823387,13.439370291569741,19.59045917538654,12.394837744930179,16.183186621271055,14.41652008279169,18.15511930209709,13.283320199529838,18.390645407955944,17.52884957488009,12.64712377060096,17.865009598847813,19.58216110022637,16.37471477360014,15.496189741658768,12.504432930821777,17.752983380822585,11.401900024531717,15.441202457541136,10.76796988948942,15.976083872684775,18.415190556859862,18.342725305721906,18.808479769176984,18.023832328406414,10.914082298701533,11.104493640810613,13.136630060560318,15.093220023002127,12.96222220248911,19.431189850143816,12.83389003646261,14.512124781182294,13.25250179926776,12.788247563720013,13.57562002160676,10.638953758388489,11.271745769689055,12.40097467736599,10.198934151609567,16.240320891518948,12.409201168732471,18.138659590432848,17.921391692890232,15.614950213586543,16.287385503226655,11.84751129541529,12.043189515868978,15.190091315763583,14.364108713679952,10.437169916863445,16.109030017445022,15.278230506907562,10.130641417554173,16.988438097250608,15.831980383729228,13.827853214413908,10.012736962747868,12.63601161674461,14.411026163006074,10.362194905915128,17.606980752880204,19.58160157850767,16.572614461137665,12.93070897882794,18.56243217376869,17.974124366987603,18.78951939831122,11.194527766501421,17.00897376061988,16.13117624575143,15.268129441017248,12.175314238760643,17.394446564541013,17.944729578026248,17.98228791654091,14.338168563465851,19.65161733028524,12.424481315716163,13.479929338130086,18.527773593552222,18.817798289341006,15.152331017373795,15.08673877065531,19.121023605130283,19.06262758614869,18.07489416768884,14.421479138175338,18.579835011132523,16.810275133740944,19.484662075165637,12.815145353630143,13.753042863269116,19.95397473168103,11.218372489379282,18.928133104997045,12.04997018078189,16.095133625506495,17.792353149810594,14.827235628746052,12.829584580240516,12.597060352532242,11.313447649860766,19.484789661028692,19.773317844060728,15.14780385931466,14.533839373117347,11.699752065999105,17.949262070736314,13.499466417260308,10.026988509962269,13.142729887362815,17.649900208804414,13.406785235970247,17.697702694164732,14.002416316995777,16.368574946075547,15.562645710567516,10.993967759630628,10.56533005308188,11.572396703246973,10.664090738279889,13.005504353433999,14.289874249620485,14.805120418212665,15.657360003285426,18.310117084583847,19.043418788967625,14.355530920546396,16.33825851002854,19.25460630655817,10.509847360190305,10.490422247041371,16.024171806536433,19.480242338828,10.841355804300843,10.92859534982761,18.20174024270554,15.494982686565749,13.653932122055517,11.900890211760018,13.19548326307068,10.849078563482761,18.71720500402479,10.516078603867058,19.796902799687725,11.425371334603579,11.390165269168977,14.604732562063552,19.325801268675097,12.29714984455423,19.247647066422566,18.15989238654402,13.682729352411231,17.38858124857391,15.232583293013862,10.544143109860437,11.19547213516423,14.956609058134713,11.343941648476722,10.174020807125801,14.796596648052436,19.198122464961365,11.04958739213275,19.18705580801018,12.652328420141322,11.360839581944333,19.259940852090867,19.86967063208173,15.252319718718365,12.356036011262443,14.769552005288837,11.926082408599797,13.4175957646541,14.875396659960893,16.472170463294013,18.47513555687568,17.76768976176391,17.406359340737694,15.705899875155861,18.149461804490137,19.93205983751963,19.3165826279108,13.216338555546512,10.92738154233077,18.92235109389345,15.648789328266812,19.00568048001585,15.009410098875955,12.101768170879996,14.730525275277026,18.23972922827069,18.903141414168765,13.998215163097,17.050739156615673,14.681180291342553,11.25509225561588,14.95507457883863,10.036626627559054,15.723862325628165,11.23238615076222,12.90906107322352,19.25040409223245,13.494657084953996,18.679054374594184,15.88868631765493,11.387968865552892,13.950571413372657,13.351870774597142,16.500745819057673,15.786743959270783,12.171492626612368,15.571694256311375,12.11795087675325,14.782347365168933,14.237922014506859,10.567175951869256,12.247068201069126,16.594140797467944,13.846407395089017,13.458473490073539,10.809552972944662,16.321239948936494,18.35927530674555,10.757615701116837,11.414846580801825,19.520972762552482,13.05395267541295,14.074051132543525,10.258541971424737,12.522935499888286,19.94280805953685,10.210483939409997,18.069844001663455,19.37536311309283,13.772484555624478,11.834613940282118,12.178951935909858,17.801529796569817,11.980795619686466,16.612775485876703,14.476143051890233,10.215345528296261,12.270094883253162,10.004257441904416,15.166275530036312,12.028398806407353,15.463241691755442,19.535941992179676,15.05079781400253,14.65441763977653,14.38312034943533,11.775203748410046,17.075510096843523,19.39877347513949,12.983208997196305,15.575620925931943,14.965361304377002,18.29117169950795,19.2088895776935,10.003741887657593,15.592712462182718,16.373932602327415,17.909075662272308,16.542038931738148,10.77875436041385,19.64559318212277,15.280170649849985,18.69411953141659,16.78398078782918,13.853596599000976,11.516075258971725,16.831069713211768,11.64762798412296,16.315446082911766,12.23076202042156,16.577072646670672,19.047841457422344,10.081925801019567,19.498873982605947,16.900790733690695,14.369127430427273,11.382438027198402,10.74872929479238,11.43466378433766,19.514557597457518,14.35683226605909,12.065941715344406,17.93186010467827,15.088017598373558,18.487982073269713,19.873441648559464,10.597606719949402,19.336868426548435,19.40888191396408,12.210462115448099,17.042383805687535,19.025362111074188,15.698846738276169,18.96773923443662,19.96765138960201,17.80059405342031,13.29021991800583,14.180838305106478,12.86475680347733,13.5464459720178,18.246489209150624,13.243397711251001,16.806435820948963,10.04379458806217,16.41225843884375,17.238340785160077,10.38398415262883,12.137204546195866,14.544488996932355,12.922361906669895,13.093617033439473,13.605510526447732,11.783072198719909,10.446681062494552,15.204936105433893,13.955925071354754,16.764300988481008,19.23157137053005,18.815154270220354],"x":[0.7309926147936363,4.534064670742063,4.91235790327027,2.39437111090413,2.451844091209723,3.3726194431194267,0.41629764836574656,4.8142646392979085,3.547567621003529,4.449856362462949,0.38228360017477425,2.696144979377925,1.7881515953979343,2.089797294871838,4.676226062360923,0.18144642394883448,1.5155776396525167,0.8480505302017294,0.6579494762938898,0.17967294411716517,3.883340111127068,0.21581287931297544,1.1059055861253198,3.8583440072578634,0.0598445860089547,0.7432086618541378,0.13739179412884606,0.6300166206682078,1.2402787186325903,4.539635565511903,4.421410350907367,4.414650890776262,4.501237586499828,3.3527112704249173,4.019499935848854,4.29149887696396,0.013511597192301661,4.928463193484124,2.045241701321169,3.002779504003165,0.22984619987774235,2.2005971636792045,0.6561473129062179,1.6058099129235304,3.174380010815735,3.1044652624281976,2.27863946168973,1.0795044213171856,2.8910293294676914,1.6581519938405809,1.5135525959644658,1.237913366945631,3.499282734968956,0.9772233061498903,0.20627328452801685,4.7433705158612325,1.4791427994177186,3.767327707261984,1.691943276103225,4.089146522886892,4.589889395468063,3.2038766132918384,3.8695505812356537,2.752335768806593,1.5384823731200503,3.5267794490944526,2.589072489933335,3.1833785944650006,4.350388221353976,3.8295977299552773,0.9752740591612963,4.017238135338728,0.36819148667970647,0.36341153037586116,3.6026020943024815,1.3651565540633015,0.7466491436480527,0.4117940764210337,3.136132333365885,4.843761840896298,2.2332111466148596,4.9650945133619935,4.694960770920165,2.3679677573334077,1.3234621083353215,2.8590346525723076,1.364079483773536,3.0983848674249534,0.7662947527599273,1.049204122346119,0.7477281521890922,0.1943981184035415,2.6129732687584752,4.459274038108366,0.19743293998047973,3.5187259563384963,0.6942291332134987,3.218919261733814,4.274557779390392,0.5770544295446323,2.228275172838777,4.343738651351149,0.1655799435196037,1.720415939571488,4.139567656569706,2.4417245927693942,2.9543168480316115,2.5528588392493945,0.48152805376082686,0.8683557207606052,4.471562536921389,0.3306038082407081,3.812778949927793,3.0701275606787446,4.733627541357367,2.855447963786265,4.442670742904859,2.249937648451744,1.9024382301681098,2.143053088221576,1.1870487924808393,0.8251747448631108,2.840078406603197,3.1883047382247454,0.377947617561073,3.3281731538029935,3.5186938605738804,1.7765440430021218,1.889509787609589,3.5669032839873447,4.282898912201878,4.519131827856259,0.04086526823028902,4.148255234539045,1.140084551808882,3.6382846766193278,2.0994882230038723,0.8159875508248837,4.737931553953404,2.6689955248077277,2.7548400665414166,0.8120180071741601,3.6846120794884873,3.1007268782632313,2.506694682880238,2.746169328136613,1.8080381481916818,3.40214067535372,0.6952282124730014,0.4990583181863073,4.232619576558224,0.4756886031260621,3.5874582250021914,4.38419094171938,3.1366321054202473,0.3653318749853651,1.883613726794724,2.9761122136956173,1.08168812726951,0.3940588924859967,1.0076081785199742,4.725177933165437,1.9738424648255226,0.8464746047578742,0.17910348459571623,1.9442536918059017,2.515843093695851,4.67340383194237,3.4373215527052823,3.1051137066168466,3.8852715882472277,4.465955805673709,1.721578896690209,2.0089820583443196,2.492665674587804,2.6657593413366576,4.3018519894186555,3.834074822648046,2.8326300508047697,1.2324201925010814,4.588219667860297,0.4430554360499639,4.83353798893196,3.4061234290765077,3.6053891129865057,4.128616047254657,2.4435624152482047,0.1207217510458991,3.0060157822871982,4.391837432520917,2.664961866918445,3.369685514248797,2.944252999852248,1.784932052925976,3.2456987343284704,4.848004699379109,0.19412931043492176,0.51632303657691,2.775637211797335,0.8646868885894476,4.208186089242464,4.729625826666222,0.8217421917222367,1.4612217632348434,4.748794863666993,4.987790131271538,4.41196514479982,1.9888618434573202,1.0904932605567974,4.242057283950875,4.0099559826650255,0.47332972239511606,2.527906878836653,3.5854889972268644,2.6186619118766172,4.517324531220285,4.529782022373968,0.35984280052167583,0.9386109442792423,4.509762375978456,0.7628700050404524,1.3901543798202964,2.3138767438966723,1.579649280074925,1.9797212831050581,0.255251824856213,0.8041332488084585,2.3870854221190063,2.9079413974999815,2.4347917574859954,3.04698642148594,3.0687779923610012,0.553982654899744,2.942655474471918,1.1947006722050202,4.775976831678735,1.1325701567470492,0.4512893618322522,4.474953186666964,3.0584270221595644,1.60823358855807,2.8693839769648797,3.6558996873008165,4.448277957862501,0.5069395911962149,4.816382171814323,3.2164395446295533,2.186040398872219,4.323640720789802,0.06501285129572265,4.064074471207758,0.8039474497869525,3.088335100552717,4.6994276891191635,3.417222907123081,4.849217551714698,4.480811404234427,1.8971311415933545,1.5346005615382419,3.6559407064509886,3.238525751533079,1.7810173301430698,1.0334779009681183,2.2373224391365474,3.115730834598863,3.8650319704094107,1.2566903273669539,2.81176259739412,1.4753985989799767,0.9709845778909865,2.6574306383938517,4.665793738734991,0.568202978582476,3.2644505274551827,4.026818825016703,4.458563101886247,2.20833339428389,1.0567031447443653,4.58787670792014,2.7892414554190195,1.8985509623935082,1.2924077981541604,3.809664166038517,4.808874377414828,0.9368376993727745,4.703224459724394,3.8356878169829747,4.33302987782088,0.11034564448001771,2.4663005070962027,2.099468818328787,1.9329714233704098,3.2653947674688655,0.4048668309411363,3.8970399713485415,1.0877975096596881,3.1729937711805234,2.8404202282704483,3.577625624294206,0.07420500336154712,1.377656418379044,3.7569929869075747,3.925454041631693,2.2245864925926098,2.4361680957966714,2.564940419756275,0.31774863664482567,3.2618634778801434,0.22011705947878712,2.017865337208616,0.16023533323576755,4.165349446572949,4.843824076751691,4.9861339475987645,3.4521870052684567,3.180544897375234,3.5797211706213017,1.941611694522014,3.587766574061636,0.27372657111821463,0.7738107677845873,1.2927204167677042,3.8988631379030627,1.016774950657079,1.8427993332413983,4.7701723533463,1.2509921732643825,1.8625620730616754,1.5294781191599949,0.13528623297178077,2.386223955964865,0.8503283590050914,3.381994677704543,2.3141187655405124,4.980865065308533,2.0446856116533496,2.7964135405608435,1.8749148177656816,0.22510887827792536,4.061779106101632,3.9458446795853277,3.603686528307647,1.458141872895674,2.238285222965138,4.998119550530877,4.241563439234481,0.46201083454855074,1.4792151002868725,2.029987213793958,1.0340396530808982,2.6513107106554576,3.785189814786427,3.831357144075179,3.09329874795142,2.472370622161998,1.0279148689322803,1.4869220301092478,3.8731093573686226,3.0578686276778355,2.2889826865602014,0.21683025728874594,3.0259354089805,4.08580800123492,3.17471241776527,3.277978864913176,4.281824246147372,1.0012107378648716,4.1561234828525615,2.8233518400086712,4.1515559902260435,4.188270184938321,2.059813257213193,2.782460170568386,0.0791516305712614,0.11635284793804157,1.802216677936348,1.9945667260035504,4.603819277528677,0.8056780433285138,1.899418499763581,3.5163957083312667,4.983397667947007,2.6647732154654946,0.725725946097594,1.4901981470729775,2.9948966331701676,2.7047318609626227,2.6794259216523586,0.4429610436592446,2.4781104684238753,1.6366149157025545,3.7220399578110532,3.5145451096244185,1.8495352300051204,3.3583566962205547,1.308380091754614,3.201265958324221,3.3984578458565906,1.8761440450481748,0.32117279646786234,0.7136735630491942,0.7185169002752134,4.780560558424285,4.4392572236696815,2.146411223575704,1.7978884657274319,4.989602580912561,2.514626559742421,3.2796331775962217,2.854694623762266,1.0673063545621564,2.37794500802102,2.1774681493866477,3.79610985322969,2.706037456217726,3.1443488954512953,3.147725437898743,2.0897771641969145,4.494372018789575,2.2079694474786016,3.128545154236051,1.7266785452172095,2.9485294438829124,0.28615424065239203,4.977169501249264,3.813884008103321,4.2638740848134615,2.3732942963678494,3.405464643129814,0.8847096288447232,3.1529751446290044,3.4789304543788413,1.8556813711149311,3.7672629185946094,3.5226560534838303,3.3790586590334892,0.3309112345746945,1.9040481667140963,1.3605071526436152,1.1245672648657024,3.170455810821652,4.988616047768311,0.8308297563502409,3.908721976334595,0.5454282120875042,1.3291242021460614,1.9529074831527649,2.957241605564511,4.755833417448475,3.6381371136910934,0.8584063996053759,2.265271030109237,2.72071637519936,4.107373399061075,1.141201199929347,3.4196237961715137,3.4856821364179913,2.2099108392486,4.836300801708319,4.292299362257489,2.295477231066175,4.2082301478360336,1.320030159020571,0.835672414739812,0.2303419972239551,3.4146896370057425,3.165924040544427,2.598817096435393,1.2211172070836718,0.7894887919057292,3.101350814173162,1.4513982422920968,4.33261121553429,1.7443801141380344,1.9161654597717037,4.740048798685973,0.6638706939993377,4.616219756463371,2.4737532770014523,0.12549784784039564,4.0411443226665575,0.48250630245307513,3.110382148339598,0.5149928141746152,2.193462936501822,1.5699386869237608,2.2690421643262972,2.048599873893917,2.705974122056347,4.367889467270615,4.839562993922671,3.294508406886083,0.3896780129073174,1.932681216715183,3.8399805523606254,2.865194342623619,0.163421149242865,1.7263226403829979,4.025000928441317,0.0029453065922191435,2.4199897610276775,0.9592150124792043,0.7660496761199798,4.2902053898577375,3.5117742472507696,2.2664903135067926,4.153097676093943,3.058782130364351,0.7349884751729974,4.5564940547028705,1.0153992704759274,2.394646205195188,0.32036606930729294,2.8934467020547174,2.8564615161015494,4.715729686795815,0.04921771310765988,2.067321870099803,3.13325790643339,3.464131020227451,0.42916099894018234,0.9628240379537467,4.926421748655642,0.987956102875801,3.4547617084349747,4.90661270931695,3.1416662638806003,2.4461517486019213,0.9277960408619379,1.8587907243734658,4.766334967339988,0.5959858095639459,3.13849504083596,1.9602325534671194,2.6051924610993016,2.87496185141641,4.092829572104843,3.74846471190434,0.2976379932726325,3.2275467019111383,1.5571230815480552,4.483793569545514,4.200178310858639,3.3449952203361253,1.1561740495361617,0.36611608723532196,0.5483878188323055,3.563810631046449,4.780125704476155,0.2647063231146629,1.8642645855013207,2.1348066551058222,2.9899050670501537,1.917496363894463,0.2701160057910412,0.04849557393398207,2.567351054623633,3.9115848593465055,2.4841670563548393,1.6371386323842718,0.05761942064104075,2.242792380234121,0.4637896426919086,4.5592356912704854,3.5245072867049485,3.440095621472982,4.642379853293709,2.7902951358117756,4.657732143669398,0.42312561571197227,1.3361006778398465,4.718496496970042,4.083875317557987,0.41596955193113017,3.2937866066051957,1.7050294054223747,4.240829425560967,4.286743112062446,3.9392459047545128,3.536841074362819,0.07112357060955143,3.5560432571706935,4.887235007559245,3.6564347705899003,0.8198197847709177,2.9944291277710056,2.3363967571954514,4.472474793401078,3.8631730213197466,2.324140444526841,2.7645758767887454,4.05426470699656,1.4287122617524672,3.9677701361608086,2.2545948597872045,1.0352063289952018,3.9123168997771254,4.341402726952628,4.486060898322021,1.1163262006231867,1.723453755308384,1.455835806240604,4.903063682264569,4.150944923088402,2.458893460021423,3.7995909137672044,1.0238134150282896,0.4769593948759221,4.959623409429348,1.409824449774466,2.0141689192305687,2.821846370121528,3.9604415156930606,1.671992201058221,3.8185486334361487,2.0196433178576747,2.7455158774186783,0.0903220989825082,1.4975508572014373,0.09589575208272416,4.554568649989186,2.4307001997548405,1.64042486318686,4.359265718006372,3.8345436978189165,3.5736096682025833,1.6264630864718266,1.6605757470108562,0.853171753672638,3.3047685341242294,2.228541326877771,4.352002970851439,1.4482420762915116,3.0575527268541682,1.8096114395972962,4.915739445542487,4.679122064000123,0.3956957874323874,1.809031974100842,4.529563841716588,0.551007916478673,1.3228659099991136,2.3811048014410763,3.7085753043393135,2.605077988731539,0.2826174917927271,0.3695208664231153,4.302255195684401,1.2375387952214056,0.32538657922978276,0.28695338303233675,4.865614187198851,3.7549541480008752,0.473588663072565,4.249593439902651,4.80054075811513,3.1938570866774505,0.38922924732803343,1.7395372781738827,0.7214436766749643,2.1199327975548474,4.853565518899487,0.4019630628302828,4.64223586197206,1.2520596644472293,4.16752160623574,3.4867089806873883,4.462925720293582,3.2564672810145168,3.716474919868613,1.309455201138492,0.7332333258139245,4.939305280420893,1.792332900584157,0.08123816730459477,1.0270235290892704,1.104844521555698,4.79607837409443,3.490847057603853,2.2139142160921867,1.8389888842452051,1.273741041207569,4.644113868817621,3.1687164388129974,0.7743070178174871,3.7415442575251756,4.807305582591249,1.8448136637382673,3.2966911746968677,4.057849115035368,0.0415619485187424,1.3071016194391971,2.4219009840691585,1.9834277192688354,0.18286338543212377,4.094806557062132,0.5234876274309841,3.8193815163989333,4.464845439523023,3.1556275172944304,3.744006492337646,3.37001373562285,4.555623349652898,3.606036564039603,0.8690321660607891,2.851394801023446,3.0294251985839282,4.605886058043738,3.652496652795565,0.36904993415858733,0.7115889697424593,3.528824116144974,1.9079100580407216,4.847290477761398,0.9531717248455296,4.045068443508119,3.5719426781143238,4.24821719373991,3.3824970125383382,0.5716653250273451,2.7806358990537694,2.211655950946273,4.491176248769827,3.804147247974087,1.5010442157506232,4.591071704280108,4.067962918330793,3.8334928719492076,0.6588237899854266,3.8288954274833498,2.7726849800816886,2.703529343715003,0.32443019185489086,4.021628920772629,3.3959772067159855,2.875159956192838,3.8606845078226417,1.0357058248807338,1.8957454991842049,2.614870537134112,1.930803461095233,0.2525161908432616,3.0184246052757056,4.490004906394375,0.38853712934037055,2.4800772491486778,3.435240784953529,3.930043773654861,3.6140266728469927,3.4471702568365226,1.4917354374856195,0.16505242563242706,0.8191672934452654,0.045075196413552066,3.9899981429284006,3.538220582133784,2.962361964181357,4.592007717902751,0.73229709201866,3.634770659143356,4.734108702640488,2.2501234988652827,1.0064379342921248,4.669338936831654,2.668299407175123,3.2106616443410454,0.6095835758882162,0.0011566491530334844,0.33335515361951784,4.056928243058118,3.427876668450762,3.162285695564729,1.2351697005880347,1.7526403973301474,0.6826587553449359,3.154523943257601,2.0408119933805438,3.7043188343068945,3.395241996762616,0.6001873844640415,4.949791921426586,0.6588835366535706,2.3061824435199596,3.435205287769454,1.3115768469863054,3.34094792104626,0.8182357952344199,4.798546350648422,3.927067498282344,4.553851687305363,1.163498091331473,3.591197073504354,3.239728769837078,0.8726119068484472,0.7161708473459782,3.4222155732519255,2.393088804218675,2.093127221649037,3.4909404845653014,4.711488283601658,2.3940931930488407,2.5322016011385626,0.04100471816355533,0.909446103425614,2.9069063816951513,4.960494738406126,4.9023737567046375,0.863116511713049,0.8160734711586037,4.880730410561781,3.098194632114213,2.980839214344667,1.9796524471533516,3.587371268285983,0.15146895794471038,2.943625704983236,0.3147311816122178,1.716888239181421,2.5889496290501333,3.513382229762878,2.1412075803567876,2.007426532948565,1.8873574033140839,0.300450542445283,0.33702809732051975,2.9206735618743,0.3150989912630764,2.692745412220617,2.910843280222828,3.89049553882304,0.16700048716433824,1.608996140135045,0.025968963073192963,1.9977572798097565,0.30997364877721645,0.9426801504782334,3.9927198691243637,0.9073268187752392,4.653438403095002,4.001124395721508,1.6534688394955144,1.6195378747295197,4.708880627515394,0.34459301068931136,2.3008897354989175,0.6823442695023663,4.879329882864372,4.286586685900199,3.8583626000994666,2.479419794356156,0.49916329762464184,4.668639170987489,1.7516544006237589,2.9560988857597117,3.01878907691032,1.4977132023699757,1.4318404347860847,0.0032980259289006053,0.4696662788387618,1.7823127270880013,4.972578382259416,4.713356082838851,4.345684958820607,4.529730001246207,0.3950471900755004,3.718416580210114,0.42637210415302773,0.3570637049055436,3.1817648422360656,3.892502319400797,0.9148221627458908,1.969215174076825,4.909243487825455,3.3057507860934523,2.86689879952297,0.9550985267712775,0.66313959814299,4.460517067391759,3.035653142038969,2.0539340564593376,3.6338894281743372,0.41189216668577444,3.253263035271358,2.0258875683844613,4.976359490322293,4.809898122405679,0.008678201881302527,2.868407758452216,4.739393176219627,1.7216048392619343,3.006704853533847,1.4936445074830418,1.371785002745427,2.500178603426529,1.2904180301309054,2.6794375744503416,2.578843887941036,1.54291054102476,0.4067451586719639,0.49221902299342646,2.263019381515854,0.8504728889951363,3.1269870476268515,0.8524602618567512,2.5918366284047343,4.893644538032151,0.4584946244328225,0.027502452453505022,2.821327653652135,4.377115099539692,4.9502483083367474,1.7424017187706031,1.541830916363125,3.518714626766708,1.1071895129496168,0.7614330977391015,3.5103803956652344,0.5296956123431618,0.3213844408140998,4.757265657775612,2.177834456301402,0.8722688900203601,0.8339445524506817,0.7547771558085359,2.5467345681880715,2.3610937831032883,2.780983244165286,2.6030983958071054,4.352556895690636,4.621138431186138,4.207920621985878,2.0626114265407125,4.572865232914553,3.7283007057101525,4.4979824933961785,1.9939214414383932,2.1270224298040716,3.081823385213239,4.892712724775886,4.739774219436775,2.3970104995788066,4.761547501218988,2.963376812669903,1.99436862997745,1.7010568422728856,3.900544917511776,0.44867035721627757,4.950411374485877,2.0642325737148526,4.87087429072672,0.42004513440945246,0.9548270868817377,2.0560826108240393,4.217183499521074,1.6913140294174156,2.1139950119648434,0.4816419260070204,1.1870003534167495,2.456924095726788,1.7066189726585723,1.2507620609016068,3.8654777019028943,3.5334348528466695,1.0914651367587869,1.32088412949099,1.73375383693112,2.1769184718681633,2.8664481036441005,2.797907274722524,2.0025719926290044,3.6553986198069532,0.526710504371124,3.55000729833114,4.463635967037616,0.32980695363796775,3.979511924425686,4.538836845710086,0.4692406337158084,2.522208582113239,4.398805057228979,4.862834430385147,1.3719994662872959,1.9840101363527118,2.966612699271254,3.6810228777866816,2.804461120529523,0.1426393736836995,3.6497728152064868,0.6120710490520809,2.8536006805413026,0.6480551818343872,4.98726106625384,3.1958884654554023,0.4496064970162694,4.068786126063443,0.41827535944811145,2.8733973634451324,3.999986015524768,3.6976330549811864,4.271722955405068],"lambda":[7.884544412222039,3.0203132811106848,2.4875515837120044,0.2937926824106807,1.1222292420680735,5.969823386789617,8.11546047726312,8.485581717631073,9.459745320324831,4.21742514111636,7.984485652152213,4.734547631137682,3.8352810159911277,2.1997873073685215,2.677952167176869,1.796017398217733,1.4304321470251202,8.560133024220889,4.353711607600214,6.550770310485441,4.109235248804264,5.027324606748413,8.40419393561402,9.63702581992236,7.431161949465803,3.8788878626987566,4.73936486725389,5.474865782784873,3.6032458897553243,2.083961626923778,0.2787480262387909,4.2447531987211224,9.092488779546892,6.913147499739301,0.5199468916600192,2.304704625714411,4.299829039737498,3.8464493165076674,0.3435529459408926,5.413758435239391,1.6142935378421508,6.599560512043128,6.916852419012926,2.03483730807948,3.890593270475333,8.695775262494179,1.869831815030063,1.636859225324494,7.11576124902733,6.615242245848738,9.894821356491303,2.7018710801421264,3.5567446268565894,1.8897146878295978,7.809418529837313,0.6115734243809667,1.0570921692976065,4.956863742917723,9.04360581426592,8.743290268347351,4.015721107246368,3.0736710383121824,1.721321329833374,0.7732314074723057,5.575855605725759,8.889482728655796,9.049126234967208,8.834929022607485,4.105523343123442,3.6329692459369434,8.546375556076853,3.138205781538579,7.0524924183632365,9.390581546492594,4.025085218501509,8.611887845274918,7.7180119852842655,2.2381330405592093,7.270424877176511,8.2657397143135,3.2207625804604767,9.419031946480203,3.2753085885975186,6.254478853033243,5.400661647647798,8.967968627043998,8.992143969687218,3.329155198237368,5.4185694571974,2.063531303103834,7.017998532985946,4.057819528009885,8.843964431919007,4.390583972752995,3.8519252042740937,6.564963326489915,6.481890421016729,3.1497169630026423,6.5576443962515025,2.7343268111244545,4.983557700003329,9.969056087392127,5.53792740440604,9.238357803981227,0.20908086945694127,1.8453723309658776,0.44938736084771724,4.379256378402809,8.523708117500732,7.856595611048873,9.600629915029433,0.19744464637773795,2.8383466846693572,5.300504151384036,1.4930874099925773,5.7932052824832425,0.5174859489385542,0.9877404445586402,2.023082109187595,3.9132821220943392,1.1069232602256296,5.070573012568815,1.1322093126945942,7.999032015471148,4.810065030580592,6.835356302548248,0.8063709630253979,7.816149003962263,6.556489316125242,3.5978727150153844,1.048345313381882,9.480057976264964,4.659414122902663,2.62484879715976,4.363576281159737,4.839917763414217,7.645513464109783,4.225229822177883,8.205177935961732,1.2745788069914132,0.6031158521982705,9.841589894431698,6.3692091055864,8.459843358990401,1.9543658145994947,5.615506647937114,8.539025568802128,3.6553654551814074,6.884290107759585,7.546808961805402,4.955313071115812,3.8420312494499287,2.4531289496192565,7.794616563443835,1.3900859582158476,6.630903150372227,7.499103605036472,7.186295058294016,7.7002288378318955,4.24654694923283,1.365985581746434,1.4396739298367711,0.3460202309780658,6.711813014032087,8.427215086940196,8.886237815930633,0.05701106956419455,2.0595176355637546,8.514686493531066,0.5467901309013068,0.23290867349248234,6.262262296135768,3.503138149175642,4.193664160948063,1.8422144811892815,0.6849838410046005,7.341367904947318,3.420837341305387,9.341645705450905,0.007088642879660156,7.21266109586256,1.450921054904546,6.122059867011897,2.943966147772654,2.977941839942222,3.9450075895033665,1.92380863415047,2.375275531268217,1.2871104889040552,0.3739199306859664,1.3996469914168141,5.642594063624284,9.971169837536642,7.49487444260682,0.3252898324603515,0.825466957025407,9.690715256530552,7.082959368730939,0.7011948984477168,5.154726580617604,4.249397351311581,9.807642589480174,2.155504264715775,9.039184588487643,1.344622482502844,4.432999404782187,1.2617460837214445,2.623236477969386,0.42234140236876216,8.91385268742193,6.133158989806349,6.452248019558922,0.551688748400665,7.753679081298701,9.374365521390091,5.006196723842413,4.0690783708171345,5.138760365420978,7.335346764651467,9.975957802766635,6.834669665189892,9.514805025659399,9.607320077718368,9.109390562707533,4.013176253535331,4.3342229984754415,7.541314196919093,1.8793242979262703,9.8450527198519,1.488663334758915,8.886237251618017,0.04192953035179414,6.951531782625066,4.4540547985515655,1.1953193676611895,6.312937896488357,3.3605915994474667,8.502818760166056,1.000465120112557,3.0744293174267456,7.1137966738971965,4.025148473137299,8.481517946122693,0.2953888011480199,7.134744063369823,3.8727692610590614,6.458477678139518,5.550718975227249,3.1805916000475576,8.461641325229632,5.239864293234556,0.11234588672275558,7.022624601513798,8.555223857101446,1.5697774744760373,8.170630127968593,6.21265181052075,7.080702991873324,0.7998543797236124,2.6963444525301683,6.67020185881743,7.052821824959654,0.8934559138250675,7.328141690495067,4.990682768613404,8.136829140944787,5.836344131864381,5.121930063512186,7.546402830753996,1.074982332018528,0.9496674154768936,5.341856959343194,4.607523879758069,0.053843772716914984,4.786631111707383,4.009234466332274,0.8007071214994688,9.430057678274563,5.722521105857492,4.510036788965477,6.741191355237741,1.4433868535773953,5.977334193147135,5.300374021076277,6.790208920058705,2.6905497160564895,8.573743766395287,7.388780191263309,3.184983068988143,3.4543721389338433,8.040921436557309,4.298472303906566,9.091535130844989,1.0511703249010096,3.05252070591715,6.768140629599442,3.237526947597229,8.550537475421907,4.0208734867059714,6.723665204861238,1.4580964020722798,9.198856445796002,0.8627002433669673,8.37951558972448,9.313242503478229,3.716421169781974,2.8845378184074733,1.266644619032744,7.283518318151616,2.223239116654927,2.036333450979737,8.135443434126843,6.054436802609187,4.478763130630632,2.733005606192158,6.853334458736331,3.9249158011513674,6.236011532370234,2.9657052324765942,3.097828196620356,0.4523646350042809,5.809241217680632,3.5389524042043186,2.6903876553670325,5.846291900259253,5.496532210280119,2.3506571163318735,3.3537496247901455,6.0952321475946984,1.0538659021389685,8.300294730533304,7.728582142026886,8.796487526440327,4.633896893207574,4.101944890929998,1.4934897337287634,6.572074285835541,0.328142926053443,5.272773528870798,6.159653833133771,6.203542130428201,9.633711911814185,5.985091603183726,8.610302002792622,3.9844560435145793,1.0673453587290882,1.9596560230335713,6.565903674376859,5.8430727832411655,6.57565794089654,0.1260326473795148,3.524663720291177,8.202000901005718,8.608424757052246,8.925947586222387,7.629309452260231,7.531825599467641,6.859488626528158,7.405265761734614,1.4028213500668074,7.001817455598056,0.7110021588199134,7.236928150039739,3.6833904243240867,1.4471550230652097,4.715487294457161,6.274164741845951,2.316381986799194,3.0197682208636767,0.09618804398900727,8.950828350957586,2.6633370026172476,8.360114623077761,5.6010635741236525,8.305523528622345,4.04153833743492,3.997162110357053,4.10828114011567,3.274208990324692,9.825141661393594,3.5426427954357,4.822582706396945,6.9643679332244,2.3128316213603783,4.952622365132129,4.524093783293366,5.193122564538745,0.14512566517214998,9.552531277776108,4.547125013963678,7.681249626734261,2.1953072574287202,1.2373352377713465,0.9634324651147352,8.79892032142421,7.402333626439807,9.955887617533126,3.505909193078718,1.8763206548595823,8.518306038743678,2.430758244385811,3.851673284044148,4.715564255540325,8.276687252022665,3.7027103629662905,9.074045277109942,1.4253377441856463,1.004597463917991,1.2962210532104423,4.372941314187413,1.582092545602929,4.147016691065604,6.97026641369598,3.6592960304890787,0.09715057744063449,8.097338488382778,1.7932404589828588,5.538293512892707,7.271663999727311,3.598936793930765,3.203455662349377,9.301712294063194,0.06541064959953546,3.6476506117516116,4.004775845881814,9.334159073779942,2.174069280467248,3.2220430992035576,8.963782457860932,4.256454026272081,9.190761559227552,5.069382872489829,1.162730019200211,3.526823044604541,5.741798712635616,7.899242971903573,0.5479327653375776,9.183368413478847,6.863347939391524,3.249826692277571,1.0347415157549622,6.763685192472673,1.460386768733366,5.738028644757673,7.607417927714469,0.9529227015823638,6.790106678744738,2.1273647447160404,5.767899602303337,8.614942310106306,8.854581512553493,4.884234025577809,1.2891751662474138,9.455871526401285,2.5468806080353046,7.318747307480398,5.105354529908781,9.385597761750294,9.62828202111378,4.228883562239371,2.0705628639023255,5.581052171755041,9.259266475785681,5.531342574161835,6.863020825944197,1.439180331126384,9.546742928284564,3.537162518735144,2.447983133549434,6.830708902326236,0.7599858284335181,7.070932726146908,9.64298994910287,6.22601958091219,2.8319567883175956,8.132255549833811,9.542686205866,3.960054706274858,4.975630544023968,9.759426956714861,1.8618896972362564,6.348410537012179,4.026968234429747,1.2061138855613374,5.608707279305969,5.655742111748189,1.2907133728929066,9.425222568883862,8.13964818501766,7.264147772090103,1.4160991540427958,1.020532610924696,5.228842324948113,5.821275657177793,8.870557517308681,4.084697919902183,3.4062730682901887,0.36315853589419245,1.2747528612945414,7.44057598027611,3.244727855590719,4.093622901415066,5.394689608940453,3.9167439028302242,5.276558101371411,5.373554406810214,8.988776584276021,3.4583990286802035,0.21793172686808138,4.9654303160799635,8.29234445941876,5.931682944640224,7.089419984650043,1.0226771663859213,6.609839035173231,8.095918275982939,8.802633137886811,7.817282803641299,4.521175022298212,1.9283551433691248,7.717527289993729,5.924225909559555,2.131061372749805,0.4213293826819031,9.160798517341691,5.734632109785429,7.117284407066727,6.585366105198793,3.084106774996098,1.076616414556606,9.763038408658655,1.400425282262463,6.602713645140669,5.360145887920842,5.403966907044913,4.71178042344099,9.38180279033131,1.2007688556845086,0.5395145989226147,2.7515574615560245,8.970743936680677,7.846393646189442,3.9339765852378927,3.0036943632463853,9.91457386108926,8.007951737178864,8.728123402903627,3.2186896651193364,3.4430726726676486,3.1726884344105866,4.405657083089974,8.15033038531026,5.370146322991943,8.637737508181743,5.595934266246667,6.045078093636116,7.004371100878615,3.9280799208192363,2.325021294269438,9.450354987066325,6.990027277742989,0.30909018905810104,6.58900924895105,2.6338421729755224,1.754472611498148,0.7496538334278213,8.839555823184986,9.689421590930444,4.852283256733312,3.1215945369804454,6.8289974312469575,9.219901849797065,8.573747887403176,6.391439756680635,3.5036450402503228,1.1395731545257348,3.587557160097159,1.1846960962543784,8.208872434317666,0.9479134167101466,9.270819628529258,1.57967007278085,7.2076287475648275,9.44517808432684,7.5088977062507904,4.425263642718793,8.694874999272455,6.12419394062562,5.219319634439554,8.504027237764305,0.007763748254401293,9.749926549803655,8.864640031508992,8.803012830276062,8.114810074659367,2.7380596664185175,2.1144414350746055,7.559754687116245,2.3299134638240426,7.713047912634547,3.136429662287008,7.911530817285481,1.3178123895029215,0.2698317565124708,2.2377413115959,2.8773354247805916,2.5700237821781613,7.801406211746976,6.686659066114644,4.831580971774791,6.085074469909619,8.809231849701153,7.5574051293254385,1.0686752884731243,5.915930144849826,8.751768023328585,1.5828080289313973,6.433787311811452,0.9787998502671069,1.8323497643296482,1.7688884965023877,9.502371423556186,0.3564777008451414,8.354069590713145,6.8038066124394785,6.944809346136287,3.948943643004459,6.661920632686522,5.4332630544163045,3.618050007113971,8.530901763779013,1.1239070419266617,3.186093612831884,5.330737185466545,2.6824062180666197,1.174569060413846,3.1692318119462004,0.2572580589885809,5.791690921565262,1.2409534256460075,3.933072636804922,1.2490477959832313,3.548896473174745,6.85106477406946,9.217451202546565,1.4799471026743238,1.05820459284649,9.895555926044029,8.719919157537099,5.352872686905785,1.7783541192061025,4.6498224694303385,4.0091714162674075,1.8841234207631397,9.41612966982249,7.11059350599768,4.792465243072401,4.076386558326832,2.006195001973261,6.811688944392045,9.548703517912285,4.729876460226032,0.9989080832551522,4.486603978106006,1.3931020721174048,8.310835530615417,9.838663262871087,1.5424662055411198,7.06729319427599,0.9639776580092385,1.8736808924520587,7.694126738615095,0.41778554764189346,0.7028115924078882,2.0208117995795982,9.79325310214983,2.9150725981069536,9.013007404778415,5.2764791858108495,5.435423150977021,9.054988227179294,3.7311836055106595,2.0671151495861073,6.121746780864134,1.9112182057386118,0.7023556662847175,9.895733039763975,9.826714141672648,3.4291636115462754,9.221717326168255,0.38574366548200123,9.739171915263924,5.184022026639321,8.769536591425414,7.973766489450254,4.129920709965747,1.8709702637682701,9.71546073424694,9.260293481536618,6.032197352901047,8.726463457384483,5.979611868827908,7.558701784070991,2.6706138035582683,7.880438156107486,6.805148716237199,5.142906079985048,5.123439394446683,9.571531430392696,1.1717786084857273,8.006715164404925,5.380084763162552,9.339181379418031,2.101503974338712,0.9281480876190717,6.452428052658119,6.89970599807352,1.9172526655197175,9.775460269878922,2.0143207744238145,3.8119297431110843,8.729885393692998,1.610865933418888,8.61362193241671,9.958602728211785,7.8356866819415565,6.4455921394559335,9.870452418911837,2.246503432886622,0.6378437297382944,1.0601238153389958,9.168387981678583,4.890781239269117,4.605879602827223,4.771892608927244,5.227477629967618,3.728628400445164,6.607941318045709,3.266002530333738,3.5377975680626217,5.075221380939268,4.529319935681344,3.167820770993983,9.083726641676675,9.746755604454176,3.083680981306889,4.423379760395263,0.8927636634387492,4.289219264311117,2.185540204088776,6.395971130779805,0.6781829509537207,8.800177376157484,9.945937994563295,7.153483303925334,7.962663282043538,2.309051209432733,3.7800810489086367,6.564894827956625,6.558307824289386,1.5574581794077313,6.765162036634866,8.36554922635794,9.498417415573863,4.053680273818188,0.2646185626837272,1.8134522802946518,2.3050002248471024,5.9844762432510485,7.490295337958348,8.170555419473164,8.64698741180513,1.2726930889035426,3.9712216617208718,8.203925347843445,8.478275047997094,8.361094772893779,8.558703462477377,9.967878524027869,7.619897178261379,8.430281316649266,0.8304855526815103,0.030569323999922737,4.962958239480033,6.182942057345477,1.033692276780307,2.2277345119129044,7.0845012592223,9.491598051236805,9.405014308501476,6.4685067402321845,0.5320080229808455,3.5360008984087865,1.1457828481085053,8.524652799830115,8.06098110265695,4.945179454712525,9.9554110759179,5.564660750096884,4.223110394524614,3.934339178677886,6.63107329832963,2.6133614431574514,2.1113288962727617,7.561523910745224,2.16283852531727,5.681438206990073,6.543619761001751,3.1872526891290343,2.1318893437090614,7.69924735487709,1.1387362220608144,1.8760495905804841,0.726579287718585,4.856669321001775,9.983740543092605,6.776081458230092,6.105650825805482,1.4338203049553755,6.61772720702322,1.0911726413638356,4.096075333018739,8.547643930525975,9.086289930439044,0.23456453943156763,7.530872348210059,9.374303739039075,5.240437762111172,6.980459916449949,8.298365299230339,8.10525524705115,2.0112794103917087,8.714848293455027,6.550845382088786,2.081177359557962,6.261846627072094,4.793323657206541,5.315171174197171,8.165371852191484,8.085546993423849,0.22545919764283884,6.58961775321814,5.129419647821667,8.700010523125083,1.5326777465176544,1.514423466474295,7.698009828264867,8.949528979461896,2.1483233546852087,8.32842695609046,2.5792679149799103,5.913546371572749,6.944157010975253,8.946155823044295,6.546610332100762,9.942967079882326,5.4885992731896955,6.761202982974199,2.5747928971479728,5.692731138460401,6.141258262849871,6.852768320282047,7.486036890687624,1.8445428398007668,1.1067906049339915,6.06617281681231,1.5612473402276406,9.463816892632027,8.446235734980753,6.617800878302129,5.47460921056704,2.0964677332574566,3.1537789403851257,9.702586515555405,8.104634314659819,1.2454003344980258,5.6225298582872885,1.5794822152779942,9.738452911467188,8.17351367696638,4.661467904120817,5.746852340775799,6.087444343024771,0.2520383285306993,5.175283021923478,3.9972906506644557,7.170437118486719,6.972315963216264,1.8160453292630074,7.6088455162137585,8.813982039600495,1.2123077124265835,1.7512269187224816,2.317485517721787,2.017967708292072,9.429677614221458,1.4898517625443986,1.7718240678119512,4.006493114194449,4.716267772601026,7.564239016248086,1.5325292987703887,7.153242435840781,8.592794346292136,3.2089461112430318,3.9890376068502142,8.978561649656458,6.140631119711641,4.904944339792044,0.7814078738220642,8.97921605097985,1.1125897605560309,6.063213728063714,7.1096856545700415,7.262886899306171,4.926152265735846,3.442856942271384,9.346857120965737,7.242418692570009,1.3617259816756877,4.648514723035073,0.8627156734792907,5.1211033808509265,5.183536342632702,9.414209696717462,1.6840915304440274,9.05400953033061,8.190513492203948,6.0474715936438646,9.947538703449542,6.614175883678661,4.563652781158789,5.11292562672949,0.36948805612486924,6.156601183318962,2.607504495633133,3.055906586836936,5.967043274046828,4.150486619433032,9.989187924709874,0.7497780417760791,0.6545137158380254,3.64008993293234,7.706740661790617,5.675866288441085,1.4719894484254903,1.4485223917990186,5.988086694435082,9.140074694897367,1.2270280957052337,8.398678239616578,1.5972779195951659,8.956854571400388,7.1988022884744645,7.381829710356131,6.932827114472508,1.0390240048930943,9.518905824621447,3.222225828481231,2.6538814579459724,1.16303204513738,2.485351501987212,1.2440302181822283,0.8114105293262308,0.8890818887309138,9.85912539121471,4.530763661341628,8.058631071257114,8.718625914504614,0.804685361935451,5.2217603158194414,6.994138310487983,2.4491574389997717,8.907380490736212,6.124072433300567,7.3549810900286055,3.449962385493668,9.907877751894356,2.373629268349229,4.030938465152641,0.9919530244751762,4.91936916985984,3.6752924893752015,1.077373423396315,2.7988180072298063,1.324522530235528,0.2413483910855163,0.6235031205158537,8.83557936970253,4.763107523687653,5.705984628141256,6.439429513239037,0.8616902789908121,4.729851118177992,7.727555783832449,7.617893422715745,0.6644497865530785,0.2733258821121298,9.389616435541816,6.057638368339536]}

},{}],150:[function(require,module,exports){
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
var cdf = require( './../lib' );


// FIXTURES //

var largeScale = require( './fixtures/julia/large_scale.json' );
var largeShape = require( './fixtures/julia/large_shape.json' );
var bothLarge = require( './fixtures/julia/both_large.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof cdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = cdf( NaN, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = cdf( 0.0, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = cdf( 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `+infinity` for `x` and a finite `lambda` and `k`, the function returns `1`', function test( t ) {
	var y = cdf( PINF, 0.5, 1.0 );
	t.equal( y, 1.0, 'returns 1' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a finite `lambda` and `k`, the function returns `0`', function test( t ) {
	var y = cdf( NINF, 0.5, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided a nonpositive `lambda`, the function returns `NaN`', function test( t ) {
	var y;

	y = cdf( 2.0, 2.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, 2.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NaN, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a nonpositive `k`, the function returns `NaN`', function test( t ) {
	var y;

	y = cdf( 2.0, 0.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, -1.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0, -1/0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NINF, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NINF, PINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NINF, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the cdf for `x` given large `lambda` and `k`', function test( t ) {
	var expected;
	var lambda;
	var delta;
	var tol;
	var i;
	var k;
	var x;
	var y;

	expected = bothLarge.expected;
	x = bothLarge.x;
	lambda = bothLarge.lambda;
	k = bothLarge.k;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], k[i], lambda[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', k: '+k[i]+', lambda: '+lambda[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. k: '+k[i]+'. lambda: '+lambda[i]+'. y: '+y+'. Expected: '+expected[i]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the cdf for `x` given large shape parameter `lambda`', function test( t ) {
	var expected;
	var lambda;
	var delta;
	var tol;
	var i;
	var k;
	var x;
	var y;

	expected = largeShape.expected;
	x = largeShape.x;
	lambda = largeShape.lambda;
	k = largeShape.k;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], k[i], lambda[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', k: '+k[i]+', lambda: '+lambda[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. k: '+k[i]+'. lambda: '+lambda[i]+'. y: '+y+'. Expected: '+expected[i]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the cdf for `x` given large scale parameter `k`', function test( t ) {
	var expected;
	var lambda;
	var delta;
	var tol;
	var i;
	var k;
	var x;
	var y;

	expected = largeScale.expected;
	x = largeScale.x;
	lambda = largeScale.lambda;
	k = largeScale.k;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], k[i], lambda[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', k: '+k[i]+', lambda: '+lambda[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. k: '+k[i]+'. lambda: '+lambda[i]+'. y: '+y+'. Expected: '+expected[i]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/weibull/cdf/test/test.cdf.js")
},{"./../lib":145,"./fixtures/julia/both_large.json":147,"./fixtures/julia/large_scale.json":148,"./fixtures/julia/large_shape.json":149,"@stdlib/constants/float64/eps":62,"@stdlib/constants/float64/ninf":73,"@stdlib/constants/float64/pinf":75,"@stdlib/math/base/assert/is-nan":86,"@stdlib/math/base/special/abs":90,"tape":328}],151:[function(require,module,exports){
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

var largeScale = require( './fixtures/julia/large_scale.json' );
var largeShape = require( './fixtures/julia/large_shape.json' );
var bothLarge = require( './fixtures/julia/both_large.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof factory, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a function', function test( t ) {
	var cdf = factory( 0.0, 1.0 );
	t.equal( typeof cdf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 1.0, 1.0 );
	y = cdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, 1.0 );
	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( 1.0, NaN );
	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, NaN );
	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, NaN );
	y = cdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a valid `lambda` and `k`, the function returns a function which returns `1` when provided `+infinity` for `x`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.5, 1.0 );
	y = cdf( PINF );
	t.equal( y, 1.0, 'returns 1' );

	t.end();
});

tape( 'if provided a valid `lambda` and `k`, the function returns a function which returns `0` when provided `-infinity` for `x`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.5, 1.0 );
	y = cdf( NINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a nonpositive `k`, the created function always returns `NaN`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.0, 1.0 );

	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( -1.0, 1.0 );

	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( 1.0, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( PINF, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NINF, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a nonpositive `lambda`, the created function always returns `NaN`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.5, 0.0 );

	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( 0.5, -1.0 );

	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( 1.0, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( PINF, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NINF, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the cdf for `x` given large `k` and `lambda`', function test( t ) {
	var expected;
	var lambda;
	var delta;
	var cdf;
	var tol;
	var i;
	var k;
	var x;
	var y;

	expected = bothLarge.expected;
	x = bothLarge.x;
	lambda = bothLarge.lambda;
	k = bothLarge.k;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( k[i], lambda[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', k: '+k[i]+', lambda: '+lambda[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. k: '+k[i]+'. lambda: '+lambda[i]+'. y: '+y+'. Expected: '+expected[i]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the cdf for `x` given large shape parameter `lambda`', function test( t ) {
	var expected;
	var lambda;
	var delta;
	var cdf;
	var tol;
	var i;
	var k;
	var x;
	var y;

	expected = largeShape.expected;
	x = largeShape.x;
	lambda = largeShape.lambda;
	k = largeShape.k;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( k[i], lambda[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', k: '+k[i]+', lambda: '+lambda[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. k: '+k[i]+'. lambda: '+lambda[i]+'. y: '+y+'. Expected: '+expected[i]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the cdf for `x` given large scale parameter `k`', function test( t ) {
	var expected;
	var lambda;
	var delta;
	var cdf;
	var tol;
	var i;
	var k;
	var x;
	var y;

	expected = largeScale.expected;
	x = largeScale.x;
	lambda = largeScale.lambda;
	k = largeScale.k;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( k[i], lambda[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', lambda: '+lambda[i]+', k: '+k[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. k: '+k[i]+'. lambda: '+lambda[i]+'. y: '+y+'. Expected: '+expected[i]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/weibull/cdf/test/test.factory.js")
},{"./../lib/factory.js":144,"./fixtures/julia/both_large.json":147,"./fixtures/julia/large_scale.json":148,"./fixtures/julia/large_shape.json":149,"@stdlib/constants/float64/eps":62,"@stdlib/constants/float64/ninf":73,"@stdlib/constants/float64/pinf":75,"@stdlib/math/base/assert/is-nan":86,"@stdlib/math/base/special/abs":90,"tape":328}],152:[function(require,module,exports){
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
var cdf = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof cdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `cdf` functions', function test( t ) {
	t.equal( typeof cdf.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/weibull/cdf/test/test.js")
},{"./../lib":145,"tape":328}],153:[function(require,module,exports){
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
var tryRequire = require( '@stdlib/utils/try-require' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var EPS = require( '@stdlib/constants/float64/eps' );


// FIXTURES //

var largeScale = require( './fixtures/julia/large_scale.json' );
var largeShape = require( './fixtures/julia/large_shape.json' );
var bothLarge = require( './fixtures/julia/both_large.json' );


// VARIABLES //

var cdf = tryRequire( resolve( __dirname, './../lib/native.js' ) );
var opts = {
	'skip': ( cdf instanceof Error )
};


// TESTS //

tape( 'main export is a function', opts, opts, function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof cdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', opts, function test( t ) {
	var y = cdf( NaN, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = cdf( 0.0, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = cdf( 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `+infinity` for `x` and a finite `lambda` and `k`, the function returns `1`', opts, function test( t ) {
	var y = cdf( PINF, 0.5, 1.0 );
	t.equal( y, 1.0, 'returns 1' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a finite `lambda` and `k`, the function returns `0`', opts, function test( t ) {
	var y = cdf( NINF, 0.5, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided a nonpositive `lambda`, the function returns `NaN`', opts, function test( t ) {
	var y;

	y = cdf( 2.0, 2.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, 2.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NaN, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a nonpositive `k`, the function returns `NaN`', opts, function test( t ) {
	var y;

	y = cdf( 2.0, 0.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, -1.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0, -1/0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NINF, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NINF, PINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NINF, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the cdf for `x` given large `lambda` and `k`', opts, function test( t ) {
	var expected;
	var lambda;
	var delta;
	var tol;
	var i;
	var k;
	var x;
	var y;

	expected = bothLarge.expected;
	x = bothLarge.x;
	lambda = bothLarge.lambda;
	k = bothLarge.k;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], k[i], lambda[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', k: '+k[i]+', lambda: '+lambda[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. k: '+k[i]+'. lambda: '+lambda[i]+'. y: '+y+'. Expected: '+expected[i]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the cdf for `x` given large shape parameter `lambda`', opts, function test( t ) {
	var expected;
	var lambda;
	var delta;
	var tol;
	var i;
	var k;
	var x;
	var y;

	expected = largeShape.expected;
	x = largeShape.x;
	lambda = largeShape.lambda;
	k = largeShape.k;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], k[i], lambda[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', k: '+k[i]+', lambda: '+lambda[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. k: '+k[i]+'. lambda: '+lambda[i]+'. y: '+y+'. Expected: '+expected[i]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the cdf for `x` given large scale parameter `k`', opts, function test( t ) {
	var expected;
	var lambda;
	var delta;
	var tol;
	var i;
	var k;
	var x;
	var y;

	expected = largeScale.expected;
	x = largeScale.x;
	lambda = largeScale.lambda;
	k = largeScale.k;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], k[i], lambda[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', k: '+k[i]+', lambda: '+lambda[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. k: '+k[i]+'. lambda: '+lambda[i]+'. y: '+y+'. Expected: '+expected[i]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/weibull/cdf/test/test.native.js","/lib/node_modules/@stdlib/stats/base/dists/weibull/cdf/test")
},{"./fixtures/julia/both_large.json":147,"./fixtures/julia/large_scale.json":148,"./fixtures/julia/large_shape.json":149,"@stdlib/constants/float64/eps":62,"@stdlib/constants/float64/ninf":73,"@stdlib/constants/float64/pinf":75,"@stdlib/math/base/assert/is-nan":86,"@stdlib/math/base/special/abs":90,"@stdlib/utils/try-require":196,"path":210,"tape":328}],154:[function(require,module,exports){
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

},{"./is_number.js":157}],155:[function(require,module,exports){
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

},{"./is_number.js":157,"./zero_pad.js":161}],156:[function(require,module,exports){
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

},{"./main.js":159}],157:[function(require,module,exports){
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

},{"./format_double.js":154,"./format_integer.js":155,"./is_string.js":158,"./space_pad.js":160,"./zero_pad.js":161}],160:[function(require,module,exports){
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

},{"./main.js":163}],163:[function(require,module,exports){
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

},{"./main.js":166}],165:[function(require,module,exports){
arguments[4][158][0].apply(exports,arguments)
},{"dup":158}],166:[function(require,module,exports){
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

},{"./is_string.js":165,"@stdlib/string/base/format-interpolate":156,"@stdlib/string/base/format-tokenize":162}],167:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

// MAIN //

var Sym = ( typeof Symbol === 'function' ) ? Symbol : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = Sym;

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

},{}],171:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-buffer":39,"@stdlib/regexp/function-name":141,"@stdlib/utils/native-class":191}],173:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":178}],175:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],176:[function(require,module,exports){
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

},{}],177:[function(require,module,exports){
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

},{"./define_property.js":176}],178:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":175,"./has_define_property_support.js":177,"./polyfill.js":179}],179:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":164}],180:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./native.js":183,"./polyfill.js":184,"@stdlib/assert/is-function":45}],181:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":182}],182:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./detect.js":180,"@stdlib/object/ctor":139}],183:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./proto.js":185,"@stdlib/utils/native-class":191}],185:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],186:[function(require,module,exports){
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

},{"./codegen.js":187,"./global_this.js":188,"./self.js":189,"./window.js":190,"@stdlib/assert/is-boolean":33,"@stdlib/string/format":164}],187:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],188:[function(require,module,exports){
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

// MAIN //

var obj = ( typeof self === 'object' ) ? self : null;


// EXPORTS //

module.exports = obj;

},{}],190:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],191:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":192,"./polyfill.js":193,"@stdlib/assert/has-tostringtag-support":20}],192:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":194}],193:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":194,"./tostringtag.js":195,"@stdlib/assert/has-own-property":16}],194:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MODULES //

var Symbol = require( '@stdlib/symbol/ctor' );


// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{"@stdlib/symbol/ctor":167}],196:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":197}],197:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-error":41}],198:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./fixtures/nodelist.js":199,"./fixtures/re.js":200,"./fixtures/typedarray.js":201}],199:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/global":186}],200:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],201:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],202:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./check.js":198,"./main.js":203,"./polyfill.js":204}],203:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/constructor-name":171}],204:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/constructor-name":171}],205:[function(require,module,exports){
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

},{}],206:[function(require,module,exports){

},{}],207:[function(require,module,exports){
arguments[4][206][0].apply(exports,arguments)
},{"dup":206}],208:[function(require,module,exports){
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
},{"base64-js":205,"buffer":208,"ieee754":311}],209:[function(require,module,exports){
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

},{}],210:[function(require,module,exports){
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
},{"_process":318}],211:[function(require,module,exports){
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

},{"events":209,"inherits":312,"readable-stream/lib/_stream_duplex.js":213,"readable-stream/lib/_stream_passthrough.js":214,"readable-stream/lib/_stream_readable.js":215,"readable-stream/lib/_stream_transform.js":216,"readable-stream/lib/_stream_writable.js":217,"readable-stream/lib/internal/streams/end-of-stream.js":221,"readable-stream/lib/internal/streams/pipeline.js":223}],212:[function(require,module,exports){
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

},{}],213:[function(require,module,exports){
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
},{"./_stream_readable":215,"./_stream_writable":217,"_process":318,"inherits":312}],214:[function(require,module,exports){
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
},{"./_stream_transform":216,"inherits":312}],215:[function(require,module,exports){
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
},{"../errors":212,"./_stream_duplex":213,"./internal/streams/async_iterator":218,"./internal/streams/buffer_list":219,"./internal/streams/destroy":220,"./internal/streams/from":222,"./internal/streams/state":224,"./internal/streams/stream":225,"_process":318,"buffer":208,"events":209,"inherits":312,"string_decoder/":327,"util":206}],216:[function(require,module,exports){
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
},{"../errors":212,"./_stream_duplex":213,"inherits":312}],217:[function(require,module,exports){
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
},{"../errors":212,"./_stream_duplex":213,"./internal/streams/destroy":220,"./internal/streams/state":224,"./internal/streams/stream":225,"_process":318,"buffer":208,"inherits":312,"util-deprecate":336}],218:[function(require,module,exports){
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
},{"./end-of-stream":221,"_process":318}],219:[function(require,module,exports){
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
},{"buffer":208,"util":206}],220:[function(require,module,exports){
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
},{"_process":318}],221:[function(require,module,exports){
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
},{"../../../errors":212}],222:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],223:[function(require,module,exports){
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
},{"../../../errors":212,"./end-of-stream":221}],224:[function(require,module,exports){
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
},{"../../../errors":212}],225:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":209}],226:[function(require,module,exports){
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

},{"./":227,"get-intrinsic":302}],227:[function(require,module,exports){
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

},{"es-define-property":287,"es-errors/type":293,"function-bind":301,"get-intrinsic":302,"set-function-length":322}],228:[function(require,module,exports){
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

},{"./lib/is_arguments.js":229,"./lib/keys.js":230}],229:[function(require,module,exports){
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

},{}],230:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],231:[function(require,module,exports){
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

},{"es-define-property":287,"es-errors/syntax":292,"es-errors/type":293,"gopd":303}],232:[function(require,module,exports){
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

},{"define-data-property":231,"has-property-descriptors":304,"object-keys":316}],233:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],234:[function(require,module,exports){
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

},{"./ToNumber":265,"./ToPrimitive":267,"./Type":272}],235:[function(require,module,exports){
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

},{"../helpers/isFinite":280,"../helpers/isNaN":281,"../helpers/isPrefixOf":282,"./ToNumber":265,"./ToPrimitive":267,"es-errors/type":293,"get-intrinsic":302}],236:[function(require,module,exports){
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

},{"call-bind/callBound":226,"es-errors/type":293}],237:[function(require,module,exports){
'use strict';

var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value) {
	return RequireObjectCoercible(value, arguments.length > 1 ? arguments[1] : void undefined);
};

},{"es-object-atoms/RequireObjectCoercible":295}],238:[function(require,module,exports){
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

},{"./DayWithinYear":241,"./InLeapYear":245,"./MonthFromTime":255,"es-errors/eval":288}],239:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":286,"./floor":276}],240:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":276}],241:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":239,"./DayFromYear":240,"./YearFromTime":274}],242:[function(require,module,exports){
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

},{"./modulo":277}],243:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":284,"./IsAccessorDescriptor":246,"./IsDataDescriptor":248,"es-errors/type":293}],244:[function(require,module,exports){
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

},{"../helpers/timeConstants":286,"./floor":276,"./modulo":277}],245:[function(require,module,exports){
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

},{"./DaysInYear":242,"./YearFromTime":274,"es-errors/eval":288}],246:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":284,"es-errors/type":293,"hasown":310}],247:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":313}],248:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":284,"es-errors/type":293,"hasown":310}],249:[function(require,module,exports){
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

},{"./IsAccessorDescriptor":246,"./IsDataDescriptor":248,"./IsPropertyDescriptor":250,"es-errors/type":293}],250:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor(Desc);
};

},{"../helpers/records/property-descriptor":284}],251:[function(require,module,exports){
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

},{"../helpers/isFinite":280,"../helpers/timeConstants":286}],252:[function(require,module,exports){
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

},{"../helpers/isFinite":280,"./DateFromTime":238,"./Day":239,"./MonthFromTime":255,"./ToInteger":264,"./YearFromTime":274,"./floor":276,"./modulo":277,"get-intrinsic":302}],253:[function(require,module,exports){
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

},{"../helpers/isFinite":280,"../helpers/timeConstants":286,"./ToInteger":264}],254:[function(require,module,exports){
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

},{"../helpers/timeConstants":286,"./floor":276,"./modulo":277}],255:[function(require,module,exports){
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

},{"./DayWithinYear":241,"./InLeapYear":245}],256:[function(require,module,exports){
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

},{"../helpers/isNaN":281}],257:[function(require,module,exports){
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

},{"../helpers/timeConstants":286,"./floor":276,"./modulo":277}],258:[function(require,module,exports){
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

},{"./Type":272}],259:[function(require,module,exports){
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


},{"../helpers/isFinite":280,"./ToNumber":265,"./abs":275,"get-intrinsic":302}],260:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":286,"./DayFromYear":240}],261:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":286,"./modulo":277}],262:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],263:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":265}],264:[function(require,module,exports){
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

},{"../helpers/isFinite":280,"../helpers/isNaN":281,"../helpers/sign":285,"./ToNumber":265,"./abs":275,"./floor":276}],265:[function(require,module,exports){
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

},{"./ToPrimitive":267,"call-bind/callBound":226,"safe-regex-test":321}],266:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = require('es-object-atoms/ToObject');

},{"es-object-atoms/ToObject":296}],267:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":298}],268:[function(require,module,exports){
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

},{"./IsCallable":247,"./ToBoolean":262,"./Type":272,"es-errors/type":293,"hasown":310}],269:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":302}],270:[function(require,module,exports){
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

},{"../helpers/isFinite":280,"../helpers/isNaN":281,"../helpers/sign":285,"./ToNumber":265,"./abs":275,"./floor":276,"./modulo":277}],271:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":265}],272:[function(require,module,exports){
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

},{}],273:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":239,"./modulo":277}],274:[function(require,module,exports){
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

},{"call-bind/callBound":226,"get-intrinsic":302}],275:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":302}],276:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],277:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":283}],278:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":286,"./modulo":277}],279:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":234,"./5/AbstractRelationalComparison":235,"./5/Canonicalize":236,"./5/CheckObjectCoercible":237,"./5/DateFromTime":238,"./5/Day":239,"./5/DayFromYear":240,"./5/DayWithinYear":241,"./5/DaysInYear":242,"./5/FromPropertyDescriptor":243,"./5/HourFromTime":244,"./5/InLeapYear":245,"./5/IsAccessorDescriptor":246,"./5/IsCallable":247,"./5/IsDataDescriptor":248,"./5/IsGenericDescriptor":249,"./5/IsPropertyDescriptor":250,"./5/MakeDate":251,"./5/MakeDay":252,"./5/MakeTime":253,"./5/MinFromTime":254,"./5/MonthFromTime":255,"./5/SameValue":256,"./5/SecFromTime":257,"./5/StrictEqualityComparison":258,"./5/TimeClip":259,"./5/TimeFromYear":260,"./5/TimeWithinDay":261,"./5/ToBoolean":262,"./5/ToInt32":263,"./5/ToInteger":264,"./5/ToNumber":265,"./5/ToObject":266,"./5/ToPrimitive":267,"./5/ToPropertyDescriptor":268,"./5/ToString":269,"./5/ToUint16":270,"./5/ToUint32":271,"./5/Type":272,"./5/WeekDay":273,"./5/YearFromTime":274,"./5/abs":275,"./5/floor":276,"./5/modulo":277,"./5/msFromTime":278}],280:[function(require,module,exports){
'use strict';

var $isNaN = require('./isNaN');

module.exports = function (x) { return (typeof x === 'number' || typeof x === 'bigint') && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{"./isNaN":281}],281:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],282:[function(require,module,exports){
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

},{"call-bind/callBound":226}],283:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],284:[function(require,module,exports){
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

},{"es-errors/type":293,"hasown":310}],285:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],286:[function(require,module,exports){
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

},{}],287:[function(require,module,exports){
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

},{"get-intrinsic":302}],288:[function(require,module,exports){
'use strict';

/** @type {import('./eval')} */
module.exports = EvalError;

},{}],289:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Error;

},{}],290:[function(require,module,exports){
'use strict';

/** @type {import('./range')} */
module.exports = RangeError;

},{}],291:[function(require,module,exports){
'use strict';

/** @type {import('./ref')} */
module.exports = ReferenceError;

},{}],292:[function(require,module,exports){
'use strict';

/** @type {import('./syntax')} */
module.exports = SyntaxError;

},{}],293:[function(require,module,exports){
'use strict';

/** @type {import('./type')} */
module.exports = TypeError;

},{}],294:[function(require,module,exports){
'use strict';

/** @type {import('./uri')} */
module.exports = URIError;

},{}],295:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

/** @type {import('./RequireObjectCoercible')} */
module.exports = function RequireObjectCoercible(value) {
	if (value == null) {
		throw new $TypeError((arguments.length > 0 && arguments[1]) || ('Cannot call method on ' + value));
	}
	return value;
};

},{"es-errors/type":293}],296:[function(require,module,exports){
'use strict';

var $Object = require('./');
var RequireObjectCoercible = require('./RequireObjectCoercible');

/** @type {import('./ToObject')} */
module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

},{"./":297,"./RequireObjectCoercible":295}],297:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Object;

},{}],298:[function(require,module,exports){
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

},{"./helpers/isPrimitive":299,"is-callable":313}],299:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],300:[function(require,module,exports){
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

},{}],301:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":300}],302:[function(require,module,exports){
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

},{"es-errors":289,"es-errors/eval":288,"es-errors/range":290,"es-errors/ref":291,"es-errors/syntax":292,"es-errors/type":293,"es-errors/uri":294,"function-bind":301,"has-proto":305,"has-symbols":306,"hasown":310}],303:[function(require,module,exports){
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

},{"get-intrinsic":302}],304:[function(require,module,exports){
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

},{"es-define-property":287}],305:[function(require,module,exports){
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

},{}],306:[function(require,module,exports){
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

},{"./shams":307}],307:[function(require,module,exports){
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

},{}],308:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":307}],309:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":301}],310:[function(require,module,exports){
'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);

},{"function-bind":301}],311:[function(require,module,exports){
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

},{}],312:[function(require,module,exports){
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

},{}],313:[function(require,module,exports){
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

},{}],314:[function(require,module,exports){
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

},{"call-bind/callBound":226,"has-tostringtag/shams":308}],315:[function(require,module,exports){
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

},{"./isArguments":317}],316:[function(require,module,exports){
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

},{"./implementation":315,"./isArguments":317}],317:[function(require,module,exports){
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

},{}],318:[function(require,module,exports){
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

},{}],319:[function(require,module,exports){
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
},{"_process":318,"through":334,"timers":335}],320:[function(require,module,exports){
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

},{"buffer":208}],321:[function(require,module,exports){
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

},{"call-bind/callBound":226,"es-errors/type":293,"is-regex":314}],322:[function(require,module,exports){
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

},{"define-data-property":231,"es-errors/type":293,"get-intrinsic":302,"gopd":303,"has-property-descriptors":304}],323:[function(require,module,exports){
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

},{"es-abstract/es5":279,"function-bind":301}],324:[function(require,module,exports){
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

},{"./implementation":323,"./polyfill":325,"./shim":326,"define-properties":232,"function-bind":301}],325:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":323}],326:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":325,"define-properties":232}],327:[function(require,module,exports){
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
},{"safe-buffer":320}],328:[function(require,module,exports){
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
},{"./lib/default_stream":329,"./lib/results":331,"./lib/test":332,"_process":318,"defined":233,"through":334,"timers":335}],329:[function(require,module,exports){
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
},{"_process":318,"fs":207,"through":334}],330:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":318,"timers":335}],331:[function(require,module,exports){
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
},{"_process":318,"events":209,"function-bind":301,"has":309,"inherits":312,"object-inspect":333,"resumer":319,"through":334,"timers":335}],332:[function(require,module,exports){
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
},{"./next_tick":330,"deep-equal":228,"defined":233,"events":209,"has":309,"inherits":312,"path":210,"string.prototype.trim":324}],333:[function(require,module,exports){
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

},{}],334:[function(require,module,exports){
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
},{"_process":318,"stream":211}],335:[function(require,module,exports){
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
},{"process/browser.js":318,"timers":335}],336:[function(require,module,exports){
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
},{}]},{},[150,151,152,153]);
