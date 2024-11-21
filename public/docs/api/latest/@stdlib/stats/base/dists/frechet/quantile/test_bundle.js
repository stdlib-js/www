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

},{"./float64array.js":13,"@stdlib/assert/is-float64array":31}],16:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./uint16array.js":24,"@stdlib/assert/is-uint16array":36,"@stdlib/constants/uint16/max":56}],24:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint32array.js":27,"@stdlib/assert/is-uint32array":38,"@stdlib/constants/uint32/max":57}],27:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint8array.js":30,"@stdlib/assert/is-uint8array":40,"@stdlib/constants/uint8/max":58}],30:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/native-class":152}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/array/uint16":4,"@stdlib/array/uint8":10}],34:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":35}],35:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./ctors.js":33}],36:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":37}],37:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":152}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":39}],39:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":152}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":41}],41:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":152}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],43:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],44:[function(require,module,exports){
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

},{}],45:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],46:[function(require,module,exports){
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

},{}],47:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],48:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],49:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],50:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],51:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/ctor":94}],53:[function(require,module,exports){
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

},{}],55:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],56:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],57:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],59:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":60}],60:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/assert/is-integer":63}],61:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":62}],62:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pinf":54}],63:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":64}],64:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/special/floor":73}],65:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":66}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":68}],68:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/assert/is-even":59}],69:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":70}],70:[function(require,module,exports){
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

},{"@stdlib/constants/float64/high-word-abs-mask":44,"@stdlib/constants/float64/high-word-sign-mask":46,"@stdlib/number/float64/base/from-words":98,"@stdlib/number/float64/base/get-high-word":102,"@stdlib/number/float64/base/to-words":114}],73:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/max-base2-exponent":50,"@stdlib/constants/float64/max-base2-exponent-subnormal":49,"@stdlib/constants/float64/min-base2-exponent-subnormal":51,"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pinf":54,"@stdlib/math/base/assert/is-infinite":61,"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/special/copysign":71,"@stdlib/number/float64/base/exponent":96,"@stdlib/number/float64/base/from-words":98,"@stdlib/number/float64/base/normalize":105,"@stdlib/number/float64/base/to-words":114}],77:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./polyval_p.js":79,"./polyval_q.js":80,"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/ninf":52,"@stdlib/math/base/assert/is-nan":65,"@stdlib/number/float64/base/get-high-word":102,"@stdlib/number/float64/base/set-high-word":108}],79:[function(require,module,exports){
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

},{"./main.js":84}],82:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_l.js":85,"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/num-high-word-significand-bits":53,"@stdlib/number/float64/base/get-high-word":102,"@stdlib/number/float64/base/set-high-word":108,"@stdlib/number/float64/base/set-low-word":110}],83:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_w.js":87,"@stdlib/number/float64/base/set-low-word":110}],84:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./log2ax.js":82,"./logx.js":83,"./pow2.js":88,"./x_is_zero.js":89,"./y_is_huge.js":90,"./y_is_infinite.js":91,"@stdlib/constants/float64/high-word-abs-mask":44,"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pinf":54,"@stdlib/math/base/assert/is-infinite":61,"@stdlib/math/base/assert/is-integer":63,"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/assert/is-odd":67,"@stdlib/math/base/special/abs":69,"@stdlib/math/base/special/sqrt":92,"@stdlib/number/float64/base/set-low-word":110,"@stdlib/number/float64/base/to-words":114,"@stdlib/number/uint32/base/to-int32":117}],85:[function(require,module,exports){
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

},{}],86:[function(require,module,exports){
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

},{}],87:[function(require,module,exports){
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

},{"./polyval_p.js":86,"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/high-word-abs-mask":44,"@stdlib/constants/float64/high-word-significand-mask":47,"@stdlib/constants/float64/ln-two":48,"@stdlib/constants/float64/num-high-word-significand-bits":53,"@stdlib/math/base/special/ldexp":75,"@stdlib/number/float64/base/get-high-word":102,"@stdlib/number/float64/base/set-high-word":108,"@stdlib/number/float64/base/set-low-word":110,"@stdlib/number/uint32/base/to-int32":117}],89:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pinf":54,"@stdlib/math/base/assert/is-odd":67,"@stdlib/math/base/special/copysign":71}],90:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/constants/float64/high-word-abs-mask":44,"@stdlib/number/float64/base/get-high-word":102}],91:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/pinf":54,"@stdlib/math/base/special/abs":69}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],94:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

// EXPORTS //

module.exports = Number; // eslint-disable-line stdlib/require-globals

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

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/high-word-exponent-mask":45,"@stdlib/number/float64/base/get-high-word":102}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],100:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],102:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/smallest-normal":55,"@stdlib/math/base/assert/is-infinite":61,"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/special/abs":69}],105:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":104,"./main.js":106,"@stdlib/utils/define-nonenumerable-read-only-property":145}],106:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":104}],107:[function(require,module,exports){
arguments[4][101][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":101}],108:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":107,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],110:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":112}],111:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],112:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./low.js":111,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],113:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":115,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],114:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":113,"./main.js":116,"@stdlib/utils/define-nonenumerable-read-only-property":145}],115:[function(require,module,exports){
arguments[4][99][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":99}],116:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":113}],117:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],119:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var ln = require( '@stdlib/math/base/special/ln' );


// MAIN //

/**
* Returns a function for evaluating the quantile function for a Fréchet distribution with shape `alpha`, scale `s`, and location `m`.
*
* @param {PositiveNumber} alpha - shape parameter
* @param {PositiveNumber} s - scale parameter
* @param {number} m - location parameter
* @returns {Function} quantile function
*
* @example
* var quantile = factory( 3.0, 3.0, 5.0 );
*
* var y = quantile( 0.8 );
* // returns ~9.946
*
* y = quantile( 0.2 );
* // returns ~7.56
*/
function factory( alpha, s, m ) {
	if (
		isnan( alpha ) ||
		isnan( s ) ||
		isnan( m ) ||
		alpha <= 0.0 ||
		s <= 0.0
	) {
		return constantFunction( NaN );
	}
	return quantile;

	/**
	* Evaluates the quantile function for a Fréchet distribution.
	*
	* @private
	* @param {number} p - input probability
	* @returns {number} evaluated quantile function
	*
	* @example
	* var y = quantile( -2.0 );
	* // returns <number>
	*/
	function quantile( p ) {
		if ( isnan( p ) || p < 0.0 || p > 1.0 ) {
			return NaN;
		}
		return m + ( s * ( pow( -ln( p ), -1.0/alpha ) ) );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/special/ln":77,"@stdlib/math/base/special/pow":81,"@stdlib/utils/constant-function":143}],120:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Fréchet distribution quantile function.
*
* @module @stdlib/stats/base/dists/frechet/quantile
*
* @example
* var quantile = require( '@stdlib/stats/base/dists/frechet/quantile' );
*
* var y = quantile( 0.3, 2.0, 3.0, 5.0 );
* // returns ~7.734
*
* y = quantile( 0.8, 2.0, 3.0, 2.0 );
* // returns ~8.351
*
* @example
* var factory = require( '@stdlib/stats/base/dists/frechet/quantile' ).factory;
* var quantile = factory( 3.0, 3.0, 5.0 );
* var y = quantile( 0.1 );
* // returns ~7.272
*
* y = quantile( 0.8 );
* // returns ~9.946
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( main, 'factory', factory );


// EXPORTS //

module.exports = main;

},{"./factory.js":119,"./main.js":121,"@stdlib/utils/define-nonenumerable-read-only-property":145}],121:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var ln = require( '@stdlib/math/base/special/ln' );


// MAIN //

/**
* Evaluates the quantile function for a Fréchet distribution with shape `alpha`, scale `s`, and location `m` at a probability `p`.
*
* @param {number} p - input probability
* @param {PositiveNumber} alpha - shape parameter
* @param {PositiveNumber} s - scale parameter
* @param {number} m - location parameter
* @returns {number} evaluated quantile function
*
* @example
* var y = quantile( 0.5, 2.0, 3.0, 2.0 );
* // returns ~5.603
*
* @example
* var y = quantile( 0.2, 1.0, 3.0, -1.0 );
* // returns ~0.864
*
* @example
* var y = quantile( 0.3, 2.0, 1.0, 1.0 );
* // returns ~1.911
*
* @example
* var y = quantile( NaN, 2.0, 1.0, -1.0 );
* // returns NaN
*
* @example
* var y = quantile( 0.1, NaN, 1.0, -1.0 );
* // returns NaN
*
* @example
* var y = quantile( 0.1, 2.0, NaN, -1.0 );
* // returns NaN
*
* @example
* var y = quantile( 0.1, 2.0, 1.0, NaN );
* // returns NaN
*
* @example
* var y = quantile( 0.1, -1.0, 1.0, 0.0 );
* // returns NaN
*
* @example
* var y = quantile( 0.1, 1.0, -1.0, 0.0 );
* // returns NaN
*/
function quantile( p, alpha, s, m ) {
	if (
		isnan( p ) ||
		isnan( alpha ) ||
		isnan( s ) ||
		isnan( m ) ||
		p < 0.0 ||
		p > 1.0 ||
		alpha <= 0.0 ||
		s <= 0.0
	) {
		return NaN;
	}
	return m + ( s * ( pow( -ln( p ), -1.0/alpha ) ) );
}


// EXPORTS //

module.exports = quantile;

},{"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/special/ln":77,"@stdlib/math/base/special/pow":81}],122:[function(require,module,exports){
module.exports={"expected":[18.47306905965355,0.6161062110736722,98.67611041536367,6.946391791105655,9.861281734976453,21.497394985130864,27.37070981688419,19.21227611164948,16.36330861800196,7.695795800190012,1.8548041541979006,1.2269143614469278,24.18951391323029,6.443847219452532,0.42156152322650386,15.769863604672855,8.816883681621027,23.5594693588905,25.263493971804127,12.197014871277048,0.21870835694637294,8.69325809916069,17.85686487532299,16.23428228958495,1.7213466649152194,12.311190003552891,15.744232024055622,17.310687269711863,3.611268866749501,8.247499363249547,117.50010804660951,4.7270587650208435,13.385130716395762,0.34341356640116016,6.092569583295335,17.75113684199432,1.3967664790155596,8.012069121265807,7.994680243118643,12.850532522704249,8.898087027935581,13.27087740010942,4.164224305220956,3.5904043791437106,18.039036964825858,17.362158767883535,9.560666394506747,10.162997242428292,10.964789580536443,11.58473471186597,13.91654693779367,1.004893384226705,10.686079369850496,10.494154898636994,4.535550074449156,6.012640341277085,50.23803939250794,8.289810690294447,3.2402376176558714,49796.87803745239,3.4121066602907946,18.992660159651347,3.008937744343054,17.69845011452156,2.445371584192927,9.798737036296364,1.7231963500228042,13.092776641395972,16.023868595864315,3.1206055587634065,16.411941808316858,20.271716946400474,12.73041493303708,21.946699851278094,10.206450672402134,14.672377500135793,18.243202355022994,16.087554438558275,11.783538441364716,3.720543725753295,4.934644934814916,16.705503712653506,20.198363367901514,4.342940485660334,11.107600319873344,12.554037288436769,19.590553757231,11.558634112558536,26.535151310499113,2.6466638180998365,15.171028691019671,66.37119434059314,6.647089437590375,7.451682994629108,15.451337044390637,1.3576019839512001,2.8239092822641796,2.762512149915426,11.410104478780786,9.132774285161437,18.394674783189323,19.23418564840557,16.220387781559896,4.051397334686841,3.2801853453451884,17.415829578255842,12.643826895904816,4.398351832510816,14.912801186118873,2.2964041092932197,3.0424574782273868,10.47920873017535,7.288655353941911,8.40215390765698,19.381146338869122,13.928430283580006,4.48166970087223,18.705197203803984,8.902978754052182,4.703471634083733,11.767191739077061,0.03555929774775654,12.364072449576922,15.144982038839485,13.791771193667481,9.79224828754768,8.938597379696889,5.583234525328512,0.8163374563734104,4.933001145650811,16.676213865133963,8.426955478149782,9.190231666614265,7.174944998830122,3.138111192245321,14.772983522192366,5.77304118663634,15.619683154790229,508.19756139254685,11.2894104638821,1.4647641968385006,0.40170682162958876,1.2272274964939034,11.187199073235563,13.912664117632866,1.1117990237339344,2.253431428018979,13.645741085603659,51.70723479379296,20.794700258026364,8.389263382619852,14.977912709072534,3.654984090203616,5.947861979732233,8.47501360709594,8.135035569041982,10.082697942314404,1.561416731710773,5.061312865032247,15.736668291908071,2.857465109282995,4.7217384753223195,5.23047468647368,0.04635285135061496,20.21025135210197,3.4260495597550835,16.082780352495618,13.99440401788845,22.828934980016907,4.89594620264678,16.35016409901248,40.58081539932388,8.640753921850449,0.37962229900244193,6.913337068496849,1.9680566770204853,16.541240204840985,1168.443962131962,5.2417328174917035,18.88959238602461,10.895717601416095,0.7445974933073825,25.476491545921444,14.380146243764523,12.68391395407953,8.64090208568658,4.575408498452893,12.747135615018392,18.91480328104984,17.874352439403516,1.0766526885162753,12.710938419519541,4.2203558839378665,3.5430104487061405,19.096729866032444,4.358601242731506,2.0671755521334023,5.481575768273802,5.902862804084426,12.257929046087938,2.5483418228224197,10.833673270488168,11.774370656216169,3.712682593972423,5.958531936670701,2.254906835043526,14.963243918361664,11.724556340223069,15.276672300009071,18.472667445307497,12.20075377227615,9.57242285052949,19.540560262373038,5.990131825626547,15.052125263352025,2.3098955255615152,37.090467477861225,3.6596907699778423,16.892127896884602,2.6572828132886532,3.4478275810440766,72.21604015817253,5.421482057275238,15.262251737855365,1.0449257255228066,1.5202582237638593,13.840939341919169,2.896611576182955,1.0849770663472327,9.206651079426882,11.156369110399975,3.716073206258925,17.177509337569877,9.990264135584598,12.730647686368878,22.46464466518898,2.2433021088612484,16.973299045734468,10.18616974400077,5.632936416101108,14.510460661632886,10.628138515840318,7.902563159922674,7.439950346845608,11.654183711202194,93.12656178095642,5.545000627212075,20.41883062629944,2.5821672882026276,9.854019936528413,17.51996871853001,3.11726600902003,5.248131415101226,9.20053922701544,24.478338065942946,4.310546780548853,16.329643087308742,20.223351142196208,2.0976798320056784,10.393376441053075,16.985480285353404,14.349026390258171,11.001905742921657,14.724989058044038,2.2848723014284937,18.440166605922744,15.990891788092803,7.33038644168662,8.6592522784285,4.663410500658928,17.4576273368253,19.859163723698146,12.834381152109582,13.0654294916544,6.053735338016626,5.111592432230591,14.483779656996447,10.826281902195337,1.1397235351130592,17.677360012107957,9.520001996884545,17.72928718517424,9.477845577764041,8.651495176725767,5.476328209768487,27.91155137035578,3.741435888541058,6.77206446079411,4.815773492301881,8.57033410295079,14.926652346834109,4492.314934183805,9.531455890732268,5.877747474736874,9.354439674215287,6.345291347782097,13.486652007191758,18.653757982731495,9.2710572142771,12.853013754647625,16.706560235389485,35.683616113337806,18.038939534135473,4.3210263403203735,20.38192806413764,3.7229781334085943,10.296433116539035,8.619605293502148e8,13.520902026406823,24.21482810614133,5.257203547026504,16.939405231834023,3.4998974827089238,3.8375185916749777,5.249745305562619,4.258432791379515,0.19834615045157095,20.424211256444877,1.0905758656632596,26.716706870145394,0.3726287818386204,10.433080197897816,0.45297946423225344,19.80772096205705,13.406991114848383,0.1675383696349059,11.169492212059197,17.917185115343134,2.555282101370746,25.49394904346579,13.971041822948296,17.24311134586536,14.642974681977321,10.670740999859666,3.2925109575445757,2.0412282326242503,8.545013189562635,14.704708389959288,4.524378500970898,14.541919293957827,11.315705684316269,0.6940346388051732,0.29425741662231425,2.1578594830818694,13.983702762552118,18.592115887882148,4.368059242240104,14.55530932224451,1.568733819162044,7.1042939040742965,37.106291006114255,16.44681236436787,13.878206572540028,13.17382119992361,17.029851785332855,19.472491664800803,16.088741983021837,0.7921509395704468,2.50926120203051,11.428484635245292,8.81652866163227,2.380086518775416,16.557011991255322,3626.223534982135,4.562261140541886,13.537242123727673,2.2010378002479665,71.93813540486471,7.854531034768408,3.7901888053419563,17.65842742679459,2.4159423382873024,19.61831888009947,2.4060769476746513,32.60607023874317,12.388680996532253,11.330091445344054,9.023524308283681,28.650313588359776,15.442402865129745,8.426425524022562,9.03597585444175,8.788309934571139,4.642637525504369,7.736399988635129,15.69224400984792,0.08661904297634633,1.7019238916925064,18.688465327833697,9.705233151555694,7.2223938629248,19.897536514750996,9.259388606830111,10.96723946861715,5.388674134543343,0.30454690775416,2.748059191823579,38.72726510439525,3.3906294300127606,13.434854818551392,6.001327924553115,6.746933211703003,15.79621752283832,7.354908769777507,8.079368910220357,11.898575445174261,4.676538064966255,5.045422662046888,4.347448653776181,27.786975374322456,7.488754010752854,11.031656520533708,12.401111204697115,10.910002095533246,7.982070026893456,23.059333410325227,4.235945587838383,15.694038204441965,10.424542941789918,34507.88419697718,2.1814487008688026,0.39006826411505896,4.549935596034014,0.10311751637093441,9.671347093409047,44.06493864076672,9.301094069763307,0.7232166190236253,14.961380753543482,1.9472073559734708,14.066605709361754,21.749885340776196,13.514567818492587,8.308787495677741,17.929019492886827,2.6801505479827106,9.39209920495059,19.265602555333388,10.244606634965887,15.587055048004578,10.158998753523598,7.43260920835484,9.186565763351009,9.726565420668422,3.3820016532270762,12.900612711307954,12.396411684875744,4.30537744654129,11.73166622331024,5.902373298715451,2.171038726872249,12.51486382145292,0.3143211817165175,22.083527857567322,87.64344403613427,1.9704719087170304,0.795490265114917,14.87068311655981,12.08338821940353,3.8376826558537274,10.29202532255437,21690.3348149267,3.5531873050155425,5.071242345288295,3.0968620576803514,37.64284112266955,8.672337905705248,11.229823503442251,6.411935022780465,16.156522214166415,11.848080401404497,0.8967568142196997,11.809816423692824,4.607645473343316,6.083982538467832,1.957725667347859,6.846495665099323,11.672028842232763,7.823206384055565,12.860399536865268,11.558066001995854,14.497534434697029,3.9978524283240744,10.313469336583879,18.681349640388365,10.524482937182343,17.185324516898582,8.649805536791648,0.5880462303429721,2.605135078091163e6,1.123051219214719,11.13038969487656,16.23348485052808,11.768849488741822,18.413944883721985,6.086352237003423,9.973965067040377,9.183204209971098,16.293771049799513,8.103223669717233,1.781111301035687,261.0243420906301,7.406700387740894,25.817970133700648,12.63127670627095,1.8003778043278573,10.007905216640589,243.71146719467552,13.436175373310293,6.4669996335291575,3.482876537185414,11.978636032093616,25.161071535618603,23.859815384499203,1.5854169931338832e8,11.843590789756306,14.989061319547451,12.432718540960948,52.84295417840988,6.633110179137421,1.2508926908609392,0.511796865777291,17.46482167257182,10.635157947449215,11.363107493064488,15.008492769373618,20.849066242706723,45.612297824095535,3.140061268369402,17.10813096847073,2.2514181429527,0.6411154789106625,2.4589977331168136,12.979354898795261,16.40701738918163,37.394301341353945,16.76285095567155,10.695457650445379,18.98732078438146,14.816908624389676,7.663400821287696,15.610940630803004,19.473475769141203,7.108470022083248,21.82084061721104,12.388164335972819,18.982488513439083,10.138840015311304,6.70622832986149,2.4838858549669203,11.015778682536787,16.699038679429957,11.188920827362203,13.264347983948804,15.719292368097477,4.0245612309841,13.527938710173418,12.636145966714531,5.120879205083099,8.295832783058929,15.490628848562332,10.727524236584232,122.2585520748837,15.918275754092003,1.4904655676621328,5.41686419295181,8.43991549759256,5.473050903825066,16.375099501866746,11.957962403188798,0.521013769823997,36.12589929350615,0.9150962237837674,24.223449308657425,7.168913546166477,2.8006856546159438,17.39030772656072,15.25796997295258,0.43088418586411387,30.226192433226917,17.574210890076206,13.639900746332549,2.199391317089736,2.1319390991614884,35.69786117605168,1.9062859632688396,9.719407902707925,5.916250214656721,7.608285421380084,5.165850046813691,19.865220611521355,17.11084641490798,0.029891335707198048,2.730944895261266,8.186506662310402,3.1891100491216524,3.7432462418746986,1.671500648166493,6.584077642196002,14.101511250877877,251.83126816002667,7.235744751949099,5.127220360314603,20.395784054122846,4.879994440245179,1.562478954470017,20.249192897673055,5.177274897304501,7.526725106007143,6.5995115238643995,14.093592592328044,6.838116044176617,3.3042360376967768,9.989106967301101,7.120337380281422,21.729020462460344,4.080963826550471,2.538778658869011,8.584408410651054,16.160956005827977,18.52088739341225,1.198288219163419,2.9366657803854106,39.28435414291218,18.43508386724857,6.514563919757806,14.930762727736912,3.1636557766763875,6.7741924734493,23.485362690539922,16.083795634395326,16.474767978177706,0.33485972031000866,18.245410154012088,8.334618266327873,1.1436602734635255,5.432557612399653,9.009499291822697,15.354357368994323,8.748057131499932,28.79443598118668,1.778154519221946,20.309607588798556,15.644589605134161,17.46806925470897,18.614903052581578,19.273347885899128,23.545201463696703,2.5923085555832603,9.83560355676108,6.169468061009162,12.751826535290004,14.627388883976886,4.167180470138135,15.089808248364998,6.642097594697956,3.30823856751677,5.13530534192681,12.122927934595484,9.87393521141919,9.336719734906131,5.514723874878541,0.8919883456508756,2.6043753342061007,13.383683250691414,3.9806319780848645,5.618489697511889,14.959280749444442,20.23842041728825,7.133454572822897,18.314274781149763,13.359048472173756,22.909574317739892,5.6125109089267875,2.0061558273239566,6.437390054128993,17.944433908462965,1.3743364611859077,11.382789096335657,9.786631145270693,4.517646978782381,9.662023213717992,10.333807605130053,25.290472527272858,9.708025851074558,24.08279905706176,8.996738140192571,12.036266050230077,21.498887541286155,31.931397183656,7.26437656343815,8.170452924043675,2.5653639256860643,17.73024358521239,11.362361216551678,15.302408613113428,5.745223365213433,12.796693999343393,11.002422574862903,15.184078675231458,16.63704011177434,9.681816118408747,4.0277949654809095,1.824054865213513,18.933487687468208,1.6000701449795511,8.140570812336945,20.262476586302178,4.783874303860857,15.125406877418289,8.984797900290445,9.623019217538847,13.714625326860368,13.276538523776624,24.986056573289545,11.55574937776904,14.355717740003342,0.337493458184101,9.068358753687333,1.221886727814967,8.59418709148496,21.61679373442552,8.799169019504307,3.880344622066343,16.386992248853744,2.807370170796867,52.35559052903185,1.2878041490440089,6.184878058845568,12.75594707565292,10.621787638274215,4.762083887711098,18.534086337217715,7.434604825384127,18.450776922306325,5.681610848948983,3.9924976650273223,18.457148501647872,12.923731410268335,20.048120086561575,19.773043104874578,14.827872744675883,17.948649557130576,7.953894861419899,6.164739292022102,7.4787761655008325,10.818530924104156,22.162077883472143,12.07054951531189,20.994897500930307,23.72964176074608,2.655770009876132,12.759266065642263,5.191849687050282,4.135276970085901,6.561863545856874,7.220317923160659,5.765604458037777,14.322545474838599,15.95266767052305,4.553321289890992,7.132183635998106,20.582695041468607,0.5046837788295272,7.734834540112797,1.5170768034372835,0.14882343927038721,18.69611195830186,13.817474200152661,8.719632477017617,13.471574944593652,7.313387041952657,7.784201240718448,2.239578301436335,16.591929446690482,3.6164816623285914,10.687171580835267,5.583061537607899e-6,15.923498278200256,19.632079972108972,12.56679199194044,13.512984254147563,17.74711781402721,19.550896678770638,5.981791052131739,5.724834992289237,17.56013802065019,1.7755312733775335,20.527683415148598,5.663053844883899,23.41021706390098,13.378936246320436,38.64760079456218,7.4156675724703005,5.00629753551506,12.696905936501098,12.109121270139468,2.1753063284942984,4.628756343220289,1.7011845676168509,1.274998435305963,3.931725501433857,31.81636774838287,5.186264468741451,5.673826624864975,2.1288013954175593,7.498574041435094,3.886638182490375,15.096792167196185,38.635310534854575,2.7099750077292257,1.8048828021096701,22.230595288753698,2.2719962698803857e12,1.3554015234529948,1.4221792777609423,7.717887115195492,3.7248390527621944,9.332255355716635,19.882682874584226,17.857182021915833,12.611316433197512,3.3479532850596847,23.38361855344092,16.688712070364083,16.527696213493034,6.495987945281835,6.77773298005972,6.44584990400895,17.769232678059005,10.42492870934374,4.911883841927087,15.568065183568237,23.959925194993048,12.366631238098305,8.776766266032057,7.05626136249918,15.34457543424863,10.291815883853788,1.5494856523234264,20.703996437180727,19.285173977821223,8.63953076122781,6.455826538411624,12.55451413929373,8.299728394498983,23.1824114062799,2.509970321654991,16.894575108863663,18.98277063592242,4.972690312341558,14.13352085309928,11.5857494125165,0.42487476858758544,12.4922135755694,10.467974291102278,1.037181564138995,19.075554802234024,0.93954580176176,0.029223517373765228,19.29285191738669,9.957551492237128,19.196861134705422,4.389476554403205,0.8705063805848208,8.182148416013574,7.708257544431542,4.81803848634248,2.1365565538612716,8.188982647859119,23.6024147156757,5.148610780939832,17.655039867796475,38.95013972362733,6.243458959370463,12.181957858682507,5.774285021591439,5.652923393941662,11.835194182275155,13.078388872442245,10.98859524930543,13.407300354066347,12.162254827815655,0.25545550304807363,5.543043667483376,1.398013399902912,8.268926963222777,5.840923709057634,11.55914902639005,4.30835678178896,21.14590263703337,4.236306657770425,8.769416493752422,16.494546958850258,7.834583088229782,9.634542646726874,16.16498423632039,6.439297852769887,13.745749698466321,4.811586118321548,14.10729905082556,18.599795605622468,4.848228173520658,16.297542453204592,6.028916758372734,11.534856577378182,9.439931283902226,10.219811066835174,7.80033212823894,16.112872073183176,2.2729096321081097,14.400981922332525,11.100765618320318,5.809919474370837,18.079748463512388,8.65823515122186,12.94997609750919,11.477165747204275,11.269395768114714,8.189593867426302,13.81798834560828,6.781710770411298,5.7218243400544155,0.9179998561353683,7.934588384092658,16.476710281883165,7.9467953504001265,21.23157550960053,1482.7829680040463,12.851925562369809,14.710296623110796,9.50667830389095,11.053018230433405,11.251091330258925,18.68123023805361,17.144701970493504,4.63434487897119e12,3.6563476611372523,6.975658575972917,8.025019515911234,22.98265555618677,6.620122170212201,18.141675619041685,6.0957345117184225,15.98906924151351,30.471023226977906,15.247341820405062,1.5171992138762427,29.025899118154516,5.892356207029621,8.639492727275394,15.484541886251113,12.362370481879495,8.197227542894554,36.13696203057779,3.3516701058672553,12.724624743476657,0.9585400490265069,15.801299812107215,14.77646959250453,14.872355352751775,18.16754775341845,13.375521494296727,10.628542784833174,1.8766784640264693,14.02957525163255,18.02274917237287,15.778397132787584,1.681149919422451,2.9203209738409903,7.060622287656831,36.684054993509484,14.35090024023765,6.263884469407413,2.6509157878480236,11.529794412721984,8.250438005793246,15.424474246760878,8.005912328856024,5.344327187698837,4.174802325380319,9.661727254117515,11.538773897356217,0.24175730848147095,5.980060968931287,11.116557553271118,17.91155104782052,0.18396054682111565,5.763458586380569,2.5242624916785856,15.752807539398423,15.462958196226126,6.952884355149527,1.9745159841642326,16.521920958276002,8.07931439898824,21.678674414715882,14.599776107522684,1.2493663530276355,15.238154204062468],"alpha":[15.412597572024191,17.202751620474267,0.406277799411896,17.029548356786957,9.548038823719649,2.8471401393754725,4.3418159273415435,9.492534699153637,3.9533730479534324,5.514710280685748,6.053999331814892,14.722980250601116,2.350699627168167,19.900555288231928,2.089763669759286,6.590650070358617,10.539094545369325,5.483825279931773,6.1097972070787065,11.051843231015347,16.228443980578678,13.040535005316109,18.549355734209737,12.122701426809627,17.215625363633134,1.0187054010218954,17.25564043031568,19.014631007760027,5.800474071597468,10.61920354415454,1.7811860086053066,11.017578970170163,6.478382060418624,11.408126079919438,19.354789569157713,7.972053259870133,7.992523429243468,13.647206392102284,2.84173851101444,1.6130843868310274,3.1824683167443357,19.575558133893853,13.404311005334444,11.828090878333715,0.41163267999418274,5.055980579596997,9.279291337947054,7.756546122988466,13.262184968349064,11.22256124244962,10.756338769211267,18.171772905953706,12.961338191435644,13.376944379625368,5.007188300332368,13.417317894578673,2.5931640070997686,19.809319707964814,14.119392380469904,0.3363336347960333,16.523636952370072,8.184630388501999,9.749095088638754,9.052670092546297,8.302952031328012,4.799393585156939,9.511322133839762,7.413539234759354,14.882690380457158,2.532219371903315,6.364876309126397,17.267857396903985,6.07831735944115,3.521451335237895,4.405532676593262,18.16969707715053,8.082918399337196,19.785211514998853,4.9950722845824025,12.875790773370564,17.483129821346587,12.86507729388575,17.390987566421444,13.977167744036212,4.092389931224312,6.6939217388181715,17.565597788319938,5.4615357163872025,3.3657438897034364,19.74114252078074,10.475545187238469,0.44222114319529826,14.039392179080178,19.211602882253622,17.680844965957576,14.420667879180908,15.820633670976827,13.404511680204362,9.397818281575972,13.06308617926813,5.161331981379829,18.928960951438278,5.777011139373158,12.301089046133349,15.103184426553522,13.759099057173216,16.024394166261867,15.120636006790642,3.20552840264269,14.371371217944562,2.461718077440338,17.22405337096685,13.423090608568465,12.763739581526101,11.307436676242496,7.9686674729179385,3.8524859460459027,15.93088950405319,3.0199582192539642,16.771950348621992,6.406910768857768,4.834409965835298,13.607385330034546,16.2914298920068,3.3330811457082543,7.859434013458926,12.607911019558738,6.785050149649439,10.234531149941958,11.1680582607428,12.016363446135973,13.874119996531284,13.408946362403341,16.62835115006129,7.793593006382489,19.39761744115422,3.8095181752523066,14.848954603372215,0.7372416592606434,9.928601023346847,16.716421537469678,9.64857070898237,16.61124302621571,9.586015377997184,5.8099512797150465,7.763249446390281,0.36584447734491654,2.562986225575856,0.6026682476099454,7.243315650515902,7.899500600232017,6.401321095923778,6.94891831282356,16.783221425274476,19.622842354371546,18.806945463308352,11.935267866919425,17.680297841447313,10.678256873024704,16.468532014767753,13.371633280753974,17.71167919308782,16.987157615362282,18.9893546715321,17.330699350042728,9.144543013506002,7.111172976084754,12.067219358089393,1.044777054086783,15.273306196681148,8.294321247910933,0.27647130580719104,18.0766233724244,13.896428940776389,0.8891951825763611,14.710232016466126,12.719787311917923,0.23202553063239595,8.31344023571923,14.633901244942953,18.585015477974665,9.635992754415238,2.1987210734465323,18.81861973761807,9.83628668285772,4.986717286582096,4.455800391792621,16.25939337519457,14.641266339621005,12.441241245620844,19.778652722232138,11.709218855534932,9.484716095997761,5.884124547066576,6.820472249430556,17.0799878958616,3.4716311938109,5.764359063843716,7.072364105497688,9.368518367938975,0.8359435317647179,7.420724160659864,19.666362522414428,18.737874526473952,5.627819125089912,5.821015310725199,13.40145640926833,2.556824511529796,8.813058716961848,13.836693076948347,17.918699431179007,14.22438600837095,1.9855633481600021,3.494687237832741,7.72352982001046,4.591135472623562,0.3756559657154668,18.83019393249134,17.725772238131544,14.02364113355258,14.171249030085619,0.1218665435419819,5.968522937201315,0.5691832430063348,2.8080647595077357,4.811806339383478,8.627934291968788,7.2367915880485745,7.114361725780847,7.907535325992554,4.748872457636661,17.788652271112404,12.396305019897866,6.227773564837644,8.927196363258618,10.463155430173527,19.766019215623167,9.495223808359308,3.7942125193170506,17.02559110870986,15.017129889414784,19.77308610660931,17.361561619880014,13.839726866342815,12.051771721310667,0.851456288251673,4.587710552509567,4.304565750199738,11.489991656214652,13.142991227879822,4.111276704077365,7.054207819152287,5.202725960472954,2.173983989682564,8.297731904193126,13.072215715967662,5.512637624543215,1.361429648569774,3.205323168994596,8.004280302979181,17.685250780864674,16.060694896337097,7.170522907784478,15.874111612169393,8.44236839482817,11.891418258097172,7.681590505271854,18.78985668450641,6.92660899813375,18.406970590580958,10.478186529535352,8.962954963251946,17.71740319936994,11.921276439612644,5.236550296266853,18.67129512776755,14.16630232517206,11.416623982998342,16.86758788477988,15.916165443853906,14.693460574682714,2.4576758637135576,3.394078500134108,13.489323885593096,17.963022527548837,3.1507546435942713,18.657076984628613,6.610263359135344,19.422224482578216,19.172923897547687,6.17387885443593,0.14155059514718182,9.18586774107716,6.9800366725384855,4.023144921974047,12.425983886225897,19.020436216022652,16.589472761755225,15.301675814863454,11.399624303155974,16.148011196905987,4.304604461912858,10.896354476643872,13.804341257579376,4.012312891695422,11.050962940117257,12.054763729739296,0.04516309368957305,11.707929519228465,11.851425453876558,12.1415682315435,18.857918596514228,13.404908444542079,2.1215712760886563,17.381836734910042,3.47082533655656,14.354126730613972,1.0334585990217215,0.11062769780425086,2.4218266375504838,6.489945735758167,6.0343218110778585,16.779262677961807,5.253793732220817,8.549780306357189,18.2317905969385,6.053661133997021,15.70551894450475,18.737745938344776,3.222114113662151,15.145675560985676,15.249828009638154,8.257595125346766,7.812547891152994,4.935086167003266,6.076935665611312,11.2887379442168,5.1989850717199015,5.778900872735471,16.677077883746016,11.957446528660135,11.42928643900191,8.137281933426728,0.5405158186738657,1.7230189726814338,15.452967116972536,11.7979294123369,15.166790964411279,12.136966199914392,5.646159630911853,0.5046686511595011,4.459853982296171,19.83795257453552,1.227128423545718,9.34006589072402,4.09511959607284,17.04819929748719,12.637928912312493,8.776123924415021,16.91904916495298,16.28346720236806,13.378629431224063,2.390528367415956,0.30655857905996786,15.701186924621847,17.48474226359359,9.381039492264062,0.12283170318340808,2.3151480885645137,4.711318967616855,12.264533890629533,6.144743387085545,14.668528693495041,11.751560532275853,7.764855262775532,16.701278211510633,19.544506598338067,19.768326582384923,4.330333814299987,4.906988576921121,16.4400303276011,13.330808256583282,7.0829322090235936,3.174108353476619,6.214961783965691,1.2151475448079463,12.407319927438337,12.039200279158045,10.309831794916464,18.031900157245303,5.101386411378432,13.423518269029898,14.99189881808122,16.60660694987962,6.12816115377651,16.96707659403454,0.9835704049059224,1.3333052512863341,3.66920267213541,19.028786308295004,5.054266706748636,10.060588300394432,5.624331737462613,9.21168875634702,8.9598620956294,17.33342653577344,14.018838765664041,16.013037730762388,10.005063625726937,2.461301977737307,17.283948306533663,3.583844330142534,19.268977645969613,9.704208745399967,17.000742185976286,7.975378110114155,5.8884410275383114,19.210144059199912,19.006575268206074,0.24094043502867812,3.4026170619836416,13.636393281778027,9.226459459469343,11.722995405466952,8.445166438687535,2.134106890014822,6.938429874184502,1.7807225842964058,14.227105041333118,19.680537609401554,2.326585011393054,7.434708446482743,11.998761659495901,16.20624227859635,16.300625313689455,2.697849508967929,17.47134955741292,2.652569054244114,17.808825723873763,12.059365611287895,3.5106754865071554,11.742225655764841,19.701365208917533,4.651149040338058,4.966951722832658,15.337206196821413,19.917600919485317,0.7330647894785924,3.213145753685085,16.313387894906718,6.668583298777002,2.8613809777132637,16.15846831006927,12.466661046413567,2.6261651507679584,18.165906422298352,11.110837849858344,15.192743163138704,6.659127510228391,8.659280445849111,13.187725347349652,0.6055490839981159,16.794376864354746,5.353846305613841,7.505392659698922,3.132835783378165,18.30828526862707,9.41462692671955,7.026058536819586,5.212477809322054,4.0095305745832865,17.55961424395641,3.250799725207183,13.712241749840803,10.138119471207938,6.0525463344121455,8.940844529504695,8.413289522782769,5.388975831152707,14.485179467576522,10.842535339009745,16.22164512802008,16.617281262385642,1.141237562556956,5.741910305665243,5.418574538764864,7.5801012905531495,14.253427230829878,2.4140692454694923,0.397079674911609,17.31054381564625,5.968632053135048,12.274562419521695,16.91662525772496,4.688837817313036,13.161695600258003,18.31961151198666,18.72702717107318,10.673081080472663,4.424371838551617,1.6443119749130597,1.2597167336547477,4.936402082013931,7.725636657253463,10.957028066187755,1.4042509267486825,11.20405295886079,0.9317817090040359,14.031304905366877,8.703737766423924,7.53573948405148,14.305491160358903,2.3692550300424697,1.423150119888743,0.14577568377759587,3.0076313487185358,3.184460527675763,10.43686280732187,0.8546408366925728,14.333600647009703,19.35617710744061,18.149180426830668,17.19804059080395,9.977466277848048,15.071156812239469,12.25935270098859,8.352861774315961,2.349085334911707,9.831564733138901,9.56089595201728,2.0982008398064345,13.01116421798492,4.5216477741687156,13.950139221660143,5.341005229271216,1.9100736764998638,1.4579446846485933,3.702683460798628,8.9697569999535,12.218360715292086,12.716381564012416,5.815166843719899,12.550990356379987,4.658431019539124,16.385188459210028,15.59790628848349,17.82741016204449,9.670240410150708,10.57129690660771,7.2171007077035165,4.412508278478784,6.787880895503102,12.68671735989864,3.1659372746527925,10.192229484596172,10.950509912044897,12.725111217252415,8.78379729319684,1.2860906212284506,14.684798514450993,11.257024287163194,11.429429888000552,0.7524372082197806,1.9443277992661168,9.279242034747117,2.5297103433004953,7.376445202052602,10.264849928622052,11.151236258954803,10.618601553474072,1.3403855463973846,2.298519995806547,6.514096549471953,2.970524105801675,3.1058445101132737,3.738055293641014,5.789948224195411,1.943226523045536,8.855605677785725,3.523828517761891,16.669509304473724,19.18155766311194,2.14049561445365,2.750940771396735,3.8822480489969236,13.51082018488687,3.3558862691847047,15.602617743120192,1.6345258097193227,0.716723811603206,9.982641209564648,13.14347710461487,14.989759947073846,10.269076672974084,15.399701706580661,4.230532080598071,9.709795642378879,14.30808647326507,6.194610890240906,14.985874459488198,0.21639153010590828,11.911298679555632,16.236048892650867,8.930218634406032,9.433690231757241,8.92634319661302,2.7156006534194566,9.92897630533093,3.058139926151684,10.992471910864108,18.31853266610594,9.655412196866058,6.710893854015008,6.681981838836677,13.37300443120614,2.4114679758148405,4.433440258887398,17.208735486353298,8.413077949535154,13.807451620407951,8.05066235240953,13.220795707824182,14.651231388301152,1.5306103958576722,18.51124260334248,1.9252009372164691,5.7015033183560915,16.296326867658138,9.835853514324246,6.003429886334373,12.688065970724058,18.41148263700977,19.42700187814212,17.096168529627995,9.735475454819827,18.171796308743783,17.1022546827767,10.327887129225473,4.5045037428628865,12.992276027442898,2.0069282599261618,5.333432351667948,6.210258855433746,15.958045775869785,15.100385001408508,14.396419283765365,14.352405881933116,3.9738781384177724,1.245304674975909,10.99318627041145,0.8699237070007326,9.460487468667814,2.5993161880111026,2.3081654082626857,3.8228903986908813,5.99226720961008,2.8012944080783697,8.836617367254377,0.3578912648451693,17.294186356962115,7.614129764722288,18.76392537228012,18.931465746037347,19.609305758634022,8.167958510574511,7.054080127485238,2.9900431200055255,12.539925363724675,16.167891098068104,15.063247209172044,19.57702943469149,5.4027367097293855,8.897398273397418,4.419050176606842,16.647082280023238,19.130343645365237,11.758068837105121,1.4943123050700757,9.153978752130843,16.54033289553698,11.2951180843185,17.928150019176847,18.6911039588865,2.9961266441974876,7.707053101594008,5.920087143763189,3.73535761762517,1.7234789206471968,19.29224642094965,0.7946709262842999,16.37459516214289,9.987028569189103,4.4934745553394295,12.116580177122307,11.899778851379935,13.135209493884892,2.9647983826429014,18.855664937943057,18.109062573286927,3.656241457102065,16.28659087122236,18.242828979312982,2.7668602147089105,14.258846182122177,19.1895877638034,5.609501139168618,11.108034098864188,7.684223841863584,1.978630941992141,15.751663134774688,13.611745867693115,11.982131797634171,8.57301622903968,4.3554091816903595,9.324901425467722,11.06911999260355,6.040471540572607,9.548798676733053,6.357847303424564,1.8661051048937294,6.660510101388861,15.293630832754456,15.182689929058615,10.500498167833182,16.630519559623615,13.22273537597059,2.4625809146869138,6.970802112044856,3.9167334705633428,3.823315065956865,6.456237701608081,12.786048003410894,9.440548625851356,9.580928230728798,9.459320619049691,18.698831901969402,2.9866597082324997,9.852970422267141,15.078682197969302,15.64586249966673,14.4433260978704,2.9546016424370025,8.999807163211933,5.442686162598496,15.226773239427098,8.280497770290136,6.452651356617332,1.1148296121454582,17.333880803136115,11.637772368260052,2.781458414726705,4.574224080928722,2.766227047841543,10.819099165858033,4.970613738029082,15.299994895325014,6.260075836247072,15.097367743738545,2.8901888689177735,2.6809719598775006,18.96106873772915,13.857660114663211,17.00162658814715,1.8826629011252205,19.083355122328143,7.50289814589193,14.973101958060298,11.349343149264474,12.177953772031799,9.065394909409727,2.2592178130651197,1.0155198397419651,8.440417028497968,6.923207453878795,17.258411645483402,6.928083540041867,3.9090639742885847,0.07359610974573272,19.326059073920003,17.564537765862337,12.643583781625471,16.299980924856484,17.26652573269822,16.9207161584203,7.230559857054737,10.685453596313156,6.799773419057367,11.980647940635393,5.135387251130128,19.986423943386058,7.984934074691017,4.446199536498816,3.602527194287055,17.08414586841142,8.346672300832662,8.380625948408674,6.049343627566763,18.209391995702354,3.264677826045057,16.659240404131147,14.951610487691745,18.673842766231758,14.530304065368691,6.739459904661316,8.637358362880146,12.16276950765328,1.8630482677616556,5.898806865599986,6.229389669597398,0.7479491375138991,2.2234043790968405,5.865743500791281,2.4871847577904838,0.14728309933420114,0.6052508066442686,8.89777975111381,10.692169770208988,2.2992707655057254,7.598887864655226,3.018769738436222,9.386392601672808,16.088375984035295,10.529464690684666,14.755430815176446,3.635751365115336,7.406740991991119,19.41004122592963,2.7727368818554687,15.317494790563405,15.385970722566116,17.863589874536014,3.410162330478239,19.265568866598688,1.7310780600553377,3.5815382269158214,11.225494427917475,12.287458021263017,4.4047646559805465,0.47302316568923697,6.531473358321609,15.469056746348455,19.916391573215133,18.77713397160925,19.788786955770505,7.246321960115849,16.986109942950932,5.614169065798933,11.851755503675019,12.005906823588365,8.18557168656569,19.477295970791037,12.024469688391651,13.826225881103277,11.211162794426638,7.608703242049328,16.545067770265412,14.013599878580987,17.88988831241513,18.722079757548403,4.275950298381637,3.7004327772312973,9.917991169483722,10.665494714240804,5.32560548620169,15.152011489130963,2.614497569474632,13.325705815558742,6.45366193166772,4.170217528640605,3.944536032831003,9.724759916122224,0.813638658025666,8.946978121970584,0.6095976242533929,8.119633081021234,9.459488971416171,6.361232439361442,14.509098140800507,15.405051548622136,1.0744819331389355,11.252574841411448,3.4742439496610356,16.294618002981878,18.418583202894734,16.89083331901838,5.346219492697957,12.800307818894296,15.569673463029732,5.318775872927799,14.783581981680465,4.263087012961924,12.240603573019651,7.510504730633074,15.779767793379431,13.097827282170185,5.399434494512838,15.59016463755901,15.886507945940757,2.9689614054814717,0.8613064003046533,1.78478535976335,18.639618196988906,11.227561185527609,9.957093862378162,11.733159460072233,15.165107841884623,9.261106065473271,4.44873132093341,11.351780526756752,12.079995382170004,8.40355725699884,11.594573833812824,11.657940330242834,16.00638811404602,2.333949854482964,7.020767982682412,8.675572941796666,9.330636118590716,13.745027306486666,12.946144675640095,17.494256148377314,19.633350154507777,9.999969056686684,2.776278167877879,12.708559845301938,17.469201615692217,3.1301295538155705,1.3180603822707004,0.2784240338606425,4.900218130615102,6.433627959658916,8.225893413863151,1.3348141736669428,4.54852066578133,18.565190159892268,10.864229608608845,0.062972151138867,18.36034844928031,18.62355237333331,14.853403328439505,13.683875667671245,14.28172131173171,18.868656413714117,7.531320841725391,15.892230699220438,2.7007439544690692,2.5719414786475925,11.726768888472812,5.405137003502762,8.649805558333954,13.352225334092601,9.347068609130638,8.340156594547231,14.20924338732318,0.9501172188112506,5.120753442119321,11.44402700334846,3.401407697346208,2.6233630286801812,18.371685158243963,3.0800496221668894,6.3532974440258005,18.312193893191843,4.70661725961004,12.935960801745834,10.652069361688659,10.255531041588979,12.265401886142161,10.85798691326139,14.899217858180558,11.12997552940878,0.5866408029686054,3.2618446371264698,7.695953621236478,7.120333072060494,13.12477596467824,15.138204950695107,8.504678096828457,1.1886961940058027,2.008777580635601,16.119621365737004,12.317370763142543,10.021066523486075,12.808159359741031,12.334841874872545,5.547531379064901,16.980366084934634,14.197876504311232,19.85182439946161,2.5690666988077737,1.5612070613772122,15.869455839968015,12.659098847816846,9.038469138397636,13.437390756950055,18.01071730673978,2.4101805588714287,6.07349118641773,13.538697894122183,6.851641837109885],"s":[15.304428320474099,0.5768554613827659,6.230337435878051,7.204567489726683,10.991988015982841,19.58534893856363,17.088468750603994,17.70750103274867,16.892053977367453,8.624734720086353,2.290157144265983,1.1917356931083267,12.11628820734032,6.067198956671573,0.46388038577240387,14.811105658827572,8.87374024368257,18.727208989816035,13.477004933536083,12.862118301853137,0.20030941940404556,8.45472807993701,17.959965585409833,15.08484954033988,1.6352925264124218,16.030661944649896,15.46932374451897,17.575044215567836,4.264996648945729,6.658553996194563,17.803368269674806,5.088457891232441,11.237840837693893,0.35321625644558097,5.61647458462009,18.269772044787015,1.5875616610103638,7.807793339840305,14.598774997004401,8.029536260453657,2.048873428577358,12.305749447387115,4.584488266136755,3.813229135808398,19.208731332357818,18.265110698218354,7.430803252410971,10.485813098091139,11.923798966522652,11.251721297116841,14.099183874936099,0.9228972283133263,11.090890473921542,10.05492183067821,5.5907506498871795,5.884483075903817,18.208254278237593,7.8521159607286295,3.3641949912884783,9.291316507529231,3.210954989043451,15.366387666769526,2.8286043589344834,13.982204605548084,2.6640110813005924,7.217309800401539,1.7700704371116949,14.661906918930034,15.607425031039082,4.0477460289041955,18.963551745795705,19.634123895039288,8.817079361079028,13.776516635590514,9.0870313409822,13.616574173368544,11.888384778189698,16.817731009177383,10.02503411356745,2.9751445677485133,5.085936677477494,16.949007889431925,19.23983387836865,4.137148030176352,13.485001896213813,10.555889394371096,19.76005960355596,8.796126255979173,19.0435047750249,2.484157456812177,13.778825289300464,12.406463330580033,5.980538209160304,7.371737628575699,16.076677390496773,1.389778116282141,2.702059330163098,2.3826847047826893,8.78234786370518,9.071771229864346,12.092271863494496,19.246111052517048,19.413105527708936,3.5905588259884658,3.4082274780790245,15.828381900435723,11.55601598480632,3.54256830219835,12.81615807429655,2.4709699346918956,3.5098249152667593,10.273083056032233,7.229126243706143,9.23344918595975,19.799527075884768,14.890280598543084,5.153762443932481,13.939993628528931,3.753690775249292,4.617053418311277,12.215938365096598,0.020597289576249622,11.813353395984736,14.60843129741006,14.538266204911942,10.236169639284194,8.453215115641326,5.116412829578092,0.8067206487000922,5.369220125340672,15.023792937300659,8.13350090912611,8.59186554422485,7.474496657492153,2.971878852428609,13.021044310238196,7.306476783327485,13.458660944048265,15.173548658102494,10.243392268744573,1.4491830414442797,0.368095029417268,1.1889910813077709,9.796416286552386,11.21562388136498,1.0995829152625847,3.0500326999786864,9.02434437971186,18.534811356760805,19.043395910637024,9.150213768723754,14.980124632790531,4.3283256647055035,5.907269810659432,8.45507726530116,7.971981324491728,9.997021706660107,1.493599972176085,4.484682565537619,15.82604549968568,2.739579327079875,4.7052438104788985,4.518706162372634,0.04358804387015969,18.156071927775677,3.7481569882034993,19.636425988629025,12.197217682800323,18.054567973942135,4.204231610304867,14.604481445786659,15.200672102110438,8.412734299089454,0.36207121695475575,8.03789907366066,1.6766569110839535,13.283958296892099,13.209347726385538,5.19488307751006,18.214630540292163,11.153750908193025,0.7788948979675414,7.7784133952432155,13.233054404912231,13.750368222559072,5.397565823802046,4.544982382036262,12.636037947022473,19.03210195347134,16.974300368861506,0.9850890942114088,10.261706710341464,4.925375583360787,4.891352685476291,17.638496924916772,4.376395839067881,1.5741991696076107,4.680222259818407,4.2257364628744565,9.439046597944456,14.940216714755948,8.347692904045436,11.459590114529217,3.7241784031224068,5.655513654118369,2.049495504982266,13.727129794615873,12.372418901801412,15.333324724931735,15.469680821507964,10.945781341535037,8.195794054932804,12.528202934823138,6.8264544457713106,13.754129167960683,1.9665196668076845,8.844209411534113,3.8023327838648013,17.913142752780885,2.279973481142452,3.4933906735864007,17.53169994821079,4.350578763619182,19.30669618964728,1.1280793512512277,1.5620263868068074,10.752032084163602,2.6154542299542305,1.1026210872953301,9.308549161527129,9.082292013652552,3.738177891515564,16.003384873263457,8.503502272837267,14.034585678231304,17.730198012852206,2.1103229399864754,18.78385717006578,13.70079494430212,5.834091602986211,13.563917025478522,11.166786635196328,8.172736376435505,7.4797064815715775,10.137431824713591,5.597266800579144,5.577557780567872,15.094185052646587,2.379178169488303,8.873113761269206,9.99910416912186,2.7166627909754704,4.870581469599209,2.9989786926860074,17.54384059182998,4.637762332293964,13.412963396471804,12.062347633354582,2.116624615744578,10.591870897006842,13.352170792578413,13.284983918189678,11.87963739008441,15.090639042252745,2.4434706408499673,18.451369612751726,16.87178240955822,7.581761706801591,4.5608113468131695,4.657125111317204,14.733075917374364,19.95961011829797,13.435806552546786,11.74131641131964,6.611378294807331,4.8489818406075536,13.387421817314209,10.077178278101302,1.0914958719917411,18.519808287377085,9.51886134329385,14.069821246579043,8.40634077496098,8.295826108734744,5.153136959282345,19.58573853214331,3.73705428090505,6.890982615367136,4.39878400982991,8.972793468180873,12.510669593370277,1.6391370725427956,8.940256744717896,5.478297509869217,7.52947354693879,5.443577548862111,13.153114474140622,17.45989864808965,9.449801355523766,11.048454010392255,16.7620532284697,14.768665028919985,18.806098662474092,4.531006433856093,12.179284751026866,4.194140055199527,10.593779964968721,11.54208593795778,14.41140154388668,15.961741297814136,5.440379336018997,16.43522882761166,3.7078473021315395,4.018369493401952,5.023886724117004,5.173891892451659,0.1875824753895694,8.875445615062581,10.261886517031718,8.973997274647498,0.3829748240375741,11.832362018301632,0.4073799329630834,16.375550425966033,9.699379371670398,0.17334618752727682,11.74710222101055,18.52044751631748,2.5103224314261086,19.14341237618908,12.80474452422132,16.4342414846703,15.094796819207609,12.290050834022548,2.434416529390573,2.223454316976592,8.245715550971248,9.124281756205157,4.727465241131297,14.206040868130088,12.01124349539369,0.6120708326044699,0.22245657789864648,13.070798394301452,13.210510673104192,17.89925048815394,3.0311493674828593,12.960207499624069,1.4553813702405405,4.76842871741499,19.46577259886764,19.086730511198745,13.587730182753411,14.17583251680342,17.03215031496978,14.612036565050293,15.727745144293777,0.8253487495662659,2.1971411604913405,11.899616382397241,9.05815728096699,2.4736264450631618,14.659276634794885,1.9921178423175112,4.466888261912061,13.476757988255113,2.044495816621068,16.096945112862468,9.715356360519882,2.5416599825905895,16.34861889577069,2.1920577270448582,19.41351605369058,2.206909864572051,19.939023326378987,12.383752704617702,11.899274938527471,8.689692640311844,16.72604145230141,12.83288334161985,7.030813402213436,7.7904532715500086,8.60856162149988,4.142415607473753,5.193841054165125,12.162888589841877,0.07378366137600345,1.6020099311778635,16.62806405130172,9.364408759080272,5.419469462702393,18.468648089969953,9.423929179385837,10.559588445377571,5.314382590734419,0.29434922422376886,13.526316612734842,14.2448718363317,5.19002117167032,13.825373641897919,5.672459813454287,5.2807671403326895,12.598743124282494,7.400944340150644,7.790174166035144,11.626650984867926,3.9200191887264557,4.988559686219576,4.80004301777301,19.217951411124403,7.658320988707645,8.94568728464698,11.380825803782866,11.384148311907172,8.391165665488995,19.14715891196263,4.099572118266934,14.281167519201642,10.810838101574497,19.919700347761943,2.586842105857543,0.2902213649139096,3.9121039948704173,0.09664166468341673,10.301113955982405,15.06705750052911,7.995870228670743,0.54613362438932,15.175591584967476,2.0006829946233617,12.715251023050458,19.834578402789273,12.640571780760714,8.733414242635046,18.608174934191698,3.034136064180788,8.938981007469646,18.33792940253128,9.091513559568064,15.728705904510907,7.167551564080368,6.594870736220444,9.317705197093007,9.560269058344808,2.7143933784470464,12.556675083567953,11.88031846764627,7.596068824451385,11.227832295462218,5.513235369723941,1.6309998335901144,13.151598419287414,0.2866864578910633,19.491068901504143,17.851411639517934,1.7514226545336653,0.6420557218042022,15.399008791101302,11.154297114357682,2.5224401355082504,9.804354701216663,9.229274484382476,3.5260115049545604,4.695346686617721,3.174967290831714,16.907203314637236,9.102531764610369,11.463283775733121,7.0783088803123695,15.900201287019486,11.244391149109063,0.929744538569226,15.69749315561834,4.189512335640755,6.983068764743732,1.3764394562662075,5.622475174657975,10.34815567025085,7.607853393227182,11.104932369883116,12.07838243472439,14.39961208223517,4.278678613699309,2.898262618302754,12.106634374716174,8.169410490897121,19.870171980618213,9.177765023487169,0.8125153526414275,2.289578418437097,1.1138795998094198,12.931859252706408,17.377644109729292,11.109784961211533,14.590104760377137,6.049657174980765,10.328909349282078,9.709746496851409,14.357258320822757,8.720758191339858,1.2985140846267385,9.641731361297845,8.974636414945012,19.045757158513545,13.247282117904247,2.275301016304767,9.581935963126043,18.06103417428364,14.039111687369807,6.680315131927057,3.7830602743737796,12.923069449824327,19.314303425713693,17.038514845135907,12.967009044109105,10.386506030137168,14.267076066002481,11.625313916812473,10.508359739956731,5.190162472983566,1.2434022525623245,0.5069076662969607,16.569697165160427,11.402596890626281,12.52500627882057,13.913018638426223,19.922372318635517,8.775376118579135,3.2268505766781574,15.819672126594524,1.4210527908548576,0.6665764262142737,2.2978752554119097,12.724618876788822,16.600817372403537,17.209246232026132,12.318344483057269,7.371185113672598,16.96100671613201,12.557805866422441,5.3138924900491125,14.073733720119467,17.961429442619515,6.820369394296839,19.023249596792855,11.491082259300391,18.571419240448538,10.432337059953461,6.254731405868279,1.9651050271907478,11.091584615017158,18.364539467531745,9.867176223646696,16.284172061833114,16.714669412287606,3.4332914828465455,12.202741426166552,12.935887410608586,9.580864345688735,8.15932711936953,14.800196298865016,10.508020370137881,5.663026839990963,12.72213088325059,1.5104237985085778,7.082517175144689,7.9921124446544844,5.286586946553178,16.60130904537497,12.248741321294943,0.42392626033675995,15.198721101991595,0.8151119695033815,13.128579879628294,6.76656188326815,1.577175451596804,16.706908740230887,14.527202446647912,0.38323219664134545,16.114970198918463,15.068764671103683,13.322443483463369,2.101452822934138,0.8761398980184465,19.948184954342665,1.92376937710514,8.796398828313752,5.72665130992049,6.284765079537165,10.292652963915788,17.072165756642388,16.688634706335144,0.031676023641367124,2.7940955021397995,8.621510103820471,2.1601049361863778,4.020773780288591,1.561992617858814,4.695173614700026,13.814158464894192,18.26470896321441,5.729582980486789,4.392709700532795,19.353197206383534,4.684415284025971,1.323179626960167,9.392992845216522,5.365508772335876,15.01352045199138,6.933467198478502,13.578759493307725,6.018611222925432,3.9493260899077542,9.793535996791928,6.162925418530185,16.842162210713298,5.2119258362874055,2.5567545605148068,7.857511023245918,14.880127527158287,18.189665671478238,1.2249862607278983,3.059898364050282,15.084974349789269,17.469168921187332,12.26901443115555,9.59493007428538,2.8019628239255834,7.028956319805584,13.7180656560523,16.813408034994065,17.59033554813003,0.331815709195844,19.208394890816315,9.184745628562352,1.1080501553236388,5.635156184627155,8.88130511933328,12.35666725287954,7.867755220928143,17.821641833547226,1.9193644056008097,16.11845953752664,16.336470396487854,15.636875774784134,17.629297612856966,18.368311557219815,19.43866405067487,3.358888936236095,9.247880492940999,9.267247321821092,13.385377541449387,4.689451642626503,4.466455570746031,14.902387567072806,6.264164656206361,1.5806649011485074,3.917725674015191,14.962195545711502,9.464046921680808,10.507920554299233,5.182686563073133,0.7911744237796237,2.6033199031214327,8.118288596978136,3.9004537263082106,3.8443186286437303,16.18705054945233,19.099838854650166,7.471168027471311,19.258739454928765,16.295223201065557,18.483409037354438,3.447480551969777,1.847992412036219,5.56855342360878,16.53621499385641,1.2130511217328666,12.707638526564967,9.530032470462647,3.2830468864937234,8.09323764395781,10.4703844898347,15.975880023101684,10.034265711005816,14.951159972379454,10.35541642960613,15.070270710015109,19.692046116459494,14.886200398090285,7.107245177328876,8.718470157386978,1.6329090809160984,18.666597458376593,9.908430127651329,13.177726378089059,6.460934203037576,13.343754817962905,10.216426735954073,16.004341675903262,12.53823976558861,9.393419002821211,4.269377149568183,1.7927690117458184,17.466121813494517,1.3986364875112844,7.076956493721296,16.230149593830284,5.835360816680644,16.64337572465277,9.913305717133145,10.212040449525976,13.242955240093162,12.318641890038343,18.08725025936628,13.15929541292222,15.524194252328032,0.3329652957006468,10.375373656268604,1.6792017988842955,9.220735848798762,18.548619009975923,9.020688833481753,3.8916556947029557,15.668218740064518,2.577962701432761,18.20922023685299,1.2740170262152528,4.830234025485152,16.226372629257998,9.00626536913327,5.044604013678908,17.13039127613108,6.733200316402592,18.462913816697252,5.77522610331791,3.5344864774330853,15.398260287469029,12.77037553282192,18.13470146683826,18.170567212100366,16.689209604599196,17.18449722909998,9.312632059548559,6.518705723745635,6.092298855253557,12.377363082402685,15.957554975194466,12.159171416099168,19.513264817598973,19.10369609409792,2.517094690207071,7.473550510539924,5.5600611538471245,3.1422947798017997,6.267883610897891,7.143289210135069,4.936880111114799,10.276383340898235,14.031092483658462,3.9781920944074267,6.1889140466187165,18.121610773274476,0.7430467734063573,7.384940348530096,1.6230884849010963,0.12588810603680223,12.447826212950876,10.981699970266106,7.196288332418508,13.033722723679272,15.888951062507338,8.971404397594615,2.3893125077077526,17.35695880383076,3.4808875728222466,7.749542780849463,0.34438939134314506,16.419933783543016,18.44520988332913,11.398947032204841,13.106767905682574,18.147197179593725,17.919763307223064,5.633968014271429,6.090293859372471,18.954508076662098,1.6373807332131474,13.00980933927898,5.642016517940163,19.983214807822613,16.12199754822494,17.40139672061996,7.121502733106495,4.976907721974055,12.369466588550107,10.973795871266535,2.2018232919874947,4.038843026165995,1.698989855838282,1.1800906717046988,3.7944398682863634,19.606954575728935,4.0267881498914315,5.876489360067416,1.8022719525746789,10.073007129798581,3.8494423784509246,14.985046119761844,10.104372812013906,4.219439178224129,1.8485913929150044,13.476946951826925,15.793766126638102,2.315395271459586,1.4875698232891255,7.468127936440361,5.35380663170494,8.170358786201275,19.382643350418036,16.88393121163651,12.037098994925547,3.582583373423911,18.50389397691327,6.743212848275708,17.522734221797414,6.720205253751583,8.11857632767778,6.632692473334072,18.26417214821369,9.558520514735251,3.8996591224026966,16.44030379158699,10.095882425589075,8.328182433400123,7.109780472882816,7.317035650951169,10.162296677139032,15.656900918486842,1.4532496635726044,19.516146912050168,17.351449146655046,7.037297261127509,6.775967887061949,13.064083288194599,8.027949150194221,12.95963419857403,2.122116814945181,16.72067949778523,17.528645399159682,5.24214089839619,12.452234905486254,12.61713433835245,0.3878371149274784,12.31493182876683,9.227380092322317,1.0843141432581715,15.461402783340414,0.8967963908606036,0.021010226656477116,19.3917311485242,10.13714627079164,18.930750668060597,3.3810130123053206,0.8960467985549236,10.862113721900059,8.404493783355974,4.2697918431178605,2.0410093099993842,5.030406521539272,19.396103942766242,12.830013808653984,17.75354854717041,19.88662489414734,5.297304856527574,12.612333412565832,5.412236351754727,5.449085134707605,12.798092257240498,19.105753433972176,11.070177391536212,10.474580220841322,12.866680490316863,0.26129418660297166,5.525063524916205,1.3854077622983274,7.805166539500732,6.184509370221076,10.676319786236466,3.9677773788373294,17.926616236761387,3.8747607005100893,8.63253951458077,15.609710831350455,8.235792632187767,7.230574362379185,13.712470570490659,5.780255162682839,10.116199840500727,14.736259715188158,19.418755690620706,18.26145879392589,3.9986635389058245,18.81090757405,6.181931289601712,10.972371926299536,10.695979352227113,11.779454539737962,6.744053973854789,14.91133004432617,2.457738267345859,13.38642242881917,11.804120303259694,6.109736649932365,15.72759713751175,8.418865549195601,11.972027145113508,11.459177735746064,11.252688873088147,8.117804925174035,13.383702944965634,6.96290499167719,5.425436827637338,0.7562835449643579,8.155818421317766,16.79763440286402,11.734220628283776,15.736050863564817,13.722463850232973,12.08253383671535,12.372826124797207,8.078613869011884,8.548112064506764,12.35677937619152,18.904326306658163,18.0824792806899,9.546290743263048,3.797606990963107,7.148021126914665,8.408370687716484,18.54023521202584,4.88461768147614,16.590062118151515,5.384049957095942,15.03819266545371,15.506882048430445,18.761972629088287,1.528435450250889,18.54987742804148,5.918994151173469,8.236619683745676,14.007101031395948,11.256582664735806,8.582632692033085,15.545571719375468,4.065139498834069,13.8885259048925,1.0973201887120876,13.571762816960241,14.749331071476233,13.792663179250017,18.28026865026385,13.017593347186253,9.02710184184059,1.8328859996013902,15.966914009806983,17.271722860103313,16.23412209773834,1.6859951855916355,2.5335219674032183,6.876288339985974,12.47723664292861,14.534335887832404,6.513332264535321,2.443548609497883,12.130705191217558,8.448264439997395,13.828773072415874,5.863893239528988,6.590326393593959,4.032553323272738,10.606022272376684,11.25542798026311,0.24725835138184493,5.560048400349871,7.704652354713124,18.435555604421936,0.16172777585263365,5.729358822211599,1.816568628958497,18.58469422537445,14.56013382711344,7.073318446191683,1.977685493827721,15.523558211404499,8.369025626354333,15.264107170572858,19.31879472203651,1.0426799703284173,10.306829890266878],"p":[0.946474370626738,0.7245144248481246,0.7221459654038216,0.15541789194771294,0.059655134582593305,0.46438373710496395,0.8786736477599886,0.630613285437561,0.3217535157927691,0.15339871467203037,0.027769021763808244,0.5212077865789007,0.8212954750343915,0.7396185154387482,0.29484913128675316,0.5161255058997058,0.3429771116781617,0.752773685297571,0.9787198952679597,0.16559267090251573,0.7864337634462952,0.4987171229546936,0.3286698123899461,0.6632756813632394,0.6612794280482928,0.27020693787756245,0.4781216165981137,0.26342092174316134,0.07243695619008772,0.9020865526798958,0.9659009824111517,0.10522077951174591,0.7246028147281915,0.25192626059959955,0.8129827313734028,0.2842009219832857,0.06188223039936536,0.4951198558806784,0.003944171082464365,0.6260423503789831,0.9907048959434694,0.7960607664957524,0.02655746460051489,0.1302309951040681,0.35836657033676445,0.27466928279059766,0.9080437948966171,0.2795736556771118,0.04781474335102032,0.4863407172215797,0.3164608915165752,0.808207296472419,0.1980574758188396,0.5686868019661662,0.05784093853254846,0.47286070860236706,0.9305782104777829,0.7107352336286616,0.18285668886649908,0.9458331883399711,0.6932181382823996,0.8381461028705148,0.5784374056557673,0.8883356171219328,0.13053842806863059,0.7941386377697941,0.275048245149742,0.09882465915829464,0.5087638097710689,0.14481386906512528,0.08136968940795763,0.562204463520894,0.8983004420186063,0.823637350826842,0.5491317930609707,0.773012976531678,0.9691002207140764,0.09011969942843834,0.6401432079049938,0.9453444457499787,0.18351164666245245,0.2998032705378708,0.6509447960157027,0.6020789724844255,0.10952606891665972,0.7309969646555146,0.3124277506710631,0.7985174249429217,0.7207938349673555,0.7510822660274965,0.6943135328111842,0.6210527662514529,0.7970503546653156,0.4435979971096953,0.1330916381782179,0.2461411975071588,0.6079450420847547,0.8713622336389304,0.9181074496573907,0.4000465542217666,0.8916045345844246,0.36356338584727,0.059392187959378395,0.7973907113172278,0.1681209278427913,0.7645500495111153,0.7893475153999439,0.9627715222816147,0.5404902777056064,0.056922956766940036,0.24132828536319484,0.49153341019657604,0.40829669076241304,0.03564821235232163,0.2799476315199725,0.18222033439061835,0.18030337153793186,0.9908034436990509,0.9289793197819487,0.48061062289625633,0.2805571747984774,0.9311116021864019,0.5839510189838388,0.5737062110366475,0.30359130598632245,0.24246871961199878,0.6097896888822432,0.5752334286964096,0.4123910386539875,0.07606028645859442,0.751718412230425,0.5425084073315933,0.6666775572238992,0.1388821491543426,0.519802542523595,0.9172158831783763,0.08602103423404972,0.8962146816951146,0.9276335865627425,0.6832884962190269,0.43331169674011094,0.650267193768554,0.5537231988114721,0.7557016016606337,0.751312655242174,0.39939547503273864,0.3272257653923967,0.7071408005171234,0.5834149225141403,0.5893447215589125,0.13731205185717155,0.36753169540624286,0.03923847644684364,0.41007045006925535,0.3848748262438002,0.5049354733457276,0.405285452371966,0.6337613351451814,0.7597054584947134,0.3336184620881364,0.5659234515619918,0.3906667350186841,0.9200377005858833,0.7326868477487722,0.8555178619545349,0.10286345120635731,0.01599161709321062,0.8266295431959345,0.4572166190590523,0.906966594645271,0.6757078907323566,0.46661603788404715,0.539741169553194,0.5957168616020145,0.3187301942242755,0.9096626474638241,0.940394856819589,0.7022715287510755,0.3953122968322689,0.5559072596004735,0.21331937673297152,0.21367212093414656,0.9290063487390234,0.8112228757997615,0.10943389025527916,0.9087372270667964,0.37881478453190387,0.42006951090771194,0.3346268184689525,0.5910698228992866,0.8416409764861594,0.9216675373440351,0.013187994167167982,0.0012687042077044186,0.5589382405973566,0.3422999172217198,0.6781620002891835,0.6689098809692653,0.9102343233577406,0.9171793119003717,0.012448049725099386,0.8654441456669342,0.5560559099058664,0.3465804192357964,0.4745089169605521,0.5635485491763854,0.7298638697742199,0.3174544136821982,0.3558805743391802,0.9177016530605935,0.8667602434840431,0.8959599830230147,0.6611961413428269,0.2062020305134904,0.6075492616797971,0.6202411559483054,0.5578862987764304,0.1281671841199492,0.05901367239628996,0.8897934973327994,0.2998483448944589,0.4310457745956007,0.7642236689495034,0.31880954612820434,0.2894186385273523,0.3200415485374186,0.8929988670913265,0.6202473109374456,0.3257553574770209,0.335900915759062,0.6862409559651699,0.32914177600802885,0.6598440117080142,0.6930907387187573,0.09180081930700035,0.9193858681013285,0.7416811520419648,0.07295037197493248,0.04599293765471146,0.16245289839544097,0.6954989814231889,0.07009117661942388,0.16653558412958858,0.3407707598248897,0.8300226967990629,0.9127787576597857,0.35800023766130895,0.7615769833873891,0.6768251252512225,0.7771987407126983,0.9051271949617286,0.6845721301951535,0.5075696654106152,0.9162908722749974,0.9388981931004632,0.07409095035953506,0.7131854922656466,0.6096674638179236,0.35727925575161334,0.3123934508846864,0.9859279124151212,0.7481692961237811,0.1765892479499409,0.22853840762909328,0.171667301363724,0.3652225530932365,0.22097596406057685,0.15193886219526642,0.9882831710518343,0.377011419645638,0.8445230485183643,0.3512497401175336,0.10529247906674621,0.7559724988041054,0.20467405320223886,0.6883026106705243,0.7204437183368841,0.6433644214378391,0.6173940655870749,0.12269877812398189,0.36852713854717023,0.56747655748176,0.514007397156306,0.5668646207433199,0.7151107027360988,0.7206885471392459,0.3759214457968474,0.3256437004225836,0.8418026322710721,0.08976657099778107,0.7144924983092855,0.7217228269963158,0.5738852270622692,0.5423404465162347,0.6585968978311225,0.8616721364372464,0.5373678311827825,0.7162039568273868,0.26200856031612196,0.8367415585575033,0.3481894709160198,0.9778218096332338,0.2071505743744877,0.1458460870131788,0.881004097310649,0.02395051626367306,0.24427983500788786,0.6434036807808377,0.12121813516780944,0.9928661337614599,0.2196657400902189,0.5679974814377582,0.11443185106828979,0.33199653320078193,0.6277436384837218,0.14005656522630772,0.6383113345726226,0.655337611979423,0.2776325634273831,0.9312655669554226,0.3028518889784073,0.11799388619732998,0.844855703666523,0.6921253869691231,0.9391246017008408,0.15546086020687233,0.25744872949339004,0.1859684617846411,0.48819449371604473,0.672136525281573,0.7656233343639518,0.6184027864019204,0.27658486810145066,0.04901737811597773,0.7982396712528108,0.18610894378625598,0.5123983135918773,0.9197523662184206,0.2755892610579693,0.5080114559507216,0.12994116140799972,0.788367321294871,0.9024200724848737,0.07082884734034689,0.40387719765211516,0.5734658749998389,0.9866654355957365,0.8420053678149675,0.6687061874603264,0.9000623674519519,0.48572576904210374,0.14336587539351298,0.5182515885100272,0.3348316883211937,0.3674157110824672,0.7345274518100262,0.5070369710054445,0.18636000450467538,0.732208020317971,0.1379635750846684,0.21158734983835514,0.18733578767697745,0.4735465437422217,0.9047172860339294,0.4878748040764691,0.3966542899046859,0.6062166737492152,0.43517008068598373,0.19476195869227642,0.8588264120486291,0.6780105474111,0.5768645602102769,0.42429440905157656,0.6960994465405217,0.9782874428858084,0.3703240523230331,0.07379775671145827,0.6221137161258437,0.9073383749790616,0.6681762394470725,0.9503208615413565,0.8706960831234503,0.4215411046615565,0.4983861292820084,0.9193921312749067,0.48010696234899775,0.8722257572879073,0.6171193573504761,0.7408996433319266,0.5916379982684656,0.7936885080388232,0.6922868139230343,0.2719280934434425,0.586778018050617,0.3991396258074482,0.5705850351601669,0.008271633228665642,0.7683169671616576,0.008491926020165463,0.17817078186479174,0.4713621287721974,0.9185050981588248,0.7555951020741503,0.34674635943540233,0.48608192682940965,0.5117939711376533,0.9191874408424625,0.43429883147523496,0.06764062863725795,0.6679669336341298,0.22934064922609587,0.6238678398678852,0.8259553427062418,0.22066791574873812,0.09642357782736366,0.7969112360708537,0.4383511561174185,0.8493506698472335,0.13576042657809406,0.8471842125490932,0.1676314225962039,0.9824172199654999,0.7802083802909923,0.62656365537365,0.18202242904823818,0.9037127600894685,0.7045193469394107,0.545274672318756,0.2940051278496729,0.18188773592932672,0.4535816604544438,0.6041596058498333,0.6386854134367308,0.10615185110587366,0.159900880378538,0.24721649180498617,0.656054864683139,0.4159033185487133,0.8875878262888333,0.3278265033798138,0.7453495062369508,0.7822620337963673,0.26656442788001966,0.39735567805155037,0.7150034399130052,0.5164872015266733,0.6513488167500856,0.21954387742867287,0.41960103098959256,0.719861410112751,0.8620163795643427,0.315822089817019,0.7976788173107785,0.8099252266944648,0.9847989070169023,0.889081792565499,0.9116764252548295,0.1827542265538784,0.5560075008191991,0.9739301618444527,0.5902530824528356,0.9909497290513944,0.41518752786889435,0.5157608603319999,0.29952425072747024,0.921761175585686,0.08836034537900916,0.29708036412884864,0.13491694335131288,0.39851046384915634,0.444484389605313,0.15171009062465157,0.08029324858797593,0.7623777657570867,0.01752068659913908,0.8881853868940182,0.8420909670081929,0.695459666120795,0.4230172233858478,0.8875182564669002,0.1995005748720422,0.4082447493569179,0.04551254717643327,0.7906540489803042,0.9204859200953366,0.7761139975764628,0.049526900656325035,0.09761279868055683,0.11274250402834674,0.9960699234348149,0.41993124062106335,0.08644268999090321,0.09954711300682861,0.6857592484302439,0.7148035901259691,0.3971297880285163,0.14992253618386342,0.05837550269570024,0.7717247719604856,0.25058580928188245,0.5517058018811494,0.9844395545204478,0.0757572769515531,0.9090669967923408,0.18545425093999923,0.2492644908806767,0.5410379751319503,0.9152995397197625,0.15702250953030816,0.2654335626690718,0.1549672211139883,0.05175075202848678,0.5860031916211659,0.5383333547529319,0.9115128561291672,0.5097739817561366,0.4254834784883841,0.6088471142042016,0.777645907830665,0.9707237380066767,0.41055371854066647,0.43165951257687407,0.6672398995779998,0.134783400524213,0.01307155697623652,0.6737550523708726,0.504585043630706,0.9793949623835427,0.2705188731347745,0.6231166670483264,0.6833228543698471,0.19016900736797226,0.4789916943798316,0.46840355125380917,0.3448220036873666,0.7968390918092416,0.5282604872198406,0.7772375024231639,0.6953147739547647,0.8759108979335768,0.9905393448522284,0.5785262732299152,0.6958646752464352,0.43836631470221676,0.8997854505274656,0.7337459276757203,0.5082124769280059,0.2677260227697076,0.6196246026966894,0.8316281959469338,0.35674874797394596,0.1485832065329873,0.8163283647055817,0.14743787006493814,0.15416869076251238,0.8390199043457442,0.7639108543469688,0.2926834119449391,0.10665297997797785,0.45668278371804494,0.5496134607181511,0.4540489877887113,0.9056518124675026,0.5237372673897318,0.3225907200765197,0.1393983735470632,0.5122794166551072,0.4962860762644563,0.3118243872606843,0.2751009333962291,0.46836764751914073,0.8722424932217878,0.6246151753435749,0.850355082676949,0.43353866853560574,0.8896806292860053,0.45255382702498026,0.40291286907199675,0.7017267038080786,0.8967245945384705,0.9258871710765677,0.5291213311049341,0.4036934875189433,0.9170319337533281,0.9008421926160795,0.3226202774363083,0.48897707828925485,0.5479488350332373,0.48108640114850054,0.19417574038988494,0.802245495776273,0.4867104706614489,0.09207190619070249,0.2823510714238264,0.1086618381993043,0.8249726053151134,0.13498131658086354,0.6843612531653387,0.8841489435101955,0.47973218459660893,0.5673434375237598,0.9398457889160028,0.9219744879104994,0.5347829493235816,0.5066871127016921,0.7971150241355134,0.8832173495305602,0.240366096698301,0.00025824503599691795,0.17897001352117092,0.6030481988591205,0.7471100725300417,0.036531847147803775,0.41634726818902834,0.8650332836072063,0.5821713328364433,0.05192602083691611,0.32332528943026295,0.6218641496561701,0.7263045096614622,0.4211435884010599,0.2623165753433192,0.16101586279227198,0.7936755042984125,0.6912416633510088,0.03395007311047027,0.9227768529710139,0.8708585430162772,0.23744734587602823,0.9611319558360247,0.172776974273956,0.035396392878813465,0.4328175786199975,0.08988125876076802,0.07620849631547832,0.5696054639234782,0.15404941410498552,0.42213775375230744,0.6866611790570194,0.7771702178954829,0.6826323051521404,0.2224258617160897,0.7881812283466305,0.13603021757104972,0.8287615885974766,0.6332087765014078,0.6056655269523812,0.6269384554229509,0.25139563822188893,0.6017176583876203,0.24058478308140652,0.2055526039391764,0.9493495330652786,0.30924872229899614,0.38544973426201645,0.4946257376424812,0.8813345534076886,0.9125629707521932,0.34020095528476113,0.6185684742268749,0.08551203890905223,0.7320844020613411,0.9018955075292965,0.37080344202121696,0.9832894459203261,0.4205083143179287,0.7250288098275677,0.06795325215955295,0.6756178493357539,0.13435880529969846,0.06882114300753028,0.05364730134966211,0.8623753088133412,0.8904213872788627,0.7750300930126206,0.939476391496054,0.682134811969747,0.4361248593032385,0.06458762873563595,0.5249866134703782,0.9731952154617651,0.959123543393128,0.27855240780029344,0.7768404666347053,0.2752360199351429,0.9422568145811341,0.18431978777832958,0.2291906764168543,0.8320547221524361,0.5796798730546477,0.49707217141975657,0.14772731970589703,0.876908488104224,0.1548082164410025,0.8219608224949424,0.8690374813968473,0.24259809107226227,0.11059089227929908,0.77007645710845,0.2975681014774083,0.9900643349163967,0.5621484260512175,0.30885586223040273,0.45777137125292433,0.8084216355444016,0.6249240659375566,0.8096731252876572,0.8338108472367693,0.22727294678320265,0.010991772211417672,0.022063730845139018,0.13032028604662527,0.47673445778952583,0.4859282678152539,0.9520428288537992,0.014789115005555908,0.20103412281464128,0.4152028107222119,0.09500440830238688,0.16366901729272398,0.2023203755945171,0.9082604143335615,0.23255607368217723,0.35663731194606196,0.6223268927131618,0.723299352309847,0.9284733043661959,0.39545647050203603,0.6840383263821856,0.08131704643674675,0.7084605578510421,0.12375321529382899,0.6216110029749393,0.6791148064714236,0.36559114215510724,0.25732312782822486,0.499101520526092,0.845572331488643,0.433756198312754,0.81207001426524,0.7445137419020285,0.24214810538169473,0.5086456043142709,0.09448605817083688,0.09633669421506963,0.8327063571268765,0.09222427587746429,0.4998797792892906,0.3213609500351686,0.6526692649043546,0.5786306202841858,0.4572797030659015,0.796343939114426,0.12261659880175979,0.7746087569891336,0.6089946964961446,0.39256185206705374,0.9084071742352016,0.6817563476424005,0.4922072052663966,0.9256293983964707,0.8693222660374427,0.8915972949928117,0.12599879800228386,0.6614121101637511,0.19014868731581402,0.9216465301678347,0.9901620389711558,0.9408485270552405,0.8391177351421215,0.39531616243664724,0.11092453933539548,0.036379105304805925,0.20903210103940273,0.11337831421273958,0.46422022862421386,0.752260018636582,0.10520498356474839,0.16365812666312918,0.7157462580276459,0.7472507468530809,0.5444162583847043,0.23004033954864056,0.7953372654664181,0.5228500874457214,0.14410685961045733,0.18613004727438565,0.6846066821957784,0.908349946041469,0.39521924409589615,0.7538493098246606,0.10110926229749206,0.945123328230856,0.6060315267007679,0.38595136144417785,0.44782554866136737,0.5762238318677813,0.2874051550918644,0.5268827405416814,0.375790484628199,0.7301058222961945,0.5975343207663388,0.9991190507408254,0.8338492910744115,0.258180392006335,0.8763736048077824,0.17674784092067153,0.38873618064518056,0.38489936323571405,0.6930014960781559,0.06881628958984098,0.3164200442613634,0.7497645286000305,0.9775249864292936,0.25087827725705125,0.2249666771737493,0.49486603140817476,0.09997545066746105,0.6948346107568701,0.39613893762198393,0.5538080412609694,0.6234470502346054,0.12995895939740065,0.9688627291654364,0.9635999757155864,0.213975966265036,0.1448291868617837,0.19213314196822906,0.2124348020434117,0.21738798334942033,0.8087589023514112,0.6343035645082684,0.05736305500904426,0.7993122026807293,0.7845174040933902,0.9102862034731578,0.2097346193145153,0.8497433890079373,0.2953699050259202,0.5179723597969597,0.6697007607562209,0.8852178248375651,0.9789792672889588,0.07384002580858762,0.26337810630373015,0.5666243028101487,0.9625213346322692,0.8721640794051797,0.41346262163355973,0.5940335823354372,0.06112086651253601,0.804060490890651,0.03871823898427973,0.697904293693433,0.4078102523076952,0.8833371068080205,0.15503704285491837,0.9769389146115721,0.6582440863879788,0.7835496861001485,0.3609207091127531,0.30301468378017815,0.4224554361438191,0.7795537621395745,0.2122795022528723,0.1227605254375026,0.042190228218611514,0.6321788360557126,0.43766357771461983,0.863902607308477,0.8622014197655301,0.12220870127733607,0.34957327981594233,0.514897335950105,0.7684886929805854,0.2493793350053748,0.5156182668525817,0.5560311352115559,0.03555679497456343,0.22252998344842445,0.3372956480501561,0.6543096161582873,0.08184762224562592,0.21953506069090079,0.38805807490960853,0.3856869631611344,0.6202220973494357,0.08759862156377385,0.519255498102807,0.7437961031020457,0.609840077281846,0.7149386137506386,0.4112470543439848,0.6577479677296019,0.1460990730439229,0.8087356255923808,0.9259812845597934,0.8353445416336454,0.6686997274403179,0.07263656995076984,0.17053100616476757,0.49153689834392367,0.8913868051375666,0.015442216669340425,0.2613535183494293,0.6259199091852798,0.041584485754038614,0.1524248867859994,0.8255415535553123,0.6756171041150432,0.14529494340891946,0.6513689671625118,0.12916788791839107,0.10671695619957977,0.4856272420776102,0.43984724604570724,0.6029013924979696,0.37326325930133364,0.37538077360141076,0.4097239204896952,0.5644071904689365,0.1867228754939938,0.5557187865037689,0.5577073084963353,0.24211572549161064,0.24642027949669965,0.03381061860525181,0.5097621055460908,0.7622284290653003,0.47760766413529243,0.7200240199559327,0.7694208161747469,0.49183536828186614,0.2161682607158424,0.28748880348521144,0.16805227160084413,0.83218943228181,0.13457110218527668,0.2069020952180396,0.1353443843576827,0.9484697237808928,0.9870733909394855,0.8310441084213072,0.6753087281223782,0.6856256052898155,0.8510150730988617,0.18179570613750928,0.33608835682131133,0.9149186438553125,0.3535300824260186,0.5894597467602076,0.6759186480123405,0.6327273771482991,0.14646218807422984,0.6384752229712245,0.06811685548006863,0.06569669592407412,0.20516328214130874,0.511207263811474,0.3803013192781768,0.45255818031094264,0.35342650337886483,0.5441502267353897,0.6289896338134562,0.4786434057295461,0.018941659694742485,0.5239899082142259,0.24220045015621028,0.3563854806180924,0.8865648380329185,0.47475665143181334,0.5879109475144391,0.3526428813870388,0.25909061534232647,0.5712602110972738,0.1425573263689035,0.23895947905396775,0.6736470000143775,0.5012495062531068,0.21795981779802598,0.5644622603113019,0.042692141979375764,0.45865180819821716,0.26342367310565984,0.6654625896332074,0.8773590272977565,0.19559279685829312,0.8516250528015832,0.4111196072593064,0.6508591238059822,0.2740441299531087,0.6805021566771394,0.2885644165842802,0.3625464824374818,0.6487080273269068,0.15165801147277969,0.6509512072706354,0.004171358289190019,0.9171955991565697,0.933668016878032]}

},{}],123:[function(require,module,exports){
module.exports={"expected":[5.694862617516311,14.078362054993686,4.697986653977156,27.289107032223598,1902.3032466291538,0.879909846399819,42.560600156159325,55.538498776207156,26.608221861261143,40.8182258977734,3593.7076695421133,42.34477244451032,2483.848792115947,0.055026221959833505,6.201323286314949,21.10133815448111,15.933384173012263,13.75857343550821,43.81434501349483,2416.180547115216,9.098284458732726,8.537045392610104,25.691350557959684,5.042027605539141,0.23569399311027464,228.55381274943383,25.41130706682197,27.176761100400952,0.3864674502868595,5.503938908485779,5.869760960326194,7.012205198949918e-7,7.5293404253771845,1.149568580261062,4.159581642451519,425.7827414231123,62.519954666842004,6.739379130151791,2.5964662251612274,89.39804241082719,68.09068651104977,4.214772829973782,12.776755574485065,3.3207585481310784,2.5615648114627554,46.60014583215744,1.8675569459672932,439.7727788530164,5.994197331830985,36.289981729508064,9.951926296880806e6,236.67071961823265,8.789426461999414,40.76755213858214,1.7685896126538343,0.6472789793837914,0.2882810470035812,7.019665569342765,11.135444339571533,3.1781532567207473,8.824256355550222,15.43371669573021,10.89276792046718,48.206470478725564,4.749747542320498,2.425093121365998,50.18710397842368,198.57727579020894,22.049271508620958,14.318907802047281,1.3027060987363608,20.4175169366011,20.915296572857162,4.851316867257386,46.40363407761992,2.3471516949119087e7,1689.7440436509078,2.1395262049121158,3.7925724306088555,13.04654401901425,580.0287775444764,30.911880647369177,9.356358025155806e-21,1.6750449009053132,24.2770909755234,5.139922584205946,21.689521226971674,6.79298220765447e-10,3.6192364773866967,2446.493110577672,1.7707650306269254,0.9890495141246719,1.9849132882425211,21.87591701599761,13.98043416756272,7.875039578652804,0.7102984628283157,6.826910313098652,1347.4466983591149,3.2205237068936627,79435.62502741216,16.597639889400092,0.5338562047902471,2.460978252355057,2.6214895157034555,14.874504536902041,10631.713672696109,16.956694245485632,15.044284884823064,25.028795783932836,2.931467907492601,2.3829119341234395,2826.6073601173694,14.531754159724715,3.263608381442353,120.18968444432542,10.12248855252005,8248.196474679813,12.859942377599634,15.22125352736144,7.044678847081397,46.15452845791668,21.472394580454154,34.36799998034775,12.511357535221048,5.237786731341835,6877.505128498156,39.026166254014655,6.2104421613377285,22.314557757544954,16.11561993404015,11.384986478014216,12.858433151679977,45.5405879427304,21.803206752339804,41.519858659422994,78.05709961199862,8.564708434807324,1.0587884553563494,52.61194403879487,8.881638077968763,4.4662877698161,1.5254354994070551,47.98829986943447,12.881372030447443,26.94597100399781,13.928580741641909,2.877765674328714e6,5.3384879444125926e72,2.4298288173584144,9.131111549170276,1.839009720341645,18.15638037769403,7.541589528868079,228.05393986402677,6.439877181144592,70.56028782365667,1.8817172405944917e31,5.420296760169524,11.676466837014056,12.674845687079939,0.9773818727252449,10.62750015967763,15.400517836234942,7.509246766376683,0.1327230260822252,14.283500902846997,7.951425651908528,6.431431670964734,2.237549188175437,51.25241819571819,1.6282402939259424,13.545852776366646,27.232628164312924,66482.40253280748,0.387885721975505,18.50256369656273,3.6587685672854917,5.372197184731308,10.096020250027573,21.612426738690612,18.443565716912985,342.9316349709475,12.8772164918079,4.611954041971836,49.46660552876493,28.551379080826074,1.544504664252085,9.020659806196576,4.581599910563124,6.000440696277753,40.38510503744649,3.836770281697239,300.97880981072296,33.46034661577722,16.115235755013078,0.1510559996394687,31.10559485898709,13.919217677592414,10.52890514330849,5.027578403265807,17.65418526352573,16.830571272810584,36.429500808016456,6.038968777257056,586.5127638850255,13.38925130299604,63.929435687216504,7.796850072419172,17.770244981209522,6.304557922365885,25.84067842216898,15.41672343306312,32000.47119797128,0.4361250051437393,126.8515773168885,51.125617541577,514.0801727058812,4.761801753434453,7.123791157542691,4.894084148859766e-26,3.6729585019144744,18.719089895458296,48.393977510045005,6.899674966656696,7.420914387399836,33735.90071381805,21.62384111216319,9.988738682325781,132797.09196989186,12.872261670945708,0.6123707432206199,25.136765979221288,188.66258763273083,25.588243357305792,1251.9552323618207,33.96480414052803,50.825690548132776,16.517659802738876,3.481954513883695,0.007455635228220349,3.2736278643452237,60.223284758774014,1.5932956105513616,0.04735001426360038,192447.62647098495,6.4776232441859705,0.8280711658884591,3.4175049935394455,2214.1981852262033,1.521226957869617,13.994145865551586,1.9788532130953822,0.2332634956767934,0.591842394179424,3.8904751385184797,0.14702877125250413,1.3037118658025981,0.08036227055869931,1.7916820840750523,0.00019216911298617547,1.1442260739725738,4.110477306548804,1148.66982340704,22.162639992448202,4.507921016040886,2.0173500900062454e59,497.51819314740004,5.286055468398942,7.7179780774424245,15.446016552788786,24.00905393848741,0.875706624407769,1.069054414478934,1.3056140262223057,38.973959743572216,5892.088117499117,1.1793887070675266,20.089722676627588,18.189393503189237,337.68343076246606,0.6165123895204537,24.887926781981147,42.31326724205539,6.559793747917366,0.42548013450223954,4.473903677446829,12.89663252455237,16.209466692097905,7.330817045397267,1023.7335669851788,94.43207617886927,3.802117634291418,0.576257139459656,14.87431292375005,16.148854339894257,105.65293514835606,0.7332172516110296,2.0253192354457767,14.097923931086351,54.242900225400774,4.669497805976061,0.9794575143496529,13.871352854575427,22.9051213955753,9.917738655026989e-37,9.193552899964365,18.5567893317348,16.31944074827047,4.160304102791016,14.342930523517005,3.2618262931165574,16.292952198127292,3.715445116927301,9.36414622668371,0.6586272951002279,0.06299132087943805,431.4439690817881,1.3098775915210605,0.3480174941628513,32.981604007609114,72.14701627622975,22.1812738106227,1.7875291208753454e54,20.824049917266308,2006.2089233948282,1488.2189847819525,6.375671884031911,14.651390809349659,1.1227863500021267,235.52613573517934,2.753504476335955,4.85750047890506,0.8231476591512511,163.51353546404863,764.8576474491078,3.036797243452491,3.286357092997991,3.851463048971464,3.686013163714224,11.169634804335942,3.315785404453162e-7,6.851752982078256,39.36032268397026,22.005672850464506,26.29595858432995,21.20402785555319,40.5058645108915,7.658130309671393,205672.46696508024,0.04903548965924448,4.43156189493219,11.87869925530999,112.96318587853415,61227.25438794393,1.6450856417312654,16.53536768484159,27.013358117898928,2.324239750616575,71.39544316845605,37.06664671337144,1.1905063580709145,31756.257409977978,0.6721535900900052,0.2757106861902616,0.5344917679407644,38.8649803890804,9.371459719579857,17.287120365160273,47.192217555287854,10.59734638969817,554.114725477112,12.537039197622441,34.70196751337301,18.25388424680719,12.591069979703212,574.8591464593468,173.93903433235894,3.0023675471143605,4.525055867886081,14.953319006536066,8.374996282697,9.275478364650352,35.44995769999741,13.812422982474562,1.3308856160392705e6,63.59301446385321,1.5900812721243345,4.330359502747951,0.3574624035547861,1015.3266268820325,62.947795337900516,27.225836083989925,9.617585436731776,6519.471280691276,3.6668664719546573,27.553633084555443,94.6265378531513,7.144207659085588,6.684419883941156,0.029810735889996835,16.1302560486163,7.647290150699567,7.3931696591419485,46935.505798157086,3.145342002182745,689.8634042787827,17.533883348031427,6.8483305536354555,6.578817682118841,6.750158656200413,11.665852997385096,13.213256472937937,1.1573657951538383e10,8.169838390445381,6.360693859111525,7.1347069351143775,48.30063257950712,12.947939870897144,3.156120620193344e-59,25.725663292826326,3.7365198132449757,70.20187271911516,8.292277881452213,0.8805289462973152,9.508068879910612,2.062734151555539,45.06281669754385,0.30821961657713803,1151.1781086614546,2.022686462267806,3.9581018010870457,22.074195295012224,28.808524843516263,10.839664386801244,14.880640793552423,2.927462172544692,14.879800731164256,202.13344429403162,44.08287843358876,6.339144708008058,31.46850606415421,19.848940536091458,3.0240745273930334,42.81108217599691,83.55640477034375,3.8547409238114834,2.224585417455317e17,108.088718246541,0.044330456407308996,11.989496111785554,53.13486411386468,21.040127537885603,127.31352253260222,435.6382416327747,11.992736347030062,2.309516216184258,26.16761299098783,16.88118244178481,653210.4829161201,17.483065406446347,52.3626141646721,15.630342930929757,2.0637566477620894,2.618076699385008e20,1.0372982283877428,0.8606076050363564,4.342051555509405,0.1317663952221035,102.66260247172883,2.7591488866750806,4.177843246239595e-10,70.99466015295214,79.19578453357116,3.3743160632620106,3.793000935360548,26.800172169377756,49.508037597079365,9.086900292074487,9.21760984820139,58.899267947993685,1.3747695462022365,0.5369691936799721,15.047552135508209,13.499787628722718,1.1057623295716126,2.583744604901731,30.346482430420316,10.259475371844923,39.405827011654196,8.58444660719767,33.734566805442306,360.2916095187341,36.41167792738747,2.7202012467515564,1062.4268182733333,10.501494196805078,16.47527188412865,0.12178449839519138,1.2012886020100957,43.3799332692404,2.3887946814508703,12.917224739228935,24.720217572972842,26.18739624170891,2.1076409965015865,32.589636725793845,7379.137163684602,67.57816467466748,8.976227237767056e-37,20.307395421769844,68.61402113224217,11.032183849866993,89.95488584485884,9.219856390187083,2.0243301976723114,16.053767839991423,149.60904625569594,4.539613504532343,1.392043130881897,8.982486575195921e69,15.841098603142628,518.0257719059829,2.504357276292155,7.0470836572322835,6.315722812478818,6.028836113085661,6.594848755551972,1.140902086123063,4.513004602654526,1.752716662703585,639.4917594511548,25.25631818771124,10.987934547026205,12.371870833765202,0.24163122339412588,23.982893916274683,0.1625835646018931,25.559106852753256,3.6333439761723327,0.28365634895271563,4.505743764312268,15.222861995147719,0.7848995182131256,6.115930939761097,16.72538687158082,2.309826356268046,3.081975439250967,1.032873649321722,2.620046496259208,20.738290686196738,9.045616530373199,37.03463258669517,138.43706871095628,3.5043698928461172e22,3.773304703868128,1.3823440195568868,65.57348339790452,3.6331563692184243,142.72450237780265,24.501117178705147,33.139715511720595,11.889457075379847,21.535403292209264,28.965089548993316,291.9057294043719,1.8712704507728797,12.072594962478048,118.55389563833906,0.12169888482410121,245.04691675314058,4.992082025071785,35.546110689749995,13.536920718100008,8.749543690504648,190.96178102474974,2132.918003951341,8.470389005698129,15.87455413143997,14.743648608262875,19.57369282971525,57.140643150595125,29.268758066287447,28.40807584406995,188.1962224230391,8.140403476441373,36.362900506279594,7.540824165306228,60.035758856026916,9.8085003859522,1.5017638892175897e20,5.833232085876972,5.8248658388062475e-5,44484.71062994268,1.7900691903242714,26.126346407820062,24.785770949957488,1.4280588923716133,5529.162787783894,16.531449668749634,81.79329336408259,4.867815263539021,2.4207419070417964,12.595383300641329,42.27661635920912,639.8032751081541,18.791977142171405,1.4483770277337984,8.525682246961715,25.533727237077894,6.340383805966732,1198.1323088318557,0.14608917895313311,22.759043610041527,7.190713681614079,12.9531019766069,2.7430786684173625,8.465609643754792,10.781010967901553,11.740734274267622,0.7080917856781268,8.21398165609908,14.933754176056336,0.3433725444633114,34.05851816300016,44.842480324677695,1.03613186714908,16.40417548863018,2.5904581836490252,17.80530302584001,3.311470134158671,3.9428894734621864,32.534366464307155,19.30340317662034,51.29744441541115,561.8712604376633,2.5815574787961397,1.5285274626447456,5.239007016907817,5.1116346132138747e8,13.568174104922212,3186.567556239671,1.7583524346336616,9.41872963443246,10.604206971126953,1.0574773666550263,31.128537511638484,5.076327036943872,3.747647199061165,3.175739294249841e8,93.98896769466204,25.95267215526193,163.44470807764597,53.372977341317444,0.6016153649106538,16.937437802753017,0.009597216606953632,787.6547914408545,9.00725111089042,1.5020687401318775,74.14176773693866,13.603478125873332,330.46214492013075,5.629465602405361,1.205984788037851,570.8521166932887,1.2277052944455777,2.4171989954655224,2.0923146385784395,20.169734530547526,20.07392439917948,3.555350766221767,19.959305168032902,146.7733296019585,7095.476380868065,4.686890767248631,1.135274733923535e7,3.5534028985287867,2.0076869723901383,22.504448135263164,10.810165498329676,13.83809709104163,98.96471328265315,2.1902897288859444,3.5828527863138965e-6,20.642358197656822,7546.502873950284,366.41230588611126,102.46490632778884,1.2950141914005286,12.545341260872283,3.2412149505089562,14.654360365144704,8.149623560930095,8.430006239918931,6.965825560915014,6841.4978208316115,3.719035878147493,83.13190112985444,15.652138270121425,4.64656212751318,1.4543553250331668e13,6.900585864442081,7619.931220964255,4.400345689128087,8.230776120338785,4.276525025769774,602.8774342453448,1.6650461060001234,0.2749157778390517,3.0373103608995273,6.659996521789194,86.68540818582733,15.27351532443145,0.6305436867584697,55.59850869568245,14.73206716440761,5.765030817999152,1.822594737556361,43.1245238594803,6.737044337770011,29.184321345012282,106.52232424495134,2.3231454074083873,1.484658593775954,72.23665636538304,0.17731102014249076,197.5160579806299,16.423695208004766,31.951749219280586,8.245584035128216,0.6932014817972925,6.547981018855313e8,21.422784284553774,12.901536943908546,5.594864014032543,2.9583736354397583e8,22.438666015479694,30.947623218459935,118.26459129661046,1.043728453907902,6.260804658632991,32.477936550855915,28.857055674105425,1.8505047480969659,1.5865481036073177,10.187828860954816,23.36376508086981,192.49848675458125,4.414861491026402,64612.09663960807,1.3152339230664163,9.235009902273157,12.71183670612383,3.2434141209905144e24,17.682227949029656,4.077859998345176,58.97508429315893,8.352042273582736,6.144043894755119,8.499131343861073,24.099584792722776,5.238795445092553,11.88879584915556,5.901118346631648,75.21318925168185,7.615205776656736,6.242203429040563,24.66123132357737,0.4113277874540793,34.67900336755714,1.7057525245303644e-8,5.565867321960023,8.617430048243774,15.348747356082361,6.663958379330133,0.9743529948730434,5.6225358074831036,3.6857482368693355,12.73196616353522,2.4034339235228903,0.7720365307653377,5.986368837012524,1.3192360082514136,11.892375068782844,9.585524018393407,78.66008241029782,38.14168379565276,111.3816893716698,32.17769614915377,11.440274905053426,32.38433390435911,1.413459633323722,13.44689552314906,11.58097956211934,15.597240337125164,3.5893910489806737,0.17863519908639008,29.387021856994693,613.6328719075683,31.05903604090276,16.60412142199494,0.30256982672887744,7.264014582684623,2.381709102724244,10623.36699675155,22.413304333198614,7.056044791997442e-41,9.04654535626452,30.092879821410598,4.801614916957651,0.5716977067058686,289854.28923368873,11.757345257740129,0.21086928208567904,0.7435120861071609,1.3620202439912177,2.0633966196446756,28.528702368568116,5.228619471007909,13.045687605080529,35.71878732622885,60.659028913841055,1596.3955101975766,52.800763176620386,2.090712482324432,63.50012608372015,14.196864914990789,1.3506469381743091,12.020907492227058,5.135406043210728,3.044910443116525,16.96208750787458,331.5605702529847,6.847883554524037,11.559691257229035,5.392661529513772,7.255655588656314,43.979967510589844,15.329813637395326,1.4952839037383365,19.930802055726346,0.03455163338422739,8.289674021372468,83.53587735566924,8.348971032881334,417.66258701207727,4.016361463319046,1.7634723858201442,11.043890317728954,5.320462504661616,6.295742974248557,16.308577145551784,155.1605583770505,6.881237028028223,2.373090690056183,4.799973972949838,14.226786663884877,30.910269210404095,7.748478375533913,0.07260734140888633,5.692063497227102,3.919141062537615,0.0009214170108587503,30.759019663948504,39.7811641696972,0.21141452956096793,9.681715156273892,0.0036481871911704556,0.021803741806674992,10.936272744105883,23.928840712209833,8.104402639694063,615.0506588959421,20.050236691121942,10.216331176293727,12.81737023704255,8.470237503575582,6.1818070674338195,22.888203739560332,7.986564721841193,1.0259659013200233,2.6240066432556093e7,9.041194279988698,16.071292441694425,80.60197378689274,246.96971021093628,70.06015531526448,20.970188963253886,0.8379358587961755,40.864443407569986,68.79545040654045,0.041320107111785576,32.47332260643705,14.573401908514803,643.9122797503492,2.3818479316290238,35.80405732631721,15.306764486844965,5.963313443104732,107.90878943624644,11.61939635587028,13.843922782584327,8.469351010785187,16.135927257789714,9.638256369909353e32,61.042440982641956,0.17846326794851533,724.1521302647706,3.5489198022185935,0.8728986902398661,4.999169018105902,1.237283492494529,32.233178654713974,4.45881112713085,7.276498843842193,12.968715575700106,10.662850853987221,77.6126616500325,3.346239422548106,4.061683817659859,8.510336336108049,21.13520810028002,2.3448628338440396,17.846559063343744,5.089320907437182,28.576525773310237,1.90305547756631,0.2544769396074729,6.8985062308087155,7.796622556269221,20.21396973063717,5.428030066447704,1.854272989255591,51.13397301955779,10.845576001087945,13.642271449619347,28.867023896471085,951.4883067306079,18.200437256910945,675.903444798084,293.71256061034074,0.7378675224754333,10.201539375979827,0.8279359062528584,94.80164143094358,2.1345444368026087,3.1472109895465796,4.412915742254995,2.539936012702765,0.2020373828385749,39.550427970210386,7.474772761229943,6.126147597249822,14.581060529808038,13.203452942990278,31.3829740592608,43.15924588038298,8.51864262564367,21.84146363732247,0.4696543232772988,0.10401224584918703,58.519934383436926,11829.534323469306,27.46955276747154,15.581852913963091,6.7388107882308,280.0352357225273,1.2076867906856203,9.917083279173674,44670.2859349707,16.38691038303136,43.23526692647292,23.20680973194133,625.4637979154562,24.51538521877076,3.6541202240353505,3.259139922674489,0.046509764840352796,3.9671213625933466e43,8552.86237539699,20.93626255429027,2.5747295914427046,1.162105560384853,2.4320404037678833,28.023568005807398,4.637684957431844,131.06361205940195,31.61985209916362,2.9604936938678232,22.17304210578289,3.0667010366432047e-137,62.55904258670496,9.72172013095783,5.72528600889856,3.5220041032723715,4.02177269414118,6.693700014087467,157.51778336583249,14.41408077598839],"alpha":[1.716913777888832,1.476632762612708,0.9069195197167139,1.6219705582974377,0.018274430483700144,0.9720392227543675,1.1587648595989544,0.2927427461137597,0.10663274622191787,1.5782054424665621,0.2756190692262286,1.5058453944782446,0.35467172559849036,0.19483443887803853,1.2001953979815685,1.4977327076670863,1.4615749041449209,0.8981211734443861,1.3734736598310153,0.3278793299595444,1.9985562138712631,0.3175508459041074,0.5834892826201825,1.7146768895830329,0.7644818223400467,0.05867278653786823,1.9993937534851987,0.6173539278027333,0.43798993398983255,1.127104463669458,1.869651038519406,0.022906773858314633,1.1912476134602175,0.600386792564525,1.8519161366745394,0.5604814478550311,0.8984553069423624,1.3291335879794164,1.8750697920266628,1.2070496611421149,0.7071250276386594,0.6103755606721082,1.0261689710015092,1.9687772699907078,1.8765106659732642,1.012873448870303,1.1824386604138701,0.863243543957048,0.5983398520215566,1.9853300044881608,0.12251530355729034,0.7688122999007292,1.2158132413149643,0.2809348251367285,1.4950621615950253,0.15361395055838312,1.1075028481565066,1.573836490517988,0.28214212964548446,1.9506821527516855,1.1251495300298204,1.6058928139683912,1.854277410088622,0.2700211824784211,1.5194275840686884,0.9201017608185245,1.6920422724850654,0.3290290511078675,1.838380861895705,0.9452576441266638,0.6130262718466879,0.8852238716840093,0.6716730914833282,0.6865133365730123,1.918175337973039,0.37333517091100576,0.4158999711107918,0.4663618109799317,1.5331816649255705,1.1025379292926316,0.14348632736625522,1.5208658592030306,0.019090512821262173,1.4441198726320876,0.732939836593232,1.7096284293379331,0.8414475026950559,0.07470107812672921,1.3108062345953133,0.3918521912302344,0.6045744169725582,0.825703045408857,1.1468351066640148,0.4112797851325327,0.990501409125105,0.9742987828712195,0.49497989200625225,1.8002082958279413,0.628949518350947,1.522637978479811,0.3295267662455279,1.8951670574693256,0.2763215949356219,0.8518863553981699,0.7898529476917737,1.8989952750680885,0.776667668156644,0.5939243144882496,1.33534973555268,1.3623343257983276,1.1928625514332118,0.8253608491645235,0.41289953207167107,1.4812901234440066,1.994475559753694,0.31977766718819733,1.8187761738494923,0.3622395016860258,0.5455915285115935,1.6720788008377512,1.8231971469847705,1.3740667541159182,0.271269663489103,1.8665894128991218,1.1600311221221014,0.7475178601428798,0.3198046627490978,0.25733277409863886,0.8822584137988461,0.9072136250819876,0.32001561632607567,1.3745541445641414,1.8284410855549873,0.9582167339035697,1.59124876301272,0.374642918948616,1.150887285016092,1.1541711310495053,0.4808787128060601,0.8893254175602445,0.8169802955870127,1.0487782580676064,0.38872839012639737,0.13562691823219453,1.9025150091079581,0.5368838511026106,0.9379665136764213,0.2608789712362669,0.010776753110954385,0.9362557263457694,1.7086843177620485,1.8804881125859296,1.6919363971620043,1.9272903700808866,0.7705323432060669,1.1092591161244325,1.206676416275617,0.050967572871672306,1.091022799095775,1.679381908420206,1.3767131200292408,0.9260736863072658,1.2276636047019616,1.7147453221693452,0.3672705582722382,0.050776989377129045,1.9363459683427617,1.4294769694462386,1.6345843544700194,0.28105183544805135,1.1316537676478262,0.913797965467634,1.3739929375010838,0.4938214075582703,0.22862802016634154,0.4879973668483579,1.4088308395860154,0.5878579335706036,1.2908393085723766,1.6709606544710103,1.6168770287419778,1.1117156669025254,0.6831393976917033,1.5594861641842481,1.823166709161712,1.3204637405593456,0.374550746077587,1.0242800311305942,1.811365898423544,1.7008109214840337,0.9567977972460846,1.4926212220656834,1.8859360286144673,0.8171296835937194,1.5862046657215387,1.9312612953352448,0.1674186153305648,1.9729356584222422,1.869881315086964,1.7023049378699282,1.9682048452277328,0.4064468493778417,1.1345991024361557,1.4919769766140756,1.334645524534566,1.270935865139013,1.898066933704651,0.32103479156985015,0.9998556959933294,0.7474173260048729,1.094027521829819,1.2656588775643227,0.5179781139360085,0.25329978515508866,0.9856229430657675,0.35994322108018784,1.2959858606382686,0.9300276515398576,1.747017226106359,1.5920119206610317,0.021630963296387584,1.2750591534929727,0.8028302693101126,1.1915135688521303,0.005849206631379111,1.5018462015816731,0.10221440073853794,0.7086348567399376,1.0841161852613932,0.23269224632952623,1.6880584556892422,0.5003505000980017,1.1440101940891063,0.808593705544955,1.5450707269093802,0.21421217794745218,1.1270629776806533,1.8540365675698989,0.7594406076040343,0.5420708820758704,0.009258265649685349,1.1493002651405635,1.5514074609912631,1.512758037246888,0.530211742536896,0.2093334706937653,0.2800915350885962,0.454345282198132,1.5257381615328227,0.39952850539316387,0.7200176812664085,1.2248599478198656,0.9683205973330238,0.34728351491254017,0.23195988025897263,1.9455591817056868,0.9334169922701627,0.4579631494668628,0.20447778944296324,0.6570997689557574,0.13146311578172343,1.5161027342902629,1.4737603953041756,0.13927274839217896,0.6312231937612274,0.8750861013341509,0.02416235413632739,0.32573166290454303,1.3586543485202536,1.2143045127242353,1.9241732947443535,0.62008263284303,1.1660142250989347,0.8006111792373507,0.6238614752162004,1.8996718473795124,0.5589003358036781,1.9320440490922133,1.7025324164785043,0.7482396015806239,0.4745815975482639,0.8499702474301714,1.121472794517954,1.6301300619065149,0.2875258487761223,0.9324131694965718,0.5807142634712346,1.891791396985072,0.7526947140363887,1.154257652766948,1.716233665787346,0.35023964133511853,1.21884971894701,0.4175829285151984,0.9242966576192062,0.8897053986578598,0.2583860520086727,0.8014958188226804,0.5463825377527951,1.8685795927395445,1.818165185848076,1.540430039355075,0.362861196387378,0.31387210027573254,0.9824002633462561,0.0008608259188340739,1.2628297648543567,0.9285749320652674,1.9749919715751738,1.4629683254853183,1.0203531135138526,1.3155063345930262,0.7203291548200572,0.2746374415292654,1.4651154712166008,1.5093790321449219,1.6396488546239567,1.384973494749632,0.5895720677535223,1.000770775827947,1.4439149652033207,0.5399431724935382,1.7246877007488943,0.04445848653997553,1.9494719003785033,0.25218998229190603,0.28734539141671966,1.8522095314142795,1.673761629921993,1.5124234507632979,0.19216347749304497,1.7130033772581283,0.7145981494187748,0.48667538466932614,0.26505485416573027,0.09420649949620907,0.8678595651108023,1.1404970764993285,0.5110822572465552,0.18994663279114077,1.8200231789055357,0.07921820902406917,0.8765809738967492,1.6627407172399455,0.16373164677031715,1.3055592874713704,0.49892491867866706,0.2568108316798776,1.491862080783433,0.30375781030904836,0.14733118459714234,0.8854743174305395,1.681101278499007,0.4281318866860371,0.5993517768058338,1.9462163128252037,0.17949204334768254,0.9407887848372747,0.7604025625662634,1.3318834887967324,0.32585810426613593,0.5468596127426126,0.10577545383629205,1.140685495766491,0.20054053688041185,0.9491995550314534,1.4507867387866744,1.2030372796628996,1.6565989235085525,0.434997535545822,1.3549031650716752,0.15963406343842923,0.5042262966047057,0.9078590797245845,1.9537041458209234,1.9388391994452139,0.4831967730731872,0.95368385081064,1.8261843137751135,0.29882652916123575,0.2635166342735076,1.2719325591193438,1.3731019148147494,0.28532445071164103,1.3391199570974122,0.20464707314583563,1.293474050905289,0.5319662358824742,0.4845081539174725,0.44766702018780435,0.42406017979394983,0.27075891103948013,0.7362192362260735,1.6700132672447654,1.1596960176905293,1.6731439606852314,1.9719340640902336,0.5632894933367867,0.6899671181406486,1.4386881240602634,0.2898242756447047,0.9996962356528125,1.5184359485158527,0.9979990329667281,0.46637037838697415,0.48371133347216233,0.7156831560022394,0.7481980229157688,0.41319083156610414,1.144188925301974,1.2407289034817346,1.9954305189426096,1.6440092184541557,0.10386969378775479,1.5560455238542685,1.193320959637807,1.096364592827097,0.9852394251804335,1.1858324961403381,0.00904709869552045,1.2751342367167902,1.910389358303588,0.3391518805388243,1.487206062002584,1.3421422947566324,0.544514286439377,0.35215190673202956,1.0715884645511937,0.19865819007859908,0.43413057168979696,0.21164277193609893,1.9672914401595478,0.18097227610090583,0.5970184228980173,1.919979676877415,1.7183972215816938,1.9037043479318552,1.4567011712540427,1.4144861314906905,1.277102470611843,0.767447331490565,1.1135003598617659,1.3431354161101572,1.372381058474748,0.7137706584457941,0.4015285102630588,1.3103356137348987,0.07985954512453919,1.4959733519409002,1.7115717191689273,0.7683997703494412,0.6208561054417165,1.2933942138845018,1.1032934763373339,0.4295779943692657,1.022043726581118,1.6344667546405942,0.8524418966884251,1.9654433268469957,0.05343947422376116,1.5934714724056045,1.9867678081275923,0.9663858585551854,1.8231651901518355,0.05346903626627242,0.707277478482844,1.3740989780369963,1.5776605025849122,1.7648321535007527,1.6932293986039166,0.4902903336550959,0.037922201903248354,0.29986689379302467,1.0146699783897009,1.5519773541163717,1.4889297644138373,0.6968136545322507,1.563531070626834,0.9001062394724295,0.7246056772631659,1.6262903657908847,0.6119802267508359,0.056737838406367036,0.7174173025510253,1.6340505484360328,1.0604563707619126,0.4829276995586955,0.19831487563338834,0.26073448184227255,0.5077580475426906,1.302336885588847,1.5294629071940107,0.3723508690781232,1.6243551599070307,1.849384667087921,0.16035911954878346,1.5448953551836309,1.062321657119138,0.23410685499973427,0.8737206675321683,1.956082169950005,1.9472921363301197,0.9261733957121927,0.31697273299144335,0.9847589576592846,0.6544713325334852,1.483843834110926,0.11395589485575153,0.2808802919390505,0.00908308232068089,1.0214070159248045,0.9926039848968826,1.6540862568423713,0.6994462215004891,1.5880093697499107,1.145481565368383,1.9792265085613434,0.7348995784258663,1.4644773946934038,1.5473596117623685,0.04367969611086675,0.45066310706148993,0.5173444469508666,1.9562703294434702,1.0973809632147518,1.0459219024359596,1.5263606202929498,1.112866389977523,1.6722457270804387,1.8816433606200205,0.6619947223515381,0.9952410743721609,1.5519605528504705,0.9671035882440373,0.31002773604662126,0.28186070633153415,1.4008675651432583,0.25550734680851583,1.1290165490989743,1.8593301885109739,0.2738049464093857,0.5151264293376716,1.0155031423842589,1.8924362616557886,1.6306703935021316,1.7233041647141474,0.4595032918418771,0.6990260627311806,0.5498720574556044,0.7768047151847557,1.7697234315334933,1.138353236035714,1.2709433714680234,1.1989285527726476,0.10017231628037537,0.8620241604286187,1.2612088144496396,1.6087855454222209,1.3632718486015807,0.09915878265065547,1.2411642712318973,0.38117933736010423,1.515749850310209,0.3866294540380091,1.9943915631268445,0.5866459131663961,0.06205342119774482,1.8662910114634648,0.9293338454365827,1.5881949889758031,1.058595142621766,1.9174285347479034,0.6347709434773954,0.45141245911161043,1.0771740258772655,0.762846336957629,0.47855853333636755,1.8243764771835158,1.479961930487129,1.415299589701402,1.268348951067412,1.9322175168370666,0.5380413729030038,1.8818341825926317,0.4074085207665066,1.722362393593602,1.6135900361251334,1.4825633358331367,1.2867033962553767,1.4699458965732233,0.1078027090265481,0.6708071363656849,0.13346311223035823,0.17286174378032904,1.561581369196761,1.1287908813162986,1.407882698476696,1.712978696660897,0.2039574080977813,1.4772635827555147,0.6394546127601579,1.5015479044244988,1.8609537798921902,1.5273613329465525,1.4246128929413304,0.6336471471760028,0.73344579638094,0.4665935852493801,1.9307607047645972,0.6661514215076778,1.1789626480462045,0.598376843652606,0.0832407337092973,1.8192021305144852,0.3199517284532205,1.7099825882423976,0.950753086811952,1.6642250730737596,1.6306703341700701,1.603894289129522,0.10978915090688224,1.6736445022176794,1.7752454998815037,1.1187334885063334,0.402608613283709,1.3704867097612228,0.37087293530407806,1.6252163665377273,1.005855879415201,1.2929809829038676,0.15496163600777635,0.03850078047958272,1.817357013262089,1.11394672315348,0.6404034370616034,0.48244920263358093,0.6619945601959754,0.6710856110323715,1.865856368468998,0.12403673075775634,1.9713550732128238,0.10247378216631597,0.2236244001430654,1.5593813187307926,1.23662346551508,0.3644732534574948,0.6128548055035266,1.2656939527669455,0.7231618555173926,0.15314735178788164,1.614102677217946,0.8442667242923578,1.0827466078595767,0.5205783056745883,0.4542128839051145,0.3687805104858395,0.10486507198889017,1.154612422817249,1.4219869483286005,0.27546820188584054,1.8124093102751297,0.8433331663664454,0.6943331492547498,1.7672345240838343,0.2841595281889324,0.2203043962385478,0.532214710094423,0.9083604102424023,1.5683913813303896,1.220463493385144,1.4024062742555632,1.7044407997914965,1.5711788185213176,0.5148611825640304,0.5664260053405581,0.6368495116920907,0.3206925876401918,0.3387703089660494,1.627232410863357,1.769631371049106,1.6271951056625533,1.0945456667461357,0.2698199066826743,1.647783577252024,0.07172570966630909,1.8159885328428063,0.2758175689367586,0.8690348962042149,0.4357278516574983,0.8831410798790782,0.5650554846259688,1.713862052421864,1.6855986252594914,1.9720112268769934,0.8949556626609385,1.9563321486718825,0.31687013059791536,1.4138567588586342,1.1115436683934021,1.7547830561448552,0.8956479428557604,0.08131786727878776,1.4872810620771828,0.3959683050259928,1.9324887778013808,1.027084148607396,0.8576216592068167,0.2643150258678948,0.4470927793271815,1.8143363362918152,0.9805562807111734,0.781554848961679,1.127336023967437,1.3568120277859008,1.0293404680957154,0.3709141167661625,0.8993938003395323,1.7962578356368488,0.20710558880022578,1.2661385235226574,0.7348166122979989,1.8037189507967777,0.18007759364938636,1.7008233663208734,1.5437514204007403,1.983305014284109,1.1360768341355882,0.7430691827570821,0.59153478654305,1.6892759595769378,1.0142469363216398,1.8977449405624567,0.13360887891654727,1.4675242624706302,1.324215635912806,1.1773986168781514,0.3789221531910507,1.257245090061064,1.8075435662782078,1.5468015613410016,0.9613169581091272,0.6704760704773491,1.0535859332582205,1.9145622359984387,1.957485728251641,1.4375272985910543,0.5807946145901837,0.6837568081406089,0.19683699229948637,1.0170469343919133,0.12427740734491,1.847582933178621,0.09560674165301508,1.504676549440969,0.027667211787112844,0.8603643675293147,0.9446820305380901,1.316628841343237,1.1824651730198248,0.8943913485534742,1.4564105675335695,1.8241378359773708,0.6703770556602362,1.5073008444747207,1.6680325796813862,1.0712999028998564,1.8792496970089028,1.6923648499975066,0.7076853339012166,0.26408221036177837,1.4157896686170708,0.025170227081867225,1.2813912220799701,1.4069380554675148,1.8135715933634193,1.670027383257989,0.5204755225421076,1.786291328690543,0.5453935093016469,1.9551197982430817,1.548407024805217,0.10689041263936527,0.9881368243066531,0.39837701984462104,1.4562686057703011,0.3552250164272919,0.8028225064255152,1.9630031255894793,0.4439564803481124,1.287839787115026,0.4286756021499336,0.5280262488229011,1.0360633673899584,1.7127609365684453,1.4021547705605704,1.9113823518130473,0.593487555090312,0.8946032893227231,1.1761212443264335,0.7907360822660476,0.5460336426602486,0.7091236425815599,0.49370210821709204,1.6937423387025174,1.0072318548395964,0.2720210516756083,1.6473544588775582,0.007903631127874622,1.8651428425147794,1.1600409949659554,1.9161304745211578,1.4227387870143868,0.3377071424446991,0.7366348247710071,1.5914437742368368,0.4618991068406628,1.5639823619858828,0.6166168595812072,0.5021257987237933,1.3417200907898548,1.0639649625843224,1.139654335006787,1.556099438278773,0.6266991811332563,0.3880536528152674,0.6712523118651026,0.9302972036930104,1.5339245476531893,0.6064094970625296,1.5960058514774258,0.8606070350828272,1.8872606612627312,1.8941756053633547,1.0433329772661462,1.7264827802787535,1.0373928996868358,1.4537121221009213,1.0918801352749883,1.134110390831915,1.8626396324662196,0.26884763003258083,1.7821436081639725,0.3065644800782663,0.843131109523938,0.6691140634196224,1.1344844663445235,0.7148820230242237,0.9778510837537544,0.8075671374507287,1.0624465830993914,1.2043765647113216,0.2673258008870927,1.9602572834793524,0.23358859633050955,1.0848767814054678,1.2873520523852697,0.4759800219969139,1.9096316946293954,0.9175546131873302,1.6116410359537285,0.7742612982049764,1.3628939324532343,1.1775330211829922,0.15555695428614813,1.2562476231010522,0.6899705455354344,1.9596207904086476,1.5260261125038883,0.18925237327222977,0.1574097018761984,0.7471641457608804,0.792745532703941,0.7962831159870261,0.439596484072442,1.9245697348181845,1.1259138388560062,0.9796985914021517,1.521359653285645,0.4492769435220274,1.8091111277999983,0.6594066958457492,0.2691584178679247,0.11640917665294603,0.5742416077853578,0.6117308934436427,0.412919686699452,0.24870296319914909,1.6577781411130283,1.0165261115099318,1.1544113780770147,0.5151571759467708,1.0620718492813905,0.16634319008470344,1.6357733039206908,1.7747295068103033,0.7189425365802617,1.5582033054397089,1.8982091169926223,1.3984926494000613,1.7394283052078157,0.35309938689508025,1.0830233511506253,0.3033274672899844,1.24540005216382,1.763367893974582,0.02023242878894793,1.1054832224616544,1.2255967196252957,0.4904033131197023,0.25024761462891965,1.3289934800446144,0.45094406034684953,0.47055841363306383,1.7816339317657652,0.30754103463687255,1.7937392254180207,1.7267138501840722,0.5715658145752114,1.0837967543645162,0.8438773545604774,1.3879307348577128,0.3887733951098764,1.5760835977232652,0.45443297388179626,1.740173775176121,0.25821663182200494,0.5046497100795562,1.1769829578627822,1.3851648014757698,1.2889583727498564,0.6002861545832001,1.8944535404740694,1.8204479372787379,1.6808846336987346,1.900789627806009,1.8726278406781476,1.3028548088923113,0.8356829219954509,0.4613424020784098,1.7194002059178648,0.49078440626286524,0.9390042273766008,0.41224660617589937,1.9742283260480442,1.0814088140580913,0.14619165418421787,1.6121347514878899,0.3706042193411223,0.38469768479938304,1.3770284316623624,0.6520888485842584,1.1693755501777603,1.0950843422245766,1.5542724686256224,1.658954397895135,0.6238842231956903,0.5097215625035219,1.198145676971543,1.0231400676900657,1.8063840723858817,0.5413287659420774,0.01834535824340655,1.9100950662634797,0.11923461321986784,1.2379123987269645,1.8226184268111578,0.6992634089944652,0.3238186436717232,0.14055134549842263,1.9374512374043946,0.20872388964628108,1.3836495793011623,1.9487512553478483,0.9935576190130324,0.6033542482374235,0.8718284366227076,1.958195586216156,1.4265714573893145,1.116453467085476,0.01093814885308042,0.13622707630250508,0.6456222737479922,1.6796351607495472,1.2904058755487466,0.9602176756048815,1.927214868615612,1.399421245035061,0.2501261137200017,1.5452349052473444,1.466233240559383,1.2424493438268547,0.0033733133568372153,0.9278426895252188,1.4306040257298198,1.6514662740971366,1.566255797196019,0.9443096320069082,0.20432636741244448,1.025616277172686,0.13404722524245205],"s":[5.039471166426153,14.277772053528714,19.305421049489212,6.102901791679267,10.485008200478521,5.238396752777583,16.237523195080854,2.7606200346494347,0.9388254168785792,11.505392514265207,7.803259628817472,8.993111195916384,6.317789913370624,1.6964473948817327,8.0061574758297,18.161818622742132,12.039967410341784,8.390768855837347,3.9630584983797146,15.980367934890815,11.456150062328003,19.462760032384452,11.978039557168199,6.913649187761406,0.7870357529996808,8.427289906621827,14.018797931049477,7.205176939641094,7.382044514120261,7.706825412074814,8.543703430156238,0.705487780244809,4.874939920158261,12.261029527765675,4.986386463945078,16.6693447084927,4.981506425107787,7.699845910749201,2.787696278410916,15.479549547003671,13.57608271383398,15.801591815378986,10.343410068773311,5.183064235465564,0.9533805263260264,15.515967185178944,2.7344738151475534,12.160116817414238,19.341817540368535,13.781819008172643,19.171122227119692,17.559094315151746,7.719796512104913,11.163530905087065,5.86167820883174,12.283747368833495,0.5595763410306542,6.349981084893015,17.682490091380977,3.0703649033142533,7.7286949314715425,18.41172467318303,9.52272306213124,3.161166901886716,7.384486241201418,1.6755100393538669,17.8313547933206,18.2375311360624,9.962601318717613,9.12052961465295,1.8026690857458183,5.671723921316563,3.962093344119957,14.706736333732282,19.610759245359837,8.854155420974434,4.916869580843075,11.755907105497329,4.569755389857768,6.57008823045198,5.535354382723341,13.183054672731021,16.33886964273403,3.1179405361642054,19.017625619740386,11.19525768763574,15.953899377539829,1.6711982900839795,7.416077272266994,7.648650522360105,7.151405978163066,2.7436909431641876,5.665400858305425,16.472689496790316,14.448011648014134,6.906018364240691,4.908209580802008,10.813137474049835,15.946402942585,2.7406993301300453,0.9972008264919774,12.932681472671712,4.3596104875093955,5.341492633108449,1.7020926569687012,19.93771221495923,13.97122355231307,17.868840128637157,14.391880877052312,18.714875664737477,4.7349535434931544,11.366581102243263,13.704619536158035,10.676868524833685,7.866661798270846,18.159745321378796,7.797680618261911,14.80149933559392,11.039470152386235,6.028896766151801,5.531637369620479,18.67043640905888,15.123068093346017,16.95455070736203,17.18610387602859,15.366783972294439,5.343167145509025,5.747219895366622,18.800342708268744,11.86893557561806,14.769828590094365,12.194539797020084,10.99559723493523,9.633350183411377,9.483744362113562,13.054596840363164,10.113915775016569,11.956260148857453,14.131272702715139,12.428293589860623,11.098695065153589,1.8941880426720292,4.481742221040443,1.2770662697060997,18.66628235679432,7.983799151334523,6.781961179603959,15.322828125592709,2.9095390465526894,4.19127455688499,11.679959086270966,1.2263940840268006,7.17008888032951,5.792925933600412,11.417682373461076,5.36216799161314,14.422396945227787,11.28719992705102,1.2575682166325075,13.750093162801438,3.008338303344833,1.0235656358344336,4.682238860012333,7.389632648091924,10.900654012176293,1.9736436090661735,8.028027479506363,18.899685247836274,8.200662115717039,13.186270526221225,16.988046394302188,2.245823033244365,13.29101690976147,9.647001940345469,12.659655461317696,2.2272484392539615,14.595839033875503,16.03820910856127,5.9492258191295155,6.84045745186197,19.950339663355837,14.317393231880665,19.47778417234857,12.241974208904427,5.245903477718992,6.7291829205988885,3.215739481003652,5.047827533252147,18.31751420941146,7.064699719219276,12.715116020218403,13.861336654500072,4.2787681115576515,18.249769564646222,12.310316894390487,7.431916185563523,15.792486039696602,16.90418965781852,10.28519365888748,8.689956528214996,7.812073281050229,18.04164347947111,5.667750565435821,17.918824605993283,14.000462762997014,9.916702028873123,8.133354272955152,15.05731792239068,17.424301051426276,11.967992757230913,1.882010430505976,10.142825738813697,7.088951032032411,6.29618776484024,1.8854829294313147,5.727126293791653,6.755011745380761,14.096634220796611,5.002762816532309,14.31077901023436,11.342055003884504,7.194497183827622,15.47091964717655,15.811713788512346,7.394304646374548,9.53523607107658,7.7928182766874565,17.4474825211918,3.55118647590412,15.814585727061754,16.182113694980266,2.5776177562420832,19.09156952637137,10.622530275297756,16.776154764485423,17.43066225744526,6.051824452190635,18.080487044871973,8.002061803222652,5.715185544012695,12.41631128679398,4.935693215191699,18.91390722446104,3.080366158428154,0.1996774717316807,15.958023682019684,17.45886955749115,1.2116323546247676,1.1276425857366101,0.9313838589222501,10.794572972124637,13.39166712451573,3.3792989777697846,1.3342193568048044,16.413483202248507,3.2506193420013707,0.855720887902951,7.548629100809574,8.996062113620997,2.1115598559378412,10.642771691944755,1.9920471207922885,6.285855319848799,11.344040900281298,7.148253907136346,4.332306805226689,0.35679006941789826,0.6865092623750657,9.94202699250447,6.144382884052968,19.346095286998345,8.27463527782243,3.0948551704703675,0.4069561304997915,1.4858805133658315,16.82446974836679,17.68476679706503,1.8486789229727796,5.894810652927367,12.813533972342466,17.402960955837855,1.3576101191847245,15.697965179626681,17.826127527643774,1.4385741445897882,0.23194598875755368,15.98981138969842,17.948541895729257,8.803626605421684,4.5692954468492175,15.341603202415763,9.217330287459916,9.500051966238177,18.308688145176667,17.92556108433136,15.244342956701296,9.753709620051145,0.5715006347552887,13.838895135332322,19.34113425097923,18.536456240895532,3.7173338788680788,11.441203375259663,11.835474003808288,1.7623537671495404,1.070711658236032,18.964232601547536,6.879026323306592,14.430868662989692,5.521367749091803,16.655831107822916,9.584370440765131,15.089900537155273,17.449645383115985,1.6180119207282262,1.15301642242426,0.07304386889107839,2.762106322996787,10.427174549181121,0.21733494557702127,15.6964788490696,19.82761914117892,16.518946589799008,12.80862354890347,9.506220299127328,4.367111382527296,10.12801569951586,7.453670606267684,9.171815852138714,1.6930589596441914,4.06825276882286,1.856115348967573,5.902542393697114,15.531965882039316,6.005521764683812,5.573179819171963,2.632505879631961,4.209533623400943,6.169787429174178,5.955254922030564,12.810857679249509,10.605429622909437,6.135728181360993,8.480196917442186,16.591124364849122,17.398984880862653,8.807704288499242,17.116611810283544,17.80847775192155,12.210253566774249,0.6109069693363312,9.269241013924177,9.723943036677213,14.864681212797851,11.778130181561126,1.091439767792619,0.4750956245283833,9.277936182958278,3.3410981121048744,1.7751537322192856,17.852222907288635,11.219095910582762,19.991023474510648,0.3601908620349148,12.2759095384291,0.9530347404458794,12.721370895754017,12.090128138663424,9.637193893473652,12.710734953969416,14.154012552142387,17.117344258179692,5.122947021128708,11.999748381699744,10.712201503921278,9.092690688279577,15.31754462097271,14.416425929082228,1.943740802638625,16.606714859283592,11.053962338279547,8.84845385595073,8.95993076412742,17.058502351583037,13.101460866653788,6.526687952706816,9.757766563024655,7.753344966003479,7.522080645724314,0.28192913653853235,16.638392408448134,15.345001770536758,13.400590208455657,10.894897423840103,8.310684448536275,7.218925636088449,12.867521970212605,9.335414656542227,18.406725445062982,16.395737694557067,4.088121357878998,7.376834920731503,13.479922785543174,7.826452307253948,15.185172685136251,0.675110438922828,2.0469910904550304,15.542515680107542,9.240398503520911,11.588960283000667,6.347515473444312,16.22415151255027,19.083630363860156,5.9778911347390595,16.62208005965455,14.669820061519507,17.728034036540592,18.51868306400247,10.319796268336617,14.321791303243522,14.903644084206448,6.094589136118946,11.085358261986462,15.154393758349505,1.284541300998705,9.876111628983635,3.6472432183478487,10.388581057221277,5.8491943409170855,8.127598557422044,4.488599858814131,4.811252779879349,0.773974501057082,5.336795148413747,11.592705554064334,14.775357753178277,5.124950352680231,16.533450984407892,16.92226305737417,19.28650393722097,4.309683689763895,18.46980233074028,18.82649697425847,0.9288546308877654,9.401578808206569,10.948914674018507,2.225551421293477,10.715135783436121,19.845781727742033,0.10770239120962977,17.32304500951667,10.644226804600386,12.975828473387715,12.451681247418609,11.675729639564949,7.89604199022814,2.0349198540709956,17.025606565351872,12.45643339042724,13.009918357071065,10.547952831532319,18.529168177488835,1.4358089539651697,1.6934682726028072,4.833890086638313,9.994712451568176,0.8776693574657068,3.573380760647664,0.057398360466627274,9.89386032034754,3.0664753327098015,5.733072248069542,6.2452823087134,10.575717120153643,3.549869402972372,2.740033903230077,11.026507257980501,13.378796730237736,10.682221062502304,7.639337663094321,17.602363291142353,11.386714490789217,6.385881961245792,7.0495172177112675,11.561323287996842,5.143021193094892,7.673845605276157,7.693369735123681,0.1604472080323749,5.859958581334768,9.625795325977396,16.637308661764433,17.882290749925925,5.980398519554901,3.335294901853012,4.5073462512609375,18.63659503402925,9.063819506522183,2.960736102657968,5.009507603730152,18.53994657973359,1.8142592799106483,14.872506129273372,18.224463613800527,13.685742644742307,4.554206296912078,13.727495846107388,9.295090229542794,14.403857765227617,13.972772440006356,6.049344564499761,17.636408630338355,5.0133635114156805,4.8710112477970124,17.500156516151705,3.1060489954383996,15.654072501724938,9.936879003794337,2.04057698036737,1.41122738584889,3.7775759540197473,6.356508988847449,14.777587623066788,4.345259768825622,3.100015325870764,2.8172272672944754,10.75497140691374,8.543817671654619,1.219056287371858,4.675067555200241,11.156515057796913,10.542459483117561,17.47921898411322,10.269088021729758,7.0439877583781785,8.97241046784806,17.747337118906387,7.569775121475781,8.996748378447874,3.470467738299763,13.161711981007027,15.590505449981404,13.581382405573255,1.0653140746272571,7.109866339665674,13.667178597581291,17.72334476836843,2.2811453135549264,2.1646265948655863,2.1201696998835518,13.504024846024327,16.40622142365711,4.67064487880728,16.660067267091186,15.254129563841271,9.545486977590087,4.586349932650524,12.798781406857284,2.4257753646246627,16.17766389131115,11.677564069590671,2.130335331025379,10.063597780871474,19.69612366224501,19.03805759021771,11.11581423100775,16.455044252908433,4.253851670327968,18.484874560080918,0.09923039665060696,5.160721789904827,3.399982027523829,13.561585530399004,17.871990528402662,9.858547490532459,9.282335793577925,6.090931544196976,1.5745257613644403,16.080913024692848,15.104790026313175,4.828597301676467,17.159666627640192,15.466353226664786,19.788965532093282,15.189021242811123,11.157666827147033,19.979177967697368,8.68398374959073,19.501027116305156,11.322647578914488,16.807396796450828,17.160388250240587,19.80847515260585,15.753829258278135,2.4856230926706058,3.5897130772845864,7.411700313305802,1.5127765910803648,3.549605280597965,12.894644543876762,17.64370989689272,15.859372701081721,1.112556687331141,8.195796646526365,18.290402727085482,7.409354402429287,3.7032525733890242,12.006329855727728,7.5264990813007815,17.10162076372612,9.872008425230984,5.97017269782909,15.449002639700918,19.763801421532868,13.70163579981952,10.345220080726257,12.400839254733885,1.4422572490896268,5.841867560796961,8.448074669001429,0.29586067320779286,8.730114401506771,3.390073878975355,0.9370945165969768,7.601662180436697,6.744880305294041,7.084689634823151,17.154532475199332,5.402315408577936,18.485939847023403,2.0700738541998787,13.349643425983118,15.284524928430624,10.99670027082782,9.47668681065679,7.311246188963141,14.642380084284131,9.03640938886333,8.907157049968744,14.36550204096919,6.294249734842463,14.207411205595184,7.777697012612745,5.645581219179978,10.483261172054426,18.711459824734536,8.71385983188457,1.7704037871060985,2.311289785306543,8.487457052854417,10.073584199544499,10.616786157565992,7.101658659977108,19.25811321747561,2.5765765878321334,9.2572987879395,3.5090532976868305,14.098985053872255,8.48622544966464,4.63658381635307,19.716262924398542,11.612303500883758,14.019580972403048,3.1685254725780077,16.607181719669576,9.916201804381766,7.133534023302075,4.923717528886522,1.8218286818681317,12.062349441476613,16.04282577185962,7.438779384029024,2.8358645728121834,16.11126937892442,19.894085429788145,4.781593279026697,5.636795314561129,7.8225352578161855,1.7601411037701542,17.931620650625128,7.621242422514625,15.045274100420194,3.818484725838389,0.9800108120352169,11.7331719048929,13.03992194667547,9.893001232222218,10.322106944641053,18.867070175301194,1.1609050670332266,8.509244484446272,2.314918997827049,15.71727027732448,10.88264425142155,4.107061219152386,6.057389668021993,12.131197379259198,5.162831114861985,15.261658362767712,17.70079121887963,17.081159774405815,3.689703057797735,1.889938094703738,17.89339026541429,4.01239119985453,4.558277051085078,16.476712841085686,9.660517796994942,4.58476331050798,0.2481083296460529,7.409990775085968,5.879211013298953,10.252774901610548,18.407417271049123,1.190392944013472,19.408942043649784,9.216720372442202,5.444605644013327,10.446180061038994,15.39609197800242,8.97759727391997,12.263716486798701,8.588693206502423,1.5722652264277848,2.183569502803704,16.624755779743584,0.28286325502851817,7.775258123512243,14.275028279909169,18.768121516399162,11.320161830443025,1.1177706817438349,9.968182731533712,11.623895680055313,2.044434097302439,6.583235121995923,19.870589573350216,18.787184806348705,18.668692838054596,18.47883869806756,3.209954031932374,14.571056937482126,6.445055836970477,15.926253702267662,1.7974882694018124,2.810610884384417,2.8807321186544277,19.493548712229178,19.921493572488895,7.198140399581221,4.93107657578888,1.7804747256407172,4.072365262984321,8.076080440127583,6.896035083603018,3.8796603431137866,2.9545740340507587,14.860093735706927,19.094192528517503,7.679001546758211,14.731856802045979,19.48114335098774,12.076535156156115,15.033451352296293,6.848833224560593,4.021697235962769,5.0656654898955145,7.669821234346088,15.639088846914548,18.412803888801044,5.721297825353431,4.067568812425328,16.17118484620387,10.965742286681092,16.46271412182952,17.762346863562648,2.5507131172824815,4.542037837226158,1.5796605253716889,12.962310007282486,0.7599982396244132,0.3113463284411644,12.386798953340943,16.63060991356458,5.8655043644320015,2.3309475548007264,5.676898001803603,7.635447379092448,15.32568694780441,17.34129340608326,6.1486309140556905,9.848749807858507,1.7215656030793403,12.008317255147842,7.601037987573327,13.484582818304558,7.706626996033874,0.5731537364387362,13.457581037726838,2.2770347311881256,14.782245810105827,10.625905865812996,3.02652078071612,10.204517110703183,8.407680816096326,19.181486889482517,18.08660438881709,18.06469843550522,5.721947673224053,11.899470467484385,4.248880693774355,0.40452278527862706,1.8171295261431553,10.07083689164081,0.3342768573525756,4.3093215178809485,0.6132805179287804,5.803340757606912,0.5454065949731834,3.1378637420255595,8.819583592284719,15.654081872434581,11.39002924740035,18.957923000373164,13.250709776739464,4.188314864650762,13.186747036158973,12.718394059548302,3.5562098279473586,13.515172707319941,8.149725930026905,4.306302209361741,18.68622750136259,4.151269648902209,14.486815794250631,17.04263810713322,10.861122813514346,13.791446134435175,19.937938841249302,18.361656658022824,14.645640294066933,18.12777614055049,0.37379633128437284,5.297935436458183,17.180952966608718,12.02652627962463,8.61542412044848,9.495882188089574,1.8575081135546112,14.79876899614867,7.611615154566218,16.112157553196337,15.950201549712354,1.4450654063522972,6.910207572751519,2.024515577112571,7.78534358138113,17.616872531298217,4.051337867035265,8.318180723922461,0.01744746412416731,17.452321281063867,4.796510327254024,11.550453861099017,14.702463953222109,0.46136427557808,0.2725435899917583,17.53264982584296,1.0408264788938926,12.739882711402974,18.746459482188527,14.664296217014638,17.479870524339525,5.955611764677702,18.67244825929003,19.547182661661502,12.405405339251615,7.222573303665132,18.125094249587836,16.70564007072329,1.4521417089567645,16.71899760159779,3.701326898616535,10.443168175448436,3.667392681192556,11.117319944166585,3.4978991360460876,17.91352078545019,15.483727892525824,0.2903248670418268,0.3577956251321668,17.454662447020816,10.483897674185947,9.290855145138636,19.05305828043279,7.676142168629192,4.31264514303531,10.11634515766449,16.826587281051655,8.058372072150926,8.193092701685352,15.772483333329475,17.16603274716665,9.945832501825205,11.670907122008675,12.482221608895202,19.516800080881758,0.27327057441663083,14.653259763071919,7.707019494182021,2.1720372361021267,4.410426037496444,0.7704550515367758,4.854236152511691,11.489411694294303,7.670915068766471,12.349828457832306,12.283845623051523,15.231792994560456,3.482112024119237,3.5163509297406437,15.63475021509442,17.79430612193968,11.479092413069667,15.208229384574473,15.363166925565391,1.0474134806760338,3.38895370867498,0.04682242246940582,4.851942316920592,14.98527072311905,19.498772684256256,5.583058012960613,0.7966250707767797,15.600960247129274,10.42243687837962,4.868091925212008,11.386325239856383,16.8728141237664,10.098966089661987,5.9927544607370775,18.149637409833925,17.032050515531143,13.09546674333757,1.5671958042151424,9.284946174941403,1.9250398221575482,17.104495068096814,9.898607991520594,2.422279422841771,0.34356843773356793,12.695367453828093,3.5454065202330076,2.6636970312003605,18.308598796272292,10.904911331059832,15.669890002300363,12.264596918571279,18.848064798466385,8.81535769146604,2.1195126336856207,18.79948276462356,19.005393683241053,11.790128569591506,18.68465298439451,19.882808439809967,6.86736773972306,17.6774985255798,18.058648758101615,4.734259237555878,6.364612164054546,11.547781581272023,5.055182490781331,14.900509603797985,13.650691802721337,11.671491236186387,4.504791094019529,7.0942018906400905,0.11122346992849863,13.64152419182961,12.732928684321276,11.825315044680673,4.237184807574219,0.2520827326755537,0.6889221498936715,17.901429570082804,8.148899056702916,6.770735196258455,15.418660820184321,6.7743278086209635,16.97324906512496,9.233163106761907,19.39693332353478,16.710111672256378,8.666421278945826,4.1341501546566795,6.5510663276720305,9.309199086076712,3.3391871355705183,13.082782678308082],"p":[0.4445678136815894,0.3602396111066939,0.027247871946400437,0.9156677137151028,0.40279246728408347,0.003469787880144848,0.7207996143031776,0.6601281408694972,0.4965650917041673,0.8732458137944841,0.8315352903973083,0.9075640735749568,0.8867728933267058,0.1422305332526017,0.2569739025606088,0.4498819989303231,0.5148010321678702,0.5265702224947044,0.9638023052087306,0.8245494823112636,0.2049593075220555,0.27277076810691514,0.5269419243076547,0.1793801545805318,0.08096605766629983,0.43869254646097966,0.7375246805883127,0.6436382177754938,0.026254183852157276,0.2318990968543695,0.13299510644232626,0.25348158023621803,0.5511164682129257,0.015893651103258355,0.2468474399201761,0.84988940242603,0.9021124875751074,0.3030882886862085,0.31900901438720997,0.8865359772260804,0.7263410624982092,0.10642402844854693,0.44704972772716856,0.09049229524835867,0.8551272153835976,0.7201620625268148,0.20811130282555834,0.9558383945850437,0.1332337748064656,0.8639090578555839,0.8191965303538649,0.8733941709438919,0.4256874591279125,0.49908587820864203,0.002483156686525323,0.2077025193812574,0.12436521569010095,0.42569947168674016,0.320021007463986,0.3926215975490355,0.42255491737429174,0.26512686766408633,0.4586875024232371,0.619293313813982,0.14153187088659291,0.4908478645651315,0.8406218958229541,0.6339176168182354,0.7928482098466592,0.5205442355430088,0.29513104751625474,0.7248567415262392,0.7210066235425612,0.11750998225830145,0.825601918519677,0.9960092633018651,0.9156234560002117,0.10931761858295896,0.2642559093842862,0.6253881336325151,0.5986991834346447,0.7606376131604726,0.078548911552345,0.0860420214510762,0.4333803119454307,0.022724492089949644,0.46196655172454615,0.006542794144580366,0.07723582931515716,0.9009242521195155,0.09773712628363462,0.09806623918066837,0.03581323628917743,0.41070658071080124,0.3558940347479802,0.4148182749390872,0.07402772464305052,0.10141835031447766,0.9404548343500121,0.45739994814335416,0.9760307173878662,0.5362130667221627,0.16753953161383528,0.14440784635594572,0.4911675226969441,0.17477196320801913,0.9942339435774352,0.35643322791068366,0.38964586726443295,0.5101867191445002,0.17004347887840776,0.02648987374212486,0.8951528764093271,0.5307720733732764,0.0030827105622166506,0.5790091478410668,0.5367907822594249,0.9037332010824217,0.3984814923421651,0.8085168126408027,0.5254485077273336,0.7495044100982202,0.4028106773317699,0.7653470300367411,0.2356918613381067,0.10691582238007169,0.9036796631316453,0.5428962557896955,0.07015284654743881,0.5689404434264349,0.37814422045111384,0.3331963313131765,0.4718272345945995,0.7979429233084407,0.7665248163172074,0.5229583970580851,0.9091993380452854,0.23000161841364597,0.030909179149227528,0.7579557783672173,0.3012897833148831,0.6658244814459189,0.21863388147516316,0.5425351315257991,0.13195570397334788,0.5942575515334785,0.6010123127056002,0.9587816890685059,0.8466816041676688,0.18899962151991123,0.21806541525140188,0.627012360592093,0.8125054526040683,0.548015970800708,0.9052628339091877,0.4421283534645215,0.8631034400220949,0.9715935491840235,0.8161792989012622,0.2682299830448478,0.8710422520027181,0.3521548964068404,0.6937959539595271,0.752851308379497,0.31768742568465713,0.3176186482674088,0.7205792652820151,0.03182693279949178,0.22589104677509408,0.19276244385087793,0.7508042777436879,0.2614308755277053,0.37747814952913017,0.5493537083558799,0.8684273965827678,0.09570297075316403,0.4887245986740618,0.09218451717741782,0.3195753123417986,0.5934550455356311,0.4153496572661284,0.47018585326832274,0.8685411844296924,0.39687301918811824,0.282330637505384,0.9307336228568808,0.6431590090702304,0.03461083052760405,0.027114842008044926,0.1238441168058757,0.12855663243229065,0.816542628522952,0.2927897418579184,0.9037217103955613,0.8148706168536786,0.7990734981038503,0.11326066512383792,0.7406348274894652,0.566698485891147,0.4861438036511123,0.09247343901577842,0.3646333696163404,0.7476180973588153,0.7068464292303724,0.04634016565080468,0.9944178590683306,0.678253388774088,0.5333141887496646,0.10704264990871115,0.4751145370178096,0.7661017586210128,0.736263309036518,0.512376103670338,0.8912354928783168,0.01450565272686366,0.7204319639103209,0.929992071935619,0.9653470892692952,0.3361936170451745,0.04802608133843389,0.024284271840857796,0.09473586533789846,0.423955997141372,0.7681863177571211,0.367730459474491,0.23289300855853345,0.6538216990871031,0.4236172777456666,0.7218780430996292,0.8850176645741148,0.22958113648337153,0.12839061485026115,0.48190510610645476,0.9069613853648184,0.5940142597256419,0.6701327426643238,0.8666590420390579,0.8631608443598924,0.5617351432408493,0.2703196583386953,0.34263516997457355,0.2012855113567127,0.8471886161246012,0.06647770551894427,0.11709128753690279,0.8694948554989137,0.2671080166131714,0.3045899400596932,0.8317659245805988,0.9562006654357742,0.016579022677537525,0.3876993046463886,0.18656070704531058,0.1600253473522557,0.11517425220514599,0.49411964542984554,0.005650279972560179,0.10698950357077441,0.07250732170430374,0.3282484825807408,0.014947914097986015,0.09849894377942481,0.15410633711002264,0.5911695890394704,0.6128977974288785,0.38066892099825855,0.964645122006826,0.8895447730588177,0.09450972602286356,0.4685340231917392,0.21391084753531842,0.5965601642726726,0.012801782059607358,0.6303306235220043,0.3382293517521904,0.8164915304255413,0.9618357438003846,0.0922633687794232,0.8833866877100001,0.4632879299770094,0.7828693449002091,0.14140437290842356,0.5507872953949169,0.7832112761111454,0.5239041879977233,0.5666814401270341,0.1230453311941464,0.1543026010825015,0.5317301611173599,0.5601979407574731,0.9992605879670857,0.6423206350541841,0.04721365675069711,0.014427184152953965,0.30475967298609774,0.3867373065790156,0.5825662427676377,0.440887720106679,0.05740117217430152,0.16438641746834737,0.8676576229222654,0.49471092444011444,0.08718070599604255,0.3861994097420014,0.9226603940499327,0.3416273258076674,0.08248286829868556,0.6717090871685658,0.4564160678037197,0.22025478242653973,0.3119862685530612,0.016107042746511757,0.38819614810590464,0.21668570357401284,0.9264820659765898,0.09744266187618167,0.2794931176019948,0.9990846083661449,0.033454924543588005,0.5356535281981158,0.7101493961177674,0.6078210874509458,0.5479911510286171,0.9956716414707931,0.8050773894683194,0.8080590893367987,0.7878981355465235,0.26301219028232925,0.6334459165337023,0.1554956467324431,0.6322664404324718,0.6011826084489664,0.31682464671567834,0.015342848003892628,0.6593312306167556,0.5331361824268059,0.4133792463612296,0.2654709358862961,0.2801859355505143,0.334404632876689,0.27709296607908396,0.01961959692007076,0.4034188480221079,0.9250582663255242,0.38488534335063873,0.5581015231013828,0.5246059164919123,0.4486360058148633,0.02954409577647188,0.9493085151473124,0.23454828948848383,0.14629465581377699,0.48954502716298776,0.6572627273958638,0.9940898146750212,0.6376323421498753,0.5893133502066916,0.6935768702540284,0.26772668856022164,0.9927306291877955,0.4546857818164243,0.03303846303688629,0.6321818619665205,0.6121068301788755,0.11754044672329256,0.1770287159803252,0.8204941223629667,0.2570261605209174,0.6839703675148587,0.5682613714785667,0.2276176519197577,0.5632569840100454,0.5289694863372338,0.6829460032594954,0.7025837136610185,0.5874330784555615,0.840727592915838,0.9111797734849973,0.6363333807139615,0.2288227823090323,0.3971397110311754,0.34216899266,0.3853565451750933,0.4441322810116184,0.3938912227428666,0.921337479633501,0.9152858462182047,0.09798933029401824,0.270698931211238,0.40690050048196325,0.8395230136076819,0.5054167905770794,0.5524442682683974,0.2918473111962727,0.9995603807075331,0.044779777242916596,0.800275765509209,0.7624120606049853,0.14641856787909724,0.026360707250716153,0.015562020569742874,0.6329032179815488,0.09396098191625701,0.3469810293477893,0.9767072109207526,0.6218541298669649,0.984595810250058,0.4010181276385014,0.3224616378858902,0.14787282103013144,0.39592486755922707,0.14496820880468198,0.1604021840416936,0.8971922415097486,0.04880482154037735,0.0664906883809886,0.06636813752519699,0.6778234140544226,0.46574451432035735,0.03126848595207643,0.6074177646731789,0.07836903367152126,0.5858262492945923,0.08615699549849465,0.19013229340903282,0.360272383745321,0.29456240921009824,0.812574730304237,0.16621840540262722,0.8900823836562952,0.30612276485306467,0.23035182008898802,0.5796524225115449,0.6938779258140053,0.3205755471517533,0.3723678873708127,0.054810462493370515,0.3116364844957169,0.9704975787084946,0.706144148004493,0.4753605245788197,0.5755178173372686,0.39398914409603525,0.8204480524414357,0.7125461092430716,0.6426284817767962,0.6145493188953997,0.9514543288730475,0.9238432312967497,0.01036512168322301,0.2653227343099107,0.6917476495932937,0.5855642303456277,0.9259599450977047,0.8095816653506245,0.5208130829355544,0.4434783661643644,0.49995495653680155,0.5768176938323255,0.5707634378457598,0.6395398842856594,0.8807760606288411,0.9052570438710412,0.49792444366377286,0.9156910463462524,0.006982141208409676,0.3579569867134764,0.47932866421827813,0.7939711520799695,0.9811429863714214,0.3488400470330637,0.08861546371722362,0.6172787436476852,0.878400740185028,0.33895285778663164,0.5399915941102025,0.5835842898445558,0.8787334873863284,0.31451573778096353,0.4177931158765984,0.8691284202263647,0.02607683381061321,0.3163762438319342,0.5596576759395209,0.4601322916950559,0.006072129802124238,0.18421527188588738,0.4668540434681636,0.7130560517113791,0.6838839180039331,0.3132351442759662,0.7123337454767835,0.7211810767930207,0.9482176927263077,0.2327211907319897,0.6593805285278969,0.08840620777039576,0.5885841463828816,0.12115279436154647,0.0307441122020935,0.8272847587171894,0.5569687458204224,0.31999465418991835,0.40337414386128456,0.589899925025545,0.19094743912599155,0.7578831026923663,0.6267187650751336,0.5231983723829745,0.11340317032404568,0.7480650577816856,0.7713341256715218,0.7624009641064848,0.8780233864908624,0.06286545964545742,0.19535022647233657,0.3862295418593482,0.8725788637269385,0.7334075571792289,0.36008866297804243,0.999067890553544,0.5154851848377948,0.8531723429545064,0.052927943347360173,0.6662491879970243,0.6506185154638684,0.088983701511133,0.26343537927681937,0.32720426472898523,0.3434758936944948,0.033205416833143486,0.9833295888548321,0.568453502675649,0.39193431385396327,0.4318084453609028,0.06267288088625289,0.5189957987235583,0.069389995179016,0.7351834551572209,0.3992136942184208,0.057293144917449856,0.15025786622035375,0.4104121602705979,0.16819783468831107,0.27850118308676675,0.49356161262411913,0.07803364080128139,0.4447179274592188,0.2226661393355549,0.4281150848273074,0.6262282473485439,0.1395339029852285,0.9305624245996125,0.9240622075465952,0.9927785566744065,0.10799467148357045,0.010690591016504492,0.9303550896039936,0.561833754962322,0.4467221895486879,0.6712503383839767,0.7037760682086245,0.45992689334684456,0.38057499410157436,0.6485412379304976,0.8632778071780156,0.31840596197153803,0.8669822044000084,0.8371086198866635,0.48522864303149804,0.983343570098099,0.6195202191657014,0.5813220396628693,0.32186869014570907,0.32072381789810467,0.9052195975088455,0.9412081181138237,0.9546281506477534,0.36084801304828495,0.3552822089155867,0.844132168558547,0.9067892747285502,0.49188901061570434,0.6026450287098428,0.6986196295205931,0.17884617564914707,0.6835307106097195,0.2914845820610026,0.790328049233906,0.290853476267634,0.9909831556669826,0.12716094610940587,0.004196795030842804,0.7763032190694856,0.18831142869718942,0.8990607101869368,0.8329723697652975,0.3316227315418905,0.7998824713330646,0.5001791503015316,0.687283198042943,0.0027629794794290508,0.7903032844527262,0.5952603301003139,0.7385096403020128,0.9424193897045177,0.7379839151761749,0.06837513099235326,0.45561965433243135,0.4650249133186872,0.1853704835515626,0.9589645072988657,0.2290035251593694,0.46135216232473386,0.29255625566800725,0.506189699848536,0.01503966637594023,0.9487749445869709,0.6919892428797534,0.5544091207773323,0.4030738793971631,0.3304249321065895,0.9306109627569401,0.046208394147510656,0.5788386591912564,0.9281559886844626,0.13002028423076495,0.34116215026508945,0.12313642496519495,0.3500425228869186,0.39463866117566915,0.3506122213848277,0.7761863466772541,0.5860808433221429,0.7124249855138163,0.8841717764609298,0.04264902186034547,0.037057767250971985,0.06775101553889673,0.8907339474704581,0.8025278449261826,0.5631249777137086,0.24796825733697103,0.6375207906344256,0.3730977477968911,0.05786018864768083,0.6323756150613433,0.7682675522478728,0.4940956604694362,0.9331253549849539,0.9731711939641199,0.6248892476586079,0.9670368298595955,0.5553177303360886,0.14425940729800169,0.4492002591784503,0.15616574758501445,0.9904360778588968,0.39901337457953123,0.2556124170888112,0.9133249540901163,0.41683823241995865,0.894530066031213,0.696182485032695,0.12161395137022346,0.6640002606750335,0.07799736072503616,0.14831981862746346,0.44715979192484845,0.586278346310217,0.4817867488532901,0.029615314193248476,0.9544585599840296,0.7257037144297125,0.9647972809318339,0.3631928607129771,0.9905317930695423,0.2707756821565219,0.446084743959569,0.5122191005859786,0.5676702102593814,0.33424957454266546,0.6600010778376497,0.7666287890077419,0.05323913280447656,0.6477509849886072,0.8518740210984328,0.9560362839700394,0.6197706839728976,0.4033431169919337,0.44796567254403663,0.57025588975755,0.32456251681376513,0.1705376949189732,0.5913057598655906,0.4672880178872256,0.8742909983074134,0.20391258640377208,0.8590256239075378,0.28912225508837897,0.04039199396383686,0.9097654655853302,0.8644064070841175,0.9130453301185688,0.43316316811173117,0.5798326520398045,0.04160084730797875,0.7150900868792629,0.20746464601796277,0.435984177305782,0.09092556669226504,0.4036765722780542,0.9138176458683496,0.2757736311740693,0.1461075388974662,0.5082335010572385,0.5190004097170537,0.4056030829760042,0.23796627149122673,0.7622977419813621,0.29086962235665204,0.8111201905641023,0.5296960414971814,0.5976301188441977,0.16299845565982296,0.9471660483352533,0.18268794368156227,0.913584150014771,0.398357529265019,0.6656079323228186,0.25180805184441324,0.0840699582264317,0.9136900987742729,0.6651808586086838,0.9164900030750944,0.29786694311551565,0.9980873500018901,0.44938524487612064,0.6696033076796579,0.9449494417500388,0.052619148358902246,0.17172511606665175,0.83362573738467,0.7258128557717165,0.3888008329364987,0.10278351115051554,0.6186827329661992,0.41332138355828385,0.5273585971769454,0.19319065234705612,0.7350440520861932,0.17378813828640238,0.39664847093902345,0.6033119985149433,0.8014479380339354,0.7624872844388437,0.4782744065660176,0.8497134420539434,0.07005461045811279,0.295012585875678,0.10774565709798511,0.5074498435756287,0.1736934097672409,0.2406580338531501,0.2774784212137773,0.9575340059050941,0.628246043711971,0.2424341913565078,0.48458367947780423,0.06529348344140695,0.9249730693887268,0.19690565540960359,0.019793523210156705,0.24570512917275722,0.32126386701904486,0.005852061250161356,0.19201609086664218,0.5050810148802696,0.5326107925876875,0.3549859354622824,0.8452043718315199,0.40353481393584834,0.1285554522413237,0.06428660447180312,0.6995936403830452,0.5459931366329036,0.8858665501314222,0.9583599679291008,0.6606364296725538,0.6369427794939244,0.4647250001024046,0.586620238494167,0.2932667926129915,0.4387500791728487,0.5745917592757288,0.46900189832190686,0.20725950225653955,0.05856983346362554,0.670928916276472,0.9881016007427748,0.5133981666953944,0.48254587219335665,0.04428234238480755,0.16891261275458058,0.028369178651915794,0.8357989785664441,0.4954219083353084,0.1194816220831687,0.6534103289540694,0.7111575992218293,0.45334784016728014,0.5426320945656082,0.9826545594603249,0.40975016920297325,0.12470689061005169,0.10523420896003355,0.7504323319592252,0.15077086255850625,0.8718752129872045,0.6040819922824954,0.5171953718761295,0.676672169812188,0.9285983341823785,0.9397494777760207,0.5572136832761005,0.2030677660425091,0.7931761059708595,0.42965531913856103,0.16551156288175295,0.29950519364166306,0.22581805933081034,0.14609659772596584,0.3008161570377146,0.9896976711601428,0.026093232987104198,0.22405295606976017,0.06284092073929504,0.13314323499642655,0.665173585444496,0.24671118653209123,0.15773843229418327,0.42976280304528647,0.125544070330178,0.5037890256023758,0.7067456137817831,0.22025968531879214,0.9395276866255169,0.09830643361575997,0.35245001474394066,0.2554544966496535,0.2145385745656505,0.27649152668928,0.38389791525972927,0.7150280946146785,0.3662027156931007,0.4426195267406201,0.2839801392777521,0.2222332780584244,0.8564388982109257,0.3259097997305114,0.7178151768054801,0.010008913983477363,0.2812369316025545,0.013035891630741814,0.673268052480342,0.9548684503911076,0.1930253517405529,0.08417272998748615,0.05419201731068202,0.06549333095109211,0.22406913617903368,0.507484859653587,0.15814844447252052,0.8779070619497291,0.4181319387159552,0.1254051409885415,0.37965171636284123,0.45624605781521343,0.1976246259914427,0.5679473235178047,0.722568324181514,0.12008732831234914,0.852643302929817,0.3374615660764795,0.6669759984872927,0.6431915817763343,0.7068847038241202,0.900991739124402,0.4796605178787916,0.7451521149532516,0.916596924004323,0.7921438725192707,0.08113894272858868,0.8788656031744824,0.20006600635431582,0.9594469559427508,0.08029605094128334,0.9132059013898117,0.3193230233042106,0.1848352950635912,0.6687077583665351,0.2485012915827851,0.3438957072691464,0.2947675439906048,0.5684603068722232,0.7974166093329202,0.7531500487570602,0.1853081442800142,0.8627111502772828,0.2969551702318145,0.03478532491466724,0.3886550072649497,0.4492413616301383,0.966290877365622,0.26239618717799473,0.3331001927987851,0.39890431776423796,0.3381556581393792,0.8426346980290562,0.3555254906313321,0.44102832211073606,0.28174471347506524,0.46650972636236965,0.12769823982491335,0.46906819131053146,0.2644399242086217,0.8281765853231968,0.13913922067165885,0.9085918202274934,0.5297629854055825,0.22758002676576217,0.39296541403107454,0.34902865010298534,0.7853032408733838,0.9005760683664756,0.39527032796216055,0.7701440486020155,0.631543774643635,0.8558768739760803,0.695433866493814,0.9063297181473571,0.9293864795975342,0.02605273614387249,0.19451387649711904,0.1361735337551282,0.49065602254347573,0.42887685898830363,0.15371191369202442,0.25551075691857483,0.39188969584142774,0.2432397346445192,0.7673648936373818,0.6428510724810157,0.7603008937972007,0.23250073717194342,0.41167656241233597,0.4956600014961363,0.8013425557371299,0.1050202197117347,0.8235079383057515,0.10425909890521656,0.33285935158911717,0.8898551653681026,0.6449030423231676,0.5376193872604496,0.21027551174307813,0.36301832544500545,0.664463284204124,0.2316453794850848,0.7876640707010392,0.8543028814122275,0.5400188551908385,0.9848554328373076,0.5252346451758536,0.90529475252649,0.592384643697341,0.22167311188183358,0.04816276941915998,0.07086619402181782,0.7095078448110055,0.662346967057778,0.5007942161151175,0.09938272493792133,0.8700776509982899,0.742415472929032,0.6559998540895042,0.11071762725821843,0.6209098479709911,0.7191929845402916,0.03452753281855081,0.48798754508646236,0.054524774964155975,0.7136266555207575,0.11413758580798139,0.13764836975996886,0.27656658606197215,0.20489938051029433,0.34310555854962943,0.9809772355856761,0.3726581769312347]}

},{}],124:[function(require,module,exports){
module.exports={"expected":[1.2398836737687005,0.004341501889715813,0.6456510579737695,0.8654289445048412,2.3593006990664467,0.015526275127310155,0.6084916329602119,1.0584814968892744,0.9435999445055349,1.1894243994995213,0.013114460890079085,0.24927498391489963,3.9512738515246144,1.3395531079977594,0.9828352050476753,1.6483755322660325,0.7513172654471421,1.3181038179450046,0.5568989140792356,1.8334353388018012,1.703546977116525,1.9572628630737372,2.0466432556901086,0.21235579078331632,1.4331539149410355,0.9838799611670844,1.1704724668428008,0.935744892556784,0.48879374615824456,2.956440618507207,0.006426759829413441,1.3575837752147815,0.049201405394264555,0.969110201459378,0.8507594644836926,1.5634121174616524,0.7373845196216975,0.36265534161935303,1.6373511034277384,2.1084668234014066,0.9490256361385208,1.8791615736810379,0.043398612425838666,0.1597820791512957,0.09165029653956558,0.444160071583808,0.31340015324637954,0.5176918949823613,1.813968437649603,1.4889031462782178,0.2079360159560082,1.1354113564228947,0.4778734378842789,2.1816242388799676,0.5627367518586216,1.4340039729685472,0.04815698508533715,0.49528817712364315,0.40502839169256893,0.008531427543920373,0.6199614119904802,1.5796056294197542,0.9138711673756579,0.4357004027048567,1.0347483149352745,0.3029464744408242,0.7555109491847715,2.160480052105283,1.773490663000147,0.018402665915200418,1.6239093817813195,1.7583259866446688,0.014074167687342168,1.5065200816096251,0.6816143371091526,0.03104063144933129,3.811848043628035,0.12197574648479614,0.1770491464736239,1.525974134380763,1.180394849635196,0.7116759352610229,1.2470138883260278,1.6141858763094254,0.5483092816523383,1.3276883940918267,8.522801745439034e-54,0.5582708330618547,0.5194626740405547,0.8961389337859512,2.0617892343860804,1.6625142235629438,1.877879712350604,0.6678204021614628,0.3835753333948118,0.1063946837097694,1.3403166202153274,1.3665549045002265,1.3701258915241465,1.046327021179969,2.1697664979914926,0.5009523728384085,0.4508821067962292,2.561510285402665,1.489035045059033,0.7952861025161627,0.2375472602006378,0.8283501608512712,1.5774686170900298,2.236718880117551,1.695194217535116,2.2367858661959352,0.563780926875231,1.163268186612411,0.7989920501441851,0.9666771575759254,0.660549269146597,2.1880627896631073,0.358310916136406,1.8208777241548018,0.4200351926225061,0.7103192897058294,0.9815577206239038,0.21482517514752375,0.3943831887833369,0.7138044018884494,2.4341493879501814,1.2016359469381501,0.17168412292714116,0.6004768955668487,0.5829045433216633,2.0055859567241843,0.2259677132561484,0.006028525688964879,1.332679148632925,1.1846515185958393,0.17955960221146644,2.3721588924521795,0.23684786082118556,0.3710130236577489,1.1084145885917047,1.82572495792098,0.758958200027737,0.8650624983111801,1.442971836741441,0.643666310061245,1.0696537143495186,1.6409442364780797,1.3472995776798138,0.14442000129228147,1.6505921721430228,2.5431034298522284,0.26587039299053805,0.4578814025684806,0.2163383287076472,1.7331687189579659,1.0572784854253712,1.6064829507909546,1.096662541002734,1.3174503732756384,0.033459196798938766,1.338188304432225,1.9776103715491504,0.7829749021944155,0.7059756953883507,2.6466780580914553,1.4111000920025234,0.6339684097189443,0.46027885634800936,1.6724271549591034,1.8727147411550331,1.0079088304013428,0.36717217644141836,1.018851503955787,2.0914416320203735,1.5618756203921642,1.5533106736157702,0.9101633638168355,0.806134088289716,1.353289548616342,0.9497196736056404,1.5365460003010267,0.15020919907624988,3.4305499331503495,2.1209522099501172,0.1357848991587928,5.252823879413964,0.5890835021667494,1.8491395432382987,1.8498147805131502,23.596515136266742,1.6530095161510059,0.7289920129967399,0.26630854407924065,1.0432812830536287,0.7457785581776238,0.18215848508436192,1.6853636269106334,0.11869811739175459,0.08058399323198864,1.323077265086117,1.313126898383271,1.1075400211049478,0.6995059837767752,0.993902669136511,1.4669519503538817,0.1335152493763369,2.2800066129867957,1.5808258825864798,0.15539428092803456,1.1870888423057382,0.5890921300675844,0.4738682711554701,1.127352234890988,1.3691861342187437,0.5817264457714011,1.625172224148263,1.1895128551182534,0.16296816391035618,0.9845062719958343,1.0810513764987246,1.252188865796733,917.0205633747275,0.5757340123374823,1.360053939331467,0.8392236795406999,0.6232213513793308,3.049386177579277,0.7122199415008433,0.9503091279042354,0.3344953663531378,0.5299366295470719,0.021632766297808068,1.4457259158922964,1.4784264406719423,1.2125095848501675,1.0091450910866813,0.20624776033455994,1.5791021964161955,0.641884406125871,1.328271572870582,2.0096630203512014,0.32949751151746615,0.32469178776956403,0.8270520643909034,0.28737311874333854,0.17631271857774,1.2631589534636463,1.0296922036454372,1.4589217829921692,2.213412339692653,2.227897113253471,0.7462858562407262,1.9391074653606426,1.9867590640830894,0.1802440311270671,1.988665892505987,1.7971660923328079,1.5402414746525908,0.8533656551888408,0.9056572957097659,0.7519968307057329,0.8632187075482352,157.49524355736216,0.3159399709118323,0.13821324238385788,1.7105347389201202,0.2630443874903216,0.40168559546888943,0.02127136915721978,0.7024220030211156,1.9502683519289459,0.6219618987224228,3.3723441712199684,1.4668133289813143,1.6045131326701592,1.722253079335893,0.3950079965390411,1.6111317534812202,0.8163916200336265,0.042774859122239065,2.04933988932433,0.6204466426585856,0.2210477210269048,0.11855333622014792,1.474102927763547,0.6695036644968848,0.01596831433407954,1.2689117602703435,0.19231588221897974,1.0987102269546658,0.43910944502357613,0.4996023209966437,1.97989532417631,1.2394490954904644,1.8225534873467553,1.8923969893361023,1.1660733139544603,1.3089125157236987,0.5428544236958922,0.9915424247651387,1.4536793909342733,0.6250442305562043,1.696820125065011,0.48641692716761936,2.0267769759688883,1.3659855308504851,1.8659879797463974,0.9798279328245929,2.0129727560759103,0.4893735178517499,1.8622080058568489,0.24433204093785507,1.5587474658042082,1.55358752604434,1.484288015206287,0.43077229479817697,0.9889446498051521,0.3852053427567456,0.3894189870511148,0.89987429880795,0.2698579152232271,0.7492766029468765,2.8716997544170617,1.3290771358792859,0.868483518353084,0.9888406043252534,0.6514525318065588,1.209335916355512,0.6725293962633933,0.8526289463224496,1.7302759907565204,1.6440936616048178,0.6187414087102159,0.06804007570038689,1.6594393000454108,0.13875293765616378,0.1341575063941219,1.2414877647484825,0.7985328932584925,7.67464442279627,1.6050571700225489,0.06036099604356256,0.0387700122440292,1.863198943739854,0.4586791581685386,1.2177639954821364,0.8374970968437845,1.0786749874497956,0.9343591805899113,1.9714162041551997,1.556035821135812,0.03256612683445753,1.659101432676223,1.6603978789713087,0.2522702595653146,0.40449596373219354,0.30818639839470563,2.495690932955075,0.10753412293549837,1.6376862475283707,0.5954966704297305,1.0288630188206034,0.3622904762993793,1.7266898829713115,1.70981134890898,1.3603124045227306,1.5577075970979908,1.1704274046078176,1.9704003559921737,0.4634484987402017,0.25671912268091795,1.7213066285166192,0.3198924698825565,0.30921025655347434,1.125663889776421,1.0441601161965424,0.2793037536966123,0.7267639438846001,0.9409199538138645,0.1815771484599135,0.5038524453797024,0.3956451228401073,0.39085028808621775,0.8249336440384849,1.0884819079393784,2.1888021616506066,2.0352632155748527,0.661075671881258,1.0957072371676888,43.15333741352142,0.2639791164277096,1.3686930672770472,1.2389776134127952,2.079891967534716,0.9192234942728214,1.2755336908745707,0.4199185453770867,2.624767720068334,0.35776910266117834,0.23614743249463846,0.6055583338770353,1.5897620733377775,1.14444420754202,0.6345555914306509,1.2255005200242635,1.3652042704052065,1.7362397881367222,0.8939445790632571,1.9222658559791383,0.8798341507243179,1.1747410881005447,0.6626212728079957,1.732219979011074,1.719497445181855,2.372965990343016,1.7487197556553162,0.32454257676788817,1.389111503211653,1.178995580789842,1.620955481066702,31.01816090283346,1.8916333954710045,0.861580577736181,1.4579104679294455,0.3163001882895651,0.055469467372135026,1.4278521751652258,0.9933978224776662,0.05255336497323907,0.7549469078081439,0.19187864136911228,1.6451383912126885,0.9633460195876626,0.984538731113114,1.6816060428413355,1.934054809590833,1.4695249901529415,1.800868265991559,1.3840673155249332,1.5459433973580068,2.0731581353884105,0.9595986678820227,1.047255572343213,0.08352943901955413,0.7254728998191279,1.1285185064212844,1.390405823964076,1.002289252780272,1.5314183686036174,0.3920895434157856,1.0385073912466531,1.2106913989007693,1.523718543466303,1.1854891039914317,1.074282189944417,0.5751440902145453,1.292965518329373,0.3985378423393649,1.0947357710666303,1.015712612030008,0.5325849645385579,1.7102037908151593,1.371994915903796,0.340044286690261,1.0804136449904411,0.21999497872570842,0.6846475234756252,1.0077505914704783,1.2154634712705077,1.2787809315316547,1.297631211999318,0.8753580939909477,1.6750748981177535,0.7148219873270169,0.7060688932927551,0.5134037503937757,0.5475961509722501,0.07280316810749426,2.146071963407295,1.1172368073293764,0.49329450552275805,2.6834052890326108,0.6765529593934703,0.2940150073578497,0.04639235552234112,1.6507835375204165,0.10816324661559028,1.503885803324933,0.6173623692143612,0.1804881244746574,1.4829452486150867,0.18344352326732946,1.797048749785727,1.041202579698375,1.1249360217787256,1.5735232652060906,2.324833152013457,2.4413188908629073,0.33313508938650527,0.07163210506100658,1.6951081462557696,0.0009940858358376485,1.8502476647738801,0.8453614108280685,1.6180703640617644,1.235711194215286,0.5904387753365733,1.0095926761982146,0.08953273831318319,1.5130298978606824,1.456604429990649,1.4784227692183298,1.8758794183322676,1.123916688672632,0.16372926646123637,0.633865817836852,0.7232854654594045,0.9337342054435882,1.733739945402438,1.3519547159574279,2.021562632653578,0.39153039620572416,3.2009866732381025,1.4143451251737442,0.4481799692981666,1.1812297574320743,0.2981517387508338,1.2329818426005559,2.269461766236305,0.49320939516979306,0.17011587639596704,3.6037169131838045,0.845567291340164,0.2466118343857664,1.9165081131643975,1.7080153354044931,0.4375952979568729,3.666501360070023e26,7865.545302526057,1.136942881029834,1.4873679730597804,0.9263257905432524,0.30694944931187895,1.9887633918688497,1.8238619577681991,4.3959202050476796,0.6204300709031155,0.08328486976270388,1.7016185738353349,0.9194821842022167,1.7943782011865188,0.34984622507438445,0.24806557480735966,1.3228080564739504,1.6954476392549147,0.08296831997919636,0.896853322814776,1.3205168792696784,1.5815350632893859,1.1373409009977398,1.4803748944772328,1.0998748316410567,0.04586358512161491,1.4926616040477811,1.6303111455728432,1.9369147600730836,1.5400170489279836,434.67413032822924,0.8627404713898971,0.645388555656369,0.24712502137311138,2.0367809321043304,2.047074621190139,0.8412408402582628,10473.166047882427,2.935851518660819,1.8806977680507067,0.5777890084599959,1.9670565701422071,1.9552357373849585,0.0736645371574039,0.3157440729833292,0.5279962143626391,0.5250022114161516,1.1384122763255617,1.2260512787143187,1.3257276256420487,1.3609496884008256,1.405731145275453,0.6292282880531384,1.9430653350563492,1.3179047649878999,2.048934303432849,4.399201315615318,2.941705458652983,0.009325290182432798,0.1319400088050386,1.660691254830035,0.5904191828967199,0.26551738977649686,0.005478266380112879,1.0095525898887447,0.6184671192145306,0.3856398003027597,0.0690143643563276,1.2771839492090715,1.832050314825954,1.0529649696674206,2.0263577067661123,1.0578061036286432,1.5331466412279822,2.454044334704274,0.5717947767460735,1.5908588281352776,0.9432628790381071,1.2312601149114797,0.13748900930833882,1.4481177121158126,0.20601000692468913,2.133860864048716,1.2754029747494062,1.3243414075453965,1.2054913969385794,0.9925111682803904,1.3635807277979524,0.4253308491725267,0.3434097879630921,0.6645061512032517,1.894883877662952,1.022304480489953,1.7452315700386491,1.074445387808448,1.3448647032046037,0.7240799544694645,0.42806497694031703,1.8049909356732825,1.3281559895637556,1.793969304488516,0.39504931071982546,0.7593880651116677,1.9479825413946565,0.12706020395580175,1.97405053630864,0.31288255958436995,0.6505707601980448,0.06083646133748063,0.7597912541104179,1.245701856396101,0.14068425198155046,0.13440918826689027,1.4219174423548675,2.179773103405904,0.3843335112145084,2.614134497612122,0.6417842734876029,0.8489486644296315,1.4003917358700233,1.596398870304493,0.30463260550330495,0.024319121244946514,2.106576960467619,0.896280458164581,0.9090918235329896,0.7915623207685653,0.16348459978180013,5.5328060384766785e10,0.4864194818670209,1.5686282855721814,1.4191459553086936,1.2448872149163788,0.10389460036089176,1.7615786658138668,1.5437372557153084,1.129241288823065,1.4777956645827228,1.4136011411906515,2.1210265081414956,2.0054952175838774,2.0563878917379146,0.0750866829925937,1.3072961418267008,0.13096749034585967,1.1238128027692735,0.12114829869869809,1.8110019437439675,2.097396270671082,1.294874192577939,2.5845948322956582,1.5874376516329436,1.9284494696370351,0.8550783910298805,1.884552126598795,1.1646657448438757,0.3755165827309859,1.3563840624165764,0.9562724472554112,0.44442045252748247,267.5504706379182,1.3076602517387022,0.00555793962110212,1.4311974680941166,1.6429505230129355,1.0368710661426148,2.5093467173985697,0.9676221534610796,0.3772650683488859,1.5131438352966402,0.4985503404972877,1.231075678423164,1.30337842038467,0.5902381666106776,0.06277416117811996,1.5444276536529702,0.8572973287836559,1.0939229145145104,0.41581767942221515,0.22231747190191178,1.2588046480140938,0.7875031674579422,0.5375884739498893,0.0018919900175634386,2.225808108746085,0.22115283808180702,0.006652047501824197,1.7928959006504201,1.4301911493938608,0.8713871561210159,1.7896924559741438,0.200520681197112,0.8894871596421858,0.6624421410268163,0.7548466802815067,0.951272754174247,1.4021053707373345,1.7472710088704726,0.7898875972515152,0.9074877309674909,1.693884242671519,0.3638628024362214,0.7484540472795029,0.5714031585831175,0.2798452187038222,2.0326558646020247,0.8747045773471919,1.820183982850531,2.021131365450353,1.986299307188687,1.045823364196204,1.5009291974867365,0.7020427499609241,0.007684360514305561,1.7146417273424504,0.8279559126062888,0.9184457853054482,0.530144732335061,1.5857833703148583,0.12112296788611691,0.5997458724649466,1.7233419595211854,1.304639685140333,0.8020747580328338,0.671615076262081,1.7190689926475888,0.15396262156364368,0.6251538527993199,1.9183886986350804,1.7591989676880044,1.280846932737319,0.8757130773298857,1.4355329889039825,0.2652308051980697,0.6344877221430328,1.1618142430128262,1.0998548373915769,1.8113919820229276,0.4616512483741602,1.4381672214535888,0.43506906014946767,0.6728283725046776,0.8207598613458659,1.8360491012872713,13299.858640801016,1.020573105855892,1.9218518122606263,0.7881548560563757,1783.6429238220844,1.338660180243413,1.199348629089429,0.11584656407257278,0.7754398197498859,1.1850859325280338,0.4961894287876337,0.383933329734854,0.44017831866955337,0.2731131457851067,1.7030965808744876,1.8604750792752733,0.5929036749742356,0.30521236119297324,2.2761398204206365,1.0763455306640455,0.22955063214879232,1.3925434298378114,1.531501182950672,2.1670792364756086,0.19581211666118992,2.9672793474127315,0.11279798341252452,0.8426888160734385,1.7186136120932292,0.01711189150603304,0.15213103783104961,1.844045657576154,1.5312129399523036,1.496899276074639,0.22501480708640234,0.0006026942960993626,0.7052617854306026,1.9985261714249132,0.8897439295135838,0.1625953071053762,0.38572896326061995,0.9156942851358256,0.08150317685039603,2.2017450827034333,0.5340687692883718,2.078022776135839,1.1009330198091642,1.2562515821272138,0.9127473564896662,2.3835436049328877,0.2518712149787382,0.8239245959933675,0.742304315530202,1.164361421465277,2.568275172247752,0.2692104086482592,1.5370506607357863,0.42078096384197455,3.6733982522642967,0.4827333252993609,1.400659701577444,1.2869216465655922,0.20325459895511946,1.5720493657368009,0.04456926071538625,1.1627604979862327,1.004487243642624,1.1646296788701505,1.9100360804142376,3.513899346520094,2.1699660463715627,0.2379563950894979,0.328020427394771,1.1319300924770872,0.9425465244279914,1.5813741849312835,2.7595923580703916,0.4405157297641339,0.3635959644827463,0.6335742175626983,0.4467668942227857,3.590267063572818,0.37218281606482584,1.5577477747228128,1.6434940398981264,0.8762285757688817,0.7134997772165489,0.08397297303263629,0.6567291998342323,2.00654877145122,1.3662693652523679,1.4266427002975668,1.5874407063329838,0.27138423454001054,1.707270011637122,8.484190528010227,0.9787303997597002,1.3747815346054315,0.9423936363625709,2.290317769505853,1.5070056090341808,0.2633887771773653,0.8699466929902957,0.22895497100465886,2.055472002429161,4.527134879172096,1.3473282680391436,0.8429594983658781,0.9787145258552672,0.6174155349634745,1.4631584397569184,1.0810134790918038,2.0862954429980953,1.445840291936285,0.23762603128282528,1.7731827952753745,0.7429297149474334,0.6523140970868367,0.46090804764687593,1.8922204717323472,1.1013916699204664,0.9855169229459754,0.6445875878020978,2.246123253198339,0.7851445473376764,1.478771460235026,1.457625032052786,1.8398900045178082,1.774988480002999,1.796398530667822,1.6161814711898717,0.5758495700035482,1.2924991214421628,0.6207179840587427,1.6914672853241164,1.7388689350358992,0.3856587669223826,1.543320765389923,0.7229563740105929,0.12371022024464907,1.2462513082761977,1.5833997234886097,1.9757747130152288,1.7590594026023159,1.9007936650164259,0.3479390737494774,1.307268867824085,1.731113010057891,1.131909759301231,0.9634897819235657,0.8020473278329842,0.3525039230099712,1.5821123795164485,1.5035820101669681,1.0509344842360255,0.28763752736831877,1.373825490808559,3.776324655618766e53,0.19145533685956773,0.9589027272240878,1.336533670956916,1.6155128450906497,0.2882095101756391,0.35807798403712143,0.9089660223995812,0.052977952546232984,0.09194917927037859,2.019662490343579,1.0884283464520892,20.194354783825364,0.5413233796106651,1.5476136843540493,0.747807809342022,1.077588938364168,2.04947567687261,1.5185020769890893,2.907672915443453,0.8533023101114421,0.9043095092216858,1.6211370560884224,0.02732333385841638,1.9903226938029215,1.2592791167844373,0.6048178076913818,2.0391630370701503,1.1503328557190702,1.7512530097179577,0.42661624357701405,0.18057881209423318,0.3095965499381779,0.6374856640422397,0.6562493004179281,1.5923373193172383,0.2315047751237298,0.32497883337319583,1.4282640482241213,0.6130234047859318,0.08838024036066533,1.2809042590828883,0.7971993090246101,1.5537853829474568,0.01101762934878776,1.7050646733241972,1.2636508872770722,0.6001290669927261,0.5481867977116923,0.21643105103911642,3.9276115966917624,1.8536110493602709,0.7479528413168748,2.7496749245569174,0.11089925331615412,0.04851635135505224,1.2072940094565994,1.3860642700594212,0.10439309466431895,0.44898423493970047,1.0763870843889984],"alpha":[7.806190973114426,0.4834330991238778,5.0754189109135295,3.661738825648748,3.202700513467449,19.120622010083817,12.25436294394643,6.063190598887123,18.991241304267238,2.3839149689126327,4.468963199424678,12.921404295400368,2.1496582397725295,14.136226262249254,8.346606958836853,3.9999783509578624,15.732167941446292,15.969025551260433,1.402998034300662,18.560868292652067,6.87419348405391,1.027587617492971,5.375037056277248,16.709324611722963,13.153457549215863,1.6500401858275415,18.042852623399913,11.172091923860602,10.553128643718486,2.0201878162637588,7.396322439049436,17.179290031946536,4.9154306421846305,1.3575613021599953,9.153236389199261,2.5743401552693124,2.1930283626069835,15.550984482732439,14.098463329923131,11.050690807161239,8.921908067518803,10.872576464662886,5.824027033661268,2.738589797870419,9.745224574859751,16.161639166121482,11.337773795093863,14.907099175416159,18.947211835641582,17.963125854462515,12.468623951943316,8.277234099363202,5.418921231055087,6.048867292916209,2.484832442083529,1.9966491391866104,8.283386399974756,16.724704286685462,17.51444885960766,16.523970625859118,7.933430715833691,8.427612788475741,15.355197370948193,13.462739012314028,12.396239398167342,5.2063832446231695,3.676922449571536,3.4118476527348873,8.985653542054205,10.937894673383504,14.45711966727365,19.300063076367238,12.339103131911102,4.678556982624351,11.763579998294805,0.17344577393231475,3.283593453955924,13.204858328902631,18.0778439089767,6.847688234553537,19.831817722249987,5.702811317912082,9.723323514941935,8.767378110855999,10.36065899028265,16.75244459861906,0.004620209004997378,6.972901072011339,18.692945455637403,9.490336080399327,15.521232930625803,8.14650658677953,5.531942744192935,9.058325440617875,14.294900111645479,11.803100912754378,10.982927603613328,17.350095067815403,19.94985971694831,19.554309629231007,13.880969442945613,17.67866391654456,7.506748304032387,4.475052624922862,12.706205099981425,7.973364003857153,12.335725293149281,2.7260341969772517,7.816628737384597,6.298491009449121,0.43928792264341876,5.0927211455863475,5.870887345833116,17.977219149956486,13.187221878218192,15.912225753021128,6.494895494382811,11.815489475160884,13.96500044421941,2.6732328704375963,18.51498273168202,18.547135682943168,7.289093422958355,0.6952335116447461,10.702710167604042,11.091994987460275,1.2106370452346216,18.635307491611208,17.294962931501118,12.06572302739053,14.536132355524112,6.977327447017085,0.8795491753496698,0.1968009506061552,8.146370815398157,11.88811095114922,4.4657532760020935,4.702790437972233,9.38900915986987,16.99018152693613,12.961480643834298,12.081857546137055,13.013251829199866,13.971382680864206,14.511842004617748,7.098266239190609,15.877231359636678,1.5476324691105825,16.997939860474137,8.520165174725198,14.883659632986163,7.14183046800327,9.210065223921994,6.376795125089503,3.687769235601812,5.658114868080202,11.668118646425366,14.371587163348686,4.675976723651338,16.719303957786522,6.302008455757053,19.356300404877853,3.216266065926403,2.6634897111988387,19.581868768207737,6.323410171169521,15.85160928532078,13.91058506542696,14.425917802458375,19.843302512106774,0.5638236910536376,16.86066350384781,6.400990195473439,15.80755297349902,18.884404520440683,4.00036510865915,10.167879816177319,2.8672304428830264,9.75335710377854,10.375421123991071,16.83824062583113,13.885419147883802,16.462027666129188,1.0111832872515558,1.8082395908951865,19.491638286108902,1.6064321516858504,18.05518867791731,4.7877263950271365,2.009207427776749,2.105646597219306,15.784542972063198,3.885881797392945,7.657222601308442,7.019193335347342,5.638106117172459,4.319460117111444,13.730893229493656,6.327683343437607,10.95602902491601,2.2963097734698223,19.606591867931527,8.893001249244916,10.949686995919317,11.821226568577519,16.376878769940426,3.6601017088488197,4.916437848429793,0.8078193123615485,19.203753008943533,18.50720077589582,7.531873338857693,0.29123158211387334,2.7651634995501917,19.620583111780686,16.90956848931759,5.001606266273342,6.7649791595845565,8.577275395618331,6.744695019170406,15.40071142844544,4.870956655834351,0.04770511759818685,9.968082332402496,14.380513412239644,16.458863976319872,9.045871077369716,8.158523382948783,7.991979920889265,3.4852598018599545,17.942122534631167,12.175613169766283,0.8917678596217238,3.234781422272599,10.559426325740748,7.342246156747079,15.661518619142779,0.3307670933479079,8.51812713139983,6.60016780439622,9.912961913495714,11.627331921705428,11.257927737797528,17.43073997024998,4.105412156440678,13.730208490474531,19.2581629033208,16.632790082213617,11.409507249589064,13.326225428952881,10.86105056375651,4.292510496499533,13.855229385268984,3.76924185114913,13.131340629080256,2.2765960555310416,15.0417333305733,13.17305430237569,18.099570458113014,3.7974755391610504,6.338015406917763,10.089711737854081,7.770478413039488,1.707890604577993,12.741646217650565,9.760856577579457,7.6397908553353355,7.638655443111988,8.658290951452416,16.00391915379251,0.7089465566830366,15.390595153240927,13.742079349269787,1.583230606031556,10.598730051717325,12.2204788441808,5.353480663538317,19.50869685946706,4.902131829623295,18.31632824323588,9.184445883786942,15.400179521605137,2.0567043775913696,0.9061787832444468,3.3217056308227155,14.329001625439464,0.5508551134180406,0.08861416969390135,10.166358870870308,19.289389816659973,5.710319644767066,7.183015728980355,18.547327815140882,5.011803413982916,1.596899080163774,2.8285602189303827,14.135449011049896,13.284087978541411,16.013421529143386,3.8125608265950417,4.083232482614272,11.216135524664747,19.89726188000416,9.60588775217798,11.351037597768201,16.391011132631938,11.804473307908076,12.607956659796198,9.258685732868447,6.110312695903848,11.369107830827328,2.5986127791799296,19.02761349921795,15.568288868060707,15.45592706155048,4.844425520820579,4.449451865885812,2.971652205700752,3.4418431890461543,5.169294767228827,5.371845395431749,6.019111368665375,4.8416082358841095,4.519663089255959,11.246974479755899,6.185794339767496,3.2940899420114933,18.94844998418042,9.431697302700313,10.064964028205354,7.992507192369156,3.9189989120592905,8.509924301379677,12.061763931313227,3.4009566121955315,10.454376276180524,1.4341682605163397,5.928758505445484,14.486554261995458,19.60845751411544,1.6105731182262284,14.070134774193184,2.6686121111362793,16.03789666565172,12.764528055702865,19.737819751711136,6.972087277261156,3.220685788980071,15.023578272022338,13.6728752061757,15.118233094964072,16.362787100626477,19.448358808306942,11.291877368104487,10.57997798110545,3.947403334717867,16.57892976765901,1.9329669028159246,18.765598770984578,16.079113256266776,17.08197047859801,15.975895905883215,9.79348102286135,19.806350476129243,15.773837738733288,5.887345975857317,4.3688285629416335,6.55802195080855,15.558285083024082,11.79809780288268,4.679273862693174,14.996255319923147,12.247269395320629,4.79248219361855,15.971232893330818,10.280656147623217,15.86029964048755,11.414727858584953,9.957175262337312,1.5710449975451546,7.044858840981245,6.025438589330161,16.062709366988205,14.82405444327262,2.7822490058662908,3.1576551184048984,17.213824792807316,16.314069592365293,19.661445208481272,16.216213688126118,0.6276530681384518,12.011420549521254,6.388164928943736,16.038604435824766,3.725558720759863,8.301076908672789,17.713049505742205,16.78883253478761,2.516210324251955,8.268406917376838,1.349293724320897,12.620977956260404,18.825139109532053,8.31208871753438,5.053119890419615,14.560313566576557,7.773955932199232,6.037127879761504,18.260025834809596,5.044348490894466,2.772809544743269,16.578914777413623,7.0155331742628935,15.966966319511805,5.204228640541397,6.769188866110891,12.274091967173288,5.7855155357307675,17.897033248868333,8.70938249641771,12.127569198880103,0.5032071925145365,15.340296155450037,11.471508188584192,6.481516904796023,11.68830289928545,18.72164733248112,7.945938782976714,2.7480713905288967,10.53321846666472,5.582131412485327,4.398039784950356,12.277158179940152,9.27192627454878,7.65100401647306,17.25409469184704,13.065746228869388,3.0282810158789175,14.28716259790141,12.100270480963733,4.478603417727296,9.077753596633983,19.94736710895452,4.838069623562418,16.22383616816628,9.74451024779789,10.002612047955308,7.122174803049841,14.099809895415794,13.632293347421282,8.594180986373999,1.5260167243723854,19.30866747435963,5.022141449039874,4.065579994941224,1.4322718671099155,9.596313173310143,17.882294704661852,8.662150824083966,10.406551449585194,10.014663139265267,11.04434137481106,18.06970749949237,6.353243478893149,5.807731598205557,15.66085189238542,13.456035219918498,9.725827743684983,11.075325418180322,12.788829296139799,4.66154267965146,16.098769703821674,4.454422002683738,18.869952223378746,13.679207749778772,8.30628582212912,6.889421111849341,18.350975905187404,13.652019233197565,5.653214097226575,1.696286517721326,2.4563220717821244,5.59278963114243,3.754028250965109,17.67991732879797,9.69037839894857,12.620833915927602,4.5050941360860275,12.597754308179514,6.396651592591378,10.055702968419382,5.200891308022801,18.12481145006368,6.194910286910775,1.4784459604800615,17.11764134966714,1.3622874081032865,19.593074043831095,8.648029736949212,16.030440796691057,0.6944874060716,11.559706199743701,0.18101555398628122,7.114470754773365,4.285035825730201,13.188005272214491,11.334013468478554,13.091237232612691,13.639508058923568,13.695956411747696,1.9603811797492288,6.326663454352688,15.16205937966384,11.628662112159244,9.26519061491669,4.813668201080614,3.7986750582100015,12.522079612347712,6.814328715936115,18.752979320243398,10.934442383659903,8.036028917852063,10.835059336961152,2.0145728343637392,10.673298164841487,12.9793507789205,15.62431312081122,4.336163278052809,14.686020065602033,13.469862741592902,16.413209754004768,17.972618955585258,3.5330959959927988,19.890785304883206,14.02841657524219,1.6030332531459646,18.36293828435503,6.709275740730978,0.03507460146205954,0.363580433079167,16.78052426467398,8.922961824541296,17.66007804976421,17.69038492570659,8.888370603190449,13.841866494349588,0.18892924215520246,14.301992446332044,9.262102962932065,18.492308518156896,19.026587791821616,11.024966106426252,2.454259967800203,5.211200591376808,9.10448538511325,5.52541326587467,10.174543742105877,12.930981484540446,14.037672522313303,18.124666902203156,8.837345754129352,12.72465517551276,13.898465409915959,8.468488326231434,9.229327179530058,1.407746702350745,10.606774934686815,1.95623599165764,0.6539180177115744,18.31885411845423,17.749316044149555,19.797925374170298,3.512834752286289,10.81658029432338,7.706715377910438,0.18099561258760222,2.854342025111185,17.258850525874543,17.323380543557377,18.412173866599954,14.0285423759736,2.4626315570058077,3.037913160843564,6.646240903036338,14.720990310759268,12.50394944066123,13.408860907844575,14.870582658477804,14.786092617398685,4.363701578783297,17.2746879062867,8.128809797722592,15.175207639460826,13.838091817857743,0.6053289564840947,7.077534565403427,2.52686135916234,17.14333697191256,8.328946782649126,14.229302061934721,11.751803059173508,4.6597280516265105,14.387721603307195,15.540315081359143,16.00632437585299,12.72207725029816,15.678748837868536,16.487965366453537,17.486188167967885,8.610514954746545,6.910625634377969,7.152261112308085,2.0288206641560302,16.91690644087959,16.826669111820422,5.016471225627801,19.483720483427955,15.502997231886177,17.722793049843055,11.320619374955427,1.097113991655525,6.066661545296679,17.948292202361607,4.516538097756899,3.251185726576016,13.818203626482468,1.7831914153033868,17.58329991831074,13.443601817370725,19.414105410996328,4.609790197911017,3.3654870111446966,18.44108738803586,10.977166116900925,9.503213961331639,7.899028683315841,5.78218985628089,12.12923446188077,2.731863289080967,1.1360895420083628,17.066419659519887,16.829662848923356,7.441604094305352,17.755514577971287,3.0900730620363337,8.009979391464611,19.13083516133269,16.206428837408126,13.353017746384657,16.571618381645603,2.32092482307936,6.343990661394989,9.875550280022658,5.53107864591146,3.752949565607673,4.436149300200012,6.122083898804225,18.63889281653911,12.288356530485757,9.533112259900115,0.829662753524083,11.066116135370581,15.763547169606502,18.28674565984229,7.140955624435357,10.914871332332758,0.06701494569636868,7.527492818182404,19.64954981246034,13.703309471178757,3.3090539033547994,19.215157236779387,15.681841103673356,18.95225665203371,8.56556051044453,1.5590740103044842,5.200470558216201,3.7060894953528845,17.76175749913768,14.089486520830752,6.761995499289872,6.780791404960045,17.590332621440044,6.407322103284785,7.887074847179227,19.76000104500844,13.725289359917223,6.166794021532467,9.17430563754127,16.022848440278814,8.42494126973425,5.158270255575781,12.789706829587137,9.96437390408957,0.8859404044537422,14.821188281779282,16.026138001134292,8.988452988369398,0.2702181917617352,13.044937735345918,8.251454177278106,9.590320579030266,10.446497195659328,12.61107235383825,3.9799505759327714,0.6391685309034445,17.67226886268462,7.560862082661717,0.6611312511288592,19.77006093255288,10.667248001768508,16.522023861256102,16.970602917713308,9.944498313294087,10.052361427671745,7.786015497164085,11.993753372867442,4.406844411017148,11.134554357024268,4.572394816239287,16.903400439991948,19.566333225279507,11.921716543860526,19.10897807198383,18.634426041111197,14.7016282173492,15.38064946374603,1.768780956173388,3.5393150707367527,6.002762198047948,16.177001702128763,10.569007261712141,10.950828978142347,18.280888253384077,17.898365664193882,1.4204828930722302,14.066963397060949,8.45340597569848,14.810827945259334,14.30731017464263,18.337904767677973,15.939881966115156,5.730303276510882,3.2223675298588583,10.574014326428038,17.874606173641283,8.9426592439828,18.916437196518373,9.641088750787784,13.4108446875734,17.957311160047777,0.48977510108969113,4.873766404745248,9.228813416107524,16.177102927321858,16.78298689282159,18.282753677824864,2.2321397050430125,17.214139929608095,3.93507238349017,9.800144452948501,13.123340027151942,13.758919445346333,8.526969472059282,13.59816256294744,4.996133666063942,14.371238420395889,15.537270845434001,6.655554109934609,16.749500109162323,2.54915072596829,10.714006774871901,7.485374614058298,15.005018063324286,11.89014304802134,11.374560401449862,2.6090182397211503,1.3694177307332644,2.1963039632109416,1.4233511987300096,1.341785729882048,3.5314264261803974,0.6210202763901584,13.073942663089642,19.98788388666243,12.906156183215307,0.012564907009653403,16.885957863106192,12.126528387415707,0.7201078022751872,15.933722034257475,16.808780014109725,4.573908076251123,18.244830306851153,10.167419054719801,15.119830141926101,9.117874938734388,14.162182359264293,0.4492757823232818,17.712324991865135,4.858636104640537,6.59293049604567,9.409893577202201,3.2202960091569155,8.443256352097492,6.039601215438872,7.381384605890533,2.162794422042986,15.927793591090031,12.565833291572996,16.141812544663445,14.352509516729036,15.146491362691187,19.321387943359763,16.33291607942866,19.039099937764995,16.194398863351157,8.541215126793382,16.339800306812634,6.55136095643023,18.726669806180418,19.003473554195573,6.27842738025957,2.2602889854794928,2.2657016475135405,3.3059033681295746,7.17147002201322,10.946760739584214,9.31499165719579,14.507627909951966,7.9720291744080685,2.20227750297064,15.43627798186054,16.858105266852604,15.967601931898287,16.587952193519225,14.956327328684399,17.29160080404824,14.632562199730623,11.591611440325359,3.9454148257024535,19.180018165226734,4.851883315517398,3.8812007059525166,16.441098103010994,16.938072629609884,13.230359220111719,8.987252851050718,13.331348568130243,8.729659583303086,14.587147075696102,2.9725903294411804,17.69300861990079,16.539027739022558,13.694416306342259,8.863146962783999,14.023460442783119,6.620267797377539,14.503653824185253,5.9596857772250145,14.307203713163945,16.662396941830973,1.6950311763568626,4.2295786229171295,2.7990515169389463,3.2628574433988833,7.1968683779796505,14.752655295801329,10.779630929943345,11.034798250476658,17.09363794410351,10.735317379693443,10.25144620582112,11.986316131796993,9.719929246467437,18.75241791900126,5.000531045286518,0.3285887165509038,19.586405131126533,18.06539550385509,6.766901200039803,12.44293601930497,4.5023240024049915,4.890563163409176,15.783638855368372,11.781606680748204,15.455194430907465,1.4395834265871787,14.19096654129634,8.284301119706331,12.014773933922855,1.2189217234508032,10.662395526705284,16.039050789917667,6.125086887797759,17.095111794970258,4.48430605216108,13.315606971243493,10.174562927422016,12.17488348134018,12.027272655941372,14.61690869758256,11.486597950095376,7.950664034202259,2.5199348193319793,1.1346496355140223,19.119140627081674,12.128894400497972,12.76447057519146,7.877082265982129,13.274998956925582,15.878881976327062,9.383294109842115,14.267183739055866,16.71520438377707,0.49462582421494705,13.168604506100777,6.70567736157802,17.042802711276437,11.743003764010606,6.715907183763483,0.34673851113698806,4.520265745690182,5.279446421735026,7.542702094500133,2.6770740039992402,13.216502039666631,13.224267059701283,7.290761689382905,13.295546698024543,2.4872954745982767,15.759285437367563,2.674440094932047,6.275308139660227,14.473439665995226,12.508701971516455,14.40614058476758,17.864120816766544,5.780565256535959,0.04208434350105428,5.871301927178134,15.914521111839077,4.530636809470532,15.611082506101335,9.05570887467956,0.8030191488521332,13.12378942528655,0.19457449582934938,16.840761466986155,9.320314670552436,10.161040811906297,0.5356507076360328,7.511778259824897,10.50953134276073,18.253154995804742,9.613852585231513,12.143183347491968,1.467278522102613,6.979403719732464,9.739948732906445,10.712805380238354,11.03500805137509,1.6549441993096536,2.7641335092938,15.636920792704586,17.406290910640077,7.242447233713065,6.066403146076893,7.36753865067747,16.26724626583588,0.2887225530464965,4.334899722825285,7.336081055400552,17.443110613624427,17.982291862333447,3.3282860195044783,5.41027670620934,2.25295218036329,3.3503695432321745,6.393609143862555,11.774606015159058,15.370312645068713,7.59483096813431,0.31440655558047315,17.479183533147058,7.98036317007309,10.181196041059932,14.352045878027049,16.94284200147388,3.1987868048194956,10.586150030072199,18.417823705216204,5.701605909067293,12.10896002753724,18.15535401671502,6.485058011854274,17.54249897748314,13.746003276772406,6.263770733708656,4.4382500892859555],"s":[0.8213706637183389,0.018923842873641128,0.7169855581919182,0.8793329204843285,1.344409555280785,0.014326678167438711,0.5953789812217463,0.9408956753439814,0.9519458825137646,1.3109141757880471,0.011938904279693574,0.25045620865138263,1.7153810216888936,1.1724130844817169,1.039102368092066,1.826208155297309,0.7407198042972509,1.2195201011800219,1.235288426954162,1.710271701896195,1.4412320766347393,1.8674328684011723,1.9559252735600814,0.19124690051465443,1.247547868631048,1.3687593055323268,1.156129387822443,0.9363713209117686,0.4803238355613737,1.7477335779279088,0.007495990321042978,1.331969294846644,0.051105196734500424,0.6855186118877268,0.6699200502473612,1.9335999036925111,0.8998509148169016,0.36341500025787443,1.5891345429264487,1.7560214139053634,1.0903066998459936,1.9942623025090218,0.04580195625364203,0.09571934442096408,0.09562903852851745,0.4676495091653261,0.24822825561390038,0.5170423132501165,1.6957643123141914,1.510183463150622,0.22552437002754466,1.0538466479459423,0.4317847231149088,1.1468777966228583,0.34551832216516676,1.999404786414829,0.05344665868698861,0.47326741803451844,0.37505727469605965,0.009599058833452467,0.5851195952169426,1.5432449129134707,1.0180233752477492,0.4147287456063049,0.8604465423158372,0.279014925553176,0.4843787108794544,1.9635222486910369,1.5421342907558553,0.0183175657065906,1.1584441493585875,1.7127148591708945,0.013482080163715437,1.6074104618362148,0.6103791035740738,1.611374442617013,1.0440889733113008,0.11309596770023544,0.16870038147060162,1.3709642601256244,1.130540331816952,0.6346251205548326,1.2062596122553289,1.4140265039317814,0.5520420898464606,1.2841392258126825,1.8673398390299671,0.5559179514698034,0.4792618888520601,0.9975796732102635,1.9716608980938721,1.5036454287226753,1.1648463731271166,0.661063472104833,0.3901547813998185,0.0917383865542285,1.3830085168868944,1.224566489438303,1.4897380397771718,0.9293965599963636,1.761967931984318,0.47024437667834507,0.5024999723376133,1.5728422693676003,1.1931618967029993,0.8585344505992496,0.24221587610876316,0.8347557184800256,1.2600974360502213,1.823076637910126,0.9255398132470067,1.7565444445875782,0.6224486489827585,1.1741614012976336,0.6420569992304967,0.9357552827904843,0.5221679397745587,1.8195828155334524,0.32785900317234606,1.2481898187895935,0.3616833594899975,0.7065360097485431,0.9996875684886612,0.39005681139599346,0.30675939366823624,0.6248744159404653,1.7821390427690984,1.0756044345609581,0.1497504073501963,0.5262247366316455,0.6229393886486436,1.9753106444943787,1.0298121705738885,0.38857785704047254,1.3587838462635689,1.2086473169553118,0.17536092485721788,1.9330695192633915,0.213723897740985,0.38904744562073734,1.110989897146605,1.875685132413841,0.681113541823557,0.7057372361697829,1.5539236359387965,0.8072403639546142,1.1429724339531595,0.9115597742598416,1.2895568099577077,0.1587827325402409,1.5420522732049102,1.766915785043715,0.264470359351185,0.48097704582315437,0.31312516241430677,1.946677548343298,1.2025607749367144,1.6558833742029,0.7946959610435083,1.336039701501699,0.035791896913891286,1.4459808348875467,1.4672882740541793,0.9434303162526927,0.6660230990054483,1.9101150097777833,1.2554572773897434,0.6620461451328556,0.3887033349088469,1.7602955894640657,0.8056166831194624,0.9087792143792468,0.31098060643487857,1.049957632237008,1.8600688343815674,1.6696307293043664,1.3538602741607,0.999544413650487,0.5468477964814165,1.3059768224706656,0.8567387886856164,1.481835180638738,0.15848997669998388,0.6088896137364359,1.131119748430737,0.12192401211400572,1.9316048247491402,0.5357077309894116,1.4697308867493986,1.0118460098709896,1.7074172404706096,1.6753195805251306,1.0575305151685916,0.27267983821035147,0.7097685128976514,0.8023894630787951,0.23273334353837027,1.452357717581351,0.12881750257334845,0.06300269635946343,1.1268139705365008,1.241371779333269,0.9435648929758291,0.5247941361258577,1.0672694670938903,1.398234706888434,0.17895190685900486,1.6662689959950208,0.8814828142635891,0.14574239541361145,1.2316801959442092,0.44080423402303426,1.309682116117897,1.1712871688651014,1.3549895569513515,0.6286444107938638,1.822226204620505,1.0558128835705722,0.1420316935697583,0.9796619182440676,1.0291953036034158,1.267802042324202,0.5220934254098615,0.5013103208224257,1.4436068430087245,0.7322310975937345,0.609501460127372,1.817693794097047,0.7929243347941157,1.0269064238609413,0.3389877217105295,0.4780597995369189,0.05484212933722121,1.7517769397234986,1.4295818949789942,1.188713071604611,0.9886079172658548,1.1368304598946897,1.579616946374077,0.46172565772645546,1.4497773600967037,1.7821546753188278,0.2663587872321327,0.3351825046890986,0.8763676995760958,0.2790253087770518,0.17541837590086828,1.0754686272877962,1.0770917733077265,1.406690746474668,1.8274570022639605,1.8997247858010757,0.7759555954780111,1.6192353056291657,1.876105172905119,0.07380640774062996,1.9742847968320039,1.3379327588215242,1.5804479302555499,0.9269989852726992,0.6906206407600233,0.8584394919713443,0.8340569780422151,1.3299702534625104,0.3467092260744389,0.12574729944525176,1.5450946218474595,0.22086106615422008,0.4343350994381434,0.019857480574829278,1.7594592044626975,1.949081694985268,0.639935316121369,1.4474337247325435,1.3378714006201395,1.3813626459603663,1.397358690486755,0.41484446223187454,1.189063732820991,0.8412782013988704,0.04072221802360554,1.9512922995218065,0.9209898142335726,0.3769788224570325,0.16020641174817918,1.4922714427247503,0.9810237099189454,0.49910419763008296,1.259626404047765,0.17703900566599584,1.1036129189999944,0.5294935968349241,0.4849184369955699,1.7797935169940073,0.46972424180886563,1.5166246243718788,1.946817758256084,1.1985342788231348,1.3512852224121037,0.7136556179496885,1.0701217847167732,1.3551490813796843,0.600152189571431,1.6658237117644465,0.3548690926272333,1.836166465603787,1.1582240638554762,1.749398220763867,0.7913552732933455,1.795189595553392,0.4959476641824119,1.2908113994332342,0.2434482357243848,1.6080345487650956,1.619887946491664,1.7803154665213903,0.4059326354901347,1.0693737557967946,0.23926327067046982,0.4673341699347704,0.9283281573098101,0.2967704838219536,0.8817997723644191,1.969855188968427,1.4828084608831724,0.6027561354834519,0.6949904873582273,0.6895943474288435,0.9282847425797374,0.5778700785987785,0.9539832481345898,0.9404495625982747,1.9332171515690226,0.6198956822572819,0.0855569934411502,1.6393575469081978,0.1728051193425233,0.14072633062259987,1.205714125489048,0.8179923378882559,1.2627195849982926,1.6492472649398007,0.022421342150677592,0.04080650421963172,1.849777993346886,0.4719362632284505,1.3366196009919755,0.584631919367423,1.1106706776371937,0.9657213280454666,1.896979269584,1.5655974691166126,0.03418865864389797,1.571462249801462,1.665931866878763,0.24744507224163215,0.3896081866026524,0.16791788921795048,1.8712053585645831,0.11026102188206455,1.656064544625481,0.5959070702130043,0.8931739474358222,0.35997678965833435,1.6490586589058758,1.422042199009386,1.1647812771760955,1.529865187697062,1.0720673648187447,1.8405061108479384,0.45677519723270743,0.24710147310885233,1.7307487305849825,0.3495516264798466,0.30376975989099986,1.0798054779358126,0.9966019634534886,0.292854149609699,0.7959949429920772,1.183023427262886,0.21051814666011204,0.37521398870525635,0.399990976610189,0.3968826580305689,1.1640412936241797,1.1813583529940277,1.9806919913202803,1.988804436630497,0.6593499288611184,1.0656956180972048,1.40452966769084,0.24068034164114716,1.4215036490884616,1.323407042408439,1.9611119446924699,0.8502597145007891,1.2651668272496925,0.4170712191328776,1.907329375903322,0.3528336152783984,0.4497673511000335,0.5663128118937619,1.5780622221654355,1.198536892044051,0.5543005979460975,1.2528018766253783,1.2878204853566615,1.8896850140524335,0.8309290490683723,1.8792099446361723,0.45170664798830584,1.2019510653923198,0.684924179414756,1.7098714766688068,1.6547522269561825,1.926155568197799,1.6184096826679792,0.3123951887646066,1.3741206258249807,1.3843218093301917,1.6422408661788772,0.2282238663759153,1.3955691896658813,0.8593890514681242,1.4519759959861371,0.33114249644730887,0.05249514040351899,1.4055756693082149,0.5932823713339412,0.05686580532935004,0.6294505297713595,0.13749420468780293,1.4883233251775914,1.0103550385857405,0.8597995158267646,1.5890362772165547,1.8032308180933487,0.538324587986736,1.8502688088528867,1.496892034381216,1.323994785804906,1.8566335717106406,0.8641629233096153,0.8509573494783451,0.08219751479578186,0.7996957811390342,1.2218443520718836,1.5371077179146382,1.0294319829615421,1.3781698570798762,0.30406441858122024,0.47709514873921144,1.2341452261108525,1.520992885901114,1.0789677766954782,0.9574811485629313,0.5685173646932711,1.108621495558387,0.4129938364852883,1.0973127000355452,1.1213169966085488,0.5247833015207992,1.6954897178370558,1.658193433459945,0.24053655943578223,0.9985911389568543,0.22012632796467457,0.5494846389707941,0.9935636701270552,0.9437724996189805,1.4584514873677086,1.3247689445309532,0.8395088282199037,1.557030544979876,0.684558635548965,0.6707930555483563,0.41500676129751746,0.5043868356312169,0.07626272083450569,1.5708399273441196,1.6238358817807277,0.4446540723785479,1.9377706709140532,0.8024153912065342,0.291756486424708,0.03509923640354673,1.8198415446133018,0.15605032006051056,1.5116693975072106,0.6016255073967733,0.20685415670101337,1.0815925273679792,0.18975916064031528,1.709533362716296,0.8193359970837539,1.1749185438236056,1.6784037645267627,1.8693334348544455,1.6700951709509555,0.2707472451542339,0.023663645595345173,1.8093790216599936,1.8870579644360634,1.493896342402743,1.1853920755425653,1.6756186851941588,0.9665617085407683,0.6693044412668385,0.9266944625447495,0.0724862751698212,1.239204845127516,1.2003765901083767,1.4551223933235415,1.4132593438624843,1.0310679307234203,0.18815502864997002,0.6080157906391577,0.6715512100921681,1.0116675789277343,1.8166281532010307,1.4179049663050143,1.7837317373892492,0.3356170471458162,1.6240789986666795,0.8880955758720828,0.32300834766965325,1.2657867252657167,0.2892661338315148,1.3071325969991996,1.930719438149521,0.4833575146743798,0.16678875462757325,1.3941630812388368,0.8365247521843191,0.24439519139950194,1.0083634817527853,1.6410574163489549,0.42331923989146825,0.5499240068396483,1.8203737833560738,1.1038113860634797,1.5421191426207654,0.9833751150305847,0.30472201444897573,1.9066762345749266,1.385460788016096,1.882784334710089,0.5068572568461631,0.05285786522171909,1.7263670289334128,0.9409735796362955,1.5940090808772096,0.39480761072686166,0.23139030281667194,1.3089322104094983,1.557039183145108,0.07738465747871626,0.9076021621189891,1.474832509639775,1.5353309702500022,1.2389443039253702,1.4476806428761448,0.9819447792534435,0.03856277519748996,1.3253815956490995,1.118004307721408,1.7811267293967927,1.4427659620310842,1.8952095545151235,0.9068319420132731,0.6113298296518344,0.24601763879789562,1.6882933949576069,1.9175732964266645,0.8101353532594411,0.4118529184171096,1.8767718929088741,1.6108765925205581,0.5758490780929377,1.7812854191020424,1.6230402408775761,0.04523418136551616,0.24941337973716804,0.4991753988751877,0.5566239582798866,1.11907764428776,1.0828461183781957,1.2135943922174324,1.409406507606338,1.6601100657304917,0.6016503359364589,1.6759983132547758,1.2136868014341098,1.7167900532430491,1.6328390714621714,1.9623241395314754,0.007308537417005212,0.12020324053239673,1.821451888502247,0.6186330982192385,0.24987947535919597,0.004593410180269153,0.9421027239995095,0.5640276676245444,0.37798688042335993,0.07034424377436999,1.2351818248462534,1.7045845935332569,1.0614235859488947,1.860267418394225,0.8419086482590328,1.8173443382752277,1.3459550175343789,0.5892239601065916,1.6081101879344817,0.8951431008918012,1.2361096248022898,0.12362102696772093,1.4199843019552447,0.2070938349550766,1.0832584428096887,1.1412506966853373,1.2905780089130152,1.342607207119983,0.760266538699812,1.2878148730209058,0.6589272741282794,0.36029619481553743,0.6593630189967588,1.8721813157824108,0.6757504149228444,1.5768593258076007,1.1541642981667213,1.1748817609220956,0.7146510567209674,0.3803136484841745,1.3369642646543718,1.2774624494981492,1.598232413989225,0.5497416993306694,0.7822600452722916,1.9318096276148093,0.10365729849248018,1.9863569443424685,0.54325730371189,0.7384187551157488,0.060094160974393684,0.7457886110261529,1.23892756782074,0.1459992113769455,0.16034967462365257,1.4339265200223563,1.520983821581389,0.5274246571534249,1.7842962739702615,0.4886437243906019,0.8026180789053936,1.3743529036386053,1.522731798698313,0.24823586390286723,0.05640290697225403,1.9352291419487342,0.7194244584552933,0.8398673460123742,0.7385823794785003,0.1808938076409281,1.8466245304602085,0.5240130638587797,1.4838297172998338,1.2396124377291606,1.0526882566710971,0.09728840310881548,1.7103477086032415,1.5861161858764623,0.8554535144749096,1.9441591950194184,1.6976388023381426,1.8397143198142927,1.9941846881676484,1.9297458833683674,0.07061126553640307,1.4525906767171342,0.13192992990709929,0.8233804921356804,0.1159204353212413,1.663486986827706,1.9226698436518785,1.0268081554093027,1.9371540017487128,1.5793227378164465,1.9204994386232142,1.0583238007439077,1.8491730273221565,1.0762234559022303,1.5147731280555239,1.2817613895029254,1.0152228326542212,0.5258708964736543,0.7545906954086612,0.9937788952697568,0.00539141176462854,1.229384180805872,1.7078121973482534,0.9331122354654608,1.7757877932399118,0.9255321312774636,0.36408161359694,0.9423222548479884,0.2920945095709224,1.2021209819135867,1.280606030976895,0.522082021569513,0.06166661772212878,1.2538979543502604,0.8505081636468246,0.8841211348970575,0.44744424365061963,0.2867953363316835,1.4255982829039935,0.7627436895322379,0.5528409009241946,0.0018413283680347448,1.805506528969381,0.2129838343745356,0.006648803765223477,1.7250787950825988,1.4003556713425995,0.867142906749323,1.564252484251457,0.17605231527082088,0.8776567980157104,0.536257364016778,0.6335571752556457,0.9020914145693872,1.419621912831318,0.881514219778293,0.8341934965402946,0.6934207003947894,1.5968151447452095,0.3962772926790503,0.71914010338637,0.5333976225826826,0.2799855497072832,1.8196348012985384,0.8161173183948289,1.8117300439335233,1.9495320770659395,1.9577676525626915,1.1836667739837252,1.4452788359172795,0.6560746314977064,0.002937806097903284,1.3087036953465203,0.6260630762116248,0.8736262295617481,0.5087635665947294,1.4958119564721994,0.11250756934631179,0.5927278796873994,1.3103607709263314,1.323284380762578,0.8160270787442729,0.6448831408113818,1.550779283212512,0.14240001858865492,0.5002451627527842,1.9603838939200666,1.6448116557131005,1.2094436434969258,0.788000635494932,1.389477684683941,0.23108825768131114,0.4919943854093085,1.2369856559420795,1.148738413140868,1.6333644032682635,0.49193743752454333,0.7201364569661695,0.47354802450423916,0.42375376408715093,0.2371877299513807,1.1229888340745626,0.9041098577253828,0.8896341859885291,1.9213337468650646,0.7610183481713584,0.32641838224075537,1.163560241653729,1.21781785769247,0.3887283484491566,0.8035156023130776,1.1758340693216236,0.7010019180734388,0.3916991361207529,0.44514539707327616,0.25079175252842534,1.653531480610491,1.8029820679956554,1.8594758078258948,0.30201240629312887,1.97891248118195,1.2391481175254642,0.21598200857474703,0.974778595116939,1.3999011428069,1.6219959665200263,0.18194336371242947,1.4106344738152305,0.11524093402950308,0.8836594832916713,1.6314993138698224,0.01721795422292738,0.14539737113838225,1.7997362368740566,1.370766224939962,1.54044946388826,0.23852966571449308,0.0006552573860232336,0.6835542548139761,1.8710953672882171,0.9026401572184235,0.14770309181259655,0.4326738265882808,0.8574831268261853,0.11159284804943992,1.2094166835274685,0.6673034555223256,1.213928208729861,0.836353257247088,1.2432669858840137,1.0238951075479985,1.4582468725694846,0.2689007392586613,0.7911725376538699,0.7703672295019777,1.3166602909892147,1.991771400273831,0.2757402325599849,1.380479567927087,0.4365357612562888,1.0810358346019266,0.4771023685195943,1.4315012884581702,1.2804650241346351,0.19714670512433186,1.4712580813285179,0.04367520309506201,1.139607033087378,0.9969946943115842,1.107250265821747,1.511655194142242,1.9663395197882312,1.8415855057804453,0.23683177029039282,0.3102904169234142,1.2044666695471808,0.9730335172836808,1.618562673039341,1.6911153487953854,0.27666094742693614,0.3362357809590404,0.534447425284307,0.48505386641035253,1.8467454790879607,0.42439712741018276,1.8523997588021741,1.0458010643338027,0.8381154465214857,0.7661185015760505,0.08982484990206885,0.6872473039572298,1.9857868129276985,1.2254874129437252,1.1954815840092188,1.7436011132712745,0.2808423878767745,1.323278972310765,1.4762819428241123,1.0043591848069062,1.1183465615556707,0.7073153385947037,1.9900510739969093,1.3798222217521205,0.20912661426032875,0.8587094613113142,0.23759750921104095,1.948715887518278,0.9741540012080967,1.1931251861102439,0.7976399763435862,0.9329108667644328,0.5458172851432899,1.116813551980711,0.9735248466345001,1.9125479694869183,1.3076745647915247,0.2145331641441146,1.7410410474760911,0.5805671220260225,0.6163629469094332,0.47618337970383706,1.8646391118613113,0.9254313617301619,1.0637690423679524,0.7797927338272901,1.4526580251003054,0.7963019918077814,1.3381649958775585,1.279197878025041,1.730361965188004,1.4677078388603464,1.7069529761158533,1.4589282953698475,0.5105321672674075,0.9191410082684066,1.8883706097179833,1.5668953081941477,1.637259003332185,0.3610002022830061,1.604777330721836,0.5838131430418527,1.023910034605703,1.2106263508259199,1.263592819882053,1.5579475496805313,1.9428600782443457,1.8340874334881554,0.32708657967089483,0.9078763328335668,1.4601279232926032,1.4298265205771439,1.0526325920993678,0.7426746716392385,0.3566773937162546,1.3518347330783937,1.4131912969340146,0.9695152377246035,0.28681392230525704,1.4792126879574106,0.09925303208767389,0.13419551709563615,1.0097069668770033,1.5092150598366367,1.3707690840035776,0.3242845189981134,1.0980233312581102,0.8281192061873033,0.8960666253428089,0.0886612905796329,1.7071215553260068,1.0181643148839532,0.8472228768961103,0.47702534342324254,1.4340766903456448,0.697049512815429,1.0855906366323236,1.974021817977056,1.5659649087154035,1.8712729568056288,0.7900212034376692,0.8260140805262899,1.6778709739569462,0.04330920204672495,1.7305592534147154,1.3310772136940816,0.5577842973771499,1.8297969164154249,1.1048777261790752,1.5492430785619935,0.4112683778336246,0.9671478201477925,0.2860339629605648,0.5680608245091845,0.7009576216977256,1.7013430226828277,0.19934150653178095,0.28723458175968153,1.4123134033533096,0.6025205089378134,0.08010320001699256,1.1561072962535954,0.8240583536437773,1.5023254383937799,1.7093330428520401,1.7796906079631878,1.1815425261931836,0.5426765863287337,0.5940201639619129,0.21768001642529144,1.5447235726899824,1.911424128656658,0.7704898707885968,1.8700636878651626,0.10853012405129148,0.04805017401174494,1.0022678854898843,1.3662808990227555,0.11292184044747344,0.31175684952967275,0.9767619810145325],"p":[0.960623872350117,0.13035744062731047,0.18229304669513358,0.3464216607616153,0.8478128306859443,0.8066071017891372,0.4650071228773376,0.6128188982634872,0.3066550005781392,0.2833908182116198,0.5182758890150687,0.3454216045392011,0.8467525759992365,0.8589997592420135,0.2036240321986651,0.2216796156165921,0.4494516451366153,0.7490234710949011,0.046985330149696525,0.7595143886331615,0.7284713572245354,0.38563327160001126,0.45669963905840505,0.8404036808850828,0.8510180665197327,0.17831329630723491,0.4490849093363647,0.3651289859437783,0.43537598962674573,0.7076661773465411,0.0440959677260655,0.48630583853746834,0.2996451080226936,0.5352573256814459,0.8938540652765277,0.1776038510593485,0.21276798982520395,0.3559104905350323,0.5188586745373311,0.8759160833937707,0.031768117810784924,0.1482911262514124,0.25442017218627067,0.7820767458825513,0.22023434785110352,0.10026664917825023,0.9313376991511888,0.3747645129120756,0.7565787156327806,0.27517123621402906,0.06378310257057151,0.583020615204731,0.5614728017982138,0.9797538517978979,0.7426010740694866,0.14343746563700188,0.09339492243414194,0.6266457576661848,0.7709331845789171,0.000896647050829591,0.5315315386476953,0.4396408261981306,0.005274126640188337,0.597663939988418,0.9033838159919847,0.5212496690968387,0.8227923531626784,0.48592356633825906,0.752179207029098,0.38652225933244266,0.9924544778187165,0.5476344482349191,0.5552089706049985,0.25813176160394447,0.7611394838835355,0.13754070705620625,0.9858672633401757,0.6917154284890037,0.6586214412509332,0.6186485160832349,0.6538093831614276,0.5943809210093023,0.48485036829270545,0.7310566780776442,0.34204108232147656,0.5644246697836981,0.17139541651139734,0.3787119396843819,0.8010215170106982,0.0628594435768901,0.6067183748699985,0.6432546051113699,0.9312450827077574,0.4017209383704661,0.2793688699662573,0.8403982201422158,0.2438735312098379,0.8615178488474586,0.004937602565071808,0.9061598762159662,0.9459322761956197,0.7212089391517791,0.10475436686726436,0.8933697121117345,0.9418371709254953,0.1587019698721599,0.28044981841782324,0.3601548781709556,0.8413418276695077,0.7589363011206274,0.4646099859507471,0.7467392554883221,0.16726658425130192,0.30653678255003625,0.9456078132613299,0.550945989185289,0.8047513945306954,0.8930010928803671,0.7487971881053932,0.6946068550110043,0.9392181576738827,0.4042595445736734,0.3189526860422667,0.22005166311032687,0.9343181209203197,0.7956649669858429,0.503786193553657,0.8808728869072207,0.9102420775067315,0.8159590684531524,0.07234602768108545,0.40685094856220827,0.02245198054928732,0.10329079999103885,0.3099945096618406,0.2810537327731766,0.4066806462410357,0.6825695129177327,0.6830751393492187,0.10647079593147568,0.3568153141787702,0.25016018288395037,0.7830431365787873,0.94346824357186,0.05339533928287499,0.006808965064844852,0.05697508919304051,0.6685780886517669,0.6219239766952436,0.10614156667205088,0.6953422468229815,0.9284655663892452,0.3857613399213051,0.2544596225613207,0.020036565396341022,0.1452046010338579,0.011196615059909876,0.21322841675993565,0.8010754714299098,0.2825286297824543,0.21671622538916968,0.011336844374910005,0.6818779393036263,0.19339615384832753,0.726459346684265,0.8805949454267179,0.8548467617981272,0.16084976926817052,0.9163867334681468,0.06314143945532646,0.537133587323052,0.8398428229912549,0.707974894797426,0.200158347577317,0.8964958029428174,0.2709313676628431,0.7809458482404099,0.2703284283158709,0.9775487900902864,0.5009414838112505,0.8382687829187352,0.5463714608367196,0.08900257706844261,0.8402198253650202,0.7255276624081362,0.8846081778726778,0.8183472827289755,0.8352806008631102,0.7167334330446999,0.7426354869532144,0.9960405799563536,0.29063996028629635,0.01434067193825328,0.3016581903870281,0.9352353502349393,0.22077503835937984,0.05604627859294764,0.8784193680918382,0.18672022750282102,0.9347843352586496,0.5007610445784811,0.7172863077913354,0.7862164368087472,0.9579129389344627,0.09819734915458644,0.6339405262114537,0.053860445264715784,0.8073437409489681,0.5358772228316431,0.7468642323928374,0.13824382272172464,0.8935273139811271,0.2606535926752642,0.3290627766405605,0.4426152775627885,0.02442611148215823,0.16990208861385048,0.6399472011139342,0.7353133864152968,0.3801164827595165,0.6255975311612139,0.3456882831251853,0.49649208237436193,0.777530609948174,0.09470793588417914,0.8994591386388886,0.4414837305485937,0.9854231804773024,0.09459730502355823,0.26976849347807286,0.2807080624200804,0.7518181055681263,0.10103127427650405,0.1555095501085495,0.4959185926245713,0.4212353765107575,0.48447653880415276,0.1722630730985093,0.3668581151800756,0.8925408751816004,0.09241942488307275,0.7808678133377505,0.9128465751523374,0.17540092294839815,0.2812736705035892,0.5131730368807441,0.40385166964002117,0.9334481835369406,0.1880403796560346,0.5405446410218229,0.8826781474339174,0.6037526649866762,0.17973076669449006,0.6023764895447012,0.6242651626973308,0.8772335746686102,0.4079633100316262,0.9797055756949418,0.20305874173707972,0.2542863180768882,0.8357580912539946,0.022309948402141844,0.4650361838353776,0.9997124233701293,0.03808787444939643,0.6720163594071717,0.6314571185844853,0.768651164638841,0.1398463918096602,0.7170460247229185,0.14698749358528973,0.37132545936462846,0.22782437467303818,0.7694527391580803,0.6858396536943681,0.8517936082641879,0.7214013697919104,0.07420236497982846,0.7980610330540792,0.17670647829765107,0.5291040465352794,0.6249977276611924,0.10504684726951585,0.19748160852348118,0.06595828042999918,0.30365150454358925,0.29105433503093003,0.2575185313974049,0.395322719114249,0.8166122494981671,0.3585274704530128,0.021577096842814614,0.5626768549988346,0.5564039643512215,0.8086668741840028,0.5517455938761293,0.22470474097740656,0.23689241941929806,0.1890789870360594,0.05856556358671794,0.2552909547479336,0.6343792913936246,0.6405181123930099,0.4327051168185816,0.9724869230893809,0.8202724944112545,0.8670870404971116,0.641898033351326,0.8707895410291491,0.6084973695149527,0.31228882084652954,0.6798892545062702,0.3932257344436012,0.19718885066277858,0.14841916107774633,0.08952161917951229,0.4640462386869093,0.2832101622706824,0.8235220513130879,0.07674911427133702,0.30665801117738667,0.16996591301432606,0.11079548500974967,0.8335879305103346,0.03255881111946213,0.9008412357613309,0.7312634830123608,0.052906452105443424,0.920782190950336,0.8047490205509615,0.08594650573742846,0.912386791373246,0.01888768325015211,0.35961003468130803,0.11309422261901747,0.414582992174392,0.2541259211377347,0.2650997425504338,0.5195932045292744,0.2012168127283629,0.9468020594002706,0.23098183580419063,0.9313116660092735,0.1030143568726627,0.4017795526413901,0.17293140106272054,0.1474619376809323,0.7303506225363481,0.21195406105899228,0.20793872194382312,0.5718719720790564,0.33106657409733975,0.07620197449050492,0.5816836276501576,0.3549314291587675,0.39589758858299473,0.5844851735533338,0.7340312067776862,0.9955123139389879,0.2240705602047035,0.2981944736650617,0.36383051251864784,0.7785632501855559,0.41444016908000414,0.6162986952058906,0.7132589046910989,0.6019073009375568,0.4112931890225262,0.7747614999123866,0.6393689841470098,0.3928277556059483,0.5688994496114115,0.34325102475576275,0.2166469249693026,0.4708885790546511,0.520963015469976,0.6203806291141998,0.17954502527533212,0.0842100740843521,0.23860815429035287,0.05874667587619764,0.844275272898036,0.30367067581621976,0.28510778477066645,0.07378091386558983,0.27388329264730116,0.8360208889712724,0.503530562325156,0.3867778251662928,0.5286663243130623,0.8900180370782638,0.7192074942163762,0.2798219601489671,0.05621205193698331,0.4478673012822134,0.5924934368138794,0.4208784549115079,0.40981258916194463,0.6390290801205625,0.41004328594887607,0.09206352344776159,0.6509815203323843,0.4188764023223297,0.23039538354596711,0.6035283463839693,0.25202070765040396,0.5297678893078657,0.18873421522525358,0.7685791231943777,0.4098284528702296,0.8543176560422541,0.231831751586977,0.28324866399907656,0.4436396193218153,0.44089799877849156,0.7837865102392534,0.6793996870788082,0.44845189909593763,0.43889190961988467,0.017453971057971085,0.3099270708585209,0.919029918185136,0.990630310653094,0.3786259749888954,0.3776039697306057,0.1810211295733022,0.7002145179858397,0.4137284688587133,0.7846198599149783,0.10076829035638446,0.6959599418851723,0.7938214054991373,0.7465186174957168,0.21109746723084744,0.7013910861510844,0.6862893897161464,0.6700030643251809,0.9533412655490734,0.22946023485885148,0.07568760671893293,0.6068188267449053,0.692544360524125,0.8836084863376283,0.6932738207008091,0.4628056419752782,0.07550049778896684,0.1092713448636442,0.12964349322702007,0.23280676482542773,0.7885543613083825,0.8936249008156827,0.7370173868612182,0.23494045363346294,0.3711872765401478,0.5056224361009534,0.42826431548712374,0.40870913562079836,0.9381130720446365,0.2562595883077132,0.358879260094644,0.06769055337090779,0.42758302064968023,0.42509596041168685,0.035705980966891815,0.8746771249435226,0.7472806602405544,0.3649248109855123,0.8888915403075521,0.4254178738083869,0.961423923586675,0.1579190610674306,0.24772532779936962,0.4360264132838143,0.7773701152489538,0.5750163055493496,0.5203245289290839,0.7938327998614021,0.8014964831398632,0.15186801467956967,0.8425148138601282,0.15172342982550213,0.46073875114226426,0.8505190299682344,0.14995470634133246,0.4178845703599334,0.9352027157742182,0.032613750668968544,0.005441689448884457,0.34397209165560927,0.4283771067157198,0.01945554365189639,0.8238944796179992,0.1577266916681681,0.4799980428910373,0.49575630614942434,0.12188828765761062,0.335584287118432,0.9861511767242581,0.9631899991204369,0.9646359129091233,0.62915607777233,0.1193439976331514,0.01981454385197501,0.8039064432974123,0.014161456850812826,0.20484643528784852,0.9400956043512092,0.005731274690775612,0.7328614666437927,0.9460808220005803,0.5085844819552905,0.7452460126806115,0.4556863949571075,0.9635387801050699,0.6377369099425161,0.14185245719340034,0.42583200280851297,0.6737972132008054,0.1778555696034223,0.09064864661676908,0.18574758385292345,0.693678579665697,0.8283476403051813,0.7750019724739836,0.9930583822091053,0.9858504295579467,0.052583231992038515,0.41600872886384366,0.09464151551765121,0.8928511023051784,0.4876873865524507,0.4959997592907519,0.9657023896860653,0.44598830922186106,0.41435567230934045,0.699625128084139,0.6188986571633304,0.4491093491953635,0.8917283957821778,0.953455346383496,0.5440032484746102,0.25141311107205233,0.05651420531909901,0.41515088899439223,0.5028193750218171,0.9779965774340635,0.42657153520180113,0.9460253769230207,0.9852795408917454,0.2708847739614877,0.21180636076451442,0.7625728343453111,0.2604212697109338,0.49865450759359664,0.40314577413259167,0.535443620278768,0.6112781369612494,0.31143718321735503,0.008929850781183468,0.5575138667929562,0.11882207402109968,0.4711236092073794,0.8132349674918729,0.7942821083551799,0.716146433084196,0.5554402629705772,0.6630464224188442,0.4147006588784117,0.9718015120031849,0.08274736896624124,0.6824848144600255,0.40054736796512214,0.5961462855334687,0.6106802290455713,0.4733161129954355,0.852603513339864,0.7566698145422641,0.9332707662816775,0.38930060303348824,0.8513185045526637,0.9292576448766889,0.7401452120900247,0.6135417723575722,0.5022681385063019,0.0939016071310026,0.4461074167747323,0.8277004295322619,0.7643780714417427,0.18684024272519095,0.1266433316454827,0.630610335476046,0.740358980828306,0.7509138692343365,0.9171230596153395,0.5776178344244207,0.9446320821513681,0.5826150955628131,0.8167055779135683,0.11545310416661514,0.14327767234043476,0.6126275219113395,0.6440095147898599,0.6908960696213164,0.7875285474981393,0.4840617988308271,0.27947687590756876,0.553232759896988,0.7374771423582975,0.31658365180436254,0.6194956252634101,0.8134444654311341,0.03423249912458637,0.7440475582714468,0.18978154083015597,0.30149585261195355,0.46347817939121216,0.33973200054949504,0.8250008650235632,0.4934611241517073,0.3460396411365254,0.6216954521039173,0.600767650435817,0.5330885706835882,0.19657858627447355,0.6568164371726051,0.6351664910947998,0.11273132312296874,0.09771215881743678,0.40623841138465,0.45322880772340945,0.8621587360870324,0.49127608070726736,0.023685020814995905,0.7970101686694322,0.41358885784777,0.6751192400366455,0.8383633651501183,0.5359355785798128,0.4822283485384229,0.23326413568656768,0.19026009449415549,0.41933337727644227,0.802653881878828,0.32737000705412833,0.004081926774697209,0.06341037730503096,0.4535363076942427,0.4772407760443844,0.39464284463710175,0.15742838901572642,0.22175795163037182,0.3482608869374628,0.9717912273940703,0.003157958800263927,0.7877897380893817,0.7420169473186071,0.4920209289272386,0.4942047062601471,0.5714450595647811,0.8675914873881168,0.13403566910989206,0.6763235709610358,0.9692065955265061,0.790604242979893,0.5434835336221377,0.04891421204571467,0.8199024482999597,0.17353980166304805,0.7149548847801361,0.85496575203895,0.5632016282467633,0.7535352138903098,0.532858009318339,0.18810766018516278,0.9114675877386218,0.21575693231681048,0.07491567769213736,0.5542312131229212,0.40477450888010136,0.6647284481339866,0.5168625831425468,0.12958827657581895,0.32063401702157956,0.8726034912963636,0.49353437709474623,0.8297919684128605,0.7385610110475584,0.7872545147862431,0.9314834003524097,0.39805580172628696,0.3806804081861941,0.0495810962180574,0.45623237957834073,0.6343003538806942,0.03204639591321867,0.6490296591533238,0.07366087178693026,0.010688352366686527,0.8149269342154863,0.9725248174374204,0.459317338509599,0.7923369199642356,0.22345921356527865,0.7675418067056934,0.7768241387015797,0.37833524788680406,0.5866442350140757,0.9725310611234472,0.495466774989455,0.5354422102976935,0.43666229556807723,0.8766093816350493,0.47746171470249643,0.8817173979118473,0.3972512554337848,0.8265118017751387,0.0899071340691373,0.046338524092557565,0.018376739704886624,0.42143064877632286,0.20096012519119122,0.5554501102817653,0.9208119196536049,0.6143856800791145,0.37122302119043904,0.5670605464990806,0.48526138166144084,0.37105648884256714,0.5374381543462683,0.6326316363331255,0.4469756585149116,0.8983819196777107,0.8634046953173171,0.6846030205436102,0.2868357436326965,0.684968731776455,0.11592566164671281,0.9022481403267986,0.6588462563489137,0.03369524196185636,0.6183960548727405,0.7161718431136075,0.36682260078861706,0.4966079198560358,0.618518095675912,0.3984571962021233,0.4846618549674535,0.46740110318165806,0.0369117133578738,0.5474487176828182,0.7434942099792052,0.5355714669631757,0.7649001555397625,0.926992972994269,0.6407283032127282,0.6058485676289,0.7091166998753071,0.42820726065147174,0.44193711540329184,0.7115897966154681,0.3168912142026816,0.28536714281036746,0.5644663519545114,0.6600707574982201,0.707583062409022,0.720101580531098,0.2553630768288184,0.7034010142474121,0.5052751000958673,0.8430583322634824,0.39842438885168363,0.7957587709766079,0.8615820531132292,0.07716074680781548,0.18691841911556484,0.7347080094350298,0.3071818137250426,0.6785319706642301,0.2998169475690031,0.5957999319124789,0.8277326599321984,0.838449157558766,0.9974221390756646,0.8469626880528385,0.36986185110711167,0.5292838662786798,0.40758416793281405,0.9105129647186874,0.3001115981501923,0.09152474433861602,0.17162463828221486,0.41620838311533626,0.007769767378814629,0.23668495811295753,0.3260019226773594,0.7591920228658169,0.4658376847639425,0.5267057360327065,0.18802496397109247,0.4361770682881674,0.6024956941560136,0.07957598487799222,0.5691308525764256,0.7282733438045974,0.6260520084025061,0.8404591626054838,0.5590895093460122,0.8185388818162547,0.24493953891960607,0.1627003934968574,0.6493056609212651,0.335297735821694,0.6042705018574952,0.5352368875745084,0.8487429779549418,0.17793211503126471,0.07640332875836653,0.12969744079577605,0.5488136250211173,0.5223375236348855,0.27001278234971626,0.8511723479526618,0.12788325389864008,0.4223013734266634,0.13030272363825057,0.8711113279480822,0.007159317142322319,0.9972215999750942,0.9256320131125677,0.42312861799309,0.08213075435420425,0.7125648630831263,0.0642256829378256,0.6036937619998217,0.16389133823861934,0.00046032689909791813,0.9779224006052099,0.22014307360467678,0.8125150281386315,0.21626562046763032,0.9920137027759952,0.45001232002810077,0.3290776018554449,0.3750605116709944,0.5457807593855706,0.7221571417872239,0.4654119408922732,0.43403419252429765,0.404538941682693,0.5255242944933092,0.96756833232771,0.8369086690526497,0.946627012872675,0.396674532466031,0.6267437420781825,0.17655138101896029,0.20957038587342147,0.3115002722957265,0.9991771806112602,0.939388366730556,0.7214293216882504,0.9429723354083421,0.3167793048479228,0.941675207647461,0.2359632207795439,0.17206102721072525,0.9620901111451798,0.5951820454313068,0.11609533570177644,0.12208636020771024,0.11375493007917403,0.4088732721116777,0.7203759515671844,0.8867729751152156,0.08296505977349389,0.1494079086886344,0.7560130570612451,0.5695365212862087,0.19030728679477615,0.9762806122637286,0.8663603488526992,0.8402836147103592,0.5105052628424558,0.7235310055756825,0.44287044055570024,0.2128121071136002,0.6449764208906044,0.8962591472309642,0.8367791869321162,0.5311707365640392,0.5699456397907061,0.4229506219350898,0.9454171924586645,0.8299298679504903,0.5559496667295338,0.8356065169875548,0.5313871791182756,0.4566600208760714,0.9218719020626178,0.6056351863582294,0.2276037369074151,0.446264943255992,0.8733603977328348,0.15948343801589937,0.19872861603233938,0.5434158849553332,0.2699060880845492,0.7425589179842451,0.8278983368584802,0.5397507791179257,0.9229494966772582,0.6411994766618325,0.6820197802675865,0.8357009053835645,0.9966532923322253,0.1766115211884387,0.6940808855153087,0.512832632232044,0.7230350153850911,0.2056098352577318,0.7882328598038673,0.12481490190237676,0.4159742025971762,0.7379495746749747,0.8465269947368164,0.2712257208314923,0.5359800331440723,0.6429902499926754,0.9323192841118768,0.9012324451948859,0.167279136121796,0.017721682281788498,0.4430443213437467,0.34073295966348005,0.9024627309910467,0.6309955319800298,0.7312825006865677,0.38671574333556213,0.21588054418461766,0.9949658358016413,0.8832629041876483,0.10288584599737693,0.17654978243244868,0.9259359368769149,0.05450439408608032,0.08551178537256465,0.7449067112036087,0.1766217527413938,0.5818131402246174,0.8116539796492506,0.6019445604217422,0.832826589965526,0.6792258741917676,0.6382718205964142,0.7579008481719445,0.34173665234959705,0.5303972862271049,0.35127185183073806,0.954907672926719,0.6236730642280972,0.6845277297586168,0.2318481749516197,0.11727716482090145,0.5069296004795485,0.09256092211985378,0.783208037933961,0.6336242508936052,0.4570165962307067,0.6667429893480115,0.5763710626773351,0.1972247885598244,0.4918738399246694,0.651041450731703,0.042553833189492574,0.03727714742303756,0.5445273878388854,0.5988434981194122,0.3771866105403292,0.38916761049545623,0.5866748947706202,0.7414875738610334,0.18934971762698027,0.4610255082262751,0.007566099525937009,0.12071186284630464,0.557109539937382,0.6984027191542383,0.0421773399030303,0.33207244296315985,0.950719482415209,0.25052091778546726,0.17770149655432022,0.8949190980307626,0.4630561323893727,0.4320509542999078,0.741484574536666,0.4597383456874973,0.05269546170654871,0.9032151656216221,0.5221376195929193]}

},{}],125:[function(require,module,exports){
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
	var quantile = factory( 1.0, 1.0, 1.0, 0.0 );
	t.equal( typeof quantile, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 1.0, 1.0, 0.0 );
	y = quantile( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NaN, 1.0, 0.0 );
	y = quantile( 0.2 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( 1.0, NaN, 0.0 );
	y = quantile( 0.2 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( 1.0, NaN, 1.0, NaN );
	y = quantile( 0.2 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NaN, NaN, NaN );
	y = quantile( 0.2 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NaN, NaN, NaN );
	y = quantile( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a nonpositive `s`, the created function always returns `NaN`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 1.0, -1.0, 1.0 );

	y = quantile( 0.6 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( 1.0, 0.0, 1.0 );

	y = quantile( 0.3 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( 1.0, NINF, 1.0 );
	y = quantile( 0.3 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( PINF, NINF, 1.0 );
	y = quantile( 0.3 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NaN, NINF, NaN );
	y = quantile( 0.3 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function returns `NaN` if provided a number outside `[0,1]`', function test( t ) {
	var quantile = factory( 1.0, 1.0, 0.0 );
	var y = quantile( 1.1 );
	t.equal( isnan( y ), true, 'returns true' );
	y = quantile( -0.1 );
	t.equal( isnan( y ), true, 'returns true' );
	t.end();
});

tape( 'the created function evaluates the quantile function for `p` given large `alpha`', function test( t ) {
	var quantile;
	var expected;
	var alpha;
	var delta;
	var tol;
	var s;
	var p;
	var y;
	var i;

	expected = largeShape.expected;
	p = largeShape.p;
	alpha = largeShape.alpha;
	s = largeShape.s;
	for ( i = 0; i < p.length; i++ ) {
		quantile = factory( alpha[i], s[i], 0.0 );
		y = quantile( p[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', alpha: '+alpha[i]+', s: '+s[i]+', m: 0, y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. alpha: '+alpha[i]+'. s: '+s[i]+'. m: 0. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the quantile function for `p` given large `s`', function test( t ) {
	var quantile;
	var expected;
	var alpha;
	var delta;
	var tol;
	var s;
	var p;
	var y;
	var i;

	expected = largeScale.expected;
	p = largeScale.p;
	alpha = largeScale.alpha;
	s = largeScale.s;
	for ( i = 0; i < p.length; i++ ) {
		quantile = factory( alpha[i], s[i], 0.0 );
		y = quantile( p[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', alpha:'+alpha[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. alpha: '+alpha[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the quantile function for `p` given large `alpha` and `s`', function test( t ) {
	var quantile;
	var expected;
	var alpha;
	var delta;
	var tol;
	var s;
	var p;
	var y;
	var i;

	expected = bothLarge.expected;
	p = bothLarge.p;
	alpha = bothLarge.alpha;
	s = bothLarge.s;
	for ( i = 0; i < p.length; i++ ) {
		quantile = factory( alpha[i], s[i], 0.0 );
		y = quantile( p[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', alpha:'+alpha[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. alpha: '+alpha[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/frechet/quantile/test/test.factory.js")
},{"./../lib/factory.js":119,"./fixtures/julia/both_large.json":122,"./fixtures/julia/large_scale.json":123,"./fixtures/julia/large_shape.json":124,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pinf":54,"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/special/abs":69,"tape":280}],126:[function(require,module,exports){
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
var quantile = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof quantile, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `quantile` functions', function test( t ) {
	t.equal( typeof quantile.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/frechet/quantile/test/test.js")
},{"./../lib":120,"tape":280}],127:[function(require,module,exports){
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
var quantile = require( './../lib' );


// FIXTURES //

var largeScale = require( './fixtures/julia/large_scale.json' );
var largeShape = require( './fixtures/julia/large_shape.json' );
var bothLarge = require( './fixtures/julia/both_large.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof quantile, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = quantile( NaN, 1.0, 1.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = quantile( 0.2, NaN, 1.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = quantile( 0.2, 1.0, NaN, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = quantile( 0.2, 1.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided a number outside `[0,1]` for `p`, the function returns `NaN`', function test( t ) {
	var y = quantile( 1.1, 1.0, 1.0, 0.0 );
	t.equal( isnan( y ), true, 'returns true' );
	y = quantile( -0.1, 1.0, 1.0, 0.0 );
	t.equal( isnan( y ), true, 'returns true' );
	t.end();
});

tape( 'if provided a nonpositive `alpha`, the function returns `NaN`', function test( t ) {
	var y;

	y = quantile( 0.3, -1.0, 1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.0, -1.0, 1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.2, 0.0, 1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.0, 0.0, 1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.5, NINF, 1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.3, NINF, PINF, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.3, NINF, NaN, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a nonpositive `s`, the function returns `NaN`', function test( t ) {
	var y;

	y = quantile( 0.3, 2.0, -1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.0, 2.0, -1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.2, 2.0, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.0, 2.0, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.3, 1.0, NINF, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.2, PINF, NINF, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.1, NaN, NINF, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the quantile function for `p` given large `alpha`', function test( t ) {
	var expected;
	var alpha;
	var delta;
	var tol;
	var s;
	var p;
	var y;
	var i;

	expected = largeShape.expected;
	p = largeShape.p;
	alpha = largeShape.alpha;
	s = largeShape.s;
	for ( i = 0; i < p.length; i++ ) {
		y = quantile( p[i], alpha[i], s[i], 0.0 );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', alpha: '+alpha[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. alpha: '+alpha[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the quantile function for `p` given large `s`', function test( t ) {
	var expected;
	var alpha;
	var delta;
	var tol;
	var s;
	var p;
	var y;
	var i;

	expected = largeScale.expected;
	p = largeScale.p;
	alpha = largeScale.alpha;
	s = largeScale.s;
	for ( i = 0; i < p.length; i++ ) {
		y = quantile( p[i], alpha[i], s[i], 0.0 );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', alpha: '+alpha[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. alpha: '+alpha[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the quantile function for `p` given large `alpha` and `s`', function test( t ) {
	var expected;
	var alpha;
	var delta;
	var tol;
	var s;
	var p;
	var y;
	var i;

	expected = bothLarge.expected;
	p = bothLarge.p;
	alpha = bothLarge.alpha;
	s = bothLarge.s;
	for ( i = 0; i < p.length; i++ ) {
		y = quantile( p[i], alpha[i], s[i], 0.0 );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', alpha: '+alpha[i]+', s: '+s[i]+', m: 0, y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. alpha: '+alpha[i]+'. s: '+s[i]+'. y: '+y+'. m: 0. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/frechet/quantile/test/test.quantile.js")
},{"./../lib":120,"./fixtures/julia/both_large.json":122,"./fixtures/julia/large_scale.json":123,"./fixtures/julia/large_shape.json":124,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pinf":54,"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/special/abs":69,"tape":280}],128:[function(require,module,exports){
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

},{"./is_number.js":131}],129:[function(require,module,exports){
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

},{"./is_number.js":131,"./zero_pad.js":135}],130:[function(require,module,exports){
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

},{"./main.js":133}],131:[function(require,module,exports){
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

},{"./format_double.js":128,"./format_integer.js":129,"./is_string.js":132,"./space_pad.js":134,"./zero_pad.js":135}],134:[function(require,module,exports){
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

},{"./main.js":137}],137:[function(require,module,exports){
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

},{"./main.js":140}],139:[function(require,module,exports){
arguments[4][132][0].apply(exports,arguments)
},{"dup":132}],140:[function(require,module,exports){
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

},{"./is_string.js":139,"@stdlib/string/base/format-interpolate":130,"@stdlib/string/base/format-tokenize":136}],141:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var Sym = ( typeof Symbol === 'function' ) ? Symbol : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = Sym;

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

},{"./main.js":144}],144:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":146}],146:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":150}],147:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],148:[function(require,module,exports){
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

},{"./define_property.js":148}],150:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":147,"./has_define_property_support.js":149,"./polyfill.js":151}],151:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":138}],152:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":153,"./polyfill.js":154,"@stdlib/assert/has-tostringtag-support":20}],153:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":155}],154:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":155,"./tostringtag.js":156,"@stdlib/assert/has-own-property":16}],155:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MODULES //

var Symbol = require( '@stdlib/symbol/ctor' );


// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{"@stdlib/symbol/ctor":141}],157:[function(require,module,exports){
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

},{}],158:[function(require,module,exports){

},{}],159:[function(require,module,exports){
arguments[4][158][0].apply(exports,arguments)
},{"dup":158}],160:[function(require,module,exports){
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
},{"base64-js":157,"buffer":160,"ieee754":263}],161:[function(require,module,exports){
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

},{}],162:[function(require,module,exports){
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
},{"_process":270}],163:[function(require,module,exports){
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

},{"events":161,"inherits":264,"readable-stream/lib/_stream_duplex.js":165,"readable-stream/lib/_stream_passthrough.js":166,"readable-stream/lib/_stream_readable.js":167,"readable-stream/lib/_stream_transform.js":168,"readable-stream/lib/_stream_writable.js":169,"readable-stream/lib/internal/streams/end-of-stream.js":173,"readable-stream/lib/internal/streams/pipeline.js":175}],164:[function(require,module,exports){
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

},{}],165:[function(require,module,exports){
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
},{"./_stream_readable":167,"./_stream_writable":169,"_process":270,"inherits":264}],166:[function(require,module,exports){
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
},{"./_stream_transform":168,"inherits":264}],167:[function(require,module,exports){
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
},{"../errors":164,"./_stream_duplex":165,"./internal/streams/async_iterator":170,"./internal/streams/buffer_list":171,"./internal/streams/destroy":172,"./internal/streams/from":174,"./internal/streams/state":176,"./internal/streams/stream":177,"_process":270,"buffer":160,"events":161,"inherits":264,"string_decoder/":279,"util":158}],168:[function(require,module,exports){
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
},{"../errors":164,"./_stream_duplex":165,"inherits":264}],169:[function(require,module,exports){
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
},{"../errors":164,"./_stream_duplex":165,"./internal/streams/destroy":172,"./internal/streams/state":176,"./internal/streams/stream":177,"_process":270,"buffer":160,"inherits":264,"util-deprecate":288}],170:[function(require,module,exports){
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
},{"./end-of-stream":173,"_process":270}],171:[function(require,module,exports){
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
},{"buffer":160,"util":158}],172:[function(require,module,exports){
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
},{"_process":270}],173:[function(require,module,exports){
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
},{"../../../errors":164}],174:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],175:[function(require,module,exports){
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
},{"../../../errors":164,"./end-of-stream":173}],176:[function(require,module,exports){
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
},{"../../../errors":164}],177:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":161}],178:[function(require,module,exports){
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

},{"./":179,"get-intrinsic":254}],179:[function(require,module,exports){
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

},{"es-define-property":239,"es-errors/type":245,"function-bind":253,"get-intrinsic":254,"set-function-length":274}],180:[function(require,module,exports){
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

},{"./lib/is_arguments.js":181,"./lib/keys.js":182}],181:[function(require,module,exports){
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

},{}],182:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],183:[function(require,module,exports){
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

},{"es-define-property":239,"es-errors/syntax":244,"es-errors/type":245,"gopd":255}],184:[function(require,module,exports){
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

},{"define-data-property":183,"has-property-descriptors":256,"object-keys":268}],185:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],186:[function(require,module,exports){
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

},{"./ToNumber":217,"./ToPrimitive":219,"./Type":224}],187:[function(require,module,exports){
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

},{"../helpers/isFinite":232,"../helpers/isNaN":233,"../helpers/isPrefixOf":234,"./ToNumber":217,"./ToPrimitive":219,"es-errors/type":245,"get-intrinsic":254}],188:[function(require,module,exports){
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

},{"call-bind/callBound":178,"es-errors/type":245}],189:[function(require,module,exports){
'use strict';

var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value) {
	return RequireObjectCoercible(value, arguments.length > 1 ? arguments[1] : void undefined);
};

},{"es-object-atoms/RequireObjectCoercible":247}],190:[function(require,module,exports){
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

},{"./DayWithinYear":193,"./InLeapYear":197,"./MonthFromTime":207,"es-errors/eval":240}],191:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":238,"./floor":228}],192:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":228}],193:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":191,"./DayFromYear":192,"./YearFromTime":226}],194:[function(require,module,exports){
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

},{"./modulo":229}],195:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":236,"./IsAccessorDescriptor":198,"./IsDataDescriptor":200,"es-errors/type":245}],196:[function(require,module,exports){
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

},{"../helpers/timeConstants":238,"./floor":228,"./modulo":229}],197:[function(require,module,exports){
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

},{"./DaysInYear":194,"./YearFromTime":226,"es-errors/eval":240}],198:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":236,"es-errors/type":245,"hasown":262}],199:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":265}],200:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":236,"es-errors/type":245,"hasown":262}],201:[function(require,module,exports){
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

},{"./IsAccessorDescriptor":198,"./IsDataDescriptor":200,"./IsPropertyDescriptor":202,"es-errors/type":245}],202:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor(Desc);
};

},{"../helpers/records/property-descriptor":236}],203:[function(require,module,exports){
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

},{"../helpers/isFinite":232,"../helpers/timeConstants":238}],204:[function(require,module,exports){
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

},{"../helpers/isFinite":232,"./DateFromTime":190,"./Day":191,"./MonthFromTime":207,"./ToInteger":216,"./YearFromTime":226,"./floor":228,"./modulo":229,"get-intrinsic":254}],205:[function(require,module,exports){
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

},{"../helpers/isFinite":232,"../helpers/timeConstants":238,"./ToInteger":216}],206:[function(require,module,exports){
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

},{"../helpers/timeConstants":238,"./floor":228,"./modulo":229}],207:[function(require,module,exports){
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

},{"./DayWithinYear":193,"./InLeapYear":197}],208:[function(require,module,exports){
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

},{"../helpers/isNaN":233}],209:[function(require,module,exports){
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

},{"../helpers/timeConstants":238,"./floor":228,"./modulo":229}],210:[function(require,module,exports){
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

},{"./Type":224}],211:[function(require,module,exports){
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


},{"../helpers/isFinite":232,"./ToNumber":217,"./abs":227,"get-intrinsic":254}],212:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":238,"./DayFromYear":192}],213:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":238,"./modulo":229}],214:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],215:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":217}],216:[function(require,module,exports){
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

},{"../helpers/isFinite":232,"../helpers/isNaN":233,"../helpers/sign":237,"./ToNumber":217,"./abs":227,"./floor":228}],217:[function(require,module,exports){
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

},{"./ToPrimitive":219,"call-bind/callBound":178,"safe-regex-test":273}],218:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = require('es-object-atoms/ToObject');

},{"es-object-atoms/ToObject":248}],219:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":250}],220:[function(require,module,exports){
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

},{"./IsCallable":199,"./ToBoolean":214,"./Type":224,"es-errors/type":245,"hasown":262}],221:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":254}],222:[function(require,module,exports){
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

},{"../helpers/isFinite":232,"../helpers/isNaN":233,"../helpers/sign":237,"./ToNumber":217,"./abs":227,"./floor":228,"./modulo":229}],223:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":217}],224:[function(require,module,exports){
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

},{}],225:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":191,"./modulo":229}],226:[function(require,module,exports){
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

},{"call-bind/callBound":178,"get-intrinsic":254}],227:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":254}],228:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],229:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":235}],230:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":238,"./modulo":229}],231:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":186,"./5/AbstractRelationalComparison":187,"./5/Canonicalize":188,"./5/CheckObjectCoercible":189,"./5/DateFromTime":190,"./5/Day":191,"./5/DayFromYear":192,"./5/DayWithinYear":193,"./5/DaysInYear":194,"./5/FromPropertyDescriptor":195,"./5/HourFromTime":196,"./5/InLeapYear":197,"./5/IsAccessorDescriptor":198,"./5/IsCallable":199,"./5/IsDataDescriptor":200,"./5/IsGenericDescriptor":201,"./5/IsPropertyDescriptor":202,"./5/MakeDate":203,"./5/MakeDay":204,"./5/MakeTime":205,"./5/MinFromTime":206,"./5/MonthFromTime":207,"./5/SameValue":208,"./5/SecFromTime":209,"./5/StrictEqualityComparison":210,"./5/TimeClip":211,"./5/TimeFromYear":212,"./5/TimeWithinDay":213,"./5/ToBoolean":214,"./5/ToInt32":215,"./5/ToInteger":216,"./5/ToNumber":217,"./5/ToObject":218,"./5/ToPrimitive":219,"./5/ToPropertyDescriptor":220,"./5/ToString":221,"./5/ToUint16":222,"./5/ToUint32":223,"./5/Type":224,"./5/WeekDay":225,"./5/YearFromTime":226,"./5/abs":227,"./5/floor":228,"./5/modulo":229,"./5/msFromTime":230}],232:[function(require,module,exports){
'use strict';

var $isNaN = require('./isNaN');

module.exports = function (x) { return (typeof x === 'number' || typeof x === 'bigint') && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{"./isNaN":233}],233:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],234:[function(require,module,exports){
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

},{"call-bind/callBound":178}],235:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],236:[function(require,module,exports){
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

},{"es-errors/type":245,"hasown":262}],237:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],238:[function(require,module,exports){
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

},{}],239:[function(require,module,exports){
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

},{"get-intrinsic":254}],240:[function(require,module,exports){
'use strict';

/** @type {import('./eval')} */
module.exports = EvalError;

},{}],241:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Error;

},{}],242:[function(require,module,exports){
'use strict';

/** @type {import('./range')} */
module.exports = RangeError;

},{}],243:[function(require,module,exports){
'use strict';

/** @type {import('./ref')} */
module.exports = ReferenceError;

},{}],244:[function(require,module,exports){
'use strict';

/** @type {import('./syntax')} */
module.exports = SyntaxError;

},{}],245:[function(require,module,exports){
'use strict';

/** @type {import('./type')} */
module.exports = TypeError;

},{}],246:[function(require,module,exports){
'use strict';

/** @type {import('./uri')} */
module.exports = URIError;

},{}],247:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

/** @type {import('./RequireObjectCoercible')} */
module.exports = function RequireObjectCoercible(value) {
	if (value == null) {
		throw new $TypeError((arguments.length > 0 && arguments[1]) || ('Cannot call method on ' + value));
	}
	return value;
};

},{"es-errors/type":245}],248:[function(require,module,exports){
'use strict';

var $Object = require('./');
var RequireObjectCoercible = require('./RequireObjectCoercible');

/** @type {import('./ToObject')} */
module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

},{"./":249,"./RequireObjectCoercible":247}],249:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Object;

},{}],250:[function(require,module,exports){
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

},{"./helpers/isPrimitive":251,"is-callable":265}],251:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],252:[function(require,module,exports){
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

},{}],253:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":252}],254:[function(require,module,exports){
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

},{"es-errors":241,"es-errors/eval":240,"es-errors/range":242,"es-errors/ref":243,"es-errors/syntax":244,"es-errors/type":245,"es-errors/uri":246,"function-bind":253,"has-proto":257,"has-symbols":258,"hasown":262}],255:[function(require,module,exports){
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

},{"get-intrinsic":254}],256:[function(require,module,exports){
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

},{"es-define-property":239}],257:[function(require,module,exports){
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

},{}],258:[function(require,module,exports){
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

},{"./shams":259}],259:[function(require,module,exports){
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

},{}],260:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":259}],261:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":253}],262:[function(require,module,exports){
'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);

},{"function-bind":253}],263:[function(require,module,exports){
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

},{}],264:[function(require,module,exports){
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

},{}],265:[function(require,module,exports){
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

},{}],266:[function(require,module,exports){
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

},{"call-bind/callBound":178,"has-tostringtag/shams":260}],267:[function(require,module,exports){
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

},{"./isArguments":269}],268:[function(require,module,exports){
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

},{"./implementation":267,"./isArguments":269}],269:[function(require,module,exports){
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

},{}],270:[function(require,module,exports){
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

},{}],271:[function(require,module,exports){
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
},{"_process":270,"through":286,"timers":287}],272:[function(require,module,exports){
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

},{"buffer":160}],273:[function(require,module,exports){
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

},{"call-bind/callBound":178,"es-errors/type":245,"is-regex":266}],274:[function(require,module,exports){
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

},{"define-data-property":183,"es-errors/type":245,"get-intrinsic":254,"gopd":255,"has-property-descriptors":256}],275:[function(require,module,exports){
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

},{"es-abstract/es5":231,"function-bind":253}],276:[function(require,module,exports){
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

},{"./implementation":275,"./polyfill":277,"./shim":278,"define-properties":184,"function-bind":253}],277:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":275}],278:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":277,"define-properties":184}],279:[function(require,module,exports){
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
},{"safe-buffer":272}],280:[function(require,module,exports){
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
},{"./lib/default_stream":281,"./lib/results":283,"./lib/test":284,"_process":270,"defined":185,"through":286,"timers":287}],281:[function(require,module,exports){
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
},{"_process":270,"fs":159,"through":286}],282:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":270,"timers":287}],283:[function(require,module,exports){
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
},{"_process":270,"events":161,"function-bind":253,"has":261,"inherits":264,"object-inspect":285,"resumer":271,"through":286,"timers":287}],284:[function(require,module,exports){
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
},{"./next_tick":282,"deep-equal":180,"defined":185,"events":161,"has":261,"inherits":264,"path":162,"string.prototype.trim":276}],285:[function(require,module,exports){
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

},{}],286:[function(require,module,exports){
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
},{"_process":270,"stream":163}],287:[function(require,module,exports){
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
},{"process/browser.js":270,"timers":287}],288:[function(require,module,exports){
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
},{}]},{},[125,126,127]);
